// ==UserScript==
// @name           The West_-_Telegrame BBcodes
// @description    BBcodes dans les telegrame
// @namespace      http://ryuuku.olympe-network.com/
// @include        http://*.the-west.*
// @exclude        http://ryuuku.olympe-network.com/
// @exclude        http://*.the-west.fr/forum.php*
// @version        1.27
// @author         Hack.Crows
// @copyright      Hack.Crows/ryuuku
// ==/UserScript==

// Modified by Hack.Crows

String.prototype.parseQueryString=function(){
		var vars = this.split(/[&;]/), res = [];
    for(var z in vars){
    var val=vars[z];
    var v=val.split(/=/);
    res[v[0]]=v[1];
			}
		return res;
};
var $=unsafeWindow.$;
var loc=location.pathname;
function BBCode(textarea){
this.textarea=textarea;
}
BBCode.prototype.getText=function(){this.textarea.focus();if(typeof document.selection!='undefined'){var range=document.selection.createRange();return range.text;}else if(typeof this.textarea.selectionStart!='undefined'){var start=this.textarea.selectionStart;var end=this.textarea.selectionEnd;return this.textarea.value.substring(start,end);}
return null;};
BBCode.prototype.insertText=function(startTag,text,endTag){this.textarea.focus();if(typeof document.selection!='undefined'){var range=document.selection.createRange();range.text=startTag+text+endTag;range=document.selection.createRange();if(insText.length==0){range.move('character',-endTag.length);}else{range.moveStart('character',startTag.length+text.length+endTag.length);}
range.select();}else if(typeof this.textarea.selectionStart!='undefined'){var start=this.textarea.selectionStart;var end=this.textarea.selectionEnd;this.textarea.value=this.textarea.value.substr(0,start)+startTag+text+endTag+this.textarea.value.substr(end);var pos;if(text.length==0){pos=start+startTag.length;}else{pos=start+startTag.length+text.length+endTag.length;}
this.textarea.selectionStart=pos;this.textarea.selectionEnd=pos;}};
BBCode.prototype.addCodeTag=function(tagName){this.insertText('['+tagName+']',this.getText(),'[/'+tagName+']');};
BBCode.prototype.addExtendedCodeTag=function(description,tagName){var input=prompt(description);var text=this.getText();text=(text.length==0?prompt(('ProsĂ­m zadej popisky pro \"%1\" BB-Code.',tagName)):text);this.insertText('['+tagName+'='+input+']',text,'[/'+tagName+']');};
BBCode.prototype.addCallbackCodeTag=function(tagName,callbackFunction){var text=callbackFunction();this.insertText('['+tagName+'='+text+']',this.getText(),'[/'+tagName+']');};

var supportedbbcodes=['b', 'i', 'u', 'del', 'player', 'town', 'fort', 'url', 'quote', 'img',];
var bbcodesstyle={'b':'0px 50%', 'i':'-20px 50%', 'u':'-40px 50%', 'del': '-60px 50%', 'player':'-80px 50%', 'town':'-100px 50%', 'fort':'-120px 50%', 'url':'-160px 50%', 'quote':'-140px 50%', 'img':'-180px 50%',};
var bbcclass='profile_bb_code_image';

bbcbar=function(bbs, BBCobject){
var div=document.createElement('div');
div.style.display='inline';
var that=BBCobject;
for(var i in bbs){
var img=document.createElement('img');
img.src='images/transparent.png';
img.alt=bbs[i];
img.style.backgroundPosition=bbcodesstyle[bbs[i]];
img.className=bbcclass;
if(bbs[i]!='url')
img.addEventListener('click',function(){
that.addCodeTag(this.alt);
}, false);
else
img.addEventListener('click',function(){
that.addExtendedCodeTag('Entrez l\'adresse de la page:', this.alt);
}, false);
div.appendChild(img);
}

return div;
};

if(loc=="/game.php"){
function addBBToMessageWindow(div2){
    if (!document.getElementById('window_messages')) return;
		var div = document.getElementById('window_messages_content').wrappedJSObject;
		var table=div.getElementById('write_table');
		var tr2=table.childNodes[1].childNodes[4];
		var tr=document.createElement('tr');
		var td=document.createElement('td');
		td.colspan='2';
		var BB=new BBCode(tr2.getElementById('text'));
		var bbbar=bbcbar(supportedbbcodes, BB);
		td.appendChild(bbbar);
		tr.appendChild(td);
		
		table.childNodes[1].insertBefore(tr, tr2);
}

function addBBToMessageReplyWindow(){
    if (!document.getElementById('window_messages')) return;
		var div = document.getElementById('window_messages_content').wrappedJSObject;
		var table=div.getElementById('tab_messages').getElementById('read_table');
		var app=table.getElementById('answer_field_row');
		var bef=table.getElementById('message_id');
		var BB=new BBCode(bef.nextSibling.nextSibling);
		var bbbar=bbcbar(supportedbbcodes, BB);		
		app.insertBefore(bbbar, bef);
}

	var o_show = unsafeWindow.AjaxWindow.setJSHTML;
	var f = function(div, content) {
		if (!div) return;
		var ret = o_show(div, content);
		addBBToMessageWindow(div);
		return(ret);
	};
	for(var o in o_show) {
		f[o] = o_show[o];
	}
unsafeWindow.AjaxWindow.setJSHTML = f;

	var o_show2 = unsafeWindow.Messages.show_message;
	var f2 = function(id, page) {
		var ret = o_show2(id, page);
		window.setTimeout(addBBToMessageReplyWindow, 1000);
		return(ret);
	};
	for(var o in o_show) {
		f2[o] = o_show2[o];
	}
unsafeWindow.Messages.show_message = f2;


}
else if(loc=="/forum.php"){
(function(){
var l=location.search.parseQueryString();
unsafeWindow.l=l;
if(l.mode!='new_thread' && l.answer!='1')
return;
GM_addStyle('.profile_bb_code_image {background-image:url(../images/bbcodes.png);height:20px;margin:6px 1px;width:20px;}');
var tx=document.getElementsByName('message')[0].wrappedJSObject;
var BB=new BBCode(tx);
var bef=tx.parentNode.parentNode;
var tr=document.createElement('tr');
var td=document.createElement('td');
var td2=document.createElement('td');
td.appendChild(bbcbar(supportedbbcodes, BB));
tr.appendChild(td2);
tr.appendChild(td);
bef.parentNode.insertBefore(tr, bef);
})();
}

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_84', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_84', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=84&version=1.0';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();