  // ==UserScript==
// @name           Zvyrazneni pro Planetarium footbal Star
// @description    Zvyraznuje hrace z tymu
// @include       http://footstar.org/interagir.asp*
// ==/UserScript==


  var table = document.getElementById('super_table_white');
  var radek = table.getElementsByTagName('tr');

  for(i=0; i < radek.length; i++)
  {
    if (i==1) continue;
    var r=radek[i];
    var bunka = r.getElementsByTagName('td')[1];
    if(bunka.textContent == "ShootinG StaR" || bunka.textContent == "ShootinG StaR Do 19")
      r.style.backgroundColor = '#F9696C';
  }
  


