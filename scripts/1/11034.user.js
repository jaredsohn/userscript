// ==UserScript==
// @name          Red vs. Blue Mass Commenter
// @author     TeamColtra
// @description   A piece of sex script that allows you to put a comment in all your friends profiles quick and easy
// @include       *.roosterteeth.com/*
// ==/UserScript==
// Created by TeamColtra http://rvb.roosterteeth.com/members/profile.php?uid=23150


// ====EDIT THIS====
 text = "They See Me Rolling... They haten'... They patrollen trying to catch me riden' dirty."


 // ====Don't Edit this Silly Goose====
 var theInput = document.getElementById("body"); 
 theInput.value = text;