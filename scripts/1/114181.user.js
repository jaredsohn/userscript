// ==UserScript==
// @name           itnurk.com plussMordor
// @namespace      v6.nosepicking
// @description    plusOne remix - info: http://userscripts.org/scripts/show/114181
// @include        http://itnurk.com/voorum/teema/*/*
// @include        http://itnurk.com/logid/*/*
// @include        http://itnurk.com/urod/*/*
// @include        http://itnurk.com/onanurk/*/*
// @include        http://itnurk.com/uudised/*/*

// ==/UserScript==

// TODO: kas kasutada läbivalt jQuryt? äkki on aeglasem... kas maksab. kethel on x-kohtades
// TODO: "on page" edit "prompt asemel", 
// TODO: hardcoded piltide asemel insert url
// TODO: hardcoded piltide asemel "data:" pilt
// TODO: mõned loogika testid, et asjade muutumisel nii kergelt perse ei läheks.

(function() {

// Script Update Checker - tsekib uuendus kord päevas (v6i greasmonkey user commands menyy kaudu)
var SUC_script_num = 114181; // http://userscripts.org/scripts/show/114181
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

// gen defaults
var default_plusone_init = '[seadista esmakordselt +Mordor skript] +1:';
var default_plusone_firstsuggest = '@heart4';
var default_plusone = default_plusone_init;

// runtime config
var maxruntime_ms = 5000;
var maxruntime_slow_ms = 2000;
var loopstep_ms = 100;
var loopstep_slow_ms = 1000;

// runtime variables
var runtime_ms = 0;
var commentrun = false;
var slowmode = false;
var is_checking_now = false;

// sum extra cheks - foorumil on teine comment struktuur
var isfoorum = document.location.href.indexOf('/voorum/') > 0;

// selleks, et accessida jqueryt
if (typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }

// access to itnurk jquery
var $ = unsafeWindow.$;
var jQuery = unsafeWindow.jQuery;

// lisame doTimeout plugina
/*
 * jQuery doTimeout: Like setTimeout, but better! - v1.0 - 3/3/2010
 * http://benalman.com/projects/jquery-dotimeout-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($){var a={},c="doTimeout",d=Array.prototype.slice;$[c]=function(){return b.apply(window,[0].concat(d.call(arguments)))};$.fn[c]=function(){var f=d.call(arguments),e=b.apply(this,[c+f[0]].concat(f));return typeof f[0]==="number"||typeof f[1]==="number"?this:e};function b(l){var m=this,h,k={},g=l?$.fn:$,n=arguments,i=4,f=n[1],j=n[2],p=n[3];if(typeof f!=="string"){i--;f=l=0;j=n[1];p=n[2]}if(l){h=m.eq(0);h.data(l,k=h.data(l)||{})}else{if(f){k=a[f]||(a[f]={})}}k.id&&clearTimeout(k.id);delete k.id;function e(){if(l){h.removeData(l)}else{if(f){delete a[f]}}}function o(){k.id=setTimeout(function(){k.fn()},j)}if(p){k.fn=function(q){if(typeof p==="string"){p=g[p]}p.apply(m,d.call(n,i))===true&&!q?o():e()};o()}else{if(k.fn){j===undefined?e():k.fn(j===false);return true}else{e()}}}})(jQuery);




// if (typeof(GM_log)=='undefined') { GM_log=function(msg) { try { unsafeWindow.console.log('GM_log: '+msg); } catch(e) {} }; }
var _gt = function(e) { return document.getElementsByTagName(e); };
var _gi = function(e) { return document.getElementById(e); };
var _ce = function(e) { return document.createElement(e); };
var _ct = function(e) { return document.createTextNode(e); };
var _gc = function(clsName)
{
	var elems = document.getElementsByTagName('*');
	var j = 0;
	var arr = new Array();
	for (var i=0; (elem = elems[i]); i++) {
		if (elem.className == clsName) {
			arr[j] = elem;
			j++;
		}
	}
	return (arr.length > 0) ? arr : false;
};
var xpath = function(query, startingPoint)
{
	if (startingPoint == null) {
		startingPoint = document;
	}
	var retVal = document.evaluate(query, startingPoint, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	return retVal;
};
var xpathFirst = function(query, startingPoint)
{
	var res = xpath(query, startingPoint);

	if (res.snapshotLength == 0) return false;
	else return res.snapshotItem(0);
};
var swapNode = function(node, swap)
{
	var nextSibling = node.nextSibling;
	var parentNode = node.parentNode;
	swap.parentNode.replaceChild(node, swap);
	parentNode.insertBefore(swap, nextSibling);
};
var addGlobalStyle = function(css)
{
	var head, style;
	head = _gt('head')[0];
	if (!head) { return; }
	style = _ce('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
};


var insertAfter = function (referenceNode, newNode)
{
    referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
}

function outerHTML(node){
    return node.outerHTML || new XMLSerializer().serializeToString(node);
}

var imgs = {
	apple: 'data:image/png;base64,'
		+'iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAMAAAD6fQULAAAAB3RJTUUH2wkdCwQpMcUZ9gAAAAlw'
		+'SFlzAAALEgAACxIB0t1+/AAAAcJQTFRF////5ev5WoHhN2bbepnluMnvssTtaIzjNmbbh6Pm/P3+'
		+'9ff7RnDXHVDRHk/PHU7PHU/PHE7PHE3PHE7RHFDRiqPi1IehrShaqiVWqCRTqCNRqSJQqiJQqCJQ'
		+'ryZU8dvh9+fsxCxXwCRPvCJLuyBJuiBIvB9Hvh9H03SN95qa8yQo8yIk8h8i8x4h8x4g8h0e8h0d'
		+'8R0d73h5+mBe/iMh/iEe/h8c/h4a/h0b/h4Z/h0Z/RwY/R0X9315/v7++lU7/T4i/Tse/Doc/Tkc'
		+'/Tkb/Tka/TkZ+kAg/fLw+lcz/kgj/kYe/kQd/kIc/kMb/kMa/kQb+2E8+bRJ+6In+58l/J8i/J4h'
		+'/J4g+58g+6Af+6Id+6Qd+bMy/v78/N54/cMp/sEk/r4i/r8h/sAh/sEe/sMd/cQc/Mke/O+48fLc'
		+'ap8oYJkdXpUbX5YbX5caX5gaYJkaYJsZYJwYYZ0YY6Up1urRxeHBPpwzJZEaJZEZQJ40erxxUqlG'
		+'KJUaJ5UYKJYYbLZe9Prz+vz50+jQ1erT+/37hMB7c7ho0ujOwuG93+/cotGcKZcbXa9Q/f799Pnz'
		+'RaQ4Kpgby+XG5/Pkcrpnsdip7YiOogAAAAF0Uk5TAEDm2GYAAADKSURBVHjaY2CAgMlTpjLAQf+E'
		+'iZMQvO6e3j4Iq6m5pbWtvaOzyw7IKSuvqKyqrqmtq29oZMjMys7JzcsvKCwqLilliItPSExMSk5J'
		+'TUvPYGAICg4JDQuPiIyKjollYPD08vbx9fPz9w8IBBpi7+Do5Ozi6ubq5u7BwGBsYmpmbmFhaWVt'
		+'Y2vHoKmlraOrp6dvYGBgaMSgoKikrKKqBgLqGgwMYuISklLSMtKy0nLyDAzcPLx8/AKCQsIioiB3'
		+'MjIxs7CysXNwcjEAAPAULwOgMbBkAAAAAElFTkSuQmCC',

	macheart: 'data:image/png;base64,'
		+'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAMAAABFNRROAAAAB3RJTUUH2wkdDBc3r2pzggAAAAlw'
		+'SFlzAAALEgAACxIB0t1+/AAAAIRQTFRF////1uf3a4zn7+//1t73QmvWIVLWMVrW9+/vvUpztTFj'
		+'rSFS99bexjFavSFKxkJr/9bW90JC9yEh9zEx/+/v/0JC/yEY/97W/0ox/zkY/2NC/0IY/605/5wh'
		+'/85K/70h5+/Wa5wxWpQYY5QYa5wp7/fvSqVCOZwpIZQYxufG9//33u/ecZwTawAAAAF0Uk5TAEDm'
		+'2GYAAABuSURBVHjaRcfrEkMwGIThVdShtM4UVXxEJPd/f4TJ5Pnx7iwghJQCKgJY2cY52xnnG1sx'
		+'TjMRLUQzTSOGvzGg/xk92s5oUTdfralRlJVWFkCSZrc8wSmK35ePr54fhK9TEOFiO+7Tcx1o1sOy'
		+'1R6LDw3lQ8WWOQAAAABJRU5ErkJggg==',


	redheart_1: 'data:image/gif;base64,'
		+'R0lGODlhDAALALMAAN4AAN4AUv8AAP8AUv9rrf//////////////////////////////////////'
		+'/////yH5BAEAAAUALAAAAAAMAAsAAAQwsBQggKT2YhCEFxNAeIMwACVAEWOlvhXxqq63nWYF2vMr'
		+'TbrNT6LTDX8Y0PHnOUYAADs=',
		
	redheart_2: 'data:image/png;base64,'
		+'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBI'
		+'WXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAQAAAAEABcxq3DAAAB60lEQVQ4y62STUjTcRiAn99/'
		+'003NbVTmDMQQNqRUZhF5yLBDhRRCHYIg6BBEVJBdOtgpo0Nhpw6F0CWKgg4VHQKjpFWE9DFhpVGm'
		+'tE2ydIRj23/b/+Pt0ih0JYOe48vL837CL+LhcJ09Hu0CVvAbB6DxDzSAYy3NBxsSkbg1ciOc2BGK'
		+'blCq/tae7qH5i6ezn4/sS51r8g/8TaAAZns2f1y1uibAjxTa2BRzyvnJtXV9IGPZZGbmMWNzHIon'
		+'219DdLHACbDwbtpYmUrjKFhIzqTG7QykHkdI20I2ncdVsPCBt1QHDoBa03R36MYuw7DRgYxpk8kW'
		+'yOkGtmWTE5nsh37ALil4blijrYpgnUibrhS6CHnAUoqkSPQE9DZ6PZ6v+bwN5IEqwFyyj0G4GgF5'
		+'A/IMvh2FPqDifCh4yrjUJ4ktgcnbXaErs2cO2w9a1z0tOdJdeHkZbgKeYvB6vXeosKZWDKcm39f6'
		+'ZKLBJ+8rnRZQvcTQDaHiaEU6HVrbtFILMaVkAuQtyCBcoBw6YOMrSN2Hsd2wc7l8rcnt8v/5bAD7'
		+'oQeoWLbaSO+2O8bxvfbDZv+1mZMHsvdaGofLaveJr3pYr3RI0u2UcU+VjDq0WFmCkCL4Ar5EQR7B'
		+'h+3QWZYAYBO0n4UBFl3kv/MTfdO9SWWmJQIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTAtMDItMTBU'
		+'MDQ6MjM6NTItMDY6MDDWxFmlAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDA0LTEwLTEwVDE2OjM1OjI2'
		+'LTA1OjAwrGTcJAAAAABJRU5ErkJggg==',
		
	redheart_3: 'data:image/gif;base64,'
		+'R0lGODlhEAAQALMMAPEzM/eIiP3d3fq7u/iZme8iIvmqqvV3d/7u7vvMzO4REe0AAP///wAAAAAA'
		+'AAAAACH5BAEAAAwALAAAAAAQABAAQARCkMlJ6wwrax0o2WDWWQKwFIklJUUGlJliUEMIEhWigEqq'
		+'/r/EYCK06Da7jeBi24wkySaiYgoBppZEtAeUIA7YrjgCADs=',
		
	redheart_4: 'data:image/gif;base64,'
		+'R0lGODlhCQAIALMAAAAAAP///+0bI/aWef///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
		+'AAAAACH5BAEAAAQALAAAAAAJAAgAAAQWMAgR6pRjUJFn1p/3hdhIWWSFnqrVRgA7'
};


var _register_usermenu_plusone = function(){
	GM_registerMenuCommand(
		'Konfigureeri: vaheta +1 teksti/pilti',
		_set_plusone
	);
}

var _set_plusone = function (){

	var old = GM_getValue('plusone_replacement', default_plusone);
	var showvalue = (old == default_plusone_init)?default_plusone_firstsuggest:old;

	var msgprompt = "Mis tekst kuvatakse '+1:' asemel?";
	var	msgimg = 'Tähed sakivad? Kasuta pilte! Sisesta:'
		+ "\n@<3"
		+ "\n@apple"
		+ "\n@mac"
		+ "\n@gay"
		+ "\n@heart1"
		+ "\n@heart2"
		+ "\n@heart3"
		+ "\n@heart4";

	var res = prompt(msgprompt + "\n\n" + msgimg, showvalue);
	//if(res == '!help'){
	//	alert(msg);
	//	_set_plusone();
	//}else{
		if(res != '' && res != null){
			GM_setValue('plusone_replacement', res);
		}
	//}
}

var _onpage_set_plusone = function(){ 
	// TODO: make it onpage edit, instead prompt
	_set_plusone();
}
var _insert_edit_mode = function(el){
	
	var res = xpath('//*[@class="pluss1replacement_edit"]', el);
	// if(res !== false){return;} // not working

	if(res){
		var len = res.snapshotLength;
		if(len){
			for(var i = 0; i < len; i++){
				var el = res.snapshotItem(i);
				el.parentNode.removeChild(el);
			}
		}
	}

	
	var spanedit = _ce('span');
	spanedit.setAttribute('class', 'pluss1replacement_edit')
	
	spanedit.appendChild(_ct(' Muuda +Mordor skripti seadeid '));
	insertAfter(el, spanedit);

	spanedit.addEventListener('click', function(e){
		e.preventDefault();
		this.parentNode.removeChild(this);
		_onpage_set_plusone();
	}, false);
}

var _try_plusone_modifications = function(){
	var pluss, len, pdiv, uname, n, clen, span, img;

	/* - ideas not working millegip2rast
	var komm = $("#kommentaarid");
	var aftercomload = function(){
		// alert($("#kommentaarid").html());
		alert('loaded');
	}'
	if (komm.addEventListener) {
		komm.addEventListener ('DOMSubtreeModified', aftercomload, false);
	}
	*/
	/*
	// komm.bind('DOMSubtreeModified', aftercomload, false);
	// alert($("#kommentaarid").html());
	*/

	if(isfoorum){
		pluss = xpath('//div[@class="pluss"]/div[@user_name]', document);
	}else{
		pluss = xpath('//div[@class="pluss"]/a[contains(@href,"/nurklane/")]', document);
	}
	
	if(len = pluss.snapshotLength){
		commentrun = true;

		if(isfoorum){
			for(var i = 0; i < len; i++){
				uname = pluss.snapshotItem(i);
				uname.innerHTML = uname.innerHTML.replace(': +1', ' ');
			}
		}else{
			pluss = xpath('//div[@class="pluss"]', document);
			len = pluss.snapshotLength;
			for(var i = 0; i < len; i++){
				uname = pluss.snapshotItem(i);
				uname.innerHTML = uname.innerHTML.replace(/: \+1/g, ' ');
			}		
		}

		var plustext = GM_getValue('plusone_replacement', default_plusone);
		var initmode = (plustext == default_plusone_init);

		var imgmode = false;
		var imgidx = '';

		switch(plustext){
			case '@apple':		imgidx = 'apple';		imgmode = true; break;
			case '@mac':		imgidx = 'macheart';	imgmode = true; break;
			case '@gay':		imgidx = 'macheart';	imgmode = true; break;
			case '@<3':			imgidx = 'redheart_1';	imgmode = true; break;
			case '@heart1':		imgidx = 'redheart_1';	imgmode = true; break;
			case '@heart2':		imgidx = 'redheart_2';	imgmode = true; break;
			case '@heart3':		imgidx = 'redheart_3';	imgmode = true; break;
			case '@heart4':		imgidx = 'redheart_4';	imgmode = true; break;
		}

		// teeme pervolt, kuna millegi pärast xpathi "startingPoint" ei toimi. FF 3.6
		pluss = xpath('//div[@class="pluss"]', document);
		len = pluss.snapshotLength;

		for(var i = 0; i < len; i++){
			pdiv = pluss.snapshotItem(i);
			clen = pdiv.childNodes.length;
			for(n = 0; n <clen; n++){
				var nodeName = pdiv.childNodes[n].nodeName;
				if(nodeName == 'DIV' || nodeName  == 'A' ){ // n6me test. ma ei viitsi paremat hetkel m6elda.
					span = _ce('span');
					span.setAttribute('class', (initmode?'pluss1replacement pluss1replacement_init':'pluss1replacement'));
					span.setAttribute('title', 'Kliki, et muuta +Mordor seadeid');

					if(imgmode){
						img = _ce('img');									
						img.setAttribute('src', imgs[imgidx]);
						img.setAttribute('class', 'pluss1replacementimg');
						span.appendChild(img);
						span.appendChild(_ct(' '));
					}else{
						span.appendChild(_ct(plustext + ' '));
					}
					span.addEventListener("click", function(e){ // doubleClick
						e.preventDefault();
						_insert_edit_mode(this);
					}, false);	
					pdiv.insertBefore(span, pdiv.firstChild);
					break;
				}
			}
		}
	}else{
		if($("#kommentaarid").html() == 'Kommentaarid puuduvad!'){ // midagi paremat detekti oleks vaja
			commentrun = true;
		}
	}
}

var _try_plusone_modifications_loop = function(){
	if(is_checking_now){ // skip dualrun
		return true;
	}
	
	is_checking_now = true;

	_try_plusone_modifications();

	if(runtime_ms > maxruntime_ms){
		commentrun = true;
	}

	runtime_ms = runtime_ms + (slowmode?loopstep_slow_ms:loopstep_ms);

	if ( commentrun == true ) { // do stop
		$.doTimeout( 'checkforcomments' ); // kill timeout
		is_checking_now = false;
		return false;
	}

	if( runtime_ms > maxruntime_slow_ms){ // switch do slow mode
		slowmode = true;
		$.doTimeout('checkforcomments');

		$.doTimeout(
			'checkforcomments_slow', 
			loopstep_slow_ms, 
			_try_plusone_modifications_loop
		);
	}
	is_checking_now = false;
	return true;
}

var Optionset = function(){
	this.plusonetext_fontweight		= 'bold';
	this.plusonetext_fontsize		= '80%';

	this.plusoneuser_fontweight		= 'normal';
	this.plusoneuser_fontsize		= '80%';

	this.plusoneedit_fontweight		= 'bold';
	this.plusoneedit_fontcolor		= 'red';
	this.plusoneedit_fontsize		= '100%';

	this.plusoneinit_fontcolor		= 'gray';

	this.plusone_singleline			= '1';
	this.plusone_imagemarginright	= '5px';
}

var _mapuseroptions = function(options){
	if(typeof options == 'undefined' || options == null){
		var options = new Optionset();
	}
	// do stuff here
	return options;
}


var _addstyles = function(options){
	var options = _mapuseroptions();
	var css = '';

	if(options.plusone_singleline){
		css = css 
			+ 'div.pluss div{display: inline;}'
			+ 'div.pluss br{display: none;}';
	}

	css = css 		
		+ '.pluss1replacement{' 
			+ 'font-weight: '	+ options.plusonetext_fontweight + ';' 
			+ 'font-size: '		+ options.plusonetext_fontsize + ';'	
		+ '}'
		+ '.pluss1replacement_edit{'
			+ 'color: '			+ options.plusoneedit_fontcolor + ';'
			+ 'font-size: '		+ options.plusoneedit_fontsize + ';'
			+ 'font-weight: '	+ options.plusoneedit_fontweight + ';'
		+ '}'
		+ '.pluss1replacementimg{'
			+ 'margin-right: '	+ options.plusone_imagemarginright + ';'
			+ '}'
		+ '.pluss1replacement_init{'
			+ 'color: '			+ options.plusoneinit_fontcolor + ';'
		+'}'
		+ 'div.pluss a{'
			+ 'font-weight: '	+ options.plusoneuser_fontweight + ';'
			+ 'font-size: '		+ options.plusoneuser_fontsize + ';'
		+ '}'
		+ '.pluss1replacement, .pluss1replacement_edit, .pluss1replacement_init{'
			+ 'cursor: pointer;'
		+ '}';

		// + 'div.pluss div a{font-weight: ' +  + '; font-size: ' +  + ';}'

	addGlobalStyle(css);
}

var _main = function(){
	_addstyles();
	
	_register_usermenu_plusone();

	_try_plusone_modifications();

	if ( commentrun == true ) {
		// alert('never run dalay');
	}else {
		$.doTimeout(
			'checkforcomments', 
			loopstep_ms, 
			_try_plusone_modifications_loop
		);
	}
}

_main(); // GO!

})();
