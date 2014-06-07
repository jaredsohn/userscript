// ==UserScript==
// @name           Google & Youtube One-Click Sign Out
// @namespace      one_click_sign_out
// @description    Moves the "Sign Out" link to the right of email address.
// @grant          none
// @include        http://*google.tld/*
// @include        https://*google.tld/*
// @include        http://*.youtube.com/*
// @include        https://*.youtube.com/*
// @version        2.3
// ==/UserScript==

window.addEventListener("DOMContentLoaded", function() {
	if (/mail\.google\./.test(window.top.location.href)) {
		var timer1 = setInterval(function() {
			try {
				if (document.getElementById('loading').style.display == "none") {
					clearInterval(timer1);

					var timer2 = setInterval(function() {
						if (document.getElementById('js_frame')) {
							clearInterval(timer2);

							var node1 = document.evaluate("//div[@id='gbwa']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							var gacct = node1.snapshotItem(0).nextSibling;

							var nodex = document.evaluate("//a[@id='gb_71']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							var oldsol = nodex.snapshotItem(0).href;
							var oldsoc = nodex.snapshotItem(0).onclick;

							var signout = document.createElement("div");
							signout.setAttribute("style", "display: inline-block; margin-left: 10px;");

							var anchor = document.createElement("a");
							anchor.setAttribute("id", "gb_71");
							anchor.setAttribute("class", "gbqfbb");
							anchor.setAttribute("href", oldsol);
							anchor.setAttribute("onclick", oldsoc);
							anchor.setAttribute("role", "button");
							anchor.setAttribute("target", "_top");
							anchor.setAttribute("style", "\
								cursor: pointer !important; \
								font-size: 11px; \
								color: #444; \
								border: 1px solid rgba(0, 0, 0, 0.1); \
								background-image: -moz-linear-gradient(center top , rgba(255, 255, 255, 0.85), rgba(247, 247, 247, 0.85));");
							anchor.innerHTML = "Sign out";
							anchor.addEventListener("mouseover", function() { this.setAttribute("style", "\
								cursor: pointer !important; \
								font-size: 11px; \
								color: #333; \
								border: 1px solid #c6c6c6; \
								background-image: -moz-linear-gradient(center top , rgba(255, 255, 255, 0.85), rgba(247, 247, 247, 0.85));") }, true);
							anchor.addEventListener("mousedown", function() { this.setAttribute("style", "\
								cursor: pointer !important; \
								font-size: 11px; \
								color: #333; \
								border: 1px solid #ccc; \
								box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset; \
								background-image: -moz-linear-gradient(center top , rgba(255, 255, 255, 0.9), rgba(247, 247, 247, 0.9))") }, true);
							anchor.addEventListener("mouseout", function() { this.setAttribute("style", "\
								cursor: pointer !important; \
								font-size: 11px; \
								color: #444; \
								border: 1px solid rgba(0, 0, 0, 0.1); \
								background-image: -moz-linear-gradient(center top , rgba(255, 255, 255, 0.85), rgba(247, 247, 247, 0.85));") }, true);
							signout.appendChild(anchor);

							gacct.parentNode.appendChild(signout);
						}
					}, 50);
				}
			} catch(e) {}
		}, 50);
	}
	else if (/youtube\.com/.test(window.top.location.href)) {
		try {
			if (document.getElementById("masthead-expanded-menu-list")) {
				var bnode = document.evaluate("//div[@id='yt-masthead-user']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
				var tlbar = bnode.snapshotItem(0);

				var snode = document.evaluate("//ul[@id='masthead-expanded-menu-list']/li/a[@class='end']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
				var sotxt = snode.snapshotItem(0).textContent.substring(1);
				var solnk = snode.snapshotItem(0).getAttribute('onclick');

				var anchor = document.createElement("a");
				anchor.setAttribute("onclick", solnk);
				anchor.setAttribute("href", "#");
				anchor.setAttribute("class", "end yt-uix-button yt-uix-button-default");
				anchor.setAttribute("style", "margin-left: 10px; cursor: pointer");

				var sospan = document.createElement("span");
				sospan.setAttribute("class", "yt-uix-button-content");
				sospan.innerHTML = sotxt;

				anchor.appendChild(sospan);
				tlbar.appendChild(anchor);

				var onode = document.evaluate("//ul[@id='masthead-expanded-menu-list']/li/a[@class='end']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
				var oldsol = onode.snapshotItem(0);
				oldsol.parentNode.removeChild(oldsol);
			}
		} catch(e) {}
	} else {
		try {
			var node1 = document.evaluate("//div[@id='gbwa']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			var gacct = node1.snapshotItem(0).nextSibling;

			var nodex = document.evaluate("//a[@id='gb_71']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			var oldsol = nodex.snapshotItem(0).href;
			var oldsoc = nodex.snapshotItem(0).onclick;

			var signout = document.createElement("div");
			signout.setAttribute("style", "display: inline-block; margin-left: 10px;");

			var anchor = document.createElement("a");
			anchor.setAttribute("id", "gb_71");
			anchor.setAttribute("class", "gbqfbb");
			anchor.setAttribute("href", oldsol);
			anchor.setAttribute("onclick", oldsoc);
			anchor.setAttribute("role", "button");
			anchor.setAttribute("target", "_top");
			anchor.setAttribute("style", "\
				cursor: pointer !important; \
				font-size: 11px; \
				color: #444; \
				border: 1px solid rgba(0, 0, 0, 0.1); \
				background-image: -moz-linear-gradient(center top , rgba(255, 255, 255, 0.85), rgba(247, 247, 247, 0.85));");
			anchor.innerHTML = "Sign out";
			anchor.addEventListener("mouseover", function() { this.setAttribute("style", "\
				cursor: pointer !important; \
				font-size: 11px; \
				color: #333; \
				border: 1px solid #c6c6c6; \
				background-image: -moz-linear-gradient(center top , rgba(255, 255, 255, 0.85), rgba(247, 247, 247, 0.85));") }, true);
			anchor.addEventListener("mousedown", function() { this.setAttribute("style", "\
				cursor: pointer !important; \
				font-size: 11px; \
				color: #333; \
				border: 1px solid #ccc; \
				box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset; \
				background-image: -moz-linear-gradient(center top , rgba(255, 255, 255, 0.9), rgba(247, 247, 247, 0.9))") }, true);
			anchor.addEventListener("mouseout", function() { this.setAttribute("style", "\
				cursor: pointer !important; \
				font-size: 11px; \
				color: #444; \
				border: 1px solid rgba(0, 0, 0, 0.1); \
				background-image: -moz-linear-gradient(center top , rgba(255, 255, 255, 0.85), rgba(247, 247, 247, 0.85));") }, true);
			signout.appendChild(anchor);

			gacct.parentNode.appendChild(signout);
		} catch(e) {}
	}
}, false);