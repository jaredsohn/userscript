// ==UserScript==
// @name            RellenaPACE
// @description     Rellena las encuestas PACE segun las semanas anteriores o todo con ceros.
// @include         http://www.iccp.upv.es/aplicaciones/encuesta/encuestas.asp
// @copyright		Jomofer
// @version			0.3
// ==/UserScript==


try{

	GM_setValue( "test", "test" );
	var temp = GM_getValue( "test", -1 );
	if ( temp != "test" ){
		GM_setValue = 	function( name, val ){
							localStorage[name] = val;
						}
		GM_getValue =	function( name, defaultValue ){
							if( !localStorage[name] ){
								return defaultValue;
							}
							else{
								return localStorage[name];
							}
						}
	}
	
}
catch( ex ){

	GM_setValue = 	function( name, val ){
						localStorage[name] = val;
					}
	GM_getValue =	function( name, defaultValue ){
						if( !localStorage[name] ){
							return defaultValue;
						}
						else{
							return localStorage[name];
						}
					}
}


function getSubject(){

	var td = document.getElementsByTagName('td');
	for( var i=0; i<td.length; i++ ){

		if( td[i].textContent == "Asignatura" ){
			return td[i+1].textContent;
		}
	}
	return "";
}


function saveHistory(){

	//Get subject name
	var subject = getSubject();

	//Get all inputs
	var inputs = document.getElementsByTagName("input");
	for( var i in inputs ){

		if( inputs[i].value && inputs[i].name.toLowerCase() != "boton" ){	//If not a button...
		
			GM_setValue( subject + " " + inputs[i].name, inputs[i].value );
		}
	}
}

	

//Get subject name
var subject = getSubject();

//Flag to know if we have to add a button to be able to modify the chart
var flag = false;

//Get all inputs
var inputs = document.getElementsByTagName("input");
for( var i in inputs ){

	if( inputs[i].name && inputs[i].name.toLowerCase() != "boton" ){	//If not a button...
	
		if( inputs[i].value == "" && inputs[i].parentNode.innerHTML.indexOf( "enabled" ) != -1 ){	//If empty and enabled...
			if( GM_getValue( subject + " " + inputs[i].name, -1 ) != -1 ){
				inputs[i].value = GM_getValue( subject + " " + inputs[i].name, -1 );		//Fill with history
			}
			else{
				inputs[i].value = "0";	//Fill with zeros
			}
		}
		else if( inputs[i].value && inputs[i].value != "" ){	//It was disabled (and not empty). Change to enabled
			inputs[i].parentNode.innerHTML = inputs[i].parentNode.innerHTML.replace( "disabled", "enabled" );
		}
	}
	else{	//A button
	
		if( ( inputs[i].value && inputs[i].value.toLowerCase() == "guardar" ) || ( inputs[i].value && inputs[i].value.toLowerCase() == "modificar" ) ){
			inputs[i].addEventListener("click", saveHistory, true);		//If we save the chart, we call the save history function
			flag = true;	//We can edit the chart, so we dont have to add another button 
		}
	}
}

//Add a button to modify the disabled chart
if( flag == false ){

	for( var i in inputs ){
	
		if( inputs[i].value && inputs[i].value == "Cancelar" ){

			inputs[i].parentNode.parentNode.innerHTML = "<td><img src='Imagenes/Linea-inferior.png'></td><td><input name='boton' value='Modificar'" + 
														"type='submit' style='color:#000080;font-family:Tahoma;font-weight:bold;font-size:13px'></td>" +
														"<td><input name='boton' value='Cancelar'" + 
														"type='submit' style='color:#660033;font-family:Tahoma;font-weight:bold;font-size:13px'></td></td>";					
			break;
		}
	}
}
