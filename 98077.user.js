// ==UserScript==
// @name           clean forum's page
// @namespace      zhengll
// @include        http://we.pcinlife.com/thread-*html
// @include        http://bbs.fengbao.com/*
// @include        http://www.askcad.com/bbs/viewthread.php?tid=*
// @include        http://www.chiphell.com/thread-*.html
// ==/UserScript==


function GM_xpath(query,node) {
        node = node ? node : document;
        return document.evaluate(
                query,
                node,
                null,        
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                null);
}

function GM_removeNode(thisDiv){
        if (thisDiv) {
                thisDiv.parentNode.removeChild(thisDiv);
        }
}


function GM_removeXPath(xpath_string){
        var allDivs = GM_xpath(xpath_string);
        for (var i = 0; i < allDivs.snapshotLength; i++){     
                GM_removeNode(allDivs.snapshotItem(i));
        }
}

GM_removeXPath("//div[@id='postlist']/div/table/tbody/tr/td/div/div[@class='avatar']");//¸öÈËÍ·Ïñ
GM_removeXPath("//div[@id='postlist']/div/table/tbody/tr/td[@class='pls']/p[last()]");//¸öÈË»ÕÕÂ

GM_removeXPath("//div[@class='a_pt']");//Ìû×ÓÇ°ÃæµÄ¹ã¸æ
GM_removeXPath("//div[@class='a_pb']");//Ìû×ÓºóÃæµÄ¹ã¸æ
GM_removeXPath("//tr[@class='ad']/td/*");//Ìû×ÓÖ®¼äµÄ¹ã¸æ,±£Áô±ß
GM_removeXPath("//dl[@class='rate']");//Ìû×ÓÆÀ·Ö
GM_removeXPath("//div[@class='uo']/../../*");
GM_removeXPath("//div[@class='po']/../../*");
GM_removeXPath("//img[@class='authicn vm']");//×÷ÕßÔÚÏßÇé¿ö
GM_removeXPath("//a[@id='newspecialtmp']/../*|//a[@id='newspecial']/../*");//·¢Ìû»Ø¸´
GM_removeXPath("//div[@id='f_pst']");//¿ìËÙ»Ø¸´
GM_removeXPath("//div[@id='nv']");//ÍøÕ¾µ¼º½Ìõ
GM_removeXPath("//div[@class='wp']/div/h2/a[@href='./']/..");//ÍøÕ¾logo

GM_removeXPath("//div[@id='postlist']/div/table/tbody/tr/td[@class='pls']/div[@class='qdsmile']");//TAµÄÃ¿ÈÕÐÄÇé
GM_removeXPath("//div[@id='postlist']/div/table/tbody/tr/td[@class='plc']/div[@class='pct']/div[@class='a_pr']");//Ìû×ÓÉÏµÄ¹ã¸æ


GM_removeXPath("//div[@id='postlist']/div/table/tbody/tr/td[@class='plc plm']/div[@class='bm bm2 bw0 cl']");//Â¥Ö÷Ìû×Ó
GM_removeXPath("//div[@id='postlist']/div/table/tbody/tr/td[@class='plc plm']/div[@class='uo nrate']");//·ÖÏíµ½
GM_removeXPath("//div[@id='postlist']/div/table/tbody/tr/td[@class='plc']/div/div/div/p[@class='mtm pns']/..");//Ìû×ÓÓÀ¾ÃµØÖ·
GM_removeXPath("//div[@class='sign']/../..");//¸öÈËÇ©Ãû


//GM_removeXPath("//td[@class='postcontent postbottom']/..");//ÂÛÌ³²Ù×÷°ïÖú








