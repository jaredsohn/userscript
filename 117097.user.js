/*************************************************************************************************
 *                                                                                               *
 *                                           yMailTo                                             *
 *                                          =========                                            *
 *                                     by Brenton Simpson                                        *
 *                                brenton@theillustratedlife.com                                 *
 *                      Licensed to the public under the Creative Commons                        *
 *                               Attribution - ShareAlike license                                *                                                                                               *
 *                                                                                               *
 *************************************************************************************************
 *                                                                                               *
 *  Notes                                                                                        *
 * =======                                                                                       *
 * -JavaScript starts its arrays at 0 instead of 1, so splitlink[0] is mailto and splitlink[1]   *
 *  is the eMail address                                                                         *
 * -You can customize this script to work with any webmail provider by changing the value of     *
 *  'yMailTo' to match your webmail provider.                                                    *
 * -This script is open source.  You may do whatever you like with it provided that you give me  *
 *  (and any future contributors) due credit and distribute the result only under the same open  *
 *  source license.  See http://creativecommons.org/licenses/by-sa/2.5 for more information.     *
 * -If you find this script useful, I would appreciate hearing from you:                         *
 *         brenton@theillustratedlife.com                                                        *
 * -As always, tips are appreciated.  They help keep the student loan fairy from biting me! =D   *
 *  PayPal: tips@slipabuck.com (Please mention my name to make sure your tip finds me. =) )      *
 * -Thanks much and enjoy the show!                                                              *
 *                                                                                               *
 *       -Brenton                                                                                *
 *       brenton@theillustratedlife.com (eMail)                                                  *
 *       tips@slipabuck.com (PayPal)                                                             *
 *                                                                                               *
 *************************************************************************************************
 *                                                                                               *
 *  Version History                                                                              *
 * =================                                                                             *
 *  rev. 1  - Brenton Simpson - brenton@theillustratedlife.com                                   *
 *  rev. 1.1 - harvest316 (Paul Harvey)
 *                                                                                               *
 *************************************************************************************************/

// ==UserScript==
// @name          FastMailTo
// @namespace     http://theillustratedlife.com/free/ymailto
// @description   Forces all mailto links to open in FastMail Beta or the service of your choice
// @license       http://creativecommons.org/licenses/by-sa/2.5
// @include       *
// ==/UserScript==

var allLinks, a, eMail, splitlink, prefix;
var yMailTo = 'http://beta.fastmail.fm/mail/?MSignal=MC-FromName*U-1*'
allLinks = document.evaluate('//*[@href]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i=0; i<allLinks.snapshotLength; i++) {
    a = allLinks.snapshotItem(i);
    eMail="";
    splitlink=a.href.split(":");
    prefix=splitlink[0];
    if (prefix=="mailto"){
        eMail=splitlink[1];
        eMail=eMail.replace("?subject=","%3Fsubject%3D"); //Handles mailto:me?subject=hi
        a.href=yMailTo+eMail;
    }
}