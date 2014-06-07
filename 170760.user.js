// ==UserScript==
// @name       AutoClick for KingPui.de
// @namespace  http://userscripts.org/scripts/show/170760
// @version    2.0
// @description  Automizes the tedious process of clicking and closing of campaigns on KingPui.de.
// @include    /^http://(www\.)?kingpui\.de/index.php\?content=cash\//
// @include    /^http://(www\.)?kingpui\.de/(klick|goto)_kasys.php\?hash=.*?&do=(yes|no)/
// @grant      GM_setValue
// @grant      GM_getValue
// @require    http://code.jquery.com/jquery-2.0.0.min.js
// @copyright  Derija @ Wings of Dragons 2013 Germany
// ==/UserScript==

(function(w, uw, d, $) {
    if( !!w.location.href.match(/^http:\/\/(www\.)?kingpui\.de\/index\.php\?content=cash\//) ) {
        // Contains all campaign iFrames.
        var $gui,
            $campaigns,
            $campaignsFinished,
            $campaignsRunning,
            $exceptions,
            
            guiToggle = false,
            exceptionsToggle = true,
            
            running = true,
            maxWindows = GM_getValue('max_simultaneous_campaigns', 10),

            campaignsFinished = 0,
            campaignsRunning = 0;

        function main( ) {
            var $all = $('.mitte_mitte div[id]'),
                index = 0,
                interval = -1;
            
            if( interval === -1 ) {
                interval = w.setInterval(function() {
                    var curr, a, url, iframe;

                    // No campaigns left, load new ones.
                    if( $all.length === index ) {
                        w.clearInterval(interval);
                        interval = -1;
                        
                        $.ajax({
                            url : w.location.href,
                            dataType : 'text'
                        })
                        .done(function(response){
                            $('body > div[align="center"]:eq(0)').empty().append(
                                $(response.substring(response.indexOf('<html'))).filter('div[align="center"]:eq(0)')
                            );
                            main();
                        });
                    }

                    else {
                        // System turned off or limit of simultaneous campaigns reached.
                        if( !running || campaignsRunning >= maxWindows ) {
                            w.clearInterval(interval);
                            interval = -1;
                            return;
                        }
                        // Regular main loop.
                        else {
                            curr = $all.eq(index++);
                            a = curr.find('a');
                            url = a.attr('href');

                            campaignsRunning++;
                            updateCampaignsRunning();
                            iframe = $('<iframe>').attr('id', 'campaign_' + curr.attr('id')).css({width : 300, height : 300}).appendTo($campaigns);
                            curr.remove();

                            $.ajax({
                                url : url,
                                dataType : 'text',
                            })
                            .done(function(response){
                                var result = stripScriptTags(response),
                                    iwin = iframe[0].contentWindow;

                                result = result.substring(result.indexOf('<html'));
                                result = result.substring(result.indexOf('>') + 1, result.indexOf('</html>'));

                                iframe.contents().find('html').html(result)
                                    .attr('data-campaign-response', 'none')
                                    .on('DOMAttrModified', function(){
                                        var response = $(this).attr('data-campaign-response');
                                        if( response === 'done' ) {
                                            iwin.campaignDone();
                                        }
                                        else if( response === 'load' ) {
                                            iwin.campaignLoad();
                                        }
                                        else if( response === 'fail' ) {
                                            iwin.campaignFail();
                                        }
                                    });

                                // Campaign probably in reload phase.
                                if( !iframe.contents().find('frame').length ) {
                                    endCampaign(iframe);
                                }
                                else {
                                    iwin.campaignDone = function(){
                                        finishCampaign(iframe);
                                    };
                                    iwin.campaignLoad = function(){
                                        var adproviders = $exceptions.val().replace(/\s+/, ' ').split(' '),
                                            adprovider = $('b font', iframe[0].contentWindow.frames['check'].document).text(),
                                            i;
                                        for( i = 0; i < adproviders.length; ++i ) {
                                            if( adprovider.toLowerCase() === adproviders[i].toLowerCase() ) {
                                                endCampaign(iframe);
                                                break;
                                            }
                                        }
                                    };
                                    iwin.campaignFail = function(){
                                        endCampaign(iframe);
                                    };
                                }
                            })
                            .fail(function( jqXhr, txtError, error ) {
                                console.log("[AutoClick] Failed to load campaign \"" + url + "\"");
                            });
                        }
                    }
                }, 1500);
            }
        }

        function finishCampaign( iframe ) {
            endCampaign(iframe);
            $campaignsFinished.find('span').text(++campaignsFinished);
        }

        function endCampaign( iframe ) {
            // $(iframe)[0] makes sure that we get the element itself regardless of whether it has been previously wrapped with jQuery.
            delete $(iframe)[0].contentWindow.campaignDone;
            delete $(iframe)[0].contentWindow.campaignFail;
            delete $(iframe)[0].contentWindow.campaignLoad;
            $(iframe).remove();

            campaignsRunning--;
            updateCampaignsRunning();
            main();
        }
        
        function updateCampaignsRunning( ) {
            $campaignsRunning.find('span').text(campaignsRunning);
        }

        // The actual campaign automization.
        $(main);

        // Setting up the GUI.
        $(function(){
            var $wrapper,
                setGeneral,
                setCampaigns,
                setExceptions;

            $('<style>').text("#AutoClick4KingPui .button { display: inline-block; padding: 4px; background: #98ff96; border: 1px solid #0c8203; border-radius: 15px; -moz-border-radius: 15px; } #AutoClick4KingPui * { margin: 2px; }" + 
                    "#AutoClick4KingPui .autoclick-gui-set { display: block; margin: 4px; padding: 4px; border: 1px solid #bbb; border-radius: 10px; -moz-border-radius: 15px; }")
                .appendTo(d.head);

            $wrapper = $('<div>').css({
                position: 'absolute',
                top : 0,
                left: 0,
                right : 0,
                height : '100%',
            }).appendTo(d.body);
            $wrapper.css('top', -$wrapper.outerHeight() + 50);
            
            // GUI
            $gui = $('<div>').attr('id', 'AutoClick4KingPui').css({
                position: 'absolute',
                top : 0,
                left: 0,
                right : 0,
                bottom : 50,
                padding: 10,
                margin : 0,
                background: 'white',
                borderBottom : '1px solid black',
                overflow : 'auto',
            }).prependTo($wrapper);
            


            ////////////////////////////////////////////////////////////////////////////////
            // General


            setGeneral = $('<div>').addClass('autoclick-gui-set').attr('id', 'autoclick-gui-set-general').appendTo($gui);
            
            // Start/Stop button
            $('<div>').addClass('button')
                .text("Stop script")
                .click(function(){
                    running = !running;
                    console.log(running);
                    main();
                    console.log(running);
                    $(this).text(running ? "Stop script" : "Run script");
                })
            	.appendTo(setGeneral);

            // Show/Hide GUI
            $('<div>').css({
                    position : 'absolute',
                    right : 10,
                    bottom : 16,
                    height : 30,
                    lineHeight: '30px',
                    padding : 2,
                    fontSize: 14,
                    border : '1px solid #666',
                    borderTop : 0,
                    borderRadius : "0 0 4px 15px",
                    background : 'white'
                })
                .text("Show AutoClick GUI")
                .click(function(){
                    guiToggle = !guiToggle;
                    
                    $wrapper.stop().animate({
                        top : guiToggle ? 0 : -$wrapper.outerHeight() + 50
                    }, 500);
                    
                    $(this).text(guiToggle ? "Hide AutoClick GUI" : "Show AutoClick GUI");
                })
                .appendTo($wrapper);



            ////////////////////////////////////////////////////////////////////////////////
            // Campaigns


            setCampaigns = $('<div>').addClass('autoclick-gui-set').attr('id', 'autoclick-gui-set-campaigns')
                .append($('<h2>').text("Campaigns"))
                .appendTo($gui);

            // Set max simultaneous campaigns
            setCampaigns.append('Max simultaneous campagins: ');
            $('<input>').attr({type : 'number', min : 0, max : 100, value : maxWindows})
                .change(function() {
                    maxWindows = parseInt($(this).val());
                    GM_setValue('max_simultaneous_campaigns', maxWindows);
                    main();
                })
                .appendTo(setCampaigns);
            
            
            // Finished campaigns counter
            setCampaigns.append($('<br>'));
            $campaignsFinished = $('<span>').append('Campaigns finished: ').append($('<span>').text(campaignsFinished)).appendTo(setCampaigns);

            // Running campaigns counter
            setCampaigns.append(' ');
            $campaignsRunning = $('<span>').append('Campaigns running: ').append($('<span>').text(campaignsRunning)).appendTo(setCampaigns);

            // Reset campaigns counter, useful when errored
            $('<div>').addClass('button').text("Reset")
                .click(function(){
                    campaignsRunning = 0;
                    updateCampaignsRunning();
                    main();
                }).appendTo(setCampaigns);

            setCampaigns.append($('<br>'));

            // Show/Hide campaigns button
            $('<div>').addClass('button')
                .text("Show running campaigns")
                .click(function(){
                    $campaigns.stop().fadeToggle();
                    $(this).text($(this).text() === "Show running campaigns" ? "Hide running campaigns" : "Show running campaigns");
                })
                .appendTo(setCampaigns);

            // Campaign window
            $campaigns = $('<div>').css({
                display : 'block',
                height: 300,
                overflow: "auto",
                borderTop : "1px solid #444",
                borderLeft: "1px solid #444",
                borderRight : "1px solid #666",
                borderBottom: "1px solid #666",
                margin : '0 auto',
            }).appendTo(setCampaigns).hide();



            ////////////////////////////////////////////////////////////////////////////////
            // Exceptions


            setExceptions = $('<div>').addClass("autoclick-gui-set").attr('id', 'autoclick-gui-set-exceptions')
                .append($('<h2>').text("Exceptions"))
                .append("If you need to ignore some ad providers for some reason, put each of them in a new line.")
                .append($('<br>'))
                .appendTo($gui);

            // Toggle exceptions
            $('<div>').addClass('button').text('Ignore exceptions')
                .click(function(){
                    exceptionsToggle = !exceptionsToggle;
                    $(this).text(exceptionsToggle ? "Ignore exceptions" : "Respect exceptions");
                })
                .appendTo(setExceptions);

            // Exceptions textarea
            setExceptions.append($('<br>'));
            $exceptions = $('<textarea>').css({
                    width : 200,
                    height : 150,
                })
                .val(GM_getValue('ad_exceptions', ''))
                .change(function(){
                    GM_setValue('ad_exceptions', $(this).val());
                })
                .appendTo(setExceptions);
        });
    }

    // On KaSys page, notify parent window.
    else if( !!w.location.href.match(/^http:\/\/(www\.)?kingpui\.de\/(goto|klick)_kasys.php\?hash=.*?&do=(no|yes)/) ) {
        var $html = $('html', w.parent.document);

        // Campaign finished.
        if( w.location.href.indexOf('do=yes') > -1 ) {
            $html.attr('data-campaign-response', 'done');
            if( typeof w.parent.campaignDone !== 'undefined' ) {
                w.parent.campaignDone();
            }
        }

        // Campaign running / failed.
        else {
            $(function(){
                // Campaign running
                if( $('#SessionTimeCount').length ) {
                    $('#SessionTimeCount').css({display : 'inline-block', position : 'absolute', top : 10, left : 10, padding : 4, background : 'white', border : '1px solid black'});

                    $html.attr('data-campaign-response', 'load');
                    if( typeof w.parent.campaignLoad !== 'undefined' ) {
                        w.parent.campaignLoad();
                    }
                }

                // Campaign failed.
                else {
                    $html.attr('data-campaign-response', 'fail');
                    if( typeof w.parent.campaignFail !== 'undefined' ) {
                        w.parent.campaignFail();
                    }
                }
            });
        }
    }
    
    // Close all popups.
    else {
        if( w.parent !== w ) {
            w.close();
        }
    }


    function stripScriptTags( htmlText ) {
        var before, after;
        while( htmlText.indexOf('<script') > -1 ) {
            htmlText = htmlText.substring(0, htmlText.indexOf('<script')) +
                        htmlText.substring(htmlText.indexOf('</script>') + '</script>'.length);
        }
        return htmlText;
    }
    
    function closeWindow( ) {
        w.open('', '_self', '');
        w.top.close();
    }
    
})(window, unsafeWindow, document, jQuery);