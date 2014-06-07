// ==UserScript==
// @name        gmane.org collapse
// @namespace   http://griffeltavla.wordpress.com
// @description Collapses cited text on gmane.org
// @version     1.0
// @author      tinjon@gmail.com
// @include     http://comments.gmane.org/gmane.*
// @require     http://code.jquery.com/jquery-1.7.1.min.js
// ==/UserScript==

function groupLines(lines) {
  var sections = [], prevLineNo, slines;
  lines.forEach(function(line){
    if (line.lineNo-1 != prevLineNo) {             // A new section, so jot it down as such,
      sections.push({                              //   and create a new structure for saving its lines.
        lineNo: line.lineNo,                       // The line the section starts at relative its parent.
        quoted: line.quoted,                       // Whether the sections denotes a quoted block or not.
        parent: line.parent,                       // The parent node of the section block
        lines:  []                                 // The lines in the section
      });
    }

    slines = sections[sections.length-1].lines;
    slines.push(line.line);                      //   Add the current line to the current section
    prevLineNo = line.lineNo;
  });
  return sections;
}

function getTextSectionsFor(el) {
  var comment = [], quoted = [], sections;
  el.innerHTML.split(/<br>|\n/).forEach(function(line,i){
    var o = { lineNo:i, line:line, parent:el, quoted:false};
    if(line.match(/^\s*(&gt|>);/)) {
      o.quoted = true;
      quoted.push(o);
    } else {
      comment.push(o);
    }
  });
  sections = [[],comment,quoted].reduce(function(l,kind){ // group all quoted and user authored sections into one list
    return l.concat( groupLines(kind) );
  }).sort(function(a,b){                                  // make sure all sections are ordered as they were written.
    return a.lineNo > b.lineNo;
  });
  return sections;
}

function collapseComments(){
  $('<style type="text/css">'+
    '.comment-block .text-block{ display:none; border-left:0.2em solid #E0E0E0; border-radius:0.9em; padding-left:0.5em; }' +
    '.comment-block .quote-header{ color:blue; font-weight:bold; font-weight:bold; font-family:monospace; cursor:pointer; }' +
  '</style>').appendTo('head');

  $('.blogbody pre, .blogbody p').each(function(){
    var sections = getTextSectionsFor(this), $this=$(this);
    $this.html("");
    sections.forEach(function(section){
      var html  = '<div class="text-block">'+ section.lines.join("<br>") +'</div>';
      if (section.quoted) {
        html = '<div class="comment-block"><div class="quote-header">Quote [+]</div>'+ html +'</div>';
      }
      $(html).appendTo($this);
    });
  });
  $('body').click(function(evt){
    var $header = $(evt.target).closest('.comment-block .quote-header'), $text;
    if( !$header[0] ) return;
    $text = $header.closest('.comment-block').find('.text-block');
    if($text.is(':hidden')) {
      $header.html('Quote [-]')
      $text.show();
    } else {
      $header.html('Quote [+]')
      $text.hide();
    }
  });
}
collapseComments();
