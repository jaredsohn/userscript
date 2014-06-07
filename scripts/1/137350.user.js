// ==UserScript==
// @name           Pardus autofoe2000
// @author         John Wu
// @namespace      pardus.at
// @description    saves time when foeing somebody who has foed you
// @include        http://*.pardus.at/messages_private.php*
// @grant          none
// @version        0.13
// ==/UserScript==

var foetext = /you to his foe list.|you to her foe list.|You are now on (.*) foe list!/;
var form1 = '<form name="dipl_lookup" action="diplomacy.php" method="post"><input type="hidden" name="action" value="lookup"><input type="hidden" name="lookup_name" value="';
var form2 = '"><button style="width:4.5cm" onclick="document.dipl_lookup.submit();">Autofoe?</button></form>';
var doc = document;
var td = doc.getElementsByTagName('td');
    for (var i=0;i < td.length;i++) {
        if (td[i].innerHTML.match(/<table/) == null) {
            if (td[i].innerHTML.match(foetext)) {
                var foo = td[i].innerHTML;
				try {
                var a = td[i].getElementsByTagName('a');
                var name = a[0].innerHTML;
                td[i].innerHTML = foo + form1 + name + form2;
				}
				catch(err)
				{
				//error handled
				}
            }
        }
    }