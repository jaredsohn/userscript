// --------------------------------------------------
// Blog Bypass Surgeon
// version 0.1
// 2007.04.13
// Copyright (c) 2007, Tom Hebel
// --------------------------------------------------
// ==UserScript==
// @name          Blog Bypass Surgeon
// @namespace     
// @description   Bypasses blog spam and jumps straight to the actual article. Works with a range of popular blog sites (engadget, gizmodo, etc.). Includes an info/settings screen under the Greasemonkey menu.
// @include http://consumerist.com/*
// @include http://*.consumerist.com/*
// @include http://gizmodo.com/*
// @include http://*.gizmodo.com/*
// @include http://*.gizmodo.com/*
// @include http://neatorama.com/*
// @include http://*.neatorama.com/*
// @include http://lifehacker.com/*
// @include http://*.lifehacker.com/*
// @include http://gawker.com/*
// @include http://*.gawker.com/*
// @include http://engadget.com/*
// @include http://*.engadget.com/*
// @include http://ohgizmo.com/*
// @include http://*.ohgizmo.com/*
// @include http://*?_bypassed=1
// @include http://*&_bypassed=1
// @include http://*?_bypassed=1#*
// @include http://*&_bypassed=1#*
// ==/UserScript==
// --------------------------------------------------

if(GM_getValue("icon_visible",-1)==-1){GM_setValue("icon_visible",true);}
if(GM_getValue("multi_bypass",-1)==-1){GM_setValue("multi_bypass",true);}
String.prototype.trim=function(){return this.replace(new RegExp('^\s+|\s+$'),'');}
;GM_registerMenuCommand("Blog Bypass Surgeon",ab);bb();top.window.addEventListener('resize',function(){cb();ab();}
,true);function bb(){h=window.location.href;if(db()){eb();}
if(h.match(new RegExp("consumerist\\.com\\/[^/]+\\/[^/]+\\/[^\\.]+\\.php"))||h.match(new RegExp("gizmodo.com/[^/]+/[^/]+/[^\\.]+\\.php"))||h.match(new RegExp("lifehacker.com/[^/]+/[^/]+/[^\\.]+\\.php"))){fb();}
else if(h.match(new RegExp("ohgizmo\\.com\\/\\d{4}\\/\\d{2}\\/\\d{2}\\/[a-zA-Z0-9\\-]+"))){gb();}
else if(h.match(new RegExp('engadget\\.com\\/\\d{4}\\/\\d{2}\\/\\d{2}\\/[a-zA-Z0-9\\-]+'))){hb();}
else if(h.match(new RegExp("neatorama\\.com/\\d{4}/\\d{2}/\\d{2}/[a-zA-Z0-9\\-]+"))){ib();}
}
function jb(kb,lb){if(!lb&&db()&&!GM_getValue("multi_bypass",false)){mb(kb);return;}
kb=decodeURI(kb).trim();nb=kb.indexOf("#")!=-1?kb.indexOf("#"):kb.length;if(kb.indexOf("?")!=-1){ob="&";}
else{ob="?";}
window.location=encodeURI(kb.substring(0,nb)+ob+"_bypassed=1"+kb.substring(nb,kb.length));}
function pb(){if(GM_getValue("icon_visible",false)){GM_setValue("icon_visible",false);}
else{GM_setValue("icon_visible",true);}
try{qb=document.getElementById("_BBS_ICON").style.display;if(qb=="none"){eb();}
else{rb();}
}
catch(e){eb();}
}
function sb(){if(GM_getValue("multi_bypass",false)){GM_setValue("multi_bypass",false);}
else{GM_setValue("multi_bypass",true);}
}
function ab(){try{document.getElementById("_BBS_MENU").style.display="block";return;}
catch(e){}
s=document.createElement("STYLE");s.innerHTML="._bbs_{}";s.innerHTML="._bbs_ * {text-align:left !important;color:#fff !important;font-size:12px !important;font-family:helvetica,verdana,arial !important;}";s.innerHTML+="._bbs_co{z-index:9002 !important;position:fixed !important;left:0;top:0;bottom:0;right:0;margin:0 !important;}";s.innerHTML+="._bbs_bg{z-index:9003 !important;position:fixed !important;left:0;top:0;bottom:0;right:0;margin:0;background:#000 !important;opacity:.75 !important;}";s.innerHTML+="._bbs_mn{z-index:9004 !important;position:fixed !important;width:300px !important;max-height:500px !important;padding:10px !important;background:#5f5;font-weight:normal !important;}";s.innerHTML+="._bbs_t{margin-bottom:3px !important;color:#fff !important;font-size:14px !important;font-weight:bold !important;}";s.innerHTML+="._bbs_h{padding:3px !important;margin-bottom:2px !important;font-weight:bold !important;border-top:1px solid #fff;border-bottom:1px solid #fff;color:#fff !important;}";s.innerHTML+="._bbs_ul{list-style-type:none !important;color:#fff !important;font-weight:normal !important;}";document.body.appendChild(s);tb=document.createElement("DIV");tb.className="_bbs_co";tb.id="_BBS_MENU";ub=document.createElement("DIV");ub.className="_bbs_bg";tb.appendChild(ub);vb=document.createElement("DIV");vb.className="_bbs_mn";tb.appendChild(vb);wb='<div class="_bbs_t">Blog Bypass Surgeon<div>';wb+='<div class="_bbs_h">Quick Help</div>';wb+='<span style="font-weight:normal;"><img src="'+xb()+'" width="32" height="32" /> means the blogspam was bypassed successfully.<br /><img src="'+yb()+'" width="32" height="32" /> means some of the blogspam was bypassed, but there\'s still more. Click on it to bypass the current blog as well.</span>';wb+='<div class="_bbs_h">Settings</div>';wb+='<ul class="_bbs_ul">';wb+='<li><input type="checkbox" id="_BBS_MENU_T1"'+(GM_getValue("icon_visible",false)?' checked':'')+'/><label for="_BBS_MENU_T1">Show icon?</label></li>';wb+='<li><input type="checkbox" id="_BBS_MENU_T2"'+(GM_getValue("multi_bypass",false)?' checked':'')+'/><label for="_BBS_MENU_T2">Bypass multiple blogs automatically?</label></li>';wb+='</ul>';wb+='<button id="_BBS_MENU_B1" style="align:center;">Close</button>';vb.innerHTML=wb;document.body.appendChild(tb);vb.style.left=Math.round((document.body.clientWidth-vb.clientWidth)/2)+"px";vb.style.top=Math.round((window.innerHeight-vb.clientHeight)/2)+"px";document.getElementById("_BBS_MENU_T1").addEventListener('change',pb,true);document.getElementById("_BBS_MENU_T2").addEventListener('change',sb,true);document.getElementById("_BBS_MENU_B1").addEventListener('click',cb,true);}
function cb(){try{document.getElementById("_BBS_MENU").style.display="none";}
catch(e){}
}
function eb(){if(!GM_getValue("icon_visible",false)){return;}
try{document.getElementById("_BBS_ICON").style.display="block";return;}
catch(e){}
zb=document.createElement("IMG");zb.id="_BBS_ICON";zb.src=xb();zb.style.cssText="cursor:pointer;display:block;z-index:9001;position:fixed;left:10px;top:10px;margin:0;width:30px;height:30px;opacity:.75;";zb.alt="Blogspam bypassed successfully!";zb.addEventListener("mouseover",function(e){e.currentTarget.style.opacity="1";}
,true);zb.addEventListener("mouseout",function(e){e.currentTarget.style.opacity=".75";}
,true);zb.addEventListener("click",function(e){rb();}
,true);document.body.appendChild(zb);}
function mb(kb){try{zb=document.getElementById("_BBS_ICON");zb.src=yb();zb.alt="Blogspam bypassd, but there's more :(.";zb.burl=kb;zb.removeEventListener("click",function(e){rb();}
,true);zb.addEventListener("click",function(e){jb(kb,true);}
,true);}
catch(e){}
}
function rb(){try{document.getElementById("_BBS_ICON").style.display="none";}
catch(e){}
}
function yb(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1wQOEQIhtQvsXwAAAwNJREFUWMPNlz1IW1EUx38pKSRQ8EUqGDAQhwwvtGACpVTqEugi0pYIgjp0cLQ4SRcLfQ4dWjqFOhbqoILQgCIugotQKEJSqpghQwIVFFrIy+QbhNfh3vvMMy8fBhs9y/14957/uf977jnnwQ2L76ob0lHs1KAcnMk2KJrdEmTLQqdhGPblvYZh+Do2IB3F1jXRD4e8DTipiPbuS4O5uQkAQtoWFXMMgN7e+NUNSEexx2OiH/C7v1nn9fMHjwV4SNtyrVVGZDLrLib8zcCLxaJ91Ss6WFnxuOhXhLRlx4ha8TcD7unpaQpWrVY916jTm+YZmhYEe9k1Xyt3Gin3UlytVluuqaVbGeE178lAOor9YafoCdbIiEZSMcdcJ/YCr3PC2af9NsBwLA7A6OQCAFpfyLXptFAA4GjvCwDxkRkA+nUdgMWNTc9XkMms8+ur4TxVlwELQ9jxsOj3D80CkJqYaXrK/M4uAIlnqbpvixubdXOxH4Yw/ATe/xTYfkX9dUe4dy+eO/3ddcHU6aXrzpbxOT4Q7wNNjoLB9kD0J8NtrVP6lP54HxTMFq+gW+IwcPRHWAYQPqt4e2wi6Rrb+VzTeSUBqc+0LrBaxoGuMpAt40tHsRUD1vE2AIV94d36o2RHygv7OZc+Z968yJoOA7Vv839LLZbflW77Zb4dGBdB5F6w6d22mlf7LalP55vEMm0XA7W5vhuiaxexx5ULAo/eigUjqWsBUqFZtYU9Xebs+Vv2ClIPRZEXjup1C15//ATA0tpqRwCzk1N8fjPv0h+ODBKOQLZcui2RUBOWlQ5ldotMk5cpV508typKrYSut6VY7U9OTbO0tursp5xz8KARA5bV3f8C9SRGpS8kHyQEMbFRAAYTnUXCkowPZlFEwtxhHoDtg5ITkG7cB3yXa0KAlIxKw/dlfIgKJgJhwURowNsPKsfi3q0TmQPK4uTf/8rCRBYBtaH4djHQ6FcsHhGdwLklKxvRKlcNqBL8XPQsv2iPfpt12a/t/4LrzI7dzLRXln+JgApSDumD/AAAAABJRU5ErkJggg==";}
function xb(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1wQNEhER4s6M1gAAAvlJREFUSMfFlzFIG1EYx38nVzB0yGWQqlBIBoULCCqUUmlBQl2KtJKCUBA63GhxKbg49BwcFLoEwUWhQl0cQhXpYpFApyKoVEggGRRarMXB3FDMIFyHl5fe5e6Si632v7z3vvfd93/f977vvXcKLSAdx04lqoOLahsRzc4RZI9RAEzTtOu/NU1TcY7VsIS61lhH12CmH/vWmMnU1DgAMW2L8/KoVLGd5Eozwuc9ot9et8TKpVd+eF+QxrQtl64kz2TWa54HelwqlWxaxOHamleovCSmrTo99w+1JIxGow1JLMvy1ZHelssXaFoE7FWXXKLNz6ifQcuymuo4wyrJ/eQuj9Nx7Pntki9JEHkQzsujLg/rSV3JNfmw0wYY6kkC8OTFDABaR8z1wWmhAED+8woAyUcGAJ26DsDsxqZvVmcy63x9Z9ZKTgFRBskuYbizfxKA1LjR0Kv97R0ABkZSnrnZjU2PrOeLKRb8A+YOUNR0nJaztxnePHta6++si8ic1pWpCpDsAK2625FIOOP6g6FQetKetJ/sgEI5IKtvAipA/kysBKDr4txXURkYdI3t/b2Gcon2qr1yRYzzZw3q+EY8zh6jpOPY0uPK948AFHZFtur3Bq9kuLC757JXk5fFLdYGf66zm4CrjtNx7Oz7hUBl+/Zj937/+tTSvOvGm5gme1ytY3nXvr7TW1NIRrsBMIo5X0MrvcOh5vPWSU329mcRXXPUcSNIAxJGMeeSrfQOe2QSTlJPlcgwO1covf1b1BMno90YxRzpiWnUVF+CbN3kv0a9zVRf4vrqWHob5IiKpl8LccPIafr/O7kUeS3KBHOGqFm4WoVMLNdZvTy/hFHMhd6jMGWTt07IWycYxRxGMcfy/JL36ZOOYye2P4TaI78yCaN7NDJWOzJV559AYWSs1jcWFwIPkWZRcEZOHpPSbsM/CecxOre4cKX9nHk17bqNAl+Zng/7RdIl74oVtF9Wqk8Y0VbkRS/f0JeiV1FFm/9WFgs/8Of4DZ1eKKD++lVoAAAAAElFTkSuQmCC";}
function db(){q=window.location.href;return(q.indexOf("&_bypassed=1")!=-1||q.indexOf("?_bypassed=1")!=-1);}
function gb(){if($b=_b()){jb($b);return;}
ac=document.getElementsByTagName("P");for(i=0;i<ac.length;i++){if(bc=ac[i].innerHTML.match(new RegExp('VIA\\s\\[\\s<a\\shref="([^"]+)">[^<]+<\\/a>\\s\\]',"i"))){jb(bc[1]);return;}
}
}
function fb(){if($b=_b()){jb($b);return;}
ac=document.getElementsByTagName("P");cc=new Array();cc[0]=new RegExp('<a\\shref="([^"]+)">[^<]+<\\/a>\\s*\\[[^\\]]+\\]');cc[1]=new RegExp('\\[via\\s<a\\shref="([^"]+)">\\s*[^<]+<\\/a>\\]',"i");cc[2]=new RegExp('<div\\sclass="related"><a\\shref="([^"]+)">[^<]+<\\/a>\\s\\[[^\\]]+\\]<\\/div>');for(i=0;i<ac.length;i++){if(ac[i].parentNode.className!="postText"&&ac[i].parentNode.className!="entry"){continue;}
j=cc.length;while(j--){bc=ac[i].innerHTML.match(cc[j]);if(bc){break;}
}
if(!bc){j=cc.length;while(j--){bc=ac[i].parentNode.innerHTML.match(cc[j]);if(bc){break;}
}
}
if(bc){jb(bc[1]);return;}
}
}
function hb(){dc=document.getElementsByTagName("LI");for(i=0;i<dc.length;i++){ec=dc[i];if(ec.className=="readlink"){if(!(fc=ec.getElementsByTagName("A")).length){break;}
jb(fc[0].href);return;}
}
tb=document.getElementsByTagName("DIV");for(j=0;j<tb.length;j++){if(tb[j].className!="post"){continue;}
if(bc=tb[j].innerHTML.match(new RegExp('\\[Via\\s<a\\shref="([^"]+)">[^<]+<\\/a>\\]',"i"))){jb(bc[1]);}
}
}
function ib(){if($b=_b()){jb($b);return;}
ac=document.getElementsByTagName("P");for(i=0;i<ac.length;i++){l=ac[i].firstChild;if(l.tagName!="A"||l.innerHTML=="undefined"){continue;}
if(bc=l.innerHTML.match(new RegExp('Link',"i"))){jb(l.href);return;}
}
}
function _b(){var ac=gc(document.getElementsByTagName("object"),document.getElementsByTagName("embed"));for(i=0;i<ac.length;i++){var hc=ac[i];try{if(bc=hc.getElementsByTagName("PARAM").item(0).value.match(new RegExp('http:\\/\\/www.youtube.com\\/v\\/[a-zA-Z0-9]{11}'))){return bc[0];}
}
catch(e){if(bc=hc.src.indexOf("metacafe.com/fplayer")!=-1){return bc[0];}
}
}
}
function gc(ic,jc){kc=new Array();for(i=0;i<ic.length;i++){kc[i]=ic[i];}
for(j=i;j<i+jc.length;j++){kc[j]=jc[j];}
return kc;}
