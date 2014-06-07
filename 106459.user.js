// ==UserScript==
// @name	emoticons4frendz
// @version	1.00
// @author	rohanpote0@gmail.com
// @description	Use Animated emoticons(for www.frendz4m.com only) in community Forums. Just click on a smiley to insert. Enjoy, love u frendz4m
// @include        http://*.frendz4m.*/*reply.php*
// @include        http://*.frendz4m.*/*forum*/*showthreads*
// @include        http://*.frendz4m.*/*forum*/*edit.php*
// @include        http://*.frendz4m.*/*forum*/*index2.php*
// @include	   http://*.frendz4m.*/forum/index2.php*
// @include	   http://*.frendz4m.*/forum/pm/replypm.php*
// @include	   http://*.frendz4m.*/forum/pm/writepm.php*
// ==/UserScript==


addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "[img]"+image+"[/img]";
}

function dip() {
	var smileyarr = new Array();	

var smileyarr = new Array();	
smileyarr["36_9_4"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZC_ATlKSI/AAAAAAAAAbw/uVzKz7zWBOQ/36_9_4.gif";
smileyarr["36_9_3"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZC_lQZCTI/AAAAAAAAAb0/JvkhgTqCPlQ/36_9_3.gif";
smileyarr["36_9_2"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDAJAw5DI/AAAAAAAAAb4/a7TQaqNWBs8/36_9_2.gif";
smileyarr["36_9_1"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDA0HQYCI/AAAAAAAAAb8/lURZqQjzf2Y/36_9_1.gif";
smileyarr["36_7_6"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDBloFcsI/AAAAAAAAAcA/ZtyIlI6rJjY/36_7_6.gif";
smileyarr["36_7_5"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDCX2JMaI/AAAAAAAAAcE/r8fVBsAOnA4/36_7_5.gif";
smileyarr["36_6_9"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDDFuSwJI/AAAAAAAAAcI/Q48AHs7pK6A/36_6_9.gif";
smileyarr["36_6_8"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDEVsS17I/AAAAAAAAAcM/-aCPHoitm1c/36_6_8.gif";
smileyarr["36_6_5"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDE43ngrI/AAAAAAAAAcQ/WmPUySKVMws/36_6_5.gif";
smileyarr["36_6_4"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDFk8XAcI/AAAAAAAAAcU/GPscDg9VD5U/36_6_4.gif";
smileyarr["36_6_3"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDGGIipgI/AAAAAAAAAcY/5fRVpl2SRq8/36_6_3.gif";
smileyarr["36_6_2"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDG_uzwRI/AAAAAAAAAcc/YzFq_krNEkw/36_6_2.gif";
smileyarr["36_6_1"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDHdzrBlI/AAAAAAAAAcg/_DXNo1MTQgY/36_6_1.gif";
smileyarr["36_3_2"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDIE3knHI/AAAAAAAAAck/_pp8jsxY_bo/36_3_2.gif";
smileyarr["36_3_15"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDIrCcDkI/AAAAAAAAAco/rQBvkGi-oxA/36_3_15.gif";
smileyarr["36_3_14"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDJcIHaiI/AAAAAAAAAcs/6eyMqAEQFdc/36_3_14.gif";
smileyarr["36_1_9"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDJ8GebFI/AAAAAAAAAcw/Xt-XbRWwq1s/36_1_9.gif";
smileyarr["36_1_8"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDKX4yBcI/AAAAAAAAAc0/FDCpCfcfhwI/36_1_8.gif";
smileyarr["36_1_6"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDK3vs34I/AAAAAAAAAc4/Jll0AIn30pc/36_1_6.gif";
smileyarr["36_1_5F40"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDLoFOROI/AAAAAAAAAc8/nh311Tngvpc/36_1_5F40.gif";
smileyarr["36_1_5F25"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDMAfJOcI/AAAAAAAAAdA/PtRq8BJijpM/36_1_5F25.gif";
smileyarr["36_1_54"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDMson46I/AAAAAAAAAdE/OIWV1LFaQ3k/36_1_54.gif";
smileyarr["36_1_53"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDNXILDgI/AAAAAAAAAdI/EjbefsX0RAk/36_1_53.gif";
smileyarr["36_1_52"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDOEUM9UI/AAAAAAAAAdM/dXHbFJIigek/36_1_52.gif";
smileyarr["36_1_51"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDO_2t5uI/AAAAAAAAAdQ/dFZaT7w87AI/36_1_51.gif";
smileyarr["36_1_50"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDPfhl7BI/AAAAAAAAAdU/v5pMpk5k2S0/36_1_50.gif";
smileyarr["36_1_5"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDP88x9cI/AAAAAAAAAdY/73EKl4wzVpk/36_1_5.gif";
smileyarr["36_1_49"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDQombrXI/AAAAAAAAAdc/OjCUNP0b-hA/36_1_49.gif";
smileyarr["36_1_47"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDRFkKXKI/AAAAAAAAAdg/zi7edV-wono/36_1_47.gif";
smileyarr["36_1_46"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDSF40_LI/AAAAAAAAAdk/HQIeN4ldC6Y/36_1_46.gif";
smileyarr["36_1_44"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDShQr0DI/AAAAAAAAAdo/sObiW26R23s/36_1_44.gif";
smileyarr["36_1_42"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDTV_QedI/AAAAAAAAAds/YUpDRKv172A/36_1_42.gif";
smileyarr["36_1_41"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDTxSYMRI/AAAAAAAAAdw/QR_muI96Pmw/36_1_41.gif";
smileyarr["36_1_4"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDUcGFoOI/AAAAAAAAAd0/NxSqswbc0zg/36_1_4.gif";
smileyarr["36_1_39"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDVPQdK6I/AAAAAAAAAd4/FjLs462vN_g/36_1_39.gif";
smileyarr["36_1_38"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDVrhTmlI/AAAAAAAAAd8/IcA3CGt5kpk/36_1_38.gif";
smileyarr["36_1_37"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDWSLBWxI/AAAAAAAAAeA/sKw1_tPnjZ0/36_1_37.gif";
smileyarr["36_1_35"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDXAWq0PI/AAAAAAAAAeE/g66LWLaAAXg/36_1_35.gif";
smileyarr["36_1_32"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDXprk92I/AAAAAAAAAeI/zTrPg9mFq64/36_1_32.gif";
smileyarr["36_1_31"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDYOcysKI/AAAAAAAAAeM/oX4awRB6M-8/36_1_31.gif";
smileyarr["36_1_30"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDYl3C4QI/AAAAAAAAAeQ/73OtASTB6BQ/36_1_30.gif";
smileyarr["36_1_29"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDZdxYMbI/AAAAAAAAAeU/i9KT6tW_Uic/36_1_29.gif";
smileyarr["36_1_28"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDaKiCvyI/AAAAAAAAAeY/kbBrEqd6ynQ/36_1_28.gif";
smileyarr["36_1_26"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDaq7U4cI/AAAAAAAAAec/E4sUAzRfbbM/36_1_26.gif";
smileyarr["36_1_21"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDbf3LfnI/AAAAAAAAAeg/mLyXoTARcQ4/36_1_21.gif";
smileyarr["36_1_2"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDb8OKfhI/AAAAAAAAAek/QSuOcDD8B5E/36_1_2.gif";
smileyarr["36_1_19"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDcpbvFDI/AAAAAAAAAeo/6GFck-L9u7s/36_1_19.gif";
smileyarr["36_1_16"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDdGqaePI/AAAAAAAAAes/YR6uZ2Wb9ss/36_1_16.gif";
smileyarr["36_1_15"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDdx4vBBI/AAAAAAAAAew/FSovSOaKU7g/36_1_15.gif";
smileyarr["36_1_14"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDegqQgMI/AAAAAAAAAe0/fWg3fRWuiUk/36_1_14.gif";
smileyarr["36_1_13"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDfFW5_8I/AAAAAAAAAe4/IrbArjs7DKI/36_1_13.gif";
smileyarr["36_1_12"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDft9HyOI/AAAAAAAAAe8/aLVgdJ1foLQ/36_1_12.gif";
smileyarr["36_1_11"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDgfuCcMI/AAAAAAAAAfA/ORnF5QvyAtY/36_1_11.gif";
smileyarr["36_1_10"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDg9RhaZI/AAAAAAAAAfE/RUXhaj_H2rA/36_1_10.gif";
smileyarr["36_1_1"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDhrcVQfI/AAAAAAAAAfI/EKI1NmUdwvs/36_1_1.gif";
smileyarr["36_15_26"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDiLaY9xI/AAAAAAAAAfM/xSsydF2S2Ns/36_15_26.gif";
smileyarr["36_15_2"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDi0EfrLI/AAAAAAAAAfQ/cqbaMr3t9go/36_15_2.gif";
smileyarr["36_15_19"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDjtrzcHI/AAAAAAAAAfU/vuqoJ5Nz6yE/36_15_19.gif";
smileyarr["36_15_13"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDkYb_xqI/AAAAAAAAAfY/rJT0J1Cq6ow/36_15_13.gif";
smileyarr["36_15_11"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDk5dyR1I/AAAAAAAAAfc/DTAWNe1kWp4/36_15_11.gif";
smileyarr["36_15_1"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDljNLPuI/AAAAAAAAAfk/YiDqCCcOVAM/36_15_1.gif";
smileyarr["36_13_5"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDmBHx81I/AAAAAAAAAfo/raN9QQ88g48/36_13_5.gif";
smileyarr["36_13_4"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDm-MrrXI/AAAAAAAAAfs/sIBqALOX1OE/36_13_4.gif";
smileyarr["36_13_3"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDnU1gfXI/AAAAAAAAAfw/wXp9nByKq3g/36_13_3.gif";
smileyarr["36_13_2"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDoSjw34I/AAAAAAAAAf0/_mlW9EL5ZzY/36_13_2.gif";
smileyarr["36_13_1"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDpG-vfSI/AAAAAAAAAf4/6c5GtszhVEU/36_13_1.gif";
smileyarr["36_11_6"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDp0nI_qI/AAAAAAAAAf8/Mdu8QqdZZ5c/36_11_6.gif";
smileyarr["36_11_5"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDqkYNx7I/AAAAAAAAAgA/oMFvyBqxIl4/36_11_5.gif";
smileyarr["36_11_3"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDrNtCDUI/AAAAAAAAAgE/lbIIbOL0PNM/36_11_3.gif";
smileyarr["36_11_2"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDr7Vv6II/AAAAAAAAAgI/qItlE6S_3EY/36_11_2.gif";
smileyarr["36_11_15"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDsnRVRgI/AAAAAAAAAgM/wKkCGMbSCEs/36_11_15.gif";
smileyarr["36_11_14"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDtG1hsYI/AAAAAAAAAgQ/tNJrbncHWXM/36_11_14.gif";
smileyarr["36_11_13"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDtwFo40I/AAAAAAAAAgU/balCRHLfYH8/36_11_13.gif";
smileyarr["36_11_11"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDuu4aIBI/AAAAAAAAAgY/OEdj3dZ-jqk/36_11_11.gif";
smileyarr["36_11_10"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDvVa6RXI/AAAAAAAAAgc/e92jvqtYNYE/36_11_10.gif";
smileyarr["36_11_1"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDw9JZPbI/AAAAAAAAAgg/JOWW-u8UNco/36_11_1.gif";
smileyarr["Colere_9"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHG1w7RqAI/AAAAAAAAAhY/TioU3JaJ14Q/Colere_9.gif";
smileyarr["Colere_8"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHG3QC32EI/AAAAAAAAAhc/2_yYOUCJiRI/Colere_8.gif";
smileyarr["Colere_70"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHG4bLumqI/AAAAAAAAAhg/NGwgDaDTGhA/Colere_70.gif";
smileyarr["Colere_7"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHG4xC2Z7I/AAAAAAAAAhk/HorQ3DyZNCE/Colere_7.gif";
smileyarr["Colere_69"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHG5nfTPrI/AAAAAAAAAho/Fp15c7iW5Ro/Colere_69.gif";
smileyarr["Colere_68"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHG6TEucNI/AAAAAAAAAhs/6HCUB2mPyII/Colere_68.gif";
smileyarr["Colere_67"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHG7n1br9I/AAAAAAAAAhw/nfGRHTfldNI/Colere_67.gif";
smileyarr["Colere_66"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHG8YiLagI/AAAAAAAAAh0/ibsuh-ixavo/Colere_66.gif";
smileyarr["Colere_65"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHG9iCgdVI/AAAAAAAAAh4/4II5XEPh5zM/Colere_65.gif";
smileyarr["Colere_64"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHG-L3R-BI/AAAAAAAAAh8/2tzqqicA3E4/Colere_64.gif";
smileyarr["Colere_63"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHG-qIh2xI/AAAAAAAAAiA/1JQeP0voxZc/Colere_63.gif";
smileyarr["Colere_62"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHG_izwopI/AAAAAAAAAiE/8-mu7WSouOA/Colere_62.gif";
smileyarr["Colere_61"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHAljT47I/AAAAAAAAAiI/b6IZqe_tOPw/Colere_61.gif";
smileyarr["Colere_60"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHBtOz6VI/AAAAAAAAAiM/uJCM7vIoRrI/Colere_60.gif";
smileyarr["Colere_6"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHCKVtXZI/AAAAAAAAAiQ/FHMdHo2E7eY/Colere_6.gif";
smileyarr["Colere_59"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHHC_ibmUI/AAAAAAAAAiU/sli-pXrP02c/Colere_59.gif";
smileyarr["Colere_58"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHDnN64dI/AAAAAAAAAiY/YcyL8m_bgvg/Colere_58.gif";
smileyarr["Colere_57"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHHEQXdFxI/AAAAAAAAAic/CAg6vpd1GG8/Colere_57.gif";
smileyarr["Colere_56"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHHE42D3RI/AAAAAAAAAig/4vmb0auMK78/Colere_56.gif";
smileyarr["Colere_55"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHFfU0j3I/AAAAAAAAAik/5oZksOYuRFA/Colere_55.gif";
smileyarr["Colere_54"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHHGKtnbGI/AAAAAAAAAio/lOc2_owZ5YQ/Colere_54.gif";
smileyarr["Colere_52"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHHbJfhyI/AAAAAAAAAis/5UVmfwr7-uM/Colere_52.gif";
smileyarr["Colere_51"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHJJlJn2I/AAAAAAAAAiw/ryTrv9Axvws/Colere_51.gif";
smileyarr["Colere_50"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHJ69d9_I/AAAAAAAAAi0/3RUcP7r8PKo/Colere_50.gif";
smileyarr["Colere_5"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHK4LmBaI/AAAAAAAAAi4/zsuhVdwHzNU/Colere_5.gif";
smileyarr["Colere_49"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHMaAPHMI/AAAAAAAAAi8/7gCV7f8fFgM/Colere_49.gif";
smileyarr["Colere_48"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHM9Hx4lI/AAAAAAAAAjA/HzlC1mlYTCA/Colere_48.gif";
smileyarr["Colere_47"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHHNUz6eAI/AAAAAAAAAjE/LzoPKCutqDg/Colere_47.gif";
smileyarr["Colere_45"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHN4LeJoI/AAAAAAAAAjI/03xCeK1zIuk/Colere_45.gif";
smileyarr["Colere_44"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHHOYlq4JI/AAAAAAAAAjM/6qh0KlKFAQw/Colere_44.gif";
smileyarr["Colere_43"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHO-lCzpI/AAAAAAAAAjQ/blGo6iRJIUI/Colere_43.gif";
smileyarr["Colere_42"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHPoqrFvI/AAAAAAAAAjU/qo0HRiD5mCg/Colere_42.gif";
smileyarr["Colere_41"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHHQA-LIUI/AAAAAAAAAjY/GLLJFFiQWRQ/Colere_41.gif";
smileyarr["Colere_40"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHRsU3sNI/AAAAAAAAAjc/ul0gztj30CM/Colere_40.gif";
smileyarr["Colere_4"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHSoNu_oI/AAAAAAAAAjg/eKhaYqy6gZE/Colere_4.gif";
smileyarr["Colere_39"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHHTahxVLI/AAAAAAAAAjk/QaqoKV-DR6w/Colere_39.gif";
smileyarr["Colere_38"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHUTbjsII/AAAAAAAAAjo/nEwNS6PG3DA/Colere_38.gif";
smileyarr["Colere_37"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHVNiI0SI/AAAAAAAAAjs/fLQuZxArYmE/Colere_37.gif";
smileyarr["Colere_36"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHWkXOeWI/AAAAAAAAAjw/VtuKyABS5t0/Colere_36.gif";
smileyarr["Colere_35"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHX1rtE0I/AAAAAAAAAj0/IRADUj1-uyI/Colere_35.gif";
smileyarr["Colere_34"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHY4Y5CPI/AAAAAAAAAj4/zSe_pM-dzGs/Colere_34.gif";
smileyarr["Colere_32"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHZninniI/AAAAAAAAAj8/G4cLFCXW-hs/Colere_32.gif";
smileyarr["Colere_31"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHawTum1I/AAAAAAAAAkA/eT17asZU46c/Colere_31.gif";
smileyarr["Colere_30"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHs_lx74I/AAAAAAAAAkE/XNDH1eXIQsk/Colere_30.gif";
smileyarr["Colere_3"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHHuiYhpvI/AAAAAAAAAkI/GRnKXvWJffs/Colere_3.gif";
smileyarr["Colere_29"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHv9mO9gI/AAAAAAAAAkM/_cmTBMfwYOE/Colere_29.gif";
smileyarr["Colere_28"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHw3WJ__I/AAAAAAAAAkQ/HGjEvSDyHQY/Colere_28.gif";
smileyarr["Colere_27"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHHxsLQkEI/AAAAAAAAAkU/MjbruWY_tQ0/Colere_27.gif";
smileyarr["Colere_26"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHy-8947I/AAAAAAAAAkY/Hy2eSt6t_zU/Colere_26.gif";
smileyarr["Colere_25"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHH0spmlsI/AAAAAAAAAkc/WGdvqRxtM28/Colere_25.gif";
smileyarr["Colere_24"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHH197wxdI/AAAAAAAAAkg/nQRfwuNzjz0/Colere_24.gif";
smileyarr["Colere_23"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHH3iRPjpI/AAAAAAAAAkk/sfW_Eh467JY/Colere_23.gif";
smileyarr["Colere_22"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHH45zBvSI/AAAAAAAAAko/8CYukqVo_Yc/Colere_22.gif";
smileyarr["Colere_21"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHH6H0l46I/AAAAAAAAAks/lKSffEpF5uQ/Colere_21.gif";
smileyarr["Colere_20"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHH90HrSlI/AAAAAAAAAkw/Mogb_6x8muk/Colere_20.gif";
smileyarr["Colere_2"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHH-XUUnLI/AAAAAAAAAk0/OtuyX4T4D00/Colere_2.gif";
smileyarr["Colere_19"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHIAZHM65I/AAAAAAAAAk4/vcprRyjaQ_U/Colere_19.gif";
smileyarr["Colere_18"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHICXJ-mXI/AAAAAAAAAk8/nPLqHtk2WCQ/Colere_18.gif";
smileyarr["Colere_17"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHICwMdYdI/AAAAAAAAAlA/MC18dLSp2xY/Colere_17.gif";
smileyarr["Colere_16"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHID7ivkEI/AAAAAAAAAlE/Yk2Qu5WXnUY/Colere_16.gif";
smileyarr["Colere_15"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHIEe6gxtI/AAAAAAAAAlI/-cuX0D3hv6g/Colere_15.gif";
smileyarr["Colere_14"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHIE3NtrLI/AAAAAAAAAlM/foGlXjneQlM/Colere_14.gif";
smileyarr["Colere_13"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHIF07NwoI/AAAAAAAAAlQ/-g5s3keIqNs/Colere_13.gif";
smileyarr["Colere_12"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHIGiq6zEI/AAAAAAAAAlU/wmBoeqqGGn8/Colere_12.gif";
smileyarr["Colere_11"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHIHNTbP5I/AAAAAAAAAlY/mDTI7z84zCY/Colere_11.gif";
smileyarr["Colere_10"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHIHnty_dI/AAAAAAAAAlc/iUo17jnPxCE/Colere_10.gif";
smileyarr["Colere_1"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHII713RzI/AAAAAAAAAlg/R43kO6fsSqI/Colere_1.gif";
smileyarr["Colere"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHIJ0F9-pI/AAAAAAAAAlk/x76z_e0svMQ/Colere.gif";
smileyarr["hi"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BlbFGo6jI/AAAAAAAAAIA/42ft6wa_SZQ/s400/hi.png";
	smileyarr["OKP-butterfly"]="http://lh3.ggpht.com/_OpR8Gexvums/S4BL_5-Ts_I/AAAAAAAAADA/xuOG-RHtwAo/s400/OKP-butterfly.png";
	smileyarr["OKP-cool1"]="http://lh6.ggpht.com/_OpR8Gexvums/S4BPcE0J2VI/AAAAAAAAADI/mgyFhViogVg/s400/OKP-cool-1.png";
	smileyarr["OKP-cool2"]="http://lh6.ggpht.com/_OpR8Gexvums/S4BQ1fH8zoI/AAAAAAAAADQ/n0mcbdHDuRQ/s400/OKP-cool-2.png";
	smileyarr["OKP-cool3"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BRTqDx1XI/AAAAAAAAADY/qxWrQHX4zXU/s400/OKP-cool-3.png";
	smileyarr["OKP-cool4"]="http://lh6.ggpht.com/_OpR8Gexvums/S4BRrxBWh6I/AAAAAAAAADg/c05aWSQFgTI/s400/OKP-cool-4.png";
	smileyarr["OKP-cool5"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BSAWHT-tI/AAAAAAAAADo/SlEiH884F0k/s400/OKP-cool-5.png";
	smileyarr["OKP-cool6"]="http://lh3.ggpht.com/_OpR8Gexvums/S4BScpGInyI/AAAAAAAAADw/rHCkAwuFE78/s400/OKP-cool-6.png";
	smileyarr["OKP-cool7"]="http://lh3.ggpht.com/_OpR8Gexvums/S4BS_sEgESI/AAAAAAAAAD4/t2BRdymJqfg/s400/OKP-cool-7.png";
	smileyarr["OKP-cool8"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BTMZ5DYEI/AAAAAAAAAEA/3uluIVCGNQE/s400/OKP-cool-8.png";
	smileyarr["OKP-cool9"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BThzQRWkI/AAAAAAAAAEI/0G5Ngw9t4Jk/s400/OKP-cool-9.png";
	smileyarr["OKP-cool10"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BTq779III/AAAAAAAAAEQ/0SIZ34RCIUM/s400/OKP-cool-10.png";
	smileyarr["OKP-cool11"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BT3AhAOlI/AAAAAAAAAEY/TRCYCB8bsvU/s400/OKP-cool-11.png";
	smileyarr["OKP-cool12"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BUCdCbhhI/AAAAAAAAAEg/fYo4FGq6n6U/s400/OKP-cool-12.png";
	smileyarr["angry2"]="http://lh3.ggpht.com/_OpR8Gexvums/S4BqFcApjXI/AAAAAAAAAKI/tCs0nCvL6ag/s400/angry2.png";
	smileyarr["angry3"]="http://lh3.ggpht.com/_OpR8Gexvums/S4BqOk9w8-I/AAAAAAAAAKQ/jdQ1PIwALoE/s400/angry3.png";
	smileyarr["angry4"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BrfnYSW3I/AAAAAAAAAKY/Uwgz-Xjnn9A/s400/angry4.png";
	smileyarr["happy1"]="http://lh3.ggpht.com/_OpR8Gexvums/S4Br_83zo5I/AAAAAAAAAKg/pqih89LLGrE/s400/happy1.png";
	smileyarr["happy2"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BsWN0vQfI/AAAAAAAAAKo/jwXh550rgIk/s400/happy2.png";
	smileyarr["happy3"]="http://lh3.ggpht.com/_OpR8Gexvums/S4BsowOzGaI/AAAAAAAAAKw/n6RerO9jq-A/s400/happy4.png";
	smileyarr["happy4"]="http://lh4.ggpht.com/_OpR8Gexvums/S4Bv4H0HRpI/AAAAAAAAAMA/U3EC8H8rIlo/s400/happy6.png";
	smileyarr["happy5"]="http://lh3.ggpht.com/_OpR8Gexvums/S4ByF3SDq7I/AAAAAAAAANw/Atb8B3Q9uyY/s400/happy7.png";
	smileyarr["happy6"]="http://lh6.ggpht.com/_OpR8Gexvums/S4BySBth3UI/AAAAAAAAAN4/5c6ylxBDEtA/s400/happy8.png";
	smileyarr["sad1"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BwKiV2DhI/AAAAAAAAAMI/Y-fQQ8Y4tv8/s400/sad1.png";
	smileyarr["sad2"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BwTq0CGoI/AAAAAAAAAMQ/UVuzJPVBo-w/s400/sad2.png";
	smileyarr["sad3"]="http://lh6.ggpht.com/_OpR8Gexvums/S4BwbYN47DI/AAAAAAAAAMY/ju-oiNPMAKA/s400/sad3.png";
	smileyarr["sad4"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BwjdBqQsI/AAAAAAAAAMg/R4_XgVH4fQg/s400/sad4.png";
	smileyarr["sad5"]="http://lh6.ggpht.com/_OpR8Gexvums/S4BwtIwBS9I/AAAAAAAAAMo/eLPtZOVQm_g/s400/sad6.png";
	smileyarr["shy1"]="http://lh3.ggpht.com/_OpR8Gexvums/S4Bw20z7UtI/AAAAAAAAAMw/r4g25RY769A/s400/shy1.png";
	smileyarr["shy2"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BxBOIXQ_I/AAAAAAAAAM4/GgRuvvtSFm8/s400/shy2.png";
	smileyarr["shy3"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BxJL9bfLI/AAAAAAAAANA/wVi6Lrkp9Mo/s400/shy3.png";
	smileyarr["camera"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BxPbMaqDI/AAAAAAAAANI/y3SHTUYKJYs/s400/camera.png";
	smileyarr["dance1"]="http://lh6.ggpht.com/_OpR8Gexvums/S4Bs5gmHS1I/AAAAAAAAAK4/V5Y7khA9A3c/s400/dance1.png";
	smileyarr["dance2"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BtMiWyeMI/AAAAAAAAALA/8gDiHU0SOaw/s400/dance2.png";
	smileyarr["hug3"]="http://lh3.ggpht.com/_OpR8Gexvums/S4BuRORi3NI/AAAAAAAAALg/CLc08d5X1oI/s400/hug3.png";
	smileyarr["heartbeat"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BzZCg7bZI/AAAAAAAAAOY/sS9VHNNBXTo/s400/HEARTB%7E1.png";
	smileyarr["ILU"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BumA8HqXI/AAAAAAAAALo/W6Hpx2kkF3k/s400/I_LOVE%7E1.png";
	smileyarr["luvu"]="http://lh3.ggpht.com/_OpR8Gexvums/S4BuxFzOW8I/AAAAAAAAALw/Qbe72kLMpwU/s400/ilu.png";
	smileyarr["kiss"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BvM58hepI/AAAAAAAAAL4/tWyAyc2rH-k/s400/kiss2.png";
	smileyarr["heart"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BxWmBh7sI/AAAAAAAAANQ/zhdWkdwau1k/s400/heart.png";
	smileyarr["rose"]="http://lh6.ggpht.com/_OpR8Gexvums/S4BxiOtZ_TI/AAAAAAAAANY/yB-GQDK_qq8/s400/ROSE_9%7E1.png";
	smileyarr["newyr1"]="http://lh4.ggpht.com/_OpR8Gexvums/S4Bxr38sRoI/AAAAAAAAANg/EFlyQ66JHvw/s400/newyr1.png";
	smileyarr["newyr2"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BydT-PXAI/AAAAAAAAAOA/BXD6-WnmEp8/s400/newyr2.png";
	smileyarr["xmas1"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BywE3L9zI/AAAAAAAAAOI/9Iec1pRl9yg/s400/hug_new.png";
	smileyarr["xmas2"]="http://lh5.ggpht.com/_OpR8Gexvums/S4Bx2rnCwNI/AAAAAAAAANo/PqKF5CwbebE/s400/xmas.png";
	smileyarr["bday1"]="http://lh3.ggpht.com/_OpR8Gexvums/S4BpJFMGpvI/AAAAAAAAAJg/CZEL_YjcEpI/s400/bdaycake.png";
	smileyarr["bday2"]="http://lh6.ggpht.com/_OpR8Gexvums/S4BpcUlAqBI/AAAAAAAAAJo/FmmgDqz_Nic/s400/bday.png";
	smileyarr["bday3"]="http://lh4.ggpht.com/_OpR8Gexvums/S4Bpnsq9LkI/AAAAAAAAAJw/URsB2w3DByc/s400/bdaycheers.png";
	smileyarr["bdaygift"]="http://lh6.ggpht.com/_OpR8Gexvums/S4Bp2qPrhYI/AAAAAAAAAJ4/2nUfnBG06dM/s400/bdaygft.png";
	smileyarr["pet1"]="http://lh3.ggpht.com/_OpR8Gexvums/S4Bgk9gzLMI/AAAAAAAAAGY/HkxuxSY9YJQ/s400/pet-luv.png";
	smileyarr["ani"]="http://lh6.ggpht.com/_OpR8Gexvums/S4BiOqknPxI/AAAAAAAAAGg/2byaMR7gjMc/s400/ani.png";
	smileyarr["ani2"]="http://lh4.ggpht.com/_OpR8Gexvums/S4Bivji1MwI/AAAAAAAAAGo/bCaVdB4qLwU/s400/ani2.png";
	smileyarr["anisleep"]="http://lh4.ggpht.com/_OpR8Gexvums/S4Bi8KhDJVI/AAAAAAAAAGw/RYEbsq2WmJc/s400/anislp.png";
	smileyarr["babydance"]="http://lh6.ggpht.com/_OpR8Gexvums/S4BjSo3_CEI/AAAAAAAAAG4/0B0V4t_4L0w/s400/babydance.png";
	smileyarr["babyluv"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BjsCHkfoI/AAAAAAAAAHA/q1plagpuQtQ/s400/babyluv.png";
	smileyarr["babyfeed"]="http://lh4.ggpht.com/_OpR8Gexvums/S4Bj-rpdcJI/AAAAAAAAAHI/qxcnJ5DVITw/s400/babyfeed.png";
	smileyarr["babyoops"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BkSoXCTDI/AAAAAAAAAHQ/GYAfFx8KwEE/s400/babyfart.png";
	smileyarr["babycry2"]="http://lh4.ggpht.com/_OpR8Gexvums/S4Bkd7SIt7I/AAAAAAAAAHY/Tah-mD7UMHM/s400/babycry.png";
	smileyarr["babycry"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BkniGmvbI/AAAAAAAAAHg/s9mc-iEg7eE/s400/babycry2.png";
	smileyarr["babyno"]="http://lh3.ggpht.com/_OpR8Gexvums/S4Bk23b3TwI/AAAAAAAAAHo/QDKAuc-nmYc/s400/babyno.png";
	smileyarr["babysleep"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BlBiSKxUI/AAAAAAAAAHw/vXVXIPBjIjI/s400/babyslp.png";
	smileyarr["babybye"]="http://lh6.ggpht.com/_OpR8Gexvums/S4BlMuhrPEI/AAAAAAAAAH4/j20kPBR-WlA/s400/babybye.png";
	smileyarr["yes"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BmBCNPZgI/AAAAAAAAAIQ/4pTJh6j8650/s400/yes_text.png";
	smileyarr["thanx"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BmSvaqMDI/AAAAAAAAAIY/rEf5GQebuy4/s400/thanks2.png";
	smileyarr["kiss2"]="http://lh3.ggpht.com/_OpR8Gexvums/S4BmhgNU2yI/AAAAAAAAAIg/GaGjsvtGz2I/s400/kiss.png";
	smileyarr["jumping"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BmtB13dYI/AAAAAAAAAIo/qbgBci-HnGg/s400/JUMPIN%7E1.png";
	smileyarr["smoking"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BnwanKSiI/AAAAAAAAAI4/_kZbWmmY5k0/s400/smoking.png";
	smileyarr["holiday"]="http://lh5.ggpht.com/_OpR8Gexvums/S4Bzy2P9nQI/AAAAAAAAAOo/JwyQ8OIthbE/s400/holiday.png";
	smileyarr["waving"]="http://lh4.ggpht.com/_OpR8Gexvums/S4Bn_DObq3I/AAAAAAAAAJA/qRe726u_2Wc/s400/CHICKA%7E1.png";
	smileyarr["dancing"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BoSZnyjAI/AAAAAAAAAJI/YFswqMQhAPk/s400/DANCIN%7E1.png";
	smileyarr["blooming"]="http://lh3.ggpht.com/_OpR8Gexvums/S4Bok5fPMII/AAAAAAAAAJQ/8Wnh9xZuDJ0/s400/BLOOMI%7E1.png";
	smileyarr["growing"]="http://lh3.ggpht.com/_OpR8Gexvums/S4Bow1_bqaI/AAAAAAAAAJY/AHPIwpfLhM4/s400/GROWIN%7E1.png";
	smileyarr["clap"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BtWeJuvsI/AAAAAAAAALI/iSKWnERfujo/s400/clap.png";
	smileyarr["bestofluck"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BtlQKHEjI/AAAAAAAAALQ/692xdQVmYG4/s400/bestofluck.png";
	smileyarr["thumbsup"]="http://lh3.ggpht.com/_OpR8Gexvums/S4By8OeiaBI/AAAAAAAAAOQ/kzwX1XzJWYQ/s400/THUMBS.png";
	smileyarr["ROFL"]="http://lh3.ggpht.com/_OpR8Gexvums/S4Bzjg6AB1I/AAAAAAAAAOg/jAyh3e8nwmQ/s400/ROFL.png";
	smileyarr["beer"]="http://lh4.ggpht.com/_OpR8Gexvums/S4Bt6ERrQ9I/AAAAAAAAALY/p_AEnTmXYqs/s400/beer2.png";
	smileyarr["kitty"]="http://lh6.ggpht.com/_OpR8Gexvums/S4B0HV4wKaI/AAAAAAAAAOw/xu2QSY-vDVE/s400/kitty.png";
	smileyarr["swarnendu"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BUNwWgfAI/AAAAAAAAAEo/_1dmEa739ls/s400/swarnendu.png";
	smileyarr["soccer"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BUlgyNVKI/AAAAAAAAAEw/_P9VjU_s574/s400/soccer_3.png";
	smileyarr["swiming"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BUxrGxmvI/AAAAAAAAAE4/leO6DV03Smw/s400/swiming.png";
	smileyarr["weightlifting"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BVABeohnI/AAAAAAAAAFA/EI_1DxWuVlY/s400/WEIGHT%7E1.png";
	smileyarr["sailing"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BVMRTjHYI/AAAAAAAAAFI/Y1JbjuZ0R1E/s400/sailing.png";
	smileyarr["karate"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BVZY5XC8I/AAAAAAAAAFQ/4mYZ-eipQKI/s400/karate.png";
	smileyarr["golf"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BVo4hNGrI/AAAAAAAAAFY/pnzieY00DMM/s400/golf.png";
	smileyarr["cycling"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BclkQFD_I/AAAAAAAAAGA/blbEDib4INM/s400/CYCLIS%7E1.png";
	smileyarr["boxing"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BnBEekMwI/AAAAAAAAAIw/9T2Z_ioPEOM/s400/boxing_2.png";
	smileyarr["winner"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BV-3IEvPI/AAAAAAAAAFg/YxrsAkgOSWU/s400/winner.png";
	smileyarr["waving1"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BWLzdlb4I/AAAAAAAAAFo/an2T1uivi0c/s400/WAVING%7E1.png";
	smileyarr["waving2"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BWm91wb0I/AAAAAAAAAFw/2ktGQfKDgqA/s400/WAVING%7E3.png";
	smileyarr["waving3"]="http://lh3.ggpht.com/_OpR8Gexvums/S4BYWg8kbFI/AAAAAAAAAF4/QVTqlc_g0Mo/s400/WAVING~4.png";
	smileyarr["pet1"]="http://lh4.ggpht.com/_OpR8Gexvums/S4Bc1DfLdnI/AAAAAAAAAGI/GBvFyXV2YkU/s400/pet-hi.png";
	smileyarr["bye"]="http://lh3.ggpht.com/_OpR8Gexvums/S4Bl2dWl0eI/AAAAAAAAAII/3dj_XjszQFc/s400/bye.png";

	

	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title in smileyarr){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+smileyarr[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);

