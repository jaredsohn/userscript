// ==UserScript==
// @name       Partial G+ Sidebar Remover
// @namespace  https://plus.google.com/111351213469977329795
// @version    0.1
// @description  Allows the user to trim down what sections appear in the Google+ Sidebar without removing it completely.
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// @match          https://plus.google.com/*
// @include        http://plus.google.com/*
// @copyright  2013+, Ryan Young
// ==/UserScript==

$(function() {
    
    //List of different sections that appear. Comment out the ones you want to see.
    var Sections=[
	4,    // You May Know
//	13,   // Trending
//	15,   // User has circled (appears on profile pages)
//	16,   // Have user in circles (appears on profile pages)
//	17,   // People and Pages (this appears to only exist on the search page)
//	26,   // Upcoming Events
	33,   // You Might Like
	34,   // Fun and Interesting (aka Celeberties)
	44,   // Suggested Communities
	45,   // Invite Friends
	54,   // Create Google+ Event
	56,   // Complete Your Profile
//	62,   // Link your website (appears on pages you are using G+ as)
	75,   // Upcoming Birthdays
	77,   // Community Invitations
	0     // Seemingly Nothing - it exists, but it's empty. I put it here to avoid errors involving commas.
    ];
    
    
    //Removes the unwanted sections
    function PurgeSidebar()
    {
        var loopvar = 0;
        while(loopvar < Sections.length)
        {
        $("div[componentid='" + Sections[loopvar] + "']").remove();
        loopvar++;
        }
    }
        
    //Add a button for manual removal
    $("div#gbqfbw").append("<button type='button' class='gbqfb' style='margin-left:5px;' id='Remove'>Remove Sidecontent</button>");
    
    //This calls the function when the sidebar loads
    $('.hxa.AqMP8e').ready(function(){
        PurgeSidebar();
    });
    
    //This calls the function when the user clicks the button to remove sections manually - for when the page changed and adds it back in
    $('#Remove').click(function(){
       PurgeSidebar(); 
    });
    
	});