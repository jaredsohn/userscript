// ==UserScript==
// @name          Xianguo_OpenBackground
// @namespace     http://userstyles.org
// @description	  Open feed item in background by pressing 'y'
// @version       1.0
// @author        Xi Chen
// @include       http://*xianguo.com/reader*
// ==/UserScript==

var x;
var link;

document.addEventListener('keypress', function(event) {
	if( event.which==121) {
		x=document.getElementsByClassName('item_selected');
		//if no feed item selected, exit
		if(x==null){
			return;
		}
		x = x[0].getElementsByClassName('item_src');
		link=x[0].getAttribute('href');
		event.stopPropagation();
		event.preventDefault();
		GM_openInTab(link);
	}
   
}, true);
