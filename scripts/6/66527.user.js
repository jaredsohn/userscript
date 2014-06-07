// ==UserScript==
// @name           Rullaf's Travian Little expansions
// @namespace      Travian
// @include        http://s*.travian.*
// ==/UserScript== 

/*
 @features:
 * highlights current user in alliance view (same style as statistics view)
 @featureToDo:
 *  aliance view should be splitted by AVG pop count
 *  - split content and avg row  
 *  - add functions and statuses such as 'founder', 'commander', 'diplomat' directly near name 
 *  - add info from http://www.travian.ws/analyser.pl?s=czx&aid=3569
 */

var regexpUsername = /\?chatname=(?:\w+)%7C((?:\w+(?: )?)+)/;
var username = regexpUsername.exec(document.getElementById("side_navi").innerHTML)[1];

if(window.location.toString().indexOf('allianz.php') != -1){    
  var rows = document.getElementById("member").getElementsByTagName("tr");
  
  var popsum = 0;
  var vilsum = 0;
  for (var i=1; i<rows.length; i++)
  {
    var player = rows[i].getElementsByTagName("td")[1].getElementsByTagName("a")[0].innerHTML;
    if(player == username){
      rows[i].setAttribute("class", "hl");
    }
    popsum += parseInt(rows[i].getElementsByTagName("td")[2].innerHTML);
    vilsum += parseInt(rows[i].getElementsByTagName("td")[3].innerHTML);  
  }
  var popavg = popsum / rows.length;
  var vilavg = vilsum / rows.length;
  
  var infoRow = document.createElement("tr");
  var c0 = document.createElement("td"); infoRow.appendChild(c0);
  var c1 = document.createElement("td"); infoRow.appendChild(c1);
  var c2 = document.createElement("td"); infoRow.appendChild(c2);
  var c3 = document.createElement("td"); infoRow.appendChild(c3);
  var c4 = document.createElement("td"); infoRow.appendChild(c4);
  c0.innerHTML = "avg";
  c1.innerHTML = "";
  c2.innerHTML = Math.round(popavg);
  c3.innerHTML = Math.round(vilavg);
  c4.innerHTML = "";
  rows[1].parentNode.appendChild(infoRow);
  
  for (var i=1; i<rows.length-1; i++)
  {
  console.info(parseInt(rows[i].getElementsByTagName("td")[2].innerHTML) +' | '+ Math.round(popavg));
    if(parseInt(rows[i].getElementsByTagName("td")[2].innerHTML) > popavg+1)
      rows[i].getElementsByTagName("td")[2].innerHTML += ' <span style="color: rgb(100, 190, 100);">(+' + Math.round(parseInt(rows[i].getElementsByTagName("td")[2].innerHTML) - popavg) +')</span>';
    else if(parseInt(rows[i].getElementsByTagName("td")[2].innerHTML) < popavg-1)
      rows[i].getElementsByTagName("td")[2].innerHTML += ' <span style="color: rgb(190, 100, 100);">(-' + Math.round(popavg - parseInt(rows[i].getElementsByTagName("td")[2].innerHTML)) +')</span>';
    else
      rows[i].getElementsByTagName("td")[2].innerHTML += ' <span style="color: rgb(70, 100, 190);">(+' + Math.round(parseInt(rows[i].getElementsByTagName("td")[2].innerHTML) - popavg) +')</span>';
  } 
}
