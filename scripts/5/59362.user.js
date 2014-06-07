// ==UserScript==
// @name           Unit Renamer
// @version        1.0
// @namespace      overkill_gm
// @description    Rename your units to suit your tastes
// @include        http://s*.ikariam.*/index.php*
// ==/UserScript==


function debug() { var msg = []; for (var i = 0, n = arguments.length; i<n; ++i) msg.push(arguments[i]); setTimeout(function() { throw new Error("[debug] " + msg.join(' ')); }, 0);}

$ = document.getElementById;
function $x( xpath, root ) { var doc = root ? root.evaluate ? root : root.ownerDocument : document, next; var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = []; switch (got.resultType) { case got.STRING_TYPE: return got.stringValue; case got.NUMBER_TYPE: return got.numberValue; case got.BOOLEAN_TYPE: return got.booleanValue; default: while (next = got.iterateNext()) result.push( next ); return result; } } 
function $X( xpath, root ) { var got = $x( xpath, root ); return got instanceof Array ? got[0] : got; } 
function node(type, className, styles, content) { var n = document.createElement(type||"div"); if (className) n.className = className; if (styles) for (var prop in styles) n.style[prop] = styles[prop]; if (content) n.innerHTML = "string" == typeof content ? content : content.toXMLString(); return n; } 
function remove(node){ if (node) return node.parentNode.removeChild(node); }
function onClick(node, fn, capture, e) { node.addEventListener((e||"") + "click", fn, !!capture); }
function getTrailingId(s){ return parseInt(s.substring(s.lastIndexOf('=') + 1),10); }


// ********************* START *************************************
if ($('servertime')) {

switch (document.body.id) {
  case 'barracks' :
  case 'shipyard' :
    function findTextNode(elem){
      for (var i = 0; i < elem.childNodes.length; ++i) if (elem.childNodes[i].nodeType == 3) return elem.childNodes[i];
      return false;
    }
    function editInPlace(){
      var self = this;
      var name = self.firstChild;      // assume firstChild is the text node out of laziness
      if (name.nodeType == 3){
        var input = node('input','',{fontSize:'14px',fontWeight:'bold',lineHeight:'22px',background:'transparent',border:'1px dashed tan',color:'Peru'});
            input.value = name.nodeValue;
            input.id    = 'createAlias'+getTrailingId($X('../a',self).href)
        self.insertBefore(input,self.firstChild);
        name.nodeValue = '';
        input.focus();
        input.addEventListener("blur",function(){
          var newSelf = this, newText;
          var id = newSelf.id.replace(/\D+/g,'');
          var aliases = eval(GM_getValue('troopAliases',{}));
          if (newSelf.value) {
            newText = aliases[id] = newSelf.value;
          } else {
            delete aliases[id];
            newText = '(reset)';
          }
          GM_setValue('troopAliases',uneval(aliases));
          findTextNode(newSelf.parentNode).nodeValue = newText;
          remove(newSelf);
        },false);
      }
    }
    var troopAlias = eval(GM_getValue('troopAliases',{}));
    for each (var unit in $x("//ul[@id='units']/li/div[1]")) {
      var alias = troopAlias[getTrailingId($X('./a',unit).href)];
      onClick($X('./h4[1]',unit),editInPlace);
      if (alias) $X('./h4[1]/text()',unit).nodeValue = alias;
    }
    

  break;
  case 'blockade' :
  break;
  case 'merchantNavy' :
  break;
  case 'safehouseReports':
  break;
  case 'workshop' :
  break;
}
}

