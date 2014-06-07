// ==UserScript==
// @name           checksite tich hop Bao Kim
// @namespace      checksite Bao Kim
// @description    checksite
// @include        http://tichhop.baokim.vn/list_kythuat.php
// ==/UserScript==
mybody      = document.getElementsByTagName("body")[0];
mybody.getElementsByTagName("h3")[0].style.align="center";
mybody.style.background="#E8E8E8";
mytable     = mybody.getElementsByTagName("table")[0];
//mychidtable     = mybody.getElementsByTagName("table")[1];
mytablebody = mytable.getElementsByTagName("tbody")[0];
//mytablebody = mychidtable.getElementsByTagName("tbody")[0];
for(var j = 0; j < 22; j++) {
mytable.getElementsByTagName("th")[j].style.background="#9C9C9C";
}
for(var j = 1; j < 1000; j++) {
   myrow       = mytablebody.getElementsByTagName("tr")[j];
   mycel       = myrow.getElementsByTagName("td")[7];
   myceltext=mycel.childNodes[0];
   if(myceltext.data=="Duyệt")
   {
     mytablebody.getElementsByTagName("tr")[j].style.background="#5EFB6E";//#00A800";
   }
   else
   {
     mytablebody.getElementsByTagName("tr")[j].style.background="#E3E4FA";//#AFC7C7";
   }
   
}