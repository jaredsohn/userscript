// ==UserScript==
// @name          Skoob Trocas
// @namespace     http://danillonunes.net
// @description   Coloca em cada livro do Skoob um link para buscar no Trocando Livros e no BookMooch
// @include       http://www.skoob.com.br/*
// @include       http://skoob.com.br/*
// ==/UserScript==

(function() {
  var livros = document.getElementsByClassName('fbtooltip');

  var servicos = {
    'trocandolivros': {
      titulo: 'TL',
      desc: 'Buscar no Trocando Livros',
      url: 'http://www.trocandolivros.com.br/livros?f=1&q=%s'
    },
    'bookmooch': {
      titulo: 'BM',
      desc: 'Buscar no BookMooch',
      url: 'http://pt.bookmooch.com/m/search?w=%s'
    }
  };

  for (var i = 0; i < livros.length; i++) {
    var livro = livros[i].parentNode;
    var tooltip = livro.getElementsByClassName('fbtooltip_content')[0];

    var texto_titulo = tooltip.firstChild.innerHTML;
    var query_titulo = escape(texto_titulo);

    var s = 0;
    for (servico in servicos) {

      var separador = s++ == 0 ? '' : ' - ';
      separador = document.createTextNode(separador);

      var link = document.createElement('a');
      link.style.fontSize = '10px';
      link.class = 'link-' + servico;
      link.title = servicos[servico].desc;
      link.href  = servicos[servico].url.replace('%s', query_titulo);
      link.innerHTML = servicos[servico].titulo;

      livro.appendChild(separador);
      livro.appendChild(link);
    }
  }
})();