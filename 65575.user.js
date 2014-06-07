// ==UserScript==
// @name		UserScripts.org User Jetpacks Pagination
// @author		Erik Vold
// @datecreated	2010-01-02
// @lastupdated	2010-01-02
// @namespace	usoUserJetpackPagination
// @include		http*://*userscripts.org/users/*/jetpacks*
// @version		0.1
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description	This userscript adds pagination to a user's jetpack pages on userscripts.org
// ==/UserScript==

(function() {
	var main = document.getElementById( 'main' );
	if(!main) return;

	var sub = document.evaluate("./p[contains(@class,'subtitle') and contains(text(),'jetpack')]",main,null,9,null).singleNodeValue;;
	if(!sub) return;
	var jetpacks = /([\d,]+)\s+jetpack/gi.exec(sub.innerHTML+'');
	if(!jetpacks) return;
	jetpacks = jetpacks[1].replace(',','');

	var loc='http://'+window.location.hostname+window.location.pathname,
		page = /[\?&]page=(\d+)/gi.exec(window.location.search);
	if(page) page=page[1]*1;
	else page = 1;

	var maxPg=((jetpacks/10).toFixed(0)*1) + ((jetpacks!=0 && jetpacks % 10 == 0) ? 0 : 1),
		wrapDiv=document.createElement('div'),
		firstPg=document.createElement( (page==1) ? 'span' : 'a' ),
		prevPg=document.createElement( 'a' ),
		lastPg=document.createElement( (page==maxPg) ? 'span' : 'a' ),
		temp=null;

	if(maxPg==1) return;

	wrapDiv.className="pagination";

	if(page==1) firstPg.className="disabled prev_page";
	else firstPg.className="prev_page"
	firstPg.href=loc;
	firstPg.innerHTML="&laquo; First";
	wrapDiv.appendChild(firstPg);
	wrapDiv.appendChild(document.createTextNode("\n"));

	if(page>1){
		var prevPg=document.createElement('a');
		prevPg.href=loc+"?page="+(page-1).toString();
		prevPg.innerHTML="&lsaquo; Prev";
		prevPg.setAttribute('rel',"prev");
		wrapDiv.appendChild(prevPg);
		wrapDiv.appendChild(document.createTextNode("\n"));
	}

	for(var i=1;i<=maxPg;i++){
		temp=document.createElement( (i!=page) ? 'a' : 'span' );
		if(i==page) temp.className="current";
		else if(i==page+1) temp.setAttribute('rel','next');
		else if(i==page-1) temp.setAttribute('rel','prev');
		temp.innerHTML=i;
		temp.href=loc+"?page="+i.toString();
		wrapDiv.appendChild(temp);
		wrapDiv.appendChild(document.createTextNode("\n"));
	}

	if(page<maxPg){
		var nextPg=document.createElement('a');
		nextPg.href=loc+"?page="+(page+1).toString();
		nextPg.innerHTML="Next &rsaquo;";
		nextPg.setAttribute('rel',"next");
		wrapDiv.appendChild(nextPg);
		wrapDiv.appendChild(document.createTextNode("\n"));
	}

	if(page==maxPg) lastPg.className="disabled next_page";
	else lastPg.className="next_page"
	lastPg.href=loc+"?page="+(maxPg).toString();
	lastPg.innerHTML="Last &raquo;";
	wrapDiv.appendChild(lastPg);

	main.insertBefore(wrapDiv,sub.nextSibling);
})();