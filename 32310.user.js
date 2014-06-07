// ==UserScript==
// @name           ScT+ for Movies and TV (Other Releases)
// @namespace      https://www.scenetorrents.org/
// @description    Displays other versions of movies and TV shows. Version 0.11tv.
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

http://www.google.com/search?hl=en&q=allintitle%3A+site%3Aepguides.com+show&btnI=whatever

*/

function getInsertionPoint() {
    var description = document.evaluate(
                "/html/body/div/table/tbody/tr[3]/td[2]/table[2]/tbody/tr/td/h1/following-sibling::table[position()=1]/tbody/tr/td[text()='Description']/ancestor::tr[position()=1]",
                document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);
    
    var sctp = document.evaluate(
                "/html/body/div/table/tbody/tr[3]/td[2]/table[2]/tbody/tr/td/h1/following-sibling::table[position()=1]/tbody/tr/td[text()='ScT Plus']/ancestor::tr[position()=1]",
                document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);
    
    if (sctp.snapshotLength > 0) {
        return sctp.snapshotItem(0);
    }
    else {
        return description.snapshotItem(0);
    }
}

function evalXPath(dom, XPath) {
    return document.evaluate(
                XPath,
                dom,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null,
                null);
}


function create_tr(title, content) {
    var content_tr = document.createElement("tr");
    
    var name = document.createElement("td");
    name.innerHTML = "<b>" + title + "</b>";
    content_tr.insertBefore(name, null);
    
    content_tr.insertBefore(content, null);
    
    return content_tr;
}
function hasWhiteSpace(s) {
     reWhiteSpace = new RegExp(/^(\s|\b)+$/);
     if (reWhiteSpace.test(s)) {
          return true;
     }
    return false;
}

function insert(destination, content) {
    destination.insertBefore(content, null);
}

function parseTitle(scenetitle) {    
    var re = /(.*?)(?=\.(?=[A-Z]{2,}|[A-Z](i(?!ve))[A-Z]+|R5|[0-9]{4}))/;
    
	var title = re.exec(scenetitle)[1].replace(/\./g, " ");
	

    return title;
}

function parseTVTitle(scenetitle) {    
    var re = /\bS[0-9]*E[0-9]*\b/;
    
	var epno = re.exec(scenetitle)[0];
	var idx = scenetitle.indexOf(epno);

	var title = scenetitle.substring(0,idx - 1);

   return title;
}

function parseTVTitleAndEp(scenetitle) {    
    var re = /.*\bS[0-9]*E[0-9]*\b/;
    
	var title = re.exec(scenetitle)[0];	

   return title;
}

function createDOM(text) {
    var tmpDiv = document.createElement("div");
    tmpDiv.innerHTML = text;
    
    return tmpDiv;
}

function getSpecificSearch(title_ins, category_ins,type) {

	if (type == "Movies")
	{
		var link = window.location.protocol + "//www.scenetorrents.org/browse.php?c%5B%5D=" + category_ins + "&search=%22" + title_ins + "%22&titleonly=1&all=0&incldead=0";
	}
	    
	if (type == "TV")
	{
		
		var link = window.location.protocol + "//www.scenetorrents.org/browse.php?c%5B%5D=" + category_ins + "&search=%2b" + title_ins.replace(/\./g,"%20%2b") + "&titleonly=1&all=0&incldead=0";
	}
        
       
    var table = document.createElement("table");
        
    table.setAttribute("cellpadding", "0");
    table.setAttribute("cellspacing", "0");
        
        GM_xmlhttpRequest(
            {
                method: "GET",
                url: link,
                onload: function(result) {
                    var dom = createDOM(result.responseText);
                    
                    var imgresult = evalXPath(dom, "div/table/tbody/tr[3]/td[2]/table[2]/tbody/tr/td/table/tbody/tr/td/a/img/@src");
                    var results = evalXPath(dom, "div/table/tbody/tr[3]/td[2]/table[2]/tbody/tr/td/table/tbody/tr/td[2]/a/b/ancestor::a");

                    for (var i = 0; i < results.snapshotLength; i++) {

                        var tr = document.createElement("tr");
                        var href = evalXPath(results.snapshotItem(i), "@href").snapshotItem(0).textContent;
                        
                        var cat = document.createElement("td");
                        cat.setAttribute("style", "width:45px;");
                        var img = document.createElement("img");
                        img.setAttribute("src", imgresult.snapshotItem(i).textContent);
                        cat.insertBefore(img, null);

                        var content = document.createElement("td");
                        content.setAttribute("style", "vertical-align: middle; padding-left: 5px;");
                        
                        var a = document.createElement("a");
                        a.setAttribute("href", href);
                        a.innerHTML = results.snapshotItem(i).textContent;
                        a.setAttribute("style", "font-weight: bold;");
                        
                        content.insertBefore(a, null);
                        tr.insertBefore(cat, null);
                        tr.insertBefore(content, null);
                        table.insertBefore(tr, null);
                    }
                }
            }
        );
        
        return table;
    }

function getSearchResults(title, type) {
    var table = document.createElement("table");
    table.setAttribute("id", "sctp_search_table");
    table.setAttribute("style", "display: block");
    table.setAttribute("cellpadding", "0");
    table.setAttribute("cellspacing", "0");
    
    var script = document.createElement("script");
    script.innerHTML = "function flick(id) { var status = document.getElementById(id).style.display; if (status == 'none') { document.getElementById(id).style.display = 'block'; } else { document.getElementById(id).style.display = 'none'; } }"
    script.innerHTML += "function setText() { var text = document.getElementById('flickbutton').value; if (text == 'Show') { document.getElementById('flickbutton').value = 'Hide'; } else { document.getElementById('flickbutton').value = 'Show'; } }";
    table.insertBefore(script, null);
    
	if (type == "Movies")
	{
		var categories = [9, 2, 4, 19, 25, 3];
	}
	    
	if (type == "TV")
	{
		var categories = [23, 22, 24, 17, 15, 11];
	}
    
	
	
	 for(var i = 0; i < categories.length; i++) {
        var search_tr = document.createElement("tr");
        
        var content = document.createElement("td");
        
        content.insertBefore(getSpecificSearch(title, categories[i],type), null);
        
        search_tr.insertBefore(content, null);
        
        table.insertBefore(search_tr, null);
	
    
   
    }
        
    return table;
}

function ScTPlusInsert(type) {
    var titlexpath = "/html/body/div/table/tbody/tr[3]/td[2]/table[2]/tbody/tr/td/h1/text()";
    var scenetitle = evalXPath(document, titlexpath).snapshotItem(0).textContent;
    

	if (type == "Movies")
	{
		var title = parseTitle(scenetitle);
	}
	    
	if (type == "TV")
	{
		var title = parseTVTitleAndEp(scenetitle);
		var title2 = parseTVTitle(scenetitle);
	}  
	
    
	var tr_sctplus = document.createElement("tr");
    tr_sctplus.setAttribute("id", "sctp_releases");
    
    var td_name = document.createElement("td");
    td_name.innerHTML = "<b>ScT+ Rls</b><input type=\"button\" id=\"flickbutton\" onclick=\"flick('sctp_search_table'); flick('sctp_search_in'); setText();\" value=\"Hide\" />";
    td_name.style.textAlign = "right";
    td_name.style.verticalAlign = "top";

    var td_content = document.createElement("td");
    
    var style = document.createElement("style");
    style.innerHTML = "table#sctp_search_in td, table#sctp_search_in { border-width: 0px; } table#sctp_search_in td { vertical-align: top; } table#sctplus td b { display: block; width: 80px; text-align: right; }";
    
    td_content.insertBefore(style, null);
    
    var sctplus_table = document.createElement("table");
    sctplus_table.setAttribute("id", "sctp_search_in");
    sctplus_table.setAttribute("style", "display: block;");
    sctplus_table.setAttribute("cellpadding", "3");
    
    insert(sctplus_table, getSearchResults(title,type));
    
    insert(td_content, sctplus_table);
    
    insert(tr_sctplus, td_name);
    insert(tr_sctplus, td_content);
    
    var insertion = getInsertionPoint();
    insertion.parentNode.insertBefore(tr_sctplus, insertion.nextSibling);
	

	if(type=="TV")
	{
		
		var tr_epguides = document.createElement("tr");
		tr_epguides.setAttribute("id", "sctp_epguides");
		
		var td_epgname = document.createElement("td");
		td_epgname.innerHTML = "<b>ScT+ Guide</b>";
		td_epgname.style.textAlign = "right";
		td_epgname.style.verticalAlign = "top";

		var td_epglink = document.createElement("td");
		td_epglink.innerHTML = "<a href=http://www.google.com/search?hl=en&q=allintitle%3A+site%3Aepguides.com+" + title2.replace(/\./g, "+") + "&btnI=HiBigBrother>Lookup <b>" + title2.replace(/\./g, " ") + "</b> on epguides.com</a>";

		insert(tr_epguides, td_epgname);   
		insert(tr_epguides, td_epglink);
		 

		var insertion = getInsertionPoint();
		  insertion.parentNode.insertBefore(tr_epguides, insertion.nextSibling);
    
	}
	
}

function displayScTPlus() {
    var typearr = document.evaluate(
                "/html/body/div/table/tbody/tr[3]/td[2]/table[2]/tbody/tr/td/h1/following-sibling::table[position()=1]/tbody/tr/td[text()='Type']/following-sibling::td[position()=1]",
                document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null,
                null);

    var type = typearr.snapshotItem(0).innerHTML.split("/")[0];
    
    if (!(type == "Movies" || type == "TV")) {return; }
                
    ScTPlusInsert(type);
}

displayScTPlus();
