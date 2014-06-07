// me2DAY Shortcut
// version 1.3
// 2008-09-20
// Copyright (c) 2008, Seungwon Jeong
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          me2DAY Shortcut
// @namespace     http://jeongsw.textcube.com/
// @description   Eolin-like keyboard shortcuts for me2DAY.
// @include       http://me2day.net/*
// ==/UserScript==

function $(id) {
  return document.getElementById(id);
}

// set link tooltips
(function () {
   var i;
   var link;
   var links = document.evaluate("//div[@class='post_text' or @class='desc']/p/a",
				 document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

   for (i = 0; i < links.snapshotLength; ++i) {
     link = links.snapshotItem(i);
     link.title = link.href;
   }
 })();

// set friend numbers
(function () {
   var i;
   var link;
   var links = document.evaluate(
     "//div[@class='profile_image']/div[@class='name']/a | " +
       "//div[@class='profile_image']/div[@class='friend_text']/span[@class='friend_nick']/a",
     document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   var number = 1;

   if (links.snapshotLength > 10) {
     return;
   }

   for (i = 0; i < links.snapshotLength; ++i, ++number) {
     link = links.snapshotItem(i);

     if (number === 10) {
       link.firstChild.nodeValue = '0)' + link.firstChild.nodeValue;
       link.id = String(0);
       return;
     } else {
       link.firstChild.nodeValue = String(number) + ')' + link.firstChild.nodeValue;
       link.id = String(number);
     }
   }
 })();

// blur focus
(function () {
   var login = $('user_id');
   var post = $('post_body_elem');

   if (post) {			// post
     post.blur();
   } else if (/^http:\/\/me2day.net\/account\/login/i.test(location.href)) { // login
     return;
   } else if (login) {
     login.blur();
   }
 })();

function goToUrl(url) {
  var pattern = /(#|\/)$/;

  url = url.toLowerCase().replace(pattern, '');

  if (url !== location.href.toLowerCase().replace(pattern, '')) {
    location.href = url;
  }
}

function goNext() {
  var nextLink;

  // Metoo
  nextLink = document.evaluate("//li[@id='next_list']/a",
			       document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (nextLink) {
    location.href = nextLink.href;
    return;
  }

  nextLink = document.evaluate("//li[@class='next']/a | //span[@class='next']/a",
			       document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (nextLink) {
    location.href = nextLink.href;
  }
}

function goPrev() {
  var prevLink;

  // Metoo
  prevLink = document.evaluate("//li[@id='prev_list']/a",
			       document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (prevLink) {
    location.href = prevLink.href;
    return;
  }

  prevLink = document.evaluate("//li[@class='prev']/a | //span[@class='previous']/a",
			       document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (prevLink) {
    location.href = prevLink.href;
  }
}

function goMyMetoo(newWin) {
  var i;
  var links;
  var topbar = $('topbar');

  if (topbar) {
    links = topbar.getElementsByTagName('A');

    for (i = 0; i < links.length; ++i) {
      if (/^http:\/\/me2day.net\/[\-0-9a-z_]{3,12}\/?$/i.test(links[i].href)) {
	if (newWin) {
	  open(links[i].href);
	} else {
	  goToUrl(links[i].href);
	}

	return;
      }
    }
  }
}

function goFriends() {
  var i;
  var links;
  var navigation = $('main_navigation');

  if (navigation) {
    links = navigation.getElementsByTagName('A');

    for (i = 0; i < links.length; ++i) {
      if (/^http:\/\/me2day.net\/[\-0-9a-z_]{3,12}\/friends\/all$/i.test(links[i].href)) {
	goToUrl(links[i].href);
	return;
      }
    }
  }
}

function goSettings() {
  var i;
  var links;
  var topbar = $('topbar');

  if (topbar) {
    links = topbar.getElementsByTagName('A');

    for (i = 0; i < links.length; ++i) {
      if (/^http:\/\/me2day.net\/[\-0-9a-z_]{3,12}\/settings\/basic/i.test(links[i].href)) {
	goToUrl(links[i].href);
	return;
      }
    }
  }
}

function goLogin() {
  var i;
  var links;
  var topbar = $('topbar');

  if (topbar) {
    links = topbar.getElementsByTagName('A');

    for (i = 0; i < links.length; ++i) {
      if (/^http:\/\/me2day.net\/account\/log(in|out)/i.test(links[i].href)) {
	goToUrl(links[i].href);
	return;
      }
    }
  }
}

function goById() {
  var id = prompt('me2DAY ID: ').toLowerCase().replace(/\s+/g, '');

  if (id && /^[\-0-9a-z_]{3,12}$/.test(id)) {
    goToUrl('http://me2day.net/' + id);
  }
}

function goByTag() {
  var tag = prompt('me2TAG: ').replace(/\s+/g, '');

  if (tag) {
    goToUrl('http://me2day.net/tag/' + tag);
  }
}

function goByNumber(number, newWin) {
  var link = $(String(number));
  if (link) {
    if (newWin) {
      open(link.href);
    } else {
      location.href = link.href;
    }
  }
}

function goNextTab() {
  var links;
  var nextTab;
  var selectedTab = document.evaluate("//div/ul[@id='primary']/li[contains(@class, 'selected')]",
				      document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

  if (selectedTab) {
    nextTab = selectedTab.nextSibling || selectedTab.parentNode.firstChild;
    while (nextTab.nodeType != 1) {
      nextTab = nextTab.nextSibling || nextTab.parentNode.firstChild;
    }

    links = nextTab.getElementsByTagName('A');
    if (links.length > 0) {
      location.href = links[0].href;
    }
  }
}

function goPrevTab() {
  var links;
  var prevTab;
  var selectedTab = document.evaluate("//div/ul[@id='primary']/li[contains(@class, 'selected')]",
				      document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

  if (selectedTab) {
    prevTab = selectedTab.previousSibling || selectedTab.parentNode.lastChild;
    while (prevTab.nodeType != 1) {
      prevTab = prevTab.previousSibling || prevTab.parentNode.lastChild;
    }

    links = prevTab.getElementsByTagName('A');
    if (links.length > 0) {
      location.href = links[0].href;
    }
  }
}

function help() {
  var message = 'me2DAY Shortcut 1.3\n\n' +
    '정승원 (jeongseungwon@hanmail.net)\n\n' +
    'J / K : 아래로 / 위로 스크롤\nA / S : 이전 / 다음 페이지\nQ / W : 이전 / 다음 탭\n\n' +
    'L : 로그인 혹은 로그아웃\nM : 마이미투 (Shift : 새 창)\nE : 환경설정\n\n' +
    'F : 친구들은\n1 ~ 0 : 친구 번호로 이동 (Shift : 새 창)\nG : 펼치기 혹은 감추기\n\n' +
    'H : 미투홈\nB : Best Metoo\nR : Best Reply\nO : me2topic\n' +
    'N : 미투데이 인터넷 소식\nY : 미투인들의 자기소개\nT : me2TAG\nC : 최근글\n\n' +
    'I : me2DAY ID\nEsc : 입력창 포커스 해제\nP : 도움말';

  alert(message);
}

function toggleAll() {
  if ($('open_all_anchor')) {
    location.href = 'javascript:Friend.toggle_all();';
  }
}

function shortcut(event) {
  var tagName = event.target.tagName;
  if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
    if (event.keyCode === 27) {	// Esc
      event.target.blur();
    }

    return;
  }

  if (!event.altKey && !event.ctrlKey) {
    switch (event.keyCode) {
    case 74: // J
      scrollBy(0, 100);
      break;
    case 75: // K
      scrollBy(0, -100);
      break;

    case 65: // A
      goPrev();
      break;
    case 83: // S
      goNext();
      break;

    case 81: // Q
      goPrevTab();
      break;
    case 87: // W
      goNextTab();
      break;

    case 76: // L
      goLogin();
      break;
    case 77: // M
      if (event.shiftKey) {
	goMyMetoo(true);
      } else {
	goMyMetoo(false);
      }
      break;
    case 69: // E
      goSettings();
      break;

    case 72: // H
      goToUrl('http://me2day.net');
      break;
    case 66: // B
      goToUrl('http://me2day.net/me2/best/metoo');
      break;
    case 82: // R
      goToUrl('http://me2day.net/me2/best/reply');
      break;
    case 79: // O
      goToUrl('http://me2day.net/me2/topic');
      break;
    case 78: // N
      goToUrl('http://me2day.net/front/links');
      break;
    case 89: // Y
      goToUrl('http://me2day.net/front/myself');
      break;
    case 84: // T
      goByTag();
      break;
    case 67: // C
      goToUrl('http://me2day.net/recent');
      break;

    case 70: // F
      goFriends();
      break;
    case 48: // 0
    case 49: // 1
    case 50: // 2
    case 51: // 3
    case 52: // 4
    case 53: // 5
    case 54: // 6
    case 55: // 7
    case 56: // 8
    case 57: // 9
      if (event.shiftKey) {
	goByNumber(event.keyCode - 48, true);
      } else {
	goByNumber(event.keyCode - 48, false);
      }
      break;
    case 71: // G
      toggleAll();
      break;

    case 73: // I
      goById();
      break;
    case 80: // P
      help();
      break;
    }
  }
}

document.addEventListener('keydown', shortcut, false);
