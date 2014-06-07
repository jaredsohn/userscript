// Answer to... 
// by Yuriy Babak aka Inversion (http://inversion.habrahabr.ru/), mailto: yura.des@gmail.com

// ==UserScript==
// @name			Answer to...
// @version        	1.3.5
// @namespace		Habrahabr
// @description		Shows the comment for which this comment is an answer
// @include			http://habrahabr.ru/*
// ==/UserScript==

/*

	v1.3.5 (10.03.13)
	- fixed: broken commentd body finder

	v1.3.4 (09.12.12)
	- оптимизирован враппер

	v1.3.3 (12.04.12)
	v1.3.2 (01.04.12)
	- исправлена совместимость с Opera
	
	v1.3.1 (08.02.12)
	- исправлено некорректное отображение в связи с изменением верстки на сайте
	- добавлена более выразительная тень
	- комментарий в попапе теперь показывается как можно более полно, использую доступное пространство
	- новый режим подсветки: если комментарий не вышел за пределы экрана, то он подсвечивается прямо на странице
	
	v1.2.2 (26.11.11)
	- поддержка старой верстки
	
	v1.2.1 (07.11.11)
	- теперь работает и когда не авторизирован
	
	v1.2 (06.11.11)
	- просто возобновление работы после изменений на сайте
	- улучшена адаптация ширины комментариев
	
	v1.1 (07.11.09)
	- Теперь работает и для комментариев, которые динамически появляются при клике на кнопке, что справа
	- Исправлено перекрывание окошка панелькой, что внизу топика

	v1.0 (27.10.09)
	- public release
	
*/



	
/*	
класс стрелочки вверх — up-to-parent
href — #comment_1706843

ID ответа — comment_1706843
	класс заголовка — div info
	класс тела — div message
*/

"use strict";

!function(win) {

if (window != window.top) return
var doc = win.document

win.addEventListener("load", function() {
	if (doc.getElementById('comments')) {
	
		var msgStyle = "\
			background-color:white;\
			padding:3px 2px 0 5px;\
			position:absolute;\
			z-index:1;\
			overflow-y:auto;\
			-webkit-box-shadow:  0px 3px 12px 3px rgba(0, 0, 0, 0.3);\
			-moz-box-shadow: 0px 3px 12px 3px rgba(0, 0, 0, 0.3);\
			box-shadow: 0px 3px 12px 3px rgba(0, 0, 0, 0.3);"
		
		// поддержка старой верстки
		if (doc.getElementById('main-page')) {
			win.msgContainer_cont = doc.createElement("ul")
			win.msgContainer_cont.className = "hentry"
			win.msgContainer_cont.innerHTML = '<li class="comment_holder vote_holder" style="'+msgStyle+'"></li>'
			win.msgContainer_cont.style.cssText = "position:fixed;top:0px;left:0px;width:64.8%;display:none;z-index:99;margin:0 !important;padding:0 !important;overflow:visible;text-align:left;"
			doc.body.appendChild(win.msgContainer_cont)
			win.msgContainer = win.msgContainer_cont.firstChild
			win.comments = doc.getElementById("comments")
		 	
 			// прописываем ховер стрелочкам всех комментов
			var arrsUp = win.comments.getElementsByTagName('li')
			for (var i=0, l=arrsUp.length; i<l; i++) {
				var el = arrsUp[i]
				if (el.className == 'up-to-parent') {
					el.firstChild.addEventListener("mouseover", function(){
						showTargetComment(this.getAttribute('href'), this)
					}, false)
					el.firstChild.addEventListener("mouseout", hideTargetComment, false)
				}
			}
		}
		else {
			// готовим контейнер для просмотра
			win.msgContainer_cont = doc.createElement("div")
			win.msgContainer_cont.className = "comments_list comments_list_answerTo"
			win.msgContainer_cont.innerHTML = '<div class="comment_item" style="'+msgStyle+'"></div>'
			win.msgContainer_cont.style.cssText = "position:fixed;top:0px;left:0px;display:none;z-index:99;margin:0 !important;padding:0 !important;overflow:visible;text-align:left;"
			doc.body.appendChild(win.msgContainer_cont)
			win.msgContainer = win.msgContainer_cont.firstChild
	 	
	 		// прописываем ховер стрелочкам всех комментов
			var arr = doc.links
			for (i=0,l=doc.links.length; i<l; i++) {
				var link = doc.links[i]
				if (link.className == 'to_parent') {
					activateArrow(link)
				}
			}
			
			// таймер для активации новых комментариев
			setInterval(function() {
				var $ = win.jQuery
				if ($) {
					var newComments = $('.comment .is_new .to_parent')
					for (var i=0, li=newComments.length; i<li; i++) {
						var link = newComments[i]
						if (link.getAttribute('oninit') != 'activaded') {
							activateArrow(link)
							link.setAttribute('oninit', 'activaded')
						}
					}
				}
			}, 2000)
			
		}
		
		
		// на клик — прячем коммент
		win.addEventListener("mousedown", hideTargetComment, false)
		
	}
	
}, false);

function activateArrow(arrEl) {
	arrEl.addEventListener("mouseover", function(){
		showTargetComment(this.getAttribute('href'), arrEl)
	}, false)
	arrEl.addEventListener("mouseout", hideTargetComment, false)
}

function showTargetComment(href, arrEl) {
	// ищем объект по id
	var id = href.replace(/^.*?#/, '')
	var target = doc.getElementById(id)
	
	// чистим контейнер
	while (win.msgContainer.childNodes.length) {win.msgContainer.removeChild(win.msgContainer.childNodes[0])}
	
	
	// поддержка старой верстки
	if (doc.getElementById('main-page')) {
		// заполняем контейнер новым комментом
		for (var i=0, l=target.childNodes.length; i<l; i++) {
			var tmp = target.childNodes[i]
			if (/msg-meta|entry-content/.test(tmp.className)) {
				win.msgContainer.appendChild(tmp.cloneNode(true))	
			}
			// выходим из цикла
			if (tmp.className == "entry-content") break
		}
	}
	else {
		// заполняем контейнер новым комментом
		var comment_body = null
		for (var i=0, l=target.childNodes.length; i<l; i++) {
			var tmp = target.childNodes[i]
			if (/comment_body/.test(tmp.className)) {
				comment_body = tmp
				break
			}
		}
		if (comment_body) {
			for (var i=0, l=comment_body.childNodes.length; i<l; i++) {
				var tmp = comment_body.childNodes[i]
				if (/info|message/.test(tmp.className)) {
					win.msgContainer.appendChild(tmp.cloneNode(true))
				}
				// выходим из цикла
				if (tmp.className == "message") break
			}
		}
	}
	
	
	// подгоняем ширину под блок комментариев
	var pageComments_cont = doc.getElementById('comments')
	win.msgContainer_cont.style.width = pageComments_cont.offsetWidth+absLeft(pageComments_cont)-8 + 'px'
	
	
	var targetTop = absTop(target)
	var windowScrollPos = doc.documentElement.scrollTop || doc.body.scrollTop
		
	// inline highlight
	win.msgContainer.style.top = targetTop>windowScrollPos  ?  targetTop-windowScrollPos-3 +'px'  :  0
	
	// height auto adjustment
	if (targetTop<windowScrollPos) {
		var currentCommentTop = absTop(arrEl.parentNode.parentNode)
		var targetCommentHeight = target.offsetHeight
		var delta = (windowScrollPos + targetCommentHeight)  -  (currentCommentTop-10)
		win.msgContainer.style.maxHeight = delta>0  ?  targetCommentHeight-delta +'px'  :  ''
	}
	else {
		win.msgContainer.style.maxHeight = ''
	}

	// показываем
	win.msgContainer.parentNode.style.display = "block"
	
	// отступы
	win.msgContainer.style.marginLeft = absLeft(target)-5+'px'
	win.msgContainer.style.width = win.msgContainer.parentNode.offsetWidth-parseInt(win.msgContainer.style.marginLeft)+'px'
	
}

function hideTargetComment() {
	win.msgContainer.parentNode.style.display = "none"
}

function absLeft(o) {
	var l = 0
	do {
		if (o.offsetLeft) l += o.offsetLeft-o.scrollLeft;
	} while (o = o.offsetParent)
	return l
}
function absTop(o) {
	var l = 0
	do {
		if (o.offsetTop) l += o.offsetTop-o.scrollTop;
	} while (o = o.offsetParent)
	return l
}

}(typeof unsafeWindow == 'undefined' ? window : unsafeWindow)
