// ==UserScript==
// @name           Google Voice SMS Expander
// @namespace      de7e9306ab6b0c1323c11b37b855160363030ccf7a87d26ee0751cf254d21b580629dd41e13bdf9cfb0fe8be80038b00749f701f9e3aed41bda08030103ea65e
// @description    Expands the "more messages" link in all Google Voice SMS conversations.
// @include        https://www.google.com/voice/*
// ==/UserScript==

GM_addStyle(".gc-message-sms-old { display: block !important; } .gc-message-sms-more { display: none !important; }");

