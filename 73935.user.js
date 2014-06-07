// ==UserScript==
// @name           GmailChatDrag
// @namespace      GmailChatDrag
// @description    Drag Your Gmail Chat Widget Anywhere
// ==/UserScript==
// @include       http[s]{0,1}://mail.google.com/*
//
// ==/UserScript==

(function($, undefined) {

	/* From: http://www.quirksmode.org/js/findpos.html */
	/* Thanks to rakesh.pa@directi.com for this!! :) */
	function findPos(obj) {
		var curleft = curtop = 0;
		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			} while (obj = obj.offsetParent);
			return [curleft,curtop];
		}
	}

	function moveElement(e, currentTarget, delta) {
		// console.log("moveElement", e.pageX, e.pageY, currentTarget);
		currentTarget.style.position = "absolute";
		currentTarget.style.left = (e.pageX - delta.x) + "px";
		currentTarget.style.top = (e.pageY - delta.y) + "px";
		e.stopPropagation();
	}

	function startDrag(e, currentTarget) {
		// console.log("cTgt:", currentTarget);
		// console.log("startDrag", e.pageX, e.clientX);
		// var currentTarget = e.currentTarget;
		var registeredMousemove = false;
		var pos = findPos(currentTarget);
		var delta = {
			x: e.pageX - pos[0], 
			y: e.pageY - pos[1]
		};

		document.addEventListener("mousemove", function(e) {
			// console.log("registeredMousemove", registeredMousemove);
			if (!registeredMousemove) {
				var mousemoveProc = arguments.callee;
				currentTarget.addEventListener("mouseup", function(e) {
					// console.log("mouseup");
					var self= arguments.callee;
					registeredMousemove = false;
					document.removeEventListener("mousemove", mousemoveProc, true);
					currentTarget.removeEventListener("mouseup", self, true);
				}, true);
				registeredMousemove = true;
			}
			moveElement(e, currentTarget, delta);
		}, true);
		//e.stopPropagation();
	}

	setTimeout(function() {
		var allpp = document.getElementsByClassName("pp");
		for (elem in allpp) {
			// console.log(allpp[elem]);
			if (allpp[elem].className == "nH pp ps") {
				// console.log("found!!", $.innerWidth);
				var chatDiv = allpp[elem];
				var chatDivLeft = ($.innerWidth - 258) + "px";
				chatDiv.style.left = chatDivLeft;
				chatDiv.style.zIndex = "42";
				chatDiv.style.width = "230px";
				chatDiv.addEventListener("mousedown", function(e) {
					startDrag(e, chatDiv);
				}, true);
				break;
			};
		}
	}, 7000);


}(window.wrappedJSObject)());
