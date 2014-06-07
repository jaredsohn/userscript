// CraigslistGoonFilter
// 03-23-2007
// Please consider this script released under GPL
// Courtesy of "Latham Geek" (I would like to
// remain anonymous for personal reasons). 
// http://www.gnu.org/copyleft/gpl.html
// 
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Craigslist Goon Filter
// @description   This is a tool which will let you filter Craigslist RnR posts somewhat.
// @include       *.craigslist.org/rnr/
// ==/UserScript==
//
// ----------------------------------------------------------------------------------
//
// WHAT THIS GOONFILTER IS: 
// GoonFilter arose because while posting on Craigslist Rants and Raves, the
// same set of creeps kept irritating me with pointless, hostile comments. I
// heard about Greasemonkey and suddenly it occurred to me: why not just zap
// the 2 or 3 creeps that were bugging me right out of the page? While I was 
// working on the script, it ALSO occurred to me that it would be neat to 
// highlight the NICE people I was meeting in green, to draw more attention
// to their posts. This script is the early, early beta version of this idea,
// coded into reality on a slow Friday night. 
// 
// Please be kind, this is my very first attempt at a Greasemonkey script and
// I've only just begun tinkering with this idea. It's brand-new! 
//
// -- Latham Geek
//
// ----------------------------------------------------------------------------------
//
// ----------------------------------------------------------------------------------
// VARIABLE DECLARATIONS -- SET UP YOUR REGEXPS HERE.
// ----------------------------------------------------------------------------------

// REGEXP INSTRUCTIONS: 
// For each person you want to kill or keep, you need to find
// something about their usual title or location that you can
// key on. In the version of this script I'm uploading to the
// server, under my kill regexps I'm going to put in a sample 
// (fictitious) user who always posts from a location "Troll".
// Just replace the word "Troll" with your personal irritant's 
// location. Copy and paste all three lines for each irritant
// you would like to hide. Remember to update the indices!
//
// Under my keep regexps, I'm going to use a (fictitious) 
// user who posts from "The Attic". Note that in the keepers,
// I only need ONE regexp, whereas in the kill list I have to 
// be more careful so as not to hide false positives (like when
// something you want to delete can technically be part of
// a larger word, like base is part of baseball and baseless).
//
// NOTE: If your irritant is posting using a regular city as 
// a location, and nothing good seems to be coming from there,
// you can ban the whole joint if you want. But otherwise, this
// IS a limitation. Craigslist doesn't have real userIDs, at 
// least none we can key on. But hey, soldier on. 
// 
// You don't have to worry about the other regexps, unless 
// Craigslist decides suddenly to start changing their web
// page layout to discourage screen scraping or something. 
// If that happens, I'll be debugging and uploading new 
// versions, no doubt. :)

 
var myKillExps = new Array();
myKillExps[0] = /\(Troll.*\)+/i;      // (Troll something) or (troll) etc
myKillExps[1] = /\(.*Troll.*\)+/;      // (something something Troll something)
myKillExps[2] = /\(\s*Troll.*\)+/i;    // (  troll) or (troll) or (troll something)

var myKeepExps = new Array(); 
myKeepExps[0] = /Attic+/i;   // (The Attic) or (the attic) or (attic) etc

// A regexp to find the date that marks the beginning 
// of Craigslist's list of posts...
var beginExp = /<h4>/;

// A regexp to know when we're past the list of posts. 
var endExp = />next \d+ postings</i;

// A regexp we can trade for another to make the title
// of a post we like glow green. 
var greenExpBegin = /<p><a href="http:\/\//i;
var newGreenExpBegin = "<div style='color: green;'><p><a style='color: green;' href=\"http://";
var greenExpEnd = /<\/p>/;
var newGreenExpEnd = "</p></div>";

// Get the source for the current page...
var sourceWebPage = document.body.innerHTML;

// Split it into individual lines...
var sourceWebPageLines = new Array(); 
sourceWebPageLines = sourceWebPage.split("\n");

// A loop counter. 
var i = 0; 
var j = 0; 

// A temp string.
var tempString = "";

// -----------------------------------------------------------------------------------
// NOW THE CODE
// -----------------------------------------------------------------------------------

// Loop over the web page source's lines, skipping
// everything up to the beginning of the list of posts. 
// Craigslist marks the beginning of the list of posts
// with a date. we find it with a regexp. 
while(sourceWebPageLines[i].search(beginExp) < 0) 
{

    i++; 

} // while

// Now, loop over the set of posts until we get past the
// LAST post, testing each post. Skip lines that only
// contain dates. NOTE: We start at our current value of i. 
for(i; i < sourceWebPageLines.length; i++)
{
    // If we hit a date header, skip it. 
    if(sourceWebPageLines[i].search(beginExp) >= 0)
    {
        continue; 
    } // if

    // If we're at the end of the list of posts, break!
    if(sourceWebPageLines[i].search(endExp) >= 0)
    {
        break; 
    } // if

    // We're in the list of posts. Let's check the current
    // post against our kill regexps first. 
    for(j = 0; j < myKillExps.length; j++)
    {

        if(sourceWebPageLines[i].search(myKillExps[j]) >= 0)
        {
            sourceWebPageLines[i] = "";
        } // if

    } // for

    // Now let's check the current post against our Keep
    // regexps. Same method, only this time we turn the
    // title bright green for "go". 
    for(j=0; j < myKeepExps.length; j++)
    {

        if(sourceWebPageLines[i].search(myKeepExps[j]) >= 0)
        {
            sourceWebPageLines[i] = sourceWebPageLines[i].replace(greenExpBegin, newGreenExpBegin);
            sourceWebPageLines[i] = sourceWebPageLines[i].replace(greenExpEnd, newGreenExpEnd);
        } // if

    } // for


} // for

// Ok, now, we rebuild the web page using our NEW text. 
//NOTE: I found that if I tried to just "+=" the lines of
// HTML onto the end of document.body.innerHTML after
// clearing it out, I ended up nuking the JavaScript that
// was already in the page! Which sucks, obviously. 
// Building a string and using that to clobber innerHTML
// worked much better.  
sourceWebPage = ""; 
for(i = 0; i < sourceWebPageLines.length; i++)
{

    sourceWebPage += sourceWebPageLines[i] + "\n";
 
} // for
document.body.innerHTML = sourceWebPage; 



// -----------------------------------------------------------------------------------
// That's it for now... Still a proof of concept...
// -----------------------------------------------------------------------------------


