// ==UserScript==
// @name           FDDB Autofocus on search
// @namespace      http://www.fddb.info
// @description    Sets the input focus on the search field
// @include        http://fddb.info/*
// @include        http://*.fddb.info/*
// @version $Revision: 0.0.1 $
// @date    $Date: 2013/04/06 10:30:00 $
// @author Carsten Ringe <carsten@kopis.de>
// ==/UserScript==

document.getElementsByName('search')[0].focus();

