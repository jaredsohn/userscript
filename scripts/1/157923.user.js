// ==UserScript==
// @name        Grittttrss Driveby Sharing
// @namespace   grittttrss_driveby_sharing
// @description Share a page in your own tt-rss instance
// @include     http://*
// @include     https://*
// @grant       GM_addStyle
// @grant       GM_setValue
// @grant       GM_getValue
// @version     2
// ==/UserScript==


if (self == top) {
    /*--- Create a button in a container div.  It will be styled and positioned with CSS.
    */
    var zNode       = document.createElement ('div');
    zNode.innerHTML = '<button id="grittttrssButton" type="button">Add this page to your tt-rss shared items</button>';
    zNode.innerHTML += '<button id="grittttrssButtonCancel" type="button">✗</button>';
    zNode.setAttribute ('id', 'grittttrssDiv');
    document.body.appendChild (zNode);

    //--- Activate the newly added button.
    document.getElementById ("grittttrssButton").addEventListener ("click", ButtonClickAction, false);
    document.getElementById ("grittttrssButtonCancel").addEventListener ("click", disableGritttt, false);

    //--- Style our newly added elements using CSS.
    GM_addStyle ( " #grittttrssDiv { \
            color: rgb(34, 34, 34); \
            font-family: arial,sans-serif; \
            font-size: 20px; \
            margin-bottom: 5px; \
            margin-left: 5px; \
            margin-right: 5px; \
            margin-top: 5px; \
            padding-bottom: 5px; \
            padding-left: 5px; \
            padding-right: 5px; \
            padding-top: 5px; \
            position: fixed; \
            bottom: 0;\
            right: 0;\
            width: auto;\
            z-index: 222;\
        }\
        #grittttrssButton {\
            cursor:                 pointer;\
            opacity:                0.3;\
            font-family: sans-serif; \
            font-size: 15px; \
        }\
        #grittttrssButton:hover {\
            opacity:                1;\
            color:                  green;\
        }\
        #grittttrssButtonCancel {\
            cursor: pointer;\
            opacity: 0.6;\
            color: red;\
            font-family: sans-serif; \
            font-size: 15px; \
            padding-bottom: 0px; \
            padding-left: 0px; \
            padding-right: 0px; \
            padding-top: 0px; \
        }\
        #grittttrssButtonCancel:hover {\
            opacity: 1;\
        }\
        #grittttrssDiv p {\
            color:                  red;\
            background:             white;\
        }\
        #grittttrssDiv #grittttrssLoad {\
            background: white; \
            vertical-align: middle; \
        }" );
}

function disableGritttt () {
    document.getElementById("grittttrssDiv").style.display="none";
}

function GetGrittttURL () {
    var grittttURL = GM_getValue('grittttURL','');
    if ( grittttURL === '' ) {
        var value = prompt('Please enter your gritttt driveby sharing URL', 'http://example.org/gritttt/driveby-sharing/');
        if ( value !== null ) {
            var imgURL = value + '/gritttt-logo.png?' + Math.random();
            var img = new Image();
            img.src = imgURL;
            var zNode = document.createElement('p');
            zNode.innerHTML = 'Loading gritttt driveby sharing';
            zNode.setAttribute ('id', 'grittttrssLoad');
            document.getElementById("grittttrssDiv").appendChild(zNode);
            document.getElementById("grittttrssLoad").appendChild(img);
            console.log('img height: ' + img.height);
            if ( img.height > 0 ) {
                grittttURL = value;
                GM_setValue('grittttURL', grittttURL);
            }
            document.getElementById("grittttrssDiv").removeChild(document.getElementById("grittttrssLoad"));
        }
    }
    return grittttURL;
}

function ButtonClickAction (zEvent)
{
    var delNode = document.getElementById("grittttrssError");
    if ( delNode ) {
        document.getElementById("grittttrssDiv").removeChild(delNode);
    }
    var gritttt_url=GetGrittttURL();
    console.log('gritttt url: ' + gritttt_url);
    if ( gritttt_url === '' ) {
        var zNode = document.createElement('p');
        zNode.innerHTML = 'Unable to locate gritttt driveby sharing URL';
        zNode.setAttribute ('id', 'grittttrssError');
        document.getElementById("grittttrssDiv").appendChild(zNode);
        return;
    }
    var tt_config=document.createElement('script');
    tt_config.type='text/javascript';
    tt_config.src=gritttt_url+'/config.js?x='+(Math.random());
    document.getElementsByTagName('head')[0].appendChild(tt_config);
    setTimeout(function(){
                   var tt_script=document.createElement('script');
                   tt_script.type='text/javascript';
                   tt_script.src=gritttt_url+'/dialog.js?x='+(Math.random());
                   document.getElementsByTagName('head')[0].appendChild(tt_script);
                   document.getElementById("grittttrssDiv").style.display="none";
               },1000);
}
