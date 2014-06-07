// ==UserScript==
// @name           Ultimate Div Popup
// @description    This is for use in a script use with @require.
// @exclude        *
// ==/UserScript==
function createDivPopup(content,css,bgImage,imp){
	if(!content){content='';}
	if(!css){css='';}
	if(!bgImage){bgImage='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kJCwEbAIsAo5oAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAADUlEQVQI12NgYGCoBwAAhACAxkwJbwAAAABJRU5ErkJggg==';}
	if(!imp){imp=''}
	var pageHeight=window.innerHeight;
	var pageWidth=window.innerWidth;
	var div=document.createElement('div');
	div.id='GM_divPopup';
	div.setAttribute('style','z-index:9001/* its over nine thousand*/'+imp+';width:100%'+imp+';height:100%'+imp+';position:fixed'+imp+';top:0px'+imp+';left:0px'+imp+';background-repeat:repeat'+imp+';background-image:url('+bgImage+')'+imp+'');
	div.innerHTML='<style type="text/css">'+css+'</style>'+
		'<a id="GM_closeDivPopup" style="border: 5px solid white'+imp+'; padding: 5px'+imp+';-moz-border-radius: 10px'+imp+';text-decoration: none'+imp+'; color: white'+imp+'; position: absolute'+imp+'; top: 5px'+imp+'; right: 5px'+imp+';z-index:9002'+imp+';background-color:black'+imp+';" onclick="this.parentNode.parentNode.removeChild(this.parentNode);return false">Close</a>'+
		'<div style="margin-left:58px'+imp+';margin-top:41px'+imp+';height:'+(pageHeight-82)+'px'+imp+';width:'+(pageWidth-116)+'px'+imp+';">'+
			'<div>'+
				'<table id="GM_divPopupContentHolder" style="margin-left:auto'+imp+';margin-right:auto'+imp+';"><tr><td>'+content+'</td></tr></table>'+
			'</div>'+
		'</div>';
	document.body.appendChild(div);
	var contentHolder=document.getElementById('GM_divPopupContentHolder');
	var topMargin=pageHeight/2-contentHolder.offsetHeight/2;
	if (topMargin<0){topMargin=0;}
	contentHolder.parentNode.setAttribute('style','max-height:'+(pageHeight-82)+'px'+imp+';max-width:'+(pageWidth-116)+'px'+imp+';width:'+(contentHolder.offsetWidth+20)+'px'+imp+';height:'+(contentHolder.offsetHeight+20)+'px'+imp+';margin-top:'+topMargin+'px'+imp+';margin-left:auto'+imp+';margin-right:auto'+imp+';overflow:auto'+imp+';');
}