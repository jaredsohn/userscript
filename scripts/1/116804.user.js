// ==UserScript==
// @author          DzaDze
// @name            MYEREP
// @namespace       wow.myerep.com
// @description     DzaDze
// @version         1.0.2
// @match           http://*.erepublik.com/*
// @include         http://*.erepublik.com/*
// @require         http://sizzlemctwizzle.com/updater.php?id=115550&days=1&uso&show
// ==/UserScript==
// update 成功！gghello
/*!-- eRepublik Auto Refresh http://userscripts.org/scripts/review/112377 --*/
if (document.getElementsByTagName('title')[0].innerHTML.indexOf('500 - Internal Server Error')!=-1) setTimeout(function() { 
	document.location.reload(); } , 500);
	
var myerep = function($, window, undefined) {
	/*!-- custom my homepage --*/
	$(document).ready(function () {
		// change top bar
		$('#menu ul li#menu1 a').css('background-image','url(\"https://lh5.googleusercontent.com/-SaMj5Ta2z4E/TqPTEY1QCcI/AAAAAAAAAC8/g4L5rU_0Zts/s0/map-erepublik-logged-wmno.png\")');
		$('#menu ul li#menu2 a').css('background-image','url(\"https://lh5.googleusercontent.com/-SaMj5Ta2z4E/TqPTEY1QCcI/AAAAAAAAAC8/g4L5rU_0Zts/s0/map-erepublik-logged-wmno.png\")');
		$('#menu ul li#menu3 a').css('background-image','url(\"https://lh5.googleusercontent.com/-SaMj5Ta2z4E/TqPTEY1QCcI/AAAAAAAAAC8/g4L5rU_0Zts/s0/map-erepublik-logged-wmno.png\")');
		$('#menu ul li#menu4 a').css('background-image','url(\"https://lh5.googleusercontent.com/-SaMj5Ta2z4E/TqPTEY1QCcI/AAAAAAAAAC8/g4L5rU_0Zts/s0/map-erepublik-logged-wmno.png\")');
		$('#menu ul li#menu5 a').css('background-image','url(\"https://lh5.googleusercontent.com/-SaMj5Ta2z4E/TqPTEY1QCcI/AAAAAAAAAC8/g4L5rU_0Zts/s0/map-erepublik-logged-wmno.png\")');
		$('#menu ul li#menu6 a').css('background-image','url(\"https://lh5.googleusercontent.com/-SaMj5Ta2z4E/TqPTEY1QCcI/AAAAAAAAAC8/g4L5rU_0Zts/s0/map-erepublik-logged-wmno.png\")');
		// improve something
		$('#menu > ul > li#menu2').append('<ul>'+
                        '<li><a href=\"http://www.erepublik.com/en/economy/inventory\" target="_self">Inventory</a></li></ul>');
		$('#menu > ul > li#menu3').append('<ul>'+
			'<li><a href=\"http://www.erepublik.com/en/newspaper/legalize-weed-254870/1\" target="_self">DzaDze News</a></li>' +
			'<li><a href=\"http://economy.erepublik.com/en/company/employees/legalize-weed-q5-weapons/2182191/44\" target="_self">My Q5 Weapons</a></li>' +
			'<li><a href=\"http://www.erepublik.com/en/main/group-home/military" target="_self">MU PanzeR</a></li></ul>');
		$('#menu > ul > li#menu5 > ul').prepend('<li><a href=\"http://www.erepublik.com/en/news/latest/all\" target="_self">News</a></li>');
		// change menu6 url
		$('#menu ul li#menu6 a').attr('href','#');
		$('#large_sidebar > .user_missions').hide();
		$('.at').hide();
		// $('#header > #logo').hide();
		// remove ad and useless part
		$('#large_sidebar > .banner_place').remove();
		if ((document.location.toString()==='http://www.erepublik.com/en') || (document.location.toString().indexOf('?viewPost=')!==-1)) {
			$('#citizen_feed > .previous_posts > a').trigger('click');
                        $('#citizen_feed > .show_regiment_feed').hide();
		}
	});
};
// Script Insert
var script = document.createElement('script');
script.textContent = '(' + myerep + ')(jQuery, window);';
document.body.appendChild(script);