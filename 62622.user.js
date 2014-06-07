// ==UserScript==
// @name           interestMatchADDel
// @namespace      http://d.hatena.ne.jp/miz999/
// @include        *
// ==/UserScript==

(function (){
    
function handleNode(newNode){
    var cutURL = new Array(
	    /^http:\/\/rd\.ane\.yahoo\.co\.jp\/rd\?/,
	    /^http:\/\/ard\.yahoo\.co\.jp\/SIG=/,
	    /^http:\/\/googleads\.g\.doubleclick\.net/,
	    /^http:\/\/aucfan\.com\/ad_cs\?/,
	        /^http:\/\/rc20\.overture\.com\/d/
    );
    var thisdomain = window.location;
    var links = newNode.getElementsByTagName('a');

    for (var i = 0; i < links.length; i++) {
	    var a = links[i];
	    for ( var j = 0; j < cutURL.length; j++){
	        if (a.href.match(cutURL[j])){
//                GM_log(a.href);
		        var p = a.parentNode;
		        var pp = p.parentNode;
		        p.style.display = 'none';;
//		        pp.removeChild(p);
//		        handleNode(newNode);
	        }
	    }
    }

    //idが'ad_interestmatch'のものを削除
    //javascriptの遅延挿入なのか、何故か前述の処理では拾えない
    var tmpDiv = newNode.getElementsByTagName('div');
    for(i=0;i<tmpDiv.length;i++){
        if(tmpDiv[i].id == 'ad_interestmatch'){
            var adDiv = tmpDiv[i];
//            GM_log('ad match:' + adDiv.innerHTML);
		    adDiv.parentNode.style.display = 'none';;
        }
    }
        
    return 0;
}

    document.body.addEventListener('AutoPagerize_DOMNodeInserted',function(evt){
        var node = evt.target;
        handleNode(node);
    }, false);
    
    handleNode(document.body);
})();
