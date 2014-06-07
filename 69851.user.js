// ==UserScript==
// @name           WOP Quick Quote
// @namespace      http://forum.worldofplayers.ru/forumdisplay.php
// @description    Adds sweet quick reply to WOP forum
// @include        http://forum.worldofplayers.ru/forumdisplay.php?*
// @include        http://forum.worldofplayers.ru/showthread.php?*
// ==/UserScript==
var allDivs, thisDiv, names, nicks=new Array();

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function addquote(){
    if (window.getSelection)
    {
        theSelection = window.getSelection().toString();
    }
    else if (document.getSelection)
    {
        theSelection = document.getSelection();
    }
    else if (document.selection)
    {
        theSelection = document.selection.createRange().text;
    }
    if (theSelection)
    {
        insert_text('[quote]' + theSelection + '[/quote]');
    }
   	document.getElementById('vB_Editor_QR_textarea').focus();
    return;
}

function addname(name){
	insert_text(name);
	return;
}


function insert_text(text)
{
    var textarea;
    textarea = document.getElementById('vB_Editor_QR_textarea');
    if (textarea.createTextRange && textarea.caretPos)
    {
        if (baseHeight != textarea.caretPos.boundingHeight)
        {
            textarea.focus();
            storeCaret(textarea);
        }
        var caret_pos = textarea.caretPos;
        caret_pos.text = caret_pos.text.charAt(caret_pos.text.length - 1) == ' ' ? caret_pos.text + text + ' ' : caret_pos.text + text;
    }
    else
    {
        textarea.value = textarea.value + text;
    }
}

function createQQuote(){
	var elmButton = document.createElement("a");
	elmButton.href = 'javascript:void(0);';
	elmButton.className = 'smallfont';
	elmButton.appendChild(document.createTextNode('Цитировать выделенное'));
	elmButton.addEventListener("click", addquote, false);
	return elmButton;
}

function create2Name(nick){
	var elmButton = document.createElement("a");
	elmButton.href = 'javascript:void(0);';
	elmButton.className = 'smallfont';
	elmButton.appendChild(document.createTextNode('Обратиться по имени'));
	user_id = nick.href.substr(nick.href.indexOf('=')+1,10);
	if(nick.innerHTML[0] =='<')
		nick = nick.innerHTML.substring(nick.innerHTML.indexOf('>')+1, nick.innerHTML.lastIndexOf('<'));
	else
		nick = nick.innerHTML;
	nick= '[B]2 [URL="http://forum.worldofplayers.ru/member.php?u='+user_id+'"]'+nick+'[/URL]: [/B]';
	elmButton.addEventListener("click", function(){addname(nick)}, false);
	return elmButton;
}


//add quick quote
nicknames = xpath("//a[@class='bigusername']");
allDivs = xpath("//td[div[contains(@id, 'postmenu')]]");
thanx = xpath("//td[@class='alt2']/div[@class='smallfont'][contains(., 'Спасибки')]");

var postcount = allDivs.snapshotLength;

for (var i = 0; i < postcount; i++) {
    thisDiv = allDivs.snapshotItem(i);
	nick = nicknames.snapshotItem(i);
	user_id = nick.href.substr(nick.href.indexOf('=')+1,10);
	thisDiv.appendChild(document.createElement("br"));
	thisDiv.appendChild(create2Name(nick));
	thisDiv.appendChild(document.createElement("br"));
	thisDiv.appendChild(createQQuote());
	
	thank=thanx.snapshotItem(i);
	thank.innerHTML=thank.innerHTML.replace('→', '<a href="http://forum.worldofplayers.ru/post_thanks.php?do=findthanks_user_gave&u='+user_id+'" title="Сказал спасибо">→</a>');
	thank.innerHTML=thank.innerHTML.replace('←', '<a href="http://forum.worldofplayers.ru/post_thanks.php?do=findthanks&u='+user_id+'" title="Получил спасибо">←</a>');
}