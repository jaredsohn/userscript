/// <reference path="jquery-vsdoc.js" />

// ==UserScript==
// @name           hliang
// @namespace      hliang
// @description    hliang

// @include        http://bt.hliang.com/*
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}
function main() {

	var css = "img, input{max-width:100%}.bd{position:relative;}.bd-link{position:absolute;bottom:6px;right:12px;background-color:yellow}#commentarea{display:none;}.intro img{width:900px}.torrent_files{left: 0;position: absolute;top: 31px;background-color:yellow}.torrent_files li{font-weight:bold;font-size:14px}.download{position: absolute;  top: 25px; left: 345px;}.bd{position:relative}";
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}

    var bdIndex = 0;
    var url = document.location.href;
    var urls = url.split('/');
    var domain = urls[2];

        var listSelector = '#listTable';
        var bdSelector = '.slayout .c2';
        var linkSelector = $(listSelector + ' td:nth-child(3) a:nth-child(1)');
        //$(listSelector).hide();
        var pageNow = $('.page .current');


    var linkCount = linkSelector.length;
    $(listSelector).before('<div id="bd-1"></div>');
   

    var nextPage = $('.nextprev:eq(1)').attr('href');
    var prevPage = $('.nextprev:eq(0)').attr('href');

    function loadBd() {
        var link = document.location.href;
        var links = link.split('#');
        if (links.length > 1) {
            var num = parseInt(links[links.length - 1].replace('bd', ''));
            bdIndex = num + 1;
            $('.bd').hide();
            $('#bd' + bdIndex).show();
            link = links[0] + '#bd' + bdIndex.toString();
            if (bdIndex + 1 > linkCount)
                link = nextPage;

            for (var i = bdIndex; i < bdIndex + 5; i++) {
                if ($('#bd' + i).length < 1) {
                    $('#bd-1').append('<div id="bd' + i + '" class="bd" style="display:none"><div id="bd-inner' + i + '"></div></div>');
                    $('#bd' + bdIndex).show();
                    var bdLink = linkSelector.get(i);
                    $('#bd-inner' + i).load(bdLink + ' ' + bdSelector);
$('#bd' + i).append('<a class="bd-link" target="_blank" href=' + bdLink +'>' + bdLink +'</a>');
                }
            }
        }
        else
            link += '#bd-1';
        window.location.href = link;
    }
    loadBd();
    //J
    $(document).keydown(function (e) {
        if(e.keyCode == 74 || e.keyCode == 81) {
            loadBd();
        }
    })
    //K
    $(document).keydown(function (e) {
        if(e.keyCode == 75 || e.keyCode == 87) {
            var link = document.location.href;
            var links = link.split('#');
            if (links.length > 1) {
                var num = parseInt(links[links.length - 1].replace('bd', ''));
                if (num < 0)
                    window.location.href = prevPage;
                else {
                    bdIndex = num - 1;
                    $('.bd').hide();
                    for (var i = bdIndex; i < bdIndex + 1; i++) {
                        if ($('#bd' + i).length < 1) {
                            $('#bd-1').append('<div id="bd' + i + '" class="bd" style="display:none"><div id="bd-inner' + i + '"></div></div>');
                            var bdLink = linkSelector.get(i);
                            $('#bd-inner' + i).load(bdLink + ' ' + bdSelector);
$('#bd' + i).append('<a class="bd-link" target="_blank" href=' + bdLink +'>' + bdLink +'</a>');
                        }
                    }
                    link = links[0] + '#bd' + bdIndex.toString();
                    window.location.href = link;
                    $('#bd' + bdIndex).show();
                }
            }
        }
    })
}
addJQuery(main);