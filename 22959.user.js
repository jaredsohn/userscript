// ==UserScript==
// @name           GC Logging Template
// @namespace      Geocaching
// @description    GC Logging Template
// @include        http://www.geocaching.com/seek/log.aspx?ID=*
// @include        http://www.geocaching.com/seek/log.aspx?PLogGuid=*
// ==/UserScript==

/**********************************************************************
 * Script:   GC Logging Template                                      *
 * Version:  20090828                                                 *
 * Author:   Marcel de Haas                                           *
 * Email:    marcel@dehaas.dds.nl                                     *
 *                                                                    *
 * This script allows you to create a standard template for creating  *
 * log entries on geocaching.com. Copy or delete the lines starting   *
 * with "thisTextarea.value +=" so you have enough to enter your      *
 * message. Use the "\n" at the end of every line to end the line and *
 * start at the next line.                                            *
 *                                                                    *
 * Published under the following license:                             *
 * Creative Commons Attribution-Noncommercial-Share Alike 3.0         *
 * http://creativecommons.org/licenses/by-nc-sa/3.0/us/               *
 *                                                                    *
 **********************************************************************
 * aug 28, 2009    - Preserve existing textarea content               *
 *                 - Added Items discovered                           *
 **********************************************************************/
 
var allTextareas, thisTextarea;
allTextareas = document.getElementsByTagName('textarea');
for(var i = 0; i < allTextareas.length; i++) {
    thisTextarea = allTextareas[i];
    thisTextarea.value += '\n';
    thisTextarea.value += '<STORY>\n';
    thisTextarea.value += '\n';
    thisTextarea.value += 'Time: \n';
    thisTextarea.value += 'Items in: \n';
    thisTextarea.value += 'Items out: \n';
    thisTextarea.value += 'Items discovered: \n';
    thisTextarea.value += '\n';
    thisTextarea.value += 'Who: <TEAM MEMBERS PRESENT>\n';
}
