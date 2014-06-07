// ==UserScript==
// @name           Highlight Attributes Archetype Fix
// @namespace      Greasemonkey
// @include        http://goallineblitz.com/game/player.pl?player_id=*
// @version        10.06.04
// ==/UserScript==

/*
 * written by forestmb @userscripts.org
 * modified by peteb @userscripts.org
 * modified by raiderdav @userscripts.org
 * modified by pabst 12/23/08+
 * modified by Tical2k
 * modified by txrulz
 * modified by numone
 * modified by Bogleg 10.06.04 and passed back to numone
 */
(function(){
	var player_name = document.getElementsByClassName("large_title_bar")[0].firstChild.innerHTML;
	var position = document.getElementsByClassName("position")[0].innerHTML;
	var archetypeholder = document.getElementsByClassName("large_title_bar")[0].children[1];
	var innerarchetype = archetypeholder.firstChild;
	var archetype = innerarchetype.getAttribute('onmouseover').split("'")[1];
	
   var buildTypes = createBuilds(position);
   	if(!archetype){
		createDropDown(buildTypes);
	}else{
		highlightAttributes(buildTypes,archetype);
	}

   // insert the color key
   var colorKeyDiv = document.createElement("div");
   colorKeyDiv.setAttribute("id","colorKeyDiv");
   colorKeyDiv.innerHTML = "<span style='background:#59FF61;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>-Major <span style='background:#59CDFF;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>-Minor";
   var player_stats_table = getElementsByClassName("player_stats_table", document);
   player_stats_table[0].parentNode.insertBefore(colorKeyDiv, player_stats_table[0].nextSibling);

   var css = '#selectBuild,#selectBuild>option {font-weight:400;background-color:#FBFBF8;color:#a03c19;font-size:12px;font-family:arial;}';
   
   addGlobalStyle(css);
   
})()

function createDropDown(buildTypes){
   var selectBuild = document.createElement("select");
   selectBuild.setAttribute("id","selectBuild");
   selectBuild.setAttribute("style","float:right;");
   
   selectBuild.addEventListener('change', (function(n) {
      		return function (e) {
      			e.preventDefault();
      			highlightAttributes(n);
      		};
      	})(buildTypes), true);
   
   var option = document.createElement('option');
   option.text = 'Select Build Type';
   option.value = '';
   selectBuild.options.add(option,null);

   for(var i=0; i<buildTypes.length; i++){
      option = document.createElement('option');
      option.text = buildTypes[i].name;
      option.value = buildTypes[i].name;
      selectBuild.options.add(option,selectBuild.length);
   }
   
   //must insert compare element before "Player Attributes" for float to work correctly
   var medhead = getElementsByClassName('medium_head',document);   
   medhead[1].childNodes[0].parentNode.insertBefore(selectBuild, medhead[1].childNodes[0]);
};

function highlightAttributes(buildTypes,selectedName){
	if(!selectedName){
		var selectBuild = document.getElementById("selectBuild");
		selectedName = selectBuild.options[selectBuild.selectedIndex].value;
	}
	var type;
	if(selectedName!=''){
		for(var i=0; i<buildTypes.length; i++){
			if(buildTypes[i].name == selectedName)
			type = buildTypes[i];
		}

		var importantColor = "#59FF61";
		var otherColor = "#59CDFF";      

		// sas
		var sas = getElementsByClassName("skill_button",document.getElementById('player_skill_trees'));
		for(var i=0;i<sas.length;i++){
			var sa;
			try {
				sa = sas[i].style.backgroundImage.match(/\/skills\/(.+?)\.(?:bonus\.|penalty\.)?gif\b/)[1];
			} catch(e) {
				console.error('sas['+i+'] = ', sas[i]);
				console.error('sas['+i+'].style.backgroundImage = ', sas[i].style.backgroundImage);
				continue;
			}
			if (sa in type.affectedSAs) {
				sas[i].style.backgroundImage = sas[i].style.backgroundImage.replace(/(?:\.bonus|\.penalty)?\.gif\b/, '.' + type.affectedSAs[sa] + '.gif');
			} else {
				// clear out what was already there
				sas[i].style.backgroundImage = sas[i].style.backgroundImage.replace(/\.(?:bonus|penalty)\.gif\b/,'.gif');
			}
		}
		
		// atts
		var stat_head = getElementsByClassName("stat_head_tall",document);
		for(var i = 0;i < stat_head.length;i++){
			// clear out current atts
			stat_head[i].style.background = "none";
			
			// add majors coloring
			for(var j=0; j<type.keys.length; j++){
				if((type.keys[j] + ":") == stat_head[i].innerHTML){	
					stat_head[i].style.background = importantColor;
					break;
				}
			}
			
			// add minors coloring
			for(var j=0; j<type.other.length; j++){
				if((type.other[j] + ":") == stat_head[i].innerHTML){	
					stat_head[i].style.background = otherColor;
				}
			}
			
		}
	}
}

function createBuilds(position){
   var buildTypes = new Array();
   
   switch(position){
      case "FB":
		buildTypes[0] = new build("Rusher","Agility,Carrying,Confidence,Strength","Blocking,Speed,Stamina,Vision","power_through,cut","lead_block,pancake");
		buildTypes[1] = new build("Blocker","Agility,Blocking,Strength,Vision","Carrying,Confidence,Speed,Stamina","lead_block,pancake","power_through,cut");
		buildTypes[2] = new build("Combo Back","Agility,Blocking,Carrying,Strength,Vision","Catching,Confidence,Jumping,Speed");
		buildTypes[3] = new build("Scat Back","Agility,Catching,Speed,Vision","Blocking,Carrying,Confidence,Jumping","sticky_hands,cut","lead_block,pancake");
		buildTypes[4] = new build("Special Teamer","Agility,Blocking,Speed,Stamina,Tackling","Confidence,Strength,Vision");
        break;    
      case "QB":
		buildTypes[0] = new build("Pocket Passer","Confidence,Throwing,Vision","Agility,Stamina,Strength,Carrying","pump_fake,tight_spiral","on_the_run,dump_pass");
		buildTypes[1] = new build("Deep Passer","Strength,Throwing,Vision","Agility,Confidence,Stamina,Carrying","pump_fake,turn_the_shoulder","on_the_run,dump_pass");
		buildTypes[2] = new build("Scrambler","Agility,Throwing,Vision","Confidence,Speed,Strength,Carrying","on_the_run,dump_pass","pump_fake,tight_spiral");
        break;
      case "HB":
		buildTypes[0] = new build("Power Back","Agility,Carrying,Confidence,Strength","Jumping,Speed,Stamina,Vision","lower_the_shoulder,power_through","first_step,spin");
		buildTypes[1] = new build("Elusive Back","Agility,Carrying,Speed,Vision","Catching,Confidence,Strength,Stamina","head_fake,juke","lower_the_shoulder,power_through");
		buildTypes[2] = new build("Scat Back","Agility,Carrying,Catching,Speed","Confidence,Jumping,Stamina,Vision","cut,first_step","lower_the_shoulder,power_through");
		buildTypes[3] = new build("Combo Back","Carrying,Confidence,Speed,Strength,Vision","Agility,Catching,Jumping,Stamina");
		buildTypes[4] = new build("Returner","Agility,Carrying,Speed,Stamina,Vision","Confidence,Jumping,Strength","first_step,cut","stiff_arm,power_through");
		buildTypes[5] = new build("Special Teamer","Agility,Blocking,Speed,Stamina,Tackling","Confidence,Strength,Vision");
        break;
      case "WR":
		buildTypes[0] = new build("Speedster","Agility,Catching,Confidence,Speed,Vision","Carrying,Jumping,Stamina","first_step,cut","route_running,sticky_hands");
		buildTypes[1] = new build("Possession Receiver","Agility,Carrying,Catching,Jumping,Vision","Confidence,Speed,Stamina","route_running,sticky_hands","first_step,cut");
		buildTypes[2] = new build("Power Receiver","Agility,Carrying,Catching,Strength,Vision","Confidence,Speed,Stamina");
		buildTypes[3] = new build("Returner","Agility,Carrying,Speed,Stamina,Vision","Confidence,Jumping,Strength","first_step,cut","route_running,sticky_hands");
		buildTypes[4] = new build("Special Teamer","Agility,Blocking,Speed,Stamina,Tackling","Confidence,Strength,Vision");
        break;
      case "TE":
		buildTypes[0] = new build("Blocker","Agility,Blocking,Confidence,Strength,Vision","Catching,Speed,Stamina","get_low,pancake","route_running,cut");
		buildTypes[1] = new build("Power Receiver","Agility,Carrying,Confidence,Catching,Strength","Blocking,Speed,Stamina","cover_up,lower_the_shoulder","get_low,pancake");
		buildTypes[2] = new build("Receiver","Agility,Carrying,Catching,Speed,Vision","Blocking,Stamina,Strength","route_running,cut","get_low,pancake");
		buildTypes[3] = new build("Dual Threat","Agility,Blocking,Catching,Strength,Vision","Confidence,Jumping,Speed"); 
		buildTypes[4] = new build("Special Teamer","Agility,Blocking,Speed,Stamina,Tackling","Confidence,Strength,Vision");
        break;
      case "C":
		buildTypes[0] = new build("Pass Blocker","Agility,Blocking,Confidence,Vision","Speed,Stamina,Strength","pass_block,foundation","get_low,pancake");
		buildTypes[1] = new build("Run Blocker","Blocking,Confidence,Strength,Vision","Agility,Speed,Stamina","get_low,pancake","pass_block,foundation");
		buildTypes[2] = new build("Special Teamer","Agility,Blocking,Speed,Stamina,Tackling","Confidence,Strength,Vision");
        break;
      case "G":
		buildTypes[0] = new build("Pass Blocker","Agility,Blocking,Confidence,Vision","Speed,Stamina,Strength","pass_block,foundation","get_low,pancake");
		buildTypes[1] = new build("Run Blocker","Blocking,Confidence,Strength,Vision","Agility,Speed,Stamina","get_low,pancake","pass_block,foundation");
		buildTypes[2] = new build("Special Teamer","Agility,Blocking,Speed,Stamina,Tackling","Confidence,Strength,Vision");
        break;
      case "OT":
		buildTypes[0] = new build("Pass Blocker","Agility,Blocking,Confidence,Vision","Speed,Stamina,Strength","pass_block,protector","get_low,pancake");
		buildTypes[1] = new build("Run Blocker","Blocking,Confidence,Strength,Vision","Agility,Speed,Stamina","get_low,pancake","pass_block,protector");
		buildTypes[2] = new build("Special Teamer","Agility,Blocking,Speed,Stamina,Tackling","Confidence,Strength,Vision");
        break;
      case "DT":
		buildTypes[0] = new build("Run Stuffer","Agility,Strength,Tackling,Vision","Confidence,Speed,Stamina","wall,break_through","shed_block,swat_ball");
		buildTypes[1] = new build("Pass Rusher","Agility,Speed,Tackling,Vision","Confidence,Stamina,Strength","shed_block,swat_ball","wall,break_through");
		buildTypes[2] = new build("Combo Tackle","Speed,Strength,Tackling,Vision","Agility,Confidence,Stamina");
		buildTypes[3] = new build("Special Teamer","Agility,Blocking,Speed,Stamina,Tackling","Confidence,Strength,Vision");
        break;
      case "DE":
		buildTypes[0] = new build("Run Stuffer","Agility,Strength,Tackling,Vision","Confidence,Speed,Stamina","wall,strong_base","first_step,tunnel_vision");
		buildTypes[1] = new build("Pass Rusher","Agility,Speed,Tackling,Vision","Confidence,Stamina,Strength","first_step,tunnel_vision","wall,strong_base");
		buildTypes[2] = new build("Combo End","Speed,Strength,Tackling,Vision","Agility,Confidence,Stamina");
		buildTypes[3] = new build("Special Teamer","Agility,Blocking,Speed,Stamina,Tackling","Confidence,Strength,Vision");
        break;
      case "LB":
		buildTypes[0] = new build("Coverage Linebacker","Agility,Jumping,Speed,Vision","Confidence,Stamina,Strength,Tackling","diving_tackle,swat_ball","monster_hit,shed_block");
		buildTypes[1] = new build("Blitzer","Agility,Jumping,Speed,Tackling","Confidence,Stamina,Strength,Vision","shed_block,big_sack","aura_of_intimidation,diving_tackle");
		buildTypes[2] = new build("Hard Hitter","Agility,Strength,Tackling,Vision","Confidence,Jumping,Speed,Stamina","snarl,monster_hit","swat_ball,big_sack");
		buildTypes[3] = new build("Combo Linebacker","Agility,Confidence,Speed,Tackling,Vision","Jumping,Stamina,Strength");
		buildTypes[4] = new build("Special Teamer","Agility,Blocking,Speed,Stamina,Tackling","Confidence,Strength,Vision");
        break;
      case "CB":
		buildTypes[0] = new build("Man Specialist","Agility,Jumping,Speed,Vision","Catching,Confidence,Stamina,Tackling","shutdown_coverage","closing_speed");
		buildTypes[1] = new build("Zone Specialist","Agility,Speed,Tackling,Vision","Catching,Confidence,Jumping,Stamina","superior_vision","shutdown_coverage");
		buildTypes[2] = new build("Hard Hitter","Speed,Strength,Tackling,Vision","Agility,Confidence,Jumping,Stamina","closing_speed","change_direction");
		buildTypes[3] = new build("Combo Corner","Agility,Speed,Strength,Tackling","Confidence,Jumping,Stamina,Vision");
		buildTypes[4] = new build("Returner","Agility,Carrying,Speed,Stamina,Vision","Confidence,Jumping,Strength","change_direction,return_specialist","superior_vision,shutdown_coverage");
		buildTypes[5] = new build("Special Teamer","Agility,Blocking,Speed,Stamina,Tackling","Confidence,Strength,Vision");
        break;
      case "SS":
		buildTypes[0] = new build("Man Specialist","Agility,Jumping,Speed,Vision","Catching,Confidence,Stamina,Tackling","change_direction","big_hit");
		buildTypes[1] = new build("Zone Specialist","Agility,Speed,Tackling,Vision","Catching,Confidence,Jumping,Stamina","superior_vision","wrap_up_tackle");
		buildTypes[2] = new build("Hard Hitter","Speed,Strength,Tackling,Vision","Agility,Confidence,Jumping,Stamina","big_hit","change_direction");
		buildTypes[3] = new build("Combo Safety","Agility,Speed,Strength,Tackling","Confidence,Jumping,Stamina,Vision");
		buildTypes[4] = new build("Special Teamer","Agility,Blocking,Speed,Stamina,Tackling","Confidence,Strength,Vision");
        break;
      case "FS":
		buildTypes[0] = new build("Man Specialist","Agility,Jumping,Speed,Vision","Catching,Confidence,Stamina,Tackling","shutdown_coverage","big_hit");
		buildTypes[1] = new build("Zone Specialist","Agility,Speed,Tackling,Vision","Catching,Confidence,Jumping,Stamina","superior_vision","shutdown_coverage");
		buildTypes[2] = new build("Hard Hitter","Speed,Strength,Tackling,Vision","Agility,Confidence,Jumping,Stamina","big_hit","change_direction");
		buildTypes[3] = new build("Combo Safety","Agility,Speed,Strength,Tackling","Confidence,Jumping,Stamina,Vision");
		buildTypes[4] = new build("Special Teamer","Agility,Blocking,Speed,Stamina,Tackling","Confidence,Strength,Vision");
        break;
      case "K":
		buildTypes[0] = new build("Boomer","Confidence,Kicking,Strength","Agility,Jumping,Vision");
		buildTypes[1] = new build("Technician","Confidence,Kicking,Vision","Agility,Jumping,Strength");
        break;
      case "P":
		buildTypes[0] = new build("Boomer","Confidence,Punting,Strength","Agility,Jumping,Vision");
		buildTypes[1] = new build("Technician","Confidence,Punting,Vision","Agility,Jumping,Strength");
        break;
   }
   
   return buildTypes;
}

function build(n,keyAt,otherAt,bonusSA,penaltySA){
   this.name = n;
   this.keys = keyAt.split(",");
   this.other = otherAt.split(",");
	this.affectedSAs = {};
	if (bonusSA) for each (var sa in bonusSA.split(',')) {
		this.affectedSAs[sa] = 'bonus';
	}
	if (penaltySA) for each (var sa in penaltySA.split(',')) {
		this.affectedSAs[sa] = 'penalty';
	}
}

function getElementsByClassName(classname, par){
   var a=[];   
   var re = new RegExp('\\b' + classname + '\\b');    	
   var els = par.getElementsByTagName("*"); 
   for(var i=0,j=els.length; i<j; i++){       
      if(re.test(els[i].className)){	
         a.push(els[i]);
      }
   }
   return a;
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
