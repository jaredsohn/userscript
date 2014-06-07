// ==UserScript==
// @name           batallas
// @namespace      www.erepublik.com
// @include 	    http://www.erepublik.com/en*
// @include 	    http://www.erepublik.com/es*
// @include 	    http://www.erepublik.com/de*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==


/*  ******************** FUNCTIONS  ********************  */


function ex(nameEntity){
	return document.getElementById(nameEntity);
}


function dc(nameEntity){
	return document.createElement(nameEntity);
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


function findPos(item){
	var p = $("#"+item);
	var offset = p.offset();
	
	var obj = new Object();
	obj.x = offset.left;
	obj.y = offset.top;
	
	
	GM_log("item("+item+"), posx:"+obj.x +",posy:"+obj.y);
	return obj;
}



var batalla = new Object();

function simularBatalla(){

	/* reseteo variables */
	
	jugadoresNecesariosEmpezarBatalla = 999999;
	jugadoresPresentadosALaBatalla = 0;
		
	indicejugadores = 0;
	jugadores = new Array();
	
	listaAtacantes = new Array();
	listaDefensores = new Array();
	batalla = new Object();
	batalla.hospital = 0;
	batalla.qhospital = 0;//test
	
	indicejugadorAtaca = 0;
	indicejugadorDefiende = 0;
	bandovictoria = 0;

	

	/* reset mapa */
	logtext_reset();	
	
	ex("peleando_0").innerHTML = "";
	ex("peleando_1").innerHTML = "";

	/* recarga datas */ 
	loadPlayers();	
	
	/* FIGHT! */
	
	peganPlayers();//ya de aqui corre solo (se llama a si mismo)
}

var bandovictoria = 0;

function condicionVictoria(){

	var numAtacantesVivos = 0;
	var numDefensoresVivos = 0;

	for(var t=0;t<indicejugadores;t++){
	
		if ( !jugadores[t] )
			continue;
	
		if ( jugadores[t].vida <0 )
			continue;
		
		if ( jugadores[t].bando == ATACANTES) {
			numAtacantesVivos++;
			continue;
		}
		numDefensoresVivos++;				
	}

	if (numAtacantesVivos <1 && numDefensoresVivos <1 ) {
		bandovictoria = DEFENSORES; //se ha repelido el ataque, aunque han muerto TODOS.
		return true;
	}	
	
		
	if (numAtacantesVivos >0 && numDefensoresVivos <1 ) {
		bandovictoria = ATACANTES;
		return true;
	}
	
	if (numAtacantesVivos <1 && numDefensoresVivos >0 ) {
		bandovictoria = DEFENSORES;
		return true;
	}
	
	return false; //quedan de los dos bandos
}


function palabraDagno(cuanto, calidadArma){
	var calidad2palabra = new Array();
	calidad2palabra[0] = "golpea con sus pugnos";
	calidad2palabra[1] = "dispara con una pistola";
	calidad2palabra[2] = "dispara con un rifle";
	calidad2palabra[3] = "lanza una granada";
	calidad2palabra[4] = "lanza un misil";
	calidad2palabra[5] = "dispara un obus";
	
	var palabro = calidad2palabra[ calidadArma ];
	if ( !palabro) palabro = "ERROR";
	
	var numEstrellas = parseInt(cuanto / 50);	
	if ( numEstrellas>0){
		for(var t=0;t<numEstrellas;t++){
			palabro = "*"+ palabro + "*";		
		}	
	}
	
	if ( cuanto > 100){
		palabro = palabro.toUpperCase();
	}	
	
	return palabro;
}


function obituaryDescript( vidaFinal){
	vidaFinal = Math.abs( vidaFinal );

	var salida = "muere de cansancio";

	if ( vidaFinal<1) {
		salida = "muere de cansancio";
	} else if ( vidaFinal < 3){
		salida = "muere de los golpes recibidos";
	}else if ( vidaFinal < 8){
		salida = "se desangra y muere";
	}else if ( vidaFinal < 14){
		salida = "le explota la cabeza y muere";
	}else if ( vidaFinal < 20){
		salida = "revienta y muere";
	}else if ( vidaFinal < 30){
		salida = "es asesinado brutalmente";		
	}else if ( vidaFinal < 40){
		salida = "explota y sus trozos caen en todas partes";
	}else if ( vidaFinal < 50){
		salida = "explota y sus brazos vuelan a "+parseInt(vidaFinal*1.3)+" kilometros de distancia";
	}else if ( vidaFinal < 100){
		salida = "se *volatilizado* por la explosion";
	}else if ( vidaFinal < 125){
		salida = "es absolutamente desintegrado por una explosion";
	}else if ( vidaFinal < 150){
		salida = "es absolutamente **desintegrado** por una explosion";
	}else if ( vidaFinal < 200){
		salida = "es completamente **desintegrado** por una explosion";
	}else if ( vidaFinal < 250){
		salida = "es **ANIQUILADO** ";	
	}else if ( vidaFinal < 275){
		salida = "es *** EXTERMINADO *** ";
	}else if ( vidaFinal < 300){
		salida = "es *** EXTERMINADO DE FORMA LEGENDARIA *** ";
	}else {
		salida = "es *** EXTERMINADO EN UNA EXPLOSION DE PROPORCIONES EPICAS ***  ";
	} 
	
	return salida;
}



function evento_pegando( quien, victima, cuanto ){
	//logtext( quien.name  + " hace " + cuanto + " a " + victima.name  + " de daï¿½o ");
	logtext( quien.name  + " "+palabraDagno(cuanto,quien.weapon)+" a " +victima.name  + " con "+cuanto+" de da&ntilde;o ");

	quien.cansado = true; //pegar a la gente cansa

	victima.vida -= cuanto;

	gui_actualizavida(victima);
	gui_floatingnumber(victima, cuanto);
	
	if (victima.vida<0){
		logtext( "<b style='color: red;background-color: #eee' >" +victima.name  + " " + obituaryDescript(victima.vida ) + "</b>");
		evento_robararma( quien,victima);
		
		if (Math.random()>0.9){
			evento_fraselapidaria(quien);
		}		
	}		
}


var serial = 1;
function gui_floatingnumber(victima, cuanto){
      
        var color = "red";
        if (cuanto<0) {
		cuanto = -cuanto;
		color = "green";
	}
      
	var gordura = (parseInt(cuanto/2) +14 ) ;
	
	var offsetup = ((-200 + -(cuanto/2) ) )+"px";
	
	var leftie = 20 -  (cuanto  + Math.random()*cuanto*2)/3;
	
	serial++
	var idserial = "float_" +serial;
	
	var id = "avatar_"  + victima.id;

        var par = ex(id).parentNode;
	
	var pos = findPos(id);
	
	
	var dagno = dc("div");
	
	
	dagno.setAttribute("id",idserial);
	dagno.setAttribute("style","z-index:5;position:absolute;top: "+pos.y + "px;left:"+(pos.x + 20)+ "px;color:"+color+";font-size:14px;");
	dagno.innerHTML = cuanto + "\n";
	
	
	par.appendChild (dagno); 
	 
	var finalPosY = pos.y - ( 40+ cuanto/1.5) ;
	var finalPosX = pos.x +(gordura/4);

	$("#"+idserial).animate({fontSize: gordura + "px",top:  finalPosY +"px", left: finalPosX+"px"}, 1500+cuanto , function() { $(this).animate( {opacity: 0.1},2000, function() { $(this).remove()}); } );
}



function gui_actualizavida(quien){

	var caja = ex("avatar_" + quien.id);
	
	var vida = quien.vida;
	
	if (vida<0)	vida = 0;
	
	vida = 50 - parseInt( vida/2 );
	
	caja.innerHTML = "<div style='color:black;font-weight:bold;text-align: center;opacity: 0.7; width: 50px;background-color: red;height: "+vida+"px'>"+quien.name+"</div>";
	
	//GM_log("cajah:"+vida);

}


function evento_fraselapidaria(quien){

	var t = parseInt( (Math.random()*10000)%pensamiento.length );

	var frase = pensamiento[t];

	logtext( quien.name+ " dice <i>'"+ frase +"'</i>");
}


function evento_robararma(quien, victima){

	if (quien.weapon < victima.weapon){	
		logtext( quien.name + " roba el arma Q"+ victima.weapon + " de "+ victima.name );
		quien.weapon = victima.weapon;	
	}
}



var indicejugadorAtaca = 0;
var indicejugadorDefiende = 0;

//indicejugadores

function peganAtacantes(){

	var ataca = getSoldado(ATACANTES);
	
	
	if (!ataca)
		return;//no hay atacantes?
	
	if (ataca.vida<=0)
		return;//este no puede pegar a nadie, porque esta muerto		
	
	produccionArmas(ataca); //utiliza sus habilidades para mejorar sus armas.

	var dagno = getCalculoDagno( ataca);
	
	
	
	var victima = getSoldado(DEFENSORES);
	
	if (!victima)
		return; //no hay contendientes!
	
	evento_pegando( ataca,victima, dagno);
}

function produccionArmas(ataca) {
	ataca["weaponraw"] += ataca["combinada"] ;
	
	var nextlevel =  (ataca["weapon"] + 1 ) * 5;
	
	if ( ataca["weaponraw"] > nextlevel  && ataca["weapon"]<5) {
		ataca["weapon"] = ataca["weapon"] + 1;	
		evento_mejoraarma( ataca );
	}
}

function evento_mejoraarma( quien ) {
	logtext( quien.name + " mejora su arma a Q" + quien.weapon );
}

function getCalculoDagno( atacante ){
	var q_weapon = 0;
	var s_fuerza = atacante.strength;
	var rangotext =  atacante.military_rank;	
	
	var w_wellness_factor =  1 + ( atacante.wellness - 25) / 100;
	
	//var r_bonus = 1 + ( rank2bonus[ rangotext ] /5);
	var r_bonus = 1 + ( rank2bonus[ rangotext ] /5);

	if (!atacante.weapon)
		q_weapon = 0.5;
	else 
		q_weapon = 1 + (atacante.weapon / 5);

	if (isNaN( r_bonus ) ) {
		logtext("ERROR: bonus is nan");
	}


	var dagno = q_weapon* r_bonus  * s_fuerza *  w_wellness_factor  * 2   ;

	if ( isNaN( dagno) )
		return 1;//no es cero para no terminar en un loop infinito o algo asi

	//return 2;
	return parseInt(dagno);
}


function peganDefensores(){

	var ataca = getSoldado(DEFENSORES);
	
	if (!ataca)
		return;//no hay atacantes?
		
	if (ataca.vida<=0)
		return;//este no puede pegar a nadie, porque esta muerto		
		
	produccionArmas(ataca); //utiliza sus habilidades para mejorar sus armas.
	
	var dagno = getCalculoDagno( ataca);
	
	var victima = getSoldado(ATACANTES);
	
	if (!victima)
		return; //no hay contendientes!
	
	evento_pegando( ataca,victima, dagno);
	
}


function pegaAlguien(){

	var ataca = getAlgunSoldado();
	
	if (!ataca)
		return;//no hay atacantes?
		
	if (ataca.vida<=0)
		return;//este no puede pegar a nadie, porque esta muerto		
		
	produccionArmas(ataca); //utiliza sus habilidades para mejorar sus armas.
	
	var dagno = getCalculoDagno( ataca);
	
	var victima = getSoldado( (ataca.bando==DEFENSORES)?ATACANTES:DEFENSORES);
	
	if (!victima)
		return; //no hay contendientes!
	
	evento_pegando( ataca,victima, dagno);
	
}

function adminsCurran(){
	var ataca = getAlgunSoldado();

	if (!ataca)
		return;//ya esta muerto, asi que lo dejamos en paz
	if (ataca.vida<=0)
		return;//este no puede tramear, porque esta muerto		

	if (Math.random()<0.1) { //TODO: utilizar un mejor sistema para detectar trameros.
		evento_banhammer( ataca );	
	}		
}

function evento_banhammer(quien){

	var chocos = parseInt( (Math.random()*1000)%4 ) + 1;  //puede ganar 5 de golpe
	
	var chocosfinal = quien.chocopuntos + chocos; 
	
	quien.chocopuntos = chocosfinal;
	
	
	var plural = (chocos>1)?"s":"";
	
	if ( chocosfinal >= 5){
		logtext( "<b style='color:blue'>"+ quien.name + " gana " + chocos + " chocopunto"+plural+"  y es "  + getDescribeBan( chocosfinal )  +"</b>");		
		quien.vida = -1; //hehee... 
		gui_actualizavida(quien);
	} else {			
		logtext(  "Los admins ponen " + chocos + " chocopunto"+plural+"  a  "  + quien.name );		
	}
}

function getDescribeBan( chocosfinal  ) {
	//chocosfinal puede ser un valor entre 5 y 10
	
	if ( chocosfinal  < 6) {
		return "baneado temporalmente";
	} else if ( chocosfinal < 7){ 
		return "baneado una larga temporada";
	} else if ( chocosfinal < 8){ 
		return "permaneado";
	} else if ( chocosfinal < 9){ 
		return "**permaneado**";
	} 
	
	return "permabaneado, y bloqueada su ip";
}


function getSoldado(bandoNecesito){

	var  maxlen= jugadores.length;
	var preseleccionado = false; //posible opcion, pero no la mas deseable

	var ir = parseInt( (Math.random() *10000)%maxlen);	//empezamos aqui, y seguimos en orden. Asi el numero de busquedas es o(n) 
	
	//logtext( "ir: ("+bando+") " + ir );
	
	var numIntentos = -1;
	
	while( true ) {	 //seguira hasta que encontremos algo, o hayan habido demasiados intentos
		
		if (jugadores[ir]) {
			if ( jugadores[ir].bando == bandoNecesito && jugadores[ir].vida>0){
				if ( jugadores[ir].cansado ) {
					jugadores[ir].cansado = false; //solo se lo medio salta esta vez
					preseleccionado = ir; //este mola, pero si encuentras uno que no este cansado, mejor aun
					//logtext(  jugadores[ir].name + " iria.. que no es no ir ");
				} else {			
					return jugadores[ir];		
				}												
			}		
		}
	
		if (numIntentos > maxlen)  {
			if ( preseleccionado != -1 ){
				return jugadores[preseleccionado]; 
			}
		
			return  false;//posiblemente no quedan contendientes							
		}					
			
		ir++;
		if (ir>maxlen){
			ir = 0;
		}

		numIntentos++;
	}
}


function getAlgunSoldado(){

	var  maxlen= jugadores.length;
	var preseleccionado = false; //posible opcion, pero no la mas deseable

	var ir = parseInt( (Math.random() *10000)%maxlen);	//empezamos aqui, y seguimos en orden. Asi el numero de busquedas es o(n) 
	
	//logtext( "ir: ("+bando+") " + ir );
	
	var numIntentos = -1;
	
	while( true ) {	 //seguira hasta que encontremos algo, o hayan habido demasiados intentos
		
		if (jugadores[ir]) {
			if ( jugadores[ir].vida>0){
				if ( jugadores[ir].cansado ) {
					jugadores[ir].cansado = false; //solo se lo medio salta esta vez
					preseleccionado = ir; //este mola, pero si encuentras uno que no este cansado, mejor aun
					//logtext(  jugadores[ir].name + " iria.. que no es no ir ");
				} else {			
					return jugadores[ir];		
				}												
			}		
		}
	
		if (numIntentos > maxlen)  {
			if ( preseleccionado != -1 ){
				return jugadores[preseleccionado]; 
			}
		
			return  false;//posiblemente no quedan contendientes							
		}					
			
		ir++;
		if (ir>maxlen){
			ir = 0;
		}

		numIntentos++;
	}
}


function evento_esperandosoldados(){
	if (jugadoresPresentadosALaBatalla>=jugadoresNecesariosEmpezarBatalla) {
		logtext("<b style='background-color: #eee;color:black'>Puede empezar la batalla con "+ jugadoresPresentadosALaBatalla + " soldados</b>"); 
		return;
	}
	
//	logtext("Esperando la llegada de soldados...("+jugadoresPresentadosALaBatalla+"/" +jugadoresNecesariosEmpezarBatalla+")");
}

function curranDefensores(){

	var minhospital = 0;
	
	for(var t=0;t<listaDefensores.length;t++){
		
		//logtext("construido...("+ batalla.hospital  + "/ Q"+batalla.qhospital + ")");
		
		var idefensor = listaDefensores[t];
		var defensor = jugadores[ idefensor ];
		
		if (!defensor)
			continue;
		
		if ( defensor.vida <=0)
			continue;

			
		var cons = defensor.constructions;
		if (cons<=0)
			continue;
		//logtext("4:"+defensor.toSource());	
			
		if ( isNaN(cons))
			continue;
		
			
		batalla.hospital += cons;
		
		minhospital = batalla.qhospital * 200+200;
		
		if ( batalla.hospital > minhospital && batalla.qhospital<6){ //no existe hospital Q6
			batalla.qhospital ++;
			evento_mejorahospital(batalla.qhospital);		
		} else {
			//logtext("construido...("+ batalla.hospital  + "/ "+minhospital+ ")");	
		}		
	}	
	//logtext("construido...("+ batalla.hospital  + "/ "+minhospital+ ")");		
}

function evento_mejorahospital(nuevonivel){
	logtext("<b style='color: white;background-color:green'>Los defensores mejoran el hospital a nivel Q"+ nuevonivel +"</b>");
}

function usanHospitalDefensores(){
	if ( ! batalla.qhospital )
		return ;//no hay hospital.
		
	var cuantototal = 0;
	
	for(var t=0;t<listaDefensores.length;t++){		
		
		var idefensor = listaDefensores[t];
		var defensor = jugadores[ idefensor ];
		
		if (!defensor)
			continue;
		
		if ( defensor.vida <=0)
			continue; // el hospital no resucita gente
		var cuanto =  batalla.qhospital * 10	; //los hospital curan 10 por cada nivel de hospital.	
		defensor.vida += cuanto;
		//evento_cura( defensor, cuanto );
		
		cuantototal += cuanto;
		
		gui_floatingnumber(defensor, -cuanto);//mostrar la cura
	
		if (defensor.vida>100)
			defensor.vida = 100;// los hospitales no te dopan, solo te curan 		
	}	
	
	
	if ( opciones.mostrar_curas )
	if (cuantototal>0)
		evento_curaglobaldefensores( cuantototal );
	
}


function evento_curaglobaldefensores( cuanto ){
	logtext( "los defensores se curan  " + cuanto + " puntos de salud ");
}

function evento_cura( quien, cuanto ){
	logtext( quien.name + " se curan " + cuanto + " puntos de salud ");
}

 /* FUNCION PRINCIPAL DE LA BATALLA---- */


var pass = 0;
function peganPlayers(){
					
	if ( jugadoresNecesariosEmpezarBatalla <= jugadoresPresentadosALaBatalla) {
		curranDefensores();//dejales construir hospitales, hostias... 
		
		/*
		 si ataca uno de cada, favorece demasiado un grupo pequeï¿½o de tanques
		peganAtacantes();				
		peganDefensores();*/
		
		pegaAlguien();//atacante o defensor, no lo sabemos.. RANDUM!!
		
		adminsCurran();//los admins buscan trameros
		
		if (condicionVictoria()) {
			evento_ganan(bandovictoria);	
			return;//al salir, deja de repetirse esta funcion (acaba la batalla)		
		}
		usanHospitalDefensores();
		
		GM_log( "pegando: " + (pass++));
	} else {
		evento_esperandosoldados();
		//TODO: empezar la batalla de todos modos aunque haya alguien que llegue tarde si pasan mas de 10 segundos?
		
		GM_log( "esperando: " + (pass++)+ "jP:" +jugadoresPresentadosALaBatalla);
	}
	
	
	
	setTimeout(peganPlayers,300);
}

/* ---FUNCION PRINCIPAL DE LA BATALLA */


function evento_ganan(bandoGana){
	var aviso = "";
	
	if (bandoGana == ATACANTES)
		aviso = "Ganan los atacantes!";
	else
		aviso = "Ganan los defensores!";	
		
	logtext( "<b style='color: green;background-color: #eee'>" + aviso + "</b>");	
}

function logtext(text){
	var newdiv = dc("div");	
	newdiv.innerHTML = text;
	newdiv.setAttribute("class","linealog");
	ex("batalla").appendChild( newdiv);
	

	
}

function logtext_reset(){
	ex("batalla").innerHTML = "";
}


var indicejugadores = 0;
var jugadores = new Array();

var listaAtacantes = new Array();
var listaDefensores = new Array();


function evento_entro(profile, bandoSoldado){
	
	
	profile["harvesting"] = 0;
	profile["manufacturing"] = 0;
	profile["constructions"] = 0;
	
	profile.cansado = false;
	profile.chocopuntos = 0;
	
	for(var i=0;i< profile.skills.length;i++){					
		var valor =  profile.skills[i]["value"];						
		var domain = profile.skills[i]["domain"];	

		//logtext( profile.name + " domain "+ domain + " value " + valor );

		if ( domain == "land")
			profile["harvesting"] = valor;
		else if (domain == "manufacturing")  {
			profile["manufacturing"] = valor;
		} else if (domain == "constructions") {
			//constructions  <-- no sirve para la guerra, pero quizas deberia servir para construir muros.. ï¿½escudo?.
			 profile["constructions"]= valor;
		}else {		
			GM_log("E: unknom power: "+ domain);
			//logtext("<b>unknom hability " + domain +" on " + profile.name +"</b>"); 
			profile[ domain + "power"] = valor;
		}

	}	
	
	profile["rango"] = rank2rango[ profile.military_rank  ];
	//logtext("entro un "+ profile.rango);
	
	profile["weapon"] = 0;//Q0.. manos desnudas
	//profile["weaponnextlevelcost"] = 5; //how much cost next level, it double every level
	profile["weaponraw"] = 0; //how much production acumulated,  if is enough, upgrade weapon
	
	/* combinada trata de dar una idea de la capacidad de fabricar armas de este sujeto.  aunque alguien no tenga habilidad minera, puede ayudarse de otro que le compensa  por eso no es un malos tener cero en manufactura, se puede compensar con harvesting */
	profile["combinada"] = (profile["harvesting"] + profile["manufacturing"] )/2;

	

	profile["bando"] = bandoSoldado;
	profile["vida"] = profile.wellness;//Su vida inicial es igual a su wellness
	
	if ( bandoSoldado == ATACANTES){
		listaAtacantes[ listaAtacantes.length ] = indicejugadores;
	} else {
		listaDefensores[ listaDefensores.length ] = indicejugadores;
	}	
	
	logtext( "El "  + profile.rango +" "+  profile.name + " entro en la batalla para "+ ((bandoSoldado==ATACANTES)?"atacar":"defender")  + 
	  "  tiene habilidad " + profile["combinada"] + " en la fabricacion de armas");
	if (profile["constructions"]>0 && bandoSoldado==DEFENSORES)
		logtext( profile.name + " colaborara en la construccion de un hospital de campagna con " +valor);
	
	if ( profile.is_congressman ) {
		logtext( profile.name + " es un congresista de su pais");
	}
	
	
		
	
	var cajaavatar = dc("div");	
	cajaavatar.setAttribute("id","avatar_" + profile.id);
	
	var cajacaja = dc("div");
	cajacaja.setAttribute("style","float: "+((!bandoSoldado)?"left":"right")+";margin-left:4px; margin-right: 4px;width: 50px;height: 50px; background-image: url("+  profile.avatar_link  +")");	
	
	cajacaja.appendChild( cajaavatar);

	ex("peleando_"+bandoSoldado ).appendChild( cajacaja);	
	
	jugadores[indicejugadores++] = profile;	
}

function evento_problemo(problema){
	logtext( problema );
}


var jugadoresNecesariosEmpezarBatalla = 999999;
var jugadoresPresentadosALaBatalla = 0;


function loadPlayers(){
	
	var nuevoLimite = 0;
	
	var atacan  = (new String(ex("atacantes").value)   ).split(",");
	
		
	nuevoLimite+= atacan.length;
	
	for(var t=0;t<atacan.length;t++){	
		cargarJugador(atacan[t], ATACANTES);//atacante
	}	

	var defienden  = (new String(ex("defensores").value)   ).split(",");
	
	for(var t=0;t<defienden.length;t++){	
		cargarJugador(defienden[t], DEFENSORES);//defensor
	}	
	
	nuevoLimite+=  defienden.length;
	
	jugadoresNecesariosEmpezarBatalla = nuevoLimite;	
}




function cargarJugador(id, bandoSoldado) {
   GM_log("hello, pre-cargando:"+ id );
   
   
   if ( !(id>0) ){
	jugadoresNecesariosEmpezarBatalla--;//la batalla puede empezar con un soldado menos
	evento_esperandosoldados();
	return;
   }
   
   GM_log("hello, cargando:"+ id );
   
   
    GM_xmlhttpRequest(
        {
            method: 'GET',
            url: 'http://api.erepublik.com/v1/feeds/citizens/'+escape(id)+'.json',
            onload:function(response)  {
				try {
					GM_log("wow! cargado:"+ id );
					var profile = eval('(' + response.responseText + ')')
					
					if ( profile && profile.wellness>0 ) {					
						evento_entro(profile, bandoSoldado);
						jugadoresPresentadosALaBatalla++;		
						
						//logtext( response.responseText);
					} else {
						evento_problemo("Un soldado llego muerto a la batalla!");
						jugadoresNecesariosEmpezarBatalla--;//la batalla puede empezar con un soldado menos									
					}
				} catch(err) {
					evento_problemo("Un soldado no pudo llegar a la batalla!, err:"+ err);
					jugadoresNecesariosEmpezarBatalla--;//la batalla puede empezar con un soldado menos				
				} 
				evento_esperandosoldados();				
            }
        }
    );
    


}





function gui_generar(){

	//quitar la  columna de publicidad
	addGlobalStyle('a.iconbtn, #profilehoder .iconbtn { display:none!important;visibility:hidden!important;}');
	addGlobalStyle('#profileholder,#companyprofile h1 { width: 480px!important}');
	addGlobalStyle('.indent { width: 85%!important }');
	addGlobalStyle('.ad_holder , #promo {display:none!important;visibility:hidden!important;background-color: gray} #content { width: 85%} ');	
	addGlobalStyle('body#companyprofile #profileholder, body#party #profileholder, body#newspaper #profileholder { width: 480px!important}');
	
	addGlobalStyle('.linealog {  padding-left: 4px;margin-top: 5px;  font-size: 13px;  color:black;  font-family: helvetica,verdana;}');
	
	
	ex("content").innerHTML = "";
	
	
	var html = ""+
	"Ataca:<br/><textarea id='atacantes' style='width: 100%'>1049991,1620602,13068</textarea>"+
	"Defiende<br/><textarea id='defensores' style='width: 100%'>1865303,1862652,1879869,1898535,1840766,1898582,1887585,1858960,1756944,1788383</textarea>"+
	"<div id='botonera'></div>"+
	"<div id='peleando_0' style='padding: 4px;height: 50px;background-color: orange'></div><br style='clear: both' />"+
	"<div id='peleando_1' style='padding: 4px;height: 50px;background-color: green'></div><br style='clear: both' />"+
	""+
	"<p id='batalla' style='width: 100%;background-color: #eee;font-family: verdana;margin-left: 4px;color: black;line-height: 1.2' > ** BATALLA ** </p>"+
	"";
	
	
	ex("content").innerHTML = html;
	
	
	var boton = dc("input");
	
	boton.setAttribute("type","button");
	boton.setAttribute("value","Simular!");
	//boton.addEventListener("click", simularBatalla, true)
	
	$(boton).click( simularBatalla );
	
	ex("botonera").appendChild( boton );
}


function  trigger_mostrargui(e){
	e.stopPropagation( );
	e.preventDefault( );

	gui_generar();

	return false;
}


/* ******************** DATA ******************** */

var url = document.location.href;
var isEmployeesArea = url.match("/company-employees/"); //don't really needed, since this script will only run on the valid area... 
var isArticle = url.match("/article/");

var isBadges = url.match("/badges");

var ATACANTES = 0;
var DEFENSORES = 1;

var rank2bonus = new Array();


rank2bonus["Private"] = 1;
rank2bonus["Corporal"] = 2;
rank2bonus["Sergeant"] = 3;
rank2bonus["Lieutenant"] = 4 ;
rank2bonus["Captain"] = 5 ;
rank2bonus["Colonel"] = 6 ;
rank2bonus["General"] = 7 ;
rank2bonus["Field Marshal"] = 8;

var rank2rango = new Array();
rank2rango["Private"] = "Soldado raso";
rank2rango["Corporal"] = "Cabo";
rank2rango["Sergeant"] = "Sargento";
rank2rango["Lieutenant"] = "Teniente" ;
rank2rango["Captain"] = "Capitan" ;
rank2rango["Colonel"] = "Coronel" ;
rank2rango["General"] = "General" ;
rank2rango["Field Marshal"] = "Mariscal de Campo";

var pensamiento = new Array();
var i=0;
pensamiento[i++]= "A single death is a tragedy; a million deaths is a statistic.";
pensamiento[i++]= "I believe that people would be alive today if there were a death penalty.";
pensamiento[i++]= "The quickest way to end a war is to lose it. ";
pensamiento[i++]= "I know not with what weapons World War III will be fought,  but World War IV will be fought with sticks and stones.";
pensamiento[i++]= "War is much too serious a matter to be entrusted to the military.";
pensamiento[i++]= "War is a series of disasters which result in a winner.";
pensamiento[i++]= "War is not nice.";
pensamiento[i++]= "'War is a game that is played with a smile. If you can't smile,  grin. If you can't grin,  keep out of the way till you can.'";
pensamiento[i++]= "To be prepared for war is one of the most effective means of preserving peace.";
pensamiento[i++]= "'Stay out of the road,  if you want to grow old.'";
pensamiento[i++]= "'Death is a very dull,  dreary affair,  and my advice to you is to have nothing whatsoever to do with it.'";
pensamiento[i++]= "Many that live deserve death.  And some that die deserve life.";
pensamiento[i++]= "'And lastly there is the oldest and deepest desire,  the Great Escape: the Escape from Death.'";
pensamiento[i++]= "'As to you,  Life,  I reckon you are the leavings of many deaths; No doubt I have died,  myself ten thousand times before.'";
pensamiento[i++]= "Men are at war with each other because each man is at war with himself.";
pensamiento[i++]= "'It's not that I'm afraid to die,  I just don't want to be there when it happens.'";
pensamiento[i++]= "It is hard to have patience with people who say 'There is no death' or 'Death doesn't matter.' There is death and whatever is matters.";
pensamiento[i++]= "A man's dying is more the survivors' affair than his own.";
pensamiento[i++]= "I do not believe in a fate that falls on men however they act; but I do believe in a fate that falls on them unless they act.";
pensamiento[i++]= "A man who won't die for something is not fit to live.";
pensamiento[i++]= "'Once the game is over,  the king and the pawn go back in the same box.'";
pensamiento[i++]= "I have not yet begun to fight!";
pensamiento[i++]= "'Mankind must put an end to war,  or war will put an end to mankind.'";
pensamiento[i++]= "Wars have never hurt anybody except the people who die.";
pensamiento[i++]= "War does not determine who is right - only who is left.";
pensamiento[i++]= "'We improve ourselves by victories over ourself. There must be contests,  and you must win.'";
pensamiento[i++]= "'We succeed only as we identify in life,  or in war,  or in anything else,  a single overriding objective,  and make all other considerations bend to that one objective.'";
pensamiento[i++]= "'Experience is a hard teacher because she gives the test first,  the lesson afterwards.'";
pensamiento[i++]= "You might as well fall flat on your face as lean over too far backwards.";
pensamiento[i++]= "Courage is being scared to death - but saddling up anyway";
pensamiento[i++]= "Death is more universal than life; everyone dies but not everyone lives.";
pensamiento[i++]= "Imagination is the one weapon in the war against reality.";
pensamiento[i++]= "'You can't say that civilization don't advance,  however,  for in every war they kill you in a new way.'";
pensamiento[i++]= "...Sometime they'll give a war and nobody will come.";
pensamiento[i++]= "'It is well that war is so terrible,  or we should get too fond of it.'";
pensamiento[i++]= "You can no more win a war than you can win an earthquake.";
pensamiento[i++]= "War is one of the scourges with which it has pleased God to afflict men.";
pensamiento[i++]= "In war there is no substitute for victory.";
pensamiento[i++]= "'War isn't about who's right,  its about who's left.'";
pensamiento[i++]= "The object of war is not to die for your country but to make the other bastard die for his.";
pensamiento[i++]= "Much good work is lost for the lack of a little more.";
pensamiento[i++]= "'When defeat comes,  accept it as a signal that your plans are not sound,  rebuild those plans,  and set sail once more toward your coveted goal.'";



var opciones = new Object();
opciones.mostrar_curas = false;




/*  ********************  PROCESS   ******************** */


GM_log("-----------------------------------");


$(document).ready(function() {

	var items = document.getElementsByTagName("a");
	
	for(var t=0;t<items.length;t++){
	
		if (items[t]) {
			if (items[t].getAttribute("href")=="/en/badges" || items[t].getAttribute("href")=="/es/badges"){	
				var item = items[t];
				var cajamenu = item.parentNode.parentNode;
				
				GM_log("Menu entry for BattleSim created");
	
				GM_log(" adding option....");
	
				var html = cajamenu.innerHTML;			
				cajamenu.innerHTML +=  "<li><a href='#' id='mostrarBattleSim'>BattleSim</a></li>";
				
				ex("mostrarBattleSim").addEventListener("click", trigger_mostrargui, true)	
				//alert( $("#mostrarBattleSim").toSource() );
				
				
				
				// $("#mostrarBattleSim").click( trigger_mostrargui);
				
				break;
			} else {
				//GM_log(t+") no es.."+items[t].getAttribute("href"));
			}
		}
	}
});    





/* ************* MISC ********************** */

/*


{"is_president":false,
	"skills":[{"value":4.7,"domain":"land"},{"value":0.0,"domain":"constructions"}],
	"country":"USA",	
	"newspaper":"Binary Zoo",
	"experience_points":764,
	"newspaper_id":192772,
	"is_congressman":false,
	"country_id":24,
	"fights":270,
	"level":17,
	"sex":"M",
	"avatar_link":"http:\/\/static.erepublik.com\/uploads\/avatars\/Citizens\/2009\/07\/08\/32a3826a9194983e16e3090895f3765d_55x55.jpg",
	"employer":"Richter Groundworks 80+ Well",
	"damage":3679,
	"date_of_birth":"2009-07-08T14:42:37Z",
	"military_rank":"Lieutenant",
	"medals":[{"type":"super trooper","amount":1},{"type":"hard worker","amount":2},{"type":"avatar change","amount":0}],
	"friends":[{"id":2},{"id":494892},{"id":1401069},{"id":1258669},{"id":1609104},{"id":431212},{"id":703682},{"id":1359698},{"id":1476525},{"id":1627905},{"id":1224037},{"id":7279},{"id":1408159},{"id":335672},{"id":13068},{"id":1227036},{"id":1603210},{"id":1716064},{"id":1716336},{"id":1355044},{"id":1653321},{"id":876021},{"id":1735403},{"id":1411322},{"id":1130912},{"id":1558330},{"id":12912},{"id":1372553},{"id":420962},{"id":1496251},{"id":12737},{"id":1745181},{"id":1655282},{"id":1200264},{"id":1563161},{"id":57891},{"id":102112},{"id":1666393},{"id":811042},{"id":1326937},{"id":1252340},{"id":1743997},{"id":769381},{"id":580161},{"id":1620163},{"id":1732248},{"id":1438651},{"id":1779330},{"id":1320457},{"id":1689793},{"id":1544957},{"id":312871},{"id":1246339},{"id":1287195},{"id":1239977},{"id":1728117},{"id":3187},{"id":781811},{"id":1242525},{"id":1073242},{"id":1644023},{"id":1743206},{"id":1479403},{"id":1562541},{"id":741912},{"id":1886485}],
	"wellness":93.67,
	"citizenship":{"c_id":29,"country":"United Kingdom"},
	"region":"Florida",
	"employer_id":188473,
	"is_general_manager":false,
	"name":"Teiman",
	"strength":6.16,
	"id":1620602,
	"region_id":48,
	"is_party_member":false}
*/

