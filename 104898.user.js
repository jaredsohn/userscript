// ==UserScript==
// @name           Dropbox Plus 1.01 - Slim Mod
// @namespace      RJ, edited by Klexur
// @description    Modified version of RJ's Dropbox Plus 1.01 
// @include        https://www.dropbox.com/home*
// ==/UserScript==
// Written by Rafael Jafferali
// Modified by Klexur


// Icon under Create Common license
// Credits : www.aha-soft.com
// Downloaded from http://www.small-icons.com/packs/16x16-free-application-icons.htm
// on 8 June 2011
var CLOSE_BUTTON = "data:image/gif; base64,"
+ "R0lGODlhEAAQAHcAACH5BAEAAAIALAAAAAAQABAAp/////R5cgEAAPja3MwfJveYf/TLzckeJfQk"
+ "KMofJfFyZPaRevR6cvR7dPBzas0iJ/R5cdEcIPaUfNUjJPJ1bPehhe4pKfZ9atIfIrAFCu4hI+xf"
+ "V9szL/aDb+lpb/R4cbYGC78RFb0bH9QsLMchI+UdINgsLeZUWfNVO+5EL+tXXupeV90zLf319tgd"
+ "FfwlKfR/bexmbuQvJPJqVfaMePeZgPTMzecsJf3w8e0qKPPLze9oXfNPNsgdI/3x8vNdRPedgfaI"
+ "de9LM7g1OO8aIe9cWvJ1Z7ESE/QuLfJEMc0gIfWOePR8dPNiSOMsIOhva+ZQVfaSevNfXPeMdPQt"
+ "LPeRePaXfvRHNPDO0N8qH/J5Z84NE/Nxd+MyIuUtI/pPOPdBMvR3cfPOz9OOkeg7K7IPEPV1afWO"
+ "efQ1L+5xbPjBxfbGyvF3b/FrYfbb3soeJPacgfeortsuK/WMlNIdIPJNNvnt7fm/w/bi4vJmU/sh"
+ "Kf7w8eZRWPFWWfBXWO9zbfe/wrsOEPre4PRSOOAgHPzo6etZXvQ2MOJSTfjs7PRNNdQeFuJeZfnt"
+ "7vOLku9wbN4kHfWIddccF/fS1fWQec6QkORWUMUyOuCqre8rJ+Otr8sdIfOCb+8jJOixs/ihhOpx"
+ "bvNbW79nasZnavBob+9kW+1RVeSqrO1vaveCbvaLdfaWfeBLUe91bveor+xwdrEQEs4iJvstLsoN"
+ "DsAND9w1MPeIc/jq6+IgH7AaG7kbHc4NDdUpK740OeptaNgvLuxva9ckHfPT1Mw1PsAdHvLNz/Qj"
+ "J8M9Q8ofJPQiJ80hJ/opK8EfIPNQOfBXWvJoX/BbX7U8PwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
+ "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
+ "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
+ "AAj/AAU0aBCGSYAAECAE+MCAwUEBFCpICGXmU40CBazAiSSFEhAHFBY4i8Pl2aozSyTAgDanjyoH"
+ "bIo4ArCHVKkoC4yYugPAlZ9HrTgZAgTAR4wdClSoAYDjVZs/aapogbIGQCE+JwQBaOFhwxRUwGzR"
+ "UMBqEoABA84yWhGkgy9QqWY0IYNBBwAABujI+JHnwhNLKIQMyrLJxl0DSrooSlEHEQsezVwMcwOg"
+ "mBgAwkg4uZJETq0viy7ZAYCFGTE8ADyF8ALmF4dgx24B0KQLkqRejQCcEnHDxIhAYwBgKkPoEJpd"
+ "QxIBGEWL14RMR0TlwoUkhwUqs6JVgqUhwgRZnUCUIFiGAIGxZC+2ZCCiJ4KABw9iKUuA7E2CAwcI"
+ "9CBAQEBAADs=";

function $(id) {
	return document.getElementById(id);
}

// Taken from http://wiki.greasespot.net/Content_Script_Injection
function InjectScript(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}


function ChangeFileSearch() {
	if (FS.value != "") {
		// FS.style.width = "282px";
		// FS.style.paddingRight = "23px" ;
		btnEmptyFS.style.display = "";
		$("MyTV").style.display = "none";
		$("filesearchresults").style.display = "";
		$("filesearchpaging").style.display = "";

	}
	else {
		// FS.style.width = "301px";
		// FS.style.paddingRight = "";
		btnEmptyFS.style.display = "none";
		$("MyTV").style.display = "";
		$("filesearchresults").style.display = "none";
		$("filesearchpaging").style.display = "none";
	}
}

function EmptyFileSearch() {
	FS.value = "";
	ChangeFileSearch();
}

// MAIN
// $("main-container").style.width = "1006px"; // instead of 866px
// $("left-content").style.width = "330px"; // instead of 190px
var FS = $("filesearch");
// FS.style.width = "301px"; // instead of 161px
with ($("quota-bar-container").style) {
	marginLeft = "auto";
	marginRight = "auto";
	display = "block";
}
// document.getElementById("tabs").style.marginLeft = "394px"; // instead of 254px

with ($("browse-files").style) {
	height = "465px";
	overflowY = "auto";
}

// The dropdown menu needs to be positioned always on top of the screen
// (otherwise, it might appear below the browse-files div)
$("browse-files").addEventListener("click", function() {
	var lastBtn = $("browse-root-actions").getElementsByClassName("hotbutton")[4];
	$("dropdown").style.top = parseInt(window.getComputedStyle(lastBtn, null).height) + lastBtn.offsetTop + 1 + "px";
	$("dropdown").style.left = parseInt(window.getComputedStyle(lastBtn, null).width) + lastBtn.offsetLeft
		- parseInt(window.getComputedStyle($("dropdown").firstChild, null).width) + "px";
}, true);

$("browse-location").style.whiteSpace = "nowrap";

with (document.querySelector("#content.clearfix").style) {
	paddingBottom = "0px";
	marginBottom = "0px";
}

var btnEmptyFS = document.createElement("a");
btnEmptyFS.innerHTML = "<img src='" + CLOSE_BUTTON + "' style='left: auto; right: 4px;'>";
btnEmptyFS.style.display = "none";
document.getElementsByClassName("searchbox")[0].appendChild(btnEmptyFS);
btnEmptyFS.addEventListener("click", EmptyFileSearch, true);

FS.addEventListener("keyup", ChangeFileSearch, true); 

// It is required to inject the script in the page because TreeView function is
// not accessible as such to the userscript 
InjectScript(function() {
		TreeView.reset({
				onSuccess: function () {
					$("filesearchresults").style.display = "none";
					$("filesearchpaging").style.display = "none";
					var MyTV = $("copy-move-treeview").cloneNode(true);
					MyTV.id = "MyTV";
					TreeView.tv["MyTV"] = TreeView.tv["copy-move-treeview"];
					MyTV.style.marginTop = "14px";
					MyTV.style.height = "340px";
					MyTV.style.whiteSpace = "nowrap";
					MyTV.querySelector("#first-treeview-link").rel = "";
					MyTV.addEventListener("click", function() {
							// Timer required because it takes a few milliseconds to call the TreeView
							// function which highlights the folder on which it was clicked
							window.setTimeout(function() {
									var selectedFolder = $("MyTV").querySelector(".highlight .treeview-folder")
										|| $("MyTV").querySelector(".highlight #first-treeview-link");
									if (selectedFolder) {
										selectedFolder.parentNode.removeClassName("highlight");
										location.assign("https://www.dropbox.com/home#" + selectedFolder.rel + ":::");										
									}									
							}, 250);
					}, true);
					document.getElementsByClassName("sider")[0].appendChild(MyTV);
				}
		});
});