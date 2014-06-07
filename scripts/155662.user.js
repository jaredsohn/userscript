// ==UserScript==
// @name       Movescount exporter
// @namespace  http://userscripts.org/scripts/show/155662
// @version    0.2
// @description  Performs batch exports of moves (excersices) from movescount.com
// @match      http://*.movescount.com/mymoves/summary
// @include    htt*://*.movescount.com/mymoves/summary
// @copyright  2013, HimpoN
// ==/UserScript==
function myFunction()
{	
    var sel_moves = document.getElementById('ctl00_rightColumn_MovesTable1_MovesCountGridView1_CheckedRows').value;
    var moveid_list = sel_moves.replace(/'/g,"").split(',');
    var len = moveid_list.length;
    var urlstring;
    var wins = new Array();
    var p = prompt("No of moves that will be exported: " + len.toString() + "\nEnter what format(s) you would like to download:\nkml, gpx, xlsx or all\nPress Ok to start, press cancel to abort" , "all" );
    
    if ( !(p == 'gpx' || p == 'kml' || p == 'xlsx' || p == 'all') ){
        p = null;
    }
    
    if ( p != null ) {
        for (var i = 0; i < len; i++) {
            
            if ( p == 'all' ) {
                urlstring = 'http://www.movescount.com/ExportMove.aspx?move=' + moveid_list[i].toString() + '&format=';
                try {
                    wins[(i*3)] = window.open(urlstring+'kml');// , "dl1");
                    wins[(i*3)+1] = window.open(urlstring+'gpx');// , "dl2");
                    wins[(i*3)+2] = window.open(urlstring+'xlsx');// , "dl3");
                } catch (e ) {
                    window.alert("Error: " + e.toString );
                }
            } else {                
                urlstring = 'http://www.movescount.com/ExportMove.aspx?move=' + moveid_list[i].toString() + '&format=' + p;                
                try {
                    wins[i] = window.open(urlstring);// , "dl");
                } catch (ee ) {
                    window.alert("Error: " + ee.toString );
                }
            }
        }
        window.alert("Press OK when download is done, to close windows...");
        for (var j = 0; j < wins.length; j++) {
            wins[j].close();
        }    
    } else {
        window.alert("Cancelled!");
    }
}
var newLi = document.createElement('li');
var newLink = document.createElement('a');
newLink.href = '';
newLink.className = 'icon-export';
newLink.onclick = function(){ myFunction();return false; } ;
newLink.appendChild(document.createTextNode('Export selected'));
newLi.appendChild(newLink);
var elmFoo = document.getElementsByClassName('addMoveLink');
elmFoo[0].parentNode.insertBefore(newLi, elmFoo.nextSibling);