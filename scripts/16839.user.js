// ==UserScript==
// @name          Gmail - Insert HTML Signature - v 2.1
// @namespace     http://mjb.bighlaughs.org/
// @description   Inserts your HTML signature into a GMail message
// @include       https://mail.google.com/*
// @include       http://mail.google.com/*
// ==/UserScript==
		
// Add the signature to the message
window.insSig = function(w) {
	defS = getCookie("defSig");
	if (defS == -1 || defS == false) { defS = 0; }
	if (!w) {cnt = defS;} else {cnt = findSig(w);}
	//if (!cnt) { cnt=defS; }
	sigs = getSigs();
	if (sigs.length > 0) {
		s_html = sigs[cnt];
		str = getViewType();
		txtBox = getWindow();
		s_head = "<!--Begin HTML Signature--><br />";
		s_foot = "<!--End HTML Signature-->";
		existing_sig = new RegExp("<\!--Begin HTML Signature-->(.|\n)*<\!--End HTML Signature-->");
		if (str == "Compose") { // no reply/forward text, insert at end else {
			if (txtBox.contentDocument.body.innerHTML.match(existing_sig)) {
				txtBox.contentDocument.body.innerHTML = txtBox.contentDocument.body.innerHTML.replace(existing_sig, "");
			}
			txtBox.contentDocument.body.innerHTML = txtBox.contentDocument.body.innerHTML + s_head + s_html + s_foot;
		} else if (str == "Conversation") { // reply/forward
			//var my_mod = getDoc().getElementById("HTMLSIGS");
			//my_mod.setAttribute("style", "position: absolute; top: 500px;");
			if (!txtBox) { // reply/forward, insert at the beginning
				setTimeout(insSig, 500);
			} else {
				if (txtBox.contentDocument.body.innerHTML.match(existing_sig)) {
					txtBox.contentDocument.body.innerHTML = txtBox.contentDocument.body.innerHTML.replace(existing_sig, "");
				}
				txtBox.contentDocument.body.innerHTML = s_head + s_html + s_foot + txtBox.contentDocument.body.innerHTML;
			}
		}
	}
}

// Delete the signature
function delSig(el) {
	// Load up the signature info
	sigNames = getSigNames();
	sigs = getSigs();
	w = findSig(el);
	// Clear out the deleted signature
	sigNames[w] = "";
	sigs[w] = "";
	// Clear out the strings
	tNames = "";
	tSigs = "";
	// Rebuild the strings with the new cleared out info
	for (i=0;i<sigNames.length-1;i++) {
		if (sigNames[i] != "") {
			tNames += sigNames[i] + ";;";
			tSigs += sigs[i] + ";;";
		}
	}
	// Replace errant characters
	tNames = tNames.replace(";;;;", ";;");
	tSigs = tSigs.replace(";;;;", ";;");
	
	if (tNames == ";;") {
		tNames = "";
		tSigs = "";
	}
	
	if (tNames == "") {
		setCookie("defSig", -1, 365);
	}
	
	// Save the new strings
	setCookie("sigNames", tNames, 365);
	setCookie("sigs", tSigs, 365);
	
	// Re-write the list
	create_list();
}

// Create the input window
function createWindow(n) {
	//Create main layer
	if (n) { str_s = " readonly='true'"; } else { str_s = ""; }
	var new_sig_window = getDoc().createElement('div');
	new_sig_window.setAttribute("style", "position: absolute; padding: 10px; background-color: #E1EFFA; left: 10%; top: 100px; height: 240px; border: 1px solid black; width: 480px; z-index: 5000;");
	new_sig_window.innerHTML = "Name:&nbsp;&nbsp;<input" + str_s + " type='text' name='nme' id='nme' /><br /><br /><textarea rows='7' cols='60' name='htmlSig' id='htmlSig'>Type your HTML signature here...</textarea><br /><br />";
	new_sig_window.id = "newSig";
	// Create Save button
	var txtSave = getDoc().createElement('span');
	txtSave.innerHTML = "<a href='#'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAACXBIWXMAAAdvAAAHbwExSvRIAAACYElEQVR4nK1UzWoUQRCu6pnMzk52UUMIWfakB+PFm6KHQA6Cz+DFF/MBvHny5s2LHgRBAhLwJILELHGTmOzsbqarreru6e5RskSw2e2p6ar66qufHjTGwP9YOf8XGo7mZk3Bdh/d6ems/nI4AQ4hYWykINu30WhMWbFZYj/zQMiMpgvz/oh6mSC6dTKdHHz+IJ78I96pFdwJPdx9kq1vlBk83sqqvGXEMYiNFO8eiMg7BKx+Nbx7/xEqNf3x/evBRz5hmxnBu8Nmd5QzYu5okzYGkXcHZMiieAoiKMA8Lxmo6PWtCpzxTMPpwpQVOkbGSHAUfw/UogRSxtpEFZnAX2qHLSPR2T0AmQ4Wn7AWJaQ/icaha8alRjE1EVJG4mz4EJ2/i9oaW0auRq4oxiSpJRAWzmiyWsOCIxuNTcvI80zY2kZ2ul6fHe+/fRUmwJaoM8mx/b/mtNFXDv5Gsdmc31kuajeHGEbRovR6ZVbdpGVgFFJjrSaexslShwjDrR24ep3V0RJiaoyjaVi/vD14w430anQbRgdEgPQdvtV7x/nzTtea5vLBrRfj9U8rWPy9Rr3919Nn3a5xL5ls8084Yu/6ERnJi4bLGi7OAUNKKNkEoU3O7ghFIS5hCJI50pApKNcgVCItSUe2giILZBckcyT3kH9IHetU6MjoCuLvFqRXRGqEEiQ64kpZibHcrTQ1AbOTgc0V6SQPf05tjZKu2XnXcgGWi25d08JDV5UJVluimBrDY44wKOC6S0P4vHmgqlD3xtXk59OadjCyT59/1sk959k2Ow5KBe7jf20Oq9ZvnAvuzZTUhnMAAAAASUVORK5CYII%3D' border='0' alt='Save' width='24' height='24' /></a>&nbsp;&nbsp;&nbsp;";
	txtSave.addEventListener('click', function () {saveForm(this.parentNode);}, false);
	// Create Cancel button
	var txtCancel = getDoc().createElement('span');
	txtCancel.innerHTML = "<a href='#'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAACXBIWXMAAAdvAAAHbwExSvRIAAADoUlEQVR4nK2UTWwbRRTH35v9qNeJY8d248RuqOSgNglBICGBuHDhwgVxQ+ZW0TO9cui5NziHI4dwQOWAhMoBVaEJqIIDlFKEnIggNyHU8caJv7L27Mc8Zna9dUhdEBKj0WpH8+Y37+P/BokI/o+hP22DB2APqOUCUDgBcgnIW2iw8fb4pEc9D6ptsjkBhusQREJNEFCawMtZtIx/A+10aLtLjAGyGELqfASiQH2ZgJUZ9kz66aD7TToYkKmDoQOTpxh6AtzQEYUIQASCBIv+L+XY4vkRaBTxby2qO2TpMGnitHtUtG+nRD9pwDmZRlSG2klj/vcP9EFTLRG2bNprPQHqurB9TDKRCQ2n3OOLeHs+X7vQvmP5fZMBQ9DajeXdd57zry/tX9P7zWEE+8T9v4OqTZVanUFy0CzBlxPZIku/ks02Z+1bxsAxuvbSH5VScoPpYl58uly/ZgwUyxdQrdMI5AZwcKLWCFTyv0qmbNAMYCaaLD/5zeze6qU/3y2lNpGRrAAilfjNJfpClZJg7wiiJCvQo67KuCyHF+D+1Fvkc/Dug/c9BDVmHF6YXptLraMW14TQn327OnElWksnDnsxqMshBsERt7b894TzkAbfgfcA/BqCjcgjTZJAnq/cmV7jPg6FStByYtDACwtM4PnQd+Ggb/0cXKfeI3B+AV4DtxHeI0uOPFPZyKy5sX00uasuGbYIEYJQa9cHnyDonNS77lx2BwMXAoJYSrvHWd/okJaOVBp5hGEDKNA5LZS/kodiMadxuV2Zy2+iRMjqBhB9pUQX/FVowHbuhsemKJZ7wsAhKJNACijEo9E/WOlUSpIiL5UID8hD6SQGiqWRWHBWpS9b0zfciEWQtuIcFVLDtkSCF/iHRVlpGaZMhAs0QFd/U0CZvNA16ZdP5d5Hz7ObUbwymlwqBsnmKqUVKPBhJ/s+iALxkNJHnqh8nfx8M3dPaGXywxilWf71qn4liqs8M8zRUNkrRcRwwz7J3Z34SXhF4TBuVdbNT/ocWoPUxvl7wnxWEHMLb6xP3er1NZl7U4PFEp7t/toh/FCjqCHzVvtF7bNv+dXHrSStpkz3ZfPju87VHteikr22jIXMuGfk1305FQsRTg+C+HmjoYJkNl9awPLsyObsw/bQhh9rJLsRT1NOg0hF9OriyJfxoEiTD3Zp11YdcxomDRMGlAuwNI+6dubQONDjpNRb4HDoOCQrMmlhyoKZzFjbfwT91/EX0Msh80vTQOoAAAAASUVORK5CYII%3D' alt='Cancel' border='0' width='24' height='24' /></a>&nbsp;&nbsp;&nbsp;";
	txtCancel.addEventListener('click', function () {closeForm(this.parentNode);}, false);
	// Create Preview button
	var txtPreview = getDoc().createElement('span');
	txtPreview.innerHTML = "<a href='#'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAACXBIWXMAAAdvAAAHbwExSvRIAAADMklEQVR4nK2UXW/TVhzGn+PYjp04TUigTUtDUAWMgoBSmCYqmLRJkeCGS2642OU+we6mfQC4Q9onmLTbSdsF0iQ0TSAEQojXofIS1Ja8rEnz4iS2c2wfnx2naWGQaHTbX5YlPz7+nec8/+NDOOf4P0r+UDI91CjvuKBe+HpCxmSMpPV/AJF3HdkMyxav91ynsiF5fiYVa7YdL5Dk1O60ET2RJYnoR4BaHh51ebtY2qtHTs5n5Yi0qQecP35ZX234id3ZY1lpT2IMiQ/K8viNevDTzWKn1x88/8hXj/EXef4owys/hILj/nqv9KQUmDYfWcNpn5m8+7pcOJVLxAfuJQmZc5g6g6kjwpMQYppy7viU1W33+qMNhaAWRc1096fUuK5srXgW0icgOZDJ7YZoqpyOk1g0aPZGgMJB6xbv1zaOnJ4GXQFRIOmQssAhESBIG846WvfBQ2cHZhf/WLNSRjxtkBGgDoWhSopkoXUF2nFET0OZh2+ClEBkkF9Q/R5+gLJJLjRcn1mjVheCwv0S9kjMz0Aogho8gNXg9xD4iDCoCiIiqYELAtMeAxLBUD4YROuQ1sACkDcILHgleBshjvHw8sON4vqEjnM0oaLBRB4y4Ytwoojo8CqQS2DNMCBzBrG5MKO8IQaLrhnKGNCUQV5Fks/L9uHct0O5fA32DXAbTgfJr3Hwq025alLL1uYPvJ80NtufMZDUldUGox4byrSJfg1uL1xmMNRYwIvrTHRlJjPC0XBDntxHHLbr9vO2xwbfiZvjwvFh+xjARUQPKrRS0VJ6tU/ph6C3/1q1hTuveDLWPTit5pI+gq3eKHsaFMUaWylKnvO4sDT3Yvnp2c+WxoJEtS3ce8lt15+YcHcZiqyIXkfELmusE+KTlF66fef3wiltYf4pzM+x98v3w96uVByFBVJtKqUNufZnqIhZEjpO5EluEh6b8enswtp30Kax30EZ77LIjk9Iegs/f4ND05g7is4X26ydg7ZZh/PI70P3vJVeiuuatGOKqOhZXLyK5VWsvK6rwfWbd/+toy1fD6//dt9fvHyxoKnqiMP/I8vBp8/k/qXCkqD8N0d/r78AXwma2/GDjMEAAAAASUVORK5CYII%3D' border='0' alt='Preview' width='24' height='24' /></a>";
	txtPreview.addEventListener('click', function () {doPreview(this.parentNode);}, false);
	// Put it all together
	new_sig_window.appendChild(txtSave);
	new_sig_window.appendChild(txtCancel);
	new_sig_window.appendChild(txtPreview);
	getDoc().body.appendChild(new_sig_window);
	return new_sig_window;
}

function doPreview(frm) {
	tHTML = frm.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.value;
	//Create main layer
	var new_sig_window = getDoc().createElement('div');
	new_sig_window.setAttribute("style", "position: absolute; padding: 5px; background-color: #E1EFFA; left: 10%; top: 360px; height: 260px; border: 1px solid black; width: 490px; z-index: 5000;");
	new_sig_window.innerHTML = "&nbsp;";
	new_sig_window.id = "prevSig";
	//Create preview layer
	var prev_win = getDoc().createElement('div');
	prev_win.setAttribute("style", "position: absolute; padding: 5px; background-color: white; left: 8px; top: 30px; height: 220px; border: 1px solid black; width: 470px; overflow: scroll; z-index: 5000;");
	prev_win.innerHTML = tHTML;
	// Create Close button
	var txtCancel = getDoc().createElement('span');
	txtCancel.setAttribute("style", "position: relative; top: 0px; left: 0px;");
	txtCancel.innerHTML = "<a href='#'>Hide Preview</a>&nbsp;&nbsp;&nbsp;";
	txtCancel.addEventListener('click', function () {closeForm(this.parentNode);}, false);
	new_sig_window.appendChild(prev_win);
	new_sig_window.appendChild(txtCancel);
	getDoc().body.appendChild(new_sig_window);	
}

// Load up the list of signatures
function getSigs() {
	tSigs = getCookie("sigs");
	if (tSigs != false && tSigs != -1) {
		sSigs = tSigs.split(";;");
	} else {
		sSigs = "";
	}
	return sSigs;
}

// Load up the list of signature names
function getSigNames() {
	tNames = getCookie("sigNames");
	if (tNames != false && tNames != -1) {
		sSigNames = tNames.split(";;");
	} else {
		sSigNames = "";
	}
	return sSigNames;
}

// Save the signature information
function saveSigs(s_name, s_html) {
	// Load up the signature info
	sigs = getSigs();
	sigNames = getSigNames();
	// Clear the variables
	tNames = "";
	tSigs = "";
	// Determine if it's a new signature or existing one and write the existing signatures to the strings
	var n = false;
	for (i=0;i<sigNames.length-1;i++) {
		if (sigNames[i] == s_name) {
			n = true;
		}
		tNames += sigNames[i] + ";;";
		tSigs += sigs[i]  + ";;";
	}
	// If it's a new signature, add it to the end of the strings
	if (n == false) {
		tNames += s_name + ";;";
		tSigs += s_html + ";;";
	// If it already exists, edit the signature and rebuild the string
	} else {
		tNames = "";
		tSigs = "";
		for (i=0;i<sigNames.length-1;i++) {
			if (sigNames[i] == s_name) {
				sigNames[i] = s_name;
				sigs[i] = s_html;
			}
			tNames += sigNames[i] + ";;";
			tSigs += sigs[i] + ";;";
		}
	}
	// Clear the string if it's just two semi-colons
	if (tNames == ";;") {
		tNames = "";
		tSigs = "";
	}
	// Write the strings to the memory
	setCookie("sigNames", tNames, 365);
	setCookie("sigs", tSigs, 365);
	// Return if it's new or not
	return n;
}

function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1; 
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    } 
  }
return -1;
}

function setCookie(c_name,value,expiredays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate()+expiredays);
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

// Save the form
function saveForm(frm) {
	// Get the input values
	tName = frm.firstChild.nextSibling.value;
	tHTML = frm.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.value;
	// Determine if it's a new or existing signature
	var isNew = saveSigs(tName, tHTML);
	// If it is a new signature (I know, it's backwards) re-create the list of signatures
	if (isNew != true) {
		create_list();
	}
	// Close the forms
	closeForm(getDoc().getElementById("newSig"));
}

// Close the input form
function closeForm(frm) {
	frm.style.display = "none";
	if (frm.style.display != "none") { window.setTimeout(closeForm(frm), 500); }
	if (getDoc().getElementById("prevSig")) { getDoc().getElementById("prevSig").style.display = "none"; }
}

// Create the window for adding/editing signatures
function addSig(w, n) {
	// Create the window
	var newWin = createWindow(n);
	// If it's  an existing signature, load it up
	if (n) {
		sigs = getSigs();
		sigNames = getSigNames();
		i = findSig(w);
		newWin.firstChild.nextSibling.value = sigNames[i];
		newWin.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.value = sigs[i];
	}
}

function findSig(w) {
	sigNames = getSigNames();
	cSig = w.parentNode.firstChild.innerHTML;
	s_name = cSig.substr(58, cSig.indexOf("</a>") - 58);
	for (i=0;i < sigNames.length - 1;i++) {
		if (s_name == sigNames[i]) {
			break;
		}
	}
	return i;
}

function setDef() {
	sigNames = getSigNames();
	strN = "Please enter the signature number you'd like to be your default signature\n\n";
	for (i=0;i < sigNames.length - 1; i++) {
		strN += (i + 1) + " - " + sigNames[i] + "\n";
	}
	sDef = getCookie("defSig");
	if (!sDef) { sDef = 0; }
	sDef++;
	vDef = prompt(strN, sDef);
	setCookie("defSig", vDef-1, 365);
	create_list();
}

function create_list() {
	// Create reference to signatures
	sigNames = getSigNames();
	sigs = getSigs();
	defS = getCookie("defSig");
	// Clear the wrapper
	sig.innerHTML = "";
	// Create the footer element
	uSigNew = unsafeWindow.document.createElement('span');
	uSigNew.innerHTML = "<br /><center><font size='-2'><a href='#'>new signature</a></font><center>";
	uSigNew.addEventListener('click', function () {addSig()}, false);
	// Create the footer element
	uSigDef = unsafeWindow.document.createElement('span');
	uSigDef.innerHTML = "<center><font size='-2'><a href='#'>set default</a></font><center>";
	uSigDef.addEventListener('click', function () {setDef()}, false);
	// If there are signatures, create the list
	if (sigs.length > 0 && sigs.length == sigNames.length) {
		for (var myCounter = 0; myCounter < sigs.length-1; myCounter++) {
			//if (myCounter == defS) { str_s = "*"; } else { str_s = ""; }
			// Create sub-wrapper
			uSigWrap = unsafeWindow.document.createElement('span');
			//  Create link to add signature
			uSigAdd = unsafeWindow.document.createElement('span');
			uSigAdd.innerHTML = "<font size='-1'><a href='#' title='Insert this signature'>" + sigNames[myCounter] + "</a></font>&nbsp;&nbsp;";
			if (myCounter == defS) { uSigAdd.style.fontWeight = "bold"; }
			uSigAdd.addEventListener('click', function () {insSig(this)}, false);
			//  Create link to edit signature
			uSigEdit = unsafeWindow.document.createElement('span');
			uSigEdit.innerHTML = "<font size='-2'><a href='#' title='Edit this signature'>edit</a></font>&nbsp;&nbsp;";
			uSigEdit.addEventListener('click', function () {addSig(this, 1)}, false);
			//  Create link to delete signature
			uSigDel = unsafeWindow.document.createElement('span');
			uSigDel.innerHTML = "<font size='-2'><a href='#' title='Delete this signature'>del</a></font><br />";
			uSigDel.addEventListener('click', function () {delSig(this)}, false);
			//  Append <span>s
			uSigWrap.appendChild(uSigAdd);
			uSigWrap.appendChild(uSigEdit);
			uSigWrap.appendChild(uSigDel);
			//Append sub-wrapper to main wrapper
			sig.appendChild(uSigWrap);
		}				
	} else {
		// If there are no signatures, display the message
		//setCookie("defSig", "-1", 365);
		sig.innerHTML = "<font size='-1'>Please add a signature below...</font>";
	}
	// Append the footer
	sig.appendChild(uSigNew);
	if (sigs.length > 0) { sig.appendChild(uSigDef); }
}

//Initialize gmail and gmonkey objects
//Create new module
window.addEventListener('load', function() {
  if (unsafeWindow.gmonkey) {
    unsafeWindow.gmonkey.load('1.0', function(gmail) {
		// Create the module
		var module = gmail.addNavModule('HTML Signatures');
		module.getElement().style.marginBottom = '10px';
		module.getElement().style.marginTop = '10px';
		module.getElement().style.padding = '2px';
		module.getElement().id = "HTMLSIGS";
		// Create a reference to the view element
		var txtBox = gmail.getActiveViewElement();
		// Create the wrapper to go inside the module
		sig = unsafeWindow.document.createElement('div');
		sig.id = "mainMod";
		//Fill the wrapper
		create_list();
		//  Insert module before chat pane
		navPane = gmail.getNavPaneElement().firstChild;
		chatPane = navPane.childNodes[3];
		navPane.insertBefore(module.getElement(), chatPane);
		// Append the wrapper to the module
		module.appendChild(sig);
		//module.getElement().style.position = "absolute";
		window.load_module = function() {
			return gmail.getNavPaneElement().getElementById("HTMLSIGS")
		}
		
		window.getViewType = function() {
			var str = '';
			switch (gmail.getActiveViewType()) {
			  case 'tl': str = 'Threadlist'; break;
			  case 'cv': str = 'Conversation'; break;
			  case 'co': str = 'Compose'; break;
			  case 'ct': str = 'Contacts'; break;
			  case 's': str = 'Settings'; break;
			  default: str = 'Unknown';
			}
			return str;
		}

		window.getDoc = function() {
			return gmail.getNavPaneElement().ownerDocument;
		}

		//window.addEventListener("scroll", function () { alert('hello');/*getDoc().getElementById("HTMLSIGS").style.top = getDoc().getElementsByTagName("body").scrollTop + (window.innerHeight / 2); */}, false);
		//window.addEventListener("resize", function () { alert('hello');/*getDoc().getElementById("HTMLSIGS").style.top = getDoc().getElementsByTagName("body").scrollTop + (window.innerHeight / 2); */}, false);

		window.getView = function() {
			return gmail.getActiveViewElement();
		}

		// function to detect window -- From Jerome Dane's great work:  http://userscripts.org/scripts/show/20887
		window.getWindow = function() {
			var add_win = getView().getElementsByTagName('iframe');
			if (add_win.length > 0) {
				return add_win[0];
			} else {
				return false
			}
		}		
		
	    gmail.registerViewChangeCallback(insSig);
    });
  }
}, true); 