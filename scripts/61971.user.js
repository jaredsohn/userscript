// ==UserScript==
// @name           highlightSkills
// @namespace      peters-webcorner.de
// @description    highlight skills based on chosen position for a player,player details, english display language only!
// @include        http://www.teamhb.org/index.php?page=team&subpage=pldetails*
// @include        http://teamhb.org/index.php?page=team&subpage=pldetails*
// @version        0.0.0.1
// ==/UserScript==




var timeout = 100;

window.setTimeout( function(){
   var skills = createSkills();
   var buildTypes = createBuilds();

   var selectBuild = document.createElement("select");
   selectBuild.setAttribute("id","selectBuild");
   //selectBuild.setAttribute("style","float:right;");
   
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
   }

   
   // must insert compare element before "Player Attributes" for float to work correctly
   var medhead = document.getElementById('profile');   
   
   medhead.parentNode.insertBefore(selectBuild, medhead);

   // insert the color key
   var colorKeyDiv = document.createElement("div");
   colorKeyDiv.setAttribute("id","colorKeyDiv");
   colorKeyDiv.innerHTML = "<font style='font-size: 10px; font-family: verdana, arial, sans-serif;'><span style='background:red;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>-very important <span style='background:blue;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>-important  <span style='background:green;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>-very useful  <span style='background:yellow;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>-useful</font>";
   var player_stats_table = document.getElementById("profile");
   
   player_stats_table.parentNode.insertBefore(colorKeyDiv, player_stats_table);

   var css = '#selectBuild,#selectBuild>option {font-weight:400;background-color:#FFFFFF;color:#000000;font-size:10px;font-family: verdana, arial;}';
   
   addGlobalStyle(css);
   
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
      
      var veryimportantColor = "red";
      var importantColor = "blue";      
      var veryusefulColor="green";
      var usefulColor="yellow";
      
      
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
				 
				for(var i=0; i<type.keys_veryimportant.length; i++){
					if((type.keys_veryimportant[i]) == thisSkill.innerHTML){	
						bgcolor = veryimportantColor;
						
					}
					
				}
				for(var i=0; i<type.keys_important.length; i++){
					if((type.keys_important[i]) == thisSkill.innerHTML){	
						bgcolor = importantColor;
						
					}
					
				}
				for(var i=0; i<type.keys_veryuseful.length; i++){
					if((type.keys_veryuseful[i]) == thisSkill.innerHTML){	
						bgcolor = veryusefulColor;
						
					}
					
				}
				for(var i=0; i<type.keys_useful.length; i++){
					if((type.keys_useful[i]) == thisSkill.innerHTML){	
						bgcolor = usefulColor;
						
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
	skills[0]="Ball control";
	skills[1]="Passing";
	skills[2]="Shooting";
	skills[3]="Off the ball";
	skills[4]="Technique";
	skills[5]="Playmaking";
	skills[6]="Marking";
	skills[7]="Blocking";
	skills[8]="Reflexes";
	skills[9]="One on one";
	skills[10]="Agility";
	skills[11]="Speed";
	skills[12]="Strength";
	skills[13]="Jumping";
	skills[14]="Stamina";
	return skills;

}
function createBuilds(){

   var buildTypes = new Array();
   buildTypes[0] = new build("Goalkeeper","Reflexes","Technique","One on one","Agility","Speed","Stamina");
   buildTypes[1] = new build("Left/Right Wing (Offense)","Speed","Shooting","Jumping","Stamina");
   buildTypes[2] = new build("Left/Right Back (Offense)","Shooting","Passing","Jumping","Speed","Playmaking,Stamina,Technique");
   buildTypes[3] = new build("Center Back (Offense)","Playmaking","Technique","Passing","Ball control","Speed","Stamina,Shooting,Jumping");
   buildTypes[4] = new build("Pivot (Offense)","Off the ball","Strength","Shooting","Speed","Stamina");
   buildTypes[5] = new build("Forward Defender (Defense)","Marking","Blocking","Speed","","Stamina");
   buildTypes[6] = new build("Line Defender (Defense)","Blocking","Marking","Speed","","Stamina");
   buildTypes[7] = new build("Outside Defender (Defense)","Marking","Blocking","Speed","","Stamina");
   buildTypes[8] = new build("Half Defender (Defense)","Blocking","Marking","Speed","","Stamina");
   
        

   return buildTypes;
}



function build(n,veryimportantAt,importantAt,veryusefulAt,usefulAt){
   this.name = n;
   this.keys_veryimportant = veryimportantAt.split(",");
   this.keys_important = importantAt.split(",");
   this.keys_veryuseful = veryusefulAt.split(",");
   this.keys_useful = usefulAt.split(",");
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