// ==UserScript==
// @name           LDRize Mibuffer load-script command
// @namespace      http://ido.nu/kuma/
// @description    Add load-script command to Minibuffer which creates script tag to load specified script into arbitrary page.
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

var DEBUG_TRACE = 0;
var SCRIPT_VERSION = '2007.12.10';

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

var LoadScript = {
        minibufferCommand: {
                "load-script": function (stdin) {
                        return this.args.map( function (uri) {
                                var s = document.createElement('script');
                                s.setAttribute("src", uri);
                                s.setAttribute("type", "text/javascript; version=1.7");
                                document.body.appendChild(s);
                                trace("load", uri , s);
                                return s;
                        } );
                }
        }
};

// run if in greasemonkey.
if ( typeof GM_log != 'undefined' ) {
        if ( window.Minibuffer ) {
                window.Minibuffer.addCommand( LoadScript.minibufferCommand );
        }
}