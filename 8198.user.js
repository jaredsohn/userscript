// ==UserScript==
// @name             Beeradvocate Event Google Calendar Link
// @namespace        
// @description      Add a link to a BA event page that will allow a user to quickly add info for that event to their google calendar
// @include          http://beeradvocate.com/events/info/*
// ==/UserScript==



function generate_cal_link(title, start, end, estabName, site, loc, details){
	var link = 'http://www.google.com/calendar/event?action=TEMPLATE&text='  + escape(title) + '&dates=' 
						+ start + '/' + end + '&location=' + escape(loc) + '&trp=false&sprop=website:' + escape(site)
						+ '&details=' + escape(details);
						
	return link;
}

function parse_page(){
	var content = document.evaluate("//td[@id='main_content']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var title = document.evaluate("h1[@class='norm']", content, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
	
	var date = document.evaluate("table/tbody/tr[1]/td[2]/a[1]", content, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var parsedDate = date.href.substr(39).replace(/\//g, "");
	
	var website = document.evaluate("table/tbody/tr[1]/td[2]/a[2]", content, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var estabName = website.textContent; 
	
	var event = website.previousSibling.textContent;
	
	var loc = website.nextSibling.nextSibling.textContent;
	
	var desc = title + ' - ' + event + estabName;
	var details = desc + '\n' + website;
		
				  
	
	var linkelement = document.createElement('a');
	linkelement.href = generate_cal_link(desc, parsedDate, (parseInt(parsedDate) + 1), estabName, website, loc, details);
	linkelement.target = '_blank';
	linkelement.innerHTML = '<span style="background: rgb(0, 102, 0) none repeat scroll 0%; color: rgb(255, 255, 255); -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; font-weight: bold; text-align: center;"> Add to Google&nbsp;</span>'
	
	var helpnode = document.evaluate("//a[@class='help']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	
	helpnode.parentNode.insertBefore(linkelement, helpnode);
	helpnode.parentNode.insertBefore(document.createTextNode('\u00A0'), helpnode);
}

parse_page();





