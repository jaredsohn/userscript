// ==UserScript==
// @name        Toggle Android Dev Content Index
// @namespace   http://come.danielkao.userscript/androideDev
// @include     http://developer.android.com/training/*
// @include     http://developer.android.com/guide/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js 
// @version     1
// ==/UserScript==
$(function(){
    var isNavShown = true;
    function toggleIndex(){
        $nav = $('#side-nav');
        if(isNavShown){
            $nav.fadeOut(function(){
            $('#doc-col').width(860);});
        }else{
            $('#doc-col').width(700);
            $nav.fadeIn();
            
        }
        
        isNavShown = !isNavShown;
    }
    
    $('.nav-x.col-9.develop').append('<li class="toggle"><input type="button" id="toggleButton" value="Toggle Index"></input></li>');
    $('#toggleButton').click(function(){toggleIndex();});

});

