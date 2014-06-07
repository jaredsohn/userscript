// Janeth
// User script to scrobble online track plays at vkontakte.ru (vk.com).
// Compatible with Opera, Firefox. 
// Tested with Opera 9.5, Opera 10, Firefox3 (GM 0.8)
//
// beta 7 (2010-09-27)
//
// More info at http://nichtverstehen.de/vkontakte-scrobbler
//
// Original Author: Cyril Nikolaev <cyril7@gmail.com>
// Licensed under GNU LGPL (http://www.gnu.org/copyleft/lesser.html)
//
// ==UserScript==
// @name          Janeth vkontakte-scrobbler
// @namespace     http://nichtverstehen.de/vkontakte-scrobbler
// @version       0.7
// @description   scrobble vkontakte audiotrack plays
//
// @copyright 2010, Cyril Nikolaev (http://nichtverstehen.de)
// @licence LGPL
//
// @include http://vkontakte.ru/*
// @include http://vk.com/*
//
// @include http://vkontakte.ru/images/qmark.gif
// @include http://vk.com/images/qmark.gif
// @include http://ext.last.fm/1.0/*
// @include http://post.audioscrobbler.com/*
// @include http://post2.audioscrobbler.com/*
// @include http://ws.audioscrobbler.com/*
// ==/UserScript==


(function() { /*  begin private namespace */

var JANETH_VERSION = "Janeth бета 7 (2010-09-27)\n\n"+
	"Юзер-скрипт для скробблинга прослушанных аудизаписей на vkontakte.ru.\n\n"+
	"Документация есть на сайте http://nichtverstehen.de/vkontakte-scrobbler/\n"+
	"Автор — Кирилл Николаев <cyril7@gmail.com>";

var log_ = function(s) {
	if (window.opera)
		window.opera.postError(s);
	else if (console && console.log)
		console.log(s);
}

var S = { fm: null };

var fixStyles = function () {
	var styleId = 'scrobblerStyleFix';
	var styleBody = '.audioTitle { width: 300px !important; } \n#pagesTop .pageList { padding-left: 10px; }';
	
	var style = document.getElementById(styleId);
	if (style) return;
	
	style = document.createElement('style');
	style.type = 'text/css';
	style.id = styleId;
	style.appendChild(document.createTextNode(styleBody));
	document.body.appendChild(style);
}

var ScrobblerIcon = function(fm) {
	fixStyles();
	
	this.scrobblerDiv = document.createElement('div');
	this.scrobblerDiv.setAttribute('style', 'display: block; background-position: center center; background-repeat: no-repeat; width: 17px; height: 16px; border: 1px solid #aaa;');
	this.scrobblerDiv.setAttribute('title', 'Вход не выполнен. Включите музыку, и начнется подключение.');
	this.scrobblerDiv.className = 'vkontakte_scrobbler_inactive';
	this.scrobblerDiv.style.backgroundColor = '#bbb';
	this.scrobblerDiv.style.backgroundImage = 'url("'+this.lfmIcon+'")';
	this.scrobblerDiv.style.borderColor = '#aaa';
	
	this.link = document.createElement('a');
	this.link.setAttribute('target', '_blank');
	this.link.setAttribute('style', 'display: none; line-height: 18px; margin-right: 8px;');
	
	var clickHandler = function(e) {
		if (e.target.className == 'vkontakte_scrobbler_inactive') {
			alert(JANETH_VERSION);
		}
		else if (e.target.className == 'vkontakte_scrobbler_error' || e.target.className == 'vkontakte_scrobbler_anonymous') {
			S.fm.login();
		} 
		else if (e.target.className == 'vkontakte_scrobbler_ready' ) {
			S.fm.disable();
		} 
		else if (e.target.className == 'vkontakte_scrobbler_disabled' ) {
			S.fm.enable();
		}
	};
	this.scrobblerDiv.addEventListener('click', clickHandler, false);
	
	if (location.pathname.indexOf('/audio.php') == 0 || location.pathname.indexOf('/gsearch.php') == 0) {
		if (this.scrobblerDiv.style.styleFloat == undefined) {
			this.scrobblerDiv.style.cssFloat = 'right';
			this.link.style.cssFloat = 'right';
		} else {
			this.scrobblerDiv.style.styleFloat = 'right';
			this.link.style.styleFloat = 'right';
		}
	}
	if (location.pathname.indexOf('/audio.php') == 0) {
		document.getElementById('bigSummary').appendChild(this.scrobblerDiv);
		document.getElementById('bigSummary').appendChild(this.link);
	} else if (location.pathname.indexOf('/gsearch.php') == 0) {
		document.getElementById('searchSummary').parentNode.appendChild(this.scrobblerDiv);
		document.getElementById('searchSummary').parentNode.appendChild(this.link);
	} else {
		this.scrobblerDiv.style.display = 'inline-block';
		if (this.scrobblerDiv.style.styleFloat == undefined) this.scrobblerDiv.style.cssFloat = 'left';
		else this.scrobblerDiv.style.styleFloat = 'left';
		
		this.link.style.marginRight = '';
		this.scrobblerDiv.style.marginRight = '5px';
		var sideBar = document.getElementById('sideBar');
		var banner1 = document.getElementById('banner1');
		if (banner1) {
			sideBar.insertBefore(this.scrobblerDiv, banner1);
			var s = document.createElement('span');
			s.appendChild(document.createTextNode(' '));
			sideBar.insertBefore(s, banner1);
			sideBar.insertBefore(this.link, banner1);
		} else {
			sideBar.appendChild(this.scrobblerDiv);
			sideBar.appendChild(this.link);
		}
	}
	
	fm.addObserver(this);
}
ScrobblerIcon.prototype = {
	lfmIcon: "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0D%00%00%00%08%08%06%00%00%00%22%26u%CF%00%00%00%04sBIT%08%08%08%08%7C%08d%88%00%00%00%09pHYs%00%00%0D%D7%00%00%0D%D7%01B(%9Bx%00%00%00%19tEXtSoftware%00www.inkscape.org%9B%EE%3C%1A%00%00%00%CEIDAT%18%95m%CF%3F(%C4q%18%06%F0%E7'%E9dP%EA%8A%95%B2%5EF%A3dp%1B%B2%D8%0CJ)%BBl%06%83%C5%84%98%D9%D4%C9%A0%CC%16%251%DEr%C9-%B21%1B%3E%06%DF%AB%EB%F2Lo%EF%F3%A7%E7I%92%60%1AW%E8%A2%83c%8C%16n%02%E7%F8%C0%3EjC%98I%F2%9C%E4%2B%C9z%92%CD%24sIZ%F9%C3v%92F%92%AD%24%B3I~%82%03%5C%A6%0F%18%2F%C9%AB%B8%C0%1D%86%FB%05ohf%00%D8(%DC%14%1E%F1%84%15TA%1B%CB%FF%98%AA%C2%AD%A1%86%5D%BC%E3%248%C2%E9%80a%04%93%D8%C1%03%AA%F2_D7h%E0%1B%7B%E5%5E(U%CE0%86%D7%B2k%097%B8%ED%25%CF%E3%1E%9F%A5%D2ao8%EA%25%E4%05%D7%A8%FF%02%85%7C%FB%15%5BI%1C5%00%00%00%00IEND%AEB%60%82",
	loadIcon: "data:image/gif,GIF89a%0A%00%0A%00%91%03%00%CC%CC%CC%FFff%FF%00%00%FF%FF%FF!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%0A%00%0A%00%00%02%17%9C'r%06%80%1A%02s'%AE%3Bqk%9A%E2%C3%81%14Gz%D9Q%00%00!%F9%04%05%00%00%03%00%2C%01%00%00%00%08%00%03%00%00%02%0A%9C%136%22%83%03%00S%10%14%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%06%00%06%00%00%02%0C%9C%070%11%A8%7C%A2%11%22%D2X%00%00!%F9%04%05%00%00%03%00%2C%00%00%01%00%03%00%08%00%00%02%0A%1C%608%13%C1%BE%96%10c%16%00!%F9%04%05%00%00%03%00%2C%00%00%04%00%06%00%06%00%00%02%0A%04%86c%C9%1C%E1%A0%10l%16%00!%F9%04%05%00%00%03%00%2C%01%00%07%00%08%00%03%00%00%02%0A%04%86%23b%13%A1Dz%A9%00%00!%F9%04%05%00%00%03%00%2C%04%00%04%00%06%00%06%00%00%02%0C%9C'r%A8%BB%11%06%00%03Jz%0A%00!%F9%04%09%00%00%03%00%2C%07%00%01%00%03%00%08%00%00%02%0A%94f%A3%1A1%BD%00%18r%14%00%3B",
	xIcon: "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%08%00%00%00%08%08%06%00%00%00%C4%0F%BE%8B%00%00%00%04sBIT%08%08%08%08%7C%08d%88%00%00%00%09pHYs%00%00%0D%D7%00%00%0D%D7%01B(%9Bx%00%00%00%19tEXtSoftware%00www.inkscape.org%9B%EE%3C%1A%00%00%00qIDAT%18%95%5D%8EA%0A%C2%40%10%04%8B%90%F8%B7%40n%92%D7%18%3C%04%FC%8A%90C%C0%A0%7F1%DF%F0%AABy%D8M%1C%B6a%60%98%EE.%06%B5SG%95b%06%B5E%BD%9At%09%E69%DF%26%D4Z%9DC%E8%94%F7%9B%DAl%8D%18%DAM%95%8A%A4%2F%F0%E4%AF%15%F8%00l%8414%EF%F1%A7%D2l%D4C%0CU%19%BF%00%7D%C6%BE%81%23%F0%00%5E%3F%EF%97%AF%90%04%8D%25%A8%00%00%00%00IEND%AEB%60%82",
	anonIcon: "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%06%00%00%00%08%08%06%00%00%00%DA%C6%8E8%00%00%00%04sBIT%08%08%08%08%7C%08d%88%00%00%00%09pHYs%00%00%0D%D7%00%00%0D%D7%01B(%9Bx%00%00%00%19tEXtSoftware%00www.inkscape.org%9B%EE%3C%1A%00%00%00kIDAT%08%99M%CC%A1%0D%C2P%00E%D1%D7%04%85%24a%26%12%C2%02%20%11%2C%C0%0A%0D%06%87a%0C%12Tuw%00%16%20%5D%A0%9E%83%F9%D0%7F%93'%EE%15%2FX%A0%C5%0BO%9C%B0%0C.%18%B1%C5%06%03%AE%C1%0Ek%A4%EC%8Ew%AA%10%9C%F1%C1%A1%8E%C7%12%F7H%83%14%BA%24M%92U%92%CC2qK2%FF%5Bu%D5%E3%F1%F3%2Fr%CA~h%99%EC%B9%E7%00%00%00%00IEND%AEB%60%82",
	
	scrobblerAnonymous: function() {
		this.showLink(true, 'залогиньтесь', 'http://www.last.fm/login');
		this.scrobblerDiv.className = 'vkontakte_scrobbler_anonymous';
		this.scrobblerDiv.setAttribute('title', 'Вы не вошли на Last.fm. \nЗалогиньтесь, а затем кликните здесь, чтоб повторить подключение.');
		this.scrobblerDiv.style.backgroundColor = '#f4f77c';
		this.scrobblerDiv.style.backgroundImage = 'url("'+this.anonIcon+'")';
		this.scrobblerDiv.style.borderColor = '#f7df6d';
	},
	scrobblerLoginError: function(t, text) {
		if (!text) text = '';
		this.showLink(false);
		this.scrobblerDiv.className = 'vkontakte_scrobbler_error';
		this.scrobblerDiv.setAttribute('title', 'Ошибка '+text+'. \n Кликните, чтоб попробовать подключиться снова.');
		this.scrobblerDiv.style.backgroundImage = 'url("'+this.xIcon+'")';
		this.scrobblerDiv.style.backgroundColor = '#faa';
		this.scrobblerDiv.style.borderColor = '#f88';
	},
	scrobblerLogging: function() {
		this.showLink(false);
		this.scrobblerDiv.className = 'vkontakte_scrobbler_logging';
		this.scrobblerDiv.setAttribute('title', 'Подключение...');
		this.scrobblerDiv.style.backgroundColor = '#bbb';
		this.scrobblerDiv.style.borderColor = '#aaa';
		this.scrobblerDiv.style.backgroundImage = 'url("'+this.loadIcon+'")';
	},
	scrobblerReady: function(t, username) {
		this.showLink(true, S.fm.username, 'http://www.last.fm/user/'+S.fm.username);
		this.scrobblerDiv.className = 'vkontakte_scrobbler_ready';
		this.scrobblerDiv.setAttribute('title', 'Скробблер готов. Кликните, и отключится.');
		this.scrobblerDiv.style.backgroundImage = 'url("'+this.lfmIcon+'")';
		this.scrobblerDiv.style.backgroundColor = '#517EA6';
		this.scrobblerDiv.style.borderColor = '#205B7F';
	},
	
	scrobblerDisabled: function(t, username) {
		this.showLink(true, S.fm.username, 'http://www.last.fm/user/'+S.fm.username);
		this.scrobblerDiv.className = 'vkontakte_scrobbler_disabled';
		this.scrobblerDiv.setAttribute('title', 'Скробблер выключен. Кликните, и включится');
		this.scrobblerDiv.style.backgroundImage = 'url("'+this.lfmIcon+'")';
		this.scrobblerDiv.style.backgroundColor = '#bbb';
		this.scrobblerDiv.style.borderColor = '#aaa';
	},
	
	showLink: function(show, text, href) {
		if (!show) {
			this.link.style.display = 'none';
		} else {
			this.link.style.display = 'inline';
			this.link.innerHTML = text;
			this.link.href = href;
		}
	}
}

var AdvancedControl = function(track, track_id) {
	this.track = track;
	this.track_id = track_id;
	this.active = false;
}
AdvancedControl.prototype = {
	scrobbleIcon: "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0A%00%00%00%0A%08%06%00%00%00%8D2%CF%BD%00%00%00%09pHYs%00%00%0D%D6%00%00%0D%D6%01%90oy%9C%00%00%00%18tEXtSoftware%00Paint.NET%20v3.36%A9%E7%E2%25%00%00%00%B0IDAT%18%D3c%60%80%82%BE%BE%3E%CE%993g%16%02%F1%C6%193f%EC%9D5k%D6B%20%ED%CA%80%0E%80%0A%B6%00%F1_%A0%82%AD%40z%26P%D1q%20U%86%A2h%CA%94)%C2%40%C1%FF%40%BC%89%01%1F%00*%60%05%E2%D7%40%FC%03%88%DD%F0*%06Z%99%0FT%F4%07%88%7F%02%F1%02%20%96%C4%A9x%FA%F4%E9f%40%05G%A1%CEx%0F%D4%1C%86%D7t%A0G%BC%80%0A%DF%01%F1%F3U%ABV1%13r%F7%3C%90%C9%40S%D5%90%AD4%04%9A%B2%04%88%3D%E6%CC%99%A3%02%B2%12d5%10%3FD1%11%A8%40%15(x%1A%EA%EB%FFP%7C%06%A8A%1B%A6%06%00%89%FCy)s%ED%BEN%00%00%00%00IEND%AEB%60%82",
	cancelIcon: "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0A%00%00%00%0A%08%06%00%00%00%8D2%CF%BD%00%00%00%09pHYs%00%00%0D%D6%00%00%0D%D6%01%90oy%9C%00%00%00%18tEXtSoftware%00Paint.NET%20v3.36%A9%E7%E2%25%00%00%00%AFIDAT%18%D3%8D%901%0A%C4%20%10E%BDZ%F6Z%DB%EC1%8C%16%A9%12%90T%16%A9%3C%80x%86%D4%81Tv%82Ep%D6%2F*I%B5%FBap%1C%9F%FEq%18%AB%1A%C7q%C8%B1%09!N%04r%D4%D8%5D%B9%F0%CE%912%90%D6u%25%04r%D4pv%7F))%A5%C8%7BOP%08%81%B0%CFu%AA%F0%C0%AA%5Dj%10%D6y%9E%0B%B4%2CK%7Byc%E8%07V%D0q%1C4MS%81%B4%D6%14clm%9C%1D%DC%F7%9D%A4%94%052%C6%D0u%5D%E5r%07%9Bu%ED%87%AC%B5%D4%846%BA5%E7%FC%D5%20%E7%DC%03%AA%1FJ%7DL9%F9%FC%1C%CF%BF%03%FF%02%A5%26%02%96%F0%B9%ED%F3%00%00%00%00IEND%AEB%60%82",
	
	show: function() {
		
		var d = document.getElementById('lastfm_edit'+this.track_id);
		if (!d) {
			var d = document.createElement('div');
			d.setAttribute('style',' position: absolute; background: #ff6; padding: .2em .2em .2em .2em; margin: -.2em 0 0;');
			d.id = 'lastfm_edit'+this.track_id;
		}
		this.edit = d;
		var p = document.getElementById('performer'+this.track_id).parentNode.parentNode;
		p.appendChild(d);
		
		d.innerHTML = '<input type="text" style="font-size: 1em; padding: 0 0; width: 100px;" id="lastfm_editArtist'+
			this.track_id+'" value="'+this.track.artist+'"/> - '+
			'<input type="text" style="font-size: 1em; padding: 0 0; width: 100px;" id="lastfm_editTitle'+
			this.track_id+'" value="'+this.track.title+'"/> '+
			'<img src="'+this.cancelIcon+'" id="lastfm_cancelBtn'+this.track_id+'" title="не скробблить"'+
			' style="width: 10px; height: 10px; cursor: hand;"/> '+
			'<img src="'+this.scrobbleIcon+'" id="lastfm_scrobbleBtn'+this.track_id+'" title="заскробблить сейчас" '+
			'style="width: 10px; height: 10px; cursor: hand;"/> '
			
		var t_ = this;
		document.getElementById('lastfm_cancelBtn'+this.track_id).addEventListener('click',
			function(ev) {
				ev.stopPropagation();
				t_.close(true);
				t_.track.cancel();
			}, false);
		document.getElementById('lastfm_scrobbleBtn'+this.track_id).addEventListener('click',
			function(ev) {
				ev.stopPropagation();
				t_.close(true);
				t_.track.scrobble();
			}, false);

		this.kp = function(ev) {
			if (ev.currentTarget == t_.edit) {
				ev.stopPropagation();
				return;
			}
			t_.close(true);
			ev.stopPropagation();
			ev.currentTarget.removeEventListener('click', arguments.callee, false);
		}
		document.addEventListener('click', this.kp, false);
		d.addEventListener('click', this.kp, false);

		document.getElementById('lastfm_editArtist'+this.track_id).focus();
		
		this.track.addObserver(this);
		
		this.active = true;
	},
	
	stop: function() {
		this.close(false);
	},
	
	close: function(save) {
		this.active = false;
		
		if (save) {
			var a = document.getElementById('lastfm_editArtist'+this.track_id);
			var t = document.getElementById('lastfm_editTitle'+this.track_id);
			this.track.artist = a.value;
			this.track.title = t.value;
		}
		
		if (this.edit) {
			this.edit.parentNode.removeChild(this.edit);
			this.edit = null;
		}
		if (this.kp) {
			document.removeEventListener('click', this.kp, false);
			this.kp = null;
		}
	}
}

var PlayingIcon = function(track, track_id) {
	this.track = track;
	this.track_id = track_id;
	
	fixStyles();
	this.track.addObserver(this);
}
PlayingIcon.prototype = {
	playingIcon: "data:image/gif,GIF89a%0C%00%0C%00%B3%00%00%FF%FF%FF%D6%D6%D6%CE%CE%CE%BD%BD%BD%B5%B5%B5%AD%AD%AD%A5%A5%A5%9C%9C%9C%94%94%94%8C%8C%8C%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%04%05%00%FF%00%2C%00%00%00%00%0C%00%0C%00%00%049%10%04B%2B%0D%40%94%5D(7%82!r%9B(%1E%E8a%00%40%8A%220r%B01%9C%20t%0E%24%7C%C2%FA%BB_%EFG%DC%0D%83H%1E%A2%C7%EC!%06%CD%E6%000X6%9F%80%08%00!%F9%04%04%05%00%FF%00%2C%00%00%00%00%0C%00%0C%00%00%048%10%04B%2B%0D%40%94%5D(7%82!r%9B(%1E%E8a%A6(%82%00%C0%01%BBt%F2%02w%9D%ECp%D2%F7%3B%1F%40H%0C%FE%86%40Dp%19D%0C%98%CC%01%60%A0d%3A%01%11%00!%F9%04%04%05%00%FF%00%2C%00%00%00%00%0C%00%0C%00%00%047%10%04B%2B%0D%40%94%5D(7%82!r%9B(%1E%E8a%00%40%8A%220r%B01%9C%D4%B4%9D%ECl%D2%EF%40%1F%40H%04%F6%8E%C3%5Bpy%1B0%83%03%C0%00%C1DD%23%00!%F9%04%04%05%00%FF%00%2C%00%00%00%00%0C%00%0C%00%00%048%10%04B%2B%0D%40%94%5D(7%82!n%00P%88%E2%A1%1EF%B9%AAH%8C%1C%A5%1C'v%5D%26%7C%9F%EC%BB%1E%10%F0%23%0A%89C%1E%C2%C7%C4%0D%9A%BE%01%60%B0d%22%A4%11%00!%F9%04%04%05%00%FF%00%2C%00%00%00%00%0C%00%0C%00%00%048%10%04B%2B%0D%40%94%5D(7%82!r%9B(%1E%E8a%00%40%8A%220r%B01%9C%D4%B4%9D%ECl%D2%F7%3B%1F%40H%0C%FE%86%40Dp%19D%0C%98%CC%01%60%A0d%3A%01%11%00!%F9%04%04%05%00%FF%00%2C%00%00%00%00%0C%00%0C%00%00%048%10%04B%2B%0D%40%94%5D(7%82!r%9B(%1E%E8a%A6(%E2%22%07%00%BCn%82%C8%F7%5C'%BC%9C%F8%BC%E0%0F0%2C%06%7DH%A2M%C8%B4%0D%9A%C2%01%60%80h%22%A4%11%00!%F9%04%04%05%00%FF%00%2C%00%00%00%00%0C%00%0C%00%00%047%10%04B%2B%0D%40%94%5D(7%82!r%9B(%1E%E8a%A6(%82%00%40%EA%CE%C9%0B%D8t%A2%C3%09%CF%EB%3D%40p%08%F4%09%7F%08%A0%12%88%18%2C%97%03%C0%20%B9l%02%22%00!%F9%04%04%05%00%FF%00%2C%00%00%00%00%0C%00%0C%00%00%046%10%04B%2B%0D%40%94%5D(7%82!r%9B(%1E%07%00%98h%8B%20%AA%AB%BE%09%0C%BC%AF%9A%EC%89%EE%03%BC%1E%F0%17%24%EAj%C1dm%A0%0C%0E%00%03%84%12%F1%8C%00%00!%F9%04%04%05%00%FF%00%2C%00%00%00%00%0C%00%0C%00%00%047%10%04B%2B%0D%40%94%5D(7%82!r%9B(%1E%E8a%A6(%82%00%40%EA%CE%C9%0B%CCt%A2%C3%09%CF%EB%3D%40p%08%F4%09%7F%08%A0%12%88%18%2C%97%03%C0%20%B9l%02%22%00!%F9%04%04%05%00%FF%00%2C%00%00%00%00%0C%00%0C%00%00%047%10%04B%2B%0D%40%94%5D(7%82!r%9B(%1E%E8a%A6(%82%00%40%EA%CE%C9%0B%D8v%A2'0%0F%F8%3B%60%AF%B7%1B%FE%88%88%A0%B26X%06%07%80AR%89%80F%00%00!%F9%04%04%05%00%FF%00%2C%00%00%00%00%0C%00%0C%00%00%047%10%04B%2B%0D%40%94%5D(7%82!r%9B(%1E%E8a%A6(%E2%22%07%00%BCnB%CBo%A2'2%0F%F8%3B%60%AF%B7%1B%FE%88%88%A0%D26X%06%07%80AR%89%80F%00%00%3B",
	pauseIcon: "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0C%00%00%00%0C%08%06%00%00%00Vu%5C%E7%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%09pHYs%00%00%0E%C3%00%00%0E%C3%01%C7o%A8d%00%00%00%18tEXtSoftware%00Paint.NET%20v3.36%A9%E7%E2%25%00%00%00zIDAT(S%BD%8F1%0E%C0%20%0C%03%FD%7F12%B2222%F2%05F%BE%93%F6*EJ%3B%D0N%B5d%C5Il%11d'%D6Z%D6%7B%DF%12%0F%D0%9C%D3Zk7z8%CEk%AD%86W%08%E73H%1F%F7h%95R%2C%92%A1%E3%B9%A3W%CE%D9%604%B9%F6%5D%ACJ)%DD%021%1C5%3Ex%05%A0c%A7%7F%0Ap%A7%9F%F5V%F1j%8C%F19%80W%7C%16%B1%7B%89%1D%1Ep%00A%F8%BEk%CDQ%3B%5D%00%00%00%00IEND%AEB%60%82",
	scrobbleFailIcon: "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%08%00%00%00%08%08%06%00%00%00%C4%0F%BE%8B%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%09pHYs%00%00%0E%C3%00%00%0E%C3%01%C7o%A8d%00%00%00%18tEXtSoftware%00Paint.NET%20v3.36%A9%E7%E2%25%00%00%00TIDAT(Sc%60%00%82%9E%9E%9E%18%206%06%B1a%00%24%06f%03%19~%40%FC%1F%88o%C1%14%01%E99P%B1n%98%A2%C3H%8A%D6%A1k%40W%84b%1A%B2%9D0c1%15%20%D9%09r%07%B2u%C60%1F%A0%3B%12%A6h%1D%CC%FEn%2C%DE%9C%03%92%04%00%F2qe%DD%9C%92%3C%AF%00%00%00%00IEND%AEB%60%82",
	scrobbleOkIcon: "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%08%00%00%00%08%08%06%00%00%00%C4%0F%BE%8B%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%09pHYs%00%00%0E%C3%00%00%0E%C3%01%C7o%A8d%00%00%00%18tEXtSoftware%00Paint.NET%20v3.36%A9%E7%E2%25%00%00%00HIDAT(Sc%60%C0%03zzzxpJ%03%25c%80%B8%8A%01%9B*%A8%E4%7F%98%82*%90%00%CC(%24I%14%05%20%0E%C8H%10%06%B1A%F80X%13%C8%18%24ATI%24c%0Fc%E8Dw%3E%C8H%B8%B1H%92%00jVJ%23%BDZ%E5%24%00%00%00%00IEND%AEB%60%82",
	
	start: function() {
		if (this.track.noScrobble) return;
		var t_ = this;
		
		this.playingDiv = document.createElement('div');
		this.playingDiv.setAttribute('style', 'float: right; width: 12px; height: 12px; margin: 3px 7px 0px 2px; background-position: center center; background-repeat: no-repeat;');
		this.playingDiv.addEventListener('click', function(ev) {
			ev.stopPropagation();
			t_.toggleAdvanced();
		}, false);
		
		var d = document.getElementById('performer'+this.track_id);
		if (!d) return;
		d = d.parentNode.parentNode;
		d.appendChild(this.playingDiv);
	},
	toggleAdvanced: function() {
		if (!('adv' in this) || this.adv == null) {
			this.adv = new AdvancedControl(this.track, this.track_id);
		} 
		if (this.adv.active) {
			this.adv.close(true);
		} else {
			this.adv.show();
		}
	},
	updateTime: function() {
		var now = Math.floor((new Date()).getTime() / 1000);
		var delta = this.track.playing>0 ? now-this.track.playingSince : 0;
		var left = this.track.scrobbleTime - (this.track.playTime + delta);
		var secs = String(Math.floor(left%60/10))+left%10;
		var leftStr = Math.floor(left/60) + ':' + secs;
		
		if (this.track.noScrobble)
			this.removePlayingDiv();
			
		var pD = this.playingDiv;
		if (!pD) return;
		if (this.track.playing) {
			pD.style.backgroundImage = 'url("'+this.playingIcon+'")';
			pD.setAttribute('title', 'До отправки ' + leftStr);
		} else {
			pD.style.backgroundImage = 'url("'+this.pauseIcon+'")';
			pD.setAttribute('title', 'Пауза. До отправки ' + leftStr);
		}
	},
	
	removePlayingDiv: function() {
		if (!this.playingDiv) return;
		var p = this.playingDiv.parentNode;
		if (p) {
			p.removeChild(this.playingDiv);
			this.playingDiv = null;
		}
	},
	
	createScrobbleStatus: function() {
		var d = document.getElementById('performer'+this.track_id);
		d = d.parentNode.parentNode;
		
		var sD = document.getElementById('scrobbleStatus'+this.track_id);
		if (!sD) {
			sD = d.appendChild(document.createElement('div'));
			sD.setAttribute('id', 'scrobbleStatus'+this.track_id);
			sD.setAttribute('style', 'float: right; width: 12px; height: 12px; '+
				'margin: 5px 7px 0px 1px; background-position: center center; '+
				'background-repeat: no-repeat;');
		}
		return sD;
	},
	
	play: function() {
		this.updateTime();
	},
	
	pause: function() {
		this.updateTime();
	},
	
	stop: function() {
		if (this.playingDiv) {
			this.removePlayingDiv();
		}
	},
	
	cancel: function() {
		var e = this.createScrobbleStatus();
		if (!e) return;
		
		this.updateTime();
		e.style.backgroundImage = 'url("'+this.scrobbleFailIcon+'")';
		e.style.cursor = '';
		e.setAttribute('title', 'Отменено.');
	},
	
	scrobble: function() {
		this.updateTime();
	},
	
	successScrobble: function() {
		var e = this.createScrobbleStatus();
		if (!e) return;
		
		e.style.backgroundImage = 'url("'+this.scrobbleOkIcon+'")';
		e.style.cursor = '';
		e.setAttribute('title', 'Трек отправлен');
	},
	
	failScrobble: function(self, text) {
		var e = this.createScrobbleStatus();
		if (!e) return;
		
		e.style.backgroundImage = 'url("'+this.scrobbleFailIcon+'")';
		e.setAttribute('title', 'Ошибка при отправке трека: '+text+'. Кликните, чтоб повторить.');
		e.style.cursor = 'hand';
		var t_ = this;
		e.addEventListener('click', function(ev) { 
			e.parentNode.removeChild(e); 
			t_.track.scrobble(); 
		}, false);
	}
};

var InfoPanel = function(track, id) {
	this.track = track;
	this.track_id = id;
	
	var infoDiv = document.getElementById('lastfm_trackInfo')
	if (!infoDiv) {
		var p = document.getElementById('quickquery').parentNode.parentNode;
		if (!p) return;
		infoDiv = p.parentNode.appendChild(document.createElement('div'));
		infoDiv.id = 'lastfm_trackInfo';
		infoDiv.setAttribute('style', 'background: #eee; display: none; padding: 10px; margin-top: 1em; position: static; width: 156px; margin: 0 -10px;');
	}
	
	track.addObserver(this);
}
InfoPanel.prototype = {
	start: function() {
		if (!this.info) {
			var t_ = this;
			this.track.getInfo(function(info) { t_.info = info; t_.updateInfo(); });
		}
	},
	updateInfo: function() {
		var infoDiv = document.getElementById('lastfm_trackInfo');
		if (!infoDiv) return;
		infoDiv.style.display = 'block';
		
		var info = this.info;

		var albumart = '';
		if (info.album != undefined && info.album.image != undefined)  {
			var iurl = info.album.image[0]['#text'];
			var n = info.album.image.length;
			for (var i = 0; i < n; ++i) {
				if (info.album.image[i]['size'] == 'medium')  {
					iurl = info.album.image[i]['#text'];
				}
			}
			albumart = '<div style="text-align: center; margin-top: .5em;"><img style="max-width: 156px;" src="'+iurl+'" alt="album art"/></div>\n';
		}
		var tags = [];
		if (info.toptags.tag  != undefined) {
			n = info.toptags.tag.length;
			for (var i = 0; i < n; ++i) {
				var tag = info.toptags.tag[i];
				tags.push('\n<a href="'+tag.url+'" target="_blank">'+tag.name+'</a>');
			}
		}
		var tags_s = '';
		if  (tags.length > 0) 
			tags_s = '<div>Теги: ' + tags.join(', ') + '</div>';
		
		var artist = '', album = '';
		if (info.artist != undefined)
			artist = '<a href="'+info.artist.url+'" target="_blank">'+info.artist.name+'</a>';
		if (info.album != undefined)
			album = '<div style="margin-top: 0; text-align: center;"><a href="'+info.album.url+'" target="_blank">'+
				info.album.title+'</a></div>\n';
		
		var html = '<div>'+
			'<div style="font-weight: bold; text-align: center;">'+
				'<a href="'+info.url+'" target="_blank">'+info.name+'</a></div>\n'+
				'<div style="text-align: center;">('+artist+')</div>'+ albumart + album + 
				'<div style="margin-top: .5em;">'+
					tags_s +
					'<div>'+info.playcount+' прослушиваний</div>'+
				'</div>\n'+
			'</div>';
		infoDiv.innerHTML = html;
	},
	stop: function() {
		var infoDiv = document.getElementById('lastfm_trackInfo')
		if (infoDiv) infoDiv.style.display = 'none';
	}
}

var Track = function(artist, title, len, album, trackn, mbid) {
	this.artist = artist;
	this.title = title;
	this.len = len;
	this.album = album;
	this.trackn = trackn;
	this.mbid = mbid;
}
Track.prototype = {
	updateInterval: 1000,
	
	start: function() {
		this.runObserver('start');
		
		this.noScrobble = false;
		this.playTime = 0;
		
		this.startTime = Math.floor((new Date()).getTime() / 1000);
		if (this.len < 30) this.noScrobble = true;
		this.scrobbleTime = Math.min(240, Math.floor(this.len/2));//240
		
		var t_ = this;
		S.fm.nowPlaying(this, function() { t_.nowPlayingSuccess(); }, function() { t_.nowPlayingFail(); });
		
		this.play();
	},
	
	play: function() {
		if (this.playing) return;
		this.playingSince = Math.floor((new Date()).getTime() / 1000);
		this.playing = true;
		
		var t_ = this;
		clearInterval(this.timer); // ensure
		this.timer = setInterval(function() { t_.update(); }, this.updateInterval);
		
		this.runObserver('play');
	},
	
	pause: function() {
		clearInterval(this.timer);
		this.playing = false;
		
		var now = Math.floor((new Date()).getTime() / 1000);
		this.playTime += now-this.playingSince;
		
		this.runObserver('pause');
	},
	
	update: function() {
		var now = Math.floor((new Date()).getTime() / 1000);
		if (this.playTime + (now-this.playingSince) >= this.scrobbleTime) {
			if (!this.noScrobble) this.scrobble();
		}
		this.runObserver('updateTime');
	},
	
	scrobble: function() {
		clearInterval(this.timer);
		this.noScrobble = true;
		
		var t_ = this;
		S.fm.scrobble(this, function () { t_.successScrobble(); }, 
			function (msg) { t_.failScrobble(msg); }, function() { t_.failScrobble('error'); });
		
		this.runObserver('scrobble');
	},
	
	cancel: function() {
		clearInterval(this.timer);
		this.noScrobble = true;
		
		this.runObserver('cancel');
	},
	
	stop: function() {
		this.pause();
		clearInterval(this.timer);
		
		this.runObserver('stop');
	},
	
	getInfo: function(successHandler) {
		S.fm.getTrackInfo(this, successHandler, null);
	},
	
	addObserver: function(o) {
		if (!this.observers) this.observers = [];
		this.observers.push(o);
	},
	runObserver: function(fn, a) {
		for(var i in this.observers) {
			if (fn in this.observers[i]) {
				this.observers[i][fn](this, a);
			}
		}
	},
	nowPlayingSuccess: function() {
		this.runObserver('nowPlayingSuccess');
	},
	nowPlayingFail: function() {
		this.runObserver('nowPlayingFail');
	},
	successScrobble: function() {
		this.runObserver('successScrobble');
	},
	failScrobble: function(msg) {
		this.runObserver('failScrobble', msg);
	}
};

var scrobbler = {
	cid: 0,
	tracks: {},
	
	start: function(rid) {
		this.stop();
		if (rid in this.tracks) return;
		
		var btnE = document.getElementById('imgbutton'+rid);
		if (!btnE) return; // TODO: throw
		var t = /,(\d+)\);$/.exec(btnE.getAttribute('onclick'));
		
		this.cid = rid;
		var len = Number(t[1]);
		var artist = document.getElementById('performer'+rid).textContent;
		var title = document.getElementById('title'+rid).textContent;
		
		var track = new Track(artist, title, len);
		this.tracks[this.cid] = track;
		
		new PlayingIcon(track, this.cid);
		if (location.pathname.indexOf('/audio.php') == 0)
			new InfoPanel(track, this.cid);
			
		track.start();
	},
	stop: function() {
		if (!(this.cid in this.tracks)) return;
		
		this.tracks[this.cid].stop();
		delete this.tracks[this.cid];
	},
	play: function(id) {
		if (id in this.tracks)
			this.tracks[id].play();
	},
	pause: function(id) {
		if (id in this.tracks)
			this.tracks[id].pause();
	}
	
};

var getWindow = function(doc) {
	if (!doc)
		doc = document;

	if (navigator.userAgent.indexOf('WebKit') >= 0) {
		var win = doc.defaultView;
		var scriptElement = doc.createElement('script');
		scriptElement.appendChild(doc.createTextNode('document.parentWindow=window'));
		doc.documentElement.appendChild(scriptElement);
		doc.documentElement.removeChild(scriptElement);
		win = doc.parentWindow;

		return win;
	}
	
	if (typeof unsafeWindow != 'undefined') {
		return unsafeWindow;
	}

	if (doc.parentWindow) {
		return doc.parentWindow;
	}
}

var hookVkontakte = function() {
	var win = getWindow(document);
	if (typeof win.AudioObject == 'undefined') return; // not vkontakte.ru?
	
	var showPlayerHandler = function(id) {
		var r = arguments.callee.janeth_original ?
			arguments.callee.janeth_original.apply(this, arguments) : undefined;
		
		if (S.fm.active()) {
			setTimeout(function(){scrobbler.start(id);}, 0);
		}
		
		return r;
	};
	
	var hidePlayerHandler = function(id) {
		var r = arguments.callee.janeth_original ?
			arguments.callee.janeth_original.apply(this, arguments) : undefined;
		
		if (S.fm.active())
		{
			setTimeout(function(){scrobbler.stop();}, 0);
		}
		
		return r;
	};
	
	var changeStateHandler = function(id, state, value) {
		var r = arguments.callee.janeth_original ?
			arguments.callee.janeth_original.apply(this, arguments) : undefined;
			
		if (S.fm.active()) {
			switch (state) {
			case 'play':
				setTimeout(function(){scrobbler.play(id);}, 0);
				break;
			case 'pause':
				setTimeout(function(){scrobbler.pause(id);}, 0);
				break;
			}
		}
		
		return r;
	}
	
	var updateResultsHandler = function() {
		setTimeout(function(){scrobbler.stop();},0);
		return arguments.callee.janeth_original ?
			arguments.callee.janeth_original.apply(this, arguments) : undefined;
	}
	
	
	showPlayerHandler.janeth_original = win.AudioObject.showPlayer;
	win.AudioObject.showPlayer = showPlayerHandler;
	
	hidePlayerHandler.janeth_original = win.AudioObject.hidePlayer;
	win.AudioObject.hidePlayer = hidePlayerHandler;
	
	changeStateHandler.janeth_original = win.AudioObject.changeState;
	win.AudioObject.changeState = changeStateHandler;
	
	
	if (win.updateResults) {
		updateResultsHandler.janeth_original = win.updateResults;
		win.updateResults = updateResultsHandler;
		
	}
	
	setTimeout(function() {
		new ScrobblerIcon(S.fm);
		S.fm.addObserver(
			{ scrobblerDisabled: function() {
				scrobbler.stop();
			} }
		);
	}, 0);
}

if (location.hostname == 'vkontakte.ru' || location.hostname == 'vk.com') {
	// vkontakte part
	// Hook up to vkontakte's audio object
	hookVkontakte();
}

S.fm = {
	conn: null,
	
	state: 0, // 0 - no connection, 1 - connecting, 2 - logged in, 3 - disabled
	bad: false, // permanent login error (banned, badauth)
	
	session: 0,
	username: '',
	npUrl: '', // http://post.audioscrobbler.com:80/np_1.2
	scrUrl: '', // http://post2.audioscrobbler.com:80/protocol_1.2
	
	clientName: 'jvs',
	clientVer: '0.1',
	apiKey: '961e42339184d582f05c850ada3e17f5',
	
	logged: function() {
		return this.state >= 2;
	},
	
	active: function() {
		return this.state <= 2;
	},
	
	disable: function() {
		this.state = 3;
		this.runObserver('scrobblerDisabled');
	},
	
	enable: function() {
		this.state = 2;
		this.runObserver('scrobblerReady', this.username);
	},
	
	login:  function(fn, fail) {
		if (this.bad) {
			if (fail) fail();
			return; 
		}
		if (this.state == 1) {
			if (fail) fail();
			return; // ignore multiple simultaneus logins
		}
		
		var t_ = this;
		var handleFail = function() {
			if (fail) fail(); 
		}
		this.runObserver('scrobblerLogging');
		this.conn.login(this.cdata(),
			function(username, session, np_url, scr_url) {
				t_.successLogin(username, session, np_url, scr_url);
				if (fn) fn(); 
			},
			function() { 
				t_.anonymous(); 
				handleFail();
			}, 
			function(text) {
				t_.handleLoginFail(text);
				handleFail();
			}, 
			function(text) {
				t_.handleLoginError(text);
				handleFail(); 
			}
		);
	},
	
	handleBadSession: function(fn) {
		this.login(fn); 
	},
	
	handleLoginFail: function(text) {
		this.state = 0;
		this.runObserver('scrobblerLoginError', text);
	},
	
	handleLoginError: function(text) {
		this.state = 0;
		this.bad = true;
		this.runObserver('scrobblerLoginError', text);
	},
	
	anonymous: function() {
		this.state = 0;
		this.runObserver('scrobblerAnonymous');
	},
	
	successLogin: function(username, session, np_url, scr_url) {
		this.state = 2;
		this.session = session;
		this.npUrl = np_url;
		this.scrUrl = scr_url;
		this.username = username;
		this.runObserver('scrobblerReady', username);
	},
	
	cdata: function() {
		return this;
	},
	
	encodeTrackInfo: function(track) {
		var r = {};
		r.artist = track.artist;
		r.title = track.title;
		r.secs = track.len ? track.len : '';
		r.album = track.album ? track.album : '';
		r.trackn = track.trackn ? track.trackn : '';
		r.mbid = track.mbid ? track.mbid : '';
		r.startTime = track.startTime ? track.startTime : '';
		return r;
	},
	
	nowPlaying: function(rtrack, success) {
		var t_ = this;
		if (!this.logged()) {
			this.login(function() { t_.nowPlaying(rtrack, success); }); 
			return;
		}
		
		var tr = this.encodeTrackInfo(rtrack);
		this.conn.nowPlaying(this.cdata(), tr, success,
			function() { t_.handleBadSession( fn ); } 
		);
	},
	
	scrobble: function(rtrack, success, fail) {
		var t_ = this;
		if (!this.logged()) {
			this.login(
				function() { t_.scrobble(rtrack, success, fail); }, 
				function() { if (fail) fail(); } );
 			return;
		}
		
		var tr = this.encodeTrackInfo(rtrack);
		this.conn.scrobble(this.cdata(), tr, success,
			function() { 
				t_.handleBadSession( function() { t_.scrobble(tr, success, fail); } );
			},
			function(msg) { if (fail) fail(msg); },
			function() { if (fail) fail(0); }
		);
	},
	
	getTrackInfo: function(rtrack, successHandler, errorHandler) {
		var t_ = this;
		var tr = this.encodeTrackInfo(rtrack);
		var gotError = function (code) {
			if (errorHandler) errorHandler(code);
		}
		this.conn.runWS(this.cdata(), 'track.getInfo', 
			{ artist: rtrack.artist, track: rtrack.title, mbid: (rtrack.mbid?rtrack.mbid:'') },
			function(infoText) {
				var info = eval('('+infoText+')');
				if (info == undefined) {
					gotError(0);
				} else if ('error' in info) {
					gotError(info.error);
				} else {
					successHandler(info.track);
				}
			}, gotError);
	},
	
	addObserver: function(o) {
		if (!this.observers) this.observers = [];
		this.observers.push(o);
	},
	runObserver: function(fn, a) {
		for(var i in this.observers) {
			if (fn in this.observers[i]) {
				this.observers[i][fn](this, a);
			}
		}
	},
};


/////////////////////////////////////////////////////
//              CONNECTION OBJECTS                 //
// incapulate browser-specific requests to LFM API //
/////////////////////////////////////////////////////


	
var arrayUriEncode = function(a) {
	var r = {};
	for(var i in a) {
		r[i] = encodeURIComponent(a[i]);
	}
	return r;
}

// from { a: 1, b: 2, ... }  make a=1&b=2&...
var urlParams = function(p) {
	a = [];
	for (var i in p) {
		a.push(i+'='+p[i]);
	}
	return a.join('&');
}

//  Vkontakte-ff-connection  (browser-specific)
var ff_conn = {
	/* successHandler(username, session, np_url, scr_url), anonymousHandler(), failHandler(message), errorHandler(message) */
	login: function(cdata, successHandler, anonymousHandler, failHandler, errorHandler) {
		var loginTime = Math.floor((new Date()).getTime() / 1000);
		
		var t_ = this; // add to closure
		var parser = new DOMParser();
		var username = '';
		
		var cancel = false; var timeout = 0;
		
		var gotError = function(status) {
			if (failHandler) failHandler('httpLoginError ('+status+')');
		};
		var gotHttpError = function(responseDetails) {
			gotError(responseDetails.status);
		};
		var gotSessionResult = function(responseDetails) {
			if (cancel) return; clearTimeout(timeout); // timeout
			var result = responseDetails.responseText.split('\n');
			var status = result[0];//.trim()
			if (status == 'BANNED' || status == 'BADAUTH') {
				if (errorHandler) errorHandler(status);
				return;
			}
			if (status == 'BADTIME') {
				failHandler('BADTIME');
				return;
			}
			if (status.slice(0, 6) == 'FAILED') {
				failHandler(status.slice(7));
				return;
			}
			var session = result[1], np_url = result[2], scr_url = result[3];
			log_('Conn: Got session id '+session);
			successHandler(username, session, np_url, scr_url);
		}
		var gotToken = function(responseDetails) {
			if (cancel) return; // timeout
			
			var responseXML = parser.parseFromString(responseDetails.responseText, "text/xml");
			if (responseXML.getElementsByTagName('string').length < 1) { gotError('token request filed'); return; }
			var token = responseXML.getElementsByTagName('string').item(0).firstChild.textContent;
			log_('Got token '+username+','+token);
			
			GM_xmlhttpRequest({ method: 'GET', url: 'http://post.audioscrobbler.com/?hs=true&p=1.2.1'+
				'&c='+cdata.clientName+'&v='+cdata.clientVer+'&u='+username+'&t='+loginTime+'&a='+token, 
				onload: gotSessionResult, onerror: gotHttpError});
		};
		var gotLogin = function(responseDetails) {
			if (cancel) return; // timeout cancelled request
			
			var responseXML = parser.parseFromString(responseDetails.responseText, "text/xml");
			if (responseXML.getElementsByTagName('string').length < 1) { gotError('username request failed'); return; }
			username = responseXML.getElementsByTagName('string').item(0).firstChild.textContent;
			log_('Found username: '+username);
			if (username == 'LFM_ANON') {
				anonymousHandler();
				return;
			}
			
			GM_xmlhttpRequest({method: 'POST', url: 'http://ext.last.fm/1.0/webclient/xmlrpc.php',
				data: '<methodCall><methodName>getScrobbleAuth</methodName><params><param><value><string>'+username+'</string>'+
					'</value></param><param><value><string>'+loginTime+'</string></value></param></params></methodCall>',
				onload: gotToken, onerror: gotHttpError});
		};
		GM_xmlhttpRequest({ method: 'POST', url: 'http://ext.last.fm/1.0/webclient/xmlrpc.php',
			data: '<methodCall><methodName>getSession</methodName><params /></methodCall>',
			onload: gotLogin, onerror: gotHttpError});
			
		// user defined timeout. See bug http://greasemonkey.devjavu.com/ticket/100
		timeout = setTimeout(function() {
			cancel = true;
			gotError('timeout');
		}, 25000);
	},
	
	/* successHandler(), badSessionHandler(), errorHandler() */
	nowPlaying: function(cdata, track, successHandler, badSessionHandler, errorHandler) {
		
		track = arrayUriEncode(track);
		
		var cancel = false; var timeout = 0; // to set from timeout
		var gotError = function(code) { if (errorHandler) errorHandler(); }
		var ok = function(responseDetails){
			if (cancel) return; clearTimeout(timeout); // timeout
			
			log_('Conn: nowPlayng callback');
			var result = responseDetails.responseText.split('\n');
			var status = result[0];
			if (status == 'OK') {
				successHandler();
			}
			else if (status == 'BADSESSION') {
				if (badSessionHandler) badSessionHandler();
			} else gotError();
		};
		var poststring = 's='+cdata.session+'&a='+track.artist+'&t='+track.title+'&b='+track.album+'&l='+
			track.secs+'&n='+track.trackn+'&m='+track.mbid;
		GM_xmlhttpRequest({ method: 'POST', url: cdata.npUrl,
			headers: {'Content-type': 'application/x-www-form-urlencoded', 'Content-Length': poststring.length},
			data: poststring,
			onload: ok, onerror: gotError});
			
		timeout = setTimeout(function() {
			cancel = true;
			gotError('timeout');
		}, 15000);
	},
	
	/* successHandler(), badSessionHandler(), failHandler(message), errorHandler() */
	scrobble: function(cdata, track, successHandler, badSessionHandler, failHandler, errorHandler) {
		track = arrayUriEncode(track);
		
		var cancel = false; var timeout = 0; // timeout came
		var gotError = function(responseDetails) { if (errorHandler) errorHandler(); }
		var ok = function(responseDetails){
			if (cancel) return; clearTimeout(timeout);
			
			var result = responseDetails.responseText.split('\n');
			log_('Conn: scrobble callback');
			var status = result[0];
			if (status == 'OK') {
				successHandler();
			}
			else if (status == 'BADSESSION') {
				if (badSessionHandler) badSessionHandler();
			} else if (status.slice(0, 6) == 'FAILED') {
				if (failHandler) failHandler(status.slice(7));
			} else gotError();
		};
		
		var poststring = 's='+cdata.session+'&a[0]='+track.artist+'&t[0]='+track.title+'&i[0]='+track.startTime+
			'&o[0]=P&r[0]=&b[0]='+track.album+'&l[0]='+track.secs+'&n[0]='+track.trackn+'&m[0]='+track.mbid;
		GM_xmlhttpRequest({ method: 'POST', url: cdata.scrUrl,
			headers: {'Content-type': 'application/x-www-form-urlencoded', 'Content-Length': poststring.length},
			data: poststring,
			onload: ok, onerror: gotError });
			
		timeout = setTimeout(function() {
			cancel = true;
			gotError('timeout');
		}, 15000);
	},
	
	// successHandler(info), [ errorHandler(msg) ]
	runWS: function(cdata, method, params, successHandler, errorHandler) {
		params = arrayUriEncode(params);
		
		var cancel = false; var timeout = 0; // to set from timeout
		var gotError = function(code) { if (errorHandler) errorHandler('connection error'); }
		var ok = function(responseDetails){
			if (cancel) return; clearTimeout(timeout); // timeout

			successHandler(responseDetails.responseText);
		};
		var request = 'http://ws.audioscrobbler.com/2.0/?format=json&api_key='+cdata.apiKey+
			'&method='+method+'&' + urlParams(params);
		GM_xmlhttpRequest({ method: 'GET', url: request, onload: ok, onerror: gotError});
			
		timeout = setTimeout(function() {
			cancel = true;
			gotError('timeout');
		}, 15000);
	},
};
	
//  Vkontakte-opera-connection  (browser-specific)
var opera_conn = {
	stub_url: 'http://' + location.hostname + '/images/qmark.gif',
	
	/* successHandler(username, session, np_url, scr_url), anonymousHandler(), failHandler(message), errorHandler(message) */
	login: function(cdata, successHandler, anonymousHandler, failHandler, errorHandler) {
		var t_ = this; // add to closure
		var gotError = function(status) {
			if (status == -1) status = 'Timeout';
			failHandler(status);
		};
		
		var loginTime = Math.floor((new Date()).getTime() / 1000);
		var tokenReq = Requester.request('http://ext.last.fm/1.0/#getToken', this.stub_url, [loginTime], 20000);
		
		var gotSessionResult = function(username, result) {
			var status = result[0];//.trim()
			if (status == 'BANNED' || status == 'BADAUTH') {
				errorHandler();
				return;
			}
			if (status == 'BADTIME') {
				failHandler('BADTIME');
				return;
			}
			if (status.slice(0, 6) == 'FAILED') {
				failHandler(status.slice(7));
				return;
			}
			var session = result[1], np_url = result[2], scr_url = result[3];
			log_('Conn: Got session id '+session);
			successHandler(username, session, np_url, scr_url);
		}
		tokenReq.addCallback(function(result) {
			var username = result[0];
			if (username == 'LFM_ANON') {
				anonymousHandler();
				return;
			}
			if (username == 'ERROR') {
				gotError(result[1]);
				return;
			}
			
			var token = result[1];
			log_('Conn: Got username '+username+' token '+token);
			var sessionReq = Requester.request('http://post.audioscrobbler.com/?hs=true&p=1.2.1'+
				'&c='+cdata.clientName+'&v='+cdata.clientVer+'&u='+username+'&t='+loginTime+'&a='+token, t_.stub_url, [], 10000);
			sessionReq.addCallback(function(result) {
				gotSessionResult(username, result);
			});
			sessionReq.addErrback(function(errno) {
				gotError(errno);
			});
		});
		tokenReq.addErrback(function(code) {
			gotError(code);
		});
	},
	
	/* successHandler(), badSessionHandler(), errorHandler() */
	nowPlaying: function(cdata, track, successHandler, badSessionHandler, errorHandler) {
		var req = Requester.request('', this.stub_url, '');
		var reqWin = req.iframe.contentWindow;
		var reqDoc = reqWin.document;
		reqDoc.open();
		reqDoc.write('<html><body>'+
			'<form action="'+cdata.npUrl+'" method="post" id="postForm" accept-charset="utf-8">'+
			'<input type="text" name="s" value="'+cdata.session+'"/>'+
			'<input type="text" name="a" value="'+track.artist+'"/>'+
			'<input type="text" name="t" value="'+track.title+'"/>'+
			'<input type="text" name="b" value="'+track.album+'"/>'+
			'<input type="text" name="l" value="'+track.secs+'"/>'+
			'<input type="text" name="n" value="'+track.trackn+'"/>'+
			'<input type="text" name="m" value="'+track.mbid+'"/>'+
			'</form></body></html>');
		reqDoc.close();
		var form = reqWin.document.getElementById('postForm');
		form.submit();
		
		var gotError = function(code) { if (errorHandler) errorHandler(); }
		req.addErrback(gotError);
		req.addCallback(function(result){
			log_('Conn: nowPlayng callback');
			var status = result[0];
			if (status == 'OK') {
				successHandler();
			}
			else if (status == 'BADSESSION') {
				if (badSessionHandler) badSessionHandler();
			} else gotError();
		});
	},
	
	/* successHandler(), badSessionHandler(), failHandler(message), errorHandler() */
	scrobble: function(cdata, track, successHandler, badSessionHandler, failHandler, errorHandler) {
		var req = Requester.request('', this.stub_url, '');
		var reqWin = req.iframe.contentWindow;
		var reqDoc = reqWin.document;
		reqDoc.open();
		reqDoc.write('<html><head></head><body>'+
			'<form action="'+cdata.scrUrl+'" method="post" id="postForm" accept-charset="utf-8">'+
			'<input type="text" name="s" value="'+cdata.session+'"/>'+
			'<input type="text" name="a[0]" value="'+track.artist+'"/>'+
			'<input type="text" name="t[0]" value="'+track.title+'"/>'+
			'<input type="text" name="i[0]" value="'+track['startTime']+'"/>'+
			'<input type="text" name="o[0]" value="P"/>'+ //  chosen by user
			'<input type="text" name="r[0]" value=""/>'+ //  no love/ban
			'<input type="text" name="b[0]" value="'+track.album+'"/>'+
			'<input type="text" name="l[0]" value="'+track.secs+'"/>'+
			'<input type="text" name="n[0]" value="'+track.trackn+'"/>'+
			'<input type="text" name="m[0]" value="'+track.mbid+'"/>'+
			'</form></body></html>');
		reqDoc.close();
		var form = reqWin.document.getElementById('postForm');
		form.submit();
		
		var gotError = function(code) { if (errorHandler) errorHandler(); }
		req.addErrback(gotError);
		req.addCallback(function(result){
			log_('Conn: scrobble callback');
			var status = result[0];
			if (status == 'OK') {
				successHandler();
			}
			else if (status == 'BADSESSION') {
				if (badSessionHandler) badSessionHandler();
			} else if (status.slice(0, 6) == 'FAILED') {
				if (failHandler) failHandler(status.slice(7));
			} else gotError();
		});
	},
	
	// successHandler(info), [ errorHandler(msg) ]
	runWS: function(cdata, method, params, successHandler, errorHandler) {
		params = arrayUriEncode(params);
		var uri = 'http://ws.audioscrobbler.com/2.0/?format=json&callback=a&api_key='+cdata.apiKey+
			'&method='+method+'&'+urlParams(params);
		var req = Requester.request(uri, this.stub_url, '', 20000);
		
		req.addErrback(function(code) { if (errorHandler) errorHandler(code); });
		req.addCallback(function(result){
			log_('Conn: trackinfo callback');
			successHandler(result[0]);
		});
	},
};

// empty connection (logs requests)
var empty_conn = {
	/* successHandler(username, session, np_url, scr_url), anonymousHandler(), failHandler(message), errorHandler() */
	login: function(successHandler, anonymousHandler, failHandler, errorHandler) {
		log_("Login requested");
		successHandler();
	},
	
	useSession: function(session, np_url, scr_url) {
		log_("Use session " + session + " requested");
	},
	
	logged: function() {
		return true;
	},
	
	/* successHandler(), badSessionHandler(), errorHandler() */
	nowPlaying: function(track, successHandler, badSessionHandler, errorHandler) {
		log_("Requested now playing " + track['artist'] + " " + track['title']);
		successHandler();
	},
	
	/* successHandler(), badSessionHandler(), failHandler(message), errorHandler() */
	scrobble: function(track, successHandler, badSessionHandler, failHandler, errorHandler) {
		log_("Requested scrobble " + track['artist'] + " " + track['title']);
		successHandler();
	},
	
	getTrackInfo: function(rtrack, successHandler, errorHandler) {
		successHandler();
	}
};

S.fm.conn = (typeof GM_xmlhttpRequest != 'undefined') ? ff_conn : opera_conn;
if (navigator.userAgent.indexOf('WebKit') >= 0) { // chrome has GM_xmlhttpRequest but prohibits cross-domain
	S.fm.conn = opera_conn;
}

//////////////////////////////////////////////////////////
//              Opera support functions                 //
//////////////////////////////////////////////////////////
var postAudioscrobbler = function() {
	if (Requester.getArguments() === false) return;
	
	log_('Returning post.audioscrobbler.com data: '+document.documentElement.innerText);
	var r = document.documentElement.innerText.split('\n');
	Requester.returnData(r);
}
if (location.hostname == 'post.audioscrobbler.com' || location.hostname == 'post2.audioscrobbler.com') {// && location.pathname == '/np_1.2')
	setTimeout(postAudioscrobbler, 0);
}

var wsAudioscrobbler = function() {
	if (Requester.getArguments() === false) return;
	
	log_('Returning ws.audioscrobbler.com data: '+document.documentElement.innerText);
	var r = document.documentElement.innerText.substr(1).replace(/;/g,'');
	Requester.returnData(r);
}
if (location.hostname == 'ws.audioscrobbler.com') {
	setTimeout(wsAudioscrobbler, 0);
}

var createRequestObject = function() {
	if (window.XMLHttpRequest) 
		try { return new XMLHttpRequest(); } catch (e) { }
	else
		if (window.ActiveXObject) {
			try { return new ActiveXObject('Msxml2.XMLHTTP'); }
			catch (e) {
				try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch (e) { }
			}
		}
	return null;
}
var getToken = function() {
	log_('getToken');
	var loginTime = Requester.getArguments();
	log_(loginTime);
	if (loginTime == false) return; // we are not the handler
	loginTime = loginTime[0];
	log_('Getting token. Login time: '+loginTime);
	var req = createRequestObject();
	req.open('POST', 'http://ext.last.fm/1.0/webclient/xmlrpc.php', true);
	var gotError = function(code) {
		Requester.returnData(['ERROR', 'Token request failed ('+code+')']);
	};
	var gotToken = function(username) {
		if (req.responseXML.getElementsByTagName('string').length < 1) { gotError(2); return; }
		var token = req.responseXML.getElementsByTagName('string').item(0).firstChild.textContent;
		Requester.returnData([username,token]);
	};
	var gotLogin = function() {
		if (req.responseXML.getElementsByTagName('string').length < 1) { gotError(1); return; }
		var username = req.responseXML.getElementsByTagName('string').item(0).firstChild.textContent;
		log_('Found username: '+username);
		if (username == 'LFM_ANON') {
			Requester.returnData([username]);
			return;
		}
		
		req.open('POST', 'http://ext.last.fm/1.0/webclient/xmlrpc.php', true);
		req.onreadystatechange = function(e) {
			if (req.readyState == 4) {
				if (req.status == 200 && req.responseXML != null) {
					gotToken(username);
				} else gotError('tokenRequestStatus '+req.status);
			}
		};
		req.send('<methodCall><methodName>getScrobbleAuth</methodName><params><param><value><string>'+username+'</string>'+
			'</value></param><param><value><string>'+loginTime+'</string></value></param></params></methodCall>');
	};
	req.onreadystatechange = function(e) {
		if (req.readyState == 4) {
			if (req.status == 200 && req.responseXML != null) {
				gotLogin();
			} else gotError('usernameRequestStatus '+req.status);
		}
	};
	req.send('<methodCall><methodName>getSession</methodName><params /></methodCall>');
}
if (location.href == 'http://ext.last.fm/1.0/#getToken') {
	setTimeout(getToken, 0);
}



/* ============ DEFERRED OBJECT ===========
   used by Requester */
var Deferred = function()
{
	this.cbh_ = [];
	this.ebh_ = [];
	this.fired_ = false;
}
Deferred.prototype = {
	callback: function(data) {
		return this.fire(true, data);
	},
	errback: function(data) {
		return this.fire(false, data);
	},
	fire: function(status, result) {
		if (this.fired_) return false;
		this.fired_ = true;
		this.status_ = status;
		this.result_ = result;
		this.broadcast_();
		return true;
	},
	fired: function() {
		return this.fired_;
	},
	addCallback: function(fn) {
		this.cbh_.push(fn);
		this.broadcast_();
		return this;
	},
	addErrback: function(fn) {
		this.ebh_.push(fn);
		this.broadcast_();
		return this;
	},
	broadcast_: function() {
		if (!this.fired_) return;
		this.broadcast_impl_(this.status_ ? this.cbh_ : this.ebh_, this.result_);
		this.cbh_ = [];
		this.ebh_ = [];
	},
	broadcast_impl_: function(list, arg) { // called only from 'broadcast_'
		for(var cb = 0; cb < list.length; ++cb) {
			list[cb].call(this, arg);
		}
	}
};

/* ============ REQUESTER OBJECT ===========
   Incapsulates cross-domain http async requests in userjs.
   The data is passed through window.name varible. */
  
var serializeData = function(a) {
	if (!(a instanceof Array)) a = [a];
	var r = '[ ';
	for(var i = 0; i < a.length; ++i) {
		r += "'" + a[i].toString().replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/'/g, "\\'") + "', ";
	}
	return (r += ']');
}
var unserializeData = function(s) {
	return eval(s); // Mind security!
}

var explode = function(s, delim, n) {
	var p = 0;
	var g = [];
	for(var i = 0; n == undefined || i < n-1; ++i) {
		var index = s.indexOf(delim, p);
		if (index == -1) break;
		g[i] = s.slice(p, index);
		p = index+1;
	}
	if (n != undefined || i < n-1) {
		g[i] = s.slice(p);
	}
	return g;
}
	
/**
 * Cross domain requests from Opera UserJS. Singleton.
 * A  user-js handler at requested page must exist to prepare and return data to requesting page.
 *
 * Usage: let A is requesting page. B is a page at the remote domain to request from,
 * A.domain, B.domain are the domains of A and B.
 * Create a UserJS at A calling Requester.request, passing to B, and url of a page at A.domain.
 * The latter page is called a stub and is used to exchange data with original requesting window.
 * It must be an arbitrary page at original domain, better small-sized.
 * Then create a UserJS handler for B. Get passed arguments by calling Requester.getArguments(),
 * make proper preparations and requests (e.g. XMLHttpRequests to B.domain webservice), and return
 * resulting array by calling Requester.returnData().
 */
Requester = {
	default_timeout: 15000,
	token: 'XDR1',

	/**
	 * Make cross-domain request.
	 *
	 * @param request_url URL to load
	 * @param stub_url any URL at requesting domain used to exchange data with original Requester
	 * @param data an array of strings to pass to handler script at 'request_url'
	 * @param timeout generate timeout error after 'timeout' msec
	 * @return deferred object receiving events
	 */
	request: function (request_url, stub_url, data, timeout)
	{
		if (timeout == undefined) timeout = this.default_timeout;
		var req_id = 'request'+(new Date()).getTime();
		
		var iframe = document.createElement('iframe');
		document.body.appendChild(iframe);
		iframe.setAttribute('src', request_url);
		iframe.setAttribute('style', 'display: none;');
		iframe.contentWindow.name = this.token + '#' + req_id + '#' + stub_url + '#' + serializeData(data);
		
		var deferred = new Deferred();
		deferred.iframe = iframe;
		deferred.req_id = req_id;
		var win = getWindow();
		win[req_id] = deferred;
		
		setTimeout(function() { 
			if (!deferred.fired()) {
				deferred.errback(-1);
			}
		}, timeout);
		deferred.addCallback(this.disposeFrame);
		deferred.addErrback(this.disposeFrame);
		
		return deferred;
	},
	
	/**
	 * Get rid of a deferred object and frame having been used. Used internally
	 */
	/* private */ disposeFrame: function() {
		this.iframe.parentNode.removeChild(this.iframe);
		delete(getWindow()[this.req_id]);
	},
	
	/**
	 * UserJS handler at requested url calls it to get the array of data passed by requesting script.
	 *
	 * @see Requester#request
	 * @returns array of data, or false if nothing requested by this requester
	 */
	getArguments: function() {
		var args = explode(window.name, '#', 4);
		if (args[0] != this.token)
			return false;
		return unserializeData(args[3]);
	},
	
	/**
	 * Pass an array of data to requesting page as a result.
	 * Deferred callback will be called with this array as an argument.
	 */
	returnData: function(data) {
		var args = explode(window.name, '#', 4);
		var req_id = args[1];
		var stub_url = args[2];
		window.name = this.token + '#' + req_id + '#' + stub_url + '#' + serializeData(data);
		location.replace(stub_url);
	},
	
	/**
	 * Check if we are in stub.
	 *
	 * @return true if location.href is the stub page. False otherwise.
	 */
	inStub: function() {
		var args = explode(window.name, '#', 4);
		var token = args[0];
		var stub_url = args[2];
		return token == this.token && location.href == stub_url;
	},
	
	/**
	 * Pass the collected result to original requesting page.
	 */
	runStub: function() {
		var args = explode(window.name, '#', 4);
		window.name = '';	
		var req_id = args[1];
		var data = args[3];
		
		var win = getWindow(document);
		if (!win.parent[req_id]) {	
			log_("Requester: Deferred object disappeared.");
			return;
		}
		
		deferred = win.parent[req_id];
		win.parent.setTimeout(function() { // run in parent window thread
			deferred.callback(unserializeData(data));
		}, 0);
	},
};
if (Requester.inStub())
{
	Requester.runStub();
}

})();
