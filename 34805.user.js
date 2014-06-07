// ==UserScript==
// @name           Forge Forbes Slideshow
// @namespace      forgeforbesslideshow
// @description    Forges/Shows any Forbes Slideshow on ONLY 1-page.
// @include        http://*forbes.com*slide*
// @author         Inderpreet Singh
// ==/UserScript==
// http://forbes-slideshows.urbangen.com
//
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==


// gets the url
function get(url, cb) {
  GM_xmlhttpRequest({
    method: "GET",
     url: url,
     onload: function(xhr) { cb(xhr.responseText); }
  });
}


// prints the slide img/text
function inform(text) {
  img = text.match(/<div class\="slideimgbox"[\s\S]*?div\>/)[0];
  text = text.match(/<blockquote[\s\S]*?blockquote>/m)[0];
  
  dummyDiv = document.createElement('div');
  dummyDiv.innerHTML = '<table><tr><td>' + img + '</td><td><span style="color: red">' + text + '</span></td></tr></table>';
  //document.body.insertBefore(dummyDiv.firstChild, document.body.firstChild);
  document.body.appendChild(dummyDiv);
}


// the main function called when user clicks "Forge Forbes Slideshow"
function getemForbes() {

  var loc = location.href;


  // stops the slideshow (this is the only way I know)
  location.href = "javascript:void(slides('stp'));";

  
  var amt = window.prompt("How many slides in this slideshow?");
  
  
  // clear the page 
  document.body.innerHTML = "";
  
  // get the first page
  firstpage = loc;
  if (loc.match(/slide_([0-9]+)/))
    firstpage = loc.replace(/slide_([0-9]+)/,'slide')
  get(firstpage, inform);
  
  // get the rest of the pages
  for (var x = 0; x <= amt-1; x++)
  {
    if (loc.match(/slide_([0-9]+)/))
      loc = loc.replace(/slide_([0-9]+)/,'slide_'+(2+x))
    else
      loc = loc.replace(/slide\./,'slide_'+(2+x)+'.')
    get(loc, inform);
  }
  
}


// only works when user is visiting a slide show page
/* the other way
if (location.href.match(/slide/))
{
	linkDiv = document.createElement('div');
	linkDiv.innerHTML = ' <a id="slideit">Forge this Forbes Slideshow</a> ';
	linkDiv.addEventListener('click', getemForbes, true);
	document.body.insertBefore(linkDiv, document.body.firstChild);
}
*/

// only works when user is visiting a slide show page
if (location.href.match(/slide/))
{ 
  // position:fixed means stay fixed even the page scrolls. z-index keeps your iframe on top.
  // The remainder of the line smacks the panel into the bottom left corner, out of your way.
  // Overflow (in combination with the setTimeout) ensures the iframe fits your entire panel.
  var css = 'position:fixed; z-index:9999; bottom:0; left:0; border:0; margin:0; padding:10px; ' +
            'overflow:hidden;'

  var iframe = document.createElement('iframe');
  iframe.innerHTML = '  ';
  iframe.setAttribute('style', css);

  // The about:blank page becomes a blank(!) canvas to modify
  iframe.src = 'about:blank';

  document.body.appendChild(iframe);

  // Make sure Firefox initializes the DOM before we try to use it.
  iframe.addEventListener("load", function() {
      var doc = iframe.contentDocument;
      doc.body.style.background = 'red';
      doc.body.innerHTML = '<a id="slideit">Forge this Forbes Slideshow</a> ';
      doc.body.addEventListener('click', getemForbes, true);
      iframe.style.width = doc.body.offsetWidth + "px";
      iframe.style.height = doc.body.offsetHeight + 10 + "px";
  }, false);
}