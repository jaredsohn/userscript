// ==UserScript==
// @name           Promote Twitter Lists
// @namespace      jamespgilbert
// @include        https://twitter.com/
// @include        https://twitter.com/#!/
// ==/UserScript==

var agrp = document.getElementsByClassName("account-group")[0];
var uname = agrp.attributes["data-screen-name"].nodeValue;
var uid = agrp.attributes["data-user-id"].nodeValue;
var lists = new Array();

var dataReady = false;
var domReady = false;
		
GM_xmlhttpRequest({
	method: "GET",
	url: "https://api.twitter.com/1/lists.json?screen_name=" + uname + "&user_id=" + uid,
	onload: function(response) {
			var robj = eval( "(" + response.responseText + ")" );
			for(var r = 0; r < robj.lists.length; r++)
			{
				var lobj = new Object();
				lobj.name = robj.lists[r].name;
				lobj.uri = robj.lists[r].uri;
				lists.push(lobj);
			}
			dataReady = true;
		}
	});


unsafeWindow.document.addEventListener('DOMSubtreeModified', function(event){
	if(event.target.className=="dashboard" && dataReady && !document.getElementById("listmod"))
	{
		var nmod = document.createElement("div");
		nmod.className="component";
		nmod.id = "listmod";
		event.target.appendChild(nmod);
		
		var nmodc = document.createElement("div");
		nmodc.className = "module";

		nmod.appendChild(nmodc);
		
		var nmodcc = document.createElement("div");
		nmodcc.className = "flex-module";
		nmodcc.innerHTML="<h3>Lists</h3>";		
		
		nmodc.appendChild(nmodcc);
		for(var l = 0; l < lists.length; l++)
		{
			var aobj = lists[l];
			var a = document.createElement("a");
			a.href = aobj.uri;
			a.innerHTML = "&bull; " + aobj.name;
			a.style.display="block";
			a.style.lineHeight="20px";
			nmodcc.appendChild(a);
		}
	} 
},false);