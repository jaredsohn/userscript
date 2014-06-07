// U-cursos Improve. Menus
// version 3.1
// Copyright (c) 2010, Nicolas Lehmann
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// This program is free software; you can redistribute it and/or modify it under
// the terms of the GNU General Public License as published by the Free Software
// Foundation; either version 2 of the License, or (at your option) any later
// version. This program is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
// details. You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software Foundation, Inc.,
// 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
//
// --------------------------------------------------------------------
//
// Añade menus desplegables generados dinamicamente a u-cursos
//
// --------------------------------------------------------------------//
// ==UserScript==
// @name           U-cursos Improve. Menus
// @description    Añade menus desplegables a u-cursos
// @author         Nicolas Lehmann
// @copyright      2012, Nicolas Lehmann
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @namespace      U-cursos_improve
// @include        https://www.u-cursos.cl/*
// ==/UserScript==


//var began_loading = (new Date()).getTime();


//Modulos que apararecen en el menu de acceso rapido
//La llave es usada como nombre y el valor para la imágen y el link
var quick_menu_modules = {
    'Foro': 'foro',
    'Notas Parciales': 'notas', 
    'Material Alumnos': 'material_alumnos',
    'Material Docente': 'material_docente'
};

var fade_time = 200; //Tiempo del Fade out/in [ms]
var out_time = 400;  //Tiempo para volver a entrar al menu [ms]



/**
 * Hace una petición ajax para determinar y crear los modulos de un curso
 * @param url Url a la cual hacer la petición
 * @param menu_completo Lista donde ingresar los modulos
 * @param box Tipo de caja (Institucion, Curso o Comunidad)
 */
function requestModules(url, menu_completo, box) {
    var method = 'GET';
    var req = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    req.onreadystatechange = function() {

        //Si la petición ha llegado
        if(this.readyState == 4) {
            var ajax_response = this.responseText;

            var inicio = 0, fin;
            inicio = ajax_response.indexOf('<ul class="modulos">');
            fin = ajax_response.indexOf('</ul>', inicio);

            modulos = ajax_response.substring(inicio, fin);
            inicio = 0;

            var menulist = menu_completo;
            
            //Quitamos los la imagen de carga
            menulist.innerHTML = "";
            var modulo = {};
            var i = 0;
            while(( inicio = modulos.indexOf('<a href="', inicio)) != -1) {
                fin = modulos.indexOf('"', inicio + 9);
                modulo.href = modulos.substring(inicio + 9, fin);

                inicio = modulos.indexOf('<img src="', fin)
                fin = modulos.indexOf('"', inicio + 10);
                modulo.img = modulos.substring(inicio + 10, fin);

                inicio = modulos.indexOf('<span>', fin);
                fin = modulos.indexOf('</span>', inicio);
                modulo.name = modulos.substring(inicio + 6, fin);

                if(box != 'cursos' || !quick_menu_modules[modulo.name]) {
                    menulist.appendChild(createModule(modulo));
                }
                inicio = fin + 1;
                ++i;
            }
        }

    }
    try {
        req.open(method, url, true);
    } catch( e ) {
        return 'error en req.open';
    }
    req.send();
}


/**
 * Crea un menu para un curso
 * @param menuid Id del nuevo menu a crear
 * @param link_curso Link del curso a crear.
 * @param box Indica el tipo de caja. Instituicion, Curso o Comunidad
 */
function createMenu(menuid, link_curso, caja) {
    //console.log('createMenu')
    var menu_completo = document.createElement('ul');
    menu_completo.innerHTML = '<li><span style="margin-left:70px"><img src="https://www.u-cursos.cl/diseno/images/cargando.gif"/></span></li>';
    menu_completo.id = "menu_completo_" + menuid;
    menu_completo.setAttribute('class', 'menu_completo');

    var list_container = document.getElementById(menuid).getElementsByClassName('list_container')[0];

    if(caja == 'cursos') {
        addClassName(menu_completo, 'cerrado');
        list_container.appendChild(createQuickMenu(menuid, link_curso, function(){
            removeClassName(menu_completo, 'cerrado');
        }));
    }
    list_container.appendChild(menu_completo);
    
    requestModules(link_curso, menu_completo, caja);

}

/**
 * Crea una lista de acceso rapido con los modulos notas, material alumnos, material docente y foro
 * @param menuid Id del menu
 * @param link_curso Link del curso asociado
 * @param more  Funcion a ejecutar cuando el botón más es presionado
 * @return Lista de modulos de acceso rapido
 */
function createQuickMenu(menuid,link_curso, more) {
    var direccion_img = 'https://www.u-cursos.cl/ingenieria/diseno/images/servicios/';

    
    var ul = document.createElement('ul');
    ul.setAttribute('class', 'quick_menu');

    for(var name in  quick_menu_modules){
        var module = {};
        module.href = link_curso + quick_menu_modules[name];
        module.img = direccion_img + quick_menu_modules[name] +'.png';
        module.name = name;
        ul.appendChild(createModule(module));
    }

    var flecha = document.createElement('li');
    flecha.innerHTML = '<span style="margin-left:70px"><b style="cursor:pointer">\u25bc</b></span>';
    flecha.setAttribute('class', 'mas');
    flecha.addEventListener('click', function(){
        addClassName(flecha, 'oculta');
        more();
    }, false);


    ul.appendChild(flecha);


    return ul;
}

/**
 * Crea modulo a partir de un objeto de tipo modulo
 * @param modulo Objeto de tipo modulo con los atributos img, name y href
 */
function createModule(modulo) {
    /*
     * Formato del Modulo
     * <li> (modulo)
     *      <a> (enlace_modulo)
     *          <img/> (imagen_modulo)
     *          <span> (titulo_modulo)
     *          </span>
     *      </a>
     * </li>
     */
    var img, enlace_modulo, span;
    img = document.createElement('img');
    img.setAttribute("src", modulo.img);
    span = document.createElement('span');
    span.innerHTML = modulo.name;
    enlace_modulo = document.createElement('a');
    enlace_modulo.setAttribute("href", modulo.href);
    enlace_modulo.appendChild(img)
    enlace_modulo.appendChild(span)
    modulo = document.createElement('li');
    modulo.appendChild(enlace_modulo);

    return modulo;

}

/**
 * Muestra un menu
 * @param menuid Id del menu a mostrar
 */
function show(menuid) {
    //console.log('show');
    var wrapper = document.getElementById(menuid);
    var pop_menu = wrapper.getElementsByClassName('popmenu')[0];
    
    pop_menu.style.display = 'block';

    //Esperamos un poco a que el display sea block y luego mostramos.
    setTimeout(function(){
        removeClassName(wrapper, 'menuoff');

        document.addEventListener('mousemove', move, false);
    
        var outside = false;
    
        function move(event) {
            var mX = event.clientX + window.scrollX;
            var mY = event.clientY + window.scrollY;
            var pos = getAbsoluteElementPosition(wrapper);
            var style = getComputedStyle(wrapper, '');
            var h = parseInt(style.height);
            var w = parseInt(style.width);
    
            if(!(mX > pos.left && mX < pos.left + w && mY > pos.top && mY < pos.top + h)) {
                if(!outside){
                    outside = true;
                    setTimeout(hideMenu, out_time);
                }
            }
            else{
                if(outside){
                    outside = false;
                }
            }
    
        }
    
    
        function hideMenu() {
            if(outside) {
                                
                var listas = wrapper.getElementsByTagName('ul')
                
                addClassName(wrapper, 'menuoff');
                
                //Esperamos a que se oculte el menu para limpiar algunas cosas
                setTimeout(function(){
                    pop_menu.style.display = 'none';
                    //Si tiene lista acceso rapido y menu completo
                    if(listas.length == 2){
                        //Ocultamos el menu completo
                        addClassName(listas[1], 'cerrado');
                        //Agregamos la flecha
                        removeClassName(listas[0].lastChild, 'oculta');
                        //listas[0].lastChild.previousSibling.style.borderBottomStyle = 'dashed';
                    }
                }, fade_time)
                document.removeEventListener('mousemove',move);
                
            }
        }

    },2);
    
}


/**
 * Recorre todos los cursos de una caja agregandole menus
 * @param box Tipo de la caja (cursos, instituciones, comunidades)
 */
addMenus = function(box){
    var caja_cursos = document.getElementById(box);
    if(!caja_cursos)
        return;
    cursos = caja_cursos.getElementsByTagName('ul')[0].getElementsByTagName('li');

    /*Formato de las listas de los cursos
     *<li> (curso)
     *  <a> (enlace_curso)
     *      <div></div> (cargo_curso) | <img /> (imagen_institucion)
     *      <span></span> (titulo_curso)
     *  </a>
     *</li>
     *
     * Formato despues de agregar menus
     *<li> (curso)
     *  <div> (popmenu_wrapper)
     *      <a> (arrow) 
     *      <div> (popmenu)
     *          <h1> (popmenu_header)              
     *                  <div></div>  (cargo_header)
     *          </h1>
     *      </div>         
     *  </div>
     *  <a> (enlace_curso)
     *      <img/> (imagen_curso)
     *      <span></span> (titulo_curso)
     *  </a>
     *</li>
     */
    for( i = 0; i < cursos.length; ++i) {
        var menuid = box+"_popmenu_" + i
        var curso, popmenu_wrapper, popmenu, popmenu_header, enlace_header, list_container, enlace_curso;
        curso = cursos[i];
        enlace_curso = curso.childNodes[0];
 
        
        arrow = document.createElement('a');
        
        
        arrow.addEventListener('click', (function(menuid, enlace_curso) {
            var created = false;
            return function() {
                if( !created ){
                    createMenu(menuid, enlace_curso, box);
                    created = true;
                }
                show(menuid);
            }
        })(menuid, enlace_curso), false);
        arrow.setAttribute('class','arrow');
        
        popmenu_header = document.createElement('h1');
        if( curso.childNodes[0].childNodes[0].src) //si hay imagen es institución
            popmenu_header.innerHTML = '<img src="' + enlace_curso.firstChild.src + '" />';  //institucion
        else
            popmenu_header.appendChild(curso.childNodes[0].childNodes[0].cloneNode(false)) //cargo

        list_container = document.createElement('div');
        list_container.setAttribute('class','list_container');
        
        popmenu = document.createElement('div');
        popmenu.setAttribute('class', 'popmenu');
        popmenu.style.display = 'none';
        popmenu.appendChild(popmenu_header);
        popmenu.appendChild(list_container);
        
        
        popmenu_wrapper = document.createElement('div');
        popmenu_wrapper.setAttribute('id', menuid);
        popmenu_wrapper.setAttribute('class', 'menuwrapper menuoff');
        popmenu_wrapper.style.zIndex = addMenus.zIndex--; //Cada menu está por sobre todos los siguientes
        popmenu_wrapper.appendChild(arrow);
        popmenu_wrapper.appendChild(popmenu);

        curso.insertBefore(popmenu_wrapper, enlace_curso);
    }

}
addMenus.zIndex = 1000;

/*Función anónima que carga los menus*/
(function() {

    var upasaporte = document.getElementById('upasaporte');

    if(!upasaporte) {
        addMenus('cursos');
        addMenus('comunidades');
        addMenus('instituciones');
    }

})();



addGlobalStyle(
    'div.cargos_alumno {'+
    '   background-position: 0 -39px;'+
    '}'
);



addGlobalStyle(
    '.menuwrapper {'+
    '   margin:-1px 0 0 168px;'+
    '   position:absolute;'+
    '   min-width:21px; }'
    
);
    
addGlobalStyle(
    '.menuwrapper .arrow{'+
    '   width:21px;'+
    '   background:url("https://www.u-cursos.cl/diseno/imagenes/caja_abierta.png") no-repeat scroll 0 2px transparent !important;'+
    '   min-height:21px !important;'+
    '   padding:3px 0 4px 30px !important;'+
    '   position:absolute;'+
    '   z-index: 50}'+
    
    '.menuwrapper .arrow:hover{cursor:pointer; }'+
    
    '.menuoff .arrow{'+
    '   padding:0px !important;background-image:url("https://www.u-cursos.cl/diseno/imagenes/caja_cerrada.png") !important; }'
);

addGlobalStyle( 
    '.menuwrapper .popmenu{'+
    '   opacity: 1; '+
    '   -webkit-transition: opacity '+fade_time+'ms ease-in-out;'+
    '   -moz-transition: opacity '+fade_time+'ms ease-in-out;'+
    '   -o-transition: opacity '+fade_time+'ms ease-in-out;'+
    '   transition: opacity '+fade_time+'ms ease-in-out; }'+
    
    '.menuoff .popmenu{'+
    '   opacity: 0;'+
    '}'
  
);
addGlobalStyle(
    '.menuwrapper .popmenu h1{'+
    '   height:28px !important; margin: 0 0 0 10px; width: 150px !important }'
);

addGlobalStyle(
    '.menuwrapper .popmenu h1 div, .menuwrapper .popmenu h1 img{ margin: 4px 0 0 0px;}'    
);
addGlobalStyle(
    '.menuwrapper .popmenu .list_container {'+
    '   -webkit-box-shadow:-2px 3px 8px gray;  -moz-box-shadow:-2px 3px 8px gray;'+
    '   margin:0 0 0 10px !important; }'
);



addGlobalStyle(
    '.menuwrapper .popmenu .list_container .menu_completo{'+
    '   opacity: 1; '+
    '   -webkit-transition: opacity '+fade_time+'ms ease-in-out;'+
    '   -moz-transition: opacity '+fade_time+'ms ease-in-out;'+
    '   -o-transition: opacity '+fade_time+'ms ease-in-out;'+
    '   transition: opacity '+fade_time+'ms ease-in-out;}'+
    
    '.menuwrapper .popmenu .list_container .menu_completo.cerrado{'+
    '   opacity: 0;'+
    '   height: 0;}'
);

addGlobalStyle(
    '.menuwrapper .popmenu .list_container ul{ margin:0 0 0 0px !important;}'
);

addGlobalStyle(
    '.menuwrapper .popmenu .list_container ul li{'+
    '   float:none !important;background-color:#FAFAFA !important;'+
    '   border-color:#bcbcbc !important;'+
    '   border-left-width:1px !important;'+
    '   border-right-width:1px !important;'+
    '   padding-left:4px; width: 153px !important;}'
);

addGlobalStyle( 
    '.menuwrapper .popmenu .list_container ul li.mas{'+
    '   opacity: 1; '+
    '   overflow: hidden;'+
    '   height: 15px;'+
    '   -webkit-transition: opacity '+fade_time+'ms ease-in-out;'+
    '   -moz-transition: opacity '+fade_time+'ms ease-in-out;'+
    '   -o-transition: opacity '+fade_time+'ms ease-in-out;'+
    '   transition: opacity '+fade_time+'ms ease-in-out;'+
    '   padding-top: 2px !important;'+
    '   cursor: pointer;}'+
    
    '.menuwrapper .popmenu .list_container ul li.mas.oculta{'+
    '   height: 0 !important;'+
    '   border: 0 !important;'+
    '   margin: 0 !important;'+
    '   padding-top: 0 !important;padding-bottom: 0 !important;'+
    '   opacity: 0.7;}'
);

addGlobalStyle(
    '.menuwrapper .popmenu .quick_menu li:nth-last-child(2){'+
    '   border-bottom-style: dashed !important;'+
    '   padding-bottom: 1px;'+
    '}'
);



addGlobalStyle(
    '.menuwrapper .popmenu .list_container ul li a{ min-height:18px !important; }'
);
    
addGlobalStyle(
    'div#izquierda div.nuevo{ padding-right:7px; }'+
    
    'div#izquierda div#cursos ul li a{ min-height:21px; }'+
    
    'div#izquierda div ul li.sel div div ul li{ font-weight:normal }'+
    
    'div.off div.menuwrapper { display: none!important }'
);

appendGlobalStyle();


/********************************************/
/************* Utilidades *******************/
/********************************************/

/**
 * Agrega estilo
 * @param str String con el estilo a agregar
 */
var css;
function addGlobalStyle(str) {
    if(!css)
        css = "";
    css += str;
}

/**
 * Agrega las etiquetas de estilo al head de la pagina
 */
function appendGlobalStyle() {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if(!head) {
        return;
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


/**
 * Añade una la clase className a element
 * @param element Elemento o id de alguno
 * @param className Nombre de nueva clase a agregar
 */
function addClassName(element, className) {
    if( typeof element == "string")
        element = document.getElementById(element)
    var clase = "";
    clase = element.getAttribute('class');
    if(!hasClassName(element, className))
        element.setAttribute('class', clase + ( clase ? ' ' : '') + className);
    return element;
}

/**
 * Quita una la calase className a element
 * @param elemento Elemento o id de alguno
 * @param className Nombre de la case a eliminar
 */
function removeClassName(element, className) {
    if( typeof element == "string")
        element = document.getElementById(element)
    var clase = element.getAttribute('class');
    element.setAttribute('class', clase.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), ' '));
    return element;
}

/**
 * Comprueba si element posee la clase className
 * @param element Elemento o id de alguno
 * @param className Nombre de la case a verificar
 * @return Verdadero si element contiene la clase className, falso en caso contrario
 */
function hasClassName(element, className) {
    var elementClassName
    if(!document.getElementById(element)) {
        elementClassName = element.className;
        return (elementClassName.length > 0 && (elementClassName == className || new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
    }
    if(!( element = document.getElementById(element)))
        return false;
    elementClassName = element.className;
    return (elementClassName.length > 0 && (elementClassName == className || new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
}


/**
 * Optiene la posición absoluta del elemento
 * @param element Elemento o id de algun elemento
 */
function getAbsoluteElementPosition(element) {
    if( typeof element == "string")
        element = document.getElementById(element)
    if(!element)
        return {
            top : 0,
            left : 0
        };

    var y = 0;
    var x = 0;
    while(element.offsetParent) {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    }
    return {
        top : y,
        left : x
    };
}


//alert( ((new Date()).getTime() - began_loading) / 1000);



