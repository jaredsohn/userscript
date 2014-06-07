// ==UserScript==
// @name       HackForums Design Costumizer
// @namespace  http://megaviews.net/
// @version    0.7.2
// @description  Allows you to change the Design of HF.
// @include      *hackforums.net*
// @exclude     *x.hackforums.net*
// @exclude     *hackforums.net:8080*
// @require      http://code.jquery.com/jquery-1.10.2.min.js
// @copyright  2013, 1n9i9c7om
// @grant      GM_setValue
// @grant      GM_getValue
// @grant      GM_deleteValue
// @grant      GM_xmlhttpRequest
// @grant      GM_addStyle
// @run-at document-start
// ==/UserScript==

function isNumber(n) {
    //Not made by me, but helpful. http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function getName() {
    var username;
    $.ajax({
        async: false,
        type: 'GET',
        url: 'http://www.hackforums.net/member.php?action=profile&anticache=' + new Date().getTime(),
        success: function (data) {
            username = $(data).find(".active").text().replace("Profile of", "");
        }
    });
    return username;
}

function changeUserbars()
{
    $("img[src^='http://x.hackforums.net/images/modern_pl/groupimages/english/']").each(function() {
        $(this).attr("src", $(this).attr("src").replace("/modern_pl/", "/blackreign/"));
    });
}

function addSnow()
{
    console.log("opacity:" + GM_getValue("snowopacity").toString() + ";");
    $("body").prepend('<div id="snow"></div>');
    GM_addStyle("#snow {pointer-events:none;-webkit-mask-image: -webkit-gradient(linear, left 90%, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));background-image: url('http://i.imgur.com/vYfNXKA.png');height:100%;width: 100%;left: 0;top: 0;position: fixed;-webkit-animation: snow 30s linear infinite;animation: snow 10s linear infinite;opacity:" + GM_getValue("snowopacity").toString() + ";}@keyframes snow {0% {background-position: 0px 0px;}50% {background-position: 500px 500px;}100% {background-position: 500px 1000px;}}@-webkit-keyframes snow {0% {background-position: 0px 0px;}50% {background-position: 500px 500px;}100% {background-position: 500px 1000px;}}");
}

function changeStyle() {
    var url = document.location.href;
    switch (GM_getValue("colorscheme")) {
    case "green":
        try {
            GM_addStyle("body{background:#000 url(http://megaviews.net/hf/designcostumizer/themes/green/mosaic.png) fixed}.menu ul{background:#006300!important}.menu ul a:active,.menu ul a:hover{color:#42FF77}a:active,a:hover{color:#A9FF99}.navButton:hover{color:#99F;border-top:1px solid #50DD00;background:#268600}#panel{border:1px solid #006300}.shadetabs li a{background-color:#0B4700;box-shadow:0 1px 0 0 #1B8F05 inset!important}.shadetabs li a.selected,.shadetabs li a:hover{color:#75FF62;background:#086600}.tborder,.thead{background:#0B4700}.bottommenu{border:1px solid #006300}.tfoot{background:#0B4700}.pagination .pagination_current{background:#006300}.pagination a:hover{background:#006300;color:#A9FF99}.pagination a{background-color:#083600}.bitButton,.button{background-color:#083600;box-shadow:0 1px 0 0 #006300 inset!important}.bitButton:hover,.button:hover,.navigation a:active,.navigation a:hover,.tcat a:active,.tcat a:hover,.tfoot a:active,.tfoot a:hover{color:#A9FF99}a.subject_new:hover{color:#20BB45}.pm_alert {border-top: 1px solid #006300;border-bottom: 1px solid #006300;}");
            //$('head').append('<link href="http://megaviews.net/hf/designcostumizer/themes/green/green.css" rel="stylesheet" type="text/css" />');
        } catch (err) {}

        $('img').prop('src', function (_, src) {
            return src.replace('http://x.hackforums.net/images/modern_pl/minion.gif', 'http://megaviews.net/hf/designcostumizer/themes/green/minion.png');
        });
            

        console.log("Style changed to green!");
        break;
    case "pink":
        try {
            GM_addStyle("body{background:#000 url(http://megaviews.net/hf/designcostumizer/themes/pink/mosaic.png) fixed}.menu ul{background:#910080!important}.menu ul a:active,.menu ul a:hover{color:#FF7BEF}a:active,a:hover{color:#FF99EB}.navButton:hover{color:#99F;border-top:1px solid #FF7BEF;background:#D300CA}#panel{border:1px solid #910080}.shadetabs li a{background-color:#910080;box-shadow:0 1px 0 0 #FF3AFF inset!important}.shadetabs li a:hover{color:#FF99EB;background:#C700A7}.shadetabs li a.selected{color:#FF7BEF;background:#C700A7}.tborder,.thead{background:#910080}.bottommenu{border:1px solid #910080}.pagination .pagination_current,.tfoot{background:#910080}.pagination a:hover{background:#910080;color:#FF99EB}.pagination a{background-color:#530039}.bitButton,.button{background-color:#910080;box-shadow:0 1px 0 0 #FF3AFF inset!important}.bitButton:hover,.button:hover,.navigation a:active,.navigation a:hover,.tcat a:active,.tcat a:hover,.tfoot a:active,.tfoot a:hover{color:#FF99EB}a.subject_new:hover{color:#FF99EB}.pm_alert {border-top: 1px solid #910080;border-bottom: 1px solid #910080;}");
            //$('head').append('<link href="http://megaviews.net/hf/designcostumizer/themes/pink/pink.css" rel="stylesheet" type="text/css" />');
        } catch (err) {}

        $('img').prop('src', function (_, src) {
            return src.replace('http://x.hackforums.net/images/modern_pl/minion.gif', 'http://megaviews.net/hf/designcostumizer/themes/pink/minion.png');
        });
        console.log("Style changed to pink!");
        break;
    case "red":
        try {
            GM_addStyle("body{background:#000 url(http://megaviews.net/hf/designcostumizer/themes/red/mosaic.png) fixed}.menu ul{background:#800!important}.menu ul a:active,.menu ul a:hover,a:active,a:hover{color:#FF4949}.navButton:hover{color:#99F;border-top:1px solid red;background:#AD0000}#panel{border:1px solid #800}.shadetabs li a{background-color:#800;box-shadow:0 1px 0 0 red inset!important}.shadetabs li a.selected,.shadetabs li a:hover{color:#FF4949;background:#C00017}.tborder,.thead{background:#800}.bottommenu{border:1px solid #800}.pagination .pagination_current,.tfoot{background:#800}.pagination a:hover{background:#800;color:#FF4949}.pagination a{background-color:#610000}.bitButton,.button{background-color:#610000;box-shadow:0 1px 0 0 #800 inset!important}.bitButton:hover,.button:hover,.navigation a:active,.navigation a:hover,.tcat a:active,.tcat a:hover,.tfoot a:active,.tfoot a:hover{color:#FF4949}a.subject_new:hover{color:#FF4949}.pm_alert {border-top: 1px solid #800;border-bottom: 1px solid #800;}");
            //$('head').append('<link href="http://megaviews.net/hf/designcostumizer/themes/red/red.css" rel="stylesheet" type="text/css" />');
        } catch (err) {}

        $('img').prop('src', function (_, src) {
            return src.replace('http://x.hackforums.net/images/modern_pl/minion.gif', 'http://megaviews.net/hf/designcostumizer/themes/red/minion.png');
        });
        console.log("Style changed to red!");
        break;
    case "christmas":
        try {
            GM_addStyle("body{background:#000 url(http://megaviews.net/hf/designcostumizer/themes/christmas/mosaic.png) fixed}.menu ul{background:#800!important}.menu ul a:active,.menu ul a:hover,a:active,a:hover{color:#20BB45}.navButton:hover{color:#99F;border-top:1px solid red;background:#AD0000}#panel{border:1px solid #800}.shadetabs li a{background-color:#800;box-shadow:0 1px 0 0 red inset!important}.shadetabs li a.selected,.shadetabs li a:hover{color:#20BB45;background:#C00017}.tborder,.thead{background:#800}.bottommenu{border:1px solid #800}.pagination .pagination_current,.tfoot{background:#800}.pagination a:hover{background:#800;color:#20BB45}.pagination a{background-color:#610000}.bitButton,.button{background-color:#083600;box-shadow:0 1px 0 0 #006300 inset!important}.bitButton:hover,.button:hover,.navigation a:active,.navigation a:hover,.tcat a:active,.tcat a:hover,.tfoot a:active,.tfoot a:hover{color:#20BB45}a.subject_new:hover{color:#20BB45}.pm_alert {border-top: 1px solid #800;border-bottom: 1px solid #800;}");
            //$('head').append('<link href="http://megaviews.net/hf/designcostumizer/themes/christmas/christmas.css" rel="stylesheet" type="text/css" />');
        } catch (err) {}

        $('img').prop('src', function (_, src) {
            return src.replace('http://x.hackforums.net/images/modern_pl/minion.gif', 'http://megaviews.net/hf/designcostumizer/themes/christmas/minion.png');
        });
        console.log("Style changed to christmas!");
        break;
    default:
        break;
    }

}

function injectMenu() {
    $('head').append('<style>.usercp_nav_modifytheme { padding-left: 40px; background: url(http://i.imgur.com/RszdOci.png) no-repeat left center; }</script>');
    $("#usercpprofile_e .trow1.smalltext").last().append('<div><a href="usercp.php?action=edittheme" class="usercp_nav_item usercp_nav_modifytheme">Modify Theme</a></div>');
}

function saveSettings() {
    if ($("#onoff").is(':checked')) {
        GM_setValue("us_enabled", true);
    } else {
        GM_setValue("us_enabled", false);
    }
    if ($("#removetext").is(':checked')) {
        GM_setValue("removetext", true);
    } else {
        GM_setValue("removetext", false);
    }
    if ($("#movetime").is(':checked')) {
        GM_setValue("movetime", true);
    } else {
        GM_setValue("movetime", false);
    }
    if ($("#addlogo").is(':checked')) {
        GM_setValue("addlogo", true);
    } else {
        GM_setValue("addlogo", false);
    }
    if ($("#logourl").val() != "") {
        GM_setValue("logourl", $("#logourl").val());
    } else {
        GM_setValue("logourl", "");
    }
    if ($("#snoweffect").is(':checked')) {
        GM_setValue("snoweffect", true);
    } else {
        GM_setValue("snoweffect", false);
    }
    if (isNumber($("#snowopacity").val())) {
        GM_setValue("snowopacity", $("#snowopacity").val());
    } else {
        GM_setValue("snowopacity", 0.3);
    }
    GM_setValue("colorscheme", $('#colorscheme').find(":selected").val());
    if ($("#oldUserbars").is(':checked')) {
        GM_setValue("oldUserbars", true);
    } else {
        GM_setValue("oldUserbars", false);
    }
}

function setSelected() {
    if (GM_getValue("us_enabled") == true) {
        $("#onoff").prop('checked', true);
    }
    if (GM_getValue("removetext") == true) {
        $("#removetext").prop('checked', true);
    }
    if (GM_getValue("movetime") == true) {
        $("#movetime").prop('checked', true);
    }
    if (GM_getValue("addlogo") == true) {
        $("#addlogo").prop('checked', true);
    }
    if ((GM_getValue("logourl") != null) && (GM_getValue("logourl") != "")) {
        $("#logourl").val(GM_getValue("logourl"));
    }
    console.log("Colorscheme: " + GM_getValue("colorscheme"));
    if (GM_getValue("colorscheme") != null) {
        $("#colorscheme").val(GM_getValue("colorscheme")).prop('selected', true);
    }
    if (GM_getValue("snoweffect") == true) {
        $("#snoweffect").prop('checked', true);
    }
    $("#snowopacity").val(GM_getValue("snowopacity"));
    if (GM_getValue("oldUserbars") == true) {
        $("#oldUserbars").prop('checked', true);
    }
}

function editTheme() {
    if (GM_getValue("us_enabled") == true) {
        if (GM_getValue("removetext") == true) {
            //document.getElementsByClassName('largetext')[0].innerHTML = document.getElementsByClassName('largetext')[0].innerHTML.replace("Welcome to HackForums.net", "&nbsp;");
            try {
                $(".largetext").first().html($(".largetext").first().html().replace("Welcome to HackForums.net", "&nbsp;"));
            } catch (err) {
                //console.log(err.message)
            }
        }
        if (GM_getValue("movetime") == true) {
            try {
                $("#panel").html($("#panel").html().replace(">Log Out</a>)", ">Log Out</a>)" + $(".largetext").first().html().replace("Welcome to HackForums.net", "&nbsp;")));
                $(".largetext").first().html("");
            } catch (err) {
                //console.log(err.message)
            }
            //document.getElementById('panel').innerHTML = document.getElementById('panel').innerHTML.replace(">Log Out</a>", ">Log Out</a>" + document.getElementsByClassName('largetext')[0].innerHTML);
            //document.getElementsByClassName('largetext')[0].innerHTML = document.getElementsByClassName('largetext')[0].innerHTML = "";
        }
        console.log("addlogo: " + GM_getValue("addlogo"));
        console.log(GM_getValue("logourl"));
        if (GM_getValue("addlogo") == true) {
            //TO-DO: Detect x.hf.net and hf.net:8080
            try {
                
                $("#header .logo img[src*='hackforums.net'][src*='logo']").attr("src", GM_getValue("logourl"));
            } catch (err) {
                console.log(err.message)
            }
        }
    }
}

function displaySettingsPage() {
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://megaviews.net/hf/designcostumizer/modify.html?anticache=" + new Date().getTime(),
        onload: function (response) {
            document.documentElement.innerHTML = response.responseText;
            document.title = "Hack Forums - Change Theme";
            GM_xmlhttpRequest({
                method: "GET",
                url: "http://megaviews.net/hf/designcostumizer/news.html?anticache=" + new Date().getTime(),
                onload: function (response) {
                    $("#news").html(response.responseText);
                },
            });
            if(GM_getValue("us_enabled") == true)
            {
            changeStyle();
            }
            setSelected();
            if(GM_getValue("us_enabled") == true)
            {
            editTheme();
            if(GM_getValue("snoweffect") == true)
            {
                addSnow();
            }
            }
            injectMenu();
            document.getElementById('panel').innerHTML = document.getElementById('panel').innerHTML.replace("%MEMBER%", getName()); //TO-DO? jQuery?
        },
    });
    $(document).on('click', '#submittheme', function () {
        saveSettings();
        alert("Your settings have been saved.");
    });
}

function main() {
    if(!GM_getValue("snowopacity"))
    {
        GM_setValue("snowopacity", 0.3);   
    }
    var url = document.location.href;
    if (url.indexOf("edittheme") > -1) {
        displaySettingsPage();
    }
    if(GM_getValue("us_enabled") == true)
    {
        editTheme();
        changeStyle();
    }
}

main();

$(document).ready(function() {
    var url = document.location.href;
    if ((url.indexOf("usercp.php") > -1) || (url.indexOf("private.php") > -1)) {
        injectMenu();
    }
    //main(); //I know, main(); runs twice, but it's a hotfix. Otherwise it wouldn't work somehow. Will look into it later.
    if(GM_getValue("us_enabled") == true)
    {
    changeStyle();
    editTheme();
    if(GM_getValue("snoweffect") == true)
    {
        addSnow();
    }
    if(GM_getValue("oldUserbars") == true)
    {
        changeUserbars()
    }
    }
});