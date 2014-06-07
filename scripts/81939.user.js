// ==UserScript==
// @name           Turn lights off
// @namespace      http://userscripts.org/users/86496
// @description    Turn lights off to view flash videos
// @include        http://v.youku.com/v_show/*
// @include        http://v.youku.com/v_playlist/*
// @include        http://v.ku6.com/*
// @include        http://www.youtube.com/watch?*
// @include        http://www.56.com/u*/*
// @include        http://6.cn/watch/*
// @include        http://video.sina.com.cn/*
// @include        http://tv.sohu.com/*
// @include        http://share.renren.com/*
// @include        http://www.tudou.com/*
// @version        1.14
// ==/UserScript==
  
(function (){
if (window.top != window.self) return; //don't run on frames or iframes

var b, curtain, elem;
var specialsites = [
	//[name, url, flash player parentNode XPath]
	 ['Sohu', 'http://tv.sohu.com/', '//div[@id="sohuplayer"]']
	,['Sina', 'http://video.sina.com.cn/', '//div[@id="myflashBox"]']
	,['Sina', 'http://video.sina.com.cn/', '//div[@id="flashPlayer"]']
	,['ku6', 'http://v.ku6.com/', '//div[@class="videoPlay"]']
	,['renren', 'http://share.renren.com/', '//div[@id="sharevideo"]']
	,['56', 'http://www.56.com/', '//div[@id="player"]']
	]
var len = specialsites.length;
var url = document.location.href;
for (i=0;i<len;i++) {
	if (url.indexOf(specialsites[i][1]) == 0) {
		elem = document.evaluate(specialsites[i][2],document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
		if (elem) break;
	}
}
makeswitch();

function makeswitch() {
	b = creaElemIn('div', document.body);
	b.setAttribute('style', 'width: 40px; height: 22px; top: 20%; left: 0; z-index: 60000; position: fixed; color: black; background: white; border: 1px solid black; text-align: center; vertical-align: middle; font-size: 9pt; cursor: pointer;');
	b.innerHTML = 'TurnOff';
	b.addEventListener('click', lightsoff, false);
}

function lightsoff() {
	if (curtain) curtain.style.display = 'block';
	else {
	curtain = creaElemIn('div', document.body);
	curtain.innerHTML = 'Double Click to turn lights back on.';
	curtain.title = 'Double Click to turn lights back on.';
	curtain.setAttribute('style', 'width: 100%; height: 100%; top: 0; left: 0; z-index: 10000; position: fixed; color: #888; background: black; text-align: right; opacity: 0.9;');
	curtain.addEventListener('dblclick', lightson, false);
	curtain.addEventListener('mouseover', function(){curtain.style.color='#fff';}, false);
	curtain.addEventListener('mouseout', function(){curtain.style.color='#888';}, false);
	}
	b.style.display = 'none';
	if (elem) {
		fixZIndex(elem);
		//setTimeout(fixZIndex,4000,elem);
	}
}

function lightson() {
	b.style.display = 'block';
	curtain.style.display = 'none';
}

function fixZIndex(elem) {
	elem.style.position = 'relative';
	elem.style.zIndex = '10001';
}

function creaElemIn(tagname, destin) {
	var theElem = destin.appendChild(document.createElement(tagname));
	return theElem;
}

})();