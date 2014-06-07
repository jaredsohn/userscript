// ==UserScript==
// @name Killfile for message boards powered by PunBB engine.
// @author Minio
// @version 0.5
// @include *
// ==/UserScript==

(function ()
{
	// Don't mind this little snippet of code, just proceed to configuration section
	if (! document.getElementById('punwrap'))
		return true;

	var killfile = [];

	killfile.add = function() {
		var hostname = arguments[0];
		var trolls = [];
		for (var i=1; i<arguments.length; i++) {
			trolls.push(arguments[i]);
		}
		killfile.push([hostname, trolls]);
	}

	//--------------------------------------------------
	// CONFIGURATION
	//-------------------------------------------------- 

	//--------------------------------------------------
	// Set your language here. Please note that currently only pl and en are supported, with falling back to en when any other is specified.
	// You can easly add your language. Just search for 'XX' string, which you'll find few lines below, edit it and uncomment.
	//-------------------------------------------------- 

	var lang = 'pl';

	//--------------------------------------------------
	// Let's plonk some lusers. Use schema like this:
	//
	// killfile.add('example.org', 'user1', 'user2', 'user with spaces in username');
	//
	// You may specify multiple hosts, using one killfile.add line for each.
	// Don't forget to put semicolon on end of each line.
	//-------------------------------------------------- 


	//--------------------------------------------------
	// Don't change anything below this line unless you know what you're doing
	//-------------------------------------------------- 

	var show_msg;
	var hide_msg;

	switch (lang) {
		case 'pl' :
			show_msg = 'Pokaż post splonkowanego użyszkodnika';
			hide_msg = 'Ukryj';
			break;
		/* case 'XX' :
			show_msg = 'enter your description here';
			hide_msg = 'enter your description here';
			break; */
		default :
			show_msg = 'Show post of plonked luser';
			hide_msg = 'Hide';
	}

	var trolls;

	for (var i = 0; killfile.length; i++) {
		if (window.location.toString().indexOf(killfile[i][0]) != -1) {
			trolls = killfile[i][1];
			break;
		}
	}

	var styles = 'cursor: pointer; display: block; margin: 0.5em; padding-left: 4em; width: 100%;';

	function punBBplonk() {
		var posts = document.getElementsByClassName('box');

		for (var i=0; i<posts.length; i++) {
			if (! posts[i].querySelector('.postleft')) continue;

			var username = posts[i].querySelector('.postleft dt a') ? 
				posts[i].querySelector('.postleft dt a').firstChild.nodeValue :
				posts[i].querySelector('.postleft dt strong').firstChild.nodeValue;

			if (trolls.indexOf(username) != -1) {
				if (document.getElementById('postreview')) {
					posts[i].style.display = 'none';
					continue;
				}

				var post = posts[i].querySelector('.inbox');

				var show = document.createElement('span');
				show.appendChild(document.createTextNode(show_msg + ' ('+username+').'));
				show.setAttribute('style', styles);
				show.addEventListener('click', function() {
						this.nextSibling.style.display = 'block';
						this.style.display = 'none';
				}, false);

				var hide = document.createElement('a');
				hide.appendChild(document.createTextNode(hide_msg));
				hide.style.cursor = 'pointer';
				hide.addEventListener('click', function() {
						var thisPost = this.parentNode.parentNode.parentNode.parentNode;
						thisPost.style.display = 'none';
						thisPost.previousSibling.style.display = 'block';
				}, false);

				var pftr = post.querySelector('.postfootright');
				// If user is not logged in
				if (pftr.getElementsByTagName('*')[0].nodeName.toUpperCase() == 'DIV') {
					hide.style.paddingRight = '6px';
					pftr.firstChild.appendChild(document.createElement('span'));
					pftr.querySelector('span').appendChild(hide);
				} else {
					var li = document.createElement('li');
					li.appendChild(hide);
					li.appendChild(document.createTextNode(' | '));
					pftr.querySelector('ul').insertBefore(li, pftr.querySelector('li'));
				}

				post.style.display = 'none';
				post.parentNode.insertBefore(show, post);
			}
		}
	}

	punBBplonk();
})();
