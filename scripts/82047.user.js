// ==UserScript==
// @name            Gmail CatsOne integration
// @description     Allows posting emails directly from Gmail to CatsOne system
// @author          Constantin Bosneaga <ameoba32@gmail.com>
// @version         0.6
// @homepage        http://a32.me/2010/07/catsone-gmail-integration-plugin/
// @include         http://mail.google.com/*
// @include         https://mail.google.com/*
// ==/UserScript==


// CHANGELOG: 
// 0.1 2006-01-20 Initial revision
// 0.2 2006-01-20 New CATs function, interface improvements
// 0.3 2006-01-20 Better error handling
// 0.4 2010-08-13 Added more escaping to url params
// 0.5 2010-08-13 Moveable main window
// 0.6 2010-08-13 Catsone API change fix

var searchTimer;
var doc;
var _document = document;
var subdomain = "__CHANGE__ME"

var ctsDialog;

// Loaded message params
var msgFrom;
var msgSubject;
var msgText;

function xpath(query, object) {
	if (!object) var object = document;
	return document.evaluate(query, object, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function debug(msg) {
	if (console) console.log( msg );
}

function eid(a) {
	return _document.getElementById(a);
}

// Check if transaction ID is entered, before making any calls
function checkTransactionID() {
	var tmp = GM_getValue("trans_id","");
	if (tmp	== "") configTransactionId();
}

// Enter transaction ID
function configTransactionId() {
	var reply = prompt("Enter CATs transaction ID", GM_getValue("trans_id"));
	GM_setValue("trans_id", reply)
}

function isCatsError(response) {
	debug("Response code="+response.status);
	debug("Response code="+response.statusText);
	debug("Response text="+response.responseText);

	if (response.status != 200) {
		alert("Error: response code != 100."  + response.responseText);
		return true;
	}
	
	// Check if success
	if (response.responseText.indexOf('success="true"') == -1) {
		alert('Cats call failed.\nResponse: ' +  response.responseText);
		return true;
	}
	
	return false;
}

function uri(str) {
	return encodeURIComponent(str);
}

function sendToCats(id, from, subject, text) {
	id = eid('catsPerson').getAttribute('person_id');
	if (id == "" || id == null) {alert('Choose person');return;}
	
	if (eid('catsText') == "") {alert('No text to send');return;}

	var data = "data_type=candidate&id="+id+"&from="+uri(eid('catsFrom').value)+"&subject="+uri(eid('catsSubject').value)+"&message="+uri(eid('catsText').value);
	debug("data=" + data);

	checkTransactionID();
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'https://'+subdomain+'.catsone.com/api/add_email_activity?transaction_code=' + GM_getValue("trans_id"),
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml,application/x-httpd-php',
			'Content-type': 'application/x-www-form-urlencoded; charset=utf-8;',
		},
		data: data,
		onload: function(responseDetails) {

			var error = isCatsError(responseDetails);
			if (error) return;
			
			closeDialog();
		},
		onerror: function(responseDetails) {
			alert('Ajax error');
		}
	});
}

function searchCats() {

	var keyword = '*'+document.getElementById('catsSearch').value+'*';
	var data = "&keywords="+uri(keyword)+"&data_type=candidate";
	
	debug("Searching cats="+keyword)
	debug("data="+data)
	
	checkTransactionID();
	debug('https://'+subdomain+'.catsone.com/api/search?transaction_code=' + GM_getValue("trans_id") );
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'https://'+subdomain+'.catsone.com/api/search?transaction_code=' + GM_getValue("trans_id"),
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml,application/x-httpd-php',
			'Content-type': 'application/x-www-form-urlencoded; charset=utf-8;',
		},
		data: data,
		onload: function(responseDetails) {
			var error = isCatsError(responseDetails);
			if (error) return;

			
			var text = responseDetails.responseText;
			text = text.replace("\n","","g");
			
			// Clear search results
			eid('catsSearchResult').innerHTML = '';
			
			// Parse search results list
			var rePat1 = new RegExp("<item>(.*?)<\/item>","img");
			var item, id, caption;
			while (item = rePat1.exec(text)) {
				id = /<id>(.*?)<\/id>/.exec(item[1]); id = id[1];
				caption = /<summary>(.*?)<\/summary>/.exec(item[1]); caption = caption[1];
				
				var a = _document.createElement('a');
				a.addEventListener('click', function(event) {
					// Select person
					eid('catsPerson').innerHTML = this.innerHTML;
					eid('catsPerson').setAttribute('person_id',this.getAttribute('person_id'));
					//selectPerson();
				},true);
				a.setAttribute('href', 'javascript:void(0)');
				a.setAttribute('person_id', id);
				a.setAttribute('class', 'el ou');
				a.innerHTML = caption;
				var div = _document.createElement('div');
				div.appendChild(a);
				eid('catsSearchResult').appendChild( div );
			}
			//135226
			if (eid('catsSearchResult').innerHTML == "")
				eid('catsSearchResult').innerHTML = '-none found-';
		},
		onerror: function(responseDetails) {
			alert('Ajax error');
		}
	});
}

function addButton() {
	var tmp = xpath("//div[@class='gB']");

	if (tmp.snapshotLength > 0) {
		for (var i = 0 ; i < tmp.snapshotLength ; i++) {
			var n = tmp.snapshotItem(i).previousSibling;
			if (!n) { 
				var msgid=tmp.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.getAttribute("id");
				var c = document.createElement('button');
				c.innerHTML = '&nbsp; Add to CATs';
				c.setAttribute('msgid',msgid);
				c.addEventListener('click', function(event) {

					clickButton(this);
				},true);
				tmp.snapshotItem(i).parentNode.insertBefore(c, tmp.snapshotItem(i));
			}
		}
	}		
}

/**
 * Clicks on CATs button
 */
function clickButton(_this) {
	// Show dialog
	showDialog();
	var msg = {id:'', obj:'', body:'', from:'', to:[]};

	msg.id = _this.getAttribute("msgid");
	msg.obj = xpath("//div[@id='+msg.id+']").snapshotItem(0);

	// Message BODY text
	tmp = xpath("//div[@class='ii gt']/div", msg.obj);
	if(tmp){
		msg.body = tmp.snapshotItem(0).innerHTML;
	}
	// Message FROM
	tmp = xpath("//div[@class='gE iv gt']//td[@class='gF gK']//h3[@class='gD']/span", msg.obj);
	if (tmp){
		msg.from = tmp.snapshotItem(0).getAttribute("email");
	}

	// Message TO
	var tmp = xpath("//div[@class='gE iv gt']//td[@class='gF gK']//span[@class='hb']//span", msg.obj);
	if (tmp){
		for(var i=0; i< tmp.snapshotLength;i++){
			msg.to[i] = tmp.snapshotItem(i).getAttribute("email");
		}
	}
	console.log(msg);




	// Parse message
	//var message = _this.parentNode.parentNode.innerHTML; 
	var message = msg.body;
	eid('catsFrom').value = msg.from;
	eid('catsSearch').value = msg.from;

	// Message subject
	try {
		tmp = xpath("//h1[@class='ha']/span");
		eid('catsSubject').value = tmp.snapshotItem(0).innerHTML.trim();	
	} catch(e) { eid('catsSubject').value = ""; }

	// Message text
	tmp = _document.getSelection();
	if (tmp == '') tmp = message.replace(/(<([^>]+)>)/ig,"")
	eid('catsText').value = tmp;

	// Message date
	//var msgDate = /span.*?title="(.*?)"/.exec(message);
	//msgDate = msgDate[1];
	//alert(msgDate);

	// Message from
	//try {
	//	tmp = /email="(.*?)"/.exec(message);
	//	eid('catsFrom').value = tmp[1];
	//	eid('catsSearch').value = tmp[1];
	//} catch (e) { eid('catsFrom').value = ""; }


	// Perform search at once
	window.setTimeout( function(event){searchCats();}, 300);
}


function showDialog() {
	var tmp;
	
	// no double open
	if (ctsDialog) return;

	ctsDialog = document.createElement('div');
	var t="", s="";	
	t += '	<div id="catsTitle" style="padding:5px; height:20px; background-color:#abc;cursor:move;" onmousedown="dragStart(event, \'ctsDialog\');">';
	t += '		<span id="CATStitlespan" style="float:left;"><b>Add to CATS</b></span>';
	t += '		<span id="dlgCATClose" style="float:right; cursor:hand; cursor:pointer;"><a href="javascript:;" onclick="closeDialog();" class="el ou">Close</a>&nbsp;×</span>';
	t += '	</div>';
	t += '	<div id="contentCATS" style="height:340px; padding-top:10px;display:block;">';
	t += '		<div style="width:160px; height:300px; float:left;display:table-cell">';
	t += '			<div align="left">Search candidate:<br/><input id="catsSearch" style="width:154px;" placeholder="Search person"/></div>';
	t += '			<br/>Candidates found:<br/>';
	t += '			<div id="catsSearchResult" style="height:219px; width:99%; overflow:auto; margin-top:5px; border:1px solid #ccc;"><i>none found</i></div>';
	t += '		</div>';
	t += '		<div style="width:350px; height:300px;float: right;display:table-cell;">';
	t += '			<table width="100%">';
	t += '			<tr><td style="font-weight:bold;">Selected</td><td><div id="catsPerson" style="font-weight:bold;"><span style="font-weight:normal;font-decoration:italic;">No candidate selected</span></div></td></tr>';
	t += '			<tr><td style="font-weight:bold;">From:</td><td><input type="text" id="catsFrom" size="30"></td></tr>';
	t += '			<tr><td style="font-weight:bold;">Subject:</td><td><input type="text" id="catsSubject" size="30"></td></tr>';
	t += '			<tr><td colspan="2"><textarea id="catsText" style="border:1px solid #ccc; height:220px; width:99%;"></textarea></td></tr>';
	t += '			</table>';
	t += '		</div>';
	t += '		<p style="text-align:right;display:block;"><button id="catsButton" style="width:50%;">Submit</button></p>';
	t += '	</div>';

s += '\n<script type="text/javascript">';
s += '\n    function Browser() {';
s += '\n        var ua, s, i;';
s += '\n        this.isIE = false;';
s += '\n        this.isNS = false;';
s += '\n        this.version = null;';
s += '\n        ua = navigator.userAgent;';
s += '\n        s = "MSIE";';
s += '\n        if ((i = ua.indexOf(s)) >= 0) {';
s += '\n            this.isIE = true;';
s += '\n            this.version = parseFloat(ua.substr(i + s.length));';
s += '\n            return;';
s += '\n        }';
s += '\n        s = "Netscape6/";';
s += '\n        if ((i = ua.indexOf(s)) >= 0) {';
s += '\n            this.isNS = true;';
s += '\n            this.version = parseFloat(ua.substr(i + s.length));';
s += '\n            return;';
s += '\n        }';
s += '\n';
s += '\n        // Treat any other "Gecko" browser as NS 6.1.';
s += '\n        s = "Gecko";';
s += '\n        if ((i = ua.indexOf(s)) >= 0) {';
s += '\n            this.isNS = true;';
s += '\n            this.version = 6.1;';
s += '\n            return;';
s += '\n        }';
s += '\n    }';
s += '\n';
s += '\n    var browser = new Browser();';
s += '\n';
s += '\n    // Global object to hold drag information.';
s += '\n    var dragObj = new Object();';
s += '\n    dragObj.zIndex = 0;';
s += '\n';
s += '\n    function dragStart(event, id) {';
s += '\n';
s += '\n        var el;';
s += '\n        var x, y;';
s += '\n';
s += '\n        // If an element id was given, find it. Otherwise use the element being';
s += '\n        // clicked on.';
s += '\n        if (id) dragObj.elNode = document.getElementById(id);';
s += '\n        else {';
s += '\n            if (browser.isIE) dragObj.elNode = window.event.srcElement;';
s += '\n            if (browser.isNS) dragObj.elNode = event.target;';
s += '\n';
s += '\n            // If this is a text node, use its parent element.';
s += '\n            if (dragObj.elNode.nodeType == 3) dragObj.elNode = dragObj.elNode.parentNode;';
s += '\n        }';
s += '\n';
s += '\n        // Get cursor position with respect to the page.';
s += '\n        if (browser.isIE) {';
s += '\n            x = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;';
s += '\n            y = window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop;';
s += '\n        }';
s += '\n        if (browser.isNS) {';
s += '\n            x = event.clientX + window.scrollX;';
s += '\n            y = event.clientY + window.scrollY;';
s += '\n        }';
s += '\n';
s += '\n        // Save starting positions of cursor and element.';
s += '\n        dragObj.cursorStartX = x;';
s += '\n        dragObj.cursorStartY = y;';
s += '\n        dragObj.elStartLeft = parseInt(dragObj.elNode.style.left, 10);';
s += '\n        dragObj.elStartTop = parseInt(dragObj.elNode.style.top, 10);';
s += '\n';
s += '\n        if (isNaN(dragObj.elStartLeft)) dragObj.elStartLeft = 0;';
s += '\n        if (isNaN(dragObj.elStartTop)) dragObj.elStartTop = 0;';
s += '\n';
s += '\n        // Update elements z-index.';
s += '\n        dragObj.elNode.style.zIndex = ++dragObj.zIndex;';
s += '\n';
s += '\n        // Capture mousemove and mouseup events on the page.';
s += '\n        if (browser.isIE) {';
s += '\n            document.attachEvent("onmousemove", dragGo);';
s += '\n            document.attachEvent("onmouseup", dragStop);';
s += '\n            window.event.cancelBubble = true;';
s += '\n            window.event.returnValue = false;';
s += '\n        }';
s += '\n        if (browser.isNS) {';
s += '\n            document.addEventListener("mousemove", dragGo, true);';
s += '\n            document.addEventListener("mouseup", dragStop, true);';
s += '\n            event.preventDefault();';
s += '\n        }';
s += '\n    }';
s += '\n';
s += '\n    function dragGo(event) {';
s += '\n';
s += '\n        var x, y;';
s += '\n';
s += '\n        // Get cursor position with respect to the page.';
s += '\n        if (browser.isIE) {';
s += '\n            x = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;';
s += '\n            y = window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop;';
s += '\n        }';
s += '\n        if (browser.isNS) {';
s += '\n            x = event.clientX + window.scrollX;';
s += '\n            y = event.clientY + window.scrollY;';
s += '\n        }';
s += '\n';
s += '\n        // Move drag element by the same amount the cursor has moved.';
s += '\n        dragObj.elNode.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";';
s += '\n        dragObj.elNode.style.top = (dragObj.elStartTop + y - dragObj.cursorStartY) + "px";';
s += '\n';
s += '\n        if (browser.isIE) {';
s += '\n            window.event.cancelBubble = true;';
s += '\n            window.event.returnValue = false;';
s += '\n        }';
s += '\n        if (browser.isNS) event.preventDefault();';
s += '\n    }';
s += '\n';
s += '\n    function dragStop(event) {';
s += '\n';
s += '\n        // Stop capturing mousemove and mouseup events.';
s += '\n        if (browser.isIE) {';
s += '\n            document.detachEvent("onmousemove", dragGo);';
s += '\n            document.detachEvent("onmouseup", dragStop);';
s += '\n        }';
s += '\n        if (browser.isNS) {';
s += '\n            document.removeEventListener("mousemove", dragGo, true);';
s += '\n            document.removeEventListener("mouseup", dragStop, true);';
s += '\n        }';
s += '\n    }';
s += '\n</script>';

	ctsDialog.innerHTML = t + s;
	ctsDialog.style.display='block';
	ctsDialog.style.top = window.pageYOffset + 50 + "px";
	ctsDialog.style.left = "50px";
	ctsDialog.style.height = "380px";
	ctsDialog.style.width = "520px";
	ctsDialog.style.zIndex = "10";
	ctsDialog.style.backgroundColor="#fff";
	ctsDialog.style.font="14px Calibri,sans-serif";
	ctsDialog.style.border = "3px outset";
	ctsDialog.style.position = 'absolute';
	ctsDialog.style.padding = '5px';
	ctsDialog.setAttribute('id', 'ctsDialog');


	document.body.appendChild( ctsDialog );


	// Search input
	eid('catsSearch').addEventListener('keyup', function(event) {
		window.clearTimeout(searchTimer);
		searchTimer = window.setTimeout( function(event){searchCats();}, 300);
	},true);
	
	// Submit button
	eid('catsButton').addEventListener('click', function(event) {
		sendToCats();
	},true);

	// Close button
	document.getElementById('dlgCATClose').addEventListener('click', function(event) {
		closeDialog();
	},true);	
}


function closeDialog() {
	document.body.removeChild(ctsDialog);
	ctsDialog = null;
}

if (document.body) {
	window.setInterval(function() {
		addButton(); 
	}, 100);
	GM_registerMenuCommand("Enter Transaction ID", configTransactionId);
}
