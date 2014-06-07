// ==UserScript==
// @name       Walkability Score for xenosynth
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*.com/cms/Modules/IMG/ContentHero/Project/EditDevProject.aspx*
// @copyright  2012+, You
// ==/UserScript==
console.log("started OK");
var address = new Array();
address[1]= document.getElementById("ctl00_Main_TextBoxCompanyStreet").value;
address[2]= document.getElementById("ctl00_Main_TextBoxCompanyCity").value;
address[3]=document.getElementById("ctl00_Main_TextBoxCompanyState").value;
address[4]= document.getElementById("ctl00_Main_TextBoxCompanyZip").value;
var longaddress = "http://walkscore.com/score/";

for (var i=1; i<=4; i++){
address[i] = address[i].replace(/\s+/g, '-').toLowerCase();
    longaddress = longaddress + address[i];

    if (i <4){
        longaddress = longaddress + "-";

    }
console.log(longaddress);
}
var links = document.evaluate("//a[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i=0; i<links.snapshotLength; i++) {
    var thisLink = links.snapshotItem(i);
    thisLink.href = thisLink.href.replace('http://www.walkscore.com/',
                                          longaddress);

}
