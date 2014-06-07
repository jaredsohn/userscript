// ==UserScript==
// @name        mmmturkeybacon Numbered Google Results
// @author      mmmturkeybacon
// @description Numbers Google search results in the format M.N to show the result number.
//              N counts up from 1 to 10, after that M is incremented by 1 and N starts over
//              at 1. For example, result eleven is labeled 2.1, result fifty is labeled 5.10,
//              and results one through ten are simply labeled 1,2,3...10. With Google Instant
//              turned on this script doesn't work after the first page, but this script is
//              really meant to be run on a page with more than 10 results anyway. This script
//              is probably only useful to mturk workers.
// @namespace   http://userscripts.org/users/523367
// @include     http*://www.google.*/search?*
// @downloadURL http://userscripts.org/scripts/source/172524.user.js
// @updateURL   http://userscripts.org/scripts/source/172524.meta.js
// @grant       none
// @version     1
// ==/UserScript==

// If you have Google set to return 10 results per page (default), the first
// page usually has 10 results but not sometimes it will have fewer.

// If you change Results per page under Search Settings, Google will return
// more results per page. The number of links on the page might not always be
// the same as the number of results per page you chose. That's because Google
// doesn't count every link it shows you as a result.
// Ads aren't counted
// "More results from ..." are grouped with the link they are under. Google
// counts this as one result.
// "Images for ..." aren't counted. (imagebox_bigimages)
// "News for ..." and all the the links grouped with it are counted as one
// result?? (newsbox)

 (function() {
    // If instant search has enabled
    //if(document.getElementById('misspell')) return;
	
    var p_result = document.getElementById('res');
    if (!p_result) return;

    //Create Array of All HTML Tags
    var allLiTags = p_result.getElementsByTagName("li");

    var i;
    var result_num = 0;
    var page_num = 1;
    var page_str = '';
    for (i = 0; i < allLiTags.length; i++)
    {
        if (allLiTags[i].className == 'g' || allLiTags[i].className == 'g w0')
        {
            //if (allLiTags[i].id == 'imagebox_bigimages')
            if (allLiTags[i].id == 'imagebox_bigimages' || allLiTags[i].id == 'newsbox')
            {
                continue;
            }

            var h3 = allLiTags[i].getElementsByTagName('h3');
            if(!h3[0])
            {
                continue;
            }

            result_num++;
            if (result_num > 10)
            {
                page_num++;
                page_str = page_num + '.'
                result_num = result_num - 10;
            }
            h3[0].innerHTML = page_str + result_num + '-&nbsp;' + h3[0].innerHTML;
        }
    }

})();

