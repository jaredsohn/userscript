// ==UserScript==
// @name       just-dice.com chat helper
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  script to improve just-dice.com's chat.  Adds colored names to easily track users, highlights, nicknames, more
// @require    	http://code.jquery.com/jquery-latest.min.js
// @match      https://just-dice.com/*
// @grant		unsafeWindow
// @grant		GM_setValue
// @grant		GM_getValue
// @grant      	GM_listValues
// @grant      	GM_deleteValue
// @copyright  2014+, momphis.justdice@gmail.com
// ==/UserScript==
var address = '14QJxtdDusNdVFsas2m3yqjS7ENuhcghZt';
var loading;
var settings = ({ });
var setuptimer;
var isloaded = false;
var membersList = ({ });
var users = ({ });
var startTime;
var watchGroups, defaultGroups;

var unreadNotifications = ({ });
var settingsMenu;
var DEBUG = GM_getValue('debug');
//GM_deleteValue('watchList');
function Panel () {
	this.titleStr = "";
    this.cssArr = ({ });
    this.classStr = "";
    this.anchor;
    
    this.setTitle = function ( str ) {
        this.titleStr = str;
    }
    
    this.addClass = function ( str ) {
        this.classStr = str;
    }
    
    this.css = function ( arr ) {
    	this.cssArr = arr;   
    }
    
    this.build = function ( rows ) {
        $('.watchListPanel').remove();
        var div = document.createElement( 'div' );
        var ul = document.createElement( 'ul' );
        var li;
        
        $( div ).addClass( 'watchListPanel '+this.classStr );
        $( div ).css( this.cssArr );
        
        if ( this.titleStr.length ) {
        	var titleOb = document.createElement( 'div' );
        	$( titleOb ).append( this.titleStr );
            $( titleOb ).css( ({ 'background':'#b0b0b0' }) );
        	$( div ).append( titleOb );
        }
        
        if ( rows && rows.length ) {
            for ( var x = 0; x < rows.length; x++ ) {
                var li = document.createElement( 'li' );
                $( li ).html( rows[x] );
                $( ul ).append( li );
            }
        }
        
        $( div ).append( ul );
        $( div ).click( function ( e ) {
            e.stopPropagation();
        });
        if ( !this.anchor )
            this.anchor = 'body';
        $( this.anchor ).prepend( div );
    }       
        
}

function addInfo ( str, type ) {
    var li = document.createElement( 'li' );
    $( li ).html( str );
    
    var panel = new Panel();
    panel.addClass( 'info' );
    panel.anchor = '.chatscroll';
    panel.build( [ li ] );
    setTimeout( function() { $('.info').hide('slow') }, 2000 );

}

function idLink ( id, name ) {
    
    var a = document.createElement( 'a' );
    $( a ).html( id );
    $( a ).addClass( "watchMenu "+getGroupClassForUser( id ) );
    
    $( a ).attr({'href':'#watchMenu','id':id });
    
    $( a ).click( function ( e ) {
        buildUserPopup( this, $(this).attr('id') );        
        console.log('clicking');
        e.stopPropagation();
    });
	
	if ( name )
        name = dumpUser( id )['name'];
    if ( name ) {
        var span = buildTag( 'span',({'html':"["}) );
        $( span ).append( a );
        $( span ).append( "] &lt;"+name+"&gt;" );
        
        return span;
    }
    return a;
}


function updateNotifications () {

    if ( Object.keys(unreadNotifications).length ) {
        
    	$('.unreadNotifications>a').html( Object.keys(unreadNotifications).length );
        $('.unreadNotifications>a').css({'color':'red'});
        $('.unreadNotifications').show();
    }
    else {
        console.log('not checking');
        $('.unreadNotifications>a').html("");
        $('.unreadNotifications').hide();
    }
}

String.prototype.cap = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
String.prototype.trunc =
     function(n,useWordBoundary){
         var toLong = this.length>n,
             s_ = toLong ? this.substr(0,n-1) : this;
         s_ = useWordBoundary && toLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
         return  toLong ? s_ + '&hellip;' : s_;
      };

function time () {
    return new Date().getTime();
}

if ( DEBUG == true ) {
	console.log('Dump of saved values');
	$.each( GM_listValues(), function ( key, value ) {
    	console.log( value+"="+GM_getValue( value ) );
	});
    console.log('End dump');
}

var css = 
".watchMenuHeader  {color:#222222;background:#cccccc;border-bottom:1px solid #000000 } "
+".watchMenuUser    {background:#222222;color:#cccccc }"
+".watchListPanel   {position: fixed; top: 50px; left: 100px;;border:1px solid #000;z-index:1;padding:3px;"
+"           	     color:#000000;background:#b0b0b0; max-height: 300px; overflow: auto; border-radius: 5px}"
+".watchListPanel>ul { list-style-type: none; padding: 5px;margin:3px;border: 1px solid #000; background: #FFF }"
+".membersList	    {color:#000000;max-height:320px;overflow:auto;float:right; "
+"                   list-style-type:none; margin:0px; padding:0px; border:1px solid #000; "
+"                   background:#FFFFFF; width:220;border-radius:0px 0px 5px 5px;}"
+".membersList    { width: 100%;float:left}"
+".watchListSettings { max-height:320px;overflow:auto;float:right;border:1px solid #000; width:100%;"
+"						background:#FFFFFF;color:#000000; border-radius:0px 0px 5px 5px; float:left}"
+".watchListSettings>ul  {color:#000000; "
+"                   list-style-type:none; margin:0px; padding:0px; border-top:1px solid #000; width:100%;"
+"                   background:#FFFFFF; width:100%}"
+".watchListSettings>ul>li>h3,.watchListSettings>ul>li>h2 { padding:0px }"
+".chat-right>div,.watchListSettings	{ padding:0px;margin:0px}"
+".chat-right	    { float:right; padding:0px;margin:0px width:220px}"
	
+".highlight	    {background:#cccccc}"
+".selected	    {background:#cccccc}"
+".saved		{background:green}"
// for the infobar
+".info			{background:yellow;color:#000000}"
+".success		{background:green;color:#000000}"
+".error		{background:red;color:yellow}"
//
+".right		{float:right}"
+".watchListDetails { width: 50%; background: #FFFFFF; position: fixed; top: 25px; left: 25px; border:1px solid #000 }"
+".watchListDump { width: 500px; height: 200px }"
+".chat-right input { padding: 1px; text-align: left; width: 80px }"
+".watchMenuLink:hover { color:#cccccc }"
// tabs
+".watchTabs        { padding:0px;margin:0px }"
+".watchTabs>div    { width: 110px; border: 1px solid #000; }"
+".watchTabs>.active { background:#eee }"
+".userTab { float: left; border-radius: 5px 0px 0px 0px; padding-left: 3px }"
+".watchTab { float: right; border-radius: 0px 5px 0px 0px; text-align:right;padding-right:3px; }";     

function addGlobalStyle(newcss) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = newcss;
    head.appendChild(style);
}


defaultGroups = ({ 0:({'color':'red','name':'default','background':'#FFFFFF'}), 
                 1:({'color':'blue','name':'group1','background':'#FFFFFF'}) , 
                 2:({'color':'green','name':'group2','background':'#FFFFFF'}) });

var watchList;
watchList = GM_getValue( 'watchList' );

if ( DEBUG == true ) {
	console.log('watchlist');
	console.log( watchList );
}

//resetWatchList();

watchGroups = GM_getValue( 'watchGroups' );

if ( DEBUG == true ) {
	console.log('watchgroups');
	console.log( watchGroups );
}

loadGroups();

function dumpWatchListToString () {
    var dump = ({ });
    dump['watchList'] = watchList;
    dump['watchGroups'] = watchGroups;
    
    dump = JSON.stringify( dump );
    
    return dump;
}

function importWatchListFromString ( str ) {

    if ( !str.length ) {
        addInfo( 'Error importing watchList: nothing to import', 'error' );
		return;
    }
    try {
    	str = JSON.parse( str );   
    } catch ( err ) {
        addInfo( 'Error importing watchList: '+err, 'error');
        return;
    }

    if ( str['watchList'] ) {
        watchList = str['watchList'];
       	saveWatchList();
    }
    if ( str['watchGroups'] ) {
        watchGroups = str['watchGroups'];
    	saveGroups();
    }
    console.log( 'imported watchlist' );
    readChatLog();
    addInfo( 'Successfully imported watchList', 'success' );
}

function resetWatchList () {
    watchList = ({ });
    console.log( 'Watchlist reset' );
	saveWatchList();
}

function saveWatchList ( ) {
    GM_setValue( 'watchList', JSON.stringify( watchList ) );
    console.log( 'saving watchlist' );
    console.log( watchList );
}

function getUser ( id ) {
    if ( membersList [id] )
        return membersList[id];
    if ( watchList[id] )
        return watchList[id];
    return false;
}

function getGroupColors ( group ) {
    var tmp = ({ });
    
    if ( !group || !watchGroups[group] )
        return false;
    
    tmp['color'] = watchGroups[group]['color'];
    tmp['background'] = watchGroups[group]['background']
    return tmp;
}

function loadWatchList ( ) {

    watchList = GM_getValue( 'watchList' );
    
    if ( watchList && watchList.length )
	   watchList = JSON.parse( watchList );
    else
        watchList = ({ });
    return watchList;
}

function getGroupForUser ( userid ) {
    if ( !watchList[userid] )
        return false;
    return watchList[ userid ][ 'group' ];
}

function addGroupForUser ( userid, group ) {
    if ( !watchList[userid] )
        watchList[userid] = ({ });
    watchList[userid]['group'] = group;
    saveWatchList();
}

function getUsersForGroup ( group ) {
    if ( !group || !watchGroups[group] )
        return false;
    var usersArr = [ ];
    
    $.each( watchList, function( id, data ) {

        if ( data['group'] && data['group'] == group ) {
                    		console.log(id);
        		console.log(data['group']);
                        console.log(group);
        	usersArr.push( id );
        }
        });
    
    return usersArr;
}


function saveUserDetails ( userid, data ) {
    if ( !watchList[userid] )
        watchList[userid] = ({ });
    
    watchList[userid] =  data;
    saveWatchList();
}

function deleteUserDetails ( userid ) {
    watchList[userid] = false; 
    saveWatchList();
}

function dumpSavedUser ( userid ) {
    return watchList[userid];
}

function dumpUser ( userid ) {
    var watch = watchList[userid];
    
    if ( watch )
        return watch;
    watch = users[userid];
    if ( watch )
        return watch;
    watch = membersList[userid]
    	return watch;
    return ({ });
}

function getGroupClassForUser ( userid ) {
    var classStr = "watchList_";
    
    if ( !watchList[userid] )
        return classStr;
    var group = getGroup( getGroupForUser( userid ) );

    if ( !group )
        return classStr;
    return classStr+group['name'];
}

function getGroupClass ( group ) {
        var classStr = "watchList_";
    
    if ( !watchGroups[group] )
        return classStr;
    return classStr+watchGroups[group]['name']
}

function getColorsForUser ( userid ) {
    var defaultColors = ({ "color":"#000000", "background":"#FFFFFF" });
    
	if ( !watchList[userid] )
        return defaultColors;
    var group = getGroupForUser( userid );
    
    if ( !group )
        return defaultColors;
    
    var colors = getGroupColors( group );
    
    return colors || defaultColors;
}

function getGroup ( id ) {
    var groups = watchGroups;
    
    if ( !groups )
        groups = defaultGroups;
    
    return groups[id];
}

function saveGroups () {
    var groups = watchGroups;
    
    if ( !groups )
        groups = defaultGroups;
    groups = JSON.stringify( watchGroups );
    
    GM_setValue( 'watchGroups', groups );
    rebuildWatchListSettings( 'Groups Saved', false ); 
}

function loadGroups () {
	var cssStr = "";
    
    var groups = GM_getValue( 'watchGroups' );
    console.log('loading groups');
    if ( groups )
        groups = JSON.parse( groups );
    else
        groups = defaultGroups;
    
    for ( var x = 0; x < Object.keys(groups).length; x++ ) {
        cssStr += ".watchList_"+groups[x]['name']+" {color:"+groups[x]['color']+";background:"+groups[x]['background']+"}";
    }
    addGlobalStyle( cssStr );
    console.log(cssStr);
    console.log('loaded groups');    
    watchGroups = groups;
}

defaultGroups = ({ 0:({'color':'red','name':'default','background':'#FFFFFF'}), 
                 1:({'color':'blue','name':'group1','background':'#FFFFFF'}) , 
                 2:({'color':'green','name':'group2','background':'#FFFFFF'}) });
    //    GM_setValue(name,true);
  // var checked = GM_getValue(name);

// turn off bet controls and setup address button
function toggleBetControls () {
    for ( var x = 2; x < 6; x++ )
    	$( $( ".wrapper").children()[x] ).toggle();
}

toggleBetControls();

var button = document.createElement( 'button' );
$( button ).text("Paste Addresss");
var pasted = false;

$( button ).click( function ( e ) {
    var input = $(".chatinput");
    

    if ( !settings['temp']) {
       	if ( !input.val() || input.val() == address )
           input.val( address );
        else {
       		settings['temp'] = input.val();
       		input.val( input.val()+" "+address+" " );
        }
    } else {
       input.val( settings['temp'] );
        settings['temp'] = false;
    }
});
$('.chatbutton').after( $( button ) );

function rebuildUserList () { }


function obslice(obj, start, end) {

    var sliced = {};
    var i = 0;
    for (var k in obj) {
        if (i >= start && i < end)
            sliced[k] = obj[k];

        i++;
    }

    return sliced;
}
// [0].tagName;
// if is string or has children then that = html
function buildli ( settings ) {
    var li = document.createElement( 'li' );

    if ( !settings )
        settings = ({ });    
    if ( typeof settings == 'string' || ( $(settings)[0].tagName ) )
        settings = ({ 'html':settings });
    
    if ( settings['css'] )
        $( li ).css( settings['css'] );
    if ( settings['addClass'] )
        $( li ).addClass( settings['addClass'] );
    if ( settings['html'] )
        $( li ).html( settings['html'] );
    if ( settings['text'] )
        $( li ).text( settings['text'] );
    
    return li;
}

function buildTag ( type, settings ) {
    var tag = document.createElement( type );

    if ( !settings )
        settings = ({ });    
    if ( typeof settings == 'string' || ( $(settings)[0].tagName ) )
        settings = ({ 'html':settings });
    
    if ( settings['css'] )
        $( tag ).css( settings['css'] );
    if ( settings['addClass'] )
        $( tag ).addClass( settings['addClass'] );
    if ( settings['html'] )
        $( tag ).html( settings['html'] );
    if ( settings['text'] )
        $( tag ).text( settings['text'] );
    
    return tag;
}

function settingsMenuObj () {
    this.unsavedGroups;
    
    this.setup = function () {
    	this.unsavedGroups = watchGroups;    
    }
    
   
    this.addNewGroup = function () {
        var id = Object.keys(this.unsavedGroups).length;
        this.unsavedGroups[id] = ({ });
        var li = this.buildGroupLine( id, this.unsavedGroups[id], true );
        $('.watchListGroups').children().last().before( li );
        console.log(id);
    }
    
    this.save = function () {
        var toSave;
        
        if ( !this.unsavedGroups )
            return;

        for ( var x = 0; x < Object.keys(this.unsavedGroups).length; x++ ) {
            if ( this.unsavedGroups[x]['name'] ) {
               watchGroups[x] = this.unsavedGroups[x];
            }
        }
        saveGroups();
        addInfo("Saved Groups",'info');
		console.log(watchGroups);
    }
    
    this.buildGroupLine = function ( id, values, showInput ) {
        if ( !values )
			values = getGroup( id );
        // group id - can't be changed
        var a = document.createElement( 'a' );

        var a = buildTag( 'a', ({'html':id,'addClass':"watchMenuLink editGroupName "+getGroupClass( id ),'css':({'float':'left', 'width':'20px'}) }) );
        $( a ).attr({ 'href':'#showUsersForGroup','id':id });
        
        // show the group details popup if you click on id
        $( a ).click( function ( e ) {
            var panel = new Panel();
         	var rows = [ ];
            var gUsers = getUsersForGroup( $( this ).attr( 'id' ) );
			var group = watchGroups[ $( this ).attr( 'id' ) ];
            
            $.each( group, function ( key, value ) {
                var li = buildTag( 'li', ({ 'html' : key+" = "+value }) );
                if ( key == 'color' )
                	$( li ).addClass( key );
                rows[ rows.length ] = li;
            });
            rows.push( buildTag( 'li', ({ 'html': '<h3>Users in Group</h3>' }) ) );
            if ( gUsers ) {
                for ( var x = 0; x < gUsers.length; x++ ) {               
                    var li = buildTag( 'li', ({ 'html' : idLink(gUsers[x],true) }) );

                    rows[rows.length] = li;
            	}
            }
            panel.setTitle( 'Group Details ' );
    		panel.addClass( 'watchListPanel groupDetailsPanel' );
    		panel.build( rows );
            
            e.stopPropagation();
 
        });
        var li = buildli( a );
        
        if ( !showInput ) {
        	// group name
        	a = buildTag( 'a', ({'html':values['name'],'addClass':"watchMenuLink editGroupName "+getGroupClass( id ) }) );
        	$( a ).attr({ 'href':'#editGroupName','id':id });
        	// on click, hide this, show the next element ( the input )
        	$( a ).click( function ( e ) {
            	$( this ).hide();
            	$( $( this ).next() ).show('slow');
        	});
            $( li ).append( a );
        }
   		// group name input
        var input = buildTag( 'input', ({ 'addClass':'editGroupNameInput editGroupNameInput_'+id+" "+getGroupClass( id ) }) );

        $( input ).attr({ 'type':'text','id': id });
        $( input ).val( values['name'] );

        // on keyup (we'll assume that's an edit), show the save button
        $( input ).keyup( function ( e ) {
            console.log(this);
            if ( !$( '.watchListSettingsSave').is(":visible") )
                $( '.watchListSettingsSave').show();
            if ( !settingsMenu.unsavedGroups[ $(this).attr('id') ] )
                settingsMenu.unsavedGroups[ $(this).attr('id') ] = ({ });
            settingsMenu.unsavedGroups[ $(this).attr('id') ]['name'] = $( this ).val();   
        });
        if ( !showInput )
        	$( input ).hide();
        
        $( li ).append( input );
        
        if ( !showInput ) {
        	// group color 
        	a = buildTag( 'a', ({'html':values['color'],'addClass':"watchMenuLink right editGroupColor_"+id+" "+getGroupClass( id ) }) );

	        $( a ).attr({ 'href':'#editGroupColor' });
	
    	    // on click, hide this, show the next element ( the input )
        	$( a ).click( function ( e ) {
            	$( this ).hide();
            	$( $( this ).next() ).show('slow');
        	});
            $( li ).append( a );
        }
        
        //group color input
        var input = buildTag( 'input', ({ 'addClass':'editGroupColorInput right editGroupColorInput_'+id+" "+getGroupClass( id ) }) );
        $( input ).attr({ 'type':'text','id': id });
        $( input ).val( values['color'] );        

        // on keyup (we'll assume that's an edit), show the save button
        $( input ).keyup( function ( e ) {
            if ( !$( '.watchListSettingsSave').is(":visible") )
                $( '.watchListSettingsSave').show();
            if ( !settingsMenu.unsavedGroups[ $(this).attr('id') ] )
                settingsMenu.unsavedGroups[ $(this).attr('id') ] = ({ });
            settingsMenu.unsavedGroups[ $(this).attr('id') ]['color'] = $( this ).val();     
        });
        if ( !showInput )
        	$( input ).hide();
        

        $( li ).append( input );
        
        return li;
    }
}

function rebuildWatchListSettings ( infoMsg, limits ) {
	var div = $( '.watchListSettings' );
    $( div ).html( '<ul><li><h2>Settings</h2></li></ul>' );
    var ul = buildTag( 'ul', ({ 'addClass':'watchListGroups','html':'<li><h3>Groups</h3></li>' }) );

	var li, a, showMore = false;
    var defaultLimits = ({'groups':5,'users':5})
    if ( !limits )
        limits = defaultLimits;
    loadGroups();
    settingsMenu = new settingsMenuObj();
    settingsMenu.setup();

    // add new group button
    var button = buildTag( 'button', ({ 'css':({ 'float':'left'  }), 'addClass':'watchListSettingsAdd','html':'Add' }) );
    $( button ).click( function ( e ) {

        settingsMenu.addNewGroup();

		e.stopPropagation();
    })
    var li = buildTag( 'li', ({'html': button  }) );
    
    // save groups button
    var button = buildTag( 'button', ({ 'css':({ 'float':'right', 'display':'none' }), 'addClass':'watchListSettingsSave','html':'Save' }) );
    $( button ).click( function ( e ) {
        settingsMenu.save('groups');
        //watchGroups = settingsMenu.unsavedGroups;

      	e.stopPropagation();
    });
    
    $( li ).append( button );
    $( ul ).append( li );
    $( ul ).append( "<li style=\"clear:both\"><b style=\"float: left; width: 20px\">id</b><b>Name</b><b style=\"float:right\">Color</b><br></li>" );
    
    var groupList = watchGroups;
    if ( Object.keys(groupList).length > limits['groups'] ) {
        groupList = obslice( groupList, 0, limits['groups'] );
        showMore = true;
    }

    $.each( groupList, function( key, value ) { 

        $( ul ).append( settingsMenu.buildGroupLine( key, value ) );
    });

    var li = buildli( );
	if ( showMore ) {

        var a = document.createElement( 'a' );
        $( a ).addClass( "watchMenuLink" );
        $( a ).attr({ 'href':'#showMoreGroups' });
        $( a ).click( function ( e ) {
            rebuildWatchListSettings( 0, ({ 'groups': 100, 'users': defaultLimits['users'] }) );
        });
        $( a ).html("Show more groups");
        $( li ).html( a );
    }
  
 
    if ( ( limits['groups'] > defaultLimits['groups'] ) && !showMore ) {

        var a = document.createElement( 'a' );
        $( a ).addClass( "watchMenuLink" );
        $( a ).attr({ 'href':'#showLessGroups' });
        $( a ).click( function ( e ) {
            rebuildWatchListSettings( 0 );
        });
        $( a ).html("Show less groups");
        $( li ).html( a );       
    }
      
    $( ul ).append( li );     
    $( div ).append( ul );
    ul = buildTag( 'ul', ({ 'addClass':'watchListList' }) );
    
    $( ul ).append( "<li><h3>Users</h3></li><li><b style=\"float: left; width: 60px\">id</b><b>User</b><b style=\"float:right\">Group</b><br></li>" );
    
    showMore = false;
    var userList = watchList;
    if ( Object.keys(userList).length > limits['users'] ) {
        userList = obslice( userList, 0, limits['users'] );
        showMore = true;
    }
    
    $.each( userList, function( userid, value ) {
        if ( value['name'] ) {
        	var a;

        	// userid - can't be changed
        	a = idLink( userid, false );
        	$( a ).css({'float':'left', 'width':'60px'});
        	$( a ).attr({ 'href':'#showUsersDetails','id':userid });
            $( a ).click( function ( e ) { showUserDetails(userid); });
            $( a ).addClass( getGroupClassForUser( userid ) );
       		var li = buildli( ({'html':a }) );
        
        	a = document.createElement( 'a' );
        	$( a ).html( value['name'].trunc(12) );
        	$( a ).addClass( "watchMenuLink "+getGroupClassForUser( userid ) );
        	$( a ).attr({ 'href':'#editGroupName','id':userid });

        
        	$( li ).append( a );
        
        	$( li ).append( "." );
        	a = document.createElement( 'a' );
        	$( a ).html( getGroupForUser( userid ) );
        	$( a ).addClass( "watchMenuLink "+getGroupClassForUser( userid ) );
        	$( a ).css({ 'float':'right' });
        	$( a ).attr({ 'href':'#editGroupColor', 'id':userid });

        	$( li ).append( a );
        	$( ul ).append( li );
        }
    });
    
    var li = buildli();
   	if ( showMore ) {

        var a = document.createElement( 'a' );
        $( a ).addClass( "watchMenuLink" );
        $( a ).attr({ 'href':'#showMoreUsers' });
        $( a ).click( function ( e ) {
            rebuildWatchListSettings( 0, ({ 'groups': defaultLimits['groups'], 'users': 100 }) );
        });
        $( a ).html("Show more users");
        $( li ).html( a );
    }
     
    if ( ( limits['users'] > defaultLimits['users'] ) && !showMore ) {

        var a = document.createElement( 'a' );
        $( a ).addClass( "watchMenuLink" );
        $( a ).attr({ 'href':'#showLessUsers' });
        $( a ).click( function ( e ) {
            rebuildWatchListSettings( 0 );
        });
        $( a ).html("Show less users");  
        $( li ).html( a );
    }
    $( ul ).append( li );  
    $( div ).append( ul );
    ul = buildTag( 'ul', ({ 'addClass':'watchListMisc','html':'<li><h3>Misc</h3></li>' }) );
    
    // import/export buttons

    var button = document.createElement( 'button' );
    $( button ).html( 'Export watchlist' );
    $( button ).click( function ( e ) { 
    	var panel = new Panel();
        var li = document.createElement( 'li' );
        $( li ).append( "<textarea class=watchListDump>"+dumpWatchListToString()+"</textarea>" );
        
        panel.setTitle( 'Export watchlist' );
		panel.addClass('watchListPanel');
        panel.build( [ li ]);
        e.stopPropagation();
    });
    var li = buildli( ({'html':button }) );
    $( ul ).append( li );
    

    var button = document.createElement( 'button' );
    $( button ).html( 'Import watchlist' );
    $( button ).click( function ( e ) { 
    	var panel = new Panel();
        var rows = [ ];

        var li = buildli( ({'html':"<textarea class=watchListDump></textarea>" }) );
        rows.push(li);
        
        var li = buildli( ({'html':"Importing a broken watchlist may freeze the script.  Make sure you know what you are doing",
                            'addClass':"warning"}) );
        rows.push(li);
        

        var button = document.createElement( 'button' );
        $( button ).html( "Import watchlist" );
        $( button ).click( function ( e ) {
            var str = $('.watchListDump').val();
            importWatchListFromString( str );
        	e.stopPropagation();
        });
    	var li = buildli( ({'html':button }) );
        rows.push(li);

        panel.setTitle( 'Import watchlist' );
		panel.addClass('watchListPanel');
        panel.build( rows );   
        e.stopPropagation();
    });
    var li = buildli( button );
    $( ul ).append( li );
    $( div ).append( ul );
}


function showUserDetails ( id ) {
	var rows = [ ];
    var watch = dumpUser( id );
    console.log('dumpuser '+id);
    console.log(watch);
    var name = watch['name'];
   

    $.each( watch, function( key, value ) {

        var li = buildli( key+"="+value );
        rows.push( li );
    });

	var msgs = getUser(id)['msgs'];

    if ( msgs ) {
        //$( div ).append( "msgs this session<br>" );
        $.each( msgs, function( key, value ) {

        	var li = buildli( key+"="+value );
        	rows.push( li );
    	});
    }
    /*
    var names = membersList[id]['names'];

    if ( msgs ) {
        $( div ).append( "msgs this session<br>" );
        $.each( msgs, function( key, value ) {
        	$( div ).append( key+"="+value+"<br>" );
    	});
    }*/
    
    var panel = new Panel();
   	var title = "("+id+") &lt;"+name+">&gt;";
    
    if ( watchList[id] )
        title += "on watchlist";
    
    panel.setTitle( title );
    panel.addClass( 'watchListDetails' );
    panel.build( rows );

}

// handle click from user popup
function handleUserPopup ( type, id, pos ) {
    // clean up old ones
    $('.watchListPanel').remove();
    
    var list, rows = [ ];
    var name = getUser(id)['name'];
    type = type.replace( "#", "" );
    switch ( type ) {
        case "saveWatchList"	 	:	list = ({ 'header' : 'Pick a group', 'li' : ({ 0 : 'default', 1:'group1',2:'group2' }) });
            							break;
        case "showWatchListDetails"	:   showUserDetails(id);

            							return;
            							break;
        case "delWatchList"			:	deleteUserDetails( id );
            							addInfo( "Deleted "+id+" from watchlist", "warning" );
            							readChatLog();
            							return;
            							break;
        default				:	break;
    }
    
    if ( !list ) {
        console.log( 'Tried to replace user popup with invalid type: '+type );
        return false;
    }
    
    $.each( list['li'], function ( key, value ) {
        var  userColor;

        var a = document.createElement( 'a' );
        
        $( a ).attr({ 'href': "#"+key });
        $( a ).addClass( "watchMenuLink "+getGroupClass( key ) );
        $( a ).attr({ 'id': id });

        userColor = getGroupForUser( id );
        if ( userColor && userColor == key ) {
        	$( a ).addClass( 'selected' );

        }
     	$( a ).html( value );
                    
        $( a ).click( function ( e ) {
            var val = $( this ).attr('href').replace("#","");
            
            console.log( "Adding membersList "+id+"="+val );
            console.log(membersList);
            membersList[id]['group'] = val;
            saveUserDetails(id,membersList[id]);
            
            readChatLog(); // to update colors;
        });

        var li = buildli( a );
        rows.push( li );
    });
    
    var panel = new Panel();
    panel.setTitle( list['header'] );
        pos['position'] = 'absolute';
    panel.css( pos );
    
    panel.build( rows );
    
}

//buildUserPopup ( anchor, id )
//create popup menu for the clicked id
// anchor is the object we want to popup next to
function buildUserPopup ( anchor, id ) {
	var name, rows = [ ];
    
    // uh oh.  we should have done
    if ( !membersList[id] ) {
        if ( watchList[id] )
            name = watchList[id]['name'];
        else {
        	console.log("can't find user "+id);
        	return;
        }
    } else
    name = membersList[id]['name']
        
    var mHeader = "("+id+") &lt;"+name+"&gt;";
    var watchMenuItems = ({ "Save to watchlist":'saveWatchList',"Show Details":'showWatchListDetails',"Remove from watchlist":"delWatchList",
                           "Watch user bets":"watchUserBets","Ignore":"ignoreUser" });

    
    //$(".watchMenuUser").remove(); // clean up any old ones   
    // build the menu items
    $.each ( watchMenuItems, function ( key, value ) {
        if ( ( ( value != 'saveWatchList' && watchList[id] ) || ( !watchList[id] &&  value != "delWatchList"  ) ) ) { 
            var li = buildli( ({"html": "<a href=\"#"+value+"\" class=\"watchMenuLink\">"+key+"</a>",
                                "css" : "padding-bottom:3px" }) );
        	
     
        	// if click, send to user popup handler
        	$( li ).click( function ( e ) {
            	var child = $( this ).children()[0];    		 			
            	handleUserPopup( $( child ).attr('href'), id, $( anchor ).position() );
        		e.stopPropagation();
    		});
        	rows.push( li );
        }
    });
    
    // set position to anchor and build new panel 
    var pos = $( anchor ).position();
    pos['position'] = 'absolute';
    var panel = new Panel();
    panel.setTitle(mHeader);
    panel.addClass( 'watchListPanel' );
    panel.css(pos);
    panel.build( rows );
    console.log(panel);
}

// replaceChatLine ( lineObj );
// Reads and replaces this chat line with the userscript version
function replaceChatLine ( lineObj ) {
    var line = $( lineObj ).html();
	var checked = false;
    // match 11:11:11 (1111) <abc> hello world?
    var matchStr = /^([0-9\:]+)+\s\((.*?)\)\s&lt;(.*)&gt;\s(.*)$/; 

    
    // we already checked this one
    // only thing that could change is the group?
    // for now, check it again just in case something else changes I forgot about
    var data = $( lineObj ).attr( 'dataDump' );
    if ( data ) {
        data = JSON.parse( data );
        checked = true;
    }
   	var time = new Date().getTime();    
    
    // unread line
    if ( !data ) {
        
    	var result = line.match( matchStr );

    	var time = new Date().getTime();
    	data = ({ });
    
        // does it match?  system messages, big bet ones don't.
        // if not, we don't want to touch it
        if ( !result ) 
        	return;
    
    	// 1 = timestamp, 2 = id, 3 = username, 4 = chat line     
        data['id'] = result[2];
    	data['name'] = result[3];
    	data['lastseen'] = result[1];
    	data['msg'] = result[4];
    }
    
	var name = data['name'], id = data['id'], msg = data['msg'], timestamp = data['lastseen'];
	var a = document.createElement( 'a' );


	//users[ id ] = data;   

    //var watched = false;
       
    // replace colors with any saved ones
   
    $( lineObj ).addClass( getGroupClassForUser( id ) );

    // nick = your chat name
    // highlight it!
    // maybe add other highlights here?
//var nick = "is";
    if ( msg.search( nick ) != -1 ) {
      $( lineObj ).addClass( 'highlight' );   
        
      // what is this for?
      unreadNotifications[ time ] = data;

    } 

    // make userid clickable
	var a = idLink( id, false );
    
    // time of first message in log
    if ( !startTime )
        startTime = timestamp;
    
    // If not in memberlist; add name, this msg
    // else; check if this name matches the first name (should check them all )
    // and adds to the names array if it doesn't (we check that later)
    if ( !membersList[id] ) {

        var msgs = ({ });
        msgs[ time ] = msg;
        membersList[id] =  ({  'name':name, 'msgs': msgs })  ;
        //rebuildMembersList();
    } else {
        var startName = membersList[id]['name'];
        if ( startName != name ) {
            var names = membersList[id]['names']
			if ( !names )
                names = ({ });
            names[ name ] = time;
            
            membersList[id]['names'] = names;
        }

        membersList[id]['msgs'][ time ] = msg;
    }
    if ( !loading && $('.membersList').html() )
        addUserToMembersList( id, data, $('.membersList') );
    
    $( lineObj ).html( timestamp+" (" );
    $( lineObj ).append(  a  );
    
    // check for nicknames
   	var dUser = dumpSavedUser(id);
    if ( dUser && dUser['name'] != name )
        name = "<i>("+dUser['name']+")</i>"+name;
    
    $( lineObj ).append( ") &lt;"+name+"&gt "+msg );
    $( lineObj ).attr({ 'dataDump' : JSON.stringify(data) });
}

function addUserToMembersList ( id, data, ul ) {
	if ( data && !$('.membersList_'+id).html() ) {
    	var name = data['name'].trunc(12);       
      
        var li = buildli( ({ 'css': ({'padding':'0px'}), 'addClass':getGroupClassForUser( id )+" membersList_"+id }) );
        $( li ).html( " (" );
    	$( li ).append( idLink(id,false) );
    	$( li ).append( ") &lt;"+name+"&gt " );
    	if ( data['names'] )
       		$( li ).append("*");
       	$( ul ).append( li );
       // if ( DEBUG ) 
    //	    console.log('adding '+id+' to membersList');
            
	} else {
    	//if ( DEBUG )
        	//console.log('NOT adding '+id+' to membersList');
    }
}
    
function readChatLog () {
    // reset everything
	membersList = [ ];
    users = ({ });
    $('.membersList').remove();
    $('.chat-right').remove();
    loading = true;
    settingsMenu = new settingsMenuObj();
    var chatlog = $( '.chatlog' ).children();
   
    
	console.log('rebuilding chatlog');
    // rebuild the chatlog 
    for ( var x = 0; x < chatlog.length; x++ ) {     
        replaceChatLine( chatlog[x] );          
    }
    
    if ( DEBUG ) {
        console.log('memberslist');
		console.log(membersList);
    }
    // Bigger chatbox
    $( '.wrapper').css({ 'width':'1135px' });
    $( '.chatscroll').css({ 'width':'850px','float':'left','padding-right':'3px','margin-bottom':'10px'});
    $( '.chatlog' ).css({ 'width' : '825px' });
	$( '.chatbase').css({ 'width':'850px' });
    
    // build membersList panel
    var membersListPanel = buildTag( 'ul', ({'addClass':'membersList'}) );

   // if ( !membersListPanel.html() ) {
        
        // until I find somewhere else to put this

        var a = document.createElement( 'a' );
        $( a ).attr({'href':'#unreadNotifications'});
        $( a ).click( function ( e ) {
            console.log( unreadNotifications );
        });
        
        var li = buildli( ({'addClass':'unreadNotifications','css':({ 'display':'none' }), 'html': a }) );
        $( membersListPanel ).append( li );

        // buttons

       	var button = document.createElement( 'button' );
       	$( button ).text( 'Debug' );
        if ( DEBUG )
            $( button ).css({'background':'green'});
        $( button ).click( function ( e ) {
            if ( GM_getValue('debug') ) {
                GM_setValue('debug',false);
                DEBUG = false;
                $( this ).css({'background':'#aaa'});
            } else {
                GM_setValue('debug',true);
                DEBUG = true;
                $( this ).css({'background':'green'});
            }
        });
        var li = buildli( button );
        
        button = document.createElement( 'button' );
       	$( button ).text( 'Reset' );
        $( button ).click( function ( e ) {
            resetWatchList();
        });
        $( li ).append( button );
        
        $( membersListPanel ).append( li );
        li = document.createElement( 'li' );
        $( li ).text( Object.keys( membersList ).length+" users since "+startTime );
        $( membersListPanel ).append( li );
    //}
    
    // build memberlist
    $.each( membersList, function ( id, data ) {
        //console.log('checking to add '+id);
		addUserToMembersList( id, data, membersListPanel );
     
    });
   
    // container
    var div = document.createElement( 'div' );
    $( div ).addClass( 'chat-right' );

 	// build tabs
    var tabs = document.createElement( 'div' );
    $( tabs ).addClass( 'watchTabs' );
    
    var dTab = document.createElement( 'div' );
    $( dTab ).html('UserList');

    $( dTab ).addClass( 'active userTab' );
    $( dTab ).click( function ( e ) {
        $( '.watchListSettings').hide();        
        $( '.membersList').show();
        $( '.userTab').addClass('active');
        $( '.watchTab').removeClass('active');
    });
    $( tabs ).append( dTab );

    var dTab = document.createElement( 'div' );    
    $( dTab ).html('WatchList');
    $( dTab ).addClass( 'watchTab' );
    $( dTab ).click( function ( e ) {
        $( '.membersList').hide();
        rebuildWatchListSettings( 0, false );
        $( '.watchListSettings').show();
        $( '.userTab').removeClass('active');
        $( '.watchTab').addClass('active');
    });
    $( tabs ).append( dTab );
    
    // build the watchlist settings menu
    var watchListSettings = document.createElement( 'div' );
    $( watchListSettings ).addClass( 'watchListSettings' );
    
    
    // stick it all together, put to right of chat
    $( div ).append( tabs );
    $( div ).append( buildTag('div', ({ 'html' : membersListPanel }) ) );
    $( div ).append( buildTag('div', ({ 'html' : watchListSettings })  ) );
    $( '.chatscroll').after( div );
    
    // this is useful for something.  What was it?
    $( '.chatscroll').scroll( function ( e ) {   });

    // update notifications tab with any items found in chatlog
    updateNotifications();
    loading = false;
}



// this is the function we hijack to read new chat messages.  need to try get it working for add_chat
unsafeWindow.scroll_to_bottom_of_chat = function () { 
    chatscroll.stop().animate({scrollTop:chatscroll[0].scrollHeight},1e3);
                                                      	
    var chatLine = $("div#chat .chatline:last-child");
                                                     	
    if ( !startTime ) 
		readChatLog();
    else
        chatLine =  replaceChatLine( chatLine );
} 

$(document).ready(function () {
	addGlobalStyle( css );
         loadWatchList();
    $( 'body').click( function ( e ) {
        

     $('.watchListDetails').hide();
        
     $('.watchListPanel').remove();

    });
    
});
/*
var help = ({
    "groupList"	:	"To edit a group name or color, click on the name or the color.  Clicking on the id will show the group details.<br>"
    				+"id's cannot be changed",
    */
