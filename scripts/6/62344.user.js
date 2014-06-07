// ==UserScript==
// @name           Zhepnik
// @namespace      Lepra
// @description    Zhepj this!
// @include        *leprosorium.ru/comments/*
// ==/UserScript==
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
this.GM_getValue=function (key,def) {
return localStorage[key] || def;
};
this.GM_setValue=function (key,value) {
return localStorage[key]=value;
};
this.GM_deleteValue=function (key) {
return delete localStorage[key];
};
}

(function() {

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


function noFunc(event,node,user,button,text) {
	alert(button);
	commentIt(event,node,user);
}

function refreshTagsMgla() {
	try {
	var tags = document.getElementById('tags_common').getElementsByTagName('A');
	var tagsDiv = document.getElementById('tags_common');
	if(tags) {
	for(var tid=0;tid<tags.length;tid++) {
		tags[tid].style.margin=0;
		var tagadd = '<strong onclick="addTag(\''+ tags[tid].innerHTML+'\'); return false;" style="cursor:pointer;">[+]&nbsp;&nbsp;&nbsp;</strong>';
		var spantmp = document.createElement("span");
		spantmp.innerHTML = tagadd;
		spantmp.style.margin=0;
		spantmp.style.padding=0;
		if((tid+1) < tags.length && tags[tid+1])
			tagsDiv.insertBefore(spantmp, tags[tid+1]);
		else tagsDiv.insertBefore(spantmp,null);
	}}}
	catch(err) {}}
function action(){
	refreshTagsMgla();
	
	var posts = document.evaluate("//div[contains(@class,'post')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	var tabsContent = '&nbsp; <a class="reply_link" onclick="zhepFunc(event, this, \'#username#\',#post#,\'Жепь\'); return false;" href="">Жепь какая!</a> &nbsp; | &nbsp; '+
		' &nbsp; <a class="reply_link" onclick="zhepFunc2(event, this, \'#username#\',#post#,\'Жепь\'); return false;" href="">Жепка!</a> &nbsp; | &nbsp; ';
	
	var formcomm = document.evaluate("//div[@class='bottom_right']", document.getElementById('comments-form'), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	var formcommdiv=formcomm.snapshotItem(0);
	var buttontabs=document.createElement("span");
	formcommdiv.parentNode.insertBefore(buttontabs, formcommdiv);
	
	for(var idx = 0; idx<posts.snapshotLength; idx++){
		
		var post=posts.snapshotItem(idx);
		var id=post.getAttribute("id");
		var comments = document.evaluate("div[@class='dd']/div[@class='p']/span/a[@class='reply_link']", post, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		if(comments.snapshotLength > 0) {
			comm = comments.snapshotItem(0);
			var re = /return commentIt\(event, this, '(.+)'\);/mi;    
			
			if(re.test(comm.parentNode.innerHTML))	{
				var n1 = RegExp.$1;
				tabs=document.createElement("span");
				comm.setAttribute('id',"main"+id);
				comm.parentNode.insertBefore(tabs, comm);
				tabs.innerHTML = tabsContent.replace(/#username#/gmi,n1).replace(/#post#/gmi,id);
			}
		}
	}
	
	
}


action();

	var script = document.createElement("script");
	script.type = "application/javascript";
	script.innerHTML = "String.prototype.stripHTML = function(){var matchTag = /<(?:.|\s)*?>/g;return this.replace(matchTag, '');};"+
	"String.prototype.stripZhepki = function(){var matchTag = /(\\[x\\])|,/g;return this.replace(matchTag, '');};"+
	"function refreshTagsMglaIn() {try{"+
	"var tags = document.getElementById('tags_common').getElementsByTagName('A');"+
	"var tagsDiv = document.getElementById('tags_common');"+
	"if(tags) for(var tid=0;tid<tags.length;tid++) {"+
	"	tags[tid].style.margin=0;"+
	"	var tagadd = '<strong onclick=\"addTag(\\''+ tags[tid].innerHTML+'\\'); return false;\" style=\"cursor:pointer;\">[+]&nbsp;&nbsp;&nbsp;</strong>';"+
	"	var spantmp = document.createElement(\"span\");"+
	"	spantmp.innerHTML = tagadd;"+
	"	spantmp.style.margin=0;"+
	"	spantmp.style.padding=0;"+
	"	if((tid+1) < tags.length && tags[tid+1])"+
	"		tagsDiv.insertBefore(spantmp, tags[tid+1]);"+
	"	else tagsDiv.insertBefore(spantmp,null);"+
	"}}catch(err){}}"+
	"function tagsOnLoad(ajaxObj){if(ajaxObj.responseText != 'err'){$('tags_add').innerHTML = ajaxObj.responseText;refreshTagsMglaIn(); }initInputWithDynamicValue('tags_input');}"+
	"function zhepFunc(event,node,user,button,text) {var txt = '';if (window.getSelection){txt = window.getSelection();}else if (document.getSelection){txt = document.getSelection();}else if (document.selection){txt = document.selection.createRange().text;} if(txt && txt!='') { txt = txt+''; var txt2 = txt.stripZhepki() + '[x]';addTag(txt.stripZhepki());commentIt(event,document.getElementById('main'+button),user);document.getElementById('comment_textarea').value = document.getElementById('comment_textarea').value + \"\\n\" + txt2; document.getElementById('js-post-yarrr').click();} else alert('А текст за вас Пушкин выделять будет?');}"+
	"function zhepFunc2(event,node,user,button,text) {var txt = '';if (window.getSelection){txt = window.getSelection();}else if (document.getSelection){txt = document.getSelection();}else if (document.selection){txt = document.selection.createRange().text;} if(txt && txt!='') { txt = txt+'';  addTag(txt.stripZhepki());} else alert('А текст за вас Пушкин выделять будет?');}"+
	"";
	
	document.body.appendChild(script);

})();