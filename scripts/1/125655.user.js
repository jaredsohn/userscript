
// ==UserScript==
// @name           Fast
// @namespace      http://playmage.com/
// @include        http://*playmage.com/*
// @include        https://*playmage.com/*
// @version		   1.5
// ==/UserScript==


//Special Thanks:
//DWPS team for helping us make this adventure possible....              
              
// Magic 
if (location.host == "kong.playmage.com" && location.href.indexOf("http://kong.playmage.com/dream") != 0) { return; } 

// config values
var delayMs, coinMulti, eventMulti, gambler, wiseman, girl, imp, dust, elf, beggar, well, ally, niceAlly, map, boss;
//delayMs = 50;		// milliseconds to wait before auto actions +/- 50%

// ----------config values
coinMulti = 1.0;	// default event coin multiplier, set to 1.5 for a +50% coins event for example
eventMulti = 1.5;	// Event-Multiplier for coins for Well and Beggar, reference value
gambler = 1;		// 0=Accept,1=Fight
wiseman = 0;		// 0=Talk, 1=Trivia, 2=Fight
girl = 0;		// 0=Accept,1=Fight
imp = 0; 		// 0=Accept,1=Run
dust = 1;		// 0=Accept,1=Fight
ally = 1;		// 0=get, 1=keep old (gets normal allies, except nice ones, see below)
niceAlly = 1;		// 0=get, 1=keep old (get nice allies like Puppy, Priestess and Phoenix
map = 1;		// 0="Find", 1="Sell"
elf = 0;		// 0=fight, 1=buy with coins
boss = 0;		// 0=fight, 1=Do nothing
well = 0;		// 0=Skip, 1=Throw
//------------config end

// GUI text for buttons
var wise_choice, imp_choice, girl_choice, dust_choice, gambler_choice, ally_choice, map_choice, beg_choice, well_choice, elf_choice, boss_choice;
boss_choice = ["Boss:Fight","Boss:Nothing"];
elf_choice = ["Elf:Fight","Elf:Buy"];
well_choice = ["Well:Skip","Well:Throw"];
var ally_names = ["Kitten","Puppy","Pony","Priestess","Unicorn","Robot","Soldier","Phoenix","Alien","Dragon"];

var ativo = false;
var idTimeouts;
var idIntervals;
var estagioNavegacao = 0;
var estagioTransDiv = 0;

if(typeof (unsafeWindow) == 'undefined') { unsafeWindow = window; }
//2*hp+1 and 4*heal potion+1
var arrHighValues = [41, 81, 121, 161, 201, 289, 393, 513, 649, 801, 961, 1153, 1381, 1657, 1985, 2381, 2857, 3425, 4109, 4929, 5813, 6857, 8089, 9541, 11257, 13281, 15669, 18489, 21813, 25737, 30369, 35833, 42281, 49889, 58865, 69457, 81957, 96709, 114113, 134653, 156197, 181185, 210173, 243797, 282801, 328049, 380533, 441417, 494385, 553709, 620153, 694569, 777917, 871265, 975813, 1092909, 1224057, 1370941, 1535453, 1719705, 1926069, 2157197, 2416057, 2705981, 3030697, 3394377, 3801701, 4257905, 4768853, 5341113, 5982045, 6699889, 7503873, 8404337, 9412857, 10542397, 11807481, 13224377, 14811301, 16588657, 18579293, 20808805, 23305861, 26102561, 29234865, 32743045, 36672209, 41072873, 46001617, 51521809, 57704425, 64628953, 72384425, 81070553, 90799017, 101694897, 113898281, 127566073, 142874001, 160018881]
var arrLowValues = [21, 41, 61, 81, 101, 145, 197, 257, 325, 401, 481, 577, 691, 829, 993, 1191, 1429, 1713, 2055, 2465, 2907, 3429, 4045, 4771, 5629, 6641, 7835, 9245, 10907, 12869, 15185, 17917, 21141, 24945, 29433, 34729, 40979, 48355, 57057, 67327, 78099, 90593, 105087, 121899, 141401, 164025, 190267, 220709, 247193, 276855, 310077, 347285, 388959, 435633, 487907, 546455, 612029, 685471, 767727, 859853, 963035, 1078599, 1208029, 1352991, 1515349, 1697189, 1900851, 2128953, 2384427, 2670557, 2991023, 3349945, 3751937, 4202169, 4706429, 5271199, 5903741, 6612189, 7405651, 8294329, 9289647, 10404403, 11652931, 13051281, 14617433, 16371523, 18336105, 20536437, 23000809, 25760905, 28852213, 32314477, 36192213, 40535277, 45399509, 50847448, 56949141, 63783037, 71437001, 80009441]
var arr1B = [1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000];

function mms (arrValores) {
	var guesses = ["0000","0001","0002","0003","0010","0011","0012","0013","0020","0021","0022","0023","0030","0031","0032","0033","0100","0101","0102","0103","0110","0111","0112","0113","0120","0121","0122","0123","0130","0131","0132","0133","0200","0201","0202","0203","0210","0211","0212","0213","0220","0221","0222","0223","0230","0231","0232","0233","0300","0301","0302","0303","0310","0311","0312","0313","0320","0321","0322","0323","0330","0331","0332","0333","1000","1001","1002","1003","1010","1011","1012","1013","1020","1021","1022","1023","1030","1031","1032","1033","1100","1101","1102","1103","1110","1111","1112","1113","1120","1121","1122","1123","1130","1131","1132","1133","1200","1201","1202","1203","1210","1211","1212","1213","1220","1221","1222","1223","1230","1231","1232","1233","1300","1301","1302","1303","1310","1311","1312","1313","1320","1321","1322","1323","1330","1331","1332","1333","2000","2001","2002","2003","2010","2011","2012","2013","2020","2021","2022","2023","2030","2031","2032","2033","2100","2101","2102","2103","2110","2111","2112","2113","2120","2121","2122","2123","2130","2131","2132","2133","2200","2201","2202","2203","2210","2211","2212","2213","2220","2221","2222","2223","2230","2231","2232","2233","2300","2301","2302","2303","2310","2311","2312","2313","2320","2321","2322","2323","2330","2331","2332","2333","3000","3001","3002","3003","3010","3011","3012","3013","3020","3021","3022","3023","3030","3031","3032","3033","3100","3101","3102","3103","3110","3111","3112","3113","3120","3121","3122","3123","3130","3131","3132","3133","3200","3201","3202","3203","3210","3211","3212","3213","3220","3221","3222","3223","3230","3231","3232","3233","3300","3301","3302","3303","3310","3311","3312","3313","3320","3321","3322","3323","3330","3331","3332","3333"];
        c1 = parseInt(arrValores[0]);
		c2 = parseInt(arrValores[2]);
		c3 = parseInt(arrValores[4]);
		c4 = parseInt(arrValores[6]);

		t1 = c1 + parseInt(arrValores[1]);
		t2 = c2 + parseInt(arrValores[3]);
		t3 = c3 + parseInt(arrValores[5]);
		t4 = c4 + parseInt(arrValores[7]);
		var a1 = new Array();
		for(var i = 0; i < guesses.length; i++)
		{
			var w = 0;
			var x = 0;
			var y = 0;
			var z = 0;
			for(var j = 0; j <=3; j++)
			{
				if(guesses[i].charAt(j) == 0)
					w++;
				else if(guesses[i].charAt(j) == 1)
					x++;
				else if(guesses[i].charAt(j) == 2)
					y++;
				else if(guesses[i].charAt(j) == 3)
					z++;
			}
			if(t1 == 0)
			{
				 if((w+x)==0){
					 
					a1.push(guesses[i]);
				}
			}
			else if(t1 == 1)
			{
				if((w+x)==1){
					
					a1.push(guesses[i]);
				}
			}
			else if(t1 == 2)
			{
				if((w+x)==2 || (w >= 2 && x == 0) || (x >= 2 && w == 0)){
					
					a1.push(guesses[i]);
				}
			}
			else if(t1 == 3)
			{
				if((w >= 2 && x == 1) || (x >= 2 && w == 1)){
					
					a1.push(guesses[i]);
				}
			}
			else if(t1 == 4)
			{
				if(w == 2 && x == 2){
					
					a1.push(guesses[i]);
				}
			}
		}
		a2 = new Array();
		for(var num = 0; num < a1.length; num++)
		{
			var w = 0;
			var x = 0;
			var y = 0;
			var z = 0;
			for(var temp = 0; temp < 4; temp++)
			{
				if(a1[num].charAt(temp) == 0)
					w++;
				if(a1[num].charAt(temp) == 1)
					x++;
				if(a1[num].charAt(temp) == 2)
					y++;
				if(a1[num].charAt(temp) == 3)
					z++;
			}
			if(t2 == 0)
			{
				if((w+y)==0){
					
					a2.push(a1[num]);
				}
			}
			if(t2 == 1)
			{
				if((w+y)==1){
					
					a2.push(a1[num]);
				}
			}
			else if(t2 == 2)
			{
					if((w+y)==2 || (w >= 2 && y == 0) || (y >= 2 && w == 0)){
						
						a2.push(a1[num]);
					}
			}
			else if(t2 == 3)
			{
				if((w >= 2 && y == 1) || (y >= 2 && w == 1)){
					
					a2.push(a1[num]);
				}
				
			}
			else if(t2 == 4)
			{
				if(w == 2 && y == 2){
					
					a2.push(a1[num]);
				}
			}
		}
		a3 = new Array();
		for(var num = 0; num < a2.length; num++)
		{
			var w = 0;
			var x = 0;
			var y = 0;
			var z = 0;
			for(var temp = 0; temp < 4; temp++)
			{
				if(a2[num].charAt(temp) == 0)
					w++;
				else if(a2[num].charAt(temp) == 1)
					x++;
				else if(a2[num].charAt(temp) == 2)
					y++;
				else if(a2[num].charAt(temp) == 3)
					z++;
			}
			//if(a2[num] == "0212")
			//	alert("CULPRIT PASSING BY");

			if(t3 == 0 && ((z+x+w)==0)){
				
				a3.push(a2[num]);
			}
			else if(t3 == 1 && ((z==1 && x ==0 && w==0) || (z==0 && x >0 && w==0) || (z==0 && x ==0 && w>0))){
				
				a3.push(a2[num]);
			}
			else if(t3 == 2 && ((z==1 && x>=1 && w==0) || (z==1 && x==0 && w>=1) || ((w >= 1 && x >= 1) && z== 0) || (z>=2 && w==0 && x==0))){
				
				a3.push(a2[num]);
			}
			else if(t3 == 3 && ((z >= 2 && x>=1) || (x >= 1 && z == 1 && w >=1) || (z >= 2 && w>=1))){
				
				a3.push(a2[num]);
			}
			else if(t3 == 4 && (x == 1 && z == 2 && w==1)){
				
				a3.push(a2[num]);
			}
		}
		
		a4 = new Array();
		for(var num = 0; num < a3.length; num++)
		{
			var w = 0;
			var x = 0;
			var y = 0;
			var z = 0;
			for(var temp = 0; temp < 4; temp++)
			{
				if(a3[num].charAt(temp) == 0)
					w++;
				if(a3[num].charAt(temp) == 1)
					x++;
				if(a3[num].charAt(temp) == 2)
					y++;
				if(a3[num].charAt(temp) == 3)
					z++;
			}
			if(t4 == 0 && ((y+x+z)==0)){
				
				a4.push(a3[num]);
			}
			else if(t4 == 1 && ((y==1 && x ==0 && z==0) || (y==0 && x >0 && z==0) || (y==0 && x ==0 && z>0))){
				
				a4.push(a3[num]);
			}
			else if(t4 == 2 && ((y==1 && x>=1 && z==0) || (y==1 && x==0 && z>=1) || ((z >= 1 && x >= 1) && y== 0) || (y>=2 && z==0 && x==0))){
				
				a4.push(a3[num]);
			}
			else if(t4 == 3 && ((y >= 2 && x>=1) || (x >= 1 && y == 1 && z >=1) || (y >= 2 && z>=1))){
				
				a4.push(a3[num]);
			}
			else if(t4 == 4 && (x == 1 && y == 2 && z==1)){
				
				a4.push(a3[num]);
			}
		}		
		
		a5 = new Array();
		for(var rar = 0; rar < a4.length; rar++)
		{
			var wow = 0;
			if(a4[rar].charAt(0) == 0)
				wow++;
			if(a4[rar].charAt(1) == 1)
				 wow++;
			if(a4[rar].charAt(2) == 1)
				wow++;
			if(a4[rar].charAt(3) == 0)
				wow++;
			if(wow==c1){
				
				a5.push(a4[rar]);
			}
		}
		a6 = new Array();
		for(var rar = 0; rar < a5.length; rar++)
		{
			var wow = 0;
			if(a5[rar].charAt(0) == 2)
				wow++;
			if(a5[rar].charAt(1) == 2)
				wow++;
			if(a5[rar].charAt(2) == 0)
				wow++;
			if(a5[rar].charAt(3) == 0)
				wow++;
			if(wow==c2){
				
				a6.push(a5[rar]);
			}
		}
		a7 = new Array();
		for(var rar = 0; rar < a6.length; rar++)
		{
			var wow = 0;
			if(a6[rar].charAt(0) == 3)
				wow++;
			if(a6[rar].charAt(1) == 3)
				wow++;
			if(a6[rar].charAt(2) == 1)
				wow++;
			if(a6[rar].charAt(3) == 0)
				wow++;
			if(wow==c3){
				
				a7.push(a6[rar]);
			}
		}
		a8 = new Array();
		for(var rar = 0; rar < a7.length; rar++)
		{
			var wow = 0;
			if(a7[rar].charAt(0) == 1)
				wow++;
			if(a7[rar].charAt(1) == 2)
				wow++;
			if(a7[rar].charAt(2) == 2)
				wow++;
			if(a7[rar].charAt(3) == 3)
				wow++;
			if(wow==c4){
				
				a8.push(a7[rar]);
			}
		}
		if(a8.length==1)
		{
			var comandos = "";
			for(var i = 0; i < 4; i++)
			{
				if(a8[0].charAt(i) == 0)
					comandos += 'updatePuzzle("r","' + i + '"); ';
				else if(a8[0].charAt(i) == 1)
					comandos += 'updatePuzzle("g","' + i + '"); ';
				else if(a8[0].charAt(i) == 2)
					comandos += 'updatePuzzle("b","' + i + '"); ';
				else if(a8[0].charAt(i) == 3)
					comandos += 'updatePuzzle("y","' + i + '"); ';
			}
			eval('location.href = "javascript:(" + encodeURI( function() {' + comandos + '$("div#actionbuttonimg1").click();}) + ")()";');
		}
		else if(a8.length==0)
			alert("Invalid Entry.  Please double check your inputs.");
		else
		{
			alert("You found a bug in the solver.  Multiple answers dected, displaying all of them.");
			alert(uneval(a8));
		}
}


function encontrarGreenButtons(numeros) {
		x = numeros;
		s = "";
		if(x==1121122)
			s = "5678";
		else if(x==10112121)
			s = "2678";
		else if(x==10211121)
			s = "0678";
		else if(x==10212131)
			s = "4678";
		else if(x==11022112)
			s = "2578";
		else if(x==11112021)
			s = "2568";
		else if(x==11121112)
			s = "05782567";
		else if(x==11122122)
			s = "4578";
		else if(x==11211021)
			s = "0568";
		else if(x==11212031)
			s = "4568";
		else if(x==11220112)
			s = "0567";
		else if(x==11221122)
			s = "4567";
		else if(x==20112111)
			s = "0278";
		else if(x==20113121)
			s = "2478";
		else if(x==20202020)
			s = "0268";
		else if(x==20203030)
			s = "2468";
		else if(x==20211111)
			s = "0267";
		else if(x==20212121)
			s = "04782467";
		else if(x==20302030)
			s = "0468";
		else if(x==20311121)
			s = "0467";
		else if(x==21112011)
			s = "0258";
		else if(x==21113021)
			s = "2458";
		else if(x==21121102)
			s = "0257";
		else if(x==21122112)
			s = "2457";
		else if(x==21211011)
			s = "0256";
		else if(x==21212021)
			s = "04582456";
		else if(x==21221112)
			s = "0457";
		else if(x==21311021)
			s = "0456";
		else if(x==30203020)
			s = "0248";
		else if(x==30212111)
			s = "0247";
		else if(x==30302020)
			s = "0246";
		else if(x==31212011)
			s = "0245";
		else if(x==100121221)
			s = "3678";
		else if(x==101031212)
			s = "3578";
		else if(x==101121121)
			s = "16783568";
		else if(x==101130212)
			s = "3567";
		else if(x==102031112)
			s = "1578";
		else if(x==102121021)
			s = "1568";
		else if(x==102130112)
			s = "1567";
		else if(x==110022211)
			s = "2378";
		else if(x==110112120)
			s = "2368";
		else if(x==110121211)
			s = "03782367";
		else if(x==110122221)
			s = "3478";
		else if(x==110211120)
			s = "0368";
		else if(x==110212130)
			s = "3468";
		else if(x==110220211)
			s = "0367";
		else if(x==110221221)
			s = "3467";
		else if(x==111022111)
			s = "12782358";
		else if(x==111031202)
			s = "2357";
		else if(x==111112020)
			s = "1268";
		else if(x==111121111)
			s = "0178035812672356";
		else if(x==111122121)
			s = "14783458";
		else if(x==111130202)
			s = "0357";
		else if(x==111131212)
			s = "3457";
		else if(x==111211020)
			s = "0168";
		else if(x==111212030)
			s = "1468";
		else if(x==111220111)
			s = "01670356";
		else if(x==111221121)
			s = "14673456";
		else if(x==112022011)
			s = "1258";
		else if(x==112031102)
			s = "1257";
		else if(x==112121011)
			s = "01581256";
		else if(x==112122021)
			s = "1458";
		else if(x==112130102)
			s = "0157";
		else if(x==112131112)
			s = "1457";
		else if(x==112220011)
			s = "0156";
		else if(x==112221021)
			s = "1456";
		else if(x==120112110)
			s = "0238";
		else if(x==120113120)
			s = "2348";
		else if(x==120121201)
			s = "0237";
		else if(x==120122211)
			s = "2347";
		else if(x==120211110)
			s = "0236";
		else if(x==120212120)
			s = "03482346";
		else if(x==120221211)
			s = "0347";
		else if(x==120311120)
			s = "0346";
		else if(x==121112010)
			s = "0128";
		else if(x==121113020)
			s = "1248";
		else if(x==121121101)
			s = "01270235";
		else if(x==121122111)
			s = "12472345";
		else if(x==121211010)
			s = "01260148";
		else if(x==121212020)
			s = "01481246";
		else if(x==121221111)
			s = "01470345";
		else if(x==121311020)
			s = "0146";
		else if(x==122121001)
			s = "0125";
		else if(x==122122011)
			s = "1245";
		else if(x==122221011)
			s = "0145";
		else if(x==130212110)
			s = "0234";
		else if(x==131212010)
			s = "0124";
		else if(x==201031211)
			s = "1378";
		else if(x==201121120)
			s = "1368";
		else if(x==201130211)
			s = "1367";
		else if(x==202031111)
			s = "1358";
		else if(x==202040202)
			s = "1357";
		else if(x==202130111)
			s = "1356";
		else if(x==211022110)
			s = "1238";
		else if(x==211031201)
			s = "1237";
		else if(x==211121110)
			s = "01381236";
		else if(x==211122120)
			s = "1348";
		else if(x==211130201)
			s = "0137";
		else if(x==211131211)
			s = "1347";
		else if(x==211220110)
			s = "0136";
		else if(x==211221120)
			s = "1346";
		else if(x==212031101)
			s = "1235";
		else if(x==212130101)
			s = "0135";
		else if(x==212131111)
			s = "1345";
		else if(x==221121100)
			s = "0123";
		else if(x==221122110)
			s = "1234";
		else if(x==221221110)
			s = "0134";
		return s;
}


// Add jQuery
    if(typeof unsafeWindow.jQuery == 'undefined') {
        var GM_JQ = document.createElement('script');
        GM_JQ.src = '//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(GM_JQ);
    }

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
		// AutoPlay on/off
        $(document.body).append($("<input />").attr('type','button').attr('value','FAST on').css("position", "absolute").css("left", "50px").css("zIndex", "99").click(function() {
            ativo = !ativo;
            if (ativo)
            {
                $(this).val("FAST on");
                $(this).blur();
                idIntervals = setInterval(verificaExploracao, 500);
            } else {
                if (idTimeouts)
                {
                    clearTimeout(idTimeouts);
                }
                if (idIntervals)
                {
                    clearInterval(idIntervals);
                }
                $(this).val("FAST off");
                $(this).blur();
            }
        }));
		
		// Event Coin Multiplier times 1/1.5
		$(document.body).append($("<input />").attr('type','button').attr('value','regular').css("position", "absolute").css("left", "205px").css("zIndex", "99").click(function() {
            if (coinMulti==1)
            {
                coinMulti=eventMulti;
                $(this).val("Event");
                $(this).blur();
            } else if(coinMulti==eventMulti){
                coinMulti=1;
                $(this).val("Regular");
                $(this).blur();
            }
        }));
		// AutoFight Boss/Do nothing
        $(document.body).append($("<input />").attr('type','button').attr('value',boss_choice[boss]).css("position", "absolute").css("left", "270px").css("zIndex", "99").click(function() {
            if (boss==1)
            {
                boss=0;
                $(this).val(boss_choice[boss]);
                $(this).blur();
            } else {
                boss=1;
                $(this).val(boss_choice[boss]);
                $(this).blur();
            }
        }));
      
        	// Elf fight/buy
        $(document.body).append($("<input />").attr('type','button').attr('value',elf_choice[elf]).css("position", "absolute").css("left", "370px").css("zIndex", "99").click(function() {
            if (elf==1)
            {
                elf=0;
                $(this).val(elf_choice[elf]);
                $(this).blur();
            } else {
                elf=1;
                $(this).val(elf_choice[elf]);
                $(this).blur();
            }
        }));
		
		// Well Skip/Throw
        $(document.body).append($("<input />").attr('type','button').attr('value',well_choice[well]).css("position", "absolute").css("left", "440px").css("zIndex", "99").click(function() {
            if (well==1)
            {
                well=0;
                $(this).val(well_choice[well]);
                $(this).blur();
            } else {
                well=1;
                $(this).val(well_choice[well]);
                $(this).blur();
            }
        }));
//		$(document.body).append($("<input />")
    }

    function verificaExploracao() {
        if (!ativo || document.getElementById("transdiv"))
        {
            return;
        }
		// 'take all' button in bank screen
		if ($("span.subtabon").html() && $("span.subtabon").html() == "Bank")
        {
			$("#widthdrawamount").val(parseInt($("span.statsvcred:not(#curcoins)").html().replace(/[,\.]/g,"")));
		}
        
 		if ($("td.areasign").html() && $("td.areasign").html().trim() == "Demon Captain"     ||
		    $("td.areasign").html() && $("td.areasign").html().trim() == "The Lake Demon"    ||
			$("td.areasign").html() && $("td.areasign").html().trim() == "Demon Leader"	     ||
			$("td.areasign").html() && $("td.areasign").html().trim() == "The Rat Demon"	 ||
			$("td.areasign").html() && $("td.areasign").html().trim() == "Demon Whale"		 ||
			$("td.areasign").html() && $("td.areasign").html().trim() == "Demon Senator")
			
		{
                if(boss==0){
                	location.href = "javascript:(" + encodeURI( function() {
                   	 $("div.btn100").each(function(indice) {
                   	     if ($(this).html() == "Attack")
                     	   {
                     	       
                      	      $(this).click();
                       	     return false;
                      	  }
						else if ($(this).html() == "Explore")
                     	   {
                     	       
                      	      $(this).click();
                       	     return false;
                      	  } 
						  
                 	   });
           	  }) + ")()";
           	}else if(boss==1){
           		// DO NOTHING
           	}
        }                                                                                                                   

				//Normal Fights
          if ($("td.areasign").html() && $("td.areasign").html().trim() == "Encounter")
		  {
									
									                                                // Monster Master List

if ($("span.mobname").html() && $("span.mobname").html() == "frog" 						||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED frog" 				||
 $("span.mobname2").html() && $("span.mobname2").html() == "frog" 						||
 $("span.mobname3").html() && $("span.mobname3").html() == "frog"						||
 $("span.mobname").html() && $("span.mobname").html() == "giant mosquito" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED giant mosquito" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "giant mosquito" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "giant mosquito"				||
 $("span.mobname").html() && $("span.mobname").html() == "large worm" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED large worm" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "large worm" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "large worm"					||
 $("span.mobname").html() && $("span.mobname").html() == "flesh lotus" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED flesh lotus" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "flesh lotus" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "flesh lotus"				||
 $("span.mobname").html() && $("span.mobname").html() == "wild duck" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED wild duck" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "wild duck" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "wild duck"					||
 $("span.mobname").html() && $("span.mobname").html() == "giant leech" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED giant leech" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "giant leech" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "giant leech"				||
 $("span.mobname").html() && $("span.mobname").html() == "swan" 						||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED swan" 				||
 $("span.mobname2").html() && $("span.mobname2").html() == "swan" 						||
 $("span.mobname3").html() && $("span.mobname3").html() == "swan"						||
 $("span.mobname").html() && $("span.mobname").html() == "pelican" 						||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED pelican" 				||
 $("span.mobname2").html() && $("span.mobname2").html() == "pelican" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "pelican"					||
 $("span.mobname").html() && $("span.mobname").html() == "small snake" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED small snake" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "small snake" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "small snake"				||
 $("span.mobname").html() && $("span.mobname").html() == "water snake" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED water snake" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "water snake" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "water snake"				||
 $("span.mobname").html() && $("span.mobname").html() == "scavenger" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED scavenger" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "scavenger" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "scavenger"					||
 $("span.mobname").html() && $("span.mobname").html() == "small crab" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED small crab" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "small crab" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "small crab"					||
 $("span.mobname").html() && $("span.mobname").html() == "large frog" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED large frog" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "large frog" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "large frog"					||
 $("span.mobname").html() && $("span.mobname").html() == "giant beetle" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED giant beetle" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "giant beetle" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "giant beetle"				||
 $("span.mobname").html() && $("span.mobname").html() == "leech" 						||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED leech" 				||
 $("span.mobname2").html() && $("span.mobname2").html() == "leech" 						||
 $("span.mobname3").html() && $("span.mobname3").html() == "leech"						||
 $("span.mobname").html() && $("span.mobname").html() == "large toad" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED large toad" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "large toad" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "large toad"					||
 $("span.mobname").html() && $("span.mobname").html() == "giant bat" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED giant bat" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "giant bat" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "giant bat"					||
 $("span.mobname").html() && $("span.mobname").html() == "large sewer rat"				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED large sewer rat"		||
 $("span.mobname2").html() && $("span.mobname2").html() == "large sewer rat" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "large sewer rat"			||
 $("span.mobname").html() && $("span.mobname").html() == "life moss"					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED life moss"			||
 $("span.mobname2").html() && $("span.mobname2").html() == "life moss" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "life moss"					||
 $("span.mobname").html() && $("span.mobname").html() == "huge cockroach"				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED huge cockroach"		||
 $("span.mobname2").html() && $("span.mobname2").html() == "huge cockroach" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "huge cockroach"				||
 $("span.mobname").html() && $("span.mobname").html() == "sewer crawler" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED sewer crawler" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "sewer crawler" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "sewer crawler"				||
 $("span.mobname").html() && $("span.mobname").html() == "giant crawler" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED giant crawler" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "giant crawler" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "giant cawler"				||
 $("span.mobname").html() && $("span.mobname").html() == "giant sewer rat" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED giant sewer rat" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "giant sewer rat" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "giant sewer rat"			||
 $("span.mobname").html() && $("span.mobname").html() == "large red bat" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED large red bat" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "large red bat" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "large red bat"				||
 $("span.mobname").html() && $("span.mobname").html() == "huge sewer rat" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED huge sewer rat" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "huge sewer rat" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "huge sewer rat"				||
 $("span.mobname").html() && $("span.mobname").html() == "huge spider" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED huge spider" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "huge spider" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "huge spider"				||
 $("span.mobname").html() && $("span.mobname").html() == "zombie rat" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED zombie rat" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "zombie rat" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "zombie rat"					||
 $("span.mobname").html() && $("span.mobname").html() == "sewage dweller" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED sewage dweller" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "sewage dweller" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "sewage dweller"				||
 $("span.mobname").html() && $("span.mobname").html() == "vampire bat" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED vampire bat" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "vampire bat" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "vampire bat"				||
 $("span.mobname").html() && $("span.mobname").html() == "rotten corpse" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED rotten corpse" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "rotten corpse" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "rotten corpse"				||
 $("span.mobname").html() && $("span.mobname").html() == "sewer rat" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED sewer rat" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "sewer rat" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "sewer rat"					||
 $("span.mobname").html() && $("span.mobname").html() == "giant spider" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED giant spider" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "giant spider" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "giant spider"				||
 $("span.mobname").html() && $("span.mobname").html() == "moving ooze"   				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED moving ooze" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "moving ooze" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "moving ooze" 				||
 $("span.mobname").html() && $("span.mobname").html() == "sand giant"					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED sand giant"			||
 $("span.mobname2").html() && $("span.mobname2").html() == "sand giant" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "sand giant" 				||
 $("span.mobname").html() && $("span.mobname").html() == "giant sandworm"				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED giant sandworm"		||
 $("span.mobname2").html() && $("span.mobname2").html() == "giant sandworm" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "giant sandworm" 			||
 $("span.mobname").html() && $("span.mobname").html() == "giant cactus"					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED giant cactus"			||
 $("span.mobname2").html() && $("span.mobname2").html() == "giant cactus" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "giant cactus" 				||
 $("span.mobname").html() && $("span.mobname").html() == "large rattlesnake"			||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED large rattlesnake"	||
 $("span.mobname2").html() && $("span.mobname2").html() == "large rattlesnake" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "large rattlesnake" 			||		
 $("span.mobname").html() && $("span.mobname").html() == "sand ghoul"					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED sand ghoul"			||
 $("span.mobname2").html() && $("span.mobname2").html() == "sand ghoul" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "sand ghoul" 				||
 $("span.mobname").html() && $("span.mobname").html() == "cave troll" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED cave troll" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "cave troll" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "cave troll" 				||
 $("span.mobname").html() && $("span.mobname").html() == "small wyrm" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED small wyrm" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "small wyrm" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "small wyrm" 				||
 $("span.mobname").html() && $("span.mobname").html() == "fire giant" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED fire giant" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "fire giant" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "fire giant"					||
 $("span.mobname").html() && $("span.mobname").html() == "blue dragon" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED blue dragon" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "blue dragon" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "blue dragon"				||
 $("span.mobname").html() && $("span.mobname").html() == "fire elemental" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED fire elemental" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "fire elemental" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "fire elemental"				||
 $("span.mobname").html() && $("span.mobname").html() == "green dragon" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED green dragon" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "green dragon" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "green dragon"				||
 $("span.mobname").html() && $("span.mobname").html() == "greater fire golem" 			||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED greater fire golem" 	||
 $("span.mobname2").html() && $("span.mobname2").html() == "greater fire golem" 		||
 $("span.mobname3").html() && $("span.mobname3").html() == "greater fire golem"			|| 
 $("span.mobname").html() && $("span.mobname").html() == "succubus" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED succubus" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "succubus" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "succubus"					||
 $("span.mobname").html() && $("span.mobname").html() == "great wrym" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED great wrym" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "great wrym" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "great wrym"					||
 $("span.mobname").html() && $("span.mobname").html() == "golden dragon" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED golden dragon" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "golden dragon" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "golden dragon" 				||
 $("span.mobname").html() && $("span.mobname").html() == "lava serpent" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED lava serpent" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "lava serpent" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "lava serpent" 				||
 $("span.mobname").html() && $("span.mobname").html() == "red dragon" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED red dragon" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "red dragon" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "red dragon"					||
 $("span.mobname").html() && $("span.mobname").html() == "Elite Alien Fighter" 			||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED Elite Alien Fighter"  ||
 $("span.mobname2").html() && $("span.mobname2").html() == "Elite Alien Fighter" 		||
 $("span.mobname3").html() && $("span.mobname3").html() == "Elite Alien Fighter" 		||
 $("span.mobname").html() && $("span.mobname").html() == "Elite Alien Scientist" 		||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED Elite Alien Scientist"||
 $("span.mobname2").html() && $("span.mobname2").html() == "Elite Alien Scientist" 		||
 $("span.mobname3").html() && $("span.mobname3").html() == "Elite Alien Scientist"		||
 $("span.mobname").html() && $("span.mobname").html() == "Elite Alien Assassin" 		||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED Elite Alien Assassin" ||
 $("span.mobname2").html() && $("span.mobname2").html() == "Elite Alien Assassin" 		||
 $("span.mobname3").html() && $("span.mobname3").html() == "Elite Alien Assassin"		||
 $("span.mobname").html() && $("span.mobname").html() == "Elite Alien Witch" 			||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED Elite Alien Witch" 	||
 $("span.mobname2").html() && $("span.mobname2").html() == "Elite Alien Witch" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "Elite Alien Witch"			||
 $("span.mobname").html() && $("span.mobname").html() == "Elite Alien Timelord" 		||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED Elite Alien Timelord" ||
 $("span.mobname2").html() && $("span.mobname2").html() == "Elite Alien Timelord" 		||
 $("span.mobname3").html() && $("span.mobname3").html() == "Elite Alien Timelord" 		||
 $("span.mobname").html() && $("span.mobname").html() == "giant crab" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED giant crab" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "giant crab" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "giant crab"					|| 
 $("span.mobname").html() && $("span.mobname").html() == "sand man" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED sand man" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "sand man" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "sand man" 					||
 $("span.mobname").html() && $("span.mobname").html() == "killer whale" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED killer whale" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "killer whale" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "killer whale"				||
 $("span.mobname").html() && $("span.mobname").html() == "jellyfish" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED jellyfish" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "jellyfish" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "jellyfish"					||
 $("span.mobname").html() && $("span.mobname").html() == "minor water golem" 			||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED minor water golem" 	||
 $("span.mobname2").html() && $("span.mobname2").html() == "minor water golem" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "minor water golem"			||
 $("span.mobname").html() && $("span.mobname").html() == "young orca" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED young orca" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "young orca" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "young orca" 				||
 $("span.mobname").html() && $("span.mobname").html() == "tiger shark" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED tiger shark" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "tiger shark" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "tiger shark"				||
 $("span.mobname").html() && $("span.mobname").html() == "water spirit" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED water spirit" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "water spirit" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "water spirit" 				||
 $("span.mobname").html() && $("span.mobname").html() == "sword fish" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED sword fish" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "sword fish" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "sword fish"					||
 $("span.mobname").html() && $("span.mobname").html() == "undead sailor" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED undead sailor" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "undead sailor" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "undead sailor" 				||
 $("span.mobname").html() && $("span.mobname").html() == "sand spirit" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED sand spirit" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "sand spirit" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "sand spirit"				||
 $("span.mobname").html() && $("span.mobname").html() == "minor sand golem" 			||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED minor sand golem" 	||
 $("span.mobname2").html() && $("span.mobname2").html() == "minor sand golem" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "minor sand golem"			|| 
 $("span.mobname").html() && $("span.mobname").html() == "electrofish" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED electrofish" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "electrofish" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "electrofish"				||
 $("span.mobname").html() && $("span.mobname").html() == "undead captain" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED undead captain" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "undead captain" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "undead captain"				||
 $("span.mobname").html() && $("span.mobname").html() == "hammerhead" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED hammerhead" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "hammerhead" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "hammerhead"					||
 $("span.mobname").html() && $("span.mobname").html() == "thief initiate" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED thief initiate" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "thief initiate" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "thief initaite"				||
 $("span.mobname").html() && $("span.mobname").html() == "trained wolf" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED trained wolf" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "trained wolf" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "trained wolf"				||
 $("span.mobname").html() && $("span.mobname").html() == "thief knifer" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED thief knifer" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "thief knifer" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "thief knifer"				||
 $("span.mobname").html() && $("span.mobname").html() == "zombie dog" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED zombie dog" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "zombie dog" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "zombie dog"					||
 $("span.mobname").html() && $("span.mobname").html() == "large viper" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED large viper" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "large viper" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "large viper" 				||
 $("span.mobname").html() && $("span.mobname").html() == "guard dog" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED guard dog" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "guard dog" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "guard dog"					||
 $("span.mobname").html() && $("span.mobname").html() == "thief fighter" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED thief fighter" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "thief fighter" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "thief fighter"				||
 $("span.mobname").html() && $("span.mobname").html() == "thief guard" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED thief guard" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "thief guard" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "thief guard"				||
 $("span.mobname").html() && $("span.mobname").html() == "thief shaman" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED thief shaman" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "thief shaman" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "thief shaman"				||
 $("span.mobname").html() && $("span.mobname").html() == "huge boar" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED huge boar" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "huge boar" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "huge boar"					||
 $("span.mobname").html() && $("span.mobname").html() == "huge bear" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED huge bear" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "huge bear" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "huge bear"					||
 $("span.mobname").html() && $("span.mobname").html() == "forest lion" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED forest lion" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "forest lion" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "forest lion"				||
 $("span.mobname").html() && $("span.mobname").html() == "tiger" 						||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED tiger" 				||
 $("span.mobname2").html() && $("span.mobname2").html() == "tiger" 						||
 $("span.mobname3").html() && $("span.mobname3").html() == "tiger"						||
 $("span.mobname").html() && $("span.mobname").html() == "zombie" 						||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED zombie" 				||
 $("span.mobname2").html() && $("span.mobname2").html() == "zombie" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "zombie"						||
 $("span.mobname").html() && $("span.mobname").html() == "ghoul" 						||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED ghoul" 				||
 $("span.mobname2").html() && $("span.mobname2").html() == "ghoul" 						||
 $("span.mobname3").html() && $("span.mobname3").html() == "ghoul" 						||
 $("span.mobname").html() && $("span.mobname").html() == "adult cougar" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED adult cougar" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "adult cougar" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "adult cougar" 				||
 $("span.mobname").html() && $("span.mobname").html() == "thief scout" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED thief scout" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "thief scout" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "thief scout" 				||
 $("span.mobname").html() && $("span.mobname").html() == "young cougar" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED young cougar" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "young cougar" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "young cougar" 				||
 $("span.mobname").html() && $("span.mobname").html() == "black bear" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED black bear" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "black bear" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "black bear" 				||
 $("span.mobname").html() && $("span.mobname").html() == "wild boar" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED wild boar" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "wild boar" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "wild boar" 					||
 $("span.mobname").html() && $("span.mobname").html() == "walking skeleton" 			||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED walking skeleton" 	||
 $("span.mobname2").html() && $("span.mobname2").html() == "walking skeleton" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "walking skeleton" 			||
 $("span.mobname").html() && $("span.mobname").html() == "gorilla" 						||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED gorilla" 				||
 $("span.mobname2").html() && $("span.mobname2").html() == "gorilla" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "gorilla" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ghost" 						||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED ghost" 				||
 $("span.mobname2").html() && $("span.mobname2").html() == "ghost" 						||
 $("span.mobname3").html() && $("span.mobname3").html() == "ghost" 						||
 $("span.mobname").html() && $("span.mobname").html() == "small boar" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED small boar" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "small boar" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "small boar" 				||
 $("span.mobname").html() && $("span.mobname").html() == "monkey" 						||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED monkey" 				||
 $("span.mobname2").html() && $("span.mobname2").html() == "monkey" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "monkey" 					||
 $("span.mobname").html() && $("span.mobname").html() == "thief lieutenant" 			||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED thief lieutenant" 	||
 $("span.mobname2").html() && $("span.mobname2").html() == "thief lieutenant" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "thief lieutenant" 			||
 $("span.mobname").html() && $("span.mobname").html() == "thief warrior" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED thief warrior" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "thief warrior" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "thief warrior" 				||
 $("span.mobname").html() && $("span.mobname").html() == "trained python" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED trained python" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "trained python" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "trained python" 			||
 $("span.mobname").html() && $("span.mobname").html() == "glowing ghoul" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED glowing ghoul" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "glowing ghoul" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "glowing ghoul" 				||
 $("span.mobname").html() && $("span.mobname").html() == "thief specialist" 			||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED thief specialist" 	||
 $("span.mobname2").html() && $("span.mobname2").html() == "thief specialist" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "thief specialist" 			||
 $("span.mobname").html() && $("span.mobname").html() == "thief mage" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED thief mage" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "thief mage" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "thief mage" 				||
 $("span.mobname").html() && $("span.mobname").html() == "citron" 						||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED citron" 				||
 $("span.mobname2").html() && $("span.mobname2").html() == "citron" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "citron" 					||
 $("span.mobname").html() && $("span.mobname").html() == "guard bot" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED guard bot" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "guard bot" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "guard bot" 					||
 $("span.mobname").html() && $("span.mobname").html() == "motoroid" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED motoroid" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "motoroid" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "motoroid" 					||
 $("span.mobname").html() && $("span.mobname").html() == "voitron" 						||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED voitron" 				||
 $("span.mobname2").html() && $("span.mobname2").html() == "voitron" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "voitron" 					||
 $("span.mobname").html() && $("span.mobname").html() == "brain bot" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED brain bot" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "brain bot" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "brain bot" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ghostoid" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED ghostoid" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "ghostoid" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "ghostoid" 					||
 $("span.mobname").html() && $("span.mobname").html() == "astro bot" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED astro bot" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "astro bot" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "astro bot" 					||
 $("span.mobname").html() && $("span.mobname").html() == "megatron" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED megatron" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "megatron" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "megatron" 					||
 $("span.mobname").html() && $("span.mobname").html() == "sentroid" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED sentroid" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "sentroid" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "sentroid" 					||
 $("span.mobname").html() && $("span.mobname").html() == "android" 						||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED android" 				||
 $("span.mobname2").html() && $("span.mobname2").html() == "android" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "android" 					||
 $("span.mobname").html() && $("span.mobname").html() == "rocket bot" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED rocket bot" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "rocket bot" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "rocket bot" 				||
 $("span.mobname").html() && $("span.mobname").html() == "R3D4-MK3" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED R3D4-MK3" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "R3D4-MK3" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "R3D4-MK3" 					||
 $("span.mobname").html() && $("span.mobname").html() == "aeroid" 						||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED aeroid" 				||
 $("span.mobname2").html() && $("span.mobname2").html() == "aeroid" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "aeroid" 					||
 $("span.mobname").html() && $("span.mobname").html() == "scorptron" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED scorptron" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "scorptron" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "scorptron" 					||
 $("span.mobname").html() && $("span.mobname").html() == "scorptron-s3" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED scorptron-s3" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "scorptron-s3" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "scorptron-s3" 				||
 $("span.mobname").html() && $("span.mobname").html() == "android-m2" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED android-m2" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "android-m2" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "android-m2" 				||
 $("span.mobname").html() && $("span.mobname").html() == "rebel guard" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED rebel guard" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "rebel guard" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "rebel guard" 				||
 $("span.mobname").html() && $("span.mobname").html() == "rebel fighter" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED rebel fighter" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "rebel fighter" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "rebel fighter" 				||
 $("span.mobname").html() && $("span.mobname").html() == "aeroid-v3" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED aeroid-v3" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "aeroid-v3" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "aeroid-v3" 					||
 $("span.mobname").html() && $("span.mobname").html() == "elite scout" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED elite scout" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "elite scout" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "elite scout" 				||
 $("span.mobname").html() && $("span.mobname").html() == "android-m3" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED android-m3" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "android-m3" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "android-m3" 				||
 $("span.mobname").html() && $("span.mobname").html() == "brain lord" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED brain lord" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "brain lord" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "brain lord" 				||
 $("span.mobname").html() && $("span.mobname").html() == "rebel knight" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED rebel knight" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "rebel knight" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "rebel knight" 				||
 $("span.mobname").html() && $("span.mobname").html() == "rebel captain" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED rebel captain" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "rebel captain" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "rebel captain" 				||
 $("span.mobname").html() && $("span.mobname").html() == "rebel consort" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED rebel consort" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "rebel consort" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "rebel consort" 				||
 $("span.mobname").html() && $("span.mobname").html() == "scorptron-s4" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED scorptron-s4" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "scorptron-s4" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "scorptron-s4" 				||
 $("span.mobname").html() && $("span.mobname").html() == "rebel mistress" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED rebel mistress" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "rebel mistress" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "rebel mistress" 			||
 $("span.mobname").html() && $("span.mobname").html() == "R3D4-MK4" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED R3D4-MK4" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "R3D4-MK4" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "R3D4-MK4" 					||
 $("span.mobname").html() && $("span.mobname").html() == "rebel advisor" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED rebel advisor" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "rebel advisor" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "rebel advisor" 				||
 $("span.mobname").html() && $("span.mobname").html() == "lava giant" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED lava giant" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "lava giant" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "lava giant" 				||
 $("span.mobname").html() && $("span.mobname").html() == "fire sorceress" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED fire sorceress" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "fire sorceress" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "fire sorceress" 			||
 $("span.mobname").html() && $("span.mobname").html() == "lava dragon" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED lava dragon" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "lava dragon" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "lava dragon" 				||
 $("span.mobname").html() && $("span.mobname").html() == "lava golem" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED lava golem" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "lava golem" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "lava golem" 				||
 $("span.mobname").html() && $("span.mobname").html() == "fire succubus" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED fire succubus" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "fire succubus" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "fire succubus" 				||
 $("span.mobname").html() && $("span.mobname").html() == "thunder giant" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED thunder giant" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "thunder giant" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "thunder giant" 				||
 $("span.mobname").html() && $("span.mobname").html() == "thunder sorceress" 			||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED thunder sorceress" 	||
 $("span.mobname2").html() && $("span.mobname2").html() == "thunder sorceress" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "thunder sorceress" 			||
 $("span.mobname").html() && $("span.mobname").html() == "thunder dragon" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED thunder dragon" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "thunder dragon" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "thunder dragon" 			||
 $("span.mobname").html() && $("span.mobname").html() == "thunder golem" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED thunder golem" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "thunder golem" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "thunder golem" 				||
 $("span.mobname").html() && $("span.mobname").html() == "thunder succubus" 			||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED thunder succubus" 	||
 $("span.mobname2").html() && $("span.mobname2").html() == "thunder succubus" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "thunder succubus" 			||
 $("span.mobname").html() && $("span.mobname").html() == "ice giant" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED ice giant" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "ice giant" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "ice giant" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ice sorceress" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED ice sorceress" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "ice sorceress" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "ice sorceress" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ice dragon" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED ice dragon" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "ice dragon" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "ice dragon" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ice golem" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED ice golem" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "ice golem" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "ice golem" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ice succubus" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED ice succubus" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "ice succubus" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "ice succubus" 				||
 $("span.mobname").html() && $("span.mobname").html() == "Gnome Beserker" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED Gnome Beserker" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "Gnome Beserker" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "Gnome Beserker" 			||
 $("span.mobname").html() && $("span.mobname").html() == "Gnome Warrior" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED Gnome Warrior" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "Gnome Warrior" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "Gnome Warrior" 				||
 $("span.mobname").html() && $("span.mobname").html() == "Gnome Gunner" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED Gnome Gunner" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "Gnome Gunner" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "Gnome Gunner" 				||
 $("span.mobname").html() && $("span.mobname").html() == "Gnome Mage" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED Gnome Mage" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "Gnome Mage" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "Gnome Mage"					||
 $("span.mobname").html() && $("span.mobname").html() == "elf assassin" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED elf assassin" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "elf assassin" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "elf assassin"				||
 $("span.mobname").html() && $("span.mobname").html() == "elf sorceress" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED elf sorceress" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "elf sorceress" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "elf sorecress"				||
 $("span.mobname").html() && $("span.mobname").html() == "fossil vulture" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED fossil vulture" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "fossil vulture" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "fossil vulture"				||
 $("span.mobname").html() && $("span.mobname").html() == "xypher spirit" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED xypher spirit" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "xypher spirit" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "xypher spirit"				||
 $("span.mobname").html() && $("span.mobname").html() == "elite sorceress" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED elite sorceress" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "elite sorceress" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "elite sorceress"			||
 $("span.mobname").html() && $("span.mobname").html() == "xypher dragon" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED xypher dragon" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "xypher dragon" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "xypher dragon"				||
 $("span.mobname").html() && $("span.mobname").html() == "elite assassin" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED elite assassin" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "elite assassin" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "elite assassin"				||
 $("span.mobname").html() && $("span.mobname").html() == "xypheroak" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED xypheroak" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "xypheroak" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "xypheroak"					||
 $("span.mobname").html() && $("span.mobname").html() == "ice elemental" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED ice elemental" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "ice elemental" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "ice elemental"				||
 $("span.mobname").html() && $("span.mobname").html() == "neoharpy" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED neoharpy" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "neoharpy" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "neoharpy"					||
 $("span.mobname").html() && $("span.mobname").html() == "necromancer" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED necromancer" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "necromancer" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "necromancer"				||
 $("span.mobname").html() && $("span.mobname").html() == "xyphercorn" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED xyphercorn"	 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "xyphercorn" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "xyphercorn"					||
 $("span.mobname").html() && $("span.mobname").html() == "centaurus" 					||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED centaurus" 			||
 $("span.mobname2").html() && $("span.mobname2").html() == "centaurus" 					||
 $("span.mobname3").html() && $("span.mobname3").html() == "centaurus"					||  
  $("span.mobname").html() && $("span.mobname").html() == "ancientoak"	 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED ancientoak"	 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "ancientoak"		 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "ancientoak"					||
 $("span.mobname").html() && $("span.mobname").html() == "elf archer"	 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED elf archer"	 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "elf archer"		 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "elf archer"					||
 $("span.mobname").html() && $("span.mobname").html() == "crystalcorn"	 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED crystalcorn"	 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "crystalcorn"	 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "crystalcorn"				||
 $("span.mobname").html() && $("span.mobname").html() == "wind elemental" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED wind elemental" 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "wind elemental" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == "wind elemental"				||  
 
 /*
 $("span.mobname").html() && $("span.mobname").html() == "" 				||
 $("span.mobname").html() && $("span.mobname").html() == "ENRAGED " 		||
 $("span.mobname2").html() && $("span.mobname2").html() == "" 			||
 $("span.mobname3").html() && $("span.mobname3").html() == ""			|| 
 */
 $("span.mobname2").html() && $("span.mobname2").html() == "The Gambler" 				||
 $("span.mobname2").html() && $("span.mobname2").html() == "Dust Merchant" 				||
 $("span.mobname2").html() && $("span.mobname2").html() == "Girl in Red" 				||
 $("span.mobname2").html() && $("span.mobname2").html() == "Dust Merchant" 				||
 $("span.mobname2").html() && $("span.mobname2").html() == "The Wiseman" 				||
 $("span.mobname3").html() && $("span.mobname3").html() == "Magic Elf" 					|| 
 $("span.mobname3").html() && $("span.mobname3").html() == "Guardian of Dreams")
 
 

		{
                location.href = "javascript:(" + encodeURI( function() {
                    $("div.btn100").each(function(indice) {
                        if ($(this).html() == "Attack")
                        {
                            
                            $(this).click();
                            return false;
                        }
					else if ($(this).html() == "Explore")
                        {
                            
                            $(this).click();
                            return false;
                        }	
                    });
             }) + ")()";
        }
		
}
		
        // Encounter handlers
        if ($("td.areasign").html() && $("td.areasign").html().trim() != "Encounter")
        {
			// A puzzle box (green buttons)
			if ($("span.mobname").html() && $("span.mobname").html() == "A Puzzle Box" && $("#actionresulttd").html() && $("#actionresulttd").html().indexOf("and can be opened when all 4 correct buttons are pressed") >= 0)
            {
                if ($("#exploreActionResult").length > 0 && $("#exploreActionResult").html() && $("#exploreActionResult").html().indexOf("You found the correct code sequence and opened the") >= 0)
                {
                    return;
                }
                clearInterval(idIntervals);
				location.href = "javascript:(" + encodeURI( function() {
                    $("div.btn100").each(function(indice) {
                        if ($(this).html().trim() == "Open")
                        {
							
                            $(this).click();
                            return false;
                        }
						else if ($(this).html().trim() == "Okay")
                        {
							
                            $(this).click();
                            return false;
                        }
                    });
                }) + ")()";
				idIntervals = setInterval(function() {
					if ($("#mobbox > div > table > tbody > tr:first > td").html() && $("#mobbox > div > table > tbody > tr:first > td").html().indexOf("Number indicators for each button indicate how many of button's adjacent buttons") >= 0)
					{
						var numeros = $("#mobbox > div > table > tbody > tr:last > td > table > tbody > tr > td").text();
						var botoescorretos = encontrarGreenButtons(numeros);
						var arrIndicesBotoes = new Array();
						while (botoescorretos != "")
						{
							arrIndicesBotoes.push(botoescorretos.substring(0,4));
							botoescorretos = botoescorretos.substring(4);
						}
						clearInterval(idIntervals);
						var indiceBotao = 0;
						var indiceArray = 0;
						var clicouIndice= -1;
                        var finalizou = false;
						idIntervals = setInterval(function() {
                            if ($("#exploreActionResult").length > 0 && $("#exploreActionResult").html() && $("#exploreActionResult").html().indexOf("You found the correct code sequence and opened the") >= 0)
                            {
                                clearInterval(idIntervals);
                                idIntervals = setInterval(verificaExploracao, 100);
                            }
                            else if (!finalizou && clicouIndice != indiceBotao)
							{
								eval('location.href = "javascript:(" + encodeURI( function() {updatePuzzle2("' + arrIndicesBotoes[indiceArray].charAt(indiceBotao) + '")}) + ")()";');
                                clicouIndice = indiceBotao;
							} else if (!finalizou) {
                                if ($("#bb" + arrIndicesBotoes[indiceArray].charAt(indiceBotao)).attr("src").indexOf("lg_button.gif") > 0 )
                                {
                                    indiceBotao++;
                                    if (indiceBotao == 4)
                                    {
                                        finalizou = true;
                                    }
                                } else if ($("#bb" + arrIndicesBotoes[indiceArray].charAt(indiceBotao)).attr("src").indexOf("lr_button.gif") > 0 )
                                {
                                    indiceArray++;
                                    indiceBotao = 0;
									clicouIndice = -1;
                                    if (indiceArray >= arrIndicesBotoes.length)
                                    {
                                        alert(indiceArray + "|" + arrIndicesBotoes.length)
                                        clearInterval(idIntervals);
                                    }
                                }
							}
						},100);
					}
                }, 100);

			}
			
			// Wishing Well and Beggar
            if ($("span.mobname").html() && ($("span.mobname").html() == "Wishing Well" || $("span.mobname").html() == "A Beggar") && $("#amount").length > 0 && $("#btHighValue").length == 0)
            {
                document.getElementById('amount').disabled=false;
                $("#amount").after(function() {
                    var strAux = '<br/><input type="button" id="btHighValue" value="High"/>';
                    strAux += '&nbsp;<input type="button" id="btLowValue" value="Low"/>';
                    if ($("span.mobname").html() == "Wishing Well"){
                    strAux += '&nbsp;<input type="button" id="bt1B" value="1B"/>';
                    }
                    strAux += '&nbsp;<a href="#" title="';
                    if ($("span.mobname").html() == "Wishing Well")
                    {
                        strAux += 'Clicking in \'High\', the Well will give you Energy/Money/Skill Points.\n Clicking in \'Low\' the Well will give you Energy/Money.\n Clicking in \'B1\' the Well will give +25% to rage.';
                    } else {
                        strAux += 'Clicking in \'High\', the Beggar will give you an Item.\n Clicking in \'Low\' the Beggar will give you Energy.';
                    }
                    strAux += '">?</a>';
                    return strAux;
                });
                window.preencheAmount = function(arrValores) {
                    if (parseInt($("#curlevel").html()) <= arrValores.length)
                    {
                        if (parseInt($("#curcoins").html().replace(/[,\.]/g,"")) >= Math.ceil(coinMulti*arrValores[parseInt($("#curlevel").html())-1]))
                        {
                            if(arrValores != arr1B) $("#amount").val(Math.ceil(coinMulti*arrValores[parseInt($("#curlevel").html())-1]));
                            	else $("#amount").val(Math.ceil(arrValores[parseInt($("#curlevel").html())-1]));
                            if ($("span.mobname").html() == "Wishing Well")
                            {
                                location.href = "javascript:(" + encodeURI( function() {
                                    loadDiv2('/dream/explore?action=well');
                                }) + ")()";
                            } else {
                                location.href = "javascript:(" + encodeURI( function() {
                                    loadDiv2('/dream/explore?action=beggar');
                                }) + ")()";
                            }
                        } else {
                            if(arrValores != arr1B) alert("You don't have enough coins for this action. You need at least " + Math.ceil(coinMulti*arrValores[parseInt($("#curlevel").html())-1]) + " coins.");
                            	else alert("You don't have enough coins for this action. You need at least " + Math.ceil(arrValores[parseInt($("#curlevel").html())-1]) + " coins.");
                        }
                    } else {
                        alert("Sorry, your level isn't registered in this script, please update it or contact the author if updating don't solve your problem.")
                    }
                };
                $("#btHighValue").click(function() {
                    preencheAmount(arrHighValues);
                });
                $("#btLowValue").click(function() {
                    preencheAmount(arrLowValues);
                });
                $("#bt1B").click(function() {
                    preencheAmount(arr1B);
                });

            }
			
			// A Puzzle Box (colors/mastermind)
			if ($("span.mobname").html() && $("span.mobname").html() == "A Puzzle Box" && $("#actionresulttd").html() && $("#actionresulttd").html().indexOf("is locked&nbsp;electronically, and opens when the correct sequence of colors") >= 0)
            {
                if ($("#exploreActionResult").html() && $("#exploreActionResult").html().indexOf("You found the correct code sequence and opened the") >= 0)
                {
                    return;
                }
                clearInterval(idIntervals);
				location.href = "javascript:(" + encodeURI( function() {
                    $("div.btn100").each(function(indice) {
                        if ($(this).text().trim() == "Open")
                        {
                            
                            $(this).click();
                            return false;
                        }
                    });
                }) + ")()";
				
				var numeroSequencia = 1;
				var arrValores = new Array();
				idIntervals = setInterval(function() {
					if ($("#mobbox > div > table > tbody > tr:first > td").html().indexOf("Number of columns with the correct color") >= 0)
					{
						if (numeroSequencia == 1)
						{
							location.href = "javascript:(" + encodeURI( function() {
								updatePuzzle('g','1');
								updatePuzzle('g','2');
								$("div#actionbuttonimg1").click();
							}) + ")()";
							numeroSequencia++;
						}
						if (numeroSequencia == 2 && $("div#resl > input").length == 2)
						{
							arrValores[0] = $("div#resl > input:eq(0)").val();
							arrValores[1] = $("div#resl > input:eq(1)").val();
							location.href = "javascript:(" + encodeURI( function() {
								updatePuzzle('b','0');
								updatePuzzle('b','1');
								updatePuzzle('r','2');
								$("div#actionbuttonimg1").click();
							}) + ")()";
							numeroSequencia++;
						}
						if (numeroSequencia == 3 && $("div#resl > input").length == 4)
						{
							arrValores[2] = $("div#resl > input:eq(2)").val();
							arrValores[3] = $("div#resl > input:eq(3)").val();
							location.href = "javascript:(" + encodeURI( function() {
								updatePuzzle('y','0');
								updatePuzzle('y','1');
								updatePuzzle('g','2');
								$("div#actionbuttonimg1").click();
							}) + ")()";
							numeroSequencia++;
						}
						if (numeroSequencia == 4 && $("div#resl > input").length == 6)
						{
							arrValores[4] = $("div#resl > input:eq(4)").val();
							arrValores[5] = $("div#resl > input:eq(5)").val();
							location.href = "javascript:(" + encodeURI( function() {
								updatePuzzle('g','0');
								updatePuzzle('b','1');
								updatePuzzle('b','2');
								updatePuzzle('y','3');
								$("div#actionbuttonimg1").click();
							}) + ")()";
							numeroSequencia++;
						}
						if (numeroSequencia == 5 && $("div#resl > input").length == 8)
						{
							arrValores[6] = $("div#resl > input:eq(6)").val();
							arrValores[7] = $("div#resl > input:eq(7)").val();
							mms(arrValores);
							numeroSequencia++;
						}
						if (numeroSequencia == 6 && $("#exploreActionResult").html() && $("#exploreActionResult").html().indexOf("You found the correct code sequence and opened the") >= 0)
						{
							clearInterval(idIntervals);
                            idIntervals = setInterval(verificaExploracao, 100);
						}
					}
                }, 100);

			}
            {
                      if ($("span.mobname").html() && $("span.mobname").html() == "A Puzzle Box" || ($("span.mobname").html() && $("span.mobname").html() == "A Treasure Chest"))
        {
                location.href = "javascript:(" + encodeURI( function() {
                    $("div.btn100").each(function(indice) {
                        if ($(this).text().trim() == "Open")
                        {
                            
                            $(this).click();
                            return false;
                        }
                    else if ($(this).html() == "Explore")
                        {
                            
                            $(this).click();
                            return false;
                        }    
                    });
             }) + ")()";  
             }                 
                      

                                    
          }
			
			// A Treasure Chest (age/animals/gallons)
            if ($("span.mobname").html() && $("span.mobname").html() == "A Treasure Chest")
            {
                if ($("#exploreActionResult").length > 0 && $("#exploreActionResult").html() && $("#exploreActionResult").html().indexOf("Inside you find:") > 0)
                {
                    return;
                }
                clearInterval(idIntervals);
                
                location.href = "javascript:(" + encodeURI( function() {
                    $("div.btn100").each(function(indice) {
                        if ($(this).html() == "Open")
                        {
                            
                            $(this).click();
                            return false;
                        }
                    });
                }) + ")()";
				
			    idIntervals = setInterval(function() {
                    if ($("#mobbox > div > table > tbody > tr:last > td").length > 0)
                    {
                        clearInterval(idIntervals);
						
						// age puzzle (how old then)
						var reExample = new RegExp("My current age is (\\d+), how young will I be in (\\d+) years\\?");
                        var match = reExample.exec($("#mobbox > div > table > tbody > tr:first > td").html());
                    	if (match)
                        {
                            $("#answer").val(parseInt(match[1]) + parseInt(match[2]));
                            $("#actionbuttonimg1").click();
                            idIntervals = setInterval(function() {
                                if ($("#exploreActionResult").length > 0 && $("#exploreActionResult").html() && $("#exploreActionResult").html().indexOf("Inside you find:") > 0)
                                {
                                    clearInterval(idIntervals);
                                    idIntervals = setInterval(verificaExploracao, 500);
                                }
                            }, 500);
							$("#answer").blur();
                            return;
                        }
						
						// gallons puzzle
                        reExample = new RegExp("I have (\\d+) gallons of \\w+\\.  How many (\\d+) gallon containers can I fully fill\\?");
                        match = reExample.exec($("#mobbox > div > table > tbody > tr:first > td").html());
                        if (match)
                        {
                            $("#answer").val(parseInt(parseInt(match[1])/parseInt(match[2])));
                            $("#actionbuttonimg1").click();
                            idIntervals = setInterval(function() {
                                if ($("#exploreActionResult").length > 0 && $("#exploreActionResult").html() && $("#exploreActionResult").html().indexOf("Inside you find:") > 0)
                                {
                                    clearInterval(idIntervals);
                                    idIntervals = setInterval(verificaExploracao, 500);
                                }
                            }, 500);
							$("#answer").blur();
                            return;
                        }

						// age puzzle (how old now)
                        reExample = new RegExp("My age will be (\\d+) in (\\d+) years\\. How young am I now\\?");
                        match = reExample.exec($("#mobbox > div > table > tbody > tr:first > td").html());
                        if (match)
                        {
                            $("#answer").val(parseInt(parseInt(match[1])-parseInt(match[2])));
                            $("#actionbuttonimg1").click();
                            idIntervals = setInterval(function() {
                                if ($("#exploreActionResult").length > 0 && $("#exploreActionResult").html() && $("#exploreActionResult").html().indexOf("Inside you find:") > 0)
                                {
                                    clearInterval(idIntervals);
                                    idIntervals = setInterval(verificaExploracao, 500);
                                }
                            }, 500);
							$("#answer").blur();
                            return;
                        }

						// animals puzzle
						reExample = new RegExp("On a farm there are ([\\w-]+) and ([\\w-]+)\\. There are total of (\\d+) heads and (\\d+) legs.  How many ([\\w-]+) are on the farm?");
                        match = reExample.exec($("#mobbox > div > table > tbody > tr:first > td").html());
						var iter1 = 0;
						var arrValores = [0,0,0,0];
                        if (match)
                        {
							if (match[1] == "chickens" || match[2] == "chickens")
							{
								arrValores[iter1] = 2;
								iter1++;
							}
							if (match[1] == "three-legged-cows" || match[2] == "three-legged-cows")
							{
								arrValores[iter1] = 3;
								iter1++;
							}
							if (match[1] == "horses" || match[2] == "horses")
							{
								arrValores[iter1] = 4;
                                iter1++;
							}
							if (iter1 != 2)
							{
								return;
							}
							var delt=arrValores[1] - arrValores[0]; 
							arrValores[2] = (parseInt(match[3])*arrValores[1] - parseInt(match[4]))/delt;
							arrValores[3] = (parseInt(match[4]) - (parseInt(match[3])*arrValores[0]))/delt;
							if (match[5] == "chickens")
							{
								if (arrValores[0] == 2)
								{
									$("#answer").val(arrValores[2]);
								} else {
									$("#answer").val(arrValores[3]);
								}
							}
							if (match[5] == "three-legged-cows")
							{
								if (arrValores[0] == 3)
								{
									$("#answer").val(arrValores[2]);
								} else {
									$("#answer").val(arrValores[3]);
								}
							}
							if (match[5] == "horses")
							{
								if (arrValores[0] == 4)
								{
									$("#answer").val(arrValores[2]);
								} else {
									$("#answer").val(arrValores[3]);
								}
							}
                            $("#actionbuttonimg1").click();
                            idIntervals = setInterval(function() {
                                if ($("#exploreActionResult").length > 0 && $("#exploreActionResult").html() && $("#exploreActionResult").html().indexOf("Inside you find:") > 0)
                                {
                                    clearInterval(idIntervals);
                                    idIntervals = setInterval(verificaExploracao, 500);
                                }
                            }, 500);
							$("#answer").blur();
                            return;
                        }
                    }
                }, 500);
                
            }

// Well 

if ($("span.mobname").html() && $("span.mobname").html() == "Wishing Well")			
		{
                if(well==0){
                  location.href = "javascript:(" + encodeURI( function() {
                    $("div.btn100").each(function(indice) {
                        if ($(this).html() == "Dive In")
                        {
                            
                            $(this).click();
                            return false;
                        }
					else if ($(this).html() == "Explore")
                        {
                            
                            $(this).click();
                            return false;
                        }	
                    });
             }) + ")()";
           	}else if(well==1){
           		// DO NOTHING
           	}
        }                                 

// Beggar
	if ($("span.mobname").html() && $("span.mobname").html() == "A Beggar")
		{
                location.href = "javascript:(" + encodeURI( function() {
                    $("div.btn100").each(function(indice) {
                        if ($(this).html() == "Scare")
                        {
                            
                            $(this).click();
                            return false;
                        }
					else if ($(this).html() == "Explore")
                        {
                            
                            $(this).click();
                            return false;
                        }	
                    });
             }) + ")()";
        }            
            
    // Shrooms eat
	if ($("span.mobname").html() && $("span.mobname").html() == "Magic Mushrooms")
		{
                location.href = "javascript:(" + encodeURI( function() {
                    $("div.btn100").each(function(indice) {
                        if ($(this).html() == "Taste")
                        {
                            
                            $(this).click();
                            return false;
                        }
					else if ($(this).html() == "Explore")
                        {
                            
                            $(this).click();
                            return false;
                        }	
                    });
             }) + ")()";
        }
        
    // Elf fight/buy
	if ($("span.mobname").html() && $("span.mobname").html() == "Magic Elf")
		{
                if(elf==0){
                	location.href = "javascript:(" + encodeURI( function() {
                   	 $("div.btn100").each(function(indice) {
                   	     if ($(this).html() == "Attack")
                     	   {
                     	       
                      	      $(this).click();
                       	     return false;
                      	  }
                 	   });
           	  }) + ")()";
           	}else if(elf==1){
           		location.href = "javascript:(" + encodeURI( function() {
                   	 $("div.btn100").each(function(indice) {
                   	     if ($(this).html() == "Buy with Coins")
                     	   {
                     	       
                      	      $(this).click();
                       	     return false;
                      	  }
						  else if ($(this).html() == "Explore")
                     	   {
                     	       
                      	      $(this).click();
                       	     return false;
                      	  }
                 	   });
           	  }) + ")()";
           	}
        }
        
        // GoD fight
        if ($("span.mobname").html() && $("span.mobname").html() == "Guardian of Dreams")
		{
			location.href = "javascript:(" + encodeURI( function() {
				$("div.btn100").each(function(indice) {
					if ($(this).html() == "Fight")
					{
						
						$(this).click();
						return false;
					}
				});
			}) + ")()";
		}
		
		// Gambler gamble/fight
		if ($("span.mobname").html() && $("span.mobname").html() == "The Gambler")
		{
			if(gambler==0){
					location.href = "javascript:(" + encodeURI( function() {
						$("div.btn100").each(function(indice) {
							if ($(this).html() == "Accept")
							{
								$(this).click();
								return false;
							}
							else if ($(this).html() == "Explore")
							{
								$(this).click();
								return false;
							}
						});
					}) + ")()";				
				}else if(gambler==1){					
					location.href = "javascript:(" + encodeURI( function() {
						$("div.btn100").each(function(indice) {
							if ($(this).html() == "Fight")
							{
								$(this).click();
								return false;
							}
						});
					}) + ")()";					
				}
		}
		
		// Dust Merchant dust/fight
		if ($("span.mobname").html() && $("span.mobname").html() == "Dust Merchant")
			
			{
                if(dust==0){
					location.href = "javascript:(" + encodeURI( function() {
						$("div.btn100").each(function(indice) {
							if ($(this).html() == "Accept")
							{
								$(this).click();
								return false;
							}
						});
					}) + ")()";				
				}else if(dust==1){					
					location.href = "javascript:(" + encodeURI( function() {
						$("div.btn100").each(function(indice) {
							if ($(this).html() == "Fight")
							{
								$(this).click();
								return false;
							}
						});
					}) + ")()";					
				}
			}
			
		// Wiseman talk/quiz/fight
        if ($("span.mobname").html() && $("span.mobname").html() == "The Wiseman")
			{
                if(wiseman==0){
					location.href = "javascript:(" + encodeURI( function() {
						$("div.btn100").each(function(indice) {
							if ($(this).html() == "Accept")
							{
								$(this).click();
								return false;
							}
						    else if ($(this).html() == "Explore")
							{
								$(this).click();
								return false;
							}
						});
					}) + ")()";				
				}else if(wiseman==1){					
					location.href = "javascript:(" + encodeURI( function() {
						$("div.btn100").each(function(indice) {
							if ($(this).html() == "Trivia")
							{
								$(this).click();
								return false;
							}
						});
					}) + ")()";					
				}else if(wiseman==2){
					location.href = "javascript:(" + encodeURI( function() {
						$("div.btn100").each(function(indice) {
							if ($(this).html() == "Fight")
							{
								$(this).click();
								return false;
							}
						});
					}) + ")()";					
				}                
        	}
        	
        // Imp quest/fight
		if ($("span.mobname").html() && $("span.mobname").html() == "Little Imp")
			{
                if(imp==0){
					location.href = "javascript:(" + encodeURI( function() {
						$("div.btn100").each(function(indice) {
							if ($(this).html() == "Accept")
							{
								$(this).click();
								return false;
							}
						});
					}) + ")()";				
				}else if(imp==1){					
					location.href = "javascript:(" + encodeURI( function() {
						$("div.btn100").each(function(indice) {
							if ($(this).html() == "Explore")
							{
								$(this).click();
								return false;
							}
						});
					}) + ")()";					
				}
        	}
        	
        // Girl In Red quest/fight
        if ($("span.mobname").html() && $("span.mobname").html() == "Girl in Red")
			{
                if(0==girl){
					location.href = "javascript:(" + encodeURI( function() {
						$("div.btn100").each(function(indice) {
							if ($(this).html() == "Accept")
							{
								$(this).click();
								return false;
							}
							else if ($(this).html() == "Explore")
							{
								$(this).click();
								return false;
							}
						});
					}) + ")()";				
				}else if(1==girl){					
					location.href = "javascript:(" + encodeURI( function() {
						$("div.btn100").each(function(indice) {
							if ($(this).html() == "Explore")
							{
								$(this).click();
								return false;
							}
						});
					}) + ")()";					
				}
        	}
        
        // Easter Bunny take
        if ($("span.mobname").html() && $("span.mobname").html() == "Easter Bunny")
			{
                location.href = "javascript:(" + encodeURI( function() {
                    $("div.btn100").each(function(indice) {
                        if ($(this).html() == "Take One")
                        {
                            
                            $(this).click();
                            return false;
                        }
                    });
             }) + ")()";
        	}
    
    // Ally, we want to discard allys with name != ally_names[0,3,7] (not Kitten, Priestess or Phoenix)
    	if ($("span.mobname").html() && ( $("span.mobname").html() == ally_names[1] || $("span.mobname").html() == ally_names[2] || $("span.mobname").html() == ally_names[4] || $("span.mobname").html() == ally_names[5] || $("span.mobname").html() == ally_names[6] || $("span.mobname").html() == ally_names[8] || $("span.mobname").html() == ally_names[9] ))
			{
                GM_log("ally encountered");
				if(ally==0){
					GM_log("ally get");
					location.href = "javascript:(" + encodeURI( function() {
                    $("div.btn100").each(function(indice) {
                        if ($(this).html() == "Accept")
                        {
                            
                            $(this).click();
                            return false;
                        }
                    });
					}) + ")()";
				}else if(ally==1){
					GM_log("ally keep");
					location.href = "javascript:(" + encodeURI( function() {
                    $("div.btn100").each(function(indice) {
                        if ($(this).html() == "Explore")
                        {
                            
                            $(this).click();
                            return false;
                        }
                    });
					}) + ")()";
				}
        	}  
	// nice Ally, we want to get allys with name == ally_names[0,3,7] (Kitten, Priestess or Phoenix)
    	if ($("span.mobname").html() && ( $("span.mobname").html() == ally_names[0] || $("span.mobname").html() == ally_names[3] ||$("span.mobname").html() == ally_names[7] ))
			{
                GM_log("nice ally encountered");
				if(niceAlly==0){
					GM_log("nice ally get");
					location.href = "javascript:(" + encodeURI( function() {
                    $("div.btn100").each(function(indice) {
                        if ($(this).html() == "Accept")
                        {
                            
                            $(this).click();
                            return false;
                        }
                    });
					}) + ")()";
				}else if(niceAlly==1){
					GM_log("ally keep");
					location.href = "javascript:(" + encodeURI( function() {
                    $("div.btn100").each(function(indice) {
                        if ($(this).html() == "Explore")
                        {
                            
                            $(this).click();
                            return false;
                        }
                    });
					}) + ")()";
				}
        	} 
			// Treasure Map
	if ($("span.mobname").html() && $("span.mobname").html() == "A Treasure Map")
			{
                if(map==0){
					location.href = "javascript:(" + encodeURI( function() {
                    $("div.btn100").each(function(indice) {
                        if ($(this).html() == "Find")
                        {
                            
                            $(this).click();
                            return false;
                        }
						else if ($(this).html() == "Explore")
                        {
                            
                            $(this).click();
                            return false;
                        }
                    });
					}) + ")()";
				}else if(map==1){
					location.href = "javascript:(" + encodeURI( function() {
                    $("div.btn100").each(function(indice) {
                        if ($(this).html() == "Sell")
                        {
                            
                            $(this).click();
                            return false;
                        }
						else if ($(this).html() == "Explore")
                        {
                            
                            $(this).click();
                            return false;
                        }
                    });
					}) + ")()";
				}
        	}
	}
    }
	ativo = true;
	idIntervals = setInterval(verificaExploracao, 5);