// ==UserScript==
// @name           Add Mingle card details to card links
// @description    Show card titles and statuses in card links on Mingle pages.
// @include        *
// @exclude        */cards*
function startShowingPageTitle(anchorElement)
{
  GM_xmlhttpRequest({method:             'GET',
                     url:                anchorElement.href,
                     onreadystatechange: function(details)
                                         {
                                           finishShowingPageTitle(details,
                                                                  anchorElement);
                                         }});
  anchorElement.innerHTML = anchorElement.innerHTML                              +
                            ' <em>&lsaquo;<small>FETCHING PAGE DETAILS</small> ' +
                            '&hellip;&rsaquo;</em>';
}

function finishShowingPageTitle(request, anchorElement)
{
  if ((request.readyState != 4) || (request.status != 200))
  {
    return;
  }
  if (! (cardTitleMatch =
         request.responseText.match(/<title>(.+) - Mingle Card<\/title>/)))
  {
    return;
  }
  anchorElement.innerHTML = cardTitleMatch[1];
  if (cardStatusMatch =
      request.responseText.match(/name="properties\[Status\]" type=".+" value="(.+)"/))
  {
    anchorElement.innerHTML = anchorElement.innerHTML          +
                              ' &lsaquo;<small>'               +
                              cardStatusMatch[1].toUpperCase() +
                              '</small>&rsaquo;';
  }
}

var anchors = document.getElementsByTagName('a');
for (i = 0; i < anchors.length; i++)
{
  a = anchors[i];
  if (! a.href)
  {
    continue;
  }
  hrefMatch = a.href.match(/cards\/(\d+)/);
  if (! (hrefMatch && (cardId = hrefMatch[1])))
  {
    continue;
  }
  if (a.innerHTML.match(new RegExp('^#?' + cardId + '$')))
  {
    startShowingPageTitle(a);
  }
}
// ==/UserScript==