// ==UserScript==
// @name			Hide JAF's
// @description		Remove the JAF's that you are not eligible for
// @include			http://placements.iitb.ac.in/placements/studjaf4stud.jsp
// @include			http://placements.iitb.ac.in/placements/studsign2.jsp
// @include			http://placements.iitb.ac.in/placements/studunsign2.jsp
// @match			http://placements.iitb.ac.in/placements/studjaf4stud.jsp
// @match			http://placements.iitb.ac.in/placements/studsign2.jsp
// @match			http://placements.iitb.ac.in/placements/studunsign2.jsp
// ==/UserScript==
var b1=document.createElement('input'); var b2=document.createElement('input');
b1.setAttribute('type','button'); b2.setAttribute('type','button');
b1.setAttribute('value','Hide Faltu JAFs'); b2.setAttribute('value','Show All JAFs');
b1.setAttribute('id','h_jaf'); b2.setAttribute('id','s_jaf');
b1.setAttribute('onclick',"(function(){var x=document.getElementsByTagName('tr');var l=x.length-3;var s=1;for(var i=8;i<l;i++){var y=x[i].getElementsByTagName('td')[12];z=y.children;var v=false;if(z.length>0){if(z[0].innerHTML=='Not Eligible!!')v=true;}else if(y.innerHTML=='Jaf Closed')v=true;if(v){x[i].setAttribute('style','display:none');continue;}if(s==1)x[i].setAttribute('bgcolor','#FFCC99');else x[i].removeAttribute('bgcolor');s*=-1}document.getElementById('h_jaf').setAttribute('style','display:none');document.getElementById('s_jaf').removeAttribute('style');})();");
b2.setAttribute('onclick',"(function(){var x=document.getElementsByTagName('tr');var l=x.length-3;var s=1;for(var i=8;i<l;i++){x[i].removeAttribute('style');if(s==1)x[i].setAttribute('bgcolor','#FFCC99');else x[i].removeAttribute('bgcolor');s*=-1}document.getElementById('s_jaf').setAttribute('style','display:none');document.getElementById('h_jaf').removeAttribute('style');})();");
var row=document.getElementsByTagName('tr')[1];
row.children[0].setAttribute('colspan','12');
var tab=row.appendChild(document.createElement('td'));
tab.appendChild(b1).click();tab.appendChild(b2);