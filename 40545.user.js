// ==UserScript==
// @name           Private Metasearch
// @author         sanguinepenguinx
// @version        1.995
// @namespace      http://what.cd
// @description    Searches multiple private trackers
// @include        file://*pmsearch.htm*
// ==/UserScript==

function main() {
    currentversion = "1.995";
    addcontent();
    search();
};

var site = new Array();

// Site name, Regular search URL, Phrase when no results returned, Description search URL, Text when not logged in, Category (music, general, video, other)

// Music trackers
site.push(["What.CD","https://what.cd/torrents.php?action=basic&searchstr=[query]","Your search did not match anything","","","music"]);
site.push(["Waffles","https://www.waffles.fm/browse.php?q=[query]",/0 results.*?for &ldquo;.+?&rdquo; in/,"","The page you tried to view can only be used when you're logged in.","music"]);
site.push(["BTMusic","http://btmusic.eu/torrents-search.php?search_pedrovia=[query]","No .torrents were found based on your search criteria.","","Site requires enabled COOKIES","music"]);
site.push(["LzTr","http://www.lztr.us/gazelle/torrents.php?action=basic&searchstr=[query]","No search results for that","","Melody is the essence of music","music"]);
site.push(["TranceTraffic","http://www.trancetraffic.com/browse.php?includeDead=on&search=[query]","Nothing here!","http://www.trancetraffic.com/browse.php?notitleonly=on&includeDead=on&search=[query]","","music"]);
site.push(["FileMP3","http://www.filemp3.org/browse.php?search_type=t_name&keywords=[query]","Nothing found!","http://www.filemp3.org/browse.php?search_type=t_description&keywords=[query]","","music"]);

// General trackers
site.push(["TL","http://www.torrentleech.org/torrents/browse/index/query/[query]","There are no results found","","","general"]);
site.push(["RevTT","https://www.revolutiontt.net/browse.php?cat=0&titleonly=1&search=[query]","Try again with a refined search string","https://www.revolutiontt.net/browse.php?cat=0&search=[query]","","general"]);
site.push(["Demonoid","http://www.demonoid.com/files/?query=[query]","No torrents found","","","general"]);
site.push(["The Pirate Bay","https://thepiratebay.se/search/[query]","Try adding an asterisk","","","general"]);
site.push(["ScrapeTorrent","http://scrapetorrent.com/Search/index.php?sort=seed&search=[query]","Didn't find a damn thing","","","general"]);
site.push(["SCC","http://www.sceneaccess.org/browse.php?search=[query]","Try again with a refined search string","","","general"]);

// Movie and HD trackers
site.push(["x264","http://x264.me/browse.php?incldead=0&stype=0&search=[query]","Nothing found!","","","video"]);
site.push(["PtP","https://tls.passthepopcorn.me/torrents.php?searchstr=[query]","Your search did not match anything.","","","video"]);
site.push(["HDBits","http://hdbits.org/browse.php?search=[query]","Nothing found!","","","video"]);
site.push(["Goem","http://goem.org/browse.php?s_type=1&search=[query]","Nothing found!","http://goem.org/browse.php?search=[query]","","video"]);
site.push(["Karagarga","https://karagarga.net/browse.php?search=[query]","Nothing found!","","","video"]);
site.push(["TehConnection","https://tehconnection.eu/torrents.php?searchstr=[query]","No Search Results, try reducing your search options.","","","video"]);
site.push(["Cinemageddon","http://cinemageddon.org/browse.php?cat=0&proj=0&search=[query]","Try again with a refined search string","","","video"]);

// TV
site.push(["BitMeTV","http://www.bitmetv.org/browse.php?search=[query]","Nothing found!","","","video"]);
site.push(["TheBox","http://thebox.bz/browse.php?titleonly=1&search=[query]","Nothing found!","http://thebox.bz/browse.php?search=[query]","404 - Not Found","video"]);

// Music Videos
site.push(["MusicVids","http://www.music-vid.com/browse.php?searchtype=1&search=[query]","Nothing found!","http://www.music-vid.com/browse.php?searchtype=2&search=[query]","","video"]);

// Game trackers
site.push(["BCG","http://www.blackcats-games.net/browse.php?search=[query]","Try again with a refined search string","","Lorem ipsum dolor sit amet","other"]);
site.push(["bitGAMER","https://www.bitgamer.su/browse.php?incldead=0&searchtitle=1&search=[query]","Nothing found!","https://www.bitgamer.su/browse.php?incldead=0&search=[query]","","other"]);

// Usenet Indexers
site.push(["Newzbin (Usenet indexer)","http://v3.newzbin.com/search/query/?fpn=p&searchaction=Go&q=[query]","No results could be found!","http://v3.newzbin.com/search/query/?fpn=f&searchaction=Go&q=[query]","Newzbin is a member-only site","other"]);
//end trackers

var categ = new Array();

function addcategories(left,right) {
    // Tracker categories
    categ.push(["music"]);
    categ.push(["general"]);
    categ.push(["video"]);
    categ.push(["other"]);
    //categ.push(["new"]);

    left.appendChild(maketable("music","Music"));
    left.appendChild(maketable("general","General"));
    right.appendChild(maketable("video","Movies and TV"));
    right.appendChild(maketable("other","Other"));
    //left.appendChild(maketable("new","New Stuff"));
};

// STOP EDITING

YES = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%14%08%06%00%00%00%8D%89%1D%0D%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%01%14IDATx%DA%AC%D4%3FKBQ%18%C7%F1sOn%25%09-na%83%0EA%BE%93%C2%06%0D!%F0%0F%08%0E-%BD%80%A6h%CF9qR0%04%11%97%DEG%8D%E2%92%90%22%0A%89C%83P%DF%07%CE%059%5C%C4%EE%3D%3F%F8%20%1C%BC%3F.%E7%F2%3C%9Ez%3BU%019%C2%25r%B8%C0%09%3C%2C%F1%81%01%FA%F8%B6%1F%F4%02%0A%8Bx%40F%ED%CE%18Ohn%1Fj%EBO%0D%B4%F7(%93%9C%E1%C5%88%F9%871%AB%ECN%FD%3FU%1C%A0%BC%FD%867!%CB%FC%94P%F3%EF%F0%90%DFw%A4T%B4Lq%AE%CD%D7%8CZ%26I%A2%20%85y%E5.%D7R%98uX%98%96%C2%84%C3%C2%B8V%8E%A3%83%C6'B%D6%DA%CC%A6%AB%8C%A5%B0%E7%B0%B0%AF%CD%D6%988(%5B%A0%23%85%2B%B3%5D%A2%E6%11s%FF%2B%B7%8C%B0%91k%7B%B6%D7W-d%E9%2Bn%F1k%17nPA%1D%9F%7B%14%7D%E1%5E%E6%17%3F%BB6%B62%2B_f%FCJ%C6%09%C7%E6%5C%EE%7B%84!%BA%98%D9%0F%FE%090%00%FD%FC0i%84%BC%F51%00%00%00%00IEND%AEB%60%82";
NO = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%14%08%06%00%00%00%8D%89%1D%0D%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%01%13IDATx%DAb%FC%AF%C0%80%0D%B0%03%B1%0F%10%07%02%B1%01%10%8B%021%23%10%BF%06%E2%CB%40%BC%01%887%01%F17t%8D%8CX%0C%04%19%D2%00%C4z%0C%F8%C1%0D%20n%06%E2e%C8%82Lh%8A%3A%80x%1D%11%86%81%80%06%10%2F%05%E2%C9P%D7c%18%082%AC%9C%81t%90%03%C4S%D0%BD%EC%07%C4%1B%19(%03%B1%40%BC%04d%20(%02.%40%BD%40%09x%04%C4%3A%20%2F%7BQ%C10%10%90%03%E2%60%90%81a%0C%D4%03%A1L%D0tF-%A0%0E2P%84%8A%06%F231P%170%82%0C%7CGE%03%3F%82%0C%BCDE%03o%83%0C%5CCE%03%D7%81%126%17%D4%95%CA%14%1A%F6%1C%88%B5%98%A0EP5%15%5CW%0F%C4%1F%60%B1%BC%129%83%93%01%16%02%F1l%F4%D2%26%0F%88%A7%92a%D8%02%20N%C1V%7C%FD%87%16E%F1%40%7C%87%08%83%1E%02q%06%10'%02%F1%1F%7C%256%08%F0%812%3A%B4%F4V%07bA%A8%F8%07P%D2%80%16%FF%AB%B1%A5a%80%00%03%00%A2%E72Y%3D%1Dnu%00%00%00%00IEND%AEB%60%82";
WAIT = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%14%08%06%00%00%00%8D%89%1D%0D%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%01%12IDATx%DAb%3C%BF%9E%01%1B%E0%01b%3F%20%0E%04b%3D%20%16%06bF%20~%07%C4W%80x%23%10%83t~D%D7%C8%88%C5%C0(%20%AE%03bu%06%FC%E0%1E%10%B7%01%F1%5CdA%264E%93%80x)%11%86%81%80%12%10%CF%81b%16%98%20%0B%9Aa%B9%0C%A4%83d%20f%06%E2Dd%17F%90i%18%0C%24%00q%1A%CC%40nhXP%0A%1A%81X%88%09%1A%9B%8AT0P%02%88%C3A%06%861P%0F%04%81%0C%D4%A7%A2%81j%20%03%05%A8h%20%2F%13%03%95%01%13%B6%ECC%01%F8%C2%04%CD%9B%D4%02%F7%40%06%AE%A1%A2%81%EB%99%A0%A5%C6%13*%18%F6%16%88%97%81%0C%FC%04-%5D(%05-%40%FC%1A%16%CB%F3%A1%98%5C%00%0A%B6%89%E8%C5W%1A%99%86%AE%02%E2X%20%FE%8Fn%E0%1F%20N%02%E2L%20~L%84A%CF%81%B8%08%94%7F%81%F8%07%B6%F2%10%06f%00%F1jh%1E%F7%07e'%20%E6%87%CA%81%C2%FB%0E%10o%06%E2%95%40%FC%12%5D3%40%80%01%00%D9%AF0O%DC*%08%EB%00%00%00%00IEND%AEB%60%82";
OFF = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%14%08%06%00%00%00%8D%89%1D%0D%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%01%17IDATx%DA%AC%D41KBQ%18%C6%F1%EB%C9%CD%A4%D0%C5%D5%88%DA%EA%9B%949T%04A%1A%08%0E-%ED%05A%B8%E7%D4%904%25h%81DM~%80%3EAc%B4%18DH%81%E2%D0%10%E4%FF%85%F7%82%1CNb%F7%9E%07~%D3%BD%E7%E1p%0E%EFIt%9F%1E%03G%E6%B1%81-%AC!%8B%04%BE%F0%8C%7Bt0%B0%17%26%1De%7B8%C5%AA%E3%5B%06%CB(%E0%0454%26%7F0%D6%82%3An%FE(%B3%B3%84%2B%95t%EDP%CA%8E%82%FF%E7%10s(M%EEp7bY%98%03T%C2%C2%94%9EE%DC%9C%C9%19%1B%BD%CD%BC%87%C2%1Cv%A4p%3B%F0%97%A2%14%AE%7B%2C%5C%91%C2E%8F%85i%13x%8Eq%8DO%8C%8C%8C%CE%A6%AF%BCJ%E1%9D%C7%C2%8E%D1W%E3%CDC%D9'%9AR8%D4%D7%25n%CE%D1%0Fo%F9ZE%8D%1C%DB%85%FD%7CU%22%96%B6%B1%8F_%BB%F0%07eT%D1%9B%A1%E8%1D%C72%BF%F8%9E%F6b_%E2Vg%7CS%C6%09%0B%FAM%CE%FB%05%0Fh%E1%C3%5E%3C%16%60%00K%BC%2F%AF%5D%EC%18%11%00%00%00%00IEND%AEB%60%82";
LOGIN = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%14%08%06%00%00%00%8D%89%1D%0D%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%01%13IDATx%DA%AC%D4AK%02A%18%C6%F1%D9%D1%5B%8AB%20%5E%F5%60%87%C0%BE%89R%07%15!%C8%82%85%0E%5E%FA%00%9E%C4%7B%9D%8BN%09%86%20%E2G%A9cx1%B0%90%02%C3%83%07%A1%FE%2F%CC%82%0C%8B%D8%EE%3C%F0ca%D8yXfy%C7S%B9%91%0AI%0A%15%9C%A2%8CCx%F8%C6%2B%C6%90%8DK%7B%A3%17R%D8D%07Gjw%A6%E8%E1a%7BQ%5B%2F%DD%E1i%8F2I%11%F7F2XLZem%F5%FF%5C!%81%D6%F6%176%22%96%05%B9%80%1F%9C%E1%01%CF%17%14T%BC%7C%E0X%9B%BF%19%B7L%92G%5D%0Ak%CA%5D%CE%A4%F0%C4aaI%0A%B3%0E%0B%D3Z9%8E%0E%1B%9F%18Yi3%9B%AE2%95%C2%A1%C3%C2%916%B7%C6%BB%83%B2%2F%F4%A5%F0%C7%DC.q%D3%C5%22%F8%CB%8FF%D4%C8%B1%DD%DA%D7%97%1F%B1%F4%19%E7%F8%B5%0B7%B8%C45f%7B%14%CDq%23%F3%8B%F5%AE%1B%5B%99%2B_f%BC*%E3%84%8CY%97%F3~%C3%04%03%7C%DA%1B%FF%04%18%00%C2%FF0!%3A~%90%D7%00%00%00%00IEND%AEB%60%82"

var searchstring = decodeURIComponent(gup("tsearch"));

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
                body { color: #ffffff; font-family: Georgia; font-size: 14pt; background-color: #222; } \
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
    submit.value = "Search!";
    submit.id = "submit";
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "tdescrip";
    checkbox.id = "descrip";
    var label = document.createElement("label");
    label.htmlFor = "descrip";
    label.id = "descriplabel";
    label.textContent = "Search descriptions (not just the title)";

    form.appendChild(box);
    form.appendChild(submit);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    form.appendChild(checkbox);
    form.appendChild(label);

    var legend = document.createElement("div");
    legend.appendChild(legendimg(YES,"Results found"));
    legend.appendChild(legendimg(NO,"No results found"));
    legend.appendChild(legendimg(WAIT,"Search in progress"));
    legend.appendChild(legendimg(OFF,"Disabled tracker"));
    legend.appendChild(legendimg(LOGIN,"Login required"));

    div.appendChild(form);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    div.appendChild(legend);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));

    var mycroft = document.createElement("a");
    mycroft.href = "http://mycroft.mozdev.org/search-engines.html?name=private+tracker+metasearch";
    mycroft.innerHTML = "[Searchbar Plugin]";
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
    realurl = realurl.replace("[query]",searchstring);
    GM_xmlhttpRequest({
        method:"GET",
        url:realurl,
        headers:{
        "User-Agent":navigator.userAgent,
        "Accept":"text/xml"
        },
        onload:function(response) {
            var img = row.getElementsByTagName("img")[0];
            var name = row.getElementsByTagName("label")[0];
            var link = document.createElement("a");
            var ratio = document.createElement("span");
            if (response.finalUrl.match(/login.php/) || (redir != "" && response.responseText.match(redir))) {
                img.src=LOGIN;
                link.href = response.finalUrl;
            }
            else {
                if (!(response.responseText.match(s))) img.src=YES;
                else img.src=NO;
                link.href = realurl;
            }
            link.target = "_blank";
            link.innerHTML = name.innerHTML;
            name.innerHTML = "";
            name.appendChild(link);
            if (response.responseText.match(/\bratio\b[\s\S]*?(\d+\.\d+)/i)) ratio.textContent = " ( " + RegExp.$1 + " ) ";
            name.appendChild(ratio);
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