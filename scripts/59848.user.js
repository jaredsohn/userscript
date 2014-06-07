// ==UserScript==
// @name		UserScript.org 'New Group' Link
// @author		Erik Vold
// @datecreated	2009-10-14
// @lastupdated	2010-05-16
// @updateURL http://userscripts.org/scripts/source/59848.user.js
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @namespace	userscriptsOrgNewGroupLink
// @include		http://userscripts.org/groups?*
// @include		http://userscripts.org/groups#*
// @include		http://userscripts.org/groups
// @version		0.1.1
// @description	Adds a nice 'New Group' link to the Groups list at userscripts.org
// ==/UserScript==

var userscriptsOrgNewGroupLink={};
userscriptsOrgNewGroupLink.run=function(){
	var createLink=document.evaluate('//div[@id="right"]/p/a[contains(@href,"/groups/new")]',document,null,9,null).singleNodeValue;
	if(!createLink) return;
	var pagination=document.evaluate('//div[@id="content"]/div[contains(@class,"pagination")]',document,null,9,null).singleNodeValue;
	if(!pagination) return;
	var a=document.createElement('a');
	a.setAttribute('class','awesome small orange');
	a.setAttribute('style','float:right;');
	a.innerHTML='New group &raquo;';
	a.href='/groups/new';
	createLink.parentNode.parentNode.removeChild(createLink.parentNode);
	pagination.parentNode.insertBefore(a,pagination);
}
userscriptsOrgNewGroupLink.run();