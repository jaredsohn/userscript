// ==UserScript==
// @name           SevenLands Regenerationszeit
// @namespace      socke
// @description    Zeigt die verbleibende Regenerationszeit in der Titelleiste an
// @include        http://*.sevenlands.net/*
// @license        GPL 3
// @author         socke-99
// @version        0.03
// ==/UserScript==

/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


var regen_at; //regenerated at (Date)
var addTitle = "";

var rPat = /^(\{.*\}\s*)/; //search pattern to remove regeneration time from title


(function()
{
	var _this={
				target:document.getElementsByTagName('TITLE')[0],
				oldValue:document.title
			  };
	_this.onChange=function()
	{
		if(_this.oldValue!==document.title)
		{
			_this.oldValue=document.title;
			if (addTitle != "" && document.title.substr(0,addTitle.length) != addTitle) {
				var txt = addTitle + document.title;
				_this.oldValue = txt;
				document.title = txt;
			}
			//GM_log('somebody changed the title');
		}
	};
	_this.trigger=function()
	{
		if (addTitle != "" && document.title.substr(0,addTitle.length) != addTitle) {
			var t = document.title;
			t = addTitle + " " + t.replace(rPat, "");
			//window.setTimeout(function() { document.title = t; }, 1);
			document.title = t; 
		}
		//setTimeout(_this.onChange,1);
		//_this.onChange();
	};
	_this.target.addEventListener('DOMSubtreeModified',_this.trigger,false)
})()


function updateTitle() {
	var now = new Date().getTime();
	var time = (regen_at - now)/1000;
	//GM_log(now + " - " + regen_at);
	if (time >= 0) {
		var sec = Math.round(time);
		var min = Math.floor(sec/60);
		sec = sec % 60;
		var text = "{" + min + ":";
		if (sec < 10) 
			text += "0";
		text += sec + "}";
		addTitle = text;
		document.title = /*text + " " + */document.title.replace(rPat, "");
		//GM_log(text);
		window.setTimeout(updateTitle, 500);
	}
	else {
		addTitle = "";
		document.title = "Seven Lands";
		//GM_log("fertig gewartet");
	}
}


if (unsafeWindow.Health) {
	var currentHP = parseInt(unsafeWindow.Health.hp);
	var maxHP = parseInt(unsafeWindow.Health.maxhp);
	var HPPerSec = parseFloat(unsafeWindow.Health.hppersecond);

	var now = new Date().getTime();
	if (currentHP < maxHP) {
		regen_at = now + (maxHP - currentHP)*1000 / HPPerSec;
		updateTitle();
	}

}

