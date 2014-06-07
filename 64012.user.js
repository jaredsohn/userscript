// ==UserScript==
// @name           FDZone Extra Smilies++
// @namespace      http://userscripts.org/people/26505
// @require        http://java.6te.net/fdzone/jquery-1.3.2.min.js
// @require        http://java.6te.net/fdzone/jquery-ui-1.7.2.custom.min.js
// @namespace      http://userscripts.org/people/26505
// @description    Add extra smilies support
// @include        http://pro.tw.fdzone.org/viewthread.php?*
// @include        http://pro.tw.fdzone.org/post.php?*
// ==/UserScript==

var wanwanImgs = new Array(
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/wawa/051.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/wawa/052.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/wawa/002.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/wawa/044.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/wawa/043.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/wawa/045.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/wawa/048.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/wawa/047.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/wawa/027.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/wawa/033.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/wawa/034.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/wawa/039.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/wawa/040.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/wawa/035.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/wawa/021.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/wawa/022.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/wawa/023.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/wawa/025.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/wawa/028.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/wawa/017.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/wawa/014.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/wawa/012.gif');

var eggImgs = new Array(
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/egg/68.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/egg/26.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/egg/90.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/egg/81.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/egg/82.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/egg/77.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/egg/73.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/egg/72.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/egg/99.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/egg/65.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/egg/64.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/egg/63.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/egg/56.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/egg/45.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/egg/4.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/egg/27.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/egg/33.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/egg/96.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/egg/2.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/egg/16.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/egg/105.gif',
	'http://s1006.photobucket.com/albums/af186/gorjklwpcv/egg/109.gif');

var monkeyImgs = new Array(
'http://i63.photobucket.com/albums/h153/zach14c/monkey/MKY_028.gif',
'http://i63.photobucket.com/albums/h153/zach14c/monkey/MKY_041.gif',
'http://i63.photobucket.com/albums/h153/zach14c/monkey/MKY_042.gif',
'http://i63.photobucket.com/albums/h153/zach14c/monkey/MKY_077.gif',
'http://i63.photobucket.com/albums/h153/zach14c/monkey/MKY_033.gif',
'http://i63.photobucket.com/albums/h153/zach14c/monkey/MKY_034.gif',
'http://i63.photobucket.com/albums/h153/zach14c/monkey/MKY_036.gif',
'http://i63.photobucket.com/albums/h153/zach14c/monkey/MKY_037.gif',
'http://i63.photobucket.com/albums/h153/zach14c/monkey/MKY_039.gif',
'http://i63.photobucket.com/albums/h153/zach14c/monkey/MKY_053.gif',
'http://i63.photobucket.com/albums/h153/zach14c/monkey/MKY_051.gif',
'http://i63.photobucket.com/albums/h153/zach14c/monkey/MKY_012.gif',
'http://i63.photobucket.com/albums/h153/zach14c/monkey/MKY_056.gif',
'http://i63.photobucket.com/albums/h153/zach14c/monkey/MKY_058.gif',
'http://i63.photobucket.com/albums/h153/zach14c/monkey/MKY_059.gif',
'http://i63.photobucket.com/albums/h153/zach14c/monkey/MKY_060.gif',
'http://i63.photobucket.com/albums/h153/zach14c/monkey/MKY_068.gif',
'http://i63.photobucket.com/albums/h153/zach14c/monkey/MKY_066.gif',
'http://i63.photobucket.com/albums/h153/zach14c/monkey/MKY_071.gif',
'http://i63.photobucket.com/albums/h153/zach14c/monkey/MKY_073.gif',
'http://i63.photobucket.com/albums/h153/zach14c/monkey/MKY_074.gif',
'http://i63.photobucket.com/albums/h153/zach14c/monkey/MKY_080.gif');

var onionImgs = new Array(
'http://i63.photobucket.com/albums/h153/zach14c/onion/120.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/121.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/123.gif',	
'http://i63.photobucket.com/albums/h153/zach14c/onion/122.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/002.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/003.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/004.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/005.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/006.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/007.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/008.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/009.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/010.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/011.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/014.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/015.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/016.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/017.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/018.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/019.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/020.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/021.gif'
);

var imgTabs = new Array();
imgTabs['None'] = new Array();imgTabs['Monkey'] = monkeyImgs;imgTabs['Onion'] = onionImgs;imgTabs['Wanwan'] = wanwanImgs;imgTabs['Egg'] = eggImgs;
var imgTabsDisp = new Array();
imgTabsDisp['None'] = '>';imgTabsDisp['Monkey'] = '嘻猴';imgTabsDisp['Onion'] = '洋蔥';imgTabsDisp['Wanwan'] = '彎彎';imgTabsDisp['Egg'] = '滷蛋';

GM_addStyle('.ui-tabs .ui-tabs-hide { display: none;}');
GM_addStyle('.tabbed_area {	background-color:#333333; border:1px solid #AAAAAA; height: auto; }');
GM_addStyle('ul.tabs { margin-bottom:2px; padding:0px; font-size:12px; height:25px}');
GM_addStyle('ul.tabs li { list-style:none; }');
GM_addStyle('ul.tabs li a {	background-color:#333333; color:#fff; text-decoration:none; border:0px solid #000; }');
GM_addStyle('ul.tabs li a:hover { background-color:#fff; color:#000; }');
GM_addStyle('ul.tabs li a.active { background-color:#fff; color:#000; }');
GM_addStyle('.content { background-color:#333333; float:none; padding: 4px; height:100%;}');
GM_addStyle('.smileImg { border:1px solid #333333; padding: 1px 1px 1px 1px; background-color:#fff; }');
GM_addStyle('.smileImgLink { border:0px; }');

addText = function (text) {
    var textbox = document.evaluate('//textarea', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null).iterateNext();
    if (textbox.selectionStart || textbox.selectionStart == '0') {
        textbox.value = textbox.value.substring(0, textbox.selectionStart)+ text + textbox.value.substring(textbox.selectionEnd, textbox.value.length); 
    }
    else {
        textbox.value += text; 
    }
     textbox.focus();
}

$(document).ready(function() {
	$('textarea#message,#posteditor_textarea').each(function(index){
		var html = '<div id="imgTabs" class="tabbed_area"><ul id="ulTabs" class="tabs">';
		var divHtml = '';
		for(var imgTab in imgTabs){
			html += '<li><a id="aImgTab" alt="' + imgTab + '" href="#imgTab-' + imgTab + '">' + imgTabsDisp[imgTab] + '</a></li>';
			divHtml += '<div id="imgTab-' + imgTab + '" class="content">';
			divHtml += '</div>';
		}
		html += '</ul>' + divHtml;
		$(this)
			.after(html);	
		$('div#imgTabs').css('width',$(this).css('width'));
		$('div .content').css('width','95%');
		
	});

	$('a#aImgTab').bind('click', function(event) {
	  var imgTab = $(this).attr('alt');
	  var imgId = '#imgTab-' + imgTab;
	  if($(imgId).find('img').length == 0){
	  	  var divHtml = '';
	  	  for(var i=0; i< imgTabs[imgTab].length ;i++){
	  	  	  divHtml += '<a class="smileImgLink" href="javascript: void(0)">';
	  	  	  divHtml += '<img src="' + imgTabs[imgTab][i] + '" class="smileImg"/></a>';
	  	  }
	  	  $(imgId).append(divHtml);
	  	  
	  	  $('.smileImg').bind('click', function(){
	  	  	  addText("[img]" + $(this).attr("src") + "[/img]");
	  	  });	  	  
	  }
	});	
	
	$("#imgTabs").tabs();

});
