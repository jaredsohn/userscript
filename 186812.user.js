// ==UserScript==
// @name        Deviantart Show/Hide Group deviations
// @namespace   http://fredzz.deviantart.com
// @description Creates a toggle to show or hide group deviations in message center to avoid cluttering
// @include     http://www.deviantart.com/messages/#view=deviations*
// @version     1
// @grant       none
// ==/UserScript==

$(document).ready(function(){

    if ( $("span.view-list-thumb").length === 0) {
        return false;
    };
    
    $('body').append(
    '<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.0/jquery.cookie.min.js"></script>'
    );
    
    $('.tabs-table').prepend(
    '<img id="toggleGroup" src="https://cdn1.iconfinder.com/data/icons/Primo_Icons/PNG/128x128/home.png"/>');
    $("#toggleGroup").css({
    'height': '50px',
    'left': '190px',
    'position': 'absolute',
    'top': '-12px',
    'width': '50px'});
    
       
    $('#toggleGroup').on('click', function(e) {
        
        var groups = getGroups();
        
        $(groups).each(function(i) {
            $(this).toggle();
        });
            

    });
    
    function getDevs() {
        return $('div.mcbox.mcbox-thumb');
    }
    
    function getGroups() {
        var allDevs = getDevs();
        var groups = [];
        $(allDevs).each(function() {
            group = $(this).find("a.group").parents("div.mcbox:first");
            groups.push(group);
        });
        return groups;
    }
    
    $(document).keydown(function( event ) {
        if ( event.which == 71 ) {
            console.log("Clicked G");
            $("#toggleGroup").trigger("click");
        }
    });

});