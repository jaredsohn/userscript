/*
 * Copyright (c) 2010 by FlashCode <flashcode@flashtux.org>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*
 * Hide some unwanted sections on LinuxFr.org
 *
 * History:
 * 2010-02-10, FlashCode <flashcode@flashtux.org>:
 *     version 0.1: initial release
 */

// ==UserScript==
// @name           linuxfr_filter
// @namespace      http://userscripts.org/users/flashcode
// @description    Hide some unwanted sections on LinuxFr.org
// @include        http://linuxfr.org/news/*
// @include        https://linuxfr.org/news/*
// @version        0.1
// ==/UserScript==

(function() {
    
    /*
    List of sections to hide on linuxfr.
    Possible sections, as of 2010-02-10:
        [ "Articles", "BSD", "Cinéma", "Code", "Développeur", "Distribution", "Humeur",
          "Infos Locales", "Internet", "Interview", "Livre", "Logiciel", "Petites brèves",
          "Presse", "Sécurité", "Test" ];
    */
    var hideSections = [ "Cinéma", "Infos Locales" ];
    
    var divs = document.evaluate("//div[contains(@class, 'contentnews')]", document, null,
                                  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
    var i = 0;
    while (i < divs.snapshotLength)
    {
        var div = divs.snapshotItem(i);
        section = document.evaluate("h1/a/text()", div, null, XPathResult.STRING_TYPE, null).stringValue;
        if (section.length != 0)
        {
            hide = false;
            for (var j = 0; j < hideSections.length; j++)
            {
                if (section == hideSections[j])
                {
                    hide = true;
                    break;
                }
            }
            if (hide)
            {
                div.style.display = "none";
                if (i < divs.snapshotLength - 1)
                {
                    var div = divs.snapshotItem(i+1);
                    div.style.display = "none";
                    i++;
                }
            }
        }
        i++;
    }
})();
