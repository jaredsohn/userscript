// ==UserScript==
// @name        Fix error while visiting Guangdong Traffic Peccancy
// @description Fix error while visiting Guangdong Traffic Peccancy 
// @author      dialox
// @namespace   
// @version     20120221
// @include     http://www.gdgajj.gov.cn/wzss/searchwzss.jsp
// ==/UserScript==

var vericode;

vericode=document.getElementByName("randcode2");

alert("check point1");
if (vericode)
{
    alert(check piont2");
    vericode.parentNode.removeChild(vericode);
    //vericode.setAttribute("id","randcode2");
}
else
    alert("randcod2 not found");