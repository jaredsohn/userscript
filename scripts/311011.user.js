// ==UserScript==
// @name       Player Growth Table
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Player Growth Table
// @match      http://*.hattrick.org/Club/Players/*
// @copyright  2012+, You
// ==/UserScript==

var polinom=[0,0.04912625,0.225855,0.39528625,0.55742,0.71225625,0.859795,1.00003625,1.13298,1.25862625,1.376975,1.48802625,1.59178,1.68823625,1.777395,1.85925625,1.93382,2.00108625,2.061055,2.11372625,2.1591];
var agekoef=[1,0.982,0.963,0.946,0.928,0.911,0.894, 0.877,0.861,0.845,0.830,0.814,0.799,0.784,0.770,0.756,0.742,0.728];
var skillkoef=[0.3520,0.3761,0.4038,0.4360,0.4740,0.5194,0.5747,0.6435,0.7316,0.8482,1.0105,1.2519,1.3625,1.5000,1.6761,1.9112,2.2443,2.7608,3.6967,6.0892];
var assistkoef=[0.970000,0.98222,0.98631,0.98914,0.99138,0.99326,0.99490,0.99635,0.99767,0.99888,1.000000];
var coachkoef=[0,0,0,0,0.774,0.867,0.9430,1,1.045];
var agetable=[0.000,16.000,31.704,47.117,62.246,77.094,91.668,105.972,120.012,133.791,147.316,160.591,173.620,186.408,198.960,211.279,223.370,235.238];
var sname = ["Disastrous (1)", "Wretched (2)", "Poor (3)", "Weak (4)", "Inadequate (5)", "Passable (6)", "Solid (7)", "Excellent (8)", "Formidable (9)", "Outstanding (10)", "Brilliant (11)", "Magnificent (12)", "Worldclass (13)", "Supernatural (14)", "Titanic (15)", "Extra-terrestrial (16)", "Mythical (17)", "Magical (18)", "Utopian (19)", "Divine (20)"];

var skillComboRef = ['getPlayerKeeper','getPlayerDef','getPlayerDef','getPlayerWing','getPlayerWing','getPlayerPM','getPlayerScore','getPlayerSP','getPlayerPass','getPlayerPass','getPlayerSP','getPlayerSP']
var skillComboCoef = ['0.31','0.1705','0.0855','0.29','0.174','0.2010','0.1935','0.09','0.2180','0.185','0.93','1.1625']
var skillComboDesc = ['Keeper','Defending','Defensive positions','Crossing (Winger)','Wing attack','Playmaking','Scoring','Shooting','Short passes','Through passes','Set pieces','Set pieces +25%']
var maxSkill = getPlayerMaxSkill()[0];

$j("#skillCombo").remove();
var skillCombo = "<select id='skillCombo'>"
for (var i=0; i < skillComboRef.length; i++) {
    skillCombo += "<option val='"+skillComboCoef[i]+"' ref='"+skillComboRef[i]+"'>"+skillComboDesc[i]+"</option>";
}
skillCombo += "</select>";
$j("#mainBody").append("<h2 class='playerGrowth'>Player Growth</h2>");
$j("#mainBody").append('<div id="playerGrowthTable" style="display:none"></div>');
$j("#mainBody #playerGrowthTable").append(skillCombo);
$j("#skillCombo option[ref=getPlayer"+maxSkill+"]").eq(0).attr("selected",true).prop('selected', true);
$j('h2.playerGrowth').css('cursor','pointer').click(function(){
    $j('#playerGrowthTable').toggle();
})


var style = "";
style += "<style>";
style += "	#mainBody #playerGrowthTable .tbr > *, #mainBody #playerGrowthTable .tbhd > * {display:inline-table;}";
style += "	#mainBody #playerGrowthTable .cl1 {width:34%;}";
style += "	#mainBody #playerGrowthTable .cl2 {width:22%;}";
style += "	#mainBody #playerGrowthTable .cl3 {width:22%;}";
style += "	#mainBody #playerGrowthTable .cl4 {width:22%;}";
style += "	.cl1, .cl2, .cl3, .cl4 {";
style += "		width: 125px;";
style += "		float: left;";
style += "		font-size: 13px;";
style += "		text-align: center;";
style += "	}";
style += "	.cl1 { text-align: center; }";
style += "	#playerGrowthTable > * {";
style += "		line-height: 23px;";
style += "	}";
style += "	.tbhd {";
style += "		font-weight: bold;";
style += "		font-family: Verdana;";
style += "		background: #d4eeb0;";
style += "		border-bottom: 1px solid #d4eeb0;";
style += "		font-weight: bold;";
style += "	}";
style += "	.tbr {";
style += "		border-bottom: 1px solid #d4eeb0;";
style += "		font-family: Verdana;";
style += "		background-color:rgb(224, 254, 184)!important;";
style += "	}";
style += "</style>";
$j("#mainBody").append(style);

$j("#mainBody #skillCombo").change(function(){
	calcTrain();
})

function calcTrain() {
	
    var previousWeeks		= 0;
    var totalDays			= 0;
    var totalWeeks			= 0;
    var totalYears			= 0;
    var totalTime			= "";
	var x_years				= parseInt(getPlayerYears());
	var x_days				= parseInt(getPlayerDays());
	var x_skill_level 		= eval($j('#skillCombo option:selected').attr('ref')+"()");
	var x_sub_skill_level	= $j('.ft-psico-mainBox tr:eq(4) td:eq(1)').text().split(".")[1];
	var x_coach_level		= 7;
	var x_assistants		= 10;
	var x_intensity			= 100;
	var x_stamina 			= 12;
	var x_skill_train		= $j('#skillCombo option:selected').attr('val');

	var x_years_val 			= x_years
	var x_days_val 				= x_days
	var x_skill_train_val		= parseFloat(x_skill_train);
	var x_skill_level_val 		= parseInt(x_skill_level);
	var x_sub_skill_level_val 	= x_sub_skill_level / 100;
	var x_coach_level_val		= coachkoef[x_coach_level]
	var x_assistants_val		= assistkoef[x_assistants]
	var x_intensity_val			= x_intensity / 100;
	var x_stamina_val			= (100 - x_stamina) / 100;

	var years=x_years_val;
	var days=x_days_val;
	var level=x_skill_level_val;
	var sublevel=x_sub_skill_level_val;
	
	var coachK=x_coach_level_val;
	var assistK=x_assistants_val;
	var intensK=x_intensity_val;
	var staminaK=x_stamina_val;
	var trainK=x_skill_train_val;
	var totalK=coachK*assistK*intensK*staminaK*trainK;
	
	var years0=agetable[years-17];
	var years1=agetable[years-16];
	var age0=(days/112)*(years1-years0)+years0;
	var age1=years*1+days/112;
	
	var oldweek=years*112+days*1;
	var ageee=years*1+days/112;
	var shtraf=0;
	var drop=0;
    $j("#mainBody #playerGrowthTable > :not(#skillCombo)").remove();
	$j("#mainBody #playerGrowthTable").append('<div class="tbhd"><div class="cl1">'+$j('#skillCombo option:selected').text()+'</div><div class="cl2">Weeks</div><div class="cl3">Days</div><div class="cl4">Total Weeks</div><br clear="all"></div>');
	
	for (lev=level+1;lev<=20;lev++) {
		if (lev<9) {
			xxx1=(Math.pow(lev,1.72)-1)*(1/6.0896/1.72);
		} else {
			xxx1=2.45426+(1/4.7371/1.96)*Math.pow(lev-5,1.96);
		}
		if (level<9) {
			yyy1=(Math.pow(level+sublevel,1.72)-1)*(1/6.0896/1.72);
		} else {
			yyy1=2.45426+Math.pow(level+sublevel-5,1.96)*(1/4.7371/1.96);
		}
		xxx=(xxx1-yyy1)/totalK+age0;
		for (i=17;i<=34;i++) {
			if (xxx<=agetable[i-17]) break;
		}
		agge=i-1;
		stolH=agetable[agge-17];
		stolI=agetable[agge-16];
		ageeeold=ageee;
		ageee=agge+(xxx-stolH)/(stolI-stolH);
		
		if (lev>(level+sublevel+1)) {
			sh=1;
			shtrafx=1/16-ageee+ageeeold;
			if (shtrafx>0) {
				shtraf=shtraf+shtrafx;
			}
		} else {
			sh=2;
			shtrafx=(1/16-ageee+years*1+days/112)*(lev-(level+sublevel));
			if (shtrafx>0) {
				shtraf=shtraf+shtrafx;
			}
		}
		if (lev>15) {
			drop=(0.00112/3)*(Math.pow((lev-15),3)-Math.pow((lev-16),3));
		} else {
			drop=0;
		}
		if (lev<=15) {
			age1=ageee;
		}
		if (lev>15) {
			age1=age1+(ageee-ageeeold)/(1-drop*(ageee-ageeeold)*16);
		}
		var resyears=Math.floor(age1+shtraf+0.0089);
		var resdays=Math.floor((age1+shtraf-resyears+0.0089)*112);
		var weekss=((resyears*112+resdays)-(oldweek))/7;
		oldweek=resyears*112+resdays;
		
		if (resdays<10) {
			resdays='0'+resdays;
		}
		if (resyears>31) break;
		if (isNaN(resyears)) break;
		
        previousWeeks += parseFloat(weekss.toFixed(1));
        totalYears = previousWeeks/15;
        totalWeeks = (totalYears - Math.floor(totalYears)) * 15;
        if(totalWeeks-Math.floor(totalWeeks) > 0) totalWeeks++;
        totalTime = Math.floor(totalYears) + "y " + Math.floor(totalWeeks) + "w";
		$j("#mainBody #playerGrowthTable").append('<div class="tbr" onMouseover="this.style.backgroundColor=\'#d4eeb0\';" uuups="this.style.backgroundColor=\'#E0FEB8\';"><div class="cl1">'+sname[lev-1]+'</div><div class="cl2">'+weekss.toFixed(1)+'</div><div class="cl3">'+resyears+'.'+resdays+'</div><div class="cl4">'+totalTime+'</div><br clear="all"></div>');
	}
}
$j("#skillCombo").trigger("change");

unsafeWindow.gpi = gpi;
unsafeWindow.gph = gph;
unsafeWindow.calcTrain = calcTrain;

gpi()