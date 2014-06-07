// ==UserScript==
// @name                OU viewer
// @namespace           http://couplezz.net/
// @description         re-organize hide some replys
// @include             http://todayhumor.co.kr/*
// ==/UserScript==

ou_viewer = {
    
    init : function() {
        
        ///////////////////////////////////
        // 0 처리안함 (일반적으로 보기)
        // 1 닫친상태로 두기
        // 2 안보이게 하기
        //////////////////////////////////
        
        var MEDAL1 = 0; //메달 한개 있는글
        var MEDAL2 = 0; //메달 여러개 있는글
        var TRASH = 2;  //반대가 많은 글
        var NORMAL = 1; //일반 글
        
        
        var snapResults = document.evaluate(
                "//div[contains(@id, 'memoContainerDiv')]",
               document,
               null,
               XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
               null);
                
        for (var i = 0; i < snapResults.snapshotLength; i++) {
            var elm = snapResults.snapshotItem(i);
            
            if(elm.childNodes.length<10)
            {
                continue;
            }
            
            var title = elm.childNodes[4].innerHTML;
            var tmp = elm.childNodes[10].innerHTML;
            
            var medal = elm.childNodes[7].getElementsByTagName('img');
            if(medal.length!=0)
            {
                if(medal[0].src.match('medal'))
                {
                    if(medal.length==1)
                    {
                        //메달하나
                        ou_viewer.makeHTML(elm,title,tmp,MEDAL2);
                    }
                    else
                    {
                        //메달여러개
                        ou_viewer.makeHTML(elm,title,tmp,MEDAL1);
                    }
                }
                else
                {
                    //쓰레기인경우
                    ou_viewer.makeHTML(elm,title,tmp,TRASH);
                }
            }
            else
            {
                //아무것도없는거
                ou_viewer.makeHTML(elm,title,tmp,NORMAL);
            }
        }
    },
    makeHTML : function (elm,title,tmp,option) {
        console.log(option);
        if(option==1)
        {
            title += "<a onfocus=\"blur()\" onclick=\"this.innerHTML=(this.nextSibling.style.display=='none')?'':'[열기]';this.nextSibling.style.display=(this.nextSibling.style.display=='none')?'block':'none';\" href=\"javascript:void(0)\" ;>[열기]</a><div style=\"DISPLAY: none\">" + tmp;
            elm.innerHTML = "<div id=OU style='word-wrap:break-word'>" + title;
            elm.innerHTML += "</div></div></div>";
        }
        else if(option==2)
        {
            elm.innerHTML = " ";
        }
    }
};

ou_viewer.init();
