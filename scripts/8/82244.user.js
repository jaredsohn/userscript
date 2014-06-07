// ==UserScript==
// @name           Followmytv! NZB & Subtitle Search
// @namespace      kra
// @version        2.1.3
// @description    Add nzb search & subtitle search
// @include        *followmy.tv/dashboard
// @include        *followmy.tv/episode_list
// @include        *followmy.tv/show_list
// ==/UserScript==


//========================[ Settings ]========================\\


    var SearchEngine = 'binsearch';    //==['binsearch','nzbclub','newzleech' or 'nzbmatrix']
    var SearchHDonly = 'no';    //==['yes' or 'no']
    
    
//========================[ Settings ]========================\\


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head').item(0);
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.nzbsearch { opacity: 0.8 !important; margin-right:8px;}');
addGlobalStyle('.subsearch { opacity: 0.8 !important;}');
addGlobalStyle('.searchbg { float:right !important; margin-top:-25px !important;padding:4px 6px 0px 6px;border-radius:4px;margin:0px 0px 0px 4px; }');
addGlobalStyle('.actions { margin-right:45px !important; }');

var uicon = "data:image/gif;base64,R0lGODlhDgAOANUtAMnJydPT02zA6sXFxVpaWtnZ2VCy487OzpzZ983Nzfn8/rXe9I6OjpWVlZrT752dnff7/s7p97nh9Tak3qGhoWvA6obN8fr8/lGy5IbO8Pr9/5zZ9rbd8vj8/mvA67Pd8pGRkdTr+JmZmdra2vb7/uTk5N/f3+bm5llZWfv9/0ZGRiUlJYCAgP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAC0ALAAAAAAOAA4AAAZwwJZQyGINj0cUqmVEElFFaLFJPKFOVmxxOO0WB1RWakxOscBcTWm9pqjeK+LFRKc/VCFOnKkojAoibyofEytvLB0Big0qEQsOBgYYKywQCQcHICoSAgIVHgKUJACkDCunFhmnlF4EBCobCHtOQqt7QQA7";
var ticon = "data:image/gif;base64,R0lGODlhDgAOANUwAOHkD/7+/tDeGHK/RH7DPrvXIfv6+/b29t3e3vz8/Pb29fLz86TPLPHx8P39/ejp6enq6/z7++7v7+/w8Pj496TQK+Lj4pDJNvv7++zs7Pf395DINebm5fn5+f39/u3t7dna2ubn5+Pk5O7oCevr69/g3/P09OLkD/Ly8f7//u7oCtDeF8HBwTY2Nnx8fP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADAALAAAAAAOAA4AAAZuQJdwOIQZja6Xcpl0HWFJEMISIiVfTuSrJHp8GsRjkgORLA6slrqlzUxMFIynNRiwoS+UopMIvFoEBHdJGgYOSy0bF4MvEX6IDBWMKYhqBQVrV4gCKyucKy1JLKOjLQAnAABsREQtKiN3T7JqR0EAOw==";

wait();

function wait() {

	if(document.getElementById("db-items"))
	{
	mainid = document.getElementById('db-items');
	}
	if(document.getElementById("episodes"))
	{
	mainid = document.getElementById('episodes');
	};
    
    checkit = mainid.getElementsByTagName("div").item(0).innerHTML;
    if (checkit == "Loading your data...") {
    	    setTimeout(wait,200); 
    } else {
            ready();           
    }
  }

function ready() {

    	var releases = document.evaluate('//div[contains(@class,"past")]|//div[contains(@class,"today")]|//div[contains(@class,"yesterday")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		function getfullname(link)
	{	
	
		var tdu = link.getElementsByTagName("div");
			var j = 0;
			for(var i=0;i<tdu.length;i++) {
				if(tdu[i].className == "show-name") {
					showtitle = tdu[i].getElementsByTagName("a").item(0).innerHTML;
				}
		}
		
		var tds = link.getElementsByTagName("span");
			var j = 0;
			for(var i=0;i<tds.length;i++) {
				if(tds[i].className == "episode-nr") {
					epinr = tds[i].innerHTML;
					episode = epinr.replace(/(\d+)x/g, 'S$1E').replace(/S(\d)E/g,'S0$1E');
				}
		}

			if (SearchHDonly == 'yes'){
			nzbmatrix = 'http://nzbmatrix.com/nzb-search.php?search=' + showtitle +' '+ episode + '&cat=41';
			} else {
			nzbmatrix = 'http://nzbmatrix.com/nzb-search.php?search=' + showtitle +' '+ episode + '&cat=tv-all';
			}
			
			if (SearchHDonly == 'yes'){
			nzbclub = 'http://www.nzbclub.com/nzbsearch.aspx?ss=' + showtitle +' '+ episode + ' 720p&rpp=25&rs=1&sp=1&sa=1';
			} else {
			nzbclub = 'http://www.nzbclub.com/nzbsearch.aspx?ss=' + showtitle +' '+ episode + '&rpp=25&rs=1&sp=1&sa=1';
			}
			
			if (SearchHDonly == 'yes'){
			binsearch = 'http://www.binsearch.info/?q=' + showtitle +' '+ episode + ' 720p&max=25&adv_age=730&server=';
			} else {
			binsearch = 'http://www.binsearch.info/?q=' + showtitle +' '+ episode + '&max=25&adv_age=730&server=';
			}
			
			if (SearchHDonly == 'yes'){
			newzleech = 'http://www.newzleech.com/?group=&minage=&age=&min=min&max=max&q=' + showtitle +' '+ episode + ' 720p&m=search&adv=';
			} else {
			newzleech = 'http://www.newzleech.com/?group=&minage=&age=&min=min&max=max&q=' + showtitle +' '+ episode + '&m=search&adv=';
			}
			
			srturl = 'http://www.addic7ed.com/search.php?search=' + showtitle +' '+ epinr;
			newTD = document.createElement("div");
			newTD.className ='searchbg';
			unlink = document.createElement("a");
			unlink.className ='nzbsearch';
	
			if (SearchEngine == 'nzbmatrix'){
			unlink.href = nzbmatrix;
			}
			
			if (SearchEngine == 'nzbclub'){
						unlink.href = nzbclub;
			}
			
			if (SearchEngine == 'binsearch'){
						unlink.href = binsearch;
			}
			
			if (SearchEngine == 'newzleech'){
						unlink.href = newzleech;
			}

			unlink.setAttribute("target","_blank");
			unlink.innerHTML = "<img title='Search On Usenet' src=" + uicon + " border='0'>";
			srtlink = document.createElement("a");
			srtlink.className ='subsearch';
			srtlink.href = srturl;
                        srtlink.setAttribute("target","_blank");
			srtlink.innerHTML = "<img title='Search For Subtitles' src=" + ticon + " border='0'>";
			newTD.appendChild(unlink);
			newTD.appendChild(srtlink);
			link.appendChild(newTD);
	}
		
		for (var i=0; i<releases.snapshotLength; i++)
		getfullname(releases.snapshotItem(i));	
		
	if(document.getElementById("db-actions"))
	{
	maintab = document.getElementById("db-actions");
	unwatched = maintab.getElementsByTagName("a").item(0);
	unwatched.setAttribute("onClick","window.location.reload()");
	pinned = maintab.getElementsByTagName("a").item(1);
	pinned.setAttribute("onClick","window.location.reload()");
	}	
	
}