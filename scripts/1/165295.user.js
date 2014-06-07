// ==UserScript==
// @name         Hide animated avatars on scrap.tf
// @description  Saves some performance by removing the animated avatars
// @match        http://scrap.tf/*
// @require 	 http://update.sizzlemctwizzle.com/165295.js
// @version	 	 3.1.1
// @copyright    2012+1, Gus
// ==/UserScript==

//This script was made to replace the silly animated avatars at scrap.tf to static, cool and light avatars. While their animated avatars 
//doesn't have a size limit or something, use this. Anyway, this script is bad but it
//should work. If not, just give Gus a call. http://steamcommunity.com/profiles/76561198028142866/

//This script refreshes every # seconds. Put below the number of seconds that you want the script 
//to refresh. Smaller numbers means that new avatars will change faster, though bigger numbers may
//be better for performance (I believe the performance use is pretty low, though)

//It also has an extra option to make the little "user list" on chat disappear if you click anywhere else on the page. It's good for people with OCD.
//In the variable below, use 'true' (without quotes) if you want this extra feature, and 'false' if you are a moron and don't want to keep it.
var gibeWindowCloser = true;

var refreshEvery = 1*1000;

window.setInterval(function() { 
      
    var animatedImages = document.getElementsByTagName('img');
      
     for(i=0; i<animatedImages.length; i++) {
         if (animatedImages[i].src.indexOf('.gif') != -1) {
             animatedImages[i].src = ("http://media.steampowered.com/steamcommunity/public/images/avatars/ca/ca6a798d30a3f81a21d60bf18b559d121bcdf156_full.jpg")
         }
     }
     
}, refreshEvery);

if(gibeWindowCloser == true) {
    $(function() {
                $('#room-name').click(function(){
                    $('#chat-hover').fadeIn('fast');
                });
                $("#room-name").click(function(e){
                    return false;
                });
            });	
    
            $(document).click(function(e) {
                var target = e.target;
                
                if (!$(target).is('#chat-hover') && !$(target).parents().is("#chat-hover")) {
                    $('#chat-hover').fadeOut('fast');
                }
            });
}
