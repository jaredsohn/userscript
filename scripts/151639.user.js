// ==UserScript==
// @name         EZTV :: My Favorites
// @namespace    http://davidcraig.eu
// @version      1.0
// @description  Highlights Favorite Shows
// @grant        none
// @match        http://*.hidemyass.com/*
// @match        http://eztv.it/*
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @copyright    2014+, You
// ==/UserScript==

/* User Preferences */

var theme = 'dark'; // use 'dark' or 'light'
var resize = true; // set to make page use a fuller width (if preferred)
var minimalistic = true; // set to true to hide logo, banners, and other unwanted stuff, false keeps website in original form
var magnet_only = true;
var remove_non_favorite = true; // set to false to show non-favorite shows
var untable = true;
var remove_suffixes = true; // remove HDTV, x264, -LOL, -DIMENSION

/* Variables */
var marker_color = '#121212';
var shows = new Array(
    "2 Broke Girls",
    "American Dad",
    "Anger Management",
    "Arrow",
    "Big Bang Theory",
    "Bitten",
    "Blacklist", // The Blacklist
    "Cleveland Show",
    "Continuum",
    "Dexter",
    "Family Guy",
    "Fringe",
    "Hannibal",
    "Homeland",
    "IT Crowd",
    "Line Of Duty",
    "Marvel Agents",
    "Men at Work",
    "Mentalist",
    "New Girl",
    "Nikita",
    "Person of Interest",
    "Red Dwarf",
    "South Park",
    "Supernatural",
    "True Blood",
    "Walking Dead"
);
var shows_length = shows.length;
var show_entries = $('.epinfo');



/* NAME SECTIONS BY CONTENT */
$("table").each(function() {
    var ihtml = $(this).html();
    
    if (ihtml.match('Announcement'))
    {
        $(this).addClass('ps_announcement');
    }
    if (ihtml.match('Television Show Releases'))
    {
        $(this).addClass('ps_show_list_table');
    }
    if (ihtml.match('Display:'))
    {
        $(this).addClass('ps_navigation');
    }
});

/* Functionality */

show_entries.each(function() {
    var show_name = $(this).html();
    
    // Iterate through array and check if show is favorite
    
    for (a=0;a<shows_length;a++) { // check each entry in the array
		
        if (show_name.match(shows[a])) {
            
			if (!show_name.match('720p')) {
                
                $(this).parent().parent().addClass('fav_show')       // SD
                
			} else {
                
				$(this).parent().parent().addClass('fav_show_hd')    // HD
			}
		}
        else
        {
			$(this).parent().parent().addClass('not_fav');
            $(this).parent().parent().addClass('minimised');
		}
	}
});

$('.fav_show_hd, .fav_show').removeClass('not_fav').removeClass('minimised');

if (theme == 'dark')
{
    // DARK THEME
    $('.not_fav a').css('color', '#545454');
    
    $('body, .forum_space_border, .header_date, .forum_thread_header_end, .forum_thread_header, .section_post_header').css('background-color', '#232323');
    $('.forum_thread_header_end, .forum_thread_header').css('background-image', 'none');
    $('td.forum_thread_post_end').css('background-color', '#363636');
    
    $('.forum_header_border').css('background-color', '#383838');
    

    $('.hd_marker').css('color', '#3db23d');
    $('.hd_marker').css('text-shadow', '#343434 1px 1px');
    
    // Highlight Favorites
    // Link Color
    $('.fav_show a').css('color', '#a4e0ff');
    $('.fav_show_hd a').css('color', '#3db23d');
}
else if (theme == 'light')
{
    // LIGHT THEME
    var sd_color = '#3f41aa';
    var hd_color = '#3db23d';
    $('.fav_show').css('color', sd_color);
    $('.fav_show_hd').css('color', hd_color);
    
    $('.hd_marker').css('color', marker_color);
    $('.hd_marker').css('text-shadow', 'white 1px 1px');
}

if (minimalistic == true)
{
    $('#header_logo, .featured_border').hide();
}

if (resize == true)
{
    // Get table.forum_header_border where width == 950
    $('table.forum_header_border[width="950"], .featured_border, #site_menu').css('width', '90%');
    $('.section_header_column[width="300"]').css('width', '30%');

    // Get td.section_header_column (where width == 300)
}

if (remove_non_favorite == true)
{
    $('.not_fav').hide();
}
else
{
    // "Minimised" Table entries for none favorites
    $('.minimised').css({
        'font-size': '.8em',
        'max-height': '12px'
    });
    $('.minimised a').css({
        'max-height': '12px'
    });
    
    // Highlight Favorite Background Color
    $('.fav_show, .fav_show_hd').css('background', '#2c2c2c');
}

// if magnet only true
if (magnet_only == true)
{
    $('.ddl, .download_1, .download_2, .download_3, .download_4, .download_5, .download_6, .download_7').remove();
}

// Other Enhancements
$('a.magnet, .ddl, .download_1, .download_2, .download_3, .download_4, .download_5, .download_6, .download_7').css('border', 'none');
$('.ps_navigation a').css('color', '#5a5a5a');

// Untable
if (untable === true)
{
    // Create a new div container
    $('table.ps_show_list_table').after('<div id="show_grid_container"></div>');
    
    $('.fav_show_hd').each(function() {
        // get Show Name
        var show_name_html = $(this).html()
        var new_html = show_name_html.replace('<td class="forum_thread_post" width="35">', "");
        var new_html = new_html.replace('<td class="forum_thread_post">', "");
        var new_html = new_html.replace('<td class="forum_thread_post" align="center">', "");
        var new_html = new_html.replace('</td>', "");
        var new_html = new_html.replace('<td>', "");
        var new_html = new_html.replace('style="color: rgb(61, 178, 61);"><a class="magnet', 'color: rgb(61, 178, 61);"><br/><a class="magnet"');
        var new_html = new_html.replace(/[1-9]d [1-9]*h/, '');
        
        // get current grid html
        var grid_html = $('#show_grid_container').html();
        var new_grid_html = grid_html + '<div class="ps_show_fav_hd"><span class="ps_show_fav_hd_title"></span><br/><span class="ps_show_fav_hd_links">' + new_html + '</span></div>';
        
        $('#show_grid_container').html(new_grid_html);
    });
    $('.fav_show').each(function() {
        // get Show Name
        var show_name_html = $(this).html()
        var new_html = show_name_html.replace('<td class="forum_thread_post" width="35">', "");
        var new_html = new_html.replace('<td class="forum_thread_post">', "");
        var new_html = new_html.replace('<td class="forum_thread_post" align="center">', "");
        var new_html = new_html.replace('</td>', "");
        var new_html = new_html.replace('<td>', "");
        var new_html = new_html.replace(/[1-9]d [1-9]*h/, '');
        
        // get current grid html
        var grid_html = $('#show_grid_container').html();
        var new_grid_html = grid_html + '<div class="ps_show_fav"><span class="ps_show_fav_title"></span><br/><span class="ps_show_fav_links">' + new_html + '</span></div>';
        
        $('#show_grid_container').html(new_grid_html);
    });
    $('table.ps_show_list_table').remove();
    
    $('#show_grid_container').css('width', '90%');
    
    $('.ps_show_fav, .ps_show_fav_hd').css({
        'margin':'10px',
        'width': '150px',
        'float': 'left'
    });
    $('.ps_show_fav').css('border', '1px solid #3f41aa');
    $('.ps_show_fav_hd').css('border', '1px solid #3db23d');
}

// Replace X placeholders with showname links
$('.ps_show_fav a.epinfo, .ps_show_fav_hd a.epinfo').each(function() {
  // get Show Name
  var show_name_html = $(this).parent().html();

  var show_div = $(this).parent().parent();
  
  var show_div_html = show_div.html();
  
    if (show_div.hasClass("ps_show_fav"))
    {
        var new_show_div_html = show_div_html.replace('<span class="ps_show_fav_title"></span>', '<span class="ps_show_fav_title">' + show_name_html + '</span>');
  show_div.html(new_show_div_html); // duplicates the title AND the links
    }
    else
    {
        var new_show_div_html = show_div_html.replace('<span class="ps_show_fav_hd_title"></span>', '<span class="ps_show_fav_hd_title">' + show_name_html + '</span>');
  show_div.html(new_show_div_html); // duplicates the title AND the links
    }
});

$('.ps_show_fav_title a, .ps_show_fav_hd_title a').each(function() {
    var link = $(this);
    if (link.hasClass('epinfo'))
    {
    }
    else
    {
        $(this).remove();
    }
});
$('.ps_show_fav_links a, .ps_show_fav_hd_links a').each(function() {
    var link = $(this);
    if (link.hasClass('epinfo'))
    {
        $(this).remove();
    }
    else
    {
    }
});


if (remove_suffixes == true)
{
    // remove HDTV, x264, -LOL, -DIMENSION
    $('.epinfo').each(function() {
        var ihtml = $(this).html();
        var new_html = ihtml.replace('HDTV', '');
        var new_html = new_html.replace('x264', '');
        var new_html = new_html.replace('X264', '');
        var new_html = new_html.replace('-DIMENSION', '');
        var new_html = new_html.replace('-LOL', '');
        
        var new_html = new_html.replace('720p', 'HD');
        $(this).html(new_html);
    });
}


/* Appearence Customisation */
$('.ps_show_fav_hd, .ps_show_fav').css('background', '#656565');
$('.ps_show_fav_hd_title, .ps_show_fav_title').css({
    'background': '#232323',
    'display': 'block',
    'padding-top': '2px',
    'padding-bottom': '2px'
});
$('.ps_show_fav_hd_links, .ps_show_fav_links').css({
    'text-align': 'center',
    'padding': '4px',
    'display': 'block'
});