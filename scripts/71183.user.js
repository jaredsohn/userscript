// ==UserScript==
// @name          Farmville - Facebook
// @description	  Mostra su facebook solo le pubblicazioni di farmville in una pagina filtrata
// @author        Sisko
// @version        2.0
// @copyright     Sisko
// @include       http://www.facebook.com/home.php?filter=app_102452128776*
// @require        http://sizzlemctwizzle.com/updater.php?id=71183
// ==/UserScript==

(function(){


var unsafeWindow = unsafeWindow || window.wrappedJSObject || window;
if(unsafeWindow.frameElement != null) return;

function $g(que, O) {
if(!que||typeof(que)!='string'||que==''||!(que=que.replace(/^\s+/,''))) return false;
var obj=O||({del:false,type:6,node:document}), r, t,
	idclass_re=/^[#\.](?!\/)[^\/]/, xp_re=/^\.?(\/{1,2}|count|id)/;
if(idclass_re.test(que)) {
var s=que.split(' '), r=new Array(), c;
for(var n=0; n<s.length; n++) {
switch(s[n].substring(0,1)) {
case '#': r.push(document.getElementById(s[n].substring(1))); break;
case '.': c=document.getElementsByClassName(s[n].substring(1));
		  if(c.length>0) for(var i=0; i<c.length; i++) r.push(c[i]); break;
}
}
if(r.length==1) r=r[0];
} else if(xp_re.test(que)) {
r = document.evaluate(que,(obj['node']||document),null,((t=obj['type'])||6),null);
if(typeof t=="number" && /[12389]/.test(t)) r=r[(t==1?"number":(t==2?"string":(t==3?"boolean":"singleNode")))+"Value"];
}
if(r && obj['del']===true) {
if(r.nodeType==1) r.parentNode.removeChild(r);
else if(r.snapshotItem) for(var i=r.snapshotLength-1; (item=r.snapshotItem(i)); i--) item.parentNode.removeChild(item);
else if(!r.snapshotItem) for(var i=r.length-1; i>=0; i--) if(r[i]) r[i].parentNode.removeChild(r[i]);
} return r;
}

// Get ID
function $(ID,root) {return (root||document).getElementById(ID);}

function click(e, type) {
if(!e && typeof e=='string') e=document.getElementById(e);
if(!e) {return;}
var evObj = document.createEvent('MouseEvents');
evObj.initMouseEvent((type||'click'),true,true,window,0,0,0,0,0,false,false,false,false,0,null);
e.dispatchEvent(evObj);
}

String.prototype.find = function(s) {
return (this.indexOf(s) != -1);
};

String.prototype.getPref = function(s, splitter) {
return this.split(s+"=")[1].split((splitter||"&"))[0];
};

// Define GM_addStyle if it's not Firefox
var GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if(head) {
        style.type = 'text/css';
        try {style.innerHTML = css} catch(x) {style.innerText = css}
        head.appendChild(style);
		}
    };

// XPath by JoeSimmons
function xp(exp, t, n) {
var x = document.evaluate(exp||"//body",n||document,null,t||6,null);
if(typeof t=="number" && /[12389]/.test(t)) x=x[(t==1?"number":(t==2?"string":(t==3?"boolean":"singleNode")))+"Value"];
return x;
}



// ===============================================================================



var url = window.location.href,
	filter = url.getPref("filter").substring(4),
	stream = xp("//*[@id='home_stream' or @id='pagelet_intentional_stream' or @id='contentArea']", 9),
	prof = xp("//a[@href and .='Profile']", 9),
	profileRegex = /facebook\.com\/([^?]+)/i,
	hideSelf = url.find("ignore_self=true");

// Get profile id/name
if(prof) var profile = prof.href.find("id=") ? prof.href.getPref("id") : prof.href.match(profileRegex)[1];
GM_addStyle("#contentArea *[id^=\"div_story_\"]:not([class*=\"aid_"+filter+"\"]), #contentArea *[id^=\"li_story_\"]:not([class*=\"aid_"+filter+"\"]) {display:none !important;}");

function main() {
var posts = unsafeWindow.document.evaluate(".//*[starts-with(@id,'div_story_') or starts-with(@id,'li_story_') or starts-with(@id,'stream_story_')]/.[not(contains(@id, '_collapsed'))]", stream, null, 6, null);
var i=0, len=posts.snapshotLength;
if(len > 0) do {
var post = posts.snapshotItem(i), ownPost = xp(".//a[contains(@href, '"+profile+"')]", 8, post) != null;
if(!post.getAttribute("class").find("aid_"+filter) || (hideSelf && ownPost)) post.parentNode.removeChild(post);
} while (++i < len);
var similarposts=$g(".//a[@rel='async' and contains(@href,'oldest=') and contains(@href,'newest=')] | .//a[@rel='async' and contains(@ajaxify,'oldest=') and contains(@ajaxify,'newest=')] | .//a[@rel='async' and contains(.,'SHOW') and contains(.,'SIMILAR POSTS')]", {node:stream});
i=0, len=similarposts.snapshotLength;
if(len==0) return;
do {
	click(similarposts.snapshotItem(i));
} while(++i < len);
}

main();
window.setInterval(main, 500);

})();

