// ==UserScript==
// @name          Google Maps Directions Shorthand
// @namespace     http://nick.bollweg.us/
// @include       http://maps.google.com/*
// @description	  Displays a shortened version of directions for SMS
// ==/UserScript==

var allTDs, thisTD;
var allAs, thisA;

allTDs = document.evaluate("//td[@class='title']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < 1; i++) {
	thisTD = allTDs.snapshotItem(i);
	thisTD.innerHTML +=  ' <a id="gcondense" href="javascript:void(0);">Directions for SMS (Maestro)</a>';
}

if (document.getElementById('gcondense')) {
	document.getElementById('gcondense').addEventListener('click', 
  function() { 
    function cleanDir(txt, rules){ 
      for(var i = 0; i < rules.length; i+=2){
        txt = txt.replace(rules[i],rules[i+1]);
      }
      return txt;
    } 
    
    var rules = new Array(
    /<\/{0,1}b>/g,      "",
    /from /g,      "from&nbsp;",
    /Arrive at/gi,      "Arrive@",
    /1\. /gi,      "1.",
    /Arrive\@ /gi,      "Arrive@",
    /@\&nbsp\;/g,      "@",
    /Head/g,      "",
    / Head/g,      "",
    /Turn left at /g,               "L@",
    /Turn right at /g,              "R@",
    /Bear left at /g,               "bear&nbsp;L@",
    /Bear right at /g,              "bear&nbsp; R@",
    / - go&nbsp;([^<]*)&nbsp;mi/g,  "[$1mi]",
    / - go&nbsp;([^<]*)&nbsp;ft/g,  "[$1ft]",
    /Continue on /,                         "Cont on ",
    /Take the /,                            "",
    /\[\0\.0]/,                             "[]",
    /\[0\./,                             "\[\.",
    /\Ave/,                                 "Av",
    /\ North /i,                            " N ",
    /\ South /i,                            " S ",
    /\<a href\=\"javascript\:void\(0\)\" onclick\=\"this\.blur\(\)\"\>/, "",
    /\<\/a\>/i,                            "",
    /\ East /i,                             " E ",
    /\ West /i,                             " W ",
    /\ northeast /i,                             " NE ",
    /\ northwest /i,                             " NW ",
    /\ southeast /i,                             " SE ",
    /\ southwest /i,                             " SW ",
    /\<tbody\>/i,                             "",
    /\<tr\>/i,                             "",
    /\<td\>/i,                             "",
    /([a-z])\s*([A-Z])/,                      "$1$2"
    ); 
   
    var allSegsNum = document.evaluate("//td[contains(@class,'num ul')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    var allSegsContent = document.evaluate("//body/div/div/div/table/tbody/tr/td/table/tbody/tr/td[not(@class)]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    var charCount = 0;
    var shortDir = "";
    for (var i = 0; i < allSegsNum.snapshotLength; i++) {
      var seg = allSegsNum.snapshotItem(i);
      var segContent = allSegsContent.snapshotItem(i);
	if ((seg.id != 'panel_start') && (seg.id != 'panel_end')) {
      		var cleaned = cleanDir(seg.innerHTML.toString(), rules);
      		var cleanedContent = cleaned+cleanDir(segContent.innerHTML.toString(), rules);
      		var cleanedContent2 = cleanDir(cleanedContent, rules);
      		shortDir  += cleanedContent2+"<br/>";
      		charCount += cleaned.length;
	}
    }
	shortDir = "<br><b>SMS Directions:<br><br>"+shortDir+"<br></b>";

	allTDs = document.evaluate("//div[@class='legal']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < 1; i++) {
		thisTD = allTDs.snapshotItem(i);
		thisTD.innerHTML +=  "<br/>"+shortDir;
	}

  },
  false);
}
