// ==UserScript==
// @name           NRW RLT-Starterliste
// @namespace      http://www.bminton.de/gmonkey/alleturniere
// @description    Starterliste zu NRW-RLT anpassen
// @include        http://www.badminton-nrw.de/fileadmin/spielausschuss/RLT/*/*.htm
// @include        http://www.blv-nrw.de/rang/rang_aus/*_sheet*.htm
// @version      1.0.2
// ==/UserScript==


var arr = document.getElementsByTagName("font");

for(var i = 0; i < arr.length; i++)
{
    //  <td class=xl140 align=center><font face="Arial">01-062750</font></td>
  if(arr[i].childNodes.length>0 && typeof(arr[i].firstChild.data)=='string' && arr[i].firstChild.data.substr(2,1)=='-' && arr[i].firstChild.data.length>7)
  {
    //alert(i + ' - ' + arr[i].nodeName + ' / '   + ' | ' + arr[i].firstChild.data);
    var pid = arr[i].firstChild.data;
    arr[i].innerHTML = '<a target="_blank" href="http://www.alleturniere.de/find.aspx?a=8&oid=E3B0DC28-EDDE-426A-9DD9-600D26DCF680&q=' + pid + '">' + pid + '</a>'
  }
}