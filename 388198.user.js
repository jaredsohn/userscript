// ==UserScript==
// @name       fbn
// @namespace  http://img.ssdclient.com/index.php/
// @version    1.3
// @description  enter something useful
// @match      http://*.hackforums.net/*
// @copyright  2013+, Unrep
// @downloadURL http://img.ssdclient.com/fbn.tamper.js
// @updateURL http://img.ssdclient.com/fbn.tamper.js
// @run-at      document-start
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'http://img.ssdclient.com/css.css';
document.getElementsByTagName("HEAD")[0].appendChild(link);

if(document.URL.indexOf("member.php") != -1){
    // Execute code that would occur in threads
var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'http://img.ssdclient.com/member.css';
document.getElementsByTagName("HEAD")[0].appendChild(link);
    
}else if(document.URL.indexOf("private.php") != -1){
    // Execute code that occurs on the forum display pages
var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'http://img.ssdclient.com/pm.css';
document.getElementsByTagName("HEAD")[0].appendChild(link);
    
}else if(document.URL.indexOf("showgroups.php") != -1){
    // Execute code that occurs on the forum display pages
var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'http://img.ssdclient.com/showgroups.css';
document.getElementsByTagName("HEAD")[0].appendChild(link);
        $("#headercont").append("<div id='tip'>Do not apply for groups on this page! Use recruitment threads.</div>");
    
}else if(document.URL.indexOf("showmods.php") != -1) {
    // Execute code that occurs on the forum display pages
var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'http://img.ssdclient.com/modlist.css';
document.getElementsByTagName("HEAD")[0].appendChild(link);
    
}else if(document.URL.indexOf("showstaff.php") != -1) {
    // Execute code that occurs on the forum display pages
var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'http://img.ssdclient.com/showgroups.css';
document.getElementsByTagName("HEAD")[0].appendChild(link);
    
}else if(document.URL.indexOf("report.php") != -1) {
    // Execute code that occurs on the forum display pages
var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'http://img.ssdclient.com/report.css';
document.getElementsByTagName("HEAD")[0].appendChild(link);
    
}else if(document.URL.indexOf("reputation.php?action=add&uid=") != -1) {
    // Execute code that occurs on the forum display pages
var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'http://img.ssdclient.com/rep.css';
document.getElementsByTagName("HEAD")[0].appendChild(link);
    
}
    
    var d = new Date();
var seconds = d.getSeconds()
var milliseconds = d.getMilliseconds()
var msLeft = 1 * 1 - seconds * 1000 - milliseconds;
unsafeWindow.setTimeout(doSomething,msLeft)

function doSomething(){
  window.addEventListener('load', function() { 
var images = document.getElementsByTagName('img'); 
for (var i = 0; i < images.length; i++) { 
images[i].src = images[i].src.replace('http://x.hackforums.net/images/modern_bl/groupimages/english/ub3r.png', 'http://puu.sh/8vmN4.png');
images[i].src = images[i].src.replace('http://x.hackforums.net/images/modern_bl/groupimages/english/l33t.png', 'http://puu.sh/8vnzW.png');
images[i].src = images[i].src.replace('http://x.hackforums.net/images/modern_bl/groupimages/english/mentor.png', 'http://puu.sh/8vs0j.png');
images[i].src = images[i].src.replace('http://x.hackforums.net/images/modern_bl/groupimages/english/mrt.png', 'http://puu.sh/8vs2D.png');
images[i].src = images[i].src.replace('http://x.hackforums.net/images/modern_bl/groupimages/english/mentor.png', 'http://puu.sh/8vs8l.png');
images[i].src = images[i].src.replace('http://x.hackforums.net/images/modern_bl/groupimages/english/3p1c.png', 'http://puu.sh/8vsgO.png');
images[i].src = images[i].src.replace('http://x.hackforums.net/images/modern_bl/groupimages/english/admin-bar.png', 'http://puu.sh/8vsEP.png');
images[i].src = images[i].src.replace('http://x.hackforums.net/images/modern_bl/groupimages/english/staff.png', 'http://puu.sh/8vsFF.png');

} 
}, false);


   unsafeWindow.setTimeout(doSomething,30000);
}



    var d = new Date();
var seconds = d.getSeconds()
var milliseconds = d.getMilliseconds()
var msLeft = 1 * 1 - seconds * 1000 - milliseconds;
unsafeWindow.setTimeout(doSomethingb,msLeft)

function doSomethingb(){


    $("body").append("<div id='stickhead'><div id='headercont'><ul><li><a href='http://hackforums.net'>home</a></li><li><a href='http://hackforums.net/usercp.php'>cp</a></li><li><a href='http://hackforums.net/private.php?action=send'>new pm</a></li><li><a href='http://hackforums.net/forumdisplay.php?fid=2'>ranf</a></li><li><a href='http://hackforums.net/forumdisplay.php?fid=133'>rmg</a></li></ul></div></div>");


if(document.URL.indexOf("showgroups.php") != -1){
  
    $("#headercont").append("<div id='tip'>Do not apply for groups on this page! Use <a href='hackforums.net/forumdisplay.php?fid=52'>recruitment threads.</a></div>");
}
    
if(document.URL.indexOf("usercp.php?action=usergroups") != -1){
  
    $("#headercont").append("<div id='tip'>Do not apply for groups on this page! Use <a href='hackforums.net/forumdisplay.php?fid=52'>recruitment threads.</a></div>");
}
 
    
    
       unsafeWindow.setTimeout(doSomethingb,3000000);
}