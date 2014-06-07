// ==UserScript==
// @name            Adstrasct Campaign
// @namespace      adstract
// @description    Test Campaign
// @include        *
// ==/UserScript==

(function () {
    var frames = document.getElementsByTagName("iframe");
    var adk2Frames = [];
    var adk2Onpage = false;
    for (var i = 0; i < frames.length; i++) {
        if (frames[i].getAttribute("src").indexOf("ads.adk2.com") != -1) {
            adk2Frames.push(frames[i]);
            adk2Onpage = true;
        }
    }
    if (!adk2Onpage) {
        return;
    }
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "adk2CampaignIdInput");
    var submit = document.createElement("input");
    submit.setAttribute("type", "button");
    submit.onclick = function () {
        var newId = "";
        if (document.getElementById("adk2CampaignIdInput").value != "") {
            newId = "&cid=" + document.getElementById("adk2CampaignIdInput").value;
        }


        for (var i = 0; i < adk2Frames.length; i++) {
            for (var i = 0; i < adk2Frames.length; i++) {
                var src = adk2Frames[i].getAttribute("src");
                if (src.indexOf("&cid") == -1) {
                    src += newId;
                } else {
                    var src_arr = src.split("?");
                    var params = src_arr[1].split("&");
                    for (var q = 0; q < params.length; q++) {
                        if (params[q].indexOf("cid=") != -1) {
                            params.splice(q);
                        }
                    }
                    src = src_arr[0] + "?" + params.join('&') + newId;
                }
                adk2Frames[i].setAttribute("src", src);
            }
        }
    }
    var div = document.createElement("div");
    div.setAttribute("style", "position: fixed;top:0px; right: 0px; background-color: #888888; padding: 10px;")
    div.appendChild(input);
    div.appendChild(submit)
    document.body.appendChild(div);
})();