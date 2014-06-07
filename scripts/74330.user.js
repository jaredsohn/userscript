// ==UserScript==
// @name	Sarimin v.1.2
// @namespace	Sarimin cah ndableg
// @description	15/10/2010 23:56
// @include	*/fb/bugcatching/*
// ==/UserScript==

waktumin = 10;	// delay waktu minimal (detik)
waktumax = 40;	// tambahan random waktumin (detik)

var nyomet = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAYAAADdRIy+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAACXZwQWcAAAAUAAAAEQDeTN6UAAAB6klEQVQ4y5WUMWsUQRTHfxMuiFoET7cLmOZip+A70DRisLhoaXMWGsFiprG0ET9AIPgBMlOKXCVoZSdphcsIWnoWEQIiazzEKlEci92d27m9EH2wMAvv/fb/f+/NqhACSimOCy2E+rvzNIpCCLQahRSFjqKgAq1fuTGV+SbMgramYbcer7K41AHnGqCvow/x3GtnIHkD2pqGvd7Yxu7coXOtx8rB7wj69j1n/6DIPXuiJuIMgfHEUWtambYdTNeQ3V+B06cS2PiwEhMKqAdtNXu7I9jYDoCaq8sVEZxxANycAesPhvQHQ8aHChFhYVnhjCtaVEYELi51cMZgd2zS5Aq2OdhCRBCR0qulPxiysJzOJVGo7QRWqatHt9vFe8/mYCs6AnDGxR7OVSvijMN7j/cebXWE1AfgvY9nYwzee358TNYTVV/sageLr0+SPv1U9K9fBhHefdnn5Pwf7j15iZZiMJW6EEIKrBa5184SuyICIlxce5Coef7sKW9fvYi3JoSQ9rAe59pZAhMR5vP38QG4u/6IC6trybVs8Q+xtzuaTBf4lV3i4e2rM3MbQOdRSB6gvF61gYhIhGmtowNjzNHACAWQPFD2UutOCQVrLUeF+t/fl9Y62vfe45xLhjILeB74fBy44aYE/gUd2ezmDhbkNQAAACV0RVh0Y3JlYXRlLWRhdGUAMjAxMC0wNC0xNVQxODo0NTowNCswMDowMGhm8XMAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDQvMTYvMTDrgoReAAAAJXRFWHRtb2RpZnktZGF0ZQAyMDEwLTA0LTE1VDE4OjQ1OjA0KzAwOjAwN9eHRwAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAAAASUVORK5CYII%3D'
var smn = false;
formx = document.getElementsByTagName('form');
ValidChars = "0123456789";
menit='';
detik='';
pesan = '<font color=red>Sarimin ngambek! ndak mau kerja! :(</font>';
anew = false;
hasil = false;


carip = document.body.innerHTML.search(/var initialminutesleft/);
if(carip!=-1)
{
  menits = document.body.innerHTML.search(/var initialminutesleft = \"/);
  detiks = document.body.innerHTML.search(/var initialsecondsleft = \"/);
  useri = document.body.innerHTML.substring(menits + 26, menits + 30);
  for (i = 0; i < useri.length ; i++) 
  { 
    Char = useri.charAt(i); 
    if (ValidChars.indexOf(Char) == -1) 
    {
      break;
    }
    menit=menit + Char;
  }
  useri = document.body.innerHTML.substring(detiks + 26, detiks + 30);
  for (i = 0; i < useri.length ; i++) 
  { 
    Char = useri.charAt(i); 
    if (ValidChars.indexOf(Char) == -1) 
    {
      break;
    }
    detik=detik + Char;
  }
  userp='';
  useri = document.body.innerHTML.substring(carip + 'parameters: "user='.length, carip + 'parameters: "user='.length +20);
  for (i = 0; i < useri.length ; i++) 
  { 
    Char = useri.charAt(i); 
    if (ValidChars.indexOf(Char) == -1) 
    {
      break;
    }
    userp=userp + Char;
  }
  menit = parseInt(menit);
  detik = parseInt(detik);
  batas = (menit * 60 + detik + Math.round((Math.random() * waktumax)) + waktumin) * 1000;
  batas2 = batas + (120 * 1000);
  pesan = '<font color=blue><a href="scoreboard.php">Sarimin siap2 beraksi!</a></font>';
  anew = true;
  smn = true;
//==========================================================================
//alert("222--->" + batas);
  setTimeout(function() {location.href="javascript:void(belik());";} , batas);
  setTimeout(function() {window.location.href=window.location.href;} ,  batas2) ;
}

document.body.innerHTML = '<div style="border-color:#FF0000; background:#00FF00; border-style:groove; color:#0000FF; padding:2px" id="sariman"><img src=' + nyomet + ' align="left" /><b> &nbsp; <span id="sarimin">Sarimin beraksi....</span></b></div>' + document.body.innerHTML;

function gusur() { 
  var wn ='#ffff00';
  if(smn) { wn = '#00ff00'; }
  var iwid = new RegExp('<td width="250"></td>','gi'); 
  var owid = '<td width="250" align="center" bgcolor=' + wn + '><img src=' + nyomet + ' align="left" /><div class="gf_text">' + pesan + '</div></td>'; 
  document.body.innerHTML = document.body.innerHTML.replace(iwid,owid); 
  iwid = new RegExp('<td width="230"></td>','gi'); 
  owid = '<td width="230" align="center" bgcolor=' + wn + '><img src=' + nyomet + ' align="left" /><div class="gf_text">' + pesan + '</div></td>'; 
  document.body.innerHTML = document.body.innerHTML.replace(iwid,owid);
} 
//gusur();

//----- pancingan timeout >> refresh 5 menit
if(smn==false) {
  //alert("4444");
  batas = -1;
  batas2 = 5*60*1000;
  setTimeout(function() {window.location.href=window.location.href;} ,  batas2) ;
}


//----- Belokin kode
var scriptCode = new Array(); 
scriptCode.push('function belik() {'                                 );
scriptCode.push('   if(document.getElementById("checkbutton").offsetLeft>=2) {   ');
scriptCode.push('     pos_x = 51 + Math.round(Math.random() * 18);   ');
scriptCode.push('     pos_y = 2 + Math.round(Math.random() * 12);   ');
scriptCode.push('     document.getElementById(\"checkbutton\").style.visibility=\"hidden\";   ');
scriptCode.push("     document.getElementById('timerdisplay').innerHTML = \"<img src='jquery/indicator.gif'/>Checking trap...\";   ");
scriptCode.push('     CheckTheTrap(pos_x, pos_y);   ');
scriptCode.push('     CheckTheNewStats();   ');
scriptCode.push('   }   ');
scriptCode.push('}'                                 );

var script = document.createElement('script');
script.innerHTML = scriptCode.join('\n');
scriptCode.length = 0;
    
try {    document.getElementsByTagName('head')[0].appendChild(script);  }
catch(e) {}

// Pake timer biar keren....
var counteri = null;
var detik1=batas/1000;
var detik2=batas2/1000;
var min=0;
var min2=0;
var sec=0;
var sec2=0;
var kiut=0;
mudun();

function mudun(){
  detik1--;
  detik2--;
  kiut++;
  if(detik1 >= 0)
  {
    min = Math.floor(detik1 / 60);
    sec = detik1 % 60;
    if(min < 10) { min = '0' + min; }
    if(sec < 10) { sec = '0' + sec; }
    document.getElementById("sarimin").innerHTML = pesan + ', masih ada waktu '  + min + ':' + sec + ' buat ngerokok :D';
    setTimeout(mudun, 1000);
  } else {
    if(smn) { pesan = '<font color=blue>Sarimin sudah beraksi!</font>'; }
    if(detik2 >= 0)
    {
      min2 = Math.floor(detik2 / 60);
      sec2 = detik2 % 60;
      if(min2 < 10) { min2 = '0' + min2; }
      if(sec2 < 10) { sec2 = '0' + sec2; }
      document.getElementById("sarimin").innerHTML = pesan + '......  mau ngRefresh '  + min2 + ':' + sec2 + ' lagi...';
      setTimeout(mudun, 1000);
    }
  }
}

//----- End UserScript
