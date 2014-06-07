// ==UserScript==
// @name       Poona (FFBaD)
// @namespace  http://pragmasphere.com/
// @version    0.1
// @description Ajoute les saisons précédentes manquantes à Poona (Férération Française de Badminton)
// @match      http://poona.ffbad.org/*
// @copyright  2013, Toilal
// @homepage	  http://userscripts.org/scripts/show/180178
// @updateURL	  http://userscripts.org/scripts/source/180178.meta.js
// @downloadURL	  http://userscripts.org/scripts/source/180178.user.js
// @require http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

var saison = $("select#paquet_select_saison");

saison.prepend("<option label=\"Saison 2012-2013\" value=\"10\">Saison 2012-2013</option>");
saison.prepend("<option label=\"Saison 2011-2012\" value=\"9\">Saison 2011-2012</option>");
saison.prepend("<option label=\"Saison 2010-2011\" value=\"8\">Saison 2010-2011</option>");
saison.prepend("<option label=\"Saison 2009-2010\" value=\"7\">Saison 2009-2010</option>");
saison.prepend("<option label=\"Saison 2008-2009\" value=\"6\">Saison 2008-2009</option>");
saison.prepend("<option label=\"Saison 2007-2008\" value=\"5\">Saison 2007-2008</option>");
saison.prepend("<option label=\"Saison 2006-2007\" value=\"4\">Saison 2006-2007</option>");
saison.prepend("<option label=\"Saison 2005-2006\" value=\"3\">Saison 2005-2006</option>");
saison.prepend("<option label=\"Saison 2004-2005\" value=\"2\">Saison 2004-2005</option>");
saison.prepend("<option label=\"Saison 2003-2004\" value=\"1\">Saison 2003-2004</option>");