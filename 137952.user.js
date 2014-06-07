// ==UserScript==
// @name       Meneame "Disfruten lo votado"
// @namespace  meneame-disfruten-votado
// @version    0.6
// @description  Oculta cualquier comentario que incluya el texto "Disfruten lo votado" y similares, al estilo de los comentarios marcados como inapropiados
// @match      http://www.meneame.net/*
// @copyright  2012+, Miguel A. Pedregosa
// ==/UserScript==

var comentarios = document.getElementsByClassName("comment-body");

for (i=0; i<comentarios.length; i++){
 var texto = comentarios[i].innerHTML;
    texto = texto.toLowerCase();
    if(texto.indexOf("disfruten lo votado") >=0 || texto.indexOf("disfrutar lo votado") >=0 
       || texto.indexOf("disfrutad lo votado") >= 0 || texto.indexOf("disfrutemos lo votado") >= 0 
       || texto.indexOf("disfruta lo votado") >= 0 || texto.indexOf("disfrutando lo votado") >= 0 
	   || texto.indexOf("disfrute lo votado") >= 0 || texto.indexOf("disfrutan lo votado") >= 0 
	   || texto.indexOf("disfrutas lo votado") >= 0 || texto.indexOf("disfruten lo votado") >= 0 ){
       comentarios[i].className = "comment-body hidden";
        var enlaces = comentarios[i].getElementsByTagName('a');
        var enlace = enlaces[0];
        var cid = comentarios[i].id;
        cid = cid.replace('cid-','');
        var new_text = enlace.outerHTML + '&nbsp;&nbsp;  »&nbsp;<a href="javascript:get_votes(\'get_comment.php\',\'comment\',\'cid-'+cid+'\',0,'+cid+')" title="ver comentario">disfrutar del comentario</a>';
        comentarios[i].innerHTML = new_text;
    }
}
