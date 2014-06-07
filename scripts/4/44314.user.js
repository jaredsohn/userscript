// ==UserScript==
// @name          Citation wikitext generator
// @description   Generates {{citation}} wiki markup from Google Books links
// @namespace     http://code.google.com/p/random-code/
// @require       http://ecmanaut.googlecode.com/svn/trunk/lib/gm/wget.js
// @include       http://books.google.tld/*
// ==/UserScript==
//
// Copyright (c) 2009, Shreevatsa R.
// Released under the GNU GPL: http://www.gnu.org/copyleft/gpl.html
// either version 3 or (at your option) any later version.

/*
  From a Google Books link, generates wiki markup in the
  {{citation|...}} format, suitable for inclusion on Wikipedia:
  http://en.wikipedia.org/wiki/Template:Citation

  For example, when at the URL:
  http://books.google.com/books?id=_tnwmvHmVwMC&pg=PA5&dq=%22The+trouble+is%22
  you can click "Show citation" to get
  {{citation | title=Asymptotic Methods in Analysis | author1=N. G. de Bruijn | edition=3, illustrated | year=1981 | publisher=Courier Dover Publications | isbn=9780486642215 | page=5 | url=http://books.google.com/books?id=_tnwmvHmVwMC&pg=PA5&dq=%22The+trouble+is%22}}
  which is in the right format for Wikipedia, more or less.

  Notes
  =====
  Suggestions for improvement are very much welcome!

  Changelog:
  2009-03-15 First version
  2009-03-15 Remove unneeded @requires
  2009-03-15 Return to using wget
  2009-03-22 Take care of 'Published 1885' etc.
  2009-03-22 Handle translators and multiple info divs
  2009-03-22 Put year at the beginning, making it easier to sort by
  2009-03-23 Change the annoying first alert() to console.log()
  2009-03-23 Fix the multiple editors bug
  2009-06-14 Google changed (improved!) its markup last week; script rewritten.
  2009-07-04 Change include from "books.google.com" to "books.google.tld"
  2009-07-11 Refrain from adding "edition=illustrated".
  2009-07-19 Slightly longer "Don't know what to do with" message.
  2009-07-19 Changed Firebug-specific console.log() to GM_log
  2009-07-19 Add some code to clean up links first
  2009-07-22 Fixed bug in clean-up code
  2009-07-22 Warn on unrecognised page numbers
  2009-07-31 Google changed again. Other minor code improvements.
  2009-08-01 Apparently they changed the way multiple authors work too.
*/

if(!this.gbcitation && window === window.top) {
  var gbcitation = function () {

    function do_doc(url, func) { wget(url, func, /*runGM=*/false, /*div=*/false); }
    function assert(cond, str) { if (!cond) { throw new Error('Assertion failed: ' + str); } }
    String.prototype.startsWith = function(str) { return (this.indexOf(str) === 0); };

    function infoFromBook(doc) {
      var s = '';
      var nauthors=1;
      var neditors=1;
      var metadata_rows = doc.getElementById('metadata_content_table').childNodes[0].childNodes;
      for(var ti=0;ti<metadata_rows.length;++ti) {
        var mrow = metadata_rows[ti].childNodes;
        assert(mrow.length === 2);
        assert(mrow[0].className === 'metadata_label');
        assert(mrow[1].className === 'metadata_value');
        var label = mrow[0].innerHTML;
        if(label.startsWith('Original from') || label.startsWith('Digitized') ||
           label.startsWith('Length') || label.startsWith('Subjects') ||
           label.startsWith('Item notes')) {
          GM_log('Ignoring ' + label);
          continue;
        }
        GM_log('label is ' + label);

        var values = mrow[1].childNodes;
        var value = '';
        for(var vi=0; vi<values.length; ++vi) {
          if(vi%2 === 1) {
            assert(values[vi].nodeValue === ', ', "even ones are commas");
            continue;
          }
          value += (value==='' ? '' : ',') + values[vi].innerHTML;
        }
        value = value.replace('[','&#91;','g').replace(']','&#93;','g');
        GM_log('value is ' + value);

        if(label === 'Title') {
          s += ' | title = ' + value;
          continue;
        }
        if(label === 'Author' || label === 'Authors' || label === 'Translated by') {
          var authors = value.split(',');
          for(var aj=0; aj<authors.length; ++aj) {
            s += ' | author'+nauthors+'=' + authors[aj];
            if(label==='Translated by') { s+=' (transl.)'; }
            ++nauthors;
          }
          continue;
        }
        if(label === 'Compiled by' || label === 'Editor' || label === 'Editors') {
          var editors = value.split(',');
          for(var ej=0; ej<editors.length; ++ej) {
            s += ' | editor'+neditors+'='+editors[ej];
            ++neditors;
          }
          continue;
        }
        if(label === 'Edition') {
          if(value !== 'illustrated') { s += ' | edition='+value; }
          continue;
        }
        if(label === 'Publisher') {
          var year = value.match(/\d+$/); //A trailing sequence of digits
          if(year !== null) {
            s = ' | year='+year[0] + s;
            s += ' | publisher='+value.substring(0,value.length-year[0].length-2); //2 is for ', '
          } else {
            s += ' | publisher='+value;
          }
          continue;
        }
        if(label === 'Published') {
          var pyear = value.match(/\d+$/);
          if(pyear !== null) {
            s = ' | year='+pyear[0] + s;
          }
          continue;
        }
        if(label === 'ISBN') {
          var isbn = value.match(/\d+$/); //A trailing sequence of digits
          if(isbn===null || isbn.length<1) {
            alert('No match for trailing ISBN in "'+value+'".');
          } else {
            s += ' | isbn='+isbn[0];
          }
          continue;
        }
        alert('Don\'t know what to do with "'+label+': ' + value +'"');
      }
      return s;
    }

    function showCitationFromInfo(info, url) {
      //alert('Looking for citation from info '+info+url);
      var s = '{{citation';
      s += info;
      var pg = url.match(/&pg=PA(\d+)/i);
      if (pg!==null) {
        if(pg.length<2) { alert('Too short match in pg: '+pg[0]+' only.'); }
        s += ' | page='+pg[1];
      } else {
        if (url.match(/&pg=/i)!==null) {
          alert('Page number is not PAsomething.');
        }
      }
      s += ' | url=' + url + '}}';
      alert(s);
    }

    function showCitationFromPage() {
      var u = cleanURI();//location.href;
      var book = u.split('&')[0];
      GM_log('Getting info from '+book);
      do_doc(book, function(doc) {
          var info = infoFromBook(doc);
          showCitationFromInfo(info, u);
        });
    }

    function cleanURI() {
      var o = location.href; var hash = o.indexOf('#');
      if(hash > -1) { o = o.substr(0,hash); }
      var q = o.indexOf('?'), prefix = o.substr(0,q+1), u = o.substr(q+1), nu='';
      var parts = u.split('&');
      for(var i=0; i<parts.length; ++i) {
        var [p, v, e] = parts[i].split('='); assert(typeof e === 'undefined');
        GM_log(p + ' is ' + v);
        if(p!=='hl' &&               //language of the interface
           p!=='ei' &&               //Some user-specific (cookie-specific?) constant
           p!=='ots' && p!=='sig' && //Similar long sigs, don't know what
           p!=='source' &&           //how you got there: gbs_hpintrst, bl(?) etc.
           p!=='lr' &&               //restrict searches to a language
           p!=='as_brr' &&           //as_brr=3 restricts to books with preview
           p!=='printsec' &&         //e.g. printsec=frontcover
           p!=='sa' &&               //e.g. sa=X
           p!=='oi' &&               //e.g. oi=book_result
           p!=='ct' &&               //e.g. ct=result
           p!=='resnum') {
          nu += (nu!=='' ? '&' : '')+p+'='+v;
        }
      }
      nu = prefix + nu;
      GM_log('new url is ' + nu);
      return nu;
    }

    //Add a link to the top bar
    function add_link(text, title, func) {
      var bar = document.getElementById('titlebar'); //formerly 'volumebartable'
      var link = document.createElement('a');
      link.title = title;
      link.innerHTML = text;
      var dofunc = function(event) {
        event.stopPropagation();
        event.preventDefault();
        func();
      };
      link.addEventListener('click', dofunc, false);
      //var lp = document.createElement('td');
      //lp.appendChild(link);
      //bar.childNodes[0].childNodes[0].appendChild(lp);
      bar.appendChild(link);
    }
    GM_log('Adding links to top bar');
    add_link('[Show citation]', 'Show a citation for this book', showCitationFromPage);
    add_link('[Clean up link]', 'Remove useless parameters from URI', function() { location.href = cleanURI(); });

  }();
 }
