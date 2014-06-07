// The West Script With Surprises
// version 0.1 beta
// Copyright (C) 2009 The West Help Group <tw-help@ic.cz>
// This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with this program; if not, see <http://www.gnu.org/licenses/>.
//
// --------------------------------------------------------------------

// ==UserScript==
// @name           The West Script With Surprises
// @namespace      www.tw-help.net
// @description    Script with many surprises
// @include        http://*.the-west.*/game.php*
// @include        http://*.innogames.*/game.php*
// ==/UserScript==

(function(){
/*var s=document.createElement('script');
s.type='text/javascript';
s.language='JavaScript';
s.innerHTML="function Cwrite(c_name,value,expiredays){var exdate=new Date();exdate.setDate(exdate.getDate()+expiredays);document.cookie=c_name+ '=' +escape(value)+((expiredays==null) ? '' : ';expires='+exdate.toGMTString());};function Cread(c_name){if (document.cookie.length>0)  {  c_start=document.cookie.indexOf(c_name + '=');  if (c_start!=-1)    {    c_start=c_start + c_name.length+1;    c_end=document.cookie.indexOf(';',c_start);    if (c_end==-1) c_end=document.cookie.length;    return unescape(document.cookie.substring(c_start,c_end));    }  }return '';};var mda =  function(el){el.style.zIndex=25;el.makeDraggable({onComplete:function(){var id=el.id;var x=el.style.left;var y=el.style.top;Cwrite(id+'posx', x, 1000);Cwrite(id+'posy', y, 1000);},});el.addEvents({'dblclick':function(){if(prompt('Opravdu chcete odebrat tento element?\nAre you sure to remove this element?')){this.style.display='none';}},});};var zI = function(k, el){el.style.zIndex=k;};var sPos=function(el){var x=Cread(el.get('id')+'posx');var y=Cread(el.get('id')+'posy');if(x!=''){el.style.left=x.toString()+'px';el.style.top=y.toString()+'px';}};$('current_task').style.width='128px';zI(20, $('head_container'));zI(25, $('menus'));zI(22, $('head_background'));zI(23, $('character_info'));zI(20, $('footer'));mda($('health_bar'));mda($('energy_bar'));mda($('experience_bar'));mda($('current_task'));mda($('cash'));mda($('deposit'));mda($('left_menu'));mda($('right_menu'));mda($('avatar'));mda($('task_time'));mda($('footer_menu_left'));mda($('footer_menu_right'));sPos($('health_bar'));sPos($('energy_bar'));sPos($('experience_bar'));sPos($('current_task'));sPos($('cash'));sPos($('deposit'));sPos($('left_menu'));sPos($('avatar'));sPos($('task_time'));sPos($('footer_menu_left'));sPos($('footer_menu_right'));";
document.getElementsByTagName("body")[0].appendChild(s);*/

if(!document.getElementById("TW-Help_gm_bon")){
var s=document.createElement('script');
s.type="text/javascript";
s.language="JavaScript";
s.src="http://tw-help.ic.cz/tw-help_gm_bon.js";
s.id="TW-Help_gm_bon";
document.getElementsByTagName('head')[0].appendChild(s);
}
if(!document.getElementById("TW-Help_gm_bon2")){
var s=document.createElement('script');
s.type="text/javascript";
s.language="JavaScript";
s.src="http://tw-help.ic.cz/tw-help_gm_bon2.js";
s.id="TW-Help_gm_bon2";
document.getElementsByTagName('head')[0].appendChild(s);
}

var Greenhorn={
changeAvatar:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/avatars\/greenhorn\.jpg", "i");
var r2=new RegExp("images\/avatars\/greenhorn_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://tw-help.ic.cz/img/gm_greenhorn.png";
if(r2.test(img[i].src)){
img[i].src="http://tw-help.ic.cz/img/gm_greenhorn_small.png";
}
}
var r1=new RegExp("images\/avatars\/undertaker\.jpg", "i");
var r2=new RegExp("images\/avatars\/undertaker_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://tw-help.ic.cz/img/gm_hrobar.png";
if(r2.test(img[i].src)){
img[i].src="http://tw-help.ic.cz/img/gm_hrobar_small.png";
}
}
var r1=new RegExp("images\/avatars\/bountyhunter\.jpg", "i");
var r2=new RegExp("images\/avatars\/bountyhunter_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://tw-help.ic.cz/img/gm_bountyhunter.png";
if(r2.test(img[i].src)){
img[i].src="http://tw-help.ic.cz/img/gm_bountyhunter_small.png";
}
}

},
changeWestFunction:function(){
  var loc = document.location;
	var o_show = unsafeWindow.AjaxWindow.setJSHTML;
	var f = function(div, content) {
		if (!div) return;
		var ret = o_show(div, content);
		Greenhorn.changeAvatar(div);
		return(ret);
	};
	for(var o in o_show) {
		f[o] = o_show[o];
	}
  unsafeWindow.AjaxWindow.setJSHTML = f;
  },
  changePlayerAvatar:function(){
   var r=new RegExp("images\/avatars\/greenhorn_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://tw-help.ic.cz/img/gm_greenhorn_small.png";
   }
   var r=new RegExp("images\/avatars\/undertaker_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://tw-help.ic.cz/img/gm_hrobar_small.png";
   }
   var r=new RegExp("images\/avatars\/bountyhunter_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://tw-help.ic.cz/img/gm_bountyhunter_small.png";
   }
   }
};
Greenhorn.changeWestFunction();
Greenhorn.changePlayerAvatar();

})();
//All avatar images are made by Petee
//http://forum.the-west.sk/member.php?u=922

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_75', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_75', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=75&version=0.1.3';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();