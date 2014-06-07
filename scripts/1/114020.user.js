// ==UserScript==
// @name           TwitterToInterview
// @namespace      jack_ama
// @description    Add links to THE INTERVIEWS to twitter
// @include        http://twitter.com/*
// @exclude        http://twitter.com/
// ==/UserScript==

//302 or 200


pre_username = "";

all_function = (function(){
    path_class = '//*[contains(concat(" ",@class," ")," screen-name ")]';
        //path_class = '//*[contains(@class,"screen-name")]';
    var elem = document.evaluate(path_class,
                                  document,
                                  null,
                                  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                  null );

    //まだロードされていないならやり直し
    if(elem.snapshotLength == 0){
        return;
    }

    header_elem = elem.snapshotItem(0);
    //alert(header_elem.document + "," + header_elem.innerText + "," + header_elem.innerHTML);
    username = header_elem.innerHTML.slice(1);
    link_interview_url = "http://theinterviews.jp/" + username;

    //ユーザー変更なし
    if(username == pre_username){
        return;
    }
    pre_username = username;
    
    GM_xmlhttpRequest({
            method:'GET',
            url: link_interview_url,
            onload: function(responseDetails) {
                contents = responseDetails.responseText;

                if(contents.indexOf(username,0) != -1){
                    //alert("exist!");

                    var link_interview = document.createElement("div");
                    link_interview.innerHTML = "<a href=" + link_interview_url + ">Go Interview</a>";

                    header = elem.snapshotItem(0);
                    header.appendChild(link_interview);
                }
                
            }
        });
    //
        }
    );

//5秒ごとに実行
setInterval(all_function,3000);

