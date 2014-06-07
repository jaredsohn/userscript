// ==UserScript==
// @id           githubUnAJAXIssueLinks@erikvold.com
// @name         Github UnAJAX Issue Links
// @namespace    githubUnAJAXIssueLinks
// @include      /https?:\/\/github\.com\/[^\/]*\/[^\/]*\/(issues|unreads|closed)/i
// @include      http://github.com/*/*/issues
// @include      http://github.com/*/*/unreads
// @include      http://github.com/*/*/closed
// @match        http://github.com/*/*/issues
// @match        http://github.com/*/*/unreads
// @match        http://github.com/*/*/closed
// @datecreated  2010-03-10
// @lastupdated  2010-09-27
// @version      0.1.2
// @author       Erik Vergobbi Vold <erikvvold@gmail.com> http://erikvold.com/
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @homepage     http://userscripts.org/scripts/show/71187
// @description  This userscript unajaxifys issue links in a Github project's issue tracker.
// ==/UserScript==

(function(d){
	var issueList = d.getElementById("issue_list");
	if(!issueList) return;

	var issue,
		clone,
		baseURL = d.location.href.match(/https?:\/\/github\.com\/[^\/]*\/[^\/]*\//i)[0],
		replaceRegEx = /^[^#]*#/i;

	issueList.addEventListener("DOMNodeInserted", function(e){
		if(e.target.tagName != 'LI') return;

		var issue = d.evaluate(".//a[contains(@class,'issue_title') and contains(@href,'#issue/')]",e.target,null,9,null).singleNodeValue;
		if(!issue) return;

		issue.href = baseURL + "issues/" + issue.href.replace(replaceRegEx, "");
		issue.removeAttribute("class");
	}, false);

	var issueLinks = d.evaluate("//li//a[contains(@class,'issue_title') and contains(@href,'#issue/')]",d,null,7,null);
	if(issueLinks.snapshotLength == 0) return;

	for(var i=0; i < issueLinks.snapshotLength; i++){
		issue = issueLinks.snapshotItem(i);
		issue.href = baseURL + "issues/" + issue.href.replace(replaceRegEx, "");
		issue.removeAttribute("class");
	}
})(document);
