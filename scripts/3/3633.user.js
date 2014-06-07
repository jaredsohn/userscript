// ==UserScript==
// @name          Ruby documentation letterifier
// @namespace     http://austar.com.au
// @description	  Splits into letters long lists of classes and methods in standard ruby doc generated html.
// @include       *fr_class_index.htm*
// @include       *fr_method_index.htm*
// ==/UserScript==
// 
// (C) 2006 Austar
// By Lachlan Cox, lcox@austar.com.au


// helpers
function $x(xpath_expression,context) {
  return document.evaluate(xpath_expression, (context||document), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
function $xs(xpath_expression,context) {
  return document.evaluate(xpath_expression, (context||document), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
function $t( text ) {
  return document.createTextNode( text )
}
function $e( element ) {
  return document.createElement( element )
}

// create an anchor using DOM
function mk_link(text) {
  var a = $e('a')
  a.style.background = null
  a.style.backgroundColor = null
  a.href = '#'
  a.appendChild( $t(text) )
  return a
}


// collect the letters and create links
function do_links( link_snap, get_char, header ) {
  var link_letter_order = []


  for( var i = 0; i< link_snap.snapshotLength; i++ ) {
    var link = link_snap.snapshotItem(i)

    var char = get_char(link)

    if( ! char ) continue

    // if the char is different from the last char...
    if( link_letter_order.length == 0 || char != link_letter_order[link_letter_order.length-1] ) {
      link_letter_order.push( char )

      var s = $e('div')
      s.style.background = '#aaa'
      s.style.borderTop = 'solid #777 1px'

      s.style.padding       = '3px'
      s.style.marginTop     = '20px'
      s.style.marginBottom  = '-7px'

      s.innerHTML = " &middot; "

      var a = mk_link(char)
      a.name = char

      var top = mk_link('^top')
      top.target = '_self'


      s.appendChild( a )
      s.appendChild( $t(' ') )
      s.appendChild( top )

      var br = $e('br')

      link.parentNode.insertBefore(br,link)
      link.parentNode.insertBefore(s,br)
      
      /* link.parentNode.insertBefore($e('hr'),s) */
    }
  }

  for( var j=0; j<link_letter_order.length; j++ ) {
    var char = link_letter_order[j]
    header.innerHTML += " <a href='#" + char + "' target='_self' style='color:#999'>" + char + "</a>"
  }
}

var word_regex       = new RegExp('^([^ ]+)')
var rails_class_regex  = new RegExp('classes/(.*?)\.htm')
var class_regex        = new RegExp('classes/(.)')
var caps_regex         = /[A-Z]/g

function get_caps(str) {
  var output = ""
  var m

  while(m = caps_regex.exec(str)) {
    output += m[0]
  }

  return output
}

var header;
var get_char;
var links = $xs('//a')

var loc = document.location

header = $x("//h1[@class='section-bar']") || $x("//div[@class='banner']")

// select the get_char function to use
if( /fr_class_index\.html?/.test(loc) ) {

  if( /api\.rubyonrails/.test(loc) || /caboo\.se/.test(loc) ) {
    get_char = function(link) {
      var match = rails_class_regex.exec(link.href)
      var bits = match[1].split('/')
      if( bits.length == 1 || !/^Act/.test(bits[0]) ) {
        return bits[0].charAt(0)
      } else {
        return get_caps(bits[0])+'::'+bits[1].charAt(0)
      }
    }
  } else {
    get_char = function(link) {
      var match = class_regex.exec(link.href)
      return match ? match[1] : null
    }
  }

} else if( /fr_method_index\.html?/.test(loc) ) {
  get_char = function(link) {
    var match = word_regex.exec(link.firstChild.nodeValue)
    return match ? match[1].charAt(0) : null
  }
}



do_links( links, get_char, header )
