// ==UserScript==
// @name           Ultimate-Guitar Post Recorder
// @namespace      http://userscripts.org/users/23652
// @description    Remembers what threads you posted in and makes their thread link text red
// @include        http://www.ultimate-guitar.com/forum/forumdisplay.php?f=*
// @include        http://www.ultimate-guitar.com/forum/showthread.php?t=*
// @include        http://www.ultimate-guitar.com/forum/newreply.php*
// @copyright      JoeSimmons
// @version        1.0.0
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://userscripts.org/scripts/source/51532.user.js
// ==/UserScript==

Array.prototype.inArray = function(value) {
for(let i=this.length-1; i>=0; i--) if(this[i]==value) return true;
return false;
};

// Define GM_addStyle if it's not Firefox
if(typeof GM_addStyle==='undefined') 
    GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if (!head) {return}
        style.type = 'text/css';
        try {style.innerHTML = css} catch(x) {style.innerText = css}
        head.appendChild(style);
    }

var main = {

whichPageRegex : /forum\/(\w+)\.php/i,
topicRegex : /[?&]t=([^&#]+)/i,

get url() {
return window.location.href;
},

get whichPage() {
return main.url.match(main.whichPageRegex)[1];
},

resetThreads: function() {
if(confirm("Really reset read threads?")) window.setTimeout(function(){GM_deleteValue("posted");}, 0);
},

getThreads : function() {
return (new Function("return "+GM_getValue("posted", "([])")+";"))();
},

setThreads : function(e) {
GM_setValue("posted", e.toSource());
},

clicked : function(e) {
var topic=(main.url.indexOf("t=")!=-1?main.url:$g("//strong[.='Thread']/following-sibling::a[contains(@href,'t=')]",{type:9}).href).match(main.topicRegex)[1], arr=main.getThreads();
if(!arr.inArray(topic)) {
arr.push(topic);
main.setThreads(arr);
}
},

run : function() {
switch(main.whichPage) {
case "forumdisplay":
var threads=$g("//a[contains(@href,'showthread.php?t=')]"),
	arr=main.getThreads();
for(let i=0,item; (item=threads.snapshotItem(i)); i++) if(arr.inArray(item.href.match(main.topicRegex)[1])) item.className=item.className==""?"red":item.className+" red";
break;
case "showthread": case "newreply":
var buttons=$g("//input[@value='Post Quick Reply' or @value='Submit Reply' or @value='Submit Message']");
for(let i=0,item; (item=buttons.snapshotItem(i)); i++) item.addEventListener("click", function(e) {main.clicked(e.target);}, false);
break;
}
},

};

GM_addStyle(".red {color:#FF0000 !important;}");

main.run();

GM_registerMenuCommand("Reset Read Threads", main.resetThreads);