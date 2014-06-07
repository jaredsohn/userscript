// ==UserScript==
// @name        Nomnomnomify
// @namespace   Nomnomnomify
// @description This plugin will eat all your websites
// @include     *
// @version     1
// @grant       none
// ==/UserScript==

setTimeout(function()
{
    var shapes={"w_rect":["cookiemonstercrumbypicturesopen-o.gif","tumblr_mohxt1V6a91svhqpoo1_500.gif","tumblr_md0q05wMJb1rxis0k.gif","tumblr_ml0nmjWpX41snjjivo1_500.gif","cookie4.gif"],"t_rect":["CookieMonster-Sitting.jpg","487961_10150955894571587_1215263686_n.jpg","534767_10151516100086587_1790492047_n.jpg","patientmonster.png"],"square":["cookie_monster.jpg","935823_10151502554911587_1547641144_n.jpg","902502_10151355606796587_45192127_o.jpg","cookie-monster.jpg"]},img_path="http://downloads.cdn.sesame.org/sw/OmNomNomify/";function chooseImg(shape){return img_path+shapes[shape][Math.floor(Math.random()*shapes[shape].length)]}function getShape(h,w){return h===w?"square":h>w?"t_rect":"w_rect"}var imgs=document.getElementsByTagName("img"),img,h,w,shape;for(var i=0,len=imgs.length;i<len;i++){img=imgs[i],h=img.height,w=img.width,s=getShape(h,w);img.setAttribute("height",h);img.setAttribute("width",w);img.src=chooseImg(s)};
}, 100);  