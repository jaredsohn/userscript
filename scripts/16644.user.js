// ==UserScript==
// @name           LDRize Mibuffer autopagerize.siteinfo command
// @namespace      http://ido.nu/kuma/
// @description    add autopagerize.siteinfo command to Minibuffer.
// @include        *
// ==/UserScript==
//
/*
# Version: MPL 1.1/GPL 2.0/LGPL 2.1
#
# The contents of this file are subject to the Mozilla Public License Version
# 1.1 (the "License"); you may not use this file except in compliance with
# the License. You may obtain a copy of the License at
# http://www.mozilla.org/MPL/
#
# Software distributed under the License is distributed on an "AS IS" basis,
# WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
# for the specific language governing rights and limitations under the
# License.
#
# The Initial Developer of the Original Code is
# KUMAGAI Kentaro <ku0522a*gmail.com>
# Portions created by the Initial Developer are Copyright (C) 2007
# the Initial Developer. All Rights Reserved.
#
# Contributor(s):
#   brazil http://d.hatena.ne.jp/brazil/
#
# Alternatively, the contents of this file may be used under the terms of
# either the GNU General Public License Version 2 or later (the "GPL"), or
# the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
# in which case the provisions of the GPL or the LGPL are applicable instead
# of those above. If you wish to allow use of your version of this file only
# under the terms of either the GPL or the LGPL, and not to allow others to
# use your version of this file under the terms of the MPL, indicate your
# decision by deleting the provisions above and replace them with the notice
# and other provisions required by the GPL or the LGPL. If you do not delete
# the provisions above, a recipient may use your version of this file under
# the terms of any one of the MPL, the GPL or the LGPL.
#
# ***** END LICENSE BLOCK *****
*/

var SCRIPT_VERSION  = '2007.12.17';
var SCRIPT_URL      = "http://userscripts.org/scripts/show/16644";


var DEBUG_TRACE = 0;

function trace() {

        if ( (typeof DEBUG_TRACE != 'undefined') && ! DEBUG_TRACE )
                return;

        var fn;
        if ( typeof Firebug == 'undefined' ) {
                fn = console;
        } else if ( Firebug && Firebug.Console && Firebug.Console.log  ) {
                fn = Firebug.Console;
        }

        if ( fn ) {
                if ( arguments.length == 1 ) {
                        fn.log(arguments[0]);
                } else {
                        var args = [];
                        for (var i = 0; i < arguments.length; i++) {
                                args.push(arguments[i]);
                        }
                        fn.log(args);
                }
        }
}

try {
        window.Minibuffer.addCommand( {
                'autopagerize.siteinfo': function (stdin) {
                        var ap = eval("ap", window.AutoPagerize.addFilter);
                        if ( !ap ) {
                                return;
                        }
                        var appliedSiteinfo = ap.info;
                        if ( typeof ap.info.url  == 'undefined' ) {
                                ap.info.url = 'MICROFORMAT';
                        }
                        return ap.info;
                }
        } );
} catch (e) {
        trace(e);
}