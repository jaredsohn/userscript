// ==UserScript==
// @name           song2youtube
// @namespace      promoonly
// @include        http://www.promoonly.com/view_issue.php*
// ==/UserScript==


// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
        var table = $('td > table').eq(60);
        var i = 60; 
        while (!$('td',table).eq(0).html().match(/<b>#<\/b>/))
          table = $('td > table').eq(i++);
        $('tr',table).each(function() 
        {
          titre = $('td',this).eq(1);
          titre = $('a',titre).html();
          if (titre)
          titre = titre.replace("'","");
          else return;
          artist= $('td',this).eq(3).html();
          if (artist)
          artist = artist.replace("'","").replace("f./","feat ");
          lien = "<a href='http://fr.youtube.com/results?search_query="+artist+"+"+titre+"&search_type=&aq=f' target=_blank>Youtube</a>";
          lien2 = "<a href='http://www.newzleech.com/?group=&minage=&age=&min=min&max=max&q="+artist+"+"+titre+"&m=search&adv=' target=_blank>newzleech</a>";
          lien3 = "<a href='http://www.deezer.com/#music/result/all/"+artist+" "+titre+"' target=_blank>Deezer</a>";
          lien4 = "<a href='http://www.binsearch.info/?q="+artist.replace(' ','+')+"+"+titre.replace(' ','+')+"&max=250&adv_age=700&server=' target=_blank>Binsearch</a>";
          $('td',this).eq(0).html(lien+" "+lien2+" "+lien3+" "+lien4);
        })
    }
