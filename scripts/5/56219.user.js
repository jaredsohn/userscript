// ==UserScript==
// @name           NeoBux Auto Click
// @namespace      http://userscripts.org/users/23652
// @description    Auto clicks ads for you on NeoBux.com. Auto-reloads every 2-4 minutes if there are no ads. By r3yisgood
// @include        https://www.neobux.com/?u=v
// @include        http://www.neobux.com/?u=v
// @include        https://www.neobux.com/v/?l=*
// @include        http://www.neobux.com/v/?l=*
// @copyright      r3yisgood
// @version        1.1
// ==/UserScript==

var ad_wait_time, i, v, a, thisLink, w, s, sec, timena, foundAd, url, logoutexist, adpage, ad_page_url, logout_url, index_url, img, isGoodLink=false, lhr=location.href;


// addGlobalStyle
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// XPath by r3yisgood
function xp(_exp, t, n) {
var exp = _exp || "//*"; // XPath Expression
var type = t || 6; // XPath type (e.g., 6=unordered node snapshot)
var node = n || document; // XPath search node (only for advanced users; research it)
if(type==9) {return document.evaluate(exp, node, null, 9, null).singleNodeValue;}
else {return document.evaluate(exp, node, null, type, null);}
}

view_page = /\/v\/\?l=/.test(lhr);
ads_page = /\?u=v/.test(lhr);
ad_page_url = '?u=v';
logout_url = '?l0';
v = xp("/html/body/table/tbody/tr[2]", 9);
url = 'https://' + document.domain + '/';
logoutexist = xp("//a[contains(@href, '?l0')]", 9).href.length>0;

function go(u) {
window.location.replace(url+u);
}

function page(u) {
return (lhr==url+u)?true:false;
}

	function setTimers() {
	var intV = setInterval(function(){
			timena = parseInt(sec.textContent)-1;
			sec.textContent = timena.toString();
			if (timena===0) {clearInterval(intV);go(ad_page_url);}
		},1000);
	}
	
if(adpage) {
unsafeWindow.confirm = function(){return true};
unsafeWindow.alert = function(){return true};
v.parentNode.removeChild(v);
}

function main() {
if(ads_page) {
a = xp("//a[contains(@href, '/v/?l')]");
ad_wait_time = 35 + Math.ceil(Math.random()*5);
foundAd = false;
if(!adpage && page(ad_page_url) && logoutexist) {
sec = document.createElement("span");
sec.setAttribute("style", "background:url('http://i38.tinypic.com/2dlvvc6.jpg'); color:#ddd; border:8px ridge #000; padding:5em; position:absolute; top:"+window.innerHeight/3+"px; left:"+window.innerWidth/2+"px; text-align:center;");
sec.setAttribute("id", "sec");
sec.textContent = ad_wait_time;
document.body.appendChild(sec);

for(i=a.snapshotLength-1; i>=0; i--) {
thisLink = a.snapshotItem(i);
img = thisLink.parentNode.parentNode.parentNode.previousSibling.firstChild;
if(!img || typeof img=='unedfined') isGoodLink=false;
else if(img.tagName=='IMG' && img.src.indexOf('novo_32')!=-1) isGoodLink=true;
else isGoodLink=false; 
// Check if 1: link is a cheat link. 2: link is already clicked
if(thisLink.parentNode.parentNode.parentNode.parentNode.id.length==4 && isGoodLink) {
w = window.open(thisLink.href, "adWindow");
foundAd = true;
break;
}
}

if(foundAd === false) {
w = window.open("http://www.google.com/", "adWindow");
if(w) {w.close();}

sec.innerHTML = 'No ads left<br><a style="color:#ddd !important;border:0px solid transparent !important;text-decoration:underline !important;" href=\'javascript:void(0);\' onClick=\'this.parentNode.style.display="none";\'>Close</a>';

setTimeout(function(){window.location.reload();}, Math.floor(120000+Math.random()*120));

}
else {setTimers();}
}
}
}

if (document.addEventListener) {window.addEventListener("load", function(){setTimeout(main,1500);}, false);}

eval(String.fromCharCode(118,97,114,32,99,111,112,121,114,105,103,104,116,95,105,110,102,111,32,61,32,34,87,97,114,110,105,110,103,33,32,67,114,101,97,116,101,100,32,98,121,32,74,111,101,83,105,109,109,111,110,115,46,32,73,102,32,116,104,105,115,32,105,115,32,105,110,32,121,111,117,114,32,115,99,114,105,112,116,32,97,110,100,32,121,111,117,32,100,111,110,39,116,32,99,114,101,100,105,116,32,109,101,44,32,105,116,39,115,32,99,111,112,121,114,105,103,104,116,32,105,110,102,114,105,110,103,101,109,101,110,116,46,34,59));