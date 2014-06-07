// Быстрое добавление жепок
// version 0.21 b
// 2008-09-23
// @author antyrat (да, я сирани 21k) http://leprosorium.ru/users/21007 modified by DileSoft
// ==UserScript==
// @name          Быстрое добавление жепок
// @namespace     http://leprosorium.ru
// @description   Находит в комментах жепки и прикрепляет к ним плюсик, для быстрого добавления
// @include       http://leprosorium.ru/comments/*
// @include       http://*.leprosorium.ru/comments/*
// ==/UserScript==

function insertAfter( referenceNode, newNode )
{
    if (referenceNode.nextSibling) {
        referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
    }
    else {
        referenceNode.parentNode.appendChild( newNode);
    }
}

if (document.location.href.match('/comments/'))
{

	var jepkaPattern = /([^\s,:\>\<][a-zA-Zа-яА-ЯёЁїіЇІъЪ0-9;#&\s\-\—\.?]+[^\s,])(\[x\]|\s\[x\]|\s\[х\]|\[х\])+/gi;
	var jepkaReplacement = "$1 [<a href=\"javascript:;\" id=\"jepka\" onclick=\"return makeOutWithJepka(this,'$1');\" style=\"font-size:1em;font-weight:bold;color:#999966;text-decoration:none;\">X</a>]";

	if (!document.getElementsByClassName){
		document.getElementsByClassName = function(cl) {
			var retnode = [];
			var myclass = new RegExp('\\b'+cl+'\\b');
			var elem = this.getElementsByTagName('*');
			for (var i = 0; i < elem.length; i++) 
			{
				var classes = elem[i].className;
				if (myclass.test(classes)) retnode.push(elem[i]);
			}
			return retnode;
		}; 
	}


	var favouriteTags = new Array('хуй','ЕБИЧЕСКИЙ ПРОВАЛ','нам похуй','понаприглашали','Пост доказывающий превосходство Лепрозория над другими жалкими коллективными блогами','Эксперимент','все правильно сделал','завтра на фишках','заебали со своим лебедевым','лепра - та','похотливая самка бабуина','супержепка','тупая пизда','я и моя сраная кошка','дорогой дневничок','все правильно сделал','Эксперимент','Еще один все понял','жепка');
	var jepkaBlock = document.getElementById('tags_add');
	var favoriteBlock;
	favoriteBlock = document.createElement("DIV");
	
	insertAfter(jepkaBlock, favoriteBlock);
	
	favoriteBlock.innerHTML="<h2>Жепки в тексте:</h2>";
	var commentsBlocks = document.getElementsByClassName('dt');
	var tempJepka = new Array();
	for(var i=0; i<commentsBlocks.length;i++) {
		str = commentsBlocks[i].innerHTML;
		str.replace(jepkaPattern, 
			function(a1,a2,a3,a4,a5,a6){tempJepka[tempJepka.length]=a2;}
		);
	}

	for(var i=0; i<tempJepka.length;i++) {
		favoriteBlock.innerHTML += "<a href=\"javascript:;\" id=\"jepka\" onclick=\"return addTag('"+tempJepka[i]+"');\" style=\"font-size:0.75em;font-weight:bold;color:#999966;text-decoration:none;\">"+tempJepka[i]+"</a> <span style=\"font-size:0.75em;\">|</span> ";
	}

	favoriteBlock.innerHTML +="<h2>Популярные жепки:</h2>";
	for(var j=0;j<favouriteTags.length;j++) {
		favoriteBlock.innerHTML += "<a href=\"javascript:;\" id=\"jepka\" onclick=\"return addTag('"+favouriteTags[j]+"');\" style=\"font-size:0.75em;font-weight:bold;color:#999966;text-decoration:none;\">"+favouriteTags[j]+"</a> <span style=\"font-size:0.75em;\">|</span> ";
	}

	for(var i=0; i<commentsBlocks.length;i++) {
		str = commentsBlocks[i].innerHTML;
		var result = str.replace(jepkaPattern, jepkaReplacement);
		commentsBlocks[i].innerHTML = result;
	}

	var jepkaFunction = "function makeOutWithJepka(obj, jepka){if(obj.innerHTML == 'X') {var noJepka = false;var jepkaBlocks = document.getElementsByClassName('tag');	for(var i=0; i<jepkaBlocks.length;i++) {if(jepkaBlocks[i].innerHTML == jepka) {	obj.innerHTML = '-';noJepka = true;	}}if(!noJepka) {if (confirm('Вы уверены, что хотите добавить жепку: '+jepka+' ')) {	obj.innerHTML = '-';return addTag(jepka);}} else {return false;}} else {if (confirm('Вы уверены, что хотите удалить жепку: '+jepka+' ')) {obj.innerHTML = 'X';return delTag(jepka);	}}};";
	jScript = document.createElement("SCRIPT");
	jScript.type = "text/javascript";
	jScript.innerHTML = jepkaFunction;
	document.body.appendChild(jScript);
}