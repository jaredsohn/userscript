// ==UserScript==
// @name        Firedrive Putlocker Sockshare Skip
// @namespace   PSFD
// @description Skip waiting screen at Firedrive, Putlocker, Sockshare and 12 more video hosting sites.
// @version     2.1.1
// @include     http://www.putlocker.com/*
// @include     http://www.sockshare.com/*
// @include     http://www.firedrive.com/file/*
// @include     http://billionuploads.com/*
// @include     http://bestreams.net/*
// @include     http://thefile.me/*
// @include     http://www.promptfile.com/*
// @include     http://filenuke.com/*
// @include     http://www.mightyupload.com/*
// @include     http://www.zalaa.com/*
// @include     http://www.uploadc.com/*
// @include     http://sharesix.com/*
// @include     http://nosvideo.com/*
// @include     http://www.vidhog.com/*
// @include     http://movpod.in/*
// @include     http://hipfile.com/*
// @include     http://uploadboy.com/*
// @include     http://gorillavid.in/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @author      drhouse
// ==/UserScript==

$(document).ready(function () {
    
    if (top.location != location && location != "http://sharesix.com/blank.html" && location != "http://www.sockshare.com/adblock_test.php" && location != "http://filenuke.com/blank.html" ) {
        top.location.href = document.location.href ;
    }
    
    //firedrive
    setInterval(function () {$('#prepare_continue_btn').click();}, 3000);
    $('#fdvabox').remove();
    setInterval(function () { //autostart firedrive
        var selector = '#play_video';
        if ($(selector).is(":visible")){
            $( selector ).click();
            $( selector ).remove();
        }
    }, 1000);
    
    //thefile
    $('head').append("<script type='text/javascript'>firstDisplay=false;</script>");
    $('#method_free').click();
    
    //gorillavid
    setTimeout(function () {$('#btn_download').click();}, 6000);
    
    //hipfile
    if (location.href.toString().indexOf("hipfile") != -1){
        $('#btn_download > input[type="submit"]:nth-child(6)').click();
        setInterval(function () {$('#btn_download').click();}, 17000);
        setTimeout(function () {$("#chlink").prop('checked', false); 
                                $('button').click()}, 1000);        
    }
    
    //billionuploads | bestreams | movpod
    if (location.href.toString().indexOf("billionuploads") != -1 || parent.location.href.toString().indexOf("bestreams") != -1 || parent.location.href.toString().indexOf("movpod") != -1){
        setInterval(function () {$('#btn_download').click();}, 1000);
    }
    setInterval(function () { //autostart billionuploads
        var selector = '#h5ip > div.vjs-big-play-button';
        if ($(selector).is(":visible")){
            $( selector ).click();
            $( selector ).remove();
        }
    }, 1000);
    
    //promptfile
    $('.gray_btn').click();    
    
    //filenuke
    $('.btn-big2-2').click();
    
    //zalaa | uploadc
    $('#ipcount').click();
    
    //nosvideo 
    setInterval(function () {$('#btn').click();}, 9000);
    
    //vidhog
    setInterval(function () {$('#btn1_download').click();}, 16000);    
    
    //sharesix
    $('#method_free.btn-big2-2').click();
    
    //uploadboy
    if (location.href.toString().indexOf("uploadboy") != -1){
        $('#center_main_rep > div.center_php > div > form > div > table > tbody > tr > td:nth-child(1) > p > input[type="submit"]').click();
        $('#center_main_rep > div.center_php > div > div > a > img').click();
        setTimeout(function () {$('#btn_download').click();}, 42000);
    }
    
    //sockshare
    var element =  document.getElementById('submitButton');
    if (typeof(element) != 'undefined' && element != null) {
        element.disabled = false;
        setInterval(function () {element.click(); }, 1000);
    }
    setInterval(function () { //autostart sockshare
        var selector = '#harmo > div > div > table > tbody > tr > td:nth-child(2) > span > a';
        if ($(selector).is(":visible")){
            $( selector ).click();
            $( selector ).remove();
        }
    }, 1000);
});