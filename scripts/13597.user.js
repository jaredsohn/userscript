// ==UserScript==
// @name           facebook scriptt.
// @namespace      http://hs.facebook.com/profile.php?id=1533330028
// @description    makes pages load faster, enlarges image thumbnails, has a dynamic application remover, removes ads, and displays ages.
// @include        *facebook.com*
// ==/UserScript==

 // change any of these to false to disable them (ex. thumbnail = false;)
thumbnail = true;
appremover = true;
adremover = true;
agechecker = true;

if(thumbnail) {
// thumbnail enlarger start (original idea taken from znerp)
outer = document.createElement("div");
inner = outer.appendChild(document.createElement("div"));
outer.setAttribute("id", "waldo");
outer.setAttribute("style", "padding:2px; position:fixed; display:none; z-index:90210; top:10px; left:10px; background-color:#3B5998;");
outer.addEventListener("click", function () { this.style.display = "none"; }, false);
document.body.appendChild(outer);

for(i=0; i<document.images.length; i++) {
 if((/\d(\/q|\/t|\/s)\d/).test(document.images[i].src)) {
  document.images[i].addEventListener("contextmenu", function(e) { changeImage(e, this.src.replace((/\/[(q|t|s)]/), "\/n"), this.title);}, false);
 }
}

function changeImage(e, src, title) {
 inner.innerHTML = "<img src=\"" + src + "\">";
 if(title) { inner.innerHTML += "<br><font style='font-face:tahoma;font-size:10px;color:#fff'><b>description: </b>" + title + "</font><br>"; }
 outer.style.display = "inline";
 e.preventDefault();
 return false;
}
// thumbnail enlarger end
}
if(appremover && unsafeWindow.PROFILE_FBID != unsafeWindow.PROFILE_OWNER_ID) {
// app remover start (completely original by mee! :)

GM_registerMenuCommand("reset appkill", function() { GM_setValue("killedApps", ""); window.location.reload(); });
if(GM_getValue("killedApps")) {
 var applist = GM_getValue("killedApps").split(";");
}

if(applist) {
 for(j=0; j<applist.length; j++) {
  if(document.getElementById("box_app_" + applist[j])) {
   document.getElementById("box_app_" + applist[j]).style.display = "none";
  }
 }
}


for(k=0; k<document.links.length; k++) {
 if(document.links[k].id.indexOf("remove_box_app_") != -1) {
  document.links[k].innerHTML = "&nbsp;";
  document.links[k].setAttribute("class", "box_remove icon box_action");
  document.links[k].href = "javascript:void(0);";
  document.links[k].addEventListener("click", function() { killApp(this.id.split("_app_")[1]); }, false);
 }
 if(document.links[k].className == "app_icon") {
  document.links[k].addEventListener("click", function() { restoreApp(this.href.split("a_")[1]); }, false);
 }
}

function killApp(appid) {
 var applist = GM_getValue("killedApps").split(";");
 if(applist) {
  applist.push(appid);
  GM_setValue("killedApps", applist.join(";"));
 } else {
  GM_setValue("killedApps", appid);
 }
 
 if(document.getElementById("box_app_" + appid).className.indexOf("flex_open") != -1) {
  unsafeWindow.boxFlexToggle(document.getElementById("box_app_" + appid));
 }
 document.getElementById("box_app_" + appid).style.display = "none";
}

function restoreApp(appid) {
 var applist = GM_getValue("killedApps").split(";");
 document.getElementById("box_app_" + appid).style.display = "inline";
 for(l=0; l<applist.length; l++) {
  if(applist[l] == appid) {
   applist.splice(l,1);
   GM_setValue("killedApps", applist.join(";"));
  }
 }
 // document.location = window.location.href.split("#")[0] + "#a_" + appid;
}
// app remover end
}
if(adremover) {
// ad remover start (taken from userscript by jeremy christian, but changed by me)
function addGlobalStyle(css) {
 var head, style;
 head = document.getElementsByTagName('head')[0];	
 if (!head) { return; }
 style = document.createElement('style');
 style.type = 'text/css';
 style.innerHTML = css;
 head.appendChild(style); 
}

addGlobalStyle('#flyer_upload_pic_holder { display:none!important; }');
addGlobalStyle('#ssponser { display:none!important; }');
addGlobalStyle('#announce { display:none!important; }');
addGlobalStyle('.sponsors { display:none!important; }');
addGlobalStyle('.advert { display:none!important; }');
addGlobalStyle('.clickable { display:none!important; }');

if(document.getElementById("profileActionsSecondary")) { document.getElementById("profileActionsSecondary").style.display = "none"; }
// ad remover end
}
if(agechecker) {
// age checker start (completely original condensed version by mee! :)
if(document.getElementById("Birthday-data").childNodes[2].href) {
 document.getElementById("Birthday-data").appendChild(document.createTextNode(" (" + document.getElementById("Birthday-data").childNodes[2].href.split("&y1=")[1].split("&")[0] + " years old)"));
}
// age checker end
}