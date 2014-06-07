// ==UserScript==
// @name          MySpace - Home Skin Switchup
// @namespace     http://userscripts.org/people/774
// @homepage      http://userscripts.org/scripts/show/12610
// @description   2008/04/03 - Switches around the NEW MySpace "Home Skin" to make better use of space. Adds "view all/mine" to Bulletins. Re-titles the page to show alerts. Plus more. Author: InsaneNinja
// @include       http://home.myspace.com/*fuseaction=user*
// @exclude       *fuseaction=user.*
// ==/UserScript==

if ($('col3'))
{
    ////////////////////////////////
    // Create script link-back
    //
        if (!$('GM_Script_Links')) { var gsl = document.createElement('p'); gsl.setAttribute('id','GM_Script_Links');
            if ($('col1')) $('col1').appendChild(gsl); GM_addStyle('#GM_Script_Links a {display:block;color:#CCC!important;}') }

        $('GM_Script_Links').innerHTML += '<a href="http://userscripts.org/scripts/show/12610">GM - Home Skin Switchup</a>';
    //
    // if ($('GM_Script_Links') && $('GM_Script_Links').innerHTML.match('scripts/show/12610">GM')) // use getElementById
    //
    ////////////////////////////////
    //
    // Disable in case of Seifer's "Customize it" // http://userscripts.org/scripts/show/12646
    //
    if (!($('GM_Script_Links') && $('GM_Script_Links').innerHTML.indexOf('scripts/show/12646">GM')>-1))
    {   GM_log('"Customize it" script was not found.')
        ////////////////////////////////
        // Removes the top ad, and the bottom-left link list
        //
            GM_addStyle('#tkn_leaderboardDiv, #pymk, #googlead, #footer, #adunit, #tomannouncement, #advert, #grayboxrounded, #addressbookintl, #findFriendsLinks, #mtFriendSpaceSuggestion, #suggestion, #marketingcontent, #featuredprofilerounded, #appslayer, #squareAd, #marketingbox {display: none !important}')
        //
        ////////////////////////////////
        // Remove all ads under the third column
        // Inform me in script comments, if you have a script that places elements in the 3rd column
        //
        //   while ($('col3').lastChild && ($('col3').lastChild.nodeName == '#text' || $('col3').lastChild.getAttribute('id') != 'today'))
        //       $('col3').removeChild($('col3').lastChild)
        //
        ////////////////////////////////
        // move status and bulletins under the blue date box
        // (reverse these to change the order)
        //
            if ($('tomannouncement'))  $('col3').appendChild($('tomannouncement'))
            if ($('bulletins'))  $('col3').appendChild($('bulletins'))
            if ($('userstatus')) $('col3').appendChild($('userstatus'))

            var s= '.module .top .title { width: auto !important; }'   // adjusts title to be stretchy
                 + '.statusInputDiv     { height: auto !important; }'  // fixes overlap bug
                 + '#col3 .controlbox   { display: none !important; }' // Removes "move section" boxes
                GM_addStyle(s)
        //
    }   else GM_log('"Customize it" script WAS found.')
    ////////////////////////////////


    ////////////////////////////////
    // Adds the "view mine" between the "post bulletin | view all" bulletin links
    //
        var view_all = $('bulletins').getElementsByTagName('a')
            view_all = view_all[(view_all.length-1)]
        var view_mine = document.createElement('a')
            view_mine.setAttribute('href','http://bulletins.myspace.com/index.cfm?fuseaction=bulletin.ShowMyBulletins')
            view_mine.innerHTML = 'view mine'

            view_all.parentNode.insertBefore(view_mine, view_all)
            view_all.parentNode.insertBefore(document.createTextNode(' | '), view_all)
    //
    ////////////////////////////////
    // Re-titles the page according to alerts
    //
        var a
        document.title = 'MySpace ' +
            ($('updates') && (a = $('updates').innerHTML.match(/New [A-z\s]+!/g))
                ? '- ' + a.join().replace(/(New |[^A-Z,]|!)/g,'') + '!' : 'Home' );
    //
    ////////////////////////////////
    // Bugfix, Enable if you choose
    //
    //  GM_addStyle('body * { font-family: Arial; }') // fixes odd bug, browser ignoring the font (vista?)
    //
    ////////////////////////////////
    // Create Signout Link on topnav (due to missing header)
    //
	//	if ($('topnav')) $('topnav').innerHTML +=
	//		' | <a href="http://collect.myspace.com/index.cfm?fuseaction=signout">Sign Out</a>';
    //
    ////////////////////////////////
    // Adds the "view all | online | newest" friend links
    // REMOVED, myspace added them as default
    //
    /*
        var view_all = $('friendspace').getElementsByTagName('a')

        for (i=0; i < view_all.length ; i++)

            if (view_all[i].href.match('user.viewfriends&friendID='))
            {
                view_all = view_all[i]
                view_all_s = view_all.getAttribute('style')

                if (view_all.href && view_all.href.indexOf('user.viewfriends&')!== -1)
                view_all.parentNode.innerHTML +=
                      ' | <a href="'+view_all.href.replace('user.viewfriends&', 'user.onlinefriends&')+'" style="'+view_all_s+'">online</a>'
                    + ' | <a href="'+view_all.href.replace('user.viewfriends&', 'user.newfriends&')+'" style="'+view_all_s+'">newest</a>'
            }
    */
    //
    ////////////////////////////////
}

function $( elementId ) { return document.getElementById( elementId ); } // shortcut from "Prototype Javascript Framework"