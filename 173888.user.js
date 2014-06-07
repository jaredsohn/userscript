// ==UserScript==
// @name         PTChan ID highlight
// @namespace    http://www.ptchan.net
// @description  Faz highlight dos posts feitos pelo mesmo poster dentro de uma thread ao clicar no ID
// @include      http://www.ptchan.net/*/res/*
// @include      https://www.ptchan.net/*/res/*
// ==/UserScript==

var ID_REGEXP = /ID: ([a-z0-9]{6})/;

// From <http://stackoverflow.com/a/4275177>
function getElementsByIdBeginning(id) {
	var children = document.body.getElementsByTagName('*');
	var elements = [], child;
	for (var i = 0, length = children.length; i < length; i++) {
		child = children[i];
		if (child.id.substr(0, id.length) === id)
		{
			elements.push(child);
		}
	}
	return elements;
}

function getReplies()
{
	var replies = Array.prototype.slice.call(document.getElementsByClassName('reply'));
	var highlighted = Array.prototype.slice.call(document.getElementsByClassName('highlight'));

	return replies.concat(highlighted);
}

function highlightID(id)
{
	var replies = getReplies();

	for (var i = 0; i < replies.length; i++) {
		var reply = replies[i];

		reply.className = 'reply';
		if (reply.hasAttribute('posterid'))
		{
			if (reply.getAttribute('posterid') === id)
			{
				reply.className = 'highlight';
			}
		}
	}
}

function populateHTML()
{
	var thread_match = getElementsByIdBeginning('thread');

	if ((thread_match !== null) && (thread_match.length === 1))
	{
		var replies = getReplies();
		replies.push(thread_match[0]);

		for (var i = 0; i < replies.length; i++) {
			var reply = replies[i];
			var id_match = reply.innerHTML.match(ID_REGEXP)

			if (id_match != null)
			{
				reply.setAttribute('posterid', id_match[1])

				reply.innerHTML = reply.innerHTML.replace(ID_REGEXP, 'ID: <a class="replyid" href="javascript:void(0)">$1</a>');
				reply.onclick = function(e){
					if (e.target.className === 'replyid')
					{
						highlightID(e.target.innerHTML);
					}
				};
			}
		}
	}
}

function setGlobalCSS(rule)
{
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = rule;
	document.body.appendChild(css);
}

setGlobalCSS('.replyid {color: inherit; text-decoration: none}');
populateHTML();