// ==UserScript==
// @name           Insert after text
// @include        *syrnia*game.php*
// @version                1.0
// ==/UserScript==
function insertAfter(node, referenceNode) {
  referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
return true;
}
String.prototype.contains = function(it) { return this.indexOf(it) != -1; };
var newElement = document.createElement("input");
var stdz = false;
var newLabel = document.createElement("label");
newLabel.innerHTML = "<b>Auto-Navigate TG</b>";
newLabel.style.color="#FFFFFF";
newLabel.setAttribute("for","antg");
newElement.type = 'checkbox';
newElement.setAttribute("id","antg");
newElement.addEventListener('click', function () {
	navTG("Someone","Xanso",null);
}, false)
insertAfter(newElement, document.getElementById("moveMap").nextSibling.nextSibling.nextSibling);
insertAfter(newLabel,document.getElementById("antg"));
//checkTG();
function checkTG() {
    try{
        if (stdz == false && document.getElementById("LocationContent")!==null){
            var arrz = document.getElementById("LocationContent").outerText.toString().split(/[\r\n]{1,}/g);
            for (var i = 0; i< arrz.length; i++) {
                if (arrz[i].contains("He was last seen at ")) {
                    navTG(arrz[i].split(".")[1].toString().split(" within ")[0].toString().replace(" You should thieve ",""), arrz[i].split(".")[0].toString().replace("He was last seen at ", ""), null);
                    stdz = true;
                    return true;
                }
            }
        }newElement.add
        if (stdz == false) {
            setTimeout(checkTG, 1000);
        }
     }catch(err){
         alert(err);
     }
}
function navTG(playerName, playerLocation, listOfLocations) {
    if (listOfLocations == null){
        var arz = new Array("Xanso");
        setTimeout(navTG(playerName, playerLocation, arz), 1000);
    }else{
        try {
            if (!document.getElementById("locationTitle") == null){
         	  	 if (listOfLocations[0].toString == document.getElementById("locationTitle").outerText) {
          	      alert("there");
           	 		}else{
           	  		setTimeout(navTG(playerName, playerLocation, listOfLocations), 1000);
           			}
           		}else{
           			setTimeout(navTG(playerName, playerLocation, listOfLocations), 1000);
          	}
        }catch(err){
        alert(err);
        }
    }
}
