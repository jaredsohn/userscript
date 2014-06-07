// ==UserScript==
// @name           emoTumblr
// @namespace      http://userscripts.org/scripts/show/24984
// @include        http://*tumblr.com/new/*
// @include        http://*tumblr.com/reblog/*
// @version		   1.1
// ==/UserScript==

//http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/
//http://sg.yimg.com/i/vn/blog//i/icon/16/

var $ = function(id) {
	return document.getElementById(id);
}

var insertEmo = function(what) {
	var i = parseInt(what.id.replace('_sm_',''));
	
	var src = emoPath+emoList[i]+emoExt;
	postFrame.document.execCommand("InsertImage",false,src);
}


var showHideEmo = function() {
	$('emoIcons').style.display = ($('emoIcons').style.display == 'none')?'block':'none';
}

var insertEmoField = function(html) {
	var div = document.createElement('div');
	div.id = 'emoField';
	
	div.style.backgroundColor = '#EEEEEE';
	div.style.borderBottom = '1px solid #DDDDDD';
	div.style.color = '#777777';
	div.style.fontSize = '14px';
	div.style.padding = '5px';
	
	div.innerHTML = '<a id="emoText" style="cursor:pointer;font-weight:bold;display:block">Yahoo! Emoticons</a><div id="emoIcons" style="display:none">'+html+'</div>';
	
	
	
	insertAfter($(postFormID).parentNode, div, $(postFormID));
	
	$('emoText').addEventListener('click', function() { showHideEmo()}, false);
}

var findPostFrame = function() {
	var ifr = $(postFrameID);
	if (!ifr) {
		setTimeout(findPostFrame,500);
	}
	else {
		return ifr.contentWindow;
	}
}

var insertAfter = function(parent, newNode, refNode) {
	if(refNode.nextSibling) {
		return parent.insertBefore(newNode, refNode.nextSibling);
	}
	else {
		return parent.appendChild(newNode);
	}
}


if (!$('left_column') || $('edit_post').action.indexOf('/chat') != -1) {
	return false;
}

var postFormID = ($('post_three_parent'))?'post_three_parent':'post_two_parent';
var postFrameID = ($('post_three_ifr'))?'post_three_ifr':'post_two_ifr';


var postFrame = findPostFrame();

var emoExt = '.gif';
var emoPath = 'http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/';
var emoColumns = 14;

var emoList = new Array();



for (var i=1; i<=79; i++) {
	emoList.push(i);
}

for (var i=100; i<=115; i++) {
	emoList.push(i);
}


var html="<table border='0' cellspacing='0' cellpadding='0'>";
for(i=0;i<emoList.length;i++) {
	var eid="_sm_"+i;
	if((i % emoColumns) == 0) {
		html+="<tr>";
	}
	
	html+=	"<td valign='center' align='center'>"
		+	"<a href='javascript:void(0)' id='"+eid+"' style='display:block;padding:3px' onmouseover='this.style.backgroundColor=\"#B2EC13\"' onmouseout='this.style.backgroundColor=\"\"'>"
		+	"<img src='"+ emoPath + emoList[i] + emoExt +"' />"
		+	"</a></td>";
	
	
	if(((i+1) % emoColumns) == 0){
		html+="</tr>";
	}
}
html+="</table>";

insertEmoField(html);

for(i=0;i<emoList.length;i++) {
	var eid="_sm_"+i;
	$(eid).addEventListener('click', function() { insertEmo(this); }, false);
}