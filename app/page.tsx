"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Tabs } from '@aws-amplify/ui-react';
import Todos from '../app/Todos';


Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  return (
    

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
