// ==UserScript==
// @name           Selecionar Todos os CheckbOxs no Facebook
// @author         Cefa Schiati 
// ==/UserScript==

/******************************************************************************
// ::: O QUE ESTE CÓDIGO FAZ? :::

 Simples ele seleciona todos aqueles "quadradinhos" no facebook
 é aqueles "quadradinhos" na hora de chamar um amigo para um evento ou selecionar
 pra qualquer coisa que seja que tenha que marcar muitos amigos.
 se você não quiser ficar marcando um por um, é só utilizar o código abaixo

// ::: COMO FAÇO PARA USA-LO ? :::

  você copia o código da palavra JAVASCRIPT até o final que no caso é o VOIDFALSE
  tudo ok? sem faltar nada, ai você cola ele la onde digita WWW.FACEBOOK.COM.BR
  Ai retira o ASTERISCO que está entre a palavra JAVASCRIPT e os DOIS PONTOS
  e ao retirar o ASTERISCOS é só da ENTER e PRONTO todos os "QUADRADINHOS" 
  (checkboxs) estarão marcados (=
 
// ::: EU VOU PEGAR ALGUM VÍRUS ? :::

É OBVIO que não, minha intenção é apenas ajudar a vida de vocês no facebook e não
piorar.!


// Duvidas? schiati@hotmail.com
// facebook: cefaschiati

******************************************************************************/


javascript*:mortadela=document.getElementsByTagName("input");
for(y=0;y<mortadela.length;y++)
if(mortadela[y].type=="checkbox")mortadela[y].checked="checked";voidfalse