// ==UserScript==
// @name           HAD_classic_2013
// @version        1.0
// @author         MusashiAharon
// @description    Loads beginning paragraphs of articles on Hackaday.com
// @include        http://hackaday.com/
// @include        http://hackaday.com/page/*
// @run-at         document-end
// ==/UserScript==

// Based on hackaday_full <http://userscripts.org/scripts/review/168018> 
// by johannes_. Thanks, johannes_!

//jQuery loader from Erik Vergobbi Vold & Tyler G. Hicks-Wright 
//(http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script)
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

// the guts of this userscript

function main() {
	// 1st <p> tag surrounds the article's main image. So, add 1 to the # of
	// paragraphs you want.
    var maxNumParagraphs = 3;


    jQ(".post .entry-content").each(function (i) {
        // Get the full article's address
        var more = jQ(this).find('a.read_more').attr('href');

        // From that address, get the first few <p> tags.
        var query = more + ' .entry-content p:lt(' + maxNumParagraphs.toString() + ')';

        jQ(this).load(query, function () {
			// Then, after the content has been fetched and inserted,
			// append the [Read more] link again, since we lost it.
            jQ(this).append('<a href="' + more + '" class="read_more">[Read more]</a>');
        });

    });
}

addJQuery(main);

