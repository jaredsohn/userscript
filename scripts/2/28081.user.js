// ==UserScript== 
// @name          BH IMDB/Word Highlight
// @namespace     http://userscripts.org/users/55201
// @description   Kiemeli (1) az IMDB ertekeleseket, ill. (2) a megadott szavakat. Tamogatott oldalak: BH, nCore.
// @date          2008.06.08. (yyyy.mm.dd)
// @update        2013.05.20. (yyyy.mm.dd)
// @version       0.2.2
// @author        Jabba Laci (jabba.laci@gmail.com)
// @include       http*://bithumen*/browse.php*
// @include       http*://ncore*/torrents.php*
// @grant         none
// ==/UserScript==

// (1)
// Eleged van a ratyi filmekbol, s tul sok idot toltesz el a jo filmek 
// kibogaraszasaval? Akkor ez a szkript neked keszult. Beallithatod pl.,
// hogy a legalabb 7.0-s IMDB ertekelest kapott filmek zold hatterszinnel
// jelenjenek meg. Ez nagyban leegyszerusiti a bongeszest. 
//
// (2)
// Definialhatsz egy listat, s az ebben a listaban szereplo szavak egy megadott
// hatterszinnel lesznek kiemelve. Pl. megadhatod a kedvenc sorozatod
// cimet, a kedvenc release csapat nevet, stb.

(function() 
{
   var ratingColorArray = new Array();

   //
   // START: az itt kovetkezo nehany sort modosithatod
   //
   ratingColorArray[7] = 'lightgreen';          // IMDB 7.x szine
   ratingColorArray[8] = 'lightsteelblue';      // IMDB 8.x szine
   ratingColorArray[9] = 'plum';                // IMDB 9.x szine
   //
   var words=/(.*)(lost|futurama|dexter)(.*)/ig;   // kiemelendo szavak, '|' jellel elvalasztva
   var wordsColor = 'yellow';                      // kiemelendo szavak hatterszine
   //
   // STOP: OK, itt akar meg is lehet allni :)
   //

   var textnodes, node, s; 
   var before, imdb, after, rating, word;
   var hl;
   var imdbClass = "imdb";   // IMDB highlight
   var hlClass   = "hl";     // normal highlight

   textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

   for (var i = 0; i < textnodes.snapshotLength; ++i) 
   {
      node = textnodes.snapshotItem(i); 

      if ( (node != null) && (node.nodeName == '#text') && (/\S/.test(node.nodeValue)) )
      {
         s = node.data; 

         if ( s.match(/(.*)(imdb:\s*\d\.\d)(.*)/i) )   // if it's an IMDB rating
         {
            before = RegExp.$1;
            imdb   = RegExp.$2;
            after  = RegExp.$3;
            if ( imdb.match(/imdb:\s*(\d)\.\d/i) )
            {
               rating = RegExp.$1;
               //if (rating >= 7) 
               if (ratingColorArray[rating] != null) 
               {
                  hl = document.createElement('span');
                  hl.className = imdbClass;
                  hl.style['backgroundColor'] = ratingColorArray[rating];
                  hl.appendChild( document.createTextNode(imdb) );
                  //
                  node.parentNode.insertBefore( document.createTextNode(before), node );
                  node.parentNode.insertBefore(hl, node);
                  node.parentNode.insertBefore( document.createTextNode(after), node );
                  node.parentNode.removeChild(node);
               }
            }
         }
         else   // if it's not an IMDB rating, i.e. normal highlighting
         {
            if (words.test(s)) 
            {
               before = RegExp.$1;
               word   = RegExp.$2;
               after  = RegExp.$3;
               //
               hl = document.createElement('span');
               hl.className = hlClass;
               hl.style['backgroundColor'] = wordsColor;
               hl.appendChild( document.createTextNode(word) );
               //
               node.parentNode.insertBefore( document.createTextNode(before), node );
               node.parentNode.insertBefore(hl, node);
               node.parentNode.insertBefore( document.createTextNode(after), node );
               node.parentNode.removeChild(node);
            }
         }
      }
   } // for
})();
