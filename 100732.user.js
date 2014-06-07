// ==UserScript==
// @name           Partis Enhancement Script
// @version        1.1
// @namespace      partis
// @description    Provides various fixes and enhancement to Partis.
// @include        http://*partis.si/*
// @require        http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$(document).ready(function(){
	
	// FUNCTIONS
	
	var currentURL = parseURL(window.top.location).path;
	
	function setCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}

	function getCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	
	function parseURL(url) {
		var a =  document.createElement('a');
		a.href = url;
		return {
			source: url,
			protocol: a.protocol.replace(':',''),
			host: a.hostname,
			port: a.port,
			query: a.search,
			params: (function(){
				var ret = {},
					seg = a.search.replace(/^\?/,'').split('&'),
					len = seg.length, i = 0, s;
				for (;i<len;i++) {
					if (!seg[i]) { continue; }
					s = seg[i].split('=');
					ret[s[0]] = s[1];
				}
				return ret;
			})(),
			file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
			hash: a.hash.replace('#',''),
			path: a.pathname.replace(/^([^\/])/,'/$1'),
			relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
			segments: a.pathname.replace(/^\//,'').split('/')
		};
	}
	
	// FEATURE: FLAG TORRENTS AS VISITED
	
	if (currentURL.indexOf('torrent/brskaj') !== -1) {
	
		getVisitedFlagTime = function() {
			if (getCookie('partis-es-flags') != null) {
				return getCookie('partis-es-flags');
			} else {
				return 0;
			}
		}
		
		torrentsListLoading = setInterval(function(){
			torrentFirstListek = $('div[name=torrrow]:first');
			if (torrentFirstListek.length > 0 && torrentFirstListek.attr('refresh') !== '1') {
				torrentsCheckFlag();
			}
		}, 1000);
		
		torrentsCheckFlag = function() {
			$('.listek, .listeknovo').each(function(){
				currentElement = $(this);
				currentElementID = currentElement.attr('id');
				
				tempTorrentHolder  = '';
				tempTorrentHolder += '<div class="listek" id="' + currentElement.attr('id') + '"';
				tempTorrentHolder += ' name="' + currentElement.attr('name') + '"';
				tempTorrentHolder += ' ctime="' + currentElement.attr('ctime') + '">';
				tempTorrentHolder += currentElement.html();
				tempTorrentHolder += '</div>';
				
				$(tempTorrentHolder).insertAfter('#' + currentElementID);
				currentElement.remove();
				currentElement = null;
				
				currentElement = $('#' + currentElementID);
				if (parseInt(currentElement.attr('ctime')) > getVisitedFlagTime()) {
					currentElement.addClass('listeknovo').removeClass('listek');
				} else {
					currentElement.removeClass('listeknovo').addClass('listek');
				}
			});
			
			if ($('div[name=torrrow]:first').attr('refresh') !== '1') {
				$('div[name=torrrow]:first').attr('refresh', '1');
			}
		}
		
		torrentMarkNewFlagDate = function() {
			currentTimestamp = Math.round((new Date()).getTime() / 1000);
			setCookie('partis-es-flags', currentTimestamp, 365);
		}
		
		torrentVisitedFlagInit = function() {	
			$('#nupdate').html('');
			$('<a/>', {
				text: '[ Počisti oznako novo ]',
				href: '#',
				click: function(el) {
					torrentMarkNewFlagDate();
					$('div[name=torrrow]:first').removeAttr('refresh');
					torrentsCheckFlag();
				}
			}).appendTo('#nupdate');
		}
		
		torrentVisitedFlagInit();
	
	}
	
	// FEATURE: DOCUMENT TITLE FIXED
	
	setNewPartisTitle = function(text) {
		document.title = text + ' :: Partis';
	}
	
	setTitleFromContent = function() {
		newTitle = document.getElementsByClassName('h11')[0].innerHTML.replace(/(<([^>]+)>)/ig, '');
		if (newTitle != '' || newTitle != null) {
			setNewPartisTitle(newTitle.replace(/\./gi, ' '));
		}
	}
	
	if (currentURL.indexOf('prva') != -1) setNewPartisTitle('Naslovnica');
	if (currentURL.indexOf('skupnost/forum') != -1) setNewPartisTitle('Forum');
	if (currentURL.indexOf('forums') != -1) setNewPartisTitle('Forum');
	if (currentURL.indexOf('topics') != -1) setNewPartisTitle('Forum');
	if (currentURL.indexOf('categories') != -1) setNewPartisTitle('Forum');
	if (currentURL.indexOf('skupnost/klepet') != -1) setNewPartisTitle('Klepet');
	if (currentURL.indexOf('skupnost/uporabniki') != -1) setNewPartisTitle('Seznam uporabnikov');
	if (currentURL.indexOf('skupnost/lestvice') != -1) setNewPartisTitle('Naslovnica');
	if (currentURL.indexOf('skupnost/sale') != -1) setNewPartisTitle('Šale');
	if (currentURL.indexOf('profil/uredi') != -1) setNewPartisTitle('Urejanje profila');
	if (currentURL.indexOf('profil/posta') != -1) setNewPartisTitle('Moja pošta');
	if (currentURL.indexOf('torrent/brskaj') != -1) setNewPartisTitle('Seznam torrentov');
	
	if (
		currentURL.indexOf('torrent/podrobno') != -1 ||
		currentURL.indexOf('profil/prikazi') != -1
	) {
		setTitleFromContent();
	}
	
	// FEATURE: AUTO LOGIN
	
	if (currentURL.indexOf('prijava') === -1) {
	
		autoLoginFormHTML  = '';
		autoLoginFormHTML += '<div style="float: right; margin: 0 5px 0 0; padding: 0 5px 5px 5px; border: 4px solid #383939; background-color: #191a1a; width: 100px;">';
		autoLoginFormHTML += '<a href="#" id="alpecsave" style="float: right; font-size: 10px; color: #fff; text-decoration: none; background-color: #383939; padding: 0 5px;">Shrani</a>';
		autoLoginFormHTML += '<div style="color: #8c8c8c; font-size: 10px; line-height: 16px; padding: 0 0 2px 0;">Autoprijava</div>';
		autoLoginFormHTML += '<input type="password" id="alpesuser" style="background-color: #191a1a; border: 1px solid #8c8c8c; padding: 1px; margin: 0 0 1px 0; width: 97px; font-size: 11px; color: #8c8c8c;" />';
		autoLoginFormHTML += '<input type="password" id="alpespass" style="background-color: #191a1a; border: 1px solid #8c8c8c; padding: 1px; margin: 0; width: 97px; font-size: 11px; color: #8c8c8c;" />';
		autoLoginFormHTML += '</div>';
		
		$(autoLoginFormHTML).insertAfter('.copyright :first');
		
		if(getCookie('partis-es-autologin') == null) {
			setCookie('partis-es-autologin', '**', 365);
		}
		
		autoLoginCreds = getCookie('partis-es-autologin').split('**');
		$('#alpesuser').val(autoLoginCreds[0]);
		$('#alpespass').val(autoLoginCreds[1]);
		
		$('#alpecsave').click(function(){
			cookieValue = $('#alpesuser').val() + '**' + $('#alpespass').val();
			setCookie('partis-es-autologin', cookieValue, 365);
			alert('Shranjeno.');
			return false;
		});
	
	}
	
	if (currentURL.indexOf('prijava') !== -1) {
		autoLoginCreds = getCookie('partis-es-autologin').split('**');
		if (autoLoginCreds[0] != '' && autoLoginCreds[1] != '') {
			document.getElementsByName('user[username]')[0].value = autoLoginCreds[0];
			document.getElementsByName('user[password]')[0].value = autoLoginCreds[1];
			document.getElementById('forma').submit();
			$('body').html('<div style="color: #8c8c8c; font-size: 18px; font-weight: bold; background-color:#191a1a; padding: 300px 0 0 0;">Prijavljam ...</div>');
		}
	}

});