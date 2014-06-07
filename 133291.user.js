// ==UserScript==
// @name         4chan Image Preloading
// @version      1.1
// @namespace    MyImoutol6
// @description  Preload images on 4chan. (Requires 4chan X)
// @include      http*://boards.4chan.org/*
// @run-at       document-start
// ==/UserScript==

document.addEventListener('DOMNodeInserted', function(event) {
  if (event.target instanceof HTMLDivElement && event.target.id == 'imgControls') {
    input = document.createElement('input')
    input.setAttribute('id', 'imagePreload')
    input.setAttribute('type', 'checkbox')
    input.onclick = function() {
      if (this.checked) {
        localStorage['4chan_enable_image_preloading'] = 'true'
        
        thumbnails = document.querySelectorAll('img[data-md5]:first-child')
        for (i = 0; i < thumbnails.length; i++) {
          thumbnails[i].src = thumbnails[i].parentNode.href
        }
        
        document.addEventListener('DOMNodeInserted', function(event) {
          if (this.checked && event.target instanceof HTMLTableElement &&
             (thumbnail = event.target.querySelector('img[data-md5]:first-child'))) {
            thumbnail.src = thumbnail.parentNode.href
          }
        }, false)
      }
      else {
        localStorage['4chan_enable_image_preloading'] = 'false'
      }
    }
    
    label = document.createElement('label')
    label.appendChild(document.createTextNode('Preload Images'))
    label.appendChild(input)
    event.target.appendChild(label)
    
    this.removeEventListener('DOMNodeInserted', arguments.callee, false)
    
    if (localStorage['4chan_enable_image_preloading'] == 'true') {
      input.click()
      input.setAttribute('checked', false)
    }
  }
}, false)
