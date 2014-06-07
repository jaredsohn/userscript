// ==UserScript==
// @name           URJC Campus Virtual - menubar fix
// @description    For the web site of "Universidad Rey Juan Carlos". Fixes a CSS display bug.
// @include        https://*campusvirtual.urjc.es*
// @include        http://*campusvirtual.urjc.es*
// @author         Nephiel
// @version        0.1
// @lastupdated    2011-04-13
// ==/UserScript==

GM_addStyle( "\n" + 
<style><![CDATA[

  .serverbar td br { display:none !important; }

]]></style> );
