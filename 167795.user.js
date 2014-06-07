// ==UserScript==
// @name          FilmWeb P2P
// @icon          http://www.filmweb.pl/favicon.ico
// @version       1.6
// @include       http://www.filmweb.pl/*
// @grant         none
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

//regexp filter
//http://james.padolsey.com/javascript/regex-selector-for-jquery/
jQuery.expr[':'].regex = function(elem, index, match) {
    var matchParams = match[3].split(','),
        validLabels = /^(data|css):/,
        attr = {
            method: matchParams[0].match(validLabels) ? 
                        matchParams[0].split(':')[0] : 'attr',
            property: matchParams.shift().replace(validLabels,'')
        },
        regexFlags = 'ig',
        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
}

//Case Sensitive
jQuery.expr[':'].regex_cs = function(elem, index, match) {
    var matchParams = match[3].split(','),
        validLabels = /^(data|css):/,
        attr = {
            method: matchParams[0].match(validLabels) ? 
                        matchParams[0].split(':')[0] : 'attr',
            property: matchParams.shift().replace(validLabels,'')
        },
        regexFlags = 'g',
        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
}

function createLinks(prevElement, title) {
    title = title
        .replace(/^(.*), The$/, 'The $1')
        .replace(/^(.*), A$/, 'A $1');
		
	var styleStr = 'style="margin-left: 10px; font-weight: normal; font-size: 9pt; vertical-align: middle;"';

	jQuery(prevElement).after('<a title="torrents.to: ' + title + '" target="_blank" href="http://torrents.to/search/kickasstorrents/' + title + '" ' + styleStr + '><img src="http://static.torrents.to/img/favicon.png" /></a>');
	prevElement = prevElement.nextSibling;
	//jQuery(prevElement).after('<a title="Pirate Bay: ' + title + '" target="_blank" href="http://thepiratebay.sx/search/' + title + '/0/99/200" ' + styleStr + '><img src="http://thepiratebay.sx/favicon.ico" /></a>');
}

if (jQuery('div#body.mainPage').hasClass('filmPage'))
{
	var origTitle = $('div.filmHeader div.filmTitle h2.text-large.caption').text();
	var title = (origTitle != null && origTitle.length > 0) ? origTitle : $('div.filmHeader div.filmTitle h1 a').text();

	createLinks($('div.filmHeader div.filmTitle span#filmYear')[0], title);
}

if (document.location.pathname.match(/^\/user\/.*\/films\/wanna-see/))
{
	var links = jQuery('table.wantToSeeSee div.overflow a');
	links = links.filter(':regex(href, film/.*-[0-9]+$), :regex_cs(href, ^/[A-Z0-9])');
	links.each(function(){
		var nextLine = jQuery(this).next('br')[0].nextSibling.textContent.replace(/\n/g, '').replace(/^[ \t]+/g, '').replace(/[ \t]+$/g, '');
		var title = (nextLine.match(/^kraj:/)) ? jQuery(this).text() : nextLine;

		createLinks(jQuery(this).next('br')[0].previousSibling, title);
	});
}
