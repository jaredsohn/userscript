// ==UserScript==
// @name           MB. create work with its ISWC
// @version        2012.0823.1404
// @description    Create new works directly with an ISWC as before MBS-4727
// @namespace      http://userscripts.org/scripts/show/140909
// @author         Tristan DANIEL (jesus2099)
// @contact        http://miaou.ions.fr
// @licence        GPL (http://www.gnu.org/copyleft/gpl.html)
// @include        http://*musicbrainz.org/work/*
// ==/UserScript==
(function () {
	var userjs = "jesus2099userjs140909";
	var RE_GUID = "[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}";
	var mbid, iswc;
	if (pagecat = self.location.href.match(new RegExp("work\/([^/]+\/edit$|create)"))) {
		pagecat = pagecat[1].replace(new RegExp(RE_GUID+"/"), "");
		var name = document.querySelector("div.row > input[name='edit-work.name']");
		var comment = document.querySelector("div.row > input[name='edit-work.comment']");
		var type = document.querySelector("div.row > select[name='edit-work.type_id']");
		var language = document.querySelector("div.row > select[name='edit-work.language_id']");
		var editnote = document.querySelector("div.row > textarea[name='edit-work.edit_note']");
		var form = type?getParent(type, "form"):null;
		var submit = document.querySelector("button.submit.positive[type='submit']");
		switch (pagecat) {
			case "create":
				if (form && name && comment && type && language && editnote && submit) {
					iswc = getParent(type, "fieldset").insertBefore(createTag("div", {"attribs":{"class":"row"}}, [
						createTag("label", {"attribs":{"for":"id-edit-work.iswc","id":"label-id-edit-work.iswc"}}, ["ISWC:"]), 
						createTag("input", {"attribs":{"id":"id-edit-work.iswc", "name":"edit-work.iswc", "type":"text"}})
					]), getParent(type, "div", "row")).querySelector("input");
					form.addEventListener("submit", function(e) {
						if (iswc.value != "") {
							disable(true);
							submit.style.setProperty("background-color", "gold", "important");
							submit.style.setProperty("color", "black", "important");
							submit.replaceChild(createTag("text: creating work\u2026"), submit.firstChild);
							var xhr = new XMLHttpRequest();
							xhr.onload = function (e) {
								if (this.status == 200) {
									var res = document.createElement("html"); res.innerHTML = this.responseText;
									if (work = res.querySelector("h1 a")) {
										mbid = work.getAttribute("href").match(new RegExp(RE_GUID));
										submit.replaceChild(createTag("text: adding ISWC\u2026"), submit.firstChild);
										var xhr2 = new XMLHttpRequest();
										xhr2.onload = function (e) {
											if (this.status == 200) {
												self.location.href = "/work/"+mbid;
											}
											else {
												error("#4 adding ISWC to work");
											}
										};
										xhr2.onerror = function (e) {
											error("#5 adding ISWC to work");
										};
										xhr2.open("post", "/work/"+mbid+"/add-iswc", true);
										var params = "add-iswc.iswc="+iswc.value+"&add-iswc.edit_note="+encodeURIComponent("ISWC added by '''''create work with ISWC''''' userjs (http://userscripts.org/scripts/show/140909).\n\n"+editnote.value);
										xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
										xhr2.setRequestHeader("Content-length", params.length);
										xhr2.setRequestHeader("Connection", "close");
										xhr2.send(params);
									}
									else {
										error("#1 adding work ("+res.querySelector("h1").textContent+")");
									}
								}
								else {
									error("#2 adding work");
								}
							};
							xhr.onerror = function (e) {
								error("#3 adding work");
							};
							xhr.open("post", "/work/create", true);
							var params = "edit-work.name="+encodeURIComponent(name.value)+"&edit-work.comment="+encodeURIComponent(comment.value)+"&edit-work.type_id="+type.value+"&edit-work.language_id="+language.value+"&edit-work.edit_note="+encodeURIComponent(editnote.value);
							xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
							xhr.setRequestHeader("Content-length", params.length);
							xhr.setRequestHeader("Connection", "close");
							xhr.send(params);
							return stop(e);
						}
						else {
							return true;
						}
					}, false);
				}
				break;
			case "edit":
				break;
		}
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
			for (attr in params.attribs) { if (params.attribs.hasOwnProperty(attr)) { t.setAttribute(attr, params.attribs[attr]); } }
			for (styl in params.styles) { if (params.styles.hasOwnProperty(styl)) { t.style.setProperty(styl, params.styles[styl], "important"); } }
			for (evt in params.events) { if (params.events.hasOwnProperty(evt)) { t.addEventListener(evt, params.events[evt], false); } }
			if (children) { for (var child=0; child < children.length; child++) { t.appendChild(typeof children[child]=="string"?document.createTextNode(children[child]):children[child]); } }
		}
		return t;
	}
	function getParent(obj, tag, cls) {
		var cur = obj;
		if (cur.parentNode) {
			cur = cur.parentNode;
			if (cur.tagName == tag.toUpperCase() && (!cls || cls && cur.className.match(new RegExp("(^| )"+cls+"($| )")))) {
				return cur;
			} else {
				return getParent(cur, tag, cls);
			}
		} else {
			return null;
		}
	}
})();