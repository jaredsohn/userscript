// ==UserScript==
// @name        4chan loopvid
// @namespace   4chan-loopvid
// @description html5 video embedder for 4chan
// @version     0.1.4
// @updateURL   http://userscripts.org/scripts/source/292274.meta.js
// @icon        http://i.imgur.com/JHVzK.png
// @match       *://boards.4chan.org/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @license     MIT
// @run-at      document-end
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);
waitForKeyElements(".linkify, .linkified", embedder);
//--- This function is called for on each detected class=linkify element

function embedder($jNode) {
    var hashRe = /^(?:https?:\/\/)?[a-zA-Z0-9\-\.]*(?:(?:gfycat\.com)|(?:loopvid\.appspot\.com\/(pf|kd)))\/([\w\-]+)(?:,([\w\-]+))?/i;
    var groups = hashRe.exec($jNode.attr('href')); //[1]= pf/kd, [2]=vidid1, [3]=vidid2
    
    if (!groups) {return;} //if no matches were found, exit function
    $jNode.html($jNode.attr('href')); //I need to add this because 4chan x is weird
    //workaround to hide overlapping embed buttons
    var $nextsib = $jNode.next();
    var nextsibclass = $nextsib.attr('class');
    if (nextsibclass == 'vidEmbedbtn'|| nextsibclass == 'embedder') {
        $nextsib.hide();
    }
    //create an embedbtn and insert it after the link
    var link = $jNode.attr('href').toLowerCase();
    var $embedbtn;
    if (link.indexOf('gfycat') >= 0) {
        $embedbtn = getEmbedbtn('gfy');
        $embedbtn.insertAfter($jNode);
    } else if (link.indexOf('loopvid') >= 0) {
        $embedbtn = getEmbedbtn('lv');
        $embedbtn.insertAfter($jNode);
        
    }
    //--- generates embedbtn
    
    function getEmbedbtn(type) {
        $genbtn = $('<a>', {
            class: 'vidEmbedbtn',
            href: 'javascript:;',
            text: '(embed)',
            vidid: groups[2],
            vidid2: groups[3],
            //alt loopvid id
            lvhost: groups[1],
            //loopvid pf/kd host
            vidtype: type,
            style: 'text-decoration: none; margin-left: 5px;'
        });
        return $genbtn;
    }
}
//--- thread-wide onclick-eventhandler for embed-buttons
$('.board .thread').on('click', 'a.vidEmbedbtn', function(e) {
    e.stopPropagation();
    var $btn = $(this);
    //Different button states: Loading, Embedded, Embed
    if ($btn.hasClass('loading')) { //on 'loading' do nothing
        return;
    } else if ($btn.hasClass('embedded')) { //on 'embedded' remove video
        $btn.prev().remove();
        $btn.removeClass('embedded').text('(embed)');
    } else { //on 'embed' insert video
        insertVid();
    }
    //--- Takes the button that was clicked on and inserts the video to the DOM

    function insertVid() {
        $btn.addClass('loading').text('(loading...)');
        var vidtype = $btn.attr('vidtype');
        switch (vidtype) {
        case 'gfy':
            //GFYCAT --- JSON request -> generates video with JSON object -> inserts video
            apiURL = 'http://gfycat.com/cajax/get/' + $btn.attr('vidid');
            $.getJSON(apiURL, function(jsonstring) {
                var data = jsonstring.gfyItem;
                genVid(vidtype, data).insertBefore($btn);
                finish();
            }).fail(function(jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
                finish('no responce');
            });
            break;
        case 'lv':
            //LOOPVID --- creates own object -> generates video with said object -> inserts video
            var lvhost = $btn.attr('lvhost');
            var lvObject = new Object();
            var lvid1 = $btn.attr('vidid');
            var lvid2 = $btn.attr('vidid2');
            var lvurl;
            if (lvhost == 'pf') {
                lvurl = 'http://a.pomf.se/';
            } else if (lvhost == 'kd') {
                lvurl = 'http://kastden.org/loopvid/'
            }
            lvObject.mp4Url = lvurl + lvid1 + '.mp4';
            lvObject.mp4Url2 = lvurl + lvid2 + '.mp4';
            lvObject.webmUrl = lvurl + lvid1 + '.webm';
            lvObject.webmUrl2 = lvurl + lvid2 + '.webm';
            genVid(vidtype, lvObject).insertBefore($btn);
            finish();
            break;
        }
        return;
        //Takes a video object and returns a video html element

        function genVid(type, vidObject) {
            var $vidcontainer = $('<div class="loopvidContainer"></div>');
            var $vid = $('<video width="' + vidObject.width + '" height="' + vidObject.height + '" autoplay loop controls></video>')
                .append('<source src="' + vidObject.mp4Url + '" type="video/mp4" />')
                .append('<source src="' + vidObject.webmUrl + '" type="video/webm" />');
            if (type == 'lv') {
                $vid.append('<source src="' + vidObject.mp4Url2 + '" type="video/mp4" />') //used by loopvid videos
                .append('<source src="' + vidObject.webmUrl2 + '" type="video/webm" />'); //when mp4 and webm are reversed
            }
            $vid.append('Your browser does not support the video tag.');
            if (type == 'gfy') {
                $vid.append('<a href="' + vidObject.gifUrl + '">' + vidObject.gifUrl + '</a>');
            }
            $vid.appendTo($vidcontainer);
            return $vidcontainer;
        }
        //finishing touches! (accepts an error message in case of errors)

        function finish(error) {
            $btn.removeClass('loading');
            if (!error) {
                $btn.addClass('embedded').text('(unembed)');
            } else {
                $btn.text('(error: ' + error + ')');
        }
        return;
        }
    }
});
//--- this function below detects the links as they come
//--- https://gist.github.com/BrockA/2625891

function waitForKeyElements (
    selectorTxt, /* Required: The jQuery selector string that
specifies the desired element(s).
*/
    actionFunction, /* Required: The code to run when elements are
found. It is passed a jNode to the matched
element.
*/
    bWaitOnce, /* Optional: If false, will continue to scan for
new elements even after the first match is
found.
*/
    iframeSelector /* Optional: If set, identifies the iframe to
search.
*/
) {
    var targetNodes, btargetsFound;
    
    if (typeof iframeSelector == "undefined")
        targetNodes = $(selectorTxt);
    else
        targetNodes = $(iframeSelector).contents ()
                                           .find (selectorTxt);
    
    if (targetNodes && targetNodes.length > 0) {
        btargetsFound = true;
        /*--- Found target node(s). Go through each and act if they
are new.
*/
        targetNodes.each ( function () {
            var jThis = $(this);
            var alreadyFound = jThis.data ('alreadyFound') || false;
    
            if (!alreadyFound) {
                //--- Call the payload function.
                var cancelFound = actionFunction (jThis);
                if (cancelFound)
                    btargetsFound = false;
                else
                    jThis.data ('alreadyFound', true);
            }
        } );
    }
    else {
        btargetsFound = false;
    }
    
    //--- Get the timer-control variable for this selector.
    var controlObj = waitForKeyElements.controlObj || {};
    var controlKey = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl = controlObj [controlKey];
    
    //--- Now set or clear the timer as appropriate.
    if (btargetsFound && bWaitOnce && timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval (timeControl);
        delete controlObj [controlKey]
    }
    else {
        //--- Set a timer, if needed.
        if ( ! timeControl) {
            timeControl = setInterval ( function () {
                    waitForKeyElements ( selectorTxt,
                                            actionFunction,
                                            bWaitOnce,
                                            iframeSelector
                                        );
                },
                300
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj = controlObj;
}
