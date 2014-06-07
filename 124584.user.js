// ==UserScript==
// @name        Golightly Gmail Cleanup
// @version      1.0.0
// @description  Cleaned up Gmail
// @author       Fred Golightly
// @include        *mail.google*
// ==/UserScript==

/* Use in addition to Minimalist Everything's Gmail module */

.aeV {display: none;} /* Hide storage text */
.aj5.J-KU-Jg {display: none;} /* Hide switcher thing */
.TI .aCH, .TI .TJ {display :none;} /* Hide hangout chat button, chat avatar */
.aeS {display: none;} /* Hide chat splitter thin line */
.G-atb {border-bottom :none !important;} /* Hide top thin line */
.if {margin: 0 !important;} /* email interior space */
.iv {margin-top: -4px;} /* Push reply/more top-right box snug into corner */
.z0 {opacity: .3;} .z0:hover {opacity: .9;} /* Compose, :hover opacity */

.w-as1.nr {opacity: .3;} .w-as1.nr:hover, .w-as1.nr:focus {opacity: .9;} /* search box & focus opacity */
[act="19"], [act="7"], [act="9"], [act="10"], [gh="s"] {opacity: .3;} [act="19"]:hover, [act="7"]:hover, [act="9"]:hover, [act="10"]:hover, 
[gh="s"]:hover {opacity: .9;} /* Toolbar & settings button, :hover opacity */

.ar5 .T-I-Js-IF,.ar5 .T-I-Js-Gs,.adF .T-I-Js-IF,.adF .T-I-Js-Gs {opacity: .3;} /* Navigate button opacity */
.ar5 .T-I-Js-IF:hover,.ar5 .T-I-Js-Gs:hover,.adF .T-I-Js-IF:hover,.adF .T-I-Js-Gs:hover {opacity: .9;}  /* Navigate button, :hover opacity */
.Di .amH, .adl {opacity: .3;} .Di .amH:hover, adl:hover{opacity: .9;} /* Count, :hover opacity */

.Gn .l2 {padding: 0 !important; margin: 0 !important;} /* Remove space below reply box */
.l2 {padding-bottom: 0 !important;}
.aeF {margin-bottom: 10px;} /* email bottom space */
.x .d2 {display: none;} /* Hide Try new compose message */