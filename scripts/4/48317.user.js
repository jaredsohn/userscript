// ==UserScript==
// @name           Images
// @description    Change a lot of images, like the ranking stars or the country flags
// @include        http://www*.cs-manager.com/csm/*
// @include        http://www*.cs-manager.com/*
// @include        http://www*.cs-manager.com
// ==/UserScript==
var stajl="display:block;margin:auto;";
for(var $=0;(K=document.getElementsByTagName("img")[$]);$++){
	switch(String(K.src).substr(34)){
		case"2d-demo.png":
			K.src="http://img216.imageshack.us/img216/1408/2dlivegamefk8.png";
			break;

		case"csm-demo.png":
			K.src="http://img264.imageshack.us/img264/9472/aboutgamept0.png";
			break;




		case"activity_5.gif":
			K.src="http://img413.imageshack.us/img413/4402/34572861.png";
			break;

		case"activity_4.gif":
			K.src="http://img407.imageshack.us/img407/5589/60501404.png";
			break;

		case"activity_3.gif":
			K.src="http://img148.imageshack.us/img148/4553/80436112.png";
			break;

		case"activity_2.gif":
			K.src="http://img140.imageshack.us/img140/7317/14923557.png";
			break;

		case"activity_1.gif":
			K.src="http://img134.imageshack.us/img134/8946/42184335.png";
			break;

		case"activity_0.gif":
			K.src="http://img23.imageshack.us/img23/1807/56444153.png";
			break;



		case"rank_u.gif":
			K.src="http://img218.imageshack.us/img218/7159/80176818hi7.png";
			break;
		case"rank_n.gif":
			K.src="http://img240.imageshack.us/img240/8281/staynp4.png";
			break;
		case"rank_d.gif":
			K.src="http://img165.imageshack.us/img165/1754/downik4.png";
			break;


		case"report_up.gif":
			K.src="http://img104.imageshack.us/img104/1267/57958342kk6.png";
			break;
		case"report_neutral.gif":
			K.src="http://img222.imageshack.us/img222/3028/95665609qg2.png";
			break;
		case"report_down.gif":
			K.src="http://img104.imageshack.us/img104/4122/45164537sp7.png";
			break;




		case"tacc_T.gif":
			K.src="http://img90.imageshack.us/img90/2420/66261669fx9.jpg";
			break;
		case"tacc_CT.gif":
			K.src="http://img261.imageshack.us/img261/296/18655747jq1.jpg";
			break;

		case"tacc_Te.gif":
			K.src="http://img90.imageshack.us/img90/2420/66261669fx9.jpg";
			break;
		case"tacc_CTe.gif":
			K.src="http://img261.imageshack.us/img261/296/18655747jq1.jpg";
			break;



		case"training_map.png":
			K.src="http://img407.imageshack.us/img407/3871/trainingroomji0.png";
			break;



		case"star.gif":
			K.src="http://img228.imageshack.us/img228/295/estrelabe2.png";
			break;



		case"nation_ar.png":
			K.src="http://img144.imageshack.us/img144/192/argentinaaq2.png";
			break;

		case"nation_at.png":
			K.src="http://img144.imageshack.us/img144/4702/austriaxa9.png";
			break;

		case"nation_be.png":
			K.src="http://img238.imageshack.us/img238/7946/belgiumgk9.png";
			break;

		case"nation_br.png":
			K.src="http://img238.imageshack.us/img238/2205/brazilwn4.png";
			break;

		case"nation_dk.png":
			K.src="http://img160.imageshack.us/img160/5793/denmarkeq3.png";
			break;

		case"nation_ee.png":
			K.src="http://img299.imageshack.us/img299/2628/estoniaxq6.png";
			break;

		case"nation_fi.png":
			K.src="http://img299.imageshack.us/img299/6204/finlandih5.png";
			break;

		case"nation_fr.png":
			K.src="http://img101.imageshack.us/img101/5474/francevl8.png";
			break;

		case"nation_de.png":
			K.src="http://img91.imageshack.us/img91/4402/germanyun6.png";
			break;

		case"nation_gr.png":
			K.src="http://img101.imageshack.us/img101/3836/greeceud7.png";
			break;

		case"nation_il.png":
			K.src="http://img101.imageshack.us/img101/9923/israelyq5.png";
			break;

		case"nation_lv.png":
			K.src="http://img91.imageshack.us/img91/4752/letoniawa6.png";
			break;

		case"nation_nl.png":
			K.src="http://img159.imageshack.us/img159/3884/nederlandyk0.png";
			break;

		case"nation_no.png":
			K.src="http://img91.imageshack.us/img91/7470/norwaymv9.png";
			break;

		case"nation_pl.png":
			K.src="http://img159.imageshack.us/img159/4320/polandvl0.png";
			break;

		case"nation_pt.png":
			K.src="http://img407.imageshack.us/img407/851/portugalci2.png";
			break;

		case"nation_ro.png":
			K.src="http://img407.imageshack.us/img407/695/romaniahz8.png";
			break;

		case"nation_ru.png":
			K.src="http://img407.imageshack.us/img407/5766/russiaae0.png";
			break;

		case"nation_es.png":
			K.src="http://img407.imageshack.us/img407/6522/spainxg4.png";
			break;

		case"nation_se.png":
			K.src="http://img407.imageshack.us/img407/8414/swedenmu6.png";
			break;

		case"nation_ch.png":
			K.src="http://img407.imageshack.us/img407/9019/switzerlanduy4.png";
			break;

		case"nation_uk.png":
			K.src="http://img132.imageshack.us/img132/746/unitedkingdomdz2.png";
			break;

		case"nation_us.png":
			K.src="http://img407.imageshack.us/img407/609/unitedstatesofamericack4.png";
			break;

	}
}