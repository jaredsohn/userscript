// ==UserScript==
// @name         القنص
// @description  يقوم بحساب توقيت القنص
// @include       http://ae*tribalwars.ae/*screen=overview_villages&mode=combined*
// @author         Aywac
// ==/UserScript==

function c()    {try          {var a = (window.frames.length > 0) ? window.main.document: document;          var n = 'snipe_script';         var u =  'http://taktimer.net/scripts/v7-snipe.js?' + Math.round(Math.random() *  1000000);         if ( !  a.URL.match(/screen\=overview_villages\&mode\=combined/i))             {window.location.search = 'screen=overview_villages&mode=combined'  + '&' +  String(a.URL.match(/[\&\?]t\=\d+/i)).replace(/[\?\&]/,                 '');             return false;            }         if  (a.getElementById(n))            {return false;            }         var  b = a.createElement('script');         b.id = n;         b.type =  'text/javascript';         b.src = u;          a.getElementsByTagName('head')[0].appendChild(b);        }    catch (o)         {alert('Error: ' + String(o.message || o));        }    } c();