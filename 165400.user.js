// ==UserScript==
// @name       test
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==
document.onreadystatechange = stateChange;
var aid;
var cid;
var realCID;
var button = document.createElement("a");
var ne = document.getElementById("bofqi");
var bilibili = document.createElement("embed");
function info(){
	//aid="532385";
    //cid="806134";
    var url = document.URL;
    var id = url.split('av')[1];
    var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://api.bilibili.tv/view?type=json&id=" + id, false);
	xhr.send();
    var cid = eval("(" + xhr.responseText + ")").cid;
    if(cid!=undefined){
    	realCID = cid;
         return "cid=" + realCID;
    }
   
}
	bilibili.type = "application/x-shockwave-flash";
	bilibili.width = 950;
	bilibili.height = 482;
	bilibili.src = "https://static-s.bilibili.tv/play.swf";
	bilibili.setAttribute("flashvars", info());
	bilibili.setAttribute("quality", "high");
	bilibili.setAttribute("allowfullscreen", "true");
	bilibili.setAttribute("allowscriptaccess", "always");
	bilibili.setAttribute("rel", "noreferrer");
var ur = "https://secure.bilibili.tv/secure,cid="+realCID;
button.setAttribute("href","https://secure.bilibili.tv/secure,cid="+realCID);
button.innerHTML = "黑科技按钮！";
function stateChange() {
if(document.readyState == 'complete') {
ne.appendChild(button);
//ne.appendChild(bilibili);
}
}