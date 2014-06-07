// ==UserScript==
// @name           LokiMessageSmileys
// @namespace      http://userscripts.org/users/livinskull
// @author         livinskull
// @version        v0.01
// @include        http://www.lokalisten.de/web/message/editViewMessage.do*
// @include        http://www.lokalisten.de/web/message/replyViewMessage.do*
// @include        http://www.lokalisten.de/web/message/friends/editSendMessage.do*
// ==/UserScript==

var oTextArea = document.getElementsByTagName('textarea')[0];
var aSmileys = new Array();
aSmileys['@-)'] 	= 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/alien.gif';
aSmileys['O:-)'] 	= 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/angel.gif';
aSmileys['|-)'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/bandit.gif';
aSmileys['(i)'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/bulb.gif';
aSmileys['(t)'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/phone.gif';
aSmileys[':cat:'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/cat.gif';
aSmileys[':o)'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/cheerful.gif';
aSmileys[':-){'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/chinese.gif';
aSmileys[':cobra:'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/cobra.gif';
aSmileys[':cocktail:'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/cocktail.gif';
aSmileys[':coffee:'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/coffee.gif';
aSmileys['8-s'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/confused.gif';
aSmileys['B-)'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/cool.gif';
aSmileys['B)'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/cool.gif';
//aSmileys[':\'('] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/cry.gif';
aSmileys[':('] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/depressed.gif';
aSmileys[':-('] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/depressed.gif';
aSmileys['(6)'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/devil.gif';
aSmileys[':dinosaur:'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/dinosaur.gif';
aSmileys['8-('] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/disappointed.gif';
aSmileys[':drink:'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/drink.gif';
aSmileys[':*)'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/embarrassed.gif';
aSmileys['>:-D'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/evil.gif';
aSmileys[':fish:'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/fish.gif';
aSmileys['8-)'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/foureyes.gif';
aSmileys['8)'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/foureyes.gif';
aSmileys[':glasses:'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/glasses.gif';
aSmileys[':world:'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/globe.gif';
aSmileys[':graduate:'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/graduate.gif';
aSmileys[':death:'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/grimreaper.gif';
aSmileys[':D'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/grin.gif';
aSmileys[':-D'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/grin.gif';
aSmileys[':hammer:'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/hammer.gif';
aSmileys['(u)'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/heartbroken.gif';
aSmileys['(l)'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/heart.gif';
aSmileys['(e)'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/letter.gif';
aSmileys[':-P'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/lick.gif';
aSmileys[':P'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/lick.gif';
aSmileys['>:-o'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/mad.gif';
aSmileys[':man:'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/person.gif';
aSmileys['P-)'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/pirate.gif';
aSmileys[':skull:'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/skull.gif';
aSmileys[':-<'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/sad.gif';
aSmileys[':o'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/scared.gif';
aSmileys['3-|{'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/sleeping.gif';
aSmileys[':-)'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/smile.gif';
aSmileys[':)'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/smile.gif';
aSmileys[':-!'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/smoker.gif';
aSmileys[':X'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/speechless.gif';
aSmileys['(n)'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/thumbdown.gif';
aSmileys['(y)'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/thumbup.gif';
aSmileys[':tv:'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/tv.gif';
aSmileys[';)'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/wink.gif';
aSmileys[';-)'] = 'http://im.lokalisten.de/lokichat/images/emoticons/rythmbox/wink.gif';


if (document.location.toString().indexOf('editViewMessage') != -1) {
	// message view
	if (oTextArea) {
		oTextArea.style.display = 'none';
		
		var oMsgView = document.createElement('div');
		oMsgView.innerHTML = oTextArea.innerHTML.replace(/\x0A/g, '<br/>');
		
		for (i in aSmileys) {
			regex = new RegExp(regex_escape(i), 'g');
			
			oMsgView.innerHTML = oMsgView.innerHTML.replace(regex, "<img src=\"" + aSmileys[i] + "\" alt=\"" + i + "\" title=\"" + i + "\" />");
		}
		
		oTextArea.parentNode.insertBefore(oMsgView, oTextArea);
	}
} else {
	// message editing
	document.getElementById('txtMsg').style.cssFloat = 'left';
	document.getElementById('txtMsg').style.clear = 'left';
	
	var oSmileyDiv = document.createElement('div');
	oSmileyDiv.style.cssFloat = 'right';
	oSmileyDiv.style.backgroundColor = '#CCFF00';
	oSmileyDiv.innerHTML = '<div style="background-color: #669900; padding: 5px; font-weight: bold;">Smileys</div><div style="margin: 10px;">';
	
	x = 0;
	for (i in aSmileys) {
		x++;
		oSmileyDiv.innerHTML += '<a href="javascript:addSmiley(\'' + i + '\');">'  +
			'<img src="' + aSmileys[i] + "\" alt=\"" + i + "\" title=\"" + i + "\" /></a>";
		if (x%7 == 0)
			oSmileyDiv.innerHTML += '<br/>';
		else 
			oSmileyDiv.innerHTML += '&nbsp;';
	}
	oSmileyDiv.innerHTML += '</div>' + 
		'<div><span style="float: right; font-size: 30%">made by <a href="http://userscripts.org/users/livinskull">livinskull</a></span></div>';
	
	x = document.getElementsByClassName('multimsg4')[0];
	x.insertBefore(oSmileyDiv, x.childNodes[1]);
}

unsafeWindow['addSmiley'] = function(x) {
	var input = document.getElementById('txtMsg');
	pos = input.selectionStart;
	input.value = input.value.substring(0, pos) + ' ' + x + input.value.substring(pos, input.value.length);
	input.focus();
	input.selectionStart = pos + x.length + 1;
	input.selectionEnd = pos + x.length + 1;
}

function regex_escape(text) {
  if (!arguments.callee.sRE) {
    var specials = [
      '/', '.', '*', '+', '?', '|',
      '(', ')', '[', ']', '{', '}', '\\'
    ];
    arguments.callee.sRE = new RegExp(
      '(\\' + specials.join('|\\') + ')', 'g'
    );
  }
  return text.replace(arguments.callee.sRE, '\\$1');
}
