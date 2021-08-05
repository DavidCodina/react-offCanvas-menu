import React             from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage  }     from '../pages/HomePage';
import { AboutPage  }    from '../pages/AboutPage';
import { ServicesPage  } from '../pages/ServicesPage';
import { ContactPage  }  from '../pages/ContactPage';
import { NotFoundPage }  from '../pages/NotFoundPage';


const Router = (props) => {
  const { value } = props;


  return (
    <Switch>  
      <Route 
        exact path="/"
        render={(props) => {
          return <HomePage {...props} value={value}  />;
        }}
      />
      
      <Route 
        exact path="/about"
        render={(props) => {
          return <AboutPage {...props} value={value}  />;
        }}
      />

      <Route 
        exact path="/services"
        render={(props) => {
          return <ServicesPage {...props} value={value}  />;
        }}
      />

      <Route 
        exact path="/contact"
        render={(props) => {
          return <ContactPage {...props} value={value}  />;
        }}
      />
     
      <Route component={NotFoundPage} />
    </Switch>
  )
};


export default Router;

