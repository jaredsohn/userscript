// ==UserScript==
// @name        Hwmrrepair
// @include     http://www.heroeswm.ru/mod_workbench.php*
// @exclude     http://www.heroeswm.ru/mod_workbench.php
// @version     0.2
// @author      -Партизанэн-,Hamsi
// ==/UserScript==

   function changestatus() {
     
    var id_clana = 100500;
    var id_persa = 100500;
     
       var my_td = document.getElementsByClassName('wb')[2].innerHTML;
       
s = my_td.replace(/\s/g,"");
result = s.substring(23);
      resulta = result.substring(0,5);
      resultb = result.substring(5,10);
       resultc = "%C7%E0%E2%E5%F0%F8%E5%ED%E8%E5+%F0%E0%E1%EE%F2%FB+%E2%3A "+resulta+" "+resultb;
     GM_xmlhttpRequest({
  method: "POST",
  url: "http://www.heroeswm.ru/clan_members.php",
    data: "member="+id_persa+"&id="+id_clana+"&status_pl_id="+id_persa+"&status="+resultc,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }

});

}

   document.getElementsByTagName('input')[3].onclick = changestatus();
