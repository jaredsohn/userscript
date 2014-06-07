// ==UserScript==
// @name           SiteAdvisor Clone for Google
// @namespace      http://codr.us/category/Greasemonkey/SiteAdvisor-Clone-for-Google
// @description    This will check all links in your Google search results for safety against siteadvisor.com
// @include        *.google.*/search* 
// ==/UserScript==

var img_red = 'data:image/gif;base64,R0lGODlhEAAQAPe2AP7+/uzt7dNKU9p1i91RcPfS0+mSodN+kfje4sKxtNR6junq6u7w8Np7iuiLl9t9idlrg8ipsOrr6svOzs80Q+6jp95bd+bZ2/DGxMnNzebn5/O/xN9wfdZ8j9/g4NGjrOFge+eFmN1jefTL0/rs6vO8xN9ge8S5veh9ie7w79E0RuFoe9nZ2dPDxe+pr/DJx+rs689AReDj49eGk8tES+aCktIuSOV6j+JshOqRnN3O0OBogPnd4PP19d5heOiQmdfc2/O8wdhPZ/PBycsvN9iiqtY4Vcm7wNhQXtFNVN9ke+iKluuYoOJxiOODi+mNnN2Ql95XdPbNz+zu7e6qs9qZnt9ngOqRndyEjdZhYueOnuiNl+iBjN5Vc95TcuXm5tV6ju/w8OqSneBmgsqqsdxYdd5Tc+bT1e3q6+fb3Orn6Nzg4OBkfuJyiPvp6+urrtrZ2uyirPCyt8e8vvK/yPT19eN0i/z29M2dp+J2fe3v7+vt7NCOnPzw8s05Q+aGl/jV1+aBjt1ecuBXdeWcpP77++Jngc7Oztbb2t+ssPb3993g39zg3+OGjf33+NI8U9WPnffU19ppgtY+VfXO1drZ2dMzTu6mreXn5vCvtsogK+KFi91mdPvm6Oycpt1Vc9JNVdGOneR8keFsgdFSXtShqtIkROR2hffS1tva2cnJyfL09NVtguyfrPP09PDy8uuapvnf4N7Jy+Kts/PFzP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALYALAAAAAAQABAAAAj7AG0JFKgITZoLalwNXGirzhlCP3JscQJFVhiGr2ZxCdLJDY8SDjgUgTGwRyIULgAVkLLBU41RgkqlsAVARx4xkWIVqHCJCi06k0S0ALCqypIrmWrVksNEqRZLhiDp+YLlSZxAqGo56lOLkqk2bAZ4SPUghAFYpxAoRWBkRxMTkuBUanDjj4EVQ5SOsGHHigUILGTMwCFKSSulSt+oGPOpwyIGH0D44FSoVqNNSrM8GoRnCoBDA5CQqIVBE4UXte7EYKUKgK0AR0gJAEVESBk/SQTQSLBnoIY5YAiYidLFCwEFJzAxlDCBTKgDB/hEyLCA4cAAjIAgWhOAYUAAOw==';

var img_yellow = 'data:image/gif;base64,R0lGODlhEAAQAPfIAP7+/uzs7vriTPvsXe7u8Nra2fXaUvzwYP3zYenQbPXSSfbeV+rq7PjeSsrLz/ndS/fhV9bY3fbaYunp6tzd4bi3qsnKztzd4ProXOXm5/HZZfffV+nl1PfbUfbUR/HWXfPz9OLQkNbX3f7kSvXVTPLy9PzvXeXPc/Pz9XBxev/7X7Otif3jQO7s6O3u8PjkWGVnc3h6gfrpW/bcYvnnWuHOhPXbXszIuuXEZPrlUP//yvvkUvbWSPjiWOvSdv30YvXUSeHdyvXTRuvel//1X/ffVffSQvjdUfDw8/LsffXTSOrepfXZUurkiPXZUf32cuXYquPSaf/9uP3wY3N2hPjYSfDZbqSehvfZS2Jjb/nhUIKDhePIZebRd8jGusXCuMfDteDg4/fVOt3OlfbURPDYZ/zvX/zuX42Mg+Xl5vPOSvb29/XXUPPTT/fgV+zs7ffgVtzc4P70YtnZ2ufk0/njUe/v8f/5XebJae7SWv/6quDBaffiVurVeWxsdfvqWFlca/fdT/TST+7Vdf/5Z93b2urq6/XWS/XaUNfJc/njVezQYKupnvbTRe3Wbf74v/jbTOjYi+HawdvPnsnJyfXPP/z3qmhvgeG+Y+Xl5/bbU/bdVM/Hp/TWUPbcVPDbdPPUXevr7I6MgvT09vLfX/PTTn5+gPXbVJ6bhujcnNzMiPvkRv7gQv/uVevRaN/f4Onkx9XJmPTUS/LcdPTVT+PKavbVSs3Gp/bdU9XRv/TINerp5frlVe3QXfrpWPPfZPvsgXp6fc7Ozvztg+TOdv/4YdvMiPvnUv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAMgALAAAAAAQABAAAAj/AJEJFLimBQc6u0AMXIhsFKxPNmZIAOVDkh2GSIY0GPZIhxRgHdSEYDAQRSoBU/RYqsDoVx1cCsYQQAYgyBETCO40yQIoEYsNiATlAlAi0rEDclQk8QMjyio3BnjUcJHGyh8zP4o9CZaCVI4iBg65elVIg68BBxAQQmNqh6JNTkj0KlCgDC8ZA84QQSVqBARNbGQtmhOmj5YXNDC0WnGF1QImtJScuEBg0gM4fHoIWAJFzKlOpRrFCgBAmCNIngLN2hIDD5k2QhJQAoDszY0PVbAMonJpTyUPecCEGpjBSxdbRnBg0gWE2JdMDA054KSqFhdjtyxMYDgwQJwIIigEA2AYEAA7';

var img_green = 'data:image/gif;base64,R0lGODlhEAAQAPe9AP7+/u7s7UXDhE7DiPDu7/Dv8E7FiJPLoNzY2UfDhavesvTz9Eqicqvds+3s7FHGi0iZbp7breDe33yzlJ/brnHMl7Xhtl3EkIXGpaffu2OshYfGp1K8hLDLvFepfWnFl83a00zChpXKrqnauc/MzXXClvz9/fb09ers69fh3HfFnebp56TdsOnv6/Px8rjBvLfht+Pr56/gtYm/oEO/f9rZ2dnZ2pDAnKDcrpXarKLCsIfUoYTFopjEroDGnYHOnOfl5t/05JrSpV6ngIPFmKfOt3jDk5vFpj6vdz2hb4zFpLXhuNzm4dvl3pjZq+bl5svb0HPEnGDIk1vJj1qhfPf298DPx2/Ik8fZz37GnM7PzkuteMrYznjHnHvBm267jXfHn3bEneDd3+vq6vXz9MnJyaDJs1XFikecbu3t7VTGi8TXzv38/LPLvGGrg7rEv+fm587LzFrEj0jEhlTGjJjHrPDz8Wemhtfk3a/htv77/VvKkODf4GzFmK3es2CshNrx4LjiuUa2fJjKsIjDpYnUoo27oePh4rbSwHbGlc/s0rrGwLvlw3zCmXnFmpjXp03DiFTFitzY2qjetuHd31/Ekqfdstjm3f/+/0bDhLHMt1Wtfka5fdDv2YzFnFPFi9nj3KjFtknHiM/f1afCtKnNuNrb2/j5+Va9hcPXzNbv2YHUoEmgcYLFn43BoHC+kGakekK+gOrq6k/IibXCu3LLnezq6/Tz86zgtEXDhXbDnNna2v///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAL0ALAAAAAAQABAAAAj+AHsJFFgFBagUKxYMXNjrxCgljXxkKcFjTQGGLop8GQEoSKcMFVCJsDWQTCkjllQpYjQpR6IZmwYR6AUAxKsICpYE8oODCCI9biJZAXCrzg8KDSzAyHMACq8WHmZhIPCk1Q4nLHDJEKKJFy82Ggx84GPK0apCnm48OnLKKxYqIS7sstHliqsmXGBd8toBDQcDlWoc8jIBEy8TbbzqYLCHToIoEgqY2WLIjldeqVhNUTNAQI8AALTU4jQkBi88EM58GpCpTxkAvdIskkLjD5M7gh5AyiWHloOBcN6AiZUEiSgBc8K8AMJwDIlQG1ToIkQqjiyGAwOIkYSAUgCGAQEAOw==';

var links = document.getElementsByTagName('a');
for (var i=0; i<links.length; i++) {
    if (links[i].className == 'l') {
        var domain = ExtractDomainName(document.links[i].href.toLowerCase());
        span = document.createElement('span');
        s = span.cloneNode(true);
        s.setAttribute('id', 'checkstatus'+i);
        links[i].parentNode.appendChild(s);
        checkAdvisory(domain, i);
    }
}

// Check the site advisor website
// We use restricted.html because too many queries to /sites/domain blocks your IP
function checkAdvisory(domain, id) {
    GM_xmlhttpRequest({
        method:"GET",
        url:'http://www.siteadvisor.com/restricted.html?domain='+domain+'&suite=false&premium=true',
        onload:function(result) {
        if (result.responseText.indexOf('is rated green') !== -1) {
		document.getElementById('checkstatus'+id).innerHTML = ' <img src="'+img_green+'" title="This site is safe to browse">';
            }
        else if (result.responseText.indexOf('is rated yellow') !== -1) {
                document.getElementById('checkstatus'+id).innerHTML = ' <img src="'+img_yellow+'" title="This site might not be safe to browse">';
            }
        else if (result.responseText.indexOf('is rated red') !== -1) {
                document.getElementById('checkstatus'+id).innerHTML = ' <img src="'+img_red+'" title="This site is not safe to browse">';
            }
        }
    });
}

// Extract domain name
// Code obtained from http://willmaster.com/possibilities/
function ExtractDomainName(s) {
// Feed this function anything that looks like 
//   a domain name or URL. It will do its best 
//   to extract the domain without subdomains.

// For the comments, let's assume that s equals
//   "http://www.books.Example.co.uk:80/page.html"

// Remove http://, if present.
// (Result is "www.books.Example.co.uk:80/page.html")
var i = s.indexOf('//');
if(i > -1) { s = s.substr(i+2); }

// Remove path/file information, if present.
// (Result is "www.books.Example.co.uk:80")
i = s.indexOf('/');
if(i > -1) { s = s.substr(0,i); }

// Remove port number, if present.
// (Result is "www.books.Example.co.uk")
i = s.indexOf(':');
if(i > -1) { s = s.substr(0,i); }

// Return s if no letters (could be an IP address).
// (Doesn't apply to the example)
var re = /[a-z]/i;
if(! re.test(s)) { return s; }

// Split s into chunks on periods, store in array a.
// (Result is 
//          "www"
//          "books"
//          "Example"
//          "co"
//          "uk"
//    (5 chunks) )
var a = s.split('.');

// If less than 2 chunks, it's not really a domain name.
//   Just return s and be done with it.
// (Doesn't apply to the example)
if(a.length < 2) { return s; }

// Create domain name with last 2 chunks of array a.
// (Result is "co.uk")
var domain = a[a.length-2] + '.' + a[a.length-1];

// If more than 2 chunks ...
// (Yes, the example has 5 chunks)
if(a.length > 2) {
   // ... and if the last two chunks are each exactly 
   //   2 characters long, it's probably a domain with 
   //   the format Example.co.uk. Therefore, insert the 
   //   third from last chunk of array a into the front 
   //   of the domain name.
   // (The example "co.uk" matches those criteria where, if  
   //   "example.com" had been the domain, it would not.)
   // (Result is "Example.co.uk")
   if(a[a.length-2].length==2 && a[a.length-1].length==2) {
      domain = a[a.length-3] + '.' + domain;
      }
   }

// Lowercase the domain name and return it.
// (Result is "example.co.uk")
return domain.toLowerCase();
}