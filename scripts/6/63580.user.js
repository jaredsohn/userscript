// ==UserScript==
// @name           Yahoo & Other Smileys (By-HB)
// @namespace     http://www.orkut.co.in/Main#Profile?uid=563787369546797333
// @author	HB
// @description   Made this just for fun :D (please respect the creator of this smiley)..
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
// ==/UserScript==

/********************************************************
//smileys appear below the reply box as well.
//Made the smileys just for fun and thought to share with you all..!!
*********************************************************/

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
	smileyarr["lol"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/S58fHkzoTRI/AAAAAAAAA_o/yCpmHNIscRo/s800/face%20lol.gif";
	smileyarr["kiss"]="http://lh4.ggpht.com/_PWF52rZHFNI/SQnJGPXy1UI/AAAAAAAAAoI/x32OpQamynY/37kiss.gif";
	smileyarr["kiss2"]="http://lh5.google.com/fenil.rulez/SCKf2aghQ6I/AAAAAAAAAHM/6MhueuDt_Es/11.gif";
	smileyarr["kiss3"]="http://lh5.google.com/vikysaran/SNxsnVWLfZI/AAAAAAAABKs/28AVres2usM/s144/11.gif";
	smileyarr["kiss4"]="http://lh4.ggpht.com/welcome2click/SKlet_D_L-I/AAAAAAAABZk/8PsyUTyju90/s400/11.png";
	smileyarr["kiss5"]="http://lh5.ggpht.com/_PWF52rZHFNI/SQnFCdmWr9I/AAAAAAAAAhw/kYt8vffaZdE/9red.cgi.gif";
	smileyarr["In Love"]="http://lh3.ggpht.com/_PWF52rZHFNI/SQnFXz5COJI/AAAAAAAAAiI/6B1TFhTgdks/12red.cgi.gif";
	smileyarr["hug"]="http://lh4.google.com/vikysaran/SNxsYNWbWUI/AAAAAAAABKE/P45UD91psh4/s144/6.gif";
	smileyarr["hug_dude"]="http://lh5.ggpht.com/_PWF52rZHFNI/SQnJAKNnFRI/AAAAAAAAAn4/41gGlOQsxcI/35hug_dude.gif";
	smileyarr["hug_girl"]="http://lh6.ggpht.com/_PWF52rZHFNI/SQnJGCCsfUI/AAAAAAAAAoA/ngR04dBEtyU/36hug_girl.gif";
	smileyarr["rose"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuJuGmrFoI/AAAAAAAAAOk/5zqFRFikOe0/53.gif";
	smileyarr["rose1"]="http://lh6.google.com/fenil.rulez/SCKiaqghR9I/AAAAAAAAAPk/YWmvdaDqu_k/53.gif";
	smileyarr["rose2"]="http://lh6.ggpht.com/_PWF52rZHFNI/SQnJGavXTUI/AAAAAAAAAoQ/bHme6sar0-I/38rose.gif";
	smileyarr["rose_wilted"]="http://lh5.ggpht.com/_PWF52rZHFNI/SQnJGWyyn3I/AAAAAAAAAoY/oCAuC_ey_1w/39rose_wilted.gif";
	smileyarr["blush"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRz3fUsZSoI/AAAAAAAAAWo/ZoXbksCB2Qo/9.gif";
	smileyarr["day dreaming"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuK-yuyKEI/AAAAAAAAAS8/uEQA7X533lI/105.gif";
	smileyarr["love struck"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRz3fW7w2ZI/AAAAAAAAAWg/SSC-ImNK5tY/8.gif";
	smileyarr["heart"]="http://lh6.ggpht.com/_PWF52rZHFNI/SQnI0LWQ4uI/AAAAAAAAAmg/yk--nx-oE1U/24heart.gif";
	smileyarr["heart broken"]="http://lh6.ggpht.com/_PWF52rZHFNI/SQnI0DpwM2I/AAAAAAAAAmo/lymcWuHMT5M/25heart_broken.gif";
	smileyarr["broken heart1"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRz37qKERKI/AAAAAAAAAXE/jKuNiOsph50/12.gif";
	smileyarr["hehe"]="http://lh6.google.com/fenil.rulez/SCKffqghQvI/AAAAAAAAAF0/UYVeu8yK6AY/0.gif"; 
	smileyarr["hehe1"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuKaszXcVI/AAAAAAAAARE/Ko_x66AexLM/71.gif"; 
	smileyarr["batting eyelashes"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRz26y5DgNI/AAAAAAAAAWE/WC6D7Op78xE/5.gif";
	smileyarr["whistling"]="http://lh3.google.com/fenil.rulez/SCKiA6ghRvI/AAAAAAAAAN0/O3ukMSdjbj8/65.gif";
	smileyarr["whistling1"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuKBjhXVEI/AAAAAAAAAQM/kglAG1tmbrE/65.gif";
	smileyarr["wink"]="http://lh5.ggpht.com/welcome2click/SKleVeAq6KI/AAAAAAAABYQ/jK50Zg-BnLo/s400/6.png";
	smileyarr["wink1"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRz26ccoF2I/AAAAAAAAAV0/_J3X4_lUygk/3.gif";
	smileyarr["wink2"]="http://lh4.ggpht.com/_PWF52rZHFNI/SQnFhkNktCI/AAAAAAAAAjY/besgqDFWeuo/22red.cgi.gif";
	smileyarr["funny"]="http://lh4.google.com/fenil.rulez/SCKf2KghQ5I/AAAAAAAAAHE/Jw2dObqME8c/10.gif";
	smileyarr["funny1"]="http://lh5.ggpht.com/welcome2click/SKlehRceNzI/AAAAAAAABZA/aouz_gRVjnQ/s400/9.png";
	smileyarr["funny2"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRz3fdv8IVI/AAAAAAAAAWw/IP8DUMFdz5A/10.gif";
	smileyarr["surprise"]="http://lh4.ggpht.com/welcome2click/SKlewWyl1qI/AAAAAAAABZw/_oLwysiy8HU/s400/12.png";
	smileyarr["surprise1"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz37xh0mDI/AAAAAAAAAXM/3rUyNcFGrVw/13.gif";
	smileyarr["surprise2"]="http://lh4.ggpht.com/_PWF52rZHFNI/SQnFdvS0HNI/AAAAAAAAAjI/hlYryUkvw1s/20red.cgi.gif";
	smileyarr["Angry"]="http://lh6.google.com/fenil.rulez/SCKf2qghQ9I/AAAAAAAAAHk/2RzHLFyzD1o/14.gif";
	smileyarr["Angry1"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz3797Y80I/AAAAAAAAAXU/mWnFqtxrNzg/14.gif";	smileyarr["Angry2"]="http://lh3.ggpht.com/_PWF52rZHFNI/SQmCqO-VNjI/AAAAAAAAAgg/QcWTY4rAvTo/2red.cgi.gif";
	smileyarr["Angry3"]="http://lh6.ggpht.com/_PWF52rZHFNI/SQnFdUU3zdI/AAAAAAAAAio/9x71GWXoxww/16red.cgi.gif";
	smileyarr["Angry4"]="http://lh3.ggpht.com/_PWF52rZHFNI/SQnIikFPBuI/AAAAAAAAAkY/0OEZDIlmOVE/7smile_angry.gif";
	smileyarr["Headbang"]="http://lh5.ggpht.com/_PWF52rZHFNI/SQnPw2ZsM9I/AAAAAAAAAro/BMnAigZv_TQ/emoticon-0179-headbang.gif";
	smileyarr["bring it on"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuKQRq6UtI/AAAAAAAAAQ4/Q_5LqPnrp-A/70.gif";
        smileyarr["feelin beat up"]="http://lh6.google.com/fenil.rulez/SCKiNqghR4I/AAAAAAAAAO8/Wdr6l6Amf_o/66.gif";
	smileyarr["feelin beat up1"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuKPLoEDmI/AAAAAAAAAQY/M5xAgHmHQP8/66.gif";
	smileyarr["smug"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRz373sLnqI/AAAAAAAAAXc/IhE5tLnLnN0/15.gif";
	smileyarr["cool"]="http://lh4.ggpht.com/welcome2click/SKlePPr-sII/AAAAAAAABXg/0ODDyAqGcVI/s400/3.png";
	smileyarr["cool1"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz4T6NAQdI/AAAAAAAAAXo/BW5ATaXwD-A/16.gif";
	smileyarr["cool2"]="http://lh6.google.com/fenil.rulez/SCKf8qghQ_I/AAAAAAAAAH0/JLRMTa_-Z8E/16.gif";
	smileyarr["cool3"]="http://lh6.ggpht.com/_PWF52rZHFNI/SQnFB-utH-I/AAAAAAAAAhY/gffBBOuWfKE/6red.cgi.gif";
	smileyarr["tlk 2 hand"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuHc64K_oI/AAAAAAAAAKw/boTa0Lktlt8/27.gif";
	smileyarr["shame on u"]="http://lh5.google.com/fenil.rulez/SCKiNaghR1I/AAAAAAAAAOk/eVg86YsoBSU/68.gif";
	smileyarr["shame on u1"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuKP9lVD-I/AAAAAAAAAQo/GjBTHfO0xzQ/68.gif";
	smileyarr["phbbt"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuJjoYz8FI/AAAAAAAAANw/YXxhSacqPLs/47.gif";
	smileyarr["not listening"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuLLRFhIuI/AAAAAAAAATQ/JQR-FtQCPzE/107.gif";
	smileyarr["i dunno"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuLbWzQfxI/AAAAAAAAAUM/5S_SXcF_M2k/114.gif";
	smileyarr["no idea"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuLLYYXGJI/AAAAAAAAATI/97OX_dsEecY/106.gif";
	smileyarr["secret"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuHuuBQy4I/AAAAAAAAALc/Zz4-cFVEuOY/32.gif";
	smileyarr["secret1"]="http://lh6.ggpht.com/_PWF52rZHFNI/SQnPqc-bV7I/AAAAAAAAArA/F1BG1fFYF_w/emoticon-0127-lipssealed.gif";
	smileyarr["not tlking"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuHu5IEaFI/AAAAAAAAALk/TdNPF5R2Nb0/33.gif";
	smileyarr["sigh"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuJjXCSzgI/AAAAAAAAANo/7qXOhf4eY3g/46.gif";
	smileyarr["straight face"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuGpjx93hI/AAAAAAAAAKE/Scl6qQ1Hd90/22.gif";
	smileyarr["frustated"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuKAgxyxdI/AAAAAAAAAP0/dFuuChpURnE/62.gif";
	smileyarr["doh"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuICXRQkLI/AAAAAAAAAMk/onQVUGjXb1w/40.gif";
 	smileyarr["rolling eyes"]="http://lh4.google.com/fenil.rulez/SCKgfKghRMI/AAAAAAAAAJc/v-Kmy0eC-Xw/29.gif";
	smileyarr["rolling eyes1"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuHuK5APzI/AAAAAAAAALE/zPs_T9GsB6I/29.gif";
	smileyarr["^ eyebrow"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuGp-tzQXI/AAAAAAAAAKM/ish4L1loBgI/23.gif";
	smileyarr["nerd"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuHctkkU-I/AAAAAAAAAKo/tjwzunLOziE/26.gif";
	smileyarr["hypno"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJYdeHIAI/AAAAAAAAANM/SNAJjmPpN2E/43.gif";
	smileyarr["confuse"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRz3fLnJPcI/AAAAAAAAAWY/1h9Tg2fui8k/7.gif";
	smileyarr["thinking"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuICDnyLBI/AAAAAAAAAMc/nhBk9mc-WcA/39.gif";
	smileyarr["thinking1"]="http://lh4.ggpht.com/_PWF52rZHFNI/SQnFhtwg5AI/AAAAAAAAAjQ/RyyQiliIf2I/21red.cgi.gif";
	smileyarr["worried"]="http://lh6.ggpht.com/welcome2click/SKlelSKP7XI/AAAAAAAABZM/9neuIjb1rXg/s400/10.png";
	smileyarr["worried1"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz4T2s4QII/AAAAAAAAAXw/aOqC0V9hCx8/17.gif";
	smileyarr["worried2"]="http://lh4.ggpht.com/_PWF52rZHFNI/SQnIi6vzdqI/AAAAAAAAAkg/y4vmVk1fwhg/8smile_confused.gif";
	smileyarr["very worried"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuJYMZ-RlI/AAAAAAAAANE/Z2rXMT9jmwE/42.gif ";
	smileyarr["very worried 1"]="http://lh3.ggpht.com/_PWF52rZHFNI/SQnFX5JqNOI/AAAAAAAAAiQ/AIaRSg6TpQ4/13red.cgi.gif";
	smileyarr["whew"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuGLPCEDVI/AAAAAAAAAJg/p6D_OWQsMRk/18.gif";
	smileyarr["cry"]="http://lh4.ggpht.com/welcome2click/SKliGfYZtQI/AAAAAAAABa4/kbTXIepQcBI/s400/18.png";
	smileyarr["cry1"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuGpK2H9SI/AAAAAAAAAJ0/CNz245fF-Cg/20.gif";
	smileyarr["cry2"]="http://lh6.ggpht.com/intikhan/SJJzEvEdTQI/AAAAAAAAAJs/Vz9BCaXrlLA/s144/emoticon-0106-crying.png";
	smileyarr["cry3"]="http://lh6.ggpht.com/_PWF52rZHFNI/SQnFB6t92EI/AAAAAAAAAhg/e3wjA_YUbzI/7red.cgi.gif";
 	smileyarr["cry4"]="http://lh6.ggpht.com/_PWF52rZHFNI/SQnIocCv31I/AAAAAAAAAk4/jGbg7pX84HA/11smile_cry.gif";
	smileyarr["sad"]="http://lh6.google.com/fenil.rulez/SCKffqghQxI/AAAAAAAAAGE/RrOvlLjQ2j4/2.gif";
	smileyarr["sad2"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz26BLLYkI/AAAAAAAAAVs/-x_1Z2wgwcY/2.gif";
	smileyarr["smile"]="http://lh4.ggpht.com/_PWF52rZHFNI/SQnIcRLtbII/AAAAAAAAAjo/wTblCX9y9rI/1smile_regular.gif";
	smileyarr["smile1"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz26PsbE6I/AAAAAAAAAVk/6rrz-NnXXn8/1.gif";
 	smileyarr["big smile1"]="http://lh3.ggpht.com/welcome2click/SKleMsSvNdI/AAAAAAAABXU/383Cx0SCDG0/s400/2.png";
	smileyarr["big smile2"]="http://lh4.google.com/vikysaran/SNxsIsa5QJI/AAAAAAAABJ0/qVCHS2X7iVg/s144/4.gif";
	smileyarr["big smile3"]="http://lh3.ggpht.com/_PWF52rZHFNI/SQnFdayoorI/AAAAAAAAAjA/E-fLmdEniZ8/19red.cgi.gif";
	smileyarr["laugh"]="http://lh6.ggpht.com/welcome2click/SKleX5IhoVI/AAAAAAAABYc/mUTAauw6Trs/s400/7.png";
	smileyarr["laugh1"]="http://lh3.google.com/vikysaran/SNxs_xk_feI/AAAAAAAABL8/-qWrGbODa6k/s144/21.gif";
	smileyarr["laugh2"]="http://lh6.ggpht.com/_PWF52rZHFNI/SQnFh0pBNqI/AAAAAAAAAjg/Pj3XbsiyEXU/23red.cgi.gif";
	smileyarr["oh cum on"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuKuie9NnI/AAAAAAAAASA/zbu67fcigPc/78.gif";
	smileyarr["devil"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuGo9nfuAI/AAAAAAAAAJs/UNrjMUsRWSo/19.gif";
	smileyarr["Devil2"]="http://lh4.ggpht.com/_PWF52rZHFNI/SQnFCX41C8I/AAAAAAAAAho/K75vxhbWXSU/8red.cgi.gif";
	smileyarr["laughin on floor"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuHcf1CaKI/AAAAAAAAAKY/TGdSDVvbnfI/24.gif";
	smileyarr["angel"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuHcUDXwWI/AAAAAAAAAKg/s-to7VGhCHU/25.gif";
	smileyarr["Angel1"]="http://lh6.ggpht.com/_PWF52rZHFNI/SQmCp7Exi4I/AAAAAAAAAgY/cC-7kbFq2v0/1red.cgi.gif";
	smileyarr["sick"]="http://lh3.ggpht.com/_PWF52rZHFNI/SQnFdWp8ehI/AAAAAAAAAi4/l5ndAeMDYfs/18red.cgi.gif";
	smileyarr["sick"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuHukLUCWI/AAAAAAAAALU/A_Q0nuvMSI4/31.gif";
	smileyarr["clown"]="http://lh4.google.com/fenil.rulez/SCKguKghRRI/AAAAAAAAAKE/qR8khSq_IDI/34.gif";
	smileyarr["clown2"]="http://lh4.google.com/vikysaran/SNxt2w38kLI/AAAAAAAABNk/0BI1aP_b8a4/s800/34.gif";
	smileyarr["crazy"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuH4rMYVqI/AAAAAAAAAL4/_f0b7xJcla8/35.gif";
	smileyarr["droolin"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuH5VjqAzI/AAAAAAAAAMQ/TUC9Hi1y2oM/38.gif";
	smileyarr["loser"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuHur2AXoI/AAAAAAAAALM/K4oiFHA8NPc/30.gif";
	smileyarr["Thumbs Down"]="http://lh6.ggpht.com/_PWF52rZHFNI/SQnFXwb5kSI/AAAAAAAAAiA/b-FlGKUNr_E/11red.cgi.gif";
	smileyarr["thumbs down1"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuLa9ZapJI/AAAAAAAAAT8/z19iop_L3xY/112.gif";
	smileyarr["Thumbs Down2"]="http://lh5.ggpht.com/sawanjot/SIsTFQ54nfI/AAAAAAAAACU/mFx-xyojNvs/ms-daumenrunter.gif";
	smileyarr["thumbs up"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuLbI3nJNI/AAAAAAAAAUE/eoB1MdshuR8/113.gif";
 	smileyarr["Thumbs Up1"]="http://lh5.ggpht.com/sawanjot/SIsTFezYFzI/AAAAAAAAACc/fLT-gSpoCBk/msn-daumenhoch.gif";
	smileyarr["Handshake"]="http://lh5.ggpht.com/_PWF52rZHFNI/SQnPqpPZVBI/AAAAAAAAArY/MDR6C_ed6a4/emoticon-0150-handshake.gif";
	smileyarr["bow"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuKuWOdq4I/AAAAAAAAAR4/SOunUaC55Uc/77.gif";
	smileyarr["applause"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuJYCJXhJI/AAAAAAAAAM8/N0Qx0oQ1oVI/41.gif";
	smileyarr["rock on"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuLa0APC4I/AAAAAAAAAT0/Byp-A64JOcI/111.gif";
	smileyarr["dancing"]="http://lh5.ggpht.com/_PWF52rZHFNI/SQmCqH7LdYI/AAAAAAAAAgo/qvdeDJjQ0EE/3red.cgi.gif";
	smileyarr["dancing1"]="http://lh4.google.com/fenil.rulez/SCKiBKghRzI/AAAAAAAAAOU/SYJMOwMAH_c/69.gif";
	smileyarr["dancing2"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuKQBLZHYI/AAAAAAAAAQw/PrhwqxdVhTc/69.gif";
	smileyarr["party"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuH41dCT5I/AAAAAAAAAMA/n6ja0fCqBm8/36.gif";
	smileyarr["Party1"]="http://lh6.ggpht.com/_PWF52rZHFNI/SQnFX1rpU7I/AAAAAAAAAiY/mNvzmmNtArY/14red.cgi.gif";
	smileyarr["present"]="http://lh5.ggpht.com/_PWF52rZHFNI/SQnJPcGuvpI/AAAAAAAAAoo/oZp-xwh6LZY/41present.gif";
	smileyarr["cake"]="http://lh6.ggpht.com/_PWF52rZHFNI/SQnJPsSymrI/AAAAAAAAAow/d6Wew5DzkUM/42cake.gif";
	smileyarr["Beer"]="http://lh4.ggpht.com/_PWF52rZHFNI/SQnPxRIBOeI/AAAAAAAAAsA/Ng2QqEOj0cI/emoticon-0167-beer.gif";
	smileyarr["sleep"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuHc0rSKTI/AAAAAAAAAK4/cLwa0RIM2NM/28.gif";
	smileyarr["yawn"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuH5WZYQUI/AAAAAAAAAMI/LAG6Uq7fN3A/37.gif";
	smileyarr["Yawn2"]="http://lh5.ggpht.com/_PWF52rZHFNI/SQnFdU8iLJI/AAAAAAAAAiw/exrmwys8zPQ/17red.cgi.gif";
	smileyarr["liar"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuJYcat3uI/AAAAAAAAANU/jOqpVZWu4EI/44.gif";
	smileyarr["waiting"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuJYeXyj9I/AAAAAAAAANc/bg69saWEUgE/45.gif";
	smileyarr["cowboy"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJjxUxHbI/AAAAAAAAAN4/weMwh2W-Vbs/48.gif";
	smileyarr["on call"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuKvNK_thI/AAAAAAAAASQ/P1O6A_Jzn0Q/100.gif";
 	smileyarr["on call1"]="http://lh3.ggpht.com/_PWF52rZHFNI/SQmCqN3d-nI/AAAAAAAAAgw/7mdmTSl594s/4red.cgi.gif";
	smileyarr["call me"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuK-c0SGuI/AAAAAAAAASc/aibbDmbXWXU/101.gif";
	smileyarr["irritated"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuK-lyVK-I/AAAAAAAAASk/xLEqZKPp8SM/102.gif";
	smileyarr["bye"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuK-gF040I/AAAAAAAAASs/65kv4PZWAZw/103.gif";
	smileyarr["time up"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuK-iSz-yI/AAAAAAAAAS0/9uysSZlzT8A/104.gif";
	smileyarr["hurry up"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuLL0Dr12I/AAAAAAAAATo/JtloRJFAsrY/110.gif";
	smileyarr["dun wanna see"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuLLz4RofI/AAAAAAAAATg/tA28Y5eygqU/109.gif";
	smileyarr["chatterbox"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuKuSbiDjI/AAAAAAAAARw/s7-vyqjXPbA/76.gif";
	smileyarr["money eyes"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuKBToVgMI/AAAAAAAAAQE/sRRVz78Cjpg/64.gif";
	smileyarr["pray"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuKBFYLqfI/AAAAAAAAAP8/3qPz86IcPZw/63.gif";
	smileyarr["skul"]="http://lh3.ggpht.com/welcome2click/SKlidLeRIQI/AAAAAAAABck/W-eACkVpWLw/s400/27.png";
	smileyarr["skul1"]="http://lh5.google.com/fenil.rulez/SCKiaaghR6I/AAAAAAAAAPM/EXs0tfktP1w/59.gif";
	smileyarr["skul2"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuJ3cNVWuI/AAAAAAAAAPY/6gdsYN552Mw/59.gif";
	smileyarr["goodluck"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJuVdvUKI/AAAAAAAAAOs/5hCy2QkftDI/54.gif";
	smileyarr["Vampire"]="http://lh6.ggpht.com/sawanjot/SIsTFZUZTwI/AAAAAAAAACk/B3YLyGtV4jg/vampire.gif";
	smileyarr["bee"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuLbksRYPI/AAAAAAAAAUU/RImw1gDN4w0/115.gif";
	smileyarr["chic"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuJuC8VJJI/AAAAAAAAAOc/OC5Q8lId-Dg/52.gif";
	smileyarr["monkey"]="http://lh3.google.com/vikysaran/SNxuxdFBE0I/AAAAAAAABPs/HYK9EDZPk9E/s800/51.gif";
	smileyarr["Panda11"]="http://lh4.ggpht.com/welcome2click/SKlinqKserI/AAAAAAAABdU/1N3I8UnRJfk/s400/31.png";
	smileyarr["Pig"]="http://lh4.ggpht.com/welcome2click/SKlipyw_oSI/AAAAAAAABdg/_GPVTGm86kQ/s400/32.png";
	smileyarr["pig1"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJkFVQ21I/AAAAAAAAAOA/oTw7PJufnaY/49.gif";
	smileyarr["cow"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJkTjLdcI/AAAAAAAAAOI/NAgMRJQ5vwM/50.gif";
	smileyarr["dog"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuLL8LQt4I/AAAAAAAAATY/dM7GCDpN2YU/108.gif";
	smileyarr["dog1"]="http://lh3.google.com/fenil.rulez/SCKij6ghSCI/AAAAAAAAAQM/_JxH2hvgM1s/108.gif";
	smileyarr["OD"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuKa4M6GbI/AAAAAAAAARM/awXItYFE9-g/72.gif";
	smileyarr["FENIL"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuKbGT4HOI/AAAAAAAAARU/4C0-QOktnuc/73.gif";
	smileyarr["NIYATI"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuKbHqxh6I/AAAAAAAAARc/aRZmqMm0Qjc/74.gif";
	smileyarr["pirate"]="http://lh6.google.com/fenil.rulez/SCKizqghSHI/AAAAAAAAAQ0/xuO3al_YRfg/pirate_2.gif";
	smileyarr["pirate1"]="http://lh6.ggpht.com/welcome2click/SKleTXhHRZI/AAAAAAAABYE/0zCNDDPtYpA/s400/5.png";
	smileyarr["bug"]="http://lh5.google.com/fenil.rulez/SCKiaaghR5I/AAAAAAAAAPE/YYuluyCX5UY/60.gif";
	smileyarr["bug1"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJ3fW72iI/AAAAAAAAAPg/riNaGU4v998/60.gif";
	smileyarr["Alien"]="http://lh3.ggpht.com/welcome2click/SKnASyE2BiI/AAAAAAAABds/kX-z_IOqTHM/s400/S.png";
	smileyarr["alien1"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuKAl1fVpI/AAAAAAAAAPs/BD51ld0tn5g/61.gif";
	smileyarr["pumpkin"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJ3GXE2uI/AAAAAAAAAPA/1db4aZbgqTA/56.gif";
	smileyarr["FF rulez"]="http://lh4.google.com/fenil.rulez/SCMiK6ghThI/AAAAAAAAAcI/656o_XLJlVQ/infomilies14.gif";
	smileyarr["peace"]="http://lh3.ggpht.com/welcome2click/SKliVLddZLI/AAAAAAAABcM/CuOas7-5adY/s400/25.png";
	smileyarr["peace1"]="http://lh5.ggpht.com/_PWF52rZHFNI/SQnFYNCn3eI/AAAAAAAAAig/cc8dtJTys-U/15red.cgi.gif";
	smileyarr["idea"]="http://lh5.google.com/fenil.rulez/SCKiaaghR7I/AAAAAAAAAPU/5WeIQHQnrbU/58.gif";
	smileyarr["idea1"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuJ3Oym8jI/AAAAAAAAAPQ/hy6-4DedS6o/58.gif";
	smileyarr["lightbulb"]="http://lh6.ggpht.com/_PWF52rZHFNI/SQnJPm0ac8I/AAAAAAAAApA/Ma6ou-EVqO4/44lightbulb.gif";
	smileyarr["coffee"]="http://lh5.ggpht.com/_PWF52rZHFNI/SQmCqCXLrXI/AAAAAAAAAg4/TK_k1EL6whk/5red.cgi.gif";
	smileyarr["coffee1"]="http://lh4.ggpht.com/_PWF52rZHFNI/SQnJP3aHKyI/AAAAAAAAApI/TE_PdiVtG-Q/45coffee.gif";
	smileyarr["coffee2"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuJ3D__jEI/AAAAAAAAAPI/kDLURoPSiJo/57.gif";


	smileyarr["Himesh Reshamiya11"]="http://lh5.ggpht.com/welcome2click/SKliRIfrtJI/AAAAAAAABb0/iaDxi10eKUk/s400/23.png";
	smileyarr["Himesh Reshammiya:)"]="http://lh3.ggpht.com/_PWF52rZHFNI/SQnPqgXbpSI/AAAAAAAAArQ/KE-rApevzTk/emoticon-0147-emo.gif";

	smileyarr["Hand…"]="http://i47.photobucket.com/albums/f153/sharma33611/icon/maohq7.gif";
	smileyarr["Music Note"]="http://lh4.ggpht.com/_PWF52rZHFNI/SQnPq503bQI/AAAAAAAAArg/N8S1KHnneQQ/emoticon-0159-music.gif";
	smileyarr["Music Note1"]="http://lh5.ggpht.com/_PWF52rZHFNI/SQnJdBsHGiI/AAAAAAAAAqI/jX6Msiv36eE/53music_note.gif";
	smileyarr["Ninja - Dance"]="http://lh3.ggpht.com/_PWF52rZHFNI/SQnPxN5pT3I/AAAAAAAAArw/dnpN-ORro_A/emoticon-0170-ninja.gif";
	smileyarr["Ninja - Dance2"]="http://lh3.ggpht.com/_PWF52rZHFNI/SQnPxKUpj8I/AAAAAAAAAr4/WpSvuyrtlZI/emoticon-0169-dance.gif";
	smileyarr["Muscle"]="http://lh4.ggpht.com/_PWF52rZHFNI/SQnPxUIxcvI/AAAAAAAAAsI/JirhFpx02Hc/emoticon-0165-muscle.gif";
	smileyarr["Packman11"]="http://lh6.ggpht.com/welcome2click/SKlifc-rZwI/AAAAAAAABcw/syofe9rrQwY/s400/28.png";
	

	smileyarr["Indian Flag"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/Sx-0WcmJBjI/AAAAAAAAA2o/LB-YL4tPhwA/s800/india-flag.gif";
	smileyarr["Pak Flag"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/Sx-0WduG9RI/AAAAAAAAA2k/AFJZn6zB0Bg/s800/pak-flag.gif";
	





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

// HB's script