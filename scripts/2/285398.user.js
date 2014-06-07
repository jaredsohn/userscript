// ==UserScript==
// @name        Accommodations
// @namespace   Ads
// @description Accommodation List
// @include     http://www.sulit.com.ph/index.php/view+classifieds/id/*
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

function sulitAds() {
    var first = 0;
    setInterval(function(){
        if(first === 0){
			first = 1;
		}
		else{
            if(jQ('#moreContactNumbersMenu .kvValue ul li').length > 0){
//				document.getElementById('moreContactNumbers').getElementsByTagName('a')[0].click();
				jQ('#moreContactNumbers a').click();
				jQ('#moreContactNumbersMenu .kvValue li:first-child span span').remove();
			}
			
			jQ('.memberRealName span').remove();
			jQ('.classifiedsTitle h3 small').remove();
			
			// mydate
			var mydate = jQ('.keyValueList .adRequiredFields span small').text();
			mydate = mydate.substring(1, mydate.length - 1);
			
			var pdate = new Date(mydate).getTime();
			var sdate = new Date('January 9, 2013').getTime();
			
			var title    = jQ('.classifiedsTitle h3').text();
			var category = "";
			var budget   = jQ('#adDescription span.adPrice span').text();
			var desc     = jQ('.adDescription').html();
			var contact  = jQ('.memberRealName').text();
			var address  = "";
			var website  = "Not Available";
			var source   = document.URL;
            
			// category
			jQ('#showMoreAdDetailsTarget li').each(function() {
				var key = jQ(this).find('.kvKey').text();
				if(jQ.trim(key) == "Category:"){
					category = jQ(this).find('.kvValue').text();
				}
			});
			
			// address
			jQ('#adDescription .keyValueList li').each(function() {
				var key = jQ(this).find('.kvKey').text();
				if(jQ.trim(key) == "Address:"){
					address = jQ(this).find('.kvValue').text();
				}
			});
			
			// location
			if(address === ""){
				jQ('#adDescription .keyValueList li').each(function() {
					var key = jQ(this).find('.kvKey').text();
					if(jQ.trim(key) == "Location:"){
						address = jQ(this).find('.kvValue').text();
					}
				});
			}
			
			// contact number
			if(jQ('#moreContactNumbersMenu .kvValue ul li').length > 0){
				jQ('#moreContactNumbersMenu .kvValue ul li').each(function(){
					contact += '<br>' + jQ(this).find('span').text().trim();
				});
			}
			
			// description
			desc = desc.replace('&', ' and');
			
			jQ.ajax({
				type: "GET",
				url: "http://localhost/unemployed_pinoys/accommodation_ads/add.php",
				data: {
					title: title, 
					category: category,
					budget: budget,
					desc: desc,
					contact: contact,
					address: address,
					website: website,
					source: source,
					date: mydate
				},
				async: false
			});
			
			document.getElementsByClassName('nextAd')[0].getElementsByTagName('a')[0].click();
		}
    }, (Math.floor((Math.random()*3)+3)) * 1000);
}

if (window.top != window.self){
    addJQuery(sulitAds);
}