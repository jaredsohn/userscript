// ==UserScript==
// @name           get BBCODE from SkyDrive
// @include        https://skydrive.live.com/*
// @author         congxz6688
// @version        2013.2.19
// ==/UserScript==

GM_addStyle("#myNewText{width:150px; margin-left:5px;} #getButton{margin-left:5px;}");
var theboys = document.getElementById("LeftNavBar-2_0");
var checkalll = document.createElement("input");
checkalll.type = "button";
checkalll.id = "getButton";
checkalll.value = "获取链接";
checkalll.addEventListener("click", checkAll, false);
theboys.appendChild(checkalll);

function checkAll() {
	var allInput = document.querySelectorAll('.checkboxWrapper>input,.checkbox');
	var allArray = "";
	var allChecked = "";
	for (ll = 0; ll < allInput.length; ll++) {
		if (document.getElementById("SetView-0_6").getAttribute("class").indexOf("selected") != -1) {
			var localDiv = allInput[ll].parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("item-key");
		} else if (document.getElementById("SetView-0_5").getAttribute("class").indexOf("selected") != -1) {
			var localDiv = allInput[ll].parentNode.parentNode.parentNode.parentNode.getAttribute("item-key");
		}
		var eId = localDiv.split("&cid=")[0].replace("id=", "");
		if(eId=="groupHeader-0"){
			continue;
		}else{
			allArray += ((allArray == "") ? "" : "\r\n\r\n") + "http://storage.live.com/items/" + eId;
			if (allInput[ll].checked) {
				allChecked += ((allChecked == "") ? "" : "\r\n\r\n") + "http://storage.live.com/items/" + eId;
			}
		}
	}
	if (!document.getElementById("myNewText")) {
		var newArea = document.createElement("textarea");
		newArea.id = "myNewText";
		newArea.rows = "10";
		newArea.value = (allChecked != "") ? allChecked : allArray;
		newArea.setAttribute("readonly", "readonly");
		newArea.addEventListener("click", function(){this.select();}, false);
		theboys.appendChild(newArea);
	} else {
		document.getElementById("myNewText").value = (allChecked != "") ? allChecked : allArray;
	}
}
