// ==UserScript==
// @name           anime.com.pl script
// @namespace      anime.com.pl
// @include        http://anime.com.pl/*
// ==/UserScript==

(function () {
	var newComments,
		actualComment = 0,
		pageLocation = location.href,
		index = pageLocation.indexOf("#"),
		i = 0;

	if (index >= 0) {
		pageLocation = pageLocation.substring(0, index);
	}

	function acepInit() {
		newComments = document.getElementsByClassName('commentnew');

		var body = document.getElementsByTagName('body');

		// CSS-y
		var sheet = document.createElement('style');
		sheet.appendChild(document.createTextNode('#acepNavBlock {position: fixed; bottom: 0; line-height: 30px; background: #4E608F; -moz-border-radius: 10px 10px 0px 0px; border-radius: 10px 10px 0px 0px; border: 1px solid #4E608F; border-bottom: none} #acepNavBlock span {color: white; padding: 10px; text-decoration: none;} #acepNavBlock span:hover {color: #9999CC !important; cursor: pointer;} #acepNavBlock input {vertical-align: middle; margin-right: 8px;}'));
		document.body.appendChild(sheet);

		// blok nawigacyjny
		var navBlock = document.createElement('div');
		navBlock.setAttribute('id', 'acepNavBlock');

		if (newComments.length > 0) {
			// poprzedni nowy komentarz
			var previousComment = document.createElement('span');
			previousComment.setAttribute('title', 'Poprzedni nowy komentarz');

			previousComment.addEventListener('click', function () { newComment('prev'); }, false);
			previousComment.appendChild(document.createTextNode('Poprzedni komentarz'));
			navBlock.appendChild(previousComment);

			// następny nowy komentarz
			var nextComment = document.createElement('span');
			nextComment.setAttribute('title', 'Następny nowy komentarz');

			nextComment.addEventListener('click', function () { newComment('next'); }, false);
			nextComment.appendChild(document.createTextNode('Następny komentarz'));
			navBlock.appendChild(nextComment);

			navBlock.style.left = "30%";
		} else {
			navBlock.style.left = "40%";
		}

		// pokaż wszystkie komentarze
		var showComments = document.createElement('span');
		showComments.setAttribute('title', 'Wyświetl wszystkie komentarze');
		showComments.addEventListener('click', showAllComments, false);
		showComments.appendChild(document.createTextNode('Wyświetl wszystkie komentarze'));

		navBlock.appendChild(showComments);

		// pokazuj od razu wszystkie ukryte komentarze po załadowaniu strony
		var showCommentsCheckbox = document.createElement("input");
		showCommentsCheckbox.setAttribute('type', 'checkbox');
		showCommentsCheckbox.setAttribute('id', 'alwaysShowComments');
		showCommentsCheckbox.setAttribute('name', 'alwaysShowComments');
		showCommentsCheckbox.setAttribute('title', 'Pokazuj zawsze ukryte komentarze');
		showCommentsCheckbox.addEventListener('change', changeShowComments, false);
		navBlock.appendChild(showCommentsCheckbox);

		body[0].appendChild(navBlock);

		checkCookieOnStart();
	}

	function newComment(mode) {
		if (mode === 'prev') {
			if (actualComment !== 0 && actualComment !== newComments[0].id) {
				for (i = 0; i < newComments.length; i++) {
					if (actualComment === newComments[i].id) {
						actualComment = newComments[i - 1].id;
						location.href = pageLocation + "#" + actualComment;
						break;
					}
				}
			}
		} else if (mode === 'next') {
			if (actualComment !== newComments[newComments.length - 1].id) {
				if (actualComment === 0) {
					actualComment = newComments[0].id;
					location.href = pageLocation + "#" + actualComment;
				} else {
					for (i = 0; i < newComments.length; i++) {
						if (actualComment === newComments[i].id) {
							actualComment = newComments[i + 1].id;
							location.href = pageLocation + "#" + actualComment;
							break;
						}
					}
				}
			}
		}
	}

	function showAllComments() {
		var paragraphs = document.getElementsByClassName('info');

		var maincol = document.getElementsByClassName('maincol');

		for (i = 0; i < paragraphs.length; i++) {
			if (paragraphs[i].nodeName === 'SPAN') {
				paragraphs[i].parentNode.nextSibling.style.display = 'block';

				maincol[0].removeChild(paragraphs[i].parentNode);
			}
		}
	}

	function getCookie(cookieName) {
		var cookies = document.cookie.split(';');

		var cookiesLength = cookies.length;
		for (i = 0; i < cookiesLength; i++) {
			var cookieKey = cookies[i].substr(0, cookies[i].indexOf("="));
			var cookieValue = cookies[i].substr(cookies[i].indexOf("=") + 1);
			cookieKey = cookieKey.replace(/^\s+|\s+$/g, "");

			if (cookieKey === cookieName) {
				return cookieValue;
			}
		}

		return null;
	}

	function setCookie(name, value, days) {
		var expires = null;

		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toGMTString();
		} else {
			expires = "";
		}

		document.cookie = name + "=" + value + expires + "; path=/";
	}

	function checkCookieOnStart() {
		var alwaysShowComments = getCookie('acepAlwaysShowHiddenComments');

		if (alwaysShowComments === null) {
			setCookie("acepAlwaysShowHiddenComments", 'no', 999999);
		} else {
			if (alwaysShowComments === 'yes') {
				var checkbox = document.getElementById('alwaysShowComments');
				checkbox.setAttribute('checked', 'checked');
				showAllComments();
			}
		}
	}

	function changeShowComments() {
		var alwaysShowComments = getCookie('acepAlwaysShowHiddenComments');
		var checkbox = null;

		if (alwaysShowComments === 'yes') {
			setCookie("acepAlwaysShowHiddenComments", 'no', 999999);
			checkbox = document.getElementById('alwaysShowComments');
			checkbox.setAttribute('checked', 'checked');
		} else if (alwaysShowComments === 'no') {
			setCookie("acepAlwaysShowHiddenComments", 'yes', 999999);
			checkbox = document.getElementById('alwaysShowComments');
			checkbox.removeAttribute('checked');
		}
	}

	var comments = document.getElementsByClassName('comment');

	if (comments.length > 0) {
		window.addEventListener('load', acepInit, false);
	}
})();