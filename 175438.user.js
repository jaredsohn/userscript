// ==UserScript==
// @name        Post-Op Tran-e
// @namespace   http://www.kuro5hin.org/post-op-tran-e
// @description Make trane more interesting
// @include     http://www.kuro5hin.org/*
// @version     1
// @grant       none
// ==/UserScript==


// wow, k5 html sucks ass.

(function(){

var titles = [
    'Disregard - I suck cocks',
    "This movie sucks shit!",
    "Kathleen Turner has big fuckin' tits!",
    "I put a firecracker in a bullfrog's mouth and blew his fuckin' head off!",
    "That girl in the fucking car in front of us, she gives everybody head.",
    "This popcorn's fuckin' terrible. It tastes like someone jizzed all over it.",
    "I looked at my asshole in the mirror today. It blew my fuckin' mind!",
    "My father's shit stinks up the bathroom all fuckin' day!",
    "I'm gonna go get head from that fuckin' girl.",
    "I'd like to piss in that guy's fuckin' gas tank!",
    "Fuckin' shit!",
    "I know a guy who can suck his own dick.",
    "One time i saw my grandmother in the shower. Her bush starts above her belly button.",
    "My neighbor's dog has a four inch clit!",
    "I had diarhea last month. I had to shit all fucking day!",
    "I've got a big fucking boner right now.",
    "One time i ate my neighbors shit!",
    "I bet you got really hairy balls.",
];

// table class="Edmund Blackadder" has two classes due to the space.
var nodes = document.querySelectorAll("table.Edmund.Blackadder table :first-child b");

// nodes is an array of b elements containing comment titles.
Array.forEach(nodes, function(node){
    var ix = Math.floor(Math.random() * titles.length);
    node.textContent = titles[ix];
});

})();