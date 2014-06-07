// ==UserScript==
// @name           Lightnovel Download
// @author         halffog
// @description    自动下载轻国附件
// @date           Oct 3, 2012
// @include        http*://*.lightnovel.cn/*thread*
// ==/UserScript==
(function(){
	var top,link = document.evaluate('//span[starts-with(@id,"attach_")]/a|//a[starts-with(@id,"aid")][parent::p[@class="attnm"]]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(!link){
		document.title = '[无附件]' + document.title;
		return;
	}
	if(!link.id)link.id = 'fujian';
	link.parentNode.style.cssText = 'border:solid 2px #000000;';
	var css = 'opacity:0.3;-moz-transition-duration:0.2s;-webkit-transition-duration:0.2s;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAfCAYAAACGVs+MAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGfSURBVHja7FfRcYMwDFVy/IcN0g3IBtAJmg2aTFA2SDJB6bUDuBOUbgAbkA2SDcwE1OTkO1VnjGkx9KO60+XiCElIz0/K4u31JQeAB3CTs9JEaYqfrVRKpdIDsSvx90JpTM5PzF8VDAjeSqR0h86149jg2CbfEl3CcAlhRAkMZ59YVh3sCTxKYOjx1mDnLQneAmmwkT4rsISZ5c8lYEL43ZQgjAixALnnkyWgk+iT4hcgLamfNoFa6WqAg4tSwc6OA55PeAWE4z2v0VYgV2x+WIGUYO02C1LiFJDr16xkOdpI4sQ2ZGzyTH0HrHwFlmjNzjKfIDzMyQOBI2holfKpE4h9csH/LHBpwRXJhzLfWPMhdKmAQCBqDdk1rQcGvVLaH6MFOWFFl/kgxsRAiVc04eu25ZkMVz9nDJjeWL/JBb+vOmygY8VL9HrPE9h2LCQJe7uC/EGJDFXpqsCO7BuVHkZ9u8AjKh08Nvo+WrDQgvfDJw/s2bKSTUVENQYXhs3pvS+Be4pKB5Hk7p+xJRtDcNr3fVeMRdM0s1LxlwADAJ5zXEGltTeCAAAAAElFTkSuQmCC") no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7);border-radius:5px 5px 5px 5px;cursor:pointer;position:fixed;top:28%;width:60px;height:60px;right:0px;z-index:9999';
	var btn = document.createElement('span');
	btn.style.cssText = css;
	btn.addEventListener('mouseover', function(){ btn.style.opacity = 1;}, false);
	btn.addEventListener('mouseout', function(){ btn.style.opacity = 0.3; }, false);
	btn.addEventListener('click', function(){
		if(window.pageYOffset!==top){
			location.hash = link.id;
			if(!top)setTimeout(function(){
				top = window.pageYOffset;
			},0);
		}else{
			location.href = link.href;
		}
	},false);
	document.body.appendChild(btn);
})();
