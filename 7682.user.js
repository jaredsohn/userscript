// ==UserScript==
// @name          ZabaSearch Enhancements
// @namespace     http://nullvariable.googlepages.com
// @description   Adds functionality to zabasearch to reverse phone numbers and addresses with whitepages.com
// @include       http://www.zabasearch.com*
// ==/UserScript==


	var wplogoico	= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABnRSTlMAAAAAAABupgeRAAAAqElEQVR4nO2Q0Q3DIAxEz8kiziQ4m2SUyyYZxWzCJvSDxlBSqQv0Pixs3klnA391uTtAgNN8/Yqq6nGUe2CAAd4amVB3Hydkf5AEsPQvcqJvDmOwBQBBdzMzEg8Do/ZItdbW5JwBmHkLEJyZRV0BiEhrVFVV911KKQGparNd1/U2uHt4mi3nPKIppW3bhh1IkiJynue0Q0rJzEQET0Xidq5Y7If4vNSnXgJTSyFyxP2IAAAAAElFTkSuQmCC";
	//var pretrievelogo = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%02%00%00%00%90%91h6%00%00%00%06tRNS%00%00%00%00%00%00n%A6%07%91%00%00%01OIDATx%9C%8D%92%B1j%02A%10%86%FF%BDx%0B%B1%88w%AC%20%06%84%25%CB!%B1%B1%D8w%B0M%15%92'%F0%11b%95%07P%9F%40%9F%23%95%C9%23%DC%06%D2%08%16%0B%97%E6%24%E0%E5%DC%C6b-Lqj%CE%D3%60%FEfa%E6%FBgf%99!%C8Ik%FD%96%F6%F3%11%09%F8~O%08%B1%8F%90%EC%D9%AC%97%E3%8F'%14%A4%00%B9%B5%05%C1%F0%AA%BC!%AEG%FE%A4%8F%D4m%0F%88%EB%5D%00%B8%BE%FB%3EK%03P_%AF%2Fc%E5%84%E1%E8%3Ft%26%AD%B5%03%A8%FF%1B%D2%B4_*%E0%C9%84%5Bk)%A5%00%18%8B%94%92%9C'MQ%9E%E9%95%B5%F6%F3%D6s%8E%CBPJ%19%8B%AC%B5U%AF%05%80u%A2%8C%A6%94%CE%F4%EA%84%01%00%24%E2%B8%BEXN%F7%81%B8%1E%B3N%C4XT%3A%86%8D1%98p%CE%93%ACCU%B7%AA%02%E6%DD%9F%CF%2F%E3zL%C2%B0%FB%FB%0D%85%24%E1%D9%18'%DA*H%09g%BB%CC%DD%24%C6%98%ACj%01%CD%B2%BE%DFsd%FB!%9F%BA%B9O%9B%A2%BC%10%D3%03%C3%EE%40%84%10%0Eq%BD%C7%60%98%CF%16%E9%9D%82%60%883%C7%97k%20%DB%03%E2z%00%C8f%BD%24%AEg%8C%A9T*a8R%87%8B%97%40%AD%F6%DCh4%F6u%7F%00%3E%5C%80H%A0p%A4%9A%00%00%00%00IEND%AEB%60%82";
/*<a href="http://www.zabasearch.com/redirects/addresslink_redir.php?a=10660%20HUNTINGTON%20HILLS%20DR&amp;c=LAS%20VEGAS&amp;s=NV&amp;z=89144" style="text-decoration: none;">*/

with_each("//a[contains(@href,'addresslink_redir.php')]", function(link) {  // ends-with() is apparently not supported
	var parent = link.parentNode;
	var wp_link = document.createElement("a");
	var pretrieve_link = document.createElement("a");
	
	var hrefa = String(link);
	hrefa = hrefa.replace("%20"," ");
	var hnumber = hrefa.substring(hrefa.search(/a=/),hrefa.search(/ /));
	hnumber = hnumber.replace("a=","");
	var spit = hrefa.split("=");
	var streetname = spit[1];
	streetname = streetname.substring(streetname.search(/ /),streetname.search(/&/));
	var zip = hrefa.substring(hrefa.search(/z=/));
	zip = zip.replace("z=","");
	var state = hrefa.substring(hrefa.search(/s=/));
	state = state.substring(state.search(/s=/),state.search(/&/));
	state = state.replace("s=","");
	var city = hrefa.substring(hrefa.search(/c=/));
	city = city.substring(city.search(/c=/),city.search(/&/));
	city = city.replace("c=","");
	/*10001/search/ReverseAddress?housenumber=" + hnumber + "&street=" + streetname + "&city_zip=" + zip + "&state_id=*/
	wp_link.href = "http://www.whitepages.com/10001/search/ReverseAddress?housenumber=" + hnumber + "&street=" + streetname + "&city_zip=" + zip + "&state_id=";
	wp_link.title = "Reverse on WP";
	wp_link.innerHTML= "<img border='0' src=" + wplogoico+ ">";
	wp_link.target = "_new";
	/*http://www.pretrieve.com/search.jsp?State=NV&searchType=address&City=las%20vegas&StreetAddress=123%20any
	THIS DOESN'T WORK FOR NOW, UNSURE HOW TO CORRECTLY PASS THE QUERY TO PRETRIEVE.
	city = city.replace(" ","%20");
	streetname = streetname.replace(" ","%20");
	pretrieve_link.href = "http://www.pretrieve.com/search.jsp?State=" + state + "&searchType=address&City=" + city + "&StreetAddress=" + hnumber + "%20" + streetname;
	pretrieve_link.title = "Reverse on Pretrieve";
	pretrieve_link.innerHTML= "<img border='0' src=" + pretrievelogo+ ">";
	pretrieve_link.target = "_new";
	*/
	parent.insertBefore(wp_link, link.nextSibling);
	//parent.insertBefore(pretrieve_link, link.nextSibling);
});


function $x(query, root) { return document.evaluate(query, root || document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); }
function with_each(query, cb, root) {
	var results = $x(query, root);
	for (var i = 0, j = results.snapshotLength; i < j; i++)
		cb(results.snapshotItem(i));
}
/* http://www.whitepages.com/10001/search/ReversePhone?phone= */


//default country prefix
const defaultPrefix= '';


 	const trackRegex = /(\+\d\d?)?[\-\s\/\.]?[\(]?(\d){2,4}[\)]?[\-\s\/\.]?\d\d\d[\-\s\/\.]?(\d){3,5}\b/ig;

	function trackUrl(t) {

		if (String(t).charAt(0)!= '+') t= defaultPrefix + String(t);
		return "http://www.whitepages.com/10001/search/ReversePhone?phone=" + (String(t).replace(/[\-\s\/\(\)\.]/g, ""));
	}

    // tags we will scan looking for un-hyperlinked urls
    var allowedParents = [
        "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body", 
        "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em", 
        "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
        "ins", "kdb", "li", "nobr", "object", "pre", "p", "q", "samp", "small", "span", "strike", 
        "s", "strong", "sub", "sup", "td", "th", "tt", "u", "var"
        ];
    
    var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ")" +
				//" and contains(translate(., 'HTTP', 'http'), 'http')" + 
				"]";

    var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    //var t0 = new Date().getTime();
    for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
        if (trackRegex.test(cand.nodeValue)) {
            var span = document.createElement("span");
            var source = cand.nodeValue;
            
            cand.parentNode.replaceChild(span, cand);

            trackRegex.lastIndex = 0;
            for (var match = null, lastLastIndex = 0; (match = trackRegex.exec(source)); ) {
                span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));
                
                var a = document.createElement("a");
		a.target = "_new";
                a.setAttribute("href", trackUrl(match[0]));
                a.appendChild(document.createTextNode(match[0]));
                span.appendChild(a);

                lastLastIndex = trackRegex.lastIndex;
            }

            span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
            span.normalize();
        }
    }
    //var t1 = new Date().getTime();
    //alert("UPS Tracking linkify took " + ((t1 - t0) / 1000) + " seconds");    
    
