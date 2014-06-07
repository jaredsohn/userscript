// ==UserScript==
// @name Warez-BB Auto-Pager 2.2
// @namespace http://www.warez-bb.org
// @description Automatically load the next page of posts when you scroll down
// @author WolfWolf
// @include http://www.warez-bb.org/viewtopic*
// @include http://warez-bb.org/viewtopic*
// ==/UserScript==
var c=null;var d=null;window.addEventListener("load",m,false);setInterval(n,50);function e(z){var i,x,z=document.evaluate(z,document,null,6,null);for(i=0;i<z.snapshotLength;i++){x=z.snapshotItem(i);x.parentNode.removeChild(x)}}var g=e("//tbody/tr[position()>45 and position()<51]");function m(){d=q(document);var h=r(document);s(document)}function n(){if((c!=null)&&(document.body.offsetHeight-document.body.scrollTop<4.5*window.innerHeight)){o()}}function o(){var h=document.createElement("iframe");h.addEventListener("load",p,false);h.width=1;h.height=1;h.style.display="none";h.src=c;document.body.appendChild(h);c=null;function p(){var j=h.contentDocument;s(j);t(q(j),d);setTimeout(function(){h.parentNode.removeChild(h)},1500)}}function q(h){for(var j,i=0;j=h.getElementsByTagName("table")[i];++i)if(j.className=="forumline"&&j.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.tagName=="BR")return j}function r(h){for(var j,i=0;j=h.links[i];++i)if(j.innerHTML=="Next"&&j.getAttribute("href").substr(0,10)=="viewtopic.")return j}function s(h){var j=r(h);if(j)c=j.href}function t(h,j){var k;while((k=h.rows[0]))j.tBodies[0].appendChild(k)}