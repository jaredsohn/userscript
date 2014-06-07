// ==UserScript==
// @name        travian_cfd
// @namespace   www.travian.com
// @description pridobi travian sporocilo
// @include     http://*.travian.com/*
// @version     1
// @grant       none
// ==/UserScript==


function NovaSporocila()
{ // Funkcija, ki vrne true, ce imam novo sporocilo in false, ce ga ni.
    if(document.getElementsByClassName("messages")[0].textContent.trim()*1 != 0) return true;
    else return false;
}

//Funkcija, ki vrne stevilo novih sporocil.
function stSporocil()
{
   return document.getElementsByClassName("messages")[0].textContent.trim()*1
}

// Funkcija vrne zaporedno stevilko CfD sporocila, ce je katero izmed sporocil naslovljeno "CfD", in false, ce ni nobeno
var stSporocila;
function preglej_naslove()
{
    var i;
    var st_naslov = document.getElementsByClassName("subject").length;
    for(i=1;i<=st_naslov;i++)
    {
        if(document.getElementsByClassName("subjectWrapper")[i-1].childNodes[1].alt=="unread" && document.getElementsByClassName("subject")[i-1].textContent.trim()=="CfD")       
        {
        stSporocila = i;
        return stSporocila;
        }
     
    }
    
    return false;
}

//Funkcija, ki vrne link in ime od posiljatelja (sporocilo je ze odprto)
var link_pos,ime_pos;
function posiljatelj_link()
{
    var pos = document.getElementsByClassName("header text")[0].innerHTML;
    link_pos = pos.slice(9,pos.indexOf(">")-1);
    ime_pos = document.getElementsByClassName("header text")[0].textContent;
}

// Funkcija, ki vrne podatke iz sporocila (link napadanega mesta, 
// ime napadenega mesta, potrebovano vojsko, cas prihoda, datum prihoda,
// koliko ur je se do napada, koliko minut je se do napada
var link_nap_vas,potr_enote,cas_prihoda,ura_prih,
    min_prih,sek_prih,dat_prih,dan_prih,mes_prih,leto_prih,pot,
    jeDovoljCasa,nastVas,nsporocila;
var trn_cas = new Date();
var prih_cas,se_mili;
function podatki()
{
   var spr = document.getElementById("message").innerHTML;
    link_nap_vas = spr.slice(spr.indexOf("href")+6,spr.indexOf(">")-1);
    x_napvas = spr.slice(spr.indexOf("Attacked city coordinates:") + 29,spr.indexOf(" ",spr.indexOf("Attacked city coordinates:")+28))*1;
    y_napvas = spr.slice(spr.indexOf("y:",spr.indexOf("Attacked city coordinates:")) + 2,spr.indexOf("<",spr.indexOf("y:",spr.indexOf("Attacked city coordinates:"))+2))*1;
    potr_enote = spr.slice(spr.indexOf("Needed troops")+15,spr.indexOf("<",spr.indexOf("Needed troops")+15))*1;
    cas_prihoda = spr.slice(spr.indexOf("Time of arrival")+17,spr.indexOf("<",spr.indexOf("Time of arrival")+15));
    ura_prih = cas_prihoda.slice(0,2)*1;
    min_prih = cas_prihoda.slice(3,5)*1;
    sek_prih = cas_prihoda.slice(6,8)*1;
    dat_prih = spr.slice(spr.indexOf("Date")+6);
    dan_prih = dat_prih.slice(0,2)*1;
    mes_prih = dat_prih.slice(3,5)*1;
    leto_prih = dat_prih.slice(6,10)*1;
    
    //Racunanje
    trn_cas = new Date();
    prih_cas = new Date(leto_prih,mes_prih-1,dan_prih,ura_prih,min_prih,sek_prih);

    
    se_mili = prih_cas.getTime() - trn_cas.getTime();
    se_ur = se_mili/36e5;
//    se_min = Math.floor((se_mili - se_ur*36e5)/6e4)
    
    uporabnikdata();
    
    //Izracun poti in cas pohoda
    pot = Math.sqrt(Math.pow(x_napvas - x_upr,2)+Math.pow(y_napvas - y_upr,2))
    if(pot <= 20)
    {
    cas_pohoda = pot/hitrost[zap_st_voj-1];
    }
    else
    {
        cas_pohoda = 20/hitrost[zap_st_voj-1] + (pot-20)/hitrost[zap_st_voj-1]*(st_vadbisce/100);
    }
    
    if(se_ur > cas_pohoda) jeDovoljCasa = true;
    else jeDovoljCasa = false;
    
    setCookie("link_nap_vas",link_nap_vas,1);
    setCookie("potr_enote",potr_enote,1);
    setCookie("zap_st_voj",zap_st_voj,1);
    setCookie("x_napvas",x_napvas,1);
    setCookie("y_napvas",y_napvas,1);
    setCookie("nastVas",nastVas,1);
    setCookie("nastVas_id",nastVas_id,1);
    
    
}

//preveri, ce je na voljo dovolj enot (brskalnik je na zbiraliscu- enote v tej vasi in oazah)
function jeDovoljEnot()
{
    
}

//izpolni polja v zbiraliscu za posiljanje enot
function izpolni_polja()
{
    document.getElementsByName("t"+getCookie("zap_st_voj"))[0].value = getCookie("potr_enote");
    document.getElementsByName("c")[0].checked = true;
}

//Pridobi podatke o uporabniku skripte (pleme, xy naselja, tip vojaka za pošiljanje)
var pleme,x_upr,y_upr,zap_st_voj,st_vadbisce;
function uporabnikdata()
{
    pleme = document.getElementsByClassName("playerName")[0].firstElementChild.alt;
    if(pleme=="Romans") {pleme = 1; hitrost = new Array(6,5,7,16,14,10,4,3,4,5);}
    if(pleme=="Teutons") {pleme = 2; hitrost = new Array(7,7,6,9,10,9,4,3,4,5);}
    if(pleme=="Gauls") {pleme = 3; hitrost = new Array(7,6,17,19,16,13,4,3,4,5);}
    // tu manjka se koda za dolocitev naselja (uporabnik vnese)
    // tu manjka koda za zap_st_voj, ki ga uporabnik zeli poslati
    
    nastVas = "01 Tokuhichi";
    nastVas_id = "87586";
    
    x_upr = -24;
    y_upr = 31;
    
    zap_st_voj = 2; // pretorian
    st_vadbisce = 12;
}

function setCookie(cname,cvalue,exdays)
{
var d = new Date();
d.setTime(d.getTime()+(exdays*24*60*60*1000));
var expires = "expires="+d.toGMTString();
document.cookie = cname + "=" + cvalue + "; " + expires;
} 

function getCookie(cname)
{
var name = cname + "=";
var ca = document.cookie.split(';');
for(var i=0; i<ca.length; i++)
  {
  var c = ca[i].trim();
  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
return "";
} 


var dorf1 = "http://ts7.travian.com/dorf1.php";
var nach = "http://ts7.travian.com/nachrichten.php";
//funkcija izvajanja
function izvajanje()
{       
    if(NovaSporocila() && window.location.href!=nach && getCookie("kljuc1")*1)
    {     
        if(document.getElementById("villageNameField").innerHTML != getCookie("nastVas"))
        {
            window.location.href = "http://ts7.travian.com/dorf1.php?newdid="+getCookie("nastVas_id")+"&";
        }
        else
        {              
        setCookie("kljuc1",0,1);
        window.location.href=nach;
        }
    }
    else   
    if(window.location.href==nach)
    {
        if(preglej_naslove())
        {
            window.location.href = document.getElementsByClassName("subjectWrapper")[preglej_naslove()-1].childNodes[3].attributes.href.value;
        }
        else 
        {
            setCookie("kljuc",0,0.2);
            window.location.href = dorf1;
        }
    }
    else
    if(window.location.href.slice(0,window.location.href.indexOf("="))== "http://ts7.travian.com/nachrichten.php?id")
    {
      
        posiljatelj_link();
        podatki();  
        if(!jeDovoljCasa) 
        {
            setCookie("kljuc",0,0.2);
            window.location.href = dorf1;
        }
        else
        {
        window.location.href = link_nap_vas;
        }
    }
    else
    if(window.location.href == "http://ts7.travian.com/position_details.php?x="+getCookie("x_napvas")+"&y="+getCookie("y_napvas"))
    {   
        
        
        var naslZbirPoslji = document.getElementsByClassName("a arrow")[1].href;
        setCookie("naslZbirPoslji",naslZbirPoslji,1);
        
        window.location.href = naslZbirPoslji;
               
    }
    else
    if(window.location.href == getCookie("naslZbirPoslji"))
    {
        izpolni_polja();
        document.getElementsByTagName("button")[8].click();
    }
    else
    if(window.location.href == "http://ts7.travian.com/build.php?id=39&tt=2")
    {
        setCookie("kljuc",0,0.2);
        setCookie("kljuc1",1,0);
        interval = int_cas + Math.random()*intplusminus/2 - Math.random()*intplusminus/2;
        setCookie("interval",interval,1);
        zluc = trn_cas.getTime() + interval;
        document.getElementById("btn_ok").click();
        
    }
 
}
// zacni izvajanje

var intplusminus = 7*60*1000;
var int_cas = 30*60*1000;
var interval;

function kljuci()
{
    setCookie('kljuc',1,1); 
    setCookie('kljuc1',1,1); 
    location.reload();
}

setInterval("kljuci()",(30*60*1000 + Math.random()*7*60*1000 - Math.random()*7*60*1000));

if (getCookie("kljuc")*1) {izvajanje();}

