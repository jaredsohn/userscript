// ==UserScript==
// @name           myPay virtual keyboard remover
// @namespace      myPay
// @description    removes the stupid virtual keyboar from mypay site
// @include        https://mypay.dfas.mil/mypayVK.aspx
// ==/UserScript==

var inputNode, vkNode;

//utility functions
function GetNode( node )
{
    // get virutal keyboard nodes and remove them
    return document.evaluate(
        node,
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
}
function RemoveNode( node )
{
    // get virutal keyboard nodes and remove them
    vkNode = GetNode( node );
    vkNode = vkNode.snapshotItem(0);
    vkNode.parentNode.removeChild(vkNode);
}


// get body node and remove keydown hook
inputNode = GetNode( '//body' );
inputNode.snapshotItem(0).removeAttribute('onkeydown'); 

//get form node and remove key press hook
//inputNode = GetNode( '//form[@name="Form1"]' );
//inputNode.snapshotItem(0).removeAttribute('onKeyPress');


// get pin input node and make it usable again
inputNode = GetNode( '//input[@readonly]' );
inputNode.snapshotItem(0).removeAttribute('readonly'); 
inputNode.snapshotItem(0).setAttribute('onKeyPress','javascript:return onEditKeyPress(event);');


//remove virtual keyboard nodes
RemoveNode( '//blockquote' );
RemoveNode( '//td[@id="vk"]' );
RemoveNode( '//img[@src="image/mouse.jpg"]' );
RemoveNode( '//div[@class="centered"]' );

//not sure why, but they seem to be specifically adapting to block my script
//so we will play the back and forth work around game
inputNode = GetNode( '//body' );

var child = document.createElement('p');
child .setAttribute('id','HyperLink1');
inputNode.snapshotItem(0).appendChild(child);

var child = document.createElement('p');
child .setAttribute('id','vk');
inputNode.snapshotItem(0).appendChild(child);



//hook keyboard input to put in scrambled input
var newjs = 
'function onEditKeyPress(e) {'+
'    SubmitIt(e);'+
'    var pos;'+
'    var keychar = String.fromCharCode(e.which).toUpperCase();'+
''+
'    pos = ("0123456789").indexOf( keychar );'+
'    if( pos>= 0 ) '+
'        document.Form1.newPin.value += array_PosNumbersRow[pos];'+
''+
'    pos = ("!@#$%+^*=_").indexOf( keychar );'+
'    if( pos>= 0 ) '+
'        document.Form1.newPin.value += array_PosSpecial[pos];'+
''+
'    pos = ("QWERTYUIOP").indexOf( keychar );'+
'    if( pos>= 0 ) '+
'        document.Form1.newPin.value += array_PosLettersTopRow[pos];'+
''+
'    pos = ("ASDFGHJKL").indexOf( keychar );'+
'    if( pos>= 0 ) '+
'        document.Form1.newPin.value += array_PosLettersMiddleRow[pos];'+
''+
'    pos = ("ZXCVBNM").indexOf( keychar );'+
'    if( pos>= 0 ) '+
'        document.Form1.newPin.value += array_PosLettersBottomRow[pos];'+
''+
'    if( e.keyCode==8 ) '+
'        document.Form1.newPin.value = document.Form1.newPin.value.substring(0, document.Form1.newPin.value.length-1);'+
''+
'    if( e.keyCode==9||e.keyCode==16||e.keyCode==46||(e.keyCode>=35&&e.keyCode<=40) )'+
'        return true;'+
'    return false;'+
'}';


//add onEditKeyPress;

vkNode = GetNode('//head')
var newscript = document.createElement('script');
newscript.setAttribute('type','text/javascript');
newscript.setAttribute('id','myscript'); // optional
newscript.innerHTML=newjs;
inputNode.snapshotItem(0).appendChild(newscript);
