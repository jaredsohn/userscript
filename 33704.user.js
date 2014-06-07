// ==UserScript==
// @name           whirlpool whim preview
// @namespace      userscripts.org
// @description    whirlpool whim preview
// @version      0.1
// @include        http://forums.whirlpool.net.au/whim/?action=write
// @include        http://forums.whirlpool.net.au/whim/?action=write*
// @include        http://forums.whirlpool.net.au/forum-user.cfm?id=*
// ==/UserScript==

$ = unsafeWindow.jQuery;

var dU =  document.URL;
var b = $('#body');


function prev(pr){
/***preview code by Simon Wright - http://forums.whirlpool.net.au/forum-user.cfm?id=10***/

	var previewTimer;
	var previewWait = false;

		if (!previewWait) {

			previewWait = true;
			previewTimer = setTimeout(function(){
			
										$(pr).html(unsafeWindow.whirlcode2(b.val(), 'pflwae'));
										
										previewWait = false;
										
									}, 600);
		}

}
		


if(dU.indexOf('whirlpool.net.au/whim/?action=write')>-1){

	var underDiv = document.evaluate('/html/body/div/div[3]/table/tbody/tr/td/div[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	
	underDiv.setAttribute('style', 'background:#EEEEEE url(/img/forum/reply-eeeeee.gif) repeat-x scroll center bottom;'+
	'border-bottom:1px solid #BBBBBB;'+
	'border-top:2px solid #F2F2F2;'+
	'padding:8px 12px 10px;'+
	'vertical-align:middle;');
	
	b.bind("focus keyup", function() {
	
		prev(underDiv);

	});
}
else{

	var containerTable = document.evaluate('/html/body/div/div[3]/div/div[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var prevContainer = document.createElement('div');
	prevContainer.id='prevContainer';
	prevContainer.setAttribute('style', 'background:#EEEEEE url(/img/forum/reply-eeeeee.gif) repeat-x scroll center bottom;'+
	'border-bottom:1px solid #BBBBBB;'+
	'border-top:2px solid #F2F2F2;'+
	'padding:8px 12px 10px;'+
	'float: left; width: 100%;'+
	'vertical-align:middle;');	
	containerTable.appendChild(prevContainer);
	
	b.bind("focus keyup", function() {
	
		prev(prevContainer);

	});
}