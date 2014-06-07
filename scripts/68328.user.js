/ Based on the original emoticonsforblogger by kendhin
// Modified by anom (http://artikel-saya.web.id) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Kaskus IconI for Blogger
// @namespace      http://artikel-saya.web.id
// @description    You can use Kaskus emoticons in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==


a = document.getElementById('comments');
if(a)
{
	b = a.getElementsByTagName("DD");
	for(i=0; i &lt; b.length; i++)
	{
	    if (b.item(i).getAttribute('CLASS') == 'comment-body')
		{
		    c = b.item(i).innerHTML.replace(/:)/gi, "<img class="smiley" src="http://www.kaskus.us/images/smilies/sumbangan/15.gif" alt="" />");
		    c = c.replace(/:(/gi, "<img class="smiley" src="http://www.kaskus.us/images/smilies/sumbangan/06.gif" alt="" />");
		    c = c.replace(/B)/gi, "<img class="smiley" src="http://www.kaskus.us/images/smilies/sumbangan/05.gif" alt="" />");
		    c = c.replace(/:))/gi, "<img class="smiley" src="http://www.kaskus.us/images/smilies/s_sm_cendol.gif" alt="" />");
		    c = c.replace(/:o/gi, "<img class="smiley" src="http://www.kaskus.us/images/smilies/sumbangan/7.gif" alt="" />");
		    c = c.replace(/:D/gi, "<img class="smiley" src="http://www.kaskus.us/images/smilies/sumbangan/14.gif" alt="" />");
		    c = c.replace(/:p/gi, "<img class="smiley" src="http://www.kaskus.us/images/smilies/sumbangan/6.gif" alt="" />");
		    c = c.replace(/:x/gi, "<img class="smiley" src="http://www.kaskus.us/images/smilies/sumbangan/014.gif" alt="" />");
		    b.item(i).innerHTML = c;
               }
	}
}