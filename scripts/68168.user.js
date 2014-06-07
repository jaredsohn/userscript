// ==UserScript==
// @name           GaiaOnline - Thread Title Filter
// @namespace      http://userscripts.org/users/126924
// @author	   skeate
// @description    Filters out threads according to a regex pattern matching
// @include        http://www.gaiaonline.com/forum/*/f.*
// @include        http://gaiaonline.com/forum/*/f.*
// @require 	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// get current list of filters
var filters = JSON.parse(GM_getValue("filterlist","[]"));
var regexes = filters.map(function(x) new RegExp(x,"i"));

var forumids = JSON.parse(GM_getValue("forumids","[]"));
var include = GM_getValue("include",false);
var maxpages = GM_getValue("maxpages",0);

function lightbox(inside){
	$("body").append("<div id=\"fullouter\"><div id=\"fullinner\"></div></div>");
	$("#fullouter").css({
		display: "table",
		position: "fixed",
		top: "0px",
		left: "0px",
		bottom: "0px",
		right: "0px",
		width: "100%",
		zIndex: "1000"
	});
	$("#fullinner").css({
		width: "100%",
		background: "rgba(0,0,0,0.75)",
		color: "white",
		display: "table-cell",
		verticalAlign: "middle",
		textAlign: "center"
	});
	$("#fullinner").append(inside);
}

// filter topics if in a matching forum page
var filteredcount = 0;
var forumid = parseInt(document.URL.match(/\/f\.([0-9]+)(_.*?)?\//)[1]);
if( (include && (forumids.indexOf(forumid)!=-1)) || (!include && forumids.indexOf(forumid)==-1) ){
	$("td.title > a:not(.goto-new-posts)").each(function(){
		for( j = 0; j < regexes.length; j++ ){
			if( regexes[j].test($(this).text()) ){
				$(this).parent().parent().remove();
				filteredcount++;
				break;
			}
		}
	});

	if( maxpages > 0 ){
		$("td.title span.pagination a:last-child").each(function(){
			if( parseInt($(this).text()) > maxpages ){
				$(this).parent().parent().parent().remove();
				filteredcount++;
			}
		});
	}
}

// display filtration info
$(".forum_all_pagination").prepend("<a href=\"#\">"+filteredcount+" Topics Filtered</a>");
$(".forum_all_pagination > a").click(function(e){
	e.preventDefault();
	box = $("<div>"+
		"<h2>Filter Settings</h2><a href=\"#\">[X]</a>"+
		"<form id=\"filtersettings\"><fieldset><legend>Forums</legend>"+
		"<div><span><input type=\"radio\" name=\"include\" value=\"true\" "+(include?"checked=\"checked\" ":"")+"/>"+
		"<label for=\"true\">Include</label></span>"+
		"<span><input type=\"radio\" name=\"include\" value=\"false\" "+(include?"":"checked=\"checked\" ")+"/>"+
		"<label for=\"false\">Exclude</label></span></div>"+
		"<div>Forum ID List: <input type=\"text\" name=\"fids\" value=\""+forumids.join(",")+"\" /></div></fieldset>"+
		"<div>Maximum Pages: <input type=\"text\" name=\"mpages\" value=\""+maxpages+"\" /></div>"+
		"<div><button id=\"savebutton\">Save changes</button></div></form>"+
		"<div id=\"filters\"><div>New filter: <input type=\"text\" id=\"newfiltertxt\" />  <button>Add</button></div></div>"+
		"</div>");
	for( i = 0; i < filters.length; i++ ){
		line = $("<div><a href=\"#\">[X]</a>  <span>"+filters[i]+"</span></div>");
		$(line).find("a").click(function(f){
			f.preventDefault();
			myidx = filters.indexOf($(this).parent().children("span").text());
			filters.splice(myidx,1);
			GM_setValue("filterlist",JSON.stringify(filters));
			$(this).parent().remove();
		});
		$(box).find("#filters").append(line);
	}
	$(box).find("#filtersettings button").click(function(f){
		f.preventDefault();
		if( !/^(\d,?)+$/.test($("#filtersettings input:text[name='fids']").val()) ){
			alert("Forum ID list is malformed. Must be a series of numbers, separated by commas.");
		}
		else if( !/^\s*\d+\s*$/.test($("#filtersettings input:text[name='mpages']").val()) ){
			alert("Max pages must be a number only.");
		}
		else{
			include = $("#filtersettings input:radio:checked").val()=="true";
			maxpages = parseInt($("#filtersettings input:text[name='mpages']").val());
			forumids = $("#filtersettings input:text[name='fids']").val().split(",").map(function(x) parseInt(x));
			GM_setValue("include",include);
			GM_setValue("maxpages",maxpages);
			GM_setValue("forumids",JSON.stringify(forumids));
			$("#filtersettings button").text("Saved!").attr("disabled","disabled");
			setTimeout(function(){
				$("#filtersettings button").text("Save Changes").removeAttr("disabled");
			},1000);
		}
	});
	$(box).find("#filters").css({
		marginTop: "10px",
		paddingTop: "10px",
		borderTop: "1px solid white"
	});
	$(box).find("#filters button").click(function(){
		newfilter = $("#newfiltertxt").val();
		filters.push(newfilter);
		GM_setValue("filterlist",JSON.stringify(filters));
		line = $("<div><a href=\"#\">[X]</a>  <span>"+newfilter+"</span></div>");
		$(line).find("a").click(function(f){
			f.preventDefault();
			myidx = filters.indexOf($(this).parent().children("span").text());
			filters.splice(myidx,1);
			GM_setValue("filterlist",JSON.stringify(filters));
			$(this).parent().remove();
		});
		$("#filters").append(line);
		$("#newfiltertxt").val("");
	});
	$(box).css({
		margin: "auto",
		border: "3px double white",
		width: "400px",
		padding: "3px"
	});
	$(box).find("h2").css("float","left");
	$(box).find("a").css({
		color: "white"
	});
	$(box).find("input").css({
		background: "none",
		color: "white",
		border: "1px solid white",
		padding: "2px"
	});
	$(box).find("#filters").css({
		textAlign: "left",
		margin: "5px"
	});
	$(box).find("a:first").css("float","right");
	$(box).find("a:first").click(function(f){f.preventDefault();$("#fullouter").fadeOut(function(){$(this).remove();});});
	$(box).find("fieldset").css({
		clear:"both",
		border: "1px solid white",
		padding: "3px",
		margin: "3px",
	});
	$(box).find("legend").css("color","white");
	$(box).find("fieldset span:first").css({
		paddingRight: "10px"
	});
	lightbox(box);
});