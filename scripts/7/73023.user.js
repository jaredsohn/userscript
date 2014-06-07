// -----------------------------------------------------------------
// THIS IS AN UPDATE to BAERnado's "Wurzelimperium Wimp-Preischeck"
// The only modification is the Hungarian language support added by tjoco
//
// Wurzelimperium Wimp-Preischeck
// V. 0.91.1
// Date: 2010-04-01
//
// -----------------------------------------------------------------
//
// Dieses Script ermittelt die Preise der Pflanzen und vergleicht
// sie mit dem Angebot der Wimps.
//
// Zunächst sind die Ausgangspreise die NPC-Preise, doch mit
// Abrufen des Marktplatzes wird der Marktpreis verwendet.
// Dazu wird der Mittelwert der ersten drei Angebote einer Pflanze
// ermittelt und gespeichert.
//
// Werden die NPC-Preise verwendet, so errechnet sich der Bezugs-
// preis wie folgt: (NPCPreis - 0,01)*0,9
// Dies entspricht dem Reingewinn, würde man die Pflanzen für
// 0,01 wT weniger als dem NPC-Preis am Markt verkaufen.
//
// Werden die Marktpreise verwendet, so wird lediglich die Markt-
// gebühr abgezogen. Demnach ist der Bezugspreis: Marktpreis*0,9
//
// Zusätzlich ist das Script in der Lage Daten an einen Sammel-
// server zu senden und auch komplette serverbezogene Daten
// vom Sammelserver zu beziehen. Die Aktualisierung erfolgt
// nach Betätigung des Updatelinks durch den User.
//
// Es werden keine User-relevanten Daten versendet!
//
// -----------------------------------------------------------------
//
// Vorgehensweise:
//
// 1. Script installieren
// 2. Marktplatz Produktübersicht aufrufen
// 3. Hilfe (Register Pflanzen) aufrufen
// 4. Pflanzen am Markt aufrufen (1. Seite jeder Pflanze)
// 5. Im Wimp-Verkaufsfenster bei Bedarf grünes Updateicon anklicken
//
// -----------------------------------------------------------------
// ==UserScript==
// @name           Kertbirodalom - Arkalkulator
// @description    Vásárlói árak összehasonlítása a piaci és bolti árakkal
// @namespace      http://userscripts.org/scripts/source/73023.user.js
// @include        http://s*.wurzelimperium.de/*
// @include        http://s*.zieloneimperium.pl/*
// @include        http://s*.sadowajaimperija.ru/*
// @include        http://s*.molehillempire.*.php*
// @include        http://s*.kertbirodalom.hu/*
// ==/UserScript==

/************************************************************
***                                                       ***
***                       Ladeschutz                      ***
***                                                       ***
*** Von nun an wird das Script auf jeder Seite geladen,   ***
*** doch zuvor wird geschaut, ob das Script auf dieser    ***
*** benötigt wird. Dies wird getan, damit die schnelle    ***
*** Implementierung auch auf nicht-deutschen Seiten       ***
*** gewährleistet wird.                                   ***
***                                                       ***
************************************************************/

var country, server, page, subpage;
searchSpec = /^http:\/\/[a-zA-Z]*(\d+)\.[-a-zA-Z0-9_]+\.([a-zA-Z\.]{2,5})\/(.*?)(markt|verkauf|hilfe|main|overview|garten_map)\.php/;
sitedata = searchSpec.exec(window.location.href);
if(sitedata != null) {
  country = sitedata[2];
  server  = parseInt(sitedata[1], 10);
  page    = sitedata[3];
  subpage = sitedata[4];

// Notiz: Die Einrückung erfolgt hier nicht

/************************************************************
***                                                       ***
***                  Typen-Definitionen                   ***
***                                                       ***
*** JSON: Benötigt für Datentransfer und Speicherung      ***
*** Number: Einheitliche Geld-Formatierung                ***
***                                                       ***
************************************************************/

Array.prototype.______array='______array';var JSON={org:'http://www.JSON.org',copyright:'(c)2005 JSON.org',license:'http://www.crockford.com/JSON/license.html',stringify:function(arg){var c,i,l,s='',v;switch(typeof arg){case'object':if(arg){if(arg.______array=='______array'){for(i=0;i<arg.length;++i){v=this.stringify(arg[i]);if(s){s+=','}s+=v}return'['+s+']'}else if(typeof arg.toString!='undefined'){for(i in arg){v=arg[i];if(typeof v!='undefined'&&typeof v!='function'){v=this.stringify(v);if(s){s+=','}s+=this.stringify(i)+':'+v}}return'{'+s+'}'}}return'null';case'number':return isFinite(arg)?String(arg):'null';case'string':l=arg.length;s='"';for(i=0;i<l;i+=1){c=arg.charAt(i);if(c>=' '){if(c=='\\'||c=='"'){s+='\\'}s+=c}else{switch(c){case'\b':s+='\\b';break;case'\f':s+='\\f';break;case'\n':s+='\\n';break;case'\r':s+='\\r';break;case'\t':s+='\\t';break;default:c=c.charCodeAt();s+='\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16)}}}return s+'"';case'boolean':return String(arg);default:return'null'}},parse:function(text){var at=0;var ch=' ';function error(m){throw{name:'JSONError',message:m,at:at-1,text:text}}function next(){ch=text.charAt(at);at+=1;return ch}function white(){while(ch!==''&&ch<=' '){next()}}function str(){var i,s='',t,u;if(ch=='"'){outer:while(next()){if(ch=='"'){next();return s}else if(ch=='\\'){switch(next()){case'b':s+='\b';break;case'f':s+='\f';break;case'n':s+='\n';break;case'r':s+='\r';break;case't':s+='\t';break;case'u':u=0;for(i=0;i<4;i+=1){t=parseInt(next(),16);if(!isFinite(t)){break outer}u=u*16+t}s+=String.fromCharCode(u);break;default:s+=ch}}else{s+=ch}}}error("Bad string")}function arr(){var a=[];if(ch=='['){next();white();if(ch==']'){next();return a}while(ch){a.push(val());white();if(ch==']'){next();return a}else if(ch!=','){break}next();white()}}error("Bad array")}function obj(){var k,o={};if(ch=='{'){next();white();if(ch=='}'){next();return o}while(ch){k=str();white();if(ch!=':'){break}next();o[k]=val();white();if(ch=='}'){next();return o}else if(ch!=','){break}next();white()}}error("Bad object")}function num(){var n='',v;if(ch=='-'){n='-';next()}while(ch>='0'&&ch<='9'){n+=ch;next()}if(ch=='.'){n+='.';while(next()&&ch>='0'&&ch<='9'){n+=ch}}if(ch=='e'||ch=='E'){n+='e';next();if(ch=='-'||ch=='+'){n+=ch;next()}while(ch>='0'&&ch<='9'){n+=ch;next()}}v=+n;if(!isFinite(v)){error("Bad number")}else{return v}}function word(){switch(ch){case't':if(next()=='r'&&next()=='u'&&next()=='e'){next();return true}break;case'f':if(next()=='a'&&next()=='l'&&next()=='s'&&next()=='e'){next();return false}break;case'n':if(next()=='u'&&next()=='l'&&next()=='l'){next();return null}break}error("Syntax error")}function val(){white();switch(ch){case'{':return obj();case'[':return arr();case'"':return str();case'-':return num();default:return ch>='0'&&ch<='9'?num():word()}}return val()}};Number.prototype.toMoney=function(){if(arguments.length==2){var thD=arguments[0],flD=arguments[1]}else{var thD='.',flD=','}var reply='',tmpNum;tmpNum=Math.round(this*100)/100;reply=tmpNum.toFixed(2).toString();fullNum=reply.substring(0,reply.indexOf('.'));flNum=reply.substring(reply.indexOf('.')+1,reply.length);reply='';while(fullNum.length>3){reply=thD+fullNum.substring(fullNum.length-3,fullNum.length)+reply;fullNum=fullNum.substring(0,fullNum.length-3)}reply=fullNum+reply+flD+flNum;return reply};

/************************************************************
***                                                       ***
***                         Bilder                        ***
***                                                       ***
*** Bilder benötigt für Updateanzeige und evtl. Menü      ***
*** später                                                ***
***                                                       ***
************************************************************/

updateS       = 'data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQIAIQAgAAD%2F2wBDAAEBAQEBAQEBAQEBAQECAgMCAgICAgQDAwIDBQQFBQUEBAQFBgcGBQUHBgQEBgkGBwgICAgIBQYJCgkICgcICAj%2F2wBDAQEBAQICAgQCAgQIBQQFCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAj%2FwAARCAAOAA4DAREAAhEBAxEB%2F8QAFwAAAwEAAAAAAAAAAAAAAAAAAAQGCf%2FEACMQAAEDBAICAwEAAAAAAAAAAAECAwQFBgcREiEACBMUMTL%2FxAAZAQACAwEAAAAAAAAAAAAAAAADCQIEBQb%2FxAAmEQACAQMEAQUAAwAAAAAAAAABAhEDBAUABhIhMQcTFCJBUWFx%2F9oADAMBAAIRAxEAPwDcOzMd4qgY7xhlbN0mtV2r3tdrMZhz7KmYlOpkaeyie%2FJUkhalLb%2BVsaI4hYKdEcglDbey9vUMNj8%2FuhmqVMjchQeRCpRp1lFw7kHkSy8lEEEKQQOtLFwO2MPSxlplM8S7XdYAdkKtNKiiqWI%2BxLKSOiIEEeNHsrS7Jx2jFuSPXJp%2BzseXTTZf1kpdlGQ4uM%2BG3PmL7zuxspKeIQACQQo9%2BT9bMficR8DO7LBoWV7TfiJqcyab8W5%2B5Uf9iI4%2F3J70T1Ox2PsPiZPbQ9q2uVaB9%2BUo0GeTt14iI%2FZk96lrbzPDxfQ6lhHK%2BMrYzTZNPqK5UBh6W7Bdpz5%2FssPtp5JQrolGv3feiR5zu3%2FU6jhLOptbcFil%2Fa0qhZAXZGRj5KVF%2BwDGCRHnWRht7JjrZ8DmLRLu3RuSgsyFSfPFl7gwJEaUuK47h9qLjgwokK3ceWlbtNTEo9IiIWpiAwVDaQeipSiNqWdb0ka68r5%2FO3u%2B7xadFEtra2QLSpLPFFJ8D9JJ7LGCetBzOZudy3CqqrRo0FCoizCie%2F8AST2T1P8AGv%2FZ';
updateM       = 'data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQIAIQAgAAD%2F2wBDAAEBAQEBAQEBAQEBAQECAgMCAgICAgQDAwIDBQQFBQUEBAQFBgcGBQUHBgQEBgkGBwgICAgIBQYJCgkICgcICAj%2F2wBDAQEBAQICAgQCAgQIBQQFCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAj%2FwAARCAAOAA4DAREAAhEBAxEB%2F8QAFwAAAwEAAAAAAAAAAAAAAAAAAwUGB%2F%2FEACIQAAEEAgICAwEAAAAAAAAAAAECAwQFBgcIEQASCSEiFP%2FEABoBAAEFAQAAAAAAAAAAAAAAAAQBAgMGCAn%2FxAAnEQABAwMEAAYDAAAAAAAAAAABAgMRBAUGABIhMQcyQVFhgRMiof%2FaAAwDAQACEQMRAD8AutV6N43UmjePXIzlzOyjLck23suPXxHVWDkWvosfgXMZq5lz3GiHVqdYMlkepSUBwKT%2BgFDLNutVEimYrK4FRfWAPYJCgFk8z1I%2BO9d4srznJX77csdxEIabtlMpSv1BU486ws06EBQ2gJVtUZBCiIJgwS8%2Bca1BpNvjvvzgtCl6v0dsaitP4WRIsjOeegzUsvmUZkuQSPZSC36BsAKUCFH9eJldLTsJZqrXKGXQY80kpMGZJ%2Bojv10zwBvF4vBuNgzsiprqFbe6Q3sAdRvRs%2FG2iOJB3FXoRA41nOv%2BV1ToDDr%2FAIkckeP%2BB8sdQ0t69ZU8OXayaiTSTFjp1USawkrS050lSmyk%2Fff3%2Bj4FQ39unaNBVNB5tJkSSkgnuCJ79tWXJ%2FCd%2B%2BVreXY1cHLdWPNhKyEIcS4keULbVCSU8gGevkaV55nmc%2FIpnVPVVVPgekNa4RQorcXxatacVDpYanAVJQevZx1au1LdV0T0kdfXkr7zt4eASA2htMJSOgJ%2FvydE45jlD4f0K3XVuVVTVObnXVRuWqOz6AAcJSJA5%2B%2F%2F2Q%3D%3D';
menuB         = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAMIAYwAgG2lVdQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kBGAMDA%2BFKDacAAAAIdEVYdENvbW1lbnQA9syWvwAAAuNJREFUOMtlk09oXHUQxz%2Fz%2B70%2FZnfdJjU9CSGo0KIEkhJIqtYWWk0VlIDiIYtFKZVaevAgNSgeVATxJBYPhWJA2XoxkECVrbaH9CCKui0UMaUsXUvTWpOySbrpvvf2vd94aBJSO7cZ5g%2FznfkI%2F7PTY%2BGQwjgiowKAoDiAKUE%2BHSlHv27Ml41OZSysGvEGrNeh1oQiWFQUdSmZizTLIlHc%2BX3lePtajVmfXArrns31h%2BFmzl0ViTPL8T8WWY6Uj2eWCLxNUlssYMTvr5TC%2Bj0NKqWw6pmOnlOXRaZnV9iSs%2FxwuUmcKsUHLFu7Q6432xz%2Bfp7Q7xIjXk%2BlFFYBpDIWDhnj%2FRIGDwHCqUtNXtz2IBdutJipr9Cd93lpa55CYBG5u3GWxcRJAxGGPWDc2g4VMZI65cpiwu6v%2Fsaprmtz%2FLcGnoFXnijy5mAXngkw1lfnknGDyKg1gczOx%2ByfnKPWyvP7zzOoKs450jRFVfnsow9wquyfnGN2IcFKIMCoJ0Crbbi2HPH%2Brm563%2FicgeGdfHNyksPHlrBGOHakk7ff%2B5Cj1bMcGbrO2VqThwsGK6siBhb2PpLn4s2EwZ17AJj4KcW5jLazTPwYIyIUtj0NwJ5HCwR29QqqoJqCCFtyhqX5GwBssnPYzYPYzj6Kcjdmbt9c18VpunZGnWolkZ6pNdnRk%2BPriROoKuUvDvHuc5c4%2BuxffPvlIW79M8ed2XOoKmdqTaJ2rAJT9rU%2Bv25NdjAj5J3T86TXLnKrGfPU7r3serKPZ3b00Wws8NarzxO2%2FuWTmQVeeMynO5eIIK%2FL2iMZ4%2Fcb0yknqst89%2BcyqbuXEd%2FCy48XOTCQx2UNRbkwcjLavs5CpRTWjXg9vlcUawNSB1caCYLQ2%2BVjBbLsDu30tip6dV857r0fplJYFWTAGF%2BNBCLGA1WcpjgXq9NUBDk%2FUo7uhwlglbLhzCXT7bRJkiySpEuk2Qqq6bSIDG8sBvgPA2JAyp93NCUAAAAASUVORK5CYII%3D';
symb_contract = 'data:image/gif;base64,R0lGODlhBwAHAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgICAgMDAwP8AAAD%2FAP%2F%2FAAAA%2F%2F8A%2FwD%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA%2FwAzAAAzMwAzZgAzmQAzzAAz%2FwBmAABmMwBmZgBmmQBmzABm%2FwCZAACZMwCZZgCZmQCZzACZ%2FwDMAADMMwDMZgDMmQDMzADM%2FwD%2FAAD%2FMwD%2FZgD%2FmQD%2FzAD%2F%2FzMAADMAMzMAZjMAmTMAzDMA%2FzMzADMzMzMzZjMzmTMzzDMz%2FzNmADNmMzNmZjNmmTNmzDNm%2FzOZADOZMzOZZjOZmTOZzDOZ%2FzPMADPMMzPMZjPMmTPMzDPM%2FzP%2FADP%2FMzP%2FZjP%2FmTP%2FzDP%2F%2F2YAAGYAM2YAZmYAmWYAzGYA%2F2YzAGYzM2YzZmYzmWYzzGYz%2F2ZmAGZmM2ZmZmZmmWZmzGZm%2F2aZAGaZM2aZZmaZmWaZzGaZ%2F2bMAGbMM2bMZmbMmWbMzGbM%2F2b%2FAGb%2FM2b%2FZmb%2FmWb%2FzGb%2F%2F5kAAJkAM5kAZpkAmZkAzJkA%2F5kzAJkzM5kzZpkzmZkzzJkz%2F5lmAJlmM5lmZplmmZlmzJlm%2F5mZAJmZM5mZZpmZmZmZzJmZ%2F5nMAJnMM5nMZpnMmZnMzJnM%2F5n%2FAJn%2FM5n%2FZpn%2FmZn%2FzJn%2F%2F8wAAMwAM8wAZswAmcwAzMwA%2F8wzAMwzM8wzZswzmcwzzMwz%2F8xmAMxmM8xmZsxmmcxmzMxm%2F8yZAMyZM8yZZsyZmcyZzMyZ%2F8zMAMzMM8zMZszMmczMzMzM%2F8z%2FAMz%2FM8z%2FZsz%2Fmcz%2FzMz%2F%2F%2F8AAP8AM%2F8AZv8Amf8AzP8A%2F%2F8zAP8zM%2F8zZv8zmf8zzP8z%2F%2F9mAP9mM%2F9mZv9mmf9mzP9m%2F%2F%2BZAP%2BZM%2F%2BZZv%2BZmf%2BZzP%2BZ%2F%2F%2FMAP%2FMM%2F%2FMZv%2FMmf%2FMzP%2FM%2F%2F%2F%2FAP%2F%2FM%2F%2F%2FZv%2F%2Fmf%2F%2FzP%2F%2F%2FyH5BAEAABAALAAAAAAHAAcAAAgeAP9x4%2Fav4D8%2BphAqNKWvYcOEDhsijKgPYsSFCwMCADs%3D';
symb_market   = 'data:image/gif;base64,R0lGODlhBwAHAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgICAgMDAwP8AAAD%2FAP%2F%2FAAAA%2F%2F8A%2FwD%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA%2FwAzAAAzMwAzZgAzmQAzzAAz%2FwBmAABmMwBmZgBmmQBmzABm%2FwCZAACZMwCZZgCZmQCZzACZ%2FwDMAADMMwDMZgDMmQDMzADM%2FwD%2FAAD%2FMwD%2FZgD%2FmQD%2FzAD%2F%2FzMAADMAMzMAZjMAmTMAzDMA%2FzMzADMzMzMzZjMzmTMzzDMz%2FzNmADNmMzNmZjNmmTNmzDNm%2FzOZADOZMzOZZjOZmTOZzDOZ%2FzPMADPMMzPMZjPMmTPMzDPM%2FzP%2FADP%2FMzP%2FZjP%2FmTP%2FzDP%2F%2F2YAAGYAM2YAZmYAmWYAzGYA%2F2YzAGYzM2YzZmYzmWYzzGYz%2F2ZmAGZmM2ZmZmZmmWZmzGZm%2F2aZAGaZM2aZZmaZmWaZzGaZ%2F2bMAGbMM2bMZmbMmWbMzGbM%2F2b%2FAGb%2FM2b%2FZmb%2FmWb%2FzGb%2F%2F5kAAJkAM5kAZpkAmZkAzJkA%2F5kzAJkzM5kzZpkzmZkzzJkz%2F5lmAJlmM5lmZplmmZlmzJlm%2F5mZAJmZM5mZZpmZmZmZzJmZ%2F5nMAJnMM5nMZpnMmZnMzJnM%2F5n%2FAJn%2FM5n%2FZpn%2FmZn%2FzJn%2F%2F8wAAMwAM8wAZswAmcwAzMwA%2F8wzAMwzM8wzZswzmcwzzMwz%2F8xmAMxmM8xmZsxmmcxmzMxm%2F8yZAMyZM8yZZsyZmcyZzMyZ%2F8zMAMzMM8zMZszMmczMzMzM%2F8z%2FAMz%2FM8z%2FZsz%2Fmcz%2FzMz%2F%2F%2F8AAP8AM%2F8AZv8Amf8AzP8A%2F%2F8zAP8zM%2F8zZv8zmf8zzP8z%2F%2F9mAP9mM%2F9mZv9mmf9mzP9m%2F%2F%2BZAP%2BZM%2F%2BZZv%2BZmf%2BZzP%2BZ%2F%2F%2FMAP%2FMM%2F%2FMZv%2FMmf%2FMzP%2FM%2F%2F%2F%2FAP%2F%2FM%2F%2F%2FZv%2F%2Fmf%2F%2FzP%2F%2F%2FywAAAAABwAHAAAIIwAfPBhAUODABAkWDBi4IGFCgg0TKhzQsOLCAQgVGiS48EFAADs%3D';

/************************************************************
***                                                       ***
***                       Locales                         ***
***                                                       ***
************************************************************/

var locales = {
    "de" : {
      "updatenotice"              : 'Update vorhanden!\nBitte herunterladen und installieren! Der Downloadlink befindet sich im\nWIMPer-Menu.',
      "updatereloadnotice"        : 'Nach dem Update bitte die Seite neu laden.\nDanke.',
      "wimpnotallplantsknown"     : 'Nicht alle PflanzenIDs bekannt.\nBitte den Marktplatz aufsuchen und die ProduktÃ¼bersicht aufrufen.',
      "wimpnotallcostsknown"      : 'Nicht alle NPC-Preise bekannt.\nBitte die PflanzenÃ¼bersicht in der Hilfe aufrufen.',
      "market"                    : 'Markt',
      "questiongetdbupdate"       : 'Daten von der Sammelstelle holen?',
      "dbupdatemarketrecommend"   : 'Es werden neuere Daten vom Marktplatz empfohlen!',
      "comesupto"                 : 'Entspricht',
      "ofthecosts"                : 'der Kosten.',
      "costs"                     : 'Kosten',
      "moneyunit"                 : 'wT',
      "contractcutplants"         : 'Warnung: Gegenst&auml;nde abgek&uuml;rzt!!',
      "missing"                   : 'Fehlt',
      "allonstock"                : 'Alles auf Lager',
      "helpnotallplantsknown"     : 'Nicht alle PflanzenIDs bekannt.\nBitte den Marktplatz aufsuchen und die ProduktÃ¼bersicht aufrufen.\nHast du das schon getan, ignoriere diese Meldung.',
      "updatelinktitle"           : 'WIMPer Update liegt vor! Hier herunterladen.',
      "questionshowupdatenotice"  : '(Bei Datenempfang/-versand evtl. Updateinfos anzeigen?)',
      "costssent"                 : 'WIMPer: Preis gesendet. Danke!',
      "sendfailed"                : 'WIMPer: Fehler bei der &Uuml;bertragung!',
      "erroroccured"              : 'Ein Fehler ist aufgetreten!',
      "helpwelcome"               : 'Herzlich Willkommen in der Hilfe zu WIMPer. Hier erf&auml;hrst du alles, was du im Umgang mit WIMPer wissen musst.',
      "helpbeginning"             : '<b>Aller Anfang...</b><br>... ist leicht. WIMPer ist so gebaut, dass es auch mit neuen, noch unbekannten Pflanzen arbeiten kann. Deshalb ist es notwendig anfangs einmalig die Produkt&uuml;bersicht auf dem Marktplatz abzurufen, damit WIMPer alle Pflanzen kennenlernt. <br>Anschlie&szlig;end muss WIMPer noch die NPC-Preise f&uuml;r die Pflanzen in Erfahrung bringen. Dies geschieht, indem du hier in der Hilfe die <a href="hilfe.php?item=2">Pflanzenseite</a> abrufst.<br>Diese beiden Schritte sind nur dann erneut notwendig, sollten neue Pflanzen in das Spiel eingef&uuml;gt werden.',
      "helpmarketplaceoverview"   : '<b>Marktplatz - Produkt&uuml;bersicht</b><br>Hier werden dir Pflanzen, die du bereits einmal abgerufen hast, deren Daten in deiner Datenbank aber momentan veraltet sind, gelb angezeigt. (Diese Option kann in der Konfiguration deaktiviert werden.)',
      "helpmarketplace"           : '<b>Marktplatz</b><br>Wenn du eine Pflanze im Marktplatz abrufst, wird der Mittelwert der drei g&uuml;nstigsten Angebote gebildet und in deiner Datenbank gespeichert. Zudem werden diese Daten an eine Sammelstelle gesendet, damit andere User nicht immer auf den Marktplatz gehen m&uuml;ssen um die neuesten Preise zu erfahren. Genauso profitierst du von den Preisen von den anderen. Pro Pflanze k&ouml;nnen die Daten nur einmal alle 10 Minuten gesendet werden um den Infoserver nicht zu &uuml;berlasten. (Diese Option kann in der Konfiguration deaktiviert werden.)',
      "helpwimpinfo"              : '<b>Wimp-Info</b><br>Um schneller erkennen zu k&ouml;nnen, ob alle Pflanzen f&uuml;r den Verkauf an einen Wimp vorhanden sind, wird bei Mausber&uuml;hrung mit dem Wimp nicht nur angezeigt, was er alles kaufen m&ouml;chte, sondern auch, ob du schon alles zusammen hast, oder ob noch etwas fehlt. Dabei werden neuerdings auch die Pflanzen mit einbezogen, die du dir selbst als <b>Vertrag</b> zugesendet hast.<br>Siehst du vor einer ben&ouml;tigten Pflanze das Symbol <img id="wimper_info_contract">, bedeutet das, dass du diese Pflanze noch in einem Vertrag hast, den du aufl&ouml;sen solltest. Zudem zeigt dir das Symbol <img id="wimper_info_market">, dass du noch weitere dieser Pflanzen kaufen, oder anbauen musst.<br><b>-&gt;WICHTIG!&lt;-</b><br>Vertr&auml;ge d&uuml;rfen dabei nicht zu viele Pflanzen enthalten. Enth&auml;lt ein Vertrag so viele Gegenst&auml;nde, dass die Auflistung in der Vertr&auml;ge&uuml;bersicht mit "..." abgek&uuml;rzt wird, k&ouml;nnen die nicht genannten Pflanzen leider nicht erkannt werden!',
      "helpwimpsale"              : '<b>Wimp-Verkauf</b><br>Willst du etwas an die Wimps verkaufen, siehst du nun zus&auml;tzlich zu der angebotenen Summe auch den Preis, den du auf dem Markt erzielen w&uuml;rdest. Diese sind als Kosten ausgeschildert. Zus&auml;tzlich kannst du die Kosten zu jedem einzelnen Produkt sehen, wenn du mit der Maus &uuml;ber sie f&auml;hrst. &Uuml;ber der Angebotssumme wird bei Mausber&uuml;hrung der prozentuale Wert des Angebot in Relation zu den Kosten angezeigt. &Uuml;bertrifft das Angebot den von dir in der Konfiguration festgelegten Prozentsatz, wird er in lila angezeigt. Ist es h&ouml;her als 100%, erscheint es in gr&uuml;n und ansonsten in rot.',
      "helpupdate"                : '<b>Aktualisierung</b><br>Solltest du im Angebotsfenster der Wimps sein und deine Marktpreisdaten sind veraltet, gibt es zwei Aktualisierungsm&ouml;glichkeiten.<br>Die Serveraktualisierung wird dir durch einen gr&uuml;nes Symbol hinter dem Angebotsposten dargestellt und kann vollzogen werden, indem du es anklickst. Dabei wird von einer Sammelstelle ein Datensatz heruntergeladen, damit deine Daten auf dem neuesten Stand gehalten werden. Eine Aktualisierung von der Sammelstelle ist pro Server nur jede Stunde m&ouml;glich um den Infoserver nicht zu &uuml;berlasten. (Diese Option kann in der Konfiguration deaktiviert werden.)<br>Die Marktaktualisierung wird dir durch ein rotes Symbol hinter dem Angebotsposten signalisiert. Du siehst sie, wenn deine Daten &auml;lter als eine Stunde sind, ein Sammelstellenupdate aber (noch) nicht in Frage kommt. Dies bedeutet, du solltest im Marktplatz selbst einmal diese Pflanze abrufen, damit die Daten aktualisiert werden, wie oben beschrieben.',
      "helpcostprotection"        : '<b>Preisschutz</b><br>Die Angebote auf dem Marktplatz, die teurer als auf dem Bauernhof, in der Baumschule oder im Blumenladen sind, werden rot eingef&auml;rbt. (Diese Option kann in der Konfiguration deaktiviert werden.)',
      "helpgardeninfo"            : '<b>Garten-Info</b><br>&Uuml;ber dem Regal findest du eine Zusammenfassung &uuml;ber den aktuellen Garten. Dabei wird dir angezeigt, wann du deine Pflanzen das n&auml;chste mal w&auml;ssern und ernten musst. Au&szlig;erdem kannst du du sehen, wieviele Pl&auml;tze benutzbar sind (kein Unkraut, Stein, ...) und wieviele davon aktuell noch unbenutzt sind.',
      "helpconfig"                : '<b>Konfiguration</b><br>Du kannst WIMPer einstellen. So kann eingestellt werden, ob Daten an den Infoserver gesendet werden, oder von dort empfangen werden. Zudem kannst du die Einf&auml;rbung der Pflanzen auf dem Marktplatz und in der Produkt&uuml;bersicht an-/abstellen. Zudem kannst du einstellen, ob du bei einem stattfindenden Datentransfer informiert werden m&ouml;chtest, wenn es von WIMPer ein Update gibt. Als weiteres kannst du eine Angebotsschwelle als Prozentsatz festlegen, ab dem das Angebot farblich lila gekenneichnet wird. Die Konfiguration siehst du, wenn du neben dem Logout-Button auf <img id="wimper_button"> klickst.',
      "helpupdatelink"            : '<b>Updatelink</b><br>Wie oben geschrieben, kannst du in der Konfiguration die Information &uuml;ber existierende Updates an- bzw abstellen. In jedem Falle wird der Downloadlink im Konfigurationsfenster angezeigt.',
      "configwelcome"             : 'Hier kannst du WIMPer einstellen.',
      "version"                   : 'Version',
      "configwarning"             : 'Du benutzt WIMPer damit auf eigene Gefahr.',
      "configdiscussionlink"      : 'Bitte &auml;u&szlig;ert Verbesserungsideen <a href="http://userscripts.org/scripts/discuss/40956" target="_blank">hier</a>.',
      "configdownload"            : 'Download',
      "configdownloadquestion"    : '(Daten herunterladen anbieten?)',
      "configupload"              : 'Upload',
      "configuploadquestion"      : '(Preise versenden?)',
      "configwimpoffer"           : 'Gutes Angebot',
      "configwimpoffernotice"     : 'Angebot durch Kosten in %',
      "configwimpoffertitle"      : 'Zeigt das Angebot des Wimps in lila an, wenn dieser Prozentsatz erreicht wird.',
      "configcolorlinks"          : 'Links einf&auml;rben',
      "configcolorlinkstitle"     : 'Gilt nur f&uuml;r Pflanzen, die bereits einmal auf dem Marktplatz abgerufen worden sind.',
      "configcolorlinksnotice"    : '(Marktplatz: Farbe f&uuml;r veraltete Daten in Produkt&uuml;bersicht)',
      "configmarkoverprice"       : 'Preise markieren',
      "configmarkoverpricenotice" : '(Marktplatz: Preise gr&ouml;&szlig;er als NPC-Preis markieren)',
      "configupdateinfo"          : 'Update-Info',
      "configsubmitbutton"        : '&Auml;nderungen speichern',
      "infonow"                   : 'jetzt',
      "infowater"                 : 'w&auml;ssern',
      "infoharvest"               : 'ernten',
      "infousable"                : 'nutzbar',
      "infounused"                : 'unbenutzt',
      "actualupdatenotice"        : 'WIMPer wurde aktualisiert!\nÜber dem Regal befindet sich nun eine Anzeige mit Informationen über den aktuell ausgewählten Garten. Zusätzlich wird nun bei der Wimp-Info angezeigt, ob sich entsprechende Pflanzen in einem Vertrag befinden, oder ob man welche einkaufen/anbauen sollte. Bitte äußere Verbesserungsideen im Diskussionsforum. Den Link findest du im WIMPermenu.'
    },
    "pl" : {
      "updatenotice"              : 'Możliwa jest aktualizacja!\nPobierz i zainstaluj! Linka znajdziesz w menu WIMPera. ',
      "updatereloadnotice"        : 'Po aktualizacji odśwież stronę.\nDziękuję.',
      "wimpnotallplantsknown"     : 'Nie są znane wszystkie dane roślin.\nOdwiedź targ aby pozyskać nazwy.',
      "wimpnotallcostsknown"      : 'Nie są znane wszystkie ceny roślin u NPC.\nOdwiedź stronę Rośliny\nw menu Pomoc.\nDziękuję.',
      "market"                    : 'Targ',
      "questiongetdbupdate"       : 'Pobrać dane z serwera?',
      "dbupdatemarketrecommend"   : 'Zalecana jest aktualizacja cen!',
      "comesupto"                 : 'Wartość oferty to',
      "ofthecosts"                : 'kosztów.',
      "costs"                     : 'Suma',
      "moneyunit"                 : 'kt',
      "contractcutplants"         : 'Uwaga nazwa rośliny jest niepełna!!',
      "missing"                   : 'Brakuje',
      "allonstock"                : 'Wszystko w magazynie',
      "helpnotallplantsknown"     : 'Nie są znane wszystkie dane roślin.\nOdwiedź targ aby pozyskać nazwy.\nJeśli już to zrobiłeś to zignoruj ten komunikat.',
      "updatelinktitle"           : 'Dostępna jest aktualizacja! Pobierz tutaj!',
      "questionshowupdatenotice"  : '(Pokazać informacje podczas wysyłania/odbierania danych na serwer?)',
      "costssent"                 : 'WIMPer: Cena wysłana na serwer. Dziękuję!',
      "sendfailed"                : 'WIMPer: Wysyłanie ceny na serwer nie powiodło się!',
      "erroroccured"              : 'Błąd!',
      "helpwelcome"               : 'Witam w pomocy WIMPera. Tutaj znajdziesz wszystkie informacje dotyczące obsługi WIMPera.',
      "helpbeginning"             : '<b>Pierwsze kroki...</b><br>... są proste. WIMPer jest tak zaprogramowany, że działa z produktami, które nie są mu jeszcze znane. Dlatego musisz najpierw odwiedzić targ i wybrać każdy produkt aby WIMPer pozyskał jego nazwę i cenę. <br>Następnie musisz otworzyć <a href="hilfe.php?item=2">stronę dotyczącą Roślin</a> w Pomocy gry aby WIMPer mógł pobrać ceny roślin u NPC.<br>Ten ostatni krok trzeba powtórzyć tylko gdy zostaną dodane do gry nowe rośliny.',
      "helpmarketplaceoverview"   : '<b>Targ - Przegląd produktów</b><br>Wszystkie rośliny, których ceny są nieaktualne zaznaczone są na żółto. (Tą opcje można wyłączyć w menu WIMPera).',
      "helpmarketplace"           : '<b>Targ</b><br>Kiedykolwiek odwiedzisz stronę jakiejś rośliny na targu, zostanie obliczona średnia z trzech najniższych cen danej rośliny, a następnie zapisana w bazie danych WIMPera. Dodatkowo te dane zostaną wysłane do serwera więc inni użytkownicy WIMPera będą mogli pozyskać te dane bez odwiedzania targu. Również i ty możesz korzystać z tego, iż inni wysyłają dane na serwer. Dane każdej roślin mogą być aktualizowane raz na 10 minut żeby zapobiec przeciążeniu serwera. (Ta opcja może być wyłączona w menu WIMPera).',
      "helpwimpinfo"              : '<b>Wimp – okienko informacji</b><br>Gdy najedziesz kursorem na postać Wimpa, wyświetli się okienko informacji, w którym dowiesz się czy masz już wszystkie potrzebne rośliny czy może jeszcze potrzebujesz niektórych roślin. Jeśli nie będzie w magazynie wszystkich potrzebnych roślin w okienku wyświetlą się nazwy tych roślin, których brakuje. W obliczeniu ilości posiadanych roślin brane są pod uwagę rośliny w magazynie jak i te, które zostały przysłane w umowie np. do siebie (oszczędność miejsca w magazynie). Aby WIMPer wliczył rośliny z umowy wystarczy wejść do menu Umowy, a jeśli będziemy chcieli skorzystać z tych zapasów wystarczy anulować umowę wysłaną do siebie. <br><b>-&gt;WAŻNE&lt;-</b><br>Umowy zawierające wiele roślin mogą być źle rozpoznawane przez WIMPera i te rośliny mogą nie zostać wliczone w kalkulacje.',
      "helpwimpsale"              : '<b>Sprzedaż do Wimpa</b><br>Jeśli chcesz sprzedać Wimpowi produkty i otworzysz okienko z jego ofertą zobaczysz tam informacje jaki byłby koszt sprzedaży tych produktów na targu (kwota niżej) w porównaniu do oferty pieniężnej Wimpa (kwota wyżej). Dodatkowo możesz zobaczyć wartość każdej rośliny z osobna najeżdżając kursorem na nią. Przesuwając kursor na kwotę oferty Wimpa pojawi się procentowa wartość oferty Wimpa w porównaniu do wartości roślin na targu. Jeśli ta wartość procentowa jest wyższa niż ta, którą ustawiono w menu będzie ona wyświetlana fioletowym kolorem. Poza tym jeśli ta wartość będzie około 100% to kolor będzie zielony, a jeśli będzie poniżej ustawionej wartości procentowej kolor będzie czerwony.',
      "helpupdate"                : '<b>Aktualizacja cen</b><br>Jeśli masz otwartą ofertę Wimpa i cena rośliny jest nieaktualna możesz skorzystać z opcji aktualizacji cen.<br>Aktualizacja cen poprzez pobranie danych z serwera jest dostępna pod zielonym przyciskiem obok nazwy rośliny w ofercie Wimpa. Aktualizacja w ten sposób jest możliwa raz na godzinę na każdy serwer żeby zapobiec przeciążeniu serwera. (Ta opcja może zostać wyłączona w menu).<br>Czerwony przycisk obok nazwy rośliny oznacza że cena jest nieaktualna, a aktualizacja poprzez serwer jest niedostępna (jeszcze). To oznacza że należy dokonać aktualizacji cen poprzez wizytę na targu i wyboru odpowiednich roślin.',
      "helpcostprotection"        : '<b>Ochrona przed wysokimi cenami</b><br>Oferty roślin na targu ktorych ceny są wyższe niż ceny u NPC są zaznaczane na czerwono. (Tą opcje można wyłączyć w menu).',
      "helpconfig"                : '<b>Konfiguracja</b><br>Możesz konfigurować WIMPera. Możesz decydować czy dane mają być wysyłane na serwer. Również jest możliwość włączenia/wyłączenia opcji wyświetlania na targu żółtym kolorem roślin których ceny są nieaktualne. Możesz ustawić czy chcesz być informowany o dostępności aktualizacji WIMPera jak również informacje dotyczące trasnferu danych na serwer. Menu konfiguracji możesz otworzyć klikając przycisk <img id="wimper_button"> który jest obok przycisku Wylogowania.',
      "helpupdatelink"            : '<b>Aktualizacje</b><br>Jak było wspomniane powyżej - możesz zdecydować czy informacje o aktualizacji mają być wyświetlane. Niezależnie od ustawień link do aktualizacji zawsze będzie dostępny w menu.',
      "configwelcome"             : 'Tutaj możesz ustawić WIMPera.',
      "version"                   : 'Wersja',
      "configwarning"             : 'Używasz WIMPera na własną odpowiedzialność.',
      "configdiscussionlink"      : 'Jeśli masz pomysły jak ulepszyć WIMPera kliknij <a href="http://userscripts.org/scripts/discuss/40956" target="_blank">tutaj</a>.',
      "configdownload"            : 'Pobieranie',
      "configdownloadquestion"    : '(Pobierać dane z serwera?)',
      "configupload"              : 'Wysyłanie',
      "configuploadquestion"      : '(Wysyłać dane na serwer?)',
      "configwimpoffer"           : 'Korzystne oferty',
      "configwimpoffernotice"     : 'relacja: oferta do kosztów w %',
      "configwimpoffertitle"      : 'Oferta zostanie wyświetlona fioletowym kolorem jeśli zajdzie ta relacja.',
      "configcolorlinks"          : 'Nieaktualne ceny',
      "configcolorlinkstitle"     : 'Działa tylko dla tych produktów których cena była chociaż jeden raz pobrana!',
      "configcolorlinksnotice"    : '(Targ: zaznaczanie na żółto roślin z nieaktualnymi cenami)',
      "configmarkoverprice"       : 'Wysokie ceny',
      "configmarkoverpricenotice" : '(Targ: zaznaczanie cen roślin wyższych niż u NPC)',
      "configupdateinfo"          : 'Informacje',
      "configsubmitbutton"        : 'Zapisz zmiany',
      "infowater"                 : 'podley',
      "infoharvest"               : 'zbierz plony',
      "actualupdatenotice"        : 'WIMPer został zaktualizowany! \nMożesz teraz ustawić wartości procentowe dla ofert Wimpów. Jeśli oferta osiągnie tą wartość % to zostanie ona wyświetlona fioletowym kolorem. Jeśli jesteś zainteresowany i chcesz pomóc w tłumaczeniu WIMPera na własny język zgłoś się na forum! Link do forum znajdziesz w menu WIMPera.'
    },
   "hu" : {
      "updatenotice"              : 'Letölthető frissítés!\nTöltsd le, és telepítsd! A letöltési link a WIMPer\' menüjében van.',
      "updatereloadnotice"        : 'Miután a frissítés végzett tölsd be újra az oldalt.\nKöszönöm.',
      "wimpnotallplantsknown"     : 'Bizonyos növények ismeretlenek.\nLátogasd meg a piacot, és nyisd meg a növényenként az ajánlatokat.',
      "wimpnotallcostsknown"      : 'Bizonyos növények bolti ára ismeretlen.\nKérlek nyisd meg a Súgó-ban a növények lapját.\nKöszönöm.',
      "market"                    : 'piac',
      "questiongetdbupdate"       : 'Adatletöltés a szerverről?',
      "dbupdatemarketrecommend"   : 'Ajánlatos a piaci árak frissítése.',
      "comesupto"                 : 'A felkínált ár',
      "ofthecosts"                : '-a a piaci értéknek.',
      "costs"                     : 'Piaci érték',
      "moneyunit"                 : 'gyT',
      "contractcutplants"         : 'Figyelem: az objektum nevek csonkolva!!',
      "missing"                   : 'hiányzik',
      "allonstock"                : 'Minden növény rendelkezésre áll',
      "helpnotallplantsknown"     : 'Bizonyos növények ismeretlenek.\nLátogasd meg a piacot, és nyisd meg a növényenként az ajánlatokat.\nHa ezt már megtetted,\nhagyd figyelmen kívül ezt az üzenetet.',
      "updatelinktitle"           : 'WIMPer frissítés elérhető! Töltsd le itt!',
      "questionshowupdatenotice"  : '(Megjelenjen a frissítési információ az árak feltöltésekor?)',
      "costssent"                 : 'WIMPer: Az ár frissítve. Köszönjük!',
      "sendfailed"                : 'WIMPer: Ár küldése sikertelen!',
      "erroroccured"              : 'Hiba történt!',
      "helpwelcome"               : 'Üdvözöl a WIMPer\' súgó. Itt mindent megtalálsz ami szükséges, hogy használhasd a WIMPer-t.',
      "helpbeginning"             : '<b>Az első lépések...</b><br>... a legkönnyebbek. WIMPer úgy lett programozva, hogy azokat a növényeket is kezeli, melyeket korábban nem ismert. Indulásként el kell látogatnod a piacra a termék listára, hogy a WIMPer megismerhesse a terményeket. Azután meg kell nyitnod a <a href="hilfe.php?item=2">növények súgó oldalt</a> hogy a WIMPer betöltse a növények bolti árát. Ezt csak akkor kell újra végrehajtani ha új növény kerül bevezetésre.',
      "helpmarketplaceoverview"   : '<b>Piac – termék lista</b><br>Ezen az oldalon azon növények neve melyek ára nincs frissítve sárgával jelenik meg. (Ez az opció letiltható a beállító menüben.)',
      "helpmarketplace"           : '<b>Piac - árak</b><br>Valahányszor a piacon megnyitod egy növény oldalát a WIMPer kiszámítja a legolcsóbb három ajánlat átlagos árát, és elmenti a Te helyi adatbázisodba. Ez az adatot a WIMPer elküldi egy szervernek, mely gyűjti az adatokat, így nem kell mindenkinek meglátogatnia a piacot, hogy a legfrissebb árakat megkaphassák. Cserébe Te is megkapod az árakat, amit mások töltöttek fel. Minden növény adatai 10 percenként csak egyszer tölthetők fel, hogy elkerülhető legyen a szerver túlterhelése. (Ez az opció letiltható a beállító menüben.)',
      "helpwimpinfo"              : '<b>Vásárló-infó</b><br>Valahányszor az egeret egy vásárló felett húzod át a WIMPer kiírja, hogy készelet van-e minden kívánt növény, vagy nem. Új képesség, hogy információt ad azokról a növényekről, melyeket szerződésben küldted el magadnak. <br>Ez a szimbólum: <img id="wimper_info_contract"> jelzi, hogy egy szerződésed van, melyet vissza kell vonnod. Egy másik szimbólum: <img id="wimper_info_market"> azt jelzi, hogy nincs elegendő készleted a növényből.<br><b>-&gt;FONTOS&lt;-</b><br>A szerződésekben nem lehet túl sok fajta növény. Ha túl sokféle növény szerepel egy szerződésben akkor a címében csak ennyi szerepel "...", és az itt fel nem sorolt termékeket nem veszi figyelembe a kalkuláció. Egy figyelmeztetés jelenik meg, ha ilyen szerződés található.',
      "helpwimpsale"              : '<b>Vásárlónak történő eladás</b><br>Ha üzletelni akarsz a vásárlóval, és rákattintasz, a vásárló ajánlata alatt megkapod azt a kiegészítő információt mennyit keresnél a termékekkel, ha a piacon adnád el. Ezt „költség”-ként írja ki. Ezen kívül láthatod minden termék piaci értékét ha az egeret a listában fölé húzod. Ha az egeret a vevő ajánlata fölé húzod megkapod az ajánlat százalékos viszonyítását a piaci értékhez. Ha ez a százalékos érték magasabb mint amit a beállító menüben megadtál, az ajánlat színe lila lesz. Ha ez az érték magasabb 100%-nál, a szin zöld lesz, ha egyiket sem éri el akkor vörös.',
      "helpupdate"                : '<b>Árak frissítése</b><br>H megnyitottad a vásárló ajánlatát, és a növény adatai nem frissek, két módon lehet frissíteni.<br>Az adatok frissíthetőek a szerverről való letöltéssel. Csak rá kell kattintani a növény neve melletti zöld szimbólumra. Ezen a módon való frissítés csak egyszer hajtható végre óránként, hogy az adatgyűjtő szerver ne legyen túlterhelt. (Ez az opció letiltható a beállító menüben.)<br> A növények neve mellett vörös szimbólum látható, ha az adata már nem friss, és az adatgyűjtő szerverről történő frissítés nem lehetséges. Ekkor meg kell látogatnod a piacot, hogy a fentebb leírt módon kaphasd meg a legfrissebb árakat.',
      "helpcostprotection"        : '<b>Túlfizetés védelem</b><br>Olykor a piaci ajánlatok drágábbak a bolti áraknál. Ezek az ajánlatok piros színnel jelennek meg. (Ez az opció letiltható a beállító menüben.)',
      "helpgardeninfo"            : '<b>Kert-infó</b><br>Az aktuális kert összesítő információja a polc felett a bal szélen jelenik meg. Itt láthatod, mikor kell öntözni, és betakarítani a növényeket. Ettől jobbra találod hány mezőnyi hely használható, és pillanatnyilag mennyi kihasználatlan.',
      "helpconfig"                : '<b>Beállító menü</b><br>A WIMPer beállító menüjében szabályozható, küldjél illetve fogadjál-e adatokat a szerver irányában. Továbbá engedélyezheted, vagy tilthatod a növények színezését a piaci áttekintő listán. Eldöntheted, akarsz-e információt kapni a WIMPer frissítéseiről mikor adatot küldesz a szervernek. Kattints a jelre: <img id="wimper_button"> a kijelentkező gomb mellett a beállító menü megnyitásához.',
      "helpupdatelink"            : '<b>Frissítés link</b><br>Mint fentebb említettük, eldöntheted, hogy a WIMPer frissítési információk megjelenjenek-e, ettől függetlenul a Beállítási képernyőn a link megjelenik.',
      "configwelcome"             : 'A WIMPer beállító oldala.',
      "version"                   : 'verzió',
      "configwarning"             : 'A WIMPer-t csak saját felelőségedre használhatod!!',
      "configdiscussionlink"      : 'Kérlek, a fejlesztési ötleteidet ide küldjed <a href="http://userscripts.org/scripts/discuss/40956" target="_blank">IDE</a>.',
      "configdownload"            : 'letöltés',
      "configdownloadquestion"    : '(ajánlat adatok letöltése?)',
      "configupload"              : 'feltöltés',
      "configuploadquestion"      : '(ár adatok feltöltése?)',
      "configwimpoffer"           : 'jó ajánlat',
      "configwimpoffernotice"     : 'viszonyítás: ajánlat a piaci érték %-ában',
      "configwimpoffertitle"      : 'Az ajánlat lilára színeződik, ha az arány eléri a megadott szintet',
      "configcolorlinks"          : 'linkek átszinezése',
      "configcolorlinkstitle"     : 'Csak a már legalább egyszer megtekintett növényekre vonatkozik.',
      "configcolorlinksnotice"    : '(Piac: a frissítést igénylő növények nevének színezése az áttekintő listán)',
      "configmarkoverprice"       : 'túlfizetés jelzés',
      "configmarkoverpricenotice" : '(Piac: a boltinál magasabb árak színezése)',
      "configupdateinfo"          : 'WIMPer frissítés',
      "configsubmitbutton"        : 'változások mentése',
      "infonow"                   : 'most',
      "infowater"                 : 'öntözés',
      "infoharvest"               : 'aratás',
      "infousable"                : 'művelhető',
      "infounused"                : 'üres',
      "actualupdatenotice"        : 'WIMPer telepítve!\nA használatról részletes leírást találsz a játék Súgó-jának WIMPer-ről szóló kiegészítőjében.'
    },
    "com" : {
      "updatenotice"              : 'Update available!\nPlease download and install! A link to the download can be found at WIMPer\'s menu.',
      "updatereloadnotice"        : 'After update finishes please reload site.\nThank you.',
      "wimpnotallplantsknown"     : 'Some plant IDs are unknown.\nPlease visit the marketplace and click on the product overview.',
      "wimpnotallcostsknown"      : 'The NPC\'s costs of some plants are unknown.\nPlease visit the plant\'s page ofthe game\'s help.\nThank you.',
      "market"                    : 'market',
      "questiongetdbupdate"       : 'Download data from server?',
      "dbupdatemarketrecommend"   : 'It is recommended to get more recent prices from the marketplace.',
      "comesupto"                 : 'Comes up to',
      "ofthecosts"                : 'of the costs.',
      "costs"                     : 'costs',
      "moneyunit"                 : 'gB',
      "contractcutplants"         : 'Warning: the names of the objects are cut!!',
      "missing"                   : 'missing',
      "allonstock"                : 'everything on stock',
      "helpnotallplantsknown"     : 'Some plant IDs are unknown.\nPlease visit the marketplace and click on the product overview.\nIf you have done so already,\nplease ignore this message.',
      "updatelinktitle"           : 'WIMPer update available! Download here!',
      "questionshowupdatenotice"  : '(Show update info while sending/retrieving price data?)',
      "costssent"                 : 'WIMPer: Price sent. Thank you!',
      "sendfailed"                : 'WIMPer: Sending price failed!',
      "erroroccured"              : 'An error occured!',
      "helpwelcome"               : 'Welcome to WIMPer\'s help. Here you can find information on everything you need to know in order to use WIMPer.',
      "helpbeginning"             : '<b>The first steps...</b><br>... are the easiest. WIMPer is programmed to be compatible even with plants that have not been designed, yet. For a starter it is required that you visit the product overview in the marketplace so that WIMPer can retrieve the IDs of the plants. After this you need to open <a href="hilfe.php?item=2">the plant\'s help page</a> to retrieve the NPC prices of the plants. You only need to repeat these steps if new plants are introduced.',
      "helpmarketplaceoverview"   : '<b>marketplace - product overview</b><br>On this page the names of the plants whose data is outdated is shown in yellow. (This option can be disabled in the configuration menu.)',
      "helpmarketplace"           : '<b>marketplace</b><br>Whenever you visit the page of a plant at the marketplace WIMPer calculates the average price of the three cheapest offers and saves it to your local database. This data is then sent to a server that collects data so others do not need to visit the marketplace to get the most up-to-date prices. In return you can profit of prices that have been uploaded by other users. The data of each plant can only be uploaded once every 10 minutes to avoid an overload of the server. (This option can be disabled in the configuration menu.)',
      "helpwimpinfo"              : '<b>wimp-info</b><br>Whenever you mouse moves over a wimp, WIMPer will tell you whether you have every plant in stock or not. A new feature includes information on plants that you might have sent to yourself with a contract to calculate whether there are enough plants in your stock.<br>The symbol <img id="wimper_info_contract"> indicates there is a contract you need to cancel. Another symbol <img id="wimper_info_market"> tells you to either plant or grow additional plants.<br><b>-&gt;IMPORTANT&lt;-</b><br>Contracts must not contain too many different plants. If there are to many plants in a contract, so that the subject uses a "...", the plants not mentioned will not be considered in the calculation. A warning will be shown in case such a contract is found.',
      "helpwimpsale"              : '<b>sale to a wimp</b><br>If you want to make a deal with a wimp and click on him/her, you get information on how much money you would earn if you sold these plants at the marketplace in addion to the wimp\'s offer. These are marked as costs. Additionally you can see each the costs of the products if you move your mouse over them. By moving your mouse over the wimp\'s offer you will get percental value of the offer in relation to the costs. If that percentual value is higher than the value you have set in the configuration its color will be purple. If that value is higher than 100% the color will be green and if neither is reached the color will be red.',
      "helpupdate"                : '<b>Updating Prices</b><br>If you have opened a wimp\'s offer and the data of your plants is outdated, there are two options for an update.<br>You can get an update by downloading data from the server. Just click the green symbol behind the products. An update by using this method is available only once an hour so that the server server collecting the data is not overloaded. (This option can be disabled at the configuration menu.)<br>There is a red symbol behind the products whose data is outdated and if an update using the collecting server is not available (yet). This means you have visit the marketplace to get the most up-to-date prices by yourself like mentioned above.',
      "helpcostprotection"        : '<b>Overprice protection</b><br>Sometimes offers at the marketplace are more expensive than at the NPC stores. Those offers are marked red. (This option can be disabled at the configuration menu.)',
      "helpgardeninfo"            : '<b>garden-info</b><br>A summary about the actual garden is displayed above the rack to the left. Here you can find information on when to water and to harvest your plants. Right next to this you can see how many fields are available for use and how many are actually unused.',
      "helpconfig"                : '<b>configuration</b><br>You can choose WIMPer\'s setup. It is you who decides whether to send or retrieve the server or not. You can also enable or disable the coloration of the plants at the product overview of the marketplace. You can decide whether you want to be informed about updates of WIMPer while transfering data to the server. Click on the <img id="wimper_button"> next to the logout-button to open the configuration menu.',
      "helpupdatelink"            : '<b>update link</b><br>As mentioned above you can decide whether update information should be displayed. Indepentendly a link to the update will be shown in the configuration menu.',
      "configwelcome"             : 'You can setup WIMPer here.',
      "version"                   : 'version',
      "configwarning"             : 'You are using WIMPer at your own risk.',
      "configdiscussionlink"      : 'Please post ideas of possible improvement <a href="http://userscripts.org/scripts/discuss/40956" target="_blank">here</a>.',
      "configdownload"            : 'download',
      "configdownloadquestion"    : '(offer data download?)',
      "configupload"              : 'upload',
      "configuploadquestion"      : '(upload price data?)',
      "configwimpoffer"           : 'good offer',
      "configwimpoffernotice"     : 'relation: offer to costs in %',
      "configwimpoffertitle"      : 'the offer will be colored purple if this relation reached or surpassed',
      "configcolorlinks"          : 'color links',
      "configcolorlinkstitle"     : 'Only counts for plants visited at the marketplace at least once.',
      "configcolorlinksnotice"    : '(marketplace: colors outdated plants at the product overview)',
      "configmarkoverprice"       : 'mark overprice',
      "configmarkoverpricenotice" : '(marketplace: colors prices higher than the NPC\'s price)',
      "configupdateinfo"          : 'update info',
      "configsubmitbutton"        : 'save changes',
      "infonow"                   : 'now',
      "infowater"                 : 'water',
      "infoharvest"               : 'harvest',
      "infousable"                : 'usable',
      "infounused"                : 'unused',
      "actualupdatenotice"        : 'WIMPer has been updated!\nAbove the rack you can find information about the selected garden. Additionally symbols in the wimp-info indicate whether needed plants are in contracts or you need to buy/plant them.\nIf you are interested in supplying a translation for your language, use the script\'s forum. The link can be found at WIMPer\'s config menu. Please join in there for any suggestions, too.'
    }
  }

locale = (locales[country] != null) ? locales[country] : locales["com"];
for(actLocData in locales["com"]) {
  if(locale[actLocData] == null) locale[actLocData] = locales["com"][actLocData];
}
delete locales;

/************************************************************
***                                                       ***
***                  Globale Funktionen                   ***
***                                                       ***
*** addGlobalStyle: Einfügen eigener CSS-Definitionen     ***
*** af: Formatieren eines Javscripttextes                 ***
*** getParams: Auslesen der URL-Parameter                 ***
***                                                       ***
************************************************************/

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function af(text2format, charperline) {
  if(typeof charperline == 'undefined') charperline = 80;
  var giveback  = '';
  var lines = text2format.split('\n');
  for(j=0; j<lines.length; j++) {
    var thisline = '';
    var form_searchSpec = /([^\s]+)([\s]+)?/g;
    if(form_result = lines[j].match(form_searchSpec)) {

      var actline = '';
      for(i=0; i<form_result.length; i++) {
        if(((actline.length + form_result[i].length) < charperline) || actline.length == 0) {
          actline += form_result[i];
        } else {
          thisline += actline + '\n';
          actline = form_result[i];
        }
      }
      thisline += actline;
      delete actline;
    }
    lines[j] = thisline;
  }
  giveback = lines.join('\n');
  return giveback;
}

function getParams() {
  giveback = {};
  var loc = window.location.href;
  if(loc.indexOf('?') >= 0) {
    params = loc.substring(loc.indexOf('?')+1,loc.length);
    while(params.length > 0) {
      trennpos = params.indexOf('=');
      endpos = params.indexOf('&');
      endpos = (endpos>=0) ? endpos : params.length;
      if(trennpos>=0) {
        paramname = params.substr(0, trennpos);
        paramwert = params.substring(trennpos+1, endpos);
      } else {
        paramname = params.substr(0, endpos);
        paramwert = true;
      }
      giveback[paramname] = paramwert;
      params = params.substr(endpos+1);
    }
  }
  return giveback;
}

function getGFX() {
  // Mache Grafikpaket aus
  baseGFX = 'http://d3o68bgrbhx8hn.cloudfront.net/';
  try {
    // per Script
    sc = document.getElementsByTagName('script')[0];
    sc = sc.innerHTML;
    scp = sc.indexOf('var _GFX = ');
    if(scp > -1) {
      sc = sc.substring(scp+11, sc.length);
      _GFX = sc.substring(1, sc.indexOf(';')-1);
    } else {
      // per BodyBG
      sc = document.getElementsByTagName('body')[0].getAttribute('style');
      sc = sc.substring(sc.indexOf('url(')+4, sc.length);
      if(sc.substr(0,1) == '\'')
        sc = sc.substring(1, sc.length);
      sc = sc.substring(0,sc.indexOf(')'));
      if(sc.substr(sc.length-1,1) == '\'')
        sc = sc.substring(0, sc.length-1);

      // Hier vielleicht noch verallgemeinern, passt momentan nur auf WIMP-Liste
      var searchSpec = /^(.*?)\/pics\/verkauf\/einkaufsliste.gif$/i;
      Ergebnis = searchSpec.exec(sc);
      _GFX = Ergebnis[1]+'/';
    }
  } catch(e) {
    _GFX = baseGFX;
  }

  return _GFX;
}

function jetzt() {
  return Math.round((new Date()).getTime()/1000);
}

function checkNumberInput(evt) {
  var el = evt.target;
  el.value = el.value.replace(/[^\d]/g, '');
}

function newVeggie() {
  return {'costs':-1,'stime':0,'mtime':0,'utime':0};
}

function loadconf() {
  dummy = JSON.parse(GM_getValue(country+"_"+server+'_set', '{}'));
  if(dummy["download"] == null)
    dummy["download"] = true;
  if(dummy["upload"] == null)
    dummy["upload"] = true;
  if(dummy["update"] == null)
    dummy["update"] = true;
  if(dummy["color_links"] == null)
    dummy["color_links"] = true;
  if(dummy["color_exp"] == null)
    dummy["color_exp"] = true;
  if(dummy["wimpoffer"] == null)
    dummy["wimpoffer"] = 90;
  return dummy;
}

function loaddb() {
  return JSON.parse(GM_getValue(country+"_"+server + '_data', '{"data":{},"dtime":0}'));
}

function loadstorage() {
  return JSON.parse(GM_getValue(country+"_"+server + '_storage', '{}'));
}

function loadnpccosts() {
  return JSON.parse(GM_getValue('npccosts', '{}'));
}

function loadvids() {
  return JSON.parse(GM_getValue(country+"_"+'vids', '{}'));
}

function loadlun() {
  return JSON.parse(GM_getValue('lun', '{"ver": 0}'));
}

function getinvertvids() {
  if(arguments.length > 0)
    vids = arguments[0];
  else
    vids = loadvids();
  dummy = new Array();
  for(veg in vids) {
    dummy[parseInt(vids[veg], 10)] = veg;
  }
  return dummy;
}

function update_inform() {
  conf = loadconf();
  if(conf["update"]) {
    alert(af(locale["updatenotice"], 60));
    GM_setValue("update", 1);
  }
}

function script_update() {
  alert(af(locale["updatereloadnotice"], 60));
  window.location.href = "javascript:window.location.href='http://userscripts.org/scripts/source/40956.user.js';";
}

function getUserDetails(_document) {
  try {
    var user = {};
    user["name"] = _document.getElementById('username').innerHTML;
    var dummy    = _document.cookie;
    dummy = dummy.substr(dummy.indexOf('wunr=')+5);
    user["id"] = (dummy.indexOf(';') > -1) ? dummy.substr(0,dummy.indexOf(';')) : dummy;
    delete dummy;
    return user;
  } catch (e) {
    return false;
  }
}

function marketAddLine(tablebody, cont) {
  addLine = document.createElement('tr');
  addCell = document.createElement('td');
  addCell.setAttribute('colspan', 6);
  addCell.style.textAlign = 'center';
  addCell.innerHTML = cont;
  addLine.appendChild(addCell);
  tablebody.appendChild(addLine);
}

/************************************************************
***                                                       ***
***                  Seiten-Funktionen                    ***
***                                                       ***
*** wimp: Preisvergleich & Updatemöglichkeit              ***
*** scan: Auslesen aktueller Preise & Info an Server      ***
*** getIDs: Auslesen der korrekten PflanzenIDs            ***
*** getNPCcosts: Auslesen der NPC-Preise für Pflanzen     ***
*** watchit: Baustelle, evtl. unmöglich (für Bündlung von ***
***          Updateanfragen an Server, Verr. des          ***
***          Traffics)                                    ***
***                                                       ***
************************************************************/

// Wimp-Verkaufsfenster (verkauf.php?kunde=*)
function wimp() {

  var totalKosten = 0, Angebot = 0;

  allDivs = document.getElementsByTagName("div");

  listcont = allDivs[1];
  liste = listcont.getElementsByTagName("div");
  searchSpec = /^(\d+)x (.*)$/i;
  allesok = true;
  vids = loadvids();
  npccosts = loadnpccosts();
  actDB = loaddb();
  for(i=0; i<liste.length; i++) {
    Ergebnis = searchSpec.exec(liste[i].innerHTML);
    if(Ergebnis != null) {
      vid = (vids[Ergebnis[2]] != null) ? vids[Ergebnis[2]] : -1;
      var mPreis;
      if(vid == -1) {
        // uns fehlen anscheinend IDs, User hinweisen
        allesok = false;
        alert(af(locale["wimpnotallplantsknown"], 60));
        break;
      }
      dbentry = actDB["data"]['v_'+vid];
      Kosten = (dbentry != null) ? dbentry['costs'] : -1;
      if(Kosten == -1) {
        Kosten = (npccosts[vid] != null) ? npccosts[vid] : -1;
        mPreis = false;
      } else {
        mPreis = true;
      }
      if(Kosten == -1) {
        // uns fehlen anscheinend die NPC-Kosten, User hinweisen
        allesok = false;
        alert(af(locale["wimpnotallcostsknown"], 60));
        break;
      } else {
        realKosten = Math.round((Kosten-1) * 0.9);
      }
      update = 0;
      conf = loadconf();
      if(!mPreis && conf["download"]) {
        // Biete DB von Zentralserver
        update = 2;
      } else {
        newTime = (dbentry['mtime'] > dbentry['stime']) ? dbentry['mtime'] : dbentry['stime'];
        tjetzt = jetzt();
        if(newTime < tjetzt-1*60*60) {
          if(conf["download"] && (actDB["dtime"] <= tjetzt-1*60*60)) {
            // Biete DB von Zentralserver
            update = 2;
          } else {
            // Marktplatz muss ran, Daten am Zentralserver zu alt, bzw. noch zu frÃƒÂ¼h zum updaten
            update = 1;
          }
        }
      }
      aktKosten = parseInt(Ergebnis[1], 10) * realKosten;
      if(mPreis) {
        liste[i].setAttribute('title', '['+locale["market"]+']: ' + liste[i].innerHTML + '(' + (Kosten/100).toMoney() + ' ' + locale["moneyunit"] + ') - 10% = ' + (aktKosten/100).toMoney() + ' ' + locale["moneyunit"]);
      } else {
        liste[i].setAttribute('title', '[NPC]: ' + liste[i].innerHTML + '(' + (Kosten/100).toMoney() + '-0,01 ' + locale["moneyunit"] + ') - 10% = ' + (aktKosten/100).toMoney() + ' ' + locale["moneyunit"]);
      }
      switch (update) {
        case 2:
          uimg = document.createElement('img');
          uimg.src = updateS;
          uimg.addEventListener('click', getupdate, true);
          uimg.setAttribute('class', 'link');
          uimg.setAttribute('title', locale["questiongetdbupdate"]);
          uimg.style.width = '14px';
          uimg.style.height = '14px';
          liste[i].appendChild(document.createTextNode(' '));
          liste[i].appendChild(uimg);
          break;
        case 1:
          uimg = document.createElement('img');
          uimg.src = updateM;
          uimg.setAttribute('title', locale["dbupdatemarketrecommend"]);
          uimg.style.width = '14px';
          uimg.style.height = '14px';
          liste[i].appendChild(document.createTextNode(' '));
          liste[i].appendChild(uimg);
          break;
      }
      totalKosten += aktKosten;
    }
  }

  if(allesok) {

    addGlobalStyle('.gruen { color: #336633; font: 22px Verdana; }');
    addGlobalStyle('.lila { color: #800080; font: 22px Verdana; }');
    
    wimpoffer = conf["wimpoffer"];

    angDiv = allDivs[allDivs.length-2];

    Angebot = angDiv.innerHTML;
    Angebot = Angebot.substr(Angebot.indexOf('&nbsp;')+6);
    Angebot = Angebot.substring(0,Angebot.indexOf(' ')).replace('.','').replace(',','');
    Angebot = parseInt(Angebot, 10);

    relation = (Angebot/totalKosten)*100;


    if(wimpoffer > 100) {
      if(relation >= wimpoffer) {
        angDiv.setAttribute('class', 'lila');
      } else if (relation >= 100) {
        angDiv.setAttribute('class', 'gruen');
      } else {
        angDiv.setAttribute('class', 'rot');
      }
    } else {
      if (relation >= 100) {
        angDiv.setAttribute('class', 'gruen');
      } else if(relation >= wimpoffer) {
        angDiv.setAttribute('class', 'lila');
      } else {
        angDiv.setAttribute('class', 'rot');
      }
    }
      
        
    angDiv.setAttribute('title', locale["comesupto"] + ' ' + (Angebot/totalKosten*100).toFixed(2).toString().replace('.',',') + '% ' + locale["ofthecosts"]);

    kostDiv = document.createElement('div');
    kostDiv.setAttribute('class', 'blau');
    kostDiv.innerHTML = locale["costs"] + ": " + (totalKosten/100).toMoney() + " " + locale["moneyunit"];
    parDiv = angDiv.parentNode;	
    parDiv.style.top = '290px';
    parDiv.style.height = '40px';
    parDiv.insertBefore(kostDiv, angDiv.nextSibling);
  }
}

// Aktuelle Preise abrufen (markt.php?page=1&v=#*)
function scan() {
  tablebody = document.evaluate(
    "//td[@class='headercell']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0).parentNode.parentNode;
  allRows = tablebody.getElementsByTagName('tr');
  maxRows = (allRows.length > 6) ? 6 : allRows.length - 1;
  var Summe = 0, Kosten = 0;
  for(i = 3; i < maxRows; i++) {
    allCells = allRows[i].getElementsByTagName('td');
    if(!allCells[4]) break;
    Summe += parseInt(allCells[0].innerHTML);
    dummy = allCells[4].innerHTML;
    Kosten += parseInt(dummy.substring(0, dummy.indexOf(' ')).replace(/,/g,'').replace(/\./g,''), 10);
  }
  if(Summe > 0) {
    actVid = parseInt(UrlParams['v'], 10);
    vids = loadvids();
    invertvids = getinvertvids(vids);
    actDB = loaddb();
    if(!actDB["data"]['v_'+actVid] && invertvids[actVid]) {
      actDB["data"]['v_'+actVid] = newVeggie();
    }
    vset = actDB["data"]['v_'+actVid];
    vset['costs'] = Math.round(Kosten/Summe);
    vset['mtime'] = Math.round((new Date()).getTime()/1000);
    conf = loadconf();
    if(conf["upload"] && (vset['utime'] < vset['mtime'] - 10*60)) {
      vset['utime'] = vset['mtime'];
      updatedb(tablebody, actVid, vset['costs']);
    }
    GM_setValue(country+"_"+server+'_data',JSON.stringify(actDB));
  }
}

function paintExp() {
  conf = loadconf();
  if(!conf["color_exp"]) return;
  tablebody = document.evaluate(
    "//td[@class='headercell']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0).parentNode.parentNode;
  allRows = tablebody.getElementsByTagName('tr');
  pageVid = (UrlParams['v'] && UrlParams['v'] != "") ? parseInt(UrlParams['v'], 10) : false;
  badColor = '#ff0000';
  npccosts   = loadnpccosts();
  invertVids = getinvertvids();
  npccostsknown = true;
  vidsknown = true;
  for(i = 3; i < allRows.length; i++) {
    allCells = allRows[i].getElementsByTagName('td');
    if(!allCells[4]) break;
    if(pageVid !== false)
      actVid = pageVid;
    else {
      actVid = allCells[1].getElementsByTagName('a')[0].href;
      actVid = actVid.substring(actVid.indexOf(',%20')+5, actVid.length);
      actVid = actVid.substring(0, actVid.indexOf('\''));
      actVid = parseInt(actVid, 10);
    }
    if(npccosts[actVid] != null) {
      dummy = allCells[3].innerHTML;
      dummy = parseInt(dummy.substring(0, dummy.indexOf(' ')).replace(',', '').replace('.',''), 10);
      if(npccosts[actVid] < dummy) {
        allCells[5].firstChild.style.color = badColor;
      }
    } else {
      npccostsknown = false;
    }
    if(invertVids[actVid] == null) {
      vidsknown = false;
    }
  }
/*
  if(!vidsknown) {
    marketAddLine(tablebody, 'Nicht alle PflanzenIDs bekannt.<br>Bitte <a href="markt.php?show=overview">Produkt&uuml;bersicht</a> aufrufen.');
  } else if(!npccostsknown) {
    marketAddLine(tablebody, 'Nicht alle NPC-Preise bekannt.<br>Bitte Pflanzenseite in der Hilfe aufrufen.');
  }
*/
}

// Veggie-IDs abrufen (markt.php?show=overview)
// Nun auch mit Link-einfÃƒÂ¤rbung
function getIDs() {
  conf = loadconf();
  actDB = loaddb();
  tablebody = document.evaluate(
    "//td[@class='tnormal']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0).parentNode.parentNode;
  allRows = tablebody.getElementsByTagName('tr');
  vids = JSON.parse(GM_getValue(country+"_"+"vids", "{}"));
  for(i=3; i < allRows.length; i++) {
    allLinks = allRows[i].getElementsByTagName('a');
    if(allLinks.length == 0) break;
    for(n = 0; n < allLinks.length; n++) {
      searchSpec = /^\/stadt\/markt\.php\?order=p&v=(\d+)&filter=1$/;
      Ergebnis = searchSpec.exec(allLinks[n].getAttribute('href'));
      if(Ergebnis) {
        vid = parseInt(Ergebnis[1], 10);
        vids[allLinks[n].innerHTML] = vid;
        if(conf['color_links']) {
          if(actDB['data'] && actDB['data']['v_'+vid] && (actDB['data']['v_'+vid]['mtime'] != null) && (actDB['data']['v_'+vid]['stime'] != null)) {
            dummy = actDB['data']['v_'+vid];
            if(dummy['mtime'] > 0) {
              newTime = (dummy['mtime'] > dummy['stime']) ? dummy['mtime'] : dummy['stime'];
              if(newTime < jetzt()-1*60*60) {
                allLinks[n].style.color = '#ffff00';
              }
            }
          }
        }
      }
    }
  }
  GM_setValue(country+"_"+"vids", JSON.stringify(vids));
}

// Hilfe-MenuPunkt einfügen
function addHelpMenu() {
  hmenucont = document.evaluate(
    "//a[@class='list_item']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0).parentNode.parentNode;
  newHelp = document.createElement('div');
  hlink = document.createElement('a');
  hlink.href = 'javascript:';
  hlink.setAttribute('class', 'list_item');
  hlink.addEventListener('click', showHelp, true);
  hlink.innerHTML = 'WIMPer';
  newHelp.appendChild(hlink);
  hmenucont.appendChild(newHelp);
  addGlobalStyle('.tmenu { text-align: justify; margin-right: 10px }');
}

// Hilfe anzeigen
function showHelp() {
  hcont = document.evaluate(
    "//div[@class='tnormal']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0).parentNode;
  newcont  = '<div class="tnormal"><b>WIMPer</b></div><br>';
  newcont += '<p class="tmenu">' + locale["helpwelcome"] + '</p>';
  newcont += '<p class="tmenu">' + locale["helpbeginning"] + '</p>';
  newcont += '<p class="tmenu">' + locale["helpmarketplaceoverview"] + '</p>';
  newcont += '<p class="tmenu">' + locale["helpmarketplace"] + '</p>';
  newcont += '<p class="tmenu">' + locale["helpwimpinfo"] + '</p>';
  newcont += '<p class="tmenu">' + locale["helpwimpsale"] + '</p>';
  newcont += '<p class="tmenu">' + locale["helpupdate"] + '</p>';
  newcont += '<p class="tmenu">' + locale["helpcostprotection"] + '</p>';
  newcont += '<p class="tmenu">' + locale["helpgardeninfo"] + '</p>';
  newcont += '<p class="tmenu">' + locale["helpconfig"] + '</p>';
  newcont += '<p class="tmenu">' + locale["helpupdatelink"] + '</p>';
  hcont.innerHTML = newcont;
  wimpB = document.getElementById('wimper_button');
  wimpB.src = menuB;
  wimpB = document.getElementById('wimper_info_contract');
  wimpB.src = symb_contract;
  wimpB = document.getElementById('wimper_info_market');
  wimpB.src = symb_market;
}

function getContractStorage() {
  try {
    // Ermittle Usernamen und ID
    if(!(user = getUserDetails(top.document))) throw "nouser";

    // Ermittle Vertraege, die vom eigenen Usernamen kommen
    var maintable = document.getElementsByTagName('table')[0];
    var maintable_rows = maintable.getElementsByTagName('tr');

    var vids = loadvids();
    var vid2v = {};
    for(vid in vids) {
      vid2v[vids[vid]] = vid;
    }

    var headrow = false;
    var contractstor = {};
    
    for(i=0; i< maintable_rows.length; i++) {
      var maintable_cells = maintable_rows[i].getElementsByTagName('td');      
      if(maintable_cells.length == 1) {
        if(headrow === false)
          headrow = i;
        else
          break;
      } else if((headrow !== false) && (i > headrow+1)) {
        // Gehe alle erhaltenen Vertraege durch,
        // aber beachte nur die von uns selbst
        if(maintable_cells[2].innerHTML == user["name"]) {
          // Dieser Vertrag kommt von uns - vermutlich Ersatzlager
          var stor_v = maintable_cells[1];
          while((stor_v.nodeType != 3) && stor_v.hasChildNodes) { stor_v = stor_v.firstChild; }
          stor_v = stor_v.nodeValue;
          // Es wurden Pflanzen ausgeblendet
          if(stor_v.indexOf('...') > -1) {
            maintable_rows[headrow].getElementsByTagName('td')[0].innerHTML += '<br><font color="#ff0000"><b>' + locale["contractcutplants"] + '</b></font>';
            maintable_cells[1].firstChild.style.color = "#ff0000";
          }
          stor_v = stor_v.split(', ');
          for(j=0; j<stor_v.length;j++) {
            var act_v = stor_v[j].split(' x ');
            act_v[0] = parseInt(act_v[0], 10);
            if(vids[act_v[1]] != null) {
              contractstor['v_'+vids[act_v[1]]] = (contractstor['v_'+vids[act_v[1]]] == null) ? act_v[0] : contractstor['v_'+vids[act_v[1]]] + act_v[0];
            }
            delete act_v;
          }
          delete stor_v;
        }
      }
    }
    wholeStorage = loadstorage();
    // userid liegt als String vor
    wholeStorage["u_" + user["id"]] = contractstor;
    GM_setValue(country+"_"+server + '_storage', JSON.stringify(wholeStorage));
    
    // Aktualisiere die Storagedaten im Hauptfenster
    inj = "top.contractStorage=" + JSON.stringify(contractstor) + ";";
    inj += "top.updateKundenBlasen();";

    window.location.href='javascript:(function(){'+inj+'})();';
    
    delete contractstor;
    
  } catch (e) {
  }
}

function loadContractStorage() {
  try {
    // Ermittle Usernamen und ID
    if(!(user = getUserDetails(top.document))) throw "nouser";
    wholeStorage = loadstorage();
    actStorage = wholeStorage["u_"+user["id"]];
    delete wholeStorage;
    if(actStorage != null) {
      inj = "top.contractStorage=" + JSON.stringify(actStorage) + ";";
      inj += "top.updateKundenBlasen();";
      window.location.href='javascript:(function(){'+inj+'})();';
    }
    delete actStorage;
    delete user;
  } catch (e) {
  }
}

// Kunden-Info-Blasen (Script-Injektion)
function addCustomerFunc() {
  vids = loadvids();
  var inj = 'window.vid2v = new Array();';
  for(vid in vids) {
    inj += 'window.vid2v['+vids[vid]+']=\''+vid+'\';';
  }
  // Erstelle Array in main.php?page=garden
  window.location.href='javascript:(function(){'+inj+'})();';

        // Hätt' mir auch wer sagen können, dass es rackElement gibt >.>
  inj = 'top.KundePlusBestellung = function(htmlObj, htmlBlase, D, G, C) {';
  inj +=   'htmlObj.style.zIndex = 20+parseInt(D.substring(1,D.length),10); htmlBlase.style.zIndex = 60+parseInt(D.substring(1,D.length),10);';
  inj +=   'var wantedV = new Array(), wantedM = new Array(), dummy = new Array(); wantedV = G.split(\':\'); for(i=0; i<wantedV.length;i++) dummy[i] = parseInt(wantedV[i], 10); wantedV = dummy; dummy = new Array(); wantedM = C.split(\':\'); for(i=0; i<wantedM.length;i++) dummy[i] = parseInt(wantedM[i], 10); wantedM = dummy; allOk = true; missstr = \'\';';
  inj +=   'if((wantedV.length == wantedM.length) && top.vid2v) { for(i=0; i<wantedV.length; i++) { if(top.vid2v[wantedV[i]]) { dummy = top.rackElement[wantedV[i]]; if(!isNaN(dummy.number)) { have = (typeof dummy.number == \'number\') ? dummy.number : parseInt(dummy.number, 10); } else { have = 0; } miss = wantedM[i] - have; if(miss>0) { if(top.contractStorage != null) { dummy = top.contractStorage["v_" + wantedV[i]]; if((dummy != null) && !isNaN(dummy)) { have += dummy; } } if(dummy>0) missstr += \'<img src="' + symb_contract + '" alt="">\'; miss = wantedM[i] - have; if(miss>0) { missstr += \'<img src="' + symb_market + '" alt="">\'; } missstr += \' \' + top.vid2v[wantedV[i]] + \'<br>\'; } } else { allOk = false; } }} else { allOk = false;}if(allOk) { if(missstr.length) { missstr = missstr.substr(0,missstr.length-4); htmlBlase.innerHTML += \'<div id="m\'+D.substring(1,D.length)+\'" style="position:relative;left:-23px;top:-10px;-moz-border-radius: 5px;-webkit-border-radius: 5px;padding:3px;border:solid thin red;color: black;background-color: #FFDDDD;width:95px;font-size:0.8em; z-index:60;">' + locale["missing"] + ':<br>\'+missstr+\'</div>\'; } else { htmlBlase.innerHTML += \'<div id="m\'+D.substring(1,D.length)+\'" style="position:absolute;top:38px;-moz-border-radius: 5px;-webkit-border-radius: 5px;padding:3px;border:solid thin green;color: black;background-color: #DDFFDD;width:70px;font-size:0.8em; z-index:100;">' + locale["allonstock"] + '</div>\'; }}';
  inj += '}; ';

  inj += 'top.updateKundenBlasen = function() {';
  inj +=   'for(kid in top.kunden) {';
  inj +=     'if(typeof top.kunden[kid] != "object" || kid.substring(0,1) != "i") continue;';
  inj +=     'f = top.kunden[kid].mapId;';
  inj +=     'htmlBlase = top.kunden[kid].htmlBlase;';
  inj +=     'kunddoc = htmlBlase;';
  inj +=     'kundeMiss = null;';
  inj +=     'while(kunddoc != "[object HTMLDocument]" && kunddoc != null) {';
  inj +=       'kunddoc = kunddoc.parentNode;';
  inj +=     '}';
  inj +=     'if(kunddoc != null) {';
  inj +=       'kundeMiss = kunddoc.getElementById("m"+f.substring(1,f.length));';
  inj +=     '}';
  inj +=     'if(kundeMiss) {';
  inj +=       'htmlBlase.removeChild(kundeMiss);';
  inj +=     '}';
  inj +=     'if(top.kunden[kid].htmlObj.id.substr(0,4) != \'gone\') top.KundePlusBestellung(top.kunden[kid].htmlObj, htmlBlase, top.kunden[kid].mapId, top.kunden[kid].p_string, top.kunden[kid].a_string);';
  inj +=   '}';
  inj += '}; ';

/*
  inj += 'Kunde = function(A,D,B,G,C,F,E,H){';
  inj +=   'this.kundenId=A;this.mapId=D;this.pic=B;this.p_string=G;this.a_string=C;this.htmlObj=verkauframe.document.getElementById(this.mapId);this.htmlBlase=verkauframe.document.getElementById("blase"+this.mapId);this.left=F;this.top=E;this.blaseleft=parseInt(this.htmlBlase.style.left.substring(0,this.htmlBlase.style.left.length-2),10);this.blasetop=parseInt(this.htmlBlase.style.top.substring(0,this.htmlBlase.style.top.length-2),10);this.id=H; KundePlusBestellung(this.htmlObj, this.htmlBlase, D, G, C);';
  inj += '}; ';
*/

  inj += 'top._Kunde = Kunde;';
  inj += 'Kunde = function() {';
  inj +=   '_Kunde.apply(this, arguments);';
  inj +=   'KundePlusBestellung(this.htmlObj, this.htmlBlase, this.mapId, this.p_string, this.a_string);';
  inj += '}; ';
        

  inj += 'top._updateRack = updateRack; updateRack = function(h,r) {';
  inj +=   'if(r!==null) {';
  inj +=     'top._updateRack(h,r);';
  inj +=   '} else {';
  inj +=     'top._updateRack(h);';
  inj +=   '}';
  inj +=   'top.updateKundenBlasen();';
  inj += '}; ';

  window.location.href='javascript:(function(){'+inj+'})();';
}

// Standardpreise für Pflanzen ermitteln (hilfe.php?item=2)
function getNPCcosts() {
  Kosten = {};
  tablebody = document.getElementsByTagName('colgroup')[0].parentNode;
  allRows = tablebody.getElementsByTagName('tr');
  allesok = true;
  vids = loadvids();
  npccosts = loadnpccosts();
  actDB = loaddb();
  for(i=1; i < allRows.length; i++) {
    allCells = allRows[i].getElementsByTagName('td');
    dummy = allCells[1].innerHTML;
    vid = (vids[allCells[0].innerHTML] != null) ? vids[allCells[0].innerHTML] : -1;
    if(vid == -1) {
      // uns fehlen anscheinend IDs, User hinweisen
      allesok = false;
      continue;
    }
    Kosten[allCells[0].innerHTML] = parseInt(dummy.substring(0, dummy.indexOf(' ')).replace(',', '').replace('.',''), 10);
  }
  for(k in Kosten) {
    if(!actDB['data']['v_'+vids[k]])
      actDB['data']['v_'+vids[k]] = newVeggie();
    npccosts[vids[k]] = Kosten[k];
  }
  GM_setValue('npccosts', JSON.stringify(npccosts));
  GM_setValue(country+"_"+server+'_data', JSON.stringify(actDB));
  alert(af(locale["helpnotallplantsknown"], 60));
}

function addGardenInfo() {
  // Zweigeteilt - Garten-Nummer wird noch nicht in allen Sprachen angezeigt
  addGlobalStyle('#garten_info { color:#FFFB48;position:relative; }');
  if(document.getElementById('garten_aktuell_nummer') != null) {
    document.getElementById('garten_aktuell_nummer').parentNode.innerHTML += ' |';
    newcont = document.getElementById('garten_aktuell_nummer').parentNode.parentNode;
    newcont.style.width = '550px';
    garten_info = document.createElement('span');
    garten_info.setAttribute('id', 'garten_info');
    garten_info.innerHTML = locale["infowater"] + ': <span id="water_time"></span> | ' + locale["infoharvest"] + ': <span id="harvest_time"></span> | ' + locale["infousable"] + ': <span id="usable_spaces"></span> | ' + locale["infounused"] + ': <span id="free_spaces"></span>';
    newcont.appendChild(garten_info);
  } else {
    coinsicon = document.getElementById('coinsicon');
    newcont = document.createElement('div');
    newcont.style.position = 'absolute';
    newcont.style.top = (parseInt(getComputedStyle(coinsicon.parentNode, '').top, 10)+2) + 'px';
    newcont.style.left = '30px';
    newcont.style.width = '550px';
    newcont.innerHTML = '<span id="garten_info">' + locale["infowater"] + ': <span id="water_time"></span> | ' + locale["infoharvest"] + ': <span id="harvest_time"></span> | ' + locale["infousable"] + ': <span id="usable_spaces"></span> | ' + locale["infounused"] + ': <span id="free_spaces"></span>';
    coinsicon.parentNode.parentNode.insertBefore(newcont, coinsicon.parentNode);
  }
}

function addGardenInfoFunc() {
  inj = 'javascript:(function(){';
  
  inj += 'window._AbrissResponse = AbrissResponse;';
  inj += 'AbrissResponse = function(request) {';
  inj +=   '_AbrissResponse(request);';
  inj +=   'if (request.readyState == 4) {';
  inj +=     'if (request.status == 200) {';
  inj +=       'response = eval("(" + request.responseText + ")");';
  inj +=       'if(response.success == 1) {';
  inj +=         'if(garten.usable_fields && garten.unused_fields) {';
  inj +=           'garten.usable_fields.push(parseInt(response.feld, 10));';
  inj +=           'garten.unused_fields.push(parseInt(response.feld, 10));';
  inj +=           'g(\'usable_spaces\').innerHTML = garten.usable_fields.length.toString();';
  inj +=           'g(\'free_spaces\').innerHTML = garten.unused_fields.length.toString();';
  inj +=         '}';
  inj +=       '}';
  inj +=     '}';
  inj +=   '}';
  inj += '}; ';
  
  inj += 'window.removeVal = function(searchArray, findVal) {';
  inj +=   'var a = this.findValPos(searchArray, findVal);';
  inj +=   'if(a != null) {';
  inj +=     'searchArray.splice(a, 1);';
  inj +=     'return true;';
  inj +=   '}';
  inj +=   'return false;';
  inj += '}; ';
  
  inj += 'window.contains = function(searchArray, findVal) {';
  inj +=   'return findValPos(searchArray, findVal) != null;';
  inj += '}; ';
  
  inj += 'window.findValPos = function(searchArray, findVal) {';
  inj +=   'for(var a=0; a<searchArray.length; a++) {';
  inj +=     'if(searchArray[a] === findVal) return a;';
  inj +=   '}';
  inj +=   'return null;';
  inj += '}; ';
  
  inj += 'window._PflanzResponse = PflanzResponse;';
  inj += 'PflanzResponse = function(request) {';
  inj +=   '_PflanzResponse(request);';
  inj +=   'if (request.readyState == 4) {';
  inj +=     'if (request.status == 200) {';
  inj +=       'response = eval("(" + request.responseText + ")");';
  inj +=       'if(response.success == 1) {';
  inj +=         'for (var i = 0; i < response.elems; i++) {';
  inj +=           'for (var j = 0; j < response.felder[i].length; j++) {';
  inj +=             'garten.addWaterPlant(parseInt(response.felder[i][j], 10));';
  inj +=             'garten.harvest_plants.push(parseInt(response.felder[i][j], 10));';
  inj +=             'removeVal(garten.unused_fields, parseInt(response.felder[i][j], 10));';
  inj +=           '}';
  inj +=         '}';
  inj +=         'with(garten) {';
  inj +=           'water_plants.sort(sortWater);';
  inj +=           'harvest_plants.sort(sortHarvest);';
  inj +=         '}';
  inj +=       '}';
  inj +=     '}';
  inj +=   '}';
  inj += '}; ';

  inj += 'window._WasserResponse = WasserResponse;';
  inj += 'WasserResponse = function(request) {';
  inj +=   '_WasserResponse(request);';
  inj +=   'if (request.readyState == 4) {';
  inj +=     'if (request.status == 200) {';
  inj +=       'response = eval("(" + request.responseText + ")");';
  inj +=       'if(response.success == 1) {';
  inj +=         'for (var i = 0; i < response.elems; i++) {';
  inj +=           'for (var j = 0; j < response.felder[i].length; j++) {';
  inj +=             'if(!garten.waterCheckTime(parseInt(response.felder[i][j], 10))) {';
  inj +=               'removeVal(garten.water_plants, parseInt(response.felder[i][j], 10));';
  inj +=             '}';
  inj +=           '}';
  inj +=         '}';
  inj +=         'with(garten) {';
  inj +=           'water_plants.sort(sortWater);';
  inj +=           'harvest_plants.sort(sortHarvest);';
  inj +=         '}';
  inj +=       '}';
  inj +=     '}';
  inj +=   '}';
  inj += '}; ';
  

  inj += 'window._ErnteResponse = ErnteResponse;';
  inj += 'ErnteResponse = function(request) {';
  inj +=   '_ErnteResponse(request);';
  inj +=   'if (request.readyState == 4) {';
  inj +=     'if (request.status == 200) {';
  inj +=       'response = eval("(" + request.responseText + ")");';
  inj +=       'top._save_response = response;';
  inj +=       'if(response.success == 1) {';
  inj +=         'for (var i = 0; i < response.feld.length; i++) {';
  inj +=           'for (var j = 0; j < response.felder[i].length; j++) {';
  inj +=             'if(!(response.zufrueh == 1 &&  response.kategorie[i] == "z")) {';
  inj +=               'removeVal(garten.water_plants, parseInt(response.felder[i][j], 10));';
  inj +=               'removeVal(garten.harvest_plants, parseInt(response.felder[i][j], 10));';
  inj +=               'garten.unused_fields.push(parseInt(response.felder[i][j], 10));';
  inj +=             '}';
  inj +=           '}';
  inj +=         '}';
  inj +=         'with(garten) {';
  inj +=           'water_plants.sort(sortWater);';
  inj +=           'harvest_plants.sort(sortHarvest);';
  inj +=         '}';
  inj +=         'g(\'free_spaces\').innerHTML = garten.unused_fields.length.toString();';
  inj +=       '}';
  inj +=     '}';
  inj +=   '}';
  inj += '}; ';

  inj += '})();';

  window.location.href = inj;

}

function updateGardenInfo() {
  inj = 'javascript:(function(){';
  
  inj += 'window.secondsToTime = function(calc_seconds) {';
  inj +=   'var dummy;';
  inj +=   'var giveback = \'\';';
  inj +=   'var remain_time = new Array();';
  inj +=   'remain_time["days"] = Math.floor(calc_seconds/86400);';
  inj +=   'remain_time["hours"] = Math.floor(calc_seconds%2586400/3600);';
  inj +=   'remain_time["minutes"] = Math.floor(calc_seconds%253600/60);';
  inj +=   'remain_time["seconds"] = Math.floor(calc_seconds%2560);';
  inj +=   'for(timepart in remain_time) {';
  inj +=     'remain_time[timepart] = ((remain_time[timepart] > 9) || (timepart == "days")) ? remain_time[timepart].toString() : "0" + remain_time[timepart].toString();';
  inj +=   '}';
  inj +=   'if(remain_time["days"] != "0") giveback += remain_time["days"] + ":";';
  inj +=   'giveback += remain_time["hours"] + ":" + remain_time["minutes"] + ":" + remain_time["seconds"];';
  inj +=   'return giveback;';
  inj += '}';
  
  inj += '})();';

  window.location.href = inj;

  inj = 'javascript:(function(){';
  
  // Benötigen Sortierfunktionen
  inj +=   'window.sortWater = function (a, b) {';
  inj +=     'return garten_wasser[a] - garten_wasser[b];';
  inj +=   '}; ';
  
  inj +=   'window.sortHarvest = function (a, b) {';
  inj +=     'return garten_zeit[a] - garten_zeit[b];';
  inj +=   '}; ';
  
  inj +=   'window.updateTimes = function() {';
  inj +=     'next_water = garten_wasser[water_plants[0]];';
  inj +=     'next_harvest = garten_zeit[harvest_plants[0]];';
  inj +=     'if(next_water == null) {';
  inj +=       'next_water = \'-\';';
  inj +=     '} else {';
  inj +=       'next_water = 86400 + next_water - top.Zeit.Client + top.Zeit.Verschiebung;'; // Eingetragen ist der Zeitpunkt des Gießens
  inj +=       'if(next_water < 0) {';
  inj +=         'next_water = \'' + locale["infonow"] + '\';';
  inj +=       '} else {';
  inj +=         'next_water = secondsToTime(next_water);';
  inj +=       '}';
  inj +=     '}';
  inj +=     'if(next_harvest == null) {';
  inj +=       'next_harvest = \'-\';';
  inj +=     '} else {';
  inj +=       'next_harvest = next_harvest - top.Zeit.Client + top.Zeit.Verschiebung;';
  inj +=       'if(next_harvest < 0) {';
  inj +=         'next_harvest = \'' + locale["infonow"] + '\';';
  inj +=       '} else {';
  inj +=         'next_harvest = secondsToTime(next_harvest);';
  inj +=       '}';
  inj +=     '}';
  inj +=     'top.document.getElementById(\'water_time\').innerHTML = next_water;';
  inj +=     'top.document.getElementById(\'harvest_time\').innerHTML = next_harvest;';
  inj +=     'top.document.getElementById(\'usable_spaces\').innerHTML = usable_fields.length;';
  inj +=     'top.document.getElementById(\'free_spaces\').innerHTML = unused_fields.length;';
  inj +=   '}; ';
  
  inj +=   'window.waterCheckTime = function(newPlant) {';
  inj +=     'return ((garten_wasser[newPlant] + 86400) < garten_zeit[newPlant]);';
  inj +=   '}; ';
  
  inj +=   'window.addWaterPlant = function(newPlant) {';
  inj +=     'if(waterCheckTime(newPlant)) {';
  inj +=       'water_plants.push(newPlant);';
  inj +=     '}';
  inj +=   '}; ';
  
  inj +=   'water_plants = new Array();';
  inj +=   'harvest_plants = new Array();';
  inj +=   'usable_fields = new Array();';
  inj +=   'unused_fields = new Array();';
  inj +=   'for(j=1;j<=204;j++) {';
  inj +=     'if(garten_kategorie[j] == \'u\') {';
  inj +=     '} else {';
  inj +=       'usable_fields.push(j);';
  inj +=       'if (garten_kategorie[j] == \'\') {';
  inj +=         'unused_fields.push(j);';
  inj +=       '} else if(garten_kategorie[j] == \'v\') {';
  inj +=         'addWaterPlant(j);';
  inj +=         'harvest_plants.push(j);';
  inj +=       '}';
  inj +=     '}';
  inj +=   '}';
  inj +=   'water_plants.sort(sortWater);';
  inj +=   'harvest_plants.sort(sortHarvest);';
  inj +=   'updateTimes();';
  inj +=   'window.updateTimesInterval = window.setInterval("updateTimes();",1000);';

  inj += '})();';
  window.location.href = inj;
}

// Marktstandfenster beobachten
function watchit() {
  // alert("Kuckuck");
  stadtframe = document.getElementById("stadtframe");
  // watch-Funktion nicht möglich bei XPCNativeWrapper
/*
  stadtframe.style.watch("display", function(prop, oldval, newval) {
    alert([prop,oldval,newval].join("\n")); return newval; });
*/
}

/************************************************************
***                                                       ***
***                    Konfiguration                      ***
***                                                       ***
*** Stellt eigentlich einen Unterbereich der Seiten-      ***
*** Funktionen da.                                        ***
*** Aktuell möglich:                                      ***
***   - Downloadoption de-/aktivieren (nur lokale Daten   ***
***                                    nutzen)            ***
***   - Uploadfunktion de-/aktivieren (Daten nur lokal    ***
***                                    benutzen)          ***
***   - Updateinformationen anzeigen lassen               ***
***                                                       ***
*** showWimperWin: Anzeigen des Konfigurationsfensters    ***
***                und Laden der zuletzt gespeicherten    ***
***                Einstellungen                          ***
*** save_config: Speichern der Einstellungen und          ***
***              Schließen des Fensters                   ***
*** addMenu: Hauptfunktion                                ***
***          Erstellt das Konfigurationsfenster           ***
***          Fügt WIMPer-Button ein                       ***
***          Modifiziert vorgegebene Funktionen um auch   ***
***          WIMPer-Fenster zu schließen.                 ***
***                                                       ***
************************************************************/

// Menupunkt hinzufügen
function showWimperWin(e) {
  window.location.href = "javascript:_old_close_page();";
  upimg = document.getElementById('update_wimp');

  conf = loadconf();
  show_update = GM_getValue("update", false);
  if(show_update) {
    updatecont = '<img id="update_wimp" title="' + locale["updatelinktitle"] + '" class="link" style="width:14px;height:14px;" />';
  } else {
    updatecont = locale["questionshowupdatenotice"];
  }
  wupd = document.getElementById('wimper_update');
  wupd.innerHTML = updatecont;
  if(show_update) {
    upimg = document.getElementById('update_wimp');
    upimg.addEventListener('click', script_update, true);
    upimg.src = updateS;
  } else {
    try {
      // Falls vorher ein UpdateLink existierte, der nun aber weg sein sollte
      // Sollte eigentlich nicht vorkommen, kann aber beim Basteln passieren
      upimg.removeEventListener('click', script_update, true);
    } catch(e) {};
  }

  document.getElementById('data_upload').checked = conf['upload'];
  document.getElementById('data_download').checked = conf['download'];
  document.getElementById('update_info').checked = conf['update'];
  document.getElementById('color_links').checked = conf['color_links'];
  document.getElementById('color_exp').checked = conf['color_exp'];
  document.getElementById('wimpoffer').value = conf['wimpoffer'].toString();
  confw = document.getElementById('wimper_window');
  confw.style.display = 'block';
//  mframe = document.getElementById('multiframe');
  confc = document.getElementById('wimper_conf');
//  confc.style.top = mframe.style.top;
  confc.style.top = '60px';
  confc.style.display = 'block';
}

function save_config(e) {
  dummy = document.getElementById('wimpoffer');
  dummy.value = dummy.value.replace(/[^\d]/g, '');
  if(!dummy.value.length)
    dummy.value = '90';
  delete dummy;
  newconf = {
    'upload'      : document.getElementById('data_upload').checked,
    'download'    : document.getElementById('data_download').checked,
    'update'      : document.getElementById('update_info').checked,
    'color_links' : document.getElementById('color_links').checked,
    'color_exp'   : document.getElementById('color_exp').checked,
    'wimpoffer'   : parseInt(document.getElementById('wimpoffer').value, 10)
  };
  GM_setValue(country+"_"+server+'_set', JSON.stringify(newconf));
  e.stopPropagation();
  e.preventDefault();
  window.location.href="javascript: close_page();";
}

function addMenu() {
  addGlobalStyle('.leftcol { border-right: 1px solid black; text-align: right; padding-right: 10px; padding-top: 0px; vertical-align: top; }; .rightcol { padding-left: 10px; padding-top: 0px; vertical-align: top; }');
  addGlobalStyle('#wimpoffer { width: 40px; text-align: right}');
  menuimg = document.createElement('img');
  menuimg.src = menuB;
  menuimg.setAttribute('id', 'wimper');
  menuimg.setAttribute('class', 'link');
  menuimg.addEventListener('click', showWimperWin, true);
  menuimg.style.position = 'relative';
  menuimg.style.marginLeft = '5px';
  logB = document.getElementById('logout');
  logB.parentNode.insertBefore(menuimg, logB);
  window.location.href = 'javascript:(function(){top.Event.add(g("wimper"),"mouseover",function(){minfo("WIMPer")});top.Event.add(g("wimper"),"mouseout",clr);})();';

  // Mache Grafikpaket aus
  _GFX = getGFX();
/*
  _GFX = 'http://d3o68bgrbhx8hn.cloudfront.net/';
  try {
    sc = document.getElementsByTagName('script')[0];
    sc = sc.innerHTML;
    sc = sc.substring(sc.indexOf('var _GFX = ')+11, sc.length);
    _GFX = sc.substring(1, sc.indexOf(';')-1);

  } catch(e) {
    _GFX = 'http://d3o68bgrbhx8hn.cloudfront.net/';
  }
*/
  // Konfigurationsfenster
  pgarden = document.getElementById('popup_garden');
  confw = document.createElement('div');
  confw.setAttribute('id', 'wimper_window');
  confw.setAttribute('class', 'lock');
  confw.style.position = 'absolute';
  confw.style.zIndex = 2;
  // Der Blocker von Wurzelimperium liegt zu tief
  pgarden.style.top = (parseInt(getComputedStyle(document.getElementById('coinsicon').parentNode, '').top, 10) + parseInt(getComputedStyle(document.getElementById('coinsicon').parentNode, '').height, 10) + 1) + 'px';
  confw.style.top = pgarden.style.top;
  confw.style.margin = '0px';
  confw.style.width = '720px';
  confw.style.height = '640px';
  confcont = '<div frameborder="0" id="wimper_conf" style="z-index:3;position:absolute;display:none;top:350px;margin-left:60px;width:600px;height:400px;background:url(\'' + _GFX + 'pics/popin/profil/bg_profil.jpg\') top left no-repeat;" scrolling="no" allowtransparency="true"><div class="link2" style="position:absolute; top:5px;right:5px;"><img src="' + _GFX + 'pics/close.jpg" onclick="top.close_page()" /></div><form id="wimper_form" name="wimper_form" action=""><table cellspacing="0" cellpadding="0" style="width:550px;position:absolute;top:15px;left:25px;"><colgroup><col width="110px"></col><col width="440px"></col></colgroup><tr><td colspan="2" align="center" class="tbig" style="color: #000000;">WIMPer</td></tr><tr><td colspan="2">&nbsp;</td></tr><tr><td colspan="2" align="center"><b>' + locale["configwelcome"] + '</b><br>(' + locale["version"] + ': ' + ver +')</td></tr><tr><td colspan="2" style="height: 10px">&nbsp;</td></tr><tr style="height:10px"><td colspan="2" align="center"><span align="justify">' + locale["configwarning"] +'</span></td></tr><tr style="height:22px"><td colspan="2" align="center"><span align="justify">' + locale["configdiscussionlink"] +'</span></td></tr><tr><td colspan="2" style="height: 10px">&nbsp;</td></tr><tr style="height:20px;"><td class="leftcol">' + locale["configdownload"] + '</td><td class="rightcol"><input class="normal2 checkbox" type="checkbox" id="data_download" name="data_download" /> ' + locale["configdownloadquestion"] +'</td></tr><tr style="height:20px;"><td class="leftcol">' + locale["configupload"] + '</td><td class="rightcol"><input class="normal2 checkbox" type="checkbox" id="data_upload" name="data_upload" /> ' + locale["configuploadquestion"] +'</td></tr><tr style="height:20px;"><td class="leftcol">' + locale["configupdateinfo"] + '</td><td class="rightcol"><input class="normal2 checkbox" type="checkbox" id="update_info" name="update_info" /> <span id="wimper_update"></span></td></tr><tr style="height:20px;"><td class="leftcol">' + locale["configwimpoffer"] + '</td><td class="rightcol"><span title="' + locale["configwimpoffertitle"] +'"><input type="text" class="normal2 msg_input" id="wimpoffer">' + locale["configwimpoffernotice"] + '</span></td></tr><tr style="height:20px;"><td class="leftcol">&nbsp;</td><td class="rightcol">&nbsp;</td></tr><tr style="height:20px;"><td class="leftcol">&nbsp;</td><td class="rightcol">&nbsp;</td></tr><tr style="height:20px;"><td class="leftcol">' + locale["configcolorlinks"] + '</td><td class="rightcol"><input class="normal2 checkbox" type="checkbox" id="color_links" name="color_links" /> <span title="' + locale["configcolorlinkstitle"] + '">' + locale["configcolorlinksnotice"] + '</span></td></tr><tr style="height:20px;"><td class="leftcol">' + locale["configmarkoverprice"] + '</td><td class="rightcol"><input class="normal2 checkbox" type="checkbox" id="color_exp" name="color_exp" /> ' + locale["configmarkoverpricenotice"] + '</span>';
  confcont += '</td></tr><tr style="height:20px"><td colspan="2" align="center">&nbsp;</td></tr><tr><td colspan="2" align="center"><input class="link2" type="submit" name="submit_profile" value="' + locale["configsubmitbutton"] + '" /></td></tr></table></form></div>';
  confw.innerHTML = confcont;
  pgarden.parentNode.insertBefore(confw, pgarden.nextSibling);
  wform = document.getElementById('wimper_form');
  wform.addEventListener('submit', save_config, true);
  inputwimpoffer = document.getElementById('wimpoffer');
  inputwimpoffer.addEventListener('keydown', checkNumberInput, true);
  inputwimpoffer.addEventListener('keyup', checkNumberInput, true);

  window.location.href = 'javascript:(function(){window._old_close_page = close_page; close_page = function(){ g("wimper_window").style.display="none"; g("wimper_conf").style.display="none"; _old_close_page();}})();';
  window.location.href = 'javascript:(function(){window._old_show_page = show_page; show_page = function(e,a){ g("wimper_window").style.display="none"; g("wimper_conf").style.display="none"; _old_show_page(e,a);}})();';
  window.location.href = 'javascript:(function(){window._old_waehleGarten = waehleGarten; waehleGarten = function(e,a){ g("wimper_window").style.display="none"; g("wimper_conf").style.display="none"; _old_waehleGarten(e,a);}})();';
}

function showUpdateInfo() {
  lun = loadlun();
  if(lun['ver']<ver) {
    // Billigtrick, um auch in Javascript den korrekten
    // Zeichensatz zu haben
    var dummy = document.createElement('div');
    dummy.innerHTML = locale["actualupdatenotice"];
    alert(af(dummy.innerHTML, 60));
    delete dummy;
    GM_setValue('lun','{"ver":'+ver+'}');
    GM_setValue('update',0);
  }
  delete lun;
}

/************************************************************
***                                                       ***
***                    Daten-Transfer                     ***
***                                                       ***
*** Übertragen werden die Kosten der Pflanzen             ***
*** je nach Server. Userrelevante Daten werden NICHT      ***
*** versendet.                                            ***
***                                                       ***
************************************************************/

function updatedb(tablebody, vid, costs) {
  var data = {};
  vid = (typeof vid == 'number') ? vid.toString() : vid;
  data["country"] = country;
  data["server"]  = server;
  data[vid]       = costs;
  data = encodeURIComponent(JSON.stringify(data));
  GM_xmlhttpRequest({
    method:"GET",
    url:"http://wi.bogaag.de/updatedb.php?data=" + data,
    headers:{
      "User-Agent":"WIMP-Transmitter "+prot,
      "Accept":"text/json",
      "Connection":"Close"
    },
    onload:function(response) {
      try {
        var respdata = JSON.parse(response.responseText);
        var tmpstmp = Math.round((new Date()).getTime()/1000);
        var timeshift = tmpstmp - respdata["time"];
        GM_setValue("timeshift", timeshift);
        respdata['v'] = (typeof(respdata['v']) == 'string') ? parseFloat(respdata['v']) : respdata['v'];
        if(respdata['v'] > ver) { update_inform(); } else { GM_setValue('update', false); }

        marketAddLine(tablebody, locale["costssent"]);
      } catch(e) {
        marketAddLine(tablebody, locale["sendfailed"]);
      }

    }
  });
}

function getupdate() {
  actDB = loaddb();
  
  imgs = document.getElementsByTagName('img');
  for(i=0; i<imgs.length;i++) {
    imgs[i].removeEventListener('click', getupdate, true);
    imgs[i].removeAttribute('class');
  }
  
  _GFX = getGFX();

  limg = document.createElement('img');
  limg.setAttribute('id', 'loadingimg');
  limg.src = _GFX + 'pics/loading.gif'; //53x53
  limg.style.position = 'absolute';
  limg.style.left = '133px';
  limg.style.top = '173px';
  limg.style.display = 'block';
  document.getElementsByTagName('body')[0].insertBefore(limg, null);

  // eigentliche Datenabfrage hier
  GM_xmlhttpRequest({
    method:"GET",
    url:"http://wi.bogaag.de/data.php?server=" + server + "&country=" + encodeURIComponent(country),
    headers:{
      "User-Agent":"WIMP-Transmitter "+prot,
      "Accept":"text/json",
      "Connection":"Close"
    },
    onload:function(response) {
      try {
        var respdata = JSON.parse(response.responseText);
        var tmpstmp = jetzt();
        var timeshift = tmpstmp - respdata["time"];
        GM_setValue("timeshift", timeshift);
        respdata['v'] = (typeof(respdata['v']) == 'string') ? parseFloat(respdata['v']) : respdata['v'];
        if(respdata['v'] > ver) { update_inform(); } else { GM_setValue('update', false); }
        switch (respdata["result"]) {
          case 1:
            // Protokollfehler
          case 0:
            // Lese Daten vom Server aus und konvertiere bei Bedarf die Datentypen
            dummy = respdata["data"][server];
            if(dummy != null) {
              for(vid in dummy) {
                if(!actDB["data"]['v_'+vid])
                  actDB["data"]['v_'+vid] = newVeggie();
                if(parseInt(dummy[vid]['time'], 10) + timeshift >= actDB["data"]['v_'+vid]['mtime']) {
                  actDB["data"]['v_'+vid]['costs'] = parseInt(dummy[vid]['costs'], 10);
                  actDB["data"]['v_'+vid]['stime'] = parseInt(dummy[vid]['time'], 10) + timeshift;
                }
              }
              actDB['dtime'] = tmpstmp;
              GM_setValue(country+"_"+server+'_data', JSON.stringify(actDB));
            }
            break;
          default:
            alert(af(locale["erroroccured"], 60));
        }
      } catch(e) {
      }
      if(limg = document.getElementById('loadingimg'))
        limg.style.display = 'none';
      window.location.href = window.location.href;
    }
  });

}

/************************************************************
***                                                       ***
***                        Anfang                         ***
***                                                       ***
************************************************************/

var ver = 1.0, prot="Gurke";

UrlParams = getParams();
if(page == 'markt') {
  UrlParams['page'] = (UrlParams['page'] == undefined) ? 1 : parseInt(UrlParams['page']);
}
switch (page) {
  case "vertraege/":
    switch (subpage) {
      case "overview":
        getContractStorage();
        break;
    }
    break;
  case "stadt/":
    switch (subpage) {
      case "markt":
        if(UrlParams['show'] && UrlParams['show'] == 'overview') {
          getIDs();
        } else {
          if(UrlParams['v'] && UrlParams['v'] != "")
            scan();
          paintExp();
        }
        break;
    }
    break;
  case "":
    switch (subpage) {
      case "verkauf":
        wimp();
        break;

      case "hilfe":
        if(UrlParams['item'] == '2')
          getNPCcosts();
        addHelpMenu();
        break;

      case "main":

        addMenu();
        addGardenInfo();
        addGardenInfoFunc();
        addCustomerFunc();
        loadContractStorage();
        // watchit();
        showUpdateInfo();
        break;
      case "garten_map":
        updateGardenInfo();
        break;
    }
}

// Notiz: Nicht eingerücktes Ende der Ladebedingung.
}


