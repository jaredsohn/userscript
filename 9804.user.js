// ==UserScript==
// @namespace     http://riddle.pl/-/greasemonkey/joggerpl.blacklist.user.js
// @name          JoggerPL Blacklist
// @description   Blacklista dla strony glownej Jogger.pl
// @version				0.3.2
// @include       http://jogger.pl/
// @include       http://jogger.pl/?page=*
// ==/UserScript==

var setValue, getValue, removeValue;

if (window.globalStorage) {
	var glStorage = globalStorage.namedItem(document.domain);	
	setValue = function(k, v) { glStorage.setItem(k, v); };
	getValue = function(k, f) { var d = glStorage.getItem(k); return (d) ? d.value : f; 	};
	remValue = function(k) { glStorage.removeItem(k); };
} else if ((typeof GM_setValue != 'undefined') && (typeof GM_getValue != 'undefined')) {
	setValue = function(k, value) { GM_setValue(ns + k, value); };	
	getValue = function(k, f) { var d = GM_getValue(ns + k, f); return (d) ? d : f; };
	remValue = function(k) { GM_setValue(ns + k, ''); }	
	removeValue = null;	
} else {	
	setCookie = function(n, v, s) { if (!n) { return; }; document.cookie = escape(ns + n) + '=' + escape(v) + ';expires=' + (new Date((new Date()).getTime() + (1000 * s))).toGMTString() + ';path=/'; };	
	setValue = function(k, v) { setCookie(k, v, 31536000); };	
	getValue = function(k, f) { s = (new RegExp(ns + k + '=([^;]*)')).exec(document.cookie + ';');
		if (s) { return unescape(s[1]); } else { return f; }};	
	remValue = function(k) { setCookie(k, '', -10); }	
}

function $(o) { if (typeof unsafeWindow != 'undefined') { return unsafeWindow.jQuery(o); } 
else { return window.jQuery(o); }}
function clean(s) {
	return s.replace(/^\s+|\s+$/g, '').replace(/\s\s+/g, ' ').replace(/\t+/g, '').toLowerCase();
}

var l18n = {
	filterName: 'Preferencje',
	filterUsers: 'Filtrowani u\u017Cytkownicy',
	filterDelim: 'Oddzielaj spacjami',
	filterSave: 'Zapisz'
}

var saved = getValue('gmkBlacklistUsers', '');
var form = document.createElement('form');
$(form)
	.attr('id', 'gmkBlacklist')
	.css('margin-top', '30px')
	.append('<fieldset class="padding divide"><div class="grid"><label class="xalign" for="">' + l18n.filterUsers +' <em>(' + l18n.filterDelim + ')</em></label><div class="fields"><textarea id="gmkBlacklistUsers" class="edit" cols="40" rows="3">' +  saved + '</textarea></div></div><div class="indent"><div class="fields"><input type="submit" class="submit" value="' + l18n.filterSave + '" /></div></div></fieldset>')
	.hide();
	
saved = saved.split(' ');
	
form.addEventListener('submit', function(e) { 
	var users = clean($('#gmkBlacklistUsers').val());
	$('#gmkBlacklistUsers').val(users);
	setValue('gmkBlacklistUsers', users);
	window.location.reload();
	e.preventDefault(); 
}, false);

var li = document.createElement('li');
$(li).css({ 'float': 'right', 'margin-right' : '0'});
var link = document.createElement('a');
link.setAttribute('href', '#');
link.appendChild(document.createTextNode(l18n.filterName));
link.addEventListener('click', function(e) {
	$(form).toggle();
	e.preventDefault();
}, false);
li.appendChild(link);

$('#nav').append(li);
$('#sidebar').prepend(form);
	
var entries = $('div.entry');

entries.each(function(i) {
	function inArr(item, array) {
		for (var i = 0; i < array.length; i++) {
			if (item == array[i]) {
				return true;
			}
		}
		return false;
	}
	var current = $(this).find('.header p a').slice(0,1);
	if (inArr(current.text(), saved)) {
		$(this).hide();
		if (i == entries.size() - 1) {
			entries.filter(':eq(' + (i - 1) + ')').find('a.next').remove();
		} else if (i > 0) {
			var arrow = entries.filter(':eq(' + (i - 1) + ')').find('a.next').get(0);
			arrow.onclick = function(){};
			arrow.addEventListener('click', function(e) {
				e.target.setAttribute('href', '#' + entries.slice(i, i+1).attr('id'));
				entries.slice(i, i+1).ScrollTo('normal');
				e.preventDefault();
			}, false);
		}
	} else {
		var block = document.createElement('span');
		
		block.addEventListener('mouseover', function(e) { 
			$(e.target).css('color', '#de1818');
		}, false)
		block.addEventListener('mouseout', function(e) {
			$(e.target).css('color', '#ee4e4e');
		}, false)
		block.addEventListener('click', function(e) {
			$('#gmkBlacklist').show();
			$('#gmkBlacklistUsers').val(clean($('#gmkBlacklistUsers').val()) + ' ' + current.text());
		}, false);
		
		$(block).text('x').css({
			'float': 'left',
			'padding': '0.21em',
			'font-weight': 'bold',
			'color': '#ee4e4e',
			'cursor': 'pointer'
		});
		current.after(block)
	}
});
