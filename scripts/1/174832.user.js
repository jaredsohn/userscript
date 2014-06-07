// ==UserScript==
// @name         Prevent auto-refresh of News Corp Australia Newspapers
// @namespace    Silico
// @version      1
// @description  Stops auto-refresh reload of the main pages of News.com.au, The Australian, The Daily Telegraph, The Herald Sun, The Courier Mail, The Advertiser, and Perth Now
// @match        http://www.news.com.au
// @match        http://www.theaustralian.com.au
// @match        http://www.dailytelegraph.com.au
// @match        http://www.heraldsun.com.au
// @match        http://www.couriermail.com.au
// @match        http://www.adelaidenow.com.au
// @match        http://www.perthnow.com.au
// @run-at       document-start
// ==/UserScript==

unsafeWindow.DONTREFRESHPLEASE = 1;