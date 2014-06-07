// ==UserScript==
// @name           mozillazine - hide user posts
// @namespace      http://choggi.dyndns.org
// @description    hide posts from unwanted users
// @include        http://forums.mozillazine.org/*
// ==/UserScript==

//list of user ids (copy the link address from the username and use the profile number on the end)
var hideThese = [
/80710/, //ChoGGi
/80710/, /*also ChoGGi*/
/80710/ //and ChoGGi
];

//if you also want to hide threads they've started
var hideThreads = false;



//list all links in page
var linkList = document.getElementsByTagName("a");
//loop through the links
for (var i = 0; i < linkList.length; i++){
    var href = linkList[i].href;
    //make sure it's the right link
    if (href.indexOf("memberlist.php") == "-1" && href.indexOf("viewprofile") == "-1"){
        continue;
    }
    //get the profile number
    href = href.split("=");
    if (href[2] != undefined){
        var link = href[2];
    }
    //check with the user list
    for (var j = 0; j < hideThese.length; j++){
        if (link.match(hideThese[j]) != null){
            var post = linkList[i].parentNode.parentNode.parentNode;
            //so we don't hide the wrong thing
            if (post.parentNode.className.indexOf("post") != "-1"){
                post.parentNode.style.display = "none";
                //if you want to add a class and do something else with it (show on hover or whatnot)
                //post.className += "IgnoreUser";
            }
            //for hiding threads
            if (hideThreads == true && post.parentNode.className.indexOf("topics") != "-1"){
                post.style.display = "none";
            }
        }
    }
}
