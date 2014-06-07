// ==UserScript==
// @id             Reaper82
// @name           Reapers champion bot
// @version        20131126a
// @namespace      Reaper82
// @author         PC
// @description    Organizes the Champion equipment in Kingdoms of Camelot
// @homepage       http://userscripts.org/scripts/show/186563
// @delay 2000
// @priority -11
// @run-at         document-end
// @include        *.kingdomsofcamelot.com/*main_src.php*
// @include        *kabam.com/kingdoms-of-camelot/play*
// @resource       jqcss http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css
// @updateURL      https://userscripts.org/scripts/source/183854.meta.js
// @downloadURL    https://userscripts.org/scripts/source/183854.user.js
// @icon  https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/champion_hall/uncommon_chestArmor_briton_70x70.png
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
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=FDW4NZ6PRMDMJ&lc=US&item_name=TR%20Organizer%20Donations&item_number=1001&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted
// @contributionAmount $3.00
// @screenshot http://s3.amazonaws.com/uso_ss/24187/large.png?1385254902
// ==/UserScript==


//var xx= {level: 2}; alert(CM.ThronePanelController.calcRiskBarWidth("upgrade", xx, 0))

var Version = '20131126a_mm';

var chPopUpTopClass = 'chPopTop';
var ResetAll = false;
var DEBUG_TRACE = false;

var maxChLevel = 10;

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

var upgradeData = {
        active : false,
        item : 0,
        retryInterval : 30,
        enhanceAction : false,
        enhanceItem : 0,
        enhanceMax  : 5,
        minStones : 100000,
        switchToUpgrade : true,
        salvageActive : false,
        currentTab : null,
        chWinIsOpen : false,
        Opacity : 1.0,
        anyCity : true,
        uCityNum : 0,
        sCityNum : 0,
        repairAll : false,
        chWinPos : {},
        disableAnim : false,
        upgradeH: '300px',
        upgradeW:  '700px',
        salvageH: '300px',
        salvageW:  '710px',
        organizeH: '500px',
        organizeW: '770px',
        optionH: '500px',
        optionW: '700px',
        logH:    '500px',
        logW:    '710px',
        activeTab: 1,
        sortSelected: "none",
        buffSelected: "both",
        sortInactive: true,
        whisperToMe: false,
        safetyOn: false,
        buffsOff: false,
        safetyLimit: 50000,
        multiUpgrade: false,
        noMassSalvage: false,
        salvageSafety: false,
        numSafety: 40,
        presetWidget: true,
        removeTokens: false
};

var queueData = {
        list : [],
        oneItem : true,
        doingRepairs : false,
        index : 0,
        dataConverted : false
};

var CHGlobalOptions = {
        chUpdate : false
};

var presetData = {
        items : [],
        ids : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'],
        desc : ['Preset A', 'Preset B', 'Preset C', 'Preset D', 'Preset E', 'Preset F', 'Preset G', 'Preset H', 'Preset I', 'Preset J',
                'Preset K', 'Preset L', 'Preset M', 'Preset N', 'Preset O', 'Preset P', 'Preset Q', 'Preset R'],
                num_presets: 10,
                noTooltips : false,
                usePreset : 0,
                taggedItems: {}
};

var TABLE_SCALE =0.47;

var salvageData = {
        salvageActive : false,
        champSaveNum : 40,
        minQuality    : 3,
        ruleSet       : [],
        numSalvagedItems : 0,
        numSalvagedItems2 : 0,
        maxStones     : 980000,
        anyCity       : true,
        overflow      : "order",
        numSalvaged   : {0: 0, 1: 0, 2:0, 3:0, 4:0, 5:0, 6:0},
};


var n = new Date();
salvageData.since = n.valueOf();

var Seed = unsafeWindow.seed;
var Tabs = {};
var uW = unsafeWindow;
var CM = unsafeWindow.cm;
var Cities = {};

var chStartupTimer = null;

var chDispTimer = null;

function chStartup (){

    if (!unsafeWindow.cm)
        return;

    if (uW.chLoaded)
        return;

    var metc = getClientCoords(document.getElementById('main_engagement_tabs'));
    if (metc.width==null || metc.width==0){
        chStartupTimer = setTimeout (chStartup, 1000);
        return;
    }

    uW.chLoaded = Version;

    readUpgradeData();

    if (upgradeData.uCityNum && upgradeData.uCityNum > Seed.cities.length -1 ) upgradeData.uCityNum = 0; 
    if (upgradeData.sCityNum && upgradeData.sCityNum > Seed.cities.length -1 ) upgradeData.sCityNum = 0;

    readSalvageData();
    readQueueData();
    readPresetData();

    logit ("Champion organizer loaded");

    var styles = '.xtab {padding-right: 5px; border:none; background:none; white-space:nowrap;}\
        .xtabBR {padding-right: 5px; border:none; background:none;}\
        .greenBorder { margin-right: -100%; margin-bottom: -100%; height: 72%; width: 72%; padding: 4%; border: 3px solid cyan; background: transparent;}\
        div.greenBorder2 { position: relative; }\
        .semi_transparent { zoom: 1; filter: alpha(opacity=60); opacity: 0.6;}  \
        .rot45 { transform: rotate(-45deg); -ms-transform: rotate(-45deg); -webkit-transform: rotate(-45deg); -o-transform: rotate(-45deg); -moz-transform: rotate(-45deg); -moz-transform-origin: 100% 100%; z-index: 10;}\
        div.cardOverlay { font: cracked; font-size:3.5em; position: absolute; left: 0%; top: 50%; color: red; text-align: center; text-shadow: 2px 2px 4px #000;} \
        body table.chMainTab tbody tr td {background: transparent;}\
        table.chTabdef { height: 0px;}\
        .chCardDisp { display: static;}\
        table.chTabDef thead {background: transparent;}\
        table.chPopMain tbody tr td,th {background: transparent;}\
        table.chTabDef tbody tr td {background: transparent; height: 0px; }\
        table.chTab tr td, th { border: 1px solid brown;}\
        #ch_footer {height: 50px; background: url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/dialog_740_r3_c1.jpg") scroll no-repeat center bottom;}\
        #ch_footer { background-size: cover; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; }\
        table.chTab tr td,th {border:none; background:none; padding: 0px}\
        table.chTab#chDisplayTable tr th { border: 3px solid grey; font-size:1.2em; }\
        table.chStatTab tr td { background-color: #ffffff; white-space:nowrap; padding:5px; border-bottom:solid black 1px;}\
        table.chStatTab tr td:last-child { border-right:solid black 1px; }\
        table.chStatTab tr:first-child th { border-top:solid black 1px; }\
        table.chStatTab tr td.td0 { background-color: white; }\
        table.chStatTab tr td.td1 { background-color: #eeeeee; }\
        table.chStatTab tr td.td2 { background-color: white; }\
        table.chStatTab tr th {border:solid black 1px; border-top: none; background-color: #357; color: white; white-space:nowrap; padding:5px}\
        table.chStatTab tr:last-child td:first-child, table.trStatTab tr:last-child th:first-child { -moz-border-radius-bottomleft:10px; -webkit-border-bottom-left-radius:10px; border-bottom-left-radius:10px} \
        table.chStatTab tr:last-child td:last-child, table.trStatTab tr:last-child th:last-child { -moz-border-radius-bottomright:10px; -webkit-border-bottom-right-radius:10px; border-bottom-right-radius:10px} \
        table.chStatTab tr:first-child th:first-child { -moz-border-radius-topleft:10px; -webkit-border-top-left-radius:10px; border-top-left-radius:10px} \
        table.chStatTab tr:first-child th:last-child { -moz-border-radius-topright:10px; -webkit-border-top-right-radius:10px; border-top-right-radius:10px} \
        table.chTabLined tbody tr td {border-bottom:1px solid gray; padding: 2px 5px; }\
        table.chOptions tr td,th {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
        table.chSrchResults tr td,th {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
        table.chTabSome tr td,th {border:none; background:none; padding: 1px 3px; white-space:nowrap;}\
        table.chTabPad tr td,th { padding-left: 2px; background: none;}\
        table.chTabPad2 tr td,th { padding-left: 20px; background: none;}\
        .chDetLeft {padding:0 5px 0 0 !important; font-weight:bold; text-align:right}\
        .chStat {border:1px solid; border-color:#000000; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff ; background-color:#357;  -moz-border-radius:5px;}\
        .cchentry {padding: 7px; white-space:nowrap;}\
        button::-moz-focus-inner, input[type="submit"]::-moz-focus-inner { border: none; }\
        button::-moz-focus-inner, input[type="button"]::-moz-focus-inner { border: none; }\
        .castleBut {outline:0px; margin-left:0px; margin-right:0px; width:24px; height:26px; font-size:12px; font-weight:bold;}\
        .castleBut:hover {background-image:url("'+ URL_CASTLE_BUT_SEL +'")}\
        .castleButNon {background-image:url("'+ URL_CASTLE_BUT +'")}\
        .castleButSel {background-image:url("'+ URL_CASTLE_BUT_SEL +'")}\
        input.chDefButOn {cursor:pointer; border:1px solid #45d183; -moz-box-shadow:inset 0px 1px 5px #3aef8b; -moz-border-radius:5px;}\
        input.chDefButOff {cursor:pointer; border:1px solid #f61646; -moz-box-shadow:inset 0px 1px 5px #f6375f; -moz-border-radius:5px;}\
        table.chMainTab { empty-cells: show;  }\
        table.chMainTab tr td,th a {color:inherit }\
        table.chMainTab tr td,th  {height:60%; empty-cells:show; padding: 0px 0px 0px 0px;  margin-top:5px; white-space:nowrap; border: 1px solid; border-style: none none solid none; -moz-border-radius:5px; }\
        table.chMainTab tr td.spacer,th.space {padding: 0px 0px;}\
        table.chMainTab tr th.sel,td.sel    {font-weight:bold; font-size:13px; }\
        table.chMainTab tr th.notSel,td.notSel {font-weight:bold; font-size:13px; }\
        ch.chPopTop td,th { background-color:transparent; border:none; height: 21px;  padding:0px;}\
        .chPopMain  {  -moz-box-shadow:inset 0px 0px 10px #6a6a6a; -moz-border-radius-bottomright: 20px; -moz-border-radius-bottomleft: 20px;}\
        .chPopup  { border:3px ridge #666; opacity:'+upgradeData.Opacity+'; -moz-border-radius:25px; -moz-box-shadow: 1px 1px 5px #000000;}\
        .chPopup { overflow-x: hide; overflow-y: hide; max-height: 900px; min-height: 400px; height: 500px;  }\
        #ch_top {  background: url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/dialog_740_r2_c1.jpg") no-repeat transparent 0% 0%; }\
        #ch_top { background-size: cover; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; }\
        /* this was needed because the css used a object id and not a class.  reusing the ID caused display issues w/ the TR tooltips */ \
        div.chCard {width: 200px;}\
        .ChampionX .item { width: 30px; height: 30px; border: 1px solid black; display: inline-block; }\
        .ChampionX .title { position: absolute; font-size: 18px; width: 300px; text-align: center; font-weight: bold; } \
        .ChampionX .stats .name {  background: url(../img/champion_hall/champName_off.png);  width: 173px; height: 26px; position: absolute; top: 0px; left: 0px; }\
        .ChampionX .stats .name:hover {  background: url(../img/champion_hall/champName_over.png);}\
        .ChampionX .item_section { float: left;  color: #3f2300; background-color: #E7E3D6; border: 1px solid #A4753A; padding: 9px; width: 220px; font-weight: bold;  line-height: 130%; position: relative;}\
        .ChampionX .champItemHover { margin: -4px; }\
        .ChampionX .champItemHover .item_section { margin: 4px; } \
        .ChampionX .item_title .icon {  background: transparent url("../img/throne/modal/equip.png") top right no-repeat; background-size: 100% 100%; display: inline-block; height: 20px; width: 20px; top: 12px;  right: 12px;  position: absolute; }\
        .ChampionX .item_title { font-size: 14px; display: table-cell; height: 28px; vertical-align: middle; padding-right: 30px; }\
        .ChampionX .stats_item_hover { color: #94652A; }\
        .ChampionX .champ_item_hover { width: 70px; height: 70px; float: left; margin-right: 10px;} \
        .ChampionX .item_section .divider { border-bottom: 2px solid #A4753A; margin: 10px 0px 10px 0px;}\
        .ChampionX .item_section .effects { margin: 3px 0; padding: 0; list-style: none; }\
        .ChampionX .item_section .effects .effect { padding: 3px 0 0 5px; font-weight: bold; font-size: 14px; }\
        .ChampionX .item_section .effects .effect.statChamp { color: #3F2300; }\
        .ChampionX .item_section .effects .effect.statTroop { color: #1751A5; }\
        .ChampionX .item_section .effects .effect.statChamp.disabled { color: #B9A48B; }\
        .ChampionX .item_section .effects .effect.statTroop.disabled { color: #A5B1E5; }\
        div.chRule {border:2px inset #c0c0c0; margin-right:10px; margin-left:10px; margin-bottom:2px; padding-left:5px; padding-bottom:5px} \
        div.chRuleCreate {margin-right:10px; padding-right: 5px; margin-bottom:2px; padding-bottom:5px} \
        div.chRule { background-color: #eeeeee; } \
        div.blueBorder { border: 2px solid blue; } \
        div.blueBorder2 { border: 4px solid blue; } \
        div.yellowBorder { outline: 2px solid yellow; outline-offset:0px; }\
        div.yellowBorder2 { outline: 4px solid yellow; outline-offset:0px; }\
        #chhammer { background-image: url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/modal/sm_hammer.png"); background-repeat: no-repeat; background-color: transparent; display: inline-block; width: 28px; height: 32px; margin: 2px; vertical-align: middle;}\
        div.chhammer { background-image: url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/modal/sm_hammer.png"); background-repeat: no-repeat; background-color: transparent; display: inline-block; width: 28px; height: 32px; margin: 2px; vertical-align: middle;}\
        div.chbroken { background-image: url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/modal/sm_fail_overlay.png"); background-repeat: no-repeat; background-color: transparent; display: inline-block; width: 28px; height: 32px; margin: 2px; vertical-align: middle;}\
        div.chsuccess { background-image: url('+ success_image +'); background-repeat: no-repeat; background-color: transparent; display: inline-block; width: 28px; height: 32px; margin: 2px; vertical-align: middle;}\
        div.chup { display=inline;  background-image: url('+ up_img +'); background-repeat: no-repeat; background-color: transparent;  width: 28px; height: 24px; }\
        div.chup:hover { display=inline;  background-image: url('+ up_glow +'); background-repeat: no-repeat; background-color: transparent;  width: 28px; height: 24px; }\
        div.chremove { display=inline;  background-image: url('+ remove_img +'); background-repeat: no-repeat; background-color: transparent;  width: 50px; height: 50px; }\
        div.chremove:hover { display=inline;  background-image: url('+ remove_glow +'); background-repeat: no-repeat; background-color: transparent;  width: 50px; height: 50px; }\
        div.chdown { display=inline;  background-image: url('+ down_img +'); background-repeat: no-repeat; background-color: transparent;  width: 28px; height: 24px; }\
        div.chdown:hover { display=inline;  background-image: url('+ down_glow +'); background-repeat: no-repeat; background-color: transparent;  width: 28px; height: 24px; }\
        div.chgbtn { display=inline;  background-image: url('+ gbtn_img +'); background-repeat: no-repeat; background-color: transparent;  width: 32px; height: 32px; margin: 0px; }\
        #chQueue th { text-align: center; }\
        a.loadChPreset { border-radius:5px; border-style: solid; border-width: 3px; }\
        div.indent25 {padding-left:25px}\
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1); -webkit-box-shadow: 5px 5px rgba(0, 0, 0, 0.1); -moz-box-shadow: 5px 5px rgba(0, 0, 0, 0.1);\
        font-family: Calibri, Tahoma, Geneva, sans-serif; font-weight: normal;\
        position: relative; left: -30px; top: 50px; \
        margin-left: 0; width: 200px; background-color: white; color: black;\
        background: #FFFFAA; border: 1px solid #FFAD33; padding: 0.8em 1em;}\
        #preset_ch {margin-left: -999em; position: absolute;}\
        #preset_ch.showit { border-radius: 5px 5px; -moz-border-radius: 5px; -webkit-border-radius: 5px;\
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1); -webkit-box-shadow: 5px 5px rgba(0, 0, 0, 0.1); -moz-box-shadow: 5px 5px rgba(0, 0, 0, 0.1);\
        font-family: Calibri, Tahoma, Geneva, sans-serif; font-weight: normal;\
        position: absolute; left: 400px; top: 100px; z-index: 99;\
        margin-left: 0; width: 200px; background-color: white; color: black;\
        background: #FFFFAA; border: 1px solid #FFAD33; padding: 0.8em 1em;}';

    window.name = 'CH';

    if (upgradeData.chWinPos==null ||  upgradeData.chWinPos.x==null || upgradeData.chWinPos.x=='' || isNaN(upgradeData.chWinPos.x)){
        var c = getClientCoords (document.getElementById('main_engagement_tabs'));
        upgradeData.chWinPos.x = 100;
        upgradeData.chWinPos.y = 100;
        saveUpgradeData();
    }

    var newCSS = GM_getResourceText ("jqcss");

    GM_addStyle (newCSS);
    GM_addStyle (styles);

    // clear some styles
    var styles2 = ".chDiag .ui-widget-content { font-size: 1.0em; background: none; border: none;}" +
    ".chDiag.ui-widget-content { font-size: 0.95em; background: none; border: none;}" +
    ".chDiag .ui-tabs .ui-tabs-nav li a { font-weight: bold; font-family: georgia,arial,sans-serif; color: white; font-size: 1.0em; background: url('https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/tab_unselected.png') no-repeat scroll 0% 0% transparent;}" +
    ".chDiag .ui-tabs .ui-tabs-nav li.ui-tabs-active a {   background: url('https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/tab_selected.png') no-repeat scroll 0% 0% transparent;}" +
    ".chDiag .ui-widget-content a { color: white;}" +
    ".chDiag a.buttonDown20 span { color: white;}" +
    ".chDiag .ui-widget {font-size: 1.0em;}" +
    ".chDiag.ui-dialog .ui-dialog-title {margin: 0px; width: 100%;}" +
    ".chDiag .ui-widget-header {background: none; border: none;}" +
    ".chDiag .ui-state-deafault {background-color: none; }" +
    ".chDiag .ui-widget .ui-widget {font-size: 0.9em;}" +
    ".chDiag .ui-dialog-titlebar {text-shadow: 0px 1px 0px white; line-height: 24px; text-align: center; color: #5C3317; font: bold 1.3em Georiga;}" +
    '.chDiag.ui-dialog .ui-dialog-titlebar-close { background-position: 0px 0px; background-image: url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/close_icon.png"); background-repeat: no-repeat; height: 20px; width: 20px; }' +
    ".chDiag.ui-dialog .ui-dialog-titlebar-close { width: 20px; height: 20px;}" +
    ".chDiag .ui-resizable-s { background: rgba(0,0,255,0.3);}" +
    ".chDiag .ui-tabs .ui-tabs-nav { position: relative; top: 10px; left: 15px;}" +
    "table.chTable tbody tr td { background: none;}";

    GM_addStyle(styles2);

    var prefix = 'ch';
    var topClass = 'chPopTop';

    $("#mainbody").append(
            "<div id='ch_dialog' class='chPopup ch_chPopup'>"
            + '<TABLE class=chTab cellspacing=0 width=100% height=100%>'
            + '<tbody><TR><TD colspan=2><div width=720px height=100% valign=top class="chPopMain '+ prefix +'_chPopMain" id="'+ prefix +'_main"></div></td></tr>'
            + '<tr><td colspan=2><div id=ch_footer></div></td>'
            + '</tr></tbody></table></div>');

    $("#ch_dialog").css({
        "overflow-y": "hidden",
        "overflow-x": "hidden",
        "padding": '0px'
    });

    var chPop = null;
    var tStr= 'Champion Hall Organizer';

    $("#ch_dialog").dialog({
        title: tStr,
        //zIndex: 111111,
        position: [ upgradeData.chWinPos.x, upgradeData.chWinPos.y],
        draggable: true,
        height: "auto",
        maxHeight: 2000,
        minHeight: 300,
        width: "auto",
        resizable: false,
        autoOpen: upgradeData.chWinIsOpen,
        dragStop: function( event, ui ) {
            upgradeData.chWinPos.x = ui.position.left;
            upgradeData.chWinPos.y = ui.position.top;
            saveUpgradeData();
        },
        close: function( event, ui ) {
            upgradeData.chWinIsOpen = false;
            saveUpgradeData();
        },
        open: function( event, ui ) {
            $("#ch_dialog").parent().css('z-index', 111111 );
            if (chPop) chPop.focusMe();
        }
    });

    $("#ch_dialog").css('max-height', '2000px');
    $("#ch_dialog").parent().attr( {id: 'ch_top', padding: '0px'});
    mainPop = $("#ch_top")[0];
    $("div#ch_bar").css( {background: 'none', border: 'none'} );
    $("#ch_top").addClass('chDiag');

    var mainDiv = $("#ch_top")[0];

    chPop = new chPopup('ch');

    // block the copy/paste stuff added by sharethis
    var a = document.getElementsByTagName("body")[0];
    a.oncopy = function () { return true;}

    setCities();

    CM.cheatDetector.detect = foo;

    $("#ch_main").html(
            '<div>\
            <ul>\
            <li><a href="#ch_tabs-upgrade">Upgrade</a></li>\
            <li><a href="#ch_tabs-salvage">Salvage</a></li>\
            <li><a href="#ch_tabs-organize">Organize</a></li>\
            <li><a href="#ch_tabs-options">Options</a></li>\
            <li><a href="#ch_tabs-log">Log</a></li>\
            </ul>\
            <div id="ch_tabs-upgrade">  Options tab    </div>\
            <div id="ch_tabs-salvage">  Salvage tab    </div>\
            <div id="ch_tabs-organize">  Organize tab    </div>\
            <div id="ch_tabs-options">  Options tab    </div>\
            <div id="ch_tabs-log">  Log tab    </div>\
    </div>');

    $("#ch_main").tabs({ 
        heightStyle: "content",
        active: upgradeData.activeTab,
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

    // set the width of all main tab divs
    /*
    $("#ch_main>div").css({
        "width": "auto",
        "padding": "0px"
    });
     */

    window.addEventListener('unload', onUnload, false);

    Tabs.options.init($("#ch_tabs-options")[0]);
    Tabs.chActionLog.init($("#ch_tabs-log")[0]);
    Tabs.upgrader.init($("#ch_tabs-upgrade")[0]);
    Tabs.champSalvage.init($("#ch_tabs-salvage")[0]);
    Tabs.organizer.init($("#ch_tabs-organize")[0]);
 
    $( "#ch_main" ).tabs( "refresh" ); 

    AddMainTabLink('Champion Hall Organizer', chHideShow, chMainTab);
   
    // set the color on the tab button
    setUpgradeColor();
    
    alterChampHall();

    chDispTimer = setInterval(updateTimerDisp , 1000);
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
                Tabs.upgrader.addEnhanceItem(id);
                Tabs.upgrader.repaint();
                $("#contextMenu").remove();});
            $("#contextMenu div.context_menu_title").after(btn);

            // create a button to set the item to auto-update
            btn = document.createElement('a');
            $(btn).addClass("buttonv2 box green")
            .html("Auto Upgrade")
            .css('color', 'blue')
            .attr('box_num', 11)
            .bind("click", function () {
                Tabs.upgrader.addUpgradeItem(id);
                Tabs.upgrader.repaint();
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


            // create a button to "tag" an item
            btn = document.createElement('a');
            if ( !presetData.taggedItems[id]) 
            {
                $(btn).addClass("buttonv2 box brown")
                .html("Tag Item")
                .css('color', 'white')
                .attr('box_num', 14)
                .bind("click", function () {
                    Tabs.organizer.addTagItem(id);
                    $("#contextMenu").remove();});
            } else {
                $(btn).addClass("buttonv2 box brown")
                .html("Remove Tag")
                .css('color', 'white')
                .bind("click", function () {
                    Tabs.organizer.removeTagItem(id);
                    $("#contextMenu").remove();});
            }
            $("#contextMenu div.context_menu_title").after(btn);
        });
    }

    function addBorders() {
        $("#itemInvetory div").removeClass('blueBorder');
        $("#itemInvetory div").removeClass('yellowBorder');

        for (ii in queueData.list) {
            var list_item = queueData.list[ii];
            if (!list_item) continue;
            if (list_item.status != "complete") {
                var id = list_item.item;
                if (list_item.action == "upgrade") $("div#" + id).addClass('blueBorder');
                if (list_item.action == "enhance") $("div#" + id).addClass('yellowBorder');
            }

        }

        for (ii in presetData.taggedItems) {
            $("#" + ii).prepend("<div class='greenBorder'></div>");
        }  
    };
    
    
    // save link to old function
    var oldOpen = CM.ChampionModalController.open;
    //override
    CM.ChampionModalController.open = function () {
        oldOpen();
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
    if (upgradeData.newUpgradeState == 0)
        $("#chtab>span").css('color', '#FFFF66');
    else if (upgradeData.newUpgradeState == 1)
        $("#chtab>span").css('color', 'cyan');
    else if (upgradeData.newUpgradeState == 2)
        $("#chtab>span").css('color', 'red');
}


var presetTimer = null;
var presetFailures = 0;

//callback handler when a preset button is presed
function processPresetClick(btn)
{
    // if there is a timer still running, kill it
    clearTimeout(presetTimer);
    
    // don't do anything if already the right preset
    if (btn == Seed.champion.activeSlot) {
        // redarw everything
        setPresetWidget(btn);
        unsafeWindow.cm.ChampView.renderChamp();
        unsafeWindow.cm.ChampView.renderStats();
        Tabs.organizer.show();
        //return;
    }

    // send message
    unsafeWindow.AjaxCall.gPostRequest(
            "ajax/_dispatch53.php",
            {
                ctrl: "ChampionRoom\\ChampionRoomServiceAjax",
                action: "setPreset",
                presetId: btn
            },
            function (v) {
                if (v.ok === true)
                {
                    presetFailures = 0;
                    // success
                    var H = Seed.champion.slotEquip[btn];
                    Seed.champion.activeSlot = btn;

                    // set the right items as equiped
                    $.each(unsafeWindow.kocChampionItems, function (I, J) {
                        C = $.inArray(J.equipmentId, H) > -1;
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
                    Tabs.organizer.show();
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


function updateTimerDisp () {

    var t = Tabs.upgrader;
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


var buffChanged = false;

function onUnload (){

    upgradeData.activeTab = $( "#ch_main" ).tabs( "option", "active"); 
    upgradeData.sortSelected = $("#chSortList").val();
    upgradeData.buffSelected = $("#chSortType").val();
    upgradeData.sortInactive = $("#chSortInactive").is(':checked');

    if (!ResetAll) saveUpgradeData();
}

function chMainTab (me){   // right-click on main button resets window
    if (me.button == 2){
        $( "#ch_dialog" ).dialog( "option", "position",  
                {my: "left top",
            at: "left+15 bottom+5",
            of: "#main_engagement_tabs"});
    }
}


function chHideShow (){
    if ($(document.querySelector("#ch_dialog")).dialog("isOpen")){
        $(document.querySelector("#ch_dialog")).dialog("close");
        upgradeData.chWinIsOpen = false;
    } else {
        $(document.querySelector("#ch_dialog")).dialog("open");
        upgradeData.chWinIsOpen = true;
        // clear the color
        upgradeData.newUpgradeState = 0;
        setUpgradeColor();
    }
    saveUpgradeData();
}

//Simple method, as if it were typed in thru DOM
function sendChat (msg){
    $(document.querySelector("#mod_comm_input")).val(msg);
    uW.Chat.sendChat ();
}

function AddMainTabLink(text, eventListener, mouseListener) {
    var label = "Champion Hall";

    var a=document.createElement('a');
    a.className='button20';
    a.innerHTML='<span style="color: #ff6">'+ label +'</span>';
    a.id = 'chtab';
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
            // gmTabs.style.background='#ca5';
            tabs.parentNode.insertBefore (gmTabs, tabs);
            gmTabs.style.whiteSpace='nowrap';
            gmTabs.style.width='735px';
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
        // if ( (x = rslt.errorMsg.indexOf ('<br><br>')) > 0)
        // rslt.errorMsg = rslt.errorMsg.substr (0, x-1);
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

function saveUpgradeData (){
    var serverID = getServerId();
    setTimeout (function (){GM_setValue ('UpgradeDataCH2_'+serverID, JSON2.stringify(upgradeData));}, 0);
}

function savePresetData (){
    var serverID = getServerId();
    setTimeout (function (){GM_setValue ('PresetDataCH2_'+serverID, JSON2.stringify(presetData));}, 0);
}

function saveQueueData (){
    var serverID = getServerId();
    setTimeout (function (){GM_setValue ('CHQData_'+serverID, JSON2.stringify(queueData));}, 0);
}

function saveSalvageData (){
    var serverID = getServerId();
    setTimeout (function (){GM_setValue ('SalvageDataCH2_'+serverID, JSON2.stringify(salvageData));}, 0);
}


function readCHGlobalOptions (){
    CHGlobalOptions = JSON2.parse (GM_getValue ('CHOptions_??', '{}'));
}

function readUpgradeData (){
    var serverID = getServerId();
    s = GM_getValue ('UpgradeDataCH2_'+serverID);
    if (s != null){
        opts = JSON2.parse (s);
        for (k in opts){
            if (matTypeof(opts[k]) == 'object')
                for (kk in opts[k])
                    upgradeData[k][kk] = opts[k][kk];
            else
                upgradeData[k] = opts[k];
        }
    }
}

function readPresetData (){
    var serverID = getServerId();
    s = GM_getValue ('PresetDataCH2_'+serverID);
    if (s != null){
        opts = JSON2.parse (s);
        for (k in opts){
            if (matTypeof(opts[k]) == 'object')
                for (kk in opts[k])
                    presetData[k][kk] = opts[k][kk];
            else
                presetData[k] = opts[k];
        }
    }
}

function readQueueData (){
    var serverID = getServerId();
    s = GM_getValue ('CHQData_'+serverID);
    if (s != null){
        opts = JSON2.parse (s);
        for (k in opts){
            if (matTypeof(opts[k]) == 'object')
                for (kk in opts[k])
                    queueData[k][kk] = opts[k][kk];
            else
                queueData[k] = opts[k];
        }
    }
}

function readSalvageData (){
    var serverID = getServerId();
    s = GM_getValue ('SalvageDataCH2_'+serverID);
    if (s != null){
        opts = JSON2.parse (s);
        for (k in opts){
            if (matTypeof(opts[k]) == 'object')
                for (kk in opts[k])
                    salvageData[k][kk] = opts[k][kk];
            else
                salvageData[k] = opts[k];
        }
    }

    // recreate the objects w/ functions
    for (k in salvageData.ruleSet)
    {
        var r = salvageData.ruleSet[k];
        var rule = new Rule(r.type, r.faction, r.conditions);
        for (j in rule.conditions)
        {
            rule.conditions[j].checkCondition = checkCondition;
        }
        salvageData.ruleSet[k] = rule;
    }
}

function loadSalvageData (domainId){

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
                    salvageData[k][kk] = opts[k][kk];
            else
                salvageData[k] = opts[k];
        }
    }

    // recreate the objects w/ functions
    for (k in salvageData.ruleSet)
    {
        var r = salvageData.ruleSet[k];
        var rule = new Rule(r.type, r.faction, r.conditions);
        for (j in rule.conditions)
        {
            rule.conditions[j].checkCondition = checkCondition;
        }
        salvageData.ruleSet[k] = rule;
    }

    // turn off
    salvageData.salvageActive = false;
    clearInterval(Tabs.champSalvage.sTimer);
    clearInterval(Tabs.champSalvage.delTimer);
    Tabs.champSalvage.deleting = false;
    saveSalvageData();
    alert('Salvage settings loaded from domain ' + domainId);
    Tabs.champSalvage.init(Tabs.champSalvage.myDiv);
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
//      else if (unsafeWindow.Object.prototype.toString.apply(v) === '[object
//      Array]')
        else if (v.constructor.toString().indexOf("Array")>=0 && typeof(v.splice)=='function')
            return 'array';
        else return 'object';
    }
    return typeof (v);
}


function unixTime (){
    return parseInt (new Date().getTime() / 1000) + unsafeWindow.g_timeoff;
}

/** ***************** Champion Savlager ********************* */


Tabs.champSalvage = {
        tabOrder    : 200,
        tabLabel    : 'Salvage',
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

            var m = '<Div><DIV  id=chSalvage class=chStat>AUTOMATED SALVAGE</div>';
            m += "<div id='chInfoArea'>";
            m += '</div>';
            m += '<TABLE class="chTabDef chTable" id=chUpgrader width =100% height=0% class=chTab style="padding-left: 20px;">';
            m += '<tr><th width=20%/><th width=30%/><th width=40%/><th/></tr>';
            if (salvageData.salvageActive == false) {
                m += '<tr><TD><div><INPUT id=chSalvagerPower type=button value="Salvager = OFF"/></div></td>';
            } else {
                m += '<tr><TD><div><INPUT id=chSalvagerPower type=button value="Salvager = ON"/></div></td>';
            }


            m += '<td colspan=3><b> City to put aetherstones: </b><div style="display: inline;" id=chSalvagerCity /></td>';

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

            m += '<td colspan=2 width=24%>Keep the first <INPUT id=chSaveNum type=text size=3 maxlength=3 value="' + salvageData.champSaveNum+ '"/> items</td>';
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
            //m += '  <option value="weapon">Weapon</option>';
            //m += '  <option value="shield">Shield</option>';
            //m += '  <option value="chest">Chest Armor</option>';
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
            m += '<div id=chRuleScroll style="position: static; width: 710px; height: 300px; overflow-x: hidden; overflow-y: auto;" >';
            m += "<div id='chRuleDisplay' >";
            m += '</div></div></div>';
            t.myDiv.innerHTML = m;

            Tabs.champSalvage.displayNumberSalvaged();

            document.getElementById('chSalvagerPower').addEventListener('click', function(){t.togglePower(this);} , false);

            new CdispCityPicker ('chcitysel', document.getElementById('chSalvagerCity'), true, t.e_CityButton, upgradeData.sCityNum);
            t.createRow();
            t.buildRuleDisplay();

            document.getElementById('chSaveNum').addEventListener('change', function(){
                salvageData.champSaveNum = parseInt(document.getElementById('chSaveNum').value);
                if (salvageData.champSaveNum < 0) salvageData.champSaveNum = 0;
                saveSalvageData();
            }, false);
            document.getElementById ('chSalvageQuality').addEventListener ('click', function() {t.setSalvageLevel(this.value);}, false);
            document.getElementById ('chSalvageQuality').value = salvageData.minQuality;

            document.getElementById ('chAddRow').addEventListener ('click', function() {t.createRow();}, false);
            document.getElementById ('chAddRule').addEventListener ('click', function() {t.createRule();}, false);

            $(document.querySelector("#chRuleScroll")).resizable({
                minWidth: 720,
                maxWidth: 1000,
                minHeight: 180,
                maxHeight: 700,
                stop: function(event, ui) {
                    upgradeData.salvageH =  ui.size.height + 'px';
                    upgradeData.salvageW =  ui.size.width  + 'px';
                    saveUpgradeData();
                }
            });

            $(document.querySelector("#chRuleScroll")).css('height', upgradeData.salvageH).css('width', upgradeData.salvageW);
            // this check makes sure upgrading before deleting is still profitable

            t.upgradeProfit = (5*CM.WorldSettings.getSettingAsNumber("AETHERSTONE_SALVAGE_MULTIPLIER", 500) > CM.thronestats.upgrade[1]["Stones"]); 
            t.start();
        },

        tripOdometer : function() {
            salvageData.numSalvagedItems2 = 0;
            var now = new Date();
            salvageData.since = now.valueOf();
            saveSalvageData();
            Tabs.champSalvage.init(Tabs.champSalvage.myDiv);
        },

        displayNumberSalvaged : function () {
            var since = "";
            var rate = "";
            var now = new Date();

            if (!salvageData.since) salvageData.since = now.valueOf();

            var sinceD = new Date(salvageData.since);

            since = sinceD.toDateString().substring(3,10) + " " + sinceD.toLocaleTimeString();
            var duration = now.valueOf() - salvageData.since +1;
            duration = duration / 1000.0;
            rate = " (" + addCommas(Math.round(salvageData.numSalvagedItems2 / duration * 86400)) + " per day)";

            $(document.querySelector("#chNumSalv")).html('<div style="text-align: center;"> '+ addCommas(salvageData.numSalvagedItems) + " items salvaged" 
                    + ', ' + addCommas(salvageData.numSalvagedItems2) + ' items since ' + since + rate +
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
            salvageData.minQuality = level;
            saveSalvageData();
        },

        pickCity : function () {
            var t = Tabs.champSalvage;
            var cid = upgradeData.sCityNum;
            if ( parseInt(Seed.resources["city" + Seed.cities[cid][0]]["rec5"][0]) <= salvageData.maxStones) return cid;

            var ind = -1;
            var lowest = 9999999;

            if (salvageData.anyCity)
            {
                for (i= 0; i < Seed.cities.length; i++)
                {
                    if (salvageData.overflow == "lowest")
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
                        if ( parseInt(Seed.resources["city" + Seed.cities[i][0]]["rec5"][0]) <= salvageData.maxStones) {
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

            for (i =0; i < salvageData.ruleSet.length; i++)
            {
                var rule = salvageData.ruleSet[i];

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

            for (var j=0; j < salvageData.ruleSet.length; j++)
            {
                document.getElementById('chDelRule' +j).v1 = j;
                document.getElementById('chDelRule' +j).addEventListener ('click', function() { t.deleteRule(this.v1);}, false);
            }

        },

        updateCHTab : function() {
            $(document.querySelector("#chexecsalvage")).html("Salvage " + (salvageData.salvageActive ? "ON" : "OFF"));
        },


        togglePower: function(obj){
            var t = Tabs.champSalvage;
            
            if (salvageData.salvageActive == true) {
                var btn = document.getElementById('chSalvagerPower');
                salvageData.salvageActive = false;
                btn.value = "Salvager = OFF";
                clearInterval(t.sTimer);
                clearInterval(t.delTimer);
                t.delItems = [];
                t.deleting = false;
            } else {
                salvageData.salvageActive = true;
                var btn = document.getElementById('chSalvagerPower');
                btn.value = "Salvager = ON";
                t.doSalvage();
                t.start();
            }
            saveSalvageData();
            t.updateCHTab();
        },

        // delete a rule from the ruleset
        deleteRule : function(i)
        {
            var t = Tabs.champSalvage;
            salvageData.ruleSet.splice(i,1);
            saveSalvageData();
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
                    
                    var c = new Condition(s1.value, s2.value, s3.value, s4.value, slots );
                    conditions.push(c);
                }
            }
            var rule1 = new Rule(cType, faction, conditions);
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
            salvageData.ruleSet.push(rule);
            saveSalvageData();
        },

        // callback for when salvage city is changed
        e_CityButton : function (city, x, y){
            var t = Tabs.champSalvage;
            upgradeData.sCityNum = city.idx;
            saveUpgradeData();
        },

        start : function(){
            var t = Tabs.champSalvage;
            if(salvageData.salvageActive) {
                t.sTimer = setInterval(t.doSalvage, 1*60*1000);
            }
        },

        // do the actual discard of champion items
        doSalvage : function() {
            var t = Tabs.champSalvage;

            t.setFullness();

            if(!salvageData.salvageActive) {
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

            var champSaveNum = salvageData.champSaveNum;
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
                if (champ_item.rarity >= salvageData.minQuality) continue;

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
            for (r in salvageData.ruleSet)
            {
                var rule = salvageData.ruleSet[r];
                if ( rule.applyRule(id)) return true;
            }
            return false;
        },

        // update items to +1 before deleting
        upgradeAndDelete : function () {
            //logit("upgradeAndDelete");
            var t = Tabs.champSalvage;

            if(!salvageData.salvageActive || t.delItems.length == 0) {
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
            if(!salvageData.salvageActive || !t.deleting) {
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
                num_city = +upgradeData.sCityNum;
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
                            
                            if (champ_item) chSalvageLog('Deleted champion item '+ champ_item.name);
                            salvageData.numSalvagedItems++;
                            salvageData.numSalvagedItems2++;
                            saveSalvageData();

                            if (champ_item) {
                                salvageData.numSalvaged[champ_item.rarity]++;
                                saveSalvageData();
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
function Rule(type, faction, conditions)
{
    this.type = type;
    this.faction = faction;
    if (conditions)
        this.conditions = conditions;
    else
        this.conditions = [];

    this.addCondition = addCondition;
    this.applyRule    = applyRule;
}

function cloneRule( rule)
{
    this.type = rule.type;
    this.faction = rule.faction;
    this.conditions = [];
    if (rule.conditions) this.conditions = rule.conditions;

    this.addCondition = addCondition;
    this.applyRule    = applyRule;
}

function addCondition(c)
{
    this.conditions.push(c);
}

var itemTypes = {"weapon": 1, "chest": 2, "shield": 5};

function applyRule(id)
{
    var champ_item = unsafeWindow.kocChampionItems[id];
    
    if (this.type != "any" && (itemTypes[this.type] != champ_item.type)) return false;
    if (this.faction != "any" && (this.faction != champ_item.faction)) return false;
    for (r in this.conditions)
    {
        if (!this.conditions[r].checkCondition(id)) return false;
    }
    return true;
}

function Condition(mustHave, number, effect, buffType, slots )
{
    this.mustHave = mustHave;
    this.number   = number;
    this.effect   = effect;
    this.buffType = buffType;
    this.slots    = slots;

    this.checkCondition = checkCondition;
}

function checkCondition(id)
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



/** **************** Throne organizer ********************* */

Tabs.organizer = {
        tabOrder: 300,
        tabLabel: 'Organize',
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
            var t = Tabs.organizer;
            
            t.itemTypes = unsafeWindow.cm.CHAMPION.getEquipmentNames(),
            // setup the lists for weapons, armor, etc.
            t.fillLists();
            t.myDiv = div;

            // setup the tab
            var m = '<Div><DIV id=chOrganizer class=chStat>ORGANIZER</div>';
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
            m += '<tr><TD width=20%><INPUT id=chTestSalvage type=button value=" Test Salvage "/></td><td id=chDelResults></td>';
            m += '</tr>';
            
            
           /* m += '<tr><td><div><span>View preset: </td><td><select id="chPresetList">';
            m += '<option value="0">--Presets--</option>';

            for (k= 1; k <= Seed.throne.slotNum; k++)
            {
                m += '<option value="'+k+'"> Preset:  '+ k +'</option>';
            }
            for (k= 0; k < presetData.num_presets; k++)
            {
                if (presetData.ids[k])
                    m += '<option value="local'+k+'"> Local:  '+ presetData.ids[k] +'</option>';
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
            if (presetData.num_presets > 0) {
                m += '<div id="preset_ch"> <b>: </b> </div></a>';
                m+= '<tr width=100%><td colspan=1><span style="width: 130px; float: left; margin-top: 4px;  margin-right: 4px;"> Local preset: </span>';
                m+= '</td><td colspan=3>';

                m += '<select id="chLocalPresetList" style="float: left;">';

                m += '<option value="-1">--Preset--</option>';
                for (a=0; a< presetData.num_presets; a++)
                {
                    m += '<option value="' + a + '">'+ presetData.ids[a] + '</option>';
                }
                m += '</select>';
                m += '<a style=" font-family: serif; margin-left: 10px;" class="button20" id=chLoad><span>Load</span></a>';
                m += '<a style=" font-family: serif; margin-left: 5px;" class="buttonDown20" id=chSave><span>Save</span></a>';
                m += '<span style="float: left; margin-top: 4px;  margin-right: 4px; margin-left: 10px;">';
                if (presetData.num_presets > 0)
                {
                    m += "Switch to slot <INPUT id=chPresetNumber type=text size=2 maxlength=2 value='" + parseInt(presetData.usePreset) + "' </input> when loading";
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

            for (level = 0; level <= maxChLevel; level++)
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

            m += '<td><INPUT id=chSortInactive type=checkbox '+ (  upgradeData.sortInactive ?' CHECKED':'') +'/> Include Inactive</td></tr>';


            m += '<tr><td colspan=4><hr/></td></tr>';
            m +='</table>';

            m += "<div id='chScrollDiv' style='position: static; width: " + upgradeData.organizeW + "; height: " + upgradeData.organizeH + "; overflow-x: auto; overflow-y: auto;'>";

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

            $(document.querySelector("#chScrollDiv")).resizable({
                minWidth: 710,
                maxWidth: 900,
                minHeight: 180,
                /*maxHeight: 560,*/
                maxHeight: 1000,
                stop: function(event, ui) {
                    upgradeData.organizeH = ui.size.height + 'px';
                    upgradeData.organizeW = ui.size.width  + 'px';
                    saveUpgradeData();
                }
            });

            //$("#chPresetList").click( function() {t.selectPreset( $(this).val());});
            $("#chTestSalvage").click(function() {t.testSalvage();});

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
                            $("#preset_ch").html('<b>' + presetData.ids[id] +':</b> ' + presetData.desc[id]);
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
                presetData.usePreset = $('#chPresetNumber').val();
                savePresetData();               
            });

            /*
            $(".loadGPreset").click( function () {
                var id= $(this).attr('id');
                processPresetClick(+id.split("chPresetNum")[1]);
            });
            */

            /*
            $(".loadPreset").click( function () {
                var id= $(this).attr('id');
                Tabs.organizer.loadLocalPreset(+id.split("chLoad")[1]);
            });
            */

            /*
            $("#chLoad").click( function () {
                var preset = $('#chLocalPresetList').val();
                if ( preset >= 0) Tabs.organizer.loadLocalPreset(preset);
            });
            */

            /*
            $("#chSave").click( function () {
                var preset = $('#chLocalPresetList').val();
                if ( preset >= 0) Tabs.organizer.saveLocalPreset(preset);
            });
            */

            $("#ch_factionFilterRow input").change( function() {
                t.show();
            });

            $("#ch_levelFilterRow input").change( function() {
                t.show();
            });

            $("#chSortList").val(upgradeData.sortSelected);
            $("#chSortType").val(upgradeData.buffSelected);
            t.sortEffect = upgradeData.sortSelected;
            t.sortType = upgradeData.buffSelected;

            t.show();

        },

        setSwitchStatus : function(s) {
            $("#chSwitchStatus").html(s); 
        },

        /*
        loadLocalPreset : function (id) {
            var t = Tabs.organizer;

            if (t.switchingPresets)
            {
                t.setSwitchStatus("Local preset switch still in prgres ....");
                return;
            }

            var items = presetData.items[id];            
            if (!items || items.length==0)
            {
                t.setSwitchStatus("Local preset is empty");
                return;
            }

            var c = 0;
            t.switchingPresets = true;

            var slot = parseInt(presetData.usePreset);

            if (!slot ) slot = parseInt(Seed.throne.activeSlot);

            // make sure it is in the valid range
            if (slot < 1 || slot > Seed.throne.slotNum)  slot = parseInt(Seed.throne.activeSlot);

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
                            Tabs.organizer.equipItem(I2, s);
                            Tabs.organizer.setSwitchStatus("Equipping " + I2.name); 
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
                Tabs.organizer.show(); 
                t.switchingPresets = false;
                t.setSwitchStatus("Local preset "+ presetData.ids[id] + " loaded.")
            }, c* delay*1000 + 1000);
        },

        saveLocalPreset : function (id) {            
            var equipedItems = {};
            var ei = Seed.throne.slotEquip[Seed.throne.activeSlot];

            // convert array to an object
            for (j=0; j < ei.length; j++) {
                equipedItems[j] = ei[j];
            }

            presetData.items[id] = equipedItems;
            savePresetData();
            Tabs.organizer.setSwitchStatus("Local preset " + presetData.ids[id] + " saved.");
        },

        */
        
        addTagItem : function (itemId) {
            presetData.taggedItems[itemId] = true;
            $("#" + itemId).prepend("<div class='greenBorder'></div>");
            $("td#ch_card" + itemId).find("div.chbox").append("<div class='greenBorder2' style='border: 4px solid cyan; background: none; width: 228px; height: 255px;'></div>");
            savePresetData();
        },

        removeTagItem : function (itemId) {
            if (presetData.taggedItems[itemId])
            {
                delete presetData.taggedItems[itemId];
                $("#" + itemId).children(".greenBorder").remove();
                $("td#ch_card" + itemId).find("div.greenBorder2").remove();
                savePresetData();
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
                    Tabs.organizer.show();
                } else {
                    if (I && I.name) {
                        Tabs.organizer.setSwitchStatus("Unable to equip item " + I.name);
                    } else {
                        Tabs.organizer.setSwitchStatus("Unable to equip item");
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
            var t = Tabs.organizer;
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
        testSalvage : function() {
            var t = Tabs.organizer;
            var s = Tabs.champSalvage;
            var toDelete = s.buildList(true);

            $('#chDelResults').html("<div> " + toDelete.length + " item(s) targeted for deletion</div>");

            for (i =0; i < toDelete.length; i++)
            {
                var item = unsafeWindow.kocChampionItems[toDelete[i]];
                
                if (item.equippedTo  )
                {
                    t.selectCard(toDelete[i], "orange");
                }
                else
                {
                    t.selectCard(toDelete[i], "red");
                }
            }
        },

        paintTable : function() {
            // fill in the table
            var t = Tabs.organizer;
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
                d2.style.height = (TABLE_SCALE * h) + "px";
                d2.style.width  = (TABLE_SCALE * w) + "px";
            }

            $(".chCardDisp").click( function( A){
                var theId = $(this).attr("id").split("chCardItem")[1];
                unsafeWindow.cm.ContextualMenuThrone.renderMenu( $(this), unsafeWindow.kocChampionItems[theId]);
            });

            // add the large tooltip

            /*
            if (presetData.noTooltips != true) $("td.chcard").on("mouseenter", "*", function (A) {
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
                    setTimeout( function () {Tabs.organizer.show();}, 200);    
                }
            });
            */

            /*
            if (presetData.noTooltips != true) $("td.chcard").on( "mouseleave", "*", function (A) {
                var theId = $(this).parents("td.chcard").attr("id").split("card")[1];
                if (unsafeWindow.kocChampionItems[theId]) {}
                //unsafeWindow.cm.ThroneView.unhoverItem(A, this, unsafeWindow.kocChampionItems[theId])
            });
            */

            // add yellow and blue borders
            
            $("div.chbox").removeClass("blueBorder2");
            $("div.chbox").removeClass("yellowBorder2");
            $("div.chbox").children("div.greenBorder2").remove();

            for (ii in queueData.list) {
                var list_item = queueData.list[ii];
                if (!list_item) continue;
                if (list_item.status != "complete") {
                    var id = list_item.item;

                    if (list_item.action == "upgrade") $("td#ch_card" + id).find("div.chbox").addClass("blueBorder2");
                    if (list_item.action == "enhance") $("td#ch_card" + id).find("div.chbox").addClass("yellowBorder2");
                }
            }

            for (ii in presetData.taggedItems) {
                $("td#ch_card" + ii).find("div.chbox").append("<div class='greenBorder2' style='border: 4px solid cyan; background: none; width: 228px; height: 255px;'></div>");
            }


        },


        // fill the lists w/ the current TR items
        fillLists : function ()
        {
            var t = Tabs.organizer;

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
            var t = Tabs.organizer;
            upgradeData.sortInactive = $("#chSortInactive").is(':checked');
            for (i in t.itemLists)
            {
                t.itemLists[i].sort( function (item1, item2) {
                    return t.sortValue(item2) - t.sortValue(item1);
                });
            }
        },

        sortValue : function (item)
        {
            var t = Tabs.organizer;
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

                    if (B> quality && !upgradeData.sortInactive)
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
            var t = Tabs.organizer;

            for (k in unsafeWindow.kocChampionItems)
            {
                var champ_item = unsafeWindow.kocChampionItems[k];
                t.selectCard(champ_item.equipmentId, "white");
            }

        },

        // highlight a card
        selectCard : function(itemId, color)
        {
            var t = Tabs.organizer;
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
            var t = Tabs.organizer;
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
            var t = Tabs.organizer;
            
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
            var t = Tabs.organizer;
            t.fillLists();
            t.sortLists()
            t.paintTable();
            //t.selectPreset(document.getElementById ('chPresetList').value);
        },

        hide: function(){
        }
}


/** ********************************* Log Tab ********************************** */
Tabs.chActionLog = {
        tabOrder: 600,
        tabLabel : 'Log',
        myDiv : null,
        logTab : [null, null, null],
        maxEntries: 300,
        saveEntries : [[],[],[]],
        state : null,

        init : function (div){
            var t = Tabs.chActionLog;
            t.myDiv = div;
            t.myDiv.innerHTML = '<div id=ch_logScroll style=" position: static; width: 710px; height: 500px; overflow-x: hidden; overflow-y: auto;" >\
                <DIV class=chStat>UPGRADE LOG - VERSION: '+ Version+'</div>\
                <DIV style="height:535px; max-height:535px;">\
                <TABLE cellpadding=0 cellspacing=0 id=chsuccesslog class=chTabLined width=100%><TR><TD width=20%></td><TD width=80%></td></tr></table>\
                <DIV class=chStat>Action Log</div>\
                <TABLE cellpadding=0 cellspacing=0 id=chActionlog class=chTabLined  width=100%><TR><TD width=20%></td><TD width=80%></td></tr></table>\
                <DIV class=chStat>Salvage Log</div>\
                <TABLE cellpadding=0 cellspacing=0 id=chsalvagelog class=chTabLined  width=100%><TR><TD width=20%></td><TD width=80%></td></tr></table></div></div>';
            t.logTab[0]  = document.getElementById('chsuccesslog');
            t.logTab[1]  = document.getElementById('chActionlog');
            t.logTab[2]  = document.getElementById('chsalvagelog');
            t.state = 1;

            for (var j=0; j<3; j++)
            {
                var logVar = 'chlog_';
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

            $("#ch_logScroll").resizable({
                minWidth: 710,
                maxWidth: 1000,
                minHeight: 180,
                maxHeight: 1100,
                stop: function(event, ui) {
                    upgradeData.logH = ui.size.height + 'px';
                    upgradeData.logW = ui.size.width  + 'px';
                    saveUpgradeData();
                }
            });

            $("#ch_logScroll").css('height', upgradeData.logH).css('width', upgradeData.logW);
        },

        hide : function (){
        },

        show : function (){
        },

        onUnload : function (){
            var t = Tabs.chActionLog;
            if (!ResetAll) GM_setValue ('chlog_'+getServerId(),  JSON2.stringify(t.saveEntries[0]));
            if (!ResetAll) GM_setValue ('chlog_1_'+getServerId(), JSON2.stringify(t.saveEntries[1]));
            if (!ResetAll) GM_setValue ('chlog_2_'+getServerId(), JSON2.stringify(t.saveEntries[2]));
        },

        _addTab : function (lnum, msg, ts){
            var t = Tabs.chActionLog;
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
            var t = Tabs.chActionLog;
            var d = new Date();
            var ts = d.toDateString().substring(3,10) + " "+ d.toTimeString().substring(0,8);
            t._addTab (lnum, msg, ts);
            while (t.saveEntries[lnum].length >= 30)
                t.saveEntries[lnum].shift();
            t.saveEntries[lnum].push ({msg:msg, ts:ts});
        }
}

function chSuccessLog (msg){
    if (!Tabs.chActionLog.tabDisabled)
        Tabs.chActionLog.log (0,msg);
}

function chActionLog (msg){
    if (!Tabs.chActionLog.tabDisabled)
        Tabs.chActionLog.log (1,msg);
}

function chSalvageLog (msg){
    if (!Tabs.chActionLog.tabDisabled)
        Tabs.chActionLog.log(2,msg);
}

/** ***************** options ********************* */

Tabs.options = {
        tabOrder: 700,
        tabLabel: 'Options',
        myDiv : null,

        init : function (div) {
            var t = Tabs.options;
            t.myDiv = div;

            // header stuff
            var m = '<Div id=ch_optionScroll style=" position: static; width: 700px; height: 500px; overflow-x: hidden; overflow-y: auto;">';
            m += '<DIV id=CHOptions class=chStat>OPTIONS</div><TABLE id=chOptionTbl width=100% height=0% class=chTab>';
            m += '<TR><TD width=100%><INPUT id=chupdate type=checkbox '+ (CHGlobalOptions.chUpdate?'CHECKED ':'') +'/>Check for script updates on userscripts.org (all domains) &nbsp; &nbsp; <INPUT id=chupdatenow type=button value="Update Now" /></TD></TR>';
            //m += '<TR><TD width=100%><INPUT id=chDisableAnim type=checkbox '+ (upgradeData.disableAnim?'CHECKED ':'') +'/> Disable failure animation (Big red X) </TD></TR>';
            //m += '<TR><TD width=100%><INPUT id=chPresetOption type=checkbox '+ (upgradeData.presetWidget?'CHECKED ':'') +'/> Enable preset selector widget (requires refresh)</TD></TR>';

            m += '<TR><td><div  class=chStat>Salvage Options</div></td></TR>';
           //m += '<tr><td><div>Load salvager settings from domain number: <INPUT id=chLoadDomain type=text size=3 maxlength=3 /><INPUT id=chLoadRules type=button value="Load"/></div></td></tr>';
            m += '<TR><TD><div style="white-space: pre;" ><INPUT id=chSalAnyCity type=checkbox '+ (salvageData.anyCity?' CHECKED':'') +'/> When primary city is full, put aetherstones in any city. ';
            m += '    Maximum number of aetherstones: <INPUT id=chMaxStone type=text size=7 maxlength=7 value="' + salvageData.maxStones+ '"/></div></td></TR>';
            m += '<TR><TD>Overflow method: <select id=chOverflow><option value="order">City order</option><option value="lowest">Lowest city</option>  </select></TD></TR>';
            //m += '<TR><TD><div style="white-space: pre;" ><INPUT id=chSalUpgradeFirst type=checkbox '+ (salvageData.upgradeFirst?' CHECKED':'') +'/> Upgrade items to +1 before deleting.';

            /*
            m += ' Maximum quality: <select id="chSalUpgradeQuality">';
            m += '<option value="0">'+ uW.g_js_strings.throneRoom.simple +'</option>';
            m += '<option value="1">'+ uW.g_js_strings.throneRoom.common +'</option>';
            m += '<option value="2">'+ uW.g_js_strings.throneRoom.uncommon +'</option>';
            m += '<option value="3">'+ uW.g_js_strings.throneRoom.rare +'</option>';
            m += '<option value="4">'+ uW.g_js_strings.throneRoom.epic +'</option>';
            m += '<option value="5">'+ uW.g_js_strings.throneRoom.wondrous +'</option>';
            m += '</select> </div></td></tr>';
            */

            //m += '<TR><TD><div style="white-space: pre;" ><INPUT id=chSalUpgradeManual type=checkbox '+ (salvageData.upgradeManual?' CHECKED':'') +'/> Upgrade items to +1 on manual delete.</td></tr>';

            m += '<TR><td><div  class=chStat>Upgrade Options</div></td></TR>';
            m += '<tr><td width=25%>Retry interval (seconds): <INPUT id=chUpRefresh type=text size=3 maxlength=3 value="' +upgradeData.retryInterval+ '"/></td></tr>';
            m += '  <tr><td colspan=2><div style="white-space: pre;"><INPUT id=chAnyCity type=checkbox '+ (upgradeData.anyCity?' CHECKED':'') +'/> When primary city is low, use aetherstones from any city.  ';
            m += ' Minimum number of aetherstones: <INPUT id=chMinStone type=text size=7 maxlength=7 value="' +upgradeData.minStones+ '"/> </div></td></tr>';
            m += '<tr><td colspan=2>  <INPUT id=chWhisperCheck type=checkbox '+ (upgradeData.whisperToMe?'CHECKED ':'') +'/> Whisper to myself on successful upgrades</td></tr> ';
            //m += '<tr><td colspan=2>  <INPUT id=chBuffsCheck type=checkbox '+ (upgradeData.buffsOff?'CHECKED ':'') +'/> Prevent Kabam from automatically selecting upgrade tokens</td></tr> ';
            //m += '<tr><td colspan=2><INPUT id=chSafetyCheck type=checkbox '+ (upgradeData.safetyOn?'CHECKED ':'') +'/> Disable manual upgrades if less than <input id=chSafetyLimit size=10 maxlength=10 value="' + upgradeData.safetyLimit +'" /> aetherstone</td></tr> ';
            //m += '<tr><td colspan=2><INPUT id=chTokenCheck type=checkbox '+ (upgradeData.removeTokens?'CHECKED ':'') +'/> Remove master and lucky tokens from upgrade panel </td></tr> ';
            //m += '<tr><td colspan=2><INPUT id=chMultiUp type=checkbox '+ (upgradeData.multiUpgrade?'CHECKED ':'') +'/> Add button for combined upgrade/enhancement</td></tr> ';
            //m += '<tr><td colspan=2><INPUT id=chNoMassS type=checkbox '+ (upgradeData.noMassSalvage?'CHECKED ':'') +'/> Remove button for Mass Salvage</td></tr> ';
            //m += '<tr><td colspan=2><INPUT id=chSalvageSafety type=checkbox '+ (upgradeData.salvageSafety?'CHECKED ':'') +'/> Remove Salvage button for the first <INPUT id=chSafetyNum type=text size=3 maxlength=3 value="' +upgradeData.numSafety+ '"/> items</td></tr> ';

            m += '<TR><td><div  class=chStat>Organizer Options</div></td></TR>';
            
            /*
            m += '<TR><td><div style="text-align:center;"> Local Preset Names/Descriptions</div></td></TR>';

            for (j=0; j<presetData.num_presets; j++ ) 
            {
                if (!presetData.desc[j]) presetData.desc[j] = 'Preset ' + String.fromCharCode(65 + j);
                if (!presetData.ids[j]) presetData.ids[j] = String.fromCharCode(65 + j);
                m += '<tr><td style="width: 650px; white-space: nowrap;">Name: <INPUT class=chNameEntry id=chPresetName' + j + ' type=text size=8 maxlength=8 value="' + presetData.ids[j] + '"/> Description: <INPUT class=chDescEntry id=chPresetDesc' +j+' type=text size=80 maxlength=100 value="' + presetData.desc[j] + '"/></td></tr>';
            }

            m += '<TR><TD><div style="white-space: pre;" >Number of presets: <INPUT id=chNumPresets type=text size=4 maxlength=2 value="' +presetData.num_presets+ '"/>  <INPUT id=chNoTooltips type=checkbox '+ (presetData.noTooltips?' CHECKED':'') +'/> Do not show large portrait tooltips</div></td></tr>';
            */
            
            m += '</table></div>';

            t.myDiv.innerHTML = m;

            $("#ch_optionScroll").resizable({
                minWidth: 710,
                maxWidth: 810,
                minHeight: 300,
                maxHeight: 780,
                stop: function(event, ui) {
                    upgradeData.optionH =  ui.size.height + 'px';
                    upgradeData.optionW =  ui.size.width  + 'px';
                    saveUpgradeData();
                }
            });

            $("#ch_optionScroll").css('height', upgradeData.optionH).css('width', upgradeData.optionW);

            /*
            $('#chDisableAnim').change( function (){
                upgradeData.disableAnim = document.getElementById('chDisableAnim').checked;
                disableAnimation(upgradeData.disableAnim);
                saveUpgradeData();
            }
            );
            */

            /*
            $('#chPresetOption').change( function (){
                upgradeData.presetWidget = document.getElementById('chPresetOption').checked;
                saveUpgradeData();
            }
            );
            */

            $('#chupdate').change( function (){
                CHGlobalOptions.chUpdate = document.getElementById('chupdate').checked;
                GM_setValue ('CHOptions_??', JSON2.stringify(CHGlobalOptions));
            }
            );

            $('#chWhisperCheck').change( function (){
                upgradeData.whisperToMe = document.getElementById('chWhisperCheck').checked;
                saveUpgradeData();
            }
            );

            $('#chSafetyCheck').change( function (){
                upgradeData.safetyOn = document.getElementById('chSafetyCheck').checked;
                saveUpgradeData();
            }
            );

            $('#chTokenCheck').change( function (){
                upgradeData.removeTokens = document.getElementById('chTokenCheck').checked;
                saveUpgradeData();
            }
            );

            $('#chMultiUp').change( function (){
                upgradeData.multiUpgrade = document.getElementById('chMultiUp').checked;
                saveUpgradeData();
            }
            );

            $('#chNoMassS').change( function (){
                upgradeData.noMassSalvage = document.getElementById('chNoMassS').checked;
                saveUpgradeData();
            });

            $('#chSalvageSafety').change( function (){
                upgradeData.salvageSafety = document.getElementById('chSalvageSafety').checked;
                saveUpgradeData();
            });

            $("#chSafetyNum").change ( function() {
                upgradeData.numSafety = parseInt($("#chSafetyNum").val()); 
                saveUpgradeData();
            });


            $('#chBuffsCheck').change( function (){
                upgradeData.buffsOff = document.getElementById('chBuffsCheck').checked;
                saveUpgradeData();
            }
            );

            $('#chSafetyLimit').change( function (){
                upgradeData.safetyLimit = parseInt($("#chSafetyLimit").val());
                saveUpgradeData();
            }
            );

            $('#chupdatenow').click(
                    function() { AutoUpdater_183854.call(true,true); }
            );

            $('#chSalAnyCity').change( function(){
                salvageData.anyCity = document.getElementById('chSalAnyCity').checked;
                saveSalvageData();
            });

            /*
            $('#chSalUpgradeManual').change( function(){
                salvageData.upgradeManual = document.getElementById('chSalUpgradeManual').checked;
                saveSalvageData();
            });
            */

            // set the upgrade quality limit widget
            //$("#chSalUpgradeQuality").val(salvageData.upgradeFirstQual);
            //$("#chSalUpgradeQuality").change( function() { salvageData.upgradeFirstQual = $("#chSalUpgradeQuality").val(); saveSalvageData();});

            $("#chMaxStone").change ( function() {
                salvageData.maxStones = $("#chMaxStone").val(); 
                saveSalvageData();
            });

            $('#chUpRefresh').change( function(){
                upgradeData.retryInterval = parseInt(document.getElementById('chUpRefresh').value);
                if (upgradeData.retryInterval < 15) upgradeData.retryInterval = 15;
                saveUpgradeData();
            });

            $("#chMinStone").change ( function() {
                upgradeData.minStones = $("#chMinStone").val(); 
                saveUpgradeData();
            });

            $("#chLoadRules").click(function () {
                var d = $("#chLoadDomain").val();
                if (d != null)
                    loadSalvageData(d);
            });

            // set the overflow widget
            $("#chOverflow").val(salvageData.overflow);
            $("#chOverflow").change( function() { salvageData.overflow = $("#chOverflow").val(); saveSalvageData();});


            // read the preset names and descriptions
            $("input.chNameEntry").change(function ()  {
                var id= $(this).attr('id');
                var num = id.split("chPresetName")[1];
                presetData.ids[num]= $(this).val();
                savePresetData();
                Tabs.organizer.init(Tabs.organizer.myDiv);
            });

            $("input.chDescEntry").change (function ()  {
                var id= $(this).attr('id');
                var num = id.split("chPresetDesc")[1];
                presetData.desc[num]= $(this).val();
                savePresetData();
                Tabs.organizer.init(Tabs.organizer.myDiv);
            });

            $('#chNoTooltips').change( function(){
                presetData.noTooltips = document.getElementById('chNoTooltips').checked;
                savePresetData();
                Tabs.organizer.show();

            });

            $("#chNumPresets").change ( function() {
                var newNum  = $("#chNumPresets").val(); 
                if (presetData.num_presets != newNum)
                {
                    presetData.num_presets = newNum;
                    t.init(t.myDiv);
                    savePresetData();
                    Tabs.organizer.init(Tabs.organizer.myDiv);
                }
            });


            //disableAnimation(upgradeData.disableAnim);
        },


        show : function () {

        },

        hide : function () {

        }

}

/** ***************** Throne upgrade ********************* */

Tabs.upgrader = {
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
           uW.g_js_strings ?uW.g_js_strings.throneRoom.wondrous : "Wondrous"],
           upgradePath : {
               0: {maxLev: 2, nextQual: 2 },
               1: {maxLev: 2, nextQual: 2 },
               2: {maxLev: 3, nextQual: 4 },
               3: {maxLev: 3, nextQual: 4 },
               4: {maxLev: 4, nextQual: 5 }
           },

           repaint : function() {
               var t = Tabs.upgrader;
               t.init(t.myDiv);
           },

           init : function (div){
               var t = Tabs.upgrader;
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
               var m = '<Div id=chfield><DIV id=chUpgrader class=chStat>AUTOMATED UPGRADER</div><TABLE id=chUpgrader width=100% height=0% class=chTab>';
               m+= '</table></div>';

               // 
               m += '<TABLE width=100% id=chupdtable class=chTabPad>';

               m += '<tr>';
               if (upgradeData.active == false) {
                   m += '<TD width=25%><div><INPUT id=chUpgraderPower type=button value="Upgrade = OFF"/></div></td>';
               } else {
                   m += '<TD width=25%><div><INPUT id=chUpgraderPower type=button value="Upgrader = ON"/></div></td>';
               }

               m += '<td width=25%><INPUT id=chOneItem type=checkbox '+ (queueData.oneItem ? ' CHECKED':'') +'/>  Upgrade 1 at a time</td>';
               m += '<td width=25%><INPUT id=chRepairAll type=checkbox '+ (upgradeData.repairAll?' CHECKED':'') +'/>  Repair all items</td>'; 
               m += '<td width=25%/></tr>';

               m += '  <tr><td colspan=3><div ><b>City to use aetherstones from: </b><span id="chUpgradeCity"></span></div></td>';
               m += '  <td><div id=chStoneRemain></div></td></tr>';
               m += '<tr><td colspan=4><hr></td></tr>';
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
               m += '<tr><td colspan=4><hr/</td></tr>';
               m += '<tr><td colspan=4><div id=chQScroll style=" position: static; width: 700px; height: 300px; overflow-x: visible; overflow-y: auto;"><div id=chQDiv /></div></td></tr>';

               m += '<tr align=center><div><td><input style="float: left;" id=chClearQ type=button value="Clear Queue"/></div></td><td colspan=1></td><td colspan=2><a id=chpplink><img id=chpp /></a></td></tr>';
               m += '</table>';

               m+='</div>';
               t.myDiv.innerHTML = m;

               $('#chClearQ').click( function() {
                   queueData.list =[];
                   saveQueueData();
                   Tabs.upgrader.buildQueueDisplay();
               });

               $("#chQScroll").resizable({
                   minWidth: 710,
                   maxWidth: 1200,
                   minHeight: 200,
                   maxHeight: 800,
                   stop: function(event, ui) {
                       upgradeData.upgradeH =  ui.size.height + 'px';
                       upgradeData.upgradeW =  ui.size.width  + 'px';
                       saveUpgradeData();
                   }
               });

               $("#chQScroll").css('height', upgradeData.upgradeH).css('width', upgradeData.upgradeW);

               $("#chpplink")
               .attr('href', 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=FDW4NZ6PRMDMJ&lc=US&item_name=TR%20Organizer%20Donations&item_number=1001&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted')
               .attr('target', '_blank');
               $("#chpp")
               .attr( 'src', 'https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif')
               .attr( 'alt', 'dontae')
               .css( 'cursor', 'pointer');

               document.getElementById('chUpgraderPower').addEventListener('click', function(){t.togglePower(this);} , false);

               document.getElementById('chRepairAll').addEventListener('change', function(){
                   upgradeData.repairAll = document.getElementById('chRepairAll').checked;
                   saveUpgradeData();
               }, false);

               document.getElementById('chAnyCity').addEventListener('change', function(){
                   upgradeData.anyCity = document.getElementById('chAnyCity').checked;
                   saveUpgradeData();
               }, false);

               new CdispCityPicker ('chupcitysel', document.getElementById('chUpgradeCity'), true, t.e_CityButton, upgradeData.uCityNum);

               // wait for the current repair to finish before starting
               t.setStones( Seed.resources["city" + Seed.cities[upgradeData.uCityNum][0]]["rec5"][0]);
               t.setStatus("Loading ....");

               //$(div).append(m);
               $("#chQDiv").html('<div><table id="chQueue" class="chTabLined" width="100%"/></div>');

               $("#chQueueAdd").click( function () { t.addQueue();});
               $("#chOneItem").change( function () { 
                   queueData.oneItem = document.getElementById('chOneItem').checked;
                   saveQueueData();
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

           e_CityButton : function (city, x, y){
               var t = Tabs.upgrader;
               upgradeData.uCityNum = city.idx;
               saveUpgradeData();
               t.setStones(Seed.resources["city" + Seed.cities[upgradeData.uCityNum][0]]["rec5"][0]);
           },

           addUpgradeItem : function(id) {
               var t = Tabs.upgrader;
               var qItem = new QueueItem();
               qItem.item   = id;
               qItem.action = "upgrade";
               qItem.level  = maxChLevel;
               queueData.list.push(qItem);
               saveQueueData();
               $("div#" + id).addClass('blueBorder');
               $("td#ch_card" + id).find("div.chbox").addClass('blueBorder2');
               t.buildQueueDisplay();
           },

           addEnhanceItem : function(id) {
               var t = Tabs.upgrader;
               var qItem = new QueueItem();
               qItem.item   = id;
               qItem.action = "enhance";
               qItem.level  = 5;
               queueData.list.push(qItem);
               saveQueueData();
               $("div#" + id).addClass('yellowBorder');
               $("td#ch_card" + id).find("div.chbox").addClass("yellowBorder2");
               t.buildQueueDisplay();
           },

           addBothItem : function (id) {
               var t = Tabs.upgrader;

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
                       queueData.list.push(qItem);
                       $("div#" + id).addClass('blueBorder');
                       $("td#ch_card" + id).find("div.chbox").addClass("blueBorder2");
                   }

                   qItem = new QueueItem();
                   qItem.item   = id;
                   qItem.action = "enhance";
                   qItem.level  = nextQual;
                   queueData.list.push(qItem);
                   $("div#" + id).addClass('yellowBorder');
                   $("td#ch_card" + id).find("div.chbox").addClass("yellowBorder2");
                   lev = maxLev;
                   qual = nextQual;
               }

               saveQueueData();
               t.buildQueueDisplay();
           },

           doAction :function ()
           {
               var t = Tabs.upgrader;
               var retryTime = upgradeData.retryInterval;

               try {
                   // check if repair is done
                   var ti = t.clearRepair();
                   if ( ti <= 0)
                   {  
                       // repair is done
                       if (queueData.oneItem || (queueData.doingRepairs == true))
                       {
                           if (upgradeData.repairAll == true)
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
                               for (k in queueData.list)
                               {
                                   var q = queueData.list[k];
                                   if (!q) continue;
                                   var champ_item = unsafeWindow.kocChampionItems[q.item];
                                   if ((champ_item == null) || (queueData.list[k].status == "complete"))
                                       continue;

                                   if (champ_item.status == CM.CHAMPION.STATUS_BROKEN_UPGRADE || champ_item.status == CM.CHAMPION.STATUS_BROKEN_ENHANCE)
                                   {
                                       t.doRepair(champ_item.equipmentId);
                                       clearTimeout(t.timerH);
                                       t.timerH = setTimeout(t.doAction, retryTime*1000);
                                       return;
                                   }  else if (queueData.oneItem) {
                                       break;
                                   }
                               }
                           }
                       }

                       // all repairs complete
                       queueData.doingRepairs = false;
                       // set the index
                       t.selectNext();
                       saveQueueData();

                       // if we reach the end of the queue, start repair cycle
                       if (queueData.index <0) {
                           t.setStatus("Reached end of queue.")
                           queueData.doingRepairs = true;
                           saveQueueData();
                           clearTimeout(Tabs.upgrader.timerH);
                           t.timerH = setTimeout(t.doAction, retryTime*1000);
                           return;
                       }

                       // upgrade/enhance next item
                       var qItem = queueData.list[queueData.index];

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
               clearTimeout(Tabs.upgrader.timerH);
               t.timerH = setTimeout(t.doAction, retryTime*1000);
           },

           selectNext : function () {

               if (queueData.index >= queueData.list.length) queueData.index = 0;
               if (queueData.index < 0) queueData.index = 0;

               // for single item mode, always start from the top
               if (queueData.oneItem) queueData.index = 0; 

               var l = queueData.list.length;
               for (i=queueData.index; i < l; i++ ) {
                   var item = queueData.list[i];
                   if (!item) continue;
                   //var id = item.item;
                   var champ_item = unsafeWindow.kocChampionItems[item.item];
                   if ( (queueData.list[i].status != "complete") 
                           && ( champ_item != null) 
                           && ! (champ_item.status == CM.CHAMPION.STATUS_BROKEN_UPGRADE || champ_item.status == CM.CHAMPION.STATUS_BROKEN_ENHANCE) )
                   {
                       if ( ((item.action == "enhance") && (item.level <= champ_item.rarity)) ||
                               ((item.action == "upgrade") && (item.level <= champ_item.level)) ) {
                           item.status = "complete";
                       }  else {
                           queueData.index = i;
                           return;
                       }
                   }
               }

               // if we get here, the queue is complete
               queueData.index = -1;
           },

           doEnhance : function(eItem) {
               //logit("enhance");
               var t = Tabs.upgrader;
               try {
                   if (upgradeData.active == false ||  eItem ==0)
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
                       t.setStatus("Not enough aetherstones to enhance.  Minimum of " + upgradeData.minStones + " needed.  Waiting for more ...");
                       return;
                   }

                   var z = CM.WorldSettings.getSettingAsObject("CE_ENHANCE_AETHERSTONE_MAP");
                   var w = z[parseInt(y.rarity) + 1].Aetherstones;

                   if ( w > parseInt(Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0]) )
                   {
                       t.setStatus("Not enough aetherstones to enhance.");
                       return; 
                   }

                   var qI = queueData.list[queueData.index];
                   if (qI)
                   {

                       qI.triesTotal++;
                       qI.triesThis++;
                   }

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
                                   Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0] = Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0] - rslt.aetherstones;
                                   if (rslt.gems > 0)
                                   {
                                       chActionLog('Upgrader accidentally spent gems!  Upgrader turned off');
                                       t.setStatus("Error ... shutting down");
                                       upgradeData.active = false;
                                       saveUpgradeData();
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
                                       Tabs.upgrader.repaint();
                                       t.setResult("Enhance successful.  "  + addCommas(rslt.aetherstones) + " aetherstones used.");
                                       t.setStones(Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0]);
                                       t.setStatus("Attempting next action");
                                       unsafeWindow.cm.sounds.play("ch_success_build");
                                       // update the cost line
                                       var qItem = queueData.list[queueData.index];
                                       if (qItem)
                                       {
                                           var now = new Date();
                                           qItem.lastUpgrade = "Enhanced to " + Tabs.upgrader.qualities[y.rarity] + " " + now.toDateString().substring(3,10) + " " + now.toTimeString().substring(0,8)  + " in " + qItem.triesThis + " attempts";
                                           if (!qItem.upgrades) qItem.upgrades = [];
                                           qItem.upgrades.push(qItem.lastUpgrade);

                                           var msg = 'Enhanced '+unsafeWindow.kocChampionItems[eItem].name + ' [ ' + eItem + '] to quality ' + rslt.rarity + " in " + qItem.triesThis + " attempts. " + qItem.triesTotal + " total attempts for this item.";
                                           chSuccessLog(msg);
                                           if (upgradeData.whisperToMe) sendChat("/"+ Seed.player.name +' ' + msg);

                                           if (qItem.level <= y.rarity) {
                                               qItem.status = "complete";
                                               upgradeData.newUpgradeState = 2;
                                           }
                                           else {
                                               var now = new Date();
                                               qItem.status = "Partially enhanced";
                                               qItem.triesLast = qItem.triesThis;
                                               qItem.triesThis = 0;
                                               if (upgradeData.newUpgradeState !=2 ) upgradeData.newUpgradeState =1;
                                           }
                                           saveUpgradeData();
                                           setUpgradeColor();
                                       }
                                       saveQueueData();
                                       Tabs.upgrader.buildQueueDisplay();
                                       clearTimeout(Tabs.upgrader.timerH);
                                       t.timerH = setTimeout(t.doAction, 10* 1000);
                                   }
                                   else
                                   {
                                       logit("enhance failed");
                                       chActionLog('Enhance failed Throne room item '+unsafeWindow.kocChampionItems[eItem].name);
                                       if (rslt.broken == "yes") 
                                       {
                                           y.status = CM.CHAMPION.STATUS_BROKEN_ENHANCE;
                                       }

                                       y.name = y.createName();
                                       t.setResult("Enhance failed.  "  + addCommas(rslt.aetherstones) + " aetherstones used");
                                       t.setStones(Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0]);
                                       //t.setStatus("Starting repair ...");
                                       var qItem = queueData.list[queueData.index];
                                       if (qItem)  if (qItem.status == "not started") qItem.status = "started";
                                       saveQueueData();
                                       Tabs.upgrader.buildQueueDisplay();
                                       clearTimeout(Tabs.upgrader.timerH);
                                       Tabs.upgrader.timerH = setTimeout(t.doAction, 10*1000);
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
               var t = Tabs.upgrader;
               var y = unsafeWindow.kocChampionItems[uItem];
               if ( uItem ==0 || y == null)
               {
                   t.setStatus("Item not found.");
                   return;
               }

               if ( (upgradeData.active == false) && (bypass !=true))
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
                   t.setStatus("Not enough aetherstones to upgrade.  Minimum of " + upgradeData.minStones + " needed.  Waiting for more ...");
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
                   var qI = queueData.list[queueData.index];
                   if (qI)
                   {
                       qI.triesTotal++;
                       qI.triesThis++;
                   }

                   t.setStatus("Sending upgrade request ...");
               }

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
                               Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0] = Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0] - parseInt(rslt.aetherstones);

                               if (rslt.gems > 0)
                               {
                                   t.setStatus("Error .... Shutting down.");
                                   chActionLog('Upgrader accidentally spent gems!  Upgrader turned off');
                                   upgradeData.active = false;
                                   saveUpgradeData();
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
                                   t.setStones(Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0]);
                                   y.level = parseInt(rslt.level);
                                   y.name = y.createName();

                                   if (bypass !=true)
                                   {
                                       Tabs.upgrader.repaint();

                                       t.setResult("Upgrade successful.  "  + addCommas(rslt.aetherstones) + " aetherstones used.");
                                       t.setStatus("Attempting next upgrade");
                                       unsafeWindow.cm.sounds.play("ch_success_build");

                                       var qItem = queueData.list[queueData.index];
                                       if (qItem) {
                                           var now = new Date();
                                           qItem.lastUpgrade = "Upgraded to +" + y.level + " " + now.toDateString().substring(3,10) + " "+ now.toTimeString().substring(0,8) + " in " + qItem.triesThis + " attempts";

                                           if (!qItem.upgrades) qItem.upgrades = [];
                                           qItem.upgrades.push (qItem.lastUpgrade);

                                           var msg = 'Upgraded '+unsafeWindow.kocChampionItems[uItem].name + ' [' + uItem + '] to level ' + rslt.level + " in " + qItem.triesThis + " attempts. " + qItem.triesTotal + " total attempts for this item.";
                                           if (upgradeData.whisperToMe) sendChat("/"+ Seed.player.name +' ' + msg);
                                           chSuccessLog(msg);
                                           if (qItem.level <= y.level) {
                                               qItem.status = "complete";
                                               upgradeData.newUpgradeState =2;
                                           }
                                           else {
                                               var now = new Date();
                                               qItem.status = "Partially upgraded";
                                               qItem.triesLast = qItem.triesThis;
                                               qItem.triesThis = 0;
                                               if (upgradeData.newUpgradeState !=2) upgradeData.newUpgradeState = 1;
                                           }
                                           saveUpgradeData();
                                           setUpgradeColor();
                                       }
                                       saveQueueData();
                                       Tabs.upgrader.buildQueueDisplay();
                                       clearTimeout(Tabs.upgrader.timerH);
                                       Tabs.upgrader.timerH = setTimeout(Tabs.upgrader.doAction, 10* 1000);
                                   }
                               }
                               else
                               {
                                   logit("upgrade failed");
                                   t.setStones(Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0]);
                                   chActionLog('Upgrade failed Throne room item '+unsafeWindow.kocChampionItems[uItem].name);
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
                                       var qItem = queueData.list[queueData.index];
                                       if (qItem.status == "not started") qItem.status = "started";
                                       saveQueueData();
                                       Tabs.upgrader.buildQueueDisplay();
                                       //t.doRepair(uItem);  // fix item
                                       clearTimeout(Tabs.upgrader.timerH);
                                       Tabs.upgrader.timerH = setTimeout(Tabs.upgrader.doAction, 10*1000);
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
               var t = Tabs.upgrader;

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

               queueData.list.push(qItem);
               saveQueueData();
               t.buildQueueDisplay();
           },

           buildLevelWidget : function () {
               var t = Tabs.upgrader;
               var m;
               if ($("#chAction").val() == "enhance") {
                   m = '<div id=chMaxDiv> Max: <select id="chMaxLevel">';
                   for (i =1; i <=5; i++) {
                       m  += '<option value="' + i + '">' + t.qualities[i] + '</option>';
                   }
                   m += '</select></div>';
               } else if ($("#chAction").val() == "upgrade") {
                   m = '<div id=chMaxDiv> Max: <select id="chMaxLevel">';
                   for (i =1; i <= maxChLevel; i++) {
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
                   $("#chMaxLevel").val(maxChLevel);
               }

           },

           buildQueueDisplay : function () {
               var t = Tabs.upgrader;
               $("#chQueue").html("<table id='chQueue' width='100%' class=chTabPad/>");
               $("#chQueue").append("<tr><th width=5%>Reorder</th><th width='8%'>Status</th><th width='25%'>Item</th><th width='5%'>Action</th><th width='5%'>Max</th><th width='40%'>Status/Last Upgrade/Attempts</th><th width='10%'>Remove</th></tr>");

               for (ii in queueData.list) {
                   var q = queueData.list[ii];
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
                       for (i =1; i <= maxChLevel; i++) {
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

               for (var j=0; j < queueData.list.length; j++)
               { 
                   var q = queueData.list[j];
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
                                                    if (presetData.noTooltips != true) 
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
               var t = Tabs.upgrader;
               queueData.list.splice(i,1);
               if (i > queueData.index) queueData.index--;
               saveQueueData();
               t.buildQueueDisplay();  
           },

           changeLevel : function (index, level) {
               var t = Tabs.upgrader;

               var q = queueData.list[index];
               if (!q) return;

               q.level = level;
               saveQueueData();
               t.buildQueueDisplay();
           },

           moveUpRow : function (i) {
               if (i<1) return;
               var t = Tabs.upgrader;
               var q = queueData.list.splice(i,1);
               queueData.list.splice(i-1,0,q[0]);

               if (i == queueData.index)
                   queueData.index--;
               else if (queueData.index == i-1)
                   queueData.index++;

               saveQueueData();
               t.buildQueueDisplay();
           },

           moveDownRow : function (index) {
               if (index > (queueData.list.length - 2)) return;

               var t = Tabs.upgrader;
               var q = queueData.list.splice(index,1);
               queueData.list.splice(index+1,0,q[0]);

               if (i == queueData.index)
                   queueData.index++;
               else if (queueData.index == i+1)
                   queueData.index--;

               saveQueueData();
               t.buildQueueDisplay();

           },

           updateCHTab : function() {
               $("#chexecupgrade").html("Upgrade " + (upgradeData.active ? "ON" : "OFF"));
           },

           togglePower: function(obj){
               var t = Tabs.upgrader;

               var btn = document.getElementById('chUpgraderPower');
               if (upgradeData.active == true) {
                   upgradeData.active = false;
                   btn.value = "Upgrade = OFF";
                   t.setStatus("Powered off");

               } else {
                   upgradeData.active = true;
                   btn.value = "Upgrade = ON";
                   t.setStatus("Power on");
               }

               if (upgradeData.active == false)
               {

               }

               t.updateCHTab();
               saveUpgradeData();

           },

           toggleSelect: function(obj){
               var btn = document.getElementById('chUpgraderSelect');
               var t = Tabs.upgrader;
               if (upgradeData.enhanceAction == true) {
                   upgradeData.enhanceAction = false;
                   btn.value = "Action = Upgrade";
               } else {
                   upgradeData.enhanceAction = true;
                   btn.value = "Action = Enhance";
               }
               t.updateTRSelect();
               saveUpgradeData();
           },

           setStatus : function (s)
           {
               document.getElementById('chUpgradeStatus').innerHTML = "<div>" + s + "</div>";
           },

           setResult : function (s)
           {
               document.getElementById('chLastResult').innerHTML = "<div>" + s + "</div>";
           },

           setStones : function(n)
           {
               var st = addCommas(n) + " stones";
               document.getElementById('chStoneRemain').innerHTML = "<div>" + st + "</div>";
           },

           pickCity : function () {
               var t = Tabs.upgrader;
               var cid = upgradeData.uCityNum;
               if ( parseInt(Seed.resources["city" + Seed.cities[cid][0]]["rec5"][0]) >= upgradeData.minStones) return cid;

               if (upgradeData.anyCity)
               {
                   for (i= 0; i < Seed.cities.length; i++)
                   {
                       if ( parseInt(Seed.resources["city" + Seed.cities[i][0]]["rec5"][0]) >= upgradeData.minStones) return i;
                   }
               }
               return -1;
           },


           doRepair : function( rItem) {
               var t = Tabs.upgrader;
               var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);

               if (upgradeData.active == false || rItem == 0 || unsafeWindow.kocChampionItems[rItem] == null)
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
                           chActionLog('Starting repair for Throne room item '+ item.name);
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
                           Tabs.upgrader.buildQueueDisplay();
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
               var t = Tabs.upgrader;
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
                       Tabs.upgrader.repaint();
                   }

               }
               //unsafeWindow.cm.ThroneView.renderInventory(unsafeWindow.kocChampionItems);
               return timeUntilDone;
           },

           show: function(){
               Tabs.upgrader.repaint();
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
        wins : {},    // prefix : chPopup obj
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
function chPopup(prefix) {
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
    this.div = $("#ch_top")[0];
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
        return $("#ch_dialog").dialog("isOpen");
    }
    function show(tf){
        if (tf){
            $("#ch_dialog").dialog("open");
            t.focusMe ();
        } else {
            $("#ch_dialog").dialog("close");
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

    var container_div = document.getElementById('ch_modal_js_confirm');
    var div;
    if(!container_div) {
        container_div=document.createElement('div');
        container_div.id='ch_modal_js_confirm';
        container_div.style.position='absolute';
        container_div.style.top='0px';
        container_div.style.left='0px';
        container_div.style.width='100%';
        container_div.style.height='1px';
        container_div.style.overflow='visible';
        container_div.style.zIndex=2000005;

        div=document.createElement('div');
        div.id='ch_modal_js_confirm_contents';
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

        div.innerHTML = '<div style="text-align:center"><div>'+confirm_msg+'</div><br/><div>Press OK to continue.</div><br><button id="ch_modal_js_confirm_ok_button">OK</button> <button id="ch_modal_js_confirm_cancel_button">Cancel</button></div>';
        var ok_button = document.getElementById('ch_modal_js_confirm_ok_button');
        ok_button.addEventListener('click',function() {
            if(ok_function && typeof(ok_function) == "function"){
                ok_function();
            }
            container_div.parentNode.removeChild(container_div);
        },false);
        var cancel_button = document.getElementById('ch_modal_js_confirm_cancel_button');
        cancel_button.addEventListener('click',function() {
            if(cancel_function && typeof(cancel_function) == "function"){
                cancel_function();
            }
            container_div.parentNode.removeChild(container_div);
        },false);
    }
}

//The following code is released under public domain.

var AutoUpdater_183854 = {
        id: 183854,
        days: 1,   // check every 1 day
        name: "KOC Champion Organizer",
        version: Version,
        time: new Date().getTime(),
        call: function(response, secure) {
            logit("checking version");
            GM_xmlhttpRequest({
                method: 'GET',
                url: 'http'+(secure ? 's' : '')+'://userscripts.org/scripts/source/'+this.id+'.meta.js',
                onload: function(xpr) {AutoUpdater_183854.compare(xpr, response);},
                onerror: function(xpr) {if (secure) AutoUpdater_183854.call(response, false);}
            });
        },
        enable: function() {
            GM_registerMenuCommand("Enable "+this.name+" updates", function() {
                GM_setValue('updated_183854', new Date().getTime()+'');
                AutoUpdater_183854.call(true, true)
            });
        },
        compareVersion: function(r_version, l_version) {
            var r_parts = r_version.split(''),
            l_parts = l_version.split(''),
            r_len = r_parts.length,
            l_len = l_parts.length,
            r = l = 0;
            for(var i = 0, len = (r_len > l_len ? r_len : l_len); i < len && r == l; ++i) {
                r = +(r_parts[i] || '0');
                l = +(l_parts[i] || '0');
            }
            return (r !== l) ? r > l : false;
        },
        compare: function(xpr,response) {
            this.xversion=/\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);
            this.xname=/\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);

            if ( (this.xversion) && (this.xname[1] == this.name) ) {
                this.xversion = this.xversion[1];
                this.xname = this.xname[1];
            } else {
                if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) {
                    // GM_setValue('updated_183854', 'off');
                }
                return false;
            }

            var updated = this.compareVersion(this.xversion, this.version);

            if ( updated ) {
                display_confirm('A new version of '+this.xname+' is available.\nDo you wish to install the latest version?',
                        // Ok
                        function(){
                    try {
                        location.href = 'https://userscripts.org/scripts/source/183854.user.js';
                    } catch(e) {}
                },
                // Cancel
                function(){
                    if ( AutoUpdater_183854.xversion ) {
                        if(confirm('Do you want to turn off auto updating for this script?')) {
                            // GM_setValue('updated_183854', 'off');
                            CHGlobalOptions.chUpdate = false;
                            GM_setValue ('CHOptions_??', JSON2.stringify(CHGlobalOptions));
                            AutoUpdater_183854.enable();
                            alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
                        }
                    }
                }
                );

            } else if (response){
                alert('No updates available for '+this.name);
            }
        },
        check: function(tf) {
            if (!tf){
                this.enable();
            } else {
                // convert days to milliseconds and compare
                if (+this.time > (+GM_getValue('updated_183854', 0) + 1000*60*60*24*this.days)) {
                    GM_setValue('updated_183854', this.time+'');
                    this.call(false, true);
                }
                GM_registerMenuCommand("Check "+this.name+" for updates", function() {
                    GM_setValue('updated_183854', new Date().getTime()+'');
                    AutoUpdater_183854.call(true, true)
                });
            }
        }
};

readCHGlobalOptions();

//even though Scriptish provides its own update mechanism (GM_updatingEnbled ==
//true), lets use this method.
if (typeof(GM_xmlhttpRequest) !== 'undefined' /*
 * && typeof(GM_updatingEnabled)
 * === 'undefined'
 */) {
    try {
        if (unsafeWindow.frameElement === null) {
            AutoUpdater_183854.check(CHGlobalOptions.chUpdate);
        }
    } catch(e) {
        AutoUpdater_183854.check(CHGlobalOptions.chUpdate);
    }
}

/** ******* End updater code ************ */

String.prototype.capitalize = function(){ 
    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
}




//only run in the main iframe
if (document.location.toString().match('src/main_src.php') ) chStartup ();

