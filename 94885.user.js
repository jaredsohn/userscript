// ==UserScript==
// @name           StudiVZ Preview Profile Picture
// @namespace      de.code-ix.studivz
// @description    Schnelle Vorschau des Profilbildes
// @include        http://www.studivz.net*
// ==/UserScript==

init();
const previewContainerName = 'CX_PreviewContainer';

function embedFunction(s) {
	document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

function createDiv() {
  var previewContainer = document.createElement('div');
  previewContainer.id = 'CX_PreviewContainer';
  
  var previewImage = document.createElement('img');
  previewImage.id = 'CX_PreviewImage';
  previewImage.src = 'http://static.pe.studivz.net/20110117-0/Img/standard-loader.gif';
  previewContainer.appendChild(previewImage);
  GM_addStyle("#CX_PreviewContainer { position: fixed; right: 20px; top: 20px;padding: 8px; -moz-box-shadow: 4px 4px 10px 0px black; display: none;}");
  return previewContainer;
}
function hideProfilePicture() {
  var previewImage = document.getElementById('CX_PreviewImage');
  var previewContainer = document.getElementById('CX_PreviewContainer');
  previewContainer.style.display = 'none';
  previewImage.src = 'http://static.pe.studivz.net/20110117-0/Img/standard-loader.gif';
}

function showProfilePictureDirect(src) {      
  var previewImage = document.getElementById('CX_PreviewImage');
  previewImage.src = src;
  var previewContainer = document.getElementById('CX_PreviewContainer');
  previewContainer.style.display = 'inherit';
    
}
function showProfilePicture(elem) {
  var previewContainer = document.getElementById('CX_PreviewContainer');
  var ajax = new XMLHttpRequest();
  ajax.open("GET", elem.parentNode.href, true);
  
  ajax.onreadystatechange = function(){     
    if (ajax.readyState == 4 && ajax.status == 200) {
      var s = ajax.responseText;
      var imgOffset, offset = 0;
      do {
        imgOffset = offset;
        offset = s.indexOf("<img ", offset+1);
      } while (s.indexOf('id="profileImage"', offset) > -1);
      offset = s.indexOf('src', imgOffset);      
      var previewImage = document.getElementById('CX_PreviewImage');
      previewImage.src = s.substring(s.indexOf('"', offset)+1, s.indexOf('"', offset+5));
      var previewContainer = document.getElementById('CX_PreviewContainer');
      previewContainer.style.display = 'inherit';
      elem.setAttribute("onmouseover", "showProfilePictureDirect('"+s.substring(s.indexOf('"', offset)+1, s.indexOf('"', offset+5))+"')");
    }
  };
  ajax.send(null);
}


function init() {
  document.body.appendChild(createDiv());
  var images = document.getElementsByTagName('img');
  for (var i=0; i<images.length; i++) {
    var imgParent = images[i].parentNode;
    if (imgParent.nodeName.toUpperCase() == 'A') {
      if (imgParent.href.indexOf('Profile') >= 0) {
        images[i].setAttribute("onmouseover", "showProfilePicture(this)");
        images[i].setAttribute("onmouseout", "hideProfilePicture(this)");
      }      
    }
  }
  
  embedFunction(showProfilePicture);
  embedFunction(showProfilePictureDirect);
  embedFunction(hideProfilePicture);
}
  


