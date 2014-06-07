// ==UserScript==
// @name           WoWAH
// @namespace      Armata
// @include        https://*.battle.net/wow/*/vault/character/auction/*/create
// ==/UserScript==

document.load=main();

function main(){
  var inventory = document.getElementById('inventory-0');
  var tr_invent=inventory.getElementsByTagName('tr');
  for (i=0;i<tr_invent.length;i++){
    tr_invent[i].setAttribute("onclick",tr_invent[i].getAttribute("onclick")+"var t=setTimeout('midPrice()',2000);");
  }
  
  var script_ = document.createElement("script");
  script_.type = "text/javascript";
  script_.innerHTML = "function midPrice(){var similar =document.getElementById('similar-auctions').getElementsByTagName('tbody')[0];var arraySimilar =similar.innerHTML.split(RegExp('(quantity)|(gold)|(silver)','g'));var q=0;var po=0;var ps=0;var reg=new RegExp('[^0-9]','g');for (i=1;i<arraySimilar.length;i++){  switch (arraySimilar[i]){      case 'quantity':         while (arraySimilar[i+1].length<1){i++;}q++;        break;      case 'gold':        while (arraySimilar[i+1].length<1){i++;}po+= parseInt(arraySimilar[i+1].substr(0,10).replace(reg,''));        break;      case 'silver':        while (arraySimilar[i+1].length<1){i++;}ps+= parseInt(arraySimilar[i+1].substr(0,10).replace(reg,''));     break;}}var SupPo=parseInt(ps/100);  po+=SupPo;  var prix_moy=parseFloat(po/q);  alert('Le prix moyen est: '+Math.round(prix_moy*100)/100+' Po/u');}"; //q+= parseInt(arraySimilar[i+1].substr(0,10).replace(reg,''));//po+'  '+ps+'  '+totalprice
  top.document.getElementsByTagName("head")[0].appendChild(script_);
}

function midPrice(){
  var similar =document.getElementById('similar-auctions').getElementsByTagName('tbody')[0];
  var arraySimilar =similar.innerHTML.split(RegExp('(quantity)|(gold)|(silver)','g'));
  var q=0;
  var po=0;
  var ps=0;
  var reg=new RegExp('[^0-9]','g');
  for (i=1;i<arraySimilar.length;i++){
    switch (arraySimilar[i]){
    case 'quantity':
      while (arraySimilar[i+1].length<1){i++;}
      q+= parseInt(arraySimilar[i+1].substr(0,10).replace(reg,''));
      break;
    case 'gold':
      while (arraySimilar[i+1].length<1){i++;}
      po+= parseInt(arraySimilar[i+1].substr(0,10).replace(reg,''));
      break;
    case 'silver':
      while (arraySimilar[i+1].length<1){i++;}
      ps+= parseInt(arraySimilar[i+1].substr(0,10).replace(reg,''));
      break;
    }
  }
  var SupPo=parseInt(ps/100);
  po+=SupPo;
  var prix_moy=parseFloat(po/q);
  alert('Le prix moyen est: '+Math.round(prix_moy*100)/100+'Po.');
  var display_form_table=document.getElementById('create-step2').getElementsByTagName('table')[0];
  var tr = document.createElement("tr");
  tr.innerHTML='<td id=\'pmoy\'><label>Prix moyen</label></td><td>'+Math.round(prix_moy*100)/100+'</td>';
  display_form_table.appenchild(tr);
  alert(display_form_table.innerHTML);
}