// ==UserScript==
// @name          TBUpdater
// @namespace     tbupdater
// @description	  Updates the current track of TB and adds a Tracklist Button
// @version       1.4
// @include       http://www.technobase.fm/*
// @include       http://www.hardbase.fm/*
// @include       http://www.housetime.fm/*
// @include       http://www.coretime.fm/*
// @include       http://www.trancebase.fm/*
// @exclude       */banner/*
// ==/UserScript==

var TBUpdateVersion = "1.4";

// get the colors depending on the website you are on
var color = "#FFFFFF";
if (location.host == "www.coretime.fm")
color = "#F8FFFF";
if (location.host == "www.trancebase.fm")
color = "#80DB00";
if (location.host == "www.technobase.fm")
color = "#DFB649";
if (location.host == "www.housetime.fm")
color = "#DD00A3";
if (location.host == "www.hardbase.fm")
color = "#2593E0";

// shortcut for getelementbyid
function $(id) {
    return document.getElementById(id);
}
function $$(string, first)
{
    if (first === true) return document.querySelector(string);
    return document.querySelectorAll(string);
}

// just a quick wrapper to be able to easily add css style sheets
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
p = unsafeWindow;
var Chrome = false;
if(window.navigator.vendor.match(/Google/)) {
    Chrome = true;
    var div = document.createElement("div");
    div.setAttribute("onclick", "return window;");
    p = div.onclick();
    
    this.GM_getValue=function (key,def) {
        var returnVar; 
        if (!(key in localStorage)) returnVar = def;
        else returnVar = localStorage[key];
        if (returnVar == "false") returnVar = false;
        else if (returnVar == "true") returnVar = true;
        return returnVar;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };

};


// fades the opacity of an Element from 1 to 0 over time milliseconds
function fadeElement(element, time) {
  if (element.style.opacity && element.style.opacity != 1) { return;}
  var startTime = +new Date();  
  
  var fade = function() 
  {
    var d = +new Date();
    var t = (d - startTime)/time;
    
    if(t > 1.0)
    {
      element.style.opacity = 1;
      element.style.visibility = "hidden";
      clearInterval(threadId);
    }
    else
    {
      element.style.opacity = 1 - Math.sin(Math.PI * (t/2));
    }
  };
  
  element.style.opacity = 1;
  
  var threadId = setInterval(fade, 10);
        

}

function unFoldElement(element, intervall) {
    // the maxHeight doesn't work properly in Chrome
    var maxHeight = element.offsetHeight;
    
    var currentheight = 0;
    element.style.height = 0
    element.style.overflow = "hidden";
    var unfold = function () {
        currentheight = currentheight + 20;
        element.style.height = currentheight + "px";
        if (currentheight >= maxHeight) {
            clearInterval(threadId);
            element.style.removeProperty("overflow");
            element.style.removeProperty("height");
            
        }
    };
    var threadId = setInterval(unfold, intervall);
    
}

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

function convertTags (oldHTML) {
    oldHTML = oldHTML.replace(/<strong>(.+?) wrote:<\/strong>/g,"$1][");
    oldHTML = oldHTML.replace(/<div class="quote">/g,"quote[").replace(/<\/div>/g,"]quote");
    oldHTML = oldHTML.replace(/<strong>/g,"b[").replace(/<\/strong>/g,"]b");
    oldHTML = oldHTML.replace(/<em>/g,"i[").replace(/<\/em>/g,"]i");
    oldHTML = oldHTML.replace(/<u>/g,"u[").replace(/<\/u>/g,"]u");
    oldHTML = oldHTML.replace(/<br>/g,"");
    oldHTML = oldHTML.replace(/<a.+?href="(.+?)">.+?<\/a>/g,"$1");
    return oldHTML;
}

function sendUserMessage(userid, text) {
    GM_xmlhttpRequest({
        method: "POST",
        url: "/message.php?action=new&user=" + userid,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
            },
        data: "edtMessage=" + encodeURI(text) + "&cmdAddMessage=OK",
        onload: function (response) {
            GM_log("Successfully sent a Message to " + userid);
        }
    }); 
}

function makeGuestbookEntry(userid, text) {
    GM_xmlhttpRequest({
        method: "POST",
        url: "/member/guestbook/add/" + userid,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
            },
        data: "edtGuestbook=" + encodeURI(text) + "&cmdGuestbook=OK",
        onload: function (response) {
            GM_log("Successfully made a Guestbook entry to " + userid);
        }
    }); 
}

function makeTBGuestbookEntry(text) {
    GM_xmlhttpRequest({
        method: "POST",
        url: "/guestbook.php?action=add" ,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
            },
        data: "edtNewPost=" + encodeURI(text) + "&send=OK",
        onload: function (response) {
            GM_log("Successfully made a Guestbook entry to TB");
        }
    }); 
}


function addFriend(userid) {
    GM_xmlhttpRequest({
        method: "POST",
        url: "/friend/add/" + userid,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
            },
        
        onload: function (response) {
            GM_log("Successfully sent a Friend Request to " + userid);
        }
    }); 
}

function sendWish(username, age, city,  text) {
    GM_xmlhttpRequest({
        method: "POST",
        url: "/wishes.php?action=add",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
            },
        data: "Streams=3&sex=1&name="+ encodeURI(username) + 
              "&age=" + age + 
              "&city=" + encodeURI(city) + 
              "&category=3" + 
              "&message=" + encodeURI(text) + 
              "&wish=Abschicken",
        onload: function (response) {
            GM_log("Successfully sent a wish " + username);
        }
    }); 
}

function newEle(type, node)
{
    var newE = document.createElement(type);
    node.appendChild(newE);
    return newE;
}
// Settings Menu
settings = new Object();
settings["autoupdate"] = [GM_getValue("autoupdate", 7.5),"Zeit in Sekunden zwischen Updates des Tracks (0 zum Ausschalten)"];
settings["trackhistory"] = [GM_getValue("trackhistory", 20),"Wieviele Tracks im Tracklist dropdown anzeigen (beim Klick auf Tracks), (0 zum Ausschalten)"];
settings["galleryupdate"] = [GM_getValue("galleryupdate", true),"Next und Previous Button in der Gallerie hinzufügen"];
settings["messagehistory"] = [GM_getValue("messagehistory", true),"Beim Antworten auf eine Nachricht diese anzeigen"];
settings["hoverpic"] = [GM_getValue("hoverpic", true),"Das Bild des aktuellen Djs beim hovering über den DJ namen anzeigen"];
settings["wishbox"] = [GM_getValue("wishbox", true),"Fügt ein Suchfeld der Wunschbox hinzu, in dem man nachschauen kann ob ein Track schon gespielt wurde"];
settings["pageCount"] = [GM_getValue("pageCount", true),"Fügt im Forum jedem Thread eine Go-to Page Leiste hinzu"];
settings["newestPost"] = [GM_getValue("newestPost", true),"Fügt im Forum jedem Thread eine Zum-Letzten-Post-springen Button hinzu"];
settings["minForums"] = [GM_getValue("minForums", true),"Minimierbare Forums (über einen Klick auf den jeweiligen Forumsnamen)"];
settings["showImages"] = [GM_getValue("showImages", true),"Konvertiert Bilderlinks im Forum zu den jeweiligen Bildern"];
settings["quickreply"] = [GM_getValue("quickreply", true),"Fügt im Forum eine Quick Reply Box hinzu"];
settings["quickedit"] = [GM_getValue("quickedit", true),"Direktes Editieren des Beitrags im Thread ohne auf eine neue Seite zu müssen"];
settings["newsAjax"] = [GM_getValue("newsAjax", true),"Beim Klick auf ein Newsbild wird die News geladen und unter dem Bild eingefügt"];
settings["newsComments"] = [GM_getValue("newsComments", true),"Beim Kommentieren einer News alle #<Zahl> und @<Zahl> zu Links zu jeweiligen den Posts konvertieren"];
settings["divCrap"] = [GM_getValue("divCrap", true),"<div> Spam aus den Gästebüchern entfernen (sowohl beim Posten eines eigenen Beitrags als auch bei bereits vorhandenen)"];





function openSettings()
{
    if ($("SettingsMenu")) 
    {
        var oldlink = location.href.split("#")[0]
        location.replace(oldlink + "#SettingsMenu");
        $("SettingsMenu").style.display = "block";
        $("SettingsBackground").style.display = "block";
        return;
    }
    addGlobalStyle('#SettingsMenu\
            {\
                background-color: black;\
                position:absolute;\
                width:50%;\
                top:300px;\
                left:0;\
                right:0;\
                margin-left:auto;\
                margin-right:auto;\
                z-Index:10000;\
                padding:5px 5px;\
                border-color: black;\
                border: 1px double;\
            }\
            #SettingsBackground\
            {\
                background-color:white;\
                opacity: 0.3;\
                width:100%;\
                height:100%;\
                z-Index:5000;\
                position:fixed;\
                top:0px;\
            }\
            #SettingsMenu .option\
            {\
                padding-Left:5px;\
                width:95%;\
            }');
    var newForm = document.createElement("form");
    newForm.id = "SettingsMenu";
    // Options Table
    var newTable = document.createElement("table");
    newTable.cellSpacing = 1;
    newTable.cellPadding = 1;
    newForm.appendChild(newTable);
    // Options Headline
    var newHead = newEle("th", newTable);
    var newHead2 = newEle("td",newHead);
    newHead.colSpan = "2";
    newHead2.innerHTML = "<h2>Settings: </h2>";
    // Background
    var Background = document.createElement("div");
    Background.id = "SettingsBackground";
    document.body.appendChild(Background);
    for (setting in settings)
    {
        var tableRow = document.createElement("tr");
        var newLine = document.createElement("td");
        tableRow.appendChild(newLine);
        newLine.className = "option";
        newTable.appendChild(tableRow);
        newLine.textContent = settings[setting][1];
        
        // Input Line
        var inputline = document.createElement("td");
        var newInput = newEle("input", inputline);
        if (typeof(settings[setting][0]) == "boolean") {   
            newInput.type = "checkBox";
            newInput.checked = settings[setting][0];
            newInput.addEventListener("change", function () {
                GM_setValue(this.name, this.checked);
            },true);
        }
        else {
            newInput.type = "text";
            newInput.size = "10";
            newInput.maxLength = "10";
            newInput.value = settings[setting][0];
            newInput.addEventListener("change", function () {
                GM_setValue(this.name, this.value);
            },true);
        }
        newInput.name = setting;
        inputline.style.width = "5%";
        tableRow.appendChild(inputline);

        
    }
    var newInput = document.createElement("input");
    newInput.style.display = "block";
    newInput.style.marginLeft = "auto";
    newInput.type = "submit";
    newInput.value = "Schliessen";
    Background.addEventListener("click", function (e) {
            e.preventDefault();
            $("SettingsMenu").style.display = "None";
            this.style.display = "None";
        }, true);
    newInput.addEventListener("click", function (e) {
            e.preventDefault();
            this.parentNode.style.display = "None";
            $("SettingsBackground").style.display = "None";
        }, true);
    newForm.appendChild(newInput);
    document.body.appendChild(newForm);
    var oldlink = location.href.split("#")[0]
    location.replace(oldlink + "#SettingsMenu");
}

(function () {
    if (!$("menu")) return;
    var newli = document.createElement("li");
    var newA = newEle("a", newli);
    newA.textContent = "Open Settings";
    newA.href = "#";
    $$("#menu .navigationMain ul", true).appendChild(newli);
    newA.addEventListener("click", function (e) {
            e.preventDefault();
            openSettings();
        }, true);
})();


// informations
var currentPage = location.pathname.match(/\/(.+?)\./);
if (!currentPage) { currentPage == "index"; }
else {currentPage = currentPage[1]; }

// functions

var parseElement = document.createElement("div");
if (currentPage != "wishes" && location.href.search(/\/forum(?:(?!.+)|\/)/) == -1){
var docinnerHTML = $("Content_Show");

if (docinnerHTML) {

function autoUpdate(time) {
    // Automatic Track Update
    var updateTimeout;
    function RequestHTTP() {
	
	    // if (navigator.userAgent.search("Chrome") != -1) {
        GM_xmlhttpRequest({
              method: "GET",
              url: "http://"+ location.host +"/",
              onload: function(response) {
			
                var abcd = response.responseText.match(/<div style="width:345px;float:left; margin-top:11px; overflow:hidden">\n+(.+?)<\/div>/);
                if ($("CounterContent")) {
                    $("CounterContent").innerHTML = response.responseText.match(/<div id="CounterContent">([\s\S]+?)<\/div>/)[1];
                }
                else {
                    $$("#menu_right .CounterContent", true).innerHTML = response.responseText.match(/<div class="CounterContent">([\s\S]+?)<\/div>/)[1]; 
                }
                if (docinnerHTML.childNodes[3].innerHTML != abcd[1])
                    docinnerHTML.childNodes[3].innerHTML = abcd[1];
                }
                
        });
	    // cancel the timeout if it was running already (just to prevent it from running twice)
        if (updateTimeout != null) clearTimeout(updateTimeout);
	    // check if there is a new track in 7500 ms
        updateTimeout = setTimeout(RequestHTTP, time*1000);
    }

    setTimeout(RequestHTTP, time*1000);
}
(function() {
var a = settings["autoupdate"][0];
if (a > 0) autoUpdate(a);
})();

function dropDown(numb) {
    // Track history drop down
    var isOpen = 0;
    var dropDown = 0;
    var isLoaded = 0;
    function changeTracklist() {
        
        addGlobalStyle("#m1\
        {	overflow:auto;\
            width: 300px;\
            height: 200px;\
            position: absolute;\
            visibility: hidden;\
            margin: 0;\
            padding: 0;\
            background: #000;\
            border: 1px solid "+ color +";\
            z-index: 30}\
        \
            #m1 a\
            {	position: relative;\
                display: block;\
                margin: 0;\
                padding: 5px 10px;\
                text-align: left;\
                text-decoration: none;\
                background: #000000;\
                color: "+ color +";\
                font: 11px arial}\
        \
            #m1 a:hover\
            {	background: "+ color +";\
                color: #000000}")
                
            var newhtml = "<div id=\"m2\"><a href=\"/tracklist.php\">\
               <span style=\"color:" + color + "\"><strong>Tracks</strong></span></a></div>\
               <div id=\"m1\">\
               <img src=\"http://wsm.technobase.eu/v2/profile/ajax-loader.gif\">Please Wait.. </div>";
               
               docinnerHTML.childNodes[5].innerHTML = newhtml;
                dropDown = $("m1");
                
                // docinnerHTML.addEventListener("click", mopen, false); // uncomment this to be able to open the tracklist on the whole track bar
			    $("m2").addEventListener("click", mopen, true); 
                document.addEventListener("click", mclose, true);
                dropDown.style.visibility = 'hidden';
    }

    function mopen(e) {
        if (!isLoaded) getTracklist();
        e.preventDefault();
        e.stopPropagation();
        if (isOpen == 0) {
            dropDown.style.visibility = 'visible';
            isOpen = 1;
        }
        else {
            // dropDown.style.visibility = 'hidden';
            fadeElement(dropDown, 500);
            isOpen = 0;
        }
    }

    // this function is called if the document is clicked anywhere else than on 'Tracks'
    function mclose() {
        if (isOpen == 1) {
            isOpen = 0;
            fadeElement(dropDown, 500);
            // dropDown.style.visibility = 'hidden'; 
        }
    }

    function getTracklist() {
       isLoaded = 1;
       GM_xmlhttpRequest({
              method: "GET",
              url: "/tracklist.php",
              onload: function(response) {
                var abcd = response.responseText.match(/<table class="rc_table_detail".+?0%"(?:><a href="(.+?)">|>)(.+?)<.+?<img.+?src="(.+?)".+?(\d\d:\d\d).+?>(.+?)<\/a>/g);
                var matched = "";
                var newhtml = "<div id=\"m2\"><a href=\"/tracklist.php\">\
						       <span style=\"color:" + color + "\"><strong>Tracks</strong></span></a></div> \
						       <div id=\"m1\">"
			    // loop through the first 20 tracks and append them to the menu (change the 20 if you want more/less)
                for (var x = 0; x < numb; x++){
                    matched = abcd[x].match(/<table class="rc_table_detail".+?0%"(?:><a href="(.+?)">|>)(.+?)<.+?<img.+?src="(.+?)".+?(\d\d:\d\d).+?>(.+?)<\/a>/);

                    if (matched[1])
                    newhtml = newhtml + "<a href=" + matched[1] + ">";
                    else
                    newhtml = newhtml + "<a>";

                    newhtml = newhtml + "<table><tr><td><img width=\"50\" height=\"50\" border=\"0\" src=\"" + matched[3] + "\" /></td>";
                    newhtml = newhtml + "<td><table>";
                    newhtml = newhtml + "<tr><th>" + matched[2] + "</tr></th>";
                    newhtml = newhtml + "<tr><td><b>" + matched[4] + "</b> played by " + matched[5] + "</td></tr>";
                    newhtml = newhtml + "</table></tr>";

                    newhtml = newhtml + "</table></a>";
                }
                newhtml = newhtml + "</div>";
                docinnerHTML.childNodes[5].innerHTML = newhtml;
                dropDown = $("m1");
                
                // docinnerHTML.addEventListener("click", mopen, false); // uncomment this to be able to open the tracklist on the whole track bar
			    $("m2").removeEventListener("click", mopen, true);
                $("m2").addEventListener("click", mopen, true); 
                document.removeEventListener("click", mclose, true);
                document.addEventListener("click", mclose, true);
                dropDown.style.visibility = 'visible';
                }
                
        });
    }


    changeTracklist();

    }
}
(function() {
var a = settings["trackhistory"][0];
if (a > 0) dropDown(a);
})();



function galleryUpdate() {
    // Gallery Update
    // check if they are viewing a picture atm
    if (location.href.search(/gallery\/\d+\/picture\/\d+/) != -1){
    if (window.location.hash)
    window.location = location.href.match(/.*gallery\/\d+\/picture\//)[0] + window.location.hash.match(/\d+/)[0];
    else {
     
    // get the gallery element
    var gallerypart = $("MainContent").getElementsByClassName("news2")[0].getElementsByTagName("tbody")[0];
    if (gallerypart) {
    var lastpic = "";
    var currentpic = "";
    var currentpicpos = 0;
    var nextpic = "";
    var pictureList = "";
    var pageCount = 1;

    function UpdateGallery() {
	    document.addEventListener("keydown", imagepress, false);
	    GM_xmlhttpRequest({
              method: "GET",
              url: location.href.match(/.+?\d+/)[0],
              onload: function(response) {
                pictureList = response.responseText.match(/<a href="\/gallery\/.+?">/g);
                
			    var loca = location.href.match(/.+\.fm(.+)/)[1];
			    var matched = "";
			    for (var x = 0; x < pictureList.length; x++){
				    matched = pictureList[x].match(/<a href="(.+)"/);
                    
				    if (currentpic) {
					    nextpic = matched[1];
					    break; // found the currentpic and the next pic already so stop here
				    }
				
				    if (matched[1] == loca) {
					    currentpicpos = x;
					    currentpic = matched[1];
				    }
				
				    if (!currentpic) {
					    lastpic = matched[1];
				    }
				
			    }
			    updateContent();
		    }
	    });
    }



    function showNext(picture) {
	    GM_xmlhttpRequest({
              method: "GET",
              url: picture,
              onload: function(response) {

			    if (currentpicpos > 0) lastpic = pictureList[currentpicpos-1].match(/<a href="(.+)"/)[1];
			    currentpic = picture;
			    if (currentpicpos < pictureList.length-1) nextpic = pictureList[currentpicpos+1].match(/<a href="(.+)"/)[1];
                
                // add the hash to the link
                window.location.hash = currentpic.match(/\/gallery\/\d+\/picture\/(\d*)/)[1];

			    $("MainContent").lastElementChild.innerHTML = "<br><br><br>" + response.responseText.match(/<.*news1[\s\S]*news3">[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>/)[0];
                
                updateContent();
			
		    }
	    });
    }

    function loadnextpic(picture) {
        if (lastpic) {
            $("Previous").removeEventListener("click", Previous, false); 
            lastpic = "";
        }
        if (nextpic) {
            $("Next").removeEventListener("click", Next, false); 
            nextpic = "";
        }
        gallerypart.innerHTML = "<img src=\"http://wsm.technobase.eu/v2/profile/ajax-loader.gif\">Please Wait..";
        if (currentpicpos == pictureList.length-1) {
            pageCount = pageCount + 1;
            gallerypart.innerHTML += "<div style=\"display:none\"><iframe id=\"tempiframe\" src=\""+location.href.match(/.+?\d+\//)[0]+"#"+pageCount+"\"></iframe></div>"
            $("tempiframe").addEventListener("load",function () {
                // this part doesnt work properly (probably because of the xajax component)
                pictureList = pictureList.concat(this.contentDocument.documentElement.innerHTML.match(/<a href="\/gallery\/.+?">/g));
                
                showNext(picture);
                
            },true);
        }
        else { showNext(picture); }

    }

    function updateContent() {
        // get the new gallerypart
        gallerypart = $("MainContent").getElementsByClassName("news2")[0].getElementsByTagName("tbody")[0];
        
        var newtext = "";
        newtext = newtext + "<tr><center><table width=\"100%\"><tr><td>";
        if (lastpic)
        newtext = newtext + "<div id=\"Previous\"><a href=\"" + lastpic + "\">Previous</a></div> ";
        
        newtext = newtext + "</td><td>";
        if (nextpic)
        newtext = newtext + "<div id=\"Next\"><a href=\"" + nextpic + "\">Next</a></div>";
        
        newtext = newtext + "</td></tr></table></center></tr>";
        
        gallerypart.innerHTML = gallerypart.innerHTML + newtext;
        if (lastpic) $("Previous").addEventListener("click", Previous, false); 
        if (nextpic) $("Next").addEventListener("click", Next, false); 
    }

    function Next(e) {
        e.preventDefault();
	    currentpicpos = currentpicpos + 1;
	    loadnextpic(nextpic);
    }

    function Previous(e) {
        e.preventDefault();
	    currentpicpos = currentpicpos - 1;
	    loadnextpic(lastpic);
    }

    function imagepress(event) {
	    if (event.keyCode == 37) { // left arrow
		    if (lastpic){
		
		    Previous(event);
		    }
	    }
	    if (event.keyCode == 39) { // right arrow
		    if (nextpic){
		
		    Next(event);
		    }
	    }
    }

    UpdateGallery();
    }
    }
    }
}

if (settings["galleryupdate"][0])galleryUpdate();

function messageHistory() {
    // Message History
    if (currentPage == "message"){
    if (location.href.search(/id.+\d/) != -1) {
    // they are viewing a message atm
    var mainCont = $("MainContent").innerHTML; 
    // change the link to <oldlink> + #<messageid>
    $("MainContent").innerHTML = mainCont.replace(/">antworten/,"#" + location.href.match(/\d+/)[0] + "\">antworten");
    }

    if (window.location.hash) {
            GM_xmlhttpRequest({
              method: "GET",
              url: "http://www.technobase.fm/message.php?action=show&id=" + window.location.hash.slice(1) ,
              onload: function(response) {
                GM_log("http://www.technobase.fm/message.php?action=show&id=" + window.location.hash.slice(1));
                var newinner = response.responseText.match(/(<.*news2[\s\S]*?)<div class="news3">/)[1].replace(/<a.+?schen.+?antworten<\/a>/, " ") + "<div class=\"news2\""
                
                $("MainContent").lastElementChild.innerHTML = $("MainContent").lastElementChild.innerHTML.replace(/<div class="news2"/, newinner);

              }
              });
    }

    }
}
if (settings["messagehistory"][0]) messageHistory();
function HoverPic() {
    // dj hover picture
    var hoverPic = 0;
    function addHoverEventListener() {
        $("onAir").addEventListener("mouseover", AddMouseMove, true);
        $("onAir").addEventListener("mouseout", RemoveMouseMove, true);
    }

    function AddMouseMove() {
        if (!hoverPic){
        
        addGlobalStyle("#hoverwindow{ background-color:#000;position:absolute;top:0px;left:0px;width:100px;height:130px;visibility:hidden;z-index:30;-moz-border-radius: 15px;-webkit-border-radius: 15px; }")
        var querylink = this.innerHTML.match(/href="(.*?)"/)[1];
        this.innerHTML = this.innerHTML + "<div id=\"hoverwindow\"><img src=\"http://wsm.technobase.eu/v2/profile/ajax-loader.gif\">Please Wait..</div>";
        hoverPic = $("hoverwindow");
        
        GM_xmlhttpRequest({
          method: "GET",
          url: "http://"+ location.host +"/showplan.php",
          onload: function(response) {
            var regexp = new RegExp("class=\"news2\"[\\s\\S]*?href=\"" + querylink.replace(/\./g,"\\.").replace(/\//g,"\\/") + "\"[\\s\\S]*?img[\\s\\S]*?src=\"([\\s\\S]*?)\"");
            
            //var picture = response.responseText.match(/<a href="/ + querylink + /"[\s\S]*?imf src="([\s\S]*?)"/)[1];
            var regexfin = regexp.exec(response.responseText);
            var picture = RegExp.$1;
            GM_log("class=\"news2\"[\\s\\S]*?href=\"" + querylink.replace(/\./g,"\\.").replace(/\//g,"\\/") + "\"[\\s\\S]*?img[\\s\\S]*?src=\"([\\s\\S]*?)\"");
            // a little hackish way to get the corners of the picture round :p
            hoverPic.style.backgroundImage = "url(" + picture + ")";
            //hoverPic.innerHTML = "<img src=\"" + picture +  "\">";
            hoverPic.innerHTML = " ";
          }
          });    
        }
        hoverPic.style.visibility = "visible";
        this.addEventListener("mousemove", moveFrame, true);
        
    }

    function RemoveMouseMove() {
        fadeElement(hoverPic, 500);
        // hoverPic.style.visibility = "hidden";
        this.removeEventListener("mousemove", moveFrame, true);
    }

    function moveFrame(e) {
	    var posx = 0;
	    var posy = 0;
	    if (e.pageX || e.pageY) 	{
		    posx = e.pageX;
		    posy = e.pageY;
	    }
	    else if (e.clientX || e.clientY) 	{
		    posx = e.clientX + document.body.scrollLeft
			    + document.documentElement.scrollLeft;
		    posy = e.clientY + document.body.scrollTop
			    + document.documentElement.scrollTop;
	    }
	    // posx and posy contain the mouse position relative to the document
	    // Do something with this information
        hoverPic.style.top = posy+5 +"px";
        hoverPic.style.left = posx+5 +"px";
    }

    addHoverEventListener();


   }
if (settings["hoverpic"][0]) HoverPic();
}

function wishBox() {
    // wishbox track checker
    if (currentPage == "wishes"){
    var selectElement = document.getElementsByTagName("select")[0];
    var textArea = document.getElementsByTagName("textarea")[0];
    var tracklistvalue = "";
    var wuenschestuff = "";

       function checkValue() {
            if (this.value == "2"){
                if (!wuenschestuff){
                    
                    textArea.parentNode.innerHTML = "<div id=\"wuenschestuff\"><p>Check if a Track has been played already: <input id=\"tracksearch\" type=\"text\"> <div id=\"searchresults\"> <img src=\"http://wsm.technobase.eu/v2/profile/ajax-loader.gif\">Please Wait..</div></p></div>" + textArea.parentNode.innerHTML;
                    $("tracksearch").addEventListener("keyup", KeyboardType, true); 
                    wuenschestuff = $("wuenschestuff");
                    }
                else if (!wuenschestuff.innerHTML) {
                    wuenschestuff.innerHTML = "<p>Check if a Track has been played already: <input id=\"tracksearch\" type=\"text\"> <div id=\"searchresults\"> </div></p>";
                    $("tracksearch").addEventListener("keyup", KeyboardType, true); 
                }
                if (!tracklistvalue) {
                    GM_xmlhttpRequest({
                      method: "GET",
                      url: "http://"+ location.host +"/tracklist.php",
                      onload: function(response) {
                            tracklistvalue = response.responseText.match(/<table class="rc_table_detail".+?0%"(?:><a href="(.+?)">|>)(.+?)<.+?<img.+?src="(.+?)".+?(\d\d:\d\d).+?>(.+?)<\/a>/g);
                            $("searchresults").innerHTML = "";
                            }
                        }); 
                    }
                }
            
            else
            {
                if (wuenschestuff) {
                $("tracksearch").removeEventListener("keyup", KeyboardType, true); 
                wuenschestuff.innerHTML = "";
                
                }
            }
       }
        selectElement.addEventListener("change",checkValue,true);
    function KeyboardType() {
        var result = "";
        var matched = "";
        var temp = true;
        if (!this.value || !tracklistvalue) {
            $("searchresults").innerHTML = "";
            return;
        }
        var value = this.value.split(" ");
        for (var x = 0; x < tracklistvalue.length; x++){
            matched = tracklistvalue[x].match(/<table class="rc_table_detail".+?0%"(?:><a href="(.+?)">|>)(.+?)<.+?<img.+?src="(.+?)".+?(\d\d:\d\d).+?>(.+?)<\/a>/)[2];
            temp = true;
            for (var y = 0; y < value.length; y++){
            
                if (matched.toLowerCase().indexOf(value[y].toLowerCase()) == -1) {
                    temp = false;
                    
                }
            }
            if (temp) {
                result = result + ", " + matched;
            }
            if (result.length > 256) {
            result = ", Too many results to display."; break;
            }
        }
        $("searchresults").innerHTML = "<p>"+result.slice(2)+"</p>";
    }
    }
}
if (settings["wishbox"][0]) wishBox();


if (location.href.search(/\/forum\/\d+\/\d+\/?(?:(?!.+)|-\d+)/) != -1){

    // Forum Page Display and Forum go to newest Post
    function updateThreadList() {
        var threadlist = document.getElementsByClassName("post_content")[0].getElementsByTagName("tr");
        var lastpostimage = "data:image/gif;base64,R0lGODlhEgAJALMPAAAAAP////39/enp6fDw8Le3t/f39/n5+fPz8+3t7dLS0rW1tdjY2NTU1MzMzP///yH5BAEAAA8ALAAAAAASAAkAAAQ08MlJgbW01sBxfh7IHZd0naagqoB5lsBhzEwLvjaAELxiVz9AYkB0/CZHQKPAXBw/t9cjAgA7"
        for (var x = 1; x < threadlist.length;x++) {
            var tdelements = threadlist[x].getElementsByTagName("td");
            var threadlink = tdelements[0].firstChild.getAttribute("href");
            if (settings["newestPost"][0])
            tdelements[2].innerHTML = tdelements[2].innerHTML + "<a href=\"" + threadlink + "-" + (parseInt((tdelements[3].textContent-1)/20)) + "#lastpost" + "\"> <img border=\"0\" alt=\"View the latest post\" title=\"View the latest post\" src=\"" + lastpostimage + "\"></a>";
            
            // add Page count
            if (tdelements[3].textContent < 21) { continue;}
            if (settings["pageCount"][0]){
            var pages = "<p class=\"smallfont\">[ Seite: <a href=\"" + threadlink + "\">1</a>";
            
            for (var y = 20; y < tdelements[3].textContent;y=y+20) {
                pages = pages + ", <a  href=\"" + threadlink + "-" + (y/20) + "\">" + ((y/20)+1) + "</a>";
            }
            pages = pages + " ]</p>";
            tdelements[1].innerHTML = tdelements[1].innerHTML + pages; }
        }
    }
    if (settings["newestPost"][0] || settings["pageCount"][0])updateThreadList();


}
if (settings["minForums"][0]){
    // minimizable forums
    if (location.href.search(/\/forum(?:\/(?!.+)|(?!.+))/) != -1){
        var forums_headers = $("body_left").getElementsByClassName("post_header")
        for (var y = 0;y < forums_headers.length;y++) {
            var cookie = getCookie(forums_headers[y].parentNode.id)
            if (cookie) {
                forums_headers[y].nextElementSibling.style.display = cookie;
            }
            forums_headers[y].style.cursor = "pointer";
            forums_headers[y].addEventListener("click", function (e) {
                var ele = this.nextElementSibling;
                
                if (ele.style.display == "none") {
                    ele.style.display = "block";
                    var a = new Date();
                    a = new Date(a.getTime() +1000*60*60*24*365*10);
                    document.cookie = this.parentNode.id + "=block;expires="+a.toGMTString()+";";
                    }
                else
                {
                    ele.style.display = "none";
                    var a = new Date();
                    a = new Date(a.getTime() +1000*60*60*24*365*10);
                    document.cookie = this.parentNode.id + "=none;expires="+a.toGMTString()+";";
                }
            }, true);
            
        }
    }
}



if (location.href.search(/\/forum\/\d+\/\d+\/\d+/) != -1){
var currentThread = location.href.match(/\/forum\/(\d+)\/(\d+)\/(\d+)/);
var contentElement = $("body_left").getElementsByClassName("content")[1];
// go to last post
if (window.location.hash == "#lastpost") {
    var oldlink = location.href.split("#")[0]
            location.replace(oldlink + "#" + contentElement.lastElementChild.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.name);
}

if (settings["showImages"][0]){
    // Forum show images
    // GM_log(contentElement.innerHTML.match(/<a.+?href="([-A-Z0-9+&@#\/%?=~_|!:,.;]*(?:\.jpg|\.png|\.bmp|\.gif|\.jpeg))"[\S\s]+?<\/a>/));
    var contentElementsPostContents = contentElement.getElementsByClassName("post_content")
    for (var x = 0;x < contentElementsPostContents.length;x++) {
        var currentElement = contentElementsPostContents[x].firstElementChild.firstElementChild.firstElementChild.lastElementChild;
        var linksInCurrent = currentElement.getElementsByTagName("a");
        for (var y = 0;y < linksInCurrent.length;y++) {
            var currentLink = linksInCurrent[y];
            if (currentLink.href.search(/(?:\.jpg|\.png|\.bmp|\.gif|\.jpeg)/) != -1) {
                currentLink.innerHTML = "<img alt=\""+ currentLink.href +  "\" src=\""+ currentLink.href +  "\" width=\"200\"><br>";
                
                currentLink.firstElementChild.style.borderWidth = "3px";
                
            }
        }
    }
    // contentElement.innerHTML = contentElement.innerHTML.replace(/<a.+?href="((?:https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*(?:\.jpg|\.png|\.bmp|\.gif|\.jpeg))".+?<\/a>/, "<a href=\"$1\"><img alt=\"$1\" src=\"$1\" width=\"600\"></a>" );
}


if (settings["quickreply"][0]) {
    // Forum Answer History + quick reply box
    var contentLastElement = contentElement.lastElementChild.previousElementSibling.previousElementSibling;
    var commentBox = document.createElement("div");
    commentBox.innerHTML = "<form method=\"post\" action=\"/forum/"+ currentThread[1] +"/"+ currentThread[2] +"/answer/"+ currentThread[3] +"\"><table style=\"border-collapse:collapse;border:0px; padding:0px; spacing:0px; width:400px\">\
                            <tbody><tr class=\"post_header\"><td style=\"padding-left:10px;padding-top:4px;width:130px\">Thema:</td>\
                            <td style=\"padding-top:4px;width:350px\"><input type=\"text\" name=\"edtTopic\" value=\"AW: " + $("body_left").getElementsByClassName("content")[0].firstElementChild.lastElementChild.textContent + "\" size=\"40\"></td></tr>\
                            <tr class=\"post_content\"><td style=\"padding-bottom:5px;padding-top:3px;\" colspan=\"2\"><table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"400px\"><tbody><tr>\
						    <td style=\"text-align:center;\" colspan=\"2\"><textarea id=\"commentBoxArea\" name=\"edtText\"  style=\"width:360px; height:200px\"></textarea></td></tr>\
						    </tr></tbody></table></td></tr>\
                            <tr class=\"post_footer\"><td colspan=\"2\" style=\"text-align:center\"><input type=\"submit\" value=\"&nbsp;&nbsp;&nbsp;Quick Reply&nbsp;&nbsp;&nbsp;\" name=\"cmdThread\"></td></tr></tbody></table></form>";
    commentBox.style.marginLeft = "23px";
    commentBox.id = "commentBox";
    contentElement.insertBefore(commentBox, contentLastElement);
}


// edit post box
var oldEditContent;
var postContentElement;

function HookLinks () {
    var linklist = contentElement.getElementsByTagName("a")
    // start with 1 and subtract one to ignore the first and last button
    for (var x = 1; x < linklist.length-1; x++) {
        var title = linklist[x].getAttribute("title")
        if (title == "Zitieren" | title == "Antworten" | title == "Bearbeiten") {
            linklist[x].addEventListener("click", clickLink, true);
        }
    }
}

function clickLink (e) {
    if (this.id == "editBoxCancel" && settings["quickedit"][0]) {
        e.preventDefault();
        this.removeEventListener("click",clickLink, false);
        if (oldEditContent) {
            postContentElement.innerHTML = oldEditContent;
        }
        oldEditContent = "";
        return;
    }
    var parentElement = this.parentNode.parentNode.previousElementSibling.firstElementChild.firstElementChild.firstElementChild;
    if (this.getAttribute("title") == "Bearbeiten" && settings["quickedit"][0]) {
        e.preventDefault();
        if (oldEditContent) {
            $("editBoxCancel").removeEventListener("click",clickLink,false);
            postContentElement.innerHTML = oldEditContent;
            
            
        }
        // var editBox = document.createElement("td");
        postContentElement = parentElement.lastElementChild;
        oldEditContent = postContentElement.innerHTML;
        var editText = postContentElement.lastElementChild.innerHTML


        postContentElement.innerHTML = "<form action=\""+ this.pathname +"\" method=\"post\">\
                            <div class=\"post_headline\">Thema: <input type=\"text\" size=\"50\" value=\"" + postContentElement.firstElementChild.textContent + "\" name=\"edtTopic\"></div>\
                            <textarea style=\"height:250px;width:530px;padding-right:20px\" name=\"edtText\">" + convertTags(editText) + "</textarea>\
                            <input type=\"submit\" name=\"cmdThread\" value=\"&nbsp;&nbsp;&nbsp;OK&nbsp;&nbsp;&nbsp;\"><input id=\"editBoxCancel\" type=\"button\" value=\"&nbsp;&nbsp;&nbsp;Cancel&nbsp;&nbsp;&nbsp;\"></form>"
        $("editBoxCancel").addEventListener("click",clickLink,false);
        window.location.replace("#edtBoxAnchor2");
        postContentElement.id = "edtBoxAnchor";
        window.location.replace("#edtBoxAnchor");
        postContentElement.removeAttribute("id");
        return;
    }
    window.location.replace("#commentBox");
    e.preventDefault();
    commentBox = $("commentBoxArea");
    if (this.getAttribute("title") == "Zitieren" && settings["quickreply"][0]) {
        var editText = parentElement.lastElementChild.lastElementChild.innerHTML;

        commentBox.value = "quote[" + parentElement.firstElementChild.children[1].children[2].textContent + "][" + convertTags(editText) + "]quote";
    }
    else { commentBox.value = "";}
    commentBox.focus();

}


HookLinks();
}

if (settings["newsAjax"][0]) {

    // News page modification
    if (location.pathname == "/"){
    function hookNewsLinks() {
        var contentNewsElement = $("MainContent").lastElementChild;
        var linklist = contentNewsElement.getElementsByTagName("a")
        for (var x = 0; x < linklist.length; x++) {
            
            if (linklist[x].pathname.search(/\/news\//) != -1) {
                if (!(linklist[x].textContent)) {
                    linklist[x].addEventListener("click", newsClickLink, true);
                }
                if (linklist[x].textContent.search(/Kommentar/) != -1) {
                    linklist[x].href = linklist[x].href + "#comments";
                }
            }
        }
    }
    var clickedElement;
    var loadingAlready;
    function newsClickLink (e) {
        e.preventDefault();
        if (loadingAlready) { return;}
        // close the old opened news
        if (clickedElement) {
            $("ajaxNewsContent").parentNode.removeChild($("ajaxNewsContent"));
            
        }
        // if they clicked on the same link again dont ajax
        if (clickedElement == this) { clickedElement = "";return; }
        window.location.replace("#LoadingNews");
        loadingAlready = 1;
        clickedElement = this;
        var newsElement = document.createElement("div");
        newsElement.innerHTML = "<br><p style=\"text-align:center\"><img src=\"http://wsm.technobase.eu/v2/profile/ajax-loader.gif\"> Loading News..</p>";
        newsElement.id = "ajaxNewsContent";
        newsElement.style.textAlign = "justify";
        clickedElement.parentNode.insertBefore( newsElement, clickedElement.nextSibling );
        GM_xmlhttpRequest({
          method: "GET",
          url: this.href,
          onload: function(response) {
                
                var newHTML = response.responseText.match(/<div class="news2[\S\s]+?<img[\S\s]+?<\/center>([\S\s]+?)<\/div>\s*<\/div>\s*<div class="news3/)[1];
                
                newsElement.innerHTML = newHTML;
                unFoldElement(newsElement, 5);
                window.location.replace(window.location.href.split("#")[0] + "#ajaxNewsContent");
                loadingAlready = "";
                }
            }); 

    }
    // News Comments Page ajax

    hookNewsLinks();
    }
}
if (settings["newsComments"][0]) {
    if (location.pathname.search(/\/news\//) != -1){
        document.getElementsByName("NewsComment")[0].id = "NewsComment";
        if (window.location.hash == "#comments") {
            $("MainContent").getElementsByClassName("news1")[2].id = "comments";
            window.location.replace(window.location.href.split("#")[0] + "#comments2");
            window.location.replace(window.location.href.split("#")[0] + "#comments");
            
        }
        if (location.pathname.search(/\/\d+(?!.+)/) != -1 && !window.location.hash) {
            $("MainContent").getElementsByClassName("news1")[2].id = "comment";
            window.location.replace(window.location.href.split("#")[0] + "#comment");
        }        
        var postlist = $("MainContent").getElementsByClassName("news2")[2].getElementsByTagName("tbody")[0].childNodes;
        var count = 0;
        var currpage = location.pathname.match(/\/(\d+)(?!.+)/);
        var currlink = location.href.match(/\/news\/.+?(?:\/|(?!.))/)[0];
        if (!currpage) { currpage = 0;}
        else { currpage = currpage[1]}
        for (var x = 0; x < postlist.length; x++) {
            var ele = postlist[x];
            if (ele.tagName == "TR") {
                if (count == 0) {
                    ele.innerHTML = ele.innerHTML.replace(/#(\d+)/, "<a name=\"comment$1\">#$1</a>") 
                }
                if (count == 1) {
                    var wholematch = ele.innerHTML.match(/(?:#|@)(\d+)/g);
                    if (wholematch) {
                        for (var y = 0;y < wholematch.length;y++) {
                        
                            var matched = wholematch[y].match(/\d+/);
                            
                            if (matched) {
                                matched = matched[0];
                                var commpage = parseInt((matched-1)/20);
                                var regexp = new RegExp(wholematch[y],"g");
                                
                                if (commpage == currpage) {
                                    ele.innerHTML = ele.innerHTML.replace(regexp,"<a href=\"#comment" + matched + "\">" + wholematch[y] + "</a>");
                                }
                                else {
                                    ele.innerHTML = ele.innerHTML.replace(regexp,"<a href=\"" + currlink + "/" + commpage + "#gotocomment" + matched + "\">" + wholematch[y] + "</a>")
                                }
                            }
                        }
                    }
                    //ele.innerHTML = ele.innerHTML.replace(/#(\d+)/, "<a name=\"$1\">#$1</a>")
                }
                if (count == 2) {
                    ele.firstElementChild.innerHTML = ele.firstElementChild.innerHTML + "<div style=\"float:right;font-size:7pt;\">\
                                    <a href=\"#NewsComment\" title=\"Zitieren\">Zitieren</a></div>";
                    ele.firstElementChild.firstElementChild.addEventListener("click", function (e) {
                        var html = this.offsetParent.parentElement.previousElementSibling.innerHTML;
                        var quotetext = html.match(/<td width="5"><\/td[\S\s]+?td>([\S\s]+?)<\/td>/)[1];
                        html = this.offsetParent.parentElement.previousElementSibling.previousElementSibling.innerHTML;
                        var name = html.match(/<a href="\/member\/.+?>(.+?)</)[1];
                        $("NewsComment").value = "quote[" + name + "][" + convertTags(quotetext) + "]quote";
                        
                        }, true);
                }
                
                count = count + 1;
                if (count == 3) { count = 0;}
            }
        }
        
        if (window.location.hash.search(/gotocomment/) != -1) {
            window.location.hash = window.location.hash.replace(/gotocomment/, "comment")
        }
        // postlist.innerHTML = postlist.innerHTML.replace(/(#\d+)/, "<a href=\"$1\">$1</a>")
    }

    //$("rc_prifle_tab").removeChild($("rc_profile_tab_pictures"))
}

if (settings["divCrap"][0]) {

    if (location.href.search(/\/member\/guestbook\/\d+/) != -1 || location.href.search(/\/member\/\d+/) != -1){
    var checkFunction = function () {
        if ($("divGuestbookHidden")) {
            
            // remove the <div> crap
            dontcall = 1;
            var postlist = $("tabProfil").getElementsByTagName("table");
            
            postlist = postlist[postlist.length-1].getElementsByClassName("rc_table_detail_alternative")
            for (var x = 0; x < postlist.length; x++) {
                var tempy = postlist[x].lastElementChild.getElementsByTagName("div")[0];
                tempy.innerHTML = tempy.innerHTML.replace(/&lt;\/?div.*?&gt;/g , "");
            }
            dontcall = 0;
                
                // a quick wrapper to remove any <div> </div> spam from the guestbook function
                
            if (navigator.userAgent.search(/Chrome/) != -1) {
                if ($("edtGuestbook_ifr")) {
                    $("edtGuestbook_ifr").contentDocument.documentElement.addEventListener("blur", function (e) { 
                        this.innerHTML = this.innerHTML.replace(/<div><br><\/div>/g , "<br>");
                        this.innerHTML = this.innerHTML.replace(/<div.*?>/g , "<br>");
                        this.innerHTML = this.innerHTML.replace(/<\/div>/g , "");
                    }, true);
                }
            }   
        }
    };
        // checkFunction();
        // if the page changes itself check for an update
        var timeout;
        var dontcall;
        $("tabProfil").addEventListener("DOMNodeInserted", function (e) { 
            if (dontcall || e.relatedNode == this) { 
                // prevent an endless loop
                return ;
            }
            
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(checkFunction, 300);
        }, false);
    }
}

function versCheck() {
    var oldvers = GM_getValue("TBUpdateVersion");
    if (oldvers != TBUpdateVersion) {
        // lets me see how many people are actually using the script
        GM_setValue("TBUpdateVersion",TBUpdateVersion);
        if (document.innerHTML.search(/Mein Profil/) != -1) 
        sendUserMessage("136518","Installed TBUpdate\n" + location.host);
    }
}
versCheck();