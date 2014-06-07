// Janeth
// User script to scrobble online track plays at vkontakte.ru (vk.com).
// Compatible with Opera, Firefox. 
// Tested with Firefox 3/4 (GM 0.8-0.9), Opera 10/11, Google Chrome 10/12(dev)
//
// beta 10 (2011-03-26)
//
// More info at http://nichtverstehen.de/vkontakte-scrobbler
//
// Original Author: Cyril Nikolaev <cyril7@gmail.com>
// Licensed under GNU LGPL (http://www.gnu.org/copyleft/lesser.html)
//
// ==UserScript==
// @name          Janeth vkontakte-scrobbler
// @namespace     http://nichtverstehen.de/vkontakte-scrobbler
// @version       0.9
// @description   scrobble vkontakte audiotrack plays
//
// @copyright 2010, Cyril Nikolaev (http://nichtverstehen.de)
// @licence LGPL
//
// @include http://vkontakte.ru/*
// @include http://vk.com/*
//
// @include http://vkontakte.ru/video
// @include http://vk.com/video
// @include http://ext.last.fm/1.0/*
// @include http://post.audioscrobbler.com/*
// @include http://post2.audioscrobbler.com/*
// @include http://ws.audioscrobbler.com/*
//
// // works only in FF
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
//
// ==/UserScript==

var is_ff = navigator.userAgent.toLowerCase().indexOf('firefox') != -1;
var is_opera = navigator.userAgent.toLowerCase().indexOf('opera') != -1;

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  if (!is_ff && !is_opera) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js");
    script.addEventListener('load', function() {
      var script = document.createElement("script");
      script.textContent = "(" + callback.toString() + ")();";
      document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
  }
  
  else
    callback();
}

// the guts of this userscript
function main() {

var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') != -1;
var is_opera = navigator.userAgent.toLowerCase().indexOf('opera') != -1;

var PLAYER_SEARCH_INTERVAL = 3000;
var GOOGLE_CHROME_WINDOW;

var JANETH_VERSION = "Janeth бета 10 (2010-03-26)\n\n"+
	"Юзер-скрипт для скробблинга прослушанных аудизаписей на vkontakte.ru.\n\n"+
	"Документация есть на сайте http://nichtverstehen.de/vkontakte-scrobbler/\n"+
	"Автор — Кирилл Николаев <cyril7@gmail.com>";

var log_ = function(s) {
    return;
	if (window.opera)
		window.opera.postError(s);
	else if (console && console.log)
		unsafeWindow.console.log(arguments);
}

var S = { fm: null };

var fixStyles = function () {
	var styleId = 'scrobblerStyleFix';
	var styleBody = '.audioTitle, .fmNoteAudioTitle { width: 300px !important; } \n#pagesTop .pageList { padding-left: 10px; }';
	
	var style = document.getElementById(styleId);
	if (style) return;
	
	style = document.createElement('style');
	style.type = 'text/css';
	style.id = styleId;
	style.appendChild(document.createTextNode(styleBody));
	document.body.appendChild(style);
}

var unesc = function (str) {
    str = str.replace(/&#(\d+);/g, function(a, num, b) {
                                        return unescape("%"+parseInt(num).toString(16));
                                    });
    str = str.replace(/&amp;/g, '&');
    return str;
}

var ScrobblerIcon = function(fm) {
	fixStyles();
	
	this.scrobblerDiv = document.createElement('div');
	this.scrobblerDiv.setAttribute('id', 'scrobbler_icon');
	this.scrobblerDiv.setAttribute('style', 'float: left; display: block; background-position: center center; background-repeat: no-repeat; margin-right: 5px; width: 17px; height: 16px; border: 1px solid #aaa;');
	this.scrobblerDiv.setAttribute('title', 'Вход не выполнен. Включите музыку, и начнется подключение.');
	this.scrobblerDiv.className = 'vkontakte_scrobbler_inactive';
	this.scrobblerDiv.style.backgroundColor = '#bbb';
	this.scrobblerDiv.style.backgroundImage = 'url("'+this.lfmIcon+'")';
	this.scrobblerDiv.style.borderColor = '#aaa';
	
	this.link = document.createElement('a');
	this.link.setAttribute('id', 'scrobbler_lastfm');
	this.link.setAttribute('target', '_blank');
	this.link.setAttribute('style', 'color: #ffffff; display: none; line-height: 18px;');
	
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
	
    icon = jQuery("div#scrobbler_icon");
    placeholder = $('<div id=login_placeholder style="margin: 5px; position:absolute;bottom:0;"></div>');
    jQuery("div#gp_wrap").append(placeholder);
    placeholder.append(this.scrobblerDiv);
    placeholder.append(this.link);
	
	fm.addObserver(this);
}
ScrobblerIcon.prototype = {
	lfmIcon:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAICAYAAAAiJnXPAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADOSURBVBiVbc8/KMRxGAbw5yfpZFDqipWyXkajZHAbstgMSim7bAaDxYSY2dTJoMwWJTHecsktsjEbPgbfq+vyTG/v86fnSZJgGlfoooNjjBZuAuf4wD5qQ5hJ8pzkK8l6ks0kc0la+cN2kkaSrSSzSX6CA1ymDxgvyau4wB2G+wVvaGYA2CjcFB7xhBVUQRvL/5iqwq2hhl284yQ4wumAYQST2MEDqvJfRDdo4Bt75V4oVc4whteyawk3uO0lz+Men6XSYW846iXkBdeo/wKFfPsVW0kcNQAAAABJRU5ErkJggg==",
	loadIcon: "data:image/gif;base64,R0lGODlhCgAKAJEDAMzMzP9mZv8AAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAADACwAAAAACgAKAAACF5wncgaAGgJzJ647cWua4sOBFEd62VEAACH5BAUAAAMALAEAAAAIAAMAAAIKnBM2IoMDAFMQFAAh+QQFAAADACwAAAAABgAGAAACDJwHMBGofKIRItJYAAAh+QQFAAADACwAAAEAAwAIAAACChxgOBPBvpYQYxYAIfkEBQAAAwAsAAAEAAYABgAAAgoEhmPJHOGgEGwWACH5BAUAAAMALAEABwAIAAMAAAIKBIYjYhOhRHqpAAAh+QQFAAADACwEAAQABgAGAAACDJwncqi7EQYAA0p6CgAh+QQJAAADACwHAAEAAwAIAAACCpRmoxoxvQAYchQAOw==",
	xIcon:    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABxSURBVBiVXY5BCsJAEASLkPi3QG6S1xg8BPyKkEPAoH8x3/CqQnnYTRy2YWCY7i4GtVNHlWIGtUW9mnQJ5jnfJtRanUPolPeb2myNGNpNlYqkL/DkrxX4AGyEMTTv8afSbNRDDFUZvwB9xr6BI/AAXj/vl6+QBI0lqAAAAABJRU5ErkJggg==",
	anonIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABrSURBVAiZTcyhDcJQAEXR1wSFJGEmEsICIBEswAoNBodhDBJUdXcAFiBdoJ6D+dB/kyfuFS9YoMULT5ywDC4YscUGA67BDmuk7I53qhCc8cGhjscS90iDFLokTZJVkswycUsy/1t11ePx8y9yyn5omey55wAAAABJRU5ErkJggg==",
	
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

var AdvancedControl = function(track, track_id, song_section) {
	this.track = track;
	this.track_id = track_id;
	this.active = false;
    this.songSection = song_section;
}
AdvancedControl.prototype = {
	scrobbleIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAA3WAAAN1gGQb3mcAAAAGHRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuMzap5+IlAAAAsElEQVQY02NggIK+vj7OmTNnFgLxxhkzZuydNWvWQiDtyoAOgAq2APFfoIKtQHomUNFxIFWGomjKlCnCQMH/QLyJAR8AKmAF4tdA/AOI3fAqBlqZD1T0B4h/AvECIJbEqXj69OlmQAVHoc54D9Qchtd0oEe8gArfAfHzVatWMRNy9zyQyUBT1ZCtNASasgSIPebMmaMCshJkNRA/RDERqEAVKHga6uv/UHwGqEEbpgYAifx5KXPtvk4AAAAASUVORK5CYII=",
	cancelIcon:   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAA3WAAAN1gGQb3mcAAAAGHRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuMzap5+IlAAAAr0lEQVQY042QMQrEIBBFvVr2WtvsMYwWqRKQVBapPIB4htSBVHaCRXDWLypJtfthcByf/nEYqxrHccixCSFOBHLU2F258M6RMpDWdSUEctRwdn8pKaXIe09QCIGwz3Wq8MCqXWoQ1nmeC7QsS3t5Y+gHVtBxHDRNU4G01hRjbG2cHdz3naSUBTLG0HVd5XIHm3Xth6y11IQ2ujXn/NUg59wDqh9KfUw5+fwcz78D/wKlJgKW8Lnt8wAAAABJRU5ErkJggg==",
	
	show: function() {
		var d = document.getElementById('lastfm_edit'+this.track_id);
		if (!d) {
			var d = document.createElement('div');
			d.setAttribute('style','text-align: center;  position: absolute; background: #000; width: 150px; padding: .2em .2em .2em .2em; margin: .5em 0 0 -5px; opacity: 0.7;');
			d.id = 'lastfm_edit'+this.track_id;
		}
		this.edit = d;
		var p = this.songSection.get(0);
		p.appendChild(d);
		
		d.innerHTML = '<input type="text" style="font-size: 1em; padding: 0 0; width: 140px; opacity: 1;" id="lastfm_editArtist'+
			this.track_id+'" value="'+this.track.artist+'"/> '+
			'<input type="text" style="font-size: 1em; padding: 0 0; width: 140px; opacity: 1;" id="lastfm_editTitle'+
			this.track_id+'" value="'+this.track.title+'"/> '+
			'<img src="'+this.cancelIcon+'" id="lastfm_cancelBtn'+this.track_id+'" title="не скробблить"'+
			' style="width: 10px; height: 10px; cursor: hand;"/> '+
			'<img src="'+this.scrobbleIcon+'" id="lastfm_scrobbleBtn'+this.track_id+'" title="заскробблить сейчас" '+
			'style="width: 10px; height: 10px; cursor: hand;"/> '
			
		var t_ = this;
		jQuery('img#lastfm_cancelBtn'+this.track_id).bind('click',
			function(ev) {
				ev.stopPropagation();
				t_.close(true);
				t_.track.cancel();
			}, false);
		jQuery('img#lastfm_scrobbleBtn'+this.track_id).bind('click',
			function(ev) {
				ev.stopPropagation();
				t_.close(true);
				t_.track.scrobble();
			}, false);

		jQuery('input#lastfm_editArtist'+this.track_id).bind('click',
			function(ev) {
        		$(this).focus();
			}, false);

		jQuery('input#lastfm_editTitle'+this.track_id).bind('click',
			function(ev) {
        		$(this).focus();
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
		$(document).bind('click', this.kp, false);
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
			$(document).unbind('click', this.kp, false);
			this.kp = null;
		}
	}
}

var PlayingIcon = function(track, track_id) {
	this.track = track;
	this.track_id = track_id;
    
	this.songSection = jQuery('div#login_placeholder');
	
	fixStyles();
	this.track.addObserver(this);
}

PlayingIcon.prototype = {
	playingIcon:      "data:image/gif;base64,R0lGODlhDAAMAOMAAP///9bW1s7Ozr29vbW1ta2traWlpZycnJSUlIyMjP///////////////////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBQAPACwAAAAADAAMAAAEOfAFQisNT5RdKDeCIXKbKB7oYQBAiiIwcrAxnCB0DiR8wvq7X+9H3A2DSB6ix+whBs3m4DFYNp+PCAAh+QQFBQAPACwAAAAADAAMAAAEOPAFQisNT5RdKDeCIXKbKB7oYaYoggDAAbt08gJ3nexw0vc7H0BIDP6GQERwGUQMmMzBY6BkOh8RACH5BAUFAA8ALAAAAAAMAAwAAAQ38AVCKw1PlF0oN4IhcpsoHuhhAECKIjBysDGc1LSd7GzS70AfQEgE9o7DW3B5GzCDg8cAwUREIwAh+QQFBQAPACwAAAAADAAMAAAEOPAFQisNT5RdKDeCIW4AUIjioR5GuapIjBylHCd2XSZ8n+y7HhDwIwqJQx7Cx8QNmr7BY7BkIqQRACH5BAUFAA8ALAAAAAAMAAwAAAQ48AVCKw1PlF0oN4IhcpsoHuhhAECKIjBysDGc1LSd7GzS9zsfQEgM/oZARHAZRAyYzMFjoGQ6HxEAIfkEBQUADwAsAAAAAAwADAAABDjwBUIrDU+UXSg3giFymyge6GGmKOIiBwC8boLI91wnvJz4vOAPMCwGfUiiTci0DZrCwWOAaCKkEQAh+QQFBQAPACwAAAAADAAMAAAEN/AFQisNT5RdKDeCIXKbKB7oYaYoggBA6s7JC9h0osMJz+s9QHAI9Al/CKASiBgsl4PHILlsPiIAIfkEBQUADwAsAAAAAAwADAAABDbwBUIrDU+UXSg3giFymygeBwCYaIsgqqu+CQy8r5rsie4DvB7wFyTqasFkbaAMDh4DhBLxjAAAIfkEBQUADwAsAAAAAAwADAAABDfwBUIrDU+UXSg3giFymyge6GGmKIIAQOrOyQvMdKLDCc/rPUBwCPQJfwigEogYLJeDxyC5bD4iACH5BAUFAA8ALAAAAAAMAAwAAAQ38AVCKw1PlF0oN4IhcpsoHuhhpiiCAEDqzskL2HaiJzAP+Dtgr7cb/oiIoLI2WAYHj0FSiYBGAAAh+QQBBQAPACwAAAAADAAMAAAEN/AFQisNT5RdKDeCIXKbKB7oYaYo4iIHALxuQstvoicyD/g7YK+3G/6IiKDSNlgGB49BUomARgAAOw==",
	pauseIcon:        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9sIChUnNAp8yqIAAACaSURBVCjPlY6xEYQwDATXjANRBqHacBm0oHZIaYlUIWVYmYlgfoDnn810c7q71FrD3du6rjwxDAOqmtKyLBeziAAQEYcWEagq2d1/GnfcnVxrPYRaK33fM44jAPM8X6blPcHMLqbP9J3uLJ5vM8PMiAgigu5p820DL3n9kKZpanfVd4gInar+na6q5FJKApq7861JRFBVSilpA8YfWUCFUTlWAAAAAElFTkSuQmCC",
	scrobbleFailIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAABUSURBVChTY2AAgp6enhggNgaxYQAkBmYDGX5A/B+Ib8EUAek5ULFumKLDSIrWoWtAV4RiGrKdMGMxFSDZCXIHsnXGMB+gOxKmaB3M/m4s3pwDkgQA8nFl3ZySPK8AAAAASUVORK5CYII=",
	scrobbleOkIcon:   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAABISURBVChTY2DAA3p6enhwSgMlY4C4igGbKqjkf5iCKpAAzCgkSRQFIA7ISBAGsUH4MFgTyBgkQVRJJGMPY+hEdz7ISLixSJIAalZKI71a5SQAAAAASUVORK5CYII=",

	start: function() {
		if (this.track.noScrobble) return;
		var t_ = this;

        jQuery('div#scrobbleStatus').hide();
    	icon = jQuery('div#playing_icon');

        if (icon.length)
            this.playingDiv = icon;

        else
		    this.playingDiv = $('<div id=playing_icon></div>');

		this.playingDiv.attr('style', 'float: right; width: 12px; height: 12px; margin: 3px 7px 4px 2px; background-position: center center; background-repeat: no-repeat;');
		this.playingDiv.bind('click', function(ev) {
			ev.stopPropagation();
			t_.toggleAdvanced();
		}, false);
		
		this.songSection.append(this.playingDiv);
	},
	toggleAdvanced: function() {
		if (!('adv' in this) || this.adv == null) {
			this.adv = new AdvancedControl(this.track, this.track_id, this.songSection);
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
		if (!pD.length) return;
		if (this.track.playing) {
			pD.css('backgroundImage', 'url("'+this.playingIcon+'")');
			pD.attr('title', 'До отправки ' + leftStr);
		} else {
			pD.css('backgroundImage', 'url("'+this.pauseIcon+'")');
			pD.attr('title', 'Пауза. До отправки ' + leftStr);
		}
	},
	
	removePlayingDiv: function() {
		if (this.playingDiv.length)
		    var p = this.playingDiv.remove();
	},
	
	createScrobbleStatus: function() {		
        var d = this.songSection;
		var sD = jQuery('div#scrobbleStatus');
		if (!sD.length)
        {
            sD = $('<div id=scrobbleStatus></div>')
			d.append(sD);
        }
		sD.attr('style', 'float: right; width: 12px; height: 12px; '+
			'margin: 3px 7px 0px 1px; background-position: center center; '+
			'background-repeat: no-repeat;');
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
		if (!e.length) return;
		
		this.updateTime();
		e.css('backgroundImage','url("'+this.scrobbleFailIcon+'")');
		e.css('cursor', '');
		e.attr('title', 'Отменено');
	},
	
	scrobble: function() {
		this.updateTime();
	},
	
	successScrobble: function() {
		var e = this.createScrobbleStatus();
		if (!e.length) return;
		
		e.css('backgroundImage', 'url("'+this.scrobbleOkIcon+'")');
		e.css('cursor', '');
		e.attr('title', 'Трек отправлен');
	},
	
	failScrobble: function(self, text) {
		var e = this.createScrobbleStatus();
		if (!e.length) return;
		
		e.css('backgroundImage', 'url("'+this.scrobbleFailIcon+'")');
		e.attr('title', 'Ошибка при отправке трека: '+text+'. Кликните, чтобы повторить.');
		e.css('cursor', 'hand');
		var t_ = this;
		e.bind('click', function(ev) { 
			e.parentNode.removeChild(e); 
			t_.track.scrobble(); 
		}, false);
	}
};

var InfoPanel = function(track, id) {
	this.track = track;
	this.track_id = id;

    this.updateHeight();

    div = jQuery("div#gp_wrap");
    
	var infoDiv = jQuery('div#lastfm_trackInfo');
    this.originalTitleElements = div.find('div.title_wrap');
    if (infoDiv.length == 0)
    {
        scrobblerIcon = jQuery('div#login_placeholder');
        $("<div></div>").insertBefore(scrobblerIcon);
        $('<div id=hide_trackInfo style="margin: 10px;">' + this.hideText + "</div>").insertBefore(scrobblerIcon);
        infoDiv = $("<div id=lastfm_trackInfo></div>");
        infoDiv.insertBefore(scrobblerIcon);
    }
    this.addHideClickListener();

	infoDiv.attr('style', 'background: #f7f7f7; display: none; padding: 10px; margin-top: 1em; position: static; width: 150px; margin: 0 -10px;');
	
	track.addObserver(this);
}

InfoPanel.prototype = {
	likeIcon:         "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAJCAYAAADkZNYtAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDGhQkBs+NxFgAAAEeSURBVBjTdY7PK4NxHMdfz/PwqYkt1nPyrS1LjYz8KMRBOfkDHN38E07KSfkvuCilXB0IqTmYGhbamrTLzBbfsezRs6+D2kx5Hd/vV+/eaCWuVrKvldS0kgOtZBJAK0loJbvVsX6jlexpJa6llWwzPLpCPAFPeaz7W0z1bdrqCV2YwTioCGTvIJPesapDrjGLS9ApAPCYg1QSJmYgGvvJ6p9Y58d00PDBsmkSjUFkACyLNnwf23y8b3GdAt9vFb/FLw8yacxrZcNZCzpHVF66KRVncRwI9bbEfBZODqFc2gTWmxNaybwdjZ01Al0wMg43V9henUbuYSpY8C4B2o5pJX3O3ELZfy7ihF385Gk4WPAq/IdWIrXVZaOVBP5239xdZgejJCRHAAAAAElFTkSuQmCC",
	likeInactiveIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAJCAYAAADkZNYtAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDGhUDJMHqXe4AAAEBSURBVBjTfZAxS8NwFMQvRh64OFjj4tscJKAISRHBil3aUVycXF1twVkxOokuOrl3EgqC36A41aHxS7goWOQSOwh/n0NpjYL+xruDd/dAlYAqt1QZUOWOKjEAUGWZKjfZyrxRpU2VAFRpsV62Tqdj3K5aFgZGldUsDIxbG0O9XjaqtLwsDKx33caI6OoESLtAtIa0eTzW4+YuJvHpUKQY+IFzmLD3/CJKGviPKGnA3vqnHlV8AOeYnTvAwiLS/aPv0GUCPD4Azp0BOBwbVKnkldBYi4ejarHlm0s2+g4AeMVzVJnx16uv7uUZfimA696Xpp8++n/2o4oM9naMKlO/vS9SHWvshcmXFgAAAABJRU5ErkJggg==",
    minHeightBase : 65,
    minHeight : 65,
    maxHeight : 290,
    hideOffsetHeight : 15,
    hideText : 'кратко',
    showText : 'подробно',
    originalTitleElements : null,
    curHeight : 0,

    addHideClickListener: function() {
        div = jQuery("div#gp_wrap");
        hideInfoDiv = div.find("div#hide_trackInfo");
        hideInfoDiv.bind('click', {panel : this}, function(event) {
                    panel = event.data.panel;
                    info = jQuery("div#lastfm_trackInfo");
                    button = jQuery("div#hide_trackInfo");
                    
                    if (info.is(":visible"))
                    {
                        info.hide();
                        InfoPanelMinimized = true;
                        button.text(panel.showText);
                    }
                    else
                    {
                        info.show();
                        InfoPanelMinimized = false;
                        button.text(panel.hideText);
                    }
                    panel.updateHeight();
            });
    },
	
    setPlayerHeight: function(height)
    {
        par = jQuery("div#gp");
        par.height(height);

        div = jQuery("div#gp_wrap");
        div.height(height);

        div = jQuery("div#gp_back");
        div.height(height);

        scrobbler.customPlayerHeight = height;
    },

    getHeightMargins: function(elem)
    {
        return elem.outerHeight(true) - elem.innerHeight();
    },

    updateRowCount: function(curWidth)
    {
        if (this.rowSumWidth + curWidth >= this.splitWidth)
        {
            this.rows += 1;
            this.rowSumWidth = 0;
        }

        this.rowSumWidth += curWidth;
    },

    updateHeight: function()
    {        
        if (this.albumart != undefined)
        {
            offset = 0;

            if (jQuery('div#gp_large').is(":visible"))
            {
                this.rowSumWidth = 0;
                this.curWidth = 0;
                this.rows = 0;
                this.splitWidth = jQuery('div#gp_small').width();
                
                if (this.textBox.is(":visible"))
                {
                    // calculating actual size of tags div 
                    objs = this.textBox.find("b");
                    for (i = 0; i < objs.length; i++)
                        this.updateRowCount(objs.eq(i).width());

                    objsa = this.textBox.find("a");
                    objsi = this.textBox.find("i");
                    for (i = 0; i < Math.max(objsa.length, objsi.length); i++)
                    {
                        w = 0;
                        if (i < objsi.length)
                            w += objsi.eq(i).width();
                        if (i < objsa.length)
                            w += objsa.eq(i).width();
                        this.updateRowCount(w);
                    }
                }

                this.rowSumWidth = 0;
                this.updateRowCount(this.album.find("a").width());                
                this.rowSumWidth = 0;
                this.updateRowCount(this.listenCount.find("my").width());                

                this.rowSumWidth = 0;
                div = jQuery("div#login_placeholder");
                objs = div.find("*");
                w = 0;
                for (i = 0; i < objs.length; i++)
                    w += objs.eq(i).outerWidth(true);

                this.updateRowCount(w);                

                // add extra space (rows)
                hideElem = jQuery("div#hide_trackInfo");
                rowHeight = hideElem.height() - this.getHeightMargins(hideElem);

                if (this.rows)
                    offset += this.rows * rowHeight - this.getHeightMargins(this.textBox);

                this.minHeight = this.minHeightBase - this.hideOffsetHeight;
            }

            else
                this.minHeight = this.minHeightBase - this.hideOffsetHeight;

            this.maxHeight = this.albumart.outerHeight(true) + this.album.outerHeight(true) +
                             this.textBox.outerHeight(true) + this.listenCount.outerHeight(true) + this.minHeightBase - this.hideOffsetHeight + offset;
        }

        else
            this.maxHeight = this.minHeight + this.hideOffsetHeight;

        loginHeight = jQuery("div#login_placeholder").outerHeight(true);
        if (InfoPanelMinimized)
            this.setPlayerHeight(this.minHeight + loginHeight);

        else
            this.setPlayerHeight(this.maxHeight + loginHeight);
    },

	start: function() {
		if (!this.info) {
			var t_ = this;
			this.track.getInfo(function(info) { t_.info = info; t_.updateInfo(); });
		}
	},

	updateInfo: function() {
        //log_("updateInfo");
		infoDiv = jQuery("div#lastfm_trackInfo");
		if (!infoDiv) return;
        infoDiv.attr('style', 'display: block;');
		var info = this.info;

        albumart = $('<div id=lastfm_albumart></div>');
        albumimg = $('<img></img>');
		if (info.album != undefined && info.album.image != undefined)  {
			var iurl = info.album.image[0]['#text'];
			var n = info.album.image.length;
			for (var i = 0; i < n; ++i) {
				if (info.album.image[i]['size'] == 'medium')  {
					iurl = info.album.image[i]['#text'];

				}
			}

            albumimg.attr('style', 'max-width: 150px;');
            albumimg.attr('src', iurl);
            albumimg.attr('alt', 'album art');

            albumimg.appendTo(albumart);
			albumart.attr('style', 'text-align: center; margin-top: .5em;');
		}

		if (info.toptags.tag  != undefined) {
			n = info.toptags.tag.length;
            if (n)
    			tags_s = $('<div><b>Теги: </b></div>');
            else
    		    tags_s = $('<div></div>');

			for (var i = 0; i < n; ++i) {
				var tag = info.toptags.tag[i];                
                el = $('<a>' + tag.name.replace(/\s/g, '&nbsp;') + '</a>');
                el.attr('style', "color: #ffffff");
                el.attr('href', tag.url);
                el.attr('target', "_blank");
				tags_s.append(el);

                // <i></i> hack for detecting height of tags
                if (i != n-1)
                    tags_s.append($('<i>,</i><i> </i>'));
			}
		}

        else
		    tags_s = $('<div></div>');

        userLoved = jQuery('img#lastfm_userloved');
        if (!userLoved.length)
        {
            userLoved = $('<img id=lastfm_userloved></img>');
            jQuery('div#login_placeholder').append(userLoved);
            userLoved.attr('alt', '');
        }

		if  (info.userloved != undefined)
        {
            if (info.userloved == 1)
            {
                userLoved.attr('src', this.likeIcon);
                userLoved.attr('title', "Любимая");
            }
            else
                userLoved.attr('src', this.likeInactiveIcon);

			userLoved.attr('style', "float: right; margin: 4px 2px 4px 2px;");
        }
		
		var artist = '', album = '', title = '';
		if (info.artist != undefined)
			artist = '<a style="color: #ffffff" href="'+info.artist.url+'" target="_blank">'+info.artist.name+'</a>';

		title = '<a style="color: #ffffff" href="'+info.url+'" target="_blank">'+info.name+'</a>'

        album = $('<div id=lastfm_album></div>');
		if (info.album != undefined)
        {
            album.attr('style', "margin-top: 0; text-align: center;")

            albumRef = $('<a>' + info.album.title + '</a>');
            albumRef.attr('style', "color: #ffffff");
            albumRef.attr('href', info.album.url);
            albumRef.attr('target', "_blank");
            album.append(albumRef);
        }

        this.originalTitleElements.each(function(index) {
            tmp = $(this).find('div.fl_l');
            if (tmp.length)
                tmp.html('<b>' + artist + '</b> - ' + title + '\n');

            else
                $(this).html('<b>' + artist + '</b>\n<br>' + title + '\n');
        });

        textBox = $('<div id=lastfm_tags></div>');
        textBox.attr('style', 'margin-top: .5em; text-align: center;');
        textBox.append(tags_s);

        listenCount = $('<div id=lastfm_playcount><my>' + info.playcount + ' прослушиваний</my></div>');
        listenCount.attr('style', 'text-align: center;');

        infoDiv.empty();

        this.albumart = albumart;
        this.album = album;
        this.textBox = textBox;
        this.listenCount = listenCount;

        infoDiv.append(albumart);
        infoDiv.append(album);
        infoDiv.append(textBox);
        infoDiv.append(listenCount);

        if (InfoPanelMinimized)
    		infoDiv.hide();

        this.updateHeight();

        albumimg.bind('load', {panel : this}, function(event) {
                p = event.data.panel;
                p.updateHeight();
        });

        //log_("updateInfoEnd", infoDiv);
	},
	stop: function() {
        jQuery("div#lastfm_trackInfo").hide();
        jQuery("img#lastfm_userloved").hide();
        jQuery("div#hide_trackInfo").unbind('click');
        this.updateHeight();
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
    started : false,
    player : null,
    isPaused : false,
	
	start: function(rid) {
        //log_("scrobbler start");
        t = jQuery('div#scrobbler_icon');

        if (t.length == 0)
	        setTimeout(function() { addScrobblerIcon(); }, 0);
        
        // pause feature?
        if (rid != this.cid)
    		this.stop();

		if (rid in this.tracks)
            return;

		this.cid = rid;
        
        var artist = unesc(this.player.lastSong[5]);
        var title  = unesc(this.player.lastSong[6]);
        var len    = this.player.lastSong[3];

        log_('artist=' + artist + ' title=' + title + ' len=' + len);

		var track = new Track(artist, title, len);
		this.tracks[this.cid] = track;
		
		new PlayingIcon(track, this.cid);
        //log_('pre add info panel loc='+location.href);
		
	    S.fm.InfoPanel = new InfoPanel(track, this.cid);

	    track.start();
    
        if(this.isPaused)
    	    track.pause();
	},
	stop: function() {
//        log_("scrobbler stop", this.cid);
		if (this.cid in this.tracks)
        {
    		this.tracks[this.cid].stop();
		    delete this.tracks[this.cid];
        }
		
        this.cid = null;
	},
	play: function(id) {
        this.isPaused = false;
        //log_("scrobbler play");
		if (id in this.tracks)
			this.tracks[id].play();
	},
	pause: function(id) {
        this.isPaused = true;
        //log_("scrobbler pause");
		if (id in this.tracks)
			this.tracks[id].pause();
	}
	
};

var getWindow = function(doc) {
	if (!doc)
		doc = document;
		
      if (is_chrome) {
          if (GOOGLE_CHROME_WINDOW == null)
          {
              div = jQuery("div#mainwindowhack");
              if (div.length == 0)
              {
                 div = document.createElement("div");
                 div.setAttribute("id", "mainwindowhack");
                 div.setAttribute("onclick", "return window;");
                 GOOGLE_CHROME_WINDOW = div.onclick();
              }
              
              else
                GOOGLE_CHROME_WINDOW = div.get(0).onclick();
          }

          return GOOGLE_CHROME_WINDOW;
      }
        
	if (navigator.userAgent.indexOf('WebKit') >= 0) {//WebKit Gecko
		var win = doc.defaultView;
		var scriptElement = doc.createElement('script');
		scriptElement.appendChild(doc.createTextNode('document.parentWindow=window'));
		doc.documentElement.appendChild(scriptElement);
		doc.documentElement.removeChild(scriptElement);
		win = doc.parentWindow;
        //log_("ret win");
		return win;
	}
	
	if (typeof unsafeWindow != 'undefined') {
        //log_("ret unsafe");
		return unsafeWindow;
	}

	if (doc.parentWindow) {
        //log_("doc par");
		return doc.parentWindow;
	}
}

var hookVkontakte = function() {
	var win = getWindow(document);
    //log_("location");

    var player = null;
	if (typeof win == 'undefined' || typeof win.audioPlayer == 'undefined')
    {
        // waiting for player loaded
        setTimeout(function(){hookVkontakte();}, PLAYER_SEARCH_INTERVAL);
    }

    // player loaded
    else
    {
        player = win.audioPlayer;
        //log_(player);
        scrobbler.player = player;
	
	    var showPlayerHandler = function(id) {
//            log_("showPlayerHandler");
		    var r = arguments.callee.janeth_original ?
			    arguments.callee.janeth_original.apply(this, arguments) : undefined;

			scrobbler.isPause = false;
		    //log_("args", arguments, "id", id);
		    if (S.fm.active()) {
			    setTimeout(function(){scrobbler.start(id);}, 0);
		    }
		
		    return r;
	    };
	
	    var hidePlayerHandler = function(id) {
//            log_("hidePlayerHandler");
		    //log_("args", arguments, "id", id);
		    var r = arguments.callee.janeth_original ?
			    arguments.callee.janeth_original.apply(this, arguments) : undefined;
		
		    if (S.fm.active())
		    {
			    setTimeout(function(){scrobbler.stop();}, 0);
		    }
		
		    return r;
	    };
	
	    var changeStateHandler = function(id, state, value) {
//            log_("changeStateHandler");
		    //log_("args", arguments, "id", id);
		    var r = arguments.callee.janeth_original ?
			    arguments.callee.janeth_original.apply(this, arguments) : undefined;
			
			scrobbler.isPaused = false;
		    if (S.fm.active()) {
			    switch (id) {
			    case true:
				    setTimeout(function(){scrobbler.pause(scrobbler.cid);}, 0);
				    break;
                default :
				    setTimeout(function(){scrobbler.play(scrobbler.cid);}, 0);
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
	
	    var playbackHandler = function() {
            //log_("playbackHandler", scrobbler.started, arguments);

            // hack on search player (scrobbling doesn't start)
            if (!scrobbler.started)
            {   
                scrobbler.started = true;
                setTimeout(function(){if (S.fm.active()) { setTimeout(function(){scrobbler.start(player.id);}, 0);} }, 0);
            }

		    return arguments.callee.janeth_original ?
			    arguments.callee.janeth_original.apply(this, arguments) : undefined;
	    }

	    var startDragHandler = function() {
            jQuery("div#hide_trackInfo").unbind('click');
            scrobbler.aboveHide = arguments[0].originalTarget == jQuery("div#hide_trackInfo").get(0);
            
            scrobbler.startDragPlayerX = arguments[0].screenX;
            scrobbler.startDragPlayerY = arguments[0].screenY;

	        return arguments.callee.janeth_original ?
			        arguments.callee.janeth_original.apply(this, arguments) : undefined;
	    }

	    var dragHandler = function() {
            scrobbler.aboveHide = false;
            size = scrobbler.customPlayerHeight;
            borderY = $(window).height();

            dy = arguments[0].screenY - scrobbler.startDragPlayerY;
            toBottom = borderY - (scrobbler.player.pos.t + dy + size);

//            log_("dragHandler", arguments, arguments[0].layerY, arguments[0].screenY, arguments[0].clientY, toBottom, dy);

            if (toBottom <= 0)
            {
                t = borderY - scrobbler.player.pos.t - size + scrobbler.startDragPlayerY - arguments[0].screenY;
                arguments[0].clientY += t;
            }

            return arguments.callee.janeth_original ?
		        arguments.callee.janeth_original.apply(this, arguments) : undefined;
	    }

	    var endDragHandler = function() {
            if (arguments[0].screenX == scrobbler.startDragPlayerX && arguments[0].screenY == scrobbler.startDragPlayerY && scrobbler.aboveHide)
			    setTimeout(function(){S.fm.InfoPanel.addHideClickListener(); jQuery("div#hide_trackInfo").click();}, 0);

            else
			    setTimeout(function(){S.fm.InfoPanel.addHideClickListener();}, 0);

	        return arguments.callee.janeth_original ?
			        arguments.callee.janeth_original.apply(this, arguments) : undefined;
	    }

        startDragHandler.janeth_original = player.startDrag;
	    player.startDrag = startDragHandler;
	
	    dragHandler.janeth_original = player.dragPlayer;
	    player.dragPlayer = dragHandler;
	    
        endDragHandler.janeth_original = player.endDrag;
	    player.endDrag = endDragHandler;
	
	    showPlayerHandler.janeth_original = player.operate;
	    player.operate = showPlayerHandler;
	
	    hidePlayerHandler.janeth_original = player.stop;
	    player.stop = hidePlayerHandler;
	
	    changeStateHandler.janeth_original = player.playback;
	    player.playback = changeStateHandler;

        // hack on search player (scrobbling doesn't start)
	    playbackHandler.janeth_original = player.onPlayProgress;
	    player.onPlayProgress = playbackHandler;

        scrobbler.started = false;

	    if (win.updateResults) {
		    updateResultsHandler.janeth_original = win.updateResults;
		    win.updateResults = updateResultsHandler;
	    }

	    setTimeout(function() { addScrobblerIcon(); }, 0);
    }
}

var addScrobblerIcon = function() {
    new ScrobblerIcon(S.fm);
    S.fm.addObserver(
	    { scrobblerDisabled: function() {
		    scrobbler.stop();
	    } }
    );
    S.fm.addObserver(
	    { scrobblerReady: function() {
		    S.fm.InfoPanel.updateHeight();
	    } }
    );
}


if ((location.hostname == 'vkontakte.ru' || location.hostname == 'vk.com') && location.href.indexOf('notifier.php') == -1) {
	// vkontakte part
	// Hook up to vkontakte's audio object
    //log_("starting hook");

	hookVkontakte();
}

InfoPanelMinimized = false;

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
        scrobbler.start(scrobbler.player.id);
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

        if (this.state == 2) {
            return; // already logged in
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
        //log_("getTrackInfo", this.username);
		this.conn.runWS(this.cdata(), 'track.getInfo', 
			{ artist: rtrack.artist, track: rtrack.title, mbid: (rtrack.mbid?rtrack.mbid:''), autocorrect : '1', username: this.username },
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
	stub_url: location.href,
	
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

if (is_opera)
{
    log_('opera detected adding jquery');
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js';
    document.body.appendChild(script);
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
	var loginTime = Requester.getArguments();
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
}

// load jQuery and execute the main function
addJQuery(main);


