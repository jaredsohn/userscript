// ==UserScript==
// @name           Taringa Script WTF =D
// @namespace      ReVeRsO
// @include        http://taringa.net/comunidades/whatthefuck/
// @include        http://taringa.net/
// @exclude        http://br.taringa.net/
//body {
background:none repeat scroll 0 0 #F4F4F4;
font-family:'Lucida Grande',Tahoma,Arial,Verdana,Sans-Serif;
font-size:11px;
line-height:1.3em;
margin:10px 0 0;
padding:0;
}
a {
cursor:pointer;
}
.floatL {
float:left;
}
input:active {
outline:0 none;
}
.floatR {
float:right;
}
.color_red {
color:red !important;
}
.color_green {
color:green !important;
}
.color_blue {
color:blue;
}
.color_gray, .color_gray a {
color:gray !important;
}
.clearBoth:after {
clear:both;
content:".";
display:block;
height:0;
line-height:0;
visibility:hidden;
}
html[xmlns] .clearBoth {
display:block;
}
* html .clearBoth {
height:1%;
}
a img {
border:0 none;
}
a:link {
color:#333333;
text-decoration:none;
}
a:visited {
color:#333333;
text-decoration:none;
}
a:active {
color:#333333;
}
a:hover {
color:#000000;
text-decoration:underline;
}
ul {
list-style:disc inside none;
margin:0;
padding:0;
}
h1 {
font-size:11px;
font-weight:normal;
}
.size9 {
font-size:9px;
}
.size10 {
font-size:10px;
}
.size12 {
font-size:12px;
}
.size13 {
font-size:13px;
}
.size14 {
font-size:14px;
}
.size15 {
font-size:15px;
}
hr {
background:none repeat scroll 0 0 #CCCCCC;
border:0 none;
color:#CCCCCC;
height:1px;
}
#logo {
float:left;
height:60px;
width:270px;
}
#logoi {
background:url("../logoBeta.png") no-repeat scroll 0 0 transparent;
float:left;
height:48px;
margin-top:11px;
width:270px;
}
#logoi:hover {
background-position:0 -50px;
}
#br_logoi {
background:url("../br_logo.gif") no-repeat scroll 0 0 transparent;
float:left;
height:60px;
width:270px;
}
#logo img {
display:none;
}
#maincontainer {
background:url("../maincontainerbg.gif") repeat-x scroll 0 0 #004A95;
height:auto;
margin:0 auto;
padding:0 12px;
position:relative;
width:960px;
}
* html #maincontainer {
margin-top:-1px;
}
#head {
height:70px;
}
#banner {
float:right;
height:70px;
width:468px;
}
.box_txt.publicidad_ultimos_comentarios_de {
width:190px;
}
.menu_izq {
background:url("../menu_left_corner.gif") no-repeat scroll left top transparent;
float:left;
height:30px;
margin:auto;
padding-left:10px;
position:relative;
text-align:left;
vertical-align:middle;
width:380px;
}
.menu_centro {
float:left;
width:350px;
}
a.iniciar_sesion {
background:url("../iconIdentificate.png") no-repeat scroll left center transparent;
color:#654006;
font-size:12px;
font-weight:bold;
padding-left:20px;
text-shadow:0 1px 0 #FBEEBC;
}
.here a.iniciar_sesion {
color:#1F1F02;
text-shadow:0 1px 0 #EEEEEE;
}
.identificarme {
background:url("../loginCorner.gif") no-repeat scroll right top transparent;
padding:8px 15px 0;
text-align:center;
}
.menu_der {
background:url("../menu_right_corner.gif") no-repeat scroll right top transparent;
float:right;
padding-right:3px;
padding-top:3px;
width:217px;
}
#categoria {
float:right;
margin:2px 10px 0 0;
}
#mensaje-top {
background:url("../mensajetopbg.gif") repeat-x scroll left bottom #FFE13E;
border-top:1px solid #FFE970;
clear:left;
display:block;
height:24px;
line-height:200%;
text-align:center;
width:100% !important;
}
.msgtxt {
float:left;
line-height:200%;
width:920px;
}
.msgtxt_cerrar {
float:right;
height:20px;
padding:2px;
width:20px;
}
#post_agregar #mensaje-top {
width:675px !important;
}
.capsprot {
background:none repeat scroll 0 0 #FFFFCC;
display:none;
font-weight:bold;
margin-left:5px;
padding:4px;
}
#post_agregar .box_cuerpo.registrarse {
width:558px !important;
}
#pie {
clear:left;
color:#E1E1E1;
padding:6px 0;
text-align:center;
width:100%;
}
#pie a {
color:#FFFFFF;
}
#cuerpocontainer {
-moz-border-radius-bottomleft:5px;
-moz-border-radius-bottomright:5px;
background:none repeat-x scroll 0 0 #FFFFFF;
height:auto;
padding:10px;
width:940px;
}
#centro {
float:left;
height:auto;
overflow:hidden;
padding:2px 6px;
width:290px;
}
.comunidades .home #izquierda {
float:left;
height:auto;
overflow:hidden;
padding:0;
width:160px;
}
.comunidades .home #centro {
float:left;
padding:0;
width:514px;
}
.comunidades .home #derecha {
float:left;
height:auto;
overflow:hidden;
padding:0;
width:250px;
}
* html #centro {
margin-right:6px;
width:284px;
}
#izquierda {
float:left;
height:auto;
overflow:hidden;
padding:2px;
width:380px;
}
#izquierda .size13 {
font-weight:bold;
}
#derecha {
float:left;
height:auto;
overflow:visible;
padding:2px;
width:250px;
}
* html #derecha {
width:248px;
}
#post-izquierda, .comunidades #izquierda {
float:left;
height:auto;
overflow:visible;
padding:2px;
width:160px;
}
* html #post-izquierda {
overflow:hidden;
width:158px;
}
#post-centro {
float:right;
height:auto;
overflow:hidden;
padding:2px 6px;
width:760px;
}
* html #post-centro .box_title {
width:760px;
}
#post_agregar {
float:left;
height:auto;
padding:0 6px;
width:675px;
}
#post_agregar .box_title {
width:100% !important;
}
#post_agregar .box_cuerpo {
height:auto !important;
width:659px !important;
}
#centroComunidad #post_agregar {
width:100% !important;
}
#centroComunidad #post_agregar .box_cuerpo {
width:744px !important;
}
#post_editar {
margin-top:6px;
width:760px;
}
.box_txt.mod_edit_post {
font-size:12px;
height:18px;
text-align:center;
width:742px;
}
#post_editar .box_cuerpo {
float:left;
width:744px;
}
.imagen {
max-width:670px;
}
.cita {
font-weight:bold;
height:auto !important;
padding:5px !important;
}
blockquote blockquote {
margin:0;
}
blockquote p {
margin:0;
padding:0;
}
.citacuerpo {
background:url("../bg-box.gif") repeat-x scroll 0 0 #FFFFFF;
border:1px solid #CCCCCC;
overflow:hidden;
padding:8px;
}
#respuestas {
clear:both;
margin-top:20px;
}
#respuestas blockquote {
margin:0 10px;
}
#respuestas .cita {
background:none repeat scroll 0 0 transparent;
font-weight:normal;
padding:0 !important;
}
#respuestas .citacuerpo {
-moz-border-radius:5px 5px 5px 5px;
background:url("../quote-start.gif") no-repeat scroll 5px 5px #E7E7E7;
border:1px solid #DEDEDE;
padding:8px 8px 8px 35px;
}
#respuestas .citacuerpo p {
background:url("../quote-end.gif") no-repeat scroll right bottom transparent;
width:100%;
}
#respuestas blockquote blockquote {
display:none;
}
.respuesta-post .comment-box {
width:690px;
}
.desplegable {
float:left;
text-align:left;
width:190px;
}
.link.patrocinados {
color:#3C3C3C;
font-size:12px;
font-weight:bold !important;
}
#post-izquierda .box_perfil {
background-position:-920px bottom;
margin:0 auto;
padding:18px;
}
.temaBubble .avatar {
border-bottom:1px solid #FFFFFF;
display:inline;
height:100px;
width:100px;
}
.avatar {
border:medium none;
display:block;
margin:auto;
width:120px;
}
.txt_post {
color:#444444;
font-size:11px;
font-weight:bold;
text-align:center;
}
input.login, .button {
background:none repeat scroll 0 0 #004A95;
border-color:#D9DFEA #0E1F5B #0E1F5B #D9DFEA;
border-style:solid;
border-width:1px;
color:#FFFFFF;
font-family:"lucida grande",tahoma,verdana,arial,sans-serif;
font-size:11px;
font-weight:bold;
padding:2px 15px 3px;
text-align:center;
}
input.button {
border:1px solid #CCCCCC;
}
.txt {
color:#717171;
font-family:Verdana,sans-serif;
font-size:12px;
}
.box_title, .cita {
-moz-border-radius-topleft:5px;
-moz-border-radius-topright:5px;
background:url("../box_titlebg.gif") repeat-x scroll 0 0 #DBDBDA;
height:25px;
padding:0;
}
.box_rss {
float:right;
padding-right:8px;
padding-top:4px;
}
.box_txt, .box_txt_perfil_izq, .box_txt_perfil_der {
background-repeat:no-repeat;
color:#464646;
float:left;
font-size:12px;
font-weight:bold;
padding:5px 0 0 10px;
text-shadow:0 1px 0 #CCCCCC;
}
.box_cuenta {
background-color:#EBEBEC;
background-image:url("../bg-box-gris.gif");
background-repeat:repeat-x;
margin:0 auto;
padding:8px;
white-space:normal;
}
.box_cuerpo {
-moz-border-radius-bottomleft:5px;
-moz-border-radius-bottomright:5px;
background:none repeat scroll 0 0 #E7E7E7;
border-bottom:1px solid #CCCCCC;
margin:0 auto;
padding:8px;
white-space:normal;
}
.box_cuerpo div.filterBy {
-moz-border-radius:0 0 0 0;
background:none repeat scroll 0 0 #CFCFCF;
border-bottom:1px solid #CCCCCC;
color:#717171;
font-weight:bold;
padding:5px;
text-align:right;
}
div.filterBy .search-input {
background:url("../search-i.png") no-repeat scroll 3px 3px #FFFFFF;
margin:0;
padding-left:20px;
width:105px;
}
div.filterBy .mBtn {
-moz-border-radius:0 0 0 0;
padding-top:3px;
width:8px;
}
div.filterBy input {
margin:0;
vertical-align:middle;
}
.com_populares ol li a {
height:16px;
overflow:hidden;
width:100px;
}
.box_cuerpo div.filterBy a {
color:#2F2F2F;
}
.box_cuerpo div.filterBy a.here {
-moz-border-radius:8px 8px 8px 8px;
background:none repeat scroll 0 0 #8C8C8C;
color:#FFFFFF;
font-weight:bold;
padding:1px 8px;
}
.box_cuerpo ol.filterBy {
display:none;
height:215px;
overflow:hidden;
position:absolute;
}
.box_cuerpo ol#filterBySemana.filterBy {
display:block;
}
.box_cuerpo ol {
margin:5px 0;
padding:0 12px 0 35px;
}
.box_cuerpo ol li {
display:list-item;
list-style:decimal-leading-zero outside none;
}
.listDisc {
padding-left:20px;
}
.listDisc li {
list-style:disc outside none;
}
ul.numberList {
padding:0 8px 0 28px;
}
ul.numberList li {
list-style:decimal-leading-zero outside none;
}
.comentarios_container {
overflow:hidden;
}
.comentarios_wrapper {
float:left;
margin-top:11px;
width:100%;
}
.agregar_comentario {
padding-top:12px;
}
.box_cuerpo.agregar_comm_izq {
-moz-border-radius:0 0 0 0;
float:left;
padding-bottom:0 !important;
padding-top:0;
width:505px;
}
.box_cuerpo.agregar_comm_der {
-moz-border-radius:0 0 0 0;
}
.agregar_comm_izq .markItUpEditor {
height:75px;
margin-bottom:10px;
}
.box_cuerpo.agregar_comm_der {
float:left;
text-align:center;
width:223px;
}
#cuerpo1 {
font-size:13px;
line-height:1.4em;
}
* html #cuerpo1 {
width:744px;
}
#cuerpo1 {
background-color:#EEEEEE !important;
background-position:-1080px bottom;
padding-bottom:12px;
}
.iagregar_comentario {
height:100px;
width:500px;
}
.container380, .container370, .container940 .box_cuerpo, .container740, .box_perfil_der, .box_perfil_izq {
padding-bottom:6px;
}
.box_link {
font-size:12px;
padding-left:25px;
}
.box_link:visited {
color:#004A95;
}
.link {
height:16px;
overflow:hidden;
padding:3px;
width:360px;
}
.categoriaPost:hover {
-moz-border-radius:3px 3px 3px 3px;
background-color:#CCCCCC;
}
.link_titulo {
float:left;
height:16px;
}
.link_comm {
color:#717171;
font-size:10px;
text-align:right;
vertical-align:bottom;
}
.link_fav {
float:left;
height:16px;
width:460px;
}
.categoriaPost, .categoriaPost a.privado {
background:url("../big1v12.png") no-repeat scroll left top transparent;
}
.categoriaPost a {
display:block;
height:18px;
}
.categoriaPost a:visited {
color:#551A8B;
font-weight:bold;
}
.categoriaPost a.privado {
background-position:-3px 0;
padding-left:17px;
}
.categoriaPost.juegos, #izquierda .categoriaPost.jogos {
background-position:5px -41px;
}
.categoriaPost.imagenes, #izquierda .categoriaPost.imagens {
background-position:5px -62px;
}
.categoriaPost.links {
background-position:5px -86px;
}
.categoriaPost.videos {
background-position:5px -110px;
}
.categoriaPost.arte {
background-position:5px -132px;
}
.categoriaPost.offtopic {
background-position:5px -152px;
}
.categoriaPost.animaciones, #izquierda .categoriaPost.animacoes {
background-position:5px -174px;
}
.categoriaPost.musica {
background-position:5px -196px;
}
.categoriaPost.downloads {
background-position:5px -217px;
}
.categoriaPost.noticias {
background-position:5px -240px;
}
.categoriaPost.info {
background-position:5px -284px;
}
.categoriaPost.tv-peliculas-series, .categoriaPost.tv-filmes-e-series {
background-position:5px -305px;
}
.categoriaPost.patrocinados {
background-position:5px -332px;
}
.categoriaPost.poringueras, #izquierda .categoriaPost.poringueiras {
background-position:5px -418px;
}
.w-posts .categoriaPost.poringueras {
background-position:5px -415px;
}
.w-posts .categoriaPost.info {
background-position:5px -283px;
}
.categoriaPost.gay {
background-position:5px -507px;
}
.categoriaPost.relatos {
background-position:5px -528px;
}
.categoriaPost.linux {
background-position:5px -547px;
}
.categoriaPost.deportes, .categoriaPost.esportes {
background-position:5px -572px;
}
.categoriaPost.celulares {
background-position:5px -593px;
}
.categoriaPost.apuntes-y-monografias, #izquierda .categoriaPost.monografias {
background-position:5px -614px;
}
.categoriaPost.comics, .categoriaPost.quadrinhos {
background-position:5px -637px;
}
.categoriaPost.solidaridad, #izquierda .categoriaPost.solidariedade {
background-position:5px -661px;
}
.categoriaPost.recetas-y-cocina, .categoriaPost.cozinhas-e-receitas {
background-position:5px -678px;
}
.categoriaPost.mac {
background-position:5px -702px;
}
.categoriaPost.femme, .categoriaPost.mulher {
background-position:5px -724px;
}
.categoriaPost.autos-motos, #izquierda .categoriaPost.carros-e-motos {
background-position:5px -744px;
}
.categoriaPost.humor {
background-position:5px -767px;
}
.categoriaPost.ebooks-tutoriales, .categoriaPost.ebooks-e-tutoriais {
background-position:5px -789px;
}
.categoriaPost.salud-bienestar, .categoriaPost.saude-bem-estar {
background-position:5px -808px;
}
.categoriaPost.taringa {
background-position:5px -438px;
}
.categoriaPost.economia-negocios {
background-position:5px -846px;
}
.categoriaPost.mascotas, .categoriaPost.bichos {
background-position:5px -866px;
}
.categoriaPost.turismo {
background-position:5px -890px;
}
.categoriaPost.manga-anime {
background-position:5px -912px;
}
.categoriaPost.ciencia-educacion {
background-position:5px -958px;
}
.categoriaPost.hazlo-tu-mismo {
background-position:5px -935px;
}
.categoriaPost.ecologia {
background-position:5px -459px;
}
.categoriaPost img {
display:none;
}
.box_txt.post_titulo {
padding-top:2px;
text-align:center;
width:742px;
}
* html .box_txt.post_titulo {
width:742px;
}
.box_txt.post_titulo h1 {
display:inline;
font-size:13px;
font-weight:bold;
line-height:17px;
margin:0;
}
a.icons.anterior, a.icons.siguiente {
background:url("../big2v1.png") no-repeat scroll 0 0 transparent;
padding:0 8px;
}
a.icons.anterior {
background-position:left 0;
}
a.icons.siguiente {
background-position:left -23px;
}
.icons.anterior span, .icons.siguiente span {
display:none;
}
.icons {
background:url("../big2v1.png") no-repeat scroll left top transparent;
display:inline;
padding:2px 0 2px 7px;
}
.icons.agregar_favoritos {
background-position:left -241px;
}
.icons.agregar_favoritos:hover {
background-position:left -64px;
color:red;
text-decoration:none;
}
.icons.denunciar_post {
background-position:left -263px;
}
.icons.denunciar_post:hover {
background-position:left -834px;
}
.icons.recomendar_post {
background-position:left -220px;
}
.icons.recomendar_post:hover {
background-position:left -854px;
}
.txt_post span.icons {
padding-left:18px;
padding-right:5px;
}
.icons.puntos_post {
background-position:left -41px;
}
.icons.favoritos_post {
background-position:left -64px;
}
.icons.visitas_post {
background-position:left -88px;
}
.opc_fav {
color:#717171;
float:left;
font-size:10px;
text-align:right;
width:440px;
}
.check_fav {
position:absolute;
right:10px;
text-align:right;
top:10px;
width:10px;
}
.link_resultado_titulo {
float:left;
height:20px;
width:380px;
}
.link_resultado {
height:20px;
padding:2px;
width:720px;
}
.link_resultado:hover {
background:none repeat scroll 0 0 #CCCCCC;
height:20px;
padding:2px;
width:720px;
}
.link_resultado_opc {
color:#717171;
float:right;
font-size:10px;
text-align:right;
width:340px;
}
.icon {
vertical-align:top;
}
br.space {
display:block;
margin:3px 0;
}
* + html br.space {
line-height:6px;
}
.m-top {
font-size:12px;
height:25px;
margin:0;
padding:0;
width:700px;
}
.m-bottom {
border-color:#999999;
border-style:solid none none;
border-width:1px;
font-size:12px;
height:55px;
padding:8px 0 0;
text-align:center;
width:700px;
}
.m-menu {
color:#242424;
font-size:12px;
font-weight:bold;
line-height:1.8;
}
.m-box {
padding:0;
}
.m-seleccionar {
float:left;
height:25px;
padding-left:15px;
text-align:left;
vertical-align:middle;
width:680px;
}
a.m-seleccionar-text {
color:blue;
}
a.m-seleccionar-text:hover {
font-weight:bold;
}
.m-borrar {
float:left;
height:30px;
padding-left:5px;
vertical-align:middle;
width:500px;
}
.m-col1m {
float:left;
font-size:12px;
font-weight:bold;
padding:0;
width:74px;
}
.m-col2m {
float:left;
font-size:12px;
padding:5px;
width:676px;
}
.m-col2m a {
color:#053E78;
}
.m-col1 {
float:left;
font-size:12px;
font-weight:bold;
padding:5px 0 0;
width:74px;
}
.m-col2 {
float:left;
font-size:12px;
padding:5px;
width:600px;
}
.m-col2e {
float:left;
font-size:12px;
padding:5px;
width:558px;
}
.m-mensaje-ok {
background:none repeat scroll 0 0 #E6E6E6;
border:2px solid green;
color:green;
font-weight:bold;
margin-bottom:5px;
padding-top:6px;
text-align:center;
}
.m-mensaje-error {
background:none repeat scroll 0 0 #E6E6E6;
border:2px solid red;
color:red;
font-weight:bold;
margin-bottom:5px;
padding-top:6px;
text-align:center;
}
.m-linea-mensaje {
background:none repeat scroll 0 50% #FDFBE7;
border-color:#999999;
border-style:solid none none;
border-width:1px;
font-size:12px;
font-weight:bold;
height:25px;
padding:0;
width:701px;
}
.m-linea-mensaje-open {
background:none repeat scroll 0 50% transparent;
border-color:#999999;
border-style:solid none none;
border-width:1px;
font-size:12px;
height:25px;
padding:0;
width:701px;
}
.m-opciones {
border-style:none;
float:left;
height:25px;
width:45px;
}
.m-opciones-open {
border-style:none;
float:left;
height:25px;
width:45px;
}
.m-remitente {
border-color:#999999;
border-style:none none none solid;
border-width:1px;
float:left;
font-weight:bold;
height:25px;
padding-left:5px;
width:100px;
}
.m-remitente-open {
border-color:#999999;
border-style:none none none solid;
border-width:1px;
float:left;
height:25px;
padding-left:5px;
width:100px;
}
.m-destinatario {
border-color:#999999;
border-style:none none none solid;
border-width:1px;
float:left;
font-weight:bold;
height:25px;
padding-left:5px;
width:100px;
}
.m-destinatario-open {
border-color:#999999;
border-style:none none none solid;
border-width:1px;
float:left;
height:25px;
padding-left:5px;
width:100px;
}
.m-asunto {
border-color:#999999;
border-style:none none none solid;
border-width:1px;
float:left;
font-weight:bold;
height:25px;
padding-left:5px;
width:399px;
}
.m-asunto a {
color:blue;
text-decoration:underline;
}
.m-asunto-open {
border-color:#999999;
border-style:none none none solid;
border-width:1px;
float:left;
height:25px;
padding-left:5px;
width:399px;
}
.m-asunto-carpetas {
border-color:#999999;
border-style:none none none solid;
border-width:1px;
float:left;
font-weight:bold;
height:25px;
padding-left:5px;
width:293px;
}
.m-asunto-carpetas a {
color:blue;
text-decoration:underline;
}
.m-asunto-carpetas-open {
border-color:#999999;
border-style:none none none solid;
border-width:1px;
float:left;
height:25px;
padding-left:5px;
width:293px;
}
.m-fecha {
border-color:#999999;
border-style:none none none solid;
border-width:1px;
float:left;
font-weight:bold;
height:25px;
padding-left:5px;
width:138px;
}
.m-fecha-open {
border-color:#999999;
border-style:none none none solid;
border-width:1px;
float:left;
height:25px;
padding-left:5px;
width:138px;
}
.galeria-foto-marco {
float:left;
height:100px;
padding:10px 12px;
text-align:center;
width:110px;
}
.galeria-foto-box {
height:102px;
overflow:hidden;
width:102px;
}
.galeria-foto-img {
border:1px solid #CCCCCC;
}
li, ol li {
list-style:none outside none;
}
.menu_cuenta li {
list-style:disc inside none;
}
.perfil-user {
background:none repeat scroll 0 0 #E1DFD2;
color:#6D674F;
padding:10px 10px 0;
position:relative;
}
.perfil-user h1.nick {
color:#0A1107;
font-size:23px;
font-weight:normal;
letter-spacing:-1px;
margin:5px 0 10px;
}
.perfil-user h1.nick a {
color:#4B4630;
}
.perfil-user .nick span {
color:#9A9684;
font-size:85%;
font-weight:normal;
}
.perfil-user .btn_g {
position:absolute;
right:10px;
top:10px;
}
.bio {
display:block;
font-size:12px;
line-height:18px;
margin-top:10px;
}
.perfil-user .menu-tabs-perfil {
background:none repeat scroll 0 0 transparent;
float:left;
width:100%;
}
.perfil-info {
float:left;
width:780px;
}
.menu-tabs-perfil ul {
width:100%;
}
.menu-tabs-perfil li {
float:left;
margin-right:10px;
}
.menu-tabs-perfil li.enviar-mensaje {
float:right !important;
}
.menu-tabs-perfil li a {
background:none repeat scroll 0 0 #F0EFE8;
color:#666666 !important;
display:block;
font-size:12px;
font-weight:bold;
padding:5px 10px;
}
.menu-tabs-perfil li.selected a, .menu-tabs-perfil li a:hover {
background:none repeat scroll 0 0 #FFFFFF;
color:#333333 !important;
text-shadow:none;
}
.ultimos li, .ultimos li.categoriaCom {
border-bottom:1px dotted #CCCCCC;
}
.ultimos li.categoriaCom span {
position:absolute;
right:4px;
top:4px;
}
.ultimos li.categoriaCom a.titletema {
color:#2B3ED3 !important;
}
.ultimos li.categoriaCom a {
color:#7777CC !important;
float:none;
}
.ultimos li span {
color:#999999;
float:right;
font-size:12px;
}
.ultimos li a {
color:#2B3ED3 !important;
float:left;
font-weight:bold;
}
.frase-personal {
font-size:13px;
}
.ultimos .categoriaPost {
margin-bottom:0;
padding:4px 3px 4px 28px;
}
.ultimos .categoriaPost:hover {
background-color:#FFFFFF !important;
}
.perfil-avatar img {
background:none repeat scroll 0 0 #FFFFFF;
border:1px solid #CCCCCC;
height:120px;
padding:1px;
width:120px;
}
.perfil-main {
-moz-border-radius-bottomleft:5px;
-moz-border-radius-bottomright:5px;
background:url("../perfil-line.gif") repeat-y scroll 630px 0 #FFFFFF;
padding:15px;
}
.perfil-content {
float:left;
overflow:hidden;
width:595px;
}
.perfil-content .widget {
margin-bottom:15px;
}
.perfil-avatar {
float:left;
margin:0 10px 10px 0;
}
.perfil-content .title-w {
border-bottom:1px solid #C1C1C1;
margin-bottom:5px;
margin-top:0;
padding-bottom:5px;
}
.perfil-content .title-w h3, .perfil-content .title-w h2 {
float:left;
font-size:15px;
margin-bottom:0;
margin-top:0;
}
.perfil-sidebar .title-w {
border-bottom:1px solid #C1C1C1;
color:#000000;
margin-bottom:5px;
padding-bottom:5px;
}
.perfil-sidebar .title-w h3 {
float:left;
font-size:14px;
margin:0;
}
.perfil-sidebar .title-w span {
color:#0077CC;
float:right;
font-size:12px;
font-weight:bold;
}
.perfil-content .title-w span {
float:right;
}
.icon-medallas, .listado-content .medalla {
background-image:url("../sprite-notification.png");
display:block;
height:16px;
width:16px;
}
.icon-medallas.medalla-bronce {
background-position:0 -284px;
}
.icon-medallas.medalla-plata {
background-position:0 -304px;
}
.icon-medallas.medalla-oro {
background-position:0 -220px;
}
.icon-medallas.medalla-platino {
background-position:0 -360px;
}
.icon-medallas.medalla-diamante {
background-position:0 -344px;
}
.listado-content .medalla {
float:left;
height:32px;
margin-right:10px;
margin-top:2px;
width:32px;
}
.medalla.medalla-oro-big {
background-position:-19px -131px;
}
.medalla.medalla-bronce-big {
background-position:-19px -99px;
}
.medalla.medalla-plata-big {
background-position:-19px -67px;
}
.medalla.medalla-platino-big {
background-position:-19px -197px;
}
.medalla.medalla-diamante-big {
background-position:-19px -165px;
}
.perfil-paginador {
padding:5px;
}
a.siguiente-perfil, a.anterior-perfil {
-moz-border-radius:15px 15px 15px 15px;
color:#000000 !important;
display:block;
font-size:13px;
padding:5px 10px;
}
.perfil-sidebar {
float:right;
width:300px;
}
.perfil-sidebar li {
float:left;
margin:5px 5px 0;
}
.widget {
display:block;
float:none;
margin-bottom:10px;
}
.widget .see-more {
-moz-border-radius:3px 3px 3px 3px;
background:-moz-linear-gradient(0% 100% 90deg, #CCCCCC, #EEEEEE) repeat scroll 0 0 #EEEEEE;
border:1px solid #CCCCCC;
clear:both;
color:#333333 !important;
display:block;
float:right;
font-weight:bold;
margin-top:5px;
padding:2px 7px;
text-shadow:0 1px 0 #EEEEEE;
}
.ultimos li.see-more a {
color:#333333 !important;
}
.widget .see-more:hover {
-moz-box-shadow:0 0 3px rgba(0, 0, 0, 0.3);
}
.perfil-content .photo_small {
background:none repeat scroll 0 0 #F7F7F7;
float:left;
height:150px;
margin:0 5px 5px 0;
padding:20px;
text-align:center;
width:150px;
}
.perfil-content .photo_small img {
max-height:150px !important;
max-width:150px !important;
}
.perfil-content .photo_small h2 {
border:medium none;
color:#666666;
font-size:11px;
font-weight:normal;
margin:0;
padding:0;
}
.novato .w-stats ul li {
background:none repeat scroll 0 0 #FAF9E6;
color:#ADA70A;
}
.novato .w-stats ul li a {
color:#ADA70A;
}
.novato .w-stats ul li span {
color:#ADA70A;
}
.new-full-user .w-stats ul li {
background:none repeat scroll 0 0 #FFFFFF;
color:#0077CC;
}
.new-full-user .w-stats ul li a {
color:#0077CC;
}
.new-full-user .w-stats ul li span {
color:#0077CC;
}
.full-user .w-stats ul li {
background:none repeat scroll 0 0 #E6F2FA;
color:#0077CC;
text-shadow:0 1px 0 #FFFFFF;
}
.full-user .w-stats ul li a {
color:#0077CC;
}
.full-user .w-stats ul li span {
color:#0077CC;
}
.great-user .w-stats ul li {
background:none repeat scroll 0 0 #E6FAEA;
color:#01A021;
}
.great-user .w-stats ul li a {
color:#01A021;
}
.great-user .w-stats ul li span {
color:#01A021;
}
.moderador .w-stats ul li {
background:none repeat scroll 0 0 #EEEEEE;
color:#333333;
text-shadow:0 1px 0 #FFFFFF;
}
.moderador .w-stats ul li a {
color:#333333;
}
.moderador .w-stats ul li span {
color:#333333;
}
.w-stats ul li {
float:left;
font-family:Helvetica,Arial;
font-size:21px;
font-weight:bold;
padding:10px 0 6px;
text-align:left;
text-shadow:0 1px 0 #FFFFFF;
text-transform:capitalize;
width:110px;
}
.w-stats ul li span {
display:block;
font-size:13px;
font-weight:bold;
margin-top:5px;
}
.widget .emptyData {
background:none repeat scroll 0 0 #F7F7F7;
border:medium none;
color:#333333;
}
.big-info li {
border-bottom:1px dotted #CCCCCC;
font-size:12px;
padding:10px;
}
.big-info li label {
color:#777777;
display:inline-block;
vertical-align:top;
width:170px;
}
.big-info li.sep {
background:none repeat scroll 0 0 #F7F7F7;
}
.big-info li h4 {
color:#FF6600;
margin:0;
}
.big-info li h4 a {
color:#0077CC;
margin:0;
}
.comentario-p {
float:left;
line-height:18px;
overflow:hidden;
width:450px;
}
span.fecha-p {
color:#888888;
float:right;
font-size:11px;
}
.big-info li strong {
display:inline-block;
width:400px;
}
.w-fotos img {
border:1px solid #CCCCCC;
display:block;
float:left;
height:80px;
margin:0 10px 10px 0;
padding:1px;
width:80px;
}
.clearfix:after {
clear:both;
content:" ";
display:block;
font-size:0;
height:0;
visibility:hidden;
}
* html .clearfix {
}
:first-child + html .clearfix {
}
.bbox {
margin-top:5px;
padding-bottom:1px;
padding-left:5px;
padding-right:3px;
text-decoration:none;
width:99%;
}
.bbox h2 {
color:#5F5F5F;
float:right;
font-size:10px;
margin-right:10px;
text-decoration:none;
}
.linkpat {
color:#0000DE;
font-size:115%;
font-style:normal;
text-decoration:none;
}
.linkpat:hover {
color:#0000DE;
font-size:115%;
font-style:normal;
text-decoration:underline;
}
.spns {
font-size:110%;
font-size-adjust:none;
font-style:normal;
font-variant:normal;
font-weight:normal;
line-height:1.4em;
margin-bottom:13px;
padding-top:15px;
text-decoration:none;
width:100%;
}
.spns em {
color:#757575;
font-style:normal;
}
.spns a:hover {
text-decoration:none;
}
.spns ul li {
cursor:pointer;
line-height:1.5em;
list-style-type:none;
margin:5px 0 10px -1px;
padding-left:0;
text-decoration:none;
}
.spns ul li:hover {
text-decoration:none;
}
.bbox_s {
background:none repeat scroll 0 0 #FFFFFF;
text-decoration:none;
width:100%;
}
.linkpat_s {
color:#0000DE;
font-size:110%;
text-decoration:none;
}
.linkpat_s:hover {
color:#0000DE;
font-size:110%;
text-decoration:underline;
}
.spns_s {
font-size:100%;
font-size-adjust:none;
font-style:normal;
font-variant:normal;
font-weight:normal;
line-height:1.21em;
text-align:left;
text-decoration:none;
width:100%;
}
.spns_s a:hover {
text-decoration:none;
}
.spns_s ul li {
cursor:pointer;
line-height:1.23em;
list-style-type:none;
margin:0 0 10px -1px;
padding-left:0;
text-decoration:none;
}
.spns_s ul li:hover {
text-decoration:none;
}
.box_txt_busqueda_perfiles {
background-image:url("../cor-izq.gif");
background-repeat:no-repeat;
color:#444444;
float:left;
font-size:12px;
font-weight:bold;
height:22px;
padding-left:3px;
text-align:center;
width:732px;
}
.rtop, .rbott {
background:url("../rtopbg.gif") no-repeat scroll left top transparent;
display:block;
height:13px;
margin:0 auto;
width:984px;
}
.rtop_content {
background:none repeat scroll 0 0 #0A67E6;
padding:0 5px;
}
.rbott {
background-position:left bottom !important;
}
.rbott *, .rbott * {
background:none repeat scroll 0 0 #0069D4;
display:none;
height:1px;
overflow:hidden;
}
.rbott_content {
background:none repeat scroll 0 0 #0A67E6;
padding:0 5px;
}
.menu_centro input.ilogin {
font-size:10px;
width:65px;
}
#login_box {
display:none;
position:absolute;
right:12px;
top:87px;
width:240px;
z-index:3000;
}
#login_box .login_cuerpo label {
font-size:12px;
text-shadow:0 1px 0 #FFFFFF;
text-transform:uppercase;
}
#login_box .login_cuerpo {
-moz-border-radius-bottomleft:10px;
-moz-border-radius-bottomright:10px;
background:none repeat scroll 0 0 #FFFFCC;
color:#272727;
margin-top:13px;
padding:15px 20px;
text-align:left;
white-space:normal;
}
.login_cuerpo #login_error {
color:red;
display:none;
font-size:13px;
font-weight:bold;
text-align:center;
}
.login_cuerpo .izq {
float:left;
height:22px;
text-align:right;
width:115px;
}
* html .login_cuerpo .izq {
clear:both;
}
.login_cuerpo .der {
float:left;
height:25px;
padding-left:5px;
padding-top:2px;
}
.login_cuerpo input.ilogin {
-moz-border-radius:5px 5px 5px 5px;
background:none repeat scroll 0 0 #FFFFFF;
border:1px solid #999999;
margin:0 0 10px;
padding:8px;
width:180px;
}
.login_cuerpo input.login {
font-size:10px;
margin-left:132px;
width:132px;
}
.login_cuerpo form {
font-weight:bold;
margin:0;
}
.login_cerrar {
border:0 none;
cursor:pointer;
height:16px;
left:88px;
position:absolute;
top:13px;
width:16px;
}
.login_cuerpo #login_cargando {
border:0 none;
display:none;
height:16px;
position:absolute;
right:20px;
top:20px;
width:16px;
}
#login_box .login_footer {
font-weight:normal;
margin-top:15px;
text-align:left;
}
#login_box .login_footer hr {
background:none repeat scroll 0 0 #CCCCCC;
}
textarea, input {
background:url("../inputbg.gif") repeat-x scroll left top #F9F9F9;
border:1px solid #CCCCCC;
color:#333333;
font-family:'Lucida Grande',Tahoma,Arial,Verdana,Sans-Serif;
font-size:12px;
padding:4px 2px;
}
input.checkbox, input.radio, input[type="checkbox"], input[type="radio"] {
background:none repeat scroll 0 0 transparent !important;
border:0 none !important;
padding:0 !important;
}
.searchBy input.radio {
background:none repeat scroll 0 0 transparent;
border:medium none;
padding:0;
}
.box_cuerpo .ibuscador {
background:url("../bgInputS_2.gif") repeat-x scroll 0 0 transparent;
border:medium none;
float:left;
height:13px;
padding:8px 4px;
width:189px;
}
#derecha .ibuscador {
width:149px;
}
.leftIbuscador {
display:inline;
float:left;
}
* html input.ibuscador, * + html input.ibuscador {
width:145px;
}
.box_cuerpo input.bbuscador {
background:url("../buscar_2.gif") no-repeat scroll left top transparent;
border:medium none;
font-size:16px;
height:29px;
margin:0;
outline:medium none;
padding:0;
width:63px;
}
.box_cuerpo input.bbuscador:active {
background-position:0 -31px;
outline:0 none;
}
.searchBy input {
padding-top:7px;
vertical-align:top;
}
input:focus {
outline:0 none;
}
#ult_comm li {
height:16px;
overflow:hidden;
}
#ult_resp li {
height:16px;
overflow:hidden;
}
.usuarios_online {
color:#BB0000 !important;
}
.usuarios_jugando {
color:#148558 !important;
}
.tags_cloud {
line-height:200%;
text-align:justify;
}
.box_cuerpo .tags_cloud_2 {
line-height:300%;
text-align:justify;
}
.agregar.cuerpo, .agregar.tags {
width:650px;
}
.agregar.cuerpo {
height:380px;
}
.agregar.titulo {
width:335px;
}
.geoT {
background:url("../geoTbg.gif") no-repeat scroll left top transparent;
height:35px;
width:250px;
}
.geoT.porTa {
background:url("../geoTbg.gif") no-repeat scroll left bottom transparent;
}
.spaT, .porT {
margin-top:10px;
text-align:center;
width:124px;
}
.geoT.porTa .porT {
font-weight:bold;
}
.geoT.porTa .spaT {
font-weight:normal;
}
.geoT .spaT {
font-weight:bold;
}
.geoT input {
margin:0;
vertical-align:middle;
}
.spaT {
float:left;
}
.porT {
float:right;
}
#el_msgbox {
background:none repeat scroll 0 0 #FFFFFF;
}
.box_txt.anuncie {
font-size:12px;
height:22px;
text-align:left;
width:592px;
}
.enlazanos_imagen {
float:left;
height:50px;
width:120px;
}
.mapa_del_sitio {
float:left;
height:auto;
padding:2px 6px;
width:301px;
}
.mapa_del_sitio .box_txt {
width:283px;
}
.container170 {
width:170px;
}
.container208 {
width:208px;
}
.container228 {
width:228px;
}
.container230 {
width:230px;
}
.container250 {
width:250px;
}
* html .container250 {
overflow:hidden;
width:250px;
}
.container278 {
width:278px;
}
.container370 {
width:370px;
}
* html .container370 {
overflow:hidden;
width:370px;
}
.container300 {
width:300px !important;
}
.container340 {
width:340px !important;
}
.container380 {
width:380px;
}
* html .container380 {
overflow:hidden;
width:380px;
}
.container400 {
width:400px;
}
.container520 {
width:520px;
}
.container600 {
width:600px;
}
.container620 {
width:620px;
}
.container630 {
width:630px;
}
.container652 {
width:652px;
}
.container702 {
width:702px;
}
.container720 {
width:720px;
}
.container740 {
width:740px;
}
.container940 {
width:940px;
}
input .button.rechazar {
background:none repeat scroll 0 0 #009500;
border-color:#135B0E #1B5B0E #1B5B0E #135B0E;
}
input .button.aceptar {
background:none repeat scroll 0 0 #950000;
border-color:#5B0E0E #EAD9D9 #EAD9D9 #5B0E0E;
color:#FFFFFF !important;
}
input .button.omitir {
background:none repeat scroll 0 0 #4A4A4A;
border-color:#E1E1E1 #4A4A4A #4A4A4A #E1E1E1;
color:#FFFFFF !important;
}
.gif_cargando {
background:url("../cargando.gif") no-repeat scroll left top transparent;
display:none;
height:16px;
position:relative;
top:4px;
width:16px;
}
#gif_cargando_add_comment {
margin-left:740px;
margin-top:28px;
position:absolute !important;
}
.msg_add_comment {
color:#AD1010;
display:none;
font-weight:bold;
margin-top:5px;
text-align:center;
}
.login.darkred {
background-color:#AD1010;
}
.categoriaPost {
clear:both;
font-size:12px;
height:16px;
margin-bottom:5px;
padding:3px 3px 3px 28px;
}
#izquierda li a.categoriaPost {
display:block;
height:18px;
}
.sticky {
}
li a.comunidad {
float:left;
padding-right:4px;
}
li a.tema {
float:left;
}
#izquierda li.categoriaPost.sticky {
background-position:5px -21px;
padding:3px 3px 3px 20px;
}
#izquierda li.categoriaPost.sticky {
background-position:5px -21px;
padding:3px 3px 3px 20px;
}
#izquierda li.categoriaPost.patrocinado {
-moz-border-radius:5px 5px 5px 5px;
background-color:#FFFFCC;
}
#izquierda li.categoriaPost.sticky.patrocinado .categoriaPost:hover {
background-color:transparent;
}
#izquierda li.categoriaPost.sticky.patrocinado .categoriaPost {
height:16px;
}
#izquierda li.sticky a {
margin:-2px 0 0;
padding:0 0 0 28px;
}
#izquierda li.sticky a:hover {
}
.categoriaPost.sticky .categoriaPost.juegos {
background-position:5px -41px;
}
.categoriaPost.sticky .categoriaPost.imagenes {
background-position:5px -63px;
}
.categoriaPost.sticky .categoriaPost.links {
background-position:5px -86px;
}
.categoriaPost.sticky .categoriaPost.videos {
background-position:5px -110px;
}
.categoriaPost.sticky .categoriaPost.arte {
background-position:5px -130px;
}
.categoriaPost.sticky .categoriaPost.offtopic {
background-position:5px -152px;
}
.categoriaPost.sticky .categoriaPost.animaciones {
background-position:5px -174px;
}
.categoriaPost.sticky .categoriaPost.musica {
background-position:5px -196px;
}
.categoriaPost.sticky .categoriaPost.downloads {
background-position:5px -217px;
}
.categoriaPost.sticky .categoriaPost.noticias {
background-position:5px -240px;
}
.categoriaPost.sticky .categoriaPost.info {
background-position:5px -284px;
}
.categoriaPost.sticky .categoriaPost.tv-peliculas-series {
background-position:5px -305px;
}
.categoriaPost.sticky .categoriaPost.patrocinados {
background-position:5px -332px;
}
.categoriaPost.sticky .categoriaPost.linux {
background-position:5px -547px;
}
.categoriaPost.sticky .categoriaPost.deportes {
background-position:5px -572px;
}
.categoriaPost.sticky .categoriaPost.celulares {
background-position:5px -595px;
}
.categoriaPost.sticky .categoriaPost.apuntes-y-monografias {
background-position:5px -614px;
}
.categoriaPost.sticky .categoriaPost.comics {
background-position:5px -637px;
}
.categoriaPost.sticky .categoriaPost.solidaridad {
background-position:5px -660px;
}
.categoriaPost.sticky .categoriaPost.recetas-y-cocina {
background-position:5px -678px;
}
.categoriaPost.sticky .categoriaPost.mac {
background-position:5px -702px;
}
.categoriaPost.sticky .categoriaPost.femme {
background-position:5px -727px;
}
.categoriaPost.sticky .categoriaPost.autos-motos {
background-position:5px -744px;
}
.categoriaPost.sticky .categoriaPost.humor {
background-position:5px -767px;
}
.categoriaPost.sticky .categoriaPost.ebooks-tutoriales {
background-position:5px -789px;
}
#menu {
background:url("../bg-menu-2.gif") repeat-x scroll 0 0 #CCCCCC;
clear:left;
color:#999999;
height:30px;
text-align:center;
width:100%;
}
.menuTabs {
background:url("../menu_left_corner_2.gif") no-repeat scroll left top transparent;
float:left;
}
.menuTabs li {
background:url("../divider.gif") no-repeat scroll right top transparent;
float:left;
font-size:14px;
font-weight:bold;
padding:0 2px 0 0;
}
.menuTabs li a {
color:#1A1818;
display:block;
padding:8px 15px;
text-decoration:none;
text-shadow:0 1px 0 #FFFFFF;
}
.menuTabs li a:hover {
color:#555555;
}
.menuTabs li a img, .userInfoLogin img {
vertical-align:middle;
}
.userInfoLogin .usernameMenu a {
padding:9px 10px 6px;
}
.userInfoLogin .monitor-notificaciones {
position:relative;
z-index:9000;
}
.notification-detail li {
float:left;
width:100%;
}
.notification-detail li.unread {
background:none repeat scroll 0 0 #FFFFCC;
}
.notification-detail .avatar-box {
float:left;
margin-right:10px;
}
.notification-detail .notification-info {
float:left;
width:655px;
}
.notification-detail .notification-info span.time {
color:#808080;
font-size:11px;
text-transform:lowercase;
}
.notification-detail .notification-info span a {
font-size:13px;
}
.notification-detail .notification-info span.action {
color:#000000;
display:block;
font-size:13px;
margin-top:5px;
}
div.group-4, div.group-3 {
background-position:-17px 2px;
display:block;
float:left;
height:36px !important;
margin-right:10px;
width:36px !important;
}
div.group-6 {
background-position:-17px -31px;
display:block;
float:left;
height:36px !important;
margin-right:10px;
width:36px !important;
}
li.group .notification-info .action .icon-noti {
display:none !important;
}
li.group strong {
color:#000000;
font-size:13px;
font-weight:bold;
}
.categoriaList {
-moz-border-radius:5px 5px 5px 5px;
background:none repeat scroll 0 0 #F6F6F6;
border:1px solid #CCCCCC;
margin-bottom:10px;
}
.categoriaList h6 {
background:url("../hrline.gif") repeat-x scroll left bottom transparent;
font-size:13px;
font-weight:bold;
margin:0 0 10px;
padding:8px 0 10px 8px;
}
.notification-detail li {
border-bottom:1px dotted #CCCCCC;
font-size:12px;
padding:5px 0;
}
.notification-detail li a {
color:#116FCF;
font-weight:bold;
}
.filterBy h2 {
font-weight:normal;
margin:5px;
}
.action span.icon-noti, .notificaciones-list .icon-noti, .categoriaList span.icon-noti, div.group-4, div.group-6, div.group-3 {
background-image:url("../sprite-notification.png");
background-repeat:no-repeat;
display:block;
float:left;
font-size:12px;
height:16px;
margin-right:5px;
width:16px;
}
.notificaciones-list .icon-noti {
font-size:11px !important;
}
.categoriaList li.icon-noti {
font-size:11px;
margin-left:8px;
}
.action span.sprite-balloon-left, .userInfoLogin .sprite-balloon-left, .categoriaList .comentarios-n, .boxy-title .comentarios-n {
background-position:0 0;
}
.action span.sprite-balloon-left-blue, .userInfoLogin .sprite-balloon-left-blue, .categoriaList .comentarios-n-b, .boxy-title .comentarios-n-b {
background-position:0 -177px;
}
.action span.sprite-balloon-left-green, .userInfoLogin .sprite-balloon-left-green, .categoriaList .comentarios-n-g, .boxy-title .comentarios-n-g {
background-position:0 -197px;
}
.action span.sprite-balloons, .userInfoLogin .sprite-balloons, .categoriaList .respuestas-n, .boxy-title .respuestas-n {
background-position:0 -22px;
}
.action span.sprite-block, .userInfoLogin .sprite-block, .categoriaList .comunidades-n, .boxy-title .comunidades-n {
background-position:0 -52px;
}
.action span.sprite-document-text-image, .userInfoLogin .sprite-document-text-image, .categoriaList .post-n, .boxy-title .post-n {
background-position:0 -78px;
}
.action span.sprite-point, .userInfoLogin .sprite-point, .categoriaList .puntos-n, .boxy-title .puntos-n {
background-position:0 -103px;
}
.action span.sprite-star, .userInfoLogin .sprite-star, .categoriaList .favoritos-n, .boxy-title .favoritos-n {
background-position:0 -129px;
}
.action span.sprite-follow, .userInfoLogin .sprite-follow, .categoriaList .follow-n, .boxy-title .follow-n {
background-position:0 -154px;
}
.action span.sprite-recomendar-p, .userInfoLogin .sprite-recomendar-p, .categoriaList .recomendar-p, .boxy-title .recomendar-p {
background-position:0 -324px;
}
.userInfoLogin li .alertas, .userInfoLogin li .alertas a {
background-image:url("../alert-notification.png");
background-repeat:no-repeat;
color:#FFFFFF;
display:block;
font-size:11px;
text-align:center;
text-shadow:0 -1px 0 #8E1925;
}
.userInfoLogin li .alertas {
background-position:right top;
padding:0 8px 0 0;
position:absolute;
right:-10px;
top:-6px;
}
.userInfoLogin li .alertas a {
background-position:left top;
padding:2px 0 4px 8px;
}
.userInfoLogin li .alertas.span {
}
ul.menuTabs .tabbed.here a:hover {
background:none repeat scroll 0 0 transparent;
}
#menu ul.menuTabs li.here {
background:url("../bgTabbedHere.png") repeat-x scroll left top transparent;
}
.menuTabs li.tabbed.here a {
color:#FFFFFF;
text-shadow:0 1px 0 #000000;
}
.menuTabs #tabbedPosts.here a {
background:url("../menu_left_corner_here.gif") no-repeat scroll left top transparent;
}
.menuTabs li#tabbedPosts {
background:none repeat scroll 0 0 transparent;
}
.menuTabs li#tabbedPosts.here {
background:url("../bgTabbedHere.png") repeat-x scroll left top transparent;
}
.menuTabs li.registrate {
background:url("../nav_high.gif") repeat-x scroll left top transparent;
border-right:1px solid #999999;
}
.menuTabs li.registrate a {
text-shadow:0 1px 0 #F7FFA5;
}
.opciones_usuario {
background:url("../bgLogged.gif") repeat-x scroll right top transparent;
border-left:1px solid #7B7B7B;
float:right;
height:30px;
text-align:right;
}
.opciones_usuario.anonimo {
background:url("../bgAnon.gif") repeat-x scroll right top transparent;
}
#menu .opciones_usuario.anonimo.here {
background:none repeat scroll 0 0 #FFFFCC;
}
.userInfoLogin {
background:url("../loginCorner.gif") no-repeat scroll right top transparent;
font-weight:bold;
}
.userInfoLogin.here {
background:none repeat scroll 0 0 transparent;
}
.userInfoLogin a:hover {
text-decoration:none;
}
.userInfoLogin .monitorAlert {
position:relative;
}
.userInfoLogin .monitorAlert .alertD {
position:absolute;
right:-7px;
top:-4px;
z-index:10;
}
.anonimo .identificarme {
background:url("../anonCorner.gif") no-repeat scroll right top transparent;
}
.anonimo.here .identificarme {
background:none repeat scroll 0 0 transparent;
}
.userInfoLogin ul {
margin:0;
padding:0;
}
.userInfoLogin ul li {
border-left:1px solid #DCDCDC;
border-right:1px solid #717171;
float:left;
}
.userInfoLogin ul li.logout {
border-left:1px solid #DCDCDC;
border-right:medium none;
padding:7px 10px;
}
.userInfoLogin ul li.logout:hover {
background:none repeat scroll 0 0 transparent;
}
.userInfoLogin .logout a {
padding:0;
}
.userInfoLogin a {
color:#222222;
display:block;
padding:8px 10px 5px;
text-shadow:0 1px 0 #EEEEEE;
}
.userInfoLogin li:hover {
background-color:#CCCCCC;
}
.username {
font-weight:bold;
}
.subMenuContent {
height:30px;
}
.subMenuContent .clearBoth {
display:none;
}
.subMenuContent.hide {
display:none;
}
.subMenu {
background:url("../shadowSubMenu.png") repeat-x scroll left top #007394;
border-left:1px solid #04396F;
border-right:1px solid #04396F;
clear:both;
color:#CCCCCC;
display:none;
font-size:12px;
font-weight:bold;
padding:6px 5px 0 10px;
position:absolute;
width:944px;
z-index:3;
}
.subMenuContent .subMenu.here {
display:block;
}
.subMenu select {
float:right;
margin:2px 0 0;
width:200px;
}
#subMenuComunidades.subMenu {
background:url("../shadowSubMenu.png") repeat-x scroll left top #009B45;
border-color:-moz-use-text-color #0A6F04;
border-style:none solid;
border-width:medium 1px;
}
#subMenuComunidades.subMenu ul.tabsMenu li {
background:none repeat scroll 0 0 #48B167;
}
#subMenuComunidades.subMenu ul.tabsMenu li:hover {
background:none repeat scroll 0 0 #62CA81;
}
.subMenu ul.tabsMenu {
}
.subMenu .filterCat {
width:330px;
}
.subMenu .filterCat span {
color:#A8ECFF;
display:block;
float:left;
font-size:11px;
font-weight:normal;
margin:3px 10px 0 0;
text-shadow:0 1px 0 #07485B;
}
#subMenuComunidades.subMenu .filterCat span {
color:#BFFFAB;
text-align:right;
text-shadow:0 1px 0 #09730B;
}
.subMenu ul.tabsMenu li {
-moz-border-radius-topleft:2px;
-moz-border-radius-topright:2px;
background:none repeat scroll 0 0 #3B8BAC;
float:left;
margin-right:10px;
}
#preview_shortname {
font-weight:bold;
}
#msg_crear_shortname.ok, #preview_shortname.ok {
color:green;
font-weight:bold;
}
#msg_crear_shortname.error, #preview_shortname.error {
color:red;
font-weight:bold;
}
.onblur_effect {
color:#777777;
}
.subMenu ul.tabsMenu li.here a {
color:#000000;
}
.subMenu ul.tabsMenu li.here {
background:none repeat scroll 0 0 #FFFFFF !important;
float:left;
margin-right:10px;
}
.subMenu ul.tabsMenu li a {
color:#FFFFFF;
display:block;
padding:5px 15px;
}
.subMenu ul.tabsMenu li:hover {
background:none repeat scroll 0 0 #6CCFF7;
}
.subMenu ul.tabsMenu li:hover a {
color:#222222;
}
.subMenu .verCategoria a {
color:#021821;
}
.sel_categoria {
float:right;
}
.comunidades .box_txt.ultimos_posts {
width:388px !important;
}
.comunidades #derecha {
width:211px;
}
.usuarios_online {
color:#005CA5 !important;
font-weight:bold;
}
.usuarios_jugando {
color:#148558 !important;
font-weight:bold;
}
.dateFilter, .verMas {
color:#666666;
float:right;
font-size:10px;
font-weight:bold;
margin:0 0 5px;
text-align:right;
}
.dateFilter a, .verMas a {
color:#0060A7;
}
.dateFilter a.here, .verMas a.here {
color:#000000;
}
.comunidades #centro {
float:left;
margin:0 8px;
width:530px;
}
.comunidades #centroDerecha {
float:right;
width:760px;
}
li.categoriaCom {
border-bottom:1px solid #CCCCCC;
border-top:1px solid #FFFFFF;
font-size:10px;
height:32px;
margin:0;
padding:5px;
position:relative;
}
.comunidades .home #centro .box_cuerpo li:first-child {
border-top:medium none;
}
.comunidades .home #centro .box_cuerpo li:hover {
background:none repeat scroll 0 0 #EEEEEE;
}
.comunidades .home #centro .box_cuerpo li a.titletema:visited {
color:#561067;
}
.linksList a.titlePost:visited {
color:#561067;
}
.comunidades .home #centro .box_cuerpo li.oficial a.titletema {
padding-left:22px;
}
.comunidades .home #centro .box_cuerpo li img {
position:absolute;
right:5px;
top:6px;
}
li.categoriaCom .titletema, li.categoriaCom .titletema {
background-image:url("../big5v1.png");
background-repeat:no-repeat;
color:#1F7C46;
display:block;
font-size:12px;
font-weight:bold;
height:16px !important;
margin-bottom:2px;
overflow:hidden;
padding-left:24px;
width:420px;
}
.deportes .titletema {
background-position:0 -18px;
}
.diversion-esparcimiento .titletema {
background-position:0 -38px;
}
.economia-negocios .titletema {
background-position:0 -56px;
}
.entretenimiento-medios .titletema {
background-position:0 -72px;
}
.grupos-organizaciones .titletema {
background-position:0 -90px;
}
.interes-general .titletema {
background-position:0 -109px;
}
.internet-tecnologia .titletema {
background-position:0 -127px;
}
.musica-bandas .titletema {
background-position:0 -146px;
}
.regiones .titletema {
background-position:0 -164px;
}
span.oficial {
color:#FF6600;
font-weight:bold;
text-transform:uppercase;
}
.comunidades .home #showResult {
width:100%;
}
.divider {
border-bottom:1px solid #FFFFFF;
border-top:1px solid #CCCCCC;
color:#CCCCCC;
}
#post-izquierda .box_cuerpo h2, #izquierda .box_cuerpo h2 {
color:#333333;
font-size:14px;
}
.denunciar {
background:url("../dflag.gif") no-repeat scroll left top transparent;
color:#333333;
float:right;
font-size:10px;
line-height:1em;
padding-left:12px;
}
.thead {
border-bottom:1px solid #CCCCCC !important;
color:#666666;
font-size:11px;
padding:4px;
}
.thead.titulo {
width:380px;
}
tr.temas td {
border-bottom:1px solid #CCCCCC;
padding:4px;
}
.temas .temaTitulo a {
font-weight:bold;
}
.temas .datetema {
font-size:11px;
text-align:center;
}
.small {
font-size:11px;
}
.color1 {
background:none repeat scroll 0 0 #EEEEEE;
}
.color2 {
}
.comunidadData {
overflow:hidden;
}
.comunidadData.oficial {
position:relative;
}
.comunidadData.oficial .riboon {
position:absolute;
right:-7px;
top:-8px;
}
.oficial .box_title {
background:url("../box_titlebg_oficial.gif") repeat-x scroll left top #94C3EE;
}
.oficial .box_rss {
background:url("../cor-der-oficial.gif") no-repeat scroll right top transparent;
}
.oficial .box_txt {
background:url("../cor-izq-oficial.gif") no-repeat scroll left top transparent;
color:#0A3868;
}
.oficial .box_cuerpo {
background:none repeat scroll 0 0 #B3DBFF;
}
.comunidadData.oficial .box_cuerpo hr.divider {
border-bottom:1px solid #FFFFFF;
border-top:1px solid #1984E5;
color:#1984E5;
}
.avaComunidad {
background:url("../shadowAva.png") no-repeat scroll center 125px transparent;
height:134px;
margin:0 auto;
position:relative;
width:126px;
}
.avaComunidad .avatar {
background:none repeat scroll 0 0 #FFFFFF;
border:1px solid #CCCCCC;
height:120px;
padding:2px;
width:120px;
}
.ultimo_post {
text-align:right;
}
.ultimo_post a {
font-weight:bold;
}
.pages {
color:#CCCCCC;
font-size:11px;
padding-top:10px;
text-align:right;
}
.pages a {
color:#333333;
font-weight:bold;
}
.pages a.here {
color:#CCCCCC;
}
.pages .btnPagi {
-moz-border-radius:3px 3px 3px 3px;
background:none repeat scroll 0 0 #383838;
color:#FFFFFF;
display:block;
font-weight:bold;
padding:5px 10px;
}
a.nuevotemaBtn {
-moz-border-radius:3px 3px 3px 3px;
background:none repeat scroll 0 0 #006699;
color:#FFFFFF;
font-size:11px;
font-weight:normal;
margin-top:10px;
padding:5px 10px;
}
a.nuevotemaBtn:hover {
background:none repeat scroll 0 0 #0085C7;
}
.emptyData {
background:none repeat scroll 0 0 #FFFFCC;
border-bottom:1px solid #C8C82D;
border-top:1px solid #C8C82D;
font-weight:bold;
padding:12px;
text-align:center;
}
.warningData {
background:none repeat scroll 0 0 #FF8484;
border-bottom:1px solid #D62727;
border-top:1px solid #D62727;
font-weight:bold;
margin-bottom:10px;
padding:12px;
text-align:center;
}
.emptyData a, .warningData a {
color:#004A95;
}
.suspendido_data {
background:none repeat scroll 0 0 #FFFFCC;
border-bottom:1px solid #C8C82D;
border-top:1px solid #C8C82D;
margin-bottom:10px;
padding:12px;
text-align:center;
}
.suspendido_data #ver_mas {
display:none;
margin-top:10px;
text-align:left;
}
.dataRow {
margin-bottom:5px;
}
.box_Corner {
background-image:url("../corner.gif");
background-repeat:no-repeat;
}
.box_Corner.corner_top_right {
background-position:right top;
padding-top:5px;
}
.box_Corner.corner_bottom_left {
background-position:left bottom;
}
.box_Corner.corner_bottom_right {
background-position:right bottom;
padding-bottom:5px;
}
.box_cuerpo li .comunidad {
width:auto;
}
.linea {
background:url("../line.gif") repeat-y scroll 0 0 transparent;
}
.linea_left {
background-position:left center;
}
.linea_right {
background-position:right center;
}
.Container {
color:#333333;
font-size:12px;
position:relative;
}
.Container table {
margin:5px 0;
width:100%;
}
.Container h1 {
font-size:21px;
margin:0;
padding:3px;
}
.Container p {
color:#111111;
font-size:12px;
line-height:1.7em;
}
.Container img.dialogBox {
left:-10px;
position:absolute;
top:6px;
}
.agregar_comentario .Container img.dialogBox {
left:-10px;
position:absolute;
top:10px;
}
* html .Container img.dialogBox {
display:none;
}
.dataLeft, .dataRight {
float:left;
font-size:12px;
line-height:17px;
margin-right:2%;
text-align:right;
}
.dataLeft {
font-weight:bold;
margin:0;
width:120px;
}
.dataRight {
margin:0 0 0 2%;
text-align:left;
width:350px;
}
.breadcrump {
float:left;
height:30px;
margin-bottom:10px;
overflow:hidden;
width:875px;
}
.breadcrump ul, .breadcrump ul li, .breadcrump ul li.first, .breadcrump ul li.last {
background-image:url("../bgBread.gif");
background-repeat:no-repeat;
}
.breadcrump ul {
background-position:left -62px;
background-repeat:repeat-x;
float:left;
font-weight:bold;
margin-bottom:10px;
text-shadow:0 1px 0 #FFFFFF;
}
.breadcrump ul li {
background-position:left 0;
float:left;
height:14px;
padding:8px 5px 8px 22px;
}
.breadcrump ul li.first {
background-position:left -31px;
padding:8px 0 8px 8px;
}
.breadcrump ul li.last {
background-position:left -93px;
padding:8px;
}
.breadcrump ul li a {
color:#165A9E;
}
#temaComunidad {
float:left;
}
#temaComunidad img {
max-width:600px;
}
h1.titulopost {
float:left;
font-size:15px;
line-height:18px;
width:460px;
}
.temaContainer {
color:#333333;
float:left;
margin-left:12px;
}
.temaBubble {
float:left;
width:760px;
}
.temaCont {
float:right;
}
.bubbleCont {
-moz-border-radius:5px 5px 5px 5px;
background:none repeat scroll 0 0 #F7F7F7;
border:1px solid #CCCCCC;
overflow:hidden;
padding:12px;
}
.comentarioContainer {
background:none repeat scroll 0 0 #F7F7F7;
border-bottom:1px solid #CCCCCC;
border-left:1px solid #CCCCCC;
border-right:1px solid #CCCCCC;
}
.titulorespuestas {
font-size:14px;
margin:0;
}
.mostrarAnteriores {
float:right;
margin-bottom:10px;
text-align:center;
width:626px;
}
.mostrarAnteriores a {
-moz-border-radius:5px 5px 5px 5px;
background:none repeat scroll 0 0 #F7F7F7;
border:1px solid #CCCCCC;
color:#1B1B1B;
display:block;
font-weight:bold;
padding:10px;
}
.mostrarAnteriores a:hover {
background:none repeat scroll 0 0 #CCCCCC;
border:1px solid #EEEEEE;
}
.respuesta, .miRespuesta {
clear:both;
margin-top:10px;
}
#respuestas .respuesta.here {
background:none repeat scroll 0 0 #FFFFCC;
font-weight:bold;
}
.respuesta img.imagen {
max-width:600px;
}
.answerInfo, .comentarioInfo {
float:left;
padding-right:10px;
width:40px;
}
.answerInfo h3, .comentarioInfo h3 {
font-size:11px;
margin:6px 2px 0 0;
}
.answerTxt, .comentarioTxt {
float:left;
margin-left:17px;
width:690px;
}
.primero .comentarioContainer {
border-top:1px solid #CCCCCC;
}
.primero .comentarioTxt .Container {
border-top:medium none;
}
.primero .comentarioContainer {
-moz-border-radius-topleft:5px;
-moz-border-radius-topright:5px;
}
.ultimo .comentarioContainer {
-moz-border-radius-bottomleft:5px;
-moz-border-radius-bottomright:5px;
}
.answerTxt .Container {
background:none repeat scroll 0 0 #F7F7F7;
border:1px solid #CCCCCC;
padding:12px;
}
.agregar_comentario .answerTxt .Container {
background:none repeat scroll 0 0 #FFFFCC;
border:1px solid #DBDBA8;
}
.textA, .comentarioTxt p {
margin:8px;
}
.answerTxt .Container, .comentarioTxt .Container {
color:#111111 !important;
font-size:12px;
line-height:20px;
padding:12px;
}
#respuestas .answerTxt .Container {
padding:0;
}
.comentarioTxt .Container {
border-top:1px solid #FFFFFF;
}
.answerRate {
float:right;
}
.goodAnswer .badAnswer {
}
.ipMonitor {
color:#666666;
font-size:11px;
text-align:right;
}
.commentDelete {
background:none repeat scroll 0 0 #FFAEAE;
color:#000000;
margin-left:132px;
margin-top:5px;
padding:12px;
text-align:center;
width:602px;
}
.autorPost .comentarioContainer {
background:none repeat scroll 0 0 #EEF9FE;
border:1px solid #7ED3F7;
}
.goodAnswer a, .badAnswer a {
display:block;
font-size:11px;
font-weight:bold;
margin-top:3px;
padding:2px 23px 5px 5px;
}
.goodAnswer a {
background:url("../bgGood.gif") no-repeat scroll left top transparent;
}
.badAnswer a {
background:url("../bgBad.gif") no-repeat scroll left top transparent;
margin-left:5px;
}
.modBar {
margin-top:10px;
}
#buttons.modBar input.mBtn {
font-size:12px;
padding:3px 5px;
}
.c_input {
width:400px;
}
.c_input_desc {
height:380px;
width:200px;
}
.desform {
color:#999999;
}
#modalBody .data {
clear:both;
margin-top:5px;
padding:0.25em 0;
}
.titleHighlight {
-moz-border-radius:5px 5px 5px 5px;
background:none repeat scroll 0 0 #FFFFCC;
border:1px solid #E9E94F;
color:#45450E;
font-size:16px;
font-weight:bold;
padding:8px;
}
div.form-container {
padding:0 10px;
}
p.legend {
margin-bottom:1em;
}
p.legend em {
color:#CC0000;
font-style:normal;
}
div.errors {
background-color:#FFFFCC;
border:1px solid #FFCC66;
margin:0 0 10px;
padding:5px 10px;
}
div.errors p {
margin:0;
}
div.errors p em {
color:#CC0000;
font-style:normal;
font-weight:bold;
}
div.form-container form p {
margin:0;
}
div.form-container form p.note {
color:#333333;
font-size:90%;
margin-left:170px;
}
div.form-container form legend {
color:#666666;
font-weight:bold;
}
div.form-container form div.data {
clear:both;
margin-top:5px;
padding:0.25em 0;
}
div.form-container form div.dataL {
float:left;
margin-top:5px;
padding:0.25em 0;
width:48%;
}
div.form-container form div.dataR {
float:right;
margin-top:5px;
padding:0.25em 0;
width:48%;
}
.c_input, .c_input_desc {
background:none repeat scroll 0 0 #FFFFFF;
margin-top:5px;
padding:8px;
width:95%;
}
div.form-container select {
margin-top:5px;
}
div.form-container form div.postLabel {
display:block;
padding:5px 0 0;
}
div.form-container label, div.form-container span.label {
display:block;
font-size:12px;
font-weight:bold;
margin-right:10px;
padding-right:10px;
position:relative;
text-align:left;
}
div.form-container label.error, div.form-container span.error {
color:#CC0000;
}
div.form-container label em, div.form-container span.label em {
color:#CC0000;
font-size:120%;
font-style:normal;
position:absolute;
right:0;
}
div.form-container input.error {
background-color:#FFEEFF;
border-color:#CC0000;
}
div.form-container input:focus, div.form-container input.error:focus, div.form-container textarea:focus {
background:none repeat scroll 0 0 #FFFFCC;
border-color:#FFCC66;
}
div.form-container div.controlset label, div.form-container div.controlset input {
display:inline;
float:none;
}
div.form-container div.controlset div {
margin-left:170px;
}
div.form-container div.buttonrow {
margin-left:180px;
}
.buttonAction {
padding-left:170px;
}
div.postLabel label {
display:inline;
margin:0;
padding:0;
}
#ComInfo {
overflow:hidden;
}
div.form2 input.c_input, div.form2 textarea.c_input_desc, .box_cuenta input {
-moz-border-radius:3px 3px 3px 3px;
border:1px solid #B1B1B1;
padding:5px;
}
div.form2 .dataR select, div.form2 .dataL select {
margin:10px 0 0;
width:98%;
}
div.form2 .dataRadio {
font-weight:bold;
}
div.form2 .dataRadio input {
margin-right:5px;
}
div.form2 .dataRadio .descRadio {
color:#666666;
font-size:11px;
font-weight:normal;
margin:0 0 5px 24px;
}
#mas_oportunidades .mo_box {
margin-bottom:10px;
margin-left:5px;
}
#mas_oportunidades .box_title {
background:url("../anunciantes/mo/mo_box_titlebg.gif") repeat-x scroll 0 0 #AA0001;
}
#mas_oportunidades .box_txt {
background-image:url("../anunciantes/mo/mo_cor-izq.gif");
color:#FFFFFF;
font-weight:bold;
}
#mas_oportunidades .box_rss {
background-image:url("../anunciantes/mo/mo_cor-der.gif");
}
#mas_oportunidades .input_izq, #ml .input_izq {
background:url("../anunciantes/mo/mo_input_izq.gif") no-repeat scroll left top #FBFBFC;
border:medium none;
float:left;
height:21px;
width:19px;
}
#mas_oportunidades input.buscador, #ml input.buscador {
background:url("../anunciantes/mo/mo_input_bg.gif") repeat-x scroll left top #FBFBFC;
border:medium none;
float:left;
font-size:11px;
height:13px;
margin:0 -1px;
padding:4px;
width:150px;
}
#mas_oportunidades .input_der, #ml .input_der {
background:url("../anunciantes/mo/mo_input_der.gif") no-repeat scroll left top #FBFBFC;
border:medium none;
float:left;
height:21px;
width:11px;
}
#mas_oportunidades input.mo_buscar {
background:none repeat scroll 0 0 transparent;
border:medium none;
float:right;
margin-top:-1px;
padding:0;
}
#mas_oportunidades a.mo_linkTo {
color:#0D62A8;
height:1%;
padding-top:10px;
}
#mas_oportunidades a img {
border:0 none;
}
#ml .ml_box {
margin-bottom:10px;
margin-left:5px;
}
#ml .box_title {
background:url("../anunciantes/ml/ml_box_titlebg.gif") repeat-x scroll 0 0 #FCBC00;
}
#ml .box_txt {
background-image:url("../anunciantes/ml/ml_cor-izq.gif");
color:#FFFFFF;
font-weight:bold;
}
#ml .box_rss {
background-image:url("../anunciantes/ml/ml_cor-der.gif");
}
#ml input.ml_buscar {
background:none repeat scroll 0 0 transparent;
border:medium none;
float:right;
margin-top:-1px;
padding:0;
}
#ml a.ml_linkTo {
color:#0D62A8;
height:1%;
padding-top:10px;
}
#ml a img {
border:0 none;
}
:focus {
outline:0 none;
}
.status_error {
color:red;
}
* html #centro .box_cuerpo {
width:290px;
}
* html .comunidades #centro .box_cuerpo {
width:498px;
}
* html .comentarios_container .box_cuerpo {
width:740px;
}
* html .container350 .box_title {
width:350px !important;
}
* html .container350 .box_txt.registro_aclaracion {
width:324px !important;
}
* html .container350 .box_cuerpo {
width:334px !important;
}
* html #post_agregar .box_txt.registro {
width:548px !important;
}
* html #post_agregar .box_rss {
padding:0;
width:0;
}
.markItUp * {
margin:0;
outline:medium none;
padding:0;
}
.markItUp a:link, .markItUp a:visited {
color:#000000;
text-decoration:none;
}
.markItUp {
margin:0;
}
.markItUpContainer {
font:11px Verdana,Arial,Helvetica,sans-serif;
}
.markItUpEditor {
clear:both;
display:block;
line-height:18px;
overflow:auto;
padding:5px;
}
.markItUpHeader {
padding-bottom:5px;
}
.markItUpFooter {
width:100%;
}
.markItUpResizeHandle {
background-image:url("../markit-handle.png");
cursor:n-resize;
height:5px;
margin-left:auto;
margin-right:auto;
overflow:hidden;
width:22px;
}
.markItUpHeader ul li {
float:left;
height:22px;
list-style:none outside none;
margin-right:2px;
position:relative;
width:22px;
}
.markItUpHeader ul li ul li {
width:auto;
}
.markItUpHeader ul li ul li:hover {
background:none repeat scroll 0 0 transparent;
}
.markItUpHeader ul li:hover {
background-image:url("../bbcodeshover.png");
}
.markItUpHeader ul li:hover > ul {
display:block;
}
.markItUpHeader ul .markItUpDropMenu {
background:url("../markit-menu.png") no-repeat scroll 115% 50% transparent;
margin-right:5px;
z-index:1;
}
.markItUpHeader ul .markItUpDropMenu li {
margin-right:0;
}
.markItUpHeader ul ul {
background:none repeat scroll 0 0 #FFFFFF;
border:1px solid #CCCCCC;
display:none;
left:0;
position:absolute;
top:16px;
}
.markItUpHeader ul ul li {
border-bottom:1px solid #CCCCCC;
float:none;
}
.markItUpHeader ul ul .markItUpDropMenu {
background:url("../markit-submenu.png") no-repeat scroll 100% 50% #FFFFFF;
}
.markItUpHeader ul .markItUpSeparator {
background-color:#CCCCCC;
height:16px;
margin:0 10px;
overflow:hidden;
width:1px;
}
.markItUpHeader ul ul .markItUpSeparator {
height:1px;
margin:0;
width:auto;
}
.markItUpHeader ul ul ul {
left:150px;
position:absolute;
top:-1px;
}
.markItUpHeader ul ul ul li {
float:none;
}
.markItUpHeader ul ul li a {
background:none repeat scroll 0 0 #FFFFFF;
}
.markItUpHeader ul a {
background-repeat:no-repeat;
display:block;
height:16px !important;
margin:3px;
text-indent:-10000px;
width:16px;
}
.markItUpHeader ul ul a {
background-position:2px 50%;
display:block;
padding:2px 5px 1px 25px;
text-indent:0;
width:120px;
}
.markItUpHeader ul ul a:hover {
background-color:#3B8BAC;
color:#FFFFFF;
}
.markItUp .markItUpButton1 a {
background:url("../bbcodes.png") no-repeat scroll left -48px transparent;
height:10px;
}
.markItUp .markItUpButton2 a {
background:url("../bbcodes.png") no-repeat scroll left -64px transparent;
height:10px;
}
.markItUp .markItUpButton3 a {
background:url("../bbcodes.png") no-repeat scroll left -189px transparent;
height:10px;
}
.markItUp .markItUpButton4 a {
background:url("../bbcodes.png") no-repeat scroll left 0 transparent;
height:10px;
}
.markItUp .markItUpButton5 a {
background:url("../bbcodes.png") no-repeat scroll left -16px transparent;
height:10px;
}
.markItUp .markItUpButton6 a {
background:url("../bbcodes.png") no-repeat scroll left -32px transparent;
height:10px;
}
.markItUp .markItUpButton7 a {
background:url("../bbcodes.png") no-repeat scroll left -208px transparent;
height:10px;
}
.markItUpButton .markItUpButton7-1 a {
color:darkred;
}
.markItUpButton .markItUpButton7-2 a {
color:red;
}
.markItUpButton .markItUpButton7-3 a {
color:orange;
}
.markItUpButton .markItUpButton7-4 a {
color:brown;
}
.markItUpButton .markItUpButton7-5 a {
color:yellow;
}
.markItUpButton .markItUpButton7-6 a {
color:green;
}
.markItUpButton .markItUpButton7-7 a {
color:olive;
}
.markItUpButton .markItUpButton7-8 a {
color:cyan;
}
.markItUpButton .markItUpButton7-9 a {
color:blue;
}
.markItUpButton .markItUpButton7-10 a {
color:darkblue;
}
.markItUpButton .markItUpButton7-11 a {
color:indigo;
}
.markItUpButton .markItUpButton7-12 a {
color:violet;
}
.markItUpButton .markItUpButton7-13 a {
color:black;
}
.markItUp .markItUpButton8 a {
background:url("../bbcodes.png") no-repeat scroll left -224px transparent;
height:10px;
}
.markItUp .markItUpButton9 a {
background:url("../bbcodes.png") no-repeat scroll left -174px transparent;
height:10px;
}
.markItUpButton .markItUpButton9-1 a {
font-family:'Arial';
}
.markItUpButton .markItUpButton9-2 a {
font-family:'Courier New';
}
.markItUpButton .markItUpButton9-3 a {
font-family:'Georgia';
}
.markItUpButton .markItUpButton9-4 a {
font-family:'Times New Roman';
}
.markItUpButton .markItUpButton9-5 a {
font-family:'Verdana';
}
.markItUpButton .markItUpButton9-6 a {
font-family:'Trebuchet MS';
}
.markItUpButton .markItUpButton9-7 a {
font-family:'Lucida Sans';
}
.markItUpButton .markItUpButton9-8 a {
font-family:'Comic Sans';
}
.markItUp .markItUpButton10 a, .markitcomment .markItUp .markItUpButton4 a {
background:url("../bbcodes.png") no-repeat scroll left -80px transparent;
height:10px;
}
.markItUp .markItUpButton11 a {
background:url("../bbcodes.png") no-repeat scroll left -96px transparent;
height:10px;
}
.markItUp .markItUpButton12 a, .markitcomment .markItUp .markItUpButton6 a {
background:url("../bbcodes.png") no-repeat scroll left -112px transparent;
height:10px;
}
.markItUp .markItUpButton13 a, .markitcomment .markItUp .markItUpButton5 a, .miRespuesta .markItUp .markItUpButton5 a {
background:url("../bbcodes.png") no-repeat scroll left -128px transparent;
height:10px;
}
.markItUp .markItUpButton14 a, .markitcomment .markItUp .markItUpButton6 a, .miRespuesta .markItUp .markItUpButton6 a {
background:url("../bbcodes.png") no-repeat scroll left -144px transparent;
height:10px;
}
.markItUp .markItUpButton15 a, .markitcomment .markItUp .markItUpButton7 a, .miRespuesta .markItUp .markItUpButton7 a, .citarAnswer {
background:url("../bbcodes.png") no-repeat scroll left -160px transparent;
height:10px;
}
#mask {
left:0;
position:absolute;
top:0;
z-index:100;
}
#modalBody {
font-size:13px;
padding:20px 5px;
text-align:center;
}
.modalForm {
-moz-border-radius:5px 5px 5px 5px;
background:none repeat scroll 0 0 #EEEEEE;
border:1px solid #B9B9B9;
font-size:11px;
font-weight:normal;
margin-bottom:10px;
padding:5px;
text-align:left;
}
#modalBody .modalForm.here {
background:none repeat scroll 0 0 #FFFFCC;
border:1px solid #BEBE33;
}
#modalBody input {
margin:0;
vertical-align:middle;
}
#modalBody input#icausa_status {
width:300px;
}
.mTitle {
font-size:13px;
font-weight:bold;
padding-left:5px;
}
.mColLeft {
float:left;
text-align:right;
width:35%;
}
.mColRight {
float:right;
width:60%;
}
#cuerpo input.iTxt {
background:none repeat scroll 0 0 #FFFFFF;
border:1px solid #CCCCCC;
font-size:11px;
padding:3px;
width:160px;
}
#modalBody input.mDate {
width:35px;
}
li.mBlock {
clear:both;
margin-bottom:10px;
}
li.cleaner {
clear:both;
}
.orange {
color:#FF6600;
}
.buttons, #buttons {
clear:both;
text-align:center;
}
.comunidadData .buttons .mBtn.btnCancel {
}
.mBtn {
-moz-border-radius:5px 5px 5px 5px;
color:#FFFFFF;
cursor:pointer;
font-size:12px;
font-weight:bold;
padding:5px 10px;
width:100%;
}
.mBtn:active {
background:url("../btnRainbow.gif") repeat-x scroll left -265px #9A9A9A !important;
border:1px solid #666666 !important;
color:#FFFFFF !important;
text-shadow:0 -1px 0 #111111 !important;
}
#body_resp {
margin-bottom:10px;
}
.mBtn.bigF {
font-size:14px;
padding:5px 15px;
}
.mBtn.btnOk {
background:url("../btnRainbow.gif") repeat-x scroll left top #2E8AF5;
border:1px solid #1C6BC6;
color:#032342;
text-shadow:0 1px 0 #91C6F9;
width:auto;
}
.mBtn.btnDelete {
background:url("../btnRainbow.gif") repeat-x scroll left -205px #B30100;
border:1px solid #7F0908;
color:#290202;
text-shadow:0 1px 0 #FB6D6D;
width:auto;
}
.mBtn.btnCancel {
background:url("../btnRainbow.gif") repeat-x scroll left -105px #BDBDBD;
border:1px solid #848484;
color:#656262;
text-shadow:0 1px 0 #EEEEEE;
width:auto;
}
.mBtn.btnGreen {
background:url("../btnRainbow.gif") repeat-x scroll left -55px #3ED32E;
border:1px solid #06611D;
color:#043410;
text-shadow:0 1px 0 #51E575;
}
.mBtn.btnYellow {
background:url("../btnRainbow.gif") repeat-x scroll left -155px #FFC74B;
border:1px solid #F9AD1B;
color:#642514;
text-shadow:0 1px 0 #FDE088;
}
.nuevoTema {
width:100px;
}
.mBtn.btnYellow {
padding:3px 10px;
}
#mydialog #cuerpo {
position:relative;
}
#mydialog #procesando {
background:none repeat scroll 0 0 white;
display:none;
height:100%;
opacity:0.9;
position:absolute;
width:100%;
z-index:102;
}
#mydialog #procesando #mensaje {
color:#222222;
height:100%;
position:relative;
}
#mydialog #procesando #mensaje img {
left:44%;
margin-right:10px;
position:absolute;
top:29%;
vertical-align:middle;
width:25px;
}
#mydialog #procesando #mensaje div {
font-size:20px;
font-weight:bold;
margin-left:-25px;
margin-top:25px;
text-align:center;
}
#mydialog #buttons {
padding:15px 0;
text-align:center;
width:100%;
}
#mydialog .guardarBtn {
-moz-border-radius:5px 5px 5px 5px;
background:none repeat scroll 0 0 #B0DE27;
border:1px solid #607F08;
color:#222222;
cursor:pointer;
font-size:14px;
font-weight:normal;
padding:5px 15px;
}
#mydialog .guardarBtn.disabled {
background:none repeat scroll 0 0 #CCCCCC;
border:1px solid #333333;
opacity:0.2;
}
#mydialog .cancelarBtn {
-moz-border-radius:5px 5px 5px 5px;
background:none repeat scroll 0 0 #D8D8D8;
border:1px solid #C4C4C4;
color:#222222;
cursor:pointer;
font-size:14px;
padding:5px 15px;
}
.selectCategorie {
display:none;
position:absolute;
right:0;
top:26px;
z-index:101;
}
.selectCategorie .selectCategorieHeader {
background:url("../bgHeaderCat.png") no-repeat scroll -1px top transparent;
height:10px;
text-align:center;
width:205px;
}
.selectCategorie .selectCategorieFooter {
background:url("../bgFooterCat.png") no-repeat scroll -1px top transparent;
height:20px;
text-align:center;
width:205px;
}
.selectCategorie ul {
background:url("../selectCatBody.png") repeat-y scroll left top transparent;
overflow:hidden;
padding:10px;
}
.selectCategorie li {
overflow:hidden;
}
.scrollable {
height:275px;
overflow:hidden;
position:relative;
width:205px;
}
.scrollable .items {
position:absolute;
top:0;
width:205px;
}
.selectCategorie ul li {
display:block;
height:20px;
margin:2px 0;
padding:3px 0 0;
}
.selectCategorie span {
margin-left:5px;
padding:0 0 0 20px;
}
.selectCategorie ul li:hover {
background:url("../hoverLi.gif") no-repeat scroll left top transparent;
}
.selectCategorie ul li:hover a {
color:#FFFFFF;
font-weight:bold;
width:400px;
}
.selectCategorie ul li span.categoria {
float:none;
width:100%;
}
.infoPost {
border-top:1px solid #CCCCCC;
clear:both;
margin-top:10px;
padding:10px 10px 5px;
width:715px;
}
.infoPost strong.title {
display:block;
margin-bottom:3px;
}
.infoPost .shareBox, .infoPost .rateBox, .infoPost .followBox, .infoPost .metaBox, .infoPost .ageBox {
float:left;
width:20%;
}
.infoPost .tagsBox {
border-top:1px dashed #CCCCCC;
margin-top:5px;
padding-top:10px;
width:100%;
}
.infoPost .tagsBox ul {
display:inline;
}
.infoPost .socialIcons, .container370 .socialIcons {
background:url("../socialIcons.png") no-repeat scroll 0 0 transparent;
display:block;
float:left;
height:16px;
margin-right:5px;
width:16px;
}
.infoPost .socialIcons.delicious, .container370 .socialIcons.delicious {
background-position:0 0;
}
.infoPost .socialIcons.facebook, .container370 .socialIcons.facebook {
background-position:0 -16px;
}
.infoPost .socialIcons.digg, .container370 .socialIcons.digg {
background-position:0 -32px;
}
.infoPost .socialIcons.twitter, .container370 .socialIcons.twitter {
background-position:0 -48px;
}
.infoPost .socialIcons.email, .container370 .socialIcons.email {
background-position:0 -64px;
}
.infoPost .rateBox {
font-weight:bold;
}
.thumbs {
background:url("../thumbs.png") no-repeat scroll 0 0 transparent;
display:block;
float:left;
height:16px;
margin-right:3px;
width:16px;
}
.thumbs.thumbsUp {
background-position:0 0;
}
.thumbs.thumbsDown {
background-position:0 -16px;
}
.thumbs.thumbsUp:hover {
background-position:0 -32px;
}
.thumbs.thumbsDown:hover {
background-position:0 -48px;
}
.infoPost .tagsBox ul li {
display:inline;
font-size:11px;
}
.infoPost .followBox {
text-align:right;
}
div.filterBy, .paginatorBar {
-moz-border-radius:5px 5px 5px 5px;
background:none repeat scroll 0 0 #F3F3F3;
padding:8px;
}
.paginatorBar a, .paginator a {
-moz-border-radius:3px 3px 3px 3px;
background:none repeat scroll 0 0 #383838;
color:#FFFFFF;
display:block;
font-weight:bold;
padding:5px 10px;
}
.paginadorCom .next a, .paginadorCom .before a {
-moz-border-radius:3px 3px 3px 3px;
background:none repeat scroll 0 0 #383838;
color:#FFFFFF;
font-weight:bold;
padding:5px 10px;
}
div.filterBy a {
color:#2F2F2F;
}
div.filterBy ul {
float:right;
}
div.filterBy ul li {
-moz-border-radius:3px 3px 3px 3px;
background:none repeat scroll 0 0 #999999;
border-bottom:1px solid #FFFFFF;
color:#383838;
float:left;
font-weight:bold;
margin-left:10px;
}
div.filterBy ul li a {
color:#FFFFFF;
display:block;
font-weight:bold;
padding:5px 10px;
}
div.filterBy ul li:hover {
background:none repeat scroll 0 0 #002561;
}
div.filterBy ul li:hover a {
color:#FFFFFF;
}
div.filterBy ul li.here {
-moz-border-radius:3px 3px 3px 3px;
background:none repeat scroll 0 0 #34569D;
color:#FFFFFF;
font-weight:bold;
}
div.filterBy ul li.here a {
color:#FFFFFF;
}
div.filterBy ul li select {
margin:3px 0 0 5px;
}
.orderTxt {
background:none repeat scroll 0 0 transparent !important;
border-bottom:medium none !important;
padding-top:5px;
}
.memberInfo {
float:left;
width:33%;
}
.memberInfo a {
color:#053E78;
font-size:12px;
font-weight:bold;
}
.memberInfo img {
border:1px solid #C1C1C1;
display:block;
height:60px;
margin-top:5px;
padding:1px;
width:60px;
}
a.btnNegative, a.btnPositive, a.btnNeutral {
-moz-border-radius:5px 5px 5px 5px;
color:#FFFFFF;
display:block;
margin:10px 0 0;
padding:5px;
}
a.btnPositive {
background:none repeat scroll 0 0 #00992D;
}
a.btnNegative {
background:none repeat scroll 0 0 #990200;
}
a.btnNeutral {
background:none repeat scroll 0 0 #999999;
}
.Container textarea {
background:none repeat scroll 0 0 #FFFFFF;
border:1px solid #CCCCCC;
clear:both;
float:left;
font-size:13px;
height:50px;
margin:5px 0 0;
max-height:500px;
min-height:50px;
padding:5px;
vertical-align:bottom;
width:98%;
}
* html .Container textarea {
float:none;
}
.postBy {
-moz-border-radius:4px 4px 4px 4px;
background:none repeat scroll 0 0 #EEEEEE;
border:1px solid #CCCCCC;
float:left;
font-size:11px;
padding:8px;
width:100px;
}
a.btnActions {
-moz-border-radius:4px 4px 4px 4px;
background:none repeat scroll 0 0 #CCCCCC;
color:#333333;
font-size:11px;
font-weight:bold;
margin-left:5px;
padding:3px 5px;
}
.clear {
overflow:hidden;
width:100%;
}
a.buttontema.suscribirme, a.buttontema.desuscribirme {
float:none;
}
a.buttontema {
background:url("../btnComu.png") no-repeat scroll right top transparent;
color:#444444;
display:block;
float:left;
font:12px arial,sans-serif;
height:25px;
padding-right:18px;
text-decoration:none;
}
a.buttontema:active, a.buttontema.blue:active {
background:url("../btnComu.png") no-repeat scroll right -26px transparent;
color:#FFFFFF;
}
a.buttontema:active span, a.buttontema.blue:active span {
background:url("../btnComu.png") no-repeat scroll left -26px transparent;
}
a.buttontema span {
background:url("../btnComu.png") no-repeat scroll 0 0 transparent;
display:block;
font-weight:bold;
line-height:21px;
padding:1px 0 4px 18px;
}
a.buttontema.yellow {
background:url("../btnComu.png") no-repeat scroll right -80px transparent;
color:#994800;
height:31px;
text-align:center;
width:91%;
}
a.buttontema.yellow span {
background:url("../btnComu.png") no-repeat scroll left -80px transparent;
padding:5px 0 5px 18px;
text-shadow:0 1px 0 #FFFFFF;
}
a.buttontema.blue, a.buttontema.suscribirme {
background:url("../btnComu.png") no-repeat scroll right -52px transparent;
color:#051F45;
margin-top:8px;
text-align:center;
text-shadow:0 1px 0 #8BBBF1;
}
a.buttontema.blue span, a.buttontema.suscribirme span {
background:url("../btnComu.png") no-repeat scroll left -52px transparent;
}
.searchBtn {
background:url("../btnComu.png") no-repeat scroll right -112px transparent;
border:medium none;
color:#FFFFFF;
float:left;
font-weight:bold;
}
.searchBtn a {
color:#004051;
display:block;
font-size:13px;
padding:8px 15px;
text-shadow:0 1px 0 #82D4F2;
}
.searchBtn a:hover {
color:#00617B;
text-decoration:none;
}
#buscador.alone {
margin:50px auto;
}
#buscador {
margin:0 auto 15px;
text-align:center;
width:480px;
}
#buscador h2 {
color:#FF6600;
font-size:16px;
}
#buscador .boxSearch {
margin:0 auto 15px;
text-align:center;
}
#buscador img, #buscador input {
vertical-align:middle;
}
.searchBar {
-moz-border-radius-bottomleft:3px;
-moz-border-radius-topleft:3px;
border:1px solid #AFAFAF;
float:left;
height:21px;
padding:7px 0 0 7px;
width:406px;
}
#buscador div.filterBy ul {
float:none;
margin:0 auto;
width:190px;
}
.xResults {
font-size:14px;
line-height:23px;
}
.xResults strong {
color:#004A95;
}
#resultados #showResult {
}
#showResult ul li.resultBox {
float:left;
height:125px;
margin:5px;
width:48%;
}
#showResult ul li h4 {
margin:5px 0;
}
#showResult ul li h4 a {
color:#053E78;
font-size:14px;
}
#showResult .avatarBox {
background:url("../shadowAvaS.gif") no-repeat scroll left bottom transparent;
height:85px;
position:relative;
width:85px;
}
#showResult .avatarBox .riboon {
background:none repeat scroll 0 0 transparent;
border:medium none;
display:none;
position:absolute;
}
#showResult .resultBox.oficial .avatarBox .riboon {
display:block;
left:-9px;
top:30px;
}
#showResult .infoBox {
width:230px;
}
#centro #showResult .infoBox {
width:145px;
}
#showResult .infoBox span {
border-top:1px solid #CCCCCC;
display:block;
padding:5px;
}
#showResult ul li img {
background:none repeat scroll 0 0 #FFFFFF;
border:1px solid #CCCCCC;
float:left;
padding:2px;
}
#showResult ul li ul {
color:#222222;
float:left;
margin-left:5px;
margin-right:15px;
width:100%;
}
#showResult ul li ul li {
border-top:1px solid #CCCCCC;
padding:3px 4px;
width:100%;
}
#showResult ul li ul strong {
color:#000000;
}
#resultados {
float:left;
width:100%;
}
#resultados .filterBy, #resultados .paginatorBar {
width:750px;
}
.betaMsg {
background:none repeat scroll 0 0 #FFFFCC;
border-bottom:1px solid #D0D00D;
margin-bottom:10px;
padding:8px;
text-align:center;
}
.commentBoxM {
margin-top:5px;
}
#monitor .hTitleM {
-moz-border-radius-topleft:5px;
-moz-border-radius-topright:5px;
background-color:#C3C3C3;
border-bottom:1px solid #999999;
margin:0;
}
.hTitleM .postTitleM {
color:#444444;
float:left;
font-size:13px;
font-weight:bold;
}
.hTitleM span.pointsPost {
color:#333333;
display:block;
float:right;
font-weight:bold;
margin-right:5px;
}
.commentBoxM .monitor_comentario {
background:none repeat scroll 0 0 #EEEEEE;
border-bottom:1px dashed #CCCCCC;
padding:3px 8px;
}
.commentBoxM .monitor_comentario span {
color:#666666;
}
.commentBoxM .monitor_comentario a {
color:#FF6600;
font-weight:bold;
}
.commentBoxM .mDate {
color:gray;
font-size:10px;
font-weight:normal;
vertical-align:middle;
}
ul.points_user {
background:none repeat scroll 0 0 #EEEEEE;
}
ul.points_user li {
border-bottom:1px dashed #CCCCCC;
font-size:13px;
font-weight:bold;
padding:5px;
}
ul.points_user li a {
font-size:11px;
vertical-align:middle;
}
ul.points_user li span.mBtn {
float:right;
width:auto;
}
.userIcons {
margin-top:5px;
}
.userIcons li {
float:left;
margin-right:5px;
}
.systemicons {
background-image:url("../big2v1.png");
background-repeat:no-repeat;
display:block;
height:16px;
width:16px;
}
.systemicons.rango0 {
background-position:0 -110px;
}
.systemicons.rango5 {
background-position:0 -110px;
}
.systemicons.rango10 {
background-position:0 -110px;
}
.systemicons.rango11 {
background-position:0 -110px;
}
.systemicons.rango12 {
background-position:0 -110px;
}
.systemicons.rango13 {
background-position:0 -110px;
}
.systemicons.rango14 {
background-position:0 -110px;
}
.systemicons.rango50 {
background-position:0 -110px;
}
.systemicons.rango100 {
background-position:0 -110px;
}
.systemicons.sexoM {
background-position:-2px -132px;
}
.systemicons.sexoF {
background-position:0 -153px;
}
.systemicons.mensaje {
background-position:0 -221px;
float:left;
}
.systemicons.historyMod {
background-position:0 -1252px;
}
.systemicons.micuenta {
background-position:0 -874px;
}
.systemicons.favoritos {
background-position:0 -946px;
}
.systemicons.monitor {
background-position:0 -929px;
}
.systemicons.actualizar {
background-position:0 -1000px;
}
.systemicons.logout {
background-position:0 -964px;
}
.systemicons.logout:hover {
background-position:0 -982px;
}
.systemicons.sRss {
background-position:0 -1018px;
}
.systemicons.fecha {
background-position:0 -1275px;
}
.systemicons.respuestas {
background-position:0 -1298px;
}
.systemicons.cerrada {
background-position:0 -1326px;
display:inline;
height:auto;
padding-left:12px;
width:auto;
}
.notificaciones-list .tipsy-inner {
background-color:#FFFFCC;
}
.tipsy {
background-repeat:no-repeat;
font-size:10px;
padding:3px 3px 5px;
}
.tipsy-inner {
-moz-border-radius:3px 3px 3px 3px;
background:url("../tipsy.png") repeat-x scroll 0 0 #000000;
border:1px solid #000000;
color:white;
font-weight:bold;
max-width:200px;
padding:4px 5px;
text-align:center;
text-shadow:0 1px 1px #000000;
}
.tipsy-north {
background-image:url("../tipsy-north.gif");
background-position:center top;
}
.tipsy-south {
background-image:url("../tipsy-south-n.png");
background-position:center bottom;
}
.tipsy-east {
background-image:url("../tipsy-east.gif");
background-position:right center;
}
.tipsy-west {
background-image:url("../tipsy-west.gif");
background-position:left center;
}
.paginadorCom {
-moz-border-radius:5px 5px 5px 5px;
background:none repeat scroll 0 0 #F7F7F7;
float:right;
margin:10px 0;
padding:5px;
width:750px;
}
.paginadorCom ul {
padding:2px;
text-align:center;
}
.paginadorCom ul li.numbers {
font-weight:bold;
padding:0;
}
.paginadorCom ul li.numbers a {
color:#000000;
padding:2px 5px;
text-decoration:underline;
}
.paginadorCom ul li.numbers a.here {
background:none repeat scroll 0 0 #0067CD;
color:#FFFFFF;
text-decoration:none;
}
.paginadorCom ul li.numbers a:hover {
background:none repeat scroll 0 0 #CCCCCC;
color:#0067CD;
}
.paginadorCom ul li {
background:none repeat scroll 0 0 transparent;
border:medium none;
display:inline;
font-size:13px;
margin-right:5px;
padding:3px 0;
}
.paginadorCom ul li a {
color:black;
padding:0;
}
a.pagiLink {
-moz-border-radius:3px 3px 3px 3px;
background:none repeat scroll 0 0 #383838;
color:#FFFFFF;
display:block;
font-weight:bold;
padding:5px 10px;
}
.linksList {
border-spacing:0;
width:100%;
}
.linksList thead {
background:none repeat scroll 0 0 #F3F3F3;
}
.linksList thead a {
-moz-border-radius:3px 3px 3px 3px;
background:none repeat scroll 0 0 #999999 !important;
color:#FFFFFF;
padding:5px 10px;
}
.linksList thead a.here {
-moz-border-radius:3px 3px 3px 3px;
background:none repeat scroll 0 0 #34569D !important;
border-bottom:1px solid #FFFFFF;
color:#FFFFFF !important;
cursor:pointer;
display:block;
font-weight:bold;
padding:5px 10px;
}
.linksList thead a.here:hover {
cursor:default;
text-decoration:none;
}
.linksList thead a:hover {
-moz-border-radius:3px 3px 3px 3px;
background:none repeat scroll 0 0 #002561;
color:#FFFFFF;
padding:5px 10px;
}
.linksList thead th strong {
color:#004A95;
}
.linksList thead th {
border:medium none;
color:#383838;
font-size:13px;
padding:8px;
text-align:center;
}
.linksList tbody tr:hover {
background:none repeat scroll 0 0 #EEEEEE;
}
.linksList tbody td {
border-bottom:1px dashed #CCCCCC;
color:#666666;
padding:5px;
text-align:center;
}
.linksList .categoriaPost {
display:block;
height:20px;
margin-left:-5px;
padding:0;
width:21px;
}
.linksList .categoriaPost:hover {
background-color:transparent;
}
.linksList span {
color:#666666;
}
.linksList .titlePost {
color:#007394;
font-size:13px;
font-weight:bold;
}
.categoriaList ul {
padding-bottom:10px;
}
.estadisticasList ul {
font-family:Helvetica,Arial;
}
.estadisticasList ul li a span.number {
color:#000000;
display:block;
font-weight:bold;
margin-right:10px;
}
.estadisticasList ul li {
}
.estadisticasList ul li a {
color:#8D8D8D;
display:block;
}
.estadisticasList ul li a:hover {
color:#000000 !important;
text-decoration:none;
}
.estadisticasList ul li:hover {
background:none repeat scroll 0 0 #FCFCFC;
}
.categoriaList li {
font-size:12px;
line-height:16px;
padding:2px 0 2px 8px;
position:relative;
}
.column {
margin:0 5px;
width:55px;
}
.columnBig {
margin:0 5px;
width:100px;
}
.answerOptions {
background:none repeat scroll 0 0 #EEEEEE;
color:#666666;
font-size:11px;
height:20px;
padding:3px;
}
.comment-info .answerOptions {
background:none repeat scroll 0 0 transparent;
color:#666666;
height:14px;
padding:0;
}
.comment-content .answerOptions ul li {
padding:0 5px 0 10px;
}
.answerOptions .metaDataA {
margin-left:4px;
}
.answerOptions ul li {
background:url("../d-opt.gif") no-repeat scroll 0 7px transparent;
display:block;
float:left;
padding:0 5px 0 10px;
}
.answerOptions ul li.answerCitar {
background:none repeat scroll 0 0 transparent;
}
.answerOptions ul li.deleteAnswer a img {
margin:2px;
}
.answerOptions .systemicons {
margin-top:1px;
}
.citarAnswer {
display:block;
height:16px;
width:16px;
}
.relevancia {
background:url("../relevanciabg.gif") no-repeat scroll left top transparent;
height:14px;
margin:0 auto;
width:68px;
}
.porcentajeRel {
background:url("../relevanciaBars.gif") no-repeat scroll left top transparent;
height:14px;
}
.paginadorBuscador {
-moz-border-radius:5px 5px 5px 5px;
background:none repeat scroll 0 0 #F7F7F7;
float:right;
margin-top:10px;
padding:5px;
position:relative;
width:930px;
}
.paginadorBuscador .pagesCant {
width:100%;
}
.paginadorBuscador ul {
padding:4px;
text-align:center;
}
.paginadorBuscador ul li.numbers {
font-weight:bold;
padding:0;
}
.paginadorBuscador ul li.numbers a {
color:#000000;
padding:2px 5px;
text-decoration:underline;
}
.paginadorBuscador ul li.numbers a.here {
background:none repeat scroll 0 0 #0067CD;
color:#FFFFFF;
text-decoration:none;
}
.paginadorBuscador ul li.numbers a:hover {
background:none repeat scroll 0 0 #CCCCCC;
color:#0067CD;
}
.paginadorBuscador ul li {
background:none repeat scroll 0 0 transparent;
border:medium none;
display:inline;
font-size:13px;
margin-right:5px;
padding:3px 0;
}
.paginadorBuscador ul li a {
color:black;
padding:0;
}
.paginadorBuscador .next a, .paginadorBuscador .before a {
-moz-border-radius:3px 3px 3px 3px;
background:none repeat scroll 0 0 #383838;
color:#FFFFFF;
display:block;
font-weight:bold;
padding:5px 10px;
}
.paginadorBuscador .next, .paginadorBuscador .before {
position:absolute;
top:5px;
}
.paginadorBuscador .next {
right:5px;
}
.paginadorBuscador .before {
left:5px;
}
.searchFil {
color:#666666;
}
.searchWith {
color:#000000;
float:left;
font-size:13px;
font-weight:bold;
}
.searchWith a {
color:#004A95 !important;
}
.searchWith a.here {
color:#000000 !important;
}
span.sep {
color:#EEEEEE;
font-weight:normal;
margin:0 5px;
}
.searchTabs {
bottom:-1px;
margin-bottom:-1px;
position:relative;
}
.searchTabs li {
background:none repeat scroll 0 0 #EEEEEE;
border:1px solid #CCCCCC;
float:left;
font-size:13px;
font-weight:bold;
margin-right:5px;
position:relative;
z-index:10;
}
.searchTabs li a {
color:#004A95;
display:block;
padding:5px 15px;
}
.searchTabs li.here a {
color:#000000;
display:block;
padding:5px 15px;
}
.searchTabs li:hover {
background:none repeat scroll 0 0 #CCCCCC;
}
.searchTabs li.here {
background:none repeat scroll 0 0 white;
border-bottom:1px solid #FFFFFF;
}
.searchTabs li.clearfix {
background:none repeat scroll 0 0 transparent;
border:medium none;
margin:0;
padding:0;
}
#buscadorBig {
margin:45px auto;
position:relative;
width:555px;
}
.searchCont {
-moz-border-radius-bottomleft:5px;
-moz-border-radius-bottomright:5px;
-moz-border-radius-topright:5px;
background:url("../gradientSearch.gif") repeat-x scroll left bottom transparent;
border:1px solid #CCCCCC;
clear:both;
margin-top:-1px;
padding:12px;
}
.logoMotorSearch {
float:right;
}
.searchBar {
-moz-border-radius:3px 3px 3px 3px;
font-size:18px;
margin-right:10px;
padding:7px 0 8px 7px;
}
.boxBox {
-moz-border-radius:5px 5px 5px 5px;
background:none repeat scroll 0 0 #E1E1E1;
}
#buscadorLite .boxBox {
}
.inputTxt {
-moz-border-radius:5px 5px 5px 5px;
background:none repeat scroll 0 0 #FFFFFF;
border:2px solid #E1E1E1;
width:100px;
}
.filterSearch {
-moz-border-radius-bottomleft:5px;
-moz-border-radius-bottomright:5px;
border-top:1px dashed #CCCCCC;
padding:8px;
}
.filterSearch strong {
color:#000000;
display:block;
float:left;
margin:2px 20px 2px 0;
}
.searchEngine {
padding:8px;
}
.searchEngine .mBtn {
font-size:17px;
padding:6px 10px;
}
.whereSearch {
border-right:1px solid #CCCCCC;
float:left;
padding-right:20px;
}
.byCatSearch {
border-left:1px solid #FFFFFF;
float:left;
padding-left:20px;
}
.byCatSearch label {
}
.byCatSearch select {
height:20px;
margin-top:2px;
width:200px;
}
#buscadorLite {
margin-bottom:15px;
}
#buscadorLite .searchEngine {
float:left;
}
#buscadorLite .filterSearch {
border:medium none;
float:left;
}
#buscadorLite .filterSearch strong {
margin:0 15px 0 0;
}
#buscadorLite .searchTabs li {
font-size:12px;
}
#buscadorLite .searchWith {
float:left;
}
.clearfix:after {
clear:both;
content:" ";
display:block;
font-size:0;
height:0;
visibility:hidden;
}
* html .clearfix {
height:1%;
}
:first-child + html .clearfix {
}
.post-deleted .categoriaPost a, .post-denunciado .categoriaPost a {
color:#007394;
font-size:14px;
font-weight:bold;
}
.post-deleted h4, .post-denunciado h4 {
color:#FF6600;
font-size:16px;
margin-bottom:5px;
margin-top:0;
}
.post-deleted h3, .post-denunciado h3 {
color:#CE0101;
font-size:18px;
margin:0 0 5px;
}
.post-deleted, .post-denunciado {
margin:25px;
min-height:325px;
}
.post-privado {
background:url("../private-post.gif") no-repeat scroll right bottom transparent !important;
}
.post-denunciado {
background:url("../denunciado_post.gif") no-repeat scroll right bottom transparent;
}
.post-deleted {
background:url("../deleted-post.gif") no-repeat scroll right bottom transparent;
}
.post-deleted ul, .post-denunciado ul {
width:480px;
}
#post-centro .box_cuerpo a:visited {
color:#551A8B !important;
font-weight:bold;
}
.post-privado #RegistroForm input {
padding:5px;
width:270px !important;
}
.post-privado .form-line {
margin-bottom:10px;
}
.post-privado #RegistroForm .pasoDos input {
padding:0;
width:auto !important;
}
.post-privado #login-registro-logueo .mBtn {
display:block;
margin-bottom:10px;
}
.post-privado #login-registro-logueo .ilogin {
margin:0;
}
.post-privado #buttons {
margin-top:10px;
}
.avatarBox {
height:120px;
margin:0 auto 10px;
overflow:hidden;
width:120px;
}
.metadata-usuario {
color:#000000;
font-weight:bold;
text-transform:uppercase;
}
.metadata-usuario .nData {
color:#FF6600;
display:block;
font-size:15px;
margin-top:8px;
}
.post-autor .box_cuerpo {
overflow:hidden;
}
.post-autor a .given-name {
color:#004A95;
font-size:14px;
font-weight:bold;
}
.post-autor .rango {
color:#666666;
}
.post-title .icons.anterior {
display:block;
height:16px;
left:8px;
padding:0;
position:absolute;
top:9px;
width:16px;
}
.post-title .icons.siguiente {
display:block;
height:16px;
padding:0;
position:absolute;
right:8px;
top:9px;
width:16px;
}
.comentarios-title .paginadorCom .before, .comentarios-title .paginadorCom .next {
display:block;
margin:0;
padding:0;
}
.comentarios-title .paginadorCom .desactivado {
background:none repeat scroll 0 0 #EEEEEE !important;
color:#FFFFFF !important;
}
.comentarios-title .paginadorCom .desactivado:hover {
text-decoration:none;
}
.comentarios-title .paginadorCom .before a, .comentarios-title .paginadorCom .next a {
background:url("../bg_before_next.gif") repeat-x scroll left bottom #D2D2D2;
color:#383838;
font-size:13px;
padding:12px 20px;
text-shadow:0 1px 0 #FFFFFF;
}
.title-tags {
font-size:14px;
font-weight:bold;
}
.post-relacionados h4 {
font-size:14px;
margin:8px;
}
.post-relacionados ul {
margin:0 10px 10px;
overflow:hidden;
}
.post-relacionados ul li.categoriaPost {
margin-bottom:0;
}
.post-relacionados ul li.categoriaPost a {
height:16px;
overflow:hidden;
}
#izqueirda .box_cuerpo li.categoriaPost a {
overflow:hidden;
width:335px;
}
.post-relacionados ul li.categoriaPost:hover {
}
#post-comentarios {
float:right;
margin-top:15px;
overflow:hidden;
width:835px;
}
#post-comentarios .miComentario .answerInfo {
width:52px;
}
.miComentario .answerInfo img, .miRespuesta .answerInfo img {
background:none repeat scroll 0 0 #FFFFFF;
border:1px solid #CCCCCC;
padding:1px;
}
#post-comentarios .miComentario .answerTxt {
margin-left:5px;
width:768px !important;
}
#post-comentarios .paginadorCom {
float:none;
padding:0;
width:765px;
}
#post-comentarios .paginadorCom li {
display:inline-block;
}
#post-comentarios .paginadorCom .next a, #post-comentarios .paginadorCom .before a {
display:block;
}
#post-comentarios .paginadorCom ul {
padding:0;
}
#post-comentarios .paginadorCom ul li.numbers a {
color:#004A95;
display:block;
padding:12px 8px;
text-decoration:none;
}
#post-comentarios .paginadorCom ul li.numbers a.here {
background:none repeat scroll 0 0 #E3E3E3;
border-left:1px solid #C4CACF;
border-right:1px solid #C4CACF;
color:#000000;
text-shadow:0 1px 0 #E5E5E5;
}
#post-comentarios .paginadorCom .numbers {
font-size:16px;
}
#post-comentarios .comentarios-title {
margin-left:68px;
width:765px;
}
.comentario-post {
margin-bottom:10px;
}
.respuesta-post {
margin-bottom:10px;
}
.comentario-post .avatarspace {
float:left;
height:30px;
text-align:right;
width:160px !important;
}
.comentario-post .avatarspace a {
color:#004A95;
font-size:12px;
font-weight:bold;
}
.comentario-post .commenttext p {
font-size:12px;
line-height:20px;
margin:12px;
}
.comentario-post .commenttext {
-moz-border-radius:5px 5px 5px 5px;
background:none repeat scroll 0 0 #F7F7F7;
border:1px solid #CCCCCC;
float:right;
width:765px;
}
.banner-300 {
background:none repeat scroll 0 0 #EEEEEE;
float:right;
height:250px;
margin-right:4px;
width:300px;
}
.post-relacionados {
-moz-border-radius:5px 5px 5px 5px;
background:none repeat scroll 0 0 #EEEEEE;
border:1px solid #CFCFCF;
float:left;
margin:0;
width:438px;
}
.post-estadisticas .icons.puntos_post {
background-position:right -40px;
}
.post-estadisticas .icons.favoritos_post {
background-position:right -64px;
}
.post-estadisticas .icons.visitas_post {
background-position:right -87px;
}
.post-estadisticas .icons.monitor {
background-position:right -926px !important;
}
.btn_g .follow {
background-position:0 -1362px;
}
.btn_g .follow:hover {
color:#14AA03;
}
.spinner {
background-image:url("../spinner.gif");
background-position:0 0 !important;
background-repeat:no-repeat !important;
}
.avatar-box .spinner span {
background:url("../spinner.gif") no-repeat scroll right 0 transparent !important;
}
.avatar-box li.comprobando a {
color:#9F9F9F !important;
}
.btn_g .unfollow {
background-position:0 -1382px;
}
.btn_g {
-moz-border-radius:5px 5px 5px 5px;
background:url("../bg_g.gif") repeat-x scroll left bottom transparent !important;
border:1px solid #BABABA;
display:block;
font-size:11px;
font-weight:bold;
padding:5px 8px;
text-shadow:0 1px 0 #FFFFFF;
}
.btn_g span, .btn_g span:hover {
padding-left:22px;
text-decoration:none !important;
}
.btn_g:hover {
-moz-box-shadow:0 0 2px rgba(0, 0, 0, 0.3);
text-decoration:none;
}
.btn_g:active {
background:url("../bg_g.gif") repeat-x scroll left top #CBCBCB !important;
}
.comunidades #izquierda .btn_g {
margin-top:10px;
}
.postBy .btn_g {
margin-top:5px;
}
.post-acciones {
}
.post-estadisticas .icons {
padding-right:20px;
}
.post-metadata hr {
margin:5px 0;
padding:0;
}
.tags-block {
float:left;
width:485px;
}
.tags-block span.tags_title {
background-position:left -1343px;
color:#333333;
display:block;
font-size:13px;
font-weight:bold;
margin-bottom:3px;
padding-left:22px;
}
.tags-block a {
color:#004A95;
font-size:11px;
font-weight:bold;
}
.post-cat-date {
float:right;
font-size:13px;
line-height:1.8em;
text-align:right;
width:250px;
}
.post-estadisticas li span {
color:#000000;
font-size:13px;
}
.post-acciones {
color:#383838;
float:left;
font-size:12px;
}
.dar-puntos {
color:#999999;
font-weight:normal;
margin:5px;
text-align:center;
}
.dar-puntos span {
color:#000000;
font-size:12px;
font-weight:bold;
}
.dar-puntos a {
color:#005ACB;
font-size:12px;
font-weight:bold;
}
.post-acciones ul {
font-weight:bold;
}
.post-estadisticas {
color:#666666;
float:right;
font-size:14px;
font-weight:bold;
text-align:right;
text-shadow:0 1px 0 #F6F6F6;
text-transform:uppercase;
}
.post-estadisticas li {
float:right;
font-size:11px;
margin-left:10px;
}
.post-acciones li {
float:left;
margin-right:5px;
}
.post-metadata {
background:url("../bg_meta.gif") repeat-x scroll left top #E6E6E6;
width:100%;
}
.post-wrapper .post-autor {
float:left;
height:auto;
overflow:visible;
padding:2px;
width:160px;
}
.post-contenedor {
-moz-border-radius:5px 5px 5px 5px;
background:none repeat scroll 0 0 #EEEEEE;
border:1px solid #CFCFCF;
float:left;
margin-bottom:10px;
margin-left:10px;
overflow:hidden;
position:relative;
width:760px;
}
.post-title {
background:none repeat scroll 0 0 #CCCCCC;
border-bottom:1px solid #CCCCCC;
padding:10px 0;
text-align:center;
}
.post-title h1 {
color:#333333;
font-size:14px;
font-weight:bold;
margin:0;
text-shadow:0 1px 0 #F5F5F5;
}
.post-contenido {
border-top:1px solid #F6F6F6;
font-size:13px;
line-height:1.5em;
overflow:hidden;
padding:12px;
}
#post-comentarios #body_comm {
margin-bottom:10px;
}
#post-comentarios .buttons *, #post-comentarios .buttons {
}
#post-comentarios .commenttext {
font-size:13px;
}
.post-metadata .mensajes.ok {
background:none repeat scroll 0 0 #C4E19B;
color:#333333;
font-weight:bold;
margin-bottom:10px;
padding:10px;
text-align:center;
}
.post-metadata .mensajes.error {
background:none repeat scroll 0 0 #FFFFCC;
color:#333333;
font-weight:bold;
margin-bottom:10px;
padding:10px;
text-align:center;
}
.post-compartir {
margin-top:5px;
}
.post-compartir li {
display:inline;
}
.cuerpo_comm {
margin:0 !important;
overflow:hidden;
padding:3px 10px 10px;
}
.moderacion_del_post {
-moz-box-shadow:0 -5px 5px rgba(0, 0, 0, 0.2);
background:url("../bg_mods.gif") repeat-x scroll left top #171F2B;
bottom:0;
left:0;
position:fixed;
width:100%;
z-index:100;
}
.moderacion_del_post .gifCargando {
position:absolute;
right:15px;
top:11px;
}
.moderacion_del_post ul li {
display:inline-block;
list-style:none outside none;
padding:0 0 0 5px;
}
.moderacion_del_post ul li a {
color:#FFFFFF;
display:inline-block;
font-size:11px;
font-weight:bold;
padding:7px 10px 7px 20px;
text-decoration:none;
text-shadow:0 1px 1px #000000;
}
.moderacion_del_post ul li a {
color:#FFFFFF;
display:inline-block;
font-size:11px;
font-weight:bold;
padding:7px 10px 7px 20px;
text-decoration:none;
text-shadow:0 1px 1px #000000;
}
.moderacion_del_post ul li select {
-moz-appearance:none !important;
border:medium none;
color:#FFFFFF;
display:inline-block;
font-size:11px;
font-weight:bold;
max-width:120px;
padding:6px 10px 7px 20px;
text-decoration:none;
text-shadow:0 1px 1px #000000;
}
.moderacion_del_post ul li option {
background:none repeat scroll 0 0 #1B2332;
}
.moderacion_del_post ul li a:active, .moderacion_del_post ul li.push a {
color:#181E28;
text-shadow:0 1px 0 #778398;
}
.moderacion_del_post ul li span {
display:block;
}
.moderacion_del_post ul li {
background:url("../btn_bg.gif") no-repeat scroll left top transparent;
}
.moderacion_del_post ul li span {
background:url("../btn_border.gif") no-repeat scroll right top transparent;
}
.moderacion_del_post ul li.push {
background:url("../btn_bg_push.gif") no-repeat scroll left top transparent;
}
.moderacion_del_post ul li.push a {
background:url("../mod-icon.png") no-repeat scroll 0 7px transparent;
}
.moderacion_del_post ul li.push span {
background:url("../btn_border_push.gif") no-repeat scroll right top transparent;
}
.mod_container {
margin:0 auto;
width:960px;
}
.mod_container * {
outline:medium none;
}
.mod_container ul li.historial {
background:none repeat scroll 0 0 transparent;
}
.mod_container ul li.historial a {
padding:0;
}
.mod_container ul li.historial img {
vertical-align:middle;
}
.moderacion_del_post ul li a.sticky_mod {
background:url("../icons_mod.png") no-repeat scroll 0 -23px transparent;
}
.moderacion_del_post ul li.push a.sticky_mod {
background:url("../icons_mod.png") no-repeat scroll 0 7px transparent;
}
.moderacion_del_post ul li a.lock_mod {
background:url("../icons_mod.png") no-repeat scroll 0 -83px transparent;
}
.moderacion_del_post ul li.push a.lock_mod {
background:url("../icons_mod.png") no-repeat scroll 0 -53px transparent;
}
.moderacion_del_post ul li a.adsense_mod {
background:url("../icons_mod.png") no-repeat scroll 0 -141px transparent;
color:red !important;
}
.moderacion_del_post ul li.push a.adsense_mod {
background:url("../icons_mod.png") no-repeat scroll 0 -112px transparent;
color:#00FF18 !important;
text-shadow:0 1px 1px #000000;
}
.moderacion_del_post ul li a.edit_mod {
background:url("../icons_mod.png") no-repeat scroll 0 -256px transparent;
}
.moderacion_del_post ul li.push a.edit_mod {
background:url("../icons_mod.png") no-repeat scroll 0 -226px transparent;
}
.moderacion_del_post ul li a.trash_mod {
background:url("../icons_mod.png") no-repeat scroll 0 -201px transparent;
}
.moderacion_del_post ul li.push a.trash_mod {
background:url("../icons_mod.png") no-repeat scroll 0 -171px transparent;
}
.moderacion_del_post ul li select.categoria_mod {
background:url("../icons_mod.png") no-repeat scroll 0 -364px transparent;
}
.moderacion_del_post ul li.push a.categoria_mod {
background:url("../icons_mod.png") no-repeat scroll 0 -338px transparent;
}
.moderacion_del_post #descargas {
}
.moderacion_del_post ul#mod-acciones-pushed {
float:right;
margin:2px 0 0;
padding:0;
}
.moderacion_del_post ul#mod-acciones-click {
float:left;
margin:2px 0 0;
padding:0;
}
.uSuspendido {
color:red !important;
}
.especial1 .comment-box {
-moz-box-shadow:0 0 10px #7DBEF1;
border:1px solid #7DBEF1;
}
.especial2 .comment-box {
-moz-box-shadow:0 0 10px #FFCBCB;
border:1px solid #FF0000;
}
.comentario-post {
margin-bottom:10px;
}
.comentario-post:hover .avatar-32 {
-moz-box-shadow:0 3px 3px #CCCCCC;
border:1px solid #000000;
}
div.comentario-post .avatar-32 {
background:none repeat scroll 0 0 #FFFFFF;
border:1px solid #CCCCCC;
height:32px;
padding:1px;
position:relative;
width:32px;
z-index:1;
}
.avatar-box {
float:left;
position:relative;
}
.avatar-box img {
border:1px solid #CCCCCC;
padding:1px;
}
.avatar-box:hover {
cursor:pointer;
}
.avatar-box ul {
-moz-box-shadow:3px 3px 10px rgba(0, 0, 0, 0.2);
background:none repeat scroll 0 0 #E9E9E9;
border:1px solid #CCCCCC;
display:none;
left:0;
list-style:none outside none;
margin:0;
padding:0;
position:absolute;
top:51px;
width:160px;
z-index:150;
}
.avatar-box li a {
background:url("../comm_li_divide.gif") repeat-x scroll left top transparent;
color:#404040;
display:block;
font-size:11px;
padding:6px;
position:relative;
text-decoration:none;
text-shadow:0 1px 0 #FFFFFF;
z-index:300;
}
.avatar-box li a:hover {
background:url("../comm_li_hover.gif") repeat-x scroll left top #2A61E0;
color:#FFFFFF;
text-shadow:0 1px 0 #000000;
}
.avatar-box li a span {
background:url("../comm_sprite.png") no-repeat scroll 0 0 transparent;
display:block;
height:16px;
position:absolute;
right:5px;
top:5px;
width:16px;
}
.avatar-box li.seguir a span {
background-position:0 0;
}
.avatar-box li.enviar-mensaje a span {
background-position:0 -16px;
}
.avatar-box li.bloquear a span {
background-position:0 -33px;
}
.avatar-box li.moderar a span {
background-position:0 -49px;
}
.avatar-box li.seguir a:hover span {
background-position:0 -64px;
}
.avatar-box li.enviar-mensaje a:hover span {
background-position:0 -80px;
}
.avatar-box li.bloquear a:hover span {
background-position:0 -96px;
}
.avatar-box li.moderar a:hover span {
background-position:0 -114px;
}
.comment-box {
border:1px solid #B4B4B4;
float:left;
font-size:12px;
margin-left:15px;
position:relative;
width:765px;
}
.dialog-c {
background:url("../dialog_c.png") repeat scroll 0 0 transparent;
display:block;
height:15px;
left:-9px;
position:absolute;
top:5px;
width:9px;
}
.comment-content {
background:none repeat scroll 0 0 #EDEDED;
overflow:hidden;
padding:10px;
}
.comment-info {
background:url("../bg_title_comment.gif") repeat-x scroll left top transparent;
border-bottom:1px solid #B4B4B4;
font-size:11px;
height:14px;
overflow:hidden;
padding:6px;
}
.comment-info .floatL {
padding:6px;
}
.comment-info a {
font-weight:bold;
text-decoration:none;
}
.comment-info a.nick {
color:#004A95;
}
.pasoDos {
display:none;
}
.pasoDos select {
margin-bottom:5px;
width:120px;
}
#mask {
background:none repeat scroll 0 0 #111111;
opacity:0.6;
}
#mydialog #dialog {
-moz-box-shadow:0 0 25px #333333;
border:3px solid #B5AF9F;
display:none;
text-align:left;
z-index:101;
}
#mydialog #cuerpo {
background:none repeat scroll 0 0 #F4F1E9;
}
#mydialog #dialog #title {
background:url("../btnRainbow.gif") repeat-x scroll left top #2E8AF5;
border:1px solid #003A74;
color:#FFFFFF;
font-size:14px;
font-weight:bold;
padding:8px;
text-align:left;
text-shadow:0 1px 0 #003851;
}
.registro .disabled {
opacity:0.75;
}
#modalBody label {
display:block;
font-weight:bold;
margin-bottom:5px;
}
#modalBody input {
background:none repeat scroll 0 0 #FFFFFF;
border:1px solid #C4C2B9;
margin-bottom:10px;
padding:6px 4px;
}
#modalBody input.checkbox {
-moz-border-radius:0 0 0 0;
background:none repeat scroll 0 0 #FFFFFF;
border:medium none;
padding:0;
width:auto;
}
.registro #dialog {
width:375px !important;
}
.registro #modalBody {
padding:25px 35px 0;
text-align:left;
}
.registro #modalBody .footerReg {
font-size:11px;
margin:15px 0 5px;
}
.registro label {
display:block;
font-weight:bold;
margin:0 0 5px;
text-shadow:0 1px 0 #CCCCCC;
}
.registro label.list-label {
display:inline !important;
font-weight:normal !important;
text-shadow:none !important;
}
.registro select {
display:block;
margin-right:5px;
}
.registro input.checkbox {
margin:0 0 5px !important;
width:auto !important;
}
.registro .pasoUno select {
float:left;
}
.registro input {
width:290px !important;
}
.registro input.mBtn {
width:auto !important;
}
.registro input.radio {
width:auto !important;
}
#recaptcha_image img {
}
.close_dialog {
cursor:pointer;
position:absolute;
right:8px;
top:8px;
}
.ac_results {
background-color:white;
border:1px solid black;
overflow:hidden;
padding:0;
z-index:99999;
}
.ac_results ul {
list-style:none outside none;
margin:0;
padding:0;
width:100%;
}
.ac_results li {
cursor:default;
display:block;
font:menu;
font-size:12px;
line-height:16px;
margin:0;
overflow:hidden;
padding:2px 5px;
}
.ac_loading {
background:url("../cargando.gif") no-repeat scroll right center white;
}
.ac_odd {
background-color:#EEEEEE;
}
.ac_over {
background-color:#0A246A;
color:white;
}
.kodak-yt {
-moz-box-shadow:0 0 15px #666666;
background:none repeat scroll 0 0 #000000;
border:3px solid #F2B41B;
font-family:Helvetica,Arial;
margin:30px auto 0;
overflow:hidden;
text-align:center;
width:640px;
}
.kodak-banner a {
background:url("../kodak_bg.gif") no-repeat scroll 5px 2px transparent;
color:#F2B41B !important;
display:block;
font-size:14px;
padding:5px;
text-align:right;
text-decoration:none;
}
.kodak-banner a:visited {
color:#F2B41B !important;
}
.comunidades .kodak-yt {
width:600px;
}
.pag-vid {
width:930px !important;
}
.pag-vid .before a, .pag-vid .next a {
display:block !important;
}
* html .clearbeta {
height:1%;
overflow:visible;
}
* + html .clearbeta {
min-height:1%;
}
.clearbeta:after {
clear:both;
content:".";
display:block;
font-size:0;
height:0;
visibility:hidden;
}
.changec {
font-size:11px;
font-weight:normal;
position:absolute;
right:9px;
top:9px;
}
.clima-h-city {
border-bottom:1px solid #CCCCCC;
padding:2px 0 7px 2px;
}
.clima-h-data {
border-top:1px solid #FFFFFF;
cursor:pointer;
padding-top:5px;
position:relative;
}
.climaH-ext {
margin-top:5px;
}
.climaH-ext li {
background:none repeat scroll 0 0 #E1E1E1;
border-top:1px dashed #B9B9B9;
overflow:hidden;
padding:3px 8px;
}
.climaHome {
-moz-border-radius:5px 5px 5px 5px;
background:url("../bg_clim_h.gif") repeat-x scroll left bottom #F5F5F5;
border:1px solid #B2B2B2;
color:#000000;
font-size:12px;
font-weight:bold;
margin-bottom:12px;
padding:6px;
position:relative;
}
.expand {
background:url("../min_expand.png") no-repeat scroll right top transparent;
display:block;
height:8px;
position:absolute;
right:5px;
top:8px;
width:11px;
}
.climaHome strong {
color:#007394;
}
.climaHome img {
vertical-align:middle;
}
#clima {
background:none repeat scroll 0 0 #DCF4F6;
font-family:Helvetica,Arial;
padding:10px;
width:940px;
}
#clima h1 {
color:#09474F;
font-size:24px;
font-weight:bold;
line-height:30px;
margin:0;
padding:0 0 10px;
}
#clima h2 {
color:#09474F;
font-size:16px;
}
#clima .content {
float:left;
width:620px;
}
#clima .sidebar {
float:right;
width:300px;
}
#clima .hoy-clima {
-moz-border-radius-topleft:5px;
-moz-border-radius-topright:5px;
background:none repeat scroll 0 0 #FFFFFF;
border-bottom:1px solid #EEEEEE;
padding:12px;
}
.clima-dia {
background:url("../bg_clima_box.gif") repeat-x scroll left bottom #FFFFFF;
padding:12px 0;
width:100%;
}
.clima-dia:hover {
cursor:pointer;
}
.clima-dia .clima-fecha {
float:left;
font-size:13px;
text-align:center;
width:75px;
}
.clima-dia .clima-fecha strong {
display:block;
font-size:20px;
font-weight:bold;
margin-top:5px;
}
.clima-dia .clima-temp {
float:left;
font-weight:bold;
width:545px;
}
.clima-dia .clima-info {
color:#666666;
float:left;
font-size:24px;
}
.clima-dia .clima-maxmin {
float:right;
font-size:18px;
margin:10px 10px 0 0;
}
.thumb-clima {
vertical-align:middle;
}
.max-temp strong {
color:#F40000;
}
.min-temp strong {
color:#007ADE;
}
.hoy-clima .thumb-clima {
float:left;
}
.hoy-clima ul.data {
color:#666666;
float:left;
font-size:26px;
font-weight:bold;
line-height:50px;
margin:5px 0 0 15px;
}
.hoy-clima ul.data strong {
color:#000000;
font-size:60px;
}
.hoy-clima ul.more-data {
color:#666666;
float:right;
font-size:11px;
line-height:15px;
text-align:right;
}
.clima-dia-hora {
background:url("../bg_clima_box.gif") repeat-x scroll left bottom #FFFFFF;
}
.clima-dia-hora .clima-dia-detalle {
float:left;
margin-right:3px;
padding:10px 0;
text-align:center;
width:12%;
}
.clima-dia-hora .clima-dia-detalle img {
margin:0 5px 5px;
}
.clima-dia-hora .clima-dia-detalle .temp-hora {
font-size:18px;
font-weight:bold;
}
.clima-dia-hora .clima-pasado {
opacity:0.5;
}
.min-max-temp {
color:#000000;
font-size:14px;
font-weight:bold;
}
.cont-box {
background:url("../bg_clima_box.gif") repeat-x scroll left bottom #FFFFFF;
padding:12px 0;
width:100%;
}
.box-clima {
background:none repeat scroll 0 0 #FFFFFF;
margin-top:15px;
}
.cont-box img.thumb-clima {
float:left;
margin:8px 5px;
}
.cont-box ul {
float:left;
margin:5px;
}
.title-box {
color:#09474F;
font-size:14px;
font-weight:bold;
padding:12px;
width:auto !important;
}
.geo-clima {
background:none repeat scroll 0 0 #FFFFFF;
}
.geo-clima .cont-box {
padding:12px;
width:auto;
}
.geo-clima .cont-box p.checked {
-moz-background-inline-policy:continuous;
-moz-box-shadow:0 1px 1px rgba(0, 0, 0, 0.4) inset, 0 1px rgba(255, 255, 255, 0.4);
background:none repeat scroll 0 0 rgba(0, 0, 0, 0.37);
color:#FFFFFF;
text-shadow:0 1px rgba(0, 0, 0, 0.5);
}
.geo-clima .cont-box p:active {
-moz-background-inline-policy:continuous;
-moz-box-shadow:0 1px 1px rgba(0, 0, 0, 0.4) inset, 0 1px rgba(255, 255, 255, 0.4);
background:none repeat scroll 0 0 rgba(0, 0, 0, 0.5);
color:#FFFFFF;
text-shadow:0 1px rgba(0, 0, 0, 0.5);
}
.geo-clima .cont-box p {
-moz-border-radius:100% 100% 100% 100%;
color:#000000;
cursor:pointer;
float:left;
font:bold 12px/13px "Lucida Grande",sans-serif;
margin:0 3px;
padding:2px 10px;
text-shadow:0 1px rgba(225, 225, 225, 0.9);
}
.geo-clima-location {
padding:15px;
}
.geo-clima-location p {
color:#000000;
font-size:13px;
line-height:13px;
margin:0 0 10px;
}
.geo-clima-location ul {
float:left;
font-weight:bold;
line-height:20px;
}
.geo-clima-location ul li {
display:block;
float:left;
font-size:13px;
list-style:disc outside none;
margin:0 5px;
width:185px;
}
.help {
color:#FFFFFF;
display:none;
font-family:'Lucida Grande';
font-size:12px;
left:300px;
position:absolute;
text-shadow:0 1px 1px #000000;
top:10px;
width:350px;
}
.help em, .help span {
background-image:url("../bg_feedback.png");
}
.help span {
background-repeat:no-repeat;
float:left;
height:45px;
padding-right:13px;
}
.help em {
display:block;
font-weight:bold;
height:20px;
padding:14px 10px 12px 40px;
}
.help.info span em {
background-position:left top;
}
.help.info span {
background-position:right top;
}
.help.error span em {
background-position:left -90px;
}
.help.error span {
background-position:right -90px;
}
.help.loading span em {
background-position:left -135px;
}
.help.loading span {
background-position:right -135px;
}
.help.ok span em {
background-position:left -45px;
}
.help.ok span {
background-position:right -45px;
}
.form-line {
position:relative;
}
#clima_loading {
background:url("../loading_white.gif") repeat scroll 0 0 transparent;
display:none;
float:right;
height:16px;
width:16px;
}
.directorio-c h1 {
color:#000000;
font-size:26px;
font-weight:bold;
margin:0;
padding:10px 0 20px;
}
.directorio-c a {
color:#004A95;
}
.directorio-c h3 {
color:#FF6600;
font-weight:normal;
margin:10px 0 5px;
}
.directorio-c h3 a {
border-bottom:1px dotted;
font-size:16px;
font-weight:bold;
}
.directorio-c h3 a:hover {
text-decoration:none;
}
.directorio-c .location-box {
background:none repeat scroll 0 0 #F6F6F6;
font-size:13px;
padding:12px;
width:176px;
}
.directorio-c .location-box h2 {
border-bottom:1px dashed #CCCCCC;
font-size:13px;
font-weight:normal;
margin:0 0 10px;
padding-bottom:5px;
}
.directorio-c .location-box ul li {
font-weight:bold;
padding:5px 0;
}
.directorio-c .location-box ul {
height:170px;
overflow:hidden;
}
.directorio-c .content-box {
width:730px;
}
.directorio-c .location-box ul li span {
color:#00A953;
float:right;
}
.directorio-c .location-box ul .first-child span {
color:#000000;
}
.directorio-c .location-box ul .first-child a {
color:#000000;
}
.directorio-c .search-c {
background:none repeat scroll 0 0 #F6F6F6;
float:left;
margin-bottom:15px;
padding:10px;
width:920px;
}
.directorio-c .box-search {
margin:0 auto;
width:450px;
}
.directorio-c .breadcrump {
margin-bottom:15px;
}
.lst {
color:#000000;
float:left;
font-size:16px;
font-weight:bold;
width:330px;
}
.lst.value {
color:#999999;
font-weight:normal;
}
.lsb {
background:url("../bg_search_blue.gif") repeat-x scroll left top #113EDF;
border:1px solid #012EB4;
color:#FFFFFF;
float:left;
font-size:14px;
font-weight:bold;
padding:4px 5px 5px;
width:110px;
}
.list-com-dir {
border-bottom:1px dotted #CCCCCC;
margin-bottom:10px;
width:100%;
}
.list-com-dir img {
border:1px solid #CCCCCC;
float:left;
height:42px;
margin-right:10px;
padding:1px;
width:42px;
}
.list-com-dir h3 {
font-size:12px;
margin:0 0 5px;
}
.list-com-dir h3 a {
font-size:14px;
}
.list-com-dir p {
color:#888888;
margin:5px 0;
}
.data-list-com {
float:left;
width:660px;
}
.dir-pag {
background:none repeat scroll 0 0 #EEEEEE;
font-size:14px;
padding:10px;
}
.location-box-more {
background:none repeat scroll 0 0 #EEEEEE;
cursor:pointer;
display:block;
font-size:12px;
margin-top:10px;
padding:5px;
text-align:center;
}
.tabbed-d ul.menu-tab {
float:left;
position:relative;
width:676px;
z-index:10;
}
.tabbed-d ul.menu-tab li {
display:block;
float:left;
margin-bottom:-1px;
padding:8px 18px;
}
.tabbed-d ul.menu-tab li:hover {
background:none repeat scroll 0 0 #E4E3E3;
}
.tabbed-d ul.menu-tab li.active {
background:none repeat scroll 0 0 #EEEEEE;
border-color:#CCCCCC #CCCCCC #EEEEEE;
border-style:solid;
border-width:1px;
}
.tabbed-d ul.menu-tab li.active a {
border-bottom:medium none;
color:#000000;
}
.tabbed-d ul.menu-tab li a {
border-bottom:1px dotted;
color:#0A3C6F;
font-size:14px;
font-weight:bold;
}
.tabbed-d .content-tabs {
background:none repeat scroll 0 0 #EEEEEE;
border:1px solid #CCCCCC;
float:left;
padding:12px;
width:650px;
}
.tabbed-d .content-tabs.perfil fieldset {
background:none repeat scroll 0 0 #FFFFFF;
border:1px solid #CCCCCC;
padding:12px;
}
.tabbed-d .content-tabs h4 {
border-bottom:2px solid;
color:#129500;
font-size:16px;
margin:0 0 10px;
padding-bottom:8px;
}
.tabbed-d .content-tabs .gallery-thumb ul li {
text-align:center;
}
.tabbed-d .content-tabs .gallery-thumb ul li a {
font-size:13px;
}
.tabbed-d .content-tabs .gallery-thumb ul li img {
border:1px dashed #CCCCCC;
display:block;
padding:1px;
}
.tabbed-d .sidebar-tabs {
background:none repeat scroll 0 0 #FFFFCC;
border-bottom:1px solid #AFAF66;
float:right;
position:relative;
width:245px;
}
.tabbed-d .sidebar-tabs h3 {
font-size:16px;
font-weight:normal;
margin:8px;
}
.sidebar-tabs .avatar-big-cont .avatar-loading {
background:url("../large-loading.gif") no-repeat scroll 45px 45px #FFFFFF;
height:120px;
opacity:0.8;
position:absolute;
width:120px;
}
.tabbed-d .sidebar-tabs .avatar-big {
-moz-box-shadow:0 1px 3px rgba(0, 0, 0, 0.2);
display:block;
}
.sidebar-tabs .avatar-big-cont {
background:none repeat scroll 0 0 #FFFFFF;
border:1px solid #CCCCCC;
height:120px;
margin:16px auto 8px;
overflow:hidden;
padding:1px;
position:relative;
width:120px;
}
.tabbed-d .sidebar-tabs .change-avatar {
-moz-border-radius:5px 5px 5px 5px;
border:1px solid #BB8823;
clear:both;
float:left;
margin:0 0 0 80px;
width:80px;
}
.tabbed-d .sidebar-tabs li {
background:url("../nav-change.gif") repeat-x scroll left top transparent;
float:left;
position:relative;
}
.tabbed-d .sidebar-tabs li:hover {
background:none repeat scroll 0 0 #F3E772;
}
.tabbed-d .sidebar-tabs li.active, .tabbed-d .sidebar-tabs li:active {
background:url("../nav-change-active.gif") repeat-x scroll left top transparent;
}
.tabbed-d .sidebar-tabs li span {
background:url("../border_change_avatar.gif") no-repeat scroll right top transparent;
display:block;
}
.tabbed-d .sidebar-tabs li.webcam-file span {
background:none repeat scroll 0 0 transparent;
}
.tabbed-d div.mini-modal {
-moz-box-shadow:0 2px 2px #CCCCCC;
background:url("../g-c-to-f.gif") repeat-x scroll right bottom #FFFFFF;
border:1px solid #CCCCCC;
display:none;
padding:12px;
position:absolute;
right:-105px;
top:30px;
width:220px;
}
.tabbed-d div.mini-modal input {
width:160px;
}
.tabbed-d div.mini-modal input.browse {
width:120px;
}
.tabbed-d div.mini-modal span {
background:none repeat scroll 0 0 transparent;
margin:0 0 3px;
}
.tabbed-d div.mini-modal .dialog-m {
background:url("../dialog-a.png") no-repeat scroll left top transparent;
height:10px;
left:110px;
position:absolute;
top:-10px;
width:18px;
}
.tabbed-d .sidebar-tabs li a {
background-image:url("../icon_change_avatar.png");
background-repeat:no-repeat;
display:block;
height:25px;
text-indent:-99999px;
width:40px;
}
.tabbed-d .sidebar-tabs li.local-file a {
background-position:-29px 6px;
}
.tabbed-d .sidebar-tabs li.url-file a {
background-position:12px 6px;
}
.tabbed-d .sidebar-tabs li.webcam-file a {
background-position:-74px 6px;
}
.tabbed-d .sidebar-tabs li.local-file.active a {
background-position:-29px -29px;
}
.tabbed-d .sidebar-tabs li.url-file.active a {
background-position:12px -29px;
}
.tabbed-d .sidebar-tabs li.webcam-file.active a {
background-position:-74px -29px;
}
.tabbed-d a.edit {
background:none repeat scroll 0 0 #EBEBBC;
clear:both;
display:block;
margin-top:10px;
padding:6px;
text-align:center;
}
.tabbed-d a {
color:#0A3C6F;
}
.tabbed-d .content-tabs h3 {
background:none repeat scroll 0 0 #999999;
border:1px solid #666666;
color:#FFFFFF;
cursor:pointer;
font-size:13px;
height:16px;
margin:8px 0 0;
padding:5px 10px;
text-shadow:0 1px 0 #000000;
}
.tabbed-d .content-tabs h3:hover {
background:none repeat scroll 0 0 #3371AF;
}
.tabbed-d .content-tabs h3.active {
background:url("../bg_perfil_h3.gif") repeat-x scroll left top transparent;
border:1px solid #002347;
color:#FFFFFF;
text-shadow:0 1px 0 #000000;
}
.tabbed-d div, .tabbed-d span, .tabbed-d fieldset, .tabbed-d form, .tabbed-d label, .tabbed-d legend {
background:none repeat scroll 0 0 transparent;
border:0 none;
margin:0;
outline:0 none;
padding:0;
vertical-align:baseline;
}
.tabbed-d fieldset {
clear:both;
}
.tabbed-d legend {
font-size:1.167em;
font-weight:700;
padding:0 0 1.286em;
}
.tabbed-d fieldset fieldset legend {
font-size:1em;
padding:0 0 1.5em;
}
* html .tabbed-d legend {
margin-left:-7px;
}
* + html .tabbed-d legend {
margin-left:-7px;
}
.tabbed-d form .field, .tabbed-d form .buttons {
clear:both;
float:left;
margin:0 0 1.5em;
width:100%;
}
.tabbed-d form .field label {
display:block;
}
.tabbed-d form ul.fields {
margin:0 0 1.5em;
padding:0;
}
.tabbed-d form ul.fields li {
list-style-type:none;
margin:0;
}
* .tabbed-d form ul.inline li, .tabbed-d form ul.inline label {
display:inline;
}
.tabbed-d form ul.inline li {
padding:0 0.75em 0 0;
}
.tabbed-d input.radio, .tabbed-d input.checkbox {
margin:0 5px 0 0;
vertical-align:top;
}
.tabbed-d label, .tabbed-d button, .tabbed-d input.submit, .tabbed-d input.image {
cursor:pointer;
}
* html .tabbed-d input.radio, * html .tabbed-d input.checkbox {
vertical-align:middle;
}
* + html .tabbed-d input.radio, * + html .tabbed-d input.checkbox {
vertical-align:middle;
}
.tabbed-d form.horizontal .field .fields label {
font-weight:normal;
margin-right:5px;
padding:0;
text-align:left;
width:auto;
}
.tabbed-d textarea {
height:45px;
overflow:auto;
width:230px;
}
.tabbed-d input.text, .tabbed-d input.password, .tabbed-d textarea, .tabbed-d select {
margin:0;
vertical-align:baseline;
}
.tabbed-d input.text, .tabbed-d input.password, .tabbed-d textarea {
background:none repeat scroll 0 0 #FFFFFF;
border:2px solid #CCCCCC;
padding:4px;
}
.tabbed-d form.horizontal .input-fake {
float:left;
padding:4px;
}
input.disabled {
opacity:0.2;
}
.tabbed-d form.horizontal #altura, .tabbed-d form.horizontal #peso {
width:30px !important;
}
.label-id {
display:block;
float:left;
width:100px;
}
.tabbed-d form.horizontal .field label {
display:inline;
float:left;
font-size:12px;
font-weight:bold;
padding:6px 15px 0 0;
text-align:right;
width:140px;
}
.tabbed-d input.input-correct, .tabbed-d textarea.input-correct {
background:none repeat scroll 0 0 #D4F5D0 !important;
border:2px solid #3CB878 !important;
}
.tabbed-d input.input-incorrect, .tabbed-d textarea.input-incorrect {
background:none repeat scroll 0 0 #F5D0D0 !important;
border:2px solid #B83C3C !important;
}
.tabbed-d form.horizontal fieldset legend {
display:inline;
float:left;
font-size:12px;
font-weight:bold;
padding:4px;
width:140px;
}
.input-fake textarea {
display:block;
}
.jcrop-holder {
text-align:left;
}
.jcrop-vline, .jcrop-hline {
background:none repeat scroll left top white;
font-size:0;
position:absolute;
}
.jcrop-vline {
height:100%;
width:1px !important;
}
.jcrop-hline {
height:1px !important;
width:100%;
}
.jcrop-handle {
background:url("../handle.png") no-repeat scroll left top transparent;
font-size:1px;
height:16px !important;
width:15px !important;
}
.jcrop-tracker {
height:100%;
width:100%;
}
.custom .jcrop-vline, .custom .jcrop-hline {
background:none repeat scroll 0 0 yellow;
}
.custom .jcrop-handle {
-moz-border-radius:3px 3px 3px 3px;
background-color:#C7BB00;
border-color:black;
}
ul.menu-tab li.privacy {
float:right;
padding:0;
text-indent:-999999px;
}
ul.menu-tab li.privacy a {
background:url("../lock.png") repeat scroll 0 0 transparent;
border:medium none;
display:block;
height:14px;
margin:8px;
width:16px;
}
.tabbed-d .content-tabs .alert-cuenta {
background:none repeat scroll 0 0 #FFFFCC;
border-bottom:2px solid #E7E75A;
border-top:2px solid #E7E75A;
margin-bottom:10px;
padding:15px;
}
.tabbed-d .content-tabs .alert-cuenta h2 {
margin:0;
}
.tabbed-d .content-tabs .alert-cuenta ul {
margin:10px;
}
.tabbed-d .content-tabs .alert-cuenta ul li {
font-size:14px;
list-style:disc inside none;
}
div.alert-cuenta {
display:none;
}
a.misfotos-add, a.misfotos-del {
display:block;
height:10px;
margin:10px 0 0;
padding:0 0 0 15px;
width:10px;
}
a.misfotos-add {
background:url("../add.png") no-repeat scroll 0 0 transparent;
}
a.misfotos-del {
background:url("../borrar.png") no-repeat scroll 0 0 transparent;
}
.bloqueadosList a.bloqueadosU {
-moz-border-radius:3px 3px 3px 3px;
background:none repeat scroll 0 0 #D5122D;
color:#FFFFFF !important;
display:block;
float:right;
font-size:12px !important;
font-weight:normal;
padding:3px 5px;
position:absolute;
right:6px;
top:3px;
}
a.desbloqueadosU {
-moz-border-radius:3px 3px 3px 3px;
background:none repeat scroll 0 0 #209C4F;
color:#FFFFFF !important;
display:block;
float:right;
font-size:12px !important;
font-weight:normal;
padding:3px 5px;
position:absolute;
right:6px;
top:3px;
}
.bloqueadosList li {
border-bottom:1px solid #CCCCCC;
padding:6px;
position:relative;
}
.bloqueadosList a {
font-size:13px;
font-weight:bold;
}
.mini_leftIbuscador {
float:left;
}
.mini_ibuscador {
background:url("/images/mini_bgInputS_2.gif") repeat-x scroll left top transparent;
border:medium none;
float:left;
margin:0;
padding:5px 0;
width:250px;
}
.mini_bbuscador {
background:url("/images/mini_buscar_2.gif") repeat-x scroll left top transparent;
border:medium none;
cursor:pointer;
float:left;
height:24px;
margin:0 !important;
width:41px;
}
.search-label {
color:#FFFFFF;
float:left;
}
.search-in {
color:#FFFFFF;
float:right;
font-weight:bold;
margin-bottom:5px;
padding-left:10px;
text-shadow:0 1px 2px #000000;
}
.search-in a {
cursor:pointer;
}
.search-in a:hover {
color:#FFFF00;
text-decoration:none;
}
.search_active {
color:#FFFF00;
}
.buscador-h {
float:right;
margin:10px 0 0 10px;
width:310px;
}
img.imagen-preview {
display:block;
height:120px;
margin:0 10px;
width:120px;
}
#wrapper {
margin:20px auto;
width:960px;
}
.menu-tabs {
background:none repeat scroll 0 0 #E1E1E1;
padding:10px 10px 0;
}
.menu-tabs li {
float:left;
margin-right:10px;
}
.menu-tabs li a {
background:none repeat scroll 0 0 #EBEAEA;
color:#2B3ED3 !important;
display:block;
font-size:14px;
font-weight:bold;
padding:10px 15px;
}
.menu-tabs li.selected a, .menu-tabs li a:hover {
background:none repeat scroll 0 0 #FAFAFA;
color:#000000 !important;
}
.listado li {
background:none repeat scroll 0 0 #FAFAFA;
border-bottom:1px dotted #CCCCCC;
border-top:1px solid #FFFFFF;
}
.listado li:first-child {
border-top:medium none;
}
.listado li:hover {
background:none repeat scroll 0 0 #EEEEEE;
}
.listado a {
color:#2B3ED3 !important;
font-weight:bold;
}
.listado .listado-avatar {
float:left;
margin-right:10px;
}
.listado .listado-avatar img {
background:none repeat scroll 0 0 #FFFFFF;
border:1px solid #CCCCCC;
padding:1px;
}
.listado .listado-content {
float:left;
padding:5px;
}
span.categoriaPost {
margin-bottom:5px !important;
padding:3px 0 3px 26px !important;
}
span.categoriaPost:hover {
background-color:#FAFAFA;
}
.listado .txt {
float:left;
line-height:18px;
}
.listado .txt .grey {
color:#999999;
}
.listado .action {
background:none repeat scroll 0 0 #EEEEEE;
border-left:1px solid #D6D6D6;
float:right;
padding:9px;
}
.listado-paginador {
padding:5px;
}
a.siguiente-listado, a.anterior-listado {
-moz-border-radius:15px 15px 15px 15px;
color:#000000 !important;
display:block;
font-size:13px;
padding:5px 10px;
}
.clearfix:after {
clear:both;
content:" ";
display:block;
font-size:0;
height:0;
visibility:hidden;
}
* html .clearfix {
}
:first-child + html .clearfix {
}
#subMenuCapsula {
background:none repeat scroll 0 0 #000000;
}
#capsule {
margin-left:-6px;
}
.mi-capsula iframe#icapsule {
margin-left:-6px;
width:984px;
}
.mi-capsula #cuerpocontainer {
padding:0 !important;
width:972px;
}
.boxy .categoriaPost:hover {
background-color:#FFFFFF !important;
}
// ==/UserScript==