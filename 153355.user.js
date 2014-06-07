// ==UserScript==
// @name DerniersSujetsSeparation
// @namespace Forum
// @author Aversiste (updated by Gideon)
// @date 18/09/2011
// @version 2.5
// @description Separe le RP, le HRP et la FAQ dans la section 'Derniers Sujets'.
// @license WTF Public License; http://en.wikipedia.org/wiki/WTF_Public_License
// @include http://www.dreadcast.net/Forum
// @include http://www.dreadcast.net/Forum#
// @include http://www.dreadcast.net/FAQ
// @include http://www.dreadcast.net/FAQ#
// @include http://www.dreadcast.net/Forum/*
// @include http://www.dreadcast.net/FAQ/*
// @compat Firefox, Chrome
// ==/UserScript==

function isOnOrOff(node, str) {
	if (document.cookie.search('forum_derniers_sujets_'+str+'=on') != -1) {
		node.children[0].children[0].style.display = 'block';
		node.children[0].children[1].style.display = 'none';
		node.children[1].style.display = 'block';
	} else {
		node.children[0].children[0].style.display = 'none';
		node.children[0].children[1].style.display = 'block';
		node.children[1].style.display = 'none';
	}
}
function addClickEvent(node, str) {
	if ((navigator.userAgent).indexOf('Firefox') != -1) {
	node.children[0].addEventListener("click",
		function() {
		unsafeWindow.$(this).next().toggle();
		unsafeWindow.$(this).find('.symbol').toggle();
		unsafeWindow.writeCookie('forum_derniers_sujets_'+str,
		unsafeWindow.$(this).find('.symbol:first').css('display')
			== 'none' ? 'off' : 'on');
		}, false);
	} else {
	node.children[0].setAttribute("onclick",
"$(this).next().toggle();$(this).find('.symbol').toggle();writeCookie('forum_derniers_sujets_"+str+"',$(this).find('.symbol:first').css('display')=='none'?'off':'on');");
	}
}
function sortSection(node, callback) {
	var lis = node.getElementsByTagName('li');
	for (var i = 0; i < lis.length; ++i) {
		var nodeclass = lis[i].children[0].className;
		var id = parseInt(nodeclass.substring(2, nodeclass.indexOf(' ', 0)), 10);
		i = callback(node, i, id);
	}
}
(function() {
	// HRP section
	var hrp = document.getElementById('list_derniers_sujets');
	hrp.id = 'list_derniers_sujets_hrp';
	hrp.children[0].children[2].innerHTML = "Derniers sujets HRP";
	// All this part is only for dealing with the initial onclick event
	var h3 = document.createElement('h3');
	h3.className = 'link';
	for (var i = 0; i < 3; ++i)
		h3.appendChild(hrp.children[0].children[i].cloneNode(true));
	hrp.replaceChild(h3, hrp.children[0]);
	var rp = hrp.cloneNode(true);
	var faq = hrp.cloneNode(true);
	sortSection(hrp,
	  function(node,i,id){if(id>10){
		node.children[1].removeChild(node.children[1].children[i]);--i;}
		return i;});
	isOnOrOff(hrp, 'hrp');

	// FAQ section
	faq.id = 'list_derniers_sujets_faq';
	var faq_h3 = h3.cloneNode(true);
	faq.replaceChild(faq_h3, faq.children[0]);
	faq.children[0].children[2].innerHTML = "Derniers sujets FAQ";
	sortSection(faq,
	  function(node,i,id){if(id<26){
		faq.children[1].removeChild(faq.children[1].children[i]);--i;}
		return i;});
	isOnOrOff(faq, 'faq');
	var list_favoris = document.getElementById('list_favoris');
	hrp.parentNode.insertBefore(faq, list_favoris);

	// RP section
	rp.id = 'list_derniers_sujets_rp';
	var rp_h3 = h3.cloneNode(true);
	rp.replaceChild(rp_h3, rp.children[0]);
	rp.children[0].children[2].innerHTML = "Derniers sujets RP";
	sortSection(rp,
	  function(node,i,id){if(id<=10||id>=26){
		rp.children[1].removeChild(rp.children[1].children[i]);--i;}
		return i;});
	isOnOrOff(rp, 'rp');
	hrp.parentNode.insertBefore(rp, hrp);

	// New events
	addClickEvent(hrp, 'hrp');
	addClickEvent(faq, 'faq');
	addClickEvent(rp, 'rp');
})();
      