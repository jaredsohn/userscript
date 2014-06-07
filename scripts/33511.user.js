// ==UserScript==
// @name           blastEeeLamers
// @namespace      3
// @include        http://*.blogspot.com/*
// ==/UserScript==

//"Blasteelamers"
//http://vvlrrp.wordpress.com
//version:	0.1
//status:	beta

//banned users
//
//extract the profile id of the users whose comment you don't want to see in a blog.
//ex:- if there is a user with the profile URL of http://www.blogger.com/profile/12223439160323478387
//his profile id would be 12223439160323478387
//you can include him in the banned users collection by adding a line like
//terras[8] = "12223439160323478387";
//please note that number 8 in the above line will be an accending number... so if you have 10 entries
//you would have 10 lines with numbers from 0 - 9 ... and yes it starts from 0
//
var terras = new Array();
terras[0] = "00491643194712962581"; //shyam
terras[1] = "09058343743584927925"; //bandara
terras[2] = "";
terras[3] = "";
terras[4] = "";
terras[5] = "";
terras[6] = "";
terras[7] = "";


//
//functions

//hide a given comment from the document
//
hideComment = function(comment) {
        var elementsToHide = new Array();
        elementsToHide[0] = comment;
        elementsToHide[1] = comment.nextSibling;
        elementsToHide[2] = comment.nextSibling.nextSibling;
        elementsToHide[3] = comment.nextSibling.nextSibling.nextSibling;
        elementsToHide[4] = comment.nextSibling.nextSibling.nextSibling.nextSibling;
        elementsToHide[5] = comment.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;
       
        for (var a = 0; a < elementsToHide.length; a++)
        {
            if(typeof(elementsToHide[a].style) == 'undefined')
            {
                elementsToHide[a].style="display: none;";
            }
            else
            {
                elementsToHide[a].style.display = 'none';
            }
        }
    };

//get the comments block
var comments = document.getElementsByTagName('dt');

for (var i = 0; i < comments.length; i++)
{
    comment = comments[i];
    // check for comments from banned users... if found remove them
   
    //commment author's profile ID
    //we are extracting it from the profile URL....
    //var profileId = document.getElementById('comments-block').childNodes[i].childNodes[3].pathname.substr(9);
   
    var profileId;
    //we assume that now this is some URL like http://defencewire.blogspot.com/2008/08/dsfsd-dsfsd-ds.html

    profileId = comment.childNodes[3].pathname.substr(9);
           
    var terra;
    for (var a = 0; a < terras.length; a++)
    {
       terra = terras[a];
       if(terra.valueOf() == profileId.valueOf())
       {
         hideComment(comment);
       }
    }
}