// ==UserScript==
// @name          LUEmylinks
// @description   Allows you to add custom links in the LL bar
// @namespace	By Kalphak
// @include http://*endoftheinter.net*
// @include https://*endoftheinter.net*
// @exclude http://u.endoftheinter.net/u.php*
// @exclude https://u.endoftheinter.net/u.php*
// @exclude http://wiki.endoftheinter.net/*
// @exclude https://wiki.endoftheinter.net/*
// ==/UserScript==

// Version 2

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/;domain=.endoftheinter.net";
}

function readCookie(name,type) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	if (type==0){
        return "http://www.google.com/|Google|http://boards.endoftheinter.net/history.php|Posted Messages";
        }else if(type==1){
        return "1|1|1|0|0|1|1|1|0|0|1|0|1|0|1|0";            
        }else{
        return false;
        }
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}


var lml = readCookie('mylinks',0);
urls = lml.split("|");
var dl = readCookie('dellinks',1);
nourls = dl.split("|");

cls = new Array();

cls[0] = new Array("Home", "<a href=\"//endoftheinter.net/main.php\">Home</a> | ", nourls[0]);
cls[1] = new Array("Archives", "<a href=\"//archives.endoftheinter.net/\">Archives</a> | ", nourls[1]);
cls[2] = new Array("Add a link", "<a href=\"//links.endoftheinter.net/add.php\">Add a link</a> | ", nourls[2]);
cls[3] = new Array("Random link", "<a href=\"//links.endoftheinter.net/linkme.php?l=random\">Random link</a> | ", nourls[3]);
cls[4] = new Array("Top voted links", "<a href=\"//links.endoftheinter.net/links.php?mode=topvoted\">Top voted links</a> | ", nourls[4]);
cls[5] = new Array("Links of the week", "<a href=\"//links.endoftheinter.net/links.php?mode=topvotedweek\">Links of the week</a> | ", nourls[5]);
cls[6] = new Array("New links", "<a href=\"//links.endoftheinter.net/links.php?mode=new\">New links</a> | ", nourls[6]);
cls[7] = new Array("Wiki", "<a href=\"//wiki.endoftheinter.net/index.php/Main_Page\">Wiki</a> | ", nourls[7]);
cls[8] = new Array("All links", "<a href=\"//links.endoftheinter.net/links.php?mode=all\">All links</a> | ", nourls[8]);
cls[9] = new Array("Favorites", "<a href=\"//links.endoftheinter.net/links.php?mode=fav\">Favorites</a> | ", nourls[9]);
cls[10] = new Array("Search", "<a href=\"//links.endoftheinter.net/links.php?mode=search\">Search</a> | ", nourls[10]);
cls[11] = new Array("Stats", "<a href=\"//endoftheinter.net/stats.php\">Stats</a> | ", nourls[11]);
cls[12] = new Array("Boards", "<a href=\"//boards.endoftheinter.net/showtopics.php?board=42\">Boards</a> | ", nourls[12]);
cls[13] = new Array("User List", "<a href=\"//endoftheinter.net/userlist.php\">User List</a> | ", nourls[13]);
cls[14] = new Array("Logout", "<a href=\"//endoftheinter.net/logout.php\">Logout</a> | ", nourls[14]);
cls[15] = new Array("Help", "<a href=\"//wiki.endoftheinter.net/index.php/Help:Rules\">Help</a>", nourls[15]);

var topbar = document.getElementsByTagName("div")[1];
var text = topbar.innerHTML;
var newt = text.replace("<br>", " | ");

for (var i=0;i<cls.length;i++){
    if (cls[i][2] == 0){
        newt = newt.replace(cls[i][1], "");
    }
}

if (cls[15][2] == 0){
    newt = newt.slice(0, -2);
}

newt += "<br>My Links:";
for (var i=0;i<urls.length;i=i+2){
    newt += " <a href=\"" + urls[i] + "\">" + urls[i+1] + "</a> |";
}
newt = newt.slice(0, -2);
topbar.innerHTML = newt;

var where = window.location.href.split("/").pop();

function bUpdate(){
    var els = document.getElementById("mylinks").value;
    els = els.replace(/\n/g,"|");
    var nls = "";
    for (var n=0;n<cls.length;n++){
        if (document.getElementById("nu"+n).checked==true){
            nls += "0|";
        }else{
            nls += "1|";
        }
    }
    nls = nls.slice(0, -1);
    createCookie("mylinks",els,'365');
    createCookie("dellinks",nls,'365');
    alert("Set!")
}

if (where=="editprofile.php?luemylinks")
	{
            document.getElementsByTagName("h1")[0].innerHTML="Edit LUEmylinks";
            document.title="End of the Internet - Edit LUEmylinks";
            var utable = document.getElementsByTagName("table")[0];
            var tdata = "<tr><th colspan=\"2\">Change Link Settings for Kalphak</th></tr>";
            tdata += "<tr><td>Remove menu links<br><small>(Check the links from the current menu bar you want to remove.)</small></td><td>";
            var check = "";
            for (var n=0;n<cls.length;n++){                
                if (cls[n][2] == "0"){
                    check = " checked";
                }else{
                    check = "";
                }
                tdata += "<input type=\"checkbox\" id=\"nu"+ n +"\"" + check + "> " + cls[n][0] + "<br>";
            }
            tdata += "</td></tr>";            
            tdata += "<tr><td>Links<br><small>(Add the URL on a line, and the name for it on the line below. Repeat for more links.)</small></td><td><textarea rows=\"16\" cols=\"60\" id=\"mylinks\">" + lml.replace(/\|/g,"\n") + "</textarea></td></tr>";
            tdata += "<tr><td colspan=\"2\"><button id=\"u\">Update</button></td></tr>";
            utable.innerHTML = tdata;
            var el = document.getElementById("u"); 
            el.addEventListener("click", bUpdate, false); 
	}
        
if (where=="editprofile.php"){
    var div=document.createElement("div");
    div.innerHTML="&nbsp;<a href=\"editprofile.php?luemylinks\">Edit LUEmylinks settings</a>";
    document.body.appendChild(div);
}