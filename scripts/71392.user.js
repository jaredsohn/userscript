// ==UserScript==
// @name          Gmail Highlight Current Row
// @description   Highlight current row (indicated by the arrow)
// @author        nameanyone
// @version       0.0.1
// @license       GPLv3
// @include       http://mail.google.tld/*
// @include       https://mail.google.tld/*
// require       http://code.jquery.com/jquery-latest.min.js
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

(function()
{
    $(document).ready(letsJQuery);
  
    function letsJQuery()
    {

        highlightCurrentRow();
        $("#canvas_frame").contents().keyup(listenJK);

        function highlightCurrentRow()
        {
            var curRow = $("#canvas_frame")
                             .contents().find('tr').removeClass('sel').end()
                             .find('.oZ-jd[style*=visibility]').closest('tr').addClass('sel');
        }

        function listenJK(event)
        {
            var key = {j: 74, k: 75 };
            switch (event.keyCode)
            {
                case key.j:
                case key.k:
                    highlightCurrentRow()
                    break;
            }
        }

    }

var css = '.sel { background-color: rgb(205,243,159) !important }';

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
