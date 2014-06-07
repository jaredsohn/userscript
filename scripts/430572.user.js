/*jslint indent:8, devel:true, browser:true, vars:true*/
/*global jQuery, $, console*/
// ==UserScript==
// @name        AnchorMe-MinimalEdition
// @namespace   http://userscripts.org/smux
// @description Set a reading mark in the pages you choose. Never forget where your reading finish last time.
// @include     https://developer.mozilla.org/*
// @include     http://www.2ality.com/2013/06/basic-javascript.html*
// @include     http://www.atareao.es/*
// @include     http://addyosmani.github.io/backbone-fundamentals/*
// @include     https://github.com/Nijikokun/the-zen-approach/blob/master/*
// @version     0.1
// @grant       none
// ==/UserScript==
// Puede que la página ya disponga de jQuery, por lo que no se importa por defecto
// -@-require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
//
/*
 * Haciendo doble click sobre un texto se crea un marcador.
 * Solo se permite un marcador, así que si se vuelve a hacer doble click el primer marcador se elimina.
 * Debe guardarse el marcador en localStorage para añadirlo al cargar la página
 *
 * TODO:
 * - 
 */

/*
 The MIT License (MIT)
 
 Copyright (c) 2013 Samuel González Izquierdo
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of
 this software and associated documentation files (the "Software"), to deal in
 the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 the Software, and to permit persons to whom the Software is furnished to do so,
 subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

'use strict';

//Activa o desactiva el logging
var DEBUG = true;

var log = function (logString) {
        if (DEBUG && console) {
                console.log(logString);
        }
};
log('>>> Greasemonkey\'s working!');


// Objeto de utilidades: Get y Set del marcador de la página (a localStorage)
var util = {
        cache: {
                setBookMark: function (key, obj) {
                        log("key:" + key + " \nobj.type:" + obj.type + "\nobj.position: " + obj.position);
                        localStorage.setItem(key, JSON.stringify(obj));
                },
                getBookMark: function (key) {
                        var objStored = localStorage.getItem(key);
                        if (objStored) {
                                objStored = JSON.parse(objStored);
                                log("key:" + key + " \nobj.type:" + objStored.type + "\nobj.position: " + objStored.position);
                                return objStored;
                        }
                        return undefined;
                },
                deleteBookMark: function (key) {
                        localStorage.removeItem(key);
                        log("Marcador eliminado para página: " + key);
                }
        },
        textos: {
                btoIrHayMarcador: "Ir al marcador!",
                btoIrNoHayMarcador: "No hay marcador",
                infoMarca: "Marcador añadido",
                infoMarcable: "M",
                eliminar: "¿Eliminar?"
        }
};

//Objeto principal de la aplicación
var App = {

        key: window.location.href.split("#")[0],
        ANCHOR: "smuxAnchor",
        marcador: {
                type: "",
                position: 0
        },
        hayMarcador: false,
        enConfirmacion: false,
        confirmacionEliminacion: false,

        //Estilos necesarios para el script.
        //Deben prefijarse para evitar repetir nombres de clases que ya pudiesen existir en la página (Me ha pasado!!!!)
        //Mi prefijo será: smx-
        estilos: "" +
        "@font-face{" +
                "font-family: smx-FontAwesome;" +
                "src:url(https://netdna.bootstrapcdn.com/font-awesome/2.0/font//fontawesome-webfont.eot?#iefix) format('eot')," +
                "url(https://netdna.bootstrapcdn.com/font-awesome/2.0/font//fontawesome-webfont.woff) format('woff')," +
                "url(https://netdna.bootstrapcdn.com/font-awesome/2.0/font//fontawesome-webfont.ttf) format('truetype')," +
                "url(https://netdna.bootstrapcdn.com/font-awesome/2.0/font//fontawesome-webfont.svg#FontAwesome) format('svg');" +
                "font-weight:400;" +
                "font-style:normal;" +
        "}" +
        ".smx-info {" +
                "font: 14px/1.5 sans-serif;" +
                "display: inline;" +
                "background: #d04848;" +
                "color: white;" +
                "opacity: 0;" +
                "padding-right: 20px;" +
                "text-align: right;" +
                "box-sizing: border-box;" +
                "position: fixed;" +
                "z-index: 99998;" +
                "top: 10px;" +
                "left: -155px;" +
                "width: 160px;" +
                "box-shadow: #b5b5b5 0 2px 6px 2px;" +
                "border-radius: 5px 2px 2px 5px;" +
                "transition: width 0.3s ease-out;" +
        "}" + 
        ".smx-contenedor {" +
                "font: 14px/1.5 sans-serif;" +
                "background: black;" +
                "color: white;" +
                "opacity: 0.3;" +
                "text-align: center;" +
                "position: fixed;" +
                "z-index: 99999;" +
                "top: 10px;" +
                "left: -155px;" +
                "width: 160px;" +
                "text-align: right;" +
                "box-sizing: border-box;" +
                "padding-right: 10px;" +
                "border-radius: 5px 2px 2px 5px;" +
                "box-shadow: #b5b5b5 0 2px 6px 2px;" +
                "cursor: pointer;" +
                "transition: width 0.3s ease-out;" +
        "}" +   
        ".smx-contenedor:hover {" +    
                "width: 320px;" +
        "}" +
        ".smx-boton {" +
                "display: inline;" +
        "}" +           
        ".smx-boton:hover {" +
                "opacity: 0.6;" +
        "}" +  
        ".smx-boton-hover-off:hover {" +
                "opacity: 1;" +
        "}" +          
        ".smx-boton:active {" +
                "opacity: 0.3;" +
        "}" +     
        ".smx-boton-active-off:active {" +
                "opacity: 1;" +
        "}" +         
        ".smx-eliminar {" +
                "font-family: smx-FontAwesome; " +
                "padding-left: 10px;" +
        "}" +
        ".smx-eliminar::after {" +
                "content: '\\f014';" +
                "font-size: 1em;" +
        "}" +
        ".smx-eliminar-confirmar::after {" +
                "content: '\\f057';" +
                "font-size: 1em;" +
        "}" +           
        ".smx-eliminar:hover::after {" +
                "opacity: 0.6;" +
        "}" +               
        ".smx-eliminar:active::after {" +
                "opacity: 0.3;" +
        "}" +
        ".smx-eliminar-hover-off:hover::after {" +
                "opacity: 1;" +
        "}" +               
        ".smx-eliminar-active-off:active::after {" +
                "opacity: 1;" +
        "}" +        
        ".smx-marcable {" +
                "display: none;" +
                "box-sizing: border-box;" +
                "position: absolute;" +
                "font-size: 10px; /*Si se utiliza 'em' se hereda el tamaño del contenedor*/" +
                "font-weight: bold;" +
                "width: 50px;" +
                "heigth: 15px;" +
                "line-height: 15px;" +
                "text-align: center;" +
                "background-color: #f4cece;" +
                "color: white;" +
                "opacity: 0.6;" +
                "border-radius: 4px 4px 0 0;" +
                "box-shadow: #b5b5b5 0 2px 6px 2px;" + 
                "transform: translate(0, -14px); /*Lo mismo: transform:translateX(-18px);*/" +
        "}" +
        " /*//NOTE: esta clase debe ser la última para que sobreescriba a las demás. */" +
        ".activo {" +
                "opacity: 1;" +
        "}",

        loadScript: function () {
                this.cargarInterfaz();
                this.agregarMarcadorAlmacenado();
                this.bindElements();
                
        },
        
        //Carga los elementos de la interfaz y los cachea
        cargarInterfaz: function () {
                
                //Añado los estilos a la página
                $("head").append("<style>" + this.estilos + "</style>");

                //Añado el botón de Ir al Marcador
                $("body").append("<div class='smx-contenedor'><div class='smx-boton'>" + util.textos.btoIrHayMarcador + "</div><span class='smx-eliminar'></span></div><div class='smx-info'>" + util.textos.infoMarca + "</div>");
                
                //Añado el mensaje que informa si el elemento sobre el que está el cursor es "marcable"
                $("body").append("<div class='smx-marcable'>" + util.textos.infoMarcable + "</div>");
                
                //Cacheo
                this.btoIr = $(".smx-boton");
                this.infoNuevoMarcador = $(".smx-info");
                this.contenedor = $(".smx-contenedor");
                this.eliminar = $(".smx-eliminar");
                this.marcable = $(".smx-marcable");
        },

        // Función ejecutada al iniciar que recoge de localStorage el marcador 
        // y añade en el lugar adecuado <a name="marcador"></a>    
        agregarMarcadorAlmacenado: function () {
                var marcadorTemporal = util.cache.getBookMark(this.key),
                        elementos;
                
                //Si hay un marcador para esta página
                if (marcadorTemporal) {
                        //Colección de los elementos del tipo del elemento marcado
                        elementos = $(marcadorTemporal.type);
                        var that = this;

                        $.each(elementos, function (i) {
                                if (i === marcadorTemporal.position) {
                                        $(this).before("<a name='" + that.ANCHOR + "'></a>");
                                        //FIXME: Por alguna razón 'break' falla ?¿?¿?
                                        //break;
                                }
                        });
                        
                        this.activarBoton();
                        this.hayMarcador = true;
                        
                        log("Marcador Temporal Almacenado agregado a la página.");
                } else {
                        
                        //No existe marcador para esta página
                        this.desactivarBoton();
                }
                
        },

        bindElements: function () {
                
                //Solo es posible añadir un marcador a los elementos h1, h2, h3, h4, y p.
                $("h1, h2, h3, h4, p").on("dblclick", this.setMarcador.bind(this));
                
                $("h1, h2, h3, h4, p").on("mouseover", function (event) {
                        // Mostrar etiqueta informativa de elementno "marcable";       
                        $(event.target).prepend(this.marcable);
                        this.marcable.css("margin-button", "30px");
                        this.marcable.show();
                }.bind(this));
                
                $("h1, h2, h3, h4, p").on("mouseout", function (event) {
                        // Esconder etiqueta informativa de elementno "marcable";       
                        this.marcable.hide();
                }.bind(this));
                
                this.btoIr.on("click", function () {
                        window.location.hash = this.ANCHOR;
                }.bind(this));
                
                this.eliminar.on("click", this.confirmarEliminar.bind(this));
                
                this.contenedor.on("mouseover", function () {
                        this.confirmacionEliminacion = false;
                        this.eliminar.removeClass("smx-eliminar-confirmar");
                }.bind(this));

        },

        setMarcador: function (event) {

                //Llamada a la función que guarda la información en localStorage
                //Machaca si existe un marcador anterior
                $("a[name='" + this.ANCHOR + "']").remove();
                
                this.marcador.type = $(event.target)[0].tagName;

                var that = this;

                //Selector con todos los elementos del mismo tipo que el seleccionado
                var elementos = $($(event.target)[0].tagName);
                $.each(elementos, function (i) {
                        if (this === event.target) {
                                that.marcador.position = i;
                        }
                });

                this.key = window.location.href.split("#")[0];

                //Guarda en localStorage el marcador de la página
                util.cache.setBookMark(this.key, this.marcador);
                
                //Se incluye el marcador en la página para ser usuado en esta sesión
                $(event.target).before("<a name='" + this.ANCHOR + "'></a>");
                
                this.activarBoton();
                this.hayMarcador = true;
                //Muestra, mediante animación, que se ha añadido un marcador
                this.infoNuevoMarcador.css('width', '320px')
                        .delay(2000).queue(function () {
                                that.infoNuevoMarcador.css('width', '160px').dequeue();
                        });
                log('Marcador añadido: ' + $(event.target)[0].tagName);
        },
        
        confirmarEliminar: function (event) {
                if (this.hayMarcador) {
                        if (!this.confirmacionEliminacion) {
                                this.eliminar.addClass("smx-eliminar-confirmar");
                                this.confirmacionEliminacion = true;
                        } else {
                                this.confirmacionEliminacion = false;
                                this.eliminar.removeClass("smx-eliminar-confirmar");
                                this.eliminarMarcador();
                        }
                }
        },
        
        eliminarMarcador: function () {
                util.cache.deleteBookMark(this.key);
                $("a[name='" + this.ANCHOR + "']").remove();
                this.hayMarcador = false;
                this.desactivarBoton();
        },
        
        desactivarBoton: function () {
                this.infoNuevoMarcador.removeClass("activo");
                this.contenedor.removeClass("activo").css("cursor", "text");
                this.btoIr.text(util.textos.btoIrNoHayMarcador).addClass("smx-boton-hover-off smx-boton-active-off");
                this.eliminar.addClass("smx-eliminar-hover-off smx-eliminar-active-off");
        },
        
        activarBoton: function () {
                this.infoNuevoMarcador.addClass("activo");
                this.contenedor.addClass("activo").css("cursor", "pointer");
                this.btoIr.text(util.textos.btoIrHayMarcador).removeClass("smx-boton-hover-off smx-boton-active-off");
                this.eliminar.removeClass("smx-eliminar-hover-off smx-eliminar-active-off");
        }

};

//Cargar jQuery si la página no lo tiene. 
var isJQuery = (typeof jQuery === "undefined") ? false : true;

// Si la página no dispone de jQuery hay que incluirlo, por lo que se debe esperar un tiempo
// a que la biblioteca cargue
if (!isJQuery) {
        log(">>No se ha detectado jQuery en la página, por lo que se procede a su carga...");
        var script = document.createElement("script");
        script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js";
        document.head.appendChild(script);
        
        //NOTE: setTimeout() causes javascript to use the global scope ('this' is 'window')
        setTimeout(App.loadScript.bind(App), 6000);
} else {
        
        //Si se dispone de jQuery se podrá esperar menos, pero hay que dar tiempo a que la página cargue completamente
        //Las páginas maś complejas se cargan desde varias fuentes, por lo que el "ready" de jQuery no es definitivo.
        log(">>La página ya dispone de jQuery. Se comenzará con el Script en 2 segundos.");
        //NOTE: setTimeout() causes javascript to use the global scope ('this' is 'window')
        
        setTimeout(App.loadScript.bind(App), 2000);
}