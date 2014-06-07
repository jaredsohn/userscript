// ==UserScript==
// @name           Redirect_cutter
// @namespace      http://wikiwiki.jp/hyagni/
// @description    This userscript removes redirect page of out-going links.  This is maybe useful in browsing BBSs and forums.  One setting example is shown in the following source.
// @include        http://www.alabout.com/*
// ==/UserScript==

siteList = [//site filter, heading
    ['www.alabout.com','./j.phtml?url='],
];

for (i=0;i<siteList.length;i++){
    if (document.URL.indexOf(siteList[i][0]) != -1){
        aObj = document.getElementsByTagName('a');
        for (j=0;j<aObj.length;j++){
            url = aObj[j].getAttribute('href');
            if (url != null && url.indexOf(siteList[i][1]) != -1){
                url = url.slice(siteList[i][1].length ,url.length);
                url = decodeURIComponent(url);
                aObj[j].setAttribute('href',url);
                aObj[j].setAttribute('target','_brank');
            }
        }
    }
}