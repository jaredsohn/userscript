// ==UserScript==
// @name           Torrentz Magnet Links
// @namespace      http://userscripts.org/users/124223
// @description    Add Magnet Links to Torrentz (torrentz.com, torrentz.eu)
// @include        http://www.torrentz.com/*
// @include        http://torrentz.com/*
// @include        http://www.torrentz.eu/*
// @include        http://torrentz.eu/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// Requires jQuery
$(document).ready(function(){
    // Magnet Image: http://magnet-uri.sourceforge.net/
    var magData = 'data:image/gif;base64,R0lGODlhDgAOAPcAAAAAAGNjY97e3v8AAP8ICP////////////////////////' +
                    '//////////////////////////////////////////////////////////////////////////////////////' +
                    '//////////////////////////////////////////////////////////////////////////////////////' +
                    '//////////////////////////////////////////////////////////////////////////////////////' +
                    '//////////////////////////////////////////////////////////////////////////////////////' +
                    '//////////////////////////////////////////////////////////////////////////////////////' +
                    '//////////////////////////////////////////////////////////////////////////////////////' +
                    '//////////////////////////////////////////////////////////////////////////////////////' +
                    '//////////////////////////////////////////////////////////////////////////////////////' +
                    '//////////////////////////////////////////////////////////////////////////////////////' +
                    '//////////////////////////////////////////////////////////////////////////////////////' +
                    '//////////////////////////////////////////////////////////////////////////////////////' +
                    '/////////////////////////////////yH5BAEAAAUALAAAAAAOAA4AAAhhAAEIHFigwMCDAhIKAFAQgMKFDh' +
                    'UyNPhQYMWGFQEMGEAAQICCAQAQGClwY8eCDUd21MhxYkqSLE+iFAlz4wCPIGmutHlzoMqOAXja/EkgQEihHFXi' +
                    'DMnS5MqPKI0eNIoyIAA7';

    // Torrage Icon
    var torrageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2' +
                    'FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAmlJREFUeNpck0urUlEUx9fR4xOfKVwsUzQlRyIm4cShEDQT8QM0' +
                    'ryYNpQ/QKKIvECLXjyA0cCKGEzEhSLqYSAji6/h+a+t/aF+kDYu1PXut//rttbZSt9slRVFoNBrRfr+ny+ViPZ' +
                    '/PHrbH0+n0GfsHVqv1m8/nu9Pr9X9ardb8eDxeDAYDmUwmkjlBq9Fobtg/3263T1erVfh0OoWJ6JEsy16bzabn' +
                    'wMFisbgbj8e/JpNJn+N/89l3jvsh5fP5j0zx1uPxUCgUokQiQXxILETz+Zw4iZiEZrMZ6IiJaLPZEFMQC7yX3W' +
                    '63Ui6XqdFoEO+p3W7T4XAgu92uGmPTer1WBeGXy6WajOX3+0nu9XpdDlqyumW321G1WiVGJK1WS4xPXq+XGF9N' +
                    'EN/huTrFYrGRJhgMrs1m8xZokiSRTqe7N1RCMoIFPvYwLG7+Wua7T7mjcz50iyAIwYsEXAlVrw0kTqdTkbnCip' +
                    'u2/T8ZCx6jBQkScIZkeDSap7OSw+GwYrFYFgJTeBgCkQwT4kKA/YnFF3K/39/yh6XARQCWEAA+BAQ6vmFx4w8c' +
                    'P5N59g5GUSeAkV0nw3AFISyugXMW1vGUHBqXy+VJJpMuvAHMWuCKbuO3oIDhEeE8Ho9rA4HAjTQcDqHq6HQ6H0' +
                    'ql0qtKpaKFEN46GgUPAVTFaKPRKGUymSoLvGaqpjQYDNRKwGN70mw2PxcKhRf1el3FhQCuF4lEKJfL/UylUm+M' +
                    'RuNX0KjXFAKoIO7JiKlarfapWCzG8B/IZrOjdDr9jqf1RTyi+4lcC4gG/aPBG3nJ+A+5T7fsFTEN0WDs/wowAN' +
                    '52uX+RjJcuAAAAAElFTkSuQmCC';

    // URL Regex
    var urlExpr = /\/([a-f0-9]{40})/;

    // Determine if this is a torrent page
    var downloadBlock = $("div.download");
    var trackersBlock = $("div.trackers");

    if(downloadBlock.length == 1 && trackersBlock.length == 1) {
        // Grab the DOM Nodes
        downloadBlock = downloadBlock.eq(0);
        trackersBlock = trackersBlock.eq(0);

        // Get the infohash
        var infoHash = window.location.href.match(urlExpr)[1];

        // Get the title
        var title = $("h2 > span", downloadBlock).text();

        // Get the trackers
        var trackers = "";
        $("dl > dt > a", trackersBlock).each(function(){
                trackers += "&tr=" + this.innerHTML;
        });

        // Create the magnet link
        var magnetUri = "magnet:?xt=urn:btih:" + infoHash + "&dn=" + title + trackers;

        // Magnet Link
        var newHTML = '<dl><dt><a href="' + magnetUri + '"><span class="u" style="background: transparent url(\'' + magData 
                    + '\') no-repeat 5px center;">Magnet Link</span> <span class="n">' + title + '</span></a></dt><dd>DHT</dd></dl>';
        
        // Torrage Link
        newHTML += '<dl><dt><a href="http://torrage.com/torrent/' + infoHash.toUpperCase() + '.torrent">'
                + '<span class="u" style="background: transparent url(\'' + torrageData + '\') no-repeat 5px center;">torrage.com</span>'
                + ' <span class="n">' + title + '</span></a></dt><dd>Torrent Cache</dd></dl>';
        
        // Hideable Download Locations
        var hideable = $("dl", downloadBlock);

        // Expando Link
        newHTML += '<dl><dt><a href="#" id="expand_dl"><span class="u">' + hideable.length + ' More...</span>'
                + ' <span class="n">More Download Locations</span></a></dt><dd>&nbsp;</dd></dl>';

        // Add New Links
        $("dl", downloadBlock).eq(0).before(newHTML);

        // Hide existing links
        hideable.hide();
        
        // Bind the expando link
        $("#expand_dl").click(function(){
            hideable.slideDown('normal');
            $(this).parent().parent().hide();
            return false;
        });
    }

    // For each results block
    $("div.results").each(function(){
        var block = this;
        
        // For each result
        $("dl > dt", block).each(function(){
            // Grab the dt
            var dt = this;
            
            // Grab the torrent details
            var link = $("a", dt);
            var title = link.text();
            var infoHash = link.attr('href').match(urlExpr)[1];
            
            // Set the initial magnet link without trackers, we'll update it later
            dt.innerHTML = '<a href="magnet:?xt=urn:btih:' + infoHash + '&dn=' + title + '" title="Magnet Link"><img src="' + magData + '" alt="Magnet Link" border="0" width="14" height="14"/></a>&nbsp;' + dt.innerHTML;

            // Grab the link so we can update the URI later
            link = $("a", dt).get(0);
            
            // Ajax Update function
            var update = (function(pLink, pTitle, pHash){
                return function(response) {
                    // Split the response by line
                    response = response.split(/[\t\r\n]+/g);

                    // Generate the tracker list
                    var trackers = "";
                    for(var i = 0; i < response.length; i++) {
                        // Skip blank lines
                        if(response[i] == "")
                            continue;

                        trackers += "&tr=" + response[i];
                    }

                    // Generate the new url
                    pLink.href = "magnet:?xt=urn:btih:" + pHash + "&dn=" + pTitle + trackers;
                };
            })(link, title, infoHash);

            // Asynchronous grab for trackers
            $.ajax({
                url: "http://" + window.location.hostname + "/announce_" + infoHash,
                dataType: "text",
                success: update
            });

        });
    });

});
