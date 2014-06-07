// ==UserScript==
// @name           ZetaBoards Admin Geo-Locate IP
// @description    Converts IP Address of new registrations in the "Members Awaiting Authorization" screen to Geo-Locate their position.
// @author         bigAPE (http://www.bigape.co.uk/)
// @version        1.0
// @date           2008-06-12
// @namespace      http://www.bigape.co.uk/greasemonkey
// @include        http://*.zetaboards.com/*/admin/?menu=mem&c=21
// ==/UserScript==

insertGeoLocation()

function insertGeoLocation()
{
  // locate 'main' div
  var main = document.getElementById('main');
  if (main)
  {
    // locate table body and then rows collection (could break in future if template changes)
    tableBody = main.getElementsByTagName("form")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0];
    rows      = tableBody.getElementsByTagName('tr');

    // cycle rows
    if (rows)
    {
      for (var i = 0; i < rows.length; i++)
      {
        // skip the header row
        if (i > 0)
        {
          // locate the cell with the IP Address (could break in future if template changes)
          ipCell = rows[i].getElementsByTagName('td')[4];
          if (ipCell)
          {
            // get the IP Address and scrub the existing cell
            ipAddress        = ipCell.innerHTML;
            ipCell.innerHTML = "";
            ipCell.setAttribute("style", "text-align:center;");

            // create a link to the Geo-Location website using the IP Address as the query
            var geoLink      = document.createElement("A");
            geoLink.setAttribute("href","http://www.hostip.info/index.html?spip=" + ipAddress);
            geoLink.setAttribute("target","_new");
            geoLink.appendChild(document.createTextNode(ipAddress));

            // create and format a div for the callback from the Geo-Location API
            geoDivName       = "geodiv" + i;
            geoDiv           = document.createElement("DIV");
            geoDiv.setAttribute("id", geoDivName);
            geoDiv.setAttribute("style", "border:1px solid #ffa82b; padding:2px; background:#fce7dd; font-size:75%; text-align:left;");

            // append the new elements to the IP Address cell
            ipCell.appendChild(geoLink);
            ipCell.appendChild(document.createElement("br"));
            ipCell.appendChild(geoDiv);

            if (GM_xmlhttpRequest)
            {
              // generate the API GET uri
              targetURL = "http://api.hostip.info/get_html.php?ip=" + ipAddress;
              GM_xmlhttpRequest(
                {
                  method:   'GET',
                  url:      targetURL,
                  headers:  {
                              'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                              'Accept'    : 'text/html',
                            },
                  onload:   function(responseDetails)
                            {
                              // collect the response text from the API call
                              var searchResult = responseDetails.responseText;

                              // if the response text contains markers denoting that the address could not be resolved
                              if (searchResult.indexOf("Unknown Country?") > -1)
                              {
                                // report Location Unkown
                                searchResult = "Unknown Location";
                              }
                              else
                              {
                                // report the results but replace plain text formatting with basic html
                                searchResult = searchResult.replace(/\n/, '<br/>');
                              }

                              // now the messy bit, need to determine which row we are updating in this async anonymous callback
                              // so rough and dirty solution is to cycle all the rows and determine if that result div is empty
                              // if it is then populate it. Given an optimal scenario the remote execution and responses should
                              // be comparible in duration and with any luck the responses will be written back to the rows in
                              // the order they were sent. Skanky I know but I'm not a JS coder and not sure who to sync up
                              // async calls in this lang without any binding metaphor
                              subRows = main.getElementsByTagName("form")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName('tr');
                              for (var n = 0; n < subRows.length; n++)
                              {
                                currentDiv = document.getElementById('geodiv' + n)
                                if (currentDiv)
                                {
                                  if (currentDiv.innerHTML == '')
                                  {
                                    currentDiv.innerHTML = searchResult;
                                    break;
                                  }
                                }
                              }
                            }
                 }
              );
            }
          }
        }
      }
    }
  }
}
