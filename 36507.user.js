// ==UserScript==
// @name           Obtrusive JavaScript Checker
// @namespace      http://www.robertnyman.com/userscripts
// @description    Checking HTML elements for inline events
// @include        *
// ==/UserScript==
// ---
var ojsc = function () {
	var allElms = document.body.getElementsByTagName("*"),
		regExp = /^on/i,
		regExpLink = /^javascript:/i,
		styles = [
			"position : absolute",
			"display : none",
			"width : 300px",
			"font : 12px Helvetica, Verdana, Arial, sans-serif",
			"color : #fff",
			"background : #333",
			"text-align: left",
			"padding : 10px",
			"z-index : 1000",
			"opacity : 0.9",
			"-moz-border-radius : 5px"
		],
		reportStyles = [
			"display : block",
			"width : 200px",
			"left : 0",
			"bottom : 0"
			
		],
		innerStyles = [
			"font : 12px Helvetica, Verdana, Arial, sans-serif",
			"color : #fff",
			"margin: 0 0 10px 0;"
		],
		inlineEvents = {
			items : 0
		},
		inlineEventElmStyle = [
			"border : 2px solid red"
		],
		javascriptLinks = {
			items : 0
		},
		javascriptLinksElmStyle = [
			"border : 2px solid magenta"
		],
		viewer,
		report,
		attribute,
		attrName;
	return {	
		init : function () {
			// Creation of custom style sheet
			var styleSheet = document.createElement("style");
			styleSheet.type = "text/css";
			styleSheet.rel = "stylesheet";
			styleSheet.href = "http://sites/test/test.css";
			document.getElementsByTagName("head")[0].appendChild(styleSheet);
			
			// Append CSS rules to it
			var docStyleSheets = document.styleSheets.wrappedJSObject;
			var lastStyleSheet = docStyleSheets.length - 1;
			docStyleSheets[lastStyleSheet].insertRule(("div.ojsc-viewer {" + styles.join(";\n") + "}"), 0);
			docStyleSheets[lastStyleSheet].insertRule(("div.ojsc-report {" + reportStyles.join(";\n") + "}"), 1);
			docStyleSheets[lastStyleSheet].insertRule(("div.ojsc-viewer p {" + innerStyles.join(";\n") + "}"), 2);
			docStyleSheets[lastStyleSheet].insertRule((".ojsc-inline-event {" + inlineEventElmStyle.join(";\n") + "}"), 3);
			docStyleSheets[lastStyleSheet].insertRule((".ojsc-javascript-link {" + javascriptLinksElmStyle.join(";\n") + "}"), 4);
			
			var elm, 
				attributes, 
				attr,
				item,
				eventHandler;

			viewer = document.createElement("div");
			viewer.className = "ojsc-viewer";
			document.body.appendChild(viewer);			
						
			for (var i=0, il=allElms.length; i<il; i++) {
				elm = allElms[i].wrappedJSObject;
				if (elm.nodeType === 1) {
					attributes = elm.attributes;
					for (var j=0, jl=attributes.length; j<jl; j++) {
						attribute = attributes[j];
						attrName = attribute.name;
						if(regExp.test(attrName)){
							elm.className += ((elm.className.length > 0)? " " : "") + "ojsc-inline-event";
							inlineEvents.items += 1;
							if (typeof inlineEvents[attrName] === "number") {
								inlineEvents[attrName] += 1;
							}
							else {
								inlineEvents[attrName] = 1;
							}
							elm.addEventListener("mouseover", this.showInfo, false);
							elm.addEventListener("mouseout", this.hideInfo, false);
						}
						else if (attrName === "href" && regExpLink.test(attribute.value)) {
							javascriptLinks.items += 1;
							elm.className += ((elm.className.length > 0)? " " : "") + "ojsc-javascript-link";
							elm.addEventListener("mouseover", this.showJavaScriptLinkInfo, false);
							elm.addEventListener("mouseout", this.hideInfo, false);
						}
					}
				}
			}
			
			report = document.createElement("div");
			report.className = "ojsc-viewer ojsc-report";
			report.innerHTML = "<p><b>Number of javascript: links:</b> " + javascriptLinks.items + "</p>";
			report.innerHTML += "<p><b>Number of inline events:</b> " + inlineEvents.items + "</p>";
			for (eventHandler in inlineEvents) {
				if (eventHandler !== "items") {
					report.innerHTML += "<p style='margin-left: 20px'>" + eventHandler + ": " + inlineEvents[eventHandler] + "</p>";
				}
			}
			document.body.appendChild(report);
		},	

		showInfo : function (evt) {
			var attributes = this.attributes,
				events = [],
				eventElm;
			for (var i=0, il=attributes.length; i<il; i++) {
				attribute = attributes[i];
				attrName = attribute.name;
				if(regExp.test(attrName)){
					events.push(attrName + ": " + attribute.value);
				}
			}
			viewer.innerHTML = "";
			for (var j=0, jl=events.length; j<jl; j++) {
				eventElm = document.createElement("p");
				eventElm.innerHTML = events[j];
				viewer.appendChild(eventElm);
			}
			ojsc.positionAndShow(evt);
			evt.stopPropagation();
		},
		
		showJavaScriptLinkInfo : function (evt) {
			viewer.innerHTML = "";
			var eventElm = document.createElement("p");
			eventElm.innerHTML = "href: " + this.getAttribute("href");
			viewer.appendChild(eventElm);
			ojsc.positionAndShow(evt);
			evt.stopPropagation();
		},
		
		positionAndShow : function (evt) {
			viewer.style.left = (evt.clientX + 10 + window.pageXOffset) + "px";	
			viewer.style.top = (evt.clientY + 10 + window.pageYOffset) + "px";
			viewer.style.display = "block";
		},
		
		hideInfo : function () {
			viewer.style.display = "none";
		}
	};
}();
ojsc.init();