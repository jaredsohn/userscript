// ==UserScript==
// @name        Facebook Old NavBar 
// @namespace   https://www.facebook.com
// @include     https://www.facebook.com/*
// @version     2
// @grant       none
// @require     https://code.jquery.com/jquery-1.11.0.min.js
// ==/UserScript==

$.noConflict();
jQuery( document ).ready(function($) {
    
    /*** Configuration ***/
    var defaultNickName = 'LaNouille974';
    var defaultPic = 'http://img11.hostingpics.net/pics/962935runico.png';
    /**** End Configuration ***/
    
    var originalNavRight = $('div#headNav > div.rfloat');
    
    //Cloner la navRight
    var newNavRight = originalNavRight.clone();
    
    
    //Un peu de CSS pour les nouvelles navBar
    newNavRight.css({
        'float': 'left',
		'margin-left': $("h1#pageLogo").width() + 'px',
		'margin-right': '10px'
    });
    
    
    //Retirer les éléments indésirables de chaque navBar
    removeNavElements(originalNavRight, 'old');
    removeNavElements(newNavRight, 'new');
    
    
    //Personnalisation
    var li = $("<li/>");
    li.attr('id', 'thenoodle');
    li.attr('title', 'Cliquer pour changer le texte');
    li.addClass('navItem tinyman litestandNavItem').text(defaultNickName);
    li.prependTo(originalNavRight.children('ul:first'));
    
    $('li#thenoodle').css({
        'height': '25px',
        'color': 'white',
        'font-weight': 'bold',
        'position': 'relative',
        'left': '-25px',
        'background-image': "url('"+ defaultPic +"')",
        'background-repeat': 'no-repeat',
        'background-size': '25px 25px',
        'padding-left' : '32px',
         'cursor': 'pointer'
    });
    
    //Changer le pseudo à la volée
    $('li#thenoodle').click(function(){
        changeNickName($(this));
    });
    
    //Ajoute la nouvelle navBar à gauche
    newNavRight.prependTo('div#headNav');
    
    //Modifier emplacements popup
    //Messages
    $("#fbMessagesJewel").click(function() {
        //Fleche
        $('#jewelContainer #fbMessagesJewel.fbJewel .beeperNub').css({
             'right': '0',
             'left': '35px'
        });
        
        //Popup
        $('#jewelContainer #fbMessagesFlyout.fbJewelFlyout').css({
            'right': '0',
             'left': '-30px'
        });
    });
    
    //Friends requests
    $("#fbRequestsJewel").click(function() {
        //Fleche
        $('#jewelContainer #fbRequestsJewel.fbJewel .beeperNub').css({
            'left': '4px' 
        });
        
        //Popup
        $("#jewelContainer #fbRequestsFlyout").css({
            'left': '0',
        });
    });
    
    //Notifications
    $('#fbNotificationsJewel').click(function(){
        //Fleche
        $('#jewelContainer #fbNotificationsJewel.fbJewel .beeperNub').css({
            'right': '0',
             'left': '4px'
         });
        
        //Popup
        $("#jewelContainer #fbNotificationsFlyout").css({
            'right': 'auto',
        });
    });

    
    /*** FUNCTIONS ***/
    
    //Retire les li indésirables de la navBar passé en param
    //Type = old ou Type = new
    function removeNavElements(navBar, type) {
      
        var elementsToRemove = [];
        
        if (type == 'new')
            elementsToRemove = [0, 1, 4, 5, 6];
        else
            elementsToRemove = [2, 3];
        
        navBar.children('ul:first').children('li').each(function(i) {
            
            //console.log(elementsToRemove);
            
            if ($.inArray(i, elementsToRemove) !== -1) {
               $(this).remove();
               //console.log(i);
            }
        });
    }
    
    function changeNickName(domElem) {
        var precNickName = domElem.text();
        var newNick = '';
        
        do {
            newNick = prompt('Nouveau texte (12 caractères max, taper "!q" pour quitter) :');
            
            if (newNick === null || newNick == '!q') break;
            else if (newNick.length > 12) 
                alert('Nouveau texte trop long ! 12 caractères max. (' + newNick.length + ' saisis)');
            
        } while (newNick.length > 12 || newNick == '')
        
        console.log(newNick);    
        
        if (newNick == null ) {
            if (precNickName == '')
                newNick = defaultNickName;
            else
                newNick = precNickName;
        } 
        else if(newNick == '!q') newNick = precNickName;    
            
        domElem.text(newNick);
    }
});