// ==UserScript==
// @name           MMB SERP
// @namespace      http://sites.google.com/site/greasemonkeyscripts
// @description    Shows photos in full size on MMB SERP
// @include        http://malimarriagebureau.com/servlets/VENKYresults1.jsp?uid=2
// ==/UserScript==

var modifiedId  = new Array();
var profileUrls = new Array();
var idCell      = new Array();

function processProfilePage (responseDetails)
{
    if(responseDetails.readyState == 4)
    {
        if(responseDetails.status == 200)
        {
            var profilePage = responseDetails.responseText;

            var match;

            var profileIdSnippet = profilePage.split(/Login ID:/);
            var profileIdRe = new RegExp(".*?<i>[ \t]*(.*?)<\/i>");
            match = profileIdRe.exec(profileIdSnippet[1]);
            var profileId = match[1];

            var profileTblSnippet = profilePage.split(/<table width=\"584\"/);
            profileTblSnippet = profileTblSnippet[1].split(/\/table>/);

            var profileTbl = "<table " + profileTblSnippet[0]
                + "/table>";

            profileTbl = profileTbl.replace(/<td rowspan=\"9\".*?<\/td>/, "")
            profileTbl = profileTbl.replace(/<td.*?Login ID:.*?<\/td>/, "")

            var divObj = document.createElement("div");
            divObj.innerHTML = profileTbl;
            idCell[profileId].appendChild(divObj);
        }
        else
        {
            alert("Could not fetch profile page. Error: " +
            + responseDetails.status + " " + responseDetails.statusText);
        }
    }
}

var allElements, thisElement;
allElements = document.getElementsByTagName('td');

//alert('Modifying page content...');
var j=0;
for (var i = 0; i < allElements.length; i++)
{
    thisElement = allElements[i];
    if((thisElement.width ==90) && (thisElement.height == 56))
    {
        if(thisElement.childNodes[0].nodeName == 'IMG')
        {
            var profilePhotoSrc = thisElement.childNodes[0].src;
            thisElement.childNodes[0].width = 0;
            thisElement.childNodes[0].height = 0;

            var imageObj = document.createElement("img");
            imageObj.id = "profile_photo";
            imageObj.src = profilePhotoSrc;
            imageObj.style.maxHeight = 400;
            thisElement.appendChild(imageObj);
        }
        else if(thisElement.childNodes[0].nodeName == 'A')
        {
            var profileId = thisElement.childNodes[0].innerHTML;

            modifiedId  [profileId] = 0;
            profileUrls [profileId] = thisElement.childNodes[0].href;
            idCell      [profileId] = thisElement;

            GM_xmlhttpRequest
                ({
                    method: 'GET',
                    url: profileUrls[profileId],
                    headers:    {
                                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                                'Accept': 'application/atom+xml,application/xml,text/xml',
                                },
                    onload: processProfilePage
                });

            //if(++j > 1)
            //{
            //    break;
            //}
        }
    }
}


//alert('Done.');
