// ==UserScript==
// @name        HISinOne Suchmenü
// @namespace   HISinOne
// @description Suchleiste für das Menü
// @include     http://localhost/qisserver/*
// @include     https://localhost/qisserver/*
// @include     http://*.his.de/qisserver/*
// @include     https://*.his.de/qisserver/*
// @include     http://localhost:8080/qisserver/*
// @include     https://localhost:8080/qisserver/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @version     1.6
// ==/UserScript==

/**
# Variablen
*/

var inputStyle = "color: #ccc; font-size:90%; font-style:italic;";
var inputStyleActive = "color: #014A7B; font-size:90%; font-style:normal;";
var resultsStyle = "position:absolute; left:10px; text-align:left; display:block; color: #014A7B; padding:5px; width:auto; height:auto;";
var resultBoxClass = "box_blue_bg_white";
var resultLimit = 30;

/* DO NOT EDIT BEYOND THIS LINE */
/*
# Menü auslesen und als array mit Name als Schlüssel und link als Wert speichern
# Suchleiste in Seite einfügen
# passende Menüeinträge suchen und live anzeigen.
*/
var position = $('.loginstatus_hisinone').position();

$('.loginstatus_hisinone').prepend('<div id="searchMenuResults" class="'+resultBoxClass+' top:'+(position.top+20)+'px" style="'+resultsStyle+'" ></div>');
$('.loginstatus_hisinone').prepend('<input type="text" name="searchMenuExt" id="searchHISinOneMenuExt" style="'+inputStyle+'" size="10" value="Menü durchsuchen" tabindex="1"/>');

var allMenuElements = $('.topMenuContainer').find('a');


/* runs on pagerendering finished */
$(function() {
    /* hide results box, only show when results are there */ 
    $("#searchMenuResults").hide();
});


$("#searchHISinOneMenuExt").focus(function(){
        if($(this).val() == 'Menü durchsuchen'){
            $(this).val('');
            $(this).attr('style',inputStyleActive);
        }
    }
);
$("#searchHISinOneMenuExt").blur(function(){
        if($(this).val() == "" ){
            $(this).val('Menü durchsuchen');
            $(this).attr('style',inputStyle);
        }
    }
);

$("#searchHISinOneMenuExt").keyup(function () {
    var value = $(this).val();
    if(value.length < 1){
        $("#searchMenuResults").empty();
        $("#searchMenuResults").hide();
    }
    if(value.length > 0){
        $("#searchMenuResults").show();
        //alert(value);
        /* build result list */
        var resultList = new Array();
        
        /* go through all menu elements */
        for(var n=0; n < allMenuElements.length; n++){
            
            /* build a Regular expression from the search String */
            var values = value.split(' ');
            var searchString = '';
            for(var i=0; i < values.length; i++){
                if(i==values.length-1){
                    searchString += values[i];
                }else{
                    searchString += values[i]+'.+';
                }
            }
            //alert(searchString);

            /* look for the search String in every menu item. Push them to result array, if something matches*/
            var search = new RegExp(searchString, 'i');
            var result = search.exec(allMenuElements[n].text);

            if(result != null && result.length > 0){
                //alert(allMenuElements[n].text);
                resultList.push(allMenuElements[n]);
            }
        } 
        /* clear the resultdiv from previous results*/
        $("#searchMenuResults").empty();
        /* append all results to the resultdiv*/
        for(var n=0; n < resultList.length ; n++){
            if(n+1<resultLimit){
                var link = '<p><a href="'+resultList[n]+'" target="_self" tabindex="'+(n+2)+'" >'+resultList[n].text+'</a></p>';
                $("#searchMenuResults").append(link);
            }
        }
        /** show notice when no result was found*/
        if(resultList.length == 0){
        
            if(value.toLowerCase() == "hallo"){
                $("#searchMenuResults").append("<p>Hallo auch!</p>");
            }
            if(value.toLowerCase() == "sudo"){
                $("#searchMenuResults").append("<p>Ich bin keine Linux Konsole!</p>");
            }
            if(value.toLowerCase() == "motivation"){
                $("#searchMenuResults").append("<p>Hier bekommst Du welche: <a href='http://ifeelunmotivated.com/' target='_blank'>ifeelunmotivated.com</a></p>");
            }
            if(value.toLowerCase() == "chuck norris"){
                $("#searchMenuResults").append("<p>Chuck Norris kann nicht gefunden werden, Chuck Norris findet Dich!</p>");
                $("#searchMenuResults").append("<p><img src='http://timwahrendorff.de/upload/images/seiten/chuck-norris.jpg' /></p>");
            }
            if(value.toLowerCase() == "author"){
                $("#searchMenuResults").append("<p>Diese Erweiterung wurde von Tim Wahrendorff (<a href='http://timwahrendorff.de/' target='_blank'>timwahrendorff.de</a>) erstellt</p>");
                $("#searchMenuResults").append("<p><img src='http://timwahrendorff.de/upload/images/blog/face.png' /></p>");
                
            }
            if(value.toLowerCase() == "92"){
                $("#searchMenuResults").append("<p>93?</p>");
            }
            if(value.toLowerCase() == "92 93"){
                $("#searchMenuResults").append("<p>94?</p>");
            }
            if(value.toLowerCase() == "92 93 94"){
                $("#searchMenuResults").append("<p>95?</p>");
            }
            if(value.toLowerCase() == "92 93 94 95"){
                $("#searchMenuResults").append("<p>SEEEEECHSUNDNEUNZIG!!!</p>");
            }
            $("#searchMenuResults").append("<p>Es wurden keine passenden Menüeinträge gefunden.</p>");
        }
        
    }
	
}).keyup();



