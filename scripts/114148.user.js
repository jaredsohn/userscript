// File encoding: UTF-8
//{
// Este script funciona nas páginas do Netflix, adicionando links para
// vários sites com informações sobre o vídeo.
//
// Copyright (c) 2011, Ricardo Mendonça Ferreira (ric@mpcnet.com.br)
// Released under the GPL license - http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Netflix Links
// @description   Em páginas de filmes no Netflix, adiciona links para sites como IMDB, Rotten Tomatoes, Wikipedia, etc.
// @namespace     http://userscripts.org/scripts/show/114148
// @include       http://*.netflix.com/WiMovie/*
// @include       http://*.netflix.com/Movie/*
// @match         http://*.netflix.com/WiMovie/*
// @match         http://*.netflix.com/Movie/*
// @version       1.3
// ==/UserScript==
//
// --------------------------------------------------------------------
//
// Para usar este script, é preciso usar o navegador Google Chrome, ou
// o navegador Firefox com o add-on Greasemonkey: http://www.greasespot.net/
// 
// --------------------------------------------------------------------
//
// History:
// --------
// 2012.12.06  [1.3] Inclui também Filmow
// 2011.10.03  [1.2] Busca também no IMDb.pt; usando @match (p/ Google Chrome)
// 2011.09.30  [1.1] Acrescentado include p/ /Movie/*
// 2011.09.28  [1.0] 1ª versão
//}

(function() {

   function getData(src, className, regex) {
      result = "";
      objs = src.getElementsByClassName(className);
      if (objs && objs.length) {
         match = objs[0].innerHTML.match(regex);
         if (match && match[1])
              result = match[1];
         else result = "";
      }
      return result;
   }
   
   function newLink(name, addr, icon)
      { return '<a href="'+addr+'"><img src="'+icon+'" title="Buscar no site '+name+'" border="0"></a> &nbsp;'; }
   
   tw = document.getElementsByClassName("title-wrapper");
   if (tw && tw.length) {
      tw = tw[0];

      title   = getData(tw,       "title",     /(.+)/    ); // Obtém título (pode ser traduzido ou original)
      orig    = getData(tw,       "origTitle", /\((.+)\)/); // Obtém título original
      year    = getData(document, "year",      /(\d+)/   ); // Obtém ano de produção
      searchM = (orig || title).replace(/ /g, '+').replace(/[^a-zA-Z0-9\s\+]/g,'').toLowerCase();
      title   = encodeURIComponent(title);
      orig    = encodeURIComponent(orig);
      search  = (orig || title);
      searchY = (orig || title) + ' ('+year+')';
      
      // http://www.greywyvern.com/code/php/binary2base64
      // http://www.motobit.com/util/base64-decoder-encoder.asp
      newHTML  = '<br />';
      newHTML += newLink('IMDb.pt',         'http://www.imdb.pt/find?q='+searchY,                         'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAIAAABiEdh4AAAACXBIWXMAAA7DAAAOwwHHb6hkAAABRUlEQVR4nGPsrhFjIAWwAHFqPO+/vwwQ9BfGgLH/IwvuOPGFoSJXEKhn5RQpICnAx/TqsjLEpCnN4hCGsQ7H9b1KQMalzUpA5zAhW/fh078bt38jiwANOnvlx7TF70Gc/wx2etwsf/4gpIE2JBY+B5JAnTDjOeGyExe/u/f4F4oNwoLMdx/+BpJoHv0LtpWdjXH/iW8oGiwMOeHkX7DNv//+h8u6WPIASaa/SG4WEmCGkxBw6twPNNtQbPBx4lWWZ0UWiS99BgwliNkJ5U+BJOOba8r/0MMePfiR2SzAwAKi//8ZpIzvwg2uyhJum/YW2apz65T+g5UxQaj/YL+lRgo8OAqKOCDv5h6l9dNkgOw5rZIXNijBzWVasOLzfzAHCGYv/6BgDbYHyRQ4G4gOXf0CSkvINlRmCcM9AFUP1wDmMpKaWgGvBsmIXC3/SgAAAABJRU5ErkJggg==');
      newHTML += newLink('IMDb.com',        'http://www.imdb.com/find?q='+searchY,                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAIAAABiEdh4AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABQklEQVR42pWSu0oDURRF1zyiCWicSQoxKEqmsEkjaXx0Yuk/qB9gYSHaih9gE/wBbdJbCRGbNEJsDESIEi1UEMEQApnXzVjcZJxEJLqLw73n7LPPvg/l8nyO/0AHVtfG5EYIAOEB+D6A7/V4Tgeg3nD1n9Tf2BJKu2GNFO6JyuThrgkUCxnASKrvd5YsF46n5SKfi9dKWeDh2qqVsmr0QM1W977uRTPFQqZStU/PPgFPBIAuPUgYSXVn781Iqs1Wty+fCKtHJx/1J3dgQtrUHp+9tKkNXaV0n5rSKlV7oGF5KRFG4RPakNhYmQBUEfGcMrQwStzc2kPTBiZsrk9a87FoZmv/NZ+LS+3tgxdAaZSt0KU0IByl/5oB4Lvf/U4HbXYmtrgwPsQWIggComyng/Ap19r6SOHoY/c+38VV+++/9Qswi5SSSNxmuwAAAABJRU5ErkJggg==');
      newHTML += newLink('Rotten Tomatoes', 'http://www.rottentomatoes.com/search/?search='+searchY,      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABnRSTlMAAAAAAABupgeRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB3UlEQVR42nWSIWgcQRSG/7uuGLHQJ5YwhIqlHGXFUSKOsiJiKRERFSciTpyojIyoKKWiMqIiVEVWRkScCGVFxVGOEsqJo4SylBMjjrJiKY8wlJ8wouKOXJomTzxm4Pvm/QMPuKv2PgxxT7Vv3Zvfi/mvC9tw8v3sTqF1ffJ/fFXPyumJW1SudPmgyNJs+PzVvcLky+nR5MgIqguaSqUn1kohWd7d7Tx7cVtofkyPy0MuXG0NxNSeNja20tTRWSPdbL//Lt7srAT/bVK+3d+qKTFmqTkpJC911hMIXr+vDaEG5z3bP/wYP+60wqXXogDUpeY8NVVisoaDqWqD44EdfNZ0zlWaLJNyFPH0BF7RMVlistggAAFIjHj2S6W58d+q4nj84M3DjdA4sxnBxkjFJBKuCI9wyWQRfDuIXytB4ggkgNXDBEEEAKsYab1CCRAwnhFEQFBhlHCKCFBSAQ+ENUpAA0WkjZ0CBBrSEU7hlAuiJnRFK1CDLtAFym7RCldBd3bhHCIgXo9nWNLUAAVqUrbz4aezFoDwc657AzR6M+4yQ73sJNL0YDyON5I2gOhJR8qR2c7/z+ColVfb7x9MxvFG8s8uAfBfpzoa1dOZq50GwIrN863hy0dPu9fMX6BuBKLFtX0fAAAAAElFTkSuQmCC'); // http://images.rottentomatoescdn.com/images/icons/favicon.ico
      newHTML += newLink('Metacritic',      'http://www.metacritic.com/search/movie/'+searchM+'/results', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABFElEQVR42pWSoXLCQBCGN60ohpnVVVHULpMXSAwOD3WY8hgJvjPRwRwGnZlUoW5QNXSCpQZMpxhmmfQBUnHtcbkLgp0VN7v37X/z33oAAdwSd3BjtAOI3Tx/resNs0ySF6sbuClEURsh5QYx/O+2AfqeZspypxj7SUQ9oh4AJMk8iqb9/vN2+6nqUmaI3YaCOTJNl6qIGJblTutcgDjO6mYQjS3mAvj+UI1P06XWYa5MRogCMQTlCXPFXOW5tFwymb/0/SFzpdr7/ZfrrMNAQDTWjBCFxWhDG/9wjYnjrHk78PTymU4vFm+Tyax1a+4BHtXpeDytVu+j0aDTeSB6AoD1+sMFPGu9lc7h8B1F0/P5xwV+AeCi8O1vPWY7AAAAAElFTkSuQmCC'); // http://www.metacritic.com/favicon.ico
      newHTML += newLink('Wikipedia',       'http://en.wikipedia.org/wiki/Special:Search?search='+search, 'data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAEAgQAhIOEAMjHyABIR0gA6ejpAGlqaQCpqKkAKCgoAPz9/AAZGBkAmJiYANjZ2ABXWFcAent6ALm6uQA8OjwAiIiIiIiIiIiIiI4oiL6IiIiIgzuIV4iIiIhndo53KIiIiB/WvXoYiIiIfEZfWBSIiIEGi/foqoiIgzuL84i9iIjpGIoMiEHoiMkos3FojmiLlUipYliEWIF+iDe0GoRa7D6GPbjcu1yIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'); // http://en.wikipedia.org/favicon.ico
      newHTML += newLink('YouTube',         'http://www.youtube.com/results?search_query='+searchY,       'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAABNklEQVR42o2RMUgCcRTGf++SIGiIs6VZoWa3BqlBERyDpvYbpSnaWrPRxamlyURscKlcWqIaoigKk3MSnDqdCgL1Ndx152VdfcP/8d7/fe99fA9VfaoX9vLzqpqxakeXXY0EXoDBsQL6F7yO55MC4I4/L+UAq3jjDvLfEOGtVwVaw/F7r+o3tYbjaYJBJA634y8jnazE3CAiAKpzS5tnpZyIWMXr5RkZrW2txIyMVfMJ4m78P2K02+RXXTJEkhVOr0QTJrbjlZJxfzP260QawABILoa7iVhlBN+pNLaDgu2QSgPYDuUKQLnCbYf6ReBSANcuX6HtsLNPNgtA9yfCb2I8wRImNJuBAXf32A6NBge7GILt8PDIxrpowhx89F0t0yf5uicCCAuzpgCaMAM3v0sKVaTT/wTQY9zll7taLwAAAABJRU5ErkJggg=='); // http://s.ytimg.com/yt/favicon-vflZlzSbU.ico
      newHTML += newLink('Google',          'http://www.google.com/search?q='+searchY,                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABnRSTlMAAAAAAABupgeRAAACuElEQVR42gXBS2icVRQH8P85937zyuQxk5k0oY2NnZEGJYs2ohCkAattF9oKSnFhbUFQt+qy26rduFHctD5wE4uIIoIYJCDU1gc+mrbG6BQS0qbRMaYz6by+7957jr8fADivP9fWJk7O2Sc+euPTxaA+bt65ODvzOyFhDkAAdwhbAAD2To3BmQtLq71h2fHA2a/+XdnopPr7p989X+zLGREiAxIAArvKYGMRvL/+jyA/KMZsd6OPf1wFTGby/njmEQ8SDh6UqFHyKmAVWLI7hjKcCCNmMtdXPMiTQejPORgjsMqGQqJwbCyxADg8Vbr0x4ZNF0RiZiswHKO+tLw+xnf6C1GCkUarvO2cBntjrVG5p/jikercxZvLfzcHsnJqdheBzs2/d+Zw7+Z9+wylQpBsx+270X3q8hrtff7D1089/PTsZKPtvvhlfaYyWBkvnJ0/f/qnd8zoIESDBIDJkXJELUPl4xdc3No/kXt0evT0cwdA+m3t14PvH5fqCIRBoCQCoM6Tj+CJiybJpzKXa7235v5arbdVzZ7izmplP+IeC3OwCk+ihIgA5YRdY3NXNj76YOnEkcnGdlDC+PDYpWfPHSod0E5LlKBGCAqIAi6iuW+uPD49NVxg31za+q/W2b49Vn0mky+74I998urXGwuaGkAw7ESCQQBp0NbmYu37lwu4aqOOxtxykzsPfj5QrCzXbz30wcm7ucR4o4HEEzw4lvafCy/da3/YXe6NDuRKQ+kSLdW/e0XBe0u7R/tGELtAKgGRj8jDJs163t/KREN3W568kYBcthh66+TaXe7rtdqgiH1KyAUNKsrZoYl0+bH2ltdeTkPKUj50TXrsSU3lv/xt/nZzgwJTEHRZEoGkbGTZtTYbi+PavEau42wmXT2UmXrh2trKa5+9Hazh2AYQNAAR3lz4H5/FZqSBRAEUAAAAAElFTkSuQmCC'); // http://www.google.com/favicon.ico
      newHTML += newLink('Amazon',          'http://www.amazon.com/s?tag=altor02-20&linkCode=ur2&camp=1789&creative=390957&field-keywords='+search, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAA7DAAAOwwHHb6hkAAABZElEQVR4nGP8//8/AymABY1/69atuXPn3rt/n5GR0dfHJzY2Fl3HfyRw5swZZlZWFiRUVlb2HxWgaEhLTwcqcnF1vXHjBoQtIyuLpoER2Q/Pnz9/9uzZx48fP33+vGzZsvXr1wMFf//6hdNJN2/eNDAyYkF1FT4nhYaFAVUA9QDtmTxlClYNTMi2QdwQEhIiKSl56dIliODnz59xOsnA0BBiKtDf8OACWoXhpK/P4MEqLSsLVAQkgepCwsKcXV0/v3v+78ai/6eKQAgaSlu0GWzWMQioY4/b/cEMPAoMbAIM1+sYIiA2PN3zfwXD/5NF/z8/+48Jvjz9f3/t//c3/q8VRoqHh+sZTgSBGAK2DBKuDKx8DEBhRkaGl/sZXm5gsFwHEnl9jEG/FiniXp9huNLK8GoDA1gApB5I8WgyGE5ikHZh+A0OK1ZelJgGgQ83GV4fZ/j9EaRDQIdB2hnNRxgaCAEAOXg/pIgPyAsAAAAASUVORK5CYII='); // http://www.amazon.com/favicon.ico
      newHTML += newLink('Filmow',          'http://filmow.com/buscar/?q='+search,                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAD FUlEQVR4nFVTWU8TURQ+s3Sblu4ICKRpY8ISlorUkLAIj+KjT5qY+CdM9MXw5A/gEd7E8GQwcUPD IlKIJiyiIYUEgaE0tLQ00E6nlM50xnNv2TzJzb333POd853lMnBNhoeHTU6nM9jc0jLIcVxnhc3W IAiCU1GUoiRlY2pJW08cHIRjsRhZ0aGhoSJzAR4bG6vp7Ox87vF6H52eFtySJLEoDDoC3IFhGd1i NoPRaFTQ/PD4+Hj659LSG+pgfHy8qq+vb6Soqg92d3a5k+MT0FHPcTwYDDwgCzCZTHg2gNmMu9EI lV4PxOPxZR5pmDs6Ol6eFs4GP3z8xGmaBgYE8gg0WyzgdrtBlmVQVBUYhgEux4HNZgWnw146Sqe/ sMFgMOT2eB7PfZ/ns9ks5OU8FM4KwLEcmDEqocjxPFjQmVWwAgmgaTpJJRtZX3/P+/z+h/uxmAPp lIuBiLa2Vgi2t4NFsEA8kYDpqRlQkYHf74e6+nqwV9j0RCK+nEqlNlijge8Vd0VG13WKDwT80Nvb A06XE/M1QwBBAwP9kJWysLAQhnA4TPRa/CA+jenLvMPh9GWQOoGTHAOBAPBImTikTnHV1t4Eu91B jpDJZAA7RGw1EpAts2aoYdlev5wL4pDKlYrqmKsrsOhRdDjs58Y6bP/dpvlegBmcgej+Psi5HL2b TEYQrIKaTKcPCIBVisV5LI5+AdgVRZid/QbpdBpyORk2NzdhBu+qVqLsqm5UkRpk9nZ2fhN7XhTF t909PU/r6+pc4t4eNVr9tQaRjU06OHJeBq1E06VDdafjtp5MpaYLhcI2TSEaja4kDw9f3+vvU8nQ XLQSDWixdK1cADLOd0MhqKysjP1YXBzGDhSInpucnCx1dXWt+ny+hqamxlv5/CkrSTk6MLRguFwu F/T2dAO+J5dWV168m5j4GolE9PNYZRkdHa0KhULPqmtqnuDoeo6O0qyiKuCw28Hr9Z7lJOnPytra q9mpqc8jIyPKZVeuf2ekZayurm5rbG6+bxWEVl3TLPiVEzuiOLe9tTWD74f/NxXgHxVWbp9ZcHXF AAAAAElFTkSuQmCC');
      tw.innerHTML += newHTML;
   }
})()