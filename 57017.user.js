// ==UserScript==
// @name           FurAffinity Comment Fixer
// @namespace      fa_comment_fixer
// @description    Breaks up long lines to prevent FA comment vandalism.
// @include        http://www.furaffinity.net/*
// @include        http://www.furaffinity.net/view/*
// @include        http://www.furaffinity.net/full/*
// @include        http://www.furaffinity.net/journal/*
// ==/UserScript==

// Known issue: URLs, especially in form of HTML links, are likely to break
// the fifty-character limit, and I haven't worked out to my satisfaction how
// to exclude them.  

function fixFAComments(max_length) {
	var comments = new Array();
	// First we find all of the comments on the page by class.
	var els = document.getElementsByTagName('td');
	var pattern = new RegExp("(^|\\s)replyto-message(\\s|$)");
	for (i = 0, j = 0; i < els.length; i++) {
		if ( pattern.test(els[i].className) ) {
			comments[j] = els[i];
			j++;
		};
	};
	var i = 0;
	// Next, we run through each comment and check the length of each word...
	while(i < comments.length) {
		var str_words = comments[i].innerHTML.split(' ');
		var index = 0;
		while(index < str_words.length) {
			// If the word is longer then the specified length, chop it!
			if (str_words[index].length > max_length) {
				if (str_words[index].match(eval('/[^>^<\S^=]{'+max_length+',}/'))) {
					if (! Boolean(index)) {comments[i].innerHTML ='';};
					tmp_words = '';
					tmp_compare = str_words[index];
					// Keep chopping until we're under the limit.
					while (max_length < tmp_compare.length) {
						tmp_words = tmp_words + tmp_compare.substr(0,max_length) + ' ';
						tmp_compare = tmp_compare.substr(max_length);
					};
					str_words[index] = tmp_words + tmp_compare;
					// Finally, we add the HTML back into the comment, word by word.
					comments[i].innerHTML = comments[i].innerHTML + str_words[index] + ' ';
				};
			};
			index++;
		};
		i++;
	};
};

// Allow the user to determine how long a word has to be before it's considered abusive.
GM_registerMenuCommand('Alter Abusive Comment Length', alter_length);
function alter_length () {
	new_length = prompt('How long do you want a word to be before this script tries to split it?', 50);
	new_length = parseInt(new_length);
	if (isNaN(new_length)) {
		alert('Please enter a number.');
		alter_length();
	}
	else if (new_length > 1024) {
		alert('Please enter a smaller number.');
		alter_length();
	}
	else if (new_length < 40) {
		var serious = confirm('That setting is very likely to cause problems.  Try it anyhow?');
		if (serious) {
			GM_setValue('offensive', new_length);
		}
		else {
			alter_length();
		};
	}
	else {
		GM_setValue('offensive', new_length);
	};
};

// If the user never touches alter_length, use 50. 
fixFAComments(GM_getValue('offensive', 50));