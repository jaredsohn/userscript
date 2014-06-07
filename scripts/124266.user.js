// ==UserScript==
// @name           EZTV - Show Marker/Filter MVG
// @description    Mark your favorite TV-shows and optionally filter MVG releases
// @namespace      idontneedadomainname.com
// @include        http://eztv.it/*
// @include        https://eztv.it/*
// @include        http://eztv.nl/*
// @include        https://eztv.nl/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

// Wrapping everything in a document ready function so as to play nice with other scripts
$(document).ready( function() {

// First we add the menu options

var filterDiv = document.createElement("div");
filterDiv.id = "mvgFilterDiv";
filterDiv.innerHTML = "<div class='filterOn'>On</div><div class='filterOff'>Off</div>";

var hlConfigLink = document.createElement("a");
hlConfigLink.href = "#";
hlConfigLink.id = "hlConfigLink";
hlConfigLink.innerHTML = "Highlights";

var site_menu = document.getElementById("site_menu");

site_menu.appendChild( document.createTextNode(" [ Filter MVG ") );
site_menu.appendChild( filterDiv );
site_menu.appendChild( document.createTextNode(" ]") );

site_menu.appendChild( document.createTextNode(" [ ") );
site_menu.appendChild(hlConfigLink);
site_menu.appendChild( document.createTextNode(" ]") );

$(hlConfigLink).addClass("site_menu");


// Add the css (for just the filter)
var css_elem = document.createElement("style");
css_elem.innerHTML =
"#mvgFilterDiv {\n" +
	"display: inline-block;\n" +
"}\n" +
"#mvgFilterDiv > div {\n" +
	"display: inline;\n" +
	"height: 17px;\n" +
	"padding: 2px 4px;\n" +
	"color: #636363;\n" +
"}\n" +
"#mvgFilterDiv .filterOn {\n" +
	"background-color: #DDDDDD;\n" +
	"border-radius: 3px 0 0 3px;\n" +
"}\n" +
"#mvgFilterDiv .filterOff {\n" +
	"background-color: #D02020;\n" +
	"border-radius: 0 3px 3px 0px;\n" +
"}\n"
;
document.head.appendChild(css_elem);

// the actual filter work

var updateToggleButtons = function(show) {
	if(!show)
	{
		$("#mvgFilterDiv .filterOn").css( {
			cursor: "auto",
			backgroundColor: "#1AA61A"
		});
		$("#mvgFilterDiv .filterOff").css( {
			cursor: "pointer",
			backgroundColor: "#DDDDDD",
			color: "#636363"
		});
	} else
	{
		$("#mvgFilterDiv .filterOn").css( {
			cursor: "pointer",
			backgroundColor: "#DDDDDD"
		});
		$("#mvgFilterDiv .filterOff").css( {
			cursor: "auto",
			backgroundColor: "#D02020",
			color: "white"
		});
	}
};

var toggleMVGVisibility = function(show) {
	GM_setValue("filterMVG", (show? true : false));
	updateToggleButtons(show);
	
	$("a.epinfo").each( function(idx,elem) {
		if($(elem).attr("alt").match(/MVGroup/i))
			elem.parentElement.parentElement.style.display = (show ? "table-row" : "none");
	});
};

$("#mvgFilterDiv .filterOn").click( function() {
	toggleMVGVisibility(false);
});

$("#mvgFilterDiv .filterOff").click( function() {
	toggleMVGVisibility(true);
});

// Initialize
toggleMVGVisibility( GM_getValue("filterMVG", false) );


// ==================================================================
// The 'highlight shows' part of the script


// First we create the config dialog and needed elements

var highlightConfigDiv = document.createElement("div");
highlightConfigDiv.id = "highlightConfigDiv";
highlightConfigDiv.innerHTML =
"<h2>Configure show highlights</h2>" +
"<span class='closeDialogButton'>X</span>" +
"<div class='hlTableContainer'>" +
"<table class='highlightList'>" +
	"<thead><th></th><th>Show name <a href='#' id='sortHighlights'>(sort)</a></th><th></th></thead>" +
	"<tbody>" +
	"</tbody>" +
"</table>" +
"</div>" +
"<input type='button' id='highlight_addRowButton' value='Add row' />" +
"";
document.body.appendChild(highlightConfigDiv);

// setup event handlers

$("#hlConfigLink").click( function() {
	$("#highlightConfigDiv").css( {
		display: "block"
	});
});

var getHighlightSettings = function() {
	highlightSettings = []
	$(".highlightList tbody tr").each( function(idx,elem) {
		highlightSettings[idx] = {
			name: $(this).find(".hlShowName").val(),
			enabled: $(this).find(".hlToggleHighlight")[0].checked
		};
	});
	return highlightSettings;
};

$("#sortHighlights").click( function() {
	var settings = getHighlightSettings();
	var sortedSettings = [];

	while(settings.length > 1) {
		var lowest = 0;
		for(var i=1; i < settings.length; i++) {
			if(settings[i].name.toLowerCase() < settings[lowest].name.toLowerCase())
				lowest = i;
		}
		sortedSettings.push( settings[lowest] );
		settings.splice(lowest, 1);
	}
	sortedSettings.push(settings[0]);

	// Now we need to apply our newly sorted settings
	for(var i = 0; i < sortedSettings.length; i++) {
		$(".highlightList .hlToggleHighlight")[i].checked = sortedSettings[i].enabled;
		$(".highlightList .hlShowName").eq(i).val( sortedSettings[i].name );
	}
});

$("#highlightConfigDiv .closeDialogButton").click( function() {
	$("#highlightConfigDiv").css( {
		display: "none",
	});
	
	// save changes
	highlightSettings = getHighlightSettings();
	GM_setValue("highlightSettings", JSON.stringify( highlightSettings ) );
	applyShowHighlighting();
});

$("#highlight_addRowButton").click( function() {
	addShowHighlightRow();
});

var addShowHighlightRow = function() {
	var trEl = document.createElement("tr");
	trEl.innerHTML =
		"<td><input class='hlToggleHighlight' type='checkbox' checked='checked' /></td>" +
		"<td><input class='hlShowName' type='text' size='30' /></td>" +
		"<td><div class='hlDeleteRow'> - </div></td>";
	$("#highlightConfigDiv .highlightList").append(trEl);
	$(trEl).addClass(
			($("#highlightConfigDiv .highlightList tr").length % 2) ? "hlEven" : "hlOdd" );
	
	// handlers for delete row and pick color
	
	$(".highlightList .hlDeleteRow:last").click( function() {
		if(confirm("Delete selected row?")) {
			var rowEl = $(this)[0].parentElement.parentElement;
			rowEl.parentElement.removeChild(rowEl);
		}
	});

	$(".highlightList .hlShowName:last").focusout( function() {
		var showname = $(this).val();
		var checkbox = $(this).parent().parent().find(".hlToggleHighlight")[0];
		if(showname.length < 3 && checkbox.checked) {
			alert("Showname has to be at least 3 characters long");
			checkbox.checked = false;
			this.focus();
			//$(this).parent().parent().find(".hlToggleHighlight").removeAttr("checked");
			return false;
		}
		return true;
	});

	$(".highlightList .hlToggleHighlight:last").change( function() {
		if($(this)[0].checked) {
			if( $(this).parent().parent().find(".hlShowName").val().length < 3 ) {
				alert("Showname has to be at least 3 characters long");
				$(this)[0].checked = false;
			}
		}
	});

	$(".highlightList .hlShowName:last").focus();
};

// Here we finally read the persistent highlight settings value
var highlightSettings_str = GM_getValue("highlightSettings", "");
var highlightSettings = ( highlightSettings_str == "" ? [] : JSON.parse(highlightSettings_str) );

if(highlightSettings.length == 0)
{
	//addShowHighlightRow();
}
else
{
	for( i = 0; i < highlightSettings.length; ++i ) {
		if( highlightSettings[i].name.length < 3 )
			continue;

		addShowHighlightRow();
		
		$(".highlightList .hlShowName:last")[0].value = highlightSettings[i].name;
		$(".highlightList .hlShowColor:last").css("background-color", highlightSettings[i].color);
		$(".highlightList .hlToggleHighlight:last")[0].checked = highlightSettings[i].enabled;
		//if(highlightSettings[i].enabled)
		//	$(".highlightList .hlToggleHighlight:last").attr("checked", "checked");
	}
}

var highlightShow = function(showname, color) {
	var re = new RegExp(showname, "i");
	$("a.epinfo").each( function(idx,elem)
	{
		if($(this).text().match(re)) {
			$(this).css("font-size", "1.6em");
			if(color && color != "transparent")
				$(this).css("background-color", color);
		}
	});
};

var applyShowHighlighting = function() {
	for( var i = 0; i < highlightSettings.length; ++i ) {
		if(highlightSettings[i].enabled && highlightSettings[i].name.length > 2) {
			highlightShow( highlightSettings[i].name, highlightSettings[i].color );
		}
	}
};
applyShowHighlighting();
// Apparently I introduced a new 'issue' with the growing list/dialog.
// When opening eztv the page will default to showing the bottom of the page. Not really what we want
window.scroll(0,0);

// Add the css for the config dialog
var highlightCss = document.createElement("style");
highlightCss.innerHTML =
"#highlightConfigDiv {\n" +
	"z-index:          1000;\n" +
	"background-color: white;\n" +
	"width:            330px;\n" +
	"position:         absolute;\n" +
	"top:              100px;\n" +
	"right:            100px;\n" +
	"border-radius:    10px 10px 10px 10px;\n" +
	"border:           4px solid #cccccc;\n" +
	"box-shadow:       10px 10px 10px #aaaaaa;\n" +
	"display:          none;\n" +
	"padding:          2em;\n" +
	"text-align:       center;\n" +
"}\n" +
"#modalOverlay {\n" +
	"z-index:          999;\n" +
	"background-color: #cccccc;\n" +
	"opacity:          0.6;\n" +
	"width:            100%;\n" +
	"position:         absolute;\n" +
	"top:              0;\n" +
	"left:             0;\n" +
	"display:          none;\n" +
"}\n" +
".closeDialogButton {\n" +
	"border:       1px solid #cccccc;\n" +
	"position:     absolute;\n" +
	"right:        9px;\n" +
	"top:          9px;\n" +
	"font:         12px/22px Verdana, sans-serif;\n" +
	"color:        #9a958e;\n" +
	"cursor:       pointer;\n" +
	"text-align:    center;\n" +
	"padding-left:  1em;\n" +
	"padding-right: 1em;\n" +
"}\n" +
".closeDialogButton:hover {\n" +
  "background-color: #808080;\n" +
  "color: white;\n" +
"}\n" +
"#sortHighlights {\n" +
  "color: #808080;\n" +
  "text-decoration: none;\n" +
"}\n" +
"#sortHighlights:hover {\n" +
  "color: black;\n" +
"}\n" +
".hlTableContainer {\n" +
  "width: 95%;\n" +
  "margin-left: auto;\n" +
  "margin-right: auto;\n" +
  "border: 1px solid black;\n" +
  "margin-bottom: 8px;\n" +
  "padding: 12px;\n" +
  "min-height: 160px;\n" +
  "max-height: 400px;\n" +
  "overflow: auto;\n" +
"}\n" +
".highlightList {\n" +
  "width: 100%;\n" +
"}\n" +
".hlEven {\n" +
"}\n" +
".hlOdd {\n" +
  "background-color: #f6f0f3;\n" +
"}\n" +
".highlightList td {\n" +
  "text-align: center;\n" +
"}\n" +
".hlShowColor {\n" +
  "border: 1px solid black;\n" +
  "width: 24px;\n" +
  "height: 24px;\n" +
  "margin-left: auto;\n" +
  "margin-right: auto;\n" +
  "cursor: pointer;\n" +
"}\n" +
".hlDeleteRow {\n" +
  "padding: 4px;\n" +
  "text-align: center;\n" +
  "font-size: 1.8em;\n" +
  "cursor: pointer;\n" +
"}\n"
;
document.head.appendChild(highlightCss);

});  // end of document ready function
