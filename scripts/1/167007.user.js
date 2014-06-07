// ==UserScript==
// @name        Info Polis Ikariam RO (by asuma)
// @namespace   corectsunt
// @description Vezi cine își face mobila pe orice insulă
// @include     http://s*.ikariam.*/index.php?view=island*
// @version     0.3.0
// ==/UserScript==
//-----------------------------------------------------------------------------



            var body=document.body;   
            var bodyHTML= body.innerHTML;
            var bloqueScript= bodyHTML.substring(87500,bodyHTML.length);


            var inicio = bloqueScript.indexOf(',"cities":')+10;
            var fin = bloqueScript.indexOf('barbarians');         
            var bloque = bloqueScript.substring(inicio,fin);


            var respuesta="";
            var ciudad;
            var jugador;
            var cont=0;

            var level =bloque.split('{"type":"city","name":"');

            
             for(i=0;i<level.length;i++){
        
                        if(level[i].substring(level[i].indexOf('","level":"')+11,  level[i].indexOf('","ownerId')) === "0"){

                               if(cont===0){
      
//                                        ciudad= level[i].substring(0,level[i].indexOf('","id"'));

                                         jugador=level[i].substring(level[i].indexOf('","ownerName":"')+15,  level[i].indexOf('","ownerAllyId'));

                                         respuesta =  jugador + " ";

                                         cont++;
                               
                            
                                }else{
        
//                                       ciudad= level[i].substring(0,level[i].indexOf('","id"'));

                                         jugador=level[i].substring(level[i].indexOf('","ownerName":"')+30,  level[i].indexOf('","ownerAllyId'));

                                         respuesta =  respuesta +" și " + jugador + " ";

                                         cont++;
                                }                 
        
        

                        }
             }           
         
         
            if(respuesta!==""){
                
                       respuesta = ">"+respuesta+"construiește un nou Polis ";
            
            }
         
         
            var init = function() {

                 var parrafo = document.createElement('a');
                   parrafo.setAttribute('class','white');
                   var texto = document.createTextNode(respuesta);

                   parrafo.appendChild(texto);
                   document.getElementById('breadcrumbs').appendChild(parrafo);

            };


              init();
	
   
         
      
        
   
      


      

