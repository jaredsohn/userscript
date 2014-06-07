// ==UserScript==
// @name           TESTSCRIPTBIBLIA
// @description    TESTSCRIPTBIBLIA
// @namespace      http://*biblia.com/*
// @include        http://*biblia.com/*
// @run-at         document-end
// ==/UserScript==
WebFontConfig = {
    google: { families: [ 'Cantarell:regular,italic,bold,bolditalic' ] }
};
(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
     
    var jq_script = document.createElement("script");
    jq_script.src = "http://jquery.com/src/jquery-latest.js";
    jq_script.type = "text/javascript";
    document.getElementsByTagName("html")[0].appendChild(jq_script);

    function wait_for_jquery(attempts) {
      try {
        $ = window.jQuery || this.jQuery;
      } catch(err) { alert(err); }
      if ($ == null || typeof $ == "undefined") {
        if (attempts > 0) {
          window.setTimeout(wait_for_jquery, 250, attempts-1);alert(attempts);
        }
      } else { letsJQuery(); }
    }
    wait_for_jquery(200);
    
    function letsJQuery() {
      alert($);
    $("head").append('<style id="BibliaFontTweaks" type="text/css"> .superscript { color: navy; } .resource-content { font-family: "Cantarell", sans !important; }</style>');
    $("head").append('<style id="sblfonts" type="text/css">@font-face { font-family: SBLGreek; src: local("SBL Greek"), url(http://www.sbl-site.org/Fonts/SBL_grk.ttf); font-weight: normal; font-style: normal; font-variant:normal;} @font-face { font-family: SBLHebrew; src: local("SBL Hebrew"), url(http://www.sbl-site.org/Fonts/SBL_Hbrw.ttf); font-weight: normal; font-style: normal; font-variant:normal;} .resourcetext .lang-el { font-family: SBLGreek !important; } .resourcetext .lang-he {font-family: SBLHebrew !important; } </style>');

    function changeToNiceCSS() {   
      $('span', '.lang-en').filter(function() {
	if ($(this).css('vertical-align') == 'super') {
	  $(this).addClass('superscript');
	}
	return false;
      });
    }

    $('.resource-pane').bind('LOCATION_MARKER_CHANGE', function() { changeToNiceCSS(); });

    $(window).load(function() {    
      changeToNiceCSS(); 
    });


    }

    
})();