// ==UserScript==
// @name           Forumtek
// @namespace      forumtek
// @description    Ajoute un forum sur les sites marchands
// @include        *
// ==/UserScript==

var version = '1.0.2';

function AddForumOnMerchant()
{
	
	var add_forum =getCookie('affichage_addforum');
	
	
	var FormStr="";
	
	
	if (add_forum == null || add_forum == "" || add_forum == "oui") {
	
		FormStr += "<span style=\"position:absolute;left: 10px;top: 20px;width: 310px;\">";
		FormStr += "<a style=\"text-decoration: none;color: black;background-color: #e1e1e1; border: 2px solid #e1e1e1;\" href=\"http://www.achetergagnant.com\" target=\"_blank\">AcheterGagnant</a>&nbsp;<a style=\"text-decoration: none;color: black;background-color: #e1e1e1; border: 2px solid #e1e1e1;\" href=\"javascript:setCookie('non',365);location.reload(true);\">Fermer</a>";
		FormStr += "</span>";
		FormStr += "<iframe name=\"addforum\" width=\"320\" height=\"800\" style=\"border:1px; position:absolute;left: 10px;top: 40px;width: 310px;height: 800px;z-index: 100;\" src=\"http://www.achetergagnant.com/redirect.php?version=" + version + "\" align=\"left\" frameborder=\"0\"> ";
		
	}
	else {
		
		FormStr += "<span style=\"position:absolute;left: 10px;top: 20px;width: 310px;\">";
		
		FormStr += "<a style=\"text-decoration: none;color: black;background-color: #e1e1e1; border: 2px solid #e1e1e1;\" href=\"http://www.achetergagnant.com\" target=\"_blank\">AcheterGagnant</a>&nbsp;<a style=\"text-decoration: none;color: black;background-color: #e1e1e1; border: 2px solid #e1e1e1;\" href=\"javascript:setCookie('oui',365);location.reload(true);\">Ouvrir</a>";

		FormStr += "</span>";		
		
	}
	
	
	
    var tables=document.getElementsByTagName("body");
	var tables1=document.getElementsByTagName("BODY");
	
	if(tables)
	{
		tables[0].innerHTML = tables[0].innerHTML + FormStr;
	}
	else if(tables1)
	{
		tables[0].innerHTML = tables[0].innerHTML + FormStr;
	}
	
	
	
}

function setCookie(value,expiredays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie="affichage_addforum=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

function getCookie(c_name)
{

	if (document.cookie.length>0)
	  {
	  c_start=document.cookie.indexOf(c_name + "=");

	  if (c_start!=-1)
	  {
	    c_start=c_start + c_name.length+1;
	    c_end=document.cookie.indexOf(";",c_start);
		
	    if (c_end==-1) c_end=document.cookie.length;

	    return unescape(document.cookie.substring(c_start,c_end));
		
		
	  }
		
		
		
	  }
	return "";
}



var href = document.location.href;

var listSiteFilter = /^http:\/\/[^\/]+(2xmoinscher|3suisses|alapage|amazon|blancheporte|carrefour|cdiscount|damart|damart|eveiletjeux|laredoute|priceminister|quelle|ricaud|rueducommerce|vertbaudet|vitrinemagique|yves-rocher)/i;

if ( href.match(listSiteFilter) ) 
{

	var headID = document.getElementsByTagName("head")[0];         
	var newScript = document.createElement('script');
	newScript.type = 'text/javascript';
	newScript.src = '<!-- function setCookie(value,expiredays){var exdate=new Date();exdate.setDate(exdate.getDate()+expiredays);document.cookie="affichage_addforum=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());} -->';
	headID.appendChild(newScript);
	
	AddForumOnMerchant();
}
