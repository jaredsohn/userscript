// ==UserScript==
// @name Travian3 Beyond HUcked version
// @author T3B Victor Garcia (aka Croc); mod by lintaba
// @include http://*.travian*.*/*.php*
// @exclude http://*.travian*.*/hilfe.php*
// @exclude http://*.travian*.*/log*.php*
// @exclude http://*.travian*.*/index.php*
// @exclude http://*.travian*.*/anleitung.php*
// @exclude http://*.travian*.*/impressum.php*
// @exclude http://*.travian*.*/anmelden.php*
// @exclude http://*.travian*.*/gutscheine.php*
// @exclude http://*.travian*.*/spielregeln.php*
// @exclude http://*.travian*.*/links.php*
// @exclude http://*.travian*.*/geschichte.php*
// @exclude http://*.travian*.*/tutorial.php*
// @exclude http://*.travian*.*/manual.php*
// @exclude http://*.travian*.*/ajax.php*
// @exclude http://*.travian*.*/ad/*
// @exclude http://*.travian*.*/chat/*
// @exclude http://forum.travian*.*
// @exclude http://board.travian*.*
// @exclude http://shop.travian*.*
// @version 2.8HUcked
// @description  Enables some Travian v3 features; mod by én
// ==/UserScript==

/*
 * This script is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 2.5 Spain License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/es/
 */

// Funcion principal ejecutada cuando se ha cargado toda la pagina
function funcionPrincipal(e){
	// Momento de inicio de ejecucion del script
	var tiempo_ejecucion = new Date().getTime();

	var version = "2.6f";
	{
	// Hungarian (travian.hu)
	var lang_hu = new Array();
	lang_hu['ALIANZA'] 			= 'Kl&#225;n';
	lang_hu['PERFIL'] 			= 'Felhaszn&#225;l&#243; Profil';
	lang_hu['SIM'] 				= 'Harc Szimul&#225;tor';
	lang_hu['CALC'] 			= 'Travian Kalkul&#225;tor';
	lang_hu['SEGURO'] 			= 'Biztos vagy benne?';
	lang_hu['MARK'] 			= 'Kijel&#246;li mindet';
	lang_hu['PERDIDAS'] 		= 'vesztes&#233;g';
	lang_hu['RENT'] 			= 'Haszon';
	lang_hu['SUBIR_NIVEL'] 		= '<font color="red"><strong>B&#337;v&#237;t&#233;s lehets&#233;ges</strong></font>';
	lang_hu['JUGADOR']	 		= 'J&#225;t&#233;kos';
	lang_hu['ALDEA'] 			= 'Falu neve';
	lang_hu['HAB'] 				= 'N&#233;pess&#233;g';
	lang_hu['COORD'] 			= 'Koordin&#225;t&#225;k';
	lang_hu['ACCION'] 			= 'Esem&#233;nyek';
	lang_hu['ATACAR'] 			= ''//T&#225;mad&#225;s';
	lang_hu['COMERCIAR'] 		= 'Nyersanyag k&#252;ld&#233;se';
	lang_hu['GUARDADO'] 		= 'Mentve';
	lang_hu['DESP_ABR'] 		= 'Mozg&#225;s:';
	lang_hu['FALTA'] 			= 'Sz&#252;ks&#233;ged van';
	lang_hu['HOY'] 				= 'ma';
	lang_hu['MANYANA'] 			= 'holnap';
	lang_hu['PAS_MANYANA'] 		= 'holnaput&#225;n';
	lang_hu['MERCADO'] 			= 'Piac';
	lang_hu['CUARTEL'] 			= 'Kasz&#225;rnya';
	lang_hu['PUNTO'] 			= 'Gy&#252;lekez&#337;t&#233;r';
	lang_hu['CORRAL'] 			= 'Ist&#225;ll&#243;';
	lang_hu['TALLER'] 			= 'M&#369;hely';
	lang_hu['ENVIAR'] 			= 'Nyersanyag k&#252;ld&#233;se';
	lang_hu['COMPRAR'] 			= 'V&#225;s&#225;rl&#225;s';
	lang_hu['VENDER'] 			= 'Elad&#225;s';
	lang_hu['ENVIAR_IGM'] 		= ''//&#220;zenet k&#252;ld&#233;se';
	lang_hu['LISTO'] 			= 'B&#337;v&#237;t&#233;s lehets&#233;ges';
	lang_hu['EL'] 				= '';
	lang_hu['A_LAS'] 			= '';
	lang_hu['EFICIENCIA'] 		= 'Hat&#233;konys&#225;g';
	lang_hu['NUNCA']			= 'Soha';
	lang_hu['PC']          	 	= 'kult&#250;ra pontok';
	lang_hu['FUNDAR']     	 	= 'Alap&#237;thatsz vagy megh&#243;d&#237;thatsz egy &#250;j falut';
	lang_hu['ALDEAS']      		= 'Falu(k)';
	lang_hu['ENV_TROPAS'] 		= 'Egys&#233;g k&#252;ld&#233;se';
	lang_hu['RECURSO1']    		= 'Fa';
	lang_hu['RECURSO2']    		= 'Agyag';
	lang_hu['RECURSO3']    		= 'Vas';
	lang_hu['RECURSO4']    		= 'B&#250;za';
	lang_hu['TIEMPO']      		= 'Id&#337;';
	lang_hu['COMP']        		= 'Riport t&#246;m&#246;r&#237;t&#337;';
	lang_hu['STAT']				= 'Statisztika';
	lang_hu['OFREZCO']			= 'Aj&#225;nl&#225;s';
	lang_hu['BUSCO']			= 'Keres&#233;s';
	lang_hu['TIPO']				= 'Ar&#225;ny';
	lang_hu['DISPONIBLE']		= 'Csak elfogadhat&#243;ak';
	lang_hu['CUALQUIERA']		= 'B&#225;rmelyik';
	lang_hu['SI']				= 'Sz&#369;rt';
	lang_hu['NO']				= 'Mind';
	lang_hu['LOGIN']			= 'Bejelentkez&#233;s';
    lang_hu['MARCADORES']		= 'K&#246;nyvjelz&#337;k';
    lang_hu['ANYADIR']			= 'Hozz&#225;ad';
    lang_hu['ENLACE']			= 'új URL';
    lang_hu['TEXTO']			= 'új szöveg';
	lang_hu['ELIMINAR']			= 'T&#246;rl&#233;s';
	lang_hu['MAPA']				= 'T&#233;rk&#233;p';
	lang_hu['CHECK']			= '&#218;j verzi&#243; keres&#233;se';
	lang_hu['ARCHIVE']			= 'Arch&#237;vum';
	lang_hu['RESUMEN']			= '&#214;sszesen';
	lang_hu['MAXTIME']			= 'Maximum id&#337;';
}
{
	// Lenyador
	var lenyadorCost = [
		[0, 0, 0, 0],
		[40, 100, 50, 60],
		[65, 165, 85, 100],
		[110, 280, 140, 165],
		[185, 465, 235, 280],
		[310, 780, 390, 465],
		[520, 1300, 650, 780],
		[870, 2170, 1085, 1300],
		[1450, 3625, 1810, 2175],
		[2420, 6050, 3025, 3630],
		[4040, 10105, 5050, 6060],	// Nivel 10
		[6750, 16870, 8435, 10125],
		[11270, 28175, 14090, 16905],
		[18820, 47055, 23525, 28230],
		[31430, 78580, 39290, 47150],
		[52490, 131230, 65615, 78740], // Nivel 15
		[87660, 219155, 109575, 131490],
		[146395, 365985, 182995, 219590],
		[244480, 611195, 305600, 366715],
		[408280, 1020695, 510350, 612420],
	];

	// Barrera
	var barroCost = [
		[0, 0, 0, 0],
		[80, 40, 80, 50],
		[135, 65, 135, 85],
		[225, 110, 225, 140],
		[375, 185, 375, 235],
		[620, 310, 620, 390],
		[1040, 520, 1040, 650],
		[1735, 870, 1735, 1085],
		[2900, 1450, 2900, 1810],
		[4840, 2420, 4840, 3025],
		[8080, 4040, 8080, 5050],	// Nivel 10
		[13500, 6750, 13500 ,8435],
		[22540, 11270, 22540, 14090],
		[37645, 18820, 37645, 23525],
		[62865, 31430, 62865, 39290],
		[104985, 52490, 104985, 65615], // Nivel 15
		[175320, 87660, 175320, 109575],
		[292790, 146395, 292790, 182995],
		[488955, 244480, 488955, 305600],
		[846555, 408280, 816555, 510350],
	];

	// Mina de hierro
	var hierroCost = [
		[0, 0, 0, 0],
		[100, 80, 30, 60],
		[165, 135, 50, 100],
		[280, 225, 85, 165],
		[465, 375, 140, 280],
		[780, 620, 235, 465],
		[1300, 1040, 390, 780],
		[2170, 1735, 650, 1300],
		[3625, 2900, 1085, 2175],
		[6050, 4840, 1815, 3630],
		[10105, 8080, 3030, 6060],	// Nivel 10
		[16870, 13500, 5060, 10125],
		[28175, 22540, 8455, 16905],
		[47055, 37645, 14115, 28230],
		[78580, 62865, 23575, 47150],
		[131230, 104985, 39370, 78740], // Nivel 15
		[219155, 175320, 65745, 131490],
		[365985, 292790, 109795, 219590],
		[611195, 488955, 183360, 366715],
		[1020695, 846555, 306210, 612420],
	];

	// Búzafarm
	var cerealCost = [
		[0, 0, 0, 0],
		[70, 90, 70, 20],
		[115, 150, 115, 35],
		[195, 250, 195, 55],
		[325, 420, 325, 95],
		[545, 700, 545, 155],
		[910, 1170, 910, 260],
		[1520, 1950, 1520, 435],
		[2535, 3260, 2535, 725],
		[4235, 5445, 4235, 1210],
		[7070, 9095, 7070, 2020],	// Nivel 10
		[11810, 15185, 11810, 3375],
		[19725, 25360, 19725, 5635],
		[32940, 42350, 32940, 9410],
		[55005, 70720, 55005, 15715],
		[91860, 118105, 91860, 26245],	// Nivel 15
		[153405, 197240, 153405, 43830],
		[256190, 329385, 256190, 73195],
		[427835, 550075, 427835, 122240],
		[714485, 918625, 714485, 204140],
	];

	// Almacen
	var warehouseCost = [
		[0, 0, 0, 0],
		[130,160,90,40],
		[165,205,115,50],
		[215,260,145,65],
		[275,335,190,85],
		[350,430,240,105],
		[445,550,310,135],
		[570,705,395,175],
		[730,900,505,225],
		[935,1115,650,290],
		[1200,1475,830,370],
		[1535,1890,1065,470],
		[1965,2420,1360,605],
		[2515,3095,1740,775],
		[3220,3960,2230,990],
		[4120,5070,2850,1270],
		[5275,6490,3650,1625],
		[6750,8310,4675,2075],
		[8640,10635,5980,2660],
		[11060,13610,7655,3405],
		[14155,17420,9800,4355]
	];

	// Academia
	var academyCost = [
		[0, 0, 0, 0], 			// Level 0
		[220, 160, 90, 40],
		[280, 205, 115, 50],
		[360, 260, 145, 65],
		[460, 335, 190, 85],
		[590, 430, 240, 105], 		// Level 5
		[755, 550, 310, 135],
		[970, 705, 395, 175],
		[1240, 900, 505, 225],
		[1585, 1155, 650, 290],
		[2030, 1475, 830, 370], 	// Level 10
		[2595, 1890, 1065, 470],
		[3325, 2420, 1360, 605],
		[4255, 3095, 1740, 775],
		[5445, 3960, 2230, 990],
		[6970, 5070, 2850, 1270], 	// Level 15
		[8925, 6490, 3650, 1625],
		[11425, 8310, 4275, 2075],
		[14620, 10635, 5980, 2660],
		[18715, 13610, 7655, 3405],
		[23955, 17420, 9800, 4355] 	// Level 20
	];

	// Molino
	var flourMillCost = [
		[0, 0, 0, 0], 			// Level 0
		[500, 440, 380, 1240],
		[900, 790, 685, 2230],
		[1620, 1425, 1230, 4020],
		[2915, 2565, 2215, 7230],
		[5250, 4620, 3990, 13015], 	// Level 5
	];

	// Ladrillar
	var brickyardCost = [
		[0, 0, 0, 0], 			// Level 0
		[440, 480, 320, 50],
		[790, 865, 575, 90],
		[1425, 1555, 1035, 160],
		[2565, 2800, 1865, 290],
		[4620, 5040, 3360, 525], 	// Level 5
	];

	// Serreria
	var sawmillCost = [
		[0, 0, 0, 0], 			// Level 0
		[520, 380, 290, 90],
		[935, 685, 520, 160],
		[1685, 1230, 940, 290],
		[3035, 2215, 1690, 525],
		[5460, 3990, 3045, 945], 	// Level 5
	];

	// Fundicion de hierro
	var ironFoundryCost = [
		[0, 0, 0, 0], 			// Level 0
		[200, 450, 510, 120],
		[360, 810, 920, 215],
		[650, 1460, 1650, 390],
		[1165, 2625, 2975, 700],
		[2100, 4725, 5355, 1260], 	// Level 5
	];

	// Panaderia
	var bakeryCost = [
		[0, 0, 0, 0], 			// Level 0
		[1200, 1480, 870, 1600],
		[2160, 2665, 1565, 2880],
		[3890, 4795, 2820, 5185],
		[7000, 8630, 5075, 9330],
		[12595, 15535, 9135, 16795], 	// Level 5
	];

	// Mercado
	var marketplaceCost = [
		[0, 0, 0, 0], 			// Level 0
		[80, 70, 120, 70],
		[100, 90, 155, 90],
		[130, 115, 195, 115],
		[170, 145, 250, 145],
		[215, 190, 320, 190], 		// Level 5
		[275, 240, 410, 240],
		[350, 310, 530, 310],
		[450, 395, 675, 395],
		[575, 505, 865, 505],
		[740, 645, 1105, 645], 		// Level 10
		[945, 825, 1415, 825],
		[1210, 1060, 1815, 1060],
		[1545, 1355, 2320, 1355],
		[1980, 1735, 2970, 1735],
		[2535, 2220, 3805, 2220], 	// Level 15
		[3245, 2840, 4870, 2840],
		[4155, 3635, 6230, 3635],
		[5315, 4650, 7975, 4650],
		[6805, 5955, 10210, 5955],
		[8710, 7620, 13065, 7620], 	// Level 20
	];

	// Granero
	var granaryCost = [
		[0, 0, 0, 0],
		[80,100,70,20],
		[100,130,90,25],
		[130,165,115,35],
		[170,210,145,40],
		[215,270,190,55],
		[275,345,240,70],
		[350,440,310,90],
		[450,565,395,115],
		[575,720,505,145],
		[740,920,645,185],
		[945,1180,825,235],
		[1210,1510,1060,300],
		[1545,1935,1355,385],
		[1980,2475,1735,495],
		[2535,3170,2220,635],
		[3245,4055,2840,810],
		[4155,5190,3635,1040],
		[5315,6645,4650,1330],
		[6805,8505,5955,1700],
		[8710,10890,7620,2180]
	];

	// Armeria
	var blacksmithCost = [
		[0, 0, 0, 0],
		[170,200,380,130],
		[220,225,485,165],
		[280,330,625,215],
		[355,420,795,275],
		[455,535,1020,350],
		[585,685,1305,445],
		[750,880,1670,570],
		[955,1125,2140,730],
		[1225,1440,2740,935],
		[1570,1845,3505,1200],
		[2005,2360,4485,1535],
		[2570,3020,5740,1965],
		[3290,3870,7350,2515],
		[4210,4950,9410,3220],
		[5390,6340,12045,4120],
		[6895,8115,15415,5275],
		[8825,10385,19730,6750],
		[11300,13290,25255,8640],
		[14460,17015,32325,11060],
		[18510,21780,41380,14155]
	];

	// Armamentaria
	var armouryCost = [
		[0, 0, 0, 0],
		[130,210,410,130],
		[165,270,525,165],
		[215,345,670,215],
		[275,440,860,275],
		[350,565,1100,350],
		[445,720,1410,445],
		[570,925,1805,570],
		[730,1180,2310,730],
		[935,1515,2955,935],
		[1200,1935,3780,1200],
		[1535,2480,4840,1535],
		[1965,3175,6195,1965],
		[2515,4060,7930,2515],
		[3220,5200,10150,3220],
		[4120,6655,12995,4120],
		[5275,8520,16630,5275],
		[6750,10905,21290,6750],
		[8640,13955,27250,8640],
		[11060,17865,34880,11060],
		[14155,22865,44645,14155]
	];

	// Edificio principal
	var mainBuildingCost = [
		[0, 0, 0, 0],
		[70,40,60,20],
		[90,50,75,25],
		[115,65,100,35],
		[145,85,125,40],
		[190,105,160,55],
		[240,135,205,70],
		[310,175,265,90],
		[395,225,340,115],
		[505,290,430,145],
		[645,370,555,185],
		[825,470,710,235],
		[1060,605,905,300],
		[1355,775,1160,385],
		[1735,990,1485,495],
		[2220,1270,1900,635],
		[2840,1625,2435,810],
		[3635,2075,3115,1040],
		[4650,2660,3990,1330],
		[5955,3405,5105,1700],
		[7620,4355,6535,2180]
	];

	// Plaza de reuniones
	var rallyPointCost = [
		[0, 0, 0, 0],
		[110,60,80,60],
		[140,205,115,90],
		[180,260,145,115],
		[230,355,190,145],
		[295,160,215,160],
		[380,550,310,240],
		[485,705,395,310],
		[620,900,505,395],
		[795,430,575,430],
		[1015,1475,830,645], 	// Nivel 10
		[1300,1890,1065,825],
		[1660,2420,1360,1060],
		[2130,3095,1740,1355],
		[2725,3960,2230,1735],
		[3465,5075,2845,2230],
		[4460,6490,3650,2840],
		[5680,8315,4665,3650],
		[7310,10635,5980,4650],
		[9360,13610,7655,5955],
		[11980,17420,9800,7620]
	];

	// Embajada
	var embassyCost = [
		[0, 0, 0, 0],
		[180,130,150,80],
		[230,165,190,100],
		[295,215,245,130],
		[375,275,315,170],
		[485,350,405,215],
		[620,445,515,275],
		[790,570,660,350],
		[1015,730,845,450],
		[1295,935,1080,575],
		[1660,1200,1385,740],
		[2125,1535,1770,945],
		[2720,1965,2265,1210],
		[3480,2515,2900,1545],
		[4455,3220,3715,1980],
		[5705,4120,4755,2535],
		[7300,5275,6085,3245],
		[9345,6750,7790,4155],
		[11965,8640,9970,5315],
		[15315,11060,12760,6805],
		[19600,14155,16335,8710]
	];

	// Cuartel
	var barracksCost = [
		[0, 0, 0, 0],
		[210,140,260,120],
		[270,180,335,155],
		[345,230,425,195],
		[440,295,545,250],
		[565,375,700,320],
		[720,480,895,410],
		[925,615,1145,530],
		[1180,790,1465,675],
		[1515,1010,1875,865],
		[1935,1290,2400,1105],
		[2480,1655,3070,1415],
		[3175,2115,3930,1815],
		[4060,2710,5030,2320],
		[5200,3465,6435,2970],
		[6655,4435,8240,3805],
		[8520,5680,10545,4870],
		[10905,7270,13500,6230],
		[13955,9305,17280,7975],
		[17865,11910,22120,10210],
		[22865,15245,28310,13065]
	];

	// Corral / Establo
	var stableCost = [
		[0, 0, 0, 0],
		[260,140,220,100],
		[335,180,280,130],
		[425,230,360,165],
		[545,295,460,210],
		[700,375,590,270],
		[895,480,755,345],
		[1145,615,970,440],
		[1465,790,1240,565],
		[1875,1010,1585,720],
		[2400,1290,2030,920],
		[3070,1655,2595,1180],
		[3930,2115,3325,1510],
		[5030,2710,4255,1935],
		[6435,3465,5445,2475],
		[8240,4435,6970,3170],
		[10545,5680,8925,4055],
		[13500,7270,11425,5190],
		[17280,9305,14620,6645],
		[22120,11910,18715,8505],
		[28310,15245,23955,10890]
	];

	// Taller
	var workshopCost = [
		[0, 0, 0, 0],
		[460,510,600,320],
		[590,655,770,410],
		[755,835,985,525],
		[965,1070,1260,670],
		[1235,1370,1610,860],
		[1580,1750,2060,1100],
		[2025,2245,2640,1405],
		[2590,2870,3380,1800],
		[3315,3675,4325,2305],
		[4245,4705,5535,2950],
		[5430,6020,7085,3780],
		[6950,7705,9065,4835],
		[8900,9865,11605,6190],
		[11390,12625,14855,7925],
		[14580,16165,19015,10140],
		[18660,20690,24340,12980],
		[23885,26480,31155,16615],
		[30570,33895,39787,21270],
		[39130,43385,51040,27225],
		[50090,55535,65335,34845]
	];

	// Escondite
	var crannyCost = [
		[0, 0, 0, 0],
		[40,50,30,10],
		[50,65,40,15],
		[65,80,50,15],
		[85,105,65,20],
		[135,160,105,55],
		[170,205,135,70],
		[220,265,175,90],
		[280,340,225,115],
		[360,430,290,145],
		[370,460,275,90]
	];

	// Ayuntamiento
	var ayuntamientoCost = [
		[0, 0, 0, 0],
		[1250,1110,1260,600],
		[1600,1420,1615,770],
		[2050,1820,2065,985],
		[2620,2330,2640,1260],
		[3355,2980,3380,1610],
		[4295,3815,4330,2060],
		[5500,4880,5540,2640],
		[7035,6250,7095,3380],
		[9005,8000,9080,4325],
		[11530,10240,11620,5535],
		[14755,13105,14875,7085],
		[18890,16775,19040,9065],
		[24180,21470,27370,11605],
		[30950,27480,31195,14885],
		[39615,35175,39930,19015],
		[40705,45025,51110,24340],
		[64905,57635,65425,31155],
		[83075,73770,83740,39875],
		[106340,94430,107190,51040],
		[136115,120870,137200,65335]
	];

	// Residencia
	var residenceCost = [
		[0, 0, 0, 0],
		[580,460,350,180],
		[740,590,450,230],
		[950,755,575,295],
		[1215,965,735,375],
		[1555,1235,940,485],
		[1995,1580,1205,620],
		[2550,2025,1540,790],
		[3265,2590,1970,1015],
		[4180,3315,2520,1295],
		[5350,4245,3230,1660],
		[6845,5430,4130,2125],
		[8765,6950,5290,2720],
		[11220,8900,6770,3480],
		[14360,11390,8665,4455],
		[18380,14580,11090,5705],
		[23530,18660,14200,7300],
		[30115,23885,18175,9345],
		[38550,30570,23260,11965],
		[49340,39130,29775,15315],
		[63155,50090,38110,19600]
	];

	// Palacio
	var palaceCost = [
		[0, 0, 0, 0],
		[550,800,750,250],
		[705,1025,960,320],
		[900,1310,1230,410],
		[1155,1680,1575,525],
		[1475,2145,2015,670],
		[1890,2750,2575,860],
		[2420,3520,3300,1100],
		[3095,4505,4220,1405],
		[3965,5765,5405,1800],
		[5075,7380,6920,2305],
		[6495,9445,8855,2950],
		[8310,12090,11335,3780],
		[10640,15478,14505,4835],
		[13150,19805,18570,6190],
		[17430,25355,23770,7925],
		[22310,32450,30425,10140],
		[28560,41540,38940,12980],
		[36555,53170,49845,16615],
		[46790,68055,63805,21270],
		[59890,87110,81670,27225]
	];

	// Plaza de torneos
	var tournamentSquareCost = [
		[0, 0, 0, 0],
		[1750,2250,1530,240],
		[2240,2880,1960,305],
		[2865,3685,2505,395],
		[3670,4720,3210,505],
		[4700,6040,4105,645],
		[6015,7730,5255,825],
		[7695,9895,6730,1055],
		[9850,12665,8615,1350],
		[12610,16215,11025,1730],
		[16140,20755,14110,2215],
		[20660,26565,18065,2835],
		[26445,34000,23120,3625],
		[33850,43520,29595,4640],
		[43330,55705,37880,5940],
		[55460,71305,48490,7605],
		[70990,91270,62065,9735],
		[90865,117000,79440,12460],
		[116000,150000,102000,15950],
		[149000,191000,130000,20415],
		[191000,245000,167000,26135]
	];

	// Tesoro
	var tesoroCost = [
		[0, 0, 0, 0],
		[2890,2740,2580,990],
		[3685,3505,3300,1265],
		[4720,4490,4225,1620],
		[6040,5745,5410,2075],
		[7730,7355,6925,2660],
		[9595,9415,8865,3400],
		[12665,12050,11345,4355],
		[16215,15425,14525,5575],
		[20755,19745,18590,7135],
		[26565,25270,23795,9130]
	];

	// Oficina de comercio
	var oficinaComercioCost = [
		[0, 0, 0, 0],
		[1400,1330,1200,400],
		[1790,1700,1535,510],
		[2295,2180,1965,655],
		[2935,2790,2515,840],
		[3760,3570,3220,1075],
		[4810,4570,4125,1375],
		[6155,5850,5280,1760],
		[7780,7485,6755,2250],
		[10090,9585,8645,2880],
		[12915,12265,11070,6390],
		[16530,15700,14165,4720],
		[21155,20100,18135,6045],
		[27080,25725,23210,9905],
		[34660,32930,29710,9905],
		[44370,42150,38030,12675],
		[56790,53950,48680,16225],
		[72690,69060,62310,20770],
		[93045,88395,79755,26585],
		[119100,113145,102085,34030],
		[152445,144825,130670,43555]
	];

	// Cuartel grande
	var greatBarrackCost = [
		[0, 0, 0, 0],
		[630,420,780,360],		// Level 1
		[805,540,1000,460],
		[1030,690,1280,590],
		[1320,880,1635,755],
		[1690,1125,2095,965],		// Level 5
		[2165,1445,2680,1235],
		[2770,1845,3430,1585],
		[3545,2365,4390,2025],
		[4540,3025,5620,2595],
		[5810,3875,7195,3320],		// Level 10
		[7440,4960,9210,4250],
		[9520,6345,11785,5440],
                [12185,8125,15085,6965],
		[15600,10400,19310,8915],
		[19965,13310,24270,11410],	// Level 15
                [25555,17035,31640,14605],
		[32710,21810,40500,18690],
		[41870,27915,51840,23925],
		[53595,35730,66355,30625],
		[68600,45735,84935,39200]	// Level 20
	];

	// Corral / Establo grande
	var greatStableCost = [
		[0, 0, 0, 0],
		[780,420,660,300],
		[1000,540,845,385],
		[1280,690,1080,490],
		[1635,880,1385,630],
		[2095,1125,1770,805],
		[2680,1445,2270,1030],
		[3430,1845,2905,1320],
		[4390,2365,3715,1690],
		[5620,3025,4755,2160],
		[7195,3875,6085,2765],
		[9210,4960,7790,3540],
		[11785,6345,9975,4535],
		[15085,8125,12765,5805],
		[19310,10400,16340,7430],
		[24720,13310,20915,9505],	// Level 15
		[31640,17035,26775,12170],
		[40500,21810,34270,15575],
		[51840,27915,43865,19940],
		[66355,35730,56145,25520],
		[84935,45735,71870,32665]
	];

	// Muralla
	var wallRomansCost = [
		[0, 0, 0, 0],
		[70, 90, 170, 70],
		[90, 115, 220, 90],
		[115, 145, 280, 115],
		[145, 190, 355, 145],
		[190, 240, 455, 190],
		[240, 310, 585, 240],
		[310, 395, 750, 310],
		[395, 505, 955, 395],
		[505, 650, 1225, 505],
		[645, 830, 1570, 645],
		[825, 1065, 2005, 825],
		[1060, 1360, 2570, 1060],
		[1355, 1740, 3290, 1355],
		[1735, 2230, 4210, 1735],
		[2220, 2850, 5390, 2220],
		[2840, 3650, 6895, 2840],
		[3635, 4675, 8825, 3635],
		[4650, 5980, 11300, 4650],
		[5955, 7655, 14160, 5955],
		[7620, 9800, 18510, 7620]
	];

	// Empalizada
	var wallGaulsCost = [
		[0, 0, 0, 0],
		[160, 100, 80, 60],
		[205, 130, 100, 75],
		[260, 165, 130, 100],
		[335, 210, 170, 125],
		[430, 270, 215, 160],
		[550, 345, 275, 205],
		[705, 440, 350, 265],
		[900, 565, 450, 340],
		[1155, 720, 575, 430],
		[1475, 920, 740, 555],
		[1890, 1180, 945, 710],
		[2420, 1510, 1210, 905],
		[3095, 1935, 1545, 1160],
		[3960, 2475, 1980, 1485],
		[5070, 3170, 2535, 1900],
		[6490, 4055, 3245, 2435],
		[8310, 5190, 4155, 3115],
		[10635, 6645, 5315, 3990],
		[13610, 8505, 6805, 5105],
		[17420, 10890, 8710, 6535]
	];

	// Terraplen
	var wallTeutonsCost = [
		[0, 0, 0, 0],
		[120, 200, 0, 80],
		[155, 255, 0, 100],
		[195, 330, 0, 130],
		[250, 420, 0, 170],
		[320, 535, 0, 215],
		[410, 685, 0, 275],
		[530, 880, 0, 350],
		[675, 1125, 0, 450],
		[865, 1440, 0, 575],
		[1105, 1845, 0, 740],
		[1415, 2360, 0, 945],
		[1815, 3020, 0, 1210],
		[2320, 3870, 0, 1545],
		[2970, 4950, 0, 1980],
		[3805, 6340, 0, 2535],
		[4870, 8115, 0, 3245],
		[6230, 10385, 0, 4155],
		[7975, 13290, 0, 5315],
		[10210, 17015, 0, 6805],
		[13065, 21780, 0, 8710]
	];

	var cerveceriaCost = [
		[0, 0, 0, 0],
		[1200, 1400, 1050, 2200],
		[1535, 1790, 1345, 2815],
		[1965, 2295, 1720, 3605],
		[2515, 2935, 2200, 4615],
		[3220, 3760, 2820, 5905],
		[4125, 4810, 3610, 7560],
		[5280, 6155, 4620, 9675],
		[6755, 7880, 5910, 12385],
		[8645, 10090, 7565, 15855],
		[11070, 12915, 9685, 20290],
		[14165, 16530, 12395, 25975],
		[18135, 21155, 15865, 33245],
		[23210, 27080, 20310, 42555],
		[29710, 34660, 25995, 54470],
		[38030, 44370, 33275, 69720],
		[48680, 56790, 42595, 89245],
		[62310, 72690, 54520, 114230],
		[79755, 93045, 69785, 146215],
		[102085, 119100, 89325, 187155],
		[130670, 152445, 114335, 239560],
	];

	var casaHeroeCost = [
		[0, 0, 0, 0],
		[700, 670, 700, 240],
		[930, 890, 930, 320],
		[1240, 1185, 1240, 425],
		[1645, 1575, 1645, 565],
		[2190, 2095, 2190, 750],
		[2915, 2790, 2915, 1000],
		[3875, 3710, 3875, 1330],
		[5155, 4930, 5155, 1765],
		[6855, 6560, 6855, 2350],
		[9115, 8725, 9115, 3125],	// Nivel 10
		[12125, 11605, 12125, 4155],
		[16125, 15435, 16125, 5530],
		[21445, 20525, 21445, 7350],
		[28520, 27300, 28520, 9780],
		[37935, 36310, 37935, 13005],
		[50450, 48290, 50450, 17300],
		[67100, 64225, 67100, 23005],
		[89245, 85420, 89245, 30600],
		[118695, 113605, 118695, 40695],
		[157865, 151095, 157865, 54125]
	];

	var trampaCost = [
		[0, 0, 0, 0],
		[100, 100, 100, 100],
		[130, 130, 130,	130],
		[165, 165, 165,	165],
		[210, 210, 210, 210],
		[270, 270, 270,	270],
		[345, 345, 345, 345],
		[440, 440, 440,	440],
		[565, 565, 565, 565],
		[720, 720, 720, 720],
		[920, 920, 920, 920],	// Nivel 10
		[1180, 1180, 1180, 1180],
		[1510, 1510, 1510, 1510],
		[1935, 1935, 1935, 1935],
		[2475, 2475, 2475, 2475],
		[3170, 3170, 3170, 3170],
		[4055, 4055, 4055, 4055],
		[5190, 5190, 5190, 5190],
		[6645, 6645, 6645, 6645],
		[8505, 8505, 8505, 8505],
		[10890, 10890, 10890, 10890]
	];

	var canteroCost = [
		[0, 0, 0, 0],
		[155, 130, 125, 70],
		[200, 165, 160, 90],
		[255, 215, 205, 115],
		[325, 275, 260, 145],
		[415, 350, 335, 190],
		[535, 445, 430, 240],
		[680, 570, 550, 310],
		[875, 730, 705, 395],
		[1115, 935, 900, 505],
		[1430, 1200, 1155, 645],	// Nivel 10
		[1830, 1535, 1475, 825],
		[2340, 1965, 1890, 1060],
		[3000, 2515, 2420, 1355],
		[3840, 3220, 3095, 1735],
		[4910, 4120, 3960, 2220],
		[6290, 5275, 5070, 2840],
		[8050, 6750, 6490, 3635],
		[10300, 8640, 8310, 4650],
		[13185, 11060, 10635, 5955],
		[16880, 14155, 13610, 7620]
	];

	var greatWarehouseCost = [
		[0, 0, 0, 0],
		[650, 800, 450, 200],
		[830, 1025, 575, 255],
		[1065, 1310, 735, 330],
		[1365, 1680, 945, 420],
		[1745, 2145, 1210, 535],
		[2235, 2750, 1545, 685],
		[2860, 3520, 1980, 880],
		[3660, 4505, 2535, 1125],
		[4685, 5765, 3245, 1440],
		[5995, 7380, 4150, 1845],
		[7675, 9445, 5315, 2360],
		[9825, 12090, 6800, 3020],
		[12575, 15475, 8705, 3870],
		[16095, 19805, 11140, 4950],
		[20600, 25355, 14260, 6340],
		[26365, 32450, 18255, 8115],
		[33750, 41540, 23365, 10385],
		[43200, 53170, 29910, 13290],
		[55295, 68055, 38280, 17015],
		[70780, 87110, 49000, 21780]
	];

	var greatGranaryCost = [
		[0, 0, 0, 0],
		[400, 500, 350, 100],
		[510, 640, 450, 130],
		[655, 820, 575, 165],
		[840, 1050, 735, 210],
		[1075, 1340, 940, 270],
		[1375, 1720, 1205, 345],
		[1760, 2200, 1540, 440],
		[2250, 2815, 1970, 565],
		[2880, 3605, 2520, 720],
		[3690, 4610, 3230, 920],
		[4720, 5905, 4130, 1180],
		[6045, 7555, 5290, 1510],
		[7735, 9670, 6770, 1935],
		[9905, 12380, 8665, 2475],
		[12675, 15845, 11090, 3170],
		[16225, 20280, 14200, 4055],
		[20770, 25960, 18175, 5190],
		[26585, 33230, 23260, 6645],
		[34030, 42535, 29775, 8505],
		[43555, 54445, 38110, 10890]
	];

        var maravillaCost = [
		[0, 0, 0, 0],
		[66700, 69050, 72200, 13200],
		[68535, 70950, 74185, 13565],
		[70420, 72900, 76225, 13935],
		[72355, 74905, 78320, 14320],
		[74345, 76965, 80475, 14715],
		[76390, 79080, 82690, 15120],
		[78490, 81255, 84965, 15535],
		[80650, 83490, 87300, 15960],
		[82865, 85785, 89700, 16400],
		[85145, 88145, 92165, 16850], // Nivel 10
		[87485, 90570, 94700, 17315],
		[89895, 93060, 97305, 17790],
		[92365, 95620, 99980, 18280],
		[94905, 98250, 102730, 18780],
		[97515, 100950, 105555, 19300],
		[100195, 103725, 108460, 19830],
		[102950, 106580, 111440, 20375],
		[105785, 109510, 114505, 20935],
		[108690, 112520, 117655, 21510],
		[111680, 115615, 120890, 22100], // Nivel 20
		[114755, 118795, 124215, 22710],
		[117910, 122060, 127630, 23335],
		[121150, 125420, 131140, 23975],
		[124480, 128870, 134745, 24635],
		[127905, 132410, 138455, 25315],
		[131425, 136055, 142260, 26010],
		[135035, 139795, 146170, 26725],
		[138750, 143640, 150190, 27460],
		[142565, 147590, 154320, 28215],
		[146485, 151650, 158565, 28990], // Nivel 30
		[150515, 155820, 162925, 29785],
		[154655, 160105, 167405, 30605],
		[158910, 164505, 172010, 31450],
		[163275, 169030, 176740, 32315],
		[167770, 173680, 181600, 33200],
		[172380, 178455, 186595, 34115],
		[177120, 183360, 191725, 35055],
		[181995, 188405, 197000, 36015],
		[186995, 193585, 202415, 37005],
		[192140, 198910, 207985, 38025], // Nivel 40
		[197425, 204380, 213705, 39070],
		[202855, 210000, 219580, 40145],
		[208430, 215775, 225620, 41250],
		[214165, 221710, 231825, 42385],
		[220055, 227805, 238200, 43550],
		[226105, 234070, 244750, 44745],
		[232320, 240505, 251480, 45975],
		[238710, 247120, 258395, 47240],
		[245275, 253915, 265500, 48540],
		[252020, 260900, 272800, 49875], // Nivel 50
		[258950, 268075, 280305, 51245],
		[266070, 275445, 288010, 52655],
		[273390, 283020, 295930, 54105],
		[280905, 290805, 304070, 55590],
		[288630, 298800, 312430, 57120],
		[296570, 307020, 321025, 58690],
		[304725, 315460, 329850, 60305],
		[313105, 324135, 338925, 61965],
		[321715, 333050, 348245, 63670],
		[330565, 342210, 357820, 65420], // Nivel 60
		[339655, 351620, 367660, 67220],
		[348995, 361290, 377770, 69065],
		[358590, 371225, 388160, 70965],
		[368450, 381435, 398835, 72915],
		[378585, 391925, 409800, 74920],
		[388995, 402700, 421070, 76985],
		[399695, 413775, 432650, 79100],
		[410685, 425155, 444550, 81275],
		[421980, 436845, 456775, 83510],
		[433585, 448860, 469335, 85805], // Nivel 70
		[445505, 461205, 482240, 88165],
		[457760, 473885, 495505, 90590],
		[470345, 486920, 509130, 93080],
		[483280, 500310, 523130, 95640],
		[496570, 514065, 537520, 98270],
		[510225, 528205, 552300, 100975],
		[524260, 542730, 567490, 103750],
		[538675, 557655, 583095, 106605],
		[553490, 572990, 599130, 109535],
		[568710, 588745, 615605, 112550], // Nivel 80
		[584350, 604935, 632535, 115645],
		[600420, 621575, 649930, 118825],
		[616930, 638665, 667800, 122090],
		[633895, 656230, 686165, 125450],
		[651330, 674275, 705035, 128900],
		[669240, 692820, 724425, 132445],
		[687645, 711870, 744345, 136085],
		[706555, 731445, 764815, 139830],
		[725985, 751560, 785850, 143675],
		[745950, 772230, 807460, 147625], // Nivel 90
		[766460, 793465, 829665, 151685],
		[787540, 815285, 852480, 155855],
		[809195, 837705, 875920, 160140],
		[831450, 860745, 900010, 164545],
		[854315, 884415, 924760, 169070],
		[877810, 908735, 950190, 173720],
		[901950, 933725, 976320, 178495],
		[926750, 959405, 1003170, 183405],
		[952235, 985785, 1030760, 188450],
		[978425, 1012895, 1059105, 193630] // Nivel 100
        ];
}
	var buildingCost = new Array();
	buildingCost[0] = lenyadorCost;
	buildingCost[1] = barroCost;
	buildingCost[2] = hierroCost;
	buildingCost[3] = cerealCost;

	buildingCost[5] = sawmillCost;
	buildingCost[6] = brickyardCost;
	buildingCost[7] = ironFoundryCost;
	buildingCost[8] = flourMillCost;
	buildingCost[9] = bakeryCost;
	buildingCost[10] = warehouseCost;//raktár
	buildingCost[11] = granaryCost;
	buildingCost[12] = blacksmithCost;
	buildingCost[13] = armouryCost;
	buildingCost[14] = tournamentSquareCost;
	buildingCost[15] = mainBuildingCost;
	buildingCost[16] = rallyPointCost;
	buildingCost[17] = marketplaceCost;
	buildingCost[18] = embassyCost;
	buildingCost[19] = barracksCost;
	buildingCost[20] = stableCost;
	buildingCost[21] = workshopCost;
	buildingCost[22] = academyCost;
	buildingCost[23] = crannyCost;
	buildingCost[24] = ayuntamientoCost;
	buildingCost[25] = residenceCost;
	buildingCost[26] = palaceCost;
	buildingCost[27] = tesoroCost;
	buildingCost[28] = oficinaComercioCost;
	buildingCost[29] = greatBarrackCost;
	buildingCost[30] = greatStableCost;
	buildingCost[31] = wallGaulsCost;
	buildingCost[32] = wallRomansCost;
	buildingCost[33] = wallTeutonsCost;
	buildingCost[34] = canteroCost;
	buildingCost[35] = cerveceriaCost;
	buildingCost[36] = trampaCost;
	buildingCost[37] = casaHeroeCost;
	buildingCost[38] = greatWarehouseCost;
	buildingCost[39] = greatGranaryCost;
	buildingCost[40] = maravillaCost;

	// Costes de produccion de cada unidad y su carga
	var uc = new Array();

	// Romanos
	uc[1] = [120,100,180,40,40]; 		// Legionario
	uc[2] = [100,130,160,70,20]; 		// Pretoriano
	uc[3] = [150,160,210,80,50]; 		// Imperano
	uc[4] = [140,160,20,40,0]; 		// Legati
	uc[5] = [550,440,320,100,100];	 	// Imperatoris
	uc[6] = [550,640,800,180,70]; 		// Caesaris
	uc[7] = [900,360,500,70,0]; 		// Carnero
	uc[8] = [950,1350,600,90,0]; 		// Catapulta
	uc[9] = [30750,27200,4500,37500,0]; 	// Senador
	uc[10] = [5800,5300,7200,5500,1600]; 	// Descubridor

	// Germanos
	uc[11] = [95,75,40,40,60]; 		// Lanzador porras
	uc[12] = [145,70,85,40,40]; 		// Luchador lanza
	uc[13] = [130,120,170,70,50]; 		// Luchador hacha
	uc[14] = [160,100,50,50,0]; 		// Emisario
	uc[15] = [370,270,290,75,110]; 		// Paladin
	uc[16] = [450,515,480,80,80]; 		// Caballista teutona
	uc[17] = [1000,300,350,70,0]; 		// Ariete
	uc[18] = [900,1200,600,60,0]; 		// Catapulta
	uc[19] = [35500,26600,25000,27200,0]; 	// Cabecilla
	uc[20] = [7200,5500,5800,6500,1600]; 	// Descubridor

	// Galos
	uc[21] = [100,130,55,30,30]; 		// Falange
	uc[22] = [140,150,185,60,45]; 		// Luchador espada
	uc[23] = [170,150,20,40,0]; 		// Batidor
	uc[24] = [350,450,230,60,75]; 		// Rayo
	uc[25] = [360,330,280,120,35]; 		// Druida
	uc[26] = [500,620,675,170,65]; 		// Haeduanos
	uc[27] = [950,555,330,75,0]; 		// Carnero
	uc[28] = [960,1450,630,90,0]; 		// Catapulta
	uc[29] = [30750,45400,31000,37500,0]; 	// Cacique
	uc[30] = [5500,7000,5300,4900,1600]; 	// Descubridor

	// Fauna
	uc[31] = [0, 0, 0, 0, 0];		// Rata
	uc[32] = [0, 0, 0, 0, 0];		// Aranya
	uc[33] = [0, 0, 0, 0, 0];		// Serpiente
	uc[34] = [0, 0, 0, 0, 0];		// Murcielago
	uc[35] = [0, 0, 0, 0, 0];		// Jabali
	uc[36] = [0, 0, 0, 0, 0];		// Lobo
	uc[37] = [0, 0, 0, 0, 0];		// Oso
	uc[38] = [0, 0, 0, 0, 0];		// Cocodrilo
	uc[39] = [0, 0, 0, 0, 0];		// Tigre
	uc[40] = [0, 0, 0, 0, 0];		// Elefante

	// Natares
	uc[41] = [0, 0, 0, 0, 0];		// Pikeman
	uc[42] = [0, 0, 0, 0, 0];		// Thorned warrior
	uc[43] = [0, 0, 0, 0, 0];		// Guardsman
	uc[44] = [0, 0, 0, 0, 0];		// Birds of prey
	uc[45] = [0, 0, 0, 0, 0];		// Axerider
	uc[46] = [0, 0, 0, 0, 0];		// Natarian knight
	uc[47] = [0, 0, 0, 0, 0];		// Warelephant
	uc[48] = [0, 0, 0, 0, 0];		// Ballista
	uc[49] = [0, 0, 0, 0, 0];		// Natarian emperor
	uc[50] = [0, 0, 0, 0, 0];		// Settler

	// Otra nueva raza! (demonios? ojos rojos?)
	uc[51] = [0, 0, 0, 0, 0];
	uc[52] = [0, 0, 0, 0, 0];
	uc[53] = [0, 0, 0, 0, 0];
	uc[54] = [0, 0, 0, 0, 0];
	uc[55] = [0, 0, 0, 0, 0];
	uc[56] = [0, 0, 0, 0, 0];
	uc[57] = [0, 0, 0, 0, 0];
	uc[58] = [0, 0, 0, 0, 0];
	uc[59] = [0, 0, 0, 0, 0];
	uc[60] = [0, 0, 0, 0, 0];

	uc[98] = [0, 0, 0, 0, 0];		// Trampa?
	uc[99] = [0, 0, 0, 0, 0];		// Trampa?

	var actual = new Array(4);		// Informacion de recursos almacenados
	var total = new Array(4);		// Capacidad de los almacenes y granero
	var produccion = new Array(4);		// Produccion por segundo
	var imagenes = new Array();		// Imagenes pre-cargadas

	// Indica para que servidores esta disponible el servicio de Travian World
	// IMPORTANTE: Por favor, no cambiar / Please, don't change. Travian World is only available for the servers indicated below
	var tw_server = new Array();

	// Se estima cada linea como una altura de 20 pixeles
	var pixelsPorLinea = 20;
function create_images(){
	// Imagen de un sobre para enviar IGM
	imagenes["igm"] = 'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAICAYAAAAvOAWIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QsKFws6qttDxQAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAkUlEQVQY05XQTUpDQRAE4K8yz9BuPEduEH8C2Tw8haeT3CQbPZEiIeNmhLdIAvamqerqaqqDdxxwcr0mvAWv+MYHfi4I13hErXCuqmOSp9batFS11qYk26o64gzzmCXJPsl64DvskYHn1cKo995PvfdnPOBl5OjLa/PY3qEGtxm9Bh/MfwG/8Hkj4Bb3+c/rfgHKwRzhskmMfQAAAABJRU5ErkJggg==';
	// Imagen compuesta para el mercado con 3 secciones: enviar recursos, compra y venta
	imagenes["mercado"] = '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';
	// Imagen compuesta para militar con 4 secciones: plaza de reuniones, cuartel, establo / corral y taller
	imagenes["militar"] = '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';
	// Imagen de una grafica para las estadisticas
	imagenes["stat"] = 'R0lGODlhDAAKAIABAAAAAP///yH5BAEAAAEALAAAAAAMAAoAAAIVjA1wi82eFJP0RIhD1Xn77mhKIhoFADs=';
	imagenes["pencil"] = 'R0lGODlhDv0O/UIL/R1PAf1vaydtAf3hU2HZ/SFcAf36bBM0Af3uYELZ/f39/f39/f39/f39/f39/f39/SFvBAH9/Qv9LP39/f0O/Q79/QQ1cMlJ/T14KSFUyf39JP0H/WNwYWhiIErWfjE7JgEs3/Q+9n5cClMgKP39wmAgGBgKBf10GgH9Ow==';
}
create_images();
	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;		// Constante que devuelve el primer elemento por XPath
	var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;		// Constante que devuelve una lista de elementos por XPath
	var XPIter  = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;		// Constante que deuvelve un iterador de elementos por XPath

	function dummy(){}

	function basename(path) { return path.replace( /.*\//, "" ); }

	function LZ(n){	return (n > 9 ? n : '0' + n); }

	function div(content){ return elem("div", content); }

	function $(id){   return document.getElementById(id); }

	function arrayByN(a, n){
		var b = arrayClone(a);
		for(var i in b){ b[i] *= n; }
		return b;
	}
	function arrayClone(a){
		var b = new Array();
		for(var i in a){ b[i] = a[i]; }
		return b;
	}
	function arrayAdd(a, b){
		if(!a){ return arrayClone(b); }
		if(!b){ return arrayClone(a); }
		var c = new Array();
		for(var i = 0; i < Math.max(a.length,b.length); c[i] = a[i] + b[i++]);
		return c;
	}

	function arrayValueExist(array, value){
		for(var i = 0; i < array.length; i++) if (array[i] == value) return true;
		return false;
	}
	function decodeEntity(string){
		return string.replace(/&lt;/g,"<").
			replace(/&gt;/g,">").
			replace(/&apos;/g,"'").
			replace(/&quot;/g,"\"").
			replace(/&amp;/g, "&");
	}

	function removeElement(elem){ if (elem) elem.parentNode.removeChild(elem) }

	function moveElement(elem, dest){
		removeElement(elem);
		dest.appendChild(elem);
	}

	function arrayToInt(a){
		var h = 0;
		for(var i in a){ h += a[i]; }
		return h;
	}

	function insertAfter(node, referenceNode) {
		node.parentNode.insertBefore(referenceNode, node.nextSibling);
	}

	function elem(tag, content, data){
		var ret = document.createElement(tag);
		ret.innerHTML = content;
		if(data){
			for(i in data){
				ret.setAttribute(i,data[i]);
			}
		}
		return ret;
	}

	function find(xpath, xpres){
		var ret = document.evaluate(xpath, document, null, xpres, null);
		return  xpres == XPFirst ? ret.singleNodeValue : ret;
	}

	function createCookie(name, value, days){
		if (typeof GM_setValue == "undefined"){
			if (days){
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				var expires = "; expires=" + date.toGMTString();
			}else var expires = "";
			document.cookie = name + "=" + value + expires + "; path=/";
		}else GM_setValue(name, value);
	}
	function readCookie(name){
		if (typeof GM_getValue == 'undefined'){
			var ca = document.cookie.split(';');
			var nameEQ = name + "=";
			for(var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length); // Elimina espacios
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}
			return null;
		}else return GM_getValue(name, null);
	}

	function eraseCookie(name){ createCookie(name, "", -1); }

	function img(ref, lang_dependant){
		//return (!lang_dependant ? pack_grafico + "img/un/" + ref : pack_grafico + "img/" + idioma + '/' + ref);
		return (!lang_dependant ? "img/un/" + ref : "img/" + idioma + '/' + ref);
	}

	function xy2id(x, y){ return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400))); }

	function calcular_segundos(myElement) {
		var p = myElement.split(":");
		return (p[0] * 3600) + (p[1] * 60) + (p[2] * 1);
	}

	function formatear_tiempo(s){
		if(s > -1){
			var horas = Math.floor(s/3600);
			var minutos = Math.floor(s/60) % 60;
			var segundos = s % 60;
			var t = horas + ":" + LZ(minutos) + ":" + LZ(segundos);
		}else var t = "0:00:0?";
		return t;
	}

	function calculateBuildTime(){
		// Las celdas son los enlaces susceptibles de ser sustituidos por la nueva informacion
		var celdas = find("//span[@class='c']", XPList);
		// Las tablas son por cada uno de los edificios ampliables que se han detectado en la pagina
		var tablas = find("//table[@class='f10' and not(@width)]", XPList);
		var k = celdas.snapshotLength - 1;

		// Se comienza por el final para evitar confusiones con otra informacion, ya que suele
		// estar lo ultimo en el caso de un unico edificio
		for(j = tablas.snapshotLength - 1; j >= 0; j--) {
			var tabla = tablas.snapshotItem(j);
			var celda = tabla.rows[0].firstChild;
			var recursos = celda.textContent.split("|").splice(0,4);
			if(recursos.length != 4) continue;

			var a = calculateResourceTime(recursos);
			var b = celdas.snapshotItem(k);
			// Por si hay mas tablas que celdas
			if (b){
				// Si lo que hay antes de la celda es un enlace, entonces se trata de la cola del Plus
				if (b.firstChild && b.previousSibling.previousSibling.nodeName == 'A') continue;
				// Se elimina la informacion existente antes de poner la nueva
				if (a != null){
					if (b.firstChild && b.previousSibling.previousSibling.nodeName == 'TABLE') while(b.hasChildNodes()) b.removeChild(b.firstChild);
					b.appendChild(div(a));
					k--;
				}
			}
		}
	}

	function getIdAldea(){
		var a = find("//span[@class='c2']/a", XPFirst);
		if (a){
			a.getAttribute("href").search(/\?newdid=(\d+)/);
			return RegExp.$1;
		}else return 0;
	}

	function longitudPantalla(){
		var enlaces = 0;

		// Se estima que caben 19 enlaces hasta que empiecen a ser demasiados y a ser tenidos en cuenta
		var a = find("//div[@id='lright1']//span[text()]", XPList).snapshotLength;
		if (a > 0) a += 3;

		var b = obtenerValorCookie("marcadores").length;
		if (b > 0) a += b + 2;

		var c = find("//ul/li", XPList);
		if (c > 0) a += c + 2;

		a -= 23;
		if (a > 0) enlaces += a * pixelsPorLinea;

		// Se tiene en cuenta el numero de construcciones
		var a = find("//div[@id='ba']//table[@class='f10' and @width='100%']//tr", XPList).snapshotLength - 2;
		if (a) enlaces += pixelsPorLinea * (a > 0 ? a : 0);

		// Se tiene en cuenta el banner de publicidad
		var a = find("//iframe", XPFirst);
		if (a != null) enlaces += parseInt(a.height);

		return enlaces;
	}

	function calculateResourceTime(necesario){
	  if(!necesario || necesario==undefined || necesario.length<3){return false;}
		var texto_restante = '';
		var tiempo_max = 0;
		var a = null;

		// Calcula y crea una cadena con lo que falta de cada recurso
		for (i = 0; i < 4; i++){
			restante = necesario[i] - actual[i];
			if (restante > 0){
				texto_restante += '<img src="' + img('r/' + (i+1) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '"><span id="timeout' + i + '">' + restante + '</span> | ';
				var tiempo = Math.round(restante / produccion[i]);
				if (tiempo > tiempo_max) tiempo_max = tiempo;
				if (tiempo < 0) tiempo_max = 'Infinity';
                                if (total[i] - actual[i] == 0) tiempo_max = 'Infinity';
			}
		}

		// Calcula y crea una cadena con el tiempo que falta hasta conseguir los recursos
		if (tiempo_max == 'Infinity'){
			a = T('FALTA') + ' ' + texto_restante + ' <img src="' + img('a/clock.gif') + '" width="18" height="12" title="' + T('TIEMPO') + '"> ' + T('NUNCA');
		}else if (tiempo_max > 0){
			var tiempo2 = formatear_tiempo(tiempo_max + 5); // Introduce un margen de 5 segundos para compensar la desviancion de los temporizadores de javascript
			var fecha = new Date();
			fecha.setTime(fecha.getTime() + (tiempo_max * 1000));

			a = T('FALTA') + ' ' + texto_restante + ' <img src="' + img('a/clock.gif') + '" width="18" height="12" title="' + T('TIEMPO') + '"> <span id="timeout" d=1>' + tiempo2 + '</span><br/> ' + T('LISTO') + ' ' + calcularTextoTiempo(fecha);
		}
		return a;
	}

	function calcularTextoTiempo(fecha){
		ahora = new Date();

		// Calcula la diferencia de horas entre la fecha dada y la actual
		// para saber si se trata de las proximas 72 horas
		horas = ((fecha.getTime() - ahora.getTime()) / 1000 / 60 / 60);
		horas += ahora.getHours() + (ahora.getMinutes() / 60);
		if (horas < 24) tiempo_restante = T('HOY');
		else if (horas < 48) tiempo_restante = T('MANYANA');
		else if (horas < 72) tiempo_restante = T('PAS_MANYANA');
		else tiempo_restante = T('EL') + " " + LZ(fecha.getDate()) + "/" + LZ((fecha.getMonth()+1));

		return tiempo_restante + " " + T('A_LAS') + " " + LZ(fecha.getHours()) + ":" + LZ(fecha.getMinutes());
	}

	function calculateTime(necesario){
		var tiempo_max = 0;
		var tiempo = 0;

		for (i = 0; i < 4; i++){
			var restante = necesario[i] - actual[i];
			if (restante > 0){
				tiempo = Math.round(restante / produccion[i]);
				if (tiempo > tiempo_max) tiempo_max = tiempo;
				if (tiempo < 0) tiempo_max = 'Infinity';
			}
		}

		if (tiempo_max > 0 && tiempo_max != 'Infinity') tiempo_max = formatear_tiempo(tiempo_max + 5); // Se introduce un margen de 5 segundos para compensar posibles desviaciones en los temporizadores de javascript
		return tiempo_max;
	}

	function calculateFillTime(){

		// Por cada tipo de recurso calcula el tiempo hasta el llenao
		for (var i = 0; i < 4; i++){
			if (produccion[i] < 0) var tiempo = Math.round(actual[i] / -produccion[i]);
			// Si la produccion es 0, el tiempo es infinito
			else if (produccion[i] == 0) var tiempo = -1;
			// Si la produccion es negativa, se calcula el tiempo hasta el vaciado
			else var tiempo = Math.round((total[i] - actual[i]) / produccion[i]);

                        var produccionHora = $('l' + (4-i)).title;
                        var tiempoRestante = "<span id='timeouta' style='font-weight:bold'>" + formatear_tiempo(tiempo) + "</span>";
                        var celda = elem("DIV", "<span style='font-size:9px; color:#909090; position: absolute; top:13px; height: 20px; text-align:left;'>(" + (produccionHora > 0 ? '+' : '') + produccionHora + ', ' + (produccionHora < 0 ? '<font color="#FF0000">' + tiempoRestante + '</font>' : tiempoRestante) + ')</span>');
			var a = $('l'+(4-i)).previousSibling;
			// FIXME: Apanyo para Firefox. FF mete nodos de tipo texto vacios
			if (a.nodeName == '#text') a = a.previousSibling;
			a.appendChild(celda);
		}
	}

	function T(texto){
		// Intenta usar el array del idioma, y si no esta disponible utiliza el castellano por defecto
		try{
			eval('var language = lang_' + idioma);
		}catch(e){
			eval('var language = lang_hu');
		}
		// Si una cadena concreta no esta traducida en el idioma, utiliza por defecto el castellano
		if (language[texto] == undefined) return lang_hu[texto]; else return language[texto];
	}

	function F(texto, args){
		// "args" debe ser un array asociativo del tipo {'a':'b', 'c':'d'} y puede ser opcional
		try{ eval('var language = lang_' + idioma); }
		catch(e){ eval('var language = lang_hu'); }
		if (language[texto] == undefined) texto = lang_hu[texto]; else texto = language[texto];

		if (args != undefined) for(var i in args) texto = texto.replace(i, args[i]);
		return texto;
	}

	/**
	 * Recupera informacion generica inicial para el resto de funciones
	 */
	function getGeneralData(){
		// Idioma
		idioma=false
		pack_grafico=false
		id_aldea=0
		uid=0
		server="un?"
		try{
//		find("//script[@type='text/javascript']", XPFirst).src.search(/\/([^\/]+)?3.js$/);
		find("//img[contains(@src, 'plus.gif')]", XPFirst).src.search(/\/img\/([^\/]+)\//);
		idioma = RegExp.$1;
}catch(e){}try{
		// Ruta al pack grafico
		find("//link[@rel='stylesheet']", XPFirst).href.search(/^(.*\/)(.*)\.css$/);
		pack_grafico = RegExp.$1;
}catch(e){}try{
		// Identificador de aldea actual
		id_aldea = getIdAldea();
}catch(e){}try{
		// Identificador de usuario
		find("//td[@class='menu']", XPFirst).innerHTML.search(/spieler.php\?uid=(\d+)"/);
		uid = RegExp.$1;
}catch(e){}try{
		// Nombre del servidor
		location.href.search(/http:\/\/(.*)\//);
		server = RegExp.$1;
}catch(e){}try{
		// Por cada tipo de recurso: cantidad actual almacenada, capacidad total del almacen / granero y produccion por segundo
		for (var i = 0; i < 4; i++){
			var a = $('l' + (4-i));
			actual[i] = a.innerHTML.split("/")[0];
			total[i] = a.innerHTML.split("/")[1];
			produccion[i] = a.title/3600;
		}
}catch(e){}try{
		// Plus
		if (find("//img[contains(@src, 'travian1.gif')]", XPFirst)) plus = true; else plus = false;
}catch(e){}
	}

	function hideAd(){
		var ad = find("//iframe", XPFirst);
		if (ad) ad.style.display = 'none';
	}

	function quickLinks(){
		var menu = find("//td[@class='menu']", XPFirst);
		for (var j = 0; j < 2; j++) for (var i = 0; i < menu.childNodes.length; i++) if (menu.childNodes[i].nodeName == 'BR') removeElement(menu.childNodes[i]);
		var links = [	0,
				[T('LOGIN'), "login.php"],
				[T('ALIANZA'), "allianz.php"],
				[T('SIM'), "warsim.php"],
				0,
				[T('COMP'), "http://trcomp.sourceforge.net/?lang=" + idioma, "_blank"],
				['Travilog', "http://travilog.org.ua/"+idioma+"/", "tr3_travilog"],
				['Toolbox', "http://www.traviantoolbox.com/index.php?lang=" + idioma, "tr3_toolbox"]
		];

		for(var i = 0; i < links.length; i++){
			if(links[i]){
				var a = elem("A", links[i][0]);
				a.href = links[i][1];
				if(links[i][2]) a.setAttribute('target', links[i][2]);
				menu.appendChild(a);
			}else menu.appendChild(document.createElement('HR'));
		}
	}

	function confirmDelete(){
		var links = find("//img[contains(@src, 'del.gif')]", XPList);
		for (var i = 0; i < links.snapshotLength; i++){
			links.snapshotItem(i).setAttribute('onClick', 'javascript:return confirm("' + T('SEGURO') + '");');
		}
	}

	function buildingLinks(){
		// Localiza la barra de enlaces superiores
		var barra = find("//div[@id='ltop5']", XPFirst);

		// Asocia el mapa del mercado con la imagen especifica creada

		barra.innerHTML += '<img usemap="#mercado" class="fl2" src="data:image/gif;base64,' + imagenes["mercado"] + '" border="0" title="' + T('MERCADO') + '">';

		// Asocia el mapa de los edificios militares con la imagen creada a tal efecto
		barra.innerHTML += '<img usemap="#militar" class="fl2" src="data:image/gif;base64,' + imagenes["militar"] + '" border="0" title="' + T('CUARTEL') + '">';

		// Mapa para el mercado
		barra.innerHTML += '<map name="mercado"><area shape="rect" coords="0,0,70,50" href="build.php?gid=17" title="' + T('ENVIAR') + '"><area shape="rect" coords="0,50,35,100" href="build.php?gid=17&t=1" title="' + T('COMPRAR') + '"><area shape="rect" coords="35,50,70,100" href="build.php?gid=17&t=2" title="' + T('VENDER') + '"></map>';

		// Mapa para los edificios militares
		barra.innerHTML += '<map name="militar"><area shape="rect" coords="0,0,35,50" href="build.php?gid=16" title="' + T('PUNTO') + '"><area shape="rect" coords="35,0,70,50" href="build.php?gid=19" title="' + T('CUARTEL') + '"><area shape="rect" coords="0,50,35,100" href="build.php?gid=20" title="' + T('CORRAL') + '"><area shape="rect" coords="35,50,70,100" href="build.php?gid=21" title="' + T('TALLER') + '"></map>';

		// Desplaza el menu del Plus a la izquierda para hacer hueco a las nuevas imagenes
		var a = find("//a[contains(@href, 'plus.php')]", XPFirst);
		a.style.marginLeft = '0px';
		a.style.position = 'absolute';
		a.style.left = '-250px';
	}

	function createStatLink(param){
	return;
		var statlink = elem('a', "<img src='data:image/gif;base64," + imagenes["stat"] + "' style='margin:0px 1px 0px 1px; display: inline' title='" + T('STAT') + "' alt='Stat' border=0>");
		statlink.href = "javascript:void(0);";
		var ref = 'http://www.denibol.com/proyectos/travian_world/stat2.php?server=' + server + '&' + param;
		statlink.addEventListener("mouseover", function(){ timeout = setTimeout(function(){ var a = $("tb_tooltip"); a.innerHTML = "<img src='" + ref + "' border='0'/>"; a.style.display = 'block'; }, 1000); }, 0);
		statlink.addEventListener("mouseout", function(){ clearTimeout(timeout); $("tb_tooltip").style.display = 'none'; }, 0);
		statlink.addEventListener("click", function(){ var popup = window.open(ref, 'popup', 'width=350, height=250'); popup.focus(); return false; }, 0);
		return statlink;
	}

	function playerLinks(){
		var links = document.getElementsByTagName("a");
		for(var i = 0; i < links.length; i++){
			// Por cada enlace a una ficha de jugador
			if(links[i].href.search(/spieler.php\?uid=(\d+$)/) > 0) {
				var a = RegExp.$1;
                                if (a == 0) continue;
				if (links[i].parentNode.className == 'menu') continue;
				if (arrayValueExist(tw_server, server)) links[i].parentNode.insertBefore(createStatLink('uid=' + a), links[i].nextSibling);

				// Introduce el enlace para enviar mensajes usando su ID
				var igmlink = elem('a', "<img src='data:image/gif;base64," + imagenes["igm"] + "' style='margin:3px 0px 1px 3px; display: inline' title='" + T('ENVIAR_IGM') + "' alt='" + T('ENVIAR_IGM') + "' border=0>");
				igmlink.href = 'nachrichten.php?t=1&id=' + a;
				links[i].parentNode.insertBefore(igmlink, links[i].nextSibling);
			// Por cada enlace a una localizacion del mapa
			}else if (links[i].href.search(/karte.php\?d=(\d+)/) > 0){
				var a = RegExp.$1;
				if (arrayValueExist(tw_server, server)) links[i].parentNode.insertBefore(createStatLink('id=' + a), links[i].nextSibling);

				// Agrega un enlace para lanzar un ataque usando su posicion
				var atklink = elem('a',"<img src='" + img("a/att_all.gif") + "' style='margin:3px 0px 1px 3px; display: inline' height='10' width='10' title='" + T('ATACAR') + "' alt='" + T('ATACAR') + "' border='0'>");
				atklink.href = 'a2b.php?z=' + a;
				links[i].parentNode.insertBefore(atklink, links[i].nextSibling);
			// Por cada enlace a la ficha de una alianza
			}else if (links[i].href.search(/allianz.php\?aid=(\d+$)/) > 0){
				var a = RegExp.$1;
                                if (a == 0) continue;
				if (arrayValueExist(tw_server, server)) links[i].parentNode.insertBefore(createStatLink('aid=' + a), links[i].nextSibling);
			}
		}
	}

	function opcionesMensajes(){
		var a = find("//*[@class='s7']", XPList);
		for (var i = 0; i < a.snapshotLength - 1; i++){
			var fila = a.snapshotItem(i);
			if ((fila.firstChild != null) && (fila.firstChild.nodeName == "INPUT")){
				fila.innerHTML += '<input style="font-weight:bold; font-size:8pt; height:14pt" name="mtodo" type="button" value="' + T('MARK') + '" onClick="for(var x = 0; x < document.msg.elements.length; x++) document.msg.elements[x].checked = \'checked\';"/>';
				if (!plus) fila.innerHTML += '<input style="font-weight:bold; font-size:8pt; height:14pt" name="archive" type="Submit" value="' + T('ARCHIVE') + '"/>';
				return;
			}
		}
	}

	function quickCity(){
		// Comprueba si esta el formulario de envio
		if (find("//form[@name='snd']", XPFirst) == null) return;
		var ciudades = new Array();

		// Recupera la coordenada X
		var n = find("//table[@class='dtbl']//td[@class='right dlist1']", XPList);
		for(var i = 0; i < n.snapshotLength; i++){
			ciudades[i] = new Object();
			try{ ciudades[i].x = n.snapshotItem(i).innerHTML.split('(')[1]; }catch(e){}
		}

		// Recupera la coordenada Y
		n = find("//table[@class='dtbl']//td[@class='left dlist3']", XPList);
		for(var i = 0; i < n.snapshotLength; i++){
			try{ ciudades[i].y = n.snapshotItem(i).innerHTML.split(')')[0]; } catch(e){}
		}

		// Por cada par de coordenadas crea un evento para copiarlas al formulario
		n = find("//table[@class='dtbl']//tr", XPList);
		for (var i = 0; i < ciudades.length; i++){
			var elem = n.snapshotItem(i);
			elem.setAttribute('onClick',"snd.x.value='" + ciudades[i].x + "';snd.y.value='" + ciudades[i].y + "'");
			elem.setAttribute('onMouseOver', 'this.style.color="red"');
			elem.setAttribute('onMouseOut', 'this.style.color="black"');
			elem.style.cursor = "pointer";
		}
	}

	 function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\\\s)"+searchClass+"(\\\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function ToolTip(id,isAnimated,aniSpeed){
  var isInit = -1;
  var div,divWidth,divHeight;
  var xincr=10,yincr=10;
  var animateToolTip =false;
  var html;

  function Init(id){
   div = $(id);
   if(div==null) return;

   if((div.style.width=="" || div.style.height==""))
   {alert("Both width and height must be set");
   return;}

   divWidth = parseInt(div.style.width);
   divHeight= parseInt(div.style.height);
   if(div.style.overflow!="hidden")div.style.overflow="hidden";
   if(div.style.display!="none")div.style.display="none";
   if(div.style.position!="absolute")div.style.position="absolute";

   if(isAnimated && aniSpeed>0)
   {xincr = parseInt(divWidth/aniSpeed);
    yincr = parseInt(divHeight/aniSpeed);
    animateToolTip = true;
    }

   isInit++;

  }


  this.Show =  function(e,strHTML)
  {
    if(isInit<0) return;

    var newPosx,newPosy,height,width;
    if(typeof( document.documentElement.clientWidth ) == 'number' ){
    width = document.body.clientWidth;
    height = document.body.clientHeight;}
    else
    {
    width = parseInt(window.innerWidth);
    height = parseInt(window.innerHeight);

    }
    var curPosx = (e.x)?parseInt(e.x):parseInt(e.clientX);
    var curPosy = (e.y)?parseInt(e.y):parseInt(e.clientY);

    if(strHTML!=null)
    {html = strHTML;
     div.innerHTML=html;}

    if((curPosx+divWidth+10)< width)
    newPosx= curPosx+10;
    else
    newPosx = curPosx-divWidth;

    if((curPosy+divHeight)< height)
    newPosy= curPosy;
    else
    newPosy = curPosy-divHeight-10;

   if(window.pageYOffset)
   { newPosy= newPosy+ window.pageYOffset;
     newPosx = newPosx + window.pageXOffset;}
   else
   { newPosy= newPosy+ document.body.scrollTop;
     newPosx = newPosx + document.body.scrollLeft;}

    div.style.display='block';
    //debugger;
    //alert(document.body.scrollTop);
    div.style.top= newPosy + "px";
    div.style.left= newPosx+ "px";

    div.focus();
    if(animateToolTip){
    div.style.height= "0px";
    div.style.width= "0px";
    ToolTip.animate(div.id,divHeight,divWidth);}


    }



   this.Hide= function(e)
    {div.style.display='none';
    if(!animateToolTip)return;
    div.style.height= "0px";
    div.style.width= "0px";}

   this.SetHTML = function(strHTML)
   {html = strHTML;
    div.innerHTML=html;}

    ToolTip.animate = function(a,iHeight,iWidth)
  { a = $(a);

   var i = parseInt(a.style.width)+xincr ;
   var j = parseInt(a.style.height)+yincr;

   if(i <= iWidth)
   {a.style.width = i+"px";}
   else
   {a.style.width = iWidth+"px";}

   if(j <= iHeight)
   {a.style.height = j+"px";}
   else
   {a.style.height = iHeight+"px";}

   if(!((i > iWidth) && (j > iHeight)))
   setTimeout( "ToolTip.animate('"+a.id+"',"+iHeight+","+iWidth+")",1);
    }

   Init(id);
}



	function preCalculate1(){
		var datos = 0;

		// Crea una matriz inicializada a 0 con todos los posibles niveles de cada tipo de recurso
		var grid = new Array(4);
		for(i = 0; i < 4; i ++) {
			grid[i] = new Array(26);
			for(j = 0; j <= 25; j++) {
				grid[i][j] = 0;
			}
		}

		// Solo hay 6 tipos de aldeas de 15 casillas cada uno. Se describe el tipo de recurso por casilla
		var dist = [
			[3, 3, 0, 3, 3, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], // 9 cereales
			[2, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[0, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[0, 3, 0, 1, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[0, 3, 0, 2, 0, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[3, 3, 0, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3] // 15 cereales
		];//0fa 1agyag 2vas 3búza

		find("//div[starts-with(@id, 'f')]", XPFirst).id.search(/f(\d)/);
		var tipo = RegExp.$1;
		for (var i = 1; i <= 18; i++){

//#####################################################################################################################################################
    lvl=getElementsByClass("rf"+i,document,"img")[0];
	if(!lvl){
		lvl=0;
	}else if(lvl.src.substr(33,2)=="s/"){
      lvl=lvl.src.substr(36,2)*1;
    }else{
      lvl=lvl.src.substr(33,2)*1;
    }
  cost=buildingCost[dist[tipo-1][i-1]][lvl*1+1]



	  if(!cost || cost==undefined || cost.length<3){lvl="red";}
		var tiempo_max = 0;//várakozási idő
		var a = null;

		// Calcula y crea una cadena con lo que falta de cada recurso

		for (m = 0; m < 4; m++){
			restante = cost[m] - actual[m];
			if (restante > 0){
				var tiempo = Math.round(restante / produccion[m]);
				if (tiempo > tiempo_max) tiempo_max = tiempo;
				if (tiempo < 0) tiempo_max = 'Infinity';
                if (total[m] - actual[m] == 0) tiempo_max = 'Infinity';
			}
		}



  if(tiempo_max==0){
    lvl="#0C9E1B";
    title="építhető";
  }else{
    lvl="red";
    tiempo_max=tiempo_max/1000
    ora=Math.floor(tiempo_max/3600);
    perc=Math.floor(tiempo_max/60)-ora*60;
    mp=tiempo_max-ora*3600-perc*60;
    document.getElementsByTagName("area")[i].title+="\n"+ora+":"+perc+":"+mp+" mulva építhető"
  }
  $("f"+tipo).innerHTML+= "<span class='rf"+i+"' "+
    "style='color:"+lvl+";font-size:35px;font-weight:normal;margin-top:-16px;margin-left:-6px;z-index:100;'>O</span>";
//#####################################################################################################################################################
			var a = find("//img[@class='rf" + i + "']", XPFirst);
			if (a){
				a.src.search(/\/s(\d+).gif$/);
				grid[dist[tipo - 1][i - 1]][RegExp.$1]++;
			}else{
				grid[dist[tipo - 1][i - 1]][0]++;
			}
		}

    return false;

		// Crea una tabla mostrando por cada tipo de recurso un representante de cada nivel que se ha encontrado
		// Muestra al lado de cada uno los recursos y tiempo restantes hasta poder subirlo de nivel
		var table = elem('TABLE',"",{class:"tbg",align:"center",cellspacing:"1",cellpadding:"2"});
		var fila1 = document.createElement('TR');
		var fila2 = document.createElement('TR');
		fila1.setAttribute("class", "rbg");
		table.appendChild(fila1);
		table.appendChild(fila2);
		for (var i = 0; i < 4; i++){
			var td1 = elem('TD', '<img src="' + img('r/' + (i+1) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '">');
			fila1.appendChild(td1);

			var td2 = document.createElement('TD');
			fila2.appendChild(td2);
			var table2 = document.createElement('TABLE');
			table2.setAttribute("align", "center");
			td2.appendChild(table2);
			for (var j = 0; j < 25; j++){
				if (grid[i][j] > 0 && buildingCost[i][j+1] != null){
					datos = 1;
					var fila3 = document.createElement('TR');
					var imagen = '<div style="width: 0%;"><img src="data:image/gif;base64,' + imagenes["r" + i] + '" border="0" title="' + T('RECURSO' + (i+1)) + '">';
					if (j > 0) imagen += '<img src="' + img('g/s/s' + j + '.gif') + '" style="position:relative; bottom:52px; left: 27px;" border="0">';
					imagen += '</div>';
					var td = elem("TD", imagen);
					fila3.appendChild(td);

					var restante = calculateResourceTime(buildingCost[i][j+1]);
					var td3 = document.createElement('TD');
					td3.setAttribute('class', 'c f7');
					fila3.appendChild(td3);
					table2.appendChild(fila3);

					if (restante != null) td3.innerHTML = restante;
					else td3.innerHTML = T('SUBIR_NIVEL');
				}
			}
		}
		table.style.position = 'absolute';
		table.setAttribute("id", "resumen");
		// Se desplaza la tabla hacia abajo para no interferir con la lista de aldeas / enlaces derecha
		table.style.top = 553+ longitudPantalla() + 'px';
		if (datos == 1) document.body.appendChild(table);
	}

	/**
	 * Realiza un resumen de la pagina de edificios de la aldea
	 */



//# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
// ›› Main.
function dorf2_coords(t){
	var x = 152;
	var y = 160;
	if(inIframe){x=20;y=50}
	a=[318,121,204,264,338,394,86 ,167,253,401,72 ,198,161,408,90 ,233,360,164,292,150,266,290];
	b=[166,82 ,57 ,47 ,62 ,111,121,128,111,152,191,156,182,210,230,226,243,266,260,297,306,356];
	a=a[t]+x;
	b=b[t]+y;
  return [b,a];
}
function dorf2_korok(){
return;
	dorf2_css()
	var map1Element = document.getElementsByName('map1')[0];
	if (map1Element){

		// ›› Map1 ONLY has area children.
		var areaElements = map1Element.childNodes;
		var BuildingLevel, smalllDIV;
		var BuildingURL = new Array(21);

		for (var i = 0; i < 22; i++) {
			BuildingLevel = /(\d+)/.exec(areaElements[i].getAttribute("title"));
			BuildingURL = areaElements[i].getAttribute("href");

			// ›› Only show spots with buildings on them.
			if (BuildingLevel){
				smalllDIV = dorf2_addDiv('TMbuildingtag' + i,'TMbuildingtags',BuildingLevel[0],false);
				smalllDIV.style.top = dorf2_coords(i)[0] + 'px';
				smalllDIV.style.left = dorf2_coords(i)[1] + 'px';
				smalllDIV.style.border = '3px solid black';

				smalllDIV.style.visibility = "visible";
				smalllDIV.setAttribute('goto', BuildingURL);
				smalllDIV.addEventListener('click', function() {
					window.location.href = this.getAttribute('goto');
					}, true);
			}
		}
	}
}
// ›› Adds a generic div.
function dorf2_addDiv(id,style,html,parent){
	var body, div;
	if (!parent){body = document.getElementsByTagName('body')[0];}else{body = document.getElementsByTagName(parent);}
	if (!body) { return false; }
	div = document.createElement('div');
	div.id = id;
	div.className = style;
	if (html){div.innerHTML = html;}
	body.appendChild(div);
	return div;
}

function dorf2_css() {
	var cssString = '.TMbuildingtags{' +
		'background-color:#FDF8C1;' +
		'border:thin solid #000000;' +
		'-moz-border-radius: 2em;' +
		'border-radius: 2em;' +
		'padding-top: 3px;' +
		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
		'font-size:8pt;' +
		'font-weight:bold;' +
		'text-align:center;' +
		'position:absolute;' +
		'width:18px;' +
		'height:15px;' +
		'cursor:pointer;' +
		'visibility:hidden;' +
		'z-index:50;}';
	var style = elem('STYLE',cssString);
	style.type = 'text/css';
	document.getElementsByTagName('HEAD')[0].appendChild(style);
}
//# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #


	function preCalculate2(){
		var edificiosPorFila = 3;
		var datos = 0;
		var buildingsImages = new Array();
		var buildingsDescs = new Array();
		var buildingsLinks = new Array();

		// recoge los nombres de cada uno
		xpathResult = find('//map[@name="map1"]/area/@title', XPIter);
		while ((buildingsDescs[buildingsDescs.length] = xpathResult.iterateNext())) {}

		// los enlaces para acceder directamente a ellos
		xpathResult = find('//map[@name="map1"]/area/@href', XPIter);
		while ((buildingsLinks[buildingsLinks.length] = xpathResult.iterateNext())) {}

		// Procesa as imagenes de los edificios
		var xpathResult = find('//div[@id="lmid2"]/img/@src', XPIter);
		buildingsImages[0] = document.createTextNode(img("g/g16.gif"));
		while ((buildingsImages[buildingsImages.length] = xpathResult.iterateNext())) {}
		// Soporte para murallas

		var a = find("//div[starts-with(@class, 'd2_x')]", XPFirst);
		if (a){
			switch(a.className){
				case 'd2_x d2_0': break;
				case 'd2_x d2_1': var b = "g/g31.gif"; break;
				case 'd2_x d2_11': var b = "g/g32.gif"; break;
				case 'd2_x d2_12': var b = "g/g33.gif"; break;
			}
			if (b) buildingsImages[buildingsDescs.length - 4] = document.createTextNode(img(b));
		}
		var table = document.createElement('TABLE',"",{class:"tbg",align:"center",cellspacing:"1",cellpadding:"2"})
		var j = 0;
		for(var i = 0; i < buildingsDescs.length - 3; i++) {
			if(buildingsDescs[i] != null && basename(buildingsImages[i].nodeValue) != 'iso.gif') {
				// Por cada edificio se recoge su nivel y su codigo en el juego
				buildingLevel = buildingsDescs[i].nodeValue.split(" ");
				buildingLevel = parseInt(buildingLevel[buildingLevel.length-1]);

				buildingCode = buildingsImages[i].nodeValue.split("/");
				buildingCode = buildingCode[buildingCode.length-1].split(".");
				if (buildingCode[0].search(/(\d+)/)) buildingCode = parseInt(RegExp.$1);
			//	buildingCode = parseInt(buildingCode[0].substring(1, buildingCode[0].length));

				// Si es actualizable se muestra junto con los recursos que necesita
				if (buildingCost[buildingCode] != null && buildingCost[buildingCode][buildingLevel+1] != null){

					// Se reparten los edificios entre las columnas disponibles en las filas que haga falta
					if (j % edificiosPorFila == 0){
						var fila = document.createElement('TR');
						table.appendChild(fila);
					}
					j++;
					datos = 1;

					// Soporte para murallas

					var td = document.createElement("TD");
					fila.appendChild(td);

					var table2 = document.createElement('TABLE');
					table2.setAttribute("align", "center");
					td.appendChild(table2);

					var fila2 = document.createElement('TR');
					table2.appendChild(fila2);

					var td2 = document.createElement("TD");
					td2.setAttribute('class', 'f10');
					td2.innerHTML = '<a href="' + buildingsLinks[i].nodeValue + '">' + buildingsDescs[i].nodeValue + '<br/><img src="' + buildingsImages[i].nodeValue  + '" border="0"></a>';
					fila2.appendChild(td2);

					var restante = calculateResourceTime(buildingCost[buildingCode][buildingLevel+1]);
					var td3 = document.createElement("TD");
					td3.setAttribute('class', 'c f7');
					fila2.appendChild(td3);

					if (restante != null) td3.innerHTML = restante;
					else td3.innerHTML = T('SUBIR_NIVEL');

					//*/
				  //if(calculateResourceTime(buildingCost[buildingCode][buildingLevel+1])==null){var lvl="#0C9E1B";}else{var lvl="red";}
				  //$("TMbuildingtag"+i).style.border="3px solid "+lvl;
				}
			}
		}
		//*
		if (j % edificiosPorFila != 0) fila.appendChild(document.createElement("TD"));
		table.style.position = 'absolute';
		table.setAttribute("id", "resumen");
		// Se desplaza la tabla hacia abajo para no interferir con la lista de aldeas / enlaces derecha
		table.style.top = 575 + longitudPantalla() + 'px';
		if (datos == 1) document.body.appendChild(table);
		table.style.opacity=0.80;
    table.style.MozOpacity=0.80;
    table.style.KhtmlOpacity=0.80
    table.style.filter="alpha(opacity=80)";//*/
	}

	function preCalculate3(){
		var datos = 0;
		var a = find("//*/area[@onmouseover]", XPList);

		var table = elem('TABLE',"",{id:"tabla_mapa",sortCol:-1,class:"tbg",align:"center",cellspacing:"1",cellpadding:"2"});
		var thead = document.createElement("THEAD");
		var tbody = document.createElement("TBODY");
		var fila = document.createElement('TR');
		fila.setAttribute('class', "rbg");
		thead.appendChild(fila);
		table.appendChild(thead);
		var etiquetas_tabla = ["JUGADOR", "ALIANZA", "ALDEA", "HAB", "COORD", "ACCION"];
		for (var i = 0; i < 6; i++){
			var td = elem('TD', T(etiquetas_tabla[i]));
			if (i < 4){
				switch(i){
					case 3: td.addEventListener("click", sortTable('tabla_mapa', i, 'int'), 0); break;
					default: td.addEventListener("click", sortTable('tabla_mapa', i), 0);
				}
				td.style.cursor = "pointer";
			}
			fila.appendChild(td);
		}
		// Procesa todas las casillas visibles del mapa
		for(var i = 0; i < a.snapshotLength; i++) {
			var aldea = a.snapshotItem(i);
			var mouseOver = aldea.getAttribute("onmouseover");
			// Por cada aldea se muestra toda la informacion posible y enlaces rapidos para atacar y enviar recursos
			if(mouseOver.substring(0,1) != "x") {
				datos = 1;
				var fila = document.createElement('TR');
				tbody.appendChild(fila);
				datos_aldea = mouseOver.substring(4, mouseOver.length - 1).split(",");
				var href = aldea.getAttribute("href");
				fila.appendChild(elem('TD', datos_aldea[1].substring(1, datos_aldea[1].length - 1)));
				fila.appendChild(elem('TD', datos_aldea[3].substring(1, datos_aldea[3].length - 1)));
				fila.appendChild(elem('TD', decodeEntity(datos_aldea[0].substring(1, datos_aldea[0].length - 1))));
				fila.appendChild(elem('TD', datos_aldea[2].substring(1, datos_aldea[2].length - 1)));
				fila.appendChild(elem('TD', '<a href="' + href + '">' + datos_aldea[4].substring(1, datos_aldea[4].length - 1) + ", " + datos_aldea[5].substring(1, datos_aldea[5].length - 1) + '</a>'));
				fila.appendChild(elem('TD', '<a href="' + href.replace("karte.php?d", "a2b.php?z") + '">' + T('ATACAR') + '</a> / <a href="' + href.replace("karte.php?d", "build.php?z") + '&gid=17">' + T('COMERCIAR') + '</a>'));
			}
		}
		table.appendChild(tbody);
		table.style.position = 'absolute';
		table.style.top = 580 + longitudPantalla() + 'px';
		if (datos == 1) document.body.appendChild(table);
	}

	function sortTable(sTableID, iCol, sDataType) {
		return function(){
			var oTable = $(sTableID);
			var oTBody = oTable.tBodies[0];
			var colDataRows = oTBody.rows;
			var aTRs = new Array;

			for (var i = 0; i < colDataRows.length; i++) aTRs[i] = colDataRows[i];
			if (oTable.getAttribute("sortCol") == iCol) aTRs.reverse();
			else aTRs.sort(generateCompareTRs(iCol, sDataType));

			var oFragment = document.createDocumentFragment();
			for (var i = 0; i < aTRs.length; i++) oFragment.appendChild(aTRs[i]);

			oTBody.appendChild(oFragment);
			oTable.setAttribute("sortCol", iCol);
		};
	}

	function convert(element, sDataType) {
		switch(sDataType) {
			case "int": return ((element.nodeValue == null) || !element.nodeValue.match(/\d+/)) ? 0 : parseInt(element.nodeValue);
			case "float": return ((element.nodeValue == null) || !element.nodeValue.match(/\d+/)) ? 0 : parseFloat(element.nodeValue);
			default: return (element == null) ? '' : element.textContent.toLowerCase();
		}
	}

	function generateCompareTRs(iCol, sDataType) {
		return function compareTRs(oTR1, oTR2) {
			var vValue1 = convert(oTR1.cells[iCol].firstChild, sDataType);
			var vValue2 = convert(oTR2.cells[iCol].firstChild, sDataType);

			if (vValue1 < vValue2) return -1;
			else if (vValue1 > vValue2) return 1;
			else return 0;
		};
	}

	function blocNotas(){
		var a = find("//div[@id='lright1']//table[@class='f10']", XPFirst);

		// Carga las notas previas si existen
		var notas = readCookie("notas_" + server);
		if (notas == null) notas = ''; else notas = unescape(notas);

		// Crea la estructura HTML del bloc
		var tabla = document.createElement("TABLE");
		tabla.id="jegyzetek"
		var tr = document.createElement("TR");
		var td = document.createElement("TD");
		var p1 = document.createElement("P");
		var p2 = document.createElement("P");
		var textarea = elem("TEXTAREA", notas);
		var input = document.createElement("INPUT");
		var im = document.createElement("IMG");
		im.setAttribute("src",img('msg/block_bg21.gif', true));
		im.setAttribute("width","260");

		tabla.setAttribute("width", "260");
		td.setAttribute("align", "center");
		//td.setAttribute("background", img('msg/block_bg21.gif', true));
		textarea.setAttribute("cols", "28");
		textarea.setAttribute("rows", "5");
		textarea.setAttribute("style", 'background-image: url(' + img('msg/underline.gif', true) + '); border : 0px; overflow:auto');
		input.setAttribute("type", "image");
		input.setAttribute("border", "0");
		input.setAttribute("src", img('b/s1.gif', true));
		// En el evento del boton de guardado actualiza el valor de la cookie (1 ańo de duracion por defecto)
		input.addEventListener("click", function(){ createCookie("notas_" + server, escape(textarea.value), 365); alert(T('GUARDADO')); }, 0);

		td.appendChild(elem("P", "&nbsp;"));
		//p1.appendChild(textarea);
		//td.appendChild(p1);
		td.appendChild(im);
        td.appendChild(textarea);
		p2.appendChild(input);
		p2.appendChild(input);
		td.appendChild(p2);
		tr.appendChild(td);
		tabla.appendChild(tr);
		a.parentNode.appendChild(document.createElement("P"));
		a.parentNode.appendChild(tabla);

	}

	function createEventoMapa(i, href){
		var funcion = function (){
			var despl = [-801, 1, 801, -1];
			var d = document.getElementsByName("desp")[0].value;
			if (d < 1) d = 1;
			// Actualiza el valor de la cookie
			createCookie("desp", d, 365);
			var base = parseInt(href.split("=")[1]);
			ajaxRequest("ajax.php?action=map_content&z=" + (base + (despl[i] * (d - 1))), "GET", null,
				function(t){
					$("map_content").innerHTML = t.responseText;
					infoRecursos();
					desplazarMapa();
					removeElement($("tabla_mapa"));
					preCalculate3();
				}
			, dummy);
		};
		return funcion;
	}

	function desplazarMapa(){
	return;
		// Crea y anyade la casilla del desplazamiento
		var b = find("//form[@method='post']", XPFirst).parentNode;
		var tr = document.createElement("TR");
		// Carga el ultimo valor utilizado si existe
		var d = readCookie("desp");
		var td1 = elem("TD", "<b>" + T('DESP_ABR') + "</b>");
		var td2 = elem("TD", '<input name="desp" value="' + (d == null ? '1' : d) + '" size="2" maxlength="4" class="fm fm25">');
		td1.setAttribute("colspan", 2);
		td2.setAttribute("colspan", 2);
		tr.appendChild(td1);
		tr.appendChild(td2);
		b.appendChild(tr);

		if (location.href.match(/karte.php($|\?z=)/) && arrayValueExist(tw_server, server)){
			var center_id = xy2id(find("//input[@name='xp']", XPFirst).value, find("//input[@name='yp']", XPFirst).value);
			var href = "http://www.denibol.com/proyectos/travian_world/karte3.php?z=" + center_id + "&server=" + server + "&user=" + uid;
			var td3 = elem("TD", '<a href="' + href + '" onClick="pop(\'' + href + '\'); return false;" target="_blank"><img src="' + img('m/max.gif') + '" width="33" height="25" border="0" alt="' + T('MAP_EXT') + '" title="' + T('MAP_EXT') + '"></a>');
			td3.setAttribute("colspan", 2);
			tr.appendChild(td3);
		}

		// Inserta los eventos para manipular los desplazamientos
		var a = find("//map/area[@onclick]", XPList);
		for (var i = 0; i < a.snapshotLength; i++){
			var b = a.snapshotItem(i);
			b.setAttribute("onclick", '');
			b.addEventListener("click", createEventoMapa(i % 4, b.href), 0);
			b.href = 'javascript:void(0)';
		}
	}

	function alianzaMercado(){
		var a = find("//tr[@class='rbg']", XPFirst).parentNode;

		// Prepara la insercion de la nueva columna
		var b = a.getElementsByTagName("TR");
		// FIXME: Apanyo para Firefox. FF mete nodos de tipo texto vacios
		b[0].childNodes[b[0].childNodes.length == 3 ? 1 : 0].setAttribute('colspan', '8');
		b[b.length - 1].childNodes[0].setAttribute("colspan", "8");

		// Crea e inserta la columna
		var columna = document.createElement("TD");
		columna.innerHTML = T('ALIANZA');
		b[1].appendChild(columna);

		// Rellena la columna con los nombres de las alianzas
		for(var i = 2; i < b.length - 1; i++){
			var alianza = document.createElement("TD");
			// FIXME: Apanyo para Firefox. FF mete nodos de tipo texto vacios
			var alianza_txt = b[i].childNodes[b[i].childNodes.length == 12 ? 8 : 4].getAttribute('title');
			if (alianza_txt != null) alianza.innerHTML = alianza_txt;
			b[i].appendChild(alianza);
		}
	}

	function crearEventoRecursosMercado(recurso, cantidad){
		return function(){
			var a = document.getElementsByTagName('input')[recurso + 1].value;
			if (a == '') var suma = 0; else var suma = parseInt(a);
			suma += cantidad;
			// La cantidad a enviar no puede superar lo disponible
			if (suma > actual[recurso]) suma = actual[recurso];
			// La cantidad a enviar no debe poder superar la capacidad de los comerciantes disponibles
			var max_capacidad = parseInt(find("//p//b", XPFirst).innerHTML);
			var max_comercian = parseInt(find("//table[@class='f10']//tr//td[@colspan='2']", XPFirst).innerHTML.split(' ')[1].split('/')[0]);
			var max_transport = max_capacidad * max_comercian;
			if (suma > max_transport) suma = max_transport;

			document.getElementsByTagName('input')[recurso + 1].value = suma;
		}
	}

	function recursosMercado(){
		if (find("//input[@type='text']", XPList).snapshotLength != 7) return;

		// Array con las nuevas cantidades
		var max_capacidad = parseInt(find("//p//b", XPFirst).innerHTML);
		var cantidades = [100, 250, 500, 1000];
		var repetido = false;
		for (var i = 0; i < cantidades.length; i++) if (max_capacidad == cantidades[i]){ repetido = true; break; }
		if (!repetido) cantidades = [100, 500, 1000, max_capacidad];
		var a = find("//table[@class='f10']", XPFirst);
		var k = 0;
		// FIXME: Apanyo para Firefox. FF mete nodos de tipo texto vacios
		a = a.childNodes[a.childNodes.length == 2 ? 1 : 0].childNodes;
		for (var i = 0; i < a.length; a.length == 8 ? i += 2 : i++){
			// Se eliminan las posibilidades originales
			// FIXME: Apanyo para Firefox. FF mete nodos de tipo texto vacios
			a[i].removeChild(a[i].childNodes[a[i].childNodes.length > 4 ? 5 : 3]);

			// Por cada nueva cantidad y recurso se crea un enlace con el evento asociado
			for(var j = 0; j < cantidades.length; j++){
				var enlace = document.createElement('A');
				enlace.href = "javascript:void(0)";
				enlace.innerHTML = '(' + cantidades[j] + ')';
				enlace.addEventListener('click', crearEventoRecursosMercado(k, cantidades[j]), false);

				a[i].appendChild(enlace);
			}
			k++;
		}
	}

	function pc2aldeas(puntos){ return Math.round(Math.pow((puntos / 1000) / 1.6, 1 / 2.3)); }

	function aldeas2pc(aldeas){ return Math.round(1.6 * Math.pow(aldeas, 2.3)) * 1000; }

	function puntosCultura(){
		var a = find("//div[@id='lmid2']//b", XPList);
		if (a.snapshotLength != 5) return;

		// Produccion de puntos de cultura de todas las aldeas
		var pc_prod_total = parseInt(a.snapshotItem(2).innerHTML);
		// Cantidad de puntos de cultura actuales
		var pc_actual = parseInt(a.snapshotItem(3).innerHTML);
		// Puntos de cultura necesarios para fundar la siguiente aldea
		var pc_aldea_prox = parseInt(a.snapshotItem(4).innerHTML);

		// Numero de aldeas actuales
		var aldeas_actuales = pc2aldeas(pc_aldea_prox);
		// Numero de aldeas que se pueden tener con los PC actuales
		var aldeas_posibles = pc2aldeas(pc_actual);

		var texto = '<table class="tbg" align="center" cellspacing="1" cellpadding="2"><tr class="rbg"><td>' + T('ALDEA')+ '</td><td>' + T('PC') +"("+aldeas_actuales+" falvad van)</td></tr>";
		var max=3
		for (var i = 0; i < max; i++){
			texto += '<tr><td>' + (aldeas_actuales + i + 1) + '</td><td>';

			// PC necesarios para conseguir la siguiente aldea
			var pc_necesarios = aldeas2pc(aldeas_actuales + i);

			// Si hay PC de sobra
			if (pc_necesarios < pc_actual){ 
				texto += T('FUNDAR');
				max++;
			}else{
				// Tiempo en segundos hasta conseguir los puntos de cultura necesarios
				var tiempo = ((pc_necesarios - pc_actual) / pc_prod_total) * 86400;

				var fecha = new Date();
				fecha.setTime(fecha.getTime() + (tiempo * 1000));
				var texto_tiempo = calcularTextoTiempo(fecha);

				texto += T('FALTA') + ' <b>' + (pc_necesarios - pc_actual) + '</b> ' + T('PC') +'<br/>';
				texto += T('LISTO') + " " + texto_tiempo;
			}
			texto += '</td></tr>';
		}
		texto += '</table>';

		a.snapshotItem(4).parentNode.innerHTML += "<p>" + texto + "</p>";
	}

	function asignarFiltro(oferta, filtro){
		oferta.setAttribute("style", "display:none");
		oferta.setAttribute("filtro" + filtro, "on");
	}

	function quitarFiltro(oferta, filtro, filtros){
		oferta.removeAttribute("filtro" + filtro);
		var remove = true;
		for (var i = 0; i < filtros.length; i++) if (oferta.getAttribute("filtro" + filtros[i]) == 'on') remove = false;
		if (remove == true) oferta.removeAttribute("style");
	}

	function funcionFiltrosMercado(tipo, recurso){
		var funcion = function (){
			var a = find("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]//tr[not(@class)]", XPList);
			for (var i = 0; i < a.snapshotLength - 1; i++){
				var b = a.snapshotItem(i);
				// FIXME: Apanyo para Firefox. FF mete nodos de tipo texto vacios
				if (b.childNodes.length > 8) var error = true; else var error = false;
				b.childNodes[error ? 1 : 0].firstChild.src.search(/\/(\d).gif$/); var ofrezco = RegExp.$1;
				b.childNodes[error ? 4 : 2].firstChild.src.search(/\/(\d).gif$/); var busco = RegExp.$1;
				var ofrezco_cantidad = parseInt(b.childNodes[error ? 2 : 1].innerHTML);
				var busco_cantidad = parseInt(b.childNodes[error ? 6 : 3].innerHTML);
				if (b.childNodes[error ? 11 : 6].className == 'c') var carencia = true; else var carencia = false;
				var tiempo = calcular_segundos(b.childNodes[error ? 10 : 5].innerHTML);

				// Para mantener 4 filtros activos a la vez sobre cada oferta, utiliza 3 atributos distintos
				// sobre cada fila
				switch(tipo){
					case 0: if ((ofrezco != recurso) && recurso != 5) asignarFiltro(b, "Ofrezco");
						else quitarFiltro(b, "Ofrezco", ["Busco", "Tipo", "Carencia", "Tiempo"]);
						break;
					case 1: if ((busco != recurso) && recurso != 5) asignarFiltro(b, "Busco");
						else quitarFiltro(b, "Busco", ["Ofrezco", "Tipo", "Carencia", "Tiempo"]);
						break;
					case 2: switch(recurso){
							case 1: if (ofrezco_cantidad != busco_cantidad) asignarFiltro(b, "Tipo");
								else quitarFiltro(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								break;
							case 2: if (ofrezco_cantidad <= busco_cantidad) asignarFiltro(b, "Tipo");
								else quitarFiltro(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								break;
							case 3: if (ofrezco_cantidad >= busco_cantidad) asignarFiltro(b, "Tipo");
								else quitarFiltro(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								break;
							case 4: quitarFiltro(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								break;
						} break;
					case 3: switch(recurso){
							case 1: if (carencia == true) asignarFiltro(b, "Carencia");
								else quitarFiltro(b, "Carencia", ["Ofrezco", "Busco", "Tipo", "Tiempo"]);
								break;
							case 2: quitarFiltro(b, "Carencia", ["Ofrezco", "Busco", "Tipo", "Tiempo"]);
								break;
						} break;
					case 4: switch(recurso){
							case 1: if (tiempo > (60*60)) asignarFiltro(b, "Tiempo");
								else quitarFiltro(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
								break;
							case 2: if (tiempo > (2*60*60)) asignarFiltro(b, "Tiempo");
								else quitarFiltro(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
								break;
							case 3: if (tiempo > (3*60*60)) asignarFiltro(b, "Tiempo");
								else quitarFiltro(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
								break;
							case 4: quitarFiltro(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
								break;
						} break;
				}
			}

			// Para mantener un unico sombreado por cada filtro, activa el que se ha seleccionado y elimina
			// el resto de su tipo
			for (var i = 0; i < 5; i++){
				for (var j = 0; j < 6; j++){
					var a = find("//td[@id='filtro" + i + j + "']", XPFirst);
					if (a){
						if (i == tipo && j == (recurso - 1)){
							a.setAttribute("style", "background-color:#F5F5F5");
						}else if (i == tipo){
							a.removeAttribute("style");
						}
					}
				}
			}
		};
		return funcion;
	}

	function filtrosMercado(){
		var table = document.createElement("TABLE");
		table.setAttribute("class", "tbg");
		table.setAttribute("style", "width:100%");
		table.setAttribute("cellspacing", "1");
		table.setAttribute("cellpadding", "2");

		// Se crea la tabla con 3 filas, Ofrezco, Busco y Tipo
		var etiquetas = [T('OFREZCO'), T('BUSCO')];
		for (var j = 0; j < 2; j++){
			var tr = document.createElement("TR");
			tr.appendChild(elem("TD", etiquetas[j]));
			// Para Ofrezco y Busco se muestran 4 materiales y un quinto comodin
			for (var i = 0; i < 4; i++){
				var td = document.createElement("TD");
				td.setAttribute("id", "filtro" + j + i);
				var ref = elem("A", "<img src='" + img('r/' + (i+1) + '.gif') + "' width='18' height='12' border='0' title='" + T('RECURSO' + (i+1)) + "'>");
				td.addEventListener("click", funcionFiltrosMercado(j, i+1), 0);
				td.appendChild(ref);
				tr.appendChild(td);
			}
			var td = document.createElement("TD");
			td.setAttribute("style", "background-color:#F5F5F5");
			td.setAttribute("id", "filtro" + j + "4");
			var ref = elem("A", T('CUALQUIERA'));
			ref.setAttribute("href", "javascript:void(0)");
			td.addEventListener("click", funcionFiltrosMercado(j, 5), 0);
			td.appendChild(ref);
			tr.appendChild(td);
			table.appendChild(tr);
		}

		// Tipo de transaccion segun la relacion entre oferta y demanda
		var tr = document.createElement("TR");
		tr.appendChild(elem("TD", T('TIPO')));
		table.appendChild(tr);
		var etiquetas_tipo = ["1:1", "1:>1", "1:<1", "1:x"];
		for (var i = 0; i < 4; i++){
			var td = document.createElement("TD");
			td.setAttribute("id", "filtro" + 2 + i);
			if (i == 3) td.setAttribute("style", "background-color:#F5F5F5");
			var ref = elem("A", etiquetas_tipo[i]);
			ref.setAttribute("href", "javascript:void(0)");
			td.addEventListener("click", funcionFiltrosMercado(2, (i+1)), 0);
			td.appendChild(ref);
			tr.appendChild(td);
		}
		tr.appendChild(document.createElement("TD"));

		// Tiempo maximo de transporte
		var tr = document.createElement("TR");
		tr.appendChild(elem("TD", T('MAXTIME')));
		table.appendChild(tr);
		var etiquetas_tipo = ["1", "2", "3", ">3"];
		for (var i = 0; i < 4; i++){
			var td = document.createElement("TD");
			td.setAttribute("id", "filtro" + 4 + i);
			if (i == 3) td.setAttribute("style", "background-color:#F5F5F5");
			var ref = elem("A", etiquetas_tipo[i]);
			ref.setAttribute("href", "javascript:void(0)");
			td.addEventListener("click", funcionFiltrosMercado(4, (i+1)), 0);
			td.appendChild(ref);
			tr.appendChild(td);
		}
		tr.appendChild(document.createElement("TD"));

		// Filtro por disponibilidad de recursos y mercaderes
		var tr = document.createElement("TR");
		tr.appendChild(elem("TD", T('DISPONIBLE')));
		table.appendChild(tr);
		var etiquetas_carencia = [T('SI'), T('NO')];
		for (var i = 0; i < 2; i++){
			var td = document.createElement("TD");
			td.setAttribute("colspan", "2");
			td.setAttribute("id", "filtro" + 3 + i);
			if (i == 1) td.setAttribute("style", "background-color:#F5F5F5");
			var ref = elem("A", etiquetas_carencia[i]);
			ref.setAttribute("href", "javascript:void(0)");
			td.addEventListener("click", funcionFiltrosMercado(3, (i+1)), 0);
			td.appendChild(ref);
			tr.appendChild(td);
		}
		tr.appendChild(document.createElement("TD"));

		// Busca la tabla de ofertas y la inserta justo antes
		var a = find("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]", XPFirst);
		var p = document.createElement("P");
		p.appendChild(table);
		a.parentNode.insertBefore(p, a);
	}

        function crearFuncionExplorarUnidades(id, coste){
                var funcion = function (){
                        var a = find("//input[@type='text']", XPList).snapshotItem(id - 1);
                        var b = find("//div[@name='exp" + id + "']", XPFirst);
                        var c = calculateResourceTime(arrayByN(coste, a.value));
                        if (c) b.innerHTML = c; else b.innerHTML = '';
                };
                return funcion;
        }

        function tiempoExplorarUnidades(){
                if (!find("//form[@name='snd']//input[@type='image' and @value='ok']", XPFirst)) return;
                var a = find("//table[@class='tbg']//tr[not(@class)]//table[@class='f10']", XPList);
                for (var i = 0; i < a.snapshotLength; i++){
                        var b = a.snapshotItem(i);
			var c = b.getElementsByTagName("TD")[2].textContent.split(" ")[0].split("|");

			var div = document.createElement("DIV");
                        div.setAttribute("name", "exp" + (i+1));
                        var tr = document.createElement("TR");
                        var td = document.createElement("TD");
                        td.setAttribute("colspan", "2");
                        td.setAttribute("class", "c f7 s7");
                        td.appendChild(div);
                        tr.appendChild(td);

                        // FIXME: Apanyo para Firefox. FF mete un nodo extra al principio de la tabla
                        var d = b.childNodes;
                        d[d.length - 1].appendChild(tr);

                        b.parentNode.parentNode.getElementsByTagName("INPUT")[0].addEventListener("keyup", crearFuncionExplorarUnidades((i+1), c), 0);
                }
        }

        function tiempoExplorar(){
                var a = find("//table[@class='tbg']//tr[@class='cbg1']", XPFirst);
		// FIXME: Apanyo para Firefox. FF mete varios nodos extras entre las columnas
                if (a == null || (a.childNodes.length != 2 && a.childNodes.length != 4)) return;

		var a = a.parentNode.childNodes;
		for (var i = 1; i < a.length; i++){
			var b = a[i];
			var c = b.getElementsByTagName("DIV");
			if (c.length == 2 && c[1].className == 'c'){
				var d = b.getElementsByTagName("TD")[3].textContent.split("|").splice(0,4);
				var e = calculateResourceTime(d);
				if (e) c[1].innerHTML = e;
			}
		}
        }

        function ataqueDefecto(){
                var accion = 4; // 2 -> Apoyo, 3 -> Ataque, 4 -> Atraco

                var cities = find("//div[@id='lright1']//table[@class='f10']", XPFirst);
                if(cities && location.href.search(/z=(\d+)/) >= 0){
                        var z = RegExp.$1;
                        cities = cities.firstChild;
                        for (var i = 0; i < cities.childNodes.length; i++){
                                var city = cities.childNodes[i];
				city.textContent.search(/\((.*)\n?\|\n?(.*)\)/);
                                var id = xy2id(RegExp.$1, RegExp.$2);
                                if (id == z) accion = 2;
                        }
                }

                find("//input[@name='c' and @value='" + accion + "']", XPFirst).checked = true;
        }

	function agregarElementoCookie(cookie, values){
		var nuevo = '';
		for (var i = 0; i < values.length; i++){
			if (values[i] != ''){
				nuevo += values[i];
				if (i != values.length - 1) nuevo += '$';
			}else return;
		}
		var a = readCookie(cookie + "_" + server);
		if (a != null && a != '') a += "$$" + nuevo;
		else a = nuevo;
		createCookie(cookie + "_" + server, a, 365);
	}
	function crearEventoEliminarCookie(cookie, num, funcion){
                return function(){
			var a = readCookie(cookie + "_" + server);
			if (a != null){
				a = a.split("$$");
				a.splice(num, 1);
				createCookie(cookie + "_" + server, a.join("$$"), 365);
				removeElement(find("//*[@id='" + cookie + "']", XPFirst));
				funcion();
			}
		}
	}
	function editEventoEliminarCookie(cookie, num, funcion){
                return function(){
			var a = readCookie(cookie + "_" + server);
			if (a != null){
				a = a.split("$$");
				a[num]=a[num].split("$");

				val=prompt("mi legyen az értéke?",a[num][0])
				if(val==undefined || val=="") return false;

				a[num]=val+"$"+a[num][1]
				createCookie(cookie + "_" + server, a.join("$$"), 365);
				removeElement(find("//*[@id='" + cookie + "']", XPFirst));
				funcion();
			}
		}
	}

	function obtenerValorCookie(cookie){
		// Importar marcadores de versiones antiguas del script
		// FIXME: Eliminar dentro de unas cuantas versiones
		var b = readCookie(cookie); if (b != null && b != ''){ createCookie(cookie + "_" + server, b, 365); eraseCookie(cookie); }

		var res = new Array();
		var a = readCookie(cookie + "_" + server);
		if (a != null && a != ''){
			a = a.split("$$");
			for (var i = 0; i < a.length; i++) res[i] = a[i].split("$");
		}
		return res;
	}

	function mostrarMarcadores(){
		// Intenta insertarlos en la lista derecha, si no existe la crea
		var ba = find("//div[@id='lright1']", XPFirst);
		if (!ba){
			ba = document.createElement("DIV");
			ba.setAttribute("id", "lright1");
			find("//body", XPFirst).appendChild(ba);
		}
		var div = document.createElement("DIV");
		var titulo = elem("B", T('MARCADORES') + ":");
		var enlace = elem("A", T('ANYADIR'));
		var ezt = elem("A","ezt");
		var tabla = document.createElement("TABLE");
		tabla.setAttribute("class", "f10");
		div.setAttribute("id", "marcadores");
		enlace.href = "javascript:void(0);";
		ezt.href = "javascript:void(0);";
		// Al anyadir se pide el texto y el enlace, si se cancela o se deja vacio alguno se aborta
		// Despues de insertar se refresca la lista volviendola a insertar
		enlace.addEventListener("click", function(){
								var a = prompt(T('ENLACE'));
								if (a == null || a == '') return;
								var b = prompt(T('TEXTO'));
								if (b == null || b == '') return;
								agregarElementoCookie("marcadores", [b, a]);
								removeElement(find("//div[@id='marcadores']", XPFirst));
								removeElement(find("//div[@id='jegyzetek']", XPFirst));
								mostrarMarcadores();
						}, 0);
		ezt.addEventListener("click", function(){
								var a = location.href
								var b = prompt(T('TEXTO'));
								if (b == null || b == '') return;
								agregarElementoCookie("marcadores", [b, a]);
								removeElement(find("//div[@id='marcadores']", XPFirst));
								removeElement(find("//div[@id='jegyzetek']", XPFirst));
								mostrarMarcadores();
						}, 0);
		titulo.setAttribute("class","f10");
		div.appendChild(titulo);
		div.appendChild(document.createTextNode(" (")); div.appendChild(enlace);div.appendChild(document.createTextNode("/")); div.appendChild(ezt); div.appendChild(document.createTextNode(")"));
		div.appendChild(tabla);
		var p = document.createElement("P");
		p.appendChild(div);
		ba.appendChild(p);

		// Se obtienen los marcadores y se insertan junto con un enlace para eliminarlos
		var marcadores = obtenerValorCookie("marcadores");
		for (var i = 0; i < marcadores.length; i++){
			var tr = document.createElement("TR");
			var td = elem("TD", "<span>&#8226;</span>&nbsp; <a href='" + marcadores[i][1] + "'>" + marcadores[i][0] + "</a>");
			var enlace = elem("A", " <img src='" + img('a/del.gif') + "' width='12' height='12' border='0' title='" + T('ELIMINAR') + "'>");
			enlace.href = "javascript:void(0);";
			enlace.addEventListener("click", crearEventoEliminarCookie("marcadores", i, mostrarMarcadores), 0);
			var edit=elem("A","<img src='http://www.e-dot.hu/images/pixelicons/pencil.gif' border=0>");
			edit.href="javascript:void(0);"
			edit.addEventListener("click", editEventoEliminarCookie("marcadores", i, mostrarMarcadores), 0);
			td.appendChild(enlace);
			td.appendChild(edit);
			tr.appendChild(td);
			tabla.appendChild(tr);
		}
                //blocNotas();
	}

        function cityLinks(){
		// Localiza la lista de aldeas
                var cities = find("//div[@id='lright1']//table[@class='f10']", XPFirst);
                if (!cities) return;

		cities = cities.firstChild;
		for (var i = 0; i < cities.childNodes.length; i++){
			// Utiliza el texto de las coordenadas para averiguar el ID necesario para los enlaces
			var city = cities.childNodes[i];
			city.textContent.search(/\((.*)\n?\|\n?(.*)\)/);
			if(location.href.match(/dorf3.php($|\?newdid=(\d+)$)/)){
				city.childNodes[0].childNodes[2].href=city.childNodes[0].childNodes[2].href.replace("dorf3","dorf1");
				continue;
			}
			var id = xy2id(RegExp.$1, RegExp.$2);
			city.appendChild(elem("TD", "<a href='a2b.php?z=" + id + "'><img src='" + img('a/def1.gif') + "' width='12' border='0' title='" + T('ENV_TROPAS') + "'></a>"));
			city.appendChild(elem("TD", "<a href='build.php?z=" + id + "&gid=17'><img src='" + img('r/4.gif') + "' height='12' border='0' title='" + T('ENVIAR') + "'></a>"));
		}
	}

	function sanearEnlaces(){
		var a = find("//a[@href='#']", XPList);
		for (var i = 0; i < a.snapshotLength; i++) a.snapshotItem(i).href = 'javascript:void(0)';
	}

        function mostrarConfiguracion(){
                var a = find("//form", XPFirst);
                var tabla = document.createElement("TABLE");
                tabla.setAttribute("cellspacing", "1");
                tabla.setAttribute("cellpadding", "2");
                tabla.setAttribute("class", "tbg");
                tabla.setAttribute("id", "configuracion");

                var fila = document.createElement("TR");
                var td = elem("TD", "Travian Beyond");
                td.setAttribute("class", "rbg");
                td.setAttribute("colspan", "2");
                fila.appendChild(td);
                tabla.appendChild(fila);

		// Parametros reconocidos
                var parametros = ["desp", "marcadores_" + server, "notas_" + server, "ventas_" + server];
                for (var i = 0; i < parametros.length; i++){
                        fila = document.createElement("TR");
                        fila.appendChild(elem("TD", parametros[i]));
                        var valor = readCookie(parametros[i]);
                        fila.appendChild(elem("TD", "<input type='text' name='" + parametros[i] + "' value='" + (valor != null ? valor : '') + "' class='fm' style='width:275px;'/>"));
                        tabla.appendChild(fila);
                }
                insertAfter(a, tabla);

                var imagen = document.createElement("IMG");
                imagen.setAttribute("src", img('b/s1.gif', true));
                imagen.addEventListener("click", function(){
                        var parametros = $('configuracion').getElementsByTagName("INPUT");
                        for (var i = 0; i < parametros.length; i++) createCookie(parametros[i].name, parametros[i].value, 365);
                        alert(T('GUARDADO'));
                }, 0);
                var p = document.createElement("P");
                p.setAttribute("align", "center");
                p.appendChild(imagen);
                insertAfter(tabla, p);
        }

	function calcularTiempoEjecucion(){
		var tiempo = new Date().getTime() - tiempo_ejecucion;
		var div = find("//div[@id='ltime']", XPFirst);
		div.appendChild(elem("P", "TB: " + tiempo + " ms"));
	}

	function procesarCasilla(t){
		if (timeout == 0) return;

		// Solo hay 6 tipos de casillas
		var dist = [
			[3, 3, 3, 9],
			[3, 4, 5, 6],
			[4, 4, 4, 6],
			[4, 5, 3, 6],
			[5, 3, 4, 6],
			[1, 1, 1, 15]
		];

		// Carga la pagina resultado en un arbol DOM para hacer busquedas por XPath
		var ans = document.createElement('DIV');
		ans.innerHTML = t.responseText;
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);
		// Parece haber dos versiones del juego, asi que se contemplan las dos
		if (ansdoc.evaluate("//div[starts-with(@id, 'f')]", ans, null, XPFirst, null).singleNodeValue)
			ansdoc.evaluate("//div[starts-with(@id, 'f')]", ans, null, XPFirst, null).singleNodeValue.id.search(/f(\d)/);
		else
			ansdoc.evaluate("//img[@id='resfeld']", ans, null, XPFirst, null).singleNodeValue.src.search(/\/f(\d)\.jpg$/);

		var info = dist[RegExp.$1 - 1];
		//var div = $("tb_tooltip");
		div.style.display = 'block';
		div.innerHTML = '';
		for (var i = 1; i < 5; i++) div.innerHTML += '<img src="' + img('r/' + i + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + i) + '">' + info[i-1] + ' ';
	}

	function crearEventoRecursosCasilla(href){
		// Espera 1 segundo antes de realizar la peticion asincrona
		return function(){ timeout = setTimeout(function(){ ajaxRequest(href, "GET", null, procesarCasilla, dummy); }, 1000); };
	}

	function infoRecursos(){
	return;
		var casillas = find("//img[starts-with(@class, 'mt')]", XPList);
		var areas = find("//map//area[@shape='poly' and not(@onclick)]", XPList);

		for (var i = 0; i < casillas.snapshotLength; i++){
			if (casillas.snapshotItem(i).src.match(/\/(d|t)\d*.gif$/)){
			var area = areas.snapshotItem(i);
				area.addEventListener("mouseover", crearEventoRecursosCasilla(area.href), 0);
				area.addEventListener("mouseout", function(){ clearTimeout(timeout); timeout = 0; $("tb_tooltip").style.display = 'none'; }, 0);
			}
		}
	}

	function ajaxRequest(url, method, param, onSuccess, onFailure){
		var xmlHttpRequest = new XMLHttpRequest();
		xmlHttpRequest.onreadystatechange = function() {
			if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) onSuccess(xmlHttpRequest);
			else if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status != 200) onFailure(xmlHttpRequest);
		};
		xmlHttpRequest.open(method, url, true);
		if (method == 'POST') xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xmlHttpRequest.send(param);
	}

	function checkUpdate(){
		var b = find("//div[@id='lmid2']", XPFirst);
		var div = document.createElement("DIV");
		div.innerHTML = "<b>Travian Beyond v" + version + "</b><br/>";
		var a = elem("A", T('CHECK'));
		a.setAttribute("href", "javascript:void(0)");
		a.addEventListener("click", function(){ this.parentNode.innerHTML = T('VERSION') + " <img style='vertical-align: bottom;' src='http://www.denibol.com/proyectos/travian_beyond/version.php'/>"; }, 0);
		var div2 = document.createElement("DIV");
		div2.appendChild(a);
		div.appendChild(div2);
		b.appendChild(div);
	}

	function mostrarVentas(){
		if (!find("//input[@type='hidden' and @name='t' and @value='2']", XPFirst)) return;
		find("//form", XPFirst).setAttribute("name", "sell");

		var a = find("//input[@type='image' and @name='s1']", XPFirst);
		a.addEventListener("click", function(){
			var param = ["m1", "m2", "rid1", "rid2", "d2"];
			var checks = ["d1", "ally"];
			var values = new Array();
			for(var i = 0; i < param.length; i++) eval("values[" + i + "] = find(\"//*[@name='" + param[i] + "']\", XPFirst).value");
			for(var i = 0; i < checks.length; i++){
				try{
					eval("var b = find(\"//*[@name='" + checks[i] + "']\", XPFirst).checked");
					if (b == true) values[i + param.length] = '1'; else values[i + param.length] = '0';
				}catch(e){}
			}
			agregarElementoCookie("ventas", values);
		}, 0);

		var ventas = obtenerValorCookie("ventas");
		if (ventas.length > 0){
			var tabla = document.createElement("TABLE");
			tabla.setAttribute("id", "ventas");
			tabla.setAttribute("class", "tbg");
			tabla.setAttribute("align", "center");
			tabla.setAttribute("cellspacing", "1");
			tabla.setAttribute("cellpadding", "2");

			var tr = document.createElement("TR");
			tr.setAttribute("class", "rbg");
			var columnas = [T('OFREZCO'), T('BUSCO'), T('MAXTIME'), T('ALIANZA'), T('VENDER'), T('ELIMINAR')];
			for (var i = 0; i < columnas.length; i++) tr.appendChild(elem("TD", columnas[i]));
			tabla.appendChild(tr);

			for (var i = 0; i < ventas.length; i++){
				var tr = document.createElement("TR");

				td = elem("TD", '<img src="' + img('r/' + (ventas[i][2]) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (ventas[i][2])) + '"> ' + ventas[i][0]); tr.appendChild(td);
				td = elem("TD", '<img src="' + img('r/' + (ventas[i][3]) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (ventas[i][3])) + '"> ' + ventas[i][1]); tr.appendChild(td);
				td = elem("TD", ventas[i][5] == '1' ? ventas[i][4] : T('NO')); tr.appendChild(td);
				td = elem("TD", ventas[i][6] == '1' ? T('SI') : T('NO')); tr.appendChild(td);

				td = elem("TD", '<a href="javascript:void(0);" onClick="sell.m1.value=' + ventas[i][0] + ';sell.m2.value=' + ventas[i][1] + ';sell.rid1.value=' + ventas[i][2] + ';sell.rid2.value=' + ventas[i][3] + ';sell.d2.value=' + ventas[i][4] + ';sell.d1.checked=' + (ventas[i][5] == '1') + (ventas[i][6] ? ';sell.ally.checked=' + (ventas[i][6] == '1') : '') + ';sell.submit();"><img src="' + img('b/ok1.gif', true) + '" title="' + T('VENDER') + '" alt="' + T('VENDER') + '" border="0"></a>'); tr.appendChild(td);
				tabla.appendChild(tr);

				var enlace = elem("A", " <img src='" + img('a/del.gif') + "' width='12' height='12' border='0' title='" + T('ELIMINAR') + "'>");
				enlace.href = "javascript:void(0);";
				enlace.addEventListener("click", crearEventoEliminarCookie("ventas", i, mostrarVentas), 0);
				var td = document.createElement("TD");
				td.appendChild(enlace);
				tr.appendChild(td);;
			}
			insertAfter(a, tabla);
		}
	}
	function procesarAldea(t){
		// Carga la pagina resultado en un arbol DOM para hacer busquedas por XPath
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// ID de aldea
		ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
		var did = RegExp.$1;
		var times = new Array();

		// Materias primas
		var a = '';
		resource=[]
		for (var i = 1; i < 5; i++){
			var b = ansdoc.getElementById("l" + (5-i));
			var perc = Math.round((b.innerHTML.split("/")[0] * 100) / b.innerHTML.split("/")[1]);
			var cant = b.innerHTML.split("/")[0];
			// Espero que la "k" sea internacional
			if (cant % 1000 == 0) txt_cant = (cant / 1000) + "k"; else txt_cant = cant;
			resource[i]=[b.title*1,cant*1,1*b.innerHTML.substr(b.innerHTML.search("/")+1,10)];
			//termelés készlet raktár
			var leftval=parseInt(resource[i][1]/resource[i][2] *100);
			var tol= (leftval<50) ? 150 : 255;
			var sec=155-leftval;
			var c = '';
			c += '<img src="' + img('r/' + i + '.gif') + '" border="0" title="' + T('RECURSO' + i) + '">';
			c += '<span title="' + b.title + '"><font color="'+rgb2HEX(sec, sec, parseInt(tol*(leftval/100)) )+'">' + (cant < 0 ? '<font color="#ff0000">' + txt_cant + '</font>' : txt_cant) + '</span> <span style="font-size:9px;" title="' + b.innerHTML + '">(' + perc + '%)</font></span>';
			//XXX
			a += '<nobr>' + c + '</nobr>';
			if (i != 4) a += " | ";
		}
		find("//td[@id='aldea" + did + "_0" + "']", XPFirst).innerHTML = a;

		// Ataques
		var casilla = find("//td[@id='aldea" + did + "_1" + "']", XPFirst);
		var a = ansdoc.evaluate("//div[@id='ltbw1']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
		if (a){
			var a = a.firstChild;
			var b = new Array();
			for (var i = 0; i < a.childNodes.length; i++){
				var tr = a.childNodes[i];
				// FIXME: Apanyo para FF. Firefox mete nodos vacios
				var error = (tr.childNodes.length == 5 ? false : true);
				times.push(tr.childNodes[error ? 9 : 4].textContent.split(" ")[0]);
				b[i] = '<nobr><a href="build.php?newdid=' + did + '&gid=16" title="' + tr.childNodes[error ? 3 : 1].textContent.split(" ")[1] + '">' + tr.childNodes[error ? 1 : 0].firstChild.innerHTML + "</a> <span id='timeouta'>" + tr.childNodes[error ? 9 : 4].textContent.split(" ")[0] + '</span></nobr>';
			}
			casilla.innerHTML = b.join(" | ");
		}else casilla.innerHTML = '-';

		// Construcciones
		var casilla = find("//td[@id='aldea" + did + "_2" + "']", XPFirst);
		var a = ansdoc.evaluate("//div[@id='lbau1']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
		if (a){
			var b = new Array();
			for (var i = 0; i < a.firstChild.childNodes.length; i++){
				times.push(a.firstChild.childNodes[i].childNodes[2].textContent.split(" ")[0]);
				b[i] = '<nobr><img src="' + img('a/bau.gif') + '" title="' + a.firstChild.childNodes[i].childNodes[1].innerHTML + '"/> <span id="timeouta">' + a.firstChild.childNodes[i].childNodes[2].textContent.split(" ")[0] + "</span></nobr>";
			}
			casilla.innerHTML = b.join(" | ");
		}else casilla.innerHTML = '-';

		// Tropas
		var casilla = find("//td[@id='aldea" + did + "_3" + "']", XPFirst);
		var a = ansdoc.evaluate("//div[@id='ltrm']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue.firstChild;
		if (a.firstChild.childNodes.length == 3){
			var b = new Array();
			for (var i = 0; i < a.childNodes.length; i++){
				var tr = a.childNodes[i];
				tr.childNodes[0].firstChild.firstChild.setAttribute("title", tr.childNodes[2].innerHTML);
				b[i] = '<nobr>' + tr.childNodes[0].firstChild.innerHTML + tr.childNodes[1].innerHTML + '</nobr>';
			}
			casilla.innerHTML = b.join(" | ");
		}else casilla.innerHTML = '-';

		find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b2.gif');
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + did + "') and ancestor::div[@id='lright1']]", XPFirst).parentNode.firstChild.className = 'c2';

                // Auto Refresh
		if (times.length > 0){
	                var time = Number.POSITIVE_INFINITY;
        	        for (var i = 0; i < times.length; i++) {
                	        times[i] = calcular_segundos(times[i]);
                        	if (times[i] < time) time = times[i];
	                }
        	        setTimeout(crearEventoActualizarAldea(did), 1000 * time);
		}

		// FIXME: Firefox rendering bug
		casilla.parentNode.setAttribute("style", "width:100%");
		ans=null//garbage collect
		ansdoc=null
	}

	
	
	
	//#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/
	//#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/
	//#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/
	//#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/#\/
	
	
	function procesarAldea2(t){
		// Carga la pagina resultado en un arbol DOM para hacer busquedas por XPath
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// ID megszerzése
		ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
		
		var did = RegExp.$1;

		// nyersik betöltése
		for (var i = 1; i < 5; i++){
			var bxs = ansdoc.getElementById("l" + (5-i));
			if(bxs==null || !bxs.innerHTML){find("//img[@id='aldea" + did + "_boton1']", XPFirst).src = img('a/b4.gif');return;}
			x=bxs.innerHTML.split("/");
			a = x[0]+","+x[1]+','+bxs.title;
			$("aldea"+did+"_nyersi"+i).innerHTML=a
		}
		var a = ansdoc.evaluate("//div[@id='ltrm']//table[@class='f10']", ans, null, XPFirst, null)
				.singleNodeValue.firstChild;
		if (a.firstChild.childNodes.length == 3){
			for (var i = 0; i < a.childNodes.length; i++){
				var tr = a.childNodes[i];
				tr.childNodes[0].firstChild.firstChild.setAttribute("title", tr.childNodes[2].innerHTML);
				//b[i] = '<nobr>' + tr.childNodes[0].firstChild.innerHTML + tr.childNodes[1].innerHTML + '</nobr>';
				tid=tr.childNodes[0].firstChild.firstChild.src.split("/")[3].split(".")[0]
				if(tid=="hero"){
				//$("aldea"+did+"hero").innerHTML=did
				continue;
				}
				//alert("aldea"+did+"_trop"+tr.childNodes[0].firstChild.firstChild.src.split("/")[3].split(".")[0]+"_count")
				//break;
				$("aldea"+did+"_trop"+tr.childNodes[0].firstChild.firstChild.src.split("/")[3].split(".")[0]+"_count").innerHTML=tr.childNodes[1].childNodes[1].innerHTML 
			}
		}

		find("//img[@id='aldea" + did + "_boton1']", XPFirst).src = img('a/b2.gif');
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + did + "') and ancestor::div[@id='lright1']]", XPFirst).parentNode.firstChild.className = 'c2';
		ans=null
		ansdoc=null
	}
	
	function procesarAldea3(t){
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);
		// ID megszerzése
		ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
		var did = RegExp.$1;
		if(ansdoc.getElementsByTagName("form").length==1){
			tbl=ansdoc.getElementsByTagName("form")[0].getElementsByTagName("table")[0];
			for(i=1;i<tbl.rows.length;i++){
				$("aldea"+did+"_trop"+tbl.rows[i].cells[0].getElementsByTagName("img")[0].src.split("/u/")[1].split(".gif")[0]+"_att").innerHTML=tbl.rows[i].cells[0].textContent.split("Szint ")[1].split(")")[0]
			}
			find("//img[@id='aldea" + did + "_boton2']", XPFirst).src = img('a/b2.gif');
		}else{
			find("//img[@id='aldea" + did + "_boton2']", XPFirst).src = img('a/b1.gif');
		}
		ans=null
		ansdoc=null
	}
	function procesarAldea4(t){
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);
		// ID megszerzése
		ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
		var did = RegExp.$1;
		if(ansdoc.getElementsByTagName("form").length==1){
			tbl=ansdoc.getElementsByTagName("form")[0].getElementsByTagName("table")[0];
			for(i=1;i<tbl.rows.length;i++){
				$("aldea"+did+"_trop"+tbl.rows[i].cells[0].getElementsByTagName("img")[0].src.split("/u/")[1].split(".gif")[0]+"_def").innerHTML=tbl.rows[i].cells[0].textContent.split("Szint ")[1].split(")")[0]
			}
			find("//img[@id='aldea" + did + "_boton3']", XPFirst).src = img('a/b2.gif');
		}else{
			find("//img[@id='aldea" + did + "_boton3']", XPFirst).src = img('a/b1.gif');
		}
		ans=null
		ansdoc=null
	}
	
	function crearEventoActualizarAldea2(did){
		return function(){
			ajaxRequest("dorf1.php?newdid=" + did, "GET", null, procesarAldea2,function(){ find("//img[@id='aldea" + did + "_boton1']", XPFirst).src = img('a/b4.gif'); });
			find("//img[@id='aldea" + did + "_boton1']", XPFirst).src = img('a/b3.gif');
		};
	}
	function crearEventoActualizarAldea3(did){
		return function(){
			ajaxRequest("build.php?gid=12&newdid=" + did, "GET", null, procesarAldea3,function(){ find("//img[@id='aldea" + did + "_boton2']", XPFirst).src = img('a/b4.gif'); });
			find("//img[@id='aldea" + did + "_boton2']", XPFirst).src = img('a/b3.gif');
		};
	}
	function crearEventoActualizarAldea4(did){
		return function(){
			ajaxRequest("build.php?gid=13&newdid=" + did, "GET", null, procesarAldea4,function(){ find("//img[@id='aldea" + did + "_boton3']", XPFirst).src = img('a/b4.gif'); });
			find("//img[@id='aldea" + did + "_boton3']", XPFirst).src = img('a/b3.gif');
		};
	}
	
	//#########################################################################################
	
	
	
	function crearEventoActualizarAldea(did){
		return function(){
			find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b3.gif');
			ajaxRequest("dorf1.php?newdid=" + did, "GET", null, procesarAldea,
				function(){ find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b4.gif'); }
			);
		};
	}
	function resumenAldeas(mod){//dorf3
		if (plus) return;
		var ba = find("//div[@id='lright1']", XPFirst);
		if (!ba) return;
if(mod==0){
		var aldeas = ba.getElementsByTagName("A");
		var a = find("//div[@id='lmid2']", XPFirst);

		var tabla = document.createElement("TABLE");
		tabla.setAttribute("class", "tbg");
		tabla.setAttribute("align", "center");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "2");

		var tr = document.createElement("TR");
		var td = elem("TD", T('RESUMEN'));
		td.setAttribute("colspan", "3");
		tr.appendChild(td);
		tr.setAttribute("class", "rbg");
		tabla.appendChild(tr);

		for (var i = 0; i < aldeas.length; i++){
			if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0){
				var did = RegExp.$1;
				var tr = document.createElement("TR");

				var td = document.createElement("TD");
				var enlace = elem("A", "<img src='" + img('a/b5.gif') + "' border='0' title='" + T('ACTUALIZAR') + "' id='aldea" + did + "_boton'>");
				enlace.href = "javascript:void(0);";
				enlace.addEventListener("click", crearEventoActualizarAldea(did), 0);
				var nobr = document.createElement("NOBR");
				nobr.appendChild(enlace);
				nobr.appendChild(elem("SPAN", ' <a href="dorf1.php?newdid=' + did + '" onClick=\'document.getElementById("ToolsBlock").style.visibility = "visible";document.getElementById("ifr_iframe").src=this.href;return false;\'>' + aldeas[i].innerHTML + '</a>'));
				nobr.appendChild(elem("SPAN", ' <a href="dorf2.php?newdid=' + did + '" onClick=\'document.getElementById("ToolsBlock").style.visibility = "visible";document.getElementById("ifr_iframe").src=this.href;return false;\'> @</a> '));

				//tr.appendChild(td);

				ajaxRequest("dorf1.php?newdid=" + did, "GET", null, procesarAldea, function(){ find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b4.gif'); });
				for (var j = 0; j < 4; j++){
					if (j != 2 && j != 0) tr = document.createElement("TR");
					td = elem("TD", "-");
					td.setAttribute("id", "aldea" + did + "_" + j);
					td.setAttribute("align", "center");
					if (j != 1 && j != 2) td.setAttribute("width", "100%");
					if(j==1){
						//td.setAttribute("rowspan", "1");
						x=elem("TD","")
						x.appendChild(nobr);
						x.setAttribute("align", "left");
						x.setAttribute("width", "130");
						tr.appendChild(x)
					}
					if (j == 0) td.setAttribute("colspan", "3");
					else if(j == 3){
						td.setAttribute("colspan", "3");
						td.setAttribute("style", "border-bottom-style: solid; border-bottom-width: thin");
					}
					tr.appendChild(td);
					if (j != 1) tabla.appendChild(tr);
				}
			}
		}
		tr=elem("TR");
		tr.appendChild(elem("td","x"));
		tr.appendChild(elem("td","x"));
		tr.appendChild(elem("td","x"));
		tr.appendChild(elem("td","x"));
		//tabla.appendChild(tr);
		
		if (a.firstChild) insertAfter(a.firstChild, tabla);
		else a.appendChild(tabla);
		removeElement(tabla.previousSibling)
		
		
		
		//RÉGI	/\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\ 
}else{
		//ÚJ		\/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/ 
		var aldeas = ba.getElementsByTagName("A");
		var a = find("//div[@id='lmid2']", XPFirst);

		var tabla = document.createElement("TABLE");
		tabla.setAttribute("class", "tbg");
		tabla.setAttribute("align", "center");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "2");

		var tr = document.createElement("TR");
		var td = elem("TD", "Seregjelent&eacute;s");
		td.setAttribute("colspan", "5");
		tr.appendChild(td);
		tr.setAttribute("class", "rbg");
		tabla.appendChild(tr);

		var unit_array={1:"Légió",2:"Testőrség",3:"Birodalmi",4:"Equites Legati",
						5:"Equites Imperatoris",6:"Equites Caesaris",7:"Faltörő kos",
						8:"Tűzkatapult",9:"Szenátor",10:"Telepes",11:"Buzogányos",
						12:"Lándzsás",13:"Csatabárdos",14:"Felderítő",
						15:"Paladin",16:"Teuton lovag",17:"Faltörő kos",
						18:"Katapult",19:"Törzsi vezető",20:"Telepes",
						21:"Phalanx",22:"Kardos",23:"Felderítő",24:"Theutat Villám",
						25:"Druida lovas",26:"Haeudan",27:"Falromboló",
						28:"Harci katapult",29:"Főnök",30:"Telepes"};
		for (var i = 0; i < aldeas.length; i++){
			if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0){
				var did = RegExp.$1;
				
				tr=document.createElement("tr");
				
				td=elem("td","");//OOO sereg fegyver páncél
				tr.appendChild(td)
				var enlace = elem("A", "<img src='" + img('a/b5.gif') + "' border='0' id='aldea" + did + "_boton1'>");enlace.href = "javascript:void(0);";enlace.addEventListener("click", crearEventoActualizarAldea2(did), 0);td.appendChild(enlace);
				var enlace = elem("A", "<img src='" + img('a/b5.gif') + "' border='0' id='aldea" + did + "_boton2'>");enlace.href = "javascript:void(0);";enlace.addEventListener("click", crearEventoActualizarAldea3(did), 0);td.appendChild(enlace);
				var enlace = elem("A", "<img src='" + img('a/b5.gif') + "' border='0' id='aldea" + did + "_boton3'>");enlace.href = "javascript:void(0);";enlace.addEventListener("click", crearEventoActualizarAldea4(did), 0);td.appendChild(enlace);
				
				td=elem("td",aldeas[i].innerHTML);
				tr.appendChild(td)
				
				td=elem("td",aldeas[i].parentNode.nextSibling.textContent);
				tr.appendChild(td)
				tabla.appendChild(tr);
				td.setAttribute("colspan", "3");
				
				tr=document.createElement("tr");
				td=elem("td","-");
				tr.appendChild(td)
				td.id="aldea"+did+"_nyersi1"
				td=elem("td","-");
				tr.appendChild(td)
				td.id="aldea"+did+"_nyersi2"
				td=elem("td","-");
				tr.appendChild(td)
				td.id="aldea"+did+"_nyersi3"
				td=elem("td","-");
				tr.appendChild(td)
				td.id="aldea"+did+"_nyersi4"
				td=elem("td","-");
				tr.appendChild(td)
				td.id="aldea"+did+"hero"
				tabla.appendChild(tr);
				
				for(j in unit_array){
					tr=document.createElement("tr");
					td=elem("td",unit_array[j]);
					tr.appendChild(td)
					
					td=elem("td","-");
					tr.appendChild(td)
					td.id="aldea"+did+"_trop"+j+"_count"
					
					td=elem("td","-");
					tr.appendChild(td)
					td.id="aldea"+did+"_trop"+j+"_att"
					
					td=elem("td","/");
					tr.appendChild(td)
					
					td=elem("td","-");
					tr.appendChild(td)
					td.id="aldea"+did+"_trop"+j+"_def"
					
					tabla.appendChild(tr);
				}
				tr=document.createElement("tr");
				tabla.appendChild(tr);
				setTimeout(crearEventoActualizarAldea2(did),i*2)
				setTimeout(crearEventoActualizarAldea3(did),i*2)
				setTimeout(crearEventoActualizarAldea4(did),i*2)
				
			}
		}
		
		if (a.firstChild) insertAfter(a.firstChild, tabla);
		else a.appendChild(tabla);
		removeElement(tabla.previousSibling)
}
	}

	/**
	 * Modifica el estilo del mensaje de borrado de cuenta para adaptarlo a los cambios que realiza el script
	 */
	function borrarCuenta(){
		var a = find("//p[parent::div[@id='lleft'] and @style]", XPFirst);
		if (a){
			moveElement(a, document.body);
			a.setAttribute("style", "position:absolute; display: block; padding: 4px; z-index: 2; border: solid 1px #00C000; background-color: #FEFFE3; width:130px; text-align:center; right:0px; top:0px;");
		}
	}

	/**
	 * Agrega una nueva opcion en cualquier menu superior de opciones
	 *
	 * Params:
	 *	texto: texto para colocar al final de menu
	 */
	function opcionMenuSuperior(texto){
		var a = find("//p[@class='txt_menue']", XPFirst);
                if (a) a.innerHTML += texto;
	}

	function opcionOcultaMensajes(){ if (!plus) opcionMenuSuperior(' | <a href="nachrichten.php?t=3">' + T('ARCHIVE') + '</a>'); }
	function opcionOcultaInformes(){ if (!plus) opcionMenuSuperior(' | <a href="berichte.php?t=5">' + T('ARCHIVE') + '</a>'); }

	function crearTemporizadorRecurso(i){
		return function(){
			/*
			 * Actualiza las cantidades restantes por cada tipo de recurso si corresponde hacerlo en este
			 * ciclo de reloj segun la adaptacion de frecuencias anterior
			 */
			var recursos = find("//*[@id='timeout" + i + "']", XPList);
			for (var j = 0; j < recursos.snapshotLength; j++){
				var cantidad = recursos.snapshotItem(j).innerHTML - 1;
				if (cantidad >= 0) recursos.snapshotItem(j).innerHTML = cantidad;
				else document.location.reload();
			}
		};
	}

	/**
	 * Crea el temporizador encargado de actualizar los nuevos relojes y las cantidades de recursos que faltan
	 */
	function setTimers(){
		// Calcula cada cuantos segundos debe actualizar cada contador de recursos restantes para
		// aprovechar el temporizador del resto de relojes
		var frecuencia = new Array(4);
		for (var i = 0; i < 4; i++){
			frecuencia[i] = (1 / Math.abs(produccion[i])) * 1000;
			if (!isFinite(frecuencia[i]) || frecuencia[i] < 0) frecuencia[i] = Number.POSITIVE_INFINITY;
                        if (total[i] - actual[i] == 0) frecuencia[i] = Number.POSITIVE_INFINITY;
			setInterval(crearTemporizadorRecurso(i), Math.floor(frecuencia[i]));
		}

		setInterval(function () {
			/*
			 * Se distinguen dos tipos de temporizadores, timeout y timeouta. Solo los primeros
			 * provocan que la pagina se actualice al llegar a 0.
			 */
			var relojes = find("//*[@id='timeout' or @id='timeouta']", XPList);
			max=defmax=2592000
			for (var i = 0; i < relojes.snapshotLength; i++){
				var tiempo = calcular_segundos(relojes.snapshotItem(i).innerHTML) - 1;
				if(i>3 && relojes.snapshotItem(i).getAttribute("d")!=1){
					x=creaStamp(relojes.snapshotItem(i));
					if(x<max){max=x;}
				}
				if (tiempo >= 0){ relojes.snapshotItem(i).innerHTML = formatear_tiempo(tiempo);}
				else if (relojes.snapshotItem(i).id == 'timeout'){ document.location.reload();
				}else{
					relojes.snapshotItem(i).innerHTML="-"
					if(document.alerted!=true){
						document.alerted=true;
						//alert('Letelt egy építés, gyártás, vagy támadás!');
					}
				}
			}

			for(i=1;;i++){
				c=$("timer"+i);
				if(c!=null){
					x=creaStamp(c);
					if(x<max){max=x;}
				}else{
					break;
				}
			}

			if(max!=defmax){
			  frissit(max)
			}else{
			  frissit(0)
			}
		},1000);

	}

  function creaStamp(c){p=c.innerHTML.split(":");
    aY=p[0]*3600+p[1]*60+p[2]*1;
    return aY;
  }

  function frissit(next){
		if(next==0){
		//if(inIframe){top.ifrtitle.innerHTML=document.titleDef;return;}
			document.title=document.titleDef;return;
		}
    ora=Math.floor(next/3600);
    perc=Math.floor(next/60)-ora*60;
    mp=next-ora*3600-perc*60;
	//if(inIframe){top.ifrtitle.innerHTML=ora+":"+perc+":"+mp+" "+document.titleDef;return;}
    document.title=ora+":"+perc+":"+mp+" "+document.titleDef;
    next--;
  }

  function hero_status(){
			var XPFirst=XPathResult.FIRST_ORDERED_NODE_TYPE;
			var XPList=XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
			var ntable=-1;
			var taverna=find('//table[@class="tbg"]/tbody',XPList);
			for(var i=0;i<taverna.snapshotLength;i++){
				ttd=taverna.snapshotItem(i).getElementsByTagName("td");
				if(ttd[4]==undefined)return;
				if(ttd[4].textContent=='(+)'){
					ntable=i;
					i=1000;
				}
			}
			if(ntable!=-1){
				ttd=taverna.snapshotItem(ntable).getElementsByTagName("td");
				level=parseInt(ttd[0].textContent.match(/\s(\d+)\s\(/).pop());
				percent=parseInt(ttd[28].textContent.match(/(\d+)\%/).pop());
				an=100*(level);
				an1=100*(level+1)
				sn=0.5*an*(level+1);
				sn1=0.5*an1*(level+2);
				unitpercent=an1*percent/100;
				kills=sn+unitpercent;
				nextkills=sn1-kills;
				elem=document.createElement('div');
				elem.innerHTML='<span title="Jelenlegi XP">'+kills+'</span>+(<span title="Szükséges XP">'+nextkills+'</span>)=<span title="Szintépés ennyi XP-nél">'+sn1+'</span>';
				ttd[27].appendChild(elem);
			}
  }
  function quick_maps(){
		var map_sign="#";
		function getServerName() {
			return location.href.match(/([\w]+[.]travian.[\w]+([.][\w]+)?)/i)[1];
		}
		var url;
		var w = window.innerWidth;;
		var h = window.innerHeight;
		var popW = 800, popH = 600;
		var leftPos = (w-popW)/2, topPos = (h-popH)/2;
		var out = "";
		function append(elem, color) {
			var child = document.createElement("a");
			child.setAttribute("onclick", "window.open('" + url + "', new Date().getTime(), 'scrollbars=1,width="+popW+",height="+popH+",top="+topPos+",left="+leftPos+"'); return false;");
			child.setAttribute("href", url);
			child.setAttribute("style", "display: inline; margin-left: 5px; color: " + color + ";");
			child.innerHTML = map_sign;
			elem.parentNode.insertBefore(child,elem.nextSibling);
		}
		var q=0;
		for (var i = 0; i < document.links.length; i++) {
			var a = document.links[i];
			var server = getServerName();
			if (a.parentNode.className != 'txt_menue') {
				if (a.getAttribute('href').search(/allianz[.]php[?]aid=/i) != -1) {
					var who = "id:" + a.getAttribute('href').replace(/allianz[.]php[?]aid=/, '');
					url = "http://travmap.shishnet.org/map.php?lang=hu&server="+server+"&alliance="+who+"&groupby=player&casen=on&format=svg&";
					append(a, 'blue');
				}else if (a.getAttribute('href').search(/spieler[.]php[?]uid=/i) != -1) {
					if(q==0){q=1;continue;}
					var who = "id:" + a.getAttribute('href').replace(/spieler[.]php[?]uid=/, '');
					url = "http://travmap.shishnet.org/map.php?lang=hu&server="+server+"&player="+who+"&groupby=player&casen=on&format=svg&";
					append(a, 'red');
				}
			}
		}
  }

  function resources(){


var eventSource= (navigator.appName.indexOf('Opera') == -1) ? window : document; // I use this because I might want to make it cross browser later
eventSource.addEventListener( 'load', function( e ) { onLoad(); }, false); //to be run on load of the page
var loc=eventSource.location.href; // the current page href

var links='true';
var nav='true'
var res=GM_getValue("resmenuEnabled",true);
GM_registerMenuCommand("Nyersanyagok ablak:"+(GM_getValue("resmenuEnabled",true) ==false?"kikapcsolva":"bekapcsolva"),function(){GM_setValue("resmenuEnabled", confirm("Kell az ablak?\n"))});
var tools='false';

//the different movable menus
var thepop;
var res_m;
var nav_m;
var tools_m;

var resWidth=254; //254 default
var navWidth=150; // 150 default
var toolsWidth=254; // 254 default

var startform;
var lang;
var order=0;// what is the order of the resources lumber to crop or crop to lumber
var fields=[]; //setup the space for the resource names
var langfile=[]; //multi lang support, the space for the different translations
var resource=[]; //setup the space for the resource data
var ratio=[]; // ratio of resources
var overflow;//setup the space for the overflow data
var autotime; // the timeout control, to update the countdown of overflow
var pagetime; //the time on the page server
var military=true; // is the pagetime 24 or 12 based clock

//for drag effect
var mouseOffset = null;
var iMouseDown = false;
var lMouseState = false;
var dragObject = null;
var curTarget = null;

function location(){
	lang = loc.match(/travian(\.[a-zA-Z]{2,3})+/);
	if(!lang) {
		lang = loc.match(/travian3(\.[a-zA-Z]{2,3})+/).pop();
	} else {
		lang = loc.match(/travian(\.[a-zA-Z]{2,3})+/).pop();
	}
}

function onLoad(){ // runs the differnt functions and procedures,

	location();

	if(!lang) {
		return;
	}

	gatherFields();

	if(!fields[lang]) {
		return;
	}
	langfile[lang]=[ 'Fejlesztéshez kell:', 'betelik', 'betelt', 'Nyersanyagok' , 'Nyersanyagok',
		' órakor' ,'Elég nyersanyag ma ','Elég nyersanyag holnap ', 'Elég nyersanyag ',
		' nap múlva ' , ' Max várakozás után: ' , 'Készleten: ','Várj: ','Hiány' ,'Többlet',' Max várakozás: ','Kiegyensúlyozott',
		'A többlet elfogy: ','Fejlesztés ',' nyersanyag termelés.','Semleges egyensúly.', 'Fejlesztd hozzá a raktárat!' , 'Fejlesztd hozzá a magtárat!'  ];
	readSettings();

	intResource();

	resWidth=parseInt( GM_getValue('ResBlockPx', 254) );
	navWidth=parseInt( GM_getValue('NavLinksPx', 150) );
	toolsWidth=parseInt( GM_getValue('ToolsBlockPx', 254) );

	menu();

	document.addEventListener('mousemove', mouseMove, false);
	document.addEventListener('mousedown', mouseDown, false);
	document.addEventListener('mouseup', mouseUp, false);

	if(res=='true'){
		if($('ResBlock')){
			autotime = window.setTimeout(countdown, 1000);
		} else {
			return;
		}
	}

}


function getElementsByClassName(oElm, strTagName, strClassName){ // searches the oElm for strTagName objects with strClassName class
  var arrElements = (strTagName == '*' && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
  var arrReturnElements = new Array();
  strClassName = strClassName.replace(/\-/g, '\\-');
  var oRegExp = new RegExp('(^|\\s)' + strClassName + '(\\s|$)');
  var oElement;
  for(var i=0; i<arrElements.length; i++){
    oElement = arrElements[i];
    if(oRegExp.test(oElement.className)){
			arrReturnElements.push(oElement);
    }
  }
  return arrReturnElements;
}

function addElement(theElement) { // adds an element to the page either by the center object lmidlc or appends to html
	var htmldoc=$('lmid2');
	if(!htmldoc) {
		htmldoc=document.getElementsByTagName('body')[0];
		if(!htmldoc) return;
		theElement.style.marginLeft='130px';
		theElement.style.marginBottom='10px';
		theElement.style.width = '550px';

		if(loc.indexOf('dorf2')!=-1){
			theElement.style.top='150px';
		}
		else {
			theElement.style.top='50px';
		}

	} else {
		theElement.style.width = '500px';
		theElement.style.top='50px';
		if(loc.indexOf('karte.php?d=')!=-1){
		theElement.style.top='400px';
		}else if(loc.indexOf('karte.php?newdid')!=-1 && loc.indexOf('d=')!=-1 ){
		theElement.style.top='400px';
		} else if(loc.indexOf('karte.php?newdid')!=-1){
		theElement.style.top='50px';
		}
	}

	htmldoc.appendChild(theElement);
}

function addElementArray(root,element){
	if(root && element){
		var end=element.length;
		for (var i = 0; i < end; i++) {
			var c=element[i];
			if(c) root.appendChild( c );
		}
	}
}

/************************ Drag n drop*******************************/
/*** from Risi of http://userscripts.org/ **/
function mouseCoords(ev){
	return {x:ev.pageX, y:ev.pageY};
}

function getMouseOffset(target, ev){
	var docPos  = getPosition(target);
	var mousePos  = mouseCoords(ev);
	return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
}

function getPosition(e){
	var left = 0;
	var top = 0;
	while (e.offsetParent){
		left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
		top += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
		e   = e.offsetParent;
	}
	left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
	top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
	return {x:left, y:top};
}

function mouseMove(ev){
	var target = ev.target;
	var mousePos = mouseCoords(ev);

	if(dragObject){
		dragObject.style.position = 'absolute';
		dragObject.style.top  = (mousePos.y - mouseOffset.y) +'px';
		dragObject.style.left   = (mousePos.x - mouseOffset.x) +'px';
	}
	lMouseState = iMouseDown;
	return false;
}

function mouseUp(ev){
	if(dragObject) {
		setOption(dragObject.id, dragObject.style.top +'_'+ dragObject.style.left);
	}
	dragObject = null;
	iMouseDown = false;
}

function mouseDown(ev){
	var target = ev.target;
	iMouseDown = true;
	if(target.getAttribute('DragObj')){
		return false;
	}
}

function makeDraggable(item){
	if(!item) return;
	item.addEventListener('mousedown',function(ev){
		dragObject  = item.parentNode;
		mouseOffset = getMouseOffset(item.parentNode, ev);
		return false;
	}, false);
}

function setOption(key, value) {
	GM_setValue(key, value);
}

function getPos(key, defaultValue) {
	var myOption = GM_getValue(key, defaultValue);
	return myOption;
}

/************************ End Drag n drop*******************************/

/*************** Page info  *******************/
function intResource(){
		getResourceInfo(); // gathers the current store, capacity and production of each resource
		if(!resource) return; // if no resources exist on the page, return to stop the script
		calOverflow(); // computes the overflow information using resource information
		if(!overflow) return; //if overflow can't be computed, return to stop the script
		if(loc.indexOf('build')!=-1){
			getTime();
			resourcePerBuild();
		}
}

function gatherFields(){//gathers the name of each resource
	var orgbar=$('lres0');
	if(!orgbar) {orgbar=getElementsByClassName(document, 'div', 'div4')[0];}
	if(!orgbar) {orgbar=$('lres');}
	if(!orgbar) {fields[lang]=null; return;}

	var idbar=orgbar.getElementsByTagName('td');
	if(idbar[1].id.indexOf('1')==-1) order=1;

	var resbar=orgbar.getElementsByTagName('img');
	fields[lang]=[resbar[0].title,resbar[1].title,resbar[2].title,resbar[3].title];
}

function getResourceInfo(){ //using the resource values on the page, return the production, store, and capacity values as an array
	resource=new Array();

	for(var i=1;i<=4;i++) {
		var rtd  = $('l'+i);
		if(!rtd) { resource=null; return;}
		resource.push( [parseInt(rtd.title),parseInt(rtd.textContent.match(/\-?(\d+)\//)),parseInt(rtd.textContent.replace(/(\d+)\//,''))] );
	}

	if(order) {
		resource=resource.reverse();
	}
}

function getTime(){ // gets the time from the page or use java time
	var servertime=$('tp1')?$('tp1').textContent:"";
	if(!servertime) {
		var Digital=new Date();
		pagetime=[Digital.getHours(),Digital.getMinutes(),Digital.getSeconds()];
		if(pagetime[0]>12)military=true;
		return;
	}

	pagetime=timeField(servertime);
	servertime=pagetime;

	if(servertime==-1) {
		var Digital=new Date();
		pagetime=[Digital.getHours(),Digital.getMinutes(),Digital.getSeconds()];
	}

	if(pagetime[0]>12) military=true;

}

/*************** End Page info  *******************/


/*************** Calc. resource info *******************/
function calOverflow(){ //using the resource values, return the overflow information as an array
	overflow=[];

	for(var i=0;i<4;i++) {
		if(resource[i][0]>0){
			overflow[i] = [ Math.ceil(3600*(resource[i][2]-resource[i][1])/resource[i][0]),langfile[lang][1]];
		} else if(resource[i][0]<0){
			overflow[i] = [ Math.ceil(3600*(-resource[i][1])/resource[i][0]), langfile[lang][2] ];
		} else {
			overflow[i]=[ 0, langfile[lang][16] ];
		}
	}

}

function formatTime(maxtime, hours, minutes, seconds, off){ // given maxtime in secs and and offset values, returns a array of [hrs,min,sec]
   return [Math.floor(maxtime/3600)+hours+off,(Math.floor(maxtime/60)%60)+minutes,(maxtime % 60)+seconds];
}

function estTime(time){//using the pagetime and the wait time for the resource, returns a time field of when the resource will be ready
   var days=0;
   var head='';
   var tail=langfile[lang][5];

   while(time[2]>=60){
	   time[2]-=60;
	   time[1]+=1;
   }

   while(time[1]>=60){
	   time[1]-=60;
	   time[0]+=1;
   }

   while(time[0]>=24){
	   time[0]-=24;
	   days+=1;
   }

   if(time[0]<10){
		time[0]='0'+time[0];
   }
   if(time[1]<10){
		time[1]='0'+time[1];
   }
   if(time[2]<10){
		time[2]='0'+time[2];
   }

   if(days==0){
		head=langfile[lang][6];
   } else if(days==1){
		head=langfile[lang][7];
   } else {
		head=langfile[lang][8] +days + langfile[lang][9];
   }

	return head+time[0]+':'+time[1]+':'+time[2]+tail;
}

function timeField(time) { // convert a hh:mm:ss time stamp to seconds
 var limit = time.split(':');
 return (limit.length == 3) ? ([parseInt(limit[0]) , parseInt(limit[1]) , parseInt(limit[2])]) : -1;
}

function formatTimeString(maxtime){ // maxtime in seconds returns it in hh:mm:ss h format
   var helper=formatTime(maxtime, 0, 0, 0, 0);
   if(helper[1] < 10){helper[1] = '0'+helper[1];}
   if(helper[2] < 10){helper[2] = '0'+helper[2];}
   return helper[0]+':'+helper[1]+':'+helper[2]+' h';
}

/*** End Calc. resource info ***/
/**** The menus actions*******/

function selfoff(e){
	if(e.id=='ResBlock') {
		clearTimeout(autotime);
		$('Resource++').value='false'
		res='false';
		resTog();
		updateSetCookie();
	} else if(e.id=='NavLinks'){
		$('Navigator++').value='false'
		nav='false';
		navTog();
		updateSetCookie();
	} else if(e.id=='ToolsBlock'){
		$('Tools++').value='false'
		tools='false';
		toolsTog();
		updateSetCookie();
	}
}

function resize(e){
	var answer = prompt('Enter new size in px: ', 0 );

	if(!answer) return;

	answer=parseInt(answer);
	if(!answer) {
		if(e.id=='ResBlock') {
			GM_setValue('ResBlockPx', 254);
			resWidth=254; //254 default
		} else if(e.id=='NavLinks'){
			GM_setValue('NavLinksPx', 150);
			navWidth=150; // 150 default
		} else if(e.id=='ToolsBlock'){
			GM_setValue('ToolsBlockPx', 254);
			toolsWidth=254; // 254 default
		}
		return;
	}

	if(e.id=='ResBlock') {
		GM_setValue('ResBlockPx', answer);
		resWidth=answer; //254 default
	} else if(e.id=='NavLinks'){
		GM_setValue('NavLinksPx', answer);
		navWidth=answer; // 150 default
	} else if(e.id=='ToolsBlock'){
		GM_setValue('ToolsBlockPx', answer);
		toolsWidth=answer; // 254 default
	}

}

function jump(on){
	on=on.target;
	var opt_key = on.selectedIndex;
	if(!opt_key) return;
	var uri_val = on.options[opt_key].value;
	window.open(uri_val,'_top');
}

function makeOption(text, value){
var co=document.createElement('option');
	co.appendChild(  document.createTextNode(  text  )    );
	co.value=value;
	return co;
}

function toggle() {
		var frame=$('NavPop');
		if(!frame) return;

		var state=frame.style.visibility;
		if(state.indexOf('visible')==-1){
			frame.style.visibility = 'visible';
		} else {
			frame.style.visibility = 'hidden';
		}
}

function readSettings() {
	var value = GM_getValue('TravNavSet','Links++:=true||Resource++:=true||Navigator++:=true||Tools++:=true||');
	if (value == '' ) {resetSetting();return;}

	var arr = value.split(/[|]{2}/);
	var ret = new Array();

	for (var i = 0; i < arr.length; i++) {
		var b = arr[i].split(/[:][=]/);
		if(b.length==2)	ret.push(b);
	}

	if(ret.length!=4) {resetSetting();return;}

	if(ret[0][0]!='Links++' ) {resetSetting();return;}
	if(ret[1][0]!='Resource++')  {resetSetting();return;}
	if(ret[2][0]!='Navigator++')  {resetSetting();return;}
	if(ret[3][0]!='Tools++')  {resetSetting();return;}
	//I know that this seems strange but just go with it, I have reasons....
	if(ret[0][1]=='true' ) {links='true'; } else {links='false';}
	if(ret[1][1]=='true' ) {res='true'; } else {res='false';}
	if(ret[2][1]=='true' ) {nav='true'; } else {nav='false';}
	if(ret[3][1]=='true' ) {tools='true'; } else {tools='false';}
}

function resetSetting(){
	defSetting();
	links='true';
	res='true';
	nav='true';
	tools='true';
}

function eraseSetting() {
	GM_setValue('TravNavSet', '');
}

function defSetting(){
	GM_setValue('TravNavSet', 'Links++:=true||Resource++:=true||Navigator++:=true||Tools++:=true||');
}

function makeEventlink(text, href, event ){
var link=document.createElement( 'a' );
	link.href=href;
	link.title=text;
	link.appendChild(  document.createTextNode(  text ) );
	link.addEventListener('click',event,true);
return link;
}

function onoff(targ){
	if(targ.target.value=='true'){
		targ.target.value='false';}
	else {
		targ.target.value='true';
	}
	var res_start;
	var nav_start;
	var tools_start;
	if(targ.target.id=='Links++') {tools_start=links; links=targ.target.value;}
	else if(targ.target.id=='Resource++') {	res_start=res; res=targ.target.value;}
	else if(targ.target.id=='Navigator++') { nav_start=nav; nav=targ.target.value;}
	else if(targ.target.id=='Tools++') { tools=targ.target.value;}
	if(res_start!=res) {resTog();}
	if(nav_start!=nav) {navTog();}
	if(tools_start!=tools) {toolsTog();}
	updateSetCookie();
}

function resTog(){

	if(res=='true'){
		intResource();
		if(!res_m){
			resourceMenu('visible');
		}
		res_m.style.visibility = 'visible';
		clearTimeout(autotime);
		autotime = window.setTimeout(countdown, 1000);
	}else {
		clearTimeout(autotime);
		res_m.style.visibility = 'hidden';
	}

}

function toolsTog(){
	if(tools=='true'){
		if(!tools_m){
			toolMenu('visible');
		}
		tools_m.style.visibility = 'visible';
	} else {
		tools_m.style.visibility = 'hidden';
	}
}

function updateSetCookie(){
	GM_setValue('TravNavSet', 'Links++:='+links+'||Resource++:='+res+'||Navigator++:='+nav+'||Tools++:='+tools+'||');
}

function makebutton(opt0, opt1){
	var one=document.createElement('tr');
	var incell=document.createElement('td');
	incell.appendChild(document.createTextNode(opt0));
	one.appendChild(incell);
	incell=document.createElement('td');
	var but=document.createElement('input');
	but.type='button';
	but.style.width='100px';
	but.id=opt0;
	but.value=opt1;
	but.addEventListener('click',function (e){onoff(e);},true);
	incell.appendChild(but);
	one.appendChild(incell);
	return one;
}

function countdown(){ //updates all countdown values and displays

	var go=false;
	getResourceInfo();
	if(!resource) return;

	for(var i=0; i<4; i++){

		if(overflow[i][0]>0){
			go=true;
			overflow[i][0]--;
			var leftval=parseInt(resource[i][1]/resource[i][2] *100);
			//var color=(overflow[i][0]<300) ? 'red' : 'green';
			var newSpan = document.createElement('div');
			newSpan.style.cssFloat='left';
			newSpan.style.marginLeft='5px';
			newSpan.id=fields[lang][i]+'timer';
			newSpan.style.fontSize="10px";
			newSpan.appendChild(  document.createTextNode(formatTimeString(overflow[i][0])));

			/*if(newSpan.style.color.indexOf(color)==-1){
				newSpan.style.color=color;
			}*/

			var old=$(fields[lang][i]+'timer');
			old.parentNode.replaceChild(newSpan,old );
			old=$(fields[lang][i]+'value');

			if(parseInt(old.title)!=leftval){
				calOverflow();
				old=$('resbar'+i);
				var n=rowOpera(i,leftval);
				n.style.cssFloat='right';
				old.parentNode.replaceChild(n,old );
			}

		} else {
				var old=$(fields[lang][i]+'timer') ;

				if(old.textContent.indexOf('0:00:00')==-1){
					old.textContent='0:00:00';
					old.style.color='red';
					old=$('resbar'+i);
					old.parentNode.replaceChild(rowOpera(i,100),old );
				}
		}
	}

	if(go){
		autotime = window.setTimeout(countdown, 1000);
		}
	else {
		clearTimeout(autotime); //kill the timeout
		return;
	}

}
/**** End The menus actions*******/

/**** The menus*******/
function menu(){ //create an resource menu
		var send;

		if(tools=='true'){
			send='visible';
		}
		else {
			send='hidden';
		}

		toolMenu(send);

		if(res=='true'){
			send='visible';
		} else {
			send='hidden';
		}

		resourceMenu(send);

}

function toolMenu(vis){ //IFRAME  DORF3 DORF2 !!!
		var map_insert=document.createElement( 'table' );
		var row=document.createElement( 'tr' );
		var cell = document.createElement('td');

		map_insert.id='ToolsBlock';
		map_insert.setAttribute('style', 'z-index:5;');
		map_insert.setAttribute('cellspacing', 1);
		map_insert.setAttribute('cellpadding', 1);
		map_insert.className = 'tbg';
		map_insert.style.clear = 'both';
		map_insert.style.position='relative';
		map_insert.style.width = toolsWidth+'px';
		map_insert.style.fontWeight='bold';

		cell.setAttribute('colspan',1);
		cell.setAttribute('align', 'center');
		cell.className = 'rbg';

		var con=document.createElement('div');
		con.style.cssFloat='left';
		con.style.height='15px';
		con.style.width='15px';
		con.appendChild( makeEventlink('X', '#',  function (e){ $('ToolsBlock').style.visibility="hidden"; } ) );
		cell.appendChild( con );
		con=document.createElement('div');
		con.style.height='15px';
		con.style.cssFloat='left';
		if(!inIframe){
		top.ifrtitle=con
		}
		con.appendChild( document.createTextNode(  '' ) );
		con.style.width=(toolsWidth-32)+'px';
		cell.appendChild( con );
		con=document.createElement('div');
		con.style.height='15px';
		con.style.cssFloat='left';
		con.appendChild( makeEventlink('^', '#',  function (e){ resize(map_insert); } ) );
		cell.appendChild( con );
		row.appendChild( cell );
		map_insert.appendChild( row );
		row.style.cursor='move';
		makeDraggable(row);

		row=document.createElement('tr');
		cell=document.createElement('td');
		row.appendChild(cell);
		ifr=document.createElement('iframe');
		ifr.style.height="700px";
		ifr.style.width="640px";
		cell.appendChild(ifr);
		map_insert.appendChild(row);
		ifr.id="ifr_iframe";

	  var listCoords = getPos(map_insert.id, '448px_157px').split('_');
	  map_insert.style.top = listCoords[0];
	  map_insert.style.left = listCoords[1];
	  map_insert.style.position = 'absolute';
	  map_insert.style.zIndex = 200;
	  map_insert.style.visibility="hidden";
	  tools_m=map_insert;
	  document.body.appendChild(tools_m);
	  //fixen jobbfelülre
	  map_insert.style.right=0;
	  map_insert.style.top=0;
	  map_insert.style.left="";
	  map_insert.style.position="fixed";
	  //falvak áthelyezése jobbra
		if(inIframe){
			map_insert.style.display="none";
		}
}


function resourceMenu(vis){
if(GM_getValue("resmenuEnabled",true)==false){return;}

	var mymenu = document.createElement( 'table' );
		mymenu.id='ResBlock';
		mymenu.setAttribute('style', 'z-index:5;');
		mymenu.setAttribute('cellspacing', 1);
		mymenu.setAttribute('cellpadding', 1);
		mymenu.className = 'tbg';
		mymenu.style.marginTop='36px';
		mymenu.style.clear = 'both';
		mymenu.style.position='relative';

	var row =document.createElement('tr');
	var cell = document.createElement('td');
		cell.setAttribute('colspan',2);
		cell.setAttribute('align', 'center');
		cell.className = 'rbg';

	var con=document.createElement('div');
		con.style.height='15px';
		con.style.cssFloat='left';
		con.appendChild( document.createTextNode( langfile[lang][3] ) );
		con.style.width=(resWidth-32)+'px';
		cell.appendChild( con );
		con=document.createElement('div');
		con.style.height='15px';
		con.style.cssFloat='left';
		cell.appendChild( con );
		row.appendChild( cell );
		mymenu.appendChild( row );
		row.style.cursor='move';
		if(!inIframe){makeDraggable(row);}
		c=0

		var min=resource[0][0];
		for(var i=1; i<4; i++){
			if( resource[i][0] < min){  min = resource[i][0]; }
		}


		for(var i=0; i<4; i++){
  	  ratio[i]=(resource[i][0]/min).toFixed(2);
  	}

		for(var i=0; i<4; i++){
			var leftval=parseInt(resource[i][1]/resource[i][2] *100);

			con=document.createElement('div');
			con.style.cssFloat='left';
			con.id=fields[lang][i]+'timer'
			con.style.marginLeft='5px';
			con.style.fontSize="10px";
			newText = document.createTextNode(formatTimeString(overflow[i][0]));
			con.appendChild(newText);

			var inRow=rowOpera(i,leftval,con);
			row = document.createElement('tr');
			cell = document.createElement('td');
			cell.setAttribute('colspan',2);
			cell.appendChild( inRow );
			row.appendChild( cell );
			mymenu.appendChild( row );
		}

		mymenu.style.width = resWidth+'px';
		if(inIframe){
			mymenu.style.position = 'relative';
			mymenu.style.top = "-40px";
			mymenu.style.left = "100px";
		}else{
			mymenu.style.position = 'absolute';
			mymenu.style.top = "20px";
			mymenu.style.right="20px"
		}
		mymenu.style.zIndex =100;
		mymenu.style.visibility=vis;
		res_m=mymenu;
		document.body.appendChild(res_m);
}

function rowOpera(i,leftval,time){
//FIXME by lintaba
var tol= (leftval<50) ? 150 : 255;
var sec=155-leftval;

var testmain = document.createElement( 'div' );
var value = document.createElement( 'div' );
var con = document.createElement( 'div' );
var bar = document.createElement( 'table' );
var row= document.createElement( 'tr' );
var left= document.createElement( 'td' );
var right= document.createElement( 'td' );
var simg = document.createElement( 'img' );
	testmain.style.width=(resWidth-4)+'px';
	testmain.style.height='16px';

	simg.src='img/un/r/'+(i+1)+'.gif';
	simg.className='res';
	simg.style.cssFloat='left';
	simg.title=fields[lang][i];
	simg.alt=fields[lang][i];
	con.appendChild( document.createTextNode(  ratio[i] ) );
	con.style.cssFloat='left';
	con.style.width='40px';

	bar.style.cssFloat='left';
	bar.style.height='16px';
	bar.style.width=(resWidth-18-4-80)+'px';//18 img size, 4 borders, 80 val and con size
	bar.style.backgroundColor='white'
	bar.setAttribute('cellpadding','1');
	bar.setAttribute('cellspacing','0');

	left.id=fields[lang][i]+'left';
	right.id=fields[lang][i]+'right';
	value.id=fields[lang][i]+'value';
	left.style.width=leftval+'%';
	left.style.backgroundColor=rgb2HEX(sec, sec, parseInt(tol*(leftval/100)) );

if(time){
	if(leftval>50){
	left.appendChild(time)
	}else{
	right.appendChild(time)
	}
	right.style.width=(100-leftval)+'%';
}
	if(leftval>=90){
		value.setAttribute('style','text-decoration:blink;');
		value.style.color='red';
	} else {
		value.setAttribute('style','text-decoration:none;');
	}
	value.style.width='40px';
	value.appendChild( document.createTextNode(  leftval+'%' ) );
	value.style.cssFloat='left'
	value.title=leftval;

	row.appendChild(left);
	row.appendChild(right);
	bar.appendChild(row);

	testmain.appendChild( simg );
	testmain.appendChild( value );
	testmain.appendChild( bar );
	testmain.appendChild( con );

	testmain.id='resbar'+i;
	return testmain
}

function resourceBuildBar(vals, cid){//create a resource needed menu given an array of values
	var div1 = document.createElement('div');
	var inTable = document.createElement('table');
	var row = document.createElement('tr');
	var cell = document.createElement('td');

	inTable.className = 'tbg';
	inTable.style.width = '500px';
	inTable.setAttribute('cellspacing', 1);
	inTable.setAttribute('cellpadding', 1);
	cell.setAttribute('colspan',4);

	cell.appendChild(document.createTextNode(langfile[lang][0]));
	cell.className = 'rbg';
	row.appendChild( cell );
	inTable.appendChild( row );

	for(var i=0; i<4; i++){
		row = document.createElement('tr');
		row.style.color=vals[i][3];
		cell = document.createElement('td');
		var simg = document.createElement('img');
		simg.src='img/un/r/'+(i+1)+'.gif';
		simg.alt=fields[lang][i];
		simg.title=fields[lang][i];
		cell.appendChild(simg);
		row.appendChild(cell);
		cell = document.createElement('td');
		var con= document.createElement('span');
		con.appendChild(  document.createTextNode( vals[i][0] )  );
		cell.appendChild( con );
		row.appendChild(cell);

		con= document.createElement('span');
		cell = document.createElement('td');
		con.appendChild(  document.createTextNode( vals[i][1] )  );
		cell.appendChild( con );
		row.appendChild(cell);

		cell = document.createElement('td');
		if(vals[i][4]){
			con= document.createElement('span');
			con.appendChild(document.createTextNode(vals[i][2]));
			cell.appendChild(con);
			cell.appendChild(document.createTextNode(' |'+langfile[lang][10]+vals[i][4]));
		}
		else {
			cell.appendChild( document.createTextNode( vals[i][2] ) );
		}

		row.appendChild(cell);
		inTable.appendChild(row);
	}

	return inTable;
}



function resourcePerBuild(){ // search the page for resource needed to build, and calculates the surplus, deficit or other information

	var need = document.evaluate("//table[@class='f10']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var end = need.snapshotLength;
	if(end==0) return;

	var resourceBlock=new Array();

	for(var i=0; i<end; i++){
		var current=need.snapshotItem(i);
		var tdcells=current.getElementsByTagName('td');
		var cout=0;
		for(var k=0; k<tdcells.length; k++){
			if(tdcells[k].getAttribute('class')=='s7'){cout++;}
		}
		if(cout==0){
			var c=current.textContent;
			if( c.indexOf(' | ')!=-1 && c.charAt(0)!='\n' ) {
				 resourceBlock.push( current );}
		}
	}

	end=resourceBlock.length;
	if(end==0) return;

	for(var i=0; i<end; i++){

		if($('cost'+i)) {
			i++;
			continue;
		}

		var current=resourceBlock[i].textContent.split(' | ');

		var stuff=[];
		var maxtime=0;
		for(var j=0; j<4; j++){
			var cneed = parseInt( current[j] );
			var cproduction = parseInt( resource[j][0] );
			var cstore = parseInt( resource[j][1] );
			var cdiff = cstore-cneed;
			var ctime;
			var font='green'

			if(cproduction<0){

				if(cdiff>0){
					temp=parseInt(-cdiff/cproduction*3600);
					if(temp>maxtime) maxtime=temp;
					ctime=langfile[lang][17]+formatTimeString(temp);
				}
				else if(cdiff<0){
					ctime=langfile[lang][18]+fields[lang][i]+langfile[lang][19];
					font='red'
				}
				else {
					ctime=langfile[lang][18]+fields[lang][i]+langfile[lang][19];
					font='red'
				}

			} else if(cproduction>0){
				if(cdiff>0){
					ctime=langfile[lang][11]+(cdiff/cneed*100).toFixed(2)+'%';
				}
				else if(cdiff<0){
					temp=parseInt(-cdiff/cproduction*3600);
					if(temp>maxtime) maxtime=temp;
					ctime=langfile[lang][12]+formatTimeString(temp);
					font='red'
				}
				else {
					ctime=langfile[lang][20];
				}

			} else {

				if(cdiff>0){
					ctime=langfile[lang][20];
				}
				else if(cdiff<0){
					ctime=langfile[lang][18]+fields[lang][i]+langfile[lang][19];
					font='red'
				}
				else {
					ctime=langfile[lang][20];
				}

			}

			if(cdiff<0){
				stuff[j]=[langfile[lang][13],(-cdiff),ctime,font];
			}
			else if(cdiff>0){
				stuff[j]=[langfile[lang][14],cdiff,ctime,font];
			}
			else {
				stuff[j]=[langfile[lang][16],0,ctime,font];
			}


		}

		var holdtable;
		var w=false;
		var g=false;
		var blink=false;
		var over=false;

		var wblink=false;
		var gblink=false;

		var wover=false;
		var gover=false;

			if(maxtime>0){

				for(var k=0;k<4; k++){

					var left=Math.ceil((maxtime/3600)*resource[k][0])+resource[k][1];
					var cap=parseInt(  resource[k][2] )	;

					if(left>cap){
						if(k!=3){
							wover=true;
							w=true;
						} else{
							gover=true;
							g=true;
						}

						over=true;
						stuff[k].push( left +'*');
					} else {
						stuff[k].push( left );
					}

					if(current[k]>cap)	{

						if(k!=3){
							w=true;
							wblink=true;
							stuff[k].push( langfile[lang][21] );
						} else{
							g=true;
							gblink=true;
							stuff[k].push( langfile[lang][22] );
						}

						blink=true;
					}


				}

				holdtable=resourceBuildBar(stuff, 'cost'+i );

				var row = document.createElement('tr');
				var cell = document.createElement('td');
				cell.setAttribute('colspan',4);
				var timer=estTime( formatTime(maxtime+pagetime[0]*3600+pagetime[1]*60+pagetime[2],0,0,0,0) );

				cell.appendChild( document.createTextNode(  timer+' |'+langfile[lang][15]+formatTimeString(maxtime) ) );
				row.appendChild( cell );
				holdtable.appendChild( row );

				if(w || g){
					var msg='';
					row = document.createElement('tr');
					cell = document.createElement('td');

					if( w && g){
						msg=langfile[lang][21];
						if(wover) msg+='*';
						msg+=' and '+langfile[lang][22];
						if(gover) msg+='*';
					} else if(w){
						msg=langfile[lang][21];
						if(wover) msg+='*';
					} else {
						msg=langfile[lang][22];
						if(wover) msg+='*';
					}

					if(blink){
						cell.setAttribute('style','text-decoration:blink;');
						cell.style.color='red';
					} else {
						cell.style.color='green';
					}

					cell.setAttribute('colspan',4);
					cell.appendChild( document.createTextNode(  msg ) );
					row.appendChild( cell );
					holdtable.appendChild( row );
				}


			} else {
				holdtable=resourceBuildBar(stuff);
			}

			holdtable.id='cost'+i;

			resourceBlock[i].appendChild(holdtable);
	}

}





}

function rgb2HEX(red, green, blue){ // given red green blue values return their hexcode
  var decColor = red + (256 * green) + (65536 * blue);//offset each value and create a new int
	decColor=decColor.toString(16);//convert to a base16 string
	while( decColor.length < 6){//append 0 till it is a 6 length string
		decColor='0'+decColor;
	}
  return '#'+decColor;
}
  function autobuilding(){
  builds=GM_getValue("autobuild","");
	if($('lbau1')){//dorf1 építőmező
		counter=$('lbau1')
	}if($('lbau2')){//dorf2 építőmező
		counter=$('lbau2')
	}
	if(counter){
		timer=counter.lastChild.rows[0].cells[2].firstChild
		//timer.id='timeouta';
		var limit = timer.innerHTML.split(":");
		time=(limit.length == 3) ? ([parseInt(limit[0]) , parseInt(limit[1]) , parseInt(limit[2])]) : -1;
		time=time[0]*3600+time[1]*60+time[2]

	}
  }



function xpathEvaluate(xpathExpr) {
	return document.evaluate(xpathExpr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
}
function createHorizontalGraphicBar(parentNode, tableHeight, percent, barColor, complementColor) {

	var table = document.createElement('table');
	var row = createElementAppend('tr', table);
	var cell1 = createElementAppend('td', row);
	var cell2 = createElementAppend('td', row);

	table.cellSpacing = 0;
	table.border = 0;

	table.style.height = tableHeight + "px";
	table.style.width = "100%";

	cell1.style.width = percent + "%";
	cell2.style.width = (100 - percent) + "%";

	cell1.style.backgroundColor = barColor;
	cell2.style.backgroundColor = complementColor;

	parentNode.appendChild(table);
}
function createElementAppend(newElementTag, parentElement) {
	var newElement = document.createElement(newElementTag);
	parentElement.appendChild(newElement);
	return newElement;
}
function createElemAppendAndSetInner(newElementTag, parentElement, innerHTM) {
	var newElement = createElementAppend(newElementTag, parentElement);
	newElement.innerHTML = innerHTM;
	return newElement;
}
function retrievePageMarketPlaceSendResources_MercLoad() {
	var mercsLoad = xpathEvaluate('//div[@id="lmid2"]/form/p/b');

	if (mercsLoad.snapshotLength > 0) {
		mercsLoad = parseInt(mercsLoad.snapshotItem(0).textContent);
		if (!isNaN(mercsLoad)) {
			return mercsLoad;
		}
	}

	mercsLoad = xpathEvaluate('//div[@id="lmid2"]/form/table/tbody/tr/td/table/tbody/tr/td/a').snapshotItem(1).innerHTML;
	mercsLoad = parseInt(mercsLoad.substr(1));
	return mercsLoad;
}
function updateMerchantsUsed() {
	var inputsTable = xpathEvaluate('//div[@id="lmid2"]/form/table/tbody/tr/td/table[@class="f10"]').snapshotItem(0);
	var inputs = xpathEvaluateInContext(inputsTable, 'tbody/tr/td/input');

	var mercsLoad = retrievePageMarketPlaceSendResources_MercLoad();
	var availableAndTotalMercsString = xpathEvaluate('//div[@id="lmid2"]/form/table/tbody/tr/td/table[@class="f10"]/tbody/tr/td/span[@class="f135 b"]/../../../tr[1]/td').snapshotItem(0).firstChild.textContent;
	var availableMercs = availableAndTotalMercsString.split(" ")[1].split("/")[0];

	var txt = $("QPusedMercs");

	function getInputsTotal() {
		var res = 0;
		for(var i=0; i<inputs.snapshotLength; i++) {
			res += (inputs.snapshotItem(i).value == "") ? 0 : parseInt(inputs.snapshotItem(i).value);
		}
		return res;
	}
	var totResources = getInputsTotal();
	var mercs = Math.ceil(totResources / mercsLoad);
	var lastMercExcessLoad = ((totResources % mercsLoad) == 0) ? 0 : (totResources % mercsLoad);
	var lastMercAvailableLoad = ((totResources % mercsLoad) == 0) ? 0 : mercsLoad - (lastMercExcessLoad);
	if (mercs > availableMercs) {
		txt.innerHTML = totResources +" = "+ mercs + ((lastMercExcessLoad==0) ? " (0)" : (" (+"+ lastMercExcessLoad +")"));
		txt.style.color = "red";
	} else {
		txt.innerHTML = totResources +" = "+ mercs + ((lastMercAvailableLoad==0) ? " (0)" : (" (-"+ lastMercAvailableLoad +")"));
		txt.style.color = "green";
	}
}
function transformPageMarketplaceSendResources_addMerchantsUsed() {
	var inputsTable = xpathEvaluate('//div[@id="lmid2"]/form/table/tbody/tr/td/table[@class="f10"]').snapshotItem(0);
	var inputFillLinks = xpathEvaluateInContext(inputsTable, 'tbody/tr/td/a');
	var inputResourceFillLinks = xpathEvaluateInContext(inputsTable, 'tbody/tr/td/a/img[@class="res"]/..');
	var inputs = xpathEvaluateInContext(inputsTable, 'tbody/tr/td/input');

	// add the mercs used html
	var txt = document.createElement("span");
	txt.className = "QPsmall";
	txt.id = "QPusedMercs";
	inputsTable.parentNode.insertBefore(txt, inputsTable.nextSibling);
	txt.innerHTML = "0 = 0 (0)";
	txt.style.color = "green";


	for(var i=0; i<inputs.snapshotLength; i++) {
		inputs.snapshotItem(i).addEventListener('keyup', updateMerchantsUsed, true);
	}
	for(var i=0; i<inputFillLinks.snapshotLength; i++) {
		inputFillLinks.snapshotItem(i).addEventListener('click', updateMerchantsUsed, true);
		inputFillLinks.snapshotItem(i).addEventListener('dblclick', updateMerchantsUsed, true);
		inputFillLinks.snapshotItem(i).addEventListener('click', function(e){
			var iii = parseInt((i%4)+1);
			QPupd_res(iii);
		}, true);
	}
	for(var i=0; i<inputResourceFillLinks.snapshotLength; i++) {
		inputResourceFillLinks.snapshotItem(i).addEventListener('click', updateMerchantsUsed, false);
	}
}
function transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion() {
	var myUid = getUserId();
	// selects the receiving merchants
	var receiveAndTitles = xpathEvaluate('//div[@id="lmid2"]/form/table[@class="tbg"]|//div[@id="lmid2"]/form/p[@class="b"]');
	if (receiveAndTitles.snapshotLength == 0) { return; }
	if (loadPermanentArrivingMerchantsTitle() != receiveAndTitles.snapshotItem(0).textContent) { return; }

	var mercTimes = new Array();
	var mercWood = new Array();
	var mercClay = new Array();
	var mercIron = new Array();
	var mercCrop = new Array();
	for(var i=1; i<receiveAndTitles.snapshotLength; i++) {
		var currentMerchantTable = receiveAndTitles.snapshotItem(i);
		if (currentMerchantTable.nodeName == "P") { break; }
		var currentMerchantTime = currentMerchantTable.childNodes[1].childNodes[2].childNodes[1].childNodes[0].innerHTML;
		mercTimes[i-1] = timeColonSeparatedToValue(currentMerchantTime);
		var tdRes = currentMerchantTable.lastChild.lastChild.lastChild.lastChild;
		mercWood[i-1] = parseInt(tdRes.childNodes[1].nodeValue.replace("|", ""));
		mercClay[i-1] = parseInt(tdRes.childNodes[3].nodeValue.replace("|", ""));
		mercIron[i-1] = parseInt(tdRes.childNodes[5].nodeValue.replace("|", ""));
		mercCrop[i-1] = parseInt(tdRes.childNodes[7].nodeValue.replace("|", ""));
	}

	var woodSecs = 	calculateResourceOverflowOrStarvationWithMarketArrivals(g_res_prod[0], g_res_now[0], g_res_max[0], mercTimes, mercWood);
	var claySecs = 	calculateResourceOverflowOrStarvationWithMarketArrivals(g_res_prod[1], g_res_now[1], g_res_max[1], mercTimes, mercClay);
	var ironSecs = 	calculateResourceOverflowOrStarvationWithMarketArrivals(g_res_prod[2], g_res_now[2], g_res_max[2], mercTimes, mercIron);
	var cropSecs = 	calculateResourceOverflowOrStarvationWithMarketArrivals(g_res_prod[3], g_res_now[3], g_res_max[3], mercTimes, mercCrop);

	var previous = xpathEvaluate('//div[@id="lmid2"]/form/p/b/..');
	if (previous.snapshotLength > 0) {
		previous = previous.snapshotItem(0);
	} else {
		previous = xpathEvaluate('//div[@id="lmid2"]/form/p/input[contains(@src, "/b/ok1.gif")]').snapshotItem(0);
	}

	var resColor = ( (g_res_prod[3] <= 0) ? ( (g_res_prod[3] < 0) ? ';background-color:red' : ';background-color:orange;font-size:larger;' ) : '');

	var divOverflows = document.createElement('div');
	divOverflows.innerHTML = '<table class="tbg" cellpadding="2" cellspacing="1"><tbody><tr class="cbg1">' +
							'<td><img class="res" src="img/un/r/1.gif"></td><td><span id="QPtimer">'+woodSecs+'</span></td>' +
							'<td><img class="res" src="img/un/r/2.gif"></td><td><span id="QPtimer">'+claySecs+'</span></td>' +
							'<td><img class="res" src="img/un/r/3.gif"></td><td><span id="QPtimer">'+ironSecs+'</span></td>' +
							'<td><img class="res" src="img/un/r/4.gif"></td>' +
							'<td style="' + resColor + '"><span id="QPtimer">'+cropSecs+'</span></td>' +
							'</tr></tbody></table>'

	previous.parentNode.insertBefore(divOverflows, previous.nextSibling);
}
function getServerName() {
	return location.href.match(/([\w]+[.]travian([\d]?).[\w]+([.][\w]+)?)/i)[1];
}
function getFullServerName() {
	return location.href.match(/([\w]+:\/\/[\w]+[.]travian([\d]?).[\w]+([.][\w]+)?)/i)[1];
}
function getUserId() {
	var userID = xpathEvaluate('//a[contains(@href, "spieler.php?uid=")]');
	return getParamFromUrl(userID.snapshotItem(0).href, "uid");
}
function getCoordZfromHref(url) {
	var coordZ = getParamFromUrl(url, 'd');
	coordZ = (coordZ) ? coordZ : getParamFromUrl(url, 'z');
	return coordZ;
}
function loadPermanentArrivingMerchantsTitle() {
	var key = createPermanentKeyForArrivingMerchantsTitle();
	var ret = GM_getValue(key);
	return (ret == undefined) ? ret : unescape(ret);
}
function createPermanentKeyForArrivingMerchantsTitle() {
	return "_arrivingMerchants";
}

function savePermanentOwnMerchantsTitle(ownMercsTitle) {
	debug(DBG_LOW, "[savePermanentArrivingMerchantTitle] arrivingMercsTitle " + ownMercsTitle);
	var key = createPermanentKeyForOwnMerchantsTitle();
	debug(DBG_LOW, "[savePermanentArrivingMerchantTitle] key " + key );
	GM_setValue(key, escape(ownMercsTitle));
	debug(DBG_LOW, "[savePermanentArrivingMerchantTitle] key " + key + " arrivingMercsTitle " + ownMercsTitle);
}
function xpathEvaluateInContext(context, xpathExpr) {
	return document.evaluate(xpathExpr, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
}
function transformPageMarketplaceSendResources_addExtraQuantities() {

	var sendResRow = xpathEvaluate('//div[@id="lmid2"]/form/table/tbody/tr/td/table/tbody/tr/td/a/../..');

	var mercsLoad = retrievePageMarketPlaceSendResources_MercLoad();

	for(var i=0, len = sendResRow.snapshotLength; i<len; i++) {
		var currResourceRow = sendResRow.snapshotItem(i);

		currResourceRow.cells[0].innerHTML = "";
		var newTdRes = addListenerMarketplaceSendResources_updateResourceQuatity(currResourceRow, currResourceRow.cells[0], 20, mercsLoad, "<img src='img/un/r/"+parseInt(i+1)+".gif'/>");

		currResourceRow.cells[3].innerHTML = "";
		newTdRes = addListenerMarketplaceSendResources_updateResourceQuatity(currResourceRow, currResourceRow.cells[3], 1, mercsLoad, "("+mercsLoad+")");

		var newTd = createElementAppend('td', currResourceRow);
		addListenerMarketplaceSendResources_updateResourceQuatity(currResourceRow, newTd, 0, mercsLoad, "(x0)");
		newTd = createElementAppend('td', currResourceRow);
		addListenerMarketplaceSendResources_updateResourceQuatity(currResourceRow, newTd, 2, mercsLoad, "(x2)");
		newTd = createElementAppend('td', currResourceRow);
		addListenerMarketplaceSendResources_updateResourceQuatity(currResourceRow, newTd, 5, mercsLoad, "(x5)");
	}
}
function addListenerMarketplaceSendResources_updateResourceQuatity(currRowNode, parentNode, times, quantity, inner) {
	var link = createElemAppendAndSetInner('a', parentNode, '<span style="font-size:8pt">' + inner + '</span>');
	link.href = "#";

	var resInput = xpathEvaluateInContext(currRowNode, 'td/input').snapshotItem(0);

	link.addEventListener('click',	function() {
		if (times == 0) {
			resInput.value = '';

		} else {
			var resNewValue = resInput.value;
			resNewValue = (isNaN(parseInt(resNewValue))) ? 0 : parseInt(resNewValue);
			resInput.value = resNewValue + (times * parseInt(quantity));
		}
		updateMerchantsUsed();
	}, true);
	return link;
}
function loadPermanentOwnMerchantsTitle() {
	var key = createPermanentKeyForOwnMerchantsTitle();
	var ret = GM_getValue(key);
	return (ret == undefined) ? ret : unescape(ret);
}
function createPermanentKeyForOwnMerchantsTitle() {
	return getServerName() + "_" + getUserId() + "_" + "ownMerchants";
}
function getParamFromUrl(url, urlParam) {
	var res = "&" + url.substring(url.indexOf("?") + 1); //exclude "?" and before that
	var searchStr = "&" + urlParam + "=";
	var pos = res.indexOf(searchStr);
	if (pos != -1) {
		res = res.substring(res.indexOf(searchStr) + searchStr.length);
		var endPos = (res.indexOf("&") > res.indexOf("#")) ? res.indexOf("&") : res.indexOf("#");
		if (endPos != -1) {
		 	res = res.substring(0, endPos);
		}
		return res;
	} else {
		return;
	}
}
function transformPageMarketplaceSendResources_addCumulativeArrivals() {

	// selects the receiving merchants
	var sendReceive = xpathEvaluate('//div[@id="lmid2"]/form/table[@class="tbg"]|//div[@id="lmid2"]/form/p[@class="b"]');
	if (sendReceive.snapshotLength == 0) { return; };
	if (loadPermanentArrivingMerchantsTitle() != sendReceive.snapshotItem(0).textContent) { return; }

	for(var i=0; i<sendReceive.snapshotLength; i++) {

		if ((i>0) && (sendReceive.snapshotItem(i).nodeName == "P")) { break; }

		if (sendReceive.snapshotItem(i).nodeName == "P") {
			//create place to sum the resources
			var sp = document.createElement("span");
			var swood = document.createTextNode("0");
			var sclay = document.createTextNode("0");
			var siron = document.createTextNode("0");
			var scrop = document.createTextNode("0");
//			var stime = document.createTextNode("99:99:99");
			var stime = document.createElement("span");
//<span id="time6">0:45:09</span>
			var img1 = document.createElement("img");	img1.src = "img/un/r/1.gif";
			var img2 = document.createElement("img");	img2.src = "img/un/r/2.gif";
			var img3 = document.createElement("img");	img3.src = "img/un/r/3.gif";
			var img4 = document.createElement("img");	img4.src = "img/un/r/4.gif";
			var img5 = document.createElement("img");	img5.src = IMGS_CLOCK;
			sp.appendChild(img1);	sp.appendChild(swood);
			sp.appendChild(img2);	sp.appendChild(sclay);
			sp.appendChild(img3);	sp.appendChild(siron);
			sp.appendChild(img4);	sp.appendChild(scrop);
			sp.appendChild(img5);	sp.appendChild(stime);
			sendReceive.snapshotItem(i).appendChild(sp);
		} else { // table
			// add resources, keep max time
			var tdRes = sendReceive.snapshotItem(i).lastChild.lastChild.lastChild.lastChild;
//			GM_log("[onMarketPlaceSendResourcesLoad] td res " + tdRes.innerHTML);
			var rwood = parseInt(tdRes.childNodes[1].nodeValue.replace("|", "")); swood.nodeValue = parseInt(swood.nodeValue) + rwood;
			var rclay = parseInt(tdRes.childNodes[3].nodeValue.replace("|", "")); sclay.nodeValue = parseInt(sclay.nodeValue) + rclay;
			var riron = parseInt(tdRes.childNodes[5].nodeValue.replace("|", "")); siron.nodeValue = parseInt(siron.nodeValue) + riron;
			var rcrop = parseInt(tdRes.childNodes[7].nodeValue.replace("|", "")); scrop.nodeValue = parseInt(scrop.nodeValue) + rcrop;
//			stime.nodeValue = sendReceive.snapshotItem(i).lastChild.childNodes[2].childNodes[1].firstChild.innerHTML;
			stime.innerHTML = sendReceive.snapshotItem(i).lastChild.childNodes[2].childNodes[1].firstChild.innerHTML;
//			stime.id = sendReceive.snapshotItem(i).lastChild.childNodes[2].childNodes[1].firstChild.id;
//			stime.id = "timeouta";
			stime.id = "QPtimer";
		}
	}
}
function transformGeneric_addAutoCompleteFromPlus() {
	var destNameInputs = xpathEvaluate('//input[@name="dname"]');

	if (destNameInputs.snapshotLength == 0) { return; }
	var df;

	var isToCreateTheDestinationVillage = true;
	for(var i=0; i<destNameInputs.snapshotLength; i++) {
		var currentInput = destNameInputs.snapshotItem(i);
		currentInput.addEventListener("focus", function () {
			if (isToCreateTheDestinationVillage) {
				isToCreateTheDestinationVillage = false;
				// Create the destination village list
				var villages = getInfo_getOwnVillageLinksFromRightSideVillageList();
				df = new Array();
				for(var j=0; j<villages.snapshotLength; j++) {
					df.push(villages.snapshotItem(j).innerHTML);
				}
			}
		}, true);
		currentInput.addEventListener("keyup", function() {	// my_village() -> adapted from unx.js
			var aU = Math.round(0);
			var aD;
			var e = currentInput.value;
			for(var i = 0; i < df.length; i++) {
				if (df[i].indexOf(e) > -1) {
					aU++;
					aD = df[i];
				}
			}
			if (aU == 1) {
				currentInput.value = aD;
			}
		}, true);
	}
}
function transformPageMarketplaceSendResources_addExtraQuantities() {
try{
	var sendResRow = xpathEvaluate('//div[@id="lmid2"]/form/table/tbody/tr/td/table/tbody/tr/td/a/../..');

	var mercsLoad = retrievePageMarketPlaceSendResources_MercLoad();

	for(var i=0, len = sendResRow.snapshotLength; i<len; i++) {
		var currResourceRow = sendResRow.snapshotItem(i);
		currResourceRow.cells[0].innerHTML = "";
		var newTdRes = addListenerMarketplaceSendResources_updateResourceQuatity(currResourceRow, currResourceRow.cells[0], 20, mercsLoad, "<img src='img/un/r/"+parseInt(i+1)+".gif'/>");

		currResourceRow.cells[3].innerHTML = "";
		newTdRes = addListenerMarketplaceSendResources_updateResourceQuatity(currResourceRow, currResourceRow.cells[3], 1, mercsLoad, "("+mercsLoad+")");

		var newTd = createElementAppend('td', currResourceRow);
		addListenerMarketplaceSendResources_updateResourceQuatity(currResourceRow, newTd, 0, mercsLoad, "(x0)");
		newTd = createElementAppend('td', currResourceRow);
		addListenerMarketplaceSendResources_updateResourceQuatity(currResourceRow, newTd, 2, mercsLoad, "(x2)");
		newTd = createElementAppend('td', currResourceRow);
		addListenerMarketplaceSendResources_updateResourceQuatity(currResourceRow, newTd, 5, mercsLoad, "(x5)");
	}
	}catch(e){}
}
function transformGenericPage_fixTitle() {
	var titleInPage = xpathEvaluate('//h1');
	if (titleInPage.snapshotLength == 0) { return; }	// just in case a page has no title
	var titleInPageStr = titleInPage.snapshotItem(0).textContent;
	if (document.location.pathname.indexOf('/dorf2.php') == 0) {
		titleInPageStr = String.fromCharCode(164, 32) + titleInPageStr;
	}
	var dTitle = document.title;
	var spacePos = dTitle.indexOf(" ");
	dTitle = dTitle.substr(0, 1) + dTitle.substr(spacePos);
	//if(inIframe){top.ifrtitle.innerHTML=dTitle + " - " + titleInPageStr;}
	document.title = dTitle + " - " + titleInPageStr;

}
function transformPageHeroMansion_addHeroLevelInfo() {
	var heroTable = xpathEvaluate('//div[@id="lmid2"]/table[@class="tbg"]/tbody/tr[@class="rbg"]/td/span[@class="t"]/../a[contains(@href, "&rename")]/span[@class="c0"]/../../../..').snapshotItem(0);
	var heroTableRows = heroTable.rows;

	var heroLevel = parseInt(/\d+/.exec(heroTableRows[0].cells[0].textContent));
	var heroLevelPercent = parseInt(/\d+/.exec(heroTableRows[heroTableRows.length - 1].cells[1].textContent));

	var thisLevelExp = (heroLevel + 1) * 100;
	var currLevelExp = ((thisLevelExp) / 2) * heroLevel;
	var nextLevelExp = currLevelExp + thisLevelExp;

	var expGainedInThisLevel = (heroLevel+1) * heroLevelPercent;
	var expToLevelUp = (heroLevel+1) * (100 - heroLevelPercent);

	var levelTxt = heroTableRows[0].cells[0].childNodes[1].textContent;
	levelTxt = levelTxt.substr(0, levelTxt.indexOf(1, " "));

	var separatorRow = createElemAppendAndSetInner('tr', heroTable, '<td colspan="0" />');

	var extendedHeroRow = createElementAppend('tr', heroTable);
	var extendedHeroCell = createElementAppend('td', extendedHeroRow);
	extendedHeroCell.colSpan = 0;
	var extendedHeroTable = createElementAppend('table', extendedHeroCell);
	extendedHeroTable.style.width = "100%";
	extendedHeroTable.className = "tbg";
	extendedHeroTable.border = 0;
	extendedHeroTable.cellSpacing = 1;

	var row1 = createElementAppend('tr', extendedHeroTable);
	var r1c1 = createElemAppendAndSetInner('td', row1, levelTxt + " " + heroLevel);
	var r1c2 = createElemAppendAndSetInner('td', row1, heroLevelPercent + "%");
	var r1c3 = createElemAppendAndSetInner('td', row1, (100 - heroLevelPercent) + "%");
	var r1c4 = createElemAppendAndSetInner('td', row1, levelTxt + " " + (heroLevel + 1));

	var row2 = createElementAppend('tr', extendedHeroTable);
	var r2c1 = createElementAppend('td', row2);		r2c1.width = "20%";
	var r2c2 = createElementAppend('td', row2);		r2c2.colSpan = 2;
	createHorizontalGraphicBar(r2c2, 8, heroLevelPercent, "green", "yellow");
	var r2c3 = createElementAppend('td', row2);		r2c3.width = "20%";

	var row3 = createElementAppend('tr', extendedHeroTable);
	var r3c1 = createElemAppendAndSetInner('td', row3, currLevelExp);
	var r3c2 = createElemAppendAndSetInner('td', row3, expGainedInThisLevel);
	var r3c3 = createElemAppendAndSetInner('td', row3, expToLevelUp);
	var r3c4 = createElemAppendAndSetInner('td', row3, nextLevelExp);

	r3c2.title = "" + currLevelExp + " + " + expGainedInThisLevel + " = " + (currLevelExp+expGainedInThisLevel);
}
function isThisPageAnyBuildingPage(){
	url=document.location.href
	if (url.search(/build\.php/) != -1) {
		var url = document.location.href;
	if (url.search(/build\.php/) != -1) {
		var maps = xpathEvaluate('//map[contains(@name, "map")]');
		return !(maps.snapshotLength == 2);
	}
	return true;

	}
	return false;
}

function isThisPageHeroMansionPage() {
	if (isThisPageAnyBuildingPage()) {
		var heroNameSpan = xpathEvaluate('//div[@id="lmid2"]/table[@class="tbg"]/tbody/tr[@class="rbg"]/td/span[@class="t"]/../a[contains(@href, "&rename")]/span[@class="c0"]');
		return (heroNameSpan.snapshotLength == 1);
	}
	return false;
}
function isThisPageAnyMarketPlacePage() {
	if (isThisPageAnyBuildingPage()) {
		var linksMyProfilePage = xpathEvaluate('//div[@id="lmid2"]/p/a[contains(@href, "&t=")]');
		return (linksMyProfilePage.snapshotLength > 0);
	}
	return false;
}

function dorf2_center_numbers(){

	// ›› Event listener starts things off once the page is done loading.
	var tm_timeoutShow = 0;
	var tm_timeoutHide = 0;
	var tm_overUp = 0;
	var dorf = 0;

	function init(){
	var cssString = '.TMbuildingtags{' +
		'background-color:#FDF8C1;' +
		'border:thin solid #000000;' +
		'-moz-border-radius: 2em;' +
		'border-radius: 2em;' +
		'padding-top: 3px;' +
		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
		'font-size:8pt;' +
		'font-weight:bold;' +
		'text-align:center;' +
		'position:absolute;' +
		'width:18px;' +
		'height:15px;' +
		'cursor:pointer;' +
		'visibility:hidden;' +
		'z-index:26;}' +
		'.tm_uplevel {' +
			'background-color:#FDF8C1;' +
			'border:1px solid #000;' +
			'-moz-border-radius: 5px;' +
			'-moz-user-select:none;' +
			'padding: 0px;' +
			'font-size:10pt;' +
			'font-weight:bold;' +
			'text-align:center;' +
			'position: absolute;' +
			'width: 21px;' +
			'height: 18px;' +
			'cursor: pointer;' +
			'z-index: 100;}'
	GM_addStyle(cssString);
	TM_ShowMainBuildingNumbers();
	if (true) {
		var div = document.createElement('div');
		div.id = 'tm_uplevel';
		div.className = 'tm_uplevel';
		div. innerHTML = 'Up';
		div.style.display = 'none';
		div.addEventListener('mouseover', function() {tm_overUp = 1}, false);
		div.addEventListener('mouseout', function() {tm_overUp = 0;$('tm_uplevel').style.display = 'none'}, false);
		div.addEventListener('click', function () {myajax(this.getAttribute('msg'), upgradeBuilding); this.style.display = 'none'}, false);
		$('lmid2').appendChild(div);
	}
	}

	// ›› Main.
	function TM_ShowMainBuildingNumbers(){
		var imgId, countArray, dx, dy, checkWW;

		// ›› Map1 holds building names, level and building spot IDs in area elements (2 are duplicate walls to be ignored).

		var map1Element;
		if (dorf == 0) {
			map1Element = document.getElementsByName('map1')[0];
			if (map1Element) {
				countArray = 22;
				dtop = 46;
				dleft = 78
				dorf = 2
				checkWW = document.evaluate('//img[@class="d8"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if (checkWW == null) countArray = 18
			}
		}
		if (dorf == 0) {
			map1Element = document.getElementsByName('rx')[0];
			if (!map1Element) return
			countArray = 18;
			dtop = 50;
			dleft = -15
			dorf = 1
		}
			// ›› Map1 ONLY has area children.
			var areaElements = map1Element.getElementsByTagName('area');
			var BuildingLevel, smallDIV, coords;
			var BuildingURL = new Array(21);

			for (var i = 0; i < countArray; i++) {
				BuildingLevel = /(\d+)/.exec(areaElements[i].getAttribute("title"));
				BuildingURL = areaElements[i].getAttribute("href");
				coords = areaElements[i].coords.split(',');
				// ›› Only show spots with buildings on them.
				if (BuildingLevel){

					if (dorf == 2) {

						imgId = parseInt(BuildingURL.match(/id\=(\d+)/).pop()) - 18;

						switch(imgId) {
							case 21:
								gid = document.evaluate('//img[@class="dx1"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.getAttribute('src').match(/g(\d+)/).pop();
								break;
							case 22:
								gid = 0;
								break;
							case 8:
								if (checkWW == null) {
									gid = 40;
								} else {
									gid = document.evaluate('//img[@class="d' + imgId + '"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.getAttribute('src').match(/g(\d+)/).pop();
								}
								break;
							default:
								gid = document.evaluate('//img[@class="d' + imgId + '"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.getAttribute('src').match(/g(\d+)/).pop();
						}
					}
					if (dorf == 1) gid = 0;

					smallDIV = addDiv('TMbuildingtag' + i,'TMbuildingtags',BuildingLevel[0],false);
					smallDIV.style.top = parseInt(coords[1]) + parseInt(60) + 'px';
					smallDIV.style.left = parseInt(coords[0]) + parseInt(95) + 'px';
					smallDIV.style.visibility = "visible";
					if (BuildingLevel[0] == getMaxLevel(gid)) {
						smallDIV.style.backgroundColor = '#AAA';
					} else {
					if(i==0){id=16;}else{
					id=$('lmid2').childNodes[i].src.replace(/(http:\/\/s([0-9]|speed).[a-zA-Z.\/]*)|.gif/g,"");
					}
					if(calculateResourceTime(buildingCost[id][BuildingLevel[0]*1+1])==null){var lvl="#4CDE5B";}else{var lvl="#F88";}
					//$('lmid1').innerHTML+=i+"|"+id+"|"+lvl+"|"+BuildingLevel[0]+"<br>";
					smallDIV.style.backgroundColor = lvl;
						if (true) {
							areaElements[i].addEventListener('mouseover', function (ev) {tm_timeoutShow = setTimeout(overArea, 1000, ev)}, false);
							areaElements[i].addEventListener('mouseout', function () {clearTimeout(tm_timeoutShow);setTimeout(outArea, 500)}, false);
						} // if
					} // else if

				} // if
			} // for
	} // function

	// ›› Adds a generic div.
	function addDiv(id,style,html,parent){
		var body, div;
		if (!parent){body = document.getElementsByTagName('body')[0];}else{body = document.getElementsByTagName(parent);}
		if (!body) { return false; }
		div = document.createElement('div');
		div.id = id;
		div.className = style;
		if (html){div.innerHTML = html;}
		if (true && dorf != 1) {
			$('lmid2').appendChild(div);
		};
		return div;
	}

	function getMaxLevel(gid) {
		var maxLevel;
		switch (gid) {
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				maxLevel = 5;
				break;
			case '23':
			case '27':
				maxLevel = 10;
				break;
			case '40':
				maxLevel = 100;
				break;
			default:
				maxLevel = 20;
		}
		return (maxLevel)
	}

	function overArea(ev){
	//	GM_log('+overArea');
		if (!tm_timeoutShow) return;
		var obj = ev.target;
		var coords = obj.coords.split(',');
		$('tm_uplevel').style.left = parseInt(coords[0]) + dleft  + 'px';
		$('tm_uplevel').style.top  = parseInt(coords[1]) + dtop + 'px';
		$('tm_uplevel').style.display = '';
		$('tm_uplevel').setAttribute('msg', obj.href);
	}

	function outArea(){
		if (tm_overUp != 1) $('tm_uplevel').style.display = 'none';
	}

	function myajax(url1, onfunc){
		var g = new XMLHttpRequest();
		g.onreadystatechange=function(){
			if(g.readyState==4&&g.status==200){
				onfunc(g);
			};
		};
		g.open("GET",url1,true);
		g.send(null);
	}

		function upgradeBuilding(z) {
			var ans = document.createElement('DIV');
			ans.innerHTML = z.responseText;
			var ansdoc = document.implementation.createDocument("", "", null);
			ansdoc.appendChild(ans);
			var link = ansdoc.evaluate('//a[contains(@href, "php?a=")]', ans, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			if(link) {
				myajax(link.href, function(){window.location.reload()});
			} else {
				err = ansdoc.evaluate('//span[@class="c"]', ans, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if (err == null) err = ansdoc.evaluate('//p[@class="c"]', ans, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				alert(err.innerHTML);
			}
		}

	init();


}
//	if (location.href.match(/karte2.php($|\?z=)/)){		desplazarMapa(); return; }

if(window.location.pathname!="/dorf3.php" && top.location.pathname=="/dorf3.php"){
	var inIframe=true;
	}else{
	var inIframe=false;
	}
	f=document.forms[0]

	/* Acciones generales a todas las paginas */
	transformGenericPage_fixTitle()
try{
	getGeneralData();
	}catch(e){}
	sanearEnlaces();
	hideAd();
	quickLinks();
	buildingLinks();
	playerLinks();
	calculateFillTime();
	cityLinks();
	borrarCuenta();
	confirmDelete();
	document.titleDef=document.title
	 /*Acciones especificas para algunas paginas */
	if (location.href.indexOf('build.php?') != -1){		quickCity(); /*recursosMercado();*/ tiempoExplorarUnidades(); tiempoExplorar(); }
	if (location.href.indexOf('build.php') != -1){ 		calculateBuildTime(); tiempoExplorarUnidades(); tiempoExplorar(); mostrarVentas(); }
	try{
	if (location.href.indexOf('a2b.php') != -1){		quickCity(); ataqueDefecto(); }
	}catch(e){}
	if (location.href.indexOf('nachrichten.php') != -1)	opcionOcultaMensajes();
	if (location.href.indexOf('berichte.php') != -1)	opcionOcultaInformes();
	if (location.href.match(/dorf3.php($|\?newdid=(\d+)$|\?s=2)/)){
		$('lright1').style.width="100px";
		$('navi_table').appendChild($('lright1').parentNode.removeChild($('lright1')));
		if(location.href.match(/s=/)){
			resumenAldeas(1)
		}else{
			resumenAldeas(0)
		}
	};
	if (location.href.match(/build.php\?(.*)&s=2/))		puntosCultura();
	if (location.href.match(/build.php\?(.*)&t=1/)){	alianzaMercado(); filtrosMercado(); }
	if (location.href.match(/karte.php($|\?z=|\?new)/)){	preCalculate3(); desplazarMapa(); infoRecursos(); }
	if (location.href.match(/nachrichten.php($|\?t=|\?s=)/) || location.href.match(/berichte.php($|\?t=|\?s=)/)) opcionesMensajes();
	//if (location.href.match(/nachrichten.php$/))		blocNotas();
        if (location.href.match(/spieler.php\?s=2/))            mostrarConfiguracion();
	if (location.href.match(/plus.php\?id=3/))		checkUpDate();
	try{
	  if (location.href.indexOf('dorf2') != -1){
		//dorf2_korok();
		//preCalculate2();
		dorf2_center_numbers();
	  }
	  if (location.href.indexOf('dorf1') != -1)		preCalculate1();
	  if (location.href.indexOf('dorf1') != -1 || location.href.indexOf('dorf2') != -1){
		//autobuilding();
	  }
  }catch(e){if(console){console.error("t3b hiba a dorf kezelésében:");console.dir(e)}}

	mostrarMarcadores();
	setTimers();
	//szamlalo()

	//hero_status();
	if(isThisPageHeroMansionPage()){transformPageHeroMansion_addHeroLevelInfo();}
	if(isThisPageAnyMarketPlacePage()){
			transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion();
			transformPageMarketplaceSendResources_addMerchantsUsed();
			transformPageMarketplaceSendResources_addExtraQuantities();
			transformPageMarketplaceSendResources_addCumulativeArrivals();
			transformGeneric_addAutoCompleteFromPlus();
	}
	quick_maps()

	calcularTiempoEjecucion();
	if(window.location.pathname!="/dorf3.php" && top.location.pathname=="/dorf3.php"){
		top.document.getElementById('n5').src=$('n5').src;
		document.body.removeChild(document.body.firstChild)
		document.body.removeChild(document.body.firstChild)
		$('lres0').style.top=0;
		$('lres0').style.left=0;
		document.body.removeChild($('ltime'))
		//$('lmidall').removeChild($('lright1'))
		$('lmidlc').removeChild($('lleft'))
		removeElement("lright1".firstChild)
		removeElement("lright1".lastChild)
		var inIframe=true;
	}else{
		var inIframe=false;
	}
	resources()
};
//*
window.addEventListener('DOMContentLoaded', funcionPrincipal, false);
if (document.body) funcionPrincipal();
