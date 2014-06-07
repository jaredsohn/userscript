// ==UserScript==
// @namespace     http://www.tweaksthelimbs.org/greasemonkey/
// @name          retrievr tweaks
// @description   Adds download link to the original image. Also changes the layout of the site to optimize for 1024x768 screen resolution. (Note: Partial update for version of retriever with sketch and image capability. Still fails in certain circumstances.)
// @include       http://labs.systemone.at/retrievr/*
// @version       0.5
// @FF_version    1.5
// @GM_version    0.6.4
// ==/UserScript==

var changeLayout = true; //set to false to use the standard layout

if(changeLayout){
	GM_addStyle('.thumbnail {margin-bottom: 25px} a#homeLink{text-decoration:none;background-color:#ececec} #content {padding-top:5px} #masterColumn {width:95%;} .content {width: 720px;} #header {visibility:hidden;} #headerBar {padding: 0px; height: 0px;} #logo {font-size:20px;position:relative;left:0px;top:0px;}');
	var logobar = document.getElementById('logoBar');
	if(logobar) logobar.parentNode.removeChild(logobar);
	var homeLink = document.getElementsByTagName('a')[3];
	if(homeLink){
		homeLink.innerHTML = '<span id="logo">retriev<span id="r">r</span></span>';
		homeLink.id = 'homeLink';
	}
}

function addLinks(link,thumbId){
	//GM_log('starting addlinks for: '+thumbId+' at '+link);
	GM_xmlhttpRequest({
		method: 'GET',
		url: link,
		onreadystatechange: function(responseDetails) {
			return;
		},
		onerror: function(responseDetails) {
			GM_log('error:'+link);
		},
		onload: function(responseDetails) {
			var details = responseDetails.responseText;
			var searchArea = details.slice(details.indexOf('global_photos'),details.indexOf('.zoomUrl'));
			var server = searchArea.match(/\.server \= \'(.+)\';/)[1];
			var secret = searchArea.match(/\.secret \= \'(.+)\';/)[1];
			var id = searchArea.match(/\.id \= \'(.+)\';/)[1];
			var static = 'http://static.flickr.com/'+server+'/'+id+'_'+secret+'_o_d.jpg';
			var thumbnail = document.getElementById(thumbId);
			var span = document.createElement('span');
		     span.innerHTML = '<br /><a href="'+static+'">Download</a>';
			thumbnail.appendChild(span);
		}
	});
}

//initialize counter
GM_setValue('counter',0);

//*** Modify Links ***
function checkContent(id){
	if(id == undefined) return;
	if(id == 'imageContent'){ //we're going to see 13 requests come through
		GM_log('id=imageContent');
		if(GM_getValue('counter')==0){
			GM_setValue('counter',1);
		}
		else{
			if(GM_getValue('counter')==12){
				GM_setValue('counter',0);
				return;
			}
			else{
				GM_setValue('counter',GM_getValue('counter')+1);
				return;
			}
		}
	}
	GM_log(id);
	var divs = document.getElementById(id).getElementsByTagName('div');
	var thumbnails = new Array();
	var count = 0;
	for(i=0;i<divs.length;i++){
		if(divs[i].getAttribute('class') == 'thumbnail'){
			divs[i].setAttribute('id',id+count);
			thumbnails.push(divs[i]);
			count++;
		}
	}
	for(i=0;i<thumbnails.length;i++){
		link = thumbnails[i].getElementsByTagName('a')[0].href;
		thumbId = thumbnails[i].getAttribute('id');
		addLinks(link,thumbId);
	}
}

function waitJustOneSecond(e){
	window.setTimeout(checkContent,1000,e.target.parentNode.getAttribute('id'));
}



var thenodes = document.getElementsByTagName('div');
for(i=0;i<thenodes.length;i++){
	if(thenodes[i].getAttribute('id')=='sketchContent'||thenodes[i].getAttribute('id')=='imageContent'){
		thenodes[i].addEventListener('DOMNodeRemoved',waitJustOneSecond,false);
	}
	
}

//http://labs.systemone.at/retrievr/?locator=flickr%3a23161237#locator=flickr%3A23161237
//http://labs.systemone.at/retrievr/?locator=upload%3aupload.file.2006-02-08-10-17-53-271134.Ymxha2UuanBn.jpg#locator=upload%3Aupload.file.2006-02-08-10-17-53-271134.Ymxha2UuanBn.jpg
var r1 = /in\?url\=/;
var r2 = /upload/;
var r3 = /flickr/;
var l = location.href;
if(r1.test(l)&&(r2.test(l)||r3.test(l))){
	window.setTimeout(q,3000);
}
GM_log(location.href);
function q(){
	var thenodes = document.getElementsByTagName('div');
	//GM_log('got this far: '+thenodes.length);
}