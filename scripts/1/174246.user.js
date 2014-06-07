// ==UserScript==
// @name       TF2 Trading Phishing Protection
// @namespace  Im too poor
// @version    0.1
// @description  Warns users about phishing links
// @include      *tf2outpost.com*
// @include      *bazaar.tf*
// @include      *tf2tp.com*
// @copyright  2013+, You
// @require http://code.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==

var realSites = ["steamcommunity.com", "backpack.tf", "tf2b.com", "bazaar.tf", "tf2tp.com", "trade.tf", "scrapbank.me", "scrap.tf","tf2r.com"];

var $ = unsafeWindow.jQuery;
function saveThePhish()
{
    var links = document.getElementsByTagName('a');

    for(var i = 0; i < links.length; i++)
    {
        var url = links[i].href;
        var splitdomain = url.split("/");
        if(splitdomain.length > 2)
        {
            var domain = splitdomain[2];
            var results = [];
            for(var j = 0; j<realSites.length; j++)
            {
                results.push(distance=levDist(domain, realSites[j]));
            }
            if($.inArray(0, results) == -1)
            {
                for(var val = 0; val<results.length; val++)
                {
                    if(results[val]<4)
                    {
                    	$(links[i])
                    	.css('text-decoration','line-through').after("<span style='color:yellow;padding:2px;background:red;border-radius:10px; border:1px solid black;'>WARNING, PROBABLE PHISHING LINK</span>")
                    	.click(function(e){e.preventDefault(); return false;}).css('cursor','default');
                    	break;
                    }
                }
            }
        }
    }
}


var levDist = function(s, t) {
    var d = []; //2d matrix

    // Step 1
    var n = s.length;
    var m = t.length;

    if (n == 0) return m;
    if (m == 0) return n;

    //Create an array of arrays in javascript (a descending loop is quicker)
    for (var i = n; i >= 0; i--) d[i] = [];

    // Step 2
    for (var i = n; i >= 0; i--) d[i][0] = i;
    for (var j = m; j >= 0; j--) d[0][j] = j;

    // Step 3
    for (var i = 1; i <= n; i++) {
        var s_i = s.charAt(i - 1);

        // Step 4
        for (var j = 1; j <= m; j++) {

            //Check the jagged ld total so far
            if (i == j && d[i][j] > 4) return n;

            var t_j = t.charAt(j - 1);
            var cost = (s_i == t_j) ? 0 : 1; // Step 5

            //Calculate the minimum
            var mi = d[i - 1][j] + 1;
            var b = d[i][j - 1] + 1;
            var c = d[i - 1][j - 1] + cost;

            if (b < mi) mi = b;
            if (c < mi) mi = c;

            d[i][j] = mi; // Step 6

            //Damerau transposition
            if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
                d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
            }
        }
    }

    // Step 7
    return d[n][m];
}

$(function()
  {
      saveThePhish();
  }
);