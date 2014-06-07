// ==UserScript==
// @name           what.cd multiple format uploader
// @namespace      whmf
// @include        http://what.cd/upload.php*
// @include        https://ssl.what.cd/upload.php*
// ==/UserScript==

/* if you want your gazelle site to block this script, add this to sections/upload/upload_handle.php at the appropriate point:

if (array_key_exists("whmf_assisted", $_POST)) $Err = "Sorry, the multiple format uploader Greasemonkey script is not allowed on this site.";

you can also add this to the upload form:
<div id="whmf_cease_and_desist" class="hidden"></div>

this will prevent people from using old versions (which are at least version 6):
<div id="whmf_cease_and_desist" class="hidden">{most current scriptVersion}</div>
see below for the value of {scriptVersion}

this will show a message before activating (if the user is running at least version 6):
<div id="whmf_warning" class="hidden">Burble burble</div>

this will change the log checker from automatic to by-request:
<div id="whmf_cease_automatically_checking_logs" class="hidden"></div>

*/

/*
changelog:

eleventh public release:
builtForVersion = 6511
builtOn = 1273521036*1000
twe4k: [move logchecker form to outside upload form]
added detection for [q8], [q8.0] and [q8.x] in torrent filename
twe4k: logchecker button text change
SuperSnout: logchecker buttons a fixed size

tenth public release:
fixed "[AAC] [320]" handling
in browsers which don't support cloning <input type="file">, don't try to check logs

ninth public release:
builtForVersion = 6510
builtOn = 1273408812*1000
integrated log checker (click on score for full report)
Ickis: added detection of "[AAC] [320]", "[320] [AAC]" (case insensitive, any type of bracket, space optional)
Ickis: added detection of "[AAC320]", "[320AAC]" (case insensitive, any type of bracket)
twe4k: new layout of log file/release description area
no more "add another logfile" button, simply add a new logfile field once the last one is filled with a logfile.
require "[V0]" (etc) to be at end of torrent filename instead of just somewhere in the filename
default two torrent rows open
warn when script is over 14 days old
"probably okay" -> "almost certainly okay" in Gazelle revision warning
invisible code changes (incl. removed the last row in tbody[@id='whmf_torrents'])

eighth public release:
builtForVersion = 6488
refuse to upload more than 6 torrents
twe4k: no more "add torrent" button, simply add a new row once the first one is filled with a torrent.
twe4k: if select ogg, also choose q8.x (VBR) as it's the only permitted bitrate
ilikesleeping: disable irrelevant bitrates
if select AC3/DTS, also choose "Other" as it is almost always not a listed bitrate

seventh public release:
builtForVersion = 6439
DeLaSteve: allow (v0) or (v2) as well as [v0] or [v2]
disable update checker... thanks for nothing, userscripts.org

sixth public release:
builtForVersion = 6429
auto-update. new home is http://userscripts.org/scripts/show/75399, but please don't post there, use the lab thread. thanks
whmf_cease_and_desist added version checker
whmf_warning
p4aved: disable upload button while already uploading
button now says "Upload torrents"
changed listed of permitted browsers
changes not affecting anything

fifth public release:
builtForVersion = 6428
some safety check changes
removed scene checkbox
fixed: one more logfile box than necessary when late switching
p4aved: fixed: "[FLAC].torrent" doesn't open logfile section
add GM menu link to lab thread

fourth public release:
p4aved: some safety check changes

third public release:
can now remove log files
can now add log files before accepting offer -- they are transferred

second public release:
builtForVersion = 6424
allow [v0] or [v2] as well as [V0] and [V2]
disabled colouring
disable fields such as tags after a group is created
disable fields such as release information and media after the first successful upload
allow walking in from the request page ([fill request] link)
added offer box with safety checks

first public release:
builtForVersion = 6390

*/

builtForVersion = 6511;
builtOn = 1273521036*1000;

scriptBuild = 11;

function $x() {
  var x='';
  var node=document;
  var type=0;
  var fix=true;
  var i=0;
  var cur;
    
  function toArray(xp) {
    var final=[], next;
    while (next=xp.iterateNext()) {
      final.push(next);
    }
    return final;
  }
  
  while (cur=arguments[i++]) {
    switch (typeof cur) {
      case "string": x+=(x=='') ? cur : " | " + cur; continue;
      case "number": type=cur; continue;
      case "object": node=cur; continue;
      case "boolean": fix=cur; continue;
    }
  }
  
  if (fix) {
    if (type==6) type=4;
    if (type==7) type=5;
  }
  
  // selection mistake helper
  if (!/^\//.test(x)) x="//"+x;

  // context mistake helper
  if (node!=document && !/^\./.test(x)) x="."+x;

  var result=document.evaluate(x, node, null, type, null);
  if (fix) {
    // automatically return special type
    switch (type) {
      case 1: return result.numberValue;
      case 2: return result.stringValue;
      case 3: return result.booleanValue;
      case 8:
      case 9: return result.singleNodeValue;
    }
  }

  return fix ? toArray(result) : result;
}

function $x1(a) {
 return $x(a, XPathResult.FIRST_ORDERED_NODE_TYPE);
}

function initialiseScript() {
	var typeBox = $x1("//select[@id='categories']");
	typeBox.disabled = true;
	
	if ($x1("//input[@type='hidden'][@name='type']") == null) {
		var typeBox = document.createElement("input");
		typeBox.name = "type";
		typeBox.value = "Music";
		typeBox.type = "hidden";
		$x1("//form[@id='upload_table']//input[@name='submit']").parentNode.insertBefore(typeBox, $x1("//form[@id='upload_table']//input[@name='submit']"));
	}
		
	haveGroup = $x1("//input[@type='hidden'][@name='groupid']") != null;

	if (!haveGroup) {
		groupBox = document.createElement("input");
		groupBox.name = "groupid";
		groupBox.value = "";
		groupBox.type = "hidden";
		groupBox.disabled = true;
		$x1("//form[@id='upload_table']//input[@name='submit']").parentNode.insertBefore(groupBox, $x1("//form[@id='upload_table']//input[@name='submit']"));
	}
	
	torrentUploading = 0;

	// test bitrate list
	
	var bitrateBox = $x1("//select[@id='bitrate']");
	bitrateDisablerExtension = true;
	var perfectBitrateList = ["---", "192", "APS (VBR)", "V2 (VBR)", "V1 (VBR)", "256", "APX (VBR)", "V0 (VBR)", "q8.x (VBR)", "320", "Lossless", "24bit Lossless", "Other"];
	if (bitrateBox.options.length != perfectBitrateList.length) {
		bitrateDisablerExtension = false;
	} else {
		for (var i = 0; i < perfectBitrateList.length; i++) {
			if (bitrateBox.options[i].value != perfectBitrateList[i]) {
				bitrateDisablerExtension = false;
				break;
			}
		}
	}

	
	// warn user
	
	var warningBox = document.createElement("div");
	warningBox.style.textAlign = "center";
	warningBox.style.border = "1px solid black";
	warningBox.style.paddingTop = warningBox.style.paddingBottom = warningBox.style.marginBottom = "1em";
	warningBox.style.marginLeft = warningBox.style.marginRight = "5em";	
	warningBox.style.fontWeight = "bold";
	$x1("//form[@id='upload_table']//input[@type='submit']").parentNode.insertBefore(warningBox, $x1("//form[@id='upload_table']//input[@type='submit']"));
	warningBox.innerHTML = "You are using an experimental Greasemonkey script, What.CD Multiple Format Uploader. Although the author was not aware of any bugs at the time of release, it's your responsibility to check that everything uploaded correctly.";
	var advertiseOption = document.createElement("input");
	advertiseOption.type = "checkbox";
	
	var reqId = 0;
	if ($x1("//input[@name='requestid']") != null) {
		reqId = $x1("//input[@name='requestid']").value;
		$x1("//input[@name='requestid']").parentNode.removeChild($x1("//input[@name='requestid']"));
		var sorryBox = document.createElement("div");
		sorryBox.style.textAlign = "center";
		sorryBox.style.border = "1px solid black";
		sorryBox.style.paddingTop = sorryBox.style.paddingBottom = sorryBox.style.marginBottom = "1em";
		sorryBox.style.marginLeft = sorryBox.style.marginRight = "5em";	
		sorryBox.style.fontWeight = "bold";
		$x1("//form[@id='upload_table']//input[@type='submit']").parentNode.insertBefore(sorryBox, $x1("//form[@id='upload_table']//input[@type='submit']"));
		sorryBox.innerHTML = "After pressing the upload button, please visit <a href=\"requests.php?action=view&id=" + reqId + "\">the page of the original request</a> and fill it manually.";
	}

	
	// let what.cd know we're special
	var politeBox = document.createElement("input");
	politeBox.name = "whmf_assisted";
	politeBox.value = scriptBuild; // builds <=4 report as "1"
	politeBox.type = "hidden";
	$x1("//form[@id='upload_table']//input[@name='submit']").parentNode.insertBefore(politeBox, $x1("//form[@id='upload_table']//input[@name='submit']"));
	politeBox2 = document.createElement("input");
	politeBox2.name = "whmf_total";
	politeBox2.value = "?";
	politeBox2.type = politeBox.type;
	$x1("//form[@id='upload_table']//input[@name='submit']").parentNode.insertBefore(politeBox2, $x1("//form[@id='upload_table']//input[@name='submit']"));
	politeBox3 = document.createElement("input");
	politeBox3.name = "whmf_this";
	politeBox3.value = "?";
	politeBox3.type = politeBox.type;
	$x1("//form[@id='upload_table']//input[@name='submit']").parentNode.insertBefore(politeBox3, $x1("//form[@id='upload_table']//input[@name='submit']"));
	
	formTarget = document.createElement("iframe");
	formTarget.name = "whmf_iframe";
	formTarget.style.display = "none";
	formTarget.addEventListener("load", formResult, false);
	$x1("//form[@id='upload_table']").parentNode.insertBefore(formTarget, $x1("//form[@id='upload_table']"));

	$x1("//form[@id='upload_table']").addEventListener("submit", formSubmit, false);
	$x1("//form[@id='upload_table']").target = "whmf_iframe";
	
	// re-arrange form

	var offerBox = document.getElementById("whmf_offer");
	offerBox.innerHTML = "You are using the multiple format uploader! To get the ordinary upload form please <a href=\"#\" onClick=\"window.location.href=window.location.href.replace('#',''); return false;\">reload the page</a>.";
	if (reqId != 0) {
		offerBox.innerHTML += "<br>(Note: after uploading, please visit <a href=\"requests.php?action=view&id=" + reqId + "\">the request page</a> to fill it)";
	}

	var fileBox = $x1("//input[@id='file']");
	var fileRow = $x1("//input[@id='file']/ancestor::tr");
	fileRow.parentNode.removeChild(fileRow);
	var releaseDescRow = $x1("//textarea[@name='release_desc']/ancestor::tr");
	releaseDescRow.parentNode.removeChild(releaseDescRow);
	var logsRow = $x1("//tr[@id='upload_logs']");
	logsRow.style.display = "none";
	
	$x1("//form[@id='upload_table']//input[@type='submit']").value = "Upload torrents";

	var formatBox = $x1("//select[@id='format']");
	var formatRow = $x1("//select[@id='format']/ancestor::tr");
	// bitrateBox = $x1("//select[@id='bitrate']"); // already up there
	var bitrateRow = $x1("//select[@id='bitrate']/ancestor::tr");
	var currentFormat = formatBox.selectedIndex;
	var currentBitrate = bitrateBox.selectedIndex;
	var currentOtherBitrate = $x1("//input[@id='other_bitrate']").value;
	var currentOtherBitrateVBR = $x1("//input[@id='vbr']").checked;
	formatRow.parentNode.removeChild(formatRow);
	bitrateRow.parentNode.removeChild(bitrateRow);

	var sceneCell = $x1("//input[@id='scene']/ancestor::td");
	sceneCell.innerHTML = "<b>Sorry, this Greasemonkey script doesn't support uploading scene releases. If you are uploading a scene release, please <a href=\"#\" onClick=\"window.location.href=window.location.href.replace('#',''); return false;\">reload the page</a>.";

	
	var mediaRow = $x1("//select[@id='media']/ancestor::tr");
	var torrentsRow = document.createElement("tr");
	mediaRow.parentNode.insertBefore(torrentsRow, mediaRow.nextSibling);
	torrentsRow.innerHTML = "<td class=\"label\">Torrents</td><td><table><thead><tr><th>Torrent file</th><th>Format</th><th>Bitrate</th><th>&nbsp;</th></thead><tbody id=whmf_torrents></tbody></table></td>";
	torrentTable = $x1("//tbody[@id='whmf_torrents']");
	
	emptyTorrentRowHTML1 = "<td><input type=\"hidden\" name=\"whmf_already_uploaded\" value=\"0\" disabled><input type=\"hidden\" name=\"whmf_already_uploaded_message\" disabled><input type=\"file\" size=\"30\" name=\"file_input\"></td>" +
	 "<td><select name=\"format\">" + formatBox.innerHTML + "</select></td>" + 
	 "<td><select name=\"bitrate\">" + bitrateBox.innerHTML + "</select><span class=\"whmf_other_bitrate\">" + 
	    "&nbsp;<input type=\"text\" size=\"5\" name=\"other_bitrate\">" + 
		"<input type=\"checkbox\" name=\"vbr\" id=\"vbr\"> (VBR)" +
		"</span></td>" + 
	 "<td><a href=\"#\" class=\"whmf_remove_row\">[-]</a><abbr class=\"whmf_already_uploaded_marker\" style=\"font-weight:bold\" title=\"This torrent was uploaded successfully\">:-)</abbr></td>";
	emptyTorrentRowHTML2 = "<td colspan=4 style=\"padding-left: 1em\"><table class=\"border slice\" cellspacing=\"1\" cellpadding=\"3\" border=\"0\"><tbody>" + 
	 "<tr class=\"whmf_logfiles\"><td class=\"label\" style=\"width: 80px\">Log files</td><td><input type=\"file\" size=\"40\" name=\"logfiles[]\"> <button name=\"whmf_check\" style=\"display: none; width: 8em\">Check log</button></td></tr>" +
	 "<tr><td class=\"label\" style=\"width: 80px\">Release description<br />(optional)</td><td><textarea name=\"release_desc\" rows=\"3\" cols=\"30\"></textarea></td></tr></tbody></table></td>";
	
	addAnotherRow();
	addAnotherRow();
	
	logChecks = 0;
	
	// fix up the first row of the torrents table
	var firstTorrentRow = $x1("//tbody[@id='whmf_torrents']/tr[1]");
	$x1("//tbody[@id='whmf_torrents']/tr[1]//a[@class='whmf_remove_row']").style.display = "none";
	
	$x1("//tbody[@id='whmf_torrents']/tr[1]/td[1]").removeChild($x1("td[1]/input[@name='file_input']", firstTorrentRow));
	$x1("//tbody[@id='whmf_torrents']/tr[1]/td[1]").appendChild(fileBox);
	fileBox.addEventListener("change", tev_changeFile, false);
	fileBox.size = 30;
	$x1("//tbody[@id='whmf_torrents']/tr[1]/td[2]/select").selectedIndex = currentFormat;
	var e = document.createEvent("UIEvents");
	e.initUIEvent("change", true, true, window, 1);
	$x1("//tbody[@id='whmf_torrents']/tr[1]/td[2]/select").dispatchEvent(e);
	$x1("//tbody[@id='whmf_torrents']/tr[1]/td[3]/select").selectedIndex = currentBitrate;
	e = document.createEvent("UIEvents");
	e.initUIEvent("change", true, true, window, 1);
	$x1("//tbody[@id='whmf_torrents']/tr[1]/td[3]/select").dispatchEvent(e);
	$x1("//tbody[@id='whmf_torrents']/tr[2]//tr[@class='whmf_logfiles']").style.display = ($x1("//tbody[@id='whmf_torrents']/tr/td[2]/select").value == "FLAC") ? "table-row" : "none";

	var fields = $x("//tr[@id='upload_logs']//input[@name='logfiles[]']", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
	var c = 0;
	fields.forEach(function (field) {
		var removes = $x("//tbody[@id='whmf_torrents']/tr[2]//tr[@class='whmf_logfiles']//input[@name='logfiles[]']", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
		var remove = 0;
		removes.forEach(function (f) { remove = f; });
		remove.parentNode.insertBefore(field, remove);
		field.size = 40;
		//field.multiple = true;
		field.addEventListener("change", tev_changeLogFile, false);
		remove.parentNode.removeChild(remove);
		var event = document.createEvent("UIEvents");
		event.initUIEvent("change", false, true, window, -0); // last argument arbitrary
		field.dispatchEvent(event);
	});

	logsRow.parentNode.removeChild(logsRow); // in the big upload table
	
}

function logCheckResult(evt) {
	var checkerTarget = evt.target;
	var button = checkerTarget.nextElementSibling;
	var score = "Error";
	if (checkerTarget.contentDocument.title == "Logchecker :: What.CD") {
		var scoreBox = checkerTarget.contentDocument.evaluate("//div[@id='content']//div[@class='thin']/blockquote[1]/span", checkerTarget.contentDocument, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (scoreBox.snapshotItem(0) != null) {
			score = scoreBox.snapshotItem(0).textContent;
			score = score + " (details)";
		} else {
			score = "Error: can't find result on result page";
		}
	} else if (checkerTarget.contentDocument.title == "Error :: What.CD") {
		var errorBox = checkerTarget.contentDocument.evaluate("//div[@id='content']//div[@class='thin']/div[@class='box pad']/p", checkerTarget.contentDocument, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (errorBox.snapshotItem(0) != null) {
			score = errorBox.snapshotItem(0).textContent;
		} else {
			score = "Error: can't find error on error page";
		}
	} else {
		score = "Error: page not good";
	}
	button.disabled = false;
	button.textContent = score;
}

function checkLog(evt) {
	var button = evt.target;
	var logsBox = button;
	do {
		logsBox = logsBox.previousElementSibling;
	} while (logsBox.nodeName != "INPUT")
	
	evt.preventDefault();
	
	if (logsBox.value == "") return;
	
	var showInPage = (button.textContent == "Check log"); // otherwise open new window
	
	logChecks++;
	
	var mainForm = $x1("//form[@id='upload_table']");
	
	var checkerForm = document.createElement("form");
	checkerForm.action = "logchecker.php";
	checkerForm.method = "post";
	checkerForm.innerHTML = "<input type=\"hidden\" name=\"action\" value=\"takeupload\">";
	checkerForm.enctype = "multipart/form-data";
	checkerForm.style.display = "none";
	mainForm.parentNode.insertBefore(checkerForm, mainForm);

	
	if (showInPage) {
		var checkerTarget = document.createElement("iframe");
		var c = $x("//iframe", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).length;
		checkerTarget.name = "whmf_checker_iframe_" + logChecks;
		checkerTarget.style.display = "none";


		button.parentNode.insertBefore(checkerTarget, button);
		checkerTarget.addEventListener("load", logCheckResult, false);
		


		checkerForm.target = "whmf_checker_iframe_" + logChecks;
	} else {
		checkerForm.target = "_blank";
	}

	var logFile = logsBox.cloneNode(false);
	logFile.name = "log";
	logFile.disabled = false;
	checkerForm.appendChild(logFile);

	button.style.display = "inline";

	logFile.form.submit();
	if (showInPage) {
		button.disabled = true;
		button.textContent = "Checking log...";
	}
}

function removeLog(evt) {
	var button = evt.target.nextElementSibling;
	var logsBox = button;

	do {
		logsBox = logsBox.previousElementSibling;
	} while (logsBox.nodeName != "INPUT")

	while (!((logsBox.nextSibling == null) || (logsBox.nextSibling.nodeName == "BR"))) {
		logsBox.parentNode.removeChild(logsBox.nextSibling);
	}

	if (logsBox.nextSibling.nodeName == "BR") {
		logsBox.parentNode.removeChild(logsBox.nextSibling);
	}
	logsBox.parentNode.removeChild(logsBox);

	evt.preventDefault();
}

function addLog(evt) {
	var logsBox = evt.target.parentNode;
	var logInput = document.createElement("input");
	logInput.type = "file";
	logInput.size = 40;
	logInput.name = "logfiles[]";
	//logInput.multiple = true;
	logInput.addEventListener("change", tev_changeLogFile, false);
	
	
	var checkButton = document.createElement("button");
	checkButton.name = "whmf_check";
	checkButton.textContent = "Check log";
	checkButton.style.display = "none";
	//checkButton.style.cssFloat = "right";
	checkButton.style.width = "8em";
	checkButton.addEventListener("click", checkLog, false);
	
	var removeLink = document.createElement("a");
	removeLink.href = "#";
	removeLink.addEventListener("click", removeLog, false);
	removeLink.innerHTML = "[-]";
	
	// find the last button
	/*
	var previousButton = null;
	var buttons = $x("//button[@name='whmf_check']", logsBox, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
	buttons.forEach(function (f) { previousButton = f; });
	*/
	var previousButton = logsBox.lastElementChild;
	
	logsBox.insertBefore(document.createTextNode(" "), previousButton);
	logsBox.insertBefore(removeLink, previousButton);
	logsBox.insertBefore(document.createTextNode(" "), previousButton);

	logsBox.appendChild(document.createElement("br"));
	logsBox.appendChild(logInput);
	logsBox.appendChild(document.createTextNode(" "));
	logsBox.appendChild(checkButton);

	evt.preventDefault();
}

function deleteThisRow(evt) {
	var rowToRemove = evt.target.parentNode.parentNode;
	$x1("//tbody[@id='whmf_torrents']").removeChild(rowToRemove.nextSibling);
	$x1("//tbody[@id='whmf_torrents']").removeChild(rowToRemove);
	evt.preventDefault();
}

function addAnotherRow(evt) {
	var tTorrentCount = ($x("//tbody[@id='whmf_torrents']/tr", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).length)/2;
	if (tTorrentCount >= 6) { return; }
	var torrentRow1 = document.createElement("tr");
	torrentTable.appendChild(torrentRow1);
	torrentRow1.innerHTML = emptyTorrentRowHTML1;
	var torrentRow2 = document.createElement("tr");
	torrentTable.appendChild(torrentRow2);
	torrentRow2.innerHTML = emptyTorrentRowHTML2;
	$x("//a[@class='whmf_remove_row']", torrentRow1, XPathResult.FIRST_ORDERED_NODE_TYPE).addEventListener("click", deleteThisRow, false);
	$x("//input[@name='file_input']", torrentRow1, XPathResult.FIRST_ORDERED_NODE_TYPE).addEventListener("change", tev_changeFile, false);
	$x("//select[@name='format']", torrentRow1, XPathResult.FIRST_ORDERED_NODE_TYPE).addEventListener("change", tev_changeFormat, false);
	$x("//select[@name='bitrate']", torrentRow1, XPathResult.FIRST_ORDERED_NODE_TYPE).addEventListener("change", tev_changeBitrate, false);
	$x("//input[@name='other_bitrate']", torrentRow1, XPathResult.FIRST_ORDERED_NODE_TYPE).addEventListener("change", tev_changeOtherBitrate, false);
	$x("//abbr[@class='whmf_already_uploaded_marker']", torrentRow1, XPathResult.FIRST_ORDERED_NODE_TYPE).style.display = "none";
	$x("//span[@class='whmf_other_bitrate']", torrentRow1, XPathResult.FIRST_ORDERED_NODE_TYPE).style.display = "none";
	$x("//tr[@class='whmf_logfiles']", torrentRow2, XPathResult.FIRST_ORDERED_NODE_TYPE).style.display = "none";
	$x("//input[@name='logfiles[]']", torrentRow2, XPathResult.FIRST_ORDERED_NODE_TYPE).addEventListener("change", tev_changeLogFile, false);
	$x("//button[@name='whmf_check']", torrentRow2, XPathResult.FIRST_ORDERED_NODE_TYPE).addEventListener("click", checkLog, false);
	if (evt) evt.preventDefault();
}

// tev (torrent events)

function tev_changeLogFile(evt) {
	var field = evt.currentTarget;
	var row = field.parentNode;
	/*
	if (field.mozGetFileNameArray) {
		var num = 0;
		var files = {};
		//field.mozGetFileNameArray(num, files);
		files = field.files;
		
		if (files.length > 1) { // expand into seperate fields
			alert(files[0]);
			// todo: add files after this one, not just at the end
			for (var i = 1; i < files.length; i++) {
			}
			var fileArray = [files[0]];
			field.mozSetFileNameArray(fileArray, 1);
		}
	}
	*/
	
	var tLogCount = $x("//input[@name='logfiles[]']", row, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).length;
	var logNumber = 0;
	var fieldsSeen = 0;
	for (var i = 0; i < row.children.length; i++) {
		if (row.children[i].nodeName == "INPUT") {
			fieldsSeen++;
			if (row.children[i] == field) {
				logNumber = fieldsSeen;
				break;
			}
		}
	}
	
	var button = field;
	do {
		button = button.nextElementSibling;
	} while (button.nodeName != "BUTTON")
	
	button.disabled = false; // this probably never matters
	button.textContent = "Check log";

	if ((logNumber == tLogCount) && (field.value != "")) {
		addLog(evt);
	}
	
	if (field.value == "") return;

	// test for Chrome
	var clonedField = field.cloneNode(false);
	if (clonedField.value != "") {
		if ($x1("//div[@id='whmf_cease_automatically_checking_logs']") == null) {
			button.click();
		} else {
			button.style.display = "inline";
		}
	} else {
		button.style.display = "none";
	}
}

function tev_changeFile(evt) {
	var field = evt.currentTarget;
	var row = field.parentNode.parentNode; // <tr>
	var name = field.value;
	var formatBox = $x("//select[@name='format']", row, XPathResult.FIRST_ORDERED_NODE_TYPE);
	var bitrateBox = $x("//select[@name='bitrate']", row, XPathResult.FIRST_ORDERED_NODE_TYPE);
	var wantFormat = "";
	var wantBitrate = "";
	if (/[\[\(]V0[\]\)]\.torrent$/i.test(name)) { wantFormat = "MP3"; wantBitrate = "V0 (VBR)"; }
	else if (/[\[\(]V2[\]\)]\.torrent$/i.test(name)) { wantFormat = "MP3"; wantBitrate = "V2 (VBR)"; }
	else if (/[\[\(]q8[\]\)]\.torrent$/i.test(name)) { wantFormat = "Ogg"; wantBitrate = "q8.x (VBR)"; }
	else if (/[\[\(]q8\..[\]\)]\.torrent$/i.test(name)) { wantFormat = "Ogg"; wantBitrate = "q8.x (VBR)"; }
	else if (/[\[\(]ogg[\]\)]\.torrent$/i.test(name)) { wantFormat = "Ogg"; wantBitrate = "q8.x (VBR)"; }
	else if (/[\[\(]AAC[\]\)] ?[\[\(]320[\]\)]\.torrent$/i.test(name)) { wantFormat = "AAC"; wantBitrate = "320"; }
	else if (/[\[\(]320[\]\)] ?[\[\(]AAC[\]\)]\.torrent$/i.test(name)) { wantFormat = "AAC"; wantBitrate = "320"; }
	else if (/[\[\(]320AAC[\]\)]\.torrent$/i.test(name)) { wantFormat = "AAC"; wantBitrate = "320"; }
	else if (/[\[\(]AAC320[\]\)]\.torrent$/i.test(name)) { wantFormat = "AAC"; wantBitrate = "320"; }
	else if (/[\[\(]320[\]\)]\.torrent$/i.test(name)) { wantFormat = "MP3"; wantBitrate = "320"; }
	else if (/[\[\(]AAC[\]\)]\.torrent$/i.test(name)) { wantFormat = "AAC"; }
	else if (/[\[\(]FLAC[\]\)]\.torrent$/i.test(name)) { wantFormat = "FLAC"; }
	if (wantFormat != "") {
		var old = formatBox.selectedIndex;
		formatBox.selectedIndex = 0;
		var last = formatBox.options.length - 1;
		while ((formatBox.value != wantFormat) && (formatBox.selectedIndex < last)) formatBox.selectedIndex++;
		if (formatBox.value != wantFormat) {
			formatBox.selectedIndex = old;
		} else {
			var e = document.createEvent("UIEvents");
			e.initUIEvent("change", true, true, window, 1);
			formatBox.dispatchEvent(e);
		}
	}
	if (wantBitrate != "") {
		var old = bitrateBox.selectedIndex;
		bitrateBox.selectedIndex = 0;
		var last = bitrateBox.options.length - 1;
		while ((bitrateBox.value != wantBitrate) && (bitrateBox.selectedIndex < last)) bitrateBox.selectedIndex++;
		if (bitrateBox.value != wantBitrate) {
			bitrateBox.selectedIndex = old;
		} else {
			var e = document.createEvent("UIEvents");
			e.initUIEvent("change", true, true, window, 1);
			bitrateBox.dispatchEvent(e);
		}
	}
	
	if (field.value != "") considerAddingAnotherRow(evt);
}

function tev_changeFormat(evt) {
	var field = evt.currentTarget;
	var row = field.parentNode.parentNode; // <tr>
	var bitrateBox = $x("//select[@name='bitrate']", row, XPathResult.FIRST_ORDERED_NODE_TYPE);
	var wantBitrate = "";
	if (field.value == "FLAC") { wantBitrate = "Lossless"; } else { wantBitrate = "---"; }
	
	if (bitrateDisablerExtension) {
		var bitrateOptions = [ [0,0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,1,0,1,1,0], [0,1,1,1,1,1,1,1,1,1,0,0,0], [0,1,1,1,1,1,1,1,0,1,1,1,0], [0,0,1,1,1,0,1,1,1,0,1,1,0], [0,1,1,1,1,1,1,1,1,1,1,1,0], [0,1,1,1,1,1,1,1,1,1,1,1,0]];
		var availableOptions = 0;
		var lastAvailableOption = "---";
		for (var i = 0; i < bitrateBox.options.length; i++) {
			bitrateBox.options[i].disabled = bitrateOptions[field.selectedIndex][i];
			if ((i > 0) && (bitrateOptions[field.selectedIndex][i] == 0)) {
				availableOptions++;
				lastAvailableOption = bitrateBox.options[i].value;
			}
		}
		
		if (availableOptions == 1) {
			wantBitrate = lastAvailableOption;
		}
	}
	
	if (wantBitrate != "") {
		var old = bitrateBox.selectedIndex;
		bitrateBox.selectedIndex = 0;
		var last = bitrateBox.options.length - 1;
		while ((bitrateBox.value != wantBitrate) && (bitrateBox.selectedIndex < last)) bitrateBox.selectedIndex++;
		if (bitrateBox.value != wantBitrate) bitrateBox.selectedIndex = old;
		else {
			var e = document.createEvent("UIEvents");
			e.initUIEvent("change", true, true, window, 1);
			bitrateBox.dispatchEvent(e);
		}
	}
	$x("//tr[@class='whmf_logfiles']", row.nextSibling, XPathResult.FIRST_ORDERED_NODE_TYPE).style.display = (field.value == "FLAC") ? "table-row" : "none";
	
	if (field.value != "---") considerAddingAnotherRow(evt);
}

function tev_changeBitrate(evt) {
	var field = evt.currentTarget;
	var row = field.parentNode.parentNode; // <tr>
	$x("//span[@class='whmf_other_bitrate']", row, XPathResult.FIRST_ORDERED_NODE_TYPE).style.display = (field.value == "Other") ? "inline" : "none";

	if (field.value != "---") considerAddingAnotherRow(evt);
}

function tev_changeOtherBitrate(evt) {
	var field = evt.currentTarget;
	var row = field.parentNode.parentNode.parentNode; // <tr>
	var VBRCheckbox = $x("//input[@name='vbr']", row, XPathResult.FIRST_ORDERED_NODE_TYPE);
	if (field.value >= 320) {
		VBRCheckbox.disabled = true;
		VBRCheckbox.checked = false;
	} else {
		VBRCheckbox.disabled = false;
	}

	considerAddingAnotherRow(evt);
}

function considerAddingAnotherRow(evt) {
	var row = evt.currentTarget;
	var tTorrentCount = ($x("//tbody[@id='whmf_torrents']/tr", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).length)/2;
	while (row.nodeName != "TR") row = row.parentNode;
	var torrentNumber = 0;
	for (var i = 0; i < row.parentNode.children.length; i++) {
		if (row.parentNode.children[i] == row) {
			torrentNumber = i/2 + 1; // between 1 and tTorrentCount
			break;
		}
	}
	if (torrentNumber == 0) { // ?
	} else {
		if (torrentNumber == tTorrentCount) {
			addAnotherRow();
		}
	}
}

function setFields(selector, disable, col) {
	var fields = $x(selector + "//*", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
	fields.forEach(function (field) {
		if ((field.nodeName == "TEXTAREA") || (field.nodeName == "INPUT") || (field.nodeName == "SELECT")) {
			field.disabled = disable;
			//field.style.backgroundColor = col;
		}
	});
}

function freezeFields(selector, col) {
	var fields = $x(selector + "//*", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
	fields.forEach(function (field) {
		if ((field.nodeName == "TEXTAREA") || (field.nodeName == "INPUT") || (field.nodeName == "SELECT")) {
			var newField = document.createElement("input");
			newField.type = "hidden";
			newField.name = field.name;
			newField.value = field.value;
			var successful = true;
			if ((field.nodeName == "INPUT") && (field.type == "checkbox") && (!field.checked)) successful = false;
			if (successful) field.parentNode.insertBefore(newField, field);
			field.disabled = true;
			//field.style.backgroundColor = col;
		}
	});
}

function formSubmit(evt) {
	if ($x1("//form[@id='upload_table']//input[@type='submit']").disabled) return;
	$x1("//form[@id='upload_table']//input[@type='submit']").disabled = true;
	torrentCount = ($x("//tbody[@id='whmf_torrents']/tr", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).length)/2;
	politeBox2.value = torrentCount;
	while (true) {
		torrentUploading++;
		politeBox3.value = torrentUploading;
		if (torrentUploading == 1) { // first
			if (document.getElementById("whmf_torrent_status")) {
				statusTable.parentNode.parentNode.removeChild(statusTable.parentNode);
			}
			var statusTable2 = document.createElement("table");
			statusTable2.style.marginBottom = "2em";
			statusTable = document.createElement("tbody");
			statusTable.id = "whmf_torrent_status";
			statusTable2.appendChild(statusTable);
			$x1("//input[@id='post']").parentNode.insertBefore(statusTable2, $x1("//input[@id='post']"));
			for (c = 1; c <= torrentCount; c++) {
				statusTable.innerHTML += "<tr><td>Torrent file " + c + "</td><td>&mdash;</td></tr>";
			}
		}
		if (torrentUploading > torrentCount) { // finished
			// if (everything was successful ...) {
			// } else {
				resetAfterError();
			// }
			evt.preventDefault();
		} else {
			setFields("//tbody[@id='whmf_torrents']", true, "#00f");
			var rowA = torrentUploading * 2 - 1; // 1, 3, 5...
			var rowB = rowA + 1;
			var already = false;
			if ($x1("//tbody[@id='whmf_torrents']//tr[" + rowA + "]//input[@name='whmf_already_uploaded']").value == 1) already = true;
			var description = "";
			var problematic = false;
			var filename = $x1("//tbody[@id='whmf_torrents']/tr[" + rowA + "]//*[@name='file_input']").value.replace(/^.*\\/, "");
			description += filename.replace(".torrent", "");
			if (filename == "") problematic = true;
			else description += ": ";
			var format = $x1("//tbody[@id='whmf_torrents']/tr[" + rowA + "]//*[@name='format']").value;
			description += format;
			description += " / ";
			if (format == "---") problematic = true;
			var bitrate = $x1("//tbody[@id='whmf_torrents']/tr[" + rowA + "]//*[@name='bitrate']").value;
			description += bitrate;
			if (bitrate == "---") problematic = true;
			$x1("//tbody[@id='whmf_torrent_status']//tr[" + torrentUploading + "]/td[1]").textContent = description;
			if (already) {
				$x1("//tbody[@id='whmf_torrent_status']//tr[" + torrentUploading + "]/td[2]").innerHTML = $x1("//tbody[@id='whmf_torrents']/tr[" + rowA + "]//input[@name='whmf_already_uploaded_message']").value;
				continue;
			} else if (problematic) {
				$x1("//tbody[@id='whmf_torrent_status']//tr[" + torrentUploading + "]/td[2]").innerHTML = "Sorry, you didn't fill this row in properly.";
				continue;
			} else {
				$x1("//tbody[@id='whmf_torrent_status']//tr[" + torrentUploading + "]/td[2]").innerHTML = "Uploading...";
				setFields("//tbody[@id='whmf_torrents']/tr[" + rowA + "]", false, "#f00");
				setFields("//tbody[@id='whmf_torrents']/tr[" + rowB + "]", false, "#ff0");
			}
		}
		break;
	}
}

function stopUploads() {
	for (var c = torrentUploading+1; c <= torrentCount; c++) {
		var rowA = c * 2 - 1;
		var rowB = rowA + 1;
		if ($x1("//tbody[@id='whmf_torrents']//tr[" + rowA + "]//input[@name='whmf_already_uploaded']").value == 1) continue;
		$x1("//tbody[@id='whmf_torrent_status']//tr[" + c + "]/td[2]").innerHTML = "Cancelled, not uploaded";
	}
}

function formResult(evt) {
	if (torrentUploading == 0) return; // not submitted yet
	if (formTarget.contentDocument.title == "Upload :: What.CD") { // an error!
		var err = formTarget.contentDocument.evaluate("//div[@id='content']//div[@class='thin']/p[2]", formTarget.contentDocument, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (err.snapshotItem(0) != null) {
			$x1("//tbody[@id='whmf_torrent_status']//tr[" + torrentUploading + "]/td[2]").innerHTML = "Error: " + err.snapshotItem(0).innerHTML;
		} else {
			$x1("//tbody[@id='whmf_torrent_status']//tr[" + torrentUploading + "]/td[2]").innerHTML = "Error of unknown flavour.";
		}
		stopUploads();
		resetAfterError();
	} else {
		var url = ""; // the url of the torrent group, please
		var another = true; // press submit again? ^_^
		var markUploaded = true; // put a smiley face on this torrent?
		if (formTarget.contentDocument.title == "Warning :: What.CD") { // private bit wasn't set!
			var links = formTarget.contentDocument.evaluate("//div[@id='content']//a", formTarget.contentDocument, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; i < links.snapshotLength; i++) {
				var match = /torrents\.php\?id=(\d+)/.exec(links.snapshotItem(i).href);
				if (match != null) {
					url = links.snapshotItem(i).href;
				}
			}
			if (url == "") {
				$x1("//tbody[@id='whmf_torrent_status']//tr[" + torrentUploading + "]/td[2]").innerHTML = "Something has gone wrong: " + formTarget.contentDocument.getElementById("content").textContent;
				stopUploads();
				another = false;
				markUploaded = false;
				resetAfterError();
			} else {
				$x1("//tbody[@id='whmf_torrent_status']//tr[" + torrentUploading + "]/td[2]").innerHTML = "Successful! You didn't choose the private option, so you must download your torrent from <a href=\"" + url + "\">here</a> to seed it.";
			}
		} else {
			$x1("//tbody[@id='whmf_torrent_status']//tr[" + torrentUploading + "]/td[2]").innerHTML = "Successful! View the upload here: <a href=\"" + formTarget.contentDocument.baseURI + "\">" + formTarget.contentDocument.title.replace(" :: What.CD", "") + "</a>";
		}
		if (markUploaded) {
			var rowA = torrentUploading * 2 - 1;
			var rowB = rowA + 1;
			$x1("//tbody[@id='whmf_torrents']/tr[" + rowA + "]//input[@name='whmf_already_uploaded']").value = 1;
			$x1("//tbody[@id='whmf_torrents']/tr[" + rowA + "]//input[@name='whmf_already_uploaded_message']").value = $x1("//tbody[@id='whmf_torrent_status']//tr[" + torrentUploading + "]/td[2]").innerHTML;
			$x1("//tbody[@id='whmf_torrents']/tr[" + rowA + "]//a[@class='whmf_remove_row']").style.display = "none";
			$x1("//tbody[@id='whmf_torrents']/tr[" + rowA + "]//abbr[@class='whmf_already_uploaded_marker']").style.display = "inline";
			if (!haveGroup) {
				if (url == "") url = formTarget.contentDocument.baseURI;
				var match = /id=(\d+)$/.exec(url);
				if (match == null) { // dazed and confused
					alert("couldn't get match... shit shit shit");
					another = false;
				} else {
					groupBox.disabled = false;
					groupBox.value = match[1];
					haveGroup = true;
					setFields("//tr[@id='artist_tr']", true, "#33f");
					setFields("//tr[@id='title_tr']", true, "#33f");
					setFields("//tr[@id='year_tr']", true, "#33f");
					setFields("//tr[@id='label_tr']", true, "#33f");
					setFields("//tr[@id='catalogue_tr']", true, "#33f");
					setFields("//tr[@id='releasetype_tr']", true, "#33f");
					setFields("//input[@id='image']/ancestor::tr", true, "#33f");
					setFields("//input[@name='tags']/ancestor::tr", true, "#33f");
					setFields("//textarea[@id='album_desc']/ancestor::tr", true, "#33f");
				}
			}
			if (torrentUploading == torrentCount) { // todo: send to happy page?
			}
			freezeFields("//input[@id='remaster']/ancestor::tr", "#33f"); // disable the edition information <tr>
			//freezeFields("//input[@id='scene']/ancestor::tr", "#33f"); //unnecessary, there are no fields there :-)
			freezeFields("//select[@id='media']/ancestor::tr", "#33f");
		}
		
		// not sure why this needs to be delayed
		if (another) {
			//todo: if torrentUploading is the last one
			if (torrentUploading < torrentCount) {
				$x1("//tbody[@id='whmf_torrent_status']//tr[" + (torrentUploading+1) + "]/td[2]").innerHTML = "Please wait...";
			}
			$x1("//form[@id='upload_table']//input[@type='submit']").disabled = false;
			setTimeout("document.getElementById(\"post\").click()", 300);
		}
	}
}

function resetAfterError() {
	setFields("//tbody[@id='whmf_torrents']", false, "#fff");
	for (var c = 1; c <= torrentCount; c++) {
		var rowA = c * 2 - 1; // 1, 3, 5...
		var rowB = rowA + 1;
		if ($x1("//tbody[@id='whmf_torrents']/tr[" + rowA + "]//input[@name='whmf_already_uploaded']").value == 1) {
			setFields("//tbody[@id='whmf_torrents']/tr[" + rowA + "]", true, "#fc6");
			setFields("//tbody[@id='whmf_torrents']/tr[" + rowB + "]", true, "#fc6");
		}
	}
	torrentUploading = 0;
	$x1("//form[@id='upload_table']//input[@type='submit']").disabled = false;
}

var uploadTable = $x1("//*[@id='upload_table']");

if (uploadTable) {
	var offerBox = document.createElement("div");
	offerBox.id = "whmf_offer";
	offerBox.style.textAlign = "center";
	offerBox.style.border = "1px solid black";
	offerBox.style.paddingTop = offerBox.style.paddingBottom = offerBox.style.marginBottom = "1em";
	offerBox.style.marginLeft = offerBox.style.marginRight = "5em";	
	offerBox.style.fontWeight = "bold";
	offerBox.innerHTML = "<span>Would you like to use the multiple format uploader Greasemonkey script?</span><br><br>";
	
	var yesButton = document.createElement("button");
	yesButton.innerHTML = "Yes";
	yesButton.addEventListener("click", attemptToInitialiseScript, false);
	var noButton = document.createElement("button");
	noButton.innerHTML = "No";
	noButton.addEventListener("click", scriptRejected, false);
	
	warned = false;
	labUrl = "forums.php?action=viewthread&threadid=91726";

	offerBox.appendChild(yesButton);	
	offerBox.appendChild(document.createTextNode(String.fromCharCode(0x2003)));
	offerBox.appendChild(noButton);
	
	var stopper = $x1("//*[@id='whmf_cease_and_desist']");
	if ((stopper != null) && ((stopper.textContent == "") || (scriptVersion < stopper.textContent))) {
		offerBox.innerHTML = "Sorry, found a <tt>whmf_cease_and_desist</tt> element on the page. This installation of Gazelle refuses this script. Maybe there's an update to this Greasemonkey script?";
	}

	uploadTable.parentNode.insertBefore(offerBox, uploadTable);
}

function attemptToInitialiseScript() {
	if ($x1("//select[@id='categories']").value != "Music") {
		alert("Sorry, this Greasemonkey script is only for music torrents.");
		return;
	}

	if ($x1("//input[@id='scene']").checked) {
		alert("Sorry, this Greasemonkey script does not support uploading scene releases.");
		return;
	}

	if (warned) {
		// you asked for it!!!11
		initialiseScript();
		return;
	}
	
	var ready = true;
	var problems = "<ul>";

	var d = new Date();
	var now = d.getTime();
	var daysSinceRelease = Math.floor((d.getTime() - builtOn) / (1000 * 3600 * 24));
	if (daysSinceRelease > 14) {
		var builtOnDate = new Date(builtOn);
		ready = false;
		problems += "<li>You are running version " + scriptBuild + " of this Greasemonkey script, which was released on " + builtOnDate.toLocaleDateString() + ". Please check the <a href=\"" + labUrl + "\">lab thread</a> for updates.</li>";
	}
	
	if ($x1("//div[@id='whmf_warning']") != null) {
		ready = false;
		problems += "<li>\"" + $x1("//div[@id='whmf_warning']").innerHTML + "\"</li>";
	}

	if ((!/Firefox\/3\.[5-9]/.test(navigator.userAgent)) && (!/Chrome\/[4-5]/.test(navigator.userAgent))) {
		ready = false;
		problems += "<li>You are not running Firefox 3.6 or higher, or Chrome 4 or 5. This script was tested on Firefox 3.6.3 and has been reported to work on other browsers - check the <a href=\"" + labUrl + "\">lab thread</a>. [" + navigator.userAgent + "]</li>";
	}
	
	var footerLine = $x1("//div[@id='footer']/p[3]");
	if (footerLine == null) footerLine = $x1("//div[@id='footer']/p[2]");
	if (footerLine != null) {
		var gazelleRevision = /Rev: *(\d+)/.exec(footerLine.textContent);
		gazelleRevision = gazelleRevision[1];
		if (gazelleRevision > builtForVersion) {
			ready = false;
			problems += "<li>what.cd is running Gazelle revision " + gazelleRevision + " and this script was last tested on version " + builtForVersion + " (but this is almost certainly okay)</li>";
		}
	}
	
	if ($x1("//li[@id='stats_seeding']//span[@class='stat']") != null) {
		var uploaded = $x1("//li[@id='stats_seeding']//span[@class='stat']").textContent;

		if (!(/[EPT]B/.test(uploaded) || (/GB/.test(uploaded) && /\d\d\./.test(uploaded)))) {
			ready = false;
			problems += "<li>No offense, but you haven't uploaded very much. Please make sure you're very familiar with the rules before using this timesaving script. Used incorrectly it could result in your uploads being reported (more often than usual ;-) ).</li>";
		}
	}
	
	if ($x1("//input[@name='requestid']") != null) {
		ready = false;
		problems += "<li>You will have to press the Upload button, then fill <a href=\"requests.php?action=view&id=" + $x1("//input[@name='requestid']").value + "\">the request</a> manually later.</li>";
	}
	
	if ($x1("//div[@id='dynamic_form']/table/tbody").children.length != 16) {
		ready = false;
		problems += "<li>The form layout has changed to some extent! This could be serious.</li>";
	}
	
	problems += "</ul>";
	if (ready) initialiseScript();
	else {
		$x1("//div[@id='whmf_offer']/span").innerHTML = "There may be some problems: " + problems + "<br>Continue anyway?";
		warned = true;
	}
}

function scriptRejected(evt) {
	var offerBox = document.getElementById("whmf_offer");
	offerBox.innerHTML = "Multiple format uploader disabled. Please <a href=\"#\" onClick=\"window.location.href=window.location.href.replace('#',''); return false;\">reload the page</a> to use multiple format uploader.";
}

function thread() {
	var ssl = /https/.test(window.location.href);
	GM_openInTab((ssl ? "https://ssl.what.cd" : "http://what.cd") + "/" + labUrl);
}


GM_registerMenuCommand("what.cd multiple format uploads: Visit Lab thread", thread);

/*
// http://userscripts.org/scripts/show/20145
var SUC_script_num = 75399;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
*/