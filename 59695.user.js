// The West Painted Portraits 11
// version test
// This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with this program; if not, see <http://www.gnu.org/licenses/>.
//
// --------------------------------------------------------------------

// ==UserScript==
// @name           The West Painted Portraits 11
// @namespace      http://forum.the-west.net/showthread.php?t=24642
// @description    Script that changes ingame portraits
// @include        http://*.the-west.*/game.php*
// @include        http://*.innogames.*/game.php*
// ==/UserScript==


var Greenhorn={
changeAvatar:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/avatars\/greenhorn_woman\.jpg", "i");
var r2=new RegExp("images\/avatars\/greenhorn_woman_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/greenhorn_woman.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/greenhorn_woman_small.jpg";
}
}
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/avatars\/greenhorn\.jpg", "i");
var r2=new RegExp("images\/avatars\/greenhorn_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/greenhorn.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/greenhorn_small.jpg";
}
}
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/avatars\/mercenary\.jpg", "i");
var r2=new RegExp("images\/avatars\/mercenary_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://i626.photobucket.com/albums/tt345/bushidoka/mercenary.jpg";
if(r2.test(img[i].src)){
img[i].src="http://i626.photobucket.com/albums/tt345/bushidoka/mercenary_small.jpg";
}
}
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/avatars\/mercenary_woman\.jpg", "i");
var r2=new RegExp("images\/avatars\/mercenary_woman_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://i626.photobucket.com/albums/tt345/bushidoka/mercenary_woman.jpg";
if(r2.test(img[i].src)){
img[i].src="http://i626.photobucket.com/albums/tt345/bushidoka/mercenary_woman_small.jpg";
}
}
var r1=new RegExp("images\/avatars\/vagabond\.jpg", "i");
var r2=new RegExp("images\/avatars\/vagabond_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/wanderer.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/wanderer_small.jpg";
}
}
var r1=new RegExp("images\/avatars\/vagabond_woman\.jpg", "i");
var r2=new RegExp("images\/avatars\/vagabond_woman_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/vagabond_woman.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/vagabond_woman_small.jpg";
}
}
var r1=new RegExp("images\/avatars\/indian\.jpg", "i");
var r2=new RegExp("images\/avatars\/indian_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/indian.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/indian_small.jpg";
}
}
var r1=new RegExp("images\/avatars\/indian_woman\.jpg", "i");
var r2=new RegExp("images\/avatars\/indian_woman_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/indian_woman.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/indian_woman_small.jpg";
}
}
var r1=new RegExp("images\/avatars\/goldseeker\.jpg", "i");
var r2=new RegExp("images\/avatars\/goldseeker_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/prospector.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/prospector_small.jpg";
}
}
var r1=new RegExp("images\/avatars\/bountyhunter\.jpg", "i");
var r2=new RegExp("images\/avatars\/bountyhunter_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/bountyhunter.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/bountyhunter_small.jpg";
}
}
var r1=new RegExp("images\/avatars\/gunslinger\.jpg", "i");
var r2=new RegExp("images\/avatars\/gunslinger_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/gunslinger.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/gunslinger_small.jpg";
}
}
var r1=new RegExp("images\/avatars\/gunslinger_woman\.jpg", "i");
var r2=new RegExp("images\/avatars\/gunslinger_woman_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/gunslinger_woman.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/gunslinger_woman_small.jpg";
}
}
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/avatars\/hangdog\.jpg", "i");
var r2=new RegExp("images\/avatars\/hangdog_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/hangdog.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/hangdog_small.jpg";
}
}
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/avatars\/cowboy\.jpg", "i");
var r2=new RegExp("images\/avatars\/cowboy_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/cowboy.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/cowboy_small.jpg";
}
}
var r1=new RegExp("images\/avatars\/worker\.jpg", "i");
var r2=new RegExp("images\/avatars\/worker_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/worker.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/worker_small.jpg";
}
}
var r1=new RegExp("images\/avatars\/Cavalry_woman\.jpg", "i");
var r2=new RegExp("images\/avatars\/Cavalry_woman_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/cavalry_woman.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/cavalry_woman_small.jpg";
}
}
var r1=new RegExp("images\/avatars\/Iroquois\.jpg", "i");
var r2=new RegExp("images\/avatars\/Iroquois_small\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://dump.ninjapirat.org/files/Iroquois.jpg";
if(r2.test(img[i].src)){
img[i].src="http://dump.ninjapirat.org/files/Iroquois_small.jpg";
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
   
var r=new RegExp("images\/avatars\/greenhorn_woman_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/greenhorn_woman_small.jpg";
   }
var r=new RegExp("images\/avatars\/greenhorn_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/greenhorn_small.jpg";
   }
var r=new RegExp("images\/avatars\/mercenary_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i626.photobucket.com/albums/tt345/bushidoka/mercenary_small.jpg";
   }
var r=new RegExp("images\/avatars\/mercenary_woman_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://i626.photobucket.com/albums/tt345/bushidoka/mercenary_woman_small.jpg";
   }
var r=new RegExp("images\/avatars\/vagabond_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/wanderer_small.jpg";
   }
var r=new RegExp("images\/avatars\/vagabond_woman_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/vagabond_woman_small.jpg";
   }
var r=new RegExp("images\/avatars\/indian_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/indian_small.jpg";
   }
var r=new RegExp("images\/avatars\/indian_woman_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/indian_woman_small.jpg";
   }
var r=new RegExp("images\/avatars\/goldseeker_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/prospector_small.jpg";
   }
var r=new RegExp("images\/avatars\/bountyhunter_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/bountyhunter_small.jpg";
   }
var r=new RegExp("images\/avatars\/gunslinger_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/gunslinger_small.jpg";
   }
var r=new RegExp("images\/avatars\/gunslinger_woman_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/gunslinger_woman_small.jpg";
   }
var r=new RegExp("images\/avatars\/hangdog_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/hangdog_small.jpg";
   }     
var r=new RegExp("images\/avatars\/cowboy_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/cowboy_small.jpg";
   }
var r=new RegExp("images\/avatars\/worker_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/worker_small.jpg";
   }
var r=new RegExp("images\/avatars\/cavalry_woman_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/cavalry_woman_small.jpg";
   }  
var r=new RegExp("images\/avatars\/Iroquois_small\.png", "i");
   av=document.getElementById('avatar').getElementsByTagName('img')[0];
   if(r.test(av.src)){
   av.src="http://dump.ninjapirat.org/files/Iroquois_small.jpg";
   }  
 


}
};



Greenhorn.changeWestFunction();
Greenhorn.changePlayerAvatar();

