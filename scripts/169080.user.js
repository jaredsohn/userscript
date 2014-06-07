// ==UserScript==
// @name           LeakForums - Anime Group Script
// @namespace      DeNial/groupThing
// @description    For The Fuck Of It!
// @author         DeNial
// @copyright      DeNial 2012 (http://userscripts.org/users/Spafic)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see http://www.gnu.org/licenses/. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.leakforums.org/*
// @match          *://leakforums.org/*
// @version        1.0.2
// @downloadURL    https://userscripts.org/scripts/source/169073.user.js
// @updateURL      https://userscripts.org/scripts/source/169073.meta.js
//
// @icon           http://www.leakforums.org/images/pro_star2.png
// @icon64         http://www.leakforums.org/images/pro_star2.png
// @history        1.0.0 - Script created
// @history        1.0.1 - Added feature to change header.
// @history        1.0.2 - Fixed small bug.
// ==/UserScript==

(function(){function g(g,h){var b=[],l,m,e,c,f,k;e=new Date;c=e.getDate();f=e.getMonth()+1;e=e.getFullYear();10>c&&(c="0"+c);10>f&&(f="0"+f);l=f+"-"+c+"-"+e;m=f+"-"+(c-1)+"-"+e;"true2"!=h&&(k=JSON.parse(localStorage.LF_SECTION_POSTS));c=-1!=window.location.toString().indexOf("www.")?"http://www.leakforums.org/forumdisplay.php?fid=":"http://leakforums.org/forumdisplay.php?fid=";GM_xmlhttpRequest({method:"GET",url:c+g,synchronous:!0,onload:function(c){var a=document.createElement("temp");a.innerHTML=c.responseText;c=a.getElementsByClassName("lastpost smalltext");for(a=0;a<c.length;++a){b[a]=c[a].innerHTML.toString().split(/\<br\>\n/);b[a][1]=b[a][1].toString().split(/\: /);0==b[a][0].indexOf("Today ")&&(b[a][0]=b[a][0].replace(/Today/,l));0==b[a][0].indexOf("Yesterday ")&&(b[a][0]=b[a][0].replace(/Yesterday/,m));var e=b[a],f=b[a][0].split(/ (.+)/)[0]+" ",d=b[a][0].split(/ (.+)/)[1],g=d.substr(d.length-2).toLowerCase(),j=d.substr(0,d.indexOf(":")),d=d.substring(d.indexOf(":")+1,d.indexOf(" "));"pm"==g&&(j=12!=j?1*j+12:"00"!=d?"0":"24");e[0]=f+(j+":"+d)}b.sort();b.reverse();new_posts=b;if(!0==h||"true2"==h)localStorage.LF_SECTION_POSTS=JSON.stringify(b),new_posts=JSON.parse(localStorage.LF_SECTION_POSTS);if("true2"!=h||!0!=h)if(k[0][0]!=new_posts[0][0]||k[0][1][0]!=new_posts[0][1][0])c=document.getElementById("content"),a=document.createElement("meow"),a.innerHTML+='<div class="pm_alert" id="post_notice" style="background:#511f46;border: 1px solid purple;"><strong>Anime Group Notice:</strong>&nbsp;&nbsp;<span>There is a new post in the Anime subforum!  The most recent is from '+new_posts[0][1][1]+' located <a href="showthread.php?tid='+new_posts[0][1][0].toString().split(/tid\=/)[1].toString().split(/\&/)[0]+'&action=lastpost" style="font-weight: bold">here</a>.</span></div>',c.innerHTML+=a.innerHTML}})}if("undefined"!==typeof Storage)document.getElementsByClassName("logo")[0].getElementsByTagName("img")[0].setAttribute("src","http://i.imgur.com/T65sUDz.png"),"undefined"!==typeof localStorage.LF_SECTION_POSTS?-1!=document.getElementById("breadCrumb").innerHTML.toString().indexOf("fid=173")||-1!=window.location.toString().indexOf("fid=173")?g(173,!0):g(173,!1):g(173,"true2");else throw Error("Browser does not support local storage!  Try upgrading! - DeNial");})();

/*
 * Decompressed Version

(function(){

// Global Variables
var oldposts, newposts,visited;

// SETTINGS
var section = 173;

// Source: http://forums.phpfreaks.com/topic/175104-converting-12-hours-format-to-24-hrs-format/?p=923058
function convert12to24(timeStr) {
    var meridian = timeStr.substr(timeStr.length-2).toLowerCase();;
    var hours =  timeStr.substr(0, timeStr.indexOf(':'));
    var minutes = timeStr.substring(timeStr.indexOf(':')+1, timeStr.indexOf(' '));
    if (meridian=='pm') {
        if (hours!=12)
            hours=hours*1+12;
        else
            hours = (minutes!='00') ? '0' : '24' ;
    }
    return hours+':'+minutes;
}

function dirtyWork(fid,update) {
    var postInfos = new Array();
    var newestPost,todayDate, yesterdayDate, newestPost,today,dd,mm,yyyy,url,old_posts;
    
    // http://stackoverflow.com/a/4929629
        today = new Date();
        dd = today.getDate();
        mm = today.getMonth()+1;
        yyyy = today.getFullYear();
        if(dd<10) {
            dd='0'+dd
        }
        if(mm<10) {
            mm='0'+mm
        }
        todayDate = mm+'-'+dd+'-'+yyyy;
        yesterdayDate = mm+'-'+(dd-1)+'-'+yyyy;
    // End
    if(update != "true2") {
        old_posts = JSON.parse(localStorage["LF_SECTION_POSTS"]);
    }
    
    if(window.location.toString().indexOf("www.") != -1) {
        url = "http://www.leakforums.org/forumdisplay.php?fid=";
    } else {
        url = "http://leakforums.org/forumdisplay.php?fid=";
    }
    
    GM_xmlhttpRequest({
        method: "GET",
        url: url+fid,
        synchronous: true,
        onload: function(response) {
            var temp = document.createElement("temp");
            temp.innerHTML = response.responseText;
            
            var posts = temp.getElementsByClassName("lastpost smalltext");
            for(var i = 0;i < posts.length;++i) {
                postInfos[i] = posts[i].innerHTML.toString().split(/\<br\>\n/)
                postInfos[i][1] = postInfos[i][1].toString().split(/\: /);
                
                // Change "Today" to readable date format
                // MM-DD-YYYY
                if(postInfos[i][0].indexOf("Today ") == 0) {
                    postInfos[i][0] = postInfos[i][0].replace(/Today/,todayDate)
                }
                
                // Change "Yesterday" to readable date format
                // MM-DD-YYYY
                if(postInfos[i][0].indexOf("Yesterday ") == 0) {
                    postInfos[i][0] = postInfos[i][0].replace(/Yesterday/,yesterdayDate)
                }
                
                // Help sorting by converting all times to 24 hour
                postInfos[i][0] = postInfos[i][0].split(/ (.+)/)[0] + " " + convert12to24(postInfos[i][0].split(/ (.+)/)[1]);
            }
            
            postInfos.sort();
            postInfos.reverse();
            new_posts = postInfos;
            
            if(update == true || update == "true2") {
                // Store all posts in the browser's local storage cache.
                localStorage["LF_SECTION_POSTS"] = JSON.stringify(postInfos);
                new_posts = JSON.parse(localStorage["LF_SECTION_POSTS"]);
            }
            
            if((update != "true2") || (update != true)) {
                if((old_posts[0][0] != new_posts[0][0]) || (old_posts[0][1][0] != new_posts[0][1][0])) {
                    var insertLocation = document.getElementById("content");
                    var newElement = document.createElement("meow");
                    newElement.innerHTML += '<div class="pm_alert" id="post_notice" style="background:#511f46;border: 1px solid purple;"><strong>Anime Group Notice:</strong>&nbsp;&nbsp;<span>There is a new post in the Anime subforum!  The most recent is from '+new_posts[0][1][1]+' located <a href="showthread.php?tid='+new_posts[0][1][0].toString().split(/tid\=/)[1].toString().split(/\&/)[0]+'&action=lastpost" style="font-weight: bold">here</a>.</span></div>';
                    
                    insertLocation.innerHTML += newElement.innerHTML;
                }
            }
        }
    });
}

if(typeof(Storage)!=="undefined") {
    document.getElementsByClassName("logo")[0].getElementsByTagName("img")[0].setAttribute("src","http://i.imgur.com/T65sUDz.png")
    
    if(typeof(localStorage["LF_SECTION_POSTS"]) !== "undefined") {
    	if((document.getElementById("breadCrumb").innerHTML.toString().indexOf("fid="+section) != -1) || (window.location.toString().indexOf("fid="+section) != -1)) {
    		dirtyWork(section,true);
    	} else {
    	    dirtyWork(section,false);
    	}
    } else {
        dirtyWork(section,"true2");
    }
} else {
    throw new Error("Browser does not support local storage!  Try upgrading! - DeNial");
}
})();

/*

var html = document.body.innerHTML;
html = html.replace( /www.leakforums.org\/dmca.php(.*?)/g, 'www.leakforums.org\/forumdisplay.php?fid=173' );
document.body.innerHTML = html;

var html = document.body.innerHTML;
html = html.replace( /DMCA<\/a><\/span>(.*?)/g, '<font color=\"#EE77CC\">Anime<\/a><\/span><\/font>' );
document.body.innerHTML = html;

var html = document.body.innerHTML;
html = html.replace( /fid=173">Anime<\/a>(.*?)/g, 'fid=173"><font color=\"#EE77CC\">Anime<\/a><\/font>' );
document.body.innerHTML = html;

*/