// ==UserScript==
// @name           Stack OverFlow New Answers
// @namespace      GM_stackoverflow_pat
// @description    Check answers posted to stackoverflow.com while you were composing your answer.
// @include        http://stackoverflow.com/questions/*
// @exclude        http://stackoverflow.com/questions/ask
// ==/UserScript==

	// Check if jQuery's loaded
	function GM_wait() {
		if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
		else { $ = unsafeWindow.jQuery; letsJQuery(); }
	}
	GM_wait();
	var GM_answers = {processed:0};
	function letsJQuery() {
		$('#post-form')
			.after('<div id="GM_new_answers"></div>')
			.after('<button id="GM_check_answers">Check for new answers</button>')
			.next()
			.click( function () {
				$('#GM_check_answers').html('Working ...');
				if (!GM_answers.processed) {
					var re = /(\d+)\/{0,1}$/;
					$('.post-menu a:first-child').each(function() {
						var id = re.exec ( $(this).attr('href') );
						GM_answers[id[0]]=1;
					});
					GM_answers.processed = 1;
				}

				var feed_url = $('#feed-link a').attr('href') ;
				$.get ( feed_url , function (xml) {
					$('#GM_check_answers').html('Check for new answers');
					$('#GM_new_answers').html('');
					var new_answers = 0;
					$( 'entry' , xml) .each ( function () {
						var re = /\/questions\/(\d+)\//;
						$(this).each( function () {
							var id = re.exec ( $(this).find('id').text() );
							if ( !GM_answers[id[1]]) {
								GM_answers[id[1]]=1;
								new_answers++;
								var answer = 'New answer by <strong>' + $(this).find('author').text() + '</strong>:<br><br>' + $(this).find('summary ').text();
								//~ $('#GM_new_answers').append('<div class="answer">'+$(this).text()+'</div>');
								$('.answers')
									.append('<div class="answer" style="border:1px dashed #ccc;padding:5px;margin-bottom:5px;">'+answer+'</div>');
							}
						});
					});
					$('#GM_new_answers').append('<div class="answer">New answers : '+new_answers+'</div>');

				} , 'xml');
			});
    }
