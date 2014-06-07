// ==UserScript==
// @name          DupeHordesBegone
// @namespace     
// @description   further enhancements for Kuro5hin.org
// @include       http://www.kuro5hin.org/*
// @authors Horny Smurf and Corey Haim aka Zombie Corey Haim
// ==/UserScript==




var ShitList = new Object();

// start config

/*
 * set to false to also kill replies to killed comments.
 */
var Orphans = false; 


/* 
 * if you wish to ignore a user, add them, like below.
 * note this is case sensitive.
 */
 
//ShitList['rusty'] = true;
ShitList['Modus'] = true;
ShitList['Ruston Rustov'] = true;
ShitList['Osm'] = true;
ShitList['Empedocles'] = true;
ShitList['Jobst of Moravia'] = true;
ShitList['Chino Ginelli'] = true;
ShitList['Zombie lonelyhobo'] = true;
ShitList['Del Griffith'] = true;
ShitList['Wain'] = true;
ShitList['lostincali'] = true;
ShitList['Balsamic vinigga'] = true;
ShitList['FattMattP'] = true;
ShitList['Nimey'] = true;
ShitList['Corey Haim'] = true;
ShitList['cockskin horsesuit'] = true;
ShitList['HollyHopDrive'] = true;
ShitList['horny smurf'] = true;
ShitList['Lady 3Jane'] = true;
ShitList['king of fools'] = true;
ShitList['limpdawg'] = true;
Shitlist['LilDebbie'] = true;
Shitlist['nateo'] = true;
Shitlist['MotorMachineMercenery'] = true;
Shitlist['channel = true;

// end config


var xmlRequest = new XMLHttpRequest();

var forms = document.forms;

var rating_re = /^rating_(\d+)$/;
var user_re = /\/user\/uid:(\d+)$/;
var diary_re = /\/user\/([a-zA-Z0-9% ]+)\/diary$/;


// check if there's anybosy on the shit list.

var DoSL = false;
for (var i in ShitList)
{
	DoSL = true;
	break;
}

//utility functions to make life easier.


// creates a new option element.  
// GreaseMonkey doesn't support new Option() / select.add()
function newOption(name, value)
{
	var x = document.createElement('option');
	x.value = value;
	x.appendChild(document.createTextNode(name));
	return x;	
}

// find a specific parent element for a tag.
// k5 is chock full of nested tables and such.
function outerElement(node, tag, count)
{
	if (count == 0) return null;
	if (node == null) return null;
		
	if (node.nodeType == 1 && node.tagName == tag)
	{
		if (--count == 0) return node;	
	}	

	node = node.parentNode;
	
	return node ? outerElement(node, tag, count) : null;
	
}

// returns the first element or null if none.
//
function firstChildElement(node)
{
	if (node == null) return null;
	node = node.firstChild;
	while (node)
	{
		if (node.nodeType == 1) return node;
	}
	return null;
}

// gets the next element (tag), ignoring text, cdata, comments, etc.
function nextElement(element)
{
	while (element = element.nextSibling)
	{
		if (element.nodeType == 1) return element;
	}
	return null;
}
// gets the previous element (tag), ignoring text, cdata, comments, etc.
function previousElement(element)
{
	while (element = element.previousSibling)
	{
		if (element.nodeType == 1) return element;
	}
	return null;
}


// copys elements from a NodeList (which is live) to an array (which is not)
function nodeArray(nodeList)
{
	var array = new Array(nodeList.length);
	for (var i = 0; i < nodeList.length; i++)
		array[i] = nodeList[i];
	return array;
}

// onclick, onsubmit callbacks.

// replacement comment rater.  This uses xmlhttprequest and is done asynchronously.
function rateComments(event)
{
			
	event.preventDefault();
	var form = event.target;
	var post = '';
	var inc = new Object();
	// build up the post data.
	for (var j = 0; j < form.elements.length; j++)
	{
		var e = form.elements[j];
		if (e.name != '')
		{
			if (inc[e.name]) continue;
			inc[e.name] = true;
			post = post + '&' + encodeURIComponent(e.name) 
				+ '=' + encodeURIComponent(e.value);
		}
	}
	post = post.substr(1);
	//alert(post);
	
	xmlRequest.open('POST', form.action, true);
	xmlRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	
	xmlRequest.onreadystatechange = function()
	{
		if (xmlRequest.readyState == 4)
		{
			//alert('done');
		}
	}
	xmlRequest.send(post);
}

// set all comment ratings to the specified rating.
function bitchSlap(event)
{

	event.preventDefault();
	var form = event.target.form;
	var value = document.getElementById('__select').value;

	for (var j = 0; j < form.elements.length; j++)
	{
		var e = form.elements[j];
		
		if (e.type == 'select-one')
		{
			if (e.name.match(rating_re))
			{
				e.value = value;
			}	
		}	
		
	}
}

// show/hide comment replies.  replies are placed in a <dl><dt> after the comment.
function showHide(event)
{
	event.preventDefault();						
	var target = event.target;
	var hide = target.firstChild.data == 'Hide Replies';
	
	target.firstChild.data = hide ? 'Show Replies' : 'Hide Replies';
		
	var comment = outerElement(target, 'TABLE', 2);
	if (comment)
	{
		comment = nextElement(comment);

		if (comment.tagName == 'DL' || comment.tagName == 'dl')
		{
			
			comment.style.visibility = hide ? 'collapse' : 'visible';	
			
		}	
		
	}	
}


// remove comments from people on the shitlist.
function killComments(form)
{
	var delta = false;
	
	var links = nodeArray(form.getElementsByTagName('a'));
	for (var j = 0; j < links.length; j++)
	{
		var link = links[j];
		//if (link.href.indexOf('uid') != -1) 
		//	alert(link.href + ' ' + link.firstChild.data);
		if (!link.href.match(user_re)) continue;
		
		var user = link.firstChild.data;
		if (!ShitList[user]) continue;
		var comment = outerElement(link, 'TABLE', 3);
		if (comment)
		{
			if (Orphans  == false)
			{
				var temp = nextElement(comment);
				if (temp && temp.tagName == 'DL')
				temp.parentNode.removeChild(temp);	
			}
			
			comment.parentNode.removeChild(comment);
			delta = true;
		}
		
	}
	// disabling this block for now, because it's broken and
	// breaks firefox and things work fine without it and
	// it's a saturday and i don't get paid for this
	if (false)
	{
		// now go through and kill any blank indentatons 
		// (<dl><dt></dt><dd></dd></dl>)
		var dls = nodeArray(form.getElementsByTagName('dl'));
		for (var j = 0; j < dls.length; j++)
		{
			var dl = dls[j];
			var kill = true;
			var x = dl.firstChild;
			while(x && kill)
			{
				if (firstChildElement(x)) kill = false;
				x = x.nextSibling();	
			}
			if (kill)
			{
				dl.parentNode.removeChild(dl);
			}		
		}
		
	}
}

// remove diary entries from people on the shitlist
function killDiaryEntries()
{
	var diarySectionNode = document.body.childNodes[20].childNodes[1].childNodes[0].childNodes[3]

	var links = nodeArray(diarySectionNode.getElementsByTagName('a'));
	for (var j = 0; j < links.length; j++)
	{
		var match;
		var link = links[j];
		if (match = link.href.match(diary_re))
		{
			var name = match[1];
			// convert %20 to ' '
			name = decodeURIComponent(name);
			if (!ShitList[name]) continue;
			var p = outerElement(link, 'TABLE', 1);
			if (p) p.parentNode.removeChild(p);
			
		}
	}
}


// remove diary sidebar entries from people on the shitlist
function killDiarySidebars()
{
	var diarySidebarNode = document.body.childNodes[20].childNodes[1].childNodes[0].childNodes[1]

	var links = nodeArray(diarySidebarNode.getElementsByTagName('a'));
	for (var j = 0; j < links.length; j++)
	{
		var match;
		var link = links[j];
		if (match = link.href.match(diary_re))
		{
			var name = match[1];
			// convert %20 to ' '
			name = decodeURIComponent(name);
			if (!ShitList[name]) continue;

			var outer = link.parentNode.parentNode;
			if (outer.nodeType == 1 && outer.tagName == 'FONT')
			{
				// the first diary in the bar requires some extra fiddling
				// it doesn't have a parent paragraph we can easily nuke
				// we remove 7 nodes because whitespace creates nodes...
				// without this code, the whole sidebar disappears when a shitlister's diary is 

first
				for (var i = 0; i < 7; i++)	
					outer.removeChild(outer.childNodes[0]);
			}
			else
			{
				var p = outerElement(link, 'P', 1);
				if (p) p.parentNode.removeChild(p);
			}
		}
	}
}

// add a link to show/hide child comments.
function addShowHide(form)
{
	// I wanted to base this on the "rate" button, but that fails
	// for your own comments.... sigh...
	
	var links = nodeArray(form.getElementsByTagName('a'));	
	
	for (var j = 0; j < links.length; j++)
	{
		var link = links[j];
		if (link.href.indexOf('/post#here') == -1) continue;
		
		var comment = outerElement(link, 'TABLE', 2);		
		// check for any replies...

		var temp = nextElement(comment);
		if (temp && temp.tagName == 'DL')
		{			
			var parent = link.parentNode;
			
			parent.insertBefore(document.createTextNode(' '), link);
			var newlink = parent.insertBefore(document.createElement('a'), link);
			newlink.href = '#';
			newlink.appendChild(document.createTextNode('Hide Replies'));
			newlink.addEventListener('click', showHide, true);	
			
			parent.insertBefore(document.createTextNode(' | '), link);

								
		}	
	}
		
}


if (window.location.href.indexOf('/story/') > 0 
	|| window.location.href.indexOf('/comments/') > 0 )
{
		
	for (var i = 0; i < forms.length; i++)
	{
		var form = forms[i];
		if (form.name == 'rate')
		{
			// 1. posting will be done via xmlhttprequest.
			
			form.addEventListener('submit', rateComments, true);
			
			// 4 kills comments from users on the shit list.
			// this will not kill any replies, however, 
			// which it probably should do as well.
			
			if (DoSL) killComments(form);
			
			
			// - - - - - - - - 
			
			// 2a add a reset button
			// 2b. add dhtml button to rate all comments.
			
			var div = document.createElement('div');
			var x;
	
			div.style.textAlign = 'center';
			form.insertBefore(div, form.firstChild);
			x = div.appendChild(document.createElement('input'));
			x.type = 'reset';
			x.value = 'Reset Ratings';
			
			div.appendChild(document.createTextNode(' '));
			
			x = div.appendChild(document.createElement('select'));
			x.id = '__select';
			
			// greasemonkey can't use the select.add() method.
						
			x.appendChild(newOption('None', 'none'));
			x.appendChild(newOption('Hide', 0));
			x.appendChild(newOption('Discourage', 1));
			x.appendChild(newOption('Neutral', 2));
			x.appendChild(newOption('Encourage', 3));
			
			div.appendChild(document.createTextNode(' '));
	
			x = div.appendChild(document.createElement('input'));
			x.type = 'button';
			x.value = 'Set Ratings';
			
			x.addEventListener('click', bitchSlap, true);
			
			// - - - - - - - - 

			// 3. add show/hide replies link
			addShowHide(form);
			
			
		}
		
	}
}// /story/ page
else
{
	// kill off diary pages from people in the shitlist
	if (DoSL)
	    if (window.location.href.indexOf('/section/') > 0)
			killDiaryEntries();
	killDiarySidebars();
	
}

// fix up indentation a bit.
GM_addStyle('dd { padding-left: 0px; margin-left: 0px;}');
GM_addStyle('dl { padding-left: 1.5em; margin-left: 0px;}');