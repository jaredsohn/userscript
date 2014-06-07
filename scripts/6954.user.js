// ==UserScript==
// @name          Paul Graham click-to-inline footnotes
// @version       1.5: Handle old posts, pre-processing unlinked [#]s.
// @version       1.4: Also show HTML comments.
// @version       1.3: Bugfix: never inject the same footnote twice.
// @version       1.2: More resilient; registers only one listener, to body.
// @version       1.1: Added linkage both ways, and paulgraham.com inclusion.
// @namespace     https://github.com/johan/user.js
// @require       https://raw.github.com/gist/3886769/2bda951e516c93bd9625ed2d1b168a0a7d98a078/on.js
// @description   Allows you to click footnote references at paulgraham.com to bring them to your eyes, rather than bring your eyes to the footnotes. (And afterwards, finding your way back.) Now with corresponding feature to unfold HTML comments.
// @include       http://paulgraham.com/*
// @include       http://www.paulgraham.com/*
// ==/UserScript==

// pre-process pass:

on({ dom: { rawtext: 'xpath* //text()[contains(.,"[")][not(ancestor::script)]' }
   , ready: linkify // turns all unlinked old-style [\d+]s into new-style links
   });

// comment inlining:

on({ dom: { comments:  'xpath* //comment()'
          , footlinks: 'xpath* //a[starts-with(@href, "#f")][font]'
          , footnotes: [ 'xpath* //a[starts-with(@name, "f")]'
                       , { self: 'xpath .'
                         , head: 'xpath preceding::text()[1]'
                         , tail: 'xpath ((following-sibling::a[@name][1]'
                                      + '|following-sibling::b[1]'
                                      + ')/preceding-sibling::br[2]'
                                     + '|following-sibling::br[last()-1]'
                                     + ')'

                         }
                       ]
          }
   , ready: init
   });

function init(dom) {
  var links   = []
    , targets = []
    ;
  dom.comments.filter(hasText).forEach(showComment);

  dom.footlinks.forEach(function(a) {
    var id = a.hash.slice(1)
      , no = id.replace(/\D+/g, '')
      , to = document.anchors.namedItem(id)
      ;
    links[no] = a;
    a.name = 'f'+ no +'n-back';
    a.addEventListener('click', unfold, false);
  });

  dom.footnotes.forEach(function(note) {
    var a  = note.self
      , no = a.name.replace(/\D+/g, '')
      ;
    a.href = '#f'+ no +'n-back';
    targets[no] = note;
  });

  function unfold(e) {
    var a = e.target.parentNode, no = links.indexOf(a), f = targets[no];
    a.removeEventListener('click', unfold, false);
    e.preventDefault();
    e.stopPropagation();
    f = copyBetween(f.head, f.tail, f.self);
    a.parentNode.replaceChild(f, a);
  }
}

function copyBetween(start, end, node) {
  var range = document.createRange();
  range.setStartAfter(start);
  range.setEndBefore(end);
  return range.cloneContents();
}


// 1st [1] => <font color="#999">[<a href="#f1n"><font color="#999">1</></>]</>
// 2nd [1] => [<a name="f1n"><font color="#000">1</font></a>]
function linkify(dom) {
  function html(s)    { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function link(node) {
    var frag = document.createDocumentFragment()
      , temp = document.createElement('div')
      , move;
    temp.innerHTML = node.nodeValue.split(ref_re).map(function(no, i) {
      if (!(i & 1)) return html(no);
      if (!linked[no]) { // first time seen => link site
        linked[no] = no;
        return '<font color="#999">[<a href="#f'+ no +'n"><font color="#999">' +
               no + '</font></a>]</font>';
      }
      else { // second time seen => anchor / target site
        return '[<a name="f'+ no +'n"><font color="#000">'+ no +'</font></a>]';
      }
    }).join('');
    while ((move = temp.firstChild))
      frag.appendChild(move);
    node.parentNode.replaceChild(frag, node);
  }
  function hasRef(x) {
    return x = /\[(\d+)\]/.exec(x.nodeValue), x && x[1];
  }
  var ref_re = /\[(\d+)\]/g
    , linked  = []
    ;
  dom.rawtext.filter(hasRef).forEach(link);
  return linked;
}


// (html comments):

function hasText(x) {
  return x.nodeValue.replace(/<[^>]*>|^\s+|\s+$/g, '').length;
}

function showComment(c, n) {
  n = String.fromCharCode(n + 'a'.charCodeAt());

  var s = document.createElement('span');
  var a = document.createElement('a');
  s.style.color = '#777';
  a.style.color = '#444';

  a.name = 'comm-'+ n;
  a.href = '#'+ a.name;
  a.textContent = n;
  a.addEventListener('click', expandComment, true);

  s.appendChild(document.createTextNode(' <'));
  s.appendChild(a);
  s.appendChild(document.createTextNode('> '));
  c.parentNode.insertBefore(s, c);
}

function expandComment(e) {
  e.stopPropagation();
  e.preventDefault();
  var me = e.target;
  var lt = me.previousSibling; lt.nodeValue = ' <!-- ';
  var gt = me.nextSibling; gt.nodeValue = ' --> ';
  var rc = me.parentNode.nextSibling;
  var rp = me.parentNode;
  var span = document.createElement('span');
  //span.innerHTML = ': '+ rc.nodeValue;
  //rp.insertBefore(span, gt);
  //me.removeEventListener('click', expandComment, true);
  span.innerHTML = rc.nodeValue;
  rp.replaceChild(span, me);
}
