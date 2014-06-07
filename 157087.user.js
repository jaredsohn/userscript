// ==UserScript==
// @name        "Este usuário não participou do fórum + Erro buscando a página" Reloader
// @description Recarrega a página se aparecerem as mensagens: "Este usuário não participou do fórum" ou "Erro buscando a página ... do tópico ..."
// @include     http://forum.jogos.uol.com.br/*
// @version     2.0
// ==/UserScript==

init = function () 
{	
	if (document.title === 'Fórum UOL Jogos :: Índice do fórum')
	{
		location.reload(false);
	}
	if (document.getElementsByClassName('user-no-messages')[0].innerHTML === 'Este usuário não participou do fórum.')
	{
		location.reload(false);
	}
}

init();
