// ==UserScript==
// @name        Wykop.pl - SFW
// @namespace   SFW@wykop.pl
// @include     http://www.wykop.pl/*
// @version     1.0
// @updateURL   https://userscripts.org/scripts/source/181872.meta.js
// @icon        http://s3.amazonaws.com/uso_ss/icon/181872/large.png
// @grant       none
// ==/UserScript==


(function(){
	"use strict"
	var nsfwList = ['#nsfw', '#ladnapani', '#cycki'];
	
	var win = (typeof unsafeWindow !== 'undefined')? unsafeWindow : window;
	if (typeof jQuery === 'undefined') {var jQuery = win.jQuery, $ = jQuery;}

	function blackList(value) {
		var type, data = {'__token': win.token, 'hash': win.hash, 'blacklist': {}};
		if (value.charAt(0)==='@')       {type = 'user'; value = value.substr(1);}
		else if (value.charAt(0)==='#')  {type = 'hashtag'; value = value.substr(1);}
		else if (value.indexOf('.') > 0) {type = 'domain';}
		else                             {return $();} // ?

		data.blacklist[type] = value;
		return $.ajax({
			url:	win.www_base+'ajax/profile/blacklistadd/hashtags',
			type:  'POST',
			data:  data
		});
	};

	function blackListRemove(value) {
		var type, data = {'__token': win.token, 'hash': win.hash};
		if (value.charAt(0)==='@')       {type = 'users'; value = value.substr(1);}
		else if (value.charAt(0)==='#')  {type = 'hashtags';}
		else if (value.indexOf('.') > 0) {type = 'domains';}
		else                             {return $();} // ?

		data.value = value;
		return $.ajax({
			url:	win.www_base+'ajax/profile/blacklistremove/'+type,
			type:  'POST',
			data:  data
		});
	};

	function setPlus18(show) {
		var when = [], onfail = function() {alert('Operacja nie powiodła się.');}; show = (show !== false);
		for (var i = 0; i < nsfwList.length; ++i) {
			when.push( (show? blackListRemove : blackList)(nsfwList[i]) );
		}
		$.when.apply(this, when).fail(onfail).done(function(){
			$.getJSON(win.www_base+'ajax/profile/option/name/plus18/value/'+(show? '1':'0')+'/hash/'+win.hash).fail(onfail)
			.done(function(r) {
				if (r.plus18 !== show) return onfail();
				win.location.reload();
			});
		});
	};

	var show18PlusButton = null;
	function fixShow18Button() {
		if (!show18PlusButton) {
			show18PlusButton = $('#header-con .quickpoint.avatar a[href*="/ustawienia/"]').parent()
				.after('<li class="brtope8"><a class="block lheight20 boxh tdnone pding3_10"></a>')
				.next().find('a');
		}
		if (win.showPlus18) {
			show18PlusButton.text('ukryj 18+').attr('title', 'Ukrywaj treści 18+').on('click', function() {setPlus18(false);});
		} else {
			show18PlusButton.text('pokaż 18+').attr('title', 'Pokazuj treści 18+').on('click', function() {setPlus18(true);});
		}
	};
	fixShow18Button();

})();