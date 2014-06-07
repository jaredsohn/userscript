// ==UserScript==
// @name           Codechef Assistant
// @namespace      codechef assistant
// @description    Assists a Codechef (www.codechef.com) user by displaying the questions he/she has attempted and have been accepted
// @include        http://www.codechef.com/problems/easy*
// @include        http://www.codechef.com/problems/medium*
// @include        http://www.codechef.com/problems/hard*
// @include        http://www.codechef.com/problems/challenge*
// @include        http://www.codechef.com/problems/extcontest*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js   
// ==/UserScript==

/*
 * Author : Rajat Khanduja
 * Chrome extension can be found at https://github.com/rajatkhanduja/Codechef-assistant
 *
 * 
 * CHANGELOG
 * ---------
 *   25/6/12  : Editted code to match the change in site.
 *   12/1/12  : Code clean up
 *   12/1/12  : Now, script doesn't put tick-marks for anonymous (not logged-in) users. 
 */


$(function() { 
var img_url = "http://www.clker.com/cliparts/e/2/a/d/1206574733930851359Ryan_Taylor_Green_Tick.svg.med.png";
// Check if the user is logged in
var login_text = jQuery('div.login-user').text();

if ( login_text == "")
{
  // Not logged in. Exit from function
  return(0);
}

var user_link = jQuery('div.login-user a').attr('href');    // This link contains the necessary information.
// Get the list of solved problems in an array.

var t = jQuery.ajax(
  {
    url : user_link,
    datatype : "html",
    success : function (data) {
      var i = 0 ; 
      links_array = new Array ();
      $(data).find('td a').each (function(){
      	link = $(this).attr('href');
        if (link.indexOf('status') != -1)
        {
          links_array[i++] = "/problems/" + $(this).attr('href').split(',')[0].match(/[a-zA-Z0-9]+/g)[1];
        }
      });
      // Appending a tick mark.
      $('.problems tr a').each(function(){
      	link = $(this).attr('href');
        if (links_array.indexOf(link) != -1)
        {
          //alert(link); 	 
          $(this).after("<img class='tick-mark' src='"+ img_url +"' width='18' height='14' />");
          $('img.tick-mark').css('float','right');
        }
      });
    }
  });
});