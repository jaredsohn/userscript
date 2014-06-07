// ==UserScript==
// @name        Support JUST Your Favourite Youtubers[Working]
// @namespace   Ruben
// @include     *://www.youtube.com/*
// @require	http://code.jquery.com/jquery.min.js
// @version     2
// @grant       GM_addStyle
// @description Add channels by adding (lowercased) channelnames to first array.
// ==/UserScript==
/*- 
    Add channels by adding (lowercased) channelnames to first array.
*/
var youtubers = ["channelname1", "channelname2", "channelname3", "etc"];
var elemCheckTimer      = null;
var watch = "youtube.com/watch?v=";
var pageURLCheckTimer="";
var page = 0;
window.history.__proto__.pushState = function(a, b, url) {
    window.location.href = url;
}

if (window.location.href.match(/https?:\/\/www\.youtube\.com\/feed\/.*/)) {
    console.log("Put main function here!");
    page=1;
    addAds();
    
} else if (window.location.href.match(/https?:\/\/www\.youtube\.com\/watch*/)){
    if (!/ads=/.test(window.location.href)){
        	console.log("Adding Ads to video url");
        	checkUserAndRelocate ();
        }
        else{
        	console.log("Already has ads");
		}
	}
    else {
	console.log("This is not a video or the subscription page.");
}


$(window).scroll(function() {
    addAds();
});
function addAds(){
    if(page==1){
     $(".feed-item-main").each(function(){
        // var user = $('.yt-user-name', this).text().toLowerCase();
          var user = $('.context-data-item', this).attr("data-context-item-user");
         if(typeof(user)!='undefined'){
             user=user.toLowerCase();}
         else{
         	var user = $('.yt-user-name', this).attr("href");
            // console.log(user);
             user=user.split('/');
             //console.log(user);
             user=user[2].split('?');
             user=user[0];
             user=user.toLowerCase();
             //console.log(user);
         }
         
          if ((jQuery.inArray(user , youtubers)) > -1){
              
                     var link = $(".yt-uix-tile-link", this).attr("href");
              if(link.indexOf("&ads=true")==-1){
                     link = link + "&ads=true";
                   $(".yt-uix-tile-link", this).attr("href", link);
              }
              
          }
     }
        )};
    }
function checkUserAndRelocate () {
    var elem        = document.querySelector (
        "#watch7-user-header a[href*='/user/']"
    );
    if (elem) {
        clearInterval (elemCheckTimer);
        var user    = elem.href.match (/\/user\/(\w+)\W?/);
        
        if (user  &&  user.length > 1) {
            console.log(user);
            
          
            if (youtubers.indexOf(user[1].toLowerCase()) > -1){
                location.replace (location.href + "&ads=true");
            }
            
        }
    }
}