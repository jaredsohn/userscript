// ==UserScript==
// @name           ftodebug
// @include        *http://www.faerytaleonline.com/main.php*
// ==/UserScript==
if( 0 )
	sajax_debug_mode = true;
var flag=0;
if(1)
window.opera.addEventListener('BeforeScript', function (e) {
	//alert(e.element.innerHTML);
	if(e.element.innerHTML.indexOf("//SubmitTake(document.objectsfrm)")!=-1)
		e.preventDefault();
}, false);

window.opera.addEventListener('BeforeEventListener.blur', function (e) {
	//alert(e.which);
	//if(e.element.innerHTML.indexOf("//SubmitTake(document.objectsfrm)")!=-1)
		e.preventDefault();
}, false);

window.opera.defineMagicFunction('checkEnter', function (oRealFunc, oThis, e){if(e.which==13)e.target.onblur()});

if(1){
var ol;
if(window.onload) ol=window.onload;
window.onload=function () {
	var s=document.getElementById("postloader_people2").cloneNode(1);
	var z=document.forms.invobjfrm.children[0].children[0].children[0].children[0];
	z.insertBefore(s,z.firstChild);
	s.children[0].onclick='postAjxPage("objectCall.php","pageaction=updateinventory","response");';
	s.id="";
	s.style.display="inline";
	
	 
	contentEval(function(){
	 

	function afterPostStateChangeInventory(HttpRequest, contentDiv){
		if (HttpRequest.readyState == 4 || HttpRequest.readyState == "complete") {
			if (HttpRequest.status == 200) {
				var splitContent = HttpRequest.responseText.split("XXXBREAKOBJECTSXXX");
				var resBox = splitContent[0];
				var objBox = splitContent[1];
				var invBox = splitContent[2];
				var eqpBox = splitContent[3];
				var conBox = splitContent[4];
				
				document.getElementById('insert_response_resources').innerHTML = "<table width='100%'>"+resBox+"</table>";
				document.getElementById('insert_response_object').innerHTML = "<table width='100%'>"+objBox+"</table>";
				document.getElementById('insert_response_inventory').innerHTML = "<table width='100%'>"+invBox+"</table>";
				document.getElementById('insert_response_equip').innerHTML = eqpBox;
				document.getElementById('insert_response_construction').innerHTML = "<table width='100%'>"+conBox+"</table>";
				

					
			}
		}
	}

	});
	if(ol) ol();
}
}
 
function contentEval(source) {
var script = document.createElement('script');
script.setAttribute("type", "application/javascript");
var str = source.toString();
str=str.replace("function ()", "").replace("function()", "").replace("{", "");
str=str.substring(0, str.length-2)
script.textContent = str;
document.body.insertBefore(script,document.body.firstChild);
}
 
