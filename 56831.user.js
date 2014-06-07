// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "TribalWars Enhancer v2", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name           Barra premium PLUS
// @version        TESTE
// @namespace      Me
// @description    Voce tera a barra premium em português e ainda mais uma ações novas das barrinhas normais
// @include        http://ro*.triburile.ro/*
// @include        http://en*.tribalwars.net/*
// @include        http://en*.ds.ignames.net/*
// @include        http://nl*.tribalwars.nl/*
// @include        http://cs*.divokekmeny.cz/*
// @include        http://sv*.tribalwars.se/*
// @include        http://s*.tribalwars.es/*
// @include        http://s*.tribalwars.fr/*
// @include        http://s*.tribalwars.it/*
// @include        http://pl*.plemiona.pl/*
// @include	   http://en*.ds.ignames.net/*
// @include	   http://de*.die-staemme.de/*
// @include        http://br*.tribalwars.com.br/*
// @copyright      Copyright (c) 2009 - 2010
// @maintainer     Me
// ==/UserScript==
	<div style="text-align: center;">
	<table class="navi-border" style="width: 840px; border-collapse: collapse; margin:11px auto auto; text-align: left;">
		<tr>
			<td>
				<table class="menu nowrap" width="840">
					<tr id="menu_row">
						<td><a href="/game.php?village=37711&amp;screen=&amp;action=logout&amp;h=cb4c" target="_top">Sair</a></td>
						<td><a href="http://forum.tribalwars.com.br/index.php" target="_blank">Fórum</a></td>
						<td><a href="/help2.php" target="_blank">Ajuda</a></td>
						<td><a href="/game.php?village=37711&amp;screen=settings">Configurações</a><br /><table cellspacing="0" width="120" class="menu_column"><tr><td><a href="/game.php?village=37711&amp;screen=settings&amp;mode=profile">Perfil</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=settings&amp;mode=email">Endereço de e-mail</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=settings&amp;mode=settings">Configurações</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=settings&amp;mode=quickbar">Editar barra de acesso rápido</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=settings&amp;mode=move">Recomeçar</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=settings&amp;mode=delete">Apagar conta</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=settings&amp;mode=share">Compartilhar conexão à internet</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=settings&amp;mode=vacation">Modo de férias</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=settings&amp;mode=logins">Acessos</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=settings&amp;mode=change_passwd">Trocar senha</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=settings&amp;mode=poll">Enquetes</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=settings&amp;mode=ref">Convidar jogadores</a></td></tr></table></td>
						<td><a href="/game.php?village=37711&amp;screen=premium">Premium</a><br /><table cellspacing="0" width="120" class="menu_column"><tr><td><a href="/game.php?village=37711&amp;screen=premium&amp;mode=help">Vantagens</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=premium&amp;mode=premium">Comprar</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=premium&amp;mode=points">Utilizar</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=premium&amp;mode=log">Histórico</a></td></tr></table></td>
						<td><a href="/game.php?village=37711&amp;screen=ranking">Classificação</a> (28162.|509 P)<br /><table cellspacing="0" width="120" class="menu_column"><tr><td><a href="/game.php?village=37711&amp;screen=ranking&amp;mode=ally">Tribos</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=ranking&amp;mode=player">Jogador:</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=ranking&amp;mode=con_ally">Tribos do continente</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=ranking&amp;mode=con_player">Jogadores do continente</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=ranking&amp;mode=kill_player">Oponentes derrotados</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=ranking&amp;mode=kill_ally">Tribos inimigas derrotadas</a></td></tr></table></td>
						<td><a href="/game.php?village=37711&amp;screen=ally&amp;mode=forum"><img src="graphic/ally_forum.png?1" title="Nova mensagem no fórum da tribo" alt="" /></a> <a href="/game.php?village=37711&amp;screen=ally">Tribo</a><br /><table cellspacing="0" width="120" class="menu_column"><tr><td><a href="/game.php?village=37711&amp;screen=ally&amp;mode=overview">Visualização geral</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=ally&amp;mode=profile">Perfil</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=ally&amp;mode=members">Membros</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=ally&amp;mode=contracts">Diplomacia</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=ally&amp;mode=invite">Convites</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=ally&amp;mode=properties">Propriedades</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=ally&amp;redir_forum" target="_blank">Fórum da Tribo</a></td></tr></table></td>
						<td><a href="/game.php?village=37711&amp;screen=report"> Relatórios</a><br /><table cellspacing="0" width="120" class="menu_column"><tr><td><a href="/game.php?village=37711&amp;screen=report&amp;mode=all">Todos os relatórios</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=report&amp;mode=attack">Ataques</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=report&amp;mode=defense">Defesa</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=report&amp;mode=support">Apoio</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=report&amp;mode=trade">Comércio</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=report&amp;mode=other">Outros</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=report&amp;mode=forwarded">Encaminhados</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=report&amp;mode=filter">Filtros</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=report&amp;mode=block">Bloquear remetente</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=report&amp;mode=public">Relatórios públicos</a></td></tr></table></td>
						<td><a href="/game.php?village=37711&amp;screen=mail"> Mensagens</a><br /><table cellspacing="0" width="120" class="menu_column"><tr><td><a href="/game.php?village=37711&amp;screen=mail&amp;mode=in">Mensagens</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=mail&amp;mode=mass_out">Mensagens coletivas</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=mail&amp;mode=new">Escrever mensagem</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=mail&amp;mode=block">Bloquear remetente</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=mail&amp;mode=address">Caderno de endereços</a></td></tr><tr><td><a href="/game.php?village=37711&amp;screen=mail&amp;mode=groups">Grupos</a></td></tr></table></td>
						<td><a href="/game.php?village=37711&amp;screen=memo">Notas</a></td>						<td><a href="/game.php?village=37711&amp;screen=buddies">Amigos</a></td>					</tr>
				</table>
			</td>
		</tr>
	</table>
</div>





<br />
<table align="center">
	<tr>
		<td>
			<table class="navi-border" style="border-collapse: collapse;">
				<tr>
					<td>
						<ul class="menu nowrap quickbar">
																		 							<li ><a href="/game.php?village=37711&amp;screen=main" ><img src="graphic/buildings/main.png" alt="Edifício principal" />Edifício principal</a></span></li>
																								 							<li ><a href="/game.php?village=37711&amp;screen=barracks" ><img src="graphic/buildings/barracks.png" alt="Quartel" />Quartel</a></span></li>
																								 							<li ><a href="/game.php?village=37711&amp;screen=stable" ><img src="graphic/buildings/stable.png" alt="Estábulo" />Estábulo</a></span></li>
																								 							<li ><a href="/game.php?village=37711&amp;screen=garage" ><img src="graphic/buildings/garage.png" alt="Oficina" />Oficina</a></span></li>
																								 							<li ><a href="/game.php?village=37711&amp;screen=snob" ><img src="graphic/buildings/snob.png" alt="Academia" />Academia</a></span></li>
																								 							<li ><a href="/game.php?village=37711&amp;screen=smith" ><img src="graphic/buildings/smith.png" alt="Ferreiro" />Ferreiro</a></span></li>
																								 							<li ><a href="/game.php?village=37711&amp;screen=place" ><img src="graphic/buildings/place.png" alt="Praça" />Praça</a></span></li>
																								 							<li ><a href="/game.php?village=37711&amp;screen=market" ><img src="graphic/buildings/market.png" alt="Mercado" />Mercado</a></span></li>
																		</ul>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>