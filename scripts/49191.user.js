// ==UserScript==
// @name          mdt thing
// @description	  remove mdt
// @namespace     
// @include       http://mydrunktexts.com/*

//by Stuart Cleaver
//
// ==/UserScript==


(function() {
          
          
          var nodes = document.links;
          for (var i=0; i<nodes.length; i++) 
          {
                
          	if (nodes[i].className == "fmllink") 
          	{
          		nodes[i].innerHTML = nodes[i].innerHTML.replace(/MDT/, "");
          	}
          
          }
          
          
          })();