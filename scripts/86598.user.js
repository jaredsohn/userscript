// ==UserScript==
// @name           Quick Reply
// @namespace      fyodor
// @description    Quick Reply
// @include        http://muare.vn/*
// ==/UserScript==


function getTagsByClass(parent, tag_name, class_name) {
	var tags = parent.getElementsByTagName(tag_name);
	if(class_name == '')
		return tags;
	var out = new Array();
	var i;
	for(i=0;i<tags.length;i++){
		if(tags[i].className==class_name)
			out.push(tags[i]);
	}
	return out;
}

var toggleqr = function() {
	var quickreply = GM_getValue('quick reply', false);
	quickreply = !quickreply;
	GM_setValue('quick reply', quickreply);
	window.location.reload();
}

var quickreply = GM_getValue('quick reply', false);
GM_setValue('quick reply', quickreply);

GM_registerMenuCommand("Toggle Quick Reply", toggleqr, "r", "alt", "r");

var postHeaders = getTagsByClass(document, 'div', 'postSubn ').concat(getTagsByClass(document, 'div', 'postSubn postSP'));
var x;
for(x=0;x<postHeaders.length;x++)
{
	var auth = getTagsByClass(postHeaders[x], 'div', 'postAuthorAn')[0];
	var re = new RegExp('<strong>(.*?)<\/strong>');
	var m = re.exec(auth.innerHTML);
	var name = m[1];
	
	if(GM_getValue('quick reply', false))
		getTagsByClass(postHeaders[x], 'div', 'rf small normal')[0].innerHTML += '<span class="sbadges sbc6" onclick="insertAtCaret(document.getElementById(\'mainTextarea\'), \'@' + name + ': \');">@</span>';
	else
		getTagsByClass(postHeaders[x], 'div', 'rf small normal')[0].innerHTML += '<span class="sbadges sbc6" onclick="insertAtCaret(document.getElementById(\'mainTextarea\'), \'@' + name + ': \');"><a href="' + window.location.toString().replace(/#.*/, '') + '#post_reply">@</a></span>';
}

var submitform = document.getElementsByTagName('form')[1];
if(quickreply && submitform != null) {
	var tmp = submitform.getElementsByTagName('div');
	submitform.removeChild(tmp[1]);
	submitform.removeChild(tmp[0]);
	
	GM_addStyle("div.quickreply { opacity: 0 !important; } div.quickreply:hover { opacity: 1 !important; }");

	var div = document.createElement('div');
	div.className = 'quickreply'
	div.setAttribute('style', 'position: fixed; float: left; left: 1%; bottom: 0; height: 155px; width: 98%; padding: 0px; margin: 0px; background: #ffffff');
	div.innerHTML = '<form action="func-submit_forum.php" method="post" name="submit_forum" onsubmit="return ValidateForm();">' + submitform.innerHTML + '</form>';
	document.getElementsByTagName('body')[0].appendChild(div);

	submitform.innerHTML = "<br><br>";
	document.getElementById('mainTextarea').className = "";
}