	

    // ==UserScript==
    // @id             foolz-filter
    // @name           foolz-filter
    // @version        1.0
    // @namespace      foolz
    // @author         foolz
    // @description    this script hides posts that are posted by users in the filter list
    // @run-at         document-end
    // @include        *archive.foolz.us/foolz*
    // @include        *beta.foolz.us/foolz*
    // @include        *loveisover.me*
    // @include        *.thedarkcave.org*
    // @grant          none
    // ==/UserScript==
     
    (function() {
            var filterName = ['Noko'];
            var filterTrip = [];
     
            function isFiltered(filter, data)
            {
                    if (data !== '')
                    {
                            switch (filter)
                            {
                                    case 'trip':
                                            return (filterTrip.indexOf(data) == 0);
                                    default:
                                            return (filterName.indexOf(data) == 0);
                            }
                    }
     
                    return false;
            }
     
     
            function filterPosts()
            {
                    // get the <aside class="posts"> for each thread shown
                    var threads = document.getElementsByClassName('posts');
     
                    // process each <aside class="posts">
                    for (t = 0; t < threads.length; t++)
                    {
                            var replies = threads[t].getElementsByTagName('article');
     
                            // process all replies
                            for (p = replies.length - 1; p >= 0; p--)
                            {
                                var post = replies[p];
                                    var name = post.getElementsByClassName('post_author');
                                    var trip = post.getElementsByClassName('post_tripcode');
     
                                    // does name or trip match ones listed in filtered lists
                                    if ((name && isFiltered('name', name[0].textContent)) || (typeof trip[0] !== 'undefined' && isFiltered('trip', trip[0].textContent)))
                                    {
                                            // the post should be hidden so 'quoted by' doesn't glitch
                                            post.style.display = 'none';
                                    }
                            }
                    }
            }
     
            // filter upon loading dom content
            window.addEventListener("DOMContentLoaded", filterPosts, false);
     
            // filter ajax requests on dom node inserts
            window.addEventListener("DOMNodeInserted", filterPosts, false);
    })();
     
    // jQuery Alternative
    // jQuery('aside.posts span.post_author').filter(function() { return $(this).text() == '??'; }).closest('article').remove();
    // jQuery('aside.posts span.post_tripcode').filter(function() { return $(this).text() == '??'; }).closest('article').remove();
    (function() {
            var filterName = ['Lewd'];
            var filterTrip = [];
     
            function isFiltered(filter, data)
            {
                    if (data !== '')
                    {
                            switch (filter)
                            {
                                    case 'trip':
                                            return (filterTrip.indexOf(data) == 0);
                                    default:
                                            return (filterName.indexOf(data) == 0);
                            }
                    }
     
                    return false;
            }
     
     
            function filterPosts()
            {
                    // get the <aside class="posts"> for each thread shown
                    var threads = document.getElementsByClassName('posts');
     
                    // process each <aside class="posts">
                    for (t = 0; t < threads.length; t++)
                    {
                            var replies = threads[t].getElementsByTagName('article');
     
                            // process all replies
                            for (p = replies.length - 1; p >= 0; p--)
                            {
                                var post = replies[p];
                                    var name = post.getElementsByClassName('post_author');
                                    var trip = post.getElementsByClassName('post_tripcode');
     
                                    // does name or trip match ones listed in filtered lists
                                    if ((name && isFiltered('name', name[0].textContent)) || (typeof trip[0] !== 'undefined' && isFiltered('trip', trip[0].textContent)))
                                    {
                                            // the post should be hidden so 'quoted by' doesn't glitch
                                            post.style.display = 'none';
                                    }
                            }
                    }
            }
     
            // filter upon loading dom content
            window.addEventListener("DOMContentLoaded", filterPosts, false);
     
            // filter ajax requests on dom node inserts
            window.addEventListener("DOMNodeInserted", filterPosts, false);
    })();
     
    // jQuery Alternative
    // jQuery('aside.posts span.post_author').filter(function() { return $(this).text() == '??'; }).closest('article').remove();
    // jQuery('aside.posts span.post_tripcode').filter(function() { return $(this).text() == '??'; }).closest('article').remove();
    (function() {
            var filterName = ['Siztra'];
            var filterTrip = [];
     
            function isFiltered(filter, data)
            {
                    if (data !== '')
                    {
                            switch (filter)
                            {
                                    case 'trip':
                                            return (filterTrip.indexOf(data) == 0);
                                    default:
                                            return (filterName.indexOf(data) == 0);
                            }
                    }
     
                    return false;
            }
     
     
            function filterPosts()
            {
                    // get the <aside class="posts"> for each thread shown
                    var threads = document.getElementsByClassName('posts');
     
                    // process each <aside class="posts">
                    for (t = 0; t < threads.length; t++)
                    {
                            var replies = threads[t].getElementsByTagName('article');
     
                            // process all replies
                            for (p = replies.length - 1; p >= 0; p--)
                            {
                                var post = replies[p];
                                    var name = post.getElementsByClassName('post_author');
                                    var trip = post.getElementsByClassName('post_tripcode');
     
                                    // does name or trip match ones listed in filtered lists
                                    if ((name && isFiltered('name', name[0].textContent)) || (typeof trip[0] !== 'undefined' && isFiltered('trip', trip[0].textContent)))
                                    {
                                            // the post should be hidden so 'quoted by' doesn't glitch
                                            post.style.display = 'none';
                                    }
                            }
                    }
            }
     
            // filter upon loading dom content
            window.addEventListener("DOMContentLoaded", filterPosts, false);
     
            // filter ajax requests on dom node inserts
            window.addEventListener("DOMNodeInserted", filterPosts, false);
    })();
     
    // jQuery Alternative
    // jQuery('aside.posts span.post_author').filter(function() { return $(this).text() == '??'; }).closest('article').remove();
    // jQuery('aside.posts span.post_tripcode').filter(function() { return $(this).text() == '??'; }).closest('article').remove();

