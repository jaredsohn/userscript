// ==UserScript==
// @name           Remove nuke confirmation
// @namespace      www.lionroo.dyndns.org
// @include        http://www.furaffinity.net/msg/*
// ==/UserScript==


// submissions

var buttons = document.getElementsByTagName('input');

for(var i=0; i < buttons.length; i++) {
	var button = buttons[i];

	if(button.hasAttribute('class')) {
		if(button.getAttribute('class').indexOf('remove-nuke') != -1) {
			button.setAttribute('class', 'button');
		}
	}
}

// others

if(document.location.href.indexOf('/msg/others') != -1) {

// yes, the /msg/others page finds nuke buttons by the h3 tag.
// even with the fucktardedness of that site, i cannot even begin
// to explain the logic behind this one.
//
// congratualations, Dragoneer, you're right: FA *isn't* worth 50k.
// it's not worth 50 bucks.

var nukeothers = document.getElementsByTagName('h3');

	for(var i=0; i < nukeothers.length; i++) {
		var nukeother = nukeothers[i];

		var nukechildren = nukeother.getElementsByTagName('input');
		for(var j=0;j < nukechildren.length; j++) {
			if(nukechildren[j].getAttribute('name') == "nuke-journals") {
				// nuke journals
				var newnode = document.createElement("input");

				newnode.setAttribute("type", "submit");
				newnode.setAttribute("name","nuke-journals");
				newnode.setAttribute("class", "button");
				newnode.setAttribute("value", "Nuke Journals");

				nukeother.parentNode.replaceChild(newnode, nukeother);
			}
			if(nukechildren[j].getAttribute('name') == "nuke-journal-comments") {
				// nuke journal comments
				var newnode = document.createElement("input");

				newnode.setAttribute("type", "submit");
				newnode.setAttribute("name","nuke-journal-comments");
				newnode.setAttribute("class", "button");
				newnode.setAttribute("value", "Nuke Journal Comments");

				nukeother.parentNode.replaceChild(newnode, nukeother);

			}
			if(nukechildren[j].getAttribute('name') == "nuke-submission-comments") {
				// nuke submission comments
				var newnode = document.createElement("input");

				newnode.setAttribute("type", "submit");
				newnode.setAttribute("name","nuke-submission-comments");
				newnode.setAttribute("class", "button");
				newnode.setAttribute("value", "Nuke Submission Comments");

				nukeother.parentNode.replaceChild(newnode, nukeother);

			}
			if(nukechildren[j].getAttribute('name') == "nuke-watches") {
				// nuke watches
				var newnode = document.createElement("input");

				newnode.setAttribute("type", "submit");
				newnode.setAttribute("name","nuke-watches");
				newnode.setAttribute("class", "button");
				newnode.setAttribute("value", "Nuke Watches");

				nukeother.parentNode.replaceChild(newnode, nukeother);

			}
		}

	}
}
