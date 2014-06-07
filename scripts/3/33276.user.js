// ==UserScript==
// @name           Highlight Attributes II, Mod B
// @namespace      KMHI - Greasemonkey
// @include        http://goallineblitz.com/game/player.pl?player_id=*
// Script modified by Catullus 16 to show only major/minor leveling skills
// ==/UserScript==

var timeout = 100;

window.setTimeout( function(){
   // <div id="player_name">(PO) Player Name</div>
   var player_name = document.getElementById("player_name");
   var re = /\((.+)\)\s(.+)/;   
   var matches = player_name.innerHTML.match(re);
   var position = matches[0].replace(re, "$1");
   
   var buildTypes = createBuilds(position);

   var selectBuild = document.createElement("select");
   selectBuild.setAttribute("id","selectBuild");
   selectBuild.setAttribute("style","float:right;");
   //selectBuild.addEventListener("change",highlightAttributes,true); 
   
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
   
   // must insert compare element before "Player Attributes" for float to work correctly
   var medhead = getElementsByClassName('medium_head',document);   
   medhead[1].childNodes[0].parentNode.insertBefore(selectBuild, medhead[1].childNodes[0]);
   
   // insert the color key
   var colorKeyDiv = document.createElement("div");
   colorKeyDiv.setAttribute("id","colorKeyDiv");
   colorKeyDiv.innerHTML = "<span style='background:#59FF61;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>-Major <span style='background:#59CDFF;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>-Minor";
   var player_stats_table = getElementsByClassName("player_stats_table", document);
   player_stats_table[0].parentNode.insertBefore(colorKeyDiv, player_stats_table[0].nextSibling);

   var css = '#selectBuild,#selectBuild>option {font-weight:400;background-color:#FBFBF8;color:#a03c19;font-size:12px;font-family:arial;}';
   
   addGlobalStyle(css);
   
},timeout);

function highlightAttributes(buildTypes){
   var selectBuild = document.getElementById("selectBuild");
   var selectedName = selectBuild.options[selectBuild.selectedIndex].value;  
   var type;
   if(selectedName!=''){
      for(var i=0; i<buildTypes.length; i++)	{
         if(buildTypes[i].name == selectedName)
            type = buildTypes[i];
      }
      var exampleURL = document.createElement("a");
      exampleURL.setAttribute("id","exampleURL");
      exampleURL.setAttribute("href",type.url);
      exampleURL.innerHTML="Example Build";

      var importantColor = "#59FF61";
      var otherColor = "#59CDFF";      
      
      var stat_head = getElementsByClassName("stat_head",document);
      
      for(var i = 0;i < stat_head.length;i++)
         stat_head[i].style.background = "none";

      for(var i=0; i<type.keys.length; i++){
         for(var j=0; j<stat_head.length; j++){
            if((type.keys[i] + ":") == stat_head[j].innerHTML){	
               stat_head[j].style.background = importantColor;
            }
         }
      }

      for(var i=0; i<type.other.length; i++){
         for(var j=0; j<stat_head.length; j++){
            if((type.other[i] + ":") == stat_head[j].innerHTML){	
               stat_head[j].style.background = otherColor;
            }
         }
      }	
   }
}

function createBuilds(position){
   var buildTypes = new Array();
   
   switch(position){
      case "QB":
         buildTypes[0] = new build("Major/Minor","Strength,Throwing,Vision,Confidence,Stamina","Agility,Jumping,Carrying,Speed,Catching","http://goallineblitz.com/game/forum_thread.pl?thread_id=25826");
        break; 
      case "HB":
         buildTypes[0] = new build("Major/Minor","Agility,Speed,Strength,Vision,Confidence,Carrying","Catching,Blocking,Jumping,Throwing,Stamina","http://goallineblitz.com/game/forum_thread.pl?thread_id=25826");
        break; 
      case "FB":
         buildTypes[0] = new build("Major/Minor","Strength,Blocking,Agility,Carrying","Confidence,Vision,Catching,Tackling,Stamina","http://goallineblitz.com/game/forum_thread.pl?thread_id=25826");
        break; 
      case "C":
         buildTypes[0] = new build("Major/Minor","Strength,Blocking","Confidence,Agility,Vision,Tackling,Stamina","http://goallineblitz.com/game/forum_thread.pl?thread_id=25826");
        break; 
      case "G":
         buildTypes[0] = new build("Major/Minor","Strength,Blocking,Confidence","Agility,Vision,Tackling,Stamina","http://goallineblitz.com/game/forum_thread.pl?thread_id=25826");
        break; 
      case "OT":
         buildTypes[0] = new build("Major/Minor","Strength,Blocking,Confidence,Agility,Vision","Tackling,Stamina","http://goallineblitz.com/game/forum_thread.pl?thread_id=25826");
        break; 
      case "TE":
         buildTypes[0] = new build("Major/Minor","Strength,Blocking,Catching,Vision","Agility,Speed,Confidence,Carrying,Stamina,Tackling","http://goallineblitz.com/game/forum_thread.pl?thread_id=25826");
        break; 
      case "WR":
         buildTypes[0] = new build("Major/Minor","Speed,Agility,Catching,Jumping,Vision,Stamina","Confidence,Carrying","http://goallineblitz.com/game/forum_thread.pl?thread_id=25826");
        break; 
      case "DT":
         buildTypes[0] = new build("Major/Minor","Strength,Tackling,Agility","Blocking,Confidence,Vision,Speed,Stamina","http://goallineblitz.com/game/forum_thread.pl?thread_id=25826");
        break; 
      case "DE":
         buildTypes[0] = new build("Major/Minor","Strength,Tackling,Agility,Speed","Blocking,Confidence,Vision,Jumping,Stamina","http://goallineblitz.com/game/forum_thread.pl?thread_id=25826");
        break; 
      case "LB":
         buildTypes[0] = new build("Major/Minor","Strength,Vision,Tackling,Agility,Confidence,Stamina","Speed,Jumping,Blocking,Catching","http://goallineblitz.com/game/forum_thread.pl?thread_id=25826");
        break; 
      case "CB":
         buildTypes[0] = new build("Major/Minor","Speed,Agility,Jumping,Vision,Catching,Stamina","Strength,Tackling,Confidence,Carrying","http://goallineblitz.com/game/forum_thread.pl?thread_id=25826");
        break; 
      case "SS":
         buildTypes[0] = new build("Major/Minor","Strength,Speed,Vision,Tackling,Stamina","Agility,Jumping,Confidence,Blocking,Catching,Carrying","http://goallineblitz.com/game/forum_thread.pl?thread_id=25826");
        break; 
      case "FS":
         buildTypes[0] = new build("Major/Minor","Speed,Vision,Tackling,Catching,Stamina","Agility,Jumping,Strength,Confidence,Blocking,Carrying","http://goallineblitz.com/game/forum_thread.pl?thread_id=25826");
        break; 
      case "K":
         buildTypes[0] = new build("Major/Minor","Kicking,Confidence","Strength,Vision,Agility,Speed,Jumping,Throwing","http://goallineblitz.com/game/forum_thread.pl?thread_id=25826");
        break; 
      case "P":
         buildTypes[0] = new build("Major/Minor","Punting,Confidence","Strength,Vision,Agility,Speed,Jumping,Throwing","http://goallineblitz.com/game/forum_thread.pl?thread_id=25826");
        break; 
   }
   
   return buildTypes;
}

function testFunc(testing){
   var testContainer = document.getElementById("attribute_list").firstChild;
   var testElement = document.createElement("p");
   testElement.innerHTML = testing;
   //testContainer.appendChild(testElement);
   testContainer.parentNode.insertBefore(testElement,testContainer);
}

function build(n,keyAt,otherAt,example){
   this.name = n;
   this.url = example;
   this.keys = keyAt.split(",");
   this.other = otherAt.split(",");
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