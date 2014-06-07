// ==UserScript==
// @name           reddit.com - Link subscriber / New comment highlighter
// @namespace      v2
// @include        *.reddit.com/*
// @run-at document-start
// ==/UserScript==

// Cheeky redirect code
var u=localStorage.getItem('logged-user');
if(u){
    subscribed = localStorage.getItem('subscribed-'+u);
    subscribed = subscribed?subscribed.split(','):[];
    if( location.pathname == '/subscribed/') if( subscribed.length ) location.href = '/by_id/t3_'+subscribed.join(',t3_')+'#subscribed'; else document.title = "Subscribed links";
    if( location.hash == '#subscribed' ){ history.replaceState({}, "Subscribed links", "/subscribed/");document.title = "Subscribed links"}
}

// Main script
function main(){
    localStorage.setItem('logged-user',reddit.logged);

    // Check subscriptions every 30 mins if there's no replies, update every hour if there are.
    var CheckInterval  = 30,
        UpdateInterval = 60,

        now           = new Date(),
        subscribed    = localStorage.getItem('subscribed-'+reddit.logged),
        commentspage  = $('body.comments-page').length,
        subspage      = location.pathname == '/subscribed/',
        newreplies    = JSON.parse( localStorage.getItem('subscribed-new-'+reddit.logged)||'[]' );

    subscribed = subscribed?subscribed.split(','):[];

    // Display new comment count and last visited time for each link
    function newComments( things ){
        things.each( function(){

            // Get saved data
            var t  = $(this),
                id = t.thing_id().substring(3),
                d  = localStorage.getItem( 'cc-'+ id ),
                subbed = subscribed.indexOf(id)+1,
                newIdx = newreplies.indexOf(id);

            //Add 'subscribe' button.
            if( subbed || commentspage || subspage ) t.find('.flat-list.buttons').append('<li><a class="subscribe '+(subbed?'yes':'no')+'" href="javascript:;">subscribe</a></li>')

            if( !d ) return;
            d = d.split(',');

            // Get current data
            var ts = t.find('time'), c = t.find('a.comments'), n = c.text().match(/\d+/)||0;

            // Add last visited time & new comment count
            ts.attr('title',ts.attr('title')+'\nLast Visited '+timeago( now-new Date(parseInt(d[0])))+' ago' );
            if( n <= d[1] ) return;
            c.append(' <span class="newcomments" title="'+(n-d[1])+' new comments since last visit">('+(n-d[1])+' new)</span>' );
            t.attr('data-newcomments',n-d[1]);

            // If we're subscribed and there are new comments, update the list of links with new comments
            if( subbed && newIdx==-1 ){
                newreplies.push(id);
                localStorage.setItem('subscribed-new-'+reddit.logged, JSON.stringify( newreplies ) );
            }

        })
    };
    newComments( $('.thing.link') );

   	// Add callback for flowwit script
    window.flowwit = window.flowwit||[];window.flowwit.push( newComments );

    // Update comment count if viewing a comments page
    if( commentspage ){

        var thing  = $('#siteTable .thing'),
            id     = thing.thing_id().substring(3),
            data   = localStorage.getItem('cc-'+id),
            count  = thing.find('a.comments').text().match(/\d+/)||0,
            subbed = subscribed.indexOf(id)+1,
            newIdx = newreplies.indexOf(id);

        saveCommentCount(id,count);

        // If we've been here before, highlight any new comments made since our last visit.
        if(data){ data=data.split(',');$('.thing.comment .noncollapsed time').each(function(){if(Date.parse($(this).attr('datetime'))>data[0]) $(this).thing().css('background-color','#FFFDCC')}) }

        // If we're subscribed, remove this thing from our list of links with new comments
        if( subbed && newIdx!=-1 ){ newreplies.splice(newIdx,1); localStorage.setItem('subscribed-new-'+reddit.logged, JSON.stringify( newreplies ) ) }
    }

    // Viewing our link subscriptions page
    else if( subspage ){

        // Fake a proper reddit page if no items...
        if( !$('body>.side').length ){
            $('#header').after('<div class="side"><div class="spacer"><form action="http://www.reddit.com/search" id="search"><input type="text" name="q" placeholder="search reddit"><div id="searchexpando" class="infobar"><div id="moresearchinfo"><a href="#" id="search_hidemore">[-]</a><p>use the following search parameters to narrow your results:</p><dl><dt>reddit:{name}</dt><dd>find things posted in {name} only</dd><dt>author:{username}</dt><dd>return things submitted by {username} only</dd><dt>site:{domain}</dt><dd>get links to pages on {domain} only</dd><dt>url:{text}</dt><dd>search for {text} in url</dd><dt>selftext:{text}</dt><dd>search for {text} in self post contents</dd><dt>is_self:{yes|no}</dt><dd>include or exclude self posts</dd><dt>over18:{yes|no}</dt><dd>include or exclude results from nsfw reddits</dd></dl><p>e.g.<code>reddit:pics site:imgur.com dog</code></p><p><a href="http://www.reddit.com/help/search">see the search faq for details.</a></p></div><p><a href="http://www.reddit.com/help/search" id="search_showmore">advanced search: by author, community...</a></p></div></form></div><div class="spacer"></div><div class="spacer"><div class="sidebox submit"><div class="morelink"><a href="http://www.reddit.com/submit" class="login-required">Submit a link</a><div class="nub"></div></div><div class="spacer"><a href="http://www.reddit.com/submit" class="login-required"></a><div class="subtitle">to anything interesting: news article, blog entry, video, picture...</div></div></div></div><div class="spacer"><div class="sidebox create"><div class="morelink"><a href="http://www.reddit.com/reddits/create" class="login-required">Create your own community</a><div class="nub"></div></div><div class="spacer"><a href="http://www.reddit.com/reddits/create" class="login-required"></a><div class="subtitle">...for your favourite tea.</div><div class="subtitle">...for your classroom.</div></div></div></div><div class="spacer"><div class="account-activity-box"><p><a href="/account-activity">account activity</a></p></div></div></div>');
            $('#header-bottom-left').append('<ul class="tabmenu "><li><a href="http://www.reddit.com/">hot</a></li><li><a href="http://www.reddit.com/new/">new</a></li><li><a href="http://www.reddit.com/controversial/">controversial</a></li><li><a href="http://www.reddit.com/top/">top</a></li><li><a href="http://www.reddit.com/saved/">saved</a></li><li><a href="http://www.reddit.com/promoted/">self-serve advertising</a></li></ul>');
            $('.pagename').text('Subscribed Links');
        }else $('.tabmenu').before('<span class="pagename selected">Subscribed Links</span>');

        // Add sort order menu
        var order = localStorage.getItem('subscribed-sort-'+reddit.logged)||'new replies';
        $('body>.content').prepend('\
            <div class="menuarea">\
                <div class="spacer">\
                    <span class="dropdown-title lightdrop ">sorted by: </span>\
                    <div class="dropdown lightdrop " onclick="open_menu(this)" onmouseover="hover_open_menu(this)">\
                        <span class="selected">'+order+'</span>\
                    </div>\
                    <div class="drop-choices lightdrop ">\
                        <a href="javascript:;" class="choice ">new replies</a>\
                        <a href="javascript:;" class="choice ">replies</a>\
                        <a href="javascript:;" class="choice ">score</a>\
                        <a href="javascript:;" class="choice ">new</a>\
                        <a href="javascript:;" class="choice ">old</a>\
                    </div>\
                </div>\
                <a id="clear-newcomments" href="javascript:;" title="Clear new comment counts">[ reset ]</a>\
            </div>');

        // Update count of links with new comments
        newreplies=[];$('#siteTable .thing[data-newcomments]').attr('data-fullname',function(_,id){newreplies.push(id.slice(3))})
        localStorage.setItem('subscribed-new-'+reddit.logged, JSON.stringify(newreplies) );
        localStorage.setItem('subscribed-ts-'+reddit.logged, now.getTime())

        // Menuarea sort order changed.
        $('.menuarea .choice').click(function(){
            var order = this.textContent;
            $('.menuarea .dropdown .selected').text( order );
            localStorage.setItem('subscribed-sort-'+reddit.logged,order);
            sortThings( order );
        });

        // Function to sort items
        function sortThings( order ){
            var things = $('#siteTable .thing').sort(function(A,B){
                switch( order )
                {
                case 'new':
                    A = new Date( A.querySelector('time').getAttribute('datetime') );
                    B = new Date( B.querySelector('time').getAttribute('datetime') );
                    return B-A;
                case 'old':
                    A = new Date( A.querySelector('time').getAttribute('datetime') );
                    B = new Date( B.querySelector('time').getAttribute('datetime') );
                    return A-B;
                case 'score':
                    A = A.getAttribute('data-ups')-A.getAttribute('data-downs');
                    B = B.getAttribute('data-ups')-B.getAttribute('data-downs');
                    return B-A
                case 'replies':
                    A = A.querySelector('.comments').textContent.match(/\d+/)||0;
                    B = B.querySelector('.comments').textContent.match(/\d+/)||0;
                    return B-A;
                case 'new replies':
                    A = +A.getAttribute('data-newcomments')||0;
                    B = +B.getAttribute('data-newcomments')||0;

                    return B-A;
                };
            });
            $('#siteTable').empty().append( things );
        };
        // Do initial sort
        sortThings( order );

        // Clear subscribed threads new comment count
        $('#clear-newcomments').click(function(){
            $('#replies').removeClass('havemail').attr('title',subscribed.length?'View subscribed links':'No subscribed links');
            $('#siteTable .thing').each(function(){
                var thing = $(this).removeAttr('data-newcomments').find('.newcomments').remove().end(),
                    id    = thing.thing_id().slice(3),
                    count = +thing.find('a.comments').text().match(/\d+/);
                localStorage.setItem('cc-'+id, now.getTime()+','+count );
            })
        });
    }

    // Add new replies icon
    $('#mail').after('<span class="separator">|</span><a id="replies" class="'+(newreplies.length?'havemail':'')+'" title="'+(!subscribed.length?'No subscribed links':(newreplies.length?(newreplies.length+' subscribed link'+(newreplies.length==1?' has':'s have')+' new comments!'):'View subscribed links'))+'" href="/subscribed/"></a>');

    // Add auto subscribe checkbox to submit page.
    if( $('body.submit-page').length ){

        // Add checkbox to submit form
        $('form.submit button[name=submit]').after('<input type="checkbox" style="margin-left:10px" id="subscribe-checkbox"><label for="subscribe-checkbox" style="position:relative;top:-2px">subscribe</label>');

        // Capture ID of new submission if we want to subscribe to it.
        // TODO: Find a better way of doing this.
        $('body').ajaxComplete(function(_,XMLHttpRequest){
            var checkbox = $('#subscribe-checkbox')[0];
            if( !checkbox || !checkbox.checked ) return;
            var response = JSON.parse( XMLHttpRequest.responseText );

            // Make sure response is valid and refers to a new link being created.
            if( response.jquery && response.jquery[0] && response.jquery[0][3] && response.jquery[0][3][0]=='#newlink')
                if( response.jquery[12] && response.jquery[12][3] && response.jquery[12][3][0] ){
                    var match = response.jquery[12][3][0].match(/comments\/(\w+)\//);
                    if(!match) return;

                    subscribed.push(match[1]);
                    localStorage.setItem('subscribed-'+reddit.logged, subscribed.join(',') );
                };
        });
    }

    // 'subscribe' button clicked
    $('.flat-list.buttons .subscribe').live('click',function(){

        // Update list of subscribed things
        subscribed = localStorage.getItem('subscribed-'+reddit.logged);
        subscribed = subscribed?subscribed.split(','):[];

        var button = $(this),
            thing  = button.thing(),
            id     = thing.thing_id().substring(3),
            idx    = subscribed.indexOf(id),
            subbed = idx==-1,
            count  = thing.find('a.comments').text().match(/\d+/)||0;
        button.toggleClass('yes',subbed).toggleClass('no',!subbed);

        // Save data for this thing
        if( subbed ){ subscribed.push(id); saveCommentCount(id,count) }
        else{ subscribed.splice(idx,1); if( subspage ) thing.fadeOut(200) };
        subscribed.splice(0,subscribed.length-100);
        localStorage.setItem('subscribed-'+reddit.logged, subscribed.join(',') );

    });

    //Function to save number of comments for this thingID.
    function saveCommentCount(id,count){
        // Trim list to maximum 1000 links
        var list=(localStorage.getItem('cc-list')||id).split(',');
        while(list.length>1000)localStorage.removeItem('cc-'+list.shift());

        // Save data for this thingID
        if(list.indexOf(id)+1)list.push(id);
        localStorage.setItem('cc-'+id,now.getTime()+','+count);
        localStorage.setItem('cc-list',list.join());
    }

    // Simple fuzzy time function. Probably not 100% accurate, but near enough.
    function timeago( t ){var d={year:31556925960,month:2629743830,day:86400000,hour:3600000,minute:60000,second:1000},u;for(s in d)if((u=Math.floor(t/d[s]))>0)return u+' '+s+(u==1?'':'s');return t+' milliseconds'}

    
    // Last but not least, check subscriptions with API every X minutes
    if( !subscribed.length ) return localStorage.setItem('subscribed-new-'+reddit.logged,'');
    var oldtime  = +localStorage.getItem('subscribed-ts-'+reddit.logged),
        newtime  = now.getTime(),
        interval = 60000 * ( newreplies.length ? UpdateInterval : CheckInterval );
    if( oldtime + interval >  newtime ) return;

    // Reset timestamp
    localStorage.setItem('subscribed-ts-'+reddit.logged, newtime)

    // Check for new replies
    $.get('/by_id/t3_'+subscribed.join(',t3_')+'.json').success(function(d){
        var newreplies = [];
        for( i in d.data.children ){
            var newData   = d.data.children[i].data,
                savedData = (localStorage.getItem('cc-'+newData.id)||'0,0').split(',');
            if( newData.num_comments > savedData[1] ) newreplies.push(newData.id);
        }
        localStorage.setItem('subscribed-new-'+reddit.logged,JSON.stringify(newreplies) );
    });
}

// Add script to the main page scope
document.addEventListener('DOMContentLoaded',function(e){var script=document.createElement('script');script.textContent="("+main.toString()+')();';document.head.appendChild( script )});

// Add CSS as soon as the head element exists (prevents jumping).
(function css(){
    if(!document.head) return setTimeout(css);
    var s=document.createElement('style');s.textContent='\
        #replies{\
            background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAYAAACEYr13AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAB+SURBVDhP3ZHLDQAhCAUtb4u2hG3Fo2dWjI/gl+UqyVwIMzExpEzE0BNcvEVhrwbq0jvFmQOtbtJub3qBRFboUXt4EgD4HqYLDCKYAhoJbGTGDhxkRgIxRhddgBfeQaQLoG6B25tegMgKPXoPTwIrdGAUwa/ATmbMwElOmegD6OxZexjSQGUAAAAASUVORK5CYII=);\
            background-position:0 10px;\
            display:inline-block;\
            width:16px;\
            height:10px;\
            position: relative;\
            top:2px;\
        }\
        #replies.havemail{background-position:0 0}\
        .flat-list.buttons .subscribe.yes:before{content:"un"}\
        #clear-newcomments{float:right}\
        .newcomments{background-color:#FFFDCC}';

    if( location.pathname == '/subscribed/' )
        s.textContent+='p.error,img[alt="reddit is sad"]{display:none}';

    document.head.appendChild(s);
})();