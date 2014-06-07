// ==UserScript==
// @name        Lobourse forum
// @namespace   http://www.lobourse.com/modules/newbb/viewtopic.php*
// @include     http://www.lobourse.com/modules/newbb/viewtopic.php*
// @version     1
// @grant       none
// ==/UserScript==

var content = document.getElementById("content")
//obj.tagName;

var forumTable = content.getElementsByTagName("table")[2].getElementsByTagName("tbody")[0];
var forumTableTr = forumTable.getElementsByTagName("tr");

for (var i=0; i<forumTableTr.length; i++){
    if(forumTableTr[i].getElementsByTagName("td").length != 0){
        if (forumTableTr[i].getElementsByTagName("td")[0].className == "head"){
            var userName = forumTableTr[i].getElementsByTagName("td")[0].getElementsByTagName("a")[1].innerHTML;
            if (userName == "djloic"){
                //forumTableTr[i].style.cssText="background-color:grey;";
                forumTableTr[i].getElementsByTagName("td")[0].style.backgroundColor="#B9CDE5";
                forumTableTr[i].getElementsByTagName("td")[1].style.backgroundColor="#B9CDE5";
                forumTableTr[i+1].getElementsByTagName("td")[0].style.backgroundColor="#B9CDE5";
                forumTableTr[i+1].getElementsByTagName("td")[1].style.backgroundColor="#B9CDE5";
            }
            if (userName == "jeremy4455"){
                forumTableTr[i].getElementsByTagName("td")[0].style.backgroundColor="#BCFF61";
                forumTableTr[i].getElementsByTagName("td")[1].style.backgroundColor="#BCFF61";
                forumTableTr[i+1].getElementsByTagName("td")[0].style.backgroundColor="#BCFF61";
                forumTableTr[i+1].getElementsByTagName("td")[1].style.backgroundColor="#BCFF61";
            }
        }
    }
}