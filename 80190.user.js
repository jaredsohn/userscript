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
        GM.Style(".BGW_Input { background-color: #1B1D1F; border: 1px solid #5C5D5F; color: #A3A3A4; margin-bottom: 3px; }");
        GM.Style("select.BGW_Input { margin-left: 3px; }");
        //console.log("Url Match: /profile\.aspx[^.]/i");
        var $ProfilePanel = $("#ctl00_mainContent_profilePanel");
        var $AboutMePanel = $ProfilePanel.find("div.boxD_outer:contains('About Me')");
        var $BGWPanel = $AboutMePanel.clone();
        $BGWPanel.find("div.boxD_inner > div.boxD > h3").text("Group Watcher 1.1");
        $BGWPanel.find("div.boxD_inner > div.boxD > div").text("")
        .createAppend("span", {style: "bottom: 1px; position: relative;"}, "Group Home Url: ").parent()
        .createAppend("input", {class: "BGW_Input", id: "BGW_GroupHomeUrl", size: "64", type: "text", value: GM.GroupHomeUrl}).parent()
        .createAppend("br").parent()
        .createAppend("span", {}, "Forum Check Interval: ").parent()
        .createAppend("input", {class: "BGW_Input", id: "BGW_CheckInterval", size: "4", type: "text", value: GM.CheckInterval}).parent()
        .createAppend("select", {class: "BGW_Input", id: "BGW_IntervalType", size: "1"}, ["option", {}, "Minutes", "option", {}, "Hours", "option", {}, "Days"]).parent()
        .createAppend("br").parent()
        .createAppend("span", {}, "Threads Shown: ").parent()
        .createAppend("input", {id: "BGW_NumThreads", class: "BGW_Input", value: GM.NumThreads, size: "2"}, "").parent()
        .createAppend("br").parent()
        .createAppend("a", {href: "javascript:void(0);", id: "BGW_Save", onclick: function()
        {
            var T = this; this.textContent = "Loading";
            GM.Request({url: $("#BGW_GroupHomeUrl").val(), method: "get", onload: function(Response)
            {
                T.textContent += ".";
                var M = Response.responseText.match(/ctl00_groupForumsLink" href="(.+)"/);
                console.log(M);
                if (M.length == 0)
                {
                    console.log(M, Response);
                    return alert("There was an error, make sure the url was enteed correctly.");
                }
                var ForumUrl = "http://www.bungie.net" + M[1];
                var $HomeBody = $(Response.responseText.split(/(<body>|<\/body>)/ig)[0]);
                var NewsHtml = '<div style="overflow: hidden; width: 366px; float: right; word-wrap: break-word; position: relative; top: 2px; border: 2px solid #FFFFFF;" class="block-a newsblock1">'
                + $HomeBody.find("div.block-a.newsblock1").attr("innerHTML") + "</div>";
                GM.Set("NewsHtml", NewsHtml);
                GM.Request({url: ForumUrl, method: "get", onload: function(Response2)
                {
                    T.textContent += ".";
                    try
                    {
                        var $Body = $(Response2.responseText.split(/(<body>|<\/body>)/ig)[0]);
                        var $ThreadTable = $Body.find("#ctl00_mainColPanel").find("table").clone();
                        $ThreadTable.find("tr:gt(" + (GM.NumThreads - 1) + ")").remove();
                        GM.Set("ThreadTableHtml", "<table class='grid' style='margin: 0px;'>" + $ThreadTable.attr("innerHTML") + "</table>");
                        GM.Set("GroupForumUrl", ForumUrl);
                        T.textContent += ".";
                    }
                    catch (E)
                    {
                        T.textContent = "Save";
                        console.log(E, " ", ForumUrl, " ", Response2);
                        return alert("There was an error, make sure you are a member of the group you have selected.");
                    }
                    T.textContent = "Save";
                    alert("Settings Saved");
                }});
                //console.log(Response)
            }});
            GM.Set("GroupHomeUrl", $("#BGW_GroupHomeUrl").val());
            GM.Set("IntervalType", $("#BGW_IntervalType").val());
            GM.Set("CheckInterval", $("#BGW_CheckInterval").val());
            GM.Set("NumThreads", $("#BGW_NumThreads").val())
        }, style: "padding: 1px 12px; text-decoration: none;"}, "Save");
        
        $BGWPanel.appendTo($AboutMePanel.parent());
        $("#BGW_IntervalType > option:contains(" + GM.IntervalType + ")").attr("defaultSelected", true);
    }
    
    
    // Default Behaviour
    // Check Last Time, if more then [time], get list of threads and update
    if ($("ul.dbItems img").length != 0) // Conflict Resolving Code for XBL Messages script by robby
    {
        //alert("You have XBL Messages On");
        $("ul.dbItems img").parent().createAppend("li", {},
        [
            "a", {id: "BGW_ThreadLink", href: "javascript:void(0);", style: GM.New ? "color: #D76447;" : "", onclick: function()
            {
                $("#BGW_MainContainer").stop(true, true).toggle("slow").css("z-index", $("#BGW_MainContainer").css("z-index") == "0" ? "9999" : "0");
                GM.Set("New", false);
                this.style.color = "";
            }}, "Group Watcher",
            "span", null, "|"
        ])
        .parent().parent().createAppend("br")
        .parent().createAppend("br")
        .parent().createAppend("div", {id: "BGW_MainContainer", style: "background-color: 1px solid #FFFFFF; cssFloat: left; padding-top: 1px; text-align: left; position: absolute; right: 0px; width: 700px; z-index: 0;"}, 
        [
            "div", {id: "BGW_ThreadContainer", style: "border: 1px solid #FFFFFF;"}, GM.ThreadTableHtml,
            "br", {}, "",
            "div", {id: "BGW_NewsContainer", style: "border: 1px solid #FFFFFF;"}, GM.NewsHtml
        ]).hide();
    }
    else
    {
        $("div.list-db:eq(1)").createAppend("ul", {class: "dbItems_list"},
        [
            "li", {},
            [
                "a", {id: "BGW_ThreadLink", href: "javascript:void(0);", style: GM.New ? "color: #D76447;" : "", onclick: function()
                {
                    $("#BGW_MainContainer").stop(true, true).toggle("slow").css("z-index", $("#BGW_MainContainer").css("z-index") == "0px" ? "9999px" : "0px");
                    GM.Set("New", false);
                    this.style.color = "";
                }}, "Group Watcher"
            ]
        ]).parent().createAppend("br")
        .parent().createAppend("br")
        .parent().createAppend("div", {id: "BGW_MainContainer", style: "background-color: 1px solid #FFFFFF; cssFloat: left; padding-top: 1px; text-align: left; position: absolute; right: 0px; width: 700px; z-index: 9999;"}, 
        [
            "div", {id: "BGW_ThreadContainer", style: "border: 1px solid #FFFFFF;"}, GM.ThreadTableHtml,
            "br", {}, "",
            "div", {id: "BGW_NewsContainer", style: "position: relative; top: 2px;"}, GM.NewsHtml
        ]).hide()
    }
    //$("#BGW_NewsContainer").children().css("border", "1px solid #FFFFFF");
    
    var Now = +new Date();
    //console.log(Now - GM.LastCheck, GM.GroupForumUrl);
    var CalcTime = GM.IntervalType == "Minutes" ? GM.CheckInterval * 60000 : GM.IntervalType = "Hours" ? GM.CheckInterval * 3600000 : GM.IntervalType == "Days" ? GM.IntervalType * 86400000 : 300000;
    if (Now - GM.LastCheck > CalcTime && GM.GroupForumUrl != "")
    {
        GM.Request({url: GM.GroupForumUrl, method: "get", onload: function(Response)
        {
            var $Body = $(Response.responseText.split(/(<body>|<\/body>)/ig)[0]);
            var $ThreadTable = $Body.find("#ctl00_mainColPanel").find("table").clone();
            $ThreadTable.find("tr:gt(" + (GM.NumThreads - 1) + ")").remove();
            if (GM.ThreadTableHtml != "<table class='grid' style='margin: 0px; border: 2px solid #FFFFFF;'>" + $ThreadTable.attr("innerHTML") + "</table>")
            {
                $("#BGW_ThreadLink").css("color", "#D76447");
                GM.Set("New", true);
            }
            GM.Set("ThreadTableHtml", "<table class='grid' style='margin: 0px; border: 2px solid #FFFFFF;'>" + $ThreadTable.attr("innerHTML") + "</table>");
            $("#BGW_ThreadContainer").html("<table class='grid' style='margin: 0px; border: 2px solid #FFFFFF;'>" + $ThreadTable.attr("innerHTML") + "</table>");
            GM.Set("LastCheck", +new Date() + "");
        }});
    }
    
    // News needs seperate check - currently checking every hour
    if (Now - GM.LastNewsCheck > 3600000 && GM.GroupHomeUrl != "")
    {
        GM.Request({url: GM.GroupHomeUrl, method: "get", onload: function(Response)
        {
            var $Body = $(Response.responseText.split(/(<body>|<\/body>)/ig)[0]);
            var NewsHtml = '<div style="overflow: hidden; width: 366px; float: right; word-wrap: break-word; position: relative; top: 2px; border: 2px solid #FFFFFF;" class="block-a newsblock1">'
                + $Body.find("div.block-a.newsblock1").attr("innerHTML") + "</div>";
            //var $ThreadTable = $Body.find("#ctl00_mainColPanel").find("table").clone();
            //$ThreadTable.find("tr:gt(" + (GM.NumThreads - 1) + ")").remove();
            if (GM.NewsHtml != NewsHtml)
            {
                $("#BGW_ThreadLink").css("color", "#D76447");
                GM.Set("New", true);
            }
            GM.Set("NewsHtml", NewsHtml);
            $("#BGW_NewsContainer").html(NewsHtml);
            GM.Set("LastNewsCheck", +new Date() + "");
        }});
    }
}

var GM =
{
    Get: GM_getValue,
    GroupHomeUrl: GM_getValue("GroupHomeUrl", ""),
    GroupForumUrl: GM_getValue("GroupForumUrl", ""),
    ThreadTableHtml: GM_getValue("ThreadTableHtml", ""),
    NewsHtml: GM_getValue("NewsHtml", ""),
    CheckInterval: GM_getValue("CheckInterval", 5),
    IntervalType: GM_getValue("IntervalType", "Minutes"),
    NewsIntervalType: GM_getValue("NewsIntervalType", "Hours"),
    NewsCheckInterval: GM_getValue("NewsCheckInterval", 1),
    NumThreads: GM_getValue("NumThreads", 3),
    LastCheck: GM_getValue("LastCheck", 0),
    LastNewsCheck: GM_getValue("LastNewsCheck", 0),
    New: GM_getValue("New", true),
    Set: GM_setValue,
    Style: GM_addStyle,
    Request: GM_xmlhttpRequest
};

unsafeWindow.GM = GM;

var Url = location.href;

Main();

/*<div class="block-a" id="ctl00_MainContentArea_MemberQueuePanel">
	
<style>
ul.results { padding: 0; height: 20px; line-height: 15px; margin:0;}
</style>
	<h2>Group Member Queue</h2>
		<div class="list-c">
			
            
            
			
					<table cellspacing="0" cellpadding="0" border="0" class="group_member_table">
						<tbody><tr>
							<td><img width="170" height="1" border="0" src="/images/spacer.gif"/></td>
							<td><img width="170" height="1" border="0" src="/images/spacer.gif"/></td>
							<td><img width="170" height="1" border="0" src="/images/spacer.gif"/></td>
						</tr>
						<tr>
							<td><span><b>Member Name</b></span></td>
							<td><span><b>Date Requested</b></span></td>
							<td><span><b> </b></span></td>
						</tr>
				
						<tr>
							<td><span><a href="/Account/Profile.aspx?uid=433779">ODST27</a></span></td>
							<td><span>11/8/2009 11:21 PM PST</span></td>
							<td>
								<span><a href="javascript:__doPostBack('ctl00$MainContentArea$memberQueueRepeater$ctl01$LinkButton1','')" class="Accept" id="ctl00_MainContentArea_memberQueueRepeater_ctl01_LinkButton1">Accept as Member</a>  
								<a href="javascript:__doPostBack('ctl00$MainContentArea$memberQueueRepeater$ctl01$LinkButton2','')" class="Reject" id="ctl00_MainContentArea_memberQueueRepeater_ctl01_LinkButton2">Reject</a></span>
							</td>
						</tr>
				
					</tbody></table>
				
			
		</div>
	
</div>*/