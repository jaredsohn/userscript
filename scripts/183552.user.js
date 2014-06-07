// ==UserScript==
// @description XKCD Substitutions: Making the news more interesting and keyboards more dangerous since 2013
// @name XKCD Substitution Script
// @namespace http://csserver.evansville.edu/~wg24/xkcd-substitution/
// @require http://code.jquery.com/jquery-2.0.3.min.js
// @version 1.2.2
// @grant none
// @exclude *jsfiddle*
// @exclude *bblearn*
// ==/UserScript==

function xkcdSubstitutions(){
  var words = [
    {
      find: new RegExp('([ >]|)(k)eyboard', 'gi'),
      replace: function($1,$2,$3) {
        if ($3 == 'k') return $2 + "leopard";
        return $2 + "Leopard";
      }
    },
    {
      find: new RegExp('([ >]|)(w)itness(es)?', 'gi'),
      replace: function($1,$2,$3,$4) {
        if ($4 != "") {
          if ($3 == 'w') return $2 + "these dudes I know";
          return $2 + "These dudes I know";
        }
        if ($3 == 'w') return $2 + "this dude I know";
        return $2 + "This dude I know";
      }
    },
    {
      find: new RegExp('([ >]|)(a)lleged(ly)?', 'gi'),
      replace: function($1,$2,$3,$4) {
        if ($4 != "") {
          if ($3 == 'a') return $2 + "kinda probably";
          return $2 + "Kinda probably";
        }
        if ($3 == 'a') return $2 + "kinda probable";
        return $2 + "Kinda probable";
      }
    },
    {
      find: new RegExp('([ >]|)new stud(y|ies)', 'gi'),
      replace: function($1,$2,$3) {
        if ($3 == 'y') return $2 + "tumblr post";
        return $2 + "tumblr posts";
      }
    },
    {
      find: new RegExp('([ >]|)(r)ebuild(ing)?', 'gi'),
      replace: function($1,$2,$3,$4) {
        if ($4 != "") {
          if ($3 == 'r') return $2 + "avenging";
          return $2 + "Avenging";
        }
        if ($3 == 'r') return $2 + "avenge";
        return $2 + "Avenge";
      }
    },
    {
      find: new RegExp('([ >]|)(s)pace', 'gi'),
      replace: '$1$2paaace'
    },
    {
      find: new RegExp('([ >]|)google (g)lass', 'gi'),
      replace: function($1,$2,$3) {
        if ($3 == 'g') return $2 + "virtual boy";
        return $2 + "Virtual Boy";
      }
    },
    {
      find: new RegExp('([ >]|)(s)mart.?ph$2(s)?', 'gi'),
      replace: function($1,$2,$3,$4) {
        if ($4 != "") {
          if ($3 == 's') return $2 + "pokédexes";
          return $2 + "Pokédexes";
        }
        if ($3 == 's') return $2 + "pokédex";
        return $2 + "Pokédex";
      }
    },
    {
      find: new RegExp('([ >]|)(e)lectric(ity)?', 'gi'),
      replace: function($1,$2,$3,$4) {
        if ($4 != "") {
          if ($3 == 'e') return $2 + "atomic energy";
          return $2 + "Atomic energy";
        }
        if ($3 == 'e') return $2 + "atomic";
        return $2 + "Atomic";
      }
    },
    {
      find: new RegExp('([ >]|)(s)enator', 'gi'),
      replace: function($1,$2,$3) {
        if ($3 == 's') return $2 + "elf-lord";
        return $2 + "Elf-Lord";
      }
    },
    {
      find: new RegExp('([ >]|)(r)epresentative', 'gi'),
      replace: function($1,$2,$3) {
        if ($3 == 'r') return $2 + "dwarf-lord";
        return $2 + "Dwarf-Lord";
      }
    },
    {
      find: new RegExp('([ >]|)(c)ongressman', 'gi'),
      replace: function($1,$2,$3) {
        if ($3 == 'c') return $2 + "lord";
        return $2 + "Lord";
      }
    },
    {
      find: new RegExp('([ >]|)(c)ar', 'gi'),
      replace: '$1$2at'
    },
    {
      find: new RegExp('([ >]|)(e)lection', 'gi'),
      replace: '$1$2ating contest'
    },
    {
      find: new RegExp('([ >]|)(c)ongressional leaders(hip)?', 'gi'),
      replace: function($1,$2,$3,$4) {
        if ($4 != "") {
          if ($3 == 'c') return $2 + "river spirit guidance";
          return $2 + "River spirit guidance";
        }
        if ($3 == 'c') return $2 + "river spirits";
        return $2 + "River spirits";
      }
    },
    {
      find: new RegExp('([ >]|)(h)omeland security', 'gi'),
      replace: function($1,$2,$3) {
        if ($3 == 'h') return $2 + "homestar runner";
        return $2 + "Homestar runner";
      }
    },
    {
      find: new RegExp('([ >]|)could not be reached for comment', 'gi'),
      replace: '$1is guilty and every$2 knows it'
    },
  ];

  $('*:not(script,style)').contents().filter(function() {
    return this.nodeType == Node.TEXT_NODE && this.nodeValue.trim() != '';
  }).each(function() {
    for (var i = 0; i < words.length; i++) {
      this.nodeValue = this.nodeValue.replace(words[i].find, words[i].replace);
    }
  });
}

$(document).ready(function() {
  xkcdSubstitutions();
});

window.onload = function() {
  xkcdSubstitutions();
}