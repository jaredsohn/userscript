// ==UserScript==
// @name        MusicBrainz: Experimental new artist overview page.
// @description 
// @version     2012-12-14
// @author      -
// @namespace   http://userscripts.org/users/41307
//
// @include     *://musicbrainz.org/artist/*
// @include     *://beta.musicbrainz.org/artist/*
// @include     *://test.musicbrainz.org/artist/*

// @exclude     *://musicbrainz.org/artist/*?*page*
// @exclude     *://beta.musicbrainz.org/artist/*?*page*
// @exclude     *://test.musicbrainz.org/artist/*?*page*

//
// ==/UserScript==
//**************************************************************************//

function injected() {

// TODO
// mb's filtering
// filtering by sub-types
// loading animation thingy (partly done)
// paginate results when displaying them?
// merging
// edit links?
// disambiguation comments

var pagedata;
var pagembids = Object();
var releasecount = 0;
var albums;
var eps;
var singles;
var other;


function print_rg_list(name) {
	$("#newdiscography ul").html("");
	$("#newdiscographycontrols span").css('background-color', 'white');
	if (name)
		$("#newdiscography-"+name.toLowerCase()).css('background-color', 'lightblue');
	else
		$("#newdiscography-all").css('background-color', 'lightblue');


	var releases = rg_list(name);
	if (releases.length > 0) {
//		$.each( _.sortBy(releases, "first-release-date"), function(x, rg){ print_rg(rg, name); });
		$.each( _.sortBy(releases, function(obj){ if (!obj["first-release-date"]) return "9999-99-99 "+obj["title"]; else return obj["first-release-date"] + " "+obj["title"]; }), function(x, rg){ print_rg(rg, name); });
	} else {
		$("#newdiscography ul").append("Nothing found.");
	}
}

function rg_list(name) {
	if (!name) return pagedata["release-groups"];

	var releases = $.grep( pagedata["release-groups"], function (n, i) {
		if (name == "Other") {
			return n["primary-type"] != "Album" && n["primary-type"] != "EP" && n["primary-type"] != "Single" ? true : false;
		} else {
			return n["primary-type"] == name ? true : false;
		}
	});
	return releases;
}

function count_rg_list(name) {
	var releases = rg_list(name);
	return releases.length;
}

function get_colour(name) {
	if (name == "Album")
		return "firebrick";
	else if (name == "Single")
		return "cornflowerblue";
	else if (name == "EP")
		return "mediumseagreen";
	else if (name == "Other")
		return "lightslategrey";
	else
		return "black";
}

function print_rg(rg, name) {
	var d = 0;
	var ac = "";
	$.each(rg["artist-credit"], function (i,v) { ac = ac + "<a href='/artist/"+ v["artist"]["id"] + "'>" + v["name"] + "</a>" + v["joinphrase"]; } );

	var m = document.location.href.match(/artist\/([0-9a-f-]+)/);
	if (rg["artist-credit"].length == 1 && rg["artist-credit"][0]["artist"]["id"] == m[1]) {
			if (rg["artist-credit"][0]["artist"]["name"] == rg["artist-credit"][0]["name"]) {
				ac = "";
			} else { d = 1; ac = "credited as "+ac; }
	}

	var stypesa = Array();
	var stypes = "";
	if ((typeof name == 'undefined' || name == "Other") && rg["primary-type"] != null) stypesa.push("<span style='background-color:" + get_colour(rg["primary-type"]) +";padding:2px;color:white'>" + rg["primary-type"] + "</span>");
	if (rg["secondary-types"].length > 0)
		for (i = 0; i < rg["secondary-types"].length; i++) {
			stypesa.push("<span style='background-color:" + get_colour(rg["primary-type"]) + ";padding:2px;color:white;'>" + rg["secondary-types"][i] + "</span>");
		}
	if (stypesa.length)
		stypes = "<div style='float:right'>"+ stypesa.join(" ") +"</div>";

	$("#newdiscography ul").append("<li style='display:inline-block; margin:0 13px 13px 0;'><div style='width:400px; padding:11px; border:1px solid #E8E8E8; background:#FFFFFF; display:block;'> <div style='float:left; width:100px; height:100px'> <img src='http://coverartarchive.org/beta/release-group/"+ rg["id"] + "/front-250' style='max-height:100px; max-width:100px' alt='' onerror=\"this.src='//raw.github.com/kepstin/mbjs/master/missingart.png'\"/></div><div style='float:right; width:290px;'>"+stypes+"<span style='font-size: large'><a href='/release-group/"+rg["id"]+"'>" + rg["title"] + "</a></span><br/>"+rg["first-release-date"]+"<br/>"+ac+"</div><br style='clear:both; visibility:hidden'/></div></li>");
}


function get_data(mbid, offset, va) {
	var url = 'https://beta.musicbrainz.org/ws/2/release-group/?artist='+mbid+'&fmt=json&limit=100&inc=artist-credits&offset='+offset;
	if (va)
		url = 'https://beta.musicbrainz.org/ws/2/release/?track_artist='+mbid+'&inc=artist-credits+release-groups&fmt=json&limit=100&offset='+offset;


	$.getJSON(url, function(data) {
		if (va) {
			if (!pagedata) {
				pagedata = Object();
				pagedata["release-groups"] = Array();
			}
			
			for (m = 0; m < data["releases"].length; m++) {
				releasecount = releasecount + 1;
				if (!pagembids[ data["releases"][m]["release-group"]["id"] ]) {
					pagembids[ data["releases"][m]["release-group"]["id"] ] = 1;
					pagedata["release-groups"].push( data["releases"][m]["release-group"] );
				}
			}
		} else

		if (pagedata) {
			pagedata["release-groups"] = pagedata["release-groups"].concat(data["release-groups"]);
		} else {
			pagedata = data;
		}

		var count = 0;
		if (data["release-group-count"])
			count = data["release-group-count"]
		if (data["release-count"])
			count = data["release-count"]

		var existingcount = 0;
		if (releasecount)
			existingcount = releasecount;
		else
			existingcount = pagedata["release-groups"].length;

		if (count > existingcount && offset < 10000) {
			$("#newdiscography ul").html( "Loading " + (existingcount / count * 100).toFixed(0)  + "% complete..." );
			get_data(mbid, offset+100, va);
		} else {

			var allc = count_rg_list();
			var albumc = count_rg_list("Album");
			var epc = count_rg_list("EP");
			var singlec = count_rg_list("Single");
			var otherc = count_rg_list("Other");
			$("#newdiscography-all").append(" (" + allc +")");
			$("#newdiscography-album").append(" (" + albumc +")");
			$("#newdiscography-ep").append(" ("+ epc +")");
			$("#newdiscography-single").append(" ("+ singlec +")");
			$("#newdiscography-other").append(" (" + otherc +")");

			if (albumc == 0) $("#newdiscography-album").css('color', 'grey');
			if (epc == 0) $("#newdiscography-ep").css('color', 'grey');
			if (singlec == 0) $("#newdiscography-single").css('color', 'grey');
			if (otherc == 0) $("#newdiscography-other").css('color', 'grey');

			print_rg_list();
		}
	});
}


function discographytoggle() {
	$("#olddiscography").toggle();
	$("#newdiscography").toggle();
	$(".filter-button").toggle();
}

	var m = document.location.href.match(/\/artist\/([0-9a-f-]+)/);
	var va = document.location.href.match(/va=1/) ? 1 : 0;

	if (m) {
		$("h2.discography").after("<div id='olddiscography'></div>");
		$("#olddiscography").nextAll().appendTo("#olddiscography");
		$("#olddiscography").toggle();
		$(".filter-button").toggle();

		$(".discography").after("<div style='overflow:auto;xheight:500px' id='newdiscography'></div>");
		$("#newdiscography").append("<div id='newdiscographycontrols' style='margin-top:10px;'><span style='padding:3px;border:1px solid #E8E8E8;margin:3px; cursor:pointer' id='newdiscography-all'>All</span> <span style='padding:3px;border:1px solid #E8E8E8;margin:3px; cursor:pointer' id='newdiscography-album'>Albums</span> <span style='padding:3px;border:1px solid #E8E8E8;margin:3px; cursor:pointer' id='newdiscography-ep'>EPs</span> <span style='padding:3px;border:1px solid #E8E8E8;margin:3px; cursor:pointer' id='newdiscography-single'>Singles</span> <span style='padding:3px;border:1px solid #E8E8E8;margin:3px; cursor:pointer' id='newdiscography-other'>Others</span></div>");
		$("#newdiscography-all").click(function(){ print_rg_list(); });
		$("#newdiscography-album").click(function(){ print_rg_list("Album"); });
		$("#newdiscography-ep").click(function(){ print_rg_list("EP"); });
		$("#newdiscography-single").click(function(){ print_rg_list("Single"); });
		$("#newdiscography-other").click(function(){ print_rg_list("Other"); });

		$("#newdiscography").append("<ul style='list-style:none; padding:13px 0 0 13px; display:block;'><li>Loading...</li></ul>"); // div

		vatext = va ? "Releases by this artist" : "Appearances on other releases";
		$("#newdiscographycontrols").append(" <a style='padding:3px;border:1px solid #E8E8E8;margin:3px; cursor:pointer; display:inline-block' id='sa-va-switch' href='?va="+ (va ? 0 : 1) + "'>"+vatext+"</a>");

		$("a.filter-button").parent().append(" <a href='#' id='newdiscography-toggle'>Toggle</span>");
		$("#newdiscography-toggle").click(function(){ discographytoggle(); return false; });

		get_data(m[1], 0, va);

	}



}
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ injected +')();'));
document.body.appendChild(script);

