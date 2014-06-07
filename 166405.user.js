// ==UserScript==
// @name                WME Toolbox [loader]
// @namespace           http://www.wazeteam.com
// @description         Adds many features to the Waze editor [autoupdate]
// @include             https://*.waze.com/editor/*
// @include             https://*.waze.com/*/editor/*
// @include             https://*.waze.com/map-editor/*
// @include             https://*.waze.com/beta_editor/*
// @include             https://editor-beta.waze.com/*
// @updateURL           http://userscripts.org/scripts/source/166405.meta.js
// @downloadURL         http://userscripts.org/scripts/source/166405.user.js
// @version             1.2.4
// @grant               none
// ==/UserScript==

var srcurl = "https://www.wazeteam.com/scripts/WMETBcode.php";
var launcher_version = "1.2.4";
var launcher_package = "firefox";

function WMETB_PullUserData() {
	// detect editor: usa / row / israel
	WMETB_EditorLocation = null;
	if (localStorage.editorLocation) {
		console.log("WME Toolbox: getting editor location");
		options = JSON.parse(localStorage.getItem('editorLocation'));
		WMETB_EditorLocation = options['code'];
	}else{
		WMETB_EditorLocation = "row";
	}
	WazeEditorURL = null;
	if (location.href.indexOf("www.waze.com") !== -1) {
		if (WMETB_EditorLocation == "row"){
			WazeEditorURL = "https://www.waze.com/row-Descartes-live/app";
		}
		else if (WMETB_EditorLocation == "usa"){
			WazeEditorURL = "https://www.waze.com/Descartes-live/app";
		}
		else if (WMETB_EditorLocation == "il"){
			WazeEditorURL = "https://www.waze.com/il-Descartes-live/app";
		}
	}
	else if (location.href.indexOf("editor-beta.waze.com") !== -1) {
		if (WMETB_EditorLocation == "row"){
			WazeEditorURL = "https://editor-beta.waze.com/row-Descartes-beta/app";
		}
		else if (WMETB_EditorLocation == "usa"){
			WazeEditorURL = "https://editor-beta.waze.com/Descartes-beta/app";
		}
		else if (WMETB_EditorLocation == "il"){
			WazeEditorURL = "https://editor-beta.waze.com/il-Descartes-beta/app";
		}
	}
	else
	{
		alert("WME Toolbox: Error while getting editor data from Waze server. Please check if an update of the loader is available, or go to Waze forum in Toolbox topics.");
		return;
	}
	
	$.ajax({
		async:true,
		crossDomain:true,
		dataType: "json",
		timeout: 30000,
		url:WazeEditorURL+"/Session",
		type:"GET",
		data: {language:"en"},
		success:function (data) {
			$.each(data, function(i,post) {
				if (i=="userName") LoggedUser = post;
				if (i=="rank") LoggedUserRank = post;
			});
			WMETB_GetScript(LoggedUser,LoggedUserRank);
		},
		complete:function (xhr,status) {
		},
		error:function (xhr, status, error) {
			if (error!="Forbidden"){
				alert("WME Toolbox: Error while getting editor data from Waze server. Please refresh the editor.");
			}
			return;
		}
	});
}

function WMETB_GetScript(LoggedUser,LoggedUserRank) {
    $.ajax({
        async: false,
        crossDomain: true,
		timeout: 30000,
        url: srcurl,
        method: "GET",
        data: {
            LoggedUserRank: LoggedUserRank,
			LoggedUser: LoggedUser,
			launcher_package: launcher_package,
			launcher_version: launcher_version
        },
        success: function (data) {
            var WMETBCode = document.createElement('script');
            WMETBCode.textContent = data;
            (document.head || document.documentElement).appendChild(WMETBCode);
            WMETBCode.parentNode.removeChild(WMETBCode)

        },
        error: function (xhr, status, error) {
			alert("WME Toolbox: Error while getting plugin data from WazeTeam server. Please refresh the editor.");
            return
        },
        dataType: 'text'
    })
}

setTimeout(WMETB_PullUserData, 500);
