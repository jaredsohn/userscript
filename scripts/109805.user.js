// ==UserScript==
// @name           GOLD TEXT!1
// @namespace      GOLD TEXT!1
// @description    Clicking the golden septagon next to a thread will (ideally) take you directly to the employee's post.
// @include        http://*bungie.net/forums/topics.aspx?forumID=*
// ==/UserScript==

var employeeIcons = document.getElementsByClassName("IBBBungieStaffIcon");
for (var i = 0; i < employeeIcons.length; i++)
{
	var link = employeeIcons[i].parentNode;
	link.addEventListener("click", 
	function() 
	{
		var thisId = this.id.substring(36,38), lastPage;
		if (document.getElementById("ctl00_mainContent_topicRepeater1_ctl"+thisId+"_ctl00_minitopicpager1"))
		{
		 var pager = document.getElementById("ctl00_mainContent_topicRepeater1_ctl"+thisId+"_ctl00_minitopicpager1"), secondLastChild = pager.children.length-1;
		 lastPage = parseInt(pager.children[secondLastChild].textContent);
		}
		else
		{
			lastPage = 1;
		}

		for (var z = 0; z < lastPage; z++)
		{
			var j = z+1, threadPageRequest = new XMLHttpRequest(), thread_href = this.href + "&postRepeater1-p="+j+"";
			threadPageRequest.open("GET", thread_href, false);
			threadPageRequest.send(null);
			var html = document.createElement("html"),
			doc = document.implementation.createDocument("", "", null);
			html.innerHTML = threadPageRequest.responseText;
			doc.appendChild(html);
			if (html.innerHTML.match(/#705c0d/i))
			{
				var postBlocks = doc.getElementsByClassName("author_header_block"), k, employeePostCtl, employeePostId;
				for (k = 0; k < postBlocks.length; k++)
				{
			 		var postBlockBackgroundColor = getComputedStyle(postBlocks[k]).backgroundColor;
					if(postBlockBackgroundColor == 'rgb(112, 92, 13)')
					{
						employeePostCtl = postBlocks[k].id.substring(35,37);
						employeePostId = doc.getElementById("ctl00_mainContent_postRepeater1_ctl"+employeePostCtl+"_ctl00_postControl_skin_hlAnchor").name;
						break;
					}
				}
				break;
			}
		}
		this.href = "javascript: void(0)";
		window.location = "http://www.bungie.net/Forums/posts.aspx?postID=" + employeePostId;
	}
, false);
}

// Not with a bang, but a whimper.