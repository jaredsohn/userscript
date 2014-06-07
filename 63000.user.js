// Made by Clint Priest
// ==UserScript==
// @name            DNSstuff Stuff v1.0
// @namespace       www.dnsstuff.com
// @description     Automatically logs you in and brings you to the tools page, enhances site by linkifying ip and domain names to forward and reverse dns.  Forward and reverse DNS pages include re-query form.
// @include         http://www.dnsstuff.com/*
// @include         http://dnsstuff.com/*
// ==/UserScript== 

var user = '';
var pass = '';

try {
	var InputUser = document.getElementsByName('amember_login')[0];
	var InputPass = document.getElementsByName('amember_pass')[0];
	
	InputUser.value = user;
	InputPass.value = pass;
	
	if(InputUser.value && InputPass.value)
		document.getElementById('mod_loginform-right').submit();
} catch(e) {
	if(document.location.href.match(/dnsstuff\.com\/$/))
		document.location.href = document.location.href + 'tools';
}

AddLinks();

if(document.location.href.match(/ptr\/\?ip=/))
	UpgradeReversePage();
if(document.location.href.match(/lookup\/\?name=/))
	UpgradeForwardPage();


function AddLinks() {
	var HTML = document.querySelector('pre').innerHTML;
	RegExp.multiline = true;
	
	HTML = HTML
		.replace(/(^|<td>|\s+|\[)(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(\s+|<\/td>|])/gi, '$1<a style="color: blue; text-decoration: underline;" href="/tools/ptr/?ip=$2">$2</a>$3')
		.replace(/(^|<td>|\s+|<b>)([\w\-\_\-\.]+\.(?:com|net|org|travel|biz|us|co.uk|asia|tv|cc|ws|in|info|mobi|in-addr.arpa))(\s+|\.)/gi, '$1<a style="color: blue; text-decoration: underline;" href="/tools/lookup/?name=$2&type=A">$2</a>$3');
	document.querySelector('pre').innerHTML = HTML;
}

function UpgradeReversePage() {
	var Element = document.querySelector('h2');
	var hParams = GetQueryParams();
	Element.innerHTML = 'Reverse DNS for <form style="display: inline;"><input name="ip" type="text" size="15" value="'+hParams.ip+'"> <input type="submit" value="Go"></form>';
}

function UpgradeForwardPage() {
	var Element = document.querySelector('h2');
	var hParams = GetQueryParams();
	var ReplaceHTML = 'DNS Lookup: ';
	ReplaceHTML += 	'<form style="display: inline;">'
	ReplaceHTML += 	'<input name="name" type="text" size="30" value="'+hParams.name+'">';
	ReplaceHTML += 	'<input type="hidden" name="type" value="'+hParams.type+'">';
	ReplaceHTML += 	'<input type="hidden" name="server" value="'+hParams.server+'">';
	ReplaceHTML += 	'<input type="hidden" name="detail" value="'+hParams.detail+'"> ';
	ReplaceHTML += 	'<input type="submit" value="Go">';
	ReplaceHTML += 	'</form>';
	Element.innerHTML = ReplaceHTML;
}

function GetQueryParams() {
	var tPairs = document.location.search.substr(1,999999).split('&');
	var hParams = { };
	for(var i in tPairs) {
		var tSplit = tPairs[i].split('=');
		hParams[tSplit[0]] = tSplit[1];
	}
	return hParams;
}