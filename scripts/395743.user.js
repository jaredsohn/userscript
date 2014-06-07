// ==UserScript==
// @name       qiang hong bao
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://t.dianping.com/event/20140222
// @copyright  2012+, You
// ==/UserScript==

setInterval(auto_run, Math.floor(Math.random() * 800 + 200));

function auto_run()
{
  var popupBox = document.getElementsByClassName('popup-box');

  if (popupBox.length == 0)
  {
	var row = Math.floor(Math.random()*2+1);
	var col = Math.floor(Math.random()*2+1);
  	var grid = document.getElementById('cell-'+ row + '-'+ col);
	grid.click();
  }
  else
  {
	  var again = document.getElementsByClassName('btn-again')[0];
	  again.click();
  }
}
