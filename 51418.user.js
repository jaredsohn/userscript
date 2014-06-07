// ==UserScript==
// @name          Fake attack
// @description   Fake attack script for travian - m4rtini - m4rtini89@gmail.com
// @include       http://s*.travian.*/a2b.php*
// ==/UserScript==


var div, thisDiv;
div = document.evaluate(
    
"//div[@class='f10'][input[@name='c'][@value='4']]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    
null);



thisDiv = div.snapshotItem(0);

    
var  newElement = document.createElement("div");
newElement.innerHTML = '<div>' +
    '<button id=fakeattack >Fake</button>' +
    '</div>';
    thisDiv.parentNode.insertBefore(newElement, thisDiv.nextSibling);


function fake()
{
var imp, thisImp;
var field = 't3';

if (getRace() == 2) //for gauls
{
field = 't2';
}

imp = document.evaluate( 
    "//input[@class='fm'][@name='" + field + "']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

thisImp = imp.snapshotItem(0);

thisImp.value =  '1';

var normal, thisNormal

normal = document.evaluate( 
    "//input[@type='radio'][@name='c'][@value='3']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

thisNormal = normal.snapshotItem(0);

thisNormal.checked = true;
}


var button = document.getElementById('fakeattack');
button.addEventListener("click", fake, true);

function getRace()
{
var ex = "//img[contains(@src,'1.gif')][@class='unit']";
	result = document.evaluate( 
  	ex,
    	document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
if (result.snapshotLength)
  {
  src = result.snapshotItem(0).src;
  if (src.match("/21.gif")){
  return 2; //gaul 
  }else if(src.match("/11.gif")){
    return 1; //teutons 
      }else if(src.match("/1.gif")){
        return 0; //Romans
          }
  } 
}