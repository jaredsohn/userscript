// ==UserScript==
// @name           rediriger ccnet
// @namespace      http://www.jibouleau.com/
// @description    Rediriger automatiquement vers le dernier build
// @include        http://devserver/ccnet/server/local/project/*/ViewProjectReport.aspx
// ==/UserScript==

window.open( window.location.href.replace("ViewProjectReport.aspx", "ViewLatestBuildReport.aspx"), "_self" );
