// ==UserScript==
// @name          Goa'uld Search(Google.co.il skin)
// @namespace     http://moppy.4free.co.il
// @description	  new skin for google.co.il web search with stargate-sg1 text and new image (img+text by Slemak-Tapuz.co.il)  Motty Katan(c)  05-08-2006 last updated 04-10-2007  
// @include       http://www.google.co.il/webhp?hl=iw*
// @include       http://www.google.co.il/
// @include       http://images.google.co.il/imghp*
// ==/UserScript==
//11-08-2006 image was edited, bug in copyright and in navigate bar corrected(due to google change of design...)
//switch logo
//14-09-2007 due to google change of design: image is now found using an id they kindly placed on a BR!
//           also changes in links of google made me change some of the links replacing code OD=more=sholva now works as a link
//04-10-2007 now sets title of all elements to original hebrew text(before replacing), minor fix for replacements.  
var oLogoImg=document.createElement("img");
oLogoImg.title="Stargate SG-1 theme logo";
oLogoImg.src="data:image/jpeg;base64,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pflDehB4zXpF3axXdu8E6B43GCDXCah4OuoJCbOZHjzwHyCP55/SuylUp8nJMwnF83NE7q2mR4VZHUgjOQc1V1HUrOKCSN5kLMp+RTk9PSuLttD1Y5SS7jhj77SWP5YH866LStItbFSEQzTMpDSyck+w9BWbjBO97lXk+hxt3NG2tQShgyLIhyDnoa9H07G046Vxeo+D7qORmtJI2iJ+VXJDD+ea1NEttZt9qXF+ixDsq72+mSB/WrrOE9YsVNSjozrT+lcJ4oRnDqPvZP4123zvAdj4YjhiM8/SuT1PwzcyybzqPOckeR1P/fVcVSLlsOrFytY1vD//AB6QDjiNen0rN8Xaa6t9tiUshGJVHY+v4jg/SpNKsL60aNTqDGNf4REMn8ycV0q4lQhgCCMHNNx5o2Z0UarpyUjgPDuopptz5Ujf6PJzn+6exrvoZ0mjWRHDA9CDnNc7qXhKznkMkBaBv+mZwv5fiar2uh3tk2INUdM9QYsj+f8ASoipR0ep0VZU6r5k7M6DWNpsWDNgEgda4XRwP+EllcHjy25/Kugu9H1C7h2SauxH/XH/AOvWTH4Vube482HUmVxn5hCR+u6izcrhGUI03C+53Nof3S1PWTpMc1tFtuLmW5c9WfArWHIFanK1YWikpaYgopKKAFpCARzS0UARGBG6g037NH2qeigCIQKKcEUdqfRQAlFLRQAmKY0St2p9LQBEIVHrT1QL0FOooASlpKKAGsgYcio/s0fYVNRQA1I1QcCho1fqKfRQBEIVGMDpUlLRQAU1kDDBp1FAEBtY85A5p6RKnQVJRQA1kDDBFRi2jHQVNRQA0AKMCkZFbrTqyrqXVYVmlT7GYo9zLu3bio5/PFAGkI0HG0U4bR0rHGp3H9ixX22LO471weRuI456/nQl3LqUt7bQ+X5Hk/I4yDll7nn37dqANgkHimlEPasKwlvNPvbbSpfIKFWbcgJOPmP8xQnneIdK/e7I2ScY25Axjn155NAG4I0HOKURp6ZrNutRmtLieKRY9piZ4G55IH3Tz649KtabPLc2MU0wUSOM4UEDqcdaALPlqP4RTqWigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBK5eCOab+3IrZd0jShQOBxubPX2zXUVXt7KG2klkiTDync53E5Off60AZs9hM9rpcCw5WJkaYEjAxjPfnv0qawtJbC8mjjQG1l+dXGMqf7p9q1KKAMqwtJxqt5d3UeNx2xNuB+XP6dB+tHh+0ns7F4rhNjmQnG4HjA54+latFAGJrUN1eRtbpY71U5SXzgO3p+JFalp5hto/Ni8p9uCgIIGPpU+KKAFooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Z";

//logo replacing
var oLogo = document.getElementById("lgpd");
oLogo.nextSibling.innerHTML = "";
oLogo.nextSibling.parentNode.replaceChild(oLogoImg,oLogo.nextSibling);

var aLinksText = new Array();
//web
aLinksText[0] = sOlamotInGateNet   = String.fromCharCode(1506,1493,1500,1502,1493,1514,32,1489,1490,1497,1497,1496,45,1504,1496);
//images
aLinksText[1] = sShips             = String.fromCharCode(1505,1508,1497,1504,1493,1514);
//groups
aLinksText[2] = sWeapons           = String.fromCharCode(1504,1513,1511,1497,1501);
//guides
aLinksText[3] = sGaffa             = String.fromCharCode(1490,39,1488,1508,1492);
//news
aLinksText[4] = sSholva            = String.fromCharCode(1513,1493,1500,1493,1493,1492);

//google search
aLinksText[5] = sGoauldSearch = String.fromCharCode(1495,1497,1508,1493,1513,32,1489,71,111,97,39,117,97,108,100);
//i feel lucky
aLinksText[6] = sKelShekKrey  = String.fromCharCode(1511,1500,32,1513,1488,1511,44,32,1511,1512,1497);  

//advanced search
aLinksText[7] = sSimbiotSearch     = String.fromCharCode(1495,1497,1508,1493,1513,32,1513,1497,1514,1493,1508,1504,1497,1501);

//pages in the intermet
aLinksText[8] = sSlavesInStargate  = String.fromCharCode(1506,1489,1491,1497,1501,32,1489,1505,1496,1488,1512,1490,1497,1497,1496);
//pages in hebrew
aLinksText[9] = sSlavesInJaffait   = String.fromCharCode(1506,1489,1491,1497,1501,32,1489,1490,39,1488,1508,1488,1497,1514);
//pages from israel
aLinksText[10] = sSlavesFromCholak  = String.fromCharCode(1506,1489,1491,1497,1501,32,1502,1510,39,1493,1500,1488,1511);

//promotion plan
aLinksText[11] = sPlanForSlavery    = String.fromCharCode(1514,1499,1504,1497,1514,32,1513,1497,1506,1489,1493,1491);
//all about google
aLinksText[12] = sAllAboutGoauld    = String.fromCharCode(1492,1499,1500,32,1506,1500,32,71,111,97,39,117,108,100);
//wanted
aLinksText[13] = sSimbiote          = String.fromCharCode(1513,1497,1514,1493,1508,1504,1497,1501);
//google.com in english
aLinksText[14] = sGoualGateInJafffa = "Goa'uld.gate in Jaffa";

function setText(oElement, sText, sProp){
  sProp = sProp || "innerHTML";
  oElement["title"] = oElement[sProp];
  oElement[sProp] = sText;
}


var oFirstNavigateRow = document.getElementsByTagName("TABLE")[0].rows[0].cells[0].childNodes[0];
for(i=0;i<oFirstNavigateRow.childNodes.length/2-1;i++){
  setText(oFirstNavigateRow.childNodes[i*2],aLinksText[i]);
}

var oFirstNavigateRow = document.getElementsByTagName("TABLE")[0].rows[0].cells[0].getElementsByTagName("A");
setText(oFirstNavigateRow[oFirstNavigateRow.length-1],aLinksText[i]);

if (i<5) {i=5}

oFormTD = document.getElementsByTagName("TABLE")[1].rows[0];
var resultLinks = document.evaluate("//input[@type='submit']",oFormTD, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null )
for (var n = 0; n < resultLinks.snapshotLength; n++)
{
	oInputBtn = resultLinks.snapshotItem(n);
	setText(oInputBtn, aLinksText[i++], "value");
}
setText(oFormTD.cells[2].childNodes[0].childNodes[1], aLinksText[i++]);

oLanguageBar = document.getElementsByTagName("TABLE")[1].rows[1];
var resultLinks = document.evaluate("//label",oLanguageBar, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null )
for (var n = 0; n < resultLinks.snapshotLength; n++)
{
	oLabel = resultLinks.snapshotItem(n);
	setText(oLabel, aLinksText[i++]);
}

for(n=document.links.length-4;n<document.links.length;n++){
  setText(document.links[n], aLinksText[i++]);
}

//copyrights overwriten
var aResultLinks = document.evaluate( "//body//*[text() and not(self::script)]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
for (var n = 0; n < aResultLinks.snapshotLength; n++)
{
	oElement = aResultLinks.snapshotItem(n);
  oElement.innerHTML = oElement.innerHTML.replace(/Google/g,"Goa'uld");
}

//window's title overwritten
document.title = "Goa'uld";

