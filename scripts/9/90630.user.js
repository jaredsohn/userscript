// ==UserScript==
// @name          Orkut Smileys by Nitin
// @namespace     http://www.orkut.co.in/Main#Profile?rl=fpp&uid=4983666459138311410
// @author	  Nitin
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
// ==/UserScript==

/*********************************************************************
//smileys appear below the reply box as well.
//Made the smileys just for fun and thought to share with you all..!!
***********************************************************/

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
smileyarr["1"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGYiZJdugI/AAAAAAAAAX0/SpJ3yE2xs0U/smiley_96.gif";
smileyarr["2"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGYjO2TiTI/AAAAAAAAAX4/LE7S-_C-12E/smiley_95.gif";
smileyarr["3"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGYj21xNKI/AAAAAAAAAX8/EUjTD0tsk-M/smiley_94.gif";
smileyarr["4"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGYkqcL1hI/AAAAAAAAAYA/8Zp1FZD-1tM/smiley_93.gif";
smileyarr["5"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGYlLeiAiI/AAAAAAAAAYE/y19tZF_dTxo/smiley_92.gif";
smileyarr["6"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGYlwJJ2bI/AAAAAAAAAYI/RGvzC3QZ2Bc/smiley_91.gif";
smileyarr["7"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGYmXptPFI/AAAAAAAAAYM/GEitt4aruUI/smiley_90.gif";
smileyarr["8"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGYnNsWyYI/AAAAAAAAAYQ/T4zgA2jZutg/smiley_89.gif";
smileyarr["9"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGYn0Vp7zI/AAAAAAAAAYU/W4y-bn13yNo/smiley_88.gif";
smileyarr["10"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGYogo_x9I/AAAAAAAAAYY/10IS7CWhhEw/smiley_87.gif";
smileyarr["11"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGYpPh_mfI/AAAAAAAAAYc/qh3Z-5XmEuM/smiley_86.gif";
smileyarr["12"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGYp9U9xrI/AAAAAAAAAYg/QllnUfmP6z4/smiley_85.gif";
smileyarr["13"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGYql9UXuI/AAAAAAAAAYk/Sodo0ZChaF8/smiley_84.gif";
smileyarr["14"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGYrW83PEI/AAAAAAAAAYo/V4Imwz2Ir1U/smiley_83.gif";
smileyarr["15"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGYsHrTdSI/AAAAAAAAAYs/Kq0gy4aO6PA/smiley_82.gif";
smileyarr["16"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGYtSY9bsI/AAAAAAAAAYw/GBb_QyHuRMw/smiley_81.gif";
smileyarr["17"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGYu9y1yeI/AAAAAAAAAY0/4gls5e5y1hQ/smiley_80.gif";
smileyarr["18"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGYv94-PtI/AAAAAAAAAY4/srrLd9qfqiY/smiley_79.gif";
smileyarr["19"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGYxKa_gDI/AAAAAAAAAY8/iHCkJYUpdh0/smiley_78.gif";
smileyarr["21"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGYyDZLNlI/AAAAAAAAAZA/Jw0iFQzUen0/smiley_77.gif";
smileyarr["22"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGYzFiOIpI/AAAAAAAAAZE/d7iz5OgbE94/smiley_76.gif";
smileyarr["23"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGY0JX0mZI/AAAAAAAAAZI/6dDHhPk_T5A/smiley_75.gif";
smileyarr["24"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGY1Hy_fyI/AAAAAAAAAZM/LDCW9XiF0cU/smiley_74.gif";
smileyarr["25"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGY18XhW_I/AAAAAAAAAZQ/IeZXalW5F-0/smiley_73.gif";
smileyarr["26"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGY27a174I/AAAAAAAAAZU/CpfLhu9vbV8/smiley_72.gif";
smileyarr["27"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGY3-wQ3jI/AAAAAAAAAZY/022PyResiBw/smiley_71.gif";
smileyarr["28"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGY44WKRLI/AAAAAAAAAZc/Uon6NRK6BfQ/smiley_70.gif";
smileyarr["29"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGY53eInOI/AAAAAAAAAZg/LofojkD0tLI/smiley_69.gif";
smileyarr["30"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGY6g90M3I/AAAAAAAAAZk/_9bANfDJ9wo/smiley_68.gif";
smileyarr["31"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGY7bt7ZNI/AAAAAAAAAZo/HXfyu2ZMudg/smiley_67.gif";
smileyarr["32"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGY8edH8oI/AAAAAAAAAZs/wf5bvoyiAuM/smiley_66.gif";
smileyarr["33"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGY9xI_ygI/AAAAAAAAAZw/ZBgIgk-pFMA/smiley_65.gif";
smileyarr["34"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGY_NrlXOI/AAAAAAAAAZ0/-BPls2VGPo4/smiley_64.gif";
smileyarr["35"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGY_1m6AUI/AAAAAAAAAZ4/GBroo569li4/smiley_63.gif";
smileyarr["36"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGZA9qbHaI/AAAAAAAAAZ8/qh-irc2GcHw/smiley_62.gif";
smileyarr["37"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGZBiDrsdI/AAAAAAAAAaA/qMTSxUdK_lc/smiley_61.gif";
smileyarr["38"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGZCj0icQI/AAAAAAAAAaE/fWaXYOnOmsg/smiley_60.gif";
smileyarr["39"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGZDfBv1zI/AAAAAAAAAaI/5TzjJRIENmw/smiley_59.gif";
smileyarr["40"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGZD1U9GYI/AAAAAAAAAaM/XLEBVcUOoT0/smiley_58.gif";
smileyarr["41"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGZE5-fv3I/AAAAAAAAAaQ/hZpKukDCoCk/smiley_57.gif";
smileyarr["42"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGZF1UsKzI/AAAAAAAAAaU/Wxe1hYNVI3A/smiley_56.gif";
smileyarr["43"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGZG19Cy0I/AAAAAAAAAaY/41hV4YKtuT8/smiley_55.gif";
smileyarr["44"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGZIPRWONI/AAAAAAAAAac/fkub6x1HHjw/smiley_54.gif";
smileyarr["45"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGZI2xDGdI/AAAAAAAAAag/e5hfIhVItGs/smiley_53.gif";
smileyarr["46"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGZJ9MZrNI/AAAAAAAAAak/ZuT5noC6VQM/smiley_52.gif";
smileyarr["47"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGZKuvgolI/AAAAAAAAAao/3ICVcjbmHn8/smiley_51.gif";
smileyarr["49"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGZL-rdTEI/AAAAAAAAAas/6U1fGLYLL-4/smiley_50.gif";
smileyarr["50"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGZNSHaYYI/AAAAAAAAAaw/f_obe9FKx8g/smiley_49.gif";
smileyarr["51"]="http://lh4.ggpht.com/_RL4nDcz13AU/TBaGDEWNEKI/AAAAAAAABGE/R-8J7qh7hbo/Angry.gif";
smileyarr["52"]="http://lh5.ggpht.com/_RL4nDcz13AU/TBaGDUHhpmI/AAAAAAAABGI/q2mr_oFQBgk/Arrow.gif";
smileyarr["53"]="http://lh4.ggpht.com/_RL4nDcz13AU/TBaGDvGbbnI/AAAAAAAABGM/2YZsRcuNnmY/Bhoot.gif";
smileyarr["54"]="http://lh4.ggpht.com/_RL4nDcz13AU/TBaGDx7GElI/AAAAAAAABGQ/D6MahEbM1yQ/Crying.gif";
smileyarr["55"]="http://lh6.ggpht.com/_RL4nDcz13AU/TBaGEUsWFtI/AAAAAAAABGU/mqKvN69YaNE/Devdas.gif";
smileyarr["56"]="http://lh3.ggpht.com/_RL4nDcz13AU/TBaGVaeXsNI/AAAAAAAABGY/oXDTc17FbJ4/Devil.gif";
smileyarr["57"]="http://lh3.ggpht.com/_RL4nDcz13AU/TBaGVnPWc2I/AAAAAAAABGc/H68PP35mrkI/FloorLaughing.gif";
smileyarr["58"]="http://lh5.ggpht.com/_RL4nDcz13AU/TBaGV3TTdqI/AAAAAAAABGg/L9ztEo9Y4CI/Laughing.gif";
smileyarr["59"]="http://lh4.ggpht.com/_RL4nDcz13AU/TBaGWDPdBuI/AAAAAAAABGk/sam-zysR7wM/Please.gif";
smileyarr["60"]="http://lh6.ggpht.com/_RL4nDcz13AU/TBaGWRnyvMI/AAAAAAAABGo/G0Jw16GfIYM/Rude.gif";
smileyarr["61"]="http://lh5.ggpht.com/_RL4nDcz13AU/TBaJvBJKJII/AAAAAAAABGw/4vZbV28uT1s/Searching.gif";
smileyarr["62"]="http://lh4.ggpht.com/_RL4nDcz13AU/TBaJvWLQfHI/AAAAAAAABG0/Q2_mr0jg1KE/Silly.gif";
smileyarr["63"]="http://lh4.ggpht.com/_RL4nDcz13AU/TBaJvcWgy9I/AAAAAAAABG4/aphBQmfR1lU/Stunned.gif";
smileyarr["64"]="http://lh5.ggpht.com/_RL4nDcz13AU/TBaJvvBQk3I/AAAAAAAABG8/epFEV_V3zdA/Winking.gif";
smileyarr["65"]="http://lh5.ggpht.com/_RL4nDcz13AU/TBaWQoS8hCI/AAAAAAAABHQ/EGPq7uPX12U/Boring.gif";
smileyarr["66"]="http://lh5.ggpht.com/_RL4nDcz13AU/TBaWQ-IHtTI/AAAAAAAABHU/D5s9dJ1K_CQ/ElectricShock.gif";
smileyarr["67"]="http://lh6.ggpht.com/_RL4nDcz13AU/TBaWRFKrwsI/AAAAAAAABHY/6eyCYIuXQgo/Harry%20Potter.gif";
smileyarr["68"]="http://lh5.ggpht.com/_RL4nDcz13AU/TBaWRUXFjhI/AAAAAAAABHc/v1PXDNEUOrE/Heart.gif";
smileyarr["69"]="http://lh4.ggpht.com/_RL4nDcz13AU/TBaWRXOwr-I/AAAAAAAABHg/otBSY3o0kMc/HeartGiving.gif";
smileyarr["70"]="http://lh4.ggpht.com/_RL4nDcz13AU/TBaWkJ4lwmI/AAAAAAAABHk/KFtTH2Qu7r8/In%20Love.gif";
smileyarr["71"]="http://lh5.ggpht.com/_RL4nDcz13AU/TBaWkxsjXpI/AAAAAAAABHo/Mw6PglMptkw/Jack.gif";
smileyarr["72"]="http://lh3.ggpht.com/_RL4nDcz13AU/TBaWlU2nscI/AAAAAAAABHs/JlcZjTeB1Yg/Jinni.gif";
smileyarr["73"]="http://lh5.ggpht.com/_RL4nDcz13AU/TBaWlrrctpI/AAAAAAAABHw/4BMjZFuFyIA/Jungli.gif";
smileyarr["74"]="http://lh5.ggpht.com/_RL4nDcz13AU/TBaWmVuFGrI/AAAAAAAABH0/2QJvVw0rC-Y/Kiss.gif";
smileyarr["75"]="http://lh4.ggpht.com/_RL4nDcz13AU/TBaW2fzIRpI/AAAAAAAABH4/tGhWA1zknWE/Lutera.gif";
smileyarr["76"]="http://lh3.ggpht.com/_RL4nDcz13AU/TBaW2-Upe9I/AAAAAAAABH8/WGPYa81jbBo/No.gif";
smileyarr["77"]="http://lh6.ggpht.com/_RL4nDcz13AU/TBaW3tOp4MI/AAAAAAAABIA/DZ2XVReLWws/Rose%20Giving.gif";
smileyarr["78"]="http://lh4.ggpht.com/_RL4nDcz13AU/TBaW4ehIkVI/AAAAAAAABIE/KZfyYlZtMwQ/Shooter.gif";
smileyarr["79"]="http://lh3.ggpht.com/_RL4nDcz13AU/TBaW5GKIq5I/AAAAAAAABII/LDY1Y-hujJ4/ThumpsUp.gif";
smileyarr["80"]="http://lh4.ggpht.com/_RL4nDcz13AU/TBaXAZxcd8I/AAAAAAAABIM/i6nJXksOg84/Wizard.gif";
smileyarr["81"]="http://lh5.ggpht.com/_RL4nDcz13AU/TBaXBp60XRI/AAAAAAAABIQ/pj10jwxATVY/Yes.gif";
smileyarr["82"]="http://lh5.ggpht.com/_RL4nDcz13AU/TFxrGex7ZvI/AAAAAAAABPc/79qTITmfhs4/bad-guy-emoticons-smileys1.gif";
smileyarr["83"]="http://lh6.ggpht.com/_RL4nDcz13AU/TFxrGq-bXzI/AAAAAAAABPg/sBvqDyBSO6w/bad-guy-emoticons-smileys13.gif";
smileyarr["84"]="http://lh6.ggpht.com/_RL4nDcz13AU/TFxrGhWbfQI/AAAAAAAABPk/dQhEhTwNZbg/bad-guy-emoticons-smileys14.gif";
smileyarr["85"]="http://lh5.ggpht.com/_RL4nDcz13AU/TFxrGlJm3zI/AAAAAAAABPo/CApKoVGgxAo/bad-guy-emoticons-smileys15.gif";
smileyarr["86"]="http://lh6.ggpht.com/_RL4nDcz13AU/TFxrP_HaRMI/AAAAAAAABPs/8jayEpEHPn4/bo.gif";
smileyarr["87"]="http://lh4.ggpht.com/_RL4nDcz13AU/TFxrQIA_GGI/AAAAAAAABPw/TjRkjyXxmlU/bomber.gif";
smileyarr["89"]="http://lh4.ggpht.com/_RL4nDcz13AU/TFxrQC0XUCI/AAAAAAAABP0/v0DHc08PN0k/crazy.gif";
smileyarr["90"]="http://lh4.ggpht.com/_RL4nDcz13AU/TFxrQEVjYlI/AAAAAAAABP4/5cnxiF-iQV8/eating.gif";
smileyarr["91"]="http://lh6.ggpht.com/_RL4nDcz13AU/TFxrQZUQ70I/AAAAAAAABP8/mFc0B94ST5M/embarrass.gif";
smileyarr["92"]="http://lh3.ggpht.com/_RL4nDcz13AU/TFxrdIDud_I/AAAAAAAABQA/TtQIaW8SB6c/emot0.gif";
smileyarr["93"]="http://lh6.ggpht.com/_RL4nDcz13AU/TFxrdOK1KPI/AAAAAAAABQE/nuzUiE-9SnE/emot18.gif";
smileyarr["94"]="http://lh6.ggpht.com/_RL4nDcz13AU/TFxrdX3oAiI/AAAAAAAABQM/kxLVETA_-aQ/emot103.gif";
smileyarr["95"]="http://lh3.ggpht.com/_RL4nDcz13AU/TFxrdYdBoOI/AAAAAAAABQQ/7kSNH8RMrC0/emot106.gif";
smileyarr["96"]="http://lh3.ggpht.com/_RL4nDcz13AU/TFxrxlGwfVI/AAAAAAAABQo/bxfSv1V8n38/emot134.gif";
smileyarr["97"]="http://lh3.ggpht.com/_RL4nDcz13AU/TFxrx0CL8fI/AAAAAAAABQ0/7K2hWp2TlgA/emot137.gif";
smileyarr["98"]="http://lh4.ggpht.com/_RL4nDcz13AU/TFxryMbz-_I/AAAAAAAABQ4/C8isS-DxlMo/emot138.gif";
smileyarr["100"]="http://lh3.ggpht.com/_RL4nDcz13AU/TFxr_vJM1bI/AAAAAAAABRI/n6ZMkVngD1Y/emot148.gif";
smileyarr["101"]="http://lh4.ggpht.com/_RL4nDcz13AU/TFxr_84QC-I/AAAAAAAABRM/kCfYf3pBJ9U/emot150.gif";
smileyarr["102"]="http://lh4.ggpht.com/_RL4nDcz13AU/TFxsW0LcmeI/AAAAAAAABRQ/uAWOTlaHnrQ/emot155.gif";
smileyarr["103"]="http://lh3.ggpht.com/_RL4nDcz13AU/TFxsW8bj4fI/AAAAAAAABRU/1gGLCSA-C0c/emot156.gif";
smileyarr["104"]="http://lh5.ggpht.com/_RL4nDcz13AU/TFxsXL-gWPI/AAAAAAAABRY/sVBk-b5-MqI/emot163.gif";
smileyarr["105"]="http://lh4.ggpht.com/_RL4nDcz13AU/TFxsXV5GNeI/AAAAAAAABRc/dLFYjJpo02s/emot176.gif";
smileyarr["106"]="http://lh3.ggpht.com/_RL4nDcz13AU/TFxsXWnV7NI/AAAAAAAABRg/NhFfOhgD5mE/emot180.gif";
smileyarr["107"]="http://lh5.ggpht.com/_RL4nDcz13AU/TFxss61d-nI/AAAAAAAABRk/DJTSDM5Wu94/fall.gif";
smileyarr["108"]="http://lh5.ggpht.com/_RL4nDcz13AU/TFxstNP4KvI/AAAAAAAABRs/TS8itqq3OwU/funny-smileys11.gif";
smileyarr["109"]="http://lh5.ggpht.com/_RL4nDcz13AU/TFxstO98CaI/AAAAAAAABRw/2PiTpe_h5Kk/grin.gif";
smileyarr["111"]="http://lh6.ggpht.com/_RL4nDcz13AU/TFxstRIgyCI/AAAAAAAABR0/FZSg3o4iODs/happy-wink.gif";
smileyarr["112"]="http://lh4.ggpht.com/_RL4nDcz13AU/TFxtQAITf4I/AAAAAAAABR4/FyZq_PPKhHY/hi.gif";
smileyarr["113"]="http://lh5.ggpht.com/_RL4nDcz13AU/TFxtQVYDzaI/AAAAAAAABSA/5VhrVifaenY/hot-and-sweaty.gif";
smileyarr["114"]="http://lh6.ggpht.com/_RL4nDcz13AU/TFxtQR58IMI/AAAAAAAABSI/8jSh7QoDqwE/ignored.gif";
smileyarr["115"]="http://lh3.ggpht.com/_RL4nDcz13AU/TFxtkFaG0cI/AAAAAAAABSQ/zMLeE6xvT5U/karaoke.gif";
smileyarr["116"]="http://lh6.ggpht.com/_RL4nDcz13AU/TFxtkV74q_I/AAAAAAAABSU/UAq0uXQT6LY/knight.gif";
smileyarr["117"]="http://lh4.ggpht.com/_RL4nDcz13AU/TFxtkmjx-eI/AAAAAAAABSc/icfmJXW8JoI/libra.gif";
smileyarr["118"]="http://lh5.ggpht.com/_RL4nDcz13AU/TFxtkVE3g_I/AAAAAAAABSY/ON0iYNCJEko/laugh.gif";
smileyarr["119"]="http://lh3.ggpht.com/_RL4nDcz13AU/TFxt1UqdNmI/AAAAAAAABSg/VI3FlX5d2Oc/mood-emoticons-smileys1.gif";
smileyarr["120"]="http://lh5.ggpht.com/_RL4nDcz13AU/TFxt1h9aj0I/AAAAAAAABSo/2O7BwNspVmw/mood-emoticons-smileys3.gif";
smileyarr["121"]="http://lh3.ggpht.com/_RL4nDcz13AU/TFxt1wiPS4I/AAAAAAAABSs/yfWQqM_xM7U/mood-emoticons-smileys7.gif";
smileyarr["122"]="http://lh4.ggpht.com/_RL4nDcz13AU/TFxuGEMfdTI/AAAAAAAABS0/zTheElckZRQ/muscular.gif";
smileyarr["123"]="http://lh6.ggpht.com/_RL4nDcz13AU/TFxuGUlkRFI/AAAAAAAABS4/XylmpcYmEmE/no-1.gif";
smileyarr["124"]="http://lh5.ggpht.com/_RL4nDcz13AU/TFxuGSqD9vI/AAAAAAAABTA/1QN29ZRGerI/not-now.gif";
smileyarr["125"]="http://lh4.ggpht.com/_RL4nDcz13AU/TFxuGemWvfI/AAAAAAAABTE/rnjAYBNUf8o/oh-stop-it.gif";
smileyarr["126"]="http://lh5.ggpht.com/_RL4nDcz13AU/TFxuON9MXVI/AAAAAAAABTI/z-vvX8NBSl8/seesaw.gif";
smileyarr["127"]="http://lh4.ggpht.com/_RL4nDcz13AU/TFxuOcoKq3I/AAAAAAAABTM/xt09dfeREvY/singing.gif";
smileyarr["128"]="http://lh6.ggpht.com/_RL4nDcz13AU/TFxuOVL4Q7I/AAAAAAAABTQ/rW3ZttVKknM/tongue-out.gif";
smileyarr["129"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEX0R0INNI/AAAAAAAAASs/l9TWX68e6zU/AddEmoticons04279.gif";
smileyarr["130"]="http://lh5.ggpht.com/_RL4nDcz13AU/TKSVHCUcxtI/AAAAAAAABdQ/J4NV8IoZlhU/wet.gif";
smileyarr["131"]="http://lh4.ggpht.com/_RL4nDcz13AU/TKSVHYIebZI/AAAAAAAABdU/_3r-ZE_7K3k/wet1.gif";
smileyarr["132"]="http://lh4.ggpht.com/_RL4nDcz13AU/TKSVHrIh3AI/AAAAAAAABdY/a8ccFb2DyjE/wet2.gif";
smileyarr["133"]="http://lh6.ggpht.com/_RL4nDcz13AU/TKSVImLv0pI/AAAAAAAABdg/ubzW-aCRml0/wet4.gif";
smileyarr["134"]="http://lh4.ggpht.com/_RL4nDcz13AU/TKSVdfm2lYI/AAAAAAAABdk/MTOMEOvVsV4/wet5.gif";
smileyarr["135"]="http://lh3.ggpht.com/_RL4nDcz13AU/TKSVd63zC3I/AAAAAAAABdw/I8lZ22FUan8/wet8.gif";
smileyarr["136"]="http://lh6.ggpht.com/_RL4nDcz13AU/TKSVeGb9TuI/AAAAAAAABd0/lQbAXCDWpIY/wet9.gif";
smileyarr["137"]="http://lh4.ggpht.com/_RL4nDcz13AU/TKSVnmnpGgI/AAAAAAAABd4/8d1C4iTZmoQ/wet10.gif";
smileyarr["138"]="http://lh5.ggpht.com/_RL4nDcz13AU/TKSVn3gJIMI/AAAAAAAABd8/-dDLUrJZfuo/wet11.gif";
smileyarr["139"]="http://lh6.ggpht.com/_RL4nDcz13AU/S5O4-rRk2bI/AAAAAAAAApE/5KDxrWJG6LE/144.gif";
smileyarr["140"]="http://lh4.ggpht.com/_RL4nDcz13AU/S5O3p9SxSPI/AAAAAAAAAok/4UtYA1VSgWE/158.gif";
smileyarr["141"]="http://lh4.ggpht.com/_RL4nDcz13AU/S3Uny3trijI/AAAAAAAAANY/DIoTfQUxPDg/16.gif";
smileyarr["142"]="http://lh4.ggpht.com/_RL4nDcz13AU/S3UmzV457fI/AAAAAAAAAL4/CvFhChXnWGw/1.gif";
smileyarr["143"]="http://lh6.ggpht.com/_RL4nDcz13AU/TKSVdhZvK1I/AAAAAAAABdo/-TACO0LmseA/wet6.gif";


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
