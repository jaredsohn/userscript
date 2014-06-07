//////////////////////////////////////////////////////////////////////////////
// Profile Viewer script
// version 0.2.17
// 02 XII 2008 
// Released as Public Domain
//////////////////////////////////////////////////////////////////////////////
// ==UserScript==
// @name        Profile Viewer
// @namespace   http://wiki.urbandead.com/index.php/User:Viktor_Suvorov
// @description Profile viewer, helps in finding (and exterminating) zergs, trenchies, PKers
// @include     http://www.urbandead.com/map.cgi*
// @include     http://urbandead.com/map.cgi*
// @include     http://www.iwrecords.urbandead.info/*.html
// @include     http://iwrecords.urbandead.info/*.html
// ==/UserScript==
//////////////////////////////////////////////////////////////////////////////


/*
    Release log:
        0.2.17 - Small bugfix in auto updater
        0.2.16 - Fixed a small display bug caused by udtoolbar and the previous
                    update
        0.2.15 - Bugfix of a small display problem visible on some iwitness pages
                    added: update monitor, domain selection for iwitness UD links
        0.2.14 - Minor link description display fix
        0.2.13 - No new features, just fixed some firefox 3 compatibility issues
        0.2.12 - Displaying player skill count on main screen, displaying player status
        0.2.11 - Displaying player class, added wrapping long words and catching links
        0.2.10 - Minor code cleanup, added one configuration option
        0.2.9  - Fixed an old bug causing displaying wrong profile, added stay-visible option
                    added opening links in tabs, added google search
        0.2.8  - Headbutt !!! 
        0.2.7  - Added iwrecords support, added player name, grouped links, added RG link
        0.2.6  - Minor bugfix in tabs
        0.2.5  - Removed circling through views, added tabs, works better with styles


        0.2.1  - Minor bugfixes
        0.2.0  - Added: skill tree preview, clothes preview, attack links


        0.1.1 - Fixed small caching bug, which caused displaying wrong profiles
        0.1.0 - Initial release
*/

// auto updater data and code :)

var script_version = "0.2.17";

var script_name = "Profile Viewer";

var wiki_page= "http://wiki.urbandead.com/index.php/User:Viktor_Suvorov/Profile_Viewer";
var wiki_history= "http://wiki.urbandead.com/index.php?title=User:Viktor_Suvorov/Profile_Viewer&action=history";
var userscripts_page= "http://userscripts.org/scripts/show/23945";
var userscripts_install_page= "http://userscripts.org/scripts/source/23945.user.js";
var allowed_users= { "Viktor Suvorov" : true };


function startUpdateCheck()
    {
    GM_setValue( 'last_update_check', Math.round( ( new Date ).getTime()/1000 ) );

    GM_xmlhttpRequest({
        method: 'GET',
        url: wiki_page,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/html,text/xml',
        },
        onload: checkForNewVersion
        });
    }


function isOlder( curr_version, new_version )
    {
    var curr_tmp= curr_version.split( '.' );
    var new_tmp= new_version.split( '.' );
        
    var curr_cksum= 1000000*parseInt( curr_tmp[ 0 ] )+
        1000*parseInt( curr_tmp[ 1 ] )+parseInt( curr_tmp[ 2 ] );

    var new_cksum= 1000000*parseInt( new_tmp[ 0 ] )+
        1000*parseInt( new_tmp[ 1 ] )+parseInt( new_tmp[ 2 ] );
    
    return curr_cksum < new_cksum;
    }



function checkForNewVersion( req )
    {
    if( req.readyState == 4 )
        {
        if( req.status == 200 )
            {
            res_text= req.responseText.replace(/(\r|\n)/g, "");

            reg= /<span id="Profile_Viewer_latest_version">([\d]+.[\d]+.[\d]+)<\/span>/;
    
            matches= reg.exec( res_text );
                                        
            if( matches )
                {
                var latest_version= matches[ 1 ];
                
                if( latest_version != script_version )
                    if( isOlder( script_version, latest_version ) )
                        {
                        GM_xmlhttpRequest({
                            method: 'GET',
                            url: wiki_history,
                            headers: {
                                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                                'Accept': 'text/html,text/xml',
                            },
                            onload: verifyVersion
                            });
                        }
                }
            }
        else
            dump( "Error loading page\n" );
        }
    }


function verifyVersion( req )
    {
    if( req.readyState == 4 )
        {
        if( req.status == 200 )
            {
            res_text= req.responseText.replace(/(\r|\n)/g, "");

            // regex below matches the latest wiki update entry and extracts the username from it
            reg= /<input type="radio" value="[\d]+" checked="checked" name="diff" \/> <a href="\/index.php\?title=User:Viktor_Suvorov\/Profile_Viewer&amp;oldid=[\d]+" title="User:Viktor Suvorov\/Profile Viewer">[^<]+<\/a> <span class='history-user'><a href="\/index.php\/User:[^"]+" title="User:[^"]+">([^<]+)<\/a>/;

            matches= reg.exec( res_text );
            
            if( matches )
                {
                if( allowed_users[ matches[ 1 ] ] )
                    // so we have a new version and the update is authoritative
                    showUpdatePanel();
                }
            }
        else
            dump( "Error loading page\n" );
        }
    }



function showUpdatePanel()
    {
    displayPanelStatusMessage( 
        "<b>A new version of Profile Viewer is available!</b>"+
        "<br />You can download it from its <a href='"+userscripts_page+
        "'>usersripts page</a> or use a <a href='"+userscripts_install_page+
        "'>direct install link</a>. To see its changelog check "+
        "the <a href='"+wiki_page+"'>wiki page</a>. If you want to "+
        "disable update checks see User Script Commands menu."
        );
    }



if( GM_getValue( 'auto_updates', true ) )
    {
    var last_update_check= parseInt( GM_getValue( 'last_update_check', 0 ) );
    var current_time= Math.round( ( new Date ).getTime()/1000 );
    
    if( current_time-last_update_check > 86400 ) // 24*60*60 (seconds)
        startUpdateCheck();
    }



function getElementByClass( node, class, tag ) 
    {
    if( tag == null )
        tag = "*";

    var els= node.getElementsByTagName( tag );

    for ( itr= 0; itr < els.length; itr++ )
       if( els[ itr ].className == class )
            return els[ itr ];

    return null;
    }











var is_running= false;
var timeout;


var abs_panel_position;
var abs_panel_width;

var profile_requested= false;
var profile_timeout;


var loaded_id;
var loaded_name;

var player_cache= Array();
var static_cache_loaded= false;

var cache_clean= true;
var player_class;

var displayed_player_id;
var current_state;

var display_mode= parseInt( GM_getValue( 'displayed_tab', 1 ) );

var view_mode= "standard";

var ud_domain= document.domain;

var is_iw= false;

var tab_open_mode= GM_getValue( "link_open_mode", false );

if( ( ud_domain == "iwrecords.urbandead.info" ) || 
    ( ud_domain == "www.iwrecords.urbandead.info" ) )
    {
    ud_domain= GM_getValue( "default_ud_domain", "www.urbandead.com" );
    is_iw= true;
    }


function udPlayer( 
    pl_id, 
    pl_name, 
    pl_profile,
    pl_group,
    pl_joined,
    pl_level,
    pl_xp,
    pl_class,
    pl_state,
    pl_clothes,
    pl_human_skills,
    pl_zambah_skills,
    pl_real_name,
    pl_page_link
    )
    {
    this.character= pl_name;
    this.udid= pl_id;
    this.desc= pl_profile;
    this.group= pl_group;
    this.level= pl_level;
    this.joined= pl_joined;
    this.clothes= pl_clothes;
    this.xp= pl_xp;
    this.class= pl_class;
    this.state= pl_state;
    this.human_skills= pl_human_skills;
    this.zambah_skills= pl_zambah_skills;
    this.real_name= pl_real_name;
    this.page_link= pl_page_link;
    

    time= new Date();
    this.created= time.getTime();
    this.cache_hits= 0;
    }


function loadProfile( id_copy )
    {
    GM_xmlhttpRequest({
        method: 'GET',
        url: "http://"+ud_domain+"/profile.cgi?id="+id_copy,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/html,text/xml',
        },
        onload: function( req, id_copy )
            {
            if( req.readyState == 4 )
                {
                if( req.status == 200 )
                    {
                    res_text= req.responseText.replace(/(\r|\n)/g, "");
                    
                    var reg= /(profile.cgi\?mode=edit&id=|contacts.cgi\?add=)([^"]{1,64})/;
                    var matches= reg.exec( res_text );

                    var curr_id= matches[ 2 ];

    
                    reg= /<td class="gp" rowspan="?2"? colspan="?2"?><b>(.*?)<\/b>/;
    
                    matches= reg.exec( res_text );
                    
                    var player_desc;
                    
                    if( matches )
                        {
                        player_desc= matches[ 1 ];
                        
                        reg= /((http:\/\/|www\.)([a-z0-9\-]{3,63}\.[a-z]{2,5})([^ <]*))/gi;
                        player_desc= player_desc.replace( reg, "<a href='$1'>$1</a>" );

                        player_desc= player_desc.replace( /a href='www./gi, "a href='http://www." );
                        }
                    else
                        player_desc= '';
    
                    reg= /<p><b>Wearing:<\/b>([^<]*)<\/p>/;
                    matches= reg.exec( res_text );
                    
                    var player_clothes;
                    
                    if( matches )
                        player_clothes= matches[ 1 ];
                    else
                        player_clothes= '';
    
                    var human_skills;
                    
                    // harman skills
                    reg= /<td class="slim" rowspan=10>Skills:<\/td><td rowspan=10 class="slam">(.*?)((<hr>)|(<\/td><\/tr>))/;
                    matches= reg.exec( res_text );
                    if( matches )
                        human_skills= matches[ 1 ];
                    else
                        human_skills= '';
    
                    var pr_h_skills= human_skills;

                    do {
                        pr_h_skills= human_skills;
                        human_skills= human_skills.replace( /(<ul><\/ul>)|(\((.*?)\))|(<b>)|(<\/b>)/g, "" );
                        
                        }
                    while( pr_h_skills != human_skills );

    
                    var zambah_skills;
                    reg= /<hr>(.*?)<\/td><\/tr>/;
                    matches= reg.exec( res_text );
                    if( matches )
                        zambah_skills= matches[ 1 ];
                    else
                        zambah_skills= '';

                    zambah_skills= zambah_skills.replace( /(<ul><\/ul>)|(\((.*?)\))|(<b>)|(<\/b>)/g, "" );
    
                    zambah_skills= zambah_skills.replace( /out into the street\.\)/, "" );
    
                    reg= /<span class="ptt">([A-Z0-9a-z' ]{1,64})<\/span>.*Class:<\/td><td class="slam">([A-Z][a-z]{1,20})<\/td>.*Level:<\/td><td class="slam">([0-9]{1,2})<\/td>.*XP:<\/td><td class="slam">([0-9]{1,6})<\/td>.*Group:<\/td><td class="slam">([^<]{1,64})<\/td>.*Joined:<\/td><td class="slam">(200[0-9]{1}\-[0-9]{2}\-[0-9]{2} [0-9]{2}\:[0-9]{2}\:[0-9]{2})/;

    
                    matches= reg.exec( res_text );
    
                    str_id= "_"+curr_id;
    
                    pl_name= matches[ 1 ];
                    pl_class= matches[ 2 ];
                    pl_level= matches[ 3 ];
                    pl_xp= matches[ 4 ];
                    pl_group= matches[ 5 ];
                    pl_joined= matches[ 6 ];
    
                    var r_name= "";
                    var w_link= "";

                    reg= /<td class="slim">Real name:<\/td><td><a class="plink" href="([^"]*)">([^<]*)<\/a><\/td><\/tr>/;
                    matches= reg.exec( res_text );

                    if( matches )
                        {
                        r_name= matches[ 2 ];
                        w_link= matches[ 1 ];
                        }

                    reg= /<td class="slim">Real name:<\/td><td>([^<]*)<\/td><\/tr>/;
                    matches= reg.exec( res_text );

                    if( matches )
                        r_name= matches[ 1 ];
 
                    reg= /<td class="slim">Web page:<\/td><td><a class="plink" href="([^"]*)">link<\/a><\/td>/;
                    matches= reg.exec( res_text );

                    if( matches )
                        w_link= matches[ 1 ];


                    var surv_skills= human_skills.match( /<li>([^<]{7})/g );
                    
                    var surv_skill_count= 0;

                    if( surv_skills )
                        surv_skill_count= surv_skills.length;
                    
                    pl_level= ""+pl_level+" ("+surv_skill_count+"s/"+( pl_level-surv_skill_count )+"z)";

                    state= "survivor";
    
                    if( pl_class == "Zombie" )
                        {
                        state= "zombie";
                        // if it's a zombie we're checking for rot
                        
                        if( zambah_skills.match( /Brain Rot/ ) )
                            pl_class= "Zombie (rotter)";
                        }
                    else
                        {
                        if( res_text.match( /<td class="slim">Died:<\/td>/ ) )
                            pl_class+= " (dead/revivifying)";
                        }

                    var player= new udPlayer( 
                        curr_id,
                        pl_name,
                        player_desc,
                        pl_group,
                        pl_joined,
                        pl_level,
                        pl_xp,
                        pl_class,
                        state,
                        player_clothes,
                        human_skills,
                        zambah_skills,
                        r_name,
                        w_link
                        );
                                        
                    player_cache[ str_id ]= player;
                    cache_clean= false;
                    displayProfile( player_cache[ str_id ] );
                    }
                else
                    dump( "Error loading page\n" );
                }
            }
        });
    }



function cancelPendingRequest()
    {
    if( profile_requested )
        window.clearTimeout( profile_timeout );
    profile_requested= false;

    }



function requestShowProfile( event )
    {
    player= event.target;
    
    var class_node;
    var player_link;

    if( player.childNodes[ 0 ].childNodes[ 0 ] )
        player_link= player.childNodes[ 0 ];
    else
        player_link= player;

    class_node= player_link;

    player_class= false;
    

    // loaded_name= player_link.childNodes[ 0 ].nodeValue;

    if( player_link.nodeName == "B" )
        {
        player_link= player_link.parentNode;
        class_node= player_link;
        }

    if( player_link.nodeName == "SPAN" )
        {
        player_link= player_link.parentNode;
        }
    
    if( class_node.className )
        {
        player_class= class_node.className.match( "con[0-9]" );
        }

    tmp= player_link.href.split( "=" );
    loaded_id= parseInt( tmp[ 1 ] );

    
    hover_time= GM_getValue( "hover_time", 300 );

    if( profile_requested )
        window.clearTimeout( profile_timeout );


    profile_timeout= window.setTimeout( 
            function(){
                showProfile( loaded_id );
                },
            hover_time
            );
    profile_requested= true;
    }




function changeContactType( player_id, new_type )
    {
    var req = new XMLHttpRequest();
    params= "c"+player_id+"="+new_type;

    GM_xmlhttpRequest({
        method:     "POST",
        url:         "http://"+ud_domain+"/contacts.cgi",
        headers:    { 'Content-type':'application/x-www-form-urlencoded' },
        data:        encodeURI( params ),
        onload: function( req )
            {
            if( req.readyState == 4 )
                {
                if( req.status == 200 )
                    {
                
                    reg= /<p>Changes applied.<\/p>/;
    
                    if( reg.test( req.responseText ) )
                        {
                        document.getElementById( "statusmsg" ).firstChild.nodeValue= 'Done (reload UD page to see changes)';
                        
                        return;
                        }
                    document.getElementById( "statusmsg" ).firstChild.nodeValue= 'Unknown error.';
                        
                    }
    
                document.getElementById( "statusmsg" ).firstChild.nodeValue= "Error: UD server isn't responding.";
                }
            }
        });
    }



function addPlayerToContacts( event )
    {
    action_str= event.target.id;


    document.getElementById( "statusmsg" ).firstChild.nodeValue= 'Adding to contacts...';

    tmp= action_str.split( "_" );

    pl_id= tmp[ 0 ];
    action_id= tmp[ 1 ];

    GM_xmlhttpRequest({
        method: 'GET',
        url: "http://"+ud_domain+"/contacts.cgi?add="+pl_id,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/html,text/xml',
        },
        onload: function( req )
            {
            if( req.readyState == 4 )
                {
                if( req.status == 200 )
                    {
                
                    reg= /<p>Added to contacts.<\/p>/;
    
                    if( reg.test( req.responseText ) )
                        {
                        document.getElementById( "statusmsg" ).firstChild.nodeValue= 'Contact added, setting properties...';
    
    
                        changeContactType( pl_id, action_id );
                        return;
                        }
    
                    erreg= /<p>Sorry, you can't have more than 150 contacts.<\/p>/;
                    if( erreg.test( req.responseText ) )
                        {
                        document.getElementById( "statusmsg" ).firstChild.nodeValue= 'Error: you already have 150 contacts.';
                        return;
                        }
                    }
    
                document.getElementById( "statusmsg" ).firstChild.nodeValue= "Error: UD server isn't responding.";
                }
            }
        });
    }


function changeContact( event )
    {
    document.getElementById( "statusmsg" ).firstChild.nodeValue= 'Setting properties...';

    action_str= event.target.id;
    tmp= action_str.split( "_" );
    pl_id= tmp[ 0 ];
    action_id= tmp[ 1 ];

    changeContactType( pl_id, action_id );

    }




function displayContactPanel( cont_class, player_id )
    {
    cnt_panel= document.getElementById( "playercont" );

    
    while ( cnt_panel.childNodes.length >= 1 )
        cnt_panel.removeChild( cnt_panel.firstChild );      
        
    if( ( cont_class ) && ( !is_iw ) )
        {
        cnt_panel.appendChild( document.createTextNode( "Change:" ) );
        for( itr= 1; itr <= 9; itr++ )
            {
            if( cont_class != ( "con"+itr ) )
                {
    
                add_link= document.createElement( "a" );
                add_link.addEventListener( "click", changeContact , true );
                add_link.className= "con"+itr;
                add_link.id= ""+player_id+"_"+itr;
                add_link.href= "javascript:void(0)";    // it should look like a link
                add_link.appendChild( document.createTextNode( " \u2588" ) );
                cnt_panel.appendChild( add_link );
                }
            }

        add_link= document.createElement( "a" );
        add_link.addEventListener( "click", changeContact , true );
        add_link.id= ""+player_id+"_10";
        add_link.href= "javascript:void(0)";
        add_link.appendChild( document.createTextNode( " [ignore]" ) );
        cnt_panel.appendChild( add_link );


        add_link= document.createElement( "a" );
        add_link.addEventListener( "click", changeContact , true );
        add_link.id= ""+player_id+"_d";
        add_link.href= "javascript:void(0)";
        add_link.appendChild( document.createTextNode( " [delete]" ) );
        cnt_panel.appendChild( add_link );


        }
    else
        {
        cnt_panel.appendChild( document.createTextNode( "Add:" ) );
        for( itr= 1; itr <= 9; itr++ )
            {


            add_link= document.createElement( "a" );

            add_link.addEventListener( "click", addPlayerToContacts , true );

            add_link.className= "con"+itr;
            add_link.id= ""+player_id+"_"+itr;
            add_link.href= "javascript:void(0)";
            add_link.appendChild( document.createTextNode( " \u2588" ) );
            cnt_panel.appendChild( add_link );
            }

        add_link= document.createElement( "a" );

        add_link.addEventListener( "click", addPlayerToContacts , true );

        add_link.id= ""+player_id+"_10";
        add_link.href= "javascript:void(0)";
        add_link.appendChild( document.createTextNode( " [ignore]" ) );
        cnt_panel.appendChild( add_link );

        }



    }



function displayProfile( player )
    {
    document.getElementById( "tabpanel" ).style.display= 'block';

    document.getElementById( "statusdisplay" ).firstChild.nodeValue= "";
    


    document.getElementById( "playername" ).firstChild.nodeValue= player.character;

    if( player_class )
        document.getElementById( "playername" ).className= player_class;
    else
        document.getElementById( "playername" ).className= "";

    document.getElementById( "playername" ).href= "http://"+ud_domain+"/profile.cgi?id="+player.udid;

    document.getElementById( "playername" ).setAttribute( "style","font-weight:bold;");

    if( player.desc.length == 0 )
        {
        document.getElementById( "playerdesc" ).style.fontStyle= "italic"

        document.getElementById( "playerdesc" ).innerHTML= 'A non-descript '+player.state+'.';
        }
    else
        {
        document.getElementById( "playerdesc" ).style.fontStyle= "normal";

        document.getElementById( "playerdesc" ).innerHTML= player.desc;
        }

    document.getElementById( "playerjoined" ).firstChild.nodeValue= "Joined: "+player.joined;

    document.getElementById( "playerlevel" ).firstChild.nodeValue= "Level: "+player.level;

    if( player.group == "none" )
        {

        document.getElementById( "playergroup" ).firstChild.nodeValue= "Group: none";

        document.getElementById( "playergrouplink" ).firstChild.nodeValue= "";
        }
    else
        {
        document.getElementById( "playergroup" ).firstChild.nodeValue= "Group: ";

        document.getElementById( "playergrouplink" ).firstChild.nodeValue= player.group;
        document.getElementById( "playergrouplink" ).href= 
            "http://wiki.urbandead.com/index.php/"+player.group.replace( / /g, "_" );
        }


    if( player.real_name == "" )
        {
        if( player.page_link == "" )
            {
            document.getElementById( "playerrealname" ).firstChild.nodeValue= "";

            document.getElementById( "playerpagelink" ).firstChild.nodeValue= "";
            }
        else
            {
            document.getElementById( "playerrealname" ).firstChild.nodeValue= 
                "Web page: ";

            document.getElementById( "playerpagelink" ).firstChild.nodeValue= "link";
            document.getElementById( "playerpagelink" ).href= player.page_link;
            }
        }
    else
        {
        
        if( player.page_link == "" )
            {
            document.getElementById( "playerrealname" ).firstChild.nodeValue= 
                "Real name: "+player.real_name;
            document.getElementById( "playerpagelink" ).firstChild.nodeValue= "";

            }
        else    
            {
            document.getElementById( "playerrealname" ).firstChild.nodeValue= 
                "Real name: ";

            document.getElementById( "playerpagelink" ).firstChild.nodeValue= player.real_name;
            document.getElementById( "playerpagelink" ).href= player.page_link;
            }
        }



    document.getElementById( "playerxp" ).firstChild.nodeValue= "XP: "+player.xp;

    document.getElementById( "statusmsg" ).firstChild.nodeValue= '';

    document.getElementById( "playerclass" ).firstChild.nodeValue= "Class: "+player.class;


    current_state= 0;
    displayed_player_id= player.udid;

    showProfileControls();


    switch( display_mode )
        {
        case 1: showDescription(); break;
        case 2: showHarmanSkills(); break;
        case 3: showZambahSkills(); break;
        case 4: showClothes(); break;
        case 5: showAttackLinks(); break;
        }

    displayContactPanel( player_class, player.udid );    
    }



function displayPanelStatusMessage( message )
    {
    document.getElementById( "tabpanel" ).style.display= 'none';

    document.getElementById( "statusdisplay" ).innerHTML= message;

    document.getElementById( "playername" ).firstChild.nodeValue= "";

    document.getElementById( "playername" ).href= "";

    document.getElementById( "playername" ).style.fontWeight= "normal"

    document.getElementById( "playerdesc" ).innerHTML= '';

    document.getElementById( "playergroup" ).firstChild.nodeValue= '';

    document.getElementById( "playergrouplink" ).firstChild.nodeValue= "";

    document.getElementById( "playerjoined" ).firstChild.nodeValue= '';

    document.getElementById( "playerlevel" ).firstChild.nodeValue= '';

    document.getElementById( "playerxp" ).firstChild.nodeValue= '';
    document.getElementById( "playerclass" ).firstChild.nodeValue= '';


    document.getElementById( "playerrealname" ).firstChild.nodeValue= '';
    document.getElementById( "playerpagelink" ).firstChild.nodeValue= '';


    cnt_panel= document.getElementById( "playercont" );
    while ( cnt_panel.childNodes.length >= 1 )
        cnt_panel.removeChild( cnt_panel.firstChild );   

    document.getElementById( "statusmsg" ).firstChild.nodeValue= '';

    current_state= -1;
    }





function showProfileControls()
    {
    document.getElementById( "playergroup" ).style.display= 'block';
    document.getElementById( "playerjoined" ).style.display= 'block';
    document.getElementById( "playerlevel" ).style.display= 'block';
    document.getElementById( "playerxp" ).style.display= 'block';
    document.getElementById( "playerclass" ).style.display= 'block';
    document.getElementById( "playerrealname" ).style.display= 'block';
    }

function hideProfileControls()
    {
    document.getElementById( "playergroup" ).style.display= 'none';
    document.getElementById( "playerjoined" ).style.display= 'none';
    document.getElementById( "playerlevel" ).style.display= 'none';
    document.getElementById( "playerxp" ).style.display= 'none';
    document.getElementById( "playerclass" ).style.display= 'none';
    document.getElementById( "playerrealname" ).style.display= 'none';
    }



function showClothes()
    {
    showProfileControls();
    player= player_cache[ "_"+displayed_player_id ];

    if( player.clothes.length == 0 )
        {
        document.getElementById( "playerdesc" ).style.fontStyle= "italic"

        document.getElementById( "playerdesc" ).innerHTML= 
            player.character+' appears to be naked.';
        }
    else
        {
        document.getElementById( "playerdesc" ).style.fontStyle= "normal";

        document.getElementById( "playerdesc" ).innerHTML= 
            "Wearing: "+player.clothes;
        }

    display_mode= 4;
    activateOpenInTabs();
    }


function showHarmanSkills()
    {
    hideProfileControls();
    player= player_cache[ "_"+displayed_player_id ];

    if( player.human_skills.length == 0 )
        {
        document.getElementById( "playerdesc" ).style.fontStyle= "italic"

        document.getElementById( "playerdesc" ).innerHTML= 'No survivor skills.';
        }
    else
        {
        document.getElementById( "playerdesc" ).style.fontStyle= "normal";

        document.getElementById( "playerdesc" ).innerHTML= player.human_skills;
        }
    
    display_mode= 2;
    activateOpenInTabs();
    }


function showZambahSkills()
    {
    hideProfileControls();
    player= player_cache[ "_"+displayed_player_id ];

    if( player.zambah_skills.length == 0 )
        {
        document.getElementById( "playerdesc" ).style.fontStyle= "italic"

        document.getElementById( "playerdesc" ).innerHTML= 'No zombie skills.';
        }
    else
        {
        document.getElementById( "playerdesc" ).style.fontStyle= "normal";

        document.getElementById( "playerdesc" ).innerHTML= player.zambah_skills;
        }

    display_mode= 3;
    activateOpenInTabs();
    }


function showDescription()
    {
  
    player= player_cache[ "_"+displayed_player_id ];
    

    showProfileControls();

    if( player.desc.length == 0 )
        {
        document.getElementById( "playerdesc" ).style.fontStyle= "italic"

        document.getElementById( "playerdesc" ).innerHTML= 'A non-descript '+player.state+'.';
        }
    else
        {
        document.getElementById( "playerdesc" ).style.fontStyle= "normal";

        document.getElementById( "playerdesc" ).innerHTML= player.desc;
        // now - small dom tree parsing in order to break text
        

        var tnodes= document.getElementById( "playerdesc" ).childNodes;

        for( itr= 0; itr < tnodes.length; itr++ )
            {
            var cnode;
            
            if( tnodes[ itr ].nodeName == '#text' )
                cnode= tnodes[ itr ];
            else if( tnodes[ itr ].nodeName == 'A' )
                cnode= tnodes[ itr ].firstChild;              

            if( -1 != cnode.nodeValue.search( /[^ ]{30,500}/ ) )
                cnode.nodeValue= cnode.nodeValue.split("").join( String.fromCharCode( 8203 ) );
            }
        }

    display_mode= 1;
    activateOpenInTabs();
    }



function showAttackLinks()
    {
    showProfileControls();
    player= player_cache[ "_"+displayed_player_id ];

    var gname= player.character.replace( / /g, "+" );


    link_text= "Attack "+player.character+" with: <br />"+
        "<a href='http://"+ud_domain+"/map.cgi?target="+player.udid+"&weapon=pistol'>[a pistol]</a> "+
        "<a href='http://"+ud_domain+"/map.cgi?target="+player.udid+"&weapon=shotgun'>[a shotgun]</a> "+
        "<a href='http://"+ud_domain+"/map.cgi?target="+player.udid+"&weapon=axe'>[an axe]</a> "+
        "<a href='http://"+ud_domain+"/map.cgi?target="+player.udid+"&weapon=knife'>[a knife]</a><br /><br />"+
        "Attack "+player.character+" with: <br />"+
        "<a href='http://"+ud_domain+"/map.cgi?target="+player.udid+"&weapon=teeth'>[teeth]</a>  "+
        "<a href='http://"+ud_domain+"/map.cgi?target="+player.udid+"&weapon=maul'>[hands]</a> "+
        "<a href='http://"+ud_domain+"/map.cgi?target="+player.udid+"&weapon=headbutt'>[head]</a><br /><br />"+
        "<a href='http://www.ud-malton.info/rg/i/"+player.udid+"'>Look for "+player.character+" in rogues gallery</a><br /><br />"+
        "<a href='http://www.google.com/search?q="+gname+"'>Google search for "+player.character+"</a>";

    document.getElementById( "playerdesc" ).style.fontStyle= "normal";

    document.getElementById( "playerdesc" ).innerHTML= link_text;

    display_mode= 5;
    activateOpenInTabs();
    }




function showProfile( player_id )
    {
    document.getElementById( "playerdesc" ).firstChild.nodeValue= "";
    document.getElementById( "playergroup" ).firstChild.nodeValue= "";


    str_id= "_"+player_id;

    if( player_cache[ str_id ] )
        {
        
        displayProfile( player_cache[ str_id ] );
        }
    else
        {
        displayPanelStatusMessage( "Loading data..." );
        loadProfile( player_id );
        }
    }



function handlePlayers()
    {
    var all_links= document.getElementsByTagName( "A" );

    var link_count= all_links.length;
    
    reg= /http:\/\/(www\.)?urbandead\.com\/profile\.cgi\?id=[0-9]{1,10}/;

    for( itr= 0; itr < link_count; itr++ )
        {

        if( reg.test( all_links[ itr ].href ) )
            {
            all_links[ itr ].addEventListener( "mouseover", requestShowProfile , true );
            all_links[ itr ].addEventListener( "mouseout", cancelPendingRequest, true );
            }

        }

    }




window.addEventListener(
    'load',
    function() 
        { 
        addProfilePanel();
        handlePlayers();
        },
    true
    );


function correctPlayerPanelPosition()
    {
    if( abs_panel_position < window.pageYOffset )
        document.getElementById( "player-panel" ).style.top= 
            ""+( window.pageYOffset-abs_panel_position+10 )+"px";
    else
        document.getElementById( "player-panel" ).style.top= "1px";
    }


function switchVisibilityMode()
    {
    

    if( !( GM_getValue( "keep_panel_visible", false ) ) )
        {
        GM_setValue( "keep_panel_visible", true );
        correctPlayerPanelPosition();
        window.alert( "Profile Viewer panel will now try to stay visible." );
        window.addEventListener( 'scroll', correctPlayerPanelPosition, false );
        }
    else
        {
        GM_setValue( "keep_panel_visible", false );
        document.getElementById( "player-panel" ).style.top= "1px;";
        window.alert( "Profile Viewer panel won't try to stay visible anymore." );
        window.removeEventListener( 'scroll', correctPlayerPanelPosition, false );
        }
    }



function addPanelStyles()
    {
    var rules= (<r><![CDATA[
    a.replink { display: block; }
    a.replink:hover { background-color: #223322; }
    a.replink:link { background-color: #667766; }
    div#playerdesc ul {margin: 0px; padding: 0px 0px 0px 10px;}
    div#playerdesc > ul { font-size: 95%; padding: 0px 3px 3px 30px !important; }
    ]]></r>).toString();

    var head= document.getElementsByTagName('head')[0];
    var style= document.createElement('style');
    style.type= 'text/css';
    style.innerHTML= rules;
    head.appendChild( style );
    }


function openLinkInNewTab( event )
    {
    if( tab_open_mode )
        {

        var panel_link= event.target;

        GM_openInTab( panel_link.href );
        event.preventDefault();
        }
    }



function activateOpenInTabs()
    {
    var panel_links= document.getElementById( "player-panel" ).getElementsByTagName( "A" );

    for( itr= 0; itr < panel_links.length; itr++ )
        if( panel_links[ itr ].href.substring( 0, 7 ) == "http://" )
            panel_links[ itr ].addEventListener( "click", openLinkInNewTab, true );
    }





function switchTabOpenMode()
    {
    if( !( GM_getValue( "link_open_mode", false ) ) )
        {
        GM_setValue( "link_open_mode", true );
        tab_open_mode= true;
        window.alert( "Profile Viewer panel will now open all links in new tabs." );
        }
    else
        {
        GM_setValue( "link_open_mode", false );
        tab_open_mode= false;
        window.alert( "Profile Viewer panel will now open all links in this window." );
        }
    }



function toggleAutoUpdates()
    {
    if( !( GM_getValue( "auto_updates", true ) ) )
        {
        GM_setValue( "auto_updates", true );
        window.alert( "Profile Viewer panel will now check for updates periodically." );
        }
    else
        {
        GM_setValue( "auto_updates", false );
        window.alert( "Profile Viewer panel won't check for updates anymore." );
        }
    }



function changeHoverTime()
    {
    var curr_time= parseInt( GM_getValue( "hover_time", 300 ) );
    
    var new_time= parseInt( window.prompt(
        "Currently Profile Viewer waits "+curr_time+" miliseconds before loading a "+
        "profile. You can change this value here. Enter a new value (in miliseconds) "+
        "below, or press cancel if you don't want to change it.",
        curr_time
        ) );
    
    if( new_time > 0 )
        {
        GM_setValue( "hover_time", new_time ); 
        window.alert( "Hover time changed." );
        }
    }



function updateUDDomain( new_domain )
    {
    GM_setValue( "default_ud_domain", new_domain );
    window.alert( "Profile Viewer will now use `"+new_domain+
        "` to contact Urban Dead from IWitness pages." );
    ud_domain= new_domain;

    // if user if currently seeing a page with attack links we have to update it too
    if( display_mode == 5 )
        showAttackLinks();
    }



function changeUDDomain()
    {
    var new_domain= window.prompt(
        "Currently Profile Viewer uses `"+ud_domain+"` to contact Urban Dead when "+
        "browsing IWitness pages. Below you may specify a new domain to use. "+
        "Suggested domains are `www.urbandead.com` and `urbandead.com`.",
        ud_domain
        );

    if( new_domain.match( /^(www\.)?urbandead\.com$/ ) )
        {
        updateUDDomain( new_domain );
        }
    else
        {
        if( window.confirm( "Entered domain (`"+new_domain+"`) doesn't look "+
            "like a valid Urban Dead address. Please confirm if you want to use "+
            "it anyway (invalid UD domain will cause errors in Profile Viewer)." ) )
            {
            updateUDDomain( new_domain );
            }
        else
            {
            window.alert( "Domain not changed." );
            }
        }
    }


function addProfilePanel()
    {
    addPanelStyles();

    // if our panel already exists we remove it, it's mostly for iwitness, but there
    // are also some other reasons (like UDeLorean script)

    if( document.getElementById( "statusdisplay" ) )
        {
        panel= document.getElementById( "statusdisplay" ).parentNode;
        panel.parentNode.removeChild( panel );
        }


    player_panel= document.createElement( "div" );
  
    player_panel.className= "gt";

    player_panel.setAttribute(
        "style",
        "padding:20px 8px 15px 8px; margin-top:18px;width:auto;min-height:100px;height:auto;font-size:smaller;position:relative;top:1px;left:0px;text-align: left;"
        );
    


    player_panel.id= "player-panel";

    // if we're opening an iwitness page we use a high z-index, to cover all incorrectly placed
    // UD buttons and other extensions :)
    if( is_iw )
        player_panel.style.zIndex= "100";
 

    player_panel.innerHTML= '<div id="statusdisplay">Hover your mouse cursor over a player to load profile data.</div><div style="text-align: center; font-size: 110%; margin-bottom: 5px;"><a id="playername"> </a></div><div id="playergroup"> <a id="playergrouplink"> </a></div><div id="playerid"> </div><div id="playerlevel"> </div><div id="playerxp"> </div><div id="playerclass"> </div><div id="playerjoined"> </div><div id="playerrealname"> <a id="playerpagelink"> </a></div><br/><div style="text-align: justify;" id="playerdesc"> </div><br/><div id="playercont"> </div><div id="statusmsg"> </div><div style="font-size: smaller; position: absolute; right: 0px; top: 0px; text-align: justify; display: none;" id="tabpanel"><a href="javascript:void(0)" id="pppr">[profile]</a> <a href="javascript:void(0)" id="pphs">[human skills]</a> <a href="javascript:void(0)" id="ppzs">[zombie skills]</a> <a href="javascript:void(0)" id="ppcl">[clothes]</a> <a href="javascript:void(0)" id="ppln">[links]</a></div>';


    for( itr= 0; itr < document.body.childNodes.length; itr++ )
        if( document.body.childNodes[ itr ].className == "fm" )
            {
            view_mode= "udtoolbar_fixed";
            document.body.childNodes[ itr ].appendChild( player_panel );
            break;
            }



    if( view_mode == "standard" )
        {
        left_panel= getElementByClass( document, "cp", "td" );
        node_count= left_panel.childNodes.length;


        for( itr= 0; itr <= node_count; itr++ )
            {
            if( ( left_panel.childNodes[ itr ] == undefined ) ||
                ( left_panel.childNodes[ itr ].firstChild == undefined ) || 
                ( left_panel.childNodes[ itr ].firstChild.firstChild == undefined ) )
                continue;

            if( left_panel.childNodes[ itr ].firstChild.firstChild.nodeValue == "Enabled: " )
                {
                view_mode= "udtool";
                // so - we have udtool 
                left_panel.insertBefore( player_panel ,left_panel.childNodes[ itr ] );
                break;
                }
            }

        if( view_mode == "standard" )
            left_panel.appendChild( player_panel );
        }


    abs_panel_position= player_panel.offsetTop;

    if( view_mode != "udtoolbar_fixed" )
        {
        GM_registerMenuCommand( 
            'Profile Viewer: Toggle "Stay-Visible" option', 
            switchVisibilityMode
            );

        if( GM_getValue( "keep_panel_visible", false ) )
            window.addEventListener( 'scroll', correctPlayerPanelPosition, false );  
        }

    GM_registerMenuCommand(
        'Profile Viewer: Toggle "Links-in-Tabs" option',
        switchTabOpenMode
        );

    GM_registerMenuCommand(
        'Profile Viewer: Change mouse hover time',
        changeHoverTime
        );

    if( is_iw )
        {
        GM_registerMenuCommand(
            'Profile Viewer: Change default Urban Dead domain',
            changeUDDomain
            );
        }

    GM_registerMenuCommand(
        'Profile Viewer: Toggle auto update monitor',
        toggleAutoUpdates
        );


    GM_registerMenuCommand(
        'Profile Viewer: Check for updates',
        startUpdateCheck
        );

    document.getElementById( "pppr" ).addEventListener( "click", showDescription, true );
    document.getElementById( "pphs" ).addEventListener( "click", showHarmanSkills, true );
    document.getElementById( "ppzs" ).addEventListener( "click", showZambahSkills, true );
    document.getElementById( "ppcl" ).addEventListener( "click", showClothes, true );
    document.getElementById( "ppln" ).addEventListener( "click", showAttackLinks, true );

    activateOpenInTabs();
    
    // ugly trick to lock the size of the panel
    player_panel.style.width= ""+( player_panel.clientWidth-16 )+"px";    
    }




window.addEventListener(
    'beforeunload',
    function()
        { 
        GM_setValue( 'displayed_tab', display_mode );
        },
    true
    );
