import React from 'react'


export default function Props({props}) {
  console.log(props); // ✅ Now this works!
  return (
    <div>
      <h1>Hello Rabbit!</h1>
    </div>
  );
}
