// ==UserScript==
// @name          Travian
// @namespace     travian
// @author        Absolute
// @version       1.1.2
// @description	  Various Tweaks for Travian 4
// @icon          http://travian.de/favicon.ico
// @include       http://ts*.travian.*/*
// @exclude       http://ts*.travian.*/manual.php*
// ==/UserScript==


// HELPER FUNCTIONS


var Translations = {
    language: (function() { return location.host.slice(-2) })(),
    getTranslation: function (sentence, replaceStuff) { 
                sentence = sentence.toLowerCase()
                if (!(sentence in this)) 
                    return "No Translation found for " + sentence;
                var string;
                if (!(this.language in this[sentence])) 
                    string = this[sentence]["en"];
                else
                    string = this[sentence][this.language];
                if (replaceStuff)
                {
                    string = string.replace(/\$(\w+)/g, function (dummy,name) { 
                        if (!(name in replaceStuff)) 
                            return name;
                        return replaceStuff[name]; 
                        });
                }
                return string;
            },
    optionsheadline: {
            en: "Travian Tweak Options",
            de: "Travian Tweak Optionen",
        },
    beute: { 
            en: "Make the loot icon show how much you really got",
            de: "Soll die Beuteanzeige im Verhältnis zur erbeuteten Beute sein?",
        },
    checkbox: {
            en: "Enable the quick select by holding down left mouse and moving it downwards for Reports and Messages",
            de: "Schnelle Selektierung von Nachrichten und Berichten durch Maus gedrückt halten und herunterziehen",
        },
    forumfix: {
            en: "Add a Page Counter and go to last post to the Forums",
            de: "Fügt eine Seitenanzeige und \"Zum-Letzten-Post\"-springen dem Forum hinzu",
        },
    heroauction: {
            en: "Disable the autorefresh of hero auctions (expired auctions are getting removed automatically)",
            de: "Das automatische Neuladen der Seite bei den Auktionen unterbinden (abgelaufene Aktionen werden automatisch entfernt)",
        },
    warehouse: {
            en: "Show the Time when (or a Countdown till) the Warehouse is full",
            de: "Zeige an, wann das Rohstofflager (bzw. Kornspeicher) voll sind, einerseits als Countdown oder als absolute Zeit",
        },
    updatingfield: {
            en: "Mark the currently updating ressourcefield bold",
            de: "Markiere das derzeitig ausbauende Ressourcenfeld",
        },
    culturepoints: {
            en: "Show the time till you have enough culture Points for the next village",
            de: "Zeige die Zeit bis du genügend Kulturpunkte für das nächste Dorf hast",
        },
    autologin: {
            en: "Try to log in automatically (if Firefox has saved your password)",
            de: "Automatisches Anmelden (benutzt den Firefox Passwortmanager)",
        },
    prodperress: {
            en: "Show the productioncost per Ressource when upgrading a Ressourcebuilding",
            de: "Zeige die Kosten pro Ressourcenproduktionspunkt beim Ausbau von Ressourcengebäuden",
        },
    seperateress: {
            en: "Show how long it takes till you have enough of every Ressource (when upgrading a Building)",
            de: "Zeige wie lange es braucht, bis du genügend Rohstoffe für den Ausbau eines bestimmten Gebäudes hast (für jeden Rohstoff einzeln)",
        },
    trainingquicksend: {
            en: "If you don't have enough ressources to upgrade a building or train a unit place a quicksend button which lets you choose which village should send the missing ressources",
            de: "Falls du nicht ausreichend Ressourcen für den Ausbau eines Gebäudes oder die Ausbildung einer Einheit hast kannst du per Knopfdruck die fehlenden Ressourcen von einem anderen Dorf senden lassen",
        },
    absoluteress: {
            en: "Show the absolute Ressourceproduction increase when upgrading Sawmill, bakery and co",
            de: "Zeige den absoluten Ressourcenproduktionszuwachs beim Ausbau eines Sägewerks, Bäckerei, Lehmbrennerei usw.",
        },
    hidebetabox: {
            en: "Hide the Betabox on Beta servers",
            de: "Verstecke die Betabox auf Betaservern",
        },
    hidereportpicture: {
            en: "Hide the Picture in Reports",
            de: "Verstecke die Bilder bei Berichten",
        },
    villageinformations: {
            en: "<h2>Enable village Informations</h2>",
            de: "<h2>Dorfinformationen aktivieren</h2>",
        },
    vill_quicksend_market: {
            en: "Add a Marketplace quicksend buttons to the village list",
            de: "Füge einen Marktplatzbutton der Dorfliste hinzu",
        },
    vill_quicksend_support: {
            en: "Add a quicksupport button in the village list",
            de: "Füge einen Unterstützungsbutton der Dorfliste hinzu",
        },
    vill_buildingtime: {
            en: "Show the remaining time of a currently upgrading building in the village list",
            de: "Zeige die für den Ausbau eines Gebäudes verbleibende Zeit in der Dorfliste an",
        },
    vill_warehouse: {
            en: "Show the time it takes till the warehouse is full in the village list",
            de: "Zeige die Zeit bis das Rohstofflager voll ist in der Dorfliste an",
        },
    vill_upgrade: {
            en: "Show the time the current upgrade (in the forge) takes in the village list",
            de: "Zeige die Zeit bis das Waffenupgrade (in der Schmiede) fertig ist in der Dorfliste",
        },
    vill_celebration: {
            en: "Show the time till celebration is done",
            de: "Zeige die Zeit bis das Fest zu Ende ist",
        },
    vill_unitproduction: {
            en: "Show the time till the units are produced",
            de: "Zeige die Zeit bis zum Abschluss der Einheitenproduktion",
        },
    close: {
            en: "Close",
            de: "Schliessen",
        },
    opensettings: {
            en: "Open Travian Fix Settings",
            de: "Travian Fix Einstellungen öffnen",
        },
    page: {
            en: "Page",
            de: "Seite",
        },
    warehousecap: {
            en: "Warehouse",
            de: "Rohstofflager",
        },
    at: {
            en: "at $hours:$minutes",
            de: "um $hours:$minutes",
        },
    time: {
            en: "on $day.$month at $hours:$minutes",
            de: "am $day.$month um $hours:$minutes",
        },
    approxtime: {
            en: "approx. $hours hours",
            de: "ca. $hours Stunden",
        },
    tomorrow: {
            en: "tomorrow at $hours:$minutes",
            de: "Morgen um $hours:$minutes",
        },
    full: {
            en: "FULL",
            de: "VOLL",
        },
    sendressources: {
            en: "Send Ressources",
            de: "Ressourcen senden",
        },
    sendtroops: {
            en: "Send Troops",
            de: "Truppen senden",
        },
    anothervillage: {
            en: "Send the missing ressources from another village",
            de: "Die fehlenden Rohstoffe aus einem anderen Dorf senden",
        },
    anothervillagelate: {
            en: "Sending would be too slow",
            de: "Senden wäre zu langsam",
        },
    moredays: {
            en: "More than $days Days",
            de: "Mehr als $days Tage",
        },
    sendfrom: {
            en: "Send from $name",
            de: "Aus $name senden",
        },
    makefull: {
            en: "Make Full",
            de: "Auffüllen",    
        },

}


// for Chrome
var p = unsafeWindow;

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

function $(id)
{
    return document.getElementById(id);
}

function $$(string, first)
{
    if (first === true) return document.querySelector(string);
    return document.querySelectorAll(string);
}

function newEle(type, node)
{
    var newE = document.createElement(type);
    node.appendChild(newE);
    return newE;
}

function collectionToArray(collection)
{
    return Array.prototype.slice.call(collection);
}

function GETRequestValue(value)
{
    var regex = new RegExp("[\\?&]"+value+"=([^&#]*)")
    var results = regex.exec( location.search );
    if( results == null )
        return -1;
    else
        return results[1];
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function fixTimeString(time) {
    time = String(time);
    if (time.length == 1) time = "0" + time;
    return time;
}



function getCookie(c_name)
{
    if (document.cookie.length>0)
      {
      c_name = "travianfix_" + c_name;
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

function setCookie(c_name,value,exseconds)
{
    var exdate;
    if (typeof(exseconds) == "object") 
        exdate = exseconds;
    else 
    {
        exdate=new Date();
        exdate.setTime(exdate.getTime() + exseconds*1000);
    }
    c_name = "travianfix_" + c_name;
    var c_value=escape(value) + ((exseconds==null) ? "" : "; expires="+exdate.toUTCString() + ";");
    document.cookie=c_name + "=" + c_value;
}



function getCoordinates(titlestring)
{
    var e2 = document.createElement('div');
    e2.innerHTML = titlestring;
    var x = e2.getElementsByClassName("coordinateX")[0].textContent.replace("(", "");
    var y = e2.getElementsByClassName("coordinateY")[0].textContent.replace(")", "");  
    return [x,y];
    
}

function removeEle(ele)
{
    ele.parentNode.removeChild(ele);
}

// Settings



settings = new Object();
settings["beute"] = GM_getValue("travian_beute", true);
settings["checkbox"] = GM_getValue("travian_checkbox", true);
settings["forumfix"] = GM_getValue("travian_forumfix", true);
settings["heroauction"] = GM_getValue("travian_heroauction", true);
settings["warehouse"] = GM_getValue("travian_warehouse", true);
settings["warehousetype"] = GM_getValue("travian_warehousetype", true); // true means countdown, false means show end time
settings["updatingfield"] = GM_getValue("travian_updatingfield", true);
settings["culturePoints"] = GM_getValue("travian_culturePoints", true);
settings["autologin"] = GM_getValue("travian_autologin", true);
settings["prodperress"] = GM_getValue("travian_prodperress", true);
settings["seperateRess"] = GM_getValue("travian_seperateRess", true);
settings["trainingQuicksend"] = GM_getValue("travian_trainingQuicksend", true);
settings["absoluteRess"] = GM_getValue("travian_absoluteRess", true);
settings["hideBetaBox"] = GM_getValue("travian_hideBetaBox", true);
settings["hidereportpicture"] = GM_getValue("travian_hidereportpicture", false);
settings["villageInformations"] = GM_getValue("travian_villageInformations", true);
settings["vill_quicksend_market"] = GM_getValue("travian_vill_quicksend", true);
settings["vill_quicksend_support"] = GM_getValue("travian_vill_support", true);
settings["vill_buildingtime"] = GM_getValue("travian_vill_buildingtime", true);
settings["vill_warehouse"] = GM_getValue("travian_vill_warehouse", true);


function openSettings()
{
    if ($("SettingsMenu")) 
    {
        $("SettingsMenu").style.display = "block";
        $("SettingsBackground").style.display = "block";
        return;
    }
    addGlobalStyle('#SettingsMenu\
            {\
                background-color:white;\
                position:absolute;\
                width:50%;\
                top:20px;\
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
    newHead2.innerHTML = "<h2>" + Translations.getTranslation("optionsheadline") + "</h2>";
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
        if (setting == "warehousetype") 
        {
            newLine.id = "warehousetype";
            newLine.style.marginLeft = "10px";
            newLine.colSpan = "2";
            var showCD = document.createElement("input");
            showCD.type = "radio";
            showCD.name = setting;
            var showFT = document.createElement("input");
            showFT.type = "radio";
            showFT.name = setting;
            if (settings["warehousetype"] == true)
                showCD.checked = true;
            else
                showFT.checked = true;

            newLine.appendChild(showCD);
            var para = document.createElement("span");
            para.textContent = "Countdown";
            newLine.appendChild(para);
            newLine.appendChild(showFT);
            var para = document.createElement("span");
            para.textContent = "Time";
            newLine.appendChild(para);
            if (!settings["warehouse"])
            {
                showCD.disabled = true;
                showFT.disabled = true;
                newLine.className += " none";
            }
            showCD.addEventListener("click", function (e) {
                    GM_setValue("travian_warehousetype", true);
                }, true);
            showFT.addEventListener("click", function (e) {
                    GM_setValue("travian_warehousetype", false);
                }, true);
            
            continue;
        }
        newLine.innerHTML = Translations.getTranslation(setting);
        
        // Input Line
        var inputline = document.createElement("td");   
        var newInput = document.createElement("input");
        newInput.type = "checkBox";
        newInput.name = setting;
        newInput.checked = settings[setting];
        inputline.style.width = "5%";
        inputline.appendChild(newInput);
        tableRow.appendChild(inputline);
        newInput.addEventListener("change", function () {
            settingName = this.name;
            if (settingName == "warehouse")
            {
                var warehousetype = $("warehousetype")
                var warehouseElements = warehousetype.getElementsByTagName("input");
                for (var x = 0; x < 2; x++)
                {
                    warehouseElements[x].disabled = !this.checked;
                }
                if (this.checked)
                    warehousetype.className = warehousetype.className.replace(/ none/, "");
                else
                    warehousetype.className += " none";
            }
            GM_setValue("travian_" + settingName, this.checked);
             
        },true);
        
    }
    var newInput = document.createElement("input");
    newInput.style.display = "block";
    newInput.style.marginLeft = "auto";
    newInput.type = "submit";
    newInput.value = Translations.getTranslation("Close");
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
}

(function () {
    var newA = document.createElement("a");
    newA.textContent = Translations.getTranslation("OpenSettings");
    newA.style.position = "absolute";
    newA.style.top = "2px";
    newA.style.left = "2px";
    newA.style.zIndex = 2;
    document.body.appendChild(newA);
    newA.addEventListener("click", function (e) {
            e.preventDefault();
            openSettings();
        }, true);
})();

function laufzeit(x1,y1,x2,y2,speed)
{
    return (Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)) / speed);
}

// If not logged in
function autologin()
{
    var lastlogin = getCookie("autologin");
    if (lastlogin == "1") return;
    // a lame way to automatically login (uses Firefox's auto passwordfill)
    setTimeout(function () {
    if (document.getElementsByName("password")[0].value != "")
        {
            setCookie("autologin", 1, 30);
            $("s1").click();
        }
    },100);
}

if (settings["autologin"] && document.getElementsByName("password")[0] && $("s1"))
{
    autologin();
    return;
}

// Information Dicts

var currentNation = (function () 
{
    var Nations = new Object();
    Nations["nationBig1"] = "Romans";
    Nations["nationBig2"] = "Teutons";
    Nations["nationBig3"] = "Gauls";
    var Nation = $$("img.nationBig", true)
    return Nations[Nation.className.match(/nationBig\d+/)[0]];
})();

var traderspeed = (function () 
{
    var traderSpeed = new Object();
    traderSpeed["Romans"] = 16;
    traderSpeed["Teutons"] = 12;
    traderSpeed["Gauls"] = 24;
    return traderSpeed[currentNation] / 3600;
})();

resourceCapacity = (function ()
{
    var tempdict = new Object();
    var ress = $("res").getElementsByTagName("li");
    for (var x = 0; x < ress.length-1; x++)
    {
            var ressname = ress[x].className;
            tempdict[ressname] = new Object();
            var y = x+1;
            var resele = $("l" + y);
            tempdict[ressname]["kapa"] = parseInt(resele.textContent.split("/")[1]);
            tempdict[ressname]["vorrat"] = parseInt(resele.textContent.split("/")[0]);
            tempdict[ressname]["prodo"] = p.resources.production["l" + y] / 3600;
    }
    return tempdict;
})();


var activeVillage;
villageList= (function ()
{
    var tempdict = new Array();
    var vill = $$("#villageList .entry");
    for (var x = 0; x < vill.length; x++)
    {
            var linkele = vill[x].lastElementChild;
            tempdict.push(new Object());
            if (vill[x].className.search(/active/) != -1) activeVillage = x;
            tempdict[x]["name"] = linkele.textContent;
            if (!Chrome) {
                var dorflink = getCoordinates(linkele.title);
                tempdict[x]["xcoord"] = dorflink[0];
                tempdict[x]["ycoord"] = dorflink[1];
            }
            else {tempdict[x]["xcoord"] = false; tempdict[x]["ycoord"] = false;}
            tempdict[x]["newdid"] = linkele.href.match(/newdid=(\d+)/)[1]

    }
    return tempdict;
})();

var rtl = false;
if (document.body.style.direction == "rtl") rtl = true;

var currentPage = location.pathname.match(/\/(.+?)\./)[1];
var currentTime = new Date();

// Functions
function addBeute()
{
    var Table = collectionToArray($$("#overview .carry"))
    
    for (var x = 0; x < Table.length; x++)
    {

        if (Table[x].alt.indexOf("/") == -1) continue;
        var text = Table[x].alt.match(/(\d+)\/(\d+)/)
        var fullcapacity = parseInt(text[2])
        var capacity = parseInt(text[1])
        if (capacity == fullcapacity || capacity == 0) continue;
        var percent = capacity / fullcapacity

        if (percent < 0.50 && percent != 0) percent += 0.05;
        var eleheight = 14 * percent
        Table[x].className = Table[x].className.replace(/full/, "empty").replace(/half/, "empty")
        var parent = Table[x].parentNode;
        
        parent.id = "beute" + x;
        // Table[x].id = "beutelink" + x;
        // p.$("beutelink" + x).removeEvents()
        var beuteAnzeige = document.createElement("img");
        
        beuteAnzeige.src = "img/x.gif";
        beuteAnzeige.className = "reportInfo carry full";
        beuteAnzeige.style.height = eleheight + 'px';
        beuteAnzeige.style.zIndex = 1;
        beuteAnzeige.style.left = "13px";
        beuteAnzeige.style.top = (14 - eleheight) + 'px';
        beuteAnzeige.style.cssFloat = "right";
        beuteAnzeige.style.backgroundPosition = '0px -' + (14 - eleheight) + 'px';
        beuteAnzeige.style.position = "relative";
        parent.insertBefore(beuteAnzeige, parent.lastElementChild);
        parent.innerHTML = parent.innerHTML; // reset the tooltips
        // add the new tip
        parent = $("beute" +x)
        // parent.title = capacity + '/' + fullcapacity;
        // hacky way to set the tip, no idea why the other way didnt work
        if(Chrome) {
            location.href = 'javascript:Travian.Tip.set($("beute'+x+'"), {"title":"","text":"'+capacity + '/' + fullcapacity+'","unescaped":false});'
        }
        else
        {
            
            // p.Travian.Tip.set(parent, {"title":"1","text":capacity + '/' + fullcapacity,"unescaped":true});
            parent.title = capacity + '/' + fullcapacity;
        }
    }
}

function checkBoxHook()
{

    // checkbox hook
    var checkBoxes = $$(".check");
    var oldStatus = {};
    var startCoord = 0;
    var checkStatus = null;
    var startEle = 0;
    for (var x = 0; x < checkBoxes.length; x++)
    {
        // add a mousedown event listener to every checkbox
        checkBoxes[x].addEventListener("mousedown", function (e) {
            startCoord = e.pageY;
            this.checked = !(this.checked);
            checkStatus = this.checked;
            // save the index of the first element to startEle
            startEle = collectionToArray(checkBoxes).indexOf(this);
            // save the old status of every checkbox
            //for (var x = 0; x < checkBoxes.length; x++)
            //{
            //    oldStatus[checkBoxes[x]] = checkBoxes[x].checked;
            //}
            },true);
        // stop the normal behaviour of the checkboxes
        checkBoxes[x].addEventListener("click", function (e) { e.preventDefault(); }, true);
    }
    // when mouse is released, reset the status to stop mousemove from firing
    document.addEventListener("mouseup", function (e) {
            if (checkStatus == null) return;
            checkStatus = null;
        }, true);
    
    document.addEventListener("mousemove", function (e) {
        if (checkStatus == null) return;
        // alert(checkStatus);
        // Reset every checkbox to their original status
        //for (var x = 0; x < checkBoxes.length; x++)
        //{
        //    checkBoxes[x].checked = oldStatus[checkBoxes[x]];
        //}
    
        // find out the bigger coordinate
        var endCoord = e.pageY;
        var biggerone = startCoord; 
        var smallerone = endCoord;
        if (startCoord < endCoord) { biggerone = endCoord; smallerone = startCoord;}
        // calculate the distance between start and end point
        var distance = biggerone - smallerone; 
        // start from the index of the saved element
        var x = startEle;
        // size of one checkbox is 26 units, so loop as long as there are units left
        while (distance > 25)
        {
            if (startCoord > endCoord) x -= 1;
            else x += 1;
            if ((x < 0) || (x > checkBoxes.length)) break;
            checkBoxes[x].checked = checkStatus;
            distance -= 26
        }
        

        }, true);
}

function ForumFix()
{
    // Forum Page Display & Lastpost fix
    if (location.href.search(/fid=\d+/) != -1)
    {
        var stuff = $$("#topics tr");
        for (var x = 1; x < stuff.length; x++)
        {

            var lastpost = stuff[x].getElementsByClassName("last")[0].getElementsByTagName("a")[1];
            lastpost.href = lastpost.href + "#lastpost";
            var posts = stuff[x].getElementsByClassName("cou")[0].textContent;
            //posts = posts + 1;
            if (posts < 10) continue;
            var title = stuff[x].getElementsByClassName("tit")[0];
            var threadlink = title.getElementsByTagName("a")[0].href;
            var newSpan = newEle("span", title);
            newSpan.style.fontSize = "11px";
            var tempadd = "["+ Translations.getTranslation("Page") +": ";
            // var pages = posts/10+1;
            var bool = false;
            for (var y = 0; y <= posts; y = y + 10)
            {
                if (y >= 20 && y < posts - 20)
                {
                    if (!bool)
                    {
                        tempadd += " ...,";
                    }
                    bool = true;
                    continue;
                }
                tempadd += " <a href=\"" + threadlink + "&page=" + (y / 10 + 1) + "\">" + (y / 10 + 1) + "</a>,";
            }
            tempadd = tempadd.slice(0, tempadd.length - 1);
            tempadd += "]";
            newSpan.innerHTML = tempadd;
        }
    }

    if (GETRequestValue("tid") != "")
    {
        if (window.location.hash == "#lastpost")
        {
            $("posts").lastElementChild.lastElementChild.id = "lastpost";
            var oldlink = location.href.split("#")[0]
            location.replace(oldlink + "#lastpost2");
            location.replace(oldlink + "#lastpost");
        }
    }
}

function HeroAuction()
{
    // a very hacky way to disable autorefresh
    // location.href = "javascript:auto_reload = 2"
    // location.href = 'javascript:in_reload = 1'
    p.in_reload = 1;
    p.auto_reload = 2;
    var func = function (node)
    {

        node.parentNode.removeChild(node);
        // location.href = 'javascript:in_reload = 0;'
        // location.href = 'javascript:setTimeout("executeCounter()", 1000)'
        if ($$("#auction .time").length == 2) window.location.reload();
    }

    var stuff = collectionToArray($$("#auction .time"));

    for (var x = 1; x < stuff.length; x++)
    {
        var timer = stuff[x].firstElementChild.textContent.split(":");
        var timeleft = parseInt(timer[0]) * 3600;
        timeleft += parseInt(timer[1]) * 60;
        timeleft += parseInt(timer[2]);

        setTimeout(func, timeleft * 1000-750, stuff[x].parentNode)
    }

    function executeCounterReplacement()
    {
        p.executeCounter();
        // location.href = 'javascript:executeCounter()'

    }
    setInterval(executeCounterReplacement, 1000);
}

function warehouseTime()
{
    var sidebar = $("side_info");
    var newList = document.createElement("div");
    var newHead = document.createElement("div");
    var newBot = document.createElement("div");
    newList.className = "listing";
    newList.style.left = "12px";
    newList.style.marginTop = "-6px";
    newList.style.overflow = "visible";
    newHead.className = "head";
    newHead.style.backgroundImage = 'url("gpack/travian_Travian_4.0_Grisu/img/layout/signVillagesTop-ltr.png")'
    newHead.style.height = "68px";
    newBot.style.backgroundImage = 'url("gpack/travian_Travian_4.0_Grisu/img/layout/signVillagesBottom_none-ltr.png")';
    newBot.className = "list";
    newList.appendChild(newHead);
    newList.appendChild(newBot);
    sidebar.appendChild(newList);
    var newUL = document.createElement("ul");
    newUL.style.top = "-28px";
    newUL.style.marginRight = "52px";
    newBot.appendChild(newUL);
    var newA = document.createElement("a");
    newA.textContent = Translations.getTranslation("Warehousecap");
    newA.title = "Click here to get Marketplace values";
    newA.style.top = "21px";
    newA.style.display = "inline";
    newA.style.paddingLeft = "0px";
    newHead.appendChild(newA);
    var evFunc = function (e) {
            e.preventDefault();
            this.removeEventListener("click",evFunc,true);
            GM_xmlhttpRequest({
                    method: "GET",
                    url: "http://"+ location.host +"/build.php?gid=17",
                    onload: function(response) {
                            var importantPart = response.responseText.match(/h4 class="spacer"[\s\S]+?table class="traders"([\s\S]+?)div class="contentFooter"/)
                            if (!importantPart) return;
                            importantPart = importantPart[0];
                            var ankommende = importantPart.match(/\/h4[\s\S]+?(?:h4|contentFooter)/)[0]
                            var timeAndRess = ankommende.match(/id=timer\d+>(.+?)<[\s\S]+?img.*?>[\S\s]+?(\d+)[\S\s]+?>[\S\s]+?(\d+)[\S\s]+?>[\S\s]+?(\d+)[\S\s]+?>[\S\s]+?(\d+)/g);
                            var array = new Array();
                            for (var x = 0; x < timeAndRess.length; x++)
                            {
                                var matchstring = timeAndRess[x].match(/id=timer\d+>(.+?)<[\s\S]+?img.*?>[\S\s]+?(\d+)[\S\s]+?>[\S\s]+?(\d+)[\S\s]+?>[\S\s]+?(\d+)[\S\s]+?>[\S\s]+?(\d+)/);
                                
                                array[x] = new Object();
                                var timeleft = matchstring[1].split(":");
                                var timeleftseconds = 3600*timeleft[0] + 60*timeleft[1] + timeleft[2]; 
                                array[x]["timeleft"] = timeleftseconds;
                                array[x]["holz"] = matchstring[2];
                                array[x]["lehm"] = matchstring[3];
                                array[x]["eisen"] = matchstring[4];
                                array[x]["getreide"] = matchstring[5];
                            }
                            
                            
                        }
                    });
            }
    newA.addEventListener("click", evFunc, true);  

    if (settings["vill_warehouse"])
    {
        var vill_warehouse_string = "";
        var biggestTime = 0;
    }
    for (var resource in resourceCapacity)
    {
        
        var y = resource.match(/\d+/)[0]

        var listElement = document.createElement("li");
        listElement.style.marginLeft = "16px";
        newUL.appendChild(listElement);
        var ressImage = document.createElement("img");
        ressImage.className = resource;
        ressImage.src = "img/x.gif";
        listElement.appendChild(ressImage);
        var lagerzeit = document.createElement("div");
        lagerzeit.className = "entry";
        lagerzeit.id = "ressi" + y;
        lagerzeit.style.cssFloat = "right";
        // lagerzeit.style.marginRight = "20px";
        lagerzeit.style.display = "inline";
        listElement.appendChild(lagerzeit);

        var kapa = resourceCapacity[resource]["kapa"];
        var vorrat = resourceCapacity[resource]["vorrat"];
        if ((kapa-vorrat) <= 10) {
            lagerzeit.className = "error";
            lagerzeit.textContent = Translations.getTranslation("FULL");
            continue;
        }
        var prodopersec = resourceCapacity[resource]["prodo"];
        var counterobj = "ressloop"+y;
        var timeTaken = 0;
        if (prodopersec < 0) {
            lagerzeit.className = "error";
            timeTaken = parseInt(vorrat / -prodopersec);
        }
        else
        {
            timeTaken = parseInt((kapa-vorrat) / prodopersec);
        }
        var jetzt = currentTime.getTime() / 1000;
        var timeTakenDate = new Date((jetzt + timeTaken)*1000); // 1000 because of milliseconds
        var hours, minutes;
        hours = fixTimeString(timeTakenDate.getHours());
        minutes = fixTimeString(timeTakenDate.getMinutes());
        var myTitle;
        if (currentTime.getDate() == timeTakenDate.getDate()) 
        {
            myTitle = " " + Translations.getTranslation("at", {"hours":hours,"minutes":minutes});
        }
        else if ((timeTakenDate.getDate() - currentTime.getDate()) == 1) 
        {
            myTitle = " " + Translations.getTranslation("tomorrow",{"hours":hours,"minutes":minutes});
        }
        else
        {
            var day = fixTimeString(timeTakenDate.getDate());
            var month = fixTimeString(timeTakenDate.getMonth()+1); // +1 because getMonth returns january as 0
            myTitle = " " + Translations.getTranslation("time", {"day": day,"month":month,"hours":hours,"minutes":minutes});
        }
        if (settings["warehousetype"])
        {
            listElement.title = myTitle;
            p.counter_minus[counterobj] = new Object();
            p.counter_minus[counterobj].node = lagerzeit;
            p.counter_minus[counterobj].counter_time = timeTaken;
        }
        else
        {
            lagerzeit.textContent = myTitle;
            listElement.title = Translations.getTranslation("approxTime", {"hours":(timeTaken / 3600).toFixed(1)});
        }
        if (settings["vill_warehouse"])
        {   
            vill_warehouse_string += '<img src="img/x.gif" class="' + resource + '"> ' + resourceCapacity[resource]["vorrat"] + "/" + resourceCapacity[resource]["kapa"] + " - " + myTitle + "<br>"; 
            if (timeTaken > biggestTime) biggestTime = timeTaken;
        }

    }
    if (settings["vill_warehouse"])
    {   
        setCookie("warehouse_" + villageList[activeVillage]["newdid"], vill_warehouse_string, timeTaken);
    }
    if (settings["trainingQuicksend"]) 
    {
        var listElement = document.createElement("li");
        newUL.appendChild(listElement);
        var lagerzeit = document.createElement("div");
        lagerzeit.className = "entry";
        lagerzeit.id = "fillSend";
        lagerzeit.style.marginRight = "20px";
        lagerzeit.style.display = "inline";
        listElement.appendChild(lagerzeit);

        addGlobalStyle("#side_info .listing .list td a { padding-left: 0px; left: 0px; color: #99C01A; font-weight: bold } #side_info .listing .list td a:hover{color: #00BC00; }"); 
        var newLink = newEle("a", lagerzeit);
        newLink.textContent = Translations.getTranslation("MakeFull");
        /*
        newLink.style.display = "inline";
        newLink.style.left = "110px";
        newLink.style.top = "5px";
        */
        newLink.style.cssFloat = "right";
        newLink.style.fontWeight = "bold";
        newLink.style.color = "#99C01A";
        newLink.style.width = "auto";
        // newLink.style.marginRight = "20px";
        newLink.addEventListener("click", function (e) {
                    e.preventDefault();
                    if ($("fillSend").lastElementChild.tagName != "TABLE")
                    {
                        var tempObj = new Object();
                        for (y in resourceCapacity)
                        {
                            tempObj[y] = resourceCapacity[y]["kapa"] - resourceCapacity[y]["vorrat"];
                        }
                        var newTable = trainingQuicksend(tempObj);
                        $("fillSend").appendChild(newTable);
                        newTable.style.zIndex = 90;
                        newTable.style.position = "absolute";
                        newTable.style.width = "300px";
                        newTable.style.right = "20px";
                        newTable.style.top = "70px";
                    }
                    if ($("fillSend").lastElementChild.style.display == "block")
                         $("fillSend").lastElementChild.style.display = "none";
                    else $("fillSend").lastElementChild.style.display = "block";
                    
                }, true);
        /*
        var newImg = newEle("img", newLink);
        newImg.src = "gpack/travian_Travian_4.0_Fluffy/img/market/ratio.gif"
        newImg.width = 11;
        newImg.height = 11;
        newImg.alt = "(M)";
        */
    
    }

}

function updatingRessfield()
{
    for (var y = 0; y < p.bld.length; y++) 
    {
        if (p.bld[y]["stufe"] <= 1)  continue;
        
        var areaelements = $("rx").getElementsByTagName("area")
        var levelelements = $$("#village_map .level")
        var currentBuild = p.bld[y]["aid"];
        if (currentBuild > 18) continue;
        var innerX = 0;
        for (var x = 0;x < 18;x++) // loop thru all area elements 
        {
            if (areaelements[x].alt.match(/\d+/)[0] != 0) // ignore all loops which are level 0, since they are not part of .level
            {
                
                if ((x+1) == currentBuild)
                {
                    levelelements[innerX].innerHTML = "<b>" + levelelements[innerX].innerHTML + "</b>";
                    break;
                }
                innerX += 1;
                
            }
        }
    }
}

function culturePoints()
{
    var KPloop = function () {
                    $("currentpoints").textContent = parseInt($("currentpoints").textContent) + 1;
                }
    var KP = $("build_value").textContent.match(/\d+/g)
    var production = parseInt(KP[1]);
    if (KP[2] > 0) // hero production
    {
        production += parseInt(KP[2]);
    }
    KP = $("build").lastElementChild.getElementsByTagName("b")
    var currpoints = parseInt(KP[0].textContent);
    var maxpoints = parseInt(KP[1].textContent);
    KP[0].id = "currentpoints";
    
    var productionpersecond = production / (24 * 60 * 60);
    setInterval(KPloop, (1 / productionpersecond) * 1000);

    if (currpoints < maxpoints)
    {
        var secondsLeft = (maxpoints - currpoints) / productionpersecond;
        if (secondsLeft > 24 * 60 * 60 * 2)
        {
            $("build").lastElementChild.innerHTML += " (<span class=\"none\">" + Translations.getTranslation("moreDays",{"days":Math.floor((maxpoints - currpoints) / production)}) + "</span>)";
        }
        else
        {
            $("build").lastElementChild.innerHTML += " (<span class=\"none\" id=\"KPcountdown\"></span>)";
            var counterobj = "KPcountdown";
            p.counter_minus[counterobj] = new Object();
            p.counter_minus[counterobj].node = $("KPcountdown");
            p.counter_minus[counterobj].counter_time = parseInt(secondsLeft);
        }
    }
}

function absoluteRess(buildid)
{
    var resspercent = $("build_value").getElementsByTagName("b");
    var currentPercent = parseInt(resspercent[0].textContent);
    var newPercent = parseInt(resspercent[1].textContent);
    var currentProduction = 0;
    if (buildid == "gid8" || buildid == "gid9") 
        currentProduction = parseInt($("l5").textContent.split("/")[1]);
    else if (buildid == "gid5") currentProduction = p.resources.production["l1"];
    else if (buildid == "gid6") currentProduction = p.resources.production["l2"];
    else if (buildid == "gid7") currentProduction = p.resources.production["l3"];
    
    var originalProduction = (currentProduction / (100 + currentPercent)) * 100;
    var newProduction = originalProduction + originalProduction * (newPercent / 100);
    
    var addProduction =  newProduction - currentProduction;
    
    resspercent[1].parentNode.innerHTML += "<span class=\"none\"> (+" + addProduction.toFixed(1) + ")</span>";
    if (settings["prodperress"]) addProdperRess(addProduction);
}

// adds the cost per Production point to the current page
function addProdperRess(production)
{
    var resscost = collectionToArray($$("#contract .showCosts", true).getElementsByTagName("span"));

    var einheit = 0;
    for (var x = 0; x < resscost.length - 2; x++)
    {
        einheit += parseInt(resscost[x].textContent);
    }
    einheit = einheit / 4;
    if (einheit > 10000) einheit = 10000;
    else if (einheit > 1000) einheit = 1000;
    else if (einheit > 100) einheit = 100;
    else einheit = 10;
    
    var newSpan = document.createElement("span");
    newSpan.className = "none";
    newSpan.textContent = " (Ress per Production)";
    $$("#contract .contractText", true).appendChild(newSpan);

    for (var x = 0; x < resscost.length - 2; x++)
    {
        var newSpan = document.createElement("span");
        newSpan.className = "none";
        newSpan.textContent = "(" + (parseInt(resscost[x].textContent) / production ).toFixed(1) + ")";
        resscost[x].appendChild(newSpan);
    }
    var newSpan = document.createElement("span");
    newSpan.className = "none";
    newSpan.textContent = "(" + (parseInt(resscost[4].textContent) / production).toFixed(1) + ")";
    resscost[4].appendChild(newSpan);
    
}

function villageInformations()
{
    addGlobalStyle('.villageListQuicksend\
           {position:relative;float:right;z-index:5;top:-13px;}');
    var villages = collectionToArray($$("#villageList .entry"))
    for (var x = 0; x < villageList.length; x++)
    {
        if (settings["vill_buildingtime"]) {
            var buildCookie = getCookie("upgrade_" + villageList[x]["newdid"]);
            if (buildCookie != "")
            {
                var buildings = buildCookie.split("|");
                var titlestring = "";
                var curTime = currentTime.getTime();
                for (var y = 0; y < buildings.length; y++)
                {
                    var buildstring = buildings[y].split(":");
                    // if the building is completed already, continue
                    if (parseInt(buildstring[1]) <= curTime) continue;
                    var endTime = new Date(parseInt(buildstring[1]));
                   
                    titlestring += buildstring[0] + " - " + fixTimeString(endTime.getHours()) + ":" + fixTimeString(endTime.getMinutes()) + ":" + fixTimeString(endTime.getSeconds()) + "<br>";
                } 
                if (titlestring != "")
                {
                    var newImg = newEle("img", villages[x]);
                    newImg.src = "/gpack/travian_Travian_4.0_Luuna/img/a/bau.gif";
                    newImg.title = titlestring;
                    newImg.width = "6";
                    newImg.style.position = "relative";
                    newImg.style.top = "-5px";
                    newImg.style.left = "18px";
                    setTimeout(removeEle, (endTime.getTime() - curTime), newImg);
                }
            }
        }
        if (settings["vill_warehouse"])
        {
            var wareCookie = getCookie("warehouse_" + villageList[x]["newdid"]);
            if (wareCookie != "")
            {
                var newImg = newEle("img", villages[x]);
                newImg.src = "/gpack/travian_Travian_4.0_Luuna/img/a/resAll-ltr.gif";
                newImg.title = wareCookie;
                newImg.width = "10";
                newImg.style.position = "relative";
                newImg.style.top = "-5px";
                newImg.style.left = "24px";
            }
        }
        if (x == activeVillage) continue;
        crvil = villageList[x];
        var xcoord = villageList[x]["xcoord"];
        var ycoord = villageList[x]["ycoord"];
        var newSpan = document.createElement("span");
        newSpan.className = "villageListQuicksend";
        if (settings["vill_quicksend_market"]) {
            var sendRess = document.createElement("a");
            sendRess.style.width = "auto";
            sendRess.style.display = "inline";
            sendRess.style.marginLeft = "0px";
            sendRess.style.marginRight = "1px";
            sendRess.title = Translations.getTranslation("SendRessources");
            if (Chrome) sendRess.href = 'build.php?dname=' + encodeURIComponent(villageList[x]["name"]) + '&gid=17';
            else sendRess.href = 'build.php?x=' + xcoord + '&y=' + ycoord + '&gid=17';
            sendRess.innerHTML += '<img src="gpack/travian_Travian_4.0_Fluffy/img/market/ratio.gif" alt="(M)" width="11" height="11">';
            newSpan.appendChild(sendRess);
        }
        if (settings["vill_quicksend_support"]) {
            var sendTroops = document.createElement("a");
            sendTroops.style.width = "auto";
            sendTroops.style.display = "inline";
            sendTroops.style.marginLeft = "0px";
            sendTroops.style.marginRight = "16px";
            sendTroops.title = Translations.getTranslation("SendTroops");
            if (Chrome) sendTroops.href = 'a2b.php?dname=' + encodeURIComponent(villageList[x]["name"]);
            else sendTroops.href = 'a2b.php?x=' + xcoord + '&y=' + ycoord;
            sendTroops.innerHTML += '<img src="gpack/travian_Travian_4.0_Fluffy/img/a/def_all.gif" alt="(T)" width="11" height="11">';
            newSpan.appendChild(sendTroops);
        }
        
        villages[x].appendChild(newSpan);
        
        
    }    
    
}



function seperateRessource()
{
    var showCosts = $$(".showCosts");
    for (var y = 0; y < showCosts.length; y++)
    {
        var lowresele = showCosts[y].getElementsByClassName("little_res");
        if (lowresele.length == 0) continue;
        var tempObj = new Object();
        for (var x = 0; x < lowresele.length; x++)
        {
            var thisEle = lowresele[x]
            var trainingCost = parseInt(thisEle.textContent);
            var resource = thisEle.className.match(/r\d+/)[0];
            tempObj[resource] = trainingCost;
            if (trainingCost > resourceCapacity[resource]["kapa"]) 
                tempObj[resource] = trainingCost - (trainingCost - resourceCapacity[resource]["kapa"])
            tempObj[resource] = trainingCost - resourceCapacity[resource]["vorrat"]
        }
        if (settings["trainingQuicksend"] && villageList.length > 1)
        {
            var newDiv = document.createElement("div");
            showCosts[y].appendChild(newDiv);
            var newSpan = document.createElement("a");
            newDiv.appendChild(newSpan);
            newSpan.textContent = Translations.getTranslation("anothervillage");
            newSpan.addEventListener("click", function (e) {
                        var ele = this.parentNode.lastElementChild;
                        if (ele.style.display == "none")
                            ele.style.display = "block";
                        else
                            ele.style.display = "none";
                    },true);
            var newTable = trainingQuicksend(tempObj);
            if (newTable == -1)
            {
                newSpan.textContent = Translations.getTranslation("anothervillagelate");
                newSpan.className = "none";
            }
            else newDiv.appendChild(newTable);
        }
        if (!settings["seperateRessource"]) continue;
        
    }
}

function trainingQuicksend(requiredRess)
{
    var newTable = document.createElement("table"); 
    newTable.cellSpacing = "1";
    newTable.style.display = "none";
    /*
    newTable.style.zIndex = 5;
    newTable.style.position = "absolute";
    newTable.style.width = "300px";
    newTable.style.marginLeft = "20px";
    
    //newTable.id = "marketSend";
    var header = newEle("th", newTable);
    var newLine = newEle("tr", header);
    newLine.textContent = "Villagename";*/
    if (Chrome) var actname = encodeURIComponent(villageList[activeVillage]["name"]);
    var actxcoord = villageList[activeVillage]["xcoord"];
    var actycoord = villageList[activeVillage]["ycoord"];
    for (var x = 0; x < villageList.length; x++)
    {
        if (x == activeVillage) continue;  
        var sendcommand = ""; 
        if (!Chrome) {
            var xcoord = villageList[x]["xcoord"];
            var ycoord = villageList[x]["ycoord"];
            var lauf = laufzeit(actxcoord, actycoord, xcoord, ycoord, traderspeed);
        }
        else { var vilname = encodeURIComponent(villageList[x]["name"]); }
        for (var y in requiredRess)
        {
            var realCost;
            if (!Chrome) realCost = (requiredRess[y] - resourceCapacity[y]["prodo"] * lauf).toFixed(0);
            else realCost = requiredRess[y];
            if (realCost <= 0) continue; 
            sendcommand += y + "=" + realCost + "&";
        }
        if (sendcommand.length == 0) continue;
        sendcommand = sendcommand.slice(0,-1);
        if (Chrome) sendcommand = "build.php?gid=17&dname=" + actname + "&" + sendcommand;
        else sendcommand = "build.php?gid=17&x=" + actxcoord + "&y=" + actycoord + "&" + sendcommand;
        var newTD = document.createElement("td");
        var newTR = document.createElement("tr");
        var sendLink = document.createElement("a");
        newTable.appendChild(newTR);
        newTR.appendChild(newTD);
        newTD.appendChild(sendLink);
        newTD.style.width = "90%";
        sendLink.style.display = "block";
        sendLink.style.width = "100%";
        sendLink.textContent = Translations.getTranslation("sendfrom", {"name":villageList[x]["name"]});
        sendLink.href = sendcommand + "&newdid=" + villageList[x]["newdid"];
        if (!Chrome) {
            var newTD = document.createElement("td");
            newTR.appendChild(newTD);
            newTD.textContent = p.t_format2(lauf.toFixed(0))
            newTD.style.textAlign = "center";
            newTD.style.paddingLeft = "9px";
            newTD.style.paddingRight = "9px";
        }
    }
    if (newTable.childElementCount == 0) {
            return -1;
        }
    return newTable;
    
}
function getCurrentBuilding()
{

    var buildingElements = $$("#building_contract .buildingTime");
    var cookieString = "";
    for (var x = 0; x < buildingElements.length; x++)
    {
        var timer = buildingElements[x].firstElementChild.textContent.split(":");
        
        var expireDate = currentTime.getTime() + parseInt(timer[0]) * 3600 * 1000 + parseInt(timer[1]) * 60  * 1000 + parseInt(timer[2]) * 1000;
        var buildingName = buildingElements[x].previousSibling.textContent;
        cookieString += buildingName + ":" + expireDate + "|";
    }
    cookieString = cookieString.slice(0,-1);
    setCookie("upgrade_" + villageList[activeVillage]["newdid"], cookieString, (new Date(expireDate)));
    
}

function hideReportPicture()
{
    var stuff = $$("img.adventureReportImage, img.reportImage", true);
    stuff.parentNode.removeChild(stuff);
}

// Function Calls
(function () {



if (currentPage == "berichte")
{
    if (location.href.search(/id/) == -1) 
    {
        if (GETRequestValue("t") != 5)
        {
            if (settings["beute"]) addBeute();
            if (settings["checkbox"]) checkBoxHook();
        }
    }
    else
    {
        if (settings["hidereportpicture"]) hideReportPicture();
    }
}
else if (settings["checkbox"] && currentPage == "nachrichten" && location.href.search(/id/) == -1 && GETRequestValue("t") != 1)
{
    checkBoxHook();
}
else if (settings["forumfix"] && currentPage == "allianz" && GETRequestValue("s") == 2)
{
    ForumFix();
}
// Hero Auction autorefresh disabler + Expired Auctions remover
else if (settings["heroauction"] && currentPage == "hero_auction" && GETRequestValue("action") != "sell")
{
    HeroAuction();
}
// show updating ress field
else if (p.bld != undefined && (currentPage == "dorf1" || currentPage == "dorf2"))
{
    if (settings["updatingfield"] && currentPage == "dorf1")
        updatingRessfield();
    if (settings["vill_buildingtime"])
        getCurrentBuilding();
}

else if (currentPage == "build")
{
    var buildid = $("build").className
    
    if (settings["trainingQuicksend"] || settings["seperateRess"])
    {
        seperateRessource();
    }
    // marketplace
    if (buildid == "gid17" && GETRequestValue("t") == -1)
    {
        var tempry = ["r1","r2","r3","r4"];
        for (var x = 0; x < tempry.length; x++)
        {
            var valu = GETRequestValue(tempry[x]);
            if (valu == -1) continue;
            $(tempry[x]).value = valu;
        }
        // for chrome users
        var villageName = GETRequestValue("dname");
        if (villageName != -1) $("enterVillageName").value = decodeURIComponent(villageName);
    }
    // residency/palace culture points page
    else if ((buildid == "gid25" || buildid == "gid26") && GETRequestValue("s") == 2)
    {
        if (settings["culturePoints"]) culturePoints();
    }
    // muehle, baeckerei, saegewerk, eisengiesserei, lehmbrennerei
    else if (buildid == "gid8" || buildid == "gid9" || buildid == "gid5" || buildid == "gid9" || buildid == "gid7" || buildid == "gid6")
    {
        if (settings["absoluteRess"]) absoluteRess(buildid);
    }
    else if ((GETRequestValue("id") <= 18 && GETRequestValue("id") > 0) && (settings["prodperress"]) )
    {
        var prod = $("build_value").getElementsByTagName("b")
        var newProd = parseInt(prod[1].textContent) - parseInt(prod[0].textContent)
        addProdperRess(newProd);
    }
}

if (settings["warehouse"]) warehouseTime();
if (settings["villageInformations"]) villageInformations(); 
if (settings["hideBetaBox"] && $("betaBox")) document.body.removeChild($("betaBox"));


})();
