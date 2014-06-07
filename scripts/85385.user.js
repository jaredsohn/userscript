// ==UserScript==
// @name           Makoto Msg Filter
// @author         Aversiste
// @date           04/09/2010
// @version        0.3
// @description	   Allow misterfox.fr users to don't see Makoto's spam messages.
// @license        WTF Public License; http://en.wikipedia.org/wiki/WTF_Public_License
// @include        http://misterfox.fr/*
// ==/UserScript==


// Uncomment this function if the script don't work !
/* document.getElementsByClassName =
function(cl) {
	var retnode = [];
	var myclass = new RegExp('\\b'+cl+'\\b');
	var elem = this.getElementsByTagName('*');

	for (var i = 0; i < elem.length; i++)
		if (myclass.test(elem[i].className))
			retnode.push(elem[i]);
	return retnode;
}; */

(function () {
	// Forum msgs and Chatbox
	var node = document.getElementsByClassName('msg_link_pseudo');
	
	for (var i=0; i < node.length; ++i)
		if (node[i].innerHTML.indexOf('Makoto') != -1)
			node[i].parentNode.parentNode.parentNode.style.display = "none";
			
	// Mini chatbox
	node = document.getElementsByClassName('small_link');
	for (i=0; i < node.length; ++i)
		if (node[i].innerHTML.indexOf('Makoto') != -1 && node[i].parentNode.nodeName != 'TD')
			node[i].parentNode.style.display = "none";
})();
