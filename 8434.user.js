// ==UserScript==
// @name           DevWatch
// @namespace      vor.deviantart.devwatch
// @include        http://my.deviantart.com/devwatch/
// ==/UserScript==

(function(){
	var output = document.getElementById("output");
	var cls = "";
	var oLI = "";
	
	for(var x=0; x < output.childNodes.length; x++){
		if(output.childNodes[x].tagName == "DIV"){
			switch(output.childNodes[x].className){
				case "output-primary ie-paintfix":
				case "output-secondary sidebar":           
					output.removeChild(output.childNodes[x]);
					break;
						
				case "output-primary":
					output.childNodes[x].style.width = "100%";
					oLI = output.childNodes[x].getElementsByTagName("li");
					break;
			}//class
		}//if
	}//for
	for(var x=0; x < oLI.length; x++){
		var lnk = oLI[x].getElementsByTagName("a");
		if(lnk.length >= 1){
			var reqObj = new Object();
			reqObj.method = "GET";
			reqObj.url = lnk[1].getAttribute("href");;
			reqObj.headers = {"User-Agent":"monkeyagent","Accept":"text/monkey,text/xml"}
		
			reqObj.parentObj = lnk[1].parentNode;
			
			reqObj.onload = function(details) {
				var dObj;
				var pos1 = details.responseText.indexOf("deviantART.pageData=");
				var pos2 = details.responseText.indexOf("</script>",pos1);
				
				eval( "dObj = " + details.responseText.substring(pos1+20,pos2));	

				var a = document.createElement("a");
				var img = new Image();
				
				img.src = dObj.smallview.src;
				img.height = "250";

				a.setAttribute("href",dObj.fullview.src);
				a.appendChild(img);

				this.parentObj.appendChild(document.createElement("br"));
				this.parentObj.appendChild(a);
			};
			GM_xmlhttpRequest(reqObj);
		}//func
	}//for
})();