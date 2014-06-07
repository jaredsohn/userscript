// ==UserScript==
// @name           Quick reply failz!1
// @namespace      Quick reply failz!1
// @description    test
// @include        http://*bungie.net/Forums/posts.aspx?postID=*
// @include        http://*bungie.net/fanclub/*/Forums/posts.aspx?postID=*
// ==/UserScript==
//Written by ApocalypeX and some by wubby
//Version -0.1

function toggle_yo(e) {
var el=e.target;
if (!el) {
return;
}
   if (!el.id) {
    return;
     }
   if ('toggle' == el.id) {
   var togglebtn = document.getElementById('toggle');
   var QPanel = document.getElementById('replyPanel');
	if (QPanel.style.display == 'none') {
		QPanel.style.display = 'block';
                togglebtn.innerHTML = '-';
                
	       } 
		else {
		QPanel.style.display = 'none';
                togglebtn.innerHTML = '+';
	          }
          }
}

window.addEventListener('click', toggle_yo, true);

function addGlobalScript(code) {
    var head, funct;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    funct = document.createElement('script');
    funct.innerHTML = code;
    head.appendChild(funct);
}

	addGlobalScript(
	'function submit_reply()'+
	'{'+
	"WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions('ctl00$mainContent$postForm$skin$submitButton', '', true, 'forum', '', false, true))"+
	'}');


var submit1 = document.createElement('script'); 
submit1.src = '/javascript/forums.js';
submit1.type = 'text/javascript'; 
document.getElementsByTagName('head')[0].appendChild(submit1); 

var postId;
var Qreply, newElement;
Qreply = document.getElementById('ctl00_idealScienceLogoPanel');
if (Qreply) {
    newElement = document.createElement('div');
    newElement.style.textAlign='center';
    newElement.innerHTML='<p style="margin: 5px 0px; font-size: 20px; font-weight: bold;">Quick Reply <a id="toggle" style="font-size: 27px; font-weight: bold; text-decoration: none;" href="#QPanel">-</a></p></div><hr><div id="replyPanel" style="display: block;"><form id="aspnetForm" name="aspnetForm" method="post" action="/Forums/createpost.aspx?postID='+postID+'&act=reply" onsubmit="javascript:return WebForm_OnSubmit();"><textarea name="ctl00$mainContent$postForm$skin$body" rows="11" cols="63" id="ctl00_mainContent_postForm_skin_body" class="textAreaInput">' +
'</textarea><br />' +
'<div style="text-align: left; margin-left: 12px;"><p><strong>Text Formatting Legend:</strong></p>' +
'<div><span style="font-style:italic;">Italic Text</span> - [i] text [/i]<br />' +
'<strong>Bold Text</strong> - [b] text [/b]<br />' +
'<span style="text-decoration: underline;">Underlined Text</span> - [u] text [/u]<br />' +
'Blockquote: [quote] text to quote [/quote]<br /></div>' +
'<div class="create-post-actions">' +
'<ul class="right_actions"><li><a onclick="javascript: return disableSubmit();" id="ctl00_mainContent_postForm_skin_submitButton" class="forum_post_submit_button" href="javascript: submit_reply();">Submit</a></li>' +
'</ul></div></div></form></div><br><hr><br><br>';
    Qreply.parentNode.insertBefore(newElement, Qreply);
}


//Hai look mai script does nuffin K!