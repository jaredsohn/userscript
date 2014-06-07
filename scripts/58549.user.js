// ==UserScript==
// @name           FB - SC
// @namespace      http://userscripts.org/scripts/show/58549
// @include        http://apps.facebook.com/starfleet_commander/*
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require        http://plugins.jquery.com/files/jquery.timers-1.1.3.js.txt
// ==/UserScript==

//alert("running");
/*
$("input").each(function(i){
            alert($(this).val());
      });
*/




function missionBuilder(idx){
   theoMissList = [["mission_1422628013",1,0,0], // 0 Ungarded Ore Mine
                ["mission_1607853605",1,0,0], // 1 Unguarded Crystal Mine
                ["mission_1773794702",1,0,0], // 2 Unguarded H tank
                ["mission_1773794700",1,0,0], // 3 Ore Mine, req 1 fighter
                ["mission_1231520105",1,0,0], // 4 Crystal mine, req 1 fighter
                ["",1,0,0],                   // 5 reserved
                ["mission_1773794698",1,0,0], // 6 Dest Arti classes, req 3 fighters
                ["mission_1773794706",1,0,0], // 7 Dest Arti classes, req 3 fighters
                ["mission_540485008",1,0,0]   // 8 Dest Arti classes, req 3 fighters                
                
                ]

   return theoMissList[idx]
}

curMissList = []
curMissList.push(missionBuilder(8));

i =0

$(document).everyTime(20000, function(){
//$(document).oneTime(1000, function(){
   i=Math.floor(Math.random()*curMissList.length);
   curMiss = curMissList[i][0];
   session = $("#nav_bar > a").attr("href").replace("/profile?_starfleet_session=","");
   //alert(session);
   
   if ($("#"+curMiss+"> .actions > .fleets").css('display') != "none"){
      
      //      target = $("#"+curMiss+"> .actions > .fleets > .ajax_link > .enabled > a").attr("onclick");
    
      function makeClick(curMiss, session){
         miss = curMiss.replace("mission_","batch_size_");
         select_max_batches(miss);
         
         a =$$("#"+curMiss+"> .actions > .fleets > .ajax_link > .enabled > a");
         a[0].onclick();

         //alert(b.onclick);
         //b.fire('click');
/*         function fireEvent(obj,evt){
           var fireOnThis = obj;
            if( document.createEvent ) {
              var evObj = document.createEvent('MouseEvents');
              evObj.initEvent( evt, true, false );
              fireOnThis.dispatchEvent(evObj);
            } else if( document.createEventObject ) {
              fireOnThis.fireEvent('on'+evt);
            }
         }*/
         
         
         
         //fireEvent(foo,'click');

         //alert(foo);
         //target = $("#"+curMiss+"> .actions > .fleets > .ajax_link > .enabled > a").attr("onclick");
        // alert(session);
         //disable_ajax_links();
        //new (Ajax.Request)("/missions/start_mission/"+curMiss+"?_starfleet_session="+session+"&ship_quantities=default", {asynchronous: true, evalScripts: true, parameters: Form.Element.serialize($("batch_size_"+curMiss))});
         
         
         
         //
         /*alert(target);
         document.getElementById(target).onclick();
         
        /* setTimeout(function(){
            select_max_batches();
            select_all_ships();
            cnt = $('batch_size').value;
            
            while ($('assign_button').disabled && cnt > 0 ){
               cnt--;
               $('batch_size').value = cnt;
               select_all_ships();
            }
            setTimeout(function(){
               if ($('assign_button').disabled == false){
                  $('assign_button').click();
               }
               else
                  $('close_link').onclick();
            }, 2500);
         },1500);*/
         
              
         //alert(target);
      }
         
      
         var script = document.createElement("script");
         script.type = "application/javascript";
         script.innerHTML = "(" + makeClick + ")("+"'"+curMiss+"','"+session+"');";
         document.body.appendChild(script);   
  
   }
      
   
});



/*
  Attaches script into page body and executes it via an anonymous function call.
    NOTES:
      Script can therefore reference variables on the page, but likewise cannot use Greasemonkey API methods
*/

