// ==UserScript==
// @name       OnTime comment box size increase
// @namespace  http://userscripts.org/scripts/source/256971.user.js
// @version    0.3
// @description  Increases OnTime's comment box size
// @include         https://*.ontimenow.com/*
// @copyright  2012+, You
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

// Update container

var commentBoxId = "";

function changeCommentsScreen()
{
 	var divs = document.getElementsByTagName("div");
    for(var i = 0; i < divs.length; i++)
    {
        var div = divs[i];
        if (div.innerHTML==="Comments:")
        {
            div.innerHTML += " :-)";
        }
        
        if (div.className.indexOf("axo-commentsui") != -1 && div.outerHTML.indexOf("style=\"height: 160px;\"") != -1 && div.clientHeight != 350)
        {
            console.log('Increasing size of comments form');
            commentBoxId = div.id;
            $(div).height("350px");
            $(div).find("button").after($("<button class='contextual' id='growComments'>Expand</button>"));
            $("#growComments").click(function(){
                $("#" + commentBoxId).height( $("#" + commentBoxId).find("div.yui3-lightgrid-content").height() + 50);
            });
            $("#growComments").after($("<button class='contextual' id='foldComments'>Collapse</button>"));
            $("#foldComments").click(function(){
				$("#" + commentBoxId).height("350");
            });
        }
        
        if (div.className === "yui3-widget axo-textfield" && div.clientHeight != 350)
        {
            console.log('Increasing size of description form');
            div.style.height = "350px";
        }
        if (div.className === "comment-text comment-add-text" && div.clientHeight != 200)
        {
            console.log('Increasing size of comments textbox');
            div.style.height = "250px";
        }
        
    }  
}

console.log("OnTime script started");
setInterval(function(){
    changeCommentsScreen();
}, 1000);