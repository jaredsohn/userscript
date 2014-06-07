//////////////////////////////////////////////////////////////////////////////
// UDeLorean script
// version 0.2.3
// 27 X 2008 
// Released as Public Domain
//////////////////////////////////////////////////////////////////////////////
// ==UserScript==
// @name           UDeLorean
// @namespace      http://wiki.urbandead.com/index.php/User:Viktor_Suvorov
// @description    Saves your recent UD history
// @include        http://www.urbandead.com/map.cgi*
// @include        http://urbandead.com/map.cgi*
// ==/UserScript==
//////////////////////////////////////////////////////////////////////////////


/*
    Release log:
        0.2.3 - Added a fancy search toolbar :)
        0.2.2 - Firefox 3 compatibility update. Also fixed one minor bug
        0.2.1 - Added an option to run load event after loading new records, should make other
                    scripts work
        0.2.0 - Rewritten storage engine, finally I can call it stable, added a layout fix option

        0.1.1 - Compatibility with various UD extensions (udtool, udtoolbar)
        0.1.0 - Initial release
*/



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



var script_name= "UDeLorean";
var script_version= "0.2.3";



var loaded_record= -1;
var current_source= '';
var loaded_id= 0;
var manual_load= false;

var history_window_open= false;

var found_ids= new Array();
var search_term= "";
var search_type="";

window.addEventListener( 'load', initUDeLorean, true );


function fireWindowOnload()
    {
    if( GM_getValue( "fire_onload", false ) )
        {
        manual_load= true;
        var load_event = document.createEvent( 'HTMLEvents' );
        load_event.initEvent( "load", true, false );
        window.dispatchEvent( load_event );
        }
    }


function attemptToFixLayout()
    {
    if( GM_getValue( "fix_udtoolbar_layout", false ) )
        {
        var map_table;
        var fixed_map= false;
        var left_panel;

        for( itr= 0; itr < document.body.childNodes.length; itr++ )
            if( document.body.childNodes[ itr ].className == "fm" )
                {
                left_panel= document.body.childNodes[ itr ];
                fixed_map= true;
                break;
                }

        if( !fixed_map )
            {
            left_panel= getElementByClass( document, "cp", "td" );
            }
        
        var status_panel= getElementByClass( left_panel, "gt", "p" );

        if( status_panel.childNodes.length == 0 ) // we'll try to fix...
            {

            var curr_elem= status_panel.nextSibling;

            while( curr_elem.tagName != "P" )
                {
                var next_elem= curr_elem.nextSibling;
                status_panel.appendChild( curr_elem );
                curr_elem= next_elem;
                }
            }
        }
    }


function resetHistory()
    {
    var answer= window.confirm( 
        "Removing all stored history data. Do you want to continue?"
        );

    if( answer )
        {
        var ages= ( GM_getValue( "age_queue" ) ).split( "," );

        for( itr= 0; itr < ages.length; itr++ )
            {
            GM_setValue( 'cache_'+ages[ itr ], "" );
            GM_setValue( 'cache_hd_'+ages[ itr ], "" );
            }

        var cache_size= GM_getValue( "cache_size" );
            
        var free_queue= new Array();
        var length_cache= new Array();

        for( itr= 0; itr < cache_size; itr++ )
            {
            free_queue[ itr ]= itr;
            length_cache[ itr ]= 0;
            }

        GM_setValue( "free_queue", free_queue.join( "," ) );
        GM_setValue( "length_cache", length_cache.join( "," ) );
        GM_setValue( "age_queue", "" );

        window.alert( "Cleared all data." );
        }
    else
        window.alert( "Nothing changed." );
    }


function restoreCurrentPage()
    {
    closeHistoryWindow();

    loaded_record= -1;
    document.body.innerHTML= current_source;
    attemptToFixLayout();
    fireWindowOnload();
    }


function changeBufferSize()
    {
    var curr_limit= parseInt( GM_getValue( 'cache_size' ) );
    
    var tmp_limit= parseInt( window.prompt(
        "UDeLorean stores a limited number of last page refreshes (currently "+
            curr_limit+"). You can change this limit, but decreasing it will remove "+
        "some stored data and may take a few seconds (depending on your machine speed). "+
        "You can enter a new limit below, or press cancel if you don't want to change it.",
        curr_limit
        ) );
    
    var new_limit= parseInt( tmp_limit );
    
    if( ( new_limit > 0 ) && ( new_limit != curr_limit ) )
        {
        window.alert( "Changing history size to "+new_limit+"." );

        GM_setValue( 'cache_size', new_limit );

        if( new_limit > curr_limit ) // sweet :)
            {
            var length_cache= ( GM_getValue( "length_cache" ) ).split( "," ); 
            var free_queue= ( GM_getValue( "free_queue" ) ).split( "," ); 
            
            if( free_queue[ 0 ] == "" )
                free_queue= new Array();

            for( itr= curr_limit; itr < new_limit; itr++ )
                {
                free_queue.push( itr );
                length_cache[ itr ]= 0;
                }
            
            GM_setValue( "free_queue", free_queue.join( "," ) );
            GM_setValue( "length_cache", length_cache.join( "," ) );
            }
        else  // not so sweet...
            {
            var length_cache= ( GM_getValue( "length_cache" ) ).split( "," ); 

            var free_queue= ( GM_getValue( "free_queue" ) ).split( "," );
            var age_queue= ( GM_getValue( "age_queue" ) ).split( "," ); 

            var new_free_queue= new Array();
            
            for( itr= 0; itr < free_queue.length; itr++ )
                if( free_queue[ itr ] < new_limit )
                    new_free_queue.push( free_queue[ itr ] );

            for( itr= 0; itr < curr_limit - new_limit; itr++ )
                {
                var curr= age_queue[ itr ];
                length_cache[ curr ]= 0;
                GM_setValue( "cache_"+curr, "" );
                GM_setValue( "cache_hd_"+curr, "" );
                
                if( curr < new_limit )
                    new_free_queue.push( curr );
                }

            var new_age_queue= new Array();

            for( itr= curr_limit - new_limit; itr < age_queue.length; itr++ )
                {
                var curr= age_queue[ itr ];
                if( curr < new_limit )
                    new_age_queue.push( curr );
                else
                    {
                    var idx= new_free_queue.pop();
                    
                    length_cache[ idx ]= length_cache[ curr ];
                    
                    GM_setValue( "cache_"+idx, GM_getValue( "cache_"+curr ) );
                    GM_setValue( "cache_hd_"+idx, GM_getValue( "cache_hd_"+curr ) );

                    GM_setValue( "cache_"+curr, "" );
                    GM_setValue( "cache_hd_"+curr, "" );
                    new_age_queue.push( idx );
                    }
                }

            length_cache.length= new_limit;

            GM_setValue( "length_cache", length_cache.join( "," ) ); 
            GM_setValue( "free_queue", new_free_queue.join( "," ) ); 
            GM_setValue( "age_queue", new_age_queue.join( "," ) ); 
            }

        }
    else
        {
        window.alert( "Nothing changed." );
        }
    
    }




function getLocation()
    {
    var map_table;
    var fixed_map= false;

    for( itr= 0; itr < document.body.childNodes.length; itr++ )
        if( document.body.childNodes[ itr ].className == "fm" )
            {
            map_table= ( document.body.childNodes[ itr ].getElementsByTagName( "table" ) )[ 0 ];
            fixed_map= true;
            break;
            }

    if( !fixed_map )
        {
        var main_table= ( document.body.getElementsByTagName( "table" ) )[ 0 ];

        map_table= ( main_table.getElementsByTagName( "table" ) )[ 0 ];
        }

    var fields= map_table.getElementsByTagName( "td" ); 

    var xloc= new Array();
    var yloc= new Array();

    var xas= new Array();
    var yas= new Array();

    var locname;
    
    for( itr= 0; itr < fields.length; itr++ )
        {
        if( fields[ itr ].className == "sb" )
            continue;
       

        var form_fields= fields[ itr ].getElementsByTagName( "input" );
        
        if( form_fields.length == 0 )
            continue;

        if( form_fields[ 0 ].type == "submit" )
            {
            locname= form_fields[ 0 ].value.replace( /(\r|\n)/g, " " );
            locname= locname.replace( /  /g, " " );
            locname= locname.replace( /\s+$/g, "" );
            }
        else
            {
            var coords= form_fields[ 0 ].value.split( "-" );
            xloc[ xloc.length++ ]= coords[ 0 ];
            yloc[ yloc.length++ ]= coords[ 1 ];
            xas[ ""+coords[ 0 ] ]= 0;
            yas[ ""+coords[ 1 ] ]= 0;
            }
        }
    
    for( itr= 0; itr < xloc.length; itr++ )
        {
        xas[ xloc[ itr ] ]++;
        yas[ yloc[ itr ] ]++;
        }
    
    var ymin= 5;
    var yfnd;
    var xmin= 5;
    var xfnd;


    for( coord= xas.length-1; coord >= xas.length-4; coord-- )
        if( xas[ coord ] < xmin )
            {
            xmin= xas[ coord ];
            xfnd= coord;
            }


    for( coord= yas.length-1; coord >= yas.length-4; coord-- )
        if( yas[ coord ] < ymin )
            {
            ymin= yas[ coord ];
            yfnd= coord;
            }

    return[ locname, xfnd, yfnd ];
    }




function getUdHeader()
    {
    var loc_data= getLocation();
    return [ loc_data[ 0 ], loc_data[ 1 ], loc_data[ 2 ], document.lastModified ];
    }



function CurrentPage()
    {
    this.body= document.body.innerHTML;
    this.size= this.body.length;
    this.header= getUdHeader();
    }


function checkCache( UD_page )
    {
    var length_str= GM_getValue( "length_cache" );

    var lengths= length_str.split( "," );
    

    if( length_str.indexOf( UD_page.size ) == -1 )
        return -1;
    else
        {        
        for( itr= 0; itr < lengths.length; itr++ )
            {
            if( UD_page.size == lengths[ itr ] )
                {
                var cmp_header= GM_getValue( 'cache_hd_'+itr ).split( ';' ); 
                
                if( ( cmp_header[ 1 ] == UD_page.header[ 1 ] ) && 
                    ( cmp_header[ 2 ] == UD_page.header[ 2 ] ) &&
                    ( UD_page.body == GM_getValue( 'cache_'+itr ) ) )
                        return itr;
                }
            }
        }
    
    return -1;
    }




function executedBefore()
    {
    var ex_stat= GM_getValue( "free_queue", "no" );


    return !( ex_stat == "no" );
    }



function initUDeLoreanSettings()
    {
    var cache_size= 50;
    
    GM_setValue( "cache_size", cache_size );
    
    var free_queue= new Array();
    var length_cache= new Array();

    for( itr= 0; itr < cache_size; itr++ )
        {
        free_queue[ itr ]= itr;
        length_cache[ itr ]= 0;
        }

    GM_setValue( "free_queue", free_queue.join( "," ) );
    GM_setValue( "length_cache", length_cache.join( "," ) );
    GM_setValue( "age_queue", "" );
    GM_setValue( "fix_udtoolbar_layout", false );
    GM_setValue( "fire_onload", false );
    }



function removeData( entry_id )
    {
    var length_cache= ( GM_getValue( "length_cache" ) ).split( "," ); 
    length_cache[ entry_id ]= 0;
    GM_setValue( "cache_"+entry_id, "" );
    GM_setValue( "cache_hd_"+entry_id, "" );
    GM_setValue( "length_cache", length_cache.join( "," ) );
    }



function deleteEntry( entry_id )
    {
    var age_queue= ( GM_getValue( "age_queue" ) ).split( "," ); 

    var new_age_queue= new Array();
    
    for( itr= 0; itr < age_queue.length; itr++ )
        if( age_queue[ itr ] != entry_id )
            new_age_queue.push( age_queue[ itr ] );

    GM_setValue( "age_queue", new_age_queue.join( "," ) );
    removeData( entry_id );
    enqueueInGMQueue( "free_queue", entry_id );
    }



function enqueueInGMQueue( queue_name, elem_id )
    {
    var queue= ( GM_getValue( queue_name ) ).split( "," ); 

    if( queue[ 0 ] == "" )
        queue= new Array();

    queue[ queue.length ]= elem_id;
    GM_setValue( queue_name, queue.join( "," ) );
    }



function dequeueFromGMQueue( queue_name )
    {
    var queue= ( GM_getValue( queue_name ) ).split( "," ); 
    
    if( queue[ 0 ] == "" )
        queue= new Array();

    var result= queue[ 0 ];
    queue.splice( 0, 1 );
    
    GM_setValue( queue_name, queue.join( "," ) );
    return result;
    }


function savePage( saved_page, cache_pos )
    {
    var length_cache= ( GM_getValue( "length_cache" ) ).split( "," ); 
    length_cache[ cache_pos ]= saved_page.size;
    
    enqueueInGMQueue( "age_queue", cache_pos );
    GM_setValue( "length_cache", length_cache.join( "," ) );
    GM_setValue( "cache_"+cache_pos, saved_page.body );
    GM_setValue( "cache_hd_"+cache_pos, saved_page.header.join( ';' ) );
    }


function deleteOldestEntry()
    {
    var oldest= dequeueFromGMQueue( "age_queue" );
    removeData( oldest );
    enqueueInGMQueue( "free_queue", oldest )
    }


function getCachePosition()
    {
    if( ( GM_getValue( "free_queue" ) ).length == 0 ) // free queue is empty
        deleteOldestEntry();
    
    return dequeueFromGMQueue( "free_queue" );
    }



function initUDeLorean()
    {    
    if( manual_load )
        {
        manual_load= false;
        return;
        }

    if( !executedBefore() )
        initUDeLoreanSettings();
    
    var UD_page= new CurrentPage();
    
    var loc= checkCache( UD_page );
    
    if( loc == -1 )
        {
        pos= getCachePosition();
        savePage( UD_page, pos );
        }    
    }


function loadSavedRecord( event )
    {
    closeHistoryWindow();

    if( loaded_record == -1 )
        current_source= document.body.innerHTML;

    var action_str= event.target.id;
    var curr= parseInt( ( action_str.split( "_" ) )[ 1 ] );

    loaded_record= curr;

    document.body.innerHTML= GM_getValue( 'cache_'+curr );
    attemptToFixLayout();
    fireWindowOnload();
    }


function deleteSavedRecord( event )
    {
    var action_str= event.target.id;
    var curr= parseInt( ( action_str.split( "_" ) )[ 1 ] );

    deleteEntry( curr );

    closeHistoryWindow();
    openHistoryWindow();
    }


function switchManualOnload()
    {
    if( ( GM_getValue( "fire_onload", false ) ) )
        {
        GM_setValue( "fire_onload", false );
        window.alert( "UDeLorean won't try to simulate page loading in order to run other scripts." );
        }
    else
        {
        GM_setValue( "fire_onload", true );
        window.alert( "UDeLorean will try to simulate page loading in order to run other scripts." );
        if( loaded_record != -1 )
            fireWindowOnload();
        }
    }


function switchUDToolbarFixing()
    {
    if( ( GM_getValue( "fix_udtoolbar_layout", false ) ) )
        {
        GM_setValue( "fix_udtoolbar_layout", false );
        window.alert( "UDeLorean won't try to fix problems with UDToolbar panel after loading records." );
        }
    else
        {
        GM_setValue( "fix_udtoolbar_layout", true );
        window.alert( "UDeLorean will try to fix problems with UDToolbar panel after loading records." );
        if( loaded_record != -1 )
            attemptToFixLayout();
        }
    }



function closeHistoryWindow()
    {
    if( history_window_open )
        {
        document.body.removeChild( document.getElementById( 'historyframe' ) );
        history_window_open= false;
        }
    }



function udlSearchInit()
    {
    var search_indicator= document.getElementById( "searchIndicator" );
    var search_input= document.getElementById( "search" );
    var search_options= document.getElementById( "searchOptions" );
    var search_submit= document.getElementById( "searchSubmit" );
    
    search_indicator.style.display= "block";
    search_input.disabled= true;
    search_options.disabled= true;
    search_submit.disabled= true; 
    
    setTimeout( udlSearch, 100 );
    return false;
    }



function udlSearch()
    {
    var search_indicator= document.getElementById( "searchIndicator" );
    var search_input= document.getElementById( "search" );
    var search_options= document.getElementById( "searchOptions" );
    var search_submit= document.getElementById( "searchSubmit" );
    


    found_ids= new Array();
    var search_phrase= search_input.value;
    var search_type= search_options.value;

    if( search_type == "plain" )
        {
        search_phrase= search_phrase.replace(/([\.\|\*\?\+\(\)\{\}\[\]\^\$\\\/]{1})/g,"\\$1");
        }
    else if( search_type == "wildcard" )
        {
        search_phrase= search_phrase.replace(/([\.\|\+\(\)\{\}\[\]\^\$\\\/]{1})/g,"\\$1");
        search_phrase= search_phrase.replace(/(\*)/g,".*");
        search_phrase= search_phrase.replace(/(\?)/g,".");
        }


    var ages= ( GM_getValue( "age_queue" ) ).split( "," );
    if( ages[ 0 ] == "" )
        ages= new Array();

    var entry_count= ages.length;

    var regex= new RegExp( search_phrase );

    var found= 0;

    for( itr= 0; itr < entry_count; itr++ )
        {
        var curr= ages[ itr ]; // ID used in cache and headers

        var content= GM_getValue( 'cache_'+curr );

        if( regex.exec( content ) )
            {
            var row= document.getElementById( 'del_'+curr ).parentNode.parentNode;

            row.style.textDecoration= "underline";
            row.style.color= "yellow";

            found_ids[ found++ ]= curr;
            }
        else
            {
            var row= document.getElementById( 'del_'+curr ).parentNode.parentNode;
            row.style.textDecoration= "none";
            row.style.color= "inherit";
            }
        }
    if( found == 0 )
        alert( "No records found." );
    else if( found == 1 )
        alert( "Found 1 record. It is highlighted and underlined." );
    else
        alert( "Found "+found+" records. Matching entries are highlighted and underlined." );

    search_indicator.style.display= "none";
    search_input.disabled= false;
    search_options.disabled= false;
    search_submit.disabled= false;

    return false;
    }




function clearSearch()
    {
    
    var entry_count= found_ids.length;

    for( itr= 0; itr < entry_count; itr++ )
        {
        var curr= found_ids[ itr ];

        if( document.getElementById( 'del_'+curr ) )
            {
            var row= document.getElementById( 'del_'+curr ).parentNode.parentNode;
            row.style.textDecoration= "none";
            row.style.color= "inherit";
            }
        }
    
    found_ids= new Array();
    }


function openHistoryWindow()
    {
    if( history_window_open )
        return;
    
    history_window_open= true;

    var history_frame= document.createElement( "div" );
    history_frame.className= "gt";
    history_frame.style.minHeight= "200px";
    history_frame.style.width= "900px";

    history_frame.style.marginLeft= "-450px";

    history_frame.style.position= "absolute";
    history_frame.style.left= "50%";
    history_frame.style.top= "50px";
    history_frame.style.zIndex= "150";  // cause HP boxes have 90... dunno why...
    
    history_frame.style.padding= "0px";
    history_frame.style.fontSize= "smaller";


    history_frame.id= "historyframe";


    var frame_content= (<r><![CDATA[
    <div style="position: relative; top: 0px; left: 0px;">
    
        <div id="udlclose" style="position: absolute; top: 0px; right: 0px; font-size: large;">
            <a href="javascript:void(0)">&#9746;</a>
        </div>

        <div style="text-align: center; margin-bottom: 10px;">
            <span id="scrname" style="font-weight: bold; padding-left: 70px;"></span>
            <sup id="scrver"></sup>
        </div>
        
        <div style="padding: 20px; position: relative; left: 0px; right: 0px;">
        <form onsubmit="return false" id="searchBar"><label for="search">Search: </label> <input type="text" id="search" name="search" style="width: 300px;" class="udlSearch" />
            <select style="width: 200px;" id="searchOptions">
                <option value="plain">plain text match</option>
                <option value="wildcard">wildcard match (*, ?)</option>
                <option value="preg">perl regex</option>
            </select><input type="submit" value="search" id="searchSubmit" style="width: 80px;" class="udlSearchSubmit"  />
            <input type="submit" value="clear" id="searchClear" style="width: 80px;" class="udlSearchSubmit" onclick="return false"  />
        <img id="searchIndicator" style="width: 31px; height: 31px; position: absolute; right: 90px; top: 19px; display:none;" src="data:image/gif;base64,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" alt="Progress" />
        </form>
        </div>

        <div style="padding-left: 20px; padding-bottom: 10px;" id="topstatusmessage"></div>

        <table style="padding: 20px; font-size: 90%" class="udelorean">
            <tbody>
            <tr>
                <th>no</th>
                <th style="width: 140px">date</th>
                <th>location</th>
                <th>navigation</th>
            </tr>
            ]]></r>).toString();
            


    var ages= ( GM_getValue( "age_queue" ) ).split( "," );
    if( ages[ 0 ] == "" )
        ages= new Array();


    var entry_count= ages.length;
    var loaded_id= -1;

    for( itr= 0; itr < entry_count; itr++ )
        {
        var curr= ages[ itr ];
        var cache_hd= GM_getValue( 'cache_hd_'+curr ).split( ';' );
        var fw= "normal";
        
        if( loaded_record == curr )
            {
            loaded_id= itr+1;
            fw= "bold";
            }

        frame_content+= '<tr style="font-weight: '+fw+'"><td style="text-align: center">'+( itr+1 )+".</td>\n";
        frame_content+= '<td style="padding: 5px 10px; width: 140px"">'+cache_hd[ 3 ]+"</td>\n";
        frame_content+= '<td style="padding: 5px 10px">'+cache_hd[ 0 ]+" ["+cache_hd[ 1 ]+", "+cache_hd[ 2 ]+"]</td>\n";
        frame_content+= '<td style="text-align: center">';

        if( loaded_record != curr )
            frame_content+= '<a id="tmjump_'+curr+'" href="javascript:void(0)">[load this entry]</a> ';
            
        frame_content+= '<a id="del_'+curr+'" href="javascript:void(0)">[delete this entry]</a></td></tr>'+"\n";
        }


            
    frame_content+= (<r><![CDATA[
            </tbody>
        </table>
    ]]></r>).toString();


    if( loaded_record >= 0 )
        {
        if( loaded_id != -1 )
            {
            frame_content+= '<div style="padding-left: 20px; padding-bottom: 10px;">Loaded entry: '+loaded_id+
                '. <a id="restcurr" href="javascript:void(0)">[restore current page]</a></div>'+"\n";
            }
        else
            {
            frame_content+= '<div style="padding-left: 20px; padding-bottom: 10px;">Loaded entry has been deleted. <a id="restcurr" href="javascript:void(0)">[restore current page]</a></div>'+"\n";

            }
        }
    else
        {
        frame_content+= '<div style="padding-left: 20px; padding-bottom: 10px;">Nothing loaded yet...</div>'+"\n";
        }

    frame_content+= "</div>\n";
    
    // innerHTML is faster :p
    history_frame.innerHTML= frame_content;


    document.body.appendChild( history_frame );

    document.getElementById( "scrname" ).innerHTML= script_name;
    document.getElementById( "scrver" ).innerHTML= "(version "+script_version+")";

    document.getElementById( 'udlclose' ).addEventListener( 'click',closeHistoryWindow, true );

    document.getElementById( 'searchBar' ).addEventListener( 'submit', udlSearchInit, true );
    document.getElementById( 'searchClear' ).addEventListener( 'click', clearSearch, true );

    if( loaded_record >= 0 )
        {
        if( loaded_id != -1 )
            {
            document.getElementById( 'topstatusmessage' ).innerHTML= 'Loaded entry: '+loaded_id+
                '. <a id="restcurrtop" href="javascript:void(0)">[restore current page]</a>';
            }
        else
            {
            document.getElementById( 'topstatusmessage' ).innerHTML= 'Loaded entry: '+loaded_id+
                '. <a id="restcurrtop" href="javascript:void(0)">[restore current page]</a>';
            }
        }
    else
        {
        document.getElementById( 'topstatusmessage' ).innerHTML= 'Nothing loaded yet...';
        }



    for( itr= 0; itr < ages.length; itr++ )
        {
        if( loaded_record != ages[ itr ] )
            document.getElementById( 'tmjump_'+ages[ itr ] ).addEventListener(
                'click',
                loadSavedRecord,
                true
                );

        document.getElementById( 'del_'+ages[ itr ] ).addEventListener(
            'click',
            deleteSavedRecord,
            true
            );
        }

    if( loaded_record >= 0 )
        {
        document.getElementById( 'restcurr' ).addEventListener(
            'click',
            restoreCurrentPage,
            true
            );
        
        document.getElementById( 'restcurrtop' ).addEventListener(
            'click',
            restoreCurrentPage,
            true
            );
        }

    var entry_count= found_ids.length;
    for( itr= 0; itr < entry_count; itr++ )
        {
        var curr= found_ids[ itr ];
        if( document.getElementById( 'del_'+curr ) )
            {
            var row= document.getElementById( 'del_'+curr ).parentNode.parentNode;
            row.style.textDecoration= "underline";
            row.style.color= "yellow";
            }
        }


    }


GM_registerMenuCommand( 'UDeLorean: Open history window', openHistoryWindow );
GM_registerMenuCommand( 'UDeLorean: Reset history', resetHistory );
GM_registerMenuCommand( 'UDeLorean: Change history size', changeBufferSize );
GM_registerMenuCommand( 'UDeLorean: Switch UDToolbar panel fix option', switchUDToolbarFixing );
GM_registerMenuCommand( 'UDeLorean: Simulate page loading (may make other scripts work)', switchManualOnload );
