// ==UserScript==
// @name          FA Extended
// @version       0.2.5.3
// @namespace     FA Extended
// @homepage      http://userscripts.org/scripts/show/177980
// @include       *www.furaffinity.net/*
// @description   FA Extended tries to improve your FA experience!
// @author        NeroTheRaichu
// @copyright     2013+, NeroTheRaichu
// @icon          http://www.furaffinity.net/favicon.ico
// @require       http://code.jquery.com/jquery-latest.js
// @require		  http://jquery-ui.googlecode.com/svn/tags/latest/ui/jquery.effects.core.js
// @require 	  http://jquery-ui.googlecode.com/svn/tags/latest/ui/jquery.effects.slide.js
// @run-at        document-end
// @grant         GM_setValue
// @grant         GM_getValue
// @grant         GM_addStyle
// ==/UserScript==

//
// QUICK HELP
//
// New Blocks syntax: 
// :block[MyBlockTitle]some content here::
//
// If you want the block on the left:
// :block[MyBlockTitle][left]some content here::
//
// New icons syntax: 
// :image[image_url]destination_when_user_clicks_the_image::
//
// New map syntax:
// :map[location]::
//
// If you want to see three lines of submissions on the user page scroll a bit down the script to
// the function "extend_user_page()" and comment out the line "one_line();" then you can remove
// the slashes from the line "three_lines();"
// If you leave them both commented you will see two lines as default.
//
//
// Thanks to http://www.furaffinity.net/user/noctisignem/ for the popup watchlist!
//

//
// Number of Submissions Rows in the user page
// You can change it to 3, 2, or 1
//
var submissions_rows = 3;

//
// BlackList
//
// If you want to black list some keywords from the new submissions page just add them to the following array
// example: 
// var keywords__blacklist = new Array("ych","stream");
//
// You can automatically remove those submissions or just hide them, for that just change this value:
// var remove_blacklisted = true; // they will be removed
// var remove_blacklisted = false; // they won't be removed
//
var keywords__blacklist = new Array();
var remove_blacklisted = false;

var left_menu_showing = false;

// MAIN CODE

// page ready
$(document).ready(function() {
	// executes when HTML-Document is loaded and DOM is ready
    
    init();
    
});

// page loaded
$(window).load(function () {
    // executes when complete page is fully loaded
    
    console.log("Loading FA Extended...");
    console.log(" Current url: " + location.href );
    
    change_document_title();
    fix_top_bar();
    add_new_line();
    add_icon_topbar();
    var _my_username = add_links_topbar();
    
    console.log("Improved top navbar");
    console.log("Current user: " + _my_username );
    
    move_ads_to_bottom();
    fix_header();
    //scroll_down();
    
    if ( location.href == "http://www.furaffinity.net/" ) {
        
        fix_style_fa_home();
        
    }
    else if ( location.href.indexOf('watch/') > 0 ) {
        
        extend_watch_system_message();
        
    }
    else if ( location.href.indexOf('/browse') > 0 || location.href.indexOf('/gallery') > 0 || location.href.indexOf('/scraps') > 0 || location.href.indexOf('/favorites') > 0 ) {
        // browsing submission page
        
        if ( location.href.indexOf('/controls') > 0 ) {
        	
            //nothing to do
            
        } else if ( location.href.indexOf('/browse') == -1 ) {
            add_top_navbar('none');
        	add_gallery_rating_buttons();
            fix_first_cat();
            
            var current_user = "";
            
            if ( location.href.indexOf('/gallery') > 0 ) {
                current_user = location.href.slice(35,-1);
            }
            else if ( location.href.indexOf('/scraps') > 0 ) {
                current_user = location.href.slice(34,-1);
            } else {
                current_user = location.href.slice(37,-1);
            }
            
            add_custom_background( current_user );
            
        } else {
            add_top_navbar('browse');
            fix_first_cat_browse();
        }
    }
    else if ( location.href.indexOf('/stats/') > 0 ) {
        fix_first_cat_stats();
        
        var current_user = location.href.slice(33, location.href.indexOf('/submissions') );
        add_custom_background( current_user );
        
    }
    if ( location.href.indexOf('/user') > 0 ) {
        // user page
        
        var current_user = location.href.slice(32,-1);
        
        extend_user_page( location.href.indexOf( _my_username ), current_user );
        fix_cat_header_style();
        
        // fix anchors
        
        var loc = location.href.indexOf('/#')
        if ( loc > 0 && loc+3 < location.href.length ) {
        	var anchor = location.href.slice(loc + 2);
        	var a = $('a[name="' + anchor + '"]');
            if ( a.length > 0 ) {
                a = a[0];
                a.scrollIntoView();
            }
        }
        
    }
    if ( location.href.indexOf('/view/') > 0 || location.href.indexOf('/full/') > 0  ) {
        // submission page
        
        fix_title_comments();
        better_icons();
        better_comments_avatars();
        add_fa_extended_code();
        move_nav_buttons_on_top();
        fix_submission_style();
        change_story_style();
        remove_cell_spacing();
        
    }
    else if ( location.href.indexOf('/journals/') > 0 || location.href.indexOf('/commissions/') > 0  ) {
        
        fix_journals_style();
        better_icons();
        
        var current_user = "";
        
        if ( location.href.indexOf('/journals/') > 0 ) {
        	current_user = location.href.slice(36,-1);
        } else {
            current_user = location.href.slice(39, location.href.indexOf('/manage') );
        }
        
        add_custom_background( current_user );
    }
    else if ( location.href.indexOf('/journal/') > 0 ) {
        
        fix_journals_style();
        better_icons();
        better_comments_avatars();
        remove_cell_spacing();
        add_dotted_line_journal();
    }
    if ( location.href.indexOf('/msg/submissions') > 0 ) {
        // new submissions from watched users
        
        var notifications = 0;
        
        blacklist_submissions();
        update_submissions_values();
        notifications += count_new_others();
        notifications += count_new_notes();
        
        fix_message_icon(notifications);
        
        add_rating_buttons();
        
        fix_msg_submission_others_style()
        
    } else if ( location.href.indexOf('/msg/others') > 0 ) {
        
        var notifications = 0;
        
        notifications += count_new_submissions();
        update_others_values();
        notifications += count_new_notes();
        
        fix_message_icon(notifications);
        
        new_journals_view();
        
        fix_msg_submission_others_style()
        
    } else if ( location.href.indexOf('/msg/pms') > 0 ) {
        
        var notifications = 0;
        
        notifications += count_new_submissions();
        notifications += count_new_others();
        //update_notes_values();
        
        fix_message_icon(notifications);
        
        fix_pms_style()
        remove_cell_spacing();
        
    } else {
        
        var notifications = 0;
        
        notifications += count_new_submissions();
        notifications += count_new_others();
        notifications += count_new_notes();
        
        fix_message_icon(notifications);
    }
    
    if ( location.href.indexOf('/controls/profile') > 0 ) {
        
        extend_profile_controls();
        
    }
    else if ( location.href.indexOf('/sessions/') > 0 ) {
        
        fix_session_style();
        remove_cell_spacing();
        
    }
    else if ( location.href.indexOf('/controls/') > 0 ) {
        
        fix_controls_style();
        remove_cell_spacing();
        
    }
    else if ( location.href.indexOf('/search') > 0 ) {
        
        save_last_search();
        fix_search_style();
        remove_cell_spacing();
        
    }
    if ( location.href.indexOf('/newpm') > 0 ) {
        
        fix_newpm_style();
        remove_cell_spacing();
        
    }
    else if ( location.href.indexOf('/submit') > 0 ) {
        
        fix_submit_style();
        
    }
    else if ( location.href.indexOf('/viewmessage/') > 0 ) {
        
        nested_quotes();
        fix_message_style();
        remove_cell_spacing();
        
    }
    else if ( location.href.indexOf('/login/') > 0 ) {
        
        fix_login_page();
        
    }
    if ( location.href.indexOf( _my_username ) > 0 ) {
        
        fix_own_user_page();
        
    }
    
    console.log("Last changes...");
    
    narrow_space_before_avatar();
    
    page_width( "88%" );
        
} );

$.expr[':'].textEquals = function (a, i, m) {
    return $(a).text().match("^" + m[3] + "$"); 
};

function extend_profile_controls() {
    
    var page_blocked = $( "td.cat b:textEquals('System Message')");
    if ( page_blocked.length > 0 ) {
        
        page_blocked = page_blocked[0]
        page_blocked = page_blocked.parentNode;
        
        page_blocked.className = "cat_header";
        
        page_blocked = page_blocked.parentNode;
        page_blocked = page_blocked.parentNode;
        page_blocked = page_blocked.parentNode;
        
        page_blocked.className = page_blocked.className + " maintable_newpm";
        
        remove_cell_spacing();
        
        return;
    }
    
    bigger_text_area();
    bigger_update_button();
    new_append_buttons();
    fix_controls_style();
    remove_cell_spacing();
    
}

function extend_user_page( my_userpage, current_user ) {
    //extends user page
    
    var page_blocked = $( "td.cat b:textEquals('System Message')");
    if ( page_blocked.length > 0 ) {
        
        console.warn("Page blocked!");
        
        page_blocked = page_blocked[0]
        page_blocked = page_blocked.parentNode;
        
        page_blocked.className = "cat_header";
        
        page_blocked = page_blocked.parentNode;
        page_blocked = page_blocked.parentNode;
        page_blocked = page_blocked.parentNode;
        
        page_blocked.className = page_blocked.className + " maintable_newpm";
        
        remove_cell_spacing();
        
        return;
    }
    
    var user_name = $("td.addpad.lead b").get( 0 );
    user_name = user_name.innerHTML;
    user_name = user_name.slice(1);
    
    better_icons();
    better_avatars();
    fix_bottom_ads();
    new_layout( user_name, my_userpage, current_user );
    
    if ( submissions_rows >= 3 ) {
    	three_lines();
        
    } else {
        if ( submissions_rows == 1 ) {
            one_line();
        }
    }
    
    add_popups();
    fix_overflow();
    remove_cell_spacing();
    fix_user_tabs();
    
    add_custom_background( current_user );
    
}

function fix_user_tabs() {
	var tab_div = $( "div.tab" ).get(0);
    
    var parent_tab_div = tab_div.parentNode;
    parent_tab_div = parent_tab_div.parentNode;
    parent_tab_div = parent_tab_div.parentNode;
    parent_tab_div = parent_tab_div.parentNode;
    
    parent_tab_div.setAttribute("width","");
    parent_tab_div.className = "table_div_tab";
}

function extend_watch_system_message() {
    
    var page_blocked = $( "td.cat b:textEquals('System Message')");
    if ( page_blocked.length > 0 ) {
        
        console.warn("Page blocked!");
        
        page_blocked = page_blocked[0]
        page_blocked = page_blocked.parentNode;
        
        page_blocked.className = "cat_header";
        
        page_blocked = page_blocked.parentNode;
        page_blocked = page_blocked.parentNode;
        page_blocked = page_blocked.parentNode;
        
        page_blocked.className = page_blocked.className + " maintable_newpm";
        
        remove_cell_spacing();
        
    }
    
}

function remove_cell_spacing() {
        
    var aux = $('table[cellspacing="1"]');
    for(var i=0;i<aux.length;i++) {
        var table = aux[i];
        
        table.setAttribute("cellspacing","0");
        
    }
    
}

function add_dotted_line_journal() {
    
    var aux = $('table.maintable.table_top_more_spacing td.alt1 > div.no_overflow');
    if (aux.length > 0) {
        
        var parent = aux[0];
        parent = parent.parentNode;
        parent.className = "alt1 tdot";
        
    }
    
}

function new_journals_view() {
    
    var aux = $('fieldset#messages-journals ul.message-stream li a');
    for(var i=0;i<aux.length;i++) {
        var anchor = aux[i];
  		
        var user_page = anchor.href;
        user_page = user_page.slice( 32, -1 );
        
        var user_page_text = anchor.innerHTML.toLowerCase();
        var under_score = new RegExp("_", "g");
        user_page_text = user_page_text.replace( under_score, "");
        
        if ( user_page == user_page_text ) {
        
        	anchor.className = "iconusername";
            anchor.innerHTML = '<div class="newIconDiv"><img src="//a.facdn.net/' + user_page + '.gif" align="middle" title="' + user_page + '" alt="' + user_page + '">&nbsp;&nbsp;' + anchor.innerHTML + '</div>'
            
            var parent_li = anchor.parentNode;
            
            parent_li.className = "new_journal_entry";
            
            var span_element = parent_li.lastChild;
            
            var html_parent = parent_li.innerHTML;
            
            var a_index = html_parent.indexOf( "<a href" );
            var a_end_index = html_parent.indexOf( ", posted by" ) -1;

            var html_check_box = html_parent.slice( 0, a_index-1 );
            var html_journal_title = html_parent.slice( a_index, a_end_index );
            
            parent_li.innerHTML = html_check_box + '<table class="new_journal_entry"><tbody><tr><td>' + anchor.outerHTML + "</td><td>" + "&nbsp;:&nbsp;" + "</td><td>" + html_journal_title + "&nbsp;</td><td></td></tr></tbody></table>"
            
            var last_td = parent_li.lastChild.lastChild.lastChild.lastChild;
            
            last_td.appendChild( span_element )    
            
               
        } else {
            
            anchor.className = "iconusername iconusername_height";
            anchor.innerHTML = '<div class="newIconDiv bigger_text_size">&nbsp;' + anchor.innerHTML + '&nbsp;</div>'
            
        }
        
 	}
    
    //var aux = $('fieldset#messages-journals ul.message-stream li.section-controls');
    //if (aux.length > 0 ) {
    //    var control_li = aux[0];
    //    var new_control_li = control_li.cloneNode(true);
    //    
    //    var parent = control_li.parentNode;
    //    
    //    parent.insertBefore( new_control_li ,parent.childNodes[0]);
    //}
    
}


function nested_quotes() {
     
    var current_quote_list = $('div.bbcode_quote');
    
    if (current_quote_list.length > 0 ) {
        var current_quote = current_quote_list[0];
        var parent_quote = current_quote.parentNode;
        var quote = new RegExp("\\[QUOTE\\]", "g");
        var unquote = new RegExp("\\[/QUOTE\\]", "g");
        parent_quote.innerHTML = parent_quote.innerHTML.replace( quote , '<div class=".bbcode bbcode_quote">' );
        parent_quote.innerHTML = parent_quote.innerHTML.replace( unquote, '</div>' );
    }
}

function move_ads_to_bottom() {
    
    var aux = $('.block-banners .ads');
    var aux2 = $('.footer .ads');
    if (aux.length > 0 && aux2.length > 0) {
        var ads_top = aux[0];
        var ads_bottom = aux2[0];
        
        var container_bottom = ads_bottom.parentNode;
        container_bottom.insertBefore( ads_top, ads_bottom );
        container_bottom.insertBefore( new_br() , ads_bottom );
    }
        
}

function fix_login_page() {
    
    var aux = $('form table.maintable td.cat');
    if (aux.length > 0) {
        var parent = aux[0];
        
        parent.className = "cat_header";
        
        parent = parent.parentNode;
        parent.className = "alt1";
        
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent.setAttribute("cellspacing","0");
        parent.setAttribute("cellpadding","5");
        parent.className = "maintable_newpm table_top_spacing";
    }
    
}

function fix_submit_style() {
    
    var aux = $('form table.maintable td.cat');
    if (aux.length > 0) {
        var parent = aux[0];
        parent = parent.parentNode;
        parent.className = "alt1";
        
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent.setAttribute("cellspacing","0");
        parent.setAttribute("cellpadding","5");
        parent.className = "maintable_newpm table_top_spacing";
    }
    
}

function change_story_style() {
    
    var aux = $('table.maintable.table_submission table.maintable td.alt1_ext[align="left"]');
    if (aux.length > 0) {
        var parent = aux[0];
        
        var text = parent.innerHTML;
        
        if ( text.indexOf("File type: Text File") >= 0 ) {
            
            parent = parent.parentNode;
            parent = parent.parentNode;
            parent = parent.parentNode;
            
            parent.className = "maintable story_submission";
        }
        
    }
}

function fix_own_user_page() {
    
    var tab = $( "font:textEquals('.Watch')" );
    if ( tab.length > 0 ) {
        tab = tab[0];
        tab = tab.parentNode;
        tab = tab.parentNode;
        tab.setAttribute("style","display:none;");
    }
        
    var tab = $( "a:textEquals('Send Note')" );
    if ( tab.length > 0 ) {
        tab = tab[0];
        tab = tab.parentNode;
        tab.setAttribute("style","display:none;");
    }
}

function page_width( width ) {
    var aux = $('table.content.maintable tr.innertable table');
    if (aux.length > 0) {
        var parent = aux[0];
  		parent.className = parent.className + " maintable_content_inside";
        parent.setAttribute("width", width );
    }
    
    console.log("New page width set!");
}

function fix_msg_submission_others_style() {
    
    var aux = $('div#messagecenter-submissions');
    if (aux.length > 0) {
        var parent = aux[0];
        parent = parent.parentNode;
  		parent.className = "alt1";
        
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent.className = "maintable_newpm table_top_spacing";
        
    } else {
    
        var aux = $('div#messagecenter-other');
        if (aux.length > 0) {
            var parent = aux[0];
            parent = parent.parentNode;
            parent.className = "alt1";
            
            parent = parent.parentNode;
            parent = parent.parentNode;
            parent = parent.parentNode;
            parent.className = "maintable_newpm table_top_spacing";
        }
    }
    
}

function narrow_space_before_avatar() {
    
    var aux = $('td[width="20"]');
    for(var i=0;i<aux.length;i++) {
        var parent = aux[i];
  		parent.setAttribute("width","5");
 	}
    
    aux = $('th[width="20"]');
    for(var i=0;i<aux.length;i++) {
        var parent = aux[i];
  		parent.setAttribute("width","5");
 	}
    
}

function fix_first_cat_browse() {
    
    var aux = $('#browse table.maintable tr');
    if (aux.length > 0) {
        var parent = aux[0];
  		parent.className = "alt1";
        
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent.setAttribute("cellspacing","0");
        parent.setAttribute("cellpadding","5");
        parent.className = "maintable table_top_spacing";
    }
    
}

function fix_first_cat_stats() {
    
    var aux = $('table.maintable td.cat table.maintable tr');
    if (aux.length > 0) {
        var parent = aux[0];
  		//parent.className = "alt1";
        
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent.setAttribute("cellspacing","0");
        parent.setAttribute("cellpadding","5");
        parent.className = "maintable alt1 table_top_spacing";
    }
    
}

function fix_first_cat() {
    
    var aux = $('table.maintable td.cat table.maintable tr');
    if (aux.length > 0) {
        var parent = aux[0];
  		parent.className = "alt1";
        
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent.setAttribute("cellspacing","0");
        parent.setAttribute("cellpadding","5");
        parent.className = "maintable table_top_spacing";
    }
    
}

function fix_cat_header_style() {
    
    var aux = $('td.cat[align="center"]');
    for(var i=0;i<aux.length;i++) {
        var parent = aux[i];
  		parent.className = "cat_header";
 	}
    
    aux = $('td[width="20"][valign="top"]');
    if (aux.length > 0) {
        var parent = aux[1];
  		parent.className = "alt1";
        
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent.className = "maintable user_card"
 	}
    
    aux = $('table.content table[cellpadding="0"][width="100%"]');
    if (aux.length > 0) {
        var parent = aux[0];
  		parent.className = "maintable_user_content";
 	}
    
    aux = $('table.maintable td.cat[colspan="2"] div.no_overflow');
    if (aux.length > 0) {
        var parent = aux[0];
        parent = parent.parentNode;
  		parent.className = "cat_header";
 	}
    
}

function fix_style_fa_home() {
    
    var aux = $('table.content.maintable tr.innertable > td > table');
    if (aux.length > 0) {
        
        var parent = aux[0];
        parent.className = parent.className += " maintable_newpm table_top_more_spacing";
        parent.setAttribute("cellpadding","0");
        
    }
    
}

function fix_message_style() {
    
    var aux = $('td.cat[align="center"] > b');
    if (aux.length > 0) {
        var parent = aux[0];
        parent = parent.parentNode;
  		parent.className = "cat_header";
        
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent = parent.parentNode;
        
        parent.className = "maintable maintable_newpm"
 	}
    
    var aux = $('font[color="#999999"]');
    if (aux.length > 0) {
        var parent = aux[0];
        
        parent.removeAttribute("color");
        parent.className = "greyed_font";
    }
    
    var aux = $('form.viewmessage > table.maintable td.cat');
    if (aux.length > 0) {
        var parent = aux[0];
  		parent.className = "alt1";
        
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent = parent.parentNode;
        
        parent.className = "maintable maintable_newpm"
        parent.setAttribute("cellpadding","10");
        parent.setAttribute("cellspacing","0");
 	}
    
    var aux = $('td.alt1[rowspan="2"]');
    if (aux.length > 0) {
        var parent = aux[0];
  		parent.className = "";
        
 	}
}

function fix_search_style() {
    
    var aux = $( "b:textEquals('Search')" );
    if ( aux.length > 0 ) {
        var parent = aux[0];
        parent = parent.parentNode;
  		parent.className = "cat_header";
        
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent = parent.parentNode;
        
        parent.className = "maintable maintable_newpm"
        
    }
    
}

function fix_pms_style() {
    
    var aux = $('td.cat.links > b');
    for(var i=0;i<aux.length;i++) {
        var parent = aux[i];
        parent = parent.parentNode;
  		parent.className = "cat_header";
        
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent = parent.parentNode;
        
        parent.className = "maintable maintable_newpm"
 	}
    
    var aux = $('td.alt1[rowspan="2"]');
    if (aux.length > 0) {
        var parent = aux[0];
  		parent.className = "";
        
 	}
}

function fix_session_style() {
    
    var aux = $('td.cat.links > b');
    if (aux.length > 0) {
        var parent = aux[0];
        parent = parent.parentNode;
  		parent.className = "cat_header";
        
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent = parent.parentNode;
        
        parent.className = "maintable maintable_newpm"
 	}
    
    var aux = $('.maintable.container');
    if (aux.length > 0) {
        var parent = aux[0];        
        parent.className = "maintable container maintable_session"
 	}
    
}

function fix_controls_style() {
    
    var aux = $('td.cat.links > b');
    if (aux.length > 0) {
        var parent = aux[0];
        parent = parent.parentNode;
  		parent.className = "cat_header";
        
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent = parent.parentNode;
        
        parent.className = "maintable maintable_newpm"
 	}
    
    var aux = $('td.cat[align="center"] > b');
    if (aux.length > 0) {
        var parent = aux[0];
        parent = parent.parentNode;
  		parent.className = "cat_header";
        
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent = parent.parentNode;
        
        parent.className = "maintable maintable_newpm"
 	}
    
    if ( location.href.indexOf('/controls/site-settings') > 0 ) {
        aux = $('td.cat.links strong');
        for(var i=0;i<aux.length;i++) {
            var parent = aux[i];
            parent = parent.parentNode;
            parent.className = "cat_header";
            
            parent = parent.parentNode;
            parent = parent.parentNode;
            parent = parent.parentNode;
            
            parent.className = "maintable maintable_newpm"
        }
    }
    
}

function fix_newpm_style() {
    
    var aux = $('td.cat[align="center"] b');
    if (aux.length > 0) {
        var parent = aux[0];
        parent = parent.parentNode;
  		parent.className = "cat_header";
        
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent = parent.parentNode;
        
        parent.className = "maintable maintable_newpm"
 	}
}

function fix_journals_style() {
    
    var aux = $("table.maintable td.alt1 table.maintable");
    for(var i=0;i<aux.length;i++) {
        var parent = aux[i];
        
        parent.setAttribute("cellspacing","0");
        
        parent = parent.parentNode;
  		parent.className = "alt1_ext";
 	}
        
    aux = $( "td.alt1_ext table.maintable td.alt1");
    for(var i=0;i<aux.length;i++) {
        var parent = aux[i];
  		parent.className = "alt1_ext";
        if ( parent.width == "20%" ) {
            parent.className = "alt1_ext ldot";
        }
 	}
    
    aux = $('table.content td.cat table tr');
    if (aux.length > 0) {
        var parent = aux[0];
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent = parent.parentNode;
        
        
  		parent.className = "alt1";
        
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent.setAttribute("cellspacing","0");
        parent.setAttribute("cellpadding","5");
        parent.setAttribute("width","99%");
        parent.className = "maintable table_top_more_spacing";
        
    }
    
    var aux = $('td.cat[align="center"]');
    for(var i=0;i<aux.length;i++) {
        var parent = aux[i];
  		parent.className = "cat_header";
        
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent = parent.parentNode;
        
        if ( parent.className != "maintable table_top_more_spacing" ) {
        
        	parent.className = "maintable maintable_newpm";
        }
 	}
    
}

function fix_submission_style() {
    
    var aux = $("table.maintable td.alt1 table.maintable");
    for(var i=0;i<aux.length;i++) {
        var parent = aux[i].parentNode;
  		parent.className = "alt2";
 	}
        
    aux = $( "td.alt2 table.maintable td.alt1");
    for(var i=0;i<aux.length;i++) {
        var parent = aux[i];
  		parent.className = "alt1_ext";
 	}
    
    console.log( 'Changing style of submission page' );
    
    aux = $('td.cat table tr');
    if (aux.length > 0) {
        var parent = aux[0];
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent = parent.parentNode;
        
        
  		parent.className = "alt1";
        
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent.setAttribute("cellspacing","0");
        parent.setAttribute("cellpadding","5");
        parent.className = "maintable table_top_more_spacing";
        
    }
    
    aux = $('div#submission table.maintable[cellpadding="2"][cellspacing="1"] td.cat');
    if (aux.length > 0) {
        var parent = aux[0];
        
  		parent.className = "cat_header";
        
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent = parent.parentNode;
        
        parent.className = "maintable table_submission";
        
    }
    
    var aux = $('td.cat[align="center"]');
    for(var i=0;i<aux.length;i++) {
        var parent = aux[i];
  		parent.className = "cat_header";
        
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent = parent.parentNode;
        
        parent.className = "maintable maintable_newpm"
 	}
    
    var aux = $('td.cat[valign="top"][width="70%"]');
    for(var i=0;i<aux.length;i++) {
        var parent = aux[i];
  		parent.className = "cat_header";
 	}
    
    var aux = $('table.table_submission > tbody > tr > td.alt2 > table.maintable > tbody > tr > td.alt1_ext');
    if (aux.length > 0) {
        var parent = aux[0];
        
        console.log( "here!");
        
        parent.innerHTML = "<object>" + parent.innerHTML + "</object>";
    }
    
    
    
}

function move_nav_buttons_on_top() {
    
    var prev = $('a.prev.button');
    if ( prev.length > 0 ) {
    	prev = prev[0];
    } else {
        prev = false;
    }
    
    var next = $('a.next.button');
    if ( next.length > 0 ) {
        next = next[0];
    } else {
        next = false;
    }
    
    var parent_node = false;
    if ( prev ) {
   		parent_node = prev.parentNode;
   		parent_node = parent_node.parentNode;
    } else if ( next ) {
        parent_node = next.parentNode;
        parent_node = parent_node.parentNode;
    }
    
    if ( parent_node ) {
    
    	var new_div = document.createElement("div");
    	new_div.className = 'alt1 actions';
    	new_div.appendChild( new_br() );
    
    	if ( prev ) {
    		prev = prev.cloneNode(true);
        
    		new_div.appendChild( prev );
    	}
    
    	if ( next ) {
    		next = next.cloneNode(true);
        
    		new_div.appendChild( next );
    	}
    
    	new_div.appendChild( new_br() );
    
    	$( parent_node ).prepend( new_div );
    	
    } 
    
}

function add_gallery_rating_buttons() {
    
    var action_div = $('td[align="center"][width="70%"]').get( 0 );
    
    action_div.appendChild( new_br() );
    
    var new_span = document.createElement("span");
    
    new_span.innerHTML = "Toggle Submissions by Rating: <br/>";
    
    var button_all = document.createElement("button");
    var button_general = document.createElement("button");
    var button_mature = document.createElement("button");
    var button_adult = document.createElement("button");
    
	button_all.setAttribute("type","button");
    button_general.setAttribute("type","button");
    button_mature.setAttribute("type","button");
    button_adult.setAttribute("type","button");
    
    button_general.setAttribute("id","b_general");
    button_mature.setAttribute("id","b_mature");
    button_adult.setAttribute("id","b_adult");
    
    button_all.className = 'blue';
    button_general.className = 'red';
    button_mature.className = 'red';
    button_adult.className = 'red';
    
    button_all.innerHTML = "Show All Ratings";
    button_general.innerHTML = "Hide General";
    button_mature.innerHTML = "Hide Mature";
    button_adult.innerHTML = "Hide Adult";
    
    button_all.onclick=show_all_ratings;
    button_general.onclick=toggle_general_rating;
    button_mature.onclick=toggle_mature_rating;
    button_adult.onclick=toggle_adult_rating;
    
    new_span.appendChild( button_all )
    new_span.appendChild( button_general )
    new_span.appendChild( button_mature )
    new_span.appendChild( button_adult )
    
    action_div.appendChild( new_span );
    
    check_saved_toggle();
}

function add_rating_buttons() {
    
    var action_div = $('div.actions').get( 0 );
    
    action_div.appendChild( new_br() );
    action_div.appendChild( new_br() );
    
    var new_span = document.createElement("span");
    
    new_span.innerHTML = "Toggle Submissions by Rating: ";
    
    var button_all = document.createElement("button");
    var button_general = document.createElement("button");
    var button_mature = document.createElement("button");
    var button_adult = document.createElement("button");
    
	button_all.setAttribute("type","button");
    button_general.setAttribute("type","button");
    button_mature.setAttribute("type","button");
    button_adult.setAttribute("type","button");
    
    button_general.setAttribute("id","b_general");
    button_mature.setAttribute("id","b_mature");
    button_adult.setAttribute("id","b_adult");
    
    button_all.className = 'blue';
    button_general.className = 'red';
    button_mature.className = 'red';
    button_adult.className = 'red';
    
    button_all.innerHTML = "Show All Ratings";
    button_general.innerHTML = "Hide General";
    button_mature.innerHTML = "Hide Mature";
    button_adult.innerHTML = "Hide Adult";
    
    button_all.onclick=show_all_ratings;
    button_general.onclick=toggle_general_rating;
    button_mature.onclick=toggle_mature_rating;
    button_adult.onclick=toggle_adult_rating;
    
    new_span.appendChild( button_all )
    new_span.appendChild( button_general )
    new_span.appendChild( button_mature )
    new_span.appendChild( button_adult )
    
    action_div.appendChild( new_span );
    
    check_saved_toggle();
}

function check_saved_toggle() {
    if ( !GM_getValue( "FAex_toggle_general", true ) ){
        toggle_general_rating();
    }
    if ( !GM_getValue( "FAex_toggle_mature", true ) ){
        toggle_mature_rating();
    }
    if ( !GM_getValue( "FAex_toggle_adult", true ) ){
        toggle_adult_rating();
    }
}

function show_all_ratings() {
    
    //var subs = $("b.t-image");
    //for(var i=0;i<subs.length;i++) {
    //    subs[i].setAttribute("style","visibility:visible;");
 	//}
    
    show_rating( "b.r-general" );
    show_rating( "b.r-mature" );
    show_rating( "b.r-adult" );
    
    var element;
    element = $('#b_general').get( 0 );
    element.className = 'red';
    element.innerHTML = "Hide General";
    element = $('#b_mature').get( 0 );
    element.className = 'red';
    element.innerHTML = "Hide Mature";
    element = $('#b_adult').get( 0 );
    element.className = 'red';
    element.innerHTML = "Hide Adult";
    
    GM_setValue( "FAex_toggle_general", true );
    GM_setValue( "FAex_toggle_mature", true );
    GM_setValue( "FAex_toggle_adult", true );
}

function toggle_general_rating() {
    
    var element = $('#b_general').get( 0 );
    if ( element.className == 'red' ) {
        hide_rating( "b.r-general" );
        element.className = 'blue';
        element.innerHTML = "Show General";
        
         GM_setValue( "FAex_toggle_general", false );
    } else {
        show_rating( "b.r-general" );
        element.className = 'red';
        element.innerHTML = "Hide General";
        
        GM_setValue( "FAex_toggle_general", true );
    }
}

function toggle_mature_rating() {
    
    var element = $('#b_mature').get( 0 );
    if ( element.className == 'red' ) {
        hide_rating( "b.r-mature" );
        element.className = 'blue';
        element.innerHTML = "Show Mature";
        
        GM_setValue( "FAex_toggle_mature", false );
    } else {
        show_rating( "b.r-mature" );
        element.className = 'red';
        element.innerHTML = "Hide Mature";
        
        GM_setValue( "FAex_toggle_mature", true );
    }
    
}

function toggle_adult_rating() {
    
    var element = $('#b_adult').get( 0 );
    if ( element.className == 'red' ) {
        hide_rating( "b.r-adult" );
        element.className = 'blue';
        element.innerHTML = "Show Adult";
        
        GM_setValue( "FAex_toggle_adult", false );
    } else {
        show_rating( "b.r-adult" );
        element.className = 'red';
        element.innerHTML = "Hide Adult";
        
        GM_setValue( "FAex_toggle_adult", true );
    }
    
}

function show_rating( rate ) {
    
    var subs = $( rate );
    for(var i=0;i<subs.length;i++) {
        subs[i].setAttribute("style","visibility:visible;");
 	}
    
}

function hide_rating( rate ) {
    
    var subs = $( rate );
    for(var i=0;i<subs.length;i++) {
        subs[i].setAttribute("style","visibility:hidden;display:none;");
 	}
    
}

function new_append_buttons() {
    
    var text_area = $('textarea[name="profileinfo"]').get( 0 );
    
    var new_p = document.createElement("p");
    new_p.setAttribute("style","text-align:left;");
    
    var button_new_block_r = document.createElement("button");
    var button_new_block_l = document.createElement("button");
    var button_new_user_icon = document.createElement("button");
    var button_new_user_icon_text = document.createElement("button");
    var button_custom_background = document.createElement("button");
    
	button_new_block_r.setAttribute("type","button");
    button_new_block_l.setAttribute("type","button");
    button_new_user_icon.setAttribute("type","button");
    button_new_user_icon_text.setAttribute("type","button");
    button_custom_background.setAttribute("type","button");
    
    button_new_block_r.innerHTML = "Add new block to the right";
    button_new_block_l.innerHTML = "Add new block to the left";
    button_new_user_icon.innerHTML = "Add new user/group icon";
    button_new_user_icon_text.innerHTML = "Add new user/group icon with text";
    button_custom_background.innerHTML = "Add a custom background to your userpage";
    
    text_area.parentNode.appendChild( new_p );
    
    button_new_block_r.onclick=openBlockDialogueRight;
    button_new_block_l.onclick=openBlockDialogueLeft;
    button_new_user_icon.onclick=openIconDialogue;
    button_new_user_icon_text.onclick=openIconTextDialogue;
    button_custom_background.onclick=openCustomBackDialogue;
    
    new_p.appendChild( button_new_block_r );
    new_p.appendChild( button_new_block_l );
    new_p.appendChild( button_new_user_icon );
    new_p.appendChild( button_new_user_icon_text );
    new_p.appendChild( button_custom_background );
    
}

function openIconDialogue() {
    
    var title = prompt('Insert user/group name', '');
    
    var text_area = $('textarea[name="profileinfo"]').get( 0 );
    
    var new_text = "";
    
    if (title) {
        new_text = " :" + title.toLowerCase() + "icon: ";
    }
    
    text_area.value += new_text;
    text_area.scrollTop = text_area.scrollHeight;
    
}

function openCustomBackDialogue() {
    
    var title = prompt('Insert background url', '');
    
    var text_area = $('textarea[name="profileinfo"]').get( 0 );
    
    var new_text = "";
    
    if (title) {
        new_text = " :background" + title.toLowerCase() + ":: ";
    }
    
    text_area.value += new_text;
    text_area.scrollTop = text_area.scrollHeight;
    
}

function openIconTextDialogue() {
    
    var title = prompt('Insert user/group name', '');
    
    var text_area = $('textarea[name="profileinfo"]').get( 0 );
    
    var new_text = "";
    
    if (title) {
        new_text = " :icon" + title.toLowerCase() + ": ";
    }
    
    text_area.value += new_text;
    text_area.scrollTop = text_area.scrollHeight;
    
}

function openBlockDialogueRight() {
    
    var title = prompt('Insert Block Title', 'My Block');
    
    var text_area = $('textarea[name="profileinfo"]').get( 0 );
    
    var new_text = "";
    
    if (title) {
        new_text = "\n:block[" + title + "]";        
        new_text += "\nYour content here\n::";
    }
    
    text_area.value += new_text;
    text_area.scrollTop = text_area.scrollHeight;
    
}

function openBlockDialogueLeft() {
    
    var title = prompt('Insert Block Title', 'My Block');
    
    var text_area = $('textarea[name="profileinfo"]').get( 0 );
    
    var new_text = "";
    
    if (title) {
        new_text = "\n:block[" + title + "]";
        new_text += "[left]";
        new_text += "\nYour content here\n::";
    }
    
    text_area.value += new_text;
    text_area.scrollTop = text_area.scrollHeight;
    
}

function bigger_update_button() {
    
    var update_button = $('input.button[value="Update"]').get( 0 );
    
    update_button.setAttribute("style","width:50%;font-size:15pt");
    
    
}

function bigger_text_area() {
    
    var text_area = $('textarea[name="profileinfo"]').get( 0 );
    
    text_area.setAttribute("style","width:96%;height:250px;");
    
}

function add_fa_extended_code() {
    var page_url = location.href;
    
    var script_list = $("script");
    var i;
    var j;
    var page_text = "";
    
    j = page_url.indexOf('view/');
    var submission_id = page_url.slice( j+5 );
    
    j = submission_id.indexOf('/');
    if ( j > 0 ) {
        submission_id = submission_id.slice(0,j);
    }
    
    for(i=0; i<script_list.length;i++) {
        page_text = script_list[i];
        page_text = page_text.innerHTML;
        j = page_text.indexOf('var small_url');
        if ( j > 0 ) {
            j = page_text.indexOf('"//');
            page_text = page_text.slice(j+3);
            j = page_text.indexOf('";');
            page_text = page_text.slice(0,j);
            break;
        }
    }
    
    if ( j < 0 ) {
        
        script_list = $("object");
        for(i=0; i<script_list.length;i++) {
            page_text = script_list[i];
            page_text = page_text.data;
            j = page_text.indexOf('/art/');
            if ( j > 0 ) {
                page_text = page_text.slice(j+5);
                j = page_text.indexOf('.');
                page_text = page_text.slice(0,j);
                j = page_text.indexOf('/');
                page_text = page_text.slice(j+1);
                
            }
        }
        
        page_text = 't.facdn.net/' + submission_id + '@100-' + page_text + '.jpg';
        
    }
    
    page_text = page_text.replace(/@400/,"@100");
    page_text = 'http://' + page_text;
    console.log( 'thumbnail image address: ' + page_text );
    
    var icon_code = ':image[' + page_text + ']' + page_url + '::';
        
    var container = $( "b:textEquals('Image Specifications:')" );
    if ( container.length > 0 && j > 0 ) {
        container = container[0];
        container = container.parentNode;
        
        container.appendChild( new_br() );
        var new_p = document.createElement("p");
        new_p.innerHTML = '<b>FA Extended icon code:</b> <input type="text" name="" style="width:80%;font-family:monospace;padding:1px;" value="' + icon_code + '"/>';
        container.appendChild( new_p );
        
    }
    
}

function change_document_title() {
    var text = document.title;
    var i = text.indexOf(" --");
    if ( i >= 0 ) {
        text = text.slice(0,i);
    }
    text = text.replace(/Artwork Gallery/,"Gallery");
    text = text.replace(/Scraps Gallery/,"Scraps");
    text = text.replace(/Favorites Gallery/,"Favorites");
    
    text = text + ' [FA Extended]';
    document.title = text;
}

function update_submissions_values() {
    
    var a_subs = $( 'a[title="Submissions"]' );
    
    if (a_subs) {
        a_subs = a_subs[0];
    	var subs_num = a_subs.innerHTML;
    	subs_num = parseInt( subs_num );
        
        GM_setValue( "FAex_s", subs_num );
        
    }
    
}

function update_others_values() {
    
    var a_mess = $( 'a[title="Comments, Journals, Favorites, and Watches"]' );
    var i;
    
    if (a_mess) {
        a_mess = a_mess[0];
    	var a_mess_num = a_mess.innerHTML;
    	var array_num = a_mess_num.split(",");
        
        GM_setValue( "FAex_c", 0 );
        GM_setValue( "FAex_j", 0 );
        GM_setValue( "FAex_f", 0 );
        GM_setValue( "FAex_w", 0 );
        
    	for( i=0; i<array_num.length;i++) {
        	var element = array_num[i];
            var element_num = parseInt( element );
            var element_last = element.slice(-1);
            
            GM_setValue( "FAex_" + element_last.toLowerCase(), element_num );
    	}
    }
    
}

function update_notes_values() {
    
    var a_notes = $( 'a[title="Notes"]' );
    if (a_notes) {
        a_notes = a_notes[0];
    	var notes_num = a_notes.innerHTML;
    	notes_num = parseInt( notes_num );
        
        GM_setValue( "FAex_n", notes_num );
        
    }
    
}

function count_new_submissions() {
    
    var a_subs = $( 'a[title="Submissions"]' );
    
    if ( a_subs.length > 0 ) {
        a_subs = a_subs[0];
    	var subs_num = a_subs.innerHTML;
        
        if ( subs_num == "" ) {
            return 0;
        }
        
    	subs_num = parseInt( subs_num );
        
        var old_num = GM_getValue( "FAex_s", 0 );
        
        var difference = subs_num - old_num;
        if ( difference > 0 ) {
            //a_subs.innerHTML = '<font color="#ffa075">+' + difference + '</font> / ' + subs_num + 'S';
            a_subs.innerHTML = '<font color="#ffa075">+' + difference + 'S</font>';
            return difference;
        }
    }
    return 0;
    
}

function count_new_others() {
    
    var a_mess = $( 'a[title="Comments, Journals, Favorites, and Watches"]' );
    var i;
    var total_difference = 0;
    
    if ( a_mess.length > 0 ) {
        a_mess = a_mess[0];
    	var a_mess_num = a_mess.innerHTML;
    	
        if ( a_mess_num == "" ) {
            return 0;
        }
        
    	var array_num = a_mess_num.split(",");
        var result_string = '';
    	for( i=0; i<array_num.length;i++) {
        	var element = array_num[i];
            var element_num = parseInt( element );
            var element_last = element.slice(-1);
            
            var old_num = GM_getValue( "FAex_" + element_last.toLowerCase(), 0 );
            var difference = element_num - old_num;
            if ( difference > 0 ) {
                total_difference += difference;
                //result_string += '<font color="#ffa075">+' + difference + '</font> / ' + element_num + element_last;
                result_string += '<font color="#ffa075">+' + difference + element_last + '</font>';
                
            } else {
                result_string += element_num + element_last;
            }
            
            if ( i < (array_num.length - 1) ) {
                result_string += ', ';
            }
    	}
        
        a_mess.innerHTML = result_string;
        
        return total_difference;
    }
    return 0;
}

function count_new_notes() {
    
    var a_notes = $( 'a[title="Notes"]' );
    if ( a_notes.length > 0 ) {
        a_notes = a_notes[0];
    	var notes_num = a_notes.innerHTML;
        
        if ( notes_num == "" ) {
            return 0;
        }
        
    	notes_num = parseInt( notes_num );
        
        //var old_num = GM_getValue( "FAex_n", 0 );
        //a_notes.innerHTML = '<font color="#ffa075">+' + difference + '</font> / ' + notes_num + 'N';
        a_notes.innerHTML = '<font color="#ffa075">+' + notes_num + 'N</font>';
        //var difference = notes_num - old_num;
        //if ( difference > 0 ) {  
        //}
        
        return notes_num;
    }
    return 0;
}

function fix_title_comments() {
    // fixes the position of the title before the comments
    
    var title = $( "b:textEquals('User comments')" );
    if ( title.length > 0 ) {
        title = title[0];
        title = title.parentNode;
        title = title.parentNode;
        title = title.parentNode;
        title = title.parentNode;
        var newbr = new_br();
        title.parentNode.insertBefore(newbr, title);
        newbr = new_br();
        title.parentNode.insertBefore(newbr, title);
    }
}

function better_comments_avatars() {
            
    var av_a;
    //var ignore_user = '#';
    
    av_a = $("td.alt1[width='70%'] a");
    
    if ( av_a.length > 0 ) {
    	av_a = av_a[0];
    	av_a.className = "newAvatar";
        //ignore_user = av_a.href;
        
        var newdiv = document.createElement("div");
        
        newdiv.setAttribute("width","100px");
        newdiv.setAttribute("style","display:inline-block;");
        
        var av_td = av_a.parentNode;
        
        //av_td.setAttribute("width","100%");
        
        av_td.insertBefore( newdiv, av_td.childNodes[0] );
        //av_td.prepend( newdiv );
        
        av_td.setAttribute("valign","baseline");
        
        newdiv.appendChild( av_a );
        
        //av_td = $("td.cat[width='70%']").get( 0 );
        //av_td.setAttribute("colspan","2");
        
        add_popup_to_avatar( av_a );
        
    }
    
    var list = $("td.icon");
    
    if( list.length > 0 ) {
        var i;
    	for(i=0;i<list.length;i++) {
	        var av_td = list[i];
            var childs = av_td.childNodes;
            if ( childs.length > 1 ) {
    	    	av_a = childs[1];
            } else {
                av_a = childs[0];
            }
        	av_a.className = "newAvatar";
            
            //if ( av_a.href != ignore_user ) {
            add_popup_to_avatar( av_a );
            //}
    	}
    }
    
    list = $("b.replyto-name");
    
    if( list.length > 0 ) {
        var i;
    	for(i=0;i<list.length;i++) {
	        var av_td = list[i];
            var text = av_td.outerHTML;
            
            av_td = av_td.parentNode;
            av_td = av_td.parentNode;
            av_td.innerHTML = text;
    	}
    }
    
    
}

function blacklist_submissions() {
    // hides and precheck 
    
    var sub_list = $( "b.t-image span" );
    var index;
    var remove_subs = false;
    
    if ( keywords__blacklist.length == 0 ) {
        return;
    }
    
    if ( sub_list.length > 0 ) {
        
        for ( index=0; index<sub_list.length; index++ ) {
            
            var sub = sub_list[index];
            var sub_title = sub.title;
            
            if ( list_in_string( keywords__blacklist , sub_title ) ) {
                
                var parentb = sub.parentNode;
                
                if ( !remove_blacklisted ) {
                	var newdiv = document.createElement("div");
                	newdiv.setAttribute("style",'display:inline-block;visibility:hidden;');
                	parentb.parentNode.appendChild( newdiv );
                	newdiv.appendChild( parentb );
                }
                
                var checkbox = parentb.childNodes[1];
                checkbox = checkbox.childNodes[0];
                
                checkbox.checked=true;
                
                remove_subs = true;
                
            }
            
        }
        
        if ( remove_subs && remove_blacklisted ) {
            var button = $( "input.button.remove-checked" ).get( 0 );
            button.click();
        }
        
    }
    
}

function list_in_string( list, string) {
    var i;
    string = ' ' + string.toLowerCase() + ' ';
        
    for (i=0;i<list.length;i++) {
        var element = list[i].toLowerCase();
        if ( string.indexOf( ' ' + element + ' ' ) >= 0 ) {
            return true;
        }
    }
    
    return false;
}

function fix_top_bar() {
	//fixed top bar
    
    GM_addStyle( ".fixedInPlace{position:fixed; z-index:1000}" );
    
    var top_bar = $("table.block-menu-top");
    top_bar.addClass("fixedInPlace");
    
}

function add_new_line() {
    //adds new line at the end of the page
    
    var body = $("body").get( 0 );
    var brTag = document.createElement("br");
	body.appendChild(brTag);
}

function fix_header() {
	//bump down fur affinity header and ads
    
    var top_bar = $("table.block-menu-top");
    var div = $("div.block-banners").get( 0 );
    var new_div = document.createElement("div");
    new_div.className = "bumpDown";
//    new_div.setAttribute("style","padding-top:" + top_bar.height() +"px;");
//    new_div.addEventListener ("resize", bump_down_page_content, true);
    div.parentNode.insertBefore(new_div, div);
//    
}

//function bump_down_page_content() {
//    var top_bar = $("table.block-menu-top");
//    var div = $("div.bumpDown").get( 0 );
//    div.setAttribute("style","padding-top:" + top_bar.height() +"px;");
//}

//var resizeTimer;
//$(window).resize(function() {
//    clearTimeout(resizeTimer);
//    resizeTimer = setTimeout( bump_down_page_content, 100);
//});

function add_icon_topbar() {
    
    // base64 image
    var icon = '<img alt="" src="data:image/png;base64,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" />';

	var second_icon = '<img alt="" src="data:image/png;base64,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" />';
    
    var top_td = $("td.header_bkg").get( 0 );
    var new_td = document.createElement("td");
    var new_a = document.createElement("a");
    
    var new_a_2 = document.createElement("a");
    
    new_a_2.className = "link_to_browse";
    
    new_a.href = "http://www.furaffinity.net/";
    new_a_2.href = "http://www.furaffinity.net/browse/";
    
    new_a.innerHTML = icon;
    
    new_a_2.innerHTML = second_icon;
    
    
    new_td.appendChild(new_a);
    if ( $(window).width() >= $(document).width() ) {
        
    	new_td.appendChild(new_a_2);
        new_td.className = "header_bkg";
        
    } else {
    	new_td.className = "header_bkg header_compact";
    }
    new_td.setAttribute("style","padding-left:6px;");
    
    top_td.parentNode.insertBefore(new_td, top_td);
}

function clear_last_searches() {
    
    GM_setValue( "searches", null );
    
    //window.location.reload();
    history.go(0)
    
    return false
}

function toggle_side_menu() {
    
    if ( left_menu_showing ) {
            
            left_menu_showing = false;
        	$( 'div.side_menu' ).hide('slide', {direction: 'right'}, 1000);
            return false;
            
    } else {
        
        left_menu_showing = true;
        $( 'div.side_menu' ).show('slide', {direction: 'right'}, 1000);
        return false;
        
    }
}

function fix_message_icon(num) {
    if(num > 0) {
        var alert_message_icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAH5JREFUeNpivNed9p+BBoCFgYGBQVGUn6qG3n/9kYGJgUZg1OBRg0cNHjV4QA1mgRVzpALkohabfiYGBgZGUrGiKH8GAwMDegWBooasoLj/+uNMBgaGbCyGI4KCgtpjOjQoJ0JdiRI8lEbeZAYGhkKckUchmKgoys+EHoGAAQCGsRiGSBU/MAAAAABJRU5ErkJggg==";
        var icon = $("#message_icon_img").get( 0 );
        icon.setAttribute("src",alert_message_icon);
    }
}

function add_links_topbar() {
           
    var left_menu = $("td.header_bkg ul.dropdown.dropdown-horizontal").get( 0 );
    var left_td = left_menu.parentNode;
    var parent_tr = left_td.parentNode;
    
    var outer_ul = document.createElement("ul");
    outer_ul.className = "dropdown dropdown_left main_dropdown_menu";
    outer_ul.setAttribute("style","float:left;");
    
    left_td.setAttribute("style","width:27px;");
    
    var inner_li = document.createElement("li");
    
    var menu_icon = '<img alt="" src="data:image/png;base64,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" />';
    
    var home_icon = '<img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRF3t7e////////R9Yj/gAAAAN0Uk5T//8A18oNQQAAAEZJREFUeNrUzjsSACAIQ8GH9z+0gx+I2NlJldkigRYHkkXFSTVLR1Qc1XQODefU7RRdTtXpXDqcW929qOqafOD57jfcBRgAgEECeyDOOh4AAAAASUVORK5CYII=" />';
    
    var message_icon = '<img id="message_icon_img" alt="" src="data:image/png;base64,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" />';
    
    var side_menu_link = document.createElement("a");
    side_menu_link.innerHTML = menu_icon;
    
    side_menu_link.className = 'dir';
    side_menu_link.href = '#'
    side_menu_link.id = "left-menu";
    
    side_menu_link.onclick=toggle_side_menu;
    
    inner_li.appendChild( side_menu_link )
    
    //inner_li.innerHTML = '<a id="left-menu" class="dir" href="#">' + menu_icon + '</a>';
    
    var page_body = $( "body > div" ).get(0);
    var side_menu_div = document.createElement("div");
    side_menu_div.className = 'side_menu';
    
    page_body.appendChild( side_menu_div );
    
    left_menu.className = "dropdown dropdown_left";
    
    parent_tr.appendChild( left_td );
    left_td.appendChild( outer_ul );
    outer_ul.appendChild( inner_li );
    
    //inner_li.appendChild( left_menu );
    side_menu_div.appendChild( left_menu );
    
    var left_childs = left_menu.childNodes;
    var i;
    for(i=0; i<left_childs.length; i++) {
        var inner_child = left_childs[i].childNodes[0];
        if ( inner_child && inner_child.className == "dir" ) {
            inner_child.className = "";
        }
    }
    
    var a_user_name = $( "a#my-username" );
    
    var _my_username = ""
    
    if ( a_user_name.length > 0 ) {
    	a_user_name = a_user_name[0];
        
        a_user_name.className = "dir";
        
    	var li_container = a_user_name.parentNode;
    
	    var user_name = a_user_name.href;
        
        a_user_name.className = "";
        
        _my_username = a_user_name.innerHTML.replace(/~/,"");
    	a_user_name.innerHTML = a_user_name.innerHTML.replace(/~/,"▼ ");
    
	    var gallery_link = user_name.replace(/user/,"gallery");
	    var scraps_link = user_name.replace(/user/,"scraps");
    	var favorites_link = user_name.replace(/user/,"favorites");
        var journals_link = user_name.replace(/user/,"journals");
    
        var outer_ul = li_container.parentNode;
        outer_ul.className = "dropdown dropdown-horizontal";
        outer_ul.setAttribute("style","float:right;");
    
    	var new_ul = document.createElement("ul");
    
	    new_ul.innerHTML =  '<li><a href="' + user_name + '">User Page</a></li><li><a href="' + gallery_link + '">Gallery</a></li><li><a href="' + scraps_link + '">Scraps</a></li>';
        new_ul.innerHTML += '<li><a href="' + favorites_link + '">Favorites</a></li><li><a href="' + journals_link + '">Journals</a></li>';
    
    	li_container.appendChild( new_ul );
        
        var ul_my_fa_notes = $( "ul.dropdown a:textEquals('Notes')").get( 0 );
        var ul_my_fa = ul_my_fa_notes.parentNode;
        ul_my_fa = ul_my_fa.parentNode;
        
        ul_my_fa_notes.parentNode.removeChild( ul_my_fa_notes );
        
        ul_my_fa.innerHTML = ul_my_fa.innerHTML.replace(/Journals/,"Edit Journals");
        
        console.log("Add Last Searched if there are some");
        
        var new_li_searched = false;
        var list_searches = GM_getValue( "searches", null );
        if ( list_searches ) {
            
            new_li_searched = document.createElement("li");
            
            var li_string = '<a href="#">▼ Last Searched</a><ul>'
            
			var array_search = list_searches.split('\n');
            var s;
            for (s=0; s<array_search.length; s++) {
                
                li_string = li_string + '<li><a href="http://www.furaffinity.net/search/' + encodeURIComponent( array_search[s] ) + '?perpage=24&order-by=date">' + array_search[s] +'</a></li>'
            }
            
            li_string = li_string + '<li><hr></li><li><a class="clear_search_gm" href="javascript:void();" >Clear List</a></li></ul>';
            
            new_li_searched.innerHTML = li_string;
            
        }
              
        var parent_ul_my_fa = ul_my_fa.parentNode;
        
        var ul_a = parent_ul_my_fa.childNodes[0];
        ul_a.className = "my_fa";
        
        var new_li_hr = document.createElement("li");
        new_li_hr.innerHTML = '<hr>';
        
        var new_li_hr_2 = document.createElement("li");
        new_li_hr_2.innerHTML = '<hr>';
        
        var new_li_hr_3 = document.createElement("li");
       	new_li_hr_3.innerHTML = '<hr>';
        
        var new_li_message = document.createElement("li");
        new_li_message.innerHTML = '<a href="http://www.furaffinity.net/controls/messages/">Message Center</a>';
        
        var new_li_notes = document.createElement("li");
        new_li_notes.innerHTML = '<a href="http://www.furaffinity.net/msg/pms/">Notes</a>';
        
        var left_menu = $("div.side_menu ul").get( 0 );
        //var left_menu = $("ul.main_dropdown_menu > li > ul").get( 0 );
        left_menu.appendChild( new_li_hr );
        left_menu.appendChild( li_container );
        left_menu.appendChild( parent_ul_my_fa );
        left_menu.appendChild( new_li_hr_2 );
        left_menu.appendChild( new_li_message );
        left_menu.appendChild( new_li_notes );
        left_menu.appendChild( new_li_hr_3 );
        
        if( new_li_searched ) {
            
            //left_menu.appendChild( new_li_searched );
            
            //var clear_button = $( "a.clear_search_gm" ).get(0);
            //clear_button.onclick = clear_last_searches
            
            //var new_li_hr_3 = document.createElement("li");
        	//new_li_hr_3.innerHTML = '<hr>';
            
            //left_menu.appendChild( new_li_hr_3 );
            
        }
        
        var right_menu = $("ul.dropdown.dropdown-horizontal > li.noblock");
        if ( right_menu.length > 0 ) {
        	var log_out = right_menu[right_menu.length-1];
        	var swf_toggle = right_menu[right_menu.length-2];
            
            swf_toggle.className = swf_toggle.className.replace(/noblock/,"");
            log_out.className = '';
        
        	left_menu.appendChild( swf_toggle );
        	left_menu.appendChild( log_out );
        }
        
        var messages_link = $('ul.dropdown-horizontal li.noblock a[href="/controls/messages/"]').get(0);
        
        var message_parent = messages_link.parentNode;
        
        message_parent.innerHTML = message_parent.innerHTML.slice(2,-2);
        
        message_parent.className = "li_to_remove";
        
        var new_li = document.createElement("li");
        
        new_li.innerHTML = '<a class="link_to_userpage" href="' + user_name + '">' + home_icon + '</a>';
        
        message_parent.parentNode.insertBefore( new_li, message_parent );
        
        var new_li_2 = document.createElement("li");
        
        message_parent.parentNode.insertBefore( new_li_2, message_parent );
        
        new_li_2.innerHTML = '<a class="link_to_userpage" href="#">' + message_icon + '</a>';
        
        new_ul = document.createElement("ul");
        
        new_ul.className = "dropdown-messages";
        
        new_li_2.appendChild( new_ul );
        new_ul.appendChild( message_parent );
        
        new_ul.appendChild( messages_link );
        var new_li = document.createElement("li");
        new_li.innerHTML = '<hr>';
        new_ul.appendChild( new_li );
        
        var message_as = $('ul.dropdown-messages li a');
        for ( i=0; i < message_as.length; i++ ) {
            
            var mess_a = message_as[i];
           	
            if ( mess_a.innerHTML != "" ) {
            
            	var new_li = document.createElement("li");
            
	            new_ul.appendChild( new_li );
    	        new_li.appendChild( mess_a );
            }
            
        }
        
        var new_li = $('li.li_to_remove').get(0);
        new_ul.removeChild( new_li );
        
    } else {
        
        
        
    }
    
    console.log("Navbar Search");
    
    right_menu = $("ul.dropdown.dropdown-horizontal").get( 0 );
        
    var new_li = document.createElement("li");
    
    var search_image = 'src="data:image/png;base64,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"';
    
    new_li.className = "noblock";
    
    new_li.innerHTML = '<form action="http://www.furaffinity.net/search/" method="post" class="search_navbar"><input type="text" id="search_box" name="q" value="" /><input type="image" ' + search_image + ' value="Submit" alt="Submit"></form>';
    
    right_menu.appendChild( new_li );    
    
    return _my_username.toLowerCase();
    
}

function save_last_search() {
    
    var results = $('center.flow');
    
    if (results.length > 0) {
        
   		var input_text = $('input.textbox[name="q"]').get( 0 );
        
        var input_page = $('input.textbox[name="page"]').get( 0 );
        
        if ( input_page.value == "1" ) {
        	var searched_text = input_text.value;
            
            var list_searches = GM_getValue( "searches", null );
            if ( list_searches ) {
                
                var array_search = list_searches.split('\n');
                
                if (array_search.indexOf( searched_text ) == -1) {
                
                	array_search.unshift( searched_text )
                
                	if ( array_search.length > 5 ) {
                    	array_search.pop()
                	}
                
                    list_searches = array_search.join("\n");
                	GM_setValue( "searches", list_searches );
                }
                
            }
            else {
                
                GM_setValue( "searches", searched_text );
                
            }
            
        }
        
    }
    
}

function scroll_down() {
    //scrolls down after the banner
	window.scrollBy(0,140);
}

function getButtonByValue(v) {
    var inputs = $('button');
    var i;
    for ( i=0; i < inputs.length; i++ ) {
        if (inputs[i].value == v) {
            return inputs[i];
        }
    }
    return false;
}

function add_top_navbar( gallery_page ) {
    var nav = null;
    var gallery = null;
    
    var prev = getButtonByValue("Back");
    
    nav = prev.parentNode;
    nav = nav.parentNode;
    nav = nav.parentNode;
    
    gallery = nav.parentNode;
    
    if ( gallery_page == "none" ) {
        
        nav.childNodes[1].setAttribute('colspan','2');
        
        nav = nav.parentNode;
        nav = nav.parentNode;
        nav = nav.parentNode;
        nav = nav.parentNode;
        
        gallery = gallery.parentNode;
        gallery = gallery.parentNode;
        gallery = gallery.parentNode;
        gallery = gallery.parentNode;
        gallery = gallery.childNodes[1];
        
    } else {
        
        gallery = gallery.childNodes[1];
    }
    
    nav.className = "alt1";
    
    nav = nav.cloneNode(true);
    
    if ( gallery_page == "none" ) {
        
        var tr = document.createElement("tr");
        tr.className = "alt1";
        tr.innerHTML = '<td colspan="3"><hr class="bbcode bbcode_hr"></td>'
        gallery.parentNode.insertBefore(tr, gallery);
        
    }
    
    gallery.parentNode.insertBefore(nav, gallery);
    
}

function new_block(title, content, class_name) {
    
    var cell_padding = "";
    if(!class_name) {
        class_name = "";
        cell_padding = "3";
    } else {
        cell_padding = "10";
    }
    
	return '<table cellpadding="' + cell_padding + '" cellspacing="0" border="0" width="99%" class="maintable">\n<tr>\n<td align="center" class="cat_header">\n<b>' + title + '</b>\n</td>\n</tr>\n<tr>\n<td class="alt1 user-info newBlock rounded_corners ' + class_name + '" align="left">' + content + '</td>\n</tr>\n</table>';
}

function new_block_wide(title, content) {
       
	return '<table cellpadding="3" cellspacing="0" border="0" width="100%" class="maintable">\n<tr>\n<td align="center" class="cat_header">\n<b>' + title + '</b>\n</td>\n</tr>\n<tr>\n<td class="alt1 user-info newBlock rounded_corners" align="left">' + content + '</td>\n</tr>\n</table>';
}

function new_icon(image, link) {
    
    return '<div class="newIcon"><a href="' + link + '"><img src="' + image + '" align="middle" alt></a></div>';
}

function  new_map(location) {
    
    location = encodeURIComponent( location );
    
    return '<div class="newMap"><img src="http://maps.googleapis.com/maps/api/staticmap?center=' + location + '&zoom=3&size=500x250&maptype=roadmap&markers=color:red%7Ccolor:red%7C' + location + '&sensor=false" alt="' + location + '"></div>' ;
}

function new_title_block( title ) {
    return '<table cellpadding="3" cellspacing="0" border="0" width="99%" class="maintable">\n<tr>\n<td class="cat_header" align="center"><b>' + title +'</b></td>\n</tr>\n</table>\n<br/>';
}

function new_br() {
    return document.createElement("br");
}

function new_element( html ) {
    var span = document.createElement("span");
    span.innerHTML = html;
    return span;
}

function new_anchor( name ) {
    
    var a = document.createElement("a");
    a.setAttribute("name",name);
    
    return a
    
}

function add_popup_class( element ) {
    
    var child_list = element.childNodes[1];
    child_list = child_list.childNodes;
	child_list = child_list[child_list.length - 2];
    child_list = child_list.childNodes[1];
   	var last_child = child_list.childNodes[0];
    last_child.className = "popupLink";
}

function add_popups( element ) {
    var popups = $(".popupLink");
    for(var i=0;i<popups.length;i++) {
  		popups[i].onclick=openPopup;
 	}
}

function openPopup() {
	var url = this.href;
	popupWindow = window.open(url,'popUpWindow','height=600,width=250,left=200,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes');
	return false;
}

function init() {
    
    //background:
    
    var back = "background-image: url(data:image/jpeg;base64,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PiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0iNTcxQzM2RTM4RDRDRUE4NTdFMEM5NkE3ODk0RkMwNjYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDAyNjFDRUNCQjQ3RTMxMThBQTJGNERGMDczQUZENjgiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iNTcxQzM2RTM4RDRDRUE4NTdFMEM5NkE3ODk0RkMwNjYiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wOkNyZWF0ZURhdGU9IjIwMTMtMTEtMDdUMTU6NDc6MzkrMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDEzLTExLTA3VDE1OjUxOjE4KzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDEzLTExLTA3VDE1OjUxOjE4KzAxOjAwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6RDAyNjFDRUNCQjQ3RTMxMThBQTJGNERGMDczQUZENjgiIHN0RXZ0OndoZW49IjIwMTMtMTEtMDdUMTU6NTE6MTgrMDE6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+4AIUFkb2JlAGRAAAAAAQMAEAMCAwYAAAAAAAAAAAAAAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAgICAgICAgICAgMDAwMDAwMDAwMBAQEBAQEBAQEBAQICAQICAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA//CABEIAQABAAMBEQACEQEDEQH/xADPAAEBAQEBAQEAAAAAAAAAAAADAgQBAAUKAQEBAQEBAAAAAAAAAAAAAAAAAQIDBBAAAwAABAUEAwACAwEBAAAAAQIDERITBAAQICIUMCFBQkAxIzIFUEMVJDMRAAEDAgMEBQULBwoGAQQDAAMCBBQSEwABIzMkNBURIkNTBWODRFQ18CExMnOTs2R0lCXCo9PjhEVVQUJSYpKiw/NllVFhcYFydYKhsqS0xNS1EgAABQUBAAIDAQAAAAAAAAAgMAExYQAQQBEhUPCBQVFi8f/aAAwDAQECEQMRAAAA/MZy8QtWxfO96BNIQgDTs508vi8q1CIVOYuhcl0LFXcE8WJkWpF2mHdZznbqZlySUZRDGJRFMfJILYRgSUR1Zzzncr0ksznRFVfMwlHlMYk8ZxL09OfJOWyaA0RRDa7dOuecmTSuCkhCDSGZ2nZ6eJPHsj0C9EKnLSpihJ3FLZJMt3tYJZNZhatnhwQ7h3aSzogOLG6TLZdE080TN0Uasub0UxK+DOjgnCxbrkyLT88h0KdJrkZjWTke+miMrnYg7RM+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);";
    
    
    // adds new css styles

    var style = "";
    
    var colour_navbar = "rgba(32, 34, 36, 0.9)";
       
    var colour_1 = "rgb(106, 114, 131)";
    var colour_2 = "rgba(46, 59, 65, 0.8)";
    
    var text_colour = "rgb(255, 255, 255)";
    var colour_grey = "rgb(175, 175, 175)";
    
    // FA Extended Style
    
    style += 'body{\
					padding: 0px;\
					margin: 0px;\
					font-size: 7.5pt;\
					font-family: Verdana, sans-serif;\
					background-color: #2e3b41;\
					color: ' + text_colour + ';' + 
                    back + 
                   	'background-repeat: repeat;\
					background-attachment:fixed;}\
			body > div{\
					background-color: rgba(106,114,131,0.0);}\
			div.bumpDown{\
					height:65px;}\
			TABLE, TR, TD, TH {\
					font-family: Verdana, sans-serif;\
					font-size: 7.5pt;}\
			b {\
					font-size: 8pt;\
					font-weight: bold;}\
			div.tab b {\
					font-size: 7.5pt;\
					font-weight: bold;}\
			font > b {\
					font-size: 10.5pt;}\
			div.block-banners.clearfix{\
					display:none;}\
			td.alt1.user-info td.alt1.user-info > span{\
					font-weight: bold;}\
			.maintable, .submissions, td.preview, td.desc, td.info{\
					background-color: rgba(106,114,131,0.0);}\
			.innertable{\
					background-color: rgba(46,59,65,0.0); }\
			.block-menu-top.fixedInPlace{\
					opacity: 1.0;\
					box-shadow:2px 2px 2px #2e2e2e;\
					-moz-box-shadow:2px 2px 2px #2a2a2a;\
					-webkit-box-shadow:2px 2px 2px #2a2a2a;}\
			.block-menu-top.fixedInPlace:hover{\
					opacity: 1.0 !important;}\
			td.cat .maintable{\
					background-color: rgba(106,114,131,0.0); }\
			.cat{\
					background-color: rgba(106,114,131,0.0);\
					border:0px; }\
			#sessions-form .container, #activity-periods-list .container, .personal-messages .container,\
			.personal-messages table.maintable_newpm td.alt1 form table.container tr:not(.hover) td.alt1, table#admin_notice_do_not_adblock {\
					background-color: rgba(106,114,131,0.0);}\
			.cat_header, td.alt1_ext table.maintable td.cat:first-child, .maintable_session td.cat{\
					border:2px;}\
			.cat_header, td.alt1_ext table.maintable td.cat:first-child,\
            .maintable_session td.cat, .tab a, #frontpage .cat{\
					border-style:solid;\
					border-width: 2px;\
					border-color: rgba(35, 45, 49, 0.8);\
					background-color: ' + colour_1 + ';\
					color: ' + text_colour + ';}\
			.cat_header{\
					font-size:8pt;\
					padding: 4px;}\
			.header{\
					color: white;}\
			.block-menu-top td{\
					background-color: ' + colour_navbar + ';}\
			div#news{\
					margin-top:16px;}\
			div.alt1, .personal-messages .container, .journal_block td.alt1, .about_block td.alt1, .shouts_block td.alt2{\
					background-color: rgba(106,114,131,0.0);\
					color: ' + text_colour + ';}\
			td.alt1, tr.alt1, td.cat table.maintable.alt1 > tbody > tr > td, table.container-comment, \
			div#stats-submission td.cat > table.maintable[cellspacing="1"] > tbody > tr >td, form.viewmessage > table, \
            td.alt2, div#news, .lead, .tab u, div#controls-journal table.maintable_newpm > tbody > tr > td.alt1_ext, table#admin_notice_do_not_adblock td, \
			table.maintable_newpm > tbody > tr > td.cat {\
					background-color: ' + colour_2 + ';\
					color: ' + text_colour + ';}\
			.alt1, .cat{\
					color: ' + text_colour + ';}\
			div#description_popup {\
					padding:2px;\
					background-color: rgba(46, 59, 65, 0.95);\
					border-radius:6px;\
					color: ' + text_colour + ';}\
			center.flow.with-titles{\
					vertical-align:middle;}\
			td.shouts_block table.shoutBlock{\
					border-collapse: separate;\
					border-width: 2px;\
					border-style:solid;\
					border-color: '+ colour_1 +';\
					border-radius:1px;}\
			table.container-comment, .maintable_newpm, .table_submission, .table_top_spacing, .table_top_more_spacing, \
			table.maintable_user_content > tbody > tr > td > table.maintable, table.maintable_user_content > tbody > tr > td > div > table.maintable,\
			table.maintable_user_content > tbody > tr > td > span > table.maintable, .maintable_session, div#news, \
			.table_submission > tbody > tr > td > table.maintable, td.alt1_ext > table.maintable, form.viewmessage > table,\
			div#stats-submission td.cat > table.maintable[cellspacing="1"], table#admin_notice_do_not_adblock{\
					border-collapse: separate;\
					border-width: 5px;\
					border-style:solid;\
					border-color: '+ colour_1 +';\
					-moz-box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.6);\
					-webkit-box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.6);\
					box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.6);\
					border-radius:1px;}\
			a#fa_header p img{\
					border-radius:5px;\
					-moz-box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.6);\
					-webkit-box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.6);\
					box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.6);}\
			td.journal_block > table.maintable, td.about_block > table.maintable, td.about_block > span > table.maintable,{\
					border-width: 0px;\
					border-radius:0px;}\
			td.journal_block > table.maintable td.cat_header,\
			td.about_block > table.maintable td.cat_header, td.about_block > span > table.maintable td.cat_header{\
					border-width: 0px;\
					text-align: left !important;\
					border-radius:3px;}\
			div#stats-submission td.cat > table.maintable[cellspacing="1"]{\
					margin-top:10px;}\
			.container-comment td.cat, .container-comment th, .container-comment .lead, td.alt1.addpad td.alt1.addpad{\
					background-color: rgba(106,114,131,0.0);}\
			.container-comment div.menu b, td.lead.addpad b{\
					font-size:10pt;}\
			div.tab u, div.tab b a{\
					border-radius:3px;}\
			td.alt1.ldot{\
					background-color: rgba(106,114,131,0.0);\
					color: ' + text_colour + ';}\
			td.alt2 .lead, td.alt2 .alt1, table.bpix.tpix.rpix.lpix[width="1%"] td.alt1{\
					background-color: rgba(106,114,131,0.0);}\
			.lead{\
					border-top: 0px;\
					border-bottom:0px;}\
			form.viewmessage > table{\
					margin-top:5px;\
					margin-bottom:6px;}\
			.maintable_user_content{\
					margin-top:4px}\
			.table_top_spacing{\
					margin-top:4px;}\
			.table_top_more_spacing{\
					margin-top:8px;}\
			div#browse table.maintable.table_top_spacing td.cat > form > font{\
					line-height:200%;\
					margin-top:2px;}\
			div.tab{\
					width:100%;\
					margin-bottom:4px;\
					margin-left:15px;}\
			table.table_div_tab{\
					width:100%;}\
			.tab u{\
					font-weight: bold;\
					border-bottom:1px solid #6A7283;\
					padding:5px 6px 4px 6px;}\
			.tab a{\
					padding:5px 6px 4px 6px;}\
			ul.dropdown li.noblock {\
					padding-right: 5px;\
					padding-left: 5px;}\
			ul.dropdown.main_dropdown_menu li.noblock{\
					padding-right: 0px;\
					padding-left: 0px;}\
			ul.dropdown li.noblock a:first-child{\
					padding-left: 0px;}\
			ul.dropdown.dropdown_left ul ul{\
					left: -99%;}\
			ul.dropdown.dropdown_left ul{\
					left: -130px;}\
			ul.main_dropdown_menu > li > ul{\
					top:5px;}\
			div.side_menu > ul{\
					background-color: rgba(32, 34, 36, 0.9);}\
			div.side_menu > ul > li a:hover{\
					background-color:#2e2e2e;}\
			ul.dropdown ul{\
					opacity:1.0;\
					background-color: rgba(51, 51, 51, 0.95);\
					border: 1px dashed rgba(207, 207, 207, 0.2);}\
			div.side_menu{\
					z-index:1001;\
					display: none;\
					position:fixed;\
 					top:45px;\
 					right:0;\
					width:160px;\
                    height:100%;}\
			div.side_menu > ul{\
					height:100%;\
					position:absolute;}\
			div.side_menu > ul > li{\
					width:160px;}\
			div.side_menu ul.dropdown.dropdown_left ul{\
					top:8px;\
					left:-190px;}\
			ul.dropdown ul li.active a:hover{\
					background-color:rgba(32, 34, 36, 0.5);}\
			ul.dropdown.main_dropdown_menu li.noblock a, ul.dropdown ul a{\
					padding: 4px 5px 4px 14px;\
                	width:171px;}\
			ul.dropdown li.noblock a, ul.dropdown li.noblock form{\
            		display:inline-block;\
					padding:7px 0;}\
			ul.dropdown li.noblock input[type="text"]{\
					width:160px;}\
			ul.dropdown li.noblock form input{\
					vertical-align:bottom;\
					padding:0px;\
					display:inline-block;\
					margin:0px;\
					font-size:14pt;\
					border:0px;\
                    height:28px;}\
			ul.dropdown-horizontal li.noblock a {\
					padding-top:14px;}\
			td.header_bkg form.search_navbar input[type="image"] {\
					vertical-align:bottom;\
					display:inline-block;\
					margin:0px;\
					margin-left:-2px;}\
			td.header_bkg img{\
					margin:1px;}\
			.personal-messages tr.hover td, div#messagecenter-other ul.message-stream li.hover,\
			div#messagecenter-other ul.message-stream table:hover, #sessions-form table.container tr.hover td, #activity-periods-list table.container tr.hover td,\
			.personal-messages tr.hover td{\
					cursor:default;\
					background-color:rgba(49, 64, 68, 0.7);}\
			.personal-messages tr.checked td, div#messagecenter-other ul.message-stream li.checked,\
			div#messagecenter-other ul.message-stream table.checked, center.flow.messagecenter b.checked,\
			#sessions-form table.container tr.checked td, #activity-periods-list table.container tr.checked td, .personal-messages tr.checked td{\
					background-color:rgba(65, 80, 84, 0.7) !important;}\
			div#messagecenter-other ul.message-stream table.new_journal_entry:hover{\
					background-color:rgba(56, 50, 50, 0.0);}\
			div#submission .prev, div#submission .next{\
					padding:3px;}\
			.button, button, input[type="button"], input[type="submit"], input[type="reset"], a.oldest, a.newest, a.more {\
					cursor:pointer;\
					margin:1px;\
					padding:3px;\
					padding-left:8px;\
					padding-right:8px;\
					font-size:8pt;\
					border:1px solid #cccacb;\
					background-color: rgba(255, 255, 255, 0.8);\
					color: rgb(39, 41, 44);\
					-moz-border-radius: 5px;\
					border-radius: 5px;}\
			div#messagecenter-submissions div.navigation a, div#messagecenter-submissions div.navigation .newest,\
			div#messagecenter-submissions div.navigation .oldest, div#messagecenter-submissions div.actions input{\
					margin:1px;\
					padding:3px;\
					background-color: rgba(255, 255, 255, 0.8);\
					color: rgb(39, 41, 44);}\
			div#messagecenter-other ul.message-stream li.section-controls:first-child{\
					border-bottom: 0px;}\
			a#fa_header{\
					cursor:default;\
					width:100%;\
					height:100%;\
					background:none;}\
			.block-banners{\
					border-bottom:0px solid #6A7283;\
					height:150px;\
					width:100%;\
					margin-bottom: 25px;}\
			.block-banners p{\
					margin: 47px;}\
			table.story_submission td{\
					font-size: 9pt;\
					line-height: 150%;\
					padding:15px;\
					padding-right:30px;\
					padding-left:30px;}\
			table.new_journal_entry{\
					display:inline-table;}\
			table.new_journal_entry > tbody > tr > td:first-child {\
					width:auto;\
                    min-width:140px;}\
			li.new_journal_entry{\
					border: 0px;\
					border-bottom: 1px;\
					border-style: dotted;}\
			div#messagecenter-other ul.message-stream li.new_journal_entry input{\
					bottom:19px;}\
			div#messagecenter-other ul.message-stream li.new_journal_entry {\
					padding:4px 0 4px 20px;\
					margin-top:2px;\
					margin-bottom:2px;}\
			div.bigger_text_size{\
					font-size: 9pt;}\
			table.story_submission tbody{\
					background-color: rgba(98, 118, 128, 0.2);\
					color: ' + text_colour + ';\
                    font-size: 9pt;}\
			div.bbcode_quote{\
					border:1px dashed ' + colour_1 + ';}\
			A:VISITED, .alt1 A:VISITED, .alt2 A:VISITED, div#messagecenter-other a:visited{\
					color:rgb(173, 173, 255);}\
			A:LINK, .alt1 A:LINK, .alt2 A:LINK, div#messagecenter-other a:link{\
					color:rgb(173, 173, 255); }\
			ul.dropdown li A:LINK, ul.dropdown li A:VISITED{\
					color:#cfcfcf; }\
			.tab a{\
					color: ' + text_colour + ';\
        			border-top: 1px solid ' + colour_1 + ';\
    				border-left: 1px solid ' + colour_1 + ';\
    				border-right: 1px solid ' + colour_1 + ';}\
			.cat_header a:LINK, a.iconusername:LINK div.newIconDiv, td.alt1_ext table.maintable td.cat:first-child a:LINK,\
            .tab a:LINK {\
					color:rgb(255, 255, 255);}\
			.cat_header a:VISITED, a.iconusername:VISITED div.newIconDiv, td.alt1_ext table.maintable td.cat:first-child a:VISITED,\
			.tab a:VISITED {\
					color: rgb(255, 255, 255);}\
			.tab a:HOVER, a:HOVER{ \
					text-decoration: none !important;\
					color: #FFFFFF !important;\
					text-shadow: 2px 2px 7px #000000;}\
			.action-link{\
					color: ' + text_colour + '; }\
			#controls-journal #journals-list div span a.delete{\
					font-weight: bold;\
					color: rgb(255, 175, 175); }\
			#controls-journal #journals-list div span a.edit{\
					font-weight: bold;\
					color: rgb(173, 173, 255); }\
			div#keywords a, div#keywords a:link, div#keywords a:hover, div#keywords a:visited{\
            		font-weight: bold;}\
			.popup_date, div#messagecenter-other #messages-watches ul.message-stream div.info small span,\
			center.flow.userpage-first-submission span.popup_date, center.flow.userpage-first-favorite span.popup_date{\
					font-style: italic;\
					font-weight: bold;\
					color: ' + colour_grey + '; }\
			.footer .ads{\
					margin-left:0px;}\
			div.ads div.in{\
					width:auto;}\
			div.ads div.ad{\
					margin:0 10px;}\
			.ldot{\
					border-left:1px dotted rgb(175, 175, 175);}\
			.bdot{\
					border-bottom:1px dotted rgb(175, 175, 175);}\
			.tdot{\
					border-top:1px dotted rgb(175, 175, 175);}\
			form table.maintable_newpm td.alt1.addpad > table.maintable > tbody > tr > td.alt2{\
					border-top:1px dotted rgb(175, 175, 175);}\
			form > table table.maintable_newpm > tbody > tr > td.alt1.addpad > table.maintable{\
					border-bottom:1px dotted rgb(175, 175, 175);}\
			font.greyed_font, td.alt1.ldot{\
					color:' + colour_grey + ';}\
			td.user-contacts div.websites, td.user-contacts div.artsites, td.user-contacts div.instant-messanging, td.user-contacts div.gaming{\
    				float: left;\
    				width: 99%;\
					min-width:300px;\
    				margin: 2px 5px 2px 0;}\
			td.user-contacts div.instant-messanging td, td.user-contacts div.artsites td, td.user-contacts div.websites td, td.user-contacts div.gaming td,\
            td.user-contacts div.instant-messanging th, td.user-contacts div.artsites th, td.user-contacts div.websites th, td.user-contacts div.gaming th{\
					padding:2px;\
					vertical-align:middle;\
					display:table-cell;}\
			td.user-contacts div th img, td.user-contacts div th strong {\
            		vertical-align:middle;}\
			td.user-contacts div.instant-messanging th, td.user-contacts div.artsites th, td.user-contacts div.websites th, td.user-contacts div.gaming th {\
					width:95px;}\
			div#news{\
					width:85%;}\
			table#admin_notice_do_not_adblock{\
					width:70%;}\
			a.link_to_userpage {\
					margin-top:2px;}\
			a.link_to_browse {\
					margin-left:5px;}\
			td.header_bkg:first-child{\
					width:280px;\
					padding:3px;}\
			td.header_bkg{\
					width:auto;}\
			td.header_bkg.header_compact{\
					width:60px !important;}\
			table.table_submission td.alt1_ext object{\
					visibility: visible;\
					position: relative;\
					z-index: 5;}';
    
    //style += 'tbody > tr:first-child > td.cat_header > b{text-shadow: 0 0 10px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 0, 0, 0.3),0 0 10px rgba(0, 0, 0, 0.3),0 0 10px rgba(0, 0, 0, 0.3),0 0 10px rgba(0, 0, 0, 0.3);}';
    
    // icons and other stuff
    
    style += ".newBlock{\
					max-width:500px;\
					overflow:auto;}\
			.newBlockHidden{\
					max-width:500px;\
					overflow:hidden;}\
			td.alt1.user-info a.iconusername div.newIconDiv{\
					margin-top:6px;\
					margin-bottom:6px;}\
			a.iconusername_height div{\
					padding:10px;}\
			.newIconDiv{\
					text-align:start;\
					margin:2px;\
					padding:2px;\
					vertical-align:middle;\
					display:inline-block;\
					background-color: #383838;\
					box-shadow:2px 2px 2px #2e2e2e;\
					-moz-box-shadow:2px 2px 2px #2a2a2a;\
					-webkit-box-shadow:2px 2px 2px #2a2a2a;}\
			div.newIconDiv div{\
					display:inline-block;\
					vertical-align:middle;}\
			div.newIconDiv img{\
					border-radius:3px;\
					vertical-align:middle;\
					max-width:50px;\
					max-height:50px;}\
			.newIcon{\
					border:1px solid #333;\
					display:inline-block;\
					background-color: #383838;\
					box-shadow:2px 2px 2px #2e2e2e;\
					-moz-box-shadow:2px 2px 2px #2a2a2a;\
					-webkit-box-shadow:2px 2px 2px #2a2a2a;}\
			.newIcon img{\
					max-width: 110px;\
					max-height: 110px;\
					border-radius:3px;}\
			.newMap{\
					border:1px solid #333;\
					display:inline-block;\
					background-color: #383838;\
					box-shadow:2px 2px 2px #2e2e2e;\
					-moz-box-shadow:2px 2px 2px #2a2a2a;\
					-webkit-box-shadow:2px 2px 2px #2a2a2a;}\
			.newMap img{\
					border-radius:5px;}\
			.newAvatar{\
					border-radius:7px;\
					border:1px solid #333;\
					display:inline-block;\
					max-width: 150px;\
					max-height: 150px;\
					background-color: #2E3B41;\
					box-shadow:2px 2px 2px #2a2a2a;\
					-moz-box-shadow:2px 2px 2px #2a2a2a;\
					-webkit-box-shadow:2px 2px 2px #2a2a2a;}\
			.newAvatar img{\
					border-radius:7px;}\
			ul.avatarUl{\
					width:100px;}\
			ul.avatarUl li{\
					width:100px;\
					text-align:left;}\
			ul.avatarUl li a{\
					width:100px;}\
			ul.dropdown ul.avatarUl a, ul.dropdown ul li {\
					width: auto;}\
			ul.dropdown ul.avatarUl a:hover {\
					width: auto;}\
			table.shoutBlock {\
					min-height:140px;}";
    
    GM_addStyle( style );
    
}

function better_icons() {
	// new look for the icons
    
    var list = $( "a.iconusername" );
    var i;
    
    if( list ) {
    	for (i=0;i<list.length;i++) {
    		var icon = list.get(i);
    		icon.innerHTML = '<div class="newIconDiv">' + icon.innerHTML + '</div>';
        }
    }
}

function better_avatars() {
        
    var list = $("td.alt1.bpix.tpix.lpix.rpix.addpad");
    
    var i;
    var av_td;
    var av_a;
    
    
    if( list ) {
    	for(i=0;i<list.length;i++) {
	        av_td = list[i];
    	    av_a = av_td.childNodes[1];
        	av_a.className = "newAvatar";
            
            add_popup_to_avatar( av_a );
    	}
    }
    
    av_td = $("td.addpad.alt1");
    
    if (av_td) {
    	av_td = av_td.get(0);
    	av_a = av_td.childNodes[0];
    	av_a.className = "newAvatar";
    }
}

function add_popup_to_avatar( a_element ) {
    
    a_element.setAttribute("style","padding:0px;");
        
    var user_name = a_element.href;
    
    var gallery_link = user_name.replace(/user/,"gallery");
	//var scraps_link = user_name.replace(/user/,"scraps");
    //var favorites_link = user_name.replace(/user/,"favorites");
    var journals_link = user_name.replace(/user/,"journals");
    var sendnote_link = user_name.replace(/user/,"newpm");
    
    var outer_ul = document.createElement("ul");
    var outer_li = document.createElement("li");
    
    outer_ul.className = "dropdown";
    a_element.parentNode.insertBefore( outer_ul, a_element );
    outer_ul.appendChild( outer_li );
    outer_li.appendChild( a_element );
    
    var new_ul = document.createElement("ul");
    new_ul.className = "avatarUl";
    new_ul.setAttribute("style","width:102px;left:100%;top:0px;");
    
    outer_li.appendChild( new_ul );
    new_ul.innerHTML =  '<li><a href="' + user_name + '">User Page</a></li>';
    new_ul.innerHTML += '<li><a href="' + gallery_link + '">Gallery</a></li>';
    new_ul.innerHTML += '<li><a href="' + journals_link + '">Journals</a></li>';
    new_ul.innerHTML += '<li><hr></li>';
    new_ul.innerHTML += '<li><a href="' + sendnote_link + '">Send Note</a></li>';

}

function fix_overflow() {
    var div = $( "div.no_overflow.alt1" );
    
    if (div) {
    	div.addClass("newBlockHidden");
    }
}

function three_lines() {
    // threelines
    
    var list = $( "center.twolines" );
    for ( var i=0; i<list.length; i++) {
        list[i].setAttribute("style","max-height:500px;");
    }
}

function one_line() {
    // threelines
    
    var list = $( "center.twolines" );
    for ( var i=0; i<list.length; i++) {
        list[i].setAttribute("style","max-height:125px;");
    }
}

function fix_bottom_ads() {
    
    var ads = $( "div.ads div.in" ).get( 1 );
    
    ads.setAttribute("style","width:auto;height:auto;");
    ads.parentNode.setAttribute("style","margin-left:0px;");
    
}

function add_custom_background( current_user ) {
    
    var background_location = GM_getValue( "FAex_back_" + current_user, "none" );
    
    if ( background_location != "none" ) {
        
        var background_div = document.createElement("div");
        background_div.className = "custom_background_div";
        
        GM_addStyle( "div.custom_background_div{position:fixed; top:0px; left:0px; width:100%; height:100%; z-index:-10; background-image: url(" + background_location + "); background-position:center; }" );
        
        var body = $("body").get( 0 );
        body.appendChild( background_div );
        
    }
    
}

function save_custom_background( background_location, current_user ) {
    
    GM_setValue( "FAex_back_" + current_user, background_location );
    
}

function new_layout( user_name, my_userpage, current_user ) {
	// new layout
    
    var compact_mode = false;
    if ( $(window).width() < $(document).width() ) {
        compact_mode = true;
    }
    
    var array_index = 0;
    
    var td_element = $( "table.content.maintable td" );
    
    td_element = td_element[3];
    console.warn("I got the td");
    
    if ( td_element.getAttribute("align") == null ) {
        td_element = $( "table.content.maintable td" ).get( 4 );
    }
    
    td_element.setAttribute("colspan",1);
    td_element.setAttribute("align","left");
    var table_old = $( "table.content.maintable table" ).get( 3 );
    console.warn("I got the table");
    
    var table_old_container = table_old.parentNode;
    
    var nsfw = $("#sfw-toggle");
    if ( nsfw.length > 0 ) {
        nsfw = $("li.noblock.sfw-toggle.active");
        if ( nsfw.length > 0 ) {
            nsfw = false;
        } else {
        	nsfw = true;
        }
    } else {
        nsfw = false;
    }
    
    console.warn( "NSFW status = " + nsfw );
    
    var featured = $( "#featured-submission" );
    var featured_exist = true;
    var watched_by;
    var is_watching;
    
    if ( featured && featured.length > 0 ) {
        
    	watched_by = $( "table.content.maintable table.maintable" ).get( 6 );
    	is_watching = $( "table.content.maintable table.maintable" ).get( 7 );
        console.warn("I got the watched/watching");
        
    } else {
        
        featured_exist = false;
    	watched_by = $( "table.content.maintable table.maintable" ).get( 5 );
    	is_watching = $( "table.content.maintable table.maintable" ).get( 6 );
        console.warn("I got the watched/watching");
        
    }
    
    var watch_div = document.createElement("div");
    
    add_popup_class( is_watching );
    add_popup_class( watched_by );
    
    watch_div.appendChild(is_watching);
    watch_div.innerHTML+="</br>";
    watch_div.appendChild(watched_by);
    
    var table_journal;
    if ( featured_exist ) {
    	table_journal = $( "table.content.maintable table.maintable" ).get( 6 );
    } else {
        table_journal = $( "table.content.maintable table.maintable" ).get( 5 );
    }
    console.warn("I got the journal");
    
    var journal_entry = false;
    
    if ( table_journal.innerHTML.indexOf("Posted") > 0 ) {
        journal_entry = true;
        table_journal.setAttribute("width","100%");
    }
    
    var about_user_title = new_block( "About " + user_name, "", "about_block" );
    var journal_title = new_block( "Journal", "", "journal_block" );
    var shouts_title_block = new_block( "Shouts", "", "shouts_block" );
    
    var user_profile_data = $( "table.content.maintable td.ldot" ).get( 0 );
    console.warn("I got the user profile data");
    
    var data_start = user_profile_data.innerHTML.indexOf("<b>Artist Profile:");
    
    var user_profile = user_profile_data.innerHTML.slice(data_start);
    
    user_profile_data.innerHTML = user_profile_data.innerHTML.slice(0,data_start);
    
    data_start = user_profile.indexOf("</b>");
    user_profile = user_profile.slice( data_start+4 );
    user_profile = user_profile.replace(/[<]br[^>]*[>]/,"");
    
    //custom background
    
    var start_map = user_profile.indexOf(":background");
    if ( start_map >= 0 ) {
        var user_profile_before = user_profile.slice(0,start_map);
        var user_profile_after = user_profile.slice(start_map+1);
        
        var end_block = user_profile_after.indexOf("::");
        var end_anchor = user_profile_after.indexOf("</a>");
        
        var background_location = user_profile_after.slice(19,end_block);
        
        console.log( "Custom background at: " + background_location );
        
        save_custom_background( background_location, current_user );
        
        user_profile = user_profile_before + user_profile_after.slice(end_anchor+4);
        
    }
    
    //custom maps
    
    var start_map = user_profile.indexOf(":map[");
    while ( start_map >= 0 ) {
        var user_profile_before = user_profile.slice(0,start_map);
        var user_profile_after = user_profile.slice(start_map+1);
        
        var end_block = user_profile_after.indexOf("]::");
        
        var map_location = user_profile_after.slice(4,end_block);
        
        user_profile = user_profile_before + new_map(map_location) + user_profile_after.slice(end_block+3);
        
        start_map = user_profile.indexOf(":map[");
        
    }
    
    //custom icons
    
    var start_icon = user_profile.indexOf(":image[");
    while ( start_icon >= 0 ) {
        
        var user_profile_before = user_profile.slice(0,start_icon);
        var user_profile_after = user_profile.slice(start_icon+1);
        
        var end_block = user_profile_after.indexOf("::");
        
        var end_block_title = user_profile_after.indexOf("]"); // ]
        
        var icon_image = user_profile_after.slice(6,end_block_title); //6
        
        var aux_end;
        
        aux_end = icon_image.indexOf("<a href=");
        if (aux_end >= 0) {
            icon_image = icon_image.slice( aux_end+9 );
        }
        
        var icon_link = user_profile_after.slice(end_block_title+1,end_block);
        
        aux_end = user_profile_after.indexOf("</a>");
        if ( aux_end > end_block ) {
            end_block = aux_end;
        }
                
        user_profile = user_profile_before + new_icon(icon_image,icon_link) + user_profile_after.slice(end_block+4);
        
        start_icon = user_profile.indexOf(":icon[");
    }
    
    //custom blocks
    
    var block_array = [];
    var sfw_block = true;
    var start_block = user_profile.indexOf(":block[");
    if ( start_block < 0 ) {
        sfw_block = false;
        start_block = user_profile.indexOf(":nsfw_block[");
    }
    
    while ( start_block >= 0 ) {
        
        var user_profile_before = user_profile.slice(0,start_block);
        var user_profile_after = user_profile.slice(start_block+1);
        
        var end_block = user_profile_after.indexOf("::"); // :
        
        user_profile = user_profile_before + user_profile_after.slice(end_block+2);
        
        user_profile_after = user_profile_after.slice(0,end_block);
        
        var end_block_title = user_profile_after.indexOf("][");
        
        var position_block = "right";
        var user_profile_title;
        if ( end_block_title > 0 ) {
            
            start_block = end_block_title;
            
            if ( sfw_block ) {
            	user_profile_title = user_profile_after.slice(6,end_block_title);
            } else {
                user_profile_title = user_profile_after.slice(11,end_block_title);
            }
            
            user_profile_after = user_profile_after.slice(end_block_title+1);
            
            end_block_title = user_profile_after.indexOf("]");
            
            position_block = user_profile_after.slice(1,end_block_title);
            
            if ( position_block != "left" && position_block != "right" ) {
                position_block = "right";
            }
            
        } else {
            
            end_block_title = user_profile_after.indexOf("]");
            
            if ( sfw_block ) {
            	user_profile_title = user_profile_after.slice(6,end_block_title);
            } else {
                user_profile_title = user_profile_after.slice(11,end_block_title);
            }
        }
        
        var user_profile_block = user_profile_after.slice(end_block_title+1);
        
        user_profile_block = user_profile_block.replace(/[<]br[^>]*[>]/,"");
        
        console.log("Adding block: " + user_profile_title + " at position: " + position_block );
        
        block_array[array_index] = [ user_profile_title, user_profile_block, position_block, sfw_block ];
        
        array_index += 1;
        start_block = user_profile.indexOf(":block[");
        
        sfw_block = true;
        if ( start_block < 0 ) {
        	sfw_block = false;
        	start_block = user_profile.indexOf(":nsfw_block[");
    	}
    }
    
    user_profile = new_block( "User Profile", user_profile );
    
    var statistics_outside = $( "table.content.maintable td.bdot" ).get( 0 );
    statistics_outside = statistics_outside.parentNode;
    statistics_outside = statistics_outside.parentNode;
    
    console.warn("I got the statistics");
    
    var stat_start = statistics_outside.innerHTML.indexOf("</tr>");
    
    var statistics = statistics_outside.innerHTML.slice(stat_start);
    
    var stat_start = statistics.indexOf("<b>");
    var stat_end = statistics.indexOf("</td>");
    
    statistics = statistics.slice(stat_start,stat_end);
    
    statistics = statistics.replace(/<b*>/g,"");
    
    statistics = new_block_wide( "Statistics", statistics );
    
    statistics_outside = statistics_outside.parentNode;
    statistics_outside = statistics_outside.parentNode;
    statistics_outside.parentNode.removeChild(statistics_outside);
   
    
    var profile_id = $( "#profilepic-submission" );
    if ( profile_id && profile_id.length > 0 ) {
        profile_id = profile_id[0];
    	profile_id = profile_id.parentNode;
    	profile_id = profile_id.parentNode;
    	profile_id = profile_id.parentNode;
        
        var profile_html = '<table cellpadding="3" cellspacing="0" border="0" width="99%" class="maintable">' + profile_id.innerHTML + '</table>';
        profile_id.parentNode.removeChild(profile_id);
        profile_id = profile_html;
        
    } else {
        //nothing
    }
    
    var art_block = $( "table.content.maintable center.userpage-first-submission");
    
    if (art_block && art_block.length > 0 ) {
        art_block = art_block.get( 0 );
    } else {
        art_block = $( "table.content.maintable center.userpage-favorites").get( 0 );
    }
    console.warn("I got the submissions and favorites");
    
    art_block = art_block.parentNode;
    art_block = art_block.parentNode;
    art_block = art_block.parentNode;
    art_block = art_block.parentNode;
    art_block = art_block.parentNode;
    
    var user_info = $("table.content.maintable td.user-info").get(0);
    user_info = user_info.parentNode;
    user_info = user_info.parentNode;
    user_info = user_info.parentNode;
        
    var user_info_empty = false;
    var user_info_string = user_info.childNodes[1].childNodes[2].childNodes[1].innerHTML;
    if ( user_info_string.indexOf("a") < 0 && user_info_string.indexOf("e") < 0 ) {
        user_info_empty = true;
    }
    
    var table_right = user_info.parentNode;
    
    var user_contact = $("table.content.maintable td.user-contacts");
    if ( user_contact.length > 0 ) {
        user_contact = user_contact[0];
    	user_contact = user_contact.parentNode;
    	user_contact = user_contact.parentNode;
    	user_contact = user_contact.parentNode;
    } else {
        user_contact = false;
    }
    
    var shouts_title = $("table.content.maintable td.cat b:textEquals('Shouts')");
    if ( shouts_title.length > 0 ) {
        shouts_title = shouts_title[0];
    	shouts_title = shouts_title.parentNode;
        
        shouts_title.className = "cat_header";
        
        shouts_title = shouts_title.parentNode;
        shouts_title = shouts_title.parentNode;
        shouts_title = shouts_title.parentNode;
    } else {
        shouts_title = false;
    }
    
    if ( shouts_title ) {
        $( shouts_title ).nextAll( "table.maintable" ).addClass( "shoutBlock" );
    }
    
    if ( my_userpage > 0 ) {
        var shouts = $(".shoutBlock table.maintable td.lead.addpad b a" );
        for ( array_index=0; array_index<shouts.length; array_index++ ) { 
            var s = shouts[array_index];
            
            var href = s.href;
            href += "#new_shout"
            
            s = s.parentNode;
            s = s.parentNode;
            
            s.innerHTML += '&nbsp;.&nbsp;<a href="' + href + '"> reply </a>';
            
        }
    }
      
    table_old.setAttribute("width","99%");
    
    var new_td;
    if ( compact_mode ) {
        
        new_td = table_old_container;
        
    } else {
        
    	new_td = document.createElement("td");
    	td_element.parentNode.appendChild(new_td);
    	new_td.setAttribute("width","50%");
    	new_td.setAttribute("valign","top");
    	new_td.setAttribute("align","right");
    
    	table_old_container.setAttribute("width","50%");
    
    }
    
    //adds user profile to the right
    new_td.appendChild( new_element( user_profile ) );
    new_td.appendChild( new_br() );
    
    //adds custom blocks
    for( array_index=0; array_index<block_array.length; array_index++ ) {
        var title = block_array[array_index][0];
        var pos = block_array[array_index][2];
        sfw_block = block_array[array_index][3];
        if ( title != "hide" && ( sfw_block || nsfw ) ) {
        	var block = new_block( title, block_array[array_index][1] );
            if ( pos == "right" ) {
                
        		new_td.appendChild( new_element( block ) );
    			new_td.appendChild( new_br() );
                
            } else {
                
                table_old_container.appendChild( new_element( block ) );
                table_old_container.appendChild( new_br() );
                
            }
        }
    }
    
    //adds submissions and favorites blocks
    var art_block_list = art_block.childNodes;
    
    for (array_index=0; array_index<art_block_list.length; array_index++) {
        
        if ( art_block_list[array_index].outerHTML != undefined && art_block_list[array_index].outerHTML != "<br>") {
        	table_old_container.appendChild( art_block_list[array_index] );
            table_old_container.appendChild( new_br() );
        }
    }
    
    //adds journal to the right
    if ( journal_entry ) {
        new_td.appendChild( new_br() );
        
        new_td.appendChild( new_element( journal_title ) );
        
        var journal_block = $( ".journal_block" ).get(0);
        
        journal_block.appendChild( new_br() );
    	journal_block.appendChild(table_journal);
        journal_block.appendChild( new_br() );
    }
    
    new_td.appendChild( new_br() );
    
    new_td.appendChild( new_element( about_user_title ) );
    
    var about_user_block = $( ".about_block" ).get(0);
    
    about_user_block.appendChild( new_br() );
    
    // adds general user informations if not empty
    if ( user_info_empty ) {
        
        user_info.parentNode.removeChild(user_info);
    
    } else {
        
        user_info.setAttribute("width","100%");
    	about_user_block.appendChild( user_info );
    	about_user_block.appendChild( new_br() );
        
    }
       
   	//adds user contact informations
    if ( user_contact ) {
        user_contact.setAttribute("width","100%");
        about_user_block.appendChild( user_contact );
        about_user_block.appendChild( new_br() );
    }
    
    // adds the statistics block
    about_user_block.appendChild( new_element( statistics ) );
    about_user_block.appendChild( new_br() );
    new_td.appendChild( new_br() );
    
    //add shouts
    if ( shouts_title ) {
        
        shouts_title.parentNode.removeChild(shouts_title);
        
        new_td.appendChild( new_br() );
    	new_td.appendChild( new_element(shouts_title_block) );
        
        var user_shouts_block = $( ".shouts_block" ).get(0);
        console.log("I got the block!");
        
        user_shouts_block.appendChild( new_br() );
        
        var shouts = $(".shoutBlock" );
        for (array_index=0; array_index<shouts.length; array_index++) {
            
            if (array_index == shouts.length-1) {
                new_td.appendChild( new_br() );
                new_td.appendChild( new_anchor("new_shout") );
                new_td.appendChild( shouts[array_index] );
        		new_td.appendChild( new_br() );
                
            } else {
            
                shouts[array_index].setAttribute("width","100%");
            	user_shouts_block.appendChild( shouts[array_index] );
        		user_shouts_block.appendChild( new_br() );
            }
        }
    }
    new_td.appendChild( new_br() );
    
    // adds watching and watched by blocks
    table_old_container.appendChild( new_br() );
    table_old_container.appendChild(watch_div);
    
    // remove old table row
    table_right = table_right.parentNode;
    table_right.parentNode.removeChild(table_right);
       
}