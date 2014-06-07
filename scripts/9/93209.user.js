// ==UserScript==
// @name           STBSkills_SR
// @namespace      STBSkills - SR
// @description    STBSkills - srpski jezik by ulero
// @version	1.0
// @include        http://www.grid-iron.org/index.php?page=match&match_id=*
// @include        http://grid-iron.org/index.php?page=match&match_id=*
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
   option.text = 'Izaberi poziciju';
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
   colorKeyDiv.innerHTML = "<font style='font-size: 10px; font-family: verdana, arial, sans-serif;'><span style='background:#AACDCD;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> Primarni <span style='background:#B3CDB3;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> Sekundarni  <span style='background:#CDCDA4;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> Tercijarni</font>";
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
	skills[0]="Postavljanje";
	skills[1]="Vizija";
	skills[2]="Inteligencija";
	skills[3]="Rad nogu";
	skills[4]="Nošenje";
	skills[5]="Takl";
	skills[6]="Blok";
	skills[7]="Dodavanje";
	skills[8]="Hvatanje";
	skills[9]="Kik";
	skills[10]="Pant";
	skills[11]="Brzina";
	skills[12]="Snaga";
	skills[13]="Spretnost";
	skills[14]="Izdržljivost";
	skills[15]="Radna navika";
	skills[16]="Konzistentnost";
	return skills;

}
function createBuilds(){

   var buildTypes = new Array();
   buildTypes[0] = new build("Quarterback", "QB (Kvoterbek, Napad)","Dodavanje,Vizija,Inteligencija","Spretnost","Konzistentnost");
   
   buildTypes[1] = new build("Wide Receiver", "WR (Vajd risiver, Napad)","Spretnost,Hvatanje,Brzina","Snaga","");
   
   buildTypes[2] = new build("Running Back", "HB (Raning bek, Napad)","Snaga,Brzina,Nošenje,Spretnost","Blok,Rad nogu","");
   
   buildTypes[3] = new build("FB", "FB (Ful bek, Napad)","Rad nogu,Snaga,Blok","Spretnost,Brzina.Nošenje","");
   
   buildTypes[4] = new build("Tight End", "TE (Tajt end, Napad)","Hvatanje,Spretnost,Snaga","Blok,Brzina,Rad nogu","");
   
   buildTypes[5] = new build("OC", "OC (Ofanzivni centar, Napad)","Blok,Snaga,Rad nogu","Spretnost","Inteligencija");
   
   buildTypes[6] = new build("OG", "OG (Ofanzivni gard, Napad)","Blok,Snaga,Rad nogu","Spretnost","");
   
   buildTypes[7] = new build("OT", "OT (Ofanzivni takl, Napad)","Blok,Snaga,Rad nogu","Spretnost","Brzina");
   
   buildTypes[8] = new build("DE" ,"DE (Defanzivni end, Odbrana)","Brzina,Snaga,Spretnost,Takl","Rad nogu","");
   
   buildTypes[9] = new build("DT/NT", "DT/NT (Defanzivni/'Nos' takl, Odbrana)","Takl,Snaga,Rad nogu","Spretnost","");
   
   buildTypes[10] = new build("OLB", "OLB (Spoljni lajnbeker, Odbrana)","Takl,Brzina,Snaga","Spretnost,Postavljanje,Vizija","");
   
   buildTypes[11] = new build("MLB", "MLB (Centralni lajnbeker, Odbrana)","Takl,Snaga,Inteligencija","Brzina,Spretnost,Postavljanje,Vizija","Konzistentnost");
   
   buildTypes[12] = new build("SS", "SS (Strong sejfti, Odbrana)","Takl,Brzina,Snaga,Inteligencija","Spretnost,Postavljanje,Vizija","");
   
   buildTypes[13] = new build("FS", "FS (Fri sejfti, Odbrana)","Takl,Brzina,Inteligencija,Postavljanje","Spretnost,Snaga,Vizija","");
   
   buildTypes[14] = new build("Cornerback", "CB (Kornerbek, Odbrana)","Takl,Postavljanje,Brzina","Spretnost,Vizija,Snaga","");
   
   buildTypes[15] = new build("Kicker", "K (Kiker, SpecijalniTim)","Kik","Snaga","Konzistentnost");
   
   buildTypes[16] = new build("P", "P (Panter, SpecijalniTim)","Pant","Snaga","Konzistentnost");
   
   buildTypes[17] = new build("Gunner", "G (Ganer, SpecijalniTim)","Takl,Brzina,Rad nogu","Spretnost,Snaga,Vizija,Postavljanje","");
   
   buildTypes[18] = new build("Kick returner", "KR (Kik returner, SpecijalniTim)","Nošenje,Brzina,Spretnost","Rad nogu,Hvatanje,Snaga","");
   
   buildTypes[19] = new build("STCB", "STCB (Kornerbek, SpecijalniTim)","Blok,Postavljanje,Brzina","Spretnost,Vizija,Snaga","");
        

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
