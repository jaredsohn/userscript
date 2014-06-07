// ==UserScript==
// @name 10 Fast Fingers Typing Test Hax0rz Script
// @version 0.1
// @description Makes 10fastfingers.com's Typing Test a spacebar smashfest.
// @match http://10fastfingers.com/typing-test/english
// @copyright 2013+, rfk
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

var gbWords = [];
var gbCtr = null;

// bind spacebar monitor
$('#inputfield').keyup(function (e) {
    if (gbCtr === null) {
        var elements = $('#row1 > span');
        gbWords = [];
        elements.each(function() { 
            console.log(this.innerHTML);
            gbWords.push(this.innerHTML);
        });
        
        gbCtr = 0;
        console.log('Words loaded. Focus input field and spacebar away!');
        
    } else if (e.keyCode == 32) {
		this.focus();
        this.value = gbWords[gbCtr];
        gbCtr ++;
	}
});
