import React from 'react'; 


///////////////////////////////////////////////////////////////////////////////////
//
//  This is a very simple component. Currently, the only goal of this
//  component is to create a wrapper element that has flex: 1 on it.
//  This assumes that its parent is going to have display: flex, flex-direction:column.
//  The end result is that each Page will then take as much vertical space as
//  is left within the parent element. This is mostly useful for pages that 
//  have minimal content, but we want it to stretch to at least the full length 
//  of the screen, perhaps because we have a background-color, etc.
//
//  Using a container class with paddding, etc is purposefully avoided because
//  some pages will not want padding (e.g., a landing page with a hero section).
//  This means that in many pages, the first child of Page will be a container.
//
//  The other benefit of having a Page component is that abstracts all base styles
//  for the page. This means that if we ever need to change those styles, we only
//  have to do it here, rather than in every single page. Admittedly, you
//  could just use <div className="page"> as the top-level element in any
//  component intended for use as a page. I just think this is cleaner.
//
///////////////////////////////////////////////////////////////////////////////////


export function Page({ className = '', style = {}, children }){
  return (
    <div className={className} style={{ flex: '1', ...style }}>
      { children }
    </div>
  );
}