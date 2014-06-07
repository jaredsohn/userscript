// ==UserScript==
// @name           BBC Sport Changer
// @description    BBC Sport Website remoulder...
// @author         DBOne
// @include        http://www.bbc.co.uk/sport/*
// @version        1.0
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @require        http://autobahn.tablesorter.com/jquery.tablesorter.js
// @require       https://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js

// ==/UserScript==

GM_config.init('Configurable Options Script', {
    'main_yellow': {
        'section': ['Colors to be used', 'These colours will be used to replace the yellow'],
        'label': 'Main Yellow Replacement',
        'type': 'text',
        'default': 'palegoldenrod'
    },
    'light_yellow': {
        'label': 'Lighter Replacement Colour',
        'type': 'text',
        'default': 'tan'
    },
 'background': {
        'label': 'Background Colour Replacement',
        'type': 'text',
        'default': 'beige'
    },
'greenhead': {
        'label': 'Make Green Headings Black',
        'type': 'checkbox',
        'default': true
    },

'black_white': 
	{
        	'label': 'Black or White headlines',
        	'type': 'radio', // radio boxes that the user can select
        	'options': ['Black', 'White'], // Possible options
        	'default': 'Black'
        },
'side_menu_option': {
        'section': ['Side Menu'],
        'label': 'Add a side Menu',
        'type': 'checkbox',
        'default': true
    },
'side_menu_font': {
        'label': 'Font size for Menu',
        'type': 'text',
        'default': '10'
    },
'side_menu_position': {
        'label': 'How much to shift the menu to the left in pixels',
        'type': 'text',
        'default': '150'
    },
'side_menu_width': {
        'label': 'Menu Width (px)',
        'type': 'text',
        'default': '140'
    },
    'wdl_option': {
        'section': ['Change Football Results Table'],
        'label': 'Replace WDL blocks with text',
        'type': 'checkbox',
        'default': true
    },
'pts_option': {
        'label': 'Move Pts column to end of row',
        'type': 'checkbox',
        'default': true
    },
'right_article': {
        'section': ['Change Articles'],
        'label': 'Change Floats to the Right',
        'type': 'checkbox',
        'default': true
    },
'my_team': {
        'section': ['My Team','Goto your team page and copy the URL into here'],
        'label': 'My Team ',
        'type': 'text',
        'default': 'http://www.bbc.co.uk/sport/football/teams/leeds-united'
    },
'hide_elements': {
        'section': ['Hide Elements','Enter DIV names separated by //' ],
        'label': 'Hide Elements',
        'type': 'text',
        'default': 'gossip_promo//special-promomotion-hyper-1'
},
'wide_elements': {
        'section': ['Widen the narrow column' ],
        'label': 'Widen Element',
        'type': 'checkbox',
        'default': false
}


});


// User Settings
//Colours for Various Elements

var page_background =  GM_config.get('background');
var bbc_yellow_color = GM_config.get('main_yellow');
var bbc_yellow_color_light = GM_config.get('light_yellow');
var myurl =  GM_config.get('my_team');




var side_menu = "N";
if (GM_config.get('side_menu_option')) {
side_menu = "Y";
};

var green_subhead = "N";
if (GM_config.get('greenhead')) {
green_subhead = "Y";
};

// Hide Elements
var bbc_hide = GM_config.get('hide_elements').split("//");
for(var array_loop=0;array_loop<bbc_hide.length; array_loop++) {
//alert("."+bbc_hide[array_loop]);
$(("#"+bbc_hide[array_loop])).hide();
$(("."+bbc_hide[array_loop])).hide();
};

var wide_option = "N"; 
if (GM_config.get('wide_elements')) {
wide_option = "Y";
};



if (wide_option=="Y") {
GM_addStyle("#blq-container-inner { width : 1200px; }");
GM_addStyle("#header-wrapper { width: 1180px;}");
GM_addStyle("#global-nav { width: 1200px;}");
GM_addStyle("#global-nav { width: 1200px;}");
GM_addStyle("#primary-nav-bar { width: 1200px;}");
GM_addStyle("#secondary-nav-bar { width: 1200px;}");
GM_addStyle("#structural-container { width: 800px;}");
GM_addStyle("#top-stories{ width: 800px;}");
GM_addStyle("#river { width: 300px;}");
GM_addStyle("#more-news { width: 300px;}");
GM_addStyle("#secondary-top-story { width: 300px;}");
};

// Turn some headings from black to white - useful depending on the colour you've chosen!
var sport_white = "N"; 
sport_white = GM_config.get('black_white');
if (sport_white=="White") {
sport_white = "Y";
};




// REplace the WDL section with letters rather than graphics

var table_WDL = "N"; 
if (GM_config.get('wdl_option')) {
table_WDL = "Y";
};


var pts_option = "N"; 
if (GM_config.get('pts_option')) {
pts_option = "Y";
};


// Push Pullouts into main text
var shift_right = "N";
if (GM_config.get('right_article')) {shift_right = "Y" };

if (shift_right == "N") {
GM_addStyle("#storypage-container .story-body .wide {width: auto;}");
GM_addStyle(".article > .story-feature {margin-left:0pt;}");
};
if (shift_right == "Y") {
GM_addStyle("#storypage-container .story-body #article-sidebar { float: right;}");
GM_addStyle(".quote-wrapper { float: right; margin-right: -120px; margin-left: 10px;}");
GM_addStyle(".article > .story-feature { float: right; margin-right: -100px; margin-left: 10px;}");
GM_addStyle(".landscape #storypage-container .story-body .article { float: left; }");
GM_addStyle(".portrait #storypage-container .story-body .article { margin-left: 10px; }");
//GM_addStyle(".article > .story-feature { float: left; margin-right:10px; }");
};

// Article Colours
GM_addStyle(".pull-out {border-bottom-color: "+bbc_yellow_color+";}");
GM_addStyle(".pull-out h2 { background-color: "+bbc_yellow_color_light+";}");

//Comments Color
GM_addStyle(".quote-wrapper {border-bottom-color: "+bbc_yellow_color+";}");

//HEader Articles - change the font size
GM_addStyle(".type-a-top-story-1 h2 a { font-size: 16pt;}");
GM_addStyle(".type-a-top-story-1 .kink .headline-wrapper {min-height: 0pt;}");
GM_addStyle(".type-a-top-story-3 h2 { font-size: 16pt;}");
GM_addStyle(".index #indexpage-body #indexpage-article #lead-item #lead-image #lead-caption h2 { font-size: 16pt; }");

// Shift Article Headers so they don't overlap the image
GM_addStyle(".landscape .article {margin-top: 0pt;}");

if (green_subhead=="Y"){
GM_addStyle("a.tag:visited { color: black;font-weight: bold; }");
GM_addStyle(".more-tag:visited { color: black;font-weight: bold; }");
GM_addStyle(".tag  { color: black; font-weight: bold; }");
GM_addStyle(".more-tag  { color: black; font-weight: bold; }");
GM_addStyle(".digest h3.digest-article-competition {color: black; font-weight: bold;}");
};

// Replace the video controls
GM_addStyle(".icon-gvl3 {background: url(http://static.bbci.co.uk/sport/1.2.4/desktop/styles/img/framework/sprites/gvl3_icons_sprite_news.png?jcb=1328800541) 0 0 no-repeat; }");
GM_addStyle(".icon-video-l, .icon-audio-l, .icon-camera-l {background-image: url(http://static.bbci.co.uk/sport/1.2.4/desktop/styles/img/framework/sprites/gvl3_icons_sprite_news.png?jcb=1328800541); }");

// Header Text Backgrounds
GM_addStyle(".accordion-lite h2 {background-color:"+bbc_yellow_color+";}");
GM_addStyle(".global-nav .secondary {background-color:"+bbc_yellow_color+";}");
GM_addStyle(".heading-data {background-color:"+bbc_yellow_color+";}");
GM_addStyle(".table-header {background-color:"+bbc_yellow_color+";}");
GM_addStyle("#header-wrapper{background-color:"+bbc_yellow_color+"}");
GM_addStyle("#footer-services { border-top-color: "+bbc_yellow_color+";}");
GM_addStyle(".type-a-story-1 .tag {background-color:"+bbc_yellow_color_light+";}");
GM_addStyle(".index #indexpage-body #indexpage-article #lead-item .tag {background-color:"+bbc_yellow_color_light+";}");
GM_addStyle("#storypage-container .container-narrow-table h2, #storypage-container .accordion-wrapper h2, #storypage-container #coverage h2 {background-color:"+bbc_yellow_color+" }");
GM_addStyle(".type-a-top-story-1 .tag {background-color:"+bbc_yellow_color_light+";}");
GM_addStyle(".type-a-top-story-2 .tag {background-color:"+bbc_yellow_color_light+";}");
GM_addStyle(".type-a-top-story-3 .tag {background-color:"+bbc_yellow_color_light+";}");
GM_addStyle(".gelui-carousel-counter-list li.active button {background:"+bbc_yellow_color_light+";}");
//GM_addStyle(".gelui-carousel-counter-list li:hover button {background:"+bbc_yellow_color_light+";}");

// Remove Headers
GM_addStyle(".header-generic{ background: url();}");
GM_addStyle(".header-cricket{ background: url();}");
GM_addStyle(".header-tennis{ background: url();}");
GM_addStyle(".header-golf{ background: url();}");
GM_addStyle(".header-football {background: url();}");
GM_addStyle(".header-rugby-union, .header-rugby-league {background: url();}");


// Selected Sport
GM_addStyle(".global-nav .primary .selected a, .global-nav .primary .selected a:hover, .global-nav .primary .selected a:active .global-nav .primary .selected a:focus {background-color:"+bbc_yellow_color+";}");
GM_addStyle(".nav-bar .crumbtrail .highlight {background: url(); background-color:"+bbc_yellow_color_light+"; color: black;}");
GM_addStyle(".nav-bar .crumbtrail a.first-item { background: url(); background-color:"+bbc_yellow_color_light+"; color: black;}");

// Page Background
GM_addStyle("#main-content.index { background-color: "+page_background+";}");

// Black to White if wanted
if (sport_white=="Y") {
GM_addStyle("#header-wrapper #sport-masthead {background: url(http://static.bbci.co.uk/sport/1.2.4/desktop/styles/img/components/header/sport-masthead-white.png?jcb=1328800539);}");
GM_addStyle("#header-wrapper #section-title, #header-wrapper #homepage-timestamp { color: white; }");
GM_addStyle(".heading-data {color: white;}");
GM_addStyle(".accordion-lite h2 {color: white;}");
GM_addStyle(".global-nav .secondary {color:white;}");
GM_addStyle(".global-nav .secondary a {color:white;}");
GM_addStyle(".global-nav .primary .selected a, .global-nav .primary .selected a:hover, .global-nav .primary .selected a:active .global-nav .primary .selected a:focus {color:white;}");
GM_addStyle(".table-header {color: white;}");
GM_addStyle(".global-nav .secondary .first-item .selected {color: black;}");
GM_addStyle(".global-nav .secondary .selected {color: black;}");
};

var embedCode = document.getElementsByClassName("table-stats");

if (table_WDL=="Y"&embedCode!="") {
$(".win").html("W");
$(".draw").html("D");
$(".loss").html("L");
GM_addStyle(".league-table tr td.last-10-games li {font-family: Monospace; text-indent: 0; height: 12px; font-size: 12pt;}");
GM_addStyle(".league-table tr td.last-10-games li.draw {background-color: transparent; color: black;}");
GM_addStyle(".league-table tr:hover td.last-10-games:hover li.draw:hover { background-color: gainsboro;}");
GM_addStyle(".league-table tr td.last-10-games li.loss { background-color: transparent; color: black;}");
GM_addStyle(".league-table tr td.last-10-games li.win { background-color: transparent; color: black;}");
if (pts_option=="Y") {
$('tr').each(function(){
    $('td:nth-child(6)',this).remove().insertAfter($('td:last',this));
});
$('tr').each(function(){
    $('th:nth-child(6)',this).remove().insertAfter($('th:last',this));
});
};     
};

// Change the click to display sub menu to hover...presume disability access prevented the BBC from doing this
$("#pn-more-sports-list").removeAttr( "style" );
$("#sn-more-list").removeAttr( "style" );


// Merge Tables
if ((document.getElementById( 'fixtures-data' ) != null )||(document.getElementById( 'results-data' ) != null )) {
if ((document.getElementById( 'filter-nav' )!=null )) {
 $(".fixtures-table .table-stats").remove();
 $(".fixtures-table  h2").remove();
var loop  = 1;
if (document.getElementById( 'fixtures-data' ) == null ) {
var fix_res = "results" }else {
var fix_res = "fixtures" 
};
while (loop!=8) {
GM_xmlhttpRequest({
  method: "GET",
  url: "http://www.bbc.co.uk/sport/football/"+fix_res+"/partial/region-"+loop,
  onload: function(response) {
    $(".fixtures-table").append(response.responseText);
  }
});
loop = loop + 1;
};
};
};
var filterbtn = document.createElement( 'input' );
with( filterbtn ) {
  setAttribute( 'onclick', '');
  setAttribute('id', 'myfilterButton' );
  setAttribute( 'value', 'Show Today' );
  setAttribute( 'type', 'button' );
}
var datebtn = document.createElement( 'input' );
with( datebtn ) {
  setAttribute( 'onclick', '');
  setAttribute('id', 'mydateButton' );
  setAttribute( 'value', 'Sort by Date' );
  setAttribute( 'type', 'button' );
}
var showallbtn = document.createElement( 'input' );
with( showallbtn ) {
  setAttribute( 'onclick', '');
  setAttribute('id', 'myAllButton' );
  setAttribute( 'value', 'Show All' );
  setAttribute( 'type', 'button' );
}

//if ($(".fixtures-table") != null ) {
if ((document.getElementById( 'fixtures-data' ) != null )||(document.getElementById( 'results-data' ) != null )) {
document.getElementById( 'filter-nav' ).appendChild( filterbtn );
document.getElementById ("myfilterButton").addEventListener ("click", FilterButtonClickAction, false);
document.getElementById( 'filter-nav' ).appendChild( showallbtn );
document.getElementById ("myAllButton").addEventListener ("click", AllButtonClickAction, false);
document.getElementById( 'filter-nav' ).appendChild( datebtn );
document.getElementById ("mydateButton").addEventListener ("click", DateSortButtonClickAction, false);

};


// Side Menu
if (side_menu=="Y") { 
var insert_html = "<div id=\"our menu\" style=\"font-size: "+GM_config.get('side_menu_font')+"pt; background-color: ivory; position: absolute; width: "+GM_config.get('side_menu_width')+"px; top: 100px; display: block;float: left; margin-left: -"+GM_config.get('side_menu_position')+"px;\">";
insert_html = insert_html + "<li><a href=\""+myurl+"\">My Team</a></li>";
insert_html = insert_html + '<h2>Main Sports<//h2>';
var test = $('#primary-nav-bar').html();
insert_html = insert_html + $('#primary-nav-bar').html().replace('</ol>',"").replace(/<ol[^>]*>/g,'').replace('</ul>',"").replace(/<ul[^>]*>/g,'').replace(/<h3.*h3>/g,'');
if ($('#section-title').html() != null ) {
insert_html = insert_html +$('#section-title').html();
};

if ($('#secondary-nav-bar').html() != null) {
insert_html = insert_html +$('#secondary-nav-bar').html().replace('</ol>',"").replace(/<ol[^>]*>/g,'').replace(/<ul[^>]*>/g,'').replace(/label/g,'').replace('dropdown','').replace('dropdown-list','').replace('</ul>',"");
}
insert_html = insert_html + 'Other Sports<//h2>';
insert_html = insert_html + $('#pn-more-sports-list').html().replace('</ul>',"").replace(/<ul[^>]*>/g,'');
insert_html = insert_html+"<//h2></div>";
$(insert_html).insertAfter('#primary-nav-bar');
GM_addStyle(".dropdown-list {display: none;}");
};

// create buttons
var btn = document.createElement( 'input' );
with( btn ) {
//  setAttribute( 'onclick', 'document.body.innerHTML = document.body.innerHTML.replace(/>Win</g, ">W<"); document.body.innerHTML = document.body.innerHTML.replace(/>Draw</g, ">D<"); document.body.innerHTML = document.body.innerHTML.replace(/>Loss</g, ">L<"); ');
  setAttribute( 'onclick', '');
  setAttribute('id', 'myButton' );
  setAttribute( 'value', ' Update ' );
if (wide_option=="N") {
  setAttribute( 'style','margin-left: -470px;'); } else
  {
setAttribute( 'style','margin-left: -675px;'); 
};
  setAttribute( 'type', 'button' );
}

var btnopt = document.createElement( 'input' );
with( btnopt ) {
//  setAttribute( 'onclick', 'document.body.innerHTML = document.body.innerHTML.replace(/>Win</g, ">W<"); document.body.innerHTML = document.body.innerHTML.replace(/>Draw</g, ">D<"); document.body.innerHTML = document.body.innerHTML.replace(/>Loss</g, ">L<"); ');
  setAttribute( 'onclick', '');
  setAttribute('id', 'myoptButton' );
  setAttribute( 'value', 'Options' );
  setAttribute( 'type', 'button' );
}

document.getElementById( 'primary-nav-bar' ).appendChild( btnopt );
document.getElementById ("myoptButton").addEventListener ("click", ButtonOptClickAction, false);


// append at end
if (table_WDL=="Y"&embedCode!="") {
document.getElementById( 'last-ten-games-key' ).appendChild( btn );
document.getElementById ("myButton").addEventListener ("click", ButtonClickAction, false);
};


var embedCode = document.getElementsByClassName("table-stats");
 var clone = embedCode[0].attributes;
 var tableName = "#"+clone.id.value;
$(document).ready(function()
    {
     //   alert("hello");
        $(tableName).tablesorter({
        headers: {
            0: { sorter: false }, 1: { sorter: false }
        },
		textExtraction: function(node) {

		if (node.className == 'last-10-games' && node.nodeName == "TD") {

			var lastTen = node.getElementsByTagName('li');
			var formPoints = 0;
			for (var i = 0; i < lastTen.length; i++ ) {
				if (lastTen[i].className == 'win')	{
					  formPoints = formPoints + 3;
					}
				if (lastTen[i].className == 'draw')	{
					var formPoints = formPoints + 1;
				}
			}
		return ""+formPoints;
		}
		return node.innerHTML;
		}
    });
});

function ButtonOptClickAction(zevent) {
GM_config.open();
};


function wdl_convert(){
$(".win").html("W");
$(".draw").html("D");
$(".loss").html("L");
if (pts_option=="Y") {
$('tr').each(function(){
    $('td:nth-child(6)',this).remove().insertAfter($('td:last',this));
});
$('tr').each(function(){
    $('th:nth-child(6)',this).remove().insertAfter($('th:last',this));
});
};
var embedCode = document.getElementsByClassName("table-stats");
 var clone = embedCode[0].attributes;
 var tableName = "#"+clone.id.value;

$(tableName).tablesorter({
        headers: {
            0: { sorter: false }, 1: { sorter: false }
        },
		textExtraction: function(node) {

		if (node.className == 'last-10-games' && node.nodeName == "TD") {

			var lastTen = node.getElementsByTagName('li');
			var formPoints = 0;
			for (var i = 0; i < lastTen.length; i++ ) {
				if (lastTen[i].className == 'win')	{
					  formPoints = formPoints + 3;
					}
				if (lastTen[i].className == 'draw')	{
					var formPoints = formPoints + 1;
				}
			}
		return ""+formPoints;
		}
		return node.innerHTML;
		}
    });

};

function ButtonClickAction(zevent) {
$("#filter-nav-submit").click();
setTimeout(function() {
                  wdl_convert();
            }, 1800);
e = document.getElementById("js-competition-dd");
$(".win").html("W");
$(".draw").html("D");
$(".loss").html("L");
if (pts_option=="Y") {
$('tr').each(function(){
    $('td:nth-child(6)',this).remove().insertAfter($('td:last',this));
});
$('tr').each(function(){
    $('th:nth-child(6)',this).remove().insertAfter($('th:last',this));
});
};
};

function DateSortButtonClickAction(zevent) {
var months = new Array('Jan','Feb','Mar','Apr','May',
'Jun','Jul','Aug','Sep','Oct','Nov','Dec');
var date_str = new Array();
var array_size = 0;
var date = new Date();
var day = date.getDate();
var month = date.getMonth();

var today = day+" "+months[month];

$('.fixtures-table .table-stats tr').each(function(){
  if ($('td:nth-child(3)',this).html() != null) {
    var date_tab = trim($('td:nth-child(3)',this).html());
    var day = date_tab.substring(4,6);
    var month_str = trim(date_tab.substring(date_tab.length-4));
    var month_num = months.indexOf(month_str);
    
    if ( month < month_num ) {
    if (document.getElementById( 'fixtures-data' ) == null ) {   
    var entry = (((date.getFullYear())-1)*10000)+(month_num*100)+(day*1)+"//"+date_tab;
    } else {
var entry = date.getFullYear()*10000+(month_num*100)+(day*1)+"//"+date_tab;
    }
    } else {
    var entry = date.getFullYear()*10000+(month_num*100)+(day*1)+"//"+date_tab;
    };
    if (date_str.indexOf(entry)== -1) {
    date_str[array_size] = entry;
    array_size = array_size + 1;
    };

  };
});
date_str.sort(sortNumber);
//alert(date_str);
var html_table = "";
for(array_loop=0;array_loop<date_str.length;array_loop++){
$('.fixtures-table .table-stats tr').each(function(){
if ($('td:nth-child(3)',this).html() != null) {
  if ( ($('td:nth-child(3)',this).html()).indexOf(date_str[array_loop].substring(10)) != -1) {
  html_table = html_table +"<tr class=\""+$(this).attr("class")+"\" id=\""+$(this).attr("id")+"\">" +$(this).html()+"</tr>";
};
};
});
};

html_table = '<table class=\"table-stats\">'+html_table+"</table>";
$(".fixtures-table .table-stats").remove();
 $(".fixtures-table  h2").remove();
    $(".fixtures-table").append(html_table);
};

function sortNumber(a,b)
{
if (document.getElementById( 'fixtures-data' ) == null ) {   
return b.substring(1,8) - a.substring(1,8); } else
{
return a.substring(1,8) - b.substring(1,8); 
}
}

function FilterButtonClickAction(zevent) {
var months = new Array('Jan','Feb','Mar','Apr','May',
'Jun','Jul','Aug','Sep','Oct','Nov','Dec');
var date_str = new Array();
var array_size = 0;
var date = new Date();
var day = date.getDate();
var month = date.getMonth();

var today = day+" "+months[month];


$('.fixtures-table .table-stats tr').each(function(){
  if ($('td:nth-child(3)',this).html() != null) {
    if ( ($('td:nth-child(3)',this).html()).indexOf(today) == -1) {
      $(this).hide();
    };
  };
});
};

function AllButtonClickAction(zevent) {
$('.fixtures-table .table-stats tr').each(function(){
  if ($('td:nth-child(3)',this).html() != null) {
   
      $(this).show();
    
  };
});

};

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}
function ltrim(stringToTrim) {
	return stringToTrim.replace(/^\s+/,"");
}
function rtrim(stringToTrim) {
	return stringToTrim.replace(/\s+$/,"");
}
