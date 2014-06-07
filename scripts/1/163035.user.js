// ==UserScript==
// @name		SteamGifts Personalizer
// @namespace	http://indie-elitist.blogspot.com/
// @version		2.0
// @description	Personalizes the giveaway list.
// @include		http://www.steamgifts.com/
// @include		http://www.steamgifts.com/open*
// @include		http://www.steamgifts.com/new*
// @include		http://www.steamgifts.com/closed*
// @include		http://www.steamgifts.com/coming-soon*
// @include		http://www.steamgifts.com/open/search/*
// @include		http://www.steamgifts.com/giveaway/personalizer
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_deleteValue
// @grant		GM_listValues
// @grant		GM_addStyle
// @downloadURL	http://userscripts.org/scripts/source/163035.user.js
// @updateURL	http://userscripts.org/scripts/source/163035.meta.js
// ==/UserScript==

insert_options_link();

if(window.location.pathname === '/giveaway/personalizer'){
	page_options();
}

var giveaway_list = $('.ajax_gifts');
var giveaways = giveaway_list.children('.post');
giveaways.detach();

var buttons;
add_buttons(giveaways);
highlight(giveaways);

var insertion_point = giveaway_list.children(':last');
insertion_point.after(insertion_point.clone(true)); //Create second pagination
insertion_point.after(insertion_point.clone(true)); //Create second pagination
var insertion_point_2 = giveaway_list.children(':last');

var entered_giveaways = get_entered_giveaways(giveaways);

var top_giveaways = get_top_giveaways(giveaways);
var middle_giveaways = get_middle_giveaways(giveaways);
var bottom_giveaways = get_bottom_giveaways(giveaways);

insertion_point.before(top_giveaways);
insertion_point.after(middle_giveaways);
insertion_point_2.before(bottom_giveaways);
insertion_point_2.after(entered_giveaways);


// ----------- Access Giveaway Attributes ----------- //
function list_or_single(giveaway_list, index){
	if(index !== undefined){
		return(giveaway_list.eq(index));
	}else{
		return(giveaway_list);
	}
}
function get_title(giveaway_list, index){ //Get the title of a giveaway
	return(list_or_single(giveaway_list, index).find('.title>a').text());
}
function get_points(giveaway_list, index){ //Get the points of a giveaway
	return(parseInt(list_or_single(giveaway_list, index).find('.title>span:last').text().match(/\((\d*)P\)/)[1]));
}
function get_contrib(giveaway_list, index){ //Get the min contrib of a giveaway
	var contrib = list_or_single(giveaway_list, index).find('.contributor_only');
	if(contrib.length === 0){
		return(0);
	}else{
		return(parseFloat(contrib.text().match(/Contributor \(\$(\d*\.\d*)\)/)[1]));
	}
}
function contrib_can_enter(giveaway_list, index){ //Return true if can enter giveaways on contrib basis.
	var contrib = list_or_single(giveaway_list, index).find('.contributor_only');
	if(contrib.length === 0){
		return(true);
	}else{
		return(contrib.hasClass('green'));
	}
}
function get_copies(giveaway_list, index){ //Get the number of copies of a giveaway
	var copies = list_or_single(giveaway_list, index).find('.title').text().match(/\((\d*) Copies\)/);
	if(copies === null){	return(1);	}
	return(parseInt(copies[1].replace(',', '')));
}
function get_open_for(giveaway_list, index){ //Get the open for time of a giveaway
	var results = list_or_single(giveaway_list, index).find('.time_remaining>strong').text().match(/(\d*)\s*(second|minute|hour|week)/);
	var expiry = 1;
	
	switch(results[2]){
		case('week'): expiry *= 7;
		case('day'): expiry *= 24;
		case('hour'): expiry *= 60;
		case('minute'): expiry *= 60;
		case('second'): expiry *= 1000;
		break;
	}
	expiry *= parseInt(results[1]);
	return(expiry);
}
function get_entries(giveaway_list, index){ //Get the number of entries of a giveaway
	return(parseInt(list_or_single(giveaway_list, index).find('.entries a:first').text().match(/(\d*) Entries/)[1]));
}


// ----------- Separate Giveaways ----------- //
function get_entered_giveaways(giveaways){
	var result = giveaways.filter('.fade');
	return(result);
}
function get_top_giveaways(giveaways){
	var jq_this = $(this);
	var result = giveaways.filter(function(){
		var jq_this = $(this);
		return(contrib_can_enter(jq_this) && !jq_this.hasClass('.fade') && (GM_getValue(get_title(jq_this), 0) > -1));
	});
	return(result);
}
function get_middle_giveaways(giveaways){
	var result = giveaways.filter(function(){
		var jq_this = $(this);
		return(contrib_can_enter(jq_this) && !jq_this.hasClass('.fade') && (GM_getValue(get_title(jq_this), 0) == -1));
	});
	return(result);
}
function get_bottom_giveaways(giveaways){
	var result = giveaways.filter(function(){
		var jq_this = $(this);
		return((!contrib_can_enter(jq_this) && !jq_this.hasClass('.fade')) || (GM_getValue(get_title(jq_this), 0) < -1));
	});
	return(result);
}


// ----------- Modifications ----------- //
function add_buttons(giveaways){
	GM_addStyle('.time_remaining>button{font-weight:bold; font-size:70%; margin=-3px; height:14px; width:15px; text-align: center; padding: 0;}');
	buttons = $('<div class="time_remaining">&nbsp; | &nbsp;<button name="+2" title="Love">+2</button><button name="+1" title="Like">+1</button><button name="0" title="Normal">0</button><button name="-1" title="Dislike">-1</button>|<button name="-2" title="DLC for Games I do Not Have" style="width:21px">DLC</button><button name="-3" title="Pack/Bundle with Games I Own" style="width:19px">Pak</button><button name="-4" title="Games I Already Own" style="width:27px">OWN</button></div>');
	buttons.find('button').bind('click', buttonBinding);
	giveaways.find('.time_remaining').after(buttons);
}
function buttonBinding(){
	var jq_this = $(this);
	var button = parseInt(jq_this.attr('name'));
	var title = jq_this.closest('.post');
	if(button === 0){
		GM_deleteValue(get_title(title));
	}else{
		GM_setValue(get_title(title), button);
	}
	title.css('background-color', getColor(button));
}

function highlight(giveaways){
	giveaways.each(function(){
		var jq_this = $(this);
		jq_this.css('background-color', getColor(GM_getValue(get_title(jq_this), 0)));
	});
}

function getColor(value){
	var color = {'0' : '', '1' : '#FFFFF0', '2' : '#FFFFD0', '-1' : '#CFCFCF', '-2' : '#FFE4D4', '-3' : '#FFD4C4', '-4' : '#FFB4A4'};
	return(color[value]);
}


// ------- OPTIONS -------
function insert_options_link(){
	$('#navigation>ol>li:nth-child(3) .absolute-dropdown>ul').append('<li><a href="/giveaway/personalizer">SG Personalizer</a></li>'); // Insert option
}

function page_options(){
	var body = $('.wrapper');
	body.html('<style type="text/css">\
fieldset.create_giveaway>div.input { margin-right: 73px; width: 822px; }\
.content .notification a.sale { text-align:center; color:#4F565A; }\
</style>\
<div class="content"><div class="notification">\
<h2 align="center">Steamgifts Personalizer</h2>\
<div style="text-align:center;"><i>By: <a href="http://www.steamgifts.com/user/wisnoskij">Wisnoskij</a> (Version ' + GM_info.script.version + ')</i></div><br>\
<br>\
<div class="footer_sales">\
<a href="#data" name="data" onClick="tab(this.name);return(false);" class="sale" style="width:160px; float:left;margin-left:185px;border-radius:8px 0 0 8px;"><h1>Data</h1></a>\
<a href="#about" name="about" onClick="tab(this.name);return(false);" class="sale" style="width:160px; float:left;background-color: rgb(187, 187, 187);"><h1>About</h1></a>\
<a href="#categories" name="categories" onClick="tab(this.name);return(false);" class="sale" style="width:160px; float:left;border-radius:0 8px 8px 0;"><h1>Categories</h1></a>\
</div>\
<div class="clear_both"></div><div class="divider"></div><br>\
\
<fieldset id="data" class="create_giveaway" hidden>\
<div class="input" style="font-weight: bold;">\
<label style="display: inline; margin-right: 50px;">Data Count:</label>  <span id="data_count" style="font-weight:bold;font-size: x-large;"></span>\
<div class="clear_both"></div><div class="divider"></div>\
</div>\
</fieldset>\
\
<fieldset id="about" class="create_giveaway">\
<div class="input"><div class="date_description" style="width: 795px; font-size: 14px;">\
<span align="justify">The <i>Steamgifts Personalizer</i> is a script is based on personalisation of the results and removing as many as possible. To do this, it does two main things; It sorts the current page\'s scripts into 3 main categories. Ones you have entered already, ones that you do not have enough Contrib value to enter, and ones you can enter. Secondly, I incorporated a ~rating~/like system. There is Like, Normal (no rating), Dislike, and a number of categories for games you cannot enter (DLC for games you do not have, games you already own, package with lots of games you already have). You set these by clicking any of the added buttons next to the giveaways.<br><br>\
To manage your like/hate setting there is a options page for this script with a link to it inserted in your Account drop down.\
<br><br>\
<b>(Options will not take effect on any current pages, until they are reloaded)</b><br>\
<br></p>\
<h3>Compatibility:</h3>\
Designed and tested on <b>Chrome</b>, using the <a href="https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo"><i>Tampermonkey</i></a> extension.<br>\
<p style="line-height: .5em;">&nbsp;</p>\
<b>Help Needed</b> - If it works for you, or does not work for you, in any unlisted ways, please let me know.</li>\
</ul>\
</p><br><p>\
<h3>Version History:</h3>\
<ul style="margin-left:25px; list-style-type: none;">\
<li><b>Version 2.0 –</b> Complete code redesign and a few features added. Code stabilized, improved, modularized, and better documented. Designed to be feature complete (aka, have all the necessary features, but nothing fancy or particularly involved). &nbsp; <span style="float: right; font-size: 12px; margin-right: 25px"><i>(August 7th, 2013)</i></span></li><p style="line-height: .5em;">&nbsp;</p>\
<li><b>Version 1.X –</b> Original design and release of the <i>Auto Thank Script</i>. Many rapid updates were released to stabilize and improve basic design. It had only a very basic menu and patchwork code. &nbsp; <span style="float: right; font-size: 12px; margin-right: 25px"><i>(August 2th, 2013)</i></span></li>\
</ul></p><br><p>\
<h3>Potential Future Updates:</h3>\
<ul style="margin-left:75px;">\
<li>Allow creation of custom categories.</li>\
</ul><br><br>\
<h3>Links:</h3>\
<ul style="margin-left:25px;"><li><a href="http://userscripts.org/scripts/show/163035">Userscript Page</a><br></li>\
</ul>\
</div></div>\
</fieldset>\
\
<fieldset id="categories" class="create_giveaway" hidden>\
Under Construction\
</fieldset>');

$('head').append('<script type="text/javascript">\
function tab(name){\
	if(!name){ name = location.hash.substring(1); }\
	if(!name){ name = "about"; }\
	$("fieldset.create_giveaway").each(function(){\
		if($(this).attr("id") !== name){\
			$(this).attr("hidden", true);\
		}else{\
			$(this).removeAttr("hidden");\
		}\
	});\
	\
	$(".footer_sales>a.sale").css("background-color", "#e8e8e8"); \
	$(".footer_sales>a.sale[name=" + name + "]").css("background-color", "#bbbbbb");\
	\
	return(false);\
}\
</script>');
	function optionsButtonBinding(){
		var jq_this = $(this);
		var button = parseInt(jq_this.attr('name'));
		var entry = jq_this.closest('.entry');
		var name = entry.find('.game_title').text();
		if(button === 0){
			GM_deleteValue(name);
		}else{
			GM_setValue(name, button);
		}
		entry.css('background-color', getColor(button));
	}
	function load_data(){
		var data = GM_listValues();
		$('#data #data_count').html(data.length);
		var data_node = $('#data>.input');
		var template = $('<div class="entry"><span class="game_title"></span><div name="buttons" style="float:right"></div></div>');
		var value, node;
		for(var i = 0; data.length > i; i++){
			value = GM_getValue(data[i]);
			node = template.clone().css('background-color', getColor(value));
			node.find('.game_title').prepend(data[i])
			data_node.append(node);
		}
		var buttons = $('<div class="time_remaining">&nbsp; | &nbsp;<button name="+2" title="Love">+2</button><button name="+1" title="Like">+1</button><button name="0" title="Normal">0</button><button name="-1" title="Dislike">-1</button>|<button name="-2" title="DLC for Games I do Not Have" style="width:21px">DLC</button><button name="-3" title="Pack/Bundle with Games I Own" style="width:19px">Pak</button><button name="-4" title="Games I Already Own" style="width:27px">OWN</button></div>');
		buttons.find('button').bind('click', optionsButtonBinding);
		data_node.find('[name=buttons]').append(buttons);
	} load_data();
}