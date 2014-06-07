// ==UserScript==
// @name           so-tag-votes
// @namespace      so
// @description    show votes for a particular tag
// @include        http://stackoverflow.com/users/*
// ==/UserScript==

var cssjson = {
    ".small-multiplier":{
        "font-size":"90%",
    },
    ".vote-selector":{
        "color":"#808185",
        "font-size":"70%",
        "font-weight":"bold",
        "margin-right":"4px"
    },
    ".vote-selected":{
        "color":"#444444",
        "font-size":"110%"
    },
    ".tag-rank":{
        "color":"#808185",
        "font-size":"80%",
        "margin-right":"4px"
    },
    ".popular-tag": {
        "font-weight":"bold",
        "font-size":"90%"
    },
    ".popular-tag.tag-rank-0": {
        "color":"#E9D07C"//
    },
    ".popular-tag.tag-rank-1": {
        "color":"silver"
    },
    ".popular-tag.tag-rank-2": {
        "color":"#CD7F32"
    },
    ".vote-selected":{
        "color":"#444444",
        "font-size":"120%"
    }
}

var styleStr = "";
for(var i in cssjson){
    styleStr += i + " {\n"
    for(var j in cssjson[i]){
           styleStr += "\t" + j + ":" + cssjson[i][j] + ";\n"
    }
    styleStr += "}\n"
}

var style = window.document.createElement('style');
style.type = 'text/css';
style.innerHTML = styleStr
document.getElementsByTagName("HEAD")[0].appendChild(style);

(function(){
    function GM_init() {
        if(typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait,100);
        } else {
            jQueryInit(unsafeWindow.jQuery);
        }
    }

    GM_init();

    unsafeWindow.updateVotes = function(allTagVotes) {
        window.setTimeout(function() {
            GM_setValue(allTagVotes.host+"_tag_votes", allTagVotes.toSource());
        }, 0);
    };


    function getRanking(count) {
        if(count === "") {
            return "?";
        }
        if(count < 3 || count > 19) {
            if(count %10 === 0) {
                return (count + 1) + "st";
            } else if(count %10 === 1) {
            return (count + 1) + "nd";
            } else if(count %10 === 2) {
            return (count + 1) + "rd";
            }
        }

        return (count + 1) + "th";
    }

    function jQueryInit($) {
        var userId = $("link[rel=canonical]").attr("href").split("/")[4];
        var currentUserId = $("#hlinks a[href^='/users/recent/']").attr("href").split("/")[3];

        if (currentUserId !=  userId) { return ; } //Looking at someone else's page, cancel ///

        var host = window.location.host;
        host = host.substring(0, host.indexOf('.'));

        var threshold = 20;
        var popularThreshold = 500;
        var silverThreshold = 400;

        var currentTime = new Date().getHours();

        var allTagVotes = eval(GM_getValue(host+"_tag_votes", {tagData:[], host:host}));

        var index = 0;
        $('.user-stats-table:eq(3) .post-tag').each(function() {
            $(this).next("span").after('<span class="tag-container tag-container-'+ index++ +'"></span>');
            $(this).next("span").addClass("small-multiplier");
        });

        function getTotalQuestions(data) {
            var totalQuestions = $('div.summarycount:eq(2)', data).html();
            var arr = totalQuestions.split(",");

            totalQuestions = '';
            $.each(arr, function(count, item) {
                totalQuestions  += item;
            });
            return parseInt(totalQuestions);
        }

        function getTagClass(totalQuestions, votes) {
            return ((totalQuestions > popularThreshold || votes > silverThreshold)?'popular-tag':'');
        }

        function updateTag(tagVotes, tagIndex) {
            $('.user-stats-table:eq(3) .tag-container-'+tagIndex+':first').html('<span class="tag-rank tag-rank-' + 
                tagVotes.rank + ' ' +  getTagClass(tagVotes.totalQuestions, tagVotes.votes) +
                '" style="text-align: right;" title="ranked '+getRanking(tagVotes.rank)+
                ' for all time votes in \''+tagVotes.name+'\' with '+tagVotes.votes+
                ' votes">'+tagVotes.votes+' ('+getRanking(tagVotes.rank)+')</span>');
        }

        function getTagVotes(tagIndex, tagName) {
            if(allTagVotes.length <= tagIndex ||
                !allTagVotes[tagIndex] ||
                tagName !== allTagVotes[tagIndex].name ||
                currentTime !== allTagVotes[tagIndex].lastUpdated) {

                allTagVotes[tagIndex] = {rank:"", votes:"", name:tagName, totalQuestions:"", lastUpdated:"-1"};
            }

            return allTagVotes[tagIndex];
        }


        function tagCallback(data, tagName, tagIndex) {
            var allTimeList = $('div#questions > div:eq(1) tr', data)
            for (var count=0; count < allTimeList.length; count++) {
                if(userId === $('div.user-details a', allTimeList[count]).attr("href").split("/")[2]) {
                    var tagCount = $('span.top-count:first', allTimeList[count]).html();
                    var totalQuestions = getTotalQuestions(data);

                    var tagVotes = {rank:count, votes:tagCount, name:tagName, totalQuestions:totalQuestions, lastUpdated:new Date().getHours()};

                    allTagVotes[tagIndex] = tagVotes;
                updateTag(tagVotes, tagIndex);

                unsafeWindow.updateVotes(allTagVotes);

                return;
                }
            };
        };

        //used to escape tag names for css classes
        function customEscape(tag) {
            tag = tag.replace("\.", "[").replace("\.", "[");
            tag = escape( encodeURIComponent( tag ) );
            tag = tag.replace("%", "_").replace("%", "_");                

            tag =  queryEscape(tag);
            return tag;
        }
        function queryEscape(tag) {
            tag = escape(tag);
            tag = tag.replace("+", "%2b").replace("+", "%2b");
            return tag;
        }

        function updateVoteLink(tagName, lastPage, voteCount, tagIndex) {

            var content = voteCount;//"&#9654;&nbsp;"+voteCount;

            if(!lastPage) {
                content = content + '<img src="http://sstatic.net/so/img/ajax-loader.gif" alt="">';

                $(".votes-"+customEscape(tagName)).html(content);
                $(".votes-"+customEscape(tagName)).addClass('vote-selected');
            } else {
                allTagVotes[tagIndex] = {rank:"", votes:voteCount, name:tagName, totalQuestions:"", lastUpdated:new Date().getHours()};
                updateTag(allTagVotes[tagIndex], tagIndex)
                unsafeWindow.updateVotes(allTagVotes);
            }

        }

        var SerialAjaxExecuter = function( onComplete, delay ) {
            this.requests = [];
            this.results  = [];
            this.delay    = delay || 1;
            this.onComplete = onComplete;
        }

        SerialAjaxExecuter.prototype.addRequest = function( method, url, data, callback, format ) {
            var self = this;
            this.requests.push( {
                "method"    : method
              , "url"       : url
              , "data"      : data
              , "format"    : format
              , "callback"  : callback
            } );
            var numRequests = this.requests.length;
            if ( numRequests > 1 ) {
                this.requests[numRequests-2].callback = function( nextRequest, completionCallback ) {
                    return function( data ) {
                        completionCallback( data );
                        setTimeout( function(){ self.execute( nextRequest ); }, self.delay );
                    }
                }( this.requests[numRequests-1], this.requests[numRequests-2].callback )
            }
        }

        SerialAjaxExecuter.prototype.execute = function( request ) {
          var self = this;
          if ( 'undefined' == typeof request ) {
              request = this.requests[0];
              var lastRequest = this.requests[this.requests.length-1];
              lastRequest.callback = function( completionCallback ) {
                  return function( data  ) {
                      completionCallback( data )
                      self.onComplete( self.results );
                  }
              }( lastRequest.callback )
          }
          request.method( request.url, request.data, function( r ) {
              return function( data ) {
                  self.results.push( data );
                  r.callback( data );
              }
          }( request ) )
        }

        function firstpageCallback(data, tagName,tagIndex) {
            var voteCount = 0;

            var pages = $(".page-numbers", data).length - 6;
            var totalPages = 0;

            if(pages > 0) {
                totalPages = $(".page-numbers:eq("+pages+")", data).html();
            } else if(pages > -2) {
                //exactly 1 answer
                totalPages = 1;
            }

            function countPageVotes(data,lastPage, tagIndex){
                var pageVoteCount = 0;
                $(".vote-count-post > strong", data).each(function(){
                    //$(this).parent("span").parent("div").parent("div").next("div")
                    var curr = $(this).parents('.stats:first');

                    var answer =$(curr).children(".status:first");

                    if(answer.html() === "") {
                        pageVoteCount += parseInt($(this).html());
                    }
                });

                voteCount += pageVoteCount;

                updateVoteLink(tagName, lastPage, voteCount, tagIndex);
            }

            countPageVotes(data, (totalPages <= 1), tagIndex);

            $(function(){
                var se = new SerialAjaxExecuter( function( results ) {
                    console.log( results );
                }, 1500 );

                for (var pageCount=1; pageCount < totalPages; pageCount++) {
                    (function delayTranche() {
                        var page = pageCount;
                        var lastPage = (page === (totalPages - 1));
                        se.addRequest( $.get, "/search?q=user%3A"+userId+"+wiki%3A0+votes%3a1+[" + queryEscape(tagName) + "]&pagesize=50&page="+(page+1)+"&tab=newest", {n:pageCount},
                            function(data){countPageVotes(data, lastPage, tagIndex)}, "html" );
                    })();
                }

                se.execute();
            });

        }

        function loadTagRankings() {

            $(function(){
                var se = new SerialAjaxExecuter( function( results ) {
                    console.log( results );
                }, 1000 );

                var postTags = $('.user-stats-table:eq(3) .post-tag');

                for (var j=0; j < postTags.length; j++) {//1; j++){//
                    var currentTag = postTags[j].toString().split("[")[1].split("]")[0];
                    var tagCount = $(".user-stats-table:eq(3) a[href*='["+currentTag+"]']").next();

                    if(tagCount.html().length > 0) {
                        tagCount = tagCount.html().substring(7);

                        if(tagCount >= threshold) {
                            var tagVotes = getTagVotes(j, currentTag);

                            //first set any cached value, then check for updates
                            if(tagVotes.lastUpdated != -1) {
                                updateTag(tagVotes, j);
                            }
                            if(currentTime !== tagVotes.lastUpdated) {
                                (function() {
                                    var tagIndex = j;

                                    var tagName = currentTag;

                                    se.addRequest( $.get, "/questions/tagged?tagnames="+tagName+"&sort=stats",
                                        {n:tagCount},
                                        function(data){tagCallback(data, tagName, tagIndex)}, "html" );
                                })();
                            }
                        }
                    }
                }

                se.execute();
            });
        }

        loadTagRankings();

        var badgeTable = $('.user-stats-table:eq(4)');

        index = 0;
        $('.user-stats-table:eq(3) .post-tag').each(function(){
            var tagName = $.trim($(this).text());

            //there will be 0, 1 or 2 badges, 1 means silver, 2 means gold
            var badgeType = $(".badge", badgeTable).map(function() {
                var type = $(this).children("span:first").attr("class");
                var text = $(this).html().split("&nbsp;")[1];

                if(text === tagName) {
                    return text;
                }
            });

            if(badgeType.length > 0) {
                $(this).addClass("badge");
                $(this).html('<span class="badge'+(3 - badgeType.length)+'">&#9679;</span>&nbsp;' + tagName);
            }

            var tagDom = $('.user-stats-table:eq(3) .tag-container-'+ index +':first');

            if(tagDom.html() === "") {
                (function() {
                    var tagIndex=index;
                    tagDom.html('<a class="tag-rank '+ getTagClass(0, 0)+' votes-'+customEscape(tagName)+'" style="text-align: right;" title="get votes for '+tagName+'">&#9660;</a>');

                    $('a', tagDom).click(function(){
                        updateVoteLink(tagName, false, "", tagIndex);

                        $.get("/search?q=user%3A"+userId+"+wiki%3A0+votes%3a1+[" + queryEscape(tagName) + "]&pagesize=50&tab=newest", 
                            function(data){firstpageCallback(data, tagName, tagIndex)}, "html");
                        return false;
                    });
                })();
            }
            index++;
        });
    }
})();
