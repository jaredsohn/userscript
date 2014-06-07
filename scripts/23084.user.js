// ==UserScript==
// @name          SEOMarker
// @namespace     http://www.florian-stelzner.de/tools/seomarker-greasemonkey-plugin/
// @author        Florian Stelzner <info@florian-stelzner.de>
// @website       http://www.florian-stelzner.de
// @include       *
// @description   Highlight SEO relevant Tags 
// @version       1.0
// ==/UserScript==

// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
function highlight()
{
  //coloring h1-tags
  for (var i = 0; i < document.getElementsByTagName("h1").length; i++)
  {
    document.getElementsByTagName("h1")[i].style.color = "#000000";
    document.getElementsByTagName("h1")[i].style.backgroundColor = "#ffa7a7";
    document.getElementsByTagName("h1")[i].style.border = "2px solid #ff0000";
  }
  
  //coloring h2-tags
  for (var i = 0; i < document.getElementsByTagName("h2").length; i++)
  {
    document.getElementsByTagName("h2")[i].style.color = "#000000";
    document.getElementsByTagName("h2")[i].style.backgroundColor = "#ffbd7d";
    document.getElementsByTagName("h2")[i].style.border = "2px solid #ff0000";
  }
  
  //coloring h3-tags
  for (var i = 0; i < document.getElementsByTagName("h3").length; i++)
  {
    document.getElementsByTagName("h3")[i].style.color = "#000000";
    document.getElementsByTagName("h3")[i].style.backgroundColor = "#ffd956";
    document.getElementsByTagName("h3")[i].style.border = "2px solid #ff0000";
  }
  
  //coloring strong-tags
  for (var i = 0; i < document.getElementsByTagName("strong").length; i++)
  {
    document.getElementsByTagName("strong")[i].style.color = "#ffffff";
    document.getElementsByTagName("strong")[i].style.backgroundColor = "#595959";
    document.getElementsByTagName("strong")[i].style.border = "2px solid #bfbfbf";
  }
  
  //coloring bold-tags
  for (var i = 0; i < document.getElementsByTagName("b").length; i++)
  {
    document.getElementsByTagName("b")[i].style.color = "#ffffff";
    document.getElementsByTagName("b")[i].style.backgroundColor = "#595959";
    document.getElementsByTagName("b")[i].style.border = "2px solid #bfbfbf";
  }
  
  //coloring links (enable if you like green)
  /*for (var i = 0; i < document.getElementsByTagName("a").length; i++)
  {
    document.getElementsByTagName("a")[i].style.color = "#000000";
    document.getElementsByTagName("a")[i].style.backgroundColor = "#a9fc84";
    document.getElementsByTagName("a")[i].style.border = "2px solid #277e00";
  }*/
  
  var infotext = document.createElement("div");
  infotext.innerHTML = '<div style="font-family:Verdana, Arial, sans-serif;font-size:12px;width:100%;height:65px;margin:0; ' + 
  'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
  'background-color: #eeeeee; padding:5px 5px 5px 5px;' +
  'color: #000000;text-align:left;">' +
  '<table align="center" width="90%" border="1" cellpadding="5"><tr>'+
  '<td rowspan="2"><b>SEO-Counter</b></td>'+
  '<th align="center" style="background-color:#ffa7a7;">h1</th>'+'<th align="center" style="background-color:#ffbd7d;">h2</th>'+'<th align="center" style="background-color:#ffd956;">h3</th>'+'<th align="center" style="background-color:#595959;">strong(b)</th>'+'<th align="center" style="background-color:#a9fc84;">a</th>'+
  '</tr><tr>'+
  '<td align="center" style="background-color:#ffa7a7;">' + document.getElementsByTagName("h1").length + '</td>'+'<td align="center" style="background-color:#ffbd7d;">' + document.getElementsByTagName("h2").length + '</td>'+'<td align="center" style="background-color:#ffd956;">' + document.getElementsByTagName("h3").length + '</td>'+'<td align="center" style="background-color:#595959;">' + (document.getElementsByTagName("strong").length+document.getElementsByTagName("b").length) + '</td>'+'<td align="center" style="background-color:#a9fc84;">' + document.getElementsByTagName("a").length + '</td>'+
  '</table>'+
  '</div>';
  document.body.insertBefore(infotext, document.body.firstChild);


}
highlight();