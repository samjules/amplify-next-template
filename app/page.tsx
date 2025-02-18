"use client";



import "./../app/app.css";
import "@aws-amplify/ui-react/styles.css";
import { Tabs } from '@aws-amplify/ui-react';
import Todos from "../components/Todos";
import { useAuthenticator } from "@aws-amplify/ui-react";

    

export default function home(){

    
  const { signOut } = useAuthenticator();

    

  return(

    <div>

      <button onClick={signOut}>Sign out</button>

      <div className="main">

          <Tabs
        defaultValue={'Tab 1'}
        items={[

          { label: 'Dashboard', value: 'Tab 1', content : <Todos /> },
          { label: 'Fleet', value: 'Tab 2', content: '<Aircraft />' },
          { label: 'Flight Time', value: 'Tab 3', content: '<FlightTime />' },
          { label: 'Records', value: 'Tab 3', content: 'Tab content #3' },
          { label: 'Settings', value: 'Tab 3', content: 'Tab content #3' },
          { label: 'Customer Managment', value: 'Tab 3', content: 'Tab content #3' },
          
        ]}
      />


      </div>
  

    </div>

  );

}
    
    
    