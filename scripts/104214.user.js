// ==UserScript==
// @id             www.erepublik.com-02cf9f1c-796f-400c-bc81-160067ec6b82@scriptish
// @name           deFyromizer
// @version        1.0.1
// @namespace      dejan.erep
// @author         Dejan
// @description    No more FYROM
// @include        http://www.erepublik.com/*
// @include        https://www.erepublik.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @run-at         document-idle
// @grant 		   none
// ==/UserScript==

/* replaceAll function */
String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find, 'g'), replace);
};

function ApdejtirajShoutovi() {
	var old_get_citizen_feeds = unsafeWindow.get_citizen_feeds;
	var old_populatePreviousPosts = unsafeWindow.populatePreviousPosts;
	
	unsafeWindow.get_citizen_feeds = function () {
		old_get_citizen_feeds();
		setTimeout(function() {
				$("#citizen_feed em.auto_text:contains('FYROM')").replaceFyrom();
			}, 
		500);
					
	}
	
	unsafeWindow.populatePreviousPosts = function () {
		old_populatePreviousPosts();
		setTimeout(function() { 
				$("#citizen_feed em.auto_text:contains('FYROM')").replaceFyrom(); 
			}, 
		500);
		
	}
	
} 


/* script start */

var sMacedonia = "Republic of Macedonia";

(function($){
	jQuery.fn.replaceFyrom = function() {
		this.html(function() {
			var txt = $(this).html();
			//console.log(txt);
			txt = txt.replaceAll("\\(FYROM\\)","");
			//console.log(txt);
			return txt;
		});		
		return this; 
	};
})(jQuery);
	
$(document).ready(function () {

	var bodyID = $('body').attr('id');
	
	switch ( bodyID ) {
	
		case 'homepage_feed' :
		
			ApdejtirajShoutovi();

			$("#country_tournament div.country_layer span.tour_desc b:contains('FYROM')").replaceFyrom();
						
			//koga nekoj ima osvoeno medal za makedonija
			$("#citizen_feed em.auto_text:contains('FYROM')").replaceFyrom();
			//ako e postavena mak. bitka za DO 
			$("#orderContainer strong").replaceFyrom();
			
			//tabovi statii
			$("div#content div.source_tabs a:contains('Macedonia')").html(sMacedonia).attr('title', sMacedonia);
			
			//nema bitka
			$("#battle_listing .info_message td").replaceFyrom();
						
			break;
			
		case 'citizenprofile' :
			$("div#content div.citizen_sidebar div.citizen_info a").replaceFyrom(); // lokacija/drzavjanstvo
			$("div#content div.citizen_mass_destruction em").replaceFyrom(); //bombi
			$("div#content div.stat small").replaceFyrom(); //top steta
			$("select#country_list option[value='79']").html(sMacedonia); //selenje

			//freedom fighter medali
			$("#freedom_fighter_region_list small").replaceFyrom(); 
			
			//selenje, momentalna lokacija
			$(".current_location span").replaceFyrom(); 
			
			//dekoracii
			$(".hinter p").replaceFyrom(); 
			
			break;			
			
		case 'general' :
			$("div#battle_listing ul strong:contains('FYROM')").replaceFyrom(); //bitki
			//bitka
			$("div#pvp_header div.country div h3:contains('FYROM')").replaceFyrom(); 
			$("div#pvp_header div.allies_tooltip ul li:contains('FYROM')").replaceFyrom(); 
			$("div#options_box span.against").replaceFyrom(); 		
			
			//ranking
			$("a#countryId_msa_50").replaceFyrom();
			$("div#content table.bestof td a.dotted:contains('FYROM')").replaceFyrom();
			
			//alijansi, biranje zemja
			$("div#content table.offers td a.dotted:contains('FYROM')").replaceFyrom();
			$("div#country_filters a.spaced_small:contains('FYROM')").replaceFyrom();
			
			//job market, companies for sale
			$("div#countryId_child.ddChild li:contains('FYROM')").replaceFyrom();
			
			//nema bitka
			$("#battle_listing .info_message td:contains('FYROM')").replaceFyrom();

			
			break;			
			
		case 'military_units' :
			$("div#military_group_header div.details a").replaceFyrom(); //lokacija
			$("div#orderContainer div.details strong").replaceFyrom(); //bitka		
			break;			
			
		case 'alliances' :
			$("div#content ul.country_members li a:contains('FYROM')").replaceFyrom(); 
			break;			

		case 'war' :
			//biranje strana za bitka
			$("body#war div#content div.country div h3:contains('FYROM')").replaceFyrom(); 
			break;

		case 'country' :
			//country page
			$("div#profileholder h1").replaceFyrom(); //naziv
			$("a#79").replaceFyrom(); //meni
			$("table.citizens th").replaceFyrom(); //tabela				

			//law
			$("div#content div.indent p.largepadded").replaceFyrom();
			
			//military page
			$("div#content div.attacker div.nameholder").replaceFyrom();  //natural enemy
			$("div#content h2.section").replaceFyrom();  //active wars, resistance wars
			$("div#content table.political td a.dotted").replaceFyrom(); //MPPs
			$("div#content table.productivity td a.dotted").replaceFyrom(); //text - "Historical Capital of "
			
			//danoci
			$("#table_div .google-visualization-table-td").replaceFyrom();  //tabela danoci
			$("#chart_div svg g text:contains('FYROM')").replaceFyrom();  //graf danoci
			
			break;
			
		case 'party' :
			$("div#profileholder a.smalldotted:contains('FYROM')").replaceFyrom();
			break;
			
		case 'media' :
			$("div#content div.citizen p a:contains('FYROM')").replaceFyrom(); 
			$("a#79").replaceFyrom(); //meni
			$("div#content div.article_details small:contains('FYROM')").replaceFyrom(); 
			break;
			
		case 'inventory' :
			$("div#market_licenses_select a.ml_selector:contains('Macedonia')").attr('title', sMacedonia);
			$("div#market_licenses_select a.ml_selector:contains('Macedonia') span").html(sMacedonia);
			$("div#sell_offers img.offer_flag[title='Republic of Macedonia (FYROM)']").attr('title', sMacedonia).attr('alt', sMacedonia);
			break;
			
		case 'marketplace_zone' :
			//
			$("div#countryId_child.ddChild span.ddlabel:contains('FYROM')").replaceFyrom();
			break;
		
		case 'politics' :
			$("div#country_filters a#79_country").replaceFyrom();
			break;
	
	}

/*

	$("").replaceFyrom();
	$(".. .. h3:contains('FYROM')").html(sMacedonia);
	

*/		
});
