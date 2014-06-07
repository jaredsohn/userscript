// ==UserScript==
// @name			del.icio.us URL Cleaner
// @description		On the posting page, highlights URLs with form params and anchors, and inserts a link that, when clicked, strips these out.
// @include			http://delicious.com/save*  
// @include			http://www.delicious.com/save* 
// ==/UserScript==

(function() {
	
	function createLink() {   	   
		var cleanLink = document.createElement("a");
		cleanLink.href="";
		cleanLink.innerHTML = "Clean URL";
		cleanLink.id = "cleanlink";	     
		
		var cleanLinkDiv = document.createElement("div");
		cleanLinkDiv.id = "cleanlinkdiv";	 
		cleanLinkDiv.className = "btn btn-gray-gray";  
		cleanLinkDiv.style.marginBottom = "10px";  
		cleanLinkDiv.style.marginLeft = "0"; 
		cleanLinkDiv.appendChild(cleanLink);
		
		cleanLink.addEventListener("click", function(event) {
			event.stopPropagation();		
			event.preventDefault(); 					
			var targetURL = document.getElementById("url");
			targetURL.value = targetURL.value.replace(/^([^#|?]+)[#|?].*$/, "$1");
			toggleLink();
		
		}, false);
		
		return cleanLinkDiv; 
	}
		
	function toggleLink() {
		var urlBox = document.getElementById("url");
		if (urlBox.value.match(/^([^#|?]+)[#|?].*$/)) {
			urlBox.style.backgroundColor = "#ffffd0";
			document.getElementById("cleanlinkdiv").style.display = "block";
		}
		else {
			urlBox.style.backgroundColor = "#ffffff";
			document.getElementById("cleanlinkdiv").style.display = "none";
		}
	}					
	
	var targetURL = document.getElementById("url");  
	var cleanLinkDiv = createLink();
	var delForm = document.getElementById("saveitem");
	var pLink = document.createElement("p")      
	pLink.style.marginLeft = "5.6em";  
	pLink.appendChild(cleanLinkDiv);
	delForm.parentNode.insertBefore(pLink, delForm.nextSibling);
	toggleLink();
	targetURL.addEventListener("change", function(event) { toggleLink(); }, false);

})();