// ==UserScript==
// @name       Coach Assist Image replacer
// @namespace  http://richo.com/
// @version    0.1
// @description  Replaces images.
// @match      http://www.coachassist.com.au/*
// @copyright  2012+, 
// @require https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// ==/UserScript==

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function pad(number, length) {
   
    var str = number.toString();
    while (str.length < length) {
        str = '0' + str;
    }
   
    return str;

}
    

var drillId = getUrlVars()["ex_id"];
var src = $("img[src$='DiagramMembersOnly.gif']");

var imageUrl = "exercises/diagrams/ex_" + pad(drillId, 6) + ".gif";
src.attr("src", imageUrl);


