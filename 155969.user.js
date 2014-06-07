// ==UserScript==
// @name           OKC All About the Two of Us
// @namespace      Cromagnon
// @description    Reorganize information on "The Two of Us" page
// @include        *.okcupid.com*/profile/*
// @version        1.2.0315
//
// === GM_ API ===
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==



// Insert CSS for custom elements.
//
function addGlobalStyle(css) {
    var head, style;

    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(   '     #match_breakdown { padding-top: 15px;  padding-bottom: 15px; }'
                + '\r\n .sidebar div.only_child { margin-top: 225px; }'
                + '\r\n .sidebar div.active p a { color: #86C454; }'
                + '\r\n div.section.completion div.active .bar { background-color: #125000; }'
                + '\r\n div.section.completion div.active .bar .progress { background-color: #66A434; }'
                + '\r\n div.big_dig div.questions div.question.hilight { background-color: #E8F2E0; }'
                + '\r\n div.big_dig > div.header .page_title { text-align: inherit; }'
                + '\r\n div.big_dig > div.header { margin: 0px; }'
                + '\r\n div.big_dig #search_container #question_search_suggestions li.category.quick_search { display: none; }'
                + '\r\n div.big_dig #search_container #question_search_suggestions li.category.quick_search a '
                + '\r\n  { background-position: 22px -110px; display: inline; line-height: 32px; padding: 8px 0 9px 42px;}'
                + '\r\n div.big_dig #search_container #question_search_suggestions li.category.quick_search:hover a { background-position: 22px -150px; color: #CCCCCC; }'
                + '\r\n div.big_dig #search_container #question_search_suggestions li.category.quick_search a:hover, '
                + '\r\n div.big_dig #search_container #question_search_suggestions li.category.quick_search a:active { background-position: 22px -110px; color: white; }'
);



// extract the profile name from the given URL
//
function getProfileName(href) {

    var i = href.indexOf("okcupid.com/");
    
    if (i != -1) href = href.substr(i + 11);
    
    i = href.indexOf("/profile/");
    
    if (i == -1) return null;
    
    var profile_name = href.substr(i + 9);
    
    i = profile_name.indexOf('/');
    
    if (i != -1) profile_name = profile_name.substr(0, i);
    
    i = profile_name.indexOf('?');
    
    if (i != -1) profile_name = profile_name.substr(0, i);
    
    return profile_name;
};



// return the profile name of the currently logged in user
//
function getMyName() {

    var screenname = window.SCREENNAME;
    
    if (screenname != null) return screenname;
    
    screenname = unsafeWindow.SCREENNAME;
    
    if (screenname != null) return screenname;
    
    var link = document.querySelector("a.username");
    
    if (link == null) return null;
    
    return link.innerHTML;
    
};



// add and return a *displayed* and usable right side bar
//
function addRightSidebar() {

    var sidebar = document.getElementById("right_sidebar");
    
    if (sidebar != null) return sidebar;
    
    sidebar = document.getElementById("right_side_bar");
    
    if (sidebar != null) sidebar.parentNode.removeChild(sidebar);
    
    var main = document.getElementById("main_content");
    
    sidebar = document.createElement("div");
    sidebar.className = "sidebar";
    sidebar.id = "right_sidebar";
    
    addGlobalStyle("#wrapper {width: 1148px;}"
                 + "\r\n #page {width: 1148px;}"
                 + "\r\n #footer {padding: 0;}"
                 + "\r\n div.content_footer_wrapper {float: left; margin-left: 184px;}"
                 + "\r\n div#right_sidebar {float: left; font-size: 11px; margin-top: 48px; position: relative; width: 184px; z-index: 1;}");
    
    main.parentNode.insertBefore(sidebar,main);
    main.parentNode.insertBefore(main,sidebar);
    
    return sidebar;
};



// Load and return the custom collection of "quick search" terms from persistent storage
//  or initialize and save such if none are saved in persistent storage, or persistent storage
//  doesn't exist or is unreadable
//
function loadQuickSearchTerms() {

    var my_name = getMyName();
    
    var search_terms = [];
    var new_terms;
    
    while(new_terms = GM_getValue(my_name + ".qsLine" + search_terms.length)) search_terms.push(new_terms.split(","));
    
    // First time using the script for this user?
    // ... then initialize the search terms
    if (search_terms.length == 0) {
    
        search_terms = [ ["alcohol", "beer", "drugs"], ["sailboat", "horror", "traveled" ] ];
             
        for(var i = 0; i < search_terms.length; i++)
    
            GM_setValue(my_name + ".qsLine" + i, search_terms[i].toString());
    
    };
                         
    return search_terms;
};



// Add in a set of "quick search" links to public match answers
//
function addQuickSearchLinks() {

    var end_section = document.querySelector("ul#question_search_suggestions li.section");
    
    if (end_section == null) return;
    
    var base_href = "/profile/" + getProfileName(document.location.href) + "/questions?search=";
    
    var search_terms = loadQuickSearchTerms();
    
    for(var i = 0; i < search_terms.length; i++) {
    
        var new_item = document.createElement("li");
        
        new_item.className = "category quick_search";
    
        for(var j = 0; j < search_terms[i].length; j++) {
        
            var new_link = document.createElement("a");
            
            new_link.innerHTML = search_terms[i][j];
            
            new_link.setAttribute("href", base_href + search_terms[i][j]);
            
            new_item.appendChild(new_link);
        
        };
        
        end_section.parentNode.insertBefore(new_item, end_section);
        
    };
    
    var search_link = document.querySelector("ul#question_search_suggestions li.search");
    
    if (search_link != null) search_link.parentNode.removeChild(search_link);
    
    if (document.location.href.indexOf(base_href) == -1) return;
    
    var suggestions = document.getElementById("question_search_suggestions");
    
    if (suggestions == null) return;
    
    suggestions.className = "show reduced";
    
};



// Customize the category links to eliminate unnecessary duplicates and add new categories
//
function reviseCategoryLinks() {

    var revise_links = [ "unanswered", "", "",
                         "Sex", "Answered recently", "recent",
                         "Dating", "Answered in ancient times", "ancient",
                         "Lifestyle", "You've answered privately", "private",
                         "Ethics", "", "",
                         "Religion", "", "",
                         "Other", "", ""
                       ];
    
    for(var i = 0; i < revise_links.length; i += 3) {
    
        var link = document.getElementById("category_" + revise_links[i]);
        
        if (link == null) continue;
        
        if (revise_links[i + 1] != "") {
        
            link.id = "category_" + revise_links[i + 2];
            
            link = link.getElementsByTagName("a")[0];
            
            link.innerHTML = revise_links[i + 1];
            
            link.setAttribute("href", link.getAttribute("href").replace(revise_links[i], revise_links[i + 2]));
            
            link.setAttribute("title", "");
        
        } else link.parentNode.removeChild(link);
    };
};



// Move the Search Container to the right of displayed questions
//
function moveSearchContainer() {

    var search_container = document.getElementById("search_container");
    
    if (search_container == null) return;
    
    var big_dig_right = document.querySelector("div.big_dig div.right");
    
    if (big_dig_right == null) return;
    
    big_dig_right.appendChild(search_container);
    
    addGlobalStyle('div.big_dig #search_container { height: 46px; margin: -10px; position: relative; width: 250px; }'
                 + 'div.big_dig #search_container #question_searchContainer { margin: 0; width: 100%; }'
                 + 'div.big_dig #search_container #question_searchContainer #question_search {'
                 + 'background-image: url("http://akcdn.okccdn.com/media/img/questions/questions_spriteV3.png");'
                 + 'background-position: 440px -580px; background-repeat: no-repeat; padding-right: 50px; }'
                 + 'div.big_dig #search_container #question_searchContainer #question_search {'
                 + 'background-image: url("http://akcdn.okccdn.com/media/img/questions/questions_spriteV3@2x.png"); background-size: 80px 680px; }'
                 + 'div.big_dig #search_container #question_searchContainer #question_search:-moz-placeholder { color: #5E6573; }'
                 + 'div.big_dig #search_container #question_searchContainer #question_search:focus:-moz-placeholder { color: #AEB4BF; }'
                 + 'div.big_dig #search_container #question_searchContainer.empty #question_search { cursor: pointer; }'
                 + 'div.big_dig #search_container #question_searchContainer.empty #question_search:hover,'
                 + 'div.big_dig #search_container #question_searchContainer.empty #question_search:focus { background-position: 440px -620px; }'
                 + 'div.big_dig #search_container #question_searchContainer.category.empty #question_search { background-position: 20px -64px; padding-left: 50px; }'
                 + 'div.big_dig #search_container #question_searchContainer.category.empty .clearbtn { display: block; }'
                 + 'div.big_dig #search_container #question_searchContainer .placeholder { left: 52px; }'
                 + 'div.big_dig #search_container #question_search_suggestions { -moz-border-bottom-colors: none; -moz-border-left-colors: none;'
                 + '-moz-border-right-colors: none; -moz-border-top-colors: none; background: none repeat scroll 0 0 white; border-bottom-left-radius: 4px;'
                 + 'border-bottom-right-radius: 4px; border-color: -moz-use-text-color #F6F6F6 #F6F6F6; border-image: none; border-right: 1px solid #F6F6F6;'
                 + 'border-style: none solid solid; border-width: medium 1px 1px; height: 0; overflow: hidden; position: absolute; top: 46px;'
                 + 'transition: height 300ms ease-in-out 0s, border-color 300ms ease-in-out 0s; width: 255px; z-index: 1000; }'
                 + 'div.big_dig #search_container #question_search_suggestions.show { border-color: #DCDFE6; height: auto; }'
                 + 'div.big_dig #search_container #question_search_suggestions.show.reduced { height: auto; }'
                 + 'div.big_dig #search_container #question_search_suggestions.show.reduced li.search a { cursor: pointer; pointer-events: auto; }'
                 + 'div.big_dig #search_container #question_search_suggestions.show.reduced li.section { display: none; }'
                 + 'div.big_dig #search_container #question_search_suggestions.show.reduced li.category { display: none; }'
                 + 'div.big_dig #search_container #question_search_suggestions.show.reduced li.quick_search { display: inherit !important; }'
                 + 'div.big_dig #search_container #question_search_suggestions li { font-size: 13px; }'
                 + 'div.big_dig #search_container #question_search_suggestions li:first-child { margin-top: 10px; }'
                 + 'div.big_dig #search_container #question_search_suggestions li:last-child { margin-bottom: 10px; }'
                 + 'div.big_dig #search_container #question_search_suggestions li a,'
                 + 'div.big_dig #search_container #question_search_suggestions li.section span {'
                 + 'background: url("http://akcdn.okccdn.com/media/img/questions/questions_spriteV3.png") no-repeat scroll 0 0 transparent;'
                 + 'display: block; padding: 8px 8px 9px 50px; }'
                 + 'div.big_dig #search_container #question_search_suggestions li a,'
                 + 'div.big_dig #search_container #question_search_suggestions li.section span {'
                 + 'background-image: url("http://akcdn.okccdn.com/media/img/questions/questions_spriteV3@2x.png"); background-size: 80px 680px; }'
                 + 'div.big_dig #search_container #question_search_suggestions li.section span { background: none repeat scroll 0 0 white;'
                 + 'font-size: 15px; font-weight: 600; padding-bottom: 10px; padding-left: 15px; padding-top: 10px; }'
                 + 'div.big_dig #search_container #question_search_suggestions li.search a { background-position: 22px -110px;'
                 + 'color: #AEB4BF; cursor: default; font-size: 13px; pointer-events: none; }'
                 + 'div.big_dig #search_container #question_search_suggestions li.search a .search_term { color: #5E6573; }'
                 + 'div.big_dig #search_container #question_search_suggestions li.category:hover { background: none repeat scroll 0 0 #5C8AE6; }'
                 + 'div.big_dig #search_container #question_search_suggestions li.category a { background-position: 22px 10px; color: #5E6573; }'
                 + 'div.big_dig #search_container #question_search_suggestions li.category a:hover,'
                 + 'div.big_dig #search_container #question_search_suggestions li.category a:active { background-position: 22px -30px; color: white; }'
                 + 'div.big_dig #question_search_help { display: none; left: 50%; margin-left: -205px; position: absolute; top: 105px; width: 410px; z-index: 1001; }'
                 + 'div.big_dig #question_search_help.show { animation: 300ms ease 0s normal none 1 fade-in-up; display: block; }'
               );
};



// Given the string expressing "you've answered ### of her ### questions"
//  estimate how many of those questions are public from the pagination
//
function estimatePublicTotal(intersect_string) {

    //check if the questions have been filtered,
    // in which case an estimate of the total is not possible
    if ((document.location.href.match(/(Sex|Ethics|Religion|Lifestyle|Dating|Other|unanswered|i_care|notes)=1/i)) || (document.location.href.match(/search=/)))
    
        return intersect_string;
    
    var total_answered = intersect_string.match(/\d+/g);
    
    total_answered = Number(total_answered[total_answered.length - 1]);
    
    var public_answers = document.querySelectorAll("div#questions div.question").length;
    
    var pages = document.querySelector("div#questions div.pages li.count a");
    
    if (pages != null) {
    
        pages = Number(pages.innerHTML);
        
        if (pages > 1) public_answers = pages * 10;
    
    };
    
    if (public_answers > 10) {
        
        if (public_answers >= total_answered) public_answers = "most or all";
        
        else public_answers = "~ " + (public_answers - 5);
    };
    
    return intersect_string + " (" + public_answers + " in public)";

};



// Move the "You Match..." breakdown by category into the righthand bar
//
function matchBreakdownToRightBar() {

    var categories = [ "Ethics", "Sex", "Religion", "Lifestyle", "Dating", "Other" ];

    // who are we?
    var my_name = getMyName();
    
    // are we on our own questions page?
    if (document.location.href.indexOf("/profile/" + my_name) != -1)  return;
    
    // Move Questions Answered to right bar
    var stats = document.querySelector("div.big_dig div.right ul.stats.lined");
    
    if (stats == null) return;
    
    var new_text = document.createElement('p');
    
    new_text.innerHTML = "<span style='white-space: nowrap; text-transform: none;'>You've answered: "
                         + estimatePublicTotal(stats.querySelector("li.comparison p.medium").innerHTML) + "</span>";
    
    var basic_info = document.getElementById("aso_loc");
    
    if (basic_info == null) return;
    
    basic_info.appendChild(new_text);
    
    
    var side_menu = addRightSidebar();
    
    if (side_menu == null) return ("Couldn't find right side bar!");
    
    var new_item = document.createElement("div");
    new_item.className = "block_outer_wrapper only_child";
    
    side_menu.appendChild(new_item);
    side_menu = new_item;
    
    new_item = document.createElement("div");
    new_item.className = "section completion match lined second-child last-child";
    new_item.id = "match_breakdown";
    
    side_menu.appendChild(new_item);
    side_menu = new_item;
    
    new_item = document.createElement("strong");
    new_item.innerHTML = "You've answered...";
    
    side_menu.appendChild(document.createElement("h4"));
    side_menu.firstChild.appendChild(new_item);
    
    new_item = document.createElement("div");
    new_item.className =  "category";
    
    if (document.location.href.indexOf("?unanswered=1") != -1) {
        
        new_item.className += " active";
        
        var no_results = document.querySelector("#questions_pages div.no_results p");
        
        if (no_results != null)
        
            no_results.innerHTML = "There are no questions, unanswered by you, which have been answered publicly by " + getProfileName(document.location.href) + ".";
    };
    
    new_item.innerHTML = "<p><a href='questions?unanswered=1'><strong>" + stats.querySelector("li.comparison p.medium").innerHTML +
                         "</strong></p> <a href='questions?unanswered=1'> <p class='bar'>" +
                         "<span class='progress' style='" + stats.querySelector("li.comparison div.bar.yours").getAttribute("style") + "'></span></p></a>";
    
    side_menu.appendChild(new_item);
    
    stats.parentNode.removeChild(stats);
    
    // drill down to "You Match..." list and the matching Show Questions list of links
    var cat_menu = document.getElementById("main_content");
    
    cat_menu = cat_menu.getElementsByTagName("div");
    
    for (var i = 0; i < cat_menu.length; i++) if (cat_menu[i].className.indexOf("big_dig") != -1) break;
    
    cat_menu = cat_menu[i];
    
    if (cat_menu == null) return;
    cat_menu = cat_menu.getElementsByTagName("div");
    
    for (i = 0; i < cat_menu.length; i++) if (cat_menu[i].className == "right") break;
    
    cat_menu = cat_menu[i];
    
    if (cat_menu == null) return;
    
    cat_menu = cat_menu.getElementsByTagName("ul");
    
    // find Show Questions list...
    var show_menu = null;
    
    for (i = 0; i < cat_menu.length; i++) if (cat_menu[i].className == "bottom_pad") break;
    
    if (i == cat_menu.length) i = 0;
    
    else show_menu = cat_menu[i++];
    
    for (; i < cat_menu.length; i++) if (cat_menu[i].className == "match lined") break;
    
    cat_menu = cat_menu[i];
    
    var show_items = null;
    
    if (show_menu != null) {
        
        show_items = show_menu.getElementsByTagName("li");
    
        for(i = 1; i < show_items.length; i++) if (show_items[i].getElementsByTagName("a")[0].href.indexOf("?unanswered") != -1) break;
        
        if (i != show_items.length) show_items[i].parentNode.removeChild(show_items[i]);
    
        for(i = 1; i < show_items.length; i++) if (show_items[i].getElementsByTagName("a")[0].href.indexOf("?" + categories[0]) != -1) break;
    
        if (i == show_items.length) return alert("Categories not found!");
    
    };
    
    var cat_items = (cat_menu == null) ? [ ] : cat_menu.getElementsByTagName("li");
    
    // Start building right bar breakdown list
    new_item = document.createElement("h4");
    new_item.appendChild(document.createElement("strong")).innerHTML = "&nbsp;</br>You Match...";
    side_menu.appendChild(new_item);
    
    for(var k = 0; k < categories.length; k++) {
        
        new_item = document.createElement("div");
        new_item.className = "category";
    
        if ((cat_items[1] == null) || (cat_items[1].getElementsByTagName("a")[0].href.indexOf("?" + categories[k]) == -1)) {
            
            new_item.innerHTML = "<p><a href='questions?" + categories[k] + "=1'> ?? % on <strong>" + categories[k] +
            "</strong> questions</a></p> <a href='questions?" + categories[k] + "=1'>" +
            "<p class='bar'><span class='progress' style='width: 1%;'></span></p></a>";
        } else {
    
            new_item.innerHTML = "<p><a href='questions?" + categories[k] + "=1'>" + cat_items[1].getElementsByTagName("p")[0].innerHTML +
            "</a></p> <a href='questions?" + categories[k] + "=1'><p class='bar'><span class='progress' style='" +
            cat_items[1].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getAttribute("style") + "'></span></p></a>";
            
            cat_menu.removeChild(cat_items[1]);
        };
        
        if (document.location.href.indexOf("?" + categories[k] + "=1") != -1) {
    
        new_item.className += " active";
        
        var no_results = document.querySelector("#questions_pages div.no_results p");
        
        if (no_results != null)
        
                no_results.innerHTML = "There are no " + categories[k] + " questions both you and " + getProfileName(document.location.href) + " have answered publicly.";
        };
    
        side_menu.appendChild(new_item);
        
        if (show_menu == null) continue;
        
        if (show_items[i].getElementsByTagName("a")[0].href.indexOf("?" + categories[k]) == -1) {
    
            alert("Unexpected Category!");
            
            for(i++; i < show_items.length; i++) if (show_items[i].getElementsByTagName("a")[0].href.indexOf("?" + categories[k]) != -1) break;
            
            if (i == show_items.length) break;
        };
        
        show_menu.removeChild(show_items[i]);
    };
    
    if (cat_menu != null) cat_menu.parentNode.removeChild(cat_menu);
};



// Display Questions Tab even when no match questions have been answered publicly
//
function displayNoPublicQuestions() {

    var qtab = document.getElementById("pnav_bigdig");
    
    if (qtab == null) return;
    
    if (qtab.style.display != "none") return;
    
    qtab.style.display = "block";
    
    var link = qtab.getElementsByTagName("a")[0];
    
    if (link == null) return alert("Link Not Found in Questions Tab!");
    
    link.innerHTML = "No Public Questions";
};



// Hide or delete elements on the page associated with
// "work-in-progress" or incompatible features
//
function hideWorkInProgress() {

    
};



// Main Function -- use to call other functions in order
//
function init() {

    addRightSidebar();
    
    displayNoPublicQuestions();
    
    matchBreakdownToRightBar();
    
    moveSearchContainer();
    
    reviseCategoryLinks();
    
    addQuickSearchLinks();
    
    hideWorkInProgress();

};

init();
