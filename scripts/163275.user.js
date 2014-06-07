// ==UserScript==
// @name        Userscripts.org Facebook Scam Hider  *[UPDATED]*
// @namespace   http://userscripts.org/scripts/review/163275
// @include     http*://userscripts.org/scripts*
// @version     11.34
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @updateURL   https://userscripts.org/scripts/source/163275.meta.js
// @downloadURL https://userscripts.org/scripts/source/163275.user.js
// @homepageURL https://userscripts.org/scripts/show/163275
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

        //equazcion
        '|163038|156252|162621' +
	
	//Xtreme axe
	'|157074|156676|153937|157990|157423|157239|157424|161421|161422|156672' + 
	'|156393|162498|162496|162495|162494|162441' + 
	
	//PiFi CyberArt-Crew
	'|163091|161890|161110|160721|155402|155483|155729|157593|158512' + 
	
	//darsen
	'|163097|162925' +
	
	//fbfbfb
	'|161897|160326|160394' +
	
	//Sumit Patel
	'|162074|162195|162350|162255|162259|162265|162267|162154|162069|162135' + '|162235|162277|162356|162930|162932|162148|162144|162217' +
	
	//kamcalm
	'|163086|159552|159970|162886|162100|160007|161525|159587|159602|159877' +

	//Ashish Ankit
	'|163162|162643|162607' +
	
	//abelong
	'|163166|163165|160773|162908' +
	
	//GetFollowers Bot
	'|163158|162058|162906|161294|161301|161732|161730|161740|161741|161744' +
	'|161817|161733|160734|162776|162769|162355|162282|162281|162279|161335' +
	'|161743|161734|161735|161736|161737' +
	
	//Ashish Ankit 
	'|163169|162643|162607' +
	
	//re.za.reza.1213
	'162869|162874|162951|162955|162880' +
	
	//shay4383
	'161083|158757|160314|159097|158994' +
	
	//misc
	'|161083|163233|161156|161157|161158|161160|161161|161162|161165|161164|161167' +
	'|161179|161024|161025|161027|159705|161036|159500|160997|161101|161003|161004' +
	'|161006|161007|161009|161010|161011|161012' +
	
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