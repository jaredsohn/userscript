// Change URL Parameter
// version 0.0.1
// 2013-09-13
// Copyright (c) 2013, Rick Bychowski
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          Change URL Parameters
// @namespace     http://hiranyaloka.com/
// @description   General script to add or change a url parameter (e.g. "form=true") of a page link. Requires fiddling with the script settings.
// @include
// @version       0.0.1
// @grant         none
// ==/UserScript==

//  Set these values
var paramKey   = 'app%5Bviper_mode%5D';
var paramValue = 'false';

// Use XPath to target desired link(s). See https://developer.mozilla.org/en-US/docs/Introduction_to_using_XPath_in_JavaScript

var allLinks = document.evaluate(
    "//div[@id='standardLink']/a",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
    var thisLink = allLinks.snapshotItem(i);
    var baseLink, newParams;
    if (thisLink.href.match(/\?/i)) {
        // link contains a parameter.
        var split_url = thisLink.href.split("?");
        baseLink = split_url[0];

        var foundParam  = false;
        var paramList   = new Array();
        var paramRE     = new RegExp(paramKey, 'i');
       
        var params = split_url[1].split("&");
        for (var i = 0; i < params.length; i++) {
            var param;
            if (params[i].match(paramRE)) {
            // Parameter is present, so override.
                param = paramKey + '=' + paramValue;
                foundParam = true;
            } else {
                param = params[i];
            }

            paramList.push(param);
     
        }
        
        if (foundParam == false) {
            // Parameter was not present, so append it.
            paramList.push( paramKey + '=' + paramValue);
        }

    } else {
        // link does not contain any parameters, so append it
            paramList.push( '?' + paramKey + '=' + paramValue);
    }

    
    newParams = paramList.join('&');
    thisLink.href = baseLink + '?' + newParams;
}
    
//
// ChangeLog
// 2013-09-13 - 0.0.1 - Initial upload
//
