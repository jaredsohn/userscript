// ==UserScript==
// @name           Join Comunidade
// @namespace      http://greasemonkey.sitesbr.net
// @description    Confirma entrada automaticamente quando você clica para entrar em novas comunidades
// @include        http://www.orkut.com/Community*Join.aspx?*
// @include        http://www.orkut.com/CommBond.aspx?*
// ==/UserScript==

/*
 * Autor: Sergio Abreu
 * http://sitedosergio.sitesbr.net/
 *
 *
 * ############# Não se preocupe com os caracteres estranhos no browser. No script estará normal. ###############
 *
 * Criado em 09/05/2006 13:20h
 * Atualizado em 02/10/2006 16:55h  :: v 2.3
 *
 * Confira as mudanças no ChangeLog no final do arquivo
 *
 */

	function comm_join()
	{
	if( location.href.toLowerCase().indexOf('commbond.aspx') > -1)
	if(! confirm('Deseja entrar para essa comunidade para poder postar nela ?') ){ history.go(-1); return;}

	var bt = document.createElement('input');
	bt.setAttribute("type", "submit");
	bt.setAttribute("value", "Clicando, aguarde...");
	bt.setAttribute("style", "background:#ccffcc");

 	if(location.href.toLowerCase().indexOf('unjoin.aspx') > -1){
	 bt.setAttribute("name", "Action.unjoin");
	 document.forms[1].appendChild(bt);
	}
 	else if(location.href.toLowerCase().indexOf('bond.aspx') > -1){
	 var trs = document.getElementsByTagName('tr');
	 for( var i = 0; i < trs.length; i++)
	{
	  if(trs[i].innerHTML.toLowerCase().indexOf('<table') > -1) continue;
	  if(trs[i].getAttribute("onclick") && trs[i].getAttribute("onclick").toLowerCase().indexOf('join.aspx') > -1)
	  {
	   trs[i].appendChild(bt);
	   break;
	  }
	 }
	} else {
	 bt.setAttribute("name", "Action.join");
	 document.forms[1].appendChild(bt);
	}
	 bt.click();
	}

	comm_join();


/* -------------- ChangeLog ------------------
 *
 * Cada vez melhor. Mudança que atua no endereço commbond.aspx, confirmando antes.
 * Nova página: CommBond.aspx
 *
 */
