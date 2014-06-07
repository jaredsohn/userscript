// ==UserScript==
// @name              Prawie "Powrót" na stary wygląd Allegro - strona przedmiotu + LOKALIZACJA! + dzień zakończenia 
// @namespace         http://wkurwiamnie.org
// @description       Skrypcik pokazujący wszystkie dane na stonie przedmiotu allegro - żeby nie było trzeba klikać zajebistych zakładek.... + ukrywanie "promocji" + other stuff
// @author            hdc
// @version           5.5
// @include           http://*.allegro.pl/*
// @include           http://allegro.pl/*
// changelog
// 1.0 - pierwsza wersja - znikają zakładki
// 2.1 - dodana lokalizacja
// 3.1 - dodany dzień tygodnia zakończenia aukcji (narazie nie działa na FF - pracuję nad tym...)
// 3.1.1 - fix na nie znikający spinner pobierania info o sprzedającym
// 3.2 - dodanie numeru aukcji do tytułu
// 3.3 - lista produktów - szukanie zawsze widoczne; lista - nie widoczne 'produkty z katalogu'; lista - nie widoczne 'Zobacz najchętniej oglądane ...'
// 3.4 - wywalone "Zobacz najchętniej kupowane przedmioty z tej kategorii" na głównych stronach kategorii
// 3.5 - wywalone "Promowane w kategorii" na głównych stronach kategorii
// 3.6 - wywalone "Ta aukcja się skończyła, ale może zainteresują Cię" + poprawki !
// 3.7 - ponownie wywalenie "Ta aukcja się skończyła, ale może zainteresują Cię" + Program Ochrony!
// 3.8 - poprawki
// 4.0 - poprawione ukrywanie wszelakich "promocji"
// 4.1 - wywalone napisu "Powieksz" na zdjęciu...
// 5.0 - dodanie przyciskow ukrywających aukcji i wywalających aukcje z listy
// 5.1 - poprawki
// 5.2 - poprawki przy wyświetlaniu dnia końca aukcji
// 5.3 - numer aukcji i link do naruszenia zasad pod lokalizacją
// 5.4 - wywalone przycisku "Do koszyka" 
// 5.5 - wywalenie całej linii z koszykiem i ratami 

// ==/UserScript==

function addJQuery() 
{
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js");
	script.addEventListener('load', function() {
		$.noConflict();
		addJQueryJSON();
	}, false);
	document.getElementById('wrapper').appendChild(script);
}

function addJQueryJSON() 
{
	var scriptJSON = document.createElement("script");
	scriptJSON.setAttribute("src", "http://jquery-json.googlecode.com/files/jquery.json-2.3.min.js");
	scriptJSON.addEventListener('load', function() {
		main();
		o_hdcAllegroListButtons.init();
		o_hdcAllegroListButtons.addButtons();
		o_hdcAllegroListButtons.addStyles();
	}, false);
	document.getElementById('wrapper').appendChild(scriptJSON);
}

function main() {
	
	var dDate = new Date();
	var aDays = new Array('niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota');
	var aMonths = new Array('stycznia','lutego','marca','kwietnia','maja','czerwca','lipca','sierpnia','września','października','listopada','grudnia');
	
	jQuery(document).ready(function(jQuery) {
		if (jQuery("#userFieldTab").length > 0){
//			alert('fixItem');
			fixItem();
			//return false;
		}
		
		if (jQuery("#tabMainBox").length > 0){
//			alert('fixList');
			fixList();
			//return false;
		}
		
		if (jQuery("#showCatCategories").length > 0){
//			alert('fixCategoriesMainPage');
			fixCategoriesMainPage();
			//return false;
		}
		
		function fixItem()
		{
			jQuery('#delivery').removeClass('hidden');
			jQuery('#userFieldTab').removeClass('hidden');
			jQuery('.sellerMoreDetails').removeClass('hidden');
			jQuery('.sellerMoreDetails').css('position', 'static');
			
			var sDivContent_history = jQuery('#history').html();
			var sDivContent_deliviery = jQuery('#delivery').html();
			jQuery('#delivery').html('');
			jQuery('#userFieldTab').append(sDivContent_history);
			jQuery('#userFieldTab').prepend(sDivContent_deliviery);

			jQuery('.promoBox').css('display', 'none !important');
			jQuery('.promoBox').addClass('hidden');
			
			jQuery('#watchedNav').css('display', 'none !important');
			jQuery('#watchedNav').addClass('hidden');
			
			jQuery('.sellerDetails dt').css('display', 'none !important');
			
			var dOfertaIZgloszenieNaruszenia = jQuery('#watchedNav .itemId');
			
			//code by allegro.pl
			var itemId = jQuery('.sellerDetails dt').data('item-id'),
			sellerId = jQuery('.sellerDetails dt').data('seller');
			jQuery.ajax({
				type: 'GET',
				url: 'http://allegro.pl/showItem2.php/ajax/?item='+itemId+'&type=feedbackRating&sellerId='+sellerId,
				success: function(data) {
					jQuery('.prctPosComments strong').text(data['result']['posRatio'].replace('.', ','));
					if(data['result']['feedbackRating']['hasMinRatingsToUnhide']) {
						var rating = data['result']['feedbackRating']['averageRatings'];
						jQuery('.totalAv').text(rating['ratings_total']);
						jQuery('.starsWrapper').each(function(i) {
							jQuery(this).parent().find('.av').text(rating['stars_avg'][i+1]);
							jQuery(this).find('.as').css('width' , rating['percents'][i]+'%');
						});
						jQuery('.isRating').show();
					} else {
						jQuery('.ratingEmpty').show();
						jQuery('.sellerMoreDetails table').hide();
					}
					jQuery('#ratingSpinner').hide();
					jQuery('#sellerRating').show();
				}
			});
			
			//code by allegro.pl
			var data_company = jQuery('#companyDataLink').data('company');
			jQuery.ajax({
				type: 'GET',
				url: 'http://allegro.pl/company_icon_get_data_ajax.php',
				data: data_company,
				success: function(html) {
					jQuery('#companyData').html(html).toggle('slow');
					jQuery('#companyData').removeClass('hidden');
					jQuery('#companyData').css('display', 'block !important');
					jQuery('#companyData').css('height', 'auto !important');
				}
			});
			
			//by hdc
			var jsonScript = document.createElement('script');
			jsonScript.src = 'http://apam.wkurwiamnie.org/ajax/auctions/userscripts.org/getAuctionInfo.php.js?iAuctionId='+itemId+'&getType=getLocation',
			
			document.body.appendChild(jsonScript);
			jsonScript.onload = function(){
				jQuery('#paymentShipment').append(sLocation);
				
				// przeniesienie nr .oferty i linku do zgloszenia naruszenia zasad
				jQuery('#paymentShipment').append('<br/>');
				jQuery('#paymentShipment').append('<span style="font-size: 11px;">' + dOfertaIZgloszenieNaruszenia.html() + '</span>');
			}
			
			//by hdc
			var jsonScriptQ = document.createElement('script');
			jsonScriptQ.src = 'http://apam.wkurwiamnie.org/ajax/auctions/userscripts.org/getAuctionInfo.php.js?iAuctionId='+itemId+'&getType=getQuantity',
			
			document.body.appendChild(jsonScriptQ);
			jsonScriptQ.onload = function(){
				jQuery('ul.siTimeToEnd').append('<div style="clear: both;"></div>');
				jQuery('ul.siTimeToEnd').append(sQuantity);
			}
			
			//by hdc
			hTimeInfo = jQuery('.siTimeToEnd .timeInfo')
			sTimeInfo = jQuery(hTimeInfo).html();
			
			var iEndDay = 0;
			var iEndMonth = 0;
			var iEndYear = dDate.getFullYear();
			
			var regExp = /(\d+)\s([a-zęółśążźćń]+)\,/;
			
			var aMatch = regExp.exec(sTimeInfo);
			if (aMatch != null) {
				iEndDay = aMatch[1];
				iEndMonth = aMonths.indexOf((aMatch[2]));
				var dEndDate = new Date(Number(iEndYear), Number(iEndMonth), Number(iEndDay), 0, 0, 0);
				var sEndDay = aDays[dEndDate.getDay()];
				hTimeInfo.append('(' + sEndDay +') <span style="font-size: 10px; color: gray;"> [by hdc]</span>')
			} else {
				//alert('shit');
			}
			
			// numer auckji w nazwie jak za starych lepszych czasów
			var inRecomended = jQuery('#recommendedData');
			var oItemData = jQuery(inRecomended).data('itemdata');
			var iItemNumer = oItemData['id'];
			jQuery('#siTitleBar h1').append(' (' + iItemNumer + ')');
			
			// recommendedGalleryWrapper wyjebac
			jQuery('.recommendedGalleryWrapper').html('');
			jQuery('.recommendedGalleryWrapper').css('height', '0px');
			jQuery('.recommendedGalleryWrapper').css('overflow', 'hidden');	
			
			//won
			jQuery('a#siPok').css({ "background":  "red", height: '0px' }); 
			jQuery('a#siInstallments').css({ "background":  "red", height: '0px'}); 
			
			//usuniecie (Powieksz)... na chuj to komu?
			jQuery('.galleryContainer .galleryTrigger').html('');
			jQuery('.galleryContainer .galleryTrigger').css('min-height', '0px');
			jQuery('.galleryContainer .galleryTrigger').css('overflow', 'hidden');	
			jQuery('.galleryContainer .galleryTrigger').css('padding', '0px');	
			
			// usuniecie przycisku "Do koszyka"
			
			jQuery('#installment').remove();
			jQuery('#siBidForm2 span.lower-price').remove();
			jQuery('#siBidForm2').children('.left').remove();
		}
		
		function fixList() 
		{
			jQuery('#tabMainBox .comparer').each(function() {
				//misc 
				
				//vertical-align
//				jQuery(this).find('td').css('vertical-align','middle');
				
				// iTitle
//				jQuery('.iTitle').css('display', 'inline');
				
				var sKupTerazBG = 'http://apam.wkurwiamnie.org/ajax/auctions/userscripts.org/KT.png';
				var img = new Image();
				img.src = sKupTerazBG;
				
			});
			
			// i tak dla checy
			jQuery('div.rgTopPosition *').html('');
			
			
			// szukanie zawsze widoczne
			jQuery('.naviLeftContentReversed').show();
			
			// promoProducts wyjebac
			jQuery('.promoProducts').html('');
			
			//prod z katalogu
			jQuery('.productList .listStandard').html('');
		}
		
		function fixCategoriesMainPage()
		{
			// recommendedGalleryWrapper wyjebac
			jQuery('.recommendedGalleryWrapper').html('');
			jQuery('.recommendedGalleryWrapper').css('height', '0px');
			jQuery('.recommendedGalleryWrapper').css('overflow', 'hidden');
			
			// promowane w kategorii raus
			jQuery('#showCatPromoItems').html('');
			jQuery('#showCatPromoItems').css('height', '0px');
			jQuery('#showCatPromoItems').css('overflow', 'hidden');
			
			jQuery('#showCatDescription').html('');
			jQuery('#showCatDescription').css('height', '0px');
			jQuery('#showCatDescription').css('overflow', 'hidden');
			

		}
	});
}















function hdc_AllegroListButtons() // object
{
	var oHiddenItems = new Object();
	var oRemovedItems = new Object();
	var _this = this;
	
	var iLastClickedToRemove = -1; // ostatni klikniety id do usuniecia (trzeba 2 razy kliknąć)
	
	this.init = function()
	{
		cCookieH = jQuery.cookie('hdc_oHiddenItems');
		cCookieR = jQuery.cookie('hdc_oRemovedItems');
		
		_this.oHiddenItems = jQuery.evalJSON(cCookieH) || new Object();
		_this.oRemovedItems = jQuery.evalJSON(cCookieR) || new Object();
	}
	
	this.addButtons = function() 
	{
		var aItems = jQuery('.itemListResult');
		jQuery(aItems).each(function(){
			var iItemId = jQuery(this).data('id');
			jQuery(this).addClass('hdc_itemListResult_' + iItemId);
			var hTitle = jQuery(this).find('.iTitle').first();
			var hCellName = jQuery(this).find('.cellName').first();
			var hCellNameDiv = jQuery(hCellName).find('div').first();
			
			jQuery(hTitle).css('width', '80%');
			jQuery(hCellNameDiv).css('min-height', '1px');
			jQuery(hCellNameDiv).css('padding-bottom', '0px');
			
			var hSmallInfo = jQuery(this).find('.listingParams').first();
			var hImg = jQuery(this).find('.iImg').first();

			var sButtons = "&nbsp;&nbsp;&nbsp;<span class='hdc-buttons'><span><a data-id='"+iItemId+"' class='hdc-buttons_hide hdc-buttons_hide_"+iItemId+"' href='#'>[H]</a></span>";
			sButtons += " <span><a data-id='"+iItemId+"' class='hdc-buttons_remove hdc-buttons_remove_"+iItemId+"' href='#'>[R]</a></span>";

			jQuery(hTitle).after(sButtons);
			
//			var sInfo_1 = "<span class='hdc-info_1'>Czas do końca: 23:41:11</span>";
//			jQuery(hSmallInfo).after(sInfo_1);
			
		});
		
		jQuery('.cellName div > span + span').css('position', 'static');
		
		// ustawianie onclicka dla guziorow
		jQuery('.hdc-buttons_hide').each(function(){
			var iAId = jQuery(this).data('id');
			jQuery(this).click(function(){
				_this.hideItem(iAId);
				return false;
			});
		});
		
		jQuery('.hdc-buttons_remove').each(function(){
			var iAId = jQuery(this).data('id');
			jQuery(this).click(function(){
				_this.removeItem(iAId);
				return false;
			});
		});
		
		for (i in _this.oHiddenItems) {
			_this.hideItem(_this.oHiddenItems[i]);
		}
		
		for (i in _this.oRemovedItems) {
			_this.removeItem(_this.oRemovedItems[i], true);
		}
	}

	this.hideItem = function(iItemId)
	{
		var bInArray = oHiddenItems[iItemId];  
		
		var hListItem = jQuery('.hdc_itemListResult_' + iItemId);
		var hCellPhoto = jQuery(hListItem).find('.cellPhoto').first();
		var hCellPhotoImg = jQuery(hCellPhoto).find('.iImg').first();

		var hCellName = jQuery(hListItem).find('.cellName').first();
		var hCellNameDiv = jQuery(hListItem).find('.cellName').first();
		
		if (!bInArray) {
			
			jQuery(hCellPhoto).css('height', '0');
			jQuery(hCellPhotoImg).css('height', '0');
			
			jQuery(hCellName).find('div').first().css('height', '17px');
			jQuery(hCellName).find('div').first().css('overflow', 'hidden');
			
			//jQuery(hListItem).find('*').css('font-size', '11px');
			
			oHiddenItems[iItemId] = iItemId;
		} else {
			jQuery(hCellPhoto).css('height', '96px');
			jQuery(hCellPhotoImg).css('height', '96px');
			
			jQuery(hCellName).find('div').first().css('height', 'auto');
			jQuery(hCellName).find('div').first().css('overflow', 'auto');
			
			//jQuery(hListItem).find('*').css('font-size', '1em');
			
			delete oHiddenItems[iItemId];
		}
		
		jQuery.cookie('hdc_oHiddenItems', jQuery.toJSON(oHiddenItems));
		
		return false;
	}

	this.removeItem = function(iItemId, bForce)
	{
		var hListItem = jQuery('.hdc_itemListResult_' + iItemId);
		bForce = bForce || false;
		if ((iLastClickedToRemove == iItemId) || (bForce)) {
			jQuery(hListItem).css('display', 'none');
			oRemovedItems[iItemId] = iItemId;
			jQuery.cookie('hdc_oRemovedItems', jQuery.toJSON(oRemovedItems));	
		} else {
			iLastClickedToRemove = iItemId;
		}
	}
	
	this.addStyles = function()
	{
		jQuery('.hdc-buttons').css({
									'float': 'right',
									'margin': '0px 4px 0px 0px'
									}); 
		jQuery('.hdc-info_1').css({
									'color': '#333333',
									'display': 'block',
									'font-size': '11px'
									}); 
	}

}


/*!
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function($) {
    $.cookie = function(key, value, options) {
        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };
})(jQuery);

var o_hdcAllegroListButtons = new hdc_AllegroListButtons();

//addJQuery();
addJQueryJSON();