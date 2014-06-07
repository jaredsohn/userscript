// ==UserScript== 
// @name        LoL Skin Installer Integration +LGG +LC
// @author      LGG
// @namespace   LoLSIULGGLC
// @icon        http://img856.imageshack.us/img856/7456/unled2lq.jpg
// @description Re-works links in League craft to auto work with SIU+LGG
// @version     0.3 (20 August 2011)
// @license     GPL 2.0 
// @include     http://leaguecraft.com/skins/*
// @include		http://leaguecraft.com/uimods/*
// @exclude     http://leaguecraft.com/skins/download/*
// ==/UserScript==
var debug = 3;
var wait = 200;

if (debug > 2) {
    my_debug_div = document.createElement('div');
    my_debug_div.innerHTML = '<div style="height: 200px; width: 500px; ' +
	     'background-color: #330000; z-index: 100; position: fixed;' +
	     'padding: 5px; ' +
	     'right: 10px; bottom: 10px;" id="my_debug_div">' +
	     '<p><a id="close_log">Close</a></p>' +
	     '<textarea style="width: 490px; height: 150px; font-size:75%;" id="lgg_log" readonly>' +
	     '</textarea>' +
	     '</div>';

    document.body.insertBefore(my_debug_div, document.body.firstChild);
    document.getElementById('close_log').addEventListener("click", toggle_lgg_log, true);
}

if (debug > 0) lgg_log('Current Location: ' + document.location);
setTimeout(init, wait);
function init() {
    //var html_tag = evaluate_xpath('.//html'); 
    lgg_log("page loaded");

    var downloadLinks = evaluate_xpath('.//a[ @href[contains(.,"skins/download")] and @style[contains(.,"")]]');
    var i = 0;
    if (downloadLinks.snapshotLength < 1) return;
    var downloadLink = downloadLinks.snapshotItem(i);
    var downloadURL = downloadLink.getAttribute("href")
    var linksToReplace = evaluate_xpath('.//a[ @href[contains(.,"http://forum.leaguecraft.com/showthread.php?tid=1814")] and @style[contains(.,"")]]');
    var linkToReplace = linksToReplace.snapshotItem(i);
    //        <img src="uploads/MMKH/skins/924.jpg" class="example_image" />
    var imageBoxs = evaluate_xpath('.//div[ @id[contains(.,"skinImageBox")]]');
    var imageBox = imageBoxs.snapshotItem(i);
    //x:html/x:body/x:div[2]/x:table/x:tbody/x:tr[4]/x:td[1]/x:div[1]/x:div/x:table/x:tbody/x:tr/x:td/x:table/x:tbody/x:tr[2]/x:td

    var add = 2;
    if (debug > 2) add = 3;
    //x:html/x:body/x:div[2]/x:table/x:tbody/x:tr[4]/x:td[1]/x:div[2]/x:div
	///x:html/x:body/x:div[3]/x:table/x:tbody/x:tr[5]/x:td[1]/x:div/x:div/x:p
    var infoBoxs = evaluate_xpath('.//body/div[' + add + ']/table/tbody/tr[5]/td[1]/div/div/p');

    var SIURL = "skininstallerultimatelgg://";

    //-----------URL------------
    //http://leaguecraft.com/download/skin/924
    //http://leaguecraft.com/skins/download/924-ancient-guardian-nasus-by-mmkh
    var skinNumber = downloadURL.substring(downloadURL.lastIndexOf("/") + 1, downloadURL.indexOf("-"));
    var directURL = 'http://leaguecraft.com/download/skin/' + skinNumber;
    if (debug > 0) lgg_log("URL is " + directURL);
    SIURL += '[param]url[value]' + directURL;
    //----------NAME-----------
    //<title>Ancient Guardian Nasus (by MMKH) by MMKH :: Nasus, the Curator of the Sands :: Custom Skin :: Leaguecraft</title>
    var end = document.title.indexOf("::");
    if (end == -1) end = document.title.indexOf("|");
    var title = document.title.substring(0, end);
    //remove stuff in parens
    title = title.replace(/\(.*\)/, '').replace(/\[.*\]/, '').replace(/\{.*\}/, '');
    var name = title.substring(0, title.lastIndexOf(" by")).replace(/^\s+|\s+$/g, '');
    if (debug > 0) lgg_log("Name is " + name);
    SIURL += '[param]name[value]' + name;
    //-------------AUTHOR-----
    var author = title.substring(title.lastIndexOf(" by") + 3).replace(/^\s+|\s+$/g, '');
    if (debug > 0) lgg_log("Author is " + author);
    SIURL += '[param]author[value]' + author;
    //------------IMAGE PREVIEW------------
	var imgs =imageBox.getElementsByTagName("img");
    var imageURL = 'http://leaguecraft.com/' + imgs[0].src;
    if (debug > 0) lgg_log("Image is " + imageURL);
    SIURL += '[param]preview[value]' + imageURL;
    //------------INFO----------
    if (infoBoxs.snapshotLength > 0) {
        var infoBox = infoBoxs.snapshotItem(i);

        var theInfo = infoBox.innerHTML.substring(infoBox.innerHTML.indexOf("</div-->") + 8).replace(/<br>/g, "[New Line]").replace(/:/g, "[Colon]").replace(/"/g, "'").replace(/^\s+|\s+$/g, '');
        if (debug > 3) lgg_log("Info is " + theInfo);
        SIURL += '[param]info[value]' + theInfo;
    }


    //----------LINK MAKE------
    var my_link = document.createElement('a');
    my_link.innerHTML = '<a href="' + SIURL + '" style="color: rgb(255,255,200); text-decoration: none;">' +
              '<div id="5a4b1e24ab14c7a56d2abde5febf69ac" class="clickable rounded_10px action_button" style="font-size: 17px;">' +
              '    Install With SIU               </div>' +
          ' </a>';

    linkToReplace.parentNode.insertBefore(my_link, linkToReplace);

    //document.body.insertBefore(my_link, document.body.firstChild);

    linkToReplace.innerHTML = '<a href="' + SIURL + '" style="color: rgb(255,255,200); text-decoration: none;">' +

          ' </a>';
    //linkToReplace.innerHTML = '<a id="siuLink"; style="color:#000000"; href="'+downloadURL+'">GET @ @</a>';



}

function toggle_lgg_log() {
    var lgg_log = document.getElementById('my_debug_div');
    if (lgg_log.style.display != "none") {
        lgg_log.style.display = "none";
    } else {
        lgg_log.style.display = "block";
    }
}
function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}
function removeByElement(arrayName, arrayElement) {
    for (var i = 0; i < arrayName.length; i++) {
        if (arrayName[i] == arrayElement)
            arrayName.splice(i, 1);
    }
}
function evaluate_xpath(xpath_query) {
    if (debug >= 2) lgg_log(xpath_query);
    var nodes = document.evaluate(xpath_query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (debug >= 1) lgg_log('nodes returned: ' + nodes.snapshotLength);

    return nodes;
}

function lgg_log(log_string) {
    if (debug > 2) {
        var logspace = document.getElementById('lgg_log');
        logspace.value += log_string + "\n";
        logspace.scrollTop = logspace.scrollHeight;
    }

    GM_log(log_string);
}

function lgg_log_return(return_value) {
    if (return_value > 0) {
        lgg_log("Log successfully submitted. Bytes transferred: " + return_value);
    } else {
        lgg_log("Log could not be submitted.  Returned: " + return_value);
    }
}
