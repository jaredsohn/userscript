// ==UserScript==
// @name            Marktplaats image fixer
// @description     fixes marktplaats.nl so that photo's are regular links - so control-click still works.
// @include         http://www.marktplaats.nl*
// ==/UserScript==


(function () {

    const urlRegex = /\'[a-zA-Z0-9]+\'/ig;

    var candidates = document.getElementsByTagName("img");

    for (var cand = null, i = 0; (cand = candidates[i]); i++) {
        var clk = null;
	if ((clk = cand.getAttribute("onclick")) != null && (clk.toLowerCase().indexOf("viewphoto") != -1)) {
            var match = clk.match(urlRegex);

            if (match != null) {

        	var linkelem = document.createElement("a");
		var oldimg = cand
		var urlHref = new String();


		var mainTopic 	= match[0].substr(1, match[0].length - 2);
		var subTopic  	= match[1].substr(1, match[1].length - 2);
		var topicId	= match[2].substr(1, match[2].length - 2);

		urlHref = "/foto.php3?g=" + mainTopic + "&u=" + subTopic + "&ID="+ topicId;
		urlHref = urlHref + "&ret=%2Fmarkt%2F" + mainTopic + "%2F" + subTopic + "%2F"+ topicId + ".htm";
	
		linkelem.setAttribute("href", urlHref );
		linkelem.setAttribute("title","link");
		cand.setAttribute("onclick", "" );


        	cand.parentNode.replaceChild(linkelem, cand);
	
		linkelem.appendChild( oldimg );

            }
        }
    }

})();
