// ==UserScript==
// @name       		5trick3n's Battlelog Unfuckulator
// @namespace  		http://userscripts.org/scripts/show/185753
// @version    		0.17
// @description  	A collection of tweaks to BF4's Battlelog, for the purpose of general unfuckulation.
// @match      		http://battlelog.battlefield.com/bf4*
// @require    		http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @require    		https://gist.github.com/raw/2625891/waitForKeyElements.js
// @downloadURL		http://userscripts.org/scripts/source/185753.user.js
// @grant GM_addStyle
// @grant GM_xmlhttpRequest
// ==/UserScript==
/*
*=====Change Log
*0.17 fixed join server button overlapping the nextnext map image in serverbrowser for firefox
*/


/*
 * Lib
 */

//function that sets elements display: none via class
GM_addStyle("\
.hideThis {\
	display:none !important;}\
");

function hideThis(jNode) {
    $(jNode).addClass("hideThis");
}

//display XHR results in cosole
function sampleXHR(pageURL) {
    GM_xmlhttpRequest({
        method: "GET",
        url: pageURL,
        onload: function (response) {
            console.log(pageURL, "Success:", "\n Status:", response.status, response.statusText);
            console.log(response.responseText);
        }
    });
}

function jGetServerInfo(serverGUID) {
    var deferred = $.Deferred();

    var serverURL, serverInfo;
    serverURL = "http://battlelog.battlefield.com/bf4/servers/show/pc/" + serverGUID;

    console.log("jGetServerInfo called. server URL:", serverURL);

    //create object to contain final server info
    serverInfo = {
        name: "",
        players: "",
        commanders: "",
        spectators: "",
        mode: "",
        map: "",
        next: {
            map: "",
            mode: "",
            image: "",
        },
        nextNext: {
            map: "",
            mode: "",
            image: "",
        },

    };
    $.ajax({
        url: serverURL,
    })
        .done(function (data) {
            var html;
            console.log("data done, Sample:");
            console.log(data.slice(0, 100));

            html = $.parseHTML(data, "", true);

            serverInfo.players = $(html).find("#server-page-info h5:first").text();
            //get next map info
            serverInfo.next.map = $(html).find("#server-page-map-rotation td.next strong").text();
            serverInfo.next.mode = $(html).find("#server-page-map-rotation td.next span").text().slice(2, -2);
            serverInfo.next.image = $(html).find("#server-page-map-rotation td.next img").attr("src");

            //get nextNext map info
            if ($(html).find("#server-page-map-rotation td.next + td").hasClass("empty")) {
                serverInfo.nextNext.map = $(html).find("#server-page-map-rotation td:first strong").text();
                serverInfo.nextNext.mode = $(html).find("#server-page-map-rotation td:first span").text().slice(2, -2);
                serverInfo.nextNext.image = $(html).find("#server-page-map-rotation td:first img").attr("src");
            } else {
                serverInfo.nextNext.map = $(html).find("#server-page-map-rotation td.next + td strong").text();
                serverInfo.nextNext.mode = $(html).find("#server-page-map-rotation td.next + td span").text().slice(2, -2);
                serverInfo.nextNext.image = $(html).find("#server-page-map-rotation td.next + td img").attr("src");
            }


            //console.log(serverInfo);
            //console.log($(html).find("#server-page-info h5:first").text());


            /*WIP
            //Get the server CVARs from the <dl>s
            serverOptions = $(html).filter( "dl" ).map(function(){                 
						return $(this).html();
                        })
                	.get()
					.join("");
            //console.log("1", serverOptions);
            //console.log("2", $(html).filter( "dl" ).contents()); 
            //console.log("3", $(html).find( "dl" ).contents());  
            */
            console.log("serverInfo:\n");
            console.log(serverInfo);
            deferred.resolve(serverInfo);
        });
    console.log("jGetServerInfo finished");
    return deferred.promise(jGetServerInfo);
}

//jGetServerInfo("bcc37d46-2389-4ce6-93b0-13f870d44256").done(function(serverInfo){console.log("boogyboogy", serverInfo);});
//returns an object containing server info for the server at the given GUID



/*
 * END Lib
 */

/*
 * Com Center Toggle and centering toggle
 */
//Styles
GM_addStyle('\
.BL_toggleCom {\
    margin-top: 6px;\
    margin-left: 2px;\
    padding-top: 8px;\
    width: 36px;\
    height: 28px;\
    position: relative;\
}\
.BL_toggleCom:hover {\
    -webkit-filter: brightness(3);\
	-moz-filter: brightness(3);\
}\
.BL_toggleCom-inner {\
    padding-left: 9px;\
}\
.BL_toggleCom-logo {\
    -webkit-filter: brightness(0.7) grayscale(1);  float: left;\
	filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale");\
	-moz-filter: brightness(0.7);\
}\
.BL_toggleCom-arrow {\
	height: 22px; float: right;\
}\
.BL_floatRight {\
	float: right !important;\
}\
.BL_floatLeft {\
	float: left !important;\
}\
.BL_rotate180 {\
	-webkit-transform: rotate(180deg);\
	transform: rotate(180deg);\
}\
.BL_toggleCom-hide {\
	right: -240px !important;\
}\
.BL_toggleCom-chats-move {\
	right: 8px !important;\
}\
.BL_viewport {\
	padding-right: 0px !important;\
}\
.BL_base-header {\
	right: 0px !important;\
}\
.BL_ugm {\
	right: 0px !important;\
}\
');

var toggleHtml =
    '<li>\
	<div class="BL_toggleCom">\
		<div class="BL_toggleCom-inner">\
			<img class="BL_toggleCom-logo" src="http://battlelog-cdn.battlefield.com/cdnprefix/288d9afd0553cbdb/public/base/shared/origin-logo.png">\
			<i class="BL_toggleCom-arrow BL_rotate180"><svg width="5" height="22" xmlns="http://www.w3.org/2000/svg">\
				<!-- Created with SVG-edit - http://svg-edit.googlecode.com/ -->\
				<g>\
					<title>Layer 1</title>\
					<path transform="rotate(-135 0.00000998079 10.9999)" id="svg_1" d="m-3.5354,14.53534l0,-7.07083l7.07082,7.07083l-7.07082,0z" stroke-width="0" fill="#575757" stroke="#000000"></path>\
				</g>\
			</svg></i>\
			</div>\
			</div>\
</li>';


waitForKeyElements("#comcenter-friends", function () {
    $("#comcenter-friends").addClass("BL_toggleCom-hide");
    $("#comcenter-chats").addClass("BL_toggleCom-chats-move");
});

//Toggle Actions
$("#base-header-user-tools ul:first").append(toggleHtml);
$(".BL_toggleCom").click(function () {
    $("#comcenter-friends").toggleClass("BL_toggleCom-hide");
    $(".BL_toggleCom-arrow").toggleClass("BL_rotate180");
    $("#base-header").toggleClass("BL_base-header");
    $("#viewport").toggleClass("BL_viewport");
    $("#unified-game-manager").toggleClass("BL_ugm");
    $("#comcenter-chats").toggleClass("BL_toggleCom-chats-move");
});

//Start with Com Center and center everything
$("#viewport").addClass("BL_viewport");
$("#base-header").addClass("BL_base-header");
$("#unified-game-manager").addClass("BL_ugm");

/*
 * END Com Center Toggle and centering toggle
 */



/*
 *  Game Bar
 */
//GM_addStyle("#base-header .game-bar .dropdown-bar>.dropdown-content .recommended {height: 191px !important;}");


$("#base-header .game-bar .dropdown-content[data-for='multiplayer'] section").addClass("hideThis");

//Drop Downs


GM_addStyle("\
.BL_game-bar {\
    background-color: rgba(10, 14, 20, 0.9) !important;\
    width: 50%;\
}\
.header-dropdown-active #base-header .game-bar .dropdown-bar {\
    -webkit-box-shadow: 0 0 13px 3px rgba(10, 14, 20, 0.9) !important;\
    -moz-box-shadow: 0 0 13px 3px rgb(0, 0, 0) !important;\
    box-shadow: 0 0 13px 3px rgb(0, 0, 0) !important;\
}\
");
$(".game-bar .dropdown-bar").addClass("BL_game-bar");





//Soldier Menu Dropdown
GM_addStyle("\
.BL_soldierMenu {\
padding: 0 !important;\
color: rba(255,255,255,0);\
width: 100%;\
background-image: url(" + $(".game-bar .dropdown-bar div[data-for='stats'] .row section.span4 .profile-soldier-image.pixelate").attr("src") + ");\
background-position: top;\
background-repeat: no-repeat no-repeat;}\
");


$(".game-bar .dropdown-bar div[data-for='stats']").addClass("BL_soldierMenu");
$(".game-bar .dropdown-bar .soldierstats-pic-container").addClass("hideThis");

//Styles
GM_addStyle("\
.sm_nav-links {\
color: inherit !important;\
}\
.sm_nav-links:hover {\
color: rgba(255,255,255,1) !important\
}\
.BL_soldierMenu-nav {\
padding-top: 16px;\
padding-bottom: 10px;\
width: 187px !important;\
color: rgba(255,255,255,0);\
background: rgba(0,0,0,0);\
-moz-transition:color 0.3s, background-color 0.3s,;\
-webkit-transition:color 0.3s, background-color 0.3s;\
-o-transition:color 0.3s, background-color 0.3s;\
transition:color 0.3s, background-color 0.3s;\
}\
.BL_soldierMenu-nav:hover {\
color: rgba(255,255,255,0.14);\
background: rgba(0,0,0,0.6);\
width: 183px;\
}\
");
//Merge Links, add Classes
$(".BL_soldierMenu nav:first a:last").after($(".BL_soldierMenu nav:last").html());
$(".BL_soldierMenu nav:last").addClass("hideThis");
$(".BL_soldierMenu nav:first").addClass("BL_soldierMenu-nav");
$(".BL_soldierMenu nav:first a").addClass("sm_nav-links");

//css for links and set width auto
GM_addStyle("\
.BL_soldierstats-box {height: 100%;}\
.BL_soldierMenu .span4 {width: auto;)\
");


//Rank
//hide platform
GM_addStyle(".BL_soldierMenu-statsbox .platform {display: none !important;}");
//move points to overlay exp bar and css and reorganize right side
GM_addStyle("\
.BL_sM-statsBox-points {\
position: absolute;\
text-align: center;\
width: 100%;\
padding-top: 3px;\
z-index: 1;\
color: rgb(182, 182, 182) !important;\
float:none !important;\
text-shadow: 0 0 5px rgb(0, 0, 0)\
}\
.BL_progress-bar {\
height: 16px !important;\
margin-bottom: 0;\
width: auto !important;\
}\
.BL_progress-bar-inner {\
height: inherit !important;\
}\
.BL_rank-progress {\
padding: 0 !important;\
}\
.BL_soldierMenu-statsbox {\
margin: 0;\
padding-top: 20px;\
padding-bottom: 23px;\
padding-right: 17px;\
height: 100%;\
position: absolute;\
bottom: 0;\
right: 0;\
}\
.BL_rank-container {\
position: absolute !important;\
bottom: 0 !important;\
right: 0 !important;\
}\
");

waitForKeyElements(".BL_game-bar div[data-for='stats'] section:first .rank-progress", function () {
    $(".BL_game-bar div[data-for='stats'] section:first")
        .addClass("BL_soldierMenu-statsbox");
    //medium icon
    $(".BL_soldierMenu-statsbox .rank.small.insignia")
        .removeClass("small insignia")
        .addClass("medium");
    $(".BL_soldierMenu-statsbox .soldierstats-box")
        .addClass("BL_soldierstats-box");
    $(".BL_soldierMenu-statsbox .rank:first")
        .addClass("BL_rank-container");
    $(".BL_soldierMenu-statsbox .rank.medium")
        .addClass("BL_sm-rankIcon");
    $(".BL_soldierMenu-statsbox .rank-progress")
        .addClass("BL_rank-progress");
    $(".BL_soldierMenu-statsbox .progress-bar")
        .addClass("BL_progress-bar");
    $(".BL_soldierMenu-statsbox .progress-bar-inner")
        .addClass("BL_progress-bar-inner");
    $(".BL_soldierMenu-statsbox .progress-bar-inner")
        .before($(".BL_soldierMenu-statsbox .points")
            .addClass("BL_sM-statsBox-points"));
}, true);




////Suit up Menu
$("#base-header .game-bar .dropdown-content[data-for='multiplayer'] nav.padder a:first").attr("href", "http://battlelog.battlefield.com/bf4/campaign/").html("Campaign");
GM_addStyle("\
#base-header .game-bar .dropdown-content[data-for='multiplayer'] nav {width: 50%; margin-left: 0}\
#base-header .game-bar .dropdown-content[data-for='multiplayer'] .row {margin-left: 0;}\
#base-header .game-bar .dropdown-content[data-for='multiplayer'] {height :auto; min-height: initial;}\
#base-header .game-bar .dropdown-content[data-for='multiplayer'] .btn {height: 47px; line-height: 47px;}\
");
//Hide Campaign (since it's included in Suit up menu
$(".base-section-menu li[data-page='campaign']").addClass("hideThis");


/*
 *  END Game Bar
 */


///*
// * Language swap
// */
//// Language Strings
//var rlmultiplayer = ["Multiplayer", "多人", "Сетевая игра"];
//
////Function to pick random translation
//function randomTrans() {
//    return Math.floor(Math.random() * 3);
//}
//
////Replace
//$("ul.base-section-menu  li[data-page='multiplayer']  a").html(rlmultiplayer[randomTrans()]);
//
///*
// * END Language swap
// */

/*
 * Server Browser
 */



waitForKeyElements("#serverbrowser", function () {
    
    $("#serverbrowser-recommended-servers").addClass("hideThis"); // Hide Recommended Servers
    $("#serverbrowser h1:first").addClass("hideThis"); // Hide Page Title
  //restyle the details sidebar  
  GM_addStyle("\
		#serverbrowser-show .btn.join {\
			border: 0;\
			margin-top: 0;\
			background-color: rgba(7, 7, 7, 0.5);\
			background-image: none;\
            clear: both;}\
		#serverbrowser-show .box {\
			margin-top: 0;}\
		#serverbrowser-show .bblog-local-comment textarea {\
			width: 220px !important;\
			margin-top: 2px !important;\
		}\
	");
});


$("#serverbrowser h1:first").addClass("hideThis");

/*
 * END Server Browser
 */

/*
 * Home Page
 */
waitForKeyElements("#main-header", function () {
    $(".main-header .playbar").addClass("hideThis");
    $("#bottom-tiles").addClass("hideThis");
    GM_addStyle("\
#top-tiles {\
    margin-bottom: 8px;\
}\
");
});
    
/*
 * END Home Page
 */

/*
 * Battlepacks Page
 */
GM_addStyle("\
.battlepacks-list .battlebox ul .bp-item  {\
	background: none;}\
#what-is-battlebacks-box {\
	display: none;}\
#battlepacks-opened button {\
	display: none;}\
.battlepacks-list .battlebox ul .innergroup	{\
	width: auto;}\
#unopened-battlepacks {\
	margin-top: 1px !important;\
}\
");

/*
 * END Battlepacks Page
 */

/*
 * Soldier Menu Pages
 */
waitForKeyElements("#warsaw-stats > .submenu", function () {
    GM_addStyle("\
    	.BL_submenu {\
    		margin-bottom: 0 !important;\
    		margin-top: 2px !important;}\
    	.BL_warsaw-stats-head {\
    		margin-bottom:2px !important;}\
	");

    $("#warsaw-stats > .submenu").addClass("BL_submenu");
    $("#warsaw-stats-head").addClass("BL_warsaw-stats-head");
});

waitForKeyElements("#profile-stats-fetch-url > section:first", function (jNode) {

    if ($("#profile-stats-fetch-url > section:first").attr("id") == "overview-info") {
        GM_addStyle("\
            .BL_leaderboard-highlight {\
                display: none;}\
            .BL_soldier-portrait {\
                height: 255px !important;}\
            .BL_profile-stats-fetch-url_header {\
                display: none}\
            .BL_overview-soldier_box-content {\
                margin-top: 1px !important;}\
            .BL_stat-replay-container {\
                margin-bottom: 0px !important;\
                z-index: 0;}\
            .BL_overview-info {\
                margin-bottom: 0px !important;}\
            .BL_overview-completion {\
                margin-top: 0px !important;}\
            .BL_row-tight_row-tight {\
                margin-top: 0px !important;}\
			.BL_overview-dogtags_box-content {\
				height: 156px !important;}\
		");

        $("#overview-info .leaderboard-highlight").addClass("BL_leaderboard-highlight");
        $(".soldier-portrait").addClass("BL_soldier-portrait");
        $("#profile-stats-fetch-url header").addClass("BL_profile-stats-fetch-url_header");
        $("#overview-info #overview-soldier .box-content").addClass("BL_overview-soldier_box-content");
        $("#stat-replay-container").addClass("BL_stat-replay-container");
        $("#overview-info").addClass("BL_overview-info");
        $("#overview-completion").addClass("BL_overview-completion");
        $("#profile-stats-fetch-url .row-tight+.row-tight").addClass("BL_row-tight_row-tight");
        $("#overview-dogtags .box-content").addClass("BL_overview-dogtags_box-content");
    }
});






/*
 * Loadout Overview
 */

waitForKeyElements("#loadout-menu-wpr", function () {
    GM_addStyle("\
    .BL_loadout-menu-wpr {\
        margin-top: 5px !important;}\
    ");
    $("#loadout-menu-wpr").addClass("BL_loadout-menu-wpr");
});

/*
 * END Loadout Overview
 */

/*
 * Loadout Item Select Menu Changes
 */

//Styles
GM_addStyle("\
.BL_wepContainer {\
    width: calc(100%+1px);\
    margin-left:-1px;\
}\
.BL_wepSelect{\
    height: 35px;\
    display: inline-block;\
    width: calc(25% - 1px);\
    text-align: center;\
    line-height: 35px;\
    background-color: rgba(7, 7, 7, 0.6);\
    color: rgba(180,180,180, 0.5);\
    cursor: pointer;\
    margin-bottom: 1px;\
    margin-left: 1px;\
}\
.BL_wepSelect.BL_active {\
    background-color: rgba(7, 7, 7, 0.8);\
    color: white;\
}\
.BL_wepSelect:not(:first-child) {\
}\
.BL_wep-category-header{\
    margin-top: 0px !important;\
    margin-bottom: 1px !important;\
}\
.BL_wep-rows{\
	margin-bottom: 1px !important;\
}\
");


waitForKeyElements("#items-select-menu .items-category:not(#grid-controls):first", function () {
    //If more than 2 categorys...
    if ($("#items-select-menu .items-category:not(#grid-controls)")[2]) {
        var alreadyBound;
        var rowCategory = 0;

        $("#grid-controls").after('<div class="BL_wepContainer"></div>');
        $("#items-select-menu .row-tight:not(#grid-controls, .items-category)")
            .addClass("BL_wep-rows");
        $("#items-select-menu .items-category:not(#grid-controls)")
            .addClass("BL_wep-category-header")
            .each(function (index) {
                var category = $(this).find("h1").html();
                $(".BL_wepContainer").append(
                    '<div class="BL_wepSelect" data-bl_weaponcategory="' + index + '">' + category + '</div>'
                );
            });
        $(".BL_wep-rows, .BL_wep-category-header").each(function () {
            $(this)
                .addClass(rowCategory.toString())
                .attr("data-bl_weaponcategory", rowCategory.toString());
            if ($(this).next(".BL_wep-category-header").length) {
                rowCategory++;
            }
        });
        $(".BL_wepSelect").each(function (index) {
            var category = $(this).attr("data-bl_weaponcategory");
            $(this).click(function (e) {
                if (e.ctrlKey && $(this).hasClass("BL_active")) {
                    $('.BL_wep-rows[class*="' + category + '"] , .BL_wep-category-header[class*="' + category + '"]').toggleClass("hideThis");
                    $(this).toggleClass("BL_active");
                } else if (!$(this).hasClass("BL_active")) {
                    $('.BL_wep-rows[class*="' + category + '"] , .BL_wep-category-header[class*="' + category + '"]').toggleClass("hideThis");
                    $(this).toggleClass("BL_active");
                }
                if (!e.ctrlKey) {
                    $('.BL_wep-rows:not(.' + category + ') , .BL_wep-category-header:not(.' + category + ')').addClass("hideThis");
                    $('.BL_wepSelect[data-bl_weaponcategory!="' + category + '"]').removeClass("BL_active");
                }
            });
        });
        var activeCategory = $(".BL_wep-rows .active").closest(".BL_wep-rows").attr("data-bl_weaponcategory");
        $('.BL_wep-rows[data-bl_weaponcategory!="' + activeCategory + '"] , .BL_wep-category-header[data-bl_weaponcategory!="' + activeCategory + '"]')
            .addClass("hideThis");
        $('.BL_wepSelect[data-bl_weaponcategory="' + activeCategory + '"]').addClass("BL_active");
    }
    /*
     * Loadout Paints Rework
     */
    if ($(".BL_wepSelect:first").text() == "MISC") {
        GM_addStyle("\
            .BL_items-select-item-content {\
            padding: 0 !important;\
            }\
            .BL_items-select-item-image {\
            vertical-align:text-top !important;\
			padding-top: 19px;\
            }\
            .BL_items-select-item-content {\
            height: 125px !important;\
            }\
            .BL_items-select-item-name {\
            position: absolute;\
            z-index: 1;\
            width: 229px;\
            bottom: 0;\
			background-color: rgba(0,0,0,0);\
            }\
            .items-select-item.active .BL_items-select-item-name {\
            	background-color:rgba(255,255,255, 1) !important;\
            }\
            .BL_item-unlock-info-span {\
            display: none;\
            }\
            .BL_battlepack-unlock-span {\
            display: none;\
            }\
            .BL_battlepack-unlock {\
            margin-bottom: -2px;\
            }");
        $(".box-content.items-select-item-content").addClass("BL_items-select-item-content");
        $(".items-select-item-image").addClass("BL_items-select-item-image");
        $("#items-select-menu .items-select-item .items-select-item-content").addClass("BL_items-select-item-content");
        $("#items-select-menu .items-select-item .items-select-item-name").addClass("BL_items-select-item-name").css("background-color", "rgba(0,0,0,0)");
        $("#items-select-menu .items-select-item .item-unlock-info span").addClass("BL_item-unlock-info-span");
        $("#items-select-menu .items-select-item.locked.battlepack .battlepack-unlock span").addClass("BL_battlepack-unlock-span");
        $("#items-select-menu .items-select-item.locked.battlepack .battlepack-unlock").addClass("BL_battlepack-unlock");
    }
    /*
     * ENDLoadout Paints Rework
     */
});

/*
 * END Item Select Menu Changes
 */

/*
 * Loadout Kit Loadout Changes
 */

GM_addStyle("\
#loadout .loadout-item-container {\
margin-bottom: 2px;}\
");

/*
 * END Loadout Kit Loadout Changes
 */

/*
 * Awards Page Changes
 */
GM_addStyle(
    "ul.awards-list>li {\
    	height: auto !important;\
		overflow: hidden;}\
    ul.awards-list .award-medal {\
        margin-top: -4px;\
        height: 97px !important;}\
    ul.awards-list .award-ribbon {\
        height: 39px !important;}\
    ul.awards-list .award-ribbon div {\
        margin-top: -29px;}\
");

/*
 * BBL Changes
 */
GM_addStyle(".bblog-local-comment textarea {border: 0;}");
/*
 * END BBL Changes
 */

//Styles

GM_addStyle("\
    .BL_nextTwo {\
    margin-top: 1px;\
    width: 100%;\
    }\
	.BL_nextTwo ul {\
height: 63px; \
width: 117px;\
background-size: 117px 63px;\
	}\
.BL_next{\
float: left;\
}\
.BL_nextNext{\
float: right;\
}\
.BL_nextTwo ul li:first-child { \
color:#ddd !important;\
font-size: 10px;\
margin-top: 41px;\
text-align: right;\
padding-right: 2px;\
background-color:rgba(0,0,0,0.6)\
}\
.BL_nextTwo ul li:last-child { \
color:#fff;\
font-size: 12px;\
font-weight: bold;\
text-align: right;\
padding-right: 2px;\
background-color:rgba(0,0,0,0.8)\
}\
.BL_quick-info:hover {\
text-shadow: 0px 0px 5px rgba(255, 255, 255, 1) !important;\
}\
");

waitForKeyElements("#serverbrowser-show .quick-info", function (jNode) {
    //add HTML
    var getServer, serverGUID, serverURL;
    $(jNode)
        .addClass("BL_quick-info")
        .after('\
        <div class="BL_nextTwo">\
            <ul class="BL_next">\
                <li></li>\
                <li></li>\
            </ul>\
        	<ul class="BL_nextNext">\
                <li></li>\
                <li></li>\
            </ul>\
        </div>\
	');
    console.log("HTML added");

    serverGUID = $("#serverbrowser-results .servers-list .active").attr("data-guid");

    jGetServerInfo(serverGUID).done(function (serverInfo) {
        console.log("boogyboogy", serverInfo);

        $("ul.BL_next").css("background-image", "url(" + serverInfo.next.image + ")");
        $("ul.BL_nextNext").css("background-image", "url(" + serverInfo.nextNext.image + ")");
        $("ul.BL_next li:first").text(serverInfo.next.mode);
        $("ul.BL_nextNext li:first").text(serverInfo.nextNext.mode);
        $("ul.BL_next li:last").text(serverInfo.next.map);
        $("ul.BL_nextNext li:last").text(serverInfo.nextNext.map);
    });

    //wrap map pic in link to full serverinfo
    serverURL = "http://battlelog.battlefield.com/bf4/servers/show/pc/" + serverGUID;
    $(jNode).wrap('<a href="' + serverURL + '"></a>');
    $("#serverbrowser-show footer a").addClass("hideThis");
});
//wait for BBL comment area and move it before
waitForKeyElements("#serverbrowser-show .bblog-local-comment", function (jNode) {
    //$(jNode).before($(".BL_nextTwo"));    
});