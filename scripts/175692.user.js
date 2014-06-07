// ==UserScript==
// @name              Filtrar tripfags do sul
// @description       Filtra boiolas com "curitiba" no trip
// @icon                  http://s3.amazonaws.com/uso_ss/icon/156662/large.png?1358322466
// @author              ipanema
// @namespace           /lulz
// ==/UserScript==


var allLinks, thisLink;

//get everyone in here
allLinks = document.evaluate(
    '//span[@class="commentpostertrip"] | //span[@class="postertrip"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

//take a look at each faggot
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    var faggot = thisLink.parentNode.getElementsByClassName("name")[0];
    var tripfaggot = faggot.innerHTML;


//all those patterns    
    var pattern = new RegExp(/curitiba/i);
    var pattern2 = new RegExp(/south brazil/i);
    var pattern3 = new RegExp(/separatist/i);
    
    var boolean = pattern.test(tripfaggot);
    var boolean2 = pattern2.test(tripfaggot);
    var boolean3 = pattern3.test(tripfaggot);


//believe in magic

        if (boolean || boolean2 || boolean3)
        {
        faggot.parentNode.parentNode.parentNode.style.display = "none";
        }

}

