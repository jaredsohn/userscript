// ==UserScript==
// @name           datas para o mservice
// @namespace      http://userscripts.org/users/zipleen
// @description    adicionar setinhas para no calendario do mservice podermos andar para o dia seguinte e anterior mais rapidamente...
// @include        http://mservice.ts.fujitsu.com/mainbody/myhoras_new_version.asp*
// ==/UserScript==

var pathArray = window.location.href.split( '=' );
var parts = pathArray[2].match(/(\d+)/g);
  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  bb = new Date(parts[2], parts[1]-1, parts[0])
  bb.setTime ( bb.getTime()-86400000)
  cc = new Date(parts[2], parts[1]-1, parts[0])
  cc.setTime ( cc.getTime()+86400000)
  //dd.getDate() + "-" + (dd.getMonth()+1) + "-" + dd.getFullYear()

ab = document.forms[1].getElementsByTagName("tr")[0].getElementsByTagName("tr")[0]
el1 = document.createElement("td")
el1.innerHTML = "<a href='http://mservice.ts.fujitsu.com/mainbody/myhoras_new_version.asp?page=2&Data="+bb.getDate() + "-" + (bb.getMonth()+1) + "-" + bb.getFullYear()+"'><img src='http://mservice.ts.fujitsu.com/Images/.%5CPrev.gif'></a>"
el1.className = "header"
el1.align = "center"
ab.appendChild(el1)

el2 = document.createElement("td")
el2.innerHTML = "<a href='http://mservice.ts.fujitsu.com/mainbody/myhoras_new_version.asp?page=2&Data="+cc.getDate() + "-" + (cc.getMonth()+1) + "-" + cc.getFullYear()+"'><img src='http://mservice.ts.fujitsu.com/Images/.%5CNext.gif'></a>"
el2.className = "header"
el2.align = "center"
ab.appendChild(el2)
