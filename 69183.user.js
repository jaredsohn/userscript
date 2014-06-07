// ==UserScript==
// @name          Chrome like highlight
// @namespace     http://d.hatena.ne.jp/mooz/
// @description   Highlight focused element like google chrome
// @author        mooz
// @homepage      http://github.com/mooz/
// @include       http://*
// @include       file://*
// ==/UserScript==

// This script is based on the following script "http://userstyles.org/styles/305".

(function () {
     var css = <><![CDATA[
                    *:focus {
                        outline: 2px solid rgba(254, 192, 26, 0.7) !important;
                        outline-offset: 1px !important;
                        outline-radius: 2px !important;
                    }

                    button:focus,
                    input[type="reset"]:focus,
                    input[type="button"]:focus,
                    input[type="submit"]:focus,
                    input[type="file"] > input[type="button"]:focus {
                        outline-radius: 4px !important;
                    }

                    button:focus::-moz-focus-inner {
                        border-color: transparent !important;
                    }

                    button::-moz-focus-inner,
                    input[type="reset"]::-moz-focus-inner,
                    input[type="button"]::-moz-focus-inner,
                    input[type="submit"]::-moz-focus-inner,
                    input[type="file"] > input[type="button"]::-moz-focus-inner {
                        border: 1px dotted transparent !important;
                    }

                    textarea:focus, button:focus, select:focus, input:focus {
                        outline-offset: -1px !important;
                    }

                    input[type="radio"]:focus {
                        outline-radius: 12px;
                        outline-offset: 0px !important;
                    }

                    a:focus {
                        outline-offset: 0px !important;
                    }

                    a:active {
                        outline: none !important;
                    }
]]></>.toString();

     GM_addStyle(css);
})();
