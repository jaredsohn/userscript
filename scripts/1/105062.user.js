// piratenausguck
// v1.00006
//  
// 2013-03-04
// Copyright (c) 2009, 
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Für www.piraten-battle.de
// Berechnet Werte aus dem Ausguck
//
// Dieses Hilfsmitte wird Ihnen präsentiert von 
// ****     Kathrinchen     ****
// Alle Fehler sind beabsichtigt ;-) 
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "piratenspio" and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          piratenausguck
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Position nächster Tick berechnen
// @include       http://*.piraten-battle.de/index.php?art=user&page=uebersicht&num=radar*
// @include       http://*.piraten-battle.de/index.php?num=radar*
// @include       http://*.piraten-battle.de/index.php?num=inseln*
// @include       http://*.piraten-battle.de/popup/schiffradar.php*

// @exclude       
// ==/UserScript==



var expression; 
var allElements, thisElement,innertext,it;
var neuerText;
var hi;
var ersetze; 
var insel; 
 
var speedtest;
  
var start_k,start_x,start_y,ziel_k,ziel_x,ziel_y,stat,ent1,ent2;
var neu_k,neu_x,neu_y;
var speed,speedtext,mannschaft;
var dm=window.location.href;
var mods=0;
var k,x,y;
var getauscht,ergebnisda;
var delta_x,delta_y,delta;
var fref;
k=0;
x=0;
y=0;

expression = /http\:\/\/.*?\.piraten\-battle\.de\/index\.php\?.*?num\=radar/gim;  
if (expression.test(dm) == true) 
{
	mods=1;
}

expression = /http\:\/\/.*?\.piraten\-battle\.de\/popup\/schiffradar/gim;  
if (expression.test(dm) == true) 
{
	mods=2;
}



expression = /http\:\/\/.*?\.piraten\-battle\.de\/index\.php\?.*?num\=ozean/gim;  
if (expression.test(dm) == true) 
{
	mods=3;
}


expression = /http\:\/\/.*?\.piraten\-battle\.de\/index\.php\?.*?num\=inseln/gim;  
if (expression.test(dm) == true) 

{
	mods=4;
}



if(mods==1)
{
	allElements = document.getElementsByTagName('body');
	for (var i = 0; i < allElements.length; i++) 
	{
		innertext=allElements[i].innerHTML;	
		getauscht=1;
		while (getauscht==1)
		{
			getauscht=0;
			ent2='--';
			expression = /(\/popup\/radar\.php\?insel\=(.*?)\'\))/i;  
			if (expression.test(innertext) == true) 
			{
				insel=RegExp.$2;
				k=GM_getValue("insel_k"+insel, 0);
				x=GM_getValue("insel_x"+insel, 0);
				y=GM_getValue("insel_y"+insel, 0);
	
			}
		
			ersetze='Ent.</td><td width="30" align="center">Ent(tk)';
			expression = /Entf\./gim;  
			if (expression.test(innertext) == true) 
			{
				innertext = innertext.replace(expression,ersetze);
			} 
	

			ersetze='Zyl</td><td width="65" align="center">Zyl(tk)';
			expression = /\tZiel/i;  
			if (expression.test(innertext) == true) 
			{
				innertext = innertext.replace(expression,ersetze);
			} 
			
			ergebnisda=0;
			expression =/\<td align\=\"center\"\>(.*?)\<.*?[\n\r].*?\<td align\=\"right\"\>(.*?)\&.*?[\n\r].*?\<td align\=\"center\"\>\<a.*?\>(.*?)\:(.*?)\:(.*?)\<\/a\>.*?[\n\r].*?\<td align\=\"center\".*?\>\<a.*?\>(.*?)\:(.*?)\:(.*?)\<\/a\>.*?[\n\r].*?\<td align\=\"center\"\>(.*?)\<\/td\>.*?[\n\r].*?\<td align\=\"center\"\>(.*?)\<\/td\>/im;
			if (expression.test(innertext) == true) 
			{
				speed=RegExp.$1;
				speedtext=speed;
				mannschaft=RegExp.$2;
				start_k=RegExp.$3;
				start_x=RegExp.$4;
				start_y=RegExp.$5;
				ziel_k=RegExp.$6;
				ziel_x=RegExp.$7;
				ziel_y=RegExp.$8;
				stat=RegExp.$9;
				speedtest =/(.*?) \(x\)/im;
				if (speedtest.test(speed) == true) 
				{
					speed=Math.round(0.5*(RegExp.$1));			
		  		}
				getauscht=1;
				ergebnisda=1;
			}	
			if(ergebnisda==1)
			{
				neu_k=0;
				neu_x=0;
				neu_y=0;
				ent1=0;
				if (start_k==k)
				{
					ent1=Math.abs(start_x-x) + Math.abs(start_y-y);
				}
				if (start_k==k)
				{
					if (ziel_k==k)
					{
						neu_k=k;	
						ent1=Math.abs(start_x-x) + Math.abs(start_y-y);
						delta_x=Math.abs(start_x-ziel_x);
						delta_y=Math.abs(start_y-ziel_y);
						delta=Math.abs(delta_x+delta_y);
						if(delta>0)
						{
							if(Math.abs(speed)<Math.abs(delta))
							{			
								delta_x=Math.round(delta_x/delta*speed);
								delta_y=Math.round(delta_y/delta*speed);
							}
							
							if(Math.abs(ziel_x)<Math.abs(start_x)){delta_x=-1*Math.abs(delta_x);}			
							if(Math.abs(ziel_y)<Math.abs(start_y)){delta_y=-1*Math.abs(delta_y);}			
							neu_x=Math.round(start_x);
							neu_x=Math.round(neu_x+delta_x);
							neu_y=Math.round(start_y);
							neu_y=Math.round(neu_y+delta_y);
						}
						else
						{
							neu_x=Math.round(start_x);
							neu_y=Math.round(start_y);
						}
						ent2=Math.abs(neu_x-x) + Math.abs(neu_y-y);
					}	
				}
				if(stat == 'weltreise')
				{
					neu_k=start_k;
					neu_x=start_x;
					neu_y=start_y;
					ent2=ent1;
				}

				ersetze=        '   <td  align="center">'+speedtext+'</td>';
				ersetze=ersetze+'   <td  align="right" >'+mannschaft+'&nbsp;</td>';
				ersetze=ersetze+'   <td  align="center" ><a href="index.php?num=ozean&amp;g='+start_k+'&amp;x='+start_x+'&amp;y='+start_y+'&amp;st=1">'+start_k+':'+start_x+':'+start_y+'</a></td>';
				ersetze=ersetze+'   <td  align="center" ><a href="index.php?num=ozean&amp;g='+ziel_k+'&amp;x='+ziel_x+'&amp;y='+ziel_y+'&amp;st=1">'+ziel_k+':'+ziel_x+':'+ziel_y+'</a></td>';
				ersetze=ersetze+'   <td  align="center" ><a href="index.php?num=ozean&amp;g='+neu_k+'&amp;x='+neu_x+'&amp;y='+neu_y+'&amp;st=1">'+neu_k+':'+neu_x+':'+neu_y+'</a></td>';
				ersetze=ersetze+'   <td  align="center" >'+stat+'</td>';
				ersetze=ersetze+'   <td  align="center" >'+ent1+'</td>';
				ersetze=ersetze+'   <td  align="center" >'+ent2+'</td>';
				innertext = innertext.replace(expression,ersetze);
			}
		}
		ersetze='Ziel';
			expression = /Zyl/gim;  
			if (expression.test(innertext) == true) 
			{
				innertext = innertext.replace(expression,ersetze);
			} 
		allElements[i].innerHTML=innertext;
	}
}




if(mods==2)
{
	allElements = document.getElementsByTagName('body');
	for (var i = 0; i < allElements.length; i++) 
	{
		innertext=allElements[i].innerHTML;	
		it=innertext;
		getauscht=1;
		//GM_log(innertext);
		
		//position eigenes schiff suchen
			
		while (getauscht==1)
		{
			getauscht=0;
			ergebnisda=0;

			expression =/\<td align\=\"center\"\>.*?\<.*?\n.*?\<td align\=\"right\"\>(.*?)\&.*?\n.*?\<td align\=\"center\"\>\<a.*?\>(.*?)\:(.*?)\:(.*?)\<\/a\>.*?\n.*?\<td align\=\"center\"\>\<a.*?\>(.*?)\:(.*?)\:(.*?)\<\/a\>.*?\n.*?\<td align\=\"center\"\>(.*?)\<\/td\>.*?\n.*?\<td\>\<div align\=\"center\"\>(.*?)\<\/div\>\<\/td\>/im;
			if (expression.test(innertext) == true) 
			{
				start_k=RegExp.$2;
				start_x=RegExp.$3;
				start_y=RegExp.$4;
				ent1=	RegExp.$9;	
				if(ent1==0)
				{		
					 
					k=start_k;
					x=start_x;
					y=start_y;

				}				
				getauscht=1;
				ergebnisda=1;	
				ersetze= '   xxx <br>';
				innertext = innertext.replace(expression,ersetze);
			
			}	
		}	

		innertext=it;
		getauscht=1	
		while (getauscht==1)
		{
			getauscht=0;
			ent2='--';
			expression = /(\/popup\/radar\.php\?insel\=(.*?)\'\))/i;  
			if (expression.test(innertext) == true) 
			{
				insel=RegExp.$2;
				k=GM_getValue("insel_k"+insel, 0);
				x=GM_getValue("insel_x"+insel, 0);
				y=GM_getValue("insel_y"+insel, 0);
	
			}
		


			ersetze='<td id="dunkelTable" width="30" align="center"><b>Ent.</b></td><td width="30" align="center"><b>Ent(tk)</b></td>';
			expression = /(\<td id\=\"dunkelTable\" align\=\"center\" width\=\"30\"\>.*?\n.*?\<b\>Entf\.\<\/b\>.*?\n.*?\<\/td\>)/gim;  
			if (expression.test(innertext) == true) 
			{
				innertext = innertext.replace(expression,ersetze);
			} 
	

			ersetze='<td id="dunkelTable" width="65" align="center"><b>Ziel</b></td><td width="65" align="center"><b>Ziel(tk)<\/b></td>';
			expression = /(\<td id\=\"dunkelTable\" align\=\"center\" width\=\"65\"\>.*?\n.*?\<b\>Ziel\<\/b\>.*?\n.*?\<\/td\>)/gim;  
			if (expression.test(innertext) == true) 
			{
				innertext = innertext.replace(expression,ersetze);
			} 
			ergebnisda=0;
			expression =/\<td align\=\"center\"\>(.*?)\<.*?\n.*?\<td align\=\"right\"\>(.*?)\&.*?\n.*?\<td align\=\"center\"\>\<a.*?\>(.*?)\:(.*?)\:(.*?)\<\/a\>.*?\n.*?\<td align\=\"center\"\>\<a.*?\>(.*?)\:(.*?)\:(.*?)\<\/a\>.*?\n.*?\<td align\=\"center\"\>(.*?)\<\/td\>.*?\n.*?\<td\>\<div align\=\"center\"\>(.*?)\<\/div\>\<\/td\>/im;
			if (expression.test(innertext) == true) 
			{
				speed=RegExp.$1;
				speedtext=speed;
				mannschaft=RegExp.$2;
				start_k=RegExp.$3;
				start_x=RegExp.$4;
				start_y=RegExp.$5;
				ziel_k=RegExp.$6;
				ziel_x=RegExp.$7;
				ziel_y=RegExp.$8;
				stat=RegExp.$9;
				speedtest =/(.*?) \(x\)/im;
				if (speedtest.test(speed) == true) 
				{
					speed=Math.round(0.5*(RegExp.$1));			
		  		}
				getauscht=1;
				ergebnisda=1;
			}	
			if(ergebnisda==1)
			{
				neu_k=0;
				neu_x=0;
				neu_y=0;
				ent1=0;
				if (start_k==k)
				{
					ent1=Math.abs(start_x-x) + Math.abs(start_y-y);
				}
				if (start_k==k)
				{
					if (ziel_k==k)
					{
						neu_k=k;	
						ent1=Math.abs(start_x-x) + Math.abs(start_y-y);
						delta_x=Math.abs(start_x-ziel_x);
						delta_y=Math.abs(start_y-ziel_y);
						delta=Math.abs(delta_x+delta_y);
						if(delta>0)
						{
							if(Math.abs(speed)<Math.abs(delta))
							{			
								delta_x=Math.round(delta_x/delta*speed);
								delta_y=Math.round(delta_y/delta*speed);
							}
							
							if(Math.abs(ziel_x)<Math.abs(start_x)){delta_x=-1*Math.abs(delta_x);}			
							if(Math.abs(ziel_y)<Math.abs(start_y)){delta_y=-1*Math.abs(delta_y);}			
							neu_x=Math.round(start_x);
							neu_x=Math.round(neu_x+delta_x);
							neu_y=Math.round(start_y);
							neu_y=Math.round(neu_y+delta_y);
						}
						else
						{
							neu_x=Math.round(start_x);
							neu_y=Math.round(start_y);
						}
						ent2=Math.abs(neu_x-x) + Math.abs(neu_y-y);
					}	
				}
				if(stat == 'weltreise')
				{
					neu_k=start_k;
					neu_x=start_x;
					neu_y=start_y;
					ent2=ent1;
				}

				ersetze=        '   <td  align="center">'+speedtext+'</td>';
				ersetze=ersetze+'   <td  align="right" >'+mannschaft+'&nbsp;</td>';
				ersetze=ersetze+'   <td align="center"><a href="javascript:ozean('+start_k+', '+start_x+', '+start_y+')" class="stats">'+start_k+':'+start_x+':'+start_y+'</a></td>';
				ersetze=ersetze+'   <td align="center"><a href="javascript:ozean('+ziel_k+', '+ziel_x+', '+ziel_y+')" class="stats">'+ziel_k+':'+ziel_x+':'+ziel_y+'</a></td>';
				ersetze=ersetze+'   <td align="center"><a href="javascript:ozean('+neu_k+', '+neu_x+', '+neu_y+')" class="stats">'+neu_k+':'+neu_x+':'+neu_y+'</a></td>';

				ersetze=ersetze+'   <td  align="center" >'+stat+'</td>';
				ersetze=ersetze+'   <td  align="center" >'+ent1+'</td>';
				ersetze=ersetze+'   <td  align="center" >'+ent2+'</td>';
				innertext = innertext.replace(expression,ersetze);
			}
		}
		allElements[i].innerHTML=innertext;
	}


}

 



// Position der eigenen Insel ermitteln, wegen Entfernungsberechnung
if(mods==4) // neu von eigene inseln fenster 
 {
	 
var inr=0;
var pnr=0;
insel_nummer = new Array();
	allElements = document.getElementsByTagName('a');
	for (var i = 0; i < allElements.length; i++) 
	{
		innertext=allElements[i].innerHTML+'§';
		fref= allElements[i].href+'§'; 

 
		expression = /\&iid\=(.*?)\§/gim;  
		if (expression.test(fref) == true) 
		{
			insel=RegExp.$1;	
			inr++;		 
			insel_nummer[inr]=insel;
		 
		}




		expression = /num\=ozean/gim;  
		if (expression.test(fref) == true) 
		{
			expression = /(\d*?)\:(\d*?)\:(\d*?)\§/gim;  
			if (expression.test(innertext) == true) 
			 {
				k=RegExp.$1;	
				x=RegExp.$2;	
				y=RegExp.$3;	
				pnr++;
			 	insel=insel_nummer[pnr];
				GM_setValue("insel_k"+insel, k);
				GM_setValue("insel_x"+insel, x);
				GM_setValue("insel_y"+insel, y);
			



			}
		}
	}
}



