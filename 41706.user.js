scr_meta=<><![CDATA[
// ==UserScript==
// @name	Gmail Smilies For Orkut ScrapBook and HTML Communities
// @version	1.2.0
// @author	Swashata
// @namespace	TEAM BLAKUT
// @description	Use Animated smileys in your ScrapBook and HTML community Forums. Just click on a smiley to insert. Enjoy
// @include        http://*.orkut.*/*Scrapbook.aspx*
// @include        http://*.orkut.*/*CommMsgs.aspx*
// @include        http://*.orkut.*/*CommMsgPost.aspx*
// ==/UserScript==
]]></>;

/**********************************************************************************************************************************************************
//Smilies collected from Gmail ;)
//Original Base script by Ashu da![Our Orkut community "DOWNLOAD FREE SOFTWARE [DFS]" community MOD Thanks to him for teaching me how to write the scripts.
***********************************************************************************************************************************************************/

addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<img src="+image+">";
}

function dip() {
	var smileyarr = new Array();	
smileyarr["1"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SYgqbLJ3FwI/AAAAAAAAA44/L5ZWpvrrmIM/B0C.png";
smileyarr["2"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYgqcYJfeCI/AAAAAAAAA48/TpWjI8SS78M/827.png";
smileyarr["3"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYgqdUmTCtI/AAAAAAAAA5A/4p92dgCXL18/4E0.png";
smileyarr["4"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SYgqecENXgI/AAAAAAAAA5E/z6Gyg48OsRM/368.png";
smileyarr["5"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SYgqfUrB2KI/AAAAAAAAA5I/uXCTNJmLo5k/367.png";
smileyarr["6"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYgqgLwMTHI/AAAAAAAAA5M/khUGnZ5FfJI/366.png";
smileyarr["7"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYgqg1hVjkI/AAAAAAAAA5Q/ABTQ6yKsK5Q/365.png";
smileyarr["8"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYgqh_FNjhI/AAAAAAAAA5U/BTy5UZpcR0c/364.png";
smileyarr["9"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYgqiuGOd-I/AAAAAAAAA5Y/5yaMMgXqXVY/363.png";
smileyarr["10"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SYgqjaoiFJI/AAAAAAAAA5c/FX6YtPu6SlA/362.png";
smileyarr["11"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SYgqkJCTmzI/AAAAAAAAA5g/VeNhehZlu6E/361.png";
smileyarr["12"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SYgqk4sgZBI/AAAAAAAAA5k/8bkaRPKDb04/35E.png";
smileyarr["13"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SYgqlkCdUcI/AAAAAAAAA5o/TJhxnBhDYnY/35C.png";
smileyarr["14"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SYgqmhlcTrI/AAAAAAAAA5s/rLVJ16gjdPM/35A.png";
smileyarr["15"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYgqnbqX4uI/AAAAAAAAA5w/33vZzV-0wJ4/347.png";
smileyarr["16"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYgqoNUoOhI/AAAAAAAAA50/mIb1w9eivYU/346.png";
smileyarr["17"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SYgqo6UKfgI/AAAAAAAAA54/0tYBGdrx_04/344.png";
smileyarr["18"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SYgqph4bt5I/AAAAAAAAA58/5G06r96l4as/341.png";
smileyarr["19"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SYgqqdhdb1I/AAAAAAAAA6A/0maLHwI67M8/340.png";
smileyarr["20"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SYgqrKvGqXI/AAAAAAAAA6E/k_RTY7ig6IU/33F.png";
smileyarr["21"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SYgqsO7j_YI/AAAAAAAAA6I/HWz5j0SKSnI/33E.png";
smileyarr["22"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYgqs9xxRwI/AAAAAAAAA6M/vNJ1FvMXQFI/33D.png";
smileyarr["23"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SYgqtlJLbwI/AAAAAAAAA6Q/Lfn_d2nEtNQ/33C.png";
smileyarr["24"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYgqucaPCUI/AAAAAAAAA6U/8AhMqm_Jwxs/338.png";
smileyarr["25"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SYgqvSK6y4I/AAAAAAAAA6Y/6H8BhT1WuYU/335.png";
smileyarr["26"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SYgqwqN5s8I/AAAAAAAAA6c/y4hAEdkutpM/333.png";
smileyarr["27"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SYgqxvYUmAI/AAAAAAAAA6g/r_BMfh-Tfjo/332.png";
smileyarr["28"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYgqyQKL3WI/AAAAAAAAA6k/1LnG-lOUADo/331.png";
smileyarr["29"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SYgqzBNl6fI/AAAAAAAAA6o/ERlnpGxiZC8/330.png";
smileyarr["30"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SYgqz-LYP-I/AAAAAAAAA6s/cqDPqnTmCgg/32F.png";
smileyarr["31"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYgq0o9OuQI/AAAAAAAAA6w/jygn58uvzQs/32E.png";
smileyarr["32"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SYgq1huNhgI/AAAAAAAAA60/nhhY0JvNm94/32C.png";
smileyarr["33"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYgq2n3OcQI/AAAAAAAAA64/DNXXuxlcI_Q/32B.png";
smileyarr["34"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SYgq3UekhhI/AAAAAAAAA68/0217f6SW68Y/32A.png";
smileyarr["35"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SYgq4TWyWNI/AAAAAAAAA7A/PIv097N7JDY/329.png";
smileyarr["36"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYgq5M9E9FI/AAAAAAAAA7E/cOf9OukjEeI/328.png";
smileyarr["37"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SYgq55gsTOI/AAAAAAAAA7I/p2WXAgUtgpA/326.png";
smileyarr["38"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SYgq6gD_eBI/AAAAAAAAA7M/r9DLdb9IiE8/325.png";
smileyarr["39"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SYgq7eNh6VI/AAAAAAAAA7Q/pZJKN7_wHzY/324.png";
smileyarr["40"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SYgq8I01V4I/AAAAAAAAA7U/R1VH8j4YGtc/323.png";
smileyarr["41"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SYgq8_rPkcI/AAAAAAAAA7Y/JDARG-pWAhE/321.png";
smileyarr["42"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYgq-F9YqlI/AAAAAAAAA7c/I7NG10PXxq4/320.png";
smileyarr["43"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SYgq-3N63CI/AAAAAAAAA7g/aIp89sOW1ac/1D5.png";
smileyarr["44"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SYgq_r1LNqI/AAAAAAAAA7k/OWXftNGRlXg/1BF.png";
smileyarr["45"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SYgrAruABSI/AAAAAAAAA7o/IgPohrgaa90/1B2.png";
smileyarr["46"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SYgrC_n2V6I/AAAAAAAAA7s/eTNJuk0b_pI/1AF.png";
smileyarr["47"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SYgrDRjtrkI/AAAAAAAAA7w/nlkVon2pwaw/1A5.png";
smileyarr["48"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SYgrEug41gI/AAAAAAAAA70/rySNkb7xiPs/003.png";
smileyarr["49"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SYgrFd2hH0I/AAAAAAAAA74/EXp8zeanpkI/001.png";
smileyarr["50"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SYgrGS1WH6I/AAAAAAAAA78/XxKeOnGA8Eo/000.png";
smileyarr["51"]="http://lh4.ggpht.com/_M0X9MzkzNXE/Sarahn9vp0I/AAAAAAAABHo/har0J0aTZ08/BA2.png";
smileyarr["52"]="http://lh5.ggpht.com/_M0X9MzkzNXE/Sarai5m_vJI/AAAAAAAABHs/DuPUSD5Z4cs/B68.gif";
smileyarr["53"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SarajpOo-PI/AAAAAAAABHw/DUqd_AoAiLM/B60.gif";
smileyarr["54"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SarakuRb7xI/AAAAAAAABH0/Eb8Vgp2P6fs/B5C.png";
smileyarr["55"]="http://lh4.ggpht.com/_M0X9MzkzNXE/Saral7h2c6I/AAAAAAAABH4/DFhCc9rjGrg/B56.gif";
smileyarr["56"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SaramouiofI/AAAAAAAABH8/12mZKjAZefw/B2B.gif";
smileyarr["57"]="http://lh5.ggpht.com/_M0X9MzkzNXE/Sarane59bgI/AAAAAAAABIA/-cm08ZYzU30/B26.png";
smileyarr["58"]="http://lh5.ggpht.com/_M0X9MzkzNXE/Saraoq78nhI/AAAAAAAABIE/32KtRlGp7nQ/B0E.png";
smileyarr["59"]="http://lh3.ggpht.com/_M0X9MzkzNXE/Sarap03hZqI/AAAAAAAABII/R2mLfxRuYdA/B0E.gif";
smileyarr["60"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SaraqvhE_7I/AAAAAAAABIM/K7BnQRZmw38/B0C.gif";
smileyarr["61"]="http://lh5.ggpht.com/_M0X9MzkzNXE/Sararg5sZNI/AAAAAAAABIQ/cR8HSbScJa8/B09.gif";
smileyarr["62"]="http://lh5.ggpht.com/_M0X9MzkzNXE/Sarasnk0w9I/AAAAAAAABIU/P8xKdqq7o0c/B06.gif";
smileyarr["63"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SaratjsAazI/AAAAAAAABIY/FOhgXX5dRqw/B05.gif";
smileyarr["64"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SarauWLMSUI/AAAAAAAABIc/Y5e4PAcuJAg/B04.gif";
smileyarr["65"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SaravAa7LWI/AAAAAAAABIg/OLdf3tbYMOc/983.png";
smileyarr["66"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SarawO4CItI/AAAAAAAABIk/7QQLEpInCzo/983.gif";
smileyarr["67"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SarawyWqujI/AAAAAAAABIo/sKIplhO3r9U/982.png";
smileyarr["68"]="http://lh6.ggpht.com/_M0X9MzkzNXE/Sarax44omJI/AAAAAAAABIs/xdh3_UjKld0/982.gif";
smileyarr["69"]="http://lh6.ggpht.com/_M0X9MzkzNXE/Saray8KkmjI/AAAAAAAABIw/8BxaLS3UQzg/981.png";
smileyarr["70"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SaraztwtHYI/AAAAAAAABI0/gwAqWXw_xWk/981.gif";
smileyarr["71"]="http://lh5.ggpht.com/_M0X9MzkzNXE/Sara0oRYrkI/AAAAAAAABI4/INjzKEnMHtk/980.gif";
smileyarr["72"]="http://lh6.ggpht.com/_M0X9MzkzNXE/Sara1-NcJmI/AAAAAAAABI8/HX_CZ3zZpgE/962.gif";
smileyarr["73"]="http://lh4.ggpht.com/_M0X9MzkzNXE/Sara2gSP_SI/AAAAAAAABJA/W7EGCfvW_Aw/81F.gif";
smileyarr["74"]="http://lh6.ggpht.com/_M0X9MzkzNXE/Sara4DnrCJI/AAAAAAAABJE/_Jb_uP5SSU4/81C.gif";
smileyarr["75"]="http://lh4.ggpht.com/_M0X9MzkzNXE/Sara5HUNgOI/AAAAAAAABJI/ihM0WIln7TY/814.gif";
smileyarr["76"]="http://lh6.ggpht.com/_M0X9MzkzNXE/Sara6IR3vNI/AAAAAAAABJM/W8Q4hJ7_EYk/813.gif";
smileyarr["77"]="http://lh3.ggpht.com/_M0X9MzkzNXE/Sara6-TRVkI/AAAAAAAABJQ/mj7nhEl7JRw/801.gif";
smileyarr["78"]="http://lh5.ggpht.com/_M0X9MzkzNXE/Sara7-ezQzI/AAAAAAAABJU/vhgg-MzI71I/800.gif";
smileyarr["79"]="http://lh3.ggpht.com/_M0X9MzkzNXE/Sara8vNKuwI/AAAAAAAABJY/ljU9Di5F3mQ/7E4.gif";
smileyarr["80"]="http://lh4.ggpht.com/_M0X9MzkzNXE/Sara9S4ULxI/AAAAAAAABJc/vd3rYasl_tk/7D1.gif";
smileyarr["81"]="http://lh4.ggpht.com/_M0X9MzkzNXE/Sara-eZkNrI/AAAAAAAABJg/QYhrhL008Hc/53B.gif";
smileyarr["82"]="http://lh6.ggpht.com/_M0X9MzkzNXE/Sara_Ag35kI/AAAAAAAABJk/yNMowV2U5GA/538.gif";
smileyarr["83"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SarbACmeSyI/AAAAAAAABJo/EKnSBkT5qVI/525.gif";
smileyarr["84"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SarbA-_aZWI/AAAAAAAABJs/ennx5Fd9d-w/517.gif";
smileyarr["85"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SarbBpRzcaI/AAAAAAAABJw/JOePrMG8sWs/510.gif";
smileyarr["86"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SarbCi0J4tI/AAAAAAAABJ0/U7dFo2TulA4/4F6.png";
smileyarr["87"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SarbDcLDnpI/AAAAAAAABJ4/wa5gfBvOv-E/4F4.png";
smileyarr["88"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SarbELgd8-I/AAAAAAAABJ8/Wcy8oU6vAFs/4F4.gif";
smileyarr["89"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SarbFCZSCwI/AAAAAAAABKA/a6CFh1bJ1bc/4F2.png";
smileyarr["90"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SarbFwaE0zI/AAAAAAAABKE/Zn61jTGqtTw/4F2.gif";
smileyarr["91"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SarbGnl8tiI/AAAAAAAABKI/noGScuy8iqs/4EF.gif";
smileyarr["92"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SarbHhXTS8I/AAAAAAAABKM/ETx3UjWM3b8/4B0.gif";
smileyarr["93"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SarbIq7kmcI/AAAAAAAABKQ/nbGjECnw720/369.gif";
smileyarr["94"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SarbJVdyKMI/AAAAAAAABKU/hM5as_hTBak/364.gif";
smileyarr["95"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SarbKYEBz_I/AAAAAAAABKY/jXmPxbZxPfQ/363.gif";
smileyarr["96"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SarbLbQxQsI/AAAAAAAABKc/2-x2LPBJ1yQ/362.gif";
smileyarr["97"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SarbMK404gI/AAAAAAAABKg/M_Ui9tshFGw/361.gif";
smileyarr["98"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SarbNN6RUeI/AAAAAAAABKk/eHygqUi06rI/360.gif";
smileyarr["99"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SarbN__BqqI/AAAAAAAABKo/tizrkbQcASU/35F.gif";
smileyarr["100"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SarbOnL27NI/AAAAAAAABKs/Dmqi0puAyig/35E.gif";
smileyarr["101"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SarbPi-VmGI/AAAAAAAABKw/T3epx-kG-mY/35D.png";
smileyarr["102"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SarbQm-KLII/AAAAAAAABK0/xz195SI3xu8/35D.gif";
smileyarr["103"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SarbRaX2xKI/AAAAAAAABK4/YAnl98e_jhI/35C.gif";
smileyarr["104"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SarbSZOmLGI/AAAAAAAABK8/Znc4-7hrkGY/349.gif";
smileyarr["105"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SarbT_7IeZI/AAAAAAAABLA/FHDLTai5zWE/347.gif";
smileyarr["106"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SarbUpv-epI/AAAAAAAABLE/woS8uZded5M/344.gif";
smileyarr["107"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SarbWKbRTaI/AAAAAAAABLI/3SoDHAbKjpM/343.gif";
smileyarr["108"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SarbWxJ3w6I/AAAAAAAABLM/WvIyYKtKfLg/342.gif";
smileyarr["109"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SarbXsATPkI/AAAAAAAABLQ/I68mrZZ5hGM/341.gif";
smileyarr["110"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SarbY1UpLdI/AAAAAAAABLU/WOS9WKgM4Pk/33F.gif";
smileyarr["111"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SarbZsLSPLI/AAAAAAAABLY/Dns_eCZpf7M/33E.gif";
smileyarr["112"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SarbbMsolrI/AAAAAAAABLc/LjxkJnrrTQQ/33D.gif";
smileyarr["113"]="http://lh3.ggpht.com/_M0X9MzkzNXE/Sarbb-it6WI/AAAAAAAABLg/EHK7YeAt7k8/33C.gif";
smileyarr["114"]="http://lh4.ggpht.com/_M0X9MzkzNXE/Sarbc1BWOtI/AAAAAAAABLk/MS7pIJsIeHA/33B.png";
smileyarr["115"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SarbdyUvPOI/AAAAAAAABLo/-wk1KYtGffY/33A.gif";
smileyarr["116"]="http://lh5.ggpht.com/_M0X9MzkzNXE/Sarbe09X3iI/AAAAAAAABLs/WfbzyBndEPM/338.gif";
smileyarr["117"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SarbgI1lbjI/AAAAAAAABLw/5Gbm2MH0IL4/333.gif";
smileyarr["118"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SarbhM57fcI/AAAAAAAABL0/EVehHDrky3g/332.gif";
smileyarr["119"]="http://lh4.ggpht.com/_M0X9MzkzNXE/Sarbh1fiqPI/AAAAAAAABL4/3ErCjoIQKzA/331.gif";
smileyarr["120"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SarbiqCUiaI/AAAAAAAABL8/NJcDMb8d7Dc/330.gif";
smileyarr["121"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SarbjpoRA5I/AAAAAAAABMA/ekWJ1g6g0Cc/32F.gif";
smileyarr["122"]="http://lh3.ggpht.com/_M0X9MzkzNXE/Sarbkzl5DzI/AAAAAAAABME/6e_suyYg650/32B.gif";
smileyarr["123"]="http://lh4.ggpht.com/_M0X9MzkzNXE/Sarbl-R-v3I/AAAAAAAABMI/KQEzff9X9Cs/329.gif";
smileyarr["124"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SarbmlckWtI/AAAAAAAABMM/G4YmymxpgCY/327.gif";
smileyarr["125"]="http://lh3.ggpht.com/_M0X9MzkzNXE/Sarbnu76hPI/AAAAAAAABMQ/GznyShSgtkY/326.gif";
smileyarr["126"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SarbpDQTL2I/AAAAAAAABMU/3p-yX25RVzk/324.gif";
smileyarr["127"]="http://lh3.ggpht.com/_M0X9MzkzNXE/Sarbqc9v_qI/AAAAAAAABMY/yRMCIaiMM4U/323.gif";
smileyarr["128"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SarbrEkRXII/AAAAAAAABMc/UXdj5-p_YEk/322.png";
smileyarr["129"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SarbsANAf6I/AAAAAAAABMg/Y5LM2RiSUsY/322.gif";
smileyarr["130"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SarbtG-0aYI/AAAAAAAABMk/9lp8K5b9hus/320.gif";
smileyarr["131"]="http://lh4.ggpht.com/_M0X9MzkzNXE/Sarbudrw5MI/AAAAAAAABMo/IpSYBlQh4kk/1E3.png";
smileyarr["132"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SarbvXsTwAI/AAAAAAAABMs/cZ7-ZMnrglY/1E3.gif";
smileyarr["133"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SarbwMjhppI/AAAAAAAABMw/ucHFU2N8eTM/1E0.gif";
smileyarr["134"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SarbxZ5yW3I/AAAAAAAABM0/3cO8_LEnmqk/1C4.gif";
smileyarr["135"]="http://lh3.ggpht.com/_M0X9MzkzNXE/Sarbymk2CsI/AAAAAAAABM4/w48QvVIzuk4/1B2.gif";
smileyarr["136"]="http://lh5.ggpht.com/_M0X9MzkzNXE/Sarbz9GT-UI/AAAAAAAABM8/mS9tVOkgTac/1AE.png";
smileyarr["137"]="http://lh4.ggpht.com/_M0X9MzkzNXE/Sarb0_E2PWI/AAAAAAAABNA/6EoxxzaGHBs/1A5.gif";
smileyarr["138"]="http://lh3.ggpht.com/_M0X9MzkzNXE/Sarb2GvAPsI/AAAAAAAABNE/L2TqpWLtFds/04D.gif";
smileyarr["139"]="http://lh5.ggpht.com/_M0X9MzkzNXE/Sarb3HZeO1I/AAAAAAAABNI/HlpFGLzuf2Y/03D.gif";
smileyarr["140"]="http://lh4.ggpht.com/_M0X9MzkzNXE/Sarb4Cvd-yI/AAAAAAAABNM/tfKlvabw9vk/03C.png";
smileyarr["141"]="http://lh5.ggpht.com/_M0X9MzkzNXE/Sarb5GxiGGI/AAAAAAAABNQ/2g65k0ASpu0/014.gif";
smileyarr["142"]="http://lh5.ggpht.com/_M0X9MzkzNXE/Sarb59BryHI/AAAAAAAABNU/XawMD21UyTQ/00E.png";
smileyarr["143"]="http://lh3.ggpht.com/_M0X9MzkzNXE/Sarb65m19XI/AAAAAAAABNY/x79Ur8zK918/004.png";
smileyarr["144"]="http://lh4.ggpht.com/_M0X9MzkzNXE/Sarb7rabTWI/AAAAAAAABNc/vw4QmCVt8dQ/003.gif";
smileyarr["145"]="http://lh5.ggpht.com/_M0X9MzkzNXE/Sarb8sdMnUI/AAAAAAAABNg/l5CrTl9shiU/002.png";
smileyarr["146"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SarcAvHF-PI/AAAAAAAABNk/TMYokZzcnac/002.gif";
smileyarr["147"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SarcBb-7AwI/AAAAAAAABNo/mmhNp7bd5_Q/001.gif";
smileyarr["148"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SarcDHUbbKI/AAAAAAAABNs/xpuCicsDRHs/000.gif";
	


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

//More Smileys could be found on http://www.blakut.com/2008/12/use-animated-smileys-to-make-orkutting.html
// Visit our official website www.blakut.com for regualr update on smileys and other orkut related stuffs.
//~~Happy Orkutting~~
// Regards--- Swashata
// Thanks to Ashu da again...

//////////////////
//Auto Updater///
////////////////
// Copyleft Michael Medley <medleymind@gmail.com>, All Wrongs Reserved
CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '41706', // Script id on Userscripts.org
 days: 1, // Days to wait between update checks
 name: /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],
 time: new Date().getTime() | 0,
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'http://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  headers: {
	  'User-agent': window.navigator.userAgent,
	    'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    this.xname=/\/\/\s*@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    if ( (this.xversion != this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated', this.time);
      GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
    } else if ( (this.xversion) && (this.xversion != this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated', 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call('return');});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated', this.time);
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated', this.time);
    }
  },
 check: function() {
if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
if ( (GM_getValue('updated', 0) != 'off') && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated', 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
    }
    }
};
if (self.location == top.location && GM_xmlhttpRequest) CheckScriptForUpdate.check();