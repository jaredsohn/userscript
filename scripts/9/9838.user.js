// ==UserScript==
// @name           MusicBrainz enhanced voting
// @description    Adds a number of features to the voting page
// @version        2007-08-20
// @author         Jugdish
// @namespace      4D898C47-898C-4516-9602-C072BCCC27FB
//
// @include        http://*.musicbrainz.org/mod/search/results.html*
// @include        http://musicbrainz.org/mod/search/results.html*
// ==/UserScript==

/*
    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


//#######################################################################
//                          UTILITY FUNCTIONS
//#######################################################################
var HTTP = {
	// This is a list of XMLHttpRequest-creation factory functions to try
	_factories: [
		function() { return new XMLHttpRequest(); },
		function() { return new ActiveXObject("Msxml2.XMLHTTP"); },
		function() { return new ActiveXObject("Microsoft.XMLHTTP"); }
	],

	// When we find a factory that works, store it here.
	_factory: null,

	newRequest: function() {
		if (HTTP._factory != null) return HTTP._factory();
	
		for (var i = 0; i < HTTP._factories.length; i++) {
			try {
				var factory = HTTP._factories[i];
				var request = factory();
				if (request != null) {
					HTTP._factory = factory;
					return request;
				}
			}
			catch(e) {
				continue;
			}
		}
		// If we get here, none of the factory candidates succeeded,
		// so throw an exception now and for all future calls.
		HTTP._factory = function() { throw new Error("XMLHttpRequest not supported"); }
		HTTP._factory(); // Throw an error
	},
	
	post: function(url, values, callback, cb_arg) {
		var request = HTTP.newRequest();
		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				if (request.status == 200)
					callback(cb_arg, HTTP._getResponse(request));
				else
					alert("Error: HTTP Response "+request.status+"\n"+request.statusText);
			}
		}
		request.open("POST", url);
		// This header tells the server how to interpret the body of the request.
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		// Encode the properties of the values object and send them as the body of the request.
		var encoded = HTTP.encodeFormData(values);
		request.send(encoded);
	},
	
	encodeFormData: function(data) {
		var pairs = [];
		var regexp = /%20/g; // A regular expression to match an encoded space
		var regexp2 = /%3D/g;
		for(var name in data) {
			var value = data[name].toString();
			// Create a name/value pair, but encode name and value first
			// The global function encodeURIComponent does almost what we want,
			// but it encodes spaces as %20 instead of as "+". We have to
			// fix that with String.replace()
			var pair = encodeURIComponent(name).replace(regexp,"+") + '=' + encodeURIComponent(value).replace(regexp,"+").replace(regexp2,"=");
			pairs.push(pair);
		}
		// Concatenate all the name/value pairs, separating them with &
		return pairs.join('&');
	},
	
	_getResponse: function(request) {
		// Check the content type returned by the server
		switch(request.getResponseHeader("Content-Type")) {
			case "text/xml":
				// If it is an XML document, use the parsed Document object.
				return request.responseXML;
			case "text/json":
			case "text/javascript":
			case "application/javascript":
			case "application/x-javascript":
				// If the response is JavaScript code, or a JSON-encoded value,
				// call eval() on the text to "parse" it to a JavaScript value.
				// Note: only do this if the JavaScript code is from a trusted server!
				return eval(request.responseText);
			default:
				// Otherwise, treat the response as plain text and return as a string.
				return request.responseText;
		}
	}
}

function getElementsByClass(classname, tagname, root) {
    if (!root) root = document;
    else if (typeof root == "string") root = document.getElementById(root);

    // if no tagname was specified, use all tags
    if (!tagname) tagname = "15-";

    // Find all descendants of the specified root with the specified tagname
    var all = root.getElementsByTagName(tagname);

    // If no classname was specified, we return all tags
    if (!classname) return all;

    // Otherwise, we filter the element by classname
    var elements = [];  // Start with an empty array
    for(var i = 0; i < all.length; i++) {
        var element = all[i];
        if (isMember(element, classname)) // isMember() is defined below
            elements.push(element);       // Add class members to our array
    }

    return elements;

    function isMember(element, classname) {
        var classes = element.className;  // Get the list of classes
        if (!classes) return false;             // No classes defined
        if (classes == classname) return true;  // Exact match

        var whitespace = /\s+/;
        if (!whitespace.test(classes)) return false;

        var c = classes.split(whitespace);  // Split with whitespace delimiter
        for(var i = 0; i < c.length; i++) { // Loop through classes
            if (c[i] == classname) return true;  // and check for matches
        }

        return false;
    }
}

function getText(n) {
    var strings = [];
    getStrings(n, strings);
    return strings.join("").replace(/^\s*/,"").replace(/\s*$/,"");

    function getStrings(n, strings) {
        if (n.nodeType == 3 /* Node.TEXT_NODE */)
            strings.push(n.data);
        else if (n.nodeType == 1 /* Node.ELEMENT_NODE */) {
            for(var m = n.firstChild; m != null; m = m.nextSibling) {
                getStrings(m, strings);
            }
        }
    }
}

function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement)
		parent.appendChild(newElement);
	else
		parent.insertBefore(newElement, targetElement.nextSibling);
}

//#######################################################################
//                               GLOBALS
//#######################################################################
var currUser = "You";
var noteBoxes = new Object();
var addLinks = new Object();
var voteForm = null;
var voteButton = null;
var editTable = null;
var numTasks = 0;
var numErrors = 0;
var numProcessed = 0;
var doVotes = true;
var incAllVotes = false;
var vInputs = {
	"approve": new Object(),
	"yes": new Object(),
	"no": new Object(),
	"abs": new Object(),
	"novote": new Object(),
	"cancel": new Object()
};

//#######################################################################
//                              FUNCTIONS
//#######################################################################
function updateButton() {
	voteButton.value = "Enter "+(doVotes ? "votes/" : "")+"approves + notes »";
}

function compactNode(n) {
	if (n.style) {
		n.style["marginLeft"] = "0px";
		n.style["marginRight"] = "0px";
		n.style["paddingLeft"] = "1px";
		n.style["paddingRight"] = "1px";
	}
}

function setVoteColor(cell) {
	var inputs = cell.getElementsByTagName("input");
	var bgColor = "white";
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].checked) {
			switch (inputs[i].value) {
				case "approve":
					bgColor = "#00a650";
					inputs[i].parentNode.style["borderColor"] = "white";
					break;
				case "yes":
					bgColor = "#eeffee";
					inputs[i].parentNode.style["borderColor"] = "#88ff88";
					break;
				case "no":
					bgColor = "#ffeeee";
					inputs[i].parentNode.style["borderColor"] = "#ff8888";
					break;
				case "abs":
					bgColor = "#ffffcc";
					inputs[i].parentNode.style["borderColor"] = "#eeee66";
					break;
				case "cancel":
					bgColor = "#ff0000";
					inputs[i].parentNode.style["borderColor"] = "white";
					break;
			}
		} else
			inputs[i].parentNode.style["borderColor"] = "transparent";
	}
	cell.style["backgroundColor"] = bgColor;
}

function updateVoteColor(input) {
	var ancestor = input;
	while (ancestor.className != "vote" && ancestor.parentNode)
		ancestor = ancestor.parentNode;
	if (ancestor.className == "vote")
		setVoteColor(ancestor);
}

function showNote(editid) {
	noteBoxes[editid].style["display"] = "table-row";
	addLinks[editid].innerHTML = "Del note";
}

function hideNote(editid) {
	noteBoxes[editid].style["display"] = "none";
	document.getElementById("textarea_"+editid).value = "";
	addLinks[editid].innerHTML = "Add note";
}

//#######################################################################
//                             CALLBACKS
//#######################################################################
function cb_post(editid, response) {
	numProcessed++;
	voteButton.value = (numTasks-numProcessed)+" task"+(numTasks-numProcessed == 1 ? "" : "s")+" remaining...";
	
	var responseText = response.replace(/[\n\t]/g,"");
	if (!responseText.match(/note saved successfully/i) && !responseText.match(/Status:<\/td><td>Change\&nbsp\;applied/i) && !responseText.match(/To&nbsp;be&nbsp;cancelled/i))
		numErrors++;
	
	// if we are the last one, check if any failed
	if (numProcessed == numTasks) {
		if (numErrors)
			alert(numErrors+" HTTP POST failed!");
		if (voteForm && doVotes)
			voteForm.submit();
		else
			window.location.reload();
	}
}

//#######################################################################
//                            EVENT HANDLERS
//#######################################################################
function captureSubmit(e) {
	numErrors = 0;
	numTasks = 0;
	// count selected approves
	for (id in vInputs["approve"])
		if (vInputs["approve"][id].checked)
			numTasks++;
	// count selected cancels
	for (id in vInputs["cancel"])
		if (vInputs["cancel"][id].checked)
			numTasks++;
	for (id in noteBoxes) {
		if ((id in vInputs["approve"]) && vInputs["approve"][id].checked)
			continue;
		else if ((id in vInputs["cancel"]) && vInputs["cancel"][id].checked)
			continue;
		if (document.getElementById("textarea_"+id).value)
			numTasks++;
	}

	if (numTasks) {
		//alert("Submitting "+numTasks+" tasks");
		var target = e ? e.target : this;
		e.stopPropagation();
		e.preventDefault();
		voteButton.disabled = true;
		voteButton.value = numTasks+" tasks remaining...";
		numProcessed = 0;
		
		// submit selected approves
		for (id in vInputs["approve"]) {
			if (vInputs["approve"][id].checked) {
				var note = "";
				if (id in noteBoxes) {
					var textarea = document.getElementById("textarea_"+id);
					if (textarea.value) {
						note = textarea.value;
						delete noteBoxes[id];
					}
				}
				HTTP.post("/mod/approve.html", { notetext: note, submitvalue: "Approve edit »", editid: id }, cb_post, id);
			}
		}
		
		// submit selected cancels
		for (id in vInputs["cancel"]) {
			if (vInputs["cancel"][id].checked) {
				var note = "";
				if (id in noteBoxes) {
					var textarea = document.getElementById("textarea_"+id);
					if (textarea.value) {
						note = textarea.value;
						delete noteBoxes[id];
					}
				}
				HTTP.post("/mod/remove.html", { notetext: note, submitvalue: "Cancel edit »", editid: id }, cb_post, id);
			}
		}

		// submit non-blank notes
		for (id in noteBoxes) {
			var textarea = document.getElementById("textarea_"+id);
			if (textarea.value)
				HTTP.post("/mod/addnote.html", { editid: id, notetext: textarea.value, submitvalue: "Add Note" }, cb_post, id);
		}
	}
}

function captureClick(e) {
	var results;
	if (e.target.href && (results = e.target.href.match(/\/mod\/addnote\.html\?modid=([0-9]+)/))) {
		e.stopPropagation();
		e.preventDefault();
		if (e.target.innerHTML == "Add note") {
			showNote(results[1]);
			document.getElementById("textarea_"+results[1]).focus();
		} else if (e.target.innerHTML == "Del note")
			hideNote(results[1]);
	}
}

function captureAllVotes(e) {
	var results;
	if (results = e.target.id.match(/^rowidOverride-(.*)$/)) {
		for (type in vInputs) {
			for (id in vInputs[type]) {
				vInputs[type][id].checked = (results[1] == type && e.target.checked) ? true : false;
				updateVoteColor(vInputs[type][id]);
			}
		}
		var n = e.target.id.match(/approve/) ? document.getElementById(e.target.id.replace(/approve/,"cancel")) : (e.target.id.match(/cancel/) ? document.getElementById(e.target.id.replace(/cancel/,"approve")) : null);
		if (n) n.checked = false;
		updateVoteColor(e.target);
	}
}

function captureVoteChange(e) {
	var results;
	if (e.target.name && (results = e.target.name.match(/^rowid([0-9]+)$/))) {
		var n = e.target.id.match(/approve/) ? document.getElementById(e.target.id.replace(/approve/,"cancel")) : (e.target.id.match(/cancel/) ? document.getElementById(e.target.id.replace(/cancel/,"approve")) : null);
		if (n) n.checked = false;
		updateVoteColor(e.target);
	}
}

//#######################################################################
//                           BEGIN EXECUTION
//#######################################################################
// determine user name
var results = getElementsByClass("sidemenu-box","div",document.body);
for (var i = 0; i < results.length; i++) {
	var links = results[i].getElementsByTagName("a");
	if (links.length && links[0].href && links[0].href.match(/\/show\/user\/$/)) {
		currUser = links[0].innerHTML;
		break;
	}
}

// find all voting radio button inputs
var nodes = document.getElementsByTagName("input");
for (var i = 0; i < nodes.length; i++) {
	var results;
	if (nodes[i].type == "radio" && (results = nodes[i].id.match(/^rowid([0-9]+)-(.*)$/)))
		if (results[2] in vInputs)
			vInputs[results[2]][results[1]] = nodes[i];
}

// find "Add note" links
for (var i = 0; i < document.links.length; i++)
	if (document.links[i].innerHTML == "Add note" && document.links[i].href && (results = document.links[i].href.match(/\/mod\/addnote\.html\?modid=([0-9]+)/)))
		addLinks[results[1]] = document.links[i];
window.addEventListener("click",captureClick,true);

// find main edit table
var editTable = getElementsByClass("editlist","table",document.body)[0];

var rows = [];
for (var i = 0; i < editTable.lastChild.childNodes.length; i++) {
	var child = editTable.lastChild.childNodes[i];
	if (child.tagName && child.tagName.toLowerCase() == "tr" && child.className == "showedit")
		rows.push(child);
}
for (var i = 0; i < rows.length; i++) {
	var tables = rows[i].getElementsByTagName("table");
	if (tables.length && tables[0].className == "editfields") {
		var text = getText(tables[0]).replace(/[\r\n]/g,"");
		var results;
		if (results = text.match(/Editor:.+Edit ID:\s+([0-9]+)/)) {
			
			var id = results[1];
			
			var n1, n2;
			var r = document.createElement("tr");
			r.style["display"] = "none";
			noteBoxes[id] = r;
			
			tables = i+2 < rows.length ? rows[i+2].getElementsByTagName("table") : null;
			if (tables && tables.length && tables[0].className == "noteslist") {
				// exist notes on edit
				tables[0].appendChild(r);
				r.className = "noteslist even";
				n1 = r;
			} else {
				// no notes on edit
				insertAfter(r, rows[i+1]);
				r.className = "showedit";
				r.appendChild(n1 = document.createElement("td"));
				n1.className = "notes";
				n1.setAttribute("colspan","3");
				n1.innerHTML = "Notes:<br />";
				n1.appendChild(n2 = document.createElement("table"));
				n2.className = "noteslist";
				n2.style["width"] = "100%";
				n2.appendChild(n1 = document.createElement("tr"));
				n1.className = "noteslist first";
			}
			n1.appendChild(n2 = document.createElement("td"));
			n2.className = "noter";
			n2.innerHTML = "<strong><a href=\"/show/user/\" title=\"User: "+currUser+"\">"+currUser+"</a></strong>:";
			n1.appendChild(n2 = document.createElement("td"));
			n2.className = "text";
			n2.appendChild(n1 = document.createElement("textarea"));
			n1.setAttribute("rows","3");
			n1.setAttribute("cols","40");
			n1.setAttribute("id","textarea_"+id);
			n1.style["width"] = "100%";
			
			// insert "approve" and "cancel" radio buttons
			if (i+1 < rows.length) {
				tables = getElementsByClass("votechoice","table",rows[i+1]);
				if (tables.length == 1)
					tables[0].style["width"] = "100%";
				var votehead = getElementsByClass("votehead","td",rows[i]);
				if (votehead.length == 1) {
					var links = votehead[0].getElementsByTagName("a");
					var doApprove = false;
					var doCancel = false;
					for (var j = 0; j < links.length; j++) {
						if (links[j].href) {
							if (links[j].href.match(/\/mod\/approve.html/)) {
								doApprove = true;
								// hide link
								links[j].style["display"] = "none";
								if (links[j].previousSibling && links[j].previousSibling.nodeType == 3) links[j].previousSibling.data = "";
							} else if (links[j].href.match(/\/mod\/remove.html/)) {
								doCancel = true;
								// hide link
								links[j].style["display"] = "none";
								if (links[j].previousSibling && links[j].previousSibling.nodeType == 3) links[j].previousSibling.data = "";
							}
						}
					}	
					// add radio/checkbox button
					if (doApprove || doCancel) {
						var votecell = getElementsByClass("vote","td",rows[i+1]);
						var tdApprove, labelApprove, inputApprove;
						var tdCancel, labelCancel, inputCancel;
						if (votecell.length == 1) {
							if (doApprove) {
								tdApprove = document.createElement("td");
								labelApprove = document.createElement("label");
								labelApprove.setAttribute("for","rowid"+id+"-approve");
								labelApprove.style["border"] = "2px transparent dotted";
								tdApprove.appendChild(labelApprove);
								inputApprove = document.createElement("input");
								inputApprove.type = "checkbox";
								inputApprove.name = "rowid"+id;
								inputApprove.id = "rowid"+id+"-approve";
								inputApprove.value = "approve";
								inputApprove.checked = false;
								vInputs["approve"][id] = inputApprove;
							}
							if (doCancel) {
								tdCancel = document.createElement("td");
								labelCancel = document.createElement("label");
								labelCancel.setAttribute("for","rowid"+id+"-cancel");
								labelCancel.style["border"] = "2px transparent dotted";
								tdCancel.appendChild(labelCancel);
								inputCancel = document.createElement("input");
								inputCancel.type = "checkbox";
								inputCancel.name = "rowid"+id;
								inputCancel.id = "rowid"+id+"-cancel";
								inputCancel.value = "cancel";
								inputCancel.checked = false;
								vInputs["cancel"][id] = inputCancel;
							}
							if (tables.length == 1) { // vote options on this edit
								labelApprove.innerHTML = "<br /><b>APV</b>";
								inputApprove.type = "radio";
								var tr = tables[0].getElementsByTagName("tr")[0];
								tr.insertBefore(tdApprove,tr.firstChild);
								labelApprove.insertBefore(inputApprove,labelApprove.firstChild);
							} else { // can't vote on this edit
								labelCancel.innerHTML = "<br /><b>CANCEL</b>";
								labelCancel.insertBefore(inputCancel,labelCancel.firstChild);
								var table = document.createElement("table");
								table.className = "votechoice votechoice4";
								table.style["width"] = "100%";
								var tr = document.createElement("tr");
								if (doApprove) {
									labelApprove.innerHTML = "<br /><b>APPROVE</b>";
									tr.appendChild(tdApprove);
									labelApprove.insertBefore(inputApprove,labelApprove.firstChild);
								}
								tr.appendChild(tdCancel);
								table.appendChild(tr);
								votecell[0].innerHTML = "";
								votecell[0].appendChild(table);
							}
						}
					}
				}
			}
		}
	}
}
// find "Enter votes" button
for (var i = 0; i < document.forms.length; i++) {
	if (document.forms[i].action.match(/\/bare\/vote.html$/)) {
		voteForm = document.forms[i];
		voteForm.addEventListener("submit",captureSubmit,true);
		for (var j = 0; j < voteForm.elements.length; j++) {
			if (voteForm.elements[j].type == "submit" && voteForm.elements[j].value.match(/^Enter votes/i)) {
				voteButton = voteForm.elements[j];
				updateButton();
				break;
			}
		}
	}
}
// reset form
if (voteForm) voteForm.reset();

if (!voteButton) {
	doVotes = false;
	voteButton = document.createElement("input");
	voteButton.type = "button";
	voteButton.addEventListener("click",captureSubmit,true);
	updateButton();
	
	if (editTable) {
		var div = document.createElement("div");
		div.style["textAlign"] = "right";
		div.style["marginBottom"] = "20px";
		div.innerHTML = "Click here to enter notes for items on this page: ";
		insertAfter(voteButton,div.lastChild);
		insertAfter(div,editTable);
	}
}

// prep all radio/checkboxes
for (var i = 0; i < rows.length; i++) {
	var votecell = getElementsByClass("vote","td",rows[i]);
	if (votecell.length == 1) {
		compactNode(votecell[0]);
		var inputs = votecell[0].getElementsByTagName("input");
		for (var j = 0; j < inputs.length; j++) {
			compactNode(inputs[j]);
			compactNode(inputs[j].parentNode);
			inputs[j].addEventListener("change",captureVoteChange,true);
			if (inputs[j].parentNode.lastChild.nodeType == 3 && inputs[j].parentNode.lastChild.data.match(/No.+?vote/))
				inputs[j].parentNode.lastChild.data = "None";
		}
		setVoteColor(votecell[0]);
	}
}

if (incAllVotes) {
	// prepare overriding vote radio buttons
	var tr, td;
	var overrideTable = document.createElement("table");
	overrideTable.className = "votechoice votechoice4";
	tr = document.createElement("tr");
	overrideTable.appendChild(tr);
	for (type in vInputs) {
		for (id in vInputs[type]) {
			td = document.createElement("td");
			var label = document.createElement("label");
			label.setAttribute("for","rowidOverride-"+type);
			var input = document.createElement("input");
			input.type = "radio";
			input.name = "rowidOverride";
			input.id = "rowidOverride-"+type;
			input.value = type;
			input.checked = false;
			input.addEventListener("click",captureAllVotes,true);
			var text = document.createTextNode(type.charAt(0).toUpperCase()+type.substring(1));
			if (type == "approve") {
				text.data = "APV";
				label.style["border"] = "2px transparent dotted";
				label.style["fontWeight"] = "bold";
			} else if (type == "cancel") {
				text.data = "CNL";
				label.style["border"] = "2px transparent dotted";
				label.style["fontWeight"] = "bold";
			}
			else if (type == "novote") text.data = "None";
			label.appendChild(input);
			label.appendChild(document.createElement("br"));
			label.appendChild(text);
			td.appendChild(label);
			tr.appendChild(td);
			compactNode(input);
			compactNode(label);
			break;
		}
	}
	var inputs = overrideTable.getElementsByTagName("input");
	if (inputs.length) {
		if (inputs.length <= 2) {
			for (var i = 0; i < inputs.length; i++) {
				inputs[i].type = "checkbox";
				if (inputs[i].id.match(/approve/)) inputs[i].nextSibling.nextSibling.data = "APPROVE";
				else if (inputs[i].id.match(/cancel/)) inputs[i].nextSibling.nextSibling.data = "CANCEL";
			}
		}
		// add "All Votes" box to top of page
		tr = document.createElement("tr");
		tr.className = "showedit";
		tr.appendChild(document.createElement("td"));
		tr.appendChild(td = document.createElement("td"));
		td.setAttribute("align","right");
		td.innerHTML = "<strong>ALL VOTES:</strong>&nbsp;";
		tr.appendChild(td = document.createElement("td"));
		td.className = "vote";
		td.appendChild(overrideTable);
		compactNode(td);
		editTable.lastChild.insertBefore(tr, editTable.lastChild.firstChild);
	}
}
