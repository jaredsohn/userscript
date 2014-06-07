// ==UserScript==
// @name           KOC Throne Room & Champ Organizer
// @version        20140514
// @namespace      mmm
// @homepage       https://userscripts.org:8080/scripts/show/424415
// @delay 2000
// @priority -10
// @include        *.kingdomsofcamelot.com/*main_src.php*
// @include        *kabam.com/kingdoms-of-camelot/play*
// @resource       jqcss http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css
// @updateURL      https://userscripts.org:8080/scripts/source/424415.meta.js
// @downloadURL    https://userscripts.org:8080/scripts/source/424415.user.js
// @icon  https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/briton_chair_normal_1.png
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// @grant       unsafeWindow
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_log
// @grant       GM_registerMenuCommand
// @grant       GM_getResourceText
// @grant       GM_getResourceURL
// @description    Organizes, upgrades and salvages KOC throne room and champion items
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=TJ9YQ8S75HFEL
// ==/UserScript==


/*
 * Modified by Ne0 of Glessic429
 *
 * 2014-03-23 : added pets, unselect all & select all buttons, updated for lvl 17, fixed 'next' in upgrade screen, fixed 6 slot cards posting, added filter by throne type
 * 2014-04-15 : added update dropdown to choose updating by Userscripts or Google Code, removed the donate button for now
 * 2014-04-18 : removed stats tabs to reduce memory, as most found they didn't use them;
 *              added a 'compare' feature which allows the user to take 2 tr cards and pull them up side by side to compare the stats (more work will be done on this feature)
 * 2014-04-19 : added 'preset #' to the throne room post to chat display so you know which # of throne room item you're displaying
 * 2014-04-29 : integrated champion organizer functions to give users 2 for 1 organizer tool
 *              added donate button in the options tab, for those who care to donate
 * 2014-04-30 : added "remove all tags" from throne and champ organizer context menu (more tag stuff will be coming soon)
 *            : minor glitch with the update dropdown selection
 * 2014-05-01 : added level 6 (miraculous) auto-enhancing
 * 2014-05-02 : added a news section so users can see what is new in the latest update
 *            : added a throne room caps tab that retrieves caps directly from the game
 *            : added a jewel inventory so you can see how many of each type of jewel you have
 * 2014-05-03 : added preset tagging
 *            : added options for changing preset tag colors and general tag colors
 * 2014-05-04 : added the ability to equip your throne items based on the tagged items from that preset #
 *            : added the ability to unequip all your throne items in a selected preset
 * 2014-05-05 : fixed glitch where tagging would cause multiple borders around card, eventually hiding it, if it was tagged a lot
 *            : fixed code for loading champ salvager settings from another domain (thought i already did that, oops!)
 *            : added quality filter to throne organizer
 *            : changed filtering to checked list boxes in throne organizer to flow more aesthetically pleasing
 *            : option given to show or hide the local presets section in throne organizer, giving some people more viewing room if they choose
 * 2014-05-06 : enhanced and renamed the jewel inventory section to be like the other organizers with filtering (no sorting yet)
 * 2014-05-07 : fixed glitch for enhance/upgrade button which stuck in endless loop and crashed browser (only since miraculous was released)
 * 2014-05-10 : fixed glitch for upgrader scrolling through queued items
 *            : added saving/loading of throne/champ salvage rules
 *            : combined both champ/throne action log into 1 complete log
 *            : additional option given to show or hide the local presets section in the options tab
 *            : added throne preset naming, so no you will be able to define your type of throne room preset
 *            : post to chat will also post the name of your throne preset
 * 2014-05-12 : added using protection stones, orbs and tokens when enhancing/upgrading throne room items
 * 2014-05-13 : TEMPORARILY DISABLED USE TOKENS FEATURE UNTIL I CAN FIX A GLITCH I FOUND
 * 2014-05-14 : fixed NON-EXISTENT glitch, bad case of "fuzzy eyes"
 *            : added user defined upgrade/enhance levels for when using stones/tokens/orbs
 *            : updated userscripts links to include 8080 so people can access them again, but i still recommend google code
*/
var Version = '20140514';


var OrganizerPopUpTopClass = 'orgPopTop';
var OrganizerTitle= 'Throne Room & Champ Organizer (v' + Version + ')';
var OrganizerHeaderSize = '10%';
var OrganizerWindowWidth = '800px';
var OrganizerWindowHeight = '400px';
var OrganizerOpacity = 1.0;
var OrganizerButtonLabel = "Throne/Champ";
var OrganizerMaxTRLevel = 17;
var OrganizerMaxCHLevel = 10;

var Table_Scale_TR_Organizer = 0.47;
var Table_Scale_CH_Organizer = 0.47;
var Table_Scale_TR_Compare = 1.0;

var userscriptssite_name = 'Userscripts';  //option value 0
var userscriptssite = 'http://userscripts.org:8080/scripts/source/424415.user.js';
var googlecodesite_name = 'Google Code'; //option value 1
var googlecodesite = 'https://ne0-kocbot.googlecode.com/svn/trunk/424415.user.js';

var scriptpage = userscriptssite

var prefix = 'org';

var ResetAll = false;
var DEBUG_TRACE = false;

/*
* Modifiedd from object.watch polyfill
*
* 2012-04-03
*
* By Eli Grey, http://eligrey.com
* Public Domain.
* NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
*/

//This version has been updated to allow more than one updater

function contentEval(source) {
    // Check for function input.
    if ('function' == typeof source) {
        // Execute this function with no arguments, by adding parentheses.
        // One set around the function, required for valid syntax, and a
        // second empty set calls the surrounded function.
        source = '(' + source + ')();'
    }

    // Create a script node holding this  source code.
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = source;

    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.
    document.body.appendChild(script);
    document.body.removeChild(script);
}


function addWatchFunctions() {
//  object.watch
    if (!Object.prototype.multiWatch) {
        Object.defineProperty(Object.prototype, "multiWatch", {
            enumerable: false,
            configurable: true,
            writable: false,
            value: function (prop, watcher) {
                var obj = this,
                oldval = this[prop],
                newval = oldval,
                getter = function () {
                    return newval;
                },
                setter = function (val) {

                    oldval = newval;

                    for (var f=0; f < obj.watchers[prop].length; f++) {
                        obj.watchers[prop][f](prop, oldval, val);
                    }
                    newval = val;
                    return newval;
                };

                if (delete obj[prop]) { // can't watch constants
                    Object.defineProperty(this, prop, {
                        get: getter,
                        set: setter,
                        enumerable: true,
                        configurable: true
                    });

                    if (!obj.watchers) obj.watchers = {};

                    if (!obj.watchers[prop]) obj.watchers[prop] = [];

                    // check for duplicates
                    for (var i=0; i < obj.watchers[prop].length; i++){
                        if(obj.watchers[prop][i] === watcher){
                            return;
                        }
                    }

                    //obj.watchers[prop].push( eval(watcher)); //add the new watcher in the watchers array
                    obj.watchers[prop].push(watcher);
                }

            }
        });
    }

//  object.unwatch
    if (!Object.prototype.multiUnwatch) {
        Object.defineProperty(Object.prototype, "multiUnwatch", {
            enumerable: false,
            configurable: true,
            writable: false,
            value: function (prop, watcher) {
                var obj = this;

                // if a watcher is supplied, just remove it 
                if(arguments.length == 2) {
                    for(var i=0; i < obj.watchers[prop].length; i++){
                        var w = obj.watchers[prop][i];

                        if(w == watcher) {
                            obj.watchers[prop].splice(i, 1);
                        }
                    }
                } else {
                    obj.watchers[prop] = [];
                }

                if (obj.watchers[prop].length == 0 )
                {
                    delete obj.watchers[prop];
                    var val = this[prop];
                    delete this[prop]; // remove accessors
                    this[prop] = val;
                }
            }
        });
    }
}

//add the new functions to the main window
contentEval(addWatchFunctions);

//add the new functions to this script
addWatchFunctions();

var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON;

var URL_CASTLE_BUT = "data:image/png;base64,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";
var URL_CASTLE_BUT_SEL = "data:image/png;base64,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";
var success_image = "data:image/png;base64,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";
var up_img ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAaCAYAAACkVDyJAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3AgRBjoxAQevPgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAEWUlEQVRIx+2Vb2iVZRTAf+d53/tv2929m3d3a9NN55AMFG0RKhUF9aEEoX0I0rCS0HS0UkEpMJAUSxti/sn6VH0QpI/Wl0CyIhkhzbJ/rsScOXX/t7vt/nvf5/ThbrNlxjKDgg6c5zwHnvf83nOew3ng3y7xTd9M9Vu+++dgZVu/ntxHVny7puHLDgEo3/b9tGOYm8py65nW7KAe6H/f2wZAKDjtb2VagI3tDO5dDEBsy1ePusYceTAQCx9ntDtvWDm0ff7xW5rhJGxze4P1dXdtIhx+bFVc68rdJCqvlG8/Ww0wY2fHrStp2abTRb6vr5VFgw0mXsS+tkGZnXA0UeIstSo7AETM3weWtpwCwPP956IRpymSLKUrrdqdsgyM5plf6RIJytMzdv64qfelBhK7zt08sLT5C4bfuIvSllNLAg6vxqpipEMh9RUZyihXBjxxjdX6hIuItCZ2nVvW++JcKnaf/+vA6LNtDB+8m+iGtkqsfhSbUYxUxjXrqQjg+Up/yuNCb17qywzJYgcfjib3nK/s2TKHRGvn9IHRdSdJHV5CfF1bkbUcjZeGorHbq7U/h8h4X6sqmZzSl/Lp6M7RONPVsogzM+9zINnaGendXDt9YOqtZQDkle3RkLkv0VinPeqKg045p1YZSVv6hj0uDuTkzmqHSNA0+aprq/d0SsXezumXtHjtyRWO+s11S+ulN1gkonbqAVVQxVplcMzSM+wzmvV1QaVjRHg977KoZ2MtFfsu3hhY8tRnBbvm81rx7L76hdWRnni5qur1f6SFDLHg+4XSXh7yJeKq1sUdF5Fjyf2/FPc8P4vkwUvXA4tXf8LIO/dS8uSnAdQeSlaXzs7NrVbPyB9OI51Y1KJWyXlKX8rj6rAnc2Ki0ZDUoBy97d2r0t1cQ/LQld9nqBPrnnA4sDzWOEfHgkFBb1Bz1UkYqqhV0lnL1SGf/jFfFle6qshyO2p3AHRvqKLq8JUCsPiJE4y+dz9Fq08843t2/bx75tIfLcHaPxm2EyXV394njKQtXYMeIxmPpTUuGV+bKw9fbipMbnMtXnjlx4sckQ8al8yq6byjHuspiCAKNptHszlsOo/N5NFMDm8oTa5rABNywTWI62BcB1xDKOSSLAswOxHQtBeQH4b0zKjVpr71lT8ZgKLHj5fHI+6rax+oqnnk4XpFIRwQwi6EXAgHDCF3QmXShh0IOxBxhIgz7ruCAcaylpGMlRcWFuu8EXdBIuW8/NCRgSLZf+xn4yMtCnv7UnnO5gK0pwTHCGIERFBrwSr443dmFc37+GMZTMBBnEKGGAOOQZyCLYk4LCoP037Skhs2DI7qKrezNysVsWDu9IWRSx+e7k97KmCkEMQx1/auAWOuBXcM4rpgDSCFl0IFUQEVUOgfhYvpLDrT4PXYIhzjuF39WT+Tt292dKXfTuctgYAD45lhxlVMwR9XnXi5dWrXCjKlycw424mAJMBT9flf/vPyKztX7pN6V2XmAAAAAElFTkSuQmCC";  
var up_glow="data:image/png;base64,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";
var down_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAaCAYAAACkVDyJAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3AgRBwUywRK+jwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAEi0lEQVRIx+1WXWwUVRT+zrl3drfbdne73e2Wv1WQYDQxwd9UjIiJ0ScfJDEENGp8ofwIgcpviGI0Gk2AaFIEYvwBwyMPRsJTI1FDkYithRCUtkChS7vd0t1u9292Zo4P0xYLrVQTEk38kpk7dyZzvnO+79yZC/yP/zropV0dCFcb1Hohqzp6czAMBSgGMYM0A0wgViBNADNIsftc3bgG0/icePSeIrBSECawwXDyBGuAbD0z7FXRoGflYM7afiFZKFgCwBGAxB0BgBxAGBABREDj6f45dYLcVM1YGLsAWCn4MURbdTziFRvkeXR+YNa8WAV+Mw20ZQmKCcTkBnIc923bgThuIlK2YeeLYFaj1bkKQAlICaAIVRXAwrAXbSccmMOMdE5sAgD/8pZwwO85vPzx6HOxJffKvksgD4+mKYCYNpyiCadQhlM0IcUyrEwe5d7rYK8GaTV6MGAokFLw+xXitQaaHgrL7mNFumI7h+KzVeO4KL4V3y1URN8+3DBnVs/98+BYAhC5ypbKkNIYYRlSNGFlCjATQ2CvBjSDtAJrBWiG16tRV2Pg7oghBcug8xk5k3Nk6eCqWCcDQOXLx1E8/HS7KOw8dfKKObMvBVIkt205dr2jMfmZoBUjWMmoDygRUvTTQDlTEnvn4KpYZ/3+JBgAcl8vQeUrx5E/uOQzpfnT33/sQjg7AmZgSlbCqMcuKYjADFRVMGaGNKp8Gq29FnyKmvsbZxxx7XHAEyK4503FYvlo5vRF8pumTOhETOxKEI83FjGhwsuIBRXCfiVt/RYR5ChX8g4AqNvbh77G+huEuYNPoeq1HzDy1eIyiFcnE8OXPF0J0o7IFAWOVueSejShtlojFtByMSOULUkvCMuuvRqTuuZeJFfXj7swjpEvn3THz5/oEc3ruzsShWj6OhHR1JIyoBShtlphRlBJwSK6nLYtiDyffGN2LvrxFSTXzJpg+6TIHVj0jU2q+XJrt0TMvAjxJJISmAkhPyMaUKj0KjrTbzsieNOw0B7d04OB9XNu6bNbUL3yBADAILydLTnfp05fpihZYt9kKDGhqoJRG9CYU+ORXxI2CqZzRBEdSGyKy8CG+KSNfQuy+xehuvEk0vsb8sxYlh4uZTPnExT2QMYcJSL4PK6UC+o8OH3VoqGCfdVQWJtsihciu3qmXEmTIruvAYE1p5Dd29APpmczgzlIf5q8mkQAaEUIV2vcFTGke8hBMmdDAcuSm+b2Rz+6iFRT/O8RAsBw82MIrPsZw588crJsY2umL4OKUokUQYI+Qn2NFsth6k5ZEJGm1LZ7TkQ+6MLA5rn4i+U7PdRsbPeXHedQOORbGp0dRKW2EVWWtF+zaTAvX6R3Lng98n4nUtvn3/bjNC0M7V6YV4q2DGXNTiedx/qGkFxK2ZQasVuZZAcAiDi3/wFPhyy0oQ3pPQ8CAIKbf31BMx9+xgj6WpBLlhkrMu/c13JHtgc1WzrcBLac2cWLz+bD2869BQDh97qmHYP/CXH6wweavCFaG35RvwsAKJl3bhMU2nh24nzduX/3ru0PInfZcM1Vy/MAAAAASUVORK5CYII=";
var down_glow = "data:image/png;base64,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";
var gbtn_img = "data:image/png;base64,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";
var remove_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAABo6AAAaOgG4MgkwAAAAB3RJTUUH3AgSBikNXTI9xQAABK5JREFUaN7t2F2IXHcZx/HPMzM7m81usktC1JJELSSNWEEvOilSbNGLBuldfaFe9KZUrBdKLwIKCiJK9UpBqGClvQoFi60v6I2geOGF3dHYqqmGtKWGqmvK7izZNd3dmTmPF+fM7pZEyE52t6XMDw7nzGH+L9/ze57/GyONNNJII4000khvX7WHKDO7je3HdsLMlhU2kzuT+4I7cDMauJScxc9qPI1Oi3xLgLTRwlmix7HkU8GXY8y+xiRjB6hNlY0UK3QX6C2Xz8mTwWNBu8WVWZx8M0AGDbcZTx4oeLgx7pbpD7H/I3LiVpqHRH0vkfT/S/c1ufoSy7Ni8SyvL1gKztT4bosLNwITNwIxy2TwaMF9kzcZP/IFOdmisU+ooSv1hD76UiH0KJblystcekbMtWWD55OHTvLssDBxA2E1jh8U3D99WBz/HrWZsqNZyOgJBXpUILJPbNwzCzH/tLzwK8Z4AZ9ulffdAaly4vPJd6bfqXnihyIDqzL6pQPZIwYgxdUw68B7xMJP5Yu/FXiqxudaLA7y73rVGCa5exwveHhqxvjxr8pcwirRF4OOvgFikyvxRqDIvjxwmzj8H/75N59InsGPdtyRWSRfqdd889j9cvqkyF7pRG7qqGKTE90NkM3X5v+vdeSLvxbLS87X+ECrxN8ZRyryJr40fZTJI1gkeiJ75eikVpJaxEoF06xa6mOtcqhXxqeiBBqriYOH5ZXzTkin8MsdBUnujJp9+98jG12RndKN6Fedfx4vlaG2Pt1F1dIkprCngovKlRVcZmqxnE1XOL0bIJ8ZazCxH0tEV+Qq8fc6f66zltSvLqSLDhY2vUNkd/CYE0STXOWurfZrmNC6Y2ycZgqL0oqIPzX4+EN8+166a9dXUb3OxYucPi06HYiojMohcncYR95bq1FfQV/4IzrB+27hYx/dWmXnztFsrhsUZKMC2g1HGlEQS/gXXsPYpljZiorimqPoroDgUtF1U//f1OcGHxKXLzM3x9oWQmt+/iqYPjlMaA0zj/xivOaeYw25d60ccSOCo0c5dOhaX/n/tBwl9Pnzsttd78wFskPcvsW+DZMjP+8W7llZY2/VeGaKixfL5B1euUKsloj/2Grh2hAFflxguVyFZG7P7ixjUlyZkqvl70d3HASd5MnBxB1Vlg+z1ctBPL1b9G6TnaYo6AWP7yhItWjM4LHXWbpUrkoiy3dbgknV7PdhGXez1KezQPJIi4X2ToK0NkaIdnBmjpwvIdZhrted2Et+UsbdoluTr/xOFDwXPLGrW902x/FUlw+ewIGqrkHOXCt31gFvlh4Q8S66L8tz3xKrLNT5bKtcxu+OZjfut7f567Pkq+UaqagGgCwoqnt57ZHFMVk8qMifyO4ZxcKDirM1+Xvm23zxTTlF2XT48P6Cr+HeKRoHySlMTIraQRyWjgi3lgdDK3Wu/EF2fiM6f6FIz9X4xsCJre4Mt+U4aBPMTHIq+XqNE000J2RzhsY7hJlyxu4tsfqqWO1QdPWSR4InTlbzxrAQ235A1y4n2FMFp4O7sloADnKmypFXgu8Hj7c2FvVvnePS2SEdbRtppJFGGmmkkUZ62+p/v5QIkkqA6+0AAAAASUVORK5CYII=";
var remove_glow = "data:image/png;base64,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";

var TRupgradeData = {
        active : false,
        useLORB : false,
        useORB : false,
        useLPS : false,
        usePS : false,
        useLT : false,
        useLLT : false,
        useQuality : 5,
        useLevel : 6,
        item : 0,
        enhanceAction : false,
        enhanceItem : 0,
        enhanceMax  : 6,
        repairAll : false,
        trWinPos: {},
        activeTab: 1,
        sortSelected: "none",
        buffSelected: "both",
        sortInactive: true,
        newUpgradeState: 0
};


var CHupgradeData = {
        active : false,
        useLOM : false, 
        useGOM : false, 
        useJT : false, 
        useST : false, 
        useET : false, 
        item : 0,
        enhanceAction : false,
        enhanceItem : 0,
        enhanceMax  : 5,
        repairAll : false,
        sortSelected: "none",
        buffSelected: "both",
        sortInactive: true,
        newUpgradeState: 0
};

var TRqueueData = {
    list : [],
    oneItem : true,
    doingRepairs : false,
    index : 0,
    dataConverted : false
};

var CHqueueData = {
    list: [],
    oneItem: true,
    doingRepairs: false,
    index: 0,
    dataConverted: false
};


var GlobalOptions = {
    OrganizerUpdate: false,
    UpdateSite : 0  // userscriptssite_name
};

var GeneralOptions = {
    currentTab : null,
    WinIsOpen: false,
    localPresetHidden : false,
    disableAnim : false,
    salvageAnyCity : true,
    useAnyCity : true,
    usedCityNum : 0,
    salvageCityNum : 0,
    minStones : 100000,
    overflow : "order",
    maxStones     : 1980000,
    retryInterval : 30,
    presetWidget: true,
    whisperToMe: false,
    buffsOff: false,
    safetyOn: false,
    safetyLimit: 100000,
    removeTokens: false,
    multiUpgrade: false,
    noMassSalvage: false,
    salvageSafety: false,
    presetColor: "#FF00FF",
    tagColor: "#FF0000",
    numSafety: 40
};
   
var presetPosition = null;
var guardPosition = null;

var CHpresetData = {
        items : [],
        ids : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'],
        desc : ['Preset A', 'Preset B', 'Preset C', 'Preset D', 'Preset E', 'Preset F', 'Preset G', 'Preset H', 'Preset I', 'Preset J',
                'Preset K', 'Preset L', 'Preset M', 'Preset N', 'Preset O', 'Preset P', 'Preset Q', 'Preset R'],
        num_presets: 10,
        noTooltips : false,
        usePreset : 0,
        taggedItems: {},
};


var TRpresetData = {
        items : [],
        ids : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'],
        desc : ['Preset A', 'Preset B', 'Preset C', 'Preset D', 'Preset E', 'Preset F', 'Preset G', 'Preset H', 'Preset I', 'Preset J',
                'Preset K', 'Preset L', 'Preset M', 'Preset N', 'Preset O', 'Preset P', 'Preset Q', 'Preset R'],
        num_presets: 10,
        presetNames : ["undefined","undefined","undefined","undefined","undefined","undefined","undefined","undefined",
                       "undefined","undefined","undefined","undefined","undefined","undefined","undefined","undefined"],
        noTooltips : false,
        usePreset : 0,
        taggedItems: {},
        taggedItems01: {},
        taggedItems02: {},
        taggedItems03: {},
        taggedItems04: {},
        taggedItems05: {},
        taggedItems06: {},
        taggedItems07: {},
        taggedItems08: {},
        taggedItems09: {},
        taggedItems10: {},
        taggedItems11: {},
        taggedItems12: {},
        taggedItems13: {},
        taggedItems14: {},
        taggedItems15: {},
        taggedItems16: {}
};

var TRsalvageData = {
        salvageActive : false,
        throneSaveNum : 40,
        minQuality    : 3,
        ruleSet       : [{"type":"any","faction":"any","conditions":[{"mustHave":"true","number":"2","effect":"Range","buffType":"e","slots":[true,true,true,true,true]}]},{"type":"any","faction":"any","conditions":[{"mustHave":"true","number":"2","effect":"Troop Training Speed","buffType":"e","slots":[true,true,true,true,true]}]},{"type":"banner","faction":"any","conditions":[{"mustHave":"true","number":"2","effect":"Siege Range","buffType":"e","slots":[true,true,true,true,true]}]}],
        numSalvagedItems : 0,
        numSalvagedItems2 : 0,
        numSalvaged   : {0: 0, 1: 0, 2:0, 3:0, 4:0, 5:0, 6:0},
        upgradeFirst  : false,
        upgradeFirstQual : 2,
        upgradedToDelete : [],
        upgradeManual : false
};

var CHsalvageData = {
        salvageActive : false,
        champSaveNum : 40,
        minQuality    : 3,
        ruleSet       : [],
        numSalvagedItems : 0,
        numSalvagedItems2 : 0,
        numSalvaged   : {0: 0, 1: 0, 2:0, 3:0, 4:0, 5:0, 6:0},
};

var n = new Date();
TRsalvageData.since = n.valueOf();
CHsalvageData.since = n.valueOf();

var Seed = unsafeWindow.seed;
var Tabs = {};
var uW = unsafeWindow;
var CM = unsafeWindow.cm;
var Cities = {};

var OrganizerStartupTimer = null;

var OrganizerDisplayTimer = null;

function OrganizerStartup (){

    if (!unsafeWindow.cm) return;

    if (uW.trLoaded) return;

    var metc = getClientCoords(document.getElementById('main_engagement_tabs'));
    if (metc.width==null || metc.width==0){
        OrganizerStartupTimer = setTimeout (OrganizerStartup, 1000);
        return;
    }

    uW.trLoaded = Version;

    readGeneralOptions();
    TRreadUpgradeData();
    CHreadUpgradeData();


    if (GeneralOptions.usedCityNum && GeneralOptions.usedCityNum > Seed.cities.length -1 ) GeneralOptions.usedCityNum = 0; 
    if (GeneralOptions.salvageCityNum && GeneralOptions.salvageCityNum > Seed.cities.length -1 ) GeneralOptions.salvageCityNum = 0;

    TRreadSalvageData();
    TRreadQueueData();
    TRreadPresetData();
    CHreadSalvageData();
    CHreadQueueData();
    CHreadPresetData();


    logit ("Throne/Champ room organizer loaded");

    installHandlerFunctions();

    var styles = '.xtab {padding-right: 5px; border:none; background:none; white-space:nowrap;}';
        styles += '.xtabBR {padding-right: 5px; border:none; background:none;}';
        styles += '.tagBorder { margin-right: -100%; margin-bottom: -100%; height: 72%; width: 72%; padding: 4%; border: 3px solid ' + GeneralOptions.tagColor + '; background: transparent;}';
        styles += '.presetBorder { margin-right: -100%; margin-bottom: -100%; height: 72%; width: 72%; padding: 4%; border: 3px solid ' + GeneralOptions.presetColor + '; background: transparent;}';
        styles += 'div.greenBorder2 {position: absolute; }';
        styles += '.semi_transparent { zoom: 1; filter: alpha(opacity=60); opacity: 0.6;}';
        styles += '.rot45 { transform: rotate(-45deg); -ms-transform: rotate(-45deg); -webkit-transform: rotate(-45deg); -o-transform: rotate(-45deg); -moz-transform: rotate(-45deg); -moz-transform-origin: 100% 100%; z-index: 10;}';
        styles += 'div.cardOverlay { font: cracked; font-size:3.5em; position: absolute; left: 0%; top: 50%; color: red; text-align: center; text-shadow: 2px 2px 4px #000;}';
        styles += 'body table.trMainTab tbody tr td {background: transparent;}';
        styles += 'table.trTabdef { height: 0px;}';
        styles += 'body table.chMainTab tbody tr td {background: transparent;}';
        styles += 'table.chTabdef { height: 0px;}';
        styles += '.trCardDisp { display: static;}';
        styles += 'table.trTabDef thead {background: transparent;}';
        styles += 'table.orgPopMain tbody tr td,th {background: transparent;}';
        styles += 'table.trTabDef tbody tr td {background: transparent; height: 0px; }';
        styles += 'table.trTab tr td, th { border: 1px solid brown;}';
        styles += '#org_footer {height: 50px; background: url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/dialog_740_r3_c1.jpg") scroll no-repeat center bottom;}';
        styles += '#org_footer { background-size: cover; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; }';
        styles += 'table.trTab tr td,th {border:none; background:none; padding: 0px}';
        styles += 'table.trTab#trDisplayTable tr th { border: 3px solid grey; font-size:1.2em; }';
        styles += 'table.trTabLined tbody tr td {border-bottom:1px solid gray; padding: 2px 5px; }';
        styles += 'table.trOptions tr td,th {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}';
        styles += 'table.trSrchResults tr td,th {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}';
        styles += 'table.trTabSome tr td,th {border:none; background:none; padding: 1px 3px; white-space:nowrap;}';
        styles += 'table.trTabPad tr td,th { padding-left: 2px; background: none;}';
        styles += 'table.trTabPad2 tr td,th { padding-left: 20px; background: none;}';
        styles += '.trDetLeft {padding:0 5px 0 0 !important; font-weight:bold; text-align:right}';
        styles += '.trStat {border:1px solid; border-color:#000000; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff ; background-color:#357;  -moz-border-radius:5px;}';
        styles += '.trentry {padding: 7px; white-space:nowrap;}';
        styles += 'table.chTabDef thead {background: transparent;}';
        styles += 'table.chTabDef tbody tr td {background: transparent; height: 0px; }';
        styles += 'table.chTab tr td, th { border: 1px solid brown;}';
        styles += 'table.chTab tr td,th {border:none; background:none; padding: 0px}';
        styles += 'table.chTab#chDisplayTable tr th { border: 3px solid grey; font-size:1.2em; }';
        styles += 'table.chStatTab tr td { background-color: #ffffff; white-space:nowrap; padding:5px; border-bottom:solid black 1px;}';
        styles += 'table.chStatTab tr td:last-child { border-right:solid black 1px; }';
        styles += 'table.chStatTab tr:first-child th { border-top:solid black 1px; }';
        styles += 'table.chStatTab tr td.td0 { background-color: white; }';
        styles += 'table.chStatTab tr td.td1 { background-color: #eeeeee; }';
        styles += 'table.chStatTab tr td.td2 { background-color: white; }';
        styles += 'table.chStatTab tr th {border:solid black 1px; border-top: none; background-color: #357; color: white; white-space:nowrap; padding:5px}';
        styles += 'table.chStatTab tr:last-child td:first-child, table.trStatTab tr:last-child th:first-child { -moz-border-radius-bottomleft:10px; -webkit-border-bottom-left-radius:10px; border-bottom-left-radius:10px}';
        styles += 'table.chStatTab tr:last-child td:last-child, table.trStatTab tr:last-child th:last-child { -moz-border-radius-bottomright:10px; -webkit-border-bottom-right-radius:10px; border-bottom-right-radius:10px}';
        styles += 'table.chStatTab tr:first-child th:first-child { -moz-border-radius-topleft:10px; -webkit-border-top-left-radius:10px; border-top-left-radius:10px}';
        styles += 'table.chStatTab tr:first-child th:last-child { -moz-border-radius-topright:10px; -webkit-border-top-right-radius:10px; border-top-right-radius:10px}';
        styles += 'table.chTabLined tbody tr td {border-bottom:1px solid gray; padding: 2px 5px; }';
        styles += 'table.chOptions tr td,th {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}';
        styles += 'table.chSrchResults tr td,th {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}';
        styles += 'table.chTabSome tr td,th {border:none; background:none; padding: 1px 3px; white-space:nowrap;}';
        styles += 'table.chTabPad tr td,th { padding-left: 2px; background: none;}';
        styles += 'table.chTabPad2 tr td,th { padding-left: 20px; background: none;}';
        styles += '.chDetLeft {padding:0 5px 0 0 !important; font-weight:bold; text-align:right}';
        styles += '.chStat {border:1px solid; border-color:#000000; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff ; background-color:#357;  -moz-border-radius:5px;}';
        styles += '.cchentry {padding: 7px; white-space:nowrap;}';
        styles += 'button::-moz-focus-inner, input[type="submit"]::-moz-focus-inner { border: none; }';
        styles += 'button::-moz-focus-inner, input[type="button"]::-moz-focus-inner { border: none; }';
        styles += '.castleBut {outline:0px; margin-left:0px; margin-right:0px; width:24px; height:26px; font-size:12px; font-weight:bold;}';
        styles += '.castleBut:hover {background-image:url("'+ URL_CASTLE_BUT_SEL +'")}';
        styles += '.castleButNon {background-image:url("'+ URL_CASTLE_BUT +'")}';
        styles += '.castleButSel {background-image:url("'+ URL_CASTLE_BUT_SEL +'")}';
        styles += 'input.trDefButOn {cursor:pointer; border:1px solid #45d183; -moz-box-shadow:inset 0px 1px 5px #3aef8b; -moz-border-radius:5px;}';
        styles += 'input.trDefButOff {cursor:pointer; border:1px solid #f61646; -moz-box-shadow:inset 0px 1px 5px #f6375f; -moz-border-radius:5px;}';
        styles += 'table.trMainTab { empty-cells: show;  }';
        styles += 'table.trMainTab tr td,th a {color:inherit }';
        styles += 'table.trMainTab tr td,th  {height:60%; empty-cells:show; padding: 0px 0px 0px 0px;  margin-top:5px; white-space:nowrap; border: 1px solid; border-style: none none solid none; -moz-border-radius:5px; }';
        styles += 'table.trMainTab tr td.spacer,th.space {padding: 0px 0px;}';
        styles += 'table.trMainTab tr th.sel,td.sel    {font-weight:bold; font-size:13px; }';
        styles += 'table.trMainTab tr th.notSel,td.notSel {font-weight:bold; font-size:13px; }';
        styles += 'tr.orgPopTop td,th { background-color:transparent; border:none; height: 21px;  padding:0px;}';
        styles += '.orgPopMain  {  -moz-box-shadow:inset 0px 0px 10px #6a6a6a; -moz-border-radius-bottomright: 20px; -moz-border-radius-bottomleft: 20px;}';
        styles += '.orgPopup  { border:3px ridge #666; opacity:'+ OrganizerOpacity +'; -moz-border-radius:25px; -moz-box-shadow: 1px 1px 5px #000000;}';
        styles += '.orgPopup { overflow-x: hide; overflow-y: hide; max-height: 900px; min-height: 300px; height: ' + OrganizerWindowHeight + ';  }';
        styles += '#org_top { background: url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/dialog_740_r2_c1.jpg") no-repeat transparent 0% 0%; }';
        styles += '#org_top { background-size: cover; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; }';
        styles += 'div.trCard {width: 200px;}';
        styles += 'div.trCard div.description>div{width:70px;height:70px; }';
        styles += 'div.trCard div.description div.briton.advisor{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/briton_advisor_normal_1.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.briton.banner{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/briton_banner_normal_1.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.briton.chair{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/briton_chair_normal_1.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.briton.table{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/briton_table_normal_1.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.briton.window{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/briton_window_normal_1.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.briton.trophy{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/briton_trophy_normal_1_5.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.briton.hero{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/briton_hero_normal_1_5.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.briton.statue{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/briton_statue_normal_1_5.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.briton.candelabrum{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/briton_candelabrum_normal_1_5.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.briton.pet{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/briton_pet_normal_1_5.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.druid.advisor{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/druid_advisor_normal_1.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.druid.banner{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/druid_banner_normal_1.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.druid.chair{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/druid_chair_normal_1.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.druid.table{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/druid_table_normal_1.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.druid.window{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/druid_window_normal_1.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.druid.trophy{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/druid_trophy_normal_1_5.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.druid.hero{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/druid_hero_normal_1_5.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.druid.statue{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/druid_statue_normal_1_5.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.druid.candelabrum{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/druid_candelabrum_normal_1_5.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.druid.pet{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/druid_pet_normal_1_5.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.fey.advisor{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/fey_advisor_normal_1.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.fey.banner{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/fey_banner_normal_1.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.fey.chair{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/fey_chair_normal_1.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.fey.table{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/fey_table_normal_1.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.fey.window{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/fey_window_normal_1.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.fey.trophy{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/fey_trophy_normal_1_5.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.fey.hero{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/fey_hero_normal_1_5.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.fey.statue{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/fey_statue_normal_1_5.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.fey.candelabrum{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/fey_candelabrum_normal_1_5.png") top left no-repeat;}';
        styles += 'div.trCard div.description div.fey.pet{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/fey_pet_normal_1_5.png") top left no-repeat;}';
        styles += 'div.trCard{font:bold 10px Georiga; overflow: hidden;}';
        styles += 'div.trCard>div{float:left;border:1px solid #a56631;margin:0px;padding:0px;width:200px; height: 300px;background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/modal/modal_med_bg_4.png") -200px 0 no-repeat;}';
        styles += 'div.trCard div.title{font:bold 14px Georgia;border-bottom:1px solid #703200;padding:4px 3px 5px 8px;background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/panel/modal/item_bg.png") -20px -100px no-repeat;}';
        styles += 'div.trCard div.title span.icon{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/modal/equip.png") top right no-repeat;display:block;height:20px;width:20px;top:12px;right:12px;position:absolute;}';
        styles += 'div.trCard .disabled{opacity:.5;}';
        styles += 'div.trCard ul{margin:0px;padding:0;list-style:none;}';
        styles += 'div.trCard li{padding:0px 0 0 0px;color:#3f2300;font-weight:bold;font-size:13px;}';
        styles += 'div.trCard div.description{overflow:hidden;border-bottom:1px solid #703200;padding:5px 0;}';
        styles += 'div.trCard div.description{overflow:hidden;border-bottom:1px solid #703200;}';
        styles += 'div.trCard div.description div.portrait{float:left;}';
        styles += 'div.trCard div.description div.portrait{border:3px solid #deaf69;margin-right:10px;}';
        styles += 'div.trCard div.description>ul{float:left;margin:3px 0 0 0;padding:0;}';
        styles += 'div.trCard div.description>ul li{padding:0;font-weight:bold;font-size:11px;text-transform:capitalize;}';
        styles += 'div.trRule {border:2px inset #c0c0c0; margin-right:10px; margin-left:10px; margin-bottom:2px; padding-left:5px; padding-bottom:5px}';
        styles += 'div.trRuleCreate {margin-right:10px; padding-right: 5px; margin-bottom:2px; padding-bottom:5px}';
        styles += 'div.trRule { background-color: #eeeeee; }';
        styles += 'input.chDefButOn {cursor:pointer; border:1px solid #45d183; -moz-box-shadow:inset 0px 1px 5px #3aef8b; -moz-border-radius:5px;}';
        styles += 'input.chDefButOff {cursor:pointer; border:1px solid #f61646; -moz-box-shadow:inset 0px 1px 5px #f6375f; -moz-border-radius:5px;}';
        styles += 'table.chMainTab { empty-cells: show;  }';
        styles += 'table.chMainTab tr td,th a {color:inherit }';
        styles += 'table.chMainTab tr td,th  {height:60%; empty-cells:show; padding: 0px 0px 0px 0px;  margin-top:5px; white-space:nowrap; border: 1px solid; border-style: none none solid none; -moz-border-radius:5px; }';
        styles += 'table.chMainTab tr td.spacer,th.space {padding: 0px 0px;}';
        styles += 'table.chMainTab tr th.sel,td.sel    {font-weight:bold; font-size:13px; }';
        styles += 'table.chMainTab tr th.notSel,td.notSel {font-weight:bold; font-size:13px; }';
        styles += 'div.chCard {width: 200px;}';
        styles += '.ChampionX .item { width: 30px; height: 30px; border: 1px solid black; display: inline-block; }';
        styles += '.ChampionX .title { position: absolute; font-size: 18px; width: 300px; text-align: center; font-weight: bold; }';
        styles += '.ChampionX .stats .name {  background: url(../img/champion_hall/champName_off.png);  width: 173px; height: 26px; position: absolute; top: 0px; left: 0px; }';
        styles += '.ChampionX .stats .name:hover {  background: url(../img/champion_hall/champName_over.png);}';
        styles += '.ChampionX .item_section { float: left;  color: #3f2300; background-color: #E7E3D6; border: 1px solid #A4753A; padding: 9px; width: 220px; font-weight: bold;  line-height: 130%; position: relative;}';
        styles += '.ChampionX .champItemHover { margin: -4px; }';
        styles += '.ChampionX .champItemHover .item_section { margin: 4px; }';
        styles += '.ChampionX .item_title .icon {  background: transparent url("../img/throne/modal/equip.png") top right no-repeat; background-size: 100% 100%; display: inline-block; height: 20px; width: 20px; top: 12px;  right: 12px;  position: absolute; }';
        styles += '.ChampionX .item_title { font-size: 14px; display: table-cell; height: 28px; vertical-align: middle; padding-right: 30px; }';
        styles += '.ChampionX .stats_item_hover { color: #94652A; }';
        styles += '.ChampionX .champ_item_hover { width: 70px; height: 70px; float: left; margin-right: 10px;}';
        styles += '.ChampionX .item_section .divider { border-bottom: 2px solid #A4753A; margin: 10px 0px 10px 0px;}';
        styles += '.ChampionX .item_section .effects { margin: 3px 0; padding: 0; list-style: none; }';
        styles += '.ChampionX .item_section .effects .effect { padding: 3px 0 0 5px; font-weight: bold; font-size: 14px; }';
        styles += '.ChampionX .item_section .effects .effect.statChamp { color: #3F2300; }';
        styles += '.ChampionX .item_section .effects .effect.statTroop { color: #1751A5; }';
        styles += '.ChampionX .item_section .effects .effect.statChamp.disabled { color: #B9A48B; }';
        styles += '.ChampionX .item_section .effects .effect.statTroop.disabled { color: #A5B1E5; }';
        styles += 'div.chRule {border:2px inset #c0c0c0; margin-right:10px; margin-left:10px; margin-bottom:2px; padding-left:5px; padding-bottom:5px}';
        styles += 'div.chRuleCreate {margin-right:10px; padding-right: 5px; margin-bottom:2px; padding-bottom:5px}';
        styles += 'div.chRule { background-color: #eeeeee; }';
        styles += 'div.blueBorder { border: 2px solid blue; }';
        styles += 'div.blueBorder2 { border: 10px solid blue; }';
        styles += 'div.yellowBorder { outline: 2px solid yellow; outline-offset:0px; }';
        styles += 'div.yellowBorder2 { outline: 10px solid yellow; outline-offset:0px; }';
        styles += '#trhammer { background-image: url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/modal/sm_hammer.png"); background-repeat: no-repeat; background-color: transparent; display: inline-block; width: 28px; height: 32px; margin: 2px; vertical-align: middle;}';
        styles += 'div.trhammer { background-image: url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/modal/sm_hammer.png"); background-repeat: no-repeat; background-color: transparent; display: inline-block; width: 28px; height: 32px; margin: 2px; vertical-align: middle;}';
        styles += 'div.trbroken { background-image: url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/modal/sm_fail_overlay.png"); background-repeat: no-repeat; background-color: transparent; display: inline-block; width: 28px; height: 32px; margin: 2px; vertical-align: middle;}';
        styles += 'div.trsuccess { background-image: url('+ success_image +'); background-repeat: no-repeat; background-color: transparent; display: inline-block; width: 28px; height: 32px; margin: 2px; vertical-align: middle;}';
        styles += 'div.trup { display=inline;  background-image: url('+ up_img +'); background-repeat: no-repeat; background-color: transparent;  width: 28px; height: 24px; }';
        styles += 'div.trup:hover { display=inline;  background-image: url('+ up_glow +'); background-repeat: no-repeat; background-color: transparent;  width: 28px; height: 24px; }';
        styles += 'div.trremove { display=inline;  background-image: url('+ remove_img +'); background-repeat: no-repeat; background-color: transparent;  width: 50px; height: 50px; }';
        styles += 'div.trremove:hover { display=inline;  background-image: url('+ remove_glow +'); background-repeat: no-repeat; background-color: transparent;  width: 50px; height: 50px; }';
        styles += 'div.trdown { display=inline;  background-image: url('+ down_img +'); background-repeat: no-repeat; background-color: transparent;  width: 28px; height: 24px; }';
        styles += 'div.trdown:hover { display=inline;  background-image: url('+ down_glow +'); background-repeat: no-repeat; background-color: transparent;  width: 28px; height: 24px; }';
        styles += 'div.trgbtn { display=inline;  background-image: url('+ gbtn_img +'); background-repeat: no-repeat; background-color: transparent;  width: 32px; height: 32px; margin: 0px; }';
        styles += 'ul#MM_throneStatList li { float: left; width: 22px; height: 22px; text-align: center; color: white; }';
        styles += 'ul#MM_throneStatList li.active { background: transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/modal/set_active.png") top left no-repeat; }';
        styles += 'ul#MM_throneStatList li.selected { background: transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/modal/set_selected.png") top left no-repeat; }';
        styles += 'ul#MM_throneStatList li.locked { background: transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/modal/set_locked.png") top left no-repeat; text-indent: -999px; }';
        styles += 'ul#MM_throneStatList li.buy { background: transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/modal/set_buy.png") top left no-repeat; text-indent: -999px; }';
        styles += '#trQueue th { text-align: center; }';
        styles += 'a.loadGPreset { border-radius:5px; border-style: solid; border-width: 3px; }';
        styles += '#chhammer { background-image: url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/modal/sm_hammer.png"); background-repeat: no-repeat; background-color: transparent; display: inline-block; width: 28px; height: 32px; margin: 2px; vertical-align: middle;}';
        styles += 'div.chhammer { background-image: url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/modal/sm_hammer.png"); background-repeat: no-repeat; background-color: transparent; display: inline-block; width: 28px; height: 32px; margin: 2px; vertical-align: middle;}';
        styles += 'div.chbroken { background-image: url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/modal/sm_fail_overlay.png"); background-repeat: no-repeat; background-color: transparent; display: inline-block; width: 28px; height: 32px; margin: 2px; vertical-align: middle;}';
        styles += 'div.chsuccess { background-image: url('+ success_image +'); background-repeat: no-repeat; background-color: transparent; display: inline-block; width: 28px; height: 32px; margin: 2px; vertical-align: middle;}';
        styles += 'div.chup { display=inline;  background-image: url('+ up_img +'); background-repeat: no-repeat; background-color: transparent;  width: 28px; height: 24px; }';
        styles += 'div.chup:hover { display=inline;  background-image: url('+ up_glow +'); background-repeat: no-repeat; background-color: transparent;  width: 28px; height: 24px; }';
        styles += 'div.chremove { display=inline;  background-image: url('+ remove_img +'); background-repeat: no-repeat; background-color: transparent;  width: 50px; height: 50px; }';
        styles += 'div.chremove:hover { display=inline;  background-image: url('+ remove_glow +'); background-repeat: no-repeat; background-color: transparent;  width: 50px; height: 50px; }';
        styles += 'div.chdown { display=inline;  background-image: url('+ down_img +'); background-repeat: no-repeat; background-color: transparent;  width: 28px; height: 24px; }';
        styles += 'div.chdown:hover { display=inline;  background-image: url('+ down_glow +'); background-repeat: no-repeat; background-color: transparent;  width: 28px; height: 24px; }';
        styles += 'div.chgbtn { display=inline;  background-image: url('+ gbtn_img +'); background-repeat: no-repeat; background-color: transparent;  width: 32px; height: 32px; margin: 0px; }';
        styles += '#chQueue th { text-align: center; }';
        styles += 'a.loadChPreset { border-radius:5px; border-style: solid; border-width: 3px; }';
        styles += 'div.indent25 {padding-left:25px}';
        styles += 'li.guardbutton { border: 4px inset Peru; display: inline; float: left; width: 31px; height: 33px; text-align: center; color: white; }';
        styles += 'li.guardbutton.active { border: 4px solid blue;}';
        styles += 'li.guardbutton:hover div.tt { visibility: visible;}';
        styles += 'li.guardbutton div.tt { visibility: hidden; border-radius: 5px 5px; -moz-border-radius: 5px; -webkit-border-radius: 5px;';
        styles += 'box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1); -webkit-box-shadow: 5px 5px rgba(0, 0, 0, 0.1); -moz-box-shadow: 5px 5px rgba(0, 0, 0, 0.1);';
        styles += 'font-family: Calibri, Tahoma, Geneva, sans-serif; font-weight: normal;';
        styles += 'position: relative; left: -30px; top: 50px;';
        styles += 'margin-left: 0; width: 200px; background-color: white; color: black;';
        styles += 'background: #FFFFAA; border: 1px solid #FFAD33; padding: 0.8em 1em;}';
        styles += '#preset_tt {margin-left: -999em; position: absolute;}';
        styles += '#preset_tt.showit { border-radius: 5px 5px; -moz-border-radius: 5px; -webkit-border-radius: 5px;';
        styles += '#preset_ch {margin-left: -999em; position: absolute;}';
        styles += '#preset_ch.showit { border-radius: 5px 5px; -moz-border-radius: 5px; -webkit-border-radius: 5px;';
        styles += 'box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1); -webkit-box-shadow: 5px 5px rgba(0, 0, 0, 0.1); -moz-box-shadow: 5px 5px rgba(0, 0, 0, 0.1);';
        styles += 'font-family: Calibri, Tahoma, Geneva, sans-serif; font-weight: normal;';
        styles += 'position: absolute; left: 400px; top: 100px; z-index: 99;';
        styles += 'margin-left: 0; width: 200px; background-color: white; color: black;';
        styles += 'background: #FFFFAA; border: 1px solid #FFAD33; padding: 0.8em 1em;}';
        styles += '#jewelCracked {height: 50px; background: url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/jewel_general_buff_cracked.jpg") scroll no-repeat center bottom;}';
        styles += '#jewelFlawed {height: 50px; background: url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/jewel_general_buff_flawed.jpg") scroll no-repeat center bottom;}';

    window.name = 'ORG';

    if (TRupgradeData.trWinPos==null ||  TRupgradeData.trWinPos.x==null || TRupgradeData.trWinPos.x=='' || isNaN(TRupgradeData.trWinPos.x)){
        var c = getClientCoords (document.getElementById('main_engagement_tabs'));
        TRupgradeData.trWinPos.x = 100;
        TRupgradeData.trWinPos.y = 100;
        TRsaveUpgradeData();
    }

    var newCSS = GM_getResourceText ("jqcss");

    GM_addStyle (newCSS);
    GM_addStyle (styles);

    // clear some styles
    var styles2 = ".orgDiag .ui-widget-content { font-size: 1.0em; background: none; border: none;}" +
    ".orgDiag.ui-widget-content { font-size: 0.95em; background: none; border: none;}" +
    ".orgDiag .ui-tabs .ui-tabs-nav li a { font-weight: bold; font-family: georgia,arial,sans-serif; color: white; font-size: 1.0em; background: url('https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/tab_unselected.png') no-repeat scroll 0% 0% transparent;}" +
    ".orgDiag .ui-tabs .ui-tabs-nav li.ui-tabs-active a {   background: url('https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/tab_selected.png') no-repeat scroll 0% 0% transparent;}" +
    ".orgDiag .ui-widget-content a { color: white;}" +
    ".orgDiag a.buttonDown20 span { color: white;}" +
    ".orgDiag .ui-widget {font-size: 1.0em;}" +
    ".orgDiag.ui-dialog .ui-dialog-title {margin: 0px; width: 100%;}" +
    ".orgDiag .ui-widget-header {background: none; border: none;}" +
    ".orgDiag .ui-state-deafault {background-color: none; }" +
    ".orgDiag .ui-widget .ui-widget {font-size: 0.9em;}" +
    ".orgDiag .ui-dialog-titlebar {text-shadow: 0px 1px 0px white; line-height: 24px; text-align: center; color: #5C3317; font: bold 1.3em Georiga;}" +
    '.orgDiag.ui-dialog .ui-dialog-titlebar-close { background-position: 0px 0px; background-image: url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/close_icon.png"); background-repeat: no-repeat; height: 20px; width: 20px; }' +
    ".orgDiag.ui-dialog .ui-dialog-titlebar-close { width: 20px; height: 20px;}" +
    ".orgDiag .ui-resizable-s { background: rgba(0,0,255,0.3);}" +
    ".orgDiag .ui-tabs .ui-tabs-nav { position: relative; top: 10px; left: 15px;}" +
    "table.trTable tbody tr td { background: none;}";
    "table.chTable tbody tr td { background: none;}";

    GM_addStyle(styles2);

    $("#mainbody").append(
            "<div id='org_dialog' class='orgPopup org_orgPopup'>"
            + '<TABLE class=trTab cellspacing=0 width=' + OrganizerWindowWidth + ' height=100%>'
            + '<tbody><TR><TD colspan=2><div width=100% height=100% valign=top class="orgPopMain org_orgPopMain" id="org_main"></div></td></tr>'
            + '<tr><td colspan=2><div id=org_footer></div></td>'
            + '</tr></tbody></table></div>');

    $("#org_dialog").css({
        "overflow-y": "hidden",
        "overflow-x": "hidden",
        "padding": '0px'
    });

    var orgPop = null;

    $("#org_dialog").dialog({
        title: OrganizerTitle,
        position: [ TRupgradeData.trWinPos.x, TRupgradeData.trWinPos.y],
        draggable: true,
        height: "auto",
        maxHeight: 2000,
        minHeight: 300,
        width: "auto",
        resizable: false,
        autoOpen: GeneralOptions.WinIsOpen,
        dragStop: function( event, ui ) {
            TRupgradeData.trWinPos.x = ui.position.left;
            TRupgradeData.trWinPos.y = ui.position.top;
            TRsaveUpgradeData();
        },
        close: function( event, ui ) {
            GeneralOptions.WinIsOpen = false;
            saveGeneralOptions();
        },
        open: function( event, ui ) {
            $("#org_dialog").parent().css('z-index', 111111 );
            if (orgPop) orgPop.focusMe();
        }
    });
    
    

    $("#org_dialog").css('max-height', '2000px');
    $("#org_dialog").parent().attr( {id: 'org_top', padding: '0px'});
    mainPop = $("#org_top")[0];
    $("div#tr_bar").css( {background: 'none', border: 'none'} );
    $("#org_top").addClass('orgDiag');

    var mainDiv = $("#org_top")[0];

    orgPop = new orgPopup('org');

    // block the copy/paste stuff added by sharethis
    var a = document.getElementsByTagName("body")[0];
    a.oncopy = function () { return true;}

    setCities();

    CM.cheatDetector.detect = foo;

    var OrganizerMainMenu = '<div>';
    OrganizerMainMenu += '<ul>';
    OrganizerMainMenu += '<li><a href="#tabs-upgradeTR">Upgrade TR</a></li>';
    OrganizerMainMenu += '<li><a href="#tabs-salvageTR">Salvage TR</a></li>';
    OrganizerMainMenu += '<li><a href="#tabs-organizeTR">Organize TR</a></li>';
    OrganizerMainMenu += '<li><a href="#tabs-compareTR">Compare TR</a></li>';
    OrganizerMainMenu += '<li><a href="#tabs-upgradeCH">Upgrade CH</a></li>';
    OrganizerMainMenu += '<li><a href="#tabs-salvageCH">Salvage CH</a></li>';
    OrganizerMainMenu += '<li><a href="#tabs-organizeCH">Organize CH</a></li>';
    OrganizerMainMenu += '<li><a href="#tabs-log">Log</a></li>';
    OrganizerMainMenu += '<li><a href="#tabs-options">Options</a></li>';
    OrganizerMainMenu += '<li><a href="#tabs-caps">TR Caps</a></li>';
    OrganizerMainMenu += '<li><a href="#tabs-organizeJL">Organize JL</a></li>';
    OrganizerMainMenu += '<li><a href="#tabs-news">News</a></li>';
    OrganizerMainMenu += '</ul>';
    OrganizerMainMenu += '<div id="tabs-upgradeTR">  UpgradeTR tab    </div>';
    OrganizerMainMenu += '<div id="tabs-salvageTR">  SalvageTR tab    </div>';
    OrganizerMainMenu += '<div id="tabs-organizeTR">  OrganizeTR tab    </div>';
    OrganizerMainMenu += '<div id="tabs-compareTR">  CompareTR tab    </div>';
    OrganizerMainMenu += '<div id="tabs-upgradeCH">  UpgradeCH tab    </div>';
    OrganizerMainMenu += '<div id="tabs-salvageCH">  SalvageCH tab    </div>';
    OrganizerMainMenu += '<div id="tabs-organizeCH">  OrganizeCH tab    </div>';
    OrganizerMainMenu += '<div id="tabs-log">  Log tab    </div>';
    OrganizerMainMenu += '<div id="tabs-options">  Options tab    </div>';
    OrganizerMainMenu += '<div id="tabs-caps">  Caps tab    </div>';
    OrganizerMainMenu += '<div id="tabs-organizeJL">  OrganizeJL tab    </div>';
    OrganizerMainMenu += '<div id="tabs-news">  News tab    </div>';
    OrganizerMainMenu += '</div>';

    $("#org_main").html(OrganizerMainMenu);

    $("#org_main").tabs({ 
        heightStyle: "content",
        active: TRupgradeData.activeTab,
        beforeActivate: function( event, ui ) {
            if (ui.oldPanel && ui.oldPanel[0]) {
                tab = findTab(ui.oldPanel[0]);
                if (tab) {
                    Tabs[tab].hide();
                }
            }
            if (ui.newPanel && ui.newPanel[0]) {
                var tab = findTab(ui.newPanel[0]);
                if (tab) Tabs[tab].show();  
            }
        }
    });

    window.addEventListener('unload', onUnload, false);

    Tabs.OrganizerOptions.init($("#tabs-options")[0]);
    Tabs.throneUpgrader.init($("#tabs-upgradeTR")[0]);
    Tabs.throneSalvage.init($("#tabs-salvageTR")[0]);
    Tabs.throneOrganizer.init($("#tabs-organizeTR")[0]);
    Tabs.throneCompare.init($("#tabs-compareTR")[0]);
    Tabs.champUpgrader.init($("#tabs-upgradeCH")[0]);
    Tabs.champSalvage.init($("#tabs-salvageCH")[0]);
    Tabs.champOrganizer.init($("#tabs-organizeCH")[0]);
    Tabs.ActionLog.init($("#tabs-log")[0]);
    //Tabs.jewelUpgrade.init($("#tabs-upgradeJL")[0]);
    //Tabs.jewelSalvage.init($("#tabs-salvageJL")[0]);
    Tabs.jewelOranizer.init($("#tabs-organizeJL")[0]);
    Tabs.Caps.init($("#tabs-caps")[0]);
    Tabs.News.init($("#tabs-news")[0]);


    $( "#org_main" ).tabs( "refresh" ); 

    AddMainOrganizerTabLink('trtab', OrganizerButtonLabel, trHideShow, trMainTab);

    TRattachTab();

    alterChampHall();

    // create a preset list on the main display.  Wait 2 seconds for the chat-on-right to fire first.
    if (GeneralOptions.presetWidget) setTimeout(buildPresetWidget,2000);

    // set the color on the tab button
    setUpgradeColor();

    OrganizerDisplayTimer = setInterval(TRupdateTimerDisp , 1000);

    ReplaceToolTips();
}

function ReplaceToolTips() {
//maparea_boosts_throneroom
    var TToldF = unsafeWindow.cm.ThroneView.boostsTooltip;

    var ThroneToolTip = function (L,E,K) {
        var J = new Array();
        var slot = L.innerHTML;

        if (L.id=="maparea_boosts_throneroom") slot = Seed.throne.activeSlot;

        J.push("<div id='boosts_tooltip'><b>Throne Room:</b><br/>");
        J.push("<b><i>(" + TRpresetData.presetNames[slot] + ")</i></b>");
        J.push("<br/>");

        var equipped_items = Seed.throne.slotEquip[slot];

        if (equipped_items.length > 0) {
            var Effects = [];
            for (var effect in unsafeWindow.cm.thronestats.effects) Effects[effect] = 0;
            var counter = equipped_items.length;
            var items = [];

            for (i=0;i<counter;i++) items.push(equipped_items[i]);

            while (items.length>0) {
                var throne_item = unsafeWindow.kocThroneItems[items.pop()];
				for (var O in throne_item["effects"]) {
					var i = +(O.split("slot")[1]);
					var id = throne_item["effects"]["slot"+i]["id"];
					var tier = parseInt(throne_item["effects"]["slot"+i]["tier"]);
					var level = throne_item["level"];
					p = unsafeWindow.cm.thronestats.tiers[id][tier];
					while (!p && (tier > 0)) { tier--; p = unsafeWindow.cm.thronestats.tiers[id][tier]; } 
					if (!p) continue; // can't find stats for tier
					if (throne_item["effects"]["slot"+i].fromJewel && (level > unsafeWindow.cm.thronestats.jewelGrowthLimit[throne_item["effects"]["slot"+i].quality])) {
						level = unsafeWindow.cm.thronestats.jewelGrowthLimit[throne_item["effects"]["slot"+i].quality]
					}
					var Current = p.base + ((level * level + level) * p.growth * 0.5);
					if (i<=parseInt(throne_item.quality)) Effects[id] += Current;
				}
            }

	        for (effect in Effects) {
		        if (Effects[effect] && (Effects[effect] != 0) && unsafeWindow.cm.thronestats["effects"][effect]) {
                    J.push("<div>" + (Math.round(Effects[effect]*100)/100) + '% ' + unsafeWindow.cm.thronestats["effects"][effect]["1"] + "</div>");
                }
	        }

        } else {
            J.push("<div>This Preset has no Items equipped</div>");
        }



        J.push("</div>");
        if(L.id=="maparea_boosts_throneroom"){
            unsafeWindow.showTooltip(J.join(""),L,E,K)
        }else{
            unsafeWindow.Tooltip.show(E,J.join(""),[10,10],null)
        }
    }

    unsafeWindow.cm.ThroneView.boostsTooltip = ThroneToolTip;
}
function alterChampHall() {
    
    
    function addMenus() {
     // new stuff
        $(".champItem").click( function() {

            var id = $(this)[0].id;

            // create a button to Auto-enhance an item
            var btn = document.createElement('a');
            $(btn).addClass("buttonv2 box green")
            .html("Auto Enhance")
            .css('color', 'yellow')
            .attr('box_num', 10)
            .bind("click", function () {
                Tabs.champUpgrader.addEnhanceItem(id);
                Tabs.champUpgrader.repaint();
                $("#contextMenu").remove();});
            $("#contextMenu div.context_menu_title").after(btn);

            // create a button to set the item to auto-update
            btn = document.createElement('a');
            $(btn).addClass("buttonv2 box green")
            .html("Auto Upgrade")
            .css('color', 'blue')
            .attr('box_num', 11)
            .bind("click", function () {
                Tabs.champUpgrader.addUpgradeItem(id);
                Tabs.champUpgrader.repaint();
                $("#contextMenu").remove();});
            $("#contextMenu div.context_menu_title").after(btn);

            // create a button to copy the stats
            btn = document.createElement('a');
            $(btn).addClass("buttonv2 box blue")
            .html("Copy Stats")
            .css('color', 'white')
            .attr('box_num', 12)
            .bind("click", function () {
                var cText = $("td#ch_card" + id).find("div.chbox").text();
                if (cText) {
                    window.prompt ("Copy to clipboard: Ctrl+C", cText);
                }
                $("#contextMenu").remove();
            });
            $("#contextMenu div.context_menu_title").after(btn);

            // create a button to post the stats
            btn = document.createElement('a');
            $(btn).addClass("buttonv2 box blue")
            .html("Post Stats to Chat")
            .css('color', 'white')
            .attr('box_num', 13)
            .bind("click", function () {
                var node = $("td#ch_card" + id);
                if (node) 
                {
                    var cText = ":::. |"+ node.find("div.item_title").text() + "||";
                    cText +=  node.find("div.stats_item_hover").html();
                    cText = cText.replace(/<br>/g, "||");

                    $.each(node.find("ul.effects ul"), function () {
                        cText = cText + "||" + $(this).text() ;
                    });

                    var table = cText.split("||");
                    for (row=1; row<=5; row++) {
                        table[table.length-6+row] = "Row " + row + ": " + table[table.length-6+row];
                    }
                    cText = table.join("||");
                    sendChat(cText);
                }
                $("#contextMenu").remove();
            });
            $("#contextMenu div.context_menu_title").after(btn);

            // create a button to "remove all tags"
            if (getObjectCollectionCount(CHpresetData.taggedItems) > 0) {
                var btn4 = document.createElement('a');
                $(btn4).addClass("buttonv2 box brown")
                .html("Remove All Tags")
                .css('color', 'white')
                .bind("click", function () {
                    Tabs.champOrganizer.removeAllTagItems();
                    $("#contextMenu").remove();
                });
                $("#contextMenu div.context_menu_title").after(btn4);
            }

            // create a button to "tag" an item
            btn = document.createElement('a');
            if ( !CHpresetData.taggedItems[id]) 
            {
                $(btn).addClass("buttonv2 box brown")
                .html("Tag Item")
                .css('color', 'white')
                .attr('box_num', 14)
                .bind("click", function () {
                    Tabs.champOrganizer.addTagItem(id);
                    $("#contextMenu").remove();});
            } else {
                $(btn).addClass("buttonv2 box brown")
                .html("Remove Tag")
                .css('color', 'white')
                .bind("click", function () {
                    Tabs.champOrganizer.removeTagItem(id);
                    $("#contextMenu").remove();});
            }
            $("#contextMenu div.context_menu_title").after(btn);



        });
    }

    function addBorders() {
        $("#itemInvetory div").removeClass('blueBorder');
        $("#itemInvetory div").removeClass('yellowBorder');

        for (ii in CHqueueData.list) {
            var list_item = CHqueueData.list[ii];
            if (!list_item) continue;
            if (list_item.status != "complete") {
                var id = list_item.item;
                if (list_item.action == "upgrade") $("div#" + id).addClass('blueBorder');
                if (list_item.action == "enhance") $("div#" + id).addClass('yellowBorder');
            }

        }

        for (ii in CHpresetData.taggedItems) {
            $("#" + ii).prepend("<div class='tagBorder'></div>");
        }  
    };
    
    
    // save link to old function
    var oldOpen = CM.ChampionModalController.open;
    //override
    CM.ChampionModalController.open = function (j) {
        oldOpen(j);
        addMenus();
        addBorders();
    }
    
    // save link to old function
    var rfi = unsafeWindow.cm.ChampionModalView.renderFilteredItems;
    // override
    unsafeWindow.cm.ChampionModalView.renderFilteredItems = function ()
    {
        // do normal stuff
        rfi();
        // new stuff
        addMenus();
        addBorders();
    };
    
    
    
};
var foo = function() {
};

function setUpgradeColor() {
    if (TRupgradeData.newUpgradeState == 0)
        $("#trtab>span").css('color', '#FFFF66');
    else if (TRupgradeData.newUpgradeState == 1)
        $("#trtab>span").css('color', 'cyan');
    else if (TRupgradeData.newUpgradeState == 2)
        $("#trtab>span").css('color', 'red');
}


var presetTimer = null;
var presetFailures = 0;

//callback handler when a preset button is presed
function processPresetClick(btn)
{
    // if there is a timer still running, kill it
    clearTimeout(presetTimer);
    
    // don't do anything if already the right preset
    if (btn == Seed.throne.activeSlot) {
        // redarw everything
        setPresetWidget(btn);
        unsafeWindow.cm.ThroneView.renderThrone();
        unsafeWindow.cm.ThroneView.renderStats();
        Tabs.throneOrganizer.show();
        //return;
    }

    // send message
    unsafeWindow.AjaxCall.gPostRequest(
            "ajax/_dispatch53.php",
            {
                ctrl: "throneRoom\\ThroneRoomServiceAjax",
                action: "setPreset",
                presetId: btn
            },
            function (v) {
                if (v.ok === true)
                {
                    presetFailures = 0;
                    // success
                    var H = Seed.throne.slotEquip[btn];
                    Seed.throne.activeSlot = btn;

                    // set the right items as equiped
                    $.each(unsafeWindow.kocThroneItems, function (I, J) {
                        C = $.inArray(J.id, H) > -1;
                        if (C) {
                            J.isEquipped = true;
                        } else {
                            J.isEquipped = false;
                        }
                    });

                    // update the buttons
                    setPresetWidget(btn);
                    unsafeWindow.cm.ThroneView.renderThrone();
                    unsafeWindow.cm.ThroneView.renderStats();

                    // redraw the organizer tab
                    Tabs.throneOrganizer.show();
                }
                else
                {
                    presetFailures++;
                    logit("Preset change failed. Error code: " + v.error_code);
                    
                    // try again in 2 seconds
                    if (presetFailures <=10) {
                        presetTimer = setTimeout( function () {processPresetClick(btn)}, 2000);
                    }
                    else
                    {
                        // after 10 failures, give up
                        presetFailures = 0;
                    }
                }
            }
    );
}

//handler when a guardian button is presed
function processGuardianClick(type)
{
    // callback.  only called when successful
    var cb = function(h)
    {
        // set the outline and turn the background gray
        var btn = "li.guardbutton." + type;
        $("li.guardbutton").removeClass('active');
        $(btn).css('background-color', 'darkgray');
        $(btn).addClass('active');

        // after lockout time is complete, redraw the control
        var timeLeft = h.finishTime - unixTime();
        setTimeout( function () 
                {
            h.summonFinishCallback(type, unsafeWindow.cm.guardianSummonModel.getSummonGuardian());
            $(btn).css('background-color', 'white');
            drawGuardWidget(); 
                }, (timeLeft + 1.0)* 1000);
    };
    // change guardian
    unsafeWindow.cm.guardianSummonModel.summon(type, cb)
}

//update the preset list buttons
function setPresetWidget(slot)
{
    var x = ($("#MM_throneStatList .selected, #throneStatList .selected"));
    x.removeClass('selected');
    x.addClass('active');
    x.bind("mouseenter", function (I) {
        unsafeWindow.cm.ThroneView.boostsTooltip(this, I, I.target.id)
    });
    x.bind("mouseleave", function (I) {
        unsafeWindow.removeTooltip()
    });

    var s = $("#MM_throneInventoryPreset" + slot + ", #throneInventoryPreset" + slot);     
    s.removeClass('active');
    s.addClass('selected')
    s.unbind("mouseenter").unbind("mouseleave");

    $("a.loadGPreset").css('border-color', 'transparent');
    $("#trPresetNum" + slot ).css('border-color', 'green');

    document.getElementById ('TRPresetList').value = slot;
    Tabs.throneOrganizer.selectPreset(slot);
}

//create a preset list on the main display
function buildPresetWidget()
{
    var E = [];
    var J = Seed.throne.activeSlot;
    var F = Seed.throne.slotNum;

    for (var G = 0; G < 16; ++G) {
        var H = G + 1;
        var I = $("<li/>");
        if (H === J) {
            I.attr("id", "MM_throneInventoryPreset" + H);
            I.addClass("selected");
            I.html(H);
            I.bind("click", {
                idx: G
            }, function (K) {
                var L = K.data.idx + 1;
                processPresetClick(L);
            });

        } else {
            if (H === (F + 1)) {
                I.attr("id", "MM_throneInventoryPreset" + H);
                I.addClass("buy");
                I.bind("click", function () {
                    unsafeWindow.cm.ContextualMenuThrone.renderMenu(this, null);
                })
            } else {
                if (H <= F) {
                    I.attr("id", "MM_throneInventoryPreset" + H);
                    I.addClass("active");
                    I.html(H);
                    I.bind("click", {
                        idx: G
                    }, function (K) {
                        var L = K.data.idx + 1;
                        processPresetClick(L);
                    });
                    I.bind("mouseenter", function (K) {
                        unsafeWindow.cm.ThroneView.boostsTooltip(this, K, K.target.id)
                    });
                    I.bind("mouseleave", function (K) {
                        unsafeWindow.removeTooltip()
                    })
                } else {
                    I.attr("id", "MM_throneInventoryPreset" + H);
                    I.addClass("locked");
                }
            }
        }
        E.push(I)
    }

    var C = $("<ul/>", {
        id: "MM_throneStatList",
        addClass: "presetList",
        style: "width: 178px; padding: 0px; margin: 0px; list-style: none; overflow: hiddden; float: left; border: 5px outset Peru; position: absolute; background: white;"
    });

    $.each(E, function (K, L) {
        C.append(L)
    });

    var aa = $("<div id='tr_presetBox'/>");
    aa.append(C);
    aa.css({
        "height": "55px",
        "width": "190px",
        "overflow": "visible",
        "position": "absolute",
        "z-index": "100000"
    })
    $("#kocContainer").append(aa);

    // make a selector box for picking a guardian
    var C2 = $("<ul/>", {
        id: "t_throneGuardList",
        addClass: "presetList",
        style: "padding: 0px; margin: 0px; list-style: none; overflow: visible; float: left; border: 4px outset Peru;"
    });

    var guardTypes = ["wood", "ore", "food", "stone"];
    var offsets = [" 77% 47% ", " 77% 73% ", " 77% 60% "," 77% 85% "]; // default to highest level.  TODO:  set the icon based on the current level

    for (g =0; g < 4; g++)
    {
        var type = guardTypes[g];

        var bb = $("<li/>").html('<div/>').css(
                {
                    'padding': '0px',
                    'background': 'url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/guardian_change_spritemap102.png") no-repeat scroll ' + offsets[g] + ' white',
                    'background-size': '350px'
                });
        bb.addClass("guardbutton").addClass(type);
        bb.append("<div class='tt'>" + unsafeWindow.g_js_strings.guardian["tooltipSummon_" + type] + "</div>");

        bb.bind("click", {
            gt: type
        }, function (K) {
            processGuardianClick(K.data.gt);
        });

        C2.append(bb);
    }

    aa = $("<div id='tr_guardBox'/>");
    aa.append(C2);
    aa.css({"height": "48px",
        "width": "164px",
        "position": "absolute",
        "overflow": "visible",
        "z-index": "100000"}
    );

    $("#kocContainer").append(aa);

    // move the chat box down
    var p = $("div.mod_comm").css('top');
    p = +p.split('px')[0] + 70;
    $("div.mod_comm").css('top', p + "px");

    var CHAT_BG_IMAGE = "data:image/gif;base64,R0lGODlhagHQAvcAAP%2F%2F5v%2F%2F1v%2F33v%2F31vf35v%2F3zvf33v%2F3xff31vf3zv%2Fv3u%2F33v%2Fv1v%2Fvzvfv1vfvzvfvxffvvffmzu%2Fmvebmvffere%2Feve%2Fete%2Fere%2Fepebevebeteberd7evd7ete%2FWpebWtd7Wtd7Wrd7WpdbWrd7Ord7OpdbOrdbOpdbFpc7FtdbFnM7FnMXFrc7FlM69rc69nM69lM69jMW9nMW9lMW9jL29nL29lM61jMW1nMW1lMW1jL21nMW1hL21lL21jMWtlLW1lL2tnL2tlL2thL2te7WthL2le72lc7WlhL2la7Wle7Wlc7Wla62le62lc7Wce7Wcc62chLWca6WcjK2cc6WchK2ca62cY6Wcc6Wca6WUhK2Ua6WUa6WUY5yUY5yMa5yMY5yMWpSMa5SMY5SMWoyMY5SEa5SEY4SEe4yEY4yEWoyEUpx7Uox7Wox7UoR7WoR7UoRzUntzY4RzSntzUntzSnNzSntrSmtrY3NrSmtjOhlrzmNaSjpjhBljxRljvRljtRlarRlapRlSnBlSlBlKjBlKhBlKexlCexlCcxlCa0o6CCE6Uhk6Yxk6WkopAEIpADopABAxQjEpEDEpCCEpMRkpMTohADEhACkhCDEZACkZACEZCCEZACEQABkQABkIABAIABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAagHQAgAI%2FgB1NGgAB02XJUaWKFziZEmShRAVOplIcSIUKA4fLsG4EUqVj1kqNpQosmJEJ1VGSvx4saXLlwxLTvxYReFHmSgnkqRJkabPn0CrvGypE2fFlEZLCl3I8SJEKCirZJmKNGlJIxRJjoza0CREq0eVBq0KNqdIpFo7ehQ61OVYLTSnZoGbUUoSJ0yeNJlR4EGdOGsCC37jRvAaN4gDI37DuDHjOI3dOHYcR46cyZgzI94cmfMby6BBZ34Tp7Tp0ocZFx79GPNp03LsjLZcGjRk1ZJZE278%2Bvbj3qZVH0482rQdO8DjbEZ8OnHwNaU9q9ZNOvnpzryTvzEcuLRr4MWt%2Fgev%2FpoOHdPm0zOWszkOm%2Fc3HjxY42QGChQmRNw%2FQaL%2FiRP7%2FYeCCAT%2BR6B%2B9yUYoIAKmuCgCSVEWMKDD5aAH4UOXkghCvz15yEJCoYoIgoT3gehCSRieKKEEkIogoQj3pcChx7%2Bx99%2FH%2F7H4o4RoohCCjNyaOOCAIb4YX8xJriCggDqGGGRIloo4oYaVgjjiBnGmGWSCdqIoopbhljhg1yWaeYKQJZwwoEjjHBDAgmoYcQGfRVg550DFJCnnQP0ead88tkJ56AJCEoonAUMpOiddiraAKOQRsrooZQOmqiji17qqKaLYurpp54WUGilk3IKaqiMNuAnpIiuKiqi%2F68W2uhAktYKKa13nqorpolemmukj9p6a6278kqqsH8%2B8CcEyhZwwAGMPgCBnQI1sIYRIDQAQbGbcmqqow%2BAGm64npKL6bjncituA%2BiiO1C77MYL77i5BtuXueqCqum37ALq77%2F%2B5vvuv%2F0GPLDBBhfbLr6KAkxwwacCKnC6706M67f1OhtBBBAcwOwADjgwA7tygJGEDjrkoPLKKvuwsg8w5wCzD0MMMXMOKKO8MhApsywzD0AHLfTQQc88NMxBDwHE0kwD4fPLM0dtdNRAU0200DPXXDPNWnettNc8s8yz1DPPYHYOVZNt9NE%2B6KB0z27rvDLKRa9dddBo86C21f5D5%2B3D1XjnMMPKgO8NeN12H6643joA0TXPTXstueQ%2FDPFDD5gXofkPlQuRgwQSwOGGGmecAcbpqIOxhRVWSCEF663DLrsVW9Re%2B%2By45667FVTsrvvrwPsu%2FPC2F7867Lfvfjztt9vOfPLD0%2F588dFXb73yy%2Bee%2FfXcd8%2B98eCHD%2F4ZcMxRRx1zwHHGEkQwQQcj8O%2FRRx8vMOBAHX2Iov%2F%2B%2FPfv%2F%2F8ADKAAB0jAAhrwgAhMoAIXyMAGOvCBEIygAxmhhyUUgQ3wy%2BALDKCAOeRPgiAMoQhHSMISmvCEKEzh%2Fxixhh6IIYOMaIEBDOBBFdrwhjjMoQ53yEMJsrAK7%2F6DXwsIQIAa9vCISEyiEpfIRAMyogtV2AP8XkBEIzbxiljMoha3%2BMA9ZGENU1RABz%2FIxTKa8YxoZCIZjBDGMYLijXCMoxznSMc62vGOeMyjHvfIxz768Y%2BADKQgB0nIQhrykG%2FcQxQZ8QIxehCRkIykJCdJyUpa8pKYzCQoGMGFNjByho%2FUpChHScpSmvKUqBRkF7gQQ0f2IZWwjKUsZ0nLWuIxCzuIIQdDacte%2BvKXwAwmIHGpSzcK85jITKYyY0nMFrhymdCMpjSnWchmPpOa2MymNrNpTWNu85vgDGcvs9CDVnpTnOhMpzozmQUimNODnYinPOdJz3ra8574zP%2BnPvfJz376858ADahAB0rQghr0oAhNqDzJ%2Bc4%2BKPShEI2oRCdK0Ypa9KIYjWc34ZnRjnr0oyANqUhHStCNOpSkKE2pSlfK0pbmk6HOHKNLZ0rTmtr0piUtZyNlitOe%2BvSnQE0pQ3fK0aAa9ahITWpBh%2BpKpTr1qVCFKlN5GtWqWvWqM4UpKE%2BK1a569asZbacuachVsJr1rGgtqTtlSFZNuPWtcI2rXOdK17ra9a54zate98rXvvr1r4ANrGAHS9jCGvatYmWrBw%2FL2MY69rGQjaxkJ0vZyro1C0Uo5mIty9nOevazoA2taAOLWc32YbSoTa1qV8va1t61CkdoqGv%2BZ0vb2tr2toGFrWxxy9ve%2Bva3qdUtUU8L3OIa97jIHaxwXZnc5jr3uc9d7hihS93qWre20t3sdbfL3e5aVrcx9SAlxkve8pr3vOhNr3rXy972uve98I2vfOdL3%2Fra9774za9%2B90veKhQBEuHVA38HTOACG%2FjACE6wghfM4PFC4QgAdqSAG0zhClv4whjOsIbt%2B%2BAIj3HDIA6xiEdM4hKztwpIgIQKXNmISbj4xTCOsYxnTOMa2%2FjGOM6xjnfM4x77%2BMdADrKQh0zkIhf5EpagxBVSTNQ88OHJUI6ylKdM5Spb%2BcpYzrKWt8zlLnv5y2AOs5jHTOYym%2FnMUH5Cilv%2BsIAF5CEPf4iznOdM5zrb%2Bc54zrOe98znPvv5z4AOtKAHTehCG%2FrQiE60nO0CCRsgwM1%2BAISkJ03pSlv60pjOtKY3zelOe%2FrToA61qEdN6lKb%2BtSoTrWqJ22FJEBiBgPoYKRXTeta2%2FrWuM61rnfN614DwgpLgAQMBCDrQBj72MhOtrKXzexmO%2FvZ0I62tKdN7Wpb%2B9rYzra2t83tbnv72A2BxE7T4AdBmPvc6E63utfN7na7%2B93wjre8503vetv73vjOt773ze9%2B%2B%2FvcRoiCh8n974Ib%2FOAIT7jCF87whjvc3EaA8LjzMIiKW%2FziGM%2B4xjfO8Y57%2FOMgD7nIR07%2F8pKb%2FOQoT7nKV87ylls8CRIXYxryQIia2%2FzmOM%2B5znfO8577%2FOdAD7rQh070ohv96EhPutKXzvSm2zzi4pY5zZ1O9apb%2FepYz7rWt871rhPCCEyWeiHGTvaym%2F3saE%2B72tfO9ra7%2Fe1wj7vc5073utv97njPu973TnawR10BMzeE4AdP%2BMIb%2FvCIT7ziF8%2F4xjv%2B8ZCPvOQnT%2FnKW%2F7ymM%2B85gcP9Q12MA%2BbD73oR0%2F60pv%2B9KhPveoFnxAAgzIPh4i97GdP%2B9rb%2Fva4z73ud8%2F73vv%2B98APvvCHT%2FziG%2F%2F4yE%2B%2B7I3ABNfTMA%2BIiL70p0%2F96lv%2F%2BtjPvva3z%2F3u%2Fnv%2F%2B%2BAPv%2FjHT%2F7ym%2F%2F86E%2B%2F9Jn%2F9znkIRHwj7%2F850%2F%2F%2Btv%2F%2FvjPv%2F73z%2F%2F%2B%2B%2F%2F%2FABiAAjiABFiABniACBh%2FftdICOB%2BivCAEBiBEjiBFFiBFniBGJiBGriBHNiBHviBIBiCIjiCJFiCJniCEAhzABYy7rcILviCMBiDMjiDNFiDNniDOJiDOriDPNiDPviDQBiEQjiERFiERviCKtgCDtCAeXCETviEUBiFUjiFVFiFVniFLpgEUKBibeZ%2BjvCFYBiGYjiGZFiGZniGaJiGariGbNiGbviGcBiHcjiHdFiHdniHYPgDUBAJKvB6j%2FCHgBiIgjiIhFiIhniIiJiI%2F4q4iIzYiI74iJAYiZI4iZRYiZZ4iYAoBcHGAyEDB1SgAgAQiqI4iqRYiqZ4iqiYiqq4iqzYiq74irAYi7I4i7RYi7Z4i7iIix1gA1kQASk2AwLQAHjQBSeQi8Z4jMiYjMq4jMzYjM74jKi4i13wASmWAwMgjGggAtC4jdzYjd74jeAYjrlIAjfgBRmgBJDgA9qCB2WgjeL4jvAYj%2FI4j%2FTIiiJQA1iQAVMACT8gLXZABu5YjwI5kARZkAZJixsQA1dQAQLnAwnwAHZQBiNwkBRZkRZ5kfOYkAspcDdQABAQkROJkSI5kiRZkre4ATRwBR8gcDXgkSBpkjAZkzI5k%2F%2F3yAUfsI80wAASgAfZOJM%2B%2BZNAWZAj0ANecJOvNgA72ZNBuZRM2ZTcOJRFuY868AAMwJMo4JRYmZVaeYscIAMqmWJTWZVkcJVbWZZmeZameAEKuZKQMJXCOJZoGZdyqZVqqZINuS14AJdzuZd86ZMXgAM2KXA7gJdlQJZ9eZiIiZEbsAM2mWKD%2BZaGmZiSOZkCuZhXgAGOuS3%2FGJmU2ZmeCY4b4JUVkJkNsJmfeZqouY0XIJoC9wN98Y8BmZqyOZu5CAIxEJjp%2BJpKSZu82ZuxaJt2mZsPgAdrEJu%2BeZzIaYq2iZs%2B0BfEaZzJGZ3IqZFs2ZzDWZzSmZ3JqZEY0JD%2Fzomd2hmevAmc3RkJ1mkHagCd4rmenUmeU2Ce8mEHu8me9EmZ7mme7FIHYxAC9dmfk8kBMeAF5amOfrGf%2Fnmgh9mVRRkF%2BFmg%2FImgECqXobmgkfAD%2BUkGDxqhGlqWCrqSFXqhGbqhIuqUAEqhBKqfITqiKgqUtimgDHqiBrqiMvqTLZoBL5qfMTqjOgqTCUmhNCAfepCjOzqkIjmhHvqjDxCkKUqkTHqQG1ADPgqkQtqkVEqQTxqlSTqlVbqlGQmlRxoueKClXDqm4nil1BgJPyqMYkqmbNqNZsoEaAqma9qmdOqMZsqgaaqkdbqn3Gik7%2BkD8lEHGMqnhGqnNaCS%2F3AKqH7RjoXaqMr4pJeZqIHKqI5aqbm4mpEKn4uqnpbaqa%2BIqQM6qZzqqaSqiqD6oqJaqqrqihdwqB6qqHVAqas6q6jYqpkKq7JKq7o6ipCKmXGapAC5q8IqipD6AXCKpHoQrMMqrMV6rECqrMuqq72KBL%2Bal6MarZ36pFXgq0iKB19wrdhaqdNard8arrRqmRjgrMJYrua6qugKpyOzruDaroTKATuAqJFQLYLqAfSqqnV5k%2Fk6ELHKr%2F1KqnWZrgHbAPtasAarkAirr2RAsAxrqdwJpxArsRPrqKGZqRebsZYKqhYrsBHrsZW6mlpgrAm7sCTbqKtZlCFbmuy6sv%2BEOgEKmQEvawcxK7N7SrOXSa3Vogc5q7N0agEOC5bycQfQKrRDW7Rt%2BazzqrRMSrQ927TASgJQW6dS66tTWbVXS6c8251Um6xP27U6%2BrUNKaVWS7ZkSp4phqxzqrZDSp4Cl6ZhuqRwy6Ry%2B6t6erdbmrdua7d8u6PciafSsreB26SDG6cQYLiHS6TcSa0zIKWA27gr%2Brjm6ZxqMLmUO6IJ2ZiXO5yZu7mOe5u%2Bap14ELqiK7gxoAUIa7qom7ozapusm6jscrqaC7sQ2qKtW7uvi7sq2qMoS6C267syCry0C7q3S7z9abyaKqjJq7z0Camj2ZYgCr2ce6ijGbB%2BMaj%2F1ruh4yoQftG73Yug38su6Pm846ud5QuR4pu%2B%2FWmrZwq%2BddC%2B7kuftqq11Vu%2FB2oBh4qZ1Mu%2B6Ku%2F0xkDWOC%2F4Hu%2BAuyfPWrA5ku%2FCay%2BAUqN%2F4vADxy9AcrAAFzBFlzAYLmODqzB26mQ0ysQEDC8ICyeGjnC67gGAXzCqZmQHBy23OvC2QnD3PqsLUzDn2nDbRsujKvDAxzDefq2QCybC9zDDfDDRdybwEutQ5zDSyyZTay3MxzFTHzBPQysUGzFh5nCEAarVczFsjkB9zi1YLzFYjyXE8AB%2FUutZ5zGvLmxpRuoYQzHp3mwbkzHaGzHaInHzVvHfNyZfvzGgYya%2F3Kcx9u7x4W8lZYbuUmKBsW4yJ%2FJtvkqpSUgyZNctNVKxJg8l8CZAZAruZ3cnjUbylmqyKPMlJ%2FsxOFiB5ycyme5ynFammCAyrDMogQMyrPsyrZ8yz5pm%2FnIysJYy76MmBqZAU0QCY6sxMUcl5%2BczMsMyM0cy7mczG47ttPclC36AdYspdiczUsJAl4KzU4Lzp4cwaycpd9szjQawd08zL3MziIpuyi7tc4rz2gpzldgs9p7z%2Fhslvp8pCIbz%2F9ckeIcmGiavwWtlQHtxAq90FhJyfJrBgQN0QWZuDSQnxRt0VkJAl5ZnjTQF3Ww0RztlPpcno7MyyVt0hHMoCn9yv8rTZK669LxCdMxPc%2BkS9MQadM3fZHLidI1XdE9HY%2FbbMrMPNQmOcXLzNNI7aTorMyi3NQzCcM2qrdMLdVWGsHOOpxXjdUCuc3kPJzE7NUwCdZQLdZCTdbdaNaRC89qbZJmTbdj%2FdYjuc3vKddpTdfPaNezXLd6XdcBqo%2Bfi6J%2FjdPm%2BKci3dWFHY4g4AKHPdiKvdjfuAErkI%2BI7aCSbZGUbdmf%2B495ndnISNn7fNevKc2gTY%2BiLdjN%2BZGmfdrymNqJWtqf7dq4uAEscKv%2B%2BMG0DY8aoMnn2dq7LY4akJKlm9izHdy0ONw9C9nHjdyyqAH9G9uJ7Nz1CN24Pd3UPY%2F%2Fyl3cmJ3d8tjby92cDSAHY6AB3i2PX%2BvGieLX5w2PNLut6p3Ekd3eufjecyzfzU3fqmjfeYzf%2Bi2O%2FA2f%2Fv3f4Njb8C3gR03gzjjc2xrbA67g3bjdDs7eEM6Nyo2yIY3dFb6Ntm2OxyrSwL3hx6gBLCCg8GrcIr6NJG7iaAri%2BZ3iALDiCJvh%2FgzjzagBMODhv1rjNr6MOK7jNB7iPV6LP87PND7fQ66KRe7EiY2xST7iKWnkKP7kyajcUr7TL57iF%2F7hrJ3lIq4BOoCvId3lVF7lYQ6wGa7SZQ7lKkna3b3muWjl76kDTQ7nxsjgGDDnIrvOdo6KFZuwsNnntU0D%2F6yLqhCZq4I%2Bi4m7tYGe6LXYqwyaA%2BYr5I7u5%2FeKsCMDkSNb6Yp%2B6ccqsk7O6ax6qPwMsXwu6gBgAV7pofK76aj%2BqQ4rcK0e6q9uqrFOvQrr6rXOinLMoLO%2B6664sVWNpCoL7KuolgiNpDh76qJOtDa51XcQtMZ%2BijyL4a0s7dNeiuldyVqc7aqYtT7LLneA5IkO7pEg6afs7alo7pK%2BuJQO7H%2Fe7smatupuitQZsu5O7%2FVOiouuLfO%2B7%2FYe69r77wDP7wIv6Q0w7vpe8ACQtyRM8Awfig5fuO%2B%2B6xPv7l6%2B4f2O8RFPrJpMwp7d8aFouSCv296et6ttByws8g2%2Flv%2Fqjbwsn7ium%2FEVLvOYS%2FMQ3rkDevMxf5uvqps4r%2BBG%2BqKyHfMyIKAvz%2BMMH5oczNws35ULmWKE3PHTmo7%2BiAZBT%2BBPGsxWX8Imn%2B1bD8q5%2BZFYH%2FP4qMvnWfYiP67WqfQFb7m%2FnfX%2F%2FbhdL59yr98JybpSLx88eff0fcRW%2F8h%2B396Ar6h6oPZUj8WBf%2FiDf94pvPeC3%2FNRv%2FiIH%2FE6n8WM3%2FNcANJ9kflrT7pSbycJru6Xn5sFMPreXviJgvpg%2F9TWmayN792de6YZ7vkdj8eQMOZ9L%2FkYAGFjHvIdv8arHvrbuwEiL%2FxmHNRP75W6TOzkLugc4AL7jMhqTvXSP8f%2BWB7z18%2Fk2f%2F5y92tz9%2FncF%2B4lb%2F0mvyji4sGl%2Bz92M%2F60265f8v7Rh3%2Bdg7%2Fchr72Q2ctN%2FKcx3x%2Bg8QTCL5eNDADpgQABQuZNjQ4UOIESVOpFjR4kWMGTVu5NjR40eQIUNuiHEFg0AaDx7gGZNQ5EuYMWXOpFnT5k2cEEmaRBJphko9LXMOJVrU6FGkSUXuPOnzAQQ9alwqpVrV6lWsWSmCiKHlg0CCD4JO1VrW7Fm0aTly9fI1UsqVZMiqpVvX7l2qIGi0FTijgFi5eAUPJlw4pN62Pf0CnmvY8WPIhdl%2B6AnXjtDImTVvPssVS4YpA1VebszZ9GnUNtmCFv3%2BgHRq2LFlg0ScAWXBOphn7%2Bbd2yGIHV5sv8Wt2%2Fdx5KmBf65cvHRy6NEly2BOvEHu59K1b08LgjqG5g%2BwcydfHq33z02Iizdu3v17pOhZ%2F2SfHf59%2FDHlh6Y%2FPv9%2FAGGSTz368EAoQAQTXCuGz%2FhTyUD7FJRwQgBWc3Cl9ijUcMLJLmQpwg1DvK9Dp8TKUEQU8SNJuAvHSvHF%2F0j6TIn1giIBRhzhm4xGuGzM8cfydizRRSCLlM7CEj80csnkJiPwwROZlFK5GNpSz7Iop9RyMxLDem1LME9DMiz%2FwjQzszH%2FKvNMNg1Ls74245SsStbIzFJOPM0CYYUGW1szT0D%2Fz9qAzzoTgDNQRM3SYIUrWLvB0D8TlZSqRRsNzQdI75x005yYAms0TTkVlSamesIUAjvQAHFUVl%2FSoCTwInkU1cBatdWmV0361LVQb%2FV1Iw1oaDS8L381NqRgG72N11WPdVaiYLUYzsten7XWoWinBbXZa7sFIFtTcTvQW3KhFTaDygq4btxy222IAliXLdZdeieId7156W3XXl1by1ffcoVtilpuAb412YG3NdjdZIfDsuCFWW2YCUkIjrjcbCl%2B%2BGJyX5UWJXUj5fhYj9H1KeQxQBi5Ww1g%2BPgtNatdmdOWX4ZL5JkPdtlhlXDOuVWPP7gyZoh%2FDjRat2gg2miS%2FmnwCuRDmfZ1YpijltpWhJeto9arbd2ghn5TorXortvcYIewn7KD67JH%2FdqkKNbbmuy2zXwbg7hvlrlus2moAu%2BKC5Jjb77PJOnvuAm6ju3CJT0cbz%2FVEKFxTrmCeyAIXCNjcson1QvuwHnlvPNEP4c8pesIJ31K0%2FN2bvXSBXadWdgRvXv2f2s3G%2BzTQd1Ad0DP7jcsPBgHnk3hYw1Lj82Px3MDGrhQ%2FsHmnY8z1%2Bmttt5M7MOrowsPtm%2Bz%2B6q%2FD1%2F8M8lXWnv0tWyZp6qLH739Ld9vav2o5qd%2FSg1Y0LViNanhfPtzHwu0cL%2B%2F4EEqBKyfAREoljXQjYET6t8B%2FqGWvwnyz4HLwmAGmUQSCxKHAfLz4AerdL8HjHAM%2BithjjyGQhWysIUw6t%2F%2FlNaAoMhwhimqIQZCc0Mi7dCFLmuKXxqgJCEOUTi3OaLqkvifV7Xlh0Bx4hPxE8UPTNFEErTie7CoRQh18UVR9OF6wihGFLXMC2WkQQNoh0YRRZE1bXwjHDf0RXxV0Y7kwaMOFLZHDckxNH7EEBcBKZ0X%2FtCNxTPkIaFjvx%2F%2BRQ%2BqciQFiRhJsVCykgoq2RQksT47LHCTCULS%2BuogylEGqJRqMl4qR9SVpPWsla58DwhjyT5aerEkPHsAHPSYS97k6pa%2BbCQwY2OBXS6LmMbEDzLT%2FsYAXw6Qme5xZqxSAs0x%2FG6a76lmeJa5TWrCypu%2FBCdq1KeSb5aTj%2BJcDxzYpc7tvLA5DXBnMeGJpr1YswENcEMXtHlP7dSmJzpwYz0Bup3JoKQBEIgDOQ8amRVl0ScLbeiNHhqdFc3HjRW9KEbpNEh1NdSeHSUMkgjaSzBIk6S9QVIOGPCAhqp0pbvJaGhcisuZxqamJfJZTlGzAf8NZwb77KlPTQNUZUkiB0R1qFHvUsGvKJWpI3WqWqCq0NRRtapoqZlbTlqHd27VnC6L6lfBJ9bYXFUSOghZFjSAVtj0MFwFgIMRKADX1MhTVgkogBuMgNe8wpJifinAGn4A%2F1hzClYShDUsYk8TNI09oABqOKxjOWO%2FKGBCaZOtrGU1g1lMDJWznt0MZhfbgNGSNjP2G%2BwABkBZ1a42Bn9DwmJdC9vYQuZVfzvCWhvAANzm1jHY6y1BgNtZ4RaGuIFrQHCTW1JYFbcgavDBc90UXeZS17pzOqB0m1vd7Q4mBF0BzyehpNXw3oRqFkvvU88VLoM0tb05oRpckDhfujQsPPfFb1r06y%2F59rcmyaKMaNaFXgHDJFcmA2WAEyyTc9bxwWaJAROyl7sJW4VfCZNwhrGy4XB12MNWIR97R4wV7MnLwSf%2BCPa0iGEWH8XFeURwjDWy4L4szcZVqZnJZjAA9v6obMeU2hnUijpk9cJAWXJbMZIxAlm5zdLJOIGyKaU8ZVw5LWk6xnJR%2FmvKJnd5IvVFWY3FDJGsle%2FKZ46JBnSwZKWNjc1DcTOc1bbmOYvkcxm4Us%2FCnOeG7NmTYDYzoBXiYgA2YHCFNrTlMKAeH6hLDng2tEcc3WfxVK%2FSM5mxlzS9af0IzJMmBrWARG2dI5f6xueKZFZVrZ8385nGr1Ywq2dNa5EgbIrxZTSg68xhRuJazzTAQvaCLWzaCCxctNIhsp98Lzv1Os8pto4cwursG%2B9SMWXGtkcWvG0Rd%2Fsi9lMM9aQ9Z9ZGggdADuW52VzBk0hi3eJBpbgzAm%2BK6f%2BA3fW297g3ONGV8LvfFcH3kCQ38Hv%2Fmz5RKQHCn71GJvLX4WOmU2QLAOOJN0QDLrCgeZvo7jMXHHUSzzia%2F31DkpccW0TMMQ7%2FvOmaFVFdQVQ5mqt0S5rXHFs312LOdc4QPNIgc3q49s8PfcIpourllQ76QjFec0G%2BxelLN3TQ1UZ1X%2FM8En5UOsjF3MenpNzondy6G5nn9S73WJGMMfpDYo5JBaIdy1w54KD%2F0u62%2F6Yrc7y7wNtOd4laWe5TrjIrB%2B9kYS5r0XnXeEluKVLGAz2Z64F85I%2B%2B5KHScwxvtfy32DnUXo5Bpm0nH%2Bhj2nnPw48%2Blbd8hFkf%2BQhHE%2FX%2Bem0jPVM6e%2FJWZp%2FuHL3REaPPB%2FTz8EgOwV4cVtAuDH%2FIiEkaRVeI%2Boj2xfkWtfxOTT8G6kd%2BRWzcaNF9%2F9Gyw9T7P1%2BNQmGK9TwjqT%2Fon7Mty%2B3qzu%2FENh5PdcaROn9C1n%2FiSC3wV9nPZv7TPfEYP52zpXxzI7BSvh3bACUrKwQkQKjzn%2F5DwCzovZ8jt7KjpyS4q87DQIIqLOSCvQYcLNRqLNy7gqiCgX0ywQ4cwdNKrRZEwSnAhA90LtiDlRkULRtkvBSzrdcaAtRLPcoIrdsCwhMsrx8DLiPsQHGyLSUMwuXKAQf4riB0tN7igekCr86zwuzSQsvjQsXRLtT%2FA0OVEMMtzD0DM8MvJKKB2ic1FEGesC1%2BCkEeVDIkBDI4oMO8AwE7rK0f6yU9%2FLsm%2FMM8DMLxOqDaWh83CMTvsyE3ekPG24kPyCw6gsS8sxfE0ay%2FsMS2u4DZwoAl%2BKRH9MLIE4EeaItQrERSZDxTbIvMqsEgCMLbwQQfQC01iEXU44DgmERatEVG%2FLkNkAG40SzJKkTUu4AaWKMoMK8BMMb4%2B7yCcMbqc7wlcAp6wsVnRMFQpA84wMbqkwGvWMafuEZZrIEDyqyfaEZv1D5zvAB0fAB1lEVYoUR43MG8E4EY4AJeTInX%2BkWdczTXGQC%2FksfLQZ2BHMN8xBtiFMi%2F%2F0JIfQxINWjIM3zIhbTHtsNHiuRHizQ6jNxHN%2FTHmsNIDDgCqXuAjfw5DkjIuCGkk9S5lJSeVyxDkFS5l1RIlpzJkqvJmDTJdWQ8naTBMuzJvHtJXjwpTuTIZNzHv3CDJfzCpJxBRWzKyAOBp%2FykpZRKxvMOKbLK4MNJ%2B%2BM5rlxEedxKRfTK%2FeM5TezKscyitBRL6EPLG3LLM4Q4WlQJufxCGeCLulRL1BOBpGQCWlxKs3Q4fEwMTZzDKrw5wIxLrNzDE1pMdWHKxFwjJDhMyXxL4UjEqwxCXRSDD1iCwETMXNwBzwTNSJtDzrM8ESDNzwzNuyxF1jyCwOTLzltNz%2F%2FsrbIMQlO8zbYcTIQzgR64TasUzc4zgSJggw%2FAzcj0zYEzzjf4ACJgrtdkvBVggufsgdCZzrxjFDr4ABwYTu00ugngTu%2B0yr5iTnsbzyugAxP4zs0Kz58bTyxgz%2B9UHPjUOXvxAjxoz7okzsizlzDYA%2F6sRRA8xhUQAwHFgUw4qfusOQuQgTIQ0BhY0BVET3GzANLczxjoTxb8T9IUUBnoxeay0G6zFwRtTwqFwcjzxBPFARr0ReiTgRMlgkwgrKP8x%2BBkzyjYBBV8ADQgUWy7ACJgAzEwATTgBKF7AMNKzT1EgSVggyX4ADz4BKGjwi80gTBYgxUoAUag0gIoADT%2F8AEmFU8Q0IEw%2BIEUAANK%2BIQfgAAIIIMf4EDfmAA6nYCFkFOlsFOQwFOLqFM0G1OGoAAK8NNA1QA%2BfQhBTVRFTdQJGFRH1QANaFRJHdQ6pVMLoABIrdRK1QALsFM6hVRQBdVP5VRStQBOtQBUTVUL2IANUFVVnYBVvQBX7dRU%2FR0LAIENAAEQmAANKNMu0IESAIMuDYU4WwMjQIEQCIENSNZk1VVdDQERiFYRSFZpZdZoBQForVYR8ABu9QBWZVVmZVUPCIFxZVZzzVVsNVdqldZrRddv3QB2lVYTmFcUMAER4AARGIFoJddu7dZ1jdYSiFd2RQGCZdcSKIETSNgT%2FwhYaT1YEyBYFDhYhEXYhD3YhIVYjI3YEkCBFOhYjyXYj%2BXYFMDYjgVZjz3ZkBXZEzDZjIXYlDVZFkBZj2UBmk0BmqVZkGWBnG1ZnkWBFViBjP1ZoR3ZkSXYFWCBo%2F3ZjhVapm1ap3Xam41apG3am12BGNiBGtiBHTjaGXCCJAABH2CEURgFYj2AwjICGmCBGVBbGqCBGYABuIWBGJjbuW1bu73ZGUhbFoABqbVbv50BwM1btw1cwSXcuIUBv01cxU3cGsharM3aHugBIpjcHtDayn1cv%2FUBzfWBHfgBzyUCz%2FVcrd2BySUCIzAC0C3d0j1dI%2FjcH1DdJYhd1k0C1P9VXda9XdpFXSOIXd693SXI3dPlXd6lXeEt3iW4Xd8V3t29XSdoXuSd3SQwXuXd3eMN3ue93uuN3SLY3uKNXtml3iUogvAN3u%2BV3uIVX%2FE93iIwgvU13fXdXvgVXid4Ai3ogi8Igy5Ygh8Agx9omT4IhU8YBVEQugDwq%2BbNAgRO4CyogirIAi3QAgZ%2B4C54YC1QYASm4ApG4Al%2BYAvuYA%2F%2BYAZWYAzuAhIm4REmYS%2FQAi8IAzEQgzB4YS%2BI4RKeYfv9Ahv%2BAjLIYR0mgxfu4TAggzIoAx8eYiJ%2B4RwO4iDeYSLO4R5mYiPeYR5u4ij%2B4SLugiLGXxrO4hKuXy3eYAxTzuAvpuAJXmAHDmEEroLmfYInaF42doIqUOM1ZmM4nmMGZmMGvuM7hmM3ZmA1xmM%2F5uM5juM1ll8n4F04jmArLoM1YIMyWGMYGIAf6NKxFQVRCAgAOw%3D%3D";
    $("div.mod_comm").css('background', 'url(' + CHAT_BG_IMAGE + ')');


    $("#tr_presetBox").draggable({stop: function( event, ui ) {
        presetPosition = $("#tr_presetBox").position();
        savePresetPosition();
    } });

    $("#tr_guardBox").draggable({stop: function( event, ui ) {
        guardPosition = $("#tr_guardBox").position();
        saveGuardPosition();
    } });

    readGuardPosition();
    if (!guardPosition)
        resetGuardWidget();
    else
    {
        $('#tr_guardBox').css({
            "left": guardPosition.left + "px",
            "top": guardPosition.top + "px"});
    }

    readPresetPosition();
    if (!presetPosition)
        resetPresetWidget();
    else
    {
        $('#tr_presetBox').css({
            "left": presetPosition.left + "px",
            "top": presetPosition.top + "px"});
    }

    drawGuardWidget();

    // hook into citysel_click();
    var cityselMod = new CalterUwFunc("citysel_click",[['cm.PrestigeCityView.render()','cm.PrestigeCityView.render();tr_cityChanged();']]);
    unsafeWindow.tr_cityChanged = drawGuardWidget;
    cityselMod.setEnable(true);

    $('#tr_presetBox').bind('mousedown', function(e) {
        if (e.which == 3) {
            resetPresetWidget();
            return false;
        }
    });

    $('#tr_guardBox').bind('mousedown', function(e) {
        if (e.which == 3) {
            resetGuardWidget();
            return false;
        }
    });
}

function drawGuardWidget() {
    // color the outline based on the current city

    $("li.guardbutton").removeClass("active");
    var cityId =  unsafeWindow.currentcityid;

    var y_offset = {
            wood: " 47% ",
            ore: " 72.5% ",
            food: " 59.5% ",
            stone: " 85% "
    };

    var x_offset = {
            plate:    20,
            junior:   134,
            teenager: 248,
            adult:    362,
            adult2:   476,
            adult3:   590
    };

    var x_by_level = {
            0: x_offset.plate,
            1: x_offset.junior,
            2: x_offset.junior,
            3: x_offset.junior,
            4: x_offset.teenager,
            5: x_offset.teenager,
            6: x_offset.adult,
            7: x_offset.adult,
            8: x_offset.adult,
            9: x_offset.adult,
            10: x_offset.adult2,
            11: x_offset.adult3,
            12: x_offset.adult3,
            13: x_offset.adult3,
            14: x_offset.adult3,
            15: x_offset.adult3
    };

    for (c in unsafeWindow.seed.guardian)
    {
        if (unsafeWindow.seed.guardian[c].cityId == cityId)
        {
            var type = unsafeWindow.seed.guardian[c].type;
            $("li.guardbutton." + type).addClass("active");

            for (t in y_offset)
            {
                var level = unsafeWindow.seed.guardian[c].cityGuardianLevels[t];
                level = level ? level : 0;
                var bg_offset =  x_by_level[level]/776*100 + "% " + y_offset[t];
                $("li.guardbutton." + t).css('background-position', bg_offset);
                if (level)
                    $("li.guardbutton." + t).css('background-color', 'white');
                else
                    $("li.guardbutton." + t).css('background-color', 'darkgray');
            }
        }
    }
}

function resetGuardWidget() {
    $("#tr_guardBox").position( {
        my: "right bottom",
        at: "right top-6",
        of: "div.mod_comm",
        collision: "fit"
    });
    delete guardPosition;
    guardPosition = null;
    saveGuardPosition();
}

function resetPresetWidget() {
    $("#tr_presetBox").position( {
        my: "left bottom",
        at: "left+3 top",
        of: "div.mod_comm",
        collision: "fit"
    });
    delete presetPosition;
    presetPosition = null;
    savePresetPosition();
}

function TRupdateTimerDisp () {

    var t = Tabs.throneUpgrader;
    var timeUntilDone = 0;

    if (t.repairEnd != 0)
    {
        timeUntilDone = t.repairEnd - unixTime();
    }

    if (timeUntilDone > 0)
    {
        $(document.querySelector('#trtimerdisp')).html("<span id='trhammer'></span>  " + rectime(timeUntilDone))
        .css('text-align', 'left')
        .css('width', '100px');
    }
    else
    {
        $(document.querySelector('#trtimerdisp')).html("<span id='trhammer'></span> Done").css('width', '100px');
    }
}

function CHupdateTimerDisp () {

    var t = Tabs.champUpgrader;
    var timeUntilDone = 0;

    if (t.repairEnd != 0)
    {
        timeUntilDone = t.repairEnd - unixTime();
    }

    if (timeUntilDone > 0)
    {
        $(document.querySelector('#chtimerdisp')).html("<span id='chhammer'></span>  " + rectime(timeUntilDone))
        .css('text-align', 'left')
        .css('width', '100px');
    }
    else
    {
        $(document.querySelector('#chtimerdisp')).html("<span id='chhammer'></span> Done").css('width', '100px');
    }
}

function rectime(secs) {
    var min = Math.floor((secs)/60);
    var sec = Math.ceil(secs - (min * 60));

    if (sec < 10) {sec = "0" + sec;}
    return  min + ':' + sec;
}

var withAnim = null;
if (unsafeWindow.cm && unsafeWindow.cm.ThronePanelView) withAnim = unsafeWindow.cm.ThronePanelView.statusAnim;


function noAnim(result) {
    if (result == "success")
    {
        var item_name = $("#thronePanelName").html();
        var attempt_type = $("div.thronePanelContainer").find("li.selected").html();

        var msg = "Manual ";
        if (attempt_type)
            msg += attempt_type;
        else
            msg += "upgrade/enhance";

        msg += " successful.";

        if (item_name) msg += "  Item: " + item_name;

        SuccessLog(msg);

        if (withAnim) withAnim(result);
    }
    $("div.thronePanelItemContainer").append("<div>" + result + "</div>");
}

function disableAnimation(disable) {
    if (disable) {
        // override the success failure animations
        CM.ThronePanelView.statusAnim = noAnim;
    } else {
        if (withAnim) CM.ThronePanelView.statusAnim = withAnim;
    }
}

function installHandlerFunctions() {

    var oldR = unsafeWindow.cm.ThroneView.renderInventory;
    var oldOpen = unsafeWindow.cm.ThroneView.openThrone;

    var ri2 = function(l) {
        oldR(l);
        $("ul#throneInventoryList > li > div").removeClass('blueBorder');
        $("ul#throneInventoryList > li > div").removeClass('yellowBorder');
        for (ii in TRqueueData.list) {
            var list_item = TRqueueData.list[ii];
            if (!list_item) continue;
            if (list_item.status != "complete") {
                var id = list_item.item;

                if (list_item.action == "upgrade") $("div#throneInventoryItem" + id).addClass('blueBorder');     
                if (list_item.action == "enhance") $("div#throneInventoryItem" + id).addClass('yellowBorder');
            }

        }

        Tabs.throneOrganizer.paintTags();

        $('div[id^="throneInventoryItem"]').bind("contextmenu",function(e){
            e.preventDefault();
            var theId = $(this).attr("id").split("throneInventoryItem")[1];
            unsafeWindow.cm.ContextualMenuThrone.renderMenu( $(this), unsafeWindow.kocThroneItems[theId]);

            return false;
        }); 
    };

    var open2 = function(F) {
        oldOpen(F);

        $('div[id^="throneInventoryItem"]').bind("contextmenu",function(e){
            e.preventDefault();
            var theId = $(this).attr("id").split("throneInventoryItem")[1];
            unsafeWindow.cm.ContextualMenuThrone.renderMenu( $(this), unsafeWindow.kocThroneItems[theId]);

            return false;
        });

        // allow TR items to be dragged around
        $("#advisorContainer").draggable();
        $("#heroContainer").draggable();
        $("#chairContainer").draggable();
        $("#candelabrumContainer").draggable();
        $("#tableContainer").draggable();
        $("#windowContainer").draggable();
        $("#bannerContainer").draggable();
        $("#trophyContainer").draggable();
        $("#statueContainer").draggable();
        $("#petContainer").draggable();
        
        Tabs.throneSalvage.updateTRTab();
        Tabs.throneUpgrader.updateTRTab();
        //Tabs.throneUpgrader.updateTRSelect();
        $("ul#throneInventoryList > li > div").removeClass('blueBorder');
        $("ul#throneInventoryList > li > div").removeClass('yellowBorder');
        $("div#throneMainContainer div#heroContainer").css('left', '450px');

        for (ii in TRqueueData.list) {
            var list_item = TRqueueData.list[ii];
            if (!list_item) continue;
            if (list_item.status != "complete") {
                var id = list_item.item;
                if (list_item.action == "upgrade") $("div#throneInventoryItem" + id).addClass('blueBorder');
                if (list_item.action == "enhance") $("div#throneInventoryItem" + id).addClass('yellowBorder');
            }

        }

        Tabs.throneOrganizer.paintTags();

        $("ul#throneInventoryList").css('height', '520px');
        $("div#throneInventoryContainer").css('height', '520px');

        // update the other presets buttons when clicked
        $('ul#throneStatList li.active, ul#throneStatList li.selected').click( 
                function () {
                    var s = $(this).attr('id').split('throneInventoryPreset')[1];
                    setPresetWidget(+s);
                });



    };

    unsafeWindow.cm.ThroneView.renderInventory = ri2;
    unsafeWindow.cm.ThroneView.openThrone = open2;

    // intercept the render menu call for our own uses

    // save the location of the old funtion
    var TRoldF = unsafeWindow.cm.ContextualMenuThrone.renderMenu;

    var TRrenderMenu2 = function (l, j) {
        // call the old one
        TRoldF(l, j);

        if (j != null) {

            // create a button to "tag" an item
            var btn3 = document.createElement('a');
            if (!TRpresetData.taggedItems[j.id]) {
                $(btn3).addClass("buttonv2 h20 brown")
                .html("Tag Item")
                .css('color', 'white')
                .bind("click", function () {
                    Tabs.throneOrganizer.addTagItem(j.id);
                    $("#contextMenu").remove();
                });
            } else {
                $(btn3).addClass("buttonv2 h20 brown")
                .html("Remove Tag")
                .css('color', 'white')
                .bind("click", function () {
                    Tabs.throneOrganizer.removeTagItem(j.id);
                    $("#contextMenu").remove();
                });
            }
            $("#contextMenu div.title").after(btn3);

            // create a button to "remove all tags"
            if (getObjectCollectionCount(TRpresetData.taggedItems) > 0) {
                var btn4 = document.createElement('a');
                $(btn4).addClass("buttonv2 h20 brown")
                .html("Remove All Tags")
                .css('color', 'white')
                .bind("click", function () {
                    Tabs.throneOrganizer.removeAllTagItems();
                    $("#contextMenu").remove();
                });
                $("#contextMenu div.title").after(btn4);
            }


            // create a button to set the item to auto-enhance
            if (j.quality < 6) {
                var btn2 = document.createElement('a');
                $(btn2).addClass("buttonv2 h20 green")
                .html("Auto Enhance")
                .css('color', 'yellow')
                .bind("click", function () {
                    Tabs.throneUpgrader.addEnhanceItem(j.id);
                    Tabs.throneUpgrader.repaint();
                    $("#contextMenu").remove();
                });
                $("#contextMenu div.title").after(btn2);
            }

            // create a button to set the item to auto-update
            var btn = document.createElement('a');
            $(btn).addClass("buttonv2 h20 green")
            .html("Auto Upgrade")
            .css('color', 'blue')
            .bind("click", function () {
                Tabs.throneUpgrader.addUpgradeItem(j.id);
                Tabs.throneUpgrader.repaint();
                $("#contextMenu").remove();
            });
            $("#contextMenu div.title").after(btn);


            // create a button to set the item to auto-update/enhance
            if (GeneralOptions.multiUpgrade) {
                btn = document.createElement('a');
                $(btn).addClass("buttonv2 h20 green")
                .html("Auto Upgrade/Enhance")
                .css('color', 'black')
                .bind("click", function () {
                    Tabs.throneUpgrader.addBothItem(j.id);
                    Tabs.throneUpgrader.repaint();
                    $("#contextMenu").remove();
                });
                $("#contextMenu div.title").after(btn);
            }

            // create a button for tagging presets
            var idx = Seed.throne.activeSlot;
            var presetTagCount = getPresetTagCount(idx);
            if ( presetTagCount == 0 ) {
                btn = document.createElement('a');
                $(btn).addClass("buttonv2 h20 red")
                .html("Add Preset #" + idx + " Tags")
                .css('color', 'white')
                .bind("click", function () {
                    Tabs.throneOrganizer.addPresetTags(idx);
                    $("#contextMenu").remove();
                });
                $("#contextMenu div.title").after(btn);
            } else {
                btn = document.createElement('a');
                $(btn).addClass("buttonv2 h20 red")
                .html("Clear Preset #" + idx + " Tags")
                .css('color', 'white')
                .bind("click", function () {
                    Tabs.throneOrganizer.removePresetTags(idx);
                    $("#contextMenu").remove();
                });
                $("#contextMenu div.title").after(btn);
                btn = document.createElement('a');
                $(btn).addClass("buttonv2 h20 red")
                .html("Equip Tag Preset #" + idx)
                .css('color', 'white')
                .bind("click", function () {
                    Tabs.throneOrganizer.equipPresetTags(idx);
                    $("#contextMenu").remove();
                });
                $("#contextMenu div.title").after(btn);
            }
            
            var equipped_items = Seed.throne.slotEquip[idx];
            if (equipped_items.length > 0 ) {
                btn = document.createElement('a');
                $(btn).addClass("buttonv2 h20 blue")
                .html("Unequip All")
                .css('color', 'white')
                .bind("click", function () {
                    Tabs.throneOrganizer.unequipAllItems(idx);
                    $("#contextMenu").remove();
                });
                $("#contextMenu div.title").after(btn);
            }

            // create a button to copy the stats
            btn = document.createElement('a');
            $(btn).addClass("buttonv2 h20 blue")
            .html("Copy Stats")
            .css('color', 'white')
            .bind("click", function () {
                var cText = $("div#trCardItem" + j.id).find("div.trCard").text();
                if (cText) {
                    window.prompt("Copy to clipboard: Ctrl+C", cText);
                }
                $("#contextMenu").remove();
            });
            $("#contextMenu div.title").after(btn);

            // create a button to post the stats
            btn = document.createElement('a');
            $(btn).addClass("buttonv2 h20 blue")
            .html("Post Stats to Chat")
            .css('color', 'white')
            .bind("click", function () {
                //var cText = $("div#trCardItem" + j.id).find("div.trCard").text();
                var cText = $("div#trCardItem" + j.id).find("div.trCard").text();
                cText = cText.replace("[" + j.id + "]","");
                if (cText) {
                    cText = cText.replace("Type", "||Type").replace("Quality", "||Quality").replace("Level", "||Level")
                    cText = cText.replace("Might", "||Might").replace(/    /g, "||").replace(/\|\|\|\|/g, "||").replace(/\|\|\s*$/, "");
                    cText = ":::. |" + cText;
                    var table = cText.split("||");
                    if (table.length <= 11) {
                        for (row = 1; row <= 5; row++) {
                            table[table.length - 6 + row] = "Row " + row + ": " + table[table.length - 6 + row];
                        }
                    } else {
                        for (row = 1; row <= 6; row++) {
                            table[table.length - 7 + row] = "Row " + row + ": " + table[table.length - 7 + row];
                        }
                    }
                    cText = table.join("||");

                    sendChat(cText);
                }
                $("#contextMenu").remove();
            });

            $("#contextMenu div.title").after(btn);
            $(".buttonv2.red").click(function () { $(".mediumModal").css('z-index', 120000); });

            if (!j.isBroken) {
                // no salvage on first x items
                if (GeneralOptions.salvageSafety) {

                    var keys = unsafeWindow.Object.keys(unsafeWindow.kocThroneItems);
                    var v = "" + j.id;
                    if (keys.indexOf(v) < GeneralOptions.numSafety && keys.indexOf(v) > -1) {
                        $("#contextMenu a:nth-last-child(2)").remove();
                    }

                }

                if (GeneralOptions.noMassSalvage) {
                    $("#contextMenu a").last().remove();
                }
            }

        }

    };

    // hook up our new function
    unsafeWindow.cm.ContextualMenuThrone.renderMenu = TRrenderMenu2;

    // add some new functionality here ...
    var TRPanel = CM.ThronePanelView.renderPanel;

    var TRrenderPanel2 = function(v1, v2) {
        TRPanel(v1,v2);
        // save off this data ...
        Tabs.throneOrganizer.panelId = v2.id;
        Tabs.throneOrganizer.panelType = v1;
        Tabs.throneOrganizer.panelNextLevel = 2;

        // register some callbacks when the buttons are pushed
        addPanelCb();

        var addClickAction = function ()
        {
            // add an action to the buttons to switch between upgrade/enhance
            var pc = document.querySelector('#thronePanelContainer');
            $(pc).children("div.navigation li").click( function (){
                // clear the pulldown
                unselectToken();

                // buttons have been recreated.  install action again
                addClickAction(); 
            });
        }

        var checkAstoneLevel = function () {
            // check limit
            var stones = parseInt(Seed.resources["city" + unsafeWindow.currentcityid]["rec5"][0]);
            if (stones < GeneralOptions.safetyLimit) {
                disableUpgradeButton();
            }

            if ( isNaN(stones)) {
                disableUpgradeButton();
            }
        }

        var disableUpgradeButton = function () {
            // disable the button
            $(document.querySelector('#thronePanelItemRequirementsContainer')).children("a.gemButtonv2").unbind("click");

            // change the appearance
            var container = document.querySelector('#thronePanelItemRequirementsContainer');
            $(container).children("a.gemButtonv2").removeClass('green');
            $(container).children("a.gemButtonv2").addClass('gray');
            $(container).children("a.gemButtonv2").html("Low A-Stone")
        }

        var addClickAction2 = function ()
        {
            // add an action to the buttons to switch between upgrade/enhance
            $(document.querySelector('#thronePanelContainer')).children("div.navigation li").click( function (){

                // check every time the panel is switched
                checkAstoneLevel();

                // buttons have been recreated.  install action again
                addClickAction2(); 
            });
        }

        if (GeneralOptions.removeTokens) {

            // remove options for tokens
            var removeItems = [unsafeWindow.ksoItems[20006].name, // lucky token
                               unsafeWindow.ksoItems[20007].name, // common master
                               unsafeWindow.ksoItems[20008].name, // uncommon
                               unsafeWindow.ksoItems[20009].name, // rare
                               unsafeWindow.ksoItems[20010].name, // epic
                               unsafeWindow.ksoItems[20011].name, // wondrous
                               unsafeWindow.ksoItems[20012].name, // +3 master
                               unsafeWindow.ksoItems[20013].name, // +5 master
                               unsafeWindow.ksoItems[20014].name, // +7
                               unsafeWindow.ksoItems[20015].name, // +9
                               unsafeWindow.ksoItems[20016].name, // +10
                               unsafeWindow.ksoItems[20017].name, // +11
                               unsafeWindow.ksoItems[20018].name, // +12
                               unsafeWindow.ksoItems[20019].name  // super lucky token
                               ];

            $(document.querySelector("#buffDropDown")).children("option").each( function() {
                if ($.inArray($(this).text(), removeItems) > -1) $(this).remove();
            });
        }

        if (GeneralOptions.safetyOn)
        {
            // remove the gem option
            var sel = document.getElementById("costDropDown");
            sel.remove(1);

            // enforce a lower limit on a-stone.   Disable button if too low. 
            // see if we have enough a-stone
            checkAstoneLevel();

            $(document.querySelector("#thronePanelItemRequirementsContainer")).children( "a.gemButtonv2").click ( function (){
                // every time the button is pushed, check the levels
                checkAstoneLevel(); 
            });

            addClickAction2();
        }

        function unselectToken() {

            // if the user manually selected a buff, leave it alone
            if (!buffChanged) {

                // set the pull down to nothing when first displayed
                $(document.querySelector("#buffDropDown")).val(0);

                // set the pull down to nothing when first displayed
                $(document.querySelector("#costDropDown")).val(0);

                // remove the icon ....
                $(document.querySelector("#thronePanelBuffIcon")).removeClass().addClass('icon').addClass('i0');
                $(document.querySelector("#thronePanelBuffPrice")).children("span.items").html('');

                // install an action to track when a buff is selected
                $(document.querySelector("#buffDropDown")).change( function () {
                    buffChanged = true; 
                });

                // install an action to track when a buff is selected
                $(document.querySelector("#costDropDown")).change( function () {
                    buffChanged = true; 
                });

                // reset once the dialog is closed
                $(".throneContainer").children("div.close").click( function () {
                    buffChanged = false; 
                });
            }
        }

        // force the buff item selection to be empty
        if (GeneralOptions.buffsOff)
        {
            // deselect the token
            unselectToken();

            // add a clck action to set it back to nothing when switching between upgrade/enhance
            addClickAction();
        }

    };

    // hook up to the new function
    CM.ThronePanelView.renderPanel = TRrenderPanel2;

    // override the salvageItem function to allow upgrade to +1 first
    var salItemOrig = CM.ThroneController.salvageItem;    
    var salItemNew = function (item) {
        if ( TRsalvageData.upgradeManual )
        {
            if (item && item.quality <= TRsalvageData.upgradeFirstQual && item.level==0 )
            {
                var status = Tabs.throneSalvage.deleting;
                Tabs.throneSalvage.deleting = true;
                Tabs.throneUpgrader.doUpgrade(item.id,true);
                Tabs.throneSalvage.deleting = status;
            }  
        }
        salItemOrig(item);
    };

    CM.ThroneController.salvageItem = salItemNew;

    // watch the active slot so the TRO keeps up with changes
    //  This uses Object.watch() which is only defined on Gecko
    try {

        function updateThrone () {
            unsafeWindow.cm.ThroneView.renderThrone();
            unsafeWindow.cm.ThroneView.renderStats();
            Tabs.throneOrganizer.show();   
        };

        // This function watchs the TR active slot.
        function slotWatcher(id, oldval, newval) {
            try {
                setPresetWidget(newval);
                setTimeout(updateThrone, 200);
            } catch (e) {
                logit("error in slot watcher" + e.toString());
            };
            return newval;
        };

        // If the preset is changed, update the displays
        Seed.throne.multiWatch("activeSlot", slotWatcher);
        
        // some of the seed updates replace the seed.throne value.  when this happens reinstall the watcher
        Seed.multiWatch("throne", function (id, oldval, newval) {
            // register with the seed so we know when the throne object is replaced
            try {
                // add a new watcher / remove the old one
                //
                if (oldval.multiUnwatch) oldval.multiUnwatch("activeSlot", slotWatcher);

                // if another script create this object, the prototypes won't be defined.  If so, add them now
                if (!newval.multiWatch) {
                    newval.multiWatch = Object.prototype.multiWatch;
                    newval.multiUnwatch = Object.prototype.multiUnwatch;
                }

                newval.multiWatch("activeSlot", slotWatcher);
            } catch (e) { logit("error in multiwatch handler: " + e.toString());}

            return newval;
        });
    } catch (e) {}
}

var buffChanged = false;

function addPanelCb() {
    // these elements get rebuilt after every click so they have to reinstall
    // themselves ...
    $("ul.tabsv2 > li:contains('enhance')").click( function() {Tabs.throneOrganizer.panelType = "enhance"; Tabs.throneOrganizer.panelNextLevel = 2; addPanelCb();});
    $("ul.tabsv2 > li:contains('upgrade')").click( function() {Tabs.throneOrganizer.panelType = "upgrade"; Tabs.throneOrganizer.panelNextLevel = 2; addPanelCb();});
}

function onUnload (){

    TRupgradeData.activeTab = $( "#org_main" ).tabs( "option", "active"); 
    TRupgradeData.sortSelected = $("#trSortList").val();
    TRupgradeData.buffSelected = $("#trSortType").val();
    TRupgradeData.sortInactive = ($("#trSortInactive").attr('checked') == 'checked');

    if (!ResetAll) TRsaveUpgradeData();
}

function trMainTab (me){   // right-click on main button resets window
    if (me.button == 2){
        $( "#org_dialog" ).dialog( "option", "position",  
                {my: "left top",
            at: "left+15 bottom+5",
            of: "#main_engagement_tabs"});
    }
}


function TRattachTab()
{

    unsafeWindow.hideShow     = trHideShow;
    unsafeWindow.execSalvage  = Tabs.throneSalvage.togglePower;
    unsafeWindow.execUpgrade  = Tabs.throneUpgrader.togglePower;
    unsafeWindow.clickNext    = Tabs.throneOrganizer.showNext;

    var str = unsafeWindow.cm.FETemplates.Throne.mainThrone.replace(
            '<li id="throneStatTab" class="inactive"> Stats </li>',
    '<li id="throneStatTab" class="inactive"> Stats </li><li id="throneTest" class="inactive" onclick="hideShow()"> Controls </li><li id="trexecupgrade" class="inactive" onclick="execUpgrade()">Upgrade</li><li id="trexecsalvage" class="inactive" onclick="execSalvage()">Salvage</li><li id="trtimerdisp" class="inactive">Timer</li>');

    str = str.replace( '<div id="thronePanelContainer">', '<div id="thronePanelContainer" style="z-index: 101">');
    unsafeWindow.cm.FETemplates.Throne.mainThrone = str;

    unsafeWindow.cm.FETemplates.Throne.throneInfo = unsafeWindow.cm.FETemplates.Throne.throneInfo.replace (
            '<div id="throneInfoContainer">',
    '<div id="throneInfoContainer" style="z-index: 100;">');

    unsafeWindow.cm.FETemplates.Throne.mainThrone = unsafeWindow.cm.FETemplates.Throne.mainThrone.replace (
            '<div id="throneInfoContainer">',
    '<div id="throneInfoContainer" style="z-index: 100;">');

    unsafeWindow.cm.FETemplates.Throne.thronePanel = unsafeWindow.cm.FETemplates.Throne.thronePanel.replace(
            '<div class="thronePanelContainer">',
    '<div class="thronePanelContainer" style="z-index: 101;">');

    unsafeWindow.cm.FETemplates.Throne.thronePanel = unsafeWindow.cm.FETemplates.Throne.thronePanel.replace(
            '<div id="nextStatContainer" class="nextStat">',
    '<div id="nextStatContainer" class="nextStat" onclick="clickNext()">');

    unsafeWindow.cm.FETemplates.Throne.mainThrone = unsafeWindow.cm.FETemplates.Throne.mainThrone.replace(
            '<ul id="throneStatDisplay"></ul>', '<div style="width: 70%; margin-left: auto; margin-right: auto;"><input type="button" value="Post to Chat" onclick="postTR()"></input></div><ul id="throneStatDisplay"></ul>');

    GM_addStyle( "div#throneMainContainer div#throneInfoContainer div.infoContainer div.statContainer div.stats > ul {height: 345px }");

    function postTR() {
        var cText = $(document.querySelector("#throneStatDisplay")).html();
        var thronePresetNum = document.getElementById ('TRPresetList').value;
        cText = cText.replace(/\<\/li\>/g, "||").replace(/\<li.*?\>/g,"").replace(/\|\|\s*$/, "");
        var title = $(document.querySelector("div.primarytitlebar span.title")).text();
        cText = ":::. |" + title + " Preset #" + thronePresetNum + "|| ("+ TRpresetData.presetNames[thronePresetNum] + ")|| "+ cText;
        sendChat(cText);
    }

    unsafeWindow.postTR = postTR;
}

function trHideShow (){
    if ($(document.querySelector("#org_dialog")).dialog("isOpen")){
        $(document.querySelector("#org_dialog")).dialog("close");
        GeneralOptions.WinIsOpen = false;
    } else {
        $(document.querySelector("#org_dialog")).dialog("open");
        GeneralOptions.WinIsOpen = true;
        // clear the color
        TRupgradeData.newUpgradeState = 0;
        setUpgradeColor();
    }
    TRsaveUpgradeData();
    saveGeneralOptions();
}

//Simple method, as if it were typed in thru DOM
function sendChat (msg){
    $(document.querySelector("#mod_comm_input")).val(msg);
    uW.Chat.sendChat ();
}

function AddMainOrganizerTabLink(tabID, buttonLabel, eventListener, mouseListener) {

    var a=document.createElement('a');
    a.className='button20';
    a.innerHTML='<span style="color: #ff6">'+ buttonLabel +'</span>';
    a.id = tabID;
    a.className='tab';

    var tabs=document.getElementById('main_engagement_tabs');
    if(!tabs) {
        tabs=document.getElementById('topnav_msg');
        if (tabs)
            tabs=tabs.parentNode;
    }
    if (tabs) {
        var e = tabs.parentNode;
        var gmTabs = null;
        for (var i=0; i<e.childNodes.length; i++){
            var ee = e.childNodes[i];
            if (ee.tagName && ee.tagName=='DIV' && ee.className=='tabs_engagement' && ee.id!='main_engagement_tabs'){
                gmTabs = ee;
                break;
            }
        }
        if (gmTabs == null){
            gmTabs = document.createElement('div');
            gmTabs.className='tabs_engagement';
            tabs.parentNode.insertBefore (gmTabs, tabs);
            gmTabs.style.whiteSpace='nowrap';
            gmTabs.style.width='100%';
            gmTabs.lang = 'en_PT';
        }
        if (gmTabs.firstChild)
            gmTabs.insertBefore (a, gmTabs.firstChild);
        else
            gmTabs.appendChild(a);
        a.addEventListener('click',eventListener, false);
        if (mouseListener != null)
            a.addEventListener('mousedown',mouseListener, true);
        return a;
    }
    return null;
}


function getClientCoords(e){
    if (e==null)
        return {x:null, y:null, width:null, height:null};
        var x=0, y=0;
        ret = {x:0, y:0, width:e.clientWidth, height:e.clientHeight};
        while (e.offsetParent != null){
            ret.x += e.offsetLeft;
            ret.y += e.offsetTop;
            e = e.offsetParent;
        }
        return ret;
}

//emulate protoype's Ajax.Request ...
function AjaxRequest (url, opts){
    var headers = {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Prototype-Version': '1.6.1',
            'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
    };
    var ajax = null;

    if (window.XMLHttpRequest)
        ajax=new XMLHttpRequest();
    else
        ajax=new ActiveXObject("Microsoft.XMLHTTP");

    if (opts.method==null || opts.method=='')
        method = 'GET';
    else
        method = opts.method.toUpperCase();

    if (method == 'POST'){
        headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    } else if (method == 'GET'){
        addUrlArgs (url, opts.parameters);
    }

    ajax.onreadystatechange = function(){
//      ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete']; states 0-4
        if (ajax.readyState==4) {
            if (ajax.status >= 200 && ajax.status < 305)
                if (opts.onSuccess) opts.onSuccess(ajax);
                else
                    if (opts.onFailure) opts.onFailure(ajax);
        } else {
            if (opts.onChange) opts.onChange (ajax);
        }
    }

    ajax.open(method, url, true);   // always async!

    for (var k in headers)
        ajax.setRequestHeader (k, headers[k]);
    if (matTypeof(opts.requestHeaders)=='object')
        for (var k in opts.requestHeaders)
            ajax.setRequestHeader (k, opts.requestHeaders[k]);

    if (method == 'POST'){
        var a = [];
        for (k in opts.parameters){
            if(matTypeof(opts.parameters[k]) == 'object')
                for(var h in opts.parameters[k])
                    a.push (k+'['+h+'] ='+ opts.parameters[k][h] );
            else
                a.push (k +'='+ opts.parameters[k] );
        }
        ajax.send (a.join ('&'));
    } else               {
        ajax.send();
    }
}

function MyAjaxRequest (url, o, noRetryX){
    if (DEBUG_TRACE) logit (" 0 myAjaxRequest: "+ url +"\n" + inspect (o, 2, 1));
    var opts = unsafeWindow.Object.clone(o);
    var wasSuccess = o.onSuccess;
    var wasFailure = o.onFailure;
    var retry = 0;
    var delay = 10;
    var noRetry = noRetry===true?true:false;
    opts.onSuccess = mySuccess;
    opts.onFailure = myFailure;

    new AjaxRequest(url, opts);
    return;

    function myRetry(){
        ++retry;
        new AjaxRequest(url, opts);
        delay = delay * 2.25;
    }
    function myFailure(){
        var o = {};
        o.ok = false;
        o.errorMsg = "AJAX Communication Failure";
        wasFailure (o);
    }
    function mySuccess (msg){
        var rslt = eval("(" + msg.responseText + ")");
        if (!rslt)
        {
            logit("Message error: " + inspect(msg,3,1));
            return;
        }
        var x;
        if (window.EmulateAjaxError){
            rslt.ok = false;
            rslt.error_code=8;
        }
        if (rslt.ok){
            if (rslt.updateSeed)
                unsafeWindow.update_seed(rslt.updateSeed);
            wasSuccess (rslt);
            return;
        }
        rslt.errorMsg = unsafeWindow.printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));

        if (!noRetry && (rslt.error_code==0 || rslt.error_code==8 || rslt.error_code==1 || rslt.error_code==3)){
            dialogRetry (inspect(rslt.errorMsg), delay, function(){myRetry()}, function(){wasSuccess (rslt)}, rslt.error_code);
        } else {
            wasSuccess (rslt);
        }
    }
}

//example: https://www150.kingdomsofcamelot.com
var myServerId = null;
function getServerId() {
    if (myServerId == null){
        var m=/^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
        if (m)
            myServerId = m[1];
        else
            myServerId = '??';
    }
    return myServerId;
}

function logit (msg){
    var now = new Date();
    GM_log (getServerId() +' @ '+ now.toTimeString().substring (0,8) +'.' + now.getMilliseconds() +': '+  msg);
}

function saveGeneralOptions (){
    setTimeout (function (){GM_setValue ('GenOptions_' + getServerId(), JSON2.stringify(GeneralOptions));}, 0);
}

function TRsaveUpgradeData (){
    var serverID = getServerId();
    setTimeout (function (){GM_setValue ('UpgradeDataMM2_'+serverID, JSON2.stringify(TRupgradeData));}, 0);
}

function TRsavePresetData (){
    var serverID = getServerId();
    setTimeout (function (){GM_setValue ('PresetDataMM2_'+serverID, JSON2.stringify(TRpresetData));}, 0);
}

function TRsaveQueueData (){
    var serverID = getServerId();
    setTimeout (function (){GM_setValue ('QData_'+serverID, JSON2.stringify(TRqueueData));}, 0);
}

function TRsaveSalvageData (){
    var serverID = getServerId();
    setTimeout (function (){GM_setValue ('SalvageDataMM2_'+serverID, JSON2.stringify(TRsalvageData));}, 0);
}

function CHsaveUpgradeData (){
    var serverID = getServerId();
    setTimeout (function (){GM_setValue ('UpgradeDataCH2_'+serverID, JSON2.stringify(CHupgradeData));}, 0);
}

function CHsavePresetData (){
    var serverID = getServerId();
    setTimeout (function (){GM_setValue ('PresetDataCH2_'+serverID, JSON2.stringify(CHpresetData));}, 0);
}

function CHsaveQueueData (){
    var serverID = getServerId();
    setTimeout (function (){GM_setValue ('CHQData_'+serverID, JSON2.stringify(CHqueueData));}, 0);
}

function CHsaveSalvageData (){
    var serverID = getServerId();
    setTimeout (function (){GM_setValue ('SalvageDataCH2_'+serverID, JSON2.stringify(CHsalvageData));}, 0);
}

function savePresetPosition (){
    var serverID = getServerId();
    setTimeout (function (){ GM_setValue ('PresetPosition_'+serverID, JSON2.stringify(presetPosition));}, 0);
}

function saveGuardPosition (){
    var serverID = getServerId();
    setTimeout (function (){ GM_setValue ('GuardPosition_'+serverID, JSON2.stringify(guardPosition));}, 0);
}

function readPresetPosition () {
    var serverID = getServerId();
    s = GM_getValue ('PresetPosition_'+serverID);
    if (s != null){
        presetPosition = JSON2.parse (s);
    }
}

function readGuardPosition () {
    var serverID = getServerId();
    s = GM_getValue ('GuardPosition_'+serverID);
    if (s != null){
        guardPosition = JSON2.parse (s);
    }
}

function readGlobalOptions (){
    GlobalOptions = JSON2.parse (GM_getValue ('TROptions_??', '{}'));
}

function readGeneralOptions (){
    s = GM_getValue ('GenOptions_' + getServerId());
    if (s != null){
        opts = JSON2.parse (s);
        for (k in opts){
            if (matTypeof(opts[k]) == 'object')
                for (kk in opts[k])
                    GeneralOptions[k][kk] = opts[k][kk];
            else
                GeneralOptions[k] = opts[k];
        }
    }
}

function TRreadUpgradeData (){
    var serverID = getServerId();
    s = GM_getValue ('UpgradeDataMM2_'+serverID);
    if (s != null){
        opts = JSON2.parse (s);
        for (k in opts){
            if (matTypeof(opts[k]) == 'object')
                for (kk in opts[k])
                    TRupgradeData[k][kk] = opts[k][kk];
            else
                TRupgradeData[k] = opts[k];
        }
    }
}

function CHreadUpgradeData (){
    var serverID = getServerId();
    s = GM_getValue ('UpgradeDataCH2_'+serverID);
    if (s != null){
        opts = JSON2.parse (s);
        for (k in opts){
            if (matTypeof(opts[k]) == 'object')
                for (kk in opts[k])
                    CHupgradeData[k][kk] = opts[k][kk];
            else
                CHupgradeData[k] = opts[k];
        }
    }
}

function TRreadPresetData (){
    var serverID = getServerId();
    s = GM_getValue ('PresetDataMM2_'+serverID);
    if (s != null){
        opts = JSON2.parse (s);
        for (k in opts){
            if (matTypeof(opts[k]) == 'object')
                for (kk in opts[k])
                    TRpresetData[k][kk] = opts[k][kk];
            else
                TRpresetData[k] = opts[k];
        }
    }
}

function CHreadPresetData (){
    var serverID = getServerId();
    s = GM_getValue ('PresetDataCH2_'+serverID);
    if (s != null){
        opts = JSON2.parse (s);
        for (k in opts){
            if (matTypeof(opts[k]) == 'object')
                for (kk in opts[k])
                    CHpresetData[k][kk] = opts[k][kk];
            else
                CHpresetData[k] = opts[k];
        }
    }
}

function TRreadQueueData (){
    var serverID = getServerId();
    s = GM_getValue ('QData_'+serverID);
    if (s != null){
        opts = JSON2.parse (s);
        for (k in opts){
            if (matTypeof(opts[k]) == 'object')
                for (kk in opts[k])
                    TRqueueData[k][kk] = opts[k][kk];
            else
                TRqueueData[k] = opts[k];
        }
    }
}

function CHreadQueueData (){
    var serverID = getServerId();
    s = GM_getValue ('CHQData_'+serverID);
    if (s != null){
        opts = JSON2.parse (s);
        for (k in opts){
            if (matTypeof(opts[k]) == 'object')
                for (kk in opts[k])
                    CHqueueData[k][kk] = opts[k][kk];
            else
                CHqueueData[k] = opts[k];
        }
    }
}

function TRreadSalvageData (){
    var serverID = getServerId();
    s = GM_getValue ('SalvageDataMM2_'+serverID);
    if (s != null){
        opts = JSON2.parse (s);
        for (k in opts){
            if (matTypeof(opts[k]) == 'object')
                for (kk in opts[k])
                    TRsalvageData[k][kk] = opts[k][kk];
            else
                TRsalvageData[k] = opts[k];
        }
    }

    // recreate the objects w/ functions
    for (k in TRsalvageData.ruleSet)
    {
        var r = TRsalvageData.ruleSet[k];
        var rule = new TRRule(r.type, r.faction, r.conditions);
        for (j in rule.conditions)
        {
            rule.conditions[j].TRcheckCondition = TRcheckCondition;
        }
        TRsalvageData.ruleSet[k] = rule;
    }
}

function CHreadSalvageData (){
    var serverID = getServerId();
    s = GM_getValue ('SalvageDataCH2_'+serverID);
    if (s != null){
        opts = JSON2.parse (s);
        for (k in opts){
            if (matTypeof(opts[k]) == 'object')
                for (kk in opts[k])
                    CHsalvageData[k][kk] = opts[k][kk];
            else
                CHsalvageData[k] = opts[k];
        }
    }

    // recreate the objects w/ functions
    for (k in CHsalvageData.ruleSet)
    {
        var r = CHsalvageData.ruleSet[k];
        var rule = new CHRule(r.type, r.faction, r.conditions);
        for (j in rule.conditions)
        {
            rule.conditions[j].CHcheckCondition = CHcheckCondition;
        }
        CHsalvageData.ruleSet[k] = rule;
    }
}

function CHloadSalvageData (domainId){

    s = GM_getValue ('SalvageDataCH2_'+ domainId);

    if (s==null) {
        alert("Unable to find data from domain: " + domainId);
        return;
    }

    if (s != null){
        opts = JSON2.parse (s);
        for (k in opts){
            if (matTypeof(opts[k]) == 'object')
                for (kk in opts[k])
                    CHsalvageData[k][kk] = opts[k][kk];
            else
                CHsalvageData[k] = opts[k];
        }
    }

    // recreate the objects w/ functions
    for (k in CHsalvageData.ruleSet)
    {
        var r = CHsalvageData.ruleSet[k];
        var rule = new CHRule(r.type, r.faction, r.conditions);
        for (j in rule.conditions)
        {
            rule.conditions[j].CHcheckCondition = CHcheckCondition;
        }
        CHsalvageData.ruleSet[k] = rule;
    }

    // turn off
    CHsalvageData.salvageActive = false;
    clearInterval(Tabs.champSalvage.sTimer);
    clearInterval(Tabs.champSalvage.delTimer);
    Tabs.champSalvage.deleting = false;
    CHsaveSalvageData();
    alert('Salvage settings loaded from domain ' + domainId);
    Tabs.champSalvage.init(Tabs.champSalvage.myDiv);
}

function TRloadSalvageData (domainId){

    s = GM_getValue ('SalvageDataMM2_'+ domainId);

    if (s==null) {
        alert("Unable to find data from domain: " + domainId);
        return;
    }

    if (s != null){
        opts = JSON2.parse (s);
        for (k in opts){
            if (matTypeof(opts[k]) == 'object')
                for (kk in opts[k])
                    TRsalvageData[k][kk] = opts[k][kk];
            else
                TRsalvageData[k] = opts[k];
        }
    }

    // recreate the objects w/ functions
    for (k in TRsalvageData.ruleSet)
    {
        var r = TRsalvageData.ruleSet[k];
        var rule = new TRRule(r.type, r.faction, r.conditions);
        for (j in rule.conditions)
        {
            rule.conditions[j].TRcheckCondition = TRcheckCondition;
        }
        TRsalvageData.ruleSet[k] = rule;
    }

    // turn off
    TRsalvageData.salvageActive = false;
    clearInterval(Tabs.throneSalvage.sTimer);
    clearInterval(Tabs.throneSalvage.delTimer);
    Tabs.throneSalvage.deleting = false;
    TRsaveSalvageData();
    alert('Salvage settings loaded from domain ' + domainId);
    Tabs.throneSalvage.init(Tabs.throneSalvage.myDiv);
}

function inspect(obj, maxLevels, level, doFunctions){
    var str = '', type, msg;
    if(level == null)  level = 0;
    if(maxLevels == null) maxLevels = 1;
    if(maxLevels < 1)
        return 'Inspect Error: Levels number must be > 0';
    if(obj == null)
        return 'ERROR: Object is NULL\n';
    var indent = '';
    for (var i=0; i<level; i++)
        indent += '  ';
    for(property in obj) {
        try {
            type =  matTypeof(obj[property]);
            if (doFunctions==true && (type == 'function')){
                str += indent + '(' + type + ') ' + property + "[FUNCTION]\n";
            } else if (type != 'function') {
                str += indent + '(' + type + ') ' + property + ( (obj[property]==null)?(': null'):('')) +' = '+ obj[property] +"\n";
            }
            if((type=='object' || type=='array') && (obj[property] != null) && (level+1 < maxLevels))
                str += inspect(obj[property], maxLevels, level+1, doFunctions);  // recurse
        }
        catch(err) {
            // Is there some properties in obj we can't access? Print it red.
            if(typeof(err) == 'string') msg = err;
            else if(err.message)        msg = err.message;
            else if(err.description)    msg = err.description;
            else                        msg = 'Unknown';
            str += '(Error) ' + property + ': ' + msg +"\n";
        }
    }
    str += "\n";
    return str;
}

function matTypeof (v){
    if (typeof (v) == 'object'){
        if (!v)
            return 'null';
//      else if (unsafeWindow.Object.prototype.toString.apply(v) === '[object Array]')
        else if (v.constructor.toString().indexOf("Array")>=0 && typeof(v.splice)=='function')
            return 'array';
        else return 'object';
    }
    return typeof (v);
}


function unixTime (){
    return parseInt (new Date().getTime() / 1000) + unsafeWindow.g_timeoff;
}

/** ***************** Throne Compare ********************* */

Tabs.throneCompare = {
    tabOrder: 400,
    tabLabel: 'Compare TR',
    tabDisabled: false,
    myDiv: null,
    trTypes: ['chair', 'table', 'window', 'banner', 'advisor', 'trophy', 'candelabrum', 'hero', 'statue', 'pet'],
    itemTypes: { chair: 0, table: 1, window: 2, banner: 3, advisor: 4, trophy: 5, candelabrum: 6, hero: 7, statue: 8, pet: 9 },
    itemLists: [],
    selectedCard1: 0,
    selectedCard2: 0,
    selectedType1: 0,
    selectedType2: 0,

    init: function (div) {
        var t = Tabs.throneCompare
        t.fillLists();
        t.myDiv = div;

        var m = '<Div><DIV id=trSalvage class=trStat>THRONE ROOM COMPARE</div>';
        m += '<TABLE  width=100% class="trTabPad2 trTable">';
        m += '<tr width=100% align=center><td width=50%/><td width=50%/></tr>';
        m += '<tr width=100%><td colspan=2><b>NOTE:</b> There will be some future tweaks to this section.  Look for them in upcoming releases.<br/><hr/></td></tr>';
        m += '<tr>';

        m += '<td><div style="max-width:100%;"><b>Throne Type:</b><select id="trCompareType1" style="width: 40%;">';
        m += '<option value="0">--ALL--</option>';
        for (var type_index = 0; type_index < this.trTypes.length; ++type_index) {
            m += '<option value="' + this.trTypes[type_index] + '">' + this.trTypes[type_index].capitalize() + '</option>';
        }
        m += '</select></div></td>';

        m += '<td><div style="max-width:100%;"><b>Throne Type:</b><select id="trCompareType2" style="width: 40%;">';
        m += '<option value="0">--ALL--</option>';
        for (var type_index = 0; type_index < this.trTypes.length; ++type_index) {
            m += '<option value="' + this.trTypes[type_index] + '">' + this.trTypes[type_index].capitalize() + '</option>';
        }
        m += '</select></div></td>';

        m += '</tr><tr>';

        m += '<td><div style="max-width:100%;"><b>Throne Item:</b><br/><select id="trCompare1" style="width: 95%;">';
        m += '<option value="0">--Items--</option>';
        for (k in unsafeWindow.kocThroneItems) {
            var throne_item = unsafeWindow.kocThroneItems[k];
            m += '<option value="' + k + '">' + throne_item.name + ' </option>';
        }
        m += '</select></div></td>';

        m += '<td><div style="max-width:100%;"><b>Throne Item:</b><br/><select id="trCompare2" style="width: 95%;">';
        m += '<option value="0">--Items--</option>';
        for (k in unsafeWindow.kocThroneItems) {
            var throne_item = unsafeWindow.kocThroneItems[k];
            m += '<option value="' + k + '">' + throne_item.name + ' </option>';
        }
        m += '</select></div></td>';

        m += '</tr>';
        m += '<tr><td vertical-align:text-top; id="trDisplayItem1" class="tdcard" style="overflow: visible;  width: auto; height: auto; "/>';
        m += '<td vertical-align:text-top; id="trDisplayItem2" class="tdcard" style="overflow: visible;  width:auto; height: auto;"/></tr>';

        m += '<tr><td vertical-align:text-top; id="trDisplayStats1" style="width: 50%; font-size: 12px; height: 150px"></td>';
        m += '<td vertical-align:text-top; id="trDisplayStats2" style="width: 50%; font-size: 12px; height: 150px"></td></tr>';

        m += '</tr>';
        m += '</TABLE>';
        m += '</div>';

        t.myDiv.innerHTML = m;

        $("#trCompareType1").change(function () {
            var trType = $(this).val();
            var trList = document.getElementById('trCompare1');
            var trStats = document.getElementById('trDisplayStats1');
            var trDisplay = document.getElementById('trDisplayItem1');
            if (t.selectedCard1 == 0 || (t.selectedType1 != trType) && trType != 0) {
                trDisplay.innerHTML = '';
                trStats.innerHTML = '';
                t.selectedCard1 = 0;
            }
            t.selectedType1 = trType;
            $("#trCompare1").empty();
            var trOption = document.createElement('option');
            trOption.text = '--Items--';
            trOption.value = 0;
            trList.add(trOption);
            for (k in unsafeWindow.kocThroneItems) {
                var throne_item = unsafeWindow.kocThroneItems[k];
                if (throne_item.type == trType || trType == 0) {
                    var trOption = document.createElement('option');
                    trOption.text = throne_item.name;
                    trOption.value = k;
                    trList.add(trOption);
                }
            }

            if (t.selectedCard1 != 0) {
                $("#trCompare1").val(t.selectedCard1);
            }

        });

        $("#trCompareType2").change(function () {
            var trType = $(this).val();
            var trList = document.getElementById('trCompare2');
            var trStats = document.getElementById('trDisplayStats2');
            var trDisplay = document.getElementById('trDisplayItem2');
            if (t.selectedCard2 == 0 || (t.selectedType2 != trType) && trType != 0) {
                trDisplay.innerHTML = '';
                trStats.innerHTML = '';
                t.selectedCard2 = 0;
            }
            t.selectedType2 = trType;
            $("#trCompare2").empty();
            var trOption = document.createElement('option');
            trOption.text = '--Items--';
            trOption.value = 0;
            trList.add(trOption);
            for (k in unsafeWindow.kocThroneItems) {
                var throne_item = unsafeWindow.kocThroneItems[k];
                if (throne_item.type == trType || trType == 0) {
                    var trOption = document.createElement('option');
                    trOption.text = throne_item.name;
                    trOption.value = k;
                    trList.add(trOption);
                }
            }

            if (t.selectedCard2 != 0) {
                $("#trCompare2").val(t.selectedCard2);
            }

        });


        $("#trCompare1").change(function () {
            var trID = $(this).val();
            var trStats = document.getElementById('trDisplayStats1');
            var trDisplay1 = document.getElementById('trDisplayItem1');
            trDisplay1.innerHTML = '';
            trStats.innerHTML = '';
            t.selectedCard1 = 0;
            if (trID != 0 && trID != t.selectedCard2) {
                var mm = '<br/><p style="line-height:1px; margin:0px; padding:0px;"><b>Stats:</b></p><br/>';
                var cText = $("div#trCardItem" + trID).find("div.trCard").text();
                if (cText) {
                    cText = cText.replace("Type", "||Type").replace("Quality", "||Quality").replace("Level", "||Level")
                    cText = cText.replace("Might", "||Might").replace(/    /g, "||").replace(/\|\|\|\|/g, "||").replace(/\|\|\s*$/, "");
                    cText = ":::. |" + cText;
                    var table = cText.split("||");
                    if (table.length <= 11) {
                        for (row = 1; row <= 5; row++) {
                            mm += '<p style="line-height:1px; margin:0px; padding:0px;">' + table[table.length - 6 + row] + '</p><br/>';
                        }
                    } else {
                        for (row = 1; row <= 6; row++) {
                            mm += '<p style="line-height:1px; margin:0px; padding:0px;">' + table[table.length - 7 + row] + '</p><br/>';
                        }
                    }
                }

                trStats.innerHTML = mm;
            }
            if (trID == t.selectedCard2) trStats.innerHTML = document.getElementById('trDisplayStats2').innerHTML;

            var ii = Math.max(t.itemLists['chair'].length, t.itemLists['table'].length, t.itemLists['window'].length, t.itemLists['banner'].length, t.itemLists['advisor'].length, t.itemLists['trophy'].length, t.itemLists['candelabrum'].length, t.itemLists['hero'].length, t.itemLists['statue'].length, t.itemLists['pet'].length);

            for (var k = 0; k < ii; k++) {
                for (i in t.itemTypes) {
                    var item = t.itemLists[i][k];
                    if (item != null) {
                        if (item.id == trID) {
                            trDisplay1.innerHTML = t.buildCard(t.itemLists[i][k]);
                            t.selectedCard1 = trID;
                            t.selectedType1 = i;
                            break;
                        }
                    }
                }
            }

        });




        $("#trCompare2").change(function () {
            var trID = $(this).val();
            var trStats = document.getElementById('trDisplayStats2');
            var trDisplay2 = document.getElementById('trDisplayItem2');
            trDisplay2.innerHTML = '';
            trStats.innerHTML = '';
            t.selectedCard2 = 0;
            if (trID != 0 && trID != t.selectedCard1) {
                var mm = '<br/><p style="line-height:1px; margin:0px; padding:0px;"><b>Stats:</b></p><br/>';
                var cText = $("div#trCardItem" + trID).find("div.trCard").text();
                if (cText) {
                    cText = cText.replace("Type", "||Type").replace("Quality", "||Quality").replace("Level", "||Level")
                    cText = cText.replace("Might", "||Might").replace(/    /g, "||").replace(/\|\|\|\|/g, "||").replace(/\|\|\s*$/, "");
                    cText = ":::. |" + cText;
                    var table = cText.split("||");
                    if (table.length <= 11) {
                        for (row = 1; row <= 5; row++) {
                            mm += '<p style="line-height:1px; margin:0px; padding:0px;">' + table[table.length - 6 + row] + '</p><br/>';
                        }
                    } else {
                        for (row = 1; row <= 6; row++) {
                            mm += '<p style="line-height:1px; margin:0px; padding:0px;">' + table[table.length - 7 + row] + '</p><br/>';
                        }
                    }
                }
                trStats.innerHTML = mm;
            }
            if (trID == t.selectedCard1) trStats.innerHTML = document.getElementById('trDisplayStats1').innerHTML;

            var ii = Math.max(t.itemLists['chair'].length, t.itemLists['table'].length, t.itemLists['window'].length, t.itemLists['banner'].length, t.itemLists['advisor'].length, t.itemLists['trophy'].length, t.itemLists['candelabrum'].length, t.itemLists['hero'].length, t.itemLists['statue'].length, t.itemLists['pet'].length);

            for (var k = 0; k < ii; k++) {
                for (i in t.itemTypes) {
                    var item = t.itemLists[i][k];
                    if (item != null) {
                        if (item.id == trID) {
                            trDisplay2.innerHTML = t.buildCard(t.itemLists[i][k]);
                            t.selectedCard2 = trID;
                            t.selectedType2 = i;
                            break;
                        }
                    }
                }
            }

        });



    },

    // fill the lists w/ the current TR items
    fillLists: function () {
        var t = Tabs.throneCompare;

        for (i in t.itemTypes) {
            t.itemLists[i] = new Array;
        }

        for (k in unsafeWindow.kocThroneItems) {
            var throne_item = unsafeWindow.kocThroneItems[k];
            t.itemLists[throne_item.type].push(throne_item);
        }
    },

    buildCard: function (I) {
        var t = Tabs.throneCompare;
        var D = [];
        var w = CM.thronestats.mightByQuality;
        var z = CM.thronestats.mightByLevel;

        var text_only = false;

        if (I == null) {
            D.push("<div>");
            D.push("</div>");
            return D.join("");
        }
        D.push("<div class='trCardDisp' id='trCardItemCompare" + I.id + "' style='clear: both;  overflow: visible; position: relative; left: 0px; top: 0px; -moz-transform: scale(" + Table_Scale_TR_Compare + ", " + Table_Scale_TR_Compare + "); -moz-transform-origin: 0% 0%;  -webkit-transform: scale(" + Table_Scale_TR_Compare + ", " + Table_Scale_TR_Compare + ");  -webkit-transform-origin: 0% 0%;);'>");
        if (I.isBroken) {
            D.push(" <div class='cardOverlay semi_transparent rot45'> Broken </div>");
        }
        D.push(" <div class='trCard' style='white-space: normal; padding: 0px;'> ");
        D.push("<div class='section' style='overflow: visible;' id = 'idsection'>");
        D.push(" <div class='title " + I.createPrefix().toLowerCase() + "' style='text-transform: capitalize;'> ");
        D.push(I.name);
        //if (!text_only) D.push(" [" + I.id + "]");
        D.push(" </div> ");
        D.push(" <div class='description'> ");
        if (!text_only) {

            D.push(" <div class='portrait " + I.faction + " " + I.type + "'> </div> ");
            D.push("<ul>");
            D.push("<li> " + uW.g_js_strings.commonstr.faction + ": " + I.faction + "</li>");
            D.push("<li> " + uW.g_js_strings.commonstr.quality + ": " + I.createPrefix() + "</li>");
            D.push("<li> " + uW.g_js_strings.commonstr.type + ": " + I.type + "</li>");
            D.push("<li> " + uW.g_js_strings.commonstr.level + ": " + I.level + "</li>");
            D.push("<li> " + uW.g_js_strings.commonstr.might + ": " + (w[I.quality].Might + z[I.level].Might) + "</li>");
            D.push("</ul>");
            D.push(" </div> ");
            D.push(" <ul> ");
        }

        for (M in I.effects) {
            try {
                var N = I.effects[M];
                effect = CM.thronestats.effects[N.id];

                tier = CM.thronestats.tiers[N.id][N.tier];
                if (!tier) tier = CM.thronestats.tiers[N.id][N.tier - 1];

                var base = tier.base || 0;
                var level = I.level || 0;
                var growth = tier.growth || 0;

                //percent = +(base + ((level * level + level) * growth * 0.75));
                percent = +(base + ((level * level + level) * growth * 0.5));

                var wholeNumber = false;
                if (Math.round(parseFloat(percent)) == parseFloat(percent)) wholeNumber = true;

                percent = (percent > 0) ? "+" + percent : +percent;

                if (wholeNumber)
                    percent = parseFloat(percent).toFixed(0);
                else
                    percent = parseFloat(percent).toFixed(2);
                // percent=Math.ceil(percent);
                css = (M % 2 === 0) ? "even" : "odd";
                B = +(M.split("slot")[1]);
                if (B <= I.quality) {
                    D.push(" <li class='effect " + css + "'> " + percent + "% " + effect[1] + " </li> ");
                } else {
                    D.push(" <li class='effect disabled " + css + "'> " + percent + "% " + effect[1] + " </li> ");
                }
            }
            catch (e) { }

        }
        D.push(" </ul> ");
        D.push(" </div> ");
        D.push(" </ul> ");
        D.push(" </div> ");
        D.push(" </div> ");
        return D.join("");

    },


    show: function () {
        var t = Tabs.throneCompare;
        t.fillLists();
    },

    hide: function () {
    }

}

/** ***************** Champion Savlager ********************* */


Tabs.champSalvage = {
        tabOrder    : 700,
        tabLabel    : 'Champ Salvager',
        tabDisabled : false,
        myDiv    : null,
        timer    : null,
        city     : null,
        cityNum  : 0,
        delItems        : [],
        rowNum   : 0,
        sTimer : null,
        delTimer : null,
        upgradeProfit: true,
        //salvageFailList: {},
        //maxFailures: 2,

        init : function (div) {
            var t = Tabs.champSalvage;
            t.myDiv = div;

            var m = '<Div><DIV  id=chSalvage class=chStat>AUTOMATED CHAMPION SALVAGER</div>';
            m += "<div id='chInfoArea'>";
            m += '</div>';
            m += '<TABLE class="chTabDef chTable" id=chUpgrader width =100% height=0% style="padding-left: 20px;">';
            if (CHsalvageData.salvageActive == false) {
                m += '<tr><TD><div><INPUT id=chSalvagerPower type=button value="Salvager = OFF"/></div></td>';
            } else {
                m += '<tr><TD><div><INPUT id=chSalvagerPower type=button value="Salvager = ON"/></div></td>';
            }
            m += '<tr><td><td/><tdtyle="text-align: center;"></td>'; 
            m += '</tr></table>';

            m += '<table class="chTabPad chTable"><hr/>';
            m += '<tr><td width=35%><div> Keep all: <select id="chSalvageQuality">';
            m += '<option value="1">Common</option>';
            m += '<option value="2">Uncommon</option>';
            m += '<option value="3">Rare</option>';
            m += '<option value="4">Epic</option>';
            m += '<option value="5">Wondrous</option>';
            m += '</select> and higher</div></td>';

            m += '<td colspan=2 width=24%>Keep the first <INPUT id=chSaveNum type=text size=3 maxlength=3 value="' + CHsalvageData.champSaveNum+ '"/> items</td>';
            m += "</tr></table><hr/>";

            m += "<div id='chRulesCreate' class='chRuleCreate'>";

            // rules definition
            m += '<TABLE class="chTabDef chTable" width=100% class=chTabPad style="padding-left: 10px;">';
            m += '<tr><td>  <b>Define the champion items to keep: </b> </td>';

            m += '<td alight="left"><div><span>Faction: <select id="chFactionType">';
            m += '  <option value="any">Any</option>';
            m += '  <option value="fey">Fey</option>';
            m += '  <option value="briton">Briton</option>';
            m += '  <option value="druid">Druid</option>';
            m += '</select></span></div></td>';
            m += '<td alight="left"><div><span>Item type: <select id="chCardType">';
            m += '  <option value="any">Any</option>';
            
            var iTypes = unsafeWindow.cm.CHAMPION.getEquipmentNames();

            for (ii in iTypes)
            {
                var i_type = iTypes[ii];
                m += '  <option value="' + i_type + '">' + i_type + '</option>';
            }
            m += '</select></span></div></td>';
            m += '<td align="right"><INPUT id=chAddRule type=button value="Create Rule"/></td>';
            m += '</tr></table>';
            m += '<TABLE  class="chTabPad chTable" width=100% id="chConditionTable"  style="padding-left: 5px;">';
            m += '<tr><td align=left colspan=1><INPUT id=chAddRow type=button value="Add Row"/></td>';
            m += '<td></td><td></td><td></td><td></td><td></td></tr>';
            m += '</table>';
            m += '</div><hr/>';
            m += '<div id="chSalvStatus" style="text-align: center;" >Loading ... </div>';
            m += '<div id="chNumSalv" style="text-align: center;"></div>';
            m += '<hr/>';
            m += '<div class=chRulePane>';
            m += '<div align=center> <b> Salvager will keep items matching any of these rules </b></div>';
            m += '<div id=chRuleScroll style="position: static; width: 100%; height: '+ OrganizerWindowHeight + '; overflow-x: hidden; overflow-y: auto;" >';
            m += "<div id='chRuleDisplay' >";
            m += '</div></div>';
            m += '<div align=center><table align=center width=100%><tr><td width=50%><input id=chButtonSaveItem type=button value="Save Rules"></td>';
            m += '<td width=50%><input id=chButtonLoadItem type=button value="Load Rules"><input id=chFileLoadItem type=file></td></tr></table></div>';
            m += '</div>';
            t.myDiv.innerHTML = m;

            Tabs.champSalvage.displayNumberSalvaged();

            document.getElementById('chSalvagerPower').addEventListener('click', function(){t.togglePower(this);} , false);

            t.createRow();
            t.buildRuleDisplay();

            document.getElementById('chButtonSaveItem').addEventListener('click', function() {
                uriContent = 'data:application/octet-stream,' + encodeURIComponent(JSON.stringify(CHsalvageData.ruleSet));
                newWindow = window.open(uriContent, 'file.txt');                
            }, false);


            document.getElementById('chButtonLoadItem').addEventListener('click', function() {
                var fileInput = document.getElementById("chFileLoadItem");
                var files = fileInput.files;
                if (files.length==0) {
                    alert('Please Select A File');
                    return;
                }
                var file = files[0];
                
                var reader = new FileReader();
                
                reader.onload = function (e) {  
				    var output = e.target.result;
				    CHsalvageData.ruleSet = JSON.parse(output);
                    CHsalvageData.salvageActive = false;
                    clearInterval(Tabs.champSalvage.sTimer);
                    clearInterval(Tabs.champSalvage.delTimer);
                    Tabs.champSalvage.deleting = false;
                    CHsaveSalvageData();
                    Tabs.champSalvage.init(Tabs.champSalvage.myDiv);
                    alert('Champ Salvage Settings Now Loaded From File');
                };
                reader.readAsText(file);

            }, false);

            document.getElementById('chSaveNum').addEventListener('change', function(){
                CHsalvageData.champSaveNum = parseInt(document.getElementById('chSaveNum').value);
                if (CHsalvageData.champSaveNum < 0) CHsalvageData.champSaveNum = 0;
                CHsaveSalvageData();
            }, false);
            document.getElementById ('chSalvageQuality').addEventListener ('click', function() {t.setSalvageLevel(this.value);}, false);
            document.getElementById ('chSalvageQuality').value = CHsalvageData.minQuality;

            document.getElementById ('chAddRow').addEventListener ('click', function() {t.createRow();}, false);
            document.getElementById ('chAddRule').addEventListener ('click', function() {t.createRule();}, false);

//            $(document.querySelector("#chRuleScroll")).resizable({
//                minWidth: 720,
//                maxWidth: 1000,
//                minHeight: 180,
//                maxHeight: 700,
//                stop: function(event, ui) {
//                    CHupgradeData.salvageH =  ui.size.height + 'px';
//                    CHupgradeData.salvageW =  ui.size.width  + 'px';
//                    CHsaveUpgradeData();
//                }
//            });

//            $(document.querySelector("#chRuleScroll")).css('height', CHupgradeData.salvageH).css('width', CHupgradeData.salvageW);
            // this check makes sure upgrading before deleting is still profitable

            t.upgradeProfit = (5*CM.WorldSettings.getSettingAsNumber("AETHERSTONE_SALVAGE_MULTIPLIER", 500) > CM.thronestats.upgrade[1]["Stones"]); 
            t.start();
        },

        tripOdometer : function() {
            CHsalvageData.numSalvagedItems2 = 0;
            var now = new Date();
            CHsalvageData.since = now.valueOf();
            CHsaveSalvageData();
            Tabs.champSalvage.init(Tabs.champSalvage.myDiv);
        },

        displayNumberSalvaged : function () {
            var since = "";
            var rate = "";
            var now = new Date();

            if (!CHsalvageData.since) CHsalvageData.since = now.valueOf();

            var sinceD = new Date(CHsalvageData.since);

            since = sinceD.toDateString().substring(3,10) + " " + sinceD.toLocaleTimeString();
            var duration = now.valueOf() - CHsalvageData.since +1;
            duration = duration / 1000.0;
            rate = " (" + addCommas(Math.round(CHsalvageData.numSalvagedItems2 / duration * 86400)) + " per day)";

            $(document.querySelector("#chNumSalv")).html('<div style="text-align: center;"> '+ addCommas(CHsalvageData.numSalvagedItems) + " items salvaged" 
                    + ', ' + addCommas(CHsalvageData.numSalvagedItems2) + ' items since ' + since + rate +
            ' <input id="chtripOdo" type=button value="Reset" /> </div>');

            $(document.querySelector("#chtripOdo")).click( function () {
                Tabs.champSalvage.tripOdometer();  
            });
        },

        createRow : function()
        {
            var t = Tabs.champSalvage;
            var table = document.getElementById('chConditionTable');
            var rowCount = table.rows.length;
            var row = table.insertRow(rowCount-1);
            var rowId = "r" + t.rowNum;
            t.rowNum++;
            row.id = rowId;

            var h  = "<td> <select id='" + rowId + "chsel1'> <option value='true'> </option> <option value='false'>NOT</option></select></td>";
            h += "<td> <select id='" + rowId + "chsel2'>";
            h += "  <option value='1'>1x</option>";
            h += "  <option value='2'>2x</option>";
            h += "  <option value='3'>3x</option>";
            h += "  <option value='4'>4x</option>";
            h += "  <option value='5'>5x</option>";
            h += "</select></td>";
            h += "<td> <select id='" + rowId + "chsel3'>";
            h += "</select></td>";
            h += "<td> <select id='" + rowId + "chsel4'>";
            h += "  <option value='e'>Either</option>";
            h += "  <option value='b'>Buff</option>";
            h += "  <option value='d'>Debuff</option>";
            h += "</select></td>";

            h += "<td> Slots: ";
            h += "  <input type=checkbox value='1' checked=true id='" + rowId + "ch_slot1'/>1";
            h += "  <input type=checkbox value='2' checked=true id='" + rowId + "ch_slot2'/>2";
            h += "  <input type=checkbox value='3' checked=true id='" + rowId + "ch_slot3'/>3";
            h += "  <input type=checkbox value='4' checked=true id='" + rowId + "ch_slot4'/>4";
            h += "  <input type=checkbox value='5' checked=true id='" + rowId + "ch_slot5'/>5";
            h += "</td>";

            row.innerHTML = h;

            var effects = [];
            
            for (i = 201; i <= 209 ; i ++)
            {
               var effectName = unsafeWindow.g_js_strings.effects["name_"+ i];
               if (effects.indexOf(effectName) < 0) effects.push(effectName);
            }
            
            //"1","2","3","4","5","6","7","17","18","19","20","21","22","23"
            for (i = 1; i <= 7; i ++)
            {
               var effectName = CM.thronestats.effects[i][1];
               if (effects.indexOf(effectName) < 0) effects.push(effectName);
            }

            var select = document.getElementById(rowId + "chsel3");
            for (index in effects) {
                select.options.add(new Option(effects[index], effects[index]));
            }

            var c = row.insertCell(5);
            var btn = $("<input type=button value='X'/>");
            $(btn).click( function () { t.removeRow(row);});
            $(c).append( btn );

            t.setFullness();
        },

        setSalvageLevel : function(level)
        {
            CHsalvageData.minQuality = level;
            CHsaveSalvageData();
        },

        pickCity : function () {
            var t = Tabs.champSalvage;
            //var cid = GeneralOptions.salvageCityNum;

            if ( parseInt(Seed.resources["city" + Seed.cities[GeneralOptions.salvageCityNum][0]]["rec5"][0]) <= GeneralOptions.maxStones) return GeneralOptions.salvageCityNum;

            var ind = -1;
            var lowest = 9999999;

            if (GeneralOptions.salvageAnyCity)
            {
                for (i= 0; i < Seed.cities.length; i++)
                {
                    if (GeneralOptions.overflow == "lowest")
                    {
                        // put in the city w/ the lowest number of a-stone
                        if ( parseInt(Seed.resources["city" + Seed.cities[i][0]]["rec5"][0]) < lowest )
                        {
                            ind = i;
                            lowest = +Seed.resources["city" + Seed.cities[ind][0]]["rec5"][0];
                        }
                    }
                    else 
                    {
                        // put in the first city with low stones
                        if ( parseInt(Seed.resources["city" + Seed.cities[i][0]]["rec5"][0]) <= GeneralOptions.maxStones) {
                            return i;
                        }
                    }
                }
            }
            return ind;
        },

        createRule : function()
        {
            var t = Tabs.champSalvage;
            t.readRows();
            t.buildRuleDisplay();
        },

        buildRuleDisplay : function ()
        {
            var t = Tabs.champSalvage;
            var rd = document.getElementById('chRuleDisplay');

            var m = '<TABLE  width=100% class="chTabPad chTable">';

            for (i =0; i < CHsalvageData.ruleSet.length; i++)
            {
                var rule = CHsalvageData.ruleSet[i];

                m += '<tr>';
                m += "<td width=90%><div class='chRule'>";

                m += " Type: " + rule.type;
                m += " Faction: " + rule.faction;

                for (ii = 0; ii < rule.conditions.length; ii++)
                {
                    var condition = rule.conditions[ii];

                    if (ii ==0 )
                        m += "<br> Item";
                    else
                        m += "<br> <u>and</u>";

                    if (condition.mustHave != "false")
                        m += " must have ";
                    else
                        m += " must NOT have ";

                    m += condition.number + "x ";
                    m += condition.effect + " ";

                    if (condition.buffType == "b")
                        m += "buff ";
                    else if (condition.buffType == "d")
                        m += "debuff ";
                    else
                        m += "buff or debuff ";

                    m += " in slot(s): ";

                    for (j = 0; j < condition.slots.length; j++)
                    {
                        if (condition.slots[j] ) m += (j+1) + " ";
                    }

                }
                m += "</div></td>";
                m += "<td width=20%><INPUT id=chDelRule" + i + " type=button value='Delete Rule' /></td>";
                m += '</tr>';
            }

            rd.innerHTML = m;

            for (var j=0; j < CHsalvageData.ruleSet.length; j++)
            {
                document.getElementById('chDelRule' +j).v1 = j;
                document.getElementById('chDelRule' +j).addEventListener ('click', function() { t.deleteRule(this.v1);}, false);
            }

        },

        updateCHTab : function() {
            $(document.querySelector("#chexecsalvage")).html("Salvage " + (CHsalvageData.salvageActive ? "ON" : "OFF"));
        },


        togglePower: function(obj){
            var t = Tabs.champSalvage;
            
            if (CHsalvageData.salvageActive == true) {
                var btn = document.getElementById('chSalvagerPower');
                CHsalvageData.salvageActive = false;
                btn.value = "Salvager = OFF";
                clearInterval(t.sTimer);
                clearInterval(t.delTimer);
                t.delItems = [];
                t.deleting = false;
            } else {
                CHsalvageData.salvageActive = true;
                var btn = document.getElementById('chSalvagerPower');
                btn.value = "Salvager = ON";
                t.doSalvage();
                t.start();
            }
            CHsaveSalvageData();
            t.updateCHTab();
        },

        // delete a rule from the ruleset
        deleteRule : function(i)
        {
            var t = Tabs.champSalvage;
            CHsalvageData.ruleSet.splice(i,1);
            CHsaveSalvageData();
            t.buildRuleDisplay();
        },

        readRows : function()
        {
            var t = Tabs.champSalvage;
            var table = document.getElementById('chConditionTable');
            var rowCount = table.rows.length;

            var cType = document.getElementById('chCardType').value;
            var faction = document.getElementById('chFactionType').value;

            var conditions = [];
            for (i=0; i < table.rows.length; i++)
            {
                var row = table.rows[i];
                if (row.id)
                {
                    var s1 = document.getElementById(row.id + "chsel1");
                    var s2 = document.getElementById(row.id + "chsel2");
                    var s3 = document.getElementById(row.id + "chsel3");
                    var s4 = document.getElementById(row.id + "chsel4");

                    var slots = [];
                    for (j =1; j <= 5; j++)
                    {
                        var ch = document.getElementById(row.id + "ch_slot" + j);
                        slots.push(ch.checked);
                    }
                    
                    var c = new CHCondition(s1.value, s2.value, s3.value, s4.value, slots );
                    conditions.push(c);
                }
            }
            var rule1 = new CHRule(cType, faction, conditions);
            t.addRule(rule1);
        },

        removeRow : function(row)
        {
            var table = document.getElementById('chConditionTable');

            for (i=0; i < table.rows.length  ; i++ )
            {
                if (table.rows[i] == row)
                {
                    table.deleteRow(i);
                    break;
                }
            }
        },

        // add a new rule
        addRule : function(rule)
        {
            CHsalvageData.ruleSet.push(rule);
            CHsaveSalvageData();
        },

//        // callback for when salvage city is changed
//        e_CityButton : function (city, x, y){
//            var t = Tabs.champSalvage;
//            CHupgradeData.sCityNum = city.idx;
//            CHsaveUpgradeData();
//        },

        start : function(){
            var t = Tabs.champSalvage;
            if(CHsalvageData.salvageActive) {
                t.sTimer = setInterval(t.doSalvage, 1*60*1000);
            }
        },

        // do the actual discard of champion items
        doSalvage : function() {
            var t = Tabs.champSalvage;

            t.setFullness();

            if(!CHsalvageData.salvageActive) {
                t.deleting = false;
                return;
            }

            if (t.deleting == true) {
                logit("Deleting not complete");
                return;
            }

            t.deleting = true;
            t.setStatus('Salvaging items');        

            t.delItems = t.buildList(false);
            
            //logit("Items to delete: "+ t.delItems.length);
           
            if (t.delItems.length > 0) {
                // upgrade items from +0 to +1 first
                t.upgradeAndDelete();
            } else {
                // give enough time for the last delete to finish
                setTimeout( function () { 
                    t.deleting = false;
                    t.setStatus('No items to salvage.  Waiting for next cycle.');
                }, 3000);
            }
            t.setFullness();
        },

        setFullness : function () {
            // change the color on the throne button when full

            var num_items = unsafeWindow.Object.keys(unsafeWindow.kocChampionItems).length;  
            if (num_items > 110)
                $("a.buttonv2.throne").css('color', 'red');
            else 
                $("a.buttonv2.throne").css('color', 'black');
        },

        // Create the list of items to delete.
        // If 'test' is set to true, then broken/equipted items are included.
        buildList : function(test){
            var t = Tabs.champSalvage;

            var champSaveNum = CHsalvageData.champSaveNum;
            var countItem = 0;
            var retList = [];

            for (k in unsafeWindow.kocChampionItems) {
                var champ_item = unsafeWindow.kocChampionItems[k];
                
                countItem++;

                // ignore these things
                if (champ_item.level !=0) continue;

                // in test mode, include these items
                // These items are at risk if they are repaired or unequiped.
                if (test != true)
                {
                    if (champ_item.equippedTo) continue;
                }

                // keep the first X items
                if ( countItem <= champSaveNum) continue;

                // keep things w/ at least minQuality
                if (champ_item.rarity >= CHsalvageData.minQuality) continue;

                // check the rules
                if (t.applyRules(champ_item.equipmentId)) continue;

                // passes all tests
                retList.push(champ_item.equipmentId);
            }
            return retList;
        },

        // put out a status message on the chSavlStatus div
        setStatus : function(msg)
        {
            document.getElementById('chSalvStatus').innerHTML = msg;
        },

        // returns true if the item should be saved and not salvaged
        applyRules : function(id) {
            var t = Tabs.champSalvage;
            for (r in CHsalvageData.ruleSet)
            {
                var rule = CHsalvageData.ruleSet[r];
                if ( rule.CHapplyRule(id)) return true;
            }
            return false;
        },

        // update items to +1 before deleting
        upgradeAndDelete : function () {
            //logit("upgradeAndDelete");
            var t = Tabs.champSalvage;

            if(!CHsalvageData.salvageActive || t.delItems.length == 0) {
                t.deleting = false;
                return;
            }

            var id = +t.delItems[0];

            // delete the item
            t.delTimer = setTimeout( function () {t.doDelete(id)}, 4000);
        },

        removeItem : function (id, cityId, numStones) {

            var item = unsafeWindow.kocChampionItems[id];
            if (!item) return;

            var c = +(Seed.resources["city" + cityId]["rec5"][0]);
            delete unsafeWindow.kocChampionItems[id];
            
            //CM.ChampionModalView.renderFilteredItems();
        },

        doDelete : function(id) {

            var t = Tabs.champSalvage;
            if(!CHsalvageData.salvageActive || !t.deleting) {
                t.deleting = false;
                return;
            }

            //logit("deleting item: " + id);
            var item = unsafeWindow.kocChampionItems[id];
            if (item) t.setStatus('Salvaging ' + item.name);

            var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
            var num_city = t.pickCity();
            if ( num_city < 0)
            {
                num_city = +GeneralOptions.salvageCityNum;
                logit(" cities full");
                t.setStatus("All cities are (nearly) full of aetherstone");
            }

            //params.ctrl = 'ChampionRoom\\ChampionRoomServiceAjax';
            
            params.action = "8";
            params.eids = id;
            params.cityId = Seed.cities[num_city][0];
            
            new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/ceEquipmentManagerAjax.php" + unsafeWindow.g_ajaxsuffix, {
                method: "post",
                parameters: params,
                loading: true,
                onSuccess: function (transport) {
                    try {
                        var rslt = eval("(" + transport.responseText + ")");
                        var champ_item = unsafeWindow.kocChampionItems[id];
                        
                        if(rslt.ok == true) {
                            var eid = rslt.equipmentIds[0];
                            champ_item = unsafeWindow.kocChampionItems[eid];
                            
                            if (champ_item) SalvageLog('Deleted Champion item '+ champ_item.name);
                            CHsalvageData.numSalvagedItems++;
                            CHsalvageData.numSalvagedItems2++;
                            CHsaveSalvageData();

                            if (champ_item) {
                                CHsalvageData.numSalvaged[champ_item.rarity]++;
                                CHsaveSalvageData();
                                Tabs.champSalvage.removeItem(eid , Seed.cities[num_city][0], parseInt(rslt.aetherstones));
                            }
                            Tabs.champSalvage.displayNumberSalvaged();
                        }
                        else
                        {
                            //logit("rslt: " + inspect(rslt,3,1));
                            if (champ_item) Tabs.champSalvage.setStatus('Unable to salvage item ' + champ_item.name);
                        }

                        var idx = t.delItems.indexOf(id);
                        if (idx >=0)
                        {
                            t.delItems.splice(idx,1); 
                            // Remove item from array regardless
                            // of success. Catch on next refresh
                        }
                        if (t.delItems.length > 0) { // Check if the array is empty
                            t.upgradeAndDelete();
                        } else {
                            //logit("deletes done");
                            t.deleting = false;
                            t.setStatus('Salvaging complete.  Waiting for next cycle.');
                            return;
                        }
                    } catch (e) {
                        logit("Delete exception: " + inspect(e,3,1));
                        t.deleting = false;
                    }
                },
                onFailure: function () {
                    //logit("failure case");
                    t.delIems = [];
                    t.deleting = false;
                    if (unsafeWindow.kocChampionItems[id] )
                        logit("salvage failed for item " + unsafeWindow.kocChampionItems[id].name );
                    return;
                }
            });

        },

        show: function(){
        },

        hide: function(){
        }
}


//class definition for upgrade queue items
function QueueItem()
{
    this.item   = 0;
    this.action = "upgrade";
    this.level  = 1;
    this.status = "not started";
    this.triesTotal = 0;
    this.triesThis = 0;
    this.triesLast = 0;
    this.lastUpgrade = "none";
    this.upgrades = [];
}


//class definition for rules and conditions
function CHRule(type, faction, conditions)
{
    this.type = type;
    this.faction = faction;
    if (conditions)
        this.conditions = conditions;
    else
        this.conditions = [];

    this.CHaddCondition = CHaddCondition;
    this.CHapplyRule    = CHapplyRule;
}

function CHcloneRule( rule)
{
    this.type = rule.type;
    this.faction = rule.faction;
    this.conditions = [];
    if (rule.conditions) this.conditions = rule.conditions;

    this.CHaddCondition = CHaddCondition;
    this.CHapplyRule    = CHapplyRule;
}

function CHaddCondition(c)
{
    this.conditions.push(c);
}


function CHapplyRule(id)
{
    var champ_item = unsafeWindow.kocChampionItems[id];
    var champItemTypes = {"weapon": 1, "chest": 2, "helm":3, "shield": 5};
    
    if (this.type != "any" && (champItemTypes[this.type] != champ_item.type)) return false;
    if (this.faction != "any" && (this.faction != champ_item.faction)) return false;
    for (r in this.conditions)
    {
        if (!this.conditions[r].CHcheckCondition(id)) return false;
    }
    return true;
}

function CHCondition(mustHave, number, effect, buffType, slots )
{
    this.mustHave = mustHave;
    this.number   = number;
    this.effect   = effect;
    this.buffType = buffType;
    this.slots    = slots;

    this.CHcheckCondition = CHcheckCondition;
}

function CHcheckCondition(id)
{
    var numberFound  = 0;
    var effectsFound = false;
    // get card
    var champ_item = unsafeWindow.kocChampionItems[id];

    if (!champ_item) return false;

    // for loop for stat
    // count up occurances
    for (i in champ_item.effects)
    {
        var id = champ_item.effects[i].id;
        var card_effect = "";
        
        if ( +id > 200 )
        {
            card_effect = unsafeWindow.g_js_strings.effects["name_" + id];
        }
        else
        {
            card_effect = CM.thronestats.effects[id][1];
        }
        var slotid = +i;
        if (!this.slots[slotid-1])
        {
            continue;
        }

        var eff = this.effect + " ";

        if (card_effect.indexOf(" Debuff") < 0) card_effect += " ";

        if (!card_effect.startsWith(eff)) continue;

        // If we do not care about buff/debuff then we are done
        if (this.buffType == "e") {
            numberFound++;
        } else {
            // Does the description end with a Debuff
            if (card_effect.endsWith(" Debuff")) {
                // Are we looking for a debuff
                if (this.buffType == "d")
                {
                    numberFound++;
                }
            } else {
                if (this.buffType == "b")
                {
                    numberFound++;
                }
            }
        } 
    }

    if ( numberFound >= this.number)
    {
        effectsFound = true;
    }

    if (this.mustHave != "false")
        return effectsFound;
    else
        return (!effectsFound);
}

/** ***************** Throne Savlager ********************* */

Tabs.throneSalvage = {
        tabOrder    : 200,
        tabLabel    : 'Salvage TR',
        tabDisabled : false,
        myDiv    : null,
        timer    : null,
        city     : null,
        cityNum  : 0,
        delItems : [],
        rowNum   : 0,
        sTimer : null,
        delTimer : null,
        upgradeProfit: true,
        //salvageFailList: {},
        //maxFailures: 2,

        init : function (div) {
            var t = Tabs.throneSalvage;
            t.myDiv = div;

            var m = '<Div><DIV  id=trSalvage class=trStat>AUTOMATED THRONE ROOM SALVAGER</div>';
            m += "<div id='trInfoArea'>";
            m += '</div>';

            m += '<table class="trTabPad trTable"><tr><td width=30%/><td width=35%/><td width=35%/></tr>';
            if (TRsalvageData.salvageActive == false) {
                m += '<tr><TD><div><INPUT id=trSalvagerPower type=button value="Salvager = OFF"/></div></td>';
            } else {
                m += '<tr><TD><div><INPUT id=trSalvagerPower type=button value="Salvager = ON"/></div></td>';
            }
            m += '<td><div> Keep all: <select id="trSalvageQuality">';
            m += '<option value="1">Common</option>';
            m += '<option value="2">Uncommon</option>';
            m += '<option value="3">Rare</option>';
            m += '<option value="4">Epic</option>';
            m += '<option value="5">Wondrous</option>';
            m += '</select> and higher</div></td>';

            m += '<td align=right>Keep the first <INPUT id=trSaveNum type=text size=3 maxlength=3 value="' + TRsalvageData.throneSaveNum + '"/> items</td>';
            m += "</tr></table><hr/>";

            m += "<div id='trRulesCreate' class='trRuleCreate'>";

            // rules definition
            m += '<TABLE class="trTabDef trTable" width=100% class=trTabPad style="padding-left: 10px;">';
            m += '<tr><td>  <b>Define the TR items to keep: </b> </td>';

            m += '<td alight="left"><div><span>Faction: <select id="trFactionType">';
            m += '  <option value="any">Any</option>';
            m += '  <option value="fey">Fey</option>';
            m += '  <option value="briton">Briton</option>';
            m += '  <option value="druid">Druid</option>';
            m += '</select></span></div></td>';
            m += '<td alight="left"><div><span>Card type: <select id="trCardType">';
            m += '  <option value="any">Any</option>';
            m += '  <option value="chair">Chair</option>';
            m += '  <option value="table">Table</option>';
            m += '  <option value="window">Window</option>';
            m += '  <option value="banner">Banner</option>';
            m += '  <option value="advisor">Advisor</option>';
            m += '  <option value="trophy">Trophy</option>';
            m += '  <option value="candelabrum">Candelabrum</option>';
            m += '  <option value="hero">Hero</option>';
            m += '  <option value="statue">Statue</option>';
            m += '  <option value="pet">Pet</option>';
            m += '</select></span></div></td>';
            m += '<td align="right"><INPUT id=trAddRule type=button value="Create Rule"/></td>';
            m += '</tr></table>';
            m += '<TABLE  class="trTabPad trTable" width=100% id="trConditionTable"  style="padding-left: 5px;">';
            m += '<tr><td align=left colspan=1><INPUT id=trAddRow type=button value="Add Row"/></td>';
            m += '<td></td><td></td><td></td><td></td><td></td></tr>';
            m += '</table>';
            m += '</div><hr/>';
            m += '<div id="trSalvStatus" style="text-align: center;" >Loading ... </div>';
            m += '<div id="trNumSalv" style="text-align: center;"></div>';
            m += '<hr/>';
            m += '<div class=trRulePane>';
            m += '<div align=center> <b> Salvager will keep items matching any of these rules </b></div>';
            m += '<div id=trRuleScroll style="position: static; width: 100%; height: ' + OrganizerWindowHeight + '; overflow-x: hidden; overflow-y: auto;" >';
            m += "<div id='trRuleDisplay' >";
            m += '</div></div>';
            m += '<div align=center><table align=center width=100%><tr><td width=50%><input id=trButtonSaveItem type=button value="Save Rules"></td>';
            m += '<td width=50%><input id=trButtonLoadItem type=button value="Load Rules"><input id=trFileLoadItem type=file></td></tr></table></div>';
            m += '</div>';
            t.myDiv.innerHTML = m;

            Tabs.throneSalvage.displayNumberSalvaged();

            document.getElementById('trSalvagerPower').addEventListener('click', function(){t.togglePower(this);} , false);

            t.createRow();
            t.buildRuleDisplay();

            document.getElementById('trButtonSaveItem').addEventListener('click', function() {
                alert("WARNING: The file you're about to save will most likely need to be renamed to a .TXT file, OR opened with NOTEPAD");
                uriContent = 'data:application/octet-stream,' + encodeURIComponent(JSON.stringify(TRsalvageData.ruleSet));
                newWindow=window.open(uriContent, 'file.txt');                
            }, false);


            document.getElementById('trButtonLoadItem').addEventListener('click', function() {
                var fileInput = document.getElementById("trFileLoadItem");
                var files = fileInput.files;
                if (files.length==0) {
                    alert('Please Select A File');
                    return;
                }
                var file = files[0];
                
                var reader = new FileReader();
                
                reader.onload = function (e) {  
				    var output = e.target.result;
				    TRsalvageData.ruleSet = JSON.parse(output);
                    TRsalvageData.salvageActive = false;
                    clearInterval(Tabs.throneSalvage.sTimer);
                    clearInterval(Tabs.throneSalvage.delTimer);
                    Tabs.throneSalvage.deleting = false;
                    TRsaveSalvageData();
                    Tabs.throneSalvage.init(Tabs.throneSalvage.myDiv);
                    alert('Throne Salvage Settings Now Loaded From File');
                };
                reader.readAsText(file);

            }, false);

            document.getElementById('trSaveNum').addEventListener('change', function(){
                TRsalvageData.throneSaveNum = parseInt(document.getElementById('trSaveNum').value);
                if (TRsalvageData.throneSaveNum < 0) TRsalvageData.throneSaveNum = 0;
                TRsaveSalvageData();
            }, false);
            document.getElementById ('trSalvageQuality').addEventListener ('click', function() {t.setSalvageLevel(this.value);}, false);
            document.getElementById ('trSalvageQuality').value = TRsalvageData.minQuality;

            document.getElementById ('trAddRow').addEventListener ('click', function() {t.createRow();}, false);
            document.getElementById ('trAddRule').addEventListener ('click', function() {t.createRule();}, false);

/* removing sizing restrictions

            $(document.querySelector("#trRuleScroll")).resizable({
                minWidth: 720,
                maxWidth: 1000,
                minHeight: 180,
                maxHeight: 700,
                stop: function(event, ui) {
                    TRupgradeData.salvageH =  ui.size.height + 'px';
                    TRupgradeData.salvageW =  ui.size.width  + 'px';
                    TRsaveUpgradeData();
                }
            });

            $(document.querySelector("#trRuleScroll")).css('height', TRupgradeData.salvageH).css('width', TRupgradeData.salvageW);
*/
            if (TRsalvageData.upgradedToDelete.length > 0)
            {
                // some items were left over that need to be deleted 
                logit("Found " + TRsalvageData.upgradedToDelete.length + " upgraded items that need to be deleted.");

                for (k=0; k< TRsalvageData.upgradedToDelete.length; k++)
                {
                    var id = TRsalvageData.upgradedToDelete[k];
                    // if the item is not longer in the inventory, remove the id
                    if (!unsafeWindow.kocThroneItems[id] ) {
                        logit("Removing item " + id +" from salvage list.");
                        TRsalvageData.upgradedToDelete.splice(k,1); // Remove item from array
                        TRsaveSalvageData();
                        k--;
                    }
                }

                // resume deleting things
                if (TRsalvageData.salvageActive)
                {
                    t.delItems = TRsalvageData.upgradedToDelete;
                    t.deleting = true;
                    t.upgradeAndDelete();
                }
                else
                {
                    // if the salvager is powered off, clear the list
                    TRsalvageData.upgradedToDelete = [];
                    TRsaveSalvageData();
                }
            }

            // this check makes sure upgrading before deleting is still profitable

            t.upgradeProfit = (5*CM.WorldSettings.getSettingAsNumber("AETHERSTONE_SALVAGE_MULTIPLIER", 500) > CM.thronestats.upgrade[1]["Stones"]); 
            t.start();
        },

        tripOdometer : function() {
            TRsalvageData.numSalvagedItems2 = 0;
            var now = new Date();
            TRsalvageData.since = now.valueOf();
            TRsaveSalvageData();
            Tabs.throneSalvage.init(Tabs.throneSalvage.myDiv);
        },

        displayNumberSalvaged : function () {
            var since = "";
            var rate = "";
            var now = new Date();

            if (!TRsalvageData.since) TRsalvageData.since = now.valueOf();

            var sinceD = new Date(TRsalvageData.since);

            since = sinceD.toDateString().substring(3,10) + " " + sinceD.toLocaleTimeString();
            var duration = now.valueOf() - TRsalvageData.since +1;
            duration = duration / 1000.0;
            rate = " (" + addCommas(Math.round(TRsalvageData.numSalvagedItems2 / duration * 86400)) + " per day)";

            $(document.querySelector("#trNumSalv")).html('<div style="text-align: center;"> '+ addCommas(TRsalvageData.numSalvagedItems) + " items salvaged" 
                    + ', ' + addCommas(TRsalvageData.numSalvagedItems2) + ' items since ' + since + rate +
            ' <input id="tripOdo" type=button value="Reset" /> </div>');

            $(document.querySelector("#tripOdo")).click( function () {
                Tabs.throneSalvage.tripOdometer();  
            });
        },

        createRow : function()
        {
            var t = Tabs.throneSalvage;
            var table = document.getElementById('trConditionTable');
            var rowCount = table.rows.length;
            var row = table.insertRow(rowCount-1);
            var rowId = "r" + t.rowNum;
            t.rowNum++;
            row.id = rowId;

            var h  = "<td> <select id='" + rowId + "sel1'> <option value='true'> </option> <option value='false'>NOT</option></select></td>";
            h += "<td> <select id='" + rowId + "sel2'>";
            h += "  <option value='1'>1x</option>";
            h += "  <option value='2'>2x</option>";
            h += "  <option value='3'>3x</option>";
            h += "  <option value='4'>4x</option>";
            h += "  <option value='5'>5x</option>";
            h += "</select></td>";
            h += "<td> <select id='" + rowId + "sel3'>";
            h += "</select></td>";
            h += "<td> <select id='" + rowId + "sel4'>";
            h += "  <option value='e'>Either</option>";
            h += "  <option value='b'>Buff</option>";
            h += "  <option value='d'>Debuff</option>";
            h += "</select></td>";

            h += "<td> Slots: ";
            h += "  <input type=checkbox value='1' checked=true id='" + rowId + "slot1'/>1";
            h += "  <input type=checkbox value='2' checked=true id='" + rowId + "slot2'/>2";
            h += "  <input type=checkbox value='3' checked=true id='" + rowId + "slot3'/>3";
            h += "  <input type=checkbox value='4' checked=true id='" + rowId + "slot4'/>4";
            h += "  <input type=checkbox value='5' checked=true id='" + rowId + "slot5'/>5";
            h += "</td>";

            row.innerHTML = h;

            var effects = [];

            for (e in CM.thronestats.effects)
            {
                var effectName = CM.thronestats.effects[e][1].split(" Debuff")[0];
                if (effects.indexOf(effectName) < 0) effects.push(effectName);
            }

            var select = document.getElementById(rowId + "sel3");
            for(index in effects) {
                select.options.add(new Option(effects[index], effects[index]));
            }

            // add in options for troops specific effects
            select.options.add(new Option("Any Infantry","Infantry"));
            select.options.add(new Option("Any Ranged","Ranged"));
            select.options.add(new Option("Any Horsed","Horsed"));
            select.options.add(new Option("Any Siege","Siege")); 

            var c = row.insertCell(5);
            var btn = $("<input type=button value='X'/>");
            $(btn).click( function () { t.removeRow(row);});
            $(c).append( btn );

            t.setFullness();
        },

        setSalvageLevel : function(level)
        {
            TRsalvageData.minQuality = level;
            TRsaveSalvageData();
        },

        pickCity : function () {
            var t = Tabs.throneSalvage;
            //var cid = GeneralOptions.salvageCityNum;
            
            if ( parseInt(Seed.resources["city" + Seed.cities[GeneralOptions.salvageCityNum][0]]["rec5"][0]) <= GeneralOptions.maxStones) return GeneralOptions.salvageCityNum;

            var ind = -1;
            var lowest = 9999999;

            if (GeneralOptions.salvageAnyCity)
            {
                for (i= 0; i < Seed.cities.length; i++)
                {
                    if (GeneralOptions.overflow == "lowest")
                    {
                        // put in the city w/ the lowest number of a-stone
                        if ( parseInt(Seed.resources["city" + Seed.cities[i][0]]["rec5"][0]) < lowest )
                        {
                            ind = i;
                            lowest = +Seed.resources["city" + Seed.cities[ind][0]]["rec5"][0];
                        }
                    }
                    else 
                    {
                        // put in the first city with low stones
                        if ( parseInt(Seed.resources["city" + Seed.cities[i][0]]["rec5"][0]) <= GeneralOptions.maxStones) {
                            return i;
                        }
                    }
                }
            }
            return ind;
        },

        createRule : function()
        {
            var t = Tabs.throneSalvage;
            t.readRows();
            t.buildRuleDisplay();
        },

        buildRuleDisplay : function ()
        {
            var t = Tabs.throneSalvage;
            var rd = document.getElementById('trRuleDisplay');

            var m = '<TABLE  width=100% class="trTabPad trTable">';

            for (i =0; i < TRsalvageData.ruleSet.length; i++)
            {
                var rule = TRsalvageData.ruleSet[i];

                m += '<tr>';
                m += "<td width=90%><div class='trRule'>";

                m += " Type: " + rule.type;
                m += " Faction: " + rule.faction;

                for (ii = 0; ii < rule.conditions.length; ii++)
                {
                    var condition = rule.conditions[ii];

                    if (ii ==0 )
                        m += "<br> Item";
                    else
                        m += "<br> <u>and</u>";

                    if (condition.mustHave != "false")
                        m += " must have ";
                    else
                        m += " must NOT have ";

                    m += condition.number + "x ";
                    m += condition.effect + " ";

                    if (condition.buffType == "b")
                        m += "buff ";
                    else if (condition.buffType == "d")
                        m += "debuff ";
                    else
                        m += "buff or debuff ";

                    m += " in slot(s): ";

                    for (j = 0; j < condition.slots.length; j++)
                    {
                        if (condition.slots[j] ) m += (j+1) + " ";
                    }

                }
                m += "</div></td>";
                m += "<td width=20%><INPUT id=trDelRule" + i + " type=button value='Delete Rule' /></td>";
                m += '</tr>';
            }

            rd.innerHTML = m;

            for (var j=0; j < TRsalvageData.ruleSet.length; j++)
            {
                document.getElementById('trDelRule' +j).v1 = j;
                document.getElementById('trDelRule' +j).addEventListener ('click', function() { t.deleteRule(this.v1);}, false);
            }

        },

        updateTRTab : function() {
            $(document.querySelector("#trexecsalvage")).html("Salvage " + (TRsalvageData.salvageActive ? "ON" : "OFF"));
        },


        togglePower: function(obj){
            var t = Tabs.throneSalvage;
            
            if (TRsalvageData.salvageActive == true) {
                var btn = document.getElementById('trSalvagerPower');
                TRsalvageData.salvageActive = false;
                btn.value = "Salvager = OFF";
                clearInterval(t.sTimer);
                clearInterval(t.delTimer);
                t.delItems = [];
                TRsalvageData.upgradedToDelete = [];
                t.deleting = false;
            } else {
                TRsalvageData.salvageActive = true;
                var btn = document.getElementById('trSalvagerPower');
                btn.value = "Salvager = ON";
                t.doSalvage();
                t.start();
            }
            TRsaveSalvageData();
            t.updateTRTab();
        },

        // delete a rule from the ruleset
        deleteRule : function(i)
        {
            var t = Tabs.throneSalvage;
            TRsalvageData.ruleSet.splice(i,1);
            TRsaveSalvageData();
            t.buildRuleDisplay();
        },

        readRows : function()
        {
            var t = Tabs.throneSalvage;
            var table = document.getElementById('trConditionTable');
            var rowCount = table.rows.length;

            var cType = document.getElementById('trCardType').value;
            var faction = document.getElementById('trFactionType').value;

            var conditions = [];
            for (i=0; i < table.rows.length; i++)
            {
                var row = table.rows[i];
                if (row.id)
                {
                    var s1 = document.getElementById(row.id + "sel1");
                    var s2 = document.getElementById(row.id + "sel2");
                    var s3 = document.getElementById(row.id + "sel3");
                    var s4 = document.getElementById(row.id + "sel4");

                    var slots = [];
                    for (j =1; j <= 5; j++)
                    {
                        var ch = document.getElementById(row.id + "slot" + j);
                        slots.push(ch.checked);
                    }

                    var c = new TRCondition(s1.value, s2.value, s3.value, s4.value, slots );
                    conditions.push(c);
                }
            }
            var rule1 = new TRRule(cType, faction, conditions);
            t.addRule(rule1);
        },

        removeRow : function(row)
        {
            var table = document.getElementById('trConditionTable');

            for (i=0; i < table.rows.length  ; i++ )
            {
                if (table.rows[i] == row)
                {
                    table.deleteRow(i);
                    break;
                }
            }
        },

        // add a new rule
        addRule : function(rule)
        {
            TRsalvageData.ruleSet.push(rule);
            TRsaveSalvageData();
        },

        start : function(){
            var t = Tabs.throneSalvage;
            if(TRsalvageData.salvageActive) {
                t.sTimer = setInterval(t.doSalvage, 1*60*1000);
            }
        },

        // do the actual discard of TR items
        doSalvage : function() {
            var t = Tabs.throneSalvage;

            t.setFullness();

            if(!TRsalvageData.salvageActive) {
                t.deleting = false;
                return;
            }

            if (t.deleting == true) {
                logit("Deleting not complete");
                return;
            }

            t.deleting = true;
            t.setStatus('Salvaging items');        

            t.delItems = t.buildList(false);

            // go through the list and remove items that have failed too many times

            //logit("Del List 1: " + inspect(t.delItems,3,1));

            // future
            //for (ii =0; ii < t.delItems.length; ii++) {
            //var id = t.delItems[ii];
            //if ( t.salvageFailList[id] && t.salvageFailList[id] >= t.maxFailures)
            // {
            //   logit("Maximum failures reached for item: " + id);
            //   t.delItems.splice(ii,1); // Remove item from array
            //   ii--; // back up the index
            // }
            //}
            //logit("Del List 2: " + inspect(t.delItems,3,1));


            if (t.delItems.length > 0) {
                // upgrade items from +0 to +1 first
                t.upgradeAndDelete();
            } else {
                // give enough time for the last delete to finish
                setTimeout( function () { 
                    t.deleting = false;
                    t.setStatus('No items to salvage.  Waiting for next cycle.');
                }, 3000);
            }
            t.setFullness();
        },

        setFullness : function () {
            // change the color on the throne button when full

            var num_items = unsafeWindow.Object.keys(unsafeWindow.kocThroneItems).length;  
            if (num_items > 110)
                $("a.buttonv2.throne").css('color', 'red');
            else 
                $("a.buttonv2.throne").css('color', 'black');
        },

        // Create the list of items to delete.
        // If 'test' is set to true, then broken/equipted items are included.
        buildList : function(test){
            var t = Tabs.throneSalvage;

            var throneSaveNum = TRsalvageData.throneSaveNum;
            var countItem = 0;
            var retList = [];

            for (k in unsafeWindow.kocThroneItems) {
                var throne_item = unsafeWindow.kocThroneItems[k];
                countItem++;

                // ignore these things
                if (throne_item.level !=0) continue;

                // in test mode, include these items
                // These items are at risk if they are repaired or unequiped.
                if (test != true)
                {
                    if (throne_item.isEquipped) continue;
                    if (throne_item.isBroken) continue;
                }

                // keep the first X items
                if ( countItem <= throneSaveNum) continue;

                // keep things w/ at least minQuality
                if (throne_item.quality >= TRsalvageData.minQuality) continue;

                // check the rules
                if (t.applyRules(throne_item.id)) continue;

                // passes all tests
                retList.push(throne_item.id);
            }
            return retList;
        },

        // put out a status message on the trSavlStatus div
        setStatus : function(msg)
        {
            document.getElementById('trSalvStatus').innerHTML = msg;
        },

        // returns true if the item should be saved and not salvaged
        applyRules : function(id) {
            var t = Tabs.throneSalvage;
            for (r in TRsalvageData.ruleSet)
            {
                var rule = TRsalvageData.ruleSet[r];
                if ( rule.TRapplyRule(id)) return true;
            }
            return false;
        },

        // update items to +1 before deleting
        upgradeAndDelete : function () {
            //logit("upgradeAndDelete");
            var t = Tabs.throneSalvage;

            if(!TRsalvageData.salvageActive || t.delItems.length == 0) {
                t.deleting = false;
                return;
            }

            var id = +t.delItems[0];

            // since simple +0 can be upgrade w/ near 100% success for 1500 a-stone and then salvaged for 2150
            // upgrade all these items 1 level
            if (TRsalvageData.upgradeFirst && t.upgradeProfit) 
            {

                var item = unsafeWindow.kocThroneItems[id];
                if (item) {
                    if ( item.quality <= TRsalvageData.upgradeFirstQual && item.level==0 
                            && ( TRsalvageData.upgradedToDelete.indexOf(id) < 0 ) )
                    {
                        TRsalvageData.upgradedToDelete.push(id);
                        TRsaveSalvageData();
                        Tabs.throneUpgrader.doUpgrade(+id,true);
                    }
                }
                else
                {
                    logit("item not found.");    
                }
            }
            // delete the item
            t.delTimer = setTimeout( function () {t.doDelete(id)}, 4000);
        },

        removeItem : function (id, cityId, numStones) {

            var item = unsafeWindow.kocThroneItems[id];
            if (!item) return;

            var c = +(Seed.resources["city" + cityId]["rec5"][0]);
            var b = Seed.throne.slotEquip;

            Seed.resources["city" + cityId]["rec5"][0] = c + numStones;
            jQuery.each(b, function (g, h) {
                a = jQuery.inArray(id, h);
                if (a > -1) {
                    h.splice(a, 1)
                }
            });

            delete unsafeWindow.kocThroneItems[id];
            CM.ThroneView.renderInventory(unsafeWindow.kocThroneItems);
        },

        doDelete : function(id) {

            var t = Tabs.throneSalvage;
            if(!TRsalvageData.salvageActive || !t.deleting) {
                t.deleting = false;
                return;
            }

            //logit("deleting item: " + id);
            var item = unsafeWindow.kocThroneItems[id];
            if (item) t.setStatus('Salvaging ' + item.name);

            var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
            var num_city = t.pickCity();
            if ( num_city < 0)
            {
                num_city = +GeneralOptions.salvageCityNum;
                logit(" cities full");
                t.setStatus("All cities are (nearly) full of aetherstone");
            }

            params.ctrl = 'throneRoom\\ThroneRoomServiceAjax';
            params.action = 'salvage';
            params.itemId = id;
            params.cityId = Seed.cities[num_city][0];

            new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch53.php" + unsafeWindow.g_ajaxsuffix, {
                method: "post",
                parameters: params,
                loading: true,
                onSuccess: function (transport) {
                    try {
                        var rslt = eval("(" + transport.responseText + ")");
                        //logit("Salvage: " + inspect(rslt,3,1));
                        var throne_item = unsafeWindow.kocThroneItems[id];
                        if(rslt.ok) {
                            if (throne_item) SalvageLog('Deleted Throne Room item '+ throne_item.name);
                            TRsalvageData.numSalvagedItems++;
                            TRsalvageData.numSalvagedItems2++;
                            TRsaveSalvageData();


                            if (throne_item) {
                                TRsalvageData.numSalvaged[throne_item.quality]++;
                                TRsaveSalvageData();
                                Tabs.throneSalvage.removeItem(id , Seed.cities[num_city][0], rslt.aetherstones);
                            }

                            Tabs.throneSalvage.displayNumberSalvaged();

                            var sidx = TRsalvageData.upgradedToDelete.indexOf(id);
                            if (sidx >=0)
                            {
                                TRsalvageData.upgradedToDelete.splice(sidx,1); // Remove item from array
                                TRsaveSalvageData();
                            }
                        }
                        else
                        {
                            logit("rslt: " + inspect(rslt,3,1));
                            if (throne_item) Tabs.throneSalvage.setStatus('Unable to salvage item ' + throne_item.name);

                            // store off the object id and record the number of failures.  If it fails too many times, skip it next time.
                            //if ( !t.salvageFailList[id] ) 
                            //   t.salvageFailList[id] = 1;
                            //else
                            //   t.salvageFailList[id]++;

                            //logit("Salvage failed.  Current number of failures of item " + id +" is " + t.salvageFailList[id]);

                            unsafeWindow.cm.ThroneView.renderInventory(unsafeWindow.kocThroneItems);
                        }

                        var idx = t.delItems.indexOf(id);
                        if (idx >=0)
                        {
                            t.delItems.splice(idx,1); 
                            // Remove item from array regardless
                            // of success. Catch on next refresh
                        }
                        if (t.delItems.length > 0) { // Check if the array is empty
                            t.upgradeAndDelete();
                        } else {
                            //logit("deletes done");
                            t.deleting = false;
                            t.setStatus('Salvaging complete.  Waiting for next cycle.');
                            return;
                        }
                    } catch (e) {
                        logit("Delete exception: " + inspect(e,3,1));
                        t.deleting = false;
                    }
                },
                onFailure: function () {
                    logit("failure case");
                    t.delIems = [];
                    t.deleting = false;
                    if (unsafeWindow.kocThroneItems[id] )
                        logit("salvage failed for item " + unsafeWindow.kocThroneItems[id].name );
                    unsafeWindow.cm.ThroneView.renderInventory(unsafeWindow.kocThroneItems);
                    return;
                }
            });

        },

        show: function(){
        },

        hide: function(){
        }
}

//class definition for upgrade queue items
function QueueItem()
{
    this.item   = 0;
    this.action = "upgrade";
    this.level  = 1;
    this.status = "not started";
    this.triesTotal = 0;
    this.triesThis = 0;
    this.triesLast = 0;
    this.lastUpgrade = "none";
    this.upgrades = [];
}


//class definition for rules and conditions
function TRRule(type, faction, conditions)
{
    this.type = type;
    this.faction = faction;
    if (conditions)
        this.conditions = conditions;
    else
        this.conditions = [];

    this.TRaddCondition = TRaddCondition;
    this.TRapplyRule    = TRapplyRule;
}

function TRcloneRule( rule)
{
    this.type = rule.type;
    this.faction = rule.faction;
    this.conditions = [];
    if (rule.conditions) this.conditions = rule.conditions;

    this.TRaddCondition = TRaddCondition;
    this.TRapplyRule    = TRapplyRule;
}

function TRaddCondition(c)
{
    this.conditions.push(c);
}

function TRapplyRule(id)
{
    var throne_item = unsafeWindow.kocThroneItems[id];

    if (this.type != "any" && (this.type != throne_item.type)) return false;
    if (this.faction != "any" && (this.faction != throne_item.faction)) return false;
    for (r in this.conditions)
    {
        if (!this.conditions[r].TRcheckCondition(id)) return false;
    }
    return true;
}

function TRCondition(mustHave, number, effect, buffType, slots )
{
    this.mustHave = mustHave;
    this.number   = number;
    this.effect   = effect;
    this.buffType = buffType;
    this.slots    = slots;

    this.TRcheckCondition = TRcheckCondition;
}

function TRcheckCondition(id)
{
    var numberFound  = 0;
    var effectsFound = false;
    // get card
    var throne_item = unsafeWindow.kocThroneItems[id];

    if (!throne_item) return false;

    // for loop for stat
    // count up occurances
    for (i in throne_item.effects)
    {
        var card_effect = CM.thronestats.effects[throne_item.effects[i].id][1];
        var slotid = i.split("slot")[1];

        if (!this.slots[slotid-1])
        {
            continue;
        }

        var eff = this.effect + " ";

        if (card_effect.indexOf(" Debuff") < 0) card_effect += " ";

        if (!card_effect.startsWith(eff)) continue;

        // special rule for Chance to Find Items 
        if ( (card_effect == "Chance to Find Items ") && (card_effect != eff ) ) continue;

        // If we do not care about buff/debuff then we are done
        if (this.buffType == "e") {
            numberFound++;
        } else {
            // Does the description end with a Debuff
            if (card_effect.endsWith(" Debuff")) {
                // Are we looking for a debuff
                if (this.buffType == "d")
                {
                    numberFound++;
                }
            } else {
                if (this.buffType == "b")
                {
                    numberFound++;
                }
            }
        } 
    }

    if ( numberFound >= this.number)
    {
        effectsFound = true;
    }

    if (this.mustHave != "false")
        return effectsFound;
    else
        return (!effectsFound);
}
/** **************** Champ organizer ********************* */

Tabs.champOrganizer = {
        tabOrder: 800,
        tabLabel: 'Champ Organizer',
        tabDisabled : false,
        myDiv : null,
        itemLists : [],
        //itemTypes : { weapon: 0, shield: 1, armor: 2 /*, banner: 3, advisor: 4, trophy: 5, candelabrum: 6, hero: 7*/ },
        itemTypes: [], //unsafeWindow.cm.CHAMPION.getEquipmentNames(),
        selectedItems : [],
        panelId: -1,
        panelType: "upgrade",
        panelNextLevel : 2,
        sortEffect: "none",
        sortType: "both",
        factions: ['briton', 'fey', 'druid'],
        switchingPresets : false,

        init : function (div){
            var t = Tabs.champOrganizer;
            
            t.itemTypes = unsafeWindow.cm.CHAMPION.getEquipmentNames(),
            // setup the lists for weapons, armor, etc.
            t.fillLists();
            t.myDiv = div;

            // setup the tab
            var m = '<Div><DIV id=chOrganizer class=chStat>CHAMPION ORGANIZER</div>';
            var effects = [];
            
            for (i = 201; i <= 209 ; i ++)
            {
               var effectName = unsafeWindow.g_js_strings.effects["name_"+ i];
               if (effects.indexOf(effectName) < 0) effects.push(effectName);
            }
            
            //"1","2","3","4","5","6","7","17","18","19","20","21","22","23"
            for (i = 1; i <= 7; i ++)
            {
               var effectName = CM.thronestats.effects[i][1];
               if (effects.indexOf(effectName) < 0) effects.push(effectName);
            }
            
            /*
            for (i = 17; i <= 23; i ++)
            {
                var effectName = CM.thronestats.effects[i][1];
               if (effects.indexOf(effectName) < 0) effects.push(effectName);
            }
            */

            // header stuff
            // preset selector
            m += '<TABLE  width=100% class="chTabPad2 chTable">';
            m += '<tr width=100% align=center><td width=15%/><td width=30%/><td/></tr>';
//            m += '<tr><TD width=20%><INPUT id=chTestSalvage type=button value=" Test Salvage "/></td><td id=chDelResults></td>';
//            m += '</tr>';
//            
            
           /* m += '<tr><td><div><span>View preset: </td><td><select id="chPresetList">';
            m += '<option value="0">--Presets--</option>';

            for (k= 1; k <= Seed.throne.slotNum; k++)
            {
                m += '<option value="'+k+'"> Preset:  '+ k +'</option>';
            }
            for (k= 0; k < CHpresetData.num_presets; k++)
            {
                if (CHpresetData.ids[k])
                    m += '<option value="local'+k+'"> Local:  '+ CHpresetData.ids[k] +'</option>';
                else
                    m += '<option value="local'+k+'"> Local:  '+ String.fromCharCode(65 + k) +'</option>';
            }

            m += '</select></span></div></td>';
            m += '<TD width=20%><INPUT id=chTestSalvage type=button value=" Test Salvage "/></td><td id=chDelResults></td>';
            m += '</tr>';
            */

            /*
            m+= '<tr  width=100% ><td colspan=1><span style="width: 130px; float: left; margin-top: 4px;  margin-right: 4px;"> Switch to preset: </span>';
            m+= '</td><td colspan=3 width=450px>';
            for (a=1; a <=  Seed.throne.slotNum; a++)
            {
                m += '<a style="font-family: serif; width: 25px;" class="button20 loadGPreset"  id=chPresetNum'+ a + ' > <span> ' + a + ' </span></a>';                   
            }
            m += '</td></tr>';
            */

            /*
            if (CHpresetData.num_presets > 0) {
                m += '<div id="preset_ch"> <b>: </b> </div></a>';
                m+= '<tr width=100%><td colspan=1><span style="width: 130px; float: left; margin-top: 4px;  margin-right: 4px;"> Local preset: </span>';
                m+= '</td><td colspan=3>';

                m += '<select id="chLocalPresetList" style="float: left;">';

                m += '<option value="-1">--Preset--</option>';
                for (a=0; a< CHpresetData.num_presets; a++)
                {
                    m += '<option value="' + a + '">'+ CHpresetData.ids[a] + '</option>';
                }
                m += '</select>';
                m += '<a style=" font-family: serif; margin-left: 10px;" class="button20" id=chLoad><span>Load</span></a>';
                m += '<a style=" font-family: serif; margin-left: 5px;" class="buttonDown20" id=chSave><span>Save</span></a>';
                m += '<span style="float: left; margin-top: 4px;  margin-right: 4px; margin-left: 10px;">';
                if (CHpresetData.num_presets > 0)
                {
                    m += "Switch to slot <INPUT id=chPresetNumber type=text size=2 maxlength=2 value='" + parseInt(CHpresetData.usePreset) + "' </input> when loading";
                }
                m +=  "</span></td></tr>" ;
            }

            m += '<tr align=center><td colspan=4><div id=chSwitchStatus></div></td></tr>';
            */

            m += '<tr><td colspan=4><hr/></td></tr>';
            m +='<tr id=ch_factionFilterRow><td colspan=4 align=center> Factions: ';
            for (f in t.factions) {
                var faction = t.factions[f];
                m += '<INPUT id=chFaction'+faction + ' type=checkbox  CHECKED >' + faction.capitalize() + '</input> ';
            }

            m +='</td></tr>';
            m +='<tr id=ch_levelFilterRow><td colspan=4 align=center> Levels: ';

            for (level = 0; level <= OrganizerMaxCHLevel; level++)
            {
                m += '<INPUT id=chLevel'+level + ' type=checkbox CHECKED >' + level + '</input> ';
            }

            m += '</td></tr>';
            m += '<tr align=center><td colspan=2><div><span>Sort: <select id="chSortList">';

            m += '<option value="none">--Effect--</option>';
            for (k in effects)
            {
                m += '<option value="' + effects[k] + '">'+ effects[k] +'</option>';
            }
            m += '</select></span></div></td>';

            m += "<td> <select id='chSortType'>";
            m += "  <option value='both'>Either</option>";
            m += "  <option value='buff'>Buff</option>";
            m += "  <option value='debuff'>Debuff</option>";
            m += "</select></td>";

            m += '<td><INPUT id=chSortInactive type=checkbox '+ (  CHupgradeData.sortInactive ?' CHECKED':'') +'/> Include Inactive</td></tr>';


            m += '<tr><td colspan=4><hr/></td></tr>';
            m +='</table>';

            m += '<div id="chScrollDiv" style="position: static; width: 100%; height: ' + OrganizerWindowHeight + '; overflow-x: auto; overflow-y: auto;">';

            var ii = 0;
            for (i in t.itemTypes) 
            {
                var jj = t.itemLists[ t.itemTypes[i]].length;
                if (jj > ii) ii = jj;
            }
            
            m += "<div id='chTableDiv' style='width: 100%;'>";
            m += '<TABLE id=chDisplayTable width=100% height=0% class=chTab>';
            
            
            //m += "<tr align=center valign=top><th width=10%>Weapon</th><th width=10%>Shield</th><th width=10%>Armor</th><th width=10%>Boots</th><th width=10%>Cloak</th><th width=10%>Helm</th><th width=10%>Rings</th><th width=10%>Necklaces</th></tr>";
            m+= "<tr align=center valign=top>";
            
            for (i in t.itemTypes) 
            {
                var type_name = unsafeWindow.g_js_strings.champ[t.itemTypes[i]];
                m += "<th width=10%>";
                m += type_name;
                m += "</th>";
            }
            
            m += "</tr>";
            
            m += '</table></div>';
            m += '</div>';
            m += '</div>';

            t.myDiv.innerHTML = m;
            t.paintTable();

//            $(document.querySelector("#chScrollDiv")).resizable({
//                minWidth: 710,
//                maxWidth: 900,
//                minHeight: 180,
//                /*maxHeight: 560,*/
//                maxHeight: 1000,
//                stop: function(event, ui) {
//                    CHupgradeData.organizeH = ui.size.height + 'px';
//                    CHupgradeData.organizeW = ui.size.width  + 'px';
//                    CHsaveUpgradeData();
//                }
//            });

//            //$("#chPresetList").click( function() {t.selectPreset( $(this).val());});
//            $("#chTestSalvage").click(function() {t.testSalvage();});

            // default to highlight the active preset
            //document.getElementById ('chPresetList').value = Seed.throne.activeSlot;
            //t.selectPreset(Seed.throne.activeSlot);
            //$("a.loadGPreset").css('border-color', 'transparent');
            $(document.querySelector("#chPresetNum" + Seed.throne.activeSlot)).css('border-color', 'green')

            $(document.querySelector("#chSortList")).change( function () { 
                t.sortEffect = $(this).val();
                t.show();
            });

            $(document.querySelector("#chLocalPresetList")).children("option").hover(
                    function (e) {
                        var target = $(e.target); 
                        var id = target.val();
                        if (id >= 0 ) {
                            $("#preset_ch").html('<b>' + CHpresetData.ids[id] +':</b> ' + CHpresetData.desc[id]);
                            $("#preset_ch").addClass('showit');
                        }
                    },
                    function () {
                        $(document.querySelector("#preset_ch")).removeClass('showit');
                    }

            );          

            $("#chSortType").change( function() {
                t.sortType = $(this).val();
                t.show();
            });

            $("#chSortInactive").change( function() {
                t.show();
            });

            $("#chPresetNumber").change( function() {
                CHpresetData.usePreset = $('#chPresetNumber').val();
                CHsavePresetData();               
            });

            /*
            $(".loadGPreset").click( function () {
                var id= $(this).attr('id');
                CHprocessPresetClick(+id.split("chPresetNum")[1]);
            });
            */

            /*
            $(".loadPreset").click( function () {
                var id= $(this).attr('id');
                Tabs.champOrganizer.loadLocalPreset(+id.split("chLoad")[1]);
            });
            */

            /*
            $("#chLoad").click( function () {
                var preset = $('#chLocalPresetList').val();
                if ( preset >= 0) Tabs.champOrganizer.loadLocalPreset(preset);
            });
            */

            /*
            $("#chSave").click( function () {
                var preset = $('#chLocalPresetList').val();
                if ( preset >= 0) Tabs.champOrganizer.saveLocalPreset(preset);
            });
            */

            $("#ch_factionFilterRow input").change( function() {
                t.show();
            });

            $("#ch_levelFilterRow input").change( function() {
                t.show();
            });

            $("#chSortList").val(CHupgradeData.sortSelected);
            $("#chSortType").val(CHupgradeData.buffSelected);
            t.sortEffect = CHupgradeData.sortSelected;
            t.sortType = CHupgradeData.buffSelected;

            t.show();

        },

        setSwitchStatus : function(s) {
            $("#chSwitchStatus").html(s); 
        },

        /*
        loadLocalPreset : function (id) {
            var t = Tabs.champOrganizer;

            if (t.switchingPresets)
            {
                t.setSwitchStatus("Local preset switch still in prgres ....");
                return;
            }

            var items = CHpresetData.items[id];            
            if (!items || items.length==0)
            {
                t.setSwitchStatus("Local preset is empty");
                return;
            }

            var c = 0;
            t.switchingPresets = true;

            var slot = parseInt(CHpresetData.usePreset);

            if (!slot ) slot = parseInt(Seed.throne.activeSlot);

            // make sure it is in the valid range
            if (slot < 1 || slot > Seed.throne.slotNum)  slot = parseInt(Seed.throne.activeSlot);

            // grab the list of items equipped in the slot about to be switched to
            var ei = Seed.throne.slotEquip[slot];

            // see if we are already on the correct slot
            if (slot != Seed.throne.activeSlot) {
                // switch to the correct preset
                t.setSwitchStatus("Switching to slot " + slot);
                CHprocessPresetClick(slot);
                c++;
            } else {
                t.setSwitchStatus("Already in correct slot.");
            }

            var delay = 7;
            for (i in items)
            {
                if (!items[i]) continue;

                // only equip the items not already equipped
                if (ei.indexOf(items[i]) < 0)
                {
                    var I = unsafeWindow.kocChampionItems[+items[i]];

                    if (!I) {
                        t.setSwitchStatus("Throne room item " + items[i] + " not found");
                        continue;
                    }

                    var f = function (I2, s) {
                        return function () {
                            Tabs.champOrganizer.equipItem(I2, s);
                            Tabs.champOrganizer.setSwitchStatus("Equipping " + I2.name); 
                        };
                    }
                    setTimeout (f(I, slot), c*delay*1000); // have to wait at least 5 seconds between switches
                    c++;
                }
                else
                {
                    var I = unsafeWindow.kocChampionItems[+items[i]];
                    //t.setSwitchStatus("Item " + I.name + " is already equipped");
                }
            }

            setTimeout ( function () { 
                Tabs.champOrganizer.show(); 
                t.switchingPresets = false;
                t.setSwitchStatus("Local preset "+ CHpresetData.ids[id] + " loaded.")
            }, c* delay*1000 + 1000);
        },

        saveLocalPreset : function (id) {            
            var equipedItems = {};
            var ei = Seed.throne.slotEquip[Seed.throne.activeSlot];

            // convert array to an object
            for (j=0; j < ei.length; j++) {
                equipedItems[j] = ei[j];
            }

            CHpresetData.items[id] = equipedItems;
            CHsavePresetData();
            Tabs.champOrganizer.setSwitchStatus("Local preset " + CHpresetData.ids[id] + " saved.");
        },

        */
        removeAllTagItems: function () {
            var taggedReverse = [];
            for (k in CHpresetData.taggedItems) taggedReverse.push(k);
            var len = taggedReverse.length;
            while (len--) {
                var chID = taggedReverse[len];
                delete CHpresetData.taggedItems[chID];
                $("#" + chID).children(".tagBorder").remove();
                $("td#ch_card" + chID).find("div.greenBorder2").remove();
            }
            CHsavePresetData();
        },        

        addTagItem : function (itemId) {
            CHpresetData.taggedItems[itemId] = true;
            $("#" + itemId).prepend("<div class='tagBorder'></div>");
            $("td#ch_card" + itemId).find("div.chbox").append("<div class='greenBorder2' style='border: 4px solid cyan; background: none; width: 228px; height: 255px;'></div>");
            CHsavePresetData();
        },

        removeTagItem : function (itemId) {
            if (CHpresetData.taggedItems[itemId])
            {
                delete CHpresetData.taggedItems[itemId];
                $("#" + itemId).children(".tagBorder").remove();
                $("td#ch_card" + itemId).find("div.greenBorder2").remove();
                CHsavePresetData();
            }
        },


        equipItem :  function ( I, preset) {
            if (!I) return;
            unsafeWindow.AjaxCall.gPostRequest("ajax/_dispatch53.php", {
                ctrl: "ChampionRoom\\ChampionRoomServiceAjax",
                action: "equipItem",
                itemId: I.equipmentId,
                
                presetId: unsafeWindow.seed.champion.activeSlot  // TODO:  pick champ
            }, function (u) {
                logit("result: "+ inspect(u,3,1));
                if (u.ok === true) {
                    unsafeWindow.cm.ChampionView.clickItemEquip(I);
                    Tabs.champOrganizer.show();
                } else {
                    if (I && I.name) {
                        Tabs.champOrganizer.setSwitchStatus("Unable to equip item " + I.name);
                    } else {
                        Tabs.champOrganizer.setSwitchStatus("Unable to equip item");
                    }
                    logit("Unable to equip item.");
                    cm.ModalManager.alert({
                        button_text: unsafeWindow.g_js_strings.commonstr.ok,
                        text: u.msg,
                        "class": "craftFailure",
                        exe: function () {
                            unsafeWindow.Modal.hideModalAll();
                            unsafeWindow.cm.ModalManager.close()
                        }
                    })
                }
            }, function (u) {
                logit("equip error");
                logit("e:" + inspect(u,3,1));

            })
        },

        /*
        showNext : function () {
            var t = Tabs.champOrganizer;
            if (t.panelId < 0) return;
            var X = unsafeWindow.kocChampionItems[t.panelId];
            var V = "next";
            var P = t.panelType;

            var level = X.level || 0;
            var quality =  X.rarity || 0;

            var bump = t.panelNextLevel;

            if (P == "enhance")
            {
                if ( (quality + bump ) > 5)
                {
                    bump = 5 - quality;
                }
            }
            else if ( (level + bump) > maxChLevel)
            {
                bump =  maxChLevel - level;
            }

            var R = [],
            Q, Y, S, U, N = {},
            T, W;
            if (V == "next") {
                if (P == "enhance") {
                    quality += bump;
                    $("#nextStatContainer span").html('<span> ' + X.createPrefix() + ' </span>');
                } else {
                    if (P == "upgrade") {
                        level += bump;
                        $("#nextStatContainer span").html('<span> Level ' + level + ' </span>');
                    }
                }
            }
            $.each(X.effects, function (Z, aa) {
                Q = +(Z.split("slot")[1]);
                Y = CM.thronestats.effects[aa.equipmentId];
                S = CM.thronestats.tiers[aa.equipmentId][aa.tier];
                if (!S) CM.thronestats.tiers[aa.equipmentId][aa.tier-1]
                var base = S.base || 0;
                var growth = S.growth || 0;

                U = +(base) + ((level * level + level) * +(growth) / 2);

                var wholeNumber = false;
                if ( Math.round(U) == U) wholeNumber = true;

                if (wholeNumber)
                    U = U.toFixed(0);
                else
                    U=  U.toFixed(2);

                if (Q % 2 == 0) {
                    T = "even"
                } else {
                    T = "odd"
                }
                if (Q <= quality) {
                    if (U > 1) {
                        R.push("<li class='" + T + "'>" + Y[1] + " +" + U + "%</li>")
                    } else {
                        R.push("<li class='" + T + "'>" + Y[1] + " " + U + "%</li>")
                    }
                } else {
                    R.push("<li class='disabled " + T + "'>" + Y[1] + " + " + U + "%</li>")
                }
            });
            if (V == "next") {
                if (P == "enhance") {
                    quality -= bump
                } else {
                    if (P == "upgrade") {
                        level -= bump;
                    }
                }
            }
            if (V === "next") {
                if (CM.ThronePanelController.isLastLevel(X, P)) {
                    W = $("<div/>").addClass("lock").attr("id", "lockedStatIcon");
                    $("#nextStatContainer").append(W)
                } else {
                    $("#lockedStatIcon").remove()
                }
            }
            t.panelNextLevel++;
            $("#thronePanelStat2").html(R.join(""));

            $("#thronePanelStat2 li").unbind("mouseenter").bind("mouseenter", function (Z) {
                unsafeWindow.Tooltip.show(Z, $(this).html(), [-180, 5])
            })
        },
        */

        // highlight the items the salvager will target
//        testSalvage : function() {
//            var t = Tabs.champOrganizer;
//            var s = Tabs.champSalvage;
//            var toDelete = s.buildList(true);

//            $('#chDelResults').html("<div> " + toDelete.length + " item(s) targeted for deletion</div>");

//            for (i =0; i < toDelete.length; i++)
//            {
//                var item = unsafeWindow.kocChampionItems[toDelete[i]];
//                
//                if (item.equippedTo  )
//                {
//                    t.selectCard(toDelete[i], "orange");
//                }
//                else
//                {
//                    t.selectCard(toDelete[i], "red");
//                }
//            }
//        },

        paintTable : function() {
            // fill in the table
            var t = Tabs.champOrganizer;
            var m = "";
            var mm;
            var tab = document.getElementById('chDisplayTable');
            
            var ii = 0;
            for (i in t.itemTypes) 
            {
                var jj = t.itemLists[ t.itemTypes[i]].length;
                if (jj > ii) ii = jj;
            }
            
            //m += "<tr align=center valign=top><th width=10%>Weapon</th><th width=10%>Shield</th><th width=10%>Armor</th><th width=10%>Boots</th><th width=10%>Cloaks</th><th width=10%>Helms</th><th width=10%>Rings</th><th width=10%>Necklaces</th></tr>";
            m+= "<tr align=center valign=top>";
            
            for (i in t.itemTypes) 
            {
                var type_name = unsafeWindow.g_js_strings.champ[t.itemTypes[i]];
                m += "<th width=10%>";
                m += type_name;
                m += "</th>";
            }
            
            m += "</tr>";
            
            for (var k= 0; k < ii ; k++)
            {
                mm = '<TR  align=left valign=top style="height: auto;">';
                for (i in t.itemTypes)
                {
                    var item = t.itemLists[t.itemTypes[i]][k];
                    var item_num = 0;
                    var id="ch_card";
                    if (item != null)
                    {
                        id += item.equipmentId;
                        item_num = item.equipmentId;
                    }
                    mm += '<TD class="chcard" style="overflow: visible;  width:auto; height: 150px; border: 4px solid white;" id="' + id +'" >';
                    mm += t.buildCard(t.itemLists[t.itemTypes[i]][k]);
                    mm += '</TD>';
                }
                mm += '</TR>';
                m+= mm;
            }
            tab.innerHTML = m;
            // repair the height/width caused by the 2d transform
            var d = document.getElementById ('chTableDiv');
            var t = document.getElementById ('chDisplayTable');
            var nodes = t.getElementsByTagName('td');

            for (n=0; n < nodes.length; n++)
            {
                var d2 = nodes[n].childNodes[0];
                var h = d2.offsetHeight;
                var w = d2.offsetWidth;
                d2.style.height = (Table_Scale_CH_Organizer * h) + "px";
                d2.style.width  = (Table_Scale_CH_Organizer * w) + "px";
            }

            $(".chCardDisp").click( function( A){
                var theId = $(this).attr("id").split("chCardItem")[1];
                unsafeWindow.cm.ContextualMenuThrone.renderMenu( $(this), unsafeWindow.kocChampionItems[theId]);
            });

            // add the large tooltip

            /*
            if (CHpresetData.noTooltips != true) $("td.chcard").on("mouseenter", "*", function (A) {
                A.stopPropagation();
                var top = $(this).parents("td.chcard")
                var theId = top.attr("id").split("card")[1];

                if (!theId || theId == 0) {
                    return;
                }

                var zz;
                if (zz = unsafeWindow.kocChampionItems[theId])
                {   unsafeWindow.cm.ThroneView.hoverItem(A, top, zz);
                $("#kofcNewTooltipDiv").css('position', 'absolute');
                $("#kofcNewTooltipDiv").css('left', ($("#ch_dialog").position().left+200) + 'px');
                $("#kofcNewTooltipDiv").css('top',  A.pageY-350 + 'px');
                }
                else 
                {
                    $("#kofcNewTooltipDiv").remove();
                    setTimeout( function () {Tabs.champOrganizer.show();}, 200);    
                }
            });
            */

            /*
            if (CHpresetData.noTooltips != true) $("td.chcard").on( "mouseleave", "*", function (A) {
                var theId = $(this).parents("td.chcard").attr("id").split("card")[1];
                if (unsafeWindow.kocChampionItems[theId]) {}
                //unsafeWindow.cm.ThroneView.unhoverItem(A, this, unsafeWindow.kocChampionItems[theId])
            });
            */

            // add yellow and blue borders
            
            $("div.chbox").removeClass("blueBorder2");
            $("div.chbox").removeClass("yellowBorder2");
            $("div.chbox").children("div.greenBorder2").remove();

            for (ii in CHqueueData.list) {
                var list_item = CHqueueData.list[ii];
                if (!list_item) continue;
                if (list_item.status != "complete") {
                    var id = list_item.item;

                    if (list_item.action == "upgrade") $("td#ch_card" + id).find("div.chbox").addClass("blueBorder2");
                    if (list_item.action == "enhance") $("td#ch_card" + id).find("div.chbox").addClass("yellowBorder2");
                }
            }

            for (ii in CHpresetData.taggedItems) {
                $("td#ch_card" + ii).find("div.chbox").append("<div class='greenBorder2' style='border: 4px solid cyan; background: none; width: 228px; height: 255px;'></div>");

            }


        },


        // fill the lists w/ the current TR items
        fillLists : function ()
        {
            var t = Tabs.champOrganizer;

            for (i in t.itemTypes)
            {
                t.itemLists[t.itemTypes[i]] = new Array;
            }

            for (k in unsafeWindow.kocChampionItems) {
                var champ_item = unsafeWindow.kocChampionItems[k];

                // apply filters
                var faction = CM.CHAMPION.getFactionClasses(champ_item.faction);
                var level = champ_item.level;
                
                if (!($('#chFaction'+faction).is(':checked')) ) continue;
                if (!($('#chLevel'+level).is(':checked')) ) continue;
       
                // put the equipped items first
                if (champ_item.isEquipped)
                    t.itemLists[t.itemTypes[champ_item.type]].unshift(champ_item);
                else
                    t.itemLists[t.itemTypes[champ_item.type]].push(champ_item);
            }
        },

        // sort the lists in the desired order
        sortLists : function ()
        {
            var t = Tabs.champOrganizer;
            CHupgradeData.sortInactive = $("#chSortInactive").is(':checked');
            for (i in t.itemLists)
            {
                t.itemLists[i].sort( function (item1, item2) {
                    return t.sortValue(item2) - t.sortValue(item1);
                });
            }
        },

        sortValue : function (item)
        {
            var t = Tabs.champOrganizer;
            var retValue = 0.0;
            for (e in item.effects)
            {
                try  {
                    
                    //
                    var N = item.effects[e];
                    var id = item.effects[e].id;
                    var effect = "";
                    var quality = item.rarity;
                    
                    effect = unsafeWindow.g_js_strings.effects["name_" + id];
                    //base = CM.CHAMPION["CHAMP_STAT_BASE_" + id];

                    var S = CM.WorldSettings.getSettingAsObject("CE_EFFECTS_TIERS");
                    var P = id + "," + N.tier;
                    var tier = S[P];

                    var base = tier.Base || 0;
                    var growth = tier.Growth || 0;
                    var level = item.level || 0;

                    // slot number
                    var B =  +e;

                    if (B> quality && !CHupgradeData.sortInactive)
                    {
                        return +retValue;
                    }

                    var percent=+( base+(( level* level+ level)* growth*0.5));  
                    if ( (effect == (t.sortEffect + " Debuff")) && (t.sortType != "buff"))
                    {
                        retValue -= percent;
                    }
                    else if (effect == t.sortEffect && t.sortType != "debuff")
                    {
                        retValue += percent;
                    }
                } catch (e) {
                    logit("Exception: " + inspect(e,3,1));

                }

            }
            return +retValue;
        },

        // clear all the highlists
        clearHighlights : function()
        {
            var t = Tabs.champOrganizer;

            for (k in unsafeWindow.kocChampionItems)
            {
                var champ_item = unsafeWindow.kocChampionItems[k];
                t.selectCard(champ_item.equipmentId, "white");
            }

        },

        // highlight a card
        selectCard : function(itemId, color)
        {
            var t = Tabs.champOrganizer;
            var item = unsafeWindow.kocChampionItems[itemId];

            if (item) t.selectedItems[item.type] = itemId;
            td = document.getElementById( "ch_card"+itemId);
            if (td)
            {
                td.style.borderColor = color;
            }
        },

        clearCards : function()
        {
            var t = Tabs.champOrganizer;
            for (k in t.selectedItems)
            {
                var td = document.getElementById( "ch_card" + t.selectedItems[k]);
                if (td)
                {
                    td.style.borderColor = "white";
                }
            }
            t.selectedItems = [];
        },

        // create the card to display
        buildCard : function(Z) {
            var t = Tabs.champOrganizer;
            
            var T = false;
            var c = CM.CHAMPION;
            var e = function (V, R) {
                var U = +(V.amount.toFixed(2)),
                    T = V.name,
                    S = (V.id >= 200) ? " statChamp" : " statTroop",
                    W = R ? " disabled" : "";
                return '<ul class="effect' + S + W + '">' + U + " " + T + "</ul>"
            };
            
            if (Z == null)
            {
                return "<div></div>";
            }

            if (typeof Z !== "object") {
                Z = kocChampionItems[Z]
            }
            
            var UW = unsafeWindow;
            
           //var R = parseInt(CM.ChampionManager.getChampion().id) == parseInt(Z.equippedTo),
                //W = !R ? " otherEquipped" : " mineEquipped",
            
           var Y = UW.kocChampionItems[Z.equipmentId],
                S = Y.effects,
                V = Boolean(T) ? '<span class="icon ' + /*W +*/ '"></span>' :  "",
                X = '<div class="ChampionX" id="chCardItem"+Z.equipmentId><div class="chbox" style="float: left;"><div class="item_section"><div class="item_title">' + Z.name +  V + '</div><div class="divider"></div>';

            var U = (+Z.unique > 0) ? UW.g_js_strings.throneRoom[c.getRarityClasses(6)] : UW.g_js_strings.throneRoom[c.getRarityClasses(Y.rarity)];
            
            X +=
                '<div class="champ_item_hover" style="background: url(https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/champion_hall/' +
                Y.getSrc("70") +
                ');"></div><div class="stats_item_hover">' + UW.g_js_strings.commonstr.faction +
                ": " + UW.g_js_strings.commonstr[c.getFactionClasses(Y.faction)] + 
                "<br>" + UW.g_js_strings.commonstr.quality +
                ": " + U + "<br>" + UW.g_js_strings.commonstr.type + ": " +
                UW.g_js_strings.champ[c.getEquipmentNames(Y.type)] + "<br>" +
                UW.g_js_strings.commonstr.level + ": " + Y.level + "<br>" +
                UW.g_js_strings.commonstr.might + ": " + Y.might +
                '</div><div class="clear"></div><div class="divider"></div><ul class="effects">';
            $.each(S, function (ac, aa) {
                var ab = CM.ChampionManager.getEffect(aa, Y.level);
                X += e(ab, ac > +Y.rarity)
            });
            X += "</ul></div></div></div>"; 
            return X;
        },

        show: function(){
            var t = Tabs.champOrganizer;
            t.fillLists();
            t.sortLists()
            t.paintTable();
            //t.selectPreset(document.getElementById ('chPresetList').value);
        },

        hide: function(){
        }
}

/** **************** Throne organizer ********************* */

Tabs.throneOrganizer = {
    tabOrder: 300,
    tabLabel: 'Organize TR',
    tabDisabled: false,
    myDiv: null,
    itemLists: [],
    itemTypes: { chair: 0, table: 1, window: 2, banner: 3, advisor: 4, trophy: 5, candelabrum: 6, hero: 7, statue: 8, pet: 9 },
    selectedItems: [],
    panelId: -1,
    panelType: "upgrade",
    panelNextLevel: 2,
    sortEffect: "none",
    sortType: "both",
    throneTypes: ['chair', 'table', 'window', 'banner', 'advisor', 'trophy', 'candelabrum', 'hero', 'statue', 'pet'],
    throneHeaderNames: ['chair','table','window','banner','advisor','trophy','candela','hero','statue','pet'],
    factions: ['briton', 'fey', 'druid'],
    qualitiesNames: ['simple', 'common', 'uncommon', 'rare', 'epic', 'wondrous', 'miraculous'],
    qualities: [ 0, 1, 2, 3, 4, 5, 6],
    switchingPresets: false,

    init: function (div) {
        var t = Tabs.throneOrganizer;
        // setup the lists for tables, chairs, etc.
        t.fillLists();
        t.myDiv = div;

        // setup the tab
        var m = '<Div><DIV id=trOrganizer class=trStat>THRONE ROOM ORGANIZER</div>';
        var effects = [];
        for (e in CM.thronestats.effects) {
            var effectName = CM.thronestats.effects[e][1].split(" Debuff")[0];
            if (effects.indexOf(effectName) < 0) effects.push(effectName);
        }

        // header stuff
        // preset selector
        m += '<TABLE  width=100% class="trTabPad2 trTable">';
        m += '<tr width=100% align=center><td width=15%/><td width=30%/><td/></tr>';


        m += '<tr><td colspan=4 width=100%>';
        m += '<div width=100% id=localPresets style="display: ';
        if (GeneralOptions.localPresetHidden) {
            m += 'none;';
        } else {
            m += 'block;';
        }
        m += '"><table width=100%><tr width=100% align=center><td width=15%/><td width=30%/><td/></tr>';
       
        

        m += '<tr><td><div><span>View preset: </td><td><select id="TRPresetList">';
        m += '<option value="0">--Presets--</option>';

        for (k = 1; k <= Seed.throne.slotNum; k++) {
            m += '<option value="' + k + '"> Preset:  ' + k + '</option>';
        }
        for (k = 0; k < TRpresetData.num_presets; k++) {
            if (TRpresetData.ids[k])
                m += '<option value="local' + k + '"> Local:  ' + TRpresetData.ids[k] + '</option>';
            else
                m += '<option value="local' + k + '"> Local:  ' + String.fromCharCode(65 + k) + '</option>';
        }

        m += '</select></span></div></td>';
        m += '</tr>';

        m += '<tr  width=100% ><td colspan=1><span style="width: 130px; float: left; margin-top: 4px;  margin-right: 4px;"> Switch to preset: </span>';
        m += '</td><td colspan=3 width=450px>';
        for (a = 1; a <= Seed.throne.slotNum; a++) {
            m += '<a style="font-family: serif; width: 25px;" class="button20 loadGPreset"  id=trPresetNum' + a + ' > <span> ' + a + ' </span></a>';
        }
        m += '</td></tr>';

        if (TRpresetData.num_presets > 0) {
            m += '<div id="preset_tt"> <b>: </b> </div></a>';
            m += '<tr width=100%><td colspan=1><span style="width: 130px; float: left; margin-top: 4px;  margin-right: 4px;"> Local preset: </span>';
            m += '</td><td colspan=3>';

            m += '<select id="trLocalPresetList" style="float: left;">';

            m += '<option value="-1">--Preset--</option>';
            for (a = 0; a < TRpresetData.num_presets; a++) {
                m += '<option value="' + a + '">' + TRpresetData.ids[a] + '</option>';
            }
            m += '</select>';
            m += '<a style=" font-family: serif; margin-left: 10px;" class="button20" id=trLoad><span>Load</span></a>';
            m += '<a style=" font-family: serif; margin-left: 5px;" class="buttonDown20" id=trSave><span>Save</span></a>';
            m += '<span style="float: left; margin-top: 4px;  margin-right: 4px; margin-left: 10px;">';
            if (TRpresetData.num_presets > 0) {
                m += "Switch to slot <INPUT id=trPresetNumber type=text size=2 maxlength=2 value='" + parseInt(TRpresetData.usePreset) + "' </input> when loading";
            }
            m += "</span></td></tr>";
        }

        m += '<tr align=center><td colspan=4><div id=trSwitchStatus></div></td></tr>';

        m += '<tr><td colspan=4><hr/></td></tr>';



        m += '</table></div></td></tr>';

        m += '<tr><td colspan=4 align=center><table cellspacing=0 cellpadding=0>';

        m += '<tr><td align=center><b>Types</td><td align=center><b>Factions</td><td align=center><b>Qualities</td><td align=center><b>Levels</td></tr>';
        m += '<tr>';
        m += '<td><div id=throneTypeFilterRow style="float: left; width: 160px; border:2px solid #ccc; height: 105px; overflow-y: scroll; background-color: white;">';
        for (tr in t.throneTypes) {
            var throne = t.throneTypes[tr];
            m += '<INPUT id=trThroneType' + throne + ' type=checkbox  CHECKED />' + throne.capitalize() + '<br />';
        }
        m += '</div></td>';

        m += '<td><div id=factionFilterRow style="float: left; width: 160px; border:2px solid #ccc; height: 105px; overflow-y: scroll; background-color: white;">';
        for (f in t.factions) {
            var faction = t.factions[f];
            m += '<INPUT id=trFaction' + faction + ' type=checkbox  CHECKED />' + faction.capitalize() + '<br />';
        }
        m += '</div></td>';

        m += '<td><div id=qualityFilterRow style="float: left; width: 160px; border:2px solid #ccc; height: 105px; overflow-y: scroll; background-color: white;">';
        for (q in t.qualities) {
            m += '<INPUT id=trQuality' + t.qualities[q] + ' type=checkbox  CHECKED />' + t.qualitiesNames[q].capitalize() + '<br />';
        }
        m += '</div></td>';

        m += '<td><div id=levelFilterRow style="float: left; width: 160px; border:2px solid #ccc; height: 105px; overflow-y: scroll; background-color: white;">';
        for (level = 0; level <= OrganizerMaxTRLevel; level++) {
            m += '<INPUT id=trLevel' + level + ' type=checkbox CHECKED />' + level + '<br /> ';
        }
        m += '</div></td>';
        m += '</tr>';
        m += '<tr>';
        m += '<td align=center><input id=unselectAllTypes type=button value="Unselect All"></td>';
        m += '<td align=center></td>';
        m += '<td align=center><input id=unselectAllQualities type=button value="Unselect All"></td>';
        m += '<td align=center><input id=unselectAllLevels type=button value="Unselect All"></td>';
        m += '</tr>';
        m += '<tr>';
        m += '<td align=center><input id=selectAllTypes type=button value="Select All"></td>';
        m += '<td align=center></td>';
        m += '<td align=center><input id=selectAllQualities type=button value="Select All"></td>';
        m += '<td align=center><input id=selectAllLevels type=button value="Select All"></td>';
        m += '</tr>';

        m += '</table></td></tr>';

        m += '<tr><td colspan=4><hr/></td></tr>';

        m += '<tr align=center><td colspan=2><div><span>Sort: <select id="trSortList">';

        m += '<option value="none">--Effect--</option>';
        for (k in effects) {
            m += '<option value="' + effects[k] + '">' + effects[k] + '</option>';
        }
        m += '</select></span></div></td>';

        m += "<td> <select id='trSortType'>";
        m += "  <option value='both'>Either</option>";
        m += "  <option value='buff'>Buff</option>";
        m += "  <option value='debuff'>Debuff</option>";
        m += "</select></td>";

        m += '<td><INPUT id=trSortInactive type=checkbox ' + (TRupgradeData.sortInactive ? ' CHECKED' : '') + '/> Include Inactive</td></tr>';

//        m += '<tr><td colspan=4><hr/></td></tr>';
        m += '</table>';

        m += '<div id="trScrollDiv" style="position: static; width: 100%; height: ' + OrganizerWindowHeight + '; overflow-x: auto; overflow-y: auto;">';

        var ii = Math.max(t.itemLists['chair'].length, t.itemLists['table'].length, t.itemLists['window'].length, t.itemLists['banner'].length, t.itemLists['advisor'].length, t.itemLists['trophy'].length, t.itemLists['candelabrum'].length, t.itemLists['hero'].length, t.itemLists['statue'].length, t.itemLists['pet'].length);

        m += "<div id='trTableDiv' style='width: 100%;'>";
        m += '<TABLE id=trDisplayTable height=0% class=trTab>';
        m += "<tr align=center valign=top>";
        for (tr in t.throneHeaderNames) {
            var throne = t.throneHeaderNames[tr];
            m += '<th width=' + OrganizerHeaderSize + '>' + throne.capitalize() + '</th> ';
        }
        m += "</tr>";
        m += '</table></div>';
        m += '</div>';
        m += '</div>';

        t.myDiv.innerHTML = m;
        t.paintTable();

/* remove resize restrictions
        $(document.querySelector("#trScrollDiv")).resizable({
            minWidth: 710,
            maxWidth: 900,
            minHeight: 180,
            maxHeight: 560,
            maxHeight: 1000,
            stop: function (event, ui) {
                TRupgradeData.organizeH = ui.size.height + 'px';
                TRupgradeData.organizeW = ui.size.width + 'px';
                TRsaveUpgradeData();
            }
        });
*/
        $("#TRPresetList").click(function () { t.selectPreset($(this).val()); });
       // $("#testSalvage").click(function () { t.testSalvage(); });

        // default to highlight the active preset
        document.getElementById('TRPresetList').value = Seed.throne.activeSlot;
        t.selectPreset(Seed.throne.activeSlot);
        $("a.loadGPreset").css('border-color', 'transparent');
        $(document.querySelector("#trPresetNum" + Seed.throne.activeSlot)).css('border-color', 'green')

        $(document.querySelector("#trSortList")).change(function () {
            t.sortEffect = $(this).val();
            t.show();
        });

        $(document.querySelector("#trLocalPresetList")).children("option").hover(
                    function (e) {
                        var target = $(e.target);
                        var id = target.val();
                        if (id >= 0) {
                            $("#preset_tt").html('<b>' + TRpresetData.ids[id] + ':</b> ' + TRpresetData.desc[id]);
                            $("#preset_tt").addClass('showit');
                        }
                    },
                    function () {
                        $(document.querySelector("#preset_tt")).removeClass('showit');
                    }

            );

        $("#trSortType").change(function () {
            t.sortType = $(this).val();
            t.show();
        });

        $("#trSortInactive").change(function () {
            t.show();
        });

        $("#trPresetNumber").change(function () {
            TRpresetData.usePreset = $('#trPresetNumber').val();
            TRsavePresetData();
        });

        $(".loadGPreset").click(function () {
            var id = $(this).attr('id');
            processPresetClick(+id.split("trPresetNum")[1]);
        });

        $(".loadPreset").click(function () {
            var id = $(this).attr('id');
            Tabs.throneOrganizer.loadLocalPreset(+id.split("trLoad")[1]);
        });

        $("#unselectAllQualities").click(function () {
            for (q in t.qualities) {
                //var quality = t.qualities[q];
                var ch = document.getElementById("trQuality" + t.qualities[q]);
                ch.checked = false;
            }
            t.show();
        });

        $("#selectAllQualities").click(function () {
            for (q in t.qualities) {
                //var quality = t.qualities[q];
                var ch = document.getElementById("trQuality" + t.qualities[q]);
                ch.checked = true;
            }
            t.show();
        });

        $("#unselectAllTypes").click(function () {
            for (tr in t.throneTypes) {
                var throne = t.throneTypes[tr];
                var ch = document.getElementById("trThroneType" + throne);
                ch.checked = false;
            }
            t.show();
        });

        $("#selectAllTypes").click(function () {
            for (tr in t.throneTypes) {
                var throne = t.throneTypes[tr];
                var ch = document.getElementById("trThroneType" + throne);
                ch.checked = true;
            }
            t.show();
        });


        $("#unselectAllLevels").click(function () {
            for (level = 0; level <= OrganizerMaxTRLevel; level++) {
                var ch = document.getElementById("trLevel" + level);
                ch.checked = false;
            }
            t.show();
        });

        $("#selectAllLevels").click(function () {
            for (level = 0; level <= OrganizerMaxTRLevel; level++) {
                var ch = document.getElementById("trLevel" + level);
                ch.checked = true;
            }
            t.show();
        });


        $("#trLoad").click(function () {
            var preset = $('#trLocalPresetList').val();
            if (preset >= 0) Tabs.throneOrganizer.loadLocalPreset(preset);
        });

        $("#trSave").click(function () {
            var preset = $('#trLocalPresetList').val();
            if (preset >= 0) Tabs.throneOrganizer.saveLocalPreset(preset);
        });

        $("#qualityFilterRow input").change(function () {
            t.show();
        });

        $("#throneTypeFilterRow input").change(function () {
            t.show();
        });

        $("#factionFilterRow input").change(function () {
            t.show();
        });

        $("#levelFilterRow input").change(function () {
            t.show();
        });

        $("#trSortList").val(TRupgradeData.sortSelected);
        $("#trSortType").val(TRupgradeData.buffSelected);
        t.sortEffect = TRupgradeData.sortSelected;
        t.sortType = TRupgradeData.buffSelected;

        t.show();

    },

    setSwitchStatus: function (s) {
        $("#trSwitchStatus").html(s);
    },

    loadLocalPreset: function (id) {
        var t = Tabs.throneOrganizer;

        if (t.switchingPresets) {
            t.setSwitchStatus("Local preset switch still in prgres ....");
            return;
        }

        var items = TRpresetData.items[id];
        if (!items || items.length == 0) {
            t.setSwitchStatus("Local preset is empty");
            return;
        }

        var c = 0;
        t.switchingPresets = true;

        var slot = parseInt(TRpresetData.usePreset);

        if (!slot) slot = parseInt(Seed.throne.activeSlot);

        // make sure it is in the valid range
        if (slot < 1 || slot > Seed.throne.slotNum) slot = parseInt(Seed.throne.activeSlot);

        // grab the list of items equipped in the slot about to be switched to
        var ei = Seed.throne.slotEquip[slot];

        // see if we are already on the correct slot
        if (slot != Seed.throne.activeSlot) {
            // switch to the correct preset
            t.setSwitchStatus("Switching to slot " + slot);
            processPresetClick(slot);
            c++;
        } else {
            t.setSwitchStatus("Already in correct slot.");
        }

        var delay = 7;
        for (i in items) {
            if (!items[i]) continue;

            // only equip the items not already equipped
            if (ei.indexOf(items[i]) < 0) {
                var I = unsafeWindow.kocThroneItems[+items[i]];

                if (!I) {
                    t.setSwitchStatus("Throne Room item " + items[i] + " not found");
                    continue;
                }

                var f = function (I2, s) {
                    return function () {
                        Tabs.throneOrganizer.equipItem(I2, s);
                        Tabs.throneOrganizer.setSwitchStatus("Equipping " + I2.name);
                    };
                }
                setTimeout(f(I, slot), c * delay * 1000); // have to wait at least 5 seconds between switches
                c++;
            }
            else {
                var I = unsafeWindow.kocThroneItems[+items[i]];
                //t.setSwitchStatus("Item " + I.name + " is already equipped");
            }
        }

        setTimeout(function () {
            Tabs.throneOrganizer.show();
            t.switchingPresets = false;
            t.setSwitchStatus("Local preset " + TRpresetData.ids[id] + " loaded.")
        }, c * delay * 1000 + 1000);
    },

    saveLocalPreset: function (id) {
        var equipedItems = {};
        var ei = Seed.throne.slotEquip[Seed.throne.activeSlot];

        // convert array to an object
        for (j = 0; j < ei.length; j++) {
            equipedItems[j] = ei[j];
        }

        TRpresetData.items[id] = equipedItems;
        TRsavePresetData();
        Tabs.throneOrganizer.setSwitchStatus("Local preset " + TRpresetData.ids[id] + " saved.");
    },

    removeAllTagItems: function () {
        var taggedReverse = [];
        for (k in TRpresetData.taggedItems) taggedReverse.push(k);
        var len = taggedReverse.length;
        while (len--) {
            var trID = taggedReverse[len];
            delete TRpresetData.taggedItems[trID];
            $("#throneInventoryItem" + trID).children(".tagBorder").remove();
            $("#trCardItem" + trID + " div.greenBorder2").remove();
        }
        TRsavePresetData();
    },

    addTagItem: function (itemId) {
        TRpresetData.taggedItems[itemId] = true;
        $("#throneInventoryItem" + itemId).prepend("<div class='tagBorder'></div>");
        $("div#trCardItem" + itemId).find("div.trCard").append("<div class='greenBorder2' style='border: 8px solid cyan; background: none; width: 184px; height: 288px;'></div>");
        TRsavePresetData();
    },

    addPresetTags : function (presetIndex) {  //presetIndex should be passed in as base 0 to index into the presetTaggedItems array
        
        var preset = getPresetObject(presetIndex);

        for (var k in unsafeWindow.kocThroneItems) {
            var throne_item = unsafeWindow.kocThroneItems[k];
            if (throne_item.isEquipped) {
                preset[throne_item.id] = true;
                $("#throneInventoryItem" + throne_item.id).prepend("<div class='presetBorder'></div>");
                $("div#trCardItem" + throne_item.id).find("div.trCard").append("<div class='greenBorder2' style='border: 8px solid cyan; background: none; width: 184px; height: 288px;'></div>");
                TRsavePresetData();
            }
        }
    },

    removePresetTags : function (presetIndex) {
        var preset = getPresetObject(presetIndex);
        for (p in preset) {
            delete preset[p];
            $("#throneInventoryItem" + p).children(".presetBorder").remove();
            $("#trCardItem" + p + " div.greenBorder2").remove();
        }
        TRsavePresetData();
    },

    equipPresetTags : function (presetIndex) {

        if (Seed.throne.activeSlot != presetIndex) {
            Seed.throne.activeSlot = presetIndex;
        }

        var t = Tabs.throneOrganizer;
        var preset = getPresetObject(presetIndex);

        if (t.switchingPresets) {
            alert("still equipping from tagged presets");
            return;
        }

        if (getObjectCollectionCount(preset) == 0) {
            alert("preset is empty");
            return;
        }

        var c = 0;
        t.switchingPresets = true;

        // grab the list of items equipped in the slot about to be switched to
        var equipped_items = Seed.throne.slotEquip[presetIndex];

        var delay = 7;

        for (p in preset) {

            // only equip the items not already equipped
            if ( equipped_items.indexOf(preset[p]) < 0 ) {

                var throne_item = unsafeWindow.kocThroneItems[p];

                var goEquip = function (I2, s) {
                    return function () {
                        Tabs.throneOrganizer.equipItem(I2, s);
                    };
                }

                setTimeout(goEquip(throne_item, presetIndex), c * delay * 1000); // have to wait at least 5 seconds between switches
                c++;
            }
            
        }
        setTimeout(function () {
            Tabs.throneOrganizer.switchingPresets = false;
            alert("preset #" + presetIndex + " loaded from tagged preset")
        }, c * delay * 1000 + 1000);

    },

    unequipAllItems : function (presetIndex) {

        if (Seed.throne.activeSlot != presetIndex) {
            Seed.throne.activeSlot = presetIndex;
        }

        var t = Tabs.throneOrganizer;

        if (t.switchingPresets) {
            alert("still unequipping");
            return;
        }

        var c = 0;
        t.switchingPresets = true;

        // grab the list of items equipped in the slot about to be switched to
        var delay = 7;

        var equipped_items = Seed.throne.slotEquip[presetIndex];

        var counter = equipped_items.length;

        var items = [];

        for (i=0;i<counter;i++) items.push(equipped_items[i]);

        while (counter > 0) {
            var throne_item = unsafeWindow.kocThroneItems[items.pop()];

            var goUnequip = function (I2, s) {
                return function () {
                    Tabs.throneOrganizer.unequipItem(I2, s);
                };
            }

            setTimeout(goUnequip(throne_item, presetIndex), c * delay * 1000); // have to wait at least 5 seconds between switches
            c++;
            counter--;
        }

        setTimeout(function () {
            Tabs.throneOrganizer.switchingPresets = false;
            alert("all items unequipped")
        }, c * delay * 1000 + 1000);

    },

    removeTagItem: function (itemId) {
        if (TRpresetData.taggedItems[itemId]) {
            delete TRpresetData.taggedItems[itemId];
            $("#throneInventoryItem" + itemId).children(".tagBorder").remove();
            $("#trCardItem" + itemId + " div.greenBorder2").remove();
            TRsavePresetData();
        }
    },

    unequipItem: function (I, preset) {
        if (!I) return;
        unsafeWindow.AjaxCall.gPostRequest("ajax/_dispatch53.php", {
            ctrl: "throneRoom\\ThroneRoomServiceAjax",
            action: "unequipItem",
            itemId: I.id,
            presetId: preset
        }, function (u) {
            if (u.ok === true) {
                unsafeWindow.cm.ThroneView.clickItemUnequip(I);
                Tabs.throneOrganizer.show();
            } else {
                if (I && I.name) {
                    Tabs.throneOrganizer.setSwitchStatus("Unable to unequip item " + I.name);
                } else {
                    Tabs.throneOrganizer.setSwitchStatus("Unable to unequip item");
                }
                logit("Unable to unequip item.");
                cm.ModalManager.alert({
                    button_text: unsafeWindow.g_js_strings.commonstr.ok,
                    text: u.msg,
                    "class": "craftFailure",
                    exe: function () {
                        unsafeWindow.Modal.hideModalAll();
                        unsafeWindow.cm.ModalManager.close()
                    }
                })
            }
        }, function (u) {
            logit("unequip error");
            logit("e:" + inspect(u, 3, 1));

        })
    },

    equipItem: function (I, preset) {
        if (!I) return;
        unsafeWindow.AjaxCall.gPostRequest("ajax/_dispatch53.php", {
            ctrl: "throneRoom\\ThroneRoomServiceAjax",
            action: "equipItem",
            itemId: I.id,
            presetId: preset
        }, function (u) {
            //logit("result: "+ inspect(u,3,1));
            if (u.ok === true) {
                unsafeWindow.cm.ThroneView.clickItemEquip(I);
                Tabs.throneOrganizer.show();
            } else {
                if (I && I.name) {
                    Tabs.throneOrganizer.setSwitchStatus("Unable to equip item " + I.name);
                } else {
                    Tabs.throneOrganizer.setSwitchStatus("Unable to equip item");
                }
                logit("Unable to equip item.");
                cm.ModalManager.alert({
                    button_text: unsafeWindow.g_js_strings.commonstr.ok,
                    text: u.msg,
                    "class": "craftFailure",
                    exe: function () {
                        unsafeWindow.Modal.hideModalAll();
                        unsafeWindow.cm.ModalManager.close()
                    }
                })
            }
        }, function (u) {
            logit("equip error");
            logit("e:" + inspect(u, 3, 1));

        })
    },

    showNext: function () {
        var t = Tabs.throneOrganizer;
        if (t.panelId < 0) return;
        var X = unsafeWindow.kocThroneItems[t.panelId];
        var V = "next";
        var P = t.panelType;

        var level = X.level || 0;
        var quality = X.quality || 0;

        var bump = t.panelNextLevel;

        if (P == "enhance") {
            if ((quality + bump) > 5) {
                bump = 5 - quality;
            }
        }
        else if ((level + bump) > OrganizerMaxTRLevel) {
            bump = OrganizerMaxTRLevel - level;
        }

        var R = [],
            Q, Y, S, U, N = {},
            T, W;
        if (V == "next") {
            if (P == "enhance") {
                quality += bump;
                $("#nextStatContainer span").html('<span> ' + X.createPrefix() + ' </span>');
            } else {
                if (P == "upgrade") {
                    level += bump;
                    $("#nextStatContainer span").html('<span> Level ' + level + ' </span>');
                }
            }
        }
        $.each(X.effects, function (Z, aa) {
            Q = +(Z.split("slot")[1]);
            Y = CM.thronestats.effects[aa.id];
            S = CM.thronestats.tiers[aa.id][aa.tier];
            if (!S) CM.thronestats.tiers[aa.id][aa.tier - 1]
            var base = S.base || 0;
            var growth = S.growth || 0;

            U = +(base) + ((level * level + level) * +(growth) / 2);

            var wholeNumber = false;
            if (Math.round(U) == U) wholeNumber = true;

            if (wholeNumber)
                U = U.toFixed(0);
            else
                U = U.toFixed(2);

            if (Q % 2 == 0) {
                T = "even"
            } else {
                T = "odd"
            }
            if (Q <= quality) {
                if (U > 1) {
                    R.push("<li class='" + T + "'>" + Y[1] + " +" + U + "%</li>")
                } else {
                    R.push("<li class='" + T + "'>" + Y[1] + " " + U + "%</li>")
                }
            } else {
                R.push("<li class='disabled " + T + "'>" + Y[1] + " + " + U + "%</li>")
            }
        });
        if (V == "next") {
            if (P == "enhance") {
                quality -= bump
            } else {
                if (P == "upgrade") {
                    level -= bump;
                }
            }
        }
        if (V === "next") {
            if (CM.ThronePanelController.isLastLevel(X, P)) {
                W = $("<div/>").addClass("lock").attr("id", "lockedStatIcon");
                $("#nextStatContainer").append(W)
            } else {
                $("#lockedStatIcon").remove()
            }
        }
        t.panelNextLevel++;
        $("#thronePanelStat2").html(R.join(""));

        $("#thronePanelStat2 li").unbind("mouseenter").bind("mouseenter", function (Z) {
            unsafeWindow.Tooltip.show(Z, $(this).html(), [-180, 5])
        })
    },

    // highlight the items the salvager will target
//    testSalvage: function () {
//        var t = Tabs.throneOrganizer;
//        var s = Tabs.throneSalvage;
//        var toDelete = s.buildList(true);

//        $('#trDelResults').html("<div> " + toDelete.length + " item(s) targeted for deletion</div>");

//        for (i = 0; i < toDelete.length; i++) {
//            var item = unsafeWindow.kocThroneItems[toDelete[i]];
//            if (item.isBroken || item.isEquipped) {
//                t.selectCard(toDelete[i], "orange");
//            }
//            else {
//                t.selectCard(toDelete[i], "red");
//            }
//        }
//    },

    paintTags : function () {

        for (p in TRpresetData.taggedItems) {  
                $("#throneInventoryItem" + p).children(".tagBorder").remove(); //remove any tag first before applying the tag to avoid doubling, trippling up on the borders, etc
                $("#trCardItem" + p + " div.greenBorder2").remove();
                $("div#throneInventoryItem" + p).prepend("<div class='tagBorder'></div>");
                $("div#trCardItem" + p).find("div.trCard").append("<div class='greenBorder2' style='border: 8px solid cyan; background: none; width: 184px; height: 288px;'></div>");
        } 
        for (idx=1;idx<17;idx++) {
            var preset = getPresetObject(idx);
            if (getObjectCollectionCount(preset) > 0) {
                for (p in preset) {
                    $("#throneInventoryItem" + p).children(".presetBorder").remove(); //remove any tag first before applying the tag to avoid doubling, trippling up on the borders, etc
                    $("#trCardItem" + p + " div.greenBorder2").remove();
                    $("#throneInventoryItem" + p).prepend("<div class='presetBorder'></div>");
                    $("div#trCardItem" + p).find("div.trCard").append("<div class='greenBorder2' style='border: 8px solid cyan; background: none; width: 184px; height: 288px;'></div>");
                }
            }
        }
    },

    paintTable: function () {
        // fill in the table
        var t = Tabs.throneOrganizer;
        var m = "";
        var mm;
        var tab = document.getElementById('trDisplayTable');
        var ii = Math.max(t.itemLists['chair'].length, t.itemLists['table'].length, t.itemLists['window'].length, t.itemLists['banner'].length, t.itemLists['advisor'].length, t.itemLists['trophy'].length, t.itemLists['candelabrum'].length, t.itemLists['hero'].length, t.itemLists['statue'].length, t.itemLists['pet'].length);

        m += '<tr align=center valign=top width=100%>';
        for (tr in t.throneHeaderNames) {
            var throne = t.throneHeaderNames[tr];
            m += '<th width=' + OrganizerHeaderSize + '>' + throne.capitalize() + '</th>';
        }
        m += '</tr>';

        for (var k = 0; k < ii; k++) {
            mm = '<TR  align=left valign=top style="height: auto;">';
            for (i in t.itemTypes) {
                var item = t.itemLists[i][k];
                var item_num = 0;
                var id = "card";
                if (item != null) {
                    id += item.id;
                    item_num = item.id;
                }
                mm += '<TD class="tdcard" style="overflow: visible;  width:auto; height: 150px; border: 4px solid white;" id="' + id + '" >';
                mm += t.buildCard(t.itemLists[i][k]);
                mm += '</TD>';
            }
            mm += '</TR>';
            m += mm;
        }
        tab.innerHTML = m;
        // repair the height/width caused by the 2d transform
        var d = document.getElementById('trTableDiv');
        var t = document.getElementById('trDisplayTable');
        var nodes = t.getElementsByTagName('td');

        for (n = 0; n < nodes.length; n++) {
            var d2 = nodes[n].childNodes[0];
            var h = d2.offsetHeight;
            var w = d2.offsetWidth;
            d2.style.height = (Table_Scale_TR_Organizer * h) + "px";
            d2.style.width = (Table_Scale_TR_Organizer * w) + "px";
        }

        $(".trCardDisp").click(function (A) {
            var theId = $(this).attr("id").split("trCardItem")[1];
            unsafeWindow.cm.ContextualMenuThrone.renderMenu($(this), unsafeWindow.kocThroneItems[theId]);
        });

        // add the large tooltip

        if (TRpresetData.noTooltips != true) $("td.tdcard").on("mouseenter", "*", function (A) {
            A.stopPropagation();
            var top = $(this).parents("td.tdcard")
            var theId = top.attr("id").split("card")[1];

            if (!theId || theId == 0) {
                return;
            }

            var zz;
            if (zz = unsafeWindow.kocThroneItems[theId]) {
                unsafeWindow.cm.ThroneView.hoverItem(A, top, zz);
                $("#kofcNewTooltipDiv").css('position', 'absolute');
                $("#kofcNewTooltipDiv").css('left', ($("#org_dialog").position().left + 200) + 'px');
                $("#kofcNewTooltipDiv").css('top', A.pageY - 350 + 'px');
            }
            else {
                $("#kofcNewTooltipDiv").remove();
                setTimeout(function () { Tabs.throneOrganizer.show(); }, 200);
            }
        });

        if (TRpresetData.noTooltips != true) $("td.tdcard").on("mouseleave", "*", function (A) {
            var theId = $(this).parents("td.tdcard").attr("id").split("card")[1];
            if (unsafeWindow.kocThroneItems[theId]) { }
            //unsafeWindow.cm.ThroneView.unhoverItem(A, this, unsafeWindow.kocThroneItems[theId])
        });

        // add yellow and blue borders
        $("div.trCard").removeClass("blueBorder2");
        $("div.trCard").removeClass("yellowBorder2");
        $("div.trCard").children("div.greenBorder2").remove();

        for (ii in TRqueueData.list) {
            var list_item = TRqueueData.list[ii];
            if (!list_item) continue;
            if (list_item.status != "complete") {
                var id = list_item.item;

                if (list_item.action == "upgrade") $("div#trCardItem" + id).find("div.trCard").addClass("blueBorder2");
                if (list_item.action == "enhance") $("div#trCardItem" + id).find("div.trCard").addClass("yellowBorder2");
            }
        }

        Tabs.throneOrganizer.paintTags();

    },

    // select a kabam preset
    selectPreset: function (p) {
        // highlight the selected set of cards
        var t = Tabs.throneOrganizer;
        t.clearHighlights();

        p += "";

        if (p.indexOf("local") >= 0) {
            // highlight the local preset
            var localNum = +(p.split("local")[1]);
            var items = TRpresetData.items[localNum];

            if (!items || items.length == 0) return;

            for (i in items) {
                t.selectCard(items[i], "green");
            }
            return;
        }

        // highlight the standard preset
        var equipedItems = Seed.throne.slotEquip[parseInt(p)];
        if (equipedItems != null) {
            for (ll = 0; ll < equipedItems.length; ll++) {
                t.selectCard(equipedItems[ll], "green");
            }
        }
    },

    // fill the lists w/ the current TR items
    fillLists: function () {
        var t = Tabs.throneOrganizer;

        for (i in t.itemTypes) {
            t.itemLists[i] = new Array;
        }

        for (k in unsafeWindow.kocThroneItems) {
            var throne_item = unsafeWindow.kocThroneItems[k];

            // apply filters
            var faction = throne_item.faction;
            var level = throne_item.level;
            var thronetype = throne_item.type;
            var quality = throne_item.quality;

            if (!($('#trQuality' + quality).is(':checked'))) continue;
            if (!($('#trThroneType' + thronetype).is(':checked'))) continue;
            if (!($('#trFaction' + faction).is(':checked'))) continue;
            if (!($('#trLevel' + level).is(':checked'))) continue;

            // put the equipped items first
            if (throne_item.isEquipped)
                t.itemLists[throne_item.type].unshift(throne_item);
            else
                t.itemLists[throne_item.type].push(throne_item);
        }
    },

    // sort the lists in the desired order
    sortLists: function () {
        var t = Tabs.throneOrganizer;
        TRupgradeData.sortInactive = ($("#trSortInactive").attr('checked') == 'checked');
        for (i in t.itemLists) {
            t.itemLists[i].sort(function (item1, item2) {
                return t.sortValue(item2) - t.sortValue(item1);
            });
        }
    },

    sortValue: function (item) {
        var t = Tabs.throneOrganizer;
        var retValue = 0.0;
        for (e in item.effects) {
            try {
                var N = item.effects[e];
                var effect = CM.thronestats.effects[N.id][1];

                var tier = CM.thronestats.tiers[N.id][N.tier];
                if (!tier) CM.thronestats.tiers[N.id][N.tier - 1]

                var B = +(e.split("slot")[1]);
                var base = tier.base || 0;
                var level = item.level || 0;
                var growth = tier.growth || 0;
                var quality = item.quality || 0;

                if (B > quality && !TRupgradeData.sortInactive) {
                    return +retValue;
                }

                var percent = +(base + ((level * level + level) * growth * 0.5));
                if ((effect == (t.sortEffect + " Debuff")) && (t.sortType != "buff")) {
                    retValue -= percent;
                }
                else if (effect == t.sortEffect && t.sortType != "debuff") {
                    retValue += percent;
                }
            } catch (e) {

            }

        }
        return +retValue;
    },

    // clear all the highlists
    clearHighlights: function () {
        var t = Tabs.throneOrganizer;

        for (k in unsafeWindow.kocThroneItems) {
            var throne_item = unsafeWindow.kocThroneItems[k];
            t.selectCard(throne_item.id, "white");
        }

    },

    // highlight a card
    selectCard: function (itemId, color) {
        var t = Tabs.throneOrganizer;
        var item = unsafeWindow.kocThroneItems[itemId];

        if (item) t.selectedItems[item.type] = itemId;
        td = document.getElementById("card" + itemId);
        if (td) {
            td.style.borderColor = color;
        }
    },

    clearCards: function () {
        var t = Tabs.throneOrganizer;
        for (k in t.selectedItems) {
            var td = document.getElementById("card" + t.selectedItems[k]);
            if (td) {
                td.style.borderColor = "white";
            }
        }
        t.selectedItems = [];
    },

    // create the card to display
    buildCard: function (I) {
        var t = Tabs.throneOrganizer;
        var D = [];
        var w = CM.thronestats.mightByQuality;
        var z = CM.thronestats.mightByLevel;

        var text_only = false;

        if (I == null) {
            D.push("<div>");
            D.push("</div>");
            return D.join("");
        }
        D.push("<div class='trCardDisp' id='trCardItem" + I.id + "' style='border: 1px solid white; clear: both;  overflow: visible; position: relative; left: 0px; top: 0px; -moz-transform: scale(" + Table_Scale_TR_Organizer + ", " + Table_Scale_TR_Organizer + "); -moz-transform-origin: 0% 0%;  -webkit-transform: scale(" + Table_Scale_TR_Organizer + ", " + Table_Scale_TR_Organizer + ");  -webkit-transform-origin: 0% 0%;);'>");
        if (I.isBroken) {
            D.push(" <div class='cardOverlay semi_transparent rot45'> Broken </div>");
        }
        D.push(" <div class='trCard' style='white-space: normal; padding: 0px;'> ");
        D.push("<div class='section' style='overflow: visible;' id = 'idsection'>");
        D.push(" <div class='title " + I.createPrefix().toLowerCase() + "' style='text-transform: capitalize;'> ");
        D.push(I.name);
        if (!text_only) D.push(" [" + I.id + "]");
        D.push(" </div> ");
        D.push(" <div class='description'> ");
        if (!text_only) {

            D.push(" <div class='portrait " + I.faction + " " + I.type + "'> </div> ");
            D.push("<ul>");
            D.push("<li> " + uW.g_js_strings.commonstr.faction + ": " + I.faction + "</li>");
            D.push("<li> " + uW.g_js_strings.commonstr.quality + ": " + I.createPrefix() + "</li>");
            D.push("<li> " + uW.g_js_strings.commonstr.type + ": " + I.type + "</li>");
            D.push("<li> " + uW.g_js_strings.commonstr.level + ": " + I.level + "</li>");
            D.push("<li> " + uW.g_js_strings.commonstr.might + ": " + (w[I.quality].Might + z[I.level].Might) + "</li>");
            D.push("</ul>");
            D.push(" </div> ");
            D.push(" <ul> ");
        }

        for (M in I.effects) {
            try {
                var N = I.effects[M];
                effect = CM.thronestats.effects[N.id];

                tier = CM.thronestats.tiers[N.id][N.tier];
                if (!tier) tier = CM.thronestats.tiers[N.id][N.tier - 1];

                var base = tier.base || 0;
                var level = I.level || 0;
                var growth = tier.growth || 0;

                percent = +(base + ((level * level + level) * growth * 0.5));

                var wholeNumber = false;
                if (Math.round(parseFloat(percent)) == parseFloat(percent)) wholeNumber = true;

                percent = (percent > 0) ? "+" + percent : +percent;

                if (wholeNumber)
                    percent = parseFloat(percent).toFixed(0);
                else
                    percent = parseFloat(percent).toFixed(2);
                // percent=Math.ceil(percent);
                css = (M % 2 === 0) ? "even" : "odd";
                B = +(M.split("slot")[1]);
                if (B <= I.quality) {
                    D.push(" <li class='effect " + css + "'> " + percent + "% " + effect[1] + " </li> ");
                } else {
                    D.push(" <li class='effect disabled " + css + "'> " + percent + "% " + effect[1] + " </li> ");
                }
            }
            catch (e) { }

        }
        D.push(" </ul> ");
        D.push(" </div> ");
        D.push(" </ul> ");
        D.push(" </div> ");
        D.push(" </div> ");
        return D.join("");

    },

    show: function () {
        var t = Tabs.throneOrganizer;
        t.fillLists();
        t.sortLists()
        t.paintTable();
        t.selectPreset(document.getElementById('TRPresetList').value);
    },

    hide: function () {
    }
}


/** ********************************* Caps Tab ********************************* */
Tabs.Caps = {
        tabOrder: 1100,
        tabLabel : 'TR Caps',
        myDiv : null,

        init : function (div){
            var t = Tabs.Caps;
            t.myDiv = div;
            var m = '<div style=" position: static; width: 100%; height: ' + OrganizerWindowHeight + '; overflow-x: hidden; overflow-y: auto;" >';
            m += '<DIV class=chStat>THRONE ROOM CAPS</div><hr/>';
            m += '<DIV style="height:535px; max-height:535px;">';
            m += '<TABLE cellpadding=0 cellspacing=0 width=60% align=center>';
            m += '<tr><th align=left>Boost</th><th align=left>Max</th><th align=left>Min</th></tr>';
            for (var k in unsafeWindow.cm.thronestats.boosts) {
                var cap = unsafeWindow.cm.thronestats.boosts[k];
                m += '<tr class=trTabLined><td>' + cap.BoostName + '</td><td>' + cap.Max + ((cap.CapType == "percent") ? '%' : '') + '</td><td>' + ((cap.Min == "none") ? 'None' : cap.Min + '%') + '</td></tr>';
            }
            m += '</table></div></div>';
            t.myDiv.innerHTML = m
                
                

        },
        hide : function () {
        },
        show : function () {
        }
}

/** ********************************* Jewels Upgrader Tab **************************** */

Tabs.jewelUpgrade = {
        tabOrder: 1300,
        tabLabel : 'Jewel Upgrader',
        myDiv : null,

        init : function (div){
            var t = Tabs.jewelUpgrade;
            t.myDiv = div;

            var m = '<div style=" position: static; width: 100%; height: ' + OrganizerWindowHeight + '; overflow-x: hidden; overflow-y: auto;" >';
            m += '<DIV class=chStat>JEWEL UPGRADER</div><hr/>';
            m += '<DIV style="height:535px; max-height:535px;">';
            m += '</div>';
            m += '</div>';
            t.myDiv.innerHTML = m;

        },
        hide : function (){
        },
        show : function (){
        }
}
/** ********************************* Jewels Salvager Tab **************************** */

Tabs.jewelSalvage = {
        tabOrder: 1400,
        tabLabel : 'Jewel Salvagers',
        myDiv : null,

        init : function (div){
            var t = Tabs.jewelSalvage;
            t.myDiv = div;

            var m = '<div style=" position: static; width: 100%; height: ' + OrganizerWindowHeight + '; overflow-x: hidden; overflow-y: auto;" >';
            m += '<DIV class=chStat>JEWEL SALVAGER</div><hr/>';
            m += '<DIV style="height:535px; max-height:535px;">';
            m += '</div>';
            m += '</div>';
            t.myDiv.innerHTML = m;

        },
        hide : function (){
        },
        show : function (){
        }
}

/** ********************************* Jewels Organizer Tab **************************** */

Tabs.jewelOranizer = {
        tabOrder: 1200,
        tabLabel : 'Throne Jewels',
        myDiv : null,
        inventoryList: [],
        totalInventroy: 0,
        jewelEffects: [],
        jewelQualities: ['Cracked', 'Flawed', 'Cloudy', 'Subdued', 'Bright'],

        init : function (div){
            var t = Tabs.jewelOranizer;
            t.myDiv = div;

            t.buildList();

            var m = ''; 
            m += '<DIV class=chStat>JEWELS ORGANIZER</div>';
            m += '<div style="position: static; width: 100%; overflow-x: hidden; overflow-y: auto;" >';
            m += '<table cellpadding=0 cellspacing=0 align=center>';

            m += '<tr><td align=center><b>Effects</b></td><td width=10px></td><td align=center><b>Quality</b></td></tr>';

            m += '<tr>';
            m += '<td><div id=jwlEffectFilterRow style="float: left; width: 250px; border:2px solid #ccc; height: 110px; overflow-y: scroll; background-color: white;">';
            for (k in t.jewelEffects) {
                var effect = t.jewelEffects[k];
                effect = effect.split(' ').join('');
                effect = effect.split('.').join('');
                m += '<INPUT id=jwlEffect' + effect + ' type=checkbox  CHECKED />' + t.jewelEffects[k] + '<br />';
                
            }
            m += '</div></td>';
            m += '<td></td>';
            m += '<td><div id=jwlQualityFilterRow style="float: left; width: 150px; border:2px solid #ccc; height: 110px; overflow-y: scroll; background-color: white;">';
            for (k in t.jewelQualities) {
                m += '<INPUT id=jwlQuality' + t.jewelQualities[k] + ' type=checkbox  CHECKED />' + t.jewelQualities[k] + '<br />';
            }
            m += '</div></td>';
            m += '</tr>';

            m += '<tr><td align=center><input type=button id=unselectAllJewelEffects value="Unselect All"></td><td></td><td align=center><input type=button id=unselectAllJewelQualities value="Unselect All"></td></tr>';
            m += '<tr><td align=center><input type=button id=selectAllJewelEffects value="Select All"></td><td></td><td align=center><input type=button id=selectAllJewelQualities value="Select All"></td></tr>';

            m += '<tr>';
            m += '<td align=center colspan=3><br/><div id=jwlBuffFilterRow>';
            m += '<INPUT id=jwlBuff' + true + ' type=checkbox  CHECKED />Buff';
            m += '&nbsp;&nbsp;&nbsp;<INPUT id=jwlBuff' + false + ' type=checkbox  CHECKED />Debuff';
            m += '</div></td>';
            m += '</tr>';

            m += '</table></div>';
            m += '<hr/>';
            m += '<div style="position: static; width: 100%; height: ' + OrganizerWindowHeight + '; overflow-x: hidden; overflow-y: auto;" >';
            m += '<TABLE id=jwl_inventory_table cellpadding=0 cellspacing=0 width=100%>';

            m += '<thead><tr>';
            m += '<th align=left id="thEffectName">Effect</th>';
            m += '<th align=left id="thQualityName">Quality</th>';
            m += '<th align=left id="thEffectBuff">Type</th>';
            m += '<th align=center id="thAmount">Amount</th>';
            m += '<th align=center id="thQuantity">In Stock</th>';
            m += '</tr></thead>';

            m += '<tbody></tbody>';

            m += '<tfoot>';
            m += '<tr><td colspan=5 align=center><hr/></td></tr>';
            m += '<tr><td colspan=3><input id=jwl_refresh type=button value="Refresh"/>&nbsp;<i>(new jewels found may take a couple seconds to add to total)</i></td><td align=right>Total:</td><td align=center><div id=jwlTotal></div></td></tr>';
            m += '</tfoot>';

            m += '</table></div>';

            t.myDiv.innerHTML = m;


            $("#unselectAllJewelQualities").click(function () {
                for (qly in t.jewelQualities) {
                    var quality = t.jewelQualities[qly];
                    var ch = document.getElementById("jwlQuality" + quality);
                    ch.checked = false;
                }
                t.show();
            });

            $("#selectAllJewelQualities").click(function () {
                for (qly in t.jewelQualities) {
                    var quality = t.jewelQualities[qly];
                    var ch = document.getElementById("jwlQuality" + quality);
                    ch.checked = true;
                }
                t.show();
            });

            $("#unselectAllJewelEffects").click(function () {
                for (ef in t.jewelEffects) {
                    var effect = t.jewelEffects[ef];
                    effect = effect.split(' ').join('');
                    effect = effect.split('.').join('');
                    var ch = document.getElementById("jwlEffect" + effect);
                    ch.checked = false;
                }
                t.show();
            });

            $("#selectAllJewelEffects").click(function () {
                for (ef in t.jewelEffects) {
                    var effect = t.jewelEffects[ef];
                    effect = effect.split(' ').join('');
                    effect = effect.split('.').join('');
                    var ch = document.getElementById("jwlEffect" + effect);
                    ch.checked = true;
                }
                t.show();
            });

            $("#jwlEffectFilterRow input").change(function () {
                t.show();
            });

            $("#jwlQualityFilterRow input").change(function () {
                t.show();
            });

            $("#jwlBuffFilterRow input").change(function () {
                t.show();
            });

            $('#jwl_refresh').click(function () {
                t.buildList();
                t.show();
            });

            t.buildInventory();

            t.show();

        },

        buildInventory : function (){
            var t = Tabs.jewelOranizer;
            var inv = "";

            for (i=0;i<t.inventoryList.length;i++) {

                var jewel_item = t.inventoryList[i];

                var qlty = unsafeWindow.cm.thronestats.jewelGrowthLimit[jewel_item.quality];

                var amt = unsafeWindow.cm.ThroneController.getEffectAmount(jewel_item,qlty);

                var name = unsafeWindow.cm.ThroneController.jewelName(jewel_item);

                var buffed = true;

                if (name.indexOf("Debuff") > 0) buffed = false;

                var effect = unsafeWindow.cm.ThroneController.getEffectName(jewel_item.id);

                var qty = unsafeWindow.cm.ThroneController.getJewelQuantity(jewel_item);

                var qaulityName = unsafeWindow.cm.ThroneController.jewelQualityName(jewel_item.quality);

                var tmpEffect = unsafeWindow.cm.ThroneController.getEffectName(jewel_item.id);
                tmpEffect = tmpEffect.split(' ').join('');
                tmpEffect = tmpEffect.split('.').join('');

                if (!($('#jwlEffect' + tmpEffect).is(':checked'))) continue;
                if (!($('#jwlQuality' + qaulityName).is(':checked'))) continue;
                if (!($('#jwlBuff' + buffed).is(':checked'))) continue;

                inv += '<tr><td>' + effect + '</td><td>' + qaulityName + '</td><td>' + (buffed ? 'Buff ' : 'Debuff') + '</td><td align=center>' + amt +  '%</td><td align=center>' + qty + '</td></tr>';

            }

            var jwl_inv = document.getElementById('jwl_inventory_table').tBodies[0];
            jwl_inv.innerHTML = inv;

            var jwl_total = document.getElementById('jwlTotal');
            jwl_total.innerHTML = t.totalInventroy;

        },

        buildList : function (){
            var t = Tabs.jewelOranizer;
            t.inventoryList = [];
            t.totalInventroy = 0;
            for (var k in unsafeWindow.kocJewelItems) {
                var jewel_item = unsafeWindow.kocJewelItems[k];
                var qlty = unsafeWindow.cm.thronestats.jewelGrowthLimit[jewel_item.quality];
                var amt = unsafeWindow.cm.ThroneController.getEffectAmount(jewel_item,qlty);
                var effect = unsafeWindow.cm.ThroneController.getEffectName(jewel_item.id);
                if (amt == 0) break;
                if (t.jewelEffects.indexOf(effect) < 0) t.jewelEffects.push(effect);
                var jewel_quantity = unsafeWindow.cm.ThroneController.getJewelQuantity(jewel_item);
                t.totalInventroy += jewel_quantity;
                t.inventoryList.push(jewel_item);
            }
        },

        hide : function (){
        },

        show : function (){
            var t = Tabs.jewelOranizer;
            //t.buildList();
            t.buildInventory();
        },       
}


/** ********************************* News Tab **************************** */
Tabs.News = {
        tabOrder: 1500,
        tabLabel : 'News',
        myDiv : null,

        init : function (div){
            var t = Tabs.News;
            t.myDiv = div;
            var m  = '';
            m += '<DIV class=chStat>NEWS</div>';
            m += '<div id=ch_logScroll style="position: static; width: 100%; height: ' + OrganizerWindowHeight + '; overflow-x: hidden; overflow-y: auto;" >';
            m += '<DIV style="height:535px; max-height:535px;">';
            m += '<TABLE cellpadding=0 cellspacing=0 width=100% height=35px>';
            m += '<TR><TD align=center><a href="https://www.facebook.com/koctrorgbyne0" target="_BLANK" style="font-family: tahoma,verdana,arial,sans-serif; font-size: 11px; font-variant: normal; font-style: normal; font-weight: normal; color: #3B5998; text-decoration: none;" title="KoC Throne &amp; Champ Organizer by Ne0"><img src="https://www.facebookbrand.com/img/assets/asset.find.us.on.facebook.lg.png" style="border: 0px;" /></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
            m += '<iframe src="//www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Fkoctrorgbyne0&amp;width&amp;layout=standard&amp;action=like&amp;show_faces=false&amp;share=true&amp;height=15" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:15px;" allowTransparency="true"></iframe>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
            m += '<a href="http://userscripts.org:8080/scripts/show/424415" target="_BLANK" title="KOC Throne Room & Champ Organizer by Ne0"><img width="15%" height="15%" src="http://applevie.ws/wp-content/uploads/2010/03/userscript.org-logo.png"></a></td></tr>';
            m += '</table>';
            m += '<DIV class=chStat>COMING SOON!!!</div>';
            m += '<TABLE cellpadding=0 cellspacing=0 width=100%>';
            m += '<TR><TD>&#149;will try to get tokens working for champ items too (hopefully) </td></tr>';
            m += '<TR><TD>&#149;using speedups during repairs (hopefully) </td></tr>';
            m += '<TR><TD>&#149;many requests for a jewel salvager.... still assessing the benefits of one at this time </td></tr>';
            m += '</table>';
            m += '<DIV class=chStat>2014-05-14:</div>';
            m += '<TABLE cellpadding=0 cellspacing=0 width=100%>';
            m += '<TR><TD>&#149;added user defined upgrade/enhance levels for when using stones/tokens/orbs</td></tr>';
            m += '<TR><TD>&#149;updated userscripts links to include 8080 so people can access them again, but i still recommend google code</td></tr>';
            m += '<TR><TD>&#149;fixed NON-EXISTENT glitch, bad case of "fuzzy eyes"!!!!  LOL</td></tr>';
            m += '</table>';
            m += '<DIV class=chStat>2014-05-13:</div>';
            m += '<TABLE cellpadding=0 cellspacing=0 width=100%>';
            m += '<TR><TD>&#149;temporarily disabled use tokens feature until i can fix a glitch i found</td></tr>';
            m += '</table>';
            m += '<DIV class=chStat>2014-05-12:</div>';
            m += '<TABLE cellpadding=0 cellspacing=0 width=100%>';
            m += '<TR><TD>&#149;added using protection stones, orbs and tokens when enhancing/upgrading throne room items </td></tr>';
            m += '</table>';
            m += '<DIV class=chStat>2014-05-10:</div>';
            m += '<TABLE cellpadding=0 cellspacing=0 width=100%>';
            m += '<TR><TD>&#149;combined both champ log & throne log into 1 complete log </td></tr>';
            m += '<TR><TD>&#149;added saving/loading of throne/champ salvage rules </td></tr>';
            m += '<TR><TD>&#149;fixed glitch for upgrader scrolling through queued items </td></tr>';
            m += '<TR><TD>&#149;additional option given to show or hide the local presets section in the options tab </td></tr>';
            m += '<TR><TD>&#149;added throne preset naming (options section), so now you will be able to define your type of throne room preset <br/>(NOTE: this does not show up in the throne panel, only on the preset widget and throne map area)</td></tr>';
            m += '<TR><TD>&#149;post to chat will also post the name of your throne preset </td></tr>';
            m += '</table>';
            m += '<DIV class=chStat>2014-05-07:</div>';
            m += '<TABLE cellpadding=0 cellspacing=0 width=100%>';
            m += '<TR><TD>&#149;fixed glitch for enhance/upgrade button which stuck in endless loop and crashed browser (only since miraculous was released) </td></tr>';
            m += '</table>';
            m += '<DIV class=chStat>2014-05-06:</div>';
            m += '<TABLE cellpadding=0 cellspacing=0 width=100%>';
            m += '<TR><TD>&#149;enhanced and renamed the jewel inventory section to be like the other organizers with filtering (no sorting yet) </td></tr>';
            m += '</table>';
            m += '<DIV class=chStat>2014-05-05:</div>';
            m += '<TABLE cellpadding=0 cellspacing=0 width=100%>';
            m += '<TR><TD>&#149;fixed code for loading champ salvager settings from another domain (thought i already did that, oops!) </td></tr>';
            m += '<TR><TD>&#149;fixed glitch where tagging would cause multiple borders around card, eventually hiding it, if it was tagged a lot </td></tr>';
            m += '<TR><TD>&#149;changed filtering to checked list boxes in throne organizer to flow more aesthetically pleasing </td></tr>';
            m += '<TR><TD>&#149;added quality filter to throne organizer </td></tr>';
            m += '<TR><TD>&#149;option given to show or hide the local presets section in throne organizer, giving some people more viewing room if they choose </td></tr>';
            m += '</table>';
            m += '<DIV class=chStat>2014-05-04:</div>';
            m += '<TABLE cellpadding=0 cellspacing=0 width=100%>';
            m += '<TR><TD>&#149;added facebook link, facebook like/share, and userscripts link to news section </td></tr>';
            m += '<TR><TD>&#149;added equipping a throne preset by tags </td></tr>';
            m += '<TR><TD>&#149;added unequipping all throne items in an active preset </td></tr>';
            m += '</table>';
            m += '<DIV class=chStat>2014-05-03:</div>';
            m += '<TABLE cellpadding=0 cellspacing=0 width=100%>';
            m += '<TR><TD>&#149;added throne preset tagging </td></tr>';
            m += '<TR><TD>&#149;added options for changing throne preset tag colors and general tag colors </td></tr>';
            m += '</table>';
            m += '<DIV class=chStat>2014-05-01:</div>';
            m += '<TABLE cellpadding=0 cellspacing=0 width=100%>';
            m += '<TR><TD>&#149;added level 6 (miraculous) auto-enhancing </td></tr>';
            m += '<TR><TD>&#149;added a news section so users can see what is new in the latest update </td></tr>';
            m += '<TR><TD>&#149;added a throne room caps section so users can see the caps coded from the game</td></tr>';
            m += '<TR><TD>&#149;added a jewel inventory section so users can view the jewels they have found</td></tr>';
            m += '</table>';
            m += '<DIV class=chStat>APRIL 2014</div>';
            m += '<TABLE cellpadding=0 cellspacing=0 width=100%>';
            m += '<TR><TD>&#149;added "remove all tags" from throne and champ organizer context menu </td></tr>';
            m += '<TR><TD>&#149;fixed minor glitch with the update dropdown selection</td></tr>';
            m += '<TR><TD>&#149;integrated champion organizer functions to give users 2 for 1 organizer tool  </td></tr>';
            m += '<TR><TD>&#149;added donate button in the options tab, for those who care to donate</td></tr>';
            m += '<TR><TD>&#149;added "preset #" to the throne room post to chat display so you know which # of throne room item you are displaying </td></tr>';
            m += '<TR><TD>&#149;removed most of the IDs for throne room items when posting and displaying (for now so it looks prettier, may add back later)</td></tr>';
            m += '<TR><TD>&#149;removed stats tabs to reduce memory</td></tr>';
            m += '<TR><TD>&#149;added a "compare" feature which allows the user to take 2 tr cards and pull them up side by side to compare the stats </td></tr>';
            m += '<TR><TD>&#149;added update dropdown to choose updating by Userscripts or Google Code</td></tr>';
            m += '<TR><TD>&#149;temporarily removed the donate button</td></tr>';
            m += '</table>';
            m += '<DIV class=chStat>MARCH 2014:</div>';
            m += '<TABLE cellpadding=0 cellspacing=0 width=100%>';
            m += '<TR><TD>&#149;added pets</td></tr>';
            m += '<TR><TD>&#149;updated for level 17 upgrade</td></tr>';
            m += '<TR><TD>&#149;fixed the NEXT on the upgrade/enhance to see future card stats </td></tr>';
            m += '<TR><TD>&#149;fixed the 6 slot display</td></tr>';
            m += '<TR><TD>&#149;filter by throne types in organize tab</td></tr>';
            m += '<TR><TD>&#149;added select all and unselect all to the throne and level filters (got tired of clicking 16 times to only show 1 level)</td></tr>';
            m += '<TR><TD>&#149;fixed the auto update to work with this new script</td></tr>';
            m += '</table>';
            m += '</div></div>';

            t.myDiv.innerHTML = m;
        },
        hide : function () {
        },
        show : function () {
        }
}

/** ********************************* Action Log Tab ********************************** */
Tabs.ActionLog = {
        tabOrder: 900,
        tabLabel : 'Action Log',
        myDiv : null,
        logTab : [null, null, null],
        maxEntries: 300,
        saveEntries : [[],[],[]],
        state : null,

        init : function (div){
            var t = Tabs.ActionLog;
            t.myDiv = div;
            t.myDiv.innerHTML = '<div id=logScroll style=" position: static; width: 100%; height: ' + OrganizerWindowHeight + '; overflow-x: hidden; overflow-y: auto;" >\
                <DIV class=chStat>UPGRADE LOG</div>\
                <DIV style="height:535px; max-height:535px;">\
                <TABLE cellpadding=0 cellspacing=0 id=successlog class=chTabLined width=100%><TR><TD width=20%></td><TD width=80%></td></tr></table>\
                <DIV class=chStat>ACTION LOG</div>\
                <DIV style="height:535px; max-height:535px;">\
                <TABLE cellpadding=0 cellspacing=0 id=actionlog class=chTabLined  width=100%><TR><TD width=20%></td><TD width=80%></td></tr></table>\
                <DIV class=chStat>SALVAGE LOG</div>\
                <TABLE cellpadding=0 cellspacing=0 id=salvagelog class=chTabLined  width=100%><TR><TD width=20%></td><TD width=80%></td></tr></table></div></div>';
            t.logTab[0]  = document.getElementById('successlog');
            t.logTab[1]  = document.getElementById('actionlog');
            t.logTab[2]  = document.getElementById('salvagelog');
            t.state = 1;

            for (var j=0; j<3; j++)
            {
                var logVar = 'log_';
                if (j !=0)  logVar += (j + "_")
                logVar += getServerId();

                var a = JSON2.parse(GM_getValue (logVar, '[]'));

                if (matTypeof(a) == 'array'){
                    t.saveEntries[j] = a;
                    for (var i=0; i<t.saveEntries[j].length; i++)
                        t._addTab(j, t.saveEntries[j][i].msg, t.saveEntries[j][i].ts);
                }
            }

            window.addEventListener('unload', t.onUnload, false);

//            $("#ch_logScroll").resizable({
//                minWidth: 710,
//                maxWidth: 1000,
//                minHeight: 180,
//                maxHeight: 1100,
//                stop: function(event, ui) {
//                    CHupgradeData.logH = ui.size.height + 'px';
//                    CHupgradeData.logW = ui.size.width  + 'px';
//                    CHsaveUpgradeData();
//                }
//            });

//            $("#ch_logScroll").css('height', CHupgradeData.logH).css('width', CHupgradeData.logW);
        },

        hide : function (){
        },

        show : function (){
        },

        onUnload : function (){
            var t = Tabs.ActionLog;
            if (!ResetAll) GM_setValue ('log_'+getServerId(),  JSON2.stringify(t.saveEntries[0]));
            if (!ResetAll) GM_setValue ('log_1_'+getServerId(), JSON2.stringify(t.saveEntries[1]));
            if (!ResetAll) GM_setValue ('log_2_'+getServerId(), JSON2.stringify(t.saveEntries[2]));
        },

        _addTab : function (lnum, msg, ts){
            var t = Tabs.ActionLog;
            if (t.state != 1)
                return;
            if (t.logTab[lnum].rows.length >= t.maxEntries)
                t.logTab[lnum].deleteRow(t.maxEntries-1);
            var row = t.logTab[lnum].insertRow(0);
            row.vAlign = 'top';
            row.insertCell(0).innerHTML = ts;
            row.insertCell(1).innerHTML = msg;
        },

        log : function (lnum, msg){
            var t = Tabs.ActionLog;
            var d = new Date();
            var ts = d.toDateString().substring(3,10) + " "+ d.toTimeString().substring(0,8);
            t._addTab (lnum, msg, ts);
            while (t.saveEntries[lnum].length >= 30)
                t.saveEntries[lnum].shift();
            t.saveEntries[lnum].push ({msg:msg, ts:ts});
        }
}

function SuccessLog (msg){
    if (!Tabs.ActionLog.tabDisabled)
        Tabs.ActionLog.log (0,msg);
}

function ActionLog (msg){
    if (!Tabs.ActionLog.tabDisabled)
        Tabs.ActionLog.log (1,msg);
}

function SalvageLog (msg){
    if (!Tabs.ActionLog.tabDisabled)
        Tabs.ActionLog.log(2,msg);
}

/** ***************** Organizer Options ********************* */

Tabs.OrganizerOptions = {
    tabOrder: 1000,
    tabLabel: 'Options',
    myDiv: null,

    init: function (div) {
        var t = Tabs.OrganizerOptions;
        t.myDiv = div;

        // header stuff
        var m = '<Div id=optionScroll style="position: static; width: 100%; height: ' + OrganizerWindowHeight + '; overflow-x: hidden; overflow-y: auto;">';

        m += '<DIV id=trOptions class=trStat>GENERAL ORGANIZER OPTIONS</div><TABLE id=trOptionTbl width=100% height=0% class=trTab>';
        m += '<TR><TD width=100% align=center><hr/><a id=trpplink><img id=trpp /></a></div><hr/></TD></TR>';
        m += '<TR><TD width=100%><INPUT id=OrganizerUpdate type=checkbox ' + (GlobalOptions.OrganizerUpdate ? 'CHECKED ' : '') + '/>Check updates on' + htmlSelector({ 0: userscriptssite_name, 1: googlecodesite_name }, GlobalOptions.UpdateSite, 'id=OrganizerUpdateSite') + '(All Domains) &nbsp; &nbsp; <INPUT id=OrganizerUpdateNow type=button value="Update Now" /></TD></TR>';
        m += '<TR><TD width=100%><INPUT id=OrganizerDisableAnim type=checkbox ' + (GeneralOptions.disableAnim ? 'CHECKED ' : '') + '/> Disable failure animation (Big red X) </TD></TR>';
        m += '<TR><TD width=100%><INPUT id=OrganizerPresetOption type=checkbox ' + (GeneralOptions.presetWidget ? 'CHECKED ' : '') + '/> Enable preset selector widget (requires refresh)</TD></TR>';
        m += '<TR><TD width=100%>Reset guardian/preset widget locations<INPUT id=trResetWidgets type=button value="Reset" /></TD></TR>';
        m += '<tr><td width=100%>Preset Tag Color: <select id=OrganizerPresetColor>';
        m += '<option ' + (GeneralOptions.presetColor == "#FFFFFF" ? 'SELECTED ' : '') + 'value="#FFFFFF">White</option>';
        m += '<option ' + (GeneralOptions.presetColor == "#808080" ? 'SELECTED ' : '') + 'value="#808080">Gray</option>';
        m += '<option ' + (GeneralOptions.presetColor == "#FF0000" ? 'SELECTED ' : '') + 'value="#FF0000">Red</option>';
        m += '<option ' + (GeneralOptions.presetColor == "#FFFF00" ? 'SELECTED ' : '') + 'value="#FFFF00">Yellow</option>';
        m += '<option ' + (GeneralOptions.presetColor == "#00FF00" ? 'SELECTED ' : '') + 'value="#00FF00">Lime</option>';
        m += '<option ' + (GeneralOptions.presetColor == "#00FFFF" ? 'SELECTED ' : '') + 'value="#00FFFF">Aqua</option>';
        m += '<option ' + (GeneralOptions.presetColor == "#0000FF" ? 'SELECTED ' : '') + 'value="#0000FF">Blue</option>';
        m += '<option ' + (GeneralOptions.presetColor == "#FF00FF" ? 'SELECTED ' : '') + 'value="#FF00FF">Fuchsia</option>';
        m += '</select>';
        m += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tag Color: <select id=OrganizerTagColor>';
        m += '<option ' + (GeneralOptions.tagColor == "#FFFFFF" ? 'SELECTED ' : '') + 'value="#FFFFFF">White</option>';
        m += '<option ' + (GeneralOptions.tagColor == "#808080" ? 'SELECTED ' : '') + 'value="#808080">Gray</option>';
        m += '<option ' + (GeneralOptions.tagColor == "#FF0000" ? 'SELECTED ' : '') + 'value="#FF0000">Red</option>';
        m += '<option ' + (GeneralOptions.tagColor == "#FFFF00" ? 'SELECTED ' : '') + 'value="#FFFF00">Yellow</option>';
        m += '<option ' + (GeneralOptions.tagColor == "#00FF00" ? 'SELECTED ' : '') + 'value="#00FF00">Lime</option>';
        m += '<option ' + (GeneralOptions.tagColor == "#00FFFF" ? 'SELECTED ' : '') + 'value="#00FFFF">Aqua</option>';
        m += '<option ' + (GeneralOptions.tagColor == "#0000FF" ? 'SELECTED ' : '') + 'value="#0000FF">Blue</option>';
        m += '<option ' + (GeneralOptions.tagColor == "#FF00FF" ? 'SELECTED ' : '') + 'value="#FF00FF">Fuchsia</option>';
        m += '</select>(Requires Refresh)</td></tr>';
        m += '<TR><td><INPUT id=OrganizerLocalPresetHidden type=checkbox ' + (GeneralOptions.localPresetHidden ? 'CHECKED ' : '') + '/> Hide local presets section from options section and throne organizer</td></tr> ';


        m += '<TR><td><div  class=trStat>THRONE/CHAMP SALVAGER OPTIONS</div></td></TR>';
        m += '<TR><td><b>Primary city to put aetherstones: </b><div style="display: inline;" id=OrganizerSalvageCity /></td></tr>';
        m += '<TR><TD><div style="white-space: pre;" ><INPUT id=OrganizerSalAnyCity type=checkbox ' + (GeneralOptions.salvageAnyCity ? ' CHECKED' : '') + '/> When primary city is full, put aetherstones in any city. ';
        m += '    Maximum number of aetherstones: <INPUT id=OrganizerMaxStone type=text size=7 maxlength=7 value="' + GeneralOptions.maxStones + '"/></div></td></TR>';
        m += '<TR><TD>Overflow method: <select id=OrganizerOverflow><option value="order">City order</option><option value="lowest">Lowest city</option>  </select></TD></TR>';
        m += '<tr><td><div>Load Throne Room salvager settings from domain number: <INPUT id=trLoadDomain type=text size=3 maxlength=3 /><INPUT id=trLoadRules type=button value="Load"/></div></td></tr>';
        m += '<tr><td><div>Load Champ Hall salvager settings from domain number: <INPUT id=chLoadDomain type=text size=3 maxlength=3 /><INPUT id=chLoadRules type=button value="Load"/></div></td></tr>';
        m += '<TR><TD><div style="white-space: pre;" ><INPUT id=trSalUpgradeFirst type=checkbox ' + (TRsalvageData.upgradeFirst ? ' CHECKED' : '') + '/> Upgrade items to +1 before deleting.';
        m += ' Maximum quality: <select id="trSalUpgradeQuality">';
        m += '<option value="0">' + uW.g_js_strings.throneRoom.simple + '</option>';
        m += '<option value="1">' + uW.g_js_strings.throneRoom.common + '</option>';
        m += '<option value="2">' + uW.g_js_strings.throneRoom.uncommon + '</option>';
        m += '<option value="3">' + uW.g_js_strings.throneRoom.rare + '</option>';
        m += '<option value="4">' + uW.g_js_strings.throneRoom.epic + '</option>';
        m += '<option value="5">' + uW.g_js_strings.throneRoom.wondrous + '</option>';
        m += '</select> (Throne Room Only) </div></td></tr>';
        m += '<TR><TD><div style="white-space: pre;" ><INPUT id=trSalUpgradeManual type=checkbox ' + (TRsalvageData.upgradeManual ? ' CHECKED' : '') + '/> Upgrade items to +1 on manual delete. (Throne Room Only)</td></tr>';

        m += '<TR><td><div  class=trStat>THRONE/CHAMP ENHANCE & UPGRADER OPTIONS</div></td></TR>';
        m += '<tr><td><div><b>Primary city to use aetherstones from: </b><span id="OrganizerUpgradeCity"></span></div></td></tr>';//<span id=OrganizerStonesRemain></span></div></td></tr>';
        m += '<tr><td width=25%>Retry interval (seconds): <INPUT id=OrganizerUpgradeRefresh type=text size=3 maxlength=3 value="' + GeneralOptions.retryInterval + '"/></td></tr>';
        m += '  <tr><td colspan=2><div style="white-space: pre;"><INPUT id=OgranizerUseAnyCity type=checkbox ' + (GeneralOptions.useAnyCity ? ' CHECKED' : '') + '/> When primary city is low, use aetherstones from any city.  ';
        m += ' Minimum number of aetherstones: <INPUT id=OrganizerMinStone type=text size=7 maxlength=7 value="' + GeneralOptions.minStones + '"/> </div></td></tr>';
        m += '<tr><td colspan=2>  <INPUT id=OrganizerWhisperCheck type=checkbox ' + (GeneralOptions.whisperToMe ? 'CHECKED ' : '') + '/> Whisper to myself on successful upgrades</td></tr> ';
        m += '<tr><td colspan=2>  <INPUT id=OrganizerBuffsCheck type=checkbox ' + (GeneralOptions.buffsOff ? 'CHECKED ' : '') + '/> Prevent Kabam from automatically selecting upgrade tokens</td></tr> ';
        m += '<tr><td colspan=2><INPUT id=OrganizerSafetyCheck type=checkbox ' + (GeneralOptions.safetyOn ? 'CHECKED ' : '') + '/> Disable manual upgrades if less than <input id=OrganizerSafetyLimit size=10 maxlength=10 value="' + GeneralOptions.safetyLimit + '" /> aetherstone</td></tr> ';
        m += '<tr><td colspan=2><INPUT id=OrganizerTokenCheck type=checkbox ' + (GeneralOptions.removeTokens ? 'CHECKED ' : '') + '/> Remove master and lucky tokens from upgrade panel </td></tr> ';
        m += '<tr><td colspan=2><INPUT id=OrganizerMultiUp type=checkbox ' + (GeneralOptions.multiUpgrade ? 'CHECKED ' : '') + '/> Add button for combined upgrade/enhancement</td></tr> ';
        m += '<tr><td colspan=2><INPUT id=OrganizerNoMassS type=checkbox ' + (GeneralOptions.noMassSalvage ? 'CHECKED ' : '') + '/> Remove button for Mass Salvage</td></tr> ';
        m += '<tr><td colspan=2><INPUT id=OrganizerSalvageSafety type=checkbox ' + (GeneralOptions.salvageSafety ? 'CHECKED ' : '') + '/> Remove Salvage button for the first <INPUT id=OrganizerSafetyNum type=text size=3 maxlength=3 value="' + GeneralOptions.numSafety + '"/> items</td></tr> ';

        m += '<TR><td><div  class=trStat>THRONE ROOM DEFINITIONS</div></td></TR>';
        m += '<tr><td><div id=throneDefinition style="float: left; ;">';
        m += '<table>';
        var presetSlots = getObjectCollectionCount(Seed.throne.slotEquip);
        for (i=1;i<presetSlots+1;i++) {
            m += '<tr><td>Preset ' + i + ' Definition: </td><td><input class=trPresetNameEntry type=text id=trPreset' + i + ' value="' + TRpresetData.presetNames[i] + '"></td></tr>';
        }
        m += '</table>';
        m += '</div></td></tr>';
        m += '<tr><td><div id=OrganizerLocalPresets style="display: ';
        if (GeneralOptions.localPresetHidden) {
            m += 'none;';
        } else {
            m += 'block;';
        }
        m += '"><table>';
        m += '<TR><td><div  class=trStat>THRONE ROOM LOCAL PRESET OPTIONS</div></td></TR>';
        m += '<TR><td><div style="text-align:center;"> Local Preset Names/Descriptions</div></td></TR>';

        for (j = 0; j < TRpresetData.num_presets; j++) {
            if (!TRpresetData.desc[j]) TRpresetData.desc[j] = 'Preset ' + String.fromCharCode(65 + j);
            if (!TRpresetData.ids[j]) TRpresetData.ids[j] = String.fromCharCode(65 + j);
            m += '<tr><td style="width: 650px; white-space: nowrap;">Name: <INPUT class=trNameEntry id=trPresetName' + j + ' type=text size=8 maxlength=8 value="' + TRpresetData.ids[j] + '"/> Description: <INPUT class=trDescEntry id=trPresetDesc' + j + ' type=text size=80 maxlength=100 value="' + TRpresetData.desc[j] + '"/></td></tr>';
        }

        m += '<TR><TD><div style="white-space: pre;" >Number of presets: <INPUT id=trNumPresets type=text size=4 maxlength=2 value="' + TRpresetData.num_presets + '"/>  <INPUT id=trNoTooltips type=checkbox ' + (TRpresetData.noTooltips ? ' CHECKED' : '') + '/> Do not show large portrait tooltips</div></td></tr>';
        m += '</table></div></td></tr>';
        m += '</table></div>';

        t.myDiv.innerHTML = m;

        new CdispCityPicker ('salcitysel', document.getElementById('OrganizerSalvageCity'), true, t.SalvageCityButton, GeneralOptions.salvageCityNum);
        new CdispCityPicker ('upcitysel', document.getElementById('OrganizerUpgradeCity'), true, t.UsedCityButton, GeneralOptions.usedCityNum);

        $("#trpplink")
        .attr('href', 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=TJ9YQ8S75HFEL')
        .attr('target', '_blank');
        $("#trpp")
        .attr( 'src', 'https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif')
        .attr( 'alt', 'donate')
        .css( 'cursor', 'pointer');

/* remove resizing restrictions

        $("#optionScroll").resizable({
            minWidth: 710,
            maxWidth: 810,
            minHeight: 300,
            maxHeight: 780,
            stop: function (event, ui) {
                TRupgradeData.optionH = ui.size.height + 'px';
                TRupgradeData.optionW = ui.size.width + 'px';
                TRsaveUpgradeData();
            }
        });

        $("#optionScroll").css('height', TRupgradeData.optionH).css('width', TRupgradeData.optionW);
*/

        $("input.trPresetNameEntry").blur(function () {
            var id = $(this).attr('id');
            var num = id.split("trPreset")[1];
            var presetName = $(this).val();
            if (presetName == "") {
                presetName = "undefined";
                document.getElementById(id).setAttribute("value",presetName);
                TRpresetData.presetNames[num] = presetName;
                TRsavePresetData();
            }
        });

        // read the preset names and descriptions
        $("input.trPresetNameEntry").change(function () {
            var id = $(this).attr('id');
            var num = id.split("trPreset")[1];
            var presetName = $(this).val();
            if (presetName == "") {
                presetName = "undefined";
                document.getElementById(id).setAttribute("value",presetName);
            }
            TRpresetData.presetNames[num] = presetName;
            TRsavePresetData();
        });

        $('#OrganizerDisableAnim').change(function () {
            GeneralOptions.disableAnim = document.getElementById('OrganizerDisableAnim').checked;
            disableAnimation(GeneralOptions.disableAnim);
            saveGeneralOptions();
        }
            );

        $('#OrganizerPresetOption').change(function () {
            GeneralOptions.presetWidget = document.getElementById('OrganizerPresetOption').checked;
            saveGeneralOptions();
        }
            );

        $('#OrganizerPresetColor').change(function () {
            GeneralOptions.presetColor = $("#OrganizerPresetColor").val();
            saveGeneralOptions();
        }
            );

        $('#OrganizerTagColor').change(function () {
            GeneralOptions.tagColor = $("#OrganizerTagColor").val();
            saveGeneralOptions();
        }
            );

        $('#OrganizerUpdate').change(function () {
            GlobalOptions.OrganizerUpdate = document.getElementById('OrganizerUpdate').checked;
            GM_setValue('TROptions_??', JSON2.stringify(GlobalOptions));
        }
            );

        $('#OrganizerUpdateSite').change(function () {
            GlobalOptions.UpdateSite = $("#OrganizerUpdateSite").val();
            GM_setValue('TROptions_??', JSON2.stringify(GlobalOptions));
        }
            );

        $('#OrganizerWhisperCheck').change(function () {
            GeneralOptions.whisperToMe = document.getElementById('OrganizerWhisperCheck').checked;
            saveGeneralOptions();
        }
            );

        $('#OrganizerSafetyCheck').change(function () {
            GeneralOptions.safetyOn = document.getElementById('OrganizerSafetyCheck').checked;
            saveGeneralOptions();
        }
            );

        $('#OrganizerTokenCheck').change(function () {
            GeneralOptions.removeTokens = document.getElementById('OrganizerTokenCheck').checked;
            saveGeneralOptions();
        }
            );

        $('#OrganizerMultiUp').change(function () {
            GeneralOptions.multiUpgrade = document.getElementById('OrganizerMultiUp').checked;
            saveGeneralOptions();
        }
            );

        $('#OrganizerNoMassS').change(function () {
            GeneralOptions.noMassSalvage = document.getElementById('OrganizerNoMassS').checked;
            saveGeneralOptions();
        });

        $('#OrganizerSalvageSafety').change(function () {
            GeneralOptions.salvageSafety = document.getElementById('OrganizerSalvageSafety').checked;
            saveGeneralOptions();
        });
        
        $('#OrganizerLocalPresetHidden').change(function () {
            GeneralOptions.localPresetHidden = document.getElementById('OrganizerLocalPresetHidden').checked;
            var lp = document.getElementById('localPresets');
            var lpOptions = document.getElementById('OrganizerLocalPresets');
            if (GeneralOptions.localPresetHidden) {
                lp.style.display= "none";
                lpOptions.style.display= "none";
            } else {
                lp.style.display= "block";
                lpOptions.style.display= "block";
            }
            saveGeneralOptions();
        });

        $("#OrganizerSafetyNum").change(function () {
            GeneralOptions.numSafety = parseInt($("#OrganizerSafetyNum").val());
            saveGeneralOptions();
        });


        $('#OrganizerBuffsCheck').change(function () {
            GeneralOptions.buffsOff = document.getElementById('OrganizerBuffsCheck').checked;
            saveGeneralOptions();
        }
            );

        $('#OrganizerSafetyLimit').change(function () {
            GeneralOptions.safetyLimit = parseInt($("#OrganizerSafetyLimit").val());
            saveGeneralOptions();
        }
            );

        $('#OrganizerUpdateNow').click(
                    function () { AutoUpdater.call(true, true); }
            );

        $('#trResetWidgets').click(
                    function () { resetGuardWidget(); resetPresetWidget(); }
            );

        $('#OrganizerSalAnyCity').change(function () {
            GeneralOptions.salvageAnyCity = document.getElementById('OrganizerSalAnyCity').checked;
            saveGeneralOptions();
        });

        $('#trSalUpgradeFirst').change(function () {
            TRsalvageData.upgradeFirst = document.getElementById('trSalUpgradeFirst').checked;
            TRsaveSalvageData();
        });

        $('#trSalUpgradeManual').change(function () {
            TRsalvageData.upgradeManual = document.getElementById('trSalUpgradeManual').checked;
            TRsaveSalvageData();
        });

        // set the upgrade quality limit widget
        $("#trSalUpgradeQuality").val(TRsalvageData.upgradeFirstQual);
        $("#trSalUpgradeQuality").change(function () { TRsalvageData.upgradeFirstQual = $("#trSalUpgradeQuality").val(); TRsaveSalvageData(); });

        $("#OrganizerMaxStone").change(function () {
            GeneralOptions.maxStones = $("#OrganizerMaxStone").val();
            saveGeneralOptions();
        });

        $('#OrganizerUpgradeRefresh').change(function () {
            GeneralOptions.retryInterval = parseInt(document.getElementById('OrganizerUpgradeRefresh').value);
            if (GeneralOptions.retryInterval < 15) GeneralOptions.retryInterval = 15;
            saveGeneralOptions();
        });

        $("#OrganizerMinStone").change(function () {
            GeneralOptions.minStones = $("#OrganizerMinStone").val();
            saveGeneralOptions();
        });

        $("#trLoadRules").click(function () {
            var d = $("#trLoadDomain").val();
            if (d != null)
                TRloadSalvageData(d);
        });

        $("#chLoadRules").click(function () {
            var d = $("#chLoadDomain").val();
            if (d != null)
                CHloadSalvageData(d);
        });

        // set the overflow widget
        $("#OrganizerOverflow").val(GeneralOptions.overflow);
        $("#OrganizerOverflow").change(function () { 
            GeneralOptions.overflow = $("#OrganizerOverflow").val();
            saveGeneralOptions(); 
        });

        // read the preset names and descriptions
        $("input.trNameEntry").change(function () {
            var id = $(this).attr('id');
            var num = id.split("trPresetName")[1];
            TRpresetData.ids[num] = $(this).val();
            TRsavePresetData();
            Tabs.throneOrganizer.init(Tabs.throneOrganizer.myDiv);
        });

        $("input.trDescEntry").change(function () {
            var id = $(this).attr('id');
            var num = id.split("trPresetDesc")[1];
            TRpresetData.desc[num] = $(this).val();
            TRsavePresetData();
            Tabs.throneOrganizer.init(Tabs.throneOrganizer.myDiv);
        });

        $('#trNoTooltips').change(function () {
            TRpresetData.noTooltips = document.getElementById('trNoTooltips').checked;
            TRsavePresetData();
            Tabs.throneOrganizer.show();

        });

        $("#trNumPresets").change(function () {
            var newNum = $("#trNumPresets").val();
            if (TRpresetData.num_presets != newNum) {
                TRpresetData.num_presets = newNum;
                t.init(t.myDiv);
                TRsavePresetData();
                Tabs.throneOrganizer.init(Tabs.throneOrganizer.myDiv);
            }
        });


        disableAnimation(GeneralOptions.disableAnim);
    },

    SalvageCityButton : function (city, x, y){
        var t = Tabs.OrganizerOptions;
        GeneralOptions.salvageCityNum = city.idx;
        saveGeneralOptions();
    },


    UsedCityButton : function (city, x, y){
        var t = Tabs.OrganizerOptions;
        GeneralOptions.usedCityNum = city.idx;
        saveGeneralOptions();
    },

    show: function () {

    },

    hide: function () {

    }

}

/** ***************** Champ Upgrade ********************* */

Tabs.champUpgrader = {
        tabOrder: 600,
        tabLabel: 'Champ Upgrade',
        tabDisabled : false,
        myDiv : null,
        repairId : 0,
        repairEnd : 0,
        timerH : null,
        clearTimerH : null,
        qualities :  [ uW.g_js_strings ? uW.g_js_strings.throneRoom.simple: "Simple", 
           uW.g_js_strings ? uW.g_js_strings.throneRoom.common : "Common",
           uW.g_js_strings ? uW.g_js_strings.throneRoom.uncommon : "Uncommon",
           uW.g_js_strings ? uW.g_js_strings.throneRoom.rare : "Rare", 
           uW.g_js_strings ?uW.g_js_strings.throneRoom.epic : "Epic",
           uW.g_js_strings ?uW.g_js_strings.throneRoom.wondrous : "Wondrous"],
           upgradePath : {
               0: {maxLev: 2, nextQual: 2 },
               1: {maxLev: 2, nextQual: 2 },
               2: {maxLev: 3, nextQual: 4 },
               3: {maxLev: 3, nextQual: 4 },
               4: {maxLev: 4, nextQual: 5 }
           },

           repaint : function() {
               var t = Tabs.champUpgrader;
               t.init(t.myDiv);
           },

           init : function (div){
               var t = Tabs.champUpgrader;
               t.myDiv = div;

               if (unsafeWindow.g_js_strings)
               {
                   t.qualities = [ unsafeWindow.g_js_strings.throneRoom.simple, 
                                   unsafeWindow.g_js_strings.throneRoom.common,
                                   unsafeWindow.g_js_strings.throneRoom.uncommon,
                                   unsafeWindow.g_js_strings.throneRoom.rare, 
                                   unsafeWindow.g_js_strings.throneRoom.epic,
                                   unsafeWindow.g_js_strings.throneRoom.wondrous];
               }

               // header stuff
               var m = '<Div id=chfield><DIV id=chUpgrader class=chStat>AUTOMATED CHAMPION UPGRADER</div><TABLE id=chUpgrader width=100% height=0% class=chTab>';
               m+= '</table></div>';

               // 
               m += '<TABLE width=100% id=chupdtable class=chTabPad>';

               m += '<tr>';
               if (CHupgradeData.active == false) {
                   m += '<TD width=25%><div><INPUT id=chUpgraderPower type=button value="Upgrade = OFF"/></div></td>';
               } else {
                   m += '<TD width=25%><div><INPUT id=chUpgraderPower type=button value="Upgrader = ON"/></div></td>';
               }

               m += '<td width=25%><INPUT id=chOneItem type=checkbox '+ (CHqueueData.oneItem ? ' CHECKED':'') +'/>  Upgrade 1 at a time</td>';
               m += '<td width=25%><INPUT id=chRepairAll type=checkbox '+ (CHupgradeData.repairAll?' CHECKED':'') +'/>  Repair all items</td>'; 
               m += '<td width=25%/></tr>';

//               m += '  <tr><td colspan=3><div ><b>City to use aetherstones from: </b><span id="chUpgradeCity"></span></div></td>';
//               m += '  <td><div id=chStoneRemain></div></td></tr>';
//               m += '<tr><td colspan=4><hr></td></tr>';
               m += '<tr align="center"><td colspan=4><div id=chUpgradeStatus class=indent25> <br> </div></td></tr>';
               m += '<tr align="center"><td colspan=4><div id=chLastResult class=indent25> <br> </div></td></tr>';
               m += '<tr><td colspan=4><hr></td></tr></table>';

               m += '<TABLE id=chupdtable2 class=chTabPad>';
               m += '<tr><td><div style="max-width:90%;">Item: <select id="chUpgradeList" style="width: 80%;">';
               m += '<option value="0">--Items--</option>';
               for (k in unsafeWindow.kocChampionItems) {
                   var champ_item = unsafeWindow.kocChampionItems[k];
                   m += '<option value="'+k+'">'+ champ_item.name+' [ ' + champ_item.equipmentId +' ] </option>';
                   //logit("CI: " + inspect(champ_item,8,3));
               }


               m += '</select></div></td>';

               m += '<td><div id=chActionDiv>Action: <select id="chAction">';
               m += '<option value="upgrade">Upgrade</option>';
               m += '<option value="enhance">Enhance</option>';
               m += '<option value="both">Both</option>';
               m += '</select></div></td>';
               m += '<td><div id=chMaxDiv></div></td>';

               m += "<td><div><INPUT id=chQueueAdd type=button value='Add'/></div></td></tr>";
               m += '<tr><td colspan=4><hr/></td></tr>';
//               m += '<tr><td colspan=4>';
//               m += '<input type=checkbox ' + (CHupgradeData.useLOM ? "CHECKED" : "") + ' id=chUseLOM>Lesser Orb of Metallurgy&nbsp;&nbsp;&nbsp;&nbsp;';
//               m += '<input type=checkbox ' + (CHupgradeData.useGOM ? "CHECKED" : "") + ' id=chUseGOM>Greater Orb of Metallurgy&nbsp;&nbsp;&nbsp;&nbsp;';
//               m += '</td></tr>';
//               m += '<tr><td colspan=4>';
//               m += "<input type=checkbox " + (CHupgradeData.useJT ? "CHECKED" : "") + " id=chUseJT>Journeyman Smith's Token";
//               m += "<input type=checkbox " + (CHupgradeData.useST ? "CHECKED" : "") + " id=chUseST>Smith's Token&nbsp;&nbsp;&nbsp;&nbsp;";
//               m += "<input type=checkbox " + (CHupgradeData.useET ? "CHECKED" : "") + " id=chUseET>Expert Smith's Token";
//               m += '</td></tr>';
//               m += '<tr><td colspan=4><hr/></td></tr>';
               m += '<tr><td colspan=4><div id=chQScroll style=" position: static; width: 100%; height: ' + OrganizerWindowHeight + '; overflow-x: visible; overflow-y: auto;"><div id=chQDiv /></div></td></tr>';

               m += '<tr align=center><div><td><input style="float: left;" id=chClearQ type=button value="Clear Queue"/></div></td><td colspan=1></td><td colspan=2><a id=chpplink><img id=chpp /></a></td></tr>';
               m += '</table>';

               m+='</div>';
               t.myDiv.innerHTML = m;

               $('#chClearQ').click( function() {
                   CHqueueData.list =[];
                   CHsaveQueueData();
                   Tabs.champUpgrader.buildQueueDisplay();
               });

//               $("#chQScroll").resizable({
//                   minWidth: 710,
//                   maxWidth: 1200,
//                   minHeight: 200,
//                   maxHeight: 800,
//                   stop: function(event, ui) {
//                       CHupgradeData.upgradeH =  ui.size.height + 'px';
//                       CHupgradeData.upgradeW =  ui.size.width  + 'px';
//                       CHsaveUpgradeData();
//                   }
//               });

//               $("#chQScroll").css('height', CHupgradeData.upgradeH).css('width', CHupgradeData.upgradeW);

//               $("#chpplink")
//               .attr('href', 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=FDW4NZ6PRMDMJ&lc=US&item_name=TR%20Organizer%20Donations&item_number=1001&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted')
//               .attr('target', '_blank');
//               $("#chpp")
//               .attr( 'src', 'https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif')
//               .attr( 'alt', 'dontae')
//               .css( 'cursor', 'pointer');

               document.getElementById('chUpgraderPower').addEventListener('click', function(){t.togglePower(this);} , false);

               document.getElementById('chRepairAll').addEventListener('change', function(){
                   CHupgradeData.repairAll = document.getElementById('chRepairAll').checked;
                   CHsaveUpgradeData();
               }, false);

               // wait for the current repair to finish before starting
               t.setStatus("Loading ....");

               $("#chQDiv").html('<div><table id="chQueue" class="chTabLined" width="100%"/></div>');


//               $("#chUseLOM").change( function () {
//                   CHupgradeData.useLOM = document.getElementById('chUseLOM').checked;
//                   CHsaveUpgradeData();
//               });

//               $("#chUseGOM").change( function () {
//                   CHupgradeData.useGOM = document.getElementById('chUseGOM').checked;
//                   CHsaveUpgradeData();
//               });

//               $("#chUseJT").change( function () {
//                   CHupgradeData.useJT = document.getElementById('chUseJT').checked;
//                   CHsaveUpgradeData();
//               });

//               $("#chUseST").change( function () {
//                   CHupgradeData.useST = document.getElementById('chUseST').checked;
//                   CHsaveUpgradeData();
//               });

//               $("#chUseET").change( function () {
//                   CHupgradeData.useET = document.getElementById('chUseET').checked;
//                   CHsaveUpgradeData();
//               });


               $("#chQueueAdd").click( function () { t.addQueue();});
               $("#chOneItem").change( function () { 
                   CHqueueData.oneItem = document.getElementById('chOneItem').checked;
                   CHsaveQueueData();
               });


               var d = 2 + Math.random() * 8;
               logit("checking repair time")
               
               if (Seed.queue_champion == null) {
                   for (kk in unsafeWindow.kocChampionItems) {
                       var K = unsafeWindow.kocChampionItems[kk];
                       if ((K.status == 2) ||  (K.status == 3)) {
                           logit("Object is being repaired, but there's no queue");
                           Seed.queue_champion = {};
                           Seed.queue_champion.start = parseInt(K.start);
                           Seed.queue_champion.end = parseInt(K.eta);
                           Seed.queue_champion.itemId = K.equipmentId;
                           break;
                       }
                   }
               }
               
               if (Seed.queue_champion != null && Seed.queue_champion.end != null)
               {
                   var repairTimeLeft = Seed.queue_champion.end- unixTime();
                   logit ("time left: " + repairTimeLeft);
                   t.repairEnd = Seed.queue_champion.end;
                   t.repairId = Seed.queue_champion.itemId;
                   var n = new Date(t.repairEnd *1000);

                   t.setStatus("Waiting until " + n.toLocaleTimeString() + " for repair to complete.  Item: " + unsafeWindow.kocChampionItems[t.repairId].name);
                   setTimeout(t.clearRepair, (repairTimeLeft+1)*5000);
                   if (repairTimeLeft >0) d += repairTimeLeft;
               }

               t.buildLevelWidget();
               t.buildQueueDisplay();
               $("#chAction").change( function() {t.buildLevelWidget();});


               if (t.timerH == null)
                   t.timerH = setTimeout(t.doAction, d*1000);

           },

           addUpgradeItem : function(id) {
               var t = Tabs.champUpgrader;
               var qItem = new QueueItem();
               qItem.item   = id;
               qItem.action = "upgrade";
               qItem.level  = OrganizerMaxCHLevel;
               CHqueueData.list.push(qItem);
               CHsaveQueueData();
               $("div#" + id).addClass('blueBorder');
               $("td#ch_card" + id).find("div.chbox").addClass('blueBorder2');
               t.buildQueueDisplay();
           },

           addEnhanceItem : function(id) {
               var t = Tabs.champUpgrader;
               var qItem = new QueueItem();
               qItem.item   = id;
               qItem.action = "enhance";
               qItem.level  = 5;
               CHqueueData.list.push(qItem);
               CHsaveQueueData();
               $("div#" + id).addClass('yellowBorder');
               $("td#ch_card" + id).find("div.chbox").addClass("yellowBorder2");
               t.buildQueueDisplay();
           },

           addBothItem : function (id) {
               var t = Tabs.champUpgrader;

               var champ_item = unsafeWindow.kocChampionItems[id];
               if (!champ_item)
               {
                   logit("Unable to find champion item.");
                   return;
               }

               var qual = +champ_item.rarity;
               var lev  = +champ_item.level;

               if (qual >= 5) {
                   logit("Item already at wondrous");
                   return;
               }

               var maxLev = null;
               var nextQual = null;
               var qItem = null;

               while (qual < 5) {
                   maxLev = t.upgradePath[qual].maxLev;
                   nextQual = t.upgradePath[qual].nextQual;

                   if (lev < maxLev) {
                       qItem = new QueueItem();
                       qItem.item   = id;
                       qItem.action = "upgrade";
                       qItem.level  = maxLev;
                       CHqueueData.list.push(qItem);
                       $("div#" + id).addClass('blueBorder');
                       $("td#ch_card" + id).find("div.chbox").addClass("blueBorder2");
                   }

                   qItem = new QueueItem();
                   qItem.item   = id;
                   qItem.action = "enhance";
                   qItem.level  = nextQual;
                   CHqueueData.list.push(qItem);
                   $("div#" + id).addClass('yellowBorder');
                   $("td#ch_card" + id).find("div.chbox").addClass("yellowBorder2");
                   lev = maxLev;
                   qual = nextQual;
               }

               CHsaveQueueData();
               t.buildQueueDisplay();
           },

           doAction :function ()
           {
               var t = Tabs.champUpgrader;
               var retryTime = GeneralOptions.retryInterval;

               try {
                   // check if repair is done
                   var ti = t.clearRepair();
                   if ( ti <= 0)
                   {  
                       // repair is done
                       if (CHqueueData.oneItem || (CHqueueData.doingRepairs == true))
                       {
                           if (CHupgradeData.repairAll == true)
                           {
                               var lastBroken = 0;

                               // repair everything
                               for (k in unsafeWindow.kocChampionItems)
                               {
                                   var champ_item = unsafeWindow.kocChampionItems[k];
                                   if (!champ_item) continue;


                                   if (champ_item.status == CM.CHAMPION.STATUS_BROKEN_UPGRADE || champ_item.status == CM.CHAMPION.STATUS_BROKEN_ENHANCE)
                                   {
                                       lastBroken = champ_item.equipmentId;
                                   }
                               }

                               // repair from the botton up.  This forces the items broken in the +1 upgrades to be fixed first so the salvager can continue
                               if (lastBroken != 0)
                               {
                                   t.doRepair(lastBroken);
                                   clearTimeout(t.timerH);
                                   t.timerH = setTimeout(t.doAction, retryTime*1000);
                                   return;
                               }
                           } else {
                               // repair first broken item in queue
                               for (k in CHqueueData.list)
                               {
                                   var q = CHqueueData.list[k];
                                   if (!q) continue;
                                   var champ_item = unsafeWindow.kocChampionItems[q.item];
                                   if ((champ_item == null) || (CHqueueData.list[k].status == "complete"))
                                       continue;

                                   if (champ_item.status == CM.CHAMPION.STATUS_BROKEN_UPGRADE || champ_item.status == CM.CHAMPION.STATUS_BROKEN_ENHANCE)
                                   {
                                       t.doRepair(champ_item.equipmentId);
                                       clearTimeout(t.timerH);
                                       t.timerH = setTimeout(t.doAction, retryTime*1000);
                                       return;
                                   }  else if (CHqueueData.oneItem) {
                                       break;
                                   }
                               }
                           }
                       }

                       // all repairs complete
                       CHqueueData.doingRepairs = false;
                       // set the index
                       t.selectNext();
                       CHsaveQueueData();

                       // if we reach the end of the queue, start repair cycle
                       if (CHqueueData.index <0) {
                           t.setStatus("Reached end of queue.")
                           CHqueueData.doingRepairs = true;
                           CHsaveQueueData();
                           clearTimeout(Tabs.champUpgrader.timerH);
                           t.timerH = setTimeout(t.doAction, retryTime*1000);
                           return;
                       }

                       // upgrade/enhance next item
                       var qItem = CHqueueData.list[CHqueueData.index];

                       if (qItem) {
                           //qItem.triesTotal++;
                           //qItem.triesThis++;

                           if (qItem.action == "enhance")
                               t.doEnhance(qItem.item);
                           else 
                               t.doUpgrade(+qItem.item, false);
                       }
                   } else {
                       // come back after repair is complete
                       retryTime = ti + 5;
                       var n = new Date(t.repairEnd *1000);
                       t.setStatus("Waiting until " + n.toLocaleTimeString() + " for repair to complete.  Item: " + unsafeWindow.kocChampionItems[t.repairId].name);
                   }
                   //unsafeWindow.cm.ThroneView.renderInventory(unsafeWindow.kocChampionItems);
               } catch(e) {
                   logit("do action exception");
                   logit ("exception: " + inspect(e,3,1));
               }
               // recycle
               clearTimeout(Tabs.champUpgrader.timerH);
               t.timerH = setTimeout(t.doAction, retryTime*1000);
           },

           selectNext : function () {

               if (CHqueueData.index >= CHqueueData.list.length) CHqueueData.index = 0;
               if (CHqueueData.index < 0) CHqueueData.index = 0;

               // for single item mode, always start from the top
               if (CHqueueData.oneItem) CHqueueData.index = 0; 

               var l = CHqueueData.list.length;
               for (i=CHqueueData.index; i < l; i++ ) {
                   var item = CHqueueData.list[i];
                   if (!item) continue;
                   //var id = item.item;
                   var champ_item = unsafeWindow.kocChampionItems[item.item];
                   if ( (CHqueueData.list[i].status != "complete") 
                           && ( champ_item != null) 
                           && ! (champ_item.status == CM.CHAMPION.STATUS_BROKEN_UPGRADE || champ_item.status == CM.CHAMPION.STATUS_BROKEN_ENHANCE) )
                   {
                       if ( ((item.action == "enhance") && (item.level <= champ_item.rarity)) ||
                               ((item.action == "upgrade") && (item.level <= champ_item.level)) ) {
                           item.status = "complete";
                       }  else {
                           CHqueueData.index = i;
                           return;
                       }
                   }
               }

               // if we get here, the queue is complete
               CHqueueData.index = -1;
           },

           doEnhance : function(eItem) {
               //logit("enhance");
               var t = Tabs.champUpgrader;
               try {
                   if (CHupgradeData.active == false ||  eItem ==0)
                   {
                       t.setStatus("Powered off");
                       return;
                   }
                   var y = unsafeWindow.kocChampionItems[eItem];

                   if (!y) return;

                   if (y.status == CM.CHAMPION.STATUS_BROKEN_UPGRADE || y.status == CM.CHAMPION.STATUS_BROKEN_ENHANCE)
                   {
                       // repair and then try again later
                       t.doRepair(eItem);
                       return;
                   }

                   var num_city = t.pickCity();
                   if ( num_city < 0)
                   {
                       t.setStatus("Not enough aetherstones to enhance.  Minimum of " + GeneralOptions.minStones + " needed.  Waiting for more ...");
                       return;
                   }

                   var z = CM.WorldSettings.getSettingAsObject("CE_ENHANCE_AETHERSTONE_MAP");
                   var w = z[parseInt(y.rarity) + 1].Aetherstones;

                   if ( w > parseInt(Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0]) )
                   {
                       t.setStatus("Not enough aetherstones to enhance.");
                       return; 
                   }

                   var qI = CHqueueData.list[CHqueueData.index];
                   if (qI)
                   {

                       qI.triesTotal++;
                       qI.triesThis++;
                   }

//                   var chanceItem = 0

//                   if ( CHupgradeData.active && CHqueueData.index != -1 ) {

//                       if (CHupgradeData.useLOM) {
//				           if (Seed.items['i21001'] > 0) chanceItem = 21001;
//			           }

//                       if (CHupgradeData.useGOM) {
//		                   if (Seed.items['i21002'] > 0) chanceItem = 21002;
//                       }

//			           if (chanceItem) unsafeWindow.cm.InventoryView.removeItemFromInventory(chanceItem);

//                   }

                   var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);

                   //params.ctrl = 'ChampionRoom\\ChampionRoomServiceAjax';
                   params.action = '4';
                   params.cityId = Seed.cities[num_city][0];
                   params.eid = eItem;
                   params.chanceItem = 0;
                   params.aetherstones = w;
                   params.gems = 0;

                   //logit("Sending enhance request");
                   t.setStatus("Sending enhance request");
                   new AjaxRequest(unsafeWindow.g_ajaxpath + 'ajax/ceEquipmentManagerAjax.php' + unsafeWindow.g_ajaxsuffix, {
                       method: "post",
                       parameters: params,
                       loading: true,
                       onSuccess: function (transport) {
                           try {
                               //logit("enhance request sucess");
                               //logit("transport: " + inspect(transport,3,1));
                               var rslt = eval("(" + transport.responseText + ")");
                               //logit("rslt: " + inspect(rslt,3,1));
                               if(rslt.ok){
                                   if (rslt.updateSeed) unsafeWindow.update_seed(rslt.updateSeed);
                                   Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0] = Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0] - rslt.aetherstones;
                                   if (rslt.gems > 0)
                                   {
                                       ActionLog('Upgrader accidentally spent gems!  Upgrader turned off');
                                       t.setStatus("Error ... shutting down");
                                       CHupgradeData.active = false;
                                       CHsaveUpgradeData();
                                   }

                                   if (rslt.itemConsumed.itemId != "0") {
                                       unsafeWinddow.ksoItems[rslt.itemConsumed.itemId].subtract()
                                   }

                                   Seed.player.might += rslt.mightGain;
                                   $("#topnav_might").html(Seed.player.might);

                                   if ( y.rarity != parseInt(rslt.rarity))
                                   {
                                       logit("successful enhancement");
                                       y.rarity = rslt.rarity;
                                       y.name = y.createName();
                                       Tabs.champUpgrader.repaint();
                                       t.setResult("Enhance successful.  "  + addCommas(rslt.aetherstones) + " aetherstones used.");
                                       //t.setStones(Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0]);
                                       t.setStatus("Attempting next action");
                                       unsafeWindow.cm.sounds.play("ch_success_build");
                                       // update the cost line
                                       var qItem = CHqueueData.list[CHqueueData.index];
                                       if (qItem)
                                       {
                                           var now = new Date();
                                           qItem.lastUpgrade = "Enhanced to " + Tabs.champUpgrader.qualities[y.rarity] + " " + now.toDateString().substring(3,10) + " " + now.toTimeString().substring(0,8)  + " in " + qItem.triesThis + " attempts";
                                           if (!qItem.upgrades) qItem.upgrades = [];
                                           qItem.upgrades.push(qItem.lastUpgrade);

                                           var msg = 'Enhanced '+unsafeWindow.kocChampionItems[eItem].name + ' [ ' + eItem + '] to quality ' + rslt.rarity + " in " + qItem.triesThis + " attempts. " + qItem.triesTotal + " total attempts for this item.";
                                           SuccessLog(msg);
                                           if (GeneralOptions.whisperToMe) sendChat("/"+ Seed.player.name +' ' + msg);

                                           if (qItem.level <= y.rarity) {
                                               qItem.status = "complete";
                                               CHupgradeData.newUpgradeState = 2;
                                           }
                                           else {
                                               var now = new Date();
                                               qItem.status = "Partially enhanced";
                                               qItem.triesLast = qItem.triesThis;
                                               qItem.triesThis = 0;
                                               if (CHupgradeData.newUpgradeState !=2 ) CHupgradeData.newUpgradeState =1;
                                           }
                                           CHsaveUpgradeData();
                                           setUpgradeColor();
                                       }
                                       CHsaveQueueData();
                                       Tabs.champUpgrader.buildQueueDisplay();
                                       clearTimeout(Tabs.champUpgrader.timerH);
                                       t.timerH = setTimeout(t.doAction, 10* 1000);
                                   }
                                   else
                                   {
                                       logit("enhance failed");
                                       ActionLog('Enhance failed Champion item '+unsafeWindow.kocChampionItems[eItem].name);
                                       if (rslt.broken == "yes") 
                                       {
                                           y.status = CM.CHAMPION.STATUS_BROKEN_ENHANCE;
                                       }

                                       y.name = y.createName();
                                       t.setResult("Enhance failed.  "  + addCommas(rslt.aetherstones) + " aetherstones used");
                                       //t.setStones(Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0]);
                                       //t.setStatus("Starting repair ...");
                                       var qItem = CHqueueData.list[CHqueueData.index];
                                       if (qItem)  if (qItem.status == "not started") qItem.status = "started";
                                       CHsaveQueueData();
                                       Tabs.champUpgrader.buildQueueDisplay();
                                       clearTimeout(Tabs.champUpgrader.timerH);
                                       Tabs.champUpgrader.timerH = setTimeout(t.doAction, 10*1000);
                                       //t.doRepair(y.id);
                                   }
                                   //unsafeWindow.cm.ThroneView.renderInventory(unsafeWindow.kocChampionItems);
                               }
                               else
                               {
                                   logit("enhance error");
                                   logit("Enhance result:" + inspect (rslt, 3, 1));
                                   if (rslt.feedback)
                                       t.setStatus(rslt.feedback);
                                   else
                                       t.setStatus("Unable to enhance at this time ... waiting for next cycle");

                               }
                           } catch (e) {
                               logit("exception: " + inspect(e,3,1));
                           }
                           return;
                       },
                       onFailure: function (rst) {
                           logit("Enhance request error.  Waiting for next cycle.");
                           t.setStatus("Unable to send enhance request.  Waiting for next cycle");
                           logit("result: " + inspect(rst,3,1));
                           // try to repair item
                           //t.doRepair(y.id);

                           return;
                       }
                   });
               } catch (e) {
                   logit("exception");
                   logit ("exception: "+ inspect(e,3,1));

               }
               return;
           },

           doUpgrade : function(uItem, bypass) {
               var t = Tabs.champUpgrader;
               var y = unsafeWindow.kocChampionItems[uItem];
               if ( uItem ==0 || y == null)
               {
                   t.setStatus("Item not found.");
                   return;
               }

               if ( (CHupgradeData.active == false) && (bypass !=true))
               {
                   t.setStatus("Powered off.");
                   return;
               }

               if (y.status == CM.CHAMPION.STATUS_BROKEN_UPGRADE || y.status == CM.CHAMPION.STATUS_BROKEN_ENHANCE)
               {
                   // repair and then try again later
                   t.doRepair(uItem);
                   return;
               }

               if (y.status == CM.CHAMPION.STATUS_REPAIRING_ENHANCE || y.status == CM.CHAMPION.STATUS_REPAIRING_UPGRADE)
               {
                   t.setStatus("Item is still being repaired");
                   return;
               }

               var num_city = t.pickCity();
               if ( num_city < 0)
               {
                   t.setStatus("Not enough aetherstones to upgrade.  Minimum of " + GeneralOptions.minStones + " needed.  Waiting for more ...");
                   return;
               }

               var z = CM.WorldSettings.getSettingAsObject("CE_UPGRADE_AETHERSTONE_MAP");
               var w = z[parseInt(y.level) + 1].Aetherstones;

               if ( w > parseInt(Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0]) )
               {
                   t.setStatus("Not enough aetherstones to upgrade.");
                   return; 
               }

               if (bypass != true)
               {
                   var qI = CHqueueData.list[CHqueueData.index];
                   if (qI)
                   {
                       qI.triesTotal++;
                       qI.triesThis++;
                   }

                   t.setStatus("Sending upgrade request ...");
               }

//               var chanceItem = 0

//               if ( CHupgradeData.active && CHqueueData.index != -1 ) {

//                    if (CHupgradeData.useET) {
//		                if (Seed.items['i21058'] > 0) chanceItem = 21058;
//                    }

//                    if (CHupgradeData.useST) {
//		                if (Seed.items['i21052'] > 0) chanceItem = 21052;
//                    }

//                    if (CHupgradeData.useJT) {
//	                    if (Seed.items['i21051'] > 0) chanceItem = 21051;
//                    }


//	                if (chanceItem) unsafeWindow.cm.InventoryView.removeItemFromInventory(chanceItem);

//               }

               var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);

               params.action = '5';
               params.cityId = Seed.cities[num_city][0];
               params.eid = uItem;
               params.chanceItem = 0;
               params.aetherstones = w;
               params.gems = 0;

               //params.tvuid;

               new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/ceEquipmentManagerAjax.php" + unsafeWindow.g_ajaxsuffix, {
                   method: "post",
                   parameters: params,
                   loading: true,
                   onSuccess: function (transport) {
                       try {

                           //logit("transport: " + inspect(transport,3,1));
                           var rslt = eval("(" + transport.responseText + ")");
                           if(rslt.ok){
                               if (rslt.updateSeed) unsafeWindow.update_seed(rslt.updateSeed);
                               Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0] = Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0] - parseInt(rslt.aetherstones);

                               if (rslt.gems > 0)
                               {
                                   t.setStatus("Error .... Shutting down.");
                                   ActionLog('Upgrader accidentally spent gems!  Upgrader turned off');
                                   CHupgradeData.active = false;
                                   CHsaveUpgradeData();
                               }

                               if (rslt.itemConsumed.itemId != "0") {
                                   unsafeWinddow.ksoItems[rslt.itemConsumed.itemId].subtract()
                               }

                               Seed.player.might += rslt.mightGain;
                               $("#topnav_might").html(Seed.player.might);

                               //var item = unsafeWindow.kocChampionItems[rslt.id];

                               if ( parseInt(rslt.level) != y.level)
                               {
                                   logit("upgrade successful");
                                   //t.setStones(Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0]);
                                   y.level = parseInt(rslt.level);
                                   y.name = y.createName();

                                   if (bypass !=true)
                                   {
                                       Tabs.champUpgrader.repaint();

                                       t.setResult("Upgrade successful.  "  + addCommas(rslt.aetherstones) + " aetherstones used.");
                                       t.setStatus("Attempting next upgrade");
                                       unsafeWindow.cm.sounds.play("ch_success_build");

                                       var qItem = CHqueueData.list[CHqueueData.index];
                                       if (qItem) {
                                           var now = new Date();
                                           qItem.lastUpgrade = "Upgraded to +" + y.level + " " + now.toDateString().substring(3,10) + " "+ now.toTimeString().substring(0,8) + " in " + qItem.triesThis + " attempts";

                                           if (!qItem.upgrades) qItem.upgrades = [];
                                           qItem.upgrades.push (qItem.lastUpgrade);

                                           var msg = 'Upgraded '+unsafeWindow.kocChampionItems[uItem].name + ' [' + uItem + '] to level ' + rslt.level + " in " + qItem.triesThis + " attempts. " + qItem.triesTotal + " total attempts for this item.";
                                           if (GeneralOptions.whisperToMe) sendChat("/"+ Seed.player.name +' ' + msg);
                                           SuccessLog(msg);
                                           if (qItem.level <= y.level) {
                                               qItem.status = "complete";
                                               CHupgradeData.newUpgradeState =2;
                                           }
                                           else {
                                               var now = new Date();
                                               qItem.status = "Partially upgraded";
                                               qItem.triesLast = qItem.triesThis;
                                               qItem.triesThis = 0;
                                               if (CHupgradeData.newUpgradeState !=2) CHupgradeData.newUpgradeState = 1;
                                           }
                                           CHsaveUpgradeData();
                                           setUpgradeColor();
                                       }
                                       CHsaveQueueData();
                                       Tabs.champUpgrader.buildQueueDisplay();
                                       clearTimeout(Tabs.champUpgrader.timerH);
                                       Tabs.champUpgrader.timerH = setTimeout(Tabs.champUpgrader.doAction, 10* 1000);
                                   }
                               }
                               else
                               {
                                   logit("upgrade failed");
                                   //t.setStones(Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0]);
                                   ActionLog('Upgrade failed Champion item '+unsafeWindow.kocChampionItems[uItem].name);
                                   if (rslt.broken == "yes") {
                                       y.status = CM.CHAMPION.STATUS_BROKEN_UPGRADE;
                                   }
                                   y.name = y.createName();
                                   if (bypass !=true)
                                   {
                                       if (rslt.feedback)
                                           t.setResult(rslt.feedback);
                                       else 
                                           t.setResult("Upgrade failed.  "  + addCommas(rslt.aetherstones) + " aetherstones used");


                                       //t.setStatus("Starting repair ... ");
                                       var qItem = CHqueueData.list[CHqueueData.index];
                                       if (qItem.status == "not started") qItem.status = "started";
                                       CHsaveQueueData();
                                       Tabs.champUpgrader.buildQueueDisplay();
                                       //t.doRepair(uItem);  // fix item
                                       clearTimeout(Tabs.champUpgrader.timerH);
                                       Tabs.champUpgrader.timerH = setTimeout(Tabs.champUpgrader.doAction, 10*1000);
                                   }
                               }
                               //unsafeWindow.cm.ThroneView.renderInventory(unsafeWindow.kocChampionItems);
                               return;
                           }
                           else
                           {
                               logit("upgrade not ok");
                               logit("result: " + inspect(rslt,3,1));

                               if (bypass !=true)
                               {
                                   t.setResult(rslt.feedback);
                               }

                               logit("Upgrade result:" + inspect (rslt, 3, 1));

                           }
                       } catch (e) {
                           logit("upgrade exception");
                           logit("Exception: " + inspect(e,3,1));
                       }
                       return;
                   },
                   onFailure: function (rrr) {
                       logit("upgrade failure");
                       logit("RRR: " + inspect(rrr,3,1));

                       t.setStatus("Unable to transmitt upgrade request.  Waiting for next cycle.");

                       return;
                   }
               });

               return;
           },

           addQueue : function () {
               var t = Tabs.champUpgrader;

               var action = $("#chAction").val();

               if (action == "both") {
                   t.addBothItem($("#chUpgradeList").val());
                   return;
               }

               var qItem = new QueueItem();
               qItem.item   = $("#chUpgradeList").val();
               qItem.action = $("#chAction").val();
               qItem.level  = $("#chMaxLevel").val();

               if (qItem.item == 0) return;

               CHqueueData.list.push(qItem);
               CHsaveQueueData();
               t.buildQueueDisplay();
           },

           buildLevelWidget : function () {
               var t = Tabs.champUpgrader;
               var m;
               if ($("#chAction").val() == "enhance") {
                   m = '<div id=chMaxDiv> Max: <select id="chMaxLevel">';
                   for (i =1; i <=5; i++) {
                       m  += '<option value="' + i + '">' + t.qualities[i] + '</option>';
                   }
                   m += '</select></div>';
               } else if ($("#chAction").val() == "upgrade") {
                   m = '<div id=chMaxDiv> Max: <select id="chMaxLevel">';
                   for (i =1; i <= OrganizerMaxCHLevel; i++) {
                       m  += '<option value="' + i + '"> +' + i + '</option>';
                   }
                   m += '</select></div>';
               } else {
                   m =  '<div id=chMaxDiv> - <select id="chMaxLevel">';
                   m += '</select></div>';
               }

               $("#chMaxDiv").html(m);
               if ($("#chAction").val() == "enhance") {
                   $("#chMaxLevel").val(5);
               } else if ($("#chAction").val() == "upgrade") {
                   $("#chMaxLevel").val(OrganizerMaxCHLevel);
               }

           },

           buildQueueDisplay : function () {
               var t = Tabs.champUpgrader;
               $("#chQueue").html("<table id='chQueue' width='100%' class=chTabPad/>");
               $("#chQueue").append("<tr><th width=5%>Reorder</th><th width='8%'>Status</th><th width='25%'>Item</th><th width='5%'>Action</th><th width='5%'>Max</th><th width='40%'>Status/Last Upgrade/Attempts</th><th width='10%'>Remove</th></tr>");

               for (ii in CHqueueData.list) {
                   var q = CHqueueData.list[ii];
                   if (!q) continue;
                   var the_item = unsafeWindow.kocChampionItems[q.item];

                   var name = "Unknown / Item removed";
                   var id = 0;

                   if (the_item) 
                   {
                       name = the_item.name;
                       id   = the_item.equipmentId;
                   }

                   var m = "<tr><td><div class='chup' id=chUpRow" + ii +" /><div class='chdown'  id=chDownRow" + ii +" /></td>"
                   +   "<td><div id=chState" + ii +"></div></td><td class=chUpdaterItemName id=chUpdaterItem" + id + " >"
                   + name + " [" +id + "]" + "</td><td>" + q.action + "</td><td>";

                   if (q.action =="enhance") {
                       m += '<div style="text-align: center;"><select id="chChangeLevel' + ii +'" style="width:90px; text-align: center;">';
                       for (i =1; i <=5; i++) {
                           m  += '<option value="' + i + '" '+ (q.level==i ? 'selected' : '' ) +'>' + t.qualities[i] + '</option>';
                       }
                       m += '</select></div>';
                   } else {
                       m += '<div  style="text-align: center;"><select id="chChangeLevel' + ii +'" style="width:90px; text-align: center;">';
                       for (i =1; i <= OrganizerMaxCHLevel; i++) {
                           m  += '<option value="' + i + '"  '+ (q.level==i ? 'selected' : '' ) +'> +' + i + '</option>';
                       }
                       m += '</select></div>';
                   }

                   m += "</td><td style='text-align: center; white-space: pre-wrap;'>" + q.status + " / ";
                   if (q.lastUpgrade) m += q.lastUpgrade;

                   m += " / " + q.triesThis + " tries this level, " + q.triesTotal + " tries total"

                   m += "</td>";
                   m += "<td><div><div id=chQueueRemove" + ii + " class=chremove/></div></td></tr>";       

                   $("#chQueue").append(m);
               }

               for (var j=0; j < CHqueueData.list.length; j++)
               { 
                   var q = CHqueueData.list[j];
                   if (!q) continue;
                   var the_item = unsafeWindow.kocChampionItems[q.item];

                   $("#chQueueRemove"+j).attr('v1', j);  
                   $("#chQueueRemove"+j).click( function () {t.deleteQueueItem( $(this).attr('v1') );});

                   $("#chUpRow"+j).attr('v1', j);  
                   $("#chUpRow"+j).click( function () { t.moveUpRow(+($(this).attr('v1') ));});

                   $("#chDownRow"+j).attr('v1', j);  
                   $("#chDownRow"+j).click( function () { t.moveDownRow(+($(this).attr('v1') ));});

                   $("#chChangeLevel"+j).attr('v1', j);  
                   $("#chChangeLevel"+j).change( function () { t.changeLevel(+($(this).attr('v1') ), $(this).val() ) });

                   if (!the_item || !(the_item.equipmentId)) {
                       $("#chState"+j).html("<div style='text-align:center'> ??</div>");
                   } else if (q.status == "complete") {
                       $("#chState"+j).addClass('chsuccess');
                   } else if (the_item.status == CM.CHAMPION.STATUS_BROKEN_UPGRADE || the_item.status == CM.CHAMPION.STATUS_BROKEN_ENHANCE) {
                       $("#chState"+j).addClass('chbroken');
                   } else if (the_item.status == CM.CHAMPION.STATUS_REPAIRING_UPGRADE || the_item.status == CM.CHAMPION.STATUS_REPAIRING_ENHANCE) {
                       $("#chState"+j).addClass('chhammer');
                   } else {
                       $("#chState"+j).html("<div class='chgbtn'/>");
                       $("#chState"+j).css('text-align', 'center');
                   }
               }


               /*
                                                    if (CHpresetData.noTooltips != true) 
                                                    {
                                                        $(".chUpdaterItemName").mouseover( function (td) {

                                                            td.stopPropagation();
                                                            var theId = $(this).attr("id").split("chUpdaterItem")[1];

                                                            if (!theId || theId == 0) {
                                                                return;
                                                            }

                                                            var zz;
                                                            if (zz = unsafeWindow.kocChampionItems[theId])
                                                            {
                                                                unsafeWindow.cm.ThroneView.hoverItem(td, this, zz);
                                                                $("#kofcNewTooltipDiv").css('position', 'absolute');
                                                                $("#kofcNewTooltipDiv").css('left', ($("#ch_dialog").position().left+200) + 'px');
                                                                $("#kofcNewTooltipDiv").css('top',  td.pageY-330 + 'px');
                                                            }
                                                            else 
                                                            {
                                                                $("#kofcNewTooltipDiv").remove();
                                                                setTimeout( function () {Tabs.updater.show();}, 200);    
                                                            }
                                                        });

                                                    }
                */

           },

           deleteQueueItem : function (i) {
               // delete an item from the queue
               var t = Tabs.champUpgrader;
               CHqueueData.list.splice(i,1);
               if (i > CHqueueData.index) CHqueueData.index--;
               CHsaveQueueData();
               t.buildQueueDisplay();  
           },

           changeLevel : function (index, level) {
               var t = Tabs.champUpgrader;

               var q = CHqueueData.list[index];
               if (!q) return;

               q.level = level;
               CHsaveQueueData();
               t.buildQueueDisplay();
           },

           moveUpRow : function (i) {
               if (i<1) return;
               var t = Tabs.champUpgrader;
               var q = CHqueueData.list.splice(i,1);
               CHqueueData.list.splice(i-1,0,q[0]);

               if (i == CHqueueData.index)
                   CHqueueData.index--;
               else if (CHqueueData.index == i-1)
                   CHqueueData.index++;

               CHsaveQueueData();
               t.buildQueueDisplay();
           },

           moveDownRow : function (index) {
               if (index > (CHqueueData.list.length - 2)) return;

               var t = Tabs.champUpgrader;
               var q = CHqueueData.list.splice(index,1);
               CHqueueData.list.splice(index+1,0,q[0]);

               if (i == CHqueueData.index)
                   CHqueueData.index++;
               else if (CHqueueData.index == i+1)
                   CHqueueData.index--;

               CHsaveQueueData();
               t.buildQueueDisplay();

           },

           updateCHTab : function() {
               $("#chexecupgrade").html("Upgrade " + (CHupgradeData.active ? "ON" : "OFF"));
           },

           togglePower: function(obj){
               var t = Tabs.champUpgrader;

               var btn = document.getElementById('chUpgraderPower');
               if (CHupgradeData.active == true) {
                   CHupgradeData.active = false;
                   btn.value = "Upgrade = OFF";
                   t.setStatus("Powered off");

               } else {
                   CHupgradeData.active = true;
                   btn.value = "Upgrade = ON";
                   t.setStatus("Power on");
               }

               if (CHupgradeData.active == false)
               {

               }

               t.updateCHTab();
               CHsaveUpgradeData();

           },

           toggleSelect: function(obj){
               var btn = document.getElementById('chUpgraderSelect');
               var t = Tabs.champUpgrader;
               if (CHupgradeData.enhanceAction == true) {
                   CHupgradeData.enhanceAction = false;
                   btn.value = "Action = Upgrade";
               } else {
                   CHupgradeData.enhanceAction = true;
                   btn.value = "Action = Enhance";
               }
               t.updateTRSelect();
               CHsaveUpgradeData();
           },

           setStatus : function (s)
           {
               document.getElementById('chUpgradeStatus').innerHTML = "<div>" + s + "</div>";
           },

           setResult : function (s)
           {
               document.getElementById('chLastResult').innerHTML = "<div>" + s + "</div>";
           },

//           setStones : function(n)
//           {
//               var st = addCommas(n) + " stones";
//               document.getElementById('chStoneRemain').innerHTML = "<div>" + st + "</div>";
//           },

           pickCity : function () {
               var t = Tabs.champUpgrader;
               //var cid = GeneralOptions.usedCityNum;
               if ( parseInt(Seed.resources["city" + Seed.cities[GeneralOptions.usedCityNum][0]]["rec5"][0]) >= CHupgradeData.minStones) return GeneralOptions.usedCityNum;

               if (GeneralOptions.useAnyCity)
               {
                   for (i= 0; i < Seed.cities.length; i++)
                   {
                       if ( parseInt(Seed.resources["city" + Seed.cities[i][0]]["rec5"][0]) >= GeneralOptions.minStones) return i;
                   }
               }
               return -1;
           },


           doRepair : function( rItem) {
               var t = Tabs.champUpgrader;
               var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);

               if (CHupgradeData.active == false || rItem == 0 || unsafeWindow.kocChampionItems[rItem] == null)
               {
                   logit("repair is turned off");
                   return;
               }
               var theItem = unsafeWindow.kocChampionItems[rItem];

               params.action = "6";
               params.eid = rItem;
               params.cityId = unsafeWindow.currentcityid;
               params.gems = 0;

               new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/ceEquipmentManagerAjax.php" + unsafeWindow.g_ajaxsuffix, {
                   method: "post",
                   parameters: params,
                   loading: true,
                   onSuccess: function (transport) {
                       //logit("repair success");
                       //logit("tport: " + inspect(transport,3,1));
                       var rslt = eval("(" + transport.responseText + ")");

                       //logit("rslt: " + inspect(rslt,3,1));
                       if(rslt.ok){
                           //logit("ok");
                           var item = unsafeWindow.kocChampionItems[rslt.equipmentId];
                           ActionLog('Starting repair for Champion item '+ item.name);
                           if (!Seed.queue_champion) Seed.queue_champion = {};
                           Seed.queue_champion.itemId= rslt.equipmentId;
                           Seed.queue_champion.start= parseInt(rslt.start);
                           Seed.queue_champion.end= parseInt(rslt.eta);
                           t.repairId = parseInt(rslt.equipmentId);
                           t.repairEnd = rslt.eta;
                           var n = new Date(t.repairEnd *1000);
                           t.setStatus("Repair begun ... Repair will be complete at " + n.toLocaleTimeString() + ". Item: "  + item.name);
                           var x = rslt.eta - unixTime();
                           //unsafeWindow.cm.ThroneView.renderInventory(unsafeWindow.kocChampionItems);
                           t.clearTimerH = setTimeout(t.clearRepair, (x+1)*1000);
                           if (item.status == CM.CHAMPION.STATUS_BROKEN_ENHANCE)
                               item.status = CM.CHAMPION.STATUS_REPAIRING_ENHANCE;
                           else 
                               item.status = CM.CHAMPION.STATUS_REPAIRING_UPGRADE;
                           Tabs.champUpgrader.buildQueueDisplay();
                           // uW.cm.ThronePanelView.clickSpeedUp(item);
                       }
                       else
                       {
                           logit ("Repair failed");
                           logit("result:" + inspect(rslt,3,1));
                           
                           // regrab the end times in case this is caused by a manual repair
                           if (Seed.queue_champion && Seed.queue_champion.end && Seed.queue_champion.itemId)
                           {
                               t.repairEnd = Seed.queue_champion.end;
                               t.repairId = Seed.queue_champion.itemId;
                           }
                           
                           if (feedback.index("There is one equipment in repairing queue") > 0)
                           {
                              // item is still be repaired.    
                              return;
                           }
                               
                           
                           if (rslt.feedback)
                           {
                               t.setStatus(rslt.feedback);
                               
                               unsafeWindow.kocChampionItems[rItem].status = CM.CHAMPION.STATUS_INACTIVE;
                               t.clearRepair();
                           }


                           
                       }
                       return;
                   },
                   onFailure: function (ttt) {
                       logit("repair error");
                       // this usually means a repair is in progress (such as a
                       // manual
                       // repair). Grab the seed data (if possible)
                       if (Seed.queue_champion && Seed.queue_champion.end)
                       {
                           t.repairEnd = Seed.queue_champion.end;
                           t.repairId = Seed.queue_champion.itemId;
                       }
                       logit("ttt: " + inspect(ttt,3,1));
                       return;
                   }
               });
               return;
           },

           clearRepair : function () {
               //logit("clear repair");
               var t = Tabs.champUpgrader;
               var timeUntilDone = 0;

               if (t.repairEnd == 0)
               {
                   return timeUntilDone;
               }
               timeUntilDone = t.repairEnd - unixTime();

               if (timeUntilDone <= 0)
               {
                   if (t.repairId != 0 && unsafeWindow.kocChampionItems[t.repairId]  != null)
                   {
                       if (unsafeWindow.kocChampionItems[t.repairId].status != CM.CHAMPION.STATUS_INACTIVE 
                               || unsafeWindow.kocChampionItems[t.repairId].status != CM.CHAMPION.STATUS_ACTIVE)
                       {
                           t.setStatus("Repair time complete.");
                       }
                       unsafeWindow.kocChampionItems[t.repairId].status = CM.CHAMPION.STATUS_INACTIVE;
                       t.repairId = 0;
                       Tabs.champUpgrader.repaint();
                   }

               }
               //unsafeWindow.cm.ThroneView.renderInventory(unsafeWindow.kocChampionItems);
               return timeUntilDone;
           },

           show: function(){
               Tabs.champUpgrader.repaint();
           },

           hide: function(){
           }
};

/** ***************** Throne upgrade ********************* */

Tabs.throneUpgrader = {
        tabOrder: 100,
        tabLabel: 'Upgrade',
        tabDisabled : false,
        myDiv : null,
        repairId : 0,
        repairEnd : 0,
        timerH : null,
        clearTimerH : null,
        qualities :  [ uW.g_js_strings ? uW.g_js_strings.throneRoom.simple: "Simple", 
                uW.g_js_strings ? uW.g_js_strings.throneRoom.common : "Common",
                uW.g_js_strings ? uW.g_js_strings.throneRoom.uncommon : "Uncommon",
                uW.g_js_strings ? uW.g_js_strings.throneRoom.rare : "Rare", 
                uW.g_js_strings ?uW.g_js_strings.throneRoom.epic : "Epic",
                uW.g_js_strings ?uW.g_js_strings.throneRoom.wondrous : "Wondrous",
                uW.g_js_strings ?uW.g_js_strings.throneRoom.miraculous : "Miraculous"],
        upgradePath : {
            0: {maxLev: 2, nextQual: 2 },
            1: {maxLev: 2, nextQual: 2 },
            2: {maxLev: 3, nextQual: 4 },
            3: {maxLev: 3, nextQual: 4 },
            4: {maxLev: 4, nextQual: 5 },
            5: {maxLev: 5, nextQual: 6 }
        },

        repaint : function() {
            var t = Tabs.throneUpgrader;
            t.init(t.myDiv);
        },

        init : function (div){
            var t = Tabs.throneUpgrader;
            t.myDiv = div;

            if (unsafeWindow.g_js_strings)
            {
                t.qualities = [ unsafeWindow.g_js_strings.throneRoom.simple, 
                                unsafeWindow.g_js_strings.throneRoom.common,
                                unsafeWindow.g_js_strings.throneRoom.uncommon,
                                unsafeWindow.g_js_strings.throneRoom.rare, 
                                unsafeWindow.g_js_strings.throneRoom.epic,
                                unsafeWindow.g_js_strings.throneRoom.wondrous,
                                unsafeWindow.g_js_strings.throneRoom.miraculous];
            }

            // header stuff
            var m = '<Div id=trfield><DIV id=trUpgrader class=trStat>AUTOMATED THRONE ROOM UPGRADER</div><TABLE id=trupgrader width=100% height=0% class=trTab>';
            m+= '</table></div>';

            // 
            m += '<TABLE width=100% id=trupdtable class=trTabPad>';

            m += '<tr>';
            if (TRupgradeData.active == false) {
                m += '<TD width=25%><div><INPUT id=trUpgraderPower type=button value="Upgrade = OFF"/></div></td>';
            } else {
                m += '<TD width=25%><div><INPUT id=trUpgraderPower type=button value="Upgrader = ON"/></div></td>';
            }

            m += '<td width=25%><INPUT id=trOneItem type=checkbox '+ (TRqueueData.oneItem ? ' CHECKED':'') +'/>  Upgrade 1 at a time</td>';
            m += '<td width=25%><INPUT id=trRepairAll type=checkbox '+ (TRupgradeData.repairAll?' CHECKED':'') +'/>  Repair all TR items</td>'; 
            m += '<td width=25%/></tr>';

            m += '<tr><td colspan=4><hr></td></tr>';
            m += '<tr align="center"><td colspan=4><div id=trUpgradeStatus class=indent25> <br> </div></td></tr>';
            m += '<tr align="center"><td colspan=4><div id=trLastResult class=indent25> <br> </div></td></tr>';
            m += '<tr><td colspan=4><hr></td></tr></table>';

            m += '<TABLE width=100% id=trupdtable2 class=trTabPad>';
            m += '<tr><td><div style="max-width:90%;">Item: <select id="trUpgradeList" style="width: 80%;">';
            m += '<option value="0">--Items--</option>';
            for (k in unsafeWindow.kocThroneItems) {
                var throne_item = unsafeWindow.kocThroneItems[k];
                m += '<option value="'+k+'">'+throne_item.name+' [ ' + throne_item.id +' ] </option>';
            }
            m += '</select></div></td>';

            m += '<td><div id=trActionDiv>Action: <select id="trAction">';
            m += '<option value="upgrade">Upgrade</option>';
            m += '<option value="enhance">Enhance</option>';
            m += '<option value="both">Both</option>';
            m += '</select></div></td>';
            m += '<td><div id=trMaxDiv></div></td>';

            m += "<td><div><INPUT id=trQueueAdd type=button value='Add'/></div></td></tr>";
            m += '<tr><td colspan=4><hr/></td></tr>';


            m += '<tr><td colspan=4>';

            m += '<table cellspacing=5 cellpadding=0 width=100%><tr>';
            m += '<td><input type=checkbox ' + (TRupgradeData.useLPS ? "CHECKED" : "") + ' id=trUseLPS>Lesser Protection Stones</td>';
            m += '<td><input type=checkbox ' + (TRupgradeData.usePS ? "CHECKED" : "") + ' id=trUsePS>Protection Stones</td>';
            m += '<td/>';
            m += '</tr><tr>';
            m += '<td><input type=checkbox ' + (TRupgradeData.useLORB ? "CHECKED" : "") + ' id=trUseLORB>Lesser Mystic Orb</td>';
            m += '<td><input type=checkbox ' + (TRupgradeData.useORB ? "CHECKED" : "") + ' id=trUseORB>Mystic Orb</td>';
            m += '<td>Quality <select id="trUseQuality">';
            m += '<option value="1">Common</option>';
            m += '<option value="2">Uncommon</option>';
            m += '<option value="3">Rare</option>';
            m += '<option value="4">Epic</option>';
            m += '<option value="5">Wondrous</option>';
            m += '</select> and higher</td>';
            m += '</tr><tr>';
            m += '<td><input type=checkbox ' + (TRupgradeData.useLLT ? "CHECKED" : "") + ' id=trUseLLT>Lesser Tokens</td>';
            m += '<td><input type=checkbox ' + (TRupgradeData.useLT ? "CHECKED" : "") + ' id=trUseLT>Lucky Tokens</td>';
            m += '<td>Level <select id="trUseLevel">';
            for (i =1; i <= OrganizerMaxTRLevel; i++) {
                m  += '<option value="' + i + '"> +' + i + '</option>';
            }
            m += '</select> and higher</td>';
            m += '</tr><tr>';
            m += '<td colspan=3><b><i>Please note that all items checked will be used in order of their value from lowest to highest. Also protection stones apply to both upgrading and enhancing.</i></b></td>';
            m += '</tr></table>';

            m += '</td></tr>';
            m += '<tr><td colspan=4><hr/></td></tr>';
            m += '<tr><td colspan=4><div id=trQScroll style="position: static; width: 100%; height: ' + OrganizerWindowHeight + '; overflow-x: visible; overflow-y: auto;"><div id=trQDiv /></div></td></tr>';


            m += '<tr align=center><div><td><input style="float: left;" id=trClearQ type=button value="Clear Queue"/></div></td><td colspan=1></td><td colspan=2><a id=trpplink><img id=trpp /></a></td></tr>';
            m += '</table>';

            m+='</div>';
            t.myDiv.innerHTML = m;

            $('#trClearQ').click( function() {
                TRqueueData.list =[];
                TRsaveQueueData();
                t.buildQueueDisplay();
            });

/* remove sizing restriction therefore allowing 100%

            $("#trQScroll").resizable({
                minWidth: 710,
                maxWidth: 1200,
                minHeight: 200,
                maxHeight: 800,
                stop: function(event, ui) {
                    TRupgradeData.upgradeH =  ui.size.height + 'px';
                    TRupgradeData.upgradeW =  ui.size.width  + 'px';
                    TRsaveUpgradeData();
                }
            });

            $("#trQScroll").css('height', TRupgradeData.upgradeH).css('width', TRupgradeData.upgradeW);

*/

            document.getElementById('trUseQuality').value = TRupgradeData.useQuality;
            document.getElementById('trUseLevel').value = TRupgradeData.useLevel;

            $('#trUseQuality').change( function () {
                TRupgradeData.useQuality = document.getElementById('trUseQuality').value;
                TRsaveUpgradeData();
            });

            $('#trUseLevel').change( function () {
                TRupgradeData.useLevel = document.getElementById('trUseLevel').value;
                TRsaveUpgradeData();
            });

            document.getElementById('trUpgraderPower').addEventListener('click', function(){t.togglePower(this);} , false);

            document.getElementById('trRepairAll').addEventListener('change', function(){
                TRupgradeData.repairAll = document.getElementById('trRepairAll').checked;
                TRsaveUpgradeData();
            }, false);

            document.getElementById('OgranizerUseAnyCity').addEventListener('change', function(){
                GeneralOptions.useAnyCity = document.getElementById('OgranizerUseAnyCity').checked;
                saveGeneralOptions();
            }, false);

            // wait for the current repair to finish before starting
            t.setStatus("Loading ....");

            //$(div).append(m);
            $("#trQDiv").html('<div><table id="trQueue" class="trTabLined" /></div>');


            $("#trUseLORB").change( function () {
                TRupgradeData.useLORB = document.getElementById('trUseLORB').checked;
                TRsaveUpgradeData();
            });

            $("#trUseORB").change( function () {
                TRupgradeData.useORB = document.getElementById('trUseORB').checked;
                TRsaveUpgradeData();
            });

            $("#trUseLPS").change( function () {
                TRupgradeData.useLPS = document.getElementById('trUseLPS').checked;
                TRsaveUpgradeData();
            });

            $("#trUsePS").change( function () {
                TRupgradeData.usePS = document.getElementById('trUsePS').checked;
                TRsaveUpgradeData();
            });

            $("#trUseLT").change( function () {
                TRupgradeData.useLT = document.getElementById('trUseLT').checked;
                TRsaveUpgradeData();
            });

            $("#trUseLLT").change( function () {
                TRupgradeData.useLLT = document.getElementById('trUseLLT').checked;
                TRsaveUpgradeData();
            });

            $("#trQueueAdd").click( function () { t.addQueue();});
            $("#trOneItem").change( function () { 
                TRqueueData.oneItem = document.getElementById('trOneItem').checked;
                TRsaveQueueData();
            });


            var d = 2 + Math.random() * 8;
            if (Seed.queue_throne != null && Seed.queue_throne.end != null)
            {
                var repairTimeLeft = Seed.queue_throne.end- unixTime();
                t.repairEnd = Seed.queue_throne.end;
                t.repairId = Seed.queue_throne.itemId;
                var n = new Date(t.repairEnd *1000);

                t.setStatus("Waiting until " + n.toLocaleTimeString() + " for repair to complete.  Item: " + unsafeWindow.kocThroneItems[t.repairId].name);
                setTimeout(t.clearRepair, (repairTimeLeft+1)*1000);
                if (repairTimeLeft >0) d += repairTimeLeft;
            }

            t.buildLevelWidget();
            t.buildQueueDisplay();
            $("#trAction").change( function() {t.buildLevelWidget();});


            if (t.timerH == null)
                t.timerH = setTimeout(t.doAction, d*1000);

        },

        addUpgradeItem : function(id) {
            var t = Tabs.throneUpgrader;
            var qItem = new QueueItem();
            qItem.item   = id;
            qItem.action = "upgrade";
            qItem.level  = OrganizerMaxTRLevel;
            TRqueueData.list.push(qItem);
            TRsaveQueueData();
            $("div#throneInventoryItem" + id).addClass('blueBorder');
            $("div#trCardItem" + id).find("div.trCard").addClass("blueBorder2");
            t.buildQueueDisplay();
        },

        addEnhanceItem : function(id) {
            var t = Tabs.throneUpgrader;
            var qItem = new QueueItem();
            qItem.item   = id;
            qItem.action = "enhance";
            qItem.level  = 6;
            TRqueueData.list.push(qItem);
            TRsaveQueueData();
            $("div#throneInventoryItem" + id).addClass('yellowBorder');
            $("div#trCardItem" + id).find("div.trCard").addClass("yellowBorder2");
            t.buildQueueDisplay();
        },

        addBothItem : function (id) {
            var t = Tabs.throneUpgrader;

            var throne_item = unsafeWindow.kocThroneItems[id];
            if (!throne_item)
            {
                logit("Unable to find throne item.");
                return;
            }

            var qual = +throne_item.quality;
            var lev  = +throne_item.level;

            if (qual >= 6) {
                logit("Item already at Miraculous");
                return;
            }

            var maxLev = null;
            var nextQual = null;
            var qItem = null;

            while (qual < 6) {
                maxLev = t.upgradePath[qual].maxLev;
                nextQual = t.upgradePath[qual].nextQual;

                if (lev < maxLev) {
                    qItem = new QueueItem();
                    qItem.item   = id;
                    qItem.action = "upgrade";
                    qItem.level  = maxLev;
                    TRqueueData.list.push(qItem);
                    $("div#throneInventoryItem" + id).addClass('blueBorder');
                    $("div#trCardItem" + id).find("div.trCard").addClass("blueBorder2");
                }

                qItem = new QueueItem();
                qItem.item   = id;
                qItem.action = "enhance";
                qItem.level  = nextQual;
                TRqueueData.list.push(qItem);
                $("div#throneInventoryItem" + id).addClass('yellowBorder');
                $("div#trCardItem" + id).find("div.trCard").addClass("yellowBorder2");
                lev = maxLev;
                qual = nextQual;
            }

            TRsaveQueueData();
            t.buildQueueDisplay();
        },

        doAction :function ()
        {
            var t = Tabs.throneUpgrader;
            var retryTime = GeneralOptions.retryInterval;

            try {
                // check if repair is done
                var ti = t.clearRepair();
                if ( ti <= 0)
                {  
                    // repair is done
                    if (TRqueueData.oneItem || (TRqueueData.doingRepairs == true))
                    {
                        if (TRupgradeData.repairAll == true)
                        {
                            var lastBroken = 0;

                            // repair everything
                            for (k in unsafeWindow.kocThroneItems)
                            {
                                var throne_item = unsafeWindow.kocThroneItems[k];
                                if (!throne_item) continue;
                                if (throne_item.isBroken)
                                {
                                    lastBroken = throne_item.id;
                                }
                            }

                            // repair from the botton up.  This forces the items broken in the +1 upgrades to be fixed first so the salvager can continue
                            if (lastBroken != 0)
                            {
                                t.doRepair(lastBroken);
                                clearTimeout(t.timerH);
                                t.timerH = setTimeout(t.doAction, retryTime*1000);
                                return;
                            }
                        } else {
                            // repair first broken item in queue
                            for (k in TRqueueData.list)
                            {
                                var q = TRqueueData.list[k];
                                if (!q) continue;
                                var throne_item = unsafeWindow.kocThroneItems[q.item];
                                if ((throne_item == null) || (TRqueueData.list[k].status == "complete"))
                                    continue;

                                if ( throne_item.isBroken )
                                {
                                    t.doRepair(throne_item.id);
                                    clearTimeout(t.timerH);
                                    t.timerH = setTimeout(t.doAction, retryTime*1000);
                                    return;
                                }  else if (TRqueueData.oneItem) {
                                    break;
                                }
                            }
                        }
                    }

                    // all repairs complete
                    TRqueueData.doingRepairs = false;
                    // set the index
                    t.selectNext();
                    TRsaveQueueData();

                    // if we reach the end of the queue, start repair cycle
                    if (TRqueueData.index <0) {
                        t.setStatus("Reached end of queue.")
                        TRqueueData.doingRepairs = true;
                        TRsaveQueueData();
                        clearTimeout(Tabs.throneUpgrader.timerH);
                        t.timerH = setTimeout(t.doAction, retryTime*1000);
                        return;
                    }

                    // upgrade/enhance next item
                    var qItem = TRqueueData.list[TRqueueData.index];

                    if (qItem) {
                        //qItem.triesTotal++;
                        //qItem.triesThis++;

                        if (qItem.action == "enhance")
                            t.doEnhance(qItem.item);
                        else 
                            t.doUpgrade(+qItem.item, false);
                    }
                } else {
                    // come back after repair is complete
                    retryTime = ti + 5;
                    var n = new Date(t.repairEnd *1000);
                    t.setStatus("Waiting until " + n.toLocaleTimeString() + " for repair to complete.  Item: " + unsafeWindow.kocThroneItems[t.repairId].name);
                }
                unsafeWindow.cm.ThroneView.renderInventory(unsafeWindow.kocThroneItems);
            } catch(e) {
                logit("do action exception");
                logit ("exception: " + inspect(e,3,1));
            }
            // recycle
            clearTimeout(Tabs.throneUpgrader.timerH);
            t.timerH = setTimeout(t.doAction, retryTime*1000);
        },

        selectNext : function () {

            if (TRqueueData.index >= TRqueueData.list.length) TRqueueData.index = 0;
            if (TRqueueData.index < 0) TRqueueData.index = 0;

            // for single item mode, always start from the top
            if (TRqueueData.oneItem) TRqueueData.index = 0; 

            var l = TRqueueData.list.length;
            for (i=TRqueueData.index; i < l; i++ ) {
                var item = TRqueueData.list[i];
                if (!item) continue;
                //var id = item.item;
                var throne_item = unsafeWindow.kocThroneItems[item.item];
                if ( (TRqueueData.list[i].status != "complete") 
                        && ( throne_item != null) 
                        && (!throne_item.isBroken) )
                {
                    if ( ((item.action == "enhance") && (item.level <= throne_item.quality)) ||
                            ((item.action == "upgrade") && (item.level <= throne_item.level)) ) {
                        item.status = "complete";
                    }  else {
                        TRqueueData.index = i;
                        return;
                    }
                }
            }

            // if we get here, the queue is complete
            TRqueueData.index = -1;
        },

        doEnhance : function(eItem) {
            var t = Tabs.throneUpgrader;
            try {
                if (TRupgradeData.active == false ||  eItem ==0)
                {
                    t.setStatus("Powered off");
                    return;
                }
                var throne_item = unsafeWindow.kocThroneItems[eItem];

                if (!throne_item) return;

                if (throne_item.isBroken)
                {
                    // repair and then try again later
                    t.doRepair(eItem);
                    return;
                }

                var num_city = t.pickCity();
                if ( num_city < 0)
                {
                    t.setStatus("Not enough aetherstones to enhance.  Minimum of " + GeneralOptions.minStones + " needed.  Waiting for more ...");
                    return;
                }

                var t_city = unsafeWindow.currentcityid;
                unsafeWindow.currentcityid = Seed.cities[num_city][0];
                var w = unsafeWindow.cm.ThronePanelController.calcCost("enhance", throne_item, null, "stones");
                unsafeWindow.currentcityid = t_city;

                if ( (w.gems.use > 0) || (w.stones.total > parseInt(Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0]) ))
                {
                    t.setStatus("Not enough aetherstones to enhance.");
                    return; 
                }

                var qI = TRqueueData.list[TRqueueData.index];
                if (qI)
                {

                    qI.triesTotal++;
                    qI.triesThis++;
                }

                var buffItemId = 0;
            
                if ( TRupgradeData.active && TRqueueData.index != -1 && TRupgradeData.useQuality <= throne_item.level ) {

                    if (TRupgradeData.useORB) {
				        if (Seed.items['i20004'] > 0) buffItemId = 20004;
			        }

                    if (TRupgradeData.useLORB) {
		                if (Seed.items['i20003'] > 0) buffItemId = 20003;
                    }

                    if (TRupgradeData.usePS) {
                        if (Seed.items['i20002'] > 0) buffItemId = 20002
                    }

                    if (TRupgradeData.useLPS) {
                        if (Seed.items['i20001'] > 0) buffItemId = 20001
                    }

			        if (buffItemId) unsafeWindow.cm.InventoryView.removeItemFromInventory(buffItemId);

                }

                var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
                params.ctrl = 'throneRoom\\ThroneRoomServiceAjax';
                params.action = 'upgradeQuality';
                params.throneRoomItemId = eItem;

                params.payment = "aetherstone";
                params.buffItemId = buffItemId;
                params.cityId = Seed.cities[num_city][0];

                //logit("Sending enhance request");
                t.setStatus("Sending enhance request");
                new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch53.php" + unsafeWindow.g_ajaxsuffix, {
                    method: "post",
                    parameters: params,
                    loading: true,
                    onSuccess: function (transport) {
                        try {

                            var rslt = eval("(" + transport.responseText + ")");
				            if (rslt.updateSeed) unsafeWindow.update_seed(rslt.updateSeed);
                            if(rslt.ok){
                                Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0] = Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0] - rslt.aetherstones;
                                if (rslt.gems > 0)
                                {
                                    ActionLog('Upgrader accidentally spent gems!  Upgrader turned off');
                                    t.setStatus("Error ... shutting down");
                                    TRupgradeData.active = false;
                                    TRsaveUpgradeData();
                                }

                                throne_item.level = rslt.item.level;
                                throne_item.quality = rslt.item.quality
                                throne_item.status = rslt.item.status;

                                if (rslt.success)
                                {
                                    throne_item.name = throne_item.createName();
                                    //Tabs.throneUpgrader.repaint();
                                    t.setResult("Enhance successful.  "  + addCommas(rslt.aetherstones) + " aetherstones used.");
                                    t.setStatus("Attempting next action");
                                    unsafeWindow.cm.sounds.play("tr_success_build");
                                    // update the cost line
                                    var qItem = TRqueueData.list[TRqueueData.index];
                                    if (qItem)
                                    {
                                        var now = new Date();
                                        qItem.lastUpgrade = "Enhanced to " + t.qualities[throne_item.quality] + " " + now.toDateString().substring(3,10) + " " + now.toTimeString().substring(0,8)  + " in " + qItem.triesThis + " attempts";
                                        if (!qItem.upgrades) qItem.upgrades = [];
                                        qItem.upgrades.push(qItem.lastUpgrade);

                                        var msg = 'Enhanced '+unsafeWindow.kocThroneItems[eItem].name + ' [ ' + eItem + '] to quality ' + rslt.item.quality+ " in " + qItem.triesThis + " attempts. " + qItem.triesTotal + " total attempts for this item.";
                                        SuccessLog(msg);
                                        if (GeneralOptions.whisperToMe) sendChat("/"+ Seed.player.name +' ' + msg);

                                        if (qItem.level <= throne_item.quality) {
                                            qItem.status = "complete";
                                            TRupgradeData.newUpgradeState = 2;
                                        }
                                        else {
                                            var now = new Date();
                                            qItem.status = "Partially enhanced";
                                            qItem.triesLast = qItem.triesThis;
                                            qItem.triesThis = 0;
                                            if (TRupgradeData.newUpgradeState !=2 ) TRupgradeData.newUpgradeState =1;
                                        }
                                        TRsaveUpgradeData();
                                        setUpgradeColor();
                                    }
                                }
                                else
                                {
                                    ActionLog('Enhance failed Throne Room item '+unsafeWindow.kocThroneItems[eItem].name);
						            if (!params.buffItemId) {
							            throne_item.isBroken = true;
							            throne_item.brokenType = "quality";
							            throne_item.name = throne_item.createName();
						            }
                                    t.setResult("Enhance failed.  "  + addCommas(rslt.aetherstones) + " aetherstones used");
                                    var qItem = TRqueueData.list[TRqueueData.index];
                                    if (qItem)  if (qItem.status == "not started") qItem.status = "started";
                                }
                                unsafeWindow.cm.ThroneView.renderInventory(unsafeWindow.kocThroneItems);
                                TRsaveQueueData();
                                t.buildQueueDisplay();
                                clearTimeout(t.timerH);
                                t.timerH = setTimeout(t.doAction, 10*1000);
                            }
                            else
                            {
                                logit("enhance error");
                                logit("Enhance result:" + inspect (rslt, 3, 1));
                                t.setStatus("Unable to enhance at this time ... waiting for next cycle");

                            }
                        } catch (e) {

                        }
                        return;
                    },
                    onFailure: function (rst) {
                        logit("Enhance request error.  Waiting for next cycle.");
                        t.setStatus("Unable to send enhance request.  Waiting for next cycle");
                        logit("result: " + inspect(rst,3,1));

                        return;
                    }
                });
            } catch (e) {

            }
            return;
        },

        doUpgrade : function(uItem, bypass) {
            var t = Tabs.throneUpgrader;
            var throne_item = unsafeWindow.kocThroneItems[uItem];
            if ( uItem ==0 || throne_item == null)
            {
                t.setStatus("Item not found.");
                return;
            }

            if ( (TRupgradeData.active == false) && (bypass !=true))
            {
                t.setStatus("Powered off.");
                return;
            }
            if ( TRupgradeData.active == false ) return;

            if (bypass == true && Tabs.throneSalvage.deleting != true)
            {
                // delete cycle has been canceled.  Don't upgrade this item
                return;   
            }

            if (throne_item.isBroken)
            {
                // repair and then try again later
                t.doRepair(uItem);
                return;
            }

            var num_city = t.pickCity();
            if ( num_city < 0)
            {
                t.setStatus("Not enough aetherstones to upgrade.  Minimum of " + GeneralOptions.minStones + " needed.  Waiting for more ...");
                return;
            }

            var t_city = unsafeWindow.currentcityid;
            unsafeWindow.currentcityid = Seed.cities[num_city][0];
            var w = unsafeWindow.cm.ThronePanelController.calcCost("upgrade", throne_item, null, "stones");
            unsafeWindow.currentcityid = t_city;

            if ( (w.gems.use > 0) || (w.stones.total > parseInt(Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0]) ))
            {
                t.setStatus("Not enough aetherstones to upgrade.");
                return; 
            }

            if (bypass != true)
            {
                var qI = TRqueueData.list[TRqueueData.index];
                if (qI)
                {
                    qI.triesTotal++;
                    qI.triesThis++;
                }

                t.setStatus("Sending upgrade request ...");
            }

            var buffItemId = 0;
            
            if ( TRupgradeData.active && TRqueueData.index != -1 && TRupgradeData.useLevel <= throne_item.level ) {

                if (TRupgradeData.useLT) {
				    if (Seed.items['i20006'] > 0) buffItemId = 20006;
			    }

                if (TRupgradeData.useLLT) {
		            if (Seed.items['i20005'] > 0) buffItemId = 20005;
                }

                if (TRupgradeData.usePS) {
                    if (Seed.items['i20002'] > 0) buffItemId = 20002
                }

                if (TRupgradeData.useLPS) {
                    if (Seed.items['i20001'] > 0) buffItemId = 20001
                }

			    if (buffItemId) unsafeWindow.cm.InventoryView.removeItemFromInventory(buffItemId);

            }

            var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
            params.ctrl = 'throneRoom\\ThroneRoomServiceAjax';
            params.action = 'upgradeLevel';
            params.throneRoomItemId = uItem;
            params.buffItemId = buffItemId;
            params.payment = "aetherstone";
            params.cityId = Seed.cities[num_city][0];


            new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch53.php" + unsafeWindow.g_ajaxsuffix, {
                method: "post",
                parameters: params,
                loading: true,
                onSuccess: function (transport) {
                    try {

                        //logit("transport: " + inspect(transport,3,1));
                        var rslt = eval("(" + transport.responseText + ")");
                        if(rslt.ok){

					        if (rslt.updateSeed) unsafeWindow.update_seed(rslt.updateSeed);

                            Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0] = Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0] - rslt.aetherstones;

                            if (rslt.gems > 0)
                            {
                                t.setStatus("Error .... Shutting down.");
                                ActionLog('Upgrader accidentally spent gems!  Upgrader turned off');
                                TRupgradeData.active = false;
                                TRsaveUpgradeData();
                            }

                            if (rslt.success)
                            {
                                throne_item.level = rslt.item.level;
                                throne_item.quality = rslt.item.quality;
                                throne_item.name = throne_item.createName();

                                if (bypass !=true)
                                {
                                    //Tabs.throneUpgrader.repaint();
                                    t.setResult("Upgrade successful.  "  + addCommas(rslt.aetherstones) + " aetherstones used.");
                                    t.setStatus("Attempting next upgrade");
                                    unsafeWindow.cm.sounds.play("tr_success_build");

                                    var qItem = TRqueueData.list[TRqueueData.index];
                                    if (qItem) {
                                        var now = new Date();
                                        qItem.lastUpgrade = "Upgraded to +" + throne_item.level + " " + now.toDateString().substring(3,10) + " "+ now.toTimeString().substring(0,8) + " in " + qItem.triesThis + " attempts";

                                        if (!qItem.upgrades) qItem.upgrades = [];
                                        qItem.upgrades.push (qItem.lastUpgrade);

                                        var msg = 'Upgraded '+unsafeWindow.kocThroneItems[uItem].name + ' [' + uItem + '] to level ' + rslt.item.level + " in " + qItem.triesThis + " attempts. " + qItem.triesTotal + " total attempts for this item.";
                                        if (GeneralOptions.whisperToMe) sendChat("/"+ Seed.player.name +' ' + msg);
                                        SuccessLog(msg);
                                        if (qItem.level <= throne_item.level) {
                                            qItem.status = "complete";
                                            TRupgradeData.newUpgradeState =2;
                                        }
                                        else {
                                            var now = new Date();
                                            qItem.status = "Partially upgraded";
                                            qItem.triesLast = qItem.triesThis;
                                            qItem.triesThis = 0;
                                            if (TRupgradeData.newUpgradeState !=2) TRupgradeData.newUpgradeState = 1;
                                        }
                                        TRsaveUpgradeData();
                                        setUpgradeColor();
                                    }
                                }
                            }
                            else
                            {
                                logit("upgrade failed");
                                ActionLog('Upgrade failed Throne Room item '+unsafeWindow.kocThroneItems[uItem].name);
						        if (!params.buffItemId) {
							        throne_item.isBroken = true;
							        throne_item.brokenType = "level";
							        throne_item.name = throne_item.createName();
                                    throne_item.status = rslt.item.status;
						        }
                                if (bypass !=true)
                                {
                                    t.setResult("Upgrade failed.  "  + addCommas(rslt.aetherstones) + " aetherstones used");
                                    var qItem = TRqueueData.list[TRqueueData.index];
                                    if (qItem.status == "not started") qItem.status = "started";
                                }
                            }
                            unsafeWindow.cm.ThroneView.renderInventory(unsafeWindow.kocThroneItems);
                            TRsaveQueueData();
                            t.buildQueueDisplay();
                            clearTimeout(t.timerH);
                            t.timerH = setTimeout(t.doAction, 10*1000);
                            if (rslt.heatupModifier) unsafeWindow.cm.HeatUpModel.attemptCallback(+(rslt.heatupModifier));
                            return;
                        }
                        else
                        {
                            if (bypass !=true)
                            {
                                t.setStatus("Upgrade request not accepted.  Waiting for next cycle.");
                            } else {
                                if (rslt.msg && rslt.msg.indexOf("Has status 2") > -1) 
                                {
                                    // the object is in the locked rows.  Shutdown deleting until the next pass
                                    Tabs.throneSalvage.delItems = [];
                                    Tabs.throneSalvage.deleting = false;
                                    logit("Reached locked items.  Salvaging complete.");
                                }
                            }

                            logit("Upgrade result:" + inspect (rslt, 3, 1));

                        }
                    } catch (e) {
                        //logit("upgrade exception");
                        // logit("Exception: " + inspect(e,3,1));
                    }
                    return;
                },
                onFailure: function (rrr) {
                    logit("upgrade failure");
                    logit("RRR: " + inspect(rrr,3,1));

                    t.setStatus("Unable to transmitt upgrade request.  Waiting for next cycle.");
                    unsafeWindow.cm.ThroneView.renderInventory(unsafeWindow.kocThroneItems);


                    return;
                }
            });

            return;
        },

        addQueue : function () {
            var t = Tabs.throneUpgrader;

            var action = $("#trAction").val();

            if (action == "both") {
                t.addBothItem($("#trUpgradeList").val());
                return;
            }

            var qItem = new QueueItem();
            qItem.item   = $("#trUpgradeList").val();
            qItem.action = $("#trAction").val();
            qItem.level  = $("#trMaxLevel").val();

            if (qItem.item == 0) return;

            TRqueueData.list.push(qItem);
            TRsaveQueueData();
            t.buildQueueDisplay();
        },

        buildLevelWidget : function () {
            var t = Tabs.throneUpgrader;
            var m;
            if ($("#trAction").val() == "enhance") {
                m = '<div id=trMaxDiv> Max: <select id="trMaxLevel">';
                for (i =1; i <=6; i++) {
                    m  += '<option value="' + i + '">' + t.qualities[i] + '</option>';
                }
                m += '</select></div>';
            } else if ($("#trAction").val() == "upgrade") {
                m = '<div id=trMaxDiv> Max: <select id="trMaxLevel">';
                for (i =1; i <= OrganizerMaxTRLevel; i++) {
                    m  += '<option value="' + i + '"> +' + i + '</option>';
                }
                m += '</select></div>';
            } else {
                m =  '<div id=trMaxDiv> - <select id="trMaxLevel">';
                m += '</select></div>';
            }

            $("#trMaxDiv").html(m);
            if ($("#trAction").val() == "enhance") {
                $("#trMaxLevel").val(5);
            } else if ($("#trAction").val() == "upgrade") {
                $("#trMaxLevel").val(OrganizerMaxTRLevel);
            }

        },

        buildQueueDisplay : function () {
            var t = Tabs.throneUpgrader;
            $("#trQueue").html("<table id='trQueue' width='100%' class=trTabPad/>");
            $("#trQueue").append("<tr><th width=5%>Reorder</th><th width='8%'>Status</th><th width='25%'>Item</th><th width='5%'>Action</th><th width='5%'>Max</th><th width='40%'>Status/Last Upgrade/Attempts</th><th width='10%'>Remove</th></tr>");

            for (ii in TRqueueData.list) {
                var q = TRqueueData.list[ii];
                if (!q) continue;
                var the_item = unsafeWindow.kocThroneItems[q.item];

                var name = "Unknown / Item removed";
                var id = 0;

                if (the_item) 
                {
                    name = the_item.name;
                    id   = the_item.id;
                }

                var m = "<tr><td align='center'><div class='trup' id=trUpRow" + ii +" /><div class='trdown'  id=trDownRow" + ii +" /></td>"
                +   "<td align='center'><div id=trState" + ii +"></div></td><td align='center' class=trUpdaterItemName id=trUpdaterItem" + id + " >"
                + name + " [" +id + "]" + "</td><td align='center'>" + q.action + "</td><td>";

                if (q.action =="enhance") {
                    m += '<div style="text-align: center;"><select id="trChangeLevel' + ii +'" style="width:90px; text-align: center;">';
                    for (i =1; i <=6; i++) {
                        m  += '<option value="' + i + '" '+ (q.level==i ? 'selected' : '' ) +'>' + t.qualities[i] + '</option>';
                    }
                    m += '</select></div>';
                } else {
                    m += '<div  style="text-align: center;"><select id="trChangeLevel' + ii +'" style="width:90px; text-align: center;">';
                    for (i =1; i <= OrganizerMaxTRLevel; i++) {
                        m  += '<option value="' + i + '"  '+ (q.level==i ? 'selected' : '' ) +'> +' + i + '</option>';
                    }
                    m += '</select></div>';
                }

                m += "</td><td style='text-align: center; white-space: pre-wrap;'>" + q.status + " / ";
                if (q.lastUpgrade) m += q.lastUpgrade;

                m += " / " + q.triesThis + " tries this level, " + q.triesTotal + " tries total"

                m += "</td>";
                m += "<td align='center'><div><div id=trQueueRemove" + ii + " class=trremove/></div></td></tr>";       

                $("#trQueue").append(m);
            }

            for (var j=0; j < TRqueueData.list.length; j++)
            { 
                var q = TRqueueData.list[j];
                if (!q) continue;
                var the_item = unsafeWindow.kocThroneItems[q.item];

                $("#trQueueRemove"+j).attr('v1', j);  
                $("#trQueueRemove"+j).click( function () {t.deleteQueueItem( $(this).attr('v1') );});

                $("#trUpRow"+j).attr('v1', j);  
                $("#trUpRow"+j).click( function () { t.moveUpRow(+($(this).attr('v1') ));});

                $("#trDownRow"+j).attr('v1', j);  
                $("#trDownRow"+j).click( function () { t.moveDownRow(+($(this).attr('v1') ));});

                $("#trChangeLevel"+j).attr('v1', j);  
                $("#trChangeLevel"+j).change( function () { t.changeLevel(+($(this).attr('v1') ), $(this).val() ) });

                if (!the_item || !(the_item.id)) {
                    $("#trState"+j).html("<div style='text-align:center'> ??</div>");
                } else if (q.status == "complete") {
                    $("#trState"+j).addClass('trsuccess');
                } else if (the_item.isBroken) {
                    if (the_item.id == t.repairId) {
                        $("#trState"+j).addClass('trhammer');
                    } else { 
                        $("#trState"+j).addClass('trbroken');
                    }
                } else {
                    $("#trState"+j).html("<div class='trgbtn'/>");
                    $("#trState"+j).css('text-align', 'center');
                }
            }


            if (TRpresetData.noTooltips != true) 
            {
                $(".trUpdaterItemName").mouseover( function (td) {

                    td.stopPropagation();
                    var theId = $(this).attr("id").split("trUpdaterItem")[1];

                    if (!theId || theId == 0) {
                        return;
                    }

                    var zz;
                    if (zz = unsafeWindow.kocThroneItems[theId])
                    {
                        unsafeWindow.cm.ThroneView.hoverItem(td, this, zz);
                        $("#kofcNewTooltipDiv").css('position', 'absolute');
                        $("#kofcNewTooltipDiv").css('left', ($("#org_dialog").position().left+200) + 'px');
                        $("#kofcNewTooltipDiv").css('top',  td.pageY-330 + 'px');
                    }
                    else 
                    {
                        $("#kofcNewTooltipDiv").remove();
                        setTimeout( function () {Tabs.updater.show();}, 200);    
                    }
                });

            }

        },

        deleteQueueItem : function (i) {
            // delete an item from the queue
            var t = Tabs.throneUpgrader;
            TRqueueData.list.splice(i,1);
            if (i > TRqueueData.index) TRqueueData.index--;
            TRsaveQueueData();
            t.buildQueueDisplay();  
        },

        changeLevel : function (index, level) {
            var t = Tabs.throneUpgrader;

            var q = TRqueueData.list[index];
            if (!q) return;

            q.level = level;
            TRsaveQueueData();
            t.buildQueueDisplay();
        },

        moveUpRow : function (i) {
            if (i<1) return;
            var t = Tabs.throneUpgrader;
            var q = TRqueueData.list.splice(i,1);
            TRqueueData.list.splice(i-1,0,q[0]);

            if (i == TRqueueData.index)
                TRqueueData.index--;
            else if (TRqueueData.index == i-1)
                TRqueueData.index++;

            TRsaveQueueData();
            t.buildQueueDisplay();
        },

        moveDownRow : function (index) {
            if (index > (TRqueueData.list.length - 2)) return;

            var t = Tabs.throneUpgrader;
            var q = TRqueueData.list.splice(index,1);
            TRqueueData.list.splice(index+1,0,q[0]);

            if (i == TRqueueData.index)
                TRqueueData.index++;
            else if (TRqueueData.index == i+1)
                TRqueueData.index--;

            TRsaveQueueData();
            t.buildQueueDisplay();

        },

        updateTRTab : function() {
            $("#trexecupgrade").html("Upgrade " + (TRupgradeData.active ? "ON" : "OFF"));
        },

        togglePower: function(obj){
            var t = Tabs.throneUpgrader;
                                                    
            var btn = document.getElementById('trUpgraderPower');
            if (TRupgradeData.active == true) {
                TRupgradeData.active = false;
                btn.value = "Upgrade = OFF";
                t.setStatus("Powered off");
                t.setResult("");

            } else {
                TRupgradeData.active = true;
                btn.value = "Upgrade = ON";
                t.setStatus("Power on");
                t.setResult("");
            }

            if (TRupgradeData.active == false)
            {

            }

            t.updateTRTab();
            TRsaveUpgradeData();
                                                    
        },

        toggleSelect: function(obj){
            var btn = document.getElementById('trUpgraderSelect');
            var t = Tabs.throneUpgrader;
            if (TRupgradeData.enhanceAction == true) {
                TRupgradeData.enhanceAction = false;
                btn.value = "Action = Upgrade";
            } else {
                TRupgradeData.enhanceAction = true;
                btn.value = "Action = Enhance";
            }
            t.updateTRSelect();
            TRsaveUpgradeData();
        },

        setStatus : function (s)
        {
            document.getElementById('trUpgradeStatus').innerHTML = "<div>" + s + "</div>";
        },

        setResult : function (s)
        {
            document.getElementById('trLastResult').innerHTML = "<div>" + s + "</div>";
        },

        pickCity : function () {
            var t = Tabs.throneUpgrader;
            //var cid = GeneralOptions.usedCityNum;
            if ( parseInt(Seed.resources["city" + Seed.cities[GeneralOptions.usedCityNum][0]]["rec5"][0]) >= GeneralOptions.minStones) return GeneralOptions.usedCityNum;

            if (GeneralOptions.useAnyCity)
            {
                for (i= 0; i < Seed.cities.length; i++)
                {
                    if ( parseInt(Seed.resources["city" + Seed.cities[i][0]]["rec5"][0]) >= GeneralOptions.minStones) return i;
                }
            }
            return -1;
        },


        doRepair : function( rItem) {
            var t = Tabs.throneUpgrader;
            var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);

            if (TRupgradeData.active == false || rItem == 0 || unsafeWindow.kocThroneItems[rItem] == null)
            {
                logit("repair is turned off");
                return;
            }
            var theItem = unsafeWindow.kocThroneItems[rItem];



            params.action = 'timeRepair';
            params.throneRoomItemId = rItem;
            params.ctrl = 'throneRoom\\ThroneRoomServiceAjax';

            new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch53.php" + unsafeWindow.g_ajaxsuffix, {
                method: "post",
                parameters: params,
                loading: true,
                onSuccess: function (transport) {
                    //logit("repair success");
                    //logit("tport: " + inspect(transport,3,1));
                    var rslt = eval("(" + transport.responseText + ")");
                    //logit("rslt: " + inspect(rslt,3,1));
                    if(rslt.ok){
                        ActionLog('Starting repair for Throne Room item '+unsafeWindow.kocThroneItems[rItem].name);
                        Seed.queue_throne.itemId= rItem;
                        Seed.queue_throne.start=unixTime();
                        Seed.queue_throne.end= rslt.eta;
                        t.repairId = rItem;
                        t.repairEnd = rslt.eta;
                        var n = new Date(t.repairEnd *1000);
                        t.setStatus("Repair begun ... Repair will be complete at " + n.toLocaleTimeString() + ". Item: "  + unsafeWindow.kocThroneItems[t.repairId].name);
                        var x = rslt.eta - unixTime();
                        unsafeWindow.cm.ThroneView.renderInventory(unsafeWindow.kocThroneItems);
                        t.clearTimerH = setTimeout(t.clearRepair, (x+1)*1000);
                        var item = unsafeWindow.kocThroneItems[rItem];
                        Tabs.throneUpgrader.buildQueueDisplay();
                        // uW.cm.ThronePanelView.clickSpeedUp(item);
                    }
                    else
                    {
                        logit ("Repair failed");
                        if (rslt.msg == "Item is not broken")
                        {
                            unsafeWindow.kocThroneItems[rItem].isBroken = false;
                            t.clearRepair();
                        }

                        // regrab the end times in case this is caused by a manual repair
                        if (Seed.queue_throne && Seed.queue_throne.end && Seed.queue_throne.itemId)
                        {
                            t.repairEnd = Seed.queue_throne.end;
                            t.repairId = Seed.queue_throne.itemId;
                        }
                        logit("result:" + inspect(rslt,3,1));
                    }
                    return;
                },
                onFailure: function (ttt) {
                    logit("repair error");
                    // this usually means a repair is in progress (such as a
                    // manual
                    // repair). Grab the seed data (if possible)
                    if (Seed.queue_throne && Seed.queue_throne.end)
                    {
                        t.repairEnd = Seed.queue_throne.end;
                        t.repairId = Seed.queue_throne.itemId;
                    }
                    logit("ttt: " + inspect(ttt,3,1));
                    return;
                }
            });
            return;
        },

        clearRepair : function () {
            var t = Tabs.throneUpgrader;
            var timeUntilDone = 0;

            if (t.repairEnd == 0)
            {
                return timeUntilDone;
            }
            timeUntilDone = t.repairEnd - unixTime();

            if (timeUntilDone <= 0)
            {
                // logit("clearing repair");
                if (t.repairId != 0 && unsafeWindow.kocThroneItems[t.repairId]  != null)
                {
                    if (unsafeWindow.kocThroneItems[t.repairId].isBroken == true)
                    {
                        t.setStatus("Repair time complete.");
                    }
                    unsafeWindow.kocThroneItems[t.repairId].isBroken = false;
                    unsafeWindow.kocThroneItems[t.repairId].brokenType = "";
                    t.repairId = 0;
                }

            }
            unsafeWindow.cm.ThroneView.renderInventory(unsafeWindow.kocThroneItems);
            return timeUntilDone;
        },

        show: function(){
            Tabs.throneUpgrader.repaint();
        },

        hide: function(){
        }
};


function findTab(div) {
    for (o in Tabs)
    {
        if (Tabs[o].myDiv && (Tabs[o].myDiv == div)) return o;
    }
    return null;
}

var WinManager = {
        wins : {},    
        didHide : [],

        get : function (prefix){
            var t = WinManager;
            return t.wins[prefix];
        },

        add : function (prefix, pop){
            var t = WinManager;
            t.wins[prefix] = pop;
            if (unsafeWindow.cpopupWins == null)
                unsafeWindow.cpopupWins = {};
            unsafeWindow.cpopupWins[prefix] = pop;
        },

        hideAll : function (){
            var t = WinManager;
            t.didHide = [];
            for (k in t.wins){
                if (t.wins[k].isShown()){
                    t.didHide.push (t.wins[k]);
                    t.wins[k].show (false);
                }
            }
        },
        restoreAll : function (){
            var t = WinManager;
            for (var i=0; i<t.didHide.length; i++)
                t.didHide[i].show (true);
        },

        deleteWin : function (prefix){
            var t = WinManager;
            delete t.wins[prefix];
            delete unsafeWindow.cpopupWins[prefix];
        }
}


//registers the popup
//prefix must be a unique (short) name for the popup window
function orgPopup(prefix) {
    var pop = WinManager.get(prefix);
    if (pop){
        pop.show(false);
        return pop;
    }

    // behind the salvage popup
    this.BASE_ZINDEX = 111111;

    // protos ...
    this.show = show;
    this.getTopDiv = getTopDiv;
    this.getMainTopDiv = getMainTopDiv;
    this.getMainDiv = getMainDiv;
    this.getLayer = getLayer;
    this.setLayer = setLayer;
    //this.getLocation = getLocation;
    //this.setLocation = setLocation;
    this.focusMe = focusMe;
    this.isShown = isShown;
    this.unfocusMe = unfocusMe;
    this.destroy = destroy;

    // object vars ...
    this.div = $("#org_top")[0];
    this.prefix = prefix;    

    var t = this;   
    this.div.addEventListener ('mousedown', e_divClicked, false);
    WinManager.add(prefix, this);

    function e_divClicked (){
        t.focusMe();
    }


    function focusMe (){
        t.setLayer(5);
        for (k in unsafeWindow.cpopupWins){
            if (k != t.prefix)
                unsafeWindow.cpopupWins[k].unfocusMe();
        }
    }

    function unfocusMe (){
        t.setLayer(-5);
    }


    function destroy (){
        document.body.removeChild(t.div);
        WinManager.deleteWin (t.prefix);
    }

    function setLayer(zi){
        t.div.style.zIndex = ''+ (this.BASE_ZINDEX + zi);
    }
    function getLayer(){
        return parseInt(t.div.style.zIndex) - this.BASE_ZINDEX;
    }
    function getTopDiv(){
        return document.getElementById(this.prefix+'_top');
    }
    function getMainDiv(){
        return document.getElementById(this.prefix+'_main');
    }
    function getMainTopDiv(){
        return document.getElementById(this.prefix+'_top');
    }
    function isShown (){
        return $("#org_dialog").dialog("isOpen");
    }
    function show(tf){
        if (tf){
            $("#org_dialog").dialog("open");
            t.focusMe ();
        } else {
            $("#org_dialog").dialog("close");
        }
        return tf;
    }
}

//onClick (city{name, id, x, y}, x, y) city may be null!
function CdispCityPicker (id, span, dispName, notify, selbut){
    function CcityButHandler (t) {
        var that = t;

        function clickedCityBut (e){
            if (that.selected != null)
                that.selected.className = "castleBut castleButNon";
            that.city = Cities.cities[e.target.id.substr(that.prefixLen)];
            if (that.dispName)
                document.getElementById(that.id+'cname').innerHTML = that.city.name;
            e.target.className = "castleBut castleButSel";
            that.selected = e.target;
            if (that.coordBoxX){
                that.coordBoxX.value = that.city.x;
                that.coordBoxY.value = that.city.y;
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent('change', true, true ); // event
                // type,bubbling,cancelable
                that.coordBoxX.dispatchEvent(evt);
                that.coordBoxY.dispatchEvent(evt);
                that.coordBoxX.style.backgroundColor = '#ffffff';
                that.coordBoxY.style.backgroundColor = '#ffffff';
            }
            if (that.notify != null)
                that.notify(that.city, that.city.x, that.city.y);
        }

        this.clickedCityBut = clickedCityBut;
    }

    function selectBut (idx){
        document.getElementById(this.id+'_'+idx).click();
    }

    function bindToXYboxes (eX, eY){
        function CboxHandler (t){
            var that = t;
            this.eventChange = eventChange;
            if (that.city){
                eX.value = that.city.x;
                eY.value = that.city.y;
            }
            function eventChange (){
                var xValue=that.coordBoxX.value.trim();
                var xI=/^\s*([0-9]+)[\s|,|-|.]+([0-9]+)/.exec(xValue);
                if(xI) {
                    that.coordBoxX.value=xI[1]
                    that.coordBoxY.value=xI[2]
                }
                var x = parseInt(that.coordBoxX.value, 10);
                var y = parseInt(that.coordBoxY.value, 10);
                if (isNaN(x) || x<0 || x>750){
                    that.coordBoxX.style.backgroundColor = '#ff8888';
                    return;
                }
                if (isNaN(y) || y<0 || y>750){
                    that.coordBoxY.style.backgroundColor = '#ff8888';
                    return;
                }
                that.coordBoxX.style.backgroundColor = '#ffffff';
                that.coordBoxY.style.backgroundColor = '#ffffff';
                if (that.notify != null)
                    that.notify (null, x, y);
            }
            return false;
        }
        this.coordBoxX = eX;
        this.coordBoxY = eY;
        var bh = new CboxHandler(this);
        eX.maxLength=8;
        eY.maxLength=3;
        eX.style.width='2em';
        eY.style.width='2em';
        eX.addEventListener('change', bh.eventChange, false);
        eY.addEventListener('change', bh.eventChange, false);
    }

    this.selectBut = selectBut;
    this.bindToXYboxes = bindToXYboxes;
    this.coordBoxX = null;
    this.coordBoxY = null;
    this.id = id;
    this.dispName = dispName;
    this.prefixLen = id.length+1;
    this.notify = notify;
    this.selected = null;
    this.city = null;
    var m = '';
    for (var i=0; i<Cities.cities.length; i++)
        m += '<INPUT class="castleBut castleButNon" id="'+ id +'_'+ i +'" value="'+ (i+1) +'" type=button />';
    if (dispName)
        m += ' &nbsp; <SPAN style="display:inline-block; width:85px; font-weight:bold;" id='+ id +'cname' +'></span>';
    span.innerHTML = m;
    var handler = new CcityButHandler(this);
    for (var i=0; i<Cities.cities.length; i++)
        document.getElementById (id+'_'+i).addEventListener('click', handler.clickedCityBut, false);
    if (selbut != null)
        this.selectBut(selbut);
};

function setCities(){
    Cities.numCities = Seed.cities.length;
    Cities.cities = [];
    Cities.byID = {};
    for (i=0; i<Cities.numCities; i++){
        city = {};
        city.idx = i;
        city.id = parseInt(Seed.cities[i][0]);
        city.name = Seed.cities[i][1];
        city.x = parseInt(Seed.cities[i][2]);
        city.y = parseInt(Seed.cities[i][3]);
        city.tileId = parseInt(Seed.cities[i][5]);
        city.provId = parseInt(Seed.cities[i][4]);
        // getTroopDefTrainEstimates('city'+ city.id, city);
        Cities.cities[i] = city;
        Cities.byID[Seed.cities[i][0]] = city;
    }
}

function addCommas(nStr){
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}


String.prototype.startsWith = function(starter)
{
    return this.substring(0,starter.length) == starter;
};

String.prototype.endsWith = function(ender)
{
    return this.substring(this.length-ender.length) == ender;
};

String.prototype.capitalize = function()
{ 
    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
};


/** *********** Updater code ************ */
//Function for displaying a confirmation message modal popup similar to the
//default javascript confirm() function
//but with the advantage being that it won't halt all other javascript being
//executed on the page.
//Original Author: Thomas Chapin (April 6, 2011)
function display_confirm(confirm_msg,ok_function,cancel_function){
    if(!confirm_msg){confirm_msg="";}

    var container_div = document.getElementById('modal_js_confirm');
    var div;
    if(!container_div) {
        container_div=document.createElement('div');
        container_div.id='modal_js_confirm';
        container_div.style.position='absolute';
        container_div.style.top='0px';
        container_div.style.left='0px';
        container_div.style.width='100%';
        container_div.style.height='1px';
        container_div.style.overflow='visible';
        container_div.style.zIndex=2000005;

        div=document.createElement('div');
        div.id='modal_js_confirm_contents';
        div.style.zIndex=2000005;
        div.style.backgroundColor='#eee';
        div.style.fontFamily='"lucida grande",tahoma,verdana,arial,sans-serif';
        div.style.fontSize='11px';
        div.style.textAlign='center';
        div.style.color='#333333';
        div.style.border='2px outset #666';
        div.style.padding='10px';
        div.style.position='relative';
        div.style.width='300px';
        div.style.height='100px';
        div.style.margin='300px auto 0px auto';
        div.style.display='block';

        container_div.appendChild(div);
        document.body.appendChild(container_div);

        div.innerHTML = '<div style="text-align:center"><div>'+confirm_msg+'</div><br/><div>Press OK to continue.</div><br><button id="modal_js_confirm_ok_button">OK</button> <button id="modal_js_confirm_cancel_button">Cancel</button></div>';
        var ok_button = document.getElementById('modal_js_confirm_ok_button');
        ok_button.addEventListener('click',function() {
            if(ok_function && typeof(ok_function) == "function"){
                ok_function();
            }
            container_div.parentNode.removeChild(container_div);
        },false);
        var cancel_button = document.getElementById('modal_js_confirm_cancel_button');
        cancel_button.addEventListener('click',function() {
            if(cancel_function && typeof(cancel_function) == "function"){
                cancel_function();
            }
            container_div.parentNode.removeChild(container_div);
        },false);
    }
}

//The following code is released under public domain.

var AutoUpdater = {
    id: 424415,
    days: 1,   // check every 1 day
    name: "KOC Throne Room & Champ Organizer",
    version: Version,
    time: new Date().getTime(),
    call: function (response, secure) {
        logit("checking version");
        if ( GlobalOptions.UpdateSite == 0 ) {
            scriptpage = userscriptssite;
        } else {
            scriptpage = googlecodesite;
        }
        GM_xmlhttpRequest({
            method: 'GET',
            url: scriptpage,
            onload: function (xpr) { AutoUpdater.compare(xpr, response); },
            onerror: function (xpr) { if (secure) AutoUpdater.call(response, false); }
        });
    },
    enable: function () {
        GM_registerMenuCommand("Enable " + this.name + " updates", function () {
            GM_setValue('updated_424415', new Date().getTime() + '');
            AutoUpdater.call(true, true)
        });
    },
    compareVersion: function (r_version, l_version) {
        var r_parts = r_version.split(''),
            l_parts = l_version.split(''),
            r_len = r_parts.length,
            l_len = l_parts.length,
            r = l = 0;
        for (var i = 0, len = (r_len > l_len ? r_len : l_len); i < len && r == l; ++i) {
            r = +(r_parts[i] || '0');
            l = +(l_parts[i] || '0');
        }
        return (r !== l) ? r > l : false;
    },
    compare: function (xpr, response) {
        this.xversion = /\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);
        this.xname = /\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);

        if ((this.xversion) && (this.xname[1] == this.name)) {
            this.xversion = this.xversion[1];
            this.xname = this.xname[1];
        } else {
            if ((xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name)) {
                // GM_setValue('updated_424415', 'off');
            }
            return false;
        }

        var updated = this.compareVersion(this.xversion, this.version);

        if (updated) {
            display_confirm('A new version of ' + this.xname + ' is available.\nDo you wish to install the latest version?',
            // Ok
                function () {
                    try {
                        location.href = scriptpage;
                    } catch (e) { }
                },
            // Cancel
                function () {
                    if (AutoUpdater.xversion) {
                        if (confirm('Do you want to turn off auto updating for this script?')) {
                            GlobalOptions.OrganizerUpdate = false;
                            GM_setValue('TROptions_??', JSON2.stringify(GlobalOptions));
                            AutoUpdater.enable();
                            alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
                        }
                    }
                }
            );

        } else if (response) {
            alert('No updates available for ' + this.name);
        }
    },
    check: function (tf) {
        if (!tf) {
            this.enable();
        } else {
            // convert days to milliseconds and compare
            if (+this.time > (+GM_getValue('updated_424415', 0) + 1000 * 60 * 60 * 24 * this.days)) {
                GM_setValue('updated_424415', this.time + '');
                this.call(false, true);
            }
            GM_registerMenuCommand("Check " + this.name + " for updates", function () {
                GM_setValue('updated_424415', new Date().getTime() + '');
                AutoUpdater.call(true, true)
            });
        }
    }
};

readGlobalOptions();

//even though Scriptish provides its own update mechanism (GM_updatingEnbled ==
//true), lets use this method.
if (typeof(GM_xmlhttpRequest) !== 'undefined' /*
 * && typeof(GM_updatingEnabled)
 * === 'undefined'
 */) {
    try {
        if (unsafeWindow.frameElement === null) {
            AutoUpdater.check(GlobalOptions.OrganizerUpdate);
        }
    } catch(e) {
        AutoUpdater.check(GlobalOptions.OrganizerUpdate);
    }
}

/** ******* End updater code ************ */

String.prototype.capitalize = function(){ 
    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
}

//****************************
//This is a new implementation of the CalterUwFunc class to modify a function of the 'unsafewWindow' object.
//For reverse compatibility this implementation operates like the original, but multiple CalterUwFunc objects can be created for the same function.
//Each CalterUwFunc can be enabled or diabled independently.  (Of course, the repalcement strings must be compatibile with each other to work
//simulataneously).

//The implementation uses a worker class CalterFuncModifier.  One and only one CalterFuncModifier is created for each uw function modified.
//CalterFuncModifier allows multiple modifier string pairs to be applied.  For individual control of specific mods, access the 'modIndex'
//member to determine the index of the first mod and then directly call the operations of the 'funcModifier' member.

//This implementation creates/uses a registry of CalterFuncModifier's that is added to the unsafeWindow object so that changes
//to the same function in different scripts is possible.

//****************************


var CalterUwFunc = function (funcName, findReplace) {

    this.isAvailable = isAvailable;
    this.setEnable = setEnable;

    this.funcName = funcName;
    this.funcModifier = null;
    this.modIndex = 0;
    this.numberMods = 0;

    // find an existing CalterUwFunc if it already exists
    if (!unsafeWindow.calterRegistry) unsafeWindow.calterRegistry = {};
    var calterF = null;

    if (unsafeWindow.calterRegistry[funcName]) {
        // use the existing function modifier
        calterF = unsafeWindow.calterRegistry[funcName];
        for (i=0; i< findReplace.length; i++) {
            calterF.addModifier(findReplace[i]);
        }
    } else {
        // create and register the new calter
        calterF = new CalterFuncModifier(funcName, findReplace);
        unsafeWindow.calterRegistry[funcName] = calterF;
    }
    this.funcModifier = calterF;

    if (findReplace != null)
    {
        this.numberMods = findReplace.length;
        this.modIndex = this.funcModifier.numModifiers()- this.numberMods;
    }

    function isAvailable() {
        // check if any of the replace strings matched the original function
        var avail = false;
        for (i= this.modIndex; i < this.modIndex + this.numberMods; i++ )
        {
            if (this.funcModifier.testModifier(i)) avail= true;
        }
        return avail;
    }

    function setEnable(tf) {
        this.funcModifier.enableModifier(this.modIndex, tf, this.numberMods);
    }
}

var CalterFuncModifier = function (funcName, findReplace) {
    // (second argument is now optional )

    this.applyModifiers = applyModifiers;
    this.addModifier = addModifier;
    this.enableModifier = enableModifier;
    this.testModifier = testModifier;
    this.modEnabled = modEnabled;
    this.numModifiers = numModifiers;

    this.funcName = funcName;
    this.funcOld = null;  
    this.funcOldString = null;
    this.funcNew = null;
    this.modifiers = [];
    this.modsActive = [];

    try {
        var x = this.funcName.split('.');
        var f = unsafeWindow;
        for (var i=0; i<x.length; i++)
            f = f[x[i]];
        ft = f.toString();
        this.funcOld = f;
        this.funcOldString = ft.replace ('function '+ this.funcName, 'function');

        if (findReplace) {
            this.modifiers  = findReplace;
            this.modsActive = new Array(findReplace.length);
            for (var i=0; i<findReplace.length; i++){
                this.modsActive[i] = false;
            }
        }
    } catch (err) {
        logit("CalterFuncModifier "+ this.funcName+" "+err);
    }

    // test if this modifier works on the original function.
    //    true = match found / replace possible
    //    false = does not match
    function testModifier(modNumber) {
        x = this.funcOldString.replace(this.modifiers[modNumber][0], this.modifiers[modNumber][1]);
        if (x != this.funcOldString)
        {
            return true;
        }
        return false;
    }

    // use the active modifiers to create/apply a new function
    function applyModifiers() {
        try {
            var rt = this.funcOldString;
            var active = false;

            for (var i=0; i< this.modifiers.length; i++){
                if ( !this.modsActive[i]) continue;

                x = rt.replace(this.modifiers[i][0], this.modifiers[i][1]);
                if (x == rt)  // if not found
                {
                    // print out an error message when the match fails.
                    // These messages get lost on a refresh, so wait a few seconds to put it in the error log.
                    setTimeout( function (fname, repStr, ftstr) {
                        return function () {
                            logit("Unable to replace string in function " + fname);
                            logit("Replacment string:" + repStr );
                            logit("Function listing: " + ftstr);
                            return;
                        }
                    }(this.funcName, this.modifiers[i][0], ft), 3000);
                }
                else {

                }

                rt = x;
                active = true;
            }

            this.funcNew = rt;
            if (active) {
                // apply the new function
                uW.uwuwuwFunc(this.funcName +' = '+ this.funcNew);
            } else {
                // set to the original function
                var x1 = this.funcName.split('.');
                var f1 = unsafeWindow;
                for (var i=0; i<x1.length-1; i++)
                    f1 = f1[x1[i]];
                f1[x1[x1.length-1]] = this.funcOld;
            }
        } catch (err) {
            logit("CalterFuncModifier "+ this.funcName+" "+err);
        }
    }

    // add additional modifiers.  The index of the modifier is returned so the caller can enable/disable it specificially
    function addModifier(fr) {
        this.modifiers.push(fr);
        this.modsActive.push(false);
        // return the index of the newly added modifier
        return this.modifiers.length-1;
    }

    // turn on/off some of the modifiers.
    // 'len' allows setting consectutive modifiers to the same value.
    //   If len is null, 1 is used
    function enableModifier(modNumber, value, len) {

        if (len == null) len = 1;
        for (i = modNumber; i < modNumber + len; i++) {
            if ( i < this.modsActive.length) {
                this.modsActive[i] = value;
            }
        }
        this.applyModifiers();
    }

    function modEnabled(modNumber) {
        if ( modNumber < this.modsActive.length)
            return this.modsActive[modNumber];
    }

    function numModifiers() {
        return this.modifiers.length;
    }

};

function htmlSelector (valNameObj, curVal, tags){
  var m = [];
  m.push ('<SELECT');
  if (tags){
    m.push (' ');
    m.push (tags);
  }  
  for (var k in valNameObj){
    m.push ('><OPTION ');
    if (k == curVal)
      m.push ('SELECTED ');
    m.push ('value="');
    m.push (k);
    m.push ('">');
    m.push (valNameObj[k]);
    m.push ('</option>');
  }
  m.push ('</select>');
  return m.join ('');
}

function getObjectCollectionCount( objColl ) {
    var c = 0;
    for (var k in objColl) {
        c++;
    }
    return c;
}

function getPresetTagCount(presetIndex) {
    switch(presetIndex) {
        case 1:
            return getObjectCollectionCount(TRpresetData.taggedItems01);
            break;
        case 2:
            return getObjectCollectionCount(TRpresetData.taggedItems02);
            break;
        case 3:
            return getObjectCollectionCount(TRpresetData.taggedItems03);
            break;
        case 4:
            return getObjectCollectionCount(TRpresetData.taggedItems04);
            break;
        case 5:
            return getObjectCollectionCount(TRpresetData.taggedItems05);
            break;
        case 6:
            return getObjectCollectionCount(TRpresetData.taggedItems06);
            break;
        case 7:
            return getObjectCollectionCount(TRpresetData.taggedItems07);
            break;
        case 8:
            return getObjectCollectionCount(TRpresetData.taggedItems08);
            break;
        case 9:
            return getObjectCollectionCount(TRpresetData.taggedItems09);
            break;
        case 10:
            return getObjectCollectionCount(TRpresetData.taggedItems10);
            break;
        case 11:
            return getObjectCollectionCount(TRpresetData.taggedItems11);
            break;
        case 12:
            return getObjectCollectionCount(TRpresetData.taggedItems12);
            break;
        case 13:
            return getObjectCollectionCount(TRpresetData.taggedItems13);
            break;
        case 14:
            return getObjectCollectionCount(TRpresetData.taggedItems14);
            break;
        case 15:
            return getObjectCollectionCount(TRpresetData.taggedItems15);
            break;
        case 16:
            return getObjectCollectionCount(TRpresetData.taggedItems16);
            break;
    };
    return 0;
}

function getPresetObject(presetIndex) {
        switch(presetIndex) {
            case 1:
                return TRpresetData.taggedItems01;
                break;
            case 2:
                return TRpresetData.taggedItems02;
                break;
            case 3:
                return TRpresetData.taggedItems03;
                break;
            case 4:
                return TRpresetData.taggedItems04;
                break;
            case 5:
                return TRpresetData.taggedItems05;
                break;
            case 6:
                return TRpresetData.taggedItems06;
                break;
            case 7:
                return TRpresetData.taggedItems07;
                break;
            case 8:
                return TRpresetData.taggedItems08;
                break;
            case 9:
                return TRpresetData.taggedItems09;
                break;
            case 10:
                return TRpresetData.taggedItems10;
                break;
            case 11:
                return TRpresetData.taggedItems11;
                break;
            case 12:
                return TRpresetData.taggedItems12;
                break;
            case 13:
                return TRpresetData.taggedItems13;
                break;
            case 14:
                return TRpresetData.taggedItems14;
                break;
            case 15:
                return TRpresetData.taggedItems15;
                break;
            case 16:
                return TRpresetData.taggedItems16;
                break;
        };
    return null;
}

//only run in the main iframe
if (document.location.toString().match('src/main_src.php') ) OrganizerStartup ();
