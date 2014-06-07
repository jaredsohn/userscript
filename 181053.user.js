// ==UserScript==
// @name       TMU SI with REREC
// @namespace  http://ultra.trophymanager.com/club/24641
// @version    1.0.8

// @description  show SI and REREC in TMU Player page
// @match      *://ultra.trophymanager.com/players*
// @copyright  Never Lose
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

$ = unsafeWindow.$;

$.browser.chrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase()); 

var weightR = [[0.653962303361921,  0.330014238020285, 	0.562994547223387, 	0.891800163983125,  0.871069095865164,  0.454514672470839, 	0.555697278549252, 	0.42777598627972,  	0.338218821750765, 	0.134348455965202, 	0.796916786677566, 	0.048831870932616, 	0.116363443378865, 	0.282347752982916,	14.866375,	18.95664],	//DC
			   [0.565605120229193,  0.430973382039533, 	0.917125432457378, 	0.815702528287723,  0.99022325015212,   0.547995876625372, 	0.522203232914265, 	0.309928898819518, 	0.837365352274204, 	0.483822472259513, 	0.656901420858592, 	0.137582588344562, 	0.163658117596413, 	0.303915447383549,	15.980742,	22.895539],	//DL/R
			   [0.55838825558912,   0.603683502357502, 	0.563792314670998,	0.770425088563048,  0.641965853834719,  0.675495235675077, 	0.683863478201805, 	0.757342915150728, 	0.473070797767482, 	0.494107823556837, 	0.397547163237438, 	0.429660916538242, 	0.56364174077388,  	0.224791093448809,	15.8932675,	23.1801296],	//DMC
			   [0.582074038075056,  0.420032202680124, 	0.7887541874616,   	0.726221389774063,  0.722972329840151,  0.737617252827595, 	0.62234458453736,  	0.466946909655194, 	0.814382915598981, 	0.561877829393632, 	0.367446981999576, 	0.360623408340649, 	0.390057769678583, 	0.249517737311268,	15.5835325,	23.2813871],	//DML/R
			   [0.578431939417021,  0.778134685048085, 	0.574726322388294, 	0.71400292078636,   0.635403391007978,  0.822308254446722, 	0.877857040588335, 	0.864265671245476, 	0.433450219618618, 	0.697164252367046, 	0.412568516841575, 	0.586627586272733, 	0.617905053049757, 	0.308426814834866,	17.6955092,	26.8420884],	//MC
			   [0.497429376361348,  0.545347364699553, 	0.788280917110089, 	0.578724574327427,  0.663235306043286,  0.772537143243647, 	0.638706135095199, 	0.538453108494387, 	0.887935381275257, 	0.572515970409641, 	0.290549550901104, 	0.476180499897665, 	0.526149424898544, 	0.287001645266184,	16.6189141,	23.9940623],	//ML/R
			   [0.656437768926678,  0.617260722143117, 	0.656569986958435, 	0.63741054520629,   0.55148452726771,   0.922379789905246, 	0.790553566121791, 	0.999688557334153, 	0.426203575603164, 	0.778770912265944, 	0.652374065121788, 	0.662264393455567, 	0.73120100926333,  	0.274563618133769,	18.1255351,	27.8974544],	//OMC
			   [0.483341947292063,  0.494773052635464, 	0.799434804259974, 	0.628789194186491,  0.633847969631333,  0.681354437033551, 	0.671233869875345, 	0.536121458625519, 	0.849389745477645, 	0.684067723274814, 	0.389732973354501, 	0.499972692291964, 	0.577231818355874, 	0.272773352088982,	15.6304867,	24.54323],	//OML/R
			   [0.493917051093473,  0.370423904816088, 	0.532148929996192, 	0.0629206658586336, 0.0904950078155216, 0.415494774080483, 	0.54106107545574,  	0.468181146095801, 	0.158106484131194, 	0.461125738338018, 	0.83399612271067,  	0.999828328674183, 	0.827171977606305, 	0.253225855459207,	13.2762119,	19.5088591],	//F
			   [0.5, 				0.333, 				0.5, 				1,   				0.5, 				1,  				0.5, 				0.5, 				0.333, 				0.333, 				0.333,				,					,					,					15,			22.3]]; //GK

var weightR2 = new Array();

for(var x = 0; x < weightR.length; x++){
    var arr = new Array(); 
    
    for(var y = 0; y < weightR[x].length; y++){
    	arr.push(weightR[x][y]);
    }
    
    weightR2.push(arr);
}

weightR2.forEach(function(p){
    var v1 = p[1];
    var v2 = p[2];
    var v3 = p[3];
    var v4 = p[4];
    var v5 = p[5];
    var v6 = p[6];
    var v7 = p[7];
    var v8 = p[8];
    var v9 = p[9];
    var v10 = p[10];
    var v11 = p[11];
    var v12 = p[12];
    
    p[1] = v7;
    p[2] = v1;
    p[3] = v8;
    p[4] = v2;
    p[5] = v9;
    p[6] = v3;
    p[7] = v10;
    p[8] = v4;
    p[9] = v11;
    p[10] = v5;
    p[11] = v12;
    p[12] = v6;
});

var weightR3 = [0.5, 1, 0.333, 0.5, 0.5, 1, 0.5, 0.5, 0.333, 0.333, 0.333, 0, 0, 0, 15, 22.3];

$(function(){
    showSI();
    showPlayerSI();
    
    $("#sq").on("click", "table > tbody > tr.header > th:not(.si)", function(){
    	showSI();
    });
    
    $("[id^='filter_']").click(function(){
    	showSI();
    });
    
    function showSI(){
        $("#sq th.name, #sq div.name").css("width", "100px");
        $("#sq div.position").css("width","55px");
    	$("#sq th.rec,#sq div.rec").css("width","80px");
    	$("#sq tr.header").append("<th class='si' style='width:80px;'>SI</th>");
        
        if($.browser.mozilla){
            $("#sq > table > tbody > tr:not(.header):not(:has(td.splitter))").each(function(){
                var favposition = $(this).find(".favposition").text();
                var skills = 0;
                
                $(this).find("div.skill").each(function(){
               		var skill = parseInt($(this).text());
                    
                    if(isNaN(skill)){
                    	skill = parseInt($(this).find("img").attr("tooltip"));
                    }
                    
                    skills += skill;
				});
                
                if(favposition == "Gk"){ skills = parseInt(skills / 11 * 14) }
                
                var newPow = 6.9519770543;
                var newDiv = 199873144100.3349484929416253;
                
                var si = parseInt(Math.pow((skills / 5), newPow) / newDiv);  
                
                $(this).append("<div style='text-align:right;'>" + si + "</div>");
            });
        } else if ($.browser.chrome){
            $("#sq > table > tbody > tr:not(.header):not(:has(td.splitter))").each(function(){
                var playerId = $(this).find("div.name a").attr("player_link") || 0;
                var si = 0;
                
                players_ar.forEach(function(data){
                    if(data.id == playerId) { 
                        si = data.asi; 
                        return;
                    }
                });
                
                var favposition = $(this).find(".favposition").text();
                var recSkills = 0;
                var recSkills2 = 0;
                var i = 0;

                $(this).find("div.skill").each(function(){
               		var skill = parseInt($(this).text());
                    
                    if(isNaN(skill)){
                    	skill = parseInt($(this).find("img").attr("tooltip"));
                    }
                    
                    switch(favposition){
                        case "D C": 
                            recSkills += skill * weightR[0][i];
                            break;
                        case "D L":
                        case "D R":
                            recSkills += skill * weightR[1][i];
                            break;
                        case "DM C":
                            recSkills += skill * weightR[2][i];
                            break;
                        case "DM L":
                        case "DM R":
                            recSkills += skill * weightR[3][i];
                            break;
                        case "M C":
                            recSkills += skill * weightR[4][i];
                            break;
                        case "M L":
                        case "M R":
                            recSkills += skill * weightR[5][i];
                            break;
                        case "OM C":
                            recSkills += skill * weightR[6][i];
                            break;
                        case "OM L":
                        case "OM R":
                            recSkills += skill * weightR[7][i];
                            break;
                        case "F":
                            recSkills += skill * weightR[8][i];
                            break;
                        case "Gk":
                            recSkills += skill * weightR[9][i];
                            break;
                        case "D C, F":
                            recSkills += skill * weightR[0][i];
                            recSkills2 += skill * weightR[8][i];
                            break;
                        case "D CL":
                        case "D CR":
                            recSkills += skill * weightR[0][i];
                            recSkills2 += skill * weightR[1][i];
                            break;
                        case "D LC":
                        case "D RC":
                            recSkills += skill * weightR[1][i];
                            recSkills2 += skill * weightR[0][i];
                            break;
                        case "D LR":
                        case "D RL":
                            recSkills += skill * weightR[1][i];
                            recSkills2 += skill * weightR[1][i];
                            break;
                        case "D/DM C":
                            recSkills += skill * weightR[0][i];
                            recSkills2 += skill * weightR[2][i];
                            break;
                        case "D/DM L":
                        case "D/DM R":
                            recSkills += skill * weightR[1][i];
                            recSkills2 += skill * weightR[3][i];
                            break;
                        case "D/M L":
                        case "D/M R":
                            recSkills += skill * weightR[1][i];
                            recSkills2 += skill * weightR[5][i];
                            break;
                        case "DM/D L":
                        case "DM/D R":
                            recSkills += skill * weightR[3][i];
                            recSkills2 += skill * weightR[1][i];
                            break;
                        case "DM LR":
                        case "DM RL":
                            recSkills += skill * weightR[3][i];
                            recSkills2 += skill * weightR[3][i];
                            break;
                        case "DM/D C":
                            recSkills += skill * weightR[2][i];
                            recSkills2 += skill * weightR[0][i];
                            break;
                        case "DM/M C":
                            recSkills += skill * weightR[2][i];
                            recSkills2 += skill * weightR[4][i];
                            break;
                        case "DM CL":
                        case "DM CR":
                            recSkills += skill * weightR[2][i];
                            recSkills2 += skill * weightR[3][i];
                            break;
                        case "DM LC":
                        case "DM RC":
                            recSkills += skill * weightR[3][i];
                            recSkills2 += skill * weightR[2][i];
                            break;
                        case "DM/M L":
                        case "DM/M R":
                            recSkills += skill * weightR[3][i];
                            recSkills2 += skill * weightR[5][i];
                            break;
                        case "M CL":
                        case "M CR":
                            recSkills += skill * weightR[4][i];
                            recSkills2 += skill * weightR[5][i];
                            break;
                        case "M LC":
                        case "M RC":
                            recSkills += skill * weightR[5][i];
                            recSkills2 += skill * weightR[4][i];
                            break;
                        case "M LR":
                        case "M RL":
                            recSkills += skill * weightR[5][i];
                            recSkills2 += skill * weightR[5][i];
                            break;
                        case "M/OM C":
                            recSkills += skill * weightR[4][i];
                            recSkills2 += skill * weightR[6][i];
                            break;
                        case "M/OM L":
                        case "M/OM R":
                            recSkills += skill * weightR[5][i];
                            recSkills2 += skill * weightR[7][i];
                            break;
                        case "M/DM L":
                        case "M/DM R":
                            recSkills += skill * weightR[5][i];
                            recSkills2 += skill * weightR[3][i];
                            break;
                        case "OM CL":
                        case "OM CR":
                            recSkills += skill * weightR[6][i];
                            recSkills2 += skill * weightR[7][i];
                            break;
                        case "OM LC":
                        case "OM RC":
                            recSkills += skill * weightR[7][i];
                            recSkills2 += skill * weightR[6][i];
                            break;
                        case "OM RL":
                        case "OM LR":
                            recSkills += skill * weightR[7][i];
                            recSkills2 += skill * weightR[7][i];
                            break;
                        case "OM C, F":
                            recSkills += skill * weightR[6][i];
                            recSkills2 += skill * weightR[8][i];
                            break;
                        case "OM L, F":
                        case "OM R, F":
                            recSkills += skill * weightR[7][i];
                            recSkills2 += skill * weightR[8][i];
                            break;
                        case "OM/M C":
                            recSkills += skill * weightR[6][i];
                            recSkills2 += skill * weightR[4][i];
                            break;
                        case "OM/M L":
                        case "OM/M R":
                            recSkills += skill * weightR[7][i];
                            recSkills2 += skill * weightR[5][i];
                            break;
                        case "M C, F":
                            recSkills += skill * weightR[4][i];
                            recSkills2 += skill * weightR[8][i];
                            break;
                        case "M L, F":
                        case "M R, F":
                            recSkills += skill * weightR[5][i];
                            recSkills2 += skill * weightR[8][i];
                            break;
                    }
                    
                    i += 1;
				});
        
                if(recSkills == 0){
                	$(this).append("<div style='text-align:right;'>" + si + "</div>");
                } else {
                    recSkills /= 5;
                    
                    if (recSkills2 != 0){
                    	recSkills2 /= 5;
                    }
                    
                    switch(favposition){
                        case "D C": 
                            recSkills = (recSkills - weightR[0][14]) / weightR[0][15];
                            break;
                        case "D L":
                        case "D R":
                            recSkills = (recSkills - weightR[1][14]) / weightR[1][15];
                            break;
                        case "DM C":
                            recSkills = (recSkills - weightR[2][14]) / weightR[2][15];
                            break;
                        case "DM L":
                        case "DM R":
                            recSkills = (recSkills - weightR[3][14]) / weightR[3][15];
                            break;
                        case "M C":
                            recSkills = (recSkills - weightR[4][14]) / weightR[4][15];
                            break;
                        case "M L":
                        case "M R":
                            recSkills = (recSkills - weightR[5][14]) / weightR[5][15];
                            break;
                        case "OM C":
                            recSkills = (recSkills - weightR[6][14]) / weightR[6][15];
                            break;
                        case "OM L":
                        case "OM R":
                            recSkills = (recSkills - weightR[7][14]) / weightR[7][15];
                            break;
                        case "F":
                            recSkills = (recSkills - weightR[8][14]) / weightR[8][15];
                            break;
                        case "Gk":
                            recSkills = recSkills / 11 * 14;
                            recSkills = (recSkills - weightR[9][14]) / weightR[9][15];
                            break;
                        case "D C, F":
                            recSkills = (recSkills - weightR[0][14]) / weightR[0][15];
                            recSkills2 = (recSkills2 - weightR[8][14]) / weightR[8][15];
                            break;
                        case "D CL":
                        case "D CR":
                            recSkills = (recSkills - weightR[0][14]) / weightR[0][15];
                            recSkills2 = (recSkills2 - weightR[1][14]) / weightR[1][15];
                            break;
                        case "D LC":
                        case "D RC":
                            recSkills = (recSkills - weightR[1][14]) / weightR[1][15];
                            recSkills2 = (recSkills2 - weightR[0][14]) / weightR[0][15];
                            break;
                        case "D LR":
                        case "D RL":
                            recSkills = (recSkills - weightR[1][14]) / weightR[1][15];
                            recSkills2 = (recSkills2 - weightR[1][14]) / weightR[1][15];
                            break;
                        case "D/DM C":
                            recSkills = (recSkills - weightR[0][14]) / weightR[0][15];
                            recSkills2 = (recSkills2 - weightR[2][14]) / weightR[2][15];
                            break;
                        case "D/DM L":
                        case "D/DM R":
                            recSkills = (recSkills - weightR[1][14]) / weightR[1][15];
                            recSkills2 = (recSkills2 - weightR[3][14]) / weightR[3][15];
                            break;
                        case "D/M L":
                        case "D/M R":
                            recSkills = (recSkills - weightR[1][14]) / weightR[1][15];
                            recSkills2 = (recSkills2 - weightR[5][14]) / weightR[5][15];
                            break;
                        case "DM/D L":
                        case "DM/D R":
                            recSkills = (recSkills - weightR[3][14]) / weightR[3][15];
                            recSkills2 = (recSkills2 - weightR[1][14]) / weightR[1][15];
                            break;
                        case "DM LR":
                        case "DM RL":
                            recSkills = (recSkills - weightR[3][14]) / weightR[3][15];
                            recSkills2 = (recSkills2 - weightR[3][14]) / weightR[3][15];
                            break;
                        case "DM/D C":
                            recSkills = (recSkills - weightR[2][14]) / weightR[2][15];
                            recSkills2 = (recSkills2 - weightR[0][14]) / weightR[0][15];
                            break;
                        case "DM/M C":
                            recSkills = (recSkills - weightR[2][14]) / weightR[2][15];
                            recSkills2 = (recSkills2 - weightR[4][14]) / weightR[4][15];
                            break;
                        case "DM CL":
                        case "DM CR":
                            recSkills = (recSkills - weightR[2][14]) / weightR[2][15];
                            recSkills2 = (recSkills2 - weightR[3][14]) / weightR[3][15];
                            break;
                        case "DM LC":
                        case "DM RC":
                            recSkills = (recSkills - weightR[3][14]) / weightR[3][15];
                            recSkills2 = (recSkills2 - weightR[2][14]) / weightR[2][15];
                            break;
                        case "DM/M L":
                        case "DM/M R":
                            recSkills = (recSkills - weightR[3][14]) / weightR[3][15];
                            recSkills2 = (recSkills2 - weightR[5][14]) / weightR[5][15];
                            break;
                        case "M CL":
                        case "M CR":
                            recSkills = (recSkills - weightR[4][14]) / weightR[4][15];
                            recSkills2 = (recSkills2 - weightR[5][14]) / weightR[5][15];
                            break;
                        case "M LC":
                        case "M RC":
                            recSkills = (recSkills - weightR[5][14]) / weightR[5][15];
                            recSkills2 = (recSkills2 - weightR[4][14]) / weightR[4][15];
                            break;
                        case "M LR":
                        case "M RL":
                            recSkills = (recSkills - weightR[5][14]) / weightR[5][15];
                            recSkills2 = (recSkills2 - weightR[5][14]) / weightR[5][15];
                            break;
                        case "M/OM C":
                            recSkills = (recSkills - weightR[4][14]) / weightR[4][15];
                            recSkills2 = (recSkills2 - weightR[6][14]) / weightR[6][15];
                            break;
                        case "M/OM L":
                        case "M/OM R":
                            recSkills = (recSkills - weightR[5][14]) / weightR[5][15];
                            recSkills2 = (recSkills2 - weightR[7][14]) / weightR[7][15];
                            break;
                        case "M/DM L":
                        case "M/DM R":
                            recSkills = (recSkills - weightR[5][14]) / weightR[5][15];
                            recSkills2 = (recSkills2 - weightR[3][14]) / weightR[3][15];
                            break;
                        case "OM CL":
                        case "OM CR":
                            recSkills = (recSkills - weightR[6][14]) / weightR[6][15];
                            recSkills2 = (recSkills2 - weightR[7][14]) / weightR[7][15];
                            break;
                        case "OM LC":
                        case "OM RC":
                            recSkills = (recSkills - weightR[7][14]) / weightR[7][15];
                            recSkills2 = (recSkills2 - weightR[6][14]) / weightR[6][15];
                            break;
                        case "OM RL":
                        case "OM LR":
                            recSkills = (recSkills - weightR[7][14]) / weightR[7][15];
                            recSkills2 = (recSkills2 - weightR[7][14]) / weightR[7][15];
                            break;
                        case "OM C, F":
                            recSkills = (recSkills - weightR[6][14]) / weightR[6][15];
                            recSkills2 = (recSkills2 - weightR[8][14]) / weightR[8][15];
                            break;
                        case "OM L, F":
                        case "OM R, F":
                            recSkills = (recSkills - weightR[7][14]) / weightR[7][15];
                            recSkills2 = (recSkills2 - weightR[8][14]) / weightR[8][15];
                            break;
                        case "OM/M C":
                            recSkills = (recSkills - weightR[6][14]) / weightR[6][15];
                            recSkills2 = (recSkills2 - weightR[4][14]) / weightR[4][15];
                            break;
                        case "OM/M L":
                        case "OM/M R":
                            recSkills = (recSkills - weightR[7][14]) / weightR[7][15];
                            recSkills2 = (recSkills2 - weightR[5][14]) / weightR[5][15];
                            break;
                        case "M C, F":
                            recSkills = (recSkills - weightR[4][14]) / weightR[4][15];
                            recSkills2 = (recSkills2 - weightR[8][14]) / weightR[8][15];
                            break;
                        case "M L, F":
                        case "M R, F":
                            recSkills = (recSkills - weightR[5][14]) / weightR[5][15];
                            recSkills2 = (recSkills2 - weightR[8][14]) / weightR[8][15];
                            break;
                    }
                    
                    if (recSkills2 == 0){
                		$(this).append("<div style='text-align:right;'>" + si + "<br />" + recSkills.toFixed(2).toString() + "</div>");
                    } else {
                    	$(this).append("<div style='text-align:right;'>" + si + "<br />" + recSkills.toFixed(2).toString() + ", " + recSkills2.toFixed(2).toString() + "</div>");
                    }
                }
            });
        } else {
            alert("sorry, this browser not supported at the moment");
        }
    };
    
    function showPlayerSI(){
        var favposition = $(".favposition").text();
        var skills = 0;
        var recSkills = 0;
        var recSkills2 = 0;
		var i = 0;
        
        $("table.skill_table:eq(0) tbody td.align_center").each(function(){
            var skill = parseInt($(this).text());
            
            if(isNaN(skill)){
                if($(this).find("div").hasClass("icon_gold_star")){
                	skill = 100;
                } else {
                	skill = 99;
                }
            }
           	
            skills += skill;
            
            switch(favposition){
                case "Defender Center": 
                    recSkills += skill * weightR2[0][i];
                    break;
                case "Defender Left":
                case "Defender Right":
                    recSkills += skill * weightR2[1][i];
                    break;
                case "Defensive Midfielder Center":
                    recSkills += skill * weightR2[2][i];
                    break;
                case "Defensive Midfielder Left":
                case "Defensive Midfielder Right":
                    recSkills += skill * weightR2[3][i];
                    break;
                case "Midfielder Center":
                    recSkills += skill * weightR2[4][i];
                    break;
                case "Midfielder Left":
                case "Midfielder Right":
                    recSkills += skill * weightR2[5][i];
                    break;
                case "Offensive Midfielder Center":
                    recSkills += skill * weightR2[6][i];
                    break;
                case "Offensive Midfielder Left":
                case "Offensive Midfielder Right":
                    recSkills += skill * weightR2[7][i];
                    break;
                case "Forward":
                    recSkills += skill * weightR2[8][i];
                    break;
                case "Goalkeeper":
                    recSkills += skill * weightR3[i];
                    break;
                case "Defender Center/Forward":
                    recSkills += skill * weightR2[0][i];
                    recSkills2 += skill * weightR2[8][i];
                    break;
                case "Defender Center/Left":
                case "Defender Center/Right":
                    recSkills += skill * weightR2[0][i];
                    recSkills2 += skill * weightR2[1][i];
                    break;
                case "Defender Left/Center":
                case "Defender Right/Center":
                    recSkills += skill * weightR2[1][i];
                    recSkills2 += skill * weightR2[0][i];
                    break;
                case "Defender Left/Right":
                case "Defender Right/Left":
                    recSkills += skill * weightR2[1][i];
                    recSkills2 += skill * weightR2[1][i];
                    break;
                case "Defender/Defensive Midfielder Center":
                    recSkills += skill * weightR2[0][i];
                    recSkills2 += skill * weightR2[2][i];
                    break;
                case "Defender/Defensive Midfielder Left":
                case "Defender/Defensive Midfielder Right":
                    recSkills += skill * weightR2[1][i];
                    recSkills2 += skill * weightR2[3][i];
                    break;
                case "Defender/Midfielder Left":
                case "Defender/Midfielder Right":
                    recSkills += skill * weightR2[1][i];
                    recSkills2 += skill * weightR2[5][i];
                    break;
                case "Defensive Midfielder/Defender Left":
                case "Defensive Midfielder/Defender Right":
                    recSkills += skill * weightR2[3][i];
                    recSkills2 += skill * weightR2[1][i];
                    break;
                case "Defensive Midfielder Right/Left":
                case "Defensive Midfielder Left/Right":
                    recSkills += skill * weightR2[3][i];
                    recSkills2 += skill * weightR2[3][i];
                    break;
                case "Defensive Midfielder/Defender Center":
                    recSkills += skill * weightR2[2][i];
                    recSkills2 += skill * weightR2[0][i];
                    break;
                case "Defensive Midfielder/Midfielder Center":
                    recSkills += skill * weightR2[2][i];
                    recSkills2 += skill * weightR2[4][i];
                    break;
                case "Defensive Midfielder Center/Left":
                case "Defensive Midfielder Center/Right":
                    recSkills += skill * weightR2[2][i];
                    recSkills2 += skill * weightR2[3][i];
                    break;
                case "Defensive Midfielder Left/Center":
                case "Defensive Midfielder Right/Center":
                    recSkills += skill * weightR2[3][i];
                    recSkills2 += skill * weightR2[2][i];
                    break;
                case "Defensive Midfielder/Midfielder Left":
                case "Defensive Midfielder/Midfielder Right":
                    recSkills += skill * weightR2[3][i];
                    recSkills2 += skill * weightR2[5][i];
                    break;
                case "Midfielder/Defensive Midfielder Center":
                    recSkills += skill * weightR2[4][i];
                    recSkills2 += skill * weightR2[2][i];
                    break;
                case "Midfielder Center/Left":
                case "Midfielder Center/Right":
                    recSkills += skill * weightR2[4][i];
                    recSkills2 += skill * weightR2[5][i];
                    break;
                case "Midfielder Left/Center":
                case "Midfielder Right/Center":
                    recSkills += skill * weightR2[5][i];
                    recSkills2 += skill * weightR2[4][i];
                    break;
                case "Midfielder Left/Right":
                case "Midfielder Right/Left":
                    recSkills += skill * weightR2[5][i];
                    recSkills2 += skill * weightR2[5][i];
                    break;
                case "Midfielder/Offensive Midfielder Center":
                    recSkills += skill * weightR2[4][i];
                    recSkills2 += skill * weightR2[6][i];
                    break;
                case "Midfielder/Offensive Midfielder Left":
                case "Midfielder/Offensive Midfielder Right":
                    recSkills += skill * weightR2[5][i];
                    recSkills2 += skill * weightR2[7][i];
                    break;
                case "Midfielder/Defensive Midfielder Left":
                case "Midfielder/Defensive Midfielder Right":
                    recSkills += skill * weightR2[5][i];
                    recSkills2 += skill * weightR2[3][i];
                    break;
                case "Offensive Midfielder Center/Left":
                case "Offensive Midfielder Center/Right":
                    recSkills += skill * weightR2[6][i];
                    recSkills2 += skill * weightR2[7][i];
                    break;
                case "Offensive Midfielder Left/Center":
                case "Offensive Midfielder Right/Center":
                    recSkills += skill * weightR2[7][i];
                    recSkills2 += skill * weightR2[6][i];
                    break;
                case "Offensive Midfielder Right/Left":
                case "Offensive Midfielder Left/Right":
                    recSkills += skill * weightR2[7][i];
                    recSkills2 += skill * weightR2[7][i];
                    break;
                case "Offensive Midfielder Center/Forward":
                    recSkills += skill * weightR2[6][i];
                    recSkills2 += skill * weightR2[8][i];
                    break;
                case "Offensive Midfielder Left/Forward":
                case "Offensive Midfielder Right/Forward":
                    recSkills += skill * weightR2[7][i];
                    recSkills2 += skill * weightR2[8][i];
                    break;
                case "Offensive Midfielder/Midfielder Center":
                    recSkills += skill * weightR2[6][i];
                    recSkills2 += skill * weightR2[4][i];
                    break;
                case "Offensive Midfielder/Midfielder Left":
                case "Offensive Midfielder/Midfielder Right":
                    recSkills += skill * weightR2[7][i];
                    recSkills2 += skill * weightR2[5][i];
                    break;
                case "Midfielder Center/Forward":
                    recSkills += skill * weightR2[4][i];
                    recSkills2 += skill * weightR2[8][i];
                    break;
                case "Midfielder Left/Forward":
                case "Midfielder Right/Forward":
                    recSkills += skill * weightR2[5][i];
                    recSkills2 += skill * weightR2[8][i];
                    break;
            }
            
            i += 1;
        });
        
        if(favposition == "Goalkeeper"){
        	skills = parseInt(skills / 11 * 14);
        }
        
        var newPow = 6.9519770543;
        var newDiv = 199873144100.3349484929416253;
        
        var si = parseInt(Math.pow((skills / 5), newPow) / newDiv);  

        var td = $("table.info_table tbody tr:eq(6) td:eq(1)");
        
        td.append(" | " + si);

        if(recSkills > 0){
            recSkills /= 5;
            recSkills2 /= 5;
            
            switch(favposition){
                case "Defender Center": 
                    recSkills = (recSkills - weightR2[0][14]) / weightR2[0][15];
                    break;
                case "Defender Left":
                case "Defender Right":
                    recSkills = (recSkills - weightR2[1][14]) / weightR2[1][15];
                    break;
                case "Defensive Midfielder Center":
                    recSkills = (recSkills - weightR2[2][14]) / weightR2[2][15];
                    break;
                case "Defensive Midfielder Left":
                case "Defensive Midfielder Right":
                    recSkills = (recSkills - weightR2[3][14]) / weightR2[3][15];
                    break;
                case "Midfielder Center":
                    recSkills = (recSkills - weightR2[4][14]) / weightR2[4][15];
                    break;
                case "Midfielder Left":
                case "Midfielder Right":
                    recSkills = (recSkills - weightR2[5][14]) / weightR2[5][15];
                    break;
                case "Offensive Midfielder Center":
                    recSkills = (recSkills - weightR2[6][14]) / weightR2[6][15];
                    break;
                case "Offensive Midfielder Left":
                case "Offensive Midfielder Right":
                    recSkills = (recSkills - weightR2[7][14]) / weightR2[7][15];
                    break;
                case "Forward":
                    recSkills = (recSkills - weightR2[8][14]) / weightR2[8][15];
                    break;
                case "Goalkeeper":
                    recSkills = recSkills / 11 * 14;
                    recSkills = (recSkills - weightR2[9][14]) / weightR2[9][15];
                    break;
                case "Defender Center/Forward":
                    recSkills = (recSkills - weightR2[0][14]) / weightR2[0][15];
                    recSkills2 = (recSkills2 - weightR2[8][14]) / weightR2[8][15];
                    break;
                case "Defender Center/Left":
                case "Defender Center/Right":
                    recSkills = (recSkills - weightR2[0][14]) / weightR2[0][15];
                    recSkills2 = (recSkills2 - weightR2[1][14]) / weightR2[1][15];
                    break;
                case "Defender Left/Center":
                case "Defender Right/Center":
                    recSkills = (recSkills - weightR2[1][14]) / weightR2[1][15];
                    recSkills2 = (recSkills2 - weightR2[0][14]) / weightR2[0][15];
                    break;
                case "Defender Left/Right":
                case "Defender Right/Left":
                    recSkills = (recSkills - weightR2[1][14]) / weightR2[1][15];
                    recSkills2 = (recSkills2 - weightR2[1][14]) / weightR2[1][15];
                    break;
                case "Defender/Defensive Midfielder Center":
                    recSkills = (recSkills - weightR2[0][14]) / weightR2[0][15];
                    recSkills2 = (recSkills2 - weightR2[2][14]) / weightR2[2][15];
                    break;
                case "Defender/Defensive Midfielder Left":
                case "Defender/Defensive Midfielder Right":
                    recSkills = (recSkills - weightR2[1][14]) / weightR2[1][15];
                    recSkills2 = (recSkills2 - weightR2[3][14]) / weightR2[3][15];
                    break;
                case "Defender/Midfielder Left":
                case "Defender/Midfielder Right":
                    recSkills = (recSkills - weightR2[1][14]) / weightR2[1][15];
                    recSkills2 = (recSkills2 - weightR2[5][14]) / weightR2[5][15];
                    break;
                case "Defensive Midfielder/Defender Left":
                case "Defensive Midfielder/Defender Right":
                    recSkills = (recSkills - weightR2[3][14]) / weightR2[3][15];
                    recSkills2 = (recSkills2 - weightR2[1][14]) / weightR2[1][15];
                    break;
                case "Defensive Midfielder Left/Right":
                case "Defensive Midfielder Right/Left":
                    recSkills = (recSkills - weightR2[3][14]) / weightR2[3][15];
                    recSkills2 = (recSkills2 - weightR2[3][14]) / weightR2[3][15];
                    break;
                case "Defensive Midfielder/Defender Center":
                    recSkills = (recSkills - weightR2[2][14]) / weightR2[2][15];
                    recSkills2 = (recSkills2 - weightR2[0][14]) / weightR2[0][15];
                    break;
                case "Defensive Midfielder/Midfielder Center":
                    recSkills = (recSkills - weightR2[2][14]) / weightR2[2][15];
                    recSkills2 = (recSkills2 - weightR2[4][14]) / weightR2[4][15];
                    break;
                case "Defensive Midfielder Center/Left":
                case "Defensive Midfielder Center/Right":
                    recSkills = (recSkills - weightR2[2][14]) / weightR2[2][15];
                    recSkills2 = (recSkills2 - weightR2[3][14]) / weightR2[3][15];
                    break;
                case "Defensive Midfielder Left/Center":
                case "Defensive Midfielder Right/Center":
                    recSkills = (recSkills - weightR2[3][14]) / weightR2[3][15];
                    recSkills2 = (recSkills2 - weightR2[2][14]) / weightR2[2][15];
                    break;
                case "Defensive Midfielder/Midfielder Left":
                case "Defensive Midfielder/Midfielder Right":
                    recSkills = (recSkills - weightR2[3][14]) / weightR2[3][15];
                    recSkills2 = (recSkills2 - weightR2[5][14]) / weightR2[5][15];
                    break;
                case "Midfielder/Defensive Midfielder Center":
                    recSkills = (recSkills - weightR2[4][14]) / weightR2[4][15];
                    recSkills2 = (recSkills2 - weightR2[2][14]) / weightR2[2][15];
                    break;
                case "Midfielder Center/Left":
                case "Midfielder Center/Right":
                    recSkills = (recSkills - weightR2[4][14]) / weightR2[4][15];
                    recSkills2 = (recSkills2 - weightR2[5][14]) / weightR2[5][15];
                    break;
                case "Midfielder Left/Center":
                case "Midfielder Right/Center":
                    recSkills = (recSkills - weightR2[5][14]) / weightR2[5][15];
                    recSkills2 = (recSkills2 - weightR2[4][14]) / weightR2[4][15];
                    break;
                case "Midfielder Left/Right":
                case "Midfielder Right/Left":
                    recSkills = (recSkills - weightR2[5][14]) / weightR2[5][15];
                    recSkills2 = (recSkills2 - weightR2[5][14]) / weightR2[5][15];
                    break;
                case "Midfielder/Offensive Midfielder Center":
                    recSkills = (recSkills - weightR2[4][14]) / weightR2[4][15];
                    recSkills2 = (recSkills2 - weightR2[6][14]) / weightR2[6][15];
                    break;
                case "Midfielder/Offensive Midfielder Left":
                case "Midfielder/Offensive Midfielder Right":
                    recSkills = (recSkills - weightR2[5][14]) / weightR2[5][15];
                    recSkills2 = (recSkills2 - weightR2[7][14]) / weightR2[7][15];
                    break;
                case "Midfielder/Defensive Midfielder Left":
                case "Midfielder/Defensive Midfielder Right":
                    recSkills = (recSkills - weightR2[5][14]) / weightR2[5][15];
                    recSkills2 = (recSkills2 - weightR2[3][14]) / weightR2[3][15];
                    break;
                case "Offensive Midfielder Center/Left":
                case "Offensive Midfielder Center/Right":
                    recSkills = (recSkills - weightR2[6][14]) / weightR2[6][15];
                    recSkills2 = (recSkills2 - weightR2[7][14]) / weightR2[7][15];
                    break;
                case "Offensive Midfielder Left/Center":
                case "Offensive Midfielder Right/Center":
                    recSkills = (recSkills - weightR2[7][14]) / weightR2[7][15];
                    recSkills2 = (recSkills2 - weightR2[6][14]) / weightR2[6][15];
                    break;
                case "Offensive Midfielder Right/Left":
                case "Offensive Midfielder Left/Right":
                    recSkills = (recSkills - weightR2[7][14]) / weightR2[7][15];
                    recSkills2 = (recSkills2 - weightR2[7][14]) / weightR2[7][15];
                    break;
                case "Offensive Midfielder Center/Forward":
                    recSkills = (recSkills - weightR2[6][14]) / weightR2[6][15];
                    recSkills2 = (recSkills2 - weightR2[8][14]) / weightR2[8][15];
                    break;
                case "Offensive Midfielder Left/Forward":
                case "Offensive Midfielder Right/Forward":
                    recSkills = (recSkills - weightR2[7][14]) / weightR2[7][15];
                    recSkills2 = (recSkills2 - weightR2[8][14]) / weightR2[8][15];
                    break;
                case "Offensive Midfielder/Midfielder Center":
                    recSkills = (recSkills - weightR2[6][14]) / weightR2[6][15];
                    recSkills2 = (recSkills2 - weightR2[4][14]) / weightR2[4][15];
                    break;
                case "Offensive Midfielder/Midfielder Left":
                case "Offensive Midfielder/Midfielder Right":
                    recSkills = (recSkills - weightR2[7][14]) / weightR2[7][15];
                    recSkills2 = (recSkills2 - weightR2[5][14]) / weightR2[5][15];
                    break;
                case "Midfielder Center/Forward":
                    recSkills = (recSkills - weightR2[4][14]) / weightR2[4][15];
                    recSkills2 = (recSkills2 - weightR2[8][14]) / weightR2[8][15];
                    break;
                case "Midfielder Left/Forward":
                case "Midfielder Right/Forward":
                    recSkills = (recSkills - weightR2[5][14]) / weightR2[5][15];
                    recSkills2 = (recSkills2 - weightR2[8][14]) / weightR2[8][15];
                    break;
            }
            
            td.append(" | " + recSkills.toFixed(2).toString());
            
            if(recSkills2 > 0){
            	td.append(" | " + recSkills2.toFixed(2).toString());
            }
        }
    };
});