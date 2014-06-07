// ==UserScript==

// @name           JIRA Issue Description Quickview

// @namespace      mailto:ch_xxvi@yahoo.com.hk

// @description    Quick preview of descriptions in Issue Navigator

// @include        *//jira.*/IssueNavigator.jspa*
// @include        *//jira.*/QuickSearch.jspa*
// @include        *//*/jira/*IssueNavigator.jspa*
// @include        *//*/jira/*QuickSearch.jspa*
// @version        1.5.1

// ==/UserScript==







var QuickviewLengthLimit   =  500

var QuickviewKeepDuration  =  200







divBg = document.createElement('div');

divBg.style.backgroundColor = 'black';

divBg.style.color = 'white';

divBg.style.opacity = 0.4;

divBg.style.position = 'fixed';

divBg.style.left = '0px';

divBg.style.top = '0px';

divBg.style.zIndex = '200';

divBg.style.padding = '4px';

divBg.style.fontWeight = 'bold';

divBg.style.display = 'none';

divBg.addEventListener('mouseover', function(){keepDscp()}, false);

divBg.addEventListener('mouseout', function(){hideDscp(false)}, false);

divBg.addEventListener('mousedown', function(){hideDscp(true)}, false);
divBg.appendChild(document.createTextNode('This preview brought to you by XXVi'));

document.body.appendChild(divBg);



divDscp = document.createElement('div');

divDscp.style.backgroundColor = '#FFFFF0';

divDscp.style.fontSize = '10pt';

divDscp.style.border = '2px solid #999900';

divDscp.style.padding = '8px';

divDscp.style.position = 'fixed';

divDscp.style.left = '20px';

divDscp.style.top = '20px';

divDscp.style.zIndex = '210';

divDscp.style.display = 'none';

divDscp.addEventListener('mouseover', function(){keepDscp()}, false);

divDscp.addEventListener('mouseout', function(){hideDscp(false)}, false);

document.body.appendChild(divDscp);



var lastThreadId;



function popDscp(sumLink) {

	sureToHide = false;

	clearTimeout(lastThreadId);

	dscpContent = sumLink.getAttribute('description');

	dscpContent = sumLink.description;

	if (dscpContent==null) {

		lastThreadId = setTimeout( function(){

			divBg.style.display = 'none';

			divDscp.innerHTML = '<i>Loading description...</i>';

			divDscp.style.display = '';

			xmlHttp = new XMLHttpRequest();

			xmlHttp.onreadystatechange = function() {

				if(xmlHttp.readyState==4) {

					cacheText = xmlHttp.responseText;

					preciding = '<div id="description_full">';

					closing = '</div>';

					startPos = cacheText.indexOf(preciding);

					if (startPos > 0) {

						cacheText = cacheText.substr(startPos+preciding.length);

						endPos = cacheText.indexOf(closing);

						if (endPos > QuickviewLengthLimit) {

							dscpContent = cacheText.substr(0,QuickviewLengthLimit);

							dscpContent += '<i><b>...... (more)</b></i>'

						}

						else {

							dscpContent = cacheText.substr(0,endPos);

						}

						sumLink.description = dscpContent;

						popDscp(sumLink);

					}

					else {

						if (!sureToHide) {

							dscpContent = '<i>( No Text Desriptions )</i>';

							sumLink.description = dscpContent;

							popDscp(sumLink);

						}

					}

				}

				else if (xmlHttp.status!=200) {

					divDscp.innerHTML = '<i>Fail to load</i>';

				}

			}

			xmlHttp.open('GET', sumLink.href, true);

			xmlHttp.send(null);

		}, 200);

	}

	else {

		divDscp.innerHTML = '<b>'+sumLink.innerHTML+'</b><br/>'+dscpContent;

		divDscp.style.display = '';

		divBg.style.width = window.innerWidth;

		divBg.style.height = divDscp.offsetTop*2+divDscp.clientHeight;

		divBg.style.display = '';

	}

}



function hideDscp(flagInstant) {

	sureToHide = true;

	xmlHttp.abort();

	clearTimeout(lastThreadId);

    lastThreadId = setTimeout( function(){

		if (sureToHide) {

			divDscp.style.display = 'none';

			divBg.style.display = 'none';

		}

    }, flagInstant? 0:QuickviewKeepDuration);

}



function keepDscp() {

    sureToHide = false;

}



issueTable = document.getElementById('issuetable');



for (i=1; i<issueTable.rows.length; i++) {

    sumLink = issueTable.rows[i].cells[2].getElementsByTagName('a')[0];

    sumLink.addEventListener('mouseover', function(){popDscp(this)}, false);

    sumLink.addEventListener('mouseout', function(){hideDscp(false)}, false);

}