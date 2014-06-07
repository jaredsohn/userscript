// ==UserScript==
// @name        YouTube WindowFiller
// @namespace   http://userscripts.org/users/591389
// @description Maximizes any YouTube video to fill the whole window.
// @include     https://www.youtube.com/*
// @include     http://www.youtube.com/*
// @include     https://www.youtu.be/*
// @include     http://www.youtu.be/*
// @version     1.3
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// ==/UserScript==

if(isFullWindow()){

    document.title = 'YouTube Player';

}else if(window.setFeatherOption){

    $('#vo').append('<button id="yt-windowfiller" class="b" style="' +

                    'padding:4px;'+
                    'margin-left:10px;'+

                    '"><img style="margin-right:5px;" src="http://i.imgur.com/BMk6nUE.png">Fill window</button>');

    $('#yt-windowfiller').click(function(){
        document.location.href = getVidCode();

    });
    
    window.alert = function() {};
    
}else{

    addButton();
    startMonitor();

}

function startMonitor(){

    var legacyURL = document.URL;

    setInterval(function(){
        if(document.URL !== legacyURL){
            addButton();
            legacyURL = document.URL;
        }
    }, 100);
    
}

function addButton(){
    setTimeout(function(){
        $('#watch7-sentiment-actions').append('<button id="yt-windowfiller" style="' +

                                              'cursor:pointer;'+
                                              'border:1px #999999 solid;'+
                                              'padding:5px;'+
                                              'border-radius:3px;'+

                                              '">Fill window</button>');

        $('#yt-windowfiller').click(function(){
            document.location.href = getVidCode();
        });

    }, 500);   
    
}

function isFullWindow(){
    
    return document.URL.charAt(24) === 'v';
    
}

function getVidCode(){

    var vidCode = '';

    for (var i = 0; i < document.URL.length; i++){
        if(document.URL.charAt(i) === 'e'){

            vidCode = document.URL.substring(i+14);

            for (var k = 0; k < vidCode.length; k++){
                if (vidCode.charAt(k) === '&'){
                    vidCode = vidCode.substring(0,k);
                }
            }

            return 'https://www.youtube.com/v/' + vidCode + '&autoplay=1&showinfo=0&modestbranding=1&rel=0&fs=0&autohide=0&iv_load_policy=0';
        }
    }
}