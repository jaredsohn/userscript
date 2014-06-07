// ==UserScript==
// @name           trac view tickets link to default ticket custom query 
// @namespace      trac
// @description    Changes "View tickets" to point to default Custom Query link
// @include        http://*
// ==/UserScript==

/*
  Add query parameters to this variable w/o forward slashes
  example:(query?status=...) 
*/
QueryParams = 'query?status=accepted&status=assigned&status=new&status=reopened&group=milestone&order=priority&col=id&col=summary&col=status&col=type&col=priority&col=component&col=deadline&col=time&col=changetime&owner=slavi'

FullSiteUrl     = window.location+'';
SplitedString   = FullSiteUrl.split('/');
SiteUrl         = SplitedString[0]+'//'+SplitedString[2]+'/'+SplitedString[3]+'/'


document.getElementById('mainnav').childNodes[1].childNodes[5].childNodes[0].href=SiteUrl + QueryParams;