// ==UserScript==
// @name       Ema_login_Firefox
// @namespace  http://use.i.E.your.homepage/
// @version    1.0
// @description  Login automatico en el servidor
// @match      http://*/*
// @copyright  2012+, Ismael Vayra
// @run-at         document-end
// ==/UserScript==

const esp = "http://www.admines.emagister.es/administradores";
const ita = "http://www.adminit.emagister.es/administradores";
const arg = "http://www.adminar.emagister.es/administradores";
const chi = "http://www.admincl.emagister.es/administradores";
const col = "http://www.adminco.emagister.es/administradores";
const mex = "http://www.adminmx.emagister.es/administradores";
const fra = "http://www.adminfr.emagister.es/administradores";
const uka = "http://www.adminuk.emagister.es/administradores";
const bra = "http://www.adminbr.emagister.es/administradores";
const ind = "http://www.adminin.emagister.es/administradores";

const paises = new Array(esp, ita, arg, chi, col, mex, fra, uka, bra, ind);

var dire = document.URL;

//Verifica si estamos entrando en el administrador de cursos

var pais = paises.indexOf(dire);
if (pais != -1){

    function manda(){
        
        var usuario = document.getElementsByName("username")[0].value;
        var passwd = document.getElementsByName("password")[0].value;
        
        setTimeout(function() {
          GM_xmlhttpRequest({
          method: "POST",
          url: "http://localhost/login.php",
          data: "usuario="+usuario+"&contra="+passwd+"&autologin=si",
          headers: {"Content-Type": "application/x-www-form-urlencoded"},
          onload: function(response) {alert(response.status);},
          synchronous: true
        });
        },0);
        
    }
    var boton = document.getElementsByName("sub")[0];
    boton.addEventListener("click", manda, true);
}    