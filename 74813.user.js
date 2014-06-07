// ==UserScript==
// @name           IMDb Contributor
// @namespace      http://userscripts.org/users/67626
// @description    For data contributors. Shortcuts to update forms, update history and update results. Submission hotkeys. Interface for adding multiple episodes.
// @copyright      2010-2014 http://userscripts.org/users/67626
// @license        Creative Commons BY-NC-ND 3.0, http://creativecommons.org/licenses/by-nc-nd/3.0/
// @include        http://*.imdb.com/*
// @exclude        http://*.imdb.com/*images*
// @grant          GM_addStyle
// @grant          GM_setClipboard
// @grant          GM_xmlhttpRequest
// @grant          unsafeWindow
// @updateURL      http://userscripts.org/scripts/source/74813.meta.js
// @version        2014.03.02
// ==/UserScript==

(function() {
if (window.top != window.self) return; //iframes

function $(x) {return document.getElementById(x)}
var LP = window.location.pathname;
if (window.location.hostname.match("pro"))
	$("nb_personal").insertAdjacentHTML('beforeend', ' | <a href="http://addpro.imdb.com/updates/history">Update History</a>');
else {
	$("navUserMenu").getElementsByTagName("ul")[1].insertAdjacentHTML('beforeend', '<a href="/updates/history">Update History</a>');
	if (LP.match(/^\/(?:title|name)\//) && !LP.match("board")) {
		GM_addStyle('\
			.tooltip {\
				white-space: nowrap;\
				position: absolute;\
				bottom: 24px;\
				left: -12px;\
				padding: 4px 7px 3px;\
				-webkit-border-radius: 3px;\
				border-radius: 3px;\
				border-color: rgba(0, 0, 0, 0.75);\
				background: rgba(0, 0, 0, 0.75);\
				color: white;\
				font-family: "Arial";\
				font-size: 12px !important;\
				font-weight: bold !important;\
				line-height: normal;\
			}\
			.tooltip:after {\
				content: "";\
				position: absolute;\
				top: 100%;\
				left: 15px;\
				border-left: 4px solid transparent;\
				border-right: 4px solid transparent;\
				border-top: 4px solid;\
				border-top-color: inherit;\
			}'
		);
		var jQ = unsafeWindow.jQuery;
		function newButtons(c, a) {
			var legacy = document.getElementsByName("auto")[0];
			if (LP.match(/^\/name\//))
				legacy.parentNode.parentNode.style.whiteSpace = "nowrap";
			var Correct = document.createElement("button");
			with (Correct) {
				className = "primary btn large";
				style.marginLeft = "10px";
				innerHTML = "Correct / Delete";
				addEventListener("click", function() {
					legacy.name = "update";
					legacy.value = ttnm + ":" + c;
				}, false);
			}
			var Add = document.createElement("button");
			with (Add) {
				className = "primary btn large";
				style.marginLeft = "10px";
				innerHTML = "Add";
				addEventListener("click", function(event) {
					event.stopPropagation();
					event.preventDefault();
					if (a.match(/\?/)) {
						var N = prompt("How many items to add?");
						if (N == "" || N == null)
							return;
						N = parseInt(N, 10);
						if (isNaN(N) || N < 1) {
							alert("Enter a natural number.");
							return;
						}
						if (N > 50) {
							alert("Please add no more than 50 items.");
							return;
						}
						//if (c && confirm("Correct/Delete?")) a = c + "/" + a;
					}
					legacy.name = "update";
					legacy.value = ttnm + ":" + a.replace(/\?/g, N);
					this.form.submit();
				}, false);
			}
			with (document.getElementsByClassName("primary")[1]) {
				classList.remove("primary");
				classList.add("secondary");
				parentNode.appendChild(Correct);
				parentNode.appendChild(Add);
			}
		}
		function newCorrectAdd(span, items) {
			with (span) {
				innerHTML = '&#160;<span style="position: relative; display: none"><span class="tooltip">Correct / Delete</span></span><a class="correct" href="/updates?update=' + ttnm + ':' + list + '.correct"><img style="vertical-align: middle" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABf0lEQVQ4jZWSsUvDQBSHrx2KDuKqk2AddHPzL3B2inOhioWaqZ0yJYK0jZ2ytRkiidPddBlqjnB3kLRccXR3FQSRgkoH24tLCh00aR983HHc937w7gDIKQhhSQhR4Zzv5N39s4QQFSHEz3g8fh2NRmcAgMLKMqW0TCktR1F0MRwOJ3Ecz+I47mOMt3LlMAy3GWMvjLFvSqkahuER5/yJMTbjnN/l+QVCyD0hRBJCZBAEc0IIGQwG5SAIbgkhp5k2xljBGM9935e+7yfpKjHG7xDC7GF6nreLEHpDCEmEUJIiEUISQvjsOM7Gv7Ku60XXdR89z5MpSYp0XXfqOM5xZnqv17vu9/tz27albdtJikzPNJD1hN1ud8+yrE/LsmRKsrSPdF0vZqYDAEC73b4yTfPLNE25oNPpTFqt1n6uvDSHQ8MwhGEY85TLleVFKYpS0jTtRtM0BFb8uoVGo+E0m83ztdMWDVRV/VBVdVqv10/WthVF2azVag/VavVgXfcXlPTziQYLj7gAAAAASUVORK5CYII=" /></a><span style="position: relative; display: none"><span class="tooltip">Add</span></span><a class="add" style="display: none" href="/updates?update=' + ttnm + ':' + list + '.add.' + ((list == 'bio_bg') ? '1' : '10') + '"><img style="vertical-align: middle" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsSAAALEgHS3X78AAABZElEQVQoz5WQsapaURBF15053kJBkIv9QwsF/8DkJ+yNZd43vVcaGyt/IvEPRC0UtRURBC2uZ+akuYakzC5n2LDWzgBUFTOrdbvd53g8/hgMBt8BVqvV52w2e9/tdjVVfZoZQVVRVTGz5O40Go1mr9cD4HA4NN0dIKmqAB7MrJZSApCUUgRSjJEqqfppjDFzdw2dTucJZDFGKYqCsiwtyzIAyrK0oihw9xhCcCCFyWTyUa/Xm0Aqy9JbrdaXV6HVan0djUazPM8FyB6Pxy2bz+ep3+/zwhARQggAxBipHAghsNlsEP4zYb1efx6Px3+QhsPhG8ByuTxcr9dffyOF6XT6/pJut9s2Go1+pJTeAK7X68/FYvHtfD7rH+n9fl8TEdxdRMTyPNdqSvI818vlwul0CiLi7k5Q1aeqSlmWqVone0kDWXWzEIKbmQczA3BARYT7/X7bbrcA3O/3m4gAZGbmZsZvDlnJIgY/NlQAAAAASUVORK5CYII=" /></a> &#160;';
				style.opacity = "0.3";
				addEventListener("mouseover", function() {
					this.getElementsByClassName("add")[0].style.display = "inline";
					this.style.opacity = "1";
				}, false);
				addEventListener("mouseout", function() {
					this.getElementsByClassName("add")[0].style.display = "none";
					this.style.opacity = "0.3";
				}, false);
				with (getElementsByClassName("correct")[0]) {
					addEventListener("mouseover", function() {jQ(this.previousSibling).fadeIn("fast")}, false);
					addEventListener("mouseout", function() {jQ(this.previousSibling).fadeOut("fast")}, false);
				}
				with (getElementsByClassName("add")[0]) {
					addEventListener("mouseover", function() {jQ(this.previousSibling).fadeIn("fast");}, false);
					addEventListener("mouseout", function() {jQ(this.previousSibling).fadeOut("fast");}, false);
					addEventListener("click", function(event) {
						event.stopPropagation();
						event.preventDefault();
						if (this.href.match(/1$/)) {
							window.location = this.href;
							return;
						}
						var limit = (items == "items") ? 50 : 150;
						var N = prompt("How many " + items + " to add?");
						if (N == "" || N == null)
							return;
						N = parseInt(N, 10);
						if (isNaN(N) || N < 1) {
							alert("Enter a natural number.");
							return;
						}
						if (N > limit) {
							alert("Please add no more than " + limit + " " + items + ".");
							return;
						}
						window.location = this.href.split("add")[0] + "add." + N;
					}, false);
				}
			}
		}
		function newCorrect(span) {
			span.innerHTML = '&#160;<span style="position: relative; display: none"><span class="tooltip">Correct / Delete</span></span><a class="correct" href="/updates?update=' + ttnm + ':' + list + '.correct"><img style="vertical-align: middle; opacity: 0.3" onMouseOver="this.style.opacity=\'1\'" onMouseOut="this.style.opacity=\'0.3\'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABf0lEQVQ4jZWSsUvDQBSHrx2KDuKqk2AddHPzL3B2inOhioWaqZ0yJYK0jZ2ytRkiidPddBlqjnB3kLRccXR3FQSRgkoH24tLCh00aR983HHc937w7gDIKQhhSQhR4Zzv5N39s4QQFSHEz3g8fh2NRmcAgMLKMqW0TCktR1F0MRwOJ3Ecz+I47mOMt3LlMAy3GWMvjLFvSqkahuER5/yJMTbjnN/l+QVCyD0hRBJCZBAEc0IIGQwG5SAIbgkhp5k2xljBGM9935e+7yfpKjHG7xDC7GF6nreLEHpDCEmEUJIiEUISQvjsOM7Gv7Ku60XXdR89z5MpSYp0XXfqOM5xZnqv17vu9/tz27albdtJikzPNJD1hN1ud8+yrE/LsmRKsrSPdF0vZqYDAEC73b4yTfPLNE25oNPpTFqt1n6uvDSHQ8MwhGEY85TLleVFKYpS0jTtRtM0BFb8uoVGo+E0m83ztdMWDVRV/VBVdVqv10/WthVF2azVag/VavVgXfcXlPTziQYLj7gAAAAASUVORK5CYII=" /></a>&#160;';
			with (span.getElementsByClassName("correct")[0]) {
				addEventListener("mouseover", function() {jQ(this.previousSibling).fadeIn("fast")}, false);
				addEventListener("mouseout", function() {jQ(this.previousSibling).fadeOut("fast")}, false);
			}
		}
		function newUpdate(span) {
			span.innerHTML = '&#160;<span style="position: relative; display: none"><span class="tooltip">Correct / Delete / Add</span></span><a class="update" href="/updates?update=' + ttnm + ':' + list + '"><img style="vertical-align: middle; opacity: 0.3" onMouseOver="this.style.opacity=\'1\'" onMouseOut="this.style.opacity=\'0.3\'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABf0lEQVQ4jZWSsUvDQBSHrx2KDuKqk2AddHPzL3B2inOhioWaqZ0yJYK0jZ2ytRkiidPddBlqjnB3kLRccXR3FQSRgkoH24tLCh00aR983HHc937w7gDIKQhhSQhR4Zzv5N39s4QQFSHEz3g8fh2NRmcAgMLKMqW0TCktR1F0MRwOJ3Ecz+I47mOMt3LlMAy3GWMvjLFvSqkahuER5/yJMTbjnN/l+QVCyD0hRBJCZBAEc0IIGQwG5SAIbgkhp5k2xljBGM9935e+7yfpKjHG7xDC7GF6nreLEHpDCEmEUJIiEUISQvjsOM7Gv7Ku60XXdR89z5MpSYp0XXfqOM5xZnqv17vu9/tz27albdtJikzPNJD1hN1ud8+yrE/LsmRKsrSPdF0vZqYDAEC73b4yTfPLNE25oNPpTFqt1n6uvDSHQ8MwhGEY85TLleVFKYpS0jTtRtM0BFb8uoVGo+E0m83ztdMWDVRV/VBVdVqv10/WthVF2azVag/VavVgXfcXlPTziQYLj7gAAAAASUVORK5CYII=" /></a>&#160;';
			with (span.getElementsByClassName("update")[0]) {
				addEventListener("mouseover", function() {jQ(this.previousSibling).fadeIn("fast")}, false);
				addEventListener("mouseout", function() {jQ(this.previousSibling).fadeOut("fast")}, false);
			}
		}
		var list;
		var U = new Array();
		var ttnm = LP.split("/")[2];
		var subpage = LP.split("/")[3];
		if (LP.match(/^\/title\//)) {
			if (LP.match(/(?:\/|reference|combined)$/)) {
				var Loading_src = "data:image/gif;base64,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";
				var T = document.title;
				var TVEpisode = (T.charAt(0) == "\"" && T.charCodeAt(T.indexOf("\"", 2) + 2) != 40);
				if (TVEpisode) {
					var Edit = document.createElement("a");
					Edit.href = "/updates?update=" + ttnm + ":release_dates.correct/episode_correct.correct";
					Edit.innerHTML = '<span style="position: absolute; right: 27px; top: 14px"><span style="position: relative; bottom: 4px; display: none"><span class="tooltip">Edit episode title / number / date</span></span><img class="edit" style="opacity: 0.5" onMouseOver="this.style.opacity=\'1\'" onMouseOut="this.style.opacity=\'0.5\'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABf0lEQVQ4jZWSsUvDQBSHrx2KDuKqk2AddHPzL3B2inOhioWaqZ0yJYK0jZ2ytRkiidPddBlqjnB3kLRccXR3FQSRgkoH24tLCh00aR983HHc937w7gDIKQhhSQhR4Zzv5N39s4QQFSHEz3g8fh2NRmcAgMLKMqW0TCktR1F0MRwOJ3Ecz+I47mOMt3LlMAy3GWMvjLFvSqkahuER5/yJMTbjnN/l+QVCyD0hRBJCZBAEc0IIGQwG5SAIbgkhp5k2xljBGM9935e+7yfpKjHG7xDC7GF6nreLEHpDCEmEUJIiEUISQvjsOM7Gv7Ku60XXdR89z5MpSYp0XXfqOM5xZnqv17vu9/tz27albdtJikzPNJD1hN1ud8+yrE/LsmRKsrSPdF0vZqYDAEC73b4yTfPLNE25oNPpTFqt1n6uvDSHQ8MwhGEY85TLleVFKYpS0jTtRtM0BFb8uoVGo+E0m83ztdMWDVRV/VBVdVqv10/WthVF2azVag/VavVgXfcXlPTziQYLj7gAAAAASUVORK5CYII=" /></span>';
					with (Edit.getElementsByClassName("edit")[0]) {
						addEventListener("mouseover", function() {jQ(this.previousSibling).fadeIn("fast")}, false);
						addEventListener("mouseout", function() {jQ(this.previousSibling).fadeOut("fast")}, false);
						addEventListener("click", function() {
							this.src = Loading_src;
							this.previousSibling.getElementsByClassName("tooltip")[0].innerHTML = "Loading...";
						}, false);
					}
				}
				var Copy = document.createElement("span");
				Copy.innerHTML = '<span style="position: absolute; right: 7px; top: 14px"><span style="position: relative; bottom: 4px; display: none"><span class="tooltip">Copy full title</span></span><img id="FT" class="copy" style="cursor: pointer; opacity: 0.5" onMouseOver="this.style.opacity=\'1\'" onMouseOut="this.style.opacity=\'0.5\'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB3klEQVQ4jZ3Qy04aYQCG4f8ivJNekwtYwGSuwXVja0tDbY0NsVHJAANUDVFLm5oUU20CptpAUs5nmPlnOAxDyNvFmCaswH7Js30Xn9D11GZcT6HFk2hxfQ1JYnqKmJ7aFEIIocV1avU6UkpM01hJSkmtXkNPfUIIIURUi5P98pWn7PJzlovLrBc4imrkrnMA+Hw+FEVBVVUURcHv99NotqhUa1SqNcqVKgDfrq7InF94gY+HUW5ufwLQ6/Wx7RGqqmLbI/r9Ae12h1arTavVptFoAfA9d81Z5twLRA4OyRfuAOh0u0jLQlEUpGXR7fWWdLpdAH7c3HJ6lvECHyIHPDz8BqA/GDAajwkGg4zGYwbD4ZL+YABAPl8gfXLqBfb2I5RKJQAM02TqOASDQaaOgynlEsM0Abi//0UyfeIFdt/vU6lUALBsm5nr4vf7mbku9mi0xLJtAIrFIolk2guEd/doNhsATCYTZo7DfD5n5jhMp9Mlk8kEgD/lMrGE7gVC4Xd0H89xXXclgHq9jhZLeIFXoTCGYQCwWCxWAuh0OhxHY17gxU7o3znrbmgMOTrWvMD2y9dIS5IvFMgX7tZQwJSS0Ju3XiAQULeeb+/wVIGAuiUetyGEePYfNoQQ4i/GLBd3ff4VUQAAAABJRU5ErkJggg==" /></span>';
				with (Copy.getElementsByClassName("copy")[0]) {
					addEventListener("mouseover", function() {jQ(this.previousSibling).fadeIn("fast")}, false);
					addEventListener("mouseout", function() {jQ(this.previousSibling).fadeOut("fast")}, false);
				}
				if (LP.match(/\/$/)) {	//new design
					var QuickLinks = $("maindetails_sidebar_bottom").getElementsByTagName("h3")[0];
					QuickLinks.appendChild(Copy);
					if (TVEpisode)
						QuickLinks.appendChild(Edit);
				}
				else {
					$("tn15main").style.position = "relative";
					$("tn15main").appendChild(Copy);
					if (TVEpisode) {
						$("tn15main").appendChild(Edit);
						var B = document.getElementsByTagName("b");
						with (B[B.length-1])
							if (innerHTML == "Series Crew") {
								className = "glossary";
								id = "SCrew";
							}
					}
					var Cast = document.getElementsByClassName("headerinline")[0];
					if (Cast)
						with (Cast.firstChild) {
							className = "glossary";
							setAttribute("name", "cast");
						}
					var G = document.getElementsByClassName("glossary");
					for (var i = 0; i < G.length; i++) {
						if (G[i].id == "SCrew")
							break;
						list = (G[i].name == "music_original") ? "composers" : G[i].getAttribute("name");
						U[i] = document.createElement("span");
						newCorrectAdd(U[i], "credits");
						G[i].parentNode.appendChild(U[i]);
					}
				}
				function getFullTitle() {
					with (this) {
						removeEventListener("click", getFullTitle, false);
						src = Loading_src;
						previousSibling.getElementsByClassName("tooltip")[0].innerHTML = "Loading...";
						style.cursor = "default";
						style.opacity = "1";
						removeAttribute("onMouseOut");
					}
					GM_xmlhttpRequest({
						method: "GET",
						url: "http://www.imdb.com/updates?update=" + ttnm + ":null",
						onload: function(response) {
							GM_setClipboard(response.responseText.split("</title>", 1)[0].split("Update: ")[1]);
							$("FT").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA8UlEQVQ4jcXSsS7EQRCA8d9d7gGUCqXKA9AR14la5qLQaFQKJMoLrYiLRCNRKlY8hRCJiCDiIUShUCgUituTC+5vicSUs/N9M5kd/iNSSkMppRbUfwE3cY5nqP0AhBWsYjYirosFKaU6dtDCdETc994ahZ33sICpfrhIgC0sYS4iLj8+Vi4xpbSMNXQi4virmkYuHMMGziKik3OT2MYt1gc1qeXiQ8zn3AwucINhTETE1SBBbweLGMW47jc9YAS7VTB5BxHxkiWvaOZpHtGugt8FWXKHo75cOyKeigU5DvIUm9j/DubzHZzoXtppCfwn8QbWSEQ+p/sWzwAAAABJRU5ErkJggg==";
							$("FT").previousSibling.getElementsByClassName("tooltip")[0].innerHTML = "Title copied";
						}
					});
				}
				$("FT").addEventListener("click", getFullTitle, false);
			}
			else if (LP.match(/(?:keywords|quotes|trivia|goofs|locations|taglines)$/))
				newButtons(subpage + ".correct", subpage + ".add.?");
			else {
				switch (subpage) {
					case "fullcredits":
						var H = document.getElementsByClassName("dataHeaderWithBorder");
						for (var i = 0; i < H.length; i++) {
							U[i] = document.createElement("span");
							with (H[i]) {
								switch (innerHTML.replace(/^\s*/, "").match(/^\s*(?:\w| )+/m).toString()) {
									case "Cast":                             list = id = "cast"; break;
									case "Animation Department":             list = id = "animation_department"; break;
									case "Art Department":                   list = id = "art_department"; break;
									case "Art Direction by":                 list = id = "art_directors"; break;
									case "Second Unit Director or Assistant Director": list = id = "assistant_directors"; break;
									case "Camera and Electrical Department": list = id = "camera_department"; break;
									case "Casting Department":               list = id = "casting_department"; break;
									case "Casting By":                       list = id = "casting_directors"; break;
									case "Cinematography by":                list = id = "cinematographers"; break;
									case "Music by":                         list = id = "composers"; break;
									case "Costume and Wardrobe Department":  list = id = "costume_department"; break;
									case "Costume Design by":                list = id = "costume_designers"; break;
									case "Directed by":                      list = id = "directors"; break;
									case "Editorial Department":             list = id = "editorial_department"; break;
									case "Film Editing by":                  list = id = "editors"; break;
									case "Makeup Department":                list = id = "make_up_department"; break;
									case "Music Department":                 list = id = "music_department"; break;
									case "Produced by":                      list = id = "producers"; break;
									case "Production Design by":             list = id = "production_designers"; break;
									case "Production Management":            list = id = "production_managers"; break;
									case "Set Decoration by":                list = id = "set_decorators"; break;
									case "Sound Department":                 list = id = "sound_department"; break;
									case "Special Effects by":               list = id = "special_effects_department"; break;
									case "Stunts":                           list = id = "stunts"; break;
									case "Transportation Department":        list = id = "transportation_department"; break;
									case "Thanks":                           list = id = "thanks"; break;
									case "Visual Effects by":                list = id = "visual_effects_department"; break;
									case "Writing Credits":                  list = id = "writers"; break;
									case "Other crew":                       list = id = "miscellaneous"
								}
								newCorrectAdd(U[i], "credits");
								appendChild(U[i]);
							}
						}
						if (window.location.hash)
							$(window.location.hash.split("#")[1]).scrollIntoView();
						break;
					case "companycredits":
						var H = document.getElementsByClassName("dataHeaderWithBorder");
						for (var i = 0; i < H.length; i++) {
							U[i] = document.createElement("span");
							switch (H[i].innerHTML) {
								case "Production Companies": list = "production_companies"; break;
								case "Distributors":         list = "distributors"; break;
								case "Special Effects":      list = "special_effects_companies"; break;
								case "Other Companies":      list = "miscellaneous_companies";
							}
							newCorrectAdd(U[i], "credits");
							H[i].appendChild(U[i]);
						}
						break;
					case "externalreviews": newButtons("title_urls_com.correct", "title_urls_com.add.?"); break;
					case "plotsummary": newButtons("outlines.correct/plot.correct", "outlines.add.1/plot.add.1"); break;
					case "soundtrack": newButtons("soundtracks.correct", "soundtracks.add.?"); break;
					case "crazycredits": newButtons("crazy_credits.correct", "crazy_credits.add.?"); break;
					case "alternateversions": newButtons("alternate_versions.correct", "alternate_versions.add.?"); break;
					case "movieconnections": newButtons("movie_links.correct", "movie_links.add.?"); break;
					case "releaseinfo":
						var H = document.getElementsByClassName("li_group");
						for (var i = 0; i < H.length; i++) {
							U[i] = document.createElement("span");
							switch (H[i].innerHTML) {
								case "Release Dates&nbsp;": list = "release_dates"; break;
								case "Also Known As (AKA)&nbsp;": list = "akas";
							}
							if (document.title.match("TV Series") && list == "release_dates")
								newCorrect(U[i]);
							else
								newCorrectAdd(U[i], "items");
							H[i].appendChild(U[i]);
						}
						break;
					case "literature":
						var H5 = document.getElementsByTagName("h5");
						for (var i = 0; i < H5.length; i++) {
							U[i] = document.createElement("span");
							with (H5[i]) {
								switch (innerHTML) {
									case "Screenplay/teleplay":         list = id = "literature_scrp"; break;
									case "Original Literary Source":    list = id = "literature_novl"; break;
									case "Adaption of Literary Source": list = id = "literature_adpt"; break;
									case "Monographic related book":    list = id = "literature_book"; break;
									case "Production Process Protocol": list = id = "literature_prot"; break;
									case "Interviews":                  list = id = "literature_iviw"; break;
									case "Printed Media Reviews":       list = id = "literature_crit"; break;
									case "Essays":                      list = id = "literature_essy"; break;
									case "Other information":           list = id = "literature_othr";
								}
								newCorrectAdd(U[i], "items");
								appendChild(U[i]);
							}
						}
						if (window.location.hash)
							$(window.location.hash.split("#")[1]).scrollIntoView();
						break;
					case "externalsites":
						var H = document.getElementsByClassName("li_group");
						for (var i = 0; i < H.length; i++) {
							U[i] = document.createElement("span");
							switch (H[i].innerHTML) {
								case "Video Clips and Trailers ":
									list = "title_urls_mov/title_urls_tra";
									newUpdate(U[i]);
									break;
								case "Photographs ":
									list = "title_urls_img/title_urls_pos";
									newUpdate(U[i]);
									break;
								default:
									switch (H[i].innerHTML) {
										case "Official Sites ":      list = "title_urls_off"; break;
										case "Miscellaneous Sites ": list = "title_urls_msc"; break;
										case "Sound Clips ":         list = "title_urls_snd";
									}
									newCorrectAdd(U[i], "items");										
							}
							H[i].appendChild(U[i]);
						}
						break;
					case "episodes":
						var Add = document.createElement("button");
						with (Add) {
							className = "btn large primary";
							style.marginLeft = "5px";
							innerHTML = "Add multiple episodes";
							addEventListener("click", function(event) {
								event.stopPropagation();
								event.preventDefault();
								this.blur();
								if ($("UI")) {
									var F = this.form;
									(function() {
										var src = $("Source").selectedIndex;
										if (src == 0) {
											alert("Source is required.");
											$("Source").focus();
											return;
										}
										else
											var D = "#src=" + src;
										var c = $("Country").selectedIndex;
										D += "&c=" + c;
										var m1 = $("Month1").selectedIndex;
										var m2 = $("Month2").selectedIndex;
										if (m1 > 0 && m2 == 0)
											$("Month2").selectedIndex = m2 = m1;
										else if (m2 > 0 && m1 == 0)
											$("Month1").selectedIndex = m1 = m2;
										var m = m2 - m1 + ((m2 >= m1) ? 1 : 13);
										D += "&m=" + m1 + "-" + m2;
										with ($("Year"))
											if (value.match(/\d{4}/)) {
												D += "&y=" + value;
												if (c == 0) {
													alert("Since you have specified the Year, Country is required (usually, this will be the producing country for the series).");
													$("Country").focus();
													return;
												}
											}
											else if (c > 0) {
												alert("Since you have specified the Country, Year is required.\nEither add a Year or deselect the Country.");
												$("Year").focus();
												return;
											}
										with ($("Season"))
											if (value.match(/\d+/)) {
												D += "&s=" + value;
												var Season = true;
											}
										with ($("Number")) {
											value = value.replace(/\s+/g, "");
											var n1 = value.match(/^\d+/);
											var n2 = value.match(/\d+$/);
											if (n1 && n2) {
												if (n1.toString() == n2.toString()) {
													value = n1;
													D += "&n=" + n1;
													var n = parseInt(n1, 10);
												}
												else {
													if (n1 == 0) {
														alert("\"0\" isn't supported in this form, only positive numbers.");
														select();
														return;
													}
													if (!Season) {
														alert("Since you have specified the range, Season is required.");
														$("Season").focus();
														return;
													}
													D += "&n=" + n1 + "-" + n2;
													var n = n2 - n1 + 1;
												}
												if (n < 2) {
													alert("You should add at least 2 episodes.");
													select();
													return;
												}
												else if (n > 365) {
													alert("Please add no more than 365 episodes.");
													select();
													return;
												}
												else if (n < m) {
													alert("Number of months (" + m + ") must be equal or less than the number of episodes (" + n + ").");
													return;
												}
											}
											else {
												alert("Number is required.");
												focus();
												return;
											}
										}
										with (document.getElementsByName("update")[0]) {
											value = "episode";
											for (var i = 0; i < n - 1; i++)
												value += ",episode";
										}
										Add.style.display = "none";
										Add.insertAdjacentHTML('beforebegin', '<img title="Processing..." style="margin-left: 20px; vertical-align: middle" src="data:image/gif;base64,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" />');
										F.action += D;
										window.setTimeout("document.forms[document.forms.length-1].submit()", 1000);
									})();
								}
								else {
									this.form.insertAdjacentHTML('afterend', '<div id="UI">\
										<p><hr />Add multiple episodes that share some data (Year, Season, Country, Source).<br />Fill in the data and click the button again. For reference, here is the <a target="_blank" href="/updates/guide/episode">submission guide</a>.<hr /></p>\
										<p><b>Year:</b> &#160;<input size="5" maxlength="4" id="Year"></p>\
										<p><b>Season:</b> &#160;<input size="2" maxlength="2" id="Season"> (required if number <i>range</i> is specified)</p>\
										<p><b>Number of episodes</b> (e.g., 10) or specified <b>number range</b> (e.g., 3-12): &#160;<input size="8" id="Number"></p>\
										<p><b>Month range:</b> &#160;<select id="Month1"><option></option><option>January</option><option>February</option><option>March</option><option>April</option><option>May</option><option>June</option><option>July</option><option>August</option><option>September</option><option>October</option><option>November</option><option>December</option></SELECT> &ndash; <SELECT id="Month2"><option></option><option>January</option><option>February</option><option>March</option><option>April</option><option>May</option><option>June</option><option>July</option><option>August</option><option>September</option><option>October</option><option>November</option><option>December</option></select></p>\
										<p><b>Country:</b> &#160;<img id="Country_loading" title="Loading..." style="vertical-align: middle" src="data:image/gif;base64,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" /><select id="Country" style="visibility: hidden"></select></p>\
										<p><b>I am...</b> &#160;<select id="Source"><option></option><option>...producer/director/writer</option><option>...a member of the cast/crew</option><option>...a publicist/agent/official source</option><option>...none of the above</option></select></p>\
										</div>'
									);
									GM_xmlhttpRequest({
										method: "GET",
										url: "http://www.imdb.com/updates?update=episode",
										onload: function(response) {
											$("Country_loading").style.display = "none";
											$("Country").style.visibility = "visible";
											$("Country").innerHTML = '<option></option>' + response.responseText.split('<select name="o.1.episode.new.1.edit.country"><option value="">Choose</option>')[1].split('</select>', 1)[0];
										}
									});
								}
							}, false);
						}
						document.getElementsByClassName("primary")[1].parentNode.appendChild(Add);
				}
			}
		}
		else if (LP.match(/^\/name\//)) {
			switch (subpage) {
				case "bio":
					var H = document.getElementsByClassName("li_group");
					for (var i = 0; i < H.length; i++) {
						U[i] = document.createElement("span");
						var h = H[i].innerHTML.replace(/^\s*/, "").match(/^\s*(?:\w| )+/m).toString().replace(/\s*$/, "");
						if (h == "Overview") {
							list = "bio_db/bio_dd/bio_rn/bio_nk/bio_ht";
							newUpdate(U[i]);
						}
						else if (h == "Mini Bio") {
							list = "bio_bg";
							newCorrectAdd(U[i], "items");
						}
						else {
							switch (h) {
								case "Spouse":          list = "bio_sp"; break;
								case "Trade Mark":      list = "bio_tm"; break;
								case "Trivia":          list = "bio_tr"; break;
								case "Personal Quotes": list = "bio_qu"; break;
								case "Salary":          list = "bio_sa";
							}
							newCorrectAdd(U[i], "items");
						}
						H[i].appendChild(U[i]);
					}
					break;
				case "otherworks": newButtons("bio_ow.correct", "bio_ow.add.?"); break;
				case "publicity":
					var H5 = document.getElementsByTagName("h5");
					for (var i = 0; i < H5.length; i++) {
						U[i] = document.createElement("span");
						with (H5[i]) {
							switch (innerHTML) {
								case "Biography (print)":    list = id = "bio_bo"; break;
								case "Biographical movies":  list = id = "bio_bt"; break;
								case "Portrayed in":         list = id = "bio_pi"; break;
								case "Interview":            list = id = "bio_it"; break;
								case "Article":              list = id = "bio_at"; break;
								case "Pictorial":            list = id = "bio_pt"; break;
								case "Magazine cover photo": list = id = "bio_cv";
							}
							newCorrectAdd(U[i], "items");
							appendChild(U[i]);
						}
					}
					if (window.location.hash)
						$(window.location.hash.split("#")[1]).scrollIntoView();
					break;
				case "externalsites":
					var H = document.getElementsByClassName("li_group");
					for (var i = 0; i < H.length; i++) {
						U[i] = document.createElement("span");
						switch (H[i].innerHTML) {
							case "Official Sites ":      list = "name_urls_off"; break;
							case "Miscellaneous Sites ": list = "name_urls_msc"; break;
							case "Photographs ":         list = "name_urls_img"; break;
							case "Video Clips ":         list = "name_urls_mov"; break;
							case "Sound Clips ":         list = "name_urls_snd";
						}
						newCorrectAdd(U[i], "items");
						H[i].appendChild(U[i]);
					}
			}
		}
	}
	else if (LP == "/updates" && window.location.hash) {
		var D = window.location.hash;
		if (D.match(/n=\d+-\d/))
			var n = parseInt(D.match(/n=\d+/).toString().split("=")[1], 10);
		var H1 = document.getElementsByTagName("H1");
		var Header = document.getElementsByClassName("header");
		var Intro = document.getElementsByClassName("blurb");
		var Data = document.getElementsByClassName("normal_data");
		for (var i = 1; i < H1.length; i++)
			H1[i].innerHTML = Header[i].innerHTML = Intro[i].innerHTML = "";
		var M = D.match(/m=\d+-\d+/).toString();
		var m1 = parseInt(M.split("=")[1], 10);
		var m2 = parseInt(M.split("-")[1], 10);
		var m = m2 - m1 + ((m2 >= m1) ? 1 : 13);
		var k = Math.round(H1.length / m);
		var j = 0;
		for (var i = 0; i < H1.length; i++) {
			var Select = Data[i].getElementsByTagName("select");
			Select[2].selectedIndex = parseInt(D.match(/&c=\d+/).toString().split("=")[1], 10);
			Select[3].selectedIndex = parseInt(D.match(/src=\d+/).toString().split("=")[1], 10);
			Select[1].selectedIndex = m1 + j;
			if ((i + 1) / (j + 1) >= k && j + 1 < m) {
				j++;
				if (m1 + j > 12)
					m1 = m1 - 12;
			}
			if (D.match(/y=\d{4}/))
				Data[i].getElementsByTagName("input")[2].value = D.match(/y=\d{4}/).toString().split("=")[1];
			if (D.match(/s=\d+/)) {
				Data[i].getElementsByTagName("input")[3].value = D.match(/s=\d+/).toString().split("=")[1] + ".";
				if (n) {
					Data[i].getElementsByTagName("input")[3].value += n;
					n++;
				}
			}
		}
	}
}

if (LP == "/updates" || LP == "/updates/update") {
	var Choose = document.getElementsByClassName("choose");
	for (var i = 0; i < Choose.length; i++)
		if (Choose[i].tagName.toLowerCase() == "select")
			with (Choose[i])
				insertAdjacentHTML('beforeend', "<option value=\"" + value + "\" onClick=\"var N = prompt('How many credits/items to add?'); if (N == '' || N == null) return; N = parseInt(N, 10); if (isNaN(N) || N < 1) {alert('Enter a natural number.'); return;} if (N > 150) {alert('Too many credits/items.'); return;} this.value = N; this.innerHTML = 'Add ' + N;\">Custom number</option>");
	var Textareas = document.getElementsByTagName("textarea");
	for (var i = 0; i < Textareas.length; i++)
		Textareas[i].addEventListener("keydown", function(event) {
			if (event.ctrlKey && !event.shiftKey && event.which == 13)
				document.getElementsByName("action__Continue")[0].click();
			event.stopPropagation();
		}, false);
	document.addEventListener("keydown", function(event) {
		if (document.activeElement.nodeName != "INPUT" && event.ctrlKey && event.shiftKey) {
			eval($("summaryb").getAttribute("onclick"));
			$("summary").scrollIntoView();
			if (event.which == 13)
				document.getElementsByName("action__Submit")[0].click();
		}
		if (event.ctrlKey && !event.shiftKey && event.which == 13)
			document.getElementsByName("action__Continue")[0].click();
	}, false);
}
else if (LP == "/updates/history") {

	// Navigation
	var Showing = document.getElementsByTagName("small");
	var Last50 = parseInt(Showing[0].innerHTML.split("of ")[1].replace(",", ""), 10) - 51;
	for (var i = 0; i < Showing.length; i++)
		Showing[i].insertAdjacentHTML('afterend', '<a class="button jump" style="margin: auto 10px auto 20px" href="?">custom</a><a class="button" href="history?start=' + Last50 + '">last</a>');
	var Jump = document.getElementsByClassName("jump");
	for (var i = 0; i < Jump.length; i++)
		Jump[i].addEventListener("click", function(event) {
			if (N = prompt("Show starting item number:")) {
				N = parseInt(N, 10);
				if (isNaN(N) || N < 1)
					alert("Enter a natural number");
				else
					window.location = "history?start=" + (N - 1);
			}
			event.stopPropagation();
			event.preventDefault();
		}, false);

	// Linkification
	function linkifyTitle(list) {
		var l;
		var h = "";
		switch (list) {
			// Cast and Crew
			case "Cast":                             l = "Credits?"; h = "#cast"; break;
			case "Animation Department":             l = "Credits?"; h = "#animation_department"; break;
			case "Art Department":                   l = "Credits?"; h = "#art_department"; break;
			case "Art Directors":                    l = "Credits?"; h = "#art_directors"; break;
			case "Second Unit Directors or Assistant Directors": l = "Credits?"; h = "#assistant_directors"; break;
			case "Camera and Electrical Department": l = "Credits?"; h = "#camera_department"; break;
			case "Casting Department":               l = "Credits?"; h = "#casting_department"; break;
			case "Casting Directors":                l = "Credits?"; h = "#casting_directors"; break;
			case "Cinematographers":                 l = "Credits?"; h = "#cinematographers"; break;
			case "Composers":                        l = "Credits?"; h = "#music_original"; break;
			case "Costume and Wardrobe Department":  l = "Credits?"; h = "#costume_department"; break;
			case "Costume Designers":                l = "Credits?"; h = "#costume_designers"; break;
			case "Directors":                        l = "Credits?"; h = "#directors"; break;
			case "Editorial Department":             l = "Credits?"; h = "#editorial_department"; break;
			case "Editors":                          l = "Credits?"; h = "#editors"; break;
			case "Makeup Department":                l = "Credits?"; h = "#make_up_department"; break;
			case "Music Department":                 l = "Credits?"; h = "#music_department"; break;
			case "Producers":                        l = "Credits?"; h = "#producers"; break;
			case "Production Designers":             l = "Credits?"; h = "#production_designers"; break;
			case "Production Managers":              l = "Credits?"; h = "#production_managers"; break;
			case "Set Decorators":                   l = "Credits?"; h = "#set_decorators"; break;
			case "Sound Department":                 l = "Credits?"; h = "#sound_department"; break;
			case "Special Effects":                  l = "Credits?"; h = "#special_effects_department"; break;
			case "Stunts":                           l = "Credits?"; h = "#stunts"; break;
			case "Transportation Department":        l = "Credits?"; h = "#transportation_department"; break;
			case "Thanks":                           l = "Credits?"; h = "#thanks"; break;
			case "Visual Effects":                   l = "Credits?"; h = "#visual_effects_department"; break;
			case "Writers":                          l = "Credits?"; h = "#writers"; break;
			case "Other Crew":                       l = "Credits?"; h = "#miscellaneous"; break;

			// Company Credits
			case "Production Companies":      l = "Companies?"; h = "#production"; break;
			case "Distributors":              l = "Companies?"; h = "#distributors"; break;
			case "Special Effects Companies": l = "Companies?"; h = "#specialEffects"; break;
			case "Miscellaneous Companies":   l = "Companies?"; h = "#other"; break;
			case "Sales Representatives":     l = "Companies?"; break; //IMDbPro only

			// Basic Data
			case "Release Dates": l = "ReleaseDates?"; h = "#releases"; break;

			// Plot & Quotes
			case "Plot Summaries": l = "Plot?"; break;
			case "Keywords":       l = "Keywords?"; break;
			case "Quotes":         l = "Quotes?"; break;

			// Fun Stuff
			case "Trivia":             l = "Trivia?"; break;
			case "Goofs":              l = "Goofs?"; break;
			case "Soundtracks":        l = "Soundtracks?"; break;
			case "Crazy Credits":      l = "CrazyCredits?"; break;
			case "Alternate Versions": l = "AlternateVersions?"; break;
			case "Movie Connections":  l = "Mlinks?"; break;

			// Links to Other Sites
			case "External Reviews":   l = "TUrls?COM+"; break;
			case "Official Sites":     l = "TUrls?OFF+"; h = "#official"; break;
			case "Miscellaneous Link": l = "TUrls?MSC+"; h = "#misc"; break;
			case "Image / Photos":
			case "Posters":            l = "TUrls?IMG+"; h = "#photos"; break;
			case "Sound clips":        l = "TUrls?SND+"; h = "#sounds"; break;
			case "Video clips":
			case "Trailers":           l = "TUrls?MOV+"; h = "#videos"; break;

			// Box Office and Business
			case "Budget":
			case "Opening Weekend":
			case "Gross":
			case "Weekend Gross":
			case "Admissions":
			case "Theatrical Rentals":
			case "Production Dates":
			case "Filming Dates":
			case "Copyright Holder":   l = "Business?"; break;

			// Technical Info
			case "Film Length":
			case "Film Negative Format":
			case "Printed Film Format":
			case "Aspect Ratio":
			case "Cinematographic Process":
			case "Camera":
			case "Laboratory":         l = "Technical?"; break;

			// Literature
			case "Screenplay / Teleplays":         l = "Literature?"; h = "#literature_scrp"; break;
			case "Original Literary Sources":      l = "Literature?"; h = "#literature_novl"; break;
			case "Adaptation of Literary Sources": l = "Literature?"; h = "#literature_adpt"; break;
			case "Related Books":                  l = "Literature?"; h = "#literature_book"; break;
			case "Production Process Protocols":   l = "Literature?"; h = "#literature_prot"; break;
			case "Interviews":                     l = "Literature?"; h = "#literature_iviw"; break;
			case "Printed Media Reviews":          l = "Literature?"; h = "#literature_crit"; break;
			case "Essays":                         l = "Literature?"; h = "#literature_essy"; break;
			case "Other Literary Information":     l = "Literature?"; h = "#literature_othr"; break;

			// Other
			case "Alternate Titles":         l = "ReleaseDates?"; h = "#akas"; break;
			case "Awards":                   l = "Tawards?"; break;
			case "Filming Locations":        l = "Locations?"; break;
			case "Taglines":                 l = "Taglines?"; break;
			case "Cast / Crew Verification": l = "Credits?"; h = "#cast"; break;
			default: return list;
		}
		return '<a style="color: black" target="_blank" href="' + ((window.location.hostname.match("pro")) ? 'http://www.imdb.com/' : '/') + l + encodeURIComponent(T.replace(/&amp;/g, "&")) + h + '">' + list + '</a>';
	}
	function linkifyObject(list) {
		var l;
		switch (list) {
			// Cast and Crew
			case "Cast":                             l = "fullcredits#cast"; break;
			case "Animation Department":             l = "fullcredits#animation_department"; break;
			case "Art Department":                   l = "fullcredits#art_department"; break;
			case "Art Directors":                    l = "fullcredits#art_directors"; break;
			case "Second Unit Directors or Assistant Directors": l = "fullcredits#assistant_directors"; break;
			case "Camera and Electrical Department": l = "fullcredits#camera_department"; break;
			case "Casting Department":               l = "fullcredits#casting_department"; break;
			case "Casting Directors":                l = "fullcredits#casting_directors"; break;
			case "Cinematographers":                 l = "fullcredits#cinematographers"; break;
			case "Composers":                        l = "fullcredits#music_original"; break;
			case "Costume and Wardrobe Department":  l = "fullcredits#costume_department"; break;
			case "Costume Designers":                l = "fullcredits#costume_designers"; break;
			case "Directors":                        l = "fullcredits#directors"; break;
			case "Editorial Department":             l = "fullcredits#editorial_department"; break;
			case "Editors":                          l = "fullcredits#editors"; break;
			case "Makeup Department":                l = "fullcredits#make_up_department"; break;
			case "Music Department":                 l = "fullcredits#music_department"; break;
			case "Producers":                        l = "fullcredits#producers"; break;
			case "Production Designers":             l = "fullcredits#production_designers"; break;
			case "Production Managers":              l = "fullcredits#production_managers"; break;
			case "Set Decorators":                   l = "fullcredits#set_decorators"; break;
			case "Sound Department":                 l = "fullcredits#sound_department"; break;
			case "Special Effects":                  l = "fullcredits#special_effects_department"; break;
			case "Stunts":                           l = "fullcredits#stunts"; break;
			case "Transportation Department":        l = "fullcredits#transportation_department"; break;
			case "Thanks":                           l = "fullcredits#thanks"; break;
			case "Visual Effects":                   l = "fullcredits#visual_effects_department"; break;
			case "Writers":                          l = "fullcredits#writers"; break;
			case "Other Crew":                       l = "fullcredits#miscellaneous"; break;

			// Company Credits
			case "Production Companies":      l = "companycredits#production"; break;
			case "Distributors":              l = "companycredits#distributors"; break;
			case "Special Effects Companies": l = "companycredits#specialEffects"; break;
			case "Miscellaneous Companies":   l = "companycredits#other"; break;
			case "Sales Representatives":     l = "companycredits"; break; //IMDbPro only

			// Basic Data
			case "Certificate (ratings) Information": l = "parentalguide#certification"; break;
			case "Release Dates": l = "releaseinfo#releases"; break;

			// Plot & Quotes
			case "Plot Summaries": l = "plotsummary"; break;
			case "Keywords":       l = "keywords"; break;
			case "Quotes":         l = "quotes"; break;

			// Fun Stuff
			case "Trivia":             l = (Object.match("title")) ? "trivia" : "bio#trivia"; break;
			case "Goofs":              l = "goofs"; break;
			case "Soundtracks":        l = "soundtrack"; break;
			case "Crazy Credits":      l = "crazycredits"; break;
			case "Alternate Versions": l = "alternateversions"; break;
			case "Movie Connections":  l = "movieconnections"; break;

			// Links to Other Sites
			case "External Reviews":   l = "externalreviews"; break;
			case "Official Sites":     l = "externalsites#official"; break;
			case "Miscellaneous":
			case "Miscellaneous Link": l = "externalsites#misc"; break;
			case "Image / Photos":
			case "Posters":            l = "externalsites#photos"; break;
			case "Sound clips":
			case "Sound Clips":        l = "externalsites#sounds"; break;
			case "Video clips":
			case "Video Clips":
			case "Trailers":           l = "externalsites#videos"; break;

			// Box Office and Business
			case "Budget":
			case "Opening Weekend":
			case "Gross":
			case "Weekend Gross":
			case "Admissions":
			case "Theatrical Rentals":
			case "Production Dates":
			case "Filming Dates":
			case "Copyright Holder":   l = "business"; break;

			// Technical Info
			case "Film Length":
			case "Film Negative Format":
			case "Printed Film Format":
			case "Aspect Ratio":
			case "Cinematographic Process":
			case "Camera":
			case "Laboratory":         l = "technical"; break;

			// Literature
			case "Screenplay / Teleplays":         l = "literature#literature_scrp"; break;
			case "Original Literary Sources":      l = "literature#literature_novl"; break;
			case "Adaptation of Literary Sources": l = "literature#literature_adpt"; break;
			case "Related Books":                  l = "literature#literature_book"; break;
			case "Production Process Protocols":   l = "literature#literature_prot"; break;
			case "Interviews":                     l = "literature#literature_iviw"; break;
			case "Printed Media Reviews":          l = "literature#literature_crit"; break;
			case "Essays":                         l = "literature#literature_essy"; break;
			case "Other Literary Information":     l = "literature#literature_othr"; break;

			// Other
			case "Alternate Titles":         l = "releaseinfo#akas"; break;
			case "Awards":                   l = "awards"; break;
			case "Filming Locations":        l = "locations"; break;
			case "Taglines":                 l = "taglines"; break;
			case "Cast / Crew Verification": l = "fullcredits#cast"; break;

			// Biographical Information
			case "Birth Name":                l = "bio#overview"; break;
			case "Nickname":                  l = "bio#overview"; break;
			case "Date of Birth":             l = "bio#overview"; break;
			case "Date of Death":             l = "bio#overview"; break;
			case "Height":                    l = "bio#overview"; break;
			case "Biography":                 l = "bio#mini_bio"; break;
			case "Real Life Quotes":          l = "bio#quotes"; break;
			case "Salary":                    l = "bio#salary"; break;
			case "Marriage Details":          l = "bio#spouse"; break;
			case "Trademark":                 l = "bio#trademark"; break;
			case "Books About This Person":   l = "publicity#bio_bo"; break;
			case "Biographical Movies":       l = "publicity#bio_bt"; break;
			case "Portrayed in Other Movies": l = "publicity#bio_pi"; break;
			case "Other work":                l = "otherworks"; break;
			case "Press Interviews":          l = "publicity#bio_it"; break;
			case "Articles in the Media":     l = "publicity#bio_at"; break;
			case "Magazine Pictorials":       l = "publicity#bio_pt"; break;
			case "Magazine Cover Photo":      l = "publicity#bio_cv"; break;
			default: return list;
		}
		return '<a style="color: black" target="_blank" href="' + Object + l + '">' + list + '</a>';
	}
	var Tables = document.getElementsByClassName("item");
	var TR = Tables[Tables.length-1].getElementsByTagName("tr");
	for (var i = 1; i < TR.length-1; i++)
		with (TR[i].getElementsByTagName("td")[3])
			if (getElementsByTagName("a")[0]) {
				var Object = getElementsByTagName("a")[0].getAttribute("href").replace("pro", "www");
				var Lists = innerHTML.match(/[^>]+(?= - &nbsp;)/g);
				for (var j in Lists)
					innerHTML = innerHTML.replace(RegExp(Lists[j] + "(?= - &nbsp;)"), linkifyObject(Lists[j]));
			}
			else if (innerHTML.match(/^New (?:Title|Episode)/)) {
				var T = innerHTML.split("<br>", 1)[0].split(" - ")[1];
				innerHTML = innerHTML.replace(T, '<a style="color: black" target="_blank" href="' + ((window.location.hostname.match("pro")) ? 'http://pro.imdb.com/' : '/') + 'Title?' + encodeURIComponent(T.replace(/&amp;/g, "&")) + '">' + T + '</a>');
				var Lists = innerHTML.split("<br><br>", 1)[0].match(/[^>]+(?= - &nbsp;)/g);
				for (var j in Lists)
					innerHTML = innerHTML.replace(RegExp(Lists[j] + "(?= - &nbsp;)"), linkifyTitle(Lists[j]));
			}

	// Counter
	Tables[Tables.length-1].getElementsByClassName("history_bottom")[1].insertAdjacentHTML('beforeend', '<a class="button" style="margin-left: 20px" href="#" id="counter">count</a> <span style="margin-left: 10px" id="counted"></span>');
	$("counter").addEventListener("click", function(event) {
		var x = 0;
		for (var i = 1; i < TR.length-1; i++) {
			var TD = TR[i].getElementsByTagName("td");
			if (TD[0].getElementsByTagName("input")[0].checked) {
				with (TD[3].innerHTML) {
					if (match(/^New (?:Title|Episode)/)) {
						x++;
						if (match(/^New Episode/))
							x++;
					}
					var n = slice(indexOf("<br>")).replace(/<[^>]+>/g, "").replace(/\([^\)]+\)/g, "").replace(/Miscellaneous (?:Comments|Corrections) - \&nbsp;\d+/g, "0").replace(/New Episode - /g, "2").match(/\d+/g);
					var N = (n) ? n.toString().split(",") : [0];
				}
				for (var j in N)
					x += parseInt(N[j], 10);
			}
		}
		this.blur();
		$("counted").innerHTML = x;
		event.stopPropagation();
		event.preventDefault();
	}, false);
}

})();