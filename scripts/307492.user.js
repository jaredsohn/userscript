// ==UserScript==
// @name       BTC-E Trollbox Enlarger PLUS
// @namespace  com.btc-e.enlarger.plus
// @date       2014-02-02
// @version    1.1
// @description  Makes the Trollbox bigger
// @match      https://btc-e.com/*
// @installURL http://userscripts.org/scripts/source/307492.user.js
// @updateURL  http://userscripts.org/scripts/source/307492.meta.js
// @homepageURL  http://userscripts.org/scripts/show/307492
// @icon       http://s3.amazonaws.com/uso_ss/icon/307492/large.png
// @copyright  2014+ luke3
// ==/UserScript==

BigTrollbox = function() {
    //set all the variables needed
 	var content = $('#content');
    var rightCol = $('#nChatCon');
    var nChat = $('#nChat');
    var nChatCon = $('#nChatCon');
    var bodyWidth = $(document).width();
    var nChatDPW = nChat.parent().parent().width();
    //Set the right column to be 100% width minus the left column.
    rightCol.parent().parent().width(bodyWidth - 680);
    //Set the width of the trollbox
    nChat.width(nChatDPW);
    //Set height of trollbox container
    nChatCon.height('700px');
    //set height of trollbox content
    nChat.height('680px');
    //Function below is to auto enable trollbox chat refresh
    var chatEnableB = $('#nChatRefreshBtn');
    if(chatEnableB.is(":visible")){
    $('#nChatRefreshBtn a').click();
    }
    content.width('100%');
    //auto refresh the script every 2 seconds (for browser resizing, page content refreshes etc)
    setTimeout(BigTrollbox, 2000);
};
//run this script on page load
BigTrollbox();