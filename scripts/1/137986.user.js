// ==UserScript==
// @name       Udacity forum questions under video
// @namespace  http://github.com/bcoughlan
// @version    0.6
// @description Show forum questions under the video on Udacity.
// @match      http://*.udacity.com/view#Course/**
// @copyright  2012+, Barry Coughlan
// @require http://userscripts.org/scripts/source/100842.user.js
// ==/UserScript==

contentEval(function () {
    var Utils = {};
    
    Utils.findForumTagByURLHash = (function () {
        var regexes = [ 
            [/Unit (\d+)/, 'unit'], 
            [/Problem Set (\d+)/, 'ps'],
            [/(\d+)\. Problem Set/, 'ps'],
            [/(\d+)\. .*/, 'unit']
        ];

        return (function (hash, data) {
            if (hash[0]==='#') {
                hash = hash.slice(1);
            }
            var nuggetIndex = hash.indexOf("/Nugget/");
            var unitPath = hash.slice(0, nuggetIndex);
            var nuggetID = parseInt(hash.slice(nuggetIndex + 8), 10);

            //Find unit that matches the URL hash
            var units = data.payload.course_rev.units;
            var unit = units.filter(function(u) { return u.path === unitPath; })[0];
            if (!unit) { return null; }
            
            //Find tag prefix
            var tagPrefix=null;
            for (var i=0; i<regexes.length; i++) {
                var r = regexes[i][0].exec(unit.name); 
                if (r !== null) {
                    tagPrefix = regexes[i][1]+r[1];
                    break;
                }
            }
            if (!tagPrefix) { return null; }
            
            //Find key of nugget that matches the ID in the URL
            var nuggetKey = (unit.nuggets.filter(function(n) { return n.id===nuggetID; })[0]).key;
            
            var findNuggetIndex = function (nuggetLayout, nuggetKey) {
                for(var i=0; i<nuggetLayout.length; i++) {
                    for(var j=0; j<nuggetLayout[i].length; j++) {
                        if (nuggetLayout[i][j].nugget_key===nuggetKey) {
                            return i;
                        }
                    }
                }
                return null;
            }
            //Find index of nugget with given key
            var nuggetIndex = findNuggetIndex(unit.nuggetLayout, nuggetKey);
            if (nuggetIndex===null) { return null }
            
            return tagPrefix+"-"+(nuggetIndex+1);
        });
    })();
    Utils.addTab = function (slug, title, content) {
        $('#tabs').tabs();
        $('#tabs').tabs('add', '#tab-'+slug, title);
        var anchor = $('#tab-'+slug);
        anchor.html(content);
        return anchor;
    };

    //-------------------------------------------
    var UdacityPlugin = function (initialHash) {
        var context = this;
        this.data = null;
        this.questionsTab = null;

        $('head').append('<link type="text/css" href="http://frink.nuigalway.ie/~grasshopa/udacityplugin/osqastyle.css" rel="stylesheet" media="all" />');

        if (initialHash[0]==='#') {
            initialHash = initialHash.slice(1);
        }
        initialHash = initialHash.replace('"', "%22");
        $.ajax("/ajax?{%22data%22:{%22path%22:%22%23"+initialHash+"%22},%22method%22:%22course.get%22,%22version%22:%22dacity-"+udacityJSVersion+"%22}", {
            datatype: "json",
            async: false,
            success: function(data) {
                context.data = data;
                context.questionsTab = Utils.addTab('questions', 'Questions', '');
                context.loadQuestions(initialHash);
            }
        });


    };
    UdacityPlugin.prototype.loadQuestions = function (hash) {
        var context = this;
        this.lastAJAXrequest=null;
        context.questionsTab.html("<h4>Loading Questions...<h4>");
        var tag = Utils.findForumTagByURLHash(hash, this.data);
        if (!tag) {
            this.questionsTab.html("<h4>Sorry, I don't know the tag for this section</h4>");
            return;
        }
        //Abort last AJAX request (if active) to prevent race condition
        if (this.lastAJAXrequest !== null) {
            this.lastAJAXrequest.abort();
        }
        
        // Get OSQA HTML page for tag (in JSONP format via Yahoo Pipes - for cross-domain reasons)
        // Using HTML as the RSS feed can contain XML that Yahoo Pipes can't parse, also the RSS has no answer/views stats
        var classID = hash.replace(/.*Course\/([a-z]{2}\d+)\/.*/, '$1');
        this.lastAJAXrequest = $.getJSON(
            'http://pipes.yahoo.com/pipes/pipe.run?_id=6aada231b9edf9414aa79a87a6bcbe9a&_render=json&_callback=?',
            {'tag': tag, 'class': classID},
            function(data) {
                var hasQuestions=false;
                if (data.value.items.length > 0) {
                    var raw_html = data.value.items[0].content;
                    //Yahoo Pipes escapes ampersands of entities, convert them back and decode the entities
                    raw_html = raw_html.replace(/&amp;(#\d+;)/g, '&$1').replace(/&#([^\s]*);/g, function(match, match2) {return String.fromCharCode(Number(match2));});

                    var html = $(raw_html);
                    var questions_html = $('#CALeft', html)[0];
                    
                    if ($('.short-summary', questions_html).length >= 0) {
                        context.questionsTab.html(questions_html);
                        hasQuestions=true;
                    }
                }
                if (!hasQuestions) {
                    context.questionsTab.html("<h4>No questions found for tag '"+tag+"'</h4>");
                }
            }
        );
    };


    var udacityPlugin = new UdacityPlugin(window.location.hash);

    //Update questions when video changes
    window.onhashchange = function() {
        udacityPlugin.loadQuestions(window.location.hash);
    }
});
