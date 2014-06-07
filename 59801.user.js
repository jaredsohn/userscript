// ==UserScript==
// @name           Sum SP Jira
// @namespace      http://rodland.no
// @description    sums SP
// @include        http://*jira.com/secure/IssueNavigator.jspa*
// ==/UserScript==



var sp_fields = document.getElementsByClassName("nav customfield_10011");
var sp_tot = 0;
var sp_fixed = 0;
var sp_open = 0;
var nmbIssues = 0;

for (var i = 0; i < sp_fields.length; i++) {
	var newNmb = sp_fields[i].innerHTML.replace(/^\s+|\s+$/g, '');
	sp_tot = new Number(sp_tot) + new Number(newNmb);
	var resol = sp_fields[i].parentNode.getElementsByClassName("nav resolution")[0].innerHTML
	if (/Fixed/.test(resol)){
		sp_fixed = new Number(sp_fixed) + new Number(newNmb);
	}
	else{
		sp_open = new Number(sp_open) + new Number(newNmb);
	}
	
	
	nmbIssues++;
}	

var issues = document.getElementById("issuetable");
issues.innerHTML = "<tr><th colspan=5> " + nmbIssues + " issues, Total SP: "  + sp_tot + ", Fixed SP: "  + sp_fixed + ", Open SP: " + sp_open + "</th></tr>" + issues.innerHTML;

