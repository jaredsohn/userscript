// ==UserScript==
// @name           rym Mark Primaries
// @namespace      http://userscripts.org/users/68652
// @description    Marks primary issues for releases on rateyourmusic.com
// @include        http://rateyourmusic.com/release/*
// ==/UserScript==

var thisisPrimary = false;
var curPage = document.location.href;

if (curPage.substr(curPage.length - 3, 3) == '.p/') {
  thisisPrimary = true;
}

var allHTMLTags=document.getElementsByTagName("table");
var foundPrimary = false;

for( var i=0; i<allHTMLTags.length; i++) {
  if (allHTMLTags[i].className=='issuetable' || allHTMLTags[i].className=='mbgen')  {
    var issues;
    var pane;
    issues = allHTMLTags[i];
    
    if (issues.className=='issuetable') {
      issueRows = 3;
      targetRow = 2
    } else {
      issueRows = 6;
      targetRow = 1;
    }

    if (issues) {
      var issuesTbody = issues.getElementsByTagName("tbody") [0];
      if (issuesTbody != null) {
        
        var rows = issuesTbody.getElementsByTagName("tr");

        if (rows[0].className == 'selectedissue' || thisisPrimary) {

          for( var j=0, row=null; row=rows[j]; j++){
            var cells = row.getElementsByTagName("td");

            if (cells.length == issueRows) {
              var urlcell = row.getElementsByTagName("td")[targetRow];

              if (thisisPrimary) {
                if ( row.className == "selectedissue" ) 
                  foundPrimary = true;
              } else {
                var urlcellelements = urlcell.getElementsByTagName("a");
                var url = urlcellelements[0].href;
                var primary = url.substr(url.length - 3, 3);
                if ( primary == '.p/' )
                  foundPrimary = true;
              }

              if (foundPrimary) {
                primMarker = document.createElement("span");
                primMarker.setAttribute('style', 'color: #FF6666');
                primMarker.appendChild(document.createTextNode( " [primary]"));
                urlcell.appendChild(primMarker);
              }           
            }
            if (foundPrimary)
              break;
          }
        }
      }
    }
  }
  if (foundPrimary)
    break;
} 
