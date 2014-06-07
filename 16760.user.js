// ==UserScript==
// @name           MySpace - Home Auto-Update
// @namespace      Insane Ninja - http://userscripts.org/people/774
// @homepage       http://userscripts.org/scripts/show/6365
// @description    2008/01/19 - Automatically keeps MySpace's home page updated with the newest information. Author: InsaneNinja
// @include        http://home.myspace.com/*fuseaction=user*
// @exclude        *fuseaction=user.*
// ==/UserScript==

    //////////////////////////////////////////////////////////////////////////
    // FRIEND SPACE SETTINGS
    //////////////////////////////////////////////////////////////////////////
    // New Skin ONLY - Displays an "Online Friends" feed in friend space
    //
        var ENHANCED_FRIEND_SPACE = true; // true/false (default:true)
    //
    //////////////////////////////////////////////////////////////////////////
    // New Skin ONLY - Moves "Friend Updates" feed into enhanced friend space
    //
        var MOVE_FRIEND_UPDATES = true; // true/false (default:true)
    //
    //////////////////////////////////////////////////////////////////////////
    // New Skin ONLY
    //
        var DEFAULT_FRIEND_SECTION ='Online'; // Online/Tops/Updates UPPERCASE

        var SCROLL_FRIENDS = true; // true/false (default:true)
    //
    //////////////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////////
    // BULLETIN SPACE SETTINGS
    //////////////////////////////////////////////////////////////////////////
    // New Skin ONLY - Bulletins get tweaked for looks, (photo & arrangement)
    //
        var ENHANCED_BULLETINS  = true; // true/false (default:true)
    //
    //////////////////////////////////////////////////////////////////////////
    // New Skin ONLY
    //
        var SCROLL_BULLETINS = true; // true/false (default:true)
    //
    //////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////
//////      DO NOT EDIT BELOW THIS LINE      //////
///////////////////////////////////////////////////


    if ($('col3'))
    {
    // START - New Skin Code

    // This is the setup area, updating happens later

    ////////////////////////////////
    // Create script link-back
    //
        if (!$('GM_Script_Links') && $('col1')) { GM_addStyle('#GM_Script_Links a {display:block;color:#CCC!important;}')
            var gsl = document.createElement('p'); $('col1').appendChild(gsl); gsl.setAttribute('id','GM_Script_Links');}

        $('GM_Script_Links').innerHTML +=
              '<a href="http://userscripts.org/scripts/show/6365">GM - Auto-Update '
            + '<img src="http://i258.photobucket.com/albums/hh252/insaneninja_gm/home_auto_update/20080119.png"></a>';
    //
    // if (document.getElementById('GM_Script_Links') &&
    //     document.getElementById('GM_Script_Links').innerHTML.match('scripts/show/6365">GM')) // used to test for this
    ////////////////////////////////

        if (SCROLL_FRIENDS)   GM_addStyle('#HAU_Friends {max-height:500px; overflow:auto;} ')
        if (SCROLL_BULLETINS) GM_addStyle('#bulletins .datagrid {max-height:250px; overflow:auto;}')

        var friendid=/friendid=([0-9]+)[^0-9]/i.exec($('col1').innerHTML); window.friendid=friendid[1]; //console.log('friendid = '+window.friendid)

        // Create the missing Updates (notifications) module
        if (!$('updates') && $('userdisplay'))
        {
            var upsDiv = document.createElement('div');
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
                var toomany_div = document.createElement('table');
                toomany_div.setAttribute('id','tblbulletins');
                toomany_div.className='cols';
                $('toomany').parentNode.insertBefore(toomany_div, $('toomany'));
            }

            // This is so i can move all css into one external file later (GM v0.8)
            $('tblbulletins').className += ' hau_eBuls';

            var s='#bulletins {overflow: hidden;} #toomany { display: none; }'
                + '.hau_eBuls { width: 100%; padding:0px; margin:0px;}'
                + '.hau_eBuls tr { font-weight: normal !important; font-size: 8pt !important; }'
                + '.hau_eBuls td { border-width: 0px; width: auto!important; }'
                + '.hau_eBuls td.userphoto { width: 50px !important; }'
                + '.hau_eBuls img { max-width: 45px; max-height: 40px; }'
                + '.hau_eBuls span.spandate { float: right; color: CCC; }'
                GM_addStyle(s.replace('}','}\n'))
        }

        // Set a name to the middle element of friendupdates
        if ($('friendUpdate'))
        {
            if (false && document.getElementsByClassName) // havent tested this yet, a Firefox 3 speed boost
            {
                var middle = $('friendUpdate').getElementsByClassName('middle')
                middle[0].setAttribute('id','HAU_Fr_Updates')
            }
            else
            {
                divs = $('friendUpdate').getElementsByTagName('div')
                for (i=0; i < divs.length ; i++) if (divs[i].className == 'middle')
                    { divs[i].setAttribute('id','HAU_Fr_Updates'); break; }
            }
        }

        if ( ENHANCED_FRIEND_SPACE == true && $('friends') && $('friendsearch'))
        {
            var st = ''

            // Create Friend Container
            var HAU_Friends = document.createElement('div'); HAU_Friends.setAttribute('id','HAU_Friends')
                $('friends').parentNode.insertBefore( HAU_Friends, $('friends') );

            // Create Display Switchbox
            var HAU_Options = document.createElement('span'); HAU_Options.setAttribute('id','HAU_Options')
                $('friendsearch').insertBefore( HAU_Options, $('friendsearch').firstChild )

            st += '#HAU_Friends > div { display: none }' // hide sections

                + '#txtFrndSearch  { width: 35% !important; margin-right: 10px !important; }'
                + '#friendsearch a { float: left !important; }'

                + '#HAU_Options      { float: right !important; }'
                + '#HAU_Options a    { font-weight: normal; }'
                + '#HAU_Options span { margin: 2px; cursor: pointer; }'
                + '#HAU_Options span:hover { text-decoration: underline !important; }'

            // Repair css
            st += '#HAU_Friends          { width: 100% !important; margin-left: -5px!important; } '
                + '#HAU_Friends #friends { width: 100% !important; margin: 0px !important; padding: 0px !important; }'
                + '#HAU_Friends .friend  { width: 25% !important;  margin: 0px !important; padding: 0px !important; overflow: hidden; }'


            // Create "Online" container and display online friends.
            if (!$('toomany'))
            {
            var HAU_Onlines = document.createElement('div');
                HAU_Onlines.setAttribute('id','HAU_Onlines')
                HAU_Onlines.className='Online'
                HAU_Friends.appendChild( HAU_Onlines )
                HAU_Onlines.innerHTML = '<center><img src="http://x.myspace.com/modules/common/static/img/loadercircles.gif"><br /><br /> :: Loading Online Friends :: </center>'
            }

            // Move Top Friends into the friend container.
            HAU_Friends.appendChild( $('friends') ); $('friends').className='Tops'


            // Move Friend Updates into the friend container.
            if ( MOVE_FRIEND_UPDATES == true && $('HAU_Fr_Updates') ) {
                HAU_Friends.appendChild( $('HAU_Fr_Updates') )
                $('HAU_Fr_Updates').className='Updates'

                st +='#friendUpdate {display:none} .activityMsg { width:92%; }'
                    +'.activityFeed .thumb { margin-right: 8px !important; }'
                    +'.activityFeed .activity { margin-bottom: 6px !important; } '
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
                    st += '.cls_'+name+' .lnk_'+name+' { display: none; text-decoration: none !important; font-weight: bold !important; }'
                    st += '.cls_'+name+'  div.'+name+' { display: block !important; }'

                    HAU_divsec = HAU_divsec.nextSibling
                }

                HAU_Options.innerHTML = '<a><nobr>' + HAU_Links.join('') + '</nobr></a>';
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
            headers: {'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.8) Gecko/20071008 Firefox/2.0.0.8'},
            onload: function(responseDetails) {

                var html = responseDetails.responseText.replace(/\t|\r|\n/g,'');

                // Update Notifications
                if ($('updates') && (a=/<div id="updates"[^>]*>(.+?\&nbsp\;<\/div><\/div><\/div>)/.exec(html)) )
                {
                    $('updates').innerHTML = a[1];
                    $('updates').style.display='block';
                    var a = a[1].match(/New [A-z\s]+!/g).join().replace(/(New |[^A-Z,])/g,'') + '!'
                    document.title = 'MySpace - ' + a;
                } else { $('updates').style.display='none'; document.title = 'MySpace Home'; }

                // Update Friend Updates
                if ( $('friendUpdate') && $('HAU_Fr_Updates')
                        && (a=/<div id="friendUpdate".+?<div class="middle">(.+?)<\/div>[^>]*<div class="bottom">/i.exec(html)) )
                    if (a[1].indexOf('Please try again later') === -1) $('HAU_Fr_Updates').innerHTML = a[1];

                // Update Basic Bulletins
                if ( !ENHANCED_BULLETINS && $('tblbulletins') &&
                        (a=/<table id="tblbulletins"[^>]*>(.+?)<\/table>/.exec(html)) )
                    $('tblbulletins').innerHTML = a[1].replace(/([0-9]),\s+200[78]/g,'$1, ')

                if (window.gm_ignoreBulletins) window.gm_ignoreBulletins();

                // Update Status Updates
                if ( $('statusUpdates') && (a=/<table [^>]*id="statusUpdates"[^>]*>(.+?)<\/table>/.exec(html)) )
                    $('statusUpdates').innerHTML = a[1];

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
                        if (bulink.href.indexOf('?fuseaction=bulletin.edit&') !== -1) window.buposts.push(bulink.href)
                }
*/
            }
        });

        if (ENHANCED_BULLETINS && $('tblbulletins') && (HAU_cycles/3 == parseInt(HAU_cycles/3)) )

        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://bulletins.myspace.com/index.cfm?fuseaction=bulletin&',
            headers: {'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.8) Gecko/20071008 Firefox/2.0.0.8'},
            onload: function(responseDetails) {

                var col=0, tr, a=[], html = responseDetails.responseText.replace(/\t|\r|\n/g,'');
                var r = new RegExp('<td class="userinfo">(<a [^>]+>)(<img [^>]+>)<br />([^<]+)</a>.+?<td class="date">([^<]+)</td>.+?<td class="subject">(<a [^>]+?(messageID=[0-9]+)[^0-9][^>]+?">[^<]+</a>)','\g\i') // Shortened 20071115

                while ( tr = r.exec(html) ) // tr[7] (for a planned later upgrade)
                    a.push('<tr class="'+(col++%2?'roweven':'rowodd')+'"><td rowspan="2" class="userphoto">'+ tr[1] + tr[2].replace('/m_','/s_') +'</a></td><td class="userinfo"><span class="spandate">'+ tr[4].replace(/,\s+200[789]/,', ') +'</span>' + tr[1]  + tr[3] +'</a></td></tr><tr class="'+(col%2?'rowodd':'roweven')+'"><td class="sbjt">' + tr[5] + '</td></tr>')

                if (a.length) $('tblbulletins').innerHTML = a.join('');

                if (window.gm_ignoreBulletins) window.gm_ignoreBulletins()
            }
        });


        if ($('HAU_Onlines') && (HAU_cycles/5 == parseInt(HAU_cycles/5)) )
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://friends.myspace.com/index.cfm?fuseaction=user.onlinefriends&friendID='+window.friendid,
            headers: {'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.8) Gecko/20071008 Firefox/2.0.0.8'},
            onload: function(responseDetails) {

                var a,doubles=',',r,f=[], html = responseDetails.responseText.replace(/\t|\r|\n/g,'');

                r = RegExp('(<a href="http://profile.[^"]+?friendid=([0-9]+)">)(<img src="[^"]+") alt="([^"]+)" title="([^"]+)" class="profileimagelink"', 'ig')

                while (a = r.exec(html))
                {
                    if (doubles.indexOf(','+a[2]+',')==-1)
                    {
                        doubles += a[2]+','
                        f.push( '<div class="friend" title="'+ a[4] +'">' + a[1] + a[4] +'</a>'+ a[1]+a[3] + ' /></a><br><img src="http://x.myspace.com/images/onlinenow.gif"></div>' )
                    }
                }
                    f = f.join('\n').replace(/((<div class="friend".+?<\/div>\n){4})/g, '$1<div class="clear"></div>')

                if ( f.indexOf('viewprofile') !== -1 ) $('HAU_Onlines').innerHTML = f;
            }
        });

    // END - New Skin Code
    }

    if ($('home_profileInfo'))
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://home.myspace.com/index.cfm?fuseaction=user&',
        headers: {'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.8) Gecko/20071008 Firefox/2.0.0.8'},
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
                    if (bulink.href.indexOf('?fuseaction=bulletin.edit&') !== -1) window.buposts.push(bulink.href)
            }

            if (window.gm_ignoreBulletins) window.gm_ignoreBulletins()
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


function $(elementId) { return document.getElementById(elementId); } // shortcut from "Prototype Javascript Framework"