// ==UserScript==
// @description Adds a download button to myanonamouse
// @version 1.1
// @name Download button for anonamouse
// @include http://myanonamouse.net/*
// @include http://www.myanonamouse.net/*
// @namespace dlbutton.bloved.anonamouse
// ==/UserScript==
function getLinks()
{
    var doc_links = document.links;
    var links = new Array();
    var idtorrent = 0;
    for (var i=0; i < doc_links.length; i++){
        if(doc_links[i].href.match('/details.php'))
        {	
            if(doc_links[i].href.match('&toseeders=1')||doc_links[i].href.match('&todlers=1')||doc_links[i].href.match('&filelist=1')||doc_links[i].href.match('&tocomm=1'))
            {
                
            }
            else
            {
                var urlbook = doc_links[i].href;
                var re = new RegExp("\\d\\d*");
                var match = re.exec(urlbook);
                idtorrent = match;
                var urldl = "download.php/"+ idtorrent +"/"+ idtorrent +".torrent";     
                var tr_torrent = doc_links[i].parentNode;
                tr_torrent.innerHTML = tr_torrent.innerHTML + '<a border=0 href="'+ urldl +'"><img src="http://www.myanonamouse.net/themes/ICGstation/images/arrowdownred.gif"></a>';
            }
            
        }
    }
}

getLinks();