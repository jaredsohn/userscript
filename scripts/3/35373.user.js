// ==UserScript==
// @name           QOTW REPLY
// @namespace      http://www.90Nz0.com/
// @description    This will give you a reply box on each post in b3ta's QOTW's Offtopic
// @include        http://www.b3ta.com/questions/offtopic/post*
// ==/UserScript==


function get_id()
{
	var divEls = document.getElementsByTagName("div");
	var textEl = document.getElementById("DivShop");
	var i = 0;
	var curClass;
	var curDiv;
	var theRightDiv = "";
	var arc = 0;
	var headclass = "yourmum";
	
	for(i = 0;i<divEls.length;i++) 
		{
			curClass = divEls[i].getAttribute('class');
			curDiv   = divEls[i].getAttribute('id');
			if ( curClass == "post1")
					{
						theRightDiv = theRightDiv + "|" + curDiv;
					}
			if ( curClass == "post2")
					{
						theRightDiv = theRightDiv + "|" + curDiv;
					}
			if (curClass == "posthead")
					{
						if (headclass == "yourmum")
							{
								divEls[i].setAttribute('id','questiontext');
							
							}
						
					}
					
		}
	
	document.getElementById("DivHeader").value = headclass;
	textEl.value = theRightDiv;
	// alert(headclass);
	
}




var newdiv = document.createElement('div');
var thedivtext;
newdiv.setAttribute('id','testdiv');
newdiv.innerHTML = "Gonzy's Debug....<br/><textarea id=\"DivShop\" cols=\"50\" rows=\"10\">HelloWorld</textarea><input id=\"DivHeader\" type=\"text\" value=\"123\" />";
newdiv.style.display = "none";
document.getElementById('navbar').appendChild(newdiv);

get_id();

var mydivshop = document.getElementById('DivShop').value;
var dsa = mydivshop.split("|");
var dvi = 0;
var dEle;
var curHTML;
var mygirl;
var myPropa;

for (dvi = 1;dvi < dsa.length;dvi++)
	{
		 mygirl = dsa[dvi];
		 myPropa = mygirl.split("-");
		 dEle = document.getElementById(mygirl);
		 
		 curHTML = dEle.innerHTML + " &nbsp; &nbsp; &nbsp; &nbsp; <a href=\"/questions/write.php?parent=" + myPropa[2] + "\"><b>Reply</b></a>";
		 
		 dEle.innerHTML = curHTML;
	
	}

document.getElementById('questiontext').innerHTML = "<div style=\"float:right;\"> \n <script type=\"text/javascript\"><!-- \n google_ad_client = \"pub-4758678555325924\"; \n google_ad_width = 468; \n google_ad_height = 60; \n google_ad_format = \"468x60_as\"; \n google_ad_type = \"text\"; \n google_ad_channel =\"8146614400\"; \n google_color_border = \"CCCCCC\"; \n google_color_bg = \"FFFFFF\"; \n google_color_link = \"000000\"; \n google_color_url = \"666666\"; \n google_color_text = \"333333\"; \n //--></script> \n <script type=\"text/javascript\" \n   src=\"http://pagead2.googlesyndication.com/pagead/show_ads.js\"> \n </script> \n </div> \n  \n  \n 	<a href=\"/questions/offtopic/\"><img src=\"/images/board_posticon.gif\" width=\"13\" height=\"16\" alt=\"This is a question\"></a> <b>Off Topic</b><br> \n 	<br> \n  \n 	Are you a QOTWer? Do you want to start a thread that isn't a direct answer to the current QOTW? Do you know that if you post on /talk you'll get told to piss off back to QOTW? Then this place, gentle poster, is your friend, just like gonzo, who is also your friend.... He's your BEST friend. You should buy him fags and booze, I think he would like that. <br> \n 	<br> \n 	(<span class=\"byline\"><a href=\"/features/appeal/\" class=\"usericon\" rel=\"nofollow\" title=\"I helped save b3ta!\"><img src=\"/images/icons/prodigy69_cheerybeetiems.gif\" alt=\"I helped save b3ta!\"></a> <a href=\"/users/profile.php?id=11\" class=\"username\">rob</a></span> & <a href=\"/users/profile.php?id=12899\" class=\"username\">Gonzo</a>, Sun 1 Apr 2001, 0:00) \n ";
