// ==UserScript==
// @name           Dopilivanie dou.ua
// @namespace      AndrejQulikoff/gm/douua
// @description    related: dou.ua (a) Remove annoying yellow strip; (b) Add some special links below TextArea to the Hack Forums :0);
// @include        http://dou.ua/*
// ==/UserScript==
/* -*- tab-width: 4 -*- */
/*
CHANGELOG
=========

Version 1.00 - 22:27 04.12.2011
	- Initial revision
Version 1.01 - 15:55 22.01.2012
	[-] No need "Remove annoying yellow strip"
*/

(function() {
var focused_ta;
								var xres_ta 	= document.evaluate("//textarea[contains(@class, 'first')]", document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
								xres_ta.snapshotItem(0).addEventListener("click", function(e) { focused_ta = e.target; }, true);
								xres_ta.snapshotItem(1).addEventListener("click", function(e) { focused_ta = e.target; }, true);
								var xres_ta = null;
var add_tag				= function(event){
							if (!(event.target.id=='bbtbclose')) {
								var len = Number(event.target.className.substr(7,2));
								var obj_ta = focused_ta;
								event.stopPropagation();
								obj_ta.focus();
								if (obj_ta.setSelectionRange && !obj_ta.readOnly) {
									var rng = [obj_ta.selectionStart, obj_ta.selectionEnd];
									obj_ta.value = obj_ta.value.substr(0, rng[0]) + '<' + event.target.textContent + '>' + obj_ta.value.substr(rng[0],rng[1]-rng[0]) + '</' + event.target.textContent + '>' + obj_ta.value.substr(rng[1]);
									obj_ta.selectionStart = rng[0]+len+2;
									obj_ta.selectionEnd = rng[1]+len+2;
									obj_ta.focus();
								}
							}
						};
var del_bbtb			= function(){
							var nodeToDelete = document.evaluate("//*[@id='bbtb_org100h']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
							nodeToDelete.parentNode.removeChild(nodeToDelete);
						};
var testB				= function(){
							var bbtb = document.createElement('table');
							bbtb.setAttribute('id', 'bbtb_org100h');
							bbtb.setAttribute('class', 'bbtb_org100h');
							bbtb.style.position = 'fixed';
							bbtb.style.top 	 = '96px';
							bbtb.style.right 	 = '48px';
							bbtb.style.zIndex 	 = '9999';
							bbtb.innerHTML = "<tr><td colspan=6 id='bbtbclose'>close(<B id='bbtbclose'>X</B>)</tr><tr><td colspan=6></tr><tr><td class='org100h10'>blockquote<td class='org100h02'>li<td class='org100h01'>a</tr><tr><td class='org100h04'>code<td class='org100h02'>ul<td class='org100h01'>u</tr><tr><td class='org100h03'>pre<td class='org100h02'>ol<td class='org100h01'>i</tr><tr><td class='org100h06'>strike<td class='org100h06'>strong<td class='org100h02'>em</tr>";
							document.getElementsByTagName('body')[0].appendChild(bbtb);
							document.getElementById('bbtbclose').addEventListener('click', del_bbtb, false);
							document.getElementById('bbtb_org100h').addEventListener('click',add_tag,false);
						};
var init				= function(entry) {
							if (window!=window.top) { return; /* I'm in a frame! */ }

							var btn = document.createElement('input');
							btn.setAttribute('type', 'button');
							btn.setAttribute('value', 'BBcode');
							btn.addEventListener('click', testB, false);
							btn.style.position = 'fixed';
							btn.style.top = '64px';
							btn.style.right = '48px';
							btn.style.zIndex = '9999';
							var bdys = document.getElementsByTagName('body');
							bdys[0].appendChild(btn);

/* ***** stylesheet ****************************************** */
				var addon_style = document.createElement('style');
					addon_style.setAttribute('type', "text/css");
					addon_style.appendChild(document.createTextNode("#bbtb_org100h{border-collapse: separate; background-color: lightgray; border: 1px solid gray; font-family: 'fixed-width', monospace; cursor: default;} .bbtb_org100h TD {background-color: white; cursor: default font-family: 'fixed-width', monospace; font-size: 130%; padding-left: 5px; padding-right: 5px;} #bbtbclose{cursor: pointer; cursor: hand; text-align: right;} .fake_it {border-collapse: separate; margin-left: 5em; background-color: #gray; font-family: 'fixed-width', monospace; font-size: 140%;} .fake_it SPAN {background-color: white; border: 1px solid lightgray; padding-left: 5px; padding-right: 5px; cursor: default;}"));
				var addon_head = addon_title = 0;
				try {
				if (addon_head = document.getElementsByTagName('head')[0]) {
					addon_head.appendChild(addon_style);
				} else if (addon_title = document.getElementByTagName('title')[0])
					addon_title.parentNode.insertBefore(addon_style, addon_title);
				} catch(e) {}

						};
init();
})();
