// ==UserScript==
// @name           Hotkey
// @author         Hu Yinbing
// @namespace      http://duolab.info
// @description    快速跳转至附件
// @version        1.0
// @include        http://bbs.dospy.com/*
// @require		   http://code.jquery.com/jquery-1.6.min.js
// ==/UserScript==

function maodian() {
    if ($('div[class="msgheader"]')) {
        var maodian = "<a id='fujian'></a>";
        $('div[class="msgheader"]').append(maodian);
    };
};
maodian();

function button() {
if(document.body){
	var a = document.createElement('span');
	var css = 'opacity:0.3;-moz-transition-duration:0.2s;-webkit-transition-duration:0.2s;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAfCAYAAACGVs+MAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGfSURBVHja7FfRcYMwDFVy/IcN0g3IBtAJmg2aTFA2SDJB6bUDuBOUbgAbkA2SDcwE1OTkO1VnjGkx9KO60+XiCElIz0/K4u31JQeAB3CTs9JEaYqfrVRKpdIDsSvx90JpTM5PzF8VDAjeSqR0h86149jg2CbfEl3CcAlhRAkMZ59YVh3sCTxKYOjx1mDnLQneAmmwkT4rsISZ5c8lYEL43ZQgjAixALnnkyWgk+iT4hcgLamfNoFa6WqAg4tSwc6OA55PeAWE4z2v0VYgV2x+WIGUYO02C1LiFJDr16xkOdpI4sQ2ZGzyTH0HrHwFlmjNzjKfIDzMyQOBI2holfKpE4h9csH/LHBpwRXJhzLfWPMhdKmAQCBqDdk1rQcGvVLaH6MFOWFFl/kgxsRAiVc04eu25ZkMVz9nDJjeWL/JBb+vOmygY8VL9HrPE9h2LCQJe7uC/EGJDFXpqsCO7BuVHkZ9u8AjKh08Nvo+WrDQgvfDJw/s2bKSTUVENQYXhs3pvS+Be4pKB5Hk7p+xJRtDcNr3fVeMRdM0s1LxlwADAJ5zXEGltTeCAAAAAElFTkSuQmCC") no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7);border-radius:5px 5px 5px 5px;cursor:pointer;position:fixed;top:30%;width:60px;height:60px;right:0px;z-index:9999';
	a.style.cssText = css;
	a.addEventListener('mouseover', function(){ a.style.opacity = 1;}, false);
	a.addEventListener('mouseout', function(){ a.style.opacity = 0.3; }, false);
	a.addEventListener('click', function(){ window.location.hash="fujian"; }, false );
	document.body.appendChild(a);
	}
};
if(self==top) button();