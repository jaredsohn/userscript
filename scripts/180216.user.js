// ==UserScript==
// @name			tv-links.eu/tvmuse.eu Link Finder
// @namespace		http://tvmuse.eu/
// @version			0.1.1
// @description		script to compile a nice list of links from the comments on episode pages
// @include			*.tvmuse.*/*
// @require			http://code.jquery.com/jquery.min.js
// @copyright		2012+, Techplex Engineer
// ==/UserScript==

$(document).ready(function() {
	
	
	//remove the crap links
	$("ul.tabs.outer").remove();
	$(".tabs.outer.cfix.mb_05").remove();
	$("ul#table_search").remove();
	$("div.bg_imp mb_2").remove();
	$("li.cfix>button.btn_all_results").remove();


	//find all the links in the comments
	var links = [];
	$("ul.table_comments>li").each(function(){
		var txt = $("div.data>div.content>p.big",this).html();
		if (typeof txt != 'undefined' && txt.toLowerCase().indexOf("removed") == -1 && (txt.toLowerCase().indexOf("http://") >= 0 || txt.toLowerCase().indexOf("<i>") >= 0))
		{
			//this will open the comments marked "This comment is hidden because it's likely to be inappropriate or spam"
			if (txt.toLowerCase().indexOf("<i>") >= 0)
			{
				return; //continue
			}
			var stripped = txt.replace(/<(?:.|\n)*?>/gm, ' '); //strip html
			var single = stripped.replace(/\s+/g, ' '); //collapse whitespace
			var arr = single.split(' ');
			links = links.concat(arr);
			
		}
	});
	//Priority setting
	var priority = 
	{
		"allmyvideos.net":1
		,"putlocker.com":2
		,"sockshare.com":2
		,"played.to":3
		,"donevideo.com":4
        ,"filenuke.com":5
		
	};
	//remove any duplicate links
	links = $.unique(links);
	
	//sort the links by the priority above
	links.sort(function(a,b){
		var hostnameA = priority[$('<a>').prop('href', a).prop('hostname').replace(/^www\./,'')]||999;
		var hostnameB = priority[$('<a>').prop('href', b).prop('hostname').replace(/^www\./,'')]||999;
		//console.log(hostnameA,hostnameB);
		//a comes first -1
		//b comes first 1
		//same 0
		return hostnameA-hostnameB;
	});
	
	//add the links to the page
	$("div.cfix.mb_2").after(function(){
		
		var out = "<h1>Links</h1>";
		out += "<ol>";
		for (var i=0;i<links.length;i++)
		{	
			out += "<li>";
			out += "<a href=\""+links[i]+"\" target=\"_blank\">"+links[i]+"</a>";
			out += "</li>";
		}
		out += "</ol>";
        
        var parts = window.location.pathname.match(/\/tv-shows\/([^_]+)[^\/]+\/season_(\d+)\/episode_(\d+)/);
        var name = parts[1].toLowerCase().replace('-','_');
        var season = parts[2];
        var episode = parts[3];
        
        var url = "http://www.free-tv-video-online.me/internet/"+name+"/season_"+season+".html#e"+episode;
        out += "See the related page on the <a href=\""+url+"\" target=\"_blank\">Project Free TV Site</a>";
        out += "<br>";
		return out;
	});

	
});

//once the page has loaded:
$(window).load(function(){
	//this seems to only work here
	$("div.bg_imp.mb_2").remove();

});
