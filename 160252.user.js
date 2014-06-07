// ==UserScript==
// @match			https://www.f-list.net/fchat/*
// @name			F-List.net (FChat) - Ditzy's "Quoted Text" Color Changer.
// @description		Use the command "/setquotecolor cyan" in f-chat to set the color you want. Colors are saved on a per-character basis. http://www.f-list.net/c/ditzy 
// @version			0.1.0
// ==/UserScript==
/*jslint browser:true*/
/*globals FList*/
/*
The Unlicense:

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>
*/
(function () {
    'use strict'; // <-- use Javascript5/strict (all browsers default to the old Javascript3 unless you 'use strict')
    var script = document.createElement('script'),
        mane = function () {
			var $ = window.jQuery,
				Chat_handleInput = FList.Chat_handleInput;
			FList.Ditzy = FList.Ditzy || {};
			FList.Ditzy.unload = FList.Ditzy.unload || {};
			if (!FList.Ditzy.unload.quotecolor) {
				FList.Chat_handleInput = function (msg) {
					var color;
					if (msg.substring(0, 15) === '/setquotecolor ') {
						color = msg.substring(15);
						if (/^(red|blue|white|yellow|pink|gray|green|orange|purple|black|brown|cyan|none)$/.test(color)) {
							if (color === 'none') {
								localStorage.removeItem('ditzy.quotecolor.' + FList.Chat_identity);
							} else {
								localStorage.setItem('ditzy.quotecolor.' + FList.Chat_identity, color);
							}
							$("#MessageBox").val('');
						} else {
							FList.Common_displayError(msg.substring(15) + ' is not a valid color. Set the color to "none" if you want to turn this off.');
						}
					} else {
						color = localStorage.getItem('ditzy.quotecolor.' + FList.Chat_identity);
						if (color && color !== 'none' && (/^\/me/.test(msg) || msg[0] !== '/')) {
							$("#MessageBox").val(msg.replace(/".+?"/g, function (quote) {
								return ('"[color=' + color + ']' + quote.substring(1, quote.length - 1) + '[/color]"');
							}));
						}
						Chat_handleInput.call(FList, msg);
					}
				};
				FList.Ditzy.unload.quotecolor = function (callback) {
					FList.Chat_handleInput = Chat_handleInput;
					FList.Common_displayWarning('UNLOADING: ditzy.quotecolor.0.1.0.user.js\n You should probably uninstall this script from your browser extentions.');
					if (callback) { callback(); }
				};
			} else { FList.Common_displayError('ditzy.quotecolor is already loaded, you have more then one installed.'); }
        };
    script.appendChild(document.createTextNode('"use strict";\n(' + mane + ')();'));
    document.head.appendChild(script);
}());