// ==UserScript==
// @name			LJ: Taglister
// @namespace		afuna.livejournal.com
// @description		Fetch a taglist when you're updating your journal/editing entries
// @include			http://*.livejournal.com/update.bml*
// @include			http://*.livejournal.com/editjournal.bml*
// ==/UserScript==

/**
Usage notes:	
 - now works with all journals. Thanks, ciaran_h -- you're awesome :D
 - cmd-clicking /ctrl-clicking on the tags will open the tagspage in a new tab
 - when expanded, the list shows all tags. When collapsed, it shows the top $n tags based on usage frequency, where $n is a number you define. If there are many tags tied for $nth place, it shows all of them. The top $n tags are bolded for emphasis; if you don't like it, you can get around this by setting $n to 0 or a negative number
 - there is no auto-complete, but tags that match what you type will be marked by a gray border. Also, clicking on a tag in the list should update the textbox
 -the tags list will show up in both when you update and edit. It will also automatically detect the journal you're posting to
*/

function getArg(arg)
{
	// just in case there are other arguments
	journal = document.location.search.split("&");
	for(var i = 0; i < journal.length; ++i)
	{
		if((index = journal[i].indexOf(arg) )!= -1)
		{
			return journal[i].split("=")[1];
		}			
	}
}
function getJournal()
{
	// figure out what journal you're posting to now
	var usejournal = "";
	if(document.location.href.indexOf("update.bml") != -1)
	{
		if(document.location.search.indexOf("usejournal") != -1 )
		{
			usejournal = getArg("usejournal");
		}
		else
		{
			var journal = document.getElementById("usejournal");
			if(journal) 
			{
				usejournal = journal.value == "" ?
					document.getElementById("current_username").textContent : journal.value;
			}
		}
	}
	else	// editjournal.bml
	{
		usejournal = getArg("journal");
	}

	return usejournal;
}

function createTagItem(tag)
{
	var tagItem = document.createElement("a");
	tagItem.href="http://"+usejournal+".livejournal.com/tag/"+tag[0].replace(/ /g,'+');
	tagItem.innerHTML = tag[0];
	tagItem.freq = tag[1];
	tagItem.title = "visible: "+tagItem.freq;
	tagItem.setAttribute("match", false);
	tagItem.setAttribute("selected", false);
	tagItem.id = "taglister:"+tag[0];

	// below commented out by CH as it's handled now by autoHighlight.

//	// check whether the tags are already in the textbox
//	// still not perfect: nothing for when the user manually types in tags
//	// also, might have some false positives?
//	if(tagsTextbox.value.indexOf(tag[0] + ",") != -1 )
//	{
//		tagItem.className="selected";
//	}
	
	// do the same, but triggered by a userclick
	tagItem.addEventListener("click", function(event) {
		// don't stop propagation
		// so you can use cmd+click to open the tagspage in a new tab
		//event.stopPropagation();
		event.preventDefault();							
	
		var tagText = event.originalTarget.textContent;

		// if the tag is already in the textbox, then previously-run code will have
		// set its "selected" attribute.
		var alreadySelected = event.originalTarget.getAttribute("selected");
		alreadySelected = (alreadySelected && alreadySelected == "true");
//		var selectTag = document.getElementById("taglister:"+tagText);
//		var alreadySelected = (selectTag && (selectTag.getAttribute("match")));

//		// longer and more complicated but more robust?
//		var removeTag = new RegExp("(?:[ ]*(,)[ ]*"+tagText+"[ ]*,[ ]*"	// in-between tags 
//				+ "|^"+tagText+"[ ]*,[ ]*"
//					// beginning
//				+ "|" +tagText+"[, ]*$)");					// end
//
//		var alreadySelected = removeTag.test(tagsTextbox.value);
	
		if(alreadySelected == true)
		{
			var removeTag = new RegExp("(^|, *)"+tagText+"(?:, *|$)");
			tagsTextbox.value = tagsTextbox.value.replace(removeTag, "$1");
		}
		else
		{

			// what if it's already in the text box and you reselect it by typing?
			// if you type, don't put a comma, then decide to select the next one, it should end the most recent one with a comma, then go on
			if(tagsTextbox.value.match(/(?:^|, *)$/))
			{
				// always add no matter what
				tagsTextbox.value += tagText + ", ";
			}
			else
			{
				var match = event.originalTarget.getAttribute("match");
				if(match && match == "true")
				{
					var rindex = tagsTextbox.value.lastIndexOf(",");
					rindex = (rindex > 0 ? rindex+2 : 0);
					tagsTextbox.value = tagsTextbox.value.slice(0, rindex) + tagText + ", ";
				}			
				else // never falls through here?
				{
					tagsTextbox.value += ", " + tagText + ", ";
				}
			}
		}
		
		tagsTextbox.focus();
		highlightAll();
		
	}, true);
	return tagItem; 
}					

// called whenever we toggle from all tags to frequent tags
// also called whenever we change the value of the frequency limit
function updateFrequentlyUsed(tagNodes, toggle)
{
	freqlimit = GM_getValue("mostFrequentlyUsed",5);

	// make sure that the limit is not more than your number of tags
	freqlimit = tagNodes.length < freqlimit ? tagNodes.length: freqlimit;

	if(freqlimit <= 0)			
	{
		for( var i= 0; i < tagNodes.length; ++i)
		{
			tagNodes[i].style.display = "inline";
			tagNodes[i].style.fontWeight= "normal";
		}
		return;
	}
	/* get the most frequently used tags
		will not necessarily return *freqlimit*, may return more if
		several tags are tied for *freqlimit*th place
	*/ 
	for( var i= 0; i < tagNodes.length; ++i)
	{
		if(tagNodes[i].freq >= frequenttags[freqlimit-1][1])
		{		
			if(toggle)
				tagNodes[i].style.display = "inline";
			tagNodes[i].style.fontWeight = "bold";
		}
		else
		{
			if(toggle)
				tagNodes[i].style.display = "none";
			tagNodes[i].style.fontWeight = "normal";
		}

	}
}

function setupTagstoggle()
{
	tagslisttoggle.expanded = GM_getValue("expanded", true);
	updateFrequentlyUsed(tagNodes, true);			
	if(tagslisttoggle.expanded)
	{
		tagslisttoggle.innerHTML = "<<";
		for(var i = 0; i < tagNodes.length; ++i)
		{
			tagNodes[i].style.display = "inline";
		}
	}
	else
	{
		tagslisttoggle.innerHTML = ">>";
	}
}

// tagslisttoggle - what you click on to toggle between expanded and unexpanded taglist
function toggleTagsExpansion(tagslisttoggle)
{	
	tagslisttoggle.expanded = GM_getValue("expanded", true);

	if(!tagslisttoggle.expanded)
	{
		tagslisttoggle.innerHTML = "<<";
		for(var i = 0; i < tagNodes.length; ++i)
		{
			tagNodes[i].style.display = "inline";
		}
	}
	else
	{
		tagslisttoggle.innerHTML = ">>";
		updateFrequentlyUsed(tagNodes, true);			
	}
	
	tagslisttoggle.expanded = !tagslisttoggle.expanded;
	GM_setValue("expanded", tagslisttoggle.expanded);
}

function fetchTags()
{
usejournal = getJournal();

// reset list and fetch a new one
tagslist.innerHTML ="Fetching tags...";
// don't show toggle until there are actually tags to toggle
tagslisttoggle.innerHTML = "";


GM_xmlhttpRequest({
	method: "GET",
	url: "http://"+usejournal+".livejournal.com/tag/?format=light",	  // redirect on comm
	onload: function(details) {
		// create an IFRAME to write the document into. the iframe must be added	
		var iframe = document.createElement("IFRAME");
		iframe.style.visibility = "hidden";
		iframe.style.position = "absolute";
		iframe.style.height = "0";
		if(iframe)
		{			
			document.body.appendChild(iframe);
//			iframe.contentWindow.location.href = location.baseURI+"?usescheme=global";
			
			// write the received content into the document
			iframe.contentDocument.open("text/html");
			iframe.contentDocument.write(details.responseText);
			iframe.contentDocument.close();
			// wait for the DOM to be available, then do something with the document
			iframe.contentDocument.addEventListener("DOMContentLoaded", function() {
				/* fetch the data from the tags page */
				var ljtagiterator = iframe.contentDocument.evaluate("//ul[@class='ljtaglist']/li[text()]", iframe.contentDocument, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
				ljtaglist = new Array();
				var nextobj = ljtagiterator.iterateNext();
				while (nextobj) {
					ljtaglist.push([ nextobj.childNodes[0].innerHTML, parseInt(nextobj.lastChild.nodeValue.match(/\d+/)) ]);
					nextobj = ljtagiterator.iterateNext();
				}
				
				frequenttags = ljtaglist.slice(0);
				frequenttags.sort(function(a,b) { return (b[1] - a[1]); } );
				tagNodes = new Array();
				tagslist.innerHTML = "";				
				for (var i = 0; i < ljtaglist.length; i++) {
					temp = tagNodes.push(createTagItem(ljtaglist[i]));
					tagslist.appendChild(tagNodes[temp-1]);
					tagslist.appendChild(document.createTextNode(" "));
				}

				setupTagstoggle(tagslisttoggle);
				
				freqtext.addEventListener("change", function() {
					var freqlimit = (freqtext.value != "") ? freqtext.value : 0;
					GM_setValue("mostFrequentlyUsed", freqlimit);
					if(GM_getValue("expanded"))
					{						
						updateFrequentlyUsed(tagNodes, false);
					}
					else
					{
						updateFrequentlyUsed(tagNodes, true);
					}
				}, false);		// end CHANGE

        highlightAll();
			}, false);			// end DOMCONTENTLOADED
		}
		else
		{
			tagslist.innerHTML = "Error in fetching tags.";
		}

	}
});

}


function trim (str) {
	return str.replace(/^\s+/, '').replace(/\s+$/, '');
}

// eventually do something more complicated
function match(tagName, current, tag)
{
	if(tagName == current)
	{
		tag.style.borderColor = "gray";
		tag.setAttribute("match", false);
		tag.className = "selected";
		tag.setAttribute("selected", true);
		return 1;
	}
	else
	{
		if(tagName.match("^"+current))
		{
			tag.style.borderColor = "gray";
			tag.setAttribute("match", true);
			return 1;
		}
		else
		{
			tag.style.borderColor = "transparent";
			tag.setAttribute("match", false);
			return 0;
		}
	}
}

function resetMatches()
{
	for(var i = 0; i < ljtaglist.length; ++i)
	{
		tagNodes[i].style.borderColor = "transparent";
		tagNodes[i].setAttribute("match", false);
		tagNodes[i].setAttribute("selected", false);
		tagNodes[i].className = "";
	}
}

function autoHighlight()
{
	var autocomplete = highlightAll();
	// need to finish this, but the 'autocomplete' var is now the first string matched.
}

function highlightAll()
{
	var textBoxVal = document.getElementById("prop_taglist").value;
	var tagList = textBoxVal.split(/, */);
	resetMatches();

	var offset = -1;
	if(textBoxVal.match(/(?:^|, *)$/))
	{
		offset = 0;
	}

	// first highlight all the stuff that's already there
	for(var i = 0; i < (tagList.length) + offset; i++)
	{
		var current = trim(tagList[i].toLowerCase());
		if(current.length > 0)
		{
			var tag = document.getElementById("taglister:"+current);
			if(tag)
			{
				tag.className = "selected";
				tag.setAttribute("selected", true);
			}
		}
	}

	var firstmatch = "";
	if(offset == -1)
	{
		// now do the last one, for which we need to highlight possibilities too.
		var lastone = trim(tagList[tagList.length-1].toLowerCase());
		if(lastone.length > 0 )
		{
			for(var i = 0; i < ljtaglist.length; ++i)
			{
				if((match(ljtaglist[i][0], lastone, tagNodes[i])) && (firstmatch == ""))
				{
					firstmatch = ljtaglist[i][0];
				}
			}
		}
	}
	return firstmatch;
}

// hidden option purely for myself (so I don't have to worry about syncing files)
function uglifyUpdateBml()
{
	loc = document.getElementById("prop_current_location");
	music = document.getElementById("prop_current_music");
	mood = document.getElementById("mood_preview");
	upic_sel = document.getElementById("userpic_select_wrapper");
	upic_img = document.getElementById("userpic");
	
	previewlabel = document.createElement("label");
	previewlabel.className="left";
	previewlabel.innerHTML="Preview:";
	
	loc.parentNode.removeChild(loc.parentNode.firstChild);
	loc.parentNode.replaceChild(upic_sel, loc);
	
	music.parentNode.removeChild(music.parentNode.firstChild);
	music.parentNode.replaceChild(previewlabel, music.parentNode.firstChild);
	music.parentNode.replaceChild(upic_img,music);
	upic_sel.removeChild(document.getElementById("lj_userpicselect"));
	upic_img.parentNode.appendChild(mood);
	
	mood.style.left = "0";
	mood.style.position="static";

}

if(window == top && (document.getElementById("updateForm") != null ))
{		
	if(GM_getValue("uglify", false) == true)
	{
		uglifyUpdateBml();
	}
	tagNodes = new Array();
	ljtaglist = new Array();
	/*display the tagslist as a cloud of clickable tags*/
	tagslistpkg = document.createElement("p");
	tagslistpkg.id = "tagslistpkg";
	tagslistpkg.className ="pkg";

	tagslist = document.createElement("div");
	tagslist.id = "tagslist";
	
	tagslistlabel = document.createElement("label");
	tagslistlabel.className = "left";	
	tagslistlabel.innerHTML = "Tag List:"; 
	
	freqtext = document.createElement("input");
	freqtext.size = 1;
	freqtext.value = GM_getValue("mostFrequentlyUsed", 5);
	freqtext.className = "text";
	freqtext.style.cssFloat = "none";
	
	tagslisttoggle = document.createElement("a");
	tagslisttoggle.href = "";
	tagslisttoggle.addEventListener("click", function(event) {
		event.stopPropagation();
		event.preventDefault(); 

		toggleTagsExpansion(this);
	}, false);
	tagslistlabel.appendChild(document.createElement("br"));
	toplabel = document.createElement("span");
	toplabel.innerHTML = "Top ";
	toplabel.style.fontWeight = "normal";
	toplabel.style.fontSize = "small";
	tagslistlabel.appendChild(toplabel);
	tagslistlabel.appendChild(freqtext);				
	tagslistlabel.appendChild(tagslisttoggle);
	
	tagslistpkg.appendChild(tagslistlabel);
	tagslistpkg.appendChild(tagslist);
	
	tagsTextbox = document.getElementById("prop_taglist");			
	tagsTextbox.parentNode.insertBefore(tagslistpkg, tagsTextbox.nextSibling.nextSibling);

	// force contents of (nonempty) textbox to end with a comma
	var endWithComma = new RegExp("([^, ]+)[ ]*[,]?[ ]*$");
	tagsTextbox.value = tagsTextbox.value.replace(endWithComma, "$1, ");

	tagsTextbox.addEventListener("keyup", autoHighlight, false);
	/*style it, yez?*/
	GM_addStyle("#tagslistpkg a {text-decoration: none; padding: 0px 3px; border: 1px solid transparent;} #tagslistpkg a.selected {background-color: #ffffcc;} ");
	
	// fetch the tags on load	
	fetchTags();
	
	if(document.location.href.indexOf("update.bml") != -1)
	{
		// fetch the tags if you change the journal you're posting to	
		var journalselect = document.getElementById("usejournal");
		if(journalselect)
			journalselect.addEventListener("change", fetchTags, false); 
	}

}


