// ==UserScript==
// @name           LoL Referral Counter
// @namespace      LoL Referral Counter
// @description    LoL Referral Counter - goto http://*.leagueoflegends.com/referrals/index/complete to use this script
// @include        http://*.leagueoflegends.com/referrals/index/complete
// @include        http://*.leagueoflegends.com/referrals/index/complete#tabs
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.js
// ==/UserScript==


(function() {
  function embedFunction(s) {
document.body.appendChild(document.createElement('script')).innerHTML =
s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
 }

  function myKickassGreasemonkeyScript() {
    console.profile();
$.noConflict();
$(document).ready(function() {

var count2 = 0;
var pathname = $(location).attr('href');

pathname = pathname.replace('http://','').split('.');

            var count = 0;

        var max = $('li.pager-text em:last').html();

        for (var i = 0; i < max; i++) {
		$.get("http://"+pathname[0]+".leagueoflegends.com/referrals/index/complete?page=" + 

(i), function (data) {

			$(data).find("tbody tr").each(function() {

				if ($(this).find("td:last").html() > 4)
				{
					count ++;
					
				}
if ($(this).find("td:last").html() > 0 & $(this).find("td:last").html() < 5)
				{
					count2 ++;
					
				}
$('div.page_header_text').html(count + ' Complete : ' + count2 +' Inprogress');
			});

        	});

	}
});

function kickass() {
      console.time("Block1");
      // Block of code that might take a lot of time
      console.time("Block2");
      // another block of code
      console.timeEnd("Block2");

      console.timeEnd("Block1");

    }

// more cowbell

console.profileEnd();
  }

  embedFunction(myKickassGreasemonkeyScript);
  // Method 1: embed the function call into the current page
  document.body.appendChild(document.createElement('script')).innerHTML = 

"myKickassGreasemonkeyScript();";
  // Method 2: directly call the function using unsafeWindow
//     window.addEventListener("load", function(e) {
//                   unsafeWindow.myKickassGreasemonkeyScript();
//                   this.removeEventListener('load',arguments.callee,false);
//                 }, false);

 })();