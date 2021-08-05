import React, { useState, useRef } from 'react';
import { NavLink, Link }           from 'react-router-dom';
import OffCanvas                   from './OffCanvas';


const Navigation = (props) => {
  // If you decide to initially set show to true, then you may want to 
  // implement a css class on body to initially disable all animations, then
  // remove it 350 - 500ms later.
  const [ show, setShow ] = useState(false);
  const togglerRef        = useRef();
  const hideOffCanvas     = () => { setShow(false); };
  const toggleOffCanvas   = () => { setShow(currentValue => !currentValue); }


  const headerContent = () => {
    return (
      <Link className="navbar-brand font-montserrat p-0 fs-1 lh-1 link-light" to="/" onClick={hideOffCanvas}>WebTek</Link>
    );   
  }; 
  
  
  const BodyContent = () => {
    return (
      <nav id="primary-navigation">
        <div className="container-fluid">
          <NavLink className="nav-link" activeClassName="active-link" exact to="/"   onClick={hideOffCanvas}>Home</NavLink>
          <NavLink className="nav-link" activeClassName="active-link" to="/about"    onClick={hideOffCanvas}>About</NavLink>
          <NavLink className="nav-link" activeClassName="active-link" to="/services" onClick={hideOffCanvas}>Services</NavLink>
          <NavLink className="nav-link" activeClassName="active-link" to="/contact"  onClick={hideOffCanvas}>Contact</NavLink>

          <div className="my-5 text-light">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</div>
          <div className="my-5 text-light">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</div>
        </div>
      </nav>
    );
  };


  return (
    <React.Fragment>
      <button 
        ref={togglerRef}
        id="custom-toggler" 
        className="navbar-toggler" 
        type="button" 
        onClick={toggleOffCanvas} 
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <OffCanvas 
        show={show}
        hideOffCanvas={hideOffCanvas}
        title="not used" 
        headerContent={headerContent} 
        bodyContent={BodyContent} 
        backdrop={true} 
        position='start'
        scrollable={false}
        closeButton={true}
        closeButtonTheme='white'
        className='bg-deep-space'
        style={{ borderRight: '2px solid #000' }}
        togglerRef={togglerRef}
      />  
    </React.Fragment>    
  );
};


export default Navigation;
