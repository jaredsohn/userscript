// ==UserScript==
// @author         jim50 
// @name           IMDb Torrent & Usenet search
// @version        2.0.0
// @description    Adds title search links to the most popular torrent & Usenet sites.
// @include        http://www.imdb.*/title/*
// @include        http://imdb.*/title/*
// @include        http://akas.imdb.*/title/*
// @include        http://www.akas.imdb.*/title/*
// @grant          GM_setValue
// @grant	   	   GM_xmlhttpRequest
// @grant          GM_getValue
// @grant   	   GM_addStyle
// @require        
//original script by mungushume and r3b31 edited by jim50
// ==/UserScript==


//ad remover code by skeeto (http://userscripts.org/scripts/review/50476)
//licensed under ISC License (https://www.isc.org/software/license)

// Hide certain page elements with CSS.
var divs = document.getElementsByTagName('div');
for (var i = 0; i < divs.length; i++)
    {
	if (divs[i].id.search(/sponsored_links/) != -1)
	    divs[i].style.display = 'none';
	if (divs[i].id == 'top_rhs_after')
	    divs[i].style.display = 'none';
     }

// Remove all iframes (only used for ads)
var iframes = document.getElementsByTagName('iframe');
for (var i = 0; i < iframes.length; i++)
    iframes[i].style.display = 'none';
//end of ad remover code


var div = document.evaluate ("//div[@class='infobar']", document, null,

XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

var title = document.evaluate ("//span[@class='itemprop']", document, null,

XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;


if(!title){ //Sub pages descriptions etc


	title = document.evaluate ("//div[@id='tn15title']//a", document, null,

XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;


	div = document.evaluate ("//div[@id='tn15content']", document, null,

XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

}
if(!title){ //forums


	title = document.evaluate ("//div[@id='tn15']//a", document, null,

XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	if(title.innerHTML.match(/Board:/)){ //The first /a isn't what we want on the message board list
		title.parentNode.removeChild(title);

		title = document.evaluate ("//div[@id='tn15']//a", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	}


	div = document.evaluate ("//div[@id='tn15']", document, null,

XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

}


if(div && title)

{

    title = title.cloneNode(true);

    var span = document.evaluate (".//span", title, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if(span)

    {

        title.removeChild(span);

    }

    var txt = title.innerHTML;



    txt = txt.replace(/\<br\>[\s\S]*/g, ""); //remove original title
    txt = txt.replace(/^\s+|\s+$/g, ''); //trim the title
    txt = txt.replace(/\s/g, "+"); //replace spaces with +'s
    txt = txt.replace(/[\?#]!\"/g, ""); //remove bad chars
    txt = txt.replace(/:/g, ""); //: breaks at least TL



    var tab = div.insertBefore(document.createElement("table"), div.firstChild);

    tab.id = "gm_links";

    _addStyle("@namespace url(http://www.w3.org/1999/xhtml); #gm_links td { width:50px; padding:0px } #gm_links img { margin:0 1px 0 0 } #gm_links a { vertical-align:top; font-weight:bold };");

    var tr = tab.appendChild(document.createElement("tr"));
     

     //Youtube

    img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAA"+
"AAAAAAD///8AEiP//xIj//8SI///EyP//xIj//8SI///EiP//xIj//8SI///EyP//xIj//8SI///"+
"EiP//xIj//////8AEiP//wAc7v8AHO7/AB3v/wAc7v8AHO7/ABzu/wAc7v8AHO7/ABzu/wAd7/8A"+
"He//ABzu/wAc7/8AHe//EiP//xIj//8SI////////09V//+6uv////////////9PVf//z87/////"+
"//+ysv//EiP//5ub////////0tH//xIj//8SI///EiP///////9PVf///////xIj////////T1X/"+
"//////8SI////////5qZ////////EiP//xIj//8TI///EiP//xIj////////T1X///////8TI///"+
"/////09V////////EiP///////+amf/////////////S0f//EiP//xIj//8SI////////09V////"+
"////EiL///////9PVf////////////+6uv//EiP//7q6///v8P//0tH//xIj//8SI///EyP/////"+
"//8SI///EiP//xIj//8SI///EiP///////8SI///EiP//xIj//8SI///EiP//xIj//8SI///EiP/"+
"/////////////////xIj//8SI///EiP//xMj////////EiP//xIj//8SI///EiP//xIj//8SI///"+
"EiP//9nZ//8SI///EiP//xMj//8SI///EiP//xIj//8SI///EiP//xIj//8SI///EiP//xIj//8S"+
"I///EiL//9na////////////////////////////////////////////////////////////////"+
"//////////////////////////////////+r5/b/AAAA//372P//////R5K5/wAAAP/IiWb/////"+
"/26v1f8AAAD/rGZE////////////////////////////qub1/wAAAP/+/Nj/qub2/wAAAP//////"+
"AAAA//782P8TcJ3//vzY/wAAAP///////////////////////////6rm9f8AAAD//vzY/6rm9v8A"+
"AAD//////wAAAP/+/Nj/AAAA//////8AAAD///////////////////////////9ur9b/AAAA/+PF"+
"ov//////R5K6/wAAAP/JiWb//////wAAAP//////AAAA////////////////////////////AAAA"+
"//+p7/8AAAD/////////////////////////////////////////////////////////////////"+
"bq7V/wxKf///////rGZE/+PFov//////////////////////////////////////////////////"+
"////gAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAA==";

    buildCell(tr, "YouTube","http://www.youtube.com/results?search_query="+txt+" trailer", img);

     //fenopy

     img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAA"+
"AAAAAAD///8A3N3fIVZYY6oPESLzBggZ/TQ3Rc6srLJT/Pz8AP///wD///8A////AP///wD///8A"+
"////AP///wD///8Ay8zQMiEjNuM+QFDGqaqxV8HCyD+TlJ1rJSc63p2epmP8/PwA////AP///wD/"+
"//8A////AP///wD///8A////AERGWcJCRFbCubvITUFHaNcyOFvoSlBxzpqcrG4rLkLcqauzV///"+
"/wD///8A////AP///wD///8A////AP///wAOEiz8qKqzWVtggbohKFL/IShS/yEoUv8uNF3wj5Gj"+
"eSksQ967vMRF/Pz8AP///wD///8A////AP///wD///8AFxs39aeptFpdYoW5IypY/yMqWP8jKlj/"+
"IypY/zA2Y+6EiJ6GKCtG48XGzjr///8A////AP///wD///8A////AHJ0iJRHS2XCpam/ZycvYvok"+
"K17/JCte/yQrXv8kK17/N0Bw54qNon4tMk/e09TaLf///wD///8A////AP///wDt7fAPUFRvu2Nn"+
"f6eMkbGHJi5m/SYuZf8mLmX/Ji5l/yYuZf8+RXjieX2WkjU5WNnZ2t8m////AP///wD///8A////"+
"AOnq7RRHTGrIcHOMm4+TtIMqM3L8KTJx/ykycf8pMnH/KTJx/0NMht5xdZafQUZnzeDh5h////8A"+
"////AP///wD///8A4eHmH0RJa85+gpuM09XmM46Uwo2BiLebgYi4m7e82ledosp5oabKdIGEnIpJ"+
"TnDG6uruFP///wD///8A////AP///wDa2+ImOT9m25SXrXXAw9tLgIe3m4OKupfJzeZDlpzIg4KI"+
"uZnM0OY8c3iTmFdcfbrt7vEP////AP///wD///8A////ANXW3y01PGfin6K3a5WczofKzuhDhY3J"+
"noCIw6G3vOBahY3EjsfJ3TdbYIK4eX2alP///wD///8A////AP///wD///8AycvXOjI5aeexs8VX"+
"0tXsOMLG6E2aoM9/qq/VZ8HF5UzGyOA+tLbIUyYtYPX///8A////AP///wD///8A////APz8/ADB"+
"w9JFNj5v5bi7zE3///8A////AP///wD///8A////AK6xxVwjK2L8////AP///wD///8A////AP//"+
"/wD///8A////ALK1yFc6QnbjycvZPPz8/AD///8A////AOvr8RRNVIPNV16Jwv///wD///8A////"+
"AP///wD///8A////AP///wD8/PwAqKzEYzdAeOiPlLSCxMfXRKWqw2dIUIPVPUV749HT4DL///8A"+
"////AP///wD///8A////AP///wD///8A////APz8/AC3us9TUFiMzikzc/0xOnjzbXOfquHi6yH/"+
"//8Aw/8AAJ3/AAAi/wAAQX8AAEA/AAAgXwAAgA8AAMAHAADkcwAA9kkAAPqUAAD9/gAA/v4AAP98"+
"AAD/mQAA/8MAAA==";
     buildCell(tr, "Fenopy","http://fenopy.com/?keyword="+txt, img);
	 

     //Torrentz

  img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAACZZjMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8IAAA/DcAAPw7AAD8PQAA/CAAAPw/AAD8PwAA/D8A"+
"APw/AAD8PwAA/D8AAPw/AAB8PgAAAAAAAAAAAACAAQAA";

    buildCell(tr, "Torrentz","http://torrentz.eu/search?f="+txt, img);       

     //btscene

    img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAAAAEgAAABIAAAAAAAA"+
"AAAAAABCQkKenp5jY2M7OztHR0fr6+v5+fn8/Pz9/f2jo6MhISEiIiIgICAhISEiIiIfHx8JCQk4"+
"ODienp6pqalZWVmVlZX6+vr8/Pz7+/vNzc0aGhoODg4SEhIFBQUEBAQHBwcODg4MDAyQkJCmpqad"+
"nZ14eHj19fX8/Pz7+/vq6upPT09BQUFKSkoICAgDAwMEBARwcHAjIyM8PDzGxsbGxsbo6Oj7+/v8"+
"/Pz8/Pz6+vrq6urs7Oze3t4aGhoFBQUDAwP39/fCwsItLS09PT3u7u729vb8/Pz6+vr7+/v4+Pj5"+
"+fn5+fnv7+8uLi4CAgICAgJ0dHQnJydsbGx3d3fX19f7+/v5+fn6+vr6+vr5+fn+/v7////39/dD"+
"Q0MEBAQCAgJdXV2dnZ3Dw8OcnJzJycnX19fj4+Px8fH4+Pj4+Pj6+vr5+fn5+fl6enoGBgYCAgJI"+
"SEhEREQlJSUUFBS1tbXp6enb29vPz8/V1dXw8PD7+/vt7e35+fmjo6MGBgYCAgIEBAQFBQUGBgY8"+
"PDz19fX7+/v9/f36+vrp6enR0dHPz89BQUGdnZ1BQUEDAwMCAgICAgICAgIEBARgYGD8/Pz9/f3+"+
"/v7+/v77+/v09PS3t7cMDAwdHR0TExMDAwMCAgICAgICAgIEBASVlZX6+vr9/f3+/v7+/v79/f36"+
"+vrx8fFeXl43NzcTExMFBQUCAgICAgICAgIFBQWvr6/6+vr9/f3+/v7+/v7+/v78/Pz9/f3w8PCo"+
"qKgLCwsDAwMCAgICAgICAgIEBASNjY38/Pz9/f38/Pz+/v78/Pz+/v7////9/f2Xl5cFBQUFBQUC"+
"AgIEBAQEBAQGBgY8PDzt7e39/f39/f39/f39/f39/f36+vr29vZnZ2cHBwcEBAQEBAQCAgICAgID"+
"AwMKCgqgoKD39/f7+/v8/Pz8/Pz8/Pz8/Pyrq6sTExMDAwMEBAQCAgIHBwcHBwcJCQkICAgxMTHc"+
"3Nz6+vr7+/v7+/v7+/v7+/vS0tIfHx8ICAgGBgYHBwcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

    buildCell(tr, "Btscene","http://www.btscene.eu/verified-search/torrent/"+txt+"/", img);
	
	
     //1337x
	
	img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAA"+
"AAAAAAD+/v4M0dHRSr+/v2vGxsZk/v7+Jf7+/gr+/v4A////AP7+/gD+/v4M/Pz8KMHBwWu+vr5x"+
"wsLCXvz8/BT+/v4B8vLyIg9Ia/MAdb//AHC3/3eEi6/+/v4r/v7+B////wD+/v4J/v7+LnSGkLMA"+
"crv/AHW//wBVi//R0dFG/v7+A/7+/hSLjY6XAHfD/wCc//8AcLf/pqamk/7+/iH+/v4K/v7+Iaam"+
"ppMAcrv/AJz//wCP6/9rfYe1/v7+Hv7+/gH+/v4J/v7+MG9+iL0Ajef/AJz//xlikfLc3Nxk/v7+"+
"K9zc3GQZX4zzAJz//wCZ+/8gTWnr7OzsTP7+/g/+/v4A/v7+AP7+/g/w8PBKJExk6QCZ+/8Amfv/"+
"OFds4/f393s4V2zjAJn7/wCc//8WZZbz3NzcZ/7+/hj+/v4B////AP///wD+/v4B/v7+Fdvb22QZ"+
"X4zyAJz//wCI3/8zRE/yAIbb/wCc//8AcLf/l5mbm/7+/iP+/v4F////AP///wD///8A////AP7+"+
"/gP+/v4hsrKyjQBoq/8AnP//AJLv/wCc//8AiuP/d4OLuv7+/jD+/v4H/v7+AP///wD///8A////"+
"AP///wD///8A/v7+Cv7+/j57gofKAIjf/wCc//8Amfv/OFhs6vT09Fn+/v4S/v7+AP///wD///8A"+
"////AP///wD///8A/v7+AP7+/g/09PRPMVRp6QCZ+/8AnP//AJz//x1UePPk5ORn/v7+Ff7+/gH/"+
"//8A////AP///wD///8A/v7+AP7+/gn+/v4wfYuTuhyV4/8LoP//A3jD/wCZ+/8AlPP/SWN11vz8"+
"/Dz+/v4M/v7+AP///wD///8A////AP7+/gX+/v4jlJaYoDCJwf9Ctv//OaHj/3uEitc0bJD2P7X/"+
"/zee3v96hIq2/v7+L/7+/gf+/v4A////AP7+/gP+/v4Z1tbWazV4ofZCtv//QbP8/z9dcOX4+Phg"+
"s7Ozli2AtP9Ctv//L4a8/5ibnJv+/v4j/v7+Bf///wD+/v4M6OjoTDBWbe5Ctv//Qrb//zhymPPc"+
"3Nxk/v7+Hv7+/jB6g4q2OqTn/0K2//84eaHz1tbWZf7+/hT+/v4A/v7+FWp9iLY9rPL/Qrb//zCJ"+
"wf+np6eS/v7+If7+/gb+/v4O9PT0RD9dcONBs/z/Qrb//zBVber09PQo/v7+A/Hx8R9IZ3rPN2eF"+
"6jdnhOuKl6Ch/v7+Kv7+/gf///8A/v7+Af7+/hXc3NxWSm2D1zZmhOpAaoXez8/PQv7+/gP+/v4J"+
"/v7+Gf7+/iv+/v4r/v7+Gv7+/gr+/v4A////AP///wD+/v4D/v7+D/7+/iX+/v4r/v7+H/7+/gz+"+
"/v4A//8AAIfDAACDgwAAw4cAAOEPAADwDwAA8B8AAPg/AAD4PwAA8B8AAOAPAADhBwAAw4cAAIPD"+
"AACH4wAA//8AAA0KMA0KDQo=";

	buildCell(tr, "1337x","http://1337x.org/search/"+txt+"/0/", img);
	
    
     //PirateBay

    img = "data:text/html;charset=utf-8;base64,Qk04AwAAAAAAADYAAAAoAAAAEAAAABAAAAABABgAAAAAAAAAAADgTAAA4EwAAAAAAAAAAAAA////"+
"/////////////////////////////////////////////////v7+/////////////Pz8vb297Ozs"+
"////////////////////////////////4uLiSUlJ3d3d////////8/PzEhIScnJy8fHx////////"+
"////////////8fHxwsLCWFhYAAAAyMjI////////5+fnEBAQICAgQkJCV1dXZWVli4uLiYmJUlJS"+
"KioqPT09bm5uHh4eYWFhwcHBubm5bGxsQEBAp6end3d3FBQUAAAAFBQUOTk5ISEhGRkZPT09WVlZ"+
"QkJCKioqJycnenp6AAAAQUFBPz8/YGBgjo6O0dHR+/v7////////7+/vxcXFnZ2dg4ODExMTQEBA"+
"v7+/AAAAgoKCjo6OpaWltra2qqqqpqampaWlpKSkra2tr6+vsbGx5eXll5eXW1tb1NTUcXFxmJiY"+
"AwMDAAAANzc3VFRUGxsbAAAAX19fPDw8ERERAAAAQUFB/v7+/Pz8////////nJycAAAAAAAAAAAA"+
"Hx8fCwsLAAAAJiYmBQUFAAAAAAAAKysr+vr6////////////nJycAAAAAAAADw8PAAAAAAAAAAAA"+
"AAAADQ0NAwMDAAAANjY2+vr6////////////rq6uAAAANjY25eXlWVlZHx8fJycnIyMj0dHRhoaG"+
"AAAAV1dX////////////////r6+vAAAALS0t0tLSX19fsrKy2dnZZWVlsrKyiIiIAAAAWVlZ////"+
"////////////r6+vAAAAAAAABQUFAgICExMTEBAQAwMDAwMDAQEBAAAAWlpa////////////////"+
"q6urAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFRU////////////////19fXSUlJQUFB"+
"Q0NDQ0NDQ0NDQ0NDQ0NDQ0NDQkJCQkJCqKio/////////////////////////v7+/v7+/v7+/v7+"+
"/v7+/v7+/v7+/v7+/v7+////////////AAA=";

    buildCell(tr, "PirateBay","http://thepiratebay.sx/search/"+txt+"/0/99/200", img);
   
     //Torrentzap

    img = "data:text/html;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABGdBTUEAAK/INwWK6QAAABl0RVh0"+
"U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAECSURBVHjaYpwxYwYDSQCo4f///7MW7Hr0"+
"5PV/QgComAWo5/HTN0Cyd/ImiBHHTt20MlNHNrSpKoKPjwvCBmmQlRZJjXeFS2uY5AK52pqyWF3E"+
"hCkE1I/HCyyYQkAX/vkjdvseAycHiPv9B4ghI4VbA9C57z6yv/vI8P07iHvpKoOQIENaPG4Nnz59"+
"ExN+DPHDk2cMJ84y5Ifh9QMyWLKKITaMgZOTOA3bdjPoaTOoKuENJaB7IAyg04H+9nIlIlg9XAxF"+
"hUXWbGYI9iUiWIFBNKEjaeJMkEuAAQq0BAKAvne0wRFKwNAEOh2iCA6EBXEHKzBMIIbhjOmZM2cS"+
"n7oBAgwAzApyBonlsY8AAAAASUVORK5CYII=";

    buildCell(tr, "Torrentzap","http://www.torrentzap.com/clean-search-results1/"+txt+"/popular/4", img);


     //yify

    img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEA"+
"AAAAAAAAvwAAHjMdABpTFgAeKxsAAMUAAAqdDQAhKxsAAMsAABZfFgAFtQQAHjQbACQfHAALmAsA"+
"EX8PAA2UDgAjHh8AICEfACAlHAAWZRYAAbACAAOwAgAQdhAAAagAABhdFAAcHx0ACqgIABw1GQAW"+
"YBQAHh8dAB4xHAAYYBQAA8sBABo7GQAfHiAAIR4gACMeIAAWbBQAEYkNABwgGwACtgMAIyAbAAqr"+
"CQASXBAAE1QWACEfHgAMmQoAAMAAABlRFgAExwUACqAHACMfHgAHnwoAJB8eABdQGQAhIh4ADYkO"+
"ACAoHgADwgMACaUKABRzEgAHrAcAAMwAAAPXAgAfIBwAHR8fABw5GAAhIBwAHjEeAB8fHwAXURcA"+
"IR8fAB4mHAAZWxQAB5cJABCJDwAVcBMAHEEbAAK6AgAfIx0AEIAQAAmcDAAVWBUAEHERAAyKDQAf"+
"KR0AAr8FAASxAwAEtQAAFV4VABN3EQALlwoAFmEVACEhGwAdIB4AEowQAB8gHgAGuQYAE3ESAB8s"+
"HgAdMxsAALsBACAdHwACvgEAIiAfAA6IDAAPhA8AJCAfAAydCwAVahYABMQBAAK1AgAHqggAGkkY"+
"AAqmCwAgHh0AB7EFAAO4AgAiHh0ACpsJACAhHQAWZRQAICAgACIgIAADvQUAGVUYAAerBgAgKh0A"+
"CJkHACAfGwAcHh4AG0YZABJ0FAAdMB0AALwAAB4eHgAgHh4AAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAARIcjJk4kfTlte2sXZ4csREY/LFgJPToNYTtpKTwvQDIhC4MuM3BGcoZ5XYYIUAJqcluFXiwi"+
"VEwdgDJGHIRKQzhudkYmPyA+BV+HMix1BlFSTQEjRF9nMHtjRF9GhmVib2gmRBAyHHEfKkJlX0JG"+
"clYeRFwyRl8lB1pdEEZ1RkQTRV8PLECGLQRVGodGRCxGFDVCh19EEWBmABk2h3IcXzEbh3ksNCsA"+
"J3N0FRgiLEYSWXccQmUOFgxBV2RILCIsR1N+LHlfN0l4LEt/T4ZfXyx8bEYsQnIoRiGBHCwscjRE"+
"dUWCRCwsRj9yMiEsh3qGX3oyCgMsRkBfEA8sX19dXwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";

    buildCell(tr, "yify","http://yify-torrents.com/browse-movie/"+txt+"/All/All/0/latest", img);  

	
     //KIckAss

    img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHUFLcyFLV74bO0UuAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeQEthLmNy+DVzhf81c4X/NXOF/ydUYdsc"+
"PEUdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkTFeuN3WG/zh2iP84doj/OHaI/zh2"+
"iP84doj/M2t7/B9BS1IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlS1ecPHmM/zx5jP88eYz/WIyc"+
"/3OfrP9BfI//PHmM/zx5jP83b4D9IEFLPgAAAAAAAAAAAAAAAAAAAAAiQ0wzPXiJ/kB9j/9AfY//"+
"XZGg//b5+v//////4uvu/2iZp/9AfY//QH2P/zNkcu4AAAAAAAAAAAAAAAAAAAAAMl1q2UWBlP9F"+
"gZT/RYGU/73T2f///////f7+//L29//p8PL/RYGU/0WBlP9FgZT/KUxXgAAAAAAAAAAAJ0ZPHUeB"+
"k/9Khpj/SoaY/0qGmP/b5+r//////7vR2P9Khpj/bp6t/0qGmP9Khpj/SoaY/zlndOcAAAAAAAAA"+
"AC9SXIBPi53/T4ud/0+Lnf9Pi53/0eHm///////F2d//T4ud/0+Lnf9Pi53/T4ud/0+Lnf9Mhpf/"+
"KEZPEgAAAAA4YGu+VJCh/1SQof9UkKH/VJCh/8HX3f//////6/L0/1SQof9UkKH/VJCh/1SQof9U"+
"kKH/VJCh/y9QWVwAAAAAQGp31lmUpv9ZlKb/aZ6u/5u/yv/W5en////////////C2N//3urt/3Sm"+
"tf9ZlKb/WZSm/1mUpv81WWOIAAAAAENseNRemar/Xpmq/3Wntv//////////////////////////"+
"//////+VvMf/Xpmq/16Zqv9emar/OFtlhAAAAABCaHS+Y52v/2Odr/9nn7H/iLTC/4Kxv//0+Pn/"+
"/////6zL1f9jna//Y52v/2Odr/9jna//Y52v/zdXYVwAAAAAPF5od2ehsv9nobL/Z6Gy/2ehsv9n"+
"obL/xtzi///////f6+//Z6Gy/2ehsv9nobL/Z6Gy/2Wdrv80UVoSAAAAADZTXBJkmqr+a6W2/2ul"+
"tv9rpbb/a6W2/2ultv9rpbb/a6W2/2ultv9rpbb/a6W2/2ultv9SfovlAAAAAAAAAAAAAAAAS3J9"+
"xG+ouf9vqLn/XIuZ9GGTovpvqLn/b6i5/2+ouf9gkqD5Zpqp/W+ouf9vqLn/QWJsdwAAAAAAAAAA"+
"AAAAADtZYhdbipfxQWJrbgAAAAAAAAAAR2t2p2CRn/dBYmtuAAAAAAAAAABGanSgVH6L3wAAAAAA"+
"AAAA/j8AAPgPAADwBwAA4AMAAMADAADAAQAAgAEAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAB"+
"AADAAQAAxjMAAA==";

    buildCell(tr, "KickAss","http://kat.ph/usearch/"+txt+"/?categories[]=movies&categories[]=tv", img);

     //isoHunt

    img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAQAMAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAD39vX28e/5+fUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAACkim2EWjTazb0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACk"+
"imdmMwDBq5oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQv6qymH4AAACulH1mMwCpi3EA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD08O16UCaAXDPs5N/Mu6xmMwCgfl8AAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAD7+viadFNzRRPl3tjn39dyRBaJYz4AAAAAAAAAAAC7qJaQbUvfzsYA"+
"AAAAAAAAAAAAAAC1m4ZmMwDGs57p4tqFXjh9VCXo4dgAAAAAAADZyrx1SByMbEUAAAAAAAAAAAAA"+
"AADJvKtsPQujh2n7+/qUd1dmMwB1Rxl3SRx3SRx1RxlmNAGKZj/l2NMAAAAAAAAAAADk1c5wQBGN"+
"Z0H18O2niGNmMwBtPA52SRx2SRx2SRxtPQxoNQPl2tQAAAAAAAAAAADz8eyHXz9xQxXt6OTMvrNp"+
"NwW1mYQAAAAAAAAAAACxloNmMwC6p40AAAAAAAAAAAAAAACjgGJsOgrTx7Xs49uFXjeXdlXv6uMA"+
"AAAAAADXzb9sPAujgWYAAAAAAAAAAAAAAAC/rZlmNAG4n4gAAAAAAAAAAAAAAAAAAAAAAADn39d3"+
"TCGDWS7PwbQAAAAAAAAAAADx7ei6pI7Yyr0AAAAAAAAAAAAAAAAAAAAAAAAAAACJZD9rOgrIs54A"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADGsZxmMwCkjnAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSwLdtPQqDWjL08vAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAADy7uju6eQAAADx/wAA8f8AAPH/AACR/wAAAf8AAAHHAACA"+
"xwAAgAMAAIADAACA4wAAwGMAAMfhAADH8QAA//EAAP/wAAD/+QAA";

    buildCell(tr, "isoHunt","http://isohunt.to/torrents/?iht=5&ihq="+txt, img);

     //Bin

    img ="http://www.google.com/s2/favicons?domain=binsearch.net";

    buildCell(tr, "BinSearch","http://binsearch.info/index.php?q="+txt+"+720p&m=&max=250&adv_g=&adv_age=999&adv_sort=date&adv_col=on&minsize=1500&maxsize=9000&font=&postdate=", img);
     
     //nzb

    img ="http://www.nzbindex.nl/favicon.ico";

    buildCell(tr, "NZBindex","http://nzbindex.com/search/?q="+txt+"+720p&age=&max=25&minage=&sort=agedesc&minsize=1500&maxsize=9000&dq=&poster=&nfo=&hidecross=1&complete=1&hidespam=0&hidespam=1&more=1", img);
	
}



function buildCell(container, title, href, image)

{

    var a = document.createElement("a");

    a.href = href; 
    
    a.setAttribute("target","_blank");
	a.title=title;
	

    var img = document.createElement("img");

    img.src = image;
	img.setAttribute("height","16");
	img.setAttribute("witdh","16");


    a.appendChild(img);

    var cell = container.insertCell(0);

    cell.appendChild(a);

}



function _addStyle(css)

{

    if (typeof GM_addStyle != "undefined") {

        GM_addStyle(css);

    } else if (typeof addStyle != "undefined") {

        addStyle(css);

    } else {

        var heads = document.getElementsByTagName("head");

        if (heads.length > 0) {

            var node = document.createElement("style");

            node.type = "text/css";

            node.innerHTML = css;

            heads[0].appendChild(node); 

        }

    }

}

/********** SCRIPT VERSION CONTROL 0.5 *************/
/* Any help about this functions can be found at
http://sylvain.comte.online.fr/AirCarnet/?post/GreaseMonkey-Script-Update-Control
*/
/* parameters */
/* SET YOUR OWN SCRIPT VALUES */
var thisId=161703;		// your script userscript id
var thisVersion="2.0.0";		// the @version metadata value
var thisReleaseDate="20130520"; // release date of your script. Not mandatory, use this paramater
								// only if you want to be sharp on version control frequency.

/* script version control parameters */
var GMSUCtime=15;   // Delay before alert disapears (seconds)
                    // set to 0 if you don't want it to disapear (might be a bit intrusive!)
var GMSUCfreq=2;    // Update control frequency (days)

/* colorpalettes */
	// feel free to create your own. color in this order : back, highlight, front, light.
	var cpChrome=new colorPalette("#E1ECFE","#FD2","#4277CF","#FFF");	// but for Firefox ;-)
	var cpUserscript=new colorPalette("#000","#F80","#FFF","#EEE");		// javascrgeek only
	var cpFlickr=new colorPalette("#FFF","#FF0084","#0063DC","#FFF");	// pink my blue
// choose yours
var GMSUCPal=cpUserscript; 	// colorPalette you prefer

/* launching script version control  */
GM_scriptVersionControl();

// define launch function
function GM_scriptVersionControl() {
	if(self.location==top.location) { // avoid script execution in each frame of the page
		// test if script should be performed to control new release regarding frequency
		var GMSUCreleaseDate=new Date();
		GMSUCreleaseDate.setFullYear(eval(thisReleaseDate.substring(0,4)),eval(thisReleaseDate.substring(4,6))-1,eval(thisReleaseDate.substring(6,8)));
		var GMSUCtoday=new Date(); var GMSUCdif=Math.floor((GMSUCtoday-GMSUCreleaseDate)/1000/60/60/24);
		if (GMSUCdif%GMSUCfreq==0) {
			GMSUC_Control();
			}}}

// define control function
function GMSUC_Control() {
	var scriptId=thisId;var version=thisVersion;
	var scriptUrl="http://userscripts.org/scripts/source/"+scriptId+".meta.js";
	// go to script home page to get official release number and compare it to current one
	GM_xmlhttpRequest({
		method: 'GET',
		url: scriptUrl,
		headers: {
			 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			 'Accept': 'text/html,application/xml,text/xml',
			 },
		onload: function(responseDetails) {
			var textResp=responseDetails.responseText;
			var offRel=/\/\/\s*@version\s*(.*)\s*\n/i.exec(textResp)[1];
			var scriptName=/\/\/\s*@name\s*(.*)\s*\n/i.exec(textResp)[1];
			if(offRel!=version) {
				// Styling
				GM_addStyle("#GMSUC-alerte {position:absolute;top:80px;left:35px;margin:50%px 0 0 -128px;padding:6px;width:250px;-moz-border-radius:6px;background:"+GMSUCPal.light+";border:"+GMSUCPal.back+" 1px solid;color:"+GMSUCPal.back+";font-size:1em;text-align:center} #GMSUC-alerte a {font-weight:bold;font-size:1em} #GMSUC-alerte * {color:"+GMSUCPal.back+";} #GMSUC-alerte table {width:100%;margin:0.5em 0 0 0} #GMSUC-alerte td {width:33%;text-align:center;border:solid 1px "+GMSUCPal.back+"} #GMSUC-alerte td:hover{background:"+GMSUCPal.high+"} #GMSUC-alerte td:hover a {color:"+GMSUCPal.back+"} #GMSUC-timer {font:2em bold;margin:0.5em 0 0 0} #GMSUC-info {text-align:right;font:0.5em serif;margin:1em 0 0 0} #GMSUC-info a {font:0.75em serif}  #GMSUC-info a:hover {background:"+GMSUCPal.back+";color:"+GMSUCPal.front+"}");
				// Lang detection and apply
				var Langues="en, fr";
				var lang=navigator.language;
				var reg=new RegExp(lang,"g");
				if(!Langues.match(lang)) lang="en";
				/* traductions / translations */
					var Txt=new Array();
					for(i=1;i<7;i++) {Txt[i]=new Array();} 
					// francais
					Txt[1]["fr"]="Vous utilisez la version";
					Txt[2]["fr"]="du script";
					Txt[3]["fr"]="La version officielle est differente";
					Txt[4]["fr"]="installer";
					Txt[5]["fr"]="voir le code";
					Txt[6]["fr"]="propulse par";
					// english
					Txt[1]["en"]="You're using";
					Txt[2]["en"]="version of";
					Txt[3]["en"]="script. There's an update avalable";
					Txt[4]["en"]="install";
					Txt[5]["en"]="view source";
					Txt[6]["en"]="powered by";
				/* ------------------------------- */	
				var alerte=document.createElement('div');
				alerte.setAttribute('id','GMSUC-alerte');
				var GMSUCtextAlerte=Txt[1][lang]+" "+version+" "+Txt[2][lang]+" <i><b>"+scriptName+"</b></i>";
				GMSUCtextAlerte+=". "+Txt[3][lang]+" (<a href='http://userscripts.org/scripts/show/"+scriptId+"'>"+offRel+"</a>)";
				GMSUCtextAlerte+="";
				GMSUCtextAlerte+="<table><tr><td><a href='http://userscripts.org/scripts/show/"+scriptId+"'>v."+offRel+"</a></td><td><a href='http://userscripts.org/scripts/review/"+scriptId+"'>"+Txt[5][lang]+"</a></td><td><a  href='http://userscripts.org/scripts/source/"+scriptId+".user.js'>"+Txt[4][lang]+"</a></td></tr></table>"
				if(GMSUCtime>0) GMSUCtextAlerte+="<div id='GMSUC-timer'>"+GMSUCtime+" s</div>";
				GMSUCtextAlerte+="<div id='GMSUC-info'>"+Txt[6][lang]+" <a href='http://sylvain.comte.online.fr/AirCarnet/?post/GreaseMonkey-Script-Update-Control'>GM Script Update Control</a></div>";
				document.body.appendChild(alerte);
				document.getElementById('GMSUC-alerte').innerHTML=GMSUCtextAlerte;
				if(GMSUCtime>0) {
					function disparition() {
						if(GMSUCtime>0) {
							document.getElementById("GMSUC-timer").innerHTML=GMSUCtime+" s";
							GMSUCtime+=-1;
							setTimeout(disparition,1000)
							}
						else document.getElementById("GMSUC-alerte").setAttribute("style","display:none");
						}
					disparition();
					}
				}
			}
		});
	}

/* Color palette creator */	
function colorPalette(b,h,f,l) {this.back=b;this.high=h;this.front=f;this.light=l;}	
	
/******* END OF SCRIPT VERSION CONTROL **********/
