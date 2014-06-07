// ==UserScript==
// @name           xxxxx
// @namespace      xxxxx.user.js
// @description    xxz
// @version        1.1.0
// @include        http://s*/admintool/*
// ==/UserScript==

function insertGeoLocation()
{
      for (var i=0; i<rowl; i++)
      {
          ipCell = rows[i].getElementsByTagName('td')[ixul];
          if (ipCell)
          {
            ipAddress        = ipCell.getElementsByTagName('a')[0].innerHTML;
            ipCell.innerHTML = "";
//            ipCell.setAttribute("style", "text-align:center;");
            var geoLink      = document.createElement("A");
            geoLink.setAttribute("href","?action=user.search&userip=" + ipAddress);
			geoLink.setAttribute("target","_new");
            geoLink.appendChild(document.createTextNode(ipAddress));
            ipCell.appendChild(geoLink);
            ipCell.appendChild(document.createElement("br"));			
            geoDiv = document.createElement("DIV");
            geoDiv.setAttribute("id", 'xx'+ipAddress);
            geoDiv.setAttribute("style", "border:1px solid #ffa82b; padding:1px; background:#fce7dd; font-size:85%; text-align:left;");
            ipCell.appendChild(geoDiv);
//---------------------------------------------------------------------------------			
            if (GM_xmlhttpRequest)
            {
  			targetURL = "http://ip-address-lookup-v4.com/lookup.php?ip=" + ipAddress;

              GM_xmlhttpRequest(
                {
                  method:   'GET',
                  url:      targetURL,
                  headers:  {
                              'User-agent': 'Mozilla/5.0',
                              'Accept'    : 'text/html',
                            },
                  onload:   function(responseDetails)
                            {
                              var searchResult = responseDetails.responseText;
var vals = searchResult.substring(searchResult.indexOf('<tr><td colspan="2"><h2>IP Information - '),searchResult.lastIndexOf('<tr><td colspan="2" ><h2>Whois Information</h2></td></tr>  <tr><td colspan="2">')); 

							  for (var n = 0; n <= rowl; n++)
                              {
ipAddress2  = 'xx'+vals.substring(vals.indexOf('<h2>IP Information - ')+21,vals.indexOf('</h2>'));
                              currentDiv =  document.getElementById(ipAddress2)
                                  if (currentDiv.innerHTML == '')
                                  {
								  if (ipAddress2 == 'xx0.0.0.0')break;
									
vals = vals.substring(vals.indexOf('</h2>')+21,vals.lastIndexOf('</tr>'));
var var2 = ""

if (vals.indexOf("<td><b>Host name</b></td><td>") >= 0){
	var vals2 = vals.substring(vals.indexOf('<td><b>Host name</b></td><td>')+29,vals.lastIndexOf('</td>'));
	var vals3 = vals2.substring(0,vals2.indexOf('</td>'));
	var2 +='<tr><td><b>Host</b></td><td>'+ vals3 +'</td></tr>'	
}
if (vals.indexOf("<td><b>Country</b></td>") >= 0){
	var2 += '<tr>'+'<img src="'+'http://ip-address-lookup-v4.com'+vals.substring(vals.indexOf('/img/world_flags/'),vals.lastIndexOf('.png" title')+4)+'" title="'+vals.substring(vals.indexOf('<td><b>Country</b></td>')+50,vals.indexOf('&nbsp;'))+'" alt="'+vals.substring(vals.indexOf('<td><b>Country</b></td>')+50,vals.indexOf('&nbsp;'))+'"> '+vals.substring(vals.indexOf('<td><b>Country</b></td>')+50,vals.indexOf('&nbsp;'))+'</td></tr>'
}
//if (vals.indexOf("<td><b>Region</b></td>") >= 0){
//	var vals2 = vals.substring(vals.indexOf('<tr><td><b>Region</b></td><td>')+30,vals.lastIndexOf('</td>'));
//	var vals3 = vals2.substring(0,vals2.indexOf('</td>'));
//	var2 +='<tr><td>Region</td><td>'+ vals3 +'</td></tr>'
//}
if (vals.indexOf("<td><b>City</b></td><td>") >= 0){
	var vals2 = vals.substring(vals.indexOf('<tr><td><b>City</b></td><td>')+28,vals.lastIndexOf('</td>'));
	var vals3 = vals2.substring(0,vals2.indexOf('</td>'));
	var2 +='<tr><td><b>Oras</b></td><td>'+ vals3 +'</td></tr>'
}
										currentDiv.innerHTML = var2;					
                                    break;
								  }
							  
								  
                              }
                            }
                 }
              );
            }		
          }
      }
}
