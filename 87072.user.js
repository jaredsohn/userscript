// ==UserScript==
// @name           Amazon Shopping Cart Images
// @namespace      rob.iverson
// @description    Shows product images in your amazon shopping cart
// @include        http://www.amazon.com/gp/cart/view.html*
// ==/UserScript==


(function() {

    var nows = document.getElementsByName("tobuynow");
    
    GM_log("found " + nows.length + " 'tobuynow' elements");
    if ( nows.length > 0 ) {
        var tbody = nows[0];
    
        while ( tbody != null && tbody.tagName != "TBODY" ) {
            tbody = tbody.parentNode;
        }
    
        if ( tbody != null ) {
            addImagesToTBody(tbody);
        }
    }

    var laters = document.getElementsByName("savedforlater");
    
    if ( laters.length > 0 ) {
        var tbody = laters[0];
    
        while ( tbody != null && tbody.tagName != "TBODY" ) {
            tbody = tbody.parentNode;
        }
    
        if ( tbody != null ) {
            addImagesToTBody(tbody);
        }
    }

    function addImagesToTBody(tbody) {    
        var row = 0;

        for (var i = 0 ; i < tbody.childNodes.length ; i++) {
            if ( tbody.childNodes[i].tagName != "TR" ) {
                continue;
            }

            var tr = tbody.childNodes[i];

            if ( row > 0 && tr.childNodes.length > 1) {
                // this row is a product row

                var purl = null;

                var bs = tr.getElementsByTagName("B");
                for (var j = 0 ; j < bs.length ; j++) {
                    var as = bs[j].getElementsByTagName("A");
                    if ( as.length == 0 ) {
                        continue;
                    }
                    purl = as[0].href;
                }

                var newTD = document.createElement("TD");
                newTD.appendChild(document.createTextNode("Retrieving Image"));
                newTD.style.width  = "100px";
                newTD.style.height = "100px";
                newTD.style.paddingTop    = "0px";
                newTD.style.paddingLeft   = "0px";
                newTD.style.paddingBottom = "0px";
                newTD.style.paddingRight  = "0px";

                GM_log("inserting TD element before first child of " + tr.tagName);
                newTD = tr.insertBefore(newTD,tr.firstChild);

                if ( purl != null ) {
                    retrieveImage(newTD,purl);
                }
            }

            row++;
        }
    }

    function retrieveImage(td,purl) {
        GM_xmlhttpRequest({
            method: "GET",
            url: purl,
            onload: function(response) {
                GM_log("response(); url=" + response.finalUrl + "; length=" + response.responseText.length);

                try {
                    var index = -1;
                    while ( (index=response.responseText.indexOf('<img',index+1)) >= 0 )
                    {
                        var endIndex = response.responseText.indexOf('>',index);
                        var tag = response.responseText.substr(index,endIndex-index+1);
                        GM_log("checking img=\"" + tag + "\" for stuff (index=" + index + ")");

                        if ( tag.indexOf('id="prodImage"') < 0 
                             && (tag.indexOf('width="300"') < 0 || tag.indexOf('height="300"') < 0) )
                        {
                            continue;
                        }
                        if ( tag.indexOf('src="http') < 0 ) {
                            continue;
                        }
                        var srcIndex = tag.indexOf('src="') + 'src="'.length;
                        var srcEnd = tag.indexOf('"',srcIndex);

                        GM_log("  found 300x300 IMG from index=" + index + " to " + endIndex);
                        GM_log("     " + tag.substr(srcIndex,srcEnd-srcIndex));

                        var newIMG = document.createElement("IMG");
                        newIMG.src = tag.substr(srcIndex,srcEnd-srcIndex);
                        newIMG.style.width  = "100px";
                        newIMG.style.height = "96px";

                        td.replaceChild(newIMG,td.firstChild);
                        break;
                    }
                    if ( index < 0 ) {
                        td.replaceChild(document.createTextNode("Image Not Found"),td.firstChild);
                        //GM_log(response.responseHeaders);
                    }
                }
                catch (err) {
                    GM_log("error in onload processing");
                    td.replaceChild(document.createTextNode("Error"),td.firstChild);
                }
            }
        });
    }
    
})();

