// ==UserScript==
// @name           Lepra Misc
// @namespace      http://userscripts.org/users/splurov/
// @include        http://leprosorium.ru/*
// @include        http://*.leprosorium.ru/*
// ==/UserScript==

(function(){

GM_addStyle('\
u {font-weight: bold; font-style: italic; text-decoration: none;}\
.layout_right {font-size: 120% !important;}\
.layout_right #header {font-size: 90% !important;}\
.indent_0.post:before {content: "."; float: left; width: 10px; font-size: 0; margin: 3px 0 0 -20px; border-left: 2px solid #ccc; height: 20px;}\
.vote {background: transparent !important;}\
.post .p {background: #ececff !important; padding-right: 40px;}\
.post .p.girl {background: #ffe9e9 !important;}\
.my .js-addToFavs {display: none;}\
.updateComments {position: fixed; bottom: 5px; right: 5px; font-size: 12px; padding: 2px 7px 3px; background: #fff; border: 1px solid #ddd; text-decoration: none; color: #777;}\
.nextItem {position: fixed; bottom: 50%; right: 5px; font-size: 12px; padding: 2px 7px 3px; background: #fff; border: 1px solid #ddd; text-decoration: none; color: #777;}\
');

function showUserNumber(post) {
	var link = post.querySelector('.p > a');
	link.parentNode.insertBefore(document.createTextNode(' | ' + post.getAttribute('class').match(/u(\d+)/)[1]), link.nextSibling);
}

function highlightGirl(p) {
	if (p.textContent.indexOf('Написала') != -1) {
		p.className += ' girl';
		//p.setAttribute('class', p.getAttribute('class') + ' girl');
	}
}

function highlightRating(rating) {
	if (!rating) {
		return;
	}
	var r = parseInt(rating.textContent);
	if (r > 255) {
		rating.style.color = '#00ff00';
	}
	else if (r > 0) {
		rating.style.color = '#00' + parseInt(r / 2 + 127).toString(16) + '00';
	}
	else if (r < -255) {
		rating.style.color = '#ff0000';
		r = 0;
	}
	else if (r < 0) {
		rating.style.color = '#' + parseInt(-r / 2 + 127).toString(16) + '0000';
		r = 0;
	}
	rating.style.fontSize = Math.min(16, 9 + 2 * parseInt(Math.log(r + 1))) + 'px';
}

function changeLinks(p) {
	var hideButton = p.getElementsByClassName('pro_hide_post_button')[0];
	if (hideButton) {
		hideButton.parentNode.removeChild(hideButton.previousSibling);
		hideButton.parentNode.removeChild(hideButton);
	}

	var spans = p.getElementsByTagName('span');
	if (spans[0] && spans[0].textContent.indexOf('комментари') != -1) {
		var commentsLink = spans[0].getElementsByTagName('a')[0];
		commentsLink.replaceChild(document.createTextNode(commentsLink.firstChild.textContent.replace(/ комментари(?:й|я|ев)/, '')), commentsLink.firstChild);
	}

	var sublepraLink = p.getElementsByTagName('a')[1];
	if (sublepraLink && sublepraLink.textContent.indexOf('.leprosorium.ru') != -1) {
		sublepraLink.replaceChild(document.createTextNode(sublepraLink.textContent.replace(/\.leprosorium\.ru/, '')), sublepraLink.firstChild);
	}
}

function loopPosts(posts) {
	for (
		var postsLength = posts.length,
				i = 0;
		i < postsLength;
		i++
	) {
		var postClass = posts[i].getAttribute('class');
		if (postClass.indexOf('u') != -1) {
			showUserNumber(posts[i]);
		}
		var p = posts[i].getElementsByClassName('p')[0];
		highlightGirl(p);
		highlightRating(posts[i].querySelector('.rating'));
		changeLinks(p);
		posts[i].setAttribute('class', postClass + ' done');
	}
}

// Main Pages and Comments Pages
//loopPosts(document.getElementsByClassName('post'));

document.addEventListener("DOMNodeInserted", function(e){
	if (!e.relatedNode.lastChild) {
		return true;
	}
	loopPosts(e.relatedNode.querySelectorAll('.post:not(.done)'));
}, false);

var w = unsafeWindow;

// Different Colors for Highlighted Comments
w.allUserPosts = function(className) {
	if (w.matchClass(w.$('content'), className)) {
		w.removeClass(w.$('content'), className);
		return false;
	}
	var userHexId = parseInt(className.replace(/u/, ''));
	userHexId = (userHexId * (userHexId > 40000 ? 40 : 400)).toString(16);
	var j = 6 - userHexId.length;
	if (j > 0) {
		for (var i = 0; i < j; i++) {
			userHexId = '0' + userHexId;
		}
	}
	userHexId = '#' + userHexId;
	var css = ''
	css += '.' + className + ' .' + className + ' .dt {border:1px solid ' + userHexId + '; border-width: 1px 1px 0; padding: 5px 5px .5em;}';
	css += '.' + className + ' .' + className + ' .dd .p {border:1px solid ' + userHexId + '; border-width: 0 1px 1px; padding: 0 5px 5px;}';
	css += '.' + className + ' .shrinked' + ' .dd .p {border-width: 1px;}';
	w.addStyleProperties(css);
	w.addClass(w.$('content'), className);
	return false;
}


if (document.body.getAttribute('class') == 'comments') {
	// Show User Number - Comments Page Post
	var commentsPost = document.querySelector('.post.ord .dd');
	var link = commentsPost.querySelectorAll('.p a')[1];
	var userNumber = commentsPost.innerHTML.match(/u(\d+)/)[1];
	link.parentNode.insertBefore(document.createTextNode(' | ' + userNumber), link.nextSibling);

	// Highlight Current User
	w.allUserPosts('u' + userNumber);
}

// Show User Number - Profile
if (document.body.getAttribute('class') == 'users') {
	var userProfile = document.querySelector('.vote[uid]');
	if (userProfile) {
		document.querySelector('.username a').appendChild(document.createTextNode(' | ' + userProfile.getAttribute('uid')));
	}
}

// Update Comments Link
if (document.body.getAttribute('class') == 'comments' || document.getElementById('inbox_posts')) {
	var postId = document.querySelector('.post.ord').getAttribute('id').replace(/p/, '');
	var a = document.createElement('a');
	a.setAttribute('href', '#');
	a.setAttribute('class', 'updateComments');
	a.appendChild(document.createTextNode('обновить комментарии'));
	a.addEventListener('click', function(e){
		w.commentsHandler.refreshAll(postId, {button: this});
		e.preventDefault();
	}, false);
	document.body.appendChild(a);
}

// Next Item Button
if (w.animatePosts) {
	var a = document.createElement('a');
	a.setAttribute('href', '#');
	a.setAttribute('class', 'nextItem');
	a.appendChild(document.createTextNode('↓'));
	a.addEventListener('click', function(e){
		w.animatePosts.posts = w.animatePosts.getPostsPositions();
		var nearestPost,
				myPosition = w.document.getScroll().y + w.document.getSize().y;
		for (var i = 0; i < w.animatePosts.posts.length; i++) {
			if (myPosition < w.animatePosts.posts[i].pos) {
				nearestPost = w.animatePosts.posts[i];
				break;
			}
			else if (myPosition == w.animatePosts.posts[i].pos) {
				nearestPost = (i == w.animatePosts.posts.length - 1) ? false : w.animatePosts.posts[i+1];
				break;
			}
		}
		if (nearestPost) {
			w.animatePosts.animation.start(w.$(w).getScroll().x, w.$(nearestPost).getPosition().y);
		}
		e.preventDefault();
	}, false);
	document.body.appendChild(a);
}

// More Posts Autoloader
var lmpObj = document.getElementsByClassName('load_more_posts')[0];
if (lmpObj) {
	window.addEventListener('scroll', function(){
		var lmpObjY = 0,
				lmpObjTemp = lmpObj;
		do {
			lmpObjY += lmpObjTemp.offsetTop;
		} while(lmpObjTemp = lmpObjTemp.offsetParent);
		if (lmpObj.className.indexOf('js-loading') == -1 && window.pageYOffset + document.body.clientHeight + 500 > lmpObjY) {
			w.morePostsHandler.load(lmpObj);
		}
	}, false);
}

// Usable Window Title
var t = ['Лепрозорий'];
if (window.location.hostname.indexOf('.leprosorium') != -1 && window.location.hostname.indexOf('www.leprosorium') == -1) {
	t.push(document.title);

	// remove custom sub-lepra style
	if (document.body.getAttribute('id') != 'sublepro_aceess_denied') {
		var style = document.getElementsByTagName('style')[0];
		style.parentNode.removeChild(style);
	}
}
var url = window.location.pathname.match(/^\/(?:([^\/]+)\/)?(?:([^\/]+)\/?)?(?:([^\/]+)\/?)?.*$/);
switch (url[1]) {
	case 'comments':
		var text = document.querySelector('.post .dt').textContent.replace(/(.{0,30})(?:\.|([?!)])).+$/, '$1$2');
		if (text != '') {
			t.push(text);
		}
		else {
			t.push('#' + url[2]);
		}
	break;
	case 'my':
		switch (url[2]) {
			case 'invite':
				t.push('Приглашения');
			break;
			case 'details':
				t.push('Личная информация и настройки');
			break;
			case 'socialism':
				t.push('Личная информация и настройки');
			break;
			case 'favourites':
				t.push('Избранное');
			break;
			case 'inbox':
				t.push('Инбокс');
				if (url[3] == 'write') {
					t.push('Написать');
				}
				else if (url[3] != undefined) {
					var text = document.querySelector('.post .dt').textContent.replace(/(.{0,30})(?:\.|([?!)])).+$/, '$1$2');
					if (text != '') {
						t.push(text);
					}
					else {
						t.push('#' + url[3]);
					}
				}
			break;
			case undefined:
				var count = document.getElementById('things').firstChild.textContent.replace(/[^\d\/]+/g, '');
				t.push('Мои вещи' + (count ? ' (' + count  + ')' : ''));
			break;
		}
	break;
	case 'asylum':
		t.push('Новый пост');
	break;
	case 'fraud':
		t.push('Магазин');
	break;
	case 'elections':
		t.push('Выборы');
	break;
	case 'democracy':
		t.push('Белый дом');
	break;
	case 'underground':
		t.push('Блоги Имерии');
	break;
	case 'users':
		t.push('Пользователи');
		if (url[2]) {
			t.push(url[2]);
			if (url[3]) {
				switch (url[3]) {
					case 'posts':
						t.push('Посты');
					break;
					case 'comments':
						t.push('Комментарии');
					break;
					case 'favs':
						t.push('Избранное');
					break;
				}
			}
		}
	break;
	case 'archive':
		t.push('Архив');
		if (url[2]) {
			t.push(document.getElementsByClassName('date')[0].textContent);
		}
	break;
}
document.title = t.reverse().join(' / ');

})();