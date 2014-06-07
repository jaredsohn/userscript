// ==UserScript==
// @name           POF Enhance - Extra detail
// @namespace      taf:pof
// @description    Enhance Plenty of Fish - Show more details next to thumbnails
// @include        http://www.pof.com/*
// @include        http://www.plentyoffish.com/*
// @require        https://raw.github.com/fluidinfo/fluidinfo.js/master/fluidinfo.js
// ==/UserScript==

// Don't run a second time inside an IFRAME
if (window!=window.top) { return; }

/**
 * Function : dump()
 * Arguments: The data - array,hash(associative array),object
 *    The level - OPTIONAL
 * Returns  : The textual representation of the array.
 * This function was inspired by the print_r function of PHP.
 * This will accept some data as the argument and return a
 * text that will be a more readable version of the
 * array/hash/object that is given.
 * Docs: http://www.openjs.com/scripts/others/dump_function_php_print_r.php
 */
function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}

function first_detail_box(doc, label) {
	var elements = doc.evaluate("//table[@class='user-details']/tbody/tr/td[contains(.,'" + label + "')]/following-sibling::*[1]/text()",
		doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);	
	if(elements.snapshotLength == 1) {
		return elements.snapshotItem(0).textContent.trim();
	} else {
		GM_log("Failed for " + label);
		return '';
	}
}

function second_detail_box(doc, label) {
	var elements = doc.evaluate("//span[contains(.,'" + label + "')]/parent::*/following-sibling::*[1]/span/text()",
		doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);	
	if(elements.snapshotLength == 1) {
		return elements.snapshotItem(0).textContent.trim();
	} else {
		GM_log("Failed for " + label);
		return '';
	}
}

function scrape_basic_profile_details(fi, doc) {
	GM_log("Scraping");
	
	// Username, fish and headline
	var usernames = doc.evaluate("//div[@class='username-bar']/span/text()",
		doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (usernames.snapshotLength == 2) {
		var username_line = usernames.snapshotItem(0).textContent + usernames.snapshotItem(1).textContent;
	} else {
		var username_line = usernames.snapshotItem(0).textContent;
	}
	var [username, headline] = username_line.trim().split(':\n');
	username = username.trim();
	headline = headline.trim();
	var fishes = doc.evaluate("//div[@class='username-bar']/span/span/text()",
		doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (fishes.snapshotLength > 0) {
		var fish = fishes.snapshotItem(0).textContent;
	} else {
		var fish = "";
	}

	// Main user details box above picture	
	var [smoker, skip_with, body, skip_type] =  first_detail_box(doc, 'About').split("\n");
	smoker = smoker.trim();
	if(body == undefined) {
		body = skip_with.trim().replace(/^with /, "").replace(/ body type$/, "");
	} else {
		body = body.trim();
	}
	
	var [age, skip, sex, height, religion] = first_detail_box(doc, 'Details').split("\n")
	sex = sex.trim().replace(/,+$/, "");
	height = height.trim().replace(/,+$/, "");
	religion = religion.trim();

	var [skip_username, intent] = first_detail_box(doc, 'Intent').split("\n");
	intent = intent.trim().replace(/\.+$/, "");

	var [city, country] = first_detail_box(doc, 'City').split("\n");
	city = city.trim();
	country = country.trim();

	var [ethnic, starsign, skip_with, hair, skip_hair] = first_detail_box(doc, 'Ethnicity').split("\n");
	starsign = starsign.trim();
	hair = hair.trim();

	// Upload scraped details to Fluid Info
	var options = {
	  values: {
		"pof/username": username,
		"pof/fish": fish,
		"pof/headline": headline,
		"pof/smoker" : smoker,
		"pof/body-type" : body,
		"pof/age": age,
		"pof/sex": sex,
		"pof/height": height,
		"pof/religion": religion,
		"pof/intent": intent,
		"pof/city": city,
		"pof/country": country,
		"pof/ethnicity": ethnic,
		"pof/zodiac": starsign,
		"pof/hair": hair,
		"pof/education": first_detail_box(doc, 'Education'),
		"pof/seeking": second_detail_box(doc, 'I am Seeking a'),
		"pof/drink": second_detail_box(doc, 'Do you drink\?'),
		"pof/marital": second_detail_box(doc, 'Marital Status'),
		"pof/pets": second_detail_box(doc, 'Pets'),
		"pof/profession": second_detail_box(doc, 'Profession'),
		"pof/car": second_detail_box(doc, 'Do you have a car\?'),
		"pof/for": second_detail_box(doc, 'For'),
		"pof/wantchildren": second_detail_box(doc, 'Do you want children\?'),
		"pof/drugs": second_detail_box(doc, 'Do you do drugs\?'),
		"pof/eyes": second_detail_box(doc, 'Eye Color'),
		"pof/haschildren": second_detail_box(doc, 'Do you have children\?'),
		"pof/longest_relationship": second_detail_box(doc, 'Longest Relationship'),
	  },
	  about: document.location.href,
	  onSuccess: function(result) {},
	  onError: function(result) {
		GM_log("Error returned from Fluid Info:\n" + dump(result));
	  }
	};
	fi.tag(options);
	GM_log("Uploaded scraped data:\n" + dump(options['values']));
}

function get_current_user(doc) {
	var element = doc.evaluate("//a[contains(.,'My Profile')]",
		doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	if(element) {
		return  element.href
	} else {
		return "";
	}
	
	return href;
}

function set_current_user_active(fi, doc) {
	var current_user_url = get_current_user(doc);
	GM_log("Current active: " + current_user_url);
	if(current_user_url) {
		// Upload timestamp of POF Enhance use by this user
		// to get an idea of use of this script
		var options = {
		  values: {
			"pof/enhance_user": new Date()
		  },
		  about: current_user_url,
		  onSuccess: function(result) {},
		  onError: function(result) {
			GM_log("Error returned from Fluid Info:\n" + dump(result));
		  }
		};
		fi.tag(options);
	}
}

function set_text(image_bar_div, username, location, age, education, profession) {
	var label1 = document.createElement('div');
	label1.appendChild(document.createTextNode(username));
	var label2 = document.createElement('div');
	label2.innerHTML = age + ", " + location + "<br/>" + education + "<br/>" + profession;
	
	image_bar_div.parentNode.insertBefore(label1, image_bar_div);
	image_bar_div.parentNode.appendChild(label2, image_bar_div);
}

function fetch_details(image_bar_div) {
	var options = {
	  about: image_bar_div.href,
	  select: ["pof/username", "pof/city", "pof/age", "pof/education", "pof/profession"],
	  onSuccess: function(result) {
		if (result.data.id) {
			set_text(image_bar_div, result.data["pof/username"], result.data["pof/city"], result.data["pof/age"], result.data["pof/education"], result.data["pof/profession"]);
		} else {
			// TODO: Shift the images to line up!
		}
	  },
	  onError: function(result) {
		GM_log("Error returned from Fluid Info:\n" + dump(result));
	  }
	};
	fi.getObject(options);
}

function fill_image_bar() {
	var image_bar_divs = document.evaluate(
		"//div[@id='image-bar']//a[contains(@href,'viewprofile.aspx')]|//td[@class='inbox-user-img']/center/a[contains(@href,'viewprofile.aspx')]",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
	for(var i=0; i<image_bar_divs.snapshotLength; i++) {
		var image_bar_div = image_bar_divs.snapshotItem(i);
		fetch_details(image_bar_div);
	}
}

var fi = fluidinfo({username: "pofanon", password: "anonpwd"});
//set_current_user_active(fi, document);
if(/^http:\/\/www\.pof\.com\/viewprofile.aspx\?.*profile_id=\d+/.test(window.location)) {
	scrape_basic_profile_details(fi, document);
}
fill_image_bar();
