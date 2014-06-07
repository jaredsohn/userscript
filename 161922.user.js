// ==UserScript==
// @name           InForge unShitter
// @description    Removes some shit from InForge.net  
// @author         LucaFraga, Mavin.
// @license        GNU GPL v3 (http://www.gnu.org/licenses/gpl.html)
// @version        1.3
// @include        http://*.inforge.net/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==
var settings = [
true, // Reindirizza dalla nuova home al forum
true, // Rimuove la shoutbox
false, // Rimuove la sidebar (sempre)
true, // Rimuove la voce Upgrade a Premium sulla toolbar in alto
true, // Reimposta i colori dei link
true // Rimuove redirect di inforge
];
 
var homeURL = "http://www.inforge.net/community/content/";
var forumURL = "http://www.inforge.net/community/forum.php";
$(function () {
        if (settings[0] && document.URL == homeURL) {
                this.location = forumURL;
        }
 
        if (settings[1]) {
                $("form#s9_shout").hide();
        }
 
        if (settings[2]) {
                $("ul#sidebar").hide();
                $("div#content").width("100%");
                $("img#sidebar_button").hide();
        }
 
        if (settings[3]) {
                $("ul#notifications1").children().last().hide();
        }
 
        if (settings[4]) {
                $(".threadtitle .title, .username.understate, .popupmenu.memberaction a").css("text-decoration", "none");
                $(".threadtitle .title, .username.understate, .popupmenu.memberaction a").css("color", "#b02f1e");
                $(".threadtitle .title, .username.understate, .popupmenu.memberaction a").hover(
 
                function () {
                        $(this).css("color", "#ff9c00");
                },
 
                function () {
                        $(this).css("color", "#b02f1e");
                });
        }
        if (settings[5]) {
                $('a').click(function () {
                        var URL = this.href.replace('http://www.inforge.net/community/redirect.php?', '');
                        $(this).attr("href", decodeURIComponent(URL));
                });
        }
})