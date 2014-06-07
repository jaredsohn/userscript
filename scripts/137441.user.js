// ==UserScript==
// @name            GameFAQs Tag Yourself
// @namespace       OTACON120
// @version         1.2
// @description     Gives you the ability to tag yourself on the GameFAQs message boards
// @updateURL       http://userscripts.org/scripts/source/137441.meta.js
// @downloadURL     http://userscripts.org/scripts/source/137441.user.js
// @website         http://otacon120.com/user-scripts/gamefaqs-related/tag-yourself/
// @include         http://www.gamefaqs.com/boards/user.php*
// @include         http://www.gamefaqs.com/users/*
// @match           http://www.gamefaqs.com/users/*
// @match           http://www.gamefaqs.com/boards/user.php*
// @grant           none
// ==/UserScript==

function getQueryValues(name) {
	name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
	var regexS = '[\\?&]' + name + '=([^&#]*)',
		regex = new RegExp(regexS),
		results = regex.exec(window.location.href);

	if (results === null) {
		return "";
	} else {
		return results[1];
	}
}

var	getKey = new XMLHttpRequest(),
	pathArray = window.location.pathname.split('/'),
	pageType = pathArray[3],
	userPHP = (pathArray[1] !== 'users' ? true : false),
	mainContent = document.getElementsByClassName('main_content')[0],
	selectCol = (userPHP ? mainContent.getElementsByClassName('span8')[0] : mainContent.getElementsByClassName('span4')[0]),
	parentContain = (userPHP ? selectCol.getElementsByClassName('userinfo')[0].getElementsByTagName('tbody')[0] : selectCol.firstChild),
	currentUser,
	profileUser,
	formKey = document.createElement('div');

switch (userPHP) {
	case true:
		var board = getQueryValues('board'),
			topic = getQueryValues('topic'),
			fromTopic = (board === '' && topic === '' ? false : true),
			userInfoRows = parentContain.getElementsByTagName('tr'),
		 	userInfoData = parentContain.getElementsByTagName('td'),
		 	profileUserID,
			tagUserRow  = document.createElement('tr');

		 currentUser = selectCol.getElementsByClassName('user')[0].getElementsByTagName('a')[0].textContent.replace(/ \([0-9]*\)/, '');
		 profileUser = userInfoData[0].textContent;
		 profileUserID = userInfoData[1].textContent;
		 break;

	case false:
		profileUser = document.getElementsByClassName('span8')[0].getElementsByTagName('h1')[0].textContent.replace('GameFAQs User Profile: ', '');
		currentUser = (parentContain.getElementsByClassName('title')[0].textContent === 'Your Profile' ? true : false);
		if (!currentUser) {
			return;
		}
		break;
}




if (currentUser === profileUser || currentUser === true) {
	getKey.open('POST', '/boards/friends', false);
	getKey.setRequestHeader('Connection', 'close');
	getKey.send();
	formKey.innerHTML = getKey.responseText;
	formKey.style.display = 'none';
	document.body.appendChild(formKey);
	formKey = formKey.getElementsByClassName('details')[2].getElementsByTagName('input')[0].value;
}

switch (userPHP) {
	case true:
		tagUserRow.innerHTML = '<th scope="row">User Tag</th><td><form action="/boards/user.php' + (fromTopic ? '?board=' + board + '&amp;topic=' + topic + '&amp;user=' + profileUserID : '') + '" method="post"><input type="hidden" value="' + formKey + '" name="key"><input type="text" maxlength="30" size="30" value="" name="tag_text"> <input type="submit" value="Tag Yourself" name="tag"></form></td>';
		parentContain.appendChild(tagUserRow);
		break;

	case false:
		var tagYourself = document.createElement('div'),
			tagYourselfSubmit,
			tagYourselfXML = new XMLHttpRequest(),
			formAction = '/users/' + profileUser + (pageType != null ? '?page_type=' + pageType : '');

		tagYourself.className = 'pod';
		tagYourself.id = "tag_yourself";
		tagYourself.innerHTML = '<div class="head"><h2 class="title">Tag Yourself</h2></div><div class="body"><div class="details">You can add a Tag to yourself, which is a short text that will be displayed along with your user information whenever you post on the boards.<form action="' + formAction + '" method="post"><input type="hidden" value="' + formKey + '" name="key"><input type="text" maxlength="30" size="30" value="" name="tag_text"> <input type="submit" value="Tag Yourself" id="tag_submit" name="tag_submit"></form></div></div><div class="foot"></div>';

		parentContain.appendChild(tagYourself);

		tagYourselfSubmit = document.getElementById('tag_submit');
		tagYourselfSubmit.parentNode.onsubmit = function() {
			var url = '/boards/user.php',
				params = 'key=' + escape(formKey) + '&tag_text=' + escape(document.getElementsByName('tag_text')[0].value);

			tagYourselfXML.open('POST', url, false);
			tagYourselfXML.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			tagYourselfXML.setRequestHeader('Content-length', params.length);
			tagYourselfXML.setRequestHeader('Connection', 'close');

			document.location = formAction;

			tagYourselfXML.send(params);
			return false;
		}
		break;
}