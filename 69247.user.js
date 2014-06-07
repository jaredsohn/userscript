// ==UserScript==
// @name           Expand Cagle Cartoon Images on Beta Bloglines
// @namespace      cagle_cartoon_bloglines__69247
// @version        0.5
// @include        http*://beta.bloglines.com/*
// @require        http://usocheckup.dune.net/69247.js
// @description    This script will expand Cagle's editorial cartoons within Bloglines Beta.
// ==/UserScript==

// Variables
// caglefeed example: feedsl91776213
var debug = 0;
var wait = 3000; // 3 seconds
var cagle_feed = GM_getValue('cagle_feed', 'none');
if (debug >= 3) GM_log('Retrieved cagle_feed variable: ' + cagle_feed);


// Initialize Script
if (cagle_feed != 'none') setTimeout(initialize, wait);

// === FUNCTIONS == //


function initialize() {
     add_click_listener(cagle_feed);
     
     // Set up settings listener
     var my_profile = document.evaluate(".//*[@id='myprofile']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

     if (my_profile.snapshotLength == 1) {
	  my_profile.snapshotItem(0).addEventListener("click", modify_settings, true);
	  GM_log("Added link to profile settings.");
     }
}


// Adds the onClick listener for the cagle feeds.  Also has the ability
// to add the onClick listener on other links
function add_click_listener(feed_id) {
     if (debug >= 1) GM_log("received feed_id: " + feed_id);
     var feed_num_regex = /(\d+)$/;
     var match = feed_num_regex.exec(feed_id);
     feed_id = match[1];

     if (debug >= 1) GM_log("numerical feed_id: " + feed_id);
     link_array = document.evaluate(".//a[@id='feedsa" + feed_id + "']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

     if (link_array.snapshotLength <= 1) {
	  if (debug >= 3) GM_log("link folder: " + link_array.snapshot(0).getAttribute('href'));
	  link_array.snapshotItem(0).addEventListener("click", start_expanding, true);
	  link_array.snapshotItem(0).setAttribute("style", "color: #008080");
	  
	  link_array2 = document.evaluate(".//ul[@id='feedsu" + feed_id + "']/li//a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	  GM_log('Found ' + link_array2.snapshotLength + ' subfeed(s).');

	  for (i = 0; i < link_array2.snapshotLength; i++) {
	       if (debug >= 3) GM_log("link #" + i + ": " + link_array2.snapshot(i).getAttribute('href'));
	       link_array2.snapshotItem(i).addEventListener("click", start_expanding, true);
	       link_array2.snapshotItem(i).setAttribute("style", "color: #008080");
	  }
     } else {
	  GM_log('Error: There was more than one feed with the same feed number: ' + link_array.snapshotLength);
	  alert('There was an error attempting to execute the script.  Please re-initialize the script by clicking "Settings" in the upper-right corner.');
     }


}

// This function gets triggered when the "Settings" link is pressed
function modify_settings() {
     setTimeout(modify_settings_function, wait);
}

// Integrates the script functional settings with Bloglines' settings
function modify_settings_function() {
     feed_rootlist = document.getElementById('feedsuroot');
     li_array = feed_rootlist.getElementsByTagName('li');
     options_string = "<option value=\"none\">&nbsp;</option>";

     for (i = 0; i < li_array.length; i++) {
	  // feedsl91776213
	  var feed_num_regex = /(\d+)$/;
	  var match = feed_num_regex.exec(li_array[i].getAttribute('id'));

	  // feedssn91776213
	  var feed_title_span = document.getElementById('feedssn' + match[1]);

	  if (li_array[i].getAttribute('id') == cagle_feed) {
	       options_string += "<option value=\"" + li_array[i].getAttribute('id') + "\" selected>" + feed_title_span.innerHTML + "</option>\n";
	  } else {
	       options_string += "<option value=\"" + li_array[i].getAttribute('id') + "\">" + feed_title_span.innerHTML + "</option>\n";
	  }
	  
	  if (debug >= 3) GM_log("Feed " + i + " Found: " + feed_title_span.innerHTML + " (id: " + li_array[i].getAttribute('id') + ")");
     }
     
     form_id = document.getElementById('bl_useroptions');
     
     form_id.innerHTML += "<h3>&nbsp;</h3>\n<hr><h2>Type the title of the folder that contains your Cagle cartoons.</h2><table><tr><th>Cagle Cartoons Folder:</th><td><select id=\"cagle_folder\" style=\"width: 98%; min-width: 150px\">" + options_string + "</select></tr></table>";

     document.getElementById('cagle_folder').addEventListener('change', save_settings, true);
}


// When the drop-down is changed, this function saves it to the browser
function save_settings() {
     feed_id = document.getElementById('cagle_folder').value;
     GM_setValue('cagle_feed', feed_id);
     cagle_feed = GM_getValue('cagle_feed', 'none');
     add_click_listener(cagle_feed);
     alert('Settings saved!');
}


// Function is triggered when the Cagle Cartoon link is clicked
function start_expanding() {
     setTimeout(change_cagle_thumbs, wait);
}

// The actual meat of the script.  This is where all of the changing
// happens.
function change_cagle_thumbs() {
     var images_changed = 0;

     main_content_div = document.getElementById('mainContent');
     div_array = main_content_div.getElementsByTagName('div');

     if (document.getElementById('bl_displayNoItemsBox') != null) {
	  if (debug >= 3) GM_log("Found NoItemsBox");
	  add_click_listener('bl_displayNoItemsBox');
     }

     if (debug >= 3) GM_log("DIV tags found: " + div_array.length);
     for (i = 0; i < div_array.length; i++) {
	  var img_array = div_array[i].getElementsByTagName('img');
	  for (ii = 0; ii < img_array.length; ii++) {
	       if (debug >= 3) GM_log("Testing div # " + i + " image # " + ii + ": " + img_array[ii].src);
	       // http://www.cagle.com/thumbs/100201/payne_200w.jpg
	       if (img_array[ii].src.search(/www.cagle.com\/thumbs/) != -1) {
		    if (debug >= 2) GM_log("Found thumbnail image #: " + ii);
		    var pattern = /(\d+)\/([a-z]+)_\w+.(jpg|gif)/i;
		    var match = pattern.exec(img_array[ii].src);

		    var date_pattern = /^\d+/i;
		    var date_folder = match[1];

		    var author_pattern = /[a-z]+/i;
		    var author = match[2];

		    // http://www.cagle.com/working/100202/cole.jpg
		    if ((date_folder == null) || (author == null)) {
			 GM_log("ERROR detecting pattern: " + match);
		    } else {
			 var new_src = 'http://www.cagle.com/working/' + date_folder + '/' + author + '.' + match[3];
			 if (debug >= 2) GM_log("new src: " + new_src);
			 img_array[ii].src = new_src;

			 img_array[ii].width = 600;
			 images_changed++;
		    }
	       } else if (img_array[ii].src.search(/www.cagle.com\/working/) != -1) {
		    if (debug >= 2) GM_log("Found miniaturized image #: " + ii);
		    img_array[ii].width = 600;
		    images_changed++;
	       }
	  }
	       
     }

     if (images_changed > 0) {
	  if (debug >= 2) GM_log("Images changed: " + images_changed);
     }
}