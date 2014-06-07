// ==UserScript==
// @name           WTFramework
// @namespace      name.powell.matt
// @description    Checks if the current page uses a JS framework (MooTools, YUI, Prototype, Scriptaculous, jQuery, dojo, MochiKit, base2, ExtJS, sIFR, Google Analytics, Jx)
// @include        *
// ==/UserScript==

/* credits go to: http://blog.olicio.us/2008/11/08/wtframework-bookmarklet/ for the initial version/detection*/
/* email me if you have questions: mpowell1221@gmail.com*/

var c=document.createElement("a")
c.id="__wtframework"
c.style.opacity="0.7"
c.style.position="fixed"
c.style.zIndex="99999"
c.style.top="15px"
c.style.right="20px"
c.style.background="#000"
c.style.styleFloat="right"
c.style.padding="7px 10px"
c.style.color="#fff"
c.style.border="solid 2px #fff"
c.style.textDecoration="none"
c.style.textAlign="left"
c.style.font="12px Lucida Grande,Helvetica,Tahoma"
c.style.MozBorderRadius="5px"
c.style.WebkitBorderRadius="5px"
c.style.WebkitBoxShadow="0px 0px 20px #000"
c.style.MozBoxShadow="0px 0px 20px #000"
c.href="javascript:void(0)"
var fm=[]
if (unsafeWindow['window'].MooTools) fm.push("MooTools ("+unsafeWindow['window'].MooTools.version+")")
if (unsafeWindow['window'].Jx) fm.push("Jx")
if (unsafeWindow['window'].YAHOO) fm.push("YUI ("+unsafeWindow['window'].YAHOO.util.Dom.VERSION+")")
if (unsafeWindow['window'].Prototype && unsafeWindow['window'].Scriptaculous) fm.push("Prototype ("+unsafeWindow['window'].Prototype.Version+") & Script.aculo.us ("+unsafeWindow['window'].Scriptaculous.Version+")")
else{
	if (unsafeWindow['window'].Prototype) fm.push("Prototype ("+unsafeWindow['window'].Prototype.Version+") ")
	if (unsafeWindow['window'].Scriptaculous)fm.push("Script.aculo.us ("+unsafeWindow['window'].Scriptaculous.Version+")")
}
if (unsafeWindow['window'].jQuery) fm.push("jQuery ("+unsafeWindow['window'].jQuery.fn.jquery+")")
if (unsafeWindow['window'].dojo) fm.push("Dojo Toolkit ("+unsafeWindow['window'].dojo.version+")")
if (unsafeWindow['window'].MochiKit) fm.push("MochiKit ("+unsafeWindow['window'].MochiKit.MochiKit.VERSION+")")
if (unsafeWindow['window'].base2) fm.push("Base2 ("+unsafeWindow['window'].base2.version+")")
if (unsafeWindow['window'].Ext) fm.push("ExtJS ("+unsafeWindow['window'].Ext.version+")")
if (unsafeWindow['window'].sIFR) fm.push("sIFR ("+unsafeWindow['window'].sIFR.VERSION+")")
if (unsafeWindow['window'].gaGlobal || unsafeWindow['window']._gat) fm.push("Google Analytics ("+unsafeWindow['window']._gat.lb+")")




c.innerHTML=unescape(fm.join("<br />"))
if (fm!="") document.body.appendChild(c)
c.addEventListener("click",function(){document.body.removeChild(c)},false)
c.addEventListener("mouseover",function() {c.style.opacity=0.7},false)
c.addEventListener("mouseout",function() {
									   setTimeout(function() {c.style.opacity=c.style.opacity-0.1;if (c.style.opacity>0) setTimeout(arguments.callee,100)},1000)
									   },false)
setTimeout(function() {c.style.opacity=c.style.opacity-0.1;if (c.style.opacity>0) setTimeout(arguments.callee,100)},3000)