// ==UserScript==
// @name        Pagar Comunidad
// @namespace	Pagar Comunidad
// @description Reparte el dinero a tu comunidad segun la posición, los puntos y el 11 ideal
// @include     http://www.comunio.*/team_news.phtml
// @version     3
// @author		Programado inicialmente por Javyyk y modificado por Tulipy
// @icon		http://cdn6.staztic.com/cdn/logos/comferzaciucomunio-23.png
// @require		http://code.jquery.com/jquery-1.8.2.min.js
// ==/UserScript==

/////////////////
//VARIABLES
/////////////////


GM_log("11 ideal...");

var id = new Array();
var nombre = new Array();
var puntos = new Array();
var jugadores = new Array();
var cantidad = new Array();
var razon  = new Array();
var finarray;
var y=1;
var lugar;
var url;
var perfecto=new Array(12);

///////////////////////////////////////////////////

// Variable tabla
// web para convertir a este formato http://web.bojidar.com/es/online-tools/url-decoder-encoder.html
tabla="%3Ctable%20border%3D%221%22%20align%3D%22center%22%3E%20%3Ctbody%3E%3Ctr%3E%20%3Ctd%20colspan%3D%225%22%20style%3D%22text-align%3A%20center%3B%22%3E%3Cspan%20style%3D%22color%3A%20%23008000%3B%20font-size%3A%20medium%3B%22%3E%3Cstrong%3ETabla%20de%20Premios%3C%2Fstrong%3E%3C%2Fspan%3E%3C%2Ftd%3E%20%3C%2Ftr%3E%20%3Ctr%3E%20%3Ctd%20style%3D%22text-align%3A%20center%3B%22%3E%3Cstrong%3EPosicion%3C%2Fstrong%3E%3C%2Ftd%3E%20%3Ctd%20style%3D%22text-align%3A%20center%3B%22%3E%3Cstrong%3ENombre%3C%2Fstrong%3E%3C%2Ftd%3E%20%3Ctd%20style%3D%22text-align%3A%20center%3B%22%3E%3Cstrong%3EPuntos%3C%2Fstrong%3E%3C%2Ftd%3E%3Ctd%20style%3D%22text-align%3A%20center%3B%22%3E%3Cstrong%3E11%20Ideal%3C%2Fstrong%3E%3C%2Ftd%3E%3Ctd%20style%3D%22text-align%3A%20center%3B%22%3E%3Cstrong%3EPremio%3C%2Fstrong%3E%3C%2Ftd%3E%20%3C%2Ftr%3E";
//

///////////////////////////////////////////////////
///////////VARIABLES PARA LOS PAGOS//////////////
///////////////////////////////////////////////

/////////////////////// posiciones premiadas /////////////////////// 

var pos1 = 1 //1º posición, se puede cambiar por cualquier posición
var pos2 = 2 //2º posición, se puede cambiar por cualquier posición
var pos3 = 3 //3º posición, se puede cambiar por cualquier posición


//////////////////////// Premio segun posición ///////////////////////

var prem1 = 1200000 // premio para la variable pos1
var prem2 = 800000  // premio para la variable pos2
var prem3 = 500000  // premio para la variable pos3

var premiotros = 300000  // Premio para las posiciones restantes

///////////////////////// Valor de cada punto /////////////////////// 

var premiopunto = 10000 //premio entregado por cada punto
var premioideal = 50000 //premio entregado por cada jugador en el 11 ideal

//////////////////////////////////////////////////////////////

//// Barra que muestra el progreso


var barra = "<div id='pago_div' class='article_header2'><a href='javascript:;' id='boton_pagar' class='newbutton new_message_btn' >Pagar Comunidad</a><div></div>";           
$( "#postwrap").prepend(barra);
var cartel = document.getElementById("pago_div");
$( "#boton_pagar" ).bind("click", inicio);

/// fin de Barra de progreso  
////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////
//Repartir dinero
/////////////////

GM_registerMenuCommand('PAGAR Comunidad',inicio);

function inicio(){
    
    if(confirm('¿Deseas hacer el Reparto de Premios?'))
    {
addperfect ();
    }
    
    
}


function addperfect (){
    
    cartel.innerHTML = "Guardando 11 ideal";
    
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://www.calculapuntoscomunio.com/once_ideal/",
        synchronous: "true",
        onload: function(z) {
            per=1;
            
            
            $(z.responseText).find("#plantilla").find(".nombre").each(function(index){
                //alert($(this).text().replace(/([\ \t]+(?=[\ \t])|^\s+|\s+$)/g, ''));
                perfecto[per]=$(this).text().replace(/([\ \t]+(?=[\ \t])|^\s+|\s+$)/g, '');		
                
                per++;  
            }); //reponsetext
            
            
            traer_ID();
            
        } //onload
    }); // GM_xmlhttpRequest
    
    
}// fin addperfect

///////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////
//extrae los datos de los usuario //
/////////////////////////////////////////

function traer_ID(){
    
    cartel.innerHTML = "Guardando datos de los Usuarios";
    
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://www.comunio.es/standings.phtml?currentweekonly_x=22",
        synchronous: "true",
        onload: function(r) {
            posicion=1;
            
            $(r.responseText).find("#tablestandings").find("tr").each(function(index){
                if(index==0)return; //nos saltamos el encabezado
                
                id[posicion]=$(this).find("td").eq(1).find("a").attr("href").match(/[0-9]{3,}/gi);
                puntos[posicion]=$(this).find("td").eq(2).text();
                nombre[posicion]=$(this).find("td").eq(1).text();
                GM_log(id[posicion]+"---"+nombre[posicion]);
                
                
                posicion++;
                finarray=posicion;
            });
            
            for(q=1;q<finarray;q++)
                
            {
                
                jugadores[q]=new Array(12);
                
            }
            
            
            trabajo(); 
        }
        
    });
    
    
    
    
} //traer_ID

///////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////
//extrae los jugadores de cada usuario //
/////////////////////////////////////////

function trabajo(){ 
    cartel.innerHTML = "Leyendo jugadores....";
    
    for (var i=1;i<finarray;i++)
    { //abrir for
        
        
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://www.comunio.es/playerInfo.phtml?pid="+id[i],
            synchronous: "true",
            onload: function(z) {
                
                var h=1;
                
                var titulo=$(z.responseText).filter('title').text();
                
                
                
                var lugar = buscarItem(nombre, titulo);
                
                
                $(z.responseText).find("#contentfullsizeib").find(".name_cont").each(function(index){
                    
                    jugadores[lugar][h]=$(this).text();
                    GM_log(jugadores[lugar][h]+" de "+nombre[lugar]);
                    
                    h++;   
                }); //reponsetext
                
                y++;
                GM_log(y+" de "+finarray);
                if (y==finarray){comparar();}
                
            } //onload
        }); // GM_xmlhttpRequest
        
        
        
        
        
    } //Cerrar for
    
    
} // cerrar trabajo      

//////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////
//compara los jugadores con el 11 ideal y cuenta cuantos tiene cada uno //
/////////////////////////////////////////

function comparar(){	
    
    cartel.innerHTML = "Buscando jugadores en el 11 ideal";
    
    
    for(columna=1; columna<nombre.length; columna++)
    {
        jugadores[columna][0]=0;
        for(fila=1; fila<perfecto.length; fila++)
        {
            for(ro=1; ro<perfecto.length; ro++)
            { 
                // alert(nombre[columna]+"-"+jugadores[columna][fila]+"-"+perfecto[ro]);
                if(jugadores[columna][fila]==perfecto[ro]){
                    
                    //  alert(nombre[columna]+" tiene a "+jugadores[columna][fila]+" en el 11 ideal");
                    
                    jugadores[columna][0]=jugadores[columna][0]+1;
                    
                } 
            }
        }
        
    }
    
    calculo();   
    
}  //funcion compara  

//////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////
//calcula el dinero que le corresponde a cada jugador//
/////////////////////////////////////////


function calculo(){
    
    cartel.innerHTML = "Calculando Saldos....";
    
    for(calcu=1; calcu<nombre.length; calcu++)
        
    {
       // GM_log(id[calcu]+"-"+nombre[calcu]+"-"+puntos[calcu]+"-"+jugadores[calcu][0]);
        razon[calcu] = "Haber+clasificado+"+calcu+"+,+tener+"+puntos[calcu]+"+puntos+y+tener+"+jugadores[calcu][0]+"+en+el+11+ideal";
        
        //Dinero segun la posicion y razon en el pago
        if(puntos[calcu]=="-"||puntos[calcu]<0){
            cantidad[calcu]="0";
            razon[calcu]+="+Saldo+o+puntos+en+negativo.";
        }else if(calcu==pos1){
            premio=(prem1+(puntos[calcu]*premiopunto)+(jugadores[calcu][0]*premioideal));
            cantidad[calcu]=premio;
            razon[calcu]+="+Eres+el+primero.";
        }else if(calcu==pos2){
            premio=(prem2+(puntos[calcu]*premiopunto)+(jugadores[calcu][0]*premioideal));
            cantidad[calcu]=premio;
            razon[calcu]+="+Si+sigues+asi+seras+primero.";
        }else if(calcu==pos3){
            premio=(prem3+(puntos[calcu]*premiopunto)+(jugadores[calcu][0]*premioideal));
            cantidad[calcu]=premio;
            razon[calcu]+="+Eres+el+peor+de+los+mejores.";
        }else{
            premio=(premiotros+(puntos[calcu]*premiopunto)+(jugadores[calcu][0]*premioideal));
            cantidad[calcu]=premio;
            razon[calcu]+="+Lo+estas+haciendo+muy+bien.";
        }
        
        //Añadimos a la razon detalles
        if(puntos[calcu]==puntos[calcu-1]){
            razon[calcu]+="+Nota: Empatado a puntos con "+nombre[calcu-1]+".";
        }
        
        
        
        
        // completado de tabla
        
        tabla=tabla+"<tr><td style=%22text-align: center;%22>"+calcu+"</td><td style=%22text-align: center;%22>"+nombre[calcu]+"</td><td style=%22text-align: center;%22>"+puntos[calcu]+"</td><td style=%22text-align: center;%22>"+jugadores[calcu][0]+"</td><td style=%22text-align: center;%22>"+formatNumber.new(cantidad[calcu])+"%20€</td></tr>";
        
        
        
        
        
    }
    
    tabla=tabla+"</table>";
    pagar();
}


//////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////
//Realiza los ingresos//
/////////////////////////////////////////

function pagar(){
    
    cartel.innerHTML = "enviando pagos...";
    
    for(pago=1; pago<nombre.length; pago++){
        
        //Enviamos POST con los datos del pago
        GM_xmlhttpRequest({
            method: "POST",
            url: "http://www.comunio.es/administration.phtml?penalty_x=33",
            data: "newsDis=messageDis&pid_to="+id[pago]+"&amount="+cantidad[pago]+"&content="+razon[pago]+"&cancel=-1&send_x=33",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        
        //alert(pago+"............"+cantidad[pago]+"..........."+razon[pago]);
        //alert("newsDis=messageDis&pid_to="+id[pago]+"&amount="+cantidad[pago]+"&content="+razon[pago]+"&cancel=-1&send_x=33");
        
        
    }
    //Posteo de la tabla
    window.setTimeout(
        (function (){
            GM_xmlhttpRequest({
                method: "POST",
                url: "http://www.comunio.es/team_news.phtml?postMessage_x=34",
                data: "newsAction=messageSubmitted&nid=3443067700&headline=Tabla+de+Premios&message="+tabla+"&cancel=-1&send_x=33&tinymce=true",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
        })
        , 5000);
    
    // Vamos a Noticias
    window.setTimeout((function (){location.href="http://www.comunio.es/team_news.phtml";}), 10000);
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//FUNCIONES EXTRA

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////
//busca en un array            //
/////////////////////////////////

function buscarItem(lista, valor){
    var ind, pos;
    for(ind=0; ind<lista.length; ind++)
    {
        if (lista[ind] == valor)
            break;
    }
    pos = (ind < lista.length)? ind : -1;
    return (pos);
} 

///////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////
//Cambia Formato De los Premios//
/////////////////////////////////

var formatNumber = {
    separador: ".", // separador para los miles
    sepDecimal: ',', // separador para los decimales
    formatear:function (num){
        num +='';
        var splitStr = num.split('.');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
            splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
        }
        return this.simbol + splitLeft  +splitRight;
    },
    new:function(num, simbol){
    this.simbol = simbol ||'';
    return this.formatear(num);
}
};
////////////////////////////////////////


//////////////////////////////////////////////////////////
//GM_log("script pagos fin");