// ==UserScript==
// @name           Twitter - SPEAKER
// @namespace      http://userscripts.org/users/7010
// @include        http://twitter.com/*
// @updateURL      http://userscripts.org/scripts/source/25484.user.js
// ==/UserScript==

// HoHoHo! : Design : Brand Spanking New
// http://www.brandspankingnew.net/archive/2006/12/hohoho.html
var IMG_SAVE = 'data:image/gif,GIF89a%0A%00%0A%00%B3%00%00333%E1%E1%E1%C3%C3%C3%7F%7F%7Ffff%FF%FF%FF%99%99%99%90%90%90%FF%CC%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%07%00%08%00%2C%00%00%00%00%0A%00%0A%00%00%04)P%9CI%0FBD%98P%BA%B1%D9%D6%15%86%40%84%9CgfC%EB%AEB%2C%C7%A70%8Ep%A0%EF%F0%DD%99%02%80p(%14D%00%00%3B'
var IMG_SOUND = 'data:image/gif,GIF89a%0A%00%0A%00%A2%00%00333%DC%DC%DC%99%99%99%90%90%90fff%C5%C5%C5%FF%CC%FF%F0%F0%F0!%F9%04%01%07%00%06%00%2C%00%00%00%00%0A%00%0A%00%00%03%25h%BA%B3n%83%3C5%8E4d%8CR%83%94%5BA%04%A2%92%15%A2Pb%000%00%85%F0%3D%F0u-%C0%3D%01K%02%00%3B'

var imgSound = new Image();
imgSound.src = IMG_SOUND;
imgSound.style.cursor = 'pointer';

function appendSpeaker(ctxs){
	[].concat(ctxs).forEach(function(ctx){
		[].concat($x('.//span[contains(@class,"entry-content")]', ctx), $x('.//div[@class="desc"]/p[1]', ctx)).forEach(function(e){
			var img = imgSound.cloneNode(false);
			var link = document.createElement('a');
			link.appendChild(img);
			insertAfter(e, link).addEventListener('click', function(){
				link.removeEventListener('click', arguments.callee, true);
				
				getText('http://api.satoru.net/text2voice/?text=' + encodeURIComponent(trim(e.textContent)), function(url){
					img.src = IMG_SAVE;
					link.href = url;
					
					var mp3 = update(unsafeWindow.document.createElement('embed'), {
						width : 200,
						height : 30,
						enablejavascript : true,
						autostart : false,
						loop : false,
						panel : 1,
						src : url,
						postdomevents : true,
						type : 'audio/mpeg',
						kioskmode : false,
						controller : true,
					});
					insertAfter(insertAfter(link, document.createElement('br')), mp3);
					
					var id = setInterval(function(){
						switch (mp3.GetPluginStatus()) {
						case 'Playable':
						case 'Complete':
							clearInterval(id);
							mp3.SetRate(0.7 + Math.random() * 0.6);
							
							break;
						}
					}, 16);
				});
			}, true);
		});
	});
}

appendSpeaker(document)
window.AutoPagerize && window.AutoPagerize.addFilter(appendSpeaker);

// ----[Utility]-------------------------------------------------
// cho45 - http://lowreal.net/
function $x(exp, context) {
	var Node = unsafeWindow.Node;
	if (!context) context = document;
	var resolver = function (prefix) {
		var o = document.createNSResolver(context)(prefix);
		return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
	}
	var exp = document.createExpression(exp, resolver);
	
	var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
	switch (result.resultType) {
		case XPathResult.STRING_TYPE : return result.stringValue;
		case XPathResult.NUMBER_TYPE : return result.numberValue;
		case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
		case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
			result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var ret = [];
			for (var i = 0, len = result.snapshotLength; i < len ; i++) {
				var item = result.snapshotItem(i);
				switch (item.nodeType) {
				case Node.ELEMENT_NODE:
					ret.push(item);
					break;
				case Node.ATTRIBUTE_NODE:
				case Node.TEXT_NODE:
					ret.push(item.textContent);
					break;
				}
			}
			return ret;
		}
	}
	return null;
}

function trim(str){
	return str.replace(/^\s+|\s+$/g, '');
}

function insertAfter(target, node){
	return target.parentNode.insertBefore(node, target.nextSibling);
}

function getText(url, onload, onerror){
	GM_xmlhttpRequest({
		method : 'GET',
		url : url,
		onload : function(res){
			if(res.status!=200)
				return onerror(res);
			onload && onload(res.responseText);
		},
		onerror : onerror || function(){},
	})
}

function update(obj, params){
	if(obj.setAttribute){
		for(var key in params)
			obj.setAttribute(key, params[key]);
	} else {
		for(var key in params)
			obj[key] = params[key];
	}
	return obj;
}