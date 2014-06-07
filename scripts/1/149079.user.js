// ==UserScript==
// @name				The Pirate Bay Plugin
// @author				EulerIntegral
// @version				3.567
// @namespace			https://userscripts.org/scripts/show/149079
// @description			Colorize the Pirate Bay, highlight your favorite shows, order torrents by date, 
//						fetch favorite users torrents
// @include				http://thepiratebay.se/*
// @match				http://thepiratebay.se/*
// @require				http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

// Number of decimal digits to show on day column
var dec_show = 3;

/***********************************************************************************************\
\**************************** Your Series List go here.         *********************************
\**************************** Make the substituitions you want. *********************************
\***********************************************************************************************/
/*
* I Use the following Mathematica 8 expression to make this:
* 
*		$seriesList = {"Series 1", "Series 2", "Series 3"};
*		max = Max[StringLength /@ $seriesList] + 3;
*		list = "'" <> # <> "'" <> StringJoin@Table[" ", {max - StringLength@#}] & /@ $seriesList;
*		str = Partition[list, 4, 4, 1, {}] /. 
*		{s__String} :> "\t" <> StringJoin@Riffle[{s}, ", "] /.
*		{s__String} :> StringJoin@Riffle[{s}, ",\n"];
*		"var series_list = [\n" <> str <> "\n];"
*/
var series_list = [
	'Alphas'                , 'Avatar'                , 'Awake'                 , 'Breaking Bad'          ,
	'BTOOOM'                , 'Defying Gravity'       , 'Dexter'                , 'Doctor Who'            ,
	'Elementary'            , 'Falling Skies'         , 'Family Guy'            , 'Franklin and Bash'     ,
	'Futurama'              , 'Game of Thrones'       , 'Heroes'                , 'Homeland'              ,
	'House'                 , 'How I Met Your Mother' , 'John Doe'              , 'Legend of Korra'       ,
	'Legend of the Seeker'  , 'Leverage'              , 'Lie to Me'             , 'Make It or Break It'   ,
	'Merlin'                , 'Misfits'               , 'My Name Is Earl'       , 'MythBusters'           ,
	'Numb3rs'               , 'Once Upon a Time'      , 'Perception'            , 'Person of Interest'    ,
	'Revolution'            , 'Sherlock'              , 'Simpsons'              , 'Sinbad'                ,
	'Suits'                 , 'Supernatural'          , 'Switched at Birth'     , 'Sword Art Online'      ,
	'Teen Wolf'             , 'Terra Nova'            , 'The Big Bang Theory'   , 'The Event'             ,
	'The It Crowd'          , 'The Legend of Korra'   , 'The Lost Room'         , 'The Neighbors'         ,
	'The Walking Dead'      , 'ThunderCats'           , 'Top Gear'              , 'Two and a half men'    ,
	'White Collar'          
];

// The regular expression to match
var series_pattern = new RegExp(
	'\\b' + series_list.join('\\b|\\b') + '\\b',
	'gi');



/***********************************************************************************************\
\**************************** Your favorite users go here       *********************************
\**************************** Make the substituitions you want. *********************************
\***********************************************************************************************/
// When Fetching, only get your favorite shows + First season of episodes!
var favorite_pages = [
    '../user/k1ng_ruLz/'	, '../user/youshikibi/',						// Manga Users
    '../user/ettv/'			, '../user/eztv/',			'../user/VTV/',		// Tv Series Users
    '../browse/205'															// Tv Shows Page
];



/***********************************************************************************************\
***************************** Favicons to display on new column*********************************
\***********************************************************************************************/
// Make it transparent!
var favorite_favicon = 'data:image/gif;base64,' +
    'R0lGODlhDAAMAOYAAP38+v7+/ujEN/7+/f/UEe3m2O7n2PXy6fby6tjBhvXQKP3TLPHs4s+3gsy0' +
    'hP/QDNG8ks+pOfXaatGzYuK6Jv/2ePPu5+ndw//dMs62hf3TDs60dPv69v35o//+kP/iQ/7LAO7C' +
    'HMWgQdauKNi/hNO8hv/+i9vLqvn38tGuTfrJBPz6+P/7fMyvYte8ZMy1gvfnYP/+lvbz7P//ldjA' +
    'iP/YIfn28c+4gc6wZf7YOsywaP/pWP/pS//qY///qsyvX9K8jePGZ86tQv/OB9i3RtGyR820f/PS' +
    'X8WiU/fni/Pt49S+kfbz7fHs5f//muvi0d7RttG3bde9dv/ZIui+Is2jKNK+mMinWdu7Svrea/7U' +
    'ENfDmPrPJv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5' +
    'BAAAAAAALAAAAAAMAAwAAAdygF2CXQANLQODiYRSWBaKg09BVCePglZZIEuJSFE3RkA5Wi4OGxNX' +
    'NAImTj1DGDM+PCE6XRdVCgQPOzEwI1soggg4C1MVHkVNiUwkNR8dLBQFiVBHGkIvSSoJAYIrJVwR' +
    'BkoZEkQ2ghwiKQyCMhA/B12BADs=';



/***********************************************************************************************\
********************************** Get the date it was released ********************************
\***********************************************************************************************/
function getTorrentDate(row) {
    // Get TPB date from description
    var dateTPB = $(row).find('.detDesc').eq(0).text() // Find the Description
        .replace('Uploaded ', '').split(',')[0];       // Get only the date
    
    var has_hour    = dateTPB.match(/(\d\d):(\d\d)/);
    var has_month   = dateTPB.match(/(\d\d)-(\d\d)/);
    var has_year    = dateTPB.match(/(\d\d\d\d)/);
    var has_today   = dateTPB.match(/Today/);                // Useless, here just to ... I don't know...
    var has_yday    = dateTPB.match(/Y-day/);
    var has_minsago = dateTPB.match(/(\d+)\smins?\sago/);
    
    var date = new Date();
    // Conversion factor for hour in different GMTs
    var GMT = 2 - parseInt(Date().match(/GMT([\-+]\d\d)/)[1], 10); 
    
    // Make use of else if
    if (has_hour) {
        date.setHours(parseInt(has_hour[1], 10) - GMT);
        date.setMinutes(parseInt(has_hour[2], 10));}
    if (has_month) {
        date.setMonth(parseInt(has_month[1], 10) - 1);
        date.setDate(parseInt(has_month[2], 10));}
    if (has_year) 
        date.setFullYear(parseInt(has_year[1], 10));
    if (has_yday) 
        date.setDate(date.getDate() - 1);
    if (has_minsago) 
        date.setMinutes(date.getMinutes() - parseInt(has_minsago[1], 10));
    
    return date;
}



/***********************************************************************************************\
************************************* Torrent background color *********************************
\***********************************************************************************************/
function torrentColor(days) {
    // The color palette
    //            red green blue
    var color = [[0  , 255, 0  ],  // Green 
                 [153, 255, 0  ],  // Green-ish
                 [255, 255, 0  ],  // Yellow
                 [255, 0  , 0  ],  // Red
                 [153, 102, 51 ],  // Brown
                 [246, 241, 238]]; // Light_brown
    
    var interval = [0, 1/24, 1, 2, 7, 14];
    var i;
    if      (days < interval[1]) {i = 0;}  // Less than 1 hour (from green to greenish)
    else if (days < interval[2]) {i = 1;}  // Today            (from greenish to yellow)
    else if (days < interval[3]) {i = 2;}  // Yesterday        (from yellow to red)
    else if (days < interval[4]) {i = 3;}  // Less than 1 week (from red to brown)
    else if (days < interval[5]) {i = 4;}  // Less than 2 week (from red to brown)  
    else                         {i = 5;}  // More than 2 week (from brown to light brown)
    
    var rgb = color[5];
    if (i < 5) {
		// This is a simple linear interpolation.
		for (var k=0; k<3; k++ ) {
			rgb[k] = color[i][k] + (days - interval[i])*(color[i][k] - color[i+1][k])/(interval[i] - interval[i+1]);
		}
    }
    
    var r = rgb[0], g = rgb[1], b = rgb[2];
    r = Math.floor(r); g = Math.floor(g); b = Math.floor(b);
    color = 'rgb(' + r + ',' + g + ',' + b + ')';
    
    return color;
}



/***********************************************************************************************\
*********************************** Add a Column to a row **************************************
\***********************************************************************************************/
function addColumn(row, displayText, idText, tagType, pos) {
    var column = $('<' + tagType + '>').html(displayText);
    
    if (pos == null) {pos=0;}
    
    if (tagType === 'td' && pos == 0)    // We add first the day column
		column.attr({'days':idText, 'align':'center'});
	else if (tagType === 'td' && pos != 0)
		column.attr({'align':'center'}); // This is the tag column
    
    $(row).children().eq(pos).before(column);
}



/***********************************************************************************************\
************************************* Delete Non Seeded ****************************************
\***********************************************************************************************/
function delNonSeed(rows) {
	var list = [];
	
	rows.each(function() {
		if ($(this).children().eq(-2).text() != '0') // Seed column
			list.push($(this)[0]);
		else
			$(this).detach();
	});
	
	return $(list);
}



/***********************************************************************************************\
************************************** Delete Duplicates ***************************************
\***********************************************************************************************/
// DO IT!
function delDuplicates(rows) {
    var list = [];
    
    return rows;
}



/***********************************************************************************************\
************************************* Beautify the rows ****************************************
\***********************************************************************************************/
var now = new Date();
function modifyRow(row) {
    // Add day column
    var date = getTorrentDate(row);
    var days = (now.getTime() - date.getTime())/1000/60/60/24; // milisecond, seconds, minutes, hour
    var days_str = String(days + 0.000001).split('.');         // add small number so it always has decimal point
    days_str = [days_str[0], days_str[1].slice(0, dec_show)].join('.');
    addColumn(row, days_str, days, 'td');
    
    // Highlight favorite series
    var favicon_html = '';
    var torrent_name = row.find('.detName a').text().trim().
        split(/\s|\.|_|-/).join(' ');
    if (torrent_name.match(series_pattern)) {
        row.find('.detName a').css({'color':'#160C04', 'font-weight':'bold'});
        // Add favorite favicon
        favicon_html += '<img src=' + favorite_favicon + '>';
    }
    
    // If vip, trusted, etc user, add to tag list the favicon.
    var top_users = /Trusted|VIP|Helper|Moderator|Mod|Next/gi;
    var top_element = row.find('a [alt]').eq(-1);
    if (top_element.attr('alt').match(top_users)) {
        favicon_html += '<img src=' + top_element.attr('src') + '>';
    }
    
    // Add Favicons
    addColumn(row, favicon_html, '', 'td', 1);
    
    // Change background color according to days of released
    row.css('background-color', torrentColor(days));
}



/***********************************************************************************************\
*********************************** Sort the torrent rows **************************************
\***********************************************************************************************/
function sortRows(rows) {
    var list = [], listSorted = [];
    
    rows.each(function(index) {
        list.push( [parseFloat($(this).find('[days]').attr('days')), rows[index]] );
    });
    
    list.sort(function(a, b) {return a[0] - b[0];});
    
    for (var k=0; k<list.length; k++) {
        listSorted.push(list[k][1]);
    }
    
    return $(listSorted);
}



/***********************************************************************************************\
*********************************** Create a popup displaying **********************************
*********************************** What is being fetched     **********************************
\***********************************************************************************************/
// Modify this later for different monitors size it will be on the center.
function popMessage(msg, timout) {
    var popup = $('<div>')
        .css({
            'position':'fixed',
            'height':'50px',
            'width':'400px',
            'marginLeft':'-210px',
            'top':'0',
            'left':'50%',
            'padding':'5px 10px',
            'zIndex':1001,
            'fontSize':'12px',
            'color':'#222',
            'backgroundColor':'#f99'
        })
        .html(msg);
    
    $('body').append(popup);
    
    setTimeout(function() {
        popup.fadeOut('slow', function() {$(this).remove();} );
    }, timout);
}



/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// MAIN LOOP /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// All the rows with torrent data
var torrent_rows = $('.detName').parent().parent();
// Add day head column
addColumn($('.header'), 'Days', '', 'th');
// Add Favicon column
addColumn($('.header'), 'Tag', '', 'th', 1);
// Delete Non-seeded Torrents
torrent_rows = delNonSeed(torrent_rows);
// Highlight Series, etc
torrent_rows.each(function() { modifyRow($(this)); } );
// Sort it
torrent_rows.parent().prepend(sortRows(torrent_rows));



/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// FETCHING LOOP /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// Fetching pages and adding it to the table.
// Need serious improvement!
if (document.location.href.match(/top\/205/)) { // Only fetch if on top tv series page    
    var k = 0;
    var wait_load = false;
    var timeout = 20*2;     // Stop after 20 seconds
    var timeout_var = 0;
    var fetched_element;
    
    var update = setInterval(function() {
        if (!wait_load && k < favorite_pages.length) {
            fetched_element = $('<div>');        
            fetched_element.load(favorite_pages[k] + ' #searchResult');
            
            popMessage('Fetching the page: ' + favorite_pages[k] + '<br>' + 
                       String(k + 1) + ' of ' + favorite_pages.length + '.<br>' + 
                       'Please wait a little bit. Page may freeze for a second.',
                       1000);
            
            k = k + 1;
            wait_load = true;
        }
        
        // If fetched, get it and modify
        if (wait_load && fetched_element.children().length != 0) {
            fetched_element = fetched_element.find('.detName').parent().parent();	// Get the rows
            fetched_element = delNonSeed(fetched_element);							// Delete Non-seeded Torrents
            fetched_element.each(function() { modifyRow($(this)); } );				// Beautify
            fetched_element.parent().prepend(sortRows(fetched_element));			// Do a pre-sort
            
            $('tbody').prepend(fetched_element); // Add feched elements
            
            var torrent_rows = $('.detName').parent().parent();    // Update it
        	//torrent_rows = delDuplicates(torrent_rows);            // Not implemented yet
            torrent_rows.parent().prepend(sortRows(torrent_rows)); // Sort it
            
            wait_load = false;
        }
        
        if (k > favorite_pages.length || timeout_var > timeout) 
            clearInterval(update);
        
        timeout_var = timeout_var + 1;
    }, 500);
}