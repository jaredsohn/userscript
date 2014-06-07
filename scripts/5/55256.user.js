// ==UserScript==
// @name          Show banned user
// @description   Placeholder that identifies a post which is hidden
// @include       http://*.bungie.net/*orums/posts.aspx?postID=*
// @include	  http://*.bungie.net/*anclub/*/*orums/posts.aspx?postID=*

// ==/UserScript==

var i=1
for (i=1;i<=25;i++)
{

	i = String(i);

		if (i.length === 1)
		{
		var str1="0"
		i = str1.concat(i);
		}

		//Get element
		var post_id = 'ctl00_mainContent_postRepeater1_ctl' + i  + '_ctl00_postControl_skin_PostBlock';

		try
		{
		//Attempt to find the element
		var post_id_2 = document.getElementById(post_id).innerHTML;
		}
		catch (err)
		{
		
		//If element not found, post is hidden/user is banned 
		var div_id, newElement;
		div_id = document.getElementById('ctl00_mainContent_postRepeater1_ctl' + i + '_ctl00_post_display_container');
	
   		newElement = document.createElement("div");
		newElement.innerHTML = "<div><br /><table border='0' width='100%' bgcolor='blue'><tr><td align='center'><font color='white'>Banned User posted here</font></td></tr></table></div>";		
		
			try
			{
			div_id.parentNode.insertBefore(newElement, div_id.nextSibling);
			}
			catch (err)
			{
			// Next i
			}
		}
}