// ==UserScript==
// @name           Better Gamernook
// @author         William Clemens
// @namespace      System
// @version        0.2
// @description    This improves the overall experience of Gamernook
// @license        This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.
// @include        http://www.gamernook.com/*
// @include        http://gamernook.com/*
// ==/UserScript==

GM_setValue("Version", "0.2");



/* 
 * Change log:
 *  .1 (init release): -added accept all to friend requests.
 *                -removed adds
 *  .2: -cleaned up chat windows by removing ads to give more screen space.
 *      -friend request now update friend request count
 */



// Add jQuery  
// Gamer nook use jQuery how usefull ;)

// Check if jQuery's loaded  

function GM_wait() {  
     if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }  
     else { $ = unsafeWindow.jQuery; letsJQuery(); }  
} GM_wait();  

// All your GM code must be inside this function  
function letsJQuery() {

	$("#google_ads_iframe_Non_VCM_Top_LB").remove();
	$("#google_ads_div_Non_IndieClick_MR").remove();
	$(".ad_top_lb").remove();
	$("#box3").remove();
	$(".ad_mr").remove();

//
//Chat window pop-up
//
  regExp = new RegExp("^\/chat\/popup\/gamernook");
  if(regExp.test(location.pathname))
  {
    $("input[value='I Agree']").click(function(event){
			window.location.replace("/chat/webchat/gamernook-lobby/");
			event.preventDefault();
		});
  }


	//

	//Friend Request Page

	//

	regExp = new RegExp("^\/friend\/requests");

	if(regExp.test(location.pathname))

	{

		// add accept all button

		$("div.main_content div.box table tbody").prepend("<tr><td><a id='acceptAll' href='#'> Accept All Requests </a></td></tr>");

		// get count of pages 

		var totalPages=$("div.paginator span").length - 2

		// make accept all button work (I need more friend request to test this part)

		$("#acceptAll").click(function(event){

			var friendCount = 0;

			while(totalPages > 0)

			{

				$.get("/friend/requests/page/"+totalPages+"/",{ },function(returnData){

					$("div.main_content div.box table tbody tr td div a:contains(Accept Request)",returnData).each(function(){

						$.ajax({url:$(this).attr("href")});

										});

				});

				totalPages--;

			}

			$("div.main_content div.box").html("<h2>All Friends have been accepted</h2>");

			$("div.paginator").empty();
			$("li.new_friend_request_item").remove();

			event.preventDefault();

		});



		//make accept just accept not redirect

		$("div.main_content div.box table tbody tr td div a:contains(Accept Request)").click(function(event){

			$.ajax({url:$(this).attr("href")});

			$(this).parent().html("Accepted");
			//update friend request count;

			var friendRequestItem = $("li.new_friend_request_item a");
			var friendRequestCount = friendRequestItem.html().split(" ")[0]	-1
			if( friendRequestCount > 0 ){
				friendRequestItem.html( friendRequestCount + " Friend Requests");
			}
			else{
				$("li.new_friend_request_item").remove();

			}
			//stop redirect
			event.preventDefault();

		});



		//makes deny Request just deny not redirect

		$("div.main_content div.box table tbody tr td div a:contains(Deny Request)").click(function(event){

			$.ajax({url:$(this).attr("href")});

			$(this).parent().html("P0wned");

			event.preventDefault();

		});

	}

     }