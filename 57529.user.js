// ==UserScript==
// @name           Easy Smilies
// @namespace      http://userscripts.org/users/52197
// @author         darkip
// @version        1.67
// @description    Adds an array of clickable smilies to add to your posts
// @include        http*://*what.cd/forums.php*action=viewthread*
// @include        http*://*what.cd/forums.php?action=new*
// @include        http*://*what.cd/inbox.php?action=*
// @include        http*://*what.cd/torrents.php?*id=*
// @include        http*://*what.cd/user.php?action=edit*
// ==/UserScript==

function embedFunction(s) {
	tag = document.createElement('script');
	tag.innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
	document.body.appendChild(tag);
}

function append(toappend, textareaid) {
	if(textareaid == null) {
		textarea = document.getElementById('quickpost');
	
		if(textarea == null) {
			textarea = document.getElementsByTagName('textarea')[0];
		}
	} else {
		textarea = document.getElementById('editbox' + textareaid);
	}
	
	if(textarea.value[textarea.selectionStart - 1] != ' ' && textarea.selectionStart != 0) {
		toappend = ' ' + toappend;
	}
	
	if(textarea.value[textarea.selectionStart] != ' ') {
		toappend += ' ';
	}
	
	oldposition = textarea.selectionStart;
	
	textarea.value = textarea.value.substr(0, textarea.selectionStart) + toappend + textarea.value.substr(textarea.selectionStart);
	textarea.selectionStart = oldposition + toappend.length;
	textarea.selectionEnd = oldposition + toappend.length;
	textarea.focus();
}

function toggleemoticons(page, textareaid) {
	if(textareaid == null) {
		if(page == 'compose') {
			textarea = document.getElementById('body');
		} else {
			textarea = document.getElementById('quickpost');
			
			if(textarea == null) {
				textarea = document.getElementsByTagName('textarea')[0];
			}
		}
		
		textareaid = '';
	} else {
		textarea = document.getElementById('editbox' + textareaid);
	}
	
	if(eval('typeof(emoticons' + textareaid + ') != \'undefined\'')) {
		if(eval('emoticons' + textareaid)) {
			eval('emoticons' + textareaid + ' = false;');
			
			if(textareaid == '' && page != 'horizontal') {
				switch(page) {
					case 'viewconv':
						textarea.rows = 10;
						textarea.cols = 90;
						break;
					case 'compose':
						textarea.rows = 10;
						textarea.cols = 95;
						break;
					default:
						textarea.rows = 8;
						textarea.cols = 90;
						textarea.style.width = '95%';
				}
			}
			
			document.getElementById('emoticons' + textareaid).style.display = 'none';
		} else {
			eval('emoticons' + textareaid + ' = true;');
			
			if(textareaid == '' && page != 'horizontal') {
				textarea.cols = 70;
				textarea.style.width = '';
				
				if(page != 'compose') {
					textarea.style.width = '';
				}
				
				textarea.rows = 22;
			}
			
			document.getElementById('emoticons' + textareaid).style.display = '';
		}
	} else {
		document.body.appendChild(document.createElement('script')).innerHTML = 'var emoticons' + textareaid + ' = true;';
		
		if(textareaid == '' && page != 'horizontal') {
			textarea.cols = 70;
			
			if(page != 'compose') {
				textarea.style.width = '';
			}
			
			textarea.rows = 22;
		}
		
		document.getElementById('emoticons' + textareaid).style.display = '';
	}
}

function emoticon(path, code) {
    this.path = path;
    this.code = code;
}

function setupemoticons() {
	array = new Array();
	
	array.push(new emoticon('smile.gif', ':)'));
	array.push(new emoticon('sad.gif', ':('));
	array.push(new emoticon('ohshit.gif', ':o'));
	array.push(new emoticon('biggrin.gif', ':D'));
	array.push(new emoticon('laughing.gif', ':lol:'));
	array.push(new emoticon('omg.gif', ':omg:'));
	array.push(new emoticon('tongue.gif', ':P'));
	array.push(new emoticon('blank.gif', ':|'));
	array.push(new emoticon('frown.gif', ':frown:'));
	array.push(new emoticon('angry.gif', ':angry:'));
	array.push(new emoticon('paddle.gif', ':paddle:'));
	array.push(new emoticon('ohnoes.gif', ':ohnoes:'));
	array.push(new emoticon('worried.gif', ':worried:'));
	array.push(new emoticon('wink.gif', ':wink:'));
	array.push(new emoticon('creepy.gif', ':creepy:'));
	array.push(new emoticon('cool.gif', ':cool:'));
	array.push(new emoticon('wtf.gif', ':wtf:'));
	array.push(new emoticon('hmm.gif', ':unsure:'));
	array.push(new emoticon('no.gif', ':no:'));
	array.push(new emoticon('nod.gif', ':nod:'));
	array.push(new emoticon('eyesright.gif', '>.>'));
	array.push(new emoticon('wave.gif', ':wave:'));
	array.push(new emoticon('sick.gif', ':sick:'));
	array.push(new emoticon('blush.gif', ':blush:'));
	array.push(new emoticon('wub.gif', ':wub:'));
	array.push(new emoticon('heart.gif', '<3'));
	array.push(new emoticon('shifty.gif', ':shifty:'));
	array.push(new emoticon('ninja.gif', ':ninja:'));
	array.push(new emoticon('sorry.gif', ':sorry:'));
	array.push(new emoticon('thanks.gif', ':thanks:'));
	array.push(new emoticon('loveflac.gif', ':loveflac:'));
	array.push(new emoticon('ilu.gif', ':whatlove:'));
	array.push(new emoticon('ilwhatman-what.gif', ':whatmanlove:'));
	array.push(new emoticon('ilnightoath-what.gif', ':nightoathlove:'));
	array.push(new emoticon('ilfzerox-what.gif', ':fzeroxlove:'));
	array.push(new emoticon('ila9-what.gif', ':a9love:'));
	array.push(new emoticon('ilpadutch-what.gif', ':padutchlove:'));
	array.push(new emoticon('ilmn-what.gif', ':mnlove:'));
	
	return array;
}

function buildspan(emoticonlist, page) {
	span = document.createElement('span');

	html = '<table id="emoticons" cellpadding="0" cellspacing="0" style="display:none; float:right; width:auto;">';
	
	perrow = 4;
	rowcount = 0;
	
	for(i=0; i < emoticonlist.length; i++) {
		if(rowcount == 0) {
			html += '<tr>';
		}
		
		html += '<td><img src="/static/common/smileys/' + emoticonlist[i].path + '" style="cursor:pointer;" onclick="append(\'' + emoticonlist[i].code + '\');" title="' + emoticonlist[i].code + '" /></td>';
		
		if(rowcount == perrow - 1) {
			html += '</tr>';
			rowcount = 0;
		} else {
			rowcount++;
		}
	}
	
	if(rowcount != 0) {
		for(; rowcount < perrow; rowcount++) {
			html += '<td></td>';
		}
	}
	
	if(page == null) {
		html += '</table><br /><a href="javascript:toggleemoticons();">Toggle Emoticons</a><br style="clear:both; height:0; font-size: 1px; line-height: 0px;" />';
	} else {
		html += '</table><br /><a href="javascript:toggleemoticons(\'' + page + '\');">Toggle Emoticons</a><br />';
		if(page == 'newthread') {
			html += '<br />';
		}
	}
	
	span.innerHTML = html;
	return span;
}

function buildhorizontal(emoticonlist, id)
{
	div = document.createElement('div');
	div.setAttribute('align', 'center');
	div.setAttribute('id', 'emoticondiv' + id);
	
	html = '<a href="javascript:toggleemoticons(\'horizontal\', ' + id + ');">Toggle Emoticons</a><br />';
	rowcount = 0;
	
	if(id != null) {
		perrow = 13;
		html += '<table id="emoticons' + id + '" cellpadding="0" cellspacing="0" style="display:none; width:auto;">';
	} else {
		perrow = 11;
		html += '<table id="emoticons" cellpadding="0" cellspacing="0" style="display:none; width:auto;">';
	}
	
	for(i=0; i < emoticonlist.length; i++) {
		if(rowcount == 0) {
			html += '<tr>';
		}
		
		html += '<td><img src="/static/common/smileys/' + emoticonlist[i].path + '" style="cursor:pointer;" onclick="append(\'' + emoticonlist[i].code + '\', ' + id + ');" title="' + emoticonlist[i].code + '" /></td>';
		
		if(rowcount == perrow - 1) {
			html += '</tr>';
			rowcount = 0;
		} else {
			rowcount++;
		}
	}
	
	if(rowcount != 0) {
		for(; rowcount < perrow; rowcount++) {
			html += '<td></td>';
		}
	}
	
	html += '</table>';

	div.innerHTML = html;
	return div;
}

function insertSwitch(tr) {
	rows = document.getElementById('userform').getElementsByTagName('tr');
	
	colheads = 0;
	for(i=0; i < rows.length; i++) {
		if(rows[i].className == 'colhead_dark') {
			colheads++;
		}
		
		if(colheads == 2) {
			rows[i].parentNode.insertBefore(tr, rows[i]);
			break;
		}
	}
}

function setCookie(emoticondefault) {
	theDate = new Date();
	oneYearLater = new Date(theDate.getTime() + 31536000000);
	expiryDate = oneYearLater.toGMTString();
	document.cookie = 'emoticondefault=' + emoticondefault + ';expires=' + expiryDate;
}

function getCookie() {
	ca = document.cookie.split(';');
	for(i=0; i < ca.length; i++) {
		c = ca[i];
		while (c.charAt(0)==' ') {
			c = c.substring(1, c.length);
		}
		
		if(c.indexOf('emoticondefault') == 0) {
			return c.substring(16, c.length);
		}
	}
	return null;
}

function overwrite() {
	document.body.appendChild(document.createElement('script')).innerHTML = 'regexp = /^function[\\s\\S]*?\{([\\s\\S]*?)\}$/i; match = regexp.exec(Edit_Form.toString()); original = match[1]; eval(\'function Edit_Form (post, key){\' + original + \' if(document.getElementById(\\\'emoticondiv\\\' + postid) == null){ document.getElementById(\\\'content\\\' + postid).parentNode.insertBefore(buildhorizontal(emoticonlist, postid), document.getElementById(\\\'content\\\' + postid).nextSibling);}' + ((getCookie() == '1') ? ' toggleemoticons(\\\'horizontal\\\', postid);' : '') + '}\');';
	document.body.appendChild(document.createElement('script')).innerHTML = 'match = regexp.exec(Cancel_Edit.toString()); original = match[1]; eval(\'function Cancel_Edit (postid){\' + original + \' div = document.getElementById(\\\'emoticondiv\\\' + postid); div.parentNode.removeChild(div);}\');';
	document.body.appendChild(document.createElement('script')).innerHTML = 'match = regexp.exec(Save_Edit.toString()); original = match[1]; eval(\'function Save_Edit (postid){\' + original + \' div = document.getElementById(\\\'emoticondiv\\\' + postid); div.parentNode.removeChild(div);}\');';
	document.body.appendChild(document.createElement('script')).innerHTML = 'match = regexp.exec(Preview_Edit.toString()); original = match[1]; eval(\'function Preview_Edit (postid){\' + original + \' document.getElementById(\\\'emoticondiv\\\' + postid).style.display = \\\'none\\\';}\');';
	document.body.appendChild(document.createElement('script')).innerHTML = 'match = regexp.exec(Cancel_Preview.toString()); original = match[1]; eval(\'function Cancel_Preview (postid){\' + original + \' document.getElementById(\\\'emoticondiv\\\' + postid).style.display = \\\'\\\';}\');';
}

embedFunction(emoticon);
embedFunction(append);
embedFunction(toggleemoticons);
embedFunction(buildhorizontal);
overwrite();

emoticonlist = setupemoticons();

embedFunction(setupemoticons);
document.body.appendChild(document.createElement('script')).innerHTML = 'emoticonlist = setupemoticons();';

// Set initial emoticondefault to false
if(getCookie() == null) {
	setCookie('0');
} else {
	setCookie(getCookie());
}

if(document.getElementById('quickreplytext') != null) {
	maindiv = document.getElementById('quickreplytext')
	
	if(location.href.indexOf('torrents.php') != -1) {
		maindiv.insertBefore(buildhorizontal(emoticonlist), maindiv.getElementsByTagName('textarea')[0].nextSibling);
		if(getCookie() == '1') {
			toggleemoticons('horizontal', undefined);
		}
	} else {
		maindiv.insertBefore(buildspan(emoticonlist), maindiv.getElementsByTagName('textarea')[0].nextSibling);
		if(getCookie() == '1') {
			toggleemoticons();
		}
	}
} else if(document.getElementsByTagName('textarea')[0].name == 'body') {
	maindiv = document.getElementsByTagName('textarea')[0].parentNode;
	
	if(location.href.indexOf('action=viewconv') != -1) {
		maindiv.insertBefore(buildspan(emoticonlist, 'viewconv'), maindiv.getElementsByTagName('textarea')[0].nextSibling);
		if(getCookie() == '1') {
			toggleemoticons('viewconv');
		}
	} else if(location.href.indexOf('action=compose') != -1) {
		maindiv.insertBefore(buildspan(emoticonlist, 'compose'), maindiv.getElementsByTagName('textarea')[0].nextSibling);
		if(getCookie() == '1') {
			toggleemoticons('compose');
		}
	} else if(location.href.indexOf('action=editgroup') != -1) {
		maindiv.insertBefore(buildhorizontal(emoticonlist), maindiv.getElementsByTagName('textarea')[0].nextSibling);
		if(getCookie() == '1') {
			toggleemoticons('horizontal', undefined);
		}
	} else {
		// New thread
		maindiv.insertBefore(buildhorizontal(emoticonlist), maindiv.getElementsByTagName('textarea')[0].nextSibling);
		if(getCookie() == '1') {
			toggleemoticons('horizontal', undefined);
		}
	}
} else if(window.location.href.indexOf('user.php?action=edit') != -1) {
	tr = document.createElement('tr');
	
	insertSwitch(tr);
	
	tr.innerHTML = '<td class="label"><strong>Emoticon box</strong></td><td><input type="checkbox" id="emoticoncheckbox"' + ((getCookie() == '1') ? ' checked=checked' : '') + ' /> <label for="emoticoncheckbox">Show by default <span style="color:red;">[This is saved immediately]</span></label></td>';
	
	document.getElementById('emoticoncheckbox').addEventListener("change", function() {
		setCookie(document.getElementById('emoticoncheckbox').checked ? '1' : '0');
	}, true);
}