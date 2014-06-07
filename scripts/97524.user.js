// ==UserScript==
// @name          4ionline_clipboard
// @namespace     http://4ionline.ru/
// @description   Буфер обмена
// @include       http://4ionline.ru/user/OffersList.aspx
// @include       http://4ionline.ru/user/SearchOffers.aspx
// ==/UserScript==

var zeroclipboard = document.createElement('script');
zeroclipboard.type = 'text/javascript';
zeroclipboard.src = 'http://lab.tekora.ru/ZeroClipboard.js';
document.getElementsByTagName('head')[0].appendChild(zeroclipboard);
zeroclipboard.setAttribute('onload', "var clip, clip_button, tds = document.getElementsByTagName('td'); for(var i in tds) { if(tds[i] && tds[i].getAttribute && tds[i].getAttribute('style') && tds[i].getAttribute('style').indexOf('width: 100%; height: 42px') >= 0) { clip_button = document.createElement('div'); clip_button.setAttribute('style', 'display: inline-block; cursor: pointer; width: 20px; height: 28px; background-image: url(\"http://lab.tekora.ru/clipboardID.png\");'); clip_button.setAttribute('title', 'Номера в буфер обмена'); tds[i].appendChild(clip_button); tds[i].setAttribute('style', 'width: 100%; text-align: right;'); } } window.ZeroClipboard.moviePath = 'http://lab.tekora.ru/ZeroClipboard.swf'; clip = new ZeroClipboard.Client(); clip.setHandCursor( true ); clip.glue(clip_button); clip.addEventListener( 'mouseDown', function(client) { var trs = document.getElementsByTagName('tr'); for(var i in trs) { if(trs[i] && trs[i].className == 'tableheaderwhite') { var row = trs[i]; var clip_data = []; while(1) { if(row.nextSibling) { row = row.nextSibling; } if(!row || !row.children || row.children.length != 11) break; clip_data[clip_data.length] = row.firstChild.nextSibling.innerHTML; } client.setText(clip_data.join(';')); } } } );");
