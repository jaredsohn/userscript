// ==UserScript==
// @name           Copy Profiles
// @namespace      roirevolution.com
// @description    Copy the settings from one profile to another profile
// @include        http://www.google.com/analytics/settings/*
// @include        https://www.google.com/analytics/settings/*
// @include	   	 https://adwords.google.com/analytics/settings/*
// ==/UserScript==

// Version 0.2.7

// Remove comments for testing purposes

//GM_setValue("stage", 0);
//console.log(GM_getValue("stage"));

// I made this section after Julien Coquet's translation of the script 
// to simplify translating future updates of the script. I think these 
// are all the language specific variables, but I may have missed some. 

var copy = "Copy",
    paste = "Paste",
    paste_filters_button_text = "Paste Filters",
    filter_warning = "Can't copy filters to same account";

// Main Code

function mainCode() {

	function doCopy() {
		var i, 
		editLink = document.getElementsByClassName("action_link"), 
		copyLink,
		pasteLink, 
		vertTemp,
		vert1,
		vert2,
		accountNum,
		success = true,
  		inserted = document.getElementById("inserted"),
		scidmatch;
		
		scidMatch = /scid=(\d+)(&|$|#$)/.exec(location.href);
		if (scidMatch) {
			GM_setValue("scid", scidMatch[1]);
		}

		if (!inserted) {
			if (editLink && editLink.length) {
				vertTemp = document.createElement('td');
				vertTemp.align = "left";
				vertTemp.style.verticalAlign = "top";
				vertTemp.innerHTML = '<div class="gwt-HTML">&nbsp;|&nbsp;</div>';
				for (i = 0; i < editLink.length; i++) {
					vert1 = vertTemp.cloneNode(true);
					if (i == 0) { 
						vert1.id = "inserted";
					}
					vert2 = vertTemp.cloneNode(true);
					editParent = editLink[i].parentNode;
					copyLink = editParent.cloneNode(true);
					pasteLink = editParent.cloneNode(true);
					accountNum = editLink[i].innerHTML.match(/\?id=(\d+)/);
					if(accountNum) {
						accountNum = accountNum[1];
						copyLink.id = "copy" + i;
						copyLink.title = accountNum;
						pasteLink.title = accountNum;
						copyLink.firstChild.innerHTML = '<a href="javascript:void(0)">' + copy + '</a>';
						pasteLink.firstChild.innerHTML = '<a href="edit_profile?id=' + accountNum + '">' + paste + '</a>';
						copyLink.addEventListener("click", function() { for (j = 0; j < editLink.length; j += 1) { document.getElementById("copy" + j).style.fontWeight = ""; } this.style.fontWeight = "bold"; GM_setValue("copy_account", this.title); }, true); 
						pasteLink.addEventListener("click", function() { GM_setValue("paste_account", this.title); GM_setValue("stage", 1); GM_setValue("home", location.href); }, true); 
						copyLink.innerHTML = copyLink.innerHTML.replace("action_link","copy_link");
						pasteLink.innerHTML = pasteLink.innerHTML.replace("action_link","paste_link");
						editParent.parentNode.appendChild(vert1);
						editParent.parentNode.appendChild(copyLink);
						editParent.parentNode.appendChild(vert2);
						editParent.parentNode.appendChild(pasteLink);
					} else {
						i = editLink.length;
						setTimeout(function() { doCopy(); }, 100);
						success = false;
					}             
				}
			} else {
				setTimeout(function() { doCopy(); }, 100);
				success = false;
			}
		}
		if (success) {
		    document.addEventListener("DOMNodeInserted", mainCode, false);
		}
	}
	
	function nextGoal(stage) {
		switch(stage) {
		case 3:
			GM_setValue("stage", 4);
			location.href = location.protocol + "//" + location.hostname + "/analytics/settings/edit_goal?id=" + GM_getValue("paste_account") + "&goalNumber=" + GM_getValue("goal_number");
			break;
		case 6:
			GM_setValue("stage", 7);
			location.href = location.protocol + "//" + location.hostname + "/analytics/settings/add_profile_filter?id=" + GM_getValue("paste_account") + "&scid=" + GM_getValue("scid");
			break;
		}
	}

	function filterCopy() {
		GM_setValue("stage", 7);
		location.href = location.protocol + "//" + location.hostname + "/analytics/settings/add_profile_filter?id=" + GM_getValue("paste_account") + "&scid=" + GM_getValue("scid");
	}
	
	function newCopyGoal() {
		if (GM_getValue("goal_number") <= 20) {
			GM_setValue("stage", 13);
			location.href = location.protocol + "//" + location.hostname + "/analytics/settings/edit_goal?id=" + GM_getValue("copy_account") + "&goalNumber=" + GM_getValue("goal_number");
		} else {
			GM_setValue("goal_number", 0);
			filterCopy();
		}
	}
	

	function goalReady() {
		var gwt = document.getElementsByClassName("gwt-ListBox");
		if (gwt && gwt[0]) {
			gwt[0].addEventListener("DOMNodeInserted", function(event) { 
				var that = this;
				setTimeout(function () {
					if (GM_getValue("goal_number") == event.target.value) {
						switch(GM_getValue("stage")) {
						case 13: 
							setTimeout(function() { copyGoals(); }, 100);
							break;
						case 14:
							setTimeout(function() { pasteGoals(); }, 100);
							break;
						}
						that.removeEventListener("DOMNodeInserted", arguments.callee, false);	
					}
				 }, 0);
			}, false);
			document.removeEventListener("DOMNodeInserted", goalReady, false);
		}
	}

		
	function copyGoals() {
		var goals = document.getElementById("GoalsUi-ROOT"),
			goalName = document.getElementsByClassName("gwt-TextBox")[0],
			inputTags,
			selectTags,
			evObj,
			i;
		
		console.l
		try {
			evObj = document.createEvent('MouseEvents');
		  	evObj.initEvent('click', true, false);
	  		document.getElementsByClassName("funnel-create-label")[0].dispatchEvent(evObj);
			document.getElementsByClassName("add-funnel-step")
			for(i = 0; i < 20; i += 1) {
				document.getElementsByClassName("add-funnel-step")[0].dispatchEvent(evObj);
			}

		} catch(err) {}


		if (goalName.value) {
			GM_setValue("stage", 14);
			inputTags = goals.getElementsByTagName("input");
			for (i = 0; i < inputTags.length; i++) {
					if (inputTags[i].type == "radio" || inputTags[i].type == "checkbox") {
					GM_setValue("input" + i, inputTags[i].checked);
				} else {
					GM_setValue("input" + i, inputTags[i].value);
				}
			}
			selectTags = goals.getElementsByTagName("select");
			for (i = 0; i < selectTags.length; i++) {
				GM_setValue("select" + i, selectTags[i].value);
			}
			location.href = location.protocol + "//" + location.hostname + "/analytics/settings/edit_goal?id=" + GM_getValue("paste_account") + "&goalNumber=" + GM_getValue("goal_number");
		} else {
			GM_setValue("goal_number", Number(GM_getValue("goal_number") + 1));
			newCopyGoal();
		}	
	}
		
	function pasteGoals() {
		var goals = document.getElementById("GoalsUi-ROOT"),
			inputTags,
			selectTags,
			evObj,
			i;

		try {
			document.getElementById("gwt-uid-5").click();
			evObj = document.createEvent('MouseEvents');
		  	evObj.initEvent('click', true, false);
	  		document.getElementsByClassName("funnel-create-label")[0].dispatchEvent(evObj);
			document.getElementsByClassName("add-funnel-step")
			for(i = 0; i < 20; i += 1) {
				document.getElementsByClassName("add-funnel-step")[0].dispatchEvent(evObj);
			}

		} catch(err) {}

		GM_setValue("goal_number", Number(GM_getValue("goal_number") + 1));
		GM_setValue("stage", 15);
		inputTags = goals.getElementsByTagName("input");
		for (i = 0; i < inputTags.length; i++) {
			if (inputTags[i].type == "radio" || inputTags[i].type == "checkbox") {
				if (GM_getValue("input" + i)) {
					inputTags[i].click();
				}
			} else {
				inputTags[i].value = GM_getValue("input" + i);
			}
		}
		selectTags = goals.getElementsByTagName("select");
		for (i = 0; i < selectTags.length; i++) {
			selectTags[i].value = GM_getValue("select" + i);
		}
		document.getElementsByClassName("gwt-Button")[0].click();
	}

	function goalNext() {
		var goalStart = document.getElementById("GoalsUi-ROOT"),
		    goalFinish = document.getElementById("finish");
	
		
		if (goalStart || goalFinish) {
			if (goalFinish) {
				GM_setValue("stage", 5);
				GM_setValue("paste_security", document.getElementsByName("security_token")[0].value);
			} else if (goalStart) {
				GM_setValue("stage", 13);
			}  
			location.href = location.protocol + "//" + location.hostname + "/analytics/settings/edit_goal?id=" + GM_getValue("copy_account") + "&goalNumber=" + GM_getValue("goal_number");
		} else {
			setTimeout(function () { goalNext(); }, 100);
		}
	}

	if (location.pathname.match("^/analytics/settings/(home)?$")) {
		GM_setValue("stage", 0);
	}	

	document.removeEventListener("DOMNodeInserted", mainCode, false);

	switch(GM_getValue("stage")) {
	case 1: 
		GM_setValue("stage", 2);
		GM_setValue("paste_name", document.getElementsByName("ucpr_name")[0].value);
		GM_setValue("paste_security", document.getElementsByName("security_token")[0].value);
		GM_setValue("paste_time", document.getElementsByName("utpr_mtime")[0].value);
		GM_setValue("mform_action", document.getElementsByName("mform")[0].action);
		location.href = location.protocol + "//" + location.hostname + "/analytics/settings/edit_profile?id=" + GM_getValue("copy_account");
		break;
	case 2:
		GM_setValue("stage", 3);
		GM_setValue("goal_number", 1);
		document.getElementsByName("ucpr_name")[0].value = GM_getValue("paste_name");
		document.getElementsByName("security_token")[0].value = GM_getValue("paste_security");
		document.getElementsByName("utpr_mtime")[0].value = GM_getValue("paste_time");
		document.getElementsByName("mform")[0].action = GM_getValue("mform_action");
		document.getElementById("finish").click();
		break;
	case 3:
		GM_setValue("stage", 4);
		location.href = location.protocol + "//" + location.hostname + "/analytics/settings/edit_goal?id=" + GM_getValue("paste_account") + "&goalNumber=" + GM_getValue("goal_number");
		break;
	case 4:
		goalNext(); 
		break;
	case 5:
		if (GM_getValue("goal_number") == 4) {
			GM_setValue("goal_number", 0);
			GM_setValue("stage", 6);
		} else {
			GM_setValue("goal_number", Number(GM_getValue("goal_number") + 1));
			GM_setValue("stage", 3);
		}
		document.getElementsByName("security_token")[0].value = GM_getValue("paste_security");
		document.getElementsByName("mform")[0].action = document.getElementsByName("mform")[0].action.replace(GM_getValue("copy_account"), GM_getValue("paste_account"));    
		if(document.getElementsByName("ucgo_name")[0].value && document.getElementsByName("ucgo_path")[0].value) { 
			document.getElementById("finish").click();
		} else {
			nextGoal(GM_getValue("stage"));
		}    
		break;
	case 6:
		filterCopy();
		break;
	case 7:
		GM_setValue("stage", 8);
		document.getElementById("change").click();
		GM_setValue("paste_security", document.getElementsByName("security_token")[0].value);
		location.href = location.protocol + "//" + location.hostname + "/analytics/settings/add_profile_filter?id=" + GM_getValue("copy_account") + "&scid=" + GM_getValue("scid");
		break;
	case 8:
		GM_setValue("stage", 9);
		document.getElementById("change").click();
		document.getElementsByName("security_token")[0].value = GM_getValue("paste_security");
		ids = document.getElementsByName("id")
		for(i = 0; i < ids.length ; i++) {
			if (ids[i].nodeName == "INPUT") {
				ids[i].value = GM_getValue("paste_account");
			}
		}
		document.getElementsByName("return_list")[0].value = GM_getValue("paste_account");
		document.getElementById("finish").click();
		break;
	case 9:
		GM_setValue("stage", 10);
		location.href = location.protocol + "//" + location.hostname + "/analytics/settings/add_profile_user?id=" + GM_getValue("paste_account") + "&scid=" + GM_getValue("scid");
		break;
	case 10:
		GM_setValue("stage", 11);
		document.getElementsByName("ubus_new")[1].click();
		GM_setValue("paste_security", document.getElementsByName("security_token")[0].value);
		location.href = location.protocol + "//" + location.hostname + "/analytics/settings/add_profile_user?id=" + GM_getValue("copy_account") + "&scid=" + GM_getValue("scid");
		break;
	case 11:
		GM_setValue("stage", 12);
		document.getElementsByName("ubus_new")[1].click();
		document.getElementsByName("security_token")[0].value = GM_getValue("paste_security");
		ids = document.getElementsByName("id")
		for(i = 0; i < ids.length ; i++) {
			if (ids[i].nodeName == "INPUT") {
				ids[i].value = GM_getValue("paste_account");
			}
		}
		document.getElementsByName("selected_profiles_list")[0].value = GM_getValue("paste_account") + ",";
		document.getElementById("finish").click();
		break;
	case 12:
		GM_setValue("stage", 0);
		location.href = GM_getValue("home");
		break;
	case 13:
		document.addEventListener("DOMNodeInserted", goalReady, false);
		break;
	case 14:
		document.addEventListener("DOMNodeInserted", goalReady, false);
		break;
	case 15:
		newCopyGoal();
		break;
	default:
		if (location.href.match("home|settings/(\\?|$|#)")) {    
			GM_setValue("stage", 0);
			doCopy();
		}
	}
}

function copyFilters() {
	var adminCells = document.getElementsByClassName("admin_list_cell"),

	    adminTitles = document.getElementsByClassName("admin_list_ctitle"),
	    deleteTitle,
	    pasteButton,
	    copyCell,
	    i,
	    numFilters = 1;
	    
	GM_setValue("scid", location.href.match(/scid=(\d+)/)[1]);
	pasteButton = document.createElement("td");
	pasteButton.innerHTML = '&nbsp;<input type="button" value="' + paste_filters_button_text +'"></input>';
	pasteButton.addEventListener("click", function() {
		if (GM_getValue("scid") == GM_getValue("copy_scid")) {
			alert(filter_warning);
		} else {
			GM_setValue("filter_number", 1);
			GM_setValue("paste_scid", GM_getValue("scid"));
			location.href = location.protocol + "//" + location.hostname + "/analytics/settings/add_filter?scid=" + GM_getValue("scid");
		}
	}, false);
	document.getElementsByName("search")[0].parentNode.parentNode.appendChild(pasteButton);
	
	deleteTitle = adminTitles[adminTitles.length - 1];
	copyCell = deleteTitle.cloneNode(true);
	copyCell.innerHTML = "<a href='javascript:void(0);'>" + copy + "</a>&nbsp;&nbsp;&nbsp;<input type='checkbox' onclick='javascript:var copyFilters = document.getElementsByName(&quot;copyFilter&quot;); for(i=0;i<copyFilters.length;i++){copyFilters[i].checked = this.checked; }'></input>";
	copyCell.addEventListener("click", function() { 
		var copyFilters = document.getElementsByName("copyFilter");
		for (i = 0; i < copyFilters.length; i++) {
			if (copyFilters[i].checked) {
				GM_setValue("filter" + numFilters, copyFilters[i].id);
				numFilters++;
			}
		}
		GM_setValue("max_filters", numFilters);
		numFilters = 0;
		GM_setValue("copy_scid", GM_getValue("scid"));
	}, false);
	deleteTitle.parentNode.appendChild(copyCell);

	for(i = 0; i < adminCells.length; i++) {
		if (adminCells[i].innerHTML.indexOf("confirmDelete") !== -1) {
			copyCell = adminCells[i].cloneNode(true);
			copyCell.innerHTML = "<input id='" + adminCells[i].innerHTML.match(/\d+/) + "' name='copyFilter' type='checkbox'></input>";
			adminCells[i].parentNode.appendChild(copyCell);
		}
	}
	
}

function securityCode() {
	GM_setValue("filter_security", document.getElementsByName("security_token")[0].value); 
	location.href = location.protocol + "//" + location.hostname + "/analytics/settings/edit_filter?rid=" + GM_getValue("filter" + GM_getValue("filter_number")) + "&scid=" + GM_getValue("copy_scid");
}				

function pasteFilters() {
	var rid=document.getElementsByName("rid")[0],
	    filterNumber = GM_getValue("filter_number");
	filterNumber++;
	if(filterNumber == GM_getValue("max_filters")) {
		GM_setValue("filter_number", 0);
	} else {
		GM_setValue("filter_number", filterNumber);
	}
	document.getElementsByName("security_token")[0].value = GM_getValue("filter_security");
	rid.parentNode.removeChild(rid);
	scids = document.getElementsByName("scid")
	for(i = 0; i < scids.length ; i++) {
		if (scids[i].nodeName == "INPUT") {
			scids[i].value = GM_getValue("paste_scid");
		}
	}
	document.getElementById("finish").click();
}

if (location.pathname.match("^/analytics/settings/(home)?$")) {
	GM_setValue("filter_number", 0);
}

if (GM_getValue("filter_number") > 0) {
	if (location.href.match("add_filter")) {
		securityCode();
	} else if (location.href.match("edit_filter")) {
		pasteFilters();
	} else {
		location.href = location.protocol + "//" + location.hostname + "/analytics/settings/add_filter?scid=" + GM_getValue("paste_scid");;
	}
} else if (location.href.match("filter_list")) {
	copyFilters();
} else {
	mainCode();	
}