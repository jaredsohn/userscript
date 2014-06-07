// ==UserScript==
// @name        ayudaenlabusqueda.com.ar redirector
// @namespace   http://www.ayudaenlabusqueda.com.ar/
// @description Auto click, redirect
// @include     http://*.ayudaenlabusqueda.com.ar/*
// @include     http://www.ayudaenlabusqueda.com.ar/*
// @copyright   2010, Perberos (perberos@gmail.com)
// @license     (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version     1.0
// @author      German Perugorria (Perberos)
// @homepage    http://matsusoft.com.ar/
// ==/UserScript==

//
// redirige el script de timofonica!
//
if (location.href.indexOf("http://www.ayudaenlabusqueda.com.ar/") == 0)
{
	var new_url = location.href.replace("http://www.ayudaenlabusqueda.com.ar/",
		"http://www.google.com.ar/search");
	new_url = new_url.replace("&curl=", "&source=matsusoft&curl=");
	location.href = new_url;
}
