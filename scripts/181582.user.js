// ==UserScript==
// @id             www-clinicalkey-com.ezproxy.lib.ucalgary.ca-c33be6ee-3343-4746-97a3-b2f5467d8620@smk
// @name           clean links clinicalkey
// @namespace      smk
// @include        https://www-clinicalkey-com.ezproxy.lib.*
// @include        http://www.clinicalkey.com/*
// @include        https://www.clinicalkey.com/*
// @run-at         document-start
// ==/UserScript==

function NotFoundError(msg){
	this.msg=msg;
};

function getDownloadLink(a, c){
	/**
	references:
		gh.getController('BrowserCtrl').downloadSearchPdf('bookChapter', '3-s2.0-B9780323039314100631');
		gh.getController('BrowserCtrl').downloadSearchPdf.toSource()
	*/
	var controller = unsafeWindow.gh.getController('BrowserCtrl');
	var results = controller.getView(a).getBrowserResults();
	var app = unsafeWindow.app;
	if(results){
		var b = results.store.findRecord("eid", c);
		var c = b.get(app.CIP.EID)
		var h = b.get(app.CIP.PDF_EID)
		return app.ctx + "content/player/stream/" + c + "?fileName=" + encodeURIComponent(h);
	}
	throw new NotFoundError();
}

function rewriteDownloadLinks(node = document){
	var links = node.querySelectorAll('a.ico_pdf_results[href*="downloadSearchPdf"]');
	var linksNum = 0;
	for(var link of links){
		var args = link.href.match(/downloadSearchPdf\('(.+?)',.+?'(.+?)'\)/);
		if(!args)
			continue
		[matchStr, dlType, dlId] = args;
		try{
			var href = getDownloadLink(dlType, dlId);
		}catch(e if e instanceof NotFoundError){
			continue;
		}
		link.href = href;
		linksNum++;
	}
	return linksNum;
}

function main_start(){
	//remove tracking function
	unsafeWindow.ntptAddPair=function(a, b){};
	unsafeWindow.ntptEventTag=function(a){};
}

function main_loaded(){
	//wait until viewPortCenterPane gets loaded
	var observer = new MutationObserver(function(mutations) {
		rewriteDownloadLinks();
	});
	observer.observe(document.body, {subtree: true, childList: true});
}

function main(){
	main_start();
	window.addEventListener('readystatechange', function listener(){
		if(document.readyState=='complete'){
			window.removeEventListener('readystatechange',listener);
			main_loaded();
		}
	}, true);
}

main();
