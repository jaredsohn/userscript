// ==UserScript==
// @name        MusicBrainz: Import from Juno Download
// @description Import releases from Juno Download
// @version     2013-11-25
// @author      -
// @namespace   -
//
// @include     *://www.junodownload.com/products/*
// @include     *://secure.junodownload.com/products/*
//
// ==/UserScript==
//**************************************************************************//

function injected() {

var myform = document.createElement("form");
myform.method="post";
myform.action = document.location.protocol + "//musicbrainz.org/release/add";
myform.acceptCharset = "UTF-8";
mysubmit = document.createElement("input");
mysubmit.type = "submit";
mysubmit.value = "Add to MusicBrainz";
myform.appendChild(mysubmit);

var div = document.createElement("div");
div.style.position = 'absolute';
div.style.top = 1;
div.style.right = 1;
div.style.padding = '10px';

var artist = '', album = '', label = '', year = 0, month = 0, day = 0, catno = '';

artist = $("#product_heading_artist").text().trim();
album = $("#product_heading_title").text().trim();
label = $("#product_heading_label").text().trim();
catno = $("#product_info_cat_no").text().trim();

$(".product_tracklist_records[itemprop='tracks']").each(function() {
	var trackno = $(this).find(".product_tracklist_heading_records_sn").text().trim() - 1;
	var trackname = $(this).find(".product_tracklist_heading_records_title").text().trim();
	var tracklength = $(this).find(".product_tracklist_heading_records_length").text().trim();

	add_field("mediums.0.track." + trackno + ".name", trackname);
	add_field("mediums.0.track." + trackno + ".length", tracklength);
});

var months = {
	"January": 1,
	"February": 2,
	"March": 3,
	"April": 4,
	"May": 5,
	"June": 6,
	"July": 7,
	"August": 8,
	"September": 9,
	"October": 10,
	"November": 11,
	"December": 12
};

var rdate = $("#product_info_released_on").text().trim();
if (m = rdate.match(/([0-9]{1,2}) ([A-Za-z]+), ([0-9]{4})/)) {
	year = m[3];
	month = months[ m[2] ];
	day = m[1];
}

add_field("artist_credit.names.0.artist.name", artist);
add_field("name", album);
add_field("packaging", 'None');
add_field("date.year", year);
add_field("date.month", month);
add_field("date.day", day);
add_field("labels.0.name", label);
add_field("labels.0.catalog_number", catno);
add_field("country", 'XW');
add_field("status", "official");
add_field("mediums.0.format", 'Digital Media');
//add_field("language", "jpn");
//add_field("script", "Jpan");
add_field("edit_note", document.location.href);
add_field("as_auto_editor", "1"); // no idea what happens here if the user isn't an auto-editor

div.appendChild(myform);
document.body.appendChild(div);

//////////////////////////////////////////////////////////////////////////////

function add_field (name, value) {
	var field = document.createElement("input");
	field.type = "hidden";
	field.name = name;
	field.value = value;
	myform.appendChild(field);
}

}
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ injected +')();'));
document.body.appendChild(script);

