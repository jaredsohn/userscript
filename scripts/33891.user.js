// ==UserScript==
// @name           Stack Overflow: New Votes
// @namespace      GM_stackoverflow_new_votes
// @description    In your profile page, show the amount of new votes for each question/answer since you last logged in
// @include        http://stackoverflow.com/users/*/*
// ==/UserScript==

	// Check if jQuery's loaded
	function GM_wait() {
		if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
		else { $ = unsafeWindow.jQuery; letsJQuery(); }
	}
	GM_wait();
	var GM_answers_while_editing = {processed:0};

	function letsJQuery() {
		//When viewing your user page first time count answers to your questions
		if (!GM_getValue) {
			alert('Please upgrade to the latest version of Greasemonkey.');
			return;
		}
		var url = window.location.href;

		if (url.indexOf('/users/') != -1) { //We are looking at a users page
			var my_user_id = $('#headerlinks > a:first-child').attr('href').replace(/^\/users\/(\d+)\/.*$/g,'$1');
			if (!my_user_id) return; //User nto logged in ... return.
			var previous_votes = GM_getValue('previous_votes', 0);
			previous_votes = (previous_votes==0 ? {questions:{} , answers : {} , reputation : {}} : eval (previous_votes) );
			var current_user_id = url.replace (/^.*\/users\/(\d+).*$/,'$1');
			if (current_user_id !=  my_user_id) { return ; } //Looking at someone else's page ///

			//We are looking OUR own user page!
			//Get answers
			var current_votes = {questions:{} , answers : {} , reputation : {}};

			//~ $('.betamessage-top').text ( 'Working' );
			$('#headerlinks .reputation-score').each( function() {
				var current_rep = $(this).text();
				current_votes.reputation[current_user_id] = current_rep.replace(',' ,'');
				if (typeof previous_votes.reputation[current_user_id] == 'undefined') previous_votes.reputation[current_user_id] = current_votes.reputation[current_user_id];
				var new_rep = current_votes.reputation[current_user_id] - previous_votes.reputation[current_user_id];
				new_rep = (new_rep > 0 ? '+' + new_rep : new_rep);
				if (new_rep) $(this).text('('+new_rep+') '+current_votes.reputation[current_user_id]);
				//~ $('.betamessage-top').text ( rep );
			});

			$('.question-summary').each( function() {
				//~ alert($(this).children('.votes').children('strong').text());
				var id = $(this).children('a').attr('href').replace (/^.*\/questions\/(\d+).*$/,'$1');
				current_votes.questions[id] = $(this).find('.vote-count-post').text();

				if (typeof previous_votes.questions[id] == 'undefined') previous_votes.questions[id] = 0;
				var new_votes = current_votes.questions[id] - previous_votes.questions[id];
				new_votes = (new_votes > 0 ? '+' + new_votes : new_votes);
				if (new_votes) $(this).find('.vote-count-post').text('('+new_votes+') '+current_votes.questions[id]);

			});
			$('.answer-summary').each( function() {
				//~ alert($(this).children('.votes').children('strong').text());
				var id = $(this).children('a').attr('href').replace (/^.*\/questions\/(\d+).*$/,'$1');
				current_votes.answers[id] = $(this).find('.answer-votes').text();

				if (typeof previous_votes.answers[id] == 'undefined') previous_votes.answers[id] = 0;
				var new_votes = current_votes.answers[id] - previous_votes.answers[id];
				new_votes = (new_votes > 0 ? '+' + new_votes : new_votes);
				if (new_votes) $(this).find('.answer-votes').width(50).text('('+new_votes+') '+current_votes.answers[id]);

			});
			//~ $('.betamessage-top').text ( previous_votes.toSource() + current_votes.toSource());
			GM_setValue('previous_votes', current_votes.toSource());
		}

    }
