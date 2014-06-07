// written by asq, this is public domain
// idea based on: http://userscripts.org/scripts/show/73032
// code based on: http://squio.nl/blog/2006/07/27/keeping-up-with-change/

// ==UserScript==
// @name		Filmweb - share vote on Facebook, Twitter and BLIP
// @namespace		http://userscripts.org/users/174724/scripts
// @description		Adds links to polish movie portal Filmweb movie pages when you hover over vote area that let you share your vote details on Facebook, Twitter and BLIP
// @version		1.1
// @include		http://*.filmweb.pl/*
// @include		http://*.filmweb.pl/film/*
// @exclude		http://*.filmweb.pl/
// @exclude		http://*.filmweb.pl/24
// @exclude		http://*.filmweb.pl/tv
// @exclude		http://*.filmweb.pl/base
// @exclude		http://*.filmweb.pl/community
// @exclude		http://*.filmweb.pl/forum
// @exclude		http://*.filmweb.pl/person
// @exclude		http://*.filmweb.pl/search
// ==/UserScript==


document.addEventListener("DOMAttrModified", updatemyoverlay, true);

function updatemyoverlay() {

    findPattern = "//div[@class='voteTextual']/span[@class='gwt-InlineLabel']";
    voteResults = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
    findPattern = "//a[@class='film_mini']";
    imageResults = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
    findPattern = "//h1[@class='pageTitle item']/a";
    urlResults = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
    findPattern = "//div[@class='rateLL']";
    rateResults = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

    // only put it in if they've voted
    if (voteResults.snapshotItem(0) != null && imageResults.snapshotItem(0) != null && urlResults.snapshotItem(0) != null && rateResults.snapshotItem(0) != null) {
    rateResults.snapshotItem(0).addEventListener("click", updatemyoverlay, false);   
        if (voteResults.snapshotItem(0).innerHTML != "Brak Twojej oceny") {
            var movieImage = imageResults.snapshotItem(0).href;
            var filmwebUrl = urlResults.snapshotItem(0).href.replace(/\+/g,'%2b');
            var movieName = urlResults.snapshotItem(0).title;
            var voteValue = voteResults.snapshotItem(0).innerHTML;
            var shareFacebookUrl = 'http://www.facebook.com/connect/prompt_feed.php?attachment={"name"%3A"'+movieName+'"%2C"caption"%3A"{*actor*} zagłosował na film: '+movieName+' i dał mu '+voteValue+' na Filmwebie."%2C"href"%3A"'+filmwebUrl+'"%2C"media"%3A[{"type"%3A"image"%2C%0A     "src"%3A"'+escape(movieImage)+'"%2C"href"%3A"'+escape(filmwebUrl)+'"}]}';
            var shareTwitterUrl = 'http://twitter.com/home?status=Zagłosowałem na film: '+movieName+' i dałem mu '+voteValue+' na Filmwebie. %23filmweb '+filmwebUrl;
            var shareBlipUrl = 'http://blip.pl/dashboard?body=Zagłosowałem na film: '+movieName+' i dałem mu '+voteValue+' na Filmwebie. %23filmweb '+filmwebUrl;
            var twitterImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZBAMAAAA2x5hQAAAAAXNSR0IArs4c6QAAADBQTFRFWp2rapunk5ujSMPgWcXdrrXAmcDOdM7hgc7Ye9nsktniod3qq+n0vO3y2PP2/P/8W/vs+wAAAMtJREFUGNNVzT0KwjAUwPFcQU/gEYTkBn1QdeoldBeEgIJrO+pYPyYHJzfBpcVBxzY3aF0Eh0LooCgO1vS1jfW//XjvJSSrlZJsoOun5M11c4u8amqR509D1EQeKqnNo0xqsziSle7/MpUuWfbZohgXkUrcULQTh1EQhKXAD1RqNlMC5gd4N2rnM+YthMk5GLkM5rmC5hXy3bWUicFQMHVVqxOgKGp5LjZp7woA3X25yXY25+MNvsnAYI7j2IB3lAKl+gcUlHo0dE3rC36No3jI+UzAAAAAAElFTkSuQmCC";
            var facebookImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAYBAMAAAD9m0v1AAAAAXNSR0IArs4c6QAAADBQTFRFM1WYP1eWN1qXR2GaWWN5Xm2LWXOmaH6tgISSf5O6lJ+5qLTNs7vE4eTs7fH0/f78avJEXAAAAKZJREFUGNNj+LMKDtZ+YNhZDgcVFxi2I3glB0jlVb9/CeFtA1Jl+/7fhPA2pwPp96+nQ3lqQLn3N9OhPKH08tnv4SqF1Mrn//8PMiUFyBMUUpt9/z3QgcksIJ6ioND+m+lpRkIgnpCQosD+54yMSopQOQUgT0lIEMwTFATJKQlCeUIC+6+j8J4zKsJ4gopmSYJQnpAgDIDlYFwhqEoIB8T7HQoHHh8AUiqCriaAgNcAAAAASUVORK5CYII=";
            var blipImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZBAMAAAA2x5hQAAAAAXNSR0IArs4c6QAAADBQTFRF8Ccg7kAn7z8/7Vwqd32E7G4973dh7pBv8JqLqKyv9Luv8M7D9t7R6+rq9fb0/f78mRs2DwAAANZJREFUGNNj+I8EPjAgcf5+YPj7DgEcCPLent5zD0QBef//Hw82NjaNOP//L4j33BgMzN//A/L+BIcam5c2GxvHgnjfpL4b16/+bmxsBlK52PZb4PqyYtEy43VAXmPe8TPn8w6uqVtYB+Ql5i20+5+/7If0wzyw3EK5//UrvskeBPE2cj/ryd39+te+xD6QmYIdTYyJGX+aGM+BbE9gAIF1Ahwg+/7/UgDxGBn6wbz/v5sUGNQYtP5DeP///3u/SeM+mAfx2hoi/P7+PTTIQP77PxMBJgAApAjgNHYYmxgAAAAASUVORK5CYII=";
        var delstyle = 'style="padding:0px;margin:0px"'
        var minstyle = 'style="padding:0px;margin: 0px 1px 0px 0px"'
        var addedtxt = '<a target="_blank" '+delstyle+' title="Share on Facebook" href=\''+shareFacebookUrl+'\'><img '+minstyle+' src="'+facebookImage+'" alt="Share on Facebook"></a><a target="_blank" '+delstyle+' title="Share on Twitter" href=\''+shareTwitterUrl+'\'><img '+minstyle+' src="'+twitterImage+'" alt="Share on Twitter"></a><a target="_blank" '+delstyle+' title="Share on BLIP" href=\''+shareBlipUrl+'\'><img '+minstyle+' src="'+blipImage+'" alt="Share on BLIP"></a>';
            findPattern = "//div[@id='GM_ShareVoteOnFacebook']";
            insertResults = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
            if (insertResults.snapshotItem(0) == null) {
                addedDivFBLink = document.createElement('div');
            addedDivFBLink.innerHTML = 'STUB';
                addedDivFBLink.setAttribute('id','GM_ShareVoteOnFacebook');
            addedDivFBLink.setAttribute('style','position:absolute;top:5px;left:135px;width:100%;height:25px;');
                addedDivFBLink.setAttribute('class','info');
            voteResults.snapshotItem(0).parentNode.insertBefore(addedDivFBLink, voteResults.snapshotItem(0).nextSibling);
        }
            findPattern = "//div[@id='GM_ShareVoteOnFacebook']";
            insertResults = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
        insertResults.snapshotItem(0).innerHTML = addedtxt;
        }
    }
}
