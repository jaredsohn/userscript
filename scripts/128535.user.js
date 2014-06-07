// ==UserScript==
// @id             learn.humboldt.edu-55e9c406-aa76-4167-bbef-359adce0f911@scriptish
// @name           myHumboldt and HSU Moodle Auto-Login
// @version        1.3
// @namespace      
// @author         
// @description    For myHumboldt, clicks "Log in" button automatically. For HSU Moodle, clicks "My moodle" automatically.
// @include        https://cas.humboldt.edu/cas/login?method=POST&service=https://portal-prd.humboldt.edu/psp/PAHUMPRD/?cmd=login%26languageCd=ENG%26userid=PS%26pwd=z
// @include        http://learn.humboldt.edu/
// @run-at         document-idle
// @download       http://userscripts.org/scripts/source/128535.user.js
// ==/UserScript==
if(document.URL.indexOf("https://cas.humboldt.edu/cas/login") >= 0) {document.getElementsByName('submit')[0].click();}
if(document.URL.indexOf("learn.humboldt.edu") >= 0 && document.referrer != 'http://learn.humboldt.edu/my/') {window.location.href = 'http://learn.humboldt.edu/my/';}
