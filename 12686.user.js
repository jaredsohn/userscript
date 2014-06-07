// ==UserScript==
// @name           Lunarstorm "Skriv dagbok"-länk
// @namespace      http://code.google.com/p/ecmanaut/
// @description    Lägger till länken "Skriv dagbok" på dagbokssidor utan den.
// @include        http://www.lunarstorm.se/blg/*
// @exclude        http://www.lunarstorm.se/blg/blg_compose.aspx
// ==/UserScript==

var td = $X('//td[@class="main shadowNoHeight"][.//*[.="Min blogg"]]' +
            '[not(.//a[contains(@href,"blg_compose.aspx")])]');
if (td) {
  var div = prependChild(
  <div class="hand" style="position:relative; width:100%; padding-top:6px;">
    <img style="position:absolute; left:11px; top:0px; width:37px; height:29px;"
         src="/_gfx/shortcut/blog_write.gif" alt=""/>
    <table style="width:100%;"><tbody><tr><td class="subl"/>
      <td style="padding-left:40px;" class="sub">
        <a class="mlink" onclick="CancelBubble(event);"
           href="blg_compose.aspx">Skriv dagbok</a>
      </td><td class="subr"/></tr></tbody>
    </table>
  </div>, td );
  div.addEventListener( "click", compose, false );
}

function compose() {
  location.href = "blg_compose.aspx";
}

function prependChild( e4x, node, doc ) {
  return node.insertBefore( importNode( e4x, doc || node.ownerDocument ),
                            node.firstChild );
}

// Great thanks go to Mor Roses for the basis for this method.
function importNode( e4x, doc ) {
  var me = importNode, xhtml, domTree, importMe;
  me.Const = me.Const || { mimetype: 'text/xml' };
  me.Static = me.Static || {};
  me.Static.parser = me.Static.parser || new DOMParser;
  xhtml = <testing xmlns="http://www.w3.org/1999/xhtml" />;
  xhtml.test = e4x;
  domTree = me.Static.parser.parseFromString( xhtml.toXMLString(),
                                              me.Const.mimetype );
  importMe = domTree.documentElement.firstChild;
  while( importMe && importMe.nodeType != 1 )
    importMe = importMe.nextSibling;
  return importMe ? (doc || document).importNode( importMe, true ) : null;
}

function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), next, result = [];
  switch( got.resultType ) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while( next = got.iterateNext() )
        result.push( next );
      return result;
  }
}
