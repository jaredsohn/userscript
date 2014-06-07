// ==UserScript==
// @name           Remember, remember...
// @namespace      Remember, remember...
// @description    ... the fifth of November? Noes, just which posts you reported.
// @include        http://*bungie.net/Forums/posts.aspx?postID=*
// ==/UserScript==

var reportButton = document.getElementsByClassName('forum_post_report_button'), reportCount = localStorage.getItem("reportCount"), i;

if (reportCount)
{
		// If the report count is greater than 25, reset it. Seriously. You aren't getting any closer to becoming a moderator. You know that, right?
		if (reportCount > 25)
		{
			clearReports();
		}
		else
		{
			for (i = 0; i < reportCount; i++)
			{
				var j = i+1;
				if (document.getElementsByName(localStorage.getItem("bungiereport"+j+"")).item(0))
				{
					var ctl = document.getElementsByName(localStorage.getItem("bungiereport"+j+"")).item(0).id.substring(35,37), reportButton = document.getElementById("ctl00_mainContent_postRepeater1_ctl"+ctl+"_ctl00_postControl_skin_reportSpamButton");
					reportButton.className = "reported";
					reportButton.innerHTML = "reported";
					reportButton.href = "#";
				}
			}
		}
}
else
{
	localStorage.setItem("reportCount", 0);
	// alert("Starting new report count.");
}

for (i = 0; i < reportButton.length; i++)
{
	// Save report
	reportButton[i].addEventListener("click", 
	function()
	{
		var ctl = this.id.substring(35,37),
		postID = document.getElementById("ctl00_mainContent_postRepeater1_ctl"+ctl+"_ctl00_postControl_skin_hlAnchor").name;
		reportCount++;
		localStorage.setItem("reportCount", reportCount);
		localStorage.setItem("bungiereport"+reportCount+"", postID);
		//alert("bungiereport"+reportCount+"");
	}
, true);
}

function clearReports() 
{ 
	 for (var i = 0; i < reportCount; i++)
	 {
		var j = i+1;
		localStorage.removeItem("bungiereport"+j+"");
	 }
	 localStorage.setItem("reportCount", 0);
	 alert("Saved reports ("+reportCount+") cleared!");
}

document.getElementById("ctl00_forumSidebarPanel").getElementsByTagName("ul").item(0).innerHTML += '<li><a id="clearReports" href="javascript: void(0);">Clear Reports</a></li>';
document.getElementById("clearReports").addEventListener("click", clearReports, false);

GM_addStyle("a.reported { background: #17668A; border: 1px solid #56AACD; color: #fff; display: block; float: left; height: 20px; line-height: 20px; margin-left: 5px; padding-left: 5px; padding-right: 5px; text-align: center; text-decoration: none; width: auto; cursor: default; }");

// Between the desire and the spasm; between the potency and the existence; between the essence and the descent, falls the Shadow.	