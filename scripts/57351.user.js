// ==UserScript==
// @name           MarkMeToEdit
// @namespace      http://userscripts.org
// @include        http://board.ogame.com.es/index.php?page=*
// @author         HuMoR
// @description    Marca el post seleccionado con un "Editar Firma" si ya han pasado las 48 horas.
// @version        1.0
// ==/UserScript==

function markMeToEdit() {
var posts = document.getElementsByClassName('messageInner messageFramedLeft dividers container-3');
for (i = 0; i < posts.length; i++) {
    var fecha = posts[i].childNodes[5].getElementsByClassName('smallFont light')[0];
    var f1 = fecha.innerHTML.split(',',2)[0];
    var f2 = fecha.innerHTML.split(',',2)[1];
    if ((f1 != '<b>Hoy</b>') && (f1 != 'Ayer')) {
        var dia = f1.split('.',3)[0];
        var mes = (f1.split('.',3)[1] - 1);
        var año = f1.split('.',3)[2];
        var hora = f2.split(':',2)[0];
        var min = f2.split(':',2)[1];
        var postDate = parseInt(new Date(año,mes,dia,hora,min).getTime() / 1000);
        var now = parseInt(new Date().getTime() / 1000);
        if (now - postDate >= 172800) {
            fecha.innerHTML = fecha.innerHTML + ' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><font color="#04B404"><b>&raquo;&raquo;&raquo;EDITAR FIRMA&laquo;&laquo;&laquo;</b></font></span>';
        }
     }
} 


}

var loc = document.location.href;
var pattern = '.*page=(.*)&(thread|post)ID.*';
var matches = loc.match(pattern);
if (matches) {
    if (matches[1] == 'Thread') {
        var ThreadID = document.getElementsByClassName('largeButtons')[0].innerHTML.match('.*form=PostAdd&amp;threadID=(.*)"><img.*');
            if (ThreadID[1] == 834995) {
              markMeToEdit();
            }
    }
}