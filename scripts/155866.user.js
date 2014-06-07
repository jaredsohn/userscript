// ==UserScript==
// @name        coteur+
// @include     http://www.coteur.com/cotes/*
// @version     0.1.13(beta)
// @require     http://code.jquery.com/jquery-latest.min.js
// @require     http://code.jquery.com/ui/1.9.2/jquery-ui.js
// ==/UserScript==

alert("Coteur+ 100% loaded ! Click OK ;) ");



$("html body div.global table.main_content tbody tr td div#content table tbody tr td table tbody tr td.borderorange table").hide();
$("html body div.global div.borderorange table").hide();
$("html body div.global div p").hide();
$("div#entete, div#menu_noir, div.socialnet, div#menudroite").hide();
/*$("html body div.global table.main_content tbody tr td div#content table tbody tr td table tbody tr td div#tabcote table.borderorange tbody tr.entete_tab_orange td").hide();*/
$("html body div.global table.main_content tbody tr td div#content table tbody tr td table tbody tr td div#tabcote table.borderorange tbody tr.entete_tab_noir:first").hide();

$("html body").css("background-color","black");

$("html body div.global table.main_content tbody tr td div#content table tbody tr td table tbody tr td table tbody tr td a img").hide();


                  
                           
                  
                  $("#tabcote").css("width","720px");
                 
                  $("tr.entete_tab_noir").each(function(){
                                               
                                               $("<td><b></b></td>")
                                               
                                               .insertAfter($(this).children('td:last').text("TBK"));
                                               
                                               $("<td><b></b></td>")
                                               .insertAfter($(this).children('td:last').text("1 (%)"));
                                               
                                               $("<td><b></b></td>")
                                               .insertAfter($(this).children('td:last').text("N (%)"));
                                               
                                               $("<td><b></b></td>")
                                               .insertAfter($(this).children('td:last').text("2 (%)"));
                                               
                                             
                                               $("<td><b></td>")
                                               .insertAfter($(this).children('td:last').text("Surebet"));
                                                

                                               
                                               });
                  
                  
                  
                  $("tr.trpair, tr.trimpair").each(function(){
                                                   
                                                   
                                                   for(i=0;i<3;i++){
                                                    $("<td id='pCent'><b></b></td>").addClass("tdmises")
                                                   
                                                    .insertAfter($(this).children('td:last'));
                                                   }
                                                   
                                                   $("<td id='sureBet'><b></b></td>").addClass("tdmises")
                                                   
                                                   .insertAfter($(this).children('td:last'));
                                                  
                                                    });

                  
                   
                  
                  
                  
                  
                  function color(){
                  
                  $("td#pCent").each(function(){ //color pourcents
                                     
                                     var pourcentCote = $(this).text().replace('%','');
                                     
                                     
                                     
                                     if(pourcentCote > 50){
                                     $(this).css("background-color","#4ED844");
                                     
                                     }
                                     
                                     if(pourcentCote < 20){
                                        $(this).css("background-color","red");
                                     }
                                     
                                     if(pourcentCote > 50 ){
                                        $(this).parent("tr.trimpair , tr.trpair").css("background-color","#4ED844");
                                     }
                                     
                                                                          
                                     
                                     
                                     });  
                  
                  
                  //Color tBK
                  /* $("td td.tdprono_l").each(function(){
                   
                                var pourcent = $(this).text().replace('%','');
                   
                                if(pourcent > 92){
                                    $(this).css("background-color","#4ED844");
                                }
                   
                                else{ $(this).css("background-color","red");}
                   
                    }); */
                  
                  

                  };
                 
                  
                   
                  //Get  1 N 2.
                  function getCotes(){
                
                        $("tr.trpair, tr.trimpair").each(function(){  //pour chaque ligne, on get les cotes 1 N 2                                                
                                                                   
                                    var cote1 =  $(this).children('td:nth-child(8)').text() ;
                                    var coteN = $(this).children('td:nth-child(9)').text() ;
                                    var cote2 = $(this).children('td:nth-child(10)').text() ;
                                                   
                                    var tBk = 100*( 1 / ((1 / cote1) + (1 / coteN) + (1 / cote2)) );
                                                         
                                    $(this).children('td:nth-child(13)')
                                                         
                                                         .text((Math.round(( cotePourcent(cote1,tBk) ) * 100) / 100) + "%" );
                                                         
                                    $(this).children('td:nth-child(14)')
                                                         .css("font-weight","bold","font-size","10px")
                                                         .text((Math.round(( cotePourcent(coteN,tBk) ) * 100) / 100) + "%" );  
                                                         
                                                         
                                    $(this).children('td:nth-child(15)')
                                                         .css("font-weight","bold")
                                                         .text((Math.round(( cotePourcent(cote2,tBk) ) * 100) / 100) + "%" );  
                                    
                                    $(this).children('td:nth-child(16)')
                                                         //.css("color","white")
                                                         .text( surebet(cote1,coteN,cote2) );  
                                               
                                                                                                                 
                        });
                  };
                  
                  
                  
                  //CHANCE.
                  function cotePourcent(cote,tBk){
                    var result = ( 1 / cote ) * tBk;
                  
                  return result;
                            
                  
                  }
                  
                  //SUREBET.
                  function surebet(c1,cN,c2){
                        var surbetVal = (c1/1) + (cN/1) + (c2/1) ;
                  
                  
                        if(surbetVal < 1){
                            return "surbet";
                        }
                  else{return "-"; }
                 };

                  getCotes();
                  color();


                  
  

