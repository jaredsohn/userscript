// ==UserScript==
// @name           Private Metasearch
// @author         sanguinepenguinx
// @version        1.95
// @namespace      http://what.cd
// @description    Searches multiple private trackers
// @include        http://www.berrypi.com/search.htm*
// ==/UserScript==

function main() {
    currentversion = "1.95";
    addcontent();
    search();
};

var site = new Array();

// Site name, Regular search URL, Phrase when no results returned, Description search URL, Text when not logged in, Category (music, general, video, other)

//Nordic trackers
site.push(["NorBits","https://norbits.net/browse.php?scenerelease=0&incldead=0&search=","Prøv igjen med en redfinert søkestreng.","https://norbits.net/browse.php?scenerelease=0&incldead=0&fullsearch=1&search=","","nordic"]);
site.push(["FilmBits","http://www.filmbits.net/browse.php?cat=0&search=","Prøve igjen med nytt søkeord.","","","nordic"]);
site.push(["DanishBits","https://danishbits.org/browse.php?search=","Try again with a refined search string.","","","nordic"]);
site.push(["Nordic-t","http://nordic-t.org/browse.php?incldead=0&searchname=","Try again with a refined search string.","http://nordic-t.org/browse.php?incldead=0&search=","","nordic"]);
site.push(["Piratetorrents","http://www.piratetorrents.nu/browse.php?incldead=0&search=","Inget hittat!","","","nordic"]);

// Scene trackers
site.push(["SCC","http://www.sceneaccess.org/browse.php?search=","Nothing found!","","","scene"]);
site.push(["ScL","http://scenelife.net/browse.php?search=","Nothing found!","","","scene"]);
site.push(["ScT","https://www.scenetorrents.org/browse.php?titleonly=1&search=","Try again with a refined search string.","https://www.scenetorrents.org/browse.php?&search=","","scene"]);
site.push(["GFT","http://www.thegft.org/browse.php?search=","Try again with a refined search string.","","","scene"]);
site.push(["RevTT","https://www.revolutiontt.net/browse.php?cat=0&titleonly=1&search=","Try again with a refined search string","https://www.revolutiontt.net/browse.php?cat=0&search=","","scene"]);
site.push(["TL","http://www.torrentleech.org/browse.php?search=","Try again with a refined search string","","","scene"]);
site.push(["TorrentIt","http://www.torrentit.eu/torrents.php?searchstr=","Your search was way too l33t, try dumbing it down a bit.","","","scene"]);

// Movie and HD trackers
site.push(["x264","http://x264.me/browse.php?incldead=0&stype=0&search=","Nothing found!","","","video"]);
site.push(["HDBits","http://hdbits.org/browse.php?search=","Nothing found!","","","video"]);
site.push(["Goem","http://goem.org/browse.php?s_type=1&search=","Nothing found!","http://goem.org/browse.php?search=","","video"]);
site.push(["TehConnection","http://tehconnection.eu/torrents.php?searchstr=","No Search Results, try reducing your search options.","","","video"]);

// Music trackers
site.push(["What.CD","http://what.cd/torrents.php?action=basic&searchstr=","Your search did not match anything","","","music"]);
site.push(["Waffles","https://www.waffles.fm/browse.php?q=","Nothing found!","","","music"]);

// TV
site.push(["BitMeTV","http://www.bitmetv.org/browse.php?search=","Nothing found!","","","tv"]);
site.push(["TheBox","http://thebox.bz/browse.php?titleonly=1&search=","Nothing found!","http://thebox.bz/browse.php?search=","404 - Not Found","tv"]);

// Game trackers
site.push(["BCG","http://www.blackcats-games.net/browse.php?search=","Try again with a refined search string","","Lorem ipsum dolor sit amet","game"]);
site.push(["bitGAMER","http://www.bitgamer.com/browse.php?incldead=0&searchtitle=1&search=","Nothing found!","http://www.bitgamer.com/browse.php?incldead=0&search=","","game"]);

// Public trackers
site.push(["Mininova","http://www.mininova.org/search/?search=","No results for","","","public"]);
site.push(["The Pirate Bay","http://thepiratebay.org/search/","Try adding an asterisk","","","public"]);

YES = "http://www.berrypi.com/images/yes.png";
NO = "http://www.berrypi.com/images/no.png";
WAIT = "http://www.berrypi.com/images/wait.png";
OFF = "http://www.berrypi.com/images/off.png";
LOGIN = "http://www.berrypi.com/images/login.png"

var categ = new Array();

function addcategories(left,right) {
    // Tracker categories
    categ.push(["nordic"]);
    categ.push(["scene"]);
    categ.push(["video"]);
    categ.push(["music"]);
    categ.push(["tv"]);
    categ.push(["game"]);
    categ.push(["public"]);
    //categ.push(["new"]);

	left.appendChild(maketable("nordic","Nordisk"));
    left.appendChild(maketable("scene","0-day"));
    right.appendChild(maketable("video","Filmer"));
    right.appendChild(maketable("music","Musikk"));
    right.appendChild(maketable("tv","Tv Serier"));
    right.appendChild(maketable("game","Spill"));
    right.appendChild(maketable("public","Public"));
    //left.appendChild(maketable("new","New Stuff"));
};

var searchstring = unescape(gup("tsearch")).replace(/\+/g," ");

main();

function maketable(id,text) {
    for (var i in categ) {
        if (categ[i][0] == id) var index = i;
    }
    var table = document.createElement("table");
    table.id = id;
    table.className = "search";
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.colspan = 2;

    var tracker = getsites(categ[index][0]);
    var config = GM_getValue(categ[index][0],defaultchecks(tracker.length)).split(",");
    var categon = true;
    for (var j in config) if (config[j] == "false") categon = false;

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = id;
    checkbox.checked = categon;
    checkbox.addEventListener("click",uncheckcat,true);
    var label = document.createElement("label");
    label.htmlFor = id;
    label.appendChild(document.createTextNode(text));
    th.appendChild(checkbox);
    th.appendChild(label);

    tr.appendChild(th);
    table.appendChild(tr);
    return table;
};

function add_global_style(css) {
    var head = document.getElementsByTagName('head')[0];
    if (!head) return;
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
};

function addcontent() {
    add_global_style('\
                body { color: #ffffff; font-family: Georgia; font-size: 14pt; background: url(http://www.berrypi.com/images/bg.png); } \
                div { color: #ffffff; } \
                .search { width: 100%; } \
                td { padding: 5px; } \
                a { text-decoration: none; color: #556A80; } \
                form { padding: 10px 5px 0 5px; } \
                label { margin-left: 10px; } \
                #maintable { width: 100%; height: 100%; } \
            ');
    var content = document.getElementsByTagName("body")[0];
    var oldcontent = content.textContent;
    content.innerHTML = "";
    var div = document.createElement("div");
    var form = document.createElement("form");
    form.method = "GET";
    var box = document.createElement("input");
    box.type = "text";
    box.name = "tsearch";
    box.id = "searchbox";
    pageargs(form);
    var submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Søk!";
    submit.id = "submit";
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "tdescrip";
    checkbox.id = "descrip";
    var label = document.createElement("label");
    label.htmlFor = "descrip";
    label.id = "descriplabel";
    label.textContent = "Søk også i beskrivelsen (ikke bare tittelen)";

    form.appendChild(box);
    form.appendChild(submit);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    form.appendChild(checkbox);
    form.appendChild(label);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    if (oldcontent.match(/Version: (\d+\.\d+)/)) {
    var version = document.createElement("div");
    var latestversion = RegExp.$1;
    var update = parseFloat(latestversion) - parseFloat(currentversion);
    if (update == 0) version.innerHTML = "Du bruker den nyeste versjonen <img src=\"http://www.berrypi.com/images/grin.gif\">";
    else if (update > 0) version.innerHTML = "Vennligst <a href=\"http://userscripts.org/scripts/source/40545.user.js\">oppdater</a> til den nyeste versjonen og oppdater siden.";
    else version.innerHTML = "Stop messing with my version numbers!";
    form.appendChild(version);
    }

    var legend = document.createElement("div");
    legend.appendChild(legendimg(YES,"Resultater funnet"));
    legend.appendChild(legendimg(NO,"Ingen resultater funnet"));
    legend.appendChild(legendimg(WAIT,"Holder på å søke"));
    legend.appendChild(legendimg(OFF,"Deaktivert tracker"));
    legend.appendChild(legendimg(LOGIN,"Login kreves"));

    div.appendChild(form);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    div.appendChild(legend);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));

    var mycroft = document.createElement("a");
    mycroft.href = "http://mycroft.mozdev.org/search-engines.html?name=private+tracker+metasearch";
    mycroft.innerHTML = "[s&oslash;kebar Plugin]";
    mycroft.target = "_blank";

    div.appendChild(mycroft);

    var maintable = document.createElement("table");
    maintable.id = "searchcontent";
    var tr = document.createElement("tr");
    tr.vAlign = "top";
    var td0 = document.createElement("td");
    td0.appendChild(div);
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var WIDTH = "38%";
    td1.style.width = WIDTH;
    td2.style.width = WIDTH;
    addcategories(td1,td2);
    tr.appendChild(td0);
    tr.appendChild(td1);
    tr.appendChild(td2);
    maintable.appendChild(tr);
    content.appendChild(maintable);
    checkdescrip = GM_getValue("descrip",false);
    var descrip = document.getElementById("descrip");
    descrip.addEventListener("click",savedescrip,true);
    descrip.checked = checkdescrip;
    if (searchstring != "") {
        document.getElementById("searchbox").value = searchstring;
    }
    for (var i in site) {
        var table = document.getElementById(site[i][5]);
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var input = document.createElement("input");
        input.type = "checkbox";
        input.name = site[i][0];
        input.checked = "true";
        input.addEventListener("click",savechecks,true);
        var label = document.createElement("label");
        label.htmlFor = site[i][0];
        label.appendChild(document.createTextNode(site[i][0]));
        td.appendChild(input);
        td.appendChild(label);
        tr.appendChild(td);
        td = document.createElement("td");
        td.style.width = "30px";
        td.style.textAlign = "center";
        var img = new Image();
        img.src = WAIT;
        td.appendChild(img);
        tr.appendChild(td);
        table.appendChild(tr);
    }
};

function search() {
    var table = Array.prototype.slice.call( document.getElementById("searchcontent").getElementsByTagName("table") );
    for (var i in categ) {
        var tracker = getsites(categ[i][0]);
        var row = Array.prototype.slice.call( table[i].getElementsByTagName("tr") );
        row.shift();
        categ[i][1] = GM_getValue(categ[i][0],defaultchecks(tracker.length)).split(",");
        if (tracker.length != categ[i][1].length) categ[i][1] = defaultchecks().split(",");
        for (var j in row) {
            if (categ[i][1][j] == "false") {
                row[j].getElementsByTagName("input")[0].checked = false;
                row[j].getElementsByTagName("img")[0].src = OFF;
            }
        }
        if (searchstring) {
            for (var j in row) {
                if (checked(row[j])) new Load(row[j],tracker[j][1],tracker[j][2],tracker[j][3],tracker[j][4]);
            }
        }
    }
};

function Load(row,url,s,alturl,redir) {
    var realurl;
    if (checkdescrip && (alturl != "")) realurl = alturl;
    else realurl = url;
    GM_xmlhttpRequest({
        method:"GET",
        url:realurl+searchstring,
        headers:{
        "User-Agent":navigator.userAgent,
        "Accept":"text/xml"
        },
        onload:function(response) {
            var img = row.getElementsByTagName("img")[0];
            var name = row.getElementsByTagName("label")[0];
            var link = document.createElement("a");
            if (response.finalUrl.match(/login.php/) || (redir != "" && response.responseText.match(redir))) {
                img.src=LOGIN;
                link.href = response.finalUrl;
            }
            else {
                if (!(response.responseText.match(s))) img.src=YES;
                else img.src=NO;
                link.href = realurl+searchstring;
            }
            //link.className = "option";
            //link.rel = "shadowbox";
            //link.title = name.innerHTML;
            link.target = "_blank";
            link.innerHTML = name.innerHTML;
            name.innerHTML = "";
            name.appendChild(link);
            //unsafeWindow.Shadowbox.setup();
        }
    });
};

function getsites(categ) {
    var sites = new Array();
    for (var i in site) {
        if (site[i][5] == categ) sites.push(site[i]);
    }
    return sites;
};

function gettracker(name) {
    for (var i in site) {
        if (name == site[i][0]) return site[i];
    }
};

function checked(row) {
    return row.getElementsByTagName("input")[0].checked;
};

function savechecks() {
    var thisrow = this.parentNode.parentNode;
    var tracker = gettracker(thisrow.getElementsByTagName("label")[0].textContent);
    var img = thisrow.getElementsByTagName("img")[0];
    if (this.checked) {
        img.src = WAIT;
        if (searchstring) new Load(thisrow,tracker[1],tracker[2],tracker[3],tracker[4]);
    }
    else {
        var label = thisrow.getElementsByTagName("label")[0];
        label.innerHTML = label.textContent;
        img.src = OFF;
    }
    var table = this.parentNode.parentNode.parentNode;
    var row = Array.prototype.slice.call( table.getElementsByTagName("tr") );
    row.shift();
    check = "";
    var allon = true;
    for (var i in row) {
        if (i < row.length-1) check = check+checked(row[i])+",";
        else check += checked(row[i]);
        if (checked(row[i]) == false) allon = false;
    }
    var categcheck = thisrow.parentNode.getElementsByTagName("input")[0];
    if (allon) categcheck.checked = true;
    else if (!allon) categcheck.checked = false;
    GM_setValue(table.id,check);
};

function uncheckcat() {
    var checks = Array.prototype.slice.call( this.parentNode.parentNode.parentNode.getElementsByTagName("input") );
    checks.shift();
    var categ = checks[0].parentNode.parentNode.parentNode.getElementsByTagName("input")[0].name;
    for (var i in checks) {
        var row = checks[i].parentNode.parentNode;
        var img = row.getElementsByTagName("img")[0];
        if (!this.checked) {
            checks[i].checked = false;
            img.src = OFF;
            var label = row.getElementsByTagName("label")[0];
            label.innerHTML = label.textContent;
            GM_setValue(categ,defaultchecks(checks.length).replace(/true/g,"false"));
        }
        else {
            if (!checks[i].checked) {
                checks[i].checked = true;
                img.src = WAIT;
                var tracker = gettracker(row.getElementsByTagName("label")[0].textContent);
                if (searchstring) new Load(row,tracker[1],tracker[2],tracker[3],tracker[4]);
            }
            GM_setValue(categ,defaultchecks(checks.length));
        }
    }
};

function defaultchecks(num) {
    var checks = "";
    for (var i=0;i<num;i++) {
        if (i < num-1) checks += "true,";
        else checks += "true";
    }
    return checks;
};

function savedescrip() {
    GM_setValue("descrip",document.getElementById("descrip").checked);
    search();
};

function gup(name) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null ) return "";
    else return results[1];
};

function pageargs(form) {
    var location = window.location.href.replace(window.location.search,"");
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i in vars) {
        var pair = vars[i].split("=");
        if (pair[0] != "tsearch" && pair[0] != "tdescrip" && pair[1] != undefined) {
            var arg = document.createElement("input");
            arg.type = "hidden";
            arg.name = pair[0];
            arg.value = pair[1];
            form.appendChild(arg);
        }
    }
};

function legendimg(image,label) {
    var imgdiv = document.createElement("div");
    var img = new Image();
    img.src = image;
    var text = document.createTextNode(" = "+label);
    imgdiv.appendChild(img);
    imgdiv.appendChild(text);
    return imgdiv;
};