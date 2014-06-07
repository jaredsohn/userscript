// ==UserScript==
// @name        reddit.com - Mod tools
// @description Yo I stole this and deleted all the crap with the reasons popup.
// @namespace   v5
// @include     http://www.reddit.com/*
// @run-at document-start
// ==/UserScript==
function modtools() {

    var notEnabled = [''];

    
    // Add modtools buttons to page...
    function addModtools(){
        var numberRX = /-?\d+/,
            reportsThreshold = ( localStorage.getItem('reports-threshold') || 1 ),
            listingOrder     = ( localStorage.getItem('reports-order' )    || 'age' ),
            sortAscending    = ( localStorage.getItem('reports-ascending') == 'true' ),
            viewingspam      = !!location.pathname.match(/\/about\/(spam|trials)/),
            viewingreports   = !!location.pathname.match(/\/about\/reports/),
            allSelected      = false;
        if( viewingspam && listingOrder == 'reports' ) listingOrder = 'age';

        // Get rid of promoted links & thing rankings
        $('#siteTable_promoted,#siteTable_organic,.rank').remove();

        //remove stuff we cant moderate.
        $('.thing .report-button').parents('.thing').remove();
        $('.modtools-on').parent().remove();

        // Make visible any collapsed things (stuff below /prefs/ threshold)
        $('.entry .collapsed:visible a.expand:contains("[+]")').click();

        // Add checkboxes, tabs, menu, etc
        $('#siteTable').before('\
            <div class="menuarea modtools" style="padding: 5px 0;margin: 5px 0;"> \
                <input style="margin:5px;float:left" title="Select all/none" type="checkbox" id="select-all" title="select all/none"/> \
                <span>\
                    <a href="javascript:;" class="pretty-button invert inoffensive" accesskey="I" title="invert selection">&lt;/&gt;</a> \
                    <a href="javascript:;" class="pretty-button open-expandos inoffensive" title="toggle all expando boxes">[+]</a> \
                    <div onmouseover="hover_open_menu(this)" onclick="open_menu(this)" class="dropdown lightdrop "> \
                        <a href="javascript:;" class="pretty-button inoffensive select"> [select...]</a> \
                    </div>\
                    <div class="drop-choices lightdrop select-options"> \
                        '+(viewingreports?'':'<a class="choice inoffensive" href="javascript:;" type="banned">shadow-banned</a>\
                        <a class="choice inoffensive" href="javascript:;" type="filtered">spam-filtered</a>\
                        '+(viewingspam?'':'<a class="choice inoffensive" href="javascript:;" type="reported">has-reports</a>'))+'\
                        <a class="choice dashed" href="javascript:;" type="spammed">[ spammed ]</a> \
                        <a class="choice" href="javascript:;" type="removed">[ removed ]</a> \
                        <a class="choice" href="javascript:;" type="approved">[ approved ]</a>\
                        '+(reddit.post_site&&false?'<a class="choice" href="javascript:;" type="flaired">[ flaired ]</a>':'')+'\
                        <a class="choice" href="javascript:;" type="actioned">[ actioned ]</a>\
                        <a class="choice dashed" href="javascript:;" type="domain">domain...</a> \
                        <a class="choice" href="javascript:;" type="user">user...</a> \
                        <a class="choice" href="javascript:;" type="title">title...</a> \
                        <a class="choice dashed" href="javascript:;" type="comments">all comments</a> \
                        <a class="choice" href="javascript:;" type="links">all submissions</a> \
                        <a class="choice dashed" href="javascript:;" type="self">self posts</a> \
                        <a class="choice" href="javascript:;" type="flair">posts with flair</a> \
                    </div>\
                    &nbsp; \
                    <a href="javascript:;" class="pretty-button inoffensive unhide-selected" accesskey="U">unhide&nbsp;all</a> \
                    <a href="javascript:;" class="pretty-button inoffensive hide-selected"   accesskey="H">hide&nbsp;selected</a> \
                    <a href="javascript:;" class="pretty-button action negative" accesskey="S" type="negative" tabindex="3">spam&nbsp;selected</a> \
                    <a href="javascript:;" class="pretty-button action neutral"  accesskey="R" type="neutral"  tabindex="4">remove&nbsp;selected</a> \
                    <a href="javascript:;" class="pretty-button action positive" accesskey="A" type="positive" tabindex="5">approve&nbsp;selected</a> \
                    '+(reddit.post_site&&false?'<a href="javascript:;" class="pretty-button flair-selected inoffensive" accesskey="F" tabindex="6">flair&nbsp;selected</a>':'')+' \
                </span> \
                <span class="dropdown-title lightdrop" style="float:right"> sort: \
                    <div onmouseover="hover_open_menu(this)" onclick="open_menu(this)" class="dropdown lightdrop "> \
                        <span class="selected sortorder">'+listingOrder+'</span> \
                    </div> \
                    <div class="drop-choices lightdrop sortorder-options"> \
                            <a class="choice" href="javascript:;">age</a> \
                            '+ (viewingspam?'':'<a class="choice" href="javascript:;">reports</a>')+ ' \
                            <a class="choice" href="javascript:;">score</a> \
                    </div> \
                </span> \
            </div>'
        );

        $('#header-bottom-left').append( '<ul class="tabmenu ">'+(viewingspam?'':'<li><a><label for="modtab-threshold">threshold: </label><input id="modtab-threshold" value="'+reportsThreshold+'" style="width:10px;height:14px;border:none;background-color:#EFF7FF"/></a></li>')+'</ul>' );
        $('.thing.link, .thing.comment').prepend('<input type="checkbox" tabindex="1" style="margin:5px;float:left;" />');
        $('.buttons .pretty-button').attr('tabindex','2');

        // Add context & history stuff
        $('body').append('<div class="pretty-button inline-content" style="z-index:9999;display:none;position:absolute;line-height:12px;min-width:100px"/>');
        $('#siteTable .comment .flat-list.buttons:has( a:contains("parent"))').each(function(){$(this).prepend('<li><a class="context" href="'+$(this).find('.first .bylink').attr('href')+'?context=2">context</a></li>')});


        // Button actions

        // Select thing when clicked
        var noAction = ['A','INPUT','TEXTAREA','BUTTON']
        $('.thing .entry').live('click',function(e){
            if( noAction.indexOf( e.target.nodeName )+1 ) return;
            $(this).thing().find('input[type=checkbox]:first').click();
        })

        // Change sort order
        $('.sortorder-options a').click(function(){
            var order       = $(this).text(),
                toggleAsc   = ( order == $('.sortorder').text() );

            if( toggleAsc ) sortAscending = !sortAscending;

            localStorage.setItem( 'reports-ascending', sortAscending );
            localStorage.setItem( 'reports-order', order );

            $('.sortorder').text( order );
            sortThings( order, sortAscending );
        });

        // Invert all the things.
        $('.invert').click( function(){ $('.thing:visible input[type=checkbox]').click() })

        // Select / unselect all the things
        $('#select-all').click( function(){ $('.thing:visible input[type=checkbox]').attr('checked', allSelected = this.checked) });
        $('.thing input[type=checkbox]').live('click', function(){ $('#select-all' ).attr('checked', allSelected = !$('.thing:visible input[type=checkbox]').not(':checked').length ) });

        // Select/unselect certain things
        $('.select-options a').click(function(){
            var things = $('.thing:visible'),
                selector;

            switch( this.type ){
                case 'banned':   selector='.banned-user';break
                case 'filtered': selector='.spam:not(.banned-user)';break
                case 'reported': selector=':has(.reported-stamp)';break
                case 'spammed':  selector='.spammed,:has(.pretty-button.negative.pressed),:has(.remove-button:contains(spammed))';break
                case 'removed':  selector='.removed,:has(.pretty-button.neutral.pressed),:has(.remove-button:contains(removed))';break
                case 'approved': selector='.approved,:has(.approval-checkmark,.pretty-button.positive.pressed),:has(.approve-button:contains(approved))';break
                case 'flaired':  selector='.flaired';break
                case 'actioned': selector='.flaired,.approved,.removed,.spammed,:has(.approval-checkmark,.pretty-button.pressed),\
                                    :has(.remove-button:contains(spammed)),:has(.remove-button:contains(removed)),:has(.approve-button:contains(approved))';break
                case 'domain':   selector=':has(.domain:contains('+prompt('domain contains:','').toLowerCase()+'))';break
                case 'user':     selector=':has(.author:contains('+prompt('username contains:\n(case sensitive)','')+'))';break
                case 'title':    selector=':has(a.title:contains('+prompt('title contains:\n(case sensitive)','')+'))';break
                case 'comments': selector='.comment';break
                case 'links':    selector='.link';break
                case 'self':     selector='.self';break
                case 'flair':    selector=':has(.linkflair)';break
            };
            things.filter(selector).find('input[type=checkbox]').attr('checked',true)
        });
        $('.hide-selected'   ).click( function(){$('.thing:visible:has(input:checked)').hide()});
        $('.unhide-selected' ).click( function(){$('.thing').show()});

        // Mass spam/remove/approve
        $('.pretty-button.action').click( function(){
            var spam    = (this.type=='negative'),
                type    = (this.type=='positive'?'approve':'remove');

            // Apply action
            $('.thing:visible>input:checked').parent()
                .each(function(){ $.post('/api/'+type,{uh:reddit.modhash,spam:spam,id:$(this).thing_id()}) })
                .css('opacity','1')
                .removeClass('flaired spammed removed approved')
                .addClass((spam?'spamme':type)+'d')
        });

        // menuarea pretty-button feedback.
        $('.menuarea.modtools .pretty-button').click( function(){
            $(this).clearQueue().addClass('pressed').delay(200).queue( function(){ $(this).removeClass('pressed') } );
        });

        // Set reports threshold (hide reports with less than X reports)
        $('#modtab-threshold').keypress(function(e){
            e.preventDefault();

            var threshold = +String.fromCharCode( e.which );
            if( isNaN( threshold ) ) return;

            $(this).val( threshold );
            localStorage.setItem( 'reports-threshold', threshold );
            setThreshold( $('.thing') );
        });
        function setThreshold(things){
            var threshold = localStorage.getItem( 'reports-threshold');
            things.show().find('.reported-stamp').text(function(_,str){if( str.match(/\d+/)<threshold) $(this).thing().hide() });
        };setThreshold( $('.thing') );

        // Function to sort items
        function sortThings( order,asc ){
            var things = $('#siteTable .thing').sort(function(a,b){
                (asc)?(A=a,B=b):(A=b,B=a);

                switch( order )
                {
                case 'age':
                    var timeA = new Date( $(A).find('time:first').attr('datetime') ).getTime(),
                        timeB = new Date( $(B).find('time:first').attr('datetime') ).getTime();
                    return timeA - timeB;
                case 'score':
                    var scoreA = $(A).find('.score:visible' ).text().match( numberRX ),
                        scoreB = $(B).find('.score:visible' ).text().match( numberRX );
                    return scoreA - scoreB;
                case 'reports':
                    var reportsA = $(A).find('.reported-stamp').text().match( numberRX ),
                        reportsB = $(B).find('.reported-stamp').text().match( numberRX );
                    return reportsA - reportsB;
                };
            });
            $('#siteTable').empty().append( things );
        };
        sortThings( listingOrder, sortAscending );

        // Toggle all expando boxes
        var expandosOpen = false;
        $('.open-expandos').toggle(
            function(){
                $('.open-expandos').text( '[-]');
                $('.expando-button.collapsed').click();
                expandosOpen=true;
            },
            function(){
                $('.open-expandos').text( '[+]');
                $('.expando-button.expanded').click();
                expandosOpen=false;
            }
        )

        // Open inline context
        $('.inline-content').click(function(e){ e.stopPropagation() });
        $('a.context').live('click', function(e){
            $('html').one( 'click', function(){ $('.inline-content').hide() });
            $('.inline-content').show().offset($(this).offset()).text('loading...').load( this.href+'&limit=5 .sitetable.nestedlisting' );
            return false;
        });

        // Add 'history button to all users
        function addUserHistoryLink(){
            var userhistory = '<a href="javascript:;" class="user-history-button" title="view user history" target="_blank">H</a>'
            if( this.firstChild ) return $(this).find('a:last').append(','+userhistory);
            $(this).append('['+userhistory+']');
        };
        $('.thing .entry .userattrs').each( addUserHistoryLink )

        // Add callbacks for flowwit script
        window.flowwit = window.flowwit || [];
        window.flowwit.push( function( things ){

            things.prepend('<input type="checkbox" tabindex="2" style="margin:5px;float:left;"'+( allSelected ?' checked':'' )+' />')
                .find('.collapsed:visible a.expand:contains("[+]")').click().end()
                .find('.userattrs').each( addUserHistoryLink )
                .filter('.comment').find('.flat-list.buttons:has( a:contains("parent"))').each(function(){
                    $(this).prepend('<li><a class="context" href="'+$(this).find('.first .bylink').attr('href')+'?context=2">context</a></li>')
                });
            if( expandosOpen ) things.find('.expando-button.collapsed').click();
            if( !viewingspam ) setThreshold( things );
        });

        // Remove rate limit for expandos,removing,approving
        var rate_limit = window.rate_limit;window.rate_limit=function(action){if(action=='expando'||action=='remove'||action=='approve')return!1;return rate_limit(action)};


        //User history button pressed
        var gettingUserdata = false;
        $('.user-history-button').live('click',function(){
            $('html').one( 'click', function(){ $('.inline-content').hide(); gettingUserdata=false });
            gettingUserdata = true;

            var author = $(this).parents('.tagline').find('.author').text(),
                commentbody = '',
                contentBox = $('.inline-content')
                    .show().offset($(this).offset())
                    .html('<div class="user-history"><a href="/user/'+author+'" target="_blank">'+author+'</a> <span class="karma" /> <a class="rts-report" href="javascript:;" data-commentbody="">Submit to RTS</a><div><br /><b>Submission history:</b></div><div class="table domain-table"><table><thead><tr><th>domain submitted from</th><th>count</th><th>ups</th><th>downs</th><th>score</th><th>%</th></tr></thead><tbody><tr><td colspan="6" class="error">loading...</td></tr></tbody></table></div><div class="table subreddit-table"><table><thead><tr><th>subreddit submitted to</th><th>count</th><th>ups</th><th>downs</th><th>score</th><th>%</th></tr></thead><tbody><tr><td colspan="6" class="error">loading...</td></tr></tbody></table></div></div>'),

                domains    = {}, domainslist   = [], domaintable    = contentBox.find('.domain-table tbody'),
                subreddits = {}, subredditlist = [], subreddittable = contentBox.find('.subreddit-table tbody');

            // Show user's karma
            $.get( '/user/'+author+'/about.json').success(function(d){ contentBox.find('.karma').text('('+d.data.link_karma+' | '+d.data.comment_karma+')') });

            // Get user's domain & subreddit submission history
            (function populateHistory( after ){
                $.get( '/user/'+author+'/submitted.json?limit=100&after='+ ( after||'' ) )
                    .error(function(){contentBox.find('.error').html('unable to load userdata</br>shadowbanned?')})
                    .success(function(d){

                        if( !gettingUserdata )return;
                        if( !d.data.children.length ) return contentBox.find('.error').html('no submissions');

                        var after = d.data.after,
                            commentbody = 'Recent Submission history for '+author+':\n\ndomain submitted from|count|ups|downs|score|%\n:-|-:|-:|-:|-:|-:';

                        for( i in d.data.children ){
                            var data = d.data.children[i].data;

                            if( !domains[data.domain] ){
                                domains[data.domain] ={ups:0,downs:0,score:0,count:0};
                                domainslist.push( data.domain );
                            };

                            domains[data.domain].ups += data.ups;
                            domains[data.domain].downs += data.downs;
                            domains[data.domain].score += data.score;
                            domains[data.domain].count++;

                            if( !subreddits[data.subreddit] ){
                                subreddits[data.subreddit] ={ups:0,downs:0,score:0,count:0};
                                subredditlist.push( data.subreddit );
                            };
                            subreddits[data.subreddit].ups += data.ups;
                            subreddits[data.subreddit].downs += data.downs;
                            subreddits[data.subreddit].score += data.score;
                            subreddits[data.subreddit].count++;
                        }

                        domainslist.sort(function(a,b){ return domains[b].count - domains[a].count });
                        domaintable.empty();

                        for( i in domainslist ){
                            var dom=domainslist[i], n=domains[dom].count, u=domains[dom].ups, d=domains[dom].downs, s=domains[dom].score, 
                                url = '/search?q=%28and+site%3A%27'+dom+'%27+author%3A%27'+author+'%27+is_self%3A0+%29&restrict_sr=off&sort=new',
                                match = dom.match(/^self.(\w+)$/);

                            if( match ) url = '/r/'+match[1]+'/search?q=%28and+author%3A%27'+author+'%27+is_self%3A1+%29&restrict_sr=on&sort=new'
                            domaintable.append( '<tr><td><a target="_blank" href="'+url+'" title="view links '+author+' recently submitted from \''+dom+'\'">'+dom+'</a></td><td>'+n+'</td><td>'+u+'</td><td>'+d+'</td><td>'+s+'</td><td>'+Math.round(u/(u+d)*100)+'%</td></tr>' );

                            if( i<20 ) commentbody += '\n['+dom+']('+url+')|'+n+'|'+u+'|'+d+'|'+s+'|'+Math.round(u/(u+d)*100)+'%';
                        }
                        if( i >= 20 ) commentbody += '\n\n_^...and ^'+(domainslist.length-20)+' ^more_';

                        commentbody += '\n\nsubreddit submitted to|count|ups|downs|score|%\n:-|-:|-:|-:|-:|-:';

                        subredditlist.sort(function(a,b){ return subreddits[b].count - subreddits[a].count });
                        subreddittable.empty();
                        for( i in subredditlist ){
                            var sr=subredditlist[i], n=subreddits[sr].count, u=subreddits[sr].ups, d=subreddits[sr].downs, s=subreddits[sr].score,
                                url = '/r/'+sr+'/search?q=author%3A%27'+author+'%27&restrict_sr=on&sort=new';

                            subreddittable.append( '<tr><td><a target="_blank" href="'+url+'" title="view links '+author+' recently submitted to /r/'+sr+'/">'+sr+'</a></td><td>'+n+'</td><td>'+u+'</td><td>'+d+'</td><td>'+s+'</td><td>'+Math.round(u/(u+d)*100)+'%</td></tr>' );

                            if( i<20 ) commentbody += '\n['+sr+']('+url+')|'+n+'|'+u+'|'+d+'|'+s+'|'+Math.round(u/(u+d)*100)+'%';
                        }
                        if( i >= 20 ) commentbody+='\n\n_^...and ^'+(subredditlist.length-20)+' ^more_';

                        $('.rts-report')
                            .attr('data-commentbody',commentbody)
                            .attr('data-author',author);

                        if( after ) populateHistory( after );
                        else gettingUserdata = false;
                    })
            })();
            return false;
        })

        // RTS button pressed
        $('.inline-content').delegate('.rts-report','click',function(){
            var rtsLink = this,
                author = rtsLink.getAttribute('data-author'),
                commentbody = rtsLink.getAttribute('data-commentbody');

            rtsLink.textContent='submitting...';
            rtsLink.className = '.rts-report-clicked';

            //Submit to RTS
            $.post('/api/submit',{uh:reddit.modhash,title:'Overview for '+author,kind:'link',url:'http://www.reddit.com/user/'+author,sr:'reportthespammers',api_type:'json'})
                .error(function(){rtsLink.innerHTML='<span class="error" style="font-size:x-small">an error occured</error>'})
                .success(function(submission){
                    if( submission.json.errors.length ){
                        rtsLink.innerHTML = '<span class="error" style="font-size:x-small">'+submission.json.errors[0][1]+'</error>';
                        if( submission.json.errors[0][0] == 'ALREADY_SUB' ) rtsLink.href = 'http://www.reddit.com/r/reportthespammers/search?q=http%3A%2F%2Fwww.reddit.com%2Fuser%2F'+author+'&restrict_sr=on';
                        return;
                    }

                    // Post stats as a comment.
                    if( !commentbody.length ) return;
                    $.post('/api/comment',{uh:reddit.modhash,thing_id:submission.json.data.name,text:commentbody,api_type:'json'})
                        .error(function(e){rtsLink.innerHTML='<span class="error" style="font-size:x-small">an error occured</error>'})
                        .success(function(comment){
                            if( comment.json.errors.length ) return rtsLink.innerHTML = '<span class="error" style="font-size:x-small">'+comment.json.errors[1]+'</error>';
                            rtsLink.textContent = 'reported';
                            rtsLink.href = submission.json.data.url;
                            rtsLink.className = '';
                        });
                })

        });
    }

    // Add mod tools or mod tools toggle button if applicable
    if( location.pathname.match(/\/about\/(?:reports|modqueue|spam|trials)\/?/) ) addModtools()
    if( ( $('body').hasClass('listing-page') || $('body').hasClass('comments-page') ) && ( !reddit.post_site || $('body.moderator').length ) )
        $('<li><a href="javascript:;" accesskey="M" class="modtools-on">modtools</a></li>').appendTo('.tabmenu').click(addModtools);

    // Check if we're viewing a subreddit's reports/spam/modqueue page
    if( location.pathname.match(/^\/r\/\w+\/about\/(?:reports|modqueue|spam)\/?$/) ){
        // Reset the modqueue cache timer for this sr
        var subdata=JSON.parse(localStorage.getItem('mq-'+reddit.logged+'-'+reddit.post_site) )||[0,0];
        localStorage.setItem('mq-'+reddit.logged+'-'+reddit.post_site,'['+subdata[0]+','+0+']');
    }

    // Check if we're viewing an /r/mod/ fakereddit page
    if( location.pathname.match(/^\/r\/mod/) ){
        var now = new Date().valueOf(),
            subs = {},
            delay=0;

        // Update modqueue items count
        var modSubs = []
        $('.subscription-box a.title').each(function(){
            var elem = $(this),
                sr = elem.text(),
                data = JSON.parse( localStorage.getItem('mq-'+reddit.logged+'-'+sr) )||[0,0];
            modSubs.push(sr);

            // Update count and re-cache data if more than an hour old.
            elem.parent().append('<a href="/r/'+sr+'/about/modqueue" count="'+data[0]+'">'+data[0]+'</a>')
            if( now > data[1] + 3600000 ) setTimeout(updateModqueueCount.bind(null, sr),delay+=500);
        });
        localStorage.setItem('mod-'+reddit.logged, JSON.stringify( modSubs ) )

        function sortSubreddits(){
            var subs = $('.subscription-box li').sort(function(a,b){return b.lastChild.textContent-a.lastChild.textContent||(+( a.firstChild.nextSibling.textContent.toLowerCase() > b.firstChild.nextSibling.textContent.toLowerCase()))||-1});
            $('.subscription-box').empty().append(subs);
        };sortSubreddits();

        function updateModqueueCount(sr){
            $.get('/r/'+sr+'/about/modqueue.json?limit=100').success( function(d){
                localStorage.setItem('mq-'+reddit.logged+'-'+sr, '['+d.data.children.length+','+ new Date().valueOf()+']' );
                $('.subscription-box a[href$="/r/'+sr+'/about/modqueue"]').text( d.data.children.length ).attr('count',d.data.children.length)
                sortSubreddits();
            });
        }
    }
}

// Add script to the page
document.addEventListener('DOMContentLoaded',function(e){var s=document.createElement('script');s.textContent="("+modtools.toString()+')();';document.head.appendChild(s)});

// Add CSS
(function addcss(){
    if( !document.head ) return setTimeout( addcss );

    // Add to all pages
    var css = '\
        .reason-popup { max-width:500px;padding:10px 15px;background-color: #FAFAFA;border: 1px solid #369;-moz-border-radius: 7px;-webkit-border-radius: 7px;border-radius: 7px;position:absolute;z-index:10000} \
        .reason-popup .right{ float:right }\
        .reason-popup .status{ display:none; }\
        .reason-popup input,.reason-popup select,.reason-popup textarea{ font-size:x-small;border:1px solid #ccc;background-color:#fafafa }\
        .reason-popup textarea{ min-width:400px}\
        .reason-popup tbody tr{ vertical-align:top; border-bottom:1px solid gray;display:block;padding:5px }\
        .reason-popup th{ padding-right:10px }\
        .reason-popup .buttons{ padding-top:10px }\
        \
        .choice.dashed{border-top:1px dashed}\
        .thing.approved{background-color:paleGreen}\
        .thing.removed{background-color:lightgray}\
        .thing.spammed{background-color:Tomato}\
        .thing.flaired{background-color:PaleTurquoise}\
        .pretty-button.inoffensive{background-position:0 -240px;background-image:url(http://www.redditstatic.com/sprite-reddit.rQ7y8qN-wzQ.png);background-repeat:repeat;}\
        .pretty-button.inoffensive.pressed{background-position:0 -200px!important}\
        .thing+input[type="checkbox"]:focus{outline:blue solid 1px}\
        \
        .user-history{ padding:10px }\
        .user-history td{ border:1px dotted lightgray;border-bottom:none }\
        .user-history th{ border:1px solid lightgray;border-top:none;font-weight:bold }\
        .user-history th,.user-history td{ padding:5px; border-right:none }\
        .user-history table{ width:100% }\
        .user-history .table{ margin:10px; max-height: 300px;overflow-x: hidden;overflow-y: scroll;border-bottom: 1px dotted lightgray;border-top: 1px solid lightgray; }\
        .user-history .table .error{ text-align:center }\
        .rts-report,.rts-report-clicked{ font-weight:bold;font-size:x-small; float:right }';

    // Add to mod pages only
    if( location.pathname.match(/(^\/r\/mod\/)|(\/about\/(?:reports|modqueue|spam))/) )
        css+='\
            .subscription-box .option.active{font-size:0;display:inline-block!important;width:10px;height:10px;padding:2px}\
            .subscription-box .option.add{background-color:#7BB850;background-position:3px 3px;background-repeat: no-repeat;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAHCAIAAABV+fA3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABrSURBVBhXY6zeEcAAATwx+dYW147m7P4CFWD6/58BjoAAmcvEyPgfhkByjIz/4CIMVYfXvPqPCZ7sPxzAWLnVH6QeCHhiC+0srh7K2vUFbALIvr//oAhsIUgPTISJ4R8DFP0FKwaSEO4/BgA35Fw9UX68TAAAAABJRU5ErkJggg==")}\
            .subscription-box .option.remove{background-color:#C85F63;background-position:3px 5px;background-repeat: no-repeat;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAACCAIAAAAb/VE3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAdSURBVBhXYzyXmMoABoxg8j+YZDg/8/x/NPB8KwA1RRZZO8v/6AAAAABJRU5ErkJggg==")}\
            .subscription-box ul{clear:both}\
            .subscription-box li {margin-bottom:2px}\
            .subscription-box li a:last-child{float:right}\
            .subscription-box li a[count="100"]:after{content:"+"}\
            .thing{overflow:hidden;margin-left:0!important;padding-left:0px!important}\
            .midcol{margin-left:0!important;width:auto!important}\
            ,a.pretty-button:focus{box-shadow: 0 0 5px rgba(0,0,255,1);-webkit-box-shadow: 0 0 5px rgba(0,0,255,1);-moz-box-shadow: 0 0 5px rgba(0,0,255,1)}\
            .thing{margin-bottom:0;padding:4px 0}';

    s=document.createElement('style');s.type="text/css";s.textContent=css;document.head.appendChild(s);
})();