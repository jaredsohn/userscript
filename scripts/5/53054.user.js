// ==UserScript==

// @name           Replace Library Form

// @namespace      http://zeitkunst.org

// @description    Replace the worldcat form with the "classic" one

// @include        http://www.library.cornell.edu/

// @include        http://*.library.cornell.edu

// @version        0.1.4

// ==/UserScript==



window.addEventListener('load',

    function() {

        divToReplace = document.getElementById("quick-search");

        divToReplace.innerHTML = "<form name=\"querybox\" action=\"http://www.library.cornell.edu/script/opac-redirect.php\" method=\"get\"><h2>for</h2> &nbsp;&nbsp; <span class=searchForm> <input size=\"25\" name=\"Search_Arg\" id=searchInput> <select name=\"Search_Code\" size=\"1\"> <option selected value=\"TALL\">Title</option> <option value=\"JALL\">Journal Title</option> <option value=\"ISSN\">Journal Title Abbreviation</option> <option value=\"NAME_\">Author</option> <option value=\"SUBJ_\">Subject Heading</option> <option value=\"CALL_\">Call Number</option> <option value=\"AUTH\">Author--Sorted by Title</option> <option value=\"FT*\">Relevance Keyword</option> <option value=\"CMD\">Command Keyword</option> </select><input type=\"hidden\" value=\"1\" name=\"HIST\"/><input type=\"hidden\" value=\"10\" name=\"CNT\" /><input style=\"margin-left: 5px\" type=\"submit\" value=\"Search\"/></span></form><div id=\"classic-catalog-tab\" class=\"advanced-search\"> <a href=\"http://catalog.library.cornell.edu\">Classic Catalog</a></div><div class=\"advanced-search\"><a href=\"javascript:void(0);\" id=\"toggleExplanation\">Explain what's going on</a></div><div class=\"advanced-search\" style=\"font-size: smaller\"><div id=\"replaceLibraryFormExplanation\" style=\"display: none\">Don't use the new library catalog!<br/>There are privacy concerns when using worldcat.org,<br/>the new search results page is less useful, and<br/>purchasing books through affiliate links of <br/>multi-national corporations goes against the library's core mission.<br/>  Only use the classic catalog!</div></div>";

        // See this page for accessing the jquery "$" element:

        // http://jimbojw.com/wiki/index.php?title=Using_Prototype_and_Scriptaculous_with_Greasemonkey 

        $ = unsafeWindow['window'].$;



        // we use the jquery toggle function to display or hide the explanation

        $('#toggleExplanation').click(function() {$('#replaceLibraryFormExplanation').toggle();});

    }

, true);
