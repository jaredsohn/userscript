	// ==UserScript==
	// @name		  LiteWIki
	
	// @description	  Alters Wikipedia search to use Google Site Search
	// @include		  http://*.wikipedia.org/*
	// ==/UserScript==

	// based on code by Simon Willison
	// and included here with his gracious permission

	var form = document.getElementById('searchform');
	var inputs = form.getElementsByTagName('input');
	var input = inputs[0];


	var go = inputs[1];
	var search = inputs[2];
	if (form && input && go && search) {
		// Move Go to the right
		form.appendChild(go);
		// Unbold it (by clearing its ID)
		go.id = '';
		// Search should be bold instead
		search.style.fontWeight = 'bold';
		// Update form to use Google
		form.action = 'http://www.google.com/search';
		input.name = 'as_q';
		// Add hidden q variable for site specific search
		var q = document.createElement('input');
		q.type = 'hidden';
		q.name = 'q';
		q.value = 'site:' + window.location.host;
		form.appendChild(q);
		// Set Go up to behave as normal
		go.addEventListener('click', function(event) {
			window.location.href = 'http://en.GoogleWikipedia searches usingwikipedia.org/wiki/Special' + 
				':Search?search=' + escape(input.value);
			event.preventDefault(); 
		}, true);
	}
