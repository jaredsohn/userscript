// ==UserScript==
// @name           Page Prefetcher
// @namespace      Webnick.UI
// @description    Pre-fetches content from links in a page. Skips mailto:, chrome:, javascript: and ftp: protocols(suggest other protocols to skip please). Also skips iframes and frames for now. This is a work in progress.
// @include        *
// ==/UserScript==

// These first two variables:
// var E=5000 // Change this time to whatever you want. I found on my PC, 5 seconds (5000 milliseconds) was decent. 
// var A=false; // set this to true if you want to see links being processed.
(function(){var E=5000;var A=false;if(self!=top){return }var D=self.document.getElementsByTagName("a");var C=[];var G;var B;if(A){var H=document.createElement("div");H.style.position="fixed";H.style.top="0px";H.style.left="0px";H.style.width="600px";H.style.height="100px";H.style.overflow="auto";H.style.backgroundColor="orange";H.style.textAlign="left";H.style.padding="5px";document.body.appendChild(H)}for(linkIndex=0;linkIndex<D.length;linkIndex++){G=D[linkIndex].href;if(!(/^(mailto:)|(ftp:)|(ftps:)|(chrome:)|(javascript:)/i.test(G))&&!C[G]){C[C.length]=G}}setTimeout(function F(){if(C.length>0){var I=C.pop();if(A){H.innerHTML+="Pre-fetching "+I+"<br />"}B=document.createElement("iframe");B.src=I;B.id=(new Date()).getTime();B.style.display="none";B.setAttribute("onload","setTimeout(function(){top.document.body.removeChild(document.getElementById('"+B.id+"'))}, 0);");document.body.appendChild(B);setTimeout(F,E)}},E)})();