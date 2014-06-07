// ==UserScript==
// @name          histadrut hamorim fix
// @namespace amirrima
// @description   fixes hisradrut hamorim site - for my mom - this is the worst written site i have ever seen !
// @include  http://morim.itu.org.il/hmorim/shopper_enter.asp*
// ==/UserScript==

var link_list = document.getElementsByTagName('a');
for (var i = 0; i < link_list.length; i++) {
	var l = link_list[i].getElementsByTagName('input');
	for (var j=0; j<l.length; j++){
		link_list[i].parentNode.insertBefore(l[j],link_list[i]); 
	}
}
