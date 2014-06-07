/*

Change CiteULike to allow local file references/links - 0.1 31/01/2006
Copyright (c) 2006, Tor Arne Vestbø - http://www.mystifistisk.net/
Released under the GPL http://www.gnu.org/copyleft/gpl.html

This is a Greasemonkey user script, see http://greasemonkey.mozdev.org/.

This script changes CiteULike to allow local file references/links.
I use it to store my reading list locally, and then use Acrobat to
take notes, mark good quotes, and so on.

You can specify a library root folder, in case you move your library,
but references are stored locally so in case you move between different
workstations a lot you'll have a problem :(

NOTE:   You need to enable access to local links by adding the following
        to you "user.js" file:

user_pref("capability.policy.policynames", "localfilelinks");
user_pref("capability.policy.localfilelinks.sites", "http://www.citeulike.org");
user_pref("capability.policy.localfilelinks.checkloaduri.enabled", "allAccess");

For more info on this see:
http://kb.mozillazine.org/Links_to_local_pages_don't_work

Let me know of any bugs! :)

Tor Arne

*/

// ==UserScript==
// @name          CiteULike local file references
// @description   Change CiteULike to allow local file links
// @namespace     http://www.mystifistisk.net/
// @include       http://www.citeulike.org/*
// ==/UserScript==

GM_registerMenuCommand("Change Library Root...", function()
{
	var path = prompt("Please enter your library root folder:", GM_getValue("pdf_root", ""));
	if (path != undefined)
	{
		if (path.lastIndexOf('\\') == (path.length - 1)) path = path.substring(0, path.length - 1);
		GM_setValue("pdf_root", path);
	}
});

/* DOM Builder
*  Usage: dom( 'p', 'bla bla bla', {id : 'ptag'}, [ dom(...), dom(...) ] );
*  Arguments 2, 3 and 4 are optional
*
*  Thanks Erlend! :)
*/
function dom()
{
	var type = arguments[0];
	var arg_index = 1;
	var children;
	var options;
	var value;

	if (typeof arguments[arg_index] == 'string'
		|| typeof arguments[arg_index] == 'number')
	{
		value = arguments[arg_index++];
	}

	if (Array.prototype.isPrototypeOf(arguments[arg_index]))
	{
		children = arguments[arg_index++];
	}
	else
	{
		options = arguments[arg_index++] || {};
		children = arguments[arg_index++] || [];
	}

	var node = document.createElement(type);

	for (option in options)
	{
		node[option] = options[option];
	}

	for (var i=0; i < children.length; i++)
	{
		node.appendChild(children[i]);
	}

	if (typeof value != 'undefined')
	{
		node.innerHTML = value;
	}

	return node;
}

function getLinkFor(file)
{
	if (file)
	{
		link = document.createElement('a');
		link.href = "file://" + (file.indexOf('\\') == 0 ? GM_getValue("pdf_root", "") + file : file);
		return link;
	}

	return null;
}

/*
* Creates a PDF link if any reference exists
**/
function addLocalPDFLink()
{
	form = document.forms.namedItem("personal_pdf_upload");
	if (!form) return;

	article_id = form.elements.namedItem("article_id").value;
	file = GM_getValue(article_id, 0);

	if (file)
	{
		// Delete old links
		var oldLinkList = document.getElementById("pdf_link_list")
		if (oldLinkList) oldLinkList.parentNode.removeChild(oldLinkList);
		var oldDeleteLink = document.getElementById("delete_link")
		if (oldDeleteLink) oldDeleteLink.parentNode.removeChild(oldDeleteLink);

		link = getLinkFor(file);
		link.innerHTML = (file.indexOf('\\') == 0 ? "Library: " : "" ) + file;
		referenceList = dom('ul', {id : "pdf_link_list"},
			[
				dom('li', {id : "pdf_link"},
				[
					dom('span', {className : "black"}, [link])
				])
			]);

		form.appendChild(referenceList);

		var a;
		var div = dom('div', {align : "right", id : "delete_link"},
			[
				a = dom('a', "[delete]", {href : "javascript:;"})
			]);

		a.addEventListener("click", function()
		{
			if (confirm("Are you sure you want to delete the PDF reference?"))
			{
				GM_setValue(article_id,0);
				a.parentNode.removeChild(a);
				referenceList.parentNode.removeChild(referenceList);
			}
		}, true);

		form.appendChild(div);
	}

}

/*
* Changes the submit button to make local references instead of file upload
**/
function changeSubmitButton()
{
	allSubmitButtons = document.evaluate(
	    "//form[@action='/personal_pdf_upload']//input[@type='submit']",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);

	submitButton = allSubmitButtons.snapshotItem(0);


	if (submitButton)
	{
		// Change into a reference button
		submitButton.parentNode.name = "personal_pdf_upload";

		submitButton.type = "button";
		submitButton.value = "Create Reference";
		submitButton.addEventListener("click", function()
		{
			form = document.forms.namedItem("personal_pdf_upload");
			localFile = form.elements.namedItem("file").value;
			article_id = form.elements.namedItem("article_id").value;

			if (localFile)
			{
				// Convert all links inside the "library" to relative links
				index = localFile.indexOf(GM_getValue("pdf_root"));
				if (index > -1)
				{
					var rootPath = GM_getValue("pdf_root","");
					localFile = localFile.substring(rootPath.length);
				}

				GM_setValue(article_id, localFile);

				// Add the link straight away
				addLocalPDFLink();
			}



		}, true);
	}
}

/*
* Add links to referenced PDFs on all index pages
**/
function addIndexPDFLinks()
{
	allArticleLinks = document.evaluate(
	    "//td//ul//li//a[@class='title']",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);

	for (var i = 0; i < allArticleLinks.snapshotLength; i++)
	{
	    currentLink = allArticleLinks.snapshotItem(i);
	    articleNumber = currentLink.href.substring(currentLink.href.lastIndexOf('/') + 1);

	    localFile = GM_getValue(articleNumber, 0);

		if (localFile)
		{
			link = getLinkFor(localFile);
			link.innerHTML = '<img border="0" alt="PDF" src="http://static.citeulike.org/img/pdf.gif"/>';
			currentLink.parentNode.insertBefore(link, currentLink.parentNode.firstChild);
		}
	}
}



// "main" :)
changeSubmitButton();
addLocalPDFLink();
addIndexPDFLinks();



