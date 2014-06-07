// ==UserScript==
// @name        Jump to Top Button for IPython Notebook
// @namespace   https://github.com/otterb
// @description This will add a "Jump to Top" button in the toolbar
// @include     http://127.0.0.1:*/*
// @version     1.5
// @grant       none
// @license     http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @copyright   Otterb
// ==/UserScript==
 
$(function() {
    
    var container = $("<div />", {class:"btn-group"}) 
    container.append($("<button />", {id:"top_btn", text:"Top", class:"btn"}))
    container.append($("<button />", {id:"bottom_btn", text:"Bottom", class:"btn"}))
    container.append($("<button />", {id:"LastFocused_btn", text:"LastCell", class:"btn"}))
    container.append($("<button />", {id:"plus_btn", text:"+", class:"btn"}))
    container.append($("<button />", {id:"minus_btn", text:"-", class:"btn"}))
    $('#menus').append( container )
    
    var topBtn = $('#top_btn');
    topBtn.click(function () {
        $('#notebook').animate({
            scrollTop: 0
        }, 50);
        return false;
    });
    var bottomBtn = $('#bottom_btn');
    bottomBtn.click(function () {
        $('#notebook').animate({
            scrollTop: $('.end_space').position().top
        }, 50);
        return false;
    });
    var LastFocused = $('#LastFocused_btn'); 
    LastFocused.click(function () {
        $('#notebook').animate({
            scrollTop: 0
        }, 0); // alaways scroll down from the top due to reliability issue
        $('#notebook').animate({
            scrollTop: $('div.cell.border-box-sizing.code_cell.selected').position().top
        }, 0);
       return false;
    });
 
    
    var default_size = parseFloat($("#notebook_name").css("font-size").split("px")[0]),
        current_size = default_size;
    $("#plus_btn").click(function() {
        current_size += 1
        $("#notebook_name").css("font-size", current_size+"px");
        return false;
    });
    $("#minus_btn").click(function() {
        current_size -= 1
        $("#notebook_name").css("font-size", current_size+"px");
        return false;
    });
 
    // either within 50px on left or holding shift will enable turbo scrolling
    $("#notebook").bind("mousewheel DOMMouseScroll", function(e) {
        e = e.originalEvent;
        var delta = e.wheelDelta>0||e.detail<0?1:-1;
        if (e.shiftKey || e.clientX < 50)
            delta *= -700
        else
           delta *= -120
        
        $('#notebook').animate({
            scrollTop: delta-$('#notebook-container').position().top
        }, 50);
            
        return false;        
        
    });
 
});