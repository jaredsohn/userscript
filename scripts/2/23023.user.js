// ==UserScript==
// @name           GC Hide Disclaimer
// @namespace      Geocaching
// @description    Hides the annoying disclaimer on the cache pages
// @include        http://www.geocaching.com/seek/cache_details.aspx?id=*
// @include        http://www.geocaching.com/seek/cache_details.aspx?guid=*
// ==/UserScript==

/**********************************************************************
 * Script:   GC Hide Disclaimer                                       *
 * Version:  20080220                                                 *
 * Author:   Marcel de Haas                                           *
 * Email:    marcel@dehaas.dds.nl                                     *
 *                                                                    *
 * This script hides the annoying disclaimer on the cache pages.      *
 *                                                                    *
 * Published under the following license:                             *
 * Creative Commons Attribution-Noncommercial-Share Alike 3.0         *
 * http://creativecommons.org/licenses/by-nc-sa/3.0/us/               *
 **********************************************************************/

document.getElementById('DisclaimerText').style.visibility = 'hidden'; 