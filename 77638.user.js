// ==UserScript==
// @name iCrap
// @namespace tuxFTW
// @description Removes mentions of Apple from a webpage
// @include *
// ==/UserScript==

/*
iCrap
Bookmarklet to block mentions of Apple and their products.

Save as blockapple.js

This script must be served via some form of server (browsers such as firefox will not execute locally hosted javascript). 

For firefox users, POW add-on works. 
user@host:~$ ln -s blockapple.js ~/.mozilla/firefox/*.default/htdocs/

Example: http://i48.tinypic.com/4vp92o.jpg

Bookmarklet trigger:

javascript:function%20antiapple(u)%7Bvar%20s=document.createElement('script');s.setAttribute('language','JavaScript');s.setAttribute('src',u);document.body.appendChild(s);%7Dantiapple('http://localhost:6670/scripts/blockapple.js');

Modified by tuxFTW
Derived from Greg Leuch's code: <http://www.gleuch.com>
MIT License - http://creativecommons.org/licenses/MIT
*/


Array.prototype.in_array = function(p_val, sensitive) {for(var i = 0, l = this.length; i < l; i++) {if ((sensitive && this[i] == p_val) || (!sensitive && this[i].toLowerCase() == p_val.toLowerCase())) {return true;}} return false;};function rgb2hex(rgb) {rgb = rgb.replace(/\s/g, "").replace(/^(rgb\()(\d+),(\d+),(\d+)(\))$/, "$2|$3|$4").split("|"); return "#" + hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);} function hex(x) {var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8","9", "A", "B", "C", "D", "E", "F"); return isNaN(x) ? "00" : hexDigits[(x-x%16)/16] + hexDigits[x%16];}var $_ = false, $anti_apple = document.createElement('script'), local = true;$anti_apple.src = 'http://code.jquery.com/jquery-1.4.2.js';$anti_apple.type = 'text/javascript';document.getElementsByTagName('head')[0].appendChild($anti_apple);function anti_apple_wait() {if ((local && typeof(jQuery) == 'undefined') || (!local && typeof(unsafeWindow.jQuery) == 'undefined')) {window.setTimeout(anti_apple_wait,100);} else {anti_apple_start(local ? jQuery : unsafeWindow.jQuery);}}function anti_apple_start($_) {$_.fn.reverse = function(){return this.pushStack(this.get().reverse(), arguments);};(function($_) {$_.anti_apple = function(data, c) {if (!$_.anti_apple.settings.finish) $_.anti_apple.init();$_(data).anti_apple(c);if (!$_.anti_apple.settings.finish) $_.anti_apple.finish();};$_.fn.anti_apple = function(c) {return this.filter(function() {return $_.anti_apple.filter(this);}).each(function() {$_.anti_apple.scrub(this, c);});};$_.extend($_.anti_apple, {  settings : {hide_bg : true, search: /(justin(\s|\-|\_))?(drew(\s|\-\_))?(itunes|steve jobs|apple|ipod|iphone|iPhone|itouch|ipad|mac|osx|macbook|safari|twitter)/img, replace: '<span class="anti_apple" style="color: %C; background-color: %C;">$1$2$3$4$5</span>', starred: '****** ******', init : false, finish : false},pluck : function(str) {return str.replace(/(jobs)(itunes|steve jobs|apple|ipod|iphone|iPhone|itouch|ipad|mac|osx|macbook|safari|twitter)/img, '****** ******').replace(/(steve\sjob\s)(itunes|steve jobs|apple|ipod|iphone|iPhone|itouch|ipad|mac|osx|macbook|safari|twitter)/img, '****** **** ******').replace(/(itunes|steve jobs|apple|ipod|iphone|iPhone|itouch|ipad|mac|osx|macbook|safari|twitter)/img, '******');},filter : function(self) {if (self.nodeType == 1) {var tag = self.tagName.toLowerCase();return !(self.className.match('anti_apple') || tag == 'head' || tag == 'img' || tag == 'textarea' || tag == 'option', tag == 'script');} else {return true;}},scrub : function(self, c) {$_(self).css({'text-shadow' : 'none'});if (self.nodeType == 3) {if (self.nodeValue.replace(/\s/ig, '') != '') {if (!c) c = $_(self).parent() ? $_(self).parent().css('color') : '#000000';text = self.nodeValue.replace($_.anti_apple.settings.search, $_.anti_apple.settings.replace.replace(/\%C/mg, c) );$_(self).after(text);self.nodeValue = '';}} else if (self.nodeType == 1) {c = rgb2hex($_(self).css('color'));if ($_(self).children().length > 0) {$_.anti_apple($_(self).contents(), c);} else if ($_(self).children().length == 0) {text = $_(self).html().replace($_.anti_apple.settings.search, $_.anti_apple.settings.replace.replace(/\%C/mg, c) );$_(self).html(text);}}},init : function() {$_.anti_apple.settings.init = true;},finish : function() {$_(document).each(function() {this.title = $_.anti_apple.pluck(this.title);});$_('img, input[type=image]').each(function() {if ($_(this).attr('alt').match($_.anti_apple.settings.search) || $_(this).attr('title').match($_.anti_apple.settings.search) || $_(this).attr('src').match($_.anti_apple.settings.search)) {var r = $_(this), w = r.width(), h = r.height(), c = rgb2hex($_(this).css('color'));r.css({background: c, width: r.width(), height: r.height()}).attr('src', 'http://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png').width(w).height(h);}});$_('input[type=text]').each(function() {if ($_(this).val().match($_.anti_apple.settings.search) ) $_(this).val( $_.anti_apple.pluck($_(this).val()) );});$_('textarea, option').each(function() {if ($_(this).html().match($_.anti_apple.settings.search) ) $_(this).html( $_.anti_apple.pluck($_(this).html()) );});var s = document.createElement("style");s.innerHTML = ".anti_apple {font-size: inherit !important; "+ ($_.anti_apple.settings.hide_bg ? "background-image: none !important;" : "") +"} .bg_anti_apple {"+ ($_.anti_apple.settings.hide_bg ? "background-image: none !important;" : "") +"}";$_('head').append(s);$_.anti_apple.settings.finish = true;}});})($_); $_.anti_apple('html', '#000000');}if (typeof($_scruff) == 'undefined' || !$_scruff) {anti_apple_wait();}
