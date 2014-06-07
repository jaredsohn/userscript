// ==UserScript==
// @namespace     http://grawity.googlepages.com/grease
// @name          greasewall
// @description   a very page blocking.
// @include       http://www.internetbadguys.com
// ==/UserScript==

// To add or remove blocked pages, use "Included pages" in Greasemonkey settings

// Use page redirecting?
// true = redirect to blockRedirectUrl
// false = just replace entire page
var blockUseRedirect = false;
var blockRedirectUrl = "http://grawity.googlepages.com/pageblocked";

(function(){
	//window.stop();
	if (blockUseRedirect == true) {
		//if (confirm("blockPage(): redirect to blockRedirectUrl\nblockRedirectUrl = "+blockRedirectUrl))
		location.href = blockRedirectUrl;
	} else {
		var currentUrl = location;
		var eHead = document.getElementsByTagName('head');
		var eHtml = document.getElementsByTagName('html');
		var eBody = document.getElementsByTagName('body');
		var img_src = 'data:image/png;base64,' +
		'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' +
		'/QdtE9Oowd8mhwAAAABJRU5ErkJggg==';
		/*
		<nPageDiv>
			<nBoxDiv>
				<nUriP>
					<nUriSmall>
					</nUriSmall>
				</nUriP>
			</nBoxDiv>
		</nPageDiv>
		*/
		
		var nAlertImage = document.createElement("img");
		nAlertImage.src = img_src;
		
		var nPageDiv = document.createElement("div");
		nPageDiv.style.textAlign = "center";
		nPageDiv.style.fontFamily = "sans-serif";
		nPageDiv.style.position = "fixed";
		nPageDiv.style.top = "0px";
		nPageDiv.style.left = "0px";
		nPageDiv.style.width = "100%";
		nPageDiv.style.height = "100%";
		nPageDiv.style.backgroundColor = "#ddd";
		
		var nBoxDiv = document.createElement("div");
		nBoxDiv.style.border = "1px solid #aaa";
		nBoxDiv.style.backgroundColor = "#fff";
		nBoxDiv.style.width = "50%";
		nBoxDiv.style.position = "absolute";
		nBoxDiv.style.left = "25%";
		nBoxDiv.style.top = "5%";
		
		var nUriDiv = document.createElement("div");
		nUriDiv.style.color = "#9c9c9c";
		
		var nUriDescSmall = document.createElement("small");
		nUriDescSmall.appendChild(document.createTextNode("URL you tried to access:"));
		
		var nUriDescP = document.createElement("p");
		nUriDescP.style.marginBottom = "0em";
		nUriDescP.appendChild(nUriDescSmall);
		
		var nUriSmall = document.createElement("small");
		nUriSmall.appendChild(document.createTextNode(currentUrl));
		var nUriP = document.createElement("p");
		nUriP.style.marginTop = "0em";
		nUriP.appendChild(nUriSmall);
		
		var nHeader = document.createElement("h1");
		nHeader.appendChild(document.createTextNode("Site blocked"));
		
		var nText = document.createElement("p");
		nText.innerHTML = "This page was blocked by grawity's <em>greasewall</em> script.";
		
		var nLine = document.createElement("hr");
		nLine.style.width = "90%";
		nLine.style.border = "none";
		nLine.style.borderBottom = "1px solid #ddd";
		
		nUriDiv.appendChild(nUriDescP);
		nUriDiv.appendChild(nUriP);
		
		nBoxDiv.appendChild(nUriDiv);
		nBoxDiv.appendChild(nLine);
		nBoxDiv.appendChild(nAlertImage);
		nBoxDiv.appendChild(nHeader);
		nBoxDiv.appendChild(nText);
		
		nPageDiv.appendChild(nBoxDiv);
		
		var nBody = document.createElement("body");
		nBody.appendChild(nPageDiv);
	
		for (var i = 0; i < eHtml.length; i++) {
			for(var j=0;j<eHead.length;j++) eHtml[i].removeChild(eHead[j]);
			for(var n=0;n<eBody.length;n++) eHtml[i].removeChild(eBody[n]);
			eHtml[i].appendChild(nBody);
		}
	}
})();