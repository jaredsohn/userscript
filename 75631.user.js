// ==UserScript==
// @name           Our Daily Bread Link To Bible Gateway
// @namespace      http://www.someurlthingherethatsprettyunique.com/blah/OurDailyBread
// @description    Our Daily Bread used to link to Bible Gateway for the main scripture chunk. Now, with this script, it does again.
// @include        http://odb.org/*
// ==/UserScript==


/*

  Author: MCE

  Our Daily Bread used to link directly to the Bible Gateway, but since has been replaceed with another site.
  Only works with main scripture chunk.
  
  Version: 1.0
    1.00 - First Release, 4/30/2010
    1.01 - Fixed include, adding wildcard, 5/02/2010

  TODO: Replace all links with BG links.
    
*/

(

function() {

    //find the scripture box link element
    var scriptureBox = document.evaluate("//div[@id='passage-box']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    
  	if (scriptureBox) {    
        //get the scripture text and the parent element    
        var html = scriptureBox.textContent.toString();        
        var parent = scriptureBox.parentNode;

        keyVerseBox = document.getElementById('key-verse-box');
        if (keyVerseBox) {
            parent.removeChild(scriptureBox); //remove the old scripture box since it haphazardly gets replaced by the reftagger
        
            //create our new box
            var box = document.createElement("div");
            box.className = "odb-box";
            keyVerseBox.parentNode.insertBefore(box, keyVerseBox);
            
            //add the new box to the DOM, complete with icon
            box.innerHTML = html.replace(/Read:\s*(.*)/,"Read: <a target='scripturewin' href='http://www.biblegateway.com/passage/?search=$1'>$1</a>" + GetBGIcon());
        }
    }


    function GetBGIcon()
        {
            //return "";
            //http://www.biblegateway.com/favicon.ico
            //yeah, we could link to the icon
            return "<img hspace='5' alt='BG Ico' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAYAAADwMZRfAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAADm0lEQVQ4T11Ta0yTZxg9baFAlRaFiRToEK2h6uzX0hYqgyCKFyaDKReFQREsrChF8TIWAoUqU4oUvMXLjAYWN1giGOstatQg2xhD5FInZqjFSWWMP+iSxfjj832pLOiTPF++fO93znuek/OAwwEtHn2YkyXrHpiZr+m7zBdoSsJnvQVo7szFxZ9zcWyXFlplAFwAF85V7jzw+ORL9fqPY/5piGhdr/QLmiPAjNs6NA8YME5I/iI9ajeAJT1xIwt7ZH6gFJzpPNwYqbfkzall/XnRAZEziKZbOtzt2IxmSzy0mxmo9EqEExUa2yZcGTKCvZWNWj8vUCYXT/RCb3SXy1t6TMyPIi831K9G1UgJTOe+wLpf83D1nh6/2wvxqDUdZwrCIWpJgcVZAlavwPJ3Y3Gxe01g3AurZiJrmX+sDx/Cm9kwn01CXrceTfWrkGJQQV0Rg8iuLWh/UoxnRJXvpQz0/5KLtoCZZAwO3HCvQn7JaVWPyyXecxPnQ9z/FXI781DYloa037bg0B9b8X1TMkpSFwHXM9F+cSPqmzegYKgIjk/mEBWEB/dNzMioVfOcCRH518bB07kDK3vysf1gPMp0cqhz5GD+LELLd4mwJkjBDBbiZsYSpDiKMbBwFtz5bsSW+ybF6Eid+lWczEcWKQaIgvl3spE9zXgwcwGi6jIZk15wsjEZhtZU2EJ9+egqlxvQX6XoHbao2R/ypVkUIBFCYEuHiDpP5qU9maHLGShxbIexMQnGh4U4avoU6YuDhW7/ndD2oK+SaRysDmc7y+R3Qj/yoLnh+njiw3K/loniLj22EoOLfkpFzWwP4KRuQdZYg+YcShMCV9jNyjGHRcVeKArLmQJRFTSVtGvjsWjYiFTiw6rrX2KjFw8CXZT/LELgOJgWsgTRUm90li09/WCvkn24TzlRkRi8IcTXY0oBl08SXRULgTkW7nu0ENLZcqL8Z/5tVXf0VSmuCPjcyR85pWsDxeMNEY+JyezzOvVrcmg1fR4cKpnNf2+mpRIRjCvFK57WqAbGGiL+3blaHETxIDdxaXbNSRIl2Z3HxGjWvlfBOq2acaLwfNs2mclWHFZuM8qOP7Ooup11Gna0PuIlWdYoiuNx30V/age+SQgK6DMpTj05oHrVW6lgH30bzj6tUZNWsUP7XU3CeaE0IUg6Hfd/Te4AKaEnD0cy5wUPW1TVfZUK+4BZOUzG6yHG7zucERpGz6f/T+stJu02iRFTSO4AAAAASUVORK5CYII='/>";
        }


}



)();