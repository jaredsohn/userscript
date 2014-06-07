// ==UserScript==
// @name           FreeRice: Cheat the System
// @author         Nick McClendon [nickmcclendon@gmail.com]
// @description    This is the *best* auto-FreeRice script: it tricks the site into giving you the same word each time while removing the "too many requests" error; the result is a very fast and very efficient script for methodically ending world hunger.
// @include        http://www.freerice.com/index.php
// ==/UserScript==

/* Grabs the current "question" and returns the     *
 * word to solve and potential answers in an array. */
function getWords() {
	str = document.getElementsByName('INFO3')[0].value;
	str = str.split('|');
	return [ str[0], str[1], str[2], str[3], str[4] ];
}

/* The freerice script somehow works it to where you get      *
 * a word more often if you've gotten it wrong in the past.   *
 * So what do we do? Trick it into giving you the same word   *
 * every time! In this case, the word is 'anticipate', simply *
 * because that was the first word I found that has simple    *
 * one-word answers (and because of the irony), but it should *
 * work for nearly any word.                                  */
document.getElementsByName('PAST')[0].value = 'n02076xxxx' +
      'n02076xxxxn02076xxxxn02076xxxxn02076xxxxn02076xxxx' +
      'n02076xxxxn02076xxxxn02076xxxxn02076xxxxn02076xxxx';

/* The hidden input INFO2 somehow keeps record of the time,      *
 * so by destroying it you get rid of the "too many requests"    *
 * error that forces you to reload. This also means no sleep();  *
 * we can run this thing as fast as the computer lets us.        */
document.getElementsByName('INFO2')[0].value = '';

/* Grab the answers from the hidden input and trim them into *
 * a readable array.                                         */
var curs = getWords(); // array of answers
var cur  = curs[0];    // the "question" word

/* We can't expect it to work every time... */
if(cur == 'anticipate') {
	var i = 1;
	while(i < 5) {
		if(curs[i] == 'expect') break;
		i++;
	}
	/* Again, just in case... */
	if(i < 5) window.location = "javascript:submitForm('" + i + "')";
	else      window.location = "javascript:submitForm('1')";
} else {
	/* In case, for some reason, we didn't get 'anticipate' as *
	 * we had anticipated. This is the case when we want to    *
	 * initialize the script after the first manual request.   *
	 * Let's just submit the first answer.                     */
	window.location = "javascript:submitForm('1')";
}