# ModalJS
A lightweight Javascript library for creating simplistic modals


```html
<script src='https://cdn.jsdelivr.net/gh/shreyasm-dev/ModalJS/src/modal.js'></script>
```

Example:

```javascript
modal('A dialog', 'Some text.', [{
  text: 'Yes',
  return: 'Yes'
}, {
  text: 'No',
  return: 'No'
}], function(value) {
  if (value == 'Yes') {
    modal('Yes', 'You clicked yes', null, function() {})
  } else if (value == 'No') {
    modal('No', 'You clicked no', null, function() {})
  } else {
    modal('Exit', 'You clicked outside the box', null, function() {})
  }
})
```

Usage:

```javascript
modal(<title>, <text>, <buttons>, <callback>)
```

Note: The options to use in buttons are:

```javascript
{
  text: "",
  return: "",
  style: ""
}
```

The style is the only one with a default value
