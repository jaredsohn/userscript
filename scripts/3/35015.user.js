// ==UserScript==
// @name           Codeplex SVN Link Generator
// @author	   Amar Raja
// @description    Generates an SVN link alongside the TFS links in Codeplex.
// @include        http://www.codeplex.com/*/SourceControl/ListDownloadableCommits.aspx*
// ==/UserScript==

(function (){
	var q = "//div[contains(@id, 'SourceControlAnonDiv')]/div[2]//span";
	var nodes = document.evaluate(q, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	if (nodes.snapshotLength < 2)
		return;

	var project = nodes.snapshotItem(0).textContent;
	var url = nodes.snapshotItem(1);

	var svnurl = "https://" + project + ".svn.codeplex.com/svn";

	var lbl = document.createElement('b');
	lbl.innerHTML = 'SVN: ';

	var spn = document.createElement('span');
	var svnlink = document.createElement('a');
	svnlink.href = svnurl;
	svnlink.innerHTML = svnurl;
	spn.appendChild(svnlink);
	
	url.parentNode.appendChild(lbl);
	url.parentNode.appendChild(spn);
	url.parentNode.style.width = '';
	
	var tfslbl=url.previousSibling;
	while (tfslbl.nodeType != 1)
	{
		tfslbl=tfslbl.previousSibling;
		if (tfslbl.nodeType == 1)
			tfslbl.innerHTML = tfslbl.innerHTML = 'TFS: ';
	}
	
})();