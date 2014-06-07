// ==UserScript==
// @name        BukkitDev Plugin Version Filter
// @namespace   http://alteredgaming.de
// @description Adds a Version column to the plugin list that can be filtered.
// @include     http://dev.bukkit.org/search/*
// @include     http://dev.bukkit.org/bukkit-plugins/
// @include     http://dev.bukkit.org/bukkit-plugins/?*
// @include     https://dev.bukkit.org/search/*
// @include     https://dev.bukkit.org/bukkit-plugins/
// @include     https://dev.bukkit.org/bukkit-plugins/?*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @version     3
// ==/UserScript==

Array.prototype.foreach = function( callback ) {
	for( var k=0; k < this.length; k++ ) {
		callback( k, this[ k ] );
	}
}

function pvfLoaded() {
	var objTables = document.getElementsByTagName("table");
	objTables.foreach = Array.prototype.foreach;
	
	// Add CSS3 Transitions
	var customStyle = document.createElement("style");
	customStyle.setAttribute("type", "text/stylesheet");
	customStyle.innerHTML = "/* MAGIC */\n-webkit-transition: all 100ms ease-in-out;\n-moz-transition: all 100ms ease-in-out;\n-ms-transition: all 100ms ease-in-out;\n-o-transition: all 100ms ease-in-out;\ntransition: all 100ms ease-in-out;";
	document.head.appendChild(customStyle);
	
	// Enhance mod list.
	objTables.foreach(
		function(index, element) {
			if (element.classList.contains("listing")) {
				var colElement = document.createElement("col");
				element.children.item(0).appendChild(colElement); //colgroup
				
				var tableHeaderElement = document.createElement("th");
				tableHeaderElement.classList.add("col-status");
				tableHeaderElement.classList.add("single-col");
				tableHeaderElement.setAttribute("scope", "col");
				tableHeaderElement.innerHTML = "&nbsp;&nbsp;Version&nbsp;&nbsp;";
				element.children.item(1).children.item(0).appendChild(tableHeaderElement); //thead
				
				var tableFooterElement = document.createElement("th");
				tableFooterElement.classList.add("col-status");
				tableFooterElement.classList.add("single-col");
				tableFooterElement.setAttribute("scope", "col");
				tableFooterElement.innerHTML = "&nbsp;&nbsp;Version&nbsp;&nbsp;";
				element.children.item(2).children.item(0).appendChild(tableFooterElement); //tfoot
				
				//Data
				element.children.item(3).children.foreach = Array.prototype.foreach;
				element.children.item(3).children.foreach(
					function(index, element) {
						if(element.classList.contains("row-joined-to-next")) {
							var tableData = document.createElement("td");
							tableData.classList.add("col-version");
							tableData.setAttribute("name","col-version");
							element.appendChild(tableData);
							
							var pluginLink = element.children.item(1).children.item(0).children.item(0).href;
							
							var xhr = GM_xmlhttpRequest({
								method: "GET",
								url: pluginLink + "files/",
								
								// Internal Values
								element: element.children.namedItem("col-version"),
								
								// onAbort, onError: Notify user when an error occured.
								onabort: function(response) {
									this.element.innerHTML = "<span style='color: red;'>Error</span>";
									console.log(response);
								},
								onerror: function(response) {
									this.element.innerHTML = "<span style='color: red;'>Error</span>";
									console.log(response);
								},
								
								// onProgress: Show how far we are in loading the files list.
								onprogress: function(progress) {
									this.element.innerHTML = "<span style='color: grey;'>" + Math.floor((progress.loaded / progress.total) * 100) + "%</span>";
								},
								
								// onLoad: If we have a result, show it to the user.
								onload: function(response) {
									var link, gameVersion, timestamp, versionElement;
									
									// Retrieve Link
									try {
										var t = (response.responseText).match(/<td class\="col-file"><a href\="([^"]*)">[^<]*<\/a><\/td>/);
										if (t) link = t[1];
									} catch(e){
										console.log(e);
										console.trace();
									}
									
									// Retrieve Game Version
									try {
										var t = (response.responseText).match(/<td class\="col-game-version"><ul[^>]*><li>([^<]*)<\/li>/);
										if (t) gameVersion = t[1]; else gameVersion = "None";
									} catch(e){
										console.log(e);
										console.trace();
									}
									
									// Retrieve last update Time
									try {
										var t = (response.responseText).match(/<td class\="col-date"><span[^>]*>([^<]*)<\/span><\/td>/)
										if (t) timestamp = t[1]; else timestamp = "";
									} catch(e){
										console.log(e);
										console.trace();
									}
									
									if (link != null && gameVersion != null) {
										versionElement = document.createElement("a");
									} else {
										versionElement = document.createElement("span");
									}
									
									versionElement.setAttribute("name", "version");
									versionElement.setAttribute("title", "Plugin File for " + gameVersion + "(" + timestamp + ")");
									
									if (link != null) {
										versionElement.href = link;
									}
									
									versionElement.innerHTML = gameVersion;
									
									// Replace Version column content.
									this.element.innerHTML = "";
									this.element.appendChild(versionElement);
									
									pvfUpdate();
								},
							});
						} else {
							element.children.item(0).colSpan += 1;
						}
					}
				);
			}
		}
	);
	
	// Create Input Field that implements the Version Filtering...
	var objForms = document.getElementsByTagName("form");
	objForms.foreach = Array.prototype.foreach;
	objForms.foreach(
		function(index, element) {
			if (element.classList.contains("listing-search-filters")) {
				var addHere = element.children.item(0).children.item(0).children.item(1).children.item(0);
				addHere.innerHTML += "<div class=\"search-filter search-filter-date search-filter-date-start\"><div class=\"search-filter-header\"><label for=\"search_filter_site\">Version (<a href=\"http://web.archive.org/web/20130222162252/http://www.addedbytes.com/cheat-sheets/download/regular-expressions-cheat-sheet-v2.png\">RegEx</a>):</label></div><div class=\"search-filter-body\"><input type=\"text\" data-watermark-text=\"Filter Version(RegEx)...\" name=\"search_filter_version\" value=\"\"></div></div>";
				document.getElementsByName("search_filter_version")[0].onchange = pvfUpdate;
				if (GM_getValue("dbo_VersionFilter")) document.getElementsByName("search_filter_version")[0].value = GM_getValue("dbo_VersionFilter");
			}
		}
	);
	
}

function pvfUpdate() {
	var versionRegExp, versionFilterText = document.getElementsByName("search_filter_version")[0].value;
	var versionElements = document.getElementsByName("version"); versionElements.foreach = Array.prototype.foreach;
	
	pvfStoreFilters();
	
	// Try creating a regular expression object for use.
	try {
		versionRegExp = new RegExp(versionFilterText, "i");
	} catch(e) {
		versionElements.foreach(function(index, element) {
			var parentrow = element.parentNode.parentNode;
			var childrow = element.parentNode.parentNode;
			for( var k=0; k < parentrow.parentNode.children.length; k++ ) {
				if (parentrow.parentNode.children[k] == parentrow) {
					childrow = parentrow.parentNode.children[k+1];
					break;
					
				}
			}
			
			for( var k=0; k < parentrow.children.length; k++ ) {
				var elP = parentrow.children[k];
				var elC = childrow.children[k];
				if (elP) elP.style.display = "";//opacity = "1.0";
				if (elC) elC.style.display = "";//opacity = "1.0";
			}
		});
	}
	
	// Check if the RegExp object exists and filter using it, otherwise just show everything.
	if (versionRegExp) {
		versionElements.foreach(function(index, element) {
			var parentrow = element.parentNode.parentNode;
			var childrow = element.parentNode.parentNode;
			for( var k=0; k < parentrow.parentNode.children.length; k++ ) {
				if (parentrow.parentNode.children[k] == parentrow) {
					childrow = parentrow.parentNode.children[k+1];
					break;
				}
			}
			
			if (element.innerHTML.search(versionRegExp) == -1) {
				for( var k=0; k < parentrow.children.length; k++ ) {
					var elP = parentrow.children[k];
					var elC = childrow.children[k];
					if (elP) elP.style.display = "none";//opacity = "0.1";
					if (elC) elC.style.display = "none";//opacity = "0.05";
				}
			} else {
				for( var k=0; k < parentrow.children.length; k++ ) {
					var elP = parentrow.children[k];
					var elC = childrow.children[k];
					if (elP) elP.style.display = "";//opacity = "1.0";
					if (elC) elC.style.display = "";//opacity = "1.0";
				}
			}
		});
	}
	
	window.setInterval(pvfCheckUpdate, 50);
}

var lastVersionFilterText = "";
function pvfCheckUpdate() {
	var versionFilterText = document.getElementsByName("search_filter_version")[0].value;
	if (lastVersionFilterText != versionFilterText) {
		pvfUpdate();
		lastVersionFilterText = versionFilterText;
	}
}

function pvfStoreFilters() {
	GM_setValue("dbo_VersionFilter", document.getElementsByName("search_filter_version")[0].value);
}

window.onload = pvfLoaded;
window.onbeforeunload = pvfStoreFilters;