// ==UserScript==
// @name           StackOverflow - Accepted Answer Munger
// @namespace      StackOverflow
// @description    Adds accepted answer count and accepted badges section to the user profile page
// @include        http://stackoverflow.com/users/*
// @include        http://meta.stackoverflow.com/users/*
// @include        http://superuser.com/users/*
// @include        http://serverfault.com/users/*
// ==/UserScript==

(function(){
    function GM_init() {
        if(typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait,100);
        } else {
            jQuery_init(unsafeWindow.jQuery);
        }
    }

    GM_init();

    unsafeWindow.update_answers = function(accepted) {
        window.setTimeout(function() {
            GM_setValue(accepted.host+"_tag_stats", accepted.toSource());
            GM_setValue(accepted.host+"_accepted_count_last", new Date().getHours());
        }, 0);
    };

    function get_accepted_ratio_text(total_answers, accepted_count) {
        if(accepted_count === 0 || total_answers === 0 ) {
            return 'N/A';
        }
        return '(' + (Math.round((accepted_count*1000)/total_answers) /10) + '&nbsp;%)';
    }

    function jQuery_init($) {
        var user_id = $("link[rel=canonical]").attr("href").split("/")[4];
        var current_user_id = $("#hlinks a[href^='/users/recent/']").attr("href").split("/")[3];

        var host = window.location.host;
        host = host.substring(0, host.indexOf('.'));

        var last_updated = GM_getValue(host+"_accepted_count_last","0");

        var current_time = new Date().getTime();

        var accepted = eval(GM_getValue(host+"_tag_stats", {tag_stats:[], host:""}));
        accepted.host = host;

        var total_answers = $('.summarycount:eq(2)').html();

        var current_hours = new Date().getHours();

        var threshold = 50;

        var page_size = $(".answer-pager > a:first").attr("href").split("&")[1].split("=")[1];

        function update_total(accepted, accepted_count) {
            accepted.accepted_count =accepted_count;
            var curr = $('h1:eq(2)').parents("td:first");

            if(accepted_count == undefined) {
                accepted_count=0;
            }

            var aggregate_badges = 0;

            var accepted_descs = [["Savant", 1000, 1], ["Sage", 400, 2], ["Seer", threshold, 3]];

            for (var j=0; j<accepted_descs.length; j++) {
                if(accepted.accepted_count >= accepted_descs[j][1] && aggregate_badges < accepted_descs[j][2]) {
                    aggregate_badges++;
                    accepted.tag_stats[accepted.tag_stats.length] = accepted_descs[j];
                }
            }

            curr.after('<td style="padding-left: 10px;"><div class="summarycount acceptedCount" style="text-align: left;">'+accepted_count+'</div></td><td style="vertical-align: middle; padding-left: 10px;"><h1>Accepted</h1></td><td style="vertical-align: middle; padding-left: 10px;"><div class="item-multiplier acceptedRatio" style="text-align: right;" title="ratio of answers given that have been accepted">' + get_accepted_ratio_text(total_answers, accepted_count) + '</div></td>');
        }

        function get_search_text(user_id, page_size, is_accepted, page, tag_name) {
            var search_text = "/search?q=user%3A"+user_id;

            if(is_accepted) {
                search_text = search_text + "+isaccepted%3A1";
            }

            if(tag_name !== undefined) {
                search_text = search_text + "+["+tag_name+"]";
            }

            search_text = search_text+"&pagesize=" + page_size;

            if(page !== undefined) {
                search_text = search_text + "&page="+page;
            }

            return search_text;
        }

        function first_callback(data, update_callback, is_accepted, tag_name, wrapper_count) {
            var page_count = $(".page-numbers", data).length - 6;
            var count = 0;

            if(page_count > 0) {
                count = $(".page-numbers:eq("+page_count+")", data).html();
                $.get(get_search_text(user_id, page_size, is_accepted, count, tag_name),
                    function(data){answer_callback(data, update_callback, count, tag_name, wrapper_count)}, "html");
            } else {
                count = $(".answer-hyperlink", data).length;
                update_callback(accepted, count, tag_name, wrapper_count);
            }
        };

        function answer_callback(data, update_callback, page_count, tag_name, wrapper_count) {
            var count = ((page_count-1)* page_size) + $(".answer-hyperlink", data).length;

            update_callback(accepted, count, tag_name, wrapper_count);
        };

        //get the total accepted answers
        $.get(get_search_text(user_id, page_size, true, 1),
            function(data){first_callback(data, update_total, true)}, "html");

        //only show the total for other users, badges is too many requests
        if (current_user_id !=  user_id) { return ; } //Looking at someone else's page, cancel ///

        if(last_updated === current_hours) {
            insert_badges(accepted);

            var unread = $('.accepted_badges_summary:last');
            unread.html('');

            return;
        }

        accepted.tag_stats=[];

        curr = $('.user-stats-table:eq(3)');

        var post_tags = $(".post-tag", curr);

        function update_answer_tags(accepted) {
            accepted.tag_stats.sort(function (a,b) {
                return b[1]-a[1];
            });

            insert_badges(accepted);

            unsafeWindow.update_answers(accepted);
        }

        function insert_badges(accepted) {
            var tag_stats = accepted.tag_stats;

            //find the last item over the threshold and process only those elements over it
            for (var j=0; j<tag_stats.length; j++) {
                if(accepted.tag_stats[j][1] < threshold) {
                   tag_stats = tag_stats.slice(0,j);
                   break;
                }
            }

            curr = $('.user-stats-table:eq(4)');

            var column_count = $('tr:first > td', curr).length;

            var acceptedbadges = $('.accepted_badges_summary:first');

            var badge_html = "<tr>";
            var badge_count = tag_stats.length;

            if(acceptedbadges.length === 0 ) {
                curr.after('<p> </p><table><tbody><tr><td><div class="summarycount accepted_badges_summary" style="text-align: right;"> '+badge_count+'</div></td><td style="vertical-align: middle; padding-left: 10px;"><h1>Accepted Badges</h1></td><td style="vertical-align: middle; padding-left: 10px;"><td><div class="accepted_badges_summary"></div></td></tr></tbody></table><div class="user-stats-table"><table><tbody class="accepted_badges"></tbody></table></div>');
                var unread = $('.accepted_badges_summary:last');
                unread.html('<img src="http://sstatic.net/so/img/ajax-loader.gif" alt="">');
            } else {
                acceptedbadges.html(badge_count);
            }

            curr = $('.accepted_badges:first');

            for (var i=0; i<tag_stats.length; i++) {
               badge_html = badge_html+'<td style="width: 200px;">'+get_badge(tag_stats[i])+'</td>';

               if((i % column_count) == (column_count - 1)) {
                   badge_html = badge_html+'</tr><tr>';
               }

               if(i == badge_count - 1) {
                   badge_html = badge_html+'</tr>';
               }
            }

            curr.html(badge_html);

            function get_badge_desc(badge_type) {
                if(badge_type==3) {
                    return "bronze";
                }
                if(badge_type==2) {
                    return "silver";
                }
                return "gold";
            }

            function get_badge_html(badge_type, accepted_count, tag_name, total_count) {
                var badge_tooltip = accepted_count +" accepted answers";
                var multiplier_text = "";
                var href_insert_text = "";
                if(total_count !== undefined) {
                    badge_tooltip = accepted_count + '/'+total_count+' '+get_accepted_ratio_text(total_count, accepted_count)+' accepted answers for tag ' + unescape(tag_name);
                    multiplier_text = '<span class="item-multiplier">'+accepted_count+'</span><br/>';
                    href_insert_text = "["+tag_name+"]";
                }

                return '<a class="badge" title="'+ get_badge_desc(badge_type)+' badge:' + badge_tooltip + '" href="/search?q=user%3A'+user_id+'+isaccepted%3A1'+href_insert_text+'&pagesize='+page_size+'"><span class="badge'+badge_type+'">&#9679;</span> '+unescape(tag_name)+'</a>' + multiplier_text;
            }

            function get_badge(tag_stats) {
                var tag = tag_stats[0];
                var accepted_count =tag_stats[1];
                var badge_type =tag_stats[2];

                if(tag_stats.length > 3) {
                    return get_badge_html(badge_type, accepted_count, tag, tag_stats[3]);
                }

                return get_badge_html(badge_type, accepted_count, tag);
            }
        }

        function load_answers() {
            if (!GM_getValue) {
                alert('Please upgrade to the latest version of Greasemonkey.');
                return;
            }

            //callback to get the accepted answers for a tag
            function get_accepted(accepted, accepted_count, tag_name) {
                if(accepted_count >= threshold) {
                    $.get(get_search_text(user_id, page_size, false, 1, tag_name),
                        function(data){first_callback(data, update_tag, false, tag_name, accepted_count)}, "html");
                }
            }

            //callback to get the accepted answers for a tag
            function update_tag(accepted, total_count, tag_name, accepted_count) {
                if(accepted_count > 0) {
                    var badge_type = 3;
	        if(accepted_count >= 100) {
	            badge_type = 2;
	        }
	        if(accepted_count >= 400) {
	            badge_type = 1;
	        }
                    accepted.tag_stats[accepted.tag_stats.length] = [tag_name, accepted_count, badge_type, total_count];
                    update_answer_tags(accepted);
                }
            }

            curr = $('.user-stats-table:eq(3)');

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

            $(function(){
                var se = new SerialAjaxExecuter( function( results ) {
                    console.log( results );
                }, 2000 );

                for (var page_count=0; page_count < post_tags.length; page_count++) {
                    var current_tag = post_tags[page_count].toString().split("[")[1].split("]")[0];
                    var tag_count = $("a[href*='["+current_tag+"]']", curr).next();

                    if(tag_count.html().length > 0) {
                        tag_count = tag_count.html().substring(7);

                        if(tag_count >= threshold) {
                            (function delay_tranche() {
                                var tag_name = current_tag;

                                se.addRequest( $.get, get_search_text(user_id, page_size, true, 1, tag_name),
                                    {n:page_count},
                                    function(data){first_callback(data, get_accepted, true, tag_name)}, "html" );
                            })();
                        }
                    }
                }

                //remove the progress marker
                //TODO how to do this without a request?
                se.addRequest( $.get, "/search?q=user%3A"+user_id+"&pagesize="+page_size, function(data){
                    var unread = $('.accepted_badges_summary:last');
                    unread.html('');
                }, "html" );


                se.execute();
            });
        }

        load_answers();
    }
})();
