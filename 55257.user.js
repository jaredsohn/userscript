// ==UserScript==
// @author        dazarobbo
// @modifier      JimboMonkey1234
// @name          Show Banned User ~ Modified- Anon Poster
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
		newElement.innerHTML = "<div><br /><table border='0' width='83%' align = 'right' bgcolor='#27282C'><tr><td align='left'><font color='#71CAEF'>Anonymous</font><font color='#BBBBBB'> | </font><font color='#BBBBBB'>Banned Member</font></td><td align='right'><font color='#71CAEF'>message user</font><font color='#BBBBBB'> | </font><font color='#71CAEF'>groups</font><font color='#BBBBBB'> | </font><font color='#71CAEF'>link</font><font color='#27282C'>........</font></td></tr></table></div>";		
		
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