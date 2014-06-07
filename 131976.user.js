// ==UserScript==
// @name           custom google navigation bar
// @description    硬又黑
// @author         哆啦B梦的弟弟
// @include		   *
// @require		   http://code.jquery.com/jquery-1.6.min.js
// @version        1.0
// ==/UserScript==
 
var remove=document.getElementById("gb_78");
	remove.style.display="none";
var remove=document.getElementById("gb_5");
	remove.style.display="none";
var remove=document.getElementById("gb_8");
	remove.style.display="none";
var remove=document.getElementById("gb_24");
	remove.style.display="none";

function addlinks() {
    if ($('ol[id="gbzc"]')) {
        var addlink = "<li class='gbt'><a id='gb_32' class='gbzt' href='http://www.google.com/reader/?hl=en&tab=wy' onclick='gbar.logger.il(1,{t:32});'><span class='gbtb2'></span><span class='gbts'>Reader</span></a></li><li class='gbt'><a id='gb_51' class='gbzt' href='http://translate.google.com/?q=' onclick='gbar.qs(this);gbar.logger.il(1,{t:51});'><span class='gbtb2'></span><span class='gbts'>Translate</span></a></li>";
        $('ol[id="gbzc"]').append(addlink);
    };
};
addlinks ();