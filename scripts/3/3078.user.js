// bradescoautcc.user.js
// version 0.1
// 2006-01-30
// Copyright (c) 2006, Bruno Caimar 
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// ==UserScript==

// @name            Bradesco Preenchimento Automatico C/C
// @author          Bruno Caimar <bruno.caimar(AT)gmail.com/>
// @namespace       
// @description     Preenche os dados da conta corrente automaticamente no site do Bradesco
//                  Esse script foi inspirado no script <http://brunotorres.net/greasemonkey/unibancoautcc.user.js> 
//                  feito pelo Bruno Torres para o site do Unibanco
//                  Testado no FireFox 1.5/GreaseMonkey 0.6.4
//                  Atencao: Para abrir a janela automaticamente deve ser liberado a abertura de popups para o dominio do banco 
//
// @include         http://*bradesco.com.br*/*
// @include         https://*bradesco.com.br*/*

// ==/UserScript==
function fPreenche() {
   // Inserir os dados da agencia/conta aqui
   var AGENCIA = '0000' , CONTA   = '000000', DIGCTA  = '0' ;
   // Para abrir a tela de login automaticamente mudar para true
   var ABREAUTOMATICAMENTE = false ; 
   try { 
      var inputs = document.getElementsByTagName('input') ;
      for (var i = 0; i < inputs.length ; i++) {
         if (inputs[i].name == 'AGN')    { inputs[i].value = AGENCIA ; }
         if (inputs[i].name == 'CTA')    { inputs[i].value = CONTA   ; }
         if (inputs[i].name == 'DIGCTA') { inputs[i].value = DIGCTA  ; }
      }
      if (ABREAUTOMATICAMENTE) { unsafeWindow.IB2000Open(unsafeWindow.document.FormIB2001) ; }
   } catch (err) { 
      GM_log('fPreenche - Ocorreu um erro...' + err.description, 2) ;
   } 
}

(function() {
   try {      
      window.addEventListener('load', 
                              function() { fPreenche() ;} ,
                              true ) ;
   } catch(err) {
      GM_log('Ocorreu um erro...' + err.description, 2) ;
   }
})();
