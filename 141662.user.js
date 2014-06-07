// ==UserScript==
// @name         mb. RELATE TO URL WITH DATES
// @version      2013.0109.0950
// @description  musicbrainz.org: Create new URL relationship directly with its dates (MBS-3774). Especially handy for blogs and things like that. (MAKE THIS SCRIPT RUN BEFORE ALL OTHERS)
// @namespace    http://userscripts.org/scripts/show/141662
// @author       Tristan DANIEL (PATATE12 aka. jesus2099/shamo)
// @licence      CC BY-NC-SA 3.0 FR (http://creativecommons.org/licenses/by-nc-sa/3.0/fr/)
// @grant        none
// @include      http*://*musicbrainz.org/edit/relationship/create_url?entity=*
// @run-at       document-end
// ==/UserScript==
(function(){
	var userjs = "jesus2099userjs141662";
	var RE_GUID = "[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}";
	var addedit;
	var dates={"begin":{"title":"Begin"},"end":{"title":"End"}};
	var useredits = document.querySelector("div#header-menu li.data a[href*='/user/'][href$='/edits']");
	var entity = document.querySelector("form table.form a");
	var type = document.querySelector("form table.form select[name='ar.link_type_id']");
	var form = getParent(type, "form");
	var url = document.querySelector("form table.form input[type='text'][name='ar.url']");
	var editnote = document.querySelector("form div.row > textarea[name='ar.edit_note']");
	var submit = document.querySelector("button.submit.positive[type='submit']");
	if (form && entity && useredits && type && url && editnote && submit) {
		useredits = useredits.getAttribute("href");
		var tbody = getParent(type, "tbody");
		for (var begend in dates) {
			if (dates.hasOwnProperty(begend)) {
				dates[begend].year = createTag("input", {"attribs":{"id":"id-ar.period."+begend+"_date.year","maxlength":"4","name":"ar.period."+begend+"_date.year","placeholder":"YYYY","size":"4","type":"text"}});
				dates[begend].month = createTag("input", {"attribs":{"id":"id-ar.period."+begend+"_date.month","maxlength":"2","name":"ar.period."+begend+"_date.month","placeholder":"MM","size":"2","type":"text"}});
				dates[begend].day = createTag("input", {"attribs":{"id":"id-ar.period."+begend+"_date.day","maxlength":"2","name":"ar.period."+begend+"_date.day","placeholder":"DD","size":"2","type":"text"}});
				newFormRow(tbody, 
					createTag("label", {"attribs":{"id":"label-id-ar.period."+begend+"_date","for":"id-ar.period."+begend+"_date.year"}}, [createTag("text: "+dates[begend].title+" date:")]), 
					createTag("span", {"attribs":{"class":"partial-date","display":"block"}}, [
						dates[begend].year,
						createTag("text: -"),
						dates[begend].month,
						createTag("text: -"),
						dates[begend].day
					])
				);
			}
		}
		dates.end.ended = createTag("input", {"attribs":{"id":"id-ar.period.ended","name":"ar.period.ended","type":"checkbox","value":"1"}});
		newFormRow(tbody, createTag("text: \u00a0"), createTag("label", {"attribs":{"for":"id-ar.period.ended","id":"label-id-ar.period.ended"}}, [dates.end.ended, " This relationship has ended."]));
		dates.end.ended.addEventListener("change", function(e) { dates.end.year.focus(); }, false);
		form.addEventListener("submit", function(e) {
			if (type.value != "" && url.value != "") {
				if (dates.begin.year.value != "" || dates.end.year.value != "" || dates.end.ended.checked) {
					if (!validates()) {
						alert("INVALID DATE(S)");
						return stop(e);
					}
					disable(true);
					submit.style.setProperty("background-color", "gold", "important");
					submit.style.setProperty("color", "black", "important");
					submit.replaceChild(createTag("text: adding URL\u2026"), submit.firstChild);
					var xhr = new XMLHttpRequest();
					xhr.onload = function (e) {
						if (this.status == 200) {
							var res = document.createElement("html"); res.innerHTML = this.responseText;
							if ((resentity = res.querySelector("h1 a")) && entity.getAttribute("href").replace(/^https?/i, "") == resentity.getAttribute("href").replace(/^https?/i, "")) {
								submit.replaceChild(createTag("text: retrieving URL add edit\u2026"), submit.firstChild);
								var xhr2 = new XMLHttpRequest();
								xhr2.onload = function (e) {
									if (this.status == 200) {
										var res2 = document.createElement("html"); res2.innerHTML = this.responseText;
										if ((urlentity = res2.querySelector("div#edits > form > div.edit-list > div.edit-details > table.details.add-relationship > tbody > tr > td > a[href^='"+url.value+"'] + a[href*='/url/']")) && urlentity.textContent.match(/^info$/i) && (edit = getParent(urlentity, "div", "edit-list").querySelector("div.edit-header > h2 > a[href*='/edit/']")) && (editid = edit.getAttribute("href").match(/[0-9]+$/))) {
											addedit = editid;
											submit.replaceChild(createTag("text: retrieving relationship\u2026"), submit.firstChild);
											var xhr3 = new XMLHttpRequest();
											xhr3.onload = function (e) {
												if (this.status == 200) {
													var res3 = document.createElement("html"); res3.innerHTML = this.responseText;
													if ((sameent = res3.querySelector("div#page > div#content > table.details > tbody > tr > td a[href='"+entity.getAttribute("href")+"']")) && (editrel = getParent(sameent, "td").querySelector("a[href*='/edit/relationship/edit'][href*='id=']")) && editrel.textContent.match(/^edit$/i)) {
														submit.replaceChild(createTag("text: loading relationship editor\u2026"), submit.firstChild);
														var xhr4 = new XMLHttpRequest();
														xhr4.onload = function (e) {
															if (this.status == 200) {
																var res4 = document.createElement("html"); res4.innerHTML = this.responseText;
																if (
																	(form4 = res4.querySelector("div#page > form")) &&
																	(ent0id = res4.querySelector("div#page > form td#entity0 input[name='ar.entity0.id']")) &&
																	(ent0name = res4.querySelector("div#page > form td#entity0 input[name='ar.entity0.name']")) &&
																	(linktype = res4.querySelector("div#page > form td select[name='ar.link_type_id']")) &&
																	(ent1id = res4.querySelector("div#page > form td#entity1 input[name='ar.entity1.id']")) &&
																	linktype.value == type.value
																) {
																	submit.replaceChild(createTag("text: setting date attributes (at last!)\u2026"), submit.firstChild);
																	var xhr5 = new XMLHttpRequest();
																	xhr5.onload = function (e) {
																		if (this.status == 200) {
																			var res5 = document.createElement("html"); res5.innerHTML = this.responseText;
																			if ((h1 = res5.querySelector("h1")) && !h1.textContent.match(/^edit relationship$/i)) {
																				self.location.href = document.referrer || entity.getAttribute("href");
																			}
																			else {
																				error("#26 setting dates");
																			}
																		}
																		else {
																			error("#18 setting dates");
																		}
																	};
																	xhr5.onerror = function (e) {
																		error("#19 setting dates");
																	};
																	xhr5.open("post", form4.getAttribute("action"), true);
																	var params = "ar.entity0.id="+ent0id.value+"&ar.entity0.name="+encodeURIComponent(ent0name.value)+"&ar.link_type_id="+linktype.value+"&ar.entity1.id="+ent1id.value+"&ar.edit_note="+encodeURIComponent("Dates automatically added after edit:"+addedit+" by '''''RELATE TO URL WITH DATES''''' userjs (http://tickets.musicbrainz.org/browse/MBS-3774).\n\n"+editnote.value);
																	for (var begend in dates) {
																		if (dates.hasOwnProperty(begend)) {
																			params += "&ar.period."+begend+"_date.year="+dates[begend].year.value;
																			params += "&ar.period."+begend+"_date.month="+dates[begend].month.value;
																			params += "&ar.period."+begend+"_date.day="+dates[begend].day.value;
																		}
																	}
																	if (dates.end.ended.checked) { params += "&ar.period.ended=1"; }
																	xhr5.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
																	xhr5.setRequestHeader("Content-length", params.length);
																	xhr5.setRequestHeader("Connection", "close");
																	xhr5.send(params);
																}
																else {
																	error("#31 loading relationship editor");
																}
															}
															else {
																error("#8 loading relationship editor");
															}
														};
														xhr4.onerror = function (e) {
															error("#9 loading relationship editor");
														};
														xhr4.open("get", editrel.getAttribute("href"), true);
														xhr4.send(null);
													}
													else {
														error("#20 loading relationship editor");
													}
												}
												else {
													error("#6 retrieving relationship");
												}
											};
											xhr3.onerror = function (e) {
												error("#7 retrieving relationship");
											};
											xhr3.open("get", urlentity.getAttribute("href"), true);
											xhr3.send(null);
										}
										else {
											error("#64 retrieving URL (your URL was probably wrong format)");
										}
									}
									else {
										error("#4 retrieving URL");
									}
								};
								xhr2.onerror = function (e) {
									error("#5 retrieving URL");
								};
								xhr2.open("get", useredits, true);
								xhr2.send(null);
							}
							else {
								error("#1 adding URL (already exist or wrong format or somtehing)");
							}
						}
						else {
							error("#2 adding URL");
						}
					};
					xhr.onerror = function (e) {
						error("#3 adding URL");
					};
					xhr.open("post", this.getAttribute("action"), true);
					var params = "ar.link_type_id="+type.value+"&ar.url="+encodeURIComponent(url.value)+"&ar.edit_note="+encodeURIComponent(editnote.value);
					xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
					xhr.setRequestHeader("Content-length", params.length);
					xhr.setRequestHeader("Connection", "close");
					xhr.send(params);
					return stop(e);
				}
				else {
					return true;
				}
			}
			else {
				alert("LINK TYPE AND URL ARE REQUIRED");
				return stop(e);
			}
		}, false);
	}
	function newFormRow(p, th, td) {
		return p.appendChild(createTag("tr", null, [
			createTag("th", {"attribs":{"class":"label"}}, [th]),
			createTag("td", {"attribs":{"colspan":"2"}}, [td])
		])).parentNode;
	}
	function stop(e) {
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();
		e.preventDefault();
		return false;
	}
	function disable(dis) {
		var inputs = form.querySelectorAll("input, select, textarea, button");
		if ((len = inputs.length) && len > 0) {
			for (var i=0; i < len; i++) {
				if (dis) { inputs[i].setAttribute("disabled", "disabled"); }
				else { inputs[i].removeAttribute("disabled"); }
			}
			return true;
		} else { return false; }
	}
	function validates() {
		for (var begend in dates) {
			if (dates.hasOwnProperty(begend)) {
				if (
					dates[begend].year.value != "" && !dates[begend].year.value.match(/[0-9]{4}/) ||
					dates[begend].month.value != "" && (dates[begend].year.value == "" || !dates[begend].month.value.match(/[0-9]{1,2}/) || ((m = parseInt(dates[begend].month.value, 10)) && (m < 1 || m > 12))) ||
					dates[begend].day.value != "" && (dates[begend].month.value == "" || !dates[begend].day.value.match(/[0-9]{1,2}/) || ((d = parseInt(dates[begend].day.value, 10)) &&( d < 1 || d > 31)))
				) { return false; }
			}
		}
		if (dates.begin.year.value != "" && dates.end.year.value != "" && (begin = new Date(dates.begin.year.value, dates.begin.month.value, dates.begin.day.value)) && (end = new Date(dates.end.year.value, dates.end.month.value, dates.end.day.value)) && begin > end) {
			return false;
		}
		return true;
	}
	function error(msg) {
		console.log(userjs+" ERROR "+msg);
		submit.replaceChild(createTag("text: ERROR "+msg), submit.firstChild);
		submit.style.setProperty("background-color", "pink", "important");
		disable(false);
	}
	function createTag(tag, params, children) {
		var t;
		if (text = tag.match(/^text: (.+)$/)) {
			t = document.createTextNode(text[1]);
		}
		else {
			t = document.createElement(tag);
			if (params) {
				for (var attr in params.attribs) { if (params.attribs.hasOwnProperty(attr)) { t.setAttribute(attr, params.attribs[attr]); } }
				for (var styl in params.styles) { if (params.styles.hasOwnProperty(styl)) { t.style.setProperty(styl, params.styles[styl], "important"); } }
				for (var evt in params.events) { if (params.events.hasOwnProperty(evt)) { t.addEventListener(evt, params.events[evt], false); } }
			}
			if (children) { for (var child=0; child < children.length; child++) { t.appendChild(typeof children[child]=="string"?document.createTextNode(children[child]):children[child]); } }
		}
		return t;
	}
	function getParent(obj, tag, cls) {
		var cur = obj;
		if (cur.parentNode) {
			cur = cur.parentNode;
			if (cur.tagName == tag.toUpperCase() && (!cls || cls && cur.className.match(new RegExp("\\W*"+cls+"\\W*")))) {
				return cur;
			} else {
				return getParent(cur, tag, cls);
			}
		} else {
			return null;
		}
	}
})();