    // ==UserScript==
    // @name           rwInit
    // @namespace      rwInit
    // @include        http://www.erepublik.com/en
    // @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
    // ==/UserScript==
     
    var isStarted = false;
    var sentNum = 0;
     
    var token = $("input#_token").attr("value");
     
    $("#isBattleList").before("<div class='eventsItem' id='rw_starter_container'></div>");
    $("#rw_starter_container").append("<input type='button' id='rw_starter_start_btn' value='Start'>");
    $("#rw_starter_container").append("<span id='rw_starter_num'> " + sentNum + "</span>");
    $("#rw_starter_container").append("<span id='rw_starter_resp'></span>");
     
    $("#rw_starter_start_btn").click(function(){
                    if (isStarted) {
                            isStarted = false;
                            $("#rw_starter_start_btn").val("Start");
                    } else {
                            isStarted = true;
                            $("#rw_starter_start_btn").val("Stop");
                            sendRequests();
                    }
            });
           
            function sendRequests() {
                    if (isStarted) {
                            setTimeout(function(){
                                    sendRequests();
                            },5000);
                    }
                    alert(token);
                   
                    GM_xmlhttpRequest({
                    method: 'POST',
            url: 'http://www.erepublik.com/en/military/rw-support/',
                    data: "_token=" + SERVER_DATA.csrfToken + "&type=fund",
                    onload:function(responseDetails){
                                    sentNum++;
                                    var responseText = responseDetails.responseText;
                                    $("#rw_starter_resp").append(responseText);
                            }
                    });
                    updateLabel();
            }
           
            function updateLabel() {
                    $("#rw_starter_num").empty();
                    $("#rw_starter_num").append(sentNum);
            }
