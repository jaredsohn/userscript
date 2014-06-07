// ==UserScript==
// @name           Stack Overflow: Highlight questions with new answers
// @namespace      GM_stackoverflow_new_answers
// @description    In your profile page, highlights your questions that have new answers that you haven't read yet.
// @include        http://*.stackoverflow.com/users/*
// @include        http://*.stackoverflow.com/questions/*
// @exclude        http://beta.stackoverflow.com/questions/ask
// @exclude        http://beta.stackoverflow.com/questions/edit
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
			var first_time = GM_getValue('first_time', 1);
			var current_user_id = url.replace (/^.*\/users\/(\d+).*$/,'$1');
			if (current_user_id !=  my_user_id) { return ; } //Looking at someone else's page ///

			//We are looking OUR own user page!
			//Get answers
			var answers = new Array();

			$('.question').each( function() {
				//~ alert($(this).children('.votes').children('strong').text());
				var id = $(this).children('a').attr('href').replace (/^.*\/questions\/(\d+).*$/,'$1');
				var current_answers = $(this).find('.status').children('strong').text();
				answers[id] = current_answers;
			});

			if (first_time) { //This is the first time! fill the hasehs
				for (i in answers) {
					GM_setValue('answers_'+i, answers[i]);
				}
				GM_setValue('first_time', 0);
			} else { //Otherwise figure out which questions have new answers!
				var highlight = new Array();
				for (i in answers) {
					var answers_last_time = GM_getValue('answers_'+i, -1);
					if (answers_last_time == -1 ) {
						GM_setValue('answers_'+i, 0); //Answer was not here last time we check, consider it new with zer0 answers
					} else if (answers_last_time != answers[i]) {
						highlight[i] = answers[i] - answers_last_time;
					}
				}
				$('.question').each( function() {
					var id = $(this).children('a').attr('href').replace (/^.*\/questions\/(\d+).*$/,'$1');
					if (highlight[id] && highlight[id] > 0) {
						$(this).addClass('new-answers').css('border','1px dotted red');
						$(this).find('.status').attr('title' ,  $(this).find('.status').attr('title') + ' .New answers : '+ highlight[id]);
					}
				});
			}
		}

		//When viewing a question you posted update the number of questions to your questions
		if (url.indexOf('/questions/') != -1) { //We are looking at questions page
			var current_question = url.replace (/^.*\/questions\/(\d+).*$/,'$1');
			if (!current_question) {return;}
			var saved_num_of_answers = GM_getValue('answers_'+current_question , -1);
			if (  saved_num_of_answers != -1 ) { //TODO: Need a betterw way to detect own questions
				//hey this is our question let's update the count
				var current_num_of_answers = $('#subheader > h2').text().replace (/^(\d+) Answer.*$/,'$1');
				if (saved_num_of_answers != current_num_of_answers) {
					GM_setValue('answers_'+current_question, current_num_of_answers);
				}
			}

		}
    }
