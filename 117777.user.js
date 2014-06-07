// <script type="text/javascript" >

// ==UserScript==
// @name        Pony Smile Pack
// @description Смайлопак для Табуна; by Shifty (паки: Frostghost, Ashby)
// @match       http://tabun.everypony.ru/*
// @include     http://tabun.everypony.ru/*
// @version     0.3.2.5
// @author      Shify
// ==/UserScript==

/* * * TODO:
 * 1) Sub-packs
 * * pack may have "parent" option
 * * during processing, pack gets his "children"
 * * for leaf packs (no children), all the emoticons generated as usual
 * * for node packs, instead of emoticons pack would contain subpack buttons
 * * toolbar buttons only generated for root packs
 * * for sub-packs, sub-toolbar is generated instead of emoticons
 * * all the emoticons from sub-packs are pushed into "other" section
 */

/* The script entirely assumes that Object constructor is not overloaded.
 * If you happen to have an overloaded Object constructor in JS on your site,
 * just obtain burglar mask, figure out overloader code author and his location,
 * then break in his house, hack his arms off and shove them up his ass.
 */

/* dynamic packs data model
this.tabunemoticons.addPack ( {
    //mandatory pack ID; can't be 000all000 or 000other000; preferably unique
    name: %packID% ,
    //optional icon for toolbar
    icon: %imageURL% ,
    //optional pack parent pack (this pack is sub-pack of)
    parent: %packID% ,
    //optional pack description; must contain < EN: %pack_name% >
    locale: {
        //optional locale pair
        <...> : <...> ,
        //mandatory locale name; optional pack name
        %LOCALE%: %pack_name%
    },
    //optional emoticons array (it would be stupid if it's not present though)
    emots: {
        //optional emoticon definition array
        //mandatory emoticon unique ID (within a pack)
        %emoticonID%: {
            //optional description pair
            <...> : <...>
            //optional emoticon icon URL
            img: %imageURL%
            //optional textual representation
            txt: %textual%

        } ,
    }
} ); */
// auto-setup snippet
//(function(p){var f=function(a){if(typeof this.tabunemoticons!="undefined")this.tabunemoticons.addPack(a)else window.setTimeout(t,100);}f(p);})(%packdata%);
/* * * * * * * * * * * * * * * * * * */
/* * * CODE TO BE INJECTED BEGIN * * */
/* * * * * * * * * * * * * * * * * * */
function injectedscript ( ) {

// creates an object and transfers all yet existed data to it so it's not lost
this.newDataSafeObject = function ( classname, existedobject, overwrite )
{
    if ( overwrite == undefined ) //by default all data is overwritten, discarding object preset
        overwrite = true;
    var obj = new classname;
    if ( typeof existedobject == "undefined" )
        return obj;
    if ( overwrite == 0 || overwrite == false )
        for ( unit in existedobject )
            if ( obj[unit] != undefined )
                delete existedobject[unit];
    if ( existedobject.length != 0 )
        for ( unit in existedobject )
            obj[unit] = existedobject[unit];
    return obj;
}

// creates new DOM element and assign it's attributes
this.createDOMElement = function ( element, attributes )
{
    element = document.createElement ( element );
    for ( key in attributes )
        element.setAttribute ( key, attributes[key] );
    return element;
}

this.TabunEmoticons = function ( ) // object class, only contains functions and variables
{
    /* * * * * * * * VARIABLES * * * * * * * */
    // javascript "this" keyword fix crutch; we need it really bad and it's just ridiculous
    // at this point "this" points to current object, but any calls after constructor returned would break "this" value
    var self = this;

    // settings object
    this.settings = {
        toolbar_size:       "20px",
        emoticon_size:      "50px",
        current_locale:     "RU"
    };

    this.DOMcache = {
        toolbar: undefined,
        empacks: undefined
    };

    // emoticon pack list
    this.emPacks = new Object ( );

    // just for the sake of continious updater function
    this.updateInterval = undefined;

    // mouse tracking crutch; temporary stuff
    this.mouseCursor = { x: 0, y: 0 };
    this.updateMouseCursor = function ( e )
    {
        self.mouseCursor.x = e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
        self.mouseCursor.y = e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    }

    /* * * * * * HELPER  FUNCTIONS * * * * * */
    // sort emPacks-styled hash (hash of hashes)
    this.AuxSortHashHash = function ( hash, key, misc )
    {
        var sorted = new Object ( );
        var medium = new Object ( );
        var bottom = new Array ( );
        var select = function ( item, type )
        {
            switch ( type )
            {
                case undefined:
                case "key":
                    return item;
                case "len":
                case "length":
                    return item.length
                case "sum":
                case "checksum":
                    return ( function ( )
                        {
                        var sum = 0;
                        for (subitem in item)
                            sum += item[subitem].length;
                        return sum;
                        }
                    ) ( );
            }
        }

        for ( item in hash )
            medium[hash[item][key]] = hash[item];
        // various sorting methods: by key name, by content length, by content checksum
        for ( item in medium )
            bottom.push ( select ( hash[item], misc ) );
        bottom.sort ( );
        for ( var i = 0; i < bottom.length; i++ )
            sorted[bottom[i]] = medium[bottom[i]];
        return sorted;
    }

    // detect problems with packs
    this.AuxDetectPackProblem = function ( pack )
    {
        if ( self.emPacks[pack] == undefined )
            return undefined; // no such pack exists; should be never returned
        var mode = { loc: self.settings['current_locale'], img: false, txt: false };
        if ( self.emPacks[pack]['icon'] == undefined || self.emPacks[pack]['icon'] == "" )
            mode['img'] = true; // no icon present
        if ( self.emPacks[pack]['locale'][mode['loc']] == undefined || self.emPacks[pack]['locale'][mode['loc']] == "" )
        {
            if ( self.emPacks[pack]['locale']['EN'] == undefined || self.emPacks[pack]['locale']['EN'] == "" )
                mode['txt'] = true; // no text  present
            else
                mode['loc'] = "EN"; // only "EN" locale text present
        }
        return mode;
    }

    // appends DOM unit to DOMhash
    this.AuxAppendDOMHash = function ( hash, unit )
    {
        if ( hash == undefined )
            hash = unit;
        else if ( hash.getAttribute ( "class" ) == "DOMHASH" )
            hash.appendChild ( unit );
        else
        {
            var tmp = hash;
            hash = createDOMElement ( "div", { class: "DOMHASH" } );
            hash.appendChild ( tmp );
            hash.appendChild ( unit );
        }
        return hash;
    }

    // retreives DOM units from DOMhash
    this.AuxReturnDOMHash = function ( hash )
    {
        if ( hash.getAttribute ( "class" ) != "DOMHASH" )
            return hash;
        var obj = new Object ( );
        for ( var i = 0; i < hash.childNodes.length; i++ )
            obj[i] = hash.childNodes[i];
        return obj;
    }

    // automatically detects problems and creates toolbar button
    this.AuxCreateButton = function ( pack )
    {
        var mode = self.AuxDetectPackProblem ( pack );
        if ( mode == undefined ) { return undefined; }
        if ( mode['img'] == true && mode['txt'] == true ) { return null; }
        if ( mode['txt'] == true ) {
            var i, a;
            i = createDOMElement ( "img", {
                src: self.emPacks[pack]['icon'],
                style: "height: "+self.settings['toolbar_size']
                } );
            a = createDOMElement ( "a", {
                href: "#",
                onclick: "return tabunemoticons.openPack ( 'tabunemoticonspack_"+pack+"' );"
                } );
            a.appendChild ( i );
            return a;
        }
        if ( mode['img'] == true ) {
            var b = createDOMElement ( "input", {
                type: "button",
                value: self.emPacks[pack]['locale'][mode['loc']],
                onclick: "return tabunemoticons.openPack ( 'tabunemoticonspack_"+pack+"' );"
                } );
            return b;
        }
        var i, a;
        i = createDOMElement ( "img", {
            src: self.emPacks[pack]['icon'],
            title: self.emPacks[pack]['locale'][mode['loc']],
            style: "height: "+self.settings['toolbar_size'],
            } );
        a = createDOMElement ( "a", {
            href: "#",
            onclick: "return tabunemoticons.openPack ( 'tabunemoticonspack_"+pack+"' );"
            } );
        a.appendChild ( i );
        return a;
    }

    /* * * * * * GENERAL FUNCTIONS * * * * * */

    // adds a data to the pack
    this.addPack = function ( pack )
    {
        var name = pack['name'];
        // that should handle name collisions
        while ( self.emPacks[name] != undefined )
            name = pack['name'] + Math.random ( ).toString ( ).slice ( 2 );
        delete pack['name'];
        self.emPacks[name] = pack;
    }

    this.finalizePacks = function ( )
    {
        for ( pack in self.emPacks )
        {
            var i = 0;
            for ( spack in self.emPacks )
            {
                if ( self.emPacks[spack].parent == pack )
                    self.emPacks[pack].children[i++] = spack;
            }
        }
    }

    // generate smilepack toolbar buttons
    //this.generateToolbar = function ( node )
    this.generateToolbar = function ( )
    {
        var cont = new Object ( );
        var other = false;
        for ( p in self.emPacks )
        {
            //if ( p.parent != node )
            //    continue;
            var tmp = self.AuxCreateButton ( p );
            //alert ( tmp );
            if ( tmp == null )
            {
                other = true;
                continue;
            }
            if ( tmp != undefined )
                cont[p] = tmp;
        }
        var toolbar = undefined;
        var tmp = createDOMElement ( "div", {
            class: "tabunemoticonspack_toolbar_left",
            style: "float: left; margin-left: 10px; margin-right: 10px;"
            } );
        tmp.appendChild ( cont['000all000'] );
        delete cont['000all000'];
        if ( other == true )
            tmp.appendChild ( cont['000other000'] );
        delete cont['000other000'];
        toolbar = self.AuxAppendDOMHash ( toolbar, tmp );
        tmp = createDOMElement ( "div", {
            class: "tabunemoticonspack_toolbar_middle",
            style: "float: left; margin-right: 10px;"
            } );
        for ( t in cont )
            tmp.appendChild ( cont[t] );
        toolbar = self.AuxAppendDOMHash ( toolbar, tmp );
        tmp = createDOMElement ( "div", {
            class: "tabunemoticonspack_toolbar_right",
            style: "float: left;"
            } );
        toolbar = self.AuxAppendDOMHash ( toolbar, tmp );
        return toolbar;
    }

    // generate smilepack selection dialogs
    this.generateEmPacks = function ( )
    {
        var dompack = createDOMElement ( "div", { } );
        var cont = new Object ( );
        var other = false;
        for ( pack in self.emPacks )
        {
            if ( self.emPacks[pack]['images'] == { } || pack == '000all000' || pack == '000other000' ) { continue; }
            var d, i, a;
            d = createDOMElement ( "div", {
                class: "tabunemoticons_container",
                style: "background: #fff;"
                } );
            for ( img in self.emPacks[pack]['images'] )
            {
                a = createDOMElement ( "a", {
                    href: "#",
                    onclick: "return tabunemoticons.addEmoticon ( '"+self.emPacks[pack]['images'][img]['img']+"' );"
                    } );
                i = createDOMElement ( "img", {
                    src: self.emPacks[pack]['images'][img]['img']
                    } );
                a.appendChild ( i );
                d.appendChild ( a );
            }
            var mode = self.AuxDetectPackProblem ( pack );
            if ( mode['txt'] == true && mode['img'] == true )
                cont['000other000'] = self.AuxAppendDOMHash ( cont['000other000'], d );
            else
                cont[pack] = self.AuxAppendDOMHash ( cont[pack], d );
            cont['000all000'] = self.AuxAppendDOMHash ( cont['000all000'], d.cloneNode ( true ) );
        }
        for ( pack in cont )
        {
            if ( cont[pack] == undefined )
                continue;
            var domcont = createDOMElement ( "div", {
                id: "tabunemoticonspack_"+pack,
                style: "position: absolute; background: #eaecea; padding: 1px; width: 80%; display: none;"
                } );
            var conthead = createDOMElement ( "div", {
                class: "tabunemoticons_headline",
                style: "margin-right: 4px; margin-left: 4px;"
                } );
            var mode = self.AuxDetectPackProblem ( pack );
            if ( mode['img'] == false )
            {
                var i = createDOMElement ( "img", {
                    src: self.emPacks[pack]['icon'],
                    style: "height: "+self.settings['toolbar_size']+"; margin-right: 10px;"
                    } );
                conthead.appendChild ( i );
            }
            if ( mode['txt'] == false )
            {
                var t = document.createTextNode ( self.emPacks[pack]['locale'][mode['loc']] );
                conthead.appendChild ( t );
            }
            var s = createDOMElement ( "span", {
                style: "float: right;"
                } );
            var a = createDOMElement ( "a", {
                href: "#",
                onclick: "return tabunemoticons.collapsePack ( 'tabunemoticonspack_"+pack+"' );"
                } );
            t = document.createTextNode ( "[X]" );
            a.appendChild ( t );
            s.appendChild ( a );
            conthead.appendChild ( s );
            domcont.appendChild ( conthead );
            domcont.appendChild ( cont[pack] );
            dompack.appendChild ( domcont );
        }
        return dompack;
    }

    // re-write links as they load up
    this.startUpdate = function ( )
    {
        self.updateInterval = window.setInterval ( self.registerSelf, 500 );
    }

    // stop re-writing
    this.stopUpdate = function ( )
    {
        window.clearInterval ( self.updateInterval );
        self.registerSelf ( );
        self.attachSmilies ( );
    }

    // add emoticons toolbar button
    this.attachSmilies = function ( )
    {
        var toolbars = document.getElementsByClassName ( "panel_form" );
        for ( t = 0; t < toolbars.length; t++)
            if ( toolbars[t].getAttribute( "tabunemoticons" ) != "true" )
            {
                var cache = self.AuxReturnDOMHash ( self.DOMcache['toolbar'] );
                for ( unit in cache )
                    toolbars[t].appendChild ( cache[unit].cloneNode ( true ) );
                toolbars[t].setAttribute ( "tabunemoticons", "true" );
            }
    }

    // URL re-writing function
    this.registerSelf = function ( )
    {
        var links = new Array ( );
        var tmp = document.getElementsByClassName ( "reply-link" );
        for ( var t = 0; t < tmp.length; t++ )
            links.push ( tmp[t] );
        tmp = document.getElementsByClassName ( "reply-title" );
        for ( var t = 0; t < tmp.length; t++ )
            for ( var c = 0; c < tmp[t].childNodes.length; c++ )
                if ( tmp[t].childNodes[c].href.indexOf ( "javascript:lsCmtTree.toggleCommentForm" ) != -1 )
                    links.push ( tmp[t].childNodes[c] );
        for ( var l = 0; l < links.length; l++ )
            if ( links[l].getAttribute ( "tabunemoticons" ) != "true" )
            {
                links[l].setAttribute ( "href", links[l].href+"tabunemoticons.attachSmilies();" );
                links[l].setAttribute ( "tabunemoticons", "true" );
            }
    }

    // initialization
    this.initialize = function ( )
    {
        // two built-in packs; should always present
        self.addPack ( {
            name: "000all000",
            icon: "http://www.fimfiction.net/images/emoticons/yay.png",
            locale: { EN: "All", RU: "Все" },
            images: { }
        } );

        self.addPack ( {
            name: "000other000",
            icon: "http://dl.dropbox.com/u/43692746/emot2/74.png",
            locale: { EN: "Other", RU: "Прочие" },
            images: { }
        } );
        self.finalizePacks ( );
        self.DOMcache['toolbar'] = self.generateToolbar ( );
        self.DOMcache['empacks'] = self.generateEmPacks ( );
        document.body.appendChild ( self.DOMcache['empacks'] );

        for ( unit in self.settings['keep_cache'] )
            if ( self.settings['keep_cache'][unit] == false )
                delete self.DOMcache[unit];
    }

    /* * * * * * BROWSER-INVOKED FUNCTIONS * * * * * */
    // they all return false

    // pop up emoticon selection window
    this.openPack = function ( pack )
    {
        pack = document.getElementById ( pack );
        pack.style.zIndex = 500;
        pack.style.left = ( self.mouseCursor.x + 10 ) + "px";
        pack.style.top = ( self.mouseCursor.y + 10 ) + "px";
        pack.style.display = "block";
        return false;
    }

    // collapse emoticon selection window
    this.collapsePack = function ( pack )
    {
        document.getElementById ( pack ).style.display = "none";
        return false;
    }

    // insert emoticon to text input field
    this.addEmoticon = function ( url )
    {
        var ta = document.getElementById ( "form_comment_text" );
        if ( ta == null )
            ta = document.getElementById ( "topic_text" );
        if ( ta.selectionStart || ta.selectionStart == "0" )
            ta.value = ta.value.substring ( 0, ta.selectionStart ) +
                "<img src='"+url+"' title=''/>" +
                ta.value.substring ( ta.selectionEnd, ta.value.length );
        else
            ta.value += "<img src='"+url+"' title=''/>";
        return false;
    }

}

/* * * * * * FINALIZING * * * * * */

this.tabunemoticons = newDataSafeObject ( TabunEmoticons, this.tabunemoticons );
window.onload = this.tabunemoticons.stopUpdate;
document.onmousemove = this.tabunemoticons.updateMouseCursor;
this.tabunemoticons.startUpdate ( );

this.tabunemoticons.addPack ( {
	name: "pack_gif",
	icon: "http://s08.radikal.ru/i181/1108/e7/d155650d46ff.gif",
	locale: { EN: "Animated", RU: "Анимированные" },
	images: {
		00 : { img: "http://s001.radikal.ru/i195/1108/a9/49f14676e99a.gif", txt: "" },
		01 : { img: "http://s42.radikal.ru/i096/1108/48/24ccc016cce7.gif", txt: "" },
		02 : { img: "http://s52.radikal.ru/i135/1108/89/36305208ec3e.gif", txt: "" },
		03 : { img: "http://s40.radikal.ru/i089/1108/da/8881688d9cc4.gif", txt: "" },
		04 : { img: "http://s44.radikal.ru/i106/1108/6e/17fb2d97b987.gif", txt: "" },
		05 : { img: "http://s52.radikal.ru/i135/1108/21/7ec39d7a8e74.gif", txt: "" },
		06 : { img: "http://s50.radikal.ru/i130/1108/a4/47751842f372.gif", txt: "" },
		07 : { img: "http://s44.radikal.ru/i104/1108/11/438c37a20c1a.gif", txt: "" },
		08 : { img: "http://i005.radikal.ru/1108/9d/7280dd6df30a.gif", txt: "" },
		09 : { img: "http://s014.radikal.ru/i329/1108/19/c3bee63b2cba.gif", txt: "" },
		10 : { img: "http://s08.radikal.ru/i181/1108/e7/d155650d46ff.gif", txt: "" },
		11 : { img: "http://s009.radikal.ru/i309/1108/9c/160cd5581960.gif", txt: "" },
		12 : { img: "http://i030.radikal.ru/1108/68/47b982c18707.gif", txt: "" },
		13 : { img: "http://s60.radikal.ru/i168/1108/e4/cf6c3522d83d.gif", txt: "" },
		14 : { img: "http://s44.radikal.ru/i105/1108/ca/e3f493ee6e81.gif", txt: "" },
		15 : { img: "http://s001.radikal.ru/i193/1108/4d/d7de887c88af.gif", txt: "" }
	}
} );

this.tabunemoticons.addPack ( {
    name: "pack_small",
    icon: "http://www.fimfiction.net/images/emoticons/ajsmug.png",
    locale: { EN: "Small", RU:"Маленькие" },
    images: {
        00: { img: "http://www.fimfiction.net/images/emoticons/ajbemused.png",          txt: "" },
        01: { img: "http://www.fimfiction.net/images/emoticons/ajsleepy.png",           txt: "" },
        02: { img: "http://www.fimfiction.net/images/emoticons/ajsmug.png",             txt: "" },
        03: { img: "http://www.fimfiction.net/images/emoticons/applecry.png",           txt: "" },
        04: { img: "http://www.fimfiction.net/images/emoticons/applejackconfused.png",  txt: "" },
        05: { img: "http://www.fimfiction.net/images/emoticons/applejackunsure.png",    txt: "" },
        06: { img: "http://www.fimfiction.net/images/emoticons/coolphoto.png",          txt: "" },
        07: { img: "http://www.fimfiction.net/images/emoticons/derpyderp1.png",         txt: "" },
        08: { img: "http://www.fimfiction.net/images/emoticons/derpyderp2.png",         txt: "" },
        09: { img: "http://www.fimfiction.net/images/emoticons/derpytongue2.png",       txt: "" },
        10: { img: "http://www.fimfiction.net/images/emoticons/fluttercry.png",         txt: "" },
        11: { img: "http://www.fimfiction.net/images/emoticons/flutterrage.png",        txt: "" },
        12: { img: "http://www.fimfiction.net/images/emoticons/fluttershbad.png",       txt: "" },
        13: { img: "http://www.fimfiction.net/images/emoticons/fluttershyouch.png",     txt: "" },
        14: { img: "http://www.fimfiction.net/images/emoticons/fluttershysad.png",      txt: "" },
        15: { img: "http://www.fimfiction.net/images/emoticons/pinkiecrazy.png",        txt: "" },
        16: { img: "http://www.fimfiction.net/images/emoticons/pinkiegasp.png",         txt: "" },
        17: { img: "http://www.fimfiction.net/images/emoticons/pinkiehappy.png",        txt: "" },
        18: { img: "http://www.fimfiction.net/images/emoticons/pinkiesad2.png",         txt: "" },
        19: { img: "http://www.fimfiction.net/images/emoticons/pinkiesick.png",         txt: "" },
        20: { img: "http://www.fimfiction.net/images/emoticons/pinkiesmile.png",        txt: "" },
        21: { img: "http://www.fimfiction.net/images/emoticons/rainbowderp.png",        txt: "" },
        22: { img: "http://www.fimfiction.net/images/emoticons/rainbowdetermined2.png", txt: "" },
        23: { img: "http://www.fimfiction.net/images/emoticons/rainbowhuh.png",         txt: "" },
        24: { img: "http://www.fimfiction.net/images/emoticons/rainbowkiss.png",        txt: "" },
        25: { img: "http://www.fimfiction.net/images/emoticons/rainbowlaugh.png",       txt: "" },
        26: { img: "http://www.fimfiction.net/images/emoticons/rainbowwild.png",        txt: "" },
        27: { img: "http://www.fimfiction.net/images/emoticons/raritycry.png",          txt: "" },
        28: { img: "http://www.fimfiction.net/images/emoticons/raritydespair.png",      txt: "" },
        29: { img: "http://www.fimfiction.net/images/emoticons/raritystarry.png",       txt: "" },
        30: { img: "http://www.fimfiction.net/images/emoticons/raritywink.png",         txt: "" },
        31: { img: "http://www.fimfiction.net/images/emoticons/scootangel.png",         txt: "" },
        32: { img: "http://www.fimfiction.net/images/emoticons/trixieshiftleft.png",    txt: "" },
        33: { img: "http://www.fimfiction.net/images/emoticons/trixieshiftright.png",   txt: "" },
        34: { img: "http://www.fimfiction.net/images/emoticons/twilightangry2.png",     txt: "" },
        35: { img: "http://www.fimfiction.net/images/emoticons/twilightblush.png",      txt: "" },
        36: { img: "http://www.fimfiction.net/images/emoticons/twilightoops.png",       txt: "" },
        37: { img: "http://www.fimfiction.net/images/emoticons/twilightsheepish.png",   txt: "" },
        38: { img: "http://www.fimfiction.net/images/emoticons/twilightsmile.png",      txt: "" },
        39: { img: "http://www.fimfiction.net/images/emoticons/twistnerd.png",          txt: "" },
        40: { img: "http://www.fimfiction.net/images/emoticons/unsuresweetie.png",      txt: "" },
        41: { img: "http://www.fimfiction.net/images/emoticons/yay.png",                txt: "" },
        42: { img: "http://www.fimfiction.net/images/emoticons/trollestia.png",         txt: "" },
        43: { img: "http://www.fimfiction.net/images/emoticons/moustache.png",          txt: "" },
        44: { img: "http://www.fimfiction.net/images/emoticons/facehoof.png",           txt: "" },
        45: { img: "http://www.fimfiction.net/images/emoticons/eeyup.png",              txt: "" },
        46: { img: "http://www.fimfiction.net/images/emoticons/duck.png",               txt: "" }
    }
} );

this.tabunemoticons.addPack ( {
    name: "pack_medium",
    icon: "http://dl.dropbox.com/u/43692746/emot2/20.png",
    locale: { EN: "Medium", RU:"Средние" },
    images: {
        00: { img: "http://dl.dropbox.com/u/43692746/emot2/30.png",     txt: "" },
        01: { img: "http://dl.dropbox.com/u/43692746/emot2/40.png",     txt: "" },
        02: { img: "http://dl.dropbox.com/u/43692746/emot2/34.png",     txt: "" },
        03: { img: "http://dl.dropbox.com/u/43692746/emot2/91.png",     txt: "" },
        04: { img: "http://dl.dropbox.com/u/43692746/emot2/93.png",     txt: "" },
        05: { img: "http://dl.dropbox.com/u/43692746/emot2/89.png",     txt: "" },
        06: { img: "http://dl.dropbox.com/u/43692746/emot2/92.png",     txt: "" },
        07: { img: "http://dl.dropbox.com/u/43692746/emot2/42.png",     txt: "" },
        08: { img: "http://dl.dropbox.com/u/43692746/emot2/31.png",     txt: "" },
        09: { img: "http://dl.dropbox.com/u/43692746/emot2/14.png",     txt: "" },
        10: { img: "http://dl.dropbox.com/u/43692746/emot2/26.png",     txt: "" },
        11: { img: "http://dl.dropbox.com/u/43692746/emot2/35.png",     txt: "" },
        12: { img: "http://dl.dropbox.com/u/43692746/emot2/3.png",      txt: "" },
        13: { img: "http://dl.dropbox.com/u/43692746/emot2/43.png",     txt: "" },
        14: { img: "http://dl.dropbox.com/u/43692746/emot2/28.png",     txt: "" },
        15: { img: "http://dl.dropbox.com/u/43692746/emot2/5.png",      txt: "" },
        16: { img: "http://dl.dropbox.com/u/43692746/emot2/8.png",      txt: "" },
        17: { img: "http://dl.dropbox.com/u/43692746/emot2/13.png",     txt: "" },
        18: { img: "http://dl.dropbox.com/u/43692746/emot2/21.png",     txt: "" },
        19: { img: "http://dl.dropbox.com/u/43692746/emot2/22.png",     txt: "" },
        20: { img: "http://dl.dropbox.com/u/43692746/emot2/29.png",     txt: "" },
        21: { img: "http://dl.dropbox.com/u/43692746/emot2/12.png",     txt: "" },
        22: { img: "http://dl.dropbox.com/u/43692746/emot2/16.png",     txt: "" },
        23: { img: "http://dl.dropbox.com/u/43692746/emot2/36.png",     txt: "" },
        24: { img: "http://dl.dropbox.com/u/43692746/emot2/32.png",     txt: "" },
        25: { img: "http://dl.dropbox.com/u/43692746/emot2/23.png",     txt: "" },
        26: { img: "http://dl.dropbox.com/u/43692746/emot2/25.png",     txt: "" },
        27: { img: "http://dl.dropbox.com/u/43692746/emot2/33.png",     txt: "" },
        28: { img: "http://dl.dropbox.com/u/43692746/emot2/9.png",      txt: "" },
        29: { img: "http://dl.dropbox.com/u/43692746/emot2/10.png",     txt: "" },
        30: { img: "http://dl.dropbox.com/u/43692746/emot2/41.png",     txt: "" },
        31: { img: "http://dl.dropbox.com/u/43692746/emot2/4.png",      txt: "" },
        32: { img: "http://dl.dropbox.com/u/43692746/emot2/17.png",     txt: "" },
        33: { img: "http://dl.dropbox.com/u/43692746/emot2/15.png",     txt: "" },
        34: { img: "http://dl.dropbox.com/u/43692746/emot2/18.png",     txt: "" },
        35: { img: "http://dl.dropbox.com/u/43692746/emot2/19.png",     txt: "" },
        36: { img: "http://dl.dropbox.com/u/43692746/emot2/24.png",     txt: "" },
        37: { img: "http://dl.dropbox.com/u/43692746/emot2/38.png",     txt: "" },
        38: { img: "http://dl.dropbox.com/u/43692746/emot2/11.png",     txt: "" },
        39: { img: "http://dl.dropbox.com/u/43692746/emot2/20.png",     txt: "" },
        40: { img: "http://dl.dropbox.com/u/43692746/emot2/27.png",     txt: "" },
        41: { img: "http://dl.dropbox.com/u/43692746/emot2/37.png",     txt: "" },
        42: { img: "http://dl.dropbox.com/u/43692746/emot2/39.png",     txt: "" }
    }
} );
this.tabunemoticons.addPack ( {
    name: "pack_large",
    icon: "http://img257.imageshack.us/img257/1345/pink7.png",
    locale: { EN: "Large", RU:"Большие" },
    images: {
		00 : { img: "http://dl.dropbox.com/u/43692746/emot2/47.png", txt: "" },
		01 : { img: "http://dl.dropbox.com/u/43692746/emot2/48.png", txt: "" },
		02 : { img: "http://dl.dropbox.com/u/43692746/emot2/49.png", txt: "" },
		03 : { img: "http://dl.dropbox.com/u/43692746/emot2/6.png", txt: "" },
		04 : { img: "http://dl.dropbox.com/u/43692746/emot2/90.png", txt: "" },
		05 : { img: "http://img100.imageshack.us/img100/9858/twil15.png", txt: "" },
		06 : { img: "http://img830.imageshack.us/img830/672/twil14.png", txt: "" },
		07 : { img: "http://img809.imageshack.us/img809/2302/twil13.png", txt: "" },
		08 : { img: "http://img811.imageshack.us/img811/8062/twil12.png", txt: "" },
		09 : { img: "http://img192.imageshack.us/img192/7290/twil11.png", txt: "" },
		10 : { img: "http://img69.imageshack.us/img69/7138/twil10.png", txt: "" },
		11 : { img: "http://img4.imageshack.us/img4/8882/twil9.png", txt: "" },
		12 : { img: "http://img17.imageshack.us/img17/1801/twil8.png", txt: "" },
		13 : { img: "http://img696.imageshack.us/img696/1786/twil7.png", txt: "" },
		14 : { img: "http://img221.imageshack.us/img221/50/twil6eh.png", txt: "" },
		15 : { img: "http://img46.imageshack.us/img46/7461/twil5.png", txt: "" },
		16 : { img: "http://img195.imageshack.us/img195/8669/facehoof1.png", txt: "" },
		17 : { img: "http://dl.dropbox.com/u/43692746/emot2/98.png", txt: "" },
		18 : { img: "http://img825.imageshack.us/img825/2930/twil4.png", txt: "" },
		19 : { img: "http://img265.imageshack.us/img265/3681/twil3.png", txt: "" },
		20 : { img: "http://img818.imageshack.us/img818/1/twil2.png", txt: "" },
		21 : { img: "http://img37.imageshack.us/img37/4595/twil1.png", txt: "" },
		22 : { img: "http://img3.imageshack.us/img3/6818/2twil7.png", txt: "" },
		23 : { img: "http://img20.imageshack.us/img20/9244/2twil6.png", txt: "" },
		24 : { img: "http://img263.imageshack.us/img263/8338/2twil5.png", txt: "" },
		25 : { img: "http://img5.imageshack.us/img5/8222/2twil4.png", txt: "" },
		26 : { img: "http://img805.imageshack.us/img805/8528/2twil3.png", txt: "" },
		27 : { img: "http://img269.imageshack.us/img269/5285/2twil2.png", txt: "" },
		28 : { img: "http://img189.imageshack.us/img189/765/2twil1.png", txt: "" },
		29 : { img: "http://dl.dropbox.com/u/43692746/emot2/59.png", txt: "" },
		30 : { img: "http://dl.dropbox.com/u/43692746/emot2/61.png", txt: "" },
		31 : { img: "http://dl.dropbox.com/u/43692746/emot2/86.png", txt: "" },
		32 : { img: "http://img408.imageshack.us/img408/282/rtry2.png", txt: "" },
		33 : { img: "http://img268.imageshack.us/img268/663/rtry1.png", txt: "" },
		34 : { img: "http://img267.imageshack.us/img267/8512/2rtry6.png", txt: "" },
		35 : { img: "http://img822.imageshack.us/img822/1192/2rtry5.png", txt: "" },
		36 : { img: "http://img52.imageshack.us/img52/7405/2rtry4.png", txt: "" },
		37 : { img: "http://img13.imageshack.us/img13/9761/2rtry3.png", txt: "" },
		38 : { img: "http://img189.imageshack.us/img189/2507/2rtry2.png", txt: "" },
		39 : { img: "http://img714.imageshack.us/img714/2377/2rtry1.png", txt: "" },
		40 : { img: "http://img403.imageshack.us/img403/2512/flat13.png", txt: "" },
		41 : { img: "http://img27.imageshack.us/img27/9317/flat12.png", txt: "" },
		42 : { img: "http://img254.imageshack.us/img254/9148/flat11.png", txt: "" },
		43 : { img: "http://img853.imageshack.us/img853/5640/flat10.png", txt: "" },
		44 : { img: "http://img94.imageshack.us/img94/9758/flat9.png", txt: "" },
		45 : { img: "http://img197.imageshack.us/img197/1617/flat8.png", txt: "" },
		46 : { img: "http://img841.imageshack.us/img841/9104/flat7.png", txt: "" },
		47 : { img: "http://img444.imageshack.us/img444/7756/flat6.png", txt: "" },
		48 : { img: "http://img542.imageshack.us/img542/4518/flat5.png", txt: "" },
		49 : { img: "http://img337.imageshack.us/img337/5729/flat4.png", txt: "" },
		50 : { img: "http://img408.imageshack.us/img408/6503/flat3.png", txt: "" },
		51 : { img: "http://img856.imageshack.us/img856/8427/flat2.png", txt: "" },
		52 : { img: "http://img833.imageshack.us/img833/5705/flat1.png", txt: "" },
		53 : { img: "http://dl.dropbox.com/u/43692746/emot2/66.png", txt: "" },
		54 : { img: "http://dl.dropbox.com/u/43692746/emot2/53.png", txt: "" },
		55 : { img: "http://dl.dropbox.com/u/43692746/emot2/7.png", txt: "" },
		56 : { img: "http://img52.imageshack.us/img52/3449/2flat8.png", txt: "" },
		57 : { img: "http://img268.imageshack.us/img268/9781/2flat7.png", txt: "" },
		58 : { img: "http://img213.imageshack.us/img213/4434/2flat6.png", txt: "" },
		59 : { img: "http://img444.imageshack.us/img444/7241/2flat5.png", txt: "" },
		60 : { img: "http://img191.imageshack.us/img191/9657/2flat4.png", txt: "" },
		61 : { img: "http://img163.imageshack.us/img163/3404/2flat3.png", txt: "" },
		62 : { img: "http://img265.imageshack.us/img265/781/2flat2.png", txt: "" },
		63 : { img: "http://img221.imageshack.us/img221/4271/2flat1.png", txt: "" },
		64 : { img: "http://dl.dropbox.com/u/43692746/emot2/46.png", txt: "" },
		65 : { img: "http://dl.dropbox.com/u/43692746/emot2/45.png", txt: "" },
		66 : { img: "http://dl.dropbox.com/u/43692746/emot2/44.png", txt: "" },
		67 : { img: "http://dl.dropbox.com/u/43692746/emot2/54.png", txt: "" },
		68 : { img: "http://dl.dropbox.com/u/43692746/emot2/64.png", txt: "" },
		69 : { img: "http://dl.dropbox.com/u/43692746/emot2/94.png", txt: "" },
		70 : { img: "http://dl.dropbox.com/u/43692746/emot2/75.png", txt: "" },
		71 : { img: "http://img713.imageshack.us/img713/9991/dash15.png", txt: "" },
		72 : { img: "http://img233.imageshack.us/img233/7489/dash14.png", txt: "" },
		73 : { img: "http://img205.imageshack.us/img205/2040/dash13.png", txt: "" },
		74 : { img: "http://img11.imageshack.us/img11/9651/dash12.png", txt: "" },
		75 : { img: "http://img696.imageshack.us/img696/5970/dash11.png", txt: "" },
		76 : { img: "http://img337.imageshack.us/img337/9605/dash10.png", txt: "" },
		77 : { img: "http://img80.imageshack.us/img80/1092/dash9.png", txt: "" },
		78 : { img: "http://img689.imageshack.us/img689/7832/dash8.png", txt: "" },
		79 : { img: "http://img88.imageshack.us/img88/3327/dash7.png", txt: "" },
		80 : { img: "http://img404.imageshack.us/img404/1609/dash6.png", txt: "" },
		81 : { img: "http://img685.imageshack.us/img685/1474/dash5.png", txt: "" },
		82 : { img: "http://img804.imageshack.us/img804/4863/dash4.png", txt: "" },
		83 : { img: "http://img228.imageshack.us/img228/3135/dash3.png", txt: "" },
		84 : { img: "http://img64.imageshack.us/img64/3816/dash2.png", txt: "" },
		85 : { img: "http://img585.imageshack.us/img585/9112/dash1.png", txt: "" },
		86 : { img: "http://img573.imageshack.us/img573/9972/2dash5.png", txt: "" },
		87 : { img: "http://img842.imageshack.us/img842/8512/2dash4.png", txt: "" },
		88 : { img: "http://img821.imageshack.us/img821/7245/2dash3.png", txt: "" },
		89 : { img: "http://img5.imageshack.us/img5/8515/2dash2.png", txt: "" },
		90 : { img: "http://img35.imageshack.us/img35/7610/2dash1.png", txt: "" },
		91 : { img: "http://dl.dropbox.com/u/43692746/emot2/58.png", txt: "" },
		92 : { img: "http://dl.dropbox.com/u/43692746/emot2/56.png", txt: "" },
		93 : { img: "http://img249.imageshack.us/img249/4120/jack5.png", txt: "" },
		94 : { img: "http://img823.imageshack.us/img823/3964/jack4.png", txt: "" },
		95 : { img: "http://img823.imageshack.us/img823/5127/jack3e.png", txt: "" },
		96 : { img: "http://img716.imageshack.us/img716/1249/jack2z.png", txt: "" },
		97 : { img: "http://img217.imageshack.us/img217/4152/jack1q.png", txt: "" },
		98 : { img: "http://dl.dropbox.com/u/43692746/emot2/1.png", txt: "" },
		99 : { img: "http://img812.imageshack.us/img812/1089/2jack11.png", txt: "" },
		100 : { img: "http://img13.imageshack.us/img13/5352/2jack10.png", txt: "" },
		101 : { img: "http://img805.imageshack.us/img805/2902/2jack9.png", txt: "" },
		102 : { img: "http://img534.imageshack.us/img534/3853/2jack8.png", txt: "" },
		103 : { img: "http://img818.imageshack.us/img818/6452/2jack7.png", txt: "" },
		104 : { img: "http://img401.imageshack.us/img401/6974/2jack6.png", txt: "" },
		105 : { img: "http://img16.imageshack.us/img16/2576/2jack5.png", txt: "" },
		106 : { img: "http://img28.imageshack.us/img28/8273/2jack4.png", txt: "" },
		107 : { img: "http://img717.imageshack.us/img717/8812/2jack3.png", txt: "" },
		108 : { img: "http://img215.imageshack.us/img215/8228/2jack2.png", txt: "" },
		109 : { img: "http://img189.imageshack.us/img189/7165/2jack1.png", txt: "" },
		110 : { img: "http://dl.dropbox.com/u/43692746/emot2/87.png", txt: "" },
		111 : { img: "http://dl.dropbox.com/u/43692746/emot2/50.png", txt: "" },
		112 : { img: "http://dl.dropbox.com/u/43692746/emot2/51.png", txt: "" },
		113 : { img: "http://dl.dropbox.com/u/43692746/emot2/52.png", txt: "" },
		114 : { img: "http://dl.dropbox.com/u/43692746/emot2/57.png", txt: "" },
		115 : { img: "http://dl.dropbox.com/u/43692746/emot2/65.png", txt: "" },
		116 : { img: "http://img3.imageshack.us/img3/9379/pink9.png", txt: "" },
		117 : { img: "http://img440.imageshack.us/img440/5029/pink8.png", txt: "" },
		118 : { img: "http://img257.imageshack.us/img257/1345/pink7.png", txt: "" },
		119 : { img: "http://img542.imageshack.us/img542/8098/pink6.png", txt: "" },
		120 : { img: "http://img341.imageshack.us/img341/7697/pink5.png", txt: "" },
		121 : { img: "http://img831.imageshack.us/img831/7036/pink4.png", txt: "" },
		122 : { img: "http://img36.imageshack.us/img36/8028/pink3f.png", txt: "" },
		123 : { img: "http://img577.imageshack.us/img577/7373/pink2b.png", txt: "" },
		124 : { img: "http://img204.imageshack.us/img204/7285/2pink5.png", txt: "" },
		125 : { img: "http://img194.imageshack.us/img194/8383/2pink4.png", txt: "" },
		126 : { img: "http://img840.imageshack.us/img840/5392/2pink3.png", txt: "" },
		127 : { img: "http://img819.imageshack.us/img819/1167/2pink2.png", txt: "" },
		128 : { img: "http://img256.imageshack.us/img256/9322/2pink1.png", txt: "" },
		129 : { img: "http://img535.imageshack.us/img535/6753/dian2.png", txt: "" },
		130 : { img: "http://img256.imageshack.us/img256/5683/dian1.png", txt: "" },
		131 : { img: "http://img600.imageshack.us/img600/4349/cpck.png", txt: "" },
		132 : { img: "http://img265.imageshack.us/img265/9878/pink1o.png", txt: "" },
		133 : { img: "http://dl.dropbox.com/u/43692746/emot2/68.png", txt: "" },
		134 : { img: "http://dl.dropbox.com/u/43692746/emot2/95.png", txt: "" },
		135 : { img: "http://dl.dropbox.com/u/43692746/emot2/96.png", txt: "" },
		136 : { img: "http://dl.dropbox.com/u/43692746/emot2/97.png", txt: "" },
		137 : { img: "http://img193.imageshack.us/img193/2501/clst2.png", txt: "" },
		138 : { img: "http://img191.imageshack.us/img191/4528/clst1.png", txt: "" },
		139 : { img: "http://dl.dropbox.com/u/43692746/emot2/63.png", txt: "" },
		140 : { img: "http://dl.dropbox.com/u/43692746/emot2/82.png", txt: "" },
		141 : { img: "http://dl.dropbox.com/u/43692746/emot2/200.png", txt: "" },
		142 : { img: "http://dl.dropbox.com/u/43692746/emot2/201.png", txt: "" },
		143 : { img: "http://dl.dropbox.com/u/43692746/emot2/202.png", txt: "" },
		144 : { img: "http://dl.dropbox.com/u/43692746/emot2/203.png", txt: "" },
		145 : { img: "http://dl.dropbox.com/u/43692746/emot2/204.png", txt: "" },
		146 : { img: "http://dl.dropbox.com/u/43692746/emot2/205.png", txt: "" },
		147 : { img: "http://dl.dropbox.com/u/43692746/emot2/206.png", txt: "" },
		148 : { img: "http://img267.imageshack.us/img267/699/luna1o.png", txt: "" },
		149 : { img: "http://dl.dropbox.com/u/43692746/emot2/207.png", txt: "" },
		150 : { img: "http://img189.imageshack.us/img189/3425/trix4.png", txt: "" },
		151 : { img: "http://img502.imageshack.us/img502/6461/trix3.png", txt: "" },
		152 : { img: "http://img263.imageshack.us/img263/1587/trix2.png", txt: "" },
		153 : { img: "http://img10.imageshack.us/img10/1610/trix1.png", txt: "" },
		154 : { img: "http://dl.dropbox.com/u/43692746/emot2/74.png", txt: "" },
		155 : { img: "http://img11.imageshack.us/img11/1053/2trix5.png", txt: "" },
		156 : { img: "http://img401.imageshack.us/img401/3976/2trix4.png", txt: "" },
		157 : { img: "http://img810.imageshack.us/img810/8165/2trix3.png", txt: "" },
		158 : { img: "http://img713.imageshack.us/img713/5700/2trix2.png", txt: "" },
		159 : { img: "http://img507.imageshack.us/img507/8130/2trix1.png", txt: "" },
		160 : { img: "http://dl.dropbox.com/u/43692746/emot2/55.png", txt: "" },
		161 : { img: "http://dl.dropbox.com/u/43692746/emot2/60.png", txt: "" },
		162 : { img: "http://img830.imageshack.us/img830/9400/derp2y.png", txt: "" },
		163 : { img: "http://img10.imageshack.us/img10/5300/derp1.png", txt: "" },
		164 : { img: "http://dl.dropbox.com/u/43692746/emot2/62.png", txt: "" },
		165 : { img: "http://img851.imageshack.us/img851/699/2derp1.png", txt: "" },
		166 : { img: "http://dl.dropbox.com/u/43692746/emot2/78.png", txt: "" },
		167 : { img: "http://img695.imageshack.us/img695/8789/lyra1.png", txt: "" },
		168 : { img: "http://img72.imageshack.us/img72/6521/2lyra2.png", txt: "" },
		169 : { img: "http://img266.imageshack.us/img266/2977/2lyra1.png", txt: "" },
		170 : { img: "http://img27.imageshack.us/img27/4066/spik2.png", txt: "" },
		171 : { img: "http://img694.imageshack.us/img694/7272/spik1.png", txt: "" },
		172 : { img: "http://img338.imageshack.us/img338/4820/2spik3.png", txt: "" },
		173 : { img: "http://img40.imageshack.us/img40/2269/2spik2.png", txt: "" },
		174 : { img: "http://img36.imageshack.us/img36/2387/2spik1.png", txt: "" },
		175 : { img: "http://img210.imageshack.us/img210/590/glda1.png", txt: "" },
		176 : { img: "http://img69.imageshack.us/img69/4059/2glda3.png", txt: "" },
		177 : { img: "http://img233.imageshack.us/img233/7361/2glda2.png", txt: "" },
		178 : { img: "http://img442.imageshack.us/img442/3896/2glda1.png", txt: "" },
		179 : { img: "http://dl.dropbox.com/u/43692746/emot2/2.png", txt: "" },
		180 : { img: "http://img221.imageshack.us/img221/1655/2dscr4.png", txt: "" },
		181 : { img: "http://img827.imageshack.us/img827/4509/2dscr3.png", txt: "" },
		182 : { img: "http://img85.imageshack.us/img85/1921/2dscr2.png", txt: "" },
		183 : { img: "http://img15.imageshack.us/img15/9974/2dscr1.png", txt: "" },
		184 : { img: "http://dl.dropbox.com/u/43692746/emot2/81.png", txt: "" },
		185 : { img: "http://dl.dropbox.com/u/43692746/emot2/70.png", txt: "" },
		186 : { img: "http://dl.dropbox.com/u/43692746/emot2/85.png", txt: "" },
		187 : { img: "http://dl.dropbox.com/u/43692746/emot2/88.png", txt: "" },
		188 : { img: "http://img7.imageshack.us/img7/5409/chkn3.png", txt: "" },
		189 : { img: "http://img850.imageshack.us/img850/2172/chkn2.png", txt: "" },
		190 : { img: "http://img39.imageshack.us/img39/1046/chkn1.png", txt: "" },
		191 : { img: "http://img265.imageshack.us/img265/2159/blum3.png", txt: "" },
		192 : { img: "http://img440.imageshack.us/img440/7268/blum2.png", txt: "" },
		193 : { img: "http://img266.imageshack.us/img266/6096/blum1.png", txt: "" },
		194 : { img: "http://img256.imageshack.us/img256/9940/toyt.png", txt: "" },
		195 : { img: "http://dl.dropbox.com/u/43692746/emot2/83.png", txt: "" },
		196 : { img: "http://dl.dropbox.com/u/43692746/emot2/69.png", txt: "" },
		197 : { img: "http://dl.dropbox.com/u/43692746/emot2/72.png", txt: "" },
		198 : { img: "http://dl.dropbox.com/u/43692746/emot2/76.png", txt: "" },
		199 : { img: "http://dl.dropbox.com/u/43692746/emot2/79.png", txt: "" },
		200 : { img: "http://dl.dropbox.com/u/43692746/emot2/80.png", txt: "" },
		201 : { img: "http://dl.dropbox.com/u/43692746/emot2/84.png", txt: "" },
		202 : { img: "http://dl.dropbox.com/u/43692746/emot2/71.png", txt: "" },
		203 : { img: "http://img716.imageshack.us/img716/8509/tops1.png", txt: "" },
		204 : { img: "http://img440.imageshack.us/img440/9953/tavy1.png", txt: "" },
		205 : { img: "http://img202.imageshack.us/img202/4364/sapp1.png", txt: "" },
		206 : { img: "http://img196.imageshack.us/img196/6267/eyup1.png", txt: "" },
		207 : { img: "http://img685.imageshack.us/img685/8890/emmm1.png", txt: "" },
		208 : { img: "http://img198.imageshack.us/img198/3006/dmnd1.png", txt: "" },
		209 : { img: "http://img46.imageshack.us/img46/6366/crrt2.png", txt: "" },
		210 : { img: "http://img641.imageshack.us/img641/586/crrt1.png", txt: "" },
		211 : { img: "http://img535.imageshack.us/img535/3135/clgt1.png", txt: "" },
		212 : { img: "http://img713.imageshack.us/img713/2922/brry1.png", txt: "" },
		213 : { img: "http://img406.imageshack.us/img406/5764/aplz1.png", txt: "" }
	}
} );

this.tabunemoticons.addPack ( {
	name: "chanpack",
	icon: "http://img856.imageshack.us/img856/9171/awesome1.png",
	locale: { EN: "BBS", RU: "АИБ" },
	images: {
		00 : { img: "http://img705.imageshack.us/img705/2209/heresy1.png", txt: "" },
		01 : { img: "http://img607.imageshack.us/img607/1865/r341z.png", txt: "" },
		02 : { img: "http://img690.imageshack.us/img690/4442/cooler1.png", txt: "" },
		03 : { img: "http://img51.imageshack.us/img51/9351/clop2.png", txt: "" },
		04 : { img: "http://img802.imageshack.us/img802/7394/clop1.png", txt: "" },
		05 : { img: "http://img401.imageshack.us/img401/2655/umad1q.png", txt: "" },
		06 : { img: "http://img220.imageshack.us/img220/6120/okayc.png", txt: "" },
		07 : { img: "http://img716.imageshack.us/img716/5521/ew1i.png", txt: "" },
		08 : { img: "http://img836.imageshack.us/img836/1109/dunnotwil.png", txt: "" },
		09 : { img: "http://img706.imageshack.us/img706/303/dunnotrix.png", txt: "" },
		10 : { img: "http://img824.imageshack.us/img824/7562/dunnospik.png", txt: "" },
		11 : { img: "http://img265.imageshack.us/img265/864/dunnodoct.png", txt: "" },
		12 : { img: "http://img812.imageshack.us/img812/4251/dunnoclst.png", txt: "" },
		13 : { img: "http://img402.imageshack.us/img402/4269/dunnotwil2.png", txt: "" },
		14 : { img: "http://img836.imageshack.us/img836/3281/dunnortry.png", txt: "" },
		15 : { img: "http://img843.imageshack.us/img843/1539/dunnopink.png", txt: "" },
		16 : { img: "http://img854.imageshack.us/img854/9317/dunnoluna.png", txt: "" },
		17 : { img: "http://img521.imageshack.us/img521/5962/dunnojack.png", txt: "" },
		18 : { img: "http://img52.imageshack.us/img52/4055/dunnoflat.png", txt: "" },
		19 : { img: "http://img189.imageshack.us/img189/7235/dunnodash.png", txt: "" },
		20 : { img: "http://img703.imageshack.us/img703/6690/awesome2c.png", txt: "" },
		21 : { img: "http://img856.imageshack.us/img856/9171/awesome1.png", txt: "" },
		22 : { img: "http://img854.imageshack.us/img854/7672/awesome3.png", txt: "" },
		23 : { img: "http://img46.imageshack.us/img46/951/wtf1m.png", txt: "" },
		24 : { img: "http://dl.dropbox.com/u/43692746/emot2/67.png", txt: "" },
		25 : { img: "http://img585.imageshack.us/img585/2821/trollface1.png", txt: "" },
		26 : { img: "http://img406.imageshack.us/img406/3085/smirk1.png", txt: "" },
		27 : { img: "http://img803.imageshack.us/img803/742/slowpony1.png", txt: "" },
		28 : { img: "http://img577.imageshack.us/img577/9753/ohyoutwil.png", txt: "" },
		29 : { img: "http://img401.imageshack.us/img401/9401/ohyourtry.png", txt: "" },
		30 : { img: "http://img811.imageshack.us/img811/4237/ohyoupink.png", txt: "" },
		31 : { img: "http://img411.imageshack.us/img411/5530/ohyoumayr.png", txt: "" },
		32 : { img: "http://img64.imageshack.us/img64/8318/ohyoulyra.png", txt: "" },
		33 : { img: "http://img257.imageshack.us/img257/6082/ohyouflat.png", txt: "" },
		34 : { img: "http://img406.imageshack.us/img406/3928/ohyouderp.png", txt: "" },
		35 : { img: "http://img249.imageshack.us/img249/3716/ohyoudash.png", txt: "" },
		36 : { img: "http://img208.imageshack.us/img208/3839/ohyouchkn.png", txt: "" },
		37 : { img: "http://dl.dropbox.com/u/43692746/emot2/73.png", txt: "" }
	}
} );

tabunemoticons.initialize ( );
}
/* * * * * * * * * * * * * * * * * */
/* * * CODE TO BE INJECTED END * * */
/* * * * * * * * * * * * * * * * * */

// inject main script source to the page and execute from within it
(
function ( callback )
{
    var source = "(\n" + callback.toString ( ) + "\n) ( );"
    var script = document.createElement ( "script" );
    script.text = source;
    document.head.appendChild ( script );
}
) ( injectedscript );
// </script>
