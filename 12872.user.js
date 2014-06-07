 /*
 * Title: GMail Automatic Status Changer
 * Description: Greasemonkey script for Firefox to change the Status dynamically
 * Author: Gopal
 * Updated: 09/10/2007
 *
 */

 // ==UserScript==
 // @name GMail Status Changer
 // @namespace http://sagopal.blogspot.com
 // @include http://gmail.google.com/*
 // @include http://mail.google.com/*
 // @include https://gmail.google.com/*
 // @include https://mail.google.com/*
 // ==/UserScript==

 (function(){
     function status() {
     	 var myquotes = new Array();
	 myquotes[0] = "A for Apple";
	 myquotes[1] = "B for Ball";
	 myquotes[2] = "C for Cat";
	 myquotes[3] = "D for Dog";
	 myquotes[4] = "E for Eat";
	 myquotes[5] = "F for Fish";
         
         
         var divcheck = document.getElementById("1ewb");
         if (divcheck == null ) {
                return;
        }
        else
        {
        	var randomnumber=Math.floor(Math.random()*5)
        	document.getElementById("1ewb").innerHTML = myquotes[randomnumber];
        }
     }
    
    
     status();
 })()