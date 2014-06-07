// HideAnnoyingContent
// @author		Vincenzo Di Biaggio - vincenzodb - vincenzodibiaggio - http://vincenzodb.com/works/hideannoyingcontent/
// @license		GPL
// USAGE: When you visit your Facebook timeline a simple form appear on the top-left of page. You can simply insert your 'annoing words' and save them. After this push the button 'Hide!' to hide the contents.
// When you have saved your words after page reload or a content-refresh you can only push the button 'Hide!'.

// ==UserScript==
// @name        HideAnnoyingContent
// @namespace   hideAnnoyingContent
// @description Hide annoying contents from facebook timeline
// @include     https://www.facebook.com/*
// @grant       none
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==
$(document).on("click", "#hideAnnoyingContentButton", function(){  hideAnnoyingcontent(); });
$(document).ready(function(){

    if (localStorage) {
        var words = '';
        if (localStorage.length > 0)
        {
            for (var i = 0; i < localStorage.length; i++){
              words = words + localStorage.getItem(localStorage.key(i)) + ',';
            }
        }
    
       var form = '<form id="hideAnnoyingContentForm" action="" method="POST"><input type="text" id="HHC_annoyingWords" value="'+words+'" size="10" /><input type="submit" value="Save Annoying Words"/></form>';
    
        $('body').append(form);
        $('#hideAnnoyingContentForm').css('position','fixed');
        $('#hideAnnoyingContentForm').css('top','7px');
        $('#hideAnnoyingContentForm').css('left','5px');
        $('#hideAnnoyingContentForm').css('z-index','5000');
        
        $('#hideAnnoyingContentForm').submit(function(e){
            e.preventDefault();
            
            localStorage.clear();           

            var arrWords = $('#HHC_annoyingWords').val().split(',');
            $.each(arrWords, function(index, value){
                if(value.length > 0)
                {
                    localStorage['HHC_'+index] = value;              
                }
                 
            });           
        });
        
        var button = '<button id="hideAnnoyingContentButton">Hide!</button> />';
        $('body').append(button);
        $('#hideAnnoyingContentButton').css('position','fixed');
        $('#hideAnnoyingContentButton').css('top','7px');
        $('#hideAnnoyingContentButton').css('left','250px');
        $('#hideAnnoyingContentButton').css('z-index','5000');
    }
    else {
        alert('Hide Annoying Content: I can\'t work :( Please update your browser');
    }
});



function hideAnnoyingcontent()
{
    if (localStorage) {
        $('#home_stream').children('li').each( function() {
            for (var i = 0; i < localStorage.length; i++){
                var reg = new RegExp("("+localStorage.getItem(localStorage.key(i))+")",'i');
                if ( reg.test( $(this).text() ) ) { 
                    $(this).hide();
                }
            }
        });
    }
    else {
        alert('Hide Annoying Content: I can\'t work :( Please update your browser');
    }
}