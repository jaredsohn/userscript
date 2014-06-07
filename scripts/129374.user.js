// ==UserScript==
// @name           ShowBDCricketersRanking 
// @namespace      Mokadd.im/gmscripts/iccrankinsbd
// @description    Show the ranking of for Bangladeshi Cricket Players 
// @include        /^http://www\.relianceiccrankings\.com/ranking.*/
// @version        1.0.0
// ==/UserScript==
var  w = unsafeWindow
    ,cn="getElementsByClassName"
    ,i=0
    ,c=w.document[cn]("top100nation")
    ,t=w.document[cn]("top100table")[0];

for(i=0;i<c.length;i++){
    var ix = c[i].parentNode.rowIndex;
    if(c[i].title!="BAN"){
        t.deleteRow(ix);
        i--;
    }
}

