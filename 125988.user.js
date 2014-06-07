// ==UserScript==
// @name			GC Map Enhancements
// @description		Geocaching Map Enhancements
// @version			1.2
// @include			*.geocaching.com/map/*
// @icon			http://www.geocaching.com/favicon.ico
// ==/UserScript==

var uw = (this.unsafeWindow) ? this.unsafeWindow : window;
uw.Groundspeak.Map.MapLayers = [
		{
			tileUrl : "http://mt{s}.google.com/vt/lyrs=m&hl=pl&x={x}&y={y}&z={z}",
			name : "googlemap",
			alt : "Google Map",
			attribution : "Tiles Courtesy of <a href='http://maps.google.com/' target='_blank'>Google Maps</a>",
			subdomains : "0123",
			tileSize : 256,
			minZoom : 0,
			maxZoom : 19
		},
		{
			tileUrl : "http://khm{s}.google.pl/kh/v=104&hl=pl&x={x}&y={y}&z={z}",
			name : "googlesat",
			alt : "Google Satelite",
			attribution : "Tiles Courtesy of <a href='http://maps.google.com/' target='_blank'>Google Maps</a>",
			subdomains : "0123",
			tileSize : 256,
			minZoom : 0,
			maxZoom : 18
		},
		{
			tileUrl : "http://mt{s}.google.com/vt/lyrs=t@128,r@169000000&hl=pl&x={x}&y={y}&z={z}",
			name : "googleter",
			alt : "Google Terrain",
			attribution : "Tiles Courtesy of <a href='http://maps.google.com/' target='_blank'>Google Maps</a>",
			subdomains : "0123",
			tileSize : 256,
			minZoom : 0,
			maxZoom : 15
		},
		{
			tileUrl : "http://tiles.ump.waw.pl/ump_tiles/{z}/{x}/{y}.png",
			name : "ump",
			alt : "UMP-pcPL",
			attribution : "Tiles Courtesy of <a href='http://ump.waw.pl/' target='_blank'>UMP-pcPL</a>",
			tileSize : 256,
			minZoom : 0,
			maxZoom : 19
		},
		{
			tileUrl : "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
			name : "osm",
			alt : "OpenStreetMap",
			attribution : 'Map and map data \u00a9 2011 <a href="http://www.openstreetmap.org" target=\'_blank\'>OpenStreetMap</a> and contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>.',
			subdomains : "abc",
			tileSize : 256,
			minZoom : 0,
			maxZoom : 18
		},
		{
			tileUrl : "http://tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
			name : "ocm",
			alt : "OpenCycleMap",
			attribution : 'OpenCycleMap Map and data (c) 2011 <a href="http://www.openstreetmap.org" target=\'_blank\'>OpenStreetMap</a> and contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>.',
			tileSize : 256,
			minZoom : 0,
			maxZoom : 18
		},
		/* requires a referer
		{
			tileUrl : "http://img{s}.emapi.pl/Default.aspx?tileX={x}&tileY={y}&zoom={z}&layer=HillShadingView&fun=GetMap&userID=pasat",
			name : "emapa",
			alt : "Emapa",
			attribution : "Tiles Courtesy of <a href='http://www.emapa.pl/' target='_blank'>Emapa</a>",
			subdomains : "1234",
			tileSize : 256,
			minZoom : 0,
			maxZoom : 20
		},
		{
			tileUrl : "http://services.tmapserver.cz/tiles/gm/shc/{z}/{x}/{y}.png",
			name : "cykloatlas",
			alt : "CykloAtlas",
			attribution : "Tiles Courtesy of <a href='http://www.cykloserver.cz/' target='_blank'>CykloAtlas</a>",
			tileSize : 256,
			minZoom : 0,
			maxZoom : 15
		},
		*/
		{
			tileUrl : "http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png",
			name : "mpqosm",
			alt : "MapQuest",
			attribution : "Tiles Courtesy of <a href='http://www.mapquest.com/' target='_blank'>MapQuest</a> <img src='http://developer.mapquest.com/content/osm/mq_logo.png'>",
			subdomains : "1234",
			tileSize : 256,
			minZoom : 0,
			maxZoom : 18
		},
		{
			tileUrl : "http://oatile{s}.mqcdn.com/naip/{z}/{x}/{y}.png",
			name : "mpqa",
			alt : "MapQuest Aerial",
			attribution : "Tiles Courtesy of <a href='http://www.mapquest.com/' target='_blank'>MapQuest</a> <img src='http://developer.mapquest.com/content/osm/mq_logo.png'>. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency",
			subdomains : "1234",
			tileSize : 256,
			minZoom : 0,
			maxZoom : 18
		},
		{
			tileUrl : "http://{s}.tile.cloudmade.com/31913eba82dc43a998d52a5804668c11/997/256/{z}/{x}/{y}.png",
			name : "cloudmade",
			alt : "CloudMade",
			attribution : "Map data &copy; 2012 OpenStreetMap contributors, Imagery &copy; 2012 CloudMade",
			subdomains : "ab",
			tileSize : 256,
			minZoom : 0,
			maxZoom : 18
		},
		{
			tileUrl : "http://maps11.i0.cz/mps/ch_turis/{z}/{x}/{x}_{y}.gif",
			name:"amapy",
			alt : "Amapy turistická",
			attribution : "Amapy turistická",
			tileSize : 256,
			minZoom : 13,
			maxZoom : 16
		}
];