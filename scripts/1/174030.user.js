// ==UserScript==
// @name           SuperdAmn
// @namespace      24bps.com
// @description    Next generation dAmn awesomeness. Version 1.0RC2rev7.
// @author         Andy Graulund <electricnet@gmail.com>
// @version        1.0RC2rev7
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==

// LAST UPDATED: 2012-11-22

var superdAmn_GM = !!window.navigator.userAgent.match(/(firefox|iceweasel)/i)

// PROLOGUE:
sd = freeFunctionString((function(){
// JSON madness goes here
if(!("JSON" in window)){ eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('3(!o.p){p={}}(5(){5 f(n){7 n<10?\'0\'+n:n}3(6 1b.z.q!==\'5\'){1b.z.q=5(h){7 o.1C()+\'-\'+f(o.1T()+1)+\'-\'+f(o.1O())+\'T\'+f(o.1D())+\':\'+f(o.1M())+\':\'+f(o.1Q())+\'Z\'};X.z.q=1K.z.q=1I.z.q=5(h){7 o.1V()}}y L=/[\\1W\\13\\1o-\\1l\\1m\\1i\\1n\\1s-\\1p\\1j-\\15\\17-\\14\\18\\1f-\\19]/g,M=/[\\\\\\"\\1B-\\1z\\1w-\\1y\\13\\1o-\\1l\\1m\\1i\\1n\\1s-\\1p\\1j-\\15\\17-\\14\\18\\1f-\\19]/g,8,H,1e={\'\\b\':\'\\\\b\',\'\\t\':\'\\\\t\',\'\\n\':\'\\\\n\',\'\\f\':\'\\\\f\',\'\\r\':\'\\\\r\',\'"\':\'\\\\"\',\'\\\\\':\'\\\\\\\\\'},l;5 N(m){M.1h=0;7 M.11(m)?\'"\'+m.C(M,5(a){y c=1e[a];7 6 c===\'m\'?c:\'\\\\u\'+(\'1k\'+a.1r(0).12(16)).1g(-4)})+\'"\':\'"\'+m+\'"\'}5 E(h,w){y i,k,v,e,K=8,9,2=w[h];3(2&&6 2===\'x\'&&6 2.q===\'5\'){2=2.q(h)}3(6 l===\'5\'){2=l.P(w,h,2)}1u(6 2){J\'m\':7 N(2);J\'S\':7 1v(2)?X(2):\'D\';J\'1x\':J\'D\':7 X(2);J\'x\':3(!2){7\'D\'}8+=H;9=[];3(Q.z.12.1S(2)===\'[x 1R]\'){e=2.e;G(i=0;i<e;i+=1){9[i]=E(i,2)||\'D\'}v=9.e===0?\'[]\':8?\'[\\n\'+8+9.O(\',\\n\'+8)+\'\\n\'+K+\']\':\'[\'+9.O(\',\')+\']\';8=K;7 v}3(l&&6 l===\'x\'){e=l.e;G(i=0;i<e;i+=1){k=l[i];3(6 k===\'m\'){v=E(k,2);3(v){9.1c(N(k)+(8?\': \':\':\')+v)}}}}R{G(k 1t 2){3(Q.1q.P(2,k)){v=E(k,2);3(v){9.1c(N(k)+(8?\': \':\':\')+v)}}}}v=9.e===0?\'{}\':8?\'{\\n\'+8+9.O(\',\\n\'+8)+\'\\n\'+K+\'}\':\'{\'+9.O(\',\')+\'}\';8=K;7 v}}3(6 p.W!==\'5\'){p.W=5(2,A,I){y i;8=\'\';H=\'\';3(6 I===\'S\'){G(i=0;i<I;i+=1){H+=\' \'}}R 3(6 I===\'m\'){H=I}l=A;3(A&&6 A!==\'5\'&&(6 A!==\'x\'||6 A.e!==\'S\')){1a 1d 1E(\'p.W\')}7 E(\'\',{\'\':2})}}3(6 p.Y!==\'5\'){p.Y=5(B,U){y j;5 V(w,h){y k,v,2=w[h];3(2&&6 2===\'x\'){G(k 1t 2){3(Q.1q.P(2,k)){v=V(2,k);3(v!==1L){2[k]=v}R{1J 2[k]}}}}7 U.P(w,h,2)}L.1h=0;3(L.11(B)){B=B.C(L,5(a){7\'\\\\u\'+(\'1k\'+a.1r(0).12(16)).1g(-4)})}3(/^[\\],:{}\\s]*$/.11(B.C(/\\\\(?:["\\\\\\/1G]|u[0-1X-1U-F]{4})/g,\'@\').C(/"[^"\\\\\\n\\r]*"|1A|1P|D|-?\\d+(?:\\.\\d*)?(?:[1N][+\\-]?\\d+)?/g,\']\').C(/(?:^|:|,)(?:\\s*\\[)+/g,\'\'))){j=1F(\'(\'+B+\')\');7 6 U===\'5\'?V({\'\':j},\'\'):j}1a 1d 1H(\'p.Y\')}}}());',62,122,'||value|if||function|typeof|return|gap|partial|||||length|||key||||rep|string||this|JSON|toJSON||||||holder|object|var|prototype|replacer|text|replace|null|str||for|indent|space|case|mind|cx|escapable|quote|join|call|Object|else|number||reviver|walk|stringify|String|parse|||test|toString|u00ad|u206f|u202f||u2060|ufeff|uffff|throw|Date|push|new|meta|ufff0|slice|lastIndex|u17b4|u2028|0000|u0604|u070f|u17b5|u0600|u200f|hasOwnProperty|charCodeAt|u200c|in|switch|isFinite|x7f|boolean|x9f|x1f|true|x00|getUTCFullYear|getUTCHours|Error|eval|bfnrt|SyntaxError|Boolean|delete|Number|undefined|getUTCMinutes|eE|getUTCDate|false|getUTCSeconds|Array|apply|getUTCMonth|fA|valueOf|u0000|9a'.split('|'),0,{})) }
// XPATH madness goes here -- Based upon the $x in Firebug, modified by Zikes
function $x(xpath,root){var got=document.evaluate(xpath,root||document,null,null,null),result=[];while(next=got.iterateNext())result.push(next);return result;}
// RegExp escape madness goes here -- By Simon Willison: http://simonwillison.net/2006/Jan/20/escape/
RegExp.escape=function(a){if(!arguments.callee.sRE){var b=["/",".","*","+","?","|","(",")","[","]","{","}","\\"];arguments.callee.sRE=new RegExp("(\\"+b.join("|\\")+")","g")}return a.replace(arguments.callee.sRE,"\\$1")}
// If we're using Firefox, we must assume "real" Greasemonkey
var superdAmn_GM = window.superdAmn_GM = !!window.navigator.userAgent.match(/(firefox|iceweasel)/i)

// SUPERDAMN
// Made by Andy Graulund / electricnet
// <electricnet.deviantart.com>
// <elec.me>
// <electricnet@gmail.com>

// With significant portions made by or inspired by products made by:
// siebenzehn, Zikes, zachriel, exsecror, realillusions, electricjonny,
// Kiwanji, Plizzo

// Copyright (c) 2009 - 2011 Andy Graulund / electricnet

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

var superdAmn = window.superdAmn = {
	// Variables being initialized
	v:  "1.0RC2rev7",
	vd: 1354420800,
	imgs: new Array(
		/* Brighter faded background*/	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC5JREFUSMftzTEBADAIAKDZP9Ry6G0QY+gBBYjq/G9JyOVyuVwul8vlcrlcfiYfH9RnijOp+oUAAAAASUVORK5CYII=",
		/* Preferences icon */			"data:image/gif;base64,R0lGODlhEAAQAJEAAJifm3CGdmZwbzJAQSH5BAEHAAEALAAAAAAQABAAAAIyjD2px6G/GJzjPAESEA8pkA1gB41iSJ2gmWIrlyYuHGtofVJOeSfew4rsag1i4yc0FAAAOw==",
		/* Subheader seperation line*/	"data:image/gif;base64,R0lGODlhFAABAIAAALS9tAAAACH5BAAHAP8ALAAAAAAUAAEAAAIEhI+ZBQA7",
		/* FAQ code down arrow */		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNy8xMS8wOSd6L58AAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzQGstOgAAAANklEQVQoz2NgQAM5leX/kTEDITAiNAAFF6ArwoMXkKJpASk2LcDl/gVEK8ahaQEDMQCqCatiAEQjlwNkG+8AAAAAAElFTkSuQmCC",
		/* Normal tabs */				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADbCAYAAAAoGt6rAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTEvMDm56ACmAAACt0lEQVR42u3XSU7jQBSA4RzNR8ySDftuJpllExBIjK3uhiSMSZgvUvghxzGV9AGQv5K+lb16er9c7vVaZ21nvaiUlQQdFLtf9Fad6kE/Xvo52E5n44s0e59BZ8TOx+7XofRTSstxHPw5TNO3KXRWNDCPpH2tquOYQOe1IikikPLHYCtNXh+AWjQRbUQg6WR0mh5e74FaNBFtfAZy/3IHZBaBPN8CmSaQu+cbINMEcvt0DWSaQG6exkBmEcjjCMg0gVzPhkCmCWQ8uwIyTSCj6SWQaQXyD8g0gQwnf4GMQEAgIBAQCAgEBAICAYGAQEAggEBAICAQEAgIBAQCAgGBgEBAIAIBgYBAQCAgEBAICAQEAgIBgQACAYGAQEAgIBAQCAgEBAICAYEIBAQCAgGBgEBAICAQEAgIBAQCCAQEAgIBgYBAQCAgEBAICAQEYhggEBAICAQEAgIBgYBAQCAgEEAgIBAQCAgEBAICAYGAQEAgIBBAICAQEAgIBAQCAgGBgEBAIIBAQCAgEBAICAQEAt8kkJSA//lyNgabRaWsJOig2P2it+pUD/rx0u7Rbjr4vZ/OhsfQGbHzsft1KP0vX495HHvnvwyLTosG5pG0r1XigOVIigikjE+LwcBCfd0qIxD/HLDinyTa+AzEQGCZQEAgIBAQCAgEBAICAYGAQEAggEBAICAQEAgIBAQCAgGBgEBAIAIBgYBAQCAgEBAICAQEAgIBgQACAYGAQEAgIBAQCAgEBAICAYEIBAQCAgGBgEBAICAQEAgIBAQCCAQEAgIBgYBAQCAgEBAICAQEYhggEBAICAQEAgIBgYBAQCAgEEAgIBAQCAgEBAICAYGAQEAgIBBAICAQEAgIBAQCAgGBgEBAIIBAQCAgEBAICAQEAgIBgYBAQCCAQEAgIBAQCAgEBALfL5AP+edZUYMHWogAAAAASUVORK5CYII=",
		/* Highlighted tabs */			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADbCAYAAAAoGt6rAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTEvMDm56ACmAAACfklEQVR42u3ZMWrDMBiAUR1N5A6hc2mhGXqLTt18jy6GQqAJtINL595IlUxsqzg+QNATvMXefvQhOQmhWsfdLmZ9lqBBZe/HcG3lF50BwajbjOPjbp9OTw/p/HyAZpQ9X/b+KpLLtWp8eHq8NyzaDiU3UEUSw/TNUeoxIDjUJ0kf5tPDtQrm69bUxRyIwcBCICAQEAgIBAQCAgGBgEBAICAQgYBAQCAgEBAICAQEAgIBgYBAQCACAYGAQEAgIBAQCAgEBAICAYEYCggEBAICAYGAQEAgIBAQCAgEBCIQEAgIBAQCAgGBgEBAICAQEAggEBAICAQEAgIBgYBAQCAgEBCIQEAgIBAQCAgEBAICAYGAQEAggEBAICAQEAgIBAQCAgGBgEBAIAIBgYBAQCAgEBAICAQEAgIBgQACAYGAQEAgIBAQCAgEBAICAYEIBAQCAgGBgEBAICAQuNFAUgK2/Fu5mJj1Uz3QmLL3Y7i28ovOgGDUbcbx+fqSvr/e08/vAM0oe77s/VUkl2vV+HA4vhkWTSsNVJHEMH1zlHoMCIb6JOnnn3ldq2C5bq3+BzEYWAgEBAICAYGAQEAgIBAQCAgEBCIQEAgIBAQCAgGBgEBAICAQEAgIRCAgEBAICAQEAgIBgYBAQCAgEEMBgYBAQCAgEBAICAQEAgIBgYBABAICAYGAQEAgIBAQCAgEBAICAQQCAgGBgEBAICAQEAgIBAQCAhEICAQEAgIBgYBAQCAgEBAICAQQCAgEBAICAYGAQEAgIBAQCAhEICAQEAgIBAQCAgGBgEBAICAQQCAgEBAICAQEAgIBgYBAQCAgEIGAQEAgIBAQCAgEBAK3GcgfU6K7iEpJWJgAAAAASUVORK5CYII=",
		/* Highlighted tabs alt */		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADbCAYAAAAoGt6rAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTIvMTEvMDm56ACmAAACdUlEQVR42u3ZQUoDMRiG4RwtR5yjzB0KLgRFN4JL3biqtijFXcw/dDqR6Ryg5PngAWl3IS+d1pSalVJyNRazPhd3P6drq28Mzsds2rAZx+n3VA7fX+XzuIduxJ2Pu7+K5PxYNe34c3BYdC0aaJbT/J0j6nFAsG8/ScY0/+WxCpbHrXmXQBwMLAQCAgGBgEBAICAQEAgIBAQCAhEICAQEAgIBgYBAQCAgEBAICAQEIhAQCAgEBAICAYGAQEAgIBAQiEMBgYBAQCAgEBAICAQEAgIBgYBABAICAYGAQEAgIBAQCAgEBAICAQQCAgGBgEBAICAQEAgIBAQCAhEICAQEAgIBgYBAQCAgEBAICAQQCAgEBAICAYGAQEAgIBAQCAhEICAQEAgIBAQCAgGBgEBAICAQQCAgEBAICAQEAgIBgYBAQCAgEIGAQEAgIBAQCAgEBAK3Gwiw4d/qC7kai1mfi7uf07XVNwbnYzZt2Izj/eOtPLzcl7unHXQj7nzc/VUk58eqac+vjw6LrkUDzXKav3NEPQ4Idu0nyXj5mddjFSyPW6v/gzgYWAgEBAICAYGAQEAgIBAQCAgEBCIQEAgIBAQCAgGBgEBAICAQEAgIRCAgEBAICAQEAgIBgYBAQCAgEIcCAgGBgEBAICAQEAgIBAQCAgGBCAQEAgIBgYBAQCAgEBAICAQEAggEBAICAYGAQEAgIBAQCAgEBCIQEAgIBAQCAgGBgEBAICAQEAggEBAICAQEAgIBgYBAQCAgEBCIQEAgIBAQCAgEBAICAYGAQEAggEBAICAQEAgIBAQCAgGBgEBAIAIBgYBAQCAgEBAICARuM5A/rcCCu43mRbwAAAAASUVORK5CYII=",
		/* View emote dev icon */		"data:image/gif;base64,R0lGODlhDAAHALMAAPf39/X29fX19fPz8/Ly8ujp6d3f39DU09DT08bLysTJyMDGxbrAv6Srqo+ZmI+ZlyH5BAEHAAAALAAAAAAMAAcAAAQp8DxHHQIYuzQAWQ9gPAbgCFngYGOxAs0jz3OmsY+rCDyzjiVEhXKxRQAAOw==",
		/* Bold button */				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAFmSURBVDjLnZM7T8JQGIb5SST8GV1xFneYYHKDP+AMCjp4AxdiDZdQhUq4CHIttNKAILTFieS1XxO+0LAUh6cn38n7vOk5yfFEYhGvRcsCB0KO12N9pEq9AnNtYmWsXEFZciy3QQUb3dAhqzIG44ErKGuYhv0nVIDFcoGu3D0Icrhg/jNHu//JJO4SOPIfO6C93Qw5XDBbzNDsfjDXmRtbyghPWP+uETwPwX964siQwwXT7ylq7TqTekzZBbTSHAgGEAidOTLkcIE20/DerDLJh+TeEWhvN0MOF3xNJyjXyszl/ZUtpZ/T0E0d0YuYPRfKBc6QwwWqpkKsisz2EmmlORwN23P+Lc8ZcrhgPBmjWCky8dv43hHoPsR3kTPkcMFIHSH3mmManSaW+tJBq9dyZMjhgqEiQygJBzFUhlywUazzCKUXZAtZV1DB7h1IUkOCoinojfquUCYKyNk+Jp9F5x/PmRzfH05SJLB/Hd7gAAAAAElFTkSuQmCC",
		/* Italic button */				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAFGSURBVDhPlZM9T8JQFED5SST8GV3FUZ2dCTOIs8YfQMJmwoSpEAgYKF9FoJV+vdqGCpYWN5Lru4258aVLO5wu952T9t00V7or5TlLDmQEnXyOP+TRfATHnyMcokMq8Cw63FUwcAqjEEzHBN3WU4Fno2MUvwkGYB/sQTO1TKBDgd33DlabdSbQoYC/92GhvQu0ui9wdnFOVB4qwhwdCmy/tjBbzQXW+hqaUjOWG80GuFtXmKNDAc/3YLyYJKg91eKArMiJGToU+OT14WyY4Or2Goo3lzBdThMzdCjgeA4MJgOB9qDN5SKU78uJGYIOBWzXht6oR9Sf68IFVh+rwhxBhwKWY0HnrUPIyhiCMCBUQxXmCDoUMJgJUl/KhMEMCpwY/x6p/8p330oFBv7fgYxrYh6DD2uTCuayeLWlv5+pwFGxlhF0Cr/7xDXDumfN4AAAAABJRU5ErkJggg==",
		/* Underline button */			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAEfSURBVDjLnZNdToNAFEa7pCbdjL66lK7A6AZcSRNMY9Oagk1/tBVbfgYhYNEWfGtynW+SuRnmCXw4hOTecxhI6A1vh33Jm4Q6AqffkxfPXblU/9Z0qk6twC4c6a4RuJyrM4VJSIf40ArsVnWlToIAlT8l+aHfCTgcOH4fabvfNbi6uaaN/6rAvT2Hw4GiLHjZlJbblcKMaeBwIP/KedmUXjYLhRnTwOFAVmS8bErz5VxhxjRwOPCZp7ysuXu4VyLAvT2Hw4EkS2i2mDXAVzax53A4EKcxTdxJA/10jT2Hw4EoiWj8PG5gn8Cew+FAIEJypk4nAhFw4CLk+zjTRxo9jVqBgPkNPG/tkcgEfUT7VohUEBz9Mw0k7//4neEM/gDEjjT/qoWLKwAAAABJRU5ErkJggg==",
		/* Link button */				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAFHSURBVDjLnZPLTsJAGIV5JBJeRrc+CktW7oisMaIrE12T1IAElFbCxaIt9DKVppVaKO5Ifnv+ZCYsWxdfO5fznUzbtFK/rFdzzBwqCZxqJb8Y+kynw++BdtmuEMjCyd05Co77bE9u4NLaXxcC2eyQ8UlQQEmakOVapYCjCrY/W1quPkoBRxXESUwL670UcFRB9B3RdDljmu0mnV2cM62bFiPn2JM5OKogjEN6W0wYBPuvfcKLlSLGWMNY5uCogq9oQ+PpmEHItE2+N64azOmazMFRBUEY0GgyYhC6fbyjdJ+qE2CMNYxlDo4q8Dc+DfQB076/VmLnocPIOfZkDo4q8AKPei89Bp8I3xiY9pKRc+zJHBxV4AiXtKFWCkc4quAo8ufRhk/Ufe4WAgWn78Aw5gaJUJDtrQohNoLgyJ+plvP5j98ZTu0PkWIpddgVWOsAAAAASUVORK5CYII=",
		/* Thumb button */				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAFKSURBVDjLnZO/SsNQHIW7+RiOroU+gm/gazi6OxRncXATCoK7i6BTIRoMqTax9I9WY5q0NzY0NtokBcHCz3su3IuBYlMPfBku5zskgVuqHlXLnCcOrQmccok/bKtjUTbPaJbOCoEuHO52MbBI0oT8wKfBaFAIdNMsFW+CAYo/Y3J8Zy3gqIHpx5T67rNgVWQPjhqI4oh6zqMA2di7WQoie3DUwOR9Qu1+R4Bs7uu0dZLkwBkie3DUQBiF9NBrCZDtQ4N2zuc5cIbIHhw18DYZU7PdFCC7pyYdGF85cIbIHhw1EIQBNVoNAXJ8cU+X7ncOnCGyB0cNjMYjMixDgFzp1lIQ2YOjBobBkPQ7XbAqsgdHDXjMJ83UBLWz2p/Insc8NbBg/Hs085rqt/VCYOD3P7Dtrk0sZPQ6dAvBxozgyMtU4bz84zrDqfwArwg/H/norJQAAAAASUVORK5CYII=",
		/* External image button */		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAFJSURBVDjLnZO/SsNQHIX7Ni4OhW4+gM/g4Obo7qjQXXDSLYOIb6CLUIgUSytNDE1bW2ObPzcmJDa2TdwKP3Mu3IuBYlMPfBku5zskgVupX9SrOa85tCVwqpX8oWumRtl3Rot0UQp04eRuHwOrZbokx3do6k1LgW6apfxNMEDJPCHLsbYCjhyYfc1oNBlzNkX04MiBOIlpYA05yPXBzloQ0YMjB6LPiHojk4PcHe2ScbpfAGeI6MGRA2Ec0svA4CD6yR6Nr44L4AwRPThy4CMKqNvrcpDh+SH595cFcIaIHhw54Ic+dYwOB7Fvz2huqgVwhogeHDngBR61tBYHCR6UtSCiB0cOuL5LzecmZ1NED44csJlDalvlKDfKn4iezWw5sGL596jtR2o8NUqBgd//QNf7OrGQ0bs7KQULGMERl6mW8/aP6wyn9gNiYDwvlb5hJQAAAABJRU5ErkJggg==",
		/* Code button */				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAEySURBVDjLnZPLTsJAFED5JBI+pR+Daxa49RtIXBCJYeGapIZIoKWl8lC0Qh/Th22pQuuO5Dq3iTctq46L08XcOSedSabRuek0Oa8cEASdZoN/dG2lQf6TwzE71gL3osPdNQbOp+wEtmfD3t3XAvdmeVb8CQYg/U7BtE0h0KHA4esA292bEOhQIE5j2JgvFXq3PZAkibico0OBKIlguV0RykIppO51F5I0KSjPEXQoEMYhLDYGMXwYFoH+Xb+yXgYdCvhRAPPlnFANtQi0r9qV9TLoUMALPZgZM0J9VmFwP6jcQXmOoEMBN3Bhok0q4Dn9T5+4nKNDAcdzYKyMhUCHAhazQZ7KQljMosCZ8fPI00cYPY1qgYHyHej6WgcWMvhwdrVgAQN0/h5Ti/P+j+eMTusX9Ic23tVnfFwAAAAASUVORK5CYII=",
		/* Bcode button */				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAGdSURBVDjLnZNLSwJRGIb7SYE/xbXbbKURSVA7sbIW1iYoLCswXBREi1aC5Kg5WjrZxbTG64wpmnbRdsLb+T7w0C5t8cyBl+995swZzpR7yz0tKAgwIdSZnhIPLfuQxeB7gM/+51jQLHVE95EEw6/+F2qNGipGZSxotj/o805IgN5HD3pNnwjqSEH3vQv1RoXVaoV/349i+flPqCMFnV5HCg6ODpDXn/6EOlLQfmsjkU6wwDnn5JU4vzjHffEBq+trMnMtujijjhS0Oi3EkjEe8Kx40O52YJ+1w+F0IHQS4jx4HOTcaJq4zee4IwWv7SYuE5c8GDgMIHOfwdLyEmbsM9jd2+WcPpHyEdSRgkargUgswoPeDS8UVYHNZmPJ6dkp59s720jn0hLqSIHRNBCOhnmQtk0rCZSEgtzTHXybPnkG8wvzSGaT3JGCeqMOVVPZWq6XeTVeDfGma8Sv4yiUCpwRelXnjDpSUDVriKaiE1E1q1IwNIU5mlIQuYqMBQl+n4GmPWowWyZKYvvjYIpfSZ3RZbIIXv5xnalj+QFeQhq5zMpFWQAAAABJRU5ErkJggg==",
		/* Superscript button */		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAEYSURBVDjLnZNdaoNAFIWzpECW4o6yAiHQli4mYAkNSYk25KdNa4OasYo2ton2LXA6Z8DBh1qcPnyeO3i/gwr2hvawL3mWwBA6/Z68eO7aRfVd4VSeOsFdOtLdsOByLs8I49CIsirVk7AAxVcBP/RxfXsDy7LU/FsS7vBMRxccP4/Y7V/UArM5tyUdXZAXObb+k7rJbM5tSUcXZB8ZVru1ggttSUZXI3WmowvSPMXjdqng0l9ZQ0cXvGcJFquFWrJHtpqZzTNnZg0dXRCnMebLuRF0dMEhOWDqTo2gowuiOMLkYWIEHV0QiBDOzDEiEIEuuAj5Ps7sDuP7cSdY0PwGnrfxIFKBt2jfCZEI0Kl/poHk9R+/M53BDwETGERCB1DKAAAAAElFTkSuQmCC",
		/* Subscript button */			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAEWSURBVDjLnZPNasJAFIV9JMFHyRu5dBFU+kKCILWYVPxpbVPNz6QJSU2rSXfC6ZyBDLNoIdPFl3PvzD2HzMD0huNhX/IsgSX09Hvy43tbD813g0t96QRn6ZHeHQNu1/qKKI1wSk6d4Gzd1OpPGIDqq0IQBVbQowPOn2ccji9W0KMDyqrEPniygh4dUHwU2By2VtCjA/Iyx+N+jcndFI7jqPo3JZxhT48OeC8yrDYrNUA167+UHh2Q5imW66XapJq1qcSduqqnRwckWYKFt1BwqIvSowPiNMb8Ya7gQBelRweEIsLsfqY2R+5I1VSzb4/Q9qEIdcBNyPNw0QbzDnx/50PkAm/xsRMiE6CnfUwDyes/njM9gx/BSBkoPfKmXwAAAABJRU5ErkJggg==",
		/* Website embed button */		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAYAAADwMZRfAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAJDSURBVDgRBcExb5VlHAfQ83/vK1f9CBhDLBfIJYFeFljK5KgTLk4uwAfRL+DekDiZsGoYjCTGuJlIgDZtQi3q4AYtFSvR9n2en+fUF19+vkrVfVxKYqhCiSglAkAiqCqVksqzJJ+OUV99/OFHly58cFHrEylDlYhSIiAoCDCbzez98eulBw8ffD1GrizOLRweHUgCAkFRAEiiqiQxDIPFufOKyyNmU5tM0yQJVSRAUQpQoqNA793Umi5GSGLqjQCFp0+f2nq85fn+c4sLC1dWV1xdXzcUPVFVeu9gLCWJNjUEbG9te/Loib1ne6rK7s6u09NTvXdXV1cJSUgMVYaIlqanab3rvdnZ3rFxc0NVufXJLZv3Nm3c3LCzvWOamtab1rrWu54YhxqkR2td0g012N/bd/a9szbvbSrlzu07YD6fa60hoKcZajBEJNHapLVuaqeWl5cefvfQ3dt3/fbn7wCWl5dab3qP1pr0iBgleu+m1hR6Yv3aysnJid2dXT/98KPr1687/ufY+mpdmyYKSiCM0NO11hCqLC6eV5ifmfvl50eWy6UbN25Yu7jm9fFfeqOK3hvFCOnR2kQVeHV0aO3CmtW1lXfeftebf9/4+/i1w6NDVUWiV0kiiREiWmtUIeDg6KWDVwcCAoSgYCjpUVVGVW02G2c1lDY1CiEAAoBSCGbDzPjWSGKsZPvl4YvV2vtr/js9UQigAAAQEPMzcy8OXijD7qjqzjfff3u/qhalRIAAVSWilJ5uqAEkUeyHz/4HLkRm1OujeC0AAAAASUVORK5CYII=",
		/* Multi-line button */			"data:image/gif;base64,R0lGODlhEAAQANUAAP////7+/vz8/Pv7+/n5+fj4+Pf39/X19fT09PPz8/Hx8e/v7+3t7ezs7Orq6unp6ejo6OTk5N/f39vb29fX19PT09DQ0IWSh4WShoSRhYWRhoSRhoOQhISQhYOQhYOPhHWDd15qYP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEHACIALAAAAAAQABAAAAZ1QBFoSCwWRaILYMlsLkHIS2BArVoDUBFGUAh5v4WwIKsZIM7o9CC7ISi+8JCCwDY07vi8gX2AxL8QB1kZCRGGh4gJWR0KEn9eEgpZHgsTlpeYC5MMFI8hFAxZHA0VpaanDVkfDhatrq8Oqg+ztLWzWUa5RCJBADs=",
		/* Emotes popup button */		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAQCAYAAAAS7Y8mAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAIwSURBVDjLlVPLbtpQEOWTKvVr+AOkkjX8SNsdYD6hCahU6aISTZVWKvgFGJsEl4dNwa5NUlaRpjNzHxiaLro4PnPPGR+Pr69LDaP6AjFpGlVotS+AuGkolmD9QjDi2CfuURB91QlllvAymAY3cDjs4eEhEXhUnHL9yJweddWjPcGHQw6e/5nC3RI+5YnEKPYRHqwjD6KIeMI1sdAFq56irnrjjQ+/DxngsFCi19nvf8JyNUK4/4+lU1iPIMeshvEKaGJcbGCxsGCxtP/Gwn5e/wfyfMN7zRNnWQzzcADhjwEY7bdQLpdPYBhvIER/Hn7XaMs+4lDeS6CsRktOnKYrmN19hbv7b1CpVKBer0OtVtMgjTyFVus1a8pr4lp5SbqUe4zBSbrA4FuYzW45NM9zHapq9hEB9qjQ4oNJD4IvnNVUH2+7C/mYeH5fN59P7U373DNFJL+Skz5aC78PO8ziiemy3c5h7H2CCULdkGXZyeTkjSWKfRQ8kRqBssTHw8t2ew/u6JrR6XZOJiWQ5o4+SlwzF313LD1kytJ7HG9mYDnvwbJ7+GUdfrUi5qENttPDnh4zgb1U+LbzQXtRHIiJKT3eBDC0OjA0CVeC1VqyWfCPtfKvmEmP4qne46fdbg6m3YXB8JIxNC9l/U7UEkPz6Om6oJlWF3ZJKE4FHuaB79/w3qzWY411dOS14ujUW53pNKCPRw4zXTpuL3FPfNoX+mPoNTRw3SzU5/pzHmdh5h//SWWZ0l79mwAAAABJRU5ErkJggg==",
		/* Deviation icon */            "data:image/gif;base64,R0lGODlhEAARANUAAPbvy+/qyPHmuOfgt+XSqN3Vq9TKpc7Fmey4j9W5hfamR8upgsWicsmSWbOUcq+MZel4AZ6CXtx1ANVuAMpgAIhrTnZbPplWAZJNAGpSQGJKMoRBAEo4KUktEDUfDRAOEAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEHACEALAAAAAAQABEAAAaqwNDnAwIRicXhUKhoOp9PouJCrVqpkOF0sUgkIpFHYHzJfqaJQUKj4XAiZIn2kghUKgBCh0MAYORndAMcFQEJFR0WAxgTcwsDHRUPCBYeGQWMcw4HHgMPAgweHAaZgQ4LkQ8LFR4dBhuNpmuEFW0dC7CaDmwVBA8ZGgwbFHMPDxoWDaAWGcLEphbBAAANFhYOw3MY29wb3t7PEhIQ4hPmFOjpH0JK7UpG60EAOw==",
		/* Remove emote button */       "data:image/gif;base64,R0lGODlhCAAIAKIAAPf39+Pl5bzCwZWfno+ZmAAAAAAAAAAAACH5BAEHAAAALAAAAAAIAAgAAAMaCBIAIYqMEAZZdmRWiWSO9YXSJnwdtDQPkAAAOw=="
	),
	s: function(){ this.styles = ".damncr .msg .ts { display: table-cell; vertical-align: middle; color: #88938d; font-weight: bold; font-size:7pt; font-style: normal; padding: 0 1ex 0 0; white-space: nowrap; } .damncr .collapsed, .damncr .expanded { top: 0; }\n"
				+ ".damncr .gr-box { margin: 0.4em 0.7em; } .damncr .gr-box h2 { font-size: 15px; } .damncr .gr-box .gr-top .gr { padding-bottom: 1px; } .damncr-members { padding-right: 20px; } .damncr-members dl dd { white-space: nowrap; }\n"
				+ ".damncrc-chat-window a.lit, .damncrc-topic a.lit, .damncr-title a.lit { text-decoration: none !important; font-style: normal; font-weight: normal; font-variant: normal; } .damncr span.sdltt { height: 133px; display: inline-block; } .damncr span.ffc, .damncr dd.ffc {/* cursor: pointer; */}\n"
				+ ".damncr .gr-box .gr-body .gr { padding: 2px 8px; } .damncr .gr-box .superdamnlist { margin: 2px 0; } .damncr .gr-box p { margin: 5px 0; } .gr-box p.nt { margin-top: 0; } .damncr .gr-box p.nt { margin-top: 2px; }\n"
				+ ".gr-top a.sdmclose { position: static; float: right; margin: 6px 8px 0 0; width: 15px; height: 15px; background: transparent url(http://st.deviantart.com/minish/messages/close-message.gif) no-repeat 0 0; } .gr-top small.version { float: right; text-align: right; margin: .65em 1.3em 0 0; }\n"
				+ ".damncr .gr-top a.sdmclose { margin-top: 4px; } .gr-top a.sdmclose:hover { background-position: -60px 0; } .gr-top a.sdmclose:active { background-position: -75px 0; } .damncri-member { white-space: normal; } .damncri-member .superdamner { color: #728776; }\n"
				+ ".damncrc-iconbar .away { background: #ffc url(http://st.deviantart.com/minish/gruzecontrol/icons/devmeet.gif) no-repeat 1px 1px; border: 1px solid #bb9; padding: 1px 4px 1px 20px; margin: 0 5px; display: block; float: left; line-height: 1.4em; overflow: hidden; white-space: nowrap; } .damncrc-iconbar .away .t { color: #9c9e84; } .damncrc-alertbox a { text-decoration: underline; }\n"
				+ (($x("//div[@class='damntcf-preload']").length <= 0) ? ".damnc-tabbar { padding-top: 1px; } .damnc-tabbar strong, .damnc-tabbar a { background: transparent url(" + this.imgs[4] + ") no-repeat 0 -110px !important; } .damnc-tabbar strong:not(.withX), .damnc-tabbar a { padding-right: 5px !important; } .damnc-tabbar strong { background-position: 0 0 !important; } .damnc-tabbar a.disconnected { color: #728776 !important; }\n"
				+ ".damnc-tabbar strong i, .damnc-tabbar a i { background: transparent url(" + this.imgs[4] + ") no-repeat 100% -110px !important; } .damnc-tabbar strong i { background-position: 100% 0 !important; } #superdamnov .damnc-tabbar a { color: #2c3635; }\n"
				+ ".damnc-tabbar strong.sdt-hl, .damnc-tabbar a.sdt-hl, .damnc-tabbar strong.sdt-hl i, .damnc-tabbar a.sdt-hl i, #superdamnov a.sdt-hl { background-image: url(" + this.imgs[5] + ") !important; font-weight: bold; color: #b64242; }\n"
				+ ".damnc-tabbar strong.sdt-ho, .damnc-tabbar a.sdt-ho, .damnc-tabbar strong.sdt-ho i, .damnc-tabbar a.sdt-ho i, #superdamnov a.sdt-ho { background-image: url(" + this.imgs[6] + ") !important; font-weight: bold; color: #fff; }\n"
				+ ".damnc-tabbar a.sdt-hb { background-position: 0 0 !important; } .damnc-tabbar a.sdt-hb i { background-position: 100% 0 !important; } .damnc-tabbar a.sdt-hl.sdt-hb, #superdamnov a.sdt-hl.sdt-hb { color: #fff; } .damnc-tabbar a.sdt-ho.sdt-hb, #superdamnov a.sdt-ho.sdt-hb { color: #88938d; }\n"
				+ ".damnc-tabbar a span.unread { font-size: 85%; background-color: #b64242; color: #fff; margin: 0 -2px 0 5px; padding: 0 .3em; border-radius: .5em; -moz-border-radius: .5em; -webkit-border-radius: .5em; } .damnc-tabbar a.sdt-hl.sdt-hb span.unread { background-color: #fff; color: #b64242; }\n"
				+ ".damnc-tabbar a.sdt-ho span.unread { background-color: #fff; color: #88938d; } .damnc-tabbar a.sdt-ho.sdt-hb span.unread { background-color: #88938d; color: #fff; }\n" : "")
				+ "#sdprefsbtn { position: absolute; top: 2px; right: 110px; cursor: pointer; } #superdamnov { position: fixed; z-index: 300; top: 0; left: 0; right: 0; bottom: 0; background: transparent url(" + this.imgs[0] + "); overflow-x: auto; /* For some reason, Flash elements don't overlap when this is set */ }\n"
				+ "#superdamnov #sdprefs { position: fixed; z-index: 301; top: 0; left: 0; right: 0; width: 800px; margin: 0 auto; } #superdamnov #sdprefs .gr-body .gr { overflow: auto; }\n"
				+ "#superdamnov .gr-box { margin-bottom: 0; } .gr-box .sdbicon { display: inline-block; width: 16px; height: 16px; vertical-align: top; margin-top: 1px; }\n"
				+ "#superdamnov #sdprefs h3 { background: transparent url(" + this.imgs[2] + ") repeat-x left center; font: bold 100% Verdana, sans-serif; text-shadow: 1px 1px 0 #f7f7f7; /* Standard */ color: #424846; letter-spacing: 0em; margin-bottom: -.5em; }\n"
				+ "#superdamnov #sdprefs h3 span { background-color: #dae4d9; padding-right: 7px; } #superdamnov #sdprefs label { margin-right: 1em; } #superdamnov #sdprefs .version strong { color: #e52; }\n"
				+ "#superdamnov #sdprefs #bg-prefid { background-color: #e5ebe3; color: #424846; border: 1px solid #b4bdb4; padding: 2px 5px; }\n"
				+ "#superdamnov #sdprefs p label.l { float: left; width: 12em; margin: 0; } #superdamnov #sdprefs .subsection { margin-left: 1.5em; margin-top: -.7em; }\n"
				+ "#superdamnov #sdprefs .sdp-damnline { display: inline; cursor: default; background-color: #f9fbf9; /*#dce7dc;*/ border: 1px solid #98ae9d; color: #393d3c; padding: 2px 7px; font-size: 92%; } #superdamnov #sdprefs .sdp-damnline.disabled { background-color: #dce7dc; color: #838a85; text-shadow: -1px -1px 0 #f7f7f7; }\n"
				+ "#superdamnov #sdprefs .sdp-damnline input { background-color: inherit; padding: 0; margin: 0; font: 100% Verdana, sans-serif; color: inherit; border-width: 0; width: 500px; text-shadow: inherit; letter-spacing: inherit; border-radius: 0; -moz-border-radius: 0; -webkit-border-radius: 0; box-shadow: none; -moz-box-shadow: none; -webkit-box-shadow: none; } #superdamnov #sdprefs .sdp-damnlineaction, #superdamnov #sdprefs .sdp-damnlineaction input { font-style: italic; }\n"
				+ "#superdamnov small, .superdamnlist small { color: #6c7977; font-size: 90%; } #superdamnov .gr-top small { color: #98a39f; } #superdamnov small.l { display: block; margin: 0.5em 2.3em 0; } #superdamnov .gmbutton2town small { display: inline-block; margin-top: 6px; } #superdamnov small a, .superdamnlist small a { color: inherit !important; }\n"
				+ "#superdamnov small a.newversion { background-color: #060; color: #fff !important; font-weight: bold; padding: 4px 12px; margin: 0 0 0 10px; } #superdamnov small a.newversion:hover { background-color: #090; }\n"
				+ "#superdamnov a { color: #196ba7; } #superdamnov a.gmbutton2 { color: #4c645e; } #superdamnov .att { font-weight: bold; background-color: #c00; color: #fff; padding: 1px 5px; }\n"
				+ "#superdamnov .damnc-tabbar { float: right; border: 1px solid #607466; background-color: #728776; padding-right: 8px; padding-top: 5px; margin-top: 5px; }\n"
				+ ".superdamnlist { border: 1px solid #b4bdb4; color: #57625c; list-style-position: inside; max-height: 18em; overflow: auto; padding: 0; } .superdamnlistbox { height: 12em; }\n"
				+ ".superdamnlist li { position: relative; padding: 4px 10px; font-size: 90%; } .damncr .superdamnlist li { font-size: 100%; } .superdamnlist li strong { color: #241b1e; }\n"
				+ ".superdamnlist li a.remove { display: none; width: 15px; height: 15px; background: transparent url(http://st.deviantart.com/styles/minimal/minish/close-ad.gif) no-repeat 0 -15px; text-indent: -9999px; position: absolute; top: 4px; right: 10px; }\n"
				+ ".superdamnlist li.even { background-color: #cfd9cf; } .superdamnlist li.hint { color: #dae4d9; margin: 1.5em 0; } .damncr .superdamnlist li.hint { margin: .5em 0; } .superdamnlist li.hint em { color: #6c7977; } .superdamnhint { font-size: 90%; color: #6c7977; } .damncr .superdamnhint { font-size: 100%; }\n"
				+ ".superdamnlist li a.tofield, #superdamnemotes li a.tofield { display: none; background: #dae4d9 url(" + this.imgs[3] + ") no-repeat right center; color: #6c7977; position: absolute; top: 3px; right: 10px; padding: 0 16px 1px 7px; } .superdamnlist li.even a.tofield { background-color: #cfd9cf; }\n"
				+ ".superdamnlist li:hover a.remove, .superdamnlist li:hover a.tofield, #superdamnemotes li:hover a.tofield, #superdamnemotes li:hover a.viewdev, #superdamnemotes li:hover a.remove { display: block; }\n"
				+ ".superdamn-buttonbar { display: inline; font-size: 11px; position: relative; top: -3px; margin: 0; } .superdamn-buttonbar2 { display: inline; font-size: 11px; vertical-align: text-bottom; margin: 0; } .superdamnbutton { display: inline-block; cursor: pointer; padding: 0; margin: 0 2px 0 0; width: 16px; height: 16px; background-repeat: no-repeat; text-indent: -900em; }\n"
				+ ".superdamnbutton a.ak { display: none; } .damncrc-icon-roomname, .damncrc-icon-roomname:not(:-moz-any-link) { top: 3px; } .superdamnbutton.bold { background-image: url(" + this.imgs[8] + "); }  .superdamnbutton.italic { background-image: url(" + this.imgs[9] + "); }\n"
				+ ".superdamnbutton.underline { background-image: url(" + this.imgs[10] + "); } .superdamnbutton.link { background-image: url(" + this.imgs[11] + "); } .superdamnbutton.thumb { background-image: url(" + this.imgs[12] + "); } .superdamnbutton.thumb.alt { background-image: url(" + this.imgs[13] + "); }\n"
				+ ".superdamnbutton.code { background-image: url(" + this.imgs[14] + "); } .superdamnbutton.code.alt { background-image: url(" + this.imgs[15] + "); } .superdamnbutton.superscript { background-image: url(" + this.imgs[16] + "); } .superdamnbutton.subscript { background-image: url(" + this.imgs[17] + "); }\n"
				+ ".superdamnbutton.website { background-image: url(" + this.imgs[18] + "); width: 17px; } .superdamnbutton.multiline { background-image: url(" + this.imgs[19] + "); margin-right: 1em; } .superdamnbutton.emotes { background-image: url(" + this.imgs[20] + "); width: 22px; margin-right: 1em; }\n"
				+ "#superdamnemotes { position: absolute; border: 1px solid #98ae9d; border-width: 1px 1px 0; background-color: #d0d9cf; z-index: 20; padding: 3px 7px 0; } #superdamnemotes .close, #superdamnmessage .close { float: right; display: block; width: 12px; height: 12px; margin: 4px 0 0 10px; background: transparent url(http://s.deviantart.com/minish/chat/closebig.gif) no-repeat -4px -4px; }\n"
				+ "#superdamnemotes h3 { float: left; } #superdamnemotes .toplinks { font-size: 11px; margin: 0 8px; position: relative; top: 4px; } #superdamnemotes a { color: #40534a; text-decoration: underline; }\n"
				+ "#superdamnemotes ul.browse { clear: both; border: 1px solid #98ae9d; background-color: #f7f7f7; max-height: 19em; overflow: auto; font-size: 11px; list-style-type: none; padding: 0 0 5px; margin: 0; width: 319px; }\n"
				+ "#superdamnemotes ul.browse li { border-bottom: 1px solid #ccc; padding: 2px 7px; position: relative; } #superdamnemotes ul li.h { font-weight: bold; background-color: #eee; }\n"
				+ "#superdamnemotes ul.browse li .votes { position: absolute; right: 45px; z-index: 21; color: #999; } #superdamnemotes li .voteb, #superdamnemotes ul li .img { display: none; font-weight: bold; } #superdamnemotes li .voteb a { color: #6c7977; text-decoration: none; } #superdamnemotes li:hover .voteb { display: inline; }\n"
				+ "#superdamnemotes ul.browse li.disabled { color: #728776; font-style: italic; } #superdamnemotes ul.browse li.hint { color: #728776; font-style: italic; margin: 1.5em 0; border-width: 0; text-align: center; }\n"
				+ "#superdamnemotes ul.browse li.loading { background: transparent url(http://e.deviantart.net/emoticons/e/eager.gif) no-repeat 3px 2px; padding-left: 22px; }\n"
				+ "#superdamnemotes ul.letters { clear: both; list-style-type: none; padding: 0; margin: 0 0 0 8px; color: #728776; font-size: 11px; } #superdamnemotes ul.letters li { float: left; margin: 0 .3em .3em 0; cursor: pointer; } #superdamnemotes ul.letters li:hover { color: #40534a; }\n"
				+ "#superdamnemotes ul.letters li.selected { background-color: #98ae9d; font-weight: bold; color: #000; padding: 0 3px .3em; margin-bottom: 0; cursor: auto; } #superdamnemotes ul.letters li.selected:hover { color: #000; }\n"
				+ "#superdamnemotes li a.tofield { width: 16px; height: 16px; padding: 0; top: 1px; right: 6px; background-color: transparent; } #superdamnemotes li.disabled a.tofield { display: none !important; }\n"
				+ "#superdamnemotes li a.viewdev { width: 12px; height: 7px; position: absolute; top: 6px; right: 23px; background: transparent url(" + this.imgs[7] + ") no-repeat; display: none; }\n"
				+ "#superdamnemotes li a.remove { width: 8px; height: 8px; position: absolute; top: 6px; right: 45px; background: transparent url(" + this.imgs[22] + ") no-repeat; display: none; }\n"
				+ "#superdamnemotes form { clear: both; border: 1px solid #98ae9d; padding: 8px 10px; font-size: 11px; color: #728776; width: 299px; margin: 0 0 10px; } #superdamnemotes #sde-addemf { margin: 0; } #superdamnemotes #sde-searchf input { margin: 4px 0 0; width: 293px; }\n"
				+ "#superdamnemotes form p label.l { float: left; width: 10em; margin: 0; color: #40534a; font-weight: bold; } #superdamnemotes form p.input { border: 1px solid #98ae9d; border-width: 1px 0; padding: 10px 0; } #superdamnemotes form p.loading { background: transparent url(http://e.deviantart.net/emoticons/e/eager.gif) no-repeat right center; }\n"
				+ "#superdamnemotes form p label.l select { background-color: #d0d9cf; border-width: 0; padding: 0 5px 0 0; margin: 0; font-family: Verdana, Tahoma, sans-serif; font-size: 11px; font-weight: bold; color: #40534a; } #superdamnemotes form p label.l select.disabled { color: #838a85; text-shadow: -1px -1px 0 #f7f7f7; }\n"
				+ "#superdamnemotes form input.loading { background-image: url(http://e.deviantart.net/emoticons/e/eager.gif); background-repeat: no-repeat; background-position: right center; }\n"
				+ "#superdamnemotes .bottom { text-align: right; font-size: 11px; margin: .2em 0; } #superdamnemotes .bottom span { float: left; } #superdamnemotes .bottom a.loading, .superdamn-topicer .meta div.loading { background: transparent url(http://e.deviantart.net/emoticons/e/eager.gif) no-repeat left center; padding-left: 20px; }\n"
				+ "#superdamnempreview { border: 1px solid #98ae9d; background-color: #dce7dc; padding: 3px; position: absolute; z-index: 40; } #superdamnempreview img { max-width: 100px; max-height: 100px; }\n"
				+ "#superdamnmessage { position: absolute; top: 10px; right: 10px; background-color: #728776; border: 1px solid #313f3a; color: #fff; padding: 2px 7px; max-width: 35%; opacity: .8; z-index: 900; font-size: 11px; }\n"
				+ "#superdamnmessage.yay { background-color: #090; border-color: #060; } #superdamnmessage.nay { background-color: #900; border-color: #600; } #superdamnmessage a { color: inherit; } #superdamnmessage a.download { text-decoration: underline; }\n"
				+ ".damncr-title .superdamn-editbutton, .damncrc-topic .superdamn-editbutton { display: none; position: absolute; top: 2px; right: 2px; width: 22px; height: 20px; cursor: pointer; background: transparent url(http://st.deviantart.net/minish/gruzecontrol/astro-megazord.png) no-repeat; background-position: 0 0; }\n"
				+ ".damncr-title:hover .superdamn-editbutton, .damncrc-topic:hover .superdamn-editbutton { display: block; } .superdamn-editbutton:hover { background-position: 0 -27px !important; }\n"
				+ ".superdamn-topicer textarea { width: 100%; } .superdamn-topicer .meta { background-color: #bbc6b9; padding: 2px 5px 5px; position: relative; overflow: hidden; } .damncrc-topic .superdamn-topicer .meta { background-color: #9eaea0; }\n"
				+ ".superdamn-topicer .meta span { position: relative; top: 2px; z-index: 20; background-color: inherit; } .superdamn-topicer .meta div { position: absolute; top: 2px; right: 5px; z-index: 19; }\n"
				+ ".superdamn-devlink { background: #c9d3c8 url(" + this.imgs[21] + ") no-repeat 6px 2px; padding: 3px 6px 3px 28px; text-decoration: none !important; } .superdamn-devlink em { font-style: italic; text-decoration: underline; color: #4a524e; } .superdamn-devlink strong { font-weight: bold; color: #647068;/*#98ae9d;*/ }\n"
				+ ".damncrc-chat-window a.superdamn-devlink, .damncrc-topic a.superdamn-devlink, .damncr-title a.superdamn-devlink { text-decoration: none !important; }"
	},
	u: dAmn_Client_Username,
	
	// Standard user preferences (not YOURS, they're stored somewhere else. DON'T CHANGE THIS)
	P:       { "timestamps": true, "useam": true, "awaymsg": "is away: %REASON%", "backmsg": "is back", "beepmsg": "%USER%: I've been away for %TIMESINCE%. Reason: %REASON%", "showbeep": true, "beepinterval": 60, "fixtabs": 1, "formattingbuttons": true, "ignores": {}, "useignore": true, "showignore": true, "retroignore": true, "ignoremsg": "is ignoring %USER% now", "unignoremsg": "is not ignoring %USER% anymore", "customemotes": false, "publicemotes": true, "emotes": {}, "pickerright": false, "showsend": false, "ignoreversions": [], "tabscounts": true, "nothumbshighlight": false },
	Pt:      false, // Temporary P, for while you're changing preferences
	
	off:     true,
	away:    false,
	viewing: true,
	debug:   false,
	v7:      true,
	nac:     ["chat:devart", "chat:devious", "chat:fella", "chat:help", "chat:mnadmin", "chat:idlerpg", "chat:irpg", "chat:trivia", "chat:photographers", "chat:daunderworldrpg", "debug:conn"], // noAwayChats
	pe:      {}, // Public custom emotes
	
	// "Structured" public and individual emotes
	ems:     {"a":{},"b":{},"c":{},"d":{},"e":{},"f":{},"g":{},"h":{},"i":{},"j":{},"k":{},"l":{},"m":{},"n":{},"o":{},"p":{},"q":{},"r":{},"s":{},"t":{},"u":{},"v":{},"w":{},"x":{},"y":{},"z":{},"#":{},"*":{}},
	spe:     false,
	sie:     false,
	
	postrequests:  {},
	postcallbacks: {},
	
	ambassadors: [],
	newVersion: false,
	
	unread: { count: 0, lastuser: "", process: 0 },
	departing: [],
	
	browser: {
		version: (navigator.userAgent.match(/(firefox|iceweasel|chrome|safari|version)\/([0-9.]+)/i) || [])[2],
		firefox: /(firefox|iceweasel)/i.test(window.navigator.userAgent),
		safari:  (/safari/i.test(window.navigator.userAgent)) && (!/chrome/i.test(window.navigator.userAgent)),
		chrome:  /chrome/i.test(window.navigator.userAgent)
	},
	
	// Utility functions
	addstyle: function(str, id){ var el = document.createElement("style"); el.type = "text/css"; el.className = id ? id : "superdamnstyles"; el.appendChild(document.createTextNode(str)); document.getElementsByTagName("head")[0].appendChild(el) },
	pad:      function(int){ if(int < 10){ return "0" + int } return int },
	oc:       function(a){ var o = {}; for(var i=0;i<a.length;i++){ o[a[i]] = ""; } return o }, // Converting an array to an object literal; from http://snook.ca/archives/javascript/testing_for_a_v/
	ocl:      function(a){ var o = {}; for(var i=0;i<a.length;i++){ o[a[i].toLowerCase()] = ""; } return o }, // Same as above, but lowercase'd
	he:       function(str){ return str.toString().replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") }, // Special HTML chars encode
	re:       function(str){ return str.toString().replace(/&quot;/g, "\"").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&") }, // Special HTML chars decode
	ac:       function(el, cn){ if(!el.className){ el.className = cn } else { el.className = el.className + " " + cn } }, // addClass
	hc:       function(el, cn){ return ((" " + el.className + " ").indexOf(" " + cn + " ") >= 0) }, // Whether className has class
	rc:       function(el, cn){ el.className = this.trim((" " + el.className + " ").replace(" " + cn + " ", " ")) },
	ol:       function(obj){ var l = 0; for(var p in obj){ if(obj.hasOwnProperty(p)){ l++ } } return l }, // Object length
	oe:       function(obj){ return (this.ol(obj) <= 0) }, // Whether object is empty (e.g. {})
	ia:       function(a){ return !!(a && a.constructor == Array) }, // Whether argument is an array
	time:     function(){ return ((new Date()).getTime()) / 1000 }, // Unixtime
	trim:     function(str){ return str.replace(/^\s+|\s+$/g,"") }, // Thanks to http://www.somacon.com/p355.php
	ltrim:    function(str){ return str.replace(/^\s+/,"") },
	rtrim:    function(str){ return str.replace(/\s+$/,"") },
	explode:  function(str, del, lim){ var s = str.toString().split(del.toString()); var a = s.splice(0, lim); var b = s.join(del.toString()); a.push(b); return a }, // Kudos to PHP-JS; http://phpjs.org/functions/explode
	reason:   function(str, r){ r = r ? r : "reason"; return str ? str : "(No " + r + ")" },
	numeric:  function(str){ return !!str.match(/^[0-9]+$/) }, // Is string numeric? (e.g. an int in a string)
	oconcat:  function(obj1, obj2){ for(var p in obj2){ obj1[p] = obj2[p] } return obj1 }, // Concat with property:value objects (overwriting)
	strrev:   function(str){ return str.split("").reverse().join("") }, // Reverse a string
	// -- MM dependent
	notice:   function(str, timeout){ return MiddleMan.Interface.chatNotice(false, str, timeout) },
	cnotice:  function(cmd, str, timeout){ return this.notice(cmd + ": " + str, timeout) },
	error:    function(cmd, str, timeout){ return this.notice(cmd + " error: " + str, timeout) },
	// Our elements
	sdov:     function(){ return document.getElementById('superdamnov') }, // These (hopefully) always exists
	sdsb:     function(){ return document.getElementById('sdprefsbtn') },
	sdpr:     function(){ return document.getElementById('sdprefs') }, // These might exist
	sdak:     function(){ return document.getElementById('superdamnaccesskeys') },
	sdep:     function(){ return document.getElementById('superdamnemotes') },
	sdev:     function(){ return document.getElementById('superdamnempreview') },
	sdis:     function(){ return document.getElementById('superdamnignores') },
	sdm:      function(){ return document.getElementById('superdamnmessage') },
	
	// Commands
	cmds: {
		//              0               1
		// Cmd   :      Name       Params
		"setaway":     ["Set away",     1],
		"setback":     ["Set back",     1],
		"antikick":    ["Antikick",     1],
		"ignore":      ["Ignore",       1],
		"unignore":    ["Unignore",     1],
		"chat":        ["Chat",         1],
		"gettopic":    ["Get topic",    0],
		"gettitle":    ["Get title",    0],
		"topicadd":    ["Topic add",    1],
		"titleadd":    ["Title add",    1],
		"faqsearch":   ["FAQ search",   1],
		"clearall":    ["Clear all",    0],
		"emotes":      ["Emotes list",  0],
		"emotesearch": ["Emote search", 1],
		"kickban":     ["Kick + ban",   1],
		"depart":      ["Depart",       1],
		"prefs":       ["Preferences",  0],
		"quit":        ["Quit",  0],
		"quitnoreload":["Quit no reload",  0]
	},
	
	// BASIC PARTS --------------------------------------
	
	// INIT: This function initializes the whole script, adds handlers and other things needed
	init: function(){
		if(!this.detectincompatibilities()){
			dAmn_Client_Agent += " with SuperdAmn " + this.v
			if(typeof window.FAQloaded    == "undefined"){ window.FAQloaded    = false }
			if(typeof window.IBLloaded    == "undefined"){ window.IBLloaded    = false }
			if(typeof window.superdAmn_GM == "undefined"){ window.superdAmn_GM = false }
			
			window.onfocus = superdAmn.focus
			window.onblur  = superdAmn.blur
			
			this.updatecheck()
			
			// Add the styles to the head
			this.s()
			this.addstyle(this.styles)
			
			// Initialize our accesskey storage
			this.accesskeys.init()

			// Initialize our pref system
			this.prefs.init()

			// Initialize our emotes system
			this.emotes.init()
			
			// Initialize our ignores system
			this.ignores.init()

			// Initialize our dAmn bindings
			this.dAmn.init()
			this.buttons.init()

			// Initialize our commands
			for(var cmd in this.cmds){
				var d = this.cmds[cmd]
				MiddleMan.Commands.bind(cmd, d[1], this.commands[cmd])
			}
			this.updateslows()
			this.updatemembers()
			this.off = false
			this.extend.trigger("ready")
		}
	},
	
	// COMMANDS -----------------------------------------
	// Each method below is run at the corresponding 
	// /command in a dAmn chatroom.
	commands: {
		// SETAWAY: Sets your status to away with given reason, notes the time and tells the world
		setaway: function(reason){
			if(!reason){ reason = "" }
			var SD      = superdAmn
			reason      = SD.trim(reason)
			SD.away     = { r: reason, t: SD.time(), b: SD.time() } // r: Reason, t: Time, b: Timestamp of last beep
			var d       = new Date(); d.noseconds = true
			var display = "<strong>Currently away:</strong> " + (reason ? (reason.length > 70 ? SD.he(reason.substr(0,70)) + "&#8230;" : SD.he(reason)) : "<em>No reason</em>") + " <span class=\"t\">(since <strong>" + SD.format.timestamp(d) + "</strong>)</span>"
			var tooltip = reason.length > 70 ? reason : ""
			Array.prototype.forEach.call($x("//span[@class='away' and (ancestor::div[contains(concat(' ',normalize-space(@class),' '),' damncrc-iconbar ')])]"), function(el){ el.parentNode.removeChild(el) })
			for(var ns in dAmnChats){
				var ib = dAmnChats[ns].channels.main.iconbar_el
				var ab = document.createElement("span")
				ab.className      = "away"
				ab.innerHTML      = display
				ab.title          = tooltip
				if(!dAmnChats[ns].channels.main.awayspace_el){
					superdAmn.buttons.chatinit(dAmnChats[ns])
				}
				ab.style.maxWidth = SD.buttons.awaymaxwidth(ns) + "px"
				dAmnChats[ns].channels.main.awayspace_el.appendChild(ab)
				if(ns.toLowerCase() in SD.oc(SD.nac)){ continue }
				if(SD.trim(SD.P.awaymsg) != ""){
					MiddleMan.dAmnSend.action(ns, SD.format.awayMsg(SD.P.awaymsg))
				}
			}
		},
		// SETBACK: Sets your status to back and tells the world
		setback: function(message){
			if(!message){ message = "" }
			var SD = superdAmn
			if(SD.away){
				if(SD.trim(SD.P.backmsg) != ""){
					for(var ns in dAmnChats){
						if(ns.toLowerCase() in SD.oc(SD.nac)){ continue }
						MiddleMan.dAmnSend.action(ns, SD.format.awayMsg(SD.P.backmsg, null, message))
					}
				}
				SD.cnotice("setback", "You were away for " + SD.format.tstr(SD.time() - SD.away.t) + ".")
				SD.away = false
				Array.prototype.forEach.call($x("//span[@class='away' and (ancestor::div[contains(concat(' ',normalize-space(@class),' '),' damncrc-iconbar ')])]"), function(el){ el.parentNode.removeChild(el) })
			} else {
				SD.error("setback", "You&#8217;re not away")
			}
		},
		// ANTIKICK: Turns antikick on or off
		antikick: function(onoff) {
			var SD = superdAmn
			if(onoff == "on") {
				if(SD.P.antikick) {
					SD.error("antikick", "Antikick is already <b>on</b>.");
				} else {
					SD.cnotice("antikick", "Antikick has been turned <b>on</b>.");
					SD.P.antikick = true;
					SD.prefs.save();
				}
			} else if(onoff == "off") {
				if(SD.P.antikick == false) {
					SD.error("antikick", "Antikick is already <b>off</b>.");
				} else {
					SD.cnotice("antikick", "Antikick has been turned <b>off</b>.");
					SD.P.antikick = false;
					SD.prefs.save();
				}
			} else {
				SD.error("antikick", "Syntax: /antikick <i>[on/off]</i>");
			}
		},
		// IGNORE: Puts the user specified on the ignore list or displays that list
		ignore: function(user){
			var SD = superdAmn
			var ns = dAmnChatTab_active
			SD.dAmn.u()
			if(SD.P.useignore){
				var lcuser = user.toLowerCase()
				if(lcuser == SD.u.toLowerCase()){ SD.error("ignore", "You can't ignore yourself"); return false }
				if(window.IBLloaded && lcuser in SD.oc(ignoreBlacklist)){ SD.error("ignore", "You can't ignore Message Network Operators"); return false }
				if(lcuser == "list" || !user){
					// LIST
					var a     = SD.ol(SD.P.ignores)
					var html  = "<p class=\"nt\">You are currently ignoring <strong>" + a + "</strong> <span>pe" + ((a == 1) ? "rson" : "ople") + ((a == 0) ? "." : ":") + "</span>" + "</p>"
					if(a > 0){
						var i = 1
						html += "<ol class=\"superdamnlist\">"
						for(var u in SD.P.ignores){
							var d = new Date()
							d.setTime(SD.P.ignores[u]*1000)
							html += "<li" + ((i++ % 2) ? " class=\"even\"" : "") + ">"
							html += "<strong><a target=\"_blank\" href=\"http://" + SD.he(u) + ".deviantart.com/\">" + SD.he(u) + "</a></strong> "
							html += "<small>at " + d.toLocaleString() + "</small> "
							html += "<a class=\"remove\" id=\"sdp-unignore-" + SD.he(u) + "\" href=\"javascript://\" title=\"Unignore this user\">Unignore</a>"
							html += "</li>" 
						}
						html += "</ol>"
					}
					b   = SD.dAmn.makebox(ns, "<i class=\"sdbicon\" style=\"background:transparent url(http://st.deviantart.net/minish/gruzecontrol/icons-gruser.gif) no-repeat -963px -3px\"></i> Ignore List", html)
					rms = $x(".//a[@class='remove']", b)
					if(rms.length > 0){
						Array.prototype.forEach.call(rms, function(el){
							el.un = el.id.substr(13)
							el.id = ""
							el.addEventListener("click", function(evt){
								evt.preventDefault()
								superdAmn.commands.unignore(this.un)
								var ol = this.parentNode.parentNode
								var pt = ol.previousSibling
								var na = parseInt(pt.childNodes[1].childNodes[0].data) - 1
								ol.removeChild(this.parentNode)
								pt.childNodes[1].childNodes[0].data = na
								pt.childNodes[3].childNodes[0].data = ((na == 1) ? "person" : "people") + ((na == 0) ? "." : ":")
								if(na == 0){ ol.parentNode.removeChild(ol) }
								// I'm tree climing, but I made this thing so I won't get lost I swear :(
							}, false)
						})
					}
				} else {
					var users   = user.split(" ")
					var lcusers = lcuser.split(" ")
					for(var u in users){
						if(!/^[a-zA-Z0-9-]+$/.test(lcusers[u])){ SD.error("ignore", users[u] + " is an invalid user name."); continue }
						if(lcusers[u] in SD.P.ignores){
							SD.error("ignore", users[u] + " is already on your ignore list. Type <em>/ignore list</em> to see it.")
						} else {
							SD.ignores.add(lcusers[u])
							SD.cnotice("ignore", users[u] + " was added to your ignore list.")
							if(SD.P.showignore && SD.P.ignoremsg){
								MiddleMan.dAmnSend.action(ns, SD.format.userMsg(SD.P.ignoremsg, users[u]))
							}
						}
					}
				}
			} else {
				SD.error("ignore", "You do not have ignore functionality turned on. Please open the <a href=\"javascript://\" onclick=\"superdAmn.prefs.show(); return false\">SuperdAmn Preference panel</a> to turn it back on.")
			}
		},
		// UNIGNORE: Removes user specified from your ignore list
		unignore: function(user){
			var SD = superdAmn
			var ns = dAmnChatTab_active
			SD.dAmn.u()
			if(SD.P.useignore){
				var lcuser  = user.toLowerCase()
				var users   = user.split(" ")
				var lcusers = lcuser.split(" ")
				for(var u in users){
					if(lcusers[u] in SD.P.ignores){
						SD.ignores.remove(lcusers[u])
						SD.cnotice("unignore", users[u] + " was removed from your ignore list.")
						if(SD.P.showignore && SD.P.unignoremsg){
							MiddleMan.dAmnSend.action(ns, SD.format.userMsg(SD.P.unignoremsg, users[u]))
						}
					} else {
						SD.error("unignore", users[u] + " could not be found on your ignore list. Type <em>/ignore list</em> to see it.")
					}
				}
			} else {
				SD.error("ignore", "You do not have ignore functionality turned on. Please open the <a href=\"javascript://\" onclick=\"superdAmn.prefs.show(); return false\">SuperdAmn Preference panel</a> to turn it back on.")
			}
		},
		// CHAT: Initiates a private chat session with the supplied user
		chat: function(user){ MiddleMan.dAmnSend.chat(user) },
		// GETTITLE/GETTOPIC: Gets the current title/topic in the format that they were typed by the user(s) and puts it in the input field
		gettitle: function(args, topic){
			if(typeof topic == "undefined" || !topic){ t = "title" } else { t = "topic" }
			var SD = superdAmn
			var ns = dAmnChatTab_active
			if(dAmnChats[ns].SD && (dAmnChats[ns].SD[t + "_el_orig"] || dAmnChats[ns].SD[t + "_el_orig"] === "")){
				var by = dAmnChats[ns].SD[t + "_el_by"]
				var ti = new Date()
				ti.setTime(dAmnChats[ns].SD[t + "_el_ts"] * 1000)
				setTimeout(function(){
					MiddleMan.Interface.setInputText(ns, "/" + t + " " + dAmnChats[ns].SD[t + "_el_orig"])
					SD.notice(t + " info: Set by <a href=\"http://" + by.toLowerCase() + ".deviantart.com/\" target=\"_blank\">" + SD.he(by) + "</a> on <em>" + ti.toLocaleString() + "</em>")
				}, 100) // This is retarded with a big R. Damn you, MM.
			} else {
				SD.error("get" + t, "Could not retrieve the " + t + " source. You can <a href=\"javascript://\" onclick=\"superdAmn.dAmn.reloadTopicTitle(dAmnChatTab_active);return false\">click here</a> to try to reload topic and title, then try again.")
			}
		},
		gettopic: function(args){ superdAmn.commands.gettitle(args, true) },
		// TITLEADD/TOPICADD: Adds supplied string at the end of current title/topic
		titleadd: function(args, topic){
			if(typeof topic == "undefined" || !topic){ t = "title" } else { t = "topic" }
			var ns = dAmnChatTab_active
			if(dAmnChats[ns].SD && (dAmnChats[ns].SD[t + "_el_orig"] || dAmnChats[ns].SD[t + "_el_orig"] === "")){
				dAmn_Set(ns, t, dAmnEscape(dAmnChats[ns].SD[t + "_el_orig"] + " " + args))
			} else {
				SD.error("get" + t, "Could not retrieve the " + t + " source. You can <a href=\"javascript://\" onclick=\"superdAmn.dAmn.reloadTopicTitle(dAmnChatTab_active);return false\">click here</a> to try to reload topic and title, then try again.")
			}
		},
		topicadd: function(args){ superdAmn.commands.titleadd(args, true) },
		// FAQSEARCH: Searches through the online FAQ database for questions matching supplied keywords
		faqsearch: function(args){
			var SD = superdAmn
			var ns = dAmnChatTab_active
			jQuery.getJSON("http://temple.24bps.com/superdamn/faqsearch.php?q=" + encodeURIComponent(args) + "&jsoncallback=?&" + (new Date()).getDay(),
				function(data){
					var html = "<p class=\"nt\">"
					if(!data || (data.length && data.length == 0) || SD.oe(data)){
						html += "Search results for <strong>" + SD.he(args) + "</strong> in the <a href=\"http://help.deviantart.com/\">FAQ</a>:</p><ol class=\"superdamnlist\">"
						html += "<li class=\"hint\"><em>No results! Sorry!</em></li>"
					} else {
						r = SD.ol(data)
						html += "We found <strong>" + r + "</strong> search result" + (r == 1 ? "" : "s") + " for <strong>" + SD.he(args) + "</strong> in the <a href=\"http://help.deviantart.com/\">FAQ</a>:</p><ol class=\"superdamnlist\">"
						var i = 1
						for(var id in data){
							html += "<li" + ((i++ % 2) ? " class=\"even\"" : "") + ">"
							html += "<strong>FAQ #" + SD.he(id) + ":</strong> <a href=\"http://help.deviantart.com/" + SD.he(id) + "/\">" + SD.he(data[id].question) + "</a> "
							html += "<small>in <a href=\"http://help.deviantart.com/" + SD.he(data[id].catpath) +  "/\">" + SD.he(data[id].category) + "</a></small> "
							html += "<a class=\"tofield\" id=\"sdf-tofield-" + SD.he(id) + "\" href=\"javascript://\">Add code to text field</a>"
							html += "</li>\n"
						}
					}
					html += "</ol>"
					b     = SD.dAmn.makebox(ns, "<span class=\"sdbicon\" style=\"background:transparent url(http://st.deviantart.net/minish/main/icons6.gif) no-repeat -812px -92px\"></span> FAQ Search Results", html)
					tfs   = $x(".//a[@class='tofield']", b)
					if(tfs.length > 0){
						Array.prototype.forEach.call(tfs, function(el){
							el.faqid = el.id.replace(/[^0-9]/g, "")
							el.id    = ""
							el.addEventListener("click", function(evt){ evt.preventDefault(); superdAmn.dAmn.appendInputText(ns, ":faq" + this.faqid + ":") }, false)
						})
					}
				}
			)
		},
		// CLEARALL: Clears all open chatrooms for content on your screen
		clearall: function(){
			for(var ns in dAmnChats){
				if(dAmnChats[ns] && dAmnChats[ns].channels && dAmnChats[ns].channels.main && dAmnChats[ns].channels.main.Clear){
					dAmnChats[ns].channels.main.Clear()
				}
			}
			for(var ns in dAmnChatTabs){
				var t = dAmnChatTabs[ns]
				if(t.tab_el.style.fontWeight == "bold"){
					if("timer" in t){ delete t.timer }
					t.flash_count      = -1
					t.data             = 0
					t.tab_el.className = ""
					//t.tab_el.setAttribute("style", "")
					t.tab_el.style.fontWeight = "normal"
					t.tab_el.style.color      = "inherit"
				}
			}
		},
		// EMOTES: Toggles the emotes picker
		emotes: function(){
			var SD = superdAmn
			if(SD.P.customemotes){
				if(!SD.sdep()){
					SD.error("emotes", "Emotes picker has not yet generated. Please try again in a second!")
					return false
				} else {
					SD.emotes.picker.toggle()
					return true
				}
			} else {
				SD.error("emotes", "You do not have custom emote functionality turned on. Please open the <a href=\"javascript://\" onclick=\"superdAmn.prefs.show(); return false\">SuperdAmn Preference panel</a> to turn it back on.")
				return false
			}
		},
		// EMOTESEARCH: Shows the emote picker and searches for custom emotes with supplied query
		emotesearch: function(args){
			var SD = superdAmn
			if(SD.commands.emotes()){
				SD.emotes.picker.show()
				var f  = document.getElementById("sde-addemf"),  b  = document.getElementById("sde-browser")
				var sf = document.getElementById("sde-searchf"), sb = document.getElementById("sde-search")
				var fb = document.getElementById("sde-addem")
				var si = $x(".//input", sf)[0]
				sf.style.display      = "block"
				sb.setAttribute("style", "")
				sb.childNodes[0].data = "Cancel search"
				if(b.style.display != "block"){
					f.style.display       = "none"
					b.style.display       = "block"
					fb.nextSibling.data   = " / "
					fb.childNodes[0].data = "Add emote"
				}
				si.value = args
				SD.emotes.picker.search(si.value)
			}
		},
		// KICKBAN: Kicks the user with the specified reason, then immediately bans them -- makes it easier to give reasons for bans
		kickban: function(args){
			var SD  = superdAmn, ns = dAmnChatTab_active
			var seg = SD.explode(args, " ", 1)
			MiddleMan.dAmnSend.kick(ns, seg[0], seg[1])
			MiddleMan.dAmnSend.ban(ns, seg[0])
		},
		// DEPART: Parts the current chatroom without closing the tab
		depart: function(x){
			if(x && superdAmn.trim(x) != ""){ superdAmn.error("depart", "You can only depart the room you are currently in. Please navigate to the room, and then depart it."); return false }
			if(dAmnChatTab_active){
				superdAmn.departing.push(dAmnChatTab_active)
				dAmn_Part(dAmnChatTab_active)
				return true
			}
		},
		// PREFS: A command that shows the SuperdAmn Preferences panel
		prefs: function(){
			superdAmn.prefs.show()
		},
		// QUIT: quits the chats and reloads
		quit: function(x) {
			dAmn_Command('send', 'disconnect\n');
			dAmn_Client_retry_connect=false;
			window.location.reload();
		},
		// QUIT: quits the chats and reloads
		quitnoreload: function(x) {
			dAmn_Command('send', 'disconnect\n');
			dAmn_Client_retry_connect=false;
		}
	},
	
	// dAMN ---------------------------------------------
	dAmn: {
		// INIT: Implements all the dAmn-related fixes
		init: function(){
			var SD = superdAmn
			this.addmaketexthandle()
			this.addmsghandle()
			this.addkickhandle()
			this.addtopicstores()
			this.addtabfixes()
			this.addcmdfixes()
			this.addresizefix()
			this.addavatarfix()
			this.addactivatehandle()
			this.addmemberlisthandle()
			this.adduserinfohandle()
			this.addremovehandle()
			this.addmsgextras()
			this.addchatextras()
			this.addformatextras()
			this.addtabextras()
			this.updatetitle()
			this.u()
		},
		u: function(){ if(!superdAmn.u){ superdAmn.u = dAmn_Client_Username } }, // If it ain't done already ...
		// MAKEBOX: Makes a gruser-style HTML box with specified content and adds it to the chat specified by ns
		makebox: function(ns, title, html){
			var b = dAmn_MakeDiv("gr-box")
			b.innerHTML = "<i class=\"gr1\"><i></i></i><i class=\"gr2\"><i></i></i><i class=\"gr3\"><i></i></i>"
						+ "<div class=\"gr-top\"><a class=\"sdmclose\" href=\"javascript://\"></a><div class=\"gr\"><h2>" + title + "</h2></div></div>"
						+ "<div class=\"gr-body\"><div class=\"gr\">" + html + "</div></div><i class=\"gr3\"></i><i class=\"gr2\"></i><i class=\"gr1\"></i>"
			if(el = $x(".//a[@class='sdmclose']", b)[0]){ el.addEventListener("click", function(evt){ evt.preventDefault(); b = this.parentNode.parentNode; b.parentNode.removeChild(b) }, false) }
			dAmnChats[ns].channels.main.addDiv(b, null, 0)
			return b
		},
		// ADDMAKETEXTHANDLE: Adds changes to dAmn's makeText function: Ignores, pchatting, timestamps
		addmaketexthandle: function(){
			dAmnChanChat.prototype.makeText = function(style, from, input_text, hilite){ // Function-mingling. I feel dirty.
				var SD     = superdAmn, evr
				var fromun = ""
				
				var checkStyle = function(style, str){
					return style.substr(0, str.length) == str
				}
				
				// Disconnect-ish highlight-preventing
				if(
					from.substr(0,7) == "*** You" &&
					(
						checkStyle(style, "disconnect") ||
						checkStyle(style, "join") ||
						(checkStyle(style, "part") && input_text == "[quit]")
					)
				){
					hilite = -1
				}
				
				// Ignores
				if(from.substr(0,4) == "&lt;" && from.substr(from.length-4,4) == "&gt;"){ fromun = from.substr(4, from.length-8) } // msg
				if(from.substr(0,2) == "* "){ fromun = SD.trim(from.substr(2)) } // action
				if(fromun && fromun.indexOf(" ") < 0 && ((this.cr.SD && !this.cr.SD.other) || !this.cr.SD)){
					var lcfrom = fromun.toLowerCase()
					var ufrom  = "u-" + lcfrom
					if(style.indexOf(ufrom) < 0){
						style += " " + ufrom
					}
					if(SD.P.useignore && lcfrom in SD.P.ignores && lcfrom != dAmn_Client_Username.toLowerCase()){
						if(!SD.P.retroignore){ style += " ignored" }
						hilite = -1
					}
				}
				if(from.substr(0,3) == "** " && !SD.trim(from.substr(3)).match(/\s+/)){ fromun = SD.trim(from.substr(3)) } // join, part, etc
				
				// Pchattin' should always highlight you
				if(this.cr.SD && this.cr.SD.other && fromun.toLowerCase() == this.cr.SD.other.toLowerCase()){ hilite = 2 }
				
                this.FormatMsg(input_text, bind(this, function (text) {
                    var o, i, ts, f, ff, t, tt
                    
                    o = dAmn_MakeDiv("msg " + style)
                    i = dAmn_AddDiv(o, "inner")
                    o.style.display = "none"
                    this.chat_el.appendChild(o)
                    
                    // Timestamps
                    if(SD.P.timestamps){ ts = dAmn_AddSpan(i, "ts", SD.format.timestamp() + " ") }

                    f  = dAmn_AddSpan(i, "from")
                    ff = dAmn_AddSpan(f, ((fromun && fromun != from) ? "ffc" : null), from + " ")
                //    if(fromun){ ff.onclick = function(){ superdAmn.dAmn.inputAddUsername(fromun) } } // Username clicks
                    
                    if(text){
                        t  = dAmn_AddSpan(i, "text")
                        tt = dAmn_AddSpan(t, null, text)
                        if("wrapEl" in this){ this.wrapEl(o) }
                        SD.dAmn.applyrecvextras(tt) // Where the magic happens
                    }
                    
                    // Allowing people to extend the functionality
                    evr = SD.extend.trigger("maketext", [o, i, ts, f, t, tt])
                    if((typeof evr == "boolean" && evr !== false) || (typeof evr == "object" && evr[0] !== false)){ // err detection
                        if(typeof evr == "object" && evr.length == 6){
                            o  = evr[0] // Change the HTML objects to the perhaps changed values
                            i  = evr[1]
                            ts = evr[2]
                            f  = evr[3]
                            t  = evr[4]
                            tt = evr[5]
                        }
                        
                        // Unread counters
                        if(hilite >= 2){
                            if(!SD.viewing){
                                SD.unread.count++
                                if(fromun && fromun != from && fromun != SD.u){
                                    SD.unread.lastuser = fromun
                                }
                                SD.dAmn.updatetitle()
                            }
                            if(this.cr.ns != dAmnChatTab_active){
                                if(!this.cr.SD){ this.cr.SD = {} }
                                if(!this.cr.SD.unread || typeof this.cr.SD.unread != "number"){
                                    this.cr.SD.unread = 1
                                } else {
                                    this.cr.SD.unread++
                                }
                            }
                        }
                        
                        // Adding message to chat
                        this.addDiv(o, true, hilite)
                        
                        // Neutralize "display" property
                        if(fromun && fromun.indexOf(" ") < 0){
                            o.setAttribute("style", (o.getAttribute("style") || "").replace(/display\s*:\s*[a-z-]+\s*;?/, ""))
                        }
                    }
                }));
			}
		},
		// ADDMSGHANDLE: Adds changes to dAmn's onMsg function: telling people that you're away
		addmsghandle: function(){
			MiddleMan.Event.bind("dAmnChat_recv", "msg", "superdAmn_recv_msg", function(pkt){
				var SD   = superdAmn
				var recv = dAmn_ParsePacket(pkt.body)
				var body = MiddleMan.parseMsg(recv.body)
				var lcfrom = recv.args.from.toLowerCase()
				// The below line is taken from dAmn's own code to determine whether your username is in the message
				if(-1 != body.search(RegExp("([^A-Za-z]+|^)" + dAmn_Client_Username + "([^A-Za-z]+|$|s$|s[^A-Za-z]+)", "im")) && body.indexOf("away") < 0 && !(SD.P.useignore && lcfrom in SD.P.ignores) && !(pkt.param.toLowerCase() in SD.oc(SD.nac))){
					if(SD.away && SD.P.showbeep && recv.args.from != dAmn_Client_Username && (SD.time() - SD.away.b) > SD.P.beepinterval){
						MiddleMan.dAmnSend.msg(pkt.param, SD.format.awayMsg(SD.P.beepmsg, recv.args.from))
						SD.away.b = SD.time()
					}
				}
				return pkt
			})
			/*MiddleMan.Event.bind("dAmnChat_recv", "action", "superdAmn_recv_action", function(pkt){
				var SD   = superdAmn
				var recv = dAmn_ParsePacket(pkt.body)
				var body = MiddleMan.parseMsg(recv.body)
				if(-1 != body.search(RegExp("([^A-Za-z]+|^)" + dAmn_Client_Username + "([^A-Za-z]+|$|s$|s[^A-Za-z]+)", "im"))){
					// Something...
				}
				return pkt
			})*/
		},
		// ANTIKICK: Rejoins when kicked
		addkickhandle: function() {
			MiddleMan.Event.bind("dAmnChat_self", "kicked", "superdAmn_recv_kicked", function(pkt) {
				var SD = superdAmn;
				if(SD.P.antikick == true) {
					dAmn_Join(pkt.param);
				}
			})
		},
		// ADDTOPICSTORES: Stores various metadata about the topic in our designated objects once we receive them
		addtopicstores: function(){
			// Storing information about topic and title
			MiddleMan.Event.bind("dAmnChat_property", "title", "superdAmn_gettitle", function(pkt){
				var SD = superdAmn
				var ns = pkt.param
				if(!dAmnChats[ns].SD){ dAmnChats[ns].SD = {} }
				dAmnChats[ns].SD.title_el_orig = SD.dAmn.deformatMsg(pkt.body) // The originally user-entered title
				dAmnChats[ns].SD.title_el_by   = pkt.args.by // By (who set it)
				dAmnChats[ns].SD.title_el_ts   = pkt.args.ts // Timestamp (when title was set)
				window.setTimeout(function(){ SD.dAmn.applyrecvextras(dAmnChats[ns].title_el); SD.dAmn.applytopicextras(dAmnChats[ns].title_el, ns, "title") }, 500)
				return pkt
			})
			MiddleMan.Event.bind("dAmnChat_property", "topic", "superdAmn_gettopic", function(pkt){
				var SD = superdAmn
				var ns = pkt.param
				//var c  = pkt.args.c ? pkt.args.c : "main"
				if(!dAmnChats[ns].SD){ dAmnChats[ns].SD = {} }
				dAmnChats[ns].SD.topic_el_orig = SD.dAmn.deformatMsg(pkt.body) // The originally user-entered topic
				dAmnChats[ns].SD.topic_el_by   = pkt.args.by // By (who set it)
				dAmnChats[ns].SD.topic_el_ts   = pkt.args.ts // Timestamp (when topic was set)
				window.setTimeout(function(){ SD.dAmn.applyrecvextras(dAmnChats[ns].channels.main.topic_el); SD.dAmn.applytopicextras(dAmnChats[ns].channels.main.topic_el, ns, "topic") }, 500)
				return pkt
			})	
		},
		// ADDTABFIXES: Adds support for tab "fixing" with different highlighting colours
		addtabfixes: function(){
			if($x("//div[@class='damntcf-preload']").length <= 0){
				dAmnChatTabs_flashTab_SD = dAmnChatTabs_flashTab
				dAmnChatTabs_newData_SD  = dAmnChatTabs_newData
				dAmnChatTabs_flashTab    = function(tab){
					if(dAmnChatTab_active != tab.id && tab.tab_el.tagName == "A"){
						var SD  = superdAmn, c
						var old = (SD.P.fixtabs == 3), red = (SD.P.fixtabs == 2), off = (!SD.P.fixtabs)
						var hlc = old ? "sdt-ho" : "sdt-hl"
						switch(tab.data){
							case 1: // People are talking
								c = off ? "#333" : (old ? "maroon" : "#356271") // standard dAmn value here, #333, is indistinguisable from normal text color #2c3635 -- wtf?
								break
							case 2: // People are talking to you
								if(!off){
									if(!SD.hc(tab.tab_el, hlc)){ SD.ac(tab.tab_el, hlc) } // adding class
									if((tab.flash_count & 1) != red){
										SD.ac(tab.tab_el, "sdt-hb")
										c = old ? "#88938d" : "#fff"
									} else {
										SD.rc(tab.tab_el, "sdt-hb")
										c = old ? "#fff" : "#b64242"
									}
								} else { c = "#b64242" }
								break
						}
						if(tab.tab_el.style.color != c){
							tab.tab_el.style.color      = c
							tab.tab_el.style.fontWeight = "bold"
						}
						if(tab.tab_el.firstChild && (tab.data != 2 || off)){ // No hidin' when it's highlightin'
							tab.tab_el.firstChild.style.visibility = (tab.flash_count & 1) ? "hidden" : "visible"
							if(SD.P.tabscounts && tab.tab_el.childNodes[1] && tab.tab_el.childNodes[1].tagName.toUpperCase() != "I"){
								tab.tab_el.childNodes[1].style.visibility = (tab.flash_count & 1) ? "hidden" : "visible"
							}
						}
						if(tab.flash_count--){
							tab.timer = window.setTimeout(function(){ dAmnChatTabs_flashTab(tab) }, 500)
						}
					}
				}
				dAmnChatTabs_newData = function(id, level){
					if(dAmnChatTab_active != id){
						var tab = dAmnChatTabs[id], off = (!superdAmn.P.fixtabs)
						if(tab && (!tab.data || tab.data < level) && level >= 0){
							if("timer" in tab){ window.clearTimeout(tab.timer) }
							tab.data = level
							tab.flash_count = 6 // has to be even
							if(tab.data == 2 && !off){ tab.flash_count = 10 }
							dAmnChatTabs_flashTab(tab)
						}
						// Unread count
						if(superdAmn.P.tabscounts && level == 2 && !off){
							if(tab.tab_el.firstChild && dAmnChats[id].SD.unread){
								if(tab.tab_el.childNodes[1] && tab.tab_el.childNodes[1].tagName.toUpperCase() != "I"){
									var cel = tab.tab_el.childNodes[1]
								} else {
									var cel = document.createElement("span")
									cel.className = "unread"
									cel.appendChild(document.createTextNode(""))
									if(tab.tab_el.childNodes[1]){
										tab.tab_el.insertBefore(cel, tab.tab_el.childNodes[1])
									} else {
										tab.tab_el.appendChild(cel)
									}
								}
								cel.firstChild.data = dAmnChats[id].SD.unread > 100 ? "100+" : parseInt(dAmnChats[id].SD.unread)
							}
						}
					}
				}
			}
		},
		// ADDCMDFIXES: Applies small fixes and enhancements to current dAmn commands (not new ones) and tabbings
		addcmdfixes: function(){
			MiddleMan.Event.bind("dAmnChat", "key", "superdAmn_fixcmds", function(args){
				if(typeof args != "object" || !args.length){
					if(!window.SUPERDAMN_WARNED){
						superdAmn.error("superdAmn", "SuperdAmn not first MiddleMan userscript in userscript list. Please drag the userscript further up on your list in Tools > Greasemonkey > Manage User Scripts.")
						window.SUPERDAMN_WARNED = true
					}
					return args
				}
				var e  = args[0], kc = args[1], force = args[2]
				var ci = dAmnChats[dAmnChatTab_active].channels.main.input // Substituting "this"
				var el = ci.chatinput_el

				if(kc == 9 && !e.ctrlKey && !e.shiftKey && !ci.tablist){
					// Make tabbing work for #chatrooms and :dev...: & :icon...: codes
					var results  = []
					ci.tabstart  = el.value.lastIndexOf(" ") + 1
					ci.tabindex  = 0
					var tabstr   = el.value.substr(ci.tabstart)
					var pretab   = el.value.substr(0, ci.tabstart)
					var admining = false, privclassing = false, nosort = false
					
					// DEVS AND ICONS
					var modre   = /^(\:[(dev)|(icon)])[a-zA-Z0-9|-]+/
					var modif, modst
					if(modst = modre.exec(tabstr)){
						modif  = (modst[1] == ":d") ? ":dev" : ":icon"
						tabstr = tabstr.substring(modif.length).replace(/:$/, "")
					}
					
					// ADMINING w/ action+privclass autocomplete
					var admincmds = [
						"create privclass",
						"move users",
						"remove privclass",
						"rename privclass",
						"show privclass",
						"show users",
						"showverbose privclass",
						"showverbose users",
						"update privclass"
					]
					
					if(pretab.match(/^\/admin/)){
						admining = true
					}
					
					if(pretab.match(/^\/(admin ((update|rename|remove) privclass|move users)|(de|pro)mote\s+[a-zA-Z0-9-]+)\s*$/)){ // Only certain actions are legible for privclasses
						privclassing = true
					}

					if(pretab.match(/^\/admin [a-z]+\s*$/)){ // Admin actions should allow ONE space
						var arg      = pretab.split(" ")[1]
						tabstr       = arg + " " + tabstr
						ci.tabstart -= arg.length + 1 // Push the tabstart left
						pretab       = "/admin "
					}
					
					// Does we has something to tab at?
					if(tabstr.length){
						var prefix = tabstr.charAt(0)
						if(prefix == "#" && !modif && !admining){ // Search chatrooms
							var search = new RegExp("^" + tabstr.substr(1) + "\\S*", "i")
							for(var ns in dAmnChats){
								if(ns.substr(0,5) == "chat:" && ns.substr(5).match(search)){
									results = results.concat("#" + ns.substr(5))
								}
							}
						}
						if(prefix != "#" && prefix != "/" && modif && !admining){ // Search usernames when :dev/:icon'ing
							results = ci.cr.members.MatchMembers(new RegExp("^" + tabstr + "\\S*", "i"))
							for(var i in results){ results[i] = modif + results[i] + ":" }
						}
						
						if(admining && !privclassing && !modif){ // Search admin actions
							var search = new RegExp("^" + tabstr + "\\S*", "i")
							nosort     = true // It's best to put showverbose after the normal show's, so no sorting here
							for(var cmd in admincmds){
								if(admincmds[cmd].match(search)){
									results = results.concat(admincmds[cmd])
								}
							}
						}
						
						if(privclassing && !modif){ // Search privclasses when /admining or /privchging
							var pclist = dAmnChats[dAmnChatTab_active].members.pclist
							var to     = admining ? pretab.match(/\/admin (rename privclass|move users)/) : false
							var search = new RegExp("^" + tabstr + "\\S*", "i")
							for(var pc in pclist){
								if(pclist[pc].name.match(search)){
									results = results.concat(pclist[pc].name + (to ? " to " : (admining ? " " : "")))
								}
							}
						}
						
						// Tab results!
						if(results && results.length){
							if(!nosort){
								results.sort(function(a,b){ var x = String(a).toLowerCase(); var y = String(b).toLowerCase(); return x < y ? -1 : (x > y ? 1 : 0) })
							}
							results.splice(0, 0, results.pop()) // Fix some serious fuckup somewhere
							el.value = pretab + results[0] // Add first result to input
							if(results.length > 1){ // Then allow tabbing through results
								ci.tablist  = results
								ci.tabindex = 0
							}
						}
					}
				}
				
				// Below code is stolen from MiddleMan, which in turn took it directly from dAmn -- I compressed it slightly
				if(kc != 9){
					dAmnChatTabs_activate(ci.cr.ns, true); delete ci.tablist
					if(kc == 13 && (force || !ci.multiline || e.shiftKey || e.ctrlKey) && el.value){
						if(e.shiftKey || (!ci.multiline && e.ctrlKey)){ dummy = null }
						else {
							var cmdre = el.value.match(/^\/([a-z]+)([\s\S]*)/m); if(!cmdre){ dummy = null }
							else {
								var cmd = cmdre[1].toLowerCase(), args = null
								if(cmdre[2]){ var tmp = cmdre[2].match(/^\s([\s\S]*)/); if(tmp && tmp.length) args = tmp[1] }
								if(!ci.cmds[cmd]){ dummy = null } else if(typeof ci.cmds[cmd][0] == "number"){
									// SuperdAmn additions start here
									var continuing = true
									if(args && args.indexOf(" ") > -1){ // Commands where args are required
										var allargs = superdAmn.trim(args).split(" "), p
										switch(cmd){
											case "join": // Multi-join
												for(var arg in allargs){
													if(p = allargs[arg].match(/^\s*(\S*)\s*$/)){
														dAmn_Join("chat:" + p[1].match(/^#?(.*)/)[1])
													} else {
														superdAmn.error("syntax", "/join #chatroom")
													}
												}
												continuing = false
												break
											case "part": // Yes, I know that args are actually optional for part, but if it doesn't match here, it'll just go to standard dAmn part
												for(arg in allargs){
													if(p = allargs[arg].match(/^\s*(\S*)\s*$/)){
														dAmn_Part("chat:" + p[1].match(/^#?(.*)/)[1])
													} else {
														superdAmn.error("syntax", "/part #chatroom")
													}
												}
												continuing = false
												break
											case "whois": // Multi-whois
												for(var arg in allargs){
													if(p = allargs[arg].match(/^\s*(\S*)\s*$/)){
														dAmn_Get("login:" + p[1], "info")
													} else {
														superdAmn.error("syntax", "/whois username")
													}
												}
												continuing = false
												break
											case "ban": // Multi-ban/unban
											case "unban":
												for(arg in allargs){
													if(p = allargs[arg].match(/^\s*(\S*)\s*$/)){
														ci.cr.Send(ci.cmds[cmd][1], p[1], "")
													} else {
														superdAmn.error("syntax", "/" + cmd + " username")
													}
												}
												continuing = false
												break
										}
									}
									
									if(!args){ // Making args optional in some commands and in some cases
										switch(cmd){
											case "join":
												if(dAmnChats[dAmnChatTab_active].connected == false){
													dAmn_Join(dAmnChatTab_active)
													continuing = false
												}
												break
											case "setaway":
											case "setback":
											case "ignore":
											case "depart":
												MiddleMan.Commands.trigger(cmd, "")
												continuing = false
												break
										}
										if(cmd in superdAmn.oc(superdAmn.extend.optcmds)){
											MiddleMan.Commands.trigger(cmd, "")
											continuing = false
										}
									}
									
									if(!continuing){
										// This is needed to store the commands in memory
										if (ci.history_pos != -1  && ci.history[ci.history_pos] == el.value) { // posting from history.. move to the end
											var before = ci.history.slice(0,ci.history_pos)
											var after  = ci.history.slice(ci.history_pos+1)
											ci.history = before.concat(after).concat(ci.history[ci.history_pos])
										} else {
											// add to history -- limit to 300
											ci.history = ci.history.concat(el.value)
											if(ci.history.length > 300)
												ci.history = ci.history.slice(1)
										}
										ci.history_pos = -1
										el.value = ''
										el.focus()
									}
								}
							}
						}
					}
				}
			})
			
			// Fixing arrow-ups/downs in Firefox
			// I don't blame you if this next part of the code doesn't make any sense to you at all. It certainly doesn't to me.
			if(superdAmn.browser.firefox){
				arrowUpFix = function(){
					if(!window.arrowUpFixed && document.onkeypress){
						dAmnChat_onKey_SD  = dAmnChat_onKey
						document.onkeydown = dAmnChat_onKey_SD
						dAmnChat_onKey = function(e){
							if(e.keyCode == 9 && (e.ctrlKey || e.shiftKey)){
								if(parseInt(superdAmn.browser.version) >= 7){
									var x = function(){dAmnChatTabs_activateNext()} // <-- How does this work?
								} else {
									(function(){dAmnChatTabs_activateNext()}) // <-- How does this work, too?
								}
								
							}
						}
						document.onkeypress = dAmnChat_onKey
						window.arrowUpFixed = true
					}
				}
				window.arrowUpFixed = false
				arrowUpFix()
				window.setTimeout(arrowUpFix, 5000)
				window.setTimeout(arrowUpFix, 10000)
			}
		},
		// ADDRESIZEFIX: Modifies dAmn's onresize function to resize the body properly and adjust some SD elements accordingly
		addresizefix: function(){
			if(typeof chatroom_manager_onresize != "undefined"){
				chatroom_manager_onresize_SD = chatroom_manager_onresize
			}
			chatroom_manager_onresize = function(e){
				var h   = window.innerHeight || document.body.clientHeight
				var ofs = superdAmn.v7 ? 42 : 32
				var css = (h - ofs) + "px"
				document.getElementById("window").style.height    = css
				document.getElementById("window").style.minHeight = css
				if(superdAmn.sdpr()){ superdAmn.prefs.position() }
				if(superdAmn.sdep()){ superdAmn.emotes.picker.position() }
				if(superdAmn.away){
					for(var ns in dAmnChats){
						var ab = $x(".//span[@class='away']", dAmnChats[ns].channels.main.iconbar_el)
						if(ab.length > 0){
							ab[0].style.maxWidth = superdAmn.buttons.awaymaxwidth(ns) + "px"
						}
					}
				}
			}
			//if(window.AutoExec){
			//	AutoExec.push(function(){
					if(document.getElementById("window")){
						Events.hook(window, "resize", chatroom_manager_onresize)
						chatroom_manager_onresize()
					}
			//	})
			//}
		},
		// ADDAVATARFIX: Modifies the HTML returned by dAmn's printAvatar function (class, alt & height attributes)
		addavatarfix: function(){
			dAmn_printAvatar_SD = dAmn_printAvatar;
			dAmn_printAvatar = function(username, usericon){
				var msg = dAmn_printAvatar_SD(username, usericon)
				msg = msg.replace("<img", "<img class=\"avvie\"")
				msg = msg.replace("alt=\"\"","alt=\":icon" + username + ":\"")
				if(msg.indexOf("height") < 0 || msg.indexOf("height=\"\"") >= 0){
					msg = msg.replace("height=\"\"", "")
					msg = msg.replace("/>", "height=\"50\"/>")
				}
				return msg
			}
		},
		// ADDACTIVATEHANDLE: Modifies dAmn's activate tab function so it tells SD what tab we're currently in
		addactivatehandle: function(){
			dAmnChatTabs_activate_SD = dAmnChatTabs_activate;
			dAmnChatTabs_activate = function(id, real){
				if(typeof window.dAmnChatTab_active != "undefined" && dAmnChatTab_active != null){
					var otab = dAmnChatTab_active
					dAmnChatTabs_activate_SD(id, real)
					if(!dAmnChats[otab].connected && dAmnChatTabs[otab].tab_el.tagName == "A" && !superdAmn.hc(dAmnChatTabs[otab].tab_el, "disconnected")){
						superdAmn.ac(dAmnChatTabs[otab].tab_el, "disconnected")
					}
				} else {
					dAmnChatTabs_activate_SD(id, real)
				}
				if(dAmnChats[id].SD && dAmnChats[id].SD.unread){
					dAmnChats[id].SD.unread = 0
				}
				superdAmn.dAmn.updatetitle()
			}
		},
		// ADDMEMBERLISTHANDLE: Adds extras to the member list and member list mouseover info boxes
		addmemberlisthandle: function(){
			dAmnChatMember.prototype.updateInfo_SD = dAmnChatMember.prototype.updateInfo
			dAmnChatMember.prototype.updateInfo    = function(){
				this.updateInfo_SD()
				var SD = superdAmn, n = this.name
				var lcuser = this.name.toLowerCase()
				if(!SD.hc(this.el, "un-" + lcuser)){ SD.ac(this.el, "un-" + lcuser) }
				if(!SD.hc(this.el, "ffc")){ SD.ac(this.el, "ffc") }
				this.el.onclick = function(){ superdAmn.dAmn.inputAddUsername(n) }
				// Are they a SuperdAmn Ambassador?
				if(lcuser in SD.ocl(superdAmn.ambassadors)){
					var ul = $x(".//ul", this.info_el)[0]
					var ba = document.createElement("li")
					ba.className = "superdamner"
					ba.appendChild(document.createTextNode("SuperdAmn Ambassador"))
					ul.appendChild(ba)
				}
			}
			dAmnChatMembers.prototype.AddMember_SD = dAmnChatMembers.prototype.AddMember
			dAmnChatMembers.prototype.AddMember    = function(name, info, updatedisplay, count){
				this.AddMember_SD(name, info, updatedisplay, count)
				this.members[name].showinfo    = function(){
					// I'd append stuff to the original function but it made everything superlaggy, so I'm overwriting instead -- sorry!
					var ns      = dAmnChatTab_active
					var offset  = document.getElementById("dAmn-Chatbox").offsetTop + dAmnChats[ns].room_el.offsetTop + dAmnChats[ns].lo_cr_el.offsetTop
					var info_el = dAmnChats[ns].info_el
					dAmnChat_enterInfoCtr(info_el)
					var bar     = this.el.parentNode.parentNode
					var crow    = bar.parentNode
					dAmn_DeleteChildren(info_el)
					dAmn_DeleteSelf(info_el)
					dAmn_AddEl(info_el, this.info_el)
					var top              = (this.el.offsetTop - bar.scrollTop)
					info_el.style.top    = top + "px"
					info_el.style.right  = bar.offsetWidth + "px"
					info_el.style.bottom = "auto"
					info_el.onmouseover  = function(){ dAmnChat_enterInfoCtr(info_el) }
					info_el.onmouseout   = function(){ dAmnChat_leaveInfoCtr(info_el) }
					dAmn_AddEl(crow, info_el)
					if((top + info_el.offsetHeight + offset) > window.innerHeight){
						info_el.style.top = "auto"
						info_el.style.bottom = "20px"
					}
				}
			}
		},
		// ADDUSERINFOHANDLE: Adds enhancement handles to /whois blocks
		adduserinfohandle: function(){
			dAmnChanMainChat.prototype.onUserInfo_SD = dAmnChanMainChat.prototype.onUserInfo
			dAmnChanMainChat.prototype.onUserInfo    = function(user, body){
				this.onUserInfo_SD(user, body)
				var SD     = superdAmn
				var lcuser = user.toLowerCase()
				var i      = $x(".//div[contains(concat(' ',normalize-space(@class),' '),' userinfo-outer ')]", this.chat_el)
				var o      = i[i.length-1] // Must be the last one, we just received the results
				
				// Look for chatroom links
				if(lcuser != dAmn_Client_Username.toLowerCase()){
					var d
					Array.prototype.forEach.call($x(".//li[contains(concat(' ',normalize-space(@class),' '),' chatrooms ')]", o), function(li){
						d = false
						Array.prototype.forEach.call($x(".//a", li), function(a){
							if("chat:"+SD.trim(a.childNodes[0].data).replace(/^#/, "") in dAmnChats){
								a.style.fontWeight = "bold"
								d = true
							}
						})
						if(d){
							var sdh = document.createElement("div")
							sdh.className = "superdamnhint"
							sdh.appendChild(document.createTextNode("Bold chatroom names are rooms you have also joined."))
							li.appendChild(sdh)
						}
					})
				}
				
				// The user is an ambassador!
				if(lcuser in SD.ocl(superdAmn.ambassadors)){
					// Attempt to find the whois block
					var un = $x(".//strong", o)[0] // First strong is username
					var ul = $x(".//ul", o)[0] // First ul is userinfo
					if($x(".//a", un)[0].innerHTML.toLowerCase() == lcuser){ // Double-checking
						var ba = document.createElement("li")
						ba.className = "superdamner"
						ba.appendChild(document.createTextNode("SuperdAmn Ambassador"))
						ul.appendChild(ba)
					}
				}
			}
		},
		// ADDREMOVEHANDLE: Modifies dAmn's chat remove function so SD knows when we're removing a chat from our session
		addremovehandle: function(){
			dAmnChat_Remove_SD = dAmnChat_Remove
			dAmnChat_Remove    = function(ns){
				var SD = superdAmn
				if(dAmn_objCount(dAmnChats) > 1 && !(ns in SD.oc(SD.departing))){
					dAmnChat_Remove_SD(ns)
				}
				if(ns in SD.oc(SD.departing)){
					for(var i in SD.departing){
						if(SD.departing[i] == ns){
							SD.departing.splice(i, 1)
						}
					}
				}
			}
		},
		// ADDMSGEXTRAS: Adds the functionality for SD to apply message extras (emotes, FAQs) before sending them off
		addmsgextras: function(){
			MiddleMan.Event.bind("dAmnChat", "send", "superdAmn_addextras", function(args){ if(args.cmd.toLowerCase() != "npmsg"){ args.str = superdAmn.dAmn.applymsgextras(args.str) } return args })
			// No MiddleMan handles for the below :(
			dAmn_Kick_SD = dAmn_Kick
			dAmn_Set_SD  = dAmn_Set
			dAmn_Kick    = function(ns, user, reason)  { reason = superdAmn.dAmn.applymsgextras(reason); dAmn_Kick_SD(ns, user, reason)  }
			dAmn_Set     = function(ns, property, data){ data   = superdAmn.dAmn.applymsgextras(data);   dAmn_Set_SD(ns, property, data) }
			
		},
		// ADDCHATEXTRAS: Adds extra features in the private chat department
		addchatextras: function(){
			dAmnChat_onData_SD = dAmnChat_onData
			dAmnChat_onData = function(pkt){

				// make -shownotice work
				if(pkt.cmd == 'recv' && (pkt.body.indexOf('join') == 0 || pkt.body.indexOf('part') == 0)) {
					pkt.body = pkt.body.replace("s=0", "s=1");
				}else if(pkt.cmd == 'recv' && pkt.body.indexOf('kicked') == 0) {
					pkt.body = pkt.body.replace("i=0", "i=1");
				};

				x = this.onData_SD(pkt)
				if(this.nstype == "pchat" && pkt.param == this.ns){
					if(pkt.cmd == "property" && pkt.args.p == "members" && pkt.body){
						var p     = this.ns.split(":")
						var other = p[1] == dAmn_Client_Username ? p[2] : p[1]
						var data  = pkt.body
						if(!dAmnChats[this.ns].SD){ dAmnChats[this.ns].SD = {} }
						dAmnChats[this.ns].SD.other = other
						do {
							var userpkt = dAmn_ParsePacket(data)
							if(userpkt){
								if(userpkt.cmd != "member"){ return false }
								if(userpkt.param == other){
									return this.channels.main.makeText("join", "** " + other, " is in the private chat")
								}
								data = userpkt.body
							}
						} while(userpkt && data)
						this.channels.main.makeText("join", "** " + other, " has not yet joined this chat; messages will not go through")
					}
					if(pkt.cmd == "recv"){
						var recv = dAmn_ParsePacket(pkt.body)
						if((recv.cmd == "join" || recv.cmd == "part") && recv.param != dAmn_Client_Username){
							this.channels.main.onEvent(recv);
						}
					}
				}
				return x
			}
			dAmnChat.prototype.onData = dAmnChat_onData
			dAmnChat.prototype.onData_SD = dAmnChat_onData_SD
		},
		// ADDFORMATEXTRAS: Modifies dAmn's FormatMsg function to better support certain native emotes, thumbs, devlinks
		addformatextras: function(){
			dAmnChanChat.prototype.FormatMsg_SD = dAmnChanChat.prototype.FormatMsg;
			dAmnChanChat.prototype.FormatMsg = function(msg, cb){
				// Requires jQuery
                
                var $deferred = $.Deferred();
                
                $deferred.always(cb);
                
                if (!msg) {
                    //Nothing to do. Get Out!
                    return $deferred.resolveWith(this, ['']);
                }
                
				// Uppercase letter emotes fixin'
				msg = msg.replace(
					/&emote\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\tletters\/([A-Z])\.gif\t/g,
					function(){ return "&emote\t" + arguments[1] + "\t" + arguments[2] + "\t" + arguments[3] + "\t" + arguments[4] + "\tletters/" + arguments[5].toLowerCase() + ".gif\t" }
				)
                
                var re = /&thumb\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t/g; 
				// A = m, J = re, T = res
				var m, res
				while((m = re.exec(msg)) != null){
					var id      = m[1] // I
         			var title   = (m[2] == "you") ? superdAmn.strrev(m[2]) : m[2]
         			var tooltip = title + ", " + m[3] // S
                   	var wh      = m[3].split("x") // D
                    var url     = "http://www.deviantart.com/art/" + deviation_url_title(title) + "-" + id
                    var flags   = m[6].split(":") // C 
                    var file    = (m[3] == "you") ? superdAmn.strrev(m[6]) : m[6] // Q
                    
					if (flags[1] != '0') {
						res = '<a class="superdamn-devlink" target="_blank" href="' + url + '" title="' + tooltip + '"><strong>Mature Deviation:</strong> <em>' + title + "</em></a>"
                        msg = msg.substr(0, m.index) + res + msg.substr(re.lastIndex)
					} else if (flags[2] != '0') {
                        res = '<a class="superdamn-devlink" target="_blank" href="' + url + '" title="' + tooltip + '"><strong>Deviation:</strong> <em>' + title + "</em></a>"
                        msg = msg.substr(0, m.index) + res + msg.substr(re.lastIndex)
                    } else if(file.match(/\.gif$/i) && (wh[0] > 150 || wh[1] > 150)){
                        res = '<a class="superdamn-devlink" target="_blank" href="' + url + '" title="' + tooltip + '"><strong>Deviation:</strong> <em>' + title + "</em></a>"
                        msg = msg.substr(0, m.index) + res + msg.substr(re.lastIndex)
                    }
                }
                
				// Let's roll the standard formatting now!
				dAmnChanChat.prototype.FormatMsg_SD(msg, bind(this, function (msg) {
                    $deferred.resolveWith(this, [msg]);
                }));
				return $deferred;
			}
		},
		// APPLYMSGEXTRAS: Adds emotes and FAQs to the strings supplied
		applymsgextras: function(str){ // Runs at every send/property/kick
			var SD = superdAmn, ostr = JSON.parse(JSON.stringify(str))
			try {
				// FAQ
				if(FAQloaded){
					while((a = /(\:faq([0-9]+)\:)/.exec(str)) != null){ // Find all :faqXX: instances in str
						var item = null
						for(var i in FAQ){ if(FAQ[i].id && FAQ[i].id == a[2]){ item = FAQ[i]; break } } // Going through the FAQ
						pr = str.substr(0, a.index)
						su = str.substr(a.index + a[1].length)
						if(item){ // We found one! Let's apply it
							str = pr + "<strong>FAQ #" + item.id + ": </strong> <a href=\"http://help.deviantart.com/" + item.id + "/\">" + item.question + "</a>" + su
						} else { // We did not! Let's make sure the code doesn't turn into something weird
							str = pr + ":faq<b></b>" + a[2] + ":" + su
						}
					}
				}
				// Correcting special display-styles for system user accounts +help and +faq
				str = str.replace(/:devhelp:/g,"<a href=\"http://help.deviantart.com/contact\">Help Desk</a>")
				str = str.replace(/:devfaq:/g, "<a href=\"http://help.deviantart.com/\">FAQ</a>")
				// Custom emotes
				str = SD.emotes.add(str)
			} catch(e) {
				try { if(window.console && window.console.log){ console.log(e) } } catch(ee){ }
				return ostr // Return original string instead of doing stuff to it and exploding
			}
			return str
		},
		// APPLYRECVEXTRAS: Adds clickable chat links to received messages
		applyrecvextras: function(node){
			if(typeof node == "string"){ s = node; node = document.createElement("span"); node.innerHTML = s }
			try {
				var cl = $x(".//a[starts-with(@href,'http://chat.deviantart.com/chat/')]", node)
				if(cl.length > 0){ Array.prototype.forEach.call(cl, function(el){
					var r = el.href.substr(el.href.lastIndexOf("/")+1)
					if(r != ""){
						el.r = r
						el.addEventListener("click", function(evt){ evt.preventDefault(); dAmn_Join("chat:" + this.r) }, false)
						el.title = ((el.title != "") ? el.title + " | " : "") + "Join #" + r
					}
				}) }
				var cn   = $x(".//text()[contains(.,'#') and not(ancestor::a) and not(ancestor::code) and not(ancestor::pre)]", node)
				var cnre = /\B#([a-zA-Z][a-zA-Z0-9]+)\b/g
				if(cn.length > 0){ Array.prototype.forEach.call(cn, function(el){
					var v = el.nodeValue
					if(cnre.test(v)){
						var n = document.createElement("span")
						cnre.lastIndex = 0
						for(var match = null, lli = 0; (match = cnre.exec(v));){
							r = match[1]
							n.appendChild(document.createTextNode(v.substring(lli, match.index)))
							var a   = document.createElement("a")
							a.r     = r
							a.title = "Join #" + r
							a.style.cursor = "pointer"
							a.addEventListener("click", function(evt){ evt.preventDefault(); dAmn_Join("chat:" + this.r) }, false)
							a.appendChild(document.createTextNode(match[0]))
							n.appendChild(a)
							lli = cnre.lastIndex
						}
						n.appendChild(document.createTextNode(v.substr(lli)))
						el.parentNode.replaceChild(n,el)
					}
				}) }
			} catch(e) { this.e = e }
		},
		// ADDTABEXTRAS: Adds easier tab navigation by adding accesskeys 1-9
		addtabextras: function(){
			function goToTabNo(no){
				no = parseInt(no)
				if(no > 9 || no < 1){ return false }
				for(var t in dAmnChatTabs){ no--; if(no == 0){ window.setTimeout(function(){ dAmnChatTabs_activate(t, true); }, 1); break }}
			}
			for(var i = 1; i <= 9; i++){
				superdAmn.accesskeys.add(i, function(){ goToTabNo(this.accessKey) })
			}
		},
		// APPLYTOPICEXTRAS: Adds extra features (dynamic edit) to topic/titles
		applytopicextras: function(el, ns, t){
			dAmnChats[ns].SD[t + "_el_raw"] = el.innerHTML
			var tc = document.createElement("div")
			var eb = document.createElement("span")
			tc.className = t
			var x = el.childNodes.length
			for(var i = 0; i < x; i++){
				if(el.childNodes[0]){ // We constantly remove, so this constantly stays 0 on purpose
					var node = el.removeChild(el.childNodes[0])
					if(node){ tc.appendChild(node) }
				}
			}
			el.appendChild(tc)
			eb.className = "superdamn-editbutton"
			el.appendChild(eb)
			eb.addEventListener("click", function(evt){ // Visual topic/title-edit
				var SD = superdAmn
				var ns = dAmnChatTab_active
				var el, t = ""
				if(this.parentNode.className.indexOf("damncr-title")  > -1){ t = "title"; el = dAmnChats[ns].title_el }
				if(this.parentNode.className.indexOf("damncrc-topic") > -1){ t = "topic"; el = dAmnChats[ns].channels.main.topic_el }
				if(el){
					if(dAmnChats[ns].SD && dAmnChats[ns].SD[t + "_el_orig"]){
						// Creating edit box
						var a       = document.createElement("div")
						var m       = document.createElement("div")
						var b       = document.createElement("div")
						var i       = document.createElement("textarea")
						a.className = "superdamn-topicer"
						m.className = "meta"
						b.innerHTML = "You can only edit the " + t + " if you have the privs. <button>Submit</button> or <a class=\"cancel\" href=\"javascript://\">Cancel</a>"
						a.appendChild(m); a.appendChild(i)
						// Creating textarea
						var by = dAmnChats[ns].SD[t + "_el_by"]
						var ti = new Date()
						ti.setTime(dAmnChats[ns].SD[t + "_el_ts"] * 1000)
						i.appendChild(document.createTextNode(dAmnChats[ns].SD[t + "_el_orig"]))
						i.onmousedown = function(evt){ evt.stopPropagation() } // Keep focus
						i.onmouseup   = function(evt){ evt.stopPropagation() }
						// Displaying info and appending to element
						var info      = t + " info: Set by <a href=\"http://" + by.toLowerCase() + ".deviantart.com/\" target=\"_blank\">" + SD.he(by) + "</a> on <em>" + ti.toLocaleString() + "</em>"
						m.innerHTML   = "<span>" + info.replace(/(title|topic) info:/, "<strong>$1 info:</strong>") + "</span>&nbsp;"
						a.chatel      = dAmnChats[ns]
						m.appendChild(b)
						el.appendChild(a)
						i.focus()
						// Hiding the actual topic/title
						$x(".//div[contains(concat(' ',normalize-space(@class),' '),' " + t + " ')]", el)[0].style.display = "none"
						$x(".//span[contains(concat(' ',normalize-space(@class),' '),' superdamn-editbutton ')]", el)[0].style.display = "none"
						dAmn_InvalidateLayout()
						// Button events
						// -- Submit
						$x(".//button", b)[0].addEventListener("click", function(evt){
							evt.preventDefault()
							var eel = this.parentNode.parentNode.parentNode, t
							var tel = eel.parentNode
							if(tel.className.indexOf("damncr-title")  > -1){ t = "title" }
							if(tel.className.indexOf("damncrc-topic") > -1){ t = "topic" }
							if(t){
								// Let's submit the topic/title!
								superdAmn.ac($x(".//div", $x(".//div[@class='meta']", eel)[0])[0], "loading")
								dAmn_Set(eel.chatel.ns, t, dAmnEscape($x(".//textarea", eel)[0].value))
							}
						}, false)
						// -- Cancel
						$x(".//a[@class='cancel']", b)[0].addEventListener("click", function(evt){
							evt.preventDefault()
							var tel = this.parentNode.parentNode.parentNode.parentNode, t
							if(tel.className.indexOf("damncr-title")  > -1){ t = "title" }
							if(tel.className.indexOf("damncrc-topic") > -1){ t = "topic" }
							if(t){
								$x(".//div[contains(concat(' ',normalize-space(@class),' '),' " + t + " ')]", tel)[0].setAttribute("style", "")
								$x(".//span[contains(concat(' ',normalize-space(@class),' '),' superdamn-editbutton ')]", tel)[0].setAttribute("style", "")
								tel.removeChild($x(".//div[contains(concat(' ',normalize-space(@class),' '),' superdamn-topicer ')]", tel)[0])
								dAmn_InvalidateLayout()
							}
						}, false)
					} else {
						SD.error("get" + t, "Could not retrieve the " + t + " source. You can <a href=\"javascript://\" onclick=\"superdAmn.dAmn.reloadTopicTitle(dAmnChatTab_active);return false\">click here</a> to try to reload topic and title, then try again.")
					}
				} else {
					SD.error("superdAmn", "Did not know which topic/title to edit! Wtf!")
				}
			}, false)
		},
		// UPDATETITLE: Updates the page title whenever called to a compact one with current room name included
		updatetitle: function(){
			function _updatetitle(){
				var unread = (!superdAmn.viewing && superdAmn.unread.count > 0) ? "(" + (superdAmn.unread.count > 100 ? "100+" : parseInt(superdAmn.unread.count)) + ") " : ""
				document.title = unread + "dAmn" + (dAmnChatTab_active ? " - " + dAmn_formatNS(dAmnChatTab_active) : "")
			}
			_updatetitle()
			if(superdAmn.unread.count > 0 && !superdAmn.unread.process){
				function _titlecycle(){
					var SD = superdAmn
					if(!SD.viewing && SD.unread.count > 0 && SD.unread.lastuser){
						if(document.title.match(/dAmn/)){
							document.title = SD.unread.lastuser + " says..."
							setTimeout(function(){ _titlecycle() }, 1500)
						} else {
							_updatetitle()
							setTimeout(function(){ _titlecycle() }, 3000)
						}
					} else {
						SD.unread.process  = 0
						SD.unread.lastuser = ""
					}
				}
				superdAmn.unread.process = setTimeout(_titlecycle, 2000)
			}
		},
	
	// dAmn utility functions ---------------------------
		// DEFORMATMSG: Turns back formatted messages to the format in which they were entered by the user
		deformatMsg: function(m){
			m = MiddleMan.parseMsg(m)
			
			// Fix for usernames without symbols
			m = m.replace(/&dev\t([^\t])?\t([^\t]+)\t/g, ":dev$2:")
			// Epilogue, removing empty parameters
			m = m.replace(/<a href="([^"]+)" title="">/g, "<a href=\"$1\">")
			m = m.replace(/<img src="([^"]+)" alt="([^"]+)" title="" \/>/g, "<img src=\"$1\" alt=\"$2\" />")
			m = m.replace(/<img src="([^"]+)" alt="" title="" \/>/g, "<img src=\"$1\" />")
			m = m.replace(/<(iframe|embed) src="([^"]+)" width="" height="" \/>/g, "<$1 src=\"$2\" />")
			return m
		},
		// APPENDINPUTTEXT: Adds supplied string at the end of the input field in the room supplied by ns
		appendInputText: function(ns, str){
			dAmnChats[ns].channels.main.input.chatinput_el.value += " " + str + " "
		},
		// QUERYDEVTITLE: Formats a deviation title for use as search query on dA
		queryDevTitle: function(str){
			return superdAmn.trim(str.replace(/[^A-Za-z0-9]+/g, " "))
		},
		// RELOADTOPICTITLE: Reloads the topic and title of the room supplied by ns
		reloadTopicTitle: function(ns){
			if(!dAmnChat_onData_MM){
				MiddleMan.updateMethods()
				dAmnChats[ns].onData = dAmnChat.prototype.onData
			}
			dAmn_Get(dAmnChatTab_active, "title")
			dAmn_Get(dAmnChatTab_active, "topic")
		},
		// CANSCROLL: Figures out if we're "allowed" to scroll back to the bottom in the scroll element belonging to the room supplied by ns
		canScroll: function(ns){
			var c = dAmnChats[ns].channels.main
			var scroll = false
			var sb = c.scroll_el.scrollTop + c.scroll_el.clientHeight
			var sh = c.scroll_el.scrollHeight
			if((sh - sb) < 10){
				scroll = true
			}
			return scroll
		},
		// CANSCROLLS: Figures out if we're "allowed" to scroll down in any of the open chatrooms
		canScrolls: function(){
			var scrolls = {}
			for(var r in dAmnChats){
				scrolls[r] = superdAmn.dAmn.canScroll(r)
			}
			return scrolls
		},
		// DOSCROLLS: Scrolls down in any of the chatrooms we are "allowed" to scroll down in
		doScrolls: function(scrolls){
			if(!superdAmn.oe(scrolls)){
				window.setTimeout(function(){
					for(var r in scrolls){
						if(scrolls[r] === true){
							var s = dAmnChats[r].channels.main.scroll_el
							s.scrollTop = s.scrollHeight
						}
					}
				}, 50)
			}
		},
		// TOGGLEINPUT: Toggles the input field in the room given by ns, without breaking autoscroll
		toggleInput: function(ns){
			var c = dAmnChats[ns].channels.main, scroll = false, s = {}
			if(!c.input.multiline){ scroll = superdAmn.dAmn.canScroll(ns) }			
			c.input.toggleInput()
			if(scroll){ s[dAmnChatTab_active] = scroll; this.doScrolls(s) } 
			if(superdAmn.P.showsend){ $x(".//input[@type='button']", c.lo_rb_el)[0].style.display = "inline" }
		},
		// INPUTADDUSERNAME: Prepends a username to your current message
		inputAddUsername: function(name){
			var SD  = superdAmn
			var e   = dAmnChats[dAmnChatTab_active].channels.main.input.chatinput_el
			var spl = function(str){ return (SD.ltrim(str) == str && SD.ltrim(str) != "") ? " " : "" }
			var spr = function(str){ return (SD.rtrim(str) == str && SD.rtrim(str) != "") ? " " : "" }
			if(SD.buttons.alt){ // Insert directly in text if alt button down
				// Below code based on code from deviantPlus
				var tmpScroll    = e.scrollTop
				var t            = e.value, s = e.selectionStart
				var sl           = spr(t.substring(0,s))
				var se           = spl(t.substring(s))
				e.value          = t.substring(0,s) + sl + name + se + t.substring(s)
				e.selectionStart = e.selectionEnd = s + sl.length + name.length
				e.scrollTop      = tmpScroll
			} else {
				if(e.value.match(/:/)){
					var seg = SD.explode(e.value, ":", 1)
					var u   = seg[0]
					if(u.match(/^[a-zA-Z0-9-]{3,20}$/)){ // One username already there
						if(u.toLowerCase() != name.toLowerCase()){ e.value = u + ", " + name + ":" + seg[1] }
					} else {
						// Check if pre-: value is a sequence of usernames
						var w = u.split(" "), r = true
						for(i = 0; i < w.length; i++){
							if(w[i].match(/^[a-zA-Z0-9-]{1,20},?$/) && (w[i].charAt(w[i].length-1) == "," || i == w.length-1)){
								if(i == w.length-1 && w[i].charAt(w[i].length-1) == ","){
									w[i] = w[i].substr(0, w[i].length-1) // Remove the comma from the last name
								}
								if(w[i].toLowerCase() == name.toLowerCase() || w[i].substr(0, w[i].length-1).toLowerCase() == name.toLowerCase()){
									e.focus()
									return false // You've already added this username
								}
							} else {
								r = false; break
							}
						}
						if(r){
							e.value = u + ", " + name + ":" + seg[1]
						} else {
							e.value = name + ": " + e.value
						}
					}
				} else {
					e.value = name + ": " + e.value
				}
			}
			e.focus()
		},
	},
	
	// CUSTOM EMOTES ------------------------------------
	emotes: {
		host: "http://www.thezikes.org",
		ems:  "",
		// INIT: Initializes the "structured" emote objects and fetches emotes
		init: function(){
			var SD = superdAmn
			this.ems = JSON.stringify(SD.ems)
			if(SD.P.customemotes){
				SD.spe = JSON.parse(this.ems)
				SD.sie = JSON.parse(this.ems)
				this.fetch()
				this.sie()
			}
		},
		// FETCH: Fetches emotes from the public database if we have that turned on
		fetch: function(){
			// Requires jQuery
			var SD = superdAmn
			if(SD.P.publicemotes){
				jQuery.getJSON(this.host + "/publicemotes.php?format=jsonp&jsoncallback=?&" + (new Date()).getDay(), function(data){
					superdAmn.pe = data
					superdAmn.emotes.spe()
					superdAmn.emotes.picker.generate()
				})
			} else {
				this.picker.generate()
			}
		},
		// SPE: Creates the "structured" object for public emotes
		spe: function(){
			var SD = superdAmn
			if(SD.P.publicemotes && SD.pe && !SD.oe(SD.pe)){
				if(JSON.stringify(SD.spe) != this.ems){ SD.spe = JSON.parse(this.ems) }
				var a = [], c
				for(var em in superdAmn.pe){ a.push(em) }
				a.sort(function(a,b){ var x = String(a).toLowerCase(); var y = String(b).toLowerCase(); return x < y ? -1 : (x > y ? 1 : 0) })
				for(var em in a){
					c = a[em].substr(1,1).toLowerCase()
					if(!c.match(/^[a-z]$/)){ c = "#" }
					SD.spe[c][a[em]] = SD.pe[a[em]]
					if(SD.pe[a[em]].myvote > 0){
						SD.spe['*'][a[em]] = SD.pe[a[em]]
					}
				}
			}
		},
		// SIE: Creates the "structured" object for personal (individual) emotes
		sie: function(){
			var SD = superdAmn
			if(SD.P.emotes && !SD.oe(SD.P.emotes)){
				if("" in SD.P.emotes){ delete SD.P.emotes[""]; SD.prefs.save() } // Saving your soul for free!
				if(JSON.stringify(SD.sie) != this.ems){ SD.sie = JSON.parse(this.ems) }
				var a = [], c, et
				for(var em in SD.P.emotes){ a.push(em) }
				a.sort(function(a,b){ var x = String(a).toLowerCase(); var y = String(b).toLowerCase(); return x < y ? -1 : (x > y ? 1 : 0) })
				for(var em in a){
					et = SD.trim(a[em]).replace(/^:|:$/g,"")
					c  = et.substr(0,1).toLowerCase()
					if(!c.match(/^[a-z]$/)){ c = "#" }
					SD.sie[c][a[em]] = SD.P.emotes[a[em]]
				}
			}
		},
		// ADD: Adds emotes to the supplied string!
		add: function(str){
			var SD = superdAmn, r, em
			if(SD.P.customemotes){
				for(var em in SD.P.emotes){
					if(typeof em == "string"){
						str = str.replace(new RegExp((em.charAt(0).match(/[^\w]/) ? "\\B" : "\\b") + RegExp.escape(em) + (em.charAt(em.length-1).match(/[^\w]/) ? "\\B" : "\\b"), "g"),
											SD.numeric(SD.P.emotes[em]) ?  SD.P.emotes[em] : SD.P.emotes[em]) // Emote (numeric devid in thumb) or a code
					}
				}
				if(SD.P.publicemotes && typeof SD.pe == "object" && (r = str.match(/:[^ ]+?:/g))){ // Don't replace public emotes if there are not :emotetype:-matches
					// New style reverse!
					for(var i in r){
						em = r[i]
						if(em in SD.pe){
							str = str.replace(new RegExp(RegExp.escape(em), "g"), ":thumb" + SD.pe[em].devid + ":")
						}
					}
					/* // Old style search->replace
					for(var em in SD.pe){
						if(typeof em == "string" && em.charAt(0) == ":" && em.charAt(em.length-1) == ":"){
							str = str.replace(new RegExp(RegExp.escape(em), "g"), ":thumb" + SD.pe[em].devid + ":")
						}
					}*/
				}
			}
			// Exceptions
			str = str.replace(/\B:B\b/g, ":bucktooth:") // dA short-emote not working in dAmn
			str = str.replace(/\B:mytime:\B/g, SD.format.timestamp()) // Quick trick to tell people your time: "It is currently :mytime: over here."
			return str
		},
		// CUSTOM EMOTES PICKER -------------------------
		picker: {
			letter:				"a",
			epilogue:			"For emotes to be available publicly, they need to have 5 votes up. If you&#8217;re looking for an emote that hasn&#8217;t reached this criteria, try searching for it.",
			searchepilogue:		"For emotes to be available publicly, they need to have 5 votes up. You can vote them up from here.",
			nopublicepilogue:	"Only your own emote list will be displayed here, as you&#8217;ve turned off public emotes. If you want to turn public emotes on, go to the SuperdAmn Preferences panel.",
			// GENERATE: Generates our emote picker according to what we have turned on in our preferences
			generate: function(){
				var SD = superdAmn, html
				// Creating element if it doesn't exist
				if(SD.sdep()){
					var p  = SD.sdep()
				} else {
					var p  = document.createElement("div")
					p.id   = "superdamnemotes"
					p.style.display = "none"
					// Fixing resize
					dAmn_CalculateLayout_SD = dAmn_CalculateLayout
					dAmn_CalculateLayout = function(){
						dAmn_CalculateLayout_SD()
						if(superdAmn.sdep()){ superdAmn.emotes.picker.position() }
					}
				}
				if(!SD.sdev()){
					var pv = document.createElement("div")
					pv.id  = "superdamnempreview"
					pv.style.display = "none"
					document.getElementsByTagName("body")[0].appendChild(pv)
				}
				// Generating HTML
				html   = "<a class=\"close\" href=\"javascript://\"></a><h3>Custom emotes</h3><span class=\"toplinks\"><a href=\"javascript://\" id=\"sde-addem\">Add emote</a> / <a href=\"javascript://\" id=\"sde-search\">Search</a></span>"
				html  +=	  "<form id=\"sde-addemf\" action=\"" + SD.emotes.host + "/addemote.php\" method=\"post\" style=\"display:none\"><div>You can add a brand new emote/code combination to the public database or your personal emotes using the form below.</div>"
							+ "<p class=\"input\" style=\"border-bottom-width:0;margin-bottom:0\"><label class=\"l\" for=\"sdea-code\">Emote code:</label><input type=\"text\" id=\"sdea-code\" />"
							+ (superdAmn_GM ? "<br />If adding to the public database, it is required that the code is enclosed in colons like <strong>:this:</strong>." : "") + "</p>"
							+ "<p class=\"input\" style=\"margin-top:0\"><label class=\"l\"><select id=\"sdea-devidtype\"><option id=\"sdea-dtdevid\" selected=\"selected\">Deviation ID:</option><option>Code:</option></select> </label><input type=\"text\" id=\"sdea-devid\" /></p>"
							+ "<p><input type=\"submit\" style=\"font-weight:bold\" value=\"Add\" /> <select id=\"sdea-type\"" + SD.prefs.disabled(!SD.P.publicemotes || !superdAmn_GM) + "><option id=\"sdea-tpersonal\"" + SD.prefs.selected(!SD.P.publicemotes || !superdAmn_GM) + ">to my own emotes list</option><option>to the public emote database</option></select></p>"
							+ (superdAmn_GM ? "<div>When adding to the database, it is suggested that you search for the code first to see if your suggestion already exists.</div>" : "<div>It&#8217;s not possible to submit directly to the database using a non-Firefox browser. Please go to the Emotecloud site to <strong><a href=\"http://thezikes.org/emotecloud/add.php\">vote on and submit public emotes</a></strong></div>") + "</form>"
				html  += "<div id=\"sde-browser\"><form id=\"sde-searchf\" action=\"" + SD.emotes.host + "/search.php\" method=\"get\" style=\"display:none\"><div>This will search for emote/code combinations already in our emote database. If you see emotes that are not in our database, click &#8220;Add&#8221; above.</div><input type=\"text\" value=\"Enter an emote code...\" /></form>"
				html  += "<ul class=\"letters\"><li>A</li><li>B</li><li>C</li><li>D</li><li>E</li><li>F</li><li>G</li><li>H</li><li>I</li><li>J</li><li>K</li><li>L</li><li>M</li><li>N</li><li>O</li><li>P</li><li>Q</li><li>R</li><li>S</li><li>T</li><li>U</li><li>V</li><li>W</li><li>X</li><li>Y</li><li>Z</li><li title=\"Emotes that do not start with a letter\">#</li>" + (SD.P.publicemotes ? "<li title=\"Emotes that you voted up\" style=\"margin-right:0\">&#x2605;</li>" : "") + "</ul>"
				html  += "<ul class=\"browse\"><li>Loading...</li></ul><div class=\"bottom\">" + (SD.P.publicemotes ? "<span><a href=\"javascript://\" id=\"sde-whynot\">Why isn&#8217;t <em>emote X</em> on the list?</a></span>" + (!superdAmn_GM ? "<br /><span><strong><a href=\"http://thezikes.org/emotecloud/\" id=\"sde-chrome\">Vote on and submit public emotes</a></strong></span>" : "") : "") + "<a href=\"javascript://\" id=\"sde-reload\">Reload</a></div></div>"
				p.innerHTML = html
				// Elements onclick
				/* Close button */	$x(".//a[@class='close']", p)[0].addEventListener("click", function(evt){ evt.preventDefault(); superdAmn.emotes.picker.hide() }, false)
				/* Letters */		Array.prototype.forEach.call($x(".//li[(ancestor::ul[@class='letters'])]", p),    function(el){ el.addEventListener("click", function(){ var p = superdAmn.emotes.picker; p.letter = p.getletter(this); p.generatepage() }, true) })
				if(!SD.sdep()){ document.getElementsByTagName("body")[0].appendChild(p) } // Adding element to page first
				/* Search button */	if(el = document.getElementById("sde-search")){ el.addEventListener("click",      function(evt){ evt.preventDefault(); var f = document.getElementById("sde-searchf"); if(f.style.display == "none"){ f.style.display = "block"; this.childNodes[0].data = "Cancel search"; $x(".//input[@type='text']", f)[0].focus() } else { f.style.display = "none"; if($x(".//li[contains(concat(' ',normalize-space(@class),' '),' search ')]", p).length > 0){ superdAmn.emotes.picker.generatepage() } this.childNodes[0].data = "Search" } }, false) }
				/* Search form */	if(el = document.getElementById("sde-searchf")){ el.addEventListener("submit",    function(evt){ evt.preventDefault(); superdAmn.emotes.picker.search($x(".//input", this)[0].value) }, false) }
				/* Search input */	var input = $x(".//input[(ancestor::form[@id='sde-searchf'])]", p)[0]; input.addEventListener("focus", function(){ if(this.value == "Enter an emote code...") this.value = "" }, false); input.addEventListener("blur", function(){ if(this.value == "") this.value = "Enter an emote code..." }, false)
				/* Add button */	if(el = document.getElementById("sde-addem")){ el.addEventListener("click",       function(evt){ evt.preventDefault(); var f = document.getElementById("sde-addemf"); var b = document.getElementById("sde-browser"), sa = document.getElementById("sde-search"), sf = document.getElementById("sde-searchf"); if(f.style.display == "none"){ b.style.display = "none"; f.style.display = "block"; this.childNodes[0].data = "Cancel add emote"; this.nextSibling.data = " "; sa.style.display = "none" } 
																					else { b.style.display = "block"; f.style.display = "none"; this.childNodes[0].data = "Add emote"; this.nextSibling.data = " / "; sa.style.display = "inline" } }, false) }
				/* Add devid */		if(el = document.getElementById("sdea-devid")){ el.addEventListener("change",     function(evt){ this.value = (document.getElementById("sdea-dtdevid").selected) ? superdAmn.emotes.picker.formatdevid(this.value) : superdAmn.trim(this.value) }, false) }
				/* Add devidtype */	if(el = document.getElementById("sdea-devidtype")){ el.addEventListener("change", function(evt){ var t = document.getElementById("sdea-type"),      d = document.getElementById("sdea-devid"); if(!document.getElementById("sdea-dtdevid").selected)  { t.childNodes[0].selected = true; t.disabled = true } else { t.disabled = !superdAmn_GM ? true : false; d.value = superdAmn.emotes.picker.formatdevid(d.value) } }, false) }
				/* Add type */		if(el = document.getElementById("sdea-type")){ el.addEventListener("change",      function(evt){ var t = document.getElementById("sdea-devidtype"), d = document.getElementById("sdea-devid"); if(!document.getElementById("sdea-tpersonal").selected){ t.childNodes[0].selected = true; t.disabled = true; superdAmn.ac(t, "disabled"); d.value = superdAmn.emotes.picker.formatdevid(d.value) } else { t.disabled = false; superdAmn.rc(t, "disabled") } }, false) }
				/* Add form */		if(el = document.getElementById("sde-addemf")){ el.addEventListener("submit",     function(evt){ evt.preventDefault(); superdAmn.emotes.picker.addem() }, false) }
				/* Why oh why */	if(el = document.getElementById("sde-whynot")){ el.addEventListener("click",      function(evt){ evt.preventDefault(); var bl = $x(".//ul[@class='browse']", superdAmn.sdep())[0]; bl.scrollTop = bl.scrollHeight }, false) }
				/* Reload button */	if(el = document.getElementById("sde-reload")){ el.addEventListener("click",      function(evt){ evt.preventDefault(); if(!superdAmn.hc(this, "loading")){ superdAmn.emotes.init(); superdAmn.ac(this, "loading") } }, false) }
				this.generatepage()
			},
			// GENERATEPAGE: Generates whatever current page of custom emotes we have open
			generatepage: function(){ // Reads current letter from this.letter
				var SD = superdAmn, html = ""
				var p  = SD.sdep()
				var bl = $x(".//ul[@class='browse']", p)[0]
				// Preparing and cleaning up
				Array.prototype.forEach.call($x(".//li[(ancestor::ul[@class='letters'])]", p), function(el){
					var SD = superdAmn
					if(SD.emotes.picker.getletter(el) == SD.emotes.picker.letter && !SD.hc(el, "selected")){
						SD.ac(el, "selected")
					} else {
						SD.rc(el, "selected")
					}
				})
				// Hide search
				if($x(".//li[contains(concat(' ',normalize-space(@class),' '),' search ')]", p).length > 0){
					document.getElementById("sde-searchf").style.display     = "none"
					document.getElementById("sde-search").childNodes[0].data = "Search"
				}
				// Pushing emotes into view
				if(!SD.oe(SD.sie[this.letter])){
					html += "<li class=\"h\">Your emote list</li>"
					for(var em in SD.sie[this.letter]){
						html += this.emoteli(em, SD.sie[this.letter][em], "local")
					}
				}
				if(!SD.oe(SD.spe[this.letter]) && SD.P.publicemotes){
					html += "<li class=\"h\">Public emote" + (this.letter == "*" ? "s that you voted up" : " list") + "</li>"
					for(var em in SD.spe[this.letter]){
						html += this.emoteli(em, SD.spe[this.letter][em].devid, SD.spe[this.letter][em].img, SD.spe[this.letter][em].votes, SD.spe[this.letter][em].myvote)
					}
				}
				// Insert message at the bottom ("epilogue")
				if(this.letter == "*" && SD.ol(SD.spe[this.letter]) <= 0){
					html += "<li class=\"hint\">You haven&#8217;t voted any public emotes up on this machine. Use the vote buttons on emotes in this panel to do this.</li>"
				} else {
					if(SD.P.publicemotes){
						html += "<li class=\"hint\">" + this.epilogue + "</li>"
					} else {
						html += "<li class=\"hint\">" + this.nopublicepilogue + "</li>"
					}
				}
				// Show pre-assembled HTML
				bl.innerHTML = html
				// Generate our interactive-ness
				this.generatebuttons(bl)
			},
			// GENERATEBUTTONS: Generates the interactive parts of the open custom emote page
			generatebuttons: function(bl, localonly){
				var SD = superdAmn
				// "Add to field" buttons
				tfs = $x(".//a[@class='tofield']", bl)
				if(tfs.length > 0){
					Array.prototype.forEach.call(tfs, function(el){
						el.emcode = $x(".//span[@class='code']", el.parentNode)[0].childNodes[0].data
						el.addEventListener("click", function(evt){ evt.preventDefault(); superdAmn.dAmn.appendInputText(dAmnChatTab_active, this.emcode) }, false)
					})
				}
				if(!localonly){
					// Vote buttons
					if(superdAmn_GM){
						vbs = $x(".//a[@class='voteu' or @class='voted']", bl)
						if(vbs.length > 0){
							Array.prototype.forEach.call(vbs, function(el){
								var li = el.parentNode.parentNode.parentNode
								el.emcode = $x(".//span[@class='code']", li)[0].childNodes[0].data
								el.devid  = $x(".//a[@class='viewdev']", li)[0].href.replace(/[^0-9]+/g, "")
								el.addEventListener("click", function(evt){
									evt.preventDefault()
									var v, rid, li = el.parentNode.parentNode.parentNode
									superdAmn.ac(li, "loading")
									if(this.className.indexOf("voteu") > -1){ v = "voteup" }
									if(this.className.indexOf("voted") > -1){ v = "votedown" }
									rid = v + "-" + this.devid + "-" + parseInt(superdAmn.time())
									if(v){
										superdAmn.postrequests[rid]  = {
											url:  superdAmn.emotes.host + "/" + v + ".php?format=json",
											data: "code=" + encodeURIComponent(this.emcode) + "&devid=" + encodeURIComponent(this.devid)
										}
										superdAmn.postcallbacks[rid] = superdAmn.emotes.picker.votecallback
									}
								}, false)
							})
						}
					}
					// Mouse-over previews
					ecs = $x(".//span[@class='code']", bl)
					if(ecs.length > 0){
						Array.prototype.forEach.call(ecs, function(el){
							el.parentNode.addEventListener("mousemove", function(evt){
								var iel = $x(".//span[@class='img']", this)[0]
								var v   = SD.sdev()
								if(v && iel && typeof iel.innerHTML == "string"){
									v.style.top     = (evt.clientY + 15) + "px"
									v.style.left    = evt.clientX + "px"
									if(v.childNodes.length <= 0 || (v.childNodes.length > 0 && v.childNodes[0].innerHTML != iel.innerHTML && v.childNodes[0].tagName)){
										if(iel.innerHTML != ""){
											var server  = (Math.abs(crc32(iel.innerHTML)) % 3) + 1
											v.innerHTML = "<span style=\"display:none\">" + iel.innerHTML + "</span><img src=\"http://fc0" + server + ".deviantart.com/" + iel.innerHTML + "\" />"
										} else {
											v.innerHTML = "<span style=\"display:none\">" + iel.innerHTML + "</span>Image unavailable"
										}
										v.style.display = "block"
									}
								}
							}, false)
							el.parentNode.addEventListener("mouseout",  function(evt){ var v = SD.sdev(); if(v && v.style.display == "block"){ v.style.display = "none"; v.innerHTML = "" } }, false)
						})
					}	
				}
				// Remove buttons
				rbs = $x(".//a[@class='remove']", bl)
				if(rbs.length > 0){
					Array.prototype.forEach.call(rbs, function(el){
						var li = el.parentNode
						el.emcode = $x(".//span[@class='code']", li)[0].childNodes[0].data
						el.addEventListener("click", function(evt){
							evt.preventDefault()
							if(confirm("Are you sure you want to remove this emote?")){
								var li = el.parentNode
								delete superdAmn.P.emotes[this.emcode]
								superdAmn.prefs.save()
								superdAmn.emotes.sie()
								li.parentNode.removeChild(li)
							}
						}, false)
					})
				}
			},
			// SHOW: Shows the emote picker, and positions it properly
			show: function(){
				var SD = superdAmn
				if(SD.P.customemotes && dAmnChatTab_active){
					var p = SD.sdep()
					var lb = dAmnChats[dAmnChatTab_active].lo_cl_el
					this.position()
					if(!SD.P.pickerright){
						p.style.left = lb.offsetWidth + 15 + "px"
						if(p.style.right && p.style.right != "auto"){
							p.style.right = "auto"
						}
					}
					p.style.display = "block"
					SD.extend.trigger("emotepickeropen")
				} else {
					SD.error("emotes", "You do not have custom emote functionality turned on. Please open the <a href=\"javascript://\" onclick=\"superdAmn.prefs.show(); return false\">SuperdAmn Preference panel</a> to turn it back on.")
				}
			},
			// HIDE: Hides the emote picker
			hide: function(){
				superdAmn.extend.trigger("emotepickerclose")
				superdAmn.sdep().style.display = "none"
				dAmnChats[dAmnChatTab_active].channels.main.input.chatinput_el.focus()
			},
			// TOGGLE: Toggles (shows/hides) the emote picker
			toggle: function(){
				if(superdAmn.sdep().style.display == "none"){ this.show() } else { this.hide() }
			},
			// POSITION: Positions the emote picker vertically (and horizontally, if on the right)
			position: function(){
				if(dAmnChatTab_active){
					var p  = superdAmn.sdep()
					var ba = dAmnChats[dAmnChatTab_active].channels.main.lo_rb_el
					if(ba){ p.style.bottom = ba.offsetHeight + "px" }
					if(superdAmn.P.pickerright){ // More intense with varying right bar, thus put here in the always-called function, contrary to the left bar one
						var cr = dAmnChats[dAmnChatTab_active].lo_cr_el
						p.style.right = cr.offsetWidth + 15 + "px"
						if(p.style.left && p.style.left != "auto"){
							p.style.left = "auto"
						}
					}
				}
			},
			// SEARCH: Searches for public and private emotes and displays the search result as a page in the picker
			search: function(query){
				var SD = superdAmn
				var p  = SD.sdep(), localresults = []
				var input = $x(".//input[(ancestor::form[@id='sde-searchf'])]", p)[0]
				if(SD.trim(query) == "" || SD.trim(query) == ":"){ return false }
				if(!SD.hc(input, "loading")){ SD.ac(input, "loading") }
				for(var em in SD.P.emotes){ if(em.indexOf(query) > -1){ localresults.push(em) } }
				if(SD.P.publicemotes && p){
					jQuery.getJSON(superdAmn.emotes.host + "/search.php?format=jsonp&jsoncallback=?&code=" + encodeURIComponent(query) + "&" + (new Date()).getDay(), function(data){
						var p  = superdAmn.sdep(), html = ""
						var bl = $x(".//ul[@class='browse']", p)[0]
						Array.prototype.forEach.call($x(".//li[(ancestor::ul[@class='letters'])]", p), function(el){ superdAmn.rc(el, "selected") })
						if(localresults.length > 0){
							html += "<li class=\"h search\">Your list search results</li>"
							for(var em in localresults){
								var emote = superdAmn.P.emotes[localresults[em]]
								html += superdAmn.emotes.picker.emoteli(localresults[em], emote, "local")
							}
						}
						html += "<li class=\"h search\">Public search results</li>"
						if(data != null && !SD.oe(data)){
							for(var em in data){
								html += superdAmn.emotes.picker.emoteli(data[em].code, data[em].devid, data[em].img, data[em].votes, data[em].myvote)
							}
							html += "<li class=\"hint\">" + superdAmn.emotes.picker.searchepilogue + "</li>"
						} else {
							html += "<li class=\"hint\">No results! Sorry!</li>"
						}
						bl.innerHTML = html
						superdAmn.emotes.picker.generatebuttons(bl)
						superdAmn.rc($x(".//input[(ancestor::form[@id='sde-searchf'])]", p)[0], "loading")
					})
				} else {
					var html = ""
					var bl = $x(".//ul[@class='browse']", p)[0]
					Array.prototype.forEach.call($x(".//li[(ancestor::ul[@class='letters'])]", p), function(el){ superdAmn.rc(el, "selected") })
					if(localresults.length > 0){
						html += "<li class=\"h search\">Your list search results</li>"
						for(var em in localresults){
							var emote = superdAmn.P.emotes[localresults[em]]
							html += superdAmn.emotes.picker.emoteli(localresults[em], emote, "local")
						}
						html += "<li class=\"hint\">" + this.nopublicepilogue + "</li>"
					} else {
						html += "<li class=\"hint\">No local results! Sorry! If you want to see emotes from the public list, you need to turn it on in the <a href=\"javascript://\" onclick=\"superdAmn.prefs.show(); return false\">SuperdAmn Preference panel</a>.</li>"
					}
					bl.innerHTML = html
					superdAmn.emotes.picker.generatebuttons(bl, true)
					superdAmn.rc(input, "loading")
				}
			},
			// ADDEM: Adds the emote combination specified in the add form to public or private list
			addem: function(){
				var SD = superdAmn, clearit = false
				var p  = SD.sdep()
				var f  = document.getElementById("sde-addemf"), b = document.getElementById("sde-browser")
				var fb = document.getElementById("sde-addem"), sb = document.getElementById("sde-search")
				
				// Getting input
				var personal = document.getElementById("sdea-tpersonal").selected
				var endcode  = personal && !document.getElementById("sdea-dtdevid").selected
				var cel      = document.getElementById("sdea-code"), del = document.getElementById("sdea-devid"), dtel = document.getElementById("sdea-devidtype")
				var code     = personal ? SD.trim(cel.value) : this.formatpcode(cel.value)
				var devid    = endcode ? SD.trim(del.value)  : this.formatdevid(del.value)
				
				cel.value = code; del.value = devid
				
				if(code == "" || devid == ""){
					alert("One or more values were left empty. Please ensure that you have filled in all fields.")
					return false
				}
				
				if(personal){
					if(!SD.P.emotes[code] || confirm("There is already an emote with the code '" + code + "' in your personal emotes list. Do you want to overwrite that emote with this?")){
						SD.P.emotes[code] = devid
						SD.prefs.save()
						SD.emotes.sie()
						this.generatepage()
						clearit = true
					}
				} else {
					if(superdAmn_GM){
						var bel    = document.getElementById("sdea-type").parentNode
						var button = bel.childNodes[0]
						var rid    = "addemote-" + devid + "-" + parseInt(superdAmn.time())
						SD.ac(bel, "loading")
						button.disabled = true
						button.value    = "Adding..."
						superdAmn.postrequests[rid]  = {
							url:  SD.emotes.host + "/addemote.php?format=json",
							data: "code=" + encodeURIComponent(code) + "&devid=" + encodeURIComponent(devid)
						}
						superdAmn.postcallbacks[rid] = superdAmn.emotes.picker.addemcallback
					} else {
						alert("Sorry, please submit public emotes through the Emotecloud website at http://thezikes.org/emotecloud/add.php")
					}
				}
				if(clearit){
					// Reset
					cel.value = ""; del.value = ""
					f.style.display = "none"
					b.style.display = "block"
					fb.childNodes[0].data = "Add emote"
					fb.nextSibling.data   = " / "
					sb.setAttribute("style", "")
				}
			},
			// VOTECALLBACK: Callback function for when you have voted (UI changes, displaying the change etc.)
			votecallback: function(id, url, data, response){
				var SD    = superdAmn
				var seg   = id.split("-")
				var v     = seg[0].toLowerCase()
				var devid = seg[1]
				var d     = SD.format.qsToObject(data)
				var code  = d.code
				try {
					var r = JSON.parse(response.responseText)
				} catch(e) { SD.error("emotes", "Had a problem processing the data received from server, and it is thus uncertain whether your vote has gone through."); SD.emotes.picker.generate(); return false }
				// Validating the combination
				if(r.type.toLowerCase() == "success" && (v == "voteup" || v == "votedown") && SD.pe[code] && SD.pe[code].devid 
						&& (SD.pe[code].devid == devid || SD.pe[code].devid == parseInt(devid))){
					SD.pe[code].votes  = (v == "voteup") ? parseInt(SD.pe[code].votes)  + 1 : parseInt(SD.pe[code].votes)  - 1
					SD.pe[code].myvote = (v == "voteup") ? parseInt(SD.pe[code].myvote) + 1 : parseInt(SD.pe[code].myvote) - 1
					if(SD.pe[code].votes < 5){ delete SD.pe[code] }
					SD.emotes.spe()
					// Update the HTML
					Array.prototype.forEach.call($x("//li[contains(concat(' ',normalize-space(@class),' '),' devid-" + devid + " ')]"), function(el){
						var cel = $x(".//span[@class='code']", el)[0]
						if(cel.childNodes[0].data == code){
							var vel = $x(".//span[@class='votes']", el)[0]
							var nv  = (v == "voteup") ? parseInt(vel.childNodes[1].data) + 1 : parseInt(vel.childNodes[1].data) - 1
							SD.rc(el, "loading")
							vel.childNodes[0].innerHTML = ((v == "voteup") ? "+" : "&minus;") + "1 "
							vel.childNodes[1].data      = nv
							vel.style.color = "#c00"; vel.style.fontWeight = "bold"
							if(nv < 5){ SD.ac(el, "disabled") }
							window.setTimeout(function(){ vel.setAttribute("style", "") }, 4000)
						}
					})
				} else {
					Array.prototype.forEach.call($x("//li[contains(concat(' ',normalize-space(@class),' '),' devid-" + devid + " ')][contains(concat(' ',normalize-space(@class),' '),' loading ')]"), function(el){ // Longest XPATH ever
						var cel = $x(".//span[@class='code']", el)[0]
						if(cel.childNodes[0].data == code){
							SD.rc(el, "loading")
						}
					})
					if(r.type.toLowerCase() == "error"){
						SD.error("emotes", r.message ? r.message : "An undisclosed error occured during voting. Your vote might not have gone through.")
					}
				}
			},
			// ADDEMCALLBACK: Callback function for when you have added an emote (success, error)
			addemcallback: function(id, url, data, response){
				var f     = document.getElementById("sde-addemf"),  b  = document.getElementById("sde-browser")
				var sf    = document.getElementById("sde-searchf"), sb = document.getElementById("sde-search")
				var SD    = superdAmn
				var seg   = id.split("-")
				var v     = seg[0].toLowerCase()
				var devid = seg[1]
				var d     = SD.format.qsToObject(data)
				var code  = d.code
				try {
					var r = JSON.parse(response.responseText)
				} catch(e) { SD.error("emotes", "Had a problem processing the data received from server. Please try searching for your emote in the database to see if it has been added."); SD.emotes.picker.generate(); return false }
				// Clean up
				var bels = $x(".//p[contains(concat(' ',normalize-space(@class),' '),' loading ')]", sf)
				if(bels.length > 0){
					var bel    = bels[0]
					var button = bel.childNodes[0]
					var pel    = document.getElementById("sdea-tpersonal")
					var cel    = document.getElementById("sdea-code"), del = document.getElementById("sdea-devid")
					SD.rc(bel, "loading")
					button.disabled = false
					button.value    = "Add"
					if(r.type.toLowerCase() != "error"){
						cel.value       = "";   del.value = ""
						pel.selected    = true; pel.nextSibling.selected = false
					}
				}
				// Check it out
				if(r.type.toLowerCase() == "success"){
					// Search for it when it's added
					SD.emotes.picker.generate()
					SD.cnotice("emotes", r.message ? r.message : "The emote was added!")
					SD.commands.emotesearch(code)
				} else {
					if(r.type.toLowerCase() == "error"){
						SD.error("emotes", r.message ? r.message : "An undisclosed error occured during adding. Your emote has probably not been added to the database.")
					}
				}
			},
			// FORMATPCODE: Formats an emote code for the requirements of the public emote database
			formatpcode: function(str){
				return str.length > 0 ? (":" + str + ":").replace(/^:+|:+$/g, ":") : str
			},
			// FORMATDEVID: Gets the devID numbers from supplied deviation URL, thumbcode or text
			formatdevid: function(str){
				var r = ""
				str   = superdAmn.trim(str)
				if(str.substr(0,7) == "http://"){
					var seg = str.substr(7).split("?")[0].replace(/\/$/, "").split("/")
					if(str.substr(0,26) == "http://www.deviantart.com/" || str.substr(0,22) == "http://deviantart.com/"){
						r = seg[seg.length-1].replace(/[^0-9]+/g, "")
					} else if(str.substr(0,15) == "http://fav.me/d" || str.substr(0,19) == "http://www.fav.me/d"){
						r = parseInt(seg[1].substr(1).match(/^[a-z0-9]+/)[0], 36)
					} else {
						var subseg = seg[seg.length-1].split("-")
						r = subseg[subseg.length-1].replace(/[^0-9]+/g, "")
					}
				} else {
					r = str.replace(/[^0-9]+/g, "")
				}
				return r
			},
			// EMOTELI: Generates the HTML code required to display an emote in a page on the picker
			emoteli: function(code, devid, img, votes, myvote){
				var SD = superdAmn
				var cn = (img != "local" ? "devid-" + devid : "") + ((votes && parseInt(votes) < 5) ? " disabled" : "")
				return	"<li" + (cn ? " class=\"" + cn + "\"" : "")
						+ (img == "local" && typeof devid == "string" && !SD.numeric(devid) ? " title=\"" + SD.he(SD.trim(devid).length > 140 ? SD.trim(devid).substr(0,140) + "..." : devid) + "\"" : "") + ">"
						+ "<span class=\"code\">" + SD.he(code) + "</span>"
						+ (img != "local" ? "<span class=\"img\">" + (img ? SD.he(img) : "") + "</span>" : "")
						+ (votes ? "<span class=\"votes\" title=\"Votes\">" + ((!myvote || myvote == 0) 
						? (superdAmn_GM ? "<span class=\"voteb\"><a class=\"voteu\" title=\"Vote up\" href=\"javascript://\">+</a> <a class=\"voted\" title=\"Vote down\" href=\"javascript://\">&minus;</a> </span>" : "")
						: ((typeof myvote == "number" || (typeof myvote == "string" && myvote.match(/^[0-9]+$/))) ? "<span class=\"voteb\" title=\"My vote\">" + (myvote > 0 ? "+" : "") + myvote.toString().replace("-", "&minus;")
						+ " </span>" : "<span class=\"voteb\"></span>")) + votes + "</span> " : "")
						+ ((img == "local" && !votes) ? "<a href=\"javascript://\" class=\"remove\" title=\"Remove this emote from your personal list\"></a>" : "")
						+ "<a target=\"_blank\" href=\"http://www.deviantart.com/deviation/" + SD.he(devid) + "/\" class=\"viewdev\" title=\"View deviation\"></a>"
						+ "<a href=\"javascript://\" class=\"tofield\" title=\"Add this emote to input field\"></a></li>"
			},
			// GETLETTER: Gets the letter from supplied letter list element
			getletter: function(el){
				var l = el.innerHTML.toLowerCase().charAt(0)
				if(l.match(/^[a-z#]$/)){ return l } else { return "*" } // The star!
			}
		}
	},
	
	// IGNORES SYSTEM -----------------------------------
	ignores: {
		// INIT: Gets the system a-runnin'
		init: function(){
			this.style()
		},
		// STYLE: Adds or updates the CSS styles required for the ignore system to work
		style: function(){
			var SD = superdAmn, styles = "", hidestyles = "", liststyles = ""
			var ignoremsg  = "display: none !important;"
			var ignoreuser = "opacity: .5; -moz-opacity: .5; -webkit-opacity: .5;"
			if(SD.P.useignore){
				for(var user in SD.P.ignores){
					if(SD.P.retroignore){
						if(hidestyles != ""){ hidestyles += ", " }
						hidestyles += ".damncr .msg.u-" + user
					} else {
						Array.prototype.forEach.call($x("//dd[contains(concat(' ',normalize-space(@class),' '),' un-" + user + " ')]"), function(el){
							if(!superdAmn.hc(el, "uignored")){ superdAmn.ac(el, "uignored") }
						})
					}
					if(liststyles != ""){ liststyles += ", " }
					liststyles += ".damncr-members .un-" + user
				}
				if(!SD.P.retroignore){ hidestyles  = ".damncr .msg.ignored" }
				if(hidestyles != "") { hidestyles += " { " + ignoremsg  + " }" }
				if(liststyles != "") { liststyles += " { " + ignoreuser + " }" }
				styles = hidestyles + " " + liststyles
			} else {
				styles = (!SD.P.retroignore) ? ".damncr .msg.ignored { " + ignoremsg + " }" : ""
			}
			if(SD.sdis()){
				SD.sdis().childNodes[0].data = styles
			} else {
				var is = document.createElement("style")
				is.id  = "superdamnignores"
				is.appendChild(document.createTextNode(styles))
				document.getElementsByTagName("head")[0].appendChild(is)
			}
		},
		// ADD: Adds the supplied user to the ignore list (that poor thing)
		add: function(user){
			var SD = superdAmn, lcuser = user.toLowerCase()
			if(lcuser in SD.P.ignores){ return false }
			var scrolls = SD.P.retroignore ? SD.dAmn.canScrolls() : {}
			SD.P.ignores[lcuser] = SD.time()
			SD.prefs.save()
			this.style()
			if(!SD.P.retroignore){
				Array.prototype.forEach.call($x("//dd[contains(concat(' ',normalize-space(@class),' '),' un-" + lcuser + " ')]"), function(el){
					if(!superdAmn.hc(el, "uignored")){ superdAmn.ac(el, "uignored") }
				})
			}
			SD.dAmn.doScrolls(scrolls)
			return true
		},
		// REMOVE: Removes the supplied user from the ignore list (yay!)
		remove: function(user){
			var SD = superdAmn, lcuser = user.toLowerCase()
			if(!(lcuser in SD.P.ignores)){ return false }
			var scrolls = SD.P.retroignore ? SD.dAmn.canScrolls() : {}
			delete SD.P.ignores[lcuser]
			SD.prefs.save()
			this.style()
			if(!SD.P.retroignore){
				Array.prototype.forEach.call($x("//dd[contains(concat(' ',normalize-space(@class),' '),' un-" + lcuser + " ')]"), function(el){
					superdAmn.rc(el, "uignored")
				})
			}
			SD.dAmn.doScrolls(scrolls)
			return true
		}
	},
	
	// INPUT FIELD BUTTONS ------------------------------
	buttons: {
		buttons: {},
		alt: false,
		// INIT: Adds the chat init and alt key hooks for the button system
		init: function(){
			// On chat init
			MiddleMan.Event.bind("dAmnChat", "init", "superdAmn_chatinit", this.chatinit)
			// On alt press
			document.getElementsByTagName("body")[0].addEventListener("keydown", function(evt){ if(evt.keyCode == 18){ superdAmn.buttons.alter(true)  } }, false)
			document.getElementsByTagName("body")[0].addEventListener("keyup",   function(evt){ if(evt.keyCode == 18){ superdAmn.buttons.alter(false) } }, false)
		},
		// CHATINIT: Adds the formatting buttons to the bottom toolbar of the currently initializing chatroom
		chatinit: function(cr, name, parent_el){
			var ib = cr.channels.main.iconbar_el, ns = cr.ns, SD = superdAmn, SDB = superdAmn.buttons
			var ic = $x(".//div[contains(concat(' ',normalize-space(@class),' '),' damncrc-iconbar-ctrls ')]", ib)[0]
			// Creating or referencing our button bar
			if(!cr.channels.main.buttonbar_el){
				var bb = document.createElement("div")
				bb.className = "superdamn-buttonbar"
				ib.appendChild(bb)
				cr.channels.main.buttonbar_el = bb
			} else {
				var bb = cr.channels.main.buttonbar_el
			}
			if(SD.P.pickerright){ // Picker on our right side
				if(!cr.channels.main.buttonbar2_el){
					var bbr = document.createElement("div")
					bbr.className = "superdamn-buttonbar2"
					ic.insertBefore(bbr, $x(".//input", ic)[0])
					cr.channels.main.buttonbar2_el = bbr
				} else {
					var bbr = cr.channels.main.buttonbar2_el
				}
			}
			SDB.clearbar(ns)
			if(SD.P.showsend){ // Always show send button
				$x(".//input", ic)[0].style.display = "inline"
			}
			// Inserting our defined buttons -- this part could probably be optimized with some sort of loop
			SDB.buttons[ns] = []
			if(SD.P.customemotes){
				SDB.buttons[ns].push(new SDB.button("Emotes",			"emotes",		"e", SD.buttons.click.emotes))
			}
			SDB.buttons[ns].push(new SDB.button("Multi-line input",		"multiline",	"m", SD.buttons.click.multiline))
			if(SD.P.formattingbuttons){
				SDB.buttons[ns].push(new SDB.button("Bold",				"bold",			"b", SD.buttons.click.bold))
				SDB.buttons[ns].push(new SDB.button("Italic",			"italic",		"i", SD.buttons.click.italic))
				SDB.buttons[ns].push(new SDB.button("Underline",		"underline",	"u", SD.buttons.click.underline))
				SDB.buttons[ns].push(new SDB.button("Insert link",		"link",			"l", SD.buttons.click.link))
				SDB.buttons[ns].push(new SDB.button("Insert thumb",		"thumb",		"t", SD.buttons.click.thumb))
				SDB.buttons[ns].push(new SDB.button("Superscript",		"superscript",	"z", SD.buttons.click.superscript))
				SDB.buttons[ns].push(new SDB.button("Subscript",		"subscript",	"x", SD.buttons.click.subscript))
				SDB.buttons[ns].push(new SDB.button("Code",				"code",			"c", SD.buttons.click.code))
				SDB.buttons[ns].push(new SDB.button("Insert website",	"website",		"v", SD.buttons.click.website))
			}
			// Reserved Firefox input accesskeys: A (start), D (del), E (end), F (forward), H (backspace), K (del everything in front), N (end), P (start), W (backspace word)
			// Reserved deviantART accesskeys: S (search)
			for(var b in SDB.buttons[ns]){
				if(SDB.buttons[ns][b].klass == "emotes" && SD.P.pickerright && bbr){
					bbr.appendChild(SDB.buttons[ns][b].el)
				} else {
					bb.appendChild(SDB.buttons[ns][b].el)
				}
			}
			// Hiding old multiline input button
			$x(".//div[contains(concat(' ',normalize-space(@class),' '),' damncrc-icon-multi ')]", ib)[0].style.display = "none"
			
			// Adding awayspace
			var as = document.createElement("span")
			as.className = "superdamn-awayspace"
			if(SD.away){
				var ab = document.createElement("span")
				var d  = new Date()
				d.setTime(SD.away.t * 1000); d.noseconds = true
				ab.className      = "away"
				ab.innerHTML      = "<strong>Currently away:</strong> " + (SD.away.r ? (SD.away.r.length > 70 ? SD.he(SD.away.r.substr(0,70)) + "&#8230;" : SD.he(SD.away.r)) : "<em>No reason</em>") + " <span class=\"t\">(since <strong>" + SD.format.timestamp(d) + "</strong>)</span>"
				ab.title          = SD.away.r.length > 70 ? SD.away.r : ""
				ab.style.maxWidth = SDB.awaymaxwidth(ns) + "px"
				as.appendChild(ab)
			}
			ic.insertBefore(as, ic.childNodes[0])
			cr.channels.main.awayspace_el = as
		},
		// BUTTON: Button class, defining and storing key values for later reference
		button: function(name, klass, key, click){
			this.el           = document.createElement("div")
			this.name         = name
			this.klass        = klass
			this.key          = key.charAt(0)
			this.click        = click
			this.el.className = "superdamnbutton" + (this.klass ? " " + this.klass : "")
			this.el.title     = this.name + " - " + this.key.toUpperCase()
			this.el.akey      = this.key
			this.el.appendChild(document.createTextNode(this.name))
			this.el.addEventListener("click", this.click, false)
			this.el.setAttribute("bname", this.name)
			// Accesskey link
			if(this.key && $x("//*[@accesskey='" + this.key + "']").length <= 0){ // No duplicate accesskey links
				var ak    = superdAmn.accesskeys.add(this.key, superdAmn.buttons.click[this.klass])
				ak.button = this
			}
		},
		// SURROUNDTEXT: Adds text around selected text (from deviantPlus)
		surroundtext: function(tf, left, right){
			// Thanks, Zikes
			var tmpScroll     = tf.scrollTop
			var t             = tf.value, s = tf.selectionStart, e = tf.selectionEnd
			var selectedText  = tf.value.substring(s,e)
			tf.value          = t.substring(0,s) + left + selectedText + right + t.substring(e)
			tf.selectionStart = s + left.length
			tf.selectionEnd   = s + left.length + selectedText.length
			tf.scrollTop      = tmpScroll
			tf.focus()
		},
		// INSERTTEXT: Inserts text before selected text (from deviantPlus)
		inserttext: function(tf, txt){
			var tmpScroll     = tf.scrollTop
			var t             = tf.value, s = tf.selectionStart, e = tf.selectionEnd
			var selectedText  = tf.value.substring(s,e)
			tf.value          = t.substring(0,s) + txt + selectedText + t.substring(e)
			tf.selectionStart = s
			tf.selectionEnd   = s + txt.length
			tf.scrollTop      = tmpScroll
			tf.focus()
		},
		// ALTER: Alters some formatting button functionality when alt is held down or let go
		alter: function(alt){
			var ak = "", b = "contains(concat(' ',normalize-space(@class),' '),' superdamnbutton ')"
			var altclass   = function(el, alt){
				if(alt){ if(!superdAmn.hc(el, "alt")){ superdAmn.ac(el, "alt") } }
				else { superdAmn.rc(el, "alt") }
			}
			this.alt = alt
			Array.prototype.forEach.call($x("//div[" + b + "][@bname='Code']"), function(el){
				ak = el.akey ? el.akey.charAt(0).toUpperCase() : ""
				el.title = el.childNodes[0].data = alt ? "Bcode" : "Code" + (ak ? " - " + ak.toUpperCase() : "")
				altclass(el, alt)
			})
			Array.prototype.forEach.call($x("//div[" + b + "][@bname='Insert thumb']"), function(el){
				ak = el.akey ? el.akey.charAt(0).toUpperCase() : ""
				el.title = el.childNodes[0].data = alt ? "Insert external image" : "Insert thumb" + (ak ? " - " + ak.toUpperCase() : "")
				altclass(el, alt)
			})
		},
		// CLEARBAR: Clears the button bar in the chat supplied by ns
		clearbar: function(ns){
			var c  = dAmnChats[ns].channels.main
			var b  = $x(".//input[@type='button']", c.lo_rb_el)[0]
			if(c.buttonbar_el) { c.buttonbar_el.innerHTML  = "" }
			if(c.buttonbar2_el){ c.buttonbar2_el.innerHTML = "" }
			if(c.awayspace_el) { c.awayspace_el.innerHTML  = "" }
			if(!c.input.multiline && b.style.display != "none"){ b.style.display = "none" }
			// Clear accesskeys
			var ak = ["e", "m", "b", "i", "u", "l", "t", "z", "x", "c", "v"]
			for(var k in ak){
				superdAmn.accesskeys.remove(ak[k])
			}
		},
		// CLICK: Holds functions for onclick events on the buttons
		click: {
			emotes:			function(){ superdAmn.commands.emotes() },
			multiline:		function(){ superdAmn.dAmn.toggleInput(dAmnChatTab_active) },
			bold:			function(){ superdAmn.buttons.surroundtext(dAmnChats[dAmnChatTab_active].channels.main.input.chatinput_el, "<b>", "</b>") },
			italic:			function(){ superdAmn.buttons.surroundtext(dAmnChats[dAmnChatTab_active].channels.main.input.chatinput_el, "<i>", "</i>") },
			underline:		function(){ superdAmn.buttons.surroundtext(dAmnChats[dAmnChatTab_active].channels.main.input.chatinput_el, "<u>", "</u>") },
			link:			function(){ var url, t; if(url = prompt("Please enter the link URL", "http://")){ superdAmn.buttons.inserttext(dAmnChats[dAmnChatTab_active].channels.main.input.chatinput_el, (t = prompt("Please enter link text")) ? ((t == "[link]") ? url : "<a href=\"" + url + "\">" + t + "</a>") : url) } },
			thumb:			function(evt){ if(!evt.altKey){ var id; if(id = prompt("Please enter a deviation ID")){ superdAmn.buttons.inserttext(dAmnChats[dAmnChatTab_active].channels.main.input.chatinput_el, superdAmn.emotes.picker.formatdevid(id)) } } else { var url; if(url = prompt("Please enter an image URL", "http://")){ superdAmn.buttons.inserttext(dAmnChats[dAmnChatTab_active].channels.main.input.chatinput_el, "<img src=\"" + url + "\" />") } } },
			superscript:	function(){ superdAmn.buttons.surroundtext(dAmnChats[dAmnChatTab_active].channels.main.input.chatinput_el, "<sup>", "</sup>") },
			subscript:		function(){ superdAmn.buttons.surroundtext(dAmnChats[dAmnChatTab_active].channels.main.input.chatinput_el, "<sub>", "</sub>") },
			code:			function(evt){ var tag = evt.altKey ? "bcode":"code";superdAmn.buttons.surroundtext(dAmnChats[dAmnChatTab_active].channels.main.input.chatinput_el, "<" + tag + ">", "</" + tag + ">") },
			website:		function(){ var url; if(url = prompt("Please enter a website URL", "http://")){ superdAmn.buttons.inserttext(dAmnChats[dAmnChatTab_active].channels.main.input.chatinput_el, "<iframe src=\"" + url + "\" />") } }
		},
		// AWAYMAXWIDTH: Calculate max width of the away box
		awaymaxwidth: function(ns){
			var ib = dAmnChats[ns].channels.main.iconbar_el,
				bb = dAmnChats[ns].channels.main.buttonbar_el,
				as = dAmnChats[ns].channels.main.awayspace_el,
				aw = (as.childNodes.length > 0) ? as.childNodes[0].offsetWidth : 0
			return ib.offsetWidth - (ib.offsetLeft + bb.offsetLeft + bb.offsetWidth + ib.childNodes[0].offsetWidth - aw + 36)
		}
	},
	
	// PREFERENCE MANAGEMENT ----------------------------
	prefs: {
		// INIT: Loads and updates preferences, adds preference interface
		init: function(){
			var SD = superdAmn
			SD.dAmn.u()
			SD.Ps = JSON.parse(JSON.stringify(SD.P)) // Standard preferences
			
			this.load()
			this.update()
			
			// Add prefs button
			var addPrefsButton = function(){
				var h  = $x("//div[contains(concat(' ',normalize-space(@class),' '),' damnc-header ')]")
				var id = "sdprefsbtn"
				if(h && h[0] && !document.getElementById(id)){
					var sdsb    = document.createElement("img")
					sdsb.id     = id
					sdsb.src    = superdAmn.imgs[1]
					sdsb.width  = 16
					sdsb.height = 16
					sdsb.alt    = "(SuperdAmn Preferences)"
					sdsb.title  = "SuperdAmn Preferences"
					sdsb.addEventListener("click", function(evt){ evt.preventDefault(); superdAmn.prefs.show() }, false)
					sdsb.style.cursor = "pointer"
					h[0].insertBefore(sdsb, h[0].childNodes[1])
				}
			}
			
			// Try twice
			addPrefsButton()
			window.setTimeout(addPrefsButton, 5000)

			// Create div for message
			sdov       = document.createElement("div")
			sdov.id    = "superdamnov"
			sdov.style.display = "none"
			document.getElementsByTagName("body")[0].appendChild(sdov)
		},
		// LOAD: Loads stored preferences, or saves the default if none found
		load: function(){
			var SD = superdAmn
			if(window.superdAmn_GM){
				if(window.superdAmnLoadedPrefs){
					try {
						SD.P = JSON.parse(JSON.stringify(superdAmnLoadedPrefs))
					} catch(e){
						window.setTimeout(function(){ var noes = "Oh noes! Could not read your preferences! We're now back to standard preferences and no personal emotes."; if(window.dAmnChats){ superdAmn.error("superdAmn", noes) } else { alert(noes) } }, 1000)
					}
				} else {
					this.save() // Saving default prefs
					return SD.P
				}
			} else if(window.localStorage){
				if(window.localStorage.superdAmn_preferences){
					try {
						SD.P = JSON.parse(window.localStorage.superdAmn_preferences)
					} catch(e){
						window.setTimeout(function(){ var noes = "Oh noes! Could not read your preferences! We're now back to standard preferences and no personal emotes."; if(window.dAmnChats){ superdAmn.error("superdAmn", noes) } else { alert(noes) } }, 1000)
					}
				} else {
					this.save() // Saving default prefs
					return SD.P
				}
			} else {
				throw new TypeError("SuperdAmn save data is not saved anywhere understandable. :(")
			}
		},
		// SAVE: Passes the preferences to superdAmnlocal to be sent to GM_setValue
		save: function(){
			var SD = superdAmn
			if(window.superdAmn_GM){
				SD.postrequests["save-" + SD.time()] = { url: "save", data: SD.P }
			} else {
				window.localStorage.superdAmn_preferences = JSON.stringify(SD.P)
			}
		},
		// HIDE: Hides the preference panel
		hide: function(){
			superdAmn.extend.trigger("prefsclose")
			el = superdAmn.sdov()
			el.style.display = "none"
			el.innerHTML = ""
		},
		// SHOW: Shows the preference panel and generates the HTML inside it
		show: function(){
			var SD = superdAmn
			SD.dAmn.u()
			// Load prefs and store them in the temporary var
			SD.Pt = JSON.parse(JSON.stringify(SD.P)) // clone
			this.html()
			SD.extend.trigger("prefsopen")
		},
		// HTML: Generates the HTML inside the preference panel from your current preferences
		html: function(){
			var SD  = superdAmn
			var tcf = ($x("//div[@class='damntcf-preload']").length > 0)
			var tff = [
				/* STANDARD */  "<a style=\"font-weight:bold;color:#b64242\">#highlight<i></i></a><a style=\"font-weight:bold;color:#333\">#talk<i></i></a>",
				/* RED */       "<a class=\"sdt-hl\"><span>#highlight</span><span class=\"unread\">12</span><i></i></a><a style=\"font-weight:bold;color:#356271\">#talk<i></i></a>",
				/* INTENSE */   "<a class=\"sdt-hl sdt-hb\"><span>#highlight</span><span class=\"unread\">12</span><i></i></a><a style=\"font-weight:bold;color:#356271\">#talk<i></i></a>",
				/* OLD-SKOOL */ "<a class=\"sdt-ho\"><span>#highlight</span><span class=\"unread\">12</span><i></i></a><a style=\"font-weight:bold;color:maroon\">#talk<i></i></a>"
			]
			function tfffc(str){ return superdAmn.Pt.tabscounts ? str : str.replace(/<span class="unread">/, "<span class=\"unread\" style=\"display:none\">") }
			
			SD.sdov().innerHTML = "<div id=\"sdprefs\"><div class=\"gr-box\"><i class=\"gr1\"><i></i></i><i class=\"gr2\"><i></i></i><i class=\"gr3\"><i></i></i>"
			+ "<div class=\"gr-top\"><small class=\"version\">Version " + SD.he(SD.v).replace(/-pre$/, "-<strong>pre</strong>") + (SD.newVersion ? " <a class=\"newversion\" href=\"" + SD.superdAmnurl() + "\">New version available</a>" : "") + "</small>"
			+ "<div class=\"gr\"><h2>SuperdAmn Preferences</h2></div></div><div class=\"gr-body\"><div class=\"gr\"><div style=\"padding: 8px;\">"
			+ "<p class=\"nt\">Below, you can change various preferences related to the way SuperdAmn works:</p>"
			+ "<h3><span>Interface</span></h3><p style=\"margin-bottom:0.3em\"><input type=\"checkbox\" id=\"sdp-showtimestamps\"" + this.checked(SD.Pt.timestamps) + " /> <label for=\"sdp-showtimestamps\">Show timestamps</label> "
			+ "<select id=\"sdp-timestyles\"" + this.disabled(!SD.Pt.timestamps) + " style=\"margin-right:2em\"><option id=\"sdp-useam\"" + this.selected(SD.Pt.useam) + ">12h clock</option><option id=\"sdp-dontuseam\"" + this.selected(!SD.Pt.useam) + ">24h clock</option></select>"
			+ "<input type=\"checkbox\" id=\"sdp-formattingbuttons\"" + this.checked(SD.Pt.formattingbuttons) + " /> <label for=\"sdp-formattingbuttons\">Show formatting buttons</label>"
			+ "<input type=\"checkbox\" id=\"sdp-showsend\"" + this.checked(SD.Pt.showsend) + " /> <label for=\"sdp-showsend\">Always display send button</label></p>"
			+ "<p style=\"margin-top:0.3em\"><input type=\"checkbox\" id=\"sdp-nothumbshighlight\"" + this.checked(SD.Pt.nothumbshighlight) + " /> <label for=\"sdp-nothumbshighlight\">Don't highlight me through thumbnails of my art</label></p>"
			+ "<h3><span>Tabs</span></h3>" + (!tcf ? "<div id=\"sdp-tabexample\" class=\"damnc-tabbar tabbar-bogus\"><strong>#current<i></i></strong>" + tfffc(tff[SD.Pt.fixtabs]) + "<a style=\"font-weight:bold\">#event<i></i></a><a>#normal<i></i></a></div>" : "")
			+ "<p style=\"margin-bottom:0.3em\"><input type=\"checkbox\" id=\"sdp-fixtabs\"" + this.checked(SD.Pt.fixtabs) + this.disabled(tcf) + " /> <label for=\"sdp-fixtabs\">Fix tabs</label> "
			+ "<select id=\"sdp-tabstyles\"" + this.disabled(!SD.Pt.fixtabs || tcf) + "><option id=\"sdp-fixtabs-1\" value=\"1\"" + this.selected(SD.Pt.fixtabs == 1) + ">Blue talk, red highlighting</option><option id=\"sdp-fixtabs-2\" value=\"2\"" + this.selected(SD.Pt.fixtabs == 2) + ">Blue talk, red highlighting (100% red)</option>"
			+ "<option id=\"sdp-fixtabs-3\" value=\"3\"" + this.selected(SD.Pt.fixtabs == 3) + ">Maroon talk, white highlighting (old skool)</option></select>" + (tcf ? "</p><p><small><strong class=\"att\">Please uninstall or disable dAmn TabColorFix to enable this feature</strong> (Tools > Greasemonkey > Manage User Scripts)</small>" : "") + "</p>"
			+ "<p style=\"margin-top:0.3em\"><input type=\"checkbox\" id=\"sdp-tabscounts\"" + this.checked(SD.Pt.tabscounts) + this.disabled(tcf || !SD.Pt.fixtabs) + " /> <label for=\"sdp-tabscounts\">Display unread messages counts on tabs</label></p>"
			+ "<h3><span>Away</span></h3><p><label class=\"l\" for=\"sdp-awaymsg\">Away message: </label><span class=\"sdp-damnline sdp-damnlineaction\"><strong>* " + SD.he(SD.u) + "</strong> <input type=\"text\" id=\"sdp-awaymsg\" value=\"" + SD.he(SD.Pt.awaymsg) + "\" /></span></p>"
			+ "<p><label class=\"l\" for=\"sdp-backmsg\">Back message: </label><span class=\"sdp-damnline sdp-damnlineaction\"><strong>* " + SD.he(SD.u) + "</strong> <input type=\"text\" id=\"sdp-backmsg\" value=\"" + SD.he(SD.Pt.backmsg) + "\" /></span></p>"
			+ "<p><label class=\"l\" for=\"sdp-beepmsg\">Away notification: </label><span class=\"sdp-damnline\"><strong>&lt;" + SD.he(SD.u) + "&gt;</strong> <input type=\"text\" id=\"sdp-beepmsg\" value=\"" + SD.he(SD.Pt.beepmsg) + "\" /></span></p>"
			+ "<p><input type=\"checkbox\" id=\"sdp-showbeep\"" + this.checked(SD.Pt.showbeep) + " /> <label for=\"sdp-showbeep\">Show away notification only every </label>"
			+ "<select id=\"sdp-beepinterval\"" + this.disabled(!SD.Pt.showbeep) + "><option value=\"10\"" + this.selected(SD.Pt.beepinterval == 10) + ">10 seconds</option><option value=\"30\"" + this.selected(SD.Pt.beepinterval == 30) + ">30 seconds</option><option value=\"60\"" + this.selected(SD.Pt.beepinterval == 60 || !SD.Pt.beepinterval) + ">1 minute</option>"
			+ "<option value=\"120\"" + this.selected(SD.Pt.beepinterval == 120) + ">2 minutes</option><option value=\"300\"" + this.selected(SD.Pt.beepinterval == 300) + ">5 minutes</option></select></p>"
			+ "<h3><span>Custom emotes</span></h3><div class=\"gmbutton2town\" style=\"float:right;margin-right:5px;margin-top:1em;\"><a href=\"javascript://\" id=\"sdp-exportemotes\" class=\"gmbutton2 gmbutton2s\" title=\"Export your personal emotes list for later import\">Export personal list<b></b></a> "
			+ "<a href=\"javascript://\" id=\"sdp-importemotes\" class=\"gmbutton2 gmbutton2s\" title=\"Import emotes to your personal list\">Import to personal list<b></b></a></div>"
			+ "<p style=\"margin-bottom:0.3em\"><input type=\"checkbox\" id=\"sdp-customemotes\"" + this.checked(SD.Pt.customemotes) + " /> <label for=\"sdp-customemotes\">Enable custom emotes</label> "
			+ "<select id=\"sdp-pickerright\"" + this.disabled(!SD.Pt.customemotes) + "><option>Emotes picker on the left</option><option" + this.selected(SD.Pt.pickerright) + ">Emotes picker on the right</option></select></p>"
			+ "<p style=\"margin-top:0.3em\"><input type=\"checkbox\" id=\"sdp-publicemotes\"" + this.checked(SD.Pt.publicemotes) + this.disabled(!SD.Pt.customemotes) + " /> <label for=\"sdp-publicemotes\">Enable public custom emotes list</label></p>"
			+ "<h3><span>Ignores</span></h3><p><input type=\"checkbox\" id=\"sdp-useignore\"" + this.checked(SD.Pt.useignore) + " /> <label for=\"sdp-useignore\">Activate ignores</label> <input type=\"checkbox\" id=\"sdp-showignore\"" + this.checked(SD.Pt.showignore) + this.disabled(!SD.Pt.useignore) + " /> <label for=\"sdp-showignore\">Show message in current chatroom when ignoring/unignoring</label>"
			+ "<input type=\"checkbox\" id=\"sdp-retroignore\"" + this.checked(SD.Pt.retroignore) + this.disabled(!SD.Pt.useignore) + " /> <label for=\"sdp-retroignore\">Retroactive ignore</label></p>"
			+ "<p><label class=\"l\" for=\"sdp-ignoremsg\">Ignore message:</label> <span class=\"sdp-damnline sdp-damnlineaction\"><strong>* " + SD.he(SD.u) + "</strong> <input type=\"text\" id=\"sdp-ignoremsg\" value=\"" + SD.he(SD.Pt.ignoremsg) + "\" /></span></p>"
			+ "<p><label class=\"l\" for=\"sdp-unignoremsg\">Unignore message:</label> <span class=\"sdp-damnline sdp-damnlineaction\"><strong>* " + SD.he(SD.u) + "</strong> <input type=\"text\" id=\"sdp-unignoremsg\" value=\"" + SD.he(SD.Pt.unignoremsg) + "\" /></span></p>"
			+ "<p><small>To see a list of people you ignore, type <strong>/ignore list</strong> in any chatroom. Users you have ignored are displayed as semi-transparent in a chatroom user list.</small></p>"
			+ "<div class=\"gmbutton2town\"><a href=\"javascript://\" id=\"sdp-writeprefs\" class=\"gmbutton2 gmbutton2c\">Save preferences<b></b></a> "
			+ "<a href=\"javascript://\" id=\"sdp-cancel\" class=\"gmbutton2 gmbutton2s\">Cancel<b></b></a> <a href=\"javascript://\" id=\"sdp-reset\" class=\"gmbutton2 gmbutton2s\">Reset<b></b></a> <small style=\"float:right\"><a target=\"_blank\" href=\"http://superdamners.deviantart.com/gallery/?24276365\" class=\"gmbutton2 gmbutton2s\">Read the SuperdAmn Manual<b></b></a></small></div></div></div></div>"
			+ "<i class=\"gr3\"></i><i class=\"gr2\"></i><i class=\"gr1\"></i></div></div>"
			
			// Form events
			function updateIgnorefields(){ superdAmn.prefs.toggledamnline(document.getElementById("sdp-ignoremsg").parentNode, (!superdAmn.Pt.showignore || !superdAmn.Pt.useignore)); superdAmn.prefs.toggledamnline(document.getElementById("sdp-unignoremsg").parentNode, (!superdAmn.Pt.showignore || !superdAmn.Pt.useignore)) }
			updateIgnorefields()
			superdAmn.prefs.toggledamnline(document.getElementById("sdp-beepmsg").parentNode, !superdAmn.Pt.showbeep)
			
			if(el = document.getElementById('sdp-showtimestamps')){		el.addEventListener("click",  function(evt){ superdAmn.Pt.timestamps   = this.checked; document.getElementById("sdp-timestyles").disabled = !superdAmn.Pt.timestamps }, false) }
			if(el = document.getElementById('sdp-timestyles')){			el.addEventListener("change", function(evt){ superdAmn.Pt.useam        = (this.value == "12h clock") }, false) }
			if(el = document.getElementById('sdp-formattingbuttons')){	el.addEventListener("click",  function(evt){ superdAmn.Pt.formattingbuttons = this.checked }, false) }
			if(el = document.getElementById('sdp-showsend')){			el.addEventListener("click",  function(evt){ superdAmn.Pt.showsend = this.checked }, false) }
			if(el = document.getElementById('sdp-nothumbshighlight')){	el.addEventListener("click",  function(evt){ superdAmn.Pt.nothumbshighlight = this.checked }, false) }
			if(!tcf){ if(el = document.getElementById('sdp-fixtabs')){	el.addEventListener("click",  function(evt){ var s = document.getElementById("sdp-tabstyles"); var c = document.getElementById("sdp-tabscounts"); superdAmn.Pt.fixtabs = this.checked ? s.value : 0; s.disabled = !this.checked; c.disabled = !this.checked; c.checked = superdAmn.Pt.tabscounts = this.checked; document.getElementById("sdp-tabexample").innerHTML = "<strong>#current<i></i></strong>" + tfffc(tff[SD.Pt.fixtabs]) + "<a style=\"font-weight:bold\">#event<i></i></a><a>#normal<i></i></a>" }, false) }
			if(el = document.getElementById('sdp-tabstyles')){			el.addEventListener("change", function(evt){ superdAmn.Pt.fixtabs      = this.value; document.getElementById("sdp-tabexample").innerHTML = "<strong>#current<i></i></strong>" + tfffc(tff[SD.Pt.fixtabs]) + "<a style=\"font-weight:bold\">#event<i></i></a><a>#normal<i></i></a>" }, false) }
			if(el = document.getElementById('sdp-tabscounts')){			el.addEventListener("click",  function(evt){ superdAmn.Pt.tabscounts   = this.checked; document.getElementById("sdp-tabexample").innerHTML = "<strong>#current<i></i></strong>" + tfffc(tff[SD.Pt.fixtabs]) + "<a style=\"font-weight:bold\">#event<i></i></a><a>#normal<i></i></a>" }, false) } }
			if(el = document.getElementById('sdp-awaymsg')){			el.addEventListener("change", function(evt){ superdAmn.Pt.awaymsg      = superdAmn.format.awayMsgStandardize(this.value) }, false) }
			if(el = document.getElementById('sdp-backmsg')){			el.addEventListener("change", function(evt){ superdAmn.Pt.backmsg      = superdAmn.format.awayMsgStandardize(this.value) }, false) }
			if(el = document.getElementById('sdp-beepmsg')){			el.addEventListener("change", function(evt){ superdAmn.Pt.beepmsg      = superdAmn.format.awayMsgStandardize(this.value) }, false) }
			if(el = document.getElementById('sdp-showbeep')){			el.addEventListener("click",  function(evt){ superdAmn.Pt.showbeep     = this.checked; document.getElementById("sdp-beepinterval").disabled = !superdAmn.Pt.showbeep; superdAmn.prefs.toggledamnline(document.getElementById("sdp-beepmsg").parentNode, !superdAmn.Pt.showbeep) }, false) }
			if(el = document.getElementById('sdp-beepinterval')){		el.addEventListener("change", function(evt){ superdAmn.Pt.beepinterval = parseInt(this.value) }, false) }
			if(el = document.getElementById('sdp-customemotes')){		el.addEventListener("click",  function(evt){ superdAmn.Pt.customemotes = this.checked; document.getElementById("sdp-publicemotes").disabled = !superdAmn.Pt.customemotes; document.getElementById("sdp-pickerright").disabled = !superdAmn.Pt.customemotes }, false) }
			if(el = document.getElementById('sdp-publicemotes')){		el.addEventListener("click",  function(evt){ superdAmn.Pt.publicemotes = this.checked }, false) }
			if(el = document.getElementById('sdp-pickerright')){		el.addEventListener("change", function(evt){ superdAmn.Pt.pickerright  = (this.value.indexOf("on the right") > -1) }, false) }
			if(el = document.getElementById('sdp-useignore')){			el.addEventListener("click",  function(evt){ superdAmn.Pt.useignore    = this.checked; document.getElementById("sdp-showignore").disabled = !superdAmn.Pt.useignore; document.getElementById("sdp-retroignore").disabled = !superdAmn.Pt.useignore; updateIgnorefields() }, false) }
			if(el = document.getElementById('sdp-showignore')){			el.addEventListener("click",  function(evt){ superdAmn.Pt.showignore   = this.checked; updateIgnorefields() }, false) }
			if(el = document.getElementById('sdp-retroignore')){		el.addEventListener("click",  function(evt){ superdAmn.Pt.retroignore  = this.checked }, false) }
			if(el = document.getElementById('sdp-ignoremsg')){			el.addEventListener("change", function(evt){ superdAmn.Pt.ignoremsg    = superdAmn.format.userMsgStandardize(this.value) }, false) }
			if(el = document.getElementById('sdp-unignoremsg')){		el.addEventListener("change", function(evt){ superdAmn.Pt.unignoremsg  = superdAmn.format.userMsgStandardize(this.value) }, false) }
			
			// Buttons
			if(el = document.getElementById('sdp-writeprefs')){ 		el.addEventListener("click",  function(evt){ evt.preventDefault(); superdAmn.prefs.write()  }, false) }
			if(el = document.getElementById('sdp-cancel')){ 			el.addEventListener("click",  function(evt){ evt.preventDefault(); superdAmn.prefs.cancel() }, false) }
			if(el = document.getElementById('sdp-reset')){ 				el.addEventListener("click",  function(evt){ evt.preventDefault(); superdAmn.prefs.reset() }, false) }
			
			if(el = document.getElementById('sdp-exportemotes')){ 		el.addEventListener("click",  function(evt){ evt.preventDefault(); if(!superdAmn.oe(superdAmn.P.emotes)){ prompt("Save all of the below text in a file, then use it for when you want to import these emotes again.", JSON.stringify(superdAmn.P.emotes)) } else { alert("There are no emotes in your personal emote list. There is nothing to export.") } }, false) }
			if(el = document.getElementById('sdp-importemotes')){ 		el.addEventListener("click",  function(evt){ evt.preventDefault(); var x; if(x = prompt("Paste in an emote export code below to import the exported emotes to this system.\nWARNING: This will overwrite any existing emotes that happen to have the same code as any of those you're trying to import!")){ var err; try { superdAmn.Pt.emotes = superdAmn.oconcat(superdAmn.Pt.emotes, JSON.parse(x)) } catch(e){ if(e.message == "JSON.parse"){ alert("Whoops! I couldn't parse the info you gave me! It is probably malformed. Nothing was imported.") } else { alert("Whoops! I got a weird error trying to import your emotes. Nothing was imported. The error was:\n" + String(e.message)) } err = e } if(!err){ alert("Done! Remember to click Save in the Preferences panel to save the changes.") } } }, false) }
			
			// Utils
			if(el = document.getElementById('sdp-updateslows')){		el.addEventListener("click",  function(evt){ evt.preventDefault(); superdAmn.updateslows() }, false) }
			
			SD.sdov().style.display = "block"
			this.position()
			
			// Adjusting damnline widths
			Array.prototype.forEach.call($x(".//input[(ancestor::span[contains(concat(' ',normalize-space(@class),' '),' sdp-damnline ')])]", SD.sdov()), function(el){
				var p = el.parentNode.parentNode
				el.style.width = ((p.offsetWidth - p.childNodes[0].offsetWidth) - el.previousSibling.previousSibling.offsetWidth - 25) + "px"
			})
			
			// Changes are not saved or in effect until SD.prefs.write() is run.
		},
		// WRITE: Writes the preferences to the permanent var, saves, hides panel and takes care of certain changes
		write: function(){
			var SD = superdAmn, oldP = superdAmn.P
			SD.P   = SD.Pt
			SD.Pt  = false
			this.save()
			this.hide()
			
			// Fixing changes in ignores
			SD.ignores.style()
			// Fixing changes in formatting buttons
			if(SD.P.formattingbuttons != oldP.formattingbuttons || SD.P.customemotes != oldP.customemotes
				|| SD.P.useam != oldP.useam || SD.P.pickerright != oldP.pickerright || SD.P.showsend != oldP.showsend){
				for(var ns in dAmnChats){
					//SD.buttons.clearbar(ns)
					SD.buttons.chatinit(dAmnChats[ns])
				}
			}
			// Fixing changes in custom emotes
			var justran = false
			if(SD.P.customemotes && !oldP.customemotes){
				SD.emotes.init()
				justran = true
			}
			if(SD.P.publicemotes && !oldP.publicemotes && SD.P.customemotes){
				SD.spe = JSON.parse(SD.emotes.ems)
				SD.emotes.fetch()
				justran = true
			}
			if(!justran && (SD.P.customemotes != oldP.customemotes || SD.P.publicemotes != oldP.publicemotes)){
				SD.emotes.picker.generate()
			}
			if(SD.P.pickerright != oldP.pickerright && SD.sdep() && SD.sdep().style.display == "block"){
				SD.emotes.picker.show() // Refresh position NOW if it's already open
			}
			if(JSON.stringify(SD.P.emotes) != JSON.stringify(oldP.emotes)){
				SD.emotes.sie()
			}
		},
		// CANCEL: Cancels the preference panel "session" and discards the temporary preference var
		cancel: function(){
			var SD = superdAmn
			var j  = JSON.stringify(SD.P)
			var jt = JSON.stringify(SD.Pt)
			if(!SD.Pt || j == jt || confirm("Are you sure you want to cancel? All changes will be lost!")){
				this.hide()
				SD.Pt = false
			}
		},
		// RESET: Change the preferences back to the standard ones
		reset: function(){
			var SD = superdAmn
			if(confirm("Are you sure you want to change your SuperdAmn preferences back to the default ones? Every preference, INCLUDING CUSTOM PERSONAL EMOTES AND IGNORES, will be lost!")){
				SD.Pt = SD.Ps
				this.write()
				SD.Pt = false
				alert("Your preferences have been changed to the default.")
			}
		},
		// POSITION: Positions the preference panel in the middle according to window dimensions
		position: function(){
			var SD = superdAmn
			var ph = SD.sdpr().offsetHeight, ch = document.documentElement.clientHeight, hh = SD.sdpr().childNodes[0].childNodes[3].offsetHeight
			if(ph > ch){
				SD.sdpr().style.top = 0
			} else {
				SD.sdpr().style.top = ((ch/2) - (ph/2)) + "px"
			}
			SD.sdpr().style.maxHeight = ch + "px"
			SD.sdpr().childNodes[0].childNodes[4].childNodes[0].style.maxHeight = (document.documentElement.clientHeight - (hh + 5)) + "px"
		},
		// TOGGLEDAMNLINE: Disables/enables our special dAmnline form element
		toggledamnline: function(el, disable){
			var SD = superdAmn
			var ip = $x(".//input", el)[0]
			if(!disable && disable != false){ disable = !ip.disabled }
			if(disable){ if(!SD.hc(el, "disabled")){ SD.ac(el, "disabled") } }
			else       { SD.rc(el, "disabled") }
			ip.disabled = disable
		},
		// CHECKED/SELECTED/DISABLED: Returns the appropriate HTML tag parameter if bool supplied is true
		checked:  function(bool){ return bool ? " checked=\"checked\""   : "" },
		selected: function(bool){ return bool ? " selected=\"selected\"" : "" },
		disabled: function(bool){ return bool ? " disabled=\"disabled\"" : "" },
		// UPDATE: Runs updates on your preferences if they are old-version-ish
		update:   function(){
			var SD = superdAmn, updated = false
			// The two below were not present in early betas
			if(!("pickerright" in SD.P)){
				SD.P.pickerright       = false // Standard values only
				updated                = true
			}
			if(!("showsend" in SD.P)){
				SD.P.showsend          = false
				updated                = true
			}
			// Added in 1.0RC2
			if(!("ignoreversions" in SD.P)){
				SD.P.ignoreversions    = []
				updated                = true
			}
			if(!("tabscounts" in SD.P)){
				SD.P.tabscounts        = true
				updated                = true
			}
			if(!("nothumbshighlight" in SD.P)){
				SD.P.nothumbshighlight = false
				updated                = true
			}
			
			if(updated){ this.save() }
			return updated
		}
	},
	
	// ACCESSKEY STORAGE --------------------------------
	accesskeys: {
		ak: {},
		container: null,
		// INIT: Initializes our accesskey container
		init: function(){
			var SD = superdAmn
			if(!SD.sdak()){
				var sdak           = document.createElement("div")
				sdak.id            = "superdamnaccesskeys"
				sdak.style.display = "none"
				this.container     = sdak
				document.getElementsByTagName("body")[0].appendChild(sdak)
			}
		},
		// ADD: Adds an accesskey that represents a hot key that can be used by SuperdAmn
		add: function(key, onclick){
			key = key.toString().charAt(0)
			if(key && onclick && !this.ak[key] && $x("//a[@accesskey='" + key + "']", superdAmn.sdak()).length <= 0){
				var a        = document.createElement("a")
				a.accessKey  = key
				a.onclick    = onclick
				a.href       = "javascript://"
				a.target     = "_self"
				this.ak[key] = a
				superdAmn.sdak().appendChild(a)
				return a
			} else {
				return {}
			}
		},
		// REMOVE: Removes an accesskey and frees the slot
		remove: function(key){
			var key = key.charAt(0)
			if(key && this.ak[key]){
				if(this.ak[key].parentNode){
					this.ak[key].parentNode.removeChild(this.ak[key])
				}
				delete this.ak[key]
			}
		}
	},
	
	// FORMATTING UTILITIES -----------------------------
	format: {
		// TIMESTAMP: Returns a timestamp in a string from the input date object
		timestamp: function(d){
			if(!d){ d = new Date() }
			var SD  = superdAmn
			var h   = d.getHours()
			var m   = SD.pad(d.getMinutes())
			var s   = SD.pad(d.getSeconds())
			var am  = ""
			if(SD.P.useam){
				if(h >= 12){ if(h > 12){ h -= 12 } am = "PM" }
				else       { if(h == 0){ h  = 12 } am = "AM" }
			}
			h = SD.pad(h)
			return h +":"+ m + (!d.noseconds ? ":" + s : "") + am
		},
		// TIME: Converts amount of seconds into days/minutes/hours/seconds
		time: function(i){
			i    = Math.floor(parseInt(i))
			sec  = 0
			min  = 0
			hour = 0
			day  = 0

			while(i > 0){
				if(i < 60){
					sec = i
					i = 0
				} else {
					i = i - 60
					min++
					if(min >= 60){
						min = min - 60
						hour++
						if(hour >= 24){
							hour = hour - 24
							day++
						}
					}
				}
			}
			return { "s":sec, "m":min, "h":hour, "d":day }
		},
		// TSTR: Converts amount of seconds into a string describing time past
		tstr: function(i){
			t   = this.time(i)
			str = " " + t.d + " days, " + t.h + " hours, " + t.m + " minutes, " + t.s + " seconds"
			str = str.replace(/ 0 [a-z]+,/g, " ") // Removing 0's
			str = str.replace(/, 0 seconds/g, "") // Removing 0's
			str = str.replace(/ 1 ([a-z]+)s/g, " 1 $1") // Non-pluralizing 1's
			return superdAmn.trim(str)
		},
		// AWAYMSG: Populates variables in away message
		awayMsg: function(str, user, message){
			var SD = superdAmn
			if(SD.away){
				at = new Date()
				at.setTime(SD.away.t * 1000)
				if(user){ str = str.replace(/%USER%/g, user) }
				if(message === ""){
					str = str.replace(/(\(|\[|\{)%BACKMSG%(\)|\]|\})/g, message) // Let's remove the brackets
					str = str.replace(/\s+-{1,6}\s+%BACKMSG%\s*$/, message)     // .. or these
				}
				if(message){ str = str.replace(/%BACKMSG%/g, message) }
				return str.replace(/%REASON%/g, SD.reason(SD.away.r)).replace(/%AWAYTIME%/g, at.toString()).replace(/%TIMESINCE%/g, this.tstr(SD.time() - SD.away.t))
			} else { return str }
		},
		// AWAYMSGSTANDARDIZE: Turning every first var name into caps version, for more easy visual distinction
		awayMsgStandardize: function(str){
			return superdAmn.trim(str).replace(/%reason%/gi, "%REASON%").replace(/%awaytime%/gi, "%AWAYTIME%").replace(/%timesince%/gi, "%TIMESINCE%").replace(/%user%/gi, "%USER%").replace(/%backmsg%/gi, "%BACKMSG%")
		},
		// USERMSG: Populates variables in message with username
		userMsg: function(str, user){
			if(user){ str = str.replace(/%USER%/g, user) }
			return str
		},
		// USERMSGSTANDARDIZE: Turning every first var name into caps version, for more easy visual distinction
		userMsgStandardize: function(str){
			return superdAmn.trim(str).replace(/%user%/gi, "%USER%")
		},
		// QSTOOBJECT: Converts query string into object with vars
		qsToObject: function(str){
			var o   = {}
			var seg = str.split("&")
			Array.prototype.forEach.call(seg, function(kv){
				var kvs   = superdAmn.explode(kv, "=", 1)
				o[kvs[0]] = decodeURIComponent(kvs[1])
			})
			return o
		}
	},
	
	// EXTENDING SUPERDAMN ------------------------------
	extend: {
		hooks: {
			"ready": {},
			"maketext": {},
			"emotepickeropen": {},
			"emotepickerclose": {},
			"prefsopen": {},
			"prefsclose": {},
			"focus": {},
			"blur": {}
			// More hooks will be available at some point
			// Are you a developer? Tell me which ones 
			// you'd like if any!
		},
		optcmds: [],
		// Help make arguments to these commands optional
		bind: function(hook, id, func){
			if(this.hooks[hook] && typeof id == "string" && typeof func == "function"){
				this.hooks[hook][id] = func
				return true
			}
			return false
		},
		unbind: function(hook, id){
			if(this.hooks[hook] && this.hooks[hook][id]){
				delete this.hooks[hook][id]
			}
		},
		change: function(hook, id, func){
			if(this.hooks[hook] && this.hooks[hook][id]){
				this.hooks[hook][id] = func
			} else {
				this.bind(hook, id, func)
			}
		},
		trigger: function(hook, args){
			if(this.hooks[hook]){
				for(var e in this.hooks[hook]){
					args = this.hooks[hook][e](args) || args // Pass on the result arguments to the next
				}
				return args
			}
			// Lots of inspiration here from MiddleMan
		}
	},
	
	// MISCELLANEOUS ------------------------------------
	
	// FOCUS: Runs whenever the chatroom window/tab achieves focus
	focus: function(){
		var SD = superdAmn
		SD.extend.trigger("focus")
		SD.unread.count = 0
		SD.viewing = true
		SD.dAmn.updatetitle()
	},
	
	// BLUR: Runs whenever the chatroom window/tab loses focus (is in the background)
	blur: function(){
		var SD = superdAmn
		SD.extend.trigger("blur")
		SD.viewing = false
		SD.dAmn.updatetitle()
	},
	
	// DETECTINCOMPATIBILITIES: Detects incompatibilities with SuperdAmn and keeps talkin' about it, shutting down the script if it has to
	detectincompatibilities: function(messaging){
		var message = "", shutoff = false
		messaging = (typeof messaging == "boolean") ? messaging : true
		// dAx
		if(window.SCRIPT_NAME && (SCRIPT_NAME == "dAx" || SCRIPT_NAME == "dAx.help" || SCRIPT_NAME == "dAx.MN.help")){ // dAx detected
			message = "<strong>You need to turn off dAx (and all scripts depending on it) before you can begin to use SuperdAmn. These two scripts are incompatible with each other.</strong> (Tools > Greasemonkey > Manage User Scripts)"
			shutoff = true
		}
		// dAmn drAg'n'drop
		var a, hbel = $x("//a[@style and (ancestor::div[contains(concat(' ',normalize-space(@class),' '),' damnc-header ')])]")
		if(hbel.length > 0){
			for(var i in hbel){
				a = hbel[i]
				if(a.innerHTML.match(/drag/i) && a.childNodes.length > 0){
					for(var ii in a.childNodes){
						if(typeof a.childNodes[ii] == "object" && !("tagName" in a.childNodes[ii])){
							a.removeChild(a.childNodes[ii]) // Remove text nodes to make space
						}
					}
					a.title       = "Drag"
					a.style.right = "90px"
				}
			}
		}
		if(messaging && message){
			var m       = document.createElement("div")
			m.id        = "superdamnmessage"
			m.className = "nay"
			m.innerHTML = message
			document.getElementsByTagName("body")[0].appendChild(m)
		}
		if(messaging && !shutoff){
			window.setTimeout(function(){ superdAmn.detectincompatibilities(false) }, 1000)
		}
		return shutoff
	},
	// UPDATESLOWS: Updates chatrooms that were loaded before SD
	updateslows: function(){
		if(window.dAmnChats){
			for(var ns in dAmnChats){
				if(!dAmnChats[ns].SD){
					dAmnChats[ns].SD = {}
					superdAmn.buttons.chatinit(dAmnChats[ns])
					for(var member in dAmnChats[ns].members.members){ dAmnChats[ns].members.members[member].updateInfo() }
				}
			}
			if(window.dAmn_InvalidateLayout){
				dAmn_InvalidateLayout()
			}
		}
	},
	// UPDATEMEMBERS: Makes sure members are updated
	updatemembers: function(){
		if(window.dAmnChats){
			for(var ns in dAmnChats){
				for(var member in dAmnChats[ns].members.members){ dAmnChats[ns].members.members[member].updateInfo() }
			}
		}
	},
	// REQUESTCALLBACK: Callback function for when we get response on a POST request
	requestcallback: function(id, url, data, response){
		if(this.postrequests[id]){ delete this.postrequests[id] }
		if(this.postcallbacks[id]){
			this.postcallbacks[id](id, url, data, response)
			delete this.postcallbacks[id]
		}
	},
	// UPDATECHECK: Checks for new versions of SuperdAmn!
	updatecheck: function(){
		jQuery.getJSON("http://temple.24bps.com/superdamn/uptodate.php?jsoncallback=?&" + (new Date()).getDay(), function(data){
			var SD = superdAmn
			if(SD.ia(data.a)){ // SuperdAmn Ambassadors
				SD.ambassadors = data.a
				SD.updatemembers()
			}
			if(data.v && data.d && data.d > SD.vd){ // It's a newer version, zomg!
				if(!SD.P.ignoreversions || SD.P.ignoreversions && !(data.v in SD.oc(SD.P.ignoreversions))){
					var m  = document.createElement("div")
					var d  = new Date()
					d.setTime(data.d*1000)
					m.id        = "superdamnmessage"
					m.className = "yay"
					m.innerHTML = "<a class=\"close\" href=\"javascript://\" title=\"Close and don't alert me again until there's an even newer version\"></a>"
									+ "<strong>There&#8217;s a new version of SuperdAmn available &#8212; <a class=\"download\" href=\"" + SD.superdAmnurl() + "\">Download</a></strong><br />"
									+ (data.u ? SD.he(data.u) + "<br />" : "") + "<small><em><strong>" + SD.he(data.v) + "</strong>,"
									+ " released at " + d.toString().replace(/[0-9]+:[0-9]+/, "/").split(" /")[0]
									+ " &#8212; When downloaded, reload to install</em></small>"
					$x(".//a[@class='close']", m)[0].addEventListener("click", function(evt){ evt.preventDefault(); superdAmn.P.ignoreversions.push(data.v); superdAmn.prefs.save(); this.parentNode.style.display = "none" }, false)
					document.getElementsByTagName("body")[0].appendChild(m)
				}
				SD.newVersion = true
			}
		})
	},
	// SUPERDAMNURL: Return the URL to the SuperdAmn userscript
	superdAmnurl: function(){
		if(superdAmn.browser.chrome){
			return "http://temple.24bps.com/superdamn/superdamn-webkit.user.js"
		} else if(superdAmn.browser.safari){
			return "http://temple.24bps.com/superdamn/SuperdAmnSafari.safariextz"
		} else {
			return "http://temple.24bps.com/superdamn/superdamn.user.js"
		}
	}
}
superdAmn.init()
}).toString())

// SUPERDAMNLOCAL -----------------------------------
if(superdAmn_GM){
	// JSON madness again
	eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('3(!o.p){p={}}(5(){5 f(n){7 n<10?\'0\'+n:n}3(6 1b.z.q!==\'5\'){1b.z.q=5(h){7 o.1C()+\'-\'+f(o.1T()+1)+\'-\'+f(o.1O())+\'T\'+f(o.1D())+\':\'+f(o.1M())+\':\'+f(o.1Q())+\'Z\'};X.z.q=1K.z.q=1I.z.q=5(h){7 o.1V()}}y L=/[\\1W\\13\\1o-\\1l\\1m\\1i\\1n\\1s-\\1p\\1j-\\15\\17-\\14\\18\\1f-\\19]/g,M=/[\\\\\\"\\1B-\\1z\\1w-\\1y\\13\\1o-\\1l\\1m\\1i\\1n\\1s-\\1p\\1j-\\15\\17-\\14\\18\\1f-\\19]/g,8,H,1e={\'\\b\':\'\\\\b\',\'\\t\':\'\\\\t\',\'\\n\':\'\\\\n\',\'\\f\':\'\\\\f\',\'\\r\':\'\\\\r\',\'"\':\'\\\\"\',\'\\\\\':\'\\\\\\\\\'},l;5 N(m){M.1h=0;7 M.11(m)?\'"\'+m.C(M,5(a){y c=1e[a];7 6 c===\'m\'?c:\'\\\\u\'+(\'1k\'+a.1r(0).12(16)).1g(-4)})+\'"\':\'"\'+m+\'"\'}5 E(h,w){y i,k,v,e,K=8,9,2=w[h];3(2&&6 2===\'x\'&&6 2.q===\'5\'){2=2.q(h)}3(6 l===\'5\'){2=l.P(w,h,2)}1u(6 2){J\'m\':7 N(2);J\'S\':7 1v(2)?X(2):\'D\';J\'1x\':J\'D\':7 X(2);J\'x\':3(!2){7\'D\'}8+=H;9=[];3(Q.z.12.1S(2)===\'[x 1R]\'){e=2.e;G(i=0;i<e;i+=1){9[i]=E(i,2)||\'D\'}v=9.e===0?\'[]\':8?\'[\\n\'+8+9.O(\',\\n\'+8)+\'\\n\'+K+\']\':\'[\'+9.O(\',\')+\']\';8=K;7 v}3(l&&6 l===\'x\'){e=l.e;G(i=0;i<e;i+=1){k=l[i];3(6 k===\'m\'){v=E(k,2);3(v){9.1c(N(k)+(8?\': \':\':\')+v)}}}}R{G(k 1t 2){3(Q.1q.P(2,k)){v=E(k,2);3(v){9.1c(N(k)+(8?\': \':\':\')+v)}}}}v=9.e===0?\'{}\':8?\'{\\n\'+8+9.O(\',\\n\'+8)+\'\\n\'+K+\'}\':\'{\'+9.O(\',\')+\'}\';8=K;7 v}}3(6 p.W!==\'5\'){p.W=5(2,A,I){y i;8=\'\';H=\'\';3(6 I===\'S\'){G(i=0;i<I;i+=1){H+=\' \'}}R 3(6 I===\'m\'){H=I}l=A;3(A&&6 A!==\'5\'&&(6 A!==\'x\'||6 A.e!==\'S\')){1a 1d 1E(\'p.W\')}7 E(\'\',{\'\':2})}}3(6 p.Y!==\'5\'){p.Y=5(B,U){y j;5 V(w,h){y k,v,2=w[h];3(2&&6 2===\'x\'){G(k 1t 2){3(Q.1q.P(2,k)){v=V(2,k);3(v!==1L){2[k]=v}R{1J 2[k]}}}}7 U.P(w,h,2)}L.1h=0;3(L.11(B)){B=B.C(L,5(a){7\'\\\\u\'+(\'1k\'+a.1r(0).12(16)).1g(-4)})}3(/^[\\],:{}\\s]*$/.11(B.C(/\\\\(?:["\\\\\\/1G]|u[0-1X-1U-F]{4})/g,\'@\').C(/"[^"\\\\\\n\\r]*"|1A|1P|D|-?\\d+(?:\\.\\d*)?(?:[1N][+\\-]?\\d+)?/g,\']\').C(/(?:^|:|,)(?:\\s*\\[)+/g,\'\'))){j=1F(\'(\'+B+\')\');7 6 U===\'5\'?V({\'\':j},\'\'):j}1a 1d 1H(\'p.Y\')}}}());',62,122,'||value|if||function|typeof|return|gap|partial|||||length|||key||||rep|string||this|JSON|toJSON||||||holder|object|var|prototype|replacer|text|replace|null|str||for|indent|space|case|mind|cx|escapable|quote|join|call|Object|else|number||reviver|walk|stringify|String|parse|||test|toString|u00ad|u206f|u202f||u2060|ufeff|uffff|throw|Date|push|new|meta|ufff0|slice|lastIndex|u17b4|u2028|0000|u0604|u070f|u17b5|u0600|u200f|hasOwnProperty|charCodeAt|u200c|in|switch|isFinite|x7f|boolean|x9f|x1f|true|x00|getUTCFullYear|getUTCHours|Error|eval|bfnrt|SyntaxError|Boolean|delete|Number|undefined|getUTCMinutes|eE|getUTCDate|false|getUTCSeconds|Array|apply|getUTCMonth|fA|valueOf|u0000|9a'.split('|'),0,{}))

	var superdAmnlocal = {
		SD: null,
		domains:  ["temple.24bps.com", "www.thezikes.org", "thezikes.org"], // Approved domains to send requests to
		oc:       function(a){ var o = {}; for(var i=0;i<a.length;i++){ o[a[i]] = ""; } return o }, // Converting an array to an object literal; from http://snook.ca/archives/javascript/testing_for_a_v/
		ol:       function(obj){ var l = 0; for(var p in obj){ if(obj.hasOwnProperty(p)){ l++ } } return l }, // Object length
		parseurl: function(str, component){ var o = { strictMode: false, key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"], q: { name: "queryKey", parser: /(?:^|&)([^&=]*)=?([^&]*)/g }, parser: { strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/, loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ } }; var m = o.parser[o.strictMode ? "strict" : "loose"].exec(str), uri = {}, i = 14; while(i--){ uri[o.key[i]] = m[i] || "" } switch(component){ case "PHP_URL_SCHEME": return uri.protocol; case "PHP_URL_HOST": return uri.host; case "PHP_URL_PORT": return uri.port; case "PHP_URL_USER": return uri.user; case "PHP_URL_PASS": return uri.password; case "PHP_URL_PATH": return uri.path; case "PHP_URL_QUERY": return uri.query; case "PHP_URL_FRAGMENT": return uri.anchor; default: var retArr = {}; if(uri.protocol !== ""){ retArr.scheme = uri.protocol } if(uri.host !== ""){ retArr.host = uri.host } if(uri.port !== ""){ retArr.port = uri.port } if(uri.user !== ""){ retArr.user = uri.user } if(uri.password !== ""){ retArr.pass = uri.password } if(uri.path !== ""){ retArr.path = uri.path } if(uri.query !== ""){ retArr.query = uri.query } if(uri.anchor !== ""){ retArr.fragment = uri.anchor } return retArr } }, // Kudos to PHP-JS; http://phpjs.org/functions/parse_url
		// INIT: Initializes our superdAmn local objects and lets the user know that SD is running
		init: function(){
			GM_log("Oh hai")
			this.getSD()
		},
		// KONTINUE: Starts listening for requests once we've gotten a reference to SD
		kontinue: function(){
			this.checkrequests()
		},
		// GETSD: Searches for the SD object and puts a reference to it in this.SD once it's found
		getSD: function(){
			if(unsafeWindow.superdAmn){ GM_log("Got it"); this.SD = unsafeWindow.superdAmn; this.kontinue() }
			else { setTimeout(function(){ superdAmnlocal.getSD() }, 500) }
		},
		// CHECKREQUESTS: Looks for AJAX POST requests from SD and sends them off if there is any
		checkrequests: function(){
			if(this.SD && this.ol(this.SD.postrequests) > 0){
				for(var r in this.SD.postrequests){
					if(this.SD.postrequests[r].url == "save"){
						this.saveprefs(r, this.SD.postrequests[r].data)
					} else {
						this.post(r, this.SD.postrequests[r].url, this.SD.postrequests[r].data)
					}
					delete this.SD.postrequests[r]
				}
			}
			setTimeout(function(){ superdAmnlocal.checkrequests() }, 500) // Constantly check if there is something
		},
		// POST: Runs a POST request with the supplied data and the SD callback function
		post: function(id, url, data){
			if(this.SD && this.checkdomain(url)){
				if(GM_xmlhttpRequest){
					GM_xmlhttpRequest({
						method:		"POST",
						url:		url,
						data:		data,
						headers:	{ "Content-type": "application/x-www-form-urlencoded" },
						onload:		function(response){ superdAmnlocal.SD.requestcallback(id, url, data, response) }
					})
				} else if(jQuery) {
					jQuery.post(url, data, function(response){ superdAmnlocal.SD.requestcallback(id, url, data, response) })
				} else {
					throw new Error("Can't find a suitable way to send POST requests!")
				}
			}
		},
		// LOADPREFS: Loads the preferences as JSON from a GM value. Stores and returns. If it's not present, it saves the default, which is already loaded
		loadprefs: function(){
			if(this.SD){
				if(GM_getValue){
					x = GM_getValue("preferences")
				} else if(localStorage){
					x = localStorage.superdAmn_preferences
				} else {
					throw new TypeError("SuperdAmn save data is not saved anywhere understandable. :(")
				}
				if(x){
					this.SD.P = JSON.parse(x) // JSON
					return x
				} else {
					this.saveprefs(this.SD.P) // Saving default prefs
					return this.SD.P
				}
			}
		},
		// SAVEPREFS: Saves the supplied SD preferences in a local GM value
		saveprefs: function(id, data){
			if(GM_setValue){
				GM_setValue("preferences", JSON.stringify(data))
			} else if(localStorage){
				localStorage.superdAmn_preferences = JSON.stringify(data)
			} else {
				throw new TypeError("SuperdAmn save data cannot be saved anywhere understandable. :(")
			}
		},
		// CHECKDOMAIN: Check if the supplied URL is on a domain that we've approved
		checkdomain: function(url){
			var seg = this.parseurl(url)
			return (seg.scheme in this.oc(["http", "https"]) && seg.host in this.oc(this.domains))
		}
	}
}

// EPILOGUE -----------------------------------------

// MiddleMan, a dAmn userscript toolkit made by miksago and sumopiggy, utilized by SuperdAmn.
if(!document.getElementById("MiddleMan")){
	mm = freeFunctionString((function(){
		
		// The below is highly compressed; to get the full editable MiddleMan, please go to
		// http://sumopiggy.24bps.com/damn/middleman/middleman.js and paste that code in instead of this
		(function(){var d=window.MiddleMan={loaded:false,debug:false,_title:{},_topic:{},init:function(){this.updateMethods();this.loaded=true;this.appendInlineStyles(".dockrocker_MM .popup2_MM{ display:none; width: auto; height: auto; right: 0px; } .dockrocker_MM:hover .popup2_MM{ display:block; }.dockrocker_MM .popup2_MM .f{ text-indent: 0px; padding: 2px 18px; }.dockrocker_MM .popup2_MM .f:hover{ cursor: pointer; background-color: #AFC81C; color: #2D3733 !important; }")},extend:function(a,b){a=a||{};b=
		b||this;for(var c in a)b[c]=a[c];return b},errorMsg:function(a,b,c){this.debug&&alert("MiddleMan Error occurred: "+b+"("+uneval(c)+")\n"+a)},insertBefore:function(a,b){(b=typeof b=="string"?document.getElementById(b):b)&&b.parentNode.insertBefore(a,b)},objForEach:function(a,b,c){for(var e in a)typeof a[e]=="object"&&b(a[e],e,c)},each:function(a,b,c){var e,f=0,g=a.length;if(c)if(g==undefined)for(e in a){if(b.apply(a[e],c)===false)break}else for(;f<g;){if(b.apply(a[f++],c)===false)break}else if(g==
		undefined)for(e in a){if(b.call(a[e],e,a[e])===false)break}else for(c=a[0];f<g&&b.call(c,f,c)!==false;c=a[++f]);return a},serialize:function(a){var b=[];if(a.constructor!=Array)for(var c in a)b.push(encodeURIComponent(c)+"="+encodeURIComponent(a[c]));return b.join("&").replace(/%20/g,"+")},appendScript:function(a,b){var c=document.createElement("script");c.id=a;c.src=b;document.getElementsByTagName("head")[0].appendChild(c);return c},appendStylesheet:function(a,b){var c=document.createElement("link");
		c.href=b;c.id=a;c.rel="stylesheet";c.type="text/css";document.getElementsByTagName("head")[0].appendChild(c);return c},appendInlineStyles:function(a){b=document.getElementById("MiddleManStyles");if(!b){var b=document.createElement("style");b.id="MiddleManStyles";b.type="text/css";document.getElementsByTagName("head")[0].appendChild(b);b=document.getElementById("MiddleManStyles")}b.innerHTML+=" "+a;return b},removeElement:function(a){if("string"==typeof a)a=document.getElementById(a);if(!a)return false;
		try{a.parentNode.removeChild(a)}catch(b){this.errorMsg(b,"MiddleMan.removeElement",a)}},ajaxSettings:{type:"GET",contentType:"application/x-www-form-urlencoded",data:null,processData:true},ajaxLastModified:{},ajax:function(a){a=this.extend(a,this.ajaxSettings);if(a.data&&a.processData&&typeof a.data!="string")a.data=this.serialize(a.data);if(a.data&&a.type.toUpperCase()=="GET"){a.url+=(a.url.match(/\?/)?"&":"?")+a.data;a.data=null}var b=new XMLHttpRequest;b.open(a.type,a.url,a.async,a.username,a.password);
		try{if(a.headers)for(var c in a.headers)c!="Content-Type"&&b.setRequestHeader(c,a.headers[c]);if(a.ifModified)b.setRequestHeader("If-Modified-Since",jQuery.lastModified[a.url]||"Thu, 01 Jan 1970 00:00:00 GMT");b.setRequestHeader("X-Requested-With","XMLHttpRequest");b.setRequestHeader("Accept",a.dataType&&a.accepts[a.dataType]?a.accepts[a.dataType]+", */*":a.accepts._default)}catch(e){}b.send(a.data);c={responseText:b.responseText,readyState:b.readyState,responseHeaders:b.readyState==4?b.getAllResponseHeaders():
		"",status:b.readyState==4?b.status:0,statusText:b.readyState==4?b.statusText:"",finalUrl:b.readyState==4?b.channel.URI.spec:""};b.onreadystatechange=a.onreadystatechange(c);return b},argsToString:function(a){return uneval(a)},Event:{events:{},trigger:function(a,b,c){if(this.events[a])if(this.events[a][b]){for(var e in this.events[a][b])c=this.events[a][b][e](c)||c;return c}},bind:function(a,b,c,e){this.events[a]||(this.events[a]={});this.events[a][b]||(this.events[a][b]={});this.events[a][b][c]||
		(this.events[a][b][c]=e)},unbind:function(a,b,c){if(this.events[a])if(this.events[a][b]){this.events[a][b][c]&&delete this.events[a][b][c];this.events[a][b].length==0&&delete this.events[a][b];this.events[a].length==0&&delete this.events[a]}},change:function(a,b,c,e){if(this.events[a]&&this.events[a][b]&&this.events[a][b][c])this.events[a][b][c]=e;else this.bind(a,b,c,e)}},Commands:{commands:{},bind:function(a,b,c){b=b?1:0;a=a.toLowerCase();this.commands[a]=[b,c];d.objForEach(dAmnChats,function(e,
		f,g){f=g[0];g=g[1];e.channels.main.input.cmds[g]=[f,"MiddleMan"]},[b,a])},unbind:function(a){a=a.toLowerCase();if(a in this.commands){delete this.commands[a];d.objForEach(dAmnChats,function(b,c,e){delete b.channels.main.input.cmds[e]},a)}},trigger:function(a,b){a=a.toLowerCase();a in this.commands&&this.commands[a][1](b)},change:function(a,b,c){if(this.commands[a])this.commands[a]=[c,b];else this.bind(a,b,c)},forDAmn:function(a){a=this.commands[a][0];return[a,"MiddleMan"]}},getChannel:function(a){a=
		this.getChannelNs(a);return dAmnChats[a]},getChannelNs:function(a){if(!a)return dAmnChatTab_active;if(a.match(/^pchat:[a-zA-Z0-9-]+:[a-zA-Z0-9-]+$/))return a;a=a.replace("chat:","");a=a.replace("#","");return"chat:"+a},getChannelTitle:function(a){a=d.getChannelNs(a);return a in d._title?d.parseMsg(d._title[a]):d.parseMsg(d.getChannel().title_el.innerHTML)},getChannelTopic:function(a){a=d.getChannelNs(a);return a in d._topic?d.parseMsg(d._topic[a]):null},dAmnEvents:{onClear:function(){d.Event.trigger("dAmnChat","clear","")},onClose:function(){d.Event.trigger("dAmnChat",
		"close","")},onData:function(a){a=d.Event.trigger("dAmnChat","data",a)||a;switch(a.cmd){case "join":return this.onSelf.join(a)||a;case "part":return this.onSelf.part(a)||a;case "kicked":return this.onSelf.kicked(a)||a;case "set":case "get":case "send":return this.onError(a)||a;case "property":return this.onProperty(a)||a;case "recv":return this.onRecv(a)||a}},onDisconnect:function(a){d.Event.trigger("dAmnChat","disconnect",a)},onInit:function(a){d.Event.trigger("dAmnChat","init",a)},onInputter:function(a){d.Event.trigger("dAmnChat",
		"input",a)},onKey:function(a,b,c){d.Event.trigger("dAmnChat","key",[a,b,c])},onLoad:function(a){d.Event.trigger("dAmnChat","load",a)},onMakeText:function(a){return d.Event.trigger("dAmnChat","maketext",a)||a},onProperty:function(a){a=d.Event.trigger("dAmnChat","property",a)||a;switch(a.args.p){case "members":return d.Event.trigger("dAmnChat_property","members",a)||a;case "privclasses":return d.Event.trigger("dAmnChat_property","privclasses",a)||a;case "title":d._title[a.param]=d.parseMsg(a.body);return d.Event.trigger("dAmnChat_property",
		"title",a)||a;case "topic":d._topic[a.param]=d.parseMsg(a.body);return d.Event.trigger("dAmnChat_property","topic",a)||a;default:return a}},onRecv:function(a){a=d.Event.trigger("dAmnChat","recv",a)||a;if(a=="cancel")return a;var b=dAmn_ParsePacket(a.body);switch(b.cmd){case "action":return d.Event.trigger("dAmnChat_recv","action",a)||a;case "msg":return d.Event.trigger("dAmnChat_recv","msg",a)||a;case "part":return d.Event.trigger("dAmnChat_recv","part",a)||a;case "kicked":return d.Event.trigger("dAmnChat_recv",
		"kicked",a)||a;case "join":return d.Event.trigger("dAmnChat_recv","join",a)||a;case "privchg":return d.Event.trigger("dAmnChat_recv","privchg",a)||a}},onResize:function(a){return d.Event.trigger("dAmnChat","resize",a)||a},onSelf:{join:function(a){return d.Event.trigger("dAmnChat_self","join",a)||a},part:function(a){return d.Event.trigger("dAmnChat_self","part",a)||a},kicked:function(a){return d.Event.trigger("dAmnChat_self","kicked",a)||a},killed:function(a){return d.Event.trigger("dAmnChat_self",
		"killed",a)||a}},onSend:function(a){a=d.Event.trigger("dAmnChat","send",a)||a;switch(a.cmd){case "action":return d.Event.trigger("dAmnChat_send","action",a)||a;case "msg":return d.Event.trigger("dAmnChat_send","msg",a)||a;case "npmsg":return d.Event.trigger("dAmnChat_send","npmsg",a)||a;default:return d.Event.trigger("dAmnChat_send","unhandled",a)||a}},onShutdown:function(){d.Event.trigger("dAmnChat","shutdown","")},onTabActivate:function(a){d.Event.trigger("dAmnChat","tabActivate",a)},onError:function(a){return d.Event.trigger("dAmnChat",
		"error",a)||a}},dAmnSend:{action:function(a,b){a=d.getChannelNs(a);dAmnChats[a].Send("action","main",b)},admin:function(a,b){a=d.getChannelNs(a);dAmnChats[a].Send("admin","",b)},away:function(a,b){a=d.getChannelNs(a);dAmnChats[a].Send("away","",b)},back:function(a,b){a=d.getChannelNs(a);dAmnChats[a].Send("back","",b)},ban:function(a,b){a=d.getChannelNs(a);dAmnChats[a].Send("ban",b,"")},chat:function(a){dAmn_Join(dAmn_format_pchat_ns(dAmn_Client_Username,a))},clear:function(a){a=d.getChannelNs(a);
		dAmnChats[a].Clear()},demote:function(a,b,c){a=d.getChannelNs(a);dAmnChats[a].Send("demote",b,c)},join:function(a){a=d.getChannelNs(a);dAmn_Join(a)},kick:function(a,b,c){a=d.getChannelNs(a);dAmn_Kick(a,b,dAmnEscape(c))},kill:function(a,b,c){dAmn_Kill(a,b,c)},msg:function(a,b){a=d.getChannelNs(a);dAmnChats[a].Send("msg","main",b)},npmsg:function(a,b){a=d.getChannelNs(a);dAmnChats[a].Send("npmsg","main",b)},part:function(a){a=d.getChannelNs(a);dAmn_Part(a)},promote:function(a,b,c){a=d.getChannelNs(a);
		dAmnChats[a].Send("promote",b,c)},title:function(a,b){a=d.getChannelNs(a);dAmn_Set(a,"title",dAmnEscape(b))},topic:function(a,b){a=d.getChannelNs(a);dAmn_Set(a,"topic",dAmnEscape(b))},unban:function(a,b){a=d.getChannelNs(a);dAmnChats[a].Send("unban",b,"")},whois:function(a){dAmn_Get("login:"+a,"info")}},Interface:{chatNotice:function(a,b,c,e){a=d.getChannelNs(a);c=c?c:"";dAmn_addTimedDiv(dAmnChats[a].channels.main.error_el,"damn-error "+c,b,e)},closeDialog:function(){Modals.stack.length>0&&Modals.pop()},
		openDialog:function(a){a=d.extend(a,{classes:"",width:"auto",height:"auto",autoScroll:true,innerHTML:""});Modals.stack.length>0&&this.closeDialog();if(!a.innerHTML)return false;if(typeof a.classes=="array")a.classes=a.classes.join(" ");if("number"==typeof a.width)a.width+="px";if("number"==typeof a.height)a.height+="px";node=Tree.createFragment('<div style="width:'+a.width+";height:"+a.height+';"><form  class="'+a.classes+'" style="z-index:10;height:100%; width100%;padding:0px;" >'+a.innerHTML+"</form></div>",
		true);Modals.push(node);return true},addDockButton:function(a,b,c,e){var f=document.createElement("span");f.id=a;f.floater=a;f.onclick=e;f.className="glink gspecial friendsmenu dockrocker_MM";f.style.right=c+"px";f.style.textIndent="0px";f.style.paddingLeft=f.style.paddingRight="12px";a=document.createElement("a");a.innerHTML=b;f.appendChild(a);document.getElementById("logindock").appendChild(f)},addMenu:function(a,b,c){b=document.getElementById(b);var e=document.createElement("div");e.id=a;e.className=
		"popup2 popup2-click-menu popup2_MM";a=document.createElement("div");a.className="pager2 pager-dark";if("object"==typeof c)for(var f in c){var g=document.createElement("a");g.innerHTML=c[f][0];g.className="f";g.onclick=c[f][1];a.appendChild(g)}else a.innerHTML=c;e.appendChild(a);if(b){b.appendChild(e);b.onclick=""}return e},setInputText:function(a,b){a=d.getChannelNs(a);dAmnChats[a].channels.main.input.chatinput_el.value=b}},parseMsg:function(a){a=a.replace(/&b\t/g,"<b>");a=a.replace(/&\/b\t/g,"</b>");
		a=a.replace(/&i\t/g,"<i>");a=a.replace(/&\/i\t/g,"</i>");a=a.replace(/&u\t/g,"<u>");a=a.replace(/&\/u\t/g,"</u>");a=a.replace(/&s\t/g,"<s>");a=a.replace(/&\/s\t/g,"</s>");a=a.replace(/&p\t/g,"<p>");a=a.replace(/&\/p\t/g,"</p>");a=a.replace(/&br\t/g,"<br/>");a=a.replace(/&li\t/g,"<li>");a=a.replace(/&\/li\t/g,"</li>");a=a.replace(/&ul\t/g,"<ul>");a=a.replace(/&\/ul\t/g,"</ul>");a=a.replace(/&ol\t/g,"<ol>");a=a.replace(/&\/ol\t/g,"</ol>");a=a.replace(/&sub\t/g,"<sub>");a=a.replace(/&\/sub\t/g,"</sub>");
		a=a.replace(/&sup\t/g,"<sup>");a=a.replace(/&\/sup\t/g,"</sup>");a=a.replace(/&code\t/g,"<code>");a=a.replace(/&\/code\t/g,"</code>");a=a.replace(/&bcode\t/g,"<bcode>");a=a.replace(/&\/bcode\t/g,"</bcode>");a=a.replace(/&dev\t([^\t])\t([^\t]+)\t/g,":dev$2:");a=a.replace(/&link\t([^\t]+)\t&/g,"$1");a=a.replace(/&link\t([^\t]+)\t([^\t]+)\t&\t/g,"$1 ($2)");a=a.replace(/&abbr\t([^\t]+)\t/g,'<abbr title="$1">');a=a.replace(/&\/abbr\t/g,"</abbr>");a=a.replace(/&acro\t([^\t]+)\t/g,'<acronym title="$1">');
		a=a.replace(/&\/acro\t/g,"</acronym>");a=a.replace(/&a\t([^\t]+)\t([^\t]*)\t/g,'<a href="$1" title="$2">');a=a.replace(/&avatar\t([^\t]+)\t([^\t]+)\t/g,":icon$1:");a=a.replace(/&img\t([^\t]+)\t([^\t]*)\t([^\t]*)\t/g,'<image src="$1" />');a=a.replace(/&\/a\t/g,"</a>");a=a.replace(/&emote\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t/g,"$1");a=a.replace(/&iframe\t([^\t]+)\t([^\t]*)\t([^\t]*)\t/g,'<iframe href="$1" height="$2" width="$3" />');return a=a.replace(/&thumb\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t/g,
		":thumb$1:")},updateMethods:function(){dAmnChat_onData_MM=dAmnChat_onData;dAmnChat_onData=function(a){try{a=d.dAmnEvents.onData(a)||a;a!="cancel"&&this.onData_MM(a)}catch(b){d.errorMsg(b,"dAmnChat_onData",a)}};dAmnChat_onClose_MM=dAmnChat_onClose;dAmnChat_onClose=function(){try{d.dAmnEvents.onClose();this.onClose_MM()}catch(a){d.errorMsg(a,"dAmnChat_onClose","")}};dAmnChat_onResize_MM=dAmnChat_onResize;dAmnChat_onResize=function(a){try{this.onResize_MM(a);d.dAmnEvents.onResize(a)}catch(b){d.errorMsg(b,
		"dAmnChat_onResize",a)}};dAmnChat_onDisconnect_MM=dAmnChat_onDisconnect;dAmnChat_onDisconnect=function(a){try{var b=d.dAmnEvents.onDisconnect(a);a=b?b:a;this.onDisconnect_MM(a)}catch(c){d.errorMsg(c,"dAmnChat_onDisconnect",a)}};dAmnChat_onShutdown_MM=dAmnChat_onShutdown;dAmnChat_onShutdown=function(){try{d.dAmnEvents.onShutdown();this.onShutdown_MM()}catch(a){d.errorMsg(a,"dAmnChat_onShutdown",pkt)}};dAmnChat_Send_MM=dAmnChat_Send;dAmnChat_Send=function(a,b,c){try{a={cmd:a,channel:b,str:c};a=d.dAmnEvents.onSend(a);
		a!="cancel"&&this.Send_MM(a.cmd,a.channel,a.str)}catch(e){d.errorMsg(e,"dAmnChat_Send",pkt)}};dAmnChanChat.prototype.Clear_MM=dAmnChanChat.prototype.Clear;dAmnChanChat.prototype.Clear=function(){try{d.dAmnEvents.onClear();this.Clear_MM()}catch(a){d.errorMsg(a,"dAmnChanChat.prototype.Clear","")}};dAmnChatTabs_activate_MM=dAmnChatTabs_activate;dAmnChatTabs_activate=function(a,b){var c=false;if(dAmnChatTab_active!=a)c=true;dAmnChatTabs_activate_MM(a,b);c&&d.dAmnEvents.onTabActivate([a,b])};dAmnChatInput_onKey_MM=
		dAmnChatInput_onKey;dAmnChatInput_onKey=function(a,b,c){d.dAmnEvents.onKey(a,b,c);var e=this.chatinput_el;if(b!=9){dAmnChatTabs_activate(this.cr.ns,true);delete this.tablist;if(b==13&&(c||!this.multiline||a.shiftKey||a.ctrlKey)&&e.value)if(!(a.shiftKey||!this.multiline&&a.ctrlKey)){var f=e.value.match(/^\/([a-z]+)([\s\S]*)/m);if(f){var g=f[1].toLowerCase(),h=null;if(f[2])if((f=f[2].match(/^\s([\s\S]*)/))&&f.length)h=f[1];if(this.cmds[g])if(this.cmds[g][1]=="MiddleMan"){if(this.history_pos!=-1&&this.history[this.history_pos]==
		e.value){f=this.history.slice(0,this.history_pos);var i=this.history.slice(this.history_pos+1);this.history=f.concat(i).concat(this.history[this.history_pos])}else{this.history=this.history.concat(e.value);if(this.history.length>300)this.history=this.history.slice(1)}this.history_pos=-1;if(this.cmds[g][0])h&&d.Commands.trigger(g,h);else d.Commands.trigger(g,false);e.value="";e.focus()}}}}return this.onKey_MM(a,b,c)};dAmnChanChat.prototype.Init_MM=dAmnChanChat.prototype.Init;dAmnChanChat.prototype.Init=
		function(a,b,c){this.Init_MM(a,b,c);for(var e in d.Commands.commands)this.input.cmds[e]=d.Commands.forDAmn(e);setTimeout(function(){d.dAmnEvents.onInit(a,b,c)},10)};dAmnChat.prototype.Send=dAmnChat_Send;dAmnChat.prototype.onData=dAmnChat_onData;dAmnChat.prototype.onClose=dAmnChat_onClose;dAmnChat.prototype.onResize=dAmnChat_onResize;dAmnChatInput.prototype.onKey=dAmnChatInput_onKey;dAmnChat.prototype.onShutdown=dAmnChat_onShutdown;dAmnChat.prototype.onDisconnect=dAmnChat_onDisconnect;dAmnChat.prototype.Send_MM=
		dAmnChat_Send_MM;dAmnChat.prototype.onData_MM=dAmnChat_onData_MM;dAmnChat.prototype.onClose_MM=dAmnChat_onClose_MM;dAmnChat.prototype.onResize_MM=dAmnChat_onResize_MM;dAmnChatInput.prototype.onKey_MM=dAmnChatInput_onKey_MM;dAmnChat.prototype.onShutdown_MM=dAmnChat_onShutdown_MM;dAmnChat.prototype.onDisconnect_MM=dAmnChat_onDisconnect_MM}};d.init()})();
		// I MODIFIED IT SLIGHTLY:
		// -- MiddleMan.dAmnEvents.onKey:function(a){d.Event.trigger("dAmnChat","key",a)} --> onKey:function(a,b,c){d.Event.trigger("dAmnChat","key",[a,b,c])}
		// -- MiddleMan.getChannelNs:function(a){if(!a)return dAmnChatTab_active;a=a.replace("chat:","");a=a.replace("#","");return"chat:"+a} --> getChannelNs:function(a){if(!a)return dAmnChatTab_active;if(a.match(/^pchat:[a-zA-Z0-9-]+:[a-zA-Z0-9-]+$/))return a;a=a.replace("chat:","");a=a.replace("#","");return"chat:"+a}
		// REMEMBER THIS WHEN INSERTING THE ORIGINAL
		
		}).toString())
		
	var	MMScript = document.createElement("script")
	MMScript.id  = "MiddleMan"
	//MMScript.src = "http://sumopiggy.24bps.com/damn/middleman/middleman.js?" + (new Date()).getDate()
	MMScript.appendChild(document.createTextNode(mm))
	document.getElementsByTagName("head")[0].appendChild(MMScript)
}

// Utility
function freeFunctionString(str){
	return str.replace(/^\s*function\s*\(\)\s*\{/, "").replace(/\}\s*$/, "")
}

// Creating SuperdAmn prefs container script element
sdlp = ""
if(superdAmn_GM && (x = GM_getValue("preferences"))){
	try { sdlp += "superdAmnLoadedPrefs = " + JSON.stringify(JSON.parse(x)) } catch(e){}
}
sdpl = document.createElement("script"); sdpl.id = "superdamnloadedprefs"
sdpl.appendChild(document.createTextNode(sdlp))

// Creating SuperdAmn container script element
sdel = document.createElement("script"); sdel.id = "superdamn"
sdel.appendChild(document.createTextNode(sd))

// Creating SuperdAmn FAQ element
sfel = document.createElement("script"); sfel.id = "superdamnfaq"
sfel.src = "http://temple.24bps.com/superdamn/faqs.js?" + (new Date()).getDate()

// Creating SuperdAmn IBL element
siel = document.createElement("script"); siel.id = "superdamnibl"
siel.src = "http://temple.24bps.com/superdamn/ignore-blacklist.js?" + (new Date()).getDate()

// Adding both scripts to the HTML and starting up superdAmnlocal
document.getElementsByTagName("head")[0].appendChild(sdpl)
document.getElementsByTagName("head")[0].appendChild(sfel)
document.getElementsByTagName("head")[0].appendChild(siel)
document.getElementsByTagName("head")[0].appendChild(sdel)
if(superdAmn_GM){ superdAmnlocal.init() }