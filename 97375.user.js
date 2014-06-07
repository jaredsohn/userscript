// ==UserScript==
// @name Streamer
// @author CennoxX
// @description Ermöglicht die Nutzung des Radiomagazins phonostar.de für den Online Stream Recorder von onlinestreamrecorder.com
// @include http://www.phonostar.de/radio/*
// @contact cesar.bernard@gmx.de
// ==/UserScript==
var AllLinks = document.getElementsByTagName("a");
	for(var i = 0; i < AllLinks.length; i++){
		var Part=AllLinks[i].href.split("%7C");
			if (Part[1] =="TIMER") {
//Senderliste Phonostar
switch (Part[3]) {
   case "1":
/*MDR SPUTNIK*/
var stream = "http://c22033-l.i.core.cdn.streamfarm.net/22005mdrsputnik/live/3087mdr_sputnik/live_de_128.mp3"
    break;
   case "33":
/*Klassik Radio*/
var stream = "http://edge.live.mp3.mdn.newmedia.nacamar.net/klassikradio96/livestream.mp3"
    break;
   case "39":
/*N-JOY*/
var stream = "http://ndrstream.ic.llnwd.net/stream/ndrstream_n-joy_hi_mp3"
    break;
   case "114":
/*DASDING*/
var stream = "http://swr.ic.llnwd.net/stream/swr_mp3_m_dasdinga"
    break;
   case "115":
/*SWR1 BW*/
var stream = "http://swr.ic.llnwd.net/stream/swr_mp3_m_swr1bwa"
    break;
   case "117":
/*SWR3*/
var stream = "http://swr.ic.llnwd.net/stream/swr_mp3_m_swr3a"
    break;
   case "118":
/*SWR4 BW*/
var stream = "http://swr.ic.llnwd.net/stream/swr_mp3_m_swr4bwa"
    break;
   case "119":
/*SWR4 RP*/
var stream = "http://swr.ic.llnwd.net/stream/swr_mp3_m_swr4rpa"
    break;
   case "120":
/*sunshine live*/
var stream = "http://62.26.214.248/sunshinelive/livestream.mp3"
    break;
   case "121":
/*Bayern 1*/
var stream = "http://gffstream.ic.llnwd.net/stream/gffstream_w10a"
    break;
   case "122":
/*Bayern 2*/
var stream = "http://gffstream.ic.llnwd.net/stream/gffstream_w11a"
    break;
   case "123":
/*Bayern 3*/
var stream = "http://gffstream.ic.llnwd.net/stream/gffstream_w12a"
    break;
   case "124":
/*B5 aktuell*/
var stream = "http://gffstream.ic.llnwd.net/stream/gffstream_w14a"
    break;
   case "125":
/*radioBerlin 88,8*/
var stream = "http://www.radioberlin.de/livemp3"
    break;
   case "126":
/*Deutschlandradio Kultur*/
var stream = "http://dradio.ic.llnwd.net/stream/dradio_dkultur_m_a"
    break;
   case "127":
/*Deutschlandfunk*/
var stream = "http://dradio.ic.llnwd.net/stream/dradio_dlf_m_a"
    break;
   case "133":
/*radioeins*/
var stream = "http://radioeins.de/livemp3"
    break;
   case "134":
/*Fritz*/
var stream = "http://www.fritz.de/livemp3"
    break;
   case "135":
/*Bremen Vier*/
var stream = "http://gffstream.ic.llnwd.net/stream/gffstream_mp3_w49a"
    break;
   case "136":
/*NDR2*/
var stream = "http://ndrstream.ic.llnwd.net/stream/ndrstream_ndr2_hi_mp3"
    break;
   case "137":
/*NDR Info*/
var stream = "http://ndrstream.ic.llnwd.net/stream/ndrstream_ndrinfo_hi_mp3"
    break;
   case "138":
/*NDR 90,3*/
var stream = "http://ndrstream.ic.llnwd.net/stream/ndrstream_ndr903_hi_mp3"
    break;
   case "139":
/*NDR Kultur*/
var stream = "http://ndrstream.ic.llnwd.net/stream/ndrstream_ndrkultur_hi_mp3"
    break;
   case "146":
/*You FM*/
var stream = "http://gffstream.ic.llnwd.net/stream/gffstream_mp3_w72a"
    break;
   case "147":
/*1LIVE*/
var stream = "http://gffstream.ic.llnwd.net/stream/gffstream_stream_wdr_einslive_a"
    break;
   case "149":
/*WDR2*/
var stream = "http://gffstream.ic.llnwd.net/stream/gffstream_w17a"
    break;
   case "150":
/*WDR5*/
var stream = "http://gffstream.ic.llnwd.net/stream/gffstream_w19a"
    break;
   case "153":
/*SR 1 Europawelle*/
var stream = "http://gffstream.ic.llnwd.net/stream/gffstream_mp3_w56a"
    break;
   case "154":
/*SR 2 KulturRadio*/
var stream = "http://gffstream.ic.llnwd.net/stream/gffstream_mp3_w58a"
    break;
   case "155":
/*SR 3 Saarlandwelle*/
var stream = "http://gffstream.ic.llnwd.net/stream/gffstream_mp3_w60a"
    break;
   case "165":
/*MDR Info*/
var stream = "http://c22033-l.i.core.cdn.streamfarm.net/22006mdr/live/3087mdr_info/live_de_128.mp3"
    break;
   case "166":
/*MDR Jump*/
var stream = "http://c22033-l.i.core.cdn.streamfarm.net/22004mdrjump/live/3087mdr_jump/live_de_128.mp3"
    break;
   case "170":
/*Kulturradio*/
var stream = "http://kulturradio.de/livemp3"
    break;
   case "172":
/*infoRADIO*/
var stream = "http://inforadio.de/livemp3"
    break;
   case "185":
/*Rockantenne*/
var stream = "http://mp3.webradio.rockantenne.de/"
    break;
   case "193":
/*105'5 Spreeradio*/
var stream = "http://4123.live.streamtheworld.com:80/SPR_AIRCMP3"
    break;
   case "194":
/*Antenne Brandenburg*/
var stream = "http://www.antennebrandenburg.de/livemp3"
    break;
   case "199":
/*Radio FFH*/
var stream = "http://62.27.44.60/radioffh/livestream.mp3"
    break;
   case "202":
/*NDR 1 Radio MV*/
var stream = "http://ndrstream.ic.llnwd.net/stream/ndrstream_ndr1radiomv_hi_mp3"
    break;
   case "204":
/*Radio Brocken*/
var stream = "http://stream.telvi.de:8000/radiobrocken"
    break;
   case "205":
/*NDR 1 Niedersachsen*/
var stream = "http://ndrstream.ic.llnwd.net/stream/ndrstream_ndr1niedersachsen_hi_mp3"
    break;
   case "206":
/*radio ffn*/
var stream = "http://rs35.stream24.org/stream"
    break;
   case "219":
/*89.0 RTL*/
var stream = "http://62.75.176.45/rtl-high"
    break;
   case "244":
/*Radio FG*/
var stream = "http://fg.impek.com:80"
    break;
   case "282":
/*Digitally Imported - Trance*/
var stream = "http://scfire-dtc-aa01.stream.aol.com:80/stream/1003"
    break;
   case "623":
/*bigFM*/
var stream = "http://bigfm.radio.de:8000/relay-1444"
    break;
   case "634":
/*UnserDing*/
var stream = "http://gffstream.ic.llnwd.net/stream/gffstream_mp3_w62a"
    break;
   case "883":
/*DRS1*/
var stream = "http://glb-stream10.streamserver.ch/1/drs1/mp3_128"
    break;
   case "884":
/*DRS2*/
var stream = "http://glb-stream10.streamserver.ch/1/drs2/mp3_128"
    break;
   case "885":
/*DRS3*/
var stream = "http://glb-stream10.streamserver.ch/1/drs3/mp3_128"
    break;
   case "886":
/*DRS Musikwelle*/
var stream = "http://glb-stream10.streamserver.ch/1/drsmw/mp3_128"
    break;
   case "999":
/*BBC Radio 1*/
var stream = "http://wm-live.bbc.net.uk/wms/bbc_ami/radio1/radio1_bb_live_int_ep1_sl0?BBC-UID=24ad9af651d4ead53542c5dbd146490fe4e3a78430702194a42fa4b6d8001efa&amp;SSO2-UID=?MSWMExt=.asf"
    break;
   case "1000":
/*BBC Radio 2*/
var stream = "http://wm-live.bbc.net.uk/wms/bbc_ami/radio2/radio2_bb_live_int_ep1_sl0?BBC-UID=24ad9af651d4ead53542c5dbd146490fe4e3a78430702194a42fa4b6d8001efa&amp;SSO2-UID=?MSWMExt=.asf"
    break;
   case "1001":
/*BBC Radio 3*/
var stream = "http://wm-live.bbc.net.uk/wms/bbc_ami/radio3/radio3_bb_live_int_ep1_sl0?BBC-UID=24ad9af651d4ead53542c5dbd146490fe4e3a78430702194a42fa4b6d8001efa&amp;SSO2-UID=?MSWMExt=.asf"
    break;
   case "1002":
/*BBC Radio 4*/
var stream = "http://wm-live.bbc.net.uk/wms/bbc_ami/radio4/radio4_bb_live_int_ep1_sl0?BBC-UID=24ad9af651d4ead53542c5dbd146490fe4e3a78430702194a42fa4b6d8001efa&amp;SSO2-UID=?MSWMExt=.asf"
    break;
   case "1004":
/*BBC 6 Music*/
var stream = "http://wm-live.bbc.net.uk/wms/bbc_ami/6music/6music_bb_live_int_ep1_sl0?BBC-UID=24ad9af651d4ead53542c5dbd146490fe4e3a78430702194a42fa4b6d8001efa&amp;SSO2-UID=?MSWMExt=.asf"
    break;
   case "1035":
/*triple j*/
var stream = "http://a1863.l11289751862.c112897.g.lm.akamaistream.net/D/1863/112897/v0001/reflector:51862"
    break;
   case "1048":
/*1Xtra BBC*/
var stream = "http://wm-live.bbc.net.uk/wms/bbc_ami/1xtra/1xtra_bb_live_int_ep1_sl0?BBC-UID=24ad9af651d4ead53542c5dbd146490fe4e3a78430702194a42fa4b6d8001efa&amp;SSO2-UID=?MSWMExt=.asf"
    break;
   case "1049":
/*RMNradio*/
var stream = "http://84.19.184.27:8022/"
    break;
   case "1173":
/*Sveriges Radio P3*/
var stream = "http://http-live.sr.se/p3-mp3-192"
    break;
   case "1205":
/*SWR1 RP*/
var stream = "http://swr.ic.llnwd.net/stream/swr_mp3_m_swr1rpa"
    break;
   case "1206":
/*SWR cont.ra*/
var stream = "http://swr.ic.llnwd.net/stream/swr_mp3_m_contraa"
    break;
   case "1227":
/*MDR FIGARO*/
var stream = "http://c22033-l.i.core.cdn.streamfarm.net/22007mdrfigaro/live/3087mdr_figaro/live_de_128.mp3"
    break;
   case "1242":
/*NDR 1 Welle Nord*/
var stream = "http://ndrstream.ic.llnwd.net/stream/ndrstream_ndr1wellenord_hi_mp3"
    break;
   case "1997":
/*Radio 2 NL*/
var stream = "http://shoutcast.omroep.nl:8102/"
    break;
   case "2211":
/*Ö1*/
var stream = "http://mp3stream3.apasf.apa.at:8000/"
    break;
   case "2479":
/*Funkhaus Europa*/
var stream = "http://gffstream.ic.llnwd.net/stream/gffstream_w20a"
    break;
   case "2538":
/*FANTASY Dance FM 96.7*/
var stream = "http://dancefmwebradio.de:8000/dsl_stream.mp3"
    break;
   case "2729":
/*Die Neue 107.7*/
var stream = "http://62.27.44.8/dieneue_rock/livestream_hi.mp3"
    break;
   case "2760":
/*FM4*/
var stream = "http://mp3stream1.apasf.apa.at:8000/"
    break;
   case "2777":
/*BR-KLASSIK*/
var stream = "http://rbb.ic.llnwd.net/stream/rbb_kulturradio_mp3_m_a"
    break;
   case "2940":
/*on3radio*/
var stream = "http://gffstream.ic.llnwd.net/stream/gffstream_w9a"
    break;
   case "3044":
/*Hitradio Ö3*/
var stream = "http://mp3stream7.apasf.apa.at:8000/"
    break;
   case "3607":
/*WDR 3*/
var stream = "http://gffstream.ic.llnwd.net/stream/gffstream_w21a"
    break;
   case "3617":
/*RTÉ 2FM*/
var stream = "http://live1.rte.ie/wmtencoder/1718.wma?MSWMExt=.asf"
    break;
   case "3669":
/*hr-info*/
var stream = "http://gffstream.ic.llnwd.net/stream/gffstream_mp3_w71a"
    break;
   case "3745":
/*WDR 4*/
var stream = "http://gffstream.ic.llnwd.net/stream/gffstream_w18a"
    break;
   case "3817":
/*RPR1*/
var stream = "http://rpr1.fmstreams.de/stream1"
    break;
   case "3821":
/*Rockland Radio*/
var stream = "http://ice.streaming.spacenet.de:80/rockland"
    break;
   case "4632":
/*MDR 1 Radio Sachsen*/
var stream = "http://c22033-l.i.core.cdn.streamfarm.net/22001mdr1sachsen/live/3087mdr_sachsen/live_de_128.mp3"
    break;
   case "4636":
/*MDR 1 Radio Thüringen*/
var stream = "http://c22033-l.i.core.cdn.streamfarm.net/22003mdr1thueringen/live/3087mdr_thue/live_de_128.mp3"
    break;
   case "4643":
/*MDR 1 Radio Sachsen-Anhalt*/
var stream = "http://c22033-l.i.core.cdn.streamfarm.net/22002mdr1sachsenanhalt/live/3087mdr_mdr1sa/live_de_128.mp3"
    break;
   case "5420":
/*hr3*/
var stream = "http://gffstream.ic.llnwd.net/stream/gffstream_mp3_w69a"
    break;
   case "5519":
/*Bremen Eins*/
var stream = "http://gffstream.ic.llnwd.net/stream/gffstream_mp3_w48a"
    break;
   case "5556":
/*Nordwestradio*/
var stream = "http://sc11.ams.llnw.net:80/stream/gffstream_mp3_w50a"
    break;
   case "5671":
/*Radio Memories*/
var stream = "http://streamplus16.ameus.de:12348/"
    break;
   case "6149":
/*GrooveFM*/
var stream = "http://stream.groovefm.de:10028"
    break;
   case "6159":
/*SWR2*/
var stream = "http://swr.ic.llnwd.net/stream/swr_mp3_m_swr2a"
    break;
   case "6214":
/*RMNSchlagerhölle*/
var stream = "http://aacplus.schlagerhoelle.de:30844"
    break;
   case "6251":
/*Digitally Imported - Techno*/
var stream = "http://188.165.216.223:6204/"
    break;
   case "6279":
/*Lightradio*/
var stream = "http://ice.streaming.spacenet.de:80/lightradio"
    break;
   case "6361":
/*MotorFM*/
var stream = "http://85.239.108.31/motorfm"
    break;
   case "6475":
/*hr1*/
var stream = "http://gffstream.ic.llnwd.net/stream/gffstream_mp3_w67a"
    break;
   case "6476":
/*hr2*/
var stream = "http://gffstream.ic.llnwd.net/stream/gffstream_mp3_w68a"
    break;
   case "6477":
/*hr4*/
var stream = "http://gffstream.ic.llnwd.net/stream/gffstream_mp3_w70a"
    break;
   case "6481":
/*Bash.fm*/
var stream = "http://www.bash-music.com:8000"
    break;
   case "6924":
/*DRS 4 News*/
var stream = "http://glb-stream10.streamserver.ch/1/drs4news/mp3_128"
    break;
   case "7023":
/*ByteFM*/
var stream = "http://streamingserver04.byte.fm:8000/"
    break;
   case "7271":
/*We Love House.FM*/
var stream = "http://we-love-house.fm:8000/stream"
    break;
   case "7463":
/*WDR Event*/
var stream = "http://gffstream.ic.llnwd.net/stream/gffstream_w22a"
    break;
   case "7465":
/*QUU.FM*/
var stream = "http://3qmedien.net/stream/quufm/mp3"
    break;
   case "7502":
/*BBC Radio Leeds*/
var stream = "http://wm-live.bbc.net.uk/wms/england/lrleeds?BBC-UID=64dd370975553e94511c17a0619953cb1b5af7c61000e164a4efd937ad46a17f&amp;SSO2-UID=?MSWMExt=.asf"
    break;
   case "7617":
/*BBC Radio Devon*/
var stream = "http://wm-live.bbc.net.uk/wms/england/lrdevon?BBC-UID=64dd370975553e94511c17a0619953cb1b5af7c61000e164a4efd937ad46a17f&amp;SSO2-UID=?MSWMExt=.asf"
    break;
   case "7751":
/*90elf - Dein Fußballradio*/
var stream = "http://85.239.108.41/90elf_basis_hq"
    break;
   case "7927":
/*Absolute Radio*/
var stream = "http://wms.absoluteradio.co.uk/absoluteradio.co.uk/vr_hi?u="
    break;
   case "8156":
/*Radio BOB!*/
var stream = "http://85.239.108.31:80/mp3-radiobob"
    break;
   case "8239":
/*egoFM*/
var stream = "http://edge.live.mp3.mdn.newmedia.nacamar.net/ps-egofm_192/livestream.mp3"
    break;
   case "9429":
/*#Musik - BigCityBeats*/
var stream = "http://bcb-high.rautemusik.fm"
    break;
   case "15388":
/*DRadio Wissen*/
var stream = "http://dradio.ic.llnwd.net/stream/dradio_dwissen_m_a"
    break;
   case "15982":
/*SLANG Radio*/
var stream = "http://slangradio.info:8010/"
    break;
   case "19479":
/*hörbuchFM*/
var stream = "http://srv12.blitz-stream.de/"
    break;
   case "20611":
/*RMNgoodtimes*/
var stream = "http://stream.rmngoodtimes.de:8050/"
    break;
   case "20883":
/*WNYU*/
var stream = "http://cinema.acs.its.nyu.edu:8000/wnyu128.mp3"
    break;
  default:
    alert("Dieser Stream wurde noch nicht hinzugefügt.");
    break;
}
var link=Part[2].toLowerCase().replace(/%c3%a4/g, "ae").replace(/%c3%84/g, "ae").replace(/%c3%bc/g, "ue").replace(/%c3%9c/g, "ue").replace(/%c3%b6/g, "oe").replace(/%c3%96/g, "oe").replace(/%c3%9f/g, "ss").replace(/\(/g, "").replace(/\)/g, "").replace(/-_/g, "").replace(/&_/g, "").replace(/\./g, "").replace(/,/g, "");
var starttime = new Date(parseInt(Part[4].slice(0, 4)), parseInt(Part[4].slice(4, 6))-1, parseInt(Part[4].slice(6, 8)), parseInt(Part[4].slice(8, 10)), parseInt(Part[4].slice(10, 12)), 0);
var endtime = new Date(parseInt(Part[5].slice(0, 4)), parseInt(Part[5].slice(4, 6))-1, parseInt(Part[5].slice(6, 8)), parseInt(Part[5].slice(8, 10)), parseInt(Part[5].slice(10, 12)), 0);
if(Date.parse(starttime)>Date.parse(endtime)){
endtime=new Date(Date.parse(endtime)+1000*60*60*24);
}
function zwei(Zahl){
if(Zahl<10){
Zahl="0"+Zahl;
}
return(Zahl);
}
AllLinks[i].href="http://www.onlinestreamrecorder.com/index.php?aktion=addstreams&tab=a&order=t&title="+link+"&url="+stream+"&vond="+zwei(starttime.getDate())+"&vonm="+zwei(starttime.getMonth()+1)+"&vony="+starttime.getFullYear()+"&vonh="+zwei(starttime.getHours())+"&voni="+zwei(starttime.getMinutes())+"&stopafter=time&bisd="+zwei(endtime.getDate())+"&bism="+zwei(endtime.getMonth()+1)+"&bisy="+endtime.getFullYear()+"&bish="+zwei(endtime.getHours())+"&bisi="+zwei(endtime.getMinutes())+"&btn_ok=Speichern";
			}
	}