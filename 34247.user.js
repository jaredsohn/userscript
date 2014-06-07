// ==UserScript==
// @name           ScT+ for Movies (IMDb)
// @namespace      https://www.scenetorrents.org/
// @description    Displays further information for movies. Version 0.2.5
// @description    Updated 2008-09-14: Should work with us.imdb.com etc. Added tagline, think I fixed genres showing properly now.
// @include        http*://*.scenetorrents.org/details.php*
// ==/UserScript==

/*
Torrentlinks
/html/body/div/table/tbody/tr[3]/td[2]/table[2]/tbody/tr/td/table/tbody/tr/td[2]/a/b/ancestor::a/@href

Torrentname
/html/body/div/table/tbody/tr[3]/td[2]/table[2]/tbody/tr/td/table/tbody/tr/td[2]/a/b/text()

Movies/DVDR = 4
Movies/Other = 3
Movies/Packs = 25
Movies/WMV = 19
Movies/x264 = 9
Movies/Xvid = 2

*/

function getInsertionPoint() {
    return document.evaluate(
                "/html/body/div/table/tbody/tr[3]/td[2]/table[2]/tbody/tr/td/h1/following-sibling::table[position()=1]/tbody/tr/td[text()='Description']/ancestor::tr[position()=1]",
                document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null).snapshotItem(0);
}

function evalXPath(dom, XPath) {
	return document.evaluate(XPath, dom, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null, null);
}

function getPureRating(dom) {
	//var xpath = "div[@id='wrapper']/div[@id='root']/layer/div[@id='pagecontent']/div[@id='tn15']/div[@id='tn15main']/div[@id='tn15content']/div[@id='tn15rating']/div[2]/b[2]";
    var xpath = "//div[@class='meta']/*";
    var result = evalXPath(dom, xpath);
    if (result.snapshotLength > 0) {
        var rating = result.snapshotItem(0).innerHTML;
        return rating.substring(0,rating.length - 3);
    }
    else {
        return null;
    }
}

function IMDbVotes(dom) {
    //var xpath = "div[@id='wrapper']/div[@id='root']/layer/div[@id='pagecontent']/div[@id='tn15']/div[@id='tn15main']/div[@id='tn15content']/div[@id='tn15rating']/div[2]/small";
	//return evalXPath(dom, xpath).snapshotItem(0).textContent;
	var xpath = "//div[@class='meta']/a[@class='tn15more']";
	return document.evaluate(xpath, dom, null, XPathResult.ANY_TYPE, null).iterateNext().textContent;
}

function create_tr(title, content) {
    var content_tr = document.createElement("tr");
    
    var name = document.createElement("td");
    name.innerHTML = "<b>" + title + "</b>";
    content_tr.insertBefore(name, null);
    
    content_tr.insertBefore(content, null);
    
    return content_tr;
}

function IMDbScore(dom) {
	var content = document.createElement("td");
    
    var votes = IMDbVotes(dom);
    
    if (votes.search(/awaiting 5 votes/) == -1) {
        var rating = getPureRating(dom);
        
        if (rating) {
            var tmpDiv = document.createElement("div");
            tmpDiv.innerHTML = "(" + rating + "/10)&nbsp;" + IMDbVotes(dom);
            
            var starsDiv = IMDbScoreStars(rating);
            
            content.insertBefore(starsDiv, null);
            content.insertBefore(tmpDiv, null);
        }
    }
    else {
        content.innerHTML = "Not enough votes.";
    }
    return create_tr("Rating", content);
}

function IMDbScoreStars(rating) {
    var tmpDiv = document.createElement("span");
    tmpDiv.setAttribute("style", "float: left;");
    
    var style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.innerHTML = ".starbar {display: inline; height: 20px; width: 200px; }.starbar .outer, .starbar .inner { background: transparent url("
    +"data:image/gif;base64,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"
    +") no-repeat scroll 0px 0px; } .starbar .outer {height:20px;width:200px;}.starbar .inner {background-position: 0px -20px;height:20px;width:0pt;}";
    tmpDiv.insertBefore(style, null);
    
    var width = rating * 20;
            
    var starbar = document.createElement("span");
    starbar.innerHTML = "<div class='outer'><div class='inner' style='width: " + width + "px'></div></div>";
    starbar.setAttribute("class", "starbar");
    tmpDiv.insertBefore(starbar, null);
    
    return tmpDiv;
}

/*function IMDbGenres(dom) {
    var content = document.createElement("td");
    
    var xpath = "div[@id='wrapper']/div[@id='root']/layer/div[@id='pagecontent']/div[@id='tn15']/div[@id='tn15main']/div[@id='tn15content']/div[5]/a";
    var genres = evalXPath(dom, xpath);
    
    if(genres.snapshotLength == 0) {
        content.innerHTML += "No genres.";
    }
    else {        
        for (var i = 0; i < genres.snapshotLength - 1; i++) {
            content.innerHTML += genres.snapshotItem(i).innerHTML;
            
            if (i + 1 < genres.snapshotLength - 1) {
                content.innerHTML += " / ";
            }
        }
    }
    return create_tr("Genres", content);
}*/

function IMDbGenres(dom) {
    var content = document.createElement("td");
    var text = dom.innerHTML;
    var re = /(<h5>Genre:<\/h5>)\s(.*)/
    var re2 = /(Action)|(Adventure)|(Animation)|(Biography)|(Comedy)|(Crime)|(Documentary)|(Drama)|(Family)|(Fantasy)|(Film-Noir)|(Game-Show)|(History)|(Horror)|(Music)|(Musical)|(Mystery)|(News)|(Reality-TV)|(Romance)|(Sci-Fi)|(Short)|(Sport)|(Talk-Show)|(Thriller)|(War)|(Western)/g;
    var genre = text.match(re);
    var genre = genre[0];
    var genre = genre.match(re2);
    var print = "";
    if(genre && genre.length > 0 && !hasWhiteSpace(genre)) {
    	for(i=1;i<genre.length;i++) {
    		var print = print + genre[i] + " ";
    		i++;
    	}
        content.innerHTML = print;
    }
    else {
        content.innerHTML = "Genres not available.";
    }
    
    return create_tr("Genre", content);
}

function IMDbPoster(dom) {
    var content = document.createElement("td");
    var images = evalXPath(dom,
        "div[@id='wrapper']/div[@id='root']/layer/div[@id='pagecontent']/div[@id='tn15']/div[@id='tn15lhs']/div/a/img/@src");
        
    var tmpImg = document.createElement("img");
    tmpImg.setAttribute("src", images.snapshotItem(0).textContent);
    content.insertBefore(tmpImg, null);
    
    return create_tr("Poster", content);
}

function IMDbImages(dom) {
    var content = document.createElement("td");
    
    var style = document.createElement("style");
    style.innerHTML = ".imdbimages { float: left; margin-right: 5px; border: 1px solid #000; }";
    content.insertBefore(style, null);
    
    var xpath = "div[@id='wrapper']/div[@id='root']/layer/div[@id='pagecontent']/div[@id='tn15']/div[@id='tn15main']/div[@id='tn15content']/table[1]/tbody/tr[2]/td/div/div/a/img/@src";
    var images = evalXPath(dom, xpath);
    
    if(images.snapshotLength == 0) { content.innerHTML += "No images."; }
    else {
        for (var i = 0; i < images.snapshotLength; i++) {
            var tmpImg = document.createElement("img");
            tmpImg.setAttribute("src", images.snapshotItem(i).textContent);
            tmpImg.setAttribute("class", "imdbimages");
            content.insertBefore(tmpImg, null);
        }
    }
    
    return create_tr("Images", content);
}

function IMDbRelease(dom) {
    var content = document.createElement("td");
    var xpath = "div[@id='wrapper']/div[@id='root']/layer/div[@id='pagecontent']/div[@id='tn15']/div[@id='tn15main']/div[@id='tn15content']/div[5]/text()[2]";
    var release = evalXPath(dom, xpath).snapshotItem(0).textContent;

    if(release && !(hasWhiteSpace(release))) {
        content.innerHTML = release;
    }
    else {
        content.innerHTML = "No release date listed.";
    }
    
    return create_tr("Release Date", content);
}

/*function IMDbOutline(dom) {
    var content = document.createElement("td");
    var xpath = "div[@id='wrapper']/div[@id='root']/layer/div[@id='pagecontent']/div[@id='tn15']/div[@id='tn15main']/div[@id='tn15content']/div[7]/text()[2]";
    var outline = evalXPath(dom, xpath).snapshotItem(0).textContent;

    if(outline && !(hasWhiteSpace(outline))) {
        content.innerHTML = outline;
    }
    else {
        content.innerHTML = "Plot outline not available.";
    }
    
    return create_tr("Plot Outline", content);
}*/



function IMDbOutline(dom) {
    var content = document.createElement("td");
    var text = dom.innerHTML;
    var re = /(<h5>Plot:<\/h5>)\s*([^\|]*)/i;
    
    var outline = text.match(re);
    
    if(outline && outline.length > 0 && !hasWhiteSpace(outline)) {
        content.innerHTML = outline[2];
    }
    else {
        content.innerHTML = "Plot outline not available.";
    }
    
    return create_tr("Plot Outline", content);
}

function IMDbTagline(dom) {
    var content = document.createElement("td");
    var text = dom.innerHTML;
    var re = /(<h5>Tagline:<\/h5>)\s*([^<]*)/i;
    
    var tagline = text.match(re);
    
    if(tagline && tagline.length > 0 && !hasWhiteSpace(tagline)) {
        content.innerHTML = tagline[2];
    }
    else {
        content.innerHTML = "Tagline not available.";
    }
    
    return create_tr("Tagline", content);
}

function IMDbMPAA(dom) {
    var content = document.createElement("td");
    var text = dom.innerHTML;
    
    var re = /(<h5><a href="\/mpaa">MPAA<\/a>:<\/h5>)\s*([^<]*)/;

    var mpaa = text.match(re);

    if(mpaa && mpaa.length > 0 && !hasWhiteSpace(mpaa)) {
        content.innerHTML = mpaa[2];
    }
    else {
        content.innerHTML = "MPAA rating not available.";
    }
    
    return create_tr("MPAA", content);
}

function IMDbRuntime(dom) {
    var content = document.createElement("td");
    var text = dom.innerHTML;
    
    var re = /(<h5>Runtime:<\/h5>)\s*([^<]*)/;

    var runtime = text.match(re);

    if(runtime && runtime.length > 0 && !hasWhiteSpace(runtime)) {
        content.innerHTML = runtime[2];
    }
    else {
        content.innerHTML = "Runtime not available.";
    }
    
    return create_tr("Runtime", content);
}

function hasWhiteSpace(s) 
{
     reWhiteSpace = new RegExp(/^(\s|\b)+$/);
     if (reWhiteSpace.test(s)) {
          return true;
     }
    return false;
}

function createDOM(text) {
    var tmpDiv = document.createElement("div");
    tmpDiv.innerHTML = text;
    
    return tmpDiv;
}

function insert(destination, content) {
    destination.insertBefore(content, null);
}

function ScTPlusInsert(responseDetails) {
        if (responseDetails.status == "200")
        {
			var IMDBfetch = createDOM(responseDetails.responseText);
            			
            var tr_sctplus = document.createElement("tr");
            tr_sctplus.setAttribute("id", "tr_sctplus");
            			
            var td_name = document.createElement("td");
            td_name.innerHTML = "<b>ScT Plus</b>";
            td_name.style.textAlign = "right";
            td_name.style.verticalAlign = "top";
			
            var td_content = document.createElement("td");
			            
            var style = document.createElement("style");
            style.innerHTML = "table#sctplus td, table#sctplus { border-width: 0px; } table#sctplus td { vertical-align: top; } table#sctplus td b { display: block; width: 80px; text-align: right; }";
			            
            td_content.insertBefore(style, null);
			            
            var sctplus_table = document.createElement("table");
            sctplus_table.setAttribute("id", "sctplus");
            sctplus_table.setAttribute("cellpadding", "3");
			// the fail is here somewhere
			
            insert(sctplus_table, IMDbScore(IMDBfetch));
			insert(sctplus_table, IMDbPoster(IMDBfetch));
            insert(sctplus_table, IMDbRelease(IMDBfetch));
            insert(sctplus_table, IMDbTagline(IMDBfetch));
            insert(sctplus_table, IMDbGenres(IMDBfetch));
            insert(sctplus_table, IMDbMPAA(IMDBfetch));
            insert(sctplus_table, IMDbOutline(IMDBfetch));
            insert(sctplus_table, IMDbRuntime(IMDBfetch));
            insert(sctplus_table, IMDbImages(IMDBfetch));
            
            insert(td_content, sctplus_table);
			
            insert(tr_sctplus, td_name);
            insert(tr_sctplus, td_content);
            
            var insertion = getInsertionPoint();
            insertion.parentNode.insertBefore(tr_sctplus, insertion.nextSibling);
        }
}

function fetch(imdblink) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: imdblink,
        headers: {
            'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 6.0; en-GB; rv:1.9) Gecko/2008052906 Firefox/3.0',
            'Accept': 'application/atom+xml,application/xml,text/xml',
            'Referer': imdblink,
        },
        onload: ScTPlusInsert
    });
}

function getIMDbLink(text) {
	var re = /http:\/\/([^\.]*\.)?imdb.com\/title\/tt[0-9]{7}(\/)?/i;

    var arr = text.match(re);
    if(arr) { return arr[0]; }
    else    { return arr;    }
}

function getIMDbLinkFromComments() {
	var desc = document.evaluate(
                "/html/body/div/table/tbody/tr[3]/td[2]/table[2]/tbody/tr/td/h1/following-sibling::table[position()=2]/tbody",
                document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);
    	var comments = desc.snapshotItem(0).textContent;
    	return comments;
}

function displayScTPlus() {
    var typearr = document.evaluate(
                "/html/body/div/table/tbody/tr[3]/td[2]/table[2]/tbody/tr/td/h1/following-sibling::table[position()=1]/tbody/tr/td[text()='Type']/following-sibling::td[position()=1]",
                document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null,
                null);

    var type = typearr.snapshotItem(0).innerHTML.split("/")[0];
    
	if (!(type == "Movies")) {return; }
    
    var desc = document.evaluate(
                "/html/body/div/table/tbody/tr[3]/td[2]/table[2]/tbody/tr/td/h1/following-sibling::table[position()=1]/tbody/tr/td[text()='Description']/ancestor::tr[position()=1]/td[2]",
                document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);
    desc = desc.snapshotItem(0).textContent;
	                           
    var imdb = getIMDbLink(desc);

    if(imdb == null) {
    	comments = getIMDbLinkFromComments();
        var imdb = getIMDbLink(comments);
        fetch(imdb);
        // Show message, maybe check comments
    }
    else {
        fetch(imdb);
    }
}

displayScTPlus();