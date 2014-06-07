// ==UserScript==
// @name           Yad2 Stripper
// @namespace      bahaba
// @description    Removes ads, more
// @include        http://www.yad2.co.il/*
// @grant          none
// ==/UserScript==
//
// version 0.4.1
// 2012-12-09
//
// Based on the Yad2 Enhancer script by Lior Zur
// Released under the GPL license (http://www.gnu.org/copyleft/gpl.html)

function checkLocation (name) {
  var regex = new RegExp( name );
  var results = regex.exec( window.location.href );
  if( results == null )
    return false;
  else
    return true;
}

function removeElements (xPath) {
  var x, thisElement, allElements
  for (x in xPath) {
    allElements = document.evaluate(xPath[x], document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (f = 0; f < allElements.snapshotLength; f++) {
      thisElement = allElements.snapshotItem(f);
      thisElement.parentNode.removeChild(thisElement);
    }
  }
}

function removeById (elementIds) {
  var x, thisElement;
  for (x in elementIds) {
    thisElement = document.getElementById(elementIds[x]);
    if (thisElement) thisElement.parentNode.removeChild(thisElement);
  }
}

function removeByWildcardId(elementWildcardIds) {
	var children = document.body.getElementsByTagName('*');
	var x, id, child;
	for (x in elementWildcardIds) {
		id = elementWildcardIds[x];
		for (var i = 0; i < children.length; i++) {
			child = children[i];
			for (var j = 0; j <=  ( child.id.length - id.length); j++)
				if (child.id.substr(j,id.length) == id) child.parentNode.removeChild(child);
		}

  	}
}

function days_between(date1, date2) {

    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime()
    var date2_ms = date2.getTime()

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms)
    
    // Convert back to days and return
    return Math.round(difference_ms/ONE_DAY)

}

removeById(['top_banners','top_banners_spacer','GamboBanner','rtower','ads.tv.1','lastsearch_block','header','kama_linkTbl',
	'tr.MidStrip.1', 'tr.MidStrip.2', 'tr.MidStrip.3', 'tr.MidStrip.4', 'tr.MidStrip.5', 'tr.MidStrip.6',
	'tr.MidStrip.1.line','tr.MidStrip.2.line','tr.MidStrip.3.line','tr.MidStrip.4.line','tr.MidStrip.5.line','tr.MidStrip.6.line',
	'dailysale','facebookBox','insurad','ad_chavy','formula','walla_pets','CarOfTheYear','Merlin_left_column',
	'king_kong','king_kong_btn_close','ad_martef','clicky_text_link_1','clicky_text_link_2',
	'footer','left_banner','left_spacer_1','left_spacer_2','td_clicy_title',
	'left_ads','left_button_1','left_textlink_bg','td_btn_img','bottom_ads','td_banner','TrempimBox','autocare','AgentDiv']);

removeElements(['//div[@class=\'intro_block\']','//table[@class=\'search_banners\']',
		'//div[@class=\'search_sponsor\']',
		'//div[@class=\'walla_strip\']','//table[@width=\'369\']',
		'//img[@src=\'http://images.yad2.co.il/Pic/yad2new/page/main_table_top.jpg\']',
		'//table/tbody/tr/td[@width=\'14%\']','//div[@class=\'pie\']','//div[@class=\'pie\']',
		'//div[@class=\'articles_block\']','//div[@class=\'inner_ad_advertise pie\']',
		'//div[@class=\'hotpic_ad_block pie\']',
		'//div/div/table[@height=\'730\']',
		'//tr/td/table[@width=\'207\']']);

removeByWildcardId(['Fusion_holder','big_pic_branding','pic_branding','ad_strip','bottom_','center_car_button_','merchant_sponsorship']);

var thisElement, allElements1, allElements2, mainElement, adTitleElement, adBulkElement, adNavElement, adTivElement

// Yad2, Pets, Nadlan, Cars normal view and Pets gallery view
if ( checkLocation("Yad2.php") == true || checkLocation("Pets.php") == true || checkLocation("sales.php") == true ||
     checkLocation("Car.php") == true || checkLocation("rent.php") == true) {

	// Remove soharim
	allElements1 = document.evaluate("//tr/th[@class='yad1_mergetitle ']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

	if ( allElements1.snapshotLength == 1 ) {
		thisElement = allElements1.snapshotItem(0).parentNode;
		while (thisElement.nextSibling!=null)	thisElement.parentNode.removeChild(thisElement.nextSibling);
		thisElement.parentNode.removeChild(thisElement);
	}
	
	// Remove all other non-relevant information

	// a. search for real contents and move it to top
	allElements1 = document.evaluate("//div[@id='main_table']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

	if ( allElements1.snapshotLength == 1 ) {
		mainElement=allElements1.snapshotItem(0);
		mainElement.parentNode.insertBefore(mainElement, mainElement.parentNode.firstChild);
		thisElement=mainElement;
		
		allElements2 = document.evaluate("//div[@id='my_table']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

		if ( allElements2.snapshotLength == 1 ) {
			mainElement=allElements2.snapshotItem(0);
			thisElement.parentNode.insertBefore(mainElement, thisElement.nextSibling);
			thisElement=mainElement;
		}

		allElements2 = document.evaluate("//div[@id='tiv_mafrid']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

		if ( allElements2.snapshotLength == 1 ) {
			mainElement=allElements2.snapshotItem(0);
			thisElement.parentNode.insertBefore(mainElement, thisElement.nextSibling);
			thisElement=mainElement;
		}

		allElements2 = document.evaluate("//div[@id='tiv_my_table']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

		if ( allElements2.snapshotLength == 1 ) {
			mainElement=allElements2.snapshotItem(0);
			thisElement.parentNode.insertBefore(mainElement, thisElement.nextSibling);
			thisElement=mainElement;
		}

		allElements2 = document.evaluate("//div[@id='tiv_main_table']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

		if ( allElements2.snapshotLength == 1 ) {
			mainElement=allElements2.snapshotItem(0);
			thisElement.parentNode.insertBefore(mainElement, thisElement.nextSibling);
			thisElement=mainElement;
		}

		// b. delete all remaining siblings
		while (thisElement.nextSibling!=null)	thisElement.parentNode.removeChild(thisElement.nextSibling);
	}


}

// Yad2 gallery view
if ( checkLocation("Yad2Gallery.php") == true || checkLocation("PetsGallery.php") == true) {
	

	// Remove all other non-relevant information

	// a. search for real contents and move it to top
	allElements1 = document.evaluate("//div[@id='main_table']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

	if ( allElements1.snapshotLength == 1 ) {
		mainElement=allElements1.snapshotItem(0);
		mainElement.parentNode.insertBefore(mainElement, mainElement.parentNode.firstChild);
		thisElement=mainElement;
		
		allElements2 = document.evaluate("//div[@id='my_table']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

		if ( allElements2.snapshotLength == 1 ) {
			mainElement=allElements2.snapshotItem(0);
			thisElement.parentNode.insertBefore(mainElement, thisElement.nextSibling);
			thisElement=mainElement;
		}

		// b. delete all remaining siblings
		while (thisElement.nextSibling!=null)	thisElement.parentNode.removeChild(thisElement.nextSibling);

	}

	// remove soharim
	allElements1 = document.evaluate("//tr[@class='gallery']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

	if ( allElements1.snapshotLength == 2 ) {
		thisElement=allElements1.snapshotItem(1);
		thisElement.parentNode.removeChild(thisElement);
	}

		
	// Find number of days online
	articleLinks = document.querySelectorAll('img[class=\'gallery_ad_image\']');

	for (i = 0; i < articleLinks.length; ++i) {

		var link = articleLinks[i]; 
		var url = link.src;
		var adDate = new Date(parseInt(url.substring(29, 33),10),parseInt(url.substring(33, 35),10) - 1,parseInt(url.substring(36, 38),10));
		var todayDate = new Date();
		var daysDiff = days_between(adDate, todayDate);
		var br = document.createElement("br");
		var textItemNumber = document.createTextNode("מס' ימים בלוח: "+daysDiff);

		link.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(textItemNumber);
		
		if (daysDiff<2)	link.parentNode.parentNode.style.backgroundColor = '#d93800';
		else if (daysDiff<3)	link.parentNode.parentNode.style.backgroundColor = '#ff7722';
		else if (daysDiff<4)	link.parentNode.parentNode.style.backgroundColor = '#f9e648';
		
		link.parentNode.parentNode.parentNode.style.textAlign = 'center';

  	}

}

