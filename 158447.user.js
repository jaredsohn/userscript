// ==UserScript==
// @name           Neptun PowerUp!
// @namespace      http://example.org
// @description    Felturbózza a Neptun-odat
// @version        1.12.2
// @include        https://*neptun*/*hallgato*/*
// @include        https://netw6.nnet.sze.hu/hallgato/*
// @include        https://nappw.dfad.duf.hu/hallgato/*
// @include        https://neptun*.bgf.hu/neptun/*
// @include        https://host.sdakft.hu/*
// @include        https://neptun.ejf.hu/ejfhw/*
// @include        https://neptun*.nyme.hu/gyhf_hw/*
// @include        https://neptun.ejf.hu/ejfow/*
// @include        https://neptun*.uni-obuda.hu/*/*
// @include        https://hallgato.neptun.elte.hu/*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_info
// ==/UserScript==

var neptunUsers = new Array();

function main()
{
	if(isLogin()) {
		patchWaitDialog();
		initializeStoredUserSelect();
		setupAutoLogin();
	}
	else {
		hideHeader();
		protectFromSessionTimeout();
		fixMenu();
		addExtraMenuItems();
		addCurrentPageToTitle();
		enhanceTermSelect();
		initializeAutoPageSize();
		
		if(isCTRL("0303") || isCTRL("h_addsubjects")) {
			enhanceCourseList();
			initializeCourseAutoListing();
		}
		
		if(isCTRL("0401") || isCTRL("h_exams")) {
			enhanceExamList();
			initializeExamAutoListing();
		}
		
		//initializeUpdateCheck(); 
	}
}

function fixMenu() {
	$("#Menu_neptun_Menu_neptun .menu-parent li[targeturl]").css("position", "relative").each(function() {
		var url = $(this).attr("targeturl");
		$(this).append('<a href="' + url + '" style="display:block;position:absolute;left:0;top:0;width:100%;height:100%"></a>');
	});
}

function patchWaitDialog() {
	unsafeWindow.maxtrynumber = 100000;
	unsafeWindow.starttimer = function() {
		login_wait_timer = setInterval("docheck()", 5000);
	}
}

function addExtraMenuItems() {
	$('<style type="text/css">#mb1 .hltd a { color: #C00 } </style>').appendTo("head");
	$("#mb1").
	prepend('<li class="menu-parent hltd"><a href="main.aspx?ctrl=0401&ismenuclick=true">Vizsgajelentkezés</a></li>').
	prepend('<li class="menu-parent hltd"><a href="main.aspx?ctrl=0303&ismenuclick=true">Tárgyfelvétel</a></li>').
	prepend('<li class="menu-parent hltd"><a href="main.aspx?ctrl=0203&ismenuclick=true">Órarend</a></li>');
}

function addCurrentPageToTitle() {
	var originalTitle = document.title;
	window.setInterval(function() {
		var pageTitle = $("#menucaption").text().toString();
		document.title =  (pageTitle == "" ? "" : pageTitle + " - ") + originalTitle;
	}, 1000);
}

function enhanceTermSelect() {
	$('<style type="text/css"> .termSelect { list-style: none; padding: 0; } .termSelect li { display: inline-block; *display: inline; vertical-align: middle; margin: 0 15px 0 0; line-height: 250%; } .termSelect li a { padding: 5px; } .termSelect li a.button { color: #FFF; box-shadow: none; text-decoration: none; cursor: default; } </style>').appendTo("head");
	window.setInterval(function() {
		var termSelect = $("#upFilter_cmbTerms, #upFilter_cmb_m_cmb, #cmbTermsNormal, #upFilter_cmbTerms_m_cmb").first();
		if(termSelect.is(":visible")) {
			$(".termSelect").remove();
			var select = $('<ul class="termSelect"></ul>');
			$("option", termSelect).each(function() {
				if($(this).attr("value") == "-1") { return; }
				var item = $('<li><a href="#" data-value="' + $(this).attr("value") + '" class="' + (termSelect.val() == $(this).attr("value") ? "button" : "") + '">' + $(this).html() + "</a></li>");
				$("a", item).bind("click", function(e) {
					e.preventDefault();
					if($(this).hasClass("button")) {
						return;
					}
					termSelect.val($(this).data("value"));
					$(".termSelect li.selected").removeClass("selected");
					item.addClass("selected");
					var onChange = termSelect[0].getAttributeNode("onchange");
					if(onChange) {
						window.setTimeout(function() { contentEval(onChange.value); }, 0);
					}
					if(!isCTRL("0303") && !isCTRL("h_addsubjects") && !isCTRL("0401") && !isCTRL("h_exams") && !isCTRL("0503") && !isCTRL("h_transactionlist")) {
						$("#upFilter_expandedsearchbutton").click();
					}
				});
				select.append(item);
			});
			termSelect.parent().append(select);
			termSelect.hide();
		}
	}, 500);
}

function hideHeader() {
	$("#panHeader, #panCloseHeader").hide();
	$("table.top_menu_wrapper").css("margin-top", "5px").css("margin-bottom", "8px");
	$("#form1 > fieldset").css("border", "0 none");
}

function initializeCourseAutoListing() {
	window.setInterval(function() {
		if(!$.courseListCalled && $("#upFunction_h_addsubjects_upGrid_gridSubjects_gridmaindiv").size() == 0) {
			$.courseListCalled = true;
			$("#upFilter_expandedsearchbutton").click();
		}
	}, 250);
	window.setInterval(function() {
		if($.courseListCalled && $("#upFunction_h_addsubjects_upGrid_gridSubjects_gridmaindiv").size() != 0) {
			$.courseListCalled = false;
		}
	}, 100);
}

function enhanceCourseList() {
	$('<style type="text/css"> #upFunction_h_addsubjects_upGrid_gridSubjects_bodytable tr.Row1_Bold td, #upFunction_h_addsubjects_upModal_userctrlupFunction_h_addsubjects_upModal_modal_subjectdata_Subject_data1_upParent_tab_ctl00_upAddSubjects_Addsubject_course1_upGrid_gridCourses_bodytable tr.Row1_sel td, #upFunction_h_addsubjects_upModal_userctrlupFunction_h_addsubjects_upModal_modal_subjectdata_Subject_data1_upParent_tab_ctl00_upAddSubjects_Addsubject_course1_upGrid_gridCourses_bodytable tr.Row1_Bold_sel td { background: #F8EFB1 !important; font-weight: bold; color: #525659; } #upFunction_h_addsubjects_upGrid_gridSubjects_bodytable tr, #upFunction_h_addsubjects_upModal_userctrlupFunction_h_addsubjects_upModal_modal_subjectdata_Subject_data1_upParent_tab_ctl00_upAddSubjects_Addsubject_course1_upGrid_gridCourses_bodytable tr { cursor: pointer; } #upFunction_h_addsubjects_upGrid_gridSubjects_bodytable tr.npu_completed td { background: #D5EFBA !important; font-weight: bold; color: #525659; } </style>').appendTo("head");
	$("#upFunction_h_addsubjects_upModal_userctrlupFunction_h_addsubjects_upModal_modal_subjectdata_Subject_data1_upParent_tab_ctl00_upAddSubjects_Addsubject_course1_upGrid_gridCourses_bodytable tbody td").live("click", function(e) {
		if($(e.target).closest("input[type=checkbox]").size() == 0 && $(e.target).closest("td[onclick]").size() == 0) {
			var checkbox = $("input[type=checkbox]", $(this).closest("tr")).get(0);
			checkbox.checked = !checkbox.checked;
			var obj = unsafeWindow[$("#upFunction_h_addsubjects_upModal_userctrlupFunction_h_addsubjects_upModal_modal_subjectdata_Subject_data1_upParent_tab_ctl00_upAddSubjects_Addsubject_course1_upGrid_gridCourses_gridmaindiv").attr("instanceid")];
			try { obj.Cv($("input[type=checkbox]", $(this).closest("tr")).get(0), "1"); } catch(ex) { }
			e.preventDefault();
			return false;
		}
	});
	$("#upFunction_h_addsubjects_upGrid_gridSubjects_bodytable tbody td").live("click", function(e) {
		if($(e.target).closest("td[onclick]").size() == 0 && $(e.target).closest("td.contextcell_sel").size() == 0) {
			contentEval($("td[onclick]", $(this).closest("tr")).attr("onclick"));
			e.preventDefault();
			return false;
		}
	});
	window.setInterval(function() {
		var table = $("#upFunction_h_addsubjects_upGrid_gridSubjects_bodytable");
		if(table.attr("data-painted") != "1") {
			table.attr("data-painted", "1");
			$("tbody tr", table).each(function() {
				if($('td[n="Completed"] img', this).size() != 0) {
					$(this).addClass("npu_completed");
				}
			});
		}
	}, 250);
}

function initializeExamAutoListing() {
	$('<style type="text/css"> #upFilter_bodytable tr.nostyle { display: none } </style>').appendTo("head");
	$("#upFilter_cmbSubjects").live("change", function() {
		$.examListSubjectValue = $(this).val();
	});
	window.setInterval(function() {
		var panel = $("#upFilter_panFilter table.searchpanel");
		if(panel.attr("data-listing") != "1" && ($.examListTerm != $("#upFilter_cmbTerms option[selected]").attr("value") || $.examListSubject != $.examListSubjectValue)) {
			panel.attr("data-listing", "1");
			$.examListTerm = $("#upFilter_cmbTerms option[selected]").attr("value");
			$.examListSubject = $.examListSubjectValue;
			$("#upFilter_expandedsearchbutton").click();
		}
	}, 100);
}

function enhanceExamList() {
	$('<style type="text/css"> #upFunction_h_exams_upGrid_gridExamList_bodytable tr.gridrow_blue td { background: #F8EFB1 !important; font-weight: bold; color: #525659; } #upFunction_h_exams_upGrid_gridExamList_bodytable tr { cursor: pointer; } </style>').appendTo("head");
	$("#upFunction_h_exams_upGrid_gridExamList_bodytable tbody td").live("click", function(e) {
		if($(e.target).closest("td[onclick], td.contextcell_sel, td.contextcell").size() == 0) {
			$("td.contextcell, td.contextcell_sel", $(this).closest("tr")).trigger("click");
			e.preventDefault();
			return false;
		}
	});
}

function initializeAutoPageSize() {
	window.setInterval(function() {
		var pageSelect = $(".grid_pagerpanel select");
		pageSelect.each(function() {
			var e = $(this);
			e.hide();
			$(".link_pagesize", e.closest("tr")).html("");
			if(e.attr("data-listing") != "1" && e.val() != "500") {
				e.attr("data-listing", "1").val("500");
				var onChange = this.getAttributeNode("onchange");
				if(onChange) {
					contentEval(onChange.value);
				}
			}
		});
	}, 100);
}

function protectFromSessionTimeout() {
	window.setInterval(function() {
		$.ajax({
			url: "./main.aspx/Ping"
		});
	}, 150000);
	window.setInterval(function() {
		unsafeWindow.ShowModal = function() { };
		unsafeWindow.clearTimeout(unsafeWindow.timerID);
		unsafeWindow.clearTimeout(unsafeWindow.timerID2);
		if($("#npuStatus").size() == 0) {
			$("#upTraining_lblRemainingTime").html('<span id="npuStatus" style="font-weight: normal"><a href="https://www.userscripts.org/scripts/show/109523" target="_blank">Neptun PowerUp!</a> v' + GM_info["script"]["version"] + '</span>');
		}
		/* if($("#upTraining_lblRemainingTime #npuStatus").size() == 0) {
			$("#upTraining_lblRemainingTime").html('<span id="npuStatus" style="font-weight: normal"><a href="https://www.userscripts.org/scripts/show/109523" target="_blank">Neptun PowerUp!</a> v' + GM_info["script"]["version"] + ' &mdash; <span id="npUpdateContainer"><a href="#" id="npUpdate" style="display:none">Frissítés</a><span id="npUpdating" style="display:none">Frissítés keresése...</span></span></span>');
			refreshUpdateIndicator();
		} */
		unsafeWindow.sessionEndDate = null;
	}, 1000);
}

/* function initializeUpdateCheck() {
	window.setTimeout(function() {
		try {
			lastUpdate = null; //GM_getValue("neptun.update");
		}
		catch(e) { }
		if(!lastUpdate || lastUpdate < new Date().getTime() - 30 * 1000) {
			runUpdate();
		}
	}, 10);
	
	$("#npUpdate").live("click", function(e) {
		e.preventDefault();
		runUpdate();
	});
}

$.npRunUpdate = false; 
window.setInterval(function() {
	if($.npRunUpdate && !$.npUpdating) {
		$.npRunUpdate = false;
		runUpdate(); 
	}
}, 100);

function runUpdate() {
	shouldUpdate = true;
}

function checkForUpdates() {
	$.npUpdating = true;
	refreshUpdateIndicator();
	var reset = function() {
		$.npUpdating = false;
		refreshUpdateIndicator();
	};
	GM_xmlhttpRequest({
		method: "GET",
		timeout: 30000,
		url: "http://userscripts.org/scripts/source/109523.user.js?" + new Date().getTime().toString(),
		onabort: reset,
		onerror: reset,
		ontimeout: reset,
		onload: function(response) {
			try {
				if(response.status == 200) {
					var version = response.responseText.match(/@version\s+([a-z0-9\.]+)/)[1];
					if(version && version != GM_info["script"]["version"]) {
						if(confirm("Elérhető a Neptun PowerUp! új verziója. Szeretnéd frissíteni a jelenleg telepített " + GM_info["script"]["version"] + " verziót az új " + version + " verzióra?")) {
							document.location = "http://userscripts.org/scripts/source/109523.user.js";
						}
					}
				}
			}
			finally { 
				reset();
			}
		}
	});
}

function refreshUpdateIndicator() {
	$("#npUpdate").css("display", $.npUpdating ? "none" : "inline");
	$("#npUpdating").css("display", $.npUpdating ? "inline" : "none"); 
} */

function isLogin() {
	return $("td.login_left_side").size() > 0;
}

function isCTRL(ctrl) {
	return (window.location.href.indexOf("ctrl=" + ctrl) != -1);
}

function initializeStoredUserSelect() {
	loadUsers();

	$(".login_left_side .login_input").css("text-align", "left");
	
	var selectField = $('<select id="user_sel" class="bevitelimezo" name="user_sel"></select>').hide();
	for(var i = 0; i < neptunUsers.length; i++) {
		selectField.append('<option id="' + neptunUsers[i][0]+ '" value="' + neptunUsers[i][0] + '" class="neptun_kod">' + neptunUsers[i][0] + '</option>');
	}
	
	selectField.append('<option disabled="disabled" class="user_separator">&nbsp;</option>');

	selectField.append('<option id="other_user" value="__OTHER__">Más felhasználó...</option>');
	selectField.append('<option id="edit_list" value="__DELETE__">Tárolt kód törlése...</option>');
	
	$("td", selectField).css("position", "relative");
	selectField.css("font-weight", "bold").css("font-family", "consolas, courier new, courier, monospace").css("font-size", "1.5em");
	$("option[class!=neptun_kod]", selectField).css("font-size", "0.8em").css("font-family", "tahoma").css("font-weight", "normal").css("color", "#666").css("font-style", "italic");
	$("option.user_separator", selectField).css("font-size", "0.5em");
	
	selectField.bind("mousedown focus change", function() { abortAutoLogin() });
	$("#pwd, #Submit, #btnSubmit").bind("mousedown focus change", function() { abortAutoLogin() });
	
	selectField.bind("change", function() {
		clearLoginFields();
		
		if($(this).val() == "__OTHER__") {
			hideSelect();
			return false;
		}
		
		if($(this).val() == "__DELETE__") {
			$("#user_sel").val(neptunUsers[0][0]).trigger("change");
			var defaultString = "mindegyiket";
			for(var i = 0; i < neptunUsers.length; i++) {
				defaultString += "   /   " + neptunUsers[i][0];
			}
			itemToDelete = unsafeWindow.prompt("Írd be a törlendő neptun kódot. Az összes törléséhez írd be: MINDEGYIKET", defaultString);
			if(itemToDelete == "" || itemToDelete == null) {
				return false;
			}
			
			if(itemToDelete.toUpperCase() == "MINDEGYIKET") {
				neptunUsers = new Array();
				saveUsers();
				alert("Az összes tárolt neptun kód törölve lett a bejelentkezési listából.");
				window.location.reload();
				return false;
			}
			
			var indexToDelete = -1;
			for(var i = 0; i < neptunUsers.length; i++) {
				if(neptunUsers[i][0] == itemToDelete.toUpperCase()) {
					indexToDelete = i;
					itemToDelete = neptunUsers[i][0];
					break;
				}
			}
			if(indexToDelete == -1) {
				if(confirm("A megadott neptun kód nincs benne a tárolt listában. Megpróbálod újra?")) {
					$("#user_sel").val("__DELETE__").trigger("change");
				}
				return false;
			}
			
			neptunUsers.splice(indexToDelete, 1);
			saveUsers();
			alert("A(z) " + itemToDelete + " felhasználó törölve lett a bejelentkezési listából.");
			window.location.reload();
			return false;
		}
		
		$("#user").val(neptunUsers[$(this).get(0).selectedIndex][0]);
		$("#pwd").val(neptunUsers[$(this).get(0).selectedIndex][1]);
	});
	
	$("input[type=submit].login_button").attr("onclick", "").bind("click", function(e) {
		e.preventDefault();
		
		if($("#user_sel").val() == "__OTHER__") {
			if($("#user").val().trim() == "" || $("#pwd").val().trim() == "") {
				return;
			}
			
			var foundID = -1;
			for(var i = 0; i < neptunUsers.length; i++) {
				if(neptunUsers[i][0] == $("#user").val().toUpperCase()) {
					foundID = i;
				}
			}
			
			if(foundID == -1) {
				if(confirm("Szeretnéd menteni a beírt adatokat, hogy később egy kattintással be tudj lépni erről a számítógépről?")) {
					neptunUsers.push([$("#user").val().toUpperCase(), $("#pwd").val()]);
					saveUsers();
				}
				submitLoginForm();
				return;
			}
			else {
				$("#user_sel").val(neptunUsers[foundID][0]);
			}
		}
		
		if($("#user_sel").val() == "__DELETE__") {
			return;
		}
		
		if($("#pwd").val() != neptunUsers[$("#user_sel").get(0).selectedIndex][1]) {
			if(confirm("Szeretnéd megváltoztatni a(z) " + $("#user").val().toUpperCase() + " felhasználó tárolt jelszavát a most beírt jelszóra?")) {
				neptunUsers[$("#user_sel").get(0).selectedIndex][1] = $("#pwd").val();
				saveUsers();
			}
		}
		
		submitLoginForm();
		return;
	});
	
	$("#user").parent().append(selectField);
	showSelect();
	selectField.trigger("change");
}

function clearLoginFields() {
	$("#user").val("");
	$("#pwd").val("");
}

function loadUsers() {
	try {
		neptunUsers = JSON.parse(GM_getValue("neptun.users"));
	}
	catch(e) { }
}

function saveUsers() {
	setTimeout(function() {
		GM_setValue("neptun.users", JSON.stringify(neptunUsers));
	}, 0);
}

function showSelect() {
	$("#user").hide();
	$("#user_sel").show().focus();
	contentEval(' Page_Validators[0].controltovalidate = "user_sel" ');
}

function hideSelect() {
	$("#user_sel").hide();
	$("#user").show().focus();
	contentEval(' Page_Validators[0].controltovalidate = "user" ');
}

function submitLoginForm() {
	unsafeWindow.docheck();
}

function setupAutoLogin() {
	if(neptunUsers.length < 1) { return; }
	var submit = $("#Submit, #btnSubmit");
	$.autoLoginRemaining = 3;
	$.loginButtonText = submit.attr("value");
	submit.attr("value", $.loginButtonText + " (" + $.autoLoginRemaining + ")");
	$(".login_button_td").append('<div id="abortAL" style="text-align: center; margin: 23px 0 0 128px"><a href="javascript:abortAutoLogin()">Megszakít</a></div>');
	$.autoLoginTimer = window.setInterval(function() {
		$.autoLoginRemaining--;
		submit.attr("value", $.loginButtonText + " (" + $.autoLoginRemaining + ")");
		if($.autoLoginRemaining <= 0) {
			submitLoginForm();
			abortAutoLogin();
			submit.attr("value", $.loginButtonText + "...");
		}
	}, 1000);
}

function abortAutoLogin() {
	window.clearInterval($.autoLoginTimer);
	$("#Submit, #btnSubmit").attr("value", $.loginButtonText);
	$("#abortAL").remove();
}

unsafeWindow.abortAutoLogin = abortAutoLogin;

function contentEval(source) {
	if ('function' == typeof source) {
		source = '(' + source + ')();'
	}
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;
	document.body.appendChild(script);
	document.body.removeChild(script);
}

$ = unsafeWindow.jQuery;

main();