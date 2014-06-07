// ==UserScript==
// @name           Facebook add Block App to Newsfeed
// @version        1.7.6
// @namespace      http://www.oepping.com/
// @description    Adds block app link to your Facebook newsfeed after each application posted on your feed.
// @license        GNU General Public License version 3 or any later version; https://www.gnu.org/licenses/gpl-3.0.html
// @include        https://*.facebook.com/*
// @include        http://*.facebook.com/*
// @exclude        https://apps.facebook.com/ai.php
// @exclude        http://apps.facebook.com/ai.php
// @grant          none
// @updateURL      https://userscripts.org/scripts/source/126583.meta.js
// ==/UserScript==
//Thanks to Mesak (http://userscripts.org/users/mesak) for parts of this
var runtimes = 0;
function checkDocT(){
	checkDoc(undefined);
}
function checkDoc(event){
	try {
		var target = document;
		var uri = document.baseURI;
		if(event){
			target = event.target;
			if(!target || target == '[object HTMLScriptElement]' || target == '[object Text]'){
				return;
			}
			uri = target.baseURI;
		}

		if(uri.indexOf('/ai.php') != -1 || uri.indexOf('/apps/application.php?id=') != -1){
			return;
		}
		var aLinkElement = target.getElementsByTagName('a');
		var len = aLinkElement.length;
		for(x=0;x<len;x++){
			var hovercard = aLinkElement[x].getAttribute('data-hovercard');
			var href = aLinkElement[x].getAttribute('href');
			var ajaxify = aLinkElement[x].getAttribute('ajaxify');
			var datagt = aLinkElement[x].getAttribute('data-gt');
			var hasblock = aLinkElement[x].getAttribute('hasblock');
			var ariahidden = aLinkElement[x].getAttribute('aria-hidden');
			var linkinner = aLinkElement[x].innerHTML;
			if(hasblock == null){
				if(hovercard !== null && hovercard.indexOf('application.php') != -1 && linkinner.indexOf('Play Now') == -1){
					if(ariahidden == null){
						addBlockIfText(aLinkElement[x], hovercard.match(/id\=(\d+)/)[1], null, null, null);
					}
				} else if(hovercard !== null && (hovercard.indexOf('/ajax/hovercard/hovercard.php?id=') != -1 || hovercard.indexOf('/ajax/hovercard/application.php?id=') != -1) && href != null && href.indexOf('://apps.facebook.com/') != -1){
					if(href.indexOf('type=discovery') != -1){
						//assume these types of hovercard.php links have app ids for their ids as in the case of 21 questions
						addBlockIfText(aLinkElement[x], hovercard.match(/id\=(\d+)/)[1], null, null, null);
					} else {
						var found = false;
						for(y=x;y>=0;y--){
							var aclass = aLinkElement[y].getAttribute('class');
							if(aclass == 'uiSelectorButton'){
								ajaxify = aLinkElement[y].getAttribute('ajaxify');
								//What about more than one?
								if(ajaxify.indexOf('hideable_ids\%5B0\%5D\=') != -1){
									addBlockIfText(aLinkElement[x], ajaxify.match(/hideable_ids\%5B0\%5D\=(\d+)/)[1], null, null, null);
								}
								break;
								
							}
						}
						if(!found){
							addBlockIfText(aLinkElement[x], hovercard.match(/id\=(\d+)/)[1], null, null, null);
						}
					}
				} else if(href !== null && datagt !== null && href.indexOf('/apps/application.php?id=') == -1 && href.indexOf('://apps.facebook.com/') != -1 && datagt.indexOf('\"appid\"') != -1){
					if(aLinkElement[x].parentNode && aLinkElement[x].parentNode.getAttribute('class').indexOf('imageContainer') == -1 && datagt.indexOf('canvas_bookmarks') == -1){
						addBlockLink(aLinkElement[x], datagt.match(/.appid.:.(\d+)/)[1], 'div', 0, 1);
					}
				} else if(href !== null && datagt !== null && href.indexOf('facebook.com/appcenter/') != -1 && datagt.indexOf('\"appid\"') != -1 && aLinkElement[x].className.indexOf('logo') == -1){
					//unsafeWindow.console.log('fb_block test=' + datagt);
					if(aLinkElement[x].parentNode && aLinkElement[x].parentNode.getAttribute('class') && aLinkElement[x].parentNode.getAttribute('class').indexOf('imageContainer') == -1 && datagt.indexOf('canvas_bookmarks') == -1){
						addBlockIfText(aLinkElement[x], datagt.match(/.appid.:.(\d+)/)[1], null, null, null);
					}
				} else if(href !== null && href.indexOf('/apps/application.php?id=') != -1){
					var httpindex = href.indexOf('http');
					var appindex = -1;
					if(httpindex == 0){
						appindex = href.indexOf('www.facebook.com/apps/application.php?id=');
					} else {
						appindex = href.indexOf('/apps/application.php?id=');
					}
					if((appindex == 7 || appindex == 8) && httpindex == 0 || appindex == 0){
						if(aLinkElement[x].parentNode.innerHTML.indexOf('Blocking') == 0 && aLinkElement[x].parentNode.parentNode.parentNode.getAttribute('class') == 'dialog_body'){
							ignoreLink(aLinkElement[x]);
						} else {
							addBlockLink(aLinkElement[x], href.match(/id\=(\d+)/)[1], null, null, null);
						}
					}
				} else if(href !== null && href.indexOf('/report.application/?app_id=') != -1 && href.indexOf('http') != 0){
					addBlockLink(aLinkElement[x], href.match(/app_id\=(\d+)/)[1], null, null, null);
//				} else if(href !== null && href.indexOf('method=permissions.request') != -1 && href.indexOf('uiserver.php?app_id=') != -1){
//					addBlockLink(aLinkElement[x], href.match(/uiserver.php?app_id\=(\d+)/)[1], null, null, null);
				} else if(ajaxify !== null) {
					if(ajaxify.indexOf('/ajax/games/apprequest/apprequest.php?id=') != -1){
						addBlockLink(aLinkElement[x], ajaxify.match(/app_id\%5D\=(\d+)/)[1], 'span', 1, null);
					} else if(ajaxify.indexOf('/ajax/report.php?') != -1){
						addBlockLink(aLinkElement[x], ajaxify.match(/cid\=(\d+)/)[1], null, null, null);
					}
				} else {
					//Not an app link
//					if(aLinkElement[x].className.indexOf('layerCancel') != -1 && aLinkElement[x].parentNode.parentNode.previousSibling.previousSibling.innerHTML.indexOf('Block App') == 0){
//						unsafeWindow.console.log('found block app button: ' + aLinkElement[x].parentNode.parentNode.previousSibling.previousSibling.innerHTML + ' docurl=' + Document.URL);
//						addToggleNeverBlockButton(aLinkElement[x],0);
//					}
				}
			}

		}
	} catch(err) {
		if(err.lineNumber){
			unsafeWindow.console.log('fb_block err=' + err.message + ' at line ' + err.lineNumber);
		} else {
			unsafeWindow.console.log('fb_block err=' + err.message);
		}
		if(err.message == 'target.getElementsByTagName is not a function'){
			unsafeWindow.console.log('fb_block err detail=' + target);
		}
	}
	if(!event){
		if(runtimes < 15){
			runtimes++;
			if(runtimes == 15){
				window.addEventListener("DOMNodeInserted", checkDoc, false);
				runtimes = 30;
			}
		}
		window.setTimeout(checkDocT, 1000 * runtimes);
	}
}
//function addToggleNeverBlockButton(Element, app_id){
//}
function addBlockIfText(Element, app_id, placetag, tagcount,inside){
	if(Element.firstChild && Element.firstChild.tagName){
		if(Element.firstChild.tagName.toLowerCase().indexOf('img') == 0){
			return ignoreLink(Element);
		}
	}
	return addBlockLink(Element, app_id, placetag, tagcount,inside);
}
function addBlockLink(Element, app_id, placetag, tagcount,inside){
	var aElement=document.createElement('a');
	aElement.innerHTML = "Block";
	aElement.setAttribute('rel','dialog-post');
	aElement.setAttribute('style','display: inline;');
	aElement.setAttribute('ajaxify','/ajax/apps/block_app.php?app_id='+app_id+'&type_index=0&source=about&confirm_id=block_app_link');
	Element.setAttribute('hasblock','yes');
	Element.setAttribute('style','display: inline;');
	var placement = Element.nextSibling;
	var nodeins = Element.parentNode;
	if(placetag !== null){
		var elems = Element.getElementsByTagName(placetag);
		var len = elems.length;
		var tele = (tagcount !== null)?tagcount:0;
		if(tele < len){
			if(inside != null && inside == 1){
				nodeins = elems[tele];
				placement = elems[tele].lastChild.nextSibling;
			} else {
				nodeins = elems[tele].parentNode;
				placement = elems[tele].nextSibling;
			}
		}
	}
	nodeins.insertBefore(aElement,placement);
	var spanElement=document.createElement('span');
	spanElement.innerHTML = " \u00B7 ";
	nodeins.insertBefore(spanElement,aElement);
}
function ignoreLink(Element){
	Element.setAttribute('hasblock','yes');
}
checkDoc();
