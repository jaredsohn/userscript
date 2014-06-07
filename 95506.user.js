// ==UserScript==
// @name          UnAustralianPunch
// @namespace     watDoIPutHere?
// @description   Returns subforums where they belong
// @include       http://www.facepunch.com/forums/*
// ==/UserScript==

document.getElementsByClassName = function(cl) {
    var retnode = [];
    var myclass = new RegExp('\\b'+cl+'\\b');
    var elem = this.getElementsByTagName('*');
    for (var i = 0; i < elem.length; i++) {
        var classes = elem[i].className;
        if (myclass.test(classes)) retnode.push(elem[i]);
    }
    return retnode;
};

var forums = document.getElementsByClassName("forums");
    
if (forums.length > 0)
{
    var forumDiv = forums[0];
    var oldPlace = document.getElementById("above_threadlist");
    var parent = document.getElementById("content_pad");

    if (forumDiv && oldPlace && parent)
    {
        parent.insertBefore(forumDiv, oldPlace)
    }
}