// ==UserScript==
// @name         Yahoo & MSN Smilies in Orkut without Image Verification !
// @namespace    http://info.scrapur.com/
// @author		 Vaibhav Saran
// @description  Use Yahoo and MSN Smilies in Orkut Scrap book without orkut image verification. Script includes Yahoo and MSN Hidden Emotions also with their shortcut keys.!!
// @include      http://www.orkut.com/Scrapbook.aspx*
// @include      http://www.orkut.co.in/Scrapbook.aspx*
// @include      http://www.orkut.com.br/Scrapbook.aspx*

// ==/UserScript==

addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertEmotion(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<img src="+image+">";
}

function dip() {
	var emotion = new Array();	
	emotion["smile :)"]				="http://lh6.google.com/vikysaran/R9p7HrQdxKI/AAAAAAAAArc/QDBAwYdBs5o/s144/1.gif";
	emotion["sad :("]				="http://lh3.google.com/vikysaran/R9p7H7QdxLI/AAAAAAAAArk/NdM_AhOBgUo/s144/2.gif";
	emotion["winking ;)"]			="http://lh4.google.com/vikysaran/R95QTLQdzwI/AAAAAAAABBg/LelGFO3WVOw/s144/3.gif";
	emotion["big grin :D"]			="http://lh3.google.com/vikysaran/R9p7H7QdxNI/AAAAAAAAAr0/yFNsynoas2s/s144/4.gif";
	emotion["batting eyelashes ;;)"]="http://lh3.google.com/vikysaran/R9p7H7QdxOI/AAAAAAAAAr8/c-l2aXohnOo/s144/5.gif";
	emotion["big hug >:D<"]			="http://lh6.google.com/vikysaran/R9p7RrQdxPI/AAAAAAAAAsE/EYPabYLt24c/s144/6.gif";
	emotion["confused :-/"]			="http://lh6.google.com/vikysaran/R9p7RrQdxQI/AAAAAAAAAsM/3moZinmlAbA/s144/7.gif";
	emotion["love struck :x"]		="http://lh6.google.com/vikysaran/R9p7RrQdxRI/AAAAAAAAAsU/RQWsMf--W8c/s144/8.gif";
	emotion["blushing"]				="http://lh6.google.com/vikysaran/R9p7RrQdxSI/AAAAAAAAAsc/6aWZ-OQRRMQ/s144/9.gif";
	emotion["tongue :p"]			="http://lh4.google.com/vikysaran/R9p7SLQdxTI/AAAAAAAAAsk/0s4BnhqQcsI/s144/10.gif";
	emotion["kiss :-*"]				="http://lh4.google.com/vikysaran/R9p7cLQdxUI/AAAAAAAAAss/BmJSU-qZGjs/s144/11.gif";
	emotion["broken heart =(("]		="http://lh4.google.com/vikysaran/R9p7cLQdxVI/AAAAAAAAAs0/U8d_FTrFuxo/s144/12.gif";
	emotion["surprise :-o"]			="http://lh4.google.com/vikysaran/R9p7cLQdxWI/AAAAAAAAAs8/51E9fKAgdOE/s144/13.gif";
	emotion["angry x-("]			="http://lh5.google.com/vikysaran/R9p7cbQdxXI/AAAAAAAAAtE/DxoAVsw3CIw/s144/14.gif";
	emotion["smug :>"]				="http://lh5.google.com/vikysaran/R9p7cbQdxYI/AAAAAAAAAtM/W0ZrSB9i6U8/s144/15.gif";
	emotion["cool B-)"]				="http://lh6.google.com/vikysaran/R9p7prQdxZI/AAAAAAAAAtU/LdrqlLIZSrE/s144/16.gif";
	emotion["worried :-S"]			="http://lh3.google.com/vikysaran/R9p7p7QdxaI/AAAAAAAAAtc/Sa8j1C19Yg8/s144/17.gif";
	emotion["whew #:-S"]			="http://lh3.google.com/vikysaran/R9p7p7QdxbI/AAAAAAAAAtk/jGfmcCzmxXA/s144/18.gif";
	emotion["crying :(("]			="http://lh6.google.com/vikysaran/R9p7qrQdxdI/AAAAAAAAAt0/6AGWt-A31d0/s144/20.gif";
	emotion["laughing :))"]			="http://lh5.google.com/vikysaran/R9p71bQdxeI/AAAAAAAAAt8/qx34b1dMTwk/s144/21.gif";
	emotion["straight face :|"]		="http://lh6.google.com/vikysaran/R9p71rQdxfI/AAAAAAAAAuE/MSZ8DgTb7GE/s144/22.gif";
	emotion["raised eyebrow /:)"]	="http://lh6.google.com/vikysaran/R9p71rQdxgI/AAAAAAAAAuM/VSmWApA81tM/s144/23.gif";
	emotion["rolling on floor =))"]	="http://lh6.google.com/vikysaran/R9p71rQdxhI/AAAAAAAAAuU/U6tIPOUBf-s/s144/24.gif";
	emotion["angel O:-)"]			="http://lh6.google.com/vikysaran/R9p71rQdxiI/AAAAAAAAAuc/9cHK14BaHag/s144/25.gif";
	emotion["nerd :-B"]				="http://lh4.google.com/vikysaran/R9p8ALQdxjI/AAAAAAAAAuk/NeabZdKGSfA/s144/26.gif";
	emotion["talk to the hand =;"]	="http://lh5.google.com/vikysaran/R9p8AbQdxkI/AAAAAAAAAus/YAUIBRcNo_g/s144/27.gif";	
	emotion["sleepy I-)"]			="http://lh5.google.com/vikysaran/R9p8AbQdxlI/AAAAAAAAAu0/kjZmgfZPJm0/s144/28.gif";
	emotion["loser L-)"]			="http://lh5.google.com/vikysaran/R9p8AbQdxmI/AAAAAAAAAu8/gtIlGaHI54Y/s144/29.gif";
	emotion["sick :-&"]				="http://lh5.google.com/vikysaran/R9p8AbQdxnI/AAAAAAAAAvE/eHiaenW4x34/s144/30.gif";
	emotion["dont tell anyone :-$"]	="http://lh6.google.com/vikysaran/R9p8RrQdxpI/AAAAAAAAAvU/is-IFPGLIDw/s144/32.gif";
	emotion["not talking [-("]		="http://lh6.google.com/vikysaran/R9p8RrQdxqI/AAAAAAAAAvc/qkmBg_wZ-zI/s144/33.gif";
	emotion["clown :O)"]			="http://lh3.google.com/vikysaran/R9p8R7QdxrI/AAAAAAAAAvk/pRihnGvHumw/s144/34.gif";	
	emotion["silly 8-}"]			="http://lh3.google.com/vikysaran/R9p8R7QdxsI/AAAAAAAAAvs/WjlT6ykcvJU/s144/35.gif";
	emotion["party <:-P"]			="http://lh5.google.com/vikysaran/R9p8fbQdxtI/AAAAAAAAAv0/YeFa05NK_J4/s144/36.gif";
	emotion["yawn (:|"]				="http://lh5.google.com/vikysaran/R9p8fbQdxuI/AAAAAAAAAv8/By9MFkGLIzY/s144/37.gif";
	emotion["drooling =P~"]			="http://lh5.google.com/vikysaran/R9p8fbQdxvI/AAAAAAAAAwE/12z_AF1FCXE/s144/38.gif";
	emotion["thinking :-?"]			="http://lh5.google.com/vikysaran/R9p8fbQdxwI/AAAAAAAAAwM/Nj6JkTtPXHE/s144/39.gif";
	emotion["dooh #-o"]				="http://lh5.google.com/vikysaran/R9p8fbQdxxI/AAAAAAAAAwU/jij9B1qKW1g/s144/40.gif";
	emotion["applause =D>"]			="http://lh5.google.com/vikysaran/R9p8sbQdxzI/AAAAAAAAAwk/6SgJiNueBQ4/s144/41.gif";
	emotion["nailbiting :-SS"]		="http://lh5.google.com/vikysaran/R9p8sbQdx0I/AAAAAAAAAws/tuoeXXi3C3Y/s144/42.gif";
	emotion["hypnotized @-)"]		="http://lh6.google.com/vikysaran/R9p8srQdx1I/AAAAAAAAAw0/IexNNPiGu0M/s144/43.gif";
	emotion["liar :^o"]				="http://lh5.google.com/vikysaran/R9p8sbQdxyI/AAAAAAAAAwc/zdNgFwXN3io/s144/44.gif";
	emotion["waiting :-w"]			="http://lh6.google.com/vikysaran/R9p8srQdx2I/AAAAAAAAAw8/yf8zP21cOW0/s144/45.gif";
	emotion["sigh :-<"]				="http://lh4.google.com/vikysaran/R9p9GLQdx3I/AAAAAAAAAxE/rRciS9TXPo8/s144/46.gif";
	emotion["phbbbbt >:P"]			="http://lh4.google.com/vikysaran/R9p9GLQdx4I/AAAAAAAAAxM/2zkkAvBhISU/s144/47.gif";
	emotion["dont know "]			="http://lh3.google.com/vikysaran/R9p_K7QdyfI/AAAAAAAAA2E/g9vmwl67FZg/s144/86.gif";
	emotion["not listening"]		="http://lh3.google.com/vikysaran/R9p_K7QdygI/AAAAAAAAA2M/TRTLXEjEZrw/s144/87.gif";
	emotion["cowboy"]				="http://lh4.google.com/vikysaran/R9p9GLQdx5I/AAAAAAAAAxU/vdt5l8YsmMY/s144/48.gif";	
	emotion["puppy- :o3"]			="http://lh3.google.com/vikysaran/R9p_K7QdyhI/AAAAAAAAA2U/o-BVrDxbv1k/s144/88.gif";
	emotion["pig- :@)"]				="http://lh5.google.com/vikysaran/R9p9GbQdx6I/AAAAAAAAAxc/TwMEVe-E2KM/s144/49.gif";
	emotion["cow- 3:-O"]			="http://lh5.google.com/vikysaran/R9p9GbQdx7I/AAAAAAAAAxk/rbpCrCF_hM4/s144/50.gif";
	emotion["monkey- :(|)"]			="http://lh4.google.com/vikysaran/R9p9RLQdx8I/AAAAAAAAAxs/eb9zbKZuhX0/s144/51.gif";
	emotion["chicken- ~:>"]			="http://lh4.google.com/vikysaran/R9p9RLQdx9I/AAAAAAAAAx0/dR1qXfHTeno/s144/52.gif";
	emotion["rose- @};-"]			="http://lh5.google.com/vikysaran/R9p9RbQdx-I/AAAAAAAAAx8/hNEk7bLLUZM/s144/53.gif";
	emotion["good luck %%-"]		="http://lh5.google.com/vikysaran/R9p9RbQdx_I/AAAAAAAAAyE/XieurrKDcLQ/s144/54.gif";
	emotion["flag **=="]			="http://lh5.google.com/vikysaran/R9p9RbQdyAI/AAAAAAAAAyM/oFUL1C8XZpo/s144/55.gif";
	emotion["pumpkin (~~)"]			="http://lh4.google.com/vikysaran/R9p9fLQdyBI/AAAAAAAAAyU/mnwxPTeihDc/s144/56.gif";
	emotion["coffee ~O)"]			="http://lh4.google.com/vikysaran/R9p9fLQdyCI/AAAAAAAAAyc/w5P76NbimKU/s144/57.gif";
	emotion["idea *-:)"]			="http://lh4.google.com/vikysaran/R9p9fLQdyDI/AAAAAAAAAyk/1XldAWbUBUA/s144/58.gif";
	emotion["skull 8-X"]			="http://lh4.google.com/vikysaran/R9p9fLQdyEI/AAAAAAAAAys/5hJAqnFad6M/s144/59.gif";
	emotion["bug =:)"]				="http://lh4.google.com/vikysaran/R9p9fLQdyFI/AAAAAAAAAy0/KEsuIhgIjV0/s144/60.gif";
	emotion["alien >-)"]			="http://lh5.google.com/vikysaran/R9p9ubQdyGI/AAAAAAAAAy8/EfweMuk9Znw/s144/61.gif";
	emotion["frustrated :-L"]		="http://lh6.google.com/vikysaran/R9p9vrQdyHI/AAAAAAAAAzE/FqsfbzQIRmk/s144/62.gif";
	emotion["praying [-O<"]			="http://lh3.google.com/vikysaran/R9p9v7QdyII/AAAAAAAAAzM/anZsTPKIbEA/s144/63.gif";
	emotion["money eyes $-)"]		="http://lh3.google.com/vikysaran/R9p9v7QdyJI/AAAAAAAAAzU/SICgt9RM0P0/s144/64.gif";
	emotion["whistling"]			="http://lh3.google.com/vikysaran/R9p9v7QdyKI/AAAAAAAAAzc/wuc2EO0GZHs/s144/65.gif";
	emotion["shame on you [-X"]		="http://lh4.google.com/vikysaran/R9p-SLQdyQI/AAAAAAAAA0M/gnY2t6SFe7o/s144/66.gif";
	emotion["peace sign :)>-"]		="http://lh6.google.com/vikysaran/R9p-SrQdyRI/AAAAAAAAA0U/LBuIUSIhBxI/s144/67.gif";
	emotion["feeling beat up b-("]	="http://lh3.google.com/vikysaran/R9p987QdyLI/AAAAAAAAAzk/elkug2j5DYA/s144/71.gif";
	emotion["dancing \:D/"]			="http://lh3.google.com/vikysaran/R9p-S7QdyTI/AAAAAAAAA0k/pQmksFBR5yE/s144/69.gif";
	emotion["bring it on >:/"]		="http://lh4.google.com/vikysaran/R9p-TLQdyUI/AAAAAAAAA0s/Yy5oNWbSpQM/s144/70.gif";
	emotion["hee hee ;))"]			="http://lh3.google.com/vikysaran/R9p987QdyLI/AAAAAAAAAzk/elkug2j5DYA/s144/71.gif";
	emotion["chatterbox :-@"]		="http://lh4.google.com/vikysaran/R9p-lLQdyVI/AAAAAAAAA00/5_1rJ2xSJ9o/s144/76.gif";
	emotion["not worthy ^:)^"]		="http://lh4.google.com/vikysaran/R9p-lLQdyWI/AAAAAAAAA08/XnntCREgZPo/s144/77.gif";
	emotion["oh go on :-j"]			="http://lh4.google.com/vikysaran/R9p-lLQdyXI/AAAAAAAAA1E/d3a28O13czo/s144/78.gif";
	emotion["star (*)"]				="http://lh4.google.com/vikysaran/R9p-lLQdyYI/AAAAAAAAA1M/-AGVxlwJ41s/s144/79.gif";
	emotion["hiro o->"]				="http://lh3.google.com/vikysaran/R9p987QdyMI/AAAAAAAAAzs/ZzACfTH1P3s/s144/72.gif";
	emotion["billy o=>"]			="http://lh5.google.com/vikysaran/R9p99bQdyNI/AAAAAAAAAz0/NCTVedzw4RQ/s144/73.gif";
	emotion["april o-+"]			="http://lh3.google.com/vikysaran/R9p997QdyOI/AAAAAAAAAz8/mtBgcY85_2s/s144/74.gif";
	emotion["yin yang (%)"]			="http://lh3.google.com/vikysaran/R9p997QdyPI/AAAAAAAAA0E/6d-FUF093Q8/s144/75.gif";
	emotion["call me :-c"]			="http://lh4.google.com/vikysaran/R9p-4LQdyaI/AAAAAAAAA1c/m93xRYFJ8lY/s144/81.gif";
	emotion["on the phone 	:)]"]	="http://lh4.google.com/vikysaran/R9p-lLQdyZI/AAAAAAAAA1U/8co6zywMB60/s144/80.gif";
	emotion["at wits end ~X("]		="http://lh4.google.com/vikysaran/R9p-4LQdybI/AAAAAAAAA1k/o0T1qeCZkGM/s144/82.gif";	
	emotion["wave :-h"]				="http://lh4.google.com/vikysaran/R9p-4LQdycI/AAAAAAAAA1s/fCm4AK1ovP0/s144/83.gif";
	emotion["time out :-t"]			="http://lh5.google.com/vikysaran/R9p-4bQdydI/AAAAAAAAA10/ZPtMfGWXYqQ/s144/84.gif";
	emotion["daydreaming 8->"]		="http://lh5.google.com/vikysaran/R9p-4bQdyeI/AAAAAAAAA18/pa23GEU81U0/s144/85.gif";

	emotion["Smile :-)"]			="http://lh3.google.com/vikysaran/R94z_7QdynI/AAAAAAAAA3o/kky4vHmfTng/s144/1.gif";
	emotion["Open-mouthed :-D"]		="http://lh3.google.com/vikysaran/R94z_7QdyoI/AAAAAAAAA3w/EulZiD_B3Yw/s144/2.gif";
	emotion[" Surprised :-O"]		="http://lh3.google.com/vikysaran/R94z_7QdypI/AAAAAAAAA34/LJICn7JI9Vo/s144/3.gif";
	emotion["Tongue out :-P"]		="http://lh3.google.com/vikysaran/R94z_7QdyqI/AAAAAAAAA4A/F0iMy2pFSFM/s144/4.gif";
	emotion["Wink ;-)"]				="http://lh3.google.com/vikysaran/R94z_7QdyrI/AAAAAAAAA4I/865drmSZeiI/s144/5.gif";
	emotion["Sad :-("]				="http://lh4.google.com/vikysaran/R940hLQdysI/AAAAAAAAA4Q/TZO5aKixRQI/s144/6.gif";
	emotion["Confused :-S"]			="http://lh5.google.com/vikysaran/R940hbQdytI/AAAAAAAAA4Y/mG6tgOw3SjE/s144/7.gif";
	emotion["Disappointed :-|"]		="http://lh5.google.com/vikysaran/R940hbQdyuI/AAAAAAAAA4g/2VCBJ05FTOY/s144/8.gif";
	emotion["Embarrassed :-$"]		="http://lh5.google.com/vikysaran/R940hbQdywI/AAAAAAAAA4w/h7pOPaKmNdU/s144/10.gif";
	emotion["Hot (H) "]				="http://lh6.google.com/vikysaran/R940-rQdyxI/AAAAAAAAA44/CvUjNWvuxGY/s144/11.gif";
	emotion["Angry :-@ "]			="http://lh6.google.com/vikysaran/R940-rQdyyI/AAAAAAAAA5A/mows56uVdu0/s144/12.gif";
	emotion["msn12"]				="http://lh3.google.com/vikysaran/R95Bf7QdzsI/AAAAAAAABAw/K87LMBn-VqQ/s144/13.gif";
	emotion["Devil (6)"]			="http://lh3.google.com/vikysaran/R95Bf7QdztI/AAAAAAAABA4/16Jvk-vpqwc/s144/14.gif";
	emotion["Dont tell anyone :-#"]	="http://lh6.google.com/vikysaran/R940-rQdy1I/AAAAAAAAA5Y/R_5vFnZN1iA/s144/15.gif";	
	emotion["Baring teeth 8o| "]	="http://lh4.google.com/vikysaran/R941kLQdy2I/AAAAAAAAA54/jREtpwYTBlQ/s144/16.gif";
	emotion["Nerd 8-| "]			="http://lh3.google.com/vikysaran/R95Bf7QdzuI/AAAAAAAABBA/mWhEhDgmvQY/s144/17.gif";
	emotion["Sarcastic ^o)"]		="http://lh4.google.com/vikysaran/R941kLQdy4I/AAAAAAAAA6I/czMb-w_1z_Q/s144/18.gif";
	emotion["Secret telling :-*"]	="http://lh4.google.com/vikysaran/R941kLQdy5I/AAAAAAAAA6Q/ss0lwoWvHNc/s144/19.gif";
	emotion["Sick +o( "]			="http://lh4.google.com/vikysaran/R941kLQdy6I/AAAAAAAAA6Y/dikAn_AERiY/s144/20.gif";
	emotion["I dont know :^)"]		="http://lh3.google.com/vikysaran/R94157Qdy7I/AAAAAAAAA6g/czUvRF7yKSk/s144/21.gif";
	emotion["Thinking *-)"]			="http://lh3.google.com/vikysaran/R94157Qdy8I/AAAAAAAAA6o/IxV6qMoI2ys/s144/22.gif";
	emotion["Party <:o)"]			="http://lh3.google.com/vikysaran/R94157Qdy9I/AAAAAAAAA6w/n6u2zV1vrh0/s144/23.gif";
	emotion["Eye-rolling 8-)"]		="http://lh3.google.com/vikysaran/R94157Qdy-I/AAAAAAAAA64/VHziHNE2Z9k/s144/24.gif";
	emotion["Sleepy |-)"]			="http://lh3.google.com/vikysaran/R94157Qdy_I/AAAAAAAAA7A/dyLtW8QaCw8/s144/25.gif";
	emotion["Coffee cup (C)"]		="http://lh3.google.com/vikysaran/R944G7QdzFI/AAAAAAAAA7w/8ekz-EyROzw/s144/26.gif";
	emotion["Thumbs up (Y)"]		="http://lh4.google.com/vikysaran/R944HLQdzGI/AAAAAAAAA74/SmjpJ6ETiMI/s144/27.gif";
	emotion["Thumbs down (N)"]		="http://lh4.google.com/vikysaran/R944HLQdzHI/AAAAAAAAA8A/f1zCYfO5uvw/s144/28.gif";
	emotion["Beer mug (B)"]			="http://lh3.google.com/vikysaran/R94337QdzEI/AAAAAAAAA7o/h5rCKh-2mcM/s144/29.gif";
	emotion["Martini glass (D)"]	="http://lh5.google.com/vikysaran/R9433bQdzAI/AAAAAAAAA7I/UR4_gmoeFq4/s144/30.gif";
	emotion["Birthday cake (^)"]	="http://lh3.google.com/vikysaran/R944e7QdzKI/AAAAAAAAA8Y/B_v8jBEmYRs/s144/36.gif";
	emotion["Red heart (L)"]		="http://lh3.google.com/vikysaran/R944e7QdzLI/AAAAAAAAA8g/2yO9tGvRsfA/s144/37.gif";
	emotion["Broken heart (U)"]		="http://lh4.google.com/vikysaran/R944fLQdzMI/AAAAAAAAA8o/ELiCVERgTxo/s144/38.gif";
	emotion["Red lips (K)"]			="http://lh4.google.com/vikysaran/R944fLQdzNI/AAAAAAAAA8w/ghSsELQKnBM/s144/39.gif";
	emotion["Gift with a bow (G)"]	="http://lh4.google.com/vikysaran/R944fLQdzOI/AAAAAAAAA84/aASd7df9ca8/s144/40.gif";
	emotion["Red rose (F)"]			="http://lh4.google.com/vikysaran/R944wLQdzPI/AAAAAAAAA9A/MWfOQMIfIvM/s144/41.gif";
	emotion["Wilted rose (W)"]		="http://lh4.google.com/vikysaran/R944wLQdzQI/AAAAAAAAA9I/eGca7yvFrZA/s144/42.gif";
	emotion["Camera (P)"]			="http://lh5.google.com/vikysaran/R944wbQdzRI/AAAAAAAAA9Q/HEoDPtg7Yj4/s144/43.gif";
	emotion["Cat face (@)"]			="http://lh6.google.com/vikysaran/R944wrQdzTI/AAAAAAAAA9g/QK66v3KEjvw/s144/45.gif";
	emotion["Dog face (&)"]			="http://lh4.google.com/vikysaran/R945TLQdzUI/AAAAAAAAA9o/FnBxIyCoRoc/s144/46.gif";
	emotion["Phone receiver (T)"]	="http://lh5.google.com/vikysaran/R945TbQdzVI/AAAAAAAAA9w/Cb0PicrdO_k/s144/47.gif";
	emotion["Light bulb (I)"]		="http://lh6.google.com/vikysaran/R945TrQdzWI/AAAAAAAAA94/870qEBxh7Ck/s144/48.gif";
	emotion["Note (8"]				="http://lh6.google.com/vikysaran/R945TrQdzXI/AAAAAAAAA-A/71ZojJXffJ4/s144/49.gif";
	emotion["Sleeping moon (S)"]	="http://lh6.google.com/vikysaran/R945TrQdzYI/AAAAAAAAA-I/nqxNcupCVd4/s144/50.gif";
	emotion["Star (*)"]				="http://lh6.google.com/vikysaran/R948orQdzZI/AAAAAAAAA-Q/Li0PRwQDa78/s144/51.gif";
	emotion["E-mail (E)"]			="http://lh6.google.com/vikysaran/R948orQdzaI/AAAAAAAAA-Y/G9gBgRJu7X4/s144/52.gif";
	emotion["Clock (O) "]			="http://lh6.google.com/vikysaran/R948orQdzbI/AAAAAAAAA-g/NK-soe6yM9M/s144/53.gif";
	emotion["Soccer ball (so)"]		="http://lh6.google.com/vikysaran/R949ZrQdziI/AAAAAAAAA_Y/cfXL8LMvz24/s144/60.gif";
	emotion["Auto (au)"]			="http://lh5.google.com/vikysaran/R9492bQdzjI/AAAAAAAAA_g/EoarqlSMbq0/s144/61.gif";
	emotion["Airplane (ap)"]		="http://lh6.google.com/vikysaran/R9492rQdzkI/AAAAAAAAA_o/Jq5IbqC_RMw/s144/62.gif";
	emotion["Umbrella (um)"]		="http://lh6.google.com/vikysaran/R9492rQdzlI/AAAAAAAAA_w/pOIypIod-fk/s144/63.gif";
	emotion["Island (ip)"]			="http://lh6.google.com/vikysaran/R9492rQdzmI/AAAAAAAAA_4/KgPWQGhvt70/s144/64.gif";
	emotion["Computer (co)"]		="http://lh6.google.com/vikysaran/R9492rQdznI/AAAAAAAABAA/i7l6-vUG9G4/s144/65.gif";
	emotion["Mobile Phone (mp)"]	="http://lh5.google.com/vikysaran/R94-4bQdzoI/AAAAAAAABAI/Y6t8KAXOvyc/s144/66.gif";
	emotion["Stormy cloud (st)"]	="http://lh5.google.com/vikysaran/R94-4bQdzpI/AAAAAAAABAQ/BLiUMOQOVZ8/s144/67.gif";
	emotion["Lightning (li)"]		="http://lh5.google.com/vikysaran/R94-4bQdzqI/AAAAAAAABAY/d3yU2V86ovg/s144/68.gif";
	emotion["Money (mo)"]			="http://lh5.google.com/vikysaran/R94-4bQdzrI/AAAAAAAABAg/jxLQF9SDbMU/s144/70.gif";
	emotion["http://info.scrapur.com/"]="http://lh5.google.com/vikysaran/R95OfbQdzvI/AAAAAAAABBU/8wsPkIuuhsg/s144/me.gif";
	
	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++)
	{
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		for(title in emotion)
		{
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+emotion[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertEmotion, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);
