// ==UserScript==
// @name        Accommodation condo.com.ph Page
// @namespace   Ads
// @description Single Ad
// @include     http://www.condo.com.ph/ad-details.php?id=*
// @version     1
// @grant       none
// ==/UserScript==

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function ads() {
    jQ(document).ready(function(){
        console.log('yey');
        var title    = jq('h1.subtitlemain').text();
		var category = "";
		var budget   = "";
		var desc     = "";
		var contact  = "";
		var address  = "";
		var website  = "";
		var source   = document.URL;
		
		desc_check = 0;
		
		console.log('title: ' + title);
		
        jQ('ul.detail li').each(function(){
            str = jQ(this).find('span').first().text();
            if(str == 'Property Type:') {
                jQ(this).find('span').first().remove();
                category = jQ(this).text();
                console.log('category: ' + category);
            }
            else if(str == 'For RENT:') {
                jQ(this).find('span').first().remove();
                budget = jQ(this).text();
                console.log('budget: ' + budget);
            }
            else if(str == 'SPECIFICATION') {
                desc_check = 1;
            }
            else if(desc_check === 1) {
                desc = jQ(this).text() + '<br>';
            }
        });
        console.log('desc: ' + desc);
    });
}

addJQuery(ads);