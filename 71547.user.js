// ==UserScript==
// @name			Rlslog Release Formatter
// @namespace		http://google.co.uk/myuserscripts
// @include			http://www.rlslog.net/*
// @exclude			http://www.rlslog.net/
// @exclude			http://www.rlslog.net/page/*
// @exclude			http://www.rlslog.net/?s=*
// @exclude			http://www.rlslog.net/category/*
// ==/UserScript==

// created by mjr_havoc
// version 0.61

var knownSpammers = ""; // people known to post bad sh!t
// hosters by category (default list - can be changes via Options UI)
var myHosts = '[' +
	'{"hosts" : "megaupload.com, netload.in, fileserve.com","hostsClassName" : "Fastest_Hosts","textColor" : "#74DF00","textSize" : "12px","textHeight" : "12px"},' +
	'{"hosts" : "filefactory.com, easy-share.com, duckload.net, quickupload.net, mediafire.com, zshare.net","hostsClassName" : "Medium_Hosts","textColor" : "#D7DF01","textSize" : "10px","textHeight" : "10px"},' +
	'{"hosts" : "gigasize.com, 2shared.com, megashares.com, gotupload.com, sharingmatrix.com, depositfiles.com","hostsClassName" : "Slow_Hosts","textColor" : "#DF7401","textSize" : "10px","textHeight" : "10px"},' +
	'{"hosts" : "hotfile.com","hostsClassName" : "Last-resort_Hosts","textColor" : "#DF0101","textSize" : "9px","textHeight" : "9px"}' +
	']';

myHosts = GM_getValue("myHosts", myHosts); // if set, get the user's list of hosts, otherwise use the default list above
myHosts = JSON.parse(myHosts);


// ################################################################################################################################
// START SCRIPT (Do not modify below if you don't know what you are doing)
// ################################################################################################################################

function xpath(query, elem){
    return document.evaluate(query, elem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

String.prototype.trim = function(){
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

// retrieve our options
var enableFormatting = GM_getValue("enableFormatting", true);
var hideCommentInfo = GM_getValue("hideCommentInfo", true);
var hideCommentName = GM_getValue("hideCommentName", false);
var hideCommentsWithNoLinks = GM_getValue("hideCommentsWithNoLinks", true);
var showFakeAlerts = GM_getValue("showFakeAlerts", true);
var showPasswordComments = GM_getValue("showPasswordComments", false);
var reloadPageAfterSave = GM_getValue("reloadPageAfterSave", true);

function formatPage(){ // function used to format comments on page
    var wrap = document.getElementById('wrap');
    if (wrap) { // check document has loaded properly
        var pageNumbersDiv = xpath("div[@class='comment-page-numbers']", document.getElementById('commentblock'));
        
        // Format page
        var scriptStyle = "" + 
			(enableFormatting ? "div#wrap {width: 90%; min-width: 1000px; background-image: none;} div#content {width: 80%;}" +
	        "#sidebar {padding: 0px;} div.entry, #nextlinks, #commentblock {padding: 5px;}" +
	        "#commentlist {line-height: normal;} #commentlist li p {line-height:normal; margin-bottom: 0px;}" +
	        (hideCommentName ? ".commentname {display: none;}" : "") +
	        (hideCommentInfo ? ".commentinfo {display: none;}" : "") +
	        (hideCommentName && hideCommentInfo ? ".commenttext {border-top: none;}" : "") +
	        ".commenttext {max-height: none; margin-bottom: 0px;}" : "") +
	        "div#optionsDiv {z-index: 1; clear:both; margin: 0px 0px 1px 1px; padding: 10px 18px; background-color: #000; border: solid 1px #FFF; color: #FFF; position: fixed; bottom: 0px;  -moz-border-radius: 8px;font-size:12px; left: 0px;}" +
	        "div#optionsDiv span:hover {color: #f00; cursor:default;}" +
	        "div#optionsDivOptions {border: solid 1px #FFF; padding: 5px; margin-bottom: 10px;}" +
	        "div#optionsDivOptions {display: none;}" +
	        "div#hostsDiv {height: 100%; width: 100%; position: fixed; opacity: 0.9; display: none; background-color: black; top: 0px; z-index: 2;}" +
	        "div#hostsDivOptions {-moz-border-radius: 10px; position: fixed; height: 80%; width: 80%; left: 10%; top: 10%; border: solid 1px white; padding: 10px 13px; color: white;}" +
	        "div#hostsDivBtnClose {-moz-border-radius: 15px; padding: 1px 8px; color: black; background-color: white; position: fixed; right: 5%; top: 5%;}" +
	        "div#hostsDivBtnClose:hover {cursor: default; font-weight: bold; background-color: red; padding: 1px 8px;}" +
	        "div#hostsDivOptions ol {display: inline;} div#hostsDivOptions ol li {display: table-row; margin: 5px 0;} div#hostsDivOptions ol li span, div#hostsDivOptions ol li select, div#hostsDivOptions ol li input {display: table-cell;}" +
	        "select#hostsDivHostsList {vertical-align: top; min-width: 178px; margin: 5px 0;} select#hostsDivSelectHostCategory {min-width: 178px;}" +
	        "li#hostsDivStep2_1, li#hostsDivStep2_2, li#hostsDivStep2_3, li#hostsDivStep2_4 {visibility: hidden;}" +
	        "input#hostsDivSaveChanges {margin-top: 10px;} input#hostsDivTextColor {margin-bottom: 5px;}";
        
        for (var i = 0; i < myHosts.length; i++) 
            scriptStyle += " ." + myHosts[i].hostsClassName + " {color: " + myHosts[i].textColor + "; font-size: " + myHosts[i].textSize + ";}";
        GM_addStyle(scriptStyle);
        
        var xmlSerializer = new XMLSerializer();
        
        var docNodes = xpath("li", document.getElementById('commentlist'));
        for (var i = 0; i < docNodes.snapshotLength; i++) { // loop thru each comment
            var docNode = docNodes.snapshotItem(i);
            var commentName = docNode.childNodes[1].childNodes[1].innerHTML.substring(7, docNode.childNodes[1].childNodes[1].innerHTML.indexOf("      ", 7));
            var commentByKnownSpammer = (knownSpammers.indexOf(commentName) != -1);
            var commentHasLinks = (docNode.childNodes[5].getElementsByTagName('a').length > 0);
            var commentHasFakeAlert = showFakeAlerts && docNode.childNodes[5].innerHTML.match(/fake/gi);
            var commentHasNoPass = docNode.childNodes[5].innerHTML.match(/no pass/gi);
            var commentHasPass = docNode.childNodes[5].innerHTML.match(/pass/gi);
            
            if (!commentHasLinks || commentByKnownSpammer) { // if no links in comment, or commenter is a known spammer, hide it!
                if (!hideCommentsWithNoLinks ||
                (hideCommentsWithNoLinks &&
                ((commentHasFakeAlert && showFakeAlerts) ||
                (commentHasPass && !commentHasNoPass && showPasswordComments)))) {
                    continue;
                }
                else {
                    docNode.style.display = "none";
                }
            }
            else {
                // Hide comment name/timestamp if requested
                docNode.childNodes[5].innerHTML = docNode.childNodes[5].innerHTML.replace(/\<br\>/gi, ""); // remove unnecessary line breaks in comment
                var commentOutput = "";
                var anchors = xpath("descendant::a", docNode.childNodes[5]);
                var hiddenAnchors = 0;
                for (var j = 0; j < anchors.snapshotLength; j++) { // loop thru each anchor in the comment
                    var anchor = anchors.snapshotItem(j);
                    var hostFound = false;
                    for (var x = 0; x < myHosts.length; x++) { // loop thru each list of hosts
                        var myHostsArray = myHosts[x].hosts.split(', '); // split current list of hosts into array
                        for (var y = 0; y < myHostsArray.length; y++) { // loop thru current list of hosts
                            if (anchor.href.indexOf(myHostsArray[y]) != -1) {
                                anchor.className = myHosts[x].hostsClassName;
                                if (!commentHasNoPass && commentHasPass && showPasswordComments) {
                                    var newElem = document.createElement('br');
                                    anchor.parentNode.insertBefore(newElem, anchor);
                                }
                                hostFound = true;
                                commentOutput += xmlSerializer.serializeToString(anchor) + "<br>";
                                break;
                            }
                        }
                        if (hostFound) 
                            break;
                    }
                    if (!hostFound) { // the link is not to a host we want
                        if (!commentHasNoPass && commentHasPass && showPasswordComments) { // comment contains a password and user chose to display comments with password(s)
                            anchor.style.color = "gray";
                            anchor.style.fontSize = "5px";
                            anchor.style.lineHeight = "5px";
                        }
                        else { // hide the link
                            anchor.style.display = "none";
                            hiddenAnchors++;
                        }
                    }
                }
                if (hiddenAnchors == anchors.snapshotLength) { // if all the links in the current comment are hidden, hide the comment!
                    docNode.style.display = "none";
                }
                else 
                    if (!(!commentHasNoPass && commentHasPass && showPasswordComments)) { // output links to comment box in cleaned format
                        docNode.childNodes[5].innerHTML = commentOutput + (commentHasNoPass ? '<p>No Password' : '');
                    }
            }
        }
    }
}

formatPage();


// CODE FOR OPTIONS UI
var optionsDiv = document.createElement("div");
optionsDiv.id = "optionsDiv";
var optionsDivInnerHTML = '<div><span id="optionsDivToggler">+</span><br><div id="optionsDivOptions">' +
	'<input type="checkbox" id="enableFormatting" ' + (enableFormatting ? 'checked ' : "") + '/> Enable Formatting<br>' +
	'<input type="checkbox" id="hideCommentInfo" ' + (hideCommentInfo ? 'checked ' : "") + '/> Hide Comment Timestamp<br>' +
	'<input type="checkbox" id="hideCommentName" ' + (hideCommentName ? 'checked ' : "") + '/> Hide Commenter\'s Name<br>' +
	'<input type="checkbox" id="hideCommentsWithNoLinks" ' + (hideCommentsWithNoLinks ? 'checked ' : "") + '/> Hide Comments With No Valid Links<br>' +
	'<input type="checkbox" id="showFakeAlerts" ' + (showFakeAlerts ? 'checked ' : "") + '/> Show Fake Post Alerts<br>' +
	'<input type="checkbox" id="showPasswordComments" ' + (showPasswordComments ? 'checked ' : "") + '/> Show Comments Containing Passwords<br>' +
	'<input type="checkbox" id="reloadPageAfterSave" ' + (reloadPageAfterSave ? 'checked ' : "") + '/> Reload page after clicking "Save"<br>' +
	'<br><input type="button" value="Save" id="optionsDivBtnOK" />&nbsp;' +
	'<input type="button" value="Defaults" id="optionsDivBtnDefaults" />&nbsp;' +
	'<input type="button" value="Edit Hosts..." id="optionsDivBtnEditHosts" /></div></div>';
optionsDiv.innerHTML = optionsDivInnerHTML;
document.body.insertBefore(optionsDiv, document.body.firstChild);

var hostsDiv = document.createElement("div");
hostsDiv.id = "hostsDiv";
var hostsDivInnerHTML = '<div><div id="hostsDivBtnClose">X</div><div id="hostsDivOptions">' +
	'<ol id="directions"><li><span>Select your host list:</span><select id="hostsDivSelectHostCategory"><option>Select a Host Category</option>';
for (var i = 0; i < myHosts.length; i++) {
    hostsDivInnerHTML += '<option value="' + myHosts[i].hostsClassName + '">' + myHosts[i].hostsClassName.replace("_", " ") + '</option>';
}
hostsDivInnerHTML += '</select></li>' +
	'<li id="hostsDivStep2_1"><span>List of Hosts:</span><select size="10" id="hostsDivHostsList"></select></li>' +
	'<li id="hostsDivStep2_2"><span>Select hosts display color:</span><input id="hostsDivTextColor" type="text" class="jscolor" size="6" />' +
	'<input type="button" onclick="document.getElementById(\'hostsDivTextColor\').style.fontSize = (parseInt(document.getElementById(\'hostsDivTextColor\').style.fontSize)-1) + \'px\'" value="Dec. Size" style="font-size:12px" />' +
	'<input type="button" onclick="document.getElementById(\'hostsDivTextColor\').style.fontSize = (parseInt(document.getElementById(\'hostsDivTextColor\').style.fontSize)+1) + \'px\'" value="Inc. Size" style="font-size:12px" /></li>' +
	'<li id="hostsDivStep2_3"><span></span><input type="button" value="Add Host(s)" id="hostsDivAddHost" />' +
	'<input type="button" value="Remove Host" id="hostsDivRemoveHost" /></li>' +
	'<li id="hostsDivStep2_4"><span></span><input type="button" value="Save Changes" id="hostsDivSaveChanges" /></li>' +
	'</ol></div></div>';
hostsDiv.innerHTML = hostsDivInnerHTML;
document.body.insertBefore(hostsDiv, document.body.firstChild);


// Register elements' events
var elem3 = document.getElementById('optionsDivToggler');
var elem4 = document.getElementById('optionsDiv');
var elem5 = document.getElementById('optionsDivOptions');
var elem6 = document.getElementById('optionsDivBtnEditHosts');

var elem7 = document.getElementById('hostsDiv');
var elem8 = document.getElementById('hostsDivBtnClose');

document.getElementById('optionsDivBtnOK').addEventListener('click', function(){
	GM_setValue("enableFormatting", document.getElementById("enableFormatting").checked);
    GM_setValue("hideCommentInfo", document.getElementById("hideCommentInfo").checked);
    GM_setValue("hideCommentName", document.getElementById("hideCommentName").checked);
    GM_setValue("hideCommentsWithNoLinks", document.getElementById("hideCommentsWithNoLinks").checked);
    GM_setValue("showFakeAlerts", document.getElementById("showFakeAlerts").checked);
    GM_setValue("showPasswordComments", document.getElementById("showPasswordComments").checked);
    GM_setValue("reloadPageAfterSave", document.getElementById("reloadPageAfterSave").checked);
    if (reloadPageAfterSave) location.reload(true);
}, true);

document.getElementById('optionsDivBtnDefaults').addEventListener('click', function(){
    GM_setValue("hideCommentInfo", true);
    GM_setValue("hideCommentName", false);
    GM_setValue("hideCommentsWithNoLinks", true);
    GM_setValue("showFakeAlerts", true);
    GM_setValue("showPasswordComments", false);
    GM_setValue("reloadPageAfterSave", true);
    if (reloadPageAfterSave) location.reload(true);
}, true);

elem4.addEventListener('mouseover', function(){
    elem3.innerHTML = "&mdash;";
    elem4.style.opacity = "0.9";
    elem5.style.display = "block";
}, false);

elem4.addEventListener('mouseout', function(){
    elem3.innerHTML = "+";
    elem4.style.opacity = "1";
    elem5.style.display = "none";
}, false);

elem6.addEventListener('click', function(){
    elem3.innerHTML = "+";
    elem4.style.opacity = "1";
    elem5.style.display = "none";
    elem7.style.display = "block";
}, true);

elem8.addEventListener('click', function(){
    elem7.style.display = "none";
}, true);


function getCurrentHostList() {
	var selIdx;
    var selectedCategory = document.getElementById('hostsDivSelectHostCategory').value;
    for (var i = 0; i < myHosts.length; i++) {
        if (myHosts[i].hostsClassName == selectedCategory) {
            selIdx = i;
            break;
        }
    }
	return selIdx;
}


function loadHostsList(){
    var selIdx = getCurrentHostList();
    myPicker.fromString(myHosts[selIdx].textColor.substr(1,6))
    var hostsList = document.getElementById('hostsDivHostsList');
    var hostsArray = myHosts[selIdx].hosts.split(", ")
    var hostsListOutput = "";
    hostsList.innerHTML = "";
    for (var i = 0; i < hostsArray.length; i++) {
        hostsListOutput += '<option value="' + i + '">' + hostsArray[i] + '</option>';
    }
    hostsList.innerHTML = hostsListOutput;
	document.getElementById('hostsDivTextColor').style.fontSize = myHosts[selIdx].textSize;
}

document.getElementById('hostsDivSelectHostCategory').addEventListener('change', function(){
    if (document.getElementById('hostsDivSelectHostCategory').value != "Select a Host Category") {
        document.getElementById('hostsDivStep2_1').style.visibility = "visible"
        document.getElementById('hostsDivStep2_2').style.visibility = "visible"
        document.getElementById('hostsDivStep2_3').style.visibility = "visible"
		document.getElementById('hostsDivStep2_4').style.visibility = "visible"
        loadHostsList();
    }
    else {
        document.getElementById('hostsDivHostsList').innerHTML = "";
        document.getElementById('hostsDivStep2_1').style.visibility = "hidden"
        document.getElementById('hostsDivStep2_2').style.visibility = "hidden"
        document.getElementById('hostsDivStep2_3').style.visibility = "hidden"
		document.getElementById('hostsDivStep2_4').style.visibility = "hidden"
    }
}, true);

document.getElementById('hostsDivAddHost').addEventListener('click', function(){
    var selIdx = getCurrentHostList();
    var newHosts = prompt("Enter the new host(s), seperated by commas");
    if (newHosts) {
        newHosts = newHosts.split(",");
        var hostsList = document.getElementById('hostsDivHostsList');
        var hostsArray = myHosts[selIdx].hosts.split(", ")
        for (var i = 0; i < newHosts.length; i++) {
            hostsArray.splice(hostsList.selectedIndex + (i + 1), 0, newHosts[i].trim());
        }
        myHosts[selIdx].hosts = hostsArray.join(", ");
        
        loadHostsList();
    }
    
}, true);

document.getElementById('hostsDivRemoveHost').addEventListener('click', function(){
    if (document.getElementById('hostsDivHostsList').selectedIndex > -1) {
        var selIdx = getCurrentHostList();
        
        var hostsList = document.getElementById('hostsDivHostsList');
        var hostsArray = myHosts[selIdx].hosts.split(", ");
        hostsArray.splice(hostsList.selectedIndex, 1);
        myHosts[selIdx].hosts = hostsArray.join(", ");
        
        loadHostsList();
    }
}, true);

document.getElementById('hostsDivSaveChanges').addEventListener('click', function(){
    var selIdx = getCurrentHostList();
	myHosts[selIdx].textSize = document.getElementById('hostsDivTextColor').style.fontSize;
	myHosts[selIdx].textColor = "#" + document.getElementById('hostsDivTextColor').value;
	
	GM_setValue("myHosts", JSON.stringify(myHosts));
    if (reloadPageAfterSave) location.reload(true);
}, true);

// ################################################################################################################################
// END SCRIPT
// ################################################################################################################################

/**
 * jscolor, JavaScript Color Picker
 *
 * version 1.2.2
 * license http://www.gnu.org/copyleft/lesser.html  GNU Lesser General Public License
 * author  Honza Odvarko <honza@odvarko.cz>
 * created 2008-06-15
 * updated 2009-02-03
 * link    http://jscolor.com
 * ####################################################################################
 * Heavily modified by mjr_havoc for use with rlslog release formatter (http://userscripts.org/scripts/show/71547)
 */

var arrow={gif:"data:image/gif,GIF89a%07%00%0B%00%A1%02%00%00%00%00%FF%FF%FF%A8%3Cx%A8%3Cx!%F9%04%01%0A%00%02%00%2C%00%00%00%00%07%00%0B%00%00%02%13L%84%18p%B9%EC%80lo%8A%3A%F1%A9%D4*%E84I%01%00%3B"};var cross={gif:"data:image/gif,GIF89a%0F%00%0F%00%A1%01%00%00%00%00%FF%FF%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%0A%00%02%00%2C%00%00%00%00%0F%00%0F%00%00%02%24%94%1F%10%C7%9D%DB%E2%8BRQg%2F%CA%2C%F8%FF%80%1E%40%96%E6)%8E)%D4q%DA%A4%19p%3C%BF%EEU%1B%05%00%3B"};var hv={png:"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%B5%00%00%00e%08%02%00%00%00%84%0F5%D1%00%00%0A%F8IDATx%DA%ED%9D%ED%92%E4%AC%0D%85%0F%9EM%E5%DD%AA%DC%FF%ADf%FF%00%F9%F1n%F7b%40_%20%F5%98%24%5D%5D.%8Fw%B6%E7%B1%0A%AB%85%8E%04%A9%02%F8%0B%F8%0B%F8I%1F%7FJ%BF%40%1C%FF%0D%FC%82%ED%A8%F9%B5_%18%A1%7F6W%F6%CE%A7%40%FB%E7%BF8%E2%D1%CC%A6%EB%E0%A0G%BB%EA%AF%FF%FA%911%7B%D5%FB%B1%CC%8E%DD%3BO%8E%D3%CB%DD%BB%FB%E0%3A%FCq%DD%AB%FD%7F%ED%BB%DC%CF%A7%F4%F9v%CE%E0%B6%9F1~%7C%87%D0%19%93%25%06a%87%A9%A5G%93K6.3%9B%94%E1%EFOL%DE%8C%8F%CA%DA%B9%0E%83%A3J%D4YF.%84Q%A6%D6%AE%DC%40%3E%06%3A%80%18%08%83%FEQ0%1B%E9%0C~%91%9E%C6%86%93%F7%19%85~%08%C7%E7%B0r%9E%E30hob%20%0Cz%F8~%A9%03%FE%94%BDH%EE%AFy%14%CB%0C%BF%CE%BC%F5%08%3Ezk%D6U%7BC%97(%E8%1D%E2%DC%13%03a%96%BE%FB%0F%D0%C8%85%C0%1F%CC%DB%5E%A1%90%0B%C1%5Bhvu%08%E2%0A%9Dc%A1%D7%88G%7B%22%CC%D2%3F23%80%AB%3AR%1A%0D%FEz%143%B8%07%92%BF%09v%B4%9F%07%1DF%0C%84A%13%FE%83%1F%E4%EA%1BZ%A6%DB~%9D%07%BD3n%10%06%3D%9B%DFR%E1%0BEZ%C9%B1%9D%D9I%22u%13X%B1%FCy%D0~%C4%40%18%F40%7F%D1DMb%90w%7F%145%01%DFF%B4w%1E%B471%10%06%3D%E4%3F%F4%B3%AE%CA%A6%9A%EES%81%2C%F1%AE%CE%16%17%A0%CB%3Atq%80%0E03%10f%E9%D9%FC%96b%17%ED%3C%E4n%8A%1421%E0Rfl%19%BA%AECW7hW3%03a%96~%7D%BF%D4%D9%91%CF%EDQ6oRycV%8F%F9%00%26%ABG%A4%DB%CF%83v!%1E%25%8B%D95%1Fh%DA%7F%40A%CD%CF%CA3%F7%8FE%01%0E%B3%FF8%06z%87x%BC%01%DD%84v%05%BA%89O%ABN!Pj%03%AFGqM%12%98%BA%3C)%FE8%03%3A%80%18%08%83%BE%FB%0F%26v*%BA%D8%3A%CF%1F%C5%AC%0B%A9%8B%B3%FE%F2Phob%20%0Cz%C8%8FU%8BT%3E%1D%DE%B9%97%BA2%FB%EB%1A%A9%BCjS%09%C7%40%BB%12%03a%D0D%FD%07%149%3CQ!%C8%B2%18%20%A6%FA%3C%92%90%8F%86%F6%20%06%C2%A0%7F%14%BD0%60%D7%09%BCd%80%0D%FD%E5A%D0a%C4%40%184%ED%3F%B0Jm%94%BA%BC%05%8D%F3%A0%B7%89%95%FA%DC%0A4%1D%7F0s%2F%C6%EB%A9%F5%FD*%15%26%60Q%CA%00-eT%D5%14W%19%EA%156C%BD%174%F1f%CE%82%BE%9F%1D-M%CC_4%B9%BDB%24%99%14%F5AU%12%06%60%D3_%C4osf%94X%A0%ABN%CDPW%9E%AE%99%D9%18%7FlY%DA%A2%BF%7C6%BF%EE%A4%BF%3C%0E%3A%80x3%BF%CE%EA%2F%85%11%06%EARn%8FMU%EBSzuQ%7F9%03%DA%95XY%9F%BC%02%FD%F2%1FU%3A%16%B3%8EA%B5%0A%88%1F%26%E2%B0j%C6%A3%A1c%88%A9%FE%06%07h%BB%FF%B0%F8%3E%BD%CB%FB%26%FF%91e%E8%FC%2C%FF1%A5C%184%11%7F%88%B9%9B%F1%24ON%A8%7F%A9t%C3%D1tB%A0%D6_%A0%1B%D1lAEQ4Gi%EAlt%FA%8B%071%10%06%CD%F6%BF%F0%DA%80%9F%D4%C5H%02v%FD%E5%00hob%BD%3Eg%86%26%FA_%F8%92Hen%2FkSz%9A%DAHK%FE%E3%00%E8%1D%E2%2C%E8%FB%D9%11%9A%AD_%B7f%F5r%9F%C7%9B%5D3%24%F6%5C%F3%A7%CF%85%DEI%9E%0E%FA%DCZ%0A%95%AF_%AF%01%DA%80%AE%15%ED%E3%FA%CB%1Et%D9%82%AE%01%D0R~l%D7%D2%1B%FA%ADB%5B%14%9B%14%3F%AE%DF%EEAW%7Fh%E5h%E0%25%5C%84Y%9A%AD%FF%00%DB%93'%BA%BF%2F%9B%BF%2B%AC%9A%A1%962%CE%80v%25%06%C2%A0%D9%FA%B1%AA%9B%E2%8E%D4_%C2TQ3%B9%DD%98%BF%3C%1D%DA%9BX%EC%7FY%87V%D7%9F%16vV%5Eg%D4_%DA%CC%C7(%0C8%D5%9F%3E%11%3A%80%18%08%83%DE%AE_%AF%F4%D8%CE%AAU)%BE%A3~%FD%FB%A1%5D%89%95%EB%7F%EC%D4%AF%EB%1B3%AAB8%FA%BA%3D%8Ay%23%BF%EE%D4%FF%F2%14h%17%E2%86%B5%F3%1F%FC%BAX%2B%D0%F6%FE9F~%EE%BC%5E%9E'%D7%0B%FDIa%FDs%8F%83%DE!%B6%F8%8F%5Dh%22%FE%A8%8A%C4%8D%18%5B%7F%A9%F49%B1%A5k%BB%FF%F6Y%D0%01%C4%40%18%F40%7F%11%B5%01%B1%84%EC%9AL%05%C4%E21Q%120%F6%EF%3F%1A%DA%9B%18%08%83%9E%E5%D7M%C9%3C*p%BA%B8TB%9D%B1%EF%D5%FC*%EBf%F7%A0%F9%24%13l%D0z3W%81%18%08%B34%5B%BF%AE%9F%A4%EFI%5DOZ%8A'o%25%D7c%A0%B7%FBo7%D7%0F%F2m%C6h%C6v%B6%FC%8F0%FD%E5)%D0a%C4%40%18%B4e%FDB%E5j%80%D7%EB%5D%04UQ%F3%17%B6%D7%2F%7C4%B4%13%B1%A8%DF%AECo%AC%7FZv%5D%B5Ruv%5D%FF%F4)%D0%3B%C4%F95%2Ct%F5%1F%5B%D0%AE%EB'%BF%C1_%C3%3B%13%A9%84'%AD%9F%FC%0D%D0%8E%EB'_%7F%BE_%A2%D7O%D6%2F%0C.fm.%83%D4%25%B6%1A9%AD%BF%FE%14%E8%00b%A5%3E%B7%02M%C7%1Fzy%A0%DAB%BD%EA%A9%BC%9C%0D%EDD%0C%84A%13%FD%2Fk-%3Bo%DE%D7Q%DCubmm%2C%9Dy%9F%08%1DC%0C%84A%13%FD%2F%F0q%7F%FB%FE%0E%AA%07%F2%3ChWb%20%0C%FA%1E%7F(%BBv4Q%93%F4U%5E7%96%E7%94%BA%C8%97X%91%FE%F8%8F%02%D5*%A8K%D0J3%17%5D8M%C4%1F%99%96%F85%E9%B2j%9C%DF%16%E3%AC%EBok%A7%3E%AA%B6N%BC%02%E6%B7b%B5o%12ZI%22%F7%F7(F%7D%EEef(j%ED%F9*C%B2%C4P%9D%1F%DB%5E%8A'%AFf%F2%FC%D2%EA%1F%5C%3F(%92%B8%CB%7F%14%B9%FFe%1DZ%9D_W%26%7B%D3%ED%9Dc6%9E%F0%1C%0D%3Ct%F6%84%F6%DD%DC%A3%85F%98%A5%15%FB%7Bl%08%5E%DF%B4%B9%C7%A9%D0%CB%A3'NNT%EC%EF%A1!M%E4W%F9%A7%BC%F5y%D0~%C4J%7Dn%05zi%7F%8F%02%5Cw%FCk%E6%FB%CAJ%C9J%D8%FE%1E%0F%82%F6%26%06%C2%A0%ED%FB%7B%5Cw%FCql'%D5%A3%E8%A4f%9C%07%1D%40%0C%84A%B3%EB%C3%80%A6%BEX%DE%7C%7B%14%D7%84%01%BF%FA%E4'B%BB%12k%F2%A7%AB%FB%7Bdk%E1%FD%9B%FA%9A%DDA%BA%DD%842%D3%FB%91%FD%3D%1E%01%1DC%0C%84A%D3%FEC%CF%DE!7c%DB%BA%AD%BA%7De)%BD%D9)%5C%0Bt%B1H%5D%D5%C0m2s%1E%8El%FF%CB%96%A5%E9%F5%A5D%DF%F7%E6%ED%C0%1Bv1O%ADtyU%15%7F%80%B5%F3%1Bzjm%1D%B4~%FDS)%FE%A8%1Bf%1E%07%8Ab%7D%CBEK%5B%F6%F7%E8%8C%3C%1A%BC%B3%B6%BA%CE%A6%04%EE%EF%F1Dho%E2%40hb%7D%07MIu%1A%A8%3B%F6%24%AF%9A%A6%14%8B%3C%F4%97gA%BB%12k%D6%A7%5B%84%26%FA%1BD%D8%F1b%C7%0Ey%D5%B4%AAk%CF%D8%5Ej%E5%B9%D0N%C4%81%D0K%FB%7BLago%F7z%FB%8D%F5%A5%BE%1F%3A%8C%18%08%83%96%FA%A3%D6%F0%15%A3%3A%B2E%EA%3C%E8%3D%E2%40h%A9%BF%12%2C%EF%88%FF~%DD%BF%CA%B3%B1%F1%0F%5B%FA%CB%19%D0~%C4%40%18%B4%A2%3F%7B%A4%EEx%CB%1D%BC%B9%83%E5%FD%3D%5C%F5%97%0D%E8%12%02%BDI%8C%9E8%D0%D2%96%F5%1D%3A%EA%F7%09%06%F0%D7%89iK%F8%B0%FD%3D6%A0%B3%3F%B4%0B%F1%80%1Eeiv%7D%18*w%93%06%E4%F6G%F4%A3Z%DCU%B1H.%CF%BE%3E%FF%D3%A1M%C4iv%03%D0B%D7%1Dh%C5%FE%1E%14%F5%14%F9%8E_6%84%01l%ED%EF%F1P%E8ebp%C4%D0%CD%5CV%A0%D5%FA%CB%DB%D9uw%00rH%8B%AAbU%2C%CC%B9%B7%3E%DDs%A1%5D%89%03%A1%25%FD%85%8F%9D0%E0%DFm%A0%D9uB%2F%1C%AD%EA%2F%CF%82%0E%20%D6%E4O%17%A1%8D%FB%7B%B4%C8-%B5%F4(Zg%03%F0%DC%DF%E3q%D0%DE%C4%81%D0%F6%FD%3D%3A%F7%07%1A%BC%1A%92y%C1%FB%7B%A0%E1.%C2G%15i%B5%84%8F%EC%EFa!%06%C2%A0%ED%FB%7B%A8%0A%DE'Q%D3Bz%CF5%15Iq'%0E%DAs%AB%0C7%E2%0DK%7Fx%7F%8F%F1V%EE%D7%DD%F7%9B%F0%D8%DF%E3%DB%A0%1D%89%87G%3E%0A%9A%F6%1F%A6Q%7D%CD%AF%8B%8B%00z%3F%8D%E7A%7B%10%07B%D3%F1G%9A%CD%BD%D0%A8%CE%85%F6%D3%F7G%B1*%16%89%2C%3E%FB%7B%1C%03%EDJ%0C%84A%0F%FAK%A2%03k%0Cw0%8DO%EB%EF%25%07P%B9VtMK%86z%FE%92%06%9B%C7%40%17iy7%F5%FC%C5d%E6%3A%9B%BF4%C4%40%98%A5%EF%FAKjN%3ASwU%F7m%F9l%0B%DER_%E4%06%02T%BD%FD%D2%FE%1E%23t%BB%DB%F0%07%A1%D5%F9%0F%AB%991%08Ewb%20%CC%D2%B3%EF%97tG%06m%F0%D6%DAi%C0%AF%AA%0D%A1%C5%AE%1D%5D%FE%F40hWb%20%0C%BA%D9%DF%23%11G%10%F8%BC0%D0%3C%8A%0B%BCj%FD%E50%E8%18b%20%0C%9A%F6%1F%D3T0%EE%D4S%FC%BF%91%D3%EFG%91%D9%5DB%93%F55%FA%8Fc%A0w%88%DFn%E3%FA%F3!JV%FB%FE%EA%F3%F8%03%0D~%BA%23c%A0%BE%9A%BC%EA%D5%3C%14%17%B9isa%2F%C2V%FFq%18%F4%3Eq%3BPR%EF%3F%9C%A1g%FD%2F%89%8E%B0%DE%EC%18%60%D3%DD%DA%CD%A3X%15%D9%F4%BD%FA%B1%C3%A0%BD%89%810h%A2%FE%B4%9D%00%D6!%13%93%9A%0A%7C%0C%B5%91%EFQ%9D%04%8F%A6%D9%AF%C6R%7Fz%18%B4%1F1%10%06%AD%A8_%E7%B3%FETmu%FDm%EA%BD%24%FA%B2%04s%18%F4%1E1%10%06%FD%EA%7F1%DDJ%D2%BEM%8Cv%FD%E50%E80b%AB%F1%F6%FB_*%8B%CC%DF%04%26%A6%86%0E%13%BB%FDs%C1%D0%A6%3B%F1%23%9EBc%3E%3E%9C-M%D4'%A7%01%BF%12F%EE%D8%D17i%F0)d%BELW%11%9C%9E%0Am%25N%02q%14%F4P%3F6%9D%7BMGr%9D%D5%DB%DF%EF%80%02%B4%9E%A8%F5%973%A0%BD%89%810%E8%7B%FDib%91%A7%E2%C1%3DL%EA%A8A%A4%F8w~%A4%F3Lg%40%C7%10GA%D3%EB'w%B9_%3E%AFM%A4%7F%F9%E4%AD%FEh%09%E9N%82v%22v%C1%9DC%A7%7FuZw%9A%FD%B8%7C%91H%1Eo%5E%1C%04%FA%93%A0c%88%A3%A0g%FD%2Fi%F0%83%1A%179kU%AC%04%FB%F2%89%22%049%03%DA%95%D8%91%B5%07I%FF%A4%8A%93%BC%CE%87%F8%DC%E5%FCh%E8%18%E2%10%E8%F4%0F%1E%7F%EFJU%CC%F8%D7%AE%FC%17%40'%CF%2BQ%D0%E9%D2%C4Q%C9%E9wt%A1%9B%D3j%F7%E7A%FB%11%7F%D6%D2%FF%7F%FD%CF%BE%FE%03%60%DDx%2B%F7q%E5t%00%00%00%00IEND%AEB%60%82"};var jscolor={dir:"",bindClass:"jscolor",binding:false,preloading:false,install:function(){jscolor.addEvent(window,"load",jscolor.init)},init:function(){if(jscolor.binding){jscolor.bind()}if(jscolor.preloading){jscolor.preload()}},getDir:function(){if(!jscolor.dir){var a=jscolor.detectDir();jscolor.dir=a!=false?a:"jscolor/"}return jscolor.dir},detectDir:function(){var c=location.href;var d=document.getElementsByTagName("base");for(var a=0;a<d.length;a++){if(d[a].href){c=d[a].href}}var d=document.getElementsByTagName("script");for(var a=0;a<d.length;a++){if(d[a].src&&/(^|\/)jscolor\.js([?#].*)?$/i.test(d[a].src)){var f=new jscolor.URI(d[a].src);var b=f.toAbsolute(c);b.path=b.path.replace(/[^\/]+$/,"");delete b.query;delete b.fragment;return b.toString()}}return false},bind:function(){var matchClass=new RegExp("(^|\\s)("+jscolor.bindClass+")\\s*(\\{[^}]*\\})?","i");var e=document.getElementsByTagName("input");for(var i=0;i<e.length;i++){var m;if(!e[i].color&&e[i].className&&(m=e[i].className.match(matchClass))){var prop={};if(m[3]){try{eval("prop="+m[3])}catch(eInvalidProp){}}e[i].color=new jscolor.color(e[i],prop)}}},preload:function(){for(var a in jscolor.imgRequire){jscolor.loadImage(a)}},images:{pad:[181,101],sld:[16,101],cross:[15,15],arrow:[7,11]},imgRequire:{},imgLoaded:{},requireImage:function(a){jscolor.imgRequire[a]=true},loadImage:function(a){if(!jscolor.imgLoaded[a]){jscolor.imgLoaded[a]=new Image();jscolor.imgLoaded[a].src=jscolor.getDir()+a}},fetchElement:function(a){return typeof(a)=="string"?document.getElementById(a):a},addEvent:function(a,c,b){return a.addEventListener(c,b,false)},fireEvent:function(a,c){if(!a){return false}else{if(document.createEventObject){var b=document.createEventObject();return a.fireEvent("on"+c,b)}else{return false}}},getElementPos:function(c){var d=c,b=c;var a=0,f=0;if(d.offsetParent){do{a+=d.offsetLeft;f+=d.offsetTop}while(d=d.offsetParent)}while((b=b.parentNode)&&b.nodeName!="BODY"){a-=b.scrollLeft;f-=b.scrollTop}return[a,f]},getElementSize:function(a){return[a.offsetWidth,a.offsetHeight]},getMousePos:function(a){return[a.clientX,a.clientY]},getViewPos:function(){if(typeof window.pageYOffset=="number"){return[window.pageXOffset,window.pageYOffset]}else{if(document.body&&(document.body.scrollLeft||document.body.scrollTop)){return[document.body.scrollLeft,document.body.scrollTop]}else{if(document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop)){return[document.documentElement.scrollLeft,document.documentElement.scrollTop]}else{return[0,0]}}}},getViewSize:function(){if(typeof window.innerWidth=="number"){return[window.innerWidth,window.innerHeight]}else{if(document.body&&(document.body.clientWidth||document.body.clientHeight)){return[document.body.clientWidth,document.body.clientHeight]}else{if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){return[document.documentElement.clientWidth,document.documentElement.clientHeight]}else{return[0,0]}}}},color:function(A,d){this.required=true;this.adjust=true;this.hash=false;this.caps=true;this.valueElement=A;this.styleElement=A;this.hsv=[0,0,1];this.rgb=[1,1,1];this.pickerOnfocus=true;this.pickerMode="HVS";this.pickerPosition="bottom";this.pickerFace=10;this.pickerFaceColor="ThreeDFace";this.pickerBorder=1;this.pickerBorderColor="ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight";this.pickerInset=1;this.pickerInsetColor="ThreeDShadow ThreeDHighlight ThreeDHighlight ThreeDShadow";this.pickerZIndex=10000;for(var r in d){this[r]=d[r]}this.hidePicker=function(){if(s()){f()}};this.showPicker=function(){if(!s()){var J=jscolor.getElementPos(A);var G=jscolor.getElementSize(A);var D=jscolor.getViewPos();var L=jscolor.getViewSize();var p=[2*this.pickerBorder+4*this.pickerInset+2*this.pickerFace+jscolor.images.pad[0]+2*jscolor.images.arrow[1]+jscolor.images.sld[0],2*this.pickerBorder+2*this.pickerInset+2*this.pickerFace+jscolor.images.pad[1]];var K,I,H;switch(this.pickerPosition.toLowerCase()){case"left":K=1;I=0;H=-1;break;case"right":K=1;I=0;H=1;break;case"top":K=0;I=1;H=-1;break;default:K=0;I=1;H=1;break}var F=(G[I]+p[I])/2;var E=[-D[K]+J[K]+p[K]>L[K]?(-D[K]+J[K]+G[K]/2>L[K]/2&&J[K]+G[K]-p[K]>=0?J[K]+G[K]-p[K]:J[K]):J[K],-D[I]+J[I]+G[I]+p[I]-F+F*H>L[I]?(-D[I]+J[I]+G[I]/2>L[I]/2&&J[I]+G[I]-F-F*H>=0?J[I]+G[I]-F-F*H:J[I]+G[I]-F+F*H):(J[I]+G[I]-F+F*H>=0?J[I]+G[I]-F+F*H:J[I]+G[I]-F-F*H)];i(E[K],E[I])}};this.importColor=function(){if(!a){this.exportColor()}else{if(!this.adjust){if(!this.fromString(a.value,v)){C.style.backgroundColor=C.jscStyle.backgroundColor;C.style.color=C.jscStyle.color;this.exportColor(v|B)}}else{if(!this.required&&/^\s*$/.test(a.value)){a.value="";C.style.backgroundColor=C.jscStyle.backgroundColor;C.style.color=C.jscStyle.color;this.exportColor(v|B)}else{if(this.fromString(a.value)){}else{this.exportColor()}}}}};this.exportColor=function(p){if(!(p&v)&&a){var D=this.toString();if(this.caps){D=D.toUpperCase()}if(this.hash){D="#"+D}a.value=D}if(!(p&B)&&C){C.style.backgroundColor="#"+this.toString();C.style.color=0.213*this.rgb[0]+0.715*this.rgb[1]+0.072*this.rgb[2]<0.5?"#FFF":"#000"}if(!(p&t)&&s()){q()}if(!(p&e)&&s()){z()}};this.fromHSV=function(F,E,D,p){F<0&&(F=0)||F>6&&(F=6);E<0&&(E=0)||E>1&&(E=1);D<0&&(D=0)||D>1&&(D=1);this.rgb=g(F==null?this.hsv[0]:(this.hsv[0]=F),E==null?this.hsv[1]:(this.hsv[1]=E),D==null?this.hsv[2]:(this.hsv[2]=D));this.exportColor(p)};this.fromRGB=function(G,F,p,D){G<0&&(G=0)||G>1&&(G=1);F<0&&(F=0)||F>1&&(F=1);p<0&&(p=0)||p>1&&(p=1);var E=w(G==null?this.rgb[0]:(this.rgb[0]=G),F==null?this.rgb[1]:(this.rgb[1]=F),p==null?this.rgb[2]:(this.rgb[2]=p));if(E[0]!=null){this.hsv[0]=E[0]}if(E[2]!=0){this.hsv[1]=E[1]}this.hsv[2]=E[2];this.exportColor(D)};this.fromString=function(E,D){var p=E.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);if(!p){return false}else{if(p[1].length==6){this.fromRGB(parseInt(p[1].substr(0,2),16)/255,parseInt(p[1].substr(2,2),16)/255,parseInt(p[1].substr(4,2),16)/255,D)}else{this.fromRGB(parseInt(p[1].charAt(0)+p[1].charAt(0),16)/255,parseInt(p[1].charAt(1)+p[1].charAt(1),16)/255,parseInt(p[1].charAt(2)+p[1].charAt(2),16)/255,D)}return true}};this.toString=function(){return((256|Math.round(255*this.rgb[0])).toString(16).substr(1)+(256|Math.round(255*this.rgb[1])).toString(16).substr(1)+(256|Math.round(255*this.rgb[2])).toString(16).substr(1))};function w(H,G,D){var I=Math.min(Math.min(H,G),D);var E=Math.max(Math.max(H,G),D);var p=E-I;if(p==0){return[null,0,E]}var F=H==I?3+(D-G)/p:(G==I?5+(H-D)/p:1+(G-H)/p);return[F==6?0:F,p/E,E]}function g(G,F,D){if(G==null){return[D,D,D]}var E=Math.floor(G);var H=E%2?G-E:1-(G-E);var p=D*(1-F);var I=D*(1-F*H);switch(E){case 6:case 0:return[D,I,p];case 1:return[I,D,p];case 2:return[p,D,I];case 3:return[p,I,D];case 4:return[I,p,D];case 5:return[D,p,I]}}function f(){delete jscolor.picker.owner;document.getElementById("hostsDiv").removeChild(jscolor.picker.boxB)}function i(D,K){if(!jscolor.picker){jscolor.picker={box:document.createElement("div"),boxB:document.createElement("div"),pad:document.createElement("div"),padB:document.createElement("div"),padM:document.createElement("div"),sld:document.createElement("div"),sldB:document.createElement("div"),sldM:document.createElement("div")};for(var G=0,J=4;G<jscolor.images.sld[1];G+=J){var E=document.createElement("div");E.style.height=J+"px";E.style.fontSize="1px";E.style.lineHeight="0";jscolor.picker.sld.appendChild(E)}jscolor.picker.sldB.appendChild(jscolor.picker.sld);jscolor.picker.box.appendChild(jscolor.picker.sldB);jscolor.picker.box.appendChild(jscolor.picker.sldM);jscolor.picker.padB.appendChild(jscolor.picker.pad);jscolor.picker.box.appendChild(jscolor.picker.padB);jscolor.picker.box.appendChild(jscolor.picker.padM);jscolor.picker.boxB.appendChild(jscolor.picker.box)}var I=jscolor.picker;n=[D+j.pickerBorder+j.pickerFace+j.pickerInset,K+j.pickerBorder+j.pickerFace+j.pickerInset];x=[null,K+j.pickerBorder+j.pickerFace+j.pickerInset];I.box.addEventListener("mouseup",function(){A.focus()},true);I.box.addEventListener("mouseout",function(){A.focus()},true);I.box.addEventListener("mousedown",function(){l=true},true);I.box.addEventListener("mousemove",function(p){c&&u(p);m&&h(p)},true);I.padM.addEventListener("mouseup",function(){if(c){c=false;jscolor.fireEvent(a,"change")}},true);I.padM.addEventListener("mouseout",function(){if(c){c=false;jscolor.fireEvent(a,"change")}},true);I.padM.addEventListener("mousedown",function(p){c=true;u(p)},true);I.sldM.addEventListener("mouseup",function(){if(m){m=false;jscolor.fireEvent(a,"change")}},true);I.sldM.addEventListener("mouseout",function(){if(m){m=false;jscolor.fireEvent(a,"change")}},true);I.sldM.addEventListener("mousedown",function(p){m=true;h(p)},true);I.box.style.width=4*j.pickerInset+2*j.pickerFace+jscolor.images.pad[0]+2*jscolor.images.arrow[0]+jscolor.images.sld[0]+"px";I.box.style.height=2*j.pickerInset+2*j.pickerFace+jscolor.images.pad[1]+"px";I.boxB.style.position="absolute";I.boxB.style.clear="both";I.boxB.style.left=D+"px";I.boxB.style.top=K+"px";I.boxB.style.zIndex=j.pickerZIndex;I.boxB.style.border=j.pickerBorder+"px solid";I.boxB.style.borderColor=j.pickerBorderColor;I.boxB.style.background=j.pickerFaceColor;I.pad.style.width=jscolor.images.pad[0]+"px";I.pad.style.height=jscolor.images.pad[1]+"px";I.padB.style.position="absolute";I.padB.style.left=j.pickerFace+"px";I.padB.style.top=j.pickerFace+"px";I.padB.style.border=j.pickerInset+"px solid";I.padB.style.borderColor=j.pickerInsetColor;I.padM.style.position="absolute";I.padM.style.left="0";I.padM.style.top="0";I.padM.style.width=j.pickerFace+2*j.pickerInset+jscolor.images.pad[0]+jscolor.images.arrow[0]+"px";I.padM.style.height=I.box.style.height;I.padM.style.cursor="crosshair";I.sld.style.overflow="hidden";I.sld.style.width=jscolor.images.sld[0]+"px";I.sld.style.height=jscolor.images.sld[1]+"px";I.sldB.style.position="absolute";I.sldB.style.right=j.pickerFace+"px";I.sldB.style.top=j.pickerFace+"px";I.sldB.style.border=j.pickerInset+"px solid";I.sldB.style.borderColor=j.pickerInsetColor;I.sldM.style.position="absolute";I.sldM.style.right="0";I.sldM.style.top="0";I.sldM.style.width=jscolor.images.sld[0]+jscolor.images.arrow[0]+j.pickerFace+2*j.pickerInset+"px";I.sldM.style.height=I.box.style.height;try{I.sldM.style.cursor="pointer"}catch(F){I.sldM.style.cursor="hand"}switch(b){case 0:var H=hs.png;break;case 1:var H=hv.png;break}I.padM.style.background='url("'+cross.gif+'") no-repeat';I.sldM.style.background='url("'+arrow.gif+'") no-repeat';I.pad.style.background='url("'+H+'") 0 0 no-repeat';q();z();jscolor.picker.owner=j;document.getElementById("hostsDiv").appendChild(I.boxB)}function q(){switch(b){case 0:var F=1;break;case 1:var F=2;break}var J=Math.round((j.hsv[0]/6)*(jscolor.images.pad[0]-1));var I=Math.round((1-j.hsv[F])*(jscolor.images.pad[1]-1));jscolor.picker.padM.style.backgroundPosition=(j.pickerFace+j.pickerInset+J-Math.floor(jscolor.images.cross[0]/2))+"px "+(j.pickerFace+j.pickerInset+I-Math.floor(jscolor.images.cross[1]/2))+"px";var p=jscolor.picker.sld.childNodes;switch(b){case 0:var H=g(j.hsv[0],j.hsv[1],1);for(var D=0;D<p.length;D++){p[D].style.backgroundColor="rgb("+(H[0]*(1-D/p.length)*100)+"%,"+(H[1]*(1-D/p.length)*100)+"%,"+(H[2]*(1-D/p.length)*100)+"%)"}break;case 1:var H,K,G=[j.hsv[2],0,0];var D=Math.floor(j.hsv[0]);var E=D%2?j.hsv[0]-D:1-(j.hsv[0]-D);switch(D){case 6:case 0:H=[0,1,2];break;case 1:H=[1,0,2];break;case 2:H=[2,0,1];break;case 3:H=[2,1,0];break;case 4:H=[1,2,0];break;case 5:H=[0,2,1];break}for(var D=0;D<p.length;D++){K=1-1/(p.length-1)*D;G[1]=G[0]*(1-K*E);G[2]=G[0]*(1-K);p[D].style.backgroundColor="rgb("+(G[H[0]]*100)+"%,"+(G[H[1]]*100)+"%,"+(G[H[2]]*100)+"%)"}break}}function z(){switch(b){case 0:var p=2;break;case 1:var p=1;break}var D=Math.round((1-j.hsv[p])*(jscolor.images.sld[1]-1));jscolor.picker.sldM.style.backgroundPosition="0 "+(j.pickerFace+j.pickerInset+D-Math.floor(jscolor.images.arrow[1]/2))+"px"}function s(){return jscolor.picker&&jscolor.picker.owner==j}function o(){if(a==A){j.importColor()}if(j.pickerOnfocus){j.hidePicker()}}function k(){if(a!=A){j.importColor()}}function u(D){var F=jscolor.getMousePos(D);var p=F[0]-n[0];var E=F[1]-n[1];switch(b){case 0:j.fromHSV(p*(6/(jscolor.images.pad[0]-1)),1-E/(jscolor.images.pad[1]-1),null,e);break;case 1:j.fromHSV(p*(6/(jscolor.images.pad[0]-1)),null,1-E/(jscolor.images.pad[1]-1),e);break}}function h(p){var E=jscolor.getMousePos(p);var D=E[1]-n[1];switch(b){case 0:j.fromHSV(null,null,1-D/(jscolor.images.sld[1]-1),t);break;case 1:j.fromHSV(null,1-D/(jscolor.images.sld[1]-1),null,t);break}}var j=this;var b=this.pickerMode.toLowerCase()=="hvs"?1:0;var l=false;var a=jscolor.fetchElement(this.valueElement),C=jscolor.fetchElement(this.styleElement);var c=false,m=false;var n,x;var v=1<<0,B=1<<1,t=1<<2,e=1<<3;jscolor.addEvent(A,"focus",function(){if(j.pickerOnfocus){j.showPicker()}});jscolor.addEvent(A,"blur",function(){if(!l){setTimeout(function(){l||o();l=false},0)}else{l=false}});if(a){var y=function(){j.fromString(a.value,v)};jscolor.addEvent(a,"keyup",y);jscolor.addEvent(a,"input",y);jscolor.addEvent(a,"blur",k);a.setAttribute("autocomplete","off")}if(C){C.jscStyle={backgroundColor:C.style.backgroundColor,color:C.style.color}}switch(b){case 0:jscolor.requireImage("hs.png");break;case 1:jscolor.requireImage("hv.png");break}jscolor.requireImage("cross.gif");jscolor.requireImage("arrow.gif");this.importColor()}};


//jscolor.install()

var myPicker = new jscolor.color(document.getElementById('hostsDivTextColor'), {})

// Script Update Checker - Credits to Jarett (http://userscripts.org/scripts/review/20145)
var SUC_script_num = 71547; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){if (remote_version > local_version){if(confirm('There is an update available for rlslog Release Formatter."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/71547');GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for rlslog Release Formatter');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand('rlslog Release Formatter - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}