// ==UserScript==
// @name        ServerIndex Images Gallery
// @namespace   http://devedge.bour.cc/wiki/GreaseMonkey_ServerIndexImagesGallery
// @description Show Apache Server Index images as a Gallery
// @include     *
// @version     1
// ==/UserScript==

/*
    TODO:
        - preview.onclick: lightbox2 (image fullscreen view)
        - configurable preview size (height, width)
        - limit numbers of images (slider - dots to slide pages)
        - carrousel mode
*/

(function() {
  var addGlobalStyle = function(cl, css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.className = cl;
    style.innerHTML = css;
    head.appendChild(style);
  };
  
  var checkPage = function() {
    var h1 = document.getElementsByTagName('h1')[0];
    if(!h1) {
      var b = document.getElementsByTagName('b')[0];
      if(!b) return false;
      if(b.innerHTML.match(/^Index of/i)) {
        return true;
      }
    } else {
      if(h1.innerHTML.match(/^Index of/i)) {
        return true;
      } else {
        return false;
      }
    }
  };

    var previewOver = function(elt) {
        return function(evt) {
            elt.classList.add('ghover');
        };
    }
    
    var previewOut = function(elt) {
        return function(evt) {
            elt.classList.remove('ghover');
        };
    }
    
    var gallery = function() {
        console.log('start gallery');
        
        // Apache Server Index only
        if(!checkPage()) {
            console.log('not a server index');
            return;
        }
        
        var gallery = document.createElement('div');
        gallery.setAttribute('id', 'gallery');
        addGlobalStyle('gallery', '\
            div#gallery { margin-bottom: 30px;}  \
            div#gallery > img { max-height: 200px; max-width: 200px; margin: 2px; float: left; } \
            div#gallery > .spacer { clear: both; } \
            a.ghover { \
                text-decoration: none; \
                background-color: rgb(237,184,2); color: rgb(255,255,255); border-radius: 2px; padding: 0px 3px; } \
        ');
        

        var i = 0;
        var elts = document.getElementsByTagName("a");
        for each (var elt in elts) {
            try {
                var link = elt.getAttribute('href');
            } catch (e) {
                continue;
            }
            
            if(!link.match(/(.png|.gif|.jpg|.jpeg)$/)) {
                continue;
            }
            

            var preview = document.createElement('img');
            preview.setAttribute('src', link);
            preview.setAttribute('title', link);
            preview.addEventListener('mouseover', previewOver(elt), false);
            preview.addEventListener('mouseout' , previewOut(elt) , false);
            gallery.appendChild(preview);         

        }
        
        if(gallery.childNodes.length == 0) {
            return;
        }

        gallery.insertAdjacentHTML('afterbegin','<h2>Gallery</h2>');
        gallery.insertAdjacentHTML('beforeend','<div class="spacer"></div>');
        
        var h1 = document.getElementsByTagName('h1')[0];
        h1.parentNode.insertBefore(gallery, h1.nextSibling);
        
    }
    
    gallery();
})();
