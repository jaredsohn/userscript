// ==UserScript==
// @name           Tipy up SourceForge download page
// @namespace      http://technomancy.org
// @include        http://sourceforge.net/project/showfiles.php?group_id=*
// ==/UserScript==

function remove_annoying( xpath_queries )
{
    for( j=0; j<xpath_queries.length; j++ )
    {
        xpath_query = xpath_queries[j];
        console.log( "looking at " + xpath_query );
        // some xpath magic from mark pilgram’s dive into greasemonkey
        var data = document.evaluate(xpath_query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for(i=0; i<data.snapshotLength; i++)
        {
            node = data.snapshotItem(i);
           
            node.parentNode.removeChild(node);
        }
    }   
}

remove_annoying( new Array( "//div[@id='fad1p']", "//div[@id='fad6p']", "//div[@id='adbatch']" ) );