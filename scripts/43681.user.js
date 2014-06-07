// ==UserScript==
// @name           fb phonebook
// @namespace      setfivefb
// @description    Scrapes your Facebook friend's phone #s and optionally email addresses. Login to http://m.facebook.com/ and navigate to http://m.facebook.com/friends.php?a&rf6e4c397&refid=5
// @include        http://m.facebook.com/*
// ==/UserScript==


var s = document.createElement('script');
s.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
s.type = 'text/javascript';

document.getElementsByTagName('body')[0].appendChild(s);
  
s.addEventListener('load', function(){ 
  jQuery = unsafeWindow['jQuery'];
  jQuery.noConflict();
  
  var queryString = unsafeWindow["window"].location.search;
  
  if( queryString.indexOf("sfScraper") > 0 ){
	  
	  var localStorage = unsafeWindow['localStorage'];
	  var scrapeWhat = JSON.parse( localStorage.getItem("sfScrapeWhat") );
	  
	  if( scrapeWhat.emailsDone ){ 
		  extractEmailandPhones();
		  return false;
	  }
	  
	  if( scrapeWhat.phone ){ 
		  scrapePhoneContacts(); 
		  return false;
	  }
	  
	  if( scrapeWhat.email ){ 
		  scrapeEmailContacts(); 
		  return false;
	  }
	  
	  
	  return false;
  }
  
  if( jQuery("b:contains('Everyone')").length ){
	  
	  var localStorage = unsafeWindow['localStorage'];
	  localStorage.removeItem("sfStoredContacts");
	  localStorage.removeItem("sfScrapeWhat");
	  localStorage.removeItem("sfContactLinks");
	  
	  jQuery("#title").after("<div style='background-color: #E6EFC2; color:#264409; border-color:#C6D880; font-weight: bold; padding: 10px; font-size: 18px'>" 
							+ "What do you want to save?<form id='sf-scraperFrm'><input name='sf-scrapeWhat' type='radio' value='p' id='sf-phoneNumbers' /> Phonenumbers <input name='sf-scrapeWhat' type='radio' value='e' /> Phonenumbers and Emails" 
							+ "&nbsp;&nbsp;<input type='button' id='sf-scrapeBtn' value='Start' style='font-size: 18px' /></form>" 
							+ "</div>");

	  jQuery("#sf-scrapeBtn").click( function(){
		
		var scrapeWhat = { phone: false, email: false, emailsDone: false };
		
		jQuery("#sf-scraperFrm input:checked").each( function(){
			
				if( jQuery(this).val() == "p" ){
					scrapeWhat.phone = true;
				}else if( jQuery(this).val() == "e" ){
					scrapeWhat.email = true;
				}
		});

		localStorage.setItem("sfScrapeWhat", JSON.stringify(scrapeWhat));
		
		if( scrapeWhat.phone ){ scrapePhoneContacts(); }
		if( scrapeWhat.email ){ scrapeEmailContacts(); }
		
		return false;
	  });


  }else{
	  jQuery("#marquee_tabs").after("<div style='background-color: #FFF6BF;color:#514721;border-color:#FFD324; font-weight: bold; padding: 10px; font-size: 18px'>You need to switch to the Friends -&gt; 'Everyone' tab for the scrapper to become active.</div>");
  }
  
}, false);

function extractEmailandPhones(){
	
	var contacts = localStorage.getItem("sfStoredContacts");
	var contactLinks = JSON.parse( localStorage.getItem("sfContactLinks") );
	
	if( contacts == null ){
		contacts = [ ];
	}else{
		contacts = JSON.parse( contacts );
	}
	
	var name = jQuery(".section_title:first").text();
	var email = jQuery("td:contains('Email:')").next("td:first").text();
	var phone = jQuery("td:contains('Mobile Number:')").next("td:first").text();
	
	contacts.push( {"n": name, "p": phone, "e": email} );
	
	localStorage.setItem("sfStoredContacts", JSON.stringify(contacts) );
	
	jQuery(".section_title:first").after("<div style='background-color: #FFF6BF;color:#514721;border-color:#FFD324; font-weight: bold; padding: 10px; font-size: 18px'>" 
								+ "Links left: " + contactLinks.length + "</div>");

	
	if( contactLinks.length ){
		unsafeWindow["window"].location = contactLinks.pop();
		localStorage.setItem("sfContactLinks", JSON.stringify(contactLinks) );
		return false;
	}
	
	var textArea = "Name,Phone,Email \n";
	jQuery.each(contacts, function(i, val){ textArea += val.n + "," + val.p + "," + val.e + "\n"; });
			
	jQuery("body").append("<textarea style='width: 500px; height: 1000px' id='sf-fbContacts'></textarea>");
	jQuery("#sf-fbContacts").val( textArea );
	
}

function scrapeEmailContacts(){
	
	var localStorage = unsafeWindow['localStorage'];
	var contactLinks = localStorage.getItem("sfContactLinks");
		
	if( contactLinks == null ){
		contactLinks = [ ];
	}else{
		contactLinks = JSON.parse( contacts );
	}
	
	jQuery("tr[valign='top']").each( function(){
		var url = "http://m.facebook.com" + jQuery(this).find("a:first").attr("href") + "&v=info&sfScraper=true";
		contactLinks.push( url );
	});	
	
	jQuery("#title").after("<div style='background-color: #FFF6BF;color:#514721;border-color:#FFD324; font-weight: bold; padding: 10px; font-size: 18px'>" 
								+ "Saved: " + contactLinks.length + "</div>");

	localStorage.setItem("sfContactLinks", JSON.stringify(contactLinks) );
	
	if( jQuery("a:contains('Next')").length ){
		var nextLink = jQuery("a:contains('Next')").attr("href") + "&sfScraper=true";
		unsafeWindow["window"].location = "http://m.facebook.com" + nextLink;
	}else{
		
		var scrapeWhat = JSON.parse( localStorage.getItem("sfScrapeWhat") );
		scrapeWhat.emailsDone = true;
		
		localStorage.setItem("sfScrapeWhat", JSON.stringify(scrapeWhat) );
		
		unsafeWindow["window"].location = contactLinks.pop();
		localStorage.setItem("sfContactLinks", JSON.stringify(contactLinks) );
	}
	
	return false;
}

function scrapePhoneContacts(){
		var localStorage = unsafeWindow['localStorage'];
		var contacts = localStorage.getItem("sfStoredContacts");
		
		if( contacts == null ){
			contacts = [ ];
		}else{
			contacts = JSON.parse( contacts );
		}
		
		jQuery("tr[valign='top']").each( function(){
				var name = jQuery(this).find("a:first").text();
				
				if( jQuery(this).find("a:contains('Call')").length ){
					var number = jQuery(this).find("a:contains('Call')")
											 .attr("href").replace("tel:", "");
					contacts.push( {"n": name, "p": number, "e": ""} );
				}
		});
		
		jQuery("#title").after("<div style='background-color: #FFF6BF;color:#514721;border-color:#FFD324; font-weight: bold; padding: 10px; font-size: 18px'>" 
								+ "Saved: " + contacts.length + "</div>");
		
		localStorage.setItem("sfStoredContacts", JSON.stringify(contacts) );
		
		if( jQuery("a:contains('Next')").length ){
			var nextLink = jQuery("a:contains('Next')").attr("href") + "&sfScraper=true";
			unsafeWindow["window"].location = "http://m.facebook.com" + nextLink;
		}else{
			var textArea = "Name,Phone \n";
			jQuery.each(contacts, function(i, val){ textArea += val.n + "," + val.p + "\n"; });
			
			jQuery("body").append("<textarea style='width: 500px; height: 1000px' id='sf-fbContacts'></textarea>");
			jQuery("#sf-fbContacts").val( textArea );
		}
		
		return false;
}
