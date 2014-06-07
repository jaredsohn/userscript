// ==UserScript==
// @name			Fanfiction.net Filter
// @author			Shawn Smith
// @version			0.2
// @description			Filters FanFiction.Net story lists based on key-words.
// @match			http://*.fanfiction.net/*
// ==/UserScript==

/* Settings start */

/* Put words in this word bank that you want to filter out. Every 'word' must have
* a comma after it. Some examples I use to filter out slash are below.
* Words must all be lowercase.
*/
var badwords = [
    'slash', 'mpreg', 'yaoi', // General slash
    'lv/hp', 'lvhp', 'hplv', 'tomxharry', 'hp/tmr', // Harry & Voldemort slash
    'ss/hp', 'severitus', 'sev/harry', 'snarry', 'hp/ss', 'sshp', // Harry & Snape slash
    'hp/lm', 'dm/hp', 'h/d', 'hp/dm', 'drarry', 'hp:dm', // Harry + Malfoys
    'rl/sb', // Marauder era slash
    'harry potter/viktor krum'
];

/* Put words in this word bank that you want to keep, regardless of the other one.
* You MUST keep at least one word here or it will not remove words from the badwords list.
* If you don't want to keep any words, put some random garbage in there.
*/
var goodwords = [
    'no slash', 'not slash', 'femslash' // Words we want to keep
];

var DEBUG = "FALSE"; // Keep to false unless debugging the script.
/* Settings end */

var storylist = document.getElementsByClassName('z-list');
var total_removed = 0;

/* For every story on the page. */
x: for (y = 0; y < storylist.length; y++)
{
    /* Grab the story 'data'. */
    var storydata = storylist[y].innerHTML.toLowerCase();
    
    /* Loop for each good word */
    for (x = 0; x < goodwords.length; x++)
    {     
        if (storydata.match(goodwords[x]))
        {
            if (DEBUG == "TRUE")
                alert('Goodword match: ' + goodwords[x]);
            
            /* Found one, skip the story */
            continue x;
        }
    }
    
    /* For every word in the word bank. */
    for (x = 0; x < badwords.length; x++)
    {
        if (storydata.match(badwords[x]))
        {
            if (DEBUG == "TRUE")
                alert('Badword match: ' + badwords[x]);
            
            storylist[y].style.display = 'none';
            ++total_removed;
        }
    }
}

if (DEBUG == "TRUE")
    alert('Removed: ' + total_removed);