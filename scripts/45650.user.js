scr_meta=<><![CDATA[
// ==UserScript==
// @name	Monkey Smileys By Sreejan
// @version	1.00
// @author	Sreejan Sur :P
// @namespace	TEAM BLAKUT
// @description	Use the animated smileys(for Orkut only) in your ScrapBook and HTML community Forums. Just click on the smiley to insert. Enjoy...
// @include        http://*.orkut.*/*Scrapbook*
// @include        http://*.orkut.*/*CommMsgs*
// @include        http://*.orkut.*/*CommMsgPost*
// ==/UserScript==
]]></>;

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
smileyarr["AddEmoticons12699"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO-DxXKGkI/AAAAAAAAAwI/MvEB6jrpmk8/AddEmoticons12699.gif";
smileyarr["AddEmoticons12698"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO-FU7mbkI/AAAAAAAAAwM/5PQ2g66FUUA/AddEmoticons12698.gif";
smileyarr["AddEmoticons12697"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO-GNNmw9I/AAAAAAAAAwQ/dL1rT7N6mxo/AddEmoticons12697.gif";
smileyarr["AddEmoticons12696"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO-HFlJvqI/AAAAAAAAAwU/2VJlEWBMLtU/AddEmoticons12696.gif";
smileyarr["AddEmoticons12695"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdO-H47psaI/AAAAAAAAAwY/IavR7HwsNGE/AddEmoticons12695.gif";
smileyarr["AddEmoticons12694"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO-Ix-wDxI/AAAAAAAAAwc/qWnDWN8czWM/AddEmoticons12694.gif";
smileyarr["AddEmoticons12693"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdO-Jjnqs2I/AAAAAAAAAwg/NF0Es2hro6o/AddEmoticons12693.gif";
smileyarr["AddEmoticons12692"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO-KvHMbkI/AAAAAAAAAwk/O5tIS4kHwYU/AddEmoticons12692.gif";
smileyarr["AddEmoticons12691"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO-LW02kEI/AAAAAAAAAwo/J3iFmk5lf7E/AddEmoticons12691.gif";
smileyarr["AddEmoticons12690"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO-L2HE56I/AAAAAAAAAws/3U-wgfxp8wc/AddEmoticons12690.gif";
smileyarr["AddEmoticons1269"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO-MvjE31I/AAAAAAAAAww/2HqZ0yjYqZY/AddEmoticons1269.gif";
smileyarr["AddEmoticons12689"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO-NnhAUNI/AAAAAAAAAw0/bjAmXt2O3K4/AddEmoticons12689.gif";
smileyarr["AddEmoticons12688"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO-OMiKVDI/AAAAAAAAAw4/fXM70Q7F0vQ/AddEmoticons12688.gif";
smileyarr["AddEmoticons12687"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdO-O9fh6vI/AAAAAAAAAw8/4o4CX7ZE_Og/AddEmoticons12687.gif";
smileyarr["AddEmoticons12686"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO-PQBKA7I/AAAAAAAAAxA/MdYd6gdSciM/AddEmoticons12686.gif";
smileyarr["AddEmoticons12685"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO-QPj2lXI/AAAAAAAAAxE/wlyV8ac9R-c/AddEmoticons12685.gif";
smileyarr["AddEmoticons12684"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO-QzBkTeI/AAAAAAAAAxI/nXROZK7zCzM/AddEmoticons12684.gif";
smileyarr["AddEmoticons12683"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdO-RcWzl3I/AAAAAAAAAxM/_MQmtF_nolI/AddEmoticons12683.gif";
smileyarr["AddEmoticons12682"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO-SJHn94I/AAAAAAAAAxQ/CDjv2egKvzQ/AddEmoticons12682.gif";
smileyarr["AddEmoticons12681"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO-VPTXYII/AAAAAAAAAxU/JF_a8roG6nc/AddEmoticons12681.gif";
smileyarr["AddEmoticons12680"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO-XiFMyrI/AAAAAAAAAxY/oOrE_4MG-Yc/AddEmoticons12680.gif";
smileyarr["AddEmoticons1268"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO-YfSyoMI/AAAAAAAAAxc/4aTn32SP9yw/AddEmoticons1268.gif";
smileyarr["AddEmoticons12679"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO-Zd6-MfI/AAAAAAAAAxg/pmanrMnN8aQ/AddEmoticons12679.gif";
smileyarr["AddEmoticons12678"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO-Z5RGALI/AAAAAAAAAxk/q9vjuD4_X4A/AddEmoticons12678.gif";
smileyarr["AddEmoticons12677"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO-bKGhYpI/AAAAAAAAAxo/TkuvR0as5EQ/AddEmoticons12677.gif";
smileyarr["AddEmoticons12676"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO-cYeo2JI/AAAAAAAAAxs/0y0ZbfAlfpw/AddEmoticons12676.gif";
smileyarr["AddEmoticons12675"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO-dlsfugI/AAAAAAAAAxw/h3yKwKwqFIc/AddEmoticons12675.gif";
smileyarr["AddEmoticons12674"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO-e4m0FyI/AAAAAAAAAx0/74FBl6pCkBQ/AddEmoticons12674.gif";
smileyarr["AddEmoticons12673"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO-f0d-J5I/AAAAAAAAAx4/MBWYYfXVCrk/AddEmoticons12673.gif";
smileyarr["AddEmoticons12672"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO-gjbMSMI/AAAAAAAAAx8/YSoC79ZCoCU/AddEmoticons12672.gif";
smileyarr["AddEmoticons12671"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO-huPYEzI/AAAAAAAAAyA/5O7fZ5sEeoU/AddEmoticons12671.gif";
smileyarr["AddEmoticons12670"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdO-iZtDnlI/AAAAAAAAAyE/5zvVzOkFgHA/AddEmoticons12670.gif";
smileyarr["AddEmoticons1267"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdO-jBu0WnI/AAAAAAAAAyI/TBzCPguWiBQ/AddEmoticons1267.gif";
smileyarr["AddEmoticons12669"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO-kKD_YRI/AAAAAAAAAyM/C_Uhv0RXA9c/AddEmoticons12669.gif";
smileyarr["AddEmoticons12668"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdO-k-VJscI/AAAAAAAAAyQ/AaYy40hymlE/AddEmoticons12668.gif";
smileyarr["AddEmoticons12667"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO-l-BSG6I/AAAAAAAAAyU/D4H2Cv-9Jss/AddEmoticons12667.gif";
smileyarr["AddEmoticons12666"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO-mpNboMI/AAAAAAAAAyY/9Cz2msaNrU8/AddEmoticons12666.gif";
smileyarr["AddEmoticons12665"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO-ncdAymI/AAAAAAAAAyc/yNg6ySiRS64/AddEmoticons12665.gif";
smileyarr["AddEmoticons12664"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO-oHWy8VI/AAAAAAAAAyg/svueQhvymdY/AddEmoticons12664.gif";
smileyarr["AddEmoticons12663"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO-o9US9FI/AAAAAAAAAyk/OdcxYVvJKeE/AddEmoticons12663.gif";
smileyarr["AddEmoticons12662"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO-qEfFVjI/AAAAAAAAAyo/hkr0OedKUCY/AddEmoticons12662.gif";
smileyarr["AddEmoticons12661"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO-rNoaBXI/AAAAAAAAAys/QQt8BTX36pg/AddEmoticons12661.gif";
smileyarr["AddEmoticons12660"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO-r7bbE9I/AAAAAAAAAyw/_SQHjPB2MTI/AddEmoticons12660.gif";
smileyarr["AddEmoticons1266"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdO-snE2wYI/AAAAAAAAAy0/a_IJ1vdgr9c/AddEmoticons1266.gif";
smileyarr["AddEmoticons12659"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO-tqOw9cI/AAAAAAAAAy4/jAmXHwSs6k4/AddEmoticons12659.gif";
smileyarr["AddEmoticons12658"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdO-uCcsAxI/AAAAAAAAAy8/Ps6v2JjukNE/AddEmoticons12658.gif";
smileyarr["AddEmoticons12657"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO-w8SmzQI/AAAAAAAAAzA/LG2qRO6eRec/AddEmoticons12657.gif";
smileyarr["AddEmoticons12656"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO-xcv6ThI/AAAAAAAAAzE/1KmBpwcV0oQ/AddEmoticons12656.gif";
smileyarr["AddEmoticons12655"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO-zmXAWtI/AAAAAAAAAzI/PO9rPHieoYM/AddEmoticons12655.gif";
smileyarr["AddEmoticons12654"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO-0rpBZnI/AAAAAAAAAzM/gkKK4yHr5EY/AddEmoticons12654.gif";
smileyarr["AddEmoticons12653"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO-2Wn6txI/AAAAAAAAAzQ/AtwzRa962rs/AddEmoticons12653.gif";
smileyarr["AddEmoticons12652"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO-348k4hI/AAAAAAAAAzU/_jPqhiYaiTE/AddEmoticons12652.gif";
smileyarr["AddEmoticons12651"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO-6gtgeQI/AAAAAAAAAzY/STSBW7bbhKw/AddEmoticons12651.gif";
smileyarr["AddEmoticons12650"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO-7qZHTaI/AAAAAAAAAzc/Lo4j74Ywsc4/AddEmoticons12650.gif";
smileyarr["AddEmoticons1265"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO-88U4gVI/AAAAAAAAAzg/pbZ6BamO6bs/AddEmoticons1265.gif";
smileyarr["AddEmoticons12649"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO-9lib5QI/AAAAAAAAAzk/4aXe_EcHFrg/AddEmoticons12649.gif";
smileyarr["AddEmoticons12648"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO--qLX-KI/AAAAAAAAAzo/U9J-mTJE6w0/AddEmoticons12648.gif";
smileyarr["AddEmoticons12647"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO-_XW4FNI/AAAAAAAAAzs/NG-M5pNke90/AddEmoticons12647.gif";
smileyarr["AddEmoticons12646"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdO_A3JJe9I/AAAAAAAAAzw/aYAtIqjHpMg/AddEmoticons12646.gif";
smileyarr["AddEmoticons12645"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO_ByqwOoI/AAAAAAAAAz0/xU0OOIYag2c/AddEmoticons12645.gif";
smileyarr["AddEmoticons12644"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO_Cl-7iSI/AAAAAAAAAz4/3dHKGxxED1E/AddEmoticons12644.gif";
smileyarr["AddEmoticons12643"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdO_DiXCadI/AAAAAAAAAz8/3LUOtMLi8Ps/AddEmoticons12643.gif";
smileyarr["AddEmoticons12642"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO_EbFwwtI/AAAAAAAAA0A/OggHNy4GMhs/AddEmoticons12642.gif";
smileyarr["AddEmoticons12641"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO_F-BjnyI/AAAAAAAAA0E/fql19MUpVWc/AddEmoticons12641.gif";
smileyarr["AddEmoticons12640"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO_IOjBMBI/AAAAAAAAA0I/iJ8UCxzQSo0/AddEmoticons12640.gif";
smileyarr["AddEmoticons1264"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO_I0FWAPI/AAAAAAAAA0M/nZn5f3GBGzw/AddEmoticons1264.gif";
smileyarr["AddEmoticons12639"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO_J4Wg1II/AAAAAAAAA0Q/1nfVNrXz8ak/AddEmoticons12639.gif";
smileyarr["AddEmoticons12638"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO_K9l4viI/AAAAAAAAA0U/vRDoCVwjxdw/AddEmoticons12638.gif";
smileyarr["AddEmoticons12637"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdO_MUyXCsI/AAAAAAAAA0Y/gzJtCvJlOaM/AddEmoticons12637.gif";
smileyarr["AddEmoticons12636"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO_MwYk0uI/AAAAAAAAA0c/T5N9Wy_T_OQ/AddEmoticons12636.gif";
smileyarr["AddEmoticons12635"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdO_Noc-4SI/AAAAAAAAA0g/zKx31Pw2fMQ/AddEmoticons12635.gif";
smileyarr["AddEmoticons12634"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO_O50AKzI/AAAAAAAAA0k/HvxFuzx4bsg/AddEmoticons12634.gif";
smileyarr["AddEmoticons12633"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO_P5pDkdI/AAAAAAAAA0o/uzK5mWCOePk/AddEmoticons12633.gif";
smileyarr["AddEmoticons12632"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO_QsSU1WI/AAAAAAAAA0s/YkvN0E3Q8FQ/AddEmoticons12632.gif";
smileyarr["AddEmoticons12631"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO_RFyL5zI/AAAAAAAAA0w/G0ZSQo28LHQ/AddEmoticons12631.gif";
smileyarr["AddEmoticons12630"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO_R6tT6kI/AAAAAAAAA00/QGozAWL0sgE/AddEmoticons12630.gif";
smileyarr["AddEmoticons1263"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO_S27DtzI/AAAAAAAAA04/W4sxuxE7CwQ/AddEmoticons1263.gif";
smileyarr["AddEmoticons12629"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO_TcNR6EI/AAAAAAAAA08/nhImQAxPNxg/AddEmoticons12629.gif";
smileyarr["AddEmoticons12628"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO_UFQOBqI/AAAAAAAAA1A/jxXDmpLc2N8/AddEmoticons12628.gif";
smileyarr["AddEmoticons12627"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO_UtUFK-I/AAAAAAAAA1E/C2Co2R_sVAw/AddEmoticons12627.gif";
smileyarr["AddEmoticons12626"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO_VRhwyUI/AAAAAAAAA1I/ULDVDwoFPqE/AddEmoticons12626.gif";
smileyarr["AddEmoticons12625"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO_V-BO8ZI/AAAAAAAAA1M/1OZY1LyOui8/AddEmoticons12625.gif";
smileyarr["AddEmoticons12624"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO_WraEn6I/AAAAAAAAA1Q/wIyPNSsvinY/AddEmoticons12624.gif";
smileyarr["AddEmoticons12623"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO_XEGVKaI/AAAAAAAAA1U/RJDH4RQsC30/AddEmoticons12623.gif";
smileyarr["AddEmoticons12622"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO_Xu_Td1I/AAAAAAAAA1Y/4fOchx91YFY/AddEmoticons12622.gif";
smileyarr["AddEmoticons12621"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO_YTouSHI/AAAAAAAAA1c/h6z2_07dXYw/AddEmoticons12621.gif";
smileyarr["AddEmoticons12620"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO_ZZ4F_AI/AAAAAAAAA1g/w1Pfa_HqoN4/AddEmoticons12620.gif";
smileyarr["AddEmoticons1262"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO_aLIB8bI/AAAAAAAAA1k/n2wKoyhFjMQ/AddEmoticons1262.gif";
smileyarr["AddEmoticons12619"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO_avPnkvI/AAAAAAAAA1o/ebb2jFxrU3w/AddEmoticons12619.gif";
smileyarr["AddEmoticons12618"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO_bbQy52I/AAAAAAAAA1s/YK_MIEY2kk8/AddEmoticons12618.gif";
smileyarr["AddEmoticons12617"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO_bwwr7gI/AAAAAAAAA1w/h8l_d3X9yxA/AddEmoticons12617.gif";
smileyarr["AddEmoticons126164"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO_cSnOfbI/AAAAAAAAA10/LHARcD7wfDU/AddEmoticons126164.gif";
smileyarr["AddEmoticons126163"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO_dHQ7KxI/AAAAAAAAA14/kNgiLwBTi1Q/AddEmoticons126163.gif";
smileyarr["AddEmoticons126162"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO_dtl1BqI/AAAAAAAAA18/bkNz1MDur0Q/AddEmoticons126162.gif";
smileyarr["AddEmoticons126161"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdO_eFmo7jI/AAAAAAAAA2A/S487wSLdHIg/AddEmoticons126161.gif";
smileyarr["AddEmoticons126160"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO_exaOgpI/AAAAAAAAA2E/0O8k66XODrI/AddEmoticons126160.gif";
smileyarr["AddEmoticons12616"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO_frsEZvI/AAAAAAAAA2I/cHyIwHf4ti4/AddEmoticons12616.gif";
smileyarr["AddEmoticons126159"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO_g8Ze_zI/AAAAAAAAA2M/qsbxJPcoJ7Q/AddEmoticons126159.gif";
smileyarr["AddEmoticons126158"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO_hURQhBI/AAAAAAAAA2Q/hmCU8Oonyso/AddEmoticons126158.gif";
smileyarr["AddEmoticons126157"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO_iKxO1LI/AAAAAAAAA2U/POONGxygbKw/AddEmoticons126157.gif";
smileyarr["AddEmoticons126156"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdO_jUrnY2I/AAAAAAAAA2Y/o0flWNdIFHE/AddEmoticons126156.gif";
smileyarr["AddEmoticons126155"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO_j-7ThMI/AAAAAAAAA2c/lRftCDxFQ-s/AddEmoticons126155.gif";
smileyarr["AddEmoticons126154"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO_kqsMyXI/AAAAAAAAA2g/iP-E9eTKGms/AddEmoticons126154.gif";
smileyarr["AddEmoticons126153"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO_lUq6dcI/AAAAAAAAA2k/jJlE4o-m1FE/AddEmoticons126153.gif";
smileyarr["AddEmoticons126152"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdO_mWPHgGI/AAAAAAAAA2o/7SOPt3gTKyU/AddEmoticons126152.gif";
smileyarr["AddEmoticons126151"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdO_nHnsMXI/AAAAAAAAA2s/LiAxNSEckOc/AddEmoticons126151.gif";
smileyarr["AddEmoticons126150"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO_n9uKgVI/AAAAAAAAA2w/7K5plozL-TE/AddEmoticons126150.gif";
smileyarr["AddEmoticons12615"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO_oavmFjI/AAAAAAAAA20/zR6vje_XDYY/AddEmoticons12615.gif";
smileyarr["AddEmoticons126149"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO_pVR6OlI/AAAAAAAAA24/6AdArtEccuc/AddEmoticons126149.gif";
smileyarr["AddEmoticons126148"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO_qHg2z3I/AAAAAAAAA28/babH23UWV4o/AddEmoticons126148.gif";
smileyarr["AddEmoticons126147"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdO_qzwBYYI/AAAAAAAAA3A/rH5PKQLaw6I/AddEmoticons126147.gif";
smileyarr["AddEmoticons126146"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO_s7wnBpI/AAAAAAAAA3E/uUy4YvBZD-0/AddEmoticons126146.gif";
smileyarr["AddEmoticons126145"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO_ti4ERaI/AAAAAAAAA3I/yWtdokT81_o/AddEmoticons126145.gif";
smileyarr["AddEmoticons126144"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO_ui6V8lI/AAAAAAAAA3M/NK6tKYCqJdQ/AddEmoticons126144.gif";
smileyarr["AddEmoticons126143"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO_vLHJpSI/AAAAAAAAA3Q/vuxjFSiIPDg/AddEmoticons126143.gif";
smileyarr["AddEmoticons126142"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO_wJlpVBI/AAAAAAAAA3U/hrNzDtApheU/AddEmoticons126142.gif";
smileyarr["AddEmoticons126141"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO_w6smoII/AAAAAAAAA3Y/Db8mLrq7MAQ/AddEmoticons126141.gif";
smileyarr["AddEmoticons126140"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO_xjWXe_I/AAAAAAAAA3c/Op93Cw3qHwA/AddEmoticons126140.gif";
smileyarr["AddEmoticons12614"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdO_ye-jkAI/AAAAAAAAA3g/zKdiRIuyfSQ/AddEmoticons12614.gif";
smileyarr["AddEmoticons126139"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO_zB65DQI/AAAAAAAAA3k/0uEbCM1Tx5g/AddEmoticons126139.gif";
smileyarr["AddEmoticons126138"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO_0AYfs8I/AAAAAAAAA3o/w1QlL2ioNfc/AddEmoticons126138.gif";
smileyarr["AddEmoticons126137"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO_0hF5iQI/AAAAAAAAA3s/dbhLY_-yS5M/AddEmoticons126137.gif";
smileyarr["AddEmoticons126136"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO_1VU8O9I/AAAAAAAAA3w/AGX_HKkaXEw/AddEmoticons126136.gif";
smileyarr["AddEmoticons126135"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO_2Ghud9I/AAAAAAAAA30/S4-vN9bG-h0/AddEmoticons126135.gif";
smileyarr["AddEmoticons126134"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO_3OhyH4I/AAAAAAAAA34/Gz36H-vD8VQ/AddEmoticons126134.gif";
smileyarr["AddEmoticons126133"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO_4JJ74UI/AAAAAAAAA38/WZ8mYnOx8qg/AddEmoticons126133.gif";
smileyarr["AddEmoticons126132"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO_5lAsTmI/AAAAAAAAA4A/Oe00-hBSNV8/AddEmoticons126132.gif";
smileyarr["AddEmoticons126131"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdO_7QC6NdI/AAAAAAAAA4E/yeYPEx2kIck/AddEmoticons126131.gif";
smileyarr["AddEmoticons126130"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO_8zyD5eI/AAAAAAAAA4I/JwLTPb5Aa_s/AddEmoticons126130.gif";
smileyarr["AddEmoticons12613"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdO_97_H-zI/AAAAAAAAA4M/ASENl8Rkic4/AddEmoticons12613.gif";
smileyarr["AddEmoticons126129"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdO_-akUJKI/AAAAAAAAA4Q/HLy7_lq4QJ4/AddEmoticons126129.gif";
smileyarr["AddEmoticons126128"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPABhnXQrI/AAAAAAAAA4U/mj88GSZRBQE/AddEmoticons126128.gif";
smileyarr["AddEmoticons126127"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdPACTm9zGI/AAAAAAAAA4Y/3Cbs1eMMwEU/AddEmoticons126127.gif";
smileyarr["AddEmoticons126126"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdPADW2GbmI/AAAAAAAAA4c/dnckLJNKqOE/AddEmoticons126126.gif";
smileyarr["AddEmoticons126125"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdPAD0kjeeI/AAAAAAAAA4g/F9ptzGr_XJU/AddEmoticons126125.gif";
smileyarr["AddEmoticons126124"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPAFOvluGI/AAAAAAAAA4k/4laMOW758fo/AddEmoticons126124.gif";
smileyarr["AddEmoticons126123"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPAGUckkBI/AAAAAAAAA4o/8NFhy05_N58/AddEmoticons126123.gif";
smileyarr["AddEmoticons126122"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdPAHmQUetI/AAAAAAAAA4s/k4U25aHB-TQ/AddEmoticons126122.gif";
smileyarr["AddEmoticons126121"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdPAIF7UPtI/AAAAAAAAA4w/Lu1SpyVVlUE/AddEmoticons126121.gif";
smileyarr["AddEmoticons126120"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPAJ-UaX-I/AAAAAAAAA40/VE7squjxitw/AddEmoticons126120.gif";
smileyarr["AddEmoticons12612"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdPAKy20DlI/AAAAAAAAA44/8vKuzyxU7dQ/AddEmoticons12612.gif";
smileyarr["AddEmoticons126119"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdPAL0447_I/AAAAAAAAA48/xFXH2JR6JM8/AddEmoticons126119.gif";
smileyarr["AddEmoticons126118"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPAPNDdvxI/AAAAAAAAA5A/71vgTQImEDE/AddEmoticons126118.gif";
smileyarr["AddEmoticons126117"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdPAQX6StXI/AAAAAAAAA5E/aGfHLsPgbsQ/AddEmoticons126117.gif";
smileyarr["AddEmoticons126116"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdPAQ6c_HCI/AAAAAAAAA5I/v8EfzxlZPFQ/AddEmoticons126116.gif";
smileyarr["AddEmoticons126115"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPARhB30bI/AAAAAAAAA5M/lQaIXqa5MYo/AddEmoticons126115.gif";
smileyarr["AddEmoticons126114"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdPASLYKMsI/AAAAAAAAA5Q/HF0yBC8aP7Q/AddEmoticons126114.gif";
smileyarr["AddEmoticons126113"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPASh6HNtI/AAAAAAAAA5U/jOg8Y9C_nX4/AddEmoticons126113.gif";
smileyarr["AddEmoticons126112"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdPATdfBG7I/AAAAAAAAA5Y/3od4Xj-LBI8/AddEmoticons126112.gif";
smileyarr["AddEmoticons126111"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdPAUK92MlI/AAAAAAAAA5c/BWcCf9bmex4/AddEmoticons126111.gif";
smileyarr["AddEmoticons126110"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPAVaf0a6I/AAAAAAAAA5g/3jyx-82NYEw/AddEmoticons126110.gif";
smileyarr["AddEmoticons12611"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdPAWccnVaI/AAAAAAAAA5k/GmP-KhvwMSk/AddEmoticons12611.gif";
smileyarr["AddEmoticons126109"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdPAXS5akyI/AAAAAAAAA5o/yFyS34LlGfY/AddEmoticons126109.gif";
smileyarr["AddEmoticons126108"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPAbGN96GI/AAAAAAAAA5s/2pMrW8MeWiY/AddEmoticons126108.gif";
smileyarr["AddEmoticons126107"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPAhKGhr_I/AAAAAAAAA5w/XMa36JcDTa0/AddEmoticons126107.gif";
smileyarr["AddEmoticons126106"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdPAhjtKHJI/AAAAAAAAA50/vRU6pmjdaps/AddEmoticons126106.gif";
smileyarr["AddEmoticons126105"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdPAicN6b8I/AAAAAAAAA54/y1LhFdZzvYM/AddEmoticons126105.gif";
smileyarr["AddEmoticons126104"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPAi-DWm8I/AAAAAAAAA58/E3E37cV1FNs/AddEmoticons126104.gif";
smileyarr["AddEmoticons126103"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPAjReIEzI/AAAAAAAAA6A/1PevP1FGMVI/AddEmoticons126103.gif";
smileyarr["AddEmoticons126102"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdPAkL7Kb0I/AAAAAAAAA6E/qAChaDL4otg/AddEmoticons126102.gif";
smileyarr["AddEmoticons126101"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPAlCPNysI/AAAAAAAAA6I/RP9CmxMIEb8/AddEmoticons126101.gif";
smileyarr["AddEmoticons126100"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdPAl1gInAI/AAAAAAAAA6M/UfS63GyvPDw/AddEmoticons126100.gif";
smileyarr["AddEmoticons12610"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdPAmwGHSAI/AAAAAAAAA6Q/oZswl4CRh4w/AddEmoticons12610.gif";
smileyarr["AddEmoticons1261"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdPAnYXR6pI/AAAAAAAAA6U/KbfSb6Q-fMQ/AddEmoticons1261.gif";
	

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

// Auto Updator
CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '45650', // Script id on Userscripts.org
 days: 2, // Days to wait between update checks

 // Don't edit after this line, unless you know what you're doing ;-)
 name: /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],
 time: new Date().getTime() | 0,
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
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
