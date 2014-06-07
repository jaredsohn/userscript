// ==UserScript==
// @name           STBSkills
// @namespace      www.jespernohr.dk
// @description    STBSkills based on choosed position for a player, works in grid-iron.org, player details, english display language only!
// @include        http://www.grid-iron.org/index.php?page=club&subpage=pldetails*
// @include        http://grid-iron.org/index.php?page=club&subpage=pldetails*
// @version        0.1.2
// ==/UserScript==

//thx to pstimpel for the original highlight skills script that I have adapted to work with my philosophy
//you are a language admin? pls contact me for translation


var timeout = 100;

window.setTimeout( function(){
   var skills = createSkills();
   var buildTypes = createBuilds();

   var selectBuild = document.createElement("select");
   selectBuild.setAttribute("id","selectBuild");
   //selectBuild.setAttribute("style","float:right;");
   
   var selectedPlayerRole = document.getElementById('profile').parentNode.getElementsByTagName('table')[0].getElementsByTagName('tr')[5].childNodes[1].firstChild.nodeValue.substring(12);
   
   selectBuild.addEventListener('change', (function(n) {
      		return function (e) {
      			e.preventDefault();
      			highlightAttributes(n);
      		};
      	})(buildTypes), true);
   
   var option = document.createElement('option');
   option.text = 'Select Position';
   option.value = '';
   selectBuild.options.add(option,null);
   for(var i=0; i<buildTypes.length; i++){
      option = document.createElement('option');
      option.text = buildTypes[i].name;
      option.value = buildTypes[i].name;
      selectBuild.options.add(option,selectBuild.length);
      
      if (buildTypes[i].shortName == selectedPlayerRole) {
         option.selected = "selected";
      }
   }

   
   // must insert compare element before "Player Attributes" for float to work correctly
   var medhead = document.getElementById('profile');   
   
   medhead.parentNode.insertBefore(selectBuild, medhead);

   // insert the color key
   var colorKeyDiv = document.createElement("div");
   colorKeyDiv.setAttribute("id","colorKeyDiv");
   colorKeyDiv.innerHTML = "<font style='font-size: 10px; font-family: verdana, arial, sans-serif;'><span style='background:#AACDCD;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> Primary <span style='background:#B3CDB3;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> Secondary  <span style='background:#CDCDA4;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> Tertiary</font>";
   var player_stats_table = document.getElementById("profile");
   
   player_stats_table.parentNode.insertBefore(colorKeyDiv, player_stats_table);

   var css = '#selectBuild,#selectBuild>option {font-weight:400;background-color:#FFFFFF;color:#000000;font-size:10px;font-family: verdana, arial;}';
   
   addGlobalStyle(css);
   
   highlightAttributes(buildTypes);
   
},timeout);

function highlightAttributes(buildTypes){
	var skills = createSkills();
   var selectBuild = document.getElementById("selectBuild");
   
   var selectedName = selectBuild.options[selectBuild.selectedIndex].value;  
   
   var type;
   if(selectedName!=''){
      for(var i=0; i<buildTypes.length; i++)	{
         if(buildTypes[i].name == selectedName) {
            type = buildTypes[i];
	    
	    }
      }
      
      var primaryColor = "#AACDCD";
      var secondaryColor = "#B3CDB3";      
      var tertiaryColor="#CDCDA4";
      
      
      var allSkills, thisSkill;
      //reset background color
      allSkills = document.evaluate(
	    '//td[@style]',
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	    
	for (var k = 0; k < allSkills.snapshotLength; k++) {
		thisSkill = allSkills.snapshotItem(k);
		for (var y=0;y<skills.length;y++) {
			if(skills[y]==thisSkill.innerHTML) { 
			thisSkill.style.background="";
			
			}
		}
		
	}
	
      
      //set new background color
	allSkills = document.evaluate(
	    '//td[@style="font-family: verdana,arial,sans-serif; font-size: 12px; padding-left: 2px;"]',
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	   
	   
	for (var k = 0; k < allSkills.snapshotLength; k++) {
		thisSkill = allSkills.snapshotItem(k);
		var bgcolor="";
		
		for (var y=0;y<skills.length;y++) {
			
			if(skills[y]==thisSkill.innerHTML) {
				 
				for(var i=0; i<type.keys_primary.length; i++){
					if((type.keys_primary[i]) == thisSkill.innerHTML){	
						bgcolor = primaryColor;
						
					}
					
				}
				for(var i=0; i<type.keys_secondary.length; i++){
					if((type.keys_secondary[i]) == thisSkill.innerHTML){	
						bgcolor = secondaryColor;
						
					}
					
				}
				for(var i=0; i<type.keys_tertiary.length; i++){
					if((type.keys_tertiary[i]) == thisSkill.innerHTML){	
						bgcolor = tertiaryColor;
						
					}
					
				}
				thisSkill.style.background=bgcolor;
			}
			
		
			
		}
		
		
	}
       
      
   }
   
}
function createSkills(){
	var skills = new Array();
	skills[0]="Positioning";
	skills[1]="Vision";
	skills[2]="Intelligence";
	skills[3]="Footwork";
	skills[4]="Carrying";
	skills[5]="Tackling";
	skills[6]="Blocking";
	skills[7]="Passing";
	skills[8]="Catching";
	skills[9]="Kicking";
	skills[10]="Punting";
	skills[11]="Speed";
	skills[12]="Strength";
	skills[13]="Agility";
	skills[14]="Stamina";
	skills[15]="Teamwork";
	skills[16]="Consistency";
	return skills;

}
function createBuilds(){

   var buildTypes = new Array();
   buildTypes[0] = new build("Quarterback", "QB (Quarterback, Offense)","Passing,Vision,Intelligence","Agility","Consistency");
   
   buildTypes[1] = new build("Wide Receiver", "WR (Wide Receiver, Offense)","Agility,Catching,Speed","Strength","");
   
   buildTypes[2] = new build("Running Back", "HB (Halfback, Offense)","Strength,Speed,Carrying,Agility","Blocking,Footwork","");
   
   buildTypes[3] = new build("FB", "FB (Fullback, Offense)","Footwork,Strength,Blocking","Agility,Speed.Carrying","");
   
   buildTypes[4] = new build("Tight End", "TE (Tight End, Offense)","Catching,Agility,Strength","Blocking,Speed,Footwork","");
   
   buildTypes[5] = new build("OC", "OC (Offensive Center, Offense)","Blocking,Strength,Footwork","Agility","Intelligence");
   
   buildTypes[6] = new build("OG", "OG (Offensive Guard, Offense)","Blocking,Strength,Footwork","Agility","");
   
   buildTypes[7] = new build("OT", "OT (Offensive Tackle, Offense)","Blocking,Strength,Footwork","Agility","Speed");
   
   buildTypes[8] = new build("DE" ,"DE (Defensive End, Defense)","Speed,Strength,Agility,Tackling","Footwork","");
   
   buildTypes[9] = new build("DT/NT", "DT/NT (Defensive/Noose Tackle, Defense)","Tackling,Strength,Footwork","Agility","");
   
   buildTypes[10] = new build("OLB", "OLB (Outside Linebacker, Defense)","Tackling,Speed,Strength","Agility,Positioning,Vision","");
   
   buildTypes[11] = new build("MLB", "MLB (Middle Linebacker, Defense)","Tackling,Strength,Intelligence","Speed,Agility,Positioning,Vision","Consistency");
   
   buildTypes[12] = new build("SS", "SS (Strong Safety, Defense)","Tackling,Speed,Strength,Intelligence","Agility,Positioning,Vision","");
   
   buildTypes[13] = new build("FS", "FS (Free, Safety, Defense)","Tackling,Speed,Intelligence,Positioning","Agility,Strength,Vision","");
   
   buildTypes[14] = new build("Cornerback", "CB (Cornerback, Defense)","Tackling,Positioning,Speed","Agility,Vision,Strength","");
   
   buildTypes[15] = new build("Kicker", "K (Kicker, SpecialTeam)","Kicking","Strength","Consistency");
   
   buildTypes[16] = new build("P", "P (Punter, SpecialTeam)","Punting","Strength","Consistency");
   
   buildTypes[17] = new build("Gunner", "G (Gunner, SpecialTeam)","Tackling,Speed,Footwork","Agility,Strength,Vision,Positioning","");
   
   buildTypes[18] = new build("Kick returner", "KR (Kickreturner, SpecialTeam)","Carrying,Speed,Agility","Footwork,Catching,Strength","");
   
   buildTypes[19] = new build("STCB", "STCB (Cornerback, SpecialTeam)","Blocking,Positioning,Speed","Agility,Vision,Strength","");
        

   return buildTypes;
}



function build(shortName,n,primaryAt,secondaryAt,tertiaryAt){
   this.shortName = shortName;
   this.name = n;
   this.keys_primary = primaryAt.split(",");
   this.keys_secondary = secondaryAt.split(",");
   this.keys_tertiary = tertiaryAt.split(",");
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
