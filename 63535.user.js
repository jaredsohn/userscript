// Author: Finn Pauls a.k.a. Happosai
// http://thesixtyone.com/happosai
// Released under Creative Commons 3.0.
// http://creativecommons.org/licenses/by/3.0/
// ==UserScript==
// @name           Happosai's TheSixtyOne RB Script
// @description A script to enhance thesixtyone.com.
// @namespace      http://finnpauls.de
// @include        http://*thesixtyone.com*
// @version     0.1.0.
// ==/UserScript==

GM_registerMenuCommand('Radio Bump', radiobump);
GM_registerMenuCommand('Go to current radio', go_to_current_radio);


function radiobump() {
    //When you are on a user page and listening to his radio, this will post a RB
    if(is_user_page()) 
        if(document.title!="thesixtyone - a music adventure") 
            document.getElementById('comments_post').value = "RB #"+get_listens()+" "+document.title; 
        else message("You are not listening to a song.");
    else message("You are not at a user profile.");
}

function is_user_page() {
    //Checks if you are on a user page
    return document.getElementById('listener_biography') ? true : false;
}


function get_listens() {
    //When you are on a user page, this gets the listens (plus 1) as Integer
    var rx=/\<b\>listens\<\/b> ([0-9]+)\<br\>/;
    rx.exec(document.getElementById('page_content').innerHTML);
    return parseInt(RegExp.$1)+1;
}

function message(text) {
    // You can use this function to create a TheSixtyOne Notice
    location.href = "javascript:void(t61.notice.create('"+text+"'))";
}

function go_to_current_radio() {
    //This function jumps to the user page of the radio you are currently listening to.
    location.href="javascript:(" + function() {
    if(t61.playlist.current.base_url) { 
        if(t61.playlist.current.base_url.slice(t61.playlist.current.base_url.length-6) == '/radio') {
            go_to(t61.playlist.current.base_url.slice(0,t61.playlist.current.base_url.length-5) );} 
        else {error();}} 
    else {error();} 
  
    function go_to(page) {t61.load_url(page); window.location.hash=page;} 
    function error() {t61.notice.create('You are not listening to a radio station.')}
} + ")()";
}

function store_radio_name()  {
    // Detects the user name of the radio. 
    location.href="javascript:(" + function() {
    if(t61.playlist.current.base_url) { 
        if(t61.playlist.current.base_url.slice(t61.playlist.current.base_url.length-6) == '/radio') {
            document.getElementById('ht61rb_radio').innerHTML = t61.playlist.current.base_url.slice(1,t61.playlist.current.base_url.length-6);} 
        else {document.getElementById('ht61rb_radio').innerHTML = "No Radio";}} 
    else {document.getElementById('ht61rb_radio').innerHTML = "No Radio";} 
 

} + ")()";
}

document.getElementById('miniplayer_titles').addEventListener("mouseover", store_radio_name, false);
document.getElementById('miniplayer_menu_contents').innerHTML = "<span id='ht61rb_radio'>No Radio</span>"+document.getElementById('miniplayer_menu_contents').innerHTML;
     
     