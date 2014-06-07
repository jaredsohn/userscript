// ==UserScript==
// @name       eZ Wit Prettify URL
// @namespace  http://psicofrenia.com
// @version    1.1
// @description  eZ Wit Prettify URL
// @match      http://project.issues.ez.no/IssueView.php?Id=*
// @match      http://project.issues.ez.no/NetworkIssueList.php?d[]=*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @copyright  2013, Eduardo Fernandes
// ==/UserScript==

//Fix URL, if the URL is in bad format
if(document.URL.indexOf('IssueView.php') > -1) document.location.href = prettifyUrl(document.URL);

$("a[href^='IssueView.php']").each(function(){
    $(this).attr('href',prettifyUrl($(this).attr('href')));
});

//<a href="IssueView.php?Id=11706&amp;activeItem=1" title="View Issue">#011706</a>

//Prettyfies the URL
function prettifyUrl(url){
    var parser = document.createElement('a');
    parser.href = url;
    var issueId = parser.search.substring(4, parser.search.indexOf('&'));
    return parser.protocol + '//' +  parser.hostname + '/' + issueId;     
}