// ==UserScript==
// @name        MusicBrainz: Geordi information
// @description 
// @version     2013-08-16
// @author      -
// @namespace   http://userscripts.org/users/41307
//
// @include     *://musicbrainz.org/artist/*
// @include     *://beta.musicbrainz.org/artist/*
// @include     *://musicbrainz.org/label/*
// @include     *://beta.musicbrainz.org/label/*
// @include     *://musicbrainz.org/release-group/*
// @include     *://beta.musicbrainz.org/release-group/*
//
// ==/UserScript==
//**************************************************************************//

function injected() {

function GeordiViewModel() {
	var self = this;

	self.loaded = ko.observable(false);
	self.matches = ko.observableArray([]);

	self.matchesText = ko.computed(function() {
		return self.matches().length > 0 ? "" : "Not linked in Geordi";
//		return self.matches().length > 0 ? self.matches().length + " result(s)" : "Not linked in Geordi";
	});

	$("h1 a").each(function() {
		var m = $(this).attr("href").match(/\/(artist|label|release-group)\/([0-9a-f-]+)/);
		var url = "http://geordi.musicbrainz.org/api/search?type=query&query=_geordi.matchings.current_matching.mbid%3A%22"+m[2]+"%22&human=on&auto=on&size=100&s=1&itemtype=subitem";

		$.getJSON(url, function(data) {
			self.loaded(true);

			$.each(data["result"]["hits"]["hits"], function(i, v) {
				var m = v["_id"].match(/^(.*)-([0-9]+)$/);
				self.matches.push(new GeordiMatch(m[1], m[2], v["_index"]));
			});
		});
	});
};

function GeordiMatch(type, id, index) {
	var self = this;

	self.type = type;
	self.id = id;
	self.index = index;

	self.matches = ko.observableArray([]);
	self.nonmatches = ko.observableArray([]);
	self.allMatched = ko.computed(function() { return self.nonmatches().length == 0; });
	self.total = ko.computed(function() { return self.nonmatches().length + self.matches().length });

	self.link = ko.computed(function() { return "<a href='//geordi.musicbrainz.org/?type=sub&query=" + self.id + "&subitem_type=" + self.type + "&subitem_index=" + self.index + "&auto=on&un=on&human=on&s=1'>" + self.index + "/" + self.id + "</a>" });
	self.matchesText = ko.computed(function() { return self.total() == 0 ? "searching for releases..." : self.allMatched() ? "everything matched! :D" : self.matches().length + " matched / " + self.nonmatches().length + " unmatched D:"; });

	var url = "http://geordi.musicbrainz.org/api/search?type=sub&subitem_index=" + self.index + "&subitem_type=" + self.type + "&size=100&query=" + self.id;
	$.getJSON(url, function(data) {
		$.each(data["result"]["hits"]["hits"], function(i, v) {
			if (v["_source"]["_geordi"]["matchings"]["current_matching"]["mbid"]) {
				self.matches.push(v["_source"]["_geordi"]["matchings"]["current_matching"]["mbid"]);
			} else {
				self.nonmatches.push(v["_source"]["_geordi"]["matchings"]["current_matching"]["mbid"]);
			}
		});
	});
};

$("h2.rating").before("<div id='geordi'><h2>Geordi</h2><div data-bind='visible: !loaded()'>Loading...</div><div data-bind='visible: loaded()'><span data-bind='text: matchesText'></span></div><div data-bind='foreach: matches'><div data-bind='style: { backgroundColor: total() == 0 ? \"white\" : allMatched() ? \"lightgreen\" : \"pink\", borderColor: total() == 0 ? \"grey\" : allMatched() ? \"green\" : \"red\" }' style='border-width: 1px; border-style: solid; margin-top: 3px; padding: 3px; '><span data-bind='html: link'></span><br/><span data-bind='text: matchesText'></span></div></div></div>");

var vm = new GeordiViewModel();
ko.applyBindings(vm, document.getElementById("geordi"));


}
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ injected +')();'));
document.body.appendChild(script);
