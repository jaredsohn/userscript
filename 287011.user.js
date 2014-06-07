// ==UserScript==
// @name           Google Images direct link
// @namespace      http://userscripts.org/users/lorentz
// @description    Add direct link to images and pages in google image search
// @include        http*://images.google.*/images*
// @include        http*://www.google.*/images*
// @include        http*://www.google.*/webhp*
// @include        http*://www.google.*/search?*
// @include        http*://www.google.*/imgres*
// @include        http*://images.google.*/search?*
// @include        https://encrypted.google.com/search?*
// @version        4.6
// @grant          none
// ==/UserScript==

/**
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


var doubleDecodeURIComponent = function (component){
  var tmp = decodeURIComponent(component);
  tmp = decodeURIComponent(tmp);
  return tmp;
}

var parseUrl = function (url) {
  var qstr = url.split('?');
  if (qstr.length <= 1)
    return [];
  var rawparams = qstr[1].split('&');
  var par = [];
  for (var i=0 ; i<rawparams.length ; i++){
    var p = rawparams[i].split("=");
    par[p[0]] = p[1];
  }
  return par;
}

var getImageLinks = function (url){
  var param = parseUrl(url);
  var links = new Object();
  links.toImgHref = decodeURIComponent(param["imgurl"]);
  links.toPageHref = decodeURIComponent(param["url"]);
  return links;  
}

var getNewImageLinks = function (url){
  var param = parseUrl(url);
  var links = new Object();
  links.toImgHref = doubleDecodeURIComponent(param["imgurl"]);
  links.toPageHref = decodeURIComponent(param["imgrefurl"]);
  return links;  
}

var firstOrNull = function (elems){
  return (elems.length > 0 ) ? elems[0] : null;
}

var imgTable = firstOrNull(document.getElementsByClassName('images_table'));

if (imgTable) { // for basic version
  var imgCell = imgTable.getElementsByTagName('td');
  for( j=0 ; j<imgCell.length ; j++ ) {
    var imageAnchor = imgCell[j].getElementsByTagName('a')[0];
    var domainText =  imgCell[j].getElementsByTagName('cite')[0];
    console.log(imageAnchor.href);
    var links = getImageLinks(imageAnchor.href);
    //links.toPageHref = imageAnchor.href; // TODO fixme
    links.toImgHref = imageAnchor.href; // TODO fixme
    
    domainText.innerHTML = '<a href="' + links.toPageHref + '">' + domainText.innerHTML + '/&hellip;<\a>';
    imageAnchor.href = links.toImgHref;
  }
}
else { // standard version
  var stopEvent = function(event){ event.stopPropagation() }
  
  var fixStyle = function(target){
    var parent = target.parentNode;
    parent.style.height = target.style.height;
    parent.style.width = target.style.width;
    parent.style.left = target.style.left;
    target.style.left = 'auto';
  }
  
  var fixBoxObserver = new MutationObserver(function(mutations){
    mutations.forEach(function(mutation) {
      var target = mutation.target;
      var parent = mutation.target.parentNode;
      if (mutation.attributeName === 'style' && target.style.left !== 'auto'){
	fixStyle(target);
      }
    });
  });
  var fixBoxMutationConfig = { attributes: true, childList: true, characterData: false, subtree: false };
  
  
  
  var fixImageBox = function(image){
    if ( /\blinkOk\b/.test(image.className) ) {
      return;
    }
	  
    var span = firstOrNull(image.getElementsByTagName('span'));
    if (span !== null) {
      var a = firstOrNull(image.getElementsByTagName('a'));
      var links = getNewImageLinks(a.href);
      a.href = links.toImgHref;
      a.addEventListener('click', stopEvent, false);

      var newContainer = document.createElement('div');
      newContainer.className = 'newCont';

      a.parentNode.appendChild(newContainer);
      newContainer.appendChild(a);
      newContainer.appendChild(span.parentNode);

      fixStyle(a);
      
      var desc = span.innerHTML;
      span.innerHTML = '<a style="color:#fff" href="' + links.toPageHref + '">' + desc + '</a>';
      image.className += ' linkOk'
      fixBoxObserver.observe(a, fixBoxMutationConfig);
    }
    else{
      console.log("incomplete span " + image.outerHTML)
      image.className += ' notComplete'
      
    }
    
  }
  
  var fixImages = function(imagesContainer){
    var images = imagesContainer.getElementsByClassName('rg_di');
    for (var i = 0 ; i< images.length ; i++) {
      fixImageBox(images[i]);
    }
  }
  
  var imagesContainer = document.getElementById('rg_s');

  var newBoxMutationConfig = { attributes: false, childList: true, characterData: false, subtree: false };
  var newBoxObserver = new MutationObserver(function(mutations){
    fixImages(imagesContainer);
  });
  fixImages(imagesContainer);
  newBoxObserver.observe(imagesContainer, newBoxMutationConfig);

  var css = [];  var i = 0;
  css[i++] = '.newCont { position: relative; }';
  css[i++] = '.newCont .rg_ilmbg { display: none; }';
  css[i++] = '.newCont:hover .rg_ilmbg { display: block; }';
  var style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css.join('\n')));
  document.head.appendChild(style);

} //end standard version