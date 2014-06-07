// ==UserScript==
// @name           MySpace - Home Auto-Update
// @namespace      Insane Ninja - http://userscripts.org/people/774
// @homepage       http://userscripts.org/scripts/show/6365
// @description    2008/07/04 - Automatically keeps MySpace's home page updated with the newest information. Author: InsaneNinja
// @include        http://home.myspace.com/*fuseaction=user*
// @exclude        *fuseaction=user.*
// ==/UserScript==

///////////////////////////////////////////////////
//////     THERE ARE NO OPTIONS TO EDIT      //////
///////////////////////////////////////////////////

/*//////////////
// Change Log //

    2008/07/04 - Misc Bug Fixes

    2008/04/07 - Updated for new "Online Friends" url location

    2008/04/03
    1) Bugfix - "Onlines" list works again.
    2) Friend Photo spacing normalized
    3) Enhanced bulletins disabled temporarily (will re-appear asap)
    4) HomeAutoUpdate in-page options added to control panel, more dynamic (will soon add a link to hide them)
    5) Disabled Upgrade Notification, in hopes of a less annoying system
    6) Moved ChangeLog into script

	2008/01/23 - Adrian created in-page editing of script options. - http://userscripts.org/users/5056
	2008/01/22 - The list of online users now re-applys the Image links

	2008/01/22 - As requested, i changed from using button image, to links

	2008/01/19 - Trimmed a lot of the coding fatness, added the requested hooks for "Ignore Bulletins" script. (His script should take care of the rest)

	2008/01/18 - Code adjusted to deal with the onlines doubling, which was due to myspace's upcoming message/add/comment "links under images" feature

	2008/01/15 -
	1) If visible, HAU will update the 'today' div (the TIME)
	2) Section links (tops,updates) in FriendSpace now match the theme.
	3) Friendupdates now display how many more users you can add to your subscriptions, and is now mostly immune to id-name changes.
	4) bugfix for non-compact friendupdates, "edit|view" links are no longer doubled (nobody pointed this out?)
	5) enhanced bulletins now use the odd/even coloring system of themes.

	2008/01/11 - Rush job, again, due to new theme system. There was a delay while I attempted to deal with the friendspace links by using the current theme's colors, which required a bit of creative re-coding.

	2008/01/07 - Set online to default, with an option (tops in case of error), added update notification image, repaired font on the friend option box, among other updates i've added the past few days.

	2007/12/28 - Attempting to keep up with myspace's changes AND predict the future. As of this writing, friend updates has (temporarily?) disappeared. I'm programming the script to self-adjust, as well as putting in plugin points for other scripts.

	2007/12/06 -
	1. Updated the still temporary GUI.
	2. Repaired for the friend updates new ID name.
	3. Integrated Switchup's scrolling space saver feature.
	4. Tweaked friend updates css style to adapt for loss of pixel space.
	5. Added optional switches for scrolling, as well as compacting friends updates.

	2007/11/29 - Temporarily updated to deal with the feed. The new home skin switchup adds scrolling. This is a temporary update, i'll have something more permenant asap, but i have to go out of town a couple days..

	2007/11/15 - HAU now updates ALL the "Post Bulletin" links, so the hash doesnt expire.

	2007/10/24 - Heavy Upgrades, and a shiney new blue button to view a constantly updating list of online friends. Update Home Skin Switchup if you use that script as well.

	2007/10/03 -
	Bugfix: "too many friends" no longer disables enhanced bulletins.
	Cosmetic: Tweaked "Enhanced Bulletins" to look/sort better.
	Cosmetic: Tweaked normal-looking bulletins to not display the year, to fit better.

	2007/10/02 - Added "Overflow: hidden" to hide bulletin titles/names that would have had extended the table over the edge

	2007/09/30 - Set the link-back to a dull gray. Set the invisible updates div to locate in relation to the userdisplay instead of control panel. Upgraded the script to use prototype's ID'ing function.

	2007/09/29 - Rewritten from scratch to update both New & Classic skins.

/**/

    ////////////////////////////////
    // Create script link-back
    //
        if ($('col1'))
		{
			if (!$('GM_Script_Links')) { GM_addStyle('#GM_Script_Links a {display:block;color:#CCC!important;}')
            var gsl = newElm('p'); $('col1').appendChild(gsl); gsl.setAttribute('id','GM_Script_Links');}

	        $('GM_Script_Links').innerHTML += '<a href="http://userscripts.org/scripts/show/6365">GM - Auto-Update</a>';
		}
    //
    // if (document.getElementById('GM_Script_Links') &&
    //     document.getElementById('GM_Script_Links').innerHTML.match('scripts/show/6365">GM')) // used to test for this
    ////////////////////////////////

///////////////////////////////////////////////////
//////      DO NOT EDIT BELOW THIS LINE      //////
///////////////////////////////////////////////////


    if ($('col1'))
    {
    // START - New Skin Code

    // This is the setup area, updating happens later

    ////////////////////////////////
    // Create script options -- Contributed by Adrian
    //
        if ($('col1'))
        {
            // Load the options
            var SCROLL_FRIENDS            = GM_getValue("SCROLL_FRIENDS", true);
            var SCROLL_BULLETINS          = GM_getValue("SCROLL_BULLETINS", true);
            var ENHANCED_BULLETINS        = GM_getValue("ENHANCED_BULLETINS", false);
            var FRIEND_SPACE_WITH_ONLINES = GM_getValue("FRIEND_SPACE_WITH_ONLINES", true);
            var FRIEND_SPACE_WITH_UPDATES = GM_getValue("FRIEND_SPACE_WITH_UPDATES", true);
            var DEFAULT_FRIEND_SECTION    = GM_getValue("DEFAULT_FRIEND_SECTION", true);

            function changeOption(e) { GM_setValue(this.name, (this.type == "checkbox" ? this.checked : this.value)) }

            var hsod = newElm('div');
            var hso = newElm('div'); hsod.appendChild(hso)

            GM_addStyle('#HAU_Choices {text-align: left; margin: 10px 3px 0px; border-top: 1px solid; }'
                +'#HAU_Choices span { background-color: #FFF; border: 1px solid #000; padding: 2px 8px; -moz-border-radius: 5px;}'
                +'#HAU_Choices span:hover {cursor: pointer} #HAU_Choices br {clear:both}'
                +'#HAU_Choices input, #HAU_Choices span, #HAU_Choices select { float: right; font-size: 1em; }')

            // Maybe someday replace the below with HTML code, and loop thru to add the EventListeners afterwards (?)

            var hider = newElm("span");
//            hider.appendChild(document.createTextNode('HAU Options'));
            hider.addEventListener('click', function() { HAU_Choices.style.display = (HAU_Choices.style.display != 'none' ? 'none' : 'show') }, false);
            hsod.appendChild(hider);
            hso.setAttribute('id','HAU_Choices');
//            hso.setAttribute('style','display:none')

            var opt = newElm("input"); opt.type = "checkbox"; opt.name = "SCROLL_BULLETINS";
            opt.addEventListener('change', changeOption, false); hso.appendChild(opt);
            if (SCROLL_BULLETINS) opt.checked = true;
            hso.appendChild(document.createTextNode('Scrolling Bulletins'));
            hso.appendChild(newElm("br"));

            var opt = newElm("input"); opt.type = "checkbox"; opt.name = "SCROLL_FRIENDS";
            opt.addEventListener('change', changeOption, false); hso.appendChild(opt);
            if (SCROLL_FRIENDS) opt.checked = true;
            hso.appendChild(document.createTextNode('Scrolling Friend Space'));
            hso.appendChild(newElm("br"));

            hso.appendChild(newElm("br"));
/*
Needs Repair
            var opt = newElm("input"); opt.type = "checkbox"; opt.name = "ENHANCED_BULLETINS";
            opt.addEventListener('change', changeOption, false); hso.appendChild(opt);
            hso.appendChild(document.createTextNode('Enhance Bulletins With Photos'));
            if (ENHANCED_BULLETINS) opt.checked = true;
            hso.appendChild(newElm("br"));

            hso.appendChild(newElm("br"));
*/
            var opt = newElm("input"); opt.type = "checkbox"; opt.name = "FRIEND_SPACE_WITH_ONLINES";
            opt.addEventListener('change', changeOption, false); hso.appendChild(opt);
            if (FRIEND_SPACE_WITH_ONLINES) opt.checked = true;
            hso.appendChild(document.createTextNode('Friend Space with Onlines'));
            hso.appendChild(newElm("br"));

            var opt = newElm("input"); opt.type = "checkbox"; opt.name = "FRIEND_SPACE_WITH_UPDATES";
            opt.addEventListener('change', changeOption, false); hso.appendChild(opt);
            if (FRIEND_SPACE_WITH_UPDATES) opt.checked = true;
            hso.appendChild(document.createTextNode('Friend Space with Updates'));
            hso.appendChild(newElm("br"));

            hso.appendChild(newElm("br"));

            var opt = newElm("select"); opt.name = "DEFAULT_FRIEND_SECTION";
            opt.addEventListener('change', changeOption, false); hso.appendChild(opt);
            var choice = newElm("option"); choice.appendChild(document.createTextNode('Tops')); opt.appendChild(choice);
            if (FRIEND_SPACE_WITH_ONLINES)
                {var choice = newElm("option"); choice.appendChild(document.createTextNode('Onlines')); opt.appendChild(choice);}
            if (FRIEND_SPACE_WITH_UPDATES)
                {var choice = newElm("option"); choice.appendChild(document.createTextNode('Updates')); opt.appendChild(choice);}
            switch (DEFAULT_FRIEND_SECTION) { case "Onlines": case "Updates":
                opt.value = DEFAULT_FRIEND_SECTION; break; default: opt.value = "Tops"; }
            hso.appendChild(document.createTextNode('Default Friend Space'));
            hso.appendChild(newElm("br"));

            hso.appendChild(newElm("br"));

            var apply = newElm("span");
            apply.appendChild(document.createTextNode('Refresh'));
            apply.addEventListener('click', function() {document.location.href=document.location.href;}, false);
            hso.appendChild(apply);

            hso.appendChild(newElm("br"));

            if ($('lastLogin')) $('lastLogin').parentNode.appendChild(hsod)

        }
    //
    ////////////////////////////////


        if (SCROLL_FRIENDS)   GM_addStyle('#HAU_Friends {max-height:500px; overflow:auto;} ')
        if (SCROLL_BULLETINS) GM_addStyle('#bulletins .datagrid {max-height:250px; overflow:auto;}')

        var friendid=/friendid=([0-9]+)[^0-9]/i.exec($('col1').innerHTML); window.friendid=friendid[1]; //console.log('friendid = '+window.friendid)

        // Create the missing Updates (notifications) module
        if (!$('updates') && $('userdisplay'))
        {
            var upsDiv = newElm('div');
            upsDiv.setAttribute('id','updates');
            upsDiv.className='module';
            upsDiv.style.display='none';
            $('userdisplay').parentNode.insertBefore(upsDiv, $('userdisplay').nextSibling);
        }

        if (ENHANCED_BULLETINS)
        {
            // Re-enable bulletins if you have too many friends
            if (!$('tblbulletins') && $('toomany'))
            {
                var toomany_div = newElm('table');
                toomany_div.setAttribute('id','tblbulletins');
                toomany_div.className='cols';
                $('toomany').parentNode.insertBefore(toomany_div, $('toomany'));
            }

            // This is so i can move all css into one external file later (GM v0.8)
            $('tblbulletins').className += ' hau_eBuls';

            var st='#bulletins {overflow: hidden;} #toomany { display: none; }'
                + '.hau_eBuls { width: 100%; padding:0px; margin:0px;}'
                + '.hau_eBuls tr { font-weight: normal !important; font-size: 8pt !important; }'
                + '.hau_eBuls td { border-width: 0px; width: auto!important; }'
                + '.hau_eBuls td.userphoto { width: 50px !important; }'
                + '.hau_eBuls img { max-width: 45px; max-height: 40px; }'
                + '.hau_eBuls span.spandate { float: right; color: CCC; }'
                GM_addStyle(st.replace('}','}\n'))
        }

        // Set a name to the middle element of friendupdates
        if ($('friendUpdate'))
        {
            if (document.getElementsByClassName) // havent tested this yet, a Firefox 3 speed boost
                { var middle = $('friendUpdate').getElementsByClassName('middle'); middle[0].setAttribute('id','HAU_Fr_Updates') }
            else
            {
                divs = $('friendUpdate').getElementsByTagName('div')
                for (i=0; i < divs.length ; i++) if (divs[i].className == 'middle') { divs[i].setAttribute('id','HAU_Fr_Updates'); break; }
            }
        }

        if ( (FRIEND_SPACE_WITH_ONLINES || FRIEND_SPACE_WITH_UPDATES) && $('friends') && $('friendsearch'))
        {
            var st = ''

            // Create Friend Container
            var HAU_Friends = newElm('div'); HAU_Friends.setAttribute('id','HAU_Friends')
                $('friends').parentNode.insertBefore( HAU_Friends, $('friends') );

            // Create Display Switchbox
            var HAU_Options = newElm('span'); HAU_Options.setAttribute('id','HAU_Options')
                $('friendsearch').insertBefore( HAU_Options, $('friendsearch').firstChild )

            st += '#HAU_Friends > div { display: none }' // hide sections
                + '#friendsearch a { float: left !important; }'
                + '#txtFrndSearch  { width: 35% !important; margin-right: 10px !important; }'

            st += '#HAU_Options            { float: right !important; margin-right: 10px; }'
                + '#HAU_Options span       { cursor: pointer; }'
                + '#HAU_Options span:hover { text-decoration: underline !important; }'

            // Repair css
            st += '#HAU_Friends          { width: 100% !important; margin-left: -5px !important; padding-bottom: 40px; } '
//                + '#HAU_Friends #friends { width: 100% !important; margin: 0px !important; padding: 0px !important; }'
                + '#HAU_Friends .friend  { width:  25% !important; margin: 0px !important; padding: 0px !important; overflow: hidden; }'


            // Create "Online" container and display online friends.
            if (FRIEND_SPACE_WITH_ONLINES && !$('toomany'))
            {
            var HAU_Onlines = newElm('div');
                HAU_Onlines.setAttribute('id','HAU_Onlines')
                HAU_Onlines.className='Onlines'
                HAU_Friends.appendChild( HAU_Onlines )
                HAU_Onlines.innerHTML = '<center><img src="http://x.myspace.com/modules/common/static/img/loadercircles.gif"><br /><br /> :: Loading Online Friends :: </center>'
            }

            // Move Top Friends into the friend container.
            HAU_Friends.appendChild( $('friends') ); $('friends').className='Tops'


            // Move Friend Updates into the friend container.
            if ( FRIEND_SPACE_WITH_UPDATES == true && $('HAU_Fr_Updates') )
            {
                HAU_Friends.appendChild( $('HAU_Fr_Updates') ); $('HAU_Fr_Updates').className='Updates'

                st +='#friendUpdate { display:none }'
                    +'#HAU_Friends .activityMsg { width:92%; }'
                    +'#HAU_Friends .activityFeed .thumb { margin-right: 8px !important; }'
                    +'#HAU_Friends .activityFeed .activity { margin-bottom: 6px !important; }'
            }

            // Figure out whats in the container and create links for them.
            // Eventually to include plugin access for other scripts.
            if ($('HAU_Friends'))
            {
                var HAU_divsec = $('HAU_Friends').firstChild, HAU_Links = Array(), dftcls = $('friendspace').className

                // Incase default section isnt set
                $('friendspace').className = dftcls + ' cls_Tops'

                while (HAU_divsec)
                {
                    var name; if (!(name = HAU_divsec.getAttribute('class'))) { HAU_divsec = HAU_divsec.nextSibling; continue; }

                    // Set default section
                    if (name == DEFAULT_FRIEND_SECTION) $('friendspace').className = dftcls + ' cls_'+name

                    HAU_Links.push( '<span onclick=" document.getElementById(\'friendspace\').className=\''+dftcls+' cls_'+name+'\'; return false; " class="lnk_'+name+'">'+name+'</span>')

                    // Active Status
                    st += '.cls_'+name+' .lnk_'+name+' { text-decoration: none !important; font-weight: bold !important; }'
                    st += '.cls_'+name+'  div.'+name+' { display: block !important; }'

                    HAU_divsec = HAU_divsec.nextSibling
                }

                HAU_Options.innerHTML = '<nobr>' + HAU_Links.join(' | ') + '</nobr>';
            }
            GM_addStyle(st.replace('}','}\n'))
        }


    // END - New Skin Code
    }



window.gm_HAU_UpdatePage = function(HAU_cycles){

    if ($('col3'))
    {
    // START - New Skin Code

        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://home.myspace.com/index.cfm?fuseaction=user&',
            headers: {'User-Agent': 'MySpace Should Install Auto Updating'},
            onload: function(responseDetails) {

                var html = responseDetails.responseText.replace(/\t|\r|\n/g,'');

                // Update Notifications
                if ($('updates') && (a=/<div id="updates"[^>]*>(.+?\&nbsp\;<\/div><\/div><\/div>)/.exec(html)) && (a[1].indexOf('New') > -1) )
                {
                    $('updates').innerHTML = a[1];
                    $('updates').style.display='block';
                    var a = a[1].match(/New [A-z\s]+!/g).join().replace(/(New |[^A-Z,])/g,'') + '!'
                    document.title = 'MySpace - ' + a;
                } else { $('updates').style.display='none'; document.title = 'MySpace Home'; }

                // Update Friend Updates
                if ( $('friendUpdate') && $('HAU_Fr_Updates')
                        && (a=/<div id="friendUpdate".+?<div class="middle">(.+?)<\/div>[^>]*<div class="bottom">/i.exec(html)) )
                            if (a[1].indexOf('Please try again later') === -1 && a[1].indexOf('ajaxLoader') === -1)
                                $('HAU_Fr_Updates').innerHTML = a[1];

                // Update Basic Bulletins
                if ( !ENHANCED_BULLETINS && $('tblbulletins') &&
                        (a=/<table id="tblbulletins"[^>]*>(.+?)<\/table>/.exec(html)) )
                    $('tblbulletins').innerHTML = a[1].replace(/([0-9]),\s+200[78]/g,'$1, ')

				// http://userscripts.org/scripts/show/5618 - Ignore Bulletins
				if (window.gm_ignoreBulletins) window.gm_ignoreBulletins()

                // Update Status Updates
                if ( $('statusUpdates') && (a=/<table [^>]*id="statusUpdates"[^>]*>(.+?)<\/table>/.exec(html)) )
                    $('statusUpdates').innerHTML = a[1].replace(/<td class="col1"><a /ig,'<td class="col1"><a class="AILNoLinks" ');

                // Update "Today" time
                if ($('today') && (a=/<div id="today"[^>]*>(.+?"bottom".+?<\/div><\/div><\/div>)/.exec(html)) )
                    $('today').innerHTML = a[1];

/*
                // update bulletin post link hash (skin switchup makes 2) - 20071115
                if ( (a=/"([^\"]+fuseaction=bulletin\.edit\&[^\"]+)"/i.exec(html)) )
                    for(i=0; (bupost=window.buposts[i]); i++) bupost.href = a[1]
                else
                {
                    var bulinks = $('bulletins').getElementsByTagName('a'); window.buposts=[];
                    for (i=0; (bulink=bulinks[i]); i++)
                        if (bulink.href.indexOf('?fuseaction=bulletin.edit&') > -1) window.buposts.push(bulink.href)
                }
*/
                // console.log('HAU: Updated Main Page Items')
            }
        });


        if (ENHANCED_BULLETINS && $('tblbulletins') && (HAU_cycles/3 == parseInt(HAU_cycles/3)) )

        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://bulletins.myspace.com/index.cfm?fuseaction=bulletin&',
            headers: {'User-Agent': 'MySpace Should Install Auto Updating'},
            onload: function(responseDetails) {

                var col=0, tr, a=[], html = responseDetails.responseText.replace(/\t|\r|\n/g,'');
                var r = new RegExp('<td class="userinfo">'+'<a ([^>]+>)(<img [^>]+>)<br />([^<]+)</a>.+?'+'<td class="date">([^<]+)</td>.+?'//+'<td class="subject">(<a [^>]+?(messageID=[0-9]+)[^0-9][^>]+?">.+?\'(.+?)\'.+?</a>)'
                ,'\g\i') // Shortened 20071115

                while ( tr = r.exec(html) ) // tr[7] (for a planned later upgrade)
                    a.push('<tr class="'+(col++%2?'roweven':'rowodd')+'"><td rowspan="2" class="userphoto"><a class="AILNoLinks" '+ tr[1] + tr[2].replace('/m_','/s_') +'</a></td><td class="userinfo"><span class="spandate">'+ tr[4].replace(/,\s+200[789]/,', ') +'</span><a ' + tr[1]  + tr[3] +'</a></td></tr><tr class="'+(col%2?'rowodd':'roweven')+'"><td class="sbjt">' + tr[5] + '</td></tr>')

                if (a.length) $('tblbulletins').innerHTML = a.join('');

				// http://userscripts.org/scripts/show/5618 - Ignore Bulletins
				if (window.gm_ignoreBulletins) window.gm_ignoreBulletins()

//               console.log('HAU: Updated eBulletins')
            }
        });


        if ($('HAU_Onlines') && (HAU_cycles/5 == parseInt(HAU_cycles/5)) )
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://friends.myspace.com/index.cfm?fuseaction=user.viewfriends2&view=online&friendID='+window.friendid,
            headers: {'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.8) Gecko/20071008 Firefox/3.0'},
            onload: function(responseDetails) {

                var a,doubles=',',r,f=[], html = responseDetails.responseText.replace(/\t|\r|\n/g,'');

                r = RegExp('(<a href="http://profile.[^"]+?friendid=([0-9]+)">)(<img src="[^"]+myspacecdn[^"]+") alt="([^"]+)"', 'ig')

                while (a = r.exec(html))
                {
                    if (doubles.indexOf(','+a[2]+',')==-1)
                    {
                        doubles += a[2]+','
                        f.push( '<div class="friend" title="'+ a[4] +'">' + a[1] + a[4] +'</a>'+ a[1]+a[3] + ' /></a><br><img src="http://x.myspace.com/images/onlinenow.gif"></div>' )
                    }
                }
                    f = f.join('\n').replace(/((<div class="friend".+?<\/div>\n){4})/g, '$1<div class="clear"></div>')

                if ( f.indexOf('viewprofile') > -1 ) $('HAU_Onlines').innerHTML = f;
                else console.log('Error Loading Online Friends')

				// http://userscripts.org/scripts/show/5767
                var GM_ImageLinks_Reload = document.createEvent("Event");
                GM_ImageLinks_Reload.initEvent("GM_ImageLinks_Reload", false, true);
                document.dispatchEvent(GM_ImageLinks_Reload);

                // console.log('HAU: Updated Onlines')
            }
        });

    // END - New Skin Code
    }

    if ($('home_profileInfo'))  // This may easily go out of date, I never check the old skin.
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://home.myspace.com/index.cfm?fuseaction=user&',
        headers: {'User-Agent': 'MySpace Should Install Auto Updating'},
        onload: function(responseDetails) {

            var html = responseDetails.responseText.replace(/\t|\r|\n/g,'');

            if ( a=/<div id="home_messages"[^>]*>((.(?!class="section"))*)<\/div>/.exec(html))
            {
                $('home_messages').innerHTML = a[1];

                document.title = ( a = a[1].match(/New [A-z\s]+!/g) )
                    ? 'MySpace - ' + a.join().replace(/(New |[^A-Z,]|!)/g,'') + '!' : 'MySpace Home'
            }

            if ( a=/<div id="home_bulletins"[^>]*>((.(?!class="section"))*)<\/div>/.exec(html) )
                $('home_bulletins').innerHTML = a[1].replace(/([0-9]),\s+200[78]/g,'$1, ');

            // update bulletin post link hash - 20071115
            if (window.buposts && (a=/"([^\"]+fuseaction=bulletin\.edit\&[^\"]+)"/i.exec(html)) )
                for(i=0; (bupost=window.buposts[i]); i++) bupost.href = a[1]
            else
            {
                var bulinks = $('home_bulletins').getElementsByTagName('a'); window.buposts=[];
                for (i=0; (bulink=bulinks[i]); i++)
                    if (bulink.href.indexOf('?fuseaction=bulletin.edit&') > -1) window.buposts.push(bulink.href)
            }

			// http://userscripts.org/scripts/show/5618 - Ignore Bulletins
			if (window.gm_ignoreBulletins) window.gm_ignoreBulletins()

			// http://userscripts.org/scripts/show/5767
            var GM_ImageLinks_Reload = document.createEvent("Event");
            GM_ImageLinks_Reload.initEvent("GM_ImageLinks_Reload", false, true);
            document.dispatchEvent(GM_ImageLinks_Reload);

            // console.log('HAU: Updated Classic Page Items')
        }
    });
}

    ////////////////////////////////
    // Create and cycle the timer
    //
        window.HAU_cycles = 0;

        window.gm_UpdateTimer = function() { window.gm_HAU_UpdatePage(window.HAU_cycles++); setTimeout(gm_UpdateTimer, 15000); }

        window.gm_UpdateTimer()
    //
    ////////////////////////////////


function newElm(element) { return document.createElement(element); }
function $(element) { return document.getElementById(element); } // shortcut from "Prototype Javascript Framework"