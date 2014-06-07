// ==UserScript==
// @name    Extra Private Message Options
// @namespace  xerotic/extrapmoptions
// @description  Gives additional options to MyBB PM System (HF)
// @include  *hackforums.net/private.php?action=send*
// @include  *hackforums.net/private.php?action=read*
// @include  *hackforums.net/usercp.php?action=options
// @version  1.0
// ==/UserScript==

var pmOptions = localStorage.getItem('hfx_extra_pm_options');
if(pmOptions==null || pmOptions=="") {
	localStorage.setItem('hfx_extra_pm_options', "true");
	var pmOptions='true';
}

if(pmOptions == "true") {
	var inputOption = true;
} else {
	var inputOption = false;
}

var ourTable = document.getElementsByTagName("table")[4];

if(document.location.toString().indexOf('private.php?action=send')!=-1 || document.location.toString().indexOf('private.php?action=read')!=-1) {
	var ourInput=document.getElementsByName('options[savecopy]')[0];
	if(ourInput) {
		ourInput.checked=inputOption;
	}
}

if(document.location.toString().indexOf('usercp.php')!=-1) {
	var NewPmRow = document.createElement("tr");
	var NewPmCell = document.createElement("td");
	var NewPmCellTwo = document.createElement("td");
	var NewPmSpan = document.createElement("span");
	NewPmSpan.className="smalltext";
	var NewPmLabel = document.createElement("label");
	NewPmLabel.htmlFor="pmsavecopy";
	NewPmLabel.innerHTML="Save a copy of your messages in your Sent Items folder.";
	NewPmCell.valign="top";
	NewPmCell.width="1";
	var NewPmInput = document.createElement("input");
	NewPmInput.type="checkbox";
	NewPmInput.className="checkbox";
	NewPmInput.name="pmsavecopy";
	NewPmInput.id="pmsavecopy";
	NewPmInput.value="1";
	NewPmInput.checked=inputOption;
	NewPmSpan.appendChild(NewPmLabel);
	NewPmCellTwo.appendChild(NewPmSpan);
	NewPmCell.appendChild(NewPmInput);
	NewPmRow.appendChild(NewPmCell);
	NewPmRow.appendChild(NewPmCellTwo);
	ourTable.appendChild(NewPmRow);
}

function form_submit(event) {
	var form = event ? event.target : this;

	if(document.getElementById('pmsavecopy').checked) {
		localStorage.setItem('hfx_extra_pm_options', "true");
	} else {
		localStorage.setItem('hfx_extra_pm_options', "false");
	}
	
	form._submit();
}

// Make Firefox Happy...
if(document.location.toString().indexOf('usercp.php')!=-1) {
	window.addEventListener('submit',form_submit, true);
	HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
	HTMLFormElement.prototype.submit = form_submit;
}
