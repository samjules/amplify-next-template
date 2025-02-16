"use client";



import "./../app/app.css";
import "@aws-amplify/ui-react/styles.css";
import { Tabs } from '@aws-amplify/ui-react';
import Todos from '../app/Todos';

    

export default function home(){

  return(
    <div>

  <Tabs
    defaultValue={'Tab 1'}
    items={[

      { label: 'Dashboard', value: 'Tab 1', content : <Todos /> },
      { label: 'Fleet', value: 'Tab 2', content: 'Tab content #2' },
      { label: 'Flight Time', value: 'Tab 3', content: 'Tab content #3' },
      { label: 'Records', value: 'Tab 3', content: 'Tab content #3' },
      { label: 'Settings', value: 'Tab 3', content: 'Tab content #3' },
      { label: 'Customer Managment', value: 'Tab 3', content: 'Tab content #3' },
      
    ]}
  />



    </div>

  );

}
    
    
    
 