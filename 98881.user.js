// ==UserScript==
// @name          TravianForum
// @namespace     travianforum
// @description	  Forum fix
// @include       http://forum.travian.de/index.php
// @include       http://forum.travian.de/search.php*
// ==/UserScript==

var SubForumList = new Object();
SubForumList["forumbit_3"] = new Array(12,70)
SubForumList["forumbit_4"] = new Array(13,118,117,14,135,25)
SubForumList["forumbit_6"] = new Array(20,16,21,131)
SubForumList["forumbit_132"] = new Array(133,134)
SubForumList["forumbit_5"] = new Array(18,19)
SubForumList["forumbit_8"] = new Array(23,24)
SubForumList["forumbit_28"] = new Array(30,31)
SubForumList["forumbit_32"] = new Array(34,35)
SubForumList["forumbit_38"] = new Array(40,41)
SubForumList["forumbit_51"] = new Array(53,54)
SubForumList["forumbit_61"] = new Array(63,64)
SubForumList["forumbit_72"] = new Array(74,75)
SubForumList["forumbit_55"] = new Array(57,58)
SubForumList["forumbit_42"] = new Array(44,46)
SubForumList["forumbit_123"] = new Array(124,125)
SubForumList["forumbit_7"] = new Array(10,26,11,108)



function $(id) { return document.getElementById(id); }

function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  var c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1;
    var c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    }
  }
return "";
}

var collapsed = getCookie("vbulletin_collapse")
if (collapsed.length > 1) {
    collapsed = collapsed.split(unescape("%0A"))
}

if (location.href.search(/search\.php/) != -1) {
    var ignoredForums = new Array();
    for (var i = 0; i < collapsed.length; i++) {
        ignoredForums = ignoredForums.concat(SubForumList[collapsed[i]])
    }
    
    var threads = $("threadslist").getElementsByTagName("tr");
    for (var y = 2;y < threads.length;y++) {
        var curele = threads[y].lastElementChild;
        if (!curele) { continue; }
        curele = curele.lastElementChild;
        
        if (!curele || !curele.href) { continue; }
        
        for (var z = 0; z < ignoredForums.length; z++) {
            if (curele.href.indexOf("forumdisplay.php?f=" + ignoredForums[z]) != -1) {
                threads[y].style.display = "none";
                
                break;
            }
        }
    }
}

if (location.href.search(/index\.php/) != -1) {
for (var y = 0;y < collapsed.length;y++) {
    $("collapseobj_" + collapsed[y]).style.display = "none";
    $("collapseimg_" + collapsed[y]).parentElement.parentElement.parentElement.parentElement.style.display = "none";
}

var smallfonts = document.getElementsByClassName("smallfont");
for (var y = 0;y < smallfonts.length;y++) {
    if (smallfonts[y].textContent.search(/Alle Foren als gelesen markieren/) != -1) {
        var richtiges = smallfonts[y].firstChild;
        richtiges.innerHTML += "&nbsp&nbsp<a id=\"resetView\" href=\"#reset\">Foren wiederherstellen</a>"
        $("resetView").addEventListener("click", function (e) {
            e.preventDefault();
            var collapsed = getCookie("vbulletin_collapse").split(unescape("%0A"))
            for (var y = 0;y < collapsed.length;y++) {
                $("collapseobj_" + collapsed[y]).style.display = "table-row-group";
                $("collapseimg_" + collapsed[y]).src = "http://forum.travian.de/images/travian/buttons/collapse_tcat.gif"
                $("collapseimg_" + collapsed[y]).parentElement.parentElement.parentElement.parentElement.style.display = "table-row-group";
            }
            document.cookie = "vbulletin_collapse=0;expires=Thu, 01-Jan-1970 00:00:01 GMT";
            }, true);
                
        break;
    }
}

var stuff = document.getElementsByTagName("img")
for (var y = 0;y < stuff.length;y++) {
    var curele = stuff[y];
    if (curele.src.search(/collapse_tcat/) != -1) {
        curele.addEventListener("click", function (e) {
            this.parentElement.parentElement.parentElement.parentElement.style.display = "none";
        }, true);
        
    }
}
}
