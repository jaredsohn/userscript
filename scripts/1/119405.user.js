// ==UserScript==
// @name           uploads2plaintext
// @namespace      http://userscripts.org/scripts/edit/119405
// @description    Clean uploads page to plaintext for pasting in contests
//
// @version		0.03
// @include     http*passthepopcorn.me/torrents.php?type=uploaded*
// @include     http*passthepopcorn.me/torrents.php?page=*type=uploaded*
// ==/UserScript==
/*---------------------Version History--------------------
0.03	-	Added checkboxes, list of torrents now just link (new site parse code)
0.02 	-	Chameleon revision
0.01	-	First version
--------------------------------------------------------*/

//------------------------------------------------------------
// Button Code
//-------------------------------------------------------------
// -Chameleon- A useful function, but not one that I ended up using
/*// utility fn for button insertion into DOM
function insertAfter(newElement, targetElement) {
    //target is what you want it to go after. Look for this elements parent.
    var parent = targetElement.parentNode;

    //if the parents lastchild is the targetElement...
    if (parent.lastchild == targetElement) {
        //add the newElement after the target element.
        parent.appendChild(newElement);
    } else {
        // else the target has siblings, insert the new element between the target and it's next sibling.
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}*/

// -Chameleon- Adding elements is fairly trivial, do it in the main code
/*function display_button() {

    var btn = document.createElement('div');
    btn.id = "button";
    // insert new div into DOM
    insertAfter(btn, document.getElementById('content'));
    // insert anchor
    var anchor = document.createElement('a')
    anchor.name = 'comment';
    document.getElementById('content').parentNode.insertBefore(anchor, document.getElementById('content'))
    btn.innerHTML = '<input id="greasemonkeyButton" value="make text!" type="button" onclick="alert()">';

    addButtonListener();
}*/

// -Chameleon- This can be done immediately after creating the button
/*//runs something when button is clicked
function addButtonListener() {
    var button = document.getElementById("greasemonkeyButton");
    button.addEventListener('click', helperMethod, true);
}*/

// -Chameleon- Add the results to the bottom of the content div instead of in a new window
/*function writeConsole(content) {
 top.consoleRef=window.open('','myconsole',
  'width=350,height=250'
   +',menubar=0'
   +',toolbar=1'
   +',status=0'
   +',scrollbars=1'
   +',resizable=1')
 top.consoleRef.document.writeln(
  '<html><head><title>Console</title></head>'
   +'<body bgcolor=white onLoad="self.focus()">'
   +content
   +'</body></html>'
	)
	/*top.consoleRef.document.writeln(title)
	top.consoleRef.document.writeln("<br>IMDb: " + imdb)
	top.consoleRef.document.writeln("<br>https:\/\/tls.passthepopcorn.me/"+link)
	top.consoleRef.document.writeln(
   '<br><br></body></html>'
 )*//*
 top.consoleRef.document.close()
}*/

// -Chameleon- Use the 'bind' prototype to do exactly this, a great little snippet (forgot where I grabbed it from)
//because I don't know how to pass a parameter with an action listener
/*function helperMethod() {
writeConsole(display);
}*/

// -Chameleon- As I pulled out most of your functions, I'll pretty much rewrite this next section too
/*//var text = 'squirrel';//the text being printed
GM_addStyle('#button {position: fixed; bottom: 10px; right: 10px; z-index: 1000;}');
display_button();

snippet = document.getElementById("content");
snippetText = snippet.innerHTML;
index = snippetText.indexOf("<table class=\"torrent_table grouping\" id=\"torrent_table\">");
snippetText = snippetText.slice(index);
	
var i=0;
display=""
for(i=0; i<50; i++)
	{
	
	index = snippetText.indexOf("</tr>");
	snippetText = snippetText.slice(index);

	//link = 
	begin = snippetText.indexOf("id")+18;
	end = snippetText.indexOf("rowspan")-2;
	group = snippetText.substring(begin,end);
	snippetText = snippetText.slice(end);

	begin = snippetText.indexOf("title=")+7;
	end = snippetText.indexOf("width=")-2;
	title = snippetText.substring(begin,end);
	snippetText = snippetText.slice(end);

	begin = snippetText.indexOf("imdbrating")+12;
	end = snippetText.indexOf("</span></div>");
	imdb = snippetText.substring(begin,end);
	snippetText = snippetText.slice(end);

	begin = snippetText.indexOf("\u003Ca href=\"torrents.php?id")+11;
	tempText = snippetText.slice(begin);
	begin = snippetText.indexOf("\u003Ca href=\"torrents.php?id")+9;
	tempText = snippetText.slice(begin);
	end = tempText.indexOf("\u003E")-1;
	link = snippetText.substring(begin,begin+end);
	snippetText = snippetText.slice(begin+end);
	
	display += title+"<br>"+"IMDb: "+imdb+"<br>"+"https:\/\/tls.passthepopcorn.me/"+link+"<br><br>";
}
//display = group + "\n" + title + "\r\nIMDb: " + imdb + " " + link;



var location = window.location;
*/

// -Chameleon- My rewrite of the code
// Create a new div to put the results in and append it to the content div
results_div = document.createElement('div');
results_div.setAttribute('class', 'box');
content_div = document.getElementById('content');
content_div.appendChild(results_div);

// Create the button
make_text_button = document.createElement('input');
// You can set the type several different ways, setAttribute works for any attribute
make_text_button.setAttribute('type', 'button');
make_text_button.value = 'Make text!';
// Using the bind prototype
make_text_button.addEventListener('click', make_text.bind( {}, results_div ), false);

// The 'Search torrents' button has a parent div with the class of 'submit', use that to add the button
submit_div = document.getElementsByClassName('submit')[0];
submit_div.appendChild(make_text_button);

// The base url
var base_url = document.URL.split('passthepopcorn.me/')[0];
base_url = base_url+'passthepopcorn.me/';

var parse_next = false;
test = document.URL.split('parse_next=');
if(test.length > 1)
{
	if(test[1] == 1)
	{
		parse_next = true;
	}
}

test = document.URL.split('make_text=');
if(test.length > 1)
{
	test = test[1].split('&');
	if(test.length > 1)
	{
		if(test[0] == 1)
		{
			make_text(results_div);
		}
	}
}

// Do all of the processing after the button is clicked
function make_text(results_div)
{
	if(parse_next)
	{
		torrents = JSON.parse(window.localStorage.getItem('temp_make_text'));
		window.localStorage.clear();
	}
	else
	{
		torrents = {group_id:[], torrent_id:[], in_contest:[], bonus_points:[], imdb:[]};
	}
	if(!torrents)
	{
		// Create an object that stores the details of torrents
		torrents = {group_id:[], torrent_id:[], in_contest:[], bonus_points:[], imdb:[]};
	}

	colhead_tr = document.getElementById('torrent_table').getElementsByTagName('tr')[0];

	// Add checkbox column header, toggles all checkboxes
	checkbox_td = document.createElement('td');
	colhead_tr.appendChild(checkbox_td);
	checkbox = document.createElement('input');
	checkbox_td.appendChild(checkbox);
	checkbox.setAttribute('type', 'checkbox');
	checkbox.setAttribute('class', 'make_text_checkbox');
	checkbox.setAttribute('id', 'master_make_text_checkbox');
	checkbox.setAttribute('checked', 'true');
	checkbox.addEventListener('change', checkbox_toggle_all, false);

	// Add bp column header, sets the default bp rate
	bp_td = document.createElement('td');
	colhead_tr.appendChild(bp_td);
	bp_box = document.createElement('input');
	bp_td.appendChild(bp_box);
	bp_box.setAttribute('type', 'text');
	bp_box.setAttribute('id', 'master_bp_box');
	bp_box.addEventListener('keyup', update_bps, false);
	bp_box.setAttribute('style', 'width: 4em; height: 1em;');

	// Each torrent group tr has the class 'group'
	torrent_group_trs = document.getElementsByClassName('group');

	// Now we have a length we can use
	for(i=0; i<torrent_group_trs.length; i++)
	{
		torrent_group_trs[i].getElementsByTagName('td')[2].setAttribute('colspan', '7');

		torrent_group_as = torrent_group_trs[i].getElementsByTagName('a');
		// The first link is the poster which links to the torrent group
		group_id = torrent_group_as[0].href.split('?id=')[1];
/*	We now only need the group_id and torrent_id, the site parses the links for us
		// The second link is to the title, though you could grab it from a few places
		// textContent gets the text value inside of an element
		title = torrent_group_as[1].textContent;
*/
//		And the imdb score, apparently =)
		imdb = torrent_group_trs[i].getElementsByClassName('browserating');
		// Movies with an imdb get the text, without gets a dash
		if(imdb.length > 0)
		{
			imdb = imdb[0].textContent;
		}
		else
		{
			imdb = 'IMDb: -';
		}

/*		year = torrent_group_trs[i].getElementsByTagName('td')[1].textContent.split('[')[1].split(']')[0];
		// As you have it listed
		results_div.innerHTML += title + ' ['+year+']<br />';
		results_div.innerHTML += imdb + '<br />';
*/
		
		// Each torrent in a group has the class 'groupid_<group id>'
		// To get every torrent uploaded from each group we use the group id
		torrent_trs = document.getElementsByClassName('groupid_'+group_id);
		for(j=0; j<torrent_trs.length; j++)
		{
			// The second link has the torrent id we want
			torrent_id = torrent_trs[j].getElementsByTagName('a')[1].href.split('torrentid=')[1];
			// And add it to the list of torrents
//			results_div.innerHTML += base_url+'torrents.php?id='+group_id+'&torrentid='+torrent_id+'<br />';
			torrents.group_id.push(group_id);
			torrents.torrent_id.push(torrent_id);
			torrents.in_contest.push(true);
			torrents.bonus_points.push(0);
			torrents.imdb.push(imdb);

			// Add checkbox, which adds or removes the movie from the list
			checkbox_td = document.createElement('td');
			torrent_trs[j].appendChild(checkbox_td);
			checkbox = document.createElement('input');
			checkbox_td.appendChild(checkbox);
			checkbox.setAttribute('type', 'checkbox');
			checkbox.setAttribute('class', 'make_text_checkbox');
			checkbox.setAttribute('id', 'make_text_checkbox_'+torrent_id);
			checkbox.setAttribute('torrent_id', torrent_id);
			checkbox.setAttribute('checked', 'true');
			checkbox.addEventListener('change', checkbox_toggle.bind( {}, torrent_id, torrents, results_div), false);

			// Add bp box, sets the bp for this torrent
			bp_td = document.createElement('td');
			torrent_trs[j].appendChild(bp_td);
			bp_box = document.createElement('input');
			bp_td.appendChild(bp_box);
			bp_box.setAttribute('type', 'text');
			bp_box.setAttribute('class', 'make_text_bp_box');
			bp_box.setAttribute('id', 'make_text_bp_box_'+torrent_id);
			bp_box.setAttribute('value', '0');
			bp_box.setAttribute('torrent_id', torrent_id);
			bp_box.setAttribute('style', 'width: 4em; height: 1em;');
			bp_box.addEventListener('keyup', update_bp.bind( {}, torrent_id, torrents, results_div), false);
		}
	}

	display_contest_entries(results_div, torrents);

	linkboxes = document.getElementsByClassName('linkbox');
	for(i=0; i<linkboxes.length; i++)
	{
		parse_next_link = document.createElement('a');
		parse_next_link.innerHTML = 'Parse next page';
		parse_next_link.href = 'javascript:void(0)';
		parse_next_link.addEventListener('click', o_parse_next.bind( {}, torrents), false);
		linkboxes[i].appendChild(document.createTextNode(' '));
		linkboxes[i].appendChild(parse_next_link);
	}
}

function o_parse_next(torrents)
{
	next_link = document.getElementsByClassName('pager_next')[0].href+'&make_text=1&parse_next=1';

	window.localStorage.setItem('temp_make_text', JSON.stringify(torrents));
	window.location = next_link;
}

function checkbox_toggle(torrent_id, torrents, results_div, event)
{
	torrent_index = torrents.torrent_id.indexOf(torrent_id);
	if(torrent_index != -1)
	{
		torrents.in_contest[torrent_index] = event.target.checked;
	}

	display_contest_entries(results_div, torrents);
}

function checkbox_toggle_all(event)
{
	checkboxes = document.getElementsByClassName('make_text_checkbox');
	for(i=0; i<checkboxes.length; i++)
	{
		checkboxes[i].checked = event.target.checked;

		torrent_index = torrents.torrent_id.indexOf(checkboxes[i].getAttribute('torrent_id'));
		if(torrent_index != -1)
		{
			torrents.in_contest[torrent_index] = event.target.checked;
		}
	}
	display_contest_entries(results_div, torrents);
}

function update_bp(torrent_id, torrents, results_div, event)
{
	torrent_index = torrents.torrent_id.indexOf(torrent_id);
	if(torrent_index != -1)
	{
		torrents.bonus_points[torrent_index] = event.target.value;
	}
	display_contest_entries(results_div, torrents);
}

function update_bps(event)
{
	bp_boxes = document.getElementsByClassName('make_text_bp_box');
	for(i=0; i<bp_boxes.length; i++)
	{
		bp_boxes[i].value = event.target.value;

		torrent_index = torrents.torrent_id.indexOf(bp_boxes[i].getAttribute('torrent_id'));
		if(torrent_index != -1)
		{
			torrents.bonus_points[torrent_index] = event.target.value;
		}
	}
	display_contest_entries(results_div, torrents);
}

function display_contest_entries(results_div, torrents)
{
	// Clear the results div each time they're shown
	results_div.innerHTML = '';

	BP = [];
	bp_groups = [];

	for(i=0; i<torrents.torrent_id.length; i++)
	{
		if(!torrents.in_contest[i]) continue;

		BP_index = bp_groups.indexOf(torrents.bonus_points[i]);
		if(BP_index == -1)
		{
			BP.push({bp:torrents.bonus_points[i], group_text:base_url+'torrents.php?id='+torrents.group_id[i]+'&torrentid='+torrents.torrent_id[i]+'<br />'+torrents.imdb[i]+'<br /><br />', count:1});
			bp_groups.push(torrents.bonus_points[i]);
		}
		else
		{
			BP[BP_index].group_text += base_url+'torrents.php?id='+torrents.group_id[i]+'&torrentid='+torrents.torrent_id[i]+'<br />'+torrents.imdb[i]+'<br /><br />';
			BP[BP_index].count++;
		}
	}

	BP.sort(bp_compare);

	total = 0;
	for(i=0; i<BP.length; i++)
	{
		total += BP[i].count*BP[i].bp;
		results_div.innerHTML += BP[i].group_text+''+addCommas(BP[i].count)+' x '+addCommas(BP[i].bp)+' = '+addCommas((BP[i].count*BP[i].bp))+'BP<br /><br /><br />';
	}

	results_div.innerHTML += 'Total: '+addCommas(total)+'BP';
}

function bp_compare(a, b)
{
	return a.bp - b.bp;
}

function addCommas(nStr)
{
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}
	
// -Chameleon- The bind prototype
 // - any arguments you pass to it are listed first, then any that would normally be passed are added to the end
Function.prototype.bind = function( thisObject ) {
  var method = this;
  var oldargs = [].slice.call( arguments, 1 );
  return function () {
    var newargs = [].slice.call( arguments );
    return method.apply( thisObject, oldargs.concat( newargs ));
  };
}
