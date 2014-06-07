//-----------------------------------------------------------------------------
// Meta Data - required for Greasemonkey
//-----------------------------------------------------------------------------
// ==UserScript==
// @name        Conquer Club UI Enhancer
// @namespace   http://userscripts.org
// @description Enhances the on screen user interface for better usability
// @include     http*://www.conquerclub.com/*
// @version     0.0.8
// @require  	http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant       none
// @downloadURL https://userscripts.org/scripts/source/172733.user.js
// @updateURL   https://userscripts.org/scripts/source/172733.meta.js
// ==/UserScript==

var version = "0.0.8";
var forumUrl = "https://www.conquerclub.com/forum/viewtopic.php?f=526&t=193009";
 
if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {
    var namespace = "CCUI.";
 

    GM_deleteValue = function(name) {
        localStorage.removeItem(namespace + name);
    }

    GM_getValue = function(name, defaultValue) {
        var value = localStorage.getItem(namespace + name);
        if (!value)
            return defaultValue;
        var type = value[0];
        value = value.slice(1);
        switch (type) {
            case 'b':
                return value == 'true';
            case 'n':
                return Number(value);
            default:
                return value;
        }
    }

    GM_listValues = function() {
        var i,result = [];
        for (i = 0; i < localStorage.length; i++) {
            var name = localStorage.key(i);
            if (name.indexOf(namespace) == 0) {
                result.push(name.slice(namespace.length));
            }
        }
        return result;
    }
    GM_xmlhttpRequest=function(obj) {
    var request=new XMLHttpRequest();
    request.onreadystatechange=function() {
            if(obj.onreadystatechange) {
                obj.onreadystatechange(request);
            };
            if(request.readyState==4 && obj.onload) {
                obj.onload(request);
            }
        }
    request.onerror=function() {
            if(obj.onerror) {
                obj.onerror(request);
            }
        }
    try {
            request.open(obj.method,obj.url,true);
        } catch(e) {
            if(obj.onerror) {
                obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} );
            };
            return request;
        }
    if(obj.headers) { 
            for(var name in obj.headers) {
                request.setRequestHeader(name,obj.headers[name]);
            }
        }
    request.send(obj.data);
        return request;
    }

    GM_setValue = function(name, value) {
        value = (typeof value)[0] + value;
        localStorage.setItem(namespace + name, value);
    }
    unsafeWindow = window;
}



function checkForUpdate() {
    var lastversion = GM_getValue('lastupdate', 0);
    if (lastversion < new Date().getTime() - 60*60*1000) {
        GM_setValue('lastupdate', new Date().getTime() + "");
        GM_xmlhttpRequest({
            method: 'GET',
            url: forumUrl,
            onload: updateServerNumber
        });
    }
    else {
        updateOptionsMenu();
    }
}

function updateServerNumber(response) {
    try {
     var serverVersion = /version\s+(\d+.\d+.\d+)/.exec(response.responseText)[1];
     GM_setValue('updateavailable', serverVersion);
     
   //  alert(serverVersion);
     
     updateOptionsMenu();
    }catch(e){}
}

function isNewVersion() {
    var serverVersion = GM_getValue('updateavailable', false);
    if (serverVersion) {
        var newVersion = serverVersion.split('.').map(function(string) {
                return parseInt(string,10);
         });
         var thisVersion = version.split('.').map(function(string) {
                return parseInt(string,10);
         });
         return (newVersion[0]>thisVersion[0] || (newVersion[0]==thisVersion[0] && (newVersion[1]>thisVersion[1] || (newVersion[1]==thisVersion[1] && newVersion[2]>thisVersion[2]))));
    }
    return false;
}
 
function updateOptionsMenu() {
    /*
    var cgMenu = document.getElementById("chatgloveMenu");
    var ul = document.createElement('ul');
    ul.style.borderWidth = "0px 1px 0px 1px";
    ul.style.width = "151px";
    var source = "http://userscripts.org/scripts/source/92257.user.js";
    if(isNewVersion()) {
        ul.innerHTML = "<li><a id=\"cgVersionInfo\" href=" + source + "><span class=\"attention\">New Update Available</span></a></li>";
        cgMenu.appendChild(ul);
    }
    else {
        ul.innerHTML = "<li><a id=\"cgVersionInfo\" href=" + source + "><span>Latest Version Installed</span></a></li>";
        cgMenu.appendChild(ul);
    }
    */

    /*
    
    var ftext = features.join("\n");
    document.getElementById('cgVersionInfo').addEventListener("click" , function () {
         alert('New version features\n' + ftext);
        },true);
        */
}

var playername = "";

function initialize() {
 
    // get player name


      var lc = document.getElementById("leftColumn");
      var log = lc.getElementsByTagName("a");
      var pn = log[0].getElementsByTagName("b");
      playername = pn[0].innerHTML; 
        

 
 
     
    // get action bar and move it 
	    var action = document.getElementById("action-form");

        // monitor action for change and do this =============
        var swap = function() { 
            if (typeof action.getElementsByClassName("left")[0] != "undefined" && typeof action.getElementsByClassName("right")[0] != "undefined") { 
                 var leftdiv = action.getElementsByClassName("left")[0].style.cssFloat = "right";
                  var rightdiv = action.getElementsByClassName("right")[0].style.cssFloat = "left";
            } 
        }
        action.addEventListener('change', swap , false);
    	var right = document.getElementById("right_hand_side");
        var getfirst = right.firstChild;
        right.insertBefore(action, getfirst);
        // ====================================================
    
    	var rolls = document.getElementById("outer-rolls");
        action.appendChild(rolls);
    
    
	   var masthead = document.getElementById("masthead");

	   var hnav = document.getElementsByClassName("hnav")[0];
    
       var cctime = document.getElementById("cctime");
    
    
    
   // move time remaining
       	var time = document.getElementById("time-remaining");
    	var stats = document.getElementById("stats");
   
        var h3 = right.getElementsByTagName("h3");
        for(var i=0; i<h3.length; i++) {
    	    if (h3[i].innerHTML.indexOf("Game") != -1) {
                var span = document.createElement("span");
                span.innerHTML = h3[i].innerHTML;    
                span.style.color = "black";    
                span.style.fontWeight = "bold";    
                span.style.marginLeft = "20px";    
                h3[i].style.display = "none";
                hnav.insertBefore(span, cctime);
    	    }
        }
   
        var h4 = right.getElementsByTagName("h4");
        for(var i=0; i<h4.length; i++) {
    	    if (h4[i].innerHTML == "Players") {
                var div = document.createElement("div");
                div.id = "playersHeaderFrame";
                div.innerHTML = '<table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td width="50%" id="playersHeaderCell"><h3>Players</h3></td><td align="right" width="50%" ><br/>[<a id="hideEliminatedPlayers">hide eliminated players</a>]&nbsp;&nbsp;[<a id="hidePlayers">hide</a>]</td></tr></tbody></table>';    
                h4[i].style.display = "none";
                right.insertBefore(div, stats);
    	    }
    	    if (h4[i].innerHTML.indexOf("Round") != -1) {
                var span = document.createElement("span");
                span.style.color = "black";    
                span.style.fontWeight = "bold";    
                span.style.marginLeft = "20px";    
                span.innerHTML = h4[i].innerHTML;    
                h4[i].style.display = "none";
                hnav.insertBefore(span, cctime);
    	    }
        }
 
        time.style.color = "black";    
        time.style.marginLeft = "20px";    
        time.style.display = "inline";
        time.style.fontSize = "13px";
        hnav.insertBefore(time, cctime);


    // add hide/show eliminated players
        var tep = function() { 
            var tr = stats.getElementsByTagName("tr");
            for(var i=0; i<tr.length; i++) {
                if (tr[i].innerHTML.indexOf("class=\"eliminated\"") != -1) {          
              //      tr[i].style.display = "none";

                        if (tr[i].style.display == "none") {
                            tr[i].style.display = "";
                            hep.innerHTML = "hide eliminated players"; 
                        } else {
                            tr[i].style.display = "none";
                            hep.innerHTML = "show eliminated players"; 
                        }
                }
            }
        }

    	var hep = document.getElementById("hideEliminatedPlayers");
        hep.addEventListener('click', tep , false);

        var cp = function() { 
            if (stats.style.display == "none") {
                stats.style.display = "inline";
                hp.innerHTML = "hide"; 
            } else {
                stats.style.display = "none";
                hp.innerHTML = "show"; 
            }
        }

    	var hp = document.getElementById("hidePlayers");
        hp.addEventListener('click', cp , false);

 
 
        var ds = document.getElementById("stats");
        var ts = ds.getElementsByClassName("listing");
        var tr = ts[0].getElementsByTagName("tr");
        
        
        // find table row with player name and highlight
        for (i=0;i<tr.length;i++) {
            var td = tr[i].getElementsByTagName("td");
            var pnum = 0;    
            var pnamemod = ">" + playername + "<";    
            if(tr[i].innerHTML.indexOf(pnamemod) != -1){
                pnum = i;
            }
            for (d=0;d<td.length;d++) {
                if (i == pnum) {
                    td[d].style.backgroundColor = "#ffffaa";
                }
            }         
        }         


        var r = ds.getElementsByTagName("a");
        for (a=0; a<r.length;a++) {
            r[a].style.textDecoration = "none";
        }
 
        var pid = "stat_player_";
        var pspan = ds.getElementsByTagName("span");
    
        for (ps=0; ps<pspan.length; ps++) {
            if(pspan[ps].id.indexOf(pid) != -1){
                pspan[ps].style.fontFamily = "Verdana, Geneva, sans-serif";
                pspan[ps].style.fontWeight = "normal";
                pspan[ps].style.textShadow = "0px 0 #555, 0 1px #555, 1px 0 #555, 0 0px #555";
            }
        }



 

//stat_player_

//text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;



//    right.insertBefore(stats, getfirst);

	// remove masthead
	masthead.style.display = 'none';

    
//    var myList = hnav.getElementsByTagName("ul")[0];

    hnav.innerHTML = "<b style=\"display: inline-block; margin-left: 20px; margin-right: 20px; color: red;\">CONQUER CLUB</b>" + hnav.innerHTML;
    hnav.style.textAlign = "left";
    
    
    // move chat
	var chatheader = document.getElementById("chatHeaderFrame");
	var chat = document.getElementById("chat");
	var fullchat = document.getElementById("full-chat");
	var chatform = document.getElementById("chat-form");
    right.appendChild(chatheader);
    right.appendChild(chat);
    chat.style.backgroundColor = "#fff";
    chat.style.border = "1px solid #555";
    chat.style.padding = "5px";
    right.appendChild(fullchat);
    right.appendChild(chatform);

    chat.scrollTop = chat.scrollHeight;

    // add new right side area
    
	var rhs = document.getElementById("right_hand_side");
	var nhs = rhs.parentNode;

    var nextSibling = nhs.nextSibling;
    while(nextSibling && nextSibling.nodeType != 1) {
        nextSibling = nextSibling.nextSibling
    }

    var rtd = document.createElement('td');
    rtd.setAttribute("style","padding:5px");

    rtd.innerHTML = nextSibling.innerHTML;;
    nextSibling.setAttribute("style","display:none");
	rhs.parentNode.appendChild(rtd);

    var dts = rtd.getElementsByTagName('dt');
    for (d=0; d<dts.length; d++) {
        dts[d].setAttribute("style","display:inline-block; width:100%; background-color:#ddd");
    }

    var dds = rtd.getElementsByTagName('dd');
    for (d=0; d<dds.length; d++) {
        dds[d].setAttribute("style","display:inline-block; width:100%; margin-bottom: 10px");
    }



    // move wrapper
	var wrapper = document.getElementById("pageWrapper");
	wrapper.style.margin = '0px auto';
	wrapper.style.position = 'absolute';
	wrapper.style.top = '0px';
	wrapper.style.left = '0px';
	wrapper.style.width = '100%';

    // re-space middle column     
	var middle = document.getElementById("middleColumn");
	middle.style.padding = '0px';
    



	var dashboard = document.getElementById("dashboard");
    var redemption = document.getElementById("redemption");
             
        var td = dashboard.getElementsByTagName("td");
        for(var i=0; i<td.length; i++) {
    	    if (td[i].innerHTML.indexOf("My Spoils") != -1) {
                var div = document.createElement("div");
                div.id = "myspoils";

                if(typeof action.getElementsByClassName("redemption")[0] != "undefined") {
                    div.innerHTML = td[i].innerHTML + "<br/>" + redemption.innerHTML;
                    redemption.style.display = "none";
                } else {
                    div.innerHTML = td[i].innerHTML;
                }

                div.style.border = "1px dotted #777";  
                div.style.margin = "2px";
                div.style.padding = "5px";
                div.style.backgroundColor = "#ddd";
                td[i].style.display = "none";

                action.appendChild(div);
    	    } 
        }


  //  mapsizer('100');

        var cp = function() { 
            if (stats.style.display == "none") {
                stats.style.display = "inline";
                hp.innerHTML = "hide"; 
            } else {
                stats.style.display = "none";
                hp.innerHTML = "show"; 
            }
        }




}

function mapsizer(s) {
    var map = document.getElementById('outer-map');
    var can = document.getElementById('myCanvas');
    
    var mw = parseInt(map.style.width);
    var mh = parseInt(map.style.height);

    var scale = (s / 100);
    
//    alert(scale);

    map.style.backgroundSize = "100% auto";
    map.style.width = Math.round(mw * scale) + "px";
    map.style.height = Math.round(mh * scale) + "px";

    can.style.width = Math.round(mw * scale) + "px";
    can.style.height = Math.round(mh * scale) + "px";


    var u = map.getElementsByClassName('army_outline');
    for (c=0; c<u.length; c++) {
        u[c].style.top = (parseInt(u[c].style.top) * scale) + "px";
        u[c].style.left = (parseInt(u[c].style.left) * scale) + "px";
    }

    var div = document.getElementById("magicmap");
    for (i=0;i<div.childNodes.length;i++) {
        var it = Math.round(parseInt(div.childNodes[i].style.top) * scale);
        var il = Math.round(parseInt(div.childNodes[i].style.left) * scale);
        div.childNodes[i].style.top = it + "px";
        div.childNodes[i].style.left = il + "px";
      //  div.childNodes[i].style.border = "1px solid red";
    }


 
 
}

 


// And, go!
checkForUpdate();
initialize();
