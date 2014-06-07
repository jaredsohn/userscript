// ==UserScript==
// @name           CommenT!
// @namespace      CommenT! V0.1 Briiann78
// @description    Comentar en T!
// @include        http://taringa.net/*
// ==/UserScript==
///////////////------------------Modificar Agregar Comentario--------------------////////////////////
if($('.miComentario').size() != 0){
		$('.miComentario .error').css('font-weight','bold').css('width','820px').css('margin-left','75px');
		$('.comment-info div.floatR ul').append('<li><a href="#maincontainer" title="Ir a la Cielo"><img src="'+urlimg+'arriba.png"/></a></li><li><a href="#pie-a" title="Ir a la Tierra"><img src="'+urlimg+'abajo.png"/></a></li>');
		if($('.titulorespuestas.floatL').html() == '0 Comentarios') $('#comentarios div:last').html($('#comentarios div:last').html().replace(", Soyez le premier", ''));
		else{
			GM_addStyle('.avatar-box li.administrar a:hover span {background-position:0 -64px;}');
			var users_com = $('.avatar-box ul');
			var nick_user,id_user;
			for(var i=0;i<users_com.size();i++){
				nick_user = users_com.eq(i).find('li:eq(0) a').attr('href').split('/')[3];
				id_user   = /[0-9]+$/.exec(users_com.eq(i).find('li:eq(1)').attr('class'));
				users_com.eq(i).append('<li class="administrar"><a href="/buscador-taringa.php?autor='+nick_user+'" target="_blank">Sus posts<span></span></a></li><li class="administrar"><a href="http://buscar.taringa.net/comunidades?type=temas&q=*&autor='+nick_user+'" target="_blank">Sus temas<span></span></a></li><li class="administrar"><a href="/perfil/'+nick_user+'/comentarios" target="_blank">Sus comentarios<span></span></a></li><li class="administrar"><a href="" onclick="notifica.follow(\'user\', '+id_user+', notifica.userInPostHandle, null);return false;" target="_blank">Seguir Usuario<span></span></a></li>');
			}
		}
		if(!Tar) GM_addStyle("#post-comentarios .miComentario .answerInfo {width:52px;}.comentario-post {width:940px!important}.avatar-box img {border:1px solid #CCCCCC;display:block;padding:1px;}.comment-box{margin-left:15px;}");