// ==UserScript==
// @name        Steam Linkz
// @namespace   pacewon, updated by wanl
// @description Add Links To Steam Games pages
// @include     *steampowered.com/app*
// @version     0.4
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAB3RJTUUH3QcOAyUo74vINgAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAAAwUExURf39/ajH+6OjpHyEpxoaGlhYWpSx8CtDeVhuoGOX7Uh+3jRWoX7A/zVt4RIhXR89li9NejIAAAGkSURBVHja7VM9T8MwELVjh4GpqWilLhCVVKyVyIqUOuc9Le6eCakbP4GVrRuqBBIrH2Jk4B8gdWIBdUAgxFAh8RtwEttJKYaVoW+Ic77nu/O7M0IrrPAnnO32r/4OAHDf7t+ADNweHwowGyGQzqGQn1q5h6v/Mro0GwCR2ZP0gTFcgC75fJeBeBmTC0hKK8YfXuuNAKgdkjkbUIaLNlPP2+oK6KojDA/3kdAhAPy5lzYPXgJdBPihvJPLDAG/NtPW6RNVBIfnF+9zcwlyOxmPRjea4DJaCGNkIrPaOF1/NoReIa3SRbKdu3OEzh41gUZBVVpZD5pforWLh6UIhRTZunc/Hk0OQ6UNiVUN8n65jhC519PpCcrtvGysCbzoFKCd46sjapQUSaAZrJ4vPdRMcdlvyrNuLWCAHAGmPRgYLl0hVBKWDa7smnymv7KVgncMQ0f7PnHmoNKtvzSKulBOF8dxaZiBLKSvQNfqWAdeJXGsT0ZJQOwvZpD5YxrZCJRlZSRBYiM4kD8KQFaILHvA7AQX4naoxsRS5o8aV1Hf9dEK/xRffd6G5N8Rqp4AAAAASUVORK5CYII=
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js
// @grant       GM_log
// ==/UserScript==

var title = document.title;

//Clean Up Title
title = title.replace(" on Steam","");
//Discounts
title = title.replace(/Save.+on /,"");
//Pre-Purchase
title = title.replace(/Pre.+hase/,"");

//Build Sites Search Query
title = title.replace(" ","+");
var google = "https://www.google.com/search?tbm=isch&q=" + title + "+game" ;
var youtube = "https://www.youtube.com/results?search_query=" + title + "+game" ;
var torrentz = "https://torrentz.eu/search?f=" + title;
var piratebay = "https://thepiratebay.sx/search/" + title + "/0/99/400";
var nzb = "http://www.nzbclub.com/search.aspx?q=" + title ;

//Generate Favicon HTML
var googleIcon = "<a href='" + google + "' target='_blank\' title='Search for " + title + " on Google Images'><img height=20 width=20 src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUBAMAAAB/pwA+AAAAB3RJTUUH3QcOAy0XkTRvAwAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAARnQU1BAACxjwv8YQUAAAAtUExURVKU/0qU/0qM90qE70KE512R6arL/2Oc90yE4djp//n8/0J41lKM60qM/32s99R0sNkAAACPSURBVHjaY2BAAYxKxsaKEJbysbS0R2CWrNu8V+sMBUBMoVfNfsscwUyRWXu1V8GYTSKzIEzhrBTrZVC1ncteplwEMwVV4lZuEoQwL3mveqIIUeCeNmuZL5ipMeuF66pHYKbZCqPLXclgpudqRVlPCNNs2WaTU4egaqelTQWbwCDkmpbuJABxupCykgCqZwCOCiqSYa8zQAAAAABJRU5ErkJggg==' style='vertical-align: middle;'></a>";
var youtubeIcon = "&nbsp; <a href='" + youtube + "' target='_blank\' title='Search for " + title + " on YouTube'><img height=20 width=20 src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAB3RJTUUH3QcOAxUTgcYX4QAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAARnQU1BAACxjwv8YQUAAAAtUExURf///8yZmWYzM2YAAP/MzJkAAJkzM5lmZsxmZswzM5mZmczMzAAAAGZmZjMzMxAz0PQAAACOSURBVHjajc9REoMgDATQjdJAk9T7H9dNsB3p9KMLI/AwGQUYC4TjKx5kquN+dYRZHB4eN7RIsBU9m/6Lr+wZd4RxOqd9pLUmV7idJs8lUqh8Y/A0xtQqVj7yjAtboUIHAxEdGJooiRBkr86huZHHG5PwC3svbBf2WYzqWdghVcp1r8/f9iXb/KNFN7Y8AYGwBgs8jFR1AAAAAElFTkSuQmCC' style='vertical-align: middle;'></a>";
var torrentzIcon = "&nbsp; <a href='" + torrentz + "' target='_blank\' title='Search for " + title + " on Torrentz.eu'><img height=20 width=20 src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUBAMAAAB/pwA+AAAAB3RJTUUH3QcOAi4K2N06LgAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAAAGUExURf///zFjnMcCu9IAAAAwSURBVHjaY2DADhgFwUAAyBSEAlSmAIgHVAdRDhaiHpMRxgPRAnAmI0KtAKZaDAAA1CYDun6iO10AAAAASUVORK5CYII=' style='vertical-align: middle;'></a>";
var piratebayIcon = "&nbsp; <a href='" + piratebay + "' target='_blank\' title='Search for " + title + " on ThePirateBay'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUBAMAAAB/pwA+AAAAB3RJTUUH3QcOAjo22RyR/AAAAAlwSFlzAAALEwAACxMBAJqcGAAAAARnQU1BAACxjwv8YQUAAAAYUExURffv78bGvTk5OYyEhCEYGNbW1hAQEOfe3nca4zIAAABySURBVHjaY2AgDIqNgcAczEwDAwymkaKQMoSZxKpsFKAGEVVKAyJUtYwGaUpmiSogJnNqkLISEDAbMDClKYsDRVjFFBiYjIVVlIxUklQUGBjElFWS3JwLnYFMJmdRBlYjN3WgKiYDkIksCnDnMQrgcDcAUvsWX90+DakAAAAASUVORK5CYII=' style='vertical-align: middle;'></a>";
var nzbIcon = "&nbsp; <a href='" + nzb + "' target='_blank\' title='Search for " + title + " on NZBClub'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAB3RJTUUH3QsQCzQWBhZqmAAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAARnQU1BAACxjwv8YQUAAABdUExURf///wAAAP///ymEAELGAELOAEK9ADm1ADmtADmlADGcADGUACFaADGEADGMACl7AClzAClrAEreACFjAErnAELWAFL3AFr/CFLvCHPeOYz/WoTvSmutQpTea3O9SuthtvAAAAABdFJOUwBA5thmAAAAhklEQVR42nXP7RKCIBBAUbAFpKCUNO3z/R+zhXVdcvL+WMYDw4hSewVJ7PXmPquG+4N7CqaJmwXHG5cEzcDZClPJ+O4qCAYDH7u+F7QA0J7OETXwj0fnXOuPqBfU8oJoc6Qao1cdwACQ6qbR2fRPiJjCFaO5LAWX/TzpQ5BHjevpCjd3/ukLA5YKSKil20cAAAAASUVORK5CYII=' style='vertical-align: middle;'></a>";
var allIcons = googleIcon + youtubeIcon + torrentzIcon + piratebayIcon + nzbIcon;

//Put it on the page
var commButtonSource = $(".apphub_OtherSiteInfo").html();
commButtonSource = "<span class='btn_darkblue_white_innerfade btn_medium'><span>" + allIcons + "</span></span>" + commButtonSource;
$(".apphub_OtherSiteInfo").html(commButtonSource);