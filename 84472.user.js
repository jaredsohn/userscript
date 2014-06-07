// ==UserScript==

// @name           xtremos color 12345
// @namespace      xtremos
// @description    cambiarle el color a xtremos
// @include        http://*.xtremos.net/*

// ==/UserScript==


@namespace url(http://www.w3.org/1999/xhtml);
@-moz-document domain("xtremos.net") 
{
/* Fondo - Cambia "url(http://www.ondaimagen.com/_media/5/1541271630353883605.jpg)" de abajo y pon la imagen que quieras. Y la linea color se refiere al color de texto, puedes cambiar "bbbbbb" por el color hexadecimal que quieras aqui en el fondo y en cualquier parte que aparesca la linea color.
-----------------*/
body {
background: #000000 url(http://spe.fotolog.com/photo/46/28/88/cauro_drenlo/1232124335147_f.jpg) !important;
  color: #bbbbbb !important;
}
/* Logo Xtremos - Cambia "url(http://1.bp.blogspot.com/_pSlTxUKN-sY/S-sm7GqzYLI/AAAAAAAAAFQ/FR0twY933ec/s1600/The_Ramones_-_Anthology_(1999).jpg)" de abajo y pon la imagen que quieras
-----------------*/
#logoi  {
width : 984px !important;
height : 86px !important;
background : url(http://api.ning.com/files/8yUItfQ1zZllz9Co5NaKp4Kfov*Yx9Tmw17qedPyChqLTEIdm4I4aNUsSrJeiYQyDXxSaszu20SFfVEXhVw517*Qher-4I4W/HIMHaileSelassie.jpg) no-repeat !important;
margin-top : 10px !important;
margin-left : 0px !important;
} 
/* Encabezado - "none" es una forma de quitarlo, Cambialo por "url(http://spa.fotolog.com/photo/42/22/108/julyisapunk/1214431758465_f.jpg)" y pon la imagen que quieras
-----------------*/
.rtop {
background: none !important;
}
/* Pie de pagina - "transparent" es otra forma de quitarlo, Cambialo por "url(http://www.tomadivx.org/imagenes/variados/Bob%20Marley.jpg)" y pon la imagen que quieras
-----------------*/
.rbott {
background: transparent !important;
}
/*Fondo de Post y comentarios - "#fff" es un color hexadecimal, Cambialo o pon esta linea despues "url(http://www.buscadoor.com/wp-content/subid/bob_marley.jpg)" para que quede como quieras
(quita la linea "opacity: .9;" si quieres que las imagenes no se vean transparentes)
-----------------*/
.post-contenedor  {
background : #fff !important;
border : 1px solid red !important;
opacity: .8;
} 
.post-wrapper .post-autor {
float:right !important;
position:fixed !important;
width:165px !important;
}
.post-relacionados {
float:right !important;
width: 949px !important;
}
#post-comentarios {
float: right !important;
}
#post-comentarios .comentarios-title {
margin-left:170px !important;
width:750px !important;
}
#post-comentarios .miComentario .answerTxt {
width:770px !important;
margin-left:172px !important;
}
.comunidades #centroDerecha {
float:right !important;
width:950px !important;
}
.temaBubble {
float:left !important;
width:950px !important;
}
.answerTxt, .comentarioTxt {
float:right !important;
width:880px !important;
}
.Container p {
float:right !important;
width:780px !important;
}
.infoPost {
width:902px !important;
}
#post-izquierda, .comunidades #izquierda {
position:fixed !important;
}
.answerInfo h3, .comentarioInfo h3 {
margin:6px 60px 0 0 !important;
}
.comunidades #derecha {
float:right !important;
}
.comunidades #centro {
float:right !important;
width:700px !important;
}
#post_agregar .box_cuerpo {
width:855px !important;
}
#post_agregar #mensaje-top {
width:871px !important;
}
#post_agregar .box_title {
width:129% !important;
}
.agregar.titulo {
width:850px !important;
}
#centro {
width:480px !important;
}
#post_agregar #mensaje-top {
width:871px !important;
}
#post_agregar .box_title {
width:129% !important;
}
.agregar.titulo {
width:850px !important;
}
.agregar.cuerpo, .agregar.tags {
width:840px !important;
}
.container702 {
margin-left:10px !important;
width:770px !important;
}
/* Fondo del avatar o descripcion de Perfil - Cambia "white" por un color hexadecimal o agrega la linea despues "url(Aqui pega la url de una imagen)" para poner una imagen.
-----------------*/
 .box_cuerpo  {
background : white !important;
border : 1px solid red !important;
opacity: .8;
}
/* Papel tapiz - cambia la imagen o quitala poniendo "none" o "transparent" para que no haya papel tapiz
-----------------*/
#cuerpocontainer {
background: url(http://spe.fotolog.com/photo/46/28/88/cauro_drenlo/1232124335147_f.jpg) !important;
  color:#000000!important;
border : 2px solid red !important;
}
/* Papel tapiz - "none" , pon esta linea despues "url(http://fc79.deviantart.com/fs29/f/2008/047/b/4/Bob_Marley_Wallpaper_by_linkZije.jpg)" si quieres una imagen.
-----------------*/
#maincontainer {
background: none !important;
  color:#000000!important;
}
}
