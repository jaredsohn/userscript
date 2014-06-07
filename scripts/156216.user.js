// ==UserScript==
// @name        google cache comeback
// @namespace   trespassersW
// @description Brings back links to cached pages in the  Google search results
// @include     http://www.google.*
// @include     https://www.google.*
// @include     http://webcache.googleusercontent.*
// @include     https://webcache.googleusercontent.*
// @homepageURL http://userscripts.org/scripts/show/156216
// @updateURL https://userscripts.org/scripts/source/156216.meta.js
// @version     2.2.5
// @date 2013-06-15
// @grant GM_addStyle
// @grant GM_log
// @run-at document-end
// 2014-03-13 2.2.5 fixed text overlapping?
// 2013-06-14 2.2.4f cache link: fixed 'display' property  for logged-in user; share link hidden 
// 2013-05-31 2.2.4 plain cache links; thanks to luckymouse[userstyles.org/styles/64844]
// 2013-02-11 2.2.3 default: Esc shows gCache; cached/similar always visible. 
// 2013-02-04 2.2.2 more  "run by ESC"  options
// 2013-02-02 2.2.1 run by ESC option comeback
// 2013-01-31 2.2 native G cache/similar links revealed; no Escape required
// 2013-01-24 2.1 now works in cached pages called from preview
// 2013-01-11 2.0 hit ESC to run the script!
// 1.3.3 links to alien cached pages
// 1.3.1 links to cache in cached page
// 1.2.1 internal links in cached page become internal
// @icon data:image/gif;base64,R0lGODlhFgAYAOePAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yH5BAEKAP8ALAAAAAAWABgAAAj+AP8JHDiQj0E+BBMq/IdIlTd06LypQrQw4adx3BrhyZMHTyNu4z5VFKjMGyI7BO0g8qZsZKFpoeQolBNqWqGFXUgZ01NRjzFSXRR2EZVM5kI5yUQFTXil07IxFccs63RF4RJJ0ZZMakZunrxxzkg5iSZpiUIiiEhlWyfvHj588tqNq7bKDxGFRkRZI7duHj59+Oa1I7fNmS2zBP0EUzYtm5ohWdTQOfNEiaFlw3CJHKhKVzFmTZjgMeXrl69QaojU4SWLFEFTsnjNSULHVK1YvXLV8nRmSCVUnxoJ3NPoUqYhZ+QseprFzbZMcbpAqaRokEA3fhIFQuJlDZ87YLydePGDJ46XJJME7REIBs4eQz26nNEh5o79KkPgZHnC6I4bgU5oYQYcViTRhRcm8CCEDj6o0UUSeKwxRhQDKbGFGYXgYKAYTCCxxRkPKnGIF1UoMVAPAWLYQxJVdOFiFUkoUYkWUxShUA5KPIEFIatckggppvgRhRJC3FBRDUQo4YQUUnghxZBH9CDDSP+8kMMPQ2Q5RBBSskDllwoFBAA7
// ==/UserScript==
const runByEsc         = false // | true  /* hit ESC to run on search & cached pages */
const runByEscCached   = false // | true  /* hit ESC to run on cached page */
const runByEscSearch   = false    | true  /* hit ESC to run on search page */
/* the reasons of options listed above: 
 - I suspect sometimes G doesn't show the cache link; nevertheless it exists;
 - some pages build themself dynamically using xmlhttprequest, jquery & other such crap (G for example);
   so my script can't find all references on the displayed page until the loading process is finished;
 - scripts's icons on cached page are annoying if you don't plan to use them.
*/
const showPadlock      = true  //  & false  // 2013-04-25

var  iconAcnhor, gComemBack;
const bref = "http://webcache.googleusercontent.com/search?ie=UTF-8&q=cache:";

var insideCache;

function main(e){
if( insideCache )
 casche(e);
else
 rezultz(e);
}
 
function rezultz(e){ 
/*  v2.1 13-01-24 */
 if(Xel('//a[starts-with(@class,"googCacheComeBack")]')) {
  //GM_log('search: already')
  return;
 }
 if(e) e.preventDefault() , e.stopPropagation();
try{
 var rez = Xels('//div[@id="search"]//li[@class="g"]');
 for(var i=0,li=rez.length; i< li; i++){
   var a=Xel('.//a',rez[i]);
// a.removeAttribute("onmousedown"); // it's not my funeral
   var aref=bref + hesc(a.href); //
   var cache= buildEl('span',{style: 'color: black'},null,' &#x2023; ');
   cache.appendChild(
     buildEl('a', {href: aref, 'class': 'googCacheComeBack fl'
     //,style: 'color: #0E1BA3; text-decoration: none;'
     ,target:'_blank'},
     null,'gCache'));
   var cite = Xel('.//cite',rez[i]);
   cite && cite.appendChild(cache);
  }
}catch(e){ GM_log('cacherr:\n'+e) }
/* */
}

function casche(e)  //{try
{//inside cached page
 if(Xel('//a[starts-with(@class,"gooCache")]')) {
  //GM_log('cache: already')
  return;
 }
 if( runByEsc || runByEscCached ) e.preventDefault(), e.stopPropagation();
 var hloc=location.href+''; /*2012-07-14*/
 var hloc=hloc.split(/\/?\#|\%23/)[0];
 var loc =hloc.match(/[\&\?]q\=cache\:(.*)/);
 if(!loc || !loc[1]){ GM_log('not webcache\n'+hloc); return;}
// loc=loc[1]; //unescape(loc[1]);
 loc = Xel("/html/body/div/div/a").href+''; // 2013-01-24
 var ctr=0;
 var dom= FLD(loc);
 var L=unsafeWindow.document.links;
 GM_addStyle(iconAcnhor);
 var ctr=0;
 for( var i= L.length-1; i>=0; i--){
   var ref=L[i].href.split(/\/?\#|\%23/);
   //http://support.mozilla.org/en-US/kb/categorizing-bookmarks-make-them-easy-to-find#w_using-tags
//   ref.length>1  &&  GM_log('l#'+ref[0]+'#'+ref[1])
   if(ref.length>1 && ref[0]==loc){
//    GM_log('A#'+ref[0]+'#'+ref[1])
    L[i].href=hloc+'#'+ref[1]; // it should be full URL 'cause G defines BASE in page's header
    L[i].removeAttribute("onmousedown"); // ??
    L[i].className = (L[i].className?L[i].className+' ':'') +
     'gooCacheAnchor';
   }else{
     var refdom=FLD(ref[0]);
     //GM_log('refdom: ' + refdom.d )
     if(refdom && dom){
       e=buildEl('a',{'class': (refdom.d==dom.d)?'gooCacheLink':'gooCacheExt',
/* */    title: 'cached', /* */
         href: bref+hesc(L[i].href)
       },null,''); //'&darr;'
       insAfter(e,L[i]);
     } 
    }
   }
//}catch(e){GM_log('linkerr:\n')+e;}
}


function hesc(href){
 var hr=href+'';
 const re=/^(.+?)([\?\#\&].*)$/;
 var m=hr.match(re);
 if(m && m.length==3){
  hr=m[1]+escape(m[2]);
  //GM_log('!'+hr);
 }
 return hr;
}

function buildEl(type, attrArray, eL, html){
	var node = document.createElement(type);
	for (var attr in attrArray) if (attrArray.hasOwnProperty(attr))
		node.setAttribute(attr, attrArray[attr]);
	if(eL)
		node.addEventListener(eL[0], eL[1], eL[2]?true:false);
	if(html) 
		node.innerHTML = html;
	return node;
}

function Xel(XPath, contextNode){
    var a = document.evaluate(XPath, (contextNode || document), 
    null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    return (a.snapshotLength ? a.snapshotItem(0) : null);
};

function Xels(XPath, contextNode){
    var ret=[], i=0;
    var a = document.evaluate(XPath, (contextNode || document), 
    null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    while(a.snapshotItem(i))
      ret.push(a.snapshotItem(i++));
    return ret;
};

function FLD(url){
 var dm=url.match(/^(https?\:)\/\/(.+?)\//);
 if(!dm || dm.length<3) return null;
 dd=dm[2].split('.');
 if(dd.length<2) return null;
 return {p:dm[1], d: dd[dd.length-2]+'.'+dd[dd.length-1]};
}
/* * /
function insBefore(n,e){
   return e.parentNode.insertBefore(n,e);
}/* */
function insAfter(n,e){
  if(e.nextSibling){
   e.parentNode.insertBefore(n,e.nextSibling);
  }else if(e.nextElementSibling){
   e.parentNode.insertBefore(n,e.nextElementSibling);
  }else
   e.parentNode.appendChild(n);
}
iconCacheLink='\
content:url(data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAABMklEQVQoz42QP0tCYRSHnxuXhjCIigtW4KBRweuU1NDS0lIY9AFaWqItDIy+goM01RAI0ewkCG1BShQuweXqTRwasugS9EejWk6DaPfmTfot73nPOQ+/c46GS+l8Xdz/xPKYRi+l83VxmiIiIk5T5PjcERVPyr8AFU+Kiiclf/0qm0e2L6i3g9EBiK7uYuZSGkBla1uGA/2+Jn3t4MuneFNv+EJaofouewenPfc1JiJkd6KaZ7y1pXmK5SduHxWl2k9zLAwhw8Q+O/HudFV99gDpjXtqD00u7QilGoSMbmcd8ABzk0NMjwdYmX2jctegWP4DcqvtnL1QwCCxcLAbcl4+CRkmoEhkgsTCAK23NZ6Jbfk4LcyMAC3w9yH8pANkDvc7CeUqflhgWzC1uI6ZS3Xy35M8hMl4RkDrAAAAAElFTkSuQmCC\
)';
iconAcnhor=
'\
.gooCacheAnchor:after{\
position: relative; top: 6px; \
content:url(data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAWElEQVR42mNkQAM6vmX/r2zuYoTxGdEl1R1iGW4eWMwAU8RIkgnBvZf/w9hri3XJMAGnApDRMCORFYDE4YIg14MUwRSAJEG+gSsA0SBFMADzKkY4wNgwawC9Qz2rUJ9HmwAAAABJRU5ErkJggg==\
)}\
.gooCacheLink:before{\
position: relative; top: 6px; opacity: 0.8;'+
iconCacheLink+
'}\
.gooCacheExt:before{\
position: relative; bottom: 4px; opacity: 0.8; \
content:url(data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAkklEQVR42mNkQALbLn76f+PpF4b1u08yvL9zHCzGyIAF9G179h+miBGXZKCrOdgkRmTVICCoYgmWLPKSAssx2hau/w8S4BaTBCuY3FgOVnS4P5AR5CZGHd+y/7n1nWAJZHBlcxfYehQFSZkFYJNAbBQFMAkQ+PrqOcO86RMQCkBuADkQZC8IwNggN4AV4PMFiA8ADbFh5B0GQNAAAAAASUVORK5CYII=\
)}\
.googCacheComeBack{\
}\
';
// from: [http://userstyles.org/styles/64844/google-search-plain-view-cached-similar-links]
// by luckymouse [http://userstyles.org/users/14255]
gComeBack ='\
.clickable-dropdown-arrow.ab_button {display: none !important;}\
.action-menu.ab_ctl {\
position: static !important;\
display: inline-block !important;\
margin: 0 !important; \
vertical-align: baseline !important;}\
.action-menu-panel.ab_dropdown {\
visibility: visible !important;\
position: static !important;\
box-shadow: none !important;\
border: none !important;}\
.ab_dropdownitem {display: inline !important;}\
.ab_dropdownitem::before,\
.ab_ctl + a.fl[href*="translate.google.com/"]::before\
{content: "\\a0\\2023"; color: #000;\
padding-right: 2px; font-size: 14px !important;}\
.ab_dropdownitem:hover {cursor: auto !important; background: transparent !important;}\
.action-menu-item div.action-menu-button {display: none !important; }\
.action-menu-item a.fl {\
color: #1122CC !important;\
display: inline !important;\
padding: 0 3px 0 0 !important;\
font-size: 14px !important;\
}\
.action-menu-item a.fl:hover {text-decoration: underline !important;}\
/*2013-06-14*/\
.action-menu-panel.ab_dropdown {background-color: transparent !important;}\
div.f[style*="white-space:nowrap"] {white-space:normal !important;} \
.action-menu-button {display: inline !important; }/**/\
.kv, .slp { /*2014-03-13*/\
display: inline-block !important; padding-left: 4px !important;\
}\
.crl{padding-right: 6px !important;}\
';
/*
 li.g:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)
 */

insideCache  = location.href.indexOf('webcache')>=0;

if(!insideCache) 
 GM_addStyle(gComeBack); /* 11-02-31 */

if( runByEsc || (insideCache && runByEscCached) || (!insideCache && runByEscSearch) ) {
 window.addEventListener("keydown", function(e){
 if(e.keyCode==27){
  main(e);
 }}, false);
}else
  main(null);
 