    // ==UserScript==
    // @name           popupCaptcha
    // @namespace      http://*captchatrader.com
    // @include        http://*captchatrader.com/captchas/solve
    // ==/UserScript==
     
    var img_old;
    var win;
     
    // check status
    document.getElementById("status").addEventListener("DOMSubtreeModified", function() {
            if(document.getElementById("status").innerHTML == "Connection lost: Don't idle.  Refresh the page to connect again.")
                    win.close();
    }, false);
     
    document.getElementById("captcha_image").addEventListener("DOMAttrModified", function() {
            // get img
            var img = document.getElementById("captcha_image").style.backgroundImage.replace(/.*\("/, "").replace(/\)".*/, "");
           
            // check img
            if(img != "" && img != img_old) {
                    img_old = img;
                   
                    // open new window
                    if(win) win.close();
                    win = window.open("about:blank",
                            "new captcha",
                            "alwaysRaised,height=150,left=" + (screen.width - 350) + ",top=" + (screen.height - 150) + ",width=350");
                    win.document.write("<html><body style=\"text-align:center;\">" +
                            "<img src=\"http://captchatrader.com" + img + "\"><br><br>" +
                            "<input class=\"fh disable_form_history\" id=\"response\" type=\"text\">" +
                            "</body></html>");
                   
                    // focus
                    win.document.getElementById("response").focus();
                    //win.focus();
                    //win.blur();
                   
                    // check response
                    win.document.getElementById("response").addEventListener("keypress", function(event) {
                            if(event.keyCode == 13) {
                           
                                    // get response
                                    var response = win.document.getElementById("response").value;
                                    win.close();
                                   
                                    // send response
                                    document.getElementById("response").value = response;
                                    document.getElementById("response").nextSibling.click();
                            }
                    }, false);
            }
    }, false);
