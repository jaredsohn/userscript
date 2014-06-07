// ==UserScript==
// @name           GLB expand AI text boxes
// @namespace      GLB
// @description    Expands AI  Text Boxes for larger visibility
// @include        http://goallineblitz.com/game/team_offense_ai.pl?team_id=*
// @include        http://goallineblitz.com/game/team_defense_ai.pl?team_id=*
// ==/UserScript==
function getElementsByClassName(classname, par){
   var a=[];  
   var re = new RegExp('\\b' + classname + '\\b'); 
   var els = par.getElementsByTagName("*");
   for(var m=0,j=els.length; m<j; m++){      
      if(re.test(els[m].className)){
         a.push(els[m]);
      }
   }
   return a;
};



var textboxes = document.getElementsByTagName('input');
for (var i=0;i<textboxes.length;i++) {
    if((textboxes[i].id.indexOf('input_name_') > -1)|| (textboxes[i].id.indexOf('output_name_') > -1)) {
        textboxes[i].setAttribute('size','39');
    };
};
