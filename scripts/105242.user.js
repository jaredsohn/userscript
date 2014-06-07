// ==UserScript==
// @name           tichhop
// @namespace      tichhop
// @description    tichhop
// @include        http://tichhop.baokim.vn/list.php
// ==/UserScript==

mybody      = document.getElementsByTagName("body")[0];
mybody.style.background="#BACFED";
mytable     = mybody.getElementsByTagName("table")[0];
mytablebody = mytable.getElementsByTagName("tbody")[0];
for(var i = 0; i < 22; i++) {
mytable.getElementsByTagName("th")[i].style.background="#3380CB";
}
for(var j = 1; j < 5000; j++) {
   myrow       = mytablebody.getElementsByTagName("tr")[j];
   mycel       = myrow.getElementsByTagName("td")[7];
   myceldate       = myrow.getElementsByTagName("td")[1];
   myceldatetext=myceldate.childNodes[0];
   
   
   myceltext=mycel.childNodes[0];
   
   var now = new Date();
   var daysbk=myceldatetext.data.substring(0,2);
   var monthsbk=myceldatetext.data.substring(3,5);
   var yearsbk=myceldatetext.data.substring(7,9);
   if (monthsbk==12)
   {
   var checkdate=monthsbk+"/"+daysbk+"/2012";
   }
   else
   {
   var checkdate=monthsbk+"/"+daysbk+"/2011";
   }
   var check=new Date(checkdate);
    var one_day = 1000 * 60 * 60 * 24;
    var diff = Math.ceil((now.getTime() - check.getTime()) / (one_day)); 
	
   if(myceltext.data=="Duyệt")
   {
     mytablebody.getElementsByTagName("tr")[j].style.background="#C0DAE6";
   }
   else
   {
     if(diff >28)
   {
     mytablebody.getElementsByTagName("tr")[j].style.background="#FF6C51";
   }
   else
   {
     mytablebody.getElementsByTagName("tr")[j].style.background="white";
	} 
   }
   
   
   
}
