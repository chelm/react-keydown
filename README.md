# react-keydown
> Lightweight keydown wrapper for React components.

Use react-keydown as a higher-order component or decorator to pass keydown
events to the wrapped component.

One of the main advantages of this library is that it only passes events
into the component when the user appears to be active inside the DOM elements
corresponding to that component and its children.

## Install

```
npm install --save react-keydown
```

## Use

```jsx
import React from 'react';
import keydown from 'react-keydown';

class MyComponent extends React.Component {

  constructor( props ) {
    super( props );
  }

  componentWillReceiveProps( { keydown } ) {
    if ( keydown.event ) {
      // do something with the keydown event
      console.log( keydown.event.which );
    }
  }

  render() {
    return (
      <div>keydown events will only get passed down when this DOM node mounts or is clicked on</div>
    );
  }
}

export default keydown( MyComponent );
```

#### Use ES7/2016 decorator pattern via Babel:

```javascript
@keydown
class MyComponent extends React.Component {
  ...
}

export default MyComponent;
```

#### Monitor only key codes `which` you care about:

```javascript
const KEYS = [
  38, // up
  40, // down
  13  // enter
];

@keydown( KEYS )
class MyComponent extends React.Component {
  ...
}
```