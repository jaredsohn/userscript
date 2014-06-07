// ==UserScript==
// @name              Prawie "Powrót" na stary wygląd Allegro - strona przedmiotu + LOKALIZACJA! + LISTA 
// @namespace         http://wkurwiamnie.org
// @description       Skrypcik pokazujący wszystkie dane na stonie przedmiotu allegro - żeby nie było trzeba klikać zajebistych zakładek....
// @author            hdc
// @version           3.0.2
// @include           http://*.allegro.pl/*
// @include           http://allegro.pl/*

// ==/UserScript==

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function main() {
	$.noConflict();
	jQuery(document).ready(function($) {
		if ($("#userFieldTab").length > 0){
//			alert('fixItem');
			fixItem();
			//return false;
		}
		
		if ($("#tabMainBox").length > 0){
//			alert('fixList');
			fixList();
			//return false;
		}
		
		function fixItem()
		{
			$('#delivery').removeClass('hidden');
			$('#userFieldTab').removeClass('hidden');
			$('.sellerMoreDetails').removeClass('hidden');
			$('.sellerMoreDetails').css('position', 'static');
			
			$('#watchedNav').css('display', 'none !important');
			
			var sDivContent_history = $('#history').html();
			$('#userFieldTab').append(sDivContent_history);

			$('.promoBox').css('display', 'none !important');
			$('.promoBox').addClass('hidden');
			
			$('#watchedNav').css('display', 'none !important');
			$('#watchedNav').addClass('hidden');
			
			$('.sellerDetails dt').css('display', 'none !important');
			
			//code by allegro.pl
			var itemId = $('.sellerDetails dt').data('item-id'),
			sellerId = $('.sellerDetails dt').data('seller');
			$.ajax({
				type: 'GET',
				url: 'http://allegro.pl/showItem2.php/ajax/?item='+itemId+'&type=feedbackRating&sellerId='+sellerId,
				success: function(data) {
					$('.prctPosComments strong').text(data['result']['posRatio'].replace('.', ','));
					if(data['result']['feedbackRating']['hasMinRatingsToUnhide']) {
						var rating = data['result']['feedbackRating']['averageRatings'];
						$('.totalAv').text(rating['ratings_total']);
						$('.starsWrapper').each(function(i) {
							$(this).parent().find('.av').text(rating['stars_avg'][i+1]);
							$(this).find('.as').css('width' , rating['percents'][i]+'%');
						});
						$('.isRating').show();
					} else {
						$('.ratingEmpty').show();
						$('.sellerMoreDetails table').hide();
					}
				}
			});
			
			//code by allegro.pl
			var data_company = $('#companyDataLink').data('company');
			$.ajax({
				type: 'GET',
				url: 'http://allegro.pl/company_icon_get_data_ajax.php',
				data: data_company,
				success: function(html) {
					$('#companyData').html(html).toggle('slow');
					$('#companyData').removeClass('hidden');
					$('#companyData').css('display', 'block !important');
					$('#companyData').css('height', 'auto !important');
				}
			});
			
			//by hdc
			var jsonScript = document.createElement('script');
			jsonScript.src = 'http://apam.wkurwiamnie.org/ajax/auctions/userscripts.org/getAuctionInfo.php.js?iAuctionId='+itemId+'&getType=getLocation',
			
			document.body.appendChild(jsonScript);
			jsonScript.onload = function(){
				$('#paymentShipment').append(sLocation);
			}
			
			//by hdc
			var jsonScriptQ = document.createElement('script');
			jsonScriptQ.src = 'http://apam.wkurwiamnie.org/ajax/auctions/userscripts.org/getAuctionInfo.php.js?iAuctionId='+itemId+'&getType=getQuantity',
			
			document.body.appendChild(jsonScriptQ);
			jsonScriptQ.onload = function(){
				$('ul.siTimeToEnd').append('<div style="clear: both;"></div>');
				$('ul.siTimeToEnd').append(sQuantity);
			}
		}

		function fixList() 
		{
			$('#tabMainBox .comparer').each(function() {
				//misc 
				
				//vertical-align
				
				$(this).find('td').css('vertical-align','middle');
				
				// img - iImg
				$(this).find('.cellPhoto > a.iImg').css('height', '48px');
				$(this).find('.cellPhoto > a.iImg').css('width', '64px');
				
				// img - iImg span // brak miniaturki
				$('.cellPhoto .iImg span').css('height', '48px');
				$('.cellPhoto .iImg span').css('width', '64px');
				
				// iTitle
				$('.iTitle').css('display', 'inline');
				
				var sKupTerazBG = 'http://apam.wkurwiamnie.org/ajax/auctions/userscripts.org/KT.png';
				var img = new Image();
				img.src = sKupTerazBG;
				
				// cellPrice - iPriceBN
				$(this).find('.iPriceBN > span').css('background-image', 'url("'+sKupTerazBG+'")');
				$(this).find('.iPriceBN > span').css('display', 'inline-block');
				$(this).find('.iPriceBN > span').css('height', '13px');
				$(this).find('.iPriceBN > span').css('width', '50px');
				$(this).find('.iPriceBN > span').css('margin', '0px 2px');
				$(this).find('.iPriceBN > span').css('vertical-align','middle');
				$(this).find('.iPriceBN > span').text('');
				
				$(this).find('.iPriceR > span').css('width', '55px');
				
				// pic
				var tdPhoto = $(this).children('.cellPhoto');
				$(tdPhoto).css('height', '48px');
				
				var tdPhoto_a = $(tdPhoto).find('a.iImg');
				if (($(tdPhoto_a).hasClass('noThumb')) || ($(tdPhoto_a).hasClass('noPhoto'))) {

				} else {
					try {
						var stdPhoto_a_data_img = $(tdPhoto_a).data('img');
						if (stdPhoto_a_data_img.length > 0) {
							stdPhoto_a_data_img = stdPhoto_a_data_img.replace("128x96", "64x48");

							$(tdPhoto_a).attr("data-img", stdPhoto_a_data_img);
							$(tdPhoto_a).data("data-img", stdPhoto_a_data_img);
							$(tdPhoto_a).data("img", stdPhoto_a_data_img);

							var img = new Image();
							img.src = stdPhoto_a_data_img;
							
							$(tdPhoto_a).css('background-image', 'url('+stdPhoto_a_data_img+')');
							$(tdPhoto_a).css('background-repeat', 'no-repeat');
						}
					} catch (e) {
					
					}
				}
				
				// name
				var tdName = $(this).children('.cellName');
				$(tdName).css('padding-right', '12px');
				var divName_div = $(tdName).children('div');
				$(divName_div).css('min-height', '0px');
				$(divName_div).css('padding-bottom', '0px');
				$(divName_div).css('position', 'static');
				
				var divName_div_span = $(divName_div).children('div > span + span');
				$(divName_div_span).css('position', 'static');
				$(divName_div_span).css('float', 'right');
			});
			
			$('.iPopup .iImg').css('width', '300px');
			$('.iPopup .iImg').css('height', '400px');
			
			// i tak dla checy
			$('div.rgTopPosition').hide();
			
		}
	});
}

addJQuery(main);