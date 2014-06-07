// ==UserScript==
// @name           ScT ActivityInfo
// @namespace      jlo
// @description    Displays seeding/leeching activity in userbar. Version 0.5g
// @include        http*://*scenetorrents.org*
// ==/UserScript==


function createDOM(text) {
    var tmpDiv = document.createElement("div");
    tmpDiv.innerHTML = text;
    
    return tmpDiv;
}


function evalXPath(dom, XPath) {
    return document.evaluate(
                XPath,
                dom,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null,
                null);
}

function Set_Cookie( name, value, expires, path, domain, secure ) 
{
	// set time, it's in milliseconds
	var today = new Date();
	today.setTime( today.getTime() );

	
	if ( expires )
	{
		expires = expires * 1000 * 60;
	}
	var expires_date = new Date( today.getTime() + (expires) );

	document.cookie = name + "=" +escape( value ) +
	( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + 
	( ( path ) ? ";path=" + path : "" ) + 
	( ( domain ) ? ";domain=" + domain : "" ) +
	( ( secure ) ? ";secure" : "" );
}

			
function Get_Cookie( check_name ) {	
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false;
	
	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		
		a_temp_cookie = a_all_cookies[i].split( '=' );
		
		
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
			
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}
}		

function setInfoLinks(s_holder, l_holder)
{
	var userLink = evalXPath(document,"/html/body/div/table/tbody/tr[3]/td[2]/table/tbody/tr/td/table/tbody/tr/td/b/a").snapshotItem(0);
	
	if(userLink)
	{
		GM_xmlhttpRequest(
				{			
					method: "GET",
					url: userLink.href,
					onload: function(result)
						{
							
							var dom = createDOM(result.responseText);
							var seedLink;
							var leechLink;
							
							var allLinks = dom.getElementsByTagName("a");
							for (var i = 0; i < allLinks.length; i++)
							{
								var link = allLinks[i];
								if(link.href.indexOf("seeding=1#seeding") > -1)
								{
									seedLink = link;					
								}

								if(link.href.indexOf("leeching=1#leeching") > -1)
								{
									leechLink = link;
								}
							}
							
							
							if(seedLink)
							{	

								var seedText  = seedLink.nextSibling.nodeValue;								
								seedText = seedText.replace(/\-/g,'');
								seedText = seedText.replace(/^\s+|\s+$/g, '') ;								
								seedLink.innerHTML = seedText;
								Set_Cookie('seedText', seedText, '', '/', '', '' );
							}
							else
							{

								seedLink = document.createElement("a");		
								seedLink.href = userLink.href + "&seeding=1#seeding";
								seedLink.innerHTML = "0";
								Set_Cookie('seedText', '0', '', '/', '', '' );
							}

							s_holder.innerHTML = '';
							s_holder.insertBefore(seedLink,null);
							
							
							if(leechLink)
							{
								var leechText  = leechLink.nextSibling.nodeValue;
								leechText = leechText.replace(/\-/g,'');
								leechText = leechText.replace(/^\s+|\s+$/g, '') ;							
								leechLink.innerHTML = leechText;
								Set_Cookie('leechText', leechText, '', '/', '', '' );
							}
							else
							{
								leechLink = document.createElement("a");
								leechLink.href = userLink.href + "&leeching=1#leeching";
								leechLink.innerHTML = "0";
								Set_Cookie('leechText', '0', '', '/', '', '' );
							}
							
							l_holder.innerHTML = '';
							l_holder.insertBefore(leechLink,null);							
						}						
				}
			);	
	}
}

function insertInfo()
{	
	var userLink = evalXPath(document,"/html/body/div/table/tbody/tr[3]/td[2]/table/tbody/tr/td/table/tbody/tr/td/b/a").snapshotItem(0);	
    var infoBox = evalXPath(document, "/html/body/div/table/tbody/tr[3]/td[2]/table/tbody/tr/td/table/tbody/tr/td").snapshotItem(0);
	
	// grouped
	var infoBox = evalXPath(document, "/html/body/div/table/tbody/tr[3]/td[2]/table/tbody/tr/td/table/tbody/tr/td").snapshotItem(0);
	var br = evalXPath(document,"/html/body/div/table/tbody/tr[3]/td[2]/table/tbody/tr/td/table/tbody/tr/td/br").snapshotItem(0);

	//center
	//var infoBox = evalXPath(document,"/html/body/div/table/tbody/tr[3]/td[2]/table/tbody/tr/td/table/tbody/tr/td[2]").snapshotItem(0);
	//var tmp = document.createElement("br");
	//var br = infoBox.insertBefore(tmp,null);								   

	if(infoBox && br)
	{
		var tmp = document.createElement("span");
		tmp.innerHTML = "&nbsp;&nbsp;Seeding:&nbsp;";
		tmp.id = "uplabel";
		tmp.setAttribute("style", "color: green;");
		tmp = infoBox.insertBefore(tmp,br);			
		

		var tmp = document.createElement("span");
		tmp.innerHTML = "";
		tmp.id = "scti_seed";
		tmp.setAttribute("style", "color: black;");
		infoBox.insertBefore(tmp,br);


		var tmp = document.createElement("span");
		tmp.innerHTML = "&nbsp;Leeching:&nbsp;";
		tmp.setAttribute("style", "color: red;");
		infoBox.insertBefore(tmp,br);
	
		infoBox.insertBefore(tmp,br);

		var tmp = document.createElement("span");
		tmp.innerHTML = "";
		tmp.id = "scti_leech";
		tmp.setAttribute("style", "color: black;");
		infoBox.insertBefore(tmp,br);


		var seed_label = document.getElementById("scti_seed");
		var leech_label = document.getElementById("scti_leech");
	

		if(seed_label && leech_label)
		{
			var seedText = Get_Cookie('seedText');
			if(!seedText)
				seedText = "..";
			var leechText = Get_Cookie('leechText');
			if(!leechText)
				leechText = "..";

		
			var tmpLink = document.createElement("a");
			tmpLink.href = userLink.href + "&seeding=1#seeding";
			tmpLink.innerHTML = seedText;
			seed_label.insertBefore(tmpLink,null);

			var tmpLink = document.createElement("a");
			tmpLink.href = userLink.href + "&leeching=1#leeching";
			tmpLink.innerHTML = leechText;
			leech_label.insertBefore(tmpLink,null);

			setInfoLinks(seed_label, leech_label);
		}
	}

}

insertInfo();