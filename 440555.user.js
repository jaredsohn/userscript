// ==UserScript==
// @name           Tumblr Tophats
// @namespace      the.vindicar.scripts
// @description    Adds tophat to certain users' icons on your dash.
// @grant	unsafeWindow
// @grant	GM_getValue
// @grant	GM_setValue
// @grant	GM_registerMenuCommand
// @updateURL      http://userscripts.org/scripts/source/440555.meta.js
// @downloadURL    http://userscripts.org/scripts/source/440555.user.js
// @version	1.0.0
// @include        http://www.tumblr.com/*
// ==/UserScript==

(function(){
if (typeof unsafeWindow.Tumblr == 'undefined')
	return;
$ = unsafeWindow.jQuery; //using jQuery lib used by Tumblr. Not quite safe, but it's better than copy-pasting it here.
//If we have no access to Greasemonkey methods, we will need dummy replacements
if (typeof GM_getValue == 'undefined') 
	GM_getValue = function (target, deflt) { return deflt; };
if (typeof GM_setValue == 'undefined') 
	GM_setValue = function (target, value) { alert('Can not save value of "'+target+'" - GM_setValue not found.'); };
if (typeof GM_registerMenuCommand == 'undefined') 
	GM_registerMenuCommand = function () {};

//URL of the tophat	
var URL = "http://assets.tumblr.com/images/april_fools/tophat.png";
//image size in pixels [width, height]
var SIZE = [66,64];
//image offset in pixels [horizontal, vertical]
var OFFSET = [-40, -20];
//whom to give the tophat. must be comma-separated list of blognames, or special items "*me" (your posts) and "*all" (all users).
var WHO = GM_getValue('tophats',/*default goes here >>>*/'*me');

//short function for adding custom CSS rules. Why use Greasemonkey specific GM_setStyle() just for that?
function addCSS(rule) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	if (typeof styleElement.styleSheet !== 'undefined')
		styleElement.styleSheet.cssText = rule;
	else
		styleElement.appendChild(document.createTextNode(rule));
	document.getElementsByTagName("head")[0].appendChild(styleElement);
	}

addCSS([
	'.tophat {',
	"	content:'';",
	'	display:block;',
	'	position: absolute;',
	'	left: 0; top: 0;',
	'	margin: '+OFFSET[0]+'px 0px 0px '+OFFSET[1]+'px;',
	'	width: '+SIZE[0]+'px; height: '+SIZE[1]+'px;',
	"	background: url('"+URL+"') no-repeat scroll center center transparent;",
	'	pointer-events: none;',
	'	z-index: 1;',
	'}',
	].join(" "));

function parseList(list) {
	var lst = list.split(',');
	var res = [];
	var term;
	for (var i=lst.length-1;i>=0;i--) {
		term = lst[i];
		if (term.trim().length>0)
			res.push(term.toLowerCase());
		}
	res.sort();
	return res;
	}

function setList(target,description,deflt) {
	return (function() {
		var list = GM_getValue(target, deflt);
		list = prompt(description, list);
		if (list!=null) {
			var res = parseList(list);
			GM_setValue(target, res.join(','));
			location.reload();
			}
		});
	}
	
function filterfunc(){
	if (filterfunc.list.indexOf('*all') != -1)
		return true;
	if ((filterfunc.list.indexOf('*me') != -1) && $(this).hasClass('is_mine'))
		return true;
	return filterfunc.list.indexOf($(this).attr('data-tumblelog-name')) != -1;
	}
filterfunc.list = parseList(WHO);
	
function processPosts() {
	var $posts = $('#posts').find('li .post');
	var $tophats = $posts.has('.tophat');
	$posts.not($tophats).filter(filterfunc).each(function(){
		var $this = $(this);
		var $template = $("<div class='tophat'></div>");
		$this.find('.post_avatar').append($template);
		});
}

//process posts that are loaded already
processPosts(); 
//and ensure we are notified whenever new portion of posts is loaded
unsafeWindow.AfterAutoPaginationQueue.push(processPosts);

GM_registerMenuCommand('Tophatted users', setList('tophats','Enter comma-separated list of tophatted users (*me means yourself, *all means everyone):',WHO));
})();