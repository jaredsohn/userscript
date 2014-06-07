// ==UserScript==
// @name       Conquer Club - Clan Tools
// @version    1.0.1
// @description  Menu for clans
// @match       *://*.conquerclub.com/*
// @copyright  2014+, DgZ345 daza9420@gmail.com
// ==/UserScript==
var version = "1.0.1";
var forumUrl = "http://www.conquerclub.com/forum/viewtopic.php?f=527&t=204670";
var source = "http://userscripts.org/scripts/source/486725.user.js";

GM_addStyle(".clanMenu ul li a {color:#000000; background-color: #CCDDCC; padding-right: 1px;}");




//-------------------------------------------------------------------------
// Create Menu - Scripts
//-------------------------------------------------------------------------  
function createMenu() {
    var clanMenu = document.createElement('div');
    clanMenu.id="clanMenu";
    clanMenu.className="clanMenu";
    var html = "<h3><b>Clan "+userPrefs.clanfix+" <span style='font-size:7pt;' ><a href='" + forumUrl + "'>" + version + "</a></span></b></h3>";
    clanMenu.innerHTML = html;    
    var leftMenu = getLeftMenu();
    leftMenu.appendChild(clanMenu);
    var ul = document.createElement("ul");
    ul.appendChild(createMenuItem("cgf","Goto Forum",function(){this.href="http://www.conquerclub.com/forum/viewforum.php?f="+userPrefs.clanforum;}));
    ul.appendChild(createMenuItem("cpm","PM Clan",function(){PMClan()}));
    ul.appendChild(createMenuItem("cupd","Latest Version Installed",function(){this.href=source;}));
    clanMenu.appendChild(ul);
}
function createMenuItem(id,text,func) {
    var cmili = document.createElement('li');
    var cmia = document.createElement('a');
    cmia.id=id;
    cmia.innerHTML=text;
    cmia.addEventListener("click", func, false);
    cmili.appendChild(cmia);
    return cmili;    
}
function getLeftMenu() {
    return document.getElementById("leftColumn").getElementsByTagName("ul")[0].parentNode;
}
//-------------------------------------------------------------------------
// End of "Create Menu - Scripts"
//-------------------------------------------------------------------------
//
//-------------------------------------------------------------------------
// PM Clan - Scripts
//-------------------------------------------------------------------------               
function PMClan()
{
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET","http://www.conquerclub.com/api.php?mode=group&g="+userPrefs.clanid,true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var xmlDoc = xmlhttp.responseXML;
            var teamplayers=xmlDoc.getElementsByTagName("member");
            userid = userPrefs.userid;
            //make fake post form to add users to pm form    
            var pmform=document.createElement('form');
            pmform.id="PMTEAMFORM";
            pmform.method="post";
            pmform.action="/forum/ucp.php?i=pm&mode=compose";
            var pmforminner="";
            for( var i = 0; i < teamplayers.length-1; i++){
                if(userid != teamplayers[i].childNodes[0].nodeValue) {
                    pmforminner += '<input type="hidden" name="address_list[u]['+ teamplayers[i].childNodes[0].nodeValue +']" value="to"/>';
                }
            }    
            // required to get form not to give error..
            pmforminner += '<input type="hidden" name="add_to['+teamplayers[teamplayers.length-1].childNodes[0].nodeValue +']" value="Add"/>';    
            pmforminner += '<input type="hidden" name="subject" value=""/>';
            pmforminner += '<input type="hidden" name="message" value=""/>';
            pmforminner += '<input type="submit" name="" value="" style="display:none;" />'
            pmform.innerHTML=pmforminner;
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("submit", true, true);
            // tries to submit the form in two different ways for chrome and FF
            
            document.getElementById("mainheader").parentNode.insertBefore(pmform,document.getElementById("mainheader").nextSibling).submit().get(0).dispatchEvent(evt);        
        }
    }
    xmlhttp.send();    
}
//-------------------------------------------------------------------------
// End of "PM Clan - Scripts"
//-------------------------------------------------------------------------
//
//-------------------------------------------------------------------------
// Unread Forum - Scripts
//------------------------------------------------------------------------- 

function CheckForUnread()
{
    var unreadPage = window.location.protocol + "//www.conquerclub.com/forum/viewforum.php?f="+userPrefs.clanforum;
    var unreadRequest = new XMLHttpRequest();
    unreadRequest.open('GET', unreadPage, true);
    unreadRequest.onreadystatechange = function() {
        if(unreadRequest.readyState == 4) {
            var text = unreadRequest.responseText;
            var unread = text.match(/Unread posts/g);
            if (unread==null) return;
            document.getElementById("cgf").innerHTML="Goto Forum [ <span class='inbox'>"+unread.length+" new</span> ]";
        }
    }
    unreadRequest.send(null);
}
//-------------------------------------------------------------------------
// End of "Unread Forum - Scripts"
//------------------------------------------------------------------------- 
//-------------------------------------------------------------------------
// User Prefs - Scripts
//-------------------------------------------------------------------------
var defPrefs = {
    userid:0,
    clanid:0,
    clanfix:'',
    clanforum:0
};
var userPrefs=[];

function createUserPref() {
    debug("Getting USERPREF");
    GM_deleteValue("ClanToolsPref");
    getUserId();
    getClanId();
}
function getUserId(){    
    var username = encodeURI(/logout.php\">[^"\r\n]*\s<b>([^"\r\n]*)<\/b>/.exec(document.getElementById("leftColumn").innerHTML)[1]);
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET","http://www.conquerclub.com/api.php?mode=player&un="+username,false);  
    xmlhttp.send();
    var xmlDoc=xmlhttp.responseXML;
    userPrefs['userid']=xmlDoc.getElementsByTagName("userid")[0].childNodes[0].nodeValue;
}
function getClanId() {
    var userPage = window.location.protocol + "//www.conquerclub.com/forum/memberlist.php?mode=viewprofile&u="+userPrefs.userid;
    var userRequest = new XMLHttpRequest();
    userRequest.open('GET', userPage, true);
    userRequest.onreadystatechange = function() {
        if(userRequest.readyState == 4) {
            var text = userRequest.responseText;
            var parser = new DOMParser();
            var dom = parser.parseFromString(text,"text/html");    
            var d = dom.getElementById("page-body");
            d = d.getElementsByTagName("dl")[1].children[1].children[1];
            userPrefs['clanfix'] = d.innerHTML;
            userPrefs['clanid'] = /mode=group&amp;g=(\d+)/.exec(d.outerHTML)[1];      
            getClanForum();
        }
    }
    userRequest.send(null);
}
function getClanForum() {
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET","http://www.conquerclub.com/api.php?mode=group&g="+userPrefs.clanid,false);  
    xmlhttp.send();
    var xmlDoc=xmlhttp.responseXML;
    var fname =xmlDoc.getElementsByTagName("name")[0].innerHTML;
    
    var forumPage = window.location.protocol + "//www.conquerclub.com/forum/viewforum.php?f=462";
    var forumRequest = new XMLHttpRequest();
    forumRequest.open('GET', forumPage, true);
    forumRequest.onreadystatechange = function() {
        if(forumRequest.readyState == 4) {
            var text = forumRequest.responseText;
            var parser = new DOMParser();
            var dom = parser.parseFromString(text,"text/html");    
            var xf = dom.getElementById("page-body");
            xf = xf.getElementsByTagName("ul");
            var i=0;
            for (i=0;i<xf.length;i++) {
                if(xf.item(i).className=="topiclist forums") break;
            }
            xf=xf.item(i).getElementsByTagName("dt");
            i=0;
            for (i=0;i<xf.length;i++) {
                if(xf.item(i).children[0].innerHTML==fname) break;
            }
            userPrefs['clanforum'] = /viewforum.php\?f=(\d+)/.exec(xf.item(i).children[0].outerHTML)[1];
            storeUserPrefs();
            if(!document.getElementById("clanMenu")) createMenu();
        }        
    }
    forumRequest.send(null);
}

function storeUserPrefs() {
    GM_setValue('ClanToolsPref', JSON.stringify(userPrefs));
    debug("SAVED USERPREF - "+JSON.stringify(userPrefs));
    
}
function loadUserPrefs(def) {
    var toReturn = JSON.parse(GM_getValue('ClanToolsPref', (def || '{}')));
    return toReturn;
}
//-------------------------------------------------------------------------
// End of "User Prefs - Scripts"
//-------------------------------------------------------------------------
//
//-------------------------------------------------------------------------
// Help Functions - Scripts
//-------------------------------------------------------------------------
function debug(text) {
    if (true && console) {
        console.log("CT:" + debug.caller.toString().split(/{/)[0].split('function')[1]+': '+text);
    }
}
unsafeWindow.createUserPrefs = function() {createUserPref();}
//-------------------------------------------------------------------------
// End of "Help Functions - Scripts"
//-------------------------------------------------------------------------
//
//-------------------------------------------------------------------------
// Update - Scripts
//-------------------------------------------------------------------------
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
    if(isNewVersion()) {
        document.getElementById("cupd").innerHTML = "<span class=\"attention\">New Update Available</span>";
    }
}
//-------------------------------------------------------------------------
// End of "Update - Scripts"
//-------------------------------------------------------------------------

userPrefs = loadUserPrefs();
var t = true;
for (var pref in defPrefs) {
    if (userPrefs[pref] == 'undefined' || !userPrefs[pref]) {
        createUserPref();
        t=false;
        break;
    }
}
if (t) {
    createMenu();
    CheckForUnread();
    checkForUpdate();
    console.log("CT: LOADED USERPREF - "+JSON.stringify(userPrefs));
}
