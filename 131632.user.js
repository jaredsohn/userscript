// ==UserScript==
// @name           Geocaching.com Log-Exporter
// @namespace      http://alopix.net/greasemonkey/gclogexporter
// @description    Let's you export your geocaching.com logs
// @version        1.0.1
// @build          12423
// @copyright      2012 /dev/alopix
// @license        CC BY-NC-ND 3.0; http://creativecommons.org/licenses/by-nc-nd/3.0/at/deed.en
// @include        http://www.geocaching.com/my/logs.aspx?s=1
// @uso:script     131632
// ==/UserScript==

var SCRIPT_NAME = 'Log-Exporter';
var SCRIPT_VERSION = '1.0';
var GPX_CREATOR = SCRIPT_NAME + ' ' + SCRIPT_VERSION;
var COPYRIGHT = '2012 /dev/alopix';

var MAX_SIMULTAN_REQUESTS = 10;

function xsdDateTime(date) {
	function pad(n) {
		var s = n.toString();
		return s.length < 2 ? '0'+s : s;
	};
	
	var yyyy = date.getFullYear();
	var mm1  = pad(date.getMonth()+1);
	var dd   = pad(date.getDate());
	var hh   = pad(date.getHours());
	var mm2  = pad(date.getMinutes());
	var ss   = pad(date.getSeconds());
	
	return yyyy +'-' +mm1 +'-' +dd +'T' +hh +':' +mm2 +':' +ss;
}

var GPX = function() {
	this.username = null;
	this.time = null;
	this.wpts = [];
};
GPX.prototype.toXML = function() {
	var xml = '<?xml version="1.0" encoding="utf-8"?>\
<gpx xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" version="1.0" xsi:schemaLocation="http://www.topografix.com/GPX/1/0 http://www.topografix.com/GPX/1/0/gpx.xsd http://www.groundspeak.com/cache/1/0/2 http://www.groundspeak.com/cache/1/0/2/cache.xsd" xmlns="http://www.topografix.com/GPX/1/0" creator="' + GPX_CREATOR + '">\
<metadata>\
<name>Geocaching.com Log Export</name>\n';
	if (this.username) {
		xml += '<author>Account "' + this.username + '" from Geocaching.com</author>\n';
	}
	if (this.time) {
		xml += '<time>' + this.time + '</time>\n';
	}
	xml += '</metadata>\n';
	var wptsLen = this.wpts.length;
	for (var i = 0; i < wptsLen; ++i) {
		var wpt = this.wpts[i];
		xml += wpt.toXML();
	}
	xml += '</gpx>';
	return xml;
};

var WPT = function () {
	this.lat = 0.0;
	this.lon = 0.0;
	this.time = null;
	this.name = null;
	this.desc = null;
	this.url = null;
	this.urlname = null;
	this.sym = null;
	this.type = null;
	this.extensions = [];
};
WPT.prototype.toXML = function() {
	var xml = '<wpt lat="' + this.lat + '" lon="' + this.lon + '">\n';
	if (this.time) {
		xml += '<time>' + this.time + '</time>\n';
	}
	if (this.name) {
		xml += '<name>' + this.name + '</name>\n';
	}
	if (this.desc) {
		xml += '<desc>' + this.desc + '</desc>\n';
	}
	if (this.url) {
		xml += '<url>' + this.url + '</url>\n';
	}
	if (this.urlname) {
		xml += '<urlname>' + this.urlname + '</urlname>\n';
	}
	if (this.sym) {
		xml += '<sym>' + this.sym + '</sym>\n';
	}
	if (this.type) {
		xml += '<type>' + this.type + '</type>\n';
	}
	var extensionsLen = this.extensions.length;
	for (var i = 0; i < extensionsLen; ++i) {
		xml += this.extensions[i].toXML();
	}
	xml += '</wpt>\n';
	return xml;
};

var GeocacheOwner = function() {
	this.id = null;
	this.name = null;
};
GeocacheOwner.prototype.toXML = function() {
	return '<groundspeak:owner id="' + this.id + '">' + this.name + '</groundspeak:owner>\n';
};

var GeocacheType = function() {
	this.id = 0;
	this.name = null;
};
GeocacheType.prototype.toXML = function() {
	return '<groundspeak:type id="' + this.id + '">' + this.name + '</groundspeak:type>\n';
};
GeocacheType.type_values = null;
GeocacheType.values = function() {
	if (GeocacheType.type_values == null) {
		GeocacheType.type_values = {};
		GeocacheType.type_values[2] = 'Traditional Caches';
		GeocacheType.type_values[3] = 'Multi-caches';
		GeocacheType.type_values[4] = 'Virtual Caches';
		GeocacheType.type_values[5] = 'Letterbox Hybrids';
		GeocacheType.type_values[6] = 'Event Caches';
		GeocacheType.type_values[8] = 'Unknown (Mystery) Caches';
		GeocacheType.type_values[9] = 'Project APE Caches';
		GeocacheType.type_values[11] = 'Webcam Caches';
		GeocacheType.type_values[12] = 'Locationless (Reverse) Caches';
		GeocacheType.type_values[13] = 'Cache In Trash Out Events';
		GeocacheType.type_values[137] = 'Earthcaches';
		GeocacheType.type_values[453] = 'Mega-Event Caches';
		GeocacheType.type_values[605] = 'Geocache Courses';
		GeocacheType.type_values[1304] = 'GPS Adventures Exhibit';
		GeocacheType.type_values[1858] = 'Wherigo Caches';
		GeocacheType.type_values[3653] = 'Lost and Found Event Caches';
		GeocacheType.type_values[3773] = 'Groundspeak HQ';
		GeocacheType.type_values[3774] = 'Groundspeak Lost and Found Celebration';
		GeocacheType.type_values[4738] = 'Groundspeak Block Party';
	}
	return GeocacheType.type_values;
};
GeocacheType.fromId = function(id) {
	var values = GeocacheType.values();
	if (!values.hasOwnProperty(id)) {
		return null;
	}
	var type = new GeocacheType();
	type.id = id;
	type.name = values[id];
	return type;
};
GeocacheType.fromName = function(name) {
	var type = new GeocacheType();
	type.name = name;
	var values = GeocacheType.values();
	for (var key in values) {
		if (key === 'length' || !values.hasOwnProperty(key)) {
			continue;
		}
		if (values[key] == name) {
			type.id = key;
			return type;
		}
	}
	return null;
};

var GeocacheContainer = function() {
	this.id = 0;
	this.name = null;
};
GeocacheContainer.prototype.toXML = function() {
	return '<groundspeak:container id="' + this.id + '">' + this.name + '</groundspeak:container>\n';
};
GeocacheContainer.container_values = null;
GeocacheContainer.values = function() {
	if (GeocacheContainer.container_values == null) {
		GeocacheContainer.container_values = {};
		GeocacheContainer.container_values[1] = 'Not chosen';
		GeocacheContainer.container_values[2] = 'Micro';
		GeocacheContainer.container_values[3] = 'Regular';
		GeocacheContainer.container_values[4] = 'Large';
		GeocacheContainer.container_values[5] = 'Virtual';
		GeocacheContainer.container_values[6] = 'Other';
		GeocacheContainer.container_values[8] = 'Small';
	}
	return GeocacheContainer.container_values;
};
GeocacheContainer.fromId = function(id) {
	var values = GeocacheContainer.values();
	if (!values.hasOwnProperty(id)) {
		return null;
	}
	var type = new GeocacheContainer();
	type.id = id;
	type.name = values[id];
	return type;
};
GeocacheContainer.fromName = function(name) {
	var type = new GeocacheContainer();
	type.name = name;
	var values = GeocacheContainer.values();
	for (var key in values) {
		if (key === 'length' || !values.hasOwnProperty(key)) {
			continue;
		}
		if (values[key] == name) {
			type.id = key;
			return type;
		}
	}
	return null;
};

var GeocacheAttribute = function() {
	this.id = 0;
	this.inc = 0;
	this.name = null;
};
GeocacheAttribute.prototype.toXML = function() {
	return '<groundspeak:attribute id="' + this.id + '" inc="' + this.inc + '">' + this.name + '</groundspeak:attribute>\n';
};
GeocacheAttribute.attribute_values = null;
GeocacheAttribute.values = function() {
	if (GeocacheAttribute.attribute_values == null) {
		GeocacheAttribute.attribute_values = {};
		GeocacheAttribute.attribute_values[1] = 'Dogs';
		GeocacheAttribute.attribute_values[2] = 'Access or parking fee';
		GeocacheAttribute.attribute_values[3] = 'Climbing gear';
		GeocacheAttribute.attribute_values[4] = 'Boat';
		GeocacheAttribute.attribute_values[5] = 'Scuba gear';
		GeocacheAttribute.attribute_values[6] = 'Recommended for kids';
		GeocacheAttribute.attribute_values[7] = 'Takes less than an hour';
		GeocacheAttribute.attribute_values[8] = 'Scenic view';
		GeocacheAttribute.attribute_values[9] = 'Significant Hike';
		GeocacheAttribute.attribute_values[10] = 'Difficult climbing';
		GeocacheAttribute.attribute_values[11] = 'May require wading';
		GeocacheAttribute.attribute_values[12] = 'May require swimming';
		GeocacheAttribute.attribute_values[13] = 'Available at all times';
		GeocacheAttribute.attribute_values[14] = 'Recommended at night';
		GeocacheAttribute.attribute_values[15] = 'Available during winter';
		GeocacheAttribute.attribute_values[16] = 'Cactus';
		GeocacheAttribute.attribute_values[17] = 'Poison plants';
		GeocacheAttribute.attribute_values[18] = 'Dangerous Animals';
		GeocacheAttribute.attribute_values[19] = 'Ticks';
		GeocacheAttribute.attribute_values[20] = 'Abandoned mines';
		GeocacheAttribute.attribute_values[21] = 'Cliff / falling rocks';
		GeocacheAttribute.attribute_values[22] = 'Hunting';
		GeocacheAttribute.attribute_values[23] = 'Dangerous area';
		GeocacheAttribute.attribute_values[24] = 'Wheelchair accessible';
		GeocacheAttribute.attribute_values[25] = 'Parking available';
		GeocacheAttribute.attribute_values[26] = 'Public transportation';
		GeocacheAttribute.attribute_values[27] = 'Drinking water nearby';
		GeocacheAttribute.attribute_values[28] = 'Public restrooms nearby';
		GeocacheAttribute.attribute_values[29] = 'Telephone nearby';
		GeocacheAttribute.attribute_values[30] = 'Picnic tables nearby';
		GeocacheAttribute.attribute_values[31] = 'Camping available';
		GeocacheAttribute.attribute_values[32] = 'Bicycles';
		GeocacheAttribute.attribute_values[33] = 'Motorcycles';
		GeocacheAttribute.attribute_values[34] = 'Quads';
		GeocacheAttribute.attribute_values[35] = 'Off-road vehicles';
		GeocacheAttribute.attribute_values[36] = 'Snowmobiles';
		GeocacheAttribute.attribute_values[37] = 'Horses';
		GeocacheAttribute.attribute_values[38] = 'Campfires';
		GeocacheAttribute.attribute_values[39] = 'Thorns';
		GeocacheAttribute.attribute_values[40] = 'Stealth required';
		GeocacheAttribute.attribute_values[41] = 'Stroller accessible';
		GeocacheAttribute.attribute_values[42] = 'Needs maintenance';
		GeocacheAttribute.attribute_values[43] = 'Watch for livestock';
		GeocacheAttribute.attribute_values[44] = 'Flashlight required';
		GeocacheAttribute.attribute_values[45] = 'Lost And Found Tour';
		GeocacheAttribute.attribute_values[46] = 'Truck Driver/RV';
		GeocacheAttribute.attribute_values[47] = 'Field Puzzle';
		GeocacheAttribute.attribute_values[48] = 'UV Light Required';
		GeocacheAttribute.attribute_values[49] = 'Snowshoes';
		GeocacheAttribute.attribute_values[50] = 'Cross Country Skis';
		GeocacheAttribute.attribute_values[51] = 'Special Tool Required';
		GeocacheAttribute.attribute_values[52] = 'Night Cache';
		GeocacheAttribute.attribute_values[53] = 'Park and Grab';
		GeocacheAttribute.attribute_values[54] = 'Abandoned Structure';
		GeocacheAttribute.attribute_values[55] = 'Short hike (less than 1km)';
		GeocacheAttribute.attribute_values[56] = 'Medium hike (1km-10km)';
		GeocacheAttribute.attribute_values[57] = 'Long Hike (+10km)';
		GeocacheAttribute.attribute_values[58] = 'Fuel Nearby';
		GeocacheAttribute.attribute_values[59] = 'Food Nearby';
		GeocacheAttribute.attribute_values[60] = 'Wireless Beacon';
		GeocacheAttribute.attribute_values[61] = 'Partnership Cache';
		GeocacheAttribute.attribute_values[62] = 'Seasonal Access';
		GeocacheAttribute.attribute_values[63] = 'Tourist Friendly';
		GeocacheAttribute.attribute_values[64] = 'Tree Climbing';
		GeocacheAttribute.attribute_values[65] = 'Front Yard (Private Residence)';
		GeocacheAttribute.attribute_values[66] = 'Teamwork Required';
	}
	return GeocacheAttribute.attribute_values;
};
GeocacheAttribute.fromId = function(id) {
	var values = GeocacheAttribute.values();
	if (!values.hasOwnProperty(id)) {
		return null;
	}
	var type = new GeocacheAttribute();
	type.id = id;
	type.name = values[id];
	return type;
};
GeocacheAttribute.fromName = function(name) {
	var type = new GeocacheAttribute();
	type.name = name;
	var values = GeocacheAttribute.values();
	for (var key in values) {
		if (key === 'length' || !values.hasOwnProperty(key)) {
			continue;
		}
		if (values[key] == name) {
			type.id = key;
			return type;
		}
	}
	return null;
};

var GeocacheDescription = function() {
	this.is_short = false;
	this.html = false;
	this.text = null;
};
GeocacheDescription.prototype.toXML = function() {
	return '<groundspeak:' + (this.is_short ? 'short' : 'long') + '_description hmtl="' + this.html + '">' + this.text + '</groundspeak:' + (this.is_short ? 'short' : 'long') + '_description>\n';
};

var GeocacheLogType = function() {
	this.id = 0;
	this.name = null;
};
GeocacheLogType.prototype.toXML = function() {
	return '<groundspeak:type id="' + this.id + '">' + this.name + '</groundspeak:type>\n';
};
GeocacheLogType.type_values = null;
GeocacheLogType.values = function() {
	if (GeocacheLogType.type_values == null) {
		GeocacheLogType.type_values = {};
		GeocacheLogType.type_values[1] = 'Unarchive';
		GeocacheLogType.type_values[2] = 'Found it';
		GeocacheLogType.type_values[3] = 'Didn\'t find it';
		GeocacheLogType.type_values[4] = 'Write note';
		GeocacheLogType.type_values[5] = 'Archive';
		GeocacheLogType.type_values[6] = 'Archive';
		GeocacheLogType.type_values[7] = 'Needs Archived';
		GeocacheLogType.type_values[8] = 'Mark Destroyed';
		GeocacheLogType.type_values[9] = 'Will Attend';
		GeocacheLogType.type_values[10] = 'Attended';
		GeocacheLogType.type_values[11] = 'Webcam Photo Taken';
		GeocacheLogType.type_values[12] = 'Unarchive';
		GeocacheLogType.type_values[13] = 'Retrieve It from a Cache';
		GeocacheLogType.type_values[14] = 'Dropped Off';
		GeocacheLogType.type_values[15] = 'Transfer';
		GeocacheLogType.type_values[16] = 'Mark Missing';
		GeocacheLogType.type_values[17] = 'Recovered';
		GeocacheLogType.type_values[18] = 'Post Reviewer Note';
		GeocacheLogType.type_values[19] = 'Grab It (Not from a Cache)';
		GeocacheLogType.type_values[20] = 'Write Jeep 4x4 Contest Essay';
		GeocacheLogType.type_values[21] = 'Upload Jeep 4x4 Contest Photo';
		GeocacheLogType.type_values[22] = 'Temporarily Disable Listing';
		GeocacheLogType.type_values[23] = 'Enable Listing';
		GeocacheLogType.type_values[24] = 'Publish Listing';
		GeocacheLogType.type_values[25] = 'Retract Listing';
		GeocacheLogType.type_values[30] = 'Uploaded Goal Photo for "A True Original"';
		GeocacheLogType.type_values[31] = 'Uploaded Goal Photo for "Yellow Jeep Wrangler"';
		GeocacheLogType.type_values[32] = 'Uploaded Goal Photo for "Construction Site"';
		GeocacheLogType.type_values[33] = 'Uploaded Goal Photo for "State Symbol"';
		GeocacheLogType.type_values[34] = 'Uploaded Goal Photo for "American Flag"';
		GeocacheLogType.type_values[35] = 'Uploaded Goal Photo for "Landmark/Memorial"';
		GeocacheLogType.type_values[36] = 'Uploaded Goal Photo for "Camping"';
		GeocacheLogType.type_values[37] = 'Uploaded Goal Photo for "Peaks and Valleys"';
		GeocacheLogType.type_values[38] = 'Uploaded Goal Photo for "Hiking"';
		GeocacheLogType.type_values[39] = 'Uploaded Goal Photo for "Ground Clearance"';
		GeocacheLogType.type_values[40] = 'Uploaded Goal Photo for "Water Fording"';
		GeocacheLogType.type_values[41] = 'Uploaded Goal Photo for "Traction"';
		GeocacheLogType.type_values[42] = 'Uploaded Goal Photo for "Tow Package"';
		GeocacheLogType.type_values[43] = 'Uploaded Goal Photo for "Ultimate Makeover"';
		GeocacheLogType.type_values[44] = 'Uploaded Goal Photo for "Paint Job"';
		GeocacheLogType.type_values[45] = 'Needs Maintenance';
		GeocacheLogType.type_values[46] = 'Owner Maintenance';
		GeocacheLogType.type_values[47] = 'Update Coordinates';
		GeocacheLogType.type_values[48] = 'Discovered It';
		GeocacheLogType.type_values[49] = 'Uploaded Goal Photo for "Discovery"';
		GeocacheLogType.type_values[50] = 'Uploaded Goal Photo for "Freedom"';
		GeocacheLogType.type_values[51] = 'Uploaded Goal Photo for "Adventure"';
		GeocacheLogType.type_values[52] = 'Uploaded Goal Photo for "Camaraderie"';
		GeocacheLogType.type_values[53] = 'Uploaded Goal Photo for "Heritage"';
		GeocacheLogType.type_values[54] = 'Reviewer Note';
		GeocacheLogType.type_values[55] = 'Lock User (Ban)';
		GeocacheLogType.type_values[56] = 'Unlock User (Unban)';
		GeocacheLogType.type_values[57] = 'Groundspeak Note';
		GeocacheLogType.type_values[58] = 'Uploaded Goal Photo for "Fun"';
		GeocacheLogType.type_values[59] = 'Uploaded Goal Photo for "Fitness"';
		GeocacheLogType.type_values[60] = 'Uploaded Goal Photo for "Fighting Diabetes"';
		GeocacheLogType.type_values[61] = 'Uploaded Goal Photo for "American Heritage"';
		GeocacheLogType.type_values[62] = 'Uploaded Goal Photo for "No Boundaries"';
		GeocacheLogType.type_values[63] = 'Uploaded Goal Photo for "Only in a Jeep"';
		GeocacheLogType.type_values[64] = 'Uploaded Goal Photo for "Discover New Places"';
		GeocacheLogType.type_values[65] = 'Uploaded Goal Photo for "Definition of Freedom"';
		GeocacheLogType.type_values[66] = 'Uploaded Goal Photo for "Adventure Starts Here"';
		GeocacheLogType.type_values[67] = 'Needs Attention';
		GeocacheLogType.type_values[68] = 'Post Reviewer Note';
		GeocacheLogType.type_values[69] = 'Move To Collection';
		GeocacheLogType.type_values[70] = 'Move To Inventory';
		GeocacheLogType.type_values[71] = 'Throttle User';
		GeocacheLogType.type_values[72] = 'Enter CAPTCHA';
		GeocacheLogType.type_values[73] = 'Change Username';
		GeocacheLogType.type_values[74] = 'Announcement';
		GeocacheLogType.type_values[75] = 'Visited';
	}
	return GeocacheLogType.type_values;
};
GeocacheLogType.fromId = function(id) {
	var values = GeocacheLogType.values();
	if (!values.hasOwnProperty(id)) {
		return null;
	}
	var type = new GeocacheLogType();
	type.id = id;
	type.name = values[id];
	return type;
};
GeocacheLogType.fromName = function(name) {
	var type = new GeocacheLogType();
	type.name = name;
	var values = GeocacheLogType.values();
	for (var key in values) {
		if (key === 'length' || !values.hasOwnProperty(key)) {
			continue;
		}
		if (values[key] == name) {
			type.id = key;
			return type;
		}
	}
	return null;
};

var GeocacheLogFinder = function() {
	this.id = null;
	this.name = null;
};
GeocacheLogFinder.prototype.toXML = function() {
	return '<groundspeak:finder id="' + this.id + '">' + this.name + '</groundspeak:owner>\n';
};

var GeocacheLogText = function() {
	this.encoded = false;
	this.text = null;
};
GeocacheLogText.prototype.toXML = function() {
	return '<groundspeak:text encoded="' + this.encoded + '">' + this.text + '</groundspeak:text>\n';
};

var GeocacheLogWpt = function() {
	this.lat = 0.0;
	this.lon = 0.0;
};
GeocacheLogWpt.prototype.toXML = function() {
	return '<groundspeak:log_wpt lat="' + this.lat + '" lon="' + this.lon + '"/>\n';
};

var GeocacheImage = function() {
	this.name = null;
	this.url = null;
	this.desc = null;
};
GeocacheImage.prototype.toXML = function() {
	var xml = '<groundspeak:image>\n';
	if (this.name) {
		xml += '<groundspeak:name>' + this.name + '</groundspeak:name>\n';
	}
	if (this.url) {
		xml += '<groundspeak:url>' + this.url + '</groundspeak:url>\n';
	}
	if (this.desc) {
		xml += '<groundspeak:desc>' + this.desc + '</groundspeak:desc>\n';
	}
	xml += '</groundspeak:image>\n';
	return xml;
};

var GeocacheLog = function() {
	this.id = null;
	this.date = null;
	this.type = null;
	this.finder = null;
	this.text = null;
	this.log_wpt = null;
	this.images = [];
};
GeocacheLog.prototype.toXML = function() {
	var xml = '<groundspeak:log id="' + this.id + '">\n';
	if (this.date) {
		xml += '<groundspeak:date>' + this.date + '</groundspeak:date>\n';
	}
	if (this.type) {
		xml += this.type.toXML();
	}
	if (this.finder) {
		xml += this.finder.toXML();
	}
	if (this.text) {
		xml += this.text.toXML();
	}
	if (this.log_wpt) {
		xml += this.log_wpt.toXML();
	}
	var imagesLen = this.images.length;
	if (imagesLen) {
		xml += '<groundspeak:images>\n';
		for (var i = 0; i < imagesLen; ++i) {
			xml += this.images[i].toXML();
		}
		xml += '</grounspeak:images>\n';
	}
	xml += '</groundspeak:log>\n';
	return xml;
};

var GeocacheTravelbug = function() {
	this.id = null;
	this.name = null;
};
GeocacheTravelbug.prototype.toXML = function() {
	var xml = '<groundspeak:travelbug id="' + this.id + '">\n';
	if (this.name) {
		xml += '<groundspeak:name>' + this.name + '</groundspeak:name>\n';
	}
	xml += '</groundspeak:travelbug>\n';
	return xml;
};

var Geocache = function() {
	this.id = null;
	this.available = true;
	this.archived = false;
	this.memberonly = false;
	this.customcoords = false;
	this.name = null;
	this.placed_by = null;
	this.owner = null;
	this.type = null;
	this.container = null;
	this.attributes = [];
	this.difficulty = 0;
	this.terrain = 0;
	this.country = null;
	this.state = null;
	this.short_description = null;
	this.long_description = null;
	this.encoded_hints = null;
	this.personal_note = null;
	this.favorite_points = 0;
	this.logs = [];
	this.travelbugs = [];
	this.images = [];
};
Geocache.prototype.toXML = function() {
	var xml = '<groundspeak:cache id="' + this.id + '" available="' + this.available + '" archived="' + this.archived + '" memberonly="' + this.memberonly + '" customcoords="' + this.customcoords + '" xmlns:groundspeak="http://www.groundspeak.com/cache/1/0/2">\n';
	if (this.name) {
		xml += '<groundspeak:name>' + this.name + '</groundspeak:name>\n';
	}
	if (this.placed_by) {
		xml += '<groundspeak:placed_by>' + this.placed_by + '</groundspeak:placed_by>\n';
	}
	if (this.owner) {
		xml += this.owner.toXML();
	}
	if (this.type) {
		xml += this.type.toXML();
	}
	if (this.container) {
		xml += this.container.toXML();
	}
	var attributesLen = this.attributes.length;
	if (attributesLen > 0) {
		xml += '<groundspeak:attributes>\n';
		for (var i = 0; i < attributesLen; ++i) {
			xml += this.attributes[i].toXML();
		}
		xml += '</groundspeak:attributes>\n';
	}
	if (this.difficulty) {
		xml += '<groundspeak:difficulty>' + this.difficulty + '</groundspeak:difficulty>\n';
	}
	if (this.terrain) {
		xml += '<groundspeak:terrain>' + this.terrain + '</groundspeak:terrain>\n';
	}
	if (this.country) {
		xml += '<groundspeak:country>' + this.country + '</groundspeak:country>\n';
	}
	if (this.state) {
		xml += '<groundspeak:state>' + this.state + '</groundspeak:state>\n';
	}
	if (this.short_description) {
		xml += this.short_description.toXML();
	}
	if (this.long_description) {
		xml += this.long_description.toXML();
	}
	if (this.encoded_hints) {
		xml += '<groundspeak:encoded_hints>' + this.encoded_hints + '</groundspeak:encoded_hints>\n';
	}
	if (this.personal_note) {
		xml += '<groundspeak:personal_note>' + this.personal_note + '</groundspeak:personal_note>\n';
	}
	if (this.favorite_points) {
		xml += '<groundspeak:favorite_points>' + this.favorite_points + '</groundspeak:favorite_points>\n';
	}
	var logsLen = this.logs.length;
	if (logsLen > 0) {
		xml += '<groundspeak:logs>\n';
		for (var i = 0; i < logsLen; ++i) {
			xml += this.logs[i].toXML();
		}
		xml += '</groundspeak:logs>\n';
	}
	var travelbugsLen = this.travelbugs.length;
	if (travelbugsLen > 0) {
		xml += '<groundspeak:travelbugs>\n';
		for (var i = 0; i < travelbugsLen; ++i) {
			xml += this.travelbugs[i].toXML();
		}
		xml += '</groundspeak:travelbugs>\n';
	}
	var imagesLen = this.images.length;
	if (imagesLen > 0) {
		xml += '<groundspeak:images>\n';
		for (var i = 0; i < imagesLen; ++i) {
			xml += this.images[i].toXML();
		}
		xml += '</groundspeak:images>\n';
	}
	xml += '</groundspeak:cache>';
	return xml;
};

String.prototype.trim=function(){return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');};

var requestObjectPool = [];

var requestPool = [];

function sendRequest(url,callback,postData) {
	var request = {
		url:url,
		callback:callback,
		postData:postData,
	};
	requestPool.push(request);
}

function startRequests() {
	for (var i = 0; i < MAX_SIMULTAN_REQUESTS; ++i) {
		putRequestObjectBack(createXMLHTTPObject());
	}
}

function putRequestObjectBack(requestObject) {
	requestObject.abort();
	if (requestPool.length > 0) {
		var request = requestPool.pop();
		startRequest(requestObject, request);
	} else {
		requestObjectPool.push(requestObject);
	}
}

function startRequest(req, data) {
	var url = data.url;
	var callback = data.callback;
	var postData = data.postData;
	if (!req) return;
	var method = (postData) ? "POST" : "GET";
	req.open(method,url,true);
	//req.setRequestHeader('User-Agent','XMLHTTP/1.0');
	if (postData)
		req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	req.onreadystatechange = function () {
		if (req.readyState != 4) return;
		if (req.status != 200 && req.status != 304) {
			alert('HTTP error ' + req.status);
			return;
		}
		callback(req);
		putRequestObjectBack(req);
	}
	if (req.readyState == 4) return;
	req.send(postData);
}

var XMLHttpFactories = [
	function () {return new XMLHttpRequest()},
	function () {return new ActiveXObject("Msxml2.XMLHTTP")},
	function () {return new ActiveXObject("Msxml3.XMLHTTP")},
	function () {return new ActiveXObject("Microsoft.XMLHTTP")}
];

function createXMLHTTPObject() {
	var xmlhttp = false;
	for (var i=0;i<XMLHttpFactories.length;i++) {
		try {
			xmlhttp = XMLHttpFactories[i]();
		}
		catch (e) {
			continue;
		}
		break;
	}
	return xmlhttp;
}


// Get the username
var username = document.querySelector('#ctl00_divSignedIn').querySelectorAll('a')[1].innerText;

var gpx = new GPX();
gpx.username = username;
gpx.time = xsdDateTime(new Date());

// First, get all rows of the logs table
var rows = document.querySelector('#ctl00_divContentMain').querySelector('table').querySelectorAll('tr');
var rowsLen = rows.length;
//rowsLen = 2; // For debugging only!
for (var i = 0; i < rowsLen; ++i) {
	// Now go through all columns and create the geocache plus logs
	var row = rows[i];
	var cols = row.querySelectorAll('td');
	
	var wpt = new WPT();
	gpx.wpts.push(wpt);
	wpt.sym = 'Geocache';
	var geocache = new Geocache();
	wpt.extensions.push(geocache);
	
	// cols[0] is the log type (Found It, DNF, ...)
	var col = cols[0];
	var log = new GeocacheLog();
	log.type = GeocacheLogType.fromName(col.querySelector('img').getAttribute('title'));
	log.finder = new GeocacheLogFinder();
	log.finder.name = username;
	geocache.logs.push(log);
	
	// cols[1] is unused?!
	var col = cols[1];
	
	// cols[2] is the log date
	var col = cols[2];
	var d = col.innerHTML.trim();
	var year = d.substr(0, 4);
	var month = d.substr(5, 2);
	var date = d.substr(8, 2);
	log.date = xsdDateTime(new Date(year, month, date));
	
	// cols[3] is the cache
	var col = cols[3];
	var geocache_type_src = col.querySelector('img').getAttribute('src');
	var geocache_type_id = geocache_type_src.substr(geocache_type_src.lastIndexOf('/') + 1);
	geocache_type_id = geocache_type_id.substr(0, geocache_type_id.indexOf('.'));
	if (geocache_type_id == 'earthcache') {
		geocache_type_id = 137;
	}
	// TODO: for debugging of wrong cache type ids
	//console.log('type_id: ' + geocache_type_id);
	geocache.type = GeocacheType.fromId(geocache_type_id);
	//console.log('name: ' + col.querySelectorAll('a')[1].innerText);
	wpt.type = 'Geocache|' + geocache.type.name;
	var geocache_link = col.querySelectorAll('a')[1];
	geocache.name = geocache_link.innerText;
	wpt.url = geocache_link.getAttribute('href'); // Only preliminary
	var geocache_status = geocache_link.querySelector('span');
	if (geocache_status) {
		geocache.available = true;
		if (geocache_status.getAttribute('class').indexOf('OldWarning') != -1) {
			geocache.archived = true;
		}
	}
	
	// cols[4] is the cache's country and state
	var col = cols[4];
	var country_state = col.innerText;
	if (country_state) {
		var state_ = country_state.indexOf(',');
		if (state_ == -1) {
			geocache.country = country_state.trim();
		} else {
			geocache.state = country_state.substr(0, state_).trim();
			geocache.country = country_state.substr(state_ + 2).trim();
		}
	}
	
	// cols[5] is the log link
	var col = cols[5];
	log.id = col.querySelector('a').getAttribute('href'); // Only preliminary
}

function downloadGPX(gpx) {
	document.writeln(gpx);
	//sendRequest('http://www.alopix.net/download.php', function(request) {
	//	console.log("DOWNLOAD RESPONSE");
	//}, 'download='+gpx);
}

var xhrRequestCount = 0;

function decXhrRequestCount() {
	if (--xhrRequestCount == 0) {
		// TODO: let the user download the gpx instead of displaying it
		downloadGPX(gpx.toXML());
	}
}

function createGeocacheResponseHandler(wpt) {
	return function(request) {
		var geocache = wpt.extensions[0];
		//console.log('Got GEOCACHE response');
		var doc = new DOMParser().parseFromString(request.responseText, "text/html");
		if (doc.querySelector('#ctl00_ContentBody_memberComparePanel')) {
			geocache.memberonly = true;
			var name_id = doc.querySelector('h2').innerText;
			var id = name_id.substr(name_id.indexOf('('));
			id = name.substr(0, id.indexOf(')')-1);
			//var name = name_id.substr(0, name_id.indexOf('(') - 1);
			var owner_name = doc.querySelector('#ctl00_ContentBody_uxCacheType').substr('A cache by '.length);
			var cache_details = doc.querySelector('.PMCacheInfoSpacing').querySelectorAll('img');
			var container = cache_details[0].getAttribute('alt');
			container = container.substr('Size: '.length);
			var difficulty = cache_details[1].getAttribute('alt');
			difficulty = difficulty.substr(0, difficulty.indexOf(' '));
			var terrain = cache_details[2].getAttribute('alt');
			terrain = terrain.substr(0, terrain.indexOf(' '));
		} else {
			var id = doc.querySelector('#ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode').innerHTML;
			var owner_name = doc.querySelector('.minorCacheDetails').querySelector('a').innerHTML;
			var difficulty = doc.querySelector('#ctl00_ContentBody_uxLegendScale').querySelector('img').getAttribute('alt');
			difficulty = difficulty.substr(0, difficulty.indexOf(' '));
			var terrain = doc.querySelector('#ctl00_ContentBody_Localize12').querySelector('img').getAttribute('alt');
			terrain = terrain.substr(0, terrain.indexOf(' '));
			var container = doc.querySelector('.CacheSize').querySelector('small').innerHTML.substr(1);
			container = container.substr(0, container.length - 1);
		}
		//geocache.name = name;
		wpt.name = id;
		wpt.url = 'http://coord.info/' + id;
		wpt.urlname = name;
		geocache.id = id;
		geocache.container = GeocacheContainer.fromName(container);
		geocache.difficulty = difficulty;
		geocache.terrain = terrain;
		geocache.owner = new GeocacheOwner();
		geocache.owner.name = owner_name;
		wpt.desc = name + ' by ' + geocache.owner.name + ', ' + geocache.type.name + ' (' + geocache.difficulty + '/' + geocache.terrain + ')';
		decXhrRequestCount();
	};
}

function createLogResponseHandler(log) {
	return function(request) {
		//console.log('Got LOG response');
		var doc = new DOMParser().parseFromString(request.responseText, "text/html");
		log.id = doc.querySelector('#ctl00_ContentBody_LogBookPanel1_CoordInfoLinkControl1_uxCoordInfoCode').innerHTML;
		log.text = new GeocacheLogText();
		// TODO: how to find this out???
		//log.text.encoded = false;
		log.text.text = doc.querySelector('#ctl00_ContentBody_LogBookPanel1_LogText').innerHTML.replace('<br>', '\n');
		// TODO: add images, new waypoint, ...
		decXhrRequestCount();
	};
}

// TODO: open geocaches and logs and get the missing information
var wptsLen = gpx.wpts.length;
xhrRequestCount = wptsLen * 2;
for (var i = 0; i < wptsLen; ++i) {
	var wpt = gpx.wpts[i];
	var geocache = wpt.extensions[0];
	var log = geocache.logs[0];
	
	sendRequest(wpt.url, createGeocacheResponseHandler(wpt));
	
	sendRequest(log.id, createLogResponseHandler(log));
}

startRequests();