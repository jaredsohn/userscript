// ==UserScript==
// @name        Determine when questions should be answered on BYU's hundred hour board
// @include     https://theboard.byu.edu/questions/my_questions/*
// @version     1.4
// ==/UserScript==

// load momentJS from //cdnjs.cloudflare.com/ajax/libs/moment.js/2.1.0/moment.min.js
jQuery.getScript('//cdnjs.cloudflare.com/ajax/libs/moment.js/2.1.0/moment.min.js', function(script, textStatus, jqXHR) {
	calculateTime();
	setInterval(calculateTime, 1000);
});

function getText(e) {
    var text = ''; 
    var children = e.childNodes;
    for (var i = 0; i < children.length; i++) {
        if (children[i].nodeType === 3) {
            text += children[i].innerText || children[i].textContent; 
        }
    }

    return text
    	.replace(/(\r\n|\n|\r)/gm,'') 	// remove new lines
    	.replace(/ +(?= )/g,'')			// remove multiple spaces
    	.replace(/^\s+|\s+$/g, '');		// trim
}

function calculateTime() {
	// Remove previous estimates
	$('.submission_info.estimate').remove();

    var timestamps = $('.submission_info');
	for (var i = 0; i < timestamps.length; i++) { 
		var text = getText(timestamps[i]);
		var unansweredText = 'Question asked on ';

		// Is a question that hasn't been answered yet
		if (text.indexOf(unansweredText) !== -1) {
			var timestamp = text.replace(unansweredText, '');
			
			var oneHundredHoursLater = moment(timestamp, 'MM/DD/YYYY hh:mm a').add({hours:100});
			var interval = oneHundredHoursLater.fromNow();

			var html = '<span class="submission_info estimate">Should be answered on ' + 
							oneHundredHoursLater.format('MM/DD/YYYY hh:mm a') + ' (' + interval + ')</span>';

			$(timestamps[i]).after(html);
		}
	}
}