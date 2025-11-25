import React from 'react'
import Props from './components/concepts/types/Props'
import States from './components/concepts/types/states';

export default function App() {
  const definition = "Ashwini";
  return (
    <div>
      <Props props={definition} />
      <States/>
    </div>
  )
}


