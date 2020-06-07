const modal = (title, text, buttons, callback) => {

  function isNumeric(val) {
    return !isNaN(parseFloat(val)) && isFinite(val);
  }

  function findHighestZIndex() {
    let queryObject = document.querySelectorAll('*');
    let childNodes = Object.keys(queryObject).map(key => queryObject[key]);
    let highest = 0;
    childNodes.forEach((node) => {
      let cssStyles = document.defaultView.getComputedStyle(node);
      let cssZIndex = cssStyles.getPropertyValue('z-index');
      let inlineZIndex = node.style.zIndex;
      cssZIndex = isNumeric(cssZIndex) ? parseInt(cssZIndex, 10) : 0;
      inlineZIndex = isNumeric(inlineZIndex) ? parseInt(inlineZIndex, 10) : 0;
      let currentZIndex = cssZIndex > inlineZIndex ? cssZIndex : inlineZIndex;
      if ((currentZIndex > highest)) {
        highest = currentZIndex;
      }
    });

    return highest;
  }


  var modal = document.createElement('div')
  var cover = document.createElement('div')
  var button = document.createElement('div')
  document.body.appendChild(cover)
  document.body.appendChild(modal)
  if (Array.isArray(buttons)) {
    for (var i = 0; i < buttons.length; i++) {
      if (typeof buttons[i] !== 'object') {
        continue
      }

      var currentButton = document.createElement('button')
      currentButton.style = buttons[i].style

      var defaultStyle = `
				background-color: red;
				border: solid 3px white;
				padding: 10px;
				border-radius: 15px;
				color: white;
				outline: none;
			`

      if (buttons[i].style == undefined) {
        currentButton.style = defaultStyle
      }

      currentButton.style.margin = '0 auto'

      currentButton.innerHTML = buttons[i].text
			currentButton.setAttribute('data-return', buttons[i].return)
      currentButton.addEventListener('click', function() {
				callback(this.getAttribute('data-return'))
        exit()
      })

      button.appendChild(currentButton)
    }
  }

  function exit() {
    for (var i = 0; i < button.children.length; i++) {
      button.children[i].disabled = true
    }
    cover.style.opacity = '0'
    modal.style.opacity = '0'
    setTimeout(function() {
      document.body.removeChild(cover)
      document.body.removeChild(modal)
    }, 300)
    return;
  }

  cover.style.opacity = '0'
  modal.style.opacity = '0'
  cover.style.zIndex = (findHighestZIndex() + 1) + 'px'
  cover.style.backgroundColor = 'black'
  cover.innerHTML = '&nbsp;'
  cover.style.position = 'fixed'
  cover.style.left = '0'
  cover.style.top = '0'
  cover.style.width = window.innerWidth + 'px'
  cover.style.height = window.innerHeight + 'px'
  modal.innerHTML = `
	<h1>${title}</h1>
	<div>${text}</div>
	`
  modal.appendChild(button)

  cover.addEventListener('click', function kill() {
    exit()
    cover.removeEventListener('click', kill, false)
    callback("exit")
  })

  modal.style.backgroundColor = 'white'
  modal.style.zIndex = (findHighestZIndex() + 2) + 'px'
  modal.style.position = 'fixed'
  modal.style.padding = '50px'
  modal.style.borderRadius = '10px'
  var modalWidth = modal.offsetWidth
  var modalHeight = modal.offsetHeight
  modal.style.left = (window.innerWidth / 2 - modalWidth / 2) + 'px'
  modal.style.top = (window.innerHeight / 2 - modalHeight / 2) + 'px'
  addEventListener('resize', function() {
    modal.style.left = (window.innerWidth / 2 - modalWidth / 2) + 'px'
    modal.style.top = (window.innerHeight / 2 - modalHeight / 2) + 'px'
    cover.style.width = window.innerWidth + 'px'
    cover.style.height = window.innerHeight + 'px'
  })

  cover.style.transitionDuration = '0.3s'
  modal.style.transitionDuration = '0.3s'

  cover.style.opacity = '0.8'
  modal.style.opacity = '1'

  this.exit = exit
}
