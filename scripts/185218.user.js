// ==UserScript==
// @name           Tivibu Watching - Turk0
// @author         Tuk0 Development
// @namespace      http://silentall.com/
// @version        14.53
// @namespace      http://userscripts.org/scripts/show/185218
// @updateURL      https://userscripts.org/scripts/source/185218.meta.js
// @download       http://userscripts.org/scripts/source/185218.user.js
// @description    Tivibu platformunu tamamen ücretsiz ve rahatça izleyebilmenizi sağlayan script. Created By Turk0Dev
// ==/UserScript==

if(document.URL.search("http://195.175.242.19")>-1){

ka=["KANAL D ", "TV5MONDE", "AL-JAZEERA(ENG)", "ÜLKE TV", "TRTMUZİK", "MBC", "SKYNEWS", "NUMBERONE", "BEYAZ TV", "CİNE5", "STAR", "TRT ARAPCA", "EURONEWS TR", "OLAY TV", "BLOOMBERG", "FBTV", "LUXE TV", "YABAN TV", "YABAN 2", "N TV ENG", "PLANET PEMBE", "DW TV", "MEKKE 2", "NUMBERONE TR", "ATV", "ESPN", "TRTTURK", "DISNEYCHANNEL", "MCM POP", "E2", "TRT HD", "PLANET SİNEMA", "BBC WORLD", "SHOWTV", "TGRT", "CNN", "TRT OKUL", "TRT ANADOLU", "NTVSPOR", "KANALTÜRK", "KANAL 7", "KRAL POP", "TV8", "TVNET", "TRT AVAZ", "TRT BELGESEL", "PLANET TÜRK", "KANAL 35", "TRT1", "BUGÜN TV", "SPORTS TV", "YUMURCAK TV", "CNNTÜRK", "BLOOMBERGHT", "ULUSAL TV", "TV2", "TVEM", "POWERTURK", "HABERTURK", "FOXTV", "SAMANYOLU TV", "CNBCE", "KIDSCO", "KANAL A", "TRT HABER", "TRT ÇOCUK", "S HABER", "SKY TURK", "TİVİBU", "TRTSPOR", "NEOGEOGRAFIC", "NTV", "PLANET ÇOCUK", "MİNİKA ÇOCUK", "MİNİKA GO", "AHABER", "TİVİBUSPOR 1", "TRT1HD", "DAVİNCİ", "DİSCOVERY CHANNEL", "TİVİBUSPOR 2", "ANİMAL PLANET"];

id=["10001", "10002", "10005", "10004", "10006", "10009", "10011", "10012", "10013", "10014", "20001", "20002", "20003", "20004", "20005", "20007", "20008", "20009", "20010", "20011", "20012", "20013", "20014", "20015", "30001", "30003", "30004", "30005", "30006", "30008", "30010", "30012", "30015", "40001", "40003", "40004", "40010", "40011", "50001", "50002", "50003", "50004", "50005", "50007", "50010", "50012", "50013", "50014", "60001", "60002", "60004", "60005", "60006", "60008", "60010", "60012", "60013", "70001", "70002", "70003", "70004", "70005", "70006", "70007", "70008", "70009", "70012", "80003", "80006", "80009", "80010", "80012", "80013", "90003", "90004", "90005", "10001", "90008", "90011", "90012", "90013", "90014"];

re=["kanal-d.png", "tv5monde.png", "al-jazeera-international.png", "ulke-tv.png", "trt-muzik.png", "MBC.png", "skynews.png", "number-one.png", "beyaz-tv.png", "cine-5.png", "star-tv.png", "trt-6.png", "euronews.png", "olay-tv.png", "bloomberg.png", "fb-tv.png", "luxe-tv.png", "yaban-tv.png", "yaban-tv.png", "ntv.png", "planet-pembe.png", "discovery-world.png", "meltem-tv.png", "number1-turk.png", "atv.png", "eurosport.png", "trt-turk.png", "disney-channel.png", "mcm-pop.png", "e2.png", "trt-etturkiyye.png", "planet-sinema.png", "bbc-world.png", "show-tv.png", "tgrt-haber.png", "cnn-turk.png", "trt-okul.png", "trt-anadolu.png", "ntv-spor.png", "kanalturk.png", "kanal-7.png", "kral-pop.png", "tv8.png", "tvnet.png", "trt-avaz.png", "trt-turizm-ve-belgesel.png", "planet-turk.png", "kanal-35.png", "trt-1.png", "bugun-tv.png", "sports-tv.png", "yumurcak-tv.png", "cnn-international.png", "bloomberg-ht.png", "ulusal-kanal.png", "tv-2.png", "tvem.png", "powerturk-tv.png", "haberturk.png", "fox.png", "samanyolu-tv.png", "cnbc-e.png", "kidsco.png", "kanal-a.png", "trt-haber.png", "trt-cocuk.png", "s-haber.png", "sky-turk-360.png", "tivibuspor.png", "trt-spor.png", "national-geographic.png", "ntv.png", "planet-cocuk.png", "minika-cocuk.jpg", "minika-go.jpg", "a-haber.jpg", "tivibuspor.png", "trt-6.png", "da-vinci-learning.png", "discovery-channel.png", "tivibuspor.png", "animal-planet.png"];

("Copyright © 2014 SilentAll.Com - Türkiye'nin Katılımsız Platformu")

d=document.createElement("div");

for(x=0;x<ka.length;x++){
  a=document.createElement("a");
  a.setAttribute("href", "#");
  a.setAttribute("onclick", "degis('"+id[x]+"')");
  a.innerHTML="<img src='http://content.tivibu.com.tr/content/tvchannel/logo/"+re[x]+"' width='60px' height='40px'/>";
  d.appendChild(a);
}

document.body.parentNode.insertBefore(d,document.body);

function degis(x){
player=document.getElementsByTagName("object")[0];
id=player.innerHTML.split("Live/")[1].split(".")[0];
player.innerHTML=player.innerHTML.replace(id,x);

}

sc=document.createElement("script");
sc.textContent=degis.toString();
document.body.appendChild(sc);

}