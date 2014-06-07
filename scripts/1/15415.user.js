// ==UserScript==
// @name           Delicious2 TagCloud skin
// @namespace      http://trucktrace.org/
// @include        http://delicious.com/*
// ==/UserScript==

(function() {

Array.prototype.min = function() {
    return Math.min.apply( null, this )
}
Array.prototype.max = function() {
    return Math.max.apply( null, this )
}

var tags, MIN, MAX, maxSQRT, minSQRT, CF, tagSQRT, tagLevel;
var counts = [];

var levelWeight = 24;
var marginWeight = 8;
var highlightCount = 5;

var levelColor = {
    sp:"#DF3434",
    0: "#BBBBBB", 1: "#BBBBBB", 2: "#AAAAAA",
    3: "#AAAAAA", 4: "#777777", 5: "#555555",
    6: "#444444", 7: "#333333", 8: "#3A3939",
    9: "#A5D670", 10:"#96D44C", 11:"#96D44C",
    12:"#88D52D", 13:"#88D52D", 14:"#70D500",
    15:"#70D500", 16:"#9DD5FF", 17:"#9DD5FF",
    18:"#78C5FF", 19:"#78C5FF", 20:"#4CB2FF",
    21:"#4CB2FF", 22:"#28A2FF", 23:"#28A2FF",
    24:"#0091FF",
}

if (document.getElementById( 'ruser-tags' ))
  tags = getTags( 'ruser-tags' );
else if (document.getElementById( 'user-tags' ))
  tags = getTags( 'user-tags' );

for (var i = 0, j = tags.length; i < j; i++)
    counts.push( getTagCount( tags[i] ) );

MIN = counts.min();
MAX = counts.max();
maxSQRT = getSQRT( MAX );
minSQRT = getSQRT( MIN );
CF = getSQRT( (levelWeight / (maxSQRT - minSQRT)) );

for (var i = 0, j = tags.length; i < j; i++) {
    tagSQRT = getSQRT( getTagCount( tags[i] ));
    tagLevel = Math.round( (tagSQRT - minSQRT) * CF );

    tags[i].style.fontSize = (tagLevel + marginWeight) + "px";
    tags[i].getElementsByTagName( 'a' )[0].style.color = levelColor[ tagLevel ];
}

for (var i = 0; i < Math.round( Math.random() * highlightCount ); i++) {
    var point = Math.round( Math.random() * tags.length )
    tags[ point ].getElementsByTagName( 'a' )[0].style.color = levelColor[ 'sp' ];
}

function getTags( id ) {
    return document.getElementById( id ).getElementsByTagName( 'li' );
}

function getTagCount( tag ) {
    return parseInt( tag.getElementsByTagName( 'em' )[0].innerHTML );
}

function getSQRT( val ) {
    return parseFloat( (Math.sqrt( val )).toFixed( 2 ));
}

})()

