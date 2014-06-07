// ==UserScript==
// @name        Userscripts.org Facebook Scam Hider warninGG
// @namespace   http://userscripts.org/scripts/review/165537
// @include     http*://userscripts.org/scripts*
// @version     11.34
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @updateURL   https://userscripts.org/scripts/source/165537.meta.js
// @downloadURL https://userscripts.org/scripts/source/165537.user.js
// @homepageURL https://userscripts.org/scripts/show/165537
// ==/UserScript==

loadJQcookies();
loadJQregex();

if ($.cookie('fbauto') == null) $.cookie('fbauto', '1', { expires: 730, path: '/' }); 

var tag = '<span style="color:darkred;font-weight:bold;">[SUSPECTED SCAM]</span>&nbsp; '

var caution = '<span style="color:darkred;font-weight:bold;margin-bottom:-10px;display:block;">Warning: This script is a suspected scam. Use caution when considering installing it.</span><br /><i>Author\'s description:</i> '

var regx = 	
	'a:regex(title,' + 
	'((facebook|fb).*auto.*(add|like|subscribe|follow|suggest|delete|poke|invite))' +
	'|(auto.*(add|like|subscribe|follow|suggest|delete|poke|invite).*(facebook|fb))' +
	'|((facebook|fb).*(add|like|subscribe|follow|suggest|delete|poke|invite).*auto)' + 
	'|((facebook|fb) subscribe)' +
	'|(auto.*poke)' +
	'|((facebook|fb).*invite.*)' +
	'|((facebook|fb).*invite.* all )' + 
	'|((facebook|fb).*emoticons)' + 
	')'  

//Block notorious scam authors' scripts
var regx2 = 'tr:regex(id,scripts-(' +  

        //nifty Tommy Larence
        '|163275|162679|162920|163197||162629||162765||162654||163275|' +
	
	 +
	
	'))';
	
var cFbauto;

$(regx).css('color','darkred');
$(regx2 + ' a.title').css('color','darkred');

$(regx).each(function(){
	if ($(this).hasClass('scam') == false){
		$(this).addClass('scam');
		$(this).before(tag);
		$(this).parent().children('p.desc').prepend(caution);
	}
});

$(regx2).each(function(){
	if ($('a.title', this).hasClass('scam') == false){
		$('a.title', this).addClass('scam');
		$('a.title', this).before(tag);
		$('p.desc', this).prepend(caution);
	}
});

var targets = $('a.scam').length;

function readCookie(){
	cFbauto = ($.cookie('fbauto') == 1) ? true : false;
}

readCookie();
if (cFbauto){
	$(regx).parents('tr').attr('hidden','');
	$(regx2).attr('hidden','');
	$('a[href^="/scripts?sort=name"]').after('&nbsp; <a href="#a" class="autoToggle">Toggle FB Scam Filter</a> &nbsp;<span class="autoText">(' + targets + ' hidden)</span>');
} else {
	$(regx).parents('tr').removeAttr('hidden');
	$(regx2).removeAttr('hidden');
	$('a[href^="/scripts?sort=name"]').after('&nbsp; <a href="#a" class="autoToggle">Toggle FB Scam Filter</a> &nbsp;<span class="autoText">(' + targets + ' shown)</span>');
}

$('a.autoToggle').click(function(){
	readCookie();
	if (cFbauto){
		$(regx).parents('tr').removeAttr('hidden');
		$(regx2).removeAttr('hidden');
		$('span.autoText').text('(' + targets + ' shown)');
		$.cookie('fbauto', '0', { expires: 730, path: '/' });
	} else {
		$(regx).parents('tr').attr('hidden','');
		$(regx2).attr('hidden','');
		$('span.autoText').text('(' + targets + ' hidden)');
		$.cookie('fbauto', '1', { expires: 730, path: '/' });
	}
});

// Add jQuery cookie functions: Makes the cookie functions above work. This must load above function use for Chrome/Tampermonkey support. 
// From https://github.com/carhartl/jquery-cookie. Compressed with http://closure-compiler.appspot.com/home
function loadJQcookies(){var e=jQuery,h=document,k=function(b){return b},m=function(b){return decodeURIComponent(b.replace(l," "))},l=/\+/g,d=
e.cookie=function(b,c,a){if(void 0!==c){a=e.extend({},d.defaults,a);null===c&&(a.expires=-1);if("number"===typeof a.expires){var f=a.expires,
g=a.expires=new Date;g.setDate(g.getDate()+f)}c=d.json?JSON.stringify(c):String(c);return h.cookie=[encodeURIComponent(b),"=",d.raw?c:encodeURIComponent(c),
a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+ a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}c=d.raw?k:m;
a=h.cookie.split("; ");f=0;for(g=a.length;f<g;f++){var j=a[f].split("=");if(c(j.shift())===b)return b=c(j.join("=")),d.json?JSON.parse(b):b}return null};
d.defaults={};e.removeCookie=function(b,c){return null!==e.cookie(b)?(e.cookie(b,null,c),!0):!1}}

//Add jQuery regex selector. From http://james.padolsey.com/javascript/regex-selector-for-jquery
function loadJQregex(){
	jQuery.expr[':'].regex = function(elem, index, match) {
		var matchParams = match[3].split(','),
			validLabels = /^(data|css):/,
			attr = {
				method: matchParams[0].match(validLabels) ? 
							matchParams[0].split(':')[0] : 'attr',
				property: matchParams.shift().replace(validLabels,'')
			},
			regexFlags = 'ig',
			regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
		return regex.test(jQuery(elem)[attr.method](attr.property));
	}
}