// ==UserScript==
// @name           chris chase sucks
// @namespace      com.choibean.monkey.yahoo
// @description    remove chris chase articles from yahoo college basketball
// @include        http://rivals.yahoo.com/ncaa/basketball
// ==/UserScript==

var debug = (typeof(console) == 'object' && console.log);
var i = 0;

// target = elem.parentNode or elem.previousSibling
var check_offensive = function(elem, target) {
  if (!elem) return;
  if (elem.innerHTML.match(/chris chase/i)) {
    elem.style.opacity = 0.1;
    if (!target) return;
    target.style.opacity = 0.5;
    target.innerHTML = "Offensive material";
  }
};

// front page
var blog = document.getElementById('featured-blogs');
if (blog) {
  var dds = blog.getElementsByTagName('dd');

  for (i in dds) {
    var dd = dds[i];
    check_offensive(dd, dd.previousSibling);
  }
}
blog = document.getElementById('yui-main');
if (blog) {
  var divhds = blog.getElementsByClassName('hd');
  for (i in divhds) {
    var divhd = divhds[i];
    console.log(divhd)
    var by = divhd.getElementsByTagName('a');
    var elem = by[by.length-1];
    check_offensive(elem, divhd.parentNode)
  }
}