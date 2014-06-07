// ==UserScript==
// @name       Alignment Analysis
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://www.ebi.ac.uk/Tools/services/web/toolresult.ebi*
// @copyright  2012+, Greg Littlefield
// ==/UserScript==

 
 toReset = new Array();
 loadedColor = "#fbfbfb";
 selectedColor = "#f0f0d8";
 var display;
 
function select(e) {
console.log(getPos(e.target));
    var i;
    for(i=toReset.length;i>0;i--) {
        var popped;
        if((popped = toReset.pop()).style) {
            popped.style.textDecoration="none";
            popped.style.backgroundColor=loadedColor;
        }
    }
    e.target.style.backgroundColor=selectedColor;
    var column = getColumn(e.target),k;
    var exact=0, similar=0, mismatch=0, gap=0;
    for(k=0; k<column.length; k++) {
        if(e.target.className==column[k].className)exact++;
        else if(window.getComputedStyle(e.target).color==window.getComputedStyle(column[k]).color)similar++;
        else if(column[k].textContent=="-")gap++;
        else mismatch++;
        column[k].style.backgroundColor=selectedColor;
        toReset.push(column[k]);
    }
        e.target.style.textDecoration="underline"
	
	
	var div = document.getElementsByTagName("body")[0];
if(!display) {	
	display = window.document.createElement( 'div' );
	display.style.position="absolute";
	display.style.left="850px";
	display.style.width="200px";
	display.style.height="135px";
	display.style.backgroundColor=loadedColor;
	display.style.border="thin solid #808080" ;
	display.style.padding="5px"; 
	}
	else {
	div.removeChild(display);
	}
	
	display.innerHTML = "<table><tr><td>Selected: </td><td>"+e.target.textContent+"</td></tr><tr><td>Exact matches: </td><td>"+(exact/column.length*100)+"%</td></tr><tr><td>Similar matches: </td><td>"+(similar/column.length*100)+"%</td></tr><tr><td>Mismatches: </td><td>"+(mismatch/column.length*100)+"%</td></tr><tr><td>Gaps: </td><td>"+(gap/column.length*100)+"% </td></tr></table>";
	
	
	display.style.top=getY(column[0])+"px";
	div.appendChild(display);
} 
 
function separateDupChars() {
//var before = (new Date).getTime();
//var classes=["NotAA","A", "V", "F", "P", "M", "I", "L", "W", "D", "E", "R", "K", "S", "T", "Y", "H", "C", "N", "G", "Q"];
spans=document.getElementsByTagName("span");
spanlen = spans.length;
dupi=0;
separateDupChar();
//console.log((new Date).getTime()-before);
}
stepsize=10;
function separateDupChar() {
var stepi;
for(stepi=0;stepi<stepsize;stepi++){
	if(dupi>=spanlen)return;
	var span = spans[dupi];
var classj=span.className, classjlen=classj.length==1;
//for(j=0; j<classlen; j++) {
    if(classjlen==true||classj=="NotAA") {
    var text=span.innerHTML;
    if(text.length>1) {
     var textlen= text.length
          if(classjlen==true||(/^(-)\1+$/).test(text)){
          var k;
          for(k=0; k<textlen; k++) {
	         var node = window.document.createElement( 'span' );
	         node.className=classj;
	         node.style.backgroundColor = loadedColor;
	         node.textContent=classjlen==false?"-":classj;
             span.parentNode.insertBefore(node,span.nextSibling);
             node.addEventListener('click', select, true);
          }
          span.parentNode.removeChild(span);
          spanlen+=textlen-1;
          dupi+=textlen-2;
        }
      } 
      else {
        span.addEventListener('click', select, true);
        span.style.backgroundColor = loadedColor;
      }
     //break;
    }
	dupi++;
	}
	//separateDupChar();
	setTimeout(separateDupChar,0);
}
separateDupChars();


function getPos(node) {
if(!node)return 0;
var pos=0;
while(node.previousSibling&& node.previousSibling.nodeType!=3) {
 node=node.previousSibling;
 pos++;
}
return pos;
}



function getColumn(node) {
    var column = new Array();
    var pos = getPos(node);
    while(node.previousSibling) {
      node=node.previousSibling;
      if( (node.nodeType==3 && (/\n.*\n/g).test(node.textContent)) || (node.textContent.length>1&&node.className=="NotAA") )break;
    }
    console.log("begin",node);
    while(node.nextSibling) {
      node=node.nextSibling;
      if( (node.nodeType==3 && (/\n.*\n/g).test(node.textContent)) || (node.textContent.length>1&&node.className=="NotAA") )break;
      else if(getPos(node)==pos) {column.push(node);console.log(node);}
    }
    console.log("end",node);
    return column;
}

function getY( oElement )
{
var iReturnValue = 0;
while( oElement != null ) {
iReturnValue += oElement.offsetTop;
oElement = oElement.offsetParent;
}
return iReturnValue;
}