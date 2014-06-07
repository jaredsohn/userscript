// ==UserScript==
// @name           Bloglines Beta - Sort Save to Folder options
// @namespace      http://www.hiddenisland.plus.com/bloglines/
// @description    Sort Save to folder options
// @include        http://beta.bloglines.com/b/view*
// ==/UserScript==


// function adapted from: http://www.delphifaq.com/faq/javascript/f1038.shtml
// Ignores the first and last options
function sortSelectOption(lb)
{
	arrTexts = new Array();
	arrValues = new Array();
	arrOldTexts = new Array();
	
	for(i=1; i<lb.length-1; i++)
	{
		arrTexts[i-1] = lb.options[i].text;
		arrValues[i-1] = lb.options[i].value;
	
		arrOldTexts[i-1] = lb.options[i].text;
	}
	
	arrTexts.sort();
	
	for(i=0; i<lb.length-2; i++)
	{
		lb.options[i+1].text = arrTexts[i];
		for(j=0; j<lb.length-2; j++)
		{
			if (arrTexts[i] == arrOldTexts[j])
			{
				lb.options[i+1].value = arrValues[j];
				j = lb.length;
			}
		}
	}
}


// function adapted from: http://stackoverflow.com/questions/282670/easiest-way-to-sort-dom-nodes
function sortList (id){
	var list = document.getElementById(id);

//	var d = new Date();
//	GM_log( "List Node: " + d.toString() + " " + list.nodeName + " "+ list.id + " " + list.className );
	
	
	var items = list.childNodes;
	var itemsArr = [];
	for (var i in items) {
	    if (items[i].nodeType == 1) { // get rid of the whitespace text nodes
	        if ('My Default Saved' != items[i].firstChild.firstChild.firstChild.firstChild.innerHTML)
	        	itemsArr.push(items[i]);
	    }
	}
	
	itemsArr.sort(function(a, b) {
//	var d = new Date();
//	GM_log( "Compare: " + d.toString() + " " + a.firstChild.firstChild.firstChild.firstChild.innerHTML + " " + b.firstChild.firstChild.firstChild.firstChild.innerHTML );

	  return (	a.firstChild.firstChild.firstChild.firstChild.innerHTML
	  		 >	b.firstChild.firstChild.firstChild.firstChild.innerHTML ? 1 : -1
	  		 );
	});
	
	for (i = 0; i < itemsArr.length; ++i) {
	  list.appendChild(itemsArr[i]);
	}
}


function sortFolderOptions(ev){
	var relnode = ev.relatedNode;
	if ('DIV' == relnode.nodeName && ('' == relnode.id || relnode.id.substring(0,8) == 'fullview' )){
		var FolderOptions = document.getElementsByClassName("saveFolderOption");
		for (var i = 0; i < FolderOptions.length; i++) {
			sortSelectOption(FolderOptions[i])
		}
	} else if	(	'DIV'	== relnode.nodeName
				&&	'saves'	== relnode.id
				&&	'tree'	== relnode.className
				) {
//		var d = new Date();
//		GM_log( "Node: " + d.toString() + " " + relnode.nodeName + " "+ relnode.id + " " + relnode.className );
		sortList('savesuroot');
	} else {
//		var d = new Date();
//		GM_log( "Ignored Node: " + d.toString() + " " + relnode.nodeName + " "+ relnode.id + " " + relnode.className );
	}
}

document.body.addEventListener("DOMNodeInserted", sortFolderOptions, false);