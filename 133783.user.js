// ==UserScript==
// @name           4chan thread updater
// @namespace      4chanThreadUpdater
// @description		A simple automatic thread updater
// @updateURL		http://userscripts.org/scripts/source/133783.user.js
// @version			1.3.3
// @include        https://boards.4chan.org/*/res/*
// @include        http://boards.4chan.org/*/res/*
// ==/UserScript==


if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
	this.GM_getValue=function (key,def) {
		return (localStorage[key] || def);
	};
	this.GM_setValue=function (key,value) {
		return (localStorage[key] = value);
	};
}

(function() {
	var updateInterval = GM_getValue("updateInterval", 30),
		updateTitle = GM_getValue("updateTitle", "true"),
		markNewPosts = GM_getValue("markNewPosts", "true"),
		ajaxifyForms = GM_getValue("ajaxifyForms", "true"),
		timer, timerState = "", lastUpdate = 0, lastUpdateDate = new Date(), dontUnmarkNewPosts, toUnmark = {},
		threadUrl, thread, posts = {}, threadUpdaterCount, tuOptDlg, tuOptCall, hidden, changedTitle, ajxified, loadIcon = "data:image/gif;base64,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",
		init, startTimer, stopTimer, manageTimer, updateThread, markDeleted, markNew,
		buildOptionsDlg, ajaxifyReplyForm, ajaxifyDeleteForm, onReplyForm, onDeleteForm;
			
	updateThread = function() {
		var tmpState = timerState,
			generalError = function(response) {
				stopTimer("error", ";_;");
				// try restarting after 2 minutes if it wasn't a 404
				setTimeout(startTimer, 120000);
			};
		lastUpdate = 0;
		stopTimer("loading", '<img style="margin-top:4px;" src="'+loadIcon+'">');
		GM_xmlhttpRequest({
			method : "GET",
			headers: { "If-Modified-Since": lastUpdateDate.toUTCString() },
			url : threadUrl,
			onload : function(response) {
				var div, tmp, tmp2, newPosts = {}, i, j, nextPost, count;
				if (response.status === 200 && response.responseText) {
				// 200, check for updates
					count = 0;
					div = document.createElement("div");
					div.innerHTML = response.responseText;
					tmp = div.querySelectorAll(".postContainer");
					if (tmp.length !== 0) {
						if (markNewPosts && !dontUnmarkNewPosts && (typeof hidden === "undefined" || !document[hidden])) {
							tmp2 = thread.querySelectorAll(".postContainer");
							for (i = 0; i < tmp2.length; i += 1) {
								if (typeof toUnmark[tmp2[i].id] === "undefined" || toUnmark[tmp2[i].id] === 1) {
									markNew(tmp2[i], true);
									delete toUnmark[tmp2[i].id];
								} else if (typeof toUnmark[tmp2[i].id] !== "undefined") {
									toUnmark[tmp2[i].id] += 1;
								}
							}
						}
						for (i = 0; i < tmp.length; i += 1) {
							newPosts[tmp[i].id] = tmp[i];
							if (!posts[tmp[i].id]) {
								posts[tmp[i].id] = tmp[i];
								thread.appendChild(tmp[i]); 
								markNew(tmp[i]);
								toUnmark[tmp[i].id] = 0;
								count += 1;
							} else if (posts[tmp[i].id].className &&
								posts[tmp[i].id].className.indexOf(" deleted") !== -1) {
								
								markDeleted(posts[tmp[i].id], true);
							}
						}
						for (i in posts) {
							if (posts.hasOwnProperty(i)) {
								if (!newPosts[posts[i].id]) {
									markDeleted(posts[i]);
								}
							}
						}
						lastUpdateDate = new Date();
						if (updateTitle && count > 0 && typeof hidden !== "undefined" && document[hidden] === true) {
							if (changedTitle && /^\(([1-9][0-9]*)\)\s/.test(document.title)) {
								document.title = document.title.replace(/^\([1-9][0-9]*\)\s/, "("+(parseInt(RegExp.$1, 10) + count)+") ");
							} else  {
								document.title = "("+count+") " + document.title;
								changedTitle = true;
							}
						}
					}
					if (tmpState === "started") { startTimer(); }
					else { stopTimer("stopped"); }
				} else if(response.status === 304) {
				// no updates
					if (tmpState === "started") { startTimer(); }
					else { stopTimer("stopped"); }
				} else if(response.status === 404) {
				// 404, thread is gone
					stopTimer("error", ";_;");
				} else {
					generalError(response);
				}
			},
			onerror: function(response) {
				generalError(response);
			}
		});
	};
	
	markDeleted = function(el, unmark) {
		var tmp, img;
		if (!unmark && el.className.indexOf(" deleted") === -1) {
			el.className += " deleted";
			img = document.createElement("img");
			img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAytJREFUeNp8VEtIVFEY/s+5d4YRyzszampiPphqIUILgzAxFITQna4EgxFBEoxctHEXuJDCnQsfCW4iBMOVboQiH01YEZQTPmZGG1LyNT7G0Jm5557Tf65zZaTycP97zv3Pf77z/a9LhBDwghCwBkcxUC5nZFzLrqy8JwDwAUIY45uzs29OTk42KSoonB9q6gfDfafbXaxSqlX39w+4NO02i0YRSoDqdsNWc/O7952djxNCHEX399dSDxPJaAgZxfHjjtfbfevhwyfk6EghlNp+1NaC4Nw0VJxOKJqaAiMS0YWmJeZ7e59+GR/vdUgQaWC6hp58amt7xpaXxWpmpgjabCJAqVjB7VQJKooIqqoIFxUJFgjE573enmFFcQ5YQB8aGx8xn08ECgvFN1QtoPj/I3JP2gQ9HpGYmBBTdXXtQwA5ppsnu7v7JC0NslpagNpsMrTwz4GXQtJVrusYUCfoBwdR1MZNoKXp6ZeusbGK6x5Pe6izEyQoUVVQ7HZgx8eIS0BJTweOa24YIOJx8AwPw9eRkec/fb5RmWgzizK/B2trS3o4DCQ/H4oHB0HJzZU6uNrVBVmtrRAJhcBeWgrFfX2gUwpsYwMifv9nIwlyVg4KgI3FYpDZ1ASHhMxf6egANS8PaFlZ8FJ19S9pmOP1soO0tI+5DQ0gbfGM3QoCTfXfQBGMwaHfvyeTwDBesXD4N9vaihvIAhIJfri4uAe4lrap41yBcgmEwcSbqFwzFCJthCC6tUcINXC+GCjZHvKgZKRbmbLWMmO4lpfw02r+G0gqORqKUxbmzFLcZsmknAFdwIhIINM9IbhIZcG5sNiZ/JJAVqDFuabFwxxrx1AUcGRnOzjOTMbE5VIxuEpcgqgqcWRlORKyrlD0JEliMZKvaCAQctXUQHhyEpx2+93vAwOwg7USW1m5ue3z5UfQxj86atMMoyI0MwOZ5eWwt76+SlO7X/6PENpxv6fndXpBQX0cAWTRUaxsglVs/pAcDjCwdlRkmV5SAtsLC6/ednc/UE5zdA5ItoV2o6qq3qZpTtzgVlPL6az7KKWxnZ3dlbm5SdQdW/o/AgwAlbfHKhLH3GsAAAAASUVORK5CYII=";
			img.style.display = "block";
			img.style.margin = "4px 0 0 -2px";
			img.className = "imgdeleted";
			tmp = el.querySelector(".sideArrows");
			if (tmp) { tmp.appendChild(img); }
		} else if (unmark  && el.className.indexOf(" deleted") !== -1) {
			el.className = el.className.replace(" deleted", "");
			img = el.querySelector(".sideArrows img.imgdeleted");
			if (img) { img.parentNode.removeChild(img); }
		}
	};
	markNew = function(el, unmark) {
		var tmp, img;
		if (!unmark && el.className.indexOf(" newpost") === -1) {
			el.className += " newpost";
			img = document.createElement("img");
			img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH8SURBVHjalJJNaBNREMf/s7u2JKglTRMCCWKQQmEPXqRgvXiwRZrGgODRi2AvEq+FHlsRvGbxUPUkFClF6UcUCb1UEEEU8RDiTbGtttuUNhBSqbv7nPc2lpCsEN9+PN4w85v/zBvC/Bu0r3T1cSFmr+ZbbbvxrPV14Pbddl/Cs7cdgOFyRjyfWkTq5BV13qqv4fqDG3hvvqR2XwOahs5F+Lg7g0/VWWhEcIUH4j3I1wiIVn4OBxkM8vjs8Y8IgSsQQBrht+vCkVH8ekLa/gE4tzdXiNsrebRkSKZDaDCA1AMI1pFMh3GxkhFNgwLbsWsWjcxGxaM7T2FGxlXwRv0DDp0qShvTx1kFB4yl7iNsDHBjLyhbef8VJh/eBF26FxWjVxO+dKYa3ACd8ZpK4pcgAULq4N2Ru2wK76XXOzBUvdwwjdNJdS5L11XDNWjCV+AJvgl+JEDJl81lqow1ZNZE2MTpnjhDgF9OjR2OsHP4BcoAv+xkyOR/D0J6n7qZ2pHNitdBg09uFRJ7xfzfHkqpqbNhnDcjrMCXIAM+Vw6w9a3RVOCv7WjWIiy867iay99zIjeRUkOkymLQUnET62eWqas5kFG9OjeTAaIJ+O9BUpOrN8tyfVv3AP76e4dw6kRcneuOzcbN7gE/+iesuRfFPFrG82ckYwX5/hFgAC1dpr0GQ84FAAAAAElFTkSuQmCC";
			img.style.display = "block";
			img.style.margin = "6px 0 0 -1px";
			img.className = "imgnewpost";
			tmp = el.querySelector(".sideArrows");
			if (tmp) { tmp.appendChild(img); }
		} else if (unmark  && el.className.indexOf(" newpost") !== -1) {
			el.className = el.className.replace(" newpost", "");
			img = el.querySelector(".sideArrows img.imgnewpost");
			if (img) { img.parentNode.removeChild(img); }
		}
	};
	
	manageTimer = function() {
		threadUpdaterCount.innerHTML = updateInterval - lastUpdate;
		lastUpdate += 1;
		if (updateInterval < 5) { updateInterval = 5; }
		if (lastUpdate > updateInterval) {
			updateThread();
		}
	};
	startTimer = function() {
		clearInterval(timer);
		manageTimer();
		timer = setInterval(manageTimer, 1000);
		threadUpdaterCount.className = timerState = "started";
	};
	stopTimer = function(state, txt) {
		clearInterval(timer);
		threadUpdaterCount.className = timerState = state;
		threadUpdaterCount.innerHTML = txt || "-";
	};
	
	buildOptionsDlg = function() {
		var tuDiv, tuDivOptCall, tuNow, tuInput, tuOnLoad, toggleDlg,
			tuOptTitle, tuOptMarkNew, tuOptDontUnmarkNew, tuOptUnmarkNow, tuAjaxifyForms,
			sa = function(el, attr) { for (var i in attr) { if (attr.hasOwnProperty(i)) { el[i] = attr[i]; } } return el; },
			ac = function(el, c) { for (var i in c) { if (c.hasOwnProperty(i)) { el.appendChild(c[i]); }	} return el; },
			ce = function(el, attr) { return sa(document.createElement(el), attr); },
			ct = function(t) { return document.createTextNode(t); };
		
		GM_addStyle(".postContainer.newpost .post, .postContainer.newpost .post.highlight {border-left:3px solid #117743!important;border-left-colors:#117743!important;-moz-border-left-colors:#117743!important;} \
			.postContainer.deleted .post, .postContainer.deleted .post.highlight {border-left:3px solid #DD0000!important;border-left-colors:#DD0000!important;-moz-border-left-colors:#DD0000!important;} \
			#threadUpdater {position:fixed;bottom:0px;right:0px;width:50px;height:20px;} \
			#threadUpdater #threadUpdaterOptionCall{position:absolute;height:20px;top:-1px;z-index:1;padding:1px 2px 0!important;cursor:pointer;} \
			#threadUpdater #threadUpdaterCount{cursor:pointer;width:20px;float:right;text-align:right;height:20px;padding:0 6px 0px;} \
			#threadUpdater #threadUpdaterCount.started{border-right:5px solid #00bb00;} \
			#threadUpdater #threadUpdaterCount.stopped{border-right:5px solid #000000;} \
			#threadUpdater #threadUpdaterCount.loading{border-right:5px solid #bbbb00;} \
			#threadUpdater #threadUpdaterCount.error{border-right:5px solid #bb0000;} \
			#threadUpdaterOptionDialog{display:none;padding:3px 4px 4px;position:fixed;bottom:20px;right:0px;} \
			#threadUpdaterOptionDialog #threadUpdaterInterval{width:21px;margin-left:4px;} \
			#threadUpdaterOptionDialog a {margin-top:4px;display:block;text-align:right;cursor:pointer;}\
			#threadUpdaterReplyStatus {visibility:hidden;} \
			#tuDeleteStatus {position:absolute;right:6px;height:20px;margin-top:-43px;}");
			
		tuDiv = ce("div", {id:"threadUpdater"});
		tuOptCall = ce("div", {id:"threadUpdaterOptionCall", innerHTML: "+"});
		threadUpdaterCount = ce("div", {id:"threadUpdaterCount", innerHTML: "-", "className": "stopped"});
		ac(tuDiv, [tuOptCall, threadUpdaterCount]);
		
		tuOptDlg = ce("div", {id: "threadUpdaterOptionDialog", "className":"reply"});
		tuOnLoad = ce("input", {type: "checkbox", checked: GM_getValue("onLoad", "true") === "true" ? "checked" : ""});
		tuAjaxifyForms = ce("input", {type: "checkbox", checked: GM_getValue("ajaxifyForms", "true") === "true" ? "checked" : ""});
		tuOptTitle = ce("input", {type: "checkbox", checked: updateTitle === "true" ? "checked" : ""});
		tuOptMarkNew = ce("input", {type: "checkbox", checked: markNewPosts === "true" ? "checked" : ""});
		tuOptDontUnmarkNew = ce("input", {type: "checkbox"});
		tuInput = ce("input", {id: "threadUpdaterInterval", value: updateInterval});
		tuOptUnmarkNow = ce("a", {innerHTML: "unmark now"});
		tuNow = ce("a", {innerHTML: "update now"});
		ac(tuOptDlg,
			[tuInput, ct(" interval"), ce("br"),
			ac(ce("label"), [tuOnLoad, ct(" on load")]), ce("br"),
			ac(ce("label"), [tuOptTitle, ct(" new posts in title")]), ce("br"),
			ac(ce("label"), [tuAjaxifyForms, ct(" ajaxify forms")]),ce("br"),
			ac(ce("label"), [tuOptMarkNew, ct(" mark new posts")]), ce("br"),
			ce("hr"),
			ac(ce("label"), [tuOptDontUnmarkNew, ct(" don't unmark new")]), ce("br"),
			tuOptUnmarkNow,
			tuNow]
		);
		
		threadUpdaterCount.addEventListener("click", function() {
			if (timerState === "started") { stopTimer("stopped"); }
			else { startTimer(); }
		}, false);
		
		toggleDlg = function() {
			if (tuOptDlg.style.display === "block") {
				tuOptDlg.style.display="none";
				sa(tuOptCall, {innerHTML:"+", className:""});
			} else {
				tuOptDlg.style.display="block";
				sa(tuOptCall, {innerHTML:"-", className:"reply"});
			}
		};
		tuOptCall.addEventListener("click", toggleDlg, false);
		tuNow.addEventListener("click", function() {
			updateThread();
			toggleDlg();
			return false;
		}, false);
		tuOptUnmarkNow.addEventListener("click", function() {
			var tmp = thread.querySelectorAll(".postContainer"), i;
			for (i = 0; i < tmp.length; i += 1) {
					markNew(tmp[i], true);
					delete toUnmark[tmp[i].id];
			}
			toggleDlg();
			return false;
		}, false);
		
		tuInput.addEventListener("input", function(e) {
			GM_setValue("updateInterval", updateInterval = this.value);
		}, false);
		tuOnLoad.addEventListener("change", function(e) {
			GM_setValue("onLoad", this.checked.toString());
		}, false);
		tuAjaxifyForms.addEventListener("change", function(e) {
			GM_setValue("ajaxifyForms", ajaxifyForms = this.checked.toString());
			if (ajaxifyForms === "true") {
				ajaxifyReplyForm();
				ajaxifyDeleteForm();
				ajxified = true;
			} else {
				document.querySelector("form[name=post]").removeEventListener("submit", onReplyForm, false);
				document.querySelector("form[name=delform]").removeEventListener("submit", onDeleteForm, false);
				ajxified = false;
			}
		}, false);
		tuOptTitle.addEventListener("change", function(e) {
			GM_setValue("updateTitle", updateTitle = this.checked.toString());
		}, false);
		tuOptMarkNew.addEventListener("change", function(e) {
			GM_setValue("markNewPosts", markNewPosts = this.checked.toString());
		}, false);
		tuOptDontUnmarkNew.addEventListener("change", function(e) {
			dontUnmarkNewPosts = this.checked;
		}, false);
		
		ac(document.body, [tuDiv, tuOptDlg]);
	};
	
	ajaxifyReplyForm = function() {
		var form = document.querySelector("form[name=post]"),
			tuReplyStatus, tuReplyStatusField;
		if (!ajxified && window.FormData && form) {
			tuReplyStatus = document.createElement("tr");
			tuReplyStatus.setAttribute("id", "threadUpdaterReplyStatus");
			tuReplyStatusField = form.querySelector("#postForm tbody");
			tuReplyStatusField.insertBefore(tuReplyStatus, tuReplyStatusField.childNodes[0]);
			tuReplyStatusField = document.createElement("td");
			tuReplyStatusField.innerHTML = "Send status";
			tuReplyStatus.appendChild(tuReplyStatusField);
			tuReplyStatusField = document.createElement("td");
			tuReplyStatusField.style.paddingLeft = "2px";
			tuReplyStatus.appendChild(tuReplyStatusField);
			form.addEventListener("submit", onReplyForm = function(e) {
				var postData, xhr, i, busy = 0;
				tuReplyStatusField.innerHTML = '<img style="margin-top:2px;" src="'+loadIcon+'">';
				tuReplyStatus.style.visibility = "visible";
				
				postData = new window.FormData(form);

				xhr = new XMLHttpRequest();
				xhr.open("POST", form.action, true);
				xhr.onreadystatechange = function(state) {
					var response, i, tmp, input;
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							if (/(Error\:\s[^<]*)</i.test(xhr.responseText)) {
								tuReplyStatusField.innerHTML = RegExp.$1;
								tuReplyStatusField.style.color = "#DD0000";
							} else {
								tuReplyStatusField.style.color = "";
								tuReplyStatusField.innerHTML = "Success!";
								lastUpdateDate = new Date(0); 
								for (i in form.elements) {
									if (form.elements[i].name === "sub" || form.elements[i].name === "com" ||
										form.elements[i].name === "recaptcha_response_field") {
											form.elements[i].value = "";
									} else if (form.elements[i].name === "upfile") {
										input = form.elements[i];
										tmp = document.createElement("input");
										tmp.setAttribute("type", "file");
										input.parentNode.insertBefore(tmp, input);
										input.parentNode.removeChild(input);
										tmp.setAttribute("id", "postfile");
										tmp.setAttribute("name", "upfile");
									}
								}
							}
						} else {
							tuReplyStatusField.innerHTML = "Something went wrong!";
							tuReplyStatusField.style.color = "#DD0000";
						}
						if (unsafeWindow.Recaptcha){
							unsafeWindow.Recaptcha.reload();
						}
						busy += 1;
						setTimeout(function() {
							if (busy === 1) {
								tuReplyStatusField.innerHTML = "";
								tuReplyStatus.style.visibility = "hidden";
							} 
							busy -= 1;
						}, 5000);
					}
				};
				xhr.send(postData);
				
				e.preventDefault();
				return false;
			}, false);
		}
	};
	ajaxifyDeleteForm = function() {
		var form = document.querySelector("form[name=delform]"),
			cont, tuDeleteStatus, tmp;
			
		if (!ajxified && window.FormData && form) {
			cont = form.querySelector(".deleteform");
			tuDeleteStatus = document.createElement("div");
			tuDeleteStatus.setAttribute("id", "tuDeleteStatus");
			cont.appendChild(tuDeleteStatus);
			
			form.addEventListener("submit", onDeleteForm = function(e) {
				var postData, xhr, i, busy = 0;
				tuDeleteStatus.innerHTML = '<img style="margin-top:2px;" src="'+loadIcon+'">';
				postData = new window.FormData(form);
				xhr = new XMLHttpRequest();
				xhr.open("POST", form.action, true);
				xhr.onreadystatechange = function(state) {
					var response, i, tmp, input;
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							if (/(Error\:\s[^<]*)</i.test(xhr.responseText)) {
								tuDeleteStatus.innerHTML = RegExp.$1;
								tuDeleteStatus.style.color = "#DD0000";
							} else {
								tuDeleteStatus.innerHTML = "Success!";
								tuDeleteStatus.style.color = "";
								tmp = form.querySelectorAll(".postInfo input[type=checkbox]");
								for (i = 0; i < tmp.length; i += 1) {
									tmp[i].checked = null;
								}
							}
						}
					}
					busy += 1;
					setTimeout(function() {
						if (busy === 1) {
							tuDeleteStatus.innerHTML = "";
						}
						busy -= 1;
					}, 5000);
				};
				xhr.send(postData);
				
				e.preventDefault();
				return false;
			}, false);
		}
	};
	
	init = function() {
		var tmp, i, visibilityChange;
		thread = document.querySelector(".thread");
		threadUrl = location.pathname;
		tmp = document.querySelectorAll(".postContainer");
		for (i = 0; i < tmp.length; i += 1) {
			posts[tmp[i].id] = tmp[i];
		}
		buildOptionsDlg();
		
		if (typeof document.hidden !== "undefined") { hidden = "hidden";  visibilityChange = "visibilitychange"; }
		else if (typeof document.mozHidden !== "undefined") { hidden = "mozHidden"; visibilityChange = "mozvisibilitychange"; }
		else if (typeof document.webkitHidden !== "undefined") { hidden = "webkitHidden"; visibilityChange = "webkitvisibilitychange"; }
		if (typeof hidden !== "undefined") { 
			document.addEventListener(visibilityChange, function() {
				var tmp;
				if (updateTitle && changedTitle && document[hidden] === false && /^\([1-9][0-9]*\)\s/.test(document.title)) {
					document.title = document.title.replace(/^\([1-9][0-9]*\)\s/, "");
					changedTitle = false;
				} else if (document[hidden] === true) {
					if (!dontUnmarkNewPosts) {
						tmp = thread.querySelectorAll(".postContainer");
						for (i = 0; i < tmp.length; i += 1) {
							markNew(tmp[i], true);
							if (toUnmark[tmp[i].id]) { delete toUnmark[tmp[i].id]; }
						}
					}
					if (tuOptDlg) { 
						tuOptDlg.style.display = "none"; 
						tuOptCall.innerHTML = "+";
					}
				}
			}, false); 
		}
		document.addEventListener("click", function(e) {
			if (tuOptDlg && e.originalTarget.id && e.originalTarget !== tuOptCall && e.originalTarget !== tuOptDlg) {
				if (tuOptDlg && tuOptDlg.style.display !== "none") {
					tuOptDlg.style.display = "none"; 
					tuOptCall.innerHTML = "+";
				}
			}
		}, false);

		if (ajaxifyForms === "true") {
			ajaxifyReplyForm();
			ajaxifyDeleteForm();
			ajxified = true;
		}
		if (GM_getValue("onLoad", "true") === "true") {
			startTimer();
		}
	};
	if(document.body) { init(); }
	else { window.addEventListener("DOMContentLoaded", init, false); }
}());