// ==UserScript==
// @name          Estadao sem auto-refresh
// @author        Joao Medrado
// @version       0.1
// @namespace     http://www.joaomedrado.com
// @description   Desabilita a atualizacao automatica nas paginas do estadao ( www.estadao.com.br )
// @sourcecode    https://github.com/jcarlos/estadao-sem-refresh
// @run-at        document-end
// @match         http://*.estadao.com.br/*
// ==/UserScript==

/*global oReload, document */

// Estadao Sem Refresh Namespace
var EstadaoSemRefresh = window.EstadaoSemRefresh || {};

EstadaoSemRefresh.pararRefresh = function(){
  "use strict";
  if (typeof(window.oReload) !== 'undefined') {
    window.oReload.stop();
  }
};

EstadaoSemRefresh.injetarCodigo = function(codigo){
  "use strict";
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.innerHTML = '$(' + codigo + ')();';
  document.body.appendChild(script);
  return script;
};

EstadaoSemRefresh.executar = function(){
  "use strict";
  EstadaoSemRefresh.injetarCodigo(EstadaoSemRefresh.pararRefresh.toString());
};

EstadaoSemRefresh.executar();
