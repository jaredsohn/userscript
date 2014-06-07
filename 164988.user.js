// ==UserScript==
// @name       Nobody needs likes
// @namespace  http://nnl.indyaner.de/
// @version    0.1
// @description  Hide the Like. Free yourself from the weight of the deceptive Like. You dont have to know who else liked something. Make up your own Mind. Dont get imprisioned by the idea, that many likes had any value. It doesn't mean anything. So why showing it?\nWhen a nice picture comes up in my timeline, I want to see it neutral. It is prestressed if I also have to see that 30 other liked it already. I kind describe it exactly but it puts me it is not natural to have to know, how many people befor me saw it. What matters if how I find it. And somehow... if a picture has 2 or 200 likes, it collides with my ability to make my own decision.\nI dont want to read a Biografie of a human with such a pricetag. You know that girl with the cute photo that has 340 likes on her Profilepicture? Man, I really wish I wouldn't know. I dont need to see those likes. Or Upvotes.\nIf you are like me, then this Script is for you. Nobody needs likes.
// @match      http://*.facebook.com/*
// @match      https://*.facebook.com/*
// @copyright  2013+, Indyaner
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require       https://gist.github.com/BrockA/2625891/raw/waitForKeyElements.js

// ==/UserScript==


function sentence (jNode) {
    //jNode.css("background-color","red"); //Debug: Show this Element
    jNode.hide();
}

function counter (jNode) {
    //jNode.css("background-color","yellow"); //Debug: Show this Element
    jNode.hide();
}

waitForKeyElements ("li.UFILikeSentence", sentence);

waitForKeyElements ("a.UFIBlingBox span:first-child", counter);