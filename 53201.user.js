// ==UserScript==
// @name          Custom Dark Igoogle (works well with netbooks)
// @namespace     http://userstyles.org
// @description	  Set this as your igoogle theme http://www.google.com/ig/directory?type=themes&url=www.obnocktious.com/carbonfiber/carbon_fiber.xml and then add the style and it will look sweet.
// @author        jr4594
// @homepage      http://userstyles.org/styles/19310
// @include       *www.google.com/ig*
// @include       *www.google.com/
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); /* Hide the tab bar */ #full_nav{ display: none !important; } /* Hide tab bar background */ #col1{ display: none; } /* Bring the search box, logo right near the top */ #gsea{ padding-top: 1px !important; padding-bottom: 2px !important; } /* Hide menubar at top (uncomment to hide)*/ /* #gbar, #guser, .gbh{ display: none; } */ /* Hide entire search area (uncomment to hide) */ /* #gsea, #nhdrwrapsizer { display: none; } */ /* Hide google logo (uncomment to hide) */ /* .gsealog{ display: none; } */ /* Hide search box (uncomment to hide)*/ /* .gseain{ display: none; } */ /* Hide advanced search, preferences, etc. links (uncomment to hide)*/ /* .gseaopt { display: none; } */ /* Hide 'personalize this page, add stuff, etc. links. */ .personalize_link{ display: none; } /* Hide gradient (in header, below search buttons) */ div.gradient { display: none; } /* Hide 'new user demo' from header */ #new_user_demo{ display: none; } /* Remove space between search buttons and modules area */ #modules{ padding: 0px !important; } /* Hide descriptions/ article snippets below RSS links*/ .ftext{ display: none; } /* Hide space between links inside modules (show links closer to each other) */ .fpadv2, .fb, .fpadv2last{ padding: 2px !important; } /* Reduce some of the empty space at the bottom of each module */ .modboxin { padding-bottom:1px !important; } /* Reduce space between module boxes (scrunch the boxes together) */ .modbox{ margin: 1px !important; } #modules, #col2, .rnd2, .rnd3, .leftselectedtab, .modbox {background-color:#606060 !important;} .rnd_modtitle .rnd2, .rnd_modtitle .rnd3, .rnd_modboxin .rnd2, .rnd_modboxin .rnd3 { background-color:#1d1d1d !important;} .modboxin { background-color:#ffffff !important;} #nhdrwrapsizer {height:95px !important;} .gbh {top:15px !important; border:0 !important;} #footerwrapinner, #footerwrap {display:none !important;} #modules .yui-b {margin:0 !important;} body {background-color: #000 !important;}";
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
