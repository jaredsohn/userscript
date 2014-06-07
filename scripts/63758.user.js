// ==UserScript==
// @name           googimgddl 
// @namespace      http://abhiomkar.in
// @description    Google Image Direct Download Button for each search result image in Google Image Result Page
// @include        http://*images.google.*/images*
// @include        http://*google.co*/images*
// @version        0.1
// ==/UserScript==

//Examples Table Data - here we insert the <img> tag - small image download button
//<td width="16.666666666666668%" valign="top" align="left" id="tDataText1">
//<div class="std"><b>India</b>: Selected<div class="f">453 x 302 - 4k - gif</div><div class="a">
//<cite style="font-style: normal;">loc.gov <a href="http://www.loc.gov/rr/international/asian/images/india_flag.gif" style="border-style: none;">
//<img src="http://en.wikipedia.org/skins-1.5/common/images/magnify-clip.png" style="border-style: none;"/></a></cite></div>
//<div class="eft"><a href="http://images.google.com/images?hl=en&amp;client=firefox-a&amp;rls=org.mozilla%3Aen-US%3Aofficial&amp;um=1&amp;q=india&amp;aq=f&amp;oq=&amp;aqi=&amp;imgtype=i_similar&amp;sa=X&amp;ei=RVkeS5j6MsaE_Ab9jYyMDA&amp;ct=img-sim-l&amp;oi=image_sil&amp;resnum=2&amp;tbnid=wTmyamYF4Wz1OM:" class="fl">Find similar images</a></div></div></td>

//Select Nodes
function selectNodes(contextNode, xpathExpression) {
   var nodes = document.evaluate(xpathExpression, contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
   var nodeArray = new Array(nodes.snapshotLength);

   for (var i = 0; i < nodeArray.length; i++)
     nodeArray[i] = nodes.snapshotItem(i);

   return nodeArray;
 }

//Select <CITE> tag to insert the small image direct download button
cites = document.getElementsByTagName('cite');
//GM_log(cites[0].innerHTML);

//Select href of the image url which contains direct image link - we need to parse it.
var directLinkRaw_a = selectNodes(document, "//a[starts-with(@href, '/imgres')]");
var cites = document.getElementsByTagName('cite');
//examples directLinkRaw - /imgres?imgurl=http://www.loc.gov/rr/international/asian/images/india_flag.gif&imgrefurl=http://www.loc.gov/rr/international/asian/india/india.html&usg=__Eu-wzBG7gi0ztEL-f-x1q55FtYQ=&h=302&w=453&sz=4&hl=en&start=2&sig2=RHgGlAAiIVovoIjxXwKFuA&um=1&tbnid=wTmyamYF4Wz1OM:&tbnh=85&tbnw=127&prev=/images%3Fq%3Dindia%26hl%3Den%26client%3Dfirefox-a%26rls%3Dorg.mozilla:en-US:official%26um%3D1&ei=RUceS5CULIqD_Ab_x82xDA

for(i=0; i<directLinkRaw_a.length; i++){
 directLink_aElem = directLinkRaw_a[i];
 directLink_href = directLink_aElem.getAttribute("href");;
 directLink_enc = directLink_href.match(/imgurl=(.*)&imgrefurl=/);
 directLink = decodeURIComponent(directLink_enc[1]);
// GM_log(directLink);
 cites[i].innerHTML += ' <a style="border-style: none" href="'+directLink+'"><img style="border-style: none" src="http://en.wikipedia.org/skins-1.5/common/images/magnify-clip.png"/></a>'
}