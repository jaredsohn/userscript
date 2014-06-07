// ==UserScript==
// @name           XKCD Post Quote Link
// @namespace      com.scorcheduniverse
// @description    Automatically turns a quoted post into a quoted link
// @include        http://forums.xkcd.com/posting.php?mode=*
// @include        http://echochamber.me/posting.php?mode=*
// @include        http://fora.xkcd.com/posting.php?mode=*
// @include        http://www.forums.xkcd.com/posting.php?mode=*
// @include        http://www.echochamber.me/posting.php?mode=*
// @include        http://www.fora.xkcd.com/posting.php?mode=*
// ==/UserScript==


function addJQuery(callback) {
  var script1 = document.createElement("script");
  script1.textContent = addquote.toString();
  document.body.appendChild(script1);

  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// load jQuery and execute the main function
addJQuery(dostuff);

function dostuff(){
        var postId = window.location.href.match(/quote&f=\d*&p=(\d*)/i);
	var reply = $('textarea[name="message"]');
	var poster = reply.val().match(/\[quote="(?!\[url=)(.*?)"\]/i);
	if (postId[1] && poster[1]){
		var newString = '[quote="[url=http://forums.xkcd.com/viewtopic.php?p=' + postId[1] + '#p' + postId[1] + ']' + poster[1] + '[/url]"]';
		reply.val(reply.val().replace(poster[0], newString));

	}
}



/// **********************************************************************************
/// Below replicated from PHPBB javascript with minor modification to add link
/// **********************************************************************************
function addquote(post_id, username, l_wrote)
{
	var message_name = 'message_' + post_id;
	var theSelection = '';
	var divarea = false;

	if (l_wrote === undefined)
	{
		// Backwards compatibility
		l_wrote = 'wrote';
	}

	if (document.all)
	{
		divarea = document.all[message_name];
	}
	else
	{
		divarea = document.getElementById(message_name);
	}

	// Get text selection - not only the post content :(
	if (window.getSelection)
	{
		theSelection = window.getSelection().toString();
	}
	else if (document.getSelection)
	{
		theSelection = document.getSelection();
	}
	else if (document.selection)
	{
		theSelection = document.selection.createRange().text;
	}

	if (theSelection == '' || typeof theSelection == 'undefined' || theSelection == null)
	{
		if (divarea.innerHTML)
		{
			theSelection = divarea.innerHTML.replace(/<br>/ig, '\n');
			theSelection = theSelection.replace(/<br\/>/ig, '\n');
			theSelection = theSelection.replace(/&lt\;/ig, '<');
			theSelection = theSelection.replace(/&gt\;/ig, '>');
			theSelection = theSelection.replace(/&amp\;/ig, '&');
			theSelection = theSelection.replace(/&nbsp\;/ig, ' ');
		}
		else if (document.all)
		{
			theSelection = divarea.innerText;
		}
		else if (divarea.textContent)
		{
			theSelection = divarea.textContent;
		}
		else if (divarea.firstChild.nodeValue)
		{
			theSelection = divarea.firstChild.nodeValue;
		}
	}

	if (theSelection)
	{
		if (bbcodeEnabled)
		{
			var newText = '[quote="[url=http://forums.xkcd.com/viewtopic.php?p=' + post_id + '#p' + post_id + ']' + username + '[/url]"]' + theSelection + '[/quote]';
			insert_text(newText);
			
			//insert_text('[quote="' + username + '"]' + theSelection + '[/quote]');
		}
		else
		{
			insert_text(username + ' ' + l_wrote + ':' + '\n');
			var lines = split_lines(theSelection);
			for (i = 0; i < lines.length; i++)
			{
				insert_text('> ' + lines[i] + '\n');
			}
		}
	}

	return;
};