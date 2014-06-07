// ==UserScript==
// @name       Arnaud45, miniatures NoelShack
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Afficher des miniatures pour NoelShack ! :)
// @match      http://*/*
// @copyright  2013+, Arnaud45
// ==/UserScript==


var hrefs = document.getElementsByTagName("A");
var str = '.noelshack.';
var test;
for(var i=0; i < hrefs.length; i++){
    test = hrefs[i].href;
    if(test.search(str) > 1){
        hrefs[i].href = hrefs[i].href.replace('www.', 'image.');
        hrefs[i].href = hrefs[i].href.replace('.com/', '.com/fichiers/');
		var re = new RegExp('-', 'g');
		hrefs[i].href = hrefs[i].href.replace(re, '/');
        hrefs[i].href = hrefs[i].href.replace('/img/', '-img-');

        hrefs[i].innerHTML = '<img src="'+hrefs[i].href+'" style="max-height:150px;max-width:150px;" />';                  
    }
}