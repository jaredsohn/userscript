// The West Night Map Script
// version 0.1 beta
// Copyright (C) 2010 pato95 & simon163
// This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with this program; if not, see <http://www.gnu.org/licenses/>.
//
// --------------------------------------------------------------------

// ==UserScript==
// @name           The West Night Map Script 
// @namespace      www.imagehosting.ic.cz
// @description    Script which changes map into night mode
// @include        http://*.the-west.*/game.php*
// @include        http://*.innogames.*/game.php*
// ==/UserScript==

var Desert0={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/town\/cityhall3\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/desert0.png";
}
var Desert1={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/desert1\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/desert1.png";
}
var Desert2={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/desert2.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/desert2.png";
}
var Forest0={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/forest0\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/forest0.png";
}
var Forest1={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/forest1\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/forest1.png";
}
var Fort0={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/fort0\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/fort0.png";
}
var Fort1={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/fort1\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/fort1.png";
}
var Fort2={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/fort2\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/fort2.png";
}
var Fort3={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/fort3\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/fort3.png";
}
var Fort4={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/fort4\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/fort4.png";
}
var Fort5={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/fort5\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/fort5.png";
}
var Fort6={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/fort6\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/fort6.png";
}
var Fort7={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/fort7\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/fort7.png";
}
var Grass0={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/grass0.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/grass0.png";
}
var Mountain0={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/mountain0\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/mountain0.png";
}
var Mountain1={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/mountain1\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/mountain1.png";
}
var Mountain2={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/mountain2\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/mountain2.png";
}
var Mountain3={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/mountain3\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/mountain3.png";
}
var Mountain4={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/mountain4\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/mountain4.png";
}
var Mountain5={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/mountain5\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/mountain5.png";
}
var Mountain6={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/mountain6\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/mountain6.png";
}
var River0={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/river0\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/river0.png";
}
var River1={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/river1\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/river1.png";
}
var River2={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/river2\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/river2.png";
}
var River3={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/river3\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/river3.png";
}
var River4={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/river4\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/river4.png";
}
var River5={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/river5\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/river5.png";
}
var Town0={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/town0\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/town0.png";
}
var Town1={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/town1\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/town1.png";
}
var Town2={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/town2\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/town2.png";
}
var Town3={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/town3\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/town3.png";
}
var Town4={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/town4\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/town4.png";
}
var Town5={
changePicture:function(div){
var img=div.getElementsByTagName('img');
var r1=new RegExp("images\/tiles\/town5\.png", "i");
for(var i in img){
if(r1.test(img[i].src))
img[i].src="http://imagehosting.ic.cz/map/town5.png";
}

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_75', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_75', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=75&version=0.1.3';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();