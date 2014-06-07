// ==UserScript==
// @name           Bebo Enhancements (BETA)
// @namespace      http://userscripts.org/users/72510
// @description    Adds extra features to bebo
// @include        http://*.bebo.*/*
// @exclude        http://*.bebo.*/ModuleSort.jsp*
// @creator        Ryan Boylett <remotecontrolbiscuit@hotmail.co.uk>
// @identifier     http://userscripts.org/scripts/source/37050.user.js
// @version        2.4.1
// @date           2008-11-16
// ==/UserScript==

function getParam(name) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

function strstr(needle,haystack) {
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
	// +   modified by: Ryan Boylett
    var pos = 0;
    haystack += '';
    pos = haystack.indexOf(needle);
    if(pos==-1){
        return false;
    } else{
        return true;
    }
}

var innerDocument = document.body.innerHTML;

innerDocument = innerDocument.replace(/\n/gi,' ');

//		/<(\S+).*>(.*?)<\/\1>/ matches '<div id="me">text</div>' in "text<div id=\"me\">text</div>text".
//		/<div>(.*?)<\/div>/ matches '<div>anything here</div>', and in a replace statement can be replaced with '<div>$1</div>'
//		/Win(?=98)/ matches 'Win' only if 'Win' is followed by '98'.
//		/\(s\)/ matches '(s)' while /(\s)/ matches any whitespace and captures the match.

//Creating variables
var currentPage = 'null';
if(strstr('<a href="/ProfileEdit.jsp">Edit Profile</a>',innerDocument)) { currentPage = 'MyProfile'; } else
if(strstr('/Profile.jsp',window.location) && !strstr('<a href="/ProfileEdit.jsp">Edit Profile</a>',innerDocument)) { currentPage = 'OtherProfile'; } else
if(window.location=='http://www.bebo.com/') { currentPage = 'BeboHome'; } else
if(strstr('http://www.bebo.com/c/home/',window.location)) { currentPage = 'BeboPanel'; }

//Stylesheet addition
innerDocument += '<style>';
if(currentPage=='MyProfile' || currentPage=='OtherProfile') {
	//My Profile or Other Profile
	if(getParam('MemberId')!='') { memberId = getParam('MemberId'); } else { memberId = ''; }
	innerDocument = innerDocument.replace(/<div style="padding-top: 0px;">AIM Enabled/gi,'<div style="padding-top: 0px; display: none;">AIM Enabled');
	innerDocument += '#profileActionMSN { display: none !important; } ';
	innerDocument += '#profileActionSkype { display: none !important; } ';
	innerDocument += '.thumb a img { filter: alpha(opacity=90); -moz-opacity: .90; opacity: .90; } ';
	innerDocument += '.thumb a img:hover { filter: alpha(opacity=100); -moz-opacity: 1; opacity: 1; } ';
	innerDocument = innerDocument.replace(/Post a Comment<\/a><\/li>/gi,'Post a Comment</a></li><li><a href="http://www.bebo.com/bored">Don\'t Click Here!</a></li>');
	//innerDocument = innerDocument.replace(/&lt;3/gi,'<img src="http://s.bebo.com/img/luv.gif" alt="luv" height="16" width="16">');
	innerDocument = innerDocument.replace(/<div class="s_b">The Other Half Of Me<\/div><table>/gi,'<table style="display:none;" id="otherHalfInputEveryting">');
	innerDocument = innerDocument.replace(/<div id="Comment" class="mod">/gi,'<div id="extraMod1" class="mod"></div><div id="Comment" class="mod">');
	innerDocument = innerDocument.replace(/Say something<\/a>/gi,'<br>Say something</a>');
	innerDocument = innerDocument.replace(/<div class="bd shown" id="content_WhiteBoard">(.*?)<ul class="comment-list">/ig,"<div class=\"bd shown\" id=\"content_WhiteBoard\">$1<ul class=\"comment-list\" id=\"whiteBoardCommentList\">");
	
}
if(currentPage=='MyProfile' && currentPage!='OtherProfile') {
	//My Profile
}
if(currentPage!='MyProfile' && currentPage=='OtherProfile') {
	//Other Profile
	innerDocument += '#extraOtherHalfLinks { display: none !important; } ';
}
if(currentPage=='BeboHome') {
	//Bebo Homepage
	window.location = 'http://www.bebo.com/c/home/';
	//innerDocument = innerDocument.replace(/<div id="content" class="content-wrap">/gi,'<div id="content" style="display:none;">');
}
if(currentPage=='BeboPanel') {
	//Bebo Homepage
	innerDocument += '#sponsors { display: none !important; } ';
	innerDocument += '#leftcol { width: 800px !important; } ';
}
innerDocument += '#add-autoplay-form { display: none !important; }';
innerDocument += '#channelNav li { width: 75px !important; height: 60px !important; margin: 2px !important; padding: 0 !important; cursor: pointer; border: 1px solid #000; }';
innerDocument += '#channelNav .thumb { width: 75px !important; height: 60px !important; margin: 0 !important; padding: 0 !important; }';
innerDocument += '#channelNav .next { width: auto !important; height: auto !important; border: 0 !important; }';
innerDocument += '.play-video { display: none !important; }';
innerDocument += '.video-grid .thumb-label { display: none !important; }';
innerDocument += '.advertisement { display: none !important; }';
innerDocument += '.sponsoredarea { display: none !important; }';
innerDocument += '#specialOtherHalfTable { font-size: 16px !important; }';
innerDocument += '#specialOtherHalfTable a { font-weight: bold !important; }';
innerDocument += '#specialOtherHalfTable a img { width: 80px !important; }';
innerDocument += '#specialOtherHalfTable a img { height: 80px !important; }';
innerDocument += '</style>';

innerDocument = innerDocument.replace(/s.bebo.com\/img\/onlinenow_pink_66x12/gi,'img527.imageshack.us/img527/9756/greenonlinepo4');
innerDocument = innerDocument.replace(/<div class="profilePagetitle"/gi,'<div id="profileTitle" class="profilePagetitle"');

document.body.innerHTML = innerDocument;

if(currentPage=='MyProfile' || currentPage=='OtherProfile') {
	if(document.getElementById('otherHalfInputEveryting').innerHTML) {
		var modInnards = '<div class="mod-content">\n';
		modInnards += '<div class="hd">\n';
		modInnards += '<h3 onclick="BeboModule.hideshow(\'extraMod1\', \''+memberId+'\');">\n';
		modInnards += '<span id="arrow_down_extraMod1" class="arrow arrow-down">\n';
		modInnards += '<span class="hide">close</span>\n';
		modInnards += '</span>\n';
		modInnards += ' My Other Half\n';
		modInnards += '</h3>\n';
		modInnards += '</div>\n';
		modInnards += '<div class="bd shown" id="content_extraMod1">\n';
		modInnards += '<ul class="sub-menu" id="extraOtherHalfLinks">\n';
		modInnards += '<li><a href="http://www.bebo.com/OtherHalfEdit.jsp">Edit</a></li>\n';
		modInnards += '</ul>\n';
		modInnards += '<table id="specialOtherHalfTable">\n';
		modInnards += ''+document.getElementById('otherHalfInputEveryting').innerHTML.replace(/<a href="OtherHalfEdit.jsp">Edit<\/a><br>/gi,'')+'\n';
		modInnards += '</table>\n';
		modInnards += '</div>\n';
		modInnards += '<div class="ft"></div>\n';
		modInnards += '</div>\n';
		document.getElementById('extraMod1').innerHTML = modInnards;
	}
}

var thisColour = document.getElementById('profileTitle').style.color;
var profTitle = document.getElementById('profileTitle').innerHTML.replace(/<span>/gi,'').replace(/<\/span>/gi,'');
var newInnerHTML = '<object data="http://wwwimages.adobe.com/www.adobe.com/ubi/template/identity/lib/sifr3-r419/flash/myriad-semi-bold.latin.swf" name="sIFR_replacement_0" id="sIFR_replacement_0" type="application/x-shockwave-flash" class="sIFR-flash" height="37" width="550"><param value="id=sIFR_replacement_0&amp;content='+profTitle.replace(/ /g,'%20').replace(/&lt;/g,'[').replace(/&gt;/g,']')+'&amp;width=550&amp;height=25&amp;renderheight=25&amp;link=&amp;target=&amp;size=20&amp;css=.sIFR-root%257Bfont-weight%253Anormal%253Bcolor%253A%2523'+thisColour+'%253B%257D&amp;cursor=default&amp;tunewidth=0&amp;tuneheight=0&amp;offsetleft=&amp;offsettop=&amp;fitexactly=false&amp;preventwrap=false&amp;forcesingleline=false&amp;antialiastype=&amp;thickness=&amp;sharpness=&amp;kerning=&amp;gridfittype=pixel&amp;flashfilters=&amp;opacity=100&amp;blendmode=&amp;selectable=true&amp;fixhover=true&amp;events=false&amp;delayrun=false&amp;version=419" name="flashvars"><param value="transparent" name="wmode"><param value="transparent" name="bgcolor"><param value="always" name="allowScriptAccess"><param value="best" name="quality"></object>';

var newWhtInn = document.getElementById('whiteBoardCommentList').innerHTML;
newWhtInn = newWhtInn.replace(/<span class="subject"><a href="(.*?)">(.*?)<\/a><\/span>(.*?)<span class="thumb"><a href="(.*?)"><img src="(.*?)" alt="(.*?)" height="67" width="100"><\/a><\/span>(.*?)<span class="user-name"><a href="(.*?)">(.*?)<\/a><\/span>(.*?)<span class="replies"><a href="(.*?)">(.*?)<\/a><\/span>/gi,'<span id="comment-list-2-whiteboard"><table><tr><td width="107" align="left"><a href="$4"><img src="$5" alt="$6" style="border:1px solid #000;" height="67" width="100"></a></td><td><a href="$1">$2</a><br>$7<br><a href="$8">$9</a><br><a href="$11">$12</a></td></tr></table></span>');
document.getElementById('whiteBoardCommentList').innerHTML = newWhtInn;

document.getElementById('profileTitle').innerHTML = newInnerHTML;