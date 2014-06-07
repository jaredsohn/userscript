// ==UserScript==
// @name           prixcarburants
// @namespace      wadouk.zapto.org
// @include        http://www.prix-carburants.gouv.fr/index.php?module=internaute*
// ==/UserScript==

{
	
      //this is being used in a whole bunch of scripts, but i don't know the source
      //i should figure out who the autor is, and credit him/her properly
      function evalXPath(expression, rootNode)
      {
        try
        {
          var xpathIterator = rootNode.ownerDocument.evaluate(
            expression,
            rootNode,
            null, // no namespace resolver
            XPathResult.ORDERED_NODE_ITERATOR_TYPE,
            null); // no existing results
        }
        catch (err)
        {
          GM_log("Error when evaluating XPath expression '" + expression + "'" + ": " + err);
          return null;
        }
        var results = [];

        // Convert result to JS array
        for (var xpathNode = xpathIterator.iterateNext();
             xpathNode;
             xpathNode = xpathIterator.iterateNext()) 
             {
               results.push(xpathNode);
             }
        return results;
      }
      
	window.addEventListener("load", function (){
		var tab_resultat = document.getElementById("tab_resultat");
		var tbody = tab_resultat.getElementsByTagName("tbody")[0];
		var lignes = tbody.getElementsByTagName("tr");
		GM_log("lignes.length="+lignes.length);
		var t_th = lignes[0].getElementsByTagName("th");
		GM_log("t_th.length="+t_th.length);
		for (var i = 1;i<t_th.length-1;i++) {
			//GM_log("hello");
			var th = t_th[i];
			var href=th.getElementsByTagName("a")[0].getAttribute("href");
			//GM_log("href="+href);
			var t_href = href.split(/\?|&|=/g);
			//GM_log("t_href.length="+t_href.length);
			var order = t_href[t_href.length-1];
			//GM_log("order="+order);
			order = order.split("_")
			var gaz_type = order[order.length-1];
			var type_cel = order[1];
			var gh, dh;
			if (gaz_type == "3" || gaz_type == "4") {
				//GM_log("gaz_type="+gaz_type + " " + th.getElementsByTagName("a")[0].textContent);
				t_th[i].style.display='none';
				//GM_log("removed="+th.textContent);
				//GM_log("removed="+lignes[0].removeChild(th).textContent);
			} else if (gaz_type == "2") {
				if (type_cel == "lmdate")
					dh = th;
				else
					gh = th;
			}
		}
		lignes[0].removeChild(dh);
		lignes[0].removeChild(gh);
		lignes[0].insertBefore(dh,t_th[4]);
		lignes[0].insertBefore(gh,t_th[4]);
		
		// remove 6 & 7 & 10 & 11(se termine par 3 ou 4)
		// 1 déplacer après le 3
		
		
		for (var i = 1;i<lignes.length;i++) {
			var pdv_id = lignes[i].getAttribute("id");
			var cels = lignes[i].getElementsByTagName("td");
			//GM_log("pdv_id="+pdv_id+" match?"+pdv_id.substring(0,3));
			if (pdv_id.substring(0,3) == "pdv") {
				cels[11].style.display='none';
				cels[10].style.display='none';
				cels[7].style.display='none';
				cels[6].style.display='none';
				var gd,dd;
				gd = cels[12];
				dd = cels[13];
				lignes[i].removeChild(gd);
				lignes[i].removeChild(dd);
				lignes[i].insertBefore(dd,cels[4]);
				lignes[i].insertBefore(gd,cels[4]);
				
			} else {
				//GM_log("ko pdv_id="+pdv_id);
			}
		}
		
	},true);
}