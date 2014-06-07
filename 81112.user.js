// ==UserScript==
// @name           Bungie BB Inliner
// @namespace      Iggyhopper
// @description    Parses links to images and video and embeds them inside the page on bungie.net.
// @version        1.21
// @include        http://*bungie.net/*posts.aspx*
// @include        http://*bungie.net/*profile.aspx*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @require        http://central.gsmcms.com/js/jquery/jquery.flydom-3.1.1.js
// @require        http://sizzlemctwizzle.com/updater.php?id=81112
// ==/UserScript==

var gm =
{
    //filters: eval(GM_getValue("filters", '({goodFilters:["gif","jpg","png"],okayFilters:[],badFilters:[]})')),
    get: GM_getValue,
    request: GM_xmlhttpRequest,
    save: function(v) { GM_setValue(v, eval(gm[v])); },
    set: GM_setValue,
    style: GM_addStyle
};

try
{
    gm.filters = eval(GM_getValue("filters", '({goodFilters:["gif","jpg","png"],okayFilters:[],badFilters:[]})'));
}
catch (e)
{
    gm.filters = {goodFilters: ["gif", "jpg", "png"], okayFilters: [], badFilters: []};
}
//console.log(gm);

var url = location.href;

if (url.search(/profile\.aspx[^.]/i) == -1 && url.search(/profile/i) != -1)
{
    var $profilePanel = $("#ctl00_mainContent_profilePanel"), $aboutMePanel = $profilePanel.find("div.boxD_outer:contains('About Me')"), $panel = $aboutMePanel.clone(), $panelData;
    $panel.width(868).find("div.boxD_inner > div.boxD").width(867).attr("id", "BBC_Panel").css("padding-bottom", "9px").find("h3").text("BB Inliner 1.21");
    $panelData = $panel.find("div.boxD_inner > div.boxD > div").text("").css("margin", "5px");
    $panel.appendTo($aboutMePanel.parent());
    $panelData.createAppend("div", {style: "cssFloat: left;"}, null);
    $panelData.children("div")
    .createAppend("fieldset", {style: "padding: 0px 0px 5px 5px;"},
    [
        "legend", null, "Display Preferences",
        "span", null, "Allowed:&nbsp;",
        "div", {style: "display: inline; margin-right: 0px;"},
        [
            "select", {id: "BBC_GoodFilters"}, ["option", null, "(Filters)"],
            "input", {type: "button", value: "Remove"}, null,
            "div", {style: "display: inline; cssFloat: right; left: 60px; position: relative;"},
            [
                "input", {size: 12, type: "text"}, null,
                "input", {style: "margin-right: 65px;", type: "button", value: "Add"}, null
            ]
        ],
        "br", null, null,
        "span", null, "Okay:&nbsp;",
        "div", {style: "display: inline; left: 16px; margin-right: 0px; position: relative;"},
        [
            "select", {id: "BBC_OkayFilters"}, ["option", null, "(Filters)"],
            "input", {type: "button", value: "Remove"}, null,
            "div", {style: "display: inline; cssFloat: right; left: 60px; position: relative;"},
            [
                "input", {size: 12, type: "text"}, null,
                "input", {style: "margin-right: 65px;", type: "button", value: "Add"}, null
            ]
        ],
        "br", null, null,
        "span", null, "Bad:&nbsp;",
        "div", {style: "display: inline; left: 21px; margin-right: 0px; position: relative;"},
        [
            "select", {id: "BBC_BadFilters"}, ["option", null, "(Filters)"],
            "input", {type: "button", value: "Remove"}, null,
            "div", {style: "display: inline; cssFloat: right; left: 60px; position: relative;"},
            [
                "input", {size: 12, type: "text"}, null,
                "input", {style: "margin-right: 65px;", type: "button", value: "Add"}, null
            ]
        ]
    ]);
    for (var filterId in gm.filters)
    {
        console.log(filterId, " ", "BBC_" + filterId[0].toUpperCase() + filterId.substring(1));
        var $select = $("#BBC_" + filterId[0].toUpperCase() + filterId.substring(1)),
            appendString = "";
        for (var filter in gm.filters[filterId])
            appendString += "<option>" + gm.filters[filterId][filter] + "</option>";
        $select.append(appendString);
    }
    $("#BBC_Panel > div > div > fieldset > div > div > input[type='button']").click(Add_Click);
    $("#BBC_Panel > div > div > fieldset > div > input").click(Remove_Click);
}
else if (url.search(/posts\.aspx/i) != -1)
{
    //console.log("posts.aspx");
    var $links = $("ul.author_header_block").siblings("p").find("a");
    for (var i = 0; i < $links.length; ++i)
    {
        var link = $links.get(i), $link = $links.eq(i);
        if (link.host.indexOf("youtube.com") != -1 && link.search != "" && link.pathname == "/watch")
        {
            //console.log("video found");
            var $embed = $("<embed/>").attr({src: link.href.replace("/watch\?v=", "/v/").replace("&autoplay", "&a", "g")}).css({width: 400, height: 300});
            $link.replaceWith($embed);
        }
        else if (link.href.match(/\.(jpg|png|gif)$/i) || link.pathname.match(/\.(jpg|png|gif)$/i))
        {
            var goodFilterMatch = false,
                okayFilterMatch = false,
                badFilterMatch = false,
                href = link.href;
            for (var j = 0; j < gm.filters.goodFilters.length; ++j)
                if (href.indexOf(gm.filters.goodFilters[j]) != -1)
                    goodFilterMatch = true;
            for (var j = 0; j < gm.filters.okayFilters.length; ++j)
                if (href.indexOf(gm.filters.okayFilters[j]) != -1)
                    okayFilterMatch = true;
            for (var j = 0; j < gm.filters.badFilters.length; ++j)
                if (href.indexOf(gm.filters.badFilters[j]) != -1)
                    badFilterMatch = true;
            if (goodFilterMatch && !okayFilterMatch && !badFilterMatch)
                $link.replaceWith($("<img/>").attr({src: link.href, title: $link.text()}).css("max-width", "100%").error(function()
                {
                    $(this).replaceWith($("<a/>").attr({href: this.src, textContent: this.title, target: "_blank"}));
                }));
        }
    }
}

/*
    b http
    g photobucket

*/

function Add_Click()
{
    var $this = $(this),
        $select = $this.parent().siblings(":first"),
        $input = $this.prev(),
        id = $select.attr("id")[4].toLowerCase() + $select.attr("id").split("_")[1].substring(1),
        val = $input.val();
    if (val == "")
        alert("You cannot add this item.");
    else
    {
        $select.append("<option>" + val + "</option>").attr("selectedIndex", $select.children().length - 1);
        $input.val("");
        console.log(id);
        gm.filters[id].push(val);
        gm.save("filters");
    }
}

function Remove_Click()
{
    var $select = $(this).prev(),
        id = $select.attr("id")[4].toLowerCase() + $select.attr("id").split("_")[1].substring(1);
    if ($select.attr("selectedIndex") == 0)
        alert("You cannot remove this item.");
    else
    {
        $select.children(":nth(" + $select.attr("selectedIndex") + ")").remove();
        console.log(id);
        gm.filters[id].push(val);
        gm.save("filters");
    }
}