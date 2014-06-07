// ==UserScript==
// @name           TexAgs School Tags
// @namespace      bmc13texagsschooltags
// @description    Version 2.4.1
// @icon		   data:image/png;base64,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
// @include        http://www.texags.com/main/*
// @include        http://texags.com/main/*
// @include        http://*.texags.com/main/*
// @include        https://www.texags.com/main/*
// @include        https://texags.com/main/*
// @include        https://*.texags.com/main/*
// ==/UserScript==


/*      the code is largely based on GigEmAggies06 and/or Brad Lambeth's TexAgs Enchancements        */ 
/*      extensions, and much credit should be given to them                                          */
/*      https://github.com/bradlambeth/TexAgsEnhancements                                            */
/*      http://userscripts.org/scripts/show/11285                                                    */


/*********  USER-DEFINED VARIABLES  ***********/
/**********************************************/

function getElementsByClass(searchClass,node,tag) 
{
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < els.length; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

var testReply = /postreply/;
var testPost = /posttopic/;
var testPM = /privatemessage.postmessage/;
var testEdit = /replyedit/;
var testTopic = /forum.topic/;
var testThread = /forum.reply/;
var testBCSTopic = /Topics/;
var testBCSThread = /Replies/;
var testForumLinks = /forum.main/;

var sipList 		= Array('2005Horn', '33', '91 Horn', '94 Texas EX', 'A Corda', 'AkersN', 'AlexNguyen', 'austx', 'Authentic Horn', 'awinlonghorn', 'bassale47', 'BleedOrange10', 'booleyHorn', 'BoyNamedSue', 'Chest Rockwell', 'Devinp23', 'Dr Drunkenstein', 'Fast Times', 'FtWorthHorn', 'Full Tilt', 'FWHORN', 'gnglonghorn', 'GoHorns94', 'h264', 'Hellraiser97', 'horn1', 'Hornblood', 'Hornographer', 'Horns11', 'hookem3', 'huisache', 'IgnatiusReilly', 'IIIHorn', 'INIGO MONTOYA', 'Jakovasaur', 'jefford22', 'jkavvytx', 'JTaylor', 'KidTwist', 'l-horndev', 'landman1', 'Lifeguard NO.2', 'Lhorn01', 'LHorns3','locohorn',  'LonghornsNo1', 'Lost Saucer', 'MidnightBevo', 'Mister Randy Watson', 'Mr. Drummond', 'MustangOrange', 'nbbob', 'NerveEndings', 'Nonhostile Sip', 'northernhorn', 'Norwegian Wood', 'ObjectiveUTLAW91', 'onehorn', 'Pato', 'Professor Terguson', 'realhorn', 'rscharnell', 'saltwater', 'Samsill98', 'Skihorn', 'sodiumacetate',  'TEXAS FIGHT!', 'Tex Pete', 'Texas velvet maestro', 'Texas_Fan', 'Texas75', 'TexasBorn', 'TexasEx1994', 'Texdoc','The Lat Man', 'Theo', 'THorns90', 'toucan82', 'UniHorn', 'UTGrad02', 'UTLawHorn', 'W.E. Henley', 'West Horn', 'Winston Wolfe', '@Texas.edu', 'Nowhere Man', 'omaha28', 'MarcusT', 'Longhorn Nation', 'Nedley Mandingo', 'TexasBB', 'Gameover', 'Bevolution', 'Mailinator1892', 'jock itch','hornsfan568','LonghornE63','candid_longhorn','BurntOrangeBoy');
var tshirtSipList 	= Array('LonghornDub','squid', 'highwayman', 'johnnyyou', 'FXST', 'UT2005', '20Horn09', 'OrangeRout', 'Hookem123', 'Rob Lowe', 'Texasfan1224', 'horninatx', 'sugarlandbevo', 'RVHorn', 'RVHorn', 'UTex09', '13 0 National Champs', 'texasfight68', 'Dwayne Hoover', 'turk333', 'BDog', 'TheBeeve');
var specialList 	= Array( 'highwayman', 'johnnyyou', 'FXST', 'UT2005', 'Dwayne Hoover');
var bobcatList 		= Array( 'OleDublinBobcat' );
var cubList 		= Array('Hurin', 'LonghornDub', 'Big Old Bear', 'gogreengo');
var theifList 		= Array('PlanoGuy', 'Godfather', 'soonerborn');
var caneList 		= Array('TheU');
var agList 			= Array('713nervy', 'blondskii', 'drive on', 'no money left');
var tardList 		= Array('0raider0', 'Big 12-0', 'BillJack', 'BreakPoint778', 'Cowtown Raider', 'Cowtown Red', 'DrKennethNoisewater', 'Hong Kong Paul', 'leachfan', 'PaleHorse', 'raiderjay', 'rockylarues', 'shiner raider', 'TechDiver', 'Techsan_02', 'TechTard', 'TENBOLLS', 'Texas Tech Universe', 'ttechguy', 'TTechDeck', 'TTUClint', 'WreckemTXTech', 'Zorro', 'BonniePrinceBilly', 'MHBT_Raider', 'TheGoddess', 'Dr.K', 'Preferred Stock', 'Raider15', 'Matador05','TTPointMan', 'sexaT Tech', 'redraiderzuke');
var staffList		= Array('Charpie');

var sec_BAMA_List 	= Array('Tide19852008', 'bamaiz2sirius4u', 'bamaoldtimer', 'rolltideag09', 'trey1121', 'Glyn', 'ganu76', 'RJ Yellowhammer', 'jatebe', 'Serenity Now', 'Bamaannie', 'Bamatab', 'ihatelsurolltide', 'TiderJB', 'shulaball', 'MGMTideFan', 'Texas Bama', 'DvlsAdvocat','ganu76', 'DrJekyllMrTide', 'GeorgiaTider', 'High Tide', 'Serenity Now', 'Bamatab', 'Al A Bama', 'ihatelsurolltide', 'tngilmer57', '1CollegeFootballFan', 'TiderJB', 'CrimsonTitleWave', 'MGMTideFan', 'frogpelt', 'jall65', 'bamaiz2sirius4u', 'BamaFan82', 'Number1Gump', '_bs2', 'Bamaannie', 'crimsonaudio', 'Deacon Blues', 'BAMAPERRY', 'ABW', 'Bama334', 'NashTider', 'sec1', 'Bob.Loblaw', 'cyde', 'Texas Bama', 'Chizad623', 'Bama76', 'Enchantedbama','BAMABILL','wanewman','Tideforever','lakemann','rolltideroll316','tidertom13','ROLL TIDE ROLL 17');
var sec_ARKY_List 	= Array('WarPigs', 'Beantownhog', 'SwineFlew', 'BorderPatrol', 'wmr', '_irishman_', 'rzrbackrob', 'Arkapigdiesel','BorderPatrol', 'JMHAWGFAN', 'Bogghawg', 'hogdaddy', 'NCrawler', 'wmr', 'WarPigs', 'Hogville Webby', 'Razorback7', '870Hog', 'Choctaw Hog', '195bc', 'hoglady', 'UA01Duke05', 'SanAntonioSwine', 'rzrbackrob', 'wacohog', 'rickm1976', 'Born', 'RazorAg07', 'Elrod', 'sdz_hog', 'ChemEHawg', 'HOGvillian', 'reddevilhog', 'Mike_e', 'Festerbck','Hellmet','BigHOGJDM','KingfromTD','Razorback Russ','fixby','rzback');
var sec_AUB_List 	= Array('jdc63', 'Tiger1992', 'TexasTiger14','BarnTiger', 'AP Ness', 'Hawkskiss', 'aurx', 'TexasTiger14', 'War Eagle,,,,HEY!', 'Tiger n Miami AU83', 'Fly757au', 'SouthlakeTiger', 'Hamstonian', 'gotigers', 'OrangeBlue', 'jdc63','Plains204');
var sec_UF_List 	= Array('Big Ed Gator', 'roflcopter', 'Texas Gator', 'tilley', 'Vindibudd','tilley', 'Lizard of Oz', 'SCgator', 'GatorDave', 'G8rSid', 'AtliGator', 'gatorpower', 'klgator', 'roflcopter', 'Gator_in_TX', 'JaxGator', 'CzarGatorJD', 'Chantgator', 'BossaGator', 'Ajace', 'Gator', 'Gatorgal04','g8r15','GatorDeputy','Routerhead','GRBman','SetsunaGtr');
var sec_UGA_List 	= Array('NekiEcko', 'taneyhills mullet','Lurker Above','I Bleed Red &amp; Black');
var sec_UK_List 	= Array('DeftShooter','kentky', 'DeftShooter', 'JOHN BLUEBLOOD','Big Blue');
var sec_LSU_List 	= Array('ibldprplgld', 'nashvilletiger', 'dachsie', 'Tigerfancov', 'BetLSUandSECtowin', 'LSUtah', 'LiveGold', 'LSUFAN910','LSU Rules07', 'LSUtah', 'LSUFAN1983', 'Sam the Sham 2', 'tiger perry 1', 'The Sockster', 'BayouBengal', 'tygerAG', 'dachsie', 'Feed Me Popeyes', 'Chad Vidrine', 'dtbrignac', 'RhodeIslandRed', 'Tigerfancov', 'ibldprplgld', 'jamhexx', 'ElTigre', 'ShreveportTiger', 'LSU Dreaux', 'Tigerfan91', 'pochejp', 'batonrougetiger', 'Tiger in SB', 'jladne3', 'catahoulatigers', 'dirty dan', 'ragincagin','JapanLSUfan','Nutriaitch','Just Outside of Barstow..','sugamagnolialsu','am4titansandlsu','ChineseBanditLSU');
var sec_MISS_List 	= Array('NaturalStateReb','WildRebel');
var sec_MSU_List 	= Array('BiggusDawggus', 'msubulldogntx', 'MSU/SECALUM', 'Herchel', 'chaddawg77', 'MaroonDawg', 'pleaseletmeread');
var sec_MU_List     = Array('Mizzou Fan in Austin','TigerInDC','BobSakamano','MissouriFan','Osceolas Revenge','medloh','Mizzou-rah!','TXStiger','tigooner','Calicotiger');
var sec_SCAR_List 	= Array('PalmettoPrince', 'Ynoandino', 'gamecockhub', 'CarolinaAggie','gamecockhub', 'jerryusc', 'Spurs56', 'Strong Men Armed', 'vehemon', 'BBF1983', 'PalmettoPrince', 'CarolinaAggie','gamck');
var sec_TENN_List 	= Array('Seven Maxims', 'rockytop9808', 'Volmeister', 'CooleyVol', 'Tennessee Jed', 'Oldvol75', 'NeylandVol','murfvol', 'SEC-UT', 'Volmeister', 'ntxVOL', 'GoVols', 'Tennessee Jed', 'volstothewall', 'FatPearl', 'NeylandVol', 'TennesseeTuxedo', 'Vollygirl', 'checkerboards', 'TennVols423', 'vol4ever', 'Rocky@theTop', 'TennesseeVol', 'Stålkofta','mooresvillevol');
var sec_VU_List 	= Array('138702');
var other_VPI_List	= Array('hokieball');
var aggieFan_List	= Array('CodeAg','Kentucky Mustangs','ksAG4','LectricLeeland34','GBRAggie');
var sec_fan_List 	= Array('132343');
var uta_fan_List	= Array('MavForAggs');

var sec_BAMA_SRC 	= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJHRAFMrLIrcoAAAM6SURBVEjH7ZZbSBRhFMf/c9vZdfOyqyYpu6tW7qgb3fWhKDAqXaww6WoEEUVQ0FPQW0QP9VbShQjJigJju0lEUQhdfLGwqCjc0nJ3CzNl3WZT27n2oLvO2K5bJD5EB4aB+c5/vt+cc+acD/hv/7gRiRZ22fI4liSzCJWYnkLQdgNBO38VEwAwCMCcbKN+UUAmw+ieCarkjUD2DynS23OBzx2/DbjPYVtqArNoW67rOAB84b/9dSRkVQVFxI9H62DPWV6NXKn3+VqTAmrhomBBSYhtMhk2HtRKG/CA/9wkkaLnhM93Q+c7Pq2phGFZFC4oCRhWZMiqCnUS60odvchR0GFFRi5jdvGyMMClGrva+XB/1JfWCo0EVaKFm6yI/W7anQbrHiEieQHE6pHUA9L2KBwAWF0c3M2X4G6+hMrrjSg/chCUkY35V5yvR9WtizBmZ+r85x/YCwBgLemoutGIZaeO6cC0umgQYneFLNf6jgd0ar+OTjHBws1Gp+c2PrU8xqyN65BTtgAAkL1wLmYsKUNagR0Fa1aPpGPU37l9E4zZmZi9tRbWUg7pM/Nje8TTaTOVQjCzEgKyoLl4P0PmHA5Z81zguwP42v4SAFBY40bwrRf+uy0orHHr/MO+AEp21qFoay1C7z/o1ibSjfy1pC0hYEgWvkTTq6sVQUTI2wVzbg6KtqwHxbJwVK1AyNuJ7596kFE0E5aSsTb57vI1FO/YAr6rG6F3Y4DJdEFJgAolkBDQRJGheMUcuP8Q76/ehBj+DmupE7aVy8FMM8PqKoa9sgJyJKKLRu/T5+i40IRXJxt070mmA4AhVexMCCiokjceYEXDcay978FQbx9enz6Pwho3+l++wZ3qOtyprsPH5nvIr14Fkh5rCu1H6/H12Ytf0htPR9Bj3Y4ilbaEjXq3LY9Lg+nQPFPW5qmeuUFJgF/km3gMH9aOPV2jbufD/YstqaqoqDkZFJs/VWDDioxuIfxIosTGM/7Ak6SzeL/DsZ5RmA12Jm1KIukX+SaRFD3148bchKeZ3bY8zkKylbJCllMqxRlJekb8uaVmgyD6/hTqhyL1yITcQZFK24ASuZfoNPPf/tZ+AkVHb0H/N+MgAAAAAElFTkSuQmCC';
var sec_ARKY_SRC 	= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJHRAKFZBaBG4AAAMtSURBVEjH7ZZfiFRVHMc/59x7Z3bn7rjL0v4tFyV1r+sVWUwlNV9S2GRdmyiVNlwhCHuKJeotLIggqIwIiqCVTYSl1aW1pAgjwlwRqZhSmWGTImW1nNxdx7s2c+/c00szzNje2XnY9iH8vtx7fr/z53O+PzjnwF39zyWCEis00woLeQ/QWIVsM4RoL+2ho2Q1IBxQZkWL+emStqtIZlG/ZZR/MZFLJyoGXK1HN4cQD3zZsukgwPc3//hPXTowc+n924ojP3hT384JWAyXB0t4DgAz+PMCFEGWtC3d5LlbySFDaMNxb3qkOKfdWdaIkFvycAnPIeW7zODjoubNMReFi8L4x5+U77JOX2QnfWfSFMallMqm8n1LthIWsqMYbj5dm013zr0z1Lg/KrSu4lgJYAjRVgncrtEB+sY+wWxqAKC502bfmVH2nRll76ljbP/gdarq6wrx5k6bcG2U3ScG2frmS7NC5r+O8jYEAoaFbA/aXV73bVzLkoc3Ub98KR27dwBg1ERoXG3x4+Aw3713GPvJR1m7/6lCPBQ16f7wDWrb7uX0a++WdTIs5LJAwAiaNVdZ7d4Yv8cvkhz5HLs3VpLLph1ymSwANy9fLcQffPFZFm9ex9HHn+H2n5Nlyx5CLA4EnPAz1/LlnU16VZj22CNcP59k6tcrNKxaQdOajkL+oZf76Rk8yPhnJ/np8LFCvGFVO0akmmhrU1m48ZxDFnU5ELBO6lPlJljes43wohqaO22sWBfeX5kSF4/v7Sd+6GOWbttCc6ddiH/69PNMnIuzY+Ataloay0JmlP9zIKCrVLLcYLs3xsS5OAPruxlY382FoVFW7upGGnqhz1cvvMrk+C/sPPIO1fV1APiux/G+foQm6fnobYSmBa5hCu1s4EFtaaYlEQf6qlr3LPSdO55zGHOnh3zUK4mck5j1oE4pN9WqhdU1P9t0vxZZslBgN5TL1+7kN9VCHrqQu3Vqzrt4jR59zFXqiY1G7YI4OeZODxlCDMe99EjFrxlLM62o0Lscldvg4lv1wmj591CJxG/wkdcrQ8kV/m4o96qBTJhCO5tW3hfFZb2r+dTfFsA1INHfYT0AAAAASUVORK5CYII=';
var sec_AUB_SRC 	= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKAxAGCzGGLH0AAAKbSURBVEjH7ZZNTxNRFIafuVNLOxTB0kJsUhRbbAslMZGEhcSdCSwUcEH0H/gLXGpMSDRu3GjixrAyYSFEXBhj3BjdgCyIJnRKMDH4QYGWr1ooMNPrAqK00KFiAonh3U3unXuee8655xw40n8updiCGuwMo+ABapDUgQzt2CRUQMmALN/TksyBIgqsizgKUwqMG/qAXjKg2tDZhqQFcg8OxE3C9lgR4qmhD7zfwXLocJvebUGiiZomKZOxWFFANdgZBi4eKNwfyigoC6q36XMuGUv+dm5BwBsPB25LOeOGlLTnRT//EtSVcFP6AmM8D33Aa1sDoK0ixVBoBL99FYCbvkke1X8CIOpcZig0wlBohMHQKL1+HYdiWkCarcUBd3upBWopX+LC8QXOOFa44p4BoFI1iGgZHGLTsL8sS8CRAUBTTSJahmcpH2+WPPR4pmmtWLTKx6AVYHgvwG53gvEVFy8Xauh2J0qOXlRb5py2xJesk9GflVYR8lsAYmmxTDHpODGLvuri27qDs84Mjc40ctdEyK9g61IwkXXhs2e57vluVZq/WgAqi1aAl6qSuFSTZm2ZjqpZ1nKCbneClGEHoFlLowmDgCNDyjiW9+/rRS/9SR9p00ZUS1vwicntn7aC1Ti7+mNTV93TjGWO0zNxHoBev85l9wz3fwR4MV/L3Tqde6d05jbs3JrKT+cnwY+YEuKrLh4m6i2KtjpctJOoDV1hpHkbuLafKlEuDFyqyeyGfUeIS2u8ar+iqne2t728Qi3n9aSojkiQtcDpvz1/QwoyOZtVi7eie4vN1mfqA+8sW52cj8dEdSQNUgLRgxlZ1P4tuMHSp5mGrjBStkOuFQgDJ4ts9QJz+6CaRhE6Qh1WFF4Vm2aO9K/6BQMx5F4xoCxiAAAAAElFTkSuQmCC';
var sec_UF_SRC 		= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAAXNSR0IArs4c6QAAAAZiS0dEAAAATADK+3LkdQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKAxAjBEnK4QsAAAJ3SURBVEjH7ZZNaBNBFMf/+5VszXeIiWk01i8arASlYi/Fm5CDoiiKl1LBg6KIVw+CePQkIohYRESEiiAIgl5FEVI/kFClBas1Gtp8kA/itpvd2V0PqeumzZKtCTlIHwyzb9/Ozm/eezNvgDX5z4UyM4TiIzGNWRdQKDaoMK6ozLj6V45mwGiy0MvOO1pNVFsogdh7UdR8+jtOqU6zqpBm5PLnbOrBlGXA4J4zwxLj2SsPXrsOAEIp074rVALQbFOTI33/tlPKPMx+uPW6JaARTgcTc38n6YQsB+WD4L/eGXdqpceF9zefGE3M8rBKXGC/DifmACLUwTS1c4mlqfVG0XWdCCCu2C5KnC/5/ZEZIZsq6GsxjiOse2cDXCe9ZhZ2gwiBA2dr9kiiwdlGRaEdUatwh1yfsDhwCVtthQY9yhX15z8tue1Ga8ilXtRsQ0ZzQzLIrKffbHX/IsMz5zEr+0E02rInCePZbg5Iu2OdDOvzvjGooPGoshsX545YGkPonk2mgLSUn9fD2yrP9V2mLfXqioPhWPoUvsteCKrd2orEHFh18QcxA2RYe9mqd2YlPwDgnP8NnlYHMOp7hwWVQ4449W8yxI207F+V11ml8oWYbRJOqU5b/dFkLYzL2QQOuyfxbPNd7LAVcPrnCYga11Za8JSUND2oQ/GRWMW25Yq44eDJrhddMQe+PDHukb5dNZa9hoNayKYK3nBcI7IYUno29nULDEQAW3z70o3SvfzHsVcta3Fg8MLRX5TvuOjd1xVP8uWJpmWu5W2mZo8kRM02JIOPKZw33LyucuuhyvnVQjFyeY6DOMVTUtJey7wwu82sSbvyG0cMGMIxoXerAAAAAElFTkSuQmCC';
var sec_UGA_SRC 	= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJHRAOMlE8dAEAAAINSURBVEjH7dY9aBRRGIXhZ3dmzbhRCXFNwJ8oEky0EIuACmkEhRSp0thYWVkIprC2slMIiKggCBaazjZNIII2InZBE0jlD6iFxiKaTbIzFt5IkJ1ZIxhBcuCyc+fMzH33fHM/hk395yrlGd3t+rNMrUFXI9Wz3NDX7O4yCyntrRZKU8q/rFaJzMZlr6OSlx8WzPw2dVfVYEdiFNlGjPaK293tBpuxRM3gllID84vGNqqMy6mBRqbakci+LnulqKwbmVxOkv25gDurRv4V3OoIAf1Uee2kkeopKsUJPMTeML+E62v8k7iHSTzChTXeTTxArUW5F1cczwVsulPXaAcOoS3Md+NAOO7DGD7iIq5hT/COhT+3H0MtAFdSvfmAaUH9W+hM2HFXsYh53A/eMGZCssOtAfflApZL3hfdnBV4leDXMYq7uBHSPo05vEMvhSnEZW9yAaOS+SLAz+H3CLbiID6Fc8/Dw87jMqbC+VPYhsMBtN4ixbhsLhewEpktAnyBCVzBE2zHreA9xR2cC8erqQ1jGmfDmAjvYZyzRhJ7VtgHk9h4y35Ftous1MSLg5f8QYtJYuOFfRBqVSNbIlMb3f/isse1H324tWpVIzlJLv0NuCQ2ngdX+DVTbxhaXHF0uaGzkekM10dYCK9RBSmSnMe04VvYU6uqox6VfKlE3iax6bbI5Lq+Zja1Dn0HEogh6FT9YVoAAAAASUVORK5CYII=';
var sec_UK_SRC 		= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJHRALM1tMsNIAAALLSURBVEjH7ZZPSBRRHMe/M29mZ3d2l3VddVPbVbHY6Y+HDcNDYpQQEtGhCAwiIS9FdLRTEAV1CCrCQxJYJEQLgrfCQ0JlIKLgLRQS2pZI3X/ZOrPt7sy8Dqvi2K475dIh/MIw8N687/vM7/fj/R6wo/9cTLGJyvYeCbxYRRlSQy2in3Ji4LePWAJQXQbD2kttpKWWQOwe4+aqMseomS8ku/Ix9n5w1jRg5bEr7brF3lpx6sZDAIjFE9sPRS4D8ELBKTI9NEDS8ReJsf4PJQE3wq2B0dRiflLNlSdvHG+EcHrBTDwJcVp6OPnm0YgBfnNadVtFxxocTS0CWTkPpuvlKyxdzz/s6vZZGbRGOsgsf006dzXPK+GZ2HoVbVxHLc79BrhyRq2QNnmrzccvq6Kny1DmBkDe6jcL1ylVYKIviCaPFQBw53QTXl7aBwAI+hyY6Asi6HPAZSN4dbUF9882bw25+tYo27YFoCNQ7O82y23j0VLvgI3PWzR4rAh4RQCAQyBoqXfAKRAMXpDgdwu4Oxo2FUndYt9jKFdDafCiVM60Xj/hR2uDE0cfzCAuq6bWUF70FY0glMTCenpLGYEWGDPqQJ0IkWdR5xLMecpRMDklUhSQ5a3fzUYnmspH+ZDfCbuFheQV18fW1Ds0h6lwCk8vBlDrspjyZbPyp6KAjKrMmQUcn19GaHoJj8/vxeK9I3CLHG6//mw8m3WKnuezIAyDoR4JhC3tSxh9suhBXdXRK2Vs1Td16WS3WVCnQOCwEiz8yILSv69XKkdBIlMhIR29tbHtGQ5qJTwTszcGKf2Z8lLX7kYzxlmNYiWjbQsMOQVMZPodr8rPEm8Hxkv2YnfntTMqZz+n+Q534x+IRKZCnCoPJ8f6R0zfZqo6eiVV9HRplG3TWE6CzV1bsGtxQjWrZqJ/TJVOfiO6OksYfZJT4qPFbjM72q5+AT2qGfKykskzAAAAAElFTkSuQmCC';
var sec_LSU_SRC 	= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJHRALEY4s8TYAAAMQSURBVEjH7ZZbSBRRGMf/c3NnZm2931A385KLJZkGPqQ+CIFRhAmB0EuEgQ9BRiFUkHSB6KmQyB6ELpAIQU9SIoiIWRkGW1EoauYm7FruuJd2Z3RuPcjirjq6mvUQfi/DzDnzze/8/3O+7wDb8Z8HYTSQxhfaaIJLBpBKE4yVJplCg6kBAObNfFzT5FFdlx2KLn6ZDo6ORA2YaS6poAjmwMni9jsA4HB/+qsqvXXdf6CpwaeTAfurdQHD4UJgbmkcACBr0pYAMSQbcZ/E5qN3+kYnS3DPvgXsz8PHqOW2MiRfFYJzS+MQFQGyJkHTlS1TTNMVaLoCiqABAKIiIJ0v3ju34JgzU/yET3bPhuaS4S/SBFcUDreVqq0Wy3PnWKoaGdJSE/4sApAiGOtacAX5Atpae1CQLyzZRatobLDjcfsLdDzqwu2b/UiIl1BW6kJbaw8y0n8BAM6c/oCWK4OGkKGrqPnKI0SLAAzbqaspx3EK8nK94Lglu48emUBd7RguXa2Ex2NC1cFpsKyCHbELyMv1wmRSAQDpaQFYs/3rKkkSbP4aCsbYNmqrJC2useHURxyqnsLroUw4XbGbtp0kqGxDBf2y0xWyN9ro7tkFmtJQWTGNwzVfUXtsDOebq6HrKyuYrq+dS5ifhKar3w0BeTrJEw1UYoKEtNQANJ3AvuIfmJyKQ9fLPJTun8Gt6wNITQnC4zEBAHYXCHDNmLHT6oPHa4pih0cqRC+v7NEAXm4eWmwhAQZPOorQdPY9KGpRnr7+bAy+yYSqEujts+LCuWFcbBqGMMfi7r2ydXNzpGXIsFBn8YU2BWjZk3i8fkP/DakhzrKAoEhjfj5izeA5GRyvQBDYVW0Pt9cZsHfSwLXwthdRqH2yezY5Jlv3K7Np8aasnGgBdZ2AJNFQVXLlDlUoiCJj2PaF+UmIqgcO/7t+Mxn70BH8PLBuL84xl9RJungiw1xSj38QzoB91Ta35mkmiy+0MaSlRtR85Yqm2Fg6LsNgagqAnxuFkhSvkybpEY60DMmar9voNLMdfxq/AdmjU8Vdaf4MAAAAAElFTkSuQmCC';
var sec_MISS_SRC 	= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKAxAIIXS+yCUAAANlSURBVEjH7ZZbbFRVFIa/s/eZM0xrLTWTtsTWhwbslYttI5goCcQYBKMxNKE2lUBCFQoPlKjxgURIfPAWMdEYSDAYFdvEgNEYUcNFgwGpJhB0aCsttdhE2pnpSMv0NnPO8qFTmClzClp4Mazk5Oz979t/1lrnXxvu2P/cDLcBs7SuBJWR7eDNE7IKBO88lw2GBTIS3fjk8qQ2gI0MDWFkeQAb0MAsg7E/FNF+w4mci7d90n7TBM3yDQ/b3FMs2r8LyEKcW+ALcfeHM7LbpG9/PLD7x6lDehpybyJONggTBAWYfM/0IbWvrGpHrAydu0Ak2NrmStAsrSuxjbwlov3bESfvGjG5zRkmYJgVghUx/YVdTuhsaHKGSvG0yikT7X8BcQqvhVVu4y8wZW/D2mirghUpTkudnpmNOP5kctXl+ezduYrvTnTz0ttH8c/28e2eZ7j412We3nqAzbVVNNQsAqAvHOXJLZ/xWtMynlp2P5ZH094dov7lL4kMjqbFL4WjCU9K4kRr8TQEfRVAVvLX3eWzWFicR2mRn10fnaKh5gEqy/LJ9HkA+OLY7zxSVciqpXNZv/0rNq2pZOuzD7Li+Wb6B4apeayETJ+H2sfL0uLXe1LNdSUIqsgtrOd7Bnhx/RLqVpYT6Axi6ons6O0b4lLoCrbtcLq9j+ryOQC8vm05x1p7aP46QFfv30RHYmnxNHlZmMIoddDud5OU95p/oWntYtq6w/zWGXTNqg8OnmHzq98wcHmEhtWLOLl/HQ8tvNcVn6I3gPw5DUFj0O3g73++yDsft7Lj/eOpsqQNtJrYxuvR1D9Rwa/ngzy64VNWNx1AKYP78u92xdOIYqdriA3G2gVvBMhJR7LpjcMAbFpTeRXb0biULXXVAHQdauStD39izysr8ZgTpFsOBfj8SAeNtVVp8euFZ/yUuFUSs7S+OK6KtmF4n5uJeJjawD87g8HoGMOj8RviV8MrsRbTubAzueylCLUTOhvWuQuUMAsMNf+/EnQErozEiMWdm8ATxUDiP2gi++xze49PW+ok2Nqhc+cPC55RDFV5a0rbDcqexFo0kX124N2D/+I2Uz/PVgXLBasEjBxQc4DxhE5aSVNjwBCQnXRTAfAkxibbo4l1dsJzPSBhg/EO7fQedbvN3LGZ2j+kH51PbEYQ2AAAAABJRU5ErkJggg==';
var sec_MSU_SRC 	= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJHRAIL2Rgv14AAALZSURBVEjH7ZZPSNRREMc/b/e3rbqroaykhKYZpCIs2IoJlh0kPatBB7GTmnrRg3RIyA5B6mENPKigXjKEIJEuHYyMCpFYMtSsTCHUtE0sXRU319/r4J921d+aRgrh9/KYmTe8729mfjMDR/jPIbQMRQbihcQChKMSISWxGvcXgeNeshvQA6vrJ4Cyfnq8ZSEYQce0FLxrXuH9HxMsVkhHxSZV7AcUpkahp73Jw8utJv2hk1uDDUmQTUE6VIY1CRYZiBcqFw+Y3AaSkHw/Z2DUoTKzodT5RFqSeEjk1iC5LlbJ9lb5EEQlWsv3lM1GVX8/ObW1AJgtFm46HJR0dq5VvdHIFbudO2Nj3J2YoLy7m5CICBKzsqjq7yc8Lg6A3Lq6TZ8dOUpSvWVli/GslqPRbCbKaiUyIYGndjvphYVEJydzzGQCIKOkhMzycu5lZ+NyOknOy8NoMhEUGkqU1YohMBAAS2wsEQkJ/qJ4RjuCkvjdsuAcGeFyZSWXSkv5MjT0u7csLgKQU1PD+YIC3nZ18W10dD+JjtImKJjezftZQwOZFRVMDQ8zOTi4qX/V0sKDsjKWZme5UFjIjd5eTqelgZQ75tEPxrUJwo/dCH7s6aG7vp7H1dU++tT8fCYHBrBnZtKYm4tOpyMsOhqX0wlATEoKRrOZyMRE5td1Gj3xk2YNCsEH/x+3hocVFZt1twFTWBj5TU3oDQYAXnd08KazE9Xjoa+9nYKWFq61tjI3Pc394mJtfoI+pMYkKTIQj4dbSK7up3h0ioLZYmF5fp6fS0s+toCQEAKCg5mbmkKqqlb0OlC47T32fBq1Q2XGpiBROQHE7LmNqSruhQVWV1a22TxuN8sul7/6ey4U2po9vPA76hwqwzYFFxIJJP2Ddryy7V1Bh1Boa/LwaG/bzCoZUmJFchII29oaAdf6j+a9rZh2uOf22nw2av8rgnEh+Cz1PNHaZo7wt/gF+B77kr3QoEIAAAAASUVORK5CYII=';
var sec_MU_SRC      = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8AzAAzFEJywQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sLBw8wGndSx1AAAAIpSURBVEjH7ZaxaxNRHMc/d/fOu9ypxHg2YGy1VmrSwaJUXPoHdJSMiqOrtoO4iDjXYh2kguCmCbg4ughWnBwqHaq1aBHaUmxAqbRpkib3ziFpSOUuuaBGkH7hDfd7v3vvc7/fvS8P9vSfSwmaiNskPQ/HhS5X0lN2Oe33tgp5CXarjaQE9ZfddI0FobKkKXxYy/MxNHWXxXDUZBTwOjFsnYdxm2E/Fs0PblsytF5kslNtLEuGXA8rauJtlZmnWVs7WbmASiYDAQ9bpP8V3M6oFagutfHBlfSEacnd6wlmMynGryUAcKKCmScpnk/0ATB1s5vZTIq+Y0Y9f2eulYoVLjQ+i13/gt9J9ZGhKwz2W6R6TSYzOa5edDiXtLDN6vdapspgv0XEqB7b3qMGqRNmKMCK5FQwoGzSfx99Wipx40qcSyMx3i8WEJry2wemIukObLGq8LWdxR48yzF2Oc78lyJzi4V63PPJ9UKuKVSWAwE1hfV2AKdnNrmfWePOo9Vd8Y0tCcD5AZv9EZWBkya57+WwgJ8DAXWNhXZbMnZvhdfvNnfFRieWefriG49vH2fjzVkOHRDcmloNtZ4peNvUB01B9k9ZxkFb9RJHdE9VwuWbgmxTHwRwLNL7NF512v+EyrRT9eHWcizSAZXc/htwpiAbBNf0NlNyGSlWOFN2ibkesVq+BuRrFqUDEggyOQMoAJGGWAkoaQo/dI0VUzBnaLxs6zazpzb0E1RZOTwpsJ7CAAAAAElFTkSuQmCC';
var sec_SCAR_SRC 	= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJHRAHMG7wrmQAAAKoSURBVEjH7ZbPSxtBFMc/O7tu4kZEbdCINCAWqh7qRS1CPAiCvYSAevQaJHjJzf9AEA8ee/ImLOLBfyCQ3DQXESxtheqhFWwVRIV0/bG7r4daSTUbtdAUil+Yw7yZ99533pv5MvCE/xxa0EJbhG4Roh60ej7xK4+XlbwVlHyI3JfI90Hdylans2MoPusa77+V+Phg1q0WiaYwWUBqMSJ1vG2LkKjERa9E7tKn/+ScxVq18cqn3xOspjDy/YoPVGtrLSsXUMnuQILPLMb/Fblf47pAN1DlE88nXq0VY2NjbG1t0dXVBcDCwgJra2sAhEIhFhcX2dvbY39/n1wuRywWA2BycpLNzU2Ojo4oFoskEonAHOcurwMJVnypZWhubqavr4/6+noAOjs76enpASCTyZDNZslkMiSTSYrFIpFIhMHBQVZWVtjZ2SGZTLK6unrjUwmuz4vyuXHrsnb/6UUvlUoAzM/Pk8/nsW2b3d1d0uk0mqYxPT3N2dkZGxsbVeO4Ps8DK6g0vlZzFpFA29LSEjMzMxwfH5NOp1lfX2doaAjTNBERHMd50EENxZdAgrrGSTXnw8NDAAYGBmhoaKC3t/fGNjU1xfb2NqOjo0xMTKCUIh6PUygUUEoxOzuLZVmMjIyQSqWqEfwUuHifxCilZHl5WXzfFxGRg4MDGR4eFkCy2aw4jiOu64rrumLbtpimKYDMzc2J4zgiInJ6eiqpVOrBr/iODoYN7PukoLGxUTo6OkQp9ZvdMAyJxWJiWdYdH9M0pb29XQzDCIwbNrCr6iBA1GLc1MnXWv8MRSH6U4fvR9RiPKCSl3+DXNjADiJX9Tdz4fHm3OXVlUeLJ7Rc79eB0rVE1QE+EA4IEwIcoL7MdgFc6BqndTr7YYN3IZ3co34zT3gEfgBI6KRwyEi01QAAAABJRU5ErkJggg==';
var sec_TENN_SRC 	= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJHRAMFygOwsQAAALxSURBVEjH7ZZfSFNRHMe/99x7N3dXrVbLFioJrUZYE6kWKD4EofVWEEQS9RL0FCL0UCgR9uKLvQT1EFQPhTEykf5LUCqJPdTCcoqm4Z/cnG1z7m672929Paytu7nNieJD+IP7cM739zv3c3+/c8/vAOv2nxuVTai3smYNg22ExnYNgxKNSt6bHipTNCSJ4gmRtUu9yOkHjBvFlLlQhBoWRGqCF+TB1v7oUN6AVyvZKk6Ng40XVbcAYNrJrzgT0TDAFmTWnrxh7noD5NHN3kjvkoBKuASYyxPXxNjqlI2hU8eFeuDBS7pNEGhbc3ekXanR6WXVaVCdgHN5AD4UB5Pk1dtXkhx/CImP+RBgKpLLnG7KW7aV/tE3Lc0lfIkyUKvGPiXcamYtk6WvXVUhXtJrUZuSbeWggEFJOpyp7hnUW0pTFnJ/fghDxfnkOBYNYuL5ZZSevIegawBjtnPQmWpQXNOC73cOg9txIKsmxiJgaAUsLVmzAnKKPzUR4Oq7DbpAB1PdU8x9fQzPgA2EUYMzWjD59hpCsw5AEkFUG8AZLeCMFsyPdkEWI+CMFoAiObX0TGrV8m4lU0qJOY1sTg/wj72Dd6gTABCedcDn6EA04AIAbN5zHIaKC9AWH0n6ex2dKDnRClZrWFTSXFqyiiq5OCvg7wCcifLmY/yvL/CPv0dwxp6cm+pqhCwK2Hm0aZF/Lg0A3D4gHKEmswJqaMq3nE2+8LMH3sEO8FOf/u1HYQETL+ozZimXlvxogRrNChiKUMPLATSdtaH8yjj21w+CMOrkvOebDb7hVxljcmnxryD9WQ/qBitr1m+Srh87FDuz1j3X7QPsI3Sbx09uKNteykHdNy3NVRYxcoCnCo0GeddagQXDgH2E+iAI9P2Wj9GeJXtxUzV7Sq2WTpeb1iaT9hG6TRCIrbk72p73babBypr1WtSClqwMI5l1Ghgz+bGsbIhGKXdeJORvv5QozIcwI4pkCDHS7+HxOtttZt1Wan8AE/NO3+dZ/wcAAAAASUVORK5CYII=';
var sec_VU_SRC 		= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJHRAJE1IU8pgAAAK/SURBVEjH7ZZNaxNBGMf/M/uSpGv6on31JRYqNmgqFdSUWnoueBNEexJPevEzFD+BiAfFQ3MQMbXQS4t4UNBahCj0YlsTsAiWtE0aktW6Zl9nPKyRTWnIlvQkfWBZnnlmn/3Nf+aZGeDA/nMjtQLX423RoMjbIaAzJPKIJLH+nX04IeCMaIRypd6PNn8CPWFe1WZZNGPY9LtuYOV5qpT2DXjzcutIMMAv3L0t3weA7KbWsBKWDkjB3WNzL4XHmiY+m1woLdQF9MJVwHJFN2Y7+zNtolDtdx0GpmZpkpvSdGK+NOONCTun9VCIj1bgckVAK7tgjO/fumLcfSh1fa0M9EZ4rJBDqa9dWV3K6oVKX+r9MBjgZ7xw+6nabrYz9/mLzp0WhY1526oBRR7xCzc5a+DRjPHPn35j4kFSx9Kqg4knZeSLDAAw9drEwxdGXcjK26ROvCag7KnUespFuig+rTgoqAyWzfF20cbRDgpN51jLc5i226+gcmwUmG8lg0HnVE1AqcmJ+p3WS2dFCBRILTv4vOqgbADD58TGC0jGiSrf66jbdDNXZL4SNSsEsT4BH5dtdB+hiHQTHOugyObZHnbbattSAdvEWk0FFYGoexnt8ICAtTzHYsbB8IA71rDi0nxbZ9BNjvUthmaF+M6p68LXmgpaFs0A/st28LSAUAAwTGAo5qbqP0kxFBOQmDORmAOaFeDmFdl3TpkJqZrij8fboqGwNTEyxG40upbKBoducLSECSghvqY3k6bJ8rZ0z3vsVW3US1m9MHi8iW//cro6O9HbCKAkEoQCBKQO3JYK/NaBLxn+DqacePpBfV93+d4abb1KZPtaf7RxJf1YJk2T3BSnE/PqjO/6Go+3RVsUNmZSJ04kJ6qE0LPrbUNCB7ew5YuE/j0vGYFWxga3hLTMhNQPjb6qdZs5sEbtDzj6MDSkeiuuAAAAAElFTkSuQmCC';
var other_VPI_SRC	= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKAxADMYr9AYoAAALXSURBVEjH7VZLTBNRFD1vOtNCcaaFNhJQMCIIkupCjbhQCQSjCxduTDTuWBgTd8a4cuMaE5e4Y2ViNDGuXAFqVAwm6sKEj3xSJHzEDkVKZ9rOvHddTKFF6ccYS2K4ySTz3n05Oe/ce9+9wI7958ZyOc4FqloswCcB1ZIQe5llNW15UJIMCOF10JgNACCSN/4d45whJkuSQgBngIu4KCNFCQvGljhjIy8i+ljRBK8Gqk7pRM2V0bX7brLUf63SfEX5Ayr3PuyP6G9+9bm2IpckavZGjR4PpXylCKNq2cfjnHv3+300bZqjOQleDlS1JIU4yVb5nXJhVJcy11TOQ2sSovt8vqmwYUY2Mij7UBJoRUzcquCxuu0oiNq4eV3h/Hz2npy9iBP5AtwM5gPpPgN4FKB3wFlfOgHsqQSefQC629MVIYDJb8CT98Dpg0D7IWd/1QTuPS/A0jDaNtXgpoqxrFChoviqA20HgOAuQJaAjlZgLgqUKUB9ABiacL6zIaCzFfg4AyysALs14PFwYRXJshtzEqRkoqEQwPAUYAugrRE4Ug943cDbiYw//B0YmUuDMyAaB34YgCDncoVMJqrLGWKS5SWk7LwAsQTwedZRcXEFCEeA+Sig1Tj+2xccYl8WgZejf56HNmOzINqaoOSSV4sBGZoAbnQBtf7fw9Y7AIzOA2uJjIpS+rWVJUf9vJ1DkSeRTOUIsaKMJZknWojgpzAQTwKMAe8mf1HYzJADgIvHgK6Qkwo9V4q4vdc7nLOTdAQDzbIRv1lrJK5txzOz4HE/slT1bnbb2/RQhw1Tb9A0KU4Cqs0Pl5LcnMv1ijStb1Bffp231U2b5niD32/EQAnVso+WSjnStL5+fflp0dNMRzDQJHPeKVlWi7DtSlh2DSSWIkEqiNwZBGYxicUgyLc+qaQnGgWMWev/xFgCRG7GGE8XwwyTZZ0UZdxyuQZzTTM79rf2ExJ+JX9NJubTAAAAAElFTkSuQmCC';
var aggieFan_SRC	= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJHRADEDHyS6gAAAM7SURBVEjH7ZZdaFNnGMd/Sc4S+xkbTWNrG2MbaltjxzQiSC29CrVFHF0dgylFmcw77ZXozRhDGDJFKhR6ISpFEBSpxhVpGehm1exC3Zil7ZJGLdKkNtbWljbH87ELSTmn6yEO05vhHw6H8z7nfc/v/J/zPO+Bj/qfy2QUCFiptCusVs0U2iTcNgsbMv3wpMxQUuD5NAz0igy+N+AegVqrgj8FZYLK5XRJhcE3KpeuSNxNC6iFS4G5ysrrAURJygiQVRB01/GRyO2oQsxh4cpVkWvamGVxWvNl6lJwrrLy+twCh0eUJGRFyZhjsqIgKwoWsxmA3AKHp8Th8L2dnJx0CkQiMhOpe83aiflQrYUTJSljri2lxWs73OsOOSUatGM6QJuEOwUH0NrRSVuwR3es928F4OCFLo7c+Jk8pxOAEt8m2oI9NB09BkB2QQGHu2/S2tEJQMWOOtqCPaxyuwFoOnqc1o7OBcjUeczENmNATaWKkkR/10X6zrZTXFVN7O9hetvP8DIaZb1/KxW1OygsK2fz7s/ffVc5ORRXVVPbup88p5PtX++jxOej0OsFICvfTnFVNYJtxTu3SksXYlonLSa8hoCLqzV8/x4Dv/QBMB4O86Svl5nEBP7mFl48+Ys/em7ib27RpWni6VPqD37L9r37iA0P//eKVik1BIwqxFLpNZJgs1Gzs5GxoUFejY6ypmIDazduXIj3d12k7sA3jIfDxIaH9M1kCRqtns3NYzIxagjoMfM63RtuCjSwIi+PEl8NNTubeJuc17kYCT3g1/Pn6G0/o5s3k0gAUFrzKdbsbFxe78KYrsJVwoaASZmhdP1uS/MXPH/8iFONAU41BnjY3c1nu3Zj0fS24IkfGPk9pJs3EnrAw+vdfPnjSU78OUCW3c6t0z/9a/0ilZBhow5YqZRkvtvsWffVcrUWW24utpwc3oyPo2pS/GxunkQ8flmw8L1229M16ojMxJZPUNWpKVeWfaVnOQBlUSQ5O6sDm5IkovH4nSIL54Miv6Xdi1usNL+S2bPK5Vo2J7VKxOOXl9rm0v7NOCUaxkxsm1aoXGmmKJNQrxXG8s0MFqmEXgrcMvqb+agP1T+2pTRnXz/1XQAAAABJRU5ErkJggg==';
var sec_SEC_SRC		= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJHRAJNPceR/MAAAOBSURBVEjH7ZZPaFxVFIe/e997MzHjgJNJozGatDRtxrRgNJUgFrFCS0xBm0BLG+yipRQVtboQgi6qSCm66aaULkRBKkSkotJFXRSV1tAmhEq1SSedkDQxpk2TTpJx/mTevHtdhAkzaV5eiuBCenbvncs53/2de889cN/+5ybcHIHQmogURrlCViBFtbCsuiUXapKgA+4ZXFOgbTuK0iNouy8ZH7q2YsBgWe1mJY1NW45cOAZwq/+KaxLHcdBKue7fNAyQYlmV+r8+dFLo7FeJmwMXPAEL4fJgU4O9ANjJxF3Blc4hhXlPZbMCwaLv8NpGfv/yjU4D/U3yzsC3hT5jcVm1YT2fh5sa7CUdH8dOJlB21qXCCiGkK4xCIRbpoOwsys5i+PwApOPjBKuf3pia+CNuWYFBOzM9mV9bHFlY9YVwbqoVmpd6Enf4xbFDT7S+huFrLvxnLspW7QXnM3N07DnHtk0D+EyH2F9hDh1vpTI8y6cHzyysS8+ZtB7eT0tTH2++8iuPhmcYmQjx8amt9ESriyCtQHAhl6NocgUUiDq33eVt79ZeDrR08+rRdqZmS2lp6qfUn6XUn6W+5hafdG7h+lg5jiN5cu0YJ94+zZmLG/jg85d4pm6U2qrJIsC7cglR6wqopBXxKmtqzgLg/fZzdF2t4fuujdyYKKMyPAvACw0xGmrHiI5WYBoKIaDjs+38nfZzOfaY5wXSsuRxV0AnN3czX1436/zpKUxDsb2pj/YXL7O/uZu2D/ct+K8OPcLo7RDjd4I0rvsTrSGTXdktj9/oRqjMaPEZLrz+Uk57BWnbfIXoSAV7juzl4LGdSAlV4ZkFf3e0mh976vgtVsXF/hqkhNdf7qLEZ/Ns/TDbGqMeEuqYq4IaHfUCfOjBDEcPnMIy55vzD10bONsToXH9/MZPvnN6/ihkLCL7Ojj+3XO8teM87+36mUTKx7sndiwb35Bccm3UgdCaiCN8h1c17Nq9fBBFWTBFIu0nk7W8G7PhEAqmmJoN4CjpWt5cfLjT0NmPCp+9okZtZ6Yn/Q+EdWp66OHS8rrV7lUQpOZ85BxjRWdLaUky40drsSRYZmYMe3r4FxP9RTI+eN7zLQ6UrW9zEDvN0Ord/8XEkosPL/nMeU4zGL5mR9GUEyJiyJLKpeVUqxDy9r1COSozbmp9zZBcwsmedZtm7tu/tX8AFVt/yhh7soQAAAAASUVORK5CYII=';
var tshirtSipSRC	= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAUCAYAAAB8gkaAAAACmUlEQVR42tWUy08TURTG+WeUR2s7JSq+gnGBC02MC3XtogkLdxaNhDRtpy0SlCYqC1Ex8VEfUYzEakhMIfIQqjBlWgZqbUuLKHTRFhBN03bm885UaoulDlIXnuTLzcz9zvndc+/cqagoEdH5eTU78hoT/S8QmQ2glNc/NQmfhynpyQXrGsJw7130d5vh7GjEIH0c7/UHwbXshK+lFiPGI3DeouGbdBUUHOq5gQGbVvIyLfsxbDyK/staqc5bxwN4mbHCBXhHnehr3I65C9sQ1Vdiia7BinUHEYUlogTRskWFBX01uHPVcOnUGNNpMNmkRLi5CjGTgsxTkn+F+JZoBalThcD5SoyfrUHU9ewXcHrMCZYkrrZqELdoECsi8X2CaFks2Erha2t2TFiL50h+MrdsViLl7smDkc7cTQqSrCYmSjJuBJWrbA2KdK1EsgDmGsA7nQpxsxord04jw38H0pm/BiUB8MIqEve1WDQo8Y3J28ZPQR+GrpzBjO0E/BcbEDbvwwJdi5QAJHnIhqQgICmkpdyweS+pdRjejlOIcW8KP5LPkRCC7hHMDDwB+7gd7ksn8cVUK20FYWZD4JEfgjiTSeWexTNaNFHwtB3DhN1Kaj1FiB3983VgHrYhbNotba24ap5PY6MQeEHyiLA5gwYTt5sRCX6Ud+fE4Ho7EabrCEwlFcqAl8b1IS3k57gG89pN8kFZ2DXSWV2uszUVdJThC+bWYB67sTyw1HRfDha3HSonbM9vsPzu1r/fAqxzC7B/cGbrgWU/s1L6P2BTz69i1rgLcfIjjdEqWUqQOxnRq+C5Z9gcjHXchJtugJ8+AL+5XpYClnqwhnowj9o3B4tw4+BedcPnuA7fyy5Z+kDEOboQYgaLwn4AGVAnkUyPrDUAAAAASUVORK5CYII%3D'
var theifSRC		= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAUCAYAAAB8gkaAAAACGUlEQVR42u2Uz0uUQRjH/TP0EN0ED106SHiRqLCiSBDCCjx0CMGjCN76YQTtIqa7JUWBdQmR1oM/8c1DbYfoUEs/1FBYrUOx7mosuu/MvG98e57xB+/GzLgduogDDzPvzDzzeb/P88xUVR20/9m+Lcxj/k0as08e4XlXJwZaLpTZ4KWLeHy1TRuP2VK3buDt6Auwb8UghrAjH5o4XK+tv6UZuZUVlEol+L4PSf3sQP/uetT4B/iMikCs5O8DctkshCBIKBFKCREqbKyvYTp21wi8fu6sVukMnQnEJoWAJMjOd29dPYIwRJGApv07Cq0h5fzYHBkU0uFRGH+X8gWrD9vUvT4zbKij3eokhKIQBog3nUCgfm8pUwrFQgFeMomF9GujX8/lVjOs7/wZh7IAitTFm04iCJSGKeqLa3l49xMEe2X1NcJc4ZBCkpJQV2VAxRE/fYqgAT5OTuDlgyS+UmGZ/Fprqs2wm3SQDfZuZFjnTUhFCimkFMLM5Lhee59KWcNoVfbMkTO2jOdhU21V5c/l7O78Z5o3wXoOHbHnjCvHBWN72HaFYKps7tOMZ1VmrUa+E/wnLliMcuUTbH01h1/5VV2N/sYmZgYTxkp0Pl1862PHGpzAsTu3sZz5gO9zX/BjaRHpp0NloeP+2vFG9wsSBXKx6JhvOxvvUGStbEyKKgJFQ8rxZsfu2qN75pL38F72+adXf1+0P9r9685J7fk5AAAAAElFTkSuQmCC';
var caneSRC 		= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAARCAYAAADHeGwwAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIzSURBVHjapJVNaxNBGMf/sy8lrY3BCiYhIcnB2kA8eCjJB8hFAyK9esjJiyD4WTxID/oRBE8pgoRCiUjitQuhB4khbQwk6LppE8xm13nWzGZ37VpbH1h2dmfn939e5plltm0jxJ7g8vY6+EI5B1rh1ya/8oZhKN1u90JqJpNBNBo1F2v3vELMEwHBn3PoXQHtdDqXcj+Xy6FQKBzy4QshIgR8cAEeDAbOfTabnQtUVdX3HI/HEYlEUC6XKZqnJCJSVPHCLwILE/OyLIMx5q7TNE3hkVREDcj7h174gw8vET0dQrJMNLcqOEpv+8AEo8iPhwO82n+DOR+nNm7h2f3Hzlyj0aC67PC67Em0gIrp9fza2TesT3WsTQ2smJM/PBd1M6059MkYxvQU388MWJblRtVqtZy7I+DdKfTBnMlwEBKDxaTQFDHPWJYkR0CYYErhu4WRqwHMv1u/318KUOVFen6jmYtl4Y0YaqPRCMlkcimQSCT8vtsUqk3VxMwKB6mK4nMq2HyugHgQBbIlDndEGG4aXxeC/l1EdsJ3kZiZmj993xSLxaUA305vs9msO7m/9QjHG7cxUVexOdSw3X6H1OgzIhMd4/EPHJ18wcHhJ7zXPmJ9ZRU31q7jXuqOm55SqeQwg528W6vVlF6vd6WiEpgsnU6jWq26nRw8i3br9brSbDavJEKee4+J4GHnnqa88XaoUdrtNnRd/ys0Foshn887OV+kJfQ0/Z//QOg/4ZcAAwCgnRI4iqwhtwAAAABJRU5ErkJggg%3D%3D';
var UTA_SRC         = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sLBw87OEHGX38AAAL8SURBVEjH7ZZLTBNRFIb/zqOdlr6YYAvFVggYKqngo4gS0rAxIboiSmJkURcujImJ7k1Ety5MDAEXGGIiEV0owZWJKCoLCE0URAsIEhChSAVKaZnpvFwYYkuY4oNAYvh3995zzv3uuTPnXGBH/7k0agt2n9+tEHSWRNI2iWRcAmUsWs+bkKWYTJAZG20kywCxZjdaXB6mJG6SFOIfZ1/fG/ptQFvV+cqE1uRddFXd2oosZUwH7hhXZlpnXzZ3r10jtxsOAASTwysleIPV6Vbi44GgKqDd53cndFbfVsKtSjTaPZqVxQU2J38sNtEfXp0nUoxoQ/F2wK0q5vBe4Bm2OnmOSh5IJONKF6Cxbj8qClicaurD2FwcN08Xo9CWgZrGPjy5WIb8LEOK/aUH79H9aR7PrhzFLqMOJ273YCbCp4XktGx58jglg+v+qUkyaAmUOi3Q0z+/jPwsA/blmAAADS/GcePpCEqdFnyYjqK+YxgjoRgq97I4XmxDUbYRdeW7N75qxlqoDshY3X97PZ1DYXT0hwAAwZko2t+FMBvl4T/mxNvJCB4FvsJf4dwYUGdxqgISiXgonbOirDenqNrraQK1XgcGpiIYD8fhyTXjkMuSFpDiI19UAUk5sZjOOcpJAICyPCuMOhLFDhO+RROq9jUHc2DW0/DusaL2sAOcIG2YRYpbHFUFpMXl4XTOlx8OorVnCnfPHUC04SQyDTSutgdV7f0VTvR+XoCnvgue+i7c75nC2SO5oEnVBgYmMd+r2knsPr87Yi68xmWXnEkHamYomBgKMxEOsrJ5ZYYJDbRZlkavJ7e9lEIdm+gPW51uRVRgl/RsnlogXpQR5URsIhuo72OvzLGJlrmu5jdpW118PBDMdBREZT6uiEa7J7XjiwI0BLnZBZoJDbSZYxMt4c6mx3/0muEZtpqjLSUCoWUlUs8C0ECjISEJMWgICgRBQ4EMgmTWDUKQOsjiCghK/+uQEg9Z4kmZj9BCfIoRlwZ1/MJztdfMjv5VPwAOqhv5jcFymAAAAABJRU5ErkJggg==';
//credit to crewez of TexAgs for creating the tard tag image
var tardSRC			= 'data:image/gif;base64,R0lGODlhIQAUAMQfAMQIAdmEgMVGQME2MNR0cMlVUOzCwIkIAa0HAM5lYPrw8K4XD7oHALknIOiysN2TkL02MMOSgpxJO6sHAM2zqOXY1vbh4OKjoNrIwMUNBsJJP6oGAIQJAbEIAP///////yH5BAEAAB8ALAAAAAAhABQAAAX/4CeOZGmeaKqubOtWGBVpdG3fEVWp2KxlAGAwQwQMiUgNBtX7ZTrQDgOBmECn1WgnI6GYKrPnoqDtIMrnDsQQ1exIlJ85wNYyyveOwBPdREoRTwgDFgoPHQQGBgQdCRcODwsPBhd8HRsbEiVyHQsXFQMBCgQPHqEeDgEXFgEWfAiYCyVEUXQdAwUCBB4ColAeCR0Fr5gcJRJatgkeFg68th28t8QcsiQaUGe2BocDz3UKAY18ExscmiQRl1Z7DxcKDoUB0MsGCh6w5n8kFRKYEwgKJJhQgECDAQMaQIgygMACAcUkvIGTAZPFfwjuYLxDxdw5LycoSOBAsiSHAyhLFqI8YLKLCjAjTcqcKSHCRBc4c+o0EQIAOw==';
var bobcatSRC		= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKAxM6FiM1hwIAAANQSURBVEjH7VZdaFxFFP5m5u7N/jZNsrE2ze6WNml+bKHWtknbCEWKBgQtKL5InwqljyI++uKzD30tFOyDBIIFQQQRCSVirFQLJlayjXQle5t2m2yz2Zvduz/3zszxYdvYTbJ1tRhBep6G+fnmm3O+c84Az+x/bqzRwnAs1s8Za+XADkbUDSl7N93IeQlaB2toTAIAiIy1cc2UBgqCcx8ABUCQ1n4YxjwBSwqY/cGybjVN8EQ8PsKBvm2Od8FHXuTf9lLWNC6ylpaxqXR6av2aaEQuUpQfm/BatyKMIaUPO0oGE9EoWbadbEhwOBbrN4DhYJl/6KfKjq3UWoiw3wGtdLe3pxZs+8Gagh7fZDA26C+LDwLaif0XCdHpyvMG0Wgdp3WCbDWpGl1/8NS7BxFpD9TNOXYFwUgLJsamUXZcvHrmRawsFvHj17/h6Og+JAY6wQVHPutg8rObOPHm4AaMa18msTifr5vTlcpQwxAnQqEzYemdXE+wUnKRvWNj//EE7qVySF63cPvnDAaGuvH87jZEu7ZhV08Uk1duovdQF1461YOr479g7qe7MP0GVpaKWF0ubcDIZYqQrqq7qyi9ykK1emlTD2rX3bOZ6++lcmC8lvD5rIP0bBYAMHnlV7x+9jC69nZgYmwapdUqpFe78OjoPmR+zyE1k0EhV0YhV94UY0PWEtXJi9eviqW/oxm37EFrqhU6TwMA5m7cxfdfJFEteeg7sgtvnB/Cc7Hmi4Fi7E5DglyI1WaBuGA4+c4BLKbzSCeX8PJbL6Al4EPPwZ3ILRbw1Sc3MDE2A8YZwtv9TRPkpnm7YZLAMG65wIoJt+2vgI681otIewDffDoNrTTefu84Rk4P4H46j5HTg+Ci9vbUTAbzs80Hhvv91xt2kmPxeB+vVt/v9NS5p+qfnMEf9MGtyrXQN9VRBBvXgcBHj7e9uixesO3lREcHd7RCSNOBf8yQAOkq0EN9NmP3tfxWhMOXr1nWd09sdZZtz+2ORksO6UpI06GtKNBZwcZFOHx5yrI+b/o3cywe7xVErzAp+7VSbSTlTjDmaqUiIDL/RGAeF6JASrUSoNijRxP5wJj3aEyMVUBkMsbUw2RIcyGWYRhzkrGrjX4zz+xp7Q9RN2jzx+bybQAAAABJRU5ErkJggg==';
var cubSRC			= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAUCAYAAAB8gkaAAAABFklEQVR42mNgGAW0BI9uXP//8Vr3/3drGEjCID0gTLRFMA2kWkSyhdsmM/6f0gLEzQxwPBmIby5i+P92NQQv6ICITYbKP1oGEb8wDyE2q5Xh/5O12v/x+gjkMgZHTCzowfB/fgfE5dcWoso9WQ4RB1mILH57jtR/UHTgtmw1A9zCy/MRQfN8JUQM5EOYGIiPLRiNwlGDFKtlYAU4LHsBtWzbZNIsA6sj1TKDMIb/KoFohlDTMmyYqpa9xeGz16sgYmVldLAMJhachsp/tBzTMud4IiwDpRxcll1dABFb1IlqGbagRRbDmRpBEmv6cMfXrimoBsOyA754xZnPIEHJSHYxhY6frNUhXGRRwyKSC2OaFsLDCgAAqWbSuLT4+tQAAAAASUVORK5CYII%3D';
var cubGreenSRC		= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAUCAYAAAB8gkaAAAAAm0lEQVR42mNgGAW0BI9uXP/vHM/wn8GRdAzWRywAKSbXIpIspNQSoi2kpkUwy0DRgd02R+paht93NLAMjPFZ9mELPxwjayqrZAdjGHvLdG4UOWR9VjHMhC0DGQAzEKQB2UJCliHrQ5bDaRm6b8j1GVHBSMhnMAuQLcbmMxQLyYkzQvGJLAezGGdqpG8+o2cJQk0LSS6M6WLRsAAAuEzFWLGk764AAAAASUVORK5CYII%3D';
var sipSRC			= 'data:image/gif;base64,R0lGODlhGwAUAMT/AP////r6+vTw6+7n3OnezuPZ1+LTvNzKrtrJwdC3kM23qcmsf8SicMKih8DAwL6ZYriQU7aMWbGEQat7M6p4LqZyJKVuGaBpFpd1TIlgKXxdN3xQEnRSKAAAAMDAwAAAACH5BAEAAB4ALAAAAAAbABQAQAXMoCeOZGmeYkNZ1yIQAAQBl/ECzMVe2Klgm6BwOMQoUB5EIxKhOJ9QZwRxilhYD4ABN6sBYLnLZdNDms+ewnK1u0RoYvH1GimUnCwJbMCACGoLbnBiGyUFGHGJcQaBiWR2aJGSkycFCApLTJqaDQqQJ0pNbBcVEHFzFhRGJgpNeRAVOhEXEhMQEzpXFw0lrjUGEgsyNAYGLX9xGSUYugkLFQcGMxbFLQNxG8okDW0TTaSzjN/YvCUKFIqJtdgbGkcoahgcREIcGA2flJEhADs=';
var specialSRC		= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAATCAYAAABhh3Y4AAAEu0lEQVR42s2VeUyUVxTFp1FaaG1RhA5obFisQVtQ0boEERMbVMTWKu6lQoWgLShoVYJVFNC2irHFUBsZM0GFiUIBwYV9GVBgQAeHbQYEWcOAjAuIiEV/feGvxiW2/ad9yc37vuTe77x77nnnk0j+b4uuLikdtdBZBl3XwFAC+iLoEfvdCgb1FTzoazn37wHK6hlMzMAQdwa9LIqW4wE0xqynQb4ajdyD1syN9Nbto6EqnOzS/cTkHkBWLOeyqhDt7U7+Hkj74FRSVRi27aVp+Wd0B6ykPciFzlB7mg5IUUeZ0HvVUXS0kN4nn6O8v47I2mX41KxmaYYXG2PDCYlRkJbf9XpAksvo2R1NvrMbuTMnolthR/OmsTRul1CxS4I+ScLDWjP6+u2pZTY7K8bjpXXFQbkAu/MbcIoMx9n3N7w2Z5GSOPBqQJQ36A/YR+m8JVBbD/XFlPjYUR1oTOF3EgwZxgxpjekzWNA0NAcNmzlHGAuveyKVe2F6aD8W/nHYeFxioWsJYX7NNCt5OWDfcTlN891ImWAN7W1wr5bkLRPJDjZGq5hIS+kkWm9Z0vFkBjEqa76+Ys+GivVY/+qBVdgWzPwiMP8ijqmLCnGfVobX5BzOBmvFoZ8DRNeE9tutpI8fB1cuwp0u6G8Us0mAvhihwmOAjMdE0cB+/NOmU8QVstExJfBLKp89o64fCquhWQOXQsDvfQU7Phb1Vc+DVWnIXexKjqMll+dPEh9vggEN8SdmUZy1SAClMEQOl1sj8JK7sCrBnTxukjc4wJTlfhiewh+PYZnLnuFORDpbR8sItDwBqufBygtJmCpFt9YGlY+96KhSVBRTmu1IcdEEHvEDPSTSTgnXhpS4/byKTPGmFN04LNvF3UGR3gtrHPciUiALgsYcI1j6E1z/Cxh320LQlqL2X4Da25TSbRZiXomiQkG3fjE17TPI7PAk7laQUKBaHLQNp1BfsgXA1Vb4xOUgjx6J9HsQsiAW8sXzSTgsPcmPttGIkuc669Sgi1rL1cB3UB8cxZDOR1SEi9jLHSKoIFqQmEgqBYRWJzNh8x6yOqCmHNwdTgwDcV9EnojzcMO5GtmIWC7MTn0JjfpqOtNDKY+0RCc3pSrbiiyVLXkPPNmpms2SjFm4K79iZnwg5kHbsFlzimlz01hlV4CvTTIIYVAHOywikEkTSB+ZyIW34ukIFrOveYn8aUmlNckV3e+jqdWMoWRgMrtbrZlTaoWL1oMP0zZh+n0EY1fECeqUeE6pJsiqjp3v5iBkOTynBHMFF42SyJcko55WIJT9invGw0pxaSPRV3pws/kj4ntscVObMve2cAiVD0aH/HnbOxb7RcW421ezRdpA2Hv1HBxZxBETBafN4kkxSuDiG2dQjr8AUUNwm1cbtPAiDN0K8tv88c20xrnEiZnl3piE+TNq4xE+8EjGySEb33Fq9phUEjaijMOSXBLfzCBlhIIko5MUTE9hIPr+MK2v9cfBp20hjVzibPePbG8Ow/roSiy8ArBdehT7eTF8Ov0s68xkfGN8igBjGRFmp5GbnyFzchKG7cII0gWlLYT8o9+MnkZxP9vQPO2i9SHeL86YEEHTL8N7E8oXbOm/XH8CnzDhujSvTQIAAAAASUVORK5CYII%3D';
var agSRC			= 'data:image/gif;base64,R0lGODlhGwAUALP/AMivreLY13QjH1UaF4pEQGs3NGZBP6JraNfEw3onI1oxMINaWLeQj/Tt7f/+/sDAwCH5BAEAAA8ALAAAAAAbABQAQAS18MlJq72SkZREak4nHA7ANIAnCMsFLEMsz/MCYA/CHAfh/0DfAXE5cASMB4MRYAgAgQ3DsRIMWris9tHsHavgFYdzCFR8IoQpsHIsRkvwoBJ4h8MJgnxh3vr/gBcBajs8hoYMUDg6PRsiYGN5NhYAXh08YAQAlZFIFV4rBw1NK6QsTlUFFQtHBA4ICA56DQdIsVUDqhQMIqaiHAAODg2oVkkVAHp3yzEGNxhNCwo0MgoLTIGBEQA7';
var staffSRC		= 'data:image/gif;base64,R0lGODlhFAAUALP/AP////v7+/b29u7u7sDAwN/f39TU1MjIyLi4uK+vr6enp6Ojo56enpWVlYWFhW1tbSH5BAEAAAQALAAAAAAUABQAQASVkMhJq5UHqYUAWsawjI1yGYyjqs/jHJdUGBmSJAhyGNexcYBDwgBILBqORmy5NNg2us9CoUAUKrYRpxAAELSNR6WQaDBGisQm5boy3/C4jHao85aFzI3Kx90pTmoLAwECAAZgMBRPCwmFTlpHSos/OiMHHgspDhWIZyAAAAGeDg8IFigNZgysSC6KFwUIYS0OCW5ySxEAOw==';


var url = window.location.href;

if (	testThread.test(url) 
	&& !testReply.test(url) 
	&& !testPost.test(url) 
	&& !testPM.test(url)
	&& !testEdit.test(url)
	&& !testTopic.test(url)
	&& !testBCSTopic.test(url)
	&& !testBCSThread.test(url)
	&& !testForumLinks.test(url))
{
	var thisAnchor, userLevelImg, userLevelImgLink, userName, agTagImgNode;
	var insertAfterThis;
	var allAnchors = document.evaluate('//a[@name]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	console.log("num names: " + allAnchors.snapshotLength);
	var line = 0;
	var found = false;
	for (var i = 0; i < allAnchors.snapshotLength; i++) 
	{
		console.log('-------------------------------------------------------------');
		
		try
		{
			thisAnchor = allAnchors.snapshotItem(i);
			// make sure the anchor we're dealing with is a user name and not something else //
			if(thisAnchor.name[0] == 'r')
			{
				userLevelImgLink = thisAnchor.parentNode.nextSibling.childNodes[1].childNodes[0];
				userName = thisAnchor.childNodes[0].innerHTML.toUpperCase();
				insertAfterThis = userLevelImgLink;
				userLevelImg = userLevelImgLink;

				for (var j = 0; j < sipList.length && found == false; j++) 
				{
					if (sipList[j].toUpperCase() == userName) 
					{
						var sipTag = document.createElement('img'); //thisAnchor.childNodes[0].style.backgroundColor = sipOrange;
						sipTag.title = 't-sip';
						sipTag.src = sipSRC;
						userLevelImg.parentNode.insertBefore(sipTag, userLevelImg.nextSibling);
						found = true;
					}
				}	
				for (var j = 0; j < agList.length && found == false; j++) 
				{
					if (agList[j].toUpperCase() == userName) 
					{
						var agTag = document.createElement('img');
						agTag.src = agSRC;
						userLevelImg.parentNode.insertBefore(agTag, userLevelImg.nextSibling);
						found = true;
					}
				}	
				/*for (var j = 0; j < staffList.length && found == false; j++) 
				{
					if (staffList[j].toUpperCase() == userName) 
					{
						var staffTag = document.createElement('img');
						staffTag.src = staffSRC;
						userLevelImg.parentNode.insertBefore(staffTag, userLevelImg.nextSibling);
						found = true;
					}
				}*/
				for (var k = 0; k < specialList.length && found == false; k++) 
				{
					if (specialList[k].toUpperCase() == userName) 
					{
						var specialTag = document.createElement('img');
						specialTag.src = sipSRC;
						userLevelImg.parentNode.insertBefore(specialTag, userLevelImg.nextSibling);
						found = true;
					}
				}
				for (var k = 0; k < bobcatList.length && found == false; k++) 
				{
					if (bobcatList[k].toUpperCase() == userName) 
					{
						var bobcatTag = document.createElement('img');
						bobcatTag.src = bobcatSRC;
						userLevelImg.parentNode.insertBefore(bobcatTag, userLevelImg.nextSibling);
						found = true;
					}
				}
				for (var k = 0; k < cubList.length && found == false; k++) 
				{
					if (cubList[k].toUpperCase() == userName) 
					{
						var cubTag = document.createElement('img');
						cubTag.src = cubSRC;
						userLevelImg.parentNode.insertBefore(cubTag, userLevelImg.nextSibling);
						found = true;
					}
				}
				for (var k = 0; k < tardList.length && found == false; k++) 
				{
					if (tardList[k].toUpperCase() == userName) 
					{
						var tardTag = document.createElement('img');
						tardTag.src = tardSRC;
						userLevelImg.parentNode.insertBefore(tardTag, userLevelImg.nextSibling);
						found = true;
					}
				}
				for (var k = 0; k < theifList.length && found == false; k++) 
				{
					if (theifList[k].toUpperCase() == userName) 
					{
						var theifTag = document.createElement('img');
						theifTag.src = theifSRC;
						userLevelImg.parentNode.insertBefore(theifTag, userLevelImg.nextSibling);
						found = true;
					}
				}
				for (var k = 0; k < caneList.length && found == false; k++) 
				{
					if (caneList[k].toUpperCase() == userName) 
					{
						var caneTag = document.createElement('img');
						caneTag.src = caneSRC;
						userLevelImg.parentNode.insertBefore(caneTag, userLevelImg.nextSibling);
						found = true;
					}
				}
				for (var k = 0; k < tshirtSipList.length && found == false; k++) 
				{
					if (tshirtSipList[k].toUpperCase() == userName) 
					{
						var tshirtSipTag = document.createElement('img');
						tshirtSipTag.src = tshirtSipSRC;
						userLevelImg.parentNode.insertBefore(tshirtSipTag, userLevelImg.nextSibling);
						found = true;
					}
				}
				/********************************************************************************************/
				for (var k = 0; k < sec_BAMA_List.length && found == false; k++) 
				{
					if (sec_BAMA_List[k].toUpperCase() == userName) 
					{
						var sec_BAMA_Tag = document.createElement('img');
						sec_BAMA_Tag.src = sec_BAMA_SRC;
						userLevelImg.parentNode.insertBefore(sec_BAMA_Tag, userLevelImg.nextSibling);
						found = true;
					}
				}
				for (var k = 0; k < sec_ARKY_List.length && found == false; k++) 
				{
					if (sec_ARKY_List[k].toUpperCase() == userName) 
					{
						var sec_ARKY_Tag = document.createElement('img');
						sec_ARKY_Tag.src = sec_ARKY_SRC;
						userLevelImg.parentNode.insertBefore(sec_ARKY_Tag, userLevelImg.nextSibling);
						found = true;
					}
				}
				for (var k = 0; k < sec_AUB_List.length && found == false; k++) 
				{
					if (sec_AUB_List[k].toUpperCase() == userName) 
					{
						var sec_AUB_Tag = document.createElement('img');
						sec_AUB_Tag.src = sec_AUB_SRC;
						userLevelImg.parentNode.insertBefore(sec_AUB_Tag, userLevelImg.nextSibling);
						found = true;
					}
				}
				for (var k = 0; k < sec_UF_List.length && found == false; k++) 
				{
					if (sec_UF_List[k].toUpperCase() == userName) 
					{
						var sec_UF_Tag = document.createElement('img');
						sec_UF_Tag.src = sec_UF_SRC;
						userLevelImg.parentNode.insertBefore(sec_UF_Tag, userLevelImg.nextSibling);
						found = true;
					}
				}
				for (var k = 0; k < sec_UGA_List.length && found == false; k++) 
				{
					if (sec_UGA_List[k].toUpperCase() == userName) 
					{
						var sec_UGA_Tag = document.createElement('img');
						sec_UGA_Tag.src = sec_UGA_SRC;
						userLevelImg.parentNode.insertBefore(sec_UGA_Tag, userLevelImg.nextSibling);
						found = true;
					}
				}
				for (var k = 0; k < sec_UK_List.length && found == false; k++) 
				{
					if (sec_UK_List[k].toUpperCase() == userName) 
					{
						var sec_UK_Tag = document.createElement('img');
						sec_UK_Tag.src = sec_UK_SRC;
						userLevelImg.parentNode.insertBefore(sec_UK_Tag, userLevelImg.nextSibling);
						found = true;
					}
				}
				for (var k = 0; k < sec_LSU_List.length && found == false; k++) 
				{
					if (sec_LSU_List[k].toUpperCase() == userName) 
					{
						var sec_LSU_Tag = document.createElement('img');
						sec_LSU_Tag.src = sec_LSU_SRC;
						userLevelImg.parentNode.insertBefore(sec_LSU_Tag, userLevelImg.nextSibling);
						found = true;
					}
				}
				for (var k = 0; k < sec_MISS_List.length && found == false; k++) 
				{
					if (sec_MISS_List[k].toUpperCase() == userName) 
					{
						var sec_MISS_Tag = document.createElement('img');
						sec_MISS_Tag.src = sec_MISS_SRC;
						userLevelImg.parentNode.insertBefore(sec_MISS_Tag, userLevelImg.nextSibling);
						found = true;
					}
				}
				for (var k = 0; k < sec_MSU_List.length && found == false; k++) 
				{
					if (sec_MSU_List[k].toUpperCase() == userName) 
					{
						var sec_MSU_Tag = document.createElement('img');
						sec_MSU_Tag.src = sec_MSU_SRC;
						userLevelImg.parentNode.insertBefore(sec_MSU_Tag, userLevelImg.nextSibling);
						found = true;
					}
				}
				for (var k = 0; k < sec_MU_List.length && found == false; k++) 
				{
					if (sec_MU_List[k].toUpperCase() == userName) 
					{
						var sec_MU_Tag = document.createElement('img');
						sec_MU_Tag.src = sec_MU_SRC;
						userLevelImg.parentNode.insertBefore(sec_MU_Tag, userLevelImg.nextSibling);
						found = true;
					}
				}
				for (var k = 0; k < sec_SCAR_List.length && found == false; k++) 
				{
					if (sec_SCAR_List[k].toUpperCase() == userName) 
					{
						var sec_SCAR_Tag = document.createElement('img');
						sec_SCAR_Tag.src = sec_SCAR_SRC;
						userLevelImg.parentNode.insertBefore(sec_SCAR_Tag, userLevelImg.nextSibling);
						found = true;
					}
				}
				for (var k = 0; k < sec_TENN_List.length && found == false; k++) 
				{
					if (sec_TENN_List[k].toUpperCase() == userName) 
					{
						var sec_TENNTag = document.createElement('img');
						sec_TENNTag.src = sec_TENN_SRC;
						userLevelImg.parentNode.insertBefore(sec_TENNTag, userLevelImg.nextSibling);
						found = true;
					}
				}
				for (var k = 0; k < sec_VU_List.length && found == false; k++) 
				{
					if (sec_VU_List[k].toUpperCase() == userName) 
					{
						var sec_VU_Tag = document.createElement('img');
						sec_VU_Tag.src = sec_VU_SRC;
						userLevelImg.parentNode.insertBefore(sec_VU_Tag, userLevelImg.nextSibling);
						found = true;
					}
				}
				for (var k = 0; k < other_VPI_List.length && found == false; k++) 
				{
					if (other_VPI_List[k].toUpperCase() == userName) 
					{
						var tshirtSipTag = document.createElement('img');
						tshirtSipTag.src = other_VPI_SRC;
						userLevelImg.parentNode.insertBefore(tshirtSipTag, userLevelImg.nextSibling);
						found = true;
					}
				}
				for (var k = 0; k < aggieFan_List.length && found == false; k++) 
				{
					if (aggieFan_List[k].toUpperCase() == userName) 
					{
						var tshirtSipTag = document.createElement('img');
						tshirtSipTag.src = aggieFan_SRC;
						userLevelImg.parentNode.insertBefore(tshirtSipTag, userLevelImg.nextSibling);
						found = true;
					}
				}
				for (var k = 0; k < sec_fan_List.length && found == false; k++) 
				{
					if (sec_fan_List[k].toUpperCase() == userName) 
					{
						var sec_fan_Tag = document.createElement('img');
						sec_fan_Tag.src = sec_SEC_SRC;
						userLevelImg.parentNode.insertBefore(sec_fan_Tag, userLevelImg.nextSibling);
						found = true;
					}
				}
				for (var k = 0; k < uta_fan_List.length && found == false; k++) 
				{
					if (uta_fan_List[k].toUpperCase() == userName) 
					{
						var uta_fan_Tag = document.createElement('img');
						uta_fan_Tag.src = UTA_SRC;
						userLevelImg.parentNode.insertBefore(uta_fan_Tag, userLevelImg.nextSibling);
						found = true;
					}
				}


				
				userName = '';
			} /* end if check for username anchor */
			
			
		}
		catch(err)
		{
			console.log("error on name # " + i + " username: " + userName + " " + " line = " + line);
			console.log(err);
		}
		
		found = false;
	}
}

//document.body.innerHTML = document.body.innerHTML.replace(/alt=/gi, 'title=');