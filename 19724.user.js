// ==UserScript==
// @name           dAmn drAg'n'drop
// @namespace      =realillusions
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==

dragjs = document.createElement('script');
dragjs.appendChild(document.createTextNode((<r><![CDATA[

//Cheap $ and xpath function, I'm lazy
$hi = function(arg){
return document.getElementById(arg);
}
xpath = function(query){
return document.evaluate(query,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
}

//Global variables
var dragging = false;
var t=$hi('chatroomsettingslink');
var dragtabs=document.createElement('a');
var linkimage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAc5JREFUeNqslM0uQ0EUx89tS6OlFnpbVYmIXRE2EkQiLNl01XThCfAAxFo8gXcQK5GwEiIRJDbEx05EgkZvm9IvKan6nzG9GTfjY+Ekv57OzD3/mTlnZoxarUb/YR7+GZqYVPv8YBRMgWEQk/1X4Bhsg0NQqgec7O1+CinWARZBEgQdY8OSGbAGVsDDlxVJi4BVEP9lFzzBPOgEsyDFnS456ANLOpFIe5gi4ZBOMC5jfKoQ5yShnR/F+KEcCRlrb20amLovU49p4Q3DEHCVlUqbMnbHpSTyW2OBlmY/9XR3Cc9tRxHsrcXUEbfbTYGWZjKDbcJ7PB4Kh0I0PjYCb5LxdZ6Ys2q2SGc0QoP9vdQaCNBzPk9nF5eUyWZp/+CIHtMWvWsOsUs5bJ+n0dckRHg1jY0Nwg/09VK1WqXrm1sqFEtOjStV6LieC6/XK1aiGre535FoUmPrQlvA4o8qlYrYjmrc5n6NiCVjbSG+O+v8p1R+odPzS7IyWXp9fROe22X0a2xdxtrJLoNlEEUu4nf3KcrlnsR2eCUszjly2IaMKTurxndmDtwhKJkvFIMGEqvZTka5tCndpSV5mxfAJj8jEPnTMyIK9V8P24cAAwCmZqge10ErDgAAAABJRU5ErkJggg=='
var isdrag=false;
var x;
var toplevel=5
var dobj;
var farLeft = new Array();

//Add link to top bar; in "thread" borrowed from dAx
makeLink = function(){
help=xpath("//a[@class='damnc-helplink']")
helplink=help.snapshotItem(0)
//Set sorting link style and stuff
dragtabs.innerHTML='<img src="'+linkimage+'" style="position:relative;top:3px;>Drag';
dragtabs.addEventListener('click',function(){startDrag()},true)
dragtabs.setAttribute('style',"color:#2A3737;text-decoration:none!important;position:absolute;top:-2px;right:60px;cursor:pointer;");
helplink.parentNode.insertBefore(dragtabs,helplink);
}
try{makeLink()}
catch(e){setTimeout(makeLink,50)}

//Add dragging class and make sure CSS is all correct.
fixIDs = function(){
if(dragging==true){
for(var i=0; i<dAmnChat_tabbar.childNodes.length;i++){
//Thanks to the wonderful .withX class, have to append instead of add, and run checks against the string. Thanks dA!
dAmnChat_tabbar.childNodes[i].className+=" dragme";
dAmnChat_tabbar.childNodes[i].style.position="relative";
	}
 }
else{
for(var i=0; i<dAmnChat_tabbar.childNodes.length;i++){
//So much for removing attributes, now have to replace the class string with a lessened version of itself.
dAmnChat_tabbar.childNodes[i].className=dAmnChat_tabbar.childNodes[i].className.replace(/\sdragme/,"");
			}
	 }

}

startDrag= function(){
if(dragging==false){
dragging=true;
dragtabs.innerHTML='<img src="'+linkimage+'" style="position:relative;top:3px;>Set';
//Don't accidentally change tabs and mess things up
dAmn_objForEach(dAmnChatTabs,function(tab){
tab.tab_el.onclick=function(){return;}
});
//Hide (ok, technically remove) (+)more button, dAmn's rewitten Tabs_add function takes care of adding it back. If that disappears, will add in the Tree.createFragment() call.
morebutton = xpath("//span[@class='damnc-morelink']").snapshotItem(0);
morebutton = morebutton.parentNode.removeChild(morebutton);
fixIDs();
}
//finished dragging, reset everything
else{
dragging=false;
dragtabs.innerHTML='<img src="'+linkimage+'" style="position:relative;top:3px;>Drag';
fixIDs();
orderTabs();
}
}

//The actually sorting and setting. I bet this can be optimized.
orderTabs=function(){
for(var x in dAmnChatTabStack){
if(dAmnChatTabStack[x]==null){
dAmnChatTabStack.splice(x,1)}
}

var newTabs = new Array();
var tabNow = dAmnChatTab_active;

for(var i=0;i<dAmnChatTabStack.length;i++){
//Checking uses tab left edges; is simplest, most effective way. 
farLeft[i] = dAmnChatTabs[dAmnChatTabStack[i]].tab_el.offsetLeft;
}
//Sorts least to greatest, screen left is 0.
farLeft.sort(function(a,b){return a - b});

while(farLeft.length>0){
//Runs through all the arrays, checking for offsetLeft matches, and adds them to a new array to be copied to dAmnChatTabStack
if(farLeft[0] == dAmnChatTabs[dAmnChatTabStack[0]].tab_el.offsetLeft){
newTabs.push(dAmnChatTabStack[0]);
dAmnChatTabStack.shift();
farLeft.shift();
}
//If the initial check doesn't work, add it to the checking array again and process the next set. Continues until current array is empty.
else{temp = dAmnChatTabStack.shift();
dAmnChatTabStack.push(temp);}
}


for(var i=0;i<newTabs.length;i++){
dAmnChatTabs_rem(newTabs[i]);
}
//No big deal, Tree.createFragment handles the (+)More link.
//Has to be seperate though, because the rooms have to be all gone before adding them back.
for(var i=0;i<newTabs.length;i++){
el = dAmnChats[newTabs[i]].room_el;
dAmnChatTabs_add(newTabs[i],"#"+newTabs[i].substring(5),el);
}
//Copy new list into existing array and give you your old room back
dAmnChatTabStack = newTabs;
dAmnChatTabs_activate(tabNow,true);

//end ordertabs
}


//Dragging functions
function movemouse(e)
{
  if (isdrag)
  {
    dobj.style.left = tx + e.clientX - x + "px";
    
    return false;
  }
}

function selectmouse(e) 
{
  var fobj       = e.target;
  var topelement ="HTML";

  while (fobj.tagName != topelement && (fobj.className.search("dragme")==-1))
  {
    fobj = fobj.parentNode;
  }

  if (fobj.className.search("dragme")>-1)
  {
    isdrag = true;
    dobj = fobj;
    tx = parseInt(dobj.style.left+0);
    x = e.clientX;
    document.addEventListener('mousemove',function(e){movemouse(e)},true);
    dobj.style.zIndex=toplevel
    toplevel++
    return false;
  }
}

document.addEventListener('mousedown',function(e){selectmouse(e)},true);
document.addEventListener('mouseup',function(){isdrag=false},true);


]]></r>).toString()));
document.getElementsByTagName('head')[0].appendChild(dragjs)