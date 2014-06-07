// ==UserScript==
// @name           DGS keep goban hyperlinks
// @namespace      http://softwareslave.com
// @description    keeps the links on the board
// @include        http://www.dragongoserver.net/game.php?g=*&a=domove&c=*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
  var a = 'abcdefghijklmnopqrstuvwxyz'.split('');
  var $nodes=$('.Goban').find('tbody > tr > td.brdx');
  var boardsize = Math.sqrt($nodes.length);
  var i=-1;
  for(var x=0; x<boardsize; x++) {
    for(var y=0; y<boardsize; y++) {
	  var curr = $nodes.get(++i);
          var alt = $(curr).find('img')[0].alt;
	  if ( alt=='.' || alt==',') {
	    var loc = window.location.href.replace(/c=[a-z][a-z]$/i, 'c='+a[y]+a[x]);
	    curr.innerHTML = '<a href="'+loc+'">'+curr.innerHTML+'</a>';
	  }
	}
  }
