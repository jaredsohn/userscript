// ==UserScript==
// @name          Simple Gaia Redirect
// @namespace     http://www.gaiaonline.com/p/`Mods
// @description   Makes Gaia's new redirection less eye bleeding.
// @include       http://www.gaiaonline.com/gaia/redirect.php?r=*
// ==/UserScript==

function removecssfile(filename, filetype){
 var targetelement=(filetype=="css")? "link" : "none"
 var targetattr=(filetype=="css")? "href" : "none"
 var allsuspects=document.getElementsByTagName(targetelement)
 for (var i=allsuspects.length; i>=0; i--){
  if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
   allsuspects[i].parentNode.removeChild(allsuspects[i])
 }
}
removecssfile("redirect.css", "css")


var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.setAttribute('type','text/css');
	
	style.innerHTML = "html{background: url(data:image/gif,GIF89a%0C%00%10%00%80%00%00%7D%7D%7Dfff!%F9%04%00%00%00%00%00%2C%00%00%00%00%0C%00%10%00%00%02%17D~%86%CB%9D%A8%9C%8CT%DAjY%7Cy%BA%7DAb%A7%7DdP%00%00%3B) repeat}\
a {\
  color:#448fc1;\
  font-weight:light;\
  font-family:verdana;\
text-decoration: none;\
\
}\
\
a:hover {\
  color:#ff8243;\
  font-weight:light;\
  font-family:verdana;\
text-decoration: underline;\
}\
\
#warn_head{\
  color:#666666;\
  font-weight:bold;\
  font-family:verdana;\
text-decoration: strike;\
}\
\
#warn_block {\
        font-family:verdana;\
	width: 50%;\
	height: auto;\
	text-align: center;\
	background: #f8f8f8;\
	border: 1px solid #c8cdd3;\
	margin-top: 20%;\
}\
table.warn_block {\
	width: 100%;\
\
\
#link_display {\
	display: block;\
	height: 200px;\
	color: #99CCFF;\
	font-family:verdana;\
	font-size: 1.125em;\
	text-align: center;\
	vertical-align: middle;\
	overflow: hidden;\
}\
\
\
}\
\
#warn_body\
{\
	font-size: 0px;\
        font-family:verdana;\
	line-height: 0px;\
text-indent; -10000px;\
}\
\
#warn_no_logout {\
	font-size: 0px;\
	line-height: 0px;\
text-indent; -10000px;\
}\
\
#notice_acct_prefs{\
	font-size: 0px;\
	line-height: 0px;\
text-indent; -10000px;\
}\
\
#warn_no_logout {\
	font-size: 0px;\
	line-height: 0px;\
text-indent; -10000px;\
}\
\
a.notice_acct_prefs {\
	font-size: 0px;\
	line-height: 0px;\
text-indent; -10000px;\
}\
";
	head.appendChild(style);