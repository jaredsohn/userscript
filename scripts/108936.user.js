// ==UserScript==
// @name            AddSmiles
// @namespace       forum.sibmama.ru
// @include    	    http://forum.sibmama.ru/*
// @author     	    Fenex
// @version    	    3.2
// @icon            http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==
function openPrompt() {
	var hrefs = prompt("Введите через пробел ссылки на смайлики", localStorage['smiles_img']);
	if(!hrefs)
		return;
	localStorage['smiles_img'] = hrefs.trim();
	insertSmiles(hrefs);
}
function insertSmiles(smiles) {
	smiles = smiles.split(' ');
	var code = '';
	for(i=0;i<smiles.length;i++)
		code += '<img style="cursor:pointer;" onclick=emoticon("[img]'+smiles[i]+'[/img]") src="'+smiles[i]+'" /> ';
	document.getElementById('smiles_img').innerHTML = code;
}
function getPlace4Smiles() {
	var index_1 = 0
	var index_2 = 0;
	if(/http\:\/\/forum.sibmama\.ru\/viewtopic\.php/.test(location.href)) {
		index_2 = 2;
	}
	else if(/http\:\/\/forum.sibmama\.ru\/posting\.php/.test(location.href)) {
		if(document.forms['post'].getElementsByClassName('forumline')[0].getElementsByClassName('thHead')[0].innerHTML.indexOf('Предв. просмотр')>=0)
			index_1 = 1;
		else
			index_1 = 0;
		if((document.forms['post'].getElementsByClassName('forumline')[index_1].getElementsByClassName('thHead')[0].innerHTML.indexOf('Ответить')>=0)||(document.forms['post'].getElementsByClassName('forumline')[index_1].getElementsByClassName('thHead')[0].innerHTML.indexOf('Редактировать сообщение')>=0))
			index_2 = 2;
		else if(document.forms['post'].getElementsByClassName('forumline')[index_1].getElementsByClassName('thHead')[0].innerHTML.indexOf('Начать новую тему')>=0)
			index_2 = 3;
		else
			return false;
	}
	else if(/http\:\/\/forum\.sibmama\.ru\/privmsg\.php/.test(location.href)) {
		if(document.forms['post'].getElementsByClassName('forumline')[0].getElementsByClassName('thHead')[0].innerHTML.indexOf('Ответить на личное сообщение')>=0) {
			index_1 = 0;
			index_2 = 5;
		} else if(document.forms['post'].getElementsByClassName('forumline')[0].getElementsByClassName('thHead')[0].innerHTML.indexOf('Предв. просмотр')>=0) {
			index_1 = 1;
			index_2 = 3;
		} else if(document.forms['post'].getElementsByClassName('forumline')[0].getElementsByClassName('thHead')[0].innerHTML.indexOf('Отправить личное сообщение')>=0) {
			index_1 = 0;
			index_2 = 3;
		}
		else
			return false;
	} else {
		return false;
	}
	return document.forms['post'].getElementsByClassName('forumline')[index_1].getElementsByTagName('tr')[index_2].getElementsByClassName('gen')[1]	
}
function loadSmiles() {
	var insert = getPlace4Smiles();
	if(!insert)
		return;
	if(!localStorage['smiles_img']) {
	localStorage['smiles_img'] = "http://klavogonki.ru/img/smilies/smile.gif http://klavogonki.ru/img/smilies/biggrin.gif http://klavogonki.ru/img/smilies/angry.gif http://klavogonki.ru/img/smilies/angry2.gif http://klavogonki.ru/img/smilies/blink.gif http://klavogonki.ru/img/smilies/blush.gif http://klavogonki.ru/img/smilies/cool.gif http://klavogonki.ru/img/smilies/dry.gif http://klavogonki.ru/img/smilies/excl.gif http://klavogonki.ru/img/smilies/happy.gif http://klavogonki.ru/img/smilies/huh.gif http://klavogonki.ru/img/smilies/laugh.gif http://klavogonki.ru/img/smilies/mellow.gif http://klavogonki.ru/img/smilies/ohmy.gif http://klavogonki.ru/img/smilies/ph34r.gif http://klavogonki.ru/img/smilies/rolleyes.gif http://klavogonki.ru/img/smilies/sad.gif http://klavogonki.ru/img/smilies/sleep.gif http://klavogonki.ru/img/smilies/tongue.gif http://klavogonki.ru/img/smilies/unsure.gif http://klavogonki.ru/img/smilies/wacko.gif http://klavogonki.ru/img/smilies/wink.gif http://klavogonki.ru/img/smilies/wub.gif http://klavogonki.ru/img/smilies/power.gif http://klavogonki.ru/img/smilies/spiteful.gif http://klavogonki.ru/img/smilies/sorry.gif http://klavogonki.ru/img/smilies/first.gif http://klavogonki.ru/img/smilies/second.gif http://klavogonki.ru/img/smilies/third.gif http://klavogonki.ru/img/smilies/badcomp.gif http://klavogonki.ru/img/smilies/complaugh.gif http://klavogonki.ru/img/smilies/girlnotebook.gif http://klavogonki.ru/img/smilies/crazy.gif http://klavogonki.ru/img/smilies/boredom.gif http://klavogonki.ru/img/smilies/cry.gif http://klavogonki.ru/img/smilies/bye.gif http://klavogonki.ru/img/smilies/dance.gif http://klavogonki.ru/img/smilies/gamer.gif http://klavogonki.ru/img/smilies/rofl.gif http://klavogonki.ru/img/smilies/beer.gif http://klavogonki.ru/img/smilies/kidtruck.gif http://klavogonki.ru/img/smilies/boykiss.gif http://klavogonki.ru/img/smilies/girlkiss.gif http://klavogonki.ru/img/smilies/kissed.gif http://klavogonki.ru/img/smilies/yes.gif http://klavogonki.ru/img/smilies/no.gif http://klavogonki.ru/img/smilies/hi.gif http://klavogonki.ru/img/smilies/ok.gif";
	}
	var e = document.createElement('span');
	e.innerHTML = '<b>Смайлы</b> <a style="float:right;" href="javascript:openPrompt();">Настройки</a><div id="smiles_img" style="margin:7px;"></div>';
	e.setAttribute('class', 'gen');
	insert.setAttribute('style', 'float:left;');
	insert.parentNode.insertBefore(e, insert.nextSibling);
	insertSmiles(localStorage['smiles_img']);
}

function checkLoaded() {
	if(document.forms&&document.forms['post']&&document.forms['post'].getElementsByClassName('forumline')[0]) {
		clearInterval(smiles_timer);
		loadSmiles();
	}
}
var s = document.createElement('script');
s.innerHTML = getPlace4Smiles+checkLoaded+insertSmiles+loadSmiles+openPrompt+"\nvar smiles_timer = setTimeout('checkLoaded()', 100)";
document.body.appendChild(s);