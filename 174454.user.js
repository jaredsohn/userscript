// ==UserScript==
// @name       AGM Expand View
// @namespace  http://idanbauer/
// @version    0.2
// @description  This script creates a "full screen mode" for the release backlog grid.  It is also partially useful for other grid views in aGM.
// @match      https://agilemanager-int.saas.hp.com/*
// @copyright  2013, Idan
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
$(document).ready(function() {

    $('body').append('<input type="button" value="expand" id="btnexpand">');
    
    $("#btnexpand").css("position", "fixed").css("top", 0).css("left", 0).css('z-index',9999);
    
    $('#btnexpand').click(function(){ 
        $('[class$=com-hp-alm-core-client-styling-SimpleViewStyle-view]').css('top', '0');
        $('[class$=com-hp-alm-core-client-styling-SimpleViewStyle-header]').css('display', 'none');  
        $('.app-header').css('display','none');
        $('.app-master-hd').css('height',0);
        $('#content').css('top','85px');
    });
    
    $('body').append('<input type="button" value="restore" id="btnrestore">');
    
    $("#btnrestore").css("position", "fixed").css("top", 0).css("left", '60px').css('z-index',9999);
    
    $('#btnrestore').click(function(){ 
        $('[class$=com-hp-alm-core-client-styling-SimpleViewStyle-view]').css('top', '117px');
        $('[class$=com-hp-alm-core-client-styling-SimpleViewStyle-header]').css('display', 'block');
        $('.app-header').css('display','block');
        $('.app-master-hd').css('height', '90px');
        $('#content').css('top','144px');
    });
});