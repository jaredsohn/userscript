// ==UserScript==
// @name           [ICE] Clickmaster
// @description    Enhances Incinerators Clickmaster
// @include        http://blie-flame.net/clickmaster/*
// @include 	   http://www.darkthrone.com/recruiter/outside/*
// @author		   theZero
// @author		   zerovolcom87@gmail.com
// ==/UserScript==

var page = document.URL.split("/");

switch (page[3]) {
	case "clickmaster": {
		document.getElementsByName("r_text")[0].addEventListener("click", populate_verify_box, false);
	
		clickmaster_page_ident();
	}
	break;
	case "recruiter": {
		validate_recruit_page();
	}
	break;
}

function clickmaster_page_ident() {
	switch (document.getElementsByTagName("title")[0].innerHTML.split(" ")[0]) {
		case "Incinerators": {
			return;
		}
		break;
		case "ClickMaster": {		
			populate_clickmaster_page();
		}
		break;
	}
}

function populate_clickmaster_page() {
	var rLink = document.getElementsByTagName("a")[0];

	var iframe = document.createElement("iframe");
	
	iframe.scrolling = "no";
	
	iframe.width = 1200;
	
	iframe.height = 800;
	
	iframe.src = rLink;
	
	var iframeCol = document.createElement("td");
	
	iframeCol.appendChild(iframe);
	
	document.getElementsByTagName("tr")[0].appendChild(iframeCol);
	
	document.getElementsByName("DoCont")[0].checked = true;
}

function validate_recruit_page() {
	var vMessage = document.getElementById("population_increase");

	if (vMessage != null) {
		GM_setValue("verify", vMessage.innerHTML);
	}
	else {
		var cTable = document.getElementsByClassName("message_table")[0];
	
		var tdElement = cTable.getElementsByTagName("tr")[1].getElementsByTagName("td")[0];
	
		if (tdElement.innerHTML.indexOf("once per day") > 0) {
			GM_setValue("verify", "null");
		}
	}
}

function populate_verify_box() {
	if (GM_getValue("verify") === "null") {
		document.getElementsByName("DoSkipp")[0].click();
	}
	else {
		document.getElementsByName("r_text")[0].value = GM_getValue("verify");
	}
}