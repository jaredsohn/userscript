// ==UserScript==
// @name           Obtener direct link imageshack.us
// @namespace      http://
// @description    (v1.2) Obtiene el link directo de imageshack.us
// @include        http://*imageshack.us*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

/*******************************************************************************
***************     Creado por BuNKeR << www.neobookeros.com.ar >>     ***************
*******************************************************************************/

var j = jQuery.noConflict();
j(document).ready(function(){
	if (j("#ImageCodes").length){
		DL_code = j('#ImageCodes a:nth-child(2)').html();
		DL_link = DL_code.split('value="')[1].split('"><span')[0];
		document.write('<html><head><title>'+ DL_link +'</title><style>body{margin:0;}img {max-width: 100%;height: auto;width: auto\9; /* ie8 */}div.wrapper{	float:left; /* important */	position:relative; /* important(so we can absolutely position the description div */ }div.description{	position:absolute; /* absolute position (so we can position it where we want)*/	bottom:0px; /* position will be on bottom */	left:0px;	width:100%;	/* styling bellow */	background-color:black;	font-family: \'tahoma\';	font-size:15px;	color:white;	opacity:0.6; /* transparency */	filter:alpha(opacity=60); /* IE transparency */}p.description_content{	padding:10px;	margin:0px;}p.description_content a{text-decoration: none;color: #fff;}</style></head><body><div class=\'wrapper\'><img src=\''+ DL_link +'\' /><div class=\'description\'><p class=\'description_content\'><a href="'+ DL_link +'">'+ DL_link +'</a></p></div></div></body></html>');
	};

});