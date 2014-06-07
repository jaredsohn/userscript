// ==UserScript==
// @name         Seedshare mod
// @include      http://www.seedheaven.net/*
// @author       kasperfish
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
 // $('#header').hide().fadeIn(2000);

$('#menu li:nth-child(2)').after('<li><a href="http://www.seedheaven.net/smf/index.php?action=profile;area=showposts;sa=topics">My Topics</a></li>');
$('#menu li:nth-child(3)').after('<li><a href="http://www.seedheaven.net/smf/index.php?action=profile;area=showposts">My Posts</a></li>');
$('#menu li').mouseenter(function(){
       $(this).css('background-color','green');
    });
$('#menu li').mouseleave(function(){
       $(this).css('background-color','transparent');
    });
    


    // Make an element draggable using jQuery  
    var makeDraggable = function(element) {  
        element = jQuery(element);  
      
        // Move the element by the amount of change in the mouse position  
        var move = function(event) {  
            if(element.data('mouseMove')) {  
                var changeX = event.clientX - element.data('mouseX');  
                var changeY = event.clientY - element.data('mouseY');  
      
                var newX = parseInt(element.css('left')) + changeX;  
                var newY = parseInt(element.css('top')) + changeY;  
      
                element.css('left', newX);  
                element.css('top', newY); 
element.css('cursor', 'move'); 
      
                element.data('mouseX', event.clientX);  
                element.data('mouseY', event.clientY);  
            }  
        }  
      
        element.mousedown(function(event) {  
            element.data('mouseMove', true);  
            element.data('mouseX', event.clientX);  
            element.data('mouseY', event.clientY);  
        });  
      
        element.parents(':last').mouseup(function() {  
            element.data('mouseMove', false);  
	    element.css('cursor', 'default');
        });  
      
        element.mouseout(move);  
        element.mousemove(move);  
    }  

$('#shoutbox_smileys').css({width:'500px',height:'250px',padding:'5px'});
$("div.windowbg2.smalltext").removeAttr('style');
$("div.windowbg2.smalltext").css({width:'500px',height:'250px'}).find('br').remove();

$("div.windowbg2.smalltext img").each(function (i) {
$(this).css({float:'left'});
});




$('img[alt=smileys]').onclick(makeDraggable('#shoutbox_smileys'));


}


// load jQuery and execute the main function
addJQuery(main);
