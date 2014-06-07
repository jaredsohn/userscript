// ==UserScript==
// @name        Piratebay IMDB mashup
// @namespace   tpbstyle
// @description Adds Imdb movie details in thepiratebay(and proxies), an embedded youtube trailer for movies, links to torrentz and torrent file caches
// @include     /^http://thepiratebay\.(\w\w)/torrent//
// @include     /^https://thepiratebay\.(\w\w)/torrent//
// @include     http://www.pirateproxy.me/torrent/*
// @include     http://pirateproxy.net/torrent/*
// @icon        http://i.imgur.com/U1fPU.png

// @version     0.9
// ==/UserScript==

GM_addStyle('.imdb a {margin:0 !important; border-bottom: 1px dotted #80C780; color: #3315AB !important; font-size: 1em;    font-weight: bold;   padding-right:10px;   text-transform: uppercase; text-align:center;}.imgBox  { width:71px; height:60px; background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAAA8CAYAAAA0VacdAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAACu1JREFUeNrtm3lwG9Udx79vV7sryfIhmRgfcez4CLhMYpK0pUBgwIWQpglQWo603IWkBYarLTSUpJCDoUADE2CaMgUKZNJMCYRAcOKYkACOCZQcPjA2No4dJ7Et25Jsy7K8kvb1j13FK1uyTkuepm/mjY5d7b7f533f7/fe762AKVLmzZ2OxYtKpkpzpk5JN+lh7liTBoBRKpkK7WKmQiP6LA6i0TAPdbU/uQaAAICdCoDYqaCapppHC7RazbssS0rNZvu2o7WnhgG4AdAzWjl9FgcxGLg/AxIIoam/e/DSxwCkAuATrZ6EKicrMxkNXz08X6vlXgYAUIqUZKG0v9/50VeHT/QCEBOpnoQqp7NrkDEY+A2gEkAlmQOluHf5j+5T1CMkUj2JVA45+e2jZQKvWeVVDSgFQJGSLBTPzDfV7dzV2AZgBIDnjFEOz7MAQPQ67lUf1ajqwrLC36rUw5wxcETRQzqbH7mDgOadVgylOA2KSjCmCvPeeuW6qwGkAdAkYnjFHQ7Ps6iuvMuk5ZlVahhy9YV05WUFDyvq0SairXG/oSh6SPFM4wMEyBsPRw1JglZgMndsufF6AIZEqCeuDtmQxONAxe3pZ6XrthBZDUoZ9TX09Hv5ZXp28ryar83bvztmHQDgQhxDe1yVYx8SycwZqatBaSqlEkYrPf0eVAIkpVIJLIPkJx+95C5FPVw81RM35WSdbUBt1V0Feh23ZWxkUitFfut7LC1VOOdIbfeO1nZbv6Ie6X9KOZ3ddibVwD2v9injKrzVC0b+rGFheGF92eMATIijc46XcsjJ+nvKeJ5d76MUtc+hAdSkvE8x8LOsNueeQzXd3mXFpKtnUnrAkMQhKyMJxQVGzJudAQBEyzOr/apFkgCJBlaTah608v4froFqWZGVkQRDEjd5PRrJj3ieRXqaFjzPwGTUQeBZmNK0MCRxSDZw6OweQvneNu+1yYmaFT9L0nPbfJUS6OoTBCMK/Gt744p7/vjxTgAWqBam1y4qoKLogcXmxIgowWJzQhQ96DQ7Yg/HZNRC4Fj5lWeRmaFXHGsS7EMuNLdacbiuh4y5DgFA6vffmp9s4PM5jslnGJLPccwtDENmjLc9lKjse47dLjb3WoYrBIFtJCAtfdbhtgXXbGsb46zUYxK/vqmEypAoOs0OiC4JFqsToktCn9UZGpx0oxaLf5wPnmPRfMyKQbsLR+p9ABAA2Lvt58ZZBcZSQpDGc2wpACPLkjmEII8QkhdUDWEDguKTAhePR6qjlNrcbqmOAlbnsLtWotRadPHmz1TgJB9HppRrr8qnH1WdhH3IFRhOcUEamlttDAD2m6pbz2cZYkzSc3MIYOR59hJKKdFomAURG0mDnUMn7fei6DlACKhzxF0lSdRmGxipHRmRbBcsfbcW8qrfWyW/cMx1d8/lOOZjyIu9yTGShj+UQjoWVkf5Hne5pPpd+zpuvu2hfU0AnIF8Dnu0ctnC3GzDVoYhKdEZSSOEF7mRkSjZ7aH2l974esWTzx+uVpz8wGkYY33QprfqOwvzUg6dW5i6lCFE8D+bpWOG7pjqAy7QbxH4HBrCPdTXof7mSQjSBgpL/0j7uo1H1v/1lbo6AHYADsgR0K9yCOTVb+qiy3JnvvrcZZv1Om5WXHpxMtXo5/qWfrF9yR2Vq75psXUAOAmgVwHkCqQc7108LW0DQ03f2fZesSB7vsAz2ZPdi2ErJaga4adNcvmmxfbpsvs+eU4B0wXADGAI8nYQAilH/T0LeR1j/PaTGzZOM2mvjWkvhuycIz+f+gCVX5pa+/dfeF35swB6FCgWZTh5/EGYqHgBpR368JqVBTOS743awBgZGbqDHz22bVf7y8sfO7hTgWIGYAMwjAAJ/FCWDyzktUza7jcX3nnB+dPWRgolVkaGq1jRJTner+x4ffmfvtihAtOPIDsbbIh39ABwbd7+XdOsmSn1xfnJZYSBENjACXwGDbQCDyfCBV/Fe6vL5XGsfPbIE2tfqv8UQCeAbsjhegRBVvahpiy8U2/X+5UdxzPShcOl56YtZgiE8AyM3Mig96Djr2/pH2l/YmPdM69va61RHG+XAiaklEc4+RwvIHflZ51dHo+07/uzTRdyHEmfOHpEb2TI0Y36zmGWLv9sdWVVV5MCxauYkPPQ4Sa7vENM/PxIb8/xU0N7rrw483KNhpw18UQuciODK2n8scbWgf2/fPjg0w0tA8cAnFDADCLMJzciTVarQ316w+7FGzOnaa8e5xTDdbrhpjD8nN7YOrj/ohv3qUO1FaOhmoZrZDSFBaADcFbNBwvX5mbpb46VkZFErl2fdr/5q9//520Ap+AbqqVwwcQCjhqQqbN6yUGBY7KiM5IGhjkBREu/2F60cO+DkCNShwImqocQNDGA4wEwvOb+EipokCXvIkRuZGQqA0wpmjzI6QYbQpjDhFJilWCXbvxJdomcEPco1V+y3DO6BRNknzxQkn10+2ZspXjqwXNKFKfrRgx2JzQxgkNSkphLR1UTit+JRCkTD8PcTCEb8uNyMdlyihkclsWc8Z3lz0gaGqyg54+/fn6WUKSCQxCBE54UOAykPFASEyPDV5p8PMPEFSpwYvJERqzgMAyhc3yGVRRGRvrbaUbN7FjCicXYJC3lF5fpBOaW8UbGaN0UxrrMI9ED1TUDbZggFRFX5egElPo640lWyhgnrf5YmKvNiZXfiQUcomFQKofnSI2kE1gQij8aPViYIxRDzj9ppgQcAponB6rIjWw85viEYYg0K097OYIzCHgwP0uYMwZOQocVwzL0EjpuOyb4aHK5qaP1hPPLdf84vrW8ytoGwLFs0bS/PXJbzp0zsoRFiIBSqoF4w3nUcKJ2yM075s/TCczycLrY5ZYcB2sH37vl8W+fffr1ExXNx53tkNMKPfUtjpN/f6fr416ra09BjpZNSWLyGAI+VMfOMOBP9Yi7a5sdXYjSKUerHKLXMaXBZ+r0tFK+qLd/uPLF4+81tDq8yad+yLmWIYxuqPGv7TDbXtthbryoNHnTuntybz2vQPsLDUsME93Di2x2kW46gCOI0ilHPaw0RCoFZSZ0ukPDnp7yA7a3f/PUsY8gb5xZFSgDkHMt3kWil7IIeRE5VF0zOFi2ouEvF84xvLX+3uk3F88QFusE5uzAjCjml+jnAahINBxCCPUTxuVedAxLPRWf92+9e92x3SqVeJXihJyy9JeEogoglzI0Bj6vtZvLVjS2ANiw/bmi639wnn65lieZ/kZxhpEthpyIi+rp02hnkZqevXN7CUGq+suuXlfDrur+D/7wQsd+BYQXil2B4k1w0zDaySrGaiE/dpv67jOFN8w9R7csWc8UqU8eHpG6c5fULwXQpqjUHXc4R7eUFE0/W2j2dl1Xn7thc3nf1qf/2XVIUYpFgWMPohSECUkDOcGWDCBlw0M5ly5ZkHK3KYU933vi4gdar/qywVEPeQ9cjORm0UQr8tjtWZdzGnJDe6dY8cbOvldvWtn6ZtVRexPkFGU3gD4FkhdMLJ4AlRTAouKrhisODra9+O/e8uxpmrrcDE2OTkCW24ODe76wtyDAVu9kK4c0v/O9K7ZW2uyrNp0SISfOhlRKGVYBmaxH8tVK0gJIApBy+0/TigtyeN3qV8zVinKciHMOmSg+wABAr4zrYaU33VEOn0jawijtERRIjNIeOyL8O2S0DplReo2F7zN1ifpfJvHTJjcS9E+//5cztfwXQw8TWf/ZYJUAAAAddEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIFRoZSBHSU1Q72QlbgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMy0wMS0xMlQwMDowNDozNy0wNTowMDehFs8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTMtMDEtMTJUMDA6MDQ6MzctMDU6MDBG/K5zAAAAAElFTkSuQmCC); }.imgText { text-align:center !important; margin:0 !important; padding:23px 0 0 0; font-family:tahoma;  font-size:15px;font-weight: bold;}');


function cCount(strn,chr)//counts periods in title
{
var stringsearch = chr
   ,str = strn;
for(var i=count=0; i<str.length; count+=+(stringsearch===str[i++]));
return count;
}


//get hash
var ls=document.getElementsByTagName('a');
if(document.getElementsByClassName("torpicture")[0]==null)
	hash=document.getElementsByClassName("col2")[0].lastChild.data.trim();
else
{
	hash=document.getElementsByClassName("col1")[0].lastChild.data.trim();
	//Uncomment the next line to enable bayimg proxy
	//imtp=document.getElementsByClassName("torpicture")[0].getElementsByTagName("img")[0];imtp.src=imtp.src.replace('http://image.bayimg.com','http://pirateproxy.net/bayimg')
	
}


//Torrent file links
torElt = document.createElement('div');
torElt.className = "imdb";
torElt.innerHTML='<br/><a rel="nofollow" title="TorCache" target="_blank" href="http://torcache.net/torrent/'+hash+'.torrent"><img width="16" height="16" title="" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAASdJREFUOI2F0k9HRGEUx/HPM2USQylDREQth5htq4hWEb2AmBcQbaOX0apttB3KvIAhondQSouURpRhVvG0mHvr6XZn5nAW99znfM+/n5gY6jjDEzqoxQkmSW7iBTHxg0mAaQghzKCNJX+tF0KYx0KM8UGZZdX3C5UjTpPudrA1cgRclADqCWAvi3WxWtibKgaF5M6/SmzjHX3spoC5kuqN0nbZyAB9LOeAzULy3bit4zDtUhLIvTsBMIuP7O1KpeQw1dJz/V5tgM/sc62CXuFNI4SwOAqQaSbXyzPU8FYY43zMCEfprnIdnPh/iUuJFpLkr+x/KwVM4bgEErOF3RpqII9do/oDSCqMgqR+kyfHGGPIb5ksaR0tQ300cY9XPOIqxthO338DyuasKrzzDCYAAAAASUVORK5CYII=" /> TorCache </a><a rel="nofollow" title="Torrage" target="_blank" href="http://torrage.com/torrent/'+hash+'.torrent"><img width="16" height="16" title="" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAjxJREFUOI19kz9OW0EQh7+Z9fN7z88VfyQUREMEQhAaN9yAUPkAnIA70NByA18AKkRBFUTHCYgo4QKxiGPHWEi83Z0U+7ASomSKbXZm5/vN/FbMzPgtBoMBR0dHDAYDVJWyLFlYWGBpaYm9vT2urq7o9/vzfDEzOz8/5/DwkMvLS/I8p9vtUhQFMUamP6c8fX9iNBoxmUyo65osyzg+Pub09BT59GnHqqrLysoKBwcHbG5uMp1OeXl5YTyZMHt+xswIIRBjZDKZMJvNqF9f8SEmgl6vN8dttVqICKsfVln/uE5VVQyHQ8bjMXVdE81wqqgqzjlkf/+zDYffyPMcFUVduogx0ul0WFxcxHuPcy3UScoRARGKskCvr7/gvW8mAiICgHMO5xxgmBkxeoIPeB/wjZz6tabV7/dRVSwaJkaMhkjETIghUtce7z2iTXdVzJQYY5JgZrazvU2nqnBOUXWIKgKUZUlVVXjv0Ua3SHrIMJaXl3GjH6OTx8dH2u120mDQHHMZvq4xwMwSKQZmnJ2dJYKtrS06nU7T4W1IUBQFRVHMCZwqiKCaJKytreFE5OTu6x1Zls07JwhDXUIOIfBmWLOYfOEDFxcXiWBjY4OyU6JI0t9sIs9zsizDB49TR6vlAEFEcM5xc3ODAjw8PGDRiGbEmFYUQiCEgPeeUL+t0GPR5sXzv8C72N3dbQjaOHV472llGXmec3t7+0euvi8GuL+/T+YJkdr75Lq8+Ku4Gcq/o9fr/e/azMx+AViIaLIkfkXFAAAAAElFTkSuQmCC" /> Torrage </a><a rel="nofollow" title="Torrentz" target="_blank" href="http://torrentz.eu/'+hash+'"><img width="16" height="16" title="" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAFtJREFUOI3tkksOgDAIRB+kN/JO3snT4qqN9pNa6NLZEZgXICPHeQEYPokGzACmATMAKa/So1d1d0YHja+S8Ak/YAMgzUdealK7CnhmxgjkwDLMAyhm8P+g/OIGmI4MWAByIK0AAAAASUVORK5CYII=" /> Torrentz </a>';
var refNode =document.getElementsByClassName('download')[0];
refNode.parentNode.insertBefore(torElt, refNode.nextSibling);



//get imdb url
var imdburl,tortype;

for(i=0;i<ls.length;i++){if(ls[i].innerHTML=="IMDB"){imdburl=ls[i].href;} else if(ls[i].title=="More from this category"){tortype=ls[i].innerHTML;}}
tortype=tortype.split('&gt')[0].trim();


if(imdburl!=undefined)
{tt=imdburl.split("/")[4];
GM_xmlhttpRequest({
  method: "GET",
  url: "http://www.omdbapi.com/?i="+tt,
  onload:imdbAppend.bind({})
  });
}
else if(tortype=='Video')//check the type of torrent
{
title=document.getElementById('title').innerHTML.trim().toUpperCase();

if(cCount(title," ")>cCount(title,"."))
title_split=title.split(' ');
else
title_split=title.split('.');

tordict=["PROPER","SUBBED","UNSUBBED","UNRATED","XVID","REPACK","RECODE","DVDSCR","DVDRIP","DVD5","DVD9","DVDR","DVD","SCREENER", "CAM","CAMRIP","R3","R5","LINE","STV","TELESYNC","TS","TC","TELECINE","VHSRIP","WORKPRINT","WP","AC3","H264","BLURAYRIP","BLURAY","480P","576P","720P","1080P","X264", "AXXO","KLAXXON","KINGBEN","FXM","DASH","MAXSPEED","FXM","BULLDOZER","LTT","AKCPE","BESTDIVX","DIVXMONKEY","STG",".AVI","NO RARS","NORARS","NORAR","SWESUB","NLSUB","MULTISUB","YIFY","DTS","BRRIP","HD","WEBRIP","BDRIP","WEB","READNFO","WS","PDVD","Pre-DVD","PPV","SCR","DSR","PDTV","HDTV","DTHRIP","DTH","TVRIP","TV","BD5","BD9","V2","NL","EXTENDED","DUBBED","RERIP","FS","MP4","MKV","HI-DEF"];
var clean_title='';
for(var i1=0;i1<title_split.length;i1++)
{
if((tordict.indexOf(title_split[i1]))!=-1)
	break;
clean_title=clean_title+title_split[i1]+' ';	
}
clean_title=clean_title.replace(/s\d+e\d+/i,'tv')//replace season-episoide to tv for better search results

GM_xmlhttpRequest({//google api imdb
	method: "GET",
	url: "http://ajax.googleapis.com/ajax/services/search/web?v=2.0&q="+clean_title+"+site:imdb.com",
	onload: function(responsi) {
		res2=eval("(" + responsi.responseText + ")"); 
	  	imdburl=res2.responseData.results[0].url;	//imdb url
	  	tt=imdburl.split("/")[4];
	  	
	  	if((/tt\d+/.exec(tt))!=null)
	  	{GM_xmlhttpRequest({
		  method: "GET",
		  url: "http://www.omdbapi.com/?i="+tt,
		  onload:imdbAppend.bind({})
		});}
	 }
})

}

//append imdb details  
function imdbAppend(response){
  	res=response.responseText;
  	omdbJSON = eval("(" + res + ")");
  	imdElt = document.createElement('div');
  	imdElt.className = "imdb";  	
  	imdElt.innerHTML='<p style="clear: both;padding-top:12px;"></p><a rel="nofollow" title="IMDB" target="_blank" href="http://www.imdb.com/title/'+omdbJSON.imdbID+'/"><img height="20" title="" alt="" src="data:image/png;base64,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" /> IMDB</a><div class="imgBox"><p class="imgText">'+omdbJSON.imdbRating+'</p></div><p><dl class="col1"><dt>Rating: </dt><dd>'+omdbJSON.imdbRating+"/10 from "+omdbJSON.imdbVotes+" users</dd><dt>Title:</dt><dd>"+omdbJSON.Title+"</dd><dt> Year: </dt><dd>"+omdbJSON.Year+" </dd><dt>Rated: </dt><dd>"+omdbJSON.Rated+" </dd><dt>Release:</dt><dd>"+omdbJSON.Released+"</dd></dl><dl class='col2'><dt> Runtime: </dt><dd>"+omdbJSON.Runtime+"</dd><dt>Genre: </dt><dd>"+omdbJSON.Genre+"</dd><br/><dt>Director:</dt><dd> "+omdbJSON.Director+"</dd><dt> Writer: </dt><dd>"+omdbJSON.Writer+"</dd></dl><dl><dt>Stars: </dt><dd>"+omdbJSON.Actors+"</dd><dt> Plot:</dt><dd> "+omdbJSON.Plot+'</dd><br/></dl><p style="clear: both;"/>';
  	yta=document.createElement('a');
  	yta.href="#marker";
  	yta.innerHTML='<img width="16" height="16" title="" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAVFJREFUOI3Fj71KA0EUhb/dHWNCUEhAEAxBIyKKsUmjD5BKbEQtLHwIC0uLIIgoiPiDgs9hAtEmilhoJSiCVcBOYhFdl8lsxsIgm1lRbPTAYX7uOefeC/8N6zIZjwFHwDCQBSI/eG4ACdxO1F4XhdKsAAu/aJptnbnzRPzRVui8QhOkH+lgcPeAjkwGs2Ywbzcg3QCC9KNRkrPzjJ9USMzMYdYDTNtSk5Qagnxrgud5SNtmYGuH/s1tVGcUUyc1SSHBCa+pcV3389U1NU3K93lYXjKFjmhoHbY32wOeq1Uq+3ukvtAKCT7GFBqN53kA3JWKnK2tMiI9pGWZfl9ITQ3oaQtQTdx6ndONdZ6Kx4wJGwcLGR6gZh12x66AXFsscCEVQ8Kh1w51DeJaKHTZDACYjHxspQi3DaAslKYA9AGjrc9QWAD3wEvrXgIK36X/Dd4BI5Kg4YQnRq0AAAAASUVORK5CYII=" /> WATCH TRAILER >>';
  	yta.name="marker";
  	yta.onclick=function() { shohid(omdbJSON.Title,omdbJSON.Year); };
  	  	
  	imdElt.appendChild(yta);
  	youElt = document.createElement('div');
	youElt.id='showh';
	youElt.style.display='none';
	imdElt.appendChild(youElt);
  	
  	var refNode = document.getElementById("social");
  	refNode.parentNode.insertBefore(imdElt, refNode);
  	
  	
     
}

//show youtube
function shohid(titl,yr){
    	diva=document.getElementById("showh");
    	if(diva.style.display=='none')
    	{
    	GM_xmlhttpRequest({//google api trailer
	method: "GET",
	url: "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q="+titl+'+'+yr+"+trailer+site:youtube.com",
	onload: function(respons) {
	  	res1=eval("(" + respons.responseText + ")"); 	  	
	  	yurl=res1.responseData.results[0].url;	//youtube url
	  	
    		diva.innerHTML='<iframe width="640" height="480" src="http://www.youtube.com/embed/'+yurl.split("%3D")[1]+'" frameborder="5" allowfullscreen></iframe>';
    		diva.style.display=diva.style.display=='block'?'none':'block';
    	}});}
    	else
    		diva.style.display=diva.style.display=='block'?'none':'block';
    	
}

