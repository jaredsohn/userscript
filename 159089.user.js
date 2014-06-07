// ==UserScript==
// @name        KOC Move the Chat box 
// @namespace   AskMrFun 
// @include     https://www.kingdomsofcamelot.com/* 
// @include     https://www402.kingdomsofcamelot.com/*
// @include     *kabam.com/games/kingdoms-of-camelot/play*
// @version     4
// ==/UserScript==

var interval = setInterval( function(){ changeCSS()}, 10000);

function changeCSS() { 
    if ( document.URL.indexOf('kabam.com/games/kingdoms-of-camelot/play') > 0 ) {
        var iframe1 = document.getElementById('game_frame');
        console.log( iframe1 + 'game_frame' );
        var iframe1Text = iframe1.style.cssText;
        iframe1.style.cssText = iframe1Text + 'width:1130px;';
        clearInterval(interval);
    }
    
    if ( document.URL.indexOf('www.kingdomsofcamelot.com') > 0 ) { 
        var kocIframe = document.getElementById('kocIframes1'); // has game koc iframe
        if ( kocIframe != null) { 
            console.log('has game'); 
            kocIframe.setAttribute('width',1130); 
            clearInterval(interval); 
        } 
    }
    
    if ( document.URL.indexOf('www402.kingdomsofcamelot.com') > 0 ) { 
        var chatPanel = document.getElementsByClassName('mod_comm'); 
        
        if ( chatPanel != null && chatPanel.length > 0 ) { //chat panel exist
            chatPanel[0].style.position = 'absolute'; 
            chatPanel[0].style.left = '760px'; 
            chatPanel[0].style.top = '-570px'; 
            chatPanel[0].style.background = ' white url("http://s20.postimage.org/7glylvbp9/kocchatbg.jpg") top left'; 
            chatPanel[0].style.height = "553px";
            
            var chatPanelList = document.getElementById('mod_comm_list2'); 
            if ( chatPanelList != null ) { //chat panel list exist
                chatPanelList.style.height = "380px";
            } 
            
            var chatPanelList = document.getElementById('mod_comm_list1'); 
            if ( chatPanelList != null ) { //chat panel list exist
                chatPanelList.style.height = "380px";
            } 
            clearInterval(interval); 
        } 
    } 
} 
