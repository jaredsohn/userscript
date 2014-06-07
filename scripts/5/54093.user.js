// StumbleStars For Google
// version 0.1 alpha
// 2008-05-13
// Copyright (c) 2008, Jason Whitener
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
 
// ==UserScript==
// @name          StumbleStars For Google
// @namespace     http://jasonwhitener.com
// @description   Script to remove anything not marked by a Stumble Star
// @include       http://www.google.com/search?
// ==/UserScript==
 
 
        filter_it = function() {
        allDivgs = document.evaluate(
                "//li",
                document,
                null,
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                null);
        for (var i = 0; i < allDivgs.snapshotLength; i++) {
                thisDivg = allDivgs.snapshotItem(i);
                        
                var myRegExp = /smallstumble.png/;
                var string1 = thisDivg.innerHTML;
                var matchPos1 = string1.search(myRegExp);
                
                if(matchPos1 != -1)
                                 temp = 'temp';
                else
                                thisDivg.innerHTML = '';
         
        }
        return false;
}
 
var script = document.createElement('script'); 
script.innerHTML= "filter_it="+ filter_it.toSource();
script.type="text/javascript";
document.body.appendChild(script);
 
var forms=document.getElementsByTagName('form');
for (var i = 0; i < forms.length; i++) {
        var el = forms[i].appendChild(document.createElement('div'));
        el.innerHTML = '<button onclick="filter_it();return false">See Stumble Stars</button>';
}