// ==UserScript==
// @name           Facebook Add Control
// @namespace      Pushpender Pannu
// @description    Facebook Add Control Button
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==


function setUpAddControlButton(){
var addCol=document.getElementById('pagelet_ego_pane_w');
addCol.style.display="none";
var addColParent=addCol.parentNode;
var button= document.createElement("button");

function hideShowAdds(){

if(this.innerHTML=="Hide Ads"){
    addCol.style.display="none";
    this.innerHTML="Show Ads";
}else{
    addCol.style.display="block";
    this.innerHTML="Hide Ads";
}
}

button.innerHTML="Show Ads";
button.id="hideFBAdds";
button.onclick='hideShowAdds()';

button.addEventListener("click",hideShowAdds,false);
addColParent.insertBefore(button,addCol);

}
if(document.getElementById('pagelet_ego_pane_w')!=undefined){
    setUpAddControlButton();
}