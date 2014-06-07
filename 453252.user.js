// ==UserScript==
// @name           Agilebits Blog Print-Friedly
// @version        1.0
// @namespace      http://www.arthaey.com
// @description    Makes the Agilebits blog print only the article content.
// @include        http://blog.agilebits.com/*
// @grant          GM_addStyle
// ==/UserScript==

GM_addStyle("@media print {                                          \
  aside, header, footer, #globalNav, #subNav, #mainContent > p {     \
    display: none                                                    \
  }                                                                  \
                                                                     \
  body {                                                             \
    background: none                                                 \
  }                                                                  \
                                                                     \
  #contentWrapper, #mainContent {                                    \
    width: 100%;                                                     \
    box-shadow: none;                                                \
    -webkit-box-shadow: none                                         \
  }                                                                  \
");