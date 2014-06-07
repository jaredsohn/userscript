// ==UserScript==
// @name           check input field color
// @version        2012.2.8
// ==/UserScript==
function check_color( y)
{
  var ystyle = getComputedStyle(y, ":focus");
  if ( ystyle.backgroundColor == ystyle.color) {
    var bg = ystyle.backgroundColor.toString().replace( /[rgb() ]/g, "").split(",");
    y.style.color = "rgb(" + (255-bg[0]) + "," + (255-bg[1]) + "," + (255-bg[2]) +")";
  }
}
function check_element_by_tag( tag)
{
  var x=document.getElementsByTagName(tag);
  for ( var i = 0, y; y = x[i++] ;) {
    check_color(y);
  }
}
window.addEventListener("load", check_element_by_tag("textarea")); 
window.addEventListener("load", check_element_by_tag("input")); 