// ==UserScript==
// @name          LF Collapsible Comments
// @namespace     http://users.linkfilter.net/~deathburger/
// @description	  Collapsible comment boxes
// @include       http://linkfilter.net/*
// @include       http:www.//linkfilter.net/*
// @exclude       http://beta.linkfilter.net/*
// ==/UserScript==

// If you're looking to use a script to learn how to do basic Greasemonkey scripting, please choose another one.
// If you're looking for a way to encode your images like plus and minus in this script, go here:
// http://software.hixie.ch/utilities/cgi/data/data

(function() {
  window.addEventListener("load", function(e) {

    var minus = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0C%00%"+
		"00%00%0C%08%06%00%00%00Vu%5C%E7%00%00%00%06bKGD%00%FF%00%FF%00%FF"+
		"%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%"+
		"18%00%00%00%07tIME%07%D5%05%18%011%06%FD%96%1F%8C%00%00%00%3DIDAT"+
		"x%DAc%5C%B4h%D1%7F%06R%00)%1A%16-Z%F4%9F%89%81D%40%B2%06%16(%FD%9"+
		"FT%0D%0C%FF%FF%E3%D7%C3%C8%C8H%99%93%E0%26%10%AB%81%91H%0B%E8%10%"+
		"AC%8C%A4%26%0D%00%E5%B9%10%B3%8B%00A%8C%00%00%00%00IEND%AEB%60%82"
    var plus =	"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0C%00%"+
		"00%00%0C%08%06%00%00%00Vu%5C%E7%00%00%00%06bKGD%00%FF%00%FF%00%FF"+
		"%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%"+
		"18%00%00%00%07tIME%07%D5%05%18%013%09_%1F%60%9F%00%00%00WIDATx%DA"+
		"%A5%92A%0A%C00%08%04%D7%E0%3B%7D%DC~t%7B%13%1B%0C%D4%D4%A3%E28%8A"+
		"FR%18%84%03%40DX%C9%ED%80%AC%91%D4%EA(%92%20%F5%83%17%86%E1%07%0D"+
		"%9C%14%BDjtj%B9%88%D9%3F%A5%24Tr%CD%ED%0D%9F%CE%0A%40%F7J%2Fd%A3%"+
		"92%B5%E9k%3Cl~%1D%E8%F8%90%09%5B%00%00%00%00IEND%AEB%60%82"
    var buf =	"\n<!--\nfunction dbcollapse(id)\n{\n  c = document.getElementById"+
		"(id);\n  if (c.style.display == '')\n    c.style.display = 'none'"+
		";\n  else\n    c.style.display = '';\n\nvar col = document.getEle"+
		"mentById(id + 'col');\ncol.setAttribute('src',c.style.display == "+
		"'none' ? '"+plus+"' : '"+minus+"');    col.setAttribute('title',c"+
		".style.display == 'none' ? 'Click here to expand' : 'Click here t"+
		"o collapse');\n}\n\n//-->\n";

    var head = document.getElementsByTagName("head").item(0);
    var collapser = document.createTextNode(buf);
    var collapse = document.createElement("script");
    collapse.setAttribute("language","Javascript");
    collapse.setAttribute("type","text/javascript");
    collapse.appendChild(collapser);
    head.appendChild(collapse);

    var tds = document.getElementsByTagName("td");
    for(i=0;x=tds[i];++i)
    {
	if((x.getAttribute("height") != null) && (x.childNodes[1].getAttribute('name') != null))
	{
		var name = x.childNodes[1];
		if(name.attributes[0].value == "")
		    continue;
		var tds2 = document.getElementsByTagName("td");
	        for(j=0;y=tds2[j];++j)
	        {
		    
		    if((y.getAttribute("id") == null)
		      && (y.getAttribute("width") == null)
		      && (y.getAttribute("colspan") == null)
		      && (y.getAttribute("class") == "td-body"))
		    {
			if(y.childNodes[3] && y.childNodes[3].getAttribute('href') == "/?s=j" 
			  || (y.childNodes[1] && y.childNodes[1].getAttribute("width") == "100%")
			  || (y.childNodes[1] && y.childNodes[1].nodeName == "FORM"))
			    continue;
			y.setAttribute("id",name.attributes[0].value);
			break;
		    }
		    if(i == tds2.length)
			break;
		}
		var dbcol = document.createElement('img');
		dbcol.setAttribute("src",minus);
		dbcol.setAttribute("onclick","return dbcollapse('" + name.attributes[0].value + "');");
		dbcol.setAttribute("title","Click here to collapse");
		dbcol.setAttribute("id",name.attributes[0].value + "col");
		x.insertBefore(dbcol,name);
    	}
	if(i == tds.length)
	    break;
    }
  }, false);
})();
