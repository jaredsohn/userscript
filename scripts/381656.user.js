// ==UserScript==
// @name       Trello Sidebar Expander
// @namespace  http://remiheens.fr
// @version    0.1
// @description  add expand button to trello sidebar
// @match      https://trello.com/b/*
// @copyright  2012+, You
// @require http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

jQuery(document).ready(function($){
    
    
    function closeBoardsSidebar(width)
    {
        $('#boards-drawer .boards-drawer').removeClass('trello-expand');
        $("#boards-drawer .boards-drawer" ).animate({
            width: width,
        }, 500, function() {
            $("#trello-expand").addClass("icon-rightarrow");
            $("#trello-expand").removeClass("icon-leftarrow");
        });
    }
    function expandBoardsSidebar(width)
    {
        $('#boards-drawer .boards-drawer').addClass('trello-expand');
        $("#boards-drawer .boards-drawer").animate({
            width: 450,
        }, 500, function() {
            $("#trello-expand").removeClass("icon-rightarrow");
            $("#trello-expand").addClass("icon-leftarrow");
        });   
    }
    function process(width)
    {
        var header = $('#boards-drawer .boards-drawer-header').html();
        if($('#trello-expand').html() != '')
        {
        	$('#boards-drawer .boards-drawer-header').html('<span id="trello-expand" class="icon-sm icon-rightarrow" style="float:right"></span>'+header);
            $('#trello-expand').on('click',function(e){
                e.preventDefault();
                if($('#boards-drawer .boards-drawer').hasClass('trello-expand'))
                {
                    closeBoardsSidebar(width);
                }
                else
                {
                    expandBoardsSidebar(width);
                }
                return false;
            });
    
            $('body > *').not('#trello-expand').on('click',function(){
                if($('#boards-drawer .boards-drawer').hasClass('trello-expand'))
                {
                    closeBoardsSidebar(width);
                }
            });
        }
    
    }
    var original_width;
    setInterval(function(){
    	original_width = $('#boards-drawer .boards-drawer').css('width');
    	process(original_width);
    }, 1000);              
    
    
});