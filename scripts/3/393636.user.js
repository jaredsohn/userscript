// ==UserScript==
// @name        Twitch Plays Pokémon - Chat controller
// @namespace   http://www.twitch.tv/twitchplayspokemon*
// @match       http://www.twitch.tv/twitchplayspokemon*
// @version     1.0.2
// @description Add a gameboy-like controller in the Twitch Plays Pokemon chat with keyboard controls.
// @run-at      document-end
// ==/UserScript==

/*
    DISCLAIMER
    ----------
    Please do not use this to spam Twitch, it's awesome they want to host the channel (temporarily?) on their tournament server.
    If any rightholding owner of anything to do with the script has a problem with this script, please contact me immediately!
    This script is not meant to work as an emulator, but only to add input controls. If Nintendo has any issues with the purple buttons/keyshapes, they will be changed.
    Do not sell this. You may edit the code as you please and share it. Do not do this if you think there may be a legal issue with this and contact me if so!
    
    PS: This is my first userscript! :D
    
    HOW THIS WORKS
    --------------
    Go to twitchplayspokemon and you'll get a gameboy-like controller above the chat text-input field.
    Press the controller once to gain focus. When focussed, keyboard controls are activated. This simple code would otherwise give too many false-positive keypresses.
    A key can only be activated every 1/4 second. To change this, edit the COMMANDINTERVAL value (unit: milliseconds). This has been added to prevent server overflows
    if the script would get too popular. (whooo!) 
    
    Activate keys: press once within the controller or immediately on the button you want. Mouse input should just work.
    
    Standard keys: - keypad up,down,left,right
                   - keys a,b, s(select),d(start)
                   ( tested on an azerty keyboard => A may be Q )
    
    Rewrite keys: Press right mouse button once on a key to remap it. The key will stay red until a keyboard key has been pressed. ( some keys won't work bc of browser security )
                  The previous keybind will be deleted
    
    SCRIPT PERFORMANCE
    ------------------
    I wrote this in one long run without having an idea how it'd become, so the code is very inefficient and contains some ugly methods ( like a 16ms polling function )
    I may rewrite some parts of the code, but that's not sure.
    
    TO-DO (probably never)
    -----
    - the ugly, bad performing code
    - adding anarchy/democracy/ custom macro's
    - simple layout
    
    BROWSER COMPATIBILITY
    ---------------------
    Only tested on Google Chrome Version 32.0.1700.107 m on a 1920x1080 screen due to lack of time (different resolutions may give artefacts?) 
    
    VERSION HISTORY
    ---------------
    21/02/2014 early morning.... - First release ( bad coding, but works on chrome atm )
    21/02/2014 1.0.1rc           - Bad metadata
    03/03/2014 1.0.2             - Doesn't delete text input anymore when sending a command
    TL;DR
    -----
    - click once on the controller to activate keyboard controls
    - right mouse click on a button and press a key to map a new key to the control
*/

var PADSIZE = 100,
	BUTTONSIZE = PADSIZE/3,
	PADCOLOR = 'black',
	PADFONTCOLOR = 'white',
	PADRADIUS = BUTTONSIZE/4,
	ORBSIZE = PADSIZE/2,
	ORBFONT = 'arial',
	ORBFONTSIZE = ORBSIZE/2,
	ORBFONTCOLOR = 'white',
	ORBCOLOR = 'purple',
    ACTIVECOLOR = 'orange',
    KEYCHANGECOLOR = 'red',
	SPACING = ORBSIZE/4,
	VSPACING = 2*SPACING,
	BARCOLOR = 'grey',
	BARWIDTH = PADSIZE/2,
	BARHEIGHT = BARWIDTH/5,
	COMMANDINTERVAL = 250,
    ACTIVETIME = COMMANDINTERVAL/3,
    BUTTONSHADOW = '3px 3px 5px rgba(0,0,0,.3)',
    CONTAINERPADDING = 15,
    CONTAINERRADIUS = 25,
    CONTAINERCOLOR = 'rgba( 255, 255, 255, .5 )',
    CONTAINERSHADOW = 'rgba(0, 0, 0, 0.2) 3px 3px 15px inset, rgba(255, 255, 255, 0.2) 0px 0px 10px',
    TEXT = false,
    SUBMIT = false,
    BOTTOMSIZE = false;
    
var keyBind = new Object;
    keyBind.remove = function ( obj )
    {
        for ( var i in keyBind )
        {
            if ( keyBind[i] == obj )
            {
                keyBind[i] = false;
            }
        }
    }
    keyBind.set = function ( obj, key)
    {
        keyBind.remove( obj );
        keyBind[key] = obj;
    }

var container = document.createElement('div');
    container.style.padding = CONTAINERPADDING + 'px';
    container.style.marginBottom = 2*SPACING + 'px';
    container.style.textAlign = 'center';
    container.style.borderRadius = CONTAINERRADIUS + 'px';
    container.style.backgroundColor = CONTAINERCOLOR;
    container.style.boxShadow = CONTAINERSHADOW;
    container.tabIndex = 1;
    container.id = 'testid';
    container.onkeydown = function ( keyPress )
    {
        if ( keyBind[keyPress.keyCode] )
        {
            keyBind[keyPress.keyCode].activate();
        }
    }
    
var pad = document.createElement('div');
	pad.style.width  = PADSIZE + 'px';
	pad.style.height = PADSIZE + 'px';
	pad.style.position = 'relative';
	pad.style.display = 'inline-block';
	pad.style.cssFloat = 'left';

var buttonContainer = document.createElement('div');
	buttonContainer.style.display = 'inline-block';

var orb = document.createElement('div');
	orb.style.margin = SPACING + 'px';
	orb.style.width = 2*ORBSIZE+2*SPACING + 'px';
	orb.style.height = ORBSIZE + 'px';

var bar = document.createElement('div');
	bar.style.margin = SPACING + 'px';
	bar.style.marginTop = VSPACING + 'px';
	bar.style.lineHeight = BARHEIGHT + 'px';
	bar.style.width = 2*BARWIDTH + 2*SPACING + 'px';
	bar.style.height = BARHEIGHT + 'px';

container.appendChild( pad );
buttonContainer.appendChild( orb );
buttonContainer.appendChild( bar );
container.appendChild( buttonContainer );

keyBind[65] = new genOrb( 'A', 'a' );
keyBind[66] = new genOrb( 'B', 'b' );

keyBind[83] = new genBar( 'select' );
keyBind[68] = new genBar( 'start' );

keyBind[38] = new genPad( '&#x25B2', 1, 0, true, true, false, false, 'up' );
keyBind[40] = new genPad( '&#x25BC', 1, 2, false, false, true, true, 'down' );
keyBind[37] = new genPad( '&#x25C4', 0, 1, true, false, true, false, 'left' );
keyBind[39] = new genPad( '&#x25BA', 2, 1, false, true, false, true, 'right' );
genPad( '', 1, 1 ); // blank

var lastCommandTime = 0;
function queueCommand( command )
{
    var now = (new Date).getTime();
    if ( now - lastCommandTime > COMMANDINTERVAL )
    {
        var previousValue = TEXT.value;
        TEXT.value = command;
        SUBMIT.click();
        lastCommandTime = now;
        TEXT.value = previousValue;
    }
}

var pads = 0;
function genPad ( symbol, posX, posY, radTL, radTR, radBL, radBR, command )
{
    var b = document.createElement('div');
        b.style.backgroundColor = PADCOLOR;
        b.style.width = BUTTONSIZE + 'px';
        b.style.height = BUTTONSIZE + 'px';
        b.style.lineHeight = BUTTONSIZE + 'px';
        b.style.textAlign = 'center';
        b.style.color = PADFONTCOLOR;
        b.style.position = 'absolute';
        b.style.left = posX*BUTTONSIZE + 'px';
        b.style.top = posY*BUTTONSIZE + 'px';
        b.style.borderTopLeftRadius = radTL? PADRADIUS+'px' : 'none';
        b.style.borderTopRightRadius = radTR? PADRADIUS+'px' : 'none';
        b.style.borderBottomLeftRadius = radBL? PADRADIUS+'px' : 'none';
        b.style.borderBottomRightRadius = radBR? PADRADIUS+'px' : 'none';
        b.style.boxShadow = BUTTONSHADOW;
        b.innerHTML = symbol;
        b.style.cursor = 'pointer';
    function activate ()
    {
        b.style.backgroundColor = ACTIVECOLOR;
        queueCommand( command );
        setTimeout
        (
            function()
            {
                b.style.backgroundColor = PADCOLOR;
            },
            ACTIVETIME
        );
        queueCommand( command );
        return false; // for avoiding onclick selection
    }
    this.activate = activate;
    b.onclick = activate;
    var that = this;
    b.oncontextmenu = function ()
    {
        function fnEl( e )
            {
                keyBind.set( that, e.keyCode );
                b.style.backgroundColor = PADCOLOR;
                document.body.removeEventListener( 'keydown', fnEl );
            }
        el = document.body.addEventListener( 'keydown', fnEl );
        b.style.backgroundColor = KEYCHANGECOLOR;
        return false;
    }
    pad.appendChild( b );
}

function genOrb ( symbol, command )
{
	var o = document.createElement('div');
		o.style.display = 'inline-block';
		o.style.marginLeft = SPACING + 'px';
		o.style.backgroundColor = ORBCOLOR;
		o.style.width = ORBSIZE + 'px';
		o.style.height = ORBSIZE + 'px';
		o.style.borderRadius = ORBSIZE/2 + 'px';
		o.innerHTML = symbol;
		o.style.lineHeight = ORBSIZE + 'px';
		o.style.textAlign = 'center';
		o.style.fontSize = ORBFONTSIZE + 'px';
		o.style.fontFamily = ORBFONT;
		o.style.color = ORBFONTCOLOR;
        o.style.boxShadow = BUTTONSHADOW;
        o.style.fontWeight = 'bold';
        o.style.cursor = 'pointer';
    
    function activate ()
    {
        o.style.backgroundColor = ACTIVECOLOR;
        queueCommand( command );
        setTimeout
        (
            function()
            {
                o.style.backgroundColor = ORBCOLOR;
            },
            ACTIVETIME
        );
        queueCommand( command );
        return false; // for avoiding onclick selection
    }
    this.activate = activate;
    o.onclick = activate;
    var that = this;
    o.oncontextmenu = function ()
    {
        function fnEl( e )
            {
                keyBind.set( that, e.keyCode );
                o.style.backgroundColor = ORBCOLOR;
                document.body.removeEventListener( 'keydown', fnEl );
            }
        el = document.body.addEventListener( 'keydown', fnEl );
        o.style.backgroundColor = KEYCHANGECOLOR;
        return false;
    }
    
	orb.appendChild( o );
}

function genBar ( command )
{
    
	var b = document.createElement('div');
		b.style.display = 'inline-block';
		b.style.marginLeft = SPACING + 'px';
		b.style.backgroundColor = BARCOLOR;
		b.style.width = BARWIDTH + 'px';
		b.style.height = BARHEIGHT + 'px';
		b.style.borderRadius = BARHEIGHT/2 + 'px';
		b.style.lineHeight = BARHEIGHT + 'px';
        b.style.boxShadow = BUTTONSHADOW;
        b.style.cursor = 'pointer';
        
    function activate ()
    {
        b.style.backgroundColor = ACTIVECOLOR;
        queueCommand( command );
        setTimeout
        (
            function()
            {
                b.style.backgroundColor = BARCOLOR;
            },
            ACTIVETIME
        );
        queueCommand( command );
        return false; // for avoiding onclick selection
    }
    this.activate = activate;
    b.onclick = activate;
    var that = this;
    b.oncontextmenu = function ()
    {
        function fnEl( e )
            {
                keyBind.set( that, e.keyCode );
                b.style.backgroundColor = BARCOLOR;
                document.body.removeEventListener( 'keydown', fnEl );
            }
        el = document.body.addEventListener( 'keydown', fnEl );
        b.style.backgroundColor = KEYCHANGECOLOR;
        return false;
    }

	bar.appendChild( b );
}

function run ()
{
    if ( document.readyState == 'complete' && document.getElementById('chat_text_input') != null )
    {
        TEXT = document.getElementById('chat_text_input');
        TEXT.tabIndex = 2;
        SUBMIT = document.getElementById('chat_speak');
        TEXT.parentNode.insertBefore( container, TEXT );
        var el = document.getElementsByClassName('js-chat-scroll scroll stretch')[0];
        BOTTOMSIZE = parseInt(el.style.bottom)+165 + 'px';
        setInterval
        (
            function ()
            {
                if (el.style.bottom != BOTTOMSIZE )
                {
                    el.style.bottom = BOTTOMSIZE;
                }
            },
            16 // 60Hz screen refreshrate or somtn
        )
        return true;
    }
    else
    {
        return false;
    }
}

if ( document.readyState == 'complete' )
{
    run();
}
else
{
    document.addEventListener("readystatechange", function(){ runComplete = run() } );
}