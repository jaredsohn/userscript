// ==UserScript==
// @name           Bungie Group Watcher
// @namespace      Iggyhopper
// @description    Allows you to monitor a group forum for new posts.
// @include        http://*bungie.net/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @require        http://central.gsmcms.com/js/jquery/jquery.flydom-3.1.1.js
// ==/UserScript==

function Main()
{
    if (document.getElementById("ctl00_dashboardNav_passportSignInLink")) return;
    if (Url.search(/profile\.aspx[^.]/i) == -1 && Url.search(/profile/i) != -1)
    {
        GM.Style("#BGW_Save { background-color: #1B1D1F; border: 1px solid #5C5D5F; color: #A3A3A4; }");
        GM.Style("#BGW_Save:hover { background-color: #17668A; border: 1px solid #56AACD; color: #DCE8EE; }");
        //console.log("Url Match: /profile\.aspx[^.]/i");
        var $ProfilePanel = $("#ctl00_mainContent_profilePanel");
        var $AboutMePanel = $ProfilePanel.find("div.boxD_outer:last");
        var $BGWPanel = $AboutMePanel.clone();
        $BGWPanel.find("div.boxD_inner > div.boxD > h3").image(http://www.bungie.net/images/base_struct_images/search/forums.gif)text("Group Watcher 1.0");
        $BGWPanel.find("div.boxD_inner > div.boxD > div").text("")
        .createAppend("span", {style: "bottom: 1px; position: relative;"}, "Group Home Url: ").parent()
        .createAppend("input", {id: "BGW_GroupHomeUrl", size: "64", style: "background-color: #1B1D1F; border: 1px solid #5C5D5F; color: #A3A3A4;", type: "text", value: GM.GroupHomeUrl}).parent()
        .createAppend("br").parent()
        .createAppend("br").parent()
        .createAppend("a", {href: "javascript:void(0);", id: "BGW_Save", onclick: function()
        {
            var T = this; this.textContent = "Loading.";
            GM.Request({url: $("#BGW_GroupHomeUrl").val(), method: "get", onload: function(Response)
            {
                T.textContent += ".";
                var M = Response.responseText.match(/ctl00_groupForumsLink" href="(.+)"/);
                if (M.length == 0) return alert("There was an error, make sure the url was enteed correctly.");
                var ForumUrl = "http://www.bungie.net" + M[1];
                GM.Request({url: ForumUrl, method: "get", onload: function(Response2)
                {
                    T.textContent += ".";
                    try
                    {
                        var $Body = $(Response2.responseText.split(/(<body>|<\/body>)/ig)[0]);
                        var $ThreadTable = $Body.find("#ctl00_mainColPanel").find("table").clone();
                        $ThreadTable.find("tr:gt(2)").remove();
                        GM.Set("ThreadTableHtml", "<table class='grid' style='margin: 0px;'>" + $ThreadTable.attr("innerHTML") + "</table>");
                        GM.Set("GroupForumUrl", ForumUrl);
                        T.textContent += ".";
                    }
                    catch (E)
                    {
                        T.textContent = "Save";
                        console.log(E);
                        return alert("There was an error, make sure you are a member of the group you have selected.");
                    }
                    T.textContent = "Save";
                    alert("Settings Saved");
                }});
                //console.log(Response)
            }});
            GM.Set("GroupHomeUrl", $("#BGW_GroupHomeUrl").val());
        }, style: "padding: 1px 12px; text-decoration: none;"}, "Save");
        $BGWPanel.appendTo($AboutMePanel.parent());
    }
    
    
    // Default Behaviour
    // Check Last Time, if more then 5 minutes, get list of threads and update
    $(".list-db:eq(1)").createAppend("ul", {class: "dbItems_list"},
    [
        "li", {},
        [
            "a", {id: "BGW_ThreadLink", href: "javascript:void(0);", style: GM.New ? "color: #D76447;" : "", onclick: function()
            {
                $("#BGW_ThreadContainer").stop(true, true).toggle("slow");
                GM.Set("New", false);
                this.style.color = "";
            }}, "Group Watcher"
        ]
    ]).parent().createAppend("br")
    .parent().createAppend("br")
    .parent().createAppend("div", {id: "BGW_ThreadContainer", style: "background-color: #000000; border: 1px solid #FFFFFF; cssFloat: left; padding-top: 1px; text-align: left; position: absolute; right: 0px; width: 700px; z-index: 9999;"}, GM.ThreadTableHtml).hide();
    
    
    var Now = +new Date();
    //console.log(Now - GM.LastCheck, GM.GroupForumUrl);
    if (Now - GM.LastCheck > 300000 && GM.GroupForumUrl != "")
    {
        console.log("Downloading threads...");
        GM.Request({url: GM.GroupForumUrl, method: "get", onload: function(Response)
        {
            var $Body = $(Response.responseText.split(/(<body>|<\/body>)/ig)[0]);
            var $ThreadTable = $Body.find("#ctl00_mainColPanel").find("table").clone();
            $ThreadTable.find("tr:gt(2)").remove();
            if (GM.ThreadTableHtml != "<table class='grid' style='margin: 0px;'>" + $ThreadTable.attr("innerHTML") + "</table>")
            {
                $("#BGW_ThreadLink").css("color", "#D76447");
                GM.Set("New", true);
            }
            GM.Set("ThreadTableHtml", "<table class='grid' style='margin: 0px;'>" + $ThreadTable.attr("innerHTML") + "</table>");
            $("#BGW_ThreadContainer").html("<table class='grid' style='margin: 0px;'>" + $ThreadTable.attr("innerHTML") + "</table>");
            GM.Set("LastCheck", +new Date() + "");
        }});
    }
}

var GM =
{
    Get: GM_getValue,
    GroupHomeUrl: GM_getValue("GroupHomeUrl", ""),
    GroupForumUrl: GM_getValue("GroupForumUrl", ""),
    ThreadTableHtml: GM_getValue("ThreadTableHtml", ""),
    LastCheck: GM_getValue("LastCheck", 0),
    New: GM_getValue("New", true),
    Set: GM_setValue,
    Style: GM_addStyle,
    Request: GM_xmlhttpRequest
};

var Url = location.href;

Main();