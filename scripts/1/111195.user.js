// Tembel Sözlük !!
// version 0.1 BETA!
// 2011-08-15
// Copyright (c) 2011, Abdullah Akay
// download: http://bilmuh.gyte.edu.tr/~akay/download/tembel_sozluk.user.js
// web page: http://abdullahakay.blogspot.com/2011/08/tembel-sozluk.html
// email: akayabd@gmail.com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Dikkat,, veriler tureng.com dan cekilmektedir..

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Tembel Sozluk
// @namespace     *
// @description   English - Turkish sozluk
// @include       *
// ==/UserScript==


var mouseX = 0, mouseY = 0;
var isCloseCommand = false;

var all_response = 'bos';
var myDiv = document.createElement('div');
var divIdName = 'div1';
myDiv.setAttribute('id', divIdName);
myDiv.style.width = "300px";
myDiv.style.height = "1000px";
myDiv.style.left = "100px";
myDiv.style.top = "100px";
myDiv.style.position = "absolute";
myDiv.style.background = "#CCFFFF";
myDiv.style.border = "1px solid #000000";
myDiv.style.color = "#000000";
myDiv.innerHTML = all_response;
myDiv.style.visibility = 'hidden';
myDiv.style.opacity = 0.9;



function init(){

    document.body.appendChild(myDiv);

}

function terminate(){

    document.body.removeChild(myDiv);

}






myDiv.addEventListener('mousedown', function(event) {

    myDiv.style.visibility = 'hidden';

	isCloseCommand = true;

	if ( null != document.getElementById(divIdName) )
		terminate();


}, false);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//get mouse pos
document.addEventListener('mousemove', function(event) {

    mouseX = event.pageX;
    mouseY = event.pageY;

	isCloseCommand = false;

    

}, false);


//Add listener for mouse clicks
document.addEventListener('dblclick', function(event) {


    if (event.button == 0) {

	
		if ( null != document.getElementById(divIdName) )
			terminate();
        init();

         var text = document.getSelection();


        query(text, mouseX, mouseY);

    }


}, false);


//Add listener for mouse clicks
document.addEventListener('mouseup', function(event) {


	if ( isCloseCommand == true )
		return;



     if (event.button == 0) {

         var text = document.getSelection();

         if( '' == text ){

            return;
         }
		 
		if ( null != document.getElementById(divIdName) )
			terminate();
        init();


         query(text, mouseX, mouseY);

     }


}, false);


function query(text, mouseX, mouseY) {


    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://tureng.com/search/' + text,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        onload: function(responseDetails) {
            myDiv.innerHTML = 'Request for Atom feed returned ' + responseDetails.status +
                ' ' + responseDetails.statusText + '\n\n' +
                'Feed data:\n' + responseDetails.responseText;


            var table = document.getElementById('englishResultsTable');

            if (table == null) {
                myDiv.innerHTML = "no result";
                return;
            }

            var results = table.innerHTML;


            var lastChar = text.charAt(text.length - 1);

            if (lastChar == ' ')
                text = text.slice(0, text.length - 1);


            //discard unnecesary info
            results = results.replace(new RegExp("</tr>", "gi"), "<br/ >");
            results = results.replace(new RegExp("&gt;", "gi"), " ");
            results = results.replace(new RegExp(text, "gi"), "&nbsp&nbsp");
            results = results.replace(new RegExp('/search/', "gi"), "http://tureng.com/search/");
			results = results.replace(new RegExp('<a href', "gi"), "<a style='color: #0000FF' href");


            myDiv.innerHTML = '<strong>' + text + '</strong> <br />' + results;


            myDiv.innerHTML  += '<strong><br/><br/><br/><br/><br/> 2011, Abdullah Akay<br/> ' +
                 'web page: http://abdullahakay.blogspot.com/2011/08/tembel-sozluk.html<br/>' +
                 'email: akayabd@gmail.com<br/>' +
                'veriler tureng.com dan cekilmektedir</strong>';

	

            myDiv.style.left = mouseX + 20 + "px";
            myDiv.style.top = mouseY + 20 + "px";

            myDiv.style.visibility = 'visible';




}})}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
