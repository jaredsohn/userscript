// ==UserScript==
// @name           Get Random Anime
// @namespace      pendevin
// @description    Gets the MAL page of a random anime, not on your list
// @include        http://myanimelist.net/animelist/*
// ==/UserScript==

//xhtmlhttprequest handler
//i got this from shoecream's userscript autoupdater at http://userscripts.org/scripts/show/45904
var XHR={
	// r.doc is the returned page
	// r.respose is the response element
	createDoc:function(response,callback,optional){
		var doc=document.implementation.createDocument('','',null);
		var html=document.createElement("html");
		html.innerHTML=response.responseText;
		doc.appendChild(html);
		var r={};
		r.response=response;
		r.doc=doc;
		callback(r,optional);
	},

	//sends the XHR request, callback is the function to call on the returned page
	get:function(url,callback,optional){
		if(optional==undefined)optional=null;
		GM_xmlhttpRequest({
			method:'GET',
			url:url,
			headers:{
				'User-Agent': navigator.userAgent,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			onload:function(r){XHR.createDoc(r,callback,optional);}
		});
	}
}

//get me a random show that isn't on the current list
function getAnime(e){
	e.preventDefault();
	//ignore the shows on this page
	var titles=document.getElementsByClassName('animetitle');
	var ignore=[];
	for(var i=0;i<titles.length;i++)
		ignore[i]=parseInt(titles[i].href.match(/\/(\d+)\//)[1]);
	XHR.get('http://myanimelist.net/anime.php?o=9',findLatest);

	//lol all we get from this page is that latest anime added
	function findLatest(r){
		var max=parseInt(r.doc.getElementsByTagName('strong')[0].parentNode.href.match(/\/(\d+)\//)[1]);
		findRandom();

		//time for some actual random numbers
		function findRandom(){
			var random=Math.round(Math.random()*max);
			//if this number is on the ignore list, try again
			for(var i=0;i<ignore.length;i++){
				if(random==ignore[i]){
					findRandom();
					unsafeWindow.console.log(random,' already seen');
					return;
				}
			}
			//otherwise, check to see if this is a real anime entry
			XHR.get('http://myanimelist.net/anime/'+random,checkShow);

			//validate show & display result
			function checkShow(r){
				//is this a valid entry?
				if(r.doc.getElementsByTagName('h1')[0].textContent=='Invalid Request'){
					ignore.push(random);
					unsafeWindow.console.log(random,' invalid entry');
					findRandom();
				}
				else{
					window.prompt('Random show:','http://myanimelist.net/anime/'+random+'/'+r.doc.getElementsByTagName('h1')[0].lastChild.textContent.replace(/\s/g,'_')+'/');
				}
			}
		}
	}
}

var link=document.createElement('a');
link.href='#';
link.textContent='Get Random Anime';
var place=document.getElementById("mal_cs_otherlinks").children[1];
place.innerHTML+='&nbsp;&nbsp;';
place.appendChild(link);
link.addEventListener('click',getAnime,false);