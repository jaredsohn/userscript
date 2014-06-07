// ==UserScript==
// @name          ReadManga GET Links
// @include       http://adultmanga.ru/*/vol*
// @include       http://readmanga.ru/*/vol*
// @version       0.80
// @description   Automatically get image links for download manga chapters
// @author        Copyrightr (icq:190800)
// --------------------------------------------------------------------
// ==/UserScript==


(function () {

// == Initialize global variable and styles ==
var aWindow = (typeof unsafeWindow != 'undefined')? unsafeWindow: window;
GM_addStyle("#mg_container {display:none !important;}");
GM_addStyle(".ChapterBoxes {display:block !important; position:absolute; top:0px; height:100%; padding:4px;}"); 

// == MAIN ==
function init(){
	var dpics = aWindow.pictures || aWindow.pics;
	var ddivlink = document.createElement('div');
	var ch_num = $('chapterSelectorSelect').selectedIndex;
	var ads = new Array('translator_ba', 'manga_ba reader_bottom_ba');

	aWindow.rm_h.goPrev = function(){if(_('pageSelector').selectedIndex == 0){aWindow.rm_h.goToChapter($("chapterSelectorSelect")[ch_num+1].value);}else{aWindow.rm_h.goPage(_('pageSelector').selectedIndex-1, true);}}//goPrev bugfix
	for(var key in ads){var elem = $(ads[key]) || _(ads[key]); removeADS(elem);}
	
	ddiv = _('manga_ba top_ba');
	ddiv.style.height = 'auto';
	ddiv.style.border = '1px dashed #000000';
	ddiv.style.position = 'relative';

	if($("chapterSelectorSelect")[ch_num+1]){ddiv.innerHTML = '<a title="Previous chapter" href="javascript:window.location=\'' +$("chapterSelectorSelect")[ch_num+1].value+ '\'" style="left:0px; display:none;" class="ChapterBoxes">««<br/>««</a>';}
	if($("chapterSelectorSelect")[ch_num-1]){ddiv.innerHTML += '<a title="Next chapter" href="javascript:window.location=\'' +$("chapterSelectorSelect")[ch_num-1].value+ '\'" style="right:0px; display:none;" class="ChapterBoxes">»»<br/>»»</a>';}
	
	ddivlink.innerHTML = '<a style="font-weight:bold; display:block; border:1px dashed #000000; border-top:none; margin-bottom:20px;" href="javascript:if(typeof(dwin)==\'undefined\'){dwin=window.open(\'\', \'alllinks\');dwin.document.write(document.getElementsByClassName(\'manga_ba top_ba\')[0].innerHTML)}">Open links in new window</a>'
	var dcode = 'Direct links of pictures:<br/>';
	for (var i=0; i<dpics.length; ++i){
		if(dpics[i].url.search('credit')!=-1){
			dcode+='<span title="Deleted from links">'+i+'</span>&nbsp';
		}else{
			dcode+='<a href="'+dpics[i].url+'" target="_blank">'+i+'</a>&nbsp';
		}
		if(i==45 || i==87 || i==121 || ((i-121)%30==0 && i>121))dcode+='<br/>';
	}

	ddiv.innerHTML += dcode + '<br/><br/>';
	insertAfter(ddivlink, ddiv);

	if(GM_getValue("image_preload")==false){
		GM_registerMenuCommand('Enable image loading', function(){GM_setValue("image_preload", true);window.location.reload();});
		window.stop();
		aWindow.rm_h.goNext = function(){return false;}
		aWindow.rm_h.goPage = function(){return false;}
	}else{
		GM_registerMenuCommand('Disable image loading', function(){GM_setValue("image_preload", false);window.location.reload();});
	}
	//for (i=0; i < navigator.plugins.length; i++) {if(navigator.plugins[i].filename=="npdm.dll"){ /*action*/ }} Download Master
}
// == END-MAIN ==


// ====== Usefull routine (func)===
function $(id){return document.getElementById(id);}
function _(id){return document.getElementsByClassName(id)[0];}
function insertAfter(elem, refElem){return refElem.parentNode.insertBefore(elem, refElem.nextSibling);}
function removeADS(elem){if(elem){elem.parentNode.removeChild(elem);}}
// ======================
init();
// ======================
})();