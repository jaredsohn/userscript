// ==UserScript==
// @name		Uprocket!
// @namespace	https://github.com/thurst306/Uprocket
// @version		1.1
// @description	Make the /r/dogecoin uprocket fly!
// @match		http://www.reddit.com/r/dogecoin*
// @require		http://thurstshouse.com/warehouse/Hosting/jquery.keyframes.min.js
// ==/UserScript==

console.log('Uprocket started');

$("*.content .midcol,.content .commentarea .comment").css("overflow", "visible", "important");

$.keyframe.define([{
  name: 'upMoon',
  '0%': { 'transform': 'translate(0,0)', 'opacity': '1' },
  '10%': { 'transform': 'translate(4px,0) rotate(5deg)' },
  '15%': { 'transform': 'translate(-4px,0) rotate(-15deg)' },
  '20%': { 'transform': 'translate(0,0)' },
  '50%': { 'transform': 'translate(0,10px)', 'opacity': '1' },
  '88%': { 'transform': 'translate(0,-140px)', 'opacity': '0' },
  '94%': { 'transform': 'translate(0,14px)', 'opacity': '0' },
  '100%': { 'transform': 'translate(0,0)', 'opacity': '1' }
}]);

$(".arrow.up").click(function(){
    $(".arrow.upmod").playKeyframe({
        name: 'upMoon',
        duration: 1500,
        repeat: 1,
        timingFunction: 'ease'
    });
});