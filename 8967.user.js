// ==UserScript==
// @name        Google Calendar Extra Tabs
// @version     0.5.2
// @author      Lukas Fragodt
// @namespace   lukas.fragodt.google.calendar
// @description Adds extra mode tabs to Google Calendar
// @include     http://www.google.com/calendar/render
// @include     https://www.google.com/calendar/render
// @include     http://www.google.com/calendar/render?*
// @include     https://www.google.com/calendar/render?*
// ==/UserScript==

//Author contact info: Lukas Fragodt <lukas@fragodt.com>

//Copyright (C) 2006. Lukas Fragodt and contributor(s).
//This script is free software; you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation; version 2 of the License. More
//information and a copy of the license available at http://www.gnu.org/copyleft/gpl.html

//This script is distribute in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of 
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
//GNU General Public License for more details.


//We need to recreate highlighting. We can't overwrite existing
//highlighting because its included in Google scripts we need to
// use, but the existing highlighting won't work for our new tabs.
for ( var i = 0; i <= 5; i++ ) {
    document.getElementById( 'mode_link' + i ).addEventListener( 'click', ht, false );
}

//Remove original custom tab and separator.
var custom = document.getElementById( 'mode_link4' );
custom.parentNode.removeChild( custom.previousSibling );
custom.parentNode.removeChild( custom );

var agenda = document.getElementById( 'mode_link5' ); //Agenda tab - our custom tabs go in front of it.

//Each number in this array becomes a tab for displaying
//that number of days on the calendar. As far as I can
//tell, any number of days will work, but it is silly
//to include days larger than 7 that are not evenly
//divisible by 7. 
var days = [ 3, 14, 21 ];

//Handle each tab.
for ( var i = 0; i < days.length; i++ ) {
    //Generate text for tab.
    var verbiage = get_verbiage( days[i] );

    //Create and insert new tab.
    new_tab = create_tab( days[i], verbiage, i + 6 );
    agenda.parentNode.insertBefore( new_tab, agenda);
    
    //Insert spacer cell. 
    spacer_cell();
}

function get_verbiage( numdays ) {
//Returns appropriate verbiage for number of days.
    if ( numdays < 7 ) {
        return ( "Next " + numdays + " Days" );
    } else {
        return ( "Next " + ( numdays / 7 ) + " Weeks" );
        //If, for some bizarre reason, you want to use
        //a number of days that does not go in to 7, you'll
        //probably want to do this instead:
        //return ( "Next " + ( Math.round( numdays / 7 * 100)/100 ) + " Weeks" );
    }
}

function create_tab ( numdays, text, id) {
//Creates new tab element.
    var tab = document.createElement( 'td' );
   
    //Fc is the Google script which creates the calendar.
    tab.setAttribute( 'onmousedown', 'Fc("compact,' + numdays + '",true);' );
    tab.id = 'mode_link' + id;
    tab.className = 'noprint';
    tab.innerHTML = '<div style="background: rgb(232, 238, 247) none repeat scroll 0%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;" class="t1">&nbsp;</div><div style="background: rgb(232, 238, 247) none repeat scroll 0%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;" class="t2">&nbsp;</div><div class="modelinkOff"><nobr id="customModeLabel">' + text + '</nobr></div>';
    //Add event listenering for highlighting.
    tab.addEventListener( 'click', ht, false );

    return tab;
}

function spacer_cell() {
//Creates and inserts a spacer cell.
    var td_noprint = document.createElement( 'td' );
    td_noprint.className = 'noprint';
    td_noprint.innerHTML = '&nbsp;';
    agenda.parentNode.insertBefore( td_noprint, agenda );
}

function ht() {
//Highlights and unhighlights the appropriate tabs.
//This is a bit kludgy, but necessary. We can't turn
//off Google's highlighting script because it is called
//by Google's calendar script, which we need. So in some
//cases there may be more than one "On" tab temporarily.
//We have to be sure to turn everything off but the one
//we want.
    //Turn off other tabs.
    var formertab = getElementsByClassRegExp( 'div', /modelinkOn/, document.getElementById( 'chrome_main1' ) );
    for ( var i = 0; i < formertab.length; i++ ) {
        formertab[i].className = 'modelinkOff';
    }
    //Turn on our tab.
    this.childNodes[2].className = 'modelinkOn';
}

function getElementsByClassRegExp ( element, className, root ) {
//Returns an array of all elements of a particular class.
//element   - string element name
//classname - regular expression for class
//root      - root element of DOM branch to search - defaults to document root

    var root = (root == null) ? document : root;
    var elements = root.getElementsByTagName(element);
    var retVal = new Array();
  
    for (var i = 0; i < elements.length; i++) {
        if (className.exec(elements[i].className)) {
            retVal.push(elements[i]);
        }
    }
  
    return retVal;
}
