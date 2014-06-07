// ==UserScript==
// @name          Jailbait Gallery tweaks
// @namespace     jbg-tweaks
// @description   Make jailbaitgallery.com easier to navigate
// @include       http://www.jailbaitgallery.com/*
// @include       http://jailbaitgallery.com/*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @version       0.4.1
// @icon          http://www.jailbaitgallery.com/favicon.ico
// @require       http://usocheckup.redirectme.net/97954.js
// ==/UserScript==


// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}


function main () {
    function keyBinding1 (e) {
        var disableif = $("textarea:focus").length||$("input:focus").length;
        if (disableif) return;
        var code = e.keyCode;
        //alert("Keypress: The key is: "+e.keyCode);
        var link;
        switch(code) {
        case 37:
            // going left
            link = $("img[alt=\"Previous\"]").parent().attr('href');
            if (link) {
                e.preventDefault();
                location.href = link;
            }
            break;
        case 39:
            // going right
            link = $("img[alt=\"Next\"]").parent().attr('href');
            if (link) {
                e.preventDefault();
                location.href = link;
            }
            break;
        case 38:
            // vote keep
            if (~window.location.href.indexOf("/uploads/")) {
                link = $("img[alt=\"Keep!\"]").parent().attr('href');
                if (link) {
                    e.preventDefault();
                    location.href = link; 
                }
            }
            break;
        case 40:
            // vote dump
            if (~window.location.href.indexOf("/uploads/")) {
                link = $("img[alt=\"Dump!\"]").parent().attr('href');
                if (link) {
                    e.preventDefault();
                    location.href = link;
                }
            }
            break;
        }
    }

    function keyBinding2 (e) {
        var disableif = $("input:focus").length;
        if (disableif) return;
        var code = e.keyCode;
        //alert("Keypress: The key is: "+e.keyCode);
        switch(code) {
        case 37:
            // going left
            var prevlink = $('div.pageprevious > a:contains("Previous")').attr('href');
            if (prevlink) {
                e.preventDefault();
                location.href = prevlink;
            }
            break;
        case 39:
            // going right
            var nextlink = $('div.pagenext > a:contains("Next")').attr('href');
            if (!nextlink) // in Main Gallery, wtf?
                nextlink = $('div.pageprevious > a:contains("Next")').attr('href');
            if (nextlink) {
                e.preventDefault();
                location.href = nextlink;
            }
            break;
        }
    }

    if (!$.browser.mozilla) {
        if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
            this.GM_getValue=function (key,def) {
                return localStorage[key] || def;
            };
            this.GM_setValue=function (key,value) {
                return localStorage[key]=value;
            };
            this.GM_deleteValue=function (key) {
                return delete localStorage[key];
            };
        }
    }

    var photo = $('div.photo img').first();

    $('<style>.jbgt-autoscroll-on {background-color:#D6FFAB;}\n'+
      '.jbgt-autoscroll-off{background-color:#FFB5E5;}\n'+
      '.uploadthumb { border: 1px dashed #F00000; padding: 3px;}\n'+
      '</style>').appendTo('head');

    if (photo.length) {
        if ($.browser.mozilla) {
            /*autoscroller*/
            photo.parents("div.photo").first().attr('id','jbg-photo');
            var opt = GM_getValue("autoscrolling", false);
            if (opt) window.location.hash='jbg-photo';
            var autoscroller = $("<div/>", {
                "id":"jbgt-autoscroll",
                "text": ">",
                "class": opt?"jbgt-autoscroll-on":"jbgt-autoscroll-off",
                "css": {
                    "width":"10px",
                    "height": "20px",
                    "position":"absolute",
                    "left":"0px",
                    "top":photo.offset()["top"],
                    "border-style":"solid solid solid none",
                    "border-width":"1px",
                }
            });
            autoscroller.click(function(e){
                opt = !GM_getValue("autoscrolling", false);
                GM_setValue("autoscrolling", opt);
                if (opt) { 
                    $(this).addClass('jbgt-autoscroll-on')
                        .removeClass('jbgt-autoscroll-off');
                    window.location.hash='jbg-photo';
                }
                else 
                    $(this).removeClass('jbgt-autoscroll-on')
                    .addClass('jbgt-autoscroll-off');
            });
            autoscroller.appendTo("body");
        }
        /*Keyboard navigation*/
        if ($.browser.mozilla)
            $(document).keypress(keyBinding1);
        else
            $(document).keydown(keyBinding1);
    }

    if (~window.location.href.indexOf("/search.php")) {
        /* Search fix */
        var links = $('a[href*="&q="]');
        var querysplit = $('input#q').val().split(' ');
        for (ix in querysplit) querysplit[ix]=encodeURIComponent(querysplit[ix]);
        var query = querysplit.join('+');
        // alert(query);
        links.each( function(i) {
            str = $(this).attr('href');
            idx = str.indexOf('?')+1;
            newstr = str.substring(0,idx);
            params = new Array();
            split = str.substring(idx).split('&')
            for (ix in split) {
                pair = split[ix].split('=');
                if (pair[0] == 'q') pair[1]=query;
                params.push(pair.join('='));
            }
            this.href=newstr+params.join('&');
        });
    }

    /* Keyboard navigation on paginated views */
    if ($("div.pagenumber").length) {
        if ($.browser.mozilla)
            $(document).keypress(keyBinding2);
        else
            $(document).keydown(keyBinding2);
    }

    /* Highlight favorites that are still in uploads */

    if (~window.location.href.indexOf("/favorites.php")) {
        $('a[href*="uploads/"]').parents('div.randthumb')
            .removeClass('randthumb')
            .addClass('uploadthumb');
    }

}

if (typeof($)=="undefined")
    addJQuery(main);
else
    main();