import React, { useState, useEffect, useRef } from 'react'; // eslint-disable-line
///////////////////////////////////////////////////////////////////////////////
//
//  Bootstrap also uses an .offcanvas-toggling class.
//  This class has no associated CSS selector.
//  Presumably, it is used kind of like a state variable such
//  that internally it is part of if checks in various methods.
//  I don't see any need for it. In theory it would prevent the menu
//  from opening/closing while it was closing/opening. However, that
//  behavior is fine with me.
//
//  For this implementation, I am reaching directly into the DOM.
//  This just seemed like the easiest approach, albeit not the 'React way'.
//  One could instead conditionally apply the classes and styles to the JSX.
//  That said, you'd still have to apply styles to the DOM for the body.
//
///////////////////////////////////////////////////////////////////////////////


function OffCanvas({
  show             = false,
  hideOffCanvas,
  title            = '', 
  headerContent    = null,
  bodyContent      = <div className="p-5 bg-light text-center border rounded-3">Body Content Goes Here...</div>,
  position         = 'start', 
  backdrop         = false,
  closeButton      = true,
  closeButtonTheme = 'default',
  scrollable       = false,
  className        = '',
  style            = {},
  togglerRef }){

  // Technically, this is less about visibility and more about 
  // whether  or not the associated <div> is rendered.
  const [ backdropVisible,   setBackdropVisible ]   = useState(false); 
  const [offCanvasClassName, setOffCanvasClassName] = useState(`offcanvas offcanvas-${position} invisible`);
  const offCanvasRef                                = useRef();
  const backdropRef                                 = useRef();
  const transitionDuration                          = 300; // Matches Bootstrap CSS transition duration.
      

  // Handle offCanvas, backdrop and scrollability whenever show prop changes.
  useEffect(() => {
    const html = document.getElementsByTagName('html')[0];
    const body = document.getElementsByTagName('body')[0]; 
    

    if (show){
      // Handle offCanvas
      setOffCanvasClassName(`offcanvas offcanvas-${position} visible show`);

      // Handle backdrop
      if (backdrop){
        const otherModalBackdrop = document.querySelector('.modal-backdrop.show');
        // Presumably, if there is another .modal-backdrop.show, then you wouldn't be
        // able to open the menu anyways. However, just in case...
        if (!otherModalBackdrop){
          setBackdropVisible(true);
          setTimeout(() => { backdropRef.current && backdropRef.current.classList.add('show') }, 100);
        }
      }

      // Handle scrollability
      if (!scrollable){ 
        html.style.overflow = 'hidden';
        body.style.overflow = 'hidden';
      }
    } 
    
    
    else {
      // Handle offCanvas part 1
      setOffCanvasClassName(`offcanvas offcanvas-${position} visible`);

      // Handle backdrop part 1
      if (backdrop){ backdropRef.current && backdropRef.current.classList.remove('show'); }

      // Handle backdrop part 2
      // Once the backdrop has faded out, then remove the element from the DOM.
      // Based on App.scss:  .modal-backdrop.fade { transition: opacity 0.25s linear; }
      setTimeout(() => { if (backdrop){ setBackdropVisible(false); } }, 250); 

      setTimeout(() => {
        // Handle offCanvas part 2
        setOffCanvasClassName(`offcanvas offcanvas-${position} invisible`);
        // Handle scrollability
        if (!scrollable){ 
          html.style.overflow = '';
          body.style.overflow = ''; 
        }
      }, transitionDuration); 
    }
  }, [show, position, backdrop, scrollable]);


  /* ==========================

  ========================== */


  useEffect(() => {
    const body = document.getElementsByTagName('body')[0]; 


    // If there's a backdrop then clicking on the backdrop will close the menu. 
    // However, when there is no backdrop we still want to close the menu when
    // the user clicks on anything but the menu itself or the toggler.
    const handleBodyClick = (e) => { 
      //////////////////////////////////////////////////////////////////////////////////////////////////
      //
      //  Don't do anything when in the menu or when the menu is not visible.
      //
      //  Expected behavior: 
      //
      //    - Clicking on the toggler when offCanvas is hidden will cause handleBodyClick to return early. 
      //      This allows the toggler to do its job without this function getting in its way.
      //
      //    - Clicking on any part of the offCanvas menu will also cause handleBodyClick to return early.
      //      Then if we do want the menu when clicking a link, then we attach: onClick={hideOffCanvas} to 
      //      the link as needed.
      //
      //////////////////////////////////////////////////////////////////////////////////////////////////
 

      if (offCanvasRef.current.contains(e.target) || offCanvasRef.current === e.target){
        // console.log("Returning early because you just clicked in offCanvas.");
        return; 
      } 

      if (!show){ 
        // console.log("Returning early because show is false:", show);
        return; 
      } 

      //////////////////////////////////////////////////////////////////////////////////////////////////
      //
      //  The above return early checks prevent indadvertantly triggering the close functionality
      //  when opening the menu with the toggler and when clicking within the open menu.
      //  However, it does not prevent triggering the function below when closing the menu
      //  by clicking on the toggler. In practice, this doesn't actually matter, it just means
      //  you're running two functions that do the same thing. That said, it's best to still
      //  return early here if the goal is to truly close the menu with the toggler.
      //
      //////////////////////////////////////////////////////////////////////////////////////////////////
      if (togglerRef.current.contains(e.target) || togglerRef.current === e.target){ 
        // console.log("Returning early because you clicked on the toggler.");
        return; 
      }

      // In all other cases close the menu.
      hideOffCanvas(); 
    };

  
    body.addEventListener('click', handleBodyClick);
    return () => { body.removeEventListener('click', handleBodyClick); };
  }, [show, togglerRef, hideOffCanvas]); 


  return (
    <React.Fragment>
      <div 
        ref={offCanvasRef} 
        className={className ? `${offCanvasClassName} ${className}` : offCanvasClassName} 
        style={style}
        tabIndex={-1}
      >

        { headerContent && (
          <div className="offcanvas-header">
            { (typeof headerContent !== 'function') ? headerContent : headerContent() }
            { 
              closeButton && (
                <button 
                  className={(closeButtonTheme === 'white') ? "btn-close btn-close-white text-reset" : "btn-close text-reset"} 
                  type="button" 
                  onClick={hideOffCanvas}
                ></button>
              )  
            } 
          </div>
        )}


        { !headerContent && title && (
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">{ title }</h5>
            { closeButton && <button className="btn-close text-reset" type="button" onClick={hideOffCanvas}></button> }
          </div>
        )}


        <div className="offcanvas-body">
          { (typeof bodyContent !== 'function') ? bodyContent : bodyContent() }
        </div>
      </div>
 

      { backdropVisible && <div ref={backdropRef} className="modal-backdrop fade" onClick={hideOffCanvas}></div> }
    </React.Fragment>     
  );
}


export default OffCanvas;