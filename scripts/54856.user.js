// ==UserScript==
// @name           Travian: Alliance Member Info
// @namespace      Travian
// @include        *.travian.*/dorf1.php
// @include        *.travian.*/dorf2.php
// @include        *.travian.*/allianz.php
// @include        *.travian.*/allianz.php?newdid=*
// @version        1.3.7
// @author         Rullaf
// ==/UserScript==
var server = new RegExp("http:\\/\\/([^\"]+?)\\.travian\\.(\\w+?)\\/", "i");
//var subdomain = server.exec(document.body.innerHTML)[1];
var subdomain = server.exec(document.childNodes[1].innerHTML)[1];
var supdomain = server.exec(document.childNodes[1].innerHTML)[2];
server = "http://" + subdomain + ".travian."  +supdomain + "/"; 
//alert(server);
//alert("Travian: Alliance Member Info is active" + "\r\n" + "server: "+server);

var uid = new RegExp("spieler.php\\?uid=(\\d+)\">", "i");
var IDuser = uid.exec(document.body.innerHTML)[1];

if(window.location.href.indexOf("dorf")!=-1){
  //alert("dorf");
 
  var user = new RegExp("chatname=\\w+?%7C(.+?)\" target=\"_blank\">Chat<\/a>");
  var Username = user.exec(document.body.innerHTML)[1];
  //alert(Username);
   
  var IDalliance = "4508";
  //alert(document.getElementById("res").innerHTML);
  var lumber = new RegExp("<td id=\"l4\" title=\"(\\d+)\">(\\d+)\\/(\\d+)<\\/td>", "i");
  var clay = new RegExp("<td id=\"l3\" title=\"(\\d+)\">(\\d+)\\/(\\d+)<\\/td>", "i");
  var iron = new RegExp("<td id=\"l2\" title=\"(\\d+)\">(\\d+)\\/(\\d+)<\\/td>", "i");
  var crop = new RegExp("<td id=\"l1\" title=\"(\\d+)\">(\\d+)\\/(\\d+)<\\/td>", "i");
  var lumberP = lumber.exec(document.getElementById("res").innerHTML)[1];
  var lumberC = lumber.exec(document.getElementById("res").innerHTML)[2];
  var lumberM = lumber.exec(document.getElementById("res").innerHTML)[3];
  var clayP = clay.exec(document.getElementById("res").innerHTML)[1];
  var clayC = clay.exec(document.getElementById("res").innerHTML)[2];
  var clayM = clay.exec(document.getElementById("res").innerHTML)[3];
  var ironP = iron.exec(document.getElementById("res").innerHTML)[1];
  var ironC = iron.exec(document.getElementById("res").innerHTML)[2];
  var ironM = iron.exec(document.getElementById("res").innerHTML)[3];
  var cropP = crop.exec(document.getElementById("res").innerHTML)[1];
  var cropC = crop.exec(document.getElementById("res").innerHTML)[2];
  var cropM = crop.exec(document.getElementById("res").innerHTML)[3];
 
  //alert(IDuser + " - " +  IDalliance + " - " +  lumberP + " - " +  lumberC + " - " +  lumberM + " - " +  clayP + " - " +  clayC + " - " +  clayM + " - " +  ironP + " - " +  ironC + " - " +  ironM + " - " +  cropP + " - " + cropC + " - " + cropM);
 
  var xmlhttp=GetXmlHttpObject();
  if (xmlhttp===null)
  {
    alert ("Browser does not support HTTP Request");
  }
  else{
    var url="http://host.rullaf.com/travian/TravianAllianceMemberInfo/database.php"+
      "?Server="+server+
      "&IDuser="+IDuser+
      "&IDalliance="+IDalliance+
      "&Username="+Username+
      "&LumberP="+lumberP+
      "&LumberC="+lumberC+
      "&LumberM="+lumberM+
      "&ClayP="+clayP+
      "&ClayC="+clayC+
      "&ClayM="+clayM+
      "&IronP="+ironP+
      "&IronC="+ironC+
      "&IronM="+ironM+
      "&CropP="+cropP+
      "&CropC="+cropC+
      "&CropM="+cropM+
      "&sid="+Math.random();
    //alert (url);
    //xmlhttp.onreadystatechange=stateChanged;
    xmlhttp.open("GET",url,false);
    xmlhttp.send(null);
  }
}
else if(window.location.href.indexOf("allianz")!=-1){
  var table = document.getElementById('member');
  //table.childNodes[0].childNodes[1].childNodes[1].innerHTML = "#";
  var tdheaderplayer = table.childNodes[0].childNodes[1].childNodes[3];
  var tdheaderupdate = document.createElement('th');
      tdheaderupdate.innerHTML = "<b>Last Update</b>";
      insertAfter(tdheaderplayer.parentNode,tdheaderupdate,tdheaderplayer);
  //alert(tdheaderplayer.innerHTML);
  for(var i=0;i<60;i+=2){
    var row = table.childNodes[1].childNodes[i];
    if(row!=null){
      var td = document.createElement('td');
          td.setAttribute('colspan','5');
      var tr = document.createElement('tr');
          tr.appendChild(td);
      insertAfter(row.parentNode,tr,row);
         
      table.childNodes[1].childNodes[i].childNodes[1].setAttribute('rowspan','2');     
     
      var user = new RegExp(">([^\"]+?)<\\/a><\\/td><td class=\"hab\">");
      user = user.exec(row.innerHTML)[1];
      //alert(user);
      var frame = document.createElement('iframe');
      frame.setAttribute('id','memberinfo');
      frame.setAttribute('frameborder','0');
      frame.setAttribute('scrolling','no');
      frame.setAttribute('src','http://host.rullaf.com/travian/TravianAllianceMemberInfo/read_database.php?IDuser='+IDuser+"&user="+user+"&Server="+server);
      //alert(frame.src);
      frame.setAttribute('style','"position:absolute;width: 100%; height: auto; border: 0px none;"');
      frame.height = "35px";
      frame.width = "100%";
      td.appendChild(frame);
      }
  }
  for(var i=0;i<60;i+=2){
    var row = table.childNodes[1].childNodes[i];
    if(row!=null){
      /*user = new RegExp(">([^\"]+?)<\\/a><\\/td><td class=\"hab\">");
      user = user.exec(row.innerHTML)[1];*/
      var tdplayer = table.childNodes[1].childNodes[i].childNodes[2];
      user = new RegExp(">([^\"]+?)</a>");
      user = user.exec(tdplayer.innerHTML)[1];
      var td_last = document.createElement('td');
          td_last.width = "30%";
          //td_last.innerHTML = "i="+i+"<br>"+tdplayer.innerHTML+"<br>"+user;
          //td_last.innerHTML = "<iframe id=\"lastupdate\" src=\"http://host.rullaf.com/travian/TravianAllianceMemberInfo/read_database.php?IDuser="+IDuser+"&user="+user+"&Server="+server+"&LU=true\" scrolling=\"no\" style=\"position:absolute;width: 100%; height: auto; border: 0px none;\" height=\"35px\" width=\"100%\">";
      //td_last.innerHTML = "MM-DD 00:55:88";
      insertAfter(tdplayer.parentNode,td_last, tdplayer);
      var frameupdate = document.createElement('iframe');
          frameupdate.scr = "http://host.rullaf.com/travian/TravianAllianceMemberInfo/read_database.php?IDuser="+IDuser+"&user="+user+"&Server="+server+"&LU=true";
          //alert(frameupdate.scr);
          frameupdate.setAttribute('id','lastupdate');
          frameupdate.setAttribute('frameborder','0');
          frameupdate.setAttribute('scrolling','no');
          //alert(user);
          frameupdate.setAttribute('src','http://host.rullaf.com/travian/TravianAllianceMemberInfo/read_database.php?IDuser='+IDuser+"&user="+user+"&Server="+server+"&LU=true");
          frameupdate.setAttribute('style','"position:absolute;width: 100%; height: auto; border: 0px none;"');
          frameupdate.height = "15px";
          frameupdate.width = "100%";
      td_last.appendChild(frameupdate); 
    }
  }
}
function insertAfter(parent, node, referenceNode) {
  parent.insertBefore(node, referenceNode.nextSibling);
}
/*function stateChanged()
{
  //not working on different server
}*/
function GetXmlHttpObject()
{
if (window.XMLHttpRequest)
  {
  // code for IE7+, Firefox, Chrome, Opera, Safari
  return new XMLHttpRequest();
  }
if (window.ActiveXObject)
  {
  // code for IE6, IE5
  return new ActiveXObject("Microsoft.XMLHTTP");
  }
return null;
}