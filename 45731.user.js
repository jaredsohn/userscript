// ==UserScript==
// @name			Web Assets Detector
// @namespace		http://www.quchao.com/entry/web-assets-detector
// @author			Qu Chao (Chappell.Wat) <Chappell.Wat@Gmail.com>
// @description		To detect which js/css libraries/frameworks/toolkits are being used by a page.
// @resource		style http://watsilla.googlecode.com/svn/trunk/userscripts/web_assets_detector/resources/style.css?ver=1.4.4.css
// @resource		icons http://watsilla.googlecode.com/svn/trunk/userscripts/web_assets_detector/resources/icon.png?ver=1.4.4.css
// @require			http://watsilla.googlecode.com/svn/trunk/userscripts/web_assets_detector/resources/data.js?ver=1.4.4.js
// @include			http*
// @version			1.4.4
// ==/UserScript==
// Contributors
//  jerone (http://www.jeroenvanwarmerdam.nl)
(function(){var a=function(){const f=document;var g=null;var e=new Image();e.setAttribute("src",GM_getResourceURL("icons"));var b=function(i,k,j){var h="";if(0<j){h=Math.pow(10,j-1).toString().replace("1","\u251c").replace(/0/g,"\u2500")+" "}i.forEach(function(n){var l=n.version();if(false!==l){var r=h+n.name+((String===l.constructor)?" "+l:""),q=f.createElement("li");k.appendChild(q);var o=f.createElement("canvas");q.appendChild(o);o.setAttribute("width","16");o.setAttribute("height","16");var m=o.getContext("2d");c(m,n.icon);var p=f.createElement("a");q.appendChild(p);p.appendChild(f.createTextNode(r));p.setAttribute("target","_blank");p.setAttribute("href",n.link);if(undefined!==n.children){k=b(n.children,k,j+1)}n=null;r=null;o=null;m=null;q=null;p=null}l=null});return k};var c=function(i,h){var k=h%10,j=parseInt(h/10,10);i.drawImage(e,(16*k),(16*j),16,16,0,0,16,16)};var d=function(){var h=b(assetsData||[],f.createDocumentFragment(),0);if(false===h.hasChildNodes()){h=null;return}if(null===g){GM_addStyle(GM_getResourceText("style"));g=f.createElement("ul");g.appendChild(h);g.setAttribute("id","assetsDetector");f.body.appendChild(g);g.addEventListener("mouseup",function(i){if(2===i.button){i.preventDefault();g.removeEventListener("mouseup",arguments.callee,false);f.body.removeChild(g);g=null}},false)}else{while(g.lastChild){g.removeChild(g.lastChild)}g.appendChild(h)}h=null};return{init:function(){var h=setTimeout(d,0);f.addEventListener("DOMNodeInserted",function(i){if("SCRIPT"===i.target.nodeName){if(null!==h){clearTimeout(h)}h=setTimeout(d,1000)}},false)}}}();if(top==unsafeWindow){a.init()}})();
