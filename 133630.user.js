// ==UserScript==
// @name			4chan backwash another
// @namespace	4chanBackwashAnother
// @description		tooltips for 4chan post quotes, as seen on /b/ackwash reloaded
// @version			1.2.3
// @updateURL			http://userscripts.org/scripts/source/133630.user.js
// @include			http://boards.4chan.org/*
// @include			https://boards.4chan.org/*
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
	var popupEl, activePost, postCache = {},
		init, wash, show, hide, toggle, backwash, getPost, buildOptions, createPopup,
		highlight, dontShowOnScreen;
		
	// config
		
		// highlight quote target posts
		highlight = GM_getValue("highlight", "true");
		// only show tooltip if target post is offscreen
		dontShowOnScreen = GM_getValue("dontShowOnScreen", "false");
	
		
	wash = function(post) {
		var links = post.querySelectorAll("a.quotelink, a.backLink"),
			postId, threadId, targetThread, targetPost, qo, link, type, tmp, i, parents = {};
		
		if (post.id.indexOf("pc") === 0) {
			postId = post.id.substr(2);
		} else if (post.id.indexOf("p") === 0) {
			postId = post.id.substr(1);
		} else if (post.id.indexOf("q") === 0) {
			tmp = post.id.substr(1).split("-");
			postId = tmp[tmp.length-1];
		}

		tmp = post.parentNode;
		while(tmp && tmp.className !== "thread") {
			if ((tmp.id.indexOf("p") === 0 && tmp.id.indexOf("pc") === -1) || tmp.id.indexOf("m") === 0) { parents[tmp.id.substr(1)] = true;  }
			tmp = tmp.parentNode;
		}
		if (tmp) {threadId = tmp.id.substr(1);}
		
		for (i = 0; i < links.length; i += 1) {
			if (links[i].href.indexOf("#") !== -1) {
				
				if(links[i].pathname.indexOf("/res/") === -1) {
					tmp = links[i].pathname.match(/.*\/([0-9]+)$/)[1];
					links[i].pathname = links[i].pathname.split(tmp)[0]+"res/"+tmp;
				}
				tmp = links[i].href.split("#");
				link = tmp[0];
				targetThread = tmp[0].substr(tmp[0].lastIndexOf("/")+1);
				targetPost = tmp[1].substr(1);
				
				tmp = document.getElementById("pc"+targetPost);
				if (tmp && tmp.className.indexOf("opContainer") !== -1 && targetPost === threadId) {
					type = "op";
					links[i].innerHTML = links[i].innerHTML.replace(" (OP)", "") + " (OP)";
				} else if (!tmp) {
					type = "out";
					if (targetThread === threadId) {
						links[i].innerHTML = links[i].innerHTML.replace(" (this thread)", "") + " (this thread)";
					} else {
						links[i].innerHTML = links[i].innerHTML.replace(" (thread:"+targetThread+")", "") + " (thread:"+targetThread+")";
					}
				} else {
					type = "onsite"; 
					while(tmp && tmp.className !== "thread") {
						tmp = tmp.parentNode;
					}
					if (tmp && targetThread !== threadId) {
						links[i].innerHTML = links[i].innerHTML.replace(" (thread:"+targetThread+")", "") + " (thread:"+targetThread+")";
					}
				}
				qo = {
					el: links[i],
					link: link,
					type: type,
					targetPost: targetPost,
					targetThread: targetThread,
					postId: postId,
					threadId: threadId,
					parents: parents
				};
				if (links[i].className.indexOf("backLink") !== -1) { qo.backLink = true;}
				links[i].addEventListener("mouseover", show.bind(qo), false);
				links[i].addEventListener("mousemove", show.bind(qo), false);
				links[i].addEventListener("mouseout", hide.bind(qo), false);
				links[i].addEventListener("click", toggle.bind(qo), false); 
				
				if (post.className.indexOf("backPost") === -1 && links[i].className !== "backLink" && !(links[i].parentNode.parentNode.className && links[i].parentNode.parentNode.className === "backlink")) {
					backwash(qo);
				}
			}
		}
	};

	show = function(e) {
		var html = "", tmp, tmp2, qo = this, i,
			posFunc = function() {
				var posX, posY, tmp,
					dY = popupEl.clientHeight;
		
				if(e.pageY - dY < window.scrollY) {
					posY = window.scrollY;
					posX = e.pageX+20;
				} else {
					posY = e.pageY-dY-20;
					posX = e.pageX-20;
				}
				popupEl.style.left = posX+"px";
				popupEl.style.top = posY+"px";
				
				tmp = document.getElementById("p"+qo.targetPost);
				if (dontShowOnScreen !== "true" || !tmp || qo.type === "op" || (tmp && 
					((window.scrollY > tmp.offsetTop) ||
					(window.scrollY + window.innerHeight < tmp.offsetTop+dY)))) {
						popupEl.style.visibility = "visible";
				} 
			},
			setContent = function(html, skip) {
				var tmp, tmp2;
				popupEl.innerHTML = html;
				tmp = popupEl.querySelectorAll(".post.reply, .bwfxfix");
				for (i = 0; i < tmp.length; i += 1) {
					tmp[i].parentNode.removeChild(tmp[i]);
				}
				tmp = popupEl.getElementsByTagName("img");
				for (i = 0; i < tmp.length; i += 1) {
					tmp[i].style.maxHeight = "none";
					tmp[i].style.maxWidth = "none";
				}
				tmp = popupEl.querySelectorAll(".quotelink");
				for (i = 0; i < tmp.length; i += 1) {
					tmp2 = tmp[i].href.split("#");
					if (tmp2 && tmp2[1] && tmp2[1].substr(1) === qo.postId) {
						tmp[i].setAttribute("style", "border-bottom:1px solid #DD0000;");
					}
				}
			};
		
		if (!popupEl) { createPopup(); }
		if (popupEl.style.visibility === "hidden" || activePost !== this.targetPost) {
			tmp = document.getElementById("p"+qo.targetPost);
			if (tmp) {
				if (highlight === "true" && tmp.className.indexOf("highlight") === -1) { tmp.className += " highlight"; }
				setContent(tmp.innerHTML);
				tmp = tmp.querySelectorAll(".quotelink");
				for (i = 0; i < tmp.length; i += 1) {
					tmp2 = tmp[i].href.split("#");
					if (tmp2 && tmp2[1] && tmp2[1].substr(1) === qo.postId) {
						tmp[i].setAttribute("style", "border-bottom:1px solid #DD0000;");
					}
				}
			} else {
				setContent("loading...");
				getPost(this, function(html) {
					setContent(html);
					if (popupEl.style.visibility !== "hidden") { posFunc(); }
					var div = qo.el.parentNode.parentNode.querySelector(".post.reply");
					if (div && div.innerHTML === "loading...") {
						backwash(div);
						div.innerHTML = popupEl.innerHTML;
					}
				});
			}
			activePost = this.targetPost;
		}
		posFunc();
	};
	
	hide = function(e) {
		var tmp, tmp2, i;
		popupEl.style.visibility = "hidden";
		tmp = document.getElementById("p"+this.targetPost);
		if (tmp) { tmp.className = tmp.className.replace(" highlight", ""); }
		tmp2 = tmp.querySelectorAll(".quotelink");
		for (i = 0; i < tmp2.length; i += 1) {
			if (tmp2[i].parentNode.parentNode === tmp ||tmp2[i].parentNode.parentNode.parentNode === tmp) {
				tmp2[i].removeAttribute("style");
			}
		}
	};
	
	toggle = function(e) {
		var tmp, tmp2, div, ins, i, ids = "";
		if (!this.parents[this.targetPost]) {
			for (i in this.parents) {
				if (this.parents.hasOwnProperty(i)) {
					ids += i+"-";
				}
			}
			ids += this.postId+"-"+this.targetPost;
			if (this.backLink) {
				tmp = this.el.parentNode.parentNode.querySelector("#q"+ids);
				if (tmp) {
					tmp.parentNode.removeChild(tmp);
				} else {
					div = document.createElement("div");
					div.innerHTML = popupEl.innerHTML;
					div.setAttribute("class", "post reply backPost");
					div.setAttribute("style", "padding: 5px;border:1px dashed #AAA;");
					div.setAttribute("id", "q"+ids);
					tmp = this.el.parentNode.parentNode.querySelector(".postMessage");
					// FIXME: wtf, firefox
					if (tmp.childNodes[0].className === "bwfxfix") { tmp.insertBefore(div, tmp.childNodes[1]); }
					else { tmp.insertBefore(div, tmp.childNodes[0]); }
					tmp2 = tmp.querySelector(".bwfxfix");
					if (!tmp2) {
						tmp2 = document.createElement("div");
						tmp2.setAttribute("class", "bwfxfix");
						tmp2.setAttribute("style", "height:0.1px;width:0;");
						tmp.insertBefore(tmp2,tmp.childNodes[0]);
					}
				}
			} else {
				if (this.el.parentNode.className.indexOf("quote") === 0) { ins = this.el.parentNode; }
				else if (this.el.parentNode.className.indexOf("postMessage") === 0) { ins = this.el; }
				if (ins.nextSibling && ins.nextSibling.className && ins.nextSibling.className.indexOf("post") !== -1) {	
					ins.parentNode.removeChild(ins.nextSibling);
				} else {
					div = document.createElement("div");
					div.innerHTML = popupEl.innerHTML;
					div.setAttribute("class", "post reply");
					div.setAttribute("style", "padding: 5px;border:1px dashed #AAA;");
					div.setAttribute("id", "q"+ids);
					ins.parentNode.insertBefore(div, ins.nextSibling);	
				}
			}
		}
		e.preventDefault();
		e.stopImmediatePropagation();
		return false;
	};
	
	backwash = function(qo) {
		var target = document.getElementById("p"+qo.targetPost), link, tqo;
		if (target && qo.postId && qo.link && !document.getElementById("backLink"+qo.postId+"-"+qo.targetPost)) {
			link = document.createElement("a");
			link.innerHTML = qo.postId;
			link.href = qo.link+"#p"+qo.postId;
			link.id = "backLink"+qo.postId+"-"+qo.targetPost;
			link.className = "backLink";
			link.style.fontSize = "0.9em";
			link.style.paddingRight = "4px";
			tqo = {
				el: link,
				link: qo.link,
				targetPost: qo.postId,
				targetThread: qo.threadId,
				postId: qo.targetPost,
				threadId: qo.targetThread,
				backLink: true,
				parents: qo.parents
			};
			link.addEventListener("mouseover", show.bind(tqo), false);
			link.addEventListener("mousemove", show.bind(tqo), false);
			link.addEventListener("mouseout", hide.bind(tqo), false);
			link.addEventListener("click", toggle.bind(tqo), false); 
			target.querySelector(".postInfo").appendChild(link);
		}
	};
	
	getPost = function(qo, cb) {
		var retFunc = function() {
			if (cb) { cb(postCache[qo.targetThread][qo.targetPost] || "post not found"); }
		};
		if (postCache[qo.targetThread]) {
			retFunc();
		} else {
			GM_xmlhttpRequest({
				method : "GET",
				url : qo.link,
				onload : function(response) {
					var div = document.createElement("div"), posts, html, i, id;
					div.innerHTML = response.responseText;
					
					postCache[qo.targetThread] = {};
					posts = div.querySelectorAll(".post");

					for (i = 0; i < posts.length; i += 1) {
						id = posts[i].id.substr(1);
						postCache[qo.targetThread][id] = posts[i].innerHTML;
					}
					retFunc();
				}
			});
		}
	};
	
	buildOptions = function() {
		var sbc, tmp, tmp2, frag = document.createDocumentFragment(), sa, ce, ac;
			
		sbc = document.getElementById("settingsBoxContent");
		if (sbc) {
			sa = function(el, attr, s) { for (var i in attr) { if (attr.hasOwnProperty(i)) { el[i] = attr[i]; } } if(s) {el.style.cssText = s; } return el; };
			ce = function(el, attr, s) { return sa(document.createElement(el), attr, s); };
			ct = function(txt) { return document.createTextNode(txt); };
			ac = function(el) { frag.appendChild(el); };

			ac(ce("label", {"textContent": "backwash another"}));
			ac(ce("br"));
			tmp = ce("label");
			tmp.appendChild(tmp2 = ce("input", {"type": "checkbox", "checked": (highlight === "true" ? "checked" : "")}));
			tmp.appendChild(ct(" Highlight target post"));
			tmp2.addEventListener("change", function(e) { GM_setValue("showControls", highlight = this.checked.toString()); });
			ac(tmp);
			ac(ce("br"));
			tmp = ce("label");
			tmp.appendChild(tmp2 = ce("input", {"type": "checkbox", "checked": (dontShowOnScreen === "true" ? "checked" : "")}));
			tmp.appendChild(ct(" No popup for onscreen posts"));
			tmp2.addEventListener("change", function(e) { GM_setValue("dontShowOnScreen", dontShowOnScreen = this.checked.toString()); });
			ac(tmp);
			ac(ce("hr"));
			
			sbc.insertBefore(frag, sbc.childNodes[sbc.childNodes.length-1]);
		}
	};
	
	createPopup = function() {
		popupEl = document.createElement("div");
		popupEl.setAttribute("class", "post reply");
		popupEl.setAttribute("style", "padding: 5px;border:1px solid #AAA;visibility:hidden;position:absolute;");
		document.body.appendChild(popupEl);
	};
	
	init = function() {
		var postForm = document.getElementById('delform'),
		posts = document.querySelectorAll(".postContainer .post"),
		threads = [], checkUpdates, ck, i = 0;
		
		buildOptions();
		
		for (i = 0; i < posts.length; i += 1) {
			wash(posts[i]);
		}
		
		checkUpdates = function() {
			var f, i = 0, t;
			if (threads && threads.length > 0) {
				t = threads.reverse();
				threads = [];
				f = function() {
					var tmp = this.querySelectorAll(".post"), i;
					for (i = 0; i < tmp.length; i += 1) { wash(tmp[i]); }
				};
				while (t && t.length > 0) { setTimeout(f.bind(t.pop()), i*200); i +=1; }
			}
		};
		document.addEventListener('DOMNodeInserted', function(e) {
			if (e.target.className.indexOf("postContainer") !== -1 || e.target.className.indexOf("post") !== -1) {
				wash(e.target);
			} else if (e.target.className.indexOf("thread") !== -1) {
				if (!ck) { ck = setInterval(checkUpdates, 2000); }
				threads.push(e.target);
			}
		}, false);
	};
	
	if(document.body) { init(); }
	else { window.addEventListener("DOMContentLoaded", init, false); }
	
}());