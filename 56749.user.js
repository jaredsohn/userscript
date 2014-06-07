// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          onecent
// @author        Daniel C.
// @namespace     http://userscripts.org/users/105896
// @description   script to round the ".99" values in online shop prices, and do other things
// @include       file:///home/daniel/comp/*
// @include       http://fnac.pt/*
// @include       http://www.amazon.com/*
// @include       http://shop.lego.com/*
// ==/UserScript==

// CONFIGURATION
// Specify which cases are to be processed:

// $299 -> $300
CASE_99=true;

// $3.90 .. $3.99 -> $4.00
CASE_9X_CENT=true;

// $3.99 -> $4.00
CASE_99_CENT=true;

// $3.95 -> $4.00
CASE_95_CENT=true;


// the regular expression I use to find values

// the currency (optional); followed by zero or more space; the integer part, a separator and the cents (these two are optional)
// or the currency in the end...

// matches things like: $38, 28.4$, 19,99€

// nota: o \s faz match do &nbsp;

// podia usar [A-Z]{3} em vez de EUR|USD? existe o \b - word boundary?
// note: The (?: means I don't want to produce a reference here
//regexp=new RegExp("((?:€|\\$|EUR|USD) *)?([0-9]+)(([\.,])([0-9]+))?( *(?:€|\\$|EUR|USD))?");
currencies="(?:AED|AFN|ALL|ARS|ATS|AUD|BBD|BDT|BEF|BGN|BHD|BMD|BRL|BSD|CAD|CHF|CLP|CNY|COP|CRC|CYP|CZK|DEM|DKK|DOP|DZD|EEK|EGP|ESP|EUR|FIM|FJD|FRF|GBP|GRD|HKD|HRK|HUF|IDR|IEP|ILS|INR|IQD|IRR|ISK|ITL|JMD|JOD|JPY|KES|KRW|KWD|LBP|LKR|LUF|MAD|MTL|MUR|MXN|MYR|NLG|NOK|NZD|OMR|PEN|PHP|PKR|PLN|PTE|QAR|ROL|RON|RUB|SAR|SDG|SEK|SGD|SIT|SKK|THB|TND|TRY|TTD|TWD|USD|VEB|VEF|VND|XAF|XAG|XAU|XCD|XDR|XOF|XPD|XPF|XPT|ZAR|ZMK)"

regexpLeft="(€|\\$|"+currencies+")(\\s*)([0-9]+)(?:([\.,])([0-9]+))?"

regexpRight="([0-9]+)(?:([\.,])([0-9]+))?(\\s*)(€|\\$|"+currencies+")"

regexp=new RegExp(regexpLeft+"|"+regexpRight);

// PHASE ONE

// processes all the nodes
list = document.evaluate('//text()' ,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

// will collect all the text from the page to a single string
allText="";

// this will keep the relation between positions in the string and the text nodes
textMap=[];

for (var i = 0; i < list.snapshotLength; i++) {
  node=list.snapshotItem(i);
  textMap.push( { pos:allText.length, node:node } );
  allText+=node.textContent;
}

/*
// DUMP ALL THE nodeS:
GM_log("allText=[["+allText+"]]");
for (var n = 0; n<textMap.length; n++){
//for (var n = 360; n<380; n++){
  GM_log("textMap n="+n+", pos="+textMap[n].pos); //+ ",node="+textMap[n].node.textContent);
  if (n==textMap.length-1) 
  	conteudo=allText.substring(textMap[n].pos);
  else
       conteudo=allText.substring(textMap[n].pos,textMap[n+1].pos);
  GM_log("conteudo=["+conteudo+"]");
}
*/

// PHASE TWO

// here I will take notes of the changes to be done:
toDo=[];

startPos=0;

GM_log(allText);

while (match=regexp.exec(allText.substring(startPos))){

  // the absolute position of the match
  matchPos=startPos + match.index;
  matchLen=match[0].length; // the complete size of the match

  // advance the position to search for the next match
  startPos+=match.index+matchLen;

  if (match[1]){
    currencyLeft=match[1];
    spaceLeft=match[2];
    number=match[3];
    separator=match[4] || "";
    cents=match[5] || "";
    spaceRight="";
    currencyRight="";
  }else{
    currencyLeft="";
    spaceLeft="";
    number=match[6];
    separator=match[7] || "";
    cents=match[8] || "";
    spaceRight=match[9];
    currencyRight=match[10];
  }

  //GM_log("match!"+match[0]+" - "+currencyLeft+"|"+number+"|"+separator+"|"+cents+"|"+currencyRight);
  
  if (CASE_99 && number.match(/99$/) && (! cents || cents=="00")) {
    // example: €399 or 399.00$
    newNumber=""+(parseInt(number)+1);
    newCents=cents;
  }else if (CASE_99_CENT && cents=="99" || CASE_95_CENT && cents=="95" || CASE_9X_CENT && cents.match(/^9/) ){
    // example: 15,99$
    newCents="00";
    newNumber=""+(parseInt(number)+1);
  }else{
    continue;
  }

  // Mark changes to do:
  // each element of the regular expression can be in a different text node so
  // I will process then separately

  tt="era "+match[0];
  p=matchPos;

  toDo.push( {pos: p, len:currencyLeft.length, replaceText: currencyLeft, tooltip: tt} );
  p+=currencyLeft.length;

  // os espaços não precisam ficar
  //toDo.push( {pos: p, len:spaceLeft.length, replaceText: spaceLeft, tooltip: tt} );
  p+=spaceLeft.length;

  toDo.push( {pos: p, len:number.length, replaceText: newNumber, tooltip: tt} );
  p+=number.length;

  if (separator && newCents){
    toDo.push( {pos: p, len:separator.length, replaceText: separator, tooltip: tt} );
    p+=separator.length;

    toDo.push( {pos: p, len:cents.length, replaceText: newCents, tooltip: tt} );
    p+=cents.length;
  }

  //toDo.push( {pos: p, len:spaceRight.length, replaceText: spaceRight, tooltip: tt} );
  p+=spaceRight.length;

  toDo.push( {pos: p, len:currencyRight.length, replaceText: currencyRight, tooltip: tt} );

}

// PHASE THREE

// now I will create span elements to replace the texts
// Execute the changes in reverse order, so that they don't interfere
// with future nodes and positions

// this is the index of the node in the textMap, starting from the end
n=textMap.length-1;

for (var a=toDo.length-1; a>=0; a--){
  change=toDo[a];
  if (change.len==0) continue;

  // log
  original=allText.substring(change.pos,change.pos+change.len);
  GM_log("change "+original+" -> "+change.replaceText);

  // search for the node where the position is
  while (n>=0 && textMap[n].pos > change.pos) { n--; }
  if (n<0) {GM_log("erro..."); break; } // should never happen...

  node=textMap[n].node;

  // the position relative to this node:
  relPos=change.pos-textMap[n].pos;
  if (relPos + change.len > node.textContent.length) {
    GM_log("must be inside a single node!");
    GM_log("the node is "+node.textContent);
    continue;
  }

  //GM_log("esta no item "+n+", relPos="+relPos+",textContent="+node.textContent);

  var style = getComputedStyle(node.parentNode, '');

  // invert the text and background color:
  var color=style.color;
  var background=style.backgroundColor;
  // nem sempre funciona por isso...
  if (background=="transparent") {
      background="white";
  }

  var newNode=document.createElement("span");

  newNode.style.color=background;
  newNode.style.backgroundColor=color;
  newNode.innerHTML=change.replaceText;

  newNode.title=change.tooltip

  // split the node in three parts: Before the match, the match region and after
  // the match. No problem if this creates empty nodes.
  var node1=node.splitText(relPos);
  var node2=node1.splitText(change.len);

  node.parentNode.replaceChild(newNode,node1);

}