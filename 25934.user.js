// ==UserScript==
// @name           gorthaur's okoun/old/ multi-purpose script
// @namespace      gorthaur
// @description    vastly enhances okoun/old/ experience :) !Opera compatible!
// @include        http://www.okoun.cz/old/boards/*
// @include        http://www.okoun.cz/old/board.jsp?*
// @include        http://www.okoun.cz/old/postArticle.do*
// @include        http://www.okoun.cz/old/markWelcomeMsg.do*
// @include        http://www.okoun.cz/old/markArticles.do*
// @include        http://www.okoun.cz/old/markFavouriteBoards.do*
// ==/UserScript==

var gorthaursokounscript_version = '0.5.4';
function undeff() { return; }
//-----------------------------------------------------------------------------
//{{{
// fill in this object with your preferred settings
// look at the examples in DemoSettings() for inspiration

function UserSettings()
{
    if ( window.opera ) {
        this.image_encloseinAtag = false;       // not needed in Opera
    }
    //this.okounform_label_BR = '\u23CE';
    //if ( false )        // update BR formatbutton with the same label
    {
        if ( typeof this.okounform_label_BR === 'string' ) {
            R.set( 'okounform_label_BR', this.okounform_label_BR );
            delete this.okounform_label_BR;
        }
        this.formatbuttons = R.get( 'formatbuttons' );
        this.formatbuttons[ 10 ][ 1 ] = R.get( 'okounform_label_BR' );
        // use radeox {code} button
        //this.formatbuttons[ 7 ][ 2 ] = '{code}%c{code}';
        //this.formatbuttons[ 7 ][ 3 ] = '{code}%r{code}';
        //this.formatbuttons[ 7 ][ 4 ] = 'r';
        R.set( 'formatbuttons', this.formatbuttons );
        delete this.formatbuttons;
    }
    globalstyle.other.push( '.posted-item-form textarea { width: 700px; height: 250px; }' );
    globalstyle.other.push( '.posted-item-form textarea { border-color: lightgray gray gray lightgray; }' );
    //this.navbar_labels = R.getDefault( 'navbar_labels_UNICODE' );
    this.okounpost_linkmarkers = R.getDefault( 'okounpost_linkmarkers' );
    //this.okounpost_linkmarkers = R.getDefault( 'okounpost_linkmarkers_UNICODE' );
    this.okounpost_linkmarkers[ 0 ] = '# ';
    this.okounpost_linkmarkers[ 1 ] = ' # (-%o)';
    
}

//}}}
// ABSOLUTELY NO EDITING BELOW THIS LINE, UNLESS YOU ARE CERTIFIED HAXX0R
//-----------------------------------------------------------------------------
//{{{
// examples of how to make your own configuration in UserSettings() object

function DemoSettings()
{
    if ( window.opera ) {
        this.image_encloseinAtag = false;       // not needed in Opera
    }
    
    // disable particular operation on images
    //this.image_addalttext    = false;
    //this.image_addtitle      = false;
    //this.image_encloseinAtag = false;
    // or disable them all at once
    //this.image_processing    = false;
    
    // these are the defaults:
    //this.badaltpattern         = /^(\s)*$/;
    //this.imagealtreplacement   = '{IMG SRC="%s" ALT="%a" TITLE="%t" /}';
    //this.badtitlepattern       = /^(\s)*$/;
    //this.imagetitlereplacement = '%s';
    // suggested options:
    //this.imagealtreplacement   = '{IMG NO ALT}';
    //this.imagetitlereplacement = '%f';
    
    // these disable autojumping
    //this.autojumpto_locationhash = false;
    //this.autojumpto_oldestnewpost = false;
    
    // autoset post format options (unless a post is being previewed)
    //this.defaultbodyType = 'Radeox';
    //this.defaultbodyType = 'Text';
    //this.defaultbodyType = 'Html';
    //this.defaultpreviewFlag = 'Checked';
    //this.defaultpreviewFlag = 'Unchecked';      // can this be of any use?
    
    // +1 force keep, -1 force hide
    // 0 auto (keeps if %r not present in current menulayout)
    //this.okounpost_keepoldreplylink = +1;
    
    // set all layouts for readwrite mode
    //this.menulayout_rw_0 = '%v %w \n %o %p \n %r | %h | %X';
    // set all layouts for read mode
    //this.menulayout_r__0 = '%v %w \n %o %p \n %h | %X';
    // understands %v, %w, %o, %p, %r, %h, &nbsp;, %b = \n, %X
    // particular menus for normal/context/root/search modes may be set
    
    // original contextId link text
    //this.okounpost_label_okolni = 'Okoln\u00ED p\u0159\u00EDsp\u011Bvky';
    
    if ( false )        // condensed menu design
    {
        this.menulayout_rw_0 = '%v %o \n %r %h';
        this.menulayout_r__0 = '%v %o %h';
        this.okounpost_label_vlakno       = '\u00A0V\u00A0';
        this.okounpost_label_okolni       = '\u00A0O\u00A0';
        this.okounpost_label_vlakno2      = '[V]';
        this.okounpost_label_okolni2      = '[O]';
        this.okounpost_label_htmlcopier   = '[H]';
        this.okounpost_label_replycontrol = '[Re]';
    }
    
    // <BR> button label default is:
    // Unicode Character 'DOWNWARDS ARROW WITH CORNER LEFTWARDS' (U+21B5)
    // http://www.fileformat.info/info/unicode/char/21b5/index.htm
    //
    // Unicode Character 'RETURN SYMBOL' (U+23CE)
    // http://www.fileformat.info/info/unicode/char/23ce/index.htm
    //this.okounform_label_BR = '\u23CE';
    // fall back to plain ASCII label
    //this.okounform_label_BR = 'BR';
    
    //if ( false )        // update BR formatbutton with the same label
    {
        if ( typeof this.okounform_label_BR === 'string' ) {
            R.set( 'okounform_label_BR', this.okounform_label_BR );
            delete this.okounform_label_BR;
        }
        this.formatbuttons = R.get( 'formatbuttons' );
        this.formatbuttons[ 10 ][ 1 ] = R.get( 'okounform_label_BR' );
        R.set( 'formatbuttons', this.formatbuttons );
        delete this.formatbuttons;
    }
    
    //this.okounpost_linkmarkers = [];            // all markers blank
    //this.okounpost_linkmarkers = R.getDefault( 'okounpost_linkmarkers' );
    // UNICODE version uses these two characters:
    // Unicode Character 'CLOCKWISE TOP SEMICIRCLE ARROW' (U+21B7)
    // http://www.fileformat.info/info/unicode/char/21b7/index.htm
    // Unicode Character 'VECTOR OR CROSS PRODUCT' (U+2A2F)
    // http://www.fileformat.info/info/unicode/char/2a2f/index.htm
    //this.okounpost_linkmarkers = R.getDefault( 'okounpost_linkmarkers_UNICODE' );
    if ( this.okounpost_linkmarkers instanceof Array ) {
        // no markers for local page links
        //this.okounpost_linkmarkers[ 0 ] = '';
        //this.okounpost_linkmarkers[ 1 ] = '';
        // Unicode Character 'DOWNWARDS ARROW' (U+2193)
        // http://www.fileformat.info/info/unicode/char/2193/index.htm
        //this.okounpost_linkmarkers[ 0 ] = '\u2193 ';
        //this.okounpost_linkmarkers[ 1 ] = ' \u2193';
        // Unicode Character 'MULTIPLICATION SIGN' (U+00D7)
        // http://www.fileformat.info/info/unicode/char/00d7/index.htm
        //this.okounpost_linkmarkers[ 4 ] = '\u00D7 ';
        //this.okounpost_linkmarkers[ 5 ] = ' \u00D7';
        // Unicode Character 'BLACK CIRCLE' (U+25CF)
        // http://www.fileformat.info/info/unicode/char/25cf/index.htm
        //this.okounpost_linkmarkers[ 4 ] = '\u25CF ';
        //this.okounpost_linkmarkers[ 5 ] = ' \u25CF';
    }
    //delete this.okounpost_linkmarkers;           // void all changes
    
    // 0 none, 1 assumed dead (default), 2 all
    //this.blockoutcominglinks = 1;
    
    // affects the way jumping to lower posts is performed
    // allowed values are 1, 2, 3, 4; 0 to completely disable jumping
    //this.postjump_mode = 0;
    
    // four values bellow are in pixels
    // margin above topmost post (takes magic string 'article-form-main')
    //this.postjump_extendtop    = 'article-form-main';
    // margin bellow bottommost post
    //this.postjump_extendbottom = 100;
    // count post as visible if only so much pixels is obscured
    //this.postjump_ignore       = 7;
    // the margin around jump target
    //this.postjump_margin       = 5;
    
    // disable jumping keyboard controls
    //this.keyboardjumping = false;
    
    // the default keybindings for jumping
    //this.jumpkeys_down    = 'nN';
    //this.jumpkeys_up      = 'bB';
    //this.jumpkeys_new     = 'hH';
    //this.jumpkeys_botttom = 'mM';
    //this.jumpkeys_top     = 'vV';
    //this.jumpkeys_menu    = '';
    
    // the delay between repeated jumps while holding mouse button
    // over the navigation bar (in miliseconds)
    // 0 for no repeat, -1 disables navbar
    //this.navjumpdelay = 333;    // default
    //this.navjumpdelay = 50;     // real fast
    
    //this.navbar_labels = R.getDefault( 'navbar_labels' );
    // use unicode characters for navbar labels
    //this.navbar_labels = R.getDefault( 'navbar_labels_UNICODE' );
    if ( this.navbar_labels instanceof Array ) {
        //this.navbar_labels[ 5 ] = '\u2605';   // black star (default in UC)
        //this.navbar_labels[ 5 ] = '\u2217';   // asterisk
        //this.navbar_labels[ 5 ] = '\u25CB';   // white circle
    }
    
    // default order
    //this.navbar_order = [ 1, 2, 3, 4, 5, 6, 7 ];
    // change the order to your liking, buttons may be omitted
    //this.navbar_order = [ 1, 0, 2, 4, 0, 3, 5 ];
    
    // change initial state of the 2 checkboxes
    //this.identry_chaddr_default = true;
    //this.identry_newtab_default = false;
    
    // the default flashing scheme
    //this.flash_repeat = 4;            // how many times switch colors
    //this.flash_timing = [ 40 ];       // delay(s) between switches in ms
    //this.flash_delay  = 1000;         // min 10, max 30000 (in ms)
    
    // erratic flashing mode
    //this.flash_repeat = 13; this.flash_timing = [ 50, 50, 50, 50, 250 ];
    //this.flash_repeat = 2; this.flash_timing = [ 150 ];       // calm mode
    //this.flash_repeat = 0;            // no flashing
    
    //this.flash_norepeat = 2500;       // min 10, max 30000 (in ms)
    
    // high contrast flashing
    //this.flashing_colors = R.getDefault( 'flashing_colors_HIGH_CONTRAST' );
    //this.flashing_colors = [ 'rgb( 100%, 0%, 0% )',
    //        '#0af19c', 'yellow', 'rgb( 10, -10, 160 )' ];       // eww
    
    // do not add the format buttons row
    //this.makeformatbuttons = false;
    if ( false )        // inserts some additional buttons
    {
        this.formatbuttons = R.get( 'formatbuttons' ).slice( 0, 3 );
        this.formatbuttons.push(
                [ 'strike',    'S',      '<strike>%c</strike>',
                                         '<strike>%r</strike>', 'h' ] );
        this.formatbuttons = this.formatbuttons.concat(
                R.get( 'formatbuttons' ).slice( 3, 7 ) );
        if ( false )    // more examples (not very useful)
        {
            this.formatbuttons.push(
                    [ 'small',     '-',      '<small>%c</small>',
                                             '<small>%r</small>',   'h' ],
                    [ 'big',       '+',      '<big>%c</big>',
                                             '<big>%r</big>',       'h' ],
                    [ 'sub',       'sub',    '<sub>%c</sub>',
                                             '<sub>%r</sub>',       'h' ],
                    [ 'sup',       'sup',    '<sup>%c</sup>',
                                             '<sup>%r</sup>',       'h' ] );
        }
        this.formatbuttons = this.formatbuttons.concat(
                R.get( 'formatbuttons' ).slice( 7 ) );
    }
    
    if ( false )        // reverses the order of first three buttons
    {
        this.formatbuttons = [
                    R.get( 'formatbuttons' )[ 2 ],
                    R.get( 'formatbuttons' )[ 1 ],
                    R.get( 'formatbuttons' )[ 0 ]
                ].concat( R.get( 'formatbuttons' ).slice( 3 ) );
    }
    
    // remove all but first four items from htmlents2
    //this.htmlents2 = R.getDefault( 'htmlents2' ).slice( 0, 4 );
    
    if ( false )        // adds some colors only to table bgcolors
    {
        this.bgcolors = R.getDefault( 'fontcolors' ).slice( 0, 8 );
        this.bgcolors.push( 'silver|st\u0159\u00EDbrn\u00E1' );
        this.bgcolors = this.bgcolors.concat(
                R.getDefault( 'fontcolors' ).slice( 8 ) );
        this.bgcolors.push( 'olive', 'maroon', 'orange|oran\u017Eov\u00E1' );
    }
    
    //this.max_table_cols = 10;         // default; max_max is 99
    //this.max_table_rows = 10;         // default; max_max is 99
    
    // disable the board pager link to current page recreation
    // currently idle
    //this.reactivatelinktocurrentpage = false;
    
    // how to handle CTRL + ENTER? default is +1 for the new method
    // 0 to disable, -1 keeps the old, buggy style
    //this.ctrlenterhandling = 0;
    
    // run when DOM ready (bare document loaded)
    //this.runASAP = false;       // turn off one run
    // run when page loaded completely
    //this.runLATE = false;       // turn off the other one
    // if both are true, it makes one full run, and jumps to #anchor later
    // if both are false, the script never does its job
    
    // in order to have the first execution run really ASAP in Opera,
    // the script filename MUST NOT end with .user.js
    // (but it of course must end with .js )
    
    // do not jump second time after so much miliseconds has passed
    //this.cancelnextrunafter = 2000;     // 2 seconds timer (default)
    //this.cancelnextrunafter = 0;        // 0 never jumps twice
    
    if ( false )        // examples of Ignorowacz object usage
    {
        this.ignorelist = [
            // exact nick "gorthaur" in board with exact name "hokus"
            new Ignorowacz( /^hokus$/, 'u', /^gorthaur$/ ),
            // nick ends with "isto", except for "MacPhisto", in any board
            new Ignorowacz( '*', '*', /isto$/i, /^MacPhisto$/ ),
            // nick contains "igi", board name contains at least 1 character
            new Ignorowacz( /./, 'u', /igi/ ),
            // empty nick everywhere
            new Ignorowacz( '*', '*', /^$/ ),
            // every anonymous in boards containing "kompost" in title
            new Ignorowacz( /kompost/i, 'A' ),
            null ];
    }
    //this.ignorelist = null;     // the default is to not ignore anyone
    
    // this is also a good place to have some sections of globalstyle object
    //delete globalstyle.narrowspaces;            // either removed
    //globalstyle.narrowspaces[ 1 ] = null;       // or altered at will
    //globalstyle.other.push( '.article div.marks { border: 2px dashed black; }' );
    // watch out, changing some may make stuff ugly or downright disfunctional
}
DemoSettings = undeff();

//}}}
//-----------------------------------------------------------------------------
//{{{

var globalstyle = {
    iconframe: [
        'div.user-icon { width: 40px; height: 50px; padding: 0; }',
        null ],
    narrowspaces: [
        '.article, .item, .posted-item { margin-top: 2px; margin-bottom: 2px; }',
        '.separator { font-size: 6px; }',
        null ],
    compactposts: [
        'div.context { margin-bottom: 0; padding-bottom: 0; }',
        'ul.article-menu { margin: 1px; font-size: 90%; padding: 0 0 0.5em 1.5em; }',
        null ],
    activepage: [
        '#board-pager .active { font-size: 107%; text-decoration: line-through; }',
        '#board-pager .active a { text-decoration: line-through; margin: 0 0.5em; }',
        null ],
    other: [
        'div.reply-form h3 { margin-top: 2px; margin-bottom: 2px; }',
        null ],
    general: [
        '._MAX_W_100P { max-width: 100%; }',
        '._D_IB { display:-moz-inline-block; display:-moz-inline-box;' +
                'display: inline-block; }', '._D_I { display: inline; }',
        '._T_A_C { text-align: center; }', '._T_A_R { text-align: right; }',
        '._RIGHT { margin-left: auto; margin-right: 0; }',
        '._CENTER { margin-left: auto; margin-right: auto; }',
        '._F_L { float: left; } ._F_R { float: right; }',
        '._C_L { clear: left; } ._C_B { clear: both; } ._C_R { clear: right; } ',
        'br._C_L, br._C_B, br._C_R { font-size: 1px; }',
        null ],
    toolboxes: [
        '.toolbox { background-color: silver; color: black; z-index: 100;' +
                ' width: auto; min-width: 100px; max-width: 70%;' +
                ' height: auto; min-height: 1.1em; max-height: 50%;' +
                ' margin: 0; border: 2px dashed black; padding: 5px; }',
        '.toolboxA { position: absolute; right: 2.5em; top: -20em; }',
        '.toolbox.shown { display: block; }',
        '.toolbox.hidden, .toolbox.shown.hidden {' +
                ' background-color: transparent; opacity: 0.0;' +
                ' display: none; top: -20em; z-index: -1; }',
        null ],
    dummyinput: [
        '.dummyinput, .dummyinput input {' +
                ' height: 0px; width: 0px; overflow: hidden;' +
                ' padding: 0; border: 0; margin: 0;' +
                ' background-color: inherit; color: silver; }',
        null ],
    minimized: [
        '.article.minimized > div, .item.minimized > div,' +
                ' .posted-item.minimized > div { display: none; }',
        '.article.minimized, .item.minimized, .posted-item.minimized {' +
                ' margin-bottom: 1em; margin-top: 0.3em;' +
                ' padding: 1px; border: 1px solid;' +
                ' float: left; clear: none; }',
        '.article .restore, .item .restore, .posted-item .restore {' +
                ' display: none; }',
        '.article.minimized .restore, .item.minimized .restore,' +
                ' .posted-item.minimized .restore { display: block;' +
                ' padding: 1px; border: 0; margin: 0 .4em; }',
        '.separator.minimized { display: none; }',
        '.minimized-author { font-weight: bold; }',
        '.minimized-author.anon { font-weight: normal; font-style: italic; }',
        null ],
    flashing: [],
    deletedarticle: [
        '.deleted-article { clear: both;' +
                ' padding: 0; border: 0; margin: 0; }',
        '.deleted-article .hr { overflow: hidden; height: 0px;' +
                'padding: 0; border: 3px solid red; margin: 0; }',
        '.deleted-article br { font-size: 6px; }',
        '.deleted-article br.hidden { display: none; }',
        null ]
};

//}}}
//-----------------------------------------------------------------------------
//{{{

var R = {
    CVs: {},
    maxDepth: 7,
    get: function get( name, depth ) {
        if ( typeof name !== 'string' ) { return; }
        var dD1 = R.DDs[ name ];
        if ( !( dD1 instanceof R.DDefinition ) ) { return; }
        if ( typeof R.CVs[ name ] !== 'undefined' )
            { return R.xport( R.CVs[ name ] ); }
        if ( typeof dD1.defVal !== 'undefined' )
            { return R.xport( dD1.defVal ); }
        if ( !R.DDefinition.checkName( dD1.cascade ) ) { return; }
        if ( typeof depth !== 'number' ) { depth = 0; }
        else {
            depth = Math.floor( depth );
            if ( depth > R.maxDepth ) { return; }
            if ( depth < 0 ) { depth = 1; }
        }
        return R.get( dD1.cascade, depth + 1 );
    },
    getDefault: function getDefault( name, depth ) {
        if ( typeof name !== 'string' ) { return; }
        var dD1 = R.DDs[ name ];
        if ( !( dD1 instanceof R.DDefinition ) ) { return; }
        if ( typeof dD1.defVal !== 'undefined' )
            { return R.xport( dD1.defVal ); }
        if ( !R.DDefinition.checkName( dD1.cascade ) ) { return; }
        if ( typeof depth !== 'number' ) { depth = 0; }
        else {
            depth = Math.floor( depth );
            if ( depth > R.maxDepth ) { return; }
            if ( depth < 0 ) { depth = 1; }
        }
        return R.getDefault( dD1.cascade, depth + 1 );
    },
    xport: function xport( value ) {
        if ( value instanceof Array ) { return value.slice( 0 ); }
        return value;
    },
    set: function set( name, value ) {
        var dD1, valid, v1, v2, v3;
        if ( typeof name !== 'string' ) { return false; }
        dD1 = R.DDs[ name ];
        if ( !( dD1 instanceof R.DDefinition ) ) {
            consolemsg( 'undefined name "' + name + '"' );
            return false;
        }
        valid = false; v1 = value;
        switch ( dD1.type ) {
            case 's' :
                if ( typeof v1 === 'string' ) { valid = true; }
                break;
            case 'b' :
                if ( typeof v1 === 'boolean' ) {
                    valid = true;
                } else if ( is_true( v1 ) ) {
                    v1 = true;
                    valid = true;
                } else if ( is_false( v1 ) ) {
                    v1 = false;
                    valid = true;
                }
                break;
            case 'i' :
                if ( typeof v1 === 'string' ) {
                    v1 = trim( v1 );
                    if ( v1 === 'NaN' ) {
                        v1 = NaN;
                        valid = true;
                    } else {
                        v2 = Math.floor( Number( v1 ) );
                        if ( String( v2 ) !== v1 ) { break; }
                        v1 = v2;
                        valid = true;
                    }
                } else if ( typeof v1 === 'number' ) {
                    if ( isNaN( v1 ) ) {
                        valid = true;
                    } else {
                        v2 = Math.floor( v1 );
                        if ( v2 !== v1 ) { break; }
                        v1 = v2;
                        valid = true;
                    }
                }
                if ( valid ) {
                    v2 = dD1.minVal;
                    if ( ( typeof v2 === 'number' ) &&
                            ( !isNaN( v2 ) ) && ( v2 > v1 ) ) {
                        valid = false;
                        break;
                    }
                    v2 = dD1.maxVal;
                    if ( ( typeof v2 === 'number' ) &&
                            ( !isNaN( v2 ) ) && ( v2 < v1 ) )
                        { valid = false; }
                }
                break;
            case 'r' :
                if ( v1 instanceof RegExp ) { valid = true; }
                break;
            case 'a' :
                if ( v1 instanceof Array ) { valid = true; }
                break;
        }
        if ( typeof dD1.specialCheck === 'function' ) {
            v3 = dD1.specialCheck( value, v1, valid );
            if ( typeof v3 === 'boolean' ) { valid = v3; }
            else if ( v3 instanceof Object ) {
                valid = true;
                v1 = v3.value;
            }
        }
        if ( valid ) {
            R.CVs[ name ] = v1;
            return true;
        }
        return false;
    },
    DDs: {},
    DDefinition: function DDefinition( dName, properties ) {
        this.type = '';
        this.defVal = undeff();
        this.cascade = undeff();
        this.minVal = this.maxVal = undeff();
        this.specialCheck = null;
        
        this.set = function set( name, value ) {
            var type, valid, v2;
            if ( typeof name !== 'string' ) { return false; }
            if ( name === 'cascade' ) {
                if ( R.DDefinition.checkName( value ) ) {
                    this[ name ] = value;
                    return true;
                } else {
                    return false;
                }
            }
            type = R.DDefinition.propertiesMap[ name ];
            if ( typeof type !== 'string' ) { return false; }
            valid = false;
            switch ( type ) {
                case '*' :
                    valid = true;
                    break;
                case 's' :
                    if ( typeof value !== 'string' ) { break; }
                    valid = true;
                    break;
                case 'i' :
                    if ( typeof value === 'string' ) {
                        value = trim( value );
                        v2 = Math.floor( Number( value ) );
                        if ( String( v2 ) !== value ) { break; }
                        value = v2;
                        valid = true;
                    } else if ( typeof value === 'number' ) {
                        if ( isNaN( value ) ) {
                            valid = true;
                            break;
                        }
                        v2 = Math.floor( value );
                        if ( v2 !== value ) { break; }
                        value = v2;
                        valid = true;
                    }
                    break;
                case 'f' :
                    if ( value === null ) { valid = true; }
                    if ( typeof value === 'function' ) { valid = true; }
                    break;
            }
            if ( !valid ) { return false; }
            this[ name ] = value;
            return true;
        };
        
        this.toString = function toString() {
            var ret = 'DD: "' + this.type + '"';
            if ( typeof this.defVal !== 'undefined' ) { ret += ', [' + this.defVal + ']'; }
            else if ( R.DDefinition.checkName( this.cascade ) )
                { ret += ', => "' + this.cascade + '"'; }
            if ( typeof this.minVal === 'number' ) { ret += ', ' + this.minVal + ' <'; }
            if ( typeof this.maxVal === 'number' ) { ret += ', < ' + this.minVal + ''; }
            if ( typeof this.specialCheck === 'function' ) { ret += ', specialCheck'; }
            return ret;
        };
        
        for ( var i in properties ) {
            if ( properties.hasOwnProperty( i ) ) {
                this.set( i, properties[ i ] );
            }
        }
        
        R.addDD( dName, this );
    },
    addDD: function addDD( name, dD1 ) {
        if ( ( typeof name !== 'string' ) ||
                !( dD1 instanceof R.DDefinition ) )
            { return false; }
        var key = trim( name );
        if ( !R.DDefinition.checkName( key ) ) { return false; }
        R.DDs[ key ] = dD1;
        return true;
    },
    i: {}       // internal variables
};

R.DDefinition.propertiesMap = {
    type: 's',
    defVal: '*',
    cascade: 's',
    minVal: 'i',
    maxVal: 'i',
    specialCheck: 'f'
};

R.DDefinition.checkName = function( name ) {
    if ( typeof name !== 'string' ) { return false; }
    if ( /^[A-Za-z_][A-Za-z_0-9]*$/.test( name ) ) { return true; }
    return false;
};

R.DDs.toString = function toString() {
    var ret = '[', cnt = 0, i;
    for ( i in R.DDs ) {
        if ( R.DDs.hasOwnProperty( i ) ) {
            if ( !( R.DDs[ i ] instanceof R.DDefinition ) ) { continue; }
            if ( cnt++ >= 0 ) { ret += '\n'; }
            ret += i + ' => ' + R.DDs[ i ];
        }
    }
    if ( cnt > 0 ) { ret += '\n'; }
    ret += ']';
    return ret;
};

//}}}
//-----------------------------------------------------------------------------
//{{{

function RDD( name, properties ) {
    var dummy = new R.DDefinition( name, properties );
}

RDD( 'image_processing',      { type: 'b', defVal: true } );
RDD( 'image_addalttext',      { type: 'b', defVal: true } );
RDD( 'image_addtitle',        { type: 'b', defVal: true } );
RDD( 'image_encloseinAtag',   { type: 'b', defVal: true } );
RDD( 'badaltpattern',         { type: 'r', defVal: /^(\s)*$/ } );
RDD( 'imagealtreplacement',   { type: 's', defVal: '{IMG SRC="%s" ALT="%a" TITLE="%t" /}' } );
RDD( 'badtitlepattern',       { type: 'r', defVal: /^(\s)*$/ } );
RDD( 'imagetitlereplacement', { type: 's', defVal: '%s' } );
RDD( 'autojumpto_locationhash',  { type: 'b', defVal: true } );
RDD( 'autojumpto_oldestnewpost', { type: 'b', defVal: true } );
RDD( 'defaultbodyType',    { type: 's', defVal: '' } );
RDD( 'defaultpreviewFlag', { type: 's', defVal: '' } );
RDD( 'okounpost_keepoldreplylink', { type: 'i', defVal: 0, minVal: -1, maxVal: +1 } );
RDD( 'menulayout_rw_0', { type: 's', defVal: '%v \n %o \n %r %h' } );
RDD( 'menulayout_r__0', { type: 's', defVal: '%v \n %o \n %h' } );
RDD( 'menulayout_rw_normal',  { type: 's', cascade: 'menulayout_rw_0' } );
RDD( 'menulayout_rw_context', { type: 's', cascade: 'menulayout_rw_0' } );
RDD( 'menulayout_rw_root',    { type: 's', cascade: 'menulayout_rw_0' } );
RDD( 'menulayout_rw_search',  { type: 's', cascade: 'menulayout_rw_0' } );
RDD( 'menulayout_r__normal',  { type: 's', cascade: 'menulayout_r__0' } );
RDD( 'menulayout_r__context', { type: 's', cascade: 'menulayout_r__0' } );
RDD( 'menulayout_r__root',    { type: 's', cascade: 'menulayout_r__0' } );
RDD( 'menulayout_r__search',  { type: 's', cascade: 'menulayout_r__0' } );
RDD( 'okounpost_label_vlakno', { type: 's', defVal: 'Vl\u00E1kno' } );
RDD( 'okounpost_label_okolni', { type: 's', defVal: 'Okoln\u00ED' } );
RDD( 'okounpost_label_vlakno2', { type: 's', defVal: '[V]' } );
RDD( 'okounpost_label_okolni2', { type: 's', defVal: '[Op]' } );
RDD( 'okounpost_label_htmlcopier', { type: 's', defVal: '[H]' } );
RDD( 'okounpost_label_replycontrol', { type: 's', defVal: '[Re]' } );
RDD( 'okounform_label_BR',           { type: 's', defVal: '\u21B5' } );
RDD( 'okounpost_linkmarkers',        { type: 'a', defVal: [
        '# ', ' # (-%o)', '-> ', ' ->', 'X ', ' X' ] } );
RDD( 'okounpost_linkmarkers_UNICODE', { type: 'a', defVal: [
        '# ', ' # (-%o)', '\u21B7 ', ' \u21B7', '\u2A2F ', ' \u2A2F' ] } );
RDD( 'secret_option_b_1',     { type: 'b', defVal: false } );
RDD( 'blockoutcominglinks',   { type: 'i', defVal: 1, minVal: 0, maxVal: 2 } );
RDD( 'postjump_mode',         { type: 'i', defVal: 3, minVal: 0, maxVal: 4 } );
RDD( 'postjump_ignore',       { type: 'i', defVal: 7, minVal: 0, maxVal: 100 } );
RDD( 'postjump_margin',       { type: 'i', defVal: 5, minVal: 0, maxVal: 100 } );
RDD( 'postjump_extendbottom', { type: 'i', defVal: 100, minVal: 0, maxVal: 1000 } );
RDD( 'postjump_extendtop',
        { type: 'i', defVal: 'article-form-main', minVal: 0, maxVal: 1000,
            specialCheck: function specialCheck( value, newVal, valid )
            {
                if ( value === 'article-form-main' ) { return true; }
                return;
            }
        } );
RDD( 'keyboardjumping',  { type: 'b', defVal: true } );
RDD( 'jumpkeys_down',    { type: 's', defVal: 'nN' } );
RDD( 'jumpkeys_up',      { type: 's', defVal: 'bB' } );
RDD( 'jumpkeys_new',     { type: 's', defVal: 'hH' } );
RDD( 'jumpkeys_botttom', { type: 's', defVal: 'mM' } );
RDD( 'jumpkeys_top',     { type: 's', defVal: 'vV' } );
RDD( 'jumpkeys_menu',    { type: 's', defVal: '' } );
RDD( 'navjumpdelay',  { type: 'i', defVal: 333, minVal: -1, maxVal: 2000 } );
RDD( 'navbar_labels', { type: 'a', defVal: [
        'm', '|<', '/\\', '\\/', '>|', '*', '#'
        ] } );
RDD( 'navbar_labels_UNICODE', { type: 'a', defVal: [
        '\u21F1', '\u25F8', '\u25B3', '\u25BD', '\u25FF', '\u2605', '#'
        ] } );
RDD( 'navbar_order',  { type: 'a', defVal: [ 1, 2, 3, 4, 5, 6, 7 ] } );
RDD( 'identry_chaddr_default', { type: 'b', defVal: false } );
RDD( 'identry_newtab_default', { type: 'b', defVal: true } );
RDD( 'flash_repeat',     { type: 'i', defVal: 4, minVal: 0, maxVal: 50 } );
RDD( 'flash_timing',     { type: 'a', defVal: [ 40 ] } );
RDD( 'flash_delay',      { type: 'i', defVal: 1000, minVal: 10, maxVal: 30000 } );
RDD( 'flash_norepeat',   { type: 'i', defVal: 2500, minVal: 10, maxVal: 30000 } );
RDD( 'flashing_colors',  { type: 'a', defVal:
        [ 'lightgray', 'gray', '#33ccff', '#ffccdd' ] } );
RDD( 'flashing_colors_HIGH_CONTRAST',  { type: 'a', defVal:
        [ 'white', 'black', 'black', 'white' ] } );
RDD( 'makeformatbuttons', { type: 'b', defVal: true } );
RDD( 'formatbuttons', { type: 'a', defVal: [
        [ 'bold',      'B',      '<strong>%c</strong>',
                                 '<strong>%r</strong>', 'h' ],
        [ 'italic',    'I',      '<em>%c</em>',
                                 '<em>%r</em>',         'h' ],
        [ 'underline', 'U',      '<u>%c</u>',
                                 '<u>%r</u>',           'h' ],
        [ 'tagpair',   '<?>',    '<%1%3>%2</%1>',
                                 '<%1%3>%2</%1>',       'h', 'tagpair', '2' ],
        [ 'url',       'URL',    '<a href="%1" %3>%2</a>',
                                 '%b',                  'h', 'url', '2' ],
        [ 'img',       'IMG',    '<img src="%1" %2%3>',
                                 '%b',                  'h', 'img', '1' ],
        [ 'font',      'FONT',  '<font %1%2>%3</font>',
                                 '%b',                  'h', 'font', '3' ],
        [ 'code',      '{c}',    '<div class="code" ><pre>\n%c\n</pre></div>',
                                 '%b%r%a',              'h' ],
        [ 'table',     'T',      '<table%3>\n%4%c%5</table>',
                                 '<table>\n<tr><td>%r</td></tr>\n</table>',
                                                        'h', 'table', '4' ],
        [ 'html',      '&X;',    '%1',
                                 '%1',                  'h', 'html', '1' ],
        [ 'br',        'BR',     '<br>\n',
                                 '<p>%r</p>\n',         'h' ],
        null ] } );
RDD( 'htmlents1',  { type: 'a', defVal: [
        '>lt', '<nbsp', '<gt', '/',
        '<amp', '<quot', '<apos', '/',
        'bdquo', 'ldquo', 'sbquo', 'lsquo', 'hellip', 'mdash', 'ndash', '/',
        null ] } );
RDD( 'htmlents2',  { type: 'a', defVal: [
        'plusmn', 'minus', 'frasl', 'divide', 'times', 'middot', 'bull', '/',
        'equiv', 'cong', 'asymp', 'sim', 'ne', 'le', 'ge', '/',
        'radic', 'sum', 'prod', 'pi', 'micro', 'infin', '#x2300', '/',
        'empty', 'and', 'or', 'not', 'deg', 'prime', 'Prime', '/',
        'sup1', 'sup2', 'sup3', 'frac14', 'frac12', 'frac34', 'permil', '/',
        'copy', 'reg', 'trade', 'brvbar', 'cent', 'euro', '/',
        'alefsym', 'iexcl', 'iquest', '#x2642', '#x2640', 'para', 'crarr', '/',
        'larr', 'uarr', 'darr', 'rarr', '#x2195', 'harr', '/',
        'lArr', 'uArr', 'dArr', 'rArr', '#x21d5', 'hArr', '/',
        null ] } );
RDD( 'taglist',  { type: 'a', defVal: [
        'strike', 'sup', 'sub', 'pre',
        'center', 'blockquote', 'code', 'cite', 'big', 'small',
        'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        null ] } );
RDD( 'fontcolors',  { type: 'a', defVal: [
        'fuchsia|fialov\u00E1', 'blue/white|modr\u00E1',
        'cyan|azurov\u00E1', 'lime|zelen\u00E1',
        'yellow/black|y)\u017Elut\u00E1', 'red|r)\u010Derven\u00E1',
        'white/black|w)b\u00EDl\u00E1',
        'lightgray/black|\u0161ed\u00E1 17%',
        //'silver|st\u0159\u00EDbrn\u00E1', // = 25% g(r)ay
        'darkgray|\u0161ed\u00E1 34%', 'gray|g)\u0161ed\u00E1 50%',
        'black/white|b)\u010Dern\u00E1',
        'violet', 'purple',
        'navy/white', 'teal', 'green',
        //'olive', 'maroon',
        //'orange|oran\u017Eov\u00E1',
        null ] } );
RDD( 'bgcolors', { type: 'a', cascade: 'fontcolors' } );
RDD( 'max_table_cols', { type: 'i', defVal: 10, minVal: 1, maxVal: 99 } );
RDD( 'max_table_rows', { type: 'i', defVal: 10, minVal: 1, maxVal: 99 } );
RDD( 'reactivatelinktocurrentpage', { type: 'b', defVal: true } );
RDD( 'ctrlenterhandling',  { type: 'i', defVal: +1, minVal: -1, maxVal: +1 } );
RDD( 'forceoperamode', { type: 'i', defVal: 0, minVal: -1, maxVal: +1 } );
RDD( 'runASAP', { type: 'b', defVal: true } );
RDD( 'runLATE', { type: 'b', defVal: true } );
RDD( 'cancelnextrunafter', { type: 'i', defVal: 2000, minVal: 0, maxVal: 99000 } );
RDD( 'ignorelist', { type: 'a', defVal: null,
            specialCheck: function specialCheck( value, newVal, valid )
            {
                if ( value === null ) { return true; }
                return;
            }
        } );

RDD = undeff();

//}}}
//-----------------------------------------------------------------------------
//{{{

function applySettings() {
    for ( var i in this ) {
        if ( this.hasOwnProperty( i ) ) {
            R.set( i, this[ i ] );
        }
    }
}

( function() {
    var dummy;
    
    if ( typeof DemoSettings === 'function' ) {
        try {
            DemoSettings.prototype.applySettings = applySettings;
            dummy = new DemoSettings().applySettings();
        } finally {
            DemoSettings = undeff();
        }
    }
    
    if ( typeof UserSettings === 'function' ) {
        try {
            UserSettings.prototype.applySettings = applySettings;
            dummy = new UserSettings().applySettings();
        } finally {
            UserSettings = undeff();
        }
    }
    
    if ( typeof ExternSettings === 'function' ) {
        try {
            ExternSettings.prototype.applySettings = applySettings;
            dummy = new ExternSettings().applySettings();
        } finally {
            ExternSettings = undeff();
        }
    }
} )();

applySettings = undeff();

//}}}
//-----------------------------------------------------------------------------
//{{{

R.putToInternal = function putToInternal() {
    var i, names = [
            'image_addalttext', 'image_addtitle', 'image_encloseinAtag',
            'image_processing',
            'badaltpattern', 'imagealtreplacement',
            'badtitlepattern', 'imagetitlereplacement',
            'okounpost_keepoldreplylink',
            'okounpost_label_vlakno', 'okounpost_label_okolni',
            'okounpost_label_vlakno2', 'okounpost_label_okolni2',
            'okounpost_label_htmlcopier', 'okounpost_label_replycontrol',
            'okounform_label_BR', 'okounpost_linkmarkers',
            'blockoutcominglinks',
            'postjump_mode', 'postjump_extendtop', 'postjump_extendbottom',
            'postjump_ignore', 'postjump_margin',
            'jumpkeys_down', 'jumpkeys_up', 'jumpkeys_new',
            'jumpkeys_botttom', 'jumpkeys_top', 'jumpkeys_menu',
            'navjumpdelay',
            'flash_repeat', 'flash_timing', 'flash_delay',
            'flash_norepeat', 'flashing_colors',
            'ignorelist',
            null ];
    for ( i = 0; i < names.length; i++ ) {
        if ( typeof names[ i ] === 'string' )
            { R.i[ names[ i ] ] = R.get( names[ i ] ); }
    }
};
R.putToInternal();

R.i.globalstyle = globalstyle;
globalstyle = undeff();

//}}}
//-----------------------------------------------------------------------------
//{{{

function gorthaursokounscript_init() {
    if ( !/okoun\.cz\/old\/(board|post|mark)/.test( window.location.href ) )
        { return; }
    
    R.i.goruncounter = 0;               // int >= 0
    R.i.boardadddresspattern =          // RegExp
            /^([^?&%=#]*okoun\.cz\/old\/boards\/([^?&=#]*))(;jsessionid=[\dA-F]+)?$/;
    R.i.boardaddress = null;            // null | string | false
    R.i.boardname    = null;            // null | string | false
    R.i.autojumpto   = null;            // null | string "#id"
    R.i.oldestnewid  = NaN;             // NaN | int >= 1 | string "#id"
    R.i.keycaptureon = false;           // boolean
    R.i.pagelayout   = '';              // string { '', 'n', 'r', 'c', 's' }
    R.i.cancelnextruntimer = null;      // null | int TimerID
    R.i.nextruncancelled  = false;      // boolean
    R.i.documentheadelement = null;     // null | Node | false
    R.i.posteditempreview = null;       // null | Node | false
    R.i.mainform = null;                // null | Node | false
    R.i.mainformtextarea  = null;       // null | Node | false
    R.i.activetextarea2 = null;         // null | Node
    R.i.formatbuttons2 = null;          // null | Node | false
    R.i.formatbuttons1 = null;          // null | Node | false
    R.i.fbatarget = null;               // null | Node
    R.i.gotoNewLink = null;             // null | Node
    
    var state = 1, fom = R.get( 'forceoperamode' ),
            runASAP = R.get( 'runASAP' ), runLATE = R.get( 'runLATE' );
    if ( fom !== -1 ) {
        if ( typeof document.readyState === 'string' ) {
            if ( document.readyState === 'interactive' ) {
                state = 0;
            } else if ( document.readyState === 'complete' ) {
                state = 2;
            } else {
                state = 0;      // should this even happen?
            }
        }
    }
    if ( state === 2 )
    {
        if ( runASAP || runLATE ) { gorthaursokounscript_go(); }
    }
    else
    {
        if ( runASAP ) {
            if ( ( state === 0 ) || ( fom === +1 ) ) {
                window.addEventListener( 'DOMContentLoaded',
                        gorthaursokounscript_go, false );
            } else if ( state === 1 ) {
                 gorthaursokounscript_go();
            }
        }
        if ( runLATE ) {
            window.addEventListener( 'load', gorthaursokounscript_go, false );
        }
    }
}

//}}}
//-----------------------------------------------------------------------------
//{{{

var AIDs = {
    a: [],
    m: {},
    ordered: true,
    init: function init() {
        AIDs.a = [];
        AIDs.m = {};
        AIDs.ordered = false;
    },
    AID: function AID( articleId, dead ) {
        if ( !/^\d\d*$/.test( articleId ) ) {
            this.articleId = null;
            this.dead = null;
        } else {
            this.articleId = Number( articleId );
            this.dead = is_true( dead );
        }
    },
    add: function add( articleId, dead ) {
        if ( !/^\d\d*$/.test( articleId ) ) { return false; }
        var hash = Number( articleId ), aid = new AIDs.AID( hash, dead );
        if ( aid.articleId !== hash ) { return false; }
        if ( typeof AIDs.m[ hash ] === 'undefined' ) {
            AIDs.m[ hash ] = AIDs.a.length;
            AIDs.a.push( aid );
        } else {
            AIDs.a[ AIDs.m[ hash ] ] = aid;
        }
        AIDs.ordered = false;
    },
    get: function get( articleId ) {
        if ( !/^\d\d*$/.test( articleId ) ) { return null; }
        if ( AIDs.ordered !== true ) { AIDs.sort(); }
        var i = AIDs.m[ Number( articleId ) ];
        if ( ( typeof i !== 'number' ) || !( AIDs.a[ i ] instanceof AIDs.AID ) )
            { return null; }
        return AIDs.a[ i ];
    },
    getIndexOf: function getIndexOf( aid ) {
        if ( aid instanceof AIDs.AID ) { aid = aid.articleId; }
        if ( !/^\d\d*$/.test( aid ) ) { return null; }
        if ( AIDs.ordered !== true ) { AIDs.sort(); }
        aid = Number( aid );
        var lo = 0, hi = AIDs.a.length - 1, center;
        while ( lo < hi ) {
            center = Math.floor( ( lo + hi ) / 2 );
            if ( AIDs.a[ center ].articleId === aid ) {
                lo = hi = center; break;
            }
            else if ( AIDs.a[ center ].articleId > aid ) { hi = center; }
            else {
                if ( !( lo < center ) ) {
                    lo = center + 1;
                    break;
                }
                lo = center;
            }
        }
        if ( AIDs.a[ lo ].articleId < aid ) { lo++; }
        return lo;
    },
    isDead: function isDead( articleId ) {
        var aid = AIDs.get( articleId );
        if ( aid instanceof AIDs.AID ) { return aid.dead; }
        return null;
    },
    newestId: function newestId() {
        if ( AIDs.a.length < 1 ) { return null; }
        if ( AIDs.ordered !== true ) { AIDs.sort(); }
        return AIDs.a[ AIDs.a.length - 1 ].articleId;
    },
    oldestId: function oldestId() {
        if ( AIDs.a.length < 1 ) { return null; }
        if ( AIDs.ordered !== true ) { AIDs.sort(); }
        return AIDs.a[ 0 ].articleId;
    },
    sort: function sort() {
        AIDs.a.sort( AIDs.sort.sortFunc );
        AIDs.m = {};
        for ( var i = 0; i < AIDs.a.length; i++ ) {
            AIDs.m[ AIDs.a[ i ].articleId ] = i;
        }
        AIDs.ordered = true;
    },
    findLiveNeighbors: function findLiveNeighbors( articleId ) {
        if ( !/^\d\d*$/.test( articleId ) ) { return null; }
        if ( AIDs.ordered !== true ) { AIDs.sort(); }
        var newer = NaN, older = NaN, i, target = as_intInRange(
                AIDs.m[ Number( articleId ) ], false, 0, null );
        if ( typeof target !== 'number' ) { return null; }
        if ( !( AIDs.a[ target ] instanceof AIDs.AID ) ) { return null; }
        for ( i = target - 1 ; i >= 0; i-- ) {
            if ( !is_true( AIDs.a[ i ].dead ) ) {
                newer = AIDs.a[ i ].articleId;
                break;
            }
        }
        for ( i = target + 1 ; i < AIDs.a.length; i++ ) {
            if ( !is_true( AIDs.a[ i ].dead ) ) {
                older = AIDs.a[ i ].articleId;
                break;
            }
        }
        return { newer: newer, older: older };
    },
    countLive: function countLive() {
        var cnt = 0, i;
        for ( i = 0; i < AIDs.a.length; i++ ) {
            if ( !is_true( AIDs.a[ i ].dead ) ) { cnt++; }
        }
        return cnt;
    },
    getLiveIDs: function getLiveIDs() {
        var ret = [], i;
        for ( i = 0; i < AIDs.a.length; i++ ) {
            if ( !is_true( AIDs.a[ i ].dead ) ) {
                ret.push( AIDs.a[ i ].articleId );
            }
        }
        return ret;
    },
    getOffset: function getOffset( a1, a2 ) {
        if ( a1 === '*' ) {}
        else if ( !/^\d\d*$/.test( a1 ) ) { return null; }
        if ( !/^\d\d*$/.test( a2 ) ) { return null; }
        var ret = null, dir, cnt, i, l = AIDs.a.length, aid, dead,
                newest = AIDs.a[ l - 1 ].articleId,
                oldest = AIDs.a[ 0 ].articleId;
        if ( ( typeof newest !== 'number' ) || ( typeof oldest !== 'number' ) )
            { return null; }
        if ( a1 === '*' ) { a1 = newest*2; }
        else { a1 = Number( a1 ); }
        a2 = Number( a2 );
        dir = ( a1 > a2 ) ? +1 : -1;
        i = AIDs.getIndexOf( a1 );
        for ( cnt = 0; ; ) {
            aid = AIDs.a[ i ];
            if ( aid && aid instanceof AIDs.AID ) {
                dead = aid.dead;
                aid = aid.articleId;
            }
            else {
                dead = null;
                aid = null;
            }
            if ( dir > 0 ) {
                if ( i < 0 ) { break; }
                if ( ( typeof aid !== 'number' ) || ( aid > a2 ) ) {
                    if ( dead !== true ) { cnt += dir; }
                    i--;
                }
                else if ( aid === a2 ) { ret = cnt; break; }
                else { break; }
            } else {
                if ( i >= l ) { break; }
                if ( ( typeof aid !== 'number' ) || ( aid < a2 ) ) {
                    if ( dead !== true ) { cnt += dir; }
                    i++;
                }
                else if ( aid === a2 ) { ret = cnt; break; }
                else { break; }
            }
        }
        //consolemsg( '' + a1 + '-' + a2 +' : ' + ret + ' .' );
        return ret;
    }
};

AIDs.sort.sortFunc = function sortFunc( a, b ) {
    return a.articleId - b.articleId;
};

AIDs.AID.prototype.toString = function toString() {
    var ret = 'A[ ';
    if ( typeof this.articleId === 'number' ) {
        ret += this.articleId;
    } else { ret += '-'; }
    ret += ', ';
    if ( this.dead === true ) { ret += '+'; }
    else if ( this.dead === false ) { ret += '*'; }
    else { ret += '?'; }
    ret += ' ]';
    return ret;
};
//}}}
//-----------------------------------------------------------------------------
//{{{

//2do: add related
var AIDUtils = {
    getArticleNodeID: function getArticleNodeID( element, mode ) {
        var ae, articleId, pr, p1, m;
        ae = getparenarticle( element );
        if ( !ae ) { return null; }
        articleId = ae.getAttribute( 'id' );
        p1 = /^article-(\d\d*)$/;
        if ( !( pr = p1.exec( articleId ) ) ) { return null; }
        m = as_intInRange( mode, false, 1, 3 );
        if ( typeof m !== 'number' ) { m = 1; }
        if ( m === 2 ) { articleId = String( pr[ 1 ] ); }
        else if ( m === 3 ) { articleId = Number( pr[ 1 ] ); }
        return articleId;
    },
    getArticleNumber: function getArticleNumber( source, modes ) {
        var ret, pr, p1, m = as_intInRange( modes, false, +1, null );
        if ( typeof m === 'number' ) { m = m & 7; }
        else { m = 7; }
        ret = source;
        if ( ( m & 2 ) && ( typeof ret === 'string' ) ) {
            if ( m & 4 ) {
                if ( ret.charAt( 0 ) === '#' )
                    { ret = ret.substring( 1 ); }
            }
            p1 = /^article-(\d\d*)$/;
            if (( pr = p1.exec( ret ) )) {
                ret = Number( pr[ 1 ] );
                if ( ret > 0 ) { return ret; }
            }
        }
        if ( m & 1 ) {
            ret = as_intInRange( source, false, +1, null );
            if ( typeof ret === 'number' ) { return ret; }
        }
        return null;
    },
    getCompleteAID: function getCompleteAID( source, modes ) {
        var ret, pr, p1, m = as_intInRange( modes, false, +1, null );
        if ( typeof m === 'number' ) { m = m & 7; }
        else { m = 7; }
        ret = source;
        if ( ( m & 2 ) && ( typeof ret === 'string' ) ) {
            if ( m & 4 ) {
                if ( ret.charAt( 0 ) === '#' )
                    { ret = ret.substring( 1 ); }
            }
            p1 = /^article-(\d\d*)$/;
            if (( pr = p1.exec( ret ) )) {
                if ( Number( pr[ 1 ] ) > 0 ) { return ret; }
            }
        }
        if ( m & 1 ) {
            ret = as_intInRange( source, false, +1, null );
            if ( typeof ret === 'number' ) { return 'article-' + ret; }
        }
        return null;
    }
};

//}}}
//-----------------------------------------------------------------------------
//{{{

function hilitedeletedarticle( articleId ) {
    var an, ln, above = true, top = false, id = null, e1, before;
    an = AIDUtils.getArticleNumber( articleId );
    if ( typeof an !== 'number' ) { return false; }
    ln = AIDs.findLiveNeighbors( an );
    if ( !ln ) { return false; }
    if ( typeof as_intInRange( ln.newer, false, 1, null ) !== 'number' ) {
        top = true;
    } else {
        id = AIDUtils.getCompleteAID( ln.newer );
        if ( typeof id === 'string' ) { e1 = document.getElementById( id ); }
    }
    if ( !e1 ) {
        above = false;
        id = AIDUtils.getCompleteAID( ln.older );
        if ( typeof id === 'string' ) { e1 = document.getElementById( id ); }
    }
    if ( !e1 ) { return false; }
    classNameUtil( R.i.deletedarticlemarker.firstChild,
            'hidden', ( top ? -1 : +1 ) );
    before = above ? e1 : e1.nextSibling;
    e1.parentNode.insertBefore( R.i.deletedarticlemarker, before );
    R.i.deletedarticlemarker.id = 'deleted-article-' + an;
    return true;
}

function jumptodeletedarticle( setLocation ) {
    var id = R.i.deletedarticlemarker.id;
    if ( ( typeof id !== 'string' ) || ( id.length < 1 ) ) { return false; }
    if ( is_true( setLocation ) && ( window.location.hash === ( '#' + id ) ) )
    {
        window.location.hash = '#' + id;
    } else {
        jumptoelement( R.i.deletedarticlemarker );
    }
}

function hidedeletedarticle() {
    if ( R.i.deletedarticlemarker.parentNode ) {
        R.i.deletedarticlemarker.parentNode.removeChild(
                R.i.deletedarticlemarker );
    }
    R.i.deletedarticlemarker.id = '';
}

function hiliteArticleNode( articleNode, hiliteOption ) {
    if ( !articleNode || ( articleNode.nodeType !== 1 ) ) { return false; }
    hiliteOption = as_intInRange( hiliteOption, false, 0, null );
    if ( typeof hiliteOption === 'number' ) { hiliteOption = hiliteOption & 7; }
    else { hiliteOption = 3; }
    if ( !( hiliteOption & 4 ) &&
            ( classNameUtil( articleNode, 'article', 0 ) !== true ) )
        { return false; }
    if ( ( hiliteOption & 2 ) && hilitedArticle &&
            ( hilitedArticle !== articleNode ) )
    {
        classNameUtil( hilitedArticle, 'context-article', -1 );
    }
    classNameUtil( articleNode, 'context-article', +1 );
    if ( ( hiliteOption & 1 ) || !hilitedArticle )
        { hilitedArticle = articleNode; }
    return true;
}

function hilitelinkedarticle( ael ) {
    var state = 0, articleId, pr, p1, e1;
    do {
        if ( !ael || ( ael.nodeType !== 1 ) ) { break; }
        if ( ael.tagName.toLowerCase() !== 'a' ) { break; }
        if ( void2str( ael.href ).length < 1 ) { break; }
        if ( ael.getAttribute( 'isDeadLink' ) === 'true' ) {
            state = 2;
        } else {
            state = 1;
        }
        p1 = /^[^#]*#(article-\d\d*)$/;
        if ( !( pr = p1.exec( ael.href ) ) ) { break; }
        articleId = pr[ 1 ];
        e1 = document.getElementById( articleId );
        if ( !e1 ) { break; }
        hiliteArticleNode( e1 );
        if ( window.location.hash === ( '#' + articleId ) ) {
            jumptoelement( e1 );
        } else {
            window.location.hash = '#' + articleId;
        }
        state = 3;
    } while ( false );
    switch ( state ) {
        case 3 :
            break;
        case 2 :
            hilitedeletedarticle( articleId );
            if ( R.i.blockoutcominglinks >= 1 ) {
                jumptodeletedarticle();
                break;
            }
            return true;
        case 1 :
            if ( R.i.blockoutcominglinks >= 2 ) { break; }
            return true;
        default :
            return true;
    }
    return false;
}

function hilitelinkedarticleEVENT( event ) {
    if ( !event ) { event = window.event; }
    var ret = hilitelinkedarticle( this );
    if ( ret ) { return true; }
    return consumeEVENT( event );
}

function hiliteAndJumpToArticle( articleId, setLocation, hiliteOption ) {
    articleId = AIDUtils.getCompleteAID( articleId );
    if ( typeof articleId !== 'string' ) { return false; }
    var e1 = document.getElementById( articleId );
    if ( !e1 ) { return false; }
    hiliteArticleNode( e1, hiliteOption );
    if ( is_true( setLocation ) ) {
        window.location.hash = '#' + articleId;
    } else {
        jumptoelement( e1 );
    }
}

//}}}
//-----------------------------------------------------------------------------
//{{{

var hilitedArticle = null;

function hiliteArticleIfExists( articleId ) {
    var elementId = "article-" + articleId,
            article = document.getElementById( elementId );
    if ( !article ) { return true; }
    if ( hilitedArticle && ( hilitedArticle !== article ) ) {
        classNameUtil( hilitedArticle, 'context-article', -1 );
    }
    classNameUtil( article, 'context-article', +1 );
    hilitedArticle = article;
    window.location.href = "#" + elementId;
    return false;
}

var REPLY_PREV_PFX  = 'replyFormPrev-';
var REPLY_TITLE_PFX = 'replyFormTitle-';
var REPLY_BODY_PFX  = 'replyFormBody-';
var REPLY_NICK_PFX  = 'replyNick-';

function renderArticleReplyForm( articleId, mainFormId, label,
        labelTitle, labelBody, labelSubmit, labelNick ) {
    var PFX_RPL, PFX_ART, replyFormId, replyForm,
            disp, articleWrapperId, el, newdiv, innerHTML,
            replyTitleId, replyBodyId, replyNickId, replyPrevId;
    PFX_RPL = 'replyForm-';
    PFX_ART = 'article-';
    replyFormId = PFX_RPL + articleId;
    replyForm = document.getElementById( replyFormId );
    if ( replyForm ) {
        disp = replyForm.style.display;
        if ( !disp || ( disp === 'block' ) ) {
            replyForm.style.display = 'none';
        } else {
            replyForm.style.display = 'block';
        }
    } else {
        articleWrapperId = PFX_ART + articleId;
        el = document.getElementById( articleWrapperId );
        if ( el ) {
            replyTitleId = REPLY_TITLE_PFX + articleId;
            replyBodyId  = REPLY_BODY_PFX  + articleId;
            replyNickId  = REPLY_NICK_PFX  + articleId;
            replyPrevId  = REPLY_PREV_PFX  + articleId;
            newdiv = document.createElement( 'div' );
            newdiv.className = 'reply-form posted-item-form';
            newdiv.id = replyFormId;
            innerHTML = '' +
                    '<h3>' + label + '</h3>' +
                    '<input id="' + replyPrevId + '" type="hidden"' +
                    ' name="parentId" value="' + articleId + '" />';
            if ( labelNick ) {
                innerHTML += '' +
                        '<div class="form-item form-item-text" >' +
                        '<label for="' + replyNickId + '">' + labelNick + '</label>' +
                        '<input id="' + replyNickId + '" type="text" name="anonymousNick" />' +
                        '</div>';
            }
            innerHTML += '' +
                    '<div class="form-item form-item-text" >' +
                    '<label for="' + replyTitleId + '">' + labelTitle + '</label>' +
                    '<input id="' + replyTitleId + '" type="text" name="title" />' +
                    '</div>' + '<div class="form-item form-item-text" >' +
                    '<label for="' + replyBodyId + '">' + labelBody + '</label>' +
                    '<textarea id="' + replyBodyId + '" name="body"></textarea>' +
                    '</div>' + '<input type="button" value="' + labelSubmit +
                    '" onclick="return copyReplyFormAndSubmitArticle(\'' +
                    articleId + "', '" + mainFormId + '\');" />';
            newdiv.innerHTML = innerHTML;
            el.appendChild( newdiv );
        }
    }
}

function ctrlenterEVENT( event ) {
    if ( !event ) { event = window.event; }
    if ( !event.ctrlKey || ( event.keyCode !== 13 ) ) { return true; }
    var srcEl, formEl, el, fired, pr, p1;
    srcEl = event.srcElement ? event.srcElement : event.target;
    formEl = null;
    for ( el = srcEl; el; el = el.parentNode ) {
        if ( ( el.nodeType === 1 ) && ( el.tagName.toLowerCase() === 'form' ) )
        {
            formEl = el;
            break;
        } else if ( ( el.nodeType === 1 ) &&
                ( el.tagName.toLowerCase() === 'div' ) &&
                ( /(^|\s)reply-form(\s|$)/.test( el.className ) ) )
        {
            formEl = el;
            break;
        }
    }
    if ( !formEl ) { return true; }
    fired = false;
    if ( formEl.id === 'article-form-main' ) {
        formEl.submit(); fired = true;
    } else {
        p1 = /^replyForm-(\d\d*)$/;
        if (( pr = p1.exec( formEl.id ) )) {
            try {
                copyReplyFormAndSubmitArticle( pr[ 1 ], 'article-form-main' );
            } catch ( e ) {
                consolemsg( 'exception in ctrlenterEVENT(): ' + e );
            }
            fired = true;
        }
    }
    if ( fired ) { return consumeEVENT( event ); }
    return true;
}

function PATCHED() {}
PATCHED.hiliteArticleIfExists = hiliteArticleIfExists;
PATCHED.renderArticleReplyForm = renderArticleReplyForm;
PATCHED.ctrlenterEVENT = ctrlenterEVENT;
PATCHED.patch = function patch() {
    addJStodocument( PATCHED.hiliteArticleIfExists.toString() );
    addJStodocument( PATCHED.renderArticleReplyForm.toString() );
    if ( R.get( 'ctrlenterhandling' ) === 0 ) {
        addJStodocument( 'document.body.onkeydown = "";' );
    }
    if ( R.get( 'ctrlenterhandling' ) === 1 ) {
        addJStodocument( 'document.body.onkeydown = ' +
                PATCHED.ctrlenterEVENT.toString() );
    }
};

//}}}
//-----------------------------------------------------------------------------
//{{{

function classNameRegExp( className, mods ) {
    var classNameEscaped, pattern;
    if ( typeof className !== 'string' ) { return null; }
    if ( typeof mods === 'undefined' ) { mods = ''; }
    else if ( typeof mods !== 'string' ) { mods = ''; }
    classNameEscaped = className.replace( /([.?*{+}(|)\[\]\\\/\^$])/g, '\\$1' );
    pattern = new RegExp( '(^|\\s)' + classNameEscaped + '(\\s|$)', mods );
    return pattern;
}

function classNameUtil( element, className, operation ) {
    var p1, classes, after, before;
    if ( !element || ( element.nodeType !== 1 ) ) { return; }
    if ( typeof operation !== 'number' ) { operation = 0; }
    else {              // 0: test, +1: set, -1: remove, 2: flip
        operation = Math.floor( operation );
        if ( ( operation < -1 ) || ( operation > 2 ) ) { operation = 0; }
    }
    if ( !checkClassName( className ) ) { return; }
    p1 = classNameRegExp( className, 'g' );
    if ( !( p1 instanceof RegExp ) ) { return; }
    classes = element.className;
    if ( typeof classes !== 'string' ) { classes = ''; }
    before = p1.test( classes );
    if ( before ) {
        if ( ( operation === -1 ) || ( operation === 2 ) ) {
            classes = classes.replace( p1, ' ' );
            after = false;
        } else {
            after = true;
        }
    } else {
        if ( ( operation === 1 ) || ( operation === 2 ) ) {
            classes += ' ' + className;
            after = true;
        } else {
            after = false;
        }
    }
    if ( operation !== 0 ) {
        element.className = classes.replace(
                /^\s*|\s*$/g, '' ).replace( /\s\s*/g, ' ' );
    }
    return after;
}

function consolemsg( text ) {
    if ( typeof text === 'string' )
        {}
    else if ( ( typeof text === 'number' ) || ( typeof text === 'boolean' ) )
        { text = String( text ); }
    else if ( !text )
        { return; }
    else {
        try {
            text = String( text );
        } catch ( e ) {
            text = 'consolemsg() exception: ' + e;
        }
    }
    if ( window.opera && ( typeof window.opera.postError === 'function' ) ) {
        window.opera.postError( text );
    } else if ( typeof GM_log === 'function' ) {
        /*jslint newcap: false */
        GM_log( text );
        /*jslint newcap: true */
    }
}

function consumeEVENT( event ) {
    if ( !event ) { event = window.event; }
    if ( typeof event.preventDefault === 'function' ) {
        event.preventDefault();
    }
    //else
    if ( typeof event.returnValue === 'boolean' ) {
        event.returnValue = false;
    }
    return false;
}

function getparenarticle( element ) {
    if ( !element ) { return null; }
    if ( element.nodeType !== 1 ) {
        if ( typeof element.parentNode === 'object' )
            { element = element.parentNode; }
        else { return null; }
    }
    for ( ; ; element = element.parentNode ) {
        if ( !element || ( element.nodeType !== 1 ) ) { return null; }
        if ( /(^|\s)article(\s|$)/.test( element.className ) )
            { return element; }
    }
    return null;
}

function getAncestorByTagANDClassName( element, tagName, className ) {
    if ( !element.parentNode ) { return null; }
    var p1;
    if ( className === '*' ) {}
    else if ( !checkClassName( className ) ) { return null; }
    else {
        p1 = classNameRegExp( className, '' );
        if ( !( p1 instanceof RegExp ) ) { return null; }
    }
    for ( element = element.parentNode; element; element = element.parentNode )
    {
        if ( element.nodeType !== 1 ) { continue; }
        if ( tagName === '*' ) {}
        else if ( element.tagName.toLowerCase() === tagName.toLowerCase() ) {}
        else { continue; }
        if ( className === '*' ) {}
        else if ( p1.test( element.className ) ) {}
        else { continue; }
        return element;
    }
    return null;
}

function getChildrenByTagANDClassName( element, tagName, className ) {
    var ret = [], p1;
    if ( !element.firstChild ) { return ret; }
    if ( className === '*' ) {}
    else if ( !checkClassName( className ) ) { return null; }
    else {
        p1 = classNameRegExp( className, '' );
        if ( !( p1 instanceof RegExp ) ) { return null; }
    }
    for ( element = element.firstChild; element; element = element.nextSibling )
    {
        if ( element.nodeType !== 1 ) { continue; }
        if ( tagName === '*' ) {}
        else if ( element.tagName.toLowerCase() === tagName.toLowerCase() ) {}
        else { continue; }
        if ( className === '*' ) {}
        else if ( p1.test( element.className ) ) {}
        else { continue; }
        ret.push( element );
    }
    return ret;
}

function checkId( id ) {
    if ( typeof id !== 'string' ) { return false; }
    var ret = false;
    do {
        if ( id.length < 1 ) { break; }
        if ( /\s/.test( id ) ) { break; }
        //ret = /^[A-Za-z0-9_.\-]+$/.test( id ); break;
        //ret = /^[!-~]+$/.test( id ); break;
        //ret = /^[^\s](.*[^\s])?$/.test( id ); break;
        ret = true;
    } while ( false );
    //consolemsg( 'checkId( ' + id + ' ): ' + String( ret ) );
    return ret;
}

function checkTagName( tagName ) {
    if ( typeof tagName !== 'string' ) { return false; }
    var ret = false;
    do {
        if ( tagName.length < 1 ) { break; }
        //if ( /[\s<>]/.test( tagName ) ) { break; }
        //ret = /^[Hh][1-6]$|^[A-Za-z]{1,10}$/.test( tagName ); break;
        ret = /^[A-Za-z_][A-Za-z0-9_.\-]*$/.test( tagName ); break;
        //ret = /^[^\s<>]+$/.test( tagName ); break;
        //ret = true;
    } while ( false );
    //consolemsg( 'checkTagName( ' + tagName + ' ): ' + String( ret ) );
    return ret;
}

function checkClassName( className ) {
    if ( typeof className !== 'string' ) { return false; }
    var ret = false;
    do {
        if ( className.length < 1 ) { break; }
        //if ( /\s/.test( className ) ) { break; }
        ret = /^[A-Za-z_][A-Za-z0-9_.\-]*$/.test( className ); break;
        //ret = /^[^\s]+$/.test( className ); break;
        //ret = true;
    } while ( false );
    //consolemsg( 'checkClassName( ' + className + ' ): ' + String( ret ) );
    return ret;
}

function checkColor( color, rgb ) {
    if ( typeof color !== 'string' ) { return false; }
    if ( /^#([0-9A-Fa-f]{3}){1,2}$/.test( color ) ) { return true; }
    if ( /^[A-Za-z]{3,25}$/.test( color ) ) { return true; }
    if ( !is_true( rgb ) ) { return false; }
    if ( /^[rR][gG][bB]\s*\(\s*-?\d\d*(%?)\s*(,\s*-?\d\d*\1\s*){2}\)\s*$/.test( color ) )
        { return true; }
    return false;
}

function checkClasses( classes ) {
    if ( typeof classes !== 'string' ) { return null; }
    classes = trim( classes );
    if ( classes.length < 1 ) { return classes; }
    var ca = classes.split( /\s\s*/ ), cno = {}, i, cn;
    for ( i = 0; i < ca.length; i++ ) {
        if ( checkClassName( ca[ i ] ) )
            { cno[ ca[ i ] ] = ca[ i ]; }
    }
    classes = ''; i = 0;
    for ( cn in cno ) {
        if ( cno.hasOwnProperty( cn ) ) {
            if ( i++ > 0 ) { classes += ' '; }
            classes += cn;
        }
    }
    return classes;
}

function createElement( tagName, id, classes, attributes ) {
    var e1, attr;
    if ( !checkTagName( tagName ) ) { return null; }
    if ( ( typeof id !== 'undefined' ) && ( id !== null ) && !checkId( id ) )
        { return null; }
    if ( typeof classes === 'string' ) { classes = trim( classes ); }
    else if ( ( typeof classes !== 'undefined' ) && ( classes !== null ) )
        { return null; }
    if ( ( typeof attributes !== 'undefined' ) && ( attributes !== null ) &&
            ( typeof attributes !== 'object' ) )
        { return null; }
    classes = checkClasses( classes );
    try {
        e1 = document.createElement( tagName );
        if ( ( typeof id === 'string' ) && ( id !== '' ) )
            { e1.id = id; }
        if ( ( typeof classes === 'string' ) && ( classes !== '' ) )
            { e1.className = classes; }
        if ( attributes instanceof Object ) {
            for ( attr in attributes ) {
                if ( attributes.hasOwnProperty( attr ) )
                    { e1.setAttribute( attr, attributes[ attr ] ); }
            }
        }
    } catch ( e ) {
        //consolemsg( '<' + tagName + '> : ' + e );
        return null;
    }
    return e1;
}

//}}}
//-----------------------------------------------------------------------------
//{{{

function AAuthor( articleNode ) {
    var i, e1, e2, fail = false;
    this.failed = function failed() {
        if ( typeof fail !== 'boolean' ) { fail = true; }
        return fail;
    };
    do {
        if ( !articleNode || ( typeof articleNode !== 'object' ) ||
                ( articleNode.nodeType !== 1 ) )
        {
            fail = true; break;
        }
        for ( e1 = articleNode.firstChild; ; e1 = e1.nextSibling ) {
            if ( !e1 ) { fail = true; break; }
            if ( e1.nodeType !== 1 ) { continue; }
            if ( /(^|\s)article-header(\s|$)/.test( e1.className ) ) { break; }
        }
        if ( fail ) { break; }
        for ( e2 = e1.firstChild; ; e2 = e2.nextSibling ) {
            if ( !e2 ) { fail = true; break; }
            if ( e2.nodeType !== 1 ) { continue; }
            if ( /(^|\s)author(\s|$)/.test( e2.className ) ) { break; }
        }
        if ( fail ) { break; }
        e2 = e2.firstChild;
        if ( !e2 || ( e2.nodeType !== 3 ) ) { fail = true; }
    } while ( false );
    if ( fail ) {
        this.nick = '';
        this.anonymous = undeff();
        return this;
    }
    this.anonymous = undeff();
    this.nick = e2.nodeValue.replace( /^\s+/, '' );
    i = this.nick.indexOf( '\r' );
    if ( i >= 0 ) { this.nick = this.nick.substring( 0, i ); }
    i = this.nick.indexOf( '\n' );
    if ( i >= 0 ) { this.nick = this.nick.substring( 0, i ); }
    this.nick = this.nick.replace( /\s+$/, '' );
    if ( ( e2.nextSibling.nodeType === 8 ) &&
            ( /^ *anonym *$/.test( e2.nextSibling.nodeValue ) ) )
    {
        this.anonymous = true;
    }
    do {
        for ( e2 = e1.firstChild; e2; e2 = e2.nextSibling ) {
            if ( e2.nodeType !== 1 ) { continue; }
            if ( /(^|\s)author-icon(\s|$)/.test( e2.className ) ) { break; }
        }
        if ( !e2 ) { break; }
        e2 = e2.firstChild;
        if ( !e2 || ( e2.nodeType !== 1 ) ) { break; }
        if ( e2.tagName.toLowerCase() !== 'a' ) { break; }
        if ( /\/msgbox\.do\?rcpt=$/.test( e2.href ) )
            { this.anonymous = true; }
        else if ( /\/msgbox\.do\?rcpt=[^?&=#]+$/.test( e2.href ) )
            { this.anonymous = false; }
    } while ( false );
    return this;
}

AAuthor.prototype.getNick = function getNick( u, a, e, f )
{           // undef -> bool, anon prefix, "" replace, failed replace
    if ( this.failed() ) {
        if ( typeof f === 'string' ) { return f; }
        else { return '[???]'; }
    }
    if ( this.anonymous === false ) { return this.nick; }
    if ( ( this.anonymous !== true ) && ( u !== true ) ) { return this.nick; }
    if ( this.nick.length < 1 ) {
        if ( typeof e === 'string' ) { return e; }
        else { return '[anonym]'; }
    }
    if ( typeof a === 'string' ) { return a + this.nick; }
    else { return '[anonym:] ' + this.nick; }
};

//}}}
//-----------------------------------------------------------------------------
//{{{

function Ignorowacz( boards_, mode_, users_, except_ ) {
    var boards, mode, users, except, valid = false;
    this.isValid = function isValid() { return valid; };
    if ( typeof mode_ !== 'string' ) { return null; }
    if ( !( boards_ instanceof RegExp ) && ( boards_ !== '*' ) ) { return null; }
    if ( mode_ === 'A' ) {
        if ( ( typeof users_ !== 'undefined' ) || ( typeof except_ !== 'undefined' ) )
            { return null; }
        boards = boards_;
        mode = 'A';
        valid = true;
    } else if ( ( mode_ === 'a' ) || ( mode_ === 'u' ) || ( mode_ === '*' ) ) {
        if ( !( users_ instanceof RegExp ) ) { return null; }
        if ( except_ instanceof RegExp ) { except = except_; }
        else if ( typeof except_ !== 'undefined' ) { return null; }
        boards = boards_;
        mode = mode_;
        users = users_;
        valid = true;
    } else {
        return null;
    }
    
    this.toString = function toString() {
        var ret = '[ ' + boards.toString() + ' ' + mode;
        if ( mode !== 'A' ) {
            ret += ' ' + users.toString();
            if ( except instanceof RegExp )
                { ret += ' \\' + except.toString(); }
        }
        ret += ' ]';
        return ret;
    };
    
    this.testBoard = function testBoard( board ) {
        if ( !valid || ( typeof board !== 'string' ) ) { return; }
        if ( boards === '*' ) { return true; }
        if ( !( boards instanceof RegExp ) ) { return; }
        return boards.test( board );
    };
    
    this.testAuthor = function testAuthor( author, u, f )
    {           // undefined -> boolean, failed -> return boolean
        if ( !valid || !( author instanceof AAuthor ) ) { return; }
        if ( author.failed() ) {
            if ( typeof f === 'boolean' ) { return f; }
            return;
        }
        var isanon = author.anonymous;
        if ( typeof isanon !== 'boolean' ) {
            if ( typeof u === 'boolean' ) { isanon = u; }
            else { isanon = false; }
        }
        if ( mode === 'A' ) { return isanon; }
        if ( isanon ) {
            if ( mode === 'u' )
                { return false; }
        } else {
            if ( mode === 'a' )
                { return false; }
        }
        if ( !users.test( author.nick ) )
            { return false; }
        if ( ( except instanceof RegExp ) && except.test( author.nick ) )
            { return false; }
        return true;
    };
    
    return this;
}

//}}}
//-----------------------------------------------------------------------------
//{{{

function AInfo( articleNode ) {
    this.init();
    this.fill( articleNode );
    return this;
}

AInfo.prototype.init = function init() {
    this.adiv = this.adiv = null;
    this.menuul = null;
    this.cdiv = this.ca = this.chref = null;
    this.rdiv = this.ra = this.rhref = this.rid = null;
    this.pdiv = this.pa = this.phref = this.pid = null;
    this.aa = null;
    this.fatal = null; this.errs = [];
};

AInfo.prototype.fill = function fill( articleNode ) {
    if ( articleNode === null ) {
        this.fatal = 'articleNode is null'; return; }
    if ( typeof articleNode !== 'object' ) {
        this.fatal = 'articleNode is not an object'; return; }
    if ( articleNode.nodeType !== 1 ) {
        this.fatal = 'articleNode.nodeType !== 1'; return; }
    if ( !/(^|\s)article(\s|$)/.test( articleNode.className ) ) {
        this.fatal = 'bad articleNode.className \'' +
                articleNode.className + '\'';
        return; }
    this.adiv = articleNode;
    this.aa = new AAuthor( articleNode );
    if ( this.aa.failed() )
        { this.errs.push( 'error retrieving article author info' ); }
    var ea1, ea2, p1, pr, i;
    do {
        ea1 = getChildrenByTagANDClassName( articleNode, 'div', 'marks' );
        if ( ea1.length !== 1 ) {
            this.errs.push( 'not precisely 1 div.marks element' ); break;
        }
        ea1 = getChildrenByTagANDClassName( ea1[ 0 ], 'ul', 'article-menu' );
        if ( ea1.length !== 1 ) {
            this.errs.push( 'not precisely 1 ul.article-menu element' ); break;
        }
        this.menuul = ea1[ 0 ];
        p1 = /^article-(\d\d*)$/;
        if (( pr = p1.exec( articleNode.id ) ))
            { this.aid = pr[ 1 ]; }
        else
            { this.errs.push( 'article.id \'' + articleNode.id + '\' test fail' ); }
        ea2 = getChildrenByTagANDClassName( this.menuul, 'div', '*' );
        for ( i = 0; i < ea2.length; i++ ) {
            if ( /(^|\s)root-link(\s|$)/.test( ea2[ i ].className ) )
                { this.rdiv = ea2[ i ]; }
            else if ( /(^|\s)context-link(\s|$)/.test( ea2[ i ].className ) )
                { this.cdiv = ea2[ i ]; }
        }
        if ( this.rdiv ) {
            ea1 = getChildrenByTagANDClassName( this.rdiv, 'a', '*' );
            if ( ea1.length === 1 ) {
                this.ra = ea1[ 0 ];
                this.rhref = this.ra.href;
                p1 = /^.*[?&]rootId=(\d\d*).*$/;
                if (( pr = p1.exec( this.rhref ) ))
                    { this.rid = pr[ 1 ]; }
                else
                    { this.errs.push( 'root href \'' + this.rhref + '\' test fail' ); }
            } else
                { this.errs.push( 'not precisely 1 a element in div.root-link' ); }
        } else
            { this.errs.push( 'div.root-link not found' ); }
        if ( this.cdiv ) {
            ea1 = getChildrenByTagANDClassName( this.cdiv, 'a', '*' );
            if ( ea1.length === 1 ) {
                this.ca = ea1[ 0 ];
                this.chref = this.ca.href;
                p1 = /^.*[?&]contextId=(\d\d*).*$/;
                if (( pr = p1.exec( this.chref ) )) {
                    if ( this.aid === null )
                        { this.aid = pr[ 1 ]; }
                    else if ( this.aid !== pr[ 1 ] )
                        { this.errs.push( 'context and article id mismatch' ); }
                }
                else
                    { this.errs.push( 'context href \'' + this.chref + '\' test fail' ); }
            } else
            { this.errs.push( 'not precisely 1 a element in div.context-link' ); }
        }
    } while ( false );
    ea1 = getChildrenByTagANDClassName( articleNode, 'div', 'context' );
    if ( ea1.length === 1 ) {
        this.pdiv = ea1[ 0 ];
        ea1 = getChildrenByTagANDClassName( this.pdiv, 'a', '*' );
        if ( ea1.length === 1 ) {
            this.pa = ea1[ 0 ];
            this.phref = this.pa.href;
            p1 = /^[^#]+#article-(\d\d*)$/;
            if (( pr = p1.exec( this.phref ) ))
                { this.pid = pr[ 1 ]; }
            else
                { this.errs.push( 'parent href \'' + this.phref + '\' test fail' ); }
        } else
            { this.errs.push( 'not precisely 1 a element in div.context' ); }
    }
};

//}}}
//-----------------------------------------------------------------------------
//{{{

function escapehtml( str ) {
    if ( typeof str !== 'string' ) { return ''; }
    return str.replace( /&/g, '&amp;' )
            .replace( /</g, '&lt;' ).replace( />/g, '&gt;' );
}

function escapequot( str ) {
    if ( typeof str !== 'string' ) { return ''; }
    return str.replace( /"/g, '&quot;' );
}

function trim( str_ ) {
    if ( typeof str_ !== 'string' ) { return ''; }
    var	str = str_.replace( /^\s\s*/, '' ), wsp = /\s/, i = str.length;
    while ( wsp.test( str.charAt( --i ) ) ) {}
    return str.slice( 0, i + 1 );
}

function void2str( ref, convertothertypes ) {
    if ( ( typeof ref === 'undefined' ) || ( ref === null ) ) { return ''; }
    if ( typeof ref === 'string' ) { return ref; }
    if ( ( convertothertypes === true ) || ( convertothertypes === 1 ) )
    {
        return String( ref );
    }
    return ref;
}

function is_true( val ) {
    if ( ( val === true ) || ( val === 1 ) || ( val === '1' ) ) { return true; }
    return false;
}

function is_false( val ) {
    if ( ( val === false ) || ( val === 0 ) || ( val === '0' ) ) { return false; }
    return true;
}

function as_int( val, autofloor ) {
    var ret;
    if ( typeof val === 'number' ) {
        ret = Math.floor( val );
        if ( isNaN( ret ) ) { return null; }
        if ( is_true( autofloor ) || ( ret === val ) ) { return ret; }
        return null;
    } else if ( typeof val === 'string' ) {
        val = trim( val );
        ret = Number( val );
        if ( isNaN( ret ) ) { return null; }
        if ( is_true( autofloor ) ) {
            ret = Math.floor( ret );
            if ( isNaN( ret ) ) { return null; }
            return ret;
        }
        if ( ret === Math.floor( ret ) ) { return ret; }
    }
    return null;
}

function as_intInRange( val, autofloor, min, max ) {
    var ret = as_int( val, autofloor );
    if ( typeof ret !== 'number' ) { return null; }
    if ( ( typeof min === 'number' ) && ( ret < min ) ) { return null; }
    if ( ( typeof max === 'number' ) && ( ret > max ) ) { return null; }
    return ret;
}

//}}}
//-----------------------------------------------------------------------------
//{{{

function removeSIDfromhref( href ) {
    if ( typeof href !== 'string' ) { return null; }
    var pr, p1;
    p1 = /^([^?&%=#]*okoun\.cz\/old\/[^?&=#]*)(;jsessionid=[A-F0-9]+)?([?#].*)?$/;
    if ( !( pr = p1.exec( href ) ) ) { return null; }
    return '' + pr[ 1 ] + void2str( pr[ 3 ] );
}

function getY( element ) {
    if ( !element ) { return null; }
    if ( element.offsetParent ) {
        for ( var posY = 0; element.offsetParent;
                element = element.offsetParent ) {
            posY += element.offsetTop;
        }
        return posY;
    }
    if ( element.y ) { return element.y; }
    return null;
}

function filterElementsByClassName( elements, className ) {
    var i, p1, ret = [];
    if ( !checkClassName( className ) ) { return ret; }
    p1 = classNameRegExp( className, '' );
    if ( !( p1 instanceof RegExp ) ) { return ret; }
    for ( i = 0; i < elements.length; i++ ) {
        if ( p1.test( elements[ i ].className ) )
            { ret.push( elements[ i ] ); }
    }
    return ret;
}

function sprintflite( template, map ) {
    if ( typeof template !== 'string' ) { return null; }
    var k, i, ret = '';
    for ( k in map ) {
        if ( ( typeof k === 'string' ) && ( k.length === 1 ) &&
                ( typeof map[ k ] === 'string' ) ) {}
        else { map[ k ] = undeff(); }
    }
    if ( typeof map[ '%' ] !== 'string' ) { map[ '%' ] = '%'; }
    for ( i = 0; i < template.length; i++ ) {
        if ( template.charAt( i ) !== '%' ) {
            ret += template.charAt( i );
            continue;
        } else {
            if ( ( ( i + 1 ) >= template.length ) ||
                    ( typeof map[ template.charAt( i + 1 ) ] !== 'string' ) )
            {
                //ret += '%';
            } else {
                ret += map[ template.charAt( ++i ) ];
            }
        }
    }
    return ret;
}

function sprintfheavy( template, map ) {
    if ( typeof template !== 'string' ) { return null; }
    var k, i, result = '', log = [];
    for ( k in map ) {
        if ( ( typeof k === 'string' ) && ( k.length === 1 ) &&
                ( typeof map[ k ] === 'string' ) ) {}
        else { map[ k ] = undeff(); }
    }
    if ( typeof map[ '%' ] !== 'string' ) { map[ '%' ] = '%'; }
    for ( i = 0; i < template.length; i++ ) {
        if ( template.charAt( i ) !== '%' ) {
            result += template.charAt( i );
            continue;
        } else {
            if ( ( ( i + 1 ) >= template.length ) ||
                    ( typeof map[ template.charAt( i + 1 ) ] !== 'string' ) )
            {
                //result += '%';
            } else {
                var c = template.charAt( ++i );
                var s = map[ c ];
                log.push( { key: c, pos: result.length, len: s.length } );
                result += s;
            }
        }
    }
    return { result: result, log: log };
}

function gethead() {
    if ( R.i.documentheadelement && ( R.i.documentheadelement.nodeType === 1 ) )
        { return R.i.documentheadelement; }
    if ( R.i.documentheadelement === false ) { return null; }
    R.i.documentheadelement = document.getElementsByTagName( 'head' )[ 0 ];
    if ( !R.i.documentheadelement ) {
        R.i.documentheadelement = false;
        return null;
    }
    return R.i.documentheadelement;
}

function getboardaddress() {
    if ( typeof R.i.boardaddress === 'string' ) { return R.i.boardaddress; }
    if ( R.i.boardaddress === false ) { return null; }
    R.i.boardaddress = false;
    var ea1, e1 = document.getElementById( 'board-main' );
    if ( !e1 ) { return null; }
    ea1 = getChildrenByTagANDClassName( e1, 'h2', '*' );
    if ( ea1.length !== 1 ) { return null; }
    ea1 = getChildrenByTagANDClassName( ea1[ 0 ], 'a', '*' );
    if ( ea1.length !== 1 ) { return null; }
    e1 = ea1[ 0 ];
    if ( !R.i.boardadddresspattern.test( e1.href ) ) { return null; }
    R.i.boardaddress = e1.href;
    return R.i.boardaddress;
}

function getboardname() {
    if ( typeof R.i.boardname === 'string' ) { return R.i.boardname; }
    if ( R.i.boardname === false ) { return null; }
    R.i.boardname = false;
    var pr, ba = getboardaddress();
    if ( typeof ba !== 'string' ) { return null; }
    pr = R.i.boardadddresspattern.exec( ba );
    if ( !pr ) { return null; }
    R.i.boardname = void2str( pr[ 2 ] );
    return R.i.boardname;
}

function getNewAddress() {
    var a;
    a = document.location.href;
    if ( /^[^?&%=#]*okoun\.cz\/old\/(markWelcomeMsg|markArticles|markFavouriteBoards|postArticle)\.do/.test( a ) )
    {
        a = getboardaddress();
        if ( typeof a === 'string' ) { a += document.location.hash; }
        else { a = null; }
    }
    if ( !a ) { return null ; }
    a = a.replace( /^([^?&%=#]*okoun\.cz\/)old\//, '$1' );
    if ( R.i.gotoNewLink ) {
        R.i.gotoNewLink.href = a;
    }
    return a;
}

function goToNew( event ) {
    var a = getNewAddress();
    if ( a ) { document.location.href = a; }
    return consumeEVENT( event );
}

function addJStodocument( src ) {
    gethead();
    var scriptnode = document.createElement( 'script' );
    scriptnode.setAttribute( 'type', 'text/javascript' );
    scriptnode.appendChild( document.createTextNode( src ) );
    R.i.documentheadelement.appendChild( scriptnode );
}

function addStyle( newstyle ) {
    if ( typeof newstyle !== 'string' ) { return; }
    if ( ( newstyle = trim( newstyle ) ).length === 0 ) { return; }
    if ( typeof GM_addStyle === 'function' ) {
        /*jslint newcap: false */
        GM_addStyle( newstyle );
        /*jslint newcap: true */
        return;
    }
    gethead();
    var stylenode = document.createElement( 'style' );
    stylenode.setAttribute( 'type', 'text/css' );
    stylenode.appendChild( document.createTextNode( newstyle ) );
    R.i.documentheadelement.appendChild( stylenode );
}

function addStyleOoAoS( ooaos ) {
    if ( ( typeof ooaos !== 'object' ) || !ooaos ) { return null; }
    var style = '', i, j;
    for ( i in ooaos ) {
        if ( ooaos[ i ] instanceof Array ) {
            for ( j = 0; j < ooaos[ i ].length; j++ ) {
                if ( typeof ooaos[ i ][ j ] === 'string' ) {
                    if ( style.length > 0 ) { style += '\n'; }
                    style += ooaos[ i ][ j ];
                }
            }
        }
    }
    addStyle( style );
}

function setinnertext( element, text, destroynontext ) {
    if ( !element || ( element.nodeType !== 1 ) ) { return false; }
    if ( ( typeof text !== 'string' ) && ( text !== null ) ) { return false; }
    if ( ( destroynontext === true ) || ( destroynontext === 1 ) )
        { destroynontext = true; }
    else { destroynontext = false; }
    if ( element.hasChildNodes() )
    {
        var i, children = element.childNodes;
        if ( !destroynontext ) {
            for ( i = 0; i < children.length; i++ ) {
                if ( children[ i ].nodeType !== 3 ) { return false; }
            }
        }
        while ( element.hasChildNodes() ) {
            element.removeChild( element.lastChild );
        }
    }
    if ( typeof text === 'string' )
        { element.appendChild( document.createTextNode( text ) ); }
    return true;
}

function shiftenterEVENT( event ) {
    if ( !event ) { event = window.event; }
    if ( !event.shiftKey || event.ctrlKey ) { return; }
    var code, str, rp;
    code = event.keyCode;
    if ( ( code === 0 ) && ( event.charCode > 0 ) ) { code = event.charCode; }
    if ( code === 13 ) {
        str = "<br>\n"; rp = "<p>%r</p>\n";
    } else if ( code === 32 ) {
        str = "&nbsp;"; rp = insertText.IDLE;
    } else { //consolemsg( [event.keyCode, event.charCode] );
        return;
    }
    if ( mainFMTControls.getFormat() !== 'h' ) { return; }
    var srcEl = event.srcElement ? event.srcElement : event.target;
    if ( ( srcEl.nodeType === 1 ) &&
            ( srcEl.tagName.toLowerCase() === 'textarea' ) )
    {
        insertText( srcEl, str, rp );
        return consumeEVENT( event );
    }
}

function startkeycaptureEVENT( event ) {
    R.i.keycaptureon = true;
}

function releasekeycaptureEVENT( event ) {
    if ( R.i.keycaptureon === false ) { return; }        // nothing to do
    if ( !event ) { event = window.event; }
    var srcEl, tnlc, type;
    srcEl = event.srcElement ? event.srcElement : event.target;
    if ( !srcEl || ( srcEl.nodeType !== 1 ) ) { return; }
    tnlc = srcEl.tagName.toLowerCase();
    if ( ( tnlc === 'textarea' ) || ( tnlc === 'select' ) ) {
        R.i.keycaptureon = false;
    } else if ( tnlc === 'input' ) {
        type = srcEl.getAttribute( 'type' );
        if ( typeof type !== 'string' ) { return; }
        if ( ( type === 'text' ) || ( type === 'password' ) )
            { R.i.keycaptureon = false; }
    }
}

function jumptonew() {
    if ( typeof R.i.oldestnewid === 'string' ) {
        jumptoid( R.i.oldestnewid );
        flashid( R.i.oldestnewid );
    }
}

function jumptonewEVENT( event ) {
    jumptonew();
    return consumeEVENT( event );
}

function keyboardjumpEVENT( event ) {
    if ( !R.i.keycaptureon ) { return; }
    if ( !event ) { event = window.event; }
    if ( event.ctrlKey || event.altKey ) { return; }
    var srcEl, code, fired;
    srcEl = event.srcElement ? event.srcElement : event.target;
    code = ( typeof event.charCode === 'number' ) ?
            event.charCode : event.keyCode;
    code = String.fromCharCode( code );
    fired = false;
    if (           R.i.jumpkeys_down.indexOf( code ) >= 0 ) {
        jumparticles( 'down' );   fired = true;
    } else if (      R.i.jumpkeys_up.indexOf( code ) >= 0 ) {
        jumparticles( 'up' );     fired = true;
    } else if (     R.i.jumpkeys_new.indexOf( code ) >= 0 ) {
        jumptonew();              fired = true;
    } else if ( R.i.jumpkeys_botttom.indexOf( code ) >= 0 ) {
        jumparticles( 'bottom' ); fired = true;
    } else if (     R.i.jumpkeys_top.indexOf( code ) >= 0 ) {
        jumparticles( 'top' );    fired = true;
    } else if (    R.i.jumpkeys_menu.indexOf( code ) >= 0 ) {
        window.scrollTo( 0, 0 ); fired = true;
    }
    if ( fired ) { return consumeEVENT( event ); }
}

function findfragmenttarget( id, searchatags, taketop ) {
    if ( ( typeof id !== 'string' ) || ( id === '' ) ) { return null; }
    if ( id === '#' ) {
        if ( is_true( taketop ) ) { return document.body; }
        else { return null; }
    }
    if ( id.charAt( 0 ) === '#' )
        { id = id.substring( 1 ); }
    //if ( !checkId( id ) ) { return null; }
    var e1, ea1, i;
    if (( e1 = document.getElementById( id ) )) { return e1; }
    if ( !is_true( searchatags ) ) { return null; }
    ea1 = document.getElementsByTagName( 'a' );
    for ( i = 0; i < ea1.length; i++ ) {
        if ( ea1[ i ].name === id ) { return ea1[ i ]; }
    }
    return null;
}

function jumptoelement( element, margin ) {
    if ( typeof margin !== 'number' )
        { margin = 0; }
    else {
        margin = Math.floor( margin );
        if ( ( margin < 1 ) || ( margin > 1000 ) )
            { margin = 0; }
    }
    var r1 = Rect.fromElement( element ), rw = Rect.fromWindow();
    if ( !r1 || !rw ) { return false; }
    if ( margin ) { r1.expand( null, margin ); }
    rw.lookat( r1, 0, 1 );
    rw.wscroll();
    return true;
}

function jumptoid( id ) {
    var margin = 10, e1;
    do {
        e1 = findfragmenttarget( id, true, true );
        if ( !e1 ) { break; }
        if ( !jumptoelement( e1, margin ) ) { break; }
        return;
    } while ( false );
    //window.location.hash = "#" + id;  // sucks
}

function jumparticles( direction ) {
    var extendtop = 100, extendbottom = 100, igno = 10, margin = 10,
            top, bottom, target, mode, e1, ea1, aa, r1, rw, y, i;
    if ( typeof R.i.postjump_mode !== 'number' ) { return; }
    mode = Math.floor( R.i.postjump_mode );
    if ( ( mode < 1 ) || ( mode > 4 ) ) { return; }
    if ( typeof R.i.postjump_extendtop !== 'number' ) {}
    else { extendtop = Math.max( 0, Math.floor( R.i.postjump_extendtop ) ); }
    if ( typeof R.i.postjump_extendbottom !== 'number' ) {}
    else { extendbottom = Math.max( 0, Math.floor( R.i.postjump_extendbottom ) ); }
    if ( typeof R.i.postjump_ignore !== 'number' ) {}
    else { igno = Math.max( 0, Math.floor( R.i.postjump_ignore ) ); }
    if ( typeof R.i.postjump_margin !== 'number' ) {}
    else { margin = Math.max( 0, Math.floor( R.i.postjump_margin ) ); }
    
    if ( typeof direction !== 'string' ) { return; }
    e1 = document.getElementById( 'board-articles' );
    if ( !e1 ) { return; }
    ea1 = getChildrenByTagANDClassName( e1, 'form', '*' );
    if ( ea1.length !== 1 ) { return; }
    e1 = ea1[ 0 ];
    ea1 = getChildrenByTagANDClassName( e1, 'div', 'article' );
    if ( ea1.length < 1 ) { return; }
    aa = [];
    rw = Rect.fromWindow();
    if ( !rw ) { return; }
    if ( R.i.posteditempreview ) {
        r1 = Rect.fromElement( R.i.posteditempreview );
        if ( !r1 ) { return; }
        r1.E = R.i.posteditempreview;
        aa.push( r1 );
    }
    
    for ( i = 0; i < ea1.length ; i++ ) {
        e1 = ea1[ i ];
        r1 = Rect.fromElement( e1 );
        if ( !r1 ) { return; }
        r1.E = e1;
        aa.push( r1 );
    }
    
    top = 0;
    bottom = aa.length - 1;
    for ( i = 1; i < aa.length; i++ ) {
        if ( aa[ i ].top    < aa[ top    ].top    ) { top    = i; }
        if ( aa[ i ].bottom > aa[ bottom ].bottom ) { bottom = i; }
    }
    
    do {
        if ( ( !R.i.posteditempreview ) &&
                ( R.i.postjump_extendtop !== 'article-form-main' ) )
            { break; }
        if ( !R.i.mainform ) { break; }
        r1 = Rect.fromElement( R.i.mainform );
        if ( !r1 ) { break; }
        extendtop = Math.max( extendtop, aa[ top ].top - r1.top );
    } while ( false );
    
    if ( direction === 'top' ) { target = top; }
    else if ( direction === 'bottom' ) { target = bottom; }
    else if ( direction === 'up' ) {
        target = top;
        for ( i = 0; i < aa.length; i++ ) {
            if ( ( aa[ i ].top < ( rw.top - igno ) ) &&
                    ( aa[ i ].top > aa[ target ].top ) )
                { target = i; }
        }
    } else if ( direction === 'down' ) {
        target = bottom;
        if ( mode === 1 ) {
            for ( i = 0; i < aa.length; i++ ) {
                if ( ( aa[ i ].top > ( rw.top + igno + margin ) ) &&
                        ( aa[ i ].bottom <= aa[ target ].bottom ) )
                    { target = i; }
            }
        } else if ( mode === 2 ) {
            for ( i = 0; i < aa.length; i++ ) {
                if ( ( aa[ i ].bottom > ( rw.bottom + igno ) ) &&
                        ( aa[ i ].top > ( rw.top + igno + margin ) ) &&
                        ( aa[ i ].bottom <= aa[ target ].bottom ) )
                { target = i; }
            }
        } else if ( ( mode === 3 ) || ( mode === 4 ) ) {
            for ( i = 0; i < aa.length; i++ ) {
                if ( ( aa[ i ].bottom > ( rw.bottom + igno ) ) &&
                        ( aa[ i ].bottom <= aa[ target ].bottom ) )
                    { target = i; }
            }
        } else { return; }
    } else { return; }
    
    if ( ( direction === 'up' ) || ( direction === 'top' ) ) {
        y = aa[ target ].top - margin;
        if ( ( direction === 'top' ) || ( ( rw.top - igno ) <= aa[ top ].top ) )
        {
            y -= extendtop;
        }
        if ( y < 0 ) { y = 0; }
        if ( ( y >= ( rw.top - igno ) ) && (
                ( direction !== 'top' ) || ( y <= ( rw.top + igno ) ) ) ) {
            y = null;
        }
    } else {
        if ( mode === 1 ) {
            if ( ( direction === 'bottom' ) ||
                    ( ( rw.top + igno + margin ) >= aa[ bottom ].top ) )
            {
                y = aa[ bottom ].bottom + margin + extendbottom - rw.height;
            } else {
                y = aa[ target ].top - margin;
            }
        }
        else
        {
            y = aa[ target ].bottom + margin - rw.height;
            if ( y < 0 ) { y = 0; }
            if ( ( direction === 'bottom' ) ||
                    ( ( rw.bottom + igno ) >= aa[ bottom ].bottom ) || (
                    ( mode === 2 ) &&
                    ( ( rw.top    + igno ) >= aa[ bottom ].top    ) ) )
            {
                y += extendbottom;
            }
            else if ( (
                        ( mode === 2 ) &&
                        ( y > ( aa[ target ].top - igno - margin ) )
                        ) || (
                        ( mode === 3 ) &&
                        ( y > ( aa[ target ].top - igno - margin ) ) &&
                        ( rw.top < ( aa[ target ].top - igno - margin ) )
                        ) )
            {
                y = aa[ target ].top - margin;
            }
        }
        if ( ( y < 0 ) || ( y <= ( rw.top - igno - margin ) ) ) {
            y = null;
        }
    }
    
    if ( typeof y === 'number' ) {
        rw.movetoLT( null, y );
        rw.wscroll();
    }
    
    flashnorepeat( aa[ target ].E );
}

function checkarticlelife( articleId, add ) {
    var hash, isdead, ret;
    hash = AIDUtils.getArticleNumber( articleId );
    if ( typeof hash !== 'number' ) { return; }
    isdead = AIDs.isDead( hash );
    if ( isdead === false ) { return 1; }
    if ( isdead === true )  { return 2; }
    ret = 0;
    if ( is_true( add ) ) {
        if ( ( ( R.i.pagelayout === 'n' ) || ( R.i.pagelayout === 'c' ) ) &&
                ( hash > AIDs.oldestId() ) && ( hash < AIDs.newestId() ) )
            { ret = 2; }
        else if ( R.i.pagelayout === 'r' )
            { ret = 2; }
        if ( ret === 2 )
            { AIDs.add( hash, true ); }
    }
    return ret;
}

function forgecontexthref( articleId ) {
    articleId = AIDUtils.getArticleNumber( articleId );
    if ( typeof articleId !== 'number' ) { return null; }
    var href = getboardaddress();
    if ( !href ) { return null; }
    return href + '?contextId=' + articleId + '#article-' + articleId;
}

function getSelectedText( inputField ) {
    //if ( !inputField.selectionStart && ( inputField.selectionStart != '0' ) )
    if ( !inputField.selectionStart && ( inputField.selectionStart !== 0 ) )
        { return ''; }
    var startPos = inputField.selectionStart,
            endPos = inputField.selectionEnd;
    if ( startPos === endPos )
        { return ''; }
    return inputField.value.substring( startPos, endPos );
}

function insertText( inputField, insertValue, replacePattern, customMap )
{
    var before, after, startPos, endPos, newPos, map, a, i, nlcount, range;
    if ( typeof insertValue !== 'string' ) {
        insertValue = '';
    } else {
        insertValue = insertValue.replace( /\r\n?/g, '\n' );
    }
    if ( !customMap || ( typeof customMap !== 'object' ) )
        { customMap = {}; }
    if ( typeof ArgMap === 'function' )
        { customMap = new ArgMap( customMap ).map; }
    for ( i in customMap ) {
        if ( ( typeof i !== 'string' ) || ( i.length !== 1 ) ||
                ( typeof customMap[ i ] !== 'string' ) )
            { customMap[ i ] = undeff(); }
    }
    map = customMap;
    map.c = '';
    a = sprintfheavy( insertValue, map );
    newPos = a.result.length;
    for ( i = 0; i < a.log.length; i++ ) {
        if ( a.log[ i ].key === 'c' ) {
            newPos = a.log[ i ].pos;
            break;
        }
    }
    before = a.result.substring( 0, newPos );
    after  = a.result.substring( newPos );
    insertValue = a.result;
    //if ( !inputField.selectionStart && ( inputField.selectionStart != '0' ) )
    if ( !inputField.selectionStart && ( inputField.selectionStart !== 0 ) )
    {
        inputField.value += insertValue;
        return;
    }
    startPos = inputField.selectionStart;
    endPos   = inputField.selectionEnd;
    if ( startPos === endPos ) {
        if ( ( before + after ).length < 1 ) { return; }
    }
    
    if ( startPos !== endPos ) {
        if ( typeof replacePattern === 'string' ) {
            replacePattern = replacePattern.replace( /\r\n?/g, '\n' );
        } else if ( replacePattern === insertText.REPLACE ) {
            replacePattern = '%i';
        } else if ( replacePattern === insertText.APPEND ) {
            replacePattern = '%r%i';
        } else if ( replacePattern === insertText.ENCLOSE ) {
            replacePattern = '%i%r%i';
        } else { return; }
        if ( typeof insertValue !== 'string' ) { insertValue = ''; }
        map = customMap;
        map.c = '';
        map.b = before;
        map.a = after;
        map.r = inputField.value.substring( startPos, endPos );
        a = sprintfheavy( replacePattern, map );
        newPos = a.result.length;
        for ( i = 0; i < a.log.length; i++ ) {
            if ( a.log[ i ].key === 'c' ) {
                newPos = a.log[ i ].pos;
                break;
            }
        }
        before = a.result.substring( 0, newPos );
        after  = a.result.substring( newPos );
        insertValue = a.result;
    }
    nlcount = 0;
    for ( i = 0; i < newPos; i++ ) {
        if ( insertValue.charAt( i ) === '\n' ) { nlcount++; }
    }
    
    inputField.value = inputField.value.substring( 0, startPos ) +
            insertValue +
            inputField.value.substring( endPos, inputField.value.length );
    if ( window.opera ) {
        newPos += nlcount;
    }
    newPos += startPos;
    if ( typeof inputField.setSelectionRange === 'function' ) {
        inputField.focus();
        inputField.setSelectionRange( newPos, newPos );
    } else if ( typeof inputField.createTextRange === 'function' ) {
        range = inputField.createTextRange();
        range.collapse( true );
        range.moveEnd( 'character', newPos );
        range.moveStart( 'character', newPos );
        range.select();
    } else {
        inputField.selectionEnd = inputField.selectionStart = newPos;
    }
}

insertText.IDLE    = -1;
insertText.REPLACE = 1;
insertText.APPEND  = 3;
insertText.ENCLOSE = 7;

//}}}
//-----------------------------------------------------------------------------
//{{{

// 2do: change to R.i.* or turn all to OOP
var flashtimer = null;
var flashedelement = null;
var flashcounter = -1;
var flashnorepeattimer = null;
var flashrepeated = false;

function flashparentarticleEVENT( event ) {
    if ( ( this.nodeType != 1 ) || ( this.tagName.toLowerCase() != 'a' ) )
        return;
    var pr, p1 = /^[^#]+#(article-\d\d*)$/;
    if ( pr = p1.exec( this.href ) )
    var target = document.getElementById( pr[ 1 ] );
    if ( target ) {
        if ( flashedelement && ( flashedelement != target ) )
            unflash( flashedelement );
        flashedelement = target;
        flashrepeated = true;
        flashelement( flashedelement );
    }
}

function flashrepeatstopEVENT( event ) {
    if ( flashedelement ) unflash( flashedelement );
    flashedelement = null;
    flashrepeated = false;
}

function flashnorepeat( element ) {
    var now = new Date().getTime();
    if ( flashnorepeattimer && ( typeof flashnorepeattimer === 'number' ) ) {
        if ( ( now < flashnorepeattimer ) &&
                ( now > ( flashnorepeattimer - 30000 ) ) ) {}
        else flashnorepeattimer = null;
    }
    else flashnorepeattimer = null;
    if ( !flashnorepeattimer )
        flashelement( element );
    flashnorepeatset( 'default' );
}

function flashnorepeatset( ms ) {
    if ( ms === null ) { flashnorepeattimer = null; return; }
    if ( ms === 'default' ) ms = R.i.flash_norepeat;
    if ( ( typeof ms !== 'number' ) || ( ms < 1 ) ) { return; }
    if ( ms < 10 ) ms = 10;
    else if ( ms > 30000 ) ms = 30000;
    flashnorepeattimer = new Date().getTime() + ms;
}

function unflash( target ) {
    if ( !target ) {
        if ( !flashedelement ) { return; }
        else target = flashedelement;
    }
    flashnorepeatset( 'default' );
    classNameUtil( target, 'flashed',  -1 );
    classNameUtil( target, 'flashed2', -1 );
    if ( flashtimer ) clearTimeout( flashtimer );
    flashtimer = null;
}

function flashid( id ) {
    if ( ( typeof id !== 'string' ) || ( id == '' ) || ( id == '#' ) )
        return;
    if ( id.charAt( 0 ) == '#' )
        id = id.substring( 1 );
    var target = document.getElementById( id );
    if ( target ) flashelement( target );
}

function flashelement( element ) {
    do {
        if ( typeof R.i.flash_repeat !== 'number' ) break;
        if ( R.i.flash_repeat < 1 ) break;
        else if ( R.i.flash_repeat > 50 ) R.i.flash_repeat = 50;
        if ( flashedelement && ( flashedelement != element ) )
            unflash( flashedelement );
        flashedelement = element;
        return flashstart();
    } while ( false );
    if ( flashedelement ) unflash( flashedelement );
    return false;
}

function flashstart() {
    if ( !flashedelement ) return false;
    flashcounter = 0;
    classNameUtil( flashedelement, 'flashed', +1 );
    flashdo();
    flashnorepeatset( 'default' );
    return true;
}

function flashdo() {
    if ( !flashelement ) { return; }
    var stop = false;
    do {
        if ( typeof flashcounter !== 'number' )
            flashcounter = -1;
        if ( flashcounter < 0 ) {
            unflash( flashedelement );
            break;
        }
        var nexttimer = 0;
        if ( flashcounter >= R.i.flash_repeat ) {
            stop = true;
            unflash( flashedelement );
        } else {
            classNameUtil( flashedelement, 'flashed2',
                    ( flashcounter % 2 ) ? +1 : -1 );
            if ( R.i.flash_timing.length ) {
                nexttimer = Number( R.i.flash_timing[
                            flashcounter % R.i.flash_timing.length ] );
            }
        }
        flashcounter++;
        if ( stop == true ) {
            if ( !is_true( flashrepeated ) )
                break;
            nexttimer = R.i.flash_delay;
        }
        if ( nexttimer < 10 ) nexttimer = 10;
        if ( stop == true ) {
            flashtimer = setTimeout( flashstart, nexttimer );
            break;
        } else {
            flashtimer = setTimeout( flashdo, nexttimer );
        }
    } while ( false );
}

//}}}
//-----------------------------------------------------------------------------
//{{{

function showlinkcopyboxEVENT( event ) {
    showlinkcopybox( this, this.getAttribute( 'linkcopyaddress' ), "" );
}

var linkcopyboxtimeout = null;

function showlinkcopybox( element, href, text ) {
    var y = getY( element );
    if ( !y ) return false;
    var box = document.getElementById( "linkcopybox" );
    if ( !box ) return false;
    var input = document.getElementById( "linkcopyinput" );
    if ( !input ) return false;
    box.style.top = ( y - 60 ) + "px";
    classNameUtil( box, "hidden", -1 );
    classNameUtil( box, "shown",  +1 );
    input.value = '<a href="' + href + '" >' + text + "</a>";
    setlinkcopyboxtimeout( 3000 );
}

function hilightlinkcopyinput() {
    setlinkcopyboxtimeout( null );
    var input = document.getElementById( "linkcopyinput" );
    if ( !input ) { return; }
    input.focus(); input.select();
}

function hidelinkcopybox() {
    setlinkcopyboxtimeout( null );
    var box = document.getElementById( "linkcopybox" );
    if ( !box ) return false;
    box.style.top = "";
    classNameUtil( box, "shown",  -1 );
    classNameUtil( box, "hidden", +1 );
}

function setlinkcopyboxtimeout( ms ) {
    if ( linkcopyboxtimeout ) clearTimeout( linkcopyboxtimeout );
    if ( ( typeof ms == "number" ) && ( ms > 0 ) )
        linkcopyboxtimeout = setTimeout( hidelinkcopybox, ms );
    else linkcopyboxtimeout = null;
}

//}}}
//-----------------------------------------------------------------------------
//{{{

function showhtmlcopyboxEVENT( event ) {
    showhtmlcopybox( this );
}

var htmlcopyboxtimeout = null;

function showhtmlcopybox( element ) {
    var y = getY( element );
    if ( !y ) { return; }
    var box = document.getElementById( "htmlcopybox" );
    if ( !box ) { return; }
    var area = document.getElementById( "htmlcopyarea" );
    if ( !area ) { return; }
    box.style.top = ( y + 40 ) + "px";
    classNameUtil( box, "hidden", -1 );
    classNameUtil( box, "shown",  +1 );
    area.value = getbodyhtml( element );
    if ( area.value )
        area.value = area.value.replace( /^\s+|\s+$/g, "" );
    sethtmlcopyboxtimeout( 3000 );
}

function hilighthtmlcopyarea() {
    sethtmlcopyboxtimeout( null );
    var area = document.getElementById( "htmlcopyarea" );
    if ( !area ) { return; }
    area.focus(); area.select();
}

function getbodyhtml( element ) {
    var ea = getChildrenByTagANDClassName(
            getparenarticle( element ), 'div', 'body' );
    if ( ea.length != 1 ) return null;
    return ea[ 0 ].innerHTML;
}

function hidehtmlcopybox() {
    sethtmlcopyboxtimeout( null );
    var box = document.getElementById( "htmlcopybox" );
    if ( !box ) { return; }
    box.style.top = "";
    classNameUtil( box, "shown",  -1 );
    classNameUtil( box, "hidden", +1 );
}

function sethtmlcopyboxtimeout( ms ) {
    if ( htmlcopyboxtimeout ) clearTimeout( htmlcopyboxtimeout );
    if ( ( typeof ms == "number" ) && ( ms > 0 ) )
        htmlcopyboxtimeout = setTimeout( hidehtmlcopybox, ms );
    else htmlcopyboxtimeout = null;
}

//}}}
//-----------------------------------------------------------------------------
//{{{

var replyparentlink_click     = null;
var replyparentlink_mouseover = null;
var replyparentlink_mouseout  = null;

function hiliteparentarticleEVENT( event ) {
    if ( !event ) event = window.event;
    hilitelinkedarticle( this );
    return consumeEVENT( event );
}

function replyparentlink_purge() {
    var e1 = document.getElementById( 'replyparentlink' );
    if ( !e1 ) return null;
    if ( replyparentlink_click     ) e1.removeEventListener(
            'click',     replyparentlink_click,     false );
    if ( replyparentlink_mouseover ) e1.removeEventListener(
            'mouseover', replyparentlink_mouseover, false );
    if ( replyparentlink_mouseout  ) e1.removeEventListener(
            'mouseout',  replyparentlink_mouseout,  false );
    replyparentlink_click     = null;
    replyparentlink_mouseover = null;
    replyparentlink_mouseout  = null;
    return e1;
}

function replyparentboxupdate() {
    var show = 0, e1 = getmainparentelement();
    do {
        if ( !e1 ) break;
        var pid = e1.value;
        if ( /^\d\d*$/.test( pid ) ) show = 2;
        else { show = 1; break; }
        var currentpage = false, author = null;
        if ( e1 = document.getElementById( 'article-' + pid ) ) {
            currentpage = true;
            author = new AAuthor( e1 );
        }
        if ( e1 = replyparentlink_purge() ) {
            setinnertext( e1, pid, false );
            var phref = forgecontexthref( pid );
            e1.href = phref;
            if ( currentpage ) {
                replyparentlink_mouseover = flashparentarticleEVENT;
                replyparentlink_mouseout = flashrepeatstopEVENT;
                replyparentlink_click = hiliteparentarticleEVENT;
                e1.addEventListener( 'mouseover', replyparentlink_mouseover, false );
                e1.addEventListener( 'mouseout', replyparentlink_mouseout, false );
                e1.addEventListener( 'click', replyparentlink_click, false );
            } else {
                replyparentlink_click = consumeEVENT;
                e1.addEventListener( 'click', replyparentlink_click, false );
            }
            
            var before, after;
            if ( !R.i.okounpost_linkmarkers instanceof Array )
                R.i.okounpost_linkmarkers = [];
            if ( currentpage ) {
                before = R.i.okounpost_linkmarkers[ 0 ];
                after  = R.i.okounpost_linkmarkers[ 1 ];
                var offset = AIDs.getOffset( '*', pid );
                if ( typeof offset === 'number' ) { offset = '' + offset; }
                else { offset = '?'; }
                var map = { o: offset };
                before = sprintflite( before, map );
                after  = sprintflite( after,  map );
            } else if ( checkarticlelife( pid, false ) != 2 ) {
                before = R.i.okounpost_linkmarkers[ 2 ];
                after  = R.i.okounpost_linkmarkers[ 3 ];
            } else {
                before = R.i.okounpost_linkmarkers[ 4 ];
                after  = R.i.okounpost_linkmarkers[ 5 ];
            }
            var e2;
            if ( typeof before !== 'string' ) before = null;
            {
                e2 = e1.previousSibling;
                if ( e2 && ( e2.nodeType == 1 ) &&
                        ( e2.tagName.toLowerCase() == 'span' ) )
                    setinnertext( e2, before, false );
            }
            if ( typeof after !== 'string' ) after = null;
            {
                e2 = e1.nextSibling;
                if ( e2 && ( e2.nodeType == 1 ) &&
                        ( e2.tagName.toLowerCase() == 'span' ) )
                    setinnertext( e2, after, false );
            }
        }
        
        if ( e1 = document.getElementById( 'replyparentauthor' ) ) {
            if ( currentpage ) {
                if ( ( author instanceof AAuthor ) && !author.failed() )
                {
                    setinnertext( e1, author.getNick(), false );
                    if ( author.anonymous === true ) {
                        classNameUtil( e1, 'anon', +1 );
                    } else {
                        classNameUtil( e1, 'anon', -1 );
                    }
                } else {
                    classNameUtil( e1, 'anon', +1 );
                    setinnertext( e1, ( ( author instanceof AAuthor ) ?
                            author.getNick() : '[???]' ), false );
                }
                classNameUtil( e1, 'hidden', -1 );
            } else {
                classNameUtil( e1, 'hidden', +1 );
            }
        }
        
    } while ( false );
    e1 = document.getElementById( 'replyparentnone' );
    if ( e1 ) classNameUtil( e1, 'hidden', ( show == 1 ) ? -1 : +1 );
    e1 = document.getElementById( 'replyparentgiven' );
    if ( e1 ) classNameUtil( e1, 'hidden', ( show == 2 ) ? -1 : +1 );
}

function replyparentfromcurrentarticleEVENT( event ) {
    if ( !event ) event = window.event;
    var articleId = AIDUtils.getArticleNumber( currentarticleId );
    if ( typeof articleId !== 'number' ) return consumeEVENT( event );
    replyparentsetnew( articleId );
    replyparentboxupdate();
    replycontrolboxX( this );
    jumptoid( '#board-postArticle' );
    return consumeEVENT( event );
}

function getmainparentelement() {
    if ( !R.i.mainform ) return null;
    var i, children = R.i.mainform.childNodes;
    for ( i = 0; i < children.length; i++ )
        if ( ( children[ i ].nodeType == 1 ) &&
                ( children[ i ].tagName.toLowerCase() == 'input' ) &&
                ( children[ i ].name == 'parentId' ) )
            break;
    if ( i < children.length ) return children[ i ];
    else return null;
}

function replyparentsetnew( pid ) {
    if ( typeof pid === 'number' ) pid = String( pid );
    else if ( typeof pid !== 'string' ) return false;
    if ( !/^\d*$/.test( pid ) ) return false;
    var e1 = getmainparentelement();
    if ( !e1 ) return false;
    e1.value = pid;
    return ( e1.value === pid );
}

function replyparentX() {
    e1 = document.getElementById( 'replyparentnone' );
    if ( e1 ) classNameUtil( e1, 'hidden', -1 );
    e1 = document.getElementById( 'replyparentgiven' );
    if ( e1 ) classNameUtil( e1, 'hidden', +1 );
    if ( !replyparentsetnew( '' ) )
        replyparentboxupdate();
}

//}}}
//-----------------------------------------------------------------------------
//{{{

var mainFMTControls = {
    
    fmtNodeIds: {
        r: 'format-radeox',
        t: 'format-text',
        h: 'format-html',
        p: 'preview-flag'
    },
    
    fmtKeys: [ 'r', 't', 'h' ],
    
    getId: function getId( key ) {
        var ret = this.fmtNodeIds[ key ];
        if ( typeof ret !== 'string' ) ret = null;
        return ret;
    },
    
    getNode: function getNode( key ) {
        var ret = null, id = this.fmtNodeIds[ key ];
        if ( typeof id === 'string' ) {
            ret = document.getElementById( id );
            if ( !ret || ( ret.nodeType != 1 ) ) ret = null;
        }
        return ret;
    },
    
    getFormat: function getFormat() {
        var key, i = 0;
        for ( ; i < this.fmtKeys.length; i++ ) {
            key = this.fmtKeys[ i ];
            var id = this.fmtNodeIds[ key ];
            if ( typeof id !== 'string' ) continue;
            var e1 = document.getElementById( id );
            if ( !e1 || ( e1.nodeType != 1 ) ) continue;
            if ( e1.checked ) break;
        }
        if ( i < this.fmtKeys.length ) return key;
        return '';
    },
    
    setFormat: function setFormat( key ) {
        var e1 = this.getNode( key );
        if ( e1 ) {
            e1.checked = true;
            mainFMTControls.mirror( 'down' );
            return true;
        }
        return false;
    },
    
    setPreviewFlag: function setPreviewFlag( checked ) {
        if ( typeof checked !== 'boolean' ) return false;
        var e1 = this.getNode( 'p' );
        if ( e1 ) {
            e1.checked = checked;
            return true;
        }
        return false;
    },
    
    setDefaults: function setDefaults( defaultbodyType, defaultpreviewFlag ) {
        var v = null;
        if ( typeof defaultbodyType === 'string' ) {
            if ( /^R(a(d(e(ox?)?)?)?)?$/i.test( defaultbodyType ) )
                v = 'r';
            else if ( /^T(e(xt?)?)?$/i.test( defaultbodyType ) )
                v = 't';
            else if ( /^H(t(ml?)?)?$/i.test( defaultbodyType ) )
                v = 'h';
            if ( typeof v === 'string' )
                this.setFormat( v );
        }
        if ( typeof defaultpreviewFlag === 'string' ) {
            v = null;
            if ( /^C(h(e(c(k(ed?)?)?)?)?)?$/i.test( defaultpreviewFlag ) )
                v = true;
            else if ( /^U(n(c(h(e(c(k(ed?)?)?)?)?)?)?)?$/i.test(
                    defaultpreviewFlag ) )
                v = false;
            if ( typeof v === 'boolean' )
                this.setPreviewFlag( v );
        }
    },
    
    shadowNodeIds: {},
    
    setShadowNodeIds: function setShadowNodeIds( snids ) {
        if ( ( typeof snids !== 'object' ) || !snids ) return false;
        var ret = true;
        for ( i in this.fmtNodeIds ) {
            var ok = false;
            if ( typeof snids[ i ] === 'string' ) {
                var id = trim( snids[ i ] );
                if ( id.length > 0 ) {
                    this.shadowNodeIds[ i ] = id;
                    ok = true;
                }
            }
            if ( !ok ) {
                this.shadowNodeIds[ i ] = undeff();
                ret = false;
            }
        }
        return ret;
    },
    
    mirror: function mirror( direction ) {
        if ( typeof direction !== 'string' ) return false;
        var e1, e2, i, id, ret = true;
        for ( i in this.fmtNodeIds ) {
            id = this.fmtNodeIds[ i ];
            e1 = document.getElementById( id );
            id = this.shadowNodeIds[ i ];
            if ( typeof id !== 'string' ) { ret = false; continue }
            e2 = document.getElementById( id );
            if ( !e1 || !e2 ) { ret = false; continue }
            if ( direction == 'up' )        e1.checked = e2.checked;
            else if ( direction == 'down' ) e2.checked = e1.checked;
            else { ret = false; break; }
        }
        return ret;
    }
    
}

//}}}
//-----------------------------------------------------------------------------
//{{{

function showreplycontrolboxEVENT( event ) {
    showreplycontrolbox( this );
}

function updatereplycontrolupEVENT( event ) {
    updatereplycontrol( 'up' );
}

function updatereplycontroldownEVENT( event ) {
    updatereplycontrol( 'down' );
}

function replycontrolboxXEVENT( event ) {
    replycontrolboxX( this );
    return consumeEVENT( event );
}

function replyFormDLXEVENT( event ) {
    if ( !event ) event = window.event;
    hidereplycontrolbox();
    var articleId = AIDUtils.getArticleNodeID( this, 3 );
    var done = replyFormDLX( articleId );
    if ( done )
        return consumeEVENT( event );
}

// 2do: change to R.i.* or turn all to OOP
var currentarticleId = null;

function changeActiveTextarea( element ) {
    var ata = element;
    if ( !ata || ( ata.nodeType !== 1 ) ||
            ( ata.tagName.toLowerCase() != 'textarea' ) ) {
        if ( ata === null ) {
            R.i.activetextarea2 = null;
            if ( R.i.formatbuttons2.parentNode ) {
                R.i.formatbuttons2.parentNode.removeChild( R.i.formatbuttons2 );
            }
            return true;
        } else {
            return false;
        }
    }
    if ( !R.i.formatbuttons2 ) return false;
    R.i.activetextarea2 = ata;
    if ( ata.parentNode == R.i.formatbuttons2.parentNode ) {}
    else {
        ata.parentNode.insertBefore( R.i.formatbuttons2, ata );
    }
    return true;
}

function showreplycontrolbox( starter ) {
    currentarticleId = null;
    if ( !starter || ( starter.nodeType !== 1 ) ) return false;
    var box = document.getElementById( 'replycontrolbox' );
    if ( !box ) return false;
    if ( !updatereplycontrol( 'down' ) ) { //return false;
    }
    var articleId = AIDUtils.getArticleNodeID( starter, 3 );
    if ( !articleId ) return false;
    var rfid = 'replyForm-' + articleId;
    var replyForm = document.getElementById( rfid );
    if ( !replyForm ) {
        replyFormDLX( articleId );
        replyForm = document.getElementById( rfid );
        if ( !replyForm ) return false;
    } else if ( replyForm.getAttribute( 'DLXed' ) != 'true' ) {
        replyFormDLX( articleId );
    } else {
        replyForm.style.display = 'block';
    }
    
    var area = document.getElementById( 'replyFormBody-' + articleId );
    if ( area ) changeActiveTextarea( area );
    
    var r1 = Rect.fromElement( starter );
    if ( !r1 ) return false;
    var fromRF = /(^|\s)DLX-button(\s|$)/.test( starter.className );
    var y = r1.bottom + ( fromRF ? 5 : 5 );
    var rf = Rect.fromElement( replyForm );
    if ( !rf ) return false;
    currentarticleId = articleId;
    y = Math.max( y, rf.top + 5 );
    box.style.top = y + 'px';
    classNameUtil( box, 'left', fromRF ? + 1 : -1 );
    classNameUtil( box, 'hidden', -1 );
    classNameUtil( box, 'shown',  +1 );
    do {
        var rw = Rect.fromWindow();
        if ( !rw ) break;
        r1.merge( Rect.fromElement( getparenarticle( starter ) ) );
        r1.merge( Rect.fromElement( replyForm ) );
        r1.merge( Rect.fromElement( box ) );
        rw.lookat( r1, fromRF ? 1 : 2, 2 );
        rw.wscroll();
    } while ( false );
    
    if ( area ) area.focus();
}

function replyFormDLX( articleId ) {
    var articleId = AIDUtils.getArticleNumber( articleId );
    if ( typeof articleId !== 'number' ) return false;
    var replyForm = document.getElementById( 'replyForm-' + articleId );
    if ( !replyForm ) {
        var article = document.getElementById( 'article-' + articleId );
        var RARFcode = getRARFcode( article );
        if ( !RARFcode ) return false;
        try {
            eval( decodeURI( RARFcode ) );
        } catch ( e ) {
            consolemsg( 'exception in replyFormDLX(): ' + e );
        }
        replyForm = document.getElementById( 'replyForm-' + articleId );
        if ( !replyForm ) return false;
    }
    if ( replyForm.getAttribute( 'DLXed' ) == 'true' ) return false;
    
    var ea1 = getChildrenByTagANDClassName( replyForm, 'input', '*' );
    var submit = null;
    for ( var i = 0; i < ea1.length; i++ ) {
        if ( ( ea1[ i ].type == 'button' )
                || ( ea1[ i ].type == 'submit' )
                )
        {
            submit = ea1[ i ];
            break;
        }
    }
    if ( !submit ) return false;
    
    var e2 = document.createElement( 'div' );
    e2.className = '_MAX_W_100P';
    replyForm.insertBefore( e2, submit );
    var e3 = document.createElement( 'div' );
    e3.className = '_F_R';
    e2.appendChild( e3 );
    e2.appendChild( submit );
    
    e2 = createElement( 'input', null, 'DLX-button', { type: 'button' } );
    e2.value = '\u2026';
    e2.addEventListener( 'click', showreplycontrolboxEVENT, false );
    e3.appendChild( e2 );
    e2 = createElement( 'input', null, 'DLX-button', { type: 'button' } );
    e2.value = 'X';
    e2.addEventListener( 'click', replycontrolboxXEVENT, false );
    e3.appendChild( e2 );
    
    replyForm.addEventListener( 'keypress', shiftenterEVENT, false );
    
    replyForm.setAttribute( 'DLXed', 'true' );
    return true;
}

function replycontrolboxX( element ) {
    var fromRF = false;
    if ( element && ( element.nodeType === 1 ) &&
            /(^|\s)DLX-button(\s|$)/.test( element.className ) )
        fromRF = true;
    var articleId = fromRF ? AIDUtils.getArticleNodeID( element, 3 )
            : AIDUtils.getArticleNumber( currentarticleId );
    do {
        if ( typeof articleId !== 'number' ) break;
        var replyForm = document.getElementById( 'replyForm-' + articleId );
        if ( !replyForm ) break;
        replyForm.style.display = 'none';
        if ( R.i.activetextarea2 && R.i.activetextarea2.parentNode &&
                R.i.activetextarea2.parentNode.parentNode &&
                ( replyForm == R.i.activetextarea2.parentNode.parentNode ) )
            changeActiveTextarea( null );
    } while ( false );
    hidereplycontrolbox();
}

function findRARFlink( element ) {
    var found = 0;
    for ( ; ; element = element.parentNode ) {
        if ( !element ) return null;
        if ( element.nodeType === 3 ) continue;
        if ( element.nodeType !== 1 ) return null;
        if ( /(^|\s)article(\s|$)/.test( element.className ) ) {
            found = 1; break;
        } else if ( /(^|\s)article-menu(\s|$)/.test( element.className ) ) {
            found = 2; break;
        }
    }
    var ea;
    if ( found == 1 ) {
        ea = getChildrenByTagANDClassName( element, 'div', 'marks' );
        if ( ea.length != 1 ) return null;
        ea = getChildrenByTagANDClassName( ea[ 0 ], 'ul', 'article-menu' );
        if ( ea.length != 1 ) return null;
        element = ea[ 0 ];
        found = 2;
    }
    if ( found != 2 ) return null;
    ea = getChildrenByTagANDClassName( element, 'li', '*' );
    if ( ea.length < 1 ) return null;
    // assuming the reply link is in the last li element
    // no solid seeking effort made
    element = ea[ ea.length - 1 ].firstChild;
    if ( ( element.nodeType !== 1 ) || ( element.tagName.toLowerCase() != 'a' ) )
        return null;
    if ( !/^javascript:/i.test( element.href ) ) return null;
    return element;
}

function getRARFcode( element ) {
    element = findRARFlink( element );
    if ( !element ) return null;
    return element.href.replace( /^javascript:/i, '' );
}

function updatereplycontrol( direction ) {
    return mainFMTControls.mirror( direction );
}

function replycontrolboxRe() {
    var articleId = AIDUtils.getArticleNumber( currentarticleId );
    if ( typeof articleId !== 'number' ) return false;
    var replyForm = document.getElementById( 'replyForm-' + articleId );
    if ( !replyForm ) { return; }
    var area = document.getElementById( 'replyFormBody-' + articleId );
    if ( !area ) { return; }
    var nick, author = new AAuthor(
            document.getElementById( 'article-' + articleId ) );
    if ( ( author.anonymous == true ) && ( author.nick.length < 1 ) )
        nick = 'anonym';
    else
        nick = author.nick;
    replyForm.style.display = 'block';
    var temp = '';
    switch ( mainFMTControls.getFormat() ) {
       case 'r': temp = '**' + nick + '**'; break;
       case 'h': temp = '<b>' + nick + '</b>'; break;
       default: temp = nick; break;
    }
    temp = trim( temp );
    if ( ( void2str( area.value ).length >= temp.length ) &&
            ( trim( area.value ).substring( 0, temp.length ) == temp ) )
    {
    } else {
        area.value = temp + ':' + area.value;
    }
    area.focus();
}

function hidereplycontrolbox() {
    var box = document.getElementById( 'replycontrolbox' );
    if ( !box ) return false;
    box.style.top = '';
    classNameUtil( box, 'shown',  -1 );
    classNameUtil( box, 'hidden', +1 );
}

//}}}
//-----------------------------------------------------------------------------
//{{{

var RNGSELUtils = {
  NOT_SUPPORTED: {},
  DOM: {
    getElementWithId: function() {
      var func=function() { return RNGSELUtils.NOT_SUPPORTED; }
      if(document.getElementById) {
        func=function(id) {
          return document.getElementById(id);
        }
      } else if(document.all) {
        func=function(id) {
          return document.all[id];
        }
      }
      return (this.getElementWithId=func)();
    }
  },
  Ranges: {
    create: function() {
      var func=function() { return RNGSELUtils.NOT_SUPPORTED};
      if(document.body && document.body.createTextRange) {
        func=function() { return document.body.createTextRange(); }
      } else if(document.createRange) {
        func=function() { return document.createRange(); }
      }
      return (this.create=func)();
    },
    selectNode: function(node, originalRng) {
      var func=function() { return RNGSELUtils.NOT_SUPPORTED; };
      var rng=this.create(), method="";
      if(rng.moveToElementText) method="moveToElementText";
      else if(rng.selectNode) method="selectNode";
      if(method)
        func=function(node, rng) {
          rng=rng||RNGSELUtils.Ranges.create();
          rng[method](node);
          return rng;
        }
      return rng=null,(this.selectNode=func)(node, originalRng);
    }
  },
  Selection: {
    clear: function() {
      var func=function() { return RNGSELUtils.NOT_SUPPORTED};
      if(window.getSelection) {
        var sel=window.getSelection();
        if(sel.removeAllRanges) {
          func=function() {
            window.getSelection().removeAllRanges();
          }
        }
        sel=null;
      } else if(typeof document.selection!="undefined") {
        func=function() {
          if(document.selection && document.selection.empty) {
            return (RNGSELUtils.Selection.clear=function() {
              if(document.selection)
                document.selection.empty();
            })();
          }
        }
      }
      return (this.clear=func)();
    },
    add: function(originalRng) {
      var func=function() { return RNGSELUtils.NOT_SUPPORTED};
      var rng=RNGSELUtils.Ranges.create();
      if(rng.select) {
        func=function(rng) {rng.select(); }
      } else if(window.getSelection) {
        var sel=window.getSelection();
        if(sel.addRange) {
          func=function(rng) {window.getSelection().addRange(rng); }
        }
        sel=null;
      }
      return (this.add=func)(originalRng);
    }
  }
};

//}}}
//-----------------------------------------------------------------------------
//{{{

function ArgMap( source ) {
    this.init();
    if ( typeof source === 'object' ) this.merge( source );
}

ArgMap.prototype.init = function init() {
    this.map = {};
}
ArgMap.prototype.merge = function merge( object ) {
    var object = ( object instanceof ArgMap ) ? object.map : object;
    if ( ( object === null ) || ( typeof object !== 'object' ) ) { return; }
    for ( var i in object )
        if ( ( String( i ).length == 1 ) &&
                ( typeof object[ i ] === 'string' ) )
            this.map[ String( i ) ] = object[ i ];
}
ArgMap.prototype.set = function set( name, value ) {
    if ( ( typeof name !== 'string' ) || ( name.length != 1 ) ||
            ( typeof value !== 'string' ) )
        return;
    this.map[ name ] = value;
}
ArgMap.prototype.get = function get( name ) {
    if ( typeof name !== 'string' ) return null;
    var ret = this.map[ name ];
    if ( typeof ret !== 'string' ) return null;
    return ret;
}
ArgMap.prototype.toString = function toString() {
    var ret = '[', cnt = 0;
    for ( var i in this.map ) {
        if ( cnt++ > 0 ) ret += ', ';
        ret += i + ' => ' + this.map[ i ];
    }
    ret += ']';
    return ret;
}

//}}}
//-----------------------------------------------------------------------------
//{{{

var FBs = {
    FBAction: {
        IDLE: {},
        INSERT: {},
        BOX_RAISED: {},
        BOX_FAILED: {},
        OTHER_ERROR: {},
        INSERTED: {}
    },
    fBAction2str: function fBAction2str( a ) {
        if ( a === FBs.FBAction.IDLE )        return 'IDLE';
        if ( a === FBs.FBAction.INSERT )      return 'INSERT';
        if ( a === FBs.FBAction.BOX_RAISED )  return 'BOX_RAISED';
        if ( a === FBs.FBAction.BOX_FAILED )  return 'BOX_FAILED';
        if ( a === FBs.FBAction.OTHER_ERROR ) return 'OTHER_ERROR';
        if ( a === FBs.FBAction.INSERTED )    return 'INSERTED';
        return 'UNKNOWN';
    },
    FBAs: {
        registered: {},
        register: function register( actionCode, fBA1 ) {
            if ( ( typeof actionCode !== 'string' ) ||
                    !( fBA1 instanceof FBs.FBADefinition ) )
                return false;
            var key = trim( actionCode );
            if ( key.length < 1 ) return false;
            this.registered[ key ] = fBA1;
            return true;
        },
        get: function get( actionCode, propertyName ) {
            if ( ( typeof actionCode !== 'string' ) ||
                    !( this.registered[ actionCode ]
                    instanceof FBs.FBADefinition ) )
                return null;
            if ( ( typeof propertyName === 'undefined' ) || ( propertyName === null ) )
                return this.registered[ actionCode ];
            return this.registered[ actionCode ].get( propertyName );
        },
        toString: function toString() {
            var ret = '[', cnt = 0;
            for ( var i in this.registered ) {
                if ( cnt++ > 0 ) ret += '\n';
                ret += i + ' => ' + this.registered[ i ];
            }
            ret += ']';
            return ret;
        }
    },
    FBADefinition: function FBADefinition() {
        var insert, replace, format, magic, setarg;
        insert = replace = format = magic = setarg = '';
        
        this.set = function set( name, value ) {
            if ( typeof name !== 'string' ) return false;
            var type = FBs.FBADefinition.propertiesMap[ name ];
            if ( typeof type !== 'string' ) return false;
            var valid = false;
            switch ( type ) {
                case 'r' :
                    if ( typeof value !== 'string' ) break;
                    valid = true;
                    break;
                case 'o' :
                case 'o1' :
                    if ( typeof value !== 'string' ) {
                        value = '';
                        valid = true;
                        break;
                    }
                    value = trim( value );
                    if ( ( type == 'o1' ) && ( value.length > 1 ) )
                        value = value.substring( 0, 1 );
                    valid = true;
                    break;
            }
            if ( !valid ) return false;
            switch ( name ) {
                case 'insert':
                    insert = value; return true;
                case 'replace':
                    replace = value; return true;
                case 'format':
                    format = value; return true;
                case 'magic':
                    magic = value; return true;
                case 'setarg':
                    setarg = value; return true;
            }
            return false;
        };
        
        this.get = function get( name ) {
            if ( typeof name !== 'string' ) { return; }
            if ( typeof FBs.FBADefinition.propertiesMap[ name ] !== 'string' ) { return; }
            switch ( name ) {
                case 'insert':
                    return insert;
                case 'replace':
                    return replace;
                case 'format':
                    return format;
                case 'magic':
                    return magic;
                case 'setarg':
                    return setarg;
            }
            return;
        };
    },
    FBMs: {
        defined: {},
        registered: {},
        current: {
            magic: null,
            action: null,
            params: new ArgMap(),
            starter: null,
            reset: function reset() {
                this.magic = null;
                this.action = null;
                this.params = new ArgMap();
                this.starter = null;
            },
            fillForm: function fillForm() {
                if ( !( this.magic instanceof FBs.FBMDefinition ) ) { return; }
                var argmap = this.magic.get( 'fBMArgmap' );
                if ( !( argmap instanceof ArgMap ) ) {
                    argmap = new ArgMap( argmap );
                    this.magic.set( 'fBMArgmap', argmap );
                }
                var params = this.params;
                if ( !( params instanceof ArgMap ) ) {
                    params = new ArgMap( params );
                    this.params = params;
                }
                for ( var argid in argmap.map ) {
                    var eid = argmap.map[ argid ];
                    if ( typeof eid !== 'string' ) continue;
                    var e1 = document.getElementById( eid );
                    if ( !e1 ) continue;
                    var val = params.map[ argid ];
                    if ( typeof val !== 'string' ) val = '';
                    e1.value = val;
                }
            },
            focus: function focus( which ) {
                if ( typeof which !== 'string' ) { return; }
                if ( ( which != 'first' ) && ( which != 'last' ) ) { return; }
                if ( !( this.magic instanceof FBs.FBMDefinition ) ) { return; }
                var eid = this.magic.get( which );
                if ( typeof eid !== 'string' ) { return; }
                var e1 = document.getElementById( eid );
                if ( !e1 ) { return; }
                e1.focus();
            },
            readForm: function readForm() {
                if ( !( this.magic instanceof FBs.FBMDefinition ) ) { return; }
                var argmap = this.magic.get( 'fBMArgmap' );
                if ( !( argmap instanceof ArgMap ) ) {
                    argmap = new ArgMap( argmap );
                    this.magic.set( 'fBMArgmap', argmap );
                }
                var params = this.params;
                if ( !( params instanceof ArgMap ) ) {
                    params = new ArgMap( params );
                    this.params = params;
                }
                for ( var argid in argmap.map ) {
                    var eid = argmap.map[ argid ];
                    if ( typeof eid !== 'string' ) continue;
                    var val, e1 = document.getElementById( eid );
                    if ( e1 ) val = e1.value;
                    if ( typeof val !== 'string' ) val = '';
                    params.set( argid, val );
                }
                this.params = params;
            },
            getInputNode: function getInputNode( argid ) {
                if ( !( this.magic instanceof FBs.FBMDefinition ) ) { return; }
                var argmap = this.magic.get( 'fBMArgmap' );
                if ( !( argmap instanceof ArgMap ) ) {
                    argmap = new ArgMap( argmap );
                    this.magic.set( 'fBMArgmap', argmap );
                }
                var eid = argmap.map[ argid ];
                if ( !eid ) return null;
                var e1 = document.getElementById( eid );
                if ( !e1 ) return null;
                return e1;
            }
        },
        define: function define( magicCode, fBM1 ) {
            if ( ( typeof magicCode !== 'string' ) ||
                    !( fBM1 instanceof FBs.FBMDefinition ) )
                return false;
            var key = trim( magicCode );
            if ( key.length < 1 ) return false;
            this.defined[ key ] = fBM1;
            return true;
        },
        register: function register( magicCode, fBM1 ) {
            if ( ( typeof magicCode !== 'string' ) ||
                    !( fBM1 instanceof FBs.FBMDefinition ) )
                return false;
            var key = trim( magicCode );
            if ( key.length < 1 ) return false;
            this.registered[ key ] = fBM1;
            return true;
        },
        get: function get( magicCode, propertyName ) {
            if ( ( typeof magicCode !== 'string' ) ||
                    !( this.registered[ magicCode ]
                    instanceof FBs.FBMDefinition ) )
                return null;
            if ( ( typeof propertyName === 'undefined' ) || ( propertyName === null ) )
                return this.registered[ magicCode ];
            return this.registered[ magicCode ].get( propertyName );
        },
        toString: function toString() {
            var ret = '[', cnt = 0;
            for ( var i in this.registered ) {
                if ( cnt++ > 0 ) ret += '\n';
                ret += i + ' => ' + this.registered[ i ];
            }
            ret += ']';
            return ret;
        }
    },
    FBMDefinition: function FBMDefinition() {
        var fBMContent = null;
        var first = 'fbm-OK';
        var last = 'fbm-X';
        var fBMArgmap = {};
        var fBMPrepareContent = FBs.FBMDefinition.defaultFs.fBMPrepareContentDefault;
        var fBAction = FBs.FBMDefinition.defaultFs.fBActionDefault;
        var fBMInit = FBs.FBMDefinition.defaultFs.fBMInitDefault;
        var fBMOk = FBs.FBMDefinition.defaultFs.fBMOkDefault;
        
        var contentPrepared = false;
        var prepareContent = function prepareContent() {
            if ( typeof fBMPrepareContent !== 'function' ) return false;
            var c = undeff();
            try {
                c = fBMPrepareContent();
            } catch  ( e ) {
                consolemsg( 'exception in prepareContent(): ' + e );
                c = undeff();
            }
            if ( c === null ) { fBMContent = null; return true; }
            if ( typeof c !== 'object' ) return false;
            if ( c.nodeType !== 1 ) return false;
            fBMContent = c;
            return true;
        };
        //contentPrepared = prepareContent();
        
        this.set = function set( name, value ) {
            if ( typeof name !== 'string' ) return false;
            var type = FBs.FBMDefinition.propertiesMap[ name ];
            if ( typeof type !== 'string' ) return false;
            var valid = false;
            switch ( type ) {
                case 'n' :
                    if ( value === null ) {
                        valid = true;
                        break;
                    }
                    if ( typeof value !== 'object' ) break;
                    if ( value.nodeType !== 1 ) break;
                    valid = true;
                    break;
                case 's' :
                    if ( typeof value !== 'string' ) break;
                    value = trim( value );
                    valid = true;
                    break;
                case 'o' :
                    if ( ( value !== null ) && ( typeof value === 'object' ) )
                        valid = true;
                    break;
                case 'g' :
                    if ( value === null ) valid = true;
                case 'f' :
                    if ( typeof value === 'function' ) valid = true;
                    break;
            }
            if ( !valid ) return false;
            switch ( name ) {
                case 'first':
                    first = value; return true;
                case 'last':
                    last = value; return true;
                case 'fBMArgmap':
                    fBMArgmap = new ArgMap( value );
                    return true;
                case 'fBMPrepareContent':
                    fBMPrepareContent = value;
                    contentPrepared = false;
                    return true;
                case 'fBAction':
                    fBAction = value; return true;
                case 'fBMInit':
                    fBMInit = value; return true;
                case 'fBMOk':
                    fBMOk = value; return true;
            }
            return false;
        };
        
        this.get = function get( name ) {
            if ( typeof name !== 'string' ) { return; }
            if ( typeof FBs.FBMDefinition.propertiesMap[ name ] !== 'string' ) { return; }
            switch ( name ) {
                case 'fBMContent':
                    if ( contentPrepared !== true )
                        contentPrepared = prepareContent();
                    if ( contentPrepared !== true )
                        return null;
                    return fBMContent;
                case 'first':
                    return first;
                case 'last':
                    return last;
                case 'fBMArgmap':
                    return fBMArgmap;
                case 'fBMPrepareContent':
                    return fBMPrepareContent;
                case 'fBAction':
                    return fBAction;
                case 'fBMInit':
                    return fBMInit;
                case 'fBMOk':
                    return fBMOk;
            }
            return;
        };
    }
};

FBs.FBADefinition.propertiesMap = {
    insert: 'r', replace: 'r',
    format: 'o1', magic: 'o', setarg: 'o1'
};

FBs.FBADefinition.prototype.toString = function toString() {
    var ret = '[', cnt = 0;
    for ( var i in FBs.FBADefinition.propertiesMap ) {
        if ( cnt++ > 0 ) ret += ', ';
        ret += i + ': "' + this.get( i ) + '"';
    }
    ret += ']';
    return ret;
};

FBs.FBMDefinition.propertiesMap = {
    fBMContent: 'n',
    first: 's', last: 's',
    fBMArgmap: 'o',
    fBMPrepareContent: 'f', fBAction: 'f',
    fBMInit: 'g', fBMOk: 'g'
};

FBs.FBMDefinition.defaultFs = {
    fBMPrepareContentDefault: function fBMPrepareContentDefault() {
        var e1 = document.createElement( 'div' );
        e1.innerHTML = '<p class="_T_A_C" >finish me</p>';
        return e1;
    },
    fBActionDefault: function fBActionDefault(
            actionCode, starter, selectedText ) {
        try {
            var ret = fbmboxraise( actionCode, starter, selectedText );
            if ( ret === true ) return FBs.FBAction.BOX_RAISED;
            else return FBs.FBAction.BOX_FAILED;
        } catch ( e ) {
            consolemsg( 'exception in fBActionDefault(): ' + e );
            return FBs.FBAction.BOX_FAILED;
        }
    },
    fBMInitDefault: function fBMInitDefault() {
        FBs.FBMs.current.fillForm();
        return true;
    },
    fBMOkDefault: function fBMOkDefault() { return true; }
};

FBs.FBMDefinition.prototype.toString = function toString() {
    return '[FBs.FBMDefinition object]';
};

//}}}
//-----------------------------------------------------------------------------
//{{{

function readColor( input ) {
    if ( typeof input !== 'string' ) return null;
    var p1 = /^(#?[A-Za-z0-9]{3,30})(\/(#?[A-Za-z0-9]{3,30}))?(\|(.*))?$/;
    var pr = p1.exec( input );
    if ( !pr ) return null;
    var c = pr[ 1 ], b = void2str( pr[ 3 ] ), n = void2str( pr[ 5 ] );
    if ( !checkColor( c, false ) ) return null;
    if ( ( b.length > 0 ) && ( !checkColor( b, false ) ) ) return null;
    if ( n.length < 1 ) n = c;
    return { color: c, background: b, name: n };
}

function checkAllowedTag( tag ) {
    if ( !checkAllowedTag.allowedTags ) {
        checkAllowedTag.allowedTags = {};
        var tagList = [ 'b', 'i', 'strike', 'tt', 'small', 'blockquote',
                'strong', 'big', 'font', 'center', 'cite', 'block', 'pre',
                'code', 's', 'a', 'sub', 'sup', 'em', 'u', 'div', 'span', 'p',
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'br', 'hr', 'img',
                'ol', 'ul', 'li', 'table', 'tr', 'td', 'th' ];
        for ( var i = 0; i < tagList.length; i++ ) {
            var t = tagList[ i ];
            if ( typeof t !== 'string' ) continue;
            t = trim( t );
            if ( checkTagName( tag ) )
                checkAllowedTag.allowedTags[ t ] = t;
        }
    }
    if ( typeof tag !== 'string' ) return false;
    if ( checkAllowedTag.allowedTags[ tag ] ) return true;
    return false;
}

var fBM1;
fBM1 = new FBs.FBMDefinition();
fBM1.set( 'fBMPrepareContent', function fBMPrepareContent() {
            var e1 = document.createElement( 'div' );
            e1.innerHTML = ''
                    + '<table><tr><td><label for="fbm-url-href" >'
                    + 'adresa</label></td><td>'
                    + '<input type="text" name="fbm-url-href" id="fbm-url-href" />'
                    + '</td></tr><tr><td><label for="fbm-url-text" >'
                    + 'text</label></td><td>'
                    + '<input type="text" name="fbm-url-text" id="fbm-url-text" />'
                    + '</td></tr><tr><td><label for="fbm-url-title" >'
                    + 'titulek</label></td><td>'
                    + '<input type="text" name="fbm-url-title" id="fbm-url-title" />'
                    + '</td></tr></table>';
            return e1;
        } );
fBM1.set( 'first', 'fbm-url-href' );
fBM1.set( 'fBMArgmap', { '1': 'fbm-url-href',
        '2': 'fbm-url-text', '3': 'fbm-url-title' } );
fBM1.set( 'fBMOk', function fBMOk() {
            var param = FBs.FBMs.current.params.get( '3' );
            if ( trim( param ).length < 1 ) {
                param = '';
            } else {
                param = 'title="' + escapequot( escapehtml( param ) ) + '"';
            }
            FBs.FBMs.current.params.set( '3', param );
            return true;
        } );
FBs.FBMs.define( 'url', fBM1 );

fBM1 = new FBs.FBMDefinition();
fBM1.set( 'fBMPrepareContent', function fBMPrepareContent() {
            var e1 = document.createElement( 'div' );
            e1.innerHTML = ''
                    + '<table><tr><td><label for="fbm-img-src" >'
                    + 'adresa</label></td><td>'
                    + '<input type="text" name="fbm-img-src" id="fbm-img-src" />'
                    + '</td></tr><tr><td><label for="fbm-img-alt" >'
                    + 'n\u00E1hradn\u00ED text</label></td><td>'
                    + '<input type="text" name="fbm-img-alt" id="fbm-img-alt" />'
                    + '</td></tr><tr><td><label for="fbm-img-title" >'
                    + 'titulek</label></td><td>'
                    + '<input type="text" name="fbm-img-title" id="fbm-img-title" />'
                    + '</td></tr></table>';
            return e1;
        } );
fBM1.set( 'first', 'fbm-img-src' );
fBM1.set( 'fBMArgmap', { '1': 'fbm-img-src',
        '2': 'fbm-img-alt', '3': 'fbm-img-title' } );
fBM1.set( 'fBMInit', function fBMInit() {
            FBs.FBMs.current.fillForm();
            e2 = FBs.FBMs.current.getInputNode( '2', false );
            if ( e2 && ( trim( e2.value ).length < 1 ) )
                e2.value = '%s';
            return true;
        } );
fBM1.set( 'fBMOk', function fBMOk() {
            var map = {};
            map[ 's' ] = trim( FBs.FBMs.current.params.get( '1' ) );
            map[ 'f' ] = map[ 's' ].replace( /^(.*[\\/])?([^\\/]*)$/, '$2' );
            var param = FBs.FBMs.current.params.get( '2' );
            if ( trim( param ).length < 1 ) {
                param = '';
            } else {
                param = sprintflite( param, map );
                param = 'alt="' + escapequot( escapehtml( param ) ) + '" ';
            }
            FBs.FBMs.current.params.set( '2', param );
            param = FBs.FBMs.current.params.get( '3' );
            if ( trim( param ).length < 1 ) {
                param = '';
            } else {
                param = sprintflite( param, map );
                param = 'title="' + escapequot( escapehtml( param ) ) + '" ';
            }
            FBs.FBMs.current.params.set( '3', param );
            return true;
        } );
FBs.FBMs.define( 'img', fBM1 );

fBM1 = new FBs.FBMDefinition();
fBM1.set( 'fBMPrepareContent', function fBMPrepareContent() {
            var e1 = document.createElement( 'div' );
            var i, innerHTML = ''
                    + '<table><tr><td><label for="fbm-font-size" >'
                    + 'velikost</label></td><td>'
                    + '<select name="fbm-font-size" id="fbm-font-size" >'
                    + '<option></option>';
            for ( i = 7; i >= 1; i-- )
                innerHTML += '<option value="' + i + '" >' + i + '</option>';
            for ( i = 6; i >= 1; i-- )
                innerHTML += '<option value="+' + i + '" >+' + i + '</option>';
            for ( i = 1; i <= 6; i++ )
                innerHTML += '<option value="-' + i + '" >-' + i + '</option>';
            innerHTML += ''
                    + '</select>'
                    + '</td></tr><tr><td><label for="fbm-font-color" >'
                    + 'barva</label></td><td>'
                    + '<select name="fbm-font-color" id="fbm-font-color" >'
                    + '<option></option>';
            var fontcolors = R.get( 'fontcolors' );
            for ( i = 0; i < fontcolors.length; i++ ) {
                var c = readColor( fontcolors[ i ] );
                if ( !c ) continue;
                innerHTML += '<option value="' + c.color
                        + '" style="color: ' + c.color;
                if ( c.background.length > 2 )
                    innerHTML += '; background-color: ' + c.background;
                innerHTML += ';" >' + c.name + '</option>';
            }
            innerHTML += ''
                    + '</select>'
                    + '</td></tr><tr><td><label for="fbm-font-text" >'
                    + 'text</label></td><td>'
                    + '<input type="text" name="fbm-font-text" id="fbm-font-text" />'
                    + '</td></tr></table>';
            e1.innerHTML = innerHTML;
            return e1;
        } );
fBM1.set( 'first', 'fbm-font-size' );
fBM1.set( 'fBMArgmap', { '1': 'fbm-font-size',
        '2': 'fbm-font-color', '3': 'fbm-font-text' } );
fBM1.set( 'fBMOk', function fBMOk() {
            var param = FBs.FBMs.current.params.get( '1' );
            if ( trim( param ).length < 1 ) {
                param = '';
            } else {
                param = 'size="' + param + '" ';
            }
            FBs.FBMs.current.params.set( '1', param );
            param = FBs.FBMs.current.params.get( '2' );
            if ( trim( param ).length < 1 ) {
                param = '';
            } else {
                param = 'color="' + param + '" ';
            }
            FBs.FBMs.current.params.set( '2', param );
            //if ( ( FBs.FBMs.current.params.get( '1' ).length < 1 ) &&
            //        ( param.length < 1 ) ) return false;
            return true;
        } );
FBs.FBMs.define( 'font', fBM1 );

fBM1 = new FBs.FBMDefinition();
fBM1.set( 'fBMPrepareContent', function fBMPrepareContent() {
            var e1 = document.createElement( 'div' );
            var innerHTML = ''
                    + '<table><tr><td><label for="fbm-table-cols" >'
                    + 'po\u010Det sloupc\u016F</label></td><td>';
            innerHTML += '<select name="fbm-table-cols" id="fbm-table-cols" >';
            var i, max_table_cols = R.get( 'max_table_cols' );
            for ( i = 1; i <= max_table_cols ; i++ )
                innerHTML += '<option value="' + i + '" >' + i + '</option>';
            innerHTML += '</select>';
            innerHTML += '</td></tr><tr><td><label for="fbm-table-rows" >'
                    + 'po\u010Det \u0159\u00E1dk\u016F</label></td><td>';
            innerHTML += '<select name="fbm-table-rows" id="fbm-table-rows" >';
            var max_table_rows = R.get( 'max_table_rows' );
            for ( i = 1; i <= max_table_rows ; i++ )
                innerHTML += '<option value="' + i + '" >' + i + '</option>';
            innerHTML += '</select>';
            innerHTML += '</td></tr><tr><td><label for="fbm-table-bgcolor" >'
                    + 'barva pozad\u00ED</label></td><td>'
                    + '<select name="fbm-table-bgcolor" id="fbm-table-bgcolor" >'
                    + '<option></option>';
            var bgcolors = R.get( 'bgcolors' );
            for ( i = 0; i < bgcolors.length; i++ ) {
                var c = readColor( bgcolors[ i ] );
                if ( !c ) continue;
                innerHTML += '<option value="' + c.color
                        + '" style="background-color: ' + c.color;
                if ( c.background.length > 2 )
                    innerHTML += '; color: ' + c.background;
                innerHTML += ';" >' + c.name + '</option>';
            }
            innerHTML += ''
                    + '</select>'
                    + '</td></tr></table>';
            e1.innerHTML = innerHTML;
            return e1;
        } );
fBM1.set( 'first', 'fbm-table-cols' );
fBM1.set( 'fBMArgmap', { '1': 'fbm-table-cols',
        '2': 'fbm-table-rows', '3': 'fbm-table-bgcolor' } );
fBM1.set( 'fBMInit', function fBMInit() {
            FBs.FBMs.current.fillForm();
            e2 = FBs.FBMs.current.getInputNode( '2', false );
            if ( e2 ) e2.value = '1';
            e2 = FBs.FBMs.current.getInputNode( '1', false );
            if ( e2 ) e2.value = '1';
            return true;
        } );
fBM1.set( 'fBMOk', function fBMOk() {
            var param = FBs.FBMs.current.params.get( '1' );
            if ( typeof param !== 'string' ) {
                param = '';
                FBs.FBMs.current.params.set( '1', '' );
            }
            var c = trim( param );
            param = FBs.FBMs.current.params.get( '2' );
            if ( typeof param !== 'string' ) {
                param = '';
                FBs.FBMs.current.params.set( '2', '' );
            }
            var r = trim( param ), p = /^\d\d*$/;
            if ( !p.test( c ) || !p.test( r ) ) return false;
            c = Number( c ); r = Number( r );
            if ( ( c < 1 ) || ( r < 1 ) ) return false;
            if ( c > R.get( 'max_table_cols' ) ) return false;
            if ( r > R.get( 'max_table_rows' ) ) return false;
            param = FBs.FBMs.current.params.get( '3' );
            if ( trim( param ).length < 1 ) {
                param = '';
            } else {
                param = ' bgcolor="' + param + '" ';
            }
            FBs.FBMs.current.params.set( '3', param );
            FBs.FBMs.current.params.set( '4', '<tr><td>' );
            param = '</td>';
            var i, j;
            for ( j = 1; j < c; j++ ) { param += '<td></td>'; }
            param += '</tr>\n';
            for ( i = 1; i < r; i++ ) {
                param += '<tr>';
                for ( j = 0; j < c; j++ ) { param += '<td></td>'; }
                param += '</tr>\n';
            }
            FBs.FBMs.current.params.set( '5', param );
            return true;
        } );
FBs.FBMs.define( 'table', fBM1 );

fBM1 = new FBs.FBMDefinition();
fBM1.set( 'fBMPrepareContent', function fBMPrepareContent() {
            var e1 = document.createElement( 'div' );
            var innerHTML = '<div id="htmlents" >';
            var i, open = false, ent, mode;
            var preparehtmlents = function preparehtmlents( htmlents ) {
                for ( i = 0; ; i++ ) {
                    if ( i >= htmlents.length ) {
                        if ( open ) innerHTML += '<br>';
                        break;
                    }
                    ent = htmlents[ i ];
                    if ( ( typeof ent !== 'string' ) || ( ent.length < 1 ) )
                        continue;
                    if ( ent == '/' ) {
                        if ( open ) innerHTML += '<br>';
                        open = false;
                        continue;
                    }
                    mode = 0;
                    if ( ent.charAt( 0 ) == '<' ) {
                        mode = 1;
                        ent = ent.substring( 1 );
                    } else if ( ent.charAt( 0 ) == '>' ) {
                        mode = 2;
                        ent = ent.substring( 1 );
                    } else if ( ent.charAt( 0 ) == '|' ) {
                        mode = 0;
                        ent = ent.substring( 1 );
                    } else {
                    }
                    if ( ent.length < 1 ) continue;
                    open = true;
                    innerHTML += '<span class="htmlent" >';
                    if ( mode == 0 ) {
                        innerHTML += '<span class="entsimple" title="&amp;'
                                + ent + ';" >&' + ent + ';</span>';
                    } else {
                        if ( mode == 1 ) {
                            innerHTML += '<span class="entlabel" >&' + ent + ';</span>';
                        }
                        innerHTML += '<span class="entcode" >&amp;' + ent + ';</span>';
                        if ( mode == 2 ) {
                            innerHTML += '<span class="entlabel" >&' + ent + ';</span>';
                        }
                    }
                    innerHTML += '</span>';
                }
            };
            innerHTML += '<div id="htmlents1" >';
            preparehtmlents( R.get( 'htmlents1' ) );
            innerHTML += '</div>';
            innerHTML += '<div id="htmlents2" class="hidden" >';
            open = false;
            preparehtmlents( R.get( 'htmlents2' ) );
            innerHTML += '</div>';
            innerHTML += '</div>';
            innerHTML += '<div class="_MAX_W_100P" >'
                    + '<div id="htmlents2switcher" >'
                    + '<button type="button" id="fbm-html-e2switch" >'
                    + 'v\u0161echny</button></div></div>';
            e1.innerHTML = innerHTML;
            document.body.appendChild( e1 );
            var e2 = document.getElementById( 'htmlents' );
            if ( e2 ) {
                e2.addEventListener( 'mouseover', htmlentselectEVENT, false );
                e2.addEventListener( 'mousedown', htmlentselectEVENT, false );
                e2.addEventListener( 'click', htmlentinsertEVENT, false );
                e2.addEventListener( 'mouseup', consumeEVENT, false );
            }
            if ( e2 = document.getElementById( 'fbm-html-e2switch' ) ) {
                e2.addEventListener( 'click', htmlents2switchEVENT, false );
            }
            document.body.removeChild( e1 );
            return e1;
        } );
fBM1.set( 'first', 'fbm-html-e2switch' );
fBM1.set( 'fBAction', function fBAction(
                actionCode, starter, selectedText ) {
            if ( ( typeof selectedText !== 'string' ) ||
                    ( selectedText.length > 0 ) )
            {
                var fBA1 = FBs.FBAs.get( actionCode, null );
                if ( !( fBA1 instanceof FBs.FBADefinition ) )
                    return FBs.FBAction.IDLE;
                var map = {};
                var argid = fBA1.get( 'setarg' );
                if ( ( typeof argid === 'string' ) &&
                        ( argid.length > 0 ) ) {
                    map[ argid ] = escapehtml( selectedText );
                }
                fbinsert(
                        fBA1.get( 'insert' ), fBA1.get( 'replace' ),
                        map, fBA1.get( 'format' ) );
                return FBs.FBAction.INSERTED;
            }
            try {
                var ret = fbmboxraise( actionCode, starter, selectedText );
                if ( ret === true ) return FBs.FBAction.BOX_RAISED;
                else return FBs.FBAction.BOX_FAILED;
            } catch ( e ) { return FBs.FBAction.BOX_FAILED; }
        } );
fBM1.set( 'fBMInit', null );
fBM1.set( 'fBMOk', null );
FBs.FBMs.define( 'html', fBM1 );

fBM1 = new FBs.FBMDefinition();
fBM1.set( 'fBMPrepareContent', function fBMPrepareContent() {
            var e1 = document.createElement( 'div' );
            var innerHTML = ''
                    + '<table><tr><td><label for="fbm-tagpair-custom" >'
                    + 'ru\u010Dn\u00ED vlo\u017Een\u00ED</label></td><td>'
                    + '<input type="text" name="fbm-tagpair-custom" id="fbm-tagpair-custom" />'
                    + '</td></tr><tr><td><label for="fbm-tagpair-tag" >'
                    + 'v\u00FDb\u011Br</label></td><td>';
            innerHTML += '<select name="fbm-tagpair-tag" id="fbm-tagpair-tag" >'
                    + '<option></option>';
            var i, taglist = R.get( 'taglist' );
            for ( i = 0; i < taglist.length; i++ ) {
                var t = taglist[ i ];
                if ( !checkAllowedTag( t ) ) continue;
                innerHTML += '<option value="' + t + '" >' + t + '</option>';
            }
            innerHTML += ''
                    + '</select>'
                    + '</td></tr><tr><td><label for="fbm-tagpair-text" >'
                    + 'text</label></td><td>'
                    + '<input type="text" name="fbm-tagpair-text" id="fbm-tagpair-text" />'
                    + '</td></tr></table>';
            e1.innerHTML = innerHTML;
            return e1;
        } );
fBM1.set( 'first', 'fbm-tagpair-tag' );
fBM1.set( 'fBMArgmap', { '1': 'fbm-tagpair-tag',
        '2': 'fbm-tagpair-text', '3': 'fbm-tagpair-custom' } );
fBM1.set( 'fBMOk', function fBMOk() {
            var tag = '', param = FBs.FBMs.current.params.get( '3' );
            if ( trim( param ).length < 1 ) {
                param = '';
            } else {
                param = param.replace( /([\r\n].*$)?/g, '' );
                param = param.replace( /^\s*[<]|(\s*[>])?\s*$/g, '' );
                param = param.replace( /^([^>]*)([>].*)?$/, '$1' );
                var p1 = /^([^\s]*)($|\s\s*)([^\s].*)?$/;
                var pr = p1.exec( param );
                if ( !pr ) return false;
                tag = pr[ 1 ];
                if ( tag.length < 1 ) {
                    param = trim( param );
                } else if ( checkTagName( tag ) ) {
                    param = trim( pr[ 3 ] );
                } else {
                    //return false;
                    tag = '';
                    param = trim( param );
                }
                if ( /[<>]/.test( param ) ) return false;
                if ( param.length > 0 )
                    param = ' ' + param + ' ';
            }
            FBs.FBMs.current.params.set( '3', param );
            param = FBs.FBMs.current.params.get( '1' );
            if ( trim( param ).length < 1 ) {}
            else {
                if ( tag.length < 1 ) tag = param;
            }
            FBs.FBMs.current.params.set( '1', tag );
            if ( !checkAllowedTag( tag ) ) return false;
            return true;
        } );
FBs.FBMs.define( 'tagpair', fBM1 );

fBM1 = undeff();

//}}}
//-----------------------------------------------------------------------------
//{{{

function htmlents2switchEVENT( event ) {
    var e1 = document.getElementById( 'htmlents2' );
    if ( e1 ) {
        classNameUtil( e1, 'hidden', 2 );
        fbmboxreposition();
    }
}

function htmlentselectEVENT( event ) {
    return htmlentselectinsert( event, 's' );
}

function htmlentinsertEVENT( event ) {
    return htmlentselectinsert( event, 'i' );
}

function htmlentselectinsert( event, action ) {
    if ( typeof action !== 'string' ) return true;
    if ( ( action != 's' ) && ( action != 'i' ) ) return true;
    if ( !event ) event = window.event;
    var srcEl = event.srcElement ? event.srcElement : event.target;
    if ( srcEl.nodeType != 1 ) return true;
    var target = srcEl;
    if ( classNameUtil( target, 'entcode', 0 ) === true ) {}
    else if ( classNameUtil( target, 'entsimple', 0 ) === true ) {}
    else {
        if ( classNameUtil( target, 'entlabel', 0 ) === true )
            target = target.parentNode;
        if ( classNameUtil( target, 'htmlent', 0 ) === true ) {
            var ea1 = getChildrenByTagANDClassName( target, '*', 'entcode' );
            if ( ea1.length != 1 ) {
                ea1 = getChildrenByTagANDClassName( target, '*', 'entsimple' );
                if ( ea1.length != 1 ) return true;
            }
            target = ea1[ 0 ];
        } else
            return true;
    }
    if ( action == 's' ) {
        var rng = RNGSELUtils.Ranges.create();
        if ( rng == RNGSELUtils.NOT_SUPPORTED ) return true;
        RNGSELUtils.Selection.clear();
        RNGSELUtils.Selection.add( RNGSELUtils.Ranges.selectNode( target ) );
        if ( srcEl == target )
            return true;
        return consumeEVENT( event );
    } else {
        if ( !target.firstChild || ( target.firstChild.nodeType != 3 ) )
            return true;
        insertText( R.i.fbatarget, target.firstChild.nodeValue,
                insertText.IDLE, {} );
        R.i.fbatarget.focus();
        return consumeEVENT( event );
    }
}

function fbmkeypressEVENT( event ) {
    if ( !event ) event = window.event;
    var code = event.keyCode;
    if ( ( code == 0 ) && ( event.charCode > 0 ) ) code = event.charCode;
    if ( code == 27 ) {
        fbmboxX();
        return consumeEVENT( event );
    }
    var srcEl = event.srcElement ? event.srcElement : event.target;
    if ( ( srcEl.nodeType == 1 ) &&
            ( srcEl.tagName.toLowerCase() == 'select' ) ) {
        if ( code == 8 ) {
            srcEl.value = '';
            return consumeEVENT( event );
        }
        return true;
    }
    if ( code != 13 ) return true;
    consumeEVENT( event );
    if ( srcEl.id == 'fbm-html-e2switch' ) {
        htmlents2switchEVENT( event );
        return false;
    }
    if ( srcEl.id == 'fbm-X' ) return false;
    fbmboxOK();
    return false;
}

function formatbuttonEVENT( event ) {
    consumeEVENT( event );
    var actionCode = this.getAttribute( 'actionCode' );
    if ( typeof actionCode === 'string' )
        formataction( actionCode, this );
    return false;
}

function formataction( actionCode, starter ) {
    if ( typeof actionCode !== 'string' ) return false;
    var fBA1 = FBs.FBAs.get( actionCode, null );
    if ( !( fBA1 instanceof FBs.FBADefinition ) ) return false;
    R.i.fbatarget = null;
    for ( var e1 = starter; e1; ) {
        if ( e1 == R.i.formatbuttons1 ) {
            R.i.fbatarget = R.i.mainformtextarea;
            break;
        } else if ( e1 == R.i.formatbuttons2 ) {
            R.i.fbatarget = R.i.activetextarea2;
            break;
        }
        e1 = e1.parentNode;
    }
    if ( R.i.fbatarget && ( R.i.fbatarget.nodeType == 1 ) &&
            ( R.i.fbatarget.tagName.toLowerCase() == 'textarea' ) ) {}
    else return false;
    
    var action = FBs.FBAction.INSERT;
    var magic = fBA1.get( 'magic' );
    if ( !( FBs.FBMs.get( magic, null ) instanceof FBs.FBMDefinition ) )
        magic = '';
    else {
        var fbaf = FBs.FBMs.get( magic, 'fBAction' );
        if ( typeof fbaf === 'function' ) {
            var selectedText = getSelectedText( R.i.fbatarget );
            try {
                action = fbaf( actionCode, starter, selectedText );
            } catch ( e ) {
                consolemsg( 'exception in formataction(): ' + e );
                action = FBs.FBAction.OTHER_ERROR;
            }
        } else {
            action = FBs.FBAction.IDLE;
        }
    }
    if ( action != FBs.FBAction.BOX_RAISED ) {
        //if ( action != FBs.FBAction.INSERT )
            fbmboxX();
    }
    if ( action == FBs.FBAction.INSERT ) {
        fbinsert( fBA1.get( 'insert' ), fBA1.get( 'replace' ), {},
                fBA1.get( 'format' ) );
    }
    if ( action != FBs.FBAction.BOX_RAISED ) R.i.fbatarget.focus();
    //consolemsg( FBs.fBAction2str( action ) );
}

function fbinsert( insert, replace, map, setformat ) {
    insertText( R.i.fbatarget, insert, replace, map );
    if ( typeof setformat === 'string' ) {
        if ( /^[rth]$/.test( setformat ) )
            mainFMTControls.setFormat( setformat );
    }
}

function fbmboxX() {
    FBs.FBMs.current.reset();
    var e1 = document.getElementById( 'fbmbox' );
    if ( e1 ) {
        e1.style.top = '';
        classNameUtil( e1, 'hidden', +1 );
    }
    e1 = document.getElementById( 'fbmboxcontent' );
    while ( e1.hasChildNodes() )
        e1.removeChild( e1.firstChild );
    R.i.fbatarget.focus();
}

function fbmboxOK() {
    var fBA1, close = true, ok = false;
    do {
        var fBM1 = FBs.FBMs.current.magic;
        if ( !( fBM1 instanceof FBs.FBMDefinition ) ) break;
        fBA1 = FBs.FBMs.current.action;
        if ( !( fBA1 instanceof FBs.FBADefinition ) ) break;
        close = false;
        FBs.FBMs.current.readForm();
        var f1 = fBM1.get( 'fBMOk' );
        if ( typeof f1 === 'function' ) {
            var ret = f1();
            if ( ret !== true ) break;
        } else {
            break;
        }
        close = true; ok = true;
        fbinsert( fBA1.get( 'insert' ), fBA1.get( 'replace' ),
                FBs.FBMs.current.params, fBA1.get( 'format' ) );
    } while ( false );
    if ( close ) fbmboxX();
    return ok;
}

function fbmboxraise( actionCode, starter, selection ) {
    var fBM1, fBA1, e1, fail = true;
    do {
        if ( typeof actionCode !== 'string' ) break;
        fBA1 = FBs.FBAs.get( actionCode, null );
        if ( !( fBA1 instanceof FBs.FBADefinition ) ) break;
        var magicCode = trim( fBA1.get( 'magic' ) );
        fBM1 = FBs.FBMs.get( magicCode, null );
        if ( !( fBM1 instanceof FBs.FBMDefinition ) ) break;
        e1 = document.getElementById( 'fbmboxcontent' );
        if ( !e1 ) break;
        fail = false;
    } while ( false );
    if ( fail ) { fbmboxX(); return false; }
    if ( FBs.FBMs.current.magic !== fBM1 ) {
        while ( e1.hasChildNodes() )
            e1.removeChild( e1.firstChild );
        try {
            e1.appendChild( fBM1.get( 'fBMContent' ) );
        } catch ( e ) {
            consolemsg( 'exception in fbmboxraise(): ' + e );
            return false;
        }
        e1 = document.getElementById( 'fbmbox' );
        if ( e1 ) {
            e1.style.top = '';
            classNameUtil( e1, 'hidden', +1 );
        }
        FBs.FBMs.current.reset();
        FBs.FBMs.current.magic = fBM1;
        e1 = document.getElementById( 'fbm-OK' );
        if ( typeof fBM1.get( 'fBMOk' ) === 'function' ) {
            classNameUtil( e1, 'hidden', -1 );
        } else {
            classNameUtil( e1, 'hidden', +1 );
        }
        if ( selection.length > 0 ) {
            var argid = fBA1.get( 'setarg' );
            if ( ( typeof argid === 'string' ) && ( argid.length > 0 ) ) {
                FBs.FBMs.current.params.set( argid, selection );
            }
        }
        if ( typeof fBM1.get( 'fBMInit' ) === 'function' ) {
            try {
                var ret = fBM1.get( 'fBMInit' )();
                if ( ret !== true ) {
                    fbmboxX();
                    return false;
                }
            } catch ( e ) {
                fbmboxX();
                return false;
            }
        }
        FBs.FBMs.current.action = fBA1;
    }
    e1 = document.getElementById( 'fbmbox' );
    if ( e1 ) classNameUtil( e1, 'hidden', -1 );
    
    fbmboxreposition( starter );
    
    FBs.FBMs.current.focus( 'first' );
    return true;
}

function fbmboxreposition( newstarter ) {
    var starter;
    if ( newstarter && ( typeof newstarter.nodeType === 'number' ) )
        starter = newstarter;
    else
        starter = FBs.FBMs.current.starter;
    if ( starter && ( typeof starter.nodeType === 'number' ) ) {
        FBs.FBMs.current.starter = starter;
    } else {
        return false;
    }
    var e1 = document.getElementById( 'fbmbox' );
    var y = getY( starter );
    if ( !y ) y = getY( R.i.fbatarget );
    if ( !y ) y = 1000;
    var r1 = Rect.fromElement( e1 );
    var rw = Rect.fromWindow();
    if ( r1 ) {
        r1.move( 0, y - r1.bottom - 5 );
        y = r1.top;
        if ( y < 0 ) y = 0;
        e1.style.top = y + 'px';
        r1 = Rect.fromElement( e1 );
        if ( r1 && rw ) {
            rw.lookat( r1, 0, 2 );
            rw.wscroll();
        }
    }
    r1 = Rect.fromElement( R.i.fbatarget );
    rw = Rect.fromWindow();
    if ( r1 && rw ) {
        rw.lookat( r1, 0, 1 );
        rw.wscroll();
    }
}

//}}}
//-----------------------------------------------------------------------------
//{{{

var navtarget      = null;
var navnextgotimer = null;

function navstartEVENT( event ) {
    navgo();
    return consumeEVENT( event );
}

function navstopEVENT( event ) {
    navsettimer( null );
    return consumeEVENT( event );
}

function navsettargetEVENT( event ) {
    var pr, p1 = /^jumptarget-([A-Za-z][A-Za-z]*)$/;
    if ( pr = p1.exec( this.id ) ) {
        navtarget = pr[ 1 ];
    } else navtarget = null;
    return consumeEVENT( event );
}

function navsetnotargetEVENT( event ) {
    navtarget = null;
    return consumeEVENT( event );
}

function navgo() {
    if ( typeof navtarget === 'string' ) {
        if ( navtarget == 'menu' ) {
            window.scrollTo( 0, 0 );
        } else if ( navtarget == 'new' ) {
            jumptonew();
        } else if ( navtarget == 'enterid' ) {
            toggleidentrybox( 2 );
        } else if ( ( navtarget == 'top' ) || ( navtarget == 'up' )
                || ( navtarget == 'down' ) || ( navtarget == 'bottom' ) ) {
            jumparticles( navtarget );
        }
    }
    navsettimer( R.i.navjumpdelay );
}

function navsettimer( ms ) {
    if ( navnextgotimer ) clearTimeout( navnextgotimer );
    if ( ( typeof ms == "number" ) && ( ms > 0 ) )
        navnextgotimer = setTimeout( navgo, ms );
    else navnextgotimer = null;
}

// 2do: change to R.i.* or turn all to OOP
var identrycheckneeded = false;
var identrylastvalue = '';
var identryperiodicchecktimeout = null;
var identryboxtimeout = null;
var identryboxactive  = false;
var identryjumpdisabled1 = false;
var identryjumpdisabled2 = false;

function identryboxjumptofirstEVENT( event ) {
    identryfocus( 'first' );
}

function identryboxjumptolastEVENT( event ) {
    identryfocus( 'last' );
}

function hideidentrybox() {
    toggleidentrybox( -1 );
    setidentryboxtimeout( null );
}

function identryidfocusEVENT( event ) {
    this.select();
    stopidentryboxtimeout();
}

function identryboxfocusEVENT( event ) {
    stopidentryboxtimeout();
}

function identryboxblurEVENT( event ) {
    identryaction( 'check' );
    startidentryboxtimeout();
}

function identryboxtabEVENT( event ) {
    if ( !event ) event = window.event;
    if ( event.ctrlKey || event.altKey ) return true;
    var code = event.keyCode;
    if ( ( code == 0 ) && ( event.charCode > 0 ) ) code = event.charCode;
    if ( code == 27 ) {
        hideidentrybox();
        return consumeEVENT( event );
    }
    if ( code != 9 ) return true;
    identryaction( 'check' );
    return true;
}

function jumpidentryeditEVENT( event ) {
    if ( !event ) event = window.event;
    if ( ( event.type == 'keypress' ) || ( event.type == 'keydown' ) ) {
        var code = event.keyCode;
        if ( ( code == 0 ) && ( event.charCode > 0 ) ) code = event.charCode;
        if ( code == 13 ) {
            identryaction( 1 );
            toggleidentrybox( 0 );
            return;
        }
    }
    identrycheckneeded = true;
    if ( event.type == 'blur' )
        startidentryboxtimeout();
    else {
        stopidentryboxtimeout();
        if ( event.type == 'focus' ) {
            var e1 = document.getElementById( 'identry-entry' );
            if ( e1 ) e1.select();
        }
    }
}

function identryboxsetdefaults() {
    var e1;
    if ( typeof R.get( 'identry_chaddr_default' ) === 'boolean' ) {
        e1 = document.getElementById( 'identry-chaddr' );
        if ( e1 ) e1.checked = R.get( 'identry_chaddr_default' );
    }
    if ( typeof R.get( 'identry_newtab_default' ) === 'boolean' ) {
        e1 = document.getElementById( 'identry-newtab' );
        if ( e1 ) e1.checked = R.get( 'identry_newtab_default' );
    }
}

function toggleidentrybox( operation ) {
    if ( typeof operation !== 'number' ) operation = 2;
    else {
        operation = Math.floor( operation );
        if ( ( operation == -1 ) || ( operation == +1 ) )
            operation = -operation;
        else if ( operation != 0 )
            operation = 2;
    }
    var e1 = document.getElementById( 'identrybox' );
    var off = true;
    if ( e1 ) {
        off = classNameUtil( e1, 'hidden', operation );
        e1 = document.getElementById( 'identry-entry' );
        if ( ( operation == -1 ) || ( off === false ) ) {
            if ( e1 ) {
                var val = trim( void2str( e1.value ) );
                if ( !val ) {
                    if ( window.location.hash ) {
                        val = window.location.hash;
                    }
                    identryboxsetdefaults();
                }
                e1.value = val;
                identryaction( 'check' );
                e1.focus();
            }
        } else {
            if ( e1 ) e1.blur();
        }
    }
    if ( off === false ) {
        startidentryboxtimeout();
        identryperiodiccheckstartstop( identryboxactive = true );
    } else {
        stopidentryboxtimeout();
        identryperiodiccheckstartstop( identryboxactive = false );
    }
}

function startidentryboxtimeout() {
    setidentryboxtimeout( 4000 );
}

function stopidentryboxtimeout() {
    setidentryboxtimeout( null );
}

function setidentryboxtimeout( ms ) {
    if ( identryboxtimeout ) clearTimeout( identryboxtimeout );
    if ( ( typeof ms == "number" ) && ( ms > 0 ) )
        identryboxtimeout = setTimeout( hideidentrybox, ms );
    else identryboxtimeout = null;
}

function identrycheck1() {
    var e1 = document.getElementById( 'identry-entry' );
    if ( !e1 || ( e1.nodeType != 1 ) ) { return; }
    var usable = false, eid = trim( e1.value );
    var articleNr = -42;
    do {
        if ( !/\d/.test( eid ) ) {
            if ( eid == '#' ) { usable = true; break; }
            if ( findfragmenttarget( eid, true, true ) ) usable = true;
            break;
        }
        var pr, p1 = /^#article-(\d\d*)$/;
        if ( pr = p1.exec( eid ) ) {
            articleNr = Number( pr[ 1 ] );
            usable = true;
            break;
        }
        if ( /^\d\d*$/.test( eid ) ) {
            articleNr = Number( eid );
            eid = '#article-' + eid;
            usable = true;
            break;
        }
        var pr, p1 = /(#article-\d.*)*(#article-(\d\d*))/;
        if ( pr = p1.exec( eid ) ) {
            articleNr = Number( pr[ 3 ] );
            eid = pr[ 2 ];
            usable = true;
            break;
        }
        p1 = /^[^-=]*([-=]\D[^-=]*)*[-=](\d\d*)[^-=]*([-=]\D[^-=]*)*$/;
        if ( pr = p1.exec( eid ) ) {
            articleNr = Number( pr[ 2 ] );
            eid = '#article-' + pr[ 2 ];
            usable = true;
            break;
        }
        
        if ( findfragmenttarget( eid, true, true ) ) usable = true;
        
    } while ( false );
    e1 = document.getElementById( 'identry-id' );
    if ( !usable ) {
        if ( e1 ) e1.value = '';
        return null;
    } else {
        if ( e1 ) e1.value = eid;
    }
    if ( articleNr == -42 ) return eid;
    if ( ( articleNr >= 1070082 ) && ( articleNr <= 99999999999 ) ) return eid;
    return null;
}

function identryjumpdisable( disable1, disable2 ) {
    var e1;
    if ( typeof disable1 === 'boolean' ) {
        e1 = document.getElementById( 'identry-jump' );
        if ( e1 ) { e1.disabled = disable1; }
        e1 = document.getElementById( 'identry-chaddr' );
        if ( e1 ) { e1.disabled = disable1; }
        identryjumpdisabled1 = disable1;
    }
    if ( typeof disable2 === 'boolean' ) {
        e1 = document.getElementById( 'identry-find' );
        if ( e1 ) { e1.disabled = disable2; }
        e1 = document.getElementById( 'identry-find2' );
        if ( e1 ) { e1.disabled = disable2; }
        e1 = document.getElementById( 'identry-newtab' );
        if ( e1 ) { e1.disabled = disable2; }
        identryjumpdisabled2 = disable2;
    }
}

function identryfocus( which ) {
    if ( typeof which !== 'string' ) { return; }
    var id, e1;
    if ( which === 'first' ) {
        id = 'identry-entry';
    } else if ( which === 'last' ) {
        var id;
        if ( !identryjumpdisabled2 ) { id = 'identry-newtab'; }
        else if ( !identryjumpdisabled1 ) { id = 'identry-chaddr'; }
        else { id = 'identry-id'; }
    } else { return; }
    e1 = document.getElementById( id );
    if ( e1 && ( typeof e1.focus === 'function' ) ) { e1.focus(); }
}

function identryaction( action ) {
    identrycheckneeded = false;
    if ( typeof action === 'string' ) {
        if ( /^\d$/.test( action ) ) { action = Number( action ); }
        else if ( action === 'jump'  ) { action = 1; }
        else if ( action === 'find'  ) { action = 2; }
        else if ( action === 'find2' ) { action = 3; }
        else { action = 0; }
    }
    if ( typeof action !== 'number' ) action = 0;
    else {
        action = Math.floor( action );
        if ( ( action < 1 ) && ( action > 3 ) )
            action = 0;
    }
    var eid = identrycheck1();
    if ( !eid ) {
        identryjumpdisable( true, true );
        return null;
    }
    var al, e1, e2;
    e1 = findfragmenttarget( eid, false, false );
    //e1 = findfragmenttarget( eid, true, true );
    // including named a tags and page top
    if ( e1 ) {
        al = 1;
        identryjumpdisable( false, false );
    }
    else {
        al = checkarticlelife( AIDUtils.getArticleNumber( eid, false ) );
        if ( al !== 2 ) al = 0;
        identryjumpdisable( ( al !== 2 ), false );
    }
    if ( action == 1 ) {
        if ( e1 ) {
            e2 = document.getElementById( 'identry-chaddr' );
            hiliteArticleNode( e1 );
            if ( e2 && e2.checked )
                window.location.hash = eid;
            else
                jumptoelement( e1 );
        } else if ( al === 2 ) {
            if ( hilitedeletedarticle( eid ) )
                jumptodeletedarticle();
        }
    } else if ( ( action === 2 ) || ( action === 3 ) ) {
        var href = forgecontexthref( eid );
        if ( typeof href === 'string' ) {
            if ( action === 3 ) {
                href = href.replace( /\?contextId=/, '?rootId=' );
            }
            e2 = document.getElementById( 'identry-newtab' );
            if ( e2 && e2.checked ) {
                if ( typeof GM_openInTab === 'function' )
                    /*jslint newcap: false */
                    GM_openInTab( href );
                    /*jslint newcap: true */
                else {
                    window.open( href, '_blank' );
                }
            } else {
                window.location.href = href;
            }
            hideidentrybox();
        }
        else identryjumpdisable( null, true );
    }
}

function jumptoenteredidEVENT() {
    identryaction( 'jump' );
    toggleidentrybox( 0 );
}
function findenteredidEVENT() { identryaction( 'find' ); }
function findenteredid2EVENT() { identryaction( 'find2' ); }

function identryperiodiccheck() {
    if ( identryboxactive !== true ) {
        identryperiodiccheckstartstop( false );
        return;
    }
    if ( identrycheckneeded !== true ) {
        if ( identrycheckchange() )
            identryfocus( 'first' );
    }
    if ( is_true( identrycheckneeded ) ) {
        identryaction( 0 );
    }
}

function identrycheckchange() {
    var changed = false;
    var e1 = document.getElementById( 'identry-entry' );
    if ( typeof identrylastvalue !== 'string' ) {
        identrylastvalue = '';
        changed = true;
    }
    if ( !e1 || ( e1.nodeType != 1 ) ) {
        identryjumpdisable( true, true );
    } else {
        if ( typeof e1.value !== 'string' ) {
            e1.value = '';
        }
        if ( e1.value != identrylastvalue ) {
            changed = true;
            identrylastvalue = e1.value;
        }
    }
    if ( changed ) identrycheckneeded = true;
    else if ( typeof identrycheckneeded !== 'boolean' )
        identrycheckneeded = true;
    return changed;
}

function identryperiodiccheckstartstop( start ) {
    if ( identryperiodicchecktimeout )
        clearInterval( identryperiodicchecktimeout );
    if ( is_true( start ) )
        identryperiodicchecktimeout =
                setInterval( identryperiodiccheck, 200 );
    else
        identryperiodicchecktimeout = null;
}

//}}}
//-----------------------------------------------------------------------------
//{{{

function getXY( element ) {
    if ( !element ) return null;
    var pos = { x: 0, y: 0 };
    if ( element.offsetParent ) {
        for ( ; element.offsetParent; element = element.offsetParent ) {
            pos[ 'x' ] += element.offsetLeft;
            pos[ 'y' ] += element.offsetTop;
        }
        return pos;
    }
    else if ( ( typeof element.x === 'number' ) &&
            ( typeof element.y === 'number' ) )
    {
        pos[ 'x' ] = element.x;
        pos[ 'y' ] = element.y;
        return pos;
    }
    if ( element == document.body ) return pos;
    return null;
}

function getpageXY() {
    if ( ( typeof window.pageXOffset === 'number' ) &&
            ( typeof window.pageYOffset === 'number' ) )
        return { x: window.pageXOffset, y: window.pageYOffset };
    else if ( ( typeof document.body.scrollTop === 'number' ) &&
            ( typeof document.body.scrollTop === 'number' ) )
        return { x: document.body.scrollLeft, y: document.body.scrollTop };
    else return null;
}

//}}}
//-----------------------------------------------------------------------------
//{{{

function Rect() {
    this.init();
}

Rect.prototype.init = function init() {
    this.left  = this.top    = this.width = this.height = 0;
    this.right = this.bottom = 0;
};

Rect.prototype.setLT = function setLT( l, t ) {
    if ( typeof l === 'number' ) {
        var l = Math.floor( l );
        this.width = this.right - ( this.left = l );
    }
    if ( typeof t === 'number' ) {
        var t = Math.floor( t );
        this.height = this.bottom - ( this.top = t );
    }
    return this;
};

Rect.prototype.setRB = function setRB( r, b ) {
    if ( typeof r === 'number' ) {
        var r = Math.floor( r );
        this.width = ( this.right = r ) - this.left;
    }
    if ( typeof b === 'number' ) {
        var b = Math.floor( b );
        this.height = ( this.bottom = b ) - this.top;
    }
    return this;
};

Rect.prototype.setLTRB = function setLTRB( l, t, r, b ) {
    if ( ( typeof l === 'number' ) && ( typeof r === 'number' ) ) {
        var l = Math.floor( l ), r = Math.floor( r );
        this.width = ( this.right = r ) - ( this.left = l );
    }
    if ( ( typeof t === 'number' ) && ( typeof b === 'number' ) ) {
        var t = Math.floor( t ), b = Math.floor( b );
        this.height = ( this.bottom = b ) - ( this.top = t );
    }
    return this;
};

Rect.prototype.setLTWH = function setLTWH( l, t, w, h ) {
    if ( ( typeof l === 'number' ) && ( typeof w === 'number' ) ) {
        var l = Math.floor( l ), w = Math.floor( w );
        this.right = ( this.left = l ) + ( this.width = w );
    }
    if ( ( typeof t === 'number' ) && ( typeof h === 'number' ) ) {
        var t = Math.floor( t ), h = Math.floor( h );
        this.bottom = ( this.top = t ) + ( this.height = h );
    }
    return this;
};

Rect.prototype.fromElement = function fromElement( element ) {
    if ( !element || ( typeof element !== 'object' ) ) return null;
    var lefttop = getXY( element );
    if ( !lefttop ) { return null; }
    if ( ( typeof element.offsetWidth !== 'number' ) ||
            ( typeof element.offsetHeight !== 'number' ) )
        return null;
    this.left = lefttop[ 'x' ]; this.top = lefttop[ 'y' ];
    this.right = this.left + ( this.width = element.offsetWidth );
    this.bottom = this.top + ( this.height = element.offsetHeight );
    return this;
};

Rect.prototype.fromWindow = function fromWindow() {
    var lefttop = getpageXY();
    if ( !lefttop ) { return null; }
    if ( ( typeof window.innerWidth !== 'number' ) ||
            ( typeof window.innerHeight !== 'number' ) )
        return null;
    var w = window.innerWidth, h = window.innerHeight;
    if ( typeof document.documentElement === 'object' )
    {
        var w2 = document.documentElement.clientWidth;
        var h2 = document.documentElement.clientHeight;
        if ( ( typeof w2 === 'number' ) && ( w2 > 0 ) && ( w2 < w ) )
            w = w2;
        if ( ( typeof h2 === 'number' ) && ( h2 > 0 ) && ( h2 < h ) )
            h = h2;
    }
    this.left = lefttop[ 'x' ]; this.top = lefttop[ 'y' ];
    this.right = this.left + ( this.width = w );
    this.bottom = this.top + ( this.height = h );
    return this;
};

Rect.prototype.move = function move( x, y ) {
    if ( typeof x === 'number' ) {
        var x = Math.floor( x );
        this.left += x; this.right += x;
    }
    if ( typeof y === 'number' ) {
        var y = Math.floor( y );
        this.top += y; this.bottom += y;
    }
    return this;
};

Rect.prototype.movetoLT = function movetoLT( x, y ) {
    if ( typeof x === 'number' ) {
        var x = Math.floor( x );
        this.left = x; this.right = this.left + this.width;
    }
    if ( typeof y === 'number' ) {
        var y = Math.floor( y );
        this.top = y; this.bottom = this.top + this.height;
    }
    return this;
};

Rect.prototype.expand = function expand( x, y ) {
    if ( typeof x === 'number' ) {
        var x = Math.floor( x );
        this.width = ( this.right += x ) - ( this.left -= x );
    }
    if ( typeof y === 'number' ) {
        var y = Math.floor( y );
        this.height = ( this.bottom += y ) - ( this.top -= y );
    }
    return this;
};

Rect.prototype.lookat = function lookat( target, ax, ay ) {
    if ( !target ) return this;
    var dx, dy;
    if ( ( typeof ax === 'number' ) && ( ( ax == 1 ) || ( ax == 2 ) ) ) {
        if ( ax == 2 ) {
            dx = target.left - this.left;
            if ( dx < 0 ) this.move( dx, 0 );
        }
        dx = target.right - this.right;
        if ( dx > 0 ) this.move( dx, 0 );
        if ( ax == 1 ) {
            dx = target.left - this.left;
            if ( dx < 0 ) this.move( dx, 0 );
        }
    }
    if ( ( typeof ay === 'number' ) && ( ( ay == 1 ) || ( ay == 2 ) ) ) {
        if ( ay == 2 ) {
            dy = target.top - this.top;
            if ( dy < 0 ) this.move( 0, dy );
        }
        dy = target.bottom - this.bottom;
        if ( dy > 0 ) this.move( 0, dy );
        if ( ay == 1 ) {
            dy = target.top - this.top;
            if ( dy < 0 ) this.move( 0, dy );
        }
    }
    return this;
};

Rect.prototype.merge = function merge( rect2 ) {
    if ( !( rect2 instanceof Rect ) ) return this;
    if ( rect2.left   < this.left   ) this.left   = rect2.left;
    if ( rect2.top    < this.top    ) this.top    = rect2.top;
    if ( rect2.right  > this.right  ) this.right  = rect2.right;
    if ( rect2.bottom > this.bottom ) this.bottom = rect2.bottom;
    this.width  = this.right  - this.left;
    this.height = this.bottom - this.top;
    return this;
};

Rect.prototype.dup = function dup() {
    var dup = new Rect();
    dup.left  = this.left;  dup.top    = this.top;
    dup.width = this.width; dup.height = this.height;
    dup.right = this.right; dup.bottom = this.bottom;
    return dup;
};

Rect.prototype.wscroll = function wscroll() {
    var x = this.left, y = this.top;
    if ( ( typeof x !== 'number' ) || ( typeof y !== 'number' ) )
        return false;
    if ( x < 0 ) { x = 0; }
    if ( y < 0 ) { y = 0; }
    window.scrollTo( x, y );
    return true;
};

Rect.prototype.toString = function toString() {
    var ret = 'R: ' + this.left;
    if ( this.width != 0 ) ret += '..' + this.right;
    ret += ', ' + this.top;
    if ( this.height != 0 ) ret += '..' + this.bottom;
    ret += ' [ ' + this.width + ' x ' + this.height + ' ]';
    return ret;
};

Rect.fromElement = function fromElement( element ) {
    return new Rect().fromElement( element );
};

Rect.fromWindow = function fromWindow() {
    return new Rect().fromWindow();
};

//}}}
//-----------------------------------------------------------------------------
//{{{

function minimizearticleEVENT( event ) {
    if ( !event ) event = window.event;
    var pa = getparenarticle( this );
    if ( pa ) minimizearticle( pa );
    return consumeEVENT( event );
}

function restorearticleEVENT( event ) {
    if ( !event ) event = window.event;
    var pa = getparenarticle( this );
    if ( pa ) restorearticle( pa );
    return consumeEVENT( event );
}

function fixseparator( separator, articleBefore, articleAfter ) {
    if ( !separator || ( separator.nodeType != 1 ) ||
            ( separator.tagName.toLowerCase() != 'br' ) ||
            ( classNameUtil( separator, 'separator', 0 ) !== true ) )
        return;
    var e1;
    if ( !articleBefore ) {
        e1 = separator.previousSibling;
        for ( ; e1; e1 = e1.previousSibling ) {
            if ( e1.nodeType != 1 ) continue;
            if ( classNameUtil( e1, 'deleted-article', 0 ) === true ) continue;
            else {
                articleBefore = e1;
                break;
            }
        }
    }
    if ( !articleAfter ) {
        e1 = separator.nextSibling;
        for ( ; e1; e1 = e1.nextSibling ) {
            if ( e1.nodeType != 1 ) continue;
            if ( classNameUtil( e1, 'deleted-article', 0 ) === true ) continue;
            else {
                articleAfter = e1;
                break;
            }
        }
    }
    if ( !articleBefore || ( articleBefore.nodeType != 1 ) ||
            ( classNameUtil( articleBefore, 'article', 0 ) !== true ) ||
            ( classNameUtil( articleBefore, 'minimized', 0 ) !== true ) ||
            !articleAfter || ( articleAfter.nodeType != 1 ) ||
            ( classNameUtil( articleAfter, 'article', 0 ) !== true ) ||
            ( classNameUtil( articleAfter, 'minimized', 0 ) !== true ) )
        classNameUtil( separator, 'minimized', -1 );
    else
        classNameUtil( separator, 'minimized', +1 );
}

function minimizearticle( articleNode ) {
    if ( !articleNode || ( articleNode.nodeType !== 1 ) ) { return; }
    classNameUtil( articleNode, 'minimized', +1 );
    var res = null;
    var ea1 = getChildrenByTagANDClassName( articleNode, 'div', '*' );
    for ( var i = 0; i < ea1.length; i++ ) {
        if ( classNameUtil( ea1[ i ], 'restore', 0 ) === true ) {
            res = ea1[ i ];
        } else {
            //ea1[ i ].style.display = 'none';
        }
    }
    if ( res ) {
    } else {
        res = document.createElement( 'div' );
        res.className = 'restore';
        e1 = document.createElement( 'a' );
        e1.addEventListener( 'click', restorearticleEVENT, false );
        //e1.href = 'javascript:void(0)';
        res.appendChild( e1 );
        e1.appendChild( document.createElement( 'span' ) );
        e1 = e1.firstChild;
        e1.className = 'minimized-author';
        var author = new AAuthor( articleNode );
        e1.appendChild( document.createTextNode( author.getNick() ) );
        if ( author.anonymous !== false )
                classNameUtil( e1, 'anon', +1 );
        
        articleNode.appendChild( res );
    }
    //res.style.display = 'block';
    
    var e1 = articleNode.previousSibling;
    for ( ; e1; e1 = e1.previousSibling ) {
        if ( e1.nodeType != 1 ) continue;
        if ( classNameUtil( e1, 'deleted-article', 0 ) === true ) continue;
        else {
            fixseparator( e1, null, articleNode );
            break;
        }
    }
    e1 = articleNode.nextSibling;
    for ( ; e1; e1 = e1.nextSibling ) {
        if ( e1.nodeType != 1 ) continue;
        if ( classNameUtil( e1, 'deleted-article', 0 ) === true ) continue;
        else {
            fixseparator( e1, articleNode, null );
            break;
        }
    }
}

function restorearticle( articleNode ) {
    if ( !articleNode || ( articleNode.nodeType !== 1 ) ) { return; }
    classNameUtil( articleNode, 'minimized', -1 );
    var res = null;
    var ea1 = getChildrenByTagANDClassName( articleNode, 'div', '*' );
    for ( var i = 0; i < ea1.length; i++ ) {
        if ( classNameUtil( ea1[ i ], 'restore', 0 ) === true ) {
            res = ea1[ i ];
        } else {
            //ea1[ i ].style.display = '';
        }
    }
    //res.style.display = 'none';
    
    var e1 = articleNode.previousSibling;
    for ( ; e1; e1 = e1.previousSibling ) {
        if ( e1.nodeType != 1 ) continue;
        else {
            restoreseparator( e1 );
            break;
        }
    }
    e1 = articleNode.nextSibling;
    for ( ; e1; e1 = e1.nextSibling ) {
        if ( e1.nodeType != 1 ) continue;
        else {
            restoreseparator( e1 );
            break;
        }
    }
}

function restoreseparator( separator ) {
    if ( !separator || ( separator.nodeType != 1 ) ||
            ( separator.tagName.toLowerCase() != 'br' ) ||
            ( classNameUtil( separator, 'separator', 0 ) !== true ) )
        return;
    classNameUtil( separator, 'minimized', -1 );
}
//}}}
//-----------------------------------------------------------------------------
//{{{

function cancelnextrun() {
    if ( R.i.cancelnextruntimer ) clearTimeout( R.i.cancelnextruntimer );
    R.i.cancelnextruntimer = null;
    R.i.nextruncancelled = true;
}

function gorthaursokounscript_go() {
    if ( document.body == null )
        return;                 // protection from premature execution ;)
    R.i.documentheadelement = null;
    if ( !gethead() ) { return; }
    if ( R.i.nextruncancelled == true ) { return; }
    {
        var cancelnextrunafter = R.get( 'cancelnextrunafter' );
        if ( ( typeof cancelnextrunafter !== 'number' ) ||
                ( cancelnextrunafter > 99000 ) )
            cancelnextrunafter = 10000;
        if ( cancelnextrunafter < 1 ) R.i.nextruncancelled = true;
        else R.i.cancelnextruntimer = setTimeout( cancelnextrun, cancelnextrunafter );
    }
    
    if ( R.i.goruncounter++ > 0 ) {
        if ( typeof R.i.autojumpto === 'string' ) {
            if ( /^#article-\d\d*$/.test( window.location.hash ) )
                R.i.autojumpto = window.location.hash;
            jumptoid( R.i.autojumpto );
        }
        R.i.nextruncancelled = true;
        return;
    }
    
    var e1, e2, e3, ea1, ea2, ea3, id, ainfo, i, j, p1, p2, pr;
    var menulayout, rwmode = false;
    var hrefgenerator = htmlcopier = replycontrol = false;
    var autojumpphase, errs = [], fatal = false;
    
    {
        i = 0;
        var flashing_colors = R.get( 'flashing_colors' );
        if ( ( typeof flashing_colors === 'object' )
                && ( flashing_colors instanceof Array ) )
            for ( ; i < 4; i++ )
                if ( !checkColor( flashing_colors[ i ], true ) )
                    break;
        if ( i != 4 )
            flashing_colors = [ 'lightgray', 'gray', '#33ccff', '#ffccdd' ];
        R.i.globalstyle[ 'flashing' ] = [
                '.flashed { color: ' + flashing_colors[ 0 ]
                + '; background-color: ' + flashing_colors[ 1 ] + '; }',
                '.flashed.flashed2 { color: ' + flashing_colors[ 2 ]
                + '; background-color: ' + flashing_colors[ 3 ] + '; }' ];
        
        R.i.globalstyle[ 'deletedarticle' ].push(
                '.deleted-article .hr { border-color: red; }',
                '.deleted-article .hr.flashed2 { border-color: black; }',
                null );
        
        addStyleOoAoS( R.i.globalstyle );
        
        e1 = document.createElement( 'div' );
        e1.className = 'deleted-article';
        e1.appendChild( createElement( 'br', null, 'hidden' ) );
        e1.appendChild( createElement( 'div', null, 'hr' ) );
        e1.appendChild( document.createElement( 'br' ) );
        e1.addEventListener( 'click', hidedeletedarticle, false );
        R.i.deletedarticlemarker = e1;
    }
    
    if ( /^[^?&%=#]*okoun\.cz\/old\/(markWelcomeMsg|markArticles|markFavouriteBoards|postArticle)\.do/.test(
            window.location.href ) ) {
        R.i.pagelayout = 'n';
    } else if ( /[?&]rootId=\d\d*/.test( window.location.href ) ) {
        R.i.pagelayout = 'r';
    } else if ( /[?&]contextId=\d\d*/.test( window.location.href ) ) {
        R.i.pagelayout = 'c';
    } else if ( /[?&]searched(Users|Strings)=[^?&=#]/.test(
            window.location.href ) ) {
        R.i.pagelayout = 's';
    } else {
        R.i.pagelayout = 'n';
    }
    
    R.i.autojumpto = null;
    if ( R.get( 'autojumpto_locationhash' ) &&
            ( /^#article-\d\d*$/.test( window.location.hash ) ) ) {
        autojumpphase = 1;  // given in url fragment part
        R.i.autojumpto = window.location.hash;
    } else if ( R.get( 'autojumpto_oldestnewpost' ) ) {
        autojumpphase = 2;  // jump to oldest new post
    } else {
        autojumpphase = 0;
    }
    
    addJStodocument( classNameUtil.toString() );
    addJStodocument( consumeEVENT.toString() );
    if ( typeof R.get( 'ctrlenterhandling' ) !== 'number' )
        R.set( 'ctrlenterhandling', 0 );
    PATCHED.patch();
    
    if ( ( R.get( 'keyboardjumping' ) === true ) &&
            ( typeof R.i.postjump_mode === 'number' ) &&
            ( R.i.postjump_mode >= 1 ) && ( R.i.postjump_mode <= 4 ) )
    {
        R.i.keycaptureon = true;
        document.body.addEventListener( 'blur', startkeycaptureEVENT, true );
        document.body.addEventListener( 'focus', releasekeycaptureEVENT, true );
        document.body.addEventListener( 'keydown', releasekeycaptureEVENT, true );
        window.addEventListener( 'keypress', keyboardjumpEVENT, false );
    }
    
    R.i.mainform = document.getElementById( 'article-form-main' );
    if ( R.i.mainform ) {
        ea1 = getChildrenByTagANDClassName( R.i.mainform, 'textarea', '*' );
        if ( ea1.length == 1 )
            R.i.mainformtextarea = ea1[ 0 ];
    }
    
    if ( !R.i.mainform || !R.i.mainformtextarea ) {
        R.i.mainformtextarea = R.i.mainform = false;
        if ( R.i.pagelayout == 'c' ) menulayout = R.get( 'menulayout_r__context' );
        else if ( R.i.pagelayout == 'r' ) menulayout = R.get( 'menulayout_r__root' );
        else if ( R.i.pagelayout == 's' ) menulayout = R.get( 'menulayout_r__search' );
        else menulayout = R.get( 'menulayout_r__normal' );
    } else {
        rwmode = true;
        R.i.mainformtextarea.addEventListener( 'keypress', shiftenterEVENT, false );
        if ( R.i.pagelayout == 'c' ) menulayout = R.get( 'menulayout_rw_context' );
        else if ( R.i.pagelayout == 'r' ) menulayout = R.get( 'menulayout_rw_root' );
        else if ( R.i.pagelayout == 's' ) menulayout = R.get( 'menulayout_rw_search' );
        else menulayout = R.get( 'menulayout_rw_normal' );
    }
    if ( typeof menulayout !== 'string' ) {
        menulayout = '';
    } else {
        menulayout = menulayout.replace( /[ \t\r]*\n ?/g, '%b' );
        menulayout = menulayout.replace( / +/g, ' ' );
        menulayout = menulayout.replace( /&nbsp;/g, '\u00A0' );
    }
    
    if ( ( menulayout.indexOf( '%w' ) >= 0 ) ||
            ( menulayout.indexOf( '%p' ) >= 0 ) )
        hrefgenerator = true;
    if ( menulayout.indexOf( '%h' ) >= 0 ) htmlcopier = true;
    if ( rwmode ) replycontrol = true;
    
    p1 = /okoun\.cz\/old\/postArticle\.do/;
    do {
        R.i.posteditempreview = false;
        if ( !R.i.mainform ) break;
        if ( !p1.test( window.location.href ) ) break;
        ea1 = getChildrenByTagANDClassName(
                R.i.mainform.parentNode, 'div', 'posted-item-preview' );
        if ( ea1.length != 1 ) break;
        R.i.posteditempreview = ea1[ 0 ];
    } while ( false );
    do {
        if ( !R.i.mainform || R.i.posteditempreview ) break;
        if ( p1.test( window.location.href ) ) {
            if ( R.i.mainformtextarea && (
                    ( typeof R.i.mainformtextarea.value !== 'string' ) ||
                    ( /^\s*$/.test( R.i.mainformtextarea.value ) ) ) )
            {}          // textarea empty or contains only whitespace
            else break; // textarea has printable content
        }
        mainFMTControls.setDefaults(
                R.get( 'defaultbodyType' ), R.get( 'defaultpreviewFlag' ) );
    } while ( false );
    
    do {
        R.i.gotoNewLink = null;
        e1 = document.createElement( 'a' );
        e1.href = 'javascript:void(0);';
        e1.appendChild( document.createTextNode( '/NEW' ) );
        do {
            e4 = document.getElementById( 'logout-form' );
            if ( e4 ) {
                e4 = e4.parentNode;
                e2 = document.createElement( 'div' );
                e2.style.marginTop = '0.3em';
                e2.appendChild( e1 );
                e4.appendChild( e2 );
                break;
            }
            e4 = document.getElementById( 'header' );
            if ( !e4 ) { break; }
            e2 = createElement( 'div', null, '_F_R' );
            e2.style.margin = '1px 2em';
            e2.appendChild( e1 );
            e4.insertBefore( e2, e4.firstChild );
        } while ( false );
        if ( !e1.parentNode ) { break; }
        R.i.gotoNewLink = e1;
        e1.addEventListener( 'focus', getNewAddress, false );
        e1.addEventListener( 'mouseover', getNewAddress, false );
        e1.addEventListener( 'mousedown', getNewAddress, false );
        e1.addEventListener( 'click', goToNew, false );
    } while ( false );
    
    if ( !R.i.image_addalttext && !R.i.image_addtitle && !R.i.image_encloseinAtag )
        R.i.image_processing = false;
    if ( hrefgenerator )
    {
        style = {
            linkcopybox: [ 'div#linkcopybox { width: 450px; height: 1.9em; }' ],
            linkcopyinput: [ 'input#linkcopyinput {'
                + ' padding: 1px; margin: 1px; border-width: 2px;'
                + ' width: 440px; max-width: 100%; }' ]
        };
        addStyleOoAoS( style );
        e1 = createElement( 'div', 'linkcopybox', 'toolbox toolboxA hidden' );
        document.body.appendChild( e1 );
        e2 = createElement( 'input', 'linkcopyinput', null, { 'type': 'text' } );
        e2.addEventListener( 'click', hilightlinkcopyinput, false );
        e2.addEventListener( 'blur', hidelinkcopybox, false );
        e1.appendChild( e2 );
    }
    if ( htmlcopier )
    {
        style = {
            htmlcopybox: [ 'div#htmlcopybox { top: -200px; z-index: 99;'
                + ' width: 250px; max-width: 50%;'
                + ' height: 150px; min-height: 50px; }' ],
            htmlcopyarea: [ 'textarea#htmlcopyarea {'
                + ' padding: 1px; margin: 1px; border-width: 2px;'
                + ' width: 240px; max-width: 100%; font-size: 80%;'
                + ' height: 140px; max-height: 100%; overflow: hidden; }' ]
        };
        addStyleOoAoS( style );
        e1 = createElement( 'div', 'htmlcopybox', 'toolbox toolboxA hidden' );
        document.body.appendChild( e1 );
        e2 = createElement( 'textarea', 'htmlcopyarea' );
        e2.addEventListener( 'click', hilighthtmlcopyarea, false );
        e2.addEventListener( 'blur', hidehtmlcopybox, false );
        e1.appendChild( e2 );
    }
    do {
        if ( !replycontrol ) break;
        if ( !R.i.mainform ) { errs.push( '#article-form-main not found' );
            replycontrol = false;
            break;
        }
        style = {
            replycontrolbox: [ '#replycontrolbox { right: 3.5em;'
                + ' color: black; text-align: center; width: 27em;'
                + ' height: 1.4em;'
                //+ ' height: auto;'
                + ' max-height: 30%; }',
                'div#replycontrolbox.left.shown,'
                + ' div#replycontrolbox.left { left: 10em; right: auto; }',
                '#replycontrolbox input { margin-left: 0.4em; }',
                '#replycontrolbox label { padding: 0 0.2em; }',
                '._P_0_3EM { padding: 0.3em; }',
                null ],
            buttons: [
                '.rcf-button { width: 2.0em; padding: 0; margin: 0 0.1em; }',
                '.DLX-button { width: 2.5em; padding: 0; margin: 0 0.1em; }',
                null ],
            replyparent: [
                '#replyparentbox { text-align: center; }',
                '#replyparentauthor { font-weight: bold; }',
                '#replyparentauthor.anon {'
                + ' font-weight: normal; font-style: italic; }',
                ' #replyparentnone.hidden, #replyparentgiven.hidden,'
                + ' #replyparentauthor.hidden { display: none; }',
                null ]
        };
        addStyleOoAoS( style );
        e1 = createElement( 'div', 'replyparentbox', '_MAX_W_100P' );
        e1.innerHTML = ''
                + '<div class="_F_R" >'
                + '<div id="replyparentnone" class="hidden" >'
                + 'Nov\u00E9 vl\u00E1kno</div>'
                + '<div id="replyparentgiven" class="hidden" >'
                + '<div id="replyparentauthor" class="hidden" >?</div>'
                + '<div><span></span><a id="replyparentlink" >?</a><span></span></div>'
                + '<div><input type="button"'
                + ' id="replyparentX" value="X" /></div>'
                + '</div>'
                + '</div>';
        R.i.mainform.insertBefore( e1, R.i.mainform.firstChild );
        e1 = document.getElementById( 'replyparentX' );
        if ( e1 ) e1.addEventListener( 'dblclick', replyparentX, false );
        
        e1 = createElement( 'div', 'replycontrolbox', 'toolbox toolboxA hidden' );
        e1.innerHTML = ''
                + '<form name="articleForm-2" id="article-form-m2"'
                + ' action="" method="get" onsubmit="return false;" >'
                + '<div class="_F_L" >'
                + '<input type="button" id="replycontrolboxRe" class="rcf-button" value=":" />'
                + '<span class="_P_0_3EM" ></span></div>'
                + '<div class="_F_R" >'
                + '<input type="button" id="replycontrolboxX" class="rcf-button" value="X" />'
                + '</div>'
                + '<div class="_F_R" ><span class="_P_0_3EM" ></span>'
                + '<input type="button" id="replycontrolboxPC" class="rcf-button" value="!" />'
                + '</div>'
                + '<div class="_CENTER" ><span class="_D_IB" ><span class="_D_I" >'
                + '<input name="bodyType" value="radeox" id="format-radeox-2" type="radio" />'
                + '<label for="format-radeox-2" >Radeox</label>'
                + '</span></span><span class="_D_IB" ><span class="_D_I" >'
                + '<input name="bodyType" value="radeox" id="format-text-2" type="radio" />'
                + '<label for="format-text-2" >Text</label>'
                + '</span></span><span class="_D_IB" ><span class="_D_I" >'
                + '<input name="bodyType" value="radeox" id="format-html-2" type="radio" />'
                + '<label for="format-html-2" >Html</label>'
                + '</span></span><span class="_D_IB" ><span class="_D_I" >'
                + '<input name="previewFlag" value="on" id="preview-flag-2" type="checkbox" />'
                + '<label for="preview-flag-2" >N\u00E1hled</label>'
                + '</span></span></div>'
                + '</form>';
        document.body.appendChild( e1 );
        ea1 = e1.firstChild.getElementsByTagName( 'input' );
        for ( i = 0; i < ea1.length; i++ ) {
            if ( ( ea1[ i ].type == 'radio' ) || ( ea1[ i ].type == 'checkbox' ) )
            {
                ea1[ i ].addEventListener( 'change', updatereplycontrolupEVENT, false );
            }
            else if ( ea1[ i ].type == 'button' ) {
                if ( ea1[ i ].id == 'replycontrolboxRe' ) {
                    ea1[ i ].addEventListener( 'click', replycontrolboxRe, false );
                } else if ( ea1[ i ].id == 'replycontrolboxX' ) {
                    ea1[ i ].addEventListener( 'click', replycontrolboxXEVENT, false );
                } else if ( ea1[ i ].id == 'replycontrolboxPC' ) {
                    ea1[ i ].addEventListener( 'dblclick',
                            replyparentfromcurrentarticleEVENT, false );
                }
            }
        }
        mainFMTControls.setShadowNodeIds( {
                r: 'format-radeox-2', t: 'format-text-2',
                h: 'format-html-2', p: 'preview-flag-2' } ); 
        for ( i in mainFMTControls.fmtNodeIds ) {
            e1 = mainFMTControls.getNode( i );
            if ( !e1 ) continue;
            e1.addEventListener( 'change', updatereplycontroldownEVENT, false );
        }
    } while ( false );
    do {
        if ( !R.get( 'makeformatbuttons' ) || !rwmode ) break;
        if ( !R.i.mainformtextarea ) break;
        e1 = document.createElement( 'div' );
        e1.className = 'formatbuttons';
        e2 = e1.cloneNode( false );
        var formatbuttons = R.get( 'formatbuttons' );
        for ( i = 0; i < formatbuttons.length; i++ ) {
            if ( !( formatbuttons[ i ] instanceof Array ) ||
                    !formatbuttons[ i ].length ||
                    ( formatbuttons[ i ].length < 4 ) )
                continue;
            for ( j = 0; j < 4; j++ )
                if ( typeof formatbuttons[ i ][ j ] !== 'string' )
                    break;
            if ( j < 4 ) continue;
            var actionCode = trim( formatbuttons[ i ][ 0 ] );
            for ( ; j < 7; j++ )
                if ( typeof formatbuttons[ i ][ j ] !== 'string' )
                    formatbuttons[ i ][ j ] = '';
            var magic = trim( formatbuttons[ i ][ 5 ] );
            var fBA1 = new FBs.FBADefinition();
            fBA1.set( 'insert',  formatbuttons[ i ][ 2 ] );
            fBA1.set( 'replace', formatbuttons[ i ][ 3 ] );
            fBA1.set( 'format',  formatbuttons[ i ][ 4 ] );
            fBA1.set( 'magic',   magic );
            fBA1.set( 'setarg',  formatbuttons[ i ][ 6 ] );
            FBs.FBAs.register( actionCode, fBA1 );
            if ( magic.length > 0 ) {
                if ( FBs.FBMs.defined[ magic ] instanceof FBs.FBMDefinition )
                    FBs.FBMs.register( magic, FBs.FBMs.defined[ magic ] );
                else
                    errs.push( '"' + magic + '" magic undefined' );
            }
            e3 = createElement( 'button', null, 'fmt-button',
                    { 'type': 'button', 'actionCode': actionCode } );
            e3.appendChild( document.createElement( 'div' ) );
            var e4 = e3.lastChild;
            switch ( actionCode ) {
                case 'bold':      classNameUtil( e4, '_B', +1 ); break;
                case 'italic':    classNameUtil( e4, '_I', +1 ); break;
                case 'underline': classNameUtil( e4, '_U', +1 ); break;
                case 'strike':    classNameUtil( e4, '_S', +1 ); break;
                case 'font':      classNameUtil( e4, '_F', +1 ); break;
            }
            e4.appendChild( document.createTextNode(
                    formatbuttons[ i ][ 1 ] ) );
            e3.addEventListener( 'click', formatbuttonEVENT, false );
            e1.appendChild( e3 );
            e3.tabIndex = -1;
            e3 = e3.cloneNode( true );
            e3.addEventListener( 'click', formatbuttonEVENT, false );
            e2.appendChild( e3 );
        }
        FBs.FBMs.defined = {};
        formatbuttons = undeff();
        if ( !e1.hasChildNodes() ) {
            R.i.formatbuttons2 = R.i.formatbuttons1 = false;
            break;
        }
        R.i.mainformtextarea.parentNode.insertBefore( e1, R.i.mainformtextarea );
        R.i.formatbuttons1 = e1;
        R.i.formatbuttons2 = e2;
        style = {
            buttons: [
                'div.formatbuttons { max-width: 100%; }',
                '.fmt-button { padding: 0 0.1em; margin: 0 0.1em;'
                + ' text-align: center; min-width: 1.0em; }',
                '.fmt-button:hover { border-style: inset; cursor: pointer; }',
                '.fmt-button div { text-align: center; min-width: 1.0em; }',
                '.fmt-button div._B { font-weight: bold; }',
                '.fmt-button div._I { font-style: italic; }',
                '.fmt-button div._U { text-decoration: underline; }',
                '.fmt-button div._S { text-decoration: line-through; }',
                '.fmt-button div._F { color: blue; }',
                null ],
            fbmbox: [
                '#fbmbox { z-index: 101; '
                + ' left: 10em; top: +5em; right: auto; '
                + ' width: auto; min-width: 150px; max-width: 70%;'
                + ' }',
                '#fbmbox, #fmbox.toolbox { max-height: none; }',
                '#fbmbox > div { background-color: inherit; }',
                '#fbmboxcontent td label { display: block;'
                + ' text-align: center; padding: 0 0.2em; }',
                '.fbm-button { min-width: 3em; text-align: center;'
                + ' padding: 0 0.2em; margin: 0.5em 1em; }',
                '.fbm-button.hidden { display: none; }',
                '.fbm-button div { text-align: center; min-width: 3em; }',
                null ],
            htmlent: [
                '#htmlents { line-height: 170%;'
                + ' margin-left: auto; margin-right: auto;'
                + ' min-width: 15em; text-align: center; }',
                '#htmlents .htmlent {'
                + ' min-width: 2em; text-align: center;'
                + ' background-color: lightgray; color: black;'
                + ' padding: 1px; border: 1px solid black; margin: 1px 3px;'
                + ' }',
                '#htmlents .entcode { padding: 1px; }',
                '#htmlents .entlabel, #htmlents .entsimple {'
                + ' padding: 1px 0.5em; }',
                '#htmlents2switcher { float: left;'
                + ' height: 5px; overflow: visible; }',
                '#htmlents2switcher button {'
                + ' margin: 0.3em 1em; padding: 0 0.5em; }',
                '#htmlents2.hidden { display: none; }',
                null ]
        };
        addStyleOoAoS( style );
        e1 = createElement( 'div', 'fbmbox', 'toolbox toolboxA hidden' );
        e1.innerHTML = ''
                + '<div class="dummyinput" ><input type="button"'
                + ' id="dummyinput-fbmbox-first" value="" /></div>'
                + '<div id="fbmboxcontent" ></div><div class="_T_A_C" >'
                + '<button type="button" class="fbm-button"'
                + ' id="fbm-OK" class="fbm-button" ><div>OK</div></button>'
                + '<button type="button" class="fbm-button"'
                + ' id="fbm-X" /><div>X</div></button></div>'
                + '<div class="dummyinput" ><input type="button"'
                + ' id="dummyinput-fbmbox-last" value="" /></div>';
        R.i.mainform.parentNode.insertBefore( e1, R.i.mainform );
        e2 = document.getElementById( 'fbm-X' );
        if ( e2 ) e2.addEventListener( 'click', fbmboxX, false );
        e2 = document.getElementById( 'fbm-OK' );
        if ( e2 ) e2.addEventListener( 'click', fbmboxOK, false );
        e1.addEventListener( 'keypress', fbmkeypressEVENT, false );
        e2 = document.getElementById( 'dummyinput-fbmbox-first' );
        if ( e2 ) e2.addEventListener( 'focus', function() {
                FBs.FBMs.current.focus( 'last' ); }, false );
        e2 = document.getElementById( 'dummyinput-fbmbox-last' );
        if ( e2 ) e2.addEventListener( 'focus', function(){
                FBs.FBMs.current.focus( 'first' ); }, false );
    } while ( false );
    do {
        if ( ( typeof R.i.navjumpdelay !== 'number' ) || ( R.i.navjumpdelay < 0 ) ||
                ( typeof R.i.postjump_mode !== 'number' ) ||
                !( ( R.i.postjump_mode >= 1 ) && ( R.i.postjump_mode <= 4 ) ) )
            break;
        const jumptargetids = [ 'jumptarget-menu', 'jumptarget-top',
                'jumptarget-up', 'jumptarget-down', 'jumptarget-bottom',
                'jumptarget-new', 'jumptarget-enterid' ];
        var tmporder = [], navbar_order = R.get( 'navbar_order' );
        for ( i = 1; i <= 7; i++ )
            for ( j = 0; j < navbar_order.length; j++ )
                if ( navbar_order[ j ] === i )
                    tmporder.push( j );
        for ( i = 0; i < 7; i++ ) { navbar_order[ i ] = 0; }
        for ( i = 0; i < tmporder.length; i++ ) {
            navbar_order[ tmporder[ i ] ] = ( i + 1 );
        }
        if ( tmporder.length < 1 ) break;
        style = {
            navigationbox: [
                '#navigationbox { text-align: center; z-index: 101;'
                + ' position: fixed; right: 0; top: 1.5em;'
                + ' width: 1.8em; min-width: 10px; max-width: 30px;'
                + ' border-right: none; padding: 0; }',
                '#navigationbox ul { list-style-type: none;'
                + ' margin: 0; padding: 0; }',
                '#navigationbox a { display: block; color: black;'
                + ' padding-right: 2px; }',
                '#navigationbox a:hover { cursor: pointer; border: 0; }',
                null ],
            identrybox: [
                '#identrybox { z-index: 101;'
                + ' position: fixed; right: 2.2em; top: 7em;'
                + ' width: auto; min-width: 50px; max-width: 50%;'
                + ' height: auto; min-height: 2.3em; max-height: 50%; }',
                '#identrybox input, #identrybox button { margin: 2px; }',
                '#identrybox input#identry-id {'
                + ' background-color: lightgray; color: black;'
                + ' margin-bottom: 0.5em; }',
                null ]
        };
        addStyleOoAoS( style );
        e1 = createElement( 'div', 'navigationbox', 'toolbox' );
        e2 = document.createElement( 'ul' );
        e2.addEventListener( 'mouseout', navsetnotargetEVENT, false );
        e2.addEventListener( 'mouseup',  navstopEVENT, false );
        e1.appendChild( e2 );
        document.body.appendChild( e1 );
        e1 = e2;
        var navbar_labels = R.get( 'navbar_labels' );
        for ( i = 0; i < tmporder.length; i++ ) {
            j = tmporder[ i ];
            e2 = document.createElement( 'li' );
            e3 = document.createElement( 'a' );
            e3.id = jumptargetids[ j ];
            e3.appendChild( document.createTextNode(
                    ( typeof navbar_labels[ j ] === 'string' )
                    ? navbar_labels[ j ] : '?' ) );
            e3.addEventListener( 'mousedown', navstartEVENT, false );
            e3.addEventListener( 'mouseover', navsettargetEVENT, false );
            e3.addEventListener( 'mouseup', navstopEVENT, false );
            e2.appendChild( e3 );
            e1.appendChild( e2 );
        }
        
        e1 = createElement( 'div', 'identrybox', 'toolbox hidden' );
        e1.innerHTML = ''
                + '<div class="dummyinput" ><input type="button"'
                + ' id="dummyinput-identry-first" value="" /></div>'
                + '<input type="text" id="identry-id" readonly="readonly" />'
                + '<br>'
                + '<input type="text" id="identry-entry" /><br>'
                + '<div class="" ><div class="_F_L" >'
                + '<button type="button" id="identry-jump" >uk\u00E1zat</button>'
                + '</div><div class="_T_A_R" >' 
                + '<label for="identry-chaddr" title="'
                + 'nastavit i jako adresu str\u00E1nky a p\u0159idat do historie'
                + '" >adresu</label>'
                + '<input type="checkbox" id="identry-chaddr" />'
                + '</div></div><div class="_C_L" ><div class="_F_L" >'
                + '<button type="button" id="identry-find" >vyhledat</button>'
                + '<button type="button" id="identry-find2" >?r</button>'
                + '</div><div class="_T_A_R" >'
                + '<label for="identry-newtab" title="'
                + 'otev\u0159\u00EDt v nov\u00E9m okn\u011B / z\u00E1lo\u017Ece'
                + '" >jinam</label>'
                + '<input type="checkbox" id="identry-newtab" />'
                + '</div></div>'
                + '<div class="dummyinput" ><input type="button"'
                + ' id="dummyinput-identry-last" value="" /></div>';
        document.body.appendChild( e1 );
        identryboxsetdefaults();
        e1.addEventListener( 'keypress', identryboxtabEVENT, false );
        e1.addEventListener( 'keydown', identryboxtabEVENT, false );
        
        var f1 = function f1( e1 ) {
                    e1.addEventListener( 'focus', identryboxfocusEVENT, false );
                    e1.addEventListener( 'blur', identryboxblurEVENT, false );
                }
        if ( e1 = document.getElementById( 'identry-entry' ) ) {
            var eventlist = [ 'change', 'focus', 'keypress', 'click' ];
            for ( i = 0; i < eventlist.length; i++ )
                e1.addEventListener( eventlist[ i ],
                        jumpidentryeditEVENT, false );
            e1.addEventListener( 'blur', identryboxblurEVENT, false );
        }
        if ( e1 = document.getElementById( 'identry-id' ) ) {
            e1.addEventListener( 'focus', identryidfocusEVENT, false );
            e1.addEventListener( 'blur', identryboxblurEVENT, false );
        }
        if ( e1 = document.getElementById( 'identry-jump' ) ) {
            f1( e1 );
            e1.addEventListener( 'click', jumptoenteredidEVENT, false );
        }
        if ( e1 = document.getElementById( 'identry-chaddr' ) ) f1( e1 );
        if ( e1 = document.getElementById( 'identry-find' ) ) {
            f1( e1 );
            e1.addEventListener( 'click', findenteredidEVENT, false );
        }
        if ( e1 = document.getElementById( 'identry-find2' ) ) {
            if ( is_false( R.get( 'secret_option_b_1' ) ) ) {
                f1( e1 );
                e1.addEventListener( 'click', findenteredid2EVENT, false );
            } else {
                e1.parentNode.removeChild( e1 );
            }
        }
        if ( e1 = document.getElementById( 'identry-newtab' ) ) f1( e1 );
        if ( e2 = document.getElementById( 'dummyinput-identry-first' ) )
            e2.addEventListener( 'focus', identryboxjumptolastEVENT, false );
        if ( e2 = document.getElementById( 'dummyinput-identry-last' ) )
            e2.addEventListener( 'focus', identryboxjumptofirstEVENT, false );
        
    } while ( false );
    do {
        e1 = document.getElementById( 'board-articles' );
        if ( !e1 ) { fatal =
                '#board-articles not found' +
                        '\n(page not loaded properly perhaps)';
                break; }
        ea1 = getChildrenByTagANDClassName( e1, 'form', '*' );
        if ( ea1.length != 1 ) { fatal =
                'not precisely 1 form element in #board-articles' +
                        '\n(likely explanation: you got your butt banned)';
                break; }
        e1 = ea1[ 0 ];
        ea1 = getChildrenByTagANDClassName( e1, 'div', 'article' );
        AIDs.init();
        p1 = /^article-(\d\d*)$/;
        p2 = /([?&])rootId=(\d\d*)/;
        for ( i = 0; i < ea1.length; i++ ) {
            e1 = ea1[ i ];
            if ( ( typeof e1.id !== 'string' ) || !p1.test( e1.id ) ) continue;
            if ( typeof e1.id !== 'string' ) {
                    errs.push( 'bad id type ' + typeof e1.id );
                    continue; }
            if ( !( pr = p1.exec( e1.id ) ) ) {
                    errs.push( 'id \'' + e1.id + '\' test fail' );
                    continue; }
            id = Number( pr[ 1 ] );
            if ( ( i == 0 ) && ( R.i.pagelayout == 'r' ) ) {
                ainfo = new AInfo( e1 );
                if ( ( ainfo.fatal === null ) && ( ainfo.rid ) &&
                        ( /^\d\d*$/.test( ainfo.rid ) ) ) {
                    var rootId = Number( ainfo.rid );
                    if ( rootId < id )
                        AIDs.add( rootId, true );
                }
            }
            AIDs.add( id, false );
            if ( /(^|\s)posted-item-new(\s|$)/.test( e1.className ) ) {
                if ( ( typeof R.i.oldestnewid !== 'number' ) ||
                        !( R.i.oldestnewid >= 1 ) )
                    R.i.oldestnewid = id;
                else
                    R.i.oldestnewid = Math.min( R.i.oldestnewid, id );
            }
        }
        
        if ( ( typeof R.i.oldestnewid === 'number' ) && ( R.i.oldestnewid >= 1 ) )
            R.i.oldestnewid = '#article-' + R.i.oldestnewid;
        else {
            e3 = document.getElementById( 'jumptarget-new' );
            if ( e3 ) e3.parentNode.removeChild( e3 );
        }
        replyparentboxupdate();
        
        for ( i = 0; i < ea1.length; i++ ) {
            
            ainfo = new AInfo( ea1[ i ] );
            if ( ainfo.fatal !== null ) {
                consolemsg( 'fatal error in AInfo(): ' + ainfo.fatal );
                //errs.push( ainfo.fatal );
                continue;
            }
            if ( ainfo.errs.length ) {
                consolemsg( 'non-fatal errors in AInfo():\n[ '
                    + ainfo.errs.join(' ]\n[ ') + ' ]'  );
            }
            
            do {
                if ( !( R.i.ignorelist instanceof Array ) ||
                        ( typeof getboardname() !== 'string' ) ) break;
                if ( !(ainfo.aa instanceof AAuthor ) ) break;
                if ( ainfo.aa.failed() ) break;
                for ( j = 0; j < R.i.ignorelist.length; j++ ) {
                    var igno = R.i.ignorelist[ j ];
                    if ( typeof igno === 'undefined' ) continue;
                    if ( !( igno instanceof Ignorowacz ) || !igno.isValid() ) {
                        R.i.ignorelist[ j ] = undeff();
                        continue;
                    }
                    if ( igno.testBoard( R.i.boardname ) !== true ) {
                        R.i.ignorelist[ j ] = undeff();
                        continue;
                    }
                    if ( igno.testAuthor( ainfo.aa, false, false ) == true )
                        minimizearticle( ainfo.adiv );
                }
            } while ( false );
            
            do {
                if ( !ainfo.pa ) break;
                var life = checkarticlelife( ainfo.pid, true );
                if ( typeof life !== 'number' ) break;
                e2 = ainfo.pdiv;
                e3 = ainfo.pa;
                var before, after;
                if ( !R.i.okounpost_linkmarkers instanceof Array )
                    R.i.okounpost_linkmarkers = [];
                if ( life === 1 ) {
                    e3.addEventListener( 'mouseover', flashparentarticleEVENT, false );
                    e3.addEventListener( 'mouseout', flashrepeatstopEVENT, false );
                    before = R.i.okounpost_linkmarkers[ 0 ];
                    after  = R.i.okounpost_linkmarkers[ 1 ];
                    var offset = AIDs.getOffset( ainfo.aid, ainfo.pid );
                    if ( typeof offset === 'number' ) { offset = '' + offset; }
                    else { offset = '?'; }
                    var map = { o: offset };
                    before = sprintflite( before, map );
                    after  = sprintflite( after,  map );
                } else if ( life !== 2 ) {
                    before = R.i.okounpost_linkmarkers[ 2 ];
                    after  = R.i.okounpost_linkmarkers[ 3 ];
                } else {
                    e3.setAttribute( 'isDeadLink', 'true' );
                    before = R.i.okounpost_linkmarkers[ 4 ];
                    after  = R.i.okounpost_linkmarkers[ 5 ];
                }
                e3.setAttribute( 'onclick', '' );
                e3.setAttribute( 'onclick', null );
                e3.removeAttribute( 'onclick' );
                e3.addEventListener( 'click', hilitelinkedarticleEVENT, false );
                if ( ( typeof before === 'string' ) && ( before != '' ) ) {
                    e2.insertBefore( document.createTextNode( before ), e3 );
                }
                if ( ( typeof after === 'string' ) && ( after  != '' ) ) {
                    e2.insertBefore( document.createTextNode( after ),
                            e3.nextSibling );
                }
            } while ( false );
            
            do {
                if ( R.i.image_processing !== true ) break;
                ea2 = getChildrenByTagANDClassName( ainfo.adiv, 'div', 'body' );
                if ( ea2.length != 1 ) {
                    errs.push( 'not precisely 1 div.body element' );
                    break; }
                e2 = ea2[ 0 ];
                ea3 = e2.getElementsByTagName( 'img' );
                for ( j = 0; j < ea3.length; j++ )
                {
                    var map = {};
                    map[ 's' ] = ea3[ j ].src;
                    map[ 'a' ] = ea3[ j ].alt;
                    map[ 't' ] = ea3[ j ].title;
                    map[ 'f' ] = ea3[ j ].src.replace( /^(.*[\\/])?([^\\/]*)$/, '$2' );
                    if ( R.i.image_addalttext &&
                            R.i.badaltpattern.test( ea3[ j ].alt ) )
                    {
                        ea3[ j ].alt = sprintflite( R.i.imagealtreplacement, map );
                    }
                    if ( R.i.image_addtitle &&
                            R.i.badtitlepattern.test( ea3[ j ].title ) )
                    {
                        ea3[ j ].title = sprintflite( R.i.imagetitlereplacement, map );
                    }
                    if ( R.i.image_encloseinAtag &&
                            ( getAncestorByTagANDClassName(
                            ea3[ j ], 'a', '*' ) == null ) )
                    {
                        e3 = document.createElement( 'a' );
                        ea3[ j ].parentNode.insertBefore( e3, ea3[ j ] );
                        e3.appendChild( ea3[ j ] );
                    }
                }
            } while ( false );
            
            if ( !ainfo.aid ) {
                    errs.push( 'article id retrieval error' );
                    continue; }
            if ( !ainfo.menuul ) {
                    errs.push( 'ul.article-menu retrieval error' );
                    continue; }
            if ( !ainfo.ra ) {
                    errs.push( 'root-link a retrieval error' );
                    continue; }
            if ( !p2.test( ainfo.rhref ) ) {
                    errs.push( 'root href \'' + ainfo.rhref + '\' test fail' );
                    continue; }
            e2 = ainfo.menuul;
            
            if ( replycontrol ) {
                e3 = findRARFlink( ainfo.menuul );
                if ( e3 ) {
                    e3.addEventListener( 'click', replyFormDLXEVENT, false );
                }
            }
            
            if ( ( typeof menulayout !== 'string' ) || ( menulayout == '' ) )
                continue;
            
            if ( ainfo.rdiv ) ainfo.rdiv.parentNode.removeChild( ainfo.rdiv );
            if ( ainfo.cdiv ) ainfo.cdiv.parentNode.removeChild( ainfo.cdiv );
            
            var menudiv = document.createElement( 'div' );
            var segment = '';
            var hideoldreplylink = false;
            for ( j = 0; j < menulayout.length; j++ ) {
                var c = menulayout.charAt( j );
                if ( segment == '%' ) {
                    segment += c;
                } else {
                    var out = '';
                    if ( c == '%' ) {
                        out = segment;
                        segment = '';
                    }
                    segment += c;
                    if ( j == ( menulayout.length - 1 ) ) {
                        out += segment;
                        segment = '';
                    }
                    if ( out.length > 0 )
                        menudiv.appendChild( document.createTextNode( out ) );
                    continue;
                }
                if ( segment == '%%' ) {
                    menudiv.appendChild( document.createTextNode( '%' ) );
                } else if ( segment == '%b' ) {
                    menudiv.appendChild( document.createElement( 'br' ) );
                } else if ( segment == '%v' ) {
                    e2 = document.createElement( 'a' );
                    e2.href = ainfo.rhref;
                    e2.appendChild( document.createTextNode( R.i.okounpost_label_vlakno ) );
                    menudiv.appendChild( e2 );
                } else if ( segment == '%w' ) {
                    e2 = document.createElement( 'a' );
                    var href = removeSIDfromhref( ainfo.rhref );
                    if ( href ) {
                        e2.setAttribute( 'linkcopyaddress', href );
                        e2.addEventListener( 'click', showlinkcopyboxEVENT, false );
                        e2.appendChild( document.createTextNode( R.i.okounpost_label_vlakno2 ) );
                        menudiv.appendChild( e2 );
                    }
                    else
                        errs.push( 'failed to process root href' );
                } else if ( ( segment == '%o' ) || ( segment == '%p' ) ) {
                    var chref = ainfo.chref;
                    if ( !chref ) chref = forgecontexthref( ainfo.aid );
                    if ( chref ) {
                        e2 = document.createElement( 'a' );
                        if ( segment == '%o' ) {
                            e2.href = chref;
                            e2.appendChild( document.createTextNode( R.i.okounpost_label_okolni ) );
                            menudiv.appendChild( e2 );
                        } else {
                            chref = removeSIDfromhref( chref );
                            if ( chref ) {
                                e2.setAttribute( 'linkcopyaddress', chref );
                                e2.addEventListener( 'click', showlinkcopyboxEVENT, false );
                                e2.appendChild( document.createTextNode( R.i.okounpost_label_okolni2 ) );
                                menudiv.appendChild( e2 );
                            }
                            else
                                errs.push( 'failed to process context href' );
                        }
                    }
                    else
                        errs.push( 'failed to create context href' );
                } else if ( segment == '%r' ) {
                    e2 = document.createElement( 'a' );
                    e2.addEventListener( 'click', showreplycontrolboxEVENT, false );
                    e2.appendChild( document.createTextNode( R.i.okounpost_label_replycontrol ) );
                    menudiv.appendChild( e2 );
                    hideoldreplylink = true;
                } else if ( segment == '%h' ) {
                    e2 = document.createElement( 'a' );
                    e2.addEventListener( 'click', showhtmlcopyboxEVENT, false );
                    e2.appendChild( document.createTextNode( R.i.okounpost_label_htmlcopier ) );
                    menudiv.appendChild( e2 );
                } else if ( segment == '%X' ) {
                    e2 = document.createElement( 'a' );
                    e2.addEventListener( 'click', minimizearticleEVENT, false );
                    e2.appendChild( document.createTextNode( '[X]' ) );
                    menudiv.appendChild( e2 );
                } else {
                    menudiv.appendChild( document.createElement( 'i' ) );
                    menudiv.lastChild.appendChild( document.createTextNode( segment ) );
                }
                segment = '';
            }
            
            if ( ( R.i.okounpost_keepoldreplylink == -1 ) || ( hideoldreplylink
                    && ( R.i.okounpost_keepoldreplylink != +1 ) ) )
            {
                e3 = findRARFlink( ainfo.menuul );
                if ( e3 ) {
                    if ( ( e3.parentNode.nodeType == 1 ) &&
                            ( e3.parentNode.tagName.toLowerCase() == 'li' ) );
                        e3 = e3.parentNode;
                    e3.style.display = 'none';
                }
            }
            ainfo.menuul.appendChild( menudiv );
        }
    } while ( false );
    if ( ( AIDs.countLive() > 1 ) &&
            /^#article-\d\d*$/.test( window.location.hash ) )
    {
        e1 = findfragmenttarget( window.location.hash, false, false );
        if ( e1 ) hiliteArticleNode( e1, 0 );
    }
    if ( autojumpphase == 1 ) {
        jumptoid( R.i.autojumpto );
    } else if ( autojumpphase == 2 ) {
        if ( fatal ) R.i.autojumpto = null;
        else if ( typeof R.i.oldestnewid === 'string' ) {
            R.i.autojumpto = R.i.oldestnewid;
            jumptoid( R.i.autojumpto );
        }
    }
    if ( fatal ) {
        e1 = document.getElementById( 'navigationbox' );
        if ( e1 ) e1.parentNode.removeChild( e1 );
    }
    if ( fatal ) {
        consolemsg( 'Fatal error in gorthaursokounscript_go(): ' + fatal );
    }
    if ( errs.length > 0 ) {
        consolemsg( 'non-fatal errors in gorthaursokounscript_go():\n[ '
            + errs.join(' ]\n[ ') + ' ]'  );
    }
}

//}}}
//-----------------------------------------------------------------------------
gorthaursokounscript_init();