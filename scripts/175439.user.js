// ==UserScript==
// @name        Trane Blaster
// @namespace   http://www.kuro5hin.org/repeatablehairstyle
// @description Make trane sound like Crawford
// @include     http://www.kuro5hin.org/*
// @version     1
// @grant       none
// ==/UserScript==


// Thanx to New Bottle Old Wine for this script and inspiration.

(function(){

var titles = [
    "Did you know my father was in the navy?",
    "I grinded my own telescope lenses at Caltech.",
    "I gave my entire disability check to a stripper at Mary's Garden.",
    "I am a super debugger, I can write software better than most.",
    "On our honeymoon, Bonita and I were so tired that she took up the entire bed and I had to sleep on the floor.",
    "Brian LULZara has anger management issues.",
    "I was minding my own business at a McDonalds, and then this cop asks me to leave. So I said let me save this document and if I don't a plane will fall out of the sky. So then he arrests me, I am absolutely serious!",
    "Apple has poor quality control in iOS, that is why I cannot shit Warp Life!",
    "Oh oh gotta run the thought police are after me again!",
    "At this convention I met this booth babe and taught her all about graphic cards. Now today she runs her own company!",
    "You ignorant mother fucker!",
    "Sometimes during watching a porno movie, two men tend to get it on.",
    "Have you seen my pet cat Cricket? She has gone missing again!",
    "I am going to install HaikuOS on my room mate's XBox 360!",
    "Don't get me started on my Aunt Peggy, just don't!",
    "I once met Steve Jobs, we exchanged words and then he stole all of my ideas to make the iPhone.",
    "One time at Open Mike Night I played an untuned piano to receive great accolades and applause!",
    "If I don't know how to do something I don't Google it. Google is infected with Black Hat SEO hacks. I'd rather just troll people and ask them instead.",
];

// table class="Edmund Blackadder" has two classes due to the space.
var nodes = document.querySelectorAll("table.Edmund.Blackadder table :first-child b");

// nodes is an array of b elements containing comment titles.
Array.forEach(nodes, function(node){
    var ix = Math.floor(Math.random() * titles.length);
    node.textContent = titles[ix];
});

})();