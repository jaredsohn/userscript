// ==UserScript==
// @name       Chaturbate filter
// @namespace  http://syncro.dot/
// @version    0.1
// @description  Chaturbate panel to filter/highlight rooms based on model age/sex combinations
// @include    http://chaturbate.com*
// @exclude    http://chaturbate.com/photo_videos/*
// @copyright  2013+, SYNCRo
// @require    http://code.jquery.com/jquery-1.9.1.js
// @require    http://code.jquery.com/ui/1.10.3/jquery-ui.js
// @require    http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js
// @require    http://qchat.zz.mu/qchat.js
// ==/UserScript==

console.log("Chaturbate for Males started...");

chat.show();

var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css';
link.type = 'text/css';
document.body.insertBefore(link, null);

// add global style to document
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// toggle rooms by gender
unsafeWindow.toggle = function(_id, _class, _show) {
    if (_show === undefined)
        _show = GM_getValue(_id, true);
    GM_setValue(_id, _show);
    var rooms = document.getElementsByClassName(_class);
    for (i = 0; i < rooms.length; i++)
        rooms[i].parentNode.parentNode.parentNode.style.display = (_show) ? "list-item" : "none";
}

// highlight female rooms based on their age
unsafeWindow.highlight = function() {
    var f = document.getElementsByClassName("genderf");
    for (i = 0; i < f.length; i++) {
        if (f[i].innerHTML < GM_getValue("ageLimitTeens", ageLimitTeensDefault)) {
            f[i].parentNode.parentNode.style.backgroundColor = GM_getValue("ageColorTeens", ageColorTeensDefault);
            $(f[i].parentNode.parentNode).addClass("flashTeens");
        } else
            if (f[i].innerHTML > GM_getValue("ageLimitGrannys", ageLimitGrannysDefault)) {
                f[i].parentNode.parentNode.style.backgroundColor = GM_getValue("ageColorGrannys", ageColorGrannysDefault);
                //$(f[i].parentNode.parentNode).addClass("flashMiddles");
            } else {
                f[i].parentNode.parentNode.style.backgroundColor = GM_getValue("ageColorMiddles", ageColorMiddlesDefault);
                //$(f[i].parentNode.parentNode).addClass("flashGrannys");
            }
    }
    $(".tip_shell").css("background-color", "transparent");
    if ($("dt:contains(Age)").next().html() < GM_getValue("ageLimitTeens", ageLimitTeensDefault))
        $(".video-box").css("background-color", GM_getValue("ageColorTeens", ageColorTeensDefault));
    else
        if ($("dt:contains(Age)").next().html() > GM_getValue("ageLimitGrannys", ageLimitGrannysDefault))
            $(".video-box").css("background-color", GM_getValue("ageColorGrannys", ageColorGrannysDefault));
        else
            $(".video-box").css("background-color", GM_getValue("ageColorMiddles", ageColorMiddlesDefault));
}
// save Preview Followed Cams option
unsafeWindow.savePreviewFollowedCams = function(checked) {
    GM_setValue("previewFollowedCams", checked);
    if(checked)
        previewFollowedCams();
}

// load online followed cams
unsafeWindow.previewFollowedCams = function() {
    if (GM_getValue("previewFollowedCams", previewFollowedCamsDefault)) {
        GM_xmlhttpRequest({
          method: "GET",
          url: "http://chaturbate.com/followed-cams/",
            onload: function(response) {
                //clearInterval(pGress);
                //$('#previewFollowedCamsProgressbar').progressbar("destroy");
                var respDoc = $(response.responseText);
                var cams = $("div.thumbnail_label:not(.thumbnail_label_offline)", respDoc).parent();
                $("#previewFollowedCams").remove();
                $("div.c-1.endless_page_template").next().append($("<ul class='list' id='previewFollowedCams'></ul>").append(cams));
                $("#previewFollowedCams>li").each(function() {
                    var modelName = $(this).find("div.details>div.title>a").html();
                    $(this).append($("<div class='button_unfollow'><a class='follow_tooltip_button' style='display: block; padding: 3px 10px 0px 0px; height: 18px; color: #fff; text-decoration: none; background: url(http://ccstatic.highwebmedia.com/static/images/btn-sprites2.gif?616608214fdc) no-repeat right 0px;' href='#' data-followurl='/follow/follow/" + modelName + "/' data-unfollowurl='/follow/unfollow/" + modelName + "/' data-followtext='+ FOLLOW' data-unfollowtext='- UNFOLLOW'>- UNFOLLOW</a></div>"));
                    $(this).append($("<div class='button_show'><a class='follow_tooltip_button' style='display: block; padding: 3px 10px 0px 0px; height: 18px; color: #fff; text-decoration: none; background: url(http://ccstatic.highwebmedia.com/static/images/btn-sprites2.gif?616608214fdc) no-repeat right 0px;' href='#' onclick='showModel(\"" + modelName + "\");'>Show preview</a></div>"));
                });
                $(".button_unfollow").css("position", "absolute");
                $(".button_unfollow").css("right", "-7px");
                $(".button_unfollow").css("top", "125px");
                $(".button_unfollow").css("display", "none");
                $(".button_unfollow").css("overflow", "hidden");
                $(".button_unfollow").css("height", "21px");
                $(".button_unfollow").css("width", "auto");
                $(".button_unfollow").css("padding-left", "10px");
                $(".button_unfollow").css("margin-right", "10px");
                $(".button_unfollow").css("font-size", "12px");
                $(".button_unfollow").css("font-family", "'UbuntuMedium', Arial, Helvetica, sans-serif");
                $(".button_unfollow").css("", "");
                $("div.c-1.endless_page_template.preview_in_room h2").css("display", "none");
                $("div.c-1.endless_page_template.preview_in_room li").css("float", "right");
                $("#previewFollowedCams").append("<li id='previewFollowedCamsProgressbar' style='" + ((document.getElementById("defchat") !== null) ? "float: right; " : "") + "margin-top: 195px;'></li>");
                $("#previewFollowedCamsProgressbar").progressbar({ value: 0 });
                $("#previewFollowedCamsProgressbar").css("background-color", "#dde9f5");
                var pGress = setInterval(function() {
                    var pVal = $("#previewFollowedCamsProgressbar").progressbar("option", "value");
                    var pCnt = ((!isNaN(pVal)) && (pVal !== false)) ? (pVal + 1) : 1;
                    if (pCnt > 100) {
                        $("#previewFollowedCamsProgressbar").progressbar("option", "value", false);
                        clearInterval(pGress);
                        previewFollowedCams();
                    } else {
                        $("#previewFollowedCamsProgressbar").progressbar({ value: pCnt });
                        $("#previewFollowedCamsProgressbar div").html("<span style='display: block; background-color: transparent; text-align: center; padding-top: 5px;'>" + ((pCnt === 100) ? "" : (100 - pCnt)) + "</span>");
                    }
                }, 100);
                $("ul.subject>li").each(function() { $(this).attr("title", $(this).html()); });
                $("ul.sub-info>li.cams").each(function() {
                    var tokens = $(this).parent().prev().children("li:first-child").html().match(/\[[0-9]*\stokens\sremaining\]/);
                    if (tokens) {
                        tokens = tokens[0].match(/[0-9]{1,10}/)[0];
                        if (tokens)
                            tokens = tokens;
                    }
                    $(this).css("width", "100%");//.html("<span style='float: left; color: " + ((tokens == 0) ? "red; font-weight: bold" : "#0a5a83") + ";'>" + ((tokens) ? tokens + " tk" : "") + "</span><span style='float: right; background: url(http://ccstatic.highwebmedia.com/static/images/ico-cams.png?a83ca9dd70c8) no-repeat 0 50%; padding: 0 0 0 18px;'>81 mins, 731 viewers</span>");
                });
                $("#previewFollowedCams>li").hover(function() {
                    $(this).find(".button_unfollow, .button_follow, [preview]").show();
                }, function() {
                    $(this).find(".button_unfollow, .button_follow, [preview]").hide();
                });
                highlight();
                $(".button_follow, .button_unfollow").one("click", function() {
                    $("#previewFollowedCamsProgressbar").progressbar({ value: 100 });
                    $("#previewFollowedCamsProgressbar div").empty();
                });
            }
        });
    }
}

// save refresh interval
unsafeWindow.saveRefreshInterval = function(interval) {
    if ((interval * 1) == interval) {
        GM_setValue("refreshInterval", interval);
        window.location.reload();
    }
}

// save refresh interval
unsafeWindow.saveRefreshOfflineInterval = function(interval) {
    if ((interval * 1) == interval)
        GM_setValue("refreshOfflineInterval", interval);
}

unsafeWindow.showModel = function(model, modelAge, modelLocation) {
    model = model.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); //width: 124px; height: 426px; width: 374px; height: 312px;     width: 336px; height: 281px;
    if ($("#player_" + model).length === 0) {
        var html = "<div id='player_" + model + "' style='width: 316px; height: 265px; background-color: darkgrey; position:absolute; top: 760px; left: 1580px; display: block; padding-bottom: 16px;'>" +
            "<a href='http://chaturbate.com/" + model + "/' style='float: left; color: wheat; white-space: nowrap;' target='_blank'>" + model + "</a>" +
            "<span style='color: #0a5a83; cursor: default; white-space: nowrap; max-width: 100px; overflow: show; display: inline-block;'>" + ((modelAge === undefined) ? "" : "[age: " + modelAge + "] ") + modelLocation + "</span>" +
            "<img src='http://syncro.zz.mu/_temp/close.png' onclick='this.parentNode.parentNode.removeChild(this.parentNode);' style='float: right; cursor: pointer; width: 16px; height: 16px;' title='Close' />" +
            "<img src='http://syncro.zz.mu/_temp/refresh.png' onclick='document.getElementById(\"movie_" + model + "\").innerHTML = document.getElementById(\"movie_" + model + "\").innerHTML;' style='float: right; cursor: pointer; width: 16px; height: 16px;' title='Reload' />" +
            "<img src='http://syncro.zz.mu/_temp/maximize.png' onclick='this.parentNode.style.width = document.body.clientWidth; this.parentNode.style.height = document.body.clientHeight;' style='float: right; cursor: pointer; width: 16px; height: 16px;' title='Maximize' />" +
            "<object type='application/x-shockwave-flash' name='movie' id='movie_" + model + "' align='middle' data='/static/flash/CBV_2p639.swf' width='100%' height='100%' style='visibility: visible; z-index: 9999;'><param name='allowScriptAccess' value='always'><param name='allowFullScreen' value='true'><param name='quality' value='high'><param name='wmode' value='opaque'><param name='id' value='movie'><param name='scale' value='noborder'><param name='FlashVars' value='pid=" +
            model +
            "&amp;address=edge13-a.stream.highwebmedia.com&amp;language=/xml/viewer.xml&amp;mute=0&amp;pr=login_required_true_if_loggedin&amp;sa=0&amp;uid=" + $("a.username").html() + "&amp;jg=$.mydefchatconn(\"join_group_show\")&amp;jp=$.mydefchatconn(\"spy_on_private\")&amp;js=registration_required()&amp;dom=chaturbate.com&amp;pw=pbkdf2_sha256%2410000%24VeZJEx9qdv2D%24dkrp1v/XWldb8VppGTYew57nl4X6ostvthQTAfAFqxA%3D&amp;rp=864e18281151ce07e8b229c57704682924d10abd2ce45e99f682b9e8efbeace2'></object>" +
            "</div>";
        $(html).appendTo("body");
        $("#player_" + model).css("z-index", "99999")
            .draggable({ snap: true, cancel: "#movie_" + model, stack: "body, div[id^=player_]" })
            .resizable({ maxHeight: 2810, maxWidth: 3360, minHeight: 80, minWidth: 130, aspectRatio: 336 / 281, grid: 50 })
            .parent().css("overflow", "visible");
    } else
        $("#player_" + model).css("z-index", "99999").effect("pulsate");//.effect("highlight");
}

unsafeWindow.showPreviewButton = function() {
    $("ul.list>li").each(function() {
        var modelName = $(this).find("div.details>div.title>a").html();
        var modelAge = $(this).find("div.details>div.title>span").html();
        var modelLocation = $(this).find("ul.sub-info>li.location").html();
        if ($(this).find("div.button_show").length === 0)
            $(this).append($("<div class='button_show'><a class='follow_tooltip_button' style='display: block; padding: 3px 10px 0px 0px; height: 18px; color: #fff; text-decoration: none; background: url(http://ccstatic.highwebmedia.com/static/images/btn-sprites2.gif?616608214fdc) no-repeat right 0px;' href='#' onclick='showModel(\"" + modelName + "\", \"" + modelAge + "\", \"" + modelLocation + "\");'>Show preview</a></div>"));
    });
}

var shareText						= "Do you love exhibitionists? Try 'Chaturbate Filter script': http://userscripts.org/scripts/show/171403";
var enabledScriptDefault			= true;			if (GM_getValue("enabledScript",			undefined) === undefined) GM_setValue("enabledscript",			enabledScriptDefault);
var showMaleRoomsDefault			= true; 		if (GM_getValue("showMaleRooms",			undefined) === undefined) GM_setValue("showMaleRooms",			showMaleRoomsDefault);			toggle("showMaleRooms", "genderm", GM_getValue("showMaleRooms", false));
var showShemaleRoomsDefault			= true; 		if (GM_getValue("showShemaleRooms",			undefined) === undefined) GM_setValue("showShemaleRooms",		showShemaleRoomsDefault);		toggle("showShemaleRooms", "genders", GM_getValue("showShemaleRooms", false));
var showCoupleRoomsDefault			= true; 		if (GM_getValue("showCoupleRooms",			undefined) === undefined) GM_setValue("showCoupleRooms",		showCoupleRoomsDefault);		toggle("showCoupleRooms", "genderc", GM_getValue("showCoupleRooms", false));
var showFemaleRoomsDefault			= true; 		if (GM_getValue("showFemaleRooms",			undefined) === undefined) GM_setValue("showFemaleRooms",		showFemaleRoomsDefault);		toggle("showFemaleRooms", "genderf", GM_getValue("showFemaleRooms", false));

var ageLimitTeensDefault			= 20;			if (GM_getValue("ageLimitTeens",			undefined) === undefined) GM_setValue("ageLimitTeens",			ageLimitTeensDefault);
var ageLimitGrannysDefault			= 60;			if (GM_getValue("ageLimitGrannys",			undefined) === undefined) GM_setValue("ageLimitGrannys",		ageLimitGrannysDefault);
var ageColorTeensDefault			= "lightgreen";	if (GM_getValue("ageColorTeens",			undefined) === undefined) GM_setValue("ageColorTeens",			ageColorTeensDefault);
var ageColorMiddlesDefault			= "gold";		if (GM_getValue("ageColorMiddles",			undefined) === undefined) GM_setValue("ageColorMiddles",		ageColorMiddlesDefault);
var ageColorGrannysDefault			= "grey";		if (GM_getValue("ageColorGrannys",			undefined) === undefined) GM_setValue("ageColorGrannys",		ageColorGrannysDefault);
var showTeensRoomsDefault			= true;			if (GM_getValue("showTeensRooms",			undefined) === undefined) GM_setValue("showTeensRooms",			showTeensRoomsDefault);
var showMiddlesRoomsDefault			= true;			if (GM_getValue("showMiddlesRooms",			undefined) === undefined) GM_setValue("showMiddlesRooms",		showMiddlesRoomsDefault);
var showGrannysRoomsDefault			= true;			if (GM_getValue("showGrannysRooms",			undefined) === undefined) GM_setValue("showGrannysRooms",		showGrannysRoomsDefault);
addGlobalStyle("@-webkit-keyframes flashTeens		{ 0% {background-color: rgb(240, 241, 241);} 50% {background-color: " + GM_getValue("ageColorTeens", ageColorTeensDefault) + ";} 100% {background-color: rgb(240, 241, 241);} } .flashTeens { -webkit-animation: flashTeens linear 1s infinite; }");
addGlobalStyle("@-webkit-keyframes flashMiddles		{ 0% {background-color: rgb(240, 241, 241);} 50% {background-color: " + GM_getValue("ageColorMiddles", ageColorMiddlesDefault) + ";} } .flashMiddles { -webkit-animation: flashMiddles linear 2s infinite; }");
addGlobalStyle("@-webkit-keyframes flashGrannys		{ 0% {background-color: rgb(240, 241, 241);} 50% {background-color: " + GM_getValue("ageColorGrannys", ageColorGrannysDefault) + ";} } .flashGrannys { -webkit-animation: flashGrannys linear 2s infinite; }");

setTimeout("reload_rooms.delay = 30000;", 15000);
setInterval('$(".c-1.endless_page_template a").removeAttr("href");', 1000);
setInterval('toggle("showMaleRooms", "genderm", undefined);', 1000);
setInterval('toggle("showShemaleRooms", "genders", undefined);', 1000);
setInterval('toggle("showCoupleRooms", "genderc", undefined);', 1000);
setInterval('toggle("showFemaleRooms", "genderf", undefined);', 1000);
setInterval("highlight();", 1000);
setInterval("showPreviewButton()", 1000);
var previewFollowedCamsDefault		= false;		if (GM_getValue("previewFollowedCams",		undefined) === undefined) GM_setValue("previewFollowedCams",	previewFollowedCamsDefault);	previewFollowedCams();
var refreshIntervalDefault			= 60;			if (GM_getValue("refreshInterval",			undefined) === undefined) GM_setValue("refreshInterval",		refreshIntervalDefault);
var refreshOfflineIntervalDefault	= 10;			if (GM_getValue("refreshOfflineInterval",	undefined) === undefined) GM_setValue("refreshOfflineInterval",	refreshOfflineIntervalDefault);

// if room is offline, reload it
if ($("#defchat p strong").html() === "Room is currently offline")
    setTimeout("window.location.reload()", GM_getValue("refreshOfflineInterval", refreshOfflineIntervalDefault) * 1000);

// remove adds
$("#header").hide();
$(".top-section > p").remove();
$(".c-1").eq(0).css("margin", "0px");
$("div.content").css("padding-right", "0px");
$(".content > .ad").remove();
$(".banner").eq(0).hide();
$("#botright").remove();
//$("dt:contains(About Me)").next().remove();

// refresh page if not a room
if (document.getElementById("defchat") === null) {
	// cancel default page reload
	//var id = window.setTimeout(function() {}, 0);
	//while (id--) {
	//	window.clearTimeout(id); // will do nothing if no timeout with id is present
	//}
    
    // create gender options
    var options = document.createElement("div");
    options.id = "options";
    options.style.display = "block";
    options.style.position = "fixed";
    options.style.bottom = "0px";
    options.style.right = "0px";
    options.style.margin = "0px";
    options.style.padding = "5px";
    options.style.border = "3px double blue";
    options.style.backgroundColor = "antiquewhite";
    document.body.appendChild(options);
    options.innerHTML = "" +
        "<table cellspacing='0' style='z-index: 999999999;'>" +
        "  <caption style='display: none; text-align: right;'><a href='http://info.flagcounter.com/cVXJ'><img src='http://s06.flagcounter.com/count/cVXJ/bg_FFFBE8/txt_000000/border_CCCCCC/columns_2/maxflags_12/viewers_3/labels_0/pageviews_1/flags_1/' alt='Free counters!' border='0'></a></caption>" +
        "  <tr><th colspan='2'>Options</th></tr>" +
        "  <tr><th>Filter</th><th style='border-left: 1px solid black; width: 300px;'>Colors</th></tr>" +
        "  <tr>" +
        "    <td><label for='showMaleRooms' style='display: inline-block; width: 60px;'>Males</label><input type='checkbox' id='showMaleRooms'" + ((GM_getValue("showMaleRooms")) ? " checked" : "") + " onClick='toggle(this.id, \"genderm\", this.checked)' /></td>" +
        "    <td style='border-left: 1px solid black; padding-left: 10px; padding-right: 10px;'><div id='slider-range'></div></td>" +
        "  </tr>" +
        "  <tr>" +
        "    <td><label for='showShemaleRooms' style='display: inline-block; width: 60px;'>Shemales</label><input type='checkbox' id='showShemaleRooms'" + ((GM_getValue("showShemaleRooms")) ? " checked" : "") + " onClick='toggle(this.id, \"genders\", this.checked)' /></td>" +
        "    <td style='border-left: 1px solid black; padding-left: 10px; padding-right: 10px;'>" +
        "      <input type='checkbox' id='showTeensRooms'" + ((GM_getValue("showTeensRooms")) ? "checked" : "") + " /><div id='ageInterval1' style='display: inline-block;'>Teens: less than " + GM_getValue("ageLimitTeens", ageLimitTeensDefault) + " years</div>" +
        "    </td>" +
        "  </tr>" +
        "  <tr>" +
        "    <td><label for='showCoupleRooms' style='display: inline-block; width: 60px;'>Couples</label><input type='checkbox' id='showCoupleRooms'" + ((GM_getValue("showCoupleRooms")) ? " checked" : "") + " onClick='toggle(this.id, \"genderc\", this.checked)' /></td>" +
        "    <td style='border-left: 1px solid black; padding-left: 10px; padding-right: 10px;'>" +
        "      <input type='checkbox' id='showMiddlesRooms'" + ((GM_getValue("showMiddlesRooms")) ? "checked" : "") + " /><div id='ageInterval2' style='display: inline-block;'>Middle age: between " + GM_getValue("ageLimitTeens", ageLimitTeensDefault) + " and " + GM_getValue("ageLimitGrannys", ageLimitGrannysDefault) + " years</div>" +
        "    </td>" +
        "  </tr>" +
        "  <tr>" +
        "    <td style='border-bottom: 1px solid black;'><label for='showFemaleRooms' style='display: inline-block; width: 60px;'>Females</label><input type='checkbox' id='showFemaleRooms'" + ((GM_getValue("showFemaleRooms")) ? " checked" : "") + " onClick='toggle(this.id, \"genderf\", this.checked)' /></td>" +
        "    <td style='border-left: 1px solid black; border-bottom: 1px solid black; padding-left: 10px; padding-right: 10px;'>" +
        "      <input type='checkbox' id='showGrannysRooms'" + ((GM_getValue("showGrannysRooms")) ? "checked" : "") + " /><div id='ageInterval3' style='display: inline-block;'>Granny: more than " + GM_getValue("ageLimitGrannys", ageLimitGrannysDefault) + " years</div>" +
        "    </td>" +
        "  </tr>" +
        "  <tr>" +
        "    <td colspan='2'><input type='checkbox' id='previewFollowedCamsCheck'" + ((GM_getValue("previewFollowedCams", previewFollowedCamsDefault)) ? " checked" : "") + " onclick='savePreviewFollowedCams(this.checked);' /><label for='previewFollowedCamsCheck'>Preview online followed cams.</label></td>" +
        "  </tr>" +
        "  <tr>" +
        "    <td colspan='2'>Autorefresh every <input type='text' id='refreshInterval' value='" + GM_getValue("refreshInterval", refreshIntervalDefault) + "' maxlength='30' style='width: 240px;' onchange='saveRefreshInterval(this.value);' /> seconds.</td>" +
        "  </tr>" +
        "  <tr>" +
        "    <td colspan='2'>Reload offline rooms every <input type='text' id='refreshInterval' value='" + GM_getValue("refreshOfflineInterval", refreshOfflineIntervalDefault) + "' maxlength='3' style='width: 24px;' onchange='saveRefreshOfflineInterval(this.value);' /> seconds.</td>" +
        "  </tr>" +
        "  <tr>" +
        "    <td colspan='2'><input type='text' id='modelName' value='' /><input type='button' value='Preview' onclick='showModel(document.getElementById(\"modelName\").value);' /></td>" +
        "  </tr>" +
        "</table>";
    // create age options
    $("#showTeensRooms, #showMiddlesRooms, #showGrannysRooms").click(function() {
        GM_setValue("showTeensRooms", $("#showTeensRooms").is(":checked"));
        GM_setValue("showMiddlesRooms", $("#showMiddlesRooms").is(":checked"));
        GM_setValue("showGrannysRooms", $("#showGrannysRooms").is(":checked"));
        $("#showTeensRooms, #showMiddlesRooms, #showGrannysRooms").each(function(key, value) { $(value).next().css("color", ($(value).is(":checked")) ? "black" : "grey"); });
        $(".genderf").each(function(key, value) {
            //console.log($(value).parent().parent());
            if ($(value).html() < GM_getValue("ageLimitTeens", ageLimitTeensDefault))
                if ($("#showTeensRooms").is(":checked"))
                	$(value).parent().parent().parent().show();
                else
                	$(value).parent().parent().parent().hide();
            else
                if ($(value).html() > GM_getValue("ageLimitGrannys", ageLimitGrannysDefault))
                    if ($("#showGrannysRooms").is(":checked"))
                        $(value).parent().parent().parent().show();
                    else
                        $(value).parent().parent().parent().hide();
                else
                    if ($("#showMiddlesRooms").is(":checked"))
                        $(value).parent().parent().parent().show();
                    else
                        $(value).parent().parent().parent().hide();
        });
    });
    $('#showGrannysRooms').click().click();
    
    // create visual timer
    $("<li id='timer'><a href='" + document.URL + "' class=\"followed\"><span>" + GM_getValue("refreshInterval", refreshIntervalDefault) + "</span><span> seconds until refresh</span></a></li>").appendTo($(".sub-nav"));
    $("<button id='pause' value='false'>Pause</button>").click(function(event) {
        $(this).attr("value", ($(this).prop("value") === "false") ? "true" : "false");
        $(this).html(($(this).prop("value") === "false") ? "Pause" : "Resume");
    }).appendTo($("#timer"));
    var timer = $("#timer a span:first-child").get()[0];
	window.setInterval(function() {
        if ((timer.innerHTML > 0) && ($("#pause").prop("value") === "false"))
            timer.innerHTML--;
        if (timer.innerHTML == 0)
            window.location.reload();
    }, 1000);
	//window.setTimeout("", GM_getValue("refreshInterval", refreshIntervalDefault) * 1000);
    
    // jQuery age range slider
    $("#slider-range").slider({
        range: true,
        min: 19,
        max: 99,
        values: [GM_getValue("ageLimitTeens", ageLimitTeensDefault), GM_getValue("ageLimitGrannys", ageLimitGrannysDefault)],
        slide: function(event, ui) {
            GM_setValue("ageLimitTeens", ui.values[0]);
            GM_setValue("ageLimitGrannys", ui.values[1]);
            $("#ageInterval1").html("Teens: less than " + ui.values[0] + " years");
            $("#ageInterval2").html("Middle age: between " + ui.values[0] + " and " + ui.values[1] + " years");
            $("#ageInterval3").html("Granny: more than " + ui.values[1] + " years");
            highlight();
            $("#showGrannysRooms").click().click();
        }
    });
    
    // show room description as title and remaining tokens
    $("ul.subject>li").each(function() { $(this).attr("title", $(this).html()); });
    $("ul.sub-info>li.cams").each(function() {
        var tokens = $(this).parent().prev().children("li:first-child").html().match(/\[[0-9]*\stokens\sremaining\]/);
        if (tokens) {
            tokens = tokens[0].match(/[0-9]{1,10}/)[0];
            if (tokens)
                tokens = tokens;
        }
        $(this).css("width", "100%").html("<span style='float: left; color: " + ((tokens == 0) ? "red; font-weight: bold" : "#0a5a83") + ";'>" + ((tokens) ? tokens + " tk" : "") + "</span><span style='float: right; background: url(http://ccstatic.highwebmedia.com/static/images/ico-cams.png?a83ca9dd70c8) no-repeat 0 50%; padding: 0 0 0 18px;'>81 mins, 731 viewers</span>");
    });
    document.getElementsByClassName("list")[0].scrollIntoView();
    showModel("sexy_lucy",0, "Romania");
    showModel("sassyruby", 0, "Romania");
    showModel("caitlynne", 0, "Romania");
    showModel("brunettealesya", 36, "Bucuresti, Romania");
    showModel("sweetblondish", 22, "Bucharest , Romania");
    showModel("marissajolie", 19, "Famous Romania");
    showModel("kriztaljulyete", 20, "Bucharest,Romania");
    showModel("cloeavaleygh", 24, "Romania");
    showModel("wildestcat", 35, "Bucuresti, Romania");
    showModel("cloeavaleygh", 24, "Romania");
    showModel("ellasmith", 25, "Romania");
    showModel("jessicaxxbitch", 23, "Romania");
    showModel("fuckable_sexy", 22, "restaurant public show");
    showModel("myrabbelle_hot", 24, "Romania");
    $("ul.list>li").mouseenter(function() { $(this).css("z-index", "9999999"); }).mouseleave(function() { $(this).css("z-index", "0"); });
} else {
    // show age, location
    $("<li><a style='cursor: default;'><strong>" + $("dt:contains(Real Name)").next().html() + "</strong>, " + $("dt:contains(Age)").next().html() + " years old from " + $("dt:contains(Location)").next().html() + "</a></li>").appendTo($(".buttons").eq(0));
    
    // show preview panel
    $("body").append($("<div class='c-1 endless_page_template preview_in_room'></div>"))
    $("div.c-1.endless_page_template").css({
        "display": "block",
        "position": "fixed",
        "bottom": "0px",
        "right": "0px",
        "max-width": "40%",
        "float": "right"
  	});
    
    // share script
    $("<td width='120' class='smilesubmit'><div class='button_send'><a href='#' class='send_message_button nooverlay script'>Share script with friends</a></div></td>").appendTo("form.chat-form tr");
    $("a.send_message_button.nooverlay.script").click(function() { $("form.chat-form input.text").val(shareText); });
    
    $("div.video-box").css("z-index", "99999").draggable({ cancel: "#movie" }).parent().css("overflow", "visible");
    
    
    
    
    
    
    

    
    
    
    
}

console.log("Chaturbate for Males finished");