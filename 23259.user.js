// ==UserScript==
// @name HTMenuPlus
// @author Matjaz Senicar
// @include http://www*.hattrick.org/Common/menu.asp*
// @include http://www*.hattrick.org/Common/header.asp*
// @include http://www*.hattrick.org/Common/blank.html*
// @include http://www*.hattrick.org/Common/newflash.asp*
// @include http://www*.hattrick.org/Common/SkyScraper.asp*
// @include http://www*.hattrick.org/Common/default.asp*
// @include http://www*.hattrick.org/Common/arenaDetails.asp*
// @include http://www*.hattrick.org/Common/leagueDetails.asp*
// @include http://www*.hattrick.org/Common/players.asp*
// @include http://www*.hattrick.org/Common/economy.asp*
// @include http://www*.hattrick.org/Common/Achievements.asp*
// @include http://www*.hattrick.org/Common/start.asp*
// @include http://www*.hattrick.org/Common/fans.asp*
// @version 0.3a
// @description Uporabniku bolj prijazen vmesnik
// ==/UserScript==

//         Edit this         //
uporabnisko_ime = "login-name";
screen_width = '1280';
barva_green = '#EEFFEE';
barva_yellow = '#FFFFEE';
barva_orange = '#FFEECC';
barva_red = '#FFDDDD';
fan_club_name = 'HTMenuPlus boys';
///////////////////////////////

vsi_frejmi = document.getElementsByTagName('frameset');
for (i=0; i<vsi_frejmi.length; i++) {
  if (vsi_frejmi[i].cols == '*,906,*') {
    vsi_frejmi[i].cols = '*,'+screen_width+',*';
  }
}

function ustvari_piskotek(p_name, p_value){
  GM_setValue(p_name, encodeURIComponent(p_value));
}

function ustvari_piskotek2(){
  GM_setValue('HTvsebina', encodeURIComponent(vsebina.value));
}

function preberi_piskotek(name){
  return decodeURIComponent(GM_getValue(name));
}

Date.prototype.getWeek = function() {
  onejan = new Date(this.getFullYear(),0,1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay())/7);
}

function tagiraj_tabele() {
  vse_tabele = document.getElementsByTagName('table');
  for (i=0;i<vse_tabele.length;i++) {
    vse_tabele[i].setAttribute('id','tabela'+i);
  }
}

function tagiraj_tdje() {
  vsi_tdji = document.getElementsByTagName('td');
  for (i=0;i<vsi_tdji.length;i++) {
    vsi_tdji[i].setAttribute('id','td'+i);
  }
}

if (document.location.href.indexOf('fans.asp') > -1) {
  document.getElementsByTagName('b')[0].innerHTML = document.getElementsByTagName('b')[0].innerHTML+'&nbsp;&nbsp;'+fan_club_name+'&nbsp;&nbsp;&nbsp;';
}

if (document.location.href.indexOf('Achievements.asp') > -1) {
  vsi_tdji = document.getElementsByTagName('td');
  stevec = 0;
  for (i=0;i<vsi_tdji.length;i++) {
    if (vsi_tdji[i].colSpan == 5) {
      stevec++;
      vsi_tdji[i].setAttribute('id','td'+stevec);
    }
  }
  
  vsi_pji = document.getElementsByTagName('p');
  for (i=0;i<vsi_pji.length;i++) {
    vsi_pji[i].setAttribute('id','p'+i);
  }
    
  dosezenih_tock = document.getElementById('td4').innerHTML.substr(document.getElementById('td4').innerHTML.indexOf(' ')+1,1000);
  dosezenih_tock = parseInt(dosezenih_tock.substr(0, dosezenih_tock.indexOf(' ')+1))/10;
  moznih_tock = 1260/10;
  razlika_tock = moznih_tock - dosezenih_tock;

  document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.substr(0,document.getElementsByTagName('body')[0].innerHTML.indexOf('id="p0"')-3)+
  '<img src="http://chart.apis.google.com/chart'+
  '?cht=p3'+
  '&chd=t:'+razlika_tock+','+dosezenih_tock+''+
  '&chs=250x100'+
  '&chco=FF9999,99FF99'+
  '&chl='+razlika_tock*10+'|'+dosezenih_tock*10+''+
  '"></img>'+
  document.getElementsByTagName('body')[0].innerHTML.substr(document.getElementsByTagName('body')[0].innerHTML.indexOf('id="p0"')-3,1000);
}

if (document.location.href.indexOf('economy.asp') > -1) {
  tagiraj_tabele();
  
  vse_skripte = document.getElementsByTagName('script');
    for (i=0;i<vse_skripte.length;i++) {
      vse_skripte[i].setAttribute('id','skripta'+i);
  }
  
  danes = new Date();
  teden_v_letu = danes.getWeek();
  
  //kreiramo piskotek za danasnji teden
  ustvari_piskotek(parseFloat(teden_v_letu),document.getElementById('tabela3').innerHTML);
  
  //pregledamo, ce obstaja piskotek za en teden nazaj in ce obstaja, izpisemo vsebino pod tabelo prejsnjega tedna
  if (preberi_piskotek(parseFloat(parseInt(teden_v_letu)-1)) != '') {
    document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.substr(0,document.getElementsByTagName('body')[0].innerHTML.indexOf('skripta1')-12)+
    '<br><br>'+
    '<h2 style="margin-left: 10px;">Week before last week</h2>'+
    '<table width="355" cellspacing="0" cellpadding="2" border="0" style="padding-top: 5px; margin-left: 10px;">'+preberi_piskotek(parseFloat(parseInt(teden_v_letu)-1))+'</table>'+
    document.getElementsByTagName('body')[0].innerHTML.substr(document.getElementsByTagName('body')[0].innerHTML.indexOf('skripta1')-12,1000000);
  }
}

  
if (document.location.href.indexOf('players.asp') > -1) {

  koliko_igralcev = document.getElementsByTagName('h1')[0].innerHTML.substr(document.getElementsByTagName('h1')[0].innerHTML.indexOf(' ')+1);
  koliko_igralcev = parseInt(koliko_igralcev.substr(0,koliko_igralcev.indexOf(' ')))+1;

  tagiraj_tabele();
  
  stevec = 0;
  vse_povezave = document.getElementsByTagName('a');
    for (i=0;i<vse_povezave.length;i++) {
      if (vse_povezave[i].href.indexOf('playerID') > -1) {
        stevec++;
        vse_povezave[i].setAttribute('id','povezava'+stevec);
      }
  }
  
  for (i=1; i<koliko_igralcev; i++){
    sestevek = 0;
    igralec = document.getElementById('povezava'+i).innerHTML;
    for (j=0;j<igralec.length;j++) {
      posamezna_crka = igralec.substr(j,1);
      sestevek = sestevek + posamezna_crka.charCodeAt(0);
    }
    
    dlake_okrog_ust = 'MO04HC00';
    
    if (sestevek%4 == 0) {
      sirina_glave = 'FA01';
      nos = 'NO05';
    } else {
      sirina_glave = 'FA02';
      nos = 'NO06';
    }
    
    if (sestevek%3 == 0) {
      polt = 'HU02';
    } else {
      polt = 'HU01';
      nos = 'NO04';
    }
    
    nos = 'NO08';
    
    if (sestevek%2 == 0) {
      lasje = 'HA01';
      oci = 'EY08';
    } else if (sestevek%3 == 0) {
      lasje = 'HA02';
      oci = 'EY07';
      nos = 'NO03';
    } else if (sestevek%4 == 0) {
      lasje = 'HA03';
      oci = 'EY06';
    } else if (sestevek%5 == 0) {
      lasje = 'HA04';
      oci = 'EY05';
    } else if (sestevek%6 == 0) {
      lasje = 'HA05';
      oci = 'EY04';
    } else if (sestevek%7 == 0) {
      lasje = 'HA06';
      oci = 'EY03';
    } else if (sestevek%8 == 0) {
      lasje = 'HA07';
      oci = 'EY02';
    } else {
      lasje = 'HA08';
      oci = 'EY01';
      nos = 'NO02';
    }
    
    if (igralec.length%2 == 0) {
      barva_las = 'HC01'; //rjav
      if (sestevek%4 == 0) {
        dlake_okrog_ust = 'MO01HC01';
      } else if (sestevek%3 == 0) {
        dlake_okrog_ust = 'MO03HC01';
      } else if (sestevek%7 == 0) {
        dlake_okrog_ust = 'MO03HC01';
      }
    } else if (igralec.length%3 == 0) {
      barva_las = 'HC02'; //blond
      if (sestevek%3 == 0) {
        dlake_okrog_ust = 'MO01HC02';
      } else if (sestevek%5 == 0) {
        dlake_okrog_ust = 'MO02HC02';
      } else if (sestevek%7 == 0) {
        dlake_okrog_ust = 'MO03HC02';
      }
    } else {
      barva_las = 'HC03'; //oranzn
      if (sestevek%3 == 0) {
        dlake_okrog_ust = 'MO01HC03';
      } else if (sestevek%5 == 0) {
        dlake_okrog_ust = 'MO02HC03';
      } else if (sestevek%7 == 0) {
        dlake_okrog_ust = 'MO03HC03';
      }
      nos = 'NO01';
    }
    
    if (igralec.length%3 == 0 && sestevek%3 == 0) {
      brada = 'FH02';
      nos = 'NO07';
    } else {
      brada = 'FH01';
    }
      
    document.getElementById('tabela'+i).innerHTML = document.getElementById('tabela'+i).innerHTML.substr(0,document.getElementById('tabela'+i).innerHTML.indexOf('<tr>'))+'<td rowspan="4" valign="top" width="47">'+
      '<img src="Images/Faces/bg.gif" style="z-index: 0; position: absolute;">'+    
      '<img src="Images/Faces/RA01/faces/'+sirina_glave+polt+lasje+barva_las+brada+'.gif" style="z-index: 1; position: absolute;">'+
      '<img src="Images/Faces/RA01/eyes/'+oci+'.gif" style="z-index: 2; position: absolute;">'+
      '<img src="Images/Faces/RA01/noses/'+nos+'.gif" style="z-index: 3; position: absolute;">'+    
      '<img src="Images/Faces/RA01/mouths/'+dlake_okrog_ust+'.gif" style="z-index: 4; position: absolute;">'+
      '</td>'+document.getElementById('tabela'+i).innerHTML.substr(document.getElementById('tabela'+i).innerHTML.indexOf('<tr>')+4,2000)+'<br>';
      ;    
  }
}

if (document.location.href.indexOf('leagueDetails.asp') > -1) {
  vsi_thji = document.getElementsByTagName('th');
  for (i=0;i<vsi_thji.length;i++) {
    vsi_thji[i].setAttribute('id','th'+i);
  }
  
  vsi_trji = document.getElementsByTagName('tr');
      for (i=0;i<vsi_trji.length;i++) {
        vsi_trji[i].setAttribute('id','tr'+i);
  }

  tagiraj_tdje();
  
  stevilka_skupine = document.getElementsByTagName('h1')[0].innerHTML.substr(document.getElementsByTagName('h1')[0].innerHTML.indexOf('(')+1,document.getElementsByTagName('h1')[0].innerHTML.indexOf(')')-document.getElementsByTagName('h1')[0].innerHTML.indexOf('(')-1);
  document.getElementsByTagName('h1')[0].innerHTML = document.getElementsByTagName('h1')[0].innerHTML+' <a target="alltid" href="http://alltid.org/league/'+stevilka_skupine+'/">Alltid</a>';

  najvisji_nivo = '1';
  trenutni_nivo = document.getElementById('td6').innerHTML.substr(0,document.getElementById('td6').innerHTML.indexOf('&'));
  najnizji_nivo = document.getElementById('td6').innerHTML.substr(document.getElementById('td6').innerHTML.lastIndexOf(' '),2);

  razlika1 = parseInt(document.getElementById('td10').innerHTML)-parseInt(document.getElementById('td12').innerHTML);

  if ((parseInt(trenutni_nivo) > parseInt(najvisji_nivo)) && (parseInt(trenutni_nivo) < parseInt(najnizji_nivo)) ) {  
    razlika2 = parseInt(document.getElementById('td18').innerHTML)-parseInt(document.getElementById('td20').innerHTML);
    razlika3 = parseInt(document.getElementById('td25').innerHTML)-parseInt(document.getElementById('td27').innerHTML);
    razlika4 = parseInt(document.getElementById('td32').innerHTML)-parseInt(document.getElementById('td34').innerHTML);
    razlika5 = parseInt(document.getElementById('td40').innerHTML)-parseInt(document.getElementById('td42').innerHTML);
    razlika6 = parseInt(document.getElementById('td47').innerHTML)-parseInt(document.getElementById('td49').innerHTML);
    razlika7 = parseInt(document.getElementById('td55').innerHTML)-parseInt(document.getElementById('td57').innerHTML);
    razlika8 = parseInt(document.getElementById('td62').innerHTML)-parseInt(document.getElementById('td64').innerHTML);    
  } else if (parseInt(trenutni_nivo) == parseInt(najvisji_nivo)) {
    razlika2 = parseInt(document.getElementById('td17').innerHTML)-parseInt(document.getElementById('td19').innerHTML);
    razlika3 = parseInt(document.getElementById('td24').innerHTML)-parseInt(document.getElementById('td26').innerHTML);
    razlika4 = parseInt(document.getElementById('td31').innerHTML)-parseInt(document.getElementById('td33').innerHTML);
    razlika5 = parseInt(document.getElementById('td39').innerHTML)-parseInt(document.getElementById('td41').innerHTML);
    razlika6 = parseInt(document.getElementById('td46').innerHTML)-parseInt(document.getElementById('td48').innerHTML);
    razlika7 = parseInt(document.getElementById('td54').innerHTML)-parseInt(document.getElementById('td56').innerHTML);
    razlika8 = parseInt(document.getElementById('td61').innerHTML)-parseInt(document.getElementById('td63').innerHTML);
  } else if (parseInt(trenutni_nivo) == parseInt(najnizji_nivo)) {
    razlika2 = parseInt(document.getElementById('td18').innerHTML)-parseInt(document.getElementById('td20').innerHTML);
    razlika3 = parseInt(document.getElementById('td25').innerHTML)-parseInt(document.getElementById('td27').innerHTML);
    razlika4 = parseInt(document.getElementById('td32').innerHTML)-parseInt(document.getElementById('td34').innerHTML);
    razlika5 = parseInt(document.getElementById('td39').innerHTML)-parseInt(document.getElementById('td41').innerHTML);
    razlika6 = parseInt(document.getElementById('td46').innerHTML)-parseInt(document.getElementById('td48').innerHTML);
    razlika7 = parseInt(document.getElementById('td53').innerHTML)-parseInt(document.getElementById('td55').innerHTML);
    razlika8 = parseInt(document.getElementById('td60').innerHTML)-parseInt(document.getElementById('td62').innerHTML);
  }
    
  if (razlika1 > 0) {
    razlika1 = '+'+razlika1;
  }
    
  if (razlika2 > 0) {
    razlika2 = '+'+razlika2;
  }
    
  if (razlika3 > 0) {
    razlika3 = '+'+razlika3;
  }
    
  if (razlika4 > 0) {
    razlika4 = '+'+razlika4;
  }
    
  if (razlika5 > 0) {
    razlika5 = '+'+razlika5;
  }
    
  if (razlika6 > 0) {
    razlika6 = '+'+razlika6;
  }
    
  if (razlika7 > 0) {
    razlika7 = '+'+razlika7;
  }
    
  if (razlika8 > 0) {
    razlika8 = '+'+razlika8;
  }
    
  //glavi tabele je dodano polje za razliko golov
  
  document.getElementById('tr4').innerHTML = document.getElementById('tr4').innerHTML.substr(0,document.getElementById('tr4').innerHTML.indexOf('<th id="th4"')-1)+'<th id="th3-1" valign="top" align="center"><b>Diff</b></th>'+document.getElementById('tr4').innerHTML.substr(document.getElementById('tr4').innerHTML.indexOf('<th id="th4"')-1,100);
  if ((parseInt(trenutni_nivo) > parseInt(najvisji_nivo)) && (parseInt(trenutni_nivo) < parseInt(najnizji_nivo)) ) {  
    document.getElementById('tr5').innerHTML = document.getElementById('tr5').innerHTML.substr(0,document.getElementById('tr5').innerHTML.indexOf('<td id="td13"')-1)+'<td id="td3-11" valign="top" align="center">'+razlika1+'</th>'+document.getElementById('tr5').innerHTML.substr(document.getElementById('tr5').innerHTML.indexOf('<td id="td13"')-1,100);
    document.getElementById('tr7').innerHTML = document.getElementById('tr7').innerHTML.substr(0,document.getElementById('tr7').innerHTML.indexOf('<td id="td21"')-1)+'<td id="td3-12" valign="top" align="center">'+razlika2+'</th>'+document.getElementById('tr7').innerHTML.substr(document.getElementById('tr7').innerHTML.indexOf('<td id="td21"')-1,100);
    document.getElementById('tr8').innerHTML = document.getElementById('tr8').innerHTML.substr(0,document.getElementById('tr8').innerHTML.indexOf('<td id="td28"')-1)+'<td id="td3-13" valign="top" align="center">'+razlika3+'</th>'+document.getElementById('tr8').innerHTML.substr(document.getElementById('tr8').innerHTML.indexOf('<td id="td28"')-1,100);
    document.getElementById('tr9').innerHTML = document.getElementById('tr9').innerHTML.substr(0,document.getElementById('tr9').innerHTML.indexOf('<td id="td35"')-1)+'<td id="td3-14" valign="top" align="center">'+razlika4+'</th>'+document.getElementById('tr9').innerHTML.substr(document.getElementById('tr9').innerHTML.indexOf('<td id="td35"')-1,100);
    document.getElementById('tr11').innerHTML = document.getElementById('tr11').innerHTML.substr(0,document.getElementById('tr11').innerHTML.indexOf('<td id="td43"')-1)+'<td id="td3-15" valign="top" align="center">'+razlika5+'</th>'+document.getElementById('tr11').innerHTML.substr(document.getElementById('tr11').innerHTML.indexOf('<td id="td43"')-1,100);
    document.getElementById('tr12').innerHTML = document.getElementById('tr12').innerHTML.substr(0,document.getElementById('tr12').innerHTML.indexOf('<td id="td50"')-1)+'<td id="td3-16" valign="top" align="center">'+razlika6+'</th>'+document.getElementById('tr12').innerHTML.substr(document.getElementById('tr12').innerHTML.indexOf('<td id="td50"')-1,100);
    document.getElementById('tr14').innerHTML = document.getElementById('tr14').innerHTML.substr(0,document.getElementById('tr14').innerHTML.indexOf('<td id="td58"')-1)+'<td id="td3-17" valign="top" align="center">'+razlika7+'</th>'+document.getElementById('tr14').innerHTML.substr(document.getElementById('tr14').innerHTML.indexOf('<td id="td58"')-1,100);
    document.getElementById('tr15').innerHTML = document.getElementById('tr15').innerHTML.substr(0,document.getElementById('tr15').innerHTML.indexOf('<td id="td65"')-1)+'<td id="td3-18" valign="top" align="center">'+razlika8+'</th>'+document.getElementById('tr15').innerHTML.substr(document.getElementById('tr15').innerHTML.indexOf('<td id="td65"')-1,100);
  } else if (parseInt(trenutni_nivo) == parseInt(najvisji_nivo)) {
    document.getElementById('tr5').innerHTML = document.getElementById('tr5').innerHTML.substr(0,document.getElementById('tr5').innerHTML.indexOf('<td id="td13"')-1)+'<td id="td3-11" valign="top" align="center">'+razlika1+'</th>'+document.getElementById('tr5').innerHTML.substr(document.getElementById('tr5').innerHTML.indexOf('<td id="td13"')-1,100);
    document.getElementById('tr6').innerHTML = document.getElementById('tr6').innerHTML.substr(0,document.getElementById('tr6').innerHTML.indexOf('<td id="td20"')-1)+'<td id="td3-12" valign="top" align="center">'+razlika2+'</th>'+document.getElementById('tr6').innerHTML.substr(document.getElementById('tr6').innerHTML.indexOf('<td id="td20"')-1,100);
    document.getElementById('tr7').innerHTML = document.getElementById('tr7').innerHTML.substr(0,document.getElementById('tr7').innerHTML.indexOf('<td id="td27"')-1)+'<td id="td3-13" valign="top" align="center">'+razlika3+'</th>'+document.getElementById('tr7').innerHTML.substr(document.getElementById('tr7').innerHTML.indexOf('<td id="td27"')-1,100);
    document.getElementById('tr8').innerHTML = document.getElementById('tr8').innerHTML.substr(0,document.getElementById('tr8').innerHTML.indexOf('<td id="td34"')-1)+'<td id="td3-14" valign="top" align="center">'+razlika4+'</th>'+document.getElementById('tr8').innerHTML.substr(document.getElementById('tr8').innerHTML.indexOf('<td id="td34"')-1,100);
    document.getElementById('tr10').innerHTML = document.getElementById('tr10').innerHTML.substr(0,document.getElementById('tr10').innerHTML.indexOf('<td id="td42"')-1)+'<td id="td3-15" valign="top" align="center">'+razlika5+'</th>'+document.getElementById('tr10').innerHTML.substr(document.getElementById('tr10').innerHTML.indexOf('<td id="td42"')-1,100);
    document.getElementById('tr11').innerHTML = document.getElementById('tr11').innerHTML.substr(0,document.getElementById('tr11').innerHTML.indexOf('<td id="td49"')-1)+'<td id="td3-16" valign="top" align="center">'+razlika6+'</th>'+document.getElementById('tr11').innerHTML.substr(document.getElementById('tr11').innerHTML.indexOf('<td id="td49"')-1,100);
    document.getElementById('tr13').innerHTML = document.getElementById('tr13').innerHTML.substr(0,document.getElementById('tr13').innerHTML.indexOf('<td id="td57"')-1)+'<td id="td3-17" valign="top" align="center">'+razlika7+'</th>'+document.getElementById('tr13').innerHTML.substr(document.getElementById('tr13').innerHTML.indexOf('<td id="td57"')-1,100);
    document.getElementById('tr14').innerHTML = document.getElementById('tr14').innerHTML.substr(0,document.getElementById('tr14').innerHTML.indexOf('<td id="td64"')-1)+'<td id="td3-18" valign="top" align="center">'+razlika8+'</th>'+document.getElementById('tr14').innerHTML.substr(document.getElementById('tr14').innerHTML.indexOf('<td id="td64"')-1,100);    
  } else if (parseInt(trenutni_nivo) == parseInt(najnizji_nivo)) {
    document.getElementById('tr5').innerHTML = document.getElementById('tr5').innerHTML.substr(0,document.getElementById('tr5').innerHTML.indexOf('<td id="td13"')-1)+'<td id="td3-11" valign="top" align="center">'+razlika1+'</th>'+document.getElementById('tr5').innerHTML.substr(document.getElementById('tr5').innerHTML.indexOf('<td id="td13"')-1,100);
    document.getElementById('tr7').innerHTML = document.getElementById('tr7').innerHTML.substr(0,document.getElementById('tr7').innerHTML.indexOf('<td id="td21"')-1)+'<td id="td3-12" valign="top" align="center">'+razlika2+'</th>'+document.getElementById('tr7').innerHTML.substr(document.getElementById('tr7').innerHTML.indexOf('<td id="td21"')-1,100);
    document.getElementById('tr8').innerHTML = document.getElementById('tr8').innerHTML.substr(0,document.getElementById('tr8').innerHTML.indexOf('<td id="td28"')-1)+'<td id="td3-13" valign="top" align="center">'+razlika3+'</th>'+document.getElementById('tr8').innerHTML.substr(document.getElementById('tr8').innerHTML.indexOf('<td id="td28"')-1,100);
    document.getElementById('tr9').innerHTML = document.getElementById('tr9').innerHTML.substr(0,document.getElementById('tr9').innerHTML.indexOf('<td id="td35"')-1)+'<td id="td3-14" valign="top" align="center">'+razlika4+'</th>'+document.getElementById('tr9').innerHTML.substr(document.getElementById('tr9').innerHTML.indexOf('<td id="td35"')-1,100);
    document.getElementById('tr10').innerHTML = document.getElementById('tr10').innerHTML.substr(0,document.getElementById('tr10').innerHTML.indexOf('<td id="td42"')-1)+'<td id="td3-15" valign="top" align="center">'+razlika5+'</th>'+document.getElementById('tr10').innerHTML.substr(document.getElementById('tr10').innerHTML.indexOf('<td id="td42"')-1,100);
    document.getElementById('tr11').innerHTML = document.getElementById('tr11').innerHTML.substr(0,document.getElementById('tr11').innerHTML.indexOf('<td id="td49"')-1)+'<td id="td3-16" valign="top" align="center">'+razlika6+'</th>'+document.getElementById('tr11').innerHTML.substr(document.getElementById('tr11').innerHTML.indexOf('<td id="td49"')-1,100);
    document.getElementById('tr12').innerHTML = document.getElementById('tr12').innerHTML.substr(0,document.getElementById('tr12').innerHTML.indexOf('<td id="td56"')-1)+'<td id="td3-17" valign="top" align="center">'+razlika7+'</th>'+document.getElementById('tr12').innerHTML.substr(document.getElementById('tr12').innerHTML.indexOf('<td id="td56"')-1,100);
    document.getElementById('tr13').innerHTML = document.getElementById('tr13').innerHTML.substr(0,document.getElementById('tr13').innerHTML.indexOf('<td id="td63"')-1)+'<td id="td3-18" valign="top" align="center">'+razlika8+'</th>'+document.getElementById('tr13').innerHTML.substr(document.getElementById('tr13').innerHTML.indexOf('<td id="td63"')-1,100);
  }

  if ((parseInt(trenutni_nivo) > parseInt(najvisji_nivo)) && (parseInt(trenutni_nivo) < parseInt(najnizji_nivo)) ) {  
    for (i=7;i<=13;i++) {
        document.getElementById('td'+i).style.background = barva_green;
    }
  
    for (i=15;i<=35;i++) {
      document.getElementById('td'+i).style.background = barva_yellow;
    }    
  
    for (i=37;i<=50;i++) {
      document.getElementById('td'+i).style.background = barva_orange;
    }
  
    for (i=52;i<=65;i++) {
      document.getElementById('td'+i).style.background = barva_red;
    } 
  } else if (parseInt(trenutni_nivo) == parseInt(najvisji_nivo)) {
    for (i=7;i<=34;i++) {
      document.getElementById('td'+i).style.background = barva_green;
    }
  
    for (i=36;i<=49;i++) {
      document.getElementById('td'+i).style.background = barva_orange;
    }
    
    for (i=51;i<=64;i++) {
      document.getElementById('td'+i).style.background = barva_red;
    }
  } else if (parseInt(trenutni_nivo) == parseInt(najnizji_nivo)) {
    for (i=7;i<=13;i++) {
        document.getElementById('td'+i).style.background = barva_green;
    }
  
    for (i=15;i<=63;i++) {
      document.getElementById('td'+i).style.background = barva_red;
    }
  }
  
  document.getElementById('td3-11').setAttribute('bgcolor', barva_green);
  if ((parseInt(trenutni_nivo) > parseInt(najvisji_nivo)) && (parseInt(trenutni_nivo) < parseInt(najnizji_nivo)) ) {  
    document.getElementById('td14').setAttribute('colspan', '8');
    document.getElementById('td3-12').setAttribute('bgcolor', barva_yellow);
    document.getElementById('td3-13').setAttribute('bgcolor', barva_yellow);
    document.getElementById('td3-14').setAttribute('bgcolor', barva_yellow);
    document.getElementById('td36').setAttribute('colspan', '8');
    document.getElementById('td3-15').setAttribute('bgcolor', barva_orange);
    document.getElementById('td3-16').setAttribute('bgcolor', barva_orange);    
    document.getElementById('td51').setAttribute('colspan', '8');
    document.getElementById('td51').setAttribute('bgcolor', '#FF0000');
    document.getElementById('td3-17').setAttribute('bgcolor', barva_red);
    document.getElementById('td3-18').setAttribute('bgcolor', barva_red);
  } else if (parseInt(trenutni_nivo) == parseInt(najvisji_nivo)) {
    document.getElementById('td3-12').setAttribute('bgcolor', barva_green);
    document.getElementById('td3-13').setAttribute('bgcolor', barva_green);
    document.getElementById('td3-14').setAttribute('bgcolor', barva_green);
    document.getElementById('td35').setAttribute('colspan', '8');
    document.getElementById('td3-15').setAttribute('bgcolor', barva_orange);
    document.getElementById('td3-16').setAttribute('bgcolor', barva_orange);
    document.getElementById('td50').setAttribute('colspan', '8');
    document.getElementById('td50').setAttribute('bgcolor', '#FF0000');
    document.getElementById('td3-17').setAttribute('bgcolor', barva_red);
    document.getElementById('td3-18').setAttribute('bgcolor', barva_red);
  } else if (parseInt(trenutni_nivo) == parseInt(najnizji_nivo)) {
    document.getElementById('td14').setAttribute('colspan', '8');
    document.getElementById('td3-12').setAttribute('bgcolor', barva_red);
    document.getElementById('td3-13').setAttribute('bgcolor', barva_red);
    document.getElementById('td3-14').setAttribute('bgcolor', barva_red);
    document.getElementById('td3-15').setAttribute('bgcolor', barva_red);
    document.getElementById('td3-16').setAttribute('bgcolor', barva_red);
    document.getElementById('td3-17').setAttribute('bgcolor', barva_red);
    document.getElementById('td3-18').setAttribute('bgcolor', barva_red);
  }
  
  document.body.setAttribute('onload', showHide('alltid_link'));
}

if (document.location.href.indexOf('arenaDetails.asp') > -1) {
  document.getElementsByTagName('tbody')[0].innerHTML = document.getElementsByTagName('tbody')[0].innerHTML+
  '<tr><td colspan="4">'+
  
  '<h2>Construction costs simulation</h2><br>'+
  '<table border="1" cellspacing="0" cellpadding="0" style="border: none;"  bgcolor="#CCDDAA">'+
          '<tr>'+
     	      '<td>&nbsp;</td>'+
            '<td>Price per unit</td>'+
  		  '<td>Amount</td>'+
  		  '<td>Cost</td>'+
  		  '<td>Weekly mainteinance</td>'+
  	    '</tr>'+
  	    '<tr>'+
            '<td>Terraces</td>'+
  		  '<td><input type="text" id="st" name="st" value="45" disabled="TRUE" style="border: none;"></td>'+
  		  '<td><input type="text" id="st1" name="st1" value="" style="border: none;" onclick="this.value = \'\'" onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;" onKeyUp="document.getElementById(\'r1\').value = (document.getElementById(\'st\').value * this.value); document.getElementById(\'rezultat\').value = ((document.getElementById(\'zs\').value * 1) + (document.getElementById(\'r1\').value * 1) + (document.getElementById(\'r2\').value * 1) + (document.getElementById(\'r3\').value * 1) + (document.getElementById(\'r4\').value * 1)); document.getElementById(\'rs1\').value = (0.5 * this.value); document.getElementById(\'rezultat2\').value = ((document.getElementById(\'rs1\').value * 1) + (document.getElementById(\'rs2\').value * 1) + (document.getElementById(\'rs3\').value * 1) + (document.getElementById(\'rs4\').value * 1))"></td>'+
  		  '<td><input type="text" id="r1" name="r1" value="" onclick="document.getElementById(\'st1\').value = \'\'" disabled="TRUE" style="border: none;"></td>'+
  		  '<td><input type="text" id="rs1"name="rs1" value="" disabled="true" style="border: none;"></td>'+
  	    '</tr>'+
  	    '<tr>'+
            '<td>Basic seating</td>'+
  		  '<td><input type="text" id="se" name="se" value="75" disabled="TRUE" style="border: none;"></td>'+
  		  '<td><input type="text" id="st2" name="st2" value="" style="border: none;" onclick="document.getElementById(\'st2\').value = \'\'" onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;" onKeyUp="document.getElementById(\'r2\').value = (document.getElementById(\'se\').value * document.getElementById(\'st2\').value); document.getElementById(\'rezultat\').value = ((document.getElementById(\'zs\').value * 1) + (document.getElementById(\'r1\').value * 1) + (document.getElementById(\'r2\').value * 1) + (document.getElementById(\'r3\').value * 1) + (document.getElementById(\'r4\').value * 1)); document.getElementById(\'rs2\').value = (0.7 * document.getElementById(\'st2\').value);  document.getElementById(\'rezultat2\').value = ((document.getElementById(\'rs1\').value * 1) + (document.getElementById(\'rs2\').value * 1) + (document.getElementById(\'rs3\').value * 1) + (document.getElementById(\'rs4\').value * 1))"></td>'+
  		  '<td><input type="text" id="r2" name="r2" value="" disabled="TRUE" style="border: none;"></td>'+
  		  '<td><input type="text" id="rs2" name="rs2" value="" disabled="true" style="border: none;"></td>'+
  	    '</tr>'+
  	    '<tr>'+
            '<td>Seats under roof</td>'+
  		  '<td><input type="text" id="pse" name="pse" value="90" disabled="TRUE" style="border: none;"></td>'+
  		  '<td><input type="text" id="st3" name="st3" value="" style="border: none;" onclick="document.getElementById(\'st3\').value = \'\'" onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;" onKeyUp="document.getElementById(\'r3\').value = (document.getElementById(\'pse\').value * document.getElementById(\'st3\').value); document.getElementById(\'rezultat\').value = ((document.getElementById(\'zs\').value * 1) + (document.getElementById(\'r1\').value * 1) + (document.getElementById(\'r2\').value * 1) + (document.getElementById(\'r3\').value * 1) + (document.getElementById(\'r4\').value * 1)); document.getElementById(\'rs3\').value = (1 * document.getElementById(\'st3\').value); document.getElementById(\'rezultat2\').value = ((document.getElementById(\'rs1\').value * 1) + (document.getElementById(\'rs2\').value * 1) + (document.getElementById(\'rs3\').value * 1) + (document.getElementById(\'rs4\').value * 1))"></td>'+
  		  '<td><input type="text" id="r3" name="r3" value="" disabled="TRUE" style="border: none;"></td>'+
  		  '<td><input type="text" id="rs3" name="rs3" value="" disabled="true" style="border: none;"></td>'+
  	    '</tr>'+
  	    '<tr>'+
            '<td>Seats in VIP boxes</td>'+
  		  '<td><input type="text" id="vip" name="vip" value="300" disabled="TRUE" style="border: none;"></td>'+
  		  '<td><input type="text" id="st4" name="st4" value="" style="border: none;" onclick="document.getElementById(\'st4\').value = \'\'" onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;" onKeyUp="document.getElementById(\'r4\').value = (document.getElementById(\'vip\').value * document.getElementById(\'st4\').value); document.getElementById(\'rezultat\').value = ((document.getElementById(\'zs\').value * 1) + (document.getElementById(\'r1\').value * 1) + (document.getElementById(\'r2\').value * 1) + (document.getElementById(\'r3\').value * 1) + (document.getElementById(\'r4\').value * 1)); document.getElementById(\'rs4\').value = (2.5 * document.getElementById(\'st4\').value);  document.getElementById(\'rezultat2\').value = ((document.getElementById(\'rs1\').value * 1) + (document.getElementById(\'rs2\').value * 1) + (document.getElementById(\'rs3\').value * 1) + (document.getElementById(\'rs4\').value * 1))"></td>'+
  		  '<td><input type="text" id="r4" name="r4" value="" disabled="TRUE" style="border: none;"></td>'+
  		  '<td><input type="text" id="rs4" name="rs4" value="" disabled="true" style="border: none;"></td>'+
  	    '</tr>'+
  	    '<tr>'+
            '<td>Initialization cost</td>'+
            '<td><input type="text" id="zs" name="zs" value="10000" disabled="TRUE" style="border: none;"></td>'+
            '<td colspan="2" align="right">Sum: <input type="text" id="rezultat" name="rezultat" value="" disabled="TRUE" style="border: none;"></td>'+
  		  '<td><input type="text" id="rezultat2" name="rezultat2" value="" disabled="true" style="border: none;"></td>'+
  	    '</tr>'+
	  '</table>'+
  
  
  
  '</td></tr>';
}

if (document.location.href.indexOf('default.asp') > -1) {
  document.getElementsByName('skyscraper')[0].src = 'transfers.asp';
}

if (document.location.href.indexOf('blank.html') > -1) {
  document.body.setAttribute('bgcolor','#D7D7D7');
}

if (document.location.href.indexOf('newflash.asp') > -1) {
  document.body.setAttribute('bgcolor','#D7D7D7');
}

//Funkcija namesto uporabnika napolni uporabnisko ime in fokusira kurzor v polje za geslo
function f_prijava(){
  if (document.getElementsByTagName('html')[0].innerHTML.indexOf('button_enter.gif') > -1) {
    document.getElementsByName('loginname')[0].value = uporabnisko_ime;
    document.getElementsByName('password')[0].focus();
    document.body.setAttribute('onload', null);
    document.body.setAttribute('onload', showHide(''));
  }
};

//funkcija se sprehodi skozi povezave in skrije vse, ki so povezave na reklame
function f_odstrani_reklame() {
  reklama = document.getElementsByTagName('a');
  for (i=0; i<reklama.length; i++) {
    povezava = reklama[i]+'';
    if (povezava.indexOf(".hattrick.org") == -1) {
      reklama[i].style.display = 'none';
    }
  }
  
  if (document.location.href.indexOf('header.asp') > -1) {
    if (document.getElementsByTagName('html')[0].innerHTML.indexOf('bannerContainer') > -1) {
      reklama = document.getElementById('banner');
      reklama.style.display = 'none';
    }
  }
  
  if (document.location.href.indexOf('newflash.asp') > -1) {
      if (document.getElementsByTagName('html')[0].innerHTML.indexOf('bannerContainer') > -1) {
        reklama = document.getElementById('bannerContainer');
        reklama.style.display = 'none';
      }
  }
  
}

if (document.location.href.indexOf('start.asp') > -1) {
  if (document.getElementsByTagName('html')[0].innerHTML.indexOf('404') > -1) {
    document.getElementsByTagName('html')[0].innerHTML='<head>'+
    '<title>Notebook</title>'+
    '<link type="text/css" href="Css/themes/standard/main.css" rel="stylesheet">'+
    '</head>'+
    '<body>'+
      '<br>'+
      '<h1 style="margin-left: 10px;">Notebook</h1>'+
      '<table width="600" cellspacing="0" cellpadding="0" border="0">'+
        '<tr>'+
          '<td>'+
            '<br>'+
            '<textarea id="vsebina" cols="50" rows="10" style="margin-left: 10px;">This is your private notebook inside Hattrick. It is a HTMenuPlus feature that gives you access to a page where you can make your own private notes about your team, things to remember.. well anything you want. You can access it at any time by clicking the notebook link in Hattrick plus menu.</textarea>'+
            '<br>'+
            '<input id="gumb" type="button" value="Save!" style="margin-left: 10px;">'+
          '</td>'+
          '<td width="80">'+
            '&nbsp;'+
          '</td>'+
          '<td valign="top">'+
            '<h3>WHAT IS THIS?</h3>'+
            'This is your private notebook inside Hattrick. It is a HTMenuPlus feature that gives you access to a page where you can make your own private notes about your team, things to remember.. well anything you want. You can access it at any time by clicking the notebook link in Hattrick plus menu.'+
          '</td>'+
        '</tr>'+
      '</table>'+
    '</body>';
  
    var vsebina = document.getElementById('vsebina');
    document.getElementById('gumb').addEventListener('click', ustvari_piskotek2, false);
    vsebina.value = preberi_piskotek('HTvsebina');
  }
}

//funkcija ki generira nove menijske postavke in jih vrine v obstojeco kodo
function f_menu_povezave() {
  if (document.location.href.indexOf('menu.asp') > -1) {
    menu_povezave = document.createElement("div");
    menu_povezave.innerHTML = '<script>function skrij_prikazi(){'+
                                         'menujske_postavke = document.getElementsByName(\'moja_postavka\');'+
                                         'for (i=0;i<menujske_postavke.length;i++) {'+
                                         'if (menujske_postavke[i].style.display != \'none\')'+
                                         ' {menujske_postavke[i].style.display = \'none\';'+
                                         '} else { '+
                                         'menujske_postavke[i].style.display = \'\';'+
                                         '}}} </script>'+
                                         '<a href="javascript: skrij_prikazi(\'povezave\');">'+
                                         '<font color="#2D8930"><b>Hattrick <font color="#FF0000"><b>plus</b></font> Â»</b></font></a>'+
                                         '<br \"moja_postavka\">'+
                                         '<font name=\"moja_postavka\">&nbsp;&nbsp;-&nbsp;</font>'+
                                         '<font name=\"moja_postavka\"><a href="http://www.alltid.org" target="alltid"><font style="font-size: 10px; font-weight: 400; font-style: normal;">Alltid Hattrick</font></a></font>'+
                                         '<br name=\"moja_postavka\">'+
                                         '<font name=\"moja_postavka\">&nbsp;&nbsp;-&nbsp;</font>'+
                                         '<font name=\"moja_postavka\"><a href="http://www.hatstats.info" target="hatstats"><font style="font-size: 10px; font-weight: 400; font-style: normal;">Hatstats</font></a></font>'+
                                         '<br name=\"moja_postavka\">'+
                                         '<font name=\"moja_postavka\">&nbsp;&nbsp;-&nbsp;</font>'+
                                         '<font name=\"moja_postavka\"><a href=\"notebook.asp\" target=\"main\"><font style=\"font-size: 10px; font-weight: 400; font-style: normal;\">Notebook</font></a></font>';
  
    menu_privacy = document.getElementsByTagName('div');
    if (document.location.href.indexOf('default.asp') == -1) {
      menu_privacy[1].insertBefore(menu_povezave, menu_privacy[1].firstChild);
    }
  }  
}

function f_init() {
  f_odstrani_reklame();
  f_menu_povezave();
  f_prijava();
}

f_init();