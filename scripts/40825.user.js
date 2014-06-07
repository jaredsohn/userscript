// ==UserScript==
// @name           SECRET PROJECT
// @namespace      secret@kwierso.com
// @description    THIS IS A SECRET
// @include        http://*.roosterteeth.com/members/
// @include        http://*.roosterteeth.com/members/index.php
// @include        http://roosterteeth.com/members/
// @include        http://roosterteeth.com/members/index.php
// @include        http://redvsblue.com/members/
// @include        http://redvsblue.com/members/index.php
// @include        http://strangerhood.com/members/
// @include        http://strangerhood.com/members/index.php
// @include        http://achievementhunter.com/members/
// @include        http://achievementhunter.com/members/index.php
// ==/UserScript==

(function() {

// this is the array of all replacement messages. 
// You can add more if you want, just make sure 
// each one is surrounded by double-quotes, 
// and each line except for the last one ends with a comma.
    var replacements = ["Nobody loves you.",
            "You are alone.",
            "You have no one to talk to.",
            "You have no penis.",
            "Burnie says you're lame.", 
            "You are not being watched. We promise.",
            "I see what you did there."]
            
// this generates the number that corresponds to one of the messages listed above.
// you shouldn't need to edit this line, as it adjusts as 'replacements' grows in size.
    var rnum = randomnumber(0,replacements.length-1);
    
// get the element that contains the alert list.
// don't mess with this line.
    var alertBox = document.getElementById("myAlerts");

// if no new alerts, change the message to one of the above, identified by 'rnum'.
// don't mess with this part.
    if(alertBox.innerHTML.match("<b>You have no new alerts.</b>"))
        alertBox.innerHTML = "<b>" + replacements[rnum] + "</b>";
})();

function randomnumber(num1, num2)
{
	num1 = parseInt(num1);
	num2 = parseInt(num2);
	if(num1 >= num2)
	{
		alert("Number 2 should be greater than Number 1");
	}
	else
	{
		var generator = Math.random()*(num2-num1);
		generator = Math.round(num1+generator);
		return generator;
	}
}
