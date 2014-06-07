// ==UserScript==
// @name           IoL
// @namespace      derek
// @include        http://*.kingdomofloathing.com/inventory.php*
// ==/UserScript==

var boxWidth = 350;
var boxHeight = 265;

var newdiv = document.createElement('div');
newdiv.setAttribute('id', "itemBox");
newdiv.style.width = boxWidth;
newdiv.style.height = boxHeight;
newdiv.style.position = "fixed";
newdiv.style.left = 10;
newdiv.style.top = 10;
newdiv.style.zIndex = 99;
newdiv.style.background = "white";
newdiv.style.border = "1px solid green";
newdiv.innerHTML = "It works!";
newdiv.style.visibility = "hidden";
document.body.appendChild(newdiv);

window.addEventListener('mouseover',function(event){
	var element = event.target;
	
	if(element.className == "ircm"){
		item = element.innerHTML;
		GM_xmlhttpRequest({
    			method: 'GET',
    			url: 'http://items.ofloathing.org/api/graph.php?item='+item,
    			onload: function(responseDetails) {
				document.getElementById('itemBox').style.visibility = "visible";
				document.getElementById('itemBox').style.border = "1px solid green";
	

				if(document.body.clientHeight <= event.clientY + boxHeight+1){
					document.getElementById('itemBox').style.top = event.clientY - boxHeight - 1;
				}else{
					document.getElementById('itemBox').style.top = event.clientY + 1;
				}
				if(document.body.clientWidth <= event.clientX + boxWidth+1){
					document.getElementById('itemBox').style.left = event.clientX - boxWidth - 1;
				}else{
					document.getElementById('itemBox').style.left = event.clientX + 1;
				}
				document.getElementById('itemBox').innerHTML = responseDetails.responseText;
			}
		});
	}
},false);
window.addEventListener('mouseout',function(event){
	element = event.target;
	document.getElementById('itemBox').style.visibility = "hidden";
},false);