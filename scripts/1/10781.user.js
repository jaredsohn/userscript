// ==UserScript==
// @name           Zakop
// @namespace      http://www.cudi.pl
// @description    Pozwala wysyłać raporty bezpośrednio ze strony głównej i wykopaliska w serwisie Wykop.pl
// @include        http://www.wykop.pl/
// @include        http://www.wykop.pl/?page=*
// @include        http://www.wykop.pl/wykopalisko*
// @include        http://www.wykop.pl/ludzie/*/linki/komentowane*
// @include        http://www.wykop.pl/ludzie/*/linki/ulubione*
// @include        http://www.wykop.pl/ludzie/*/linki/wykopane*
// @include        http://wykop.pl/
// @include        http://wykop.pl/?page=*
// @include        http://wykop.pl/wykopalisko*
// @include        http://wykop.pl/ludzie/*/linki/komentowane*
// @include        http://wykop.pl/ludzie/*/linki/ulubione*
// @include        http://wykop.pl/ludzie/*/linki/wykopane*
// ==/UserScript==

(function() {
	var result = document.evaluate("//div[@class='wykop-details']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);


    for (var i = 0; i < result.snapshotLength; i++) {
        var details     = result.snapshotItem(i);
		var id          = details.parentNode.id.substring(7);
        var info        = details.getElementsByTagName('ul')[0];
		
		
		var zakopListItem   = document.createElement('li');
        var zakopLink       = document.createElement('a');
        var form            = document.createElement('form');
        var linkId          = document.createElement('input');
        var reportBody      = document.createElement('textarea');
        var submit          = document.createElement('input');
        
		
		zakopListItem.style.background = 'transparent url(/imgdesign/ico_tiny_zakop.gif) no-repeat scroll 0pt 2px';
        
        
        zakopLink.href = "javascript:void(0);";
        zakopLink.setAttribute('onclick', "var form = document.getElementById('zakopForm' + " + id + "); form.style.display = form.style.display == 'none' ? 'block' : 'none';");
        zakopLink.appendChild(document.createTextNode('Zakop!'));
        
        form.action = '/report/create';
        form.method = 'post';
        form.style.display = 'none';
        form.style.borderTop = '1px #EFF3F6 solid';
		form.style.borderBottom = '1px #EFF3F6 solid';
        form.style.marginTop = '1em';
        form.style.padding = '.5em';
        form.id = 'zakopForm' + id;

        linkId.type = 'hidden';
        linkId.name = 'report[link_id]';
        linkId.value = id;

        reportBody.cols = 40;
        reportBody.rows = 5;
        reportBody.name = 'report[body]';
        reportBody.style.border = '1px solid #E1DFDF';

        submit.type = 'submit';
        submit.name = 'commit';
        submit.value = 'Wyślij raport!';
        submit.className = 'submit-button';
        
        form.appendChild(linkId);
        form.appendChild(reportBody);
        form.appendChild(document.createElement('br'));
        form.appendChild(submit);
        
        zakopListItem.appendChild(zakopLink);
        info.appendChild(zakopListItem);
        details.appendChild(form);
    }
})();

