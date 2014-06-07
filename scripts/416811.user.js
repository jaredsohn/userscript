/*
 * Escrito por Alberto García González.
 * Contacto: alberto.garciagonza@alum.uca.es
 * 
 * Copyright 2012, 2013 Alberto García González.
 * 
 * Este fichero es parte de Campus UCA.
 * 
 * Campus UCA es software libre: puede redistribuirlo y/o modificarlo
 * bajo los términos de la GNU General Public License tal como han sido 
 * publicados por la Free Software Foundation, bien de la versión 3 de
 * la licencia o de cualquier versión posterior (a su elección).
 * 
 * Campus UCA se distribuye con la esperanza de que sea útil,
 * pero SIN NINGUNA GARANTÍA, incluso sin la garantía implícita de
 * COMERCIALIZACIÓN o IDONEIDAD PARA UN PROPÓSITO PARTICULAR. Consulte la
 * GNU General Public License para más detalles.
 * 
 * Debería haber recibido una copia de la GNU General Public License
 * junto con Campus UCA. Si no es así, consulte <http://www.gnu.org/licenses/>.
 * 
 */

// ==UserScript==
// @name        Campus UCA
// @namespace   CampusUCA
// @description Añade mejoras al campus virtual de la Universidad de Cádiz.
// @include     https://*.uca.es/moodle*/*
// @version     1
// @grant       none
// ==/UserScript==

// De momento solo se incluyen las funciones que renombran asignaturas.

// Clase encargada de renombrar las asignaturas
function CU_Renombrador() {
	/*****************
	 * Atributos
	 *****************/
    // Patrón para la búsqueda del nombre del grado mediante expresiones regulares.
    this.patronNomGrado = / - GRADO EN .*$/i;
    this.mostrarGrado = false;

    // Palabras que se deben eliminar del nombre.
    this.filtro = ["DE", "DEL", "Y", "EN", "A", "LA", "CON", "AL", "EL", "LOS", "LAS"];
	
	// Se buscan los objetos que contienen los nombres de las asignaturas en el DOM y se almacenan
	this.asignaturasNavBar = document.querySelectorAll("div.breadcrumb > ul > li > a");
	
	// Se comprueba la versión de moodle
	if(this.asignaturasNavBar[1].innerHTML == "Mis cursos") {
		this.curso1314 = true;
		this.numNavBar = 3;
	} else {
		this.curso1314 = false;
		this.numNavBar = 1;
	}
	
    this.asignaturasMenu = document.querySelectorAll("li.contains_branch > p.tree_item > a"); // otro: li.contains_branch > p.tree_item > a
	
	/*****************
	 * Métodos
	 *****************/
	// Comprueba si texto pertenece a la lista de palabras excluidas
	this.pertenece = function(texto) {
		for(var i in this.filtro)
			if(texto.toUpperCase() == this.filtro[i])
				return true;
		
		return false;
	};

	// Obtiene el nombre de una asignatura como un array de cadenas de texto, lo procesa y devuelve sus siglas.
	this.dameSiglas = function(arrTexto) {
		 var siglas = "";
		 var cierraParentesis = false, abreParentesis = false, punto = false;
		 
		 // Para cada palabra del nombre...
		 for(var i in arrTexto) {
			  // Comprobamos paréntesis
			  if(arrTexto[i][0] == "(") {
				   siglas += " (";
				   arrTexto[i] = arrTexto[i].substring(1, arrTexto[i].length);
				   abreParentesis = true;
			  }
			  
			  // Si la palabra no pertenece al filtro
			  if(!this.pertenece(arrTexto[i])) {
				   // Comprobamos que el primer carácter no sea un número
				   if(isNaN(arrTexto[i][0])) {
						// Si hay que cerrar paréntesis al final
						if(arrTexto[i][arrTexto[i].length - 1] == ")")
							 cierraParentesis = true;
						// Si termina con un punto
						else if(arrTexto[i][arrTexto[i].length - 1] == ".")
							 punto = true;
						
						// Si es un número romano, se deja tal cual.
						if(arrTexto[i] == "I" || arrTexto[i] == "II" || arrTexto[i] == "III" || arrTexto[i] == "IV" || arrTexto[i] == "V")
							 siglas += " " + arrTexto[i];
						// Si es un guión, se añade junto con otro espacio detrás
						else if(arrTexto[i] == "-")
							 siglas += " " + arrTexto[i] + " ";
						// Si no, se añade la primera letra.
						else
							 siglas += arrTexto[i][0];
				   }
				   // En caso de que el primer carácter sea un número, se añade a siglas la palabra entera (para mostrar fechas completas, etc.)
				   else {
						if(!abreParentesis)
							 siglas += " ";
							 
						siglas += arrTexto[i];
				   }
				   abreParentesis = false;
			  }
			  
			  // Se cierra el paréntesis
			  if(cierraParentesis) {
				   siglas += ")";
				   cierraParentesis = false;
			  }
			  
			  // Se separa de las siguientes palabras
			  if(punto) {
				   siglas += " ";
				   punto = false;
			  }
		 }
		 
		 // Devuelve la cadena siglas que contiene las siglas de la asignatura.
		 return siglas;
	};

	// Método que se encarga de sustituir el código de cada asignatura en el menú por sus siglas.
	this.muestraSiglas = function() {
		// Barra
		// La asignatura se encuentra siempre en la posición 1 del array de asignaturas de la barra de navegación.
		// Se almacena el nombre del grado para posteriormente mostralo si está activada la opción correspondiente.
		
		// Extraer el nombre del grado, solo en el caso del campus anterior al curso 2013-14
		var arrNombreGrado = this.patronNomGrado.exec(this.asignaturasNavBar[this.numNavBar].title);
		var arrTexto = null;
		var nombreGrado = null;
		
		// No encuentra el nombre del grado, caso campus curso 2013-14
		if(arrNombreGrado == null)
			arrTexto = this.asignaturasNavBar[this.numNavBar].title.split(" ");
		else {
			arrTexto = this.asignaturasNavBar[this.numNavBar].title.replace(this.patronNomGrado, "").split(" ");
			nombreGrado = arrNombreGrado[0];
		}
		
		// Si el nombre de la asignatura contiene más de una palabra, se obtienen sus siglas y se insertan sustituyendo el código.
		if(arrTexto.length > 1)
			this.asignaturasNavBar[this.numNavBar].innerHTML = this.dameSiglas(arrTexto);
		// Si el nombre está compuesto de una sola palabra se obtienen las 3 primeras letras de la palabra y se insertan sustituyendo el código.
		else
			this.asignaturasNavBar[this.numNavBar].innerHTML = arrTexto[0].substring(0, 3);
		 
		// Si está activada la opción de mostrar el nombre de la carrera y no estamos en el curso 2013-14 se vuelve a añadir al final
		if(this.numNavBar == 1 && this.mostrarGrado == true && arrNombreGrado != null)
			this.asignaturasNavBar[this.numNavBar].innerHTML += this.dameSiglas(nombreGrado.substring(1, nombreGrado.length).split(" "));
		 
		// Menú
		// Recorre la lista de asignaturas del menú.
		for(var i in this.asignaturasMenu) {
			// En el curso 13-14 no aparece el nombre del grado en el menú "Mis cursos", luego hay que darle algún valor.
			// Dicho valor además deberá ser nulo cuando no se trate de alguna asignatura.
			if(this.curso1314)
				nombreGrado = this.asignaturasMenu[i].title;
			else
				nombreGrado = this.patronNomGrado.exec(this.asignaturasMenu[i].title);
				
			if(nombreGrado) {
				// Se almacena el nombre del grado para posteriormente mostralo si está activada la opción correspondiente.
				nombreGrado = nombreGrado[0];
				arrTexto = this.asignaturasMenu[i].title.replace(this.patronNomGrado, "").split(" ");
			   
			    // Si el nombre de la asignatura contiene más de una palabra, se obtienen sus siglas y se insertan sustituyendo el código.
			    if(arrTexto.length > 1)
					this.asignaturasMenu[i].innerHTML = this.dameSiglas(arrTexto);
			    // Si el nombre está compuesto de una sola palabra se obtienen las 3 primeras letras de la palabra y se insertan sustituyendo el código.
			    else
					this.asignaturasMenu[i].innerHTML = arrTexto[0].substring(0, 3);
			   
			    // Si está activada la opción de mostrar el nombre de la carrera se vuelve a añadir al final
			    if(this.mostrarGrado == true && !this.curso1314)
					this.asignaturasMenu[i].innerHTML += this.dameSiglas(nombreGrado.substring(1, nombreGrado.length).split(" "));
			  }
		 }
	};
}; // CU_Renombrador

function CU_Renombrar() {
	// Instanciación de clases
	renombrador = new CU_Renombrador();

	// Se realiza una petición a la background page de la extensión para obtener la configuración almacenada
	// Mejorar: guardar la config. y añadir método a CU_Renombrador para no tener que volver a crear otro objeto al desplegar
	// el menú y así ahorrar una petición a la background page.
    
    renombrador.muestraSiglas();
};

// Comprueba si se ha desplegado el menú "Mis cursos". En caso negativo, se realiza una nueva llamada tras una pequeña espera.
function CU_RenombrarDesplegable() {
	if(!menuRenombrado) {
		if(menuDesplegable.parentNode.children.length == 2) {
			// Cuando aparece el contenido del menú desplegable se crea otro objeto CU_Renombrador
			CU_Renombrar();
			menuRenombrado = true;
		} else
			setTimeout(CU_RenombrarDesplegable, 500);
	}
};

// Lanza el script
var renombrador = null;
CU_Renombrar();

// En el caso del campus del curso 2013-2014, se busca el menú desplegable "Mis cursos" y se añade un evento
// que debe dispararse cuando se despliegue.
if(renombrador.curso1314) {
	var menuRenombrado = false;
	var nodosMC = document.querySelectorAll('a[href="https://av03-13-14.uca.es/moodle/my/"]');
	var menuDesplegable = nodosMC[2].parentNode;

	// Añade un evento que se dispara cuando se despliega el menú "Mis cursos", que carga dinámicamente las asignaturas.
	if(menuDesplegable)
		menuDesplegable.addEventListener('click', CU_RenombrarDesplegable);
}
