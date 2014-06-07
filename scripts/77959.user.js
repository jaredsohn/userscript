// ==UserScript==
// @name            Google Reader Maximize
// @namespace       http://userstyles.org
// @author          huangruhua
// @homepage        http://uxcode.info
// @include         http://www.google.com/reader*
// @include         https://www.google.com/reader*
// ==/UserScript==

var style = "#gbar,#guser,#logo-container,.gbh,#chrome-view-links{display:none} " +
    "#search{left:264px !important;top:0;z-index:9999;margin-top:0 !important;} " +
        ".lhn-hidden #search{left:66px !important;} " +
            "#chrome-title{margin-left:400px;}" +
                    "#main{top:0;height:100%;margin-top:0 !important;} " +
                        "#viewer-footer{display:none; } " +
                            "#viewer-top-controls{padding:0 3px;}" +
                                "#chrome-header{padding:3px 11px;}" +
                                    "#gbg .gbt{ line-height:20px; }" +
                                        "#gbg .gbtb2,#gbz,#gbx1,#gbx2,#gbx3,#gbx4,#gbg .gbtcb{ display:none; }" +
                                            "#gbgs5{ padding:3px 6px 0; }" +
                                                "#chrome #chrome-header{padding-top:1px; padding-bottom:1px; }" +
                                                    "#lhn-add-subscription{ margin:1px 0 0px 10px }";


GM_addStyle(style);
