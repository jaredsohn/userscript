// ==UserScript==

// @name           	drei.to Direktlinks

// @namespace      	*

// @description	        Zeigt die Direktlinks bei Downloads von drei.to an !

// @include        	http://*drei.to/*/out.html

// ==/UserScript==



function getNewLink(url)

{

  	GM_xmlhttpRequest({
				method: "GET",
				url: url,
				onload: function(response) {

    			var nnewurl = "E";

    			tmp=response.responseText;



    			x1 = tmp.split('<frame src="');

    			for(f=1; f<x1.length; f++){

						x2 = x1[f].split('"');

						if(x2[0].substr(0,5) != '/?act'){

							nnewurl = x2[0];

						}

    			}

    			if(nnewurl == ''){

    				nnewurl = "Fehler";

    			}

          

    			newUrls[newUrls.length] = nnewurl;

    			ps = document.getElementsByTagName("input");

          

    			for(k=0; k<ps.length; k++){

      			if(ps[k].value == oldUrls[newUrls.length-1]){

        			ps[k].parentNode.innerHTML += "<br>" + "<a href='" + newUrls[newUrls.length-1] + "'>" + newUrls[newUrls.length-1] + "</a>";

        		}

      		}

	    		document.getElementById("allLinks").value += newUrls[newUrls.length-1]+"\n";
				}
			});

}



abc=1;

newUrls = [];

oldUrls = [];

ps=document.getElementsByTagName("input");

for(i in ps){

	if(ps[i].value.search(/\/link\/.+/) > 0){

		oldUrls[oldUrls.length] = ps[i].value;

		getNewLink(ps[i].value);

		abc=i;

	}

}



ps[abc].parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML += "<br><textarea id='allLinks' onfocus='this.select();' style='width:100%;height:200px'></textarea>"