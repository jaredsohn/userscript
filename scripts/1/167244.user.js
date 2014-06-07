// ==UserScript==
// @name       scrap.tf auto add
// @namespace  http://scrap.tf
// @version    1
// @description Automatically adds the scrap.tf bot to your friendslist
// @match      http://scrap.tf/*
// @copyright  2012+, Mega
// ==/UserScript==

unsafeWindow.$("button[class*=finish-],.span12 a").click(function() {
    addbot();
});

function addbot(){
    if(unsafeWindow.$(".pulled-down").length == 0)
    {
     	setTimeout(addbot, 1000);
        return;
    }
    unsafeWindow.$.ajax({
            type: "POST",
            url: 'ScrapAPI.php',
            data: {
                m: "inQueue",
                time: new Date().getTime(),
                "csrf": unsafeWindow.csrfCode
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (data.success == true) {
                    if (data.inQueue == true) {
                        console.log('Adding the bot to your friendslist');
                        var steamlink = data.botName.match( /[A-Za-z0-9\/:]{10,}/gm );
                        var ifrm = document.createElement("iframe");
                        ifrm.setAttribute("src", steamlink);
                        ifrm.style.width = "0px";
                        ifrm.style.height = "0px";
                        document.body.appendChild(ifrm);
                    }
                }
            }
        });
}