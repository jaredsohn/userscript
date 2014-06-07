// ==UserScript==
// @name          Outlook Style for Gmail
// @namespace     http://userstyles.org
// @description   Tag panel resizeable
// @author        gcq

// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://*.mail.google.com/*
// @include       https://*.mail.google.com/*
// @include       https://mail.google*

// @version       4.0.0
// @grant         none

// @run-at document-end
// ==/UserScript==

(window.onload = function () {
    
    var css_w8 = "*\n{\n    box-shadow: none !important;\n    border-radius: 0px !important;\n    text-shadow: none !important;\n    font-family: 'Segoe UI', 'Open Sans' !important;\n    font-size: 12px !important;\n}\n\nhtml\n{\n    border: none !important;\n}\n\nbody\n{\n    color: #333333;\n    font-family: 'Segoe UI', 'Open Sans' !important;\n}\n\ntable\n{\n    border-collapse: collapse;\n}\n\ninput\n{\n    font-size: 12px !important;\n}\n\n.acts, .thead\n{\n    background: #f7f7f7 !important;\n}\n\n.fs input\n{\n    color: #333333 !important;\n    border: 1px solid #333 !important;\n    background: #0072C6;\n    background-color: #0072C6;\n}\n\n/* Login */\n\n.header .logo\n{\n    display: none;\n}\n\n.google-header-bar\n{\n    background-color: #0072C6 !important;\n    color: #FFFFFF !important;\n}\n\n.google-header-bar:before\n{\n    font-family: 'Segoe UI Light', 'Open Sans Light', 'Segoe UI', 'Open Sans' !important;\n    font-weight: 300 !important;\n    color: #FFFFFF;\n    content: \"Gmail\";\n    float: left;\n    margin-top: 5px;\n    margin-left: 44px;\n    font-size: 4em;\n}\n\n#link-signup\n{\n    background: #FFFFFF !important;\n    color: #0072C6 !important;\n    text-shadow: none !important;\n    font-weight: normal !important;\n    text-transform: none !important;\n}\n\n#link-signup:hover,\n#link-signup:focus\n{\n    border: 1px solid #666666 !important;\n}\n\n.product-info\n{\n    display: none;\n}\n\n.sign-in\n{\n    float: none !important;\n    margin: 0px auto !important;\n    width: 400px !important;\n    background: none !important;\n}\n\n.signin-box\n{\n    border: none !important;\n    background: none !important;\n}\n\n.signin-box h2\n{\n    font-family: 'Segoe UI Light', 'Open Sans Light', 'Segoe UI', 'Open Sans' !important;\n    font-weight: 300 !important;\n    font-size: 3em !important;\n    color: #0072C6 !important;\n    text-transform: lowercase;\n}\n\n.signin-box h2 strong\n{\n    background: none !important;\n}\n\n.signin-box input[type=email],\n.signin-box input[type=password]\n{\n    border: 1px solid #aaa !important;\n    width: 100% !important;\n    margin: 0px !important;\n    color: #666666 !important;\n    padding: 0px 4px 0px 4px !important;\n}\n\n.signin-box input[type=email]:hover,\n.signin-box input[type=password]:hover,\n.signin-box input[type=email]:focus,\n.signin-box input[type=password]:focus\n{\n    box-shadow: none !important;\n    border: 1px solid #666 !important;\n    color: #333333 !important;\n}\n\n.signin-box label,\n.email-label,\n.passwd-label\n{\n    display: none !important;\n}\n\n.signin-box input[type=submit]\n{\n    float: right;\n    margin: 0px !important;\n    background: #0072C6 !important;\n    font-weight: normal !important;\n}\n\n.signin-box div.email-div\n{\n    margin-bottom: 10px !important;\n}\n\n.signin-box div.passwd-div\n{\n    margin-bottom: 3em !important;\n}\n\n.signin-box label.remember\n{\n    width: 70% !important;\n    margin-top: 0px !important;\n    margin-bottom: 4px !important;\n    float: left;\n    display: inline-block !important;\n    color: #333333 !important;\n}\n\n.signin-box .remember-label\n{\n    color: #333333 !important;\n}\n\n.signin-box ul\n{\n    display: block !important;\n}\n\n.signin-box ul li a\n{\n    color: #0072C6 !important;\n}\n\n.google-footer-bar\n{\n    background: #FFFFFF !important;\n    border-top: 1px solid #ccc !important;\n}\n\n.google-footer-bar select\n{\n    height: 20px !important;\n}\n\n/* Interface */\n\n#gbx1, #gbx2\n{\n    border: none !important;\n}\n\n#gbz,\nli.gbt,\nli.gbto,\n#gbz .gbzt,\n#gbz .gbgt,\n.gbz01 .gbts,\n .gbmtc, .gbmtc .gbmt\n{\n    font-size: 12px !important;\n    font-weight: normal !important;\n    text-shadow: none !important;\n}\n\n#gbz .gbto .gbts, #gbd .gbmt\n{\n    font-weight: normal !important;\n}\n\n.gbto, .gbm\n{\n    box-shadow: none !important;\n}\n\n.gbm\n{\n    border: 1px solid #ccc !important;\n}\n\n.gbto .gbts\n{\n    border-color: #2d2d2d !important;\n}\n\n.gbmtc .gbmt-hvr\n{\n    color: #ffffff !important;\n    background: #0072C6 !important;\n}\n\n.gbmh\n{\n    border-top: 1px solid #ccc !important;\n}\n\n#gbx1\n{\n    background: #0072C6 !important;\n}\n\nimg#gbqld\n{\n    display: none !important;\n}\n\na.gbqla, a.gbqla2\n{\n    text-decoration: none !important;\n}\n\na.gbqla2:before\n{\n    content: \"Gmail\";\n    text-decoration: none !important;\n    font-size: 4em !important;\n    font-family: 'Segoe UI Light', 'Open Sans Light', 'Segoe UI', 'Open Sans' !important;\n    font-weight: 300 !important;\n    color: #fff !important;\n}\n\n.gbqfqw, .gbqfqw-hvr\n{\n    box-shadow: none !important;\n    border: 1px solid #fff !important;\n    border-radius: 0px !important;\n}\n\nbutton#gbqfb\n{\n    min-width: 24px !important;\n    margin: 0px !important;\n}\n\n.T-I\n{\n    font-weight: normal !important;\n}\n\n.T-I-ax7, .T-I-ax7:active\n{\n    background: #eeeeee !important;\n    box-shadow: none !important;\n}\n\n.J-N\n{\n    border: 1px solid transparent !important;\n}\n\n.J-N-JT\n{\n    color: #fff !important;\n    background: #0072C6 !important;\n    border: 1px solid #0072C6 !important;\n    padding-bottom: 5px !important;\n}\n\n.J-N-JT .J-N-Jz\n{\n    color: #fff !important;\n}\n\n.gbqfi\n{\n    margin: 0px !important;\n    padding: 0px !important;\n}\n\n.b8 .vh, .cc .vh, .cd .vh, .vX .vh\n{\n    box-shadow: none !important;\n    border: 1px solid #fff !important;\n    background: #fff !important;\n    color: #333 !important;\n}\n\n#gbg6 #gbi4t, #gbg4 #gbgs4d\n{\n    height: 30px !important;\n    margin-top: -4px !important;\n    color: #fff !important;\n    font-size: 2em !important;\n    font-family: 'Segoe UI Light', 'Open Sans Light', 'Segoe UI', 'Open Sans' !important;\n    font-weight: 300 !important;\n}\n\n#gbi1a.gbid, #gbi1a.gbid:active\n{\n    border: none !important;\n    background: #fff !important;\n    box-shadow: none !important;\n}\n\n#gbi1.gbids, .gbgt-hvr #gbi1.gbids, #gbg1:focus #gbi1.gbids, #gbg1:active #gbi1.gbids\n{\n    color: #0072C6 !important;\n    font-weight: normal !important;\n}\n\n#gbgs3, #gbgs3:active\n{\n    border: none !important;\n    background: #fff !important;\n    box-shadow: none !important;\n}\n\n/* Leftnavi */\n\n.nM\n{\n    z-index: 4 !important;\n}\n\n.aeN\n{\n    background: #eee !important;\n    margin-top: -6px !important;\n}\n\n.aki\n{\n    padding-bottom: 10px !important;\n}\n\n.akh, .akh:hover\n{\n    \n    padding-left: 4px !important;\n    margin: 0px !important;\n}\n\n.aki div:hover\n{\n    border: none !important;\n}\n\n.akh span,\n.akh:hover span\n{\n    color: #0072C6 !important;\n    font-size: 12px !important;\n    padding: 0px !important;\n    margin: 0px !important;\n}\n\n.asT-asx:before\n{\n    color: #0072C6 !important;\n    content: \"Â»\";\n    float: left !important;\n    margin-top: -13px !important;\n}\n\n.asT-asx\n{\n    background: none !important;\n}\n\n.aj9\n{\n    margin-top: 0px !important;\n}\n\n.ajl\n{\n    margin-top: 0px !important;\n}\n\n.z0\n{\n    margin-left: -3px !important;\n    padding: 0px !important;\n    padding-left: 23px !important;\n    margin-right: -5px !important;\n}\n\n.z0:hover\n{\n    background: #ddd !important;\n}\n\n.aic, .MX\n{\n    margin: 0px !important;\n    margin-bottom: 10px !important;\n    padding: 5px !important;\n    z-index: 1000 !important;\n}\n\n.oo\n{\n    margin-right: 0px !important;\n}\n\n.MX .T-I-KE\n{\n    margin-left: 20px !important;\n}\n\n.T-I-KE, .T-I-KE:focus\n{\n    margin: 0px !important;\n    padding: 0px !important;\n    min-width: 30px !important;\n    font-size: 16px !important;\n    font-weight: 600 !important;\n    background: none !important;\n    color: #0072C6 !important;\n    border: none !important;\n    box-shadow: none !important;\n    cursor: pointer !important;\n}\n\n.T-I-JW\n{\n    border: none !important;\n}\n\n.ain\n{\n    border-left: 4px solid #ddd !important;\n    padding: 5px !important;\n    padding-left: 10px !important;\n    background: #ddd !important;\n}\n\n.aim\n{\n    padding: 5px !important;\n    padding-left: 10px !important;\n}\n\n.aim:hover, .aim:focus\n{\n    background: #ddd !important;\n}\n\n.air\n{\n    border: none !important;\n}\n\n.NQ, .aij\n{\n    background: none !important;\n}\n\n.nZ.TO .n0\n{\n    color: #333333 !important;\n}\n\n.n6\n{\n    padding: 5px !important;\n    margin-left: 22px !important;\n}\n\n.n4\n{\n    padding: 0px !important;\n    margin: 0px !important;\n}\n\n.aj5.J-KU-Jg\n{\n    border: none !important;\n    border-top: 1px solid #eee !important;\n    background: #eee !important;\n    margin: 0px !important;\n    width: 100% !important;\n}\n\n.G-atb\n{\n    border-bottom: 0px solid #eee !important;\n}\n\n/* Right */\n\n.aeH\n{\n    border-bottom: 1px solid #eee !important;\n}\n\n.ar4\n{\n    margin-left: 5px !important;\n}\n\n.T-I\n{\n    margin: 0px !important;\n}\n\n.T-I-ax7\n{\n    border: none !important;\n    background: none !important;\n    margin: 0px !important;\n    min-width: 20px !important;\n}\n\n.ar4 .SK, .jQjAxd .SK\n{\n    border: none !important;\n    box-shadow: none !important;\n}\n\n.SK.ZF-zT\n{\n    z-index: 5000 !important;\n    background: #fff !important;\n    display: block !important;\n}\n\n.J-JN-I-JW\n{\n    border: 1px solid transparent !important;\n}\n\n.vh\n{\n    margin: 1px 0 !important;\n}\n\n/* Mails */\n\n.yO\n{\n    background: none !important;\n    color: #333 !important;\n}\n\n.xY\n{\n    border-bottom: 1px solid #eee !important;\n}\n\n.yW, .xW\n{\n    color: #666 !important;\n}\n\n.aHU\n{\n    border-top: 1px solid #eee !important;\n}\n\nh1.ha span.hP\n{\n    font-family: 'Segoe UI Light', 'Open Sans Light', 'Segoe UI', 'Open Sans' !important;\n    font-weight: 300 !important;\n    font-size: 2.5em !important;\n    color: #333 !important;\n}\n\n.J-M, .J-M-JJ\n{\n    border: 1px solid #ccc !important;\n    box-shadow: none !important;\n}\n\n.aki .J-M\n{\n    display: block !important;\n    border: 1px solid #ccc !important;\n    font-size: 12px !important;\n    top: 5px !important;\n    padding: 0px !important;\n    border: none !important;\n    background: #eee !important;\n    left: 5px !important;\n}\n\n.aki .J-M .J-N\n{\n    padding: 5px !important;\n    display: inline-block !important;\n    border: 1px solid #ccc !important;\n    margin: 3px !important;\n    font-weight: normal !important;\n    background: #fff !important;\n    color: #333 !important;\n}\n\n.aki .J-M .J-N:hover\n{\n    background: #0072C6 !important;\n    border: 1px solid #0072C6 !important;\n}\n\n.ii a, .e, .sA, .r4 .e, .a1P, .ri, .rd, .x2\n{\n    color: #0072C6 !important;\n    text-decoration: none !important;\n}\n\n.anQ span\n{\n    font-family: 'Segoe UI Light', 'Open Sans Light', 'Segoe UI', 'Open Sans' !important;\n    font-weight: 300 !important;\n    font-size: 1.4em !important;\n}\n\n.iw span.gD, .iw span.go\n{\n    font-family: 'Segoe UI Light', 'Open Sans Light', 'Segoe UI', 'Open Sans' !important;\n    font-weight: 300 !important;\n    font-size: 1.8em !important;\n}\n\ndiv.ajB\n{\n    border: 1px solid #ccc !important;\n}\n\n.kv .Bk .G2\n{\n    border-bottom: 1px solid #eee !important;\n    background: #f7f7f7 !important;\n}\n\n.Bk .G2\n{\n    border-color: #eee !important;\n}\n\n.G3\n{\n    border-top: 1px solid #eee !important;\n}\n\n.G2\n{\n    border-top: none !important;\n    border-bottom: none !important;\n}\n\n.kQ\n{\n    border-bottom: 1px solid #eee !important;\n}\n\n.iq\n{\n    border-top: 1px solid transparent !important;\n}\n\n.nr, .dI, .Ar, .p0\n{\n    border: 1px solid #ccc !important;\n}\n\n.am6\n{\n    border: none !important;\n}\n\n.u5\n{\n    display: none !important;\n}\n\n.IG, .iN\n{\n    border: 1px solid transparent !important;\n}\n\n.oL\n{\n    padding: 8px 1px 0 2px !important;\n}\n\n.oL span\n{\n    font-family: 'Segoe UI Light', 'Open Sans Light', 'Segoe UI', 'Open Sans' !important;\n    font-weight: 300 !important;\n    font-weight: normal !important;\n    font-size: 1.4em !important;\n}\n\n.oj .nr, .oj .nr:focus\n{\n    border: 1px solid transparent !important;\n}\n\n.aDj, .aDh\n{\n    border: 1px solid transparent !important;\n    background: none !important;\n}\n\n.gU\n{\n    background: none !important;\n}\n\n.T-I-atl\n{\n    border: 1px solid #0072C6 !important;\n    background: #0072C6 !important;\n}\n\n.gB\n{\n    border-top: 1px solid #eee !important;\n}\n\n.ii p,\n.ii div,\n.ii p span,\n.ii a\n{\n    line-height: 150% !important;\n    font-size: 14px !important;\n}\n\n.l2\n{\n    padding-top: 20px !important;\n    padding-bottom: 20px !important;\n}\n\n.md, .ma, .l3, .l6, .ae3\n{\n    color: #999 !important;\n}\n\n.l8, .l9\n{\n    color: #666 !important;\n    text-decoration: none !important;\n}\n\n.l6\n{\n    padding-top: 0px !important;\n}\n\n/* New */\n\n.Io\n{\n    background: #0072C6 !important;\n    height: 40px !important;\n}\n\n.Io .aDk, .Hp\n{\n    font-family: 'Segoe UI Light', 'Open Sans Light', 'Segoe UI', 'Open Sans' !important;\n    font-weight: 300 !important;\n    font-size: 1.8em !important;\n    font-weight: normal !important;\n}\n\n.Hy .m, .Hy .n, .Hy .k, .Hy .o\n{\n    background: #0072C6 !important;\n}\n\n.Hy .k, .Hp\n{\n    height: 40px !important;\n}\n\n.Ap .Ar\n{\n    border: none !important;\n}\n\n/* Misc */\n\n.b8 .J-J5-Ji .vh\n{\n    margin-top: 23px !important;\n}\n\n.Kj-JD-Jl .J-at1-atl,\n.Kj-JD-Jl .J-at1-atl:hover\n{\n    background-image: -moz-linear-gradient(center top, #0072C6, #0072C6) !important;\n    border: 1px solid #0072C6 !important;\n}\n\n.Kj-JD-Jl button,\n.Kj-JD-Jl button:hover\n{\n    background-image: -moz-linear-gradient(center top, #ccc, #ccc) !important;\n    border: 1px solid #ccc !important;\n}\n\n.Kj-JD-K7 span\n{\n    font-family: 'Segoe UI Light', 'Open Sans Light', 'Segoe UI', 'Open Sans' !important;\n    font-weight: 300 !important;\n    font-size: 1.6em !important;\n}\n\n.UI .TB\n{\n    border-bottom: none !important;\n}\n\n.TB .TC\n{\n    font-family: 'Segoe UI Light', 'Open Sans Light', 'Segoe UI', 'Open Sans' !important;\n    font-weight: 300 !important;\n    font-size: 2em !important;\n}\n\n.gbm\n{\n    border: 1px solid #ccc !important;\n    border-top: none !important;\n}\n\n.gbps\n{\n    font-family: 'Segoe UI Light', 'Open Sans Light', 'Segoe UI', 'Open Sans' !important;\n    font-weight: 300 !important;\n    font-size: 1.6em !important;\n    font-weight: normal !important;\n}\n\na.gmlb\n{\n    color: #0072C6 !important;\n}\n\n.gbqfb, .gbqfb-hvr\n{\n    border: 1px solid transparent !important;\n    background-image: -moz-linear-gradient(center top, #0072C6, #0072C6) !important;\n    padding: 3px !important;\n}\n\na.gbqfb, a.gbqfb-hvr\n{\n    padding: 0px 10px 0px 10px !important;\n    background: #0072C6 !important;\n}\n\n.gbmpala, .gbqfbb, .gbqfbb-hvr\n{\n    font-family: 'Segoe UI', 'Open Sans' !important;\n    font-weight: normal !important;\n    box-shadow: none !important;\n}\n\n.T-ays\n{\n    background: #333 !important;\n    border: none !important;\n    font-weight: normal !important;\n}\n\nh2.dt\n{\n    font-size: 3em !important;\n    font-family: 'Segoe UI Light', 'Open Sans Light', 'Segoe UI', 'Open Sans' !important;\n    font-weight: 300 !important;\n}\n\n.fZ, .f1\n{\n    padding: 8px 8px !important;\n}\n\n.f0\n{\n    font-size: 1.2em !important;\n    font-weight: normal !important;\n}\n\n.f1 .f0\n{\n    color: #0072C6 !important;\n}\n\n.ya\n{\n    border-bottom: none !important;\n}\n\n.bodycontainer hr\n{\n    display: none;\n}\n\nfont[size='+1'] b\n{\n    font-family: 'Segoe UI Light', 'Open Sans Light', 'Segoe UI', 'Open Sans' !important;\n    font-weight: 300 !important;\n    font-size: 3em !important;\n}\n\nfont[size='-1'] b\n{\n    font-family: 'Segoe UI Light', 'Open Sans Light', 'Segoe UI', 'Open Sans' !important;\n    font-weight: 300 !important;\n    font-size: 2em !important;\n}\n\n/* Firefox ablak: Windows 8 scrollbars */\n/* Original: Ziz4rD - http://userstyles.org/users/82707 */\n\nscrollbar {\n-moz-appearance: none !important;\nborder: none !important}\n\nscrollbar {\n    background: #EFEFEF !important}\n\nscrollbar thumb {\n    -moz-appearance: none !important;\n    border: 1px solid #CDCDCD !important;\n    background: #CDCDCD !important;\n    background-clip: padding-box !important;\n    -moz-transition: ease-in .2s !important}\n\nscrollbar thumb:not(:active):hover {\n    border-color: #A6A6A6 !important;\n    background-color: #A6A6A6 !important;\n    background-clip: padding-box !important}\n\nscrollbar thumb:hover:active,\nscrollbar thumb:active\nscrollbar thumb[active=\"true\"] {\n    border-color: #606060 !important;\n    background: #606060 !important;\n    background-clip: padding-box !important}\n\nscrollbar scrollbarbutton, \nscrollbar gripper, \nscrollcorner {\n    -moz-appearance: none ! important;\n    border: 1px solid #F0F0F0 !important;\n    background: #F0F0F0 !important;\n    -moz-transition: ease-in .2s !important}\n\nscrollbar[orient=\"vertical\"] > scrollbarbutton {\n    min-height: 17px !important;\n    max-height: 17px !important;\n    min-width: 15px !important;\n    max-width: 15px !important}\n\nscrollbar[orient=\"horizontal\"]  > scrollbarbutton {\n    min-height: 15px !important;\n    max-height: 15px !important;\n    min-width: 17px !important;\n    max-width: 17px !important}\n\nscrollbar[orient=\"vertical\"] > scrollbarbutton[type=\"decrement\"] {\n    background-image: -moz-image-rect(url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAH5JREFUOE+VklEOgDAIQ+H+h0YhKRYmzn0YJ6zMvk7MTPCo6r18vr/WReRCFot4ex3k9RBCwG+vx4YmRi2b2ECNELG49eapm7+ZfTC0xf9fip14UmUYDKT7xEEljjeKPLBExQCm3CBmnyXDnV/OuVyAoxMZ+bHHJNVuykTa6xcJJaLYp5QRSwAAAABJRU5ErkJggg==\"), 0 ,50% ,50%, 0) !important;\n 	background-repeat: no-repeat !important;\n 	background-position: 3px 6px !important}\n\nscrollbar[orient=\"vertical\"] > scrollbarbutton[type=\"increment\"] {\n    background-image: -moz-image-rect(url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAH5JREFUOE+VklEOgDAIQ+H+h0YhKRYmzn0YJ6zMvk7MTPCo6r18vr/WReRCFot4ex3k9RBCwG+vx4YmRi2b2ECNELG49eapm7+ZfTC0xf9fip14UmUYDKT7xEEljjeKPLBExQCm3CBmnyXDnV/OuVyAoxMZ+bHHJNVuykTa6xcJJaLYp5QRSwAAAABJRU5ErkJggg==\"), 0 ,100% ,50%, 50%) !important;\n 	background-repeat: no-repeat !important;\n 	background-position: 3px 3px !important}\n\nscrollbar[orient=\"horizontal\"] > scrollbarbutton[type=\"decrement\"] {\n    background-image: -moz-image-rect(url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAH5JREFUOE+VklEOgDAIQ+H+h0YhKRYmzn0YJ6zMvk7MTPCo6r18vr/WReRCFot4ex3k9RBCwG+vx4YmRi2b2ECNELG49eapm7+ZfTC0xf9fip14UmUYDKT7xEEljjeKPLBExQCm3CBmnyXDnV/OuVyAoxMZ+bHHJNVuykTa6xcJJaLYp5QRSwAAAABJRU5ErkJggg==\"), 50% ,50% ,100%, 0) !important;\n 	background-repeat: no-repeat !important;\n 	background-position: 6px 3px !important}\n\nscrollbar[orient=\"horizontal\"] > scrollbarbutton[type=\"increment\"] {\n    background-image: -moz-image-rect(url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAH5JREFUOE+VklEOgDAIQ+H+h0YhKRYmzn0YJ6zMvk7MTPCo6r18vr/WReRCFot4ex3k9RBCwG+vx4YmRi2b2ECNELG49eapm7+ZfTC0xf9fip14UmUYDKT7xEEljjeKPLBExQCm3CBmnyXDnV/OuVyAoxMZ+bHHJNVuykTa6xcJJaLYp5QRSwAAAABJRU5ErkJggg==\"), 50% ,100% ,100%, 50%) !important;\n 	background-repeat: no-repeat !important;\n 	background-position: 3px 3px !important}\n\nscrollbar[orient=\"vertical\"] > scrollbarbutton[type=\"decrement\"]:not([disabled=\"true\"])[active=\"true\"] {\n    background-image: -moz-image-rect(url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAG9JREFUOE+lUlsOwDAI6v0v7dpmGlRwH/to+iAQwC4zW7D2Md0RS+dKOkQkK6FQdwLuR7QKxRuCrs5EGjaqvnmpGyeyEmrWZFu2RtpNRVViLYd1cDlf43C8CUpAWI2c0or4QW2wLNuY/3fGKSt18wAwQp1/uBFHOAAAAABJRU5ErkJggg==\"), 0 ,50% ,50%, 0) !important}\n\nscrollbar[orient=\"vertical\"] > scrollbarbutton[type=\"increment\"]:not([disabled=\"true\"])[active=\"true\"] {\n    background-image: -moz-image-rect(url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAG9JREFUOE+lUlsOwDAI6v0v7dpmGlRwH/to+iAQwC4zW7D2Md0RS+dKOkQkK6FQdwLuR7QKxRuCrs5EGjaqvnmpGyeyEmrWZFu2RtpNRVViLYd1cDlf43C8CUpAWI2c0or4QW2wLNuY/3fGKSt18wAwQp1/uBFHOAAAAABJRU5ErkJggg==\"), 0 ,100% ,50%, 50%) !important}\n\nscrollbar[orient=\"horizontal\"] > scrollbarbutton[type=\"decrement\"]:not([disabled=\"true\"])[active=\"true\"] {\n    background-image: -moz-image-rect(url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAG9JREFUOE+lUlsOwDAI6v0v7dpmGlRwH/to+iAQwC4zW7D2Md0RS+dKOkQkK6FQdwLuR7QKxRuCrs5EGjaqvnmpGyeyEmrWZFu2RtpNRVViLYd1cDlf43C8CUpAWI2c0or4QW2wLNuY/3fGKSt18wAwQp1/uBFHOAAAAABJRU5ErkJggg==\"), 50% ,50% ,100%, 0) !important}\n\nscrollbar[orient=\"horizontal\"] > scrollbarbutton[type=\"increment\"]:not([disabled=\"true\"])[active=\"true\"] {\n    background-image: -moz-image-rect(url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAG9JREFUOE+lUlsOwDAI6v0v7dpmGlRwH/to+iAQwC4zW7D2Md0RS+dKOkQkK6FQdwLuR7QKxRuCrs5EGjaqvnmpGyeyEmrWZFu2RtpNRVViLYd1cDlf43C8CUpAWI2c0or4QW2wLNuY/3fGKSt18wAwQp1/uBFHOAAAAABJRU5ErkJggg==\"), 50% ,100% ,100%, 50%) !important}\n\nscrollbar > scrollbarbutton[disabled=\"true\"] {\n    opacity: .5 !important}\n\nscrollbar > scrollbarbutton:not([disabled=\"true\"]):hover {\n    border-color: #DBDBDB !important;\n    background-color: #DBDBDB !important;\n    background-clip: padding-box !important}\n\nscrollbar > scrollbarbutton:not([disabled=\"true\"]):hover:active,\nscrollbar > scrollbarbutton:not([disabled=\"true\"])[active=\"true\"]  {\n    -moz-appearance: none ! important;\n    border-color: #606060 !important;\n    background-color: #606060 !important;\n    background-clip: padding-box !important}";
    var css_invert = "html {transform: rotate(180deg);}";
    
    var applyCSS = function ( style ) {
        var css = document.createElement( "style" );
        css.type = "text/css";
        css.innerHTML = style;
        document.head.appendChild( css );
    };
    
    var getValue = function () {
        if ( typeof( Storage ) === "undefined" ) {
            console.log( "No localstorage. Navegador muy viejo, no se puede recuperar el valor" );
        } else {
            return parseInt( localStorage.panelwidth );
        }
    };
    
    var setValue = function ( value ) {
        if ( typeof( Storage ) === "undefined" ) {
            console.log( "No localstorage. Navegador muy viejo, no se puede guardar  el valor" );
        } else {
            localStorage.panelwidth = value;
        }
    };
    
    var updatePixel = function ( pixel ) {
        var el = document.getElementsByClassName( "no" )[1];
        var lefty = el.children[0];
        var righty = el.children[1];
        
        //Ancho panel
        lefty.style.width = pixel + "px";
        
        //Ancho cuerpo
        var originalWidth = el.dataset.originalWidth;
        if ( !originalWidth ) {
            var originalWidth = parseInt( righty.style.width.substring( 0, righty.style.width.indexOf("p") ) );
            el.dataset.originalWidth = originalWidth;
        }
        righty.style.width = originalWidth - pixel + 200 + "px";
        
        //Ancho barra menus
        document.querySelectorAll( ".aeH" )[0].style.width = window.innerWidth - pixel - 190 + "px";
    };
    
    var update = function ( value ) {
        console.log( value );
        if ( value < 267 ) {
            value = 267;
        }
        updatePixel( value );
        document.getElementById( "display" ).innerHTML = document.getElementsByClassName( "no" )[1].children[0].style.width;
        setValue( value );
    };
    
    var addGUI = function () {
        var display = document.createElement( "span" );
        display.id = "display";
        display.style.fontSize = "x-small";
        display.onclick = function () {
            var val = prompt( "Introdueix un valor", getValue() );
            
            if ( !isNaN( val ) ) {
                update( parseInt( val ) );
            } else {
                alert( "El valor ha de ser un número!" );
            }
        };
        
        var less = document.createElement( "div" );
        less.id = "less_btn";
        /*
        less.className = "J-J5-Ji amD T-I-awG amE T-I-ax7 T-I-Js-IF T-I-JE L3";
        less.style.width = "34px";
        less.style.textAlign = "center";
        less.style.lineHeight = "27px";
        less.style.borderRadius = "2px";
        less.innerHTML = '<img class="amI T-I-J3" style="vertical-align:middle;" src="images/cleardot.gif"></img>';
        */
        less.innerHTML = "<";
        less.style.display = "inline";
        less.style.paddingLeft = "7px";
        less.onclick = function () { update( getValue() - 1 ); };
        
        var more = less.cloneNode();
        more.id = "more_btn";
        //more.innerHTML = '<img class="amJ T-I-J3" style="vertical-align:middle;" src="images/cleardot.gif"></img>';
        more.innerHTML = ">";
        more.onclick = function () { update( getValue() + 1 ); };
        
        var container = document.createElement( "div" );
        container.id = "btn_container";
        container.style.cssFloat = "right";
        container.appendChild( display );
        container.appendChild( less );
        container.appendChild( more );
        
        var bar = document.getElementsByClassName( "z0" )[0];
        bar.appendChild( container );
        

    };
    
    var setEmailListDate = function () {
        setInterval( function () {
            //Normal
            Array.prototype.forEach.call( document.querySelectorAll('.xW > span'), function ( el ) {
                var inner = el.dataset.inner;
                if ( !inner ) {
                    var inner = el.innerHTML;
                    el.dataset.inner = inner;
                }
                var title = el.title;
                if ( el.innerHTML.indexOf( ":" ) === -1 ) {
                    el.innerHTML = inner += " " + title.slice( title.lastIndexOf( "," ) + 2 );
                    el.style.fontSize = "smaller";
                }
            });
            
            //Labs vista previa
            Array.prototype.forEach.call( document.querySelectorAll('.apm > span'), function ( el ) {
                var inner = el.dataset.inner;
                if ( !inner ) {
                    var inner = el.innerHTML;
                    el.dataset.inner = inner;
                }
                var title = el.title;
                if ( el.innerHTML.indexOf( ":" ) === -1 ) {
                    el.innerHTML = inner += " " + title.slice( title.lastIndexOf( "," ) + 2 );
                    el.style.fontSize = "smaller";
                }
            });
        }, 1000);
    };
    
    var setEmailSingleDate = function () {
        setInterval( function () {
            Array.prototype.forEach.call( document.querySelectorAll('.g3'), function ( el ) {
                el.innerHTML = el.title;
            });
        }, 1000);
    };
    
    var setEmailDate = function () {
        setEmailListDate();
        setEmailSingleDate();
    };
    
    //MAIN//
    
    //anadimos interface
    addGUI();
    
    //si es la primera vez que se usa, valor por defecto
    if ( isNaN( getValue() ) ) { setValue( 400 ); }
    
    //actualizar ancho
    update( getValue() );
    
    //anadir fecha completa a emails
    setEmailDate();
    
    //anadimos CSS
    //applyCSS( css_w8 );
    
})();