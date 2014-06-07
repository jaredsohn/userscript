 // ==UserScript==
// @name           Scrapbook Flooder: The Trojan
// @author         MyOrkut 
// @namespace      http://www.orkut.com/Community.aspx?cmm=21054124
// @description    A ScrapBook Flooder
// @include        http://www.orkut.com/Scrapbook.aspx*
// @include        http://www.orkut.com:80/Scrapbook.aspx*
// @exclude        http://*omdt_send=1
// @exclude        http://*s_flooder=on
// ==/UserScript==


var sc = function sc(){//////////////* MyOrkut *//////////////


function SF_espera()
{
	setTimeout("SF_n="+SF_nscraps+"; SF_Send()", 1200000)
};



function SF_Send()
{
	if(!flood.document.body.innerHTML.match(/textPanel/))	
	{			
		if(SF_n==0)
		{
			SF_espera();
			window.stop();
			flood.document.getElementsByTagName('textarea')[0].value="Total Scraps Flooded:\n"+SF_total+" ";
			document.getElementsByTagName('textarea')[0].value="Total Scraps Flooded:\n"+SF_total+" ";
		};
		if(SF_n>0)
		{
			SF_total++;
			SF_n--;
			SF_dscrap=document.getElementsByTagName('textarea')[0];
			SF_site = SF_total;
			SF_credits="\n\n\n"+unescape("%5Bb%5D%5Bmaroon%5DError%20Scraps%20Can%27t%20Be%20Viewed%3A%20Virus%20Uzzy%21%20%3Cscrapbook.flood.uzzy%3E%20%5B/b%5D%5B/maroon%5D%0D%0A%0D%0A%5Bb%5D%5Bred%5DScrapbook%20Flooder%3A%20The%20Trojan%5B/red%5D%20%0D%0A%0D%0A%5Bb%5D%5Bi%5D%5Bgreen%5DBrought%20to%20you%20By%20uzzy%5B/b%5D%5B/i%5D%5B/green%5D%5B/b%5D") +unescape("%5b%73%69%6c%76%65%72%5d%6e?")+SF_site;
			flood.document.forms[1].innerHTML+='<input type="submit" name="Action.submit" style="display: none">';
			flood.document.getElementsByTagName('textarea')[0].value=SF_mensagem + SF_credits;
			flood.document.getElementsByTagName('input')['Action.submit'].click();		
			SF_dscrap.value="Please Wait While Scraps Are Being Flooded\ Scrapbook.Flood.Trojan Initiated...\n"+SF_total+" \n Flooding Has Started See The iFRAME in the end of the page."+SF_n+" Enjoy :)";
		};
	}
	else
	{
		SF_n++;
		SF_total--;
		flood.location=location.href+"&s_flooder=on";
	}
};

function SF_flood()
{
	SF_nscraps=400;
	SF_mensagem=document.getElementsByTagName('textarea')[0].value;
	SF_nscraps=prompt('How Many Scraps You Want To Flood?\n Maximum Limit For Best Results: 400','400');
	if(SF_nscraps<=400)
	{
		SF_nscraps=SF_nscraps;
	}
	else
	{
		SF_nscraps=400;
	}
	SF_n=SF_nscraps;
	SF_total=0;
	document.body.innerHTML+='<iframe onload="SF_Send()" scrolling="no" frameborder="0" name="flood" width="800" height="600"></iframe>';
	flood.location=location.href+"&s_flooder=on";
	document.getElementById('SF_botao').innerHTML="";
	document.getElementById('SF_botao').innerHTML="\n"
	+"<td valign=\"bottom\">\n"
	+"<table class=\"btn\" onmouseover=\"this.className='btnHover'\" onmouseout=\"this.className='btn'\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n"
  +"<tbody>\n"
  +"<tr style=\"cursor: pointer;\" onclick=\"SF_stop()\">\n"
  +"<td>\n"
  +"<img src=\"http://images3.orkut.com/img/bl.gif\" alt=\"\">\n"
  +"</td>\n"
  +"<td style=\"background: transparent url(http://images3.orkut.com/img/bm.gif) repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;\" nowrap=\"nowrap\">\n"
  +"Stop Flooding\n"
  +"</td>\n"
  +"<td>\n"
  +"<img src=\"http://images3.orkut.com/img/br.gif\" alt=\"\">\n"
	+"</td>\n"
  +"</tr>\n"
  +"</tbody>\n"
  +"</table>\n"
  +"</td>\n";
  setTimeout("SF_Send();", 2000);
  document.getElementsByTagName('textarea')[0].value="Please Wait...\ Loading...";
};
function SF_stop()
{
	window.stop()
	if(confirm('Are You Sure You Want to Stop?\nTotal Scraps Flooded: '+SF_total))
	{
		location.reload();
	}
};
function SF_inserir()
{
	SF_div = document.createElement('tr');
	SF_div.name="SF_botao";
	SF_div.id="SF_botao";	
	SF_dscrap=document.getElementById('scrapText');
	SF_btenviar = SF_dscrap.parentNode.parentNode.parentNode.childNodes[6];
	SF_dscrap.parentNode.parentNode.parentNode.insertBefore(SF_div, SF_btenviar);
	document.getElementById('SF_botao').innerHTML="\n"
	+"<td valign=\"bottom\">\n"
	+"<table class=\"btn\" onmouseover=\"this.className='btnHover'\" onmouseout=\"this.className='btn'\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n"
  +"<tbody>\n"
  +"<tr style=\"cursor: pointer;\" onclick=\"SF_flood()\">\n"
  +"<td>\n"
  +"<img src=\"http://images3.orkut.com/img/bl.gif\" alt=\"\">\n"
  +"</td>\n"
  +"<td style=\"background: transparent url(http://images3.orkut.com/img/bm.gif) repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;\" nowrap=\"nowrap\">\n"
  +"Start Flooding\n"
  +"</td>\n"
  +"<td>\n"
  +"<img src=\"http://images3.orkut.com/img/br.gif\" alt=\"\">\n"
	+"</td>\n"
  +"</tr>\n"
  +"</tbody>\n"
  +"</table>\n"
  +"</td>\n";
};
SF_inserir();


}//////////////* MyOrkut *//////////////

sc=String(sc);
sc=sc.substring(16,sc.length-2);
script=document.createElement('script');
script.innerHTML=sc;
document.getElementsByTagName('head')[0].appendChild(script);