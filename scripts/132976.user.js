// ==UserScript==
// @name           Download Video@tudou.com
// @namespace      http://weibo.com/kevpp
// @include        http://www.tudou.com/*
// @require	       http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==


$('#download').unbind().click(function(){

    var param = $('#playerObject param:last').attr('value');
    
    if(param && /^iid=(\d+)/.test(param)) {
    
        var iid = param.match(/^iid=(\d+)/)[1];
        
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://v2.tudou.com/v.action?it=" + iid,
            onload: function(response) {
                var xml = $($.parseXML(response.responseText));
                var title = xml.find("v").attr("title");
                var files = xml.find("f").map(function() {
                    return {
                        link: $(this).text(),
                        size: ($(this).attr("size")/1024/1024).toFixed(2)
                    };
                }).get();

                var result = title;
                for(var i in files) {
                    result += "\n\n\n" + files[i].link + "\n\n[" + files[i].size + "MB]";
                }
                
                alert(result);
            }
        })
    }

    return false;
});


