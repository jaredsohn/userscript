// ==UserScript==
// @name           Multi-Page Unliker
// @namespace      Facebook
// @include        http://www.facebook.com/profile.php*
// @version        1.0
// ==/UserScript==

(function() {
	/* Waits for a function for to return true
		c 	: the function to check if true
		fn 	: the callback function called with the return value of c
		t	: time to wait between each check */
	waitFor = function(c, fn, t) {
		if(x = c())
			fn(x);
		else
			setTimeout(function() {
				waitFor(c, fn, t);
			}, t);
	}
	/* Create a Facebook style button 
		txt	: the text on the button
		fn	: the function to excecute on click
		returns the button element */
	createButton = function(txt, fn) {
		var btn = document.createElement("a");
		btn.className = "uiButton uiButtonDefault uiButtonMedium";
		btn.style.margin = 0;
		var text = document.createElement("span");
		text.className = "uiButtonText";
		text.appendChild(document.createTextNode(txt));
		btn.appendChild(text);
		btn.addEventListener("click", fn, true);
		return btn;
	}
	/* Creates the checkboxes on the profile page and reformats the anchor tags
		profileInfoDataCell	: the cell in the tbody where the links are */
	createCheckBoxes = function(profileInfoDataCell) {
		var data = profileInfoDataCell.children[0]
		data.style.color = "#fff"
		data.style.fontSize = "1px"
		var anchors = data.getElementsByTagName("a");
		var showAll = 0
		//Handle the show all button
		if(anchors[anchors.length-1].className == "showAll") 
			showAll++;
		for(i=0; i<anchors.length-showAll; i++) {
			var input = document.createElement("input");
			input.type = "checkbox"
			input.setAttribute("style", "margin-right: 5px; float: left; clear: both")
			anchors[i].setAttribute("style", "display: block; float: left; padding-top: 1px; font-size: 11px");
			anchors[i].parentNode.insertBefore(document.createElement("br"), anchors[i]);
			anchors[i].parentNode.insertBefore(input, anchors[i]);
		}
		//Fix the show all button style
		if(showAll) {
			anchors[anchors.length-1].setAttribute("style", "clear:both; float: left; margin-top: 5px; font-size: 11px")
		}
	}
	/* Creates the window and runs the method to click the unlike button. Needs work.
		checked : Array of checked items to unlike */
	windowHandler = function(checked) {
		var unlikePage = function(i) {
			var wnd = window.open(checked[i].nextSibling, "facebookWindow","status=1,width=350,height=350");
			checked[i].nextSibling.style.color = "green";
			//Wait for the unlike button
			waitFor(function() {
				var a = wnd.document.querySelector("#boxes_left + div > a:first-child");
				if(a != null && a.innerHTML == "Unlike")
					return a;
				return null;
			}, function(unlike) {
				//Click the unlike button
				var evt = unlike.ownerDocument.createEvent('MouseEvents');
				evt.initMouseEvent('click', true, true, unlike.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
				unlike.dispatchEvent(evt);
				//Wait for a bit to make sure the message has been sent then close the window
				checked[i].nextSibling.style.color = "red";
				setTimeout(function() {
					checked[i].parentNode.removeChild(checked[i].previousSibling)
					checked[i].parentNode.removeChild(checked[i].nextSibling)
					checked[i].parentNode.removeChild(checked[i])
					wnd.close();
					//Move to the next item to unlike
					if(i++<checked.length-1)
						unlikePage(i);
				}, 2500);
			},1000);
		}
		unlikePage(0);
	}
	/* Checks the table for any checked-boxes
		btn					: the button that was clicked
		profileInfoDataCell	: the cell in the tbody where the links are */
	checkCheckBoxes = function(btn, profileInfoDataCell) {
		var checks = profileInfoDataCell.getElementsByTagName("input");
		var checked = [];
		//Create a new list of checked items
		for(i = 0; i < checks.length; i++) {
			if(checks[i].checked == true) {
				checked.push(checks[i]);
			}
		}
		//Confirm they want to remove them
		if(checked.length > 0)
			if(confirm ("Are you sure you want to remove " + checked.length + " liked page(s)?")) 
				windowHandler(checked);
	}
	/* Creates the buttons for each of the profile entries and handles the button click
		profileInfo : The Likes and interests entry*/
	addHandlers = function(profileInfo) {
		var table = profileInfo.getElementsByTagName("table")[0]
		var tbodys = table.getElementsByTagName("tbody");
		//Loop through each section (Music, tv, etc)
		for(i=0; i<tbodys.length;i++) {
			var headerCell = tbodys[i].rows[0].cells[0];
			//Check its a valid section
			if(headerCell.textContent != "") {
				//Create the button
				var btn = createButton("Unlike", function() {
					if(this.getAttribute("clicked") == "true") {
						//Unlike the selected checkboxes
						checkCheckBoxes(this, tbodys[this.id.replace("btn_", "")].rows[0].cells[1]);
					} else {
						//Format the list with checkboxes
						this.setAttribute("clicked", "true");
						this.style.background = "#cde"
						createCheckBoxes(tbodys[this.id.replace("btn_", "")].rows[0].cells[1]);
					}
				})
				btn.id = "btn_" + i;
				headerCell.appendChild(document.createElement("br"));
				headerCell.appendChild(document.createElement("br"));
				headerCell.appendChild(btn);
			}
		}
	}
	/* Searches each of the profileInfo class divs for the likes and interestes one
		profileInfos : array of divs with the profileInfo class */
	checkProfileInfos = function(profileInfos) {
		for(i = 0; i < profileInfos.length; i++) {
			var header = profileInfos[i].children[0].getElementsByTagName("h3")[0];
			if(typeof header == "object" && header.textContent == "Likes and interests") {
				addHandlers(profileInfos[i]);
			}
		}
	}
	
	//Waits for the profile info sections to load
	waitFor(function() {
		var el = document.getElementsByClassName("profileInfoSection");
		return el.length > 0 ? el : false
	}, checkProfileInfos, 250);
})();

