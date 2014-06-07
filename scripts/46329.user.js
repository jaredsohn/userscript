// ==UserScript==
// @name           FB Filter
// @namespace      ksquared
// @include        http://www.facebook.com/home.php
// @include        http://www.facebook.com/home.php?*
// @include        http://www.facebook.com/home.php#*
// @require        http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

/*
Do you know what I want? 
I want an application that will scan all of my friend statuses 
and if they are related to sports, baseball, basketball, which 
team is better, scores or any of that other BULLSHIT, it will 
hide it from my view. Rage. Fit. Black. Out.
- Kelsey Kreiling
*/

if(typeof jQuery == 'undefined') {
    alert("Not loaded");
} else {
    blocked = [ 'basketball','Basketball',
                'baseball','Baseball',
                'football','Football',
                'sport','Sport',
                'team','Team',
                'score','Score', 'cubs', 'Cubs', 'Cubbies', 'cubbies'];
    
    for(var i=0; i<blocked.length; i++) {
        jQuery(".UIIntentionalStory:contains('"+blocked[i]+"')").html("<div>Blocked.</div>");
    }
}
