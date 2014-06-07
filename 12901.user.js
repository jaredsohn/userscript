// ==UserScript==
// @name           Fast look up JP and EN
// @namespace      http://d.hatena.ne.jp/jimo1001/
// @description    Fast look up Japanese and English character strings.
// @include        *
// ==/UserScript==

// iframe内では実行させない
try { if(top !== self) throw 0 }catch([]){ return }

var VERSION = "2010.10.22.2";

var SITEINFO_IMPORT_URLS = [
    'http://wedata.net/databases/FluJE/items.json',
];

//-----------------------------------------------------------------------------
// SPACE ALC(英辞郎 on the WEB)はコメントを外せば利用できますが、『英辞郎 on the Web』の利用規約に違反しますので自己責任で行ってください.
//-----------------------------------------------------------------------------
var LOCAL_SITEINFO = [
//    {
//    	name: "SPACE ALC(英辞郎)",
//    	url: "http://eow.alc.co.jp/[context]/UTF-8/",
//    	icon: "data:image/gif;base64,R0lGODlhEAAQALMAABQSFI+Qj8/Pz1FRUbGxsefp53Nzc6KjouDf4GNkY769vvz+/ICCgCQmJJmYmVxaXCH5BAAAAAAALAAAAAAQABAAAwRocElZThqGzC1Pe4cgOE/ALUx2IJtjbASzEIPCObL0SuyZSAHBiUM4oIYcRFCzKfQmhQDhYTAkEg+AI7l9ChJCjsI2YTAKw62EAEYW1IgBEhheOBLoJOMpUTwYBCIHDGpDAgcBDgp5ExEAOw==",
//    	xpath: "(id('searchWord')/strong | id('itemsNumber') | id('resultsList')//ul//li[position()<4])",
//    	NGxpath: "id('resultArea')//ul/div/ul",
//    	lang: "both",
//    	type: "dictionary",
//    	enc: "UTF-8"
//    },
];
var SITEINFO = [];

//=== Default settings ===
var DefaultSettings = function() {
    var s = {
	ver: VERSION,
	shortcutkey: {
	    navi_toggle: 'A-y',     // show toggle(open/close) navi
	    close_all: 'ESC',       // close all element
	    QL_run: 'y',            // Run quick Look up
	    site: [],
	},
	remove_result_all: true,
	enable_wheel_button: true,
	enable_modifier_key: true,  // push modifier key when select character strings.
	modifier_key: 'altKey',     // modifier key for selection.
	enable_effect : false,
	lookup_limit_length : 1200,
	lookup: {                   // word, search
	    ja: [],                 // default site of input japanese strings
	    en: [],                 // default site of input english strings
	    ja_type: 'dictionary',
	    en_type: 'dictionary',
	},
	translation: {              // for select text
	    JtoE: true,             // translate Japanese to English
	    ja_chars: '10',         // translate Japanese more than this number of characters
	    EtoJ: true,             // translate English to Japanese
	    en_words: '3',          // translate Enlish more than this number of words
	    ja: [],
	    en: [],
	}
    }
    return s;
}

var disableShortcutKey = [
    {
	url: "http://mail.google.com/",
    },
    {
	url: "http://docs.google.com/",
    },
    {
	url: "http://www.google.com/notebook/",
    }
]

//=== images ===
var IMAGES = {
    close: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAXCAYAAAD6FjQuAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAAd0SU1FB9gBFxEPCSG3H1gAAAEXSURBVEjH7ZQxioQwFIb/jELA3trWI2yTC2gnpJrFwwlTCyk8g0fwEBZWivBithCDo7O7MpBU80PQPPPzveQ9w9I0NXCsrusghEC4LAsAwJiVyRh7adh/N8ac1r2KHRUSEXwp1Fr7hx2PaX+kWZYBAJqmsWvzPD/Fjv5jWW5EBCKC1hpa69M7EUEpZaFEZEFKKfzl3+YWHMex2Rd4n9U+O2MMiqKwsbquf22Uo6/v+7Ub322Qd3y3aZpwZUgpAQBVVQEApJS46rWwKxmVZfkE2p5b/KpYFEXOb5BxHNeaBUHg7z/zAeOcr7BhGMA5xzzPzkBJkgBAGwohWgBfjjfXAvhmDw+1um+tf4c/Pd01D4e7+uijf/UDzMDkaVlBIbwAAAAASUVORK5CYII=',
    close_focused: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAXCAYAAAD6FjQuAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAAd0SU1FB9gBFxEOJH1zcmwAAAI6SURBVEjH7ZWxbhQxEIa/sb23iU4Q5Q3Scd21vAASSJSIJjxDxCvwCikp0l1HQZECiRrpKqR0ES8REuWS3K09ptjZxdnkolyRCkayfPbO/L/n94xPfk6nmSe2TycnTCcTwmqx2CjQAVrMm1i4urx80EFCeDRYjvFhsuXV1dqP3jlwriV1Duf9HR9NiawK2uaZdH2+4eb6uj2VOYmBh6oiOYcT4c3FBQDfd3d7wNfn5wB829np9zqM2DR38FoZm+b2naSEADElvAjiHMfjMW8XC16dnfW/AY7H4/agKZFUiSn9Je7u1PbazMr7sXkERFWCOceU+OI971Lqib6ORj04gOZMzpkIZKCx+ZaMF4NK2zInKS9e9dYaYBUjObdwyWJKkgjcDCo2/CqyGgGVzcFGbXsfDfhQhIOcea/KoUgPtjSiaGNl6+UgmZYV8LbREVUDos8ibANH0uZ5kHMPUBc4JXCpSKgL562CpC5kPRJBgHEROBMhA88K2ZzNZQJVud4pPtQD0k5aAYIITqSv0KxKyplKlVjIHS1WbV3WehibfKEgGdkpvTV28J5QVXjvERG8cyTVvrea5ZKUM16VBGzbnXVF0kv8wxbLdW3fvQ6Dfnys1cDzvT2AeZhOJnPg5RM//PMXp6cfZNZKu1WM2pTsOqErzk5ZKfpVrc2SqdaYgisTawXc7MNvgLAPzawN0nuCqqIr/KCiuz7uYpLFNUMy7mkDZuuz6jJzRUz3/A2zW5Vjf/O/vf/2r9of0FcAZ6gVKMEAAAAASUVORK5CYII=',
    maximize: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAXCAYAAAD6FjQuAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAAd0SU1FB9gBFxEUA2hUPdwAAAECSURBVEjH7ZU9boQwEIU/ByRL29ClS2txhDRcALmhSscRqSwuQJErcIFcARrMbBEiWbBIoKyp9klT2J4fv3n+UYDkeU5s9H1PCjDPMwAiAoBS6mFAuC4iG79HcyFSgGmauAIpgPf++mLrNoUtLctyN0nbtrvxYY6ntPFo/IbZelchmqbZHJCqqjYyrFn9jU8x29P2FLNxHA857/kdjU/PaFPX9b+0VYDcbrfox34Yhl9mSZJcc8+01pcU01qDMUYA0VoLEMW01mKMEQVQFMU38BmTWdd1KgXIsuwL8M65n+hv40J3tta+Ax6YFvPA5Jx7yrfwZq39WJLOKwv7/sIL8XEHfSOYLUXK0YIAAAAASUVORK5CYII=',
    maximize_focused: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAXCAYAAAD6FjQuAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAAd0SU1FB9gBFxEQMcTvqVgAAAFCSURBVEjH7ZRLjoJAEIa/mhTplWsS9nIDk7kBh/AcXsJ7eAhOMIln8AAaF2KQV1y0C+WhwODMyKz8EwKprqqPeqQFsMvlks1mw1iaTqcsFgsUoCgKiqLAWguAiHQGNc+ttS2/LhtAnucAV1iWZWRZNlplZW4FSNO0oo+hJElqWJIk5HnealOzpWEY9iYLgqCzzZ2wOI7/1Mah2NPpVMOiKKoqe/yrpmazWWtB1ut1awTNeBHhcDjcw56prG+uQ7HH47GG7XY74jgehG232x/ZS00mkxp2Pp+fms1+v//VTMv8CqCqOI7zbYDneb1nQ7GqWsMcx+m9NV6hCmaMQVVRVQSo9qhktxZTHozS4dS0Xb+NMeD7vgWsMcbePF7+GGOs7/tWXdcV13W/gE/GlciK8TW/vT/m/J/uVnA1YlVvvTWoCzHOs7tnGF6IAAAAAElFTkSuQmCC',
    minimize: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAXCAYAAAD6FjQuAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAAd0SU1FB9gBFxEXFi6kivQAAAC5SURBVEjH7ZK9DYMwEIU/m0g3BkUaj0DjVRgOsQkNM6DsgZCAS0Vk8eOkwSgSr7J97/R+ZOO916ZpcM5xNh7LYZ5nAFQVAGPM7kI4V9UNb+9tIzaOY7pk0zSlF1vXtK40rOmoxvX+cr+2xsVt6Cp0t/dBYglD7jXJ+r6PEsuyjM6rqvoqZkmITzJr47p1XcddW/u7WJZlaZKJSDKxNs/zous6RIRhGE4REhGM9/4JvIAWKLhx48Zf4w2OIF4eoa/2XgAAAABJRU5ErkJggg==',
    minimize_focused: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAXCAYAAAD6FjQuAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAAd0SU1FB9gBFxEWDMrdQs8AAAFGSURBVEjH7ZQ9bsJAEIW/RYu2oqRxQxFxBxrfwBdAuZHvEeUCvgENN6DxBRAFINvsrlxsCrTYsbHJ30aKlFd5Zt/MmzcaWcRx7DabDWmakuc5obBcLpE+sNZircU5B4AQ4m5R+9051+PdywEYYxoxrTVa62DOtNaN2OVywRgTTKyqqkasqiqMMb01dVfaXtPQGrv1PbGiKIKusSzLRux0Ot2cdafy6Lptc4cceu7xeHwvFtLZ+XxuxPb7PUVRDJIPh8Nos/l8Pvo+m82Y+KCua0KiruvGmZSS6XQ6SI6iaLTZWK3vL9vkob/GT+AmppS6BlIigNsdee3eYYpOUtwhtXPXbwlsF4vFarfboZTCWhvEmVIKEcfxE5ADW2AV8kjEC/CaJACss2yU7HlfQZZlyGcgedDs0RAfxST5xrSfwW/p/OMP4w3tcqDExRHCHwAAAABJRU5ErkJggg==',
    openSwitch: 'data:image/gif;base64,R0lGODlhEAAQAJECAP///6uopv///wAAACH5BAEAAAIALAAAAAAQABAAAAIbVI6Zpu0PIwRAImoPjrT353nSZpFjlaWqxbAFADs=',
    closeSwitch: 'data:image/gif;base64,R0lGODlhEAAQAJECAP///6uopv///wAAACH5BAEAAAIALAAAAAAQABAAAAIWVI6Zpu0Po5y0JoAzflrbD4aixUxCAQA7',
    o: 'data:image/gif;base64,R0lGODlhEAAQAIABANLS0////yH5BAEAAAEALAAAAAAQABAAAAIcjI+py+2PgARvznZDVjLS1R0hF26kVZnQyrZQAQA7',
    x: 'data:image/gif;base64,R0lGODlhEAAQAIABAJ+foP///yH5BAEAAAEALAAAAAAQABAAAAIdjI+py+1vAECSyRluu9px+HkctnSdUh0pxLYuVAAAOw==',
    indicator: 'data:image/gif;base64,R0lGODlhEAAQAPYAAAAAAAEBAQICAgMDAwQEBAgICA0NDRMTEx4eHiAgICIiIiQkJCgoKCkpKSoqKisrKzAwMDExMTU1NTs7Oz4+Pl1dXWpqamtra3FxcZSUlJiYmJmZmZubm5ycnJ2dnaKioqOjo6ioqKmpqaurq66urrCwsLGxsbKysry8vMXFxcrKyuXl5ejo6Orq6v///wYGBgsLCwwMDA4ODhAQEBQUFBUVFRgYGBoaGh0dHSwsLC4uLjIyMjMzM1BQUFZWVlxcXF9fX2BgYGFhYWRkZGZmZmdnZ3Nzc3h4eHp6ent7e4SEhI+Pj8bGxsnJydXV1djY2Nra2t3d3d7e3uLi4ufn5+vr6wkJCScnJzo6Ol5eXmhoaJqamqqqqq2tre3t7QUFBQ8PDxcXF9TU1N/f3+np6XJycgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/i1NYWRlIGJ5IEtyYXNpbWlyYSBOZWpjaGV2YSAod3d3LmxvYWRpbmZvLm5ldCkAIfkEAQoAAAAsAAAAABAAEAAABl9AgHA4IZEmw6RwIDikXK7UQSlkZDQVFrTloAoyq5UJBT0ZqINNWMTAYBBUYQQ0osSHgYlFUrgPFSUqHWd+AIAqHoR+eRddhXgNEASPAAsfIRCUCRwfD5QACQsCn6SlQQAh+QQBCgAAACwAAAAAEAAQAAAHaYAAgoMzPz8zg4mKSVNTSAQ4NwGJMD0+NiMrKyVJUlBDiT1MKkFDT05LKy4uTzeDPk0qRAQ7Ojssq1E4gzJARTWDBEpVVEaTADQ7MYoALzkNA4IvRydCzMzT1dfMNDwG2+Dh4uPk5ebngQAh+QQBCgAAACwAAAAAEAAQAAAHaIAAgoMCCgoCg4mKEyYmEwAEA4oACQsAFioqWhBbGQyJCRwfDA0eHhIfKysZiIILHyEQAAYGVlyqGpKCAg8QBIkUXCdZB5OTVyhVKVjGiRgu0F3Ng8/R04IIJ17L14IyDzTd4uPk5eaBACH5BAEKAAAALAAAAAAQABAAAAdqgACCgwAvL4SIhDRHRzSJiTtdXTsxPj0wjwAGQkIwQCpMPZmERCpNPqODNURBYamDX0MkSWCvO04rYz+vEGK5u6NfEUsnSLWZBEotVEgEqTlkLi5ROKkMK9JPN6kCRmNQQ68AAjg3AeKJgQAh+QQBCgAAACwAAAAAEAAQAAAHZoAAgoOEhYaHiIYCCwmJhA8fHI2OABAhHwuUAAQQDQGagg4XE5+OBh4qJQqUBh2pq44FEhakjhQjIBGICGUYDCIrKxsDhgYnLi4oJsEZAoYOLcgsFRoZDIcHKcgpBwLEiBMkJBOGgQAh+QQBCgAAACwAAAAAEAAQAAAHaIAAgoOEhYaHiImKi4yNjoMGPDSNQidHL4yVl4IDDDmYhTE7kwABRlRVSgSDNUVAMoM4US4uLDs6OwREKk0+gzdPtCtLTk9DQSpMPYRDUFJJJSsrIzY+PTCEATc4BEhTU0mMMz8/M4aBACH5BAEKAAAALAAAAAAQABAAAAdmgACCg4SFhoeIiYqLjIM0DzKMWCleJwiLXS6aGJiaLpyKk1UoV4wHWSdcFIQEEA8CgwMaKytcVgYGABAhHwuDAhm0HxIeHg0MHxwJhAwZWxBaKioWAAvLhQMEABMmJhOMAgoKsIWBACH5BAEKAAAALAAAAAAQABAAAAdqgACCg4SFgwE3OAKGhkNQY0aLjII3Ty4uKwyTgjhRl2Q5mwAESFRVSgSbYEgnSxFfoj9jK2IQogCyK04Rt2BJJEOwtwBhQUQ1wz5NKkTDPUwqQDBCQgaTMD0+MTtdXTvDNEdHNMMALy+MgQA7'
}

//-----------------------------------------------------------------------------
// 設定ここまで
//-----------------------------------------------------------------------------

var SETTINGS = '';
var FluJE = {
    resultList: [],
    resultCloseFlag: false,
    selectionFlag: true,

    //=== remove result calame ===
    removeResult: function (e) {
	var navi = $('FluJE_navi');
	var selection = window.getSelection().toString();
	if(selection!="" || !FluJE.resultCloseFlag) return;
	if(navi && navi.style.display!='none') return;
	if(SETTINGS.remove_result_all){
	    if(FluJE.resultList.length){
		FluJE.resultList.forEach(function (c_node){
		    document.body.removeChild(c_node);
		});
		FluJE.resultList = [];
		FluJE.resultCloseFlag = false;
	    }
	}else{
	    var result = FluJE.resultList[FluJE.resultList.length-1];
	    if(result){
		document.body.removeChild(result);
		FluJE.resultList.pop();
	    }
	}
    },

    //=== All close (remove result calame and close navi calame) ===
    allRemove: function(){
	var navi = $('FluJE_navi');
	var qlookup = $('FluJE_quick_lookup');
	if(qlookup){
	    qlookup.style.display = 'none';
	    qlookup.style.opacity = 0;
	}
	if(navi){
	    navi.style.display = 'none';
	    navi.style.opacity = 0;
	}
	if(FluJE.resultList.length){
	    FluJE.resultList.forEach(
		function (e){ document.body.removeChild(e); });
	    FluJE.resultList = [];
	}
    },
    //=== Mouseup Event (selection) ===
    selectionEvent: function(evt, ids, force){
	var self = FluJE;
	var selection = window.getSelection().toString();
	// 選択文字が上限に達している場合は警告メッセージを表示
	var limit = SETTINGS["lookup_limit_length"] || 1200;
	if(selection.length > limit) {
	    Message.show("!!! Selected string is too long !!!");
	    return;
	}
	
	if(!selection || !FluJE.selectionFlag) return;
	// FluJE.resultCloseFlag = false;
	// setTimeout(function(){ FluJE.resultCloseFlag = true }, 100);
	if(!force) {
	    if(SETTINGS.enable_modifier_key){
		if(!(evt[SETTINGS.modifier_key]) || evt.button != 0 )
		    return;
	    }else{
		if(evt[SETTINGS.modifier_key] || evt.button != 0)
		    return;
		else if(selection)
		    setTimeout(function(){ return; }, 100);
	    }
	}
	if(ids && ids.length)
	    FluJE.showResult(selection, self.autoSelector(selection, ids));
	else
	    FluJE.showResult(selection, self.autoSelector(selection));
	// window.getSelection().removeAllRanges();
    },
    //=== select site(s) automatic  ===
    autoSelector: function(str, ids){
	var ids_ja = [], ids_en = [], type = "", lang = "";
	if(ids && ids.length){
	    ids.forEach(function(val){
		if(checkInputLang(val, 'ja'))
		    ids_ja.push(val);
		if(checkInputLang(val, 'en'))
		    ids_en.push(val);
	    });
	}else
	    ids = [];
	str = str.replace(/^\s+|\s+$/g, "");
	// 選択文字が大きすぎる時は処理を止める
	var limit = SETTINGS["lookup_limit_length"] || 1200;
	if(str.length > limit) return false;
	if(!str.match(/([a-z-+.!?#$%&\"\'\`*]+[ ]+){2,}/i)){
	    var re = new RegExp("[^a-z0-9]{"+SETTINGS.translation.ja_chars+",}", "i");
	    if(/^\s*$|[^a-z\s]/i.test(str)){
		lang = "ja";
		if(SETTINGS.lookup.ja_type=='search')
		    type = 'lookup';
		else if(re.test(str) && SETTINGS.translation.JtoE)
		    type = 'translation'
		else
		    type = 'lookup'
	    }else {
		lang = 'en';
		type='lookup';
	    }
	}else {
	    lang = 'en'
	    if(SETTINGS.lookup.en_type=='search')
		type = 'lookup'
	    else if((str.match(/\s/mg).length >= SETTINGS.translation.en_words-1) && SETTINGS.translation.EtoJ)
		type = 'translation'
	    else
		type = 'lookup'
	}
	if(ids.length){
	    if(lang == 'ja')
		return ids_ja;
	    else if (lang == 'en')
		return ids_en;
	    else return;
	}
	if(SETTINGS[type][lang] && SETTINGS[type][lang].length)
	    return SETTINGS[type][lang];
    },

    //-----------------------------------------------------------------------------
    // output result gotten from keyword
    //-----------------------------------------------------------------------------
    //=== show results ===
    loaded: false,
    initCSS: function(){
	var cls1 = 'div.FluJE_result', cls2 = cls1+' div.FluJE_result_area', cls3 = cls2+' div.FluJE_result_article';
	var inherit = 'background: inherit; background-image: inherit; background-color: inherit; color: inherit; text-align: inherit; font-size: inherit; font-style: inherit; font-weight: inherit; margin: inherit; text-decoration: inherit; border: 0px; height: auto; padding: 0; font-family: inherit; vertical-align: inherit; line-height: inherit; font-stretch: inherit; font-variant: inherit; font-size-adjust: inherit; letter-spacing: inherit;';
	var css = [ cls1,'{ font-size: 14px; position: fixed; margin: 0; padding: 0; bottom: 0; left: 0; right: 0; max-height: 50%; overflow: auto; vertical-align: baseline; border: 0; border-collapse: separate; text-align: left; text-indent: 0; text-decoration: none; color: #FFF; font-family: sans-serif; font-weight: normal; font-style: normal; font-size: medium; font-stretch: normal; font-variant: normal; font-size-adjust: none; letter-spacing: normal; background: none; background-color: #000; background-image: none; -moz-border-radius: 3px; opacity: 0.8; z-index: 1000; }\n',
		    cls1,' > div{',inherit,' min-height: 22px; }\n',
		    cls1,' img.FluJE_switch_img{ position: absolute; cursor: pointer; top: 1px; right: 1px; margin: 3px 2px 0 5px; width: 16px; height: 16px; z-index: 3000; }\n',
		    cls2,'{ position: relative; overflow: auto; z-index: 1500; }\n',
		    cls3,'{ position: relative; -moz-border-radius: 3px; color: #FFF; background-color: #111; margin: 5px; padding: 3px 0 0 30px; z-index: 1000; min-height: 22px; }\n',
		    cls3,' span.indicator{ ',inherit,' position: absolute; top: 0; color: #FFF; left: 40px; width: 200px; height: 18px; padding-left: 30px; background-image: url(',IMAGES.indicator,'); background-repeat: no-repeat; z-index: 3000; }\n',
		    cls3,' *{',inherit,' background-color: #111; margin: 0; padding: 0; color: #FFFFFF; font-size: 14px; }\n',
		    cls3,' h1, ',cls3,' h2{ width: 100%; max-width: 100%; font-size: 110%; height: auto; font-weight: bold; color: #9FF; }\n',
		    cls3,' h1 *, ',cls3,' h2 *{ width: 100%; max-width: 100%; font-size: 110%; height: auto; font-weight: bold; color: #9FF; }\n',
		    cls3,' h3, ',cls3,' h4, ',cls3,' h5, ',cls3,' h6{ width: 100%; max-width: 100%; height: auto; color: #9F9; font-size: 95%; font-weight:100%; }\n',
		    cls3,' h3 *, ',cls3,' h4 *, ',cls3,' h5 *, ',cls3,' h6 *{ width: 100%; max-width: 100%; height: auto; color: #9F9; font-size: 95%; font-weight:100%; }\n',
		    cls3,' strong, ',cls3,' em{ color: #F99; font-size: 105%; font-weight: bold; }\n',
		    cls3,' strong *, ',cls3,' em *{ color: #F99; font-size: 105%; font-weight: bold; }\n',
		    cls3,' tr td{ padding: 7px; }\n',
		    cls3,' a{ color: #FF9; text-decoration: none; }\n',
		    cls3,' a:hover{ color: #FF9; text-decoration: underline; }\n',
		    cls3,' img{ display: none; }\n',
		    cls3,' a.FluJE_permalink{ position: absolute; padding: 0; margin: 0; top: 0px; left: 2px; text-decoration: none; width: 0; height: 0; color: none; border:0; background-color: none; }\n',
		    cls3,' img.FluJE_site_icon{ position: absolute; -moz-border-radius: 3px; top: 0px; left: 2px; width: 16px; height: 16px; padding: 1px; background-color: #FFF; display: inline; }\n',
		    cls3,' span.FluJE_msg{ padding-left: 10px; color: #999; }\n',
		    cls3,' span.FluJE_error_msg{ padding-left: 10px; color: #999; }\n'
		  ].join('');
	return css;
    },
    showResult: function(str, items){
	var self = FluJE;
	if(!str) return;
	if(!self.loaded) {
	    addStyle(self.initCSS(), self.loaded, function() {
		self.showResult(str, items);
	    }).next(function() {
		self.loaded = true;
	    });
	    return false;
	}
	if(!items){
	    var items = self.autoSelector(str);
	    if(!items){
		Message.show("!!!  Plese select one or more sites. !!!");
		return;
	    }
	}
	var root = document.body.appendChild($N('div', {class:'FluJE_result'}));
	ResultNavi.init(root, str);
	self.resultList.push(root);
	root.addEventListener('click', function(evt) {
	    evt.stopPropagation();
	    var tag_name = evt.target.nodeName;
	    if(tag_name=='IMG' || tag_name=='A' || !self.resultCloseFlag || window.getSelection().toString()!="") return;
	    document.body.removeChild(root);
	    self.resultList.pop();
	}, false);
	var result_elems = [], indicator = [], permalinks = [];
	var indicator_img = $N('span', {class:'indicator', style:'display: inline'}, 'Now Loading...');
	items.forEach(function (num, index){
	    indicator.push(indicator_img.cloneNode(true));
	    var site_icon = $N('img', {class:'FluJE_site_icon', src: getIcon(num), title: SITEINFO[num].name});
	    permalinks.push($N('a', {class:'FluJE_permalink', target: '_blank'}, [site_icon]));
	    result_elems.push($N('div',{class:'FluJE_result_article'}, [permalinks[index], indicator[index]]));
	});
	var area = root.appendChild($N('div', {class:'FluJE_result_area'}, result_elems));
	self.getResults(str, items, function(results, index, hash){
	    if(hash){
		var num = hash.num;
		var url = hash.url;
	    }
	    permalinks[index].setAttribute('href', url);
	    indicator[index].style.display = 'none';
	    results.forEach(function (e){
		e = document.importNode(e, true);
		result_elems[index].appendChild(e);
	    });
	    self.resultCloseFlag = true;
	});
    },

    createElements: function(res, sites, url, index, num, func) {
	var info = sites[num];
	var results = [];
	var doc = res.responseText;
	if (doc.length > 100000) {
	    results.push($N('span', {class: 'FluJE_error_msg'}, 'Error: Result size is too large.'));
	} else {
	    var urip = function(u) { return u; };
	    var nmtp = function(n) { return n; };
	    var hdoc = createDocumentFromString(html_sanitize(doc, urip, nmtp));
	    removeXSSRisk(hdoc);
	    var tmp = [];
	    
	    tmp = $X(info.xpath, hdoc);
	    if(tmp!='' && (info.NGxpath==null || (info.NGxpath && $X(info.NGxpath, hdoc)==''))){
		tmp.forEach(function(result) {
		    var links = $X(".//a", result);
		    links.forEach(function(link){
			if(link.getAttribute("href") && link.getAttribute("href").charAt(0) != "#"){
			    if(link.getAttribute("href").toLowerCase().indexOf("http") != 0){
				if(info.link){
				    link.setAttribute("href",info.link+link.getAttribute("href").replace(new RegExp('[0-9a-z/.+-]*/', 'i') ,""));
				}else{
				    link.setAttribute("href",
						      url.match(new RegExp('http://[0-9a-z/.+-]+/', 'i'))
						      +link.getAttribute("href").replace(new RegExp('[0-9a-z/.+-]*/') ,""));
				}
			    }
			    link.setAttribute("target","_blank");
			}else if(link.hasChildNodes()){
			    link.removeAttribute('href');
			}
		    });
		    // add prefix a id or class(es)
		    var unsafe_node = $X("//*[@id] | //*[@class]", result);
		    if (unsafe_node && (unsafe_node.length > 0)) {
			var prefix = "FluJE_result_article_";
			unsafe_node.forEach(function(n) {
			    if (!n) return;
			    var id = n.getAttribute("id");
			    if (id && !/^FluJE/.test(id)) n.setAttribute("id", prefix+id);
			    
			    var classes = n.getAttribute("class");
			    if (classes) {
				classes = classes.split(" ");
				classes.forEach(function(cls, i) {
				    if (!/^FluJE/.test(cls))
					classes[i] = prefix+cls;
				});
				n.setAttribute("class", classes.join(" "));
			    }
			});
		    }
		    results.push(result);
		});
	    }else{
		results.push($N('span', {class: 'FluJE_error_msg'}, 'Not Found'));
	    }
	}
	func(results, index, {num:num, url:url});
    },
    //=== get results ===
    /* func::argument (1st:Results(Array), 2nd:Site Number, 3rd: Result URL) */
    getResults: function(str, items, func){
	var sites = SITEINFO;
	if(!items) return;
	items.forEach(function (e, index){
	    var data = '', method = 'GET', url = '';
	    if(sites[e].enc && (sites[e].lang=='ja' || sites[e].lang=='both')){
		var cs = EscapeEncoding(sites[e].enc, str);
	    }else{
		var cs = str.replace(/’/mg, "\'").replace(/，/mg, ',');
	    }
	    if(sites[e].type=='dictionary'){
		url = sites[e].url.replace(/\[context\]/, cs);
	    }else if(sites[e].type=='search'){
		cs = cs.replace(/\s/mg, sites[e].space);
		url = sites[e].url.replace(/\[context\]/, cs);
	    }else if(sites[e].type=='translation'){
		if(sites[e].method=='POST'){
		    method = 'POST';
		    url = sites[e].url;
		    if(sites[e].lang == 'ja'){
			data = sites[e].data.replace(/\[context\]/, cs);
		    }else if(sites[e].lang == 'en'){
			data = sites[e].data.replace(/\[context\]/, cs.replace(/\s/mg, sites[e].space));
		    }
		}else{
		    cs = cs.replace(/\s/mg, sites[e].space);
		    url = sites[e].url.replace(/\[context\]/, cs);
		}
	    }
	    GM_xmlhttpRequest({
		overrideMimeType:"text/html; charset="+sites[e].enc,
		method: method,
		url: url,
		headers: {
		    'User-agent': 'Mozilla/5.0 (compatible)',
		    'Content-Type' : 'application/x-www-form-urlencoded',
		    'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		data: data,
		onerror: function(){
		    func([$N('span', {class: 'FluJE_error_msg'}, 'ERROR')], e, url);
		    return;
		},
		onload: function(res) {
		    FluJE.createElements(res, sites, url, index, e, func);
		}
	    });
	});
    },
    getSiteInfo : function() {
	var a = [];
	var cache = null;
	var cache_text = GM_getValue("cacheInfo");
	
	try {
	    cache = JSON.parse(cache_text);
	} catch(e) {}
    	if(!cache) {
	    this.importSiteInfo();
	    return ;
	}
	a = a.concat(LOCAL_SITEINFO);
	SITEINFO_IMPORT_URLS.forEach(function(i) {
	    a = a.concat(cache[i].info);
	});
	a.forEach(function(val,index){
	    a[index].id = index;
	});
	return a;
    },
    importSiteInfo: function(){
	if (document.getElementById('FluJE_navi')){
	    var node = document.getElementById('FluJE_navi');
	    node.parentNode.removeChild(node);
	}
	SITEINFO_IMPORT_URLS.forEach(function(i) {
	    var opt = {
		method: 'get',
		url: i,
		onload: function(res) {
		    return FluJE.getCacheCallback(res, i);
		},
		onerror: function(res) {
		    return FluJE.getCacheErrorCallback(i);
		},
	    }
	    GM_xmlhttpRequest(opt);
	});
    },
    getCacheCallback: function(res, url) {
	if (res.status != 200) {
	    return getCacheErrorCallback(url);
	}
	var info = null;
	try {
	    info = JSON.parse(res.responseText).map(function(i) { return i.data });
	}
	catch(e) {
	    info = [];
	    var matched = false;
	    var doc = res.responseText;
	    var urip = function(u) { return u; };
	    var nmtp = function(n) { if (/^FluJE/.test(n)) return n; };
	    var hdoc = createDocumentFromString(html_sanitize(doc, urip, nmtp));
	    var textareas = $X('.//*[@class="FluJE_data"]', hdoc);
	    textareas.forEach(function(textarea) {
		var d = parseInfo(textarea.value);
		if (d) {
		    info.push(d)
		    if (!matched && location.href.match(d.url)) {
			matched = d;
		    }
		}
	    })
	}
	if (info.length > 0) {
	    cacheInfo = {}
	    cacheInfo[url] = {
		url: url,
		expire: new Date(new Date().getTime()),
		info: info
	    }
	    GM_setValue('cacheInfo', JSON.stringify(cacheInfo));
	    SITEINFO = this.getSiteInfo();
	}else {
	    this.getCacheErrorCallback(url);
	}
    },
    getCacheErrorCallback: function(url) {
	var expire = new Date(new Date().getTime())
	var chacheInfo = {};
	if (cacheInfo[url]) {
	    cacheInfo[url].expire = expire;
	}
	else {
	    cacheInfo[url] = {
		url: url,
		expire: expire,
		info: []
	    }
	}
	GM_setValue('cacheInfo', JSON.stringify(cacheInfo));
    }
}

//-----------------------------------------------------------------------------
// Navigation
//-----------------------------------------------------------------------------
var Navi = {
    loaded: false,
    initCSS: function() {
	var id1 = 'div#FluJE_navi', id2 = id1+' div#FluJE_navi_container', cls1 = id2+' table.FluJE_navi_table', cls2_1 = cls1+' .FluJE_site_num_ja', cls2_2 = cls1+' .FluJE_site_num_en', id3 = id2+' div#FluJE_navi_setting';
	var inherit = 'background:inherit; background-image:inherit; background-color:inherit; color:inherit; text-align:inherit; font-size:inherit; font-style:inherit; font-weight:inherit; margin:inherit; text-decoration:inherit; border:0px; font-family:inherit; vertical-align:inherit; line-height:inherit; font-stretch:inherit; font-variant:inherit; font-size-adjust:inherit; letter-spacing:inherit;';
	var css = [ id1,'{ position: fixed; margin: 0; padding: 28px 10px 20px 5px; top: 10px; left: 10px; width: 400px; height: 400px; max-height: 100%; vertical-align: baseline; border: 0; border-collapse: separate; text-align: left; text-indent: 0; text-decoration: none; color: #FFF; font-family: sans-serif; font-weight: normal; font-style: normal; font-size: 9pt; font-stretch: normal; font-variant: normal; font-size-adjust: none; letter-spacing: normal; background: none; background-color: #000; background-image: none; -moz-border-radius: 10px; opacity:0.8; z-index:1000; }\n',
		    id1,' div#FluJE_navi_title{ ',inherit,' position: absolute; top: 3px; left: 10px; }\n',
		    id1,' div#FluJE_navi_title span{ ',inherit,' font-size: 10pt; color: #999; font-weight: bold; }\n',
		    id1,' div#FluJE_navi_title span#FluJE_navi_version{ ',inherit,' font-size: 90%; margin-left: 10px; color: #666; font-weight: normal; }\n',
		    id1,' .FluJE_navi_button{ position: absolute; cursor: pointer; width: 27px; height: 23px; }\n',
		    id1,' div#FluJE_navi_minimize_button{ top: 5px; right: 64px; background: url(',IMAGES.minimize,') no-repeat; }\n',
		    id1,' div#FluJE_navi_minimize_button:hover{ background: url(',IMAGES.minimize_focused,') no-repeat; }\n',
		    id1,' div#FluJE_navi_maximize_button{ top: 5px; right: 37px; background: url(',IMAGES.maximize,') no-repeat; }\n',
		    id1,' div#FluJE_navi_maximize_button:hover{ background: url(',IMAGES.maximize_focused,') no-repeat; }\n',
		    id1,' div#FluJE_navi_close_button{ top: 5px; right: 10px; background: url(',IMAGES.close,') no-repeat; }\n',
		    id1,' div#FluJE_navi_close_button:hover{ background: url(',IMAGES.close_focused,') no-repeat; }\n',
		    id1,' span.FluJE_navi_title{ ',inherit,' color: #FFF; font-weight: bold; margin-top: 5px; }\n',
		    id2,'{ ',inherit,' position: static; top: 25px; height: 100%; max-height: 100%; width: 99%; padding: 5px; max-height: auto; overflow-y: auto; overflow-x: hidden; vertical-align: middle; border-top: 1px dashed #666; border-bottom: 1px dashed #666; }\n',
		    id2,' div.FluJE_navi_table_area{ ',inherit,' width: 98%; padding: 5px 3px; margin-bottom: 10px; border: 1px solid #666; }\n',
		    id2,' div.FluJE_navi_reset{ ',inherit,' float: right; border: 1px solid #999; background-color: #333; color: #F33; cursor: pointer; padding: 0 3px; }\n',
		    cls1,'{ ',inherit,' width: 100%; border: 0; margin: 0; vertical-align: middle; border-collapse: separate; border-spacing: 2px; }\n',
		    cls1,' tbody{ ',inherit,' width: 100%; margin: 0; vertical-align: middle; }\n',
		    cls1,' tr, ',cls1,' td{ ',inherit,' font-size: 95%; background-color: #000; padding: 3px; margin: 0; }\n',
		    cls1,' tr *, ',cls1,' td *{ ',inherit,' background-color: #000; }\n',
		    cls1,' tr td input, ',cls1,' select{ background-color: #FFF; color: #000; height: 20px; width: 220px; float: right; }\n',
		    cls1,' tr td input.FluJE_navi_site_sc{ background-color: #FFF; color: green; text-align: center; font-weight: bold; height: 20px; width: 50px; float: right; }\n',
		    cls1,' tr td input:hover, ',id2,' tr td select:hover{ ',inherit,' color: #000; background-color: #FFF; -moz-outline: 2px solid -moz-rgba(16,96,146,0.8); -moz-outline-offset: 1px; -moz-outline-radius: 3px; }\n',
		    cls1,' tr td input[type=\"text\"]:focus, ',id2,' tr td select:focus{ ',inherit,' color: #000; background-color: #FFF; -moz-outline: 2px solid -moz-rgba(16,186,224,0.8); -moz-outline-offset: 1px; -moz-outline-radius: 3px; }\n',
		    cls1,' th { ',inherit,' font-weight: bold; }\n',
		    cls1,' span{ color: #FFF; background-color: inherit; border: 0px; font-size: 9.5pt; float: left; }\n',
		    cls1,' span.FluJE_navi_site_name{ display: none; }\n',
		    cls1,' .FluJE_site_number{ font-size: 10pt; font-weight: bold; text-align: center; width: 16px; height: 16px; background-color: inherit; display: block; }\n',
		    cls1,' td.FluJE_site_num_ja[state=enable]:hover{ -moz-outline: 1px solid -moz-rgba(16,96,146,0.8); -moz-outline-offset: 1px; -moz-outline-radius: 3px; background-color: #006; }\n',
		    cls1,' td.FluJE_site_num_en[state=enable]:hover{ -moz-outline: 1px solid -moz-rgba(146,96,16,0.8); -moz-outline-offset: 1px; -moz-outline-radius: 3px; background-color: #600; }\n',
		    cls1,' img.FluJE_navi_icon{ padding: 1px; width: 16px; height: 16px; -moz-border-radius: 3px; background-color: #FFF; margin-right: 5px; float: left; }\n',
		    cls1,' th{ ',inherit,' text-align: center; color: #CCC; font-weight: normal; padding: 0px; }\n',
		    cls1,' th.Flu_navi_setting_title{ ',inherit,' color: #999; font-weight: bold; font-size: 10pt; }\n',
		    cls2_1,'{ background-color: #003; width: 16px; text-align: center; vertical-align: middle; cursor: pointer; }\n',
		    cls2_2,'{ background-color: #300; width: 16px; text-align: center; vertical-align: middle; cursor: pointer; }\n',
		    id3,' button{ border: 1px solid #999; background-color: #333; color: #F33; cursor: pointer; }\n',
		    id3,' input[type=text]{ width: 75px; float: left; padding-left: 3px; }\n',
		    id3,' input[type=checkbox]{ width: auto; float: left; }\n',
		    id3,' select{ margin: 0; padding: 0; background-color: #FFF; color: #000; width: auto; float: left; }\n',
		    id3,' select option{ background-color: #FFF; color: #000;}\n'
		  ].join('');
	return css;
    },

    //=== create dictionary search translation table ===
    createMainHTML: function() {
	var html_dict = "", html_search = "", html_trans = "", html_setting = "";
	html_dict += "<div class='FluJE_navi_table_area'><div class='FluJE_navi_reset' evt='reset_lookup'>reset</div><span class='FluJE_navi_title'>Dictionary</span>"
	    + "<table class='FluJE_navi_table'><tbody>"
	    + "<tr><th class='FluJE_site_num_ja'>Ja</th><th class='FluJE_site_num_en'>En</th><th>Icon</th><th>Search form</th><th>Shortcut</th></tr>";
	html_search += "<span class='FluJE_navi_title'>Search</span>"
	    + "<table class='FluJE_navi_table'><tbody>";
	html_trans += "<div class='FluJE_navi_table_area'><div class='FluJE_navi_reset' evt='reset_translation'>reset</div><span class='FluJE_navi_title'>Translation</span>"
	    + "<table class='FluJE_navi_table'><tbody>";
	var item_length = SITEINFO.length;
	for(var i=0; i<item_length; i++){
	    var site_name = SITEINFO[i].name, site_name_rev = '';
	    var html = "", key = "", type = SITEINFO[i].type, lang = SITEINFO[i].lang, id = SITEINFO[i].id;
	    if(SETTINGS.shortcutkey.site && SETTINGS.shortcutkey.site.length > 0){
		SETTINGS.shortcutkey.site.forEach(function(val,idx){
		    if(val.id == i)
			key = val.shortcutkey;
		});
	    }
	    var sort = (type == 'translation') ? 'translation' : 'lookup';
	    html+="<tr><td class='FluJE_site_num_ja' name=\'ja:"+type+"\' site_id="+id+" sort="+sort+" alt='site_number' evt='chenge_site_num' state="+(function(){ if(lang=='ja' || lang=='both') return 'enable'; else 'disable'; })()+">"+SiteNumElement.get(i, 'ja', 'html')+"</td>"
		+ "<td class='FluJE_site_num_en' name=\'en:"+type+"\' site_id="+id+" sort="+sort+" alt='site_number' evt='chenge_site_num' state="+(function(){ if(lang=='en' || lang=='both') return 'enable'; else 'disable'; })()+">"+SiteNumElement.get(i, 'en', 'html')+"</td>"
		+ "<td><img class='FluJE_navi_icon' title=\'"+site_name+"\' src=\'"+getIcon(i)+"\'><span class='FluJE_navi_site_name'>"+site_name+"</span></td>"
		+ "<td><input class='FluJE_navi_inputtext' evt='lookup' type='text' size=30 name="+i+"></td>"
		+ "<td><input class='FluJE_navi_site_sc' site_id="+id+" evt='shortcut' type='text' size=5 name="+i+" value="+key+"></td></tr>";
	    if(type == 'dictionary')
		html_dict += html;
	    else if(type=='search')
		html_search += html;
	    else if(type=='translation')
		html_trans += html;
	}
	html_dict += "</tbody></table>";
	html_search += "</tbody></table></div>";
	html_trans += "</tbody></table></div>";
	return html_dict + html_search + html_trans;
    },
    //=== crate setting table ===
    createSettingHTML: function() {
	var html =
	    "<div class='FluJE_navi_reset' evt='reset_setting'>reset</div><span class='FluJE_navi_title'>Setting</span>"
	    + "<table class='FluJE_navi_table'><tbody>"
	    + "<tr><th title='検索結果をクリック時に、現在表示している結果すべて消すか、クリックした結果のみ消すか'>表示中の結果を全消去</th>"
	    + "<td><input type='checkbox' evt='remove_result_all' "+(function(){if(SETTINGS['remove_result_all']) return 'checked'})()+"></td></tr>"
	    + "<tr><th title='ブラウザ上の文字列選択における辞書引き/検索/翻訳時に修飾キーを利用するか'>修飾キーを有効</th>"
	    + "<td><input type='checkbox' evt='enable_modifier_key' "+(function(){ if(SETTINGS['enable_modifier_key']) return 'checked'})()+"></td></tr>"
	    + "<tr><th title='Alt, Control, Shift, Metaキーの何れかを選択してください'>修飾キー</th>"
	    + "<td><input class='FluJE_navi_inputtext' type='text' evt='modifier_key' value="+SETTINGS.modifier_key+"></td></tr>"
	    + "<tr><th title='ポップアップ表示時のフェードイン,フェードアウトを有効にするか'>エフェクトを有効</th>"
	    + "<td><input type='checkbox' evt='check_effect' "+(function(){ if(SETTINGS['enable_effect']) return 'checked'})()+"></td></tr>"
	    + "<tr><th colspan=2 class='Flu_navi_setting_title'>[ Translation ]</th><td></td></tr>"
	    + "<tr><th title='日英翻訳を有効にするか  チェックしていない場合は辞書引き/検索のみとなります'>日英翻訳を有効</th>"
	    + "<td><input type='checkbox' evt='Ja_to_En' "+(function(){if(SETTINGS.translation['JtoE']) return 'checked'})()+"></td></tr>"
	    + "<tr><th title='ここで決められた文字数以上は翻訳されます'>辞書引き上限文字数</th>"
	    + "<td><input class='FluJE_navi_inputtext' evt='Ja_char' type='text' value="+SETTINGS.translation['ja_chars']+"> (Push ENTER)</td></tr>"
	    + "<tr><th title='英日翻訳を有効にするか  チェックしていない場合は辞書引き/検索のみとなります'>英日翻訳を有効</th>"
	    + "<td><input type='checkbox' evt='En_to_Ja' "+(function(){if(SETTINGS.translation['EtoJ']) return 'checked'})()+"></td></tr>"
	    + "<tr><th title='ここで決められた単語数以上は翻訳されます'>辞書引き上限単語数</th>"
	    + "<td><input class='FluJE_navi_inputtext' type='text' evt='En_word' value="+SETTINGS.translation['en_words']+"> (Push ENTER)</td></tr>"
	    + "<tr><th colspan=2 class='Flu_navi_setting_title'>[ Shortcut Key ](要リロード)</th></tr>"
	    + "<tr><th title='ショートカットキーにより「Navi」の表示と非表示を切り替えます'>Naviの表示/非表示</th>"
	    + "<td><input class='FluJE_navi_inputtext' evt='navi_toggle' type='text' value="+SETTINGS.shortcutkey.navi_toggle+"></td></tr>"
	    + "<tr><th title='ショートカットキーによりFast look up JP and ENで表示されたポップアップを全て閉じます'>すべて閉じる</th>"
	    + "<td><input class='FluJE_navi_inputtext' evt='close_all' type='text' value="+SETTINGS.shortcutkey.close_all+"></td></tr>"
	    + "<tr><th title='ショートカットキーにより「Quick Look up」を起動します'>Quick Lookup</th>"
	    + "<td><input class='FluJE_navi_inputtext' evt='QL_run' type='text' value="+SETTINGS.shortcutkey.QL_run+"></td></tr>"
	    + "<tr><th title='サイト個別のショートカットキーを初期化します'>Reset Site's ShortcutKey</th>"
	    + "<td><button class='FluJE_Navi_reset_button' evt='reset_site_shortcutkey' type='button'>Reset</button></td></tr>"
	    + "</tbody></table>";
	return html;
    },
    getHTML: function() {
	var html =
	    "<div id='FluJE_navi_title'><span>Fast look up JP and EN</span><span id='FluJE_navi_version'>ver."+VERSION+"<span></div>"
	    + "<div class='FluJE_navi_button' id='FluJE_navi_minimize_button' evt='minimize'></div>"
	    + "<div class='FluJE_navi_button' id='FluJE_navi_maximize_button' evt='maximize'></div>"
	    + "<div class='FluJE_navi_button' id='FluJE_navi_close_button' evt='close'></div>"
	    + "<div id='FluJE_navi_container'>"
	    + Navi.createMainHTML()
	    + "<div class='FluJE_navi_table_area' id='FluJE_navi_setting'>"
	    + this.createSettingHTML() + "</div></div>";
	return html;
    },
    //=== Navi Event ===
    events: function(evt, navi) {
	var self = this;
	var tnode = evt.target;
	var container = $('FluJE_navi_container');
	switch(tnode.getAttribute('evt')) {
	case 'close': {
	    Effect.fadeio(navi);
	    evt.stopPropagation(); break;
	}
	case 'minimize': {
	    if(container.style.display != 'none') {
 		container.style.display='none';
 		navi.style.width = null;
 		navi.style.height = 'auto';
 		navi.style.bottom = null; break;
	    }else {
		container.style.display='block';
		navi.style.width = null
		navi.style.height = null;
		navi.style.bottom = null; break;
	    }
	}
	case 'maximize': {
	    var show_site_name = function(disp) {
		var max_width = 0;
		$X(".//span[@class='FluJE_navi_site_name']", container).forEach(function(node){
		    if(disp=='block') {
			node.style.display="block";
			if(max_width < node.offsetWidth) {
			    max_width = (node.offsetWidth*(node.offsetHeight/20)+50)
			}
			node.parentNode.style.width = max_width;
		    }else {
			node.style.display="none";
			node.parentNode.style.width=null
		    }
		});
	    }
	    if(container.style.display=='none')
		container.style.display = 'block';
	    if(navi.style.bottom != '10px') {
		show_site_name("block");
		navi.style.width = 'auto';
		navi.style.height = 'auto';
		navi.style.bottom = '10px';
	    }else{
		show_site_name("none");
		navi.style.height = null;
		navi.style.width = null;
		navi.style.bottom = null;
	    }
	    break;
	}
	case 'lookup': {
	    if(tnode.getAttribute('added_event')=='true') return;
	    tnode.setAttribute('added_event', true);
	    ShortcutKey.add(tnode, 'RET', function(evt) {
		FluJE.showResult(tnode.value, [parseInt(tnode.name, 10)]);
		evt.stopPropagation();
	    }, true); break;
	}
	case 'chenge_site_num': {
	    var modifier_key = evt[SETTINGS.modifier_key];
	    if(tnode.getAttribute('alt') == 'site_number'){
		SiteNumElement.check(tnode, container, modifier_key);
		break;
	    }else if(tnode.parentNode.getAttribute('alt') == 'site_number'){
		SiteNumElement.check(tnode.parentNode, container, modifier_key);
		break;
	    }else break;
	}
	case 'reset_lookup': {
	    SETTINGS.lookup.ja = [], SETTINGS.lookup.en = [];
	    SiteNumElement.replace($X('.//td[@class="FluJE_site_num_ja"][@sort="lookup"]', container), {lang:'ja', sort:'lookup'});
	    SiteNumElement.replace($X('.//td[@class="FluJE_site_num_en"][@sort="lookup"]', container), {lang:'en', sort:'lookup'});
	    Setting.save();
	    break;
	}
	case 'reset_translation': {
	    SETTINGS.translation.ja = [], SETTINGS.translation.en = [];
	    SiteNumElement.replace($X('.//td[@class="FluJE_site_num_ja"][@sort="translation"]', container), {lang:'ja', sort:'translation'});
	    SiteNumElement.replace($X('.//td[@class="FluJE_site_num_en"][@sort="translation"]', container), {lang:'en', sort:'translation'});
	    Setting.save();
	    break;
	}
	case 'reset_setting': {
	    Setting.reset([['remove_result_all'],['enable_modifier_key'],['modifier_key'],['enable_effect'],['translation','JtoE'],['translation','ja_chars'],['translation','EtoJ'],['translation','en_words'],['shortcutkey']]);
	    $('FluJE_navi_setting').innerHTML = this.createSettingHTML();
	    break;
	}
	case 'remove_result_all': {
	    Setting.set('remove_result_all', tnode.checked);
	    break;
	}
	case 'enable_modifier_key': {
	    Setting.set('enable_modifier_key', tnode.checked);
	    break;
	}
	case 'modifier_key': {
	    if(tnode.getAttribute('added_event')=='true') return;
	    tnode.setAttribute('added_event', true);
	    tnode.addEventListener('keyup',function(evt){
		var key = '';
		if(evt.shiftKey || evt.keyCode==16) key = 'shiftKey';
		if(evt.ctrlKey || evt.keyCode==17) key = 'ctrlKey';
		if(evt.altKey || evt.keyCode==18) key = 'altKey';
		if(evt.metaKey || evt.keyCode==224) key = 'metaKey';
		tnode.value = key;
		if(key){
		    Effect.highlight(tnode, true);
		    Setting.set('modifier_key', key);
		}else{
		    Effect.highlight(tnode, false);
		    setTimeout(function(){ tnode.value = SETTINGS.modifier_key; }, 500);
		}
		evt.stopPropagation();
	    }, false);
	    break;
	}
	case 'check_effect': {
	    Setting.set('enable_effect', tnode.checked);
	    break;
	}
	case 'Ja_to_En': {
	    Setting.set(['translation','JtoE'], tnode.checked);
	    break;
	}
	case 'Ja_char': {
	    if(tnode.getAttribute('added_event')=='true') return;
	    tnode.setAttribute('added_event', true);
	    ShortcutKey.add(tnode, 'RET', function(e) {
		if(isNaN(tnode.value)){
		    Effect.highlight(tnode, false);
		}else{
		    Effect.highlight(tnode, true);
		    Setting.set(['translation','ja_chars'], parseInt(e.target.value, 10));
		}
	    }, false);
	    break;
	}
	case 'En_to_Ja': {
	    Setting.set(['translation','EtoJ'], tnode.checked);
	    break;
	}
	case 'En_word': {
	    if(tnode.getAttribute('added_event')=='true') return;
	    tnode.setAttribute('added_event', true);
	    ShortcutKey.add(tnode, 'RET', function(e) {
		if(isNaN(tnode.value)){
		    Effect.highlight(tnode, false);
		}else{
		    Effect.highlight(tnode, true);
		    Setting.set(['translation','en_words'], parseInt(e.target.value, 10));
		}
	    }, false);
	    break;
	}
	case 'navi_toggle': {
	    ShortcutKey.set(tnode, 'navi_toggle');
	    break;
	}
	case 'close_all': {
	    ShortcutKey.set(tnode, 'close_all');
	    break;
	}
	case 'QL_run': {
	    ShortcutKey.set(tnode, 'QL_run');
	    break;
	}
	case 'shortcut': {
	    var index = null, _s = SETTINGS.shortcutkey;
	    var id = tnode.getAttribute('site_id');
	    if(!_s.site){
		SETTINGS.shortcutkey.site = [];
	    }else{
		_s.site.forEach(function(val,i){
		    if(val.id == id) index = i;
		});
	    }
	    if(index == null){
		_s.site.push({id:parseInt(id)});
		index = _s.site.length - 1;
	    }
	    ShortcutKey.set(tnode, 'site', index);
	    break;
	}
	case 'reset_site_shortcutkey': {
	    SETTINGS.shortcutkey.site = [];
	    Navi.remove();
	}
	default: break;
	}
    },
    //=== show toggle (open/close) Navi ===
    toggle: function(){
	var self = Navi;
	var navi = $('FluJE_navi');
	if(navi)
	    return Effect.fadeio(navi);
	addStyle(self.initCSS(), self.loaded, function() {
	    var navi = document.body.appendChild($N('div', {id:'FluJE_navi'}));
	    navi.innerHTML = self.getHTML();
	    Effect.fadeio(navi);
	}).next(function() {
	    self.loaded = true;

	    //== Navi Event Listener ==
	    var navi = $('FluJE_navi');
	    navi.addEventListener('keyup', function(evt){
		self.events(evt, navi);
	    }, false);
	    navi.addEventListener('click', function(evt){
		self.events(evt, navi);
	    }, false);
	});
    },
    remove: function() {
	var elm = $('FluJE_navi');
	if(elm)
	    document.body.removeChild(elm);
    }
}

//-----------------------------------------------------------------------------
// Navigation at result area.
//-----------------------------------------------------------------------------
var ResultNavi = {
    loaded: false,
    initCSS: function(){
	var cls1 = 'div.FluJE_result div.FluJE_result_navi', cls2 = cls1+' div.FluJE_result_navi_area', cls3_1 = cls2+' td.FluJE_site_num_ja', cls3_2 = cls2+' td.FluJE_site_num_en';
	var inherit = 'background: inherit; background-image: inherit; background-color: inherit; color: inherit; text-align: inherit; font-size: inherit; font-style: inherit; font-weight: inherit; margin: inherit; text-decoration: inherit; border: 0px; height: auto; padding: 0; font-family: inherit; vertical-align: inherit; line-height: inherit; font-stretch: inherit; font-variant: inherit; font-size-adjust: inherit; letter-spacing: inherit;';
	var css = [ cls1,'{ background: #333; background-image: none; background-color: #333; color: #FFF; text-align: inherit; font-size: 16px; font-style: normal; font-weight: normal; margin: 0; text-decoration: none; border: 0px; font-family: inherit; vertical-align: middle; line-height: 100%; font-stretch: normal; font-variant: normal; font-size-adjust: none; letter-spacing: normal; height: auto; max-height: 70px; padding: 1px 30px 1px 0; }\n',
		    cls1,' *{ ',inherit,' padding: 0; }\n',
		    cls2,'{ padding-top:5px; }\n',
		    cls2,' div{ height: 18px; }\n',
		    cls2,' td{ padding: 0 2px; }\n',
		    cls2,' img.FluJE_site_icon{ -moz-border-radius: 3px; cursor: pointer; background-color: #FFF; padding: 1px; margin: 0; width: 16px; height: 16px; }\n',
		    cls2,' span.FluJE_site_number{ text-align: center; color: #FFF; font-weight: bold; font-size: 14px; }\n',
		    cls2,' table{ vertical-align: middle; border-collapse: separate; border-spacing: 2px; }\n',
		    cls3_1,'{ cursor: pointer; width: 18px; height: 18px; text-align: center; background-color: #335; }\n',
		    cls3_2,'{ cursor: pointer; width: 18px; height: 18px; text-align: center; background-color: #533; }\n',
		    cls3_1,'[state=enable]:hover{ -moz-outline: 1px solid -moz-rgba(16,96,146,0.8); -moz-outline-offset: 1px; -moz-outline-radius: 3px; }\n',
		    cls3_2,'[state=enable]:hover{ -moz-outline: 1px solid -moz-rgba(146,96,16,0.8); -moz-outline-offset: 1px; -moz-outline-radius: 3px; }\n'
		  ].join('');
	return css;
    },
    createHTML: function(){
	var html_icon = "<table><tbody><tr><td>Lang</td>", html_ja = "<tr><td class='FluJE_site_num_ja'>Ja</td>", html_en = "<tr><td class='FluJE_site_num_en' >En</td>";
	SITEINFO.forEach(function(e, num){
	    var type = SITEINFO[num].type, lang = SITEINFO[num].lang, id = SITEINFO[num].id;
	    var sort = (type == 'translation') ? 'translation' : 'lookup';
	    html_icon += "<td><img class='FluJE_site_icon' evt='relookup' src=\'"+getIcon(num)+"\' title=\'"+e.name+"\' name="+num+"></td>";
	    html_ja += "<td evt='chenge_site_num' class='FluJE_site_num_ja' alt='site_number' name=\'ja:"+type+"\' site_id="+id+" sort="+sort+" state="+(function(){ if(lang=='ja' || lang=='both') return 'enable'; else return 'disable'; })()+">"+SiteNumElement.get(num, 'ja', 'html')+"</td>";
	    html_en += "<td evt='chenge_site_num' class='FluJE_site_num_en' alt='site_number' name=\'en:"+type+"\' site_id="+id+" sort="+sort+" state="+(function(){ if(lang=='en' || lang=='both') return 'enable'; else return 'disable'; })()+">"+SiteNumElement.get(num, 'en', 'html')+"</td>";
	});
	html_icon += "</tr>";
	html_ja += "</tr>";
	html_en += "</tr></tbody></table>";
	return html_icon+html_ja+html_en;
    },
    init: function(pNode, str){
	var self = ResultNavi;
	var root = '';
	var oicon = pNode.appendChild($N('img', {class:'FluJE_switch_img', src:IMAGES.openSwitch, style:'display: inline;'}));
	var cicon = pNode.appendChild($N('img', {class:'FluJE_switch_img', src:IMAGES.closeSwitch, style:'display: none;'}));
	oicon.addEventListener('click', function(e){
	    oicon.style.display = 'none';
	    cicon.style.display = 'inline';
	    if(!root){
		if(addStyle(self.initCSS(), self.loaded, function(){ root = self.show(pNode, str); })){
		    self.loaded = true;
		    return;
		}else{
		    root = self.show(pNode, str);
		}
	    }else if(root.style.display == 'none'){
		root.style.display='block';
	    }else{
		return;
	    }
	}, false);
	cicon.addEventListener('click', function(evt){
	    oicon.style.display = 'inline';
	    cicon.style.display = 'none';
	    root.style.display = 'none';
	    FluJE.resultCloseFlag = true;
	}, false);
    },
    show: function(pNode, str){
	var root = $N('div', {class: 'FluJE_result_navi'});
	var area = root.appendChild($N('div', {class:'FluJE_result_navi_area', style:'display: block; float: right;'}));
	area.innerHTML = this.createHTML();
	area.addEventListener('click', function(evt){
	    var tnode = evt.target;
	    switch(tnode.getAttribute('evt')){
	    case 'chenge_site_num': {
		if(tnode.getAttribute('alt') == 'site_number'){
		    SiteNumElement.check(tnode, area);
		    evt.stopPropagation(); break;
		}else if(tnode.parentNode.getAttribute('alt') == 'site_number'){
		    SiteNumElement.check(tnode.parentNode, area);
		    evt.stopPropagation(); break;
		}else break;
	    }
	    case 'relookup': {
		FluJE.showResult(str, [parseInt(tnode.name, 10)]); break;
	    }
	    default: break;
	    }
	}, false);
	root.appendChild($N('div', {style:'clear:both !important;'}));
	pNode.insertBefore(root, pNode.firstChild);
	return root;
    }
}

//-----------------------------------------------------------------------------
// Quick Lookup
//-----------------------------------------------------------------------------
var QLu = {
    loaded: false,
    initCSS: function() {
	var id1 = 'div#FluJE_quick_lookup', id2 = id1+' input#FluJE_quick_lookup_input';
	var inherit = 'background: inherit; background-image: inherit; background-color: inherit; color: inherit; text-align: inherit; font-size: inherit; font-style: inherit; font-weight: inherit; margin: inherit; text-decoration: inherit; border: 0px; height: auto; padding: 0; font-family: inherit; vertical-align: inherit; line-height: inherit; font-stretch: inherit; font-variant: inherit; font-size-adjust: inherit; letter-spacing: inherit;';
	var css = [ id1,'{ background: #000; background-image: none; background-color: #000; color: #FFF; text-align: center; font-size: 15px; font-style: normal; font-weight: normal; margin: 0; text-decoration: none; border: 0px; padding: 0; font-family: inherit; vertical-align: middle; line-height: 100%; font-stretch: normal; font-variant: normal; font-size-adjust: none; letter-spacing: normal; z-index: 10000; height: 40px; position: fixed; left: 10px; right: 10px; bottom: 51%; padding-top: 20px; opacity: 0; -moz-border-radius: 10px; }\n',
		    id1,' span{ ',inherit,' margin-right: 10px; font-weight: bold; }\n',
		    id2,'{ ',inherit,' padding-left: 3px; padding-top: 2px; height: 20px; width: 85%; background-color: #FFF; color: #333; text-align: left; }\n'
		  ].join('');
	return css;
    },
    close: function(elm) {
	$('FluJE_quick_lookup_input').blur();
	Effect.fadeio(elm);
    },
    createNode: function(func){
	var self = this;
	var title = $N('span', null, 'Quick Lookup:');
	var input = $N('input', {id:'FluJE_quick_lookup_input'});
	var div = document.body.appendChild($N('div', {id:'FluJE_quick_lookup'}, [title, input]));
	//== Event ==
	div.addEventListener('click', function(e){
	    if(e.target != input)
		self.close(div);
	}, false);
	input.addEventListener('focus', function(){
	    input.style.backgroundColor = "#FFFFFF";
	},false);
	input.addEventListener('blur', function(){
	    input.style.backgroundColor = "#CCCCCC";
	},false);
	ShortcutKey.add(input, 'RET', function(evt){
	    switch(evt.target.value){
	    case 'exit': { self.close(div); return; }
	    case '': { FluJE.removeResult(); break;}
	    default: FluJE.removeResult(); break;
	    }
	    FluJE.showResult(input.value);
	});
	return next(function() { func(div); });
    },
    run: function(e) {
	var self = QLu;
	if($('FluJE_quick_lookup')){
	    Effect.fadeio($('FluJE_quick_lookup'), function(){
		$('FluJE_quick_lookup_input').select();
	    });
	    return true;
	}
	addStyle(self.initCSS(), self.loaded, function() {
	    self.createNode(function(div) {
		Effect.fadeio(div, function(){
		    $('FluJE_quick_lookup_input').select();
		});
	    });
	}).next(function() {
	    self.loaded = true;
	});
    }
}

//-----------------------------------------------------------------------------
// SETTING CONTROL
//-----------------------------------------------------------------------------
var Setting = {
    _default: DefaultSettings(),
    save: function() {
	GM_setValue('settings', JSON.stringify(SETTINGS));
    },
    load: function(){
	try {
	    var s = JSON.parse(GM_getValue('settings'));
	    if(s.ver && s.ver == VERSION){
		SETTINGS = s;
		return 1;
	    }
	} catch(e) {}
	Setting.reset();
	SETTINGS = this._default;
	this.save();
	return 0;
    },
    reset: function(args){
	switch(typeof args){
	case 'object': {
	    for(var i in args){
		var type = typeof args[i];
		if(type == 'object'){
		    this.set(args[i], "default", false);
		}else if(type == 'string'){
		    this.set(args, "default", false); break;
		}else { break; }
	    }
	    break;
	}
	case 'string': { this.set(args, "default", false); break; }
	case 'undefined': { this.set(); break; }
	default: break;
	}
	this.save();
    },
    set: function(name, value, bool){
	var d = this._default;
	switch(typeof name){
	case 'object': {
	    if(name.length <= 2){
		if(value=='default')
		    (name.length===1) ? value = d[name[0]] : value = d[name[0]][name[1]];
		(name.length===1) ? SETTINGS[name[0]] = value : SETTINGS[name[0]][name[1]] = value;
	    }
	    break;
	}
	case 'string': { SETTINGS[name] = value; break;	}
	case 'undefined': { SETTINGS = this._default; break; }
	default: break;
	}
	if(bool!=false){ this.save(); }
    },
    setSite: function(lang, num, param, modifier_key){
	var n = null;
	var sites = SITEINFO;
	var t = sites[num].type;
	var s = (t == 'dictionary' || t == 'search') ? 'lookup' : 'translation';
	if (!SETTINGS[s])
	    SETTINGS = Setting._default;
	n = SETTINGS[s];
	var lookup_type = (lang=='ja') ? 'ja_type' : 'en_type';
	if(param){
	    if(modifier_key)
		n[lang].unshift(num);
	    else
		n[lang].push(num);
	    if(t=='dictionary'){
		if(!n[lookup_type]) n[lookup_type] = t;
	    }else if(t=='search'){
		n[lookup_type] = t;
	    }
	}else{
	    n[lang] = this.delArray(n[lang], num);
	    if(t == 'search'){
		var ck_search = false;
		for(var i in n[lang]){
		    if(sites[i].type == 'search'){
			ck_search = true; break;
		    }
		    n[lookup_type] = (ck_search) ? 'search' : 'dictionary';
		}
	    }
	}
	this.save();
    },
    delArray: function(array, num){
	var a = 0, b = null;
	array.forEach(function(e){
	    if(e==num){
		b = a;
	    }
	    a++;
	});
	var array_new = new Array();
	array_new = array.slice(0,b);
	for(var i = b;i<array.length-1;i++){
	    array_new[i] = array[i+1];
	}
	return array_new;
    }
}

//-----------------------------------------------------------------------------
// Shortcut Key
//-----------------------------------------------------------------------------
var ShortcutKey = {
    sp: {
	9: 'TAB',
	27: 'ESC',
	33: 'PageUp',
	34: 'PageDown',
	35: 'End',
	36: 'Home',
	37: 'Left',
	38: 'Up',
	39: 'Right',
	40: 'Down',
	45: 'Insert',
	46: 'Delete',
	112: 'F1',
	113: 'F2',
	114: 'F3',
	115: 'F4',
	116: 'F5',
	117: 'F6',
	118: 'F7',
	119: 'F8',
	120: 'F9',
	121: 'F10',
	122: 'F11',
	123: 'F12'
    },
    ssp: {
	8: 'BS',
	10: 'RET',
	13: 'RET',
	32: 'SPC'
    },
    add: function(elm, key, func, global) {
	var sp = this.sp, ssp = this.ssp;
	var keycode;
	var m = [];
	if(key) {
	    var keys = key.split(' ');
	    var position = 0;
	    var num = keys.length-1;
	    keys[position].replace(/^(?:([ACMS]{1,3})-)?(\w+)$/, function($0, $1, $2, $3) {
		for(var i=0; i<$1.length; i++){
		    var x = $1.charAt(i);
		    m.push(({
			C: "ctrl",
			S: "shift",
			A: "alt",
			M: "meta"
		    })[x] + "Key");
		}
		keycode = $2;
	    });
	    elm.addEventListener('keypress', function(evt) {
		var kc = '';
		if(evt.which)
		    kc = ssp[evt.which] || String.fromCharCode(evt.which).toLowerCase();
		else kc = sp[evt.keyCode];
		if(m.length) {
		    if((evt[m[0]] && (m[1]==undefined ? true : evt[m[1]]) && (m[2]==undefined ? true : evt[m[2]])) && kc==keycode)
			func(evt);
		} else {
		    if(kc==keycode && !evt.shiftKey && !evt.altKey && !evt.ctrlKey && !evt.metaKey) {
			if(!global && elm!=evt.target && /^(?:input|textarea)$/.test(evt.target.nodeName.toLowerCase()))
			    return;
			var f = true;
			disableShortcutKey.forEach(function(val) {
			    if(location.href.match(val.url)) {
				if(!val.xpath) f = false;
				if($X(val.xpath, document.activeElement).length) f = false;
			    }
			});
			if(!f && !global) return false;
			func(evt);
			evt.preventDefault();
		    }
		}
	    }, false);
	} else {
	    elm.addEventListener('keypress', func, false);
	}
    },
    get: function(elm, func) {
	var sp = this.sp, ssp = this.ssp;
	elm.addEventListener('keypress',function(evt){
	    var key = [];
	    if(evt.ctrlKey) key.push('C');
	    if(evt.shiftKey) key.push('S');
	    if(evt.altKey) key.push('A');
	    if(evt.metaKey) key.push('M');
	    if(evt.ctrlKey || evt.shiftKey || evt.altKey || evt.metaKey) key.push('-');
	    if(evt.which){
		var k = ssp[evt.which] || String.fromCharCode(evt.which).toLowerCase();
		key.push(k);
	    }else if(evt.keyCode){
		key.push(sp[evt.keyCode]);
	    }
	    if(key.length!=0)
		func(evt, key.join(''));
	    evt.preventDefault();
	    evt.stopPropagation();
	}, true);
    },
    set: function(elm, sc_name, sc_index) {
	this.get(elm, function(e, key){
	    if(key=="ESC"){
		setTimeout(function(){ elm.value = key.toString(); }, 100);
	    }else{
		elm.value = key.toString();
	    }
	    if(sc_name=='site')
		Setting.set(['shortcutkey','site', sc_index, 'shortcutkey'], key);
	    else
		Setting.set(['shortcutkey',sc_name], key);
	    elm.style.backgroundColor = '#CFC';
	    setTimeout(function(){ elm.style.backgroundColor='#FFF'; }, 500);
	});
    },
}

//-----------------------------------------------------------------------------
// FluJE Libraries
//-----------------------------------------------------------------------------
var Message =  {
    init: function(str) {
	var elm = $("FluJE_FLASH_MESSAGE");
	if(!elm) {
	    elm = $N("div", {id:"FluJE_FLASH_MESSAGE"});
	    document.body.appendChild(elm);
	    var css = 'div#FluJE_FLASH_MESSAGE div.FluJE_FLASH_NORMAL_MESSAGE{ position: fixed; bottom: 0; left: 0; right: 0; color: #9F9; font-weight: normal; font-size: 100%; text-align: center; background-color: #000; padding: 5px 0; margin: 0; opacity: 0.8; }'
		+ 'div#FluJE_FLASH_MESSAGE div.FluJE_FLASH_ERROR_MESSAGE{ position: fixed; bottom: 0; left: 0; right: 0; color: #F99; font-weight: bold; font-size: 120%; text-align: center; background-color: #000; padding: 5px 0; margin: 0; opacity: 0.8; }';
	    addStyle(css);
	}
    },
    create: function(str, param) {
	var elm = $("FluJE_FLASH_MESSAGE");
	if(!elm)
	    elm = $N("div", {id:"FluJE_FLASH_MESSAGE"});
	if(param == "error")
	    var msg = elm.appendChild($N('div', {class:'FluJE_FLASH_ERROR_MESSAGE'}, str));
	else
	    var msg = elm.appendChild($N('div', {class:'FluJE_FLASH_NORMAL_MESSAGE'}, str));
	msg.style.opacity = 0;
	msg.addEventListener('click', function(e) { Message.remove(elm, true); }, false);
	return msg;
    },
    remove: function(elm, force, evt) {
	if(force) {
	    elm.parentNode.removeChild(elm);
	    return true;
	}
	wait(5).next(function() {
	    elm.parentNode.removeChild(elm);
	});
    },
    show: function(str, param) {
	if(!str) return;
	var self = Message;
	var elm = null;
	next(function() {
	    self.init(str);
	}).next(function() {
	    elm = self.create(str,param);
	}).next(function() {
	    Effect.flash(elm);
	}).next(function() {
	    self.remove(elm);
	});
    }
}
//=== EFFECT ===
var Effect = {
    flash: function(node){
	var self = Effect;
	next(function() {
	    self.fadein(node);
	}).wait(2).next(function() {
	    self.fadeout(node);
	});
    },
    highlight: function(node, bool){
	if(!SETTINGS.enable_effect)
	    return false;
	if(bool){
	    next(function() {
		node.style.backgroundColor = '#CFC';
	    }).wait(0.5).next(function() {
		node.style.backgroundColor='#FFF';
	    });
	}else{
	    next(function() {
		node.style.backgroundColor = '#F99';
	    }).wait(0.5).next(function() {
		node.style.backgroundColor='#FFF';
	    });
	}
    },
    smoothsize: function(node, original, fixed) {
	var self = this;
	if(original > fixed) {
	    node.offsetHeight -= 5;
	    orininal -= 5;
	    setTimeout(function(){
		self.smoothsize(node, original, fixed);
	    }, 20);
	}
	return;
    },
    fadeio: function(node, func) {
	var self = Effect;
	var o = node.style.opacity || node.getAttribute("opacity");
	if (!o) { o = 0; node.style.opacity = 0; }
	if(o <= 0.5) {
	    next(function() {
		self.fadein(node);
	    }).next(function() {
		if(func) func();
	    });
	}else {
	    next(function() {
		self.fadeout(node);
	    }).next(function() {
		if(func) func();
	    });
	}
    },
    fadein: function(node) {
	var self = this;
	node.style.opacity = 0;
	node.style.display = 'block';
	if(SETTINGS.enable_effect){
	    loop(5, function(n) {
		node.style.opacity = (n+1) * 0.16;
		return wait(0.05);
	    });
	}else {
	    node.style.opacity  = 0.8;
	}
    },
    fadeout: function(node) {
	var self = this;
	node.style.opacity = 0.8;
	node.style.display = 'block';
	if(SETTINGS.enable_effect){
	    loop(5, function(n) {
		node.style.opacity -= 0.16;
		return wait(0.05);
	    }).next(function() {
		node.style.opacity = 0;
		node.style.display = 'none';
	    });
	}else {
	    node.style.opacity = 0;
	    node.style.display = 'none';
	}
    }
}

function checkInputLang(num, lang) {
    var site_lang = SITEINFO[num].lang;
    switch(SITEINFO[num].lang) {
    case 'both': return true;
    case lang: return true;
    default: return false;
    }
}

//=== control number of sites ===
var SiteNumElement = {
    get: function(num, lang, format) {
	var n = null;
	var t = SITEINFO[num].type;
	var s = (t == 'dictionary' || t == 'search') ? 'lookup' : 'translation';
	if(SETTINGS[s][lang])
	    n = SETTINGS[s][lang];
	else {
	    var d = Setting._default;
	    n = d[s][lang];
	}
	for(var i=0; i<n.length; i++){
	    if(n[i]==num){
		if(format=='html') return "<span class='FluJE_site_number' title="+SITEINFO[i].name+" name="+num+" param='true' state='enable' evt='chenge_site_num'>"+(i+1).toString()+"</span>";
		else return $N('span', {class:'FluJE_site_number', title:SITEINFO[num].name, name: num, param: 'true', state:'enable', evt: 'chenge_site_num' }, (i+1).toString());
	    }
	}
	if(checkInputLang(num, lang)){
	    if(format=='html') return "<img class='FluJE_site_number' title="+SITEINFO[num].name+" name="+num+" param='false' state='enable' evt='chenge_site_num' src=\'"+IMAGES.o+"\'>";
	    else return $N('img', {class:'FluJE_site_number', title:SITEINFO[num].name, name: num, param: 'false', state:'enable', evt: 'chenge_site_num', src:IMAGES.o});
	}
	if(format=='html') return "<img class='FluJE_site_number' title="+SITEINFO[num].name+" name="+num+" param='false' state='disable' evt='chenge_site_num' src=\'"+IMAGES.x+"\'>";
	else return $N('img', {class:'FluJE_site_number', title:SITEINFO[num].name, name: num, param: 'false', state:'disable', evt: 'chenge_site_num', src:IMAGES.x});
    },
    replace: function(list, args, self, modifier_key) {
	var lang = args.lang, sort = args.sort;
	if(self){
	    var elm = self.firstChild;
	    if(elm.getAttribute('state')=='disable') return;
	    var selected = (elm.getAttribute('param') === "true") ? false : true;
	    Setting.setSite(lang, parseInt(elm.getAttribute('name'), 10), selected , modifier_key);
	}
	var num = list.length;
	for(var i=0; i<num; i++){
	    if(list[i]){
		var id = list[i].getAttribute('site_id');
		if(list[i].hasChildNodes())
		    list[i].removeChild(list[i].firstChild);
		list[i].appendChild(this.get(parseInt(id, 10), lang));
	    }
	}
    },
    check: function(tnode, pnode, modifier_key) {
	if(tnode.getAttribute('state')!='enable') return;
	var ary = [];
	ary = tnode.getAttribute('name').split(":");
	var lang = ary[0], type = ary[1];
	var sort = (type == 'translation') ? 'translation' : 'lookup';
	var node_list = $X('.//td[@class=\"FluJE_site_num_'+lang+'\"][@sort=\"'+sort+'\"]', pnode);
	this.replace(node_list, {lang:lang, sort:sort}, tnode, modifier_key);
    },
}

function getIcon(num) {
    if(num==undefined || SITEINFO.length<num)
	return;
    if(SITEINFO[num].icon)
	return SITEINFO[num].icon;
    else
	return SITEINFO[num].url.match(new RegExp('http://[^/]+/', "i"))+'favicon.ico';
}

//-----------------------------------------------------------------------------
// Library
//-----------------------------------------------------------------------------

//=== log for debug (display in firebug) ===
function log() {
    if(console) console.log.apply(console, Array.slice(arguments));
}

//=== in place of gm_addstyle ===
function addStyle(css, bool, func) {
    if(!bool) {
	try{
	    var link = document.createElement('link');
	    link.rel = 'stylesheet';
	    link.href = 'data:text/css,' + escape(css);
	    document.documentElement.childNodes[0].appendChild(link);
	}catch(e){
	    if(css) GM_addStyle(css);
	}
    }
    return next(func);
}

//=== Escape Encoding ===
function EscapeEncoding(type, str){
    switch(type){
    case 'EUC-JP': return EscapeEUCJP(str);
    case 'Shift_JIS': return EscapeSJIS(str);
    case 'UTF-8': return EscapeUTF8(str);
    default: return str;
    }
}

JCT11280=Function('var a="zKV33~jZ4zN=~ji36XazM93y!{~k2y!o~k0ZlW6zN?3Wz3W?{EKzK[33[`y|;-~j^YOTz$!~kNy|L1$353~jV3zKk3~k-4P4zK_2+~jY4y!xYHR~jlz$_~jk4z$e3X5He<0y!wy|X3[:~l|VU[F3VZ056Hy!nz/m1XD61+1XY1E1=1y|bzKiz!H034zKj~mEz#c5ZA3-3X$1~mBz$$3~lyz#,4YN5~mEz#{ZKZ3V%7Y}!J3X-YEX_J(3~mAz =V;kE0/y|F3y!}~m>z/U~mI~j_2+~mA~jp2;~m@~k32;~m>V}2u~mEX#2x~mBy+x2242(~mBy,;2242(~may->2&XkG2;~mIy-_2&NXd2;~mGz,{4<6:.:B*B:XC4>6:.>B*BBXSA+A:X]E&E<~r#z+625z s2+zN=`HXI@YMXIAXZYUM8X4K/:Q!Z&33 3YWX[~mB`{zKt4z (zV/z 3zRw2%Wd39]S11z$PAXH5Xb;ZQWU1ZgWP%3~o@{Dgl#gd}T){Uo{y5_d{e@}C(} WU9|cB{w}bzvV|)[} H|zT}d||0~{]Q|(l{|x{iv{dw}(5}[Z|kuZ }cq{{y|ij}.I{idbof%cu^d}Rj^y|-M{ESYGYfYsZslS`?ZdYO__gLYRZ&fvb4oKfhSf^d<Yeasc1f&a=hnYG{QY{D`Bsa|u,}Dl|_Q{C%xK|Aq}C>|c#ryW=}eY{L+`)][YF_Ub^h4}[X|?r|u_ex}TL@YR]j{SrXgo*|Gv|rK}B#mu{R1}hs|dP{C7|^Qt3|@P{YVV |8&}#D}ef{e/{Rl|>Hni}R1{Z#{D[}CQlQ||E}[s{SG_+i8eplY[=[|ec[$YXn#`hcm}YR|{Ci(_[ql|?8p3]-}^t{wy}4la&pc|3e{Rp{LqiJ],] `kc(]@chYnrM`O^,ZLYhZB]ywyfGY~aex!_Qww{a!|)*lHrM{N+n&YYj~Z b c#e_[hZSon|rOt`}hBXa^i{lh|<0||r{KJ{kni)|x,|0auY{D!^Sce{w;|@S|cA}Xn{C1h${E]Z-XgZ*XPbp]^_qbH^e[`YM|a||+=]!Lc}]vdBc=j-YSZD]YmyYLYKZ9Z>Xcczc2{Yh}9Fc#Z.l{}(D{G{{mRhC|L3b#|xK[Bepj#ut`H[,{E9Yr}1b{[e]{ZFk7[ZYbZ0XL]}Ye[(`d}c!|*y`Dg=b;gR]Hm=hJho}R-[n}9;{N![7k_{UbmN]rf#pTe[x8}!Qcs_rs[m`|>N}^V})7{^r|/E}),}HH{OYe2{Skx)e<_.cj.cjoMhc^d}0uYZd!^J_@g,[[[?{i@][|3S}Yl3|!1|eZ|5IYw|1D}e7|Cv{OHbnx-`wvb[6[4} =g+k:{C:}ed{S]|2M]-}WZ|/q{LF|dYu^}Gs^c{Z=}h>|/i|{W]:|ip{N:|zt|S<{DH[p_tvD{N<[8Axo{X4a.^o^X>Yfa59`#ZBYgY~_t^9`jZHZn`>G[oajZ;X,i)Z.^~YJe ZiZF^{][[#Zt^|]Fjx]&_5dddW]P0C[-]}]d|y {C_jUql] |OpaA[Z{lp|rz}:Mu#]_Yf6{Ep?f5`$[6^D][^u[$[6^.Z8]]ePc2U/=]K^_+^M{q*|9tYuZ,s(dS{i=|bNbB{uG}0jZOa:[-]dYtu3]:]<{DJ_SZIqr_`l=Yt`gkTnXb3d@kiq0a`Z{|!B|}e}Ww{Sp,^Z|0>_Z}36|]A|-t}lt{R6pi|v8hPu#{C>YOZHYmg/Z4nicK[}hF_Bg|YRZ7c|crkzYZY}_iXcZ.|)U|L5{R~qi^Uga@Y[xb}&qdbd6h5|Btw[}c<{Ds53[Y7]?Z<|e0{L[ZK]mXKZ#Z2^tavf0`PE[OSOaP`4gi`qjdYMgys/?[nc,}EEb,eL]g[n{E_b/vcvgb.{kcwi`~v%|0:|iK{Jh_vf5lb}KL|(oi=LrzhhY_^@`zgf[~g)[J_0fk_V{T)}I_{D&_/d9W/|MU[)f$xW}?$xr4<{Lb{y4}&u{XJ|cm{Iu{jQ}CMkD{CX|7A}G~{kt)nB|d5|<-}WJ}@||d@|Iy}Ts|iL|/^|no|0;}L6{Pm]7}$zf:|r2}?C_k{R(}-w|`G{Gy[g]bVje=_0|PT{^Y^yjtT[[[l!Ye_`ZN]@[n_)j3nEgMa]YtYpZy].d-Y_cjb~Y~[nc~sCi3|zg}B0}do{O^{|$`_|D{}U&|0+{J3|8*]iayx{a{xJ_9|,c{Ee]QXlYb]$[%YMc*]w[aafe]aVYi[fZEii[xq2YQZHg]Y~h#|Y:thre^@^|_F^CbTbG_1^qf7{L-`VFx Zr|@EZ;gkZ@slgko`[e}T:{Cu^pddZ_`yav^Ea+[#ZBbSbO`elQfLui}.F|txYcbQ`XehcGe~fc^RlV{D_0ZAej[l&jShxG[ipB_=u:eU}3e8[=j|{D(}dO{Do[BYUZ0/]AYE]ALYhZcYlYP/^-^{Yt_1_-;YT`P4BZG=IOZ&]H[e]YYd[9^F[1YdZxZ?Z{Z<]Ba2[5Yb[0Z4l?]d_;_)a?YGEYiYv`_XmZs4ZjY^Zb]6gqGaX^9Y}dXZr[g|]Y}K aFZp^k^F]M`^{O1Ys]ZCgCv4|E>}8eb7}l`{L5[Z_faQ|c2}Fj}hw^#|Ng|B||w2|Sh{v+[G}aB|MY}A{|8o}X~{E8paZ:]i^Njq]new)`-Z>haounWhN}c#{DfZ|fK]KqGZ=:u|fqoqcv}2ssm}.r{]{nIfV{JW)[K|,Z{Uxc|]l_KdCb%]cfobya3`p}G^|LZiSC]U|(X|kBlVg[kNo({O:g:|-N|qT}9?{MBiL}Sq{`P|3a|u.{Uaq:{_o|^S}jX{Fob0`;|#y_@[V[K|cw[<_ }KU|0F}d3|et{Q7{LuZttsmf^kYZ`Af`}$x}U`|Ww}d]| >}K,r&|XI|*e{C/a-bmr1fId4[;b>tQ_:]hk{b-pMge]gfpo.|(w[jgV{EC1Z,YhaY^q,_G[c_g[J0YX]`[h^hYK^_Yib,` {i6vf@YM^hdOKZZn(jgZ>bzSDc^Z%[[o9[2=/YHZ(_/Gu_`*|8z{DUZxYt^vuvZjhi^lc&gUd4|<UiA`z]$b/Z?l}YI^jaHxe|;F}l${sQ}5g}hA|e4}?o{ih}Uz{C)jPe4]H^J[Eg[|AMZMlc}:,{iz}#*|gc{Iq|/:|zK{l&}#u|myd{{M&v~nV};L|(g|I]ogddb0xsd7^V})$uQ{HzazsgxtsO^l}F>ZB]r|{7{j@cU^{{CbiYoHlng]f+nQ[bkTn/}<-d9q {KXadZYo+n|l[|lc}V2{[a{S4Zam~Za^`{HH{xx_SvF|ak=c^[v^7_rYT`ld@]:_ub%[$[m](Shu}G2{E.ZU_L_R{tz`vj(f?^}hswz}GdZ}{S:h`aD|?W|`dgG|if{a8|J1{N,}-Ao3{H#{mfsP|[ bzn+}_Q{MT{u4kHcj_q`eZj[8o0jy{p7}C|[}l){MuYY{|Ff!Ykn3{rT|m,^R|,R}$~Ykgx{P!]>iXh6[l[/}Jgcg{JYZ.^qYfYIZl[gZ#Xj[Pc7YyZD^+Yt;4;`e8YyZVbQ7YzZxXja.7SYl[s]2^/Ha$[6ZGYrb%XiYdf2]H]kZkZ*ZQ[ZYS^HZXcCc%Z|[(bVZ]]:OJQ_DZCg<[,]%Zaa [g{C00HY[c%[ChyZ,Z_`PbXa+eh`^&jPi0a[ggvhlekL]w{Yp^v}[e{~;k%a&k^|nR_z_Qng}[E}*Wq:{k^{FJZpXRhmh3^p>de^=_7`|ZbaAZtdhZ?n4ZL]u`9ZNc3g%[6b=e.ZVfC[ZZ^^^hD{E(9c(kyZ=bb|Sq{k`|vmr>izlH[u|e`}49}Y%}FT{[z{Rk}Bz{TCc/lMiAqkf(m$hDc;qooi[}^o:c^|Qm}a_{mrZ(pA`,}<2sY| adf_%|}`}Y5U;}/4|D>|$X{jw{C<|F.hK|*A{MRZ8Zsm?imZm_?brYWZrYx`yVZc3a@f?aK^ojEd {bN}/3ZH]/$YZhm^&j 9|(S|b]mF}UI{q&aM]LcrZ5^.|[j`T_V_Gak}9J[ ZCZD|^h{N9{~&[6Zd{}B}2O|cv]K}3s}Uy|l,fihW{EG`j_QOp~Z$F^zexS`dcISfhZBXP|.vn|_HYQ|)9|cr]<`&Z6]m_(ZhPcSg>`Z]5`~1`0Xcb4k1{O!bz|CN_T{LR|a/gFcD|j<{Z._[f)mPc:1`WtIaT1cgYkZOaVZOYFrEe[}T$}Ch}mk{K-^@]fH{Hdi`c*Z&|Kt{if[C{Q;{xYB`dYIX:ZB[}]*[{{p9|4GYRh2ao{DS|V+[zd$`F[ZXKadb*A] Ys]Maif~a/Z2bmclb8{Jro_rz|x9cHojbZ{GzZx_)]:{wAayeDlx}<=`g{H1{l#}9i|)=|lP{Qq}.({La|!Y{i2EZfp=c*}Cc{EDvVB|;g}2t{W4av^Bn=]ri,|y?|3+}T*ckZ*{Ffr5e%|sB{lx^0]eZb]9[SgAjS_D|uHZx]dive[c.YPkcq/}db{EQh&hQ|eg}G!ljil|BO]X{Qr_GkGl~YiYWu=c3eb}29v3|D|}4i||.{Mv})V{SP1{FX}CZW6{cm|vO{pS|e#}A~|1i}81|Mw}es|5[}3w{C`h9aL]o{}p[G`>i%a1Z@`Ln2bD[$_h`}ZOjhdTrH{[j_:k~kv[Sdu]CtL}41{I |[[{]Zp$]XjxjHt_eThoa#h>sSt8|gK|TVi[Y{t=}Bs|b7Zpr%{gt|Yo{CS[/{iteva|cf^hgn}($_c^wmb^Wm+|55jrbF|{9^ q6{C&c+ZKdJkq_xOYqZYSYXYl`8]-cxZAq/b%b*_Vsa[/Ybjac/OaGZ4fza|a)gY{P?| I|Y |,pi1n7}9bm9ad|=d{aV|2@[(}B`d&|Uz}B}{`q|/H|!JkM{FU|CB|.{}Az}#P|lk}K{|2rk7{^8^?`/|k>|Ka{Sq}Gz}io{DxZh[yK_#}9<{TRdgc]`~Z>JYmYJ]|`!ZKZ]gUcx|^E[rZCd`f9oQ[NcD_$ZlZ;Zr}mX|=!|$6ZPZYtIo%fj}CpcN|B,{VDw~gb}@hZg`Q{LcmA[(bo`<|@$|o1|Ss}9Z_}tC|G`{F/|9nd}i=}V-{L8aaeST]daRbujh^xlpq8|}zs4bj[S`J|]?G{P#{rD{]I`OlH{Hm]VYuSYUbRc*6[j`8]pZ[bt_/^Jc*[<Z?YE|Xb|?_Z^Vcas]h{t9|Uwd)_(=0^6Zb{Nc} E[qZAeX[a]P^|_J>e8`W^j_Y}R{{Jp__]Ee#e:iWb9q_wKbujrbR}CY`,{mJ}gz{Q^{t~N|? gSga`V_||:#mi}3t|/I`X{N*|ct|2g{km}gi|{={jC}F;|E}{ZZjYf*frmu}8Tdroi{T[|+~}HG{cJ}DM{Lp{Ctd&}$hi3|FZ| m}Kr|38}^c|m_|Tr{Qv|36}?Up>|;S{DV{k_as}BK{P}}9p|t`jR{sAm4{D=b4pWa[}Xi{EjwEkI}3S|E?u=X0{jf} S|NM|JC{qo^3cm]-|JUx/{Cj{s>{Crt[UXuv|D~|j|d{YXZR}Aq}0r}(_{pJfi_z}0b|-vi)Z mFe,{f4|q`b{}^Z{HM{rbeHZ|^x_o|XM|L%|uFXm}@C_{{Hhp%a7|0p[Xp+^K}9U{bP}: tT}B|}+$|b2|[^|~h{FAby[`{}xgygrt~h1[li`c4vz|,7p~b(|mviN}^pg[{N/|g3|^0c,gE|f%|7N{q[|tc|TKA{LU}I@|AZp(}G-sz{F |qZ{}F|f-}RGn6{Z]_5})B}UJ{FFb2]4ZI@v=k,]t_Dg5Bj]Z-]L]vrpdvdGlk|gF}G]|IW}Y0[G| /bo|Te^,_B}#n^^{QHYI[?hxg{[`]D^IYRYTb&kJ[cri[g_9]Ud~^_]<p@_e_XdNm-^/|5)|h_{J;{kacVopf!q;asqd}n)|.m|bf{QW|U)}b+{tL|w``N|to{t ZO|T]jF}CB|0Q{e5Zw|k |We}5:{HO{tPwf_uajjBfX}-V_C_{{r~gg|Ude;s+}KNXH}! `K}eW{Upwbk%ogaW}9EYN}YY|&v|SL{C3[5s.]Y]I]u{M6{pYZ`^,`ZbCYR[1mNg>rsk0Ym[jrE]RYiZTr*YJ{Ge|%-lf|y(`=[t}E6{k!|3)}Zk} ][G{E~cF{u3U.rJ|a9p#o#ZE|?|{sYc#vv{E=|LC}cu{N8`/`3`9rt[4|He{cq|iSYxY`}V |(Q|t4{C?]k_Vlvk)BZ^r<{CL}#h}R+[<|i=}X|{KAo]|W<`K{NW|Zx}#;|fe{IMr<|K~tJ_x}AyLZ?{GvbLnRgN}X&{H7|x~}Jm{]-| GpNu0}.ok>|c4{PYisrDZ|fwh9|hfo@{H~XSbO]Odv]%`N]b1Y]]|eIZ}_-ZA]aj,>eFn+j[aQ_+]h[J_m_g]%_wf.`%k1e#Z?{CvYu_B^|gk`Xfh^M3`afGZ-Z|[m{L}|k3cp[it ^>YUi~d>{T*}YJ{Q5{Jxa$hg|%4`}|LAgvb }G}{P=|<;Ux{_skR{cV|-*|s-{Mp|XP|$G|_J}c6cM{_=_D|*9^$ec{V;|4S{qO|w_|.7}d0|/D}e}|0G{Dq]Kdp{}dfDi>}B%{Gd|nl}lf{C-{y}|ANZr}#={T~|-(}c&{pI|ft{lsVP}){|@u}!W|bcmB{d?|iW|:dxj{PSkO|Hl]Li:}VYk@|2={fnWt{M3`cZ6|)}|Xj}BYa?vo{e4|L7|B7{L7|1W|lvYO}W8nJ|$Vih|{T{d*_1|:-n2dblk``fT{Ky|-%}m!|Xy|-a{Pz}[l{kFjz|iH}9N{WE{x,|jz}R {P|{D)c=nX|Kq|si}Ge{sh|[X{RF{t`|jsr*fYf,rK|/9}$}}Nf{y!1|<Std}4Wez{W${Fd_/^O[ooqaw_z[L`Nbv[;l7V[ii3_PeM}.h^viqYjZ*j1}+3{bt{DR[;UG}3Og,rS{JO{qw{d<_zbAh<R[1_r`iZTbv^^a}c{iEgQZ<exZFg.^Rb+`Uj{a+{z<[~r!]`[[|rZYR|?F|qppp]L|-d|}K}YZUM|=Y|ktm*}F]{D;g{uI|7kg^}%?Z%ca{N[_<q4xC]i|PqZC]n}.bDrnh0Wq{tr|OMn6tM|!6|T`{O`|>!]ji+]_bTeU}Tq|ds}n|{Gm{z,f)}&s{DPYJ`%{CGd5v4tvb*hUh~bf]z`jajiFqAii]bfy^U{Or|m+{I)cS|.9k:e3`^|xN}@Dnlis`B|Qo{`W|>||kA}Y}{ERYuYx`%[exd`]|OyiHtb}HofUYbFo![5|+]gD{NIZR|Go}.T{rh^4]S|C9_}xO^i`vfQ}C)bK{TL}cQ|79iu}9a];sj{P.o!f[Y]pM``Jda^Wc9ZarteBZClxtM{LW}l9|a.mU}KX}4@{I+f1}37|8u}9c|v${xGlz}jP{Dd1}e:}31}%3X$|22i<v+r@~mf{sN{C67G97855F4YL5}8f{DT|xy{sO{DXB334@55J1)4.G9A#JDYtXTYM4, YQD9;XbXm9SX]IB^4UN=Xn<5(;(F3YW@XkH-X_VM[DYM:5XP!T&Y`6|,^{IS-*D.H>:LXjYQ0I3XhAF:9:(==.F*3F1189K/7163D,:@|e2{LS36D4hq{Lw/84443@4.933:0307::6D7}&l{Mx657;89;,K5678H&93D(H<&<>0B90X^I;}Ag1{P%3A+>><975}[S{PZE453?4|T2{Q+5187;>447:81{C=hL6{Me^:=7ii{R=.=F<81;48?|h8}Uh{SE|,VxL{ST,7?9Y_5Xk3A#:$%YSYdXeKXOD8+TXh7(@>(YdXYHXl9J6X_5IXaL0N?3YK7Xh!1?XgYz9YEXhXaYPXhC3X`-YLY_XfVf[EGXZ5L8BXL9YHX]SYTXjLXdJ: YcXbQXg1PX]Yx4|Jr{Ys4.8YU+XIY`0N,<H%-H;:0@,74/:8546I=9177154870UC]d<C3HXl7ALYzXFXWP<<?E!88E5@03YYXJ?YJ@6YxX-YdXhYG|9o{`iXjY_>YVXe>AYFX[/(I@0841?):-B=14337:8=|14{c&93788|di{cW-0>0<097/A;N{FqYpugAFT%X/Yo3Yn,#=XlCYHYNX[Xk3YN:YRT4?)-YH%A5XlYF3C1=NWyY}>:74-C673<69545v {iT85YED=64=.F4..9878/D4378?48B3:7:7/1VX[f4{D,{l<5E75{dAbRB-8-@+;DBF/$ZfW8S<4YhXA.(5@*11YV8./S95C/0R-A4AXQYI7?68167B95HA1*<M3?1/@;/=54XbYP36}lc{qzSS38:19?,/39193574/66878Yw1X-87E6=;964X`T734:>86>1/=0;(I-1::7ALYGXhF+Xk[@W%TYbX7)KXdYEXi,H-XhYMRXfYK?XgXj.9HX_SX]YL1XmYJ>Y}WwIXiI-3-GXcYyXUYJ$X`Vs[7;XnYEZ;XF! 3;%8;PXX(N3Y[)Xi1YE&/ :;74YQ6X`33C;-(>Xm0(TYF/!YGXg8 9L5P01YPXO-5%C|qd{{/K/E6,=0144:361:955;6443@?B7*7:F89&F35YaX-CYf,XiFYRXE_e{}sF 0*7XRYPYfXa5YXXY8Xf8Y~XmA[9VjYj*#YMXIYOXk,HHX40YxYMXU8OXe;YFXLYuPXP?EB[QV0CXfY{:9XV[FWE0D6X^YVP*$4%OXiYQ(|xp|%c3{}V`1>Y`XH00:8/M6XhQ1:;3414|TE|&o@1*=81G8<3}6<|(f6>>>5-5:8;093B^3U*+*^*UT30XgYU&7*O1953)5@E78--F7YF*B&0:%P68W9Zn5974J9::3}Vk|-,C)=)1AJ4+<3YGXfY[XQXmT1M-XcYTYZXCYZXEYXXMYN,17>XIG*SaS|/eYJXbI?XdNZ+WRYP<F:R PXf;0Xg`$|1GX9YdXjLYxWX!ZIXGYaXNYm6X9YMX?9EXmZ&XZ#XQ>YeXRXfAY[4 ;0X!Zz0XdN$XhYL XIY^XGNXUYS/1YFXhYk.TXn4DXjB{jg|4DEX]:XcZMW=A.+QYL<LKXc[vV$+&PX*Z3XMYIXUQ:ZvW< YSXFZ,XBYeXMM)?Xa XiZ4/EXcP3%}&-|6~:1(-+YT$@XIYRBC<}&,|7aJ6}bp|8)K1|Xg|8C}[T|8Q.89;-964I38361<=/;883651467<7:>?1:.}le|:Z=39;1Y^)?:J=?XfLXbXi=Q0YVYOXaXiLXmJXO5?.SFXiCYW}-;|=u&D-X`N0X^,YzYRXO(QX_YW9`I|>hZ:N&X)DQXP@YH#XmNXi$YWX^=!G6YbYdX>XjY|XlX^XdYkX>YnXUXPYF)FXT[EVTMYmYJXmYSXmNXi#GXmT3X8HOX[ZiXN]IU2>8YdX1YbX<YfWuZ8XSXcZU%0;1XnXkZ_WTG,XZYX5YSX Yp 05G?XcYW(IXg6K/XlYP4XnI @XnO1W4Zp-9C@%QDYX+OYeX9>--YSXkD.YR%Q/Yo YUX].Xi<HYEZ2WdCE6YMXa7F)=,D>-@9/8@5=?7164;35387?N<618=6>7D+C50<6B03J0{Hj|N9$D,9I-,.KB3}m |NzE0::/81YqXjMXl7YG; [.W=Z0X4XQY]:MXiR,XgM?9$9>:?E;YE77VS[Y564760391?14941:0=:8B:;/1DXjFA-564=0B3XlH1+D85:0Q!B#:-6&N/:9<-R3/7Xn<*3J4.H:+334B.=>30H.;3833/76464665755:/83H6633:=;.>5645}&E|Y)?1/YG-,93&N3AE@5 <L1-G/8A0D858/30>8<549=@B8] V0[uVQYlXeD(P#ID&7T&7;Xi0;7T-$YE)E=1:E1GR):--0YI7=E<}n9|aT6783A>D7&4YG7=391W;Zx<5+>F#J39}o/|cc;6=A050EQXg8A1-}D-|d^5548083563695D?-.YOXd37I$@LYLWeYlX<Yd+YR A$;3-4YQ-9XmA0!9/XLY_YT(=5XdDI>YJ5XP1ZAW{9>X_6R(XhYO65&J%DA)C-!B:97#A9;@?F;&;(9=11/=657/H,<8}bz|j^5446>.L+&Y^8Xb6?(CYOXb*YF(8X`FYR(XPYVXmPQ%&DD(XmZXW??YOXZXfCYJ79,O)XnYF7K0!QXmXi4IYFRXS,6<%-:YO(+:-3Q!1E1:W,Zo}Am|n~;3580534*?3Zc4=9334361693:30C<6/717:<1/;>59&:4}6!|rS36=1?75<8}[B|s809983579I.A.>84758=108564741H*9E{L{|u%YQ<%6XfH.YUXe4YL@,>N}Tv|ve*G0X)Z;/)3@A74(4P&A1X:YVH97;,754*A66:1 D739E3553545558E4?-?K17/770843XAYf838A7K%N!YW4.$T19Z`WJ*0XdYJXTYOXNZ 1XaN1A+I&Xi.Xk3Z3GB&5%WhZ1+5#Y[X<4YMXhQYoQXVXbYQ8XSYUX4YXBXWDMG0WxZA[8V+Z8X;D],Va$%YeX?FXfX[XeYf<X:Z[WsYz8X_Y]%XmQ(!7BXIZFX]&YE3F$(1XgYgYE& +[+W!<YMYFXc;+PXCYI9YrWxGXY9DY[!GXiI7::)OC;*$.>N*HA@{C|}&k=:<TB83X`3YL+G4XiK]i}(fYK<=5$.FYE%4*5*H*6XkCYL=*6Xi6!Yi1KXR4YHXbC8Xj,B9ZbWx/XbYON#5B}Ue}+QKXnF1&YV5XmYQ0!*3IXBYb71?1B75XmF;0B976;H/RXU:YZX;BG-NXj;XjI>A#D3B636N;,*%<D:0;YRXY973H5)-4FXOYf0:0;/7759774;7;:/855:543L43<?6=E,.A4:C=L)%4YV!1(YE/4YF+ F3%;S;&JC:%/?YEXJ4GXf/YS-EXEYW,9;E}X$}547EXiK=51-?71C%?57;5>463553Zg90;6447?<>4:9.7538XgN{|!}9K/E&3-:D+YE1)YE/3;37/:05}n<}:UX8Yj4Yt864@JYK..G=.(A Q3%6K>3(P3#AYE$-6H/456*C=.XHY[#S.<780191;057C)=6HXj?955B:K1 E>-B/9,;5.!L?:0>/.@//:;7833YZ56<4:YE=/:7Z_WGC%3I6>XkC*&NA16X=Yz2$X:Y^&J48<99k8}CyB-61<18K946YO4{|N}E)YIB9K0L>4=46<1K0+R;6-=1883:478;4,S+3YJX`GJXh.Yp+Xm6MXcYpX(>7Yo,/:X=Z;Xi0YTYHXjYmXiXj;*;I-8S6N#XgY}.3XfYGO3C/$XjL$*NYX,1 6;YH&<XkK9C#I74.>}Hd`A748X[T450[n75<4439:18A107>|ET}Rf<1;14876/Yb983E<5.YNXd4149>,S=/4E/<306443G/06}0&}UkYSXFYF=44=-5095=88;63844,9E6644{PL}WA8:>)7+>763>>0/B3A545CCnT}Xm|dv}Xq1L/YNXk/H8;;.R63351YY747@15YE4J8;46;.38.>4A369.=-83,;Ye3?:3@YE.4-+N353;/;@(X[YYD>@/05-I*@.:551741Yf5>6A443<3535;.58/86=D4753442$635D1>0359NQ @73:3:>><Xn?;43C14 ?Y|X611YG1&<+,4<*,YLXl<1/AIXjF*N89A4Z576K1XbJ5YF.ZOWN.YGXO/YQ01:4G38Xl1;KI0YFXB=R<7;D/,/4>;$I,YGXm94@O35Yz66695385.>:6A#5}W7n^4336:4157597434433<3|XA}m`>=D>:4A.337370?-6Q96{`E|4A}C`|Qs{Mk|J+~r>|o,wHv>Vw}!c{H!|Gb|*Ca5}J||,U{t+{CN[!M65YXOY_*B,Y[Z9XaX[QYJYLXPYuZ%XcZ8LY[SYPYKZM<LMYG9OYqSQYM~[e{UJXmQYyZM_)>YjN1~[f3{aXFY|Yk:48YdH^NZ0|T){jVFYTZNFY^YTYN~[h{nPYMYn3I]`EYUYsYIZEYJ7Yw)YnXPQYH+Z.ZAZY]^Z1Y`YSZFZyGYHXLYG 8Yd#4~[i|+)YH9D?Y^F~Y7|-eYxZ^WHYdYfZQ~[j|3>~[k|3oYmYqY^XYYO=Z*4[]Z/OYLXhZ1YLZIXgYIHYEYK,<Y`YEXIGZI[3YOYcB4SZ!YHZ*&Y{Xi3~[l|JSY`Zz?Z,~[m|O=Yi>??XnYWXmYS617YVYIHZ(Z4[~L4/=~[n|Yu{P)|];YOHHZ}~[o33|a>~[r|aE]DH~[s|e$Zz~[t|kZFY~XhYXZB[`Y}~[u|{SZ&OYkYQYuZ2Zf8D~[v}% ~[w3},Q[X]+YGYeYPIS~[y}4aZ!YN^!6PZ*~[z}?E~[{3}CnZ=~[}}EdDZz/9A3(3S<,YR8.D=*XgYPYcXN3Z5 4)~[~}JW=$Yu.XX~] }KDX`PXdZ4XfYpTJLY[F5]X~[2Yp}U+DZJ::<446[m@~]#3}]1~]%}^LZwZQ5Z`/OT<Yh^ -~]&}jx[ ~m<z!%2+~ly4VY-~o>}p62yz!%2+Xf2+~ly4VY-zQ`z (=] 2z~o2",C={" ":0,"!":1},c=34,i=2,p,s="",u=String.fromCharCode,t=u(12539);while(++c<127)C[u(c)]=c^39&&c^92?i++:0;i=0;while(0<=(c=C[a.charAt(i++)]))if(16==c)if((c=C[a.charAt(i++)])<87){if(86==c)c=1879;while(c--)s+=u(++p)}else s+=s.substr(8272,360);else if(c<86)s+=u(p+=c<51?c-16:(c-55)*92+C[a.charAt(i++)]);else if((c=((c-86)*92+C[a.charAt(i++)])*92+C[a.charAt(i++)])<49152)s+=u(p=c<40960?c:c|57344);else{c&=511;while(c--)s+=t;p=12539}return s')();
JCT8836=JCT11280.substring(0,8836);

function EscapeEUCJP(str){
    return str.replace(/[^*+.-9A-Z_a-z-]/g,function(s){
	var c=s.charCodeAt(0);
	return (c<128?(c<16?"%0":"%")+c.toString(16):65376<c&&c<65440?"%8E%"+(c-65216).toString(16):(c=JCT8836.indexOf(s))<0?"%A1%A6":"%"+((c-(c%=94))/94+161).toString(16)+"%"+(c+161).toString(16)).toUpperCase()
    })
};
function EscapeSJIS(str){
    return str.replace(/[^*+.-9A-Z_a-z-]/g,function(s){
	var c=s.charCodeAt(0),m;
	return c<128?(c<16?"%0":"%")+c.toString(16).toUpperCase():65376<c&&c<65440?"%"+(c-65216).toString(16).toUpperCase():(c=JCT11280.indexOf(s))<0?"%81E":"%"+((m=((c<8272?c:(c=JCT11280.lastIndexOf(s)))-(c%=188))/188)<31?m+129:m+193).toString(16).toUpperCase()+(64<(c+=c<63?64:65)&&c<91||95==c||96<c&&c<123?String.fromCharCode(c):"%"+c.toString(16).toUpperCase())
    })
};
function EscapeUTF8(str){
    return str.replace(/[^*+.-9A-Z_a-z-]/g,function(s){
	var c=s.charCodeAt(0);
	return (c<16?"%0"+c.toString(16):c<128?"%"+c.toString(16):c<2048?"%"+(c>>6|192).toString(16)+"%"+(c&63|128).toString(16):"%"+(c>>12|224).toString(16)+"%"+(c>>6&63|128).toString(16)+"%"+(c&63|128).toString(16)).toUpperCase()
    })
};

//=== like prototype.js ===
function $(id){
    return document.getElementById(id);
}

function $N(name, attr, childs) {
    var ret = document.createElement(name);
    for (var k in attr) {
	if (!attr.hasOwnProperty(k)) continue;
	v = attr[k];
	if (k == "class") {
	    ret.className = v;
	} else {
	    ret.setAttribute(k, v);
	}
    }
    switch (typeof childs) {
    case "string": {
	ret.appendChild(document.createTextNode(childs));
	break;
    }
    case "object": {
	for (var i = 0, len = childs.length; i < len; i++) {
	    var child = childs[i];
	    if (typeof child == "string") {
		ret.appendChild(document.createTextNode(child));
	    } else {
		ret.appendChild(child);
	    }
	}
	break;
    }
    }
    return ret;
}

// JSDeferred 0.2.2 (c) Copyright (c) 2007 cho45 ( www.lowreal.net )
// See http://coderepos.org/share/wiki/JSDeferred
function Deferred () { return (this instanceof Deferred) ? this.init() : new Deferred() }
Deferred.ok = function (x) { return x };
Deferred.ng = function (x) { throw  x };
Deferred.prototype = {
    init : function () {
	this._next = null;
	this.callback = {
	    ok: Deferred.ok,
	    ng: Deferred.ng
	};
	return this;
    },

    next  : function (fun) { return this._post("ok", fun) },
    error : function (fun) { return this._post("ng", fun) },
    call  : function (val) { return this._fire("ok", val) },
    fail  : function (err) { return this._fire("ng", err) },

    cancel : function () {
	(this.canceller || function () {})();
	return this.init();
    },

    _post : function (okng, fun) {
	this._next =  new Deferred();
	this._next.callback[okng] = fun;
	return this._next;
    },

    _fire : function (okng, value) {
	var next = "ok";
	try {
	    value = this.callback[okng].call(this, value);
	} catch (e) {
	    next  = "ng";
	    value = e;
	}
	if (value instanceof Deferred) {
	    value._next = this._next;
	} else {
	    if (this._next) this._next._fire(next, value);
	}
	return this;
    }
};

Deferred.parallel = function (dl) {
    var ret = new Deferred(), values = {}, num = 0;
    for (var i in dl) if (dl.hasOwnProperty(i)) (function (d, i) {
	d.next(function (v) {
	    values[i] = v;
	    if (--num <= 0) {
		if (dl instanceof Array) {
		    values.length = dl.length;
		    values = Array.prototype.slice.call(values, 0);
		}
		ret.call(values);
	    }
	}).error(function (e) {
	    ret.fail(e);
	});
	num++;
    })(dl[i], i);

    if (!num) Deferred.next(function () { ret.call() });
    ret.canceller = function () {
	for (var i in dl) if (dl.hasOwnProperty(i)) {
	    dl[i].cancel();
	}
    };
    return ret;
};

Deferred.wait = function (n) {
    var d = new Deferred(), t = new Date();
    var id = setTimeout(function () {
	clearTimeout(id);
	d.call((new Date).getTime() - t.getTime());
    }, n * 1000);
    d.canceller = function () { try { clearTimeout(id) } catch (e) {} };
    return d;
};

Deferred.next_default = function (fun) {
    var d = new Deferred();
    var id = setTimeout(function () { clearTimeout(id); d.call() }, 0);
    d.canceller = function () { try { clearTimeout(id) } catch (e) {} };
    if (fun) d.callback.ok = fun;
    return d;
};
Deferred.next_faster_way_Image = ((typeof(Image) != "undefined") && document.addEventListener) && function (fun) {
    var d = new Deferred();
    var img = new Image();
    var handler = function () {
	d.canceller();
	d.call();
    };
    img.addEventListener("load", handler, false);
    img.addEventListener("error", handler, false);
    d.canceller = function () {
	img.removeEventListener("load", handler, false);
	img.removeEventListener("error", handler, false);
    };
    img.src = "data:,/ _ / X";
    if (fun) d.callback.ok = fun;
    return d;
};
Deferred.next_faster_way_readystatechange = (!window.opera && /\bMSIE\b/.test(navigator.userAgent)) && function (fun) {
    var d = new Deferred();
    var t = new Date().getTime();
    if (t - arguments.callee._prev_timeout_called < 150) {
	var cancel = false;
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src  = "javascript:";
	script.onreadystatechange = function () {
	    if (!cancel) {
		d.canceller();
		d.call();
	    }
	};
	d.canceller = function () {
	    if (!cancel) {
		cancel = true;
		script.onreadystatechange = null;
		document.body.removeChild(script);
	    }
	};
	document.body.appendChild(script);
    } else {
	arguments.callee._prev_timeout_called = t;
	var id = setTimeout(function () { clearTimeout(id); d.call() }, 0);
	d.canceller = function () { try { clearTimeout(id) } catch (e) {} };
    }
    if (fun) d.callback.ok = fun;
    return d;
};
Deferred.next = Deferred.next_faster_way_Image ||
    Deferred.next_faster_way_readystatechange ||
    Deferred.next_default;

Deferred.call = function (f, args) {
    args = Array.prototype.slice.call(arguments);
    f = args.shift();
    return Deferred.next(function () {
	return f.apply(this, args);
    });
};

Deferred.loop = function (n, fun) {
    var o = {
	begin : n.begin || 0,
	end   : (typeof n.end == "number") ? n.end : n - 1,
	step  : n.step  || 1,
	last  : false,
	prev  : null
    };
    var ret, step = o.step;
    return Deferred.next(function () {
	function _loop (i) {
	    if (i <= o.end) {
		if ((i + step) > o.end) {
		    o.last = true;
		    o.step = o.end - i + 1;
		}
		o.prev = ret;
		ret = fun.call(this, i, o);
		if (ret instanceof Deferred) {
		    return ret.next(function (r) {
			ret = r;
			return Deferred.call(_loop, i + step);
		    });
		} else {
		    return Deferred.call(_loop, i + step);
		}
	    } else {
		return ret;
	    }
	}
	return (o.begin <= o.end) ? Deferred.call(_loop, o.begin) : null;
    });
};

Deferred.register = function (name, fun) {
    this.prototype[name] = function () {
	return this.next(Deferred.wrap(fun).apply(null, arguments));
    };
};

Deferred.wrap = function (dfun) {
    return function () {
	var a = arguments;
	return function () {
	    return dfun.apply(null, a);
	};
    };
};

Deferred.register("loop", Deferred.loop);
Deferred.register("wait", Deferred.wait);

Deferred.define = function (obj, list) {
    if (!list) list = ["parallel", "wait", "next", "call", "loop"];
    if (!obj)  obj  = (function getGlobal () { return this })();
    for (var i = 0; i < list.length; i++) {
	var n = list[i];
	obj[n] = Deferred[n];
    }
    return Deferred;
};
Deferred.define();

// via http://github.com/hatena/hatena-bookmark-xul/blob/master/chrome/content/common/05-HTMLDocumentCreator.js
//     http://userscripts.org/scripts/review/22702
function createDocumentFromString(source){
  var doc = document.cloneNode(false);
  doc.appendChild(doc.importNode(document.documentElement, false));
  var range = document.createRange();
  range.selectNodeContents(document.documentElement);
  var fragment = range.createContextualFragment(source);
  var headChildNames = {title: true, meta: true, link: true, script: true, style: true, /*object: true,*/ base: true/*, isindex: true,*/};
  var child, head = doc.getElementsByTagName('head')[0] || doc.createElement('head'),
             body = doc.getElementsByTagName('body')[0] || doc.createElement('body');
  while ((child = fragment.firstChild)) {
    if (
      (child.nodeType === doc.ELEMENT_NODE && !(child.nodeName.toLowerCase() in headChildNames)) ||
      (child.nodeType === doc.TEXT_NODE &&/\S/.test(child.nodeValue))
       )
      break;
    head.appendChild(child);
  }
  body.appendChild(fragment);
  doc.documentElement.appendChild(head);
  doc.documentElement.appendChild(body);
  return doc;
}

//=== extend version of $X ===
/* $X(exp);
$X(exp, context);
$X(exp, type);
$X(exp, context, type);
http://coderepos.org/share/browser/lang/javascript/userscripts/jautopagerize.user.js?rev=1966 */
function $X (exp, context, type /* want type */) {
    if (arguments.callee.forceRelative || navigator.userAgent.indexOf("Safari/523.12") != -1)
	exp = exp.replace(/id\(\s*([\"\'])([^\"\']+)\1\s*\)/g, '//*[@id="$2"]');
    if (arguments.callee.forceRelative)
	exp = exp.indexOf("(//") == 0
	? "(.//" + exp.substring(3)
	: (exp[0] == "/" ? "." : "./") + exp;
    if (typeof context == "function") {
	type = context;
	context = null;
    }
    if (!context) context = document;
    exp = (context.ownerDocument || context).createExpression(exp, function (prefix) {
	return document.createNSResolver((context.ownerDocument == null ? context
					  : context.ownerDocument).documentElement)
	    .lookupNamespaceURI(prefix) || document.documentElement.namespaceURI;
    });
    switch (type) {
    case String:
	return exp.evaluate(context, XPathResult.STRING_TYPE, null).stringValue;
    case Number:
	return exp.evaluate(context, XPathResult.NUMBER_TYPE, null).numberValue;
    case Boolean:
	return exp.evaluate(context, XPathResult.BOOLEAN_TYPE, null).booleanValue;
    case Array:
	var result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var ret = [];
	for (var i = 0, len = result.snapshotLength; i < len; i++) {
	    ret.push(result.snapshotItem(i));
	}
	return ret;
    case undefined:
	var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
	switch (result.resultType) {
	case XPathResult.STRING_TYPE : return result.stringValue;
	case XPathResult.NUMBER_TYPE : return result.numberValue;
	case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
	case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
	    /* not ensure the order. */
	    var ret = [];
	    var i = null;
	    while (i = result.iterateNext()) {
		ret.push(i);
	    }
	    return ret;
	}
	}
	return null;
    default:
	throw(TypeError("$X: specified type is not valid type."));
    }
}

/**
 * http://google-caja.googlecode.com/svn/trunk/src/com/google/caja/plugin/html-sanitizer.js (MinifiedJs)
 * Strips unsafe tags and attributes from html.
 * @param {string} htmlText to sanitize
 * @param {Function} opt_uriPolicy -- a transform to apply to uri/url attribute
 *     values.
 * @param {Function} opt_nmTokenPolicy : string -> string? -- a transform to
 *     apply to names, ids, and classes.
 * @return {string} html
 */
{var css={'properties':(function(){var s=['|left|center|right','|top|center|bottom','#(?:[\\da-f]{3}){1,2}|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|rgb\\(\\s*(?:-?\\d+|0|[+\\-]?\\d+(?:\\.\\d+)?%)\\s*,\\s*(?:-?\\d+|0|[+\\-]?\\d+(?:\\.\\d+)?%)\\s*,\\s*(?:-?\\d+|0|[+\\-]?\\d+(?:\\.\\d+)?%)\\)','[+\\-]?\\d+(?:\\.\\d+)?(?:[cem]m|ex|in|p[ctx])','\\d+(?:\\.\\d+)?(?:[cem]m|ex|in|p[ctx])','none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset','[+\\-]?\\d+(?:\\.\\d+)?%','\\d+(?:\\.\\d+)?%','url\\(\"[^()\\\\\"\\r\\n]+\"\\)','repeat-x|repeat-y|(?:repeat|space|round|no-repeat)(?:\\s+(?:repeat|space|round|no-repeat)){0,2}'],c=[RegExp('^\\s*(?:\\s*(?:0|'+s[3]+'|'+s[6]+')){1,2}\\s*$','i'),RegExp('^\\s*(?:\\s*(?:0|'+s[3]+'|'+s[6]+')){1,4}(?:\\s*\\/(?:\\s*(?:0|'+s[3]+'|'+s[6]+')){1,4})?\\s*$','i'),RegExp('^\\s*(?:\\s*none|(?:(?:\\s*(?:'+s[2]+')\\s+(?:0|'+s[3]+')(?:\\s*(?:0|'+s[3]+')){1,4}(?:\\s*inset)?|(?:\\s*inset)?\\s+(?:0|'+s[3]+')(?:\\s*(?:0|'+s[3]+')){1,4}(?:\\s*(?:'+s[2]+'))?)\\s*,)*(?:\\s*(?:'+s[2]+')\\s+(?:0|'+s[3]+')(?:\\s*(?:0|'+s[3]+')){1,4}(?:\\s*inset)?|(?:\\s*inset)?\\s+(?:0|'+s[3]+')(?:\\s*(?:0|'+s[3]+')){1,4}(?:\\s*(?:'+s[2]+'))?))\\s*$','i'),RegExp('^\\s*(?:'+s[2]+'|transparent|inherit)\\s*$','i'),RegExp('^\\s*(?:'+s[5]+'|inherit)\\s*$','i'),RegExp('^\\s*(?:thin|medium|thick|0|'+s[3]+'|inherit)\\s*$','i'),RegExp('^\\s*(?:(?:thin|medium|thick|0|'+s[3]+'|'+s[5]+'|'+s[2]+'|transparent|inherit)(?:\\s+(?:thin|medium|thick|0|'+s[3]+')|\\s+(?:'+s[5]+')|\\s*#(?:[\\da-f]{3}){1,2}|\\s+aqua|\\s+black|\\s+blue|\\s+fuchsia|\\s+gray|\\s+green|\\s+lime|\\s+maroon|\\s+navy|\\s+olive|\\s+orange|\\s+purple|\\s+red|\\s+silver|\\s+teal|\\s+white|\\s+yellow|\\s+rgb\\(\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\)|\\s+transparent|\\s+inherit){0,2}|inherit)\\s*$','i'),/^\s*(?:none|inherit)\s*$/i,RegExp('^\\s*(?:'+s[8]+'|none|inherit)\\s*$','i'),RegExp('^\\s*(?:0|'+s[3]+'|'+s[6]+'|auto|inherit)\\s*$','i'),RegExp('^\\s*(?:0|'+s[4]+'|'+s[7]+'|none|inherit|auto)\\s*$','i'),RegExp('^\\s*(?:0|'+s[4]+'|'+s[7]+'|inherit|auto)\\s*$','i'),/^\s*(?:0(?:\.\d+)?|\.\d+|1(?:\.0+)?|inherit)\s*$/i,RegExp('^\\s*(?:(?:'+s[2]+'|invert|inherit|'+s[5]+'|thin|medium|thick|0|'+s[3]+')(?:\\s*#(?:[\\da-f]{3}){1,2}|\\s+aqua|\\s+black|\\s+blue|\\s+fuchsia|\\s+gray|\\s+green|\\s+lime|\\s+maroon|\\s+navy|\\s+olive|\\s+orange|\\s+purple|\\s+red|\\s+silver|\\s+teal|\\s+white|\\s+yellow|\\s+rgb\\(\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\)|\\s+invert|\\s+inherit|\\s+(?:'+s[5]+'|inherit)|\\s+(?:thin|medium|thick|0|'+s[3]+'|inherit)){0,2}|inherit)\\s*$','i'),RegExp('^\\s*(?:'+s[2]+'|invert|inherit)\\s*$','i'),/^\s*(?:visible|hidden|scroll|auto|no-display|no-content)\s*$/i,RegExp('^\\s*(?:0|'+s[4]+'|'+s[7]+'|inherit)\\s*$','i'),/^\s*(?:auto|always|avoid|left|right|inherit)\s*$/i,RegExp('^\\s*(?:0|[+\\-]?\\d+(?:\\.\\d+)?m?s|'+s[6]+'|inherit)\\s*$','i'),/^\s*(?:0|[+\-]?\d+(?:\.\d+)?|inherit)\s*$/i,/^\s*(?:clip|ellipsis)\s*$/i,RegExp('^\\s*(?:normal|0|'+s[3]+'|inherit)\\s*$','i')];return{'-moz-border-radius':c[1],'-moz-border-radius-bottomleft':c[0],'-moz-border-radius-bottomright':c[0],'-moz-border-radius-topleft':c[0],'-moz-border-radius-topright':c[0],'-moz-box-shadow':c[2],'-moz-opacity':c[12],'-moz-outline':c[13],'-moz-outline-color':c[14],'-moz-outline-style':c[4],'-moz-outline-width':c[5],'-o-text-overflow':c[20],'-webkit-border-bottom-left-radius':c[0],'-webkit-border-bottom-right-radius':c[0],'-webkit-border-radius':c[1],'-webkit-border-radius-bottom-left':c[0],'-webkit-border-radius-bottom-right':c[0],'-webkit-border-radius-top-left':c[0],'-webkit-border-radius-top-right':c[0],'-webkit-border-top-left-radius':c[0],'-webkit-border-top-right-radius':c[0],'-webkit-box-shadow':c[2],'azimuth':/^\s*(?:0|[+\-]?\d+(?:\.\d+)?(?:g?rad|deg)|(?:left-side|far-left|left|center-left|center|center-right|right|far-right|right-side|behind)(?:\s+(?:left-side|far-left|left|center-left|center|center-right|right|far-right|right-side|behind))?|leftwards|rightwards|inherit)\s*$/i,'background':RegExp('^\\s*(?:\\s*(?:'+s[8]+'|none|(?:(?:0|'+s[6]+'|'+s[3]+s[0]+')(?:\\s+(?:0|'+s[6]+'|'+s[3]+s[1]+'))?|(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?)(?:\\s+(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?))?)(?:\\s*\\/\\s*(?:(?:0|'+s[4]+'|'+s[6]+'|auto)(?:\\s+(?:0|'+s[4]+'|'+s[6]+'|auto)){0,2}|cover|contain))?|\\/\\s*(?:(?:0|'+s[4]+'|'+s[6]+'|auto)(?:\\s+(?:0|'+s[4]+'|'+s[6]+'|auto)){0,2}|cover|contain)|'+s[9]+'|scroll|fixed|local|(?:border|padding|content)-box)(?:\\s*'+s[8]+'|\\s+none|(?:\\s+(?:0|'+s[6]+'|'+s[3]+s[0]+')(?:\\s+(?:0|'+s[6]+'|'+s[3]+s[1]+'))?|(?:\\s+(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?)){1,2})(?:\\s*\\/\\s*(?:(?:0|'+s[4]+'|'+s[6]+'|auto)(?:\\s+(?:0|'+s[4]+'|'+s[6]+'|auto)){0,2}|cover|contain))?|\\s*\\/\\s*(?:(?:0|'+s[4]+'|'+s[6]+'|auto)(?:\\s+(?:0|'+s[4]+'|'+s[6]+'|auto)){0,2}|cover|contain)|\\s+repeat-x|\\s+repeat-y|(?:\\s+(?:repeat|space|round|no-repeat)){1,2}|\\s+(?:scroll|fixed|local)|\\s+(?:border|padding|content)-box){0,4}\\s*,)*\\s*(?:'+s[2]+'|transparent|inherit|'+s[8]+'|none|(?:(?:0|'+s[6]+'|'+s[3]+s[0]+')(?:\\s+(?:0|'+s[6]+'|'+s[3]+s[1]+'))?|(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?)(?:\\s+(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?))?)(?:\\s*\\/\\s*(?:(?:0|'+s[4]+'|'+s[6]+'|auto)(?:\\s+(?:0|'+s[4]+'|'+s[6]+'|auto)){0,2}|cover|contain))?|\\/\\s*(?:(?:0|'+s[4]+'|'+s[6]+'|auto)(?:\\s+(?:0|'+s[4]+'|'+s[6]+'|auto)){0,2}|cover|contain)|'+s[9]+'|scroll|fixed|local|(?:border|padding|content)-box)(?:\\s*#(?:[\\da-f]{3}){1,2}|\\s+aqua|\\s+black|\\s+blue|\\s+fuchsia|\\s+gray|\\s+green|\\s+lime|\\s+maroon|\\s+navy|\\s+olive|\\s+orange|\\s+purple|\\s+red|\\s+silver|\\s+teal|\\s+white|\\s+yellow|\\s+rgb\\(\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\)|\\s+transparent|\\s+inherit|\\s*'+s[8]+'|\\s+none|(?:\\s+(?:0|'+s[6]+'|'+s[3]+s[0]+')(?:\\s+(?:0|'+s[6]+'|'+s[3]+s[1]+'))?|(?:\\s+(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?)){1,2})(?:\\s*\\/\\s*(?:(?:0|'+s[4]+'|'+s[6]+'|auto)(?:\\s+(?:0|'+s[4]+'|'+s[6]+'|auto)){0,2}|cover|contain))?|\\s*\\/\\s*(?:(?:0|'+s[4]+'|'+s[6]+'|auto)(?:\\s+(?:0|'+s[4]+'|'+s[6]+'|auto)){0,2}|cover|contain)|\\s+repeat-x|\\s+repeat-y|(?:\\s+(?:repeat|space|round|no-repeat)){1,2}|\\s+(?:scroll|fixed|local)|\\s+(?:border|padding|content)-box){0,5}\\s*$','i'),'background-attachment':/^\s*(?:scroll|fixed|local)(?:\s*,\s*(?:scroll|fixed|local))*\s*$/i,'background-color':c[3],'background-image':RegExp('^\\s*(?:'+s[8]+'|none)(?:\\s*,\\s*(?:'+s[8]+'|none))*\\s*$','i'),'background-position':RegExp('^\\s*(?:(?:0|'+s[6]+'|'+s[3]+s[0]+')(?:\\s+(?:0|'+s[6]+'|'+s[3]+s[1]+'))?|(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?)(?:\\s+(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?))?)(?:\\s*,\\s*(?:(?:0|'+s[6]+'|'+s[3]+s[0]+')(?:\\s+(?:0|'+s[6]+'|'+s[3]+s[1]+'))?|(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?)(?:\\s+(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?))?))*\\s*$','i'),'background-repeat':RegExp('^\\s*(?:'+s[9]+')(?:\\s*,\\s*(?:'+s[9]+'))*\\s*$','i'),'border':RegExp('^\\s*(?:(?:thin|medium|thick|0|'+s[3]+'|'+s[5]+'|'+s[2]+'|transparent)(?:\\s+(?:thin|medium|thick|0|'+s[3]+')|\\s+(?:'+s[5]+')|\\s*#(?:[\\da-f]{3}){1,2}|\\s+aqua|\\s+black|\\s+blue|\\s+fuchsia|\\s+gray|\\s+green|\\s+lime|\\s+maroon|\\s+navy|\\s+olive|\\s+orange|\\s+purple|\\s+red|\\s+silver|\\s+teal|\\s+white|\\s+yellow|\\s+rgb\\(\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\)|\\s+transparent){0,2}|inherit)\\s*$','i'),'border-bottom':c[6],'border-bottom-color':c[3],'border-bottom-left-radius':c[0],'border-bottom-right-radius':c[0],'border-bottom-style':c[4],'border-bottom-width':c[5],'border-collapse':/^\s*(?:collapse|separate|inherit)\s*$/i,'border-color':RegExp('^\\s*(?:(?:'+s[2]+'|transparent)(?:\\s*#(?:[\\da-f]{3}){1,2}|\\s+aqua|\\s+black|\\s+blue|\\s+fuchsia|\\s+gray|\\s+green|\\s+lime|\\s+maroon|\\s+navy|\\s+olive|\\s+orange|\\s+purple|\\s+red|\\s+silver|\\s+teal|\\s+white|\\s+yellow|\\s+rgb\\(\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\)|\\s+transparent){0,4}|inherit)\\s*$','i'),'border-left':c[6],'border-left-color':c[3],'border-left-style':c[4],'border-left-width':c[5],'border-radius':c[1],'border-right':c[6],'border-right-color':c[3],'border-right-style':c[4],'border-right-width':c[5],'border-spacing':RegExp('^\\s*(?:(?:\\s*(?:0|'+s[3]+')){1,2}|\\s*inherit)\\s*$','i'),'border-style':RegExp('^\\s*(?:(?:'+s[5]+')(?:\\s+(?:'+s[5]+')){0,4}|inherit)\\s*$','i'),'border-top':c[6],'border-top-color':c[3],'border-top-left-radius':c[0],'border-top-right-radius':c[0],'border-top-style':c[4],'border-top-width':c[5],'border-width':RegExp('^\\s*(?:(?:thin|medium|thick|0|'+s[3]+')(?:\\s+(?:thin|medium|thick|0|'+s[3]+')){0,4}|inherit)\\s*$','i'),'bottom':c[9],'box-shadow':c[2],'caption-side':/^\s*(?:top|bottom|inherit)\s*$/i,'clear':/^\s*(?:none|left|right|both|inherit)\s*$/i,'clip':RegExp('^\\s*(?:rect\\(\\s*(?:0|'+s[3]+'|auto)\\s*,\\s*(?:0|'+s[3]+'|auto)\\s*,\\s*(?:0|'+s[3]+'|auto)\\s*,\\s*(?:0|'+s[3]+'|auto)\\)|auto|inherit)\\s*$','i'),'color':RegExp('^\\s*(?:'+s[2]+'|inherit)\\s*$','i'),'counter-increment':c[7],'counter-reset':c[7],'cue':RegExp('^\\s*(?:(?:'+s[8]+'|none|inherit)(?:\\s*'+s[8]+'|\\s+none|\\s+inherit)?|inherit)\\s*$','i'),'cue-after':c[8],'cue-before':c[8],'cursor':RegExp('^\\s*(?:(?:\\s*'+s[8]+'\\s*,)*\\s*(?:auto|crosshair|default|pointer|move|e-resize|ne-resize|nw-resize|n-resize|se-resize|sw-resize|s-resize|w-resize|text|wait|help|progress|all-scroll|col-resize|hand|no-drop|not-allowed|row-resize|vertical-text)|\\s*inherit)\\s*$','i'),'direction':/^\s*(?:ltr|rtl|inherit)\s*$/i,'display':/^\s*(?:inline|block|list-item|run-in|inline-block|table|inline-table|table-row-group|table-header-group|table-footer-group|table-row|table-column-group|table-column|table-cell|table-caption|none|inherit|-moz-inline-box|-moz-inline-stack)\s*$/i,'elevation':/^\s*(?:0|[+\-]?\d+(?:\.\d+)?(?:g?rad|deg)|below|level|above|higher|lower|inherit)\s*$/i,'empty-cells':/^\s*(?:show|hide|inherit)\s*$/i,'filter':RegExp('^\\s*(?:\\s*alpha\\(\\s*opacity\\s*=\\s*(?:0|'+s[6]+'|[+\\-]?\\d+(?:\\.\\d+)?)\\))+\\s*$','i'),'float':/^\s*(?:left|right|none|inherit)\s*$/i,'font':RegExp('^\\s*(?:(?:normal|italic|oblique|inherit|small-caps|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)(?:\\s+(?:normal|italic|oblique|inherit|small-caps|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)){0,2}\\s+(?:xx-small|x-small|small|medium|large|x-large|xx-large|(?:small|larg)er|0|'+s[4]+'|'+s[7]+'|inherit)(?:\\s*\\/\\s*(?:normal|0|\\d+(?:\\.\\d+)?|'+s[4]+'|'+s[7]+'|inherit))?(?:(?:\\s*\"\\w(?:[\\w-]*\\w)(?:\\s+\\w([\\w-]*\\w))*\"|\\s+(?:serif|sans-serif|cursive|fantasy|monospace))(?:\\s*,\\s*(?:\"\\w(?:[\\w-]*\\w)(?:\\s+\\w([\\w-]*\\w))*\"|serif|sans-serif|cursive|fantasy|monospace))*|\\s+inherit)|caption|icon|menu|message-box|small-caption|status-bar|inherit)\\s*$','i'),'font-family':/^\s*(?:(?:"\w(?:[\w-]*\w)(?:\s+\w([\w-]*\w))*"|serif|sans-serif|cursive|fantasy|monospace)(?:\s*,\s*(?:"\w(?:[\w-]*\w)(?:\s+\w([\w-]*\w))*"|serif|sans-serif|cursive|fantasy|monospace))*|inherit)\s*$/i,'font-size':RegExp('^\\s*(?:xx-small|x-small|small|medium|large|x-large|xx-large|(?:small|larg)er|0|'+s[4]+'|'+s[7]+'|inherit)\\s*$','i'),'font-stretch':/^\s*(?:normal|wider|narrower|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded)\s*$/i,'font-style':/^\s*(?:normal|italic|oblique|inherit)\s*$/i,'font-variant':/^\s*(?:normal|small-caps|inherit)\s*$/i,'font-weight':/^\s*(?:normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit)\s*$/i,'height':c[9],'left':c[9],'letter-spacing':c[21],'line-height':RegExp('^\\s*(?:normal|0|\\d+(?:\\.\\d+)?|'+s[4]+'|'+s[7]+'|inherit)\\s*$','i'),'list-style':RegExp('^\\s*(?:(?:disc|circle|square|decimal|decimal-leading-zero|lower-roman|upper-roman|lower-greek|lower-latin|upper-latin|armenian|georgian|lower-alpha|upper-alpha|none|inherit|inside|outside|'+s[8]+')(?:\\s+(?:disc|circle|square|decimal|decimal-leading-zero|lower-roman|upper-roman|lower-greek|lower-latin|upper-latin|armenian|georgian|lower-alpha|upper-alpha|none|inherit)|\\s+(?:inside|outside|inherit)|\\s*'+s[8]+'|\\s+none|\\s+inherit){0,2}|inherit)\\s*$','i'),'list-style-image':c[8],'list-style-position':/^\s*(?:inside|outside|inherit)\s*$/i,'list-style-type':/^\s*(?:disc|circle|square|decimal|decimal-leading-zero|lower-roman|upper-roman|lower-greek|lower-latin|upper-latin|armenian|georgian|lower-alpha|upper-alpha|none|inherit)\s*$/i,'margin':RegExp('^\\s*(?:(?:0|'+s[3]+'|'+s[6]+'|auto)(?:\\s+(?:0|'+s[3]+'|'+s[6]+'|auto)){0,4}|inherit)\\s*$','i'),'margin-bottom':c[9],'margin-left':c[9],'margin-right':c[9],'margin-top':c[9],'max-height':c[10],'max-width':c[10],'min-height':c[11],'min-width':c[11],'opacity':c[12],'outline':c[13],'outline-color':c[14],'outline-style':c[4],'outline-width':c[5],'overflow':/^\s*(?:visible|hidden|scroll|auto|inherit)\s*$/i,'overflow-x':c[15],'overflow-y':c[15],'padding':RegExp('^\\s*(?:(?:\\s*(?:0|'+s[4]+'|'+s[7]+')){1,4}|\\s*inherit)\\s*$','i'),'padding-bottom':c[16],'padding-left':c[16],'padding-right':c[16],'padding-top':c[16],'page-break-after':c[17],'page-break-before':c[17],'page-break-inside':/^\s*(?:avoid|auto|inherit)\s*$/i,'pause':RegExp('^\\s*(?:(?:\\s*(?:0|[+\\-]?\\d+(?:\\.\\d+)?m?s|'+s[6]+')){1,2}|\\s*inherit)\\s*$','i'),'pause-after':c[18],'pause-before':c[18],'pitch':/^\s*(?:0|\d+(?:\.\d+)?k?Hz|x-low|low|medium|high|x-high|inherit)\s*$/i,'pitch-range':c[19],'play-during':RegExp('^\\s*(?:'+s[8]+'\\s*(?:mix|repeat)(?:\\s+(?:mix|repeat))?|auto|none|inherit)\\s*$','i'),'position':/^\s*(?:static|relative|absolute|inherit)\s*$/i,'quotes':c[7],'richness':c[19],'right':c[9],'speak':/^\s*(?:normal|none|spell-out|inherit)\s*$/i,'speak-header':/^\s*(?:once|always|inherit)\s*$/i,'speak-numeral':/^\s*(?:digits|continuous|inherit)\s*$/i,'speak-punctuation':/^\s*(?:code|none|inherit)\s*$/i,'speech-rate':/^\s*(?:0|[+\-]?\d+(?:\.\d+)?|x-slow|slow|medium|fast|x-fast|faster|slower|inherit)\s*$/i,'stress':c[19],'table-layout':/^\s*(?:auto|fixed|inherit)\s*$/i,'text-align':/^\s*(?:left|right|center|justify|inherit)\s*$/i,'text-decoration':/^\s*(?:none|(?:underline|overline|line-through|blink)(?:\s+(?:underline|overline|line-through|blink)){0,3}|inherit)\s*$/i,'text-indent':RegExp('^\\s*(?:0|'+s[3]+'|'+s[6]+'|inherit)\\s*$','i'),'text-overflow':c[20],'text-shadow':c[2],'text-transform':/^\s*(?:capitalize|uppercase|lowercase|none|inherit)\s*$/i,'text-wrap':/^\s*(?:normal|unrestricted|none|suppress)\s*$/i,'top':c[9],'unicode-bidi':/^\s*(?:normal|embed|bidi-override|inherit)\s*$/i,'vertical-align':RegExp('^\\s*(?:baseline|sub|super|top|text-top|middle|bottom|text-bottom|0|'+s[6]+'|'+s[3]+'|inherit)\\s*$','i'),'visibility':/^\s*(?:visible|hidden|collapse|inherit)\s*$/i,'voice-family':/^\s*(?:(?:\s*(?:"\w(?:[\w-]*\w)(?:\s+\w([\w-]*\w))*"|male|female|child)\s*,)*\s*(?:"\w(?:[\w-]*\w)(?:\s+\w([\w-]*\w))*"|male|female|child)|\s*inherit)\s*$/i,'volume':RegExp('^\\s*(?:0|\\d+(?:\\.\\d+)?|'+s[7]+'|silent|x-soft|soft|medium|loud|x-loud|inherit)\\s*$','i'),'white-space':/^\s*(?:normal|pre|nowrap|pre-wrap|pre-line|inherit|-o-pre-wrap|-moz-pre-wrap|-pre-wrap)\s*$/i,'width':RegExp('^\\s*(?:0|'+s[4]+'|'+s[7]+'|auto|inherit)\\s*$','i'),'word-spacing':c[21],'word-wrap':/^\s*(?:normal|break-word)\s*$/i,'z-index':/^\s*(?:auto|-?\d+|inherit)\s*$/i,'zoom':RegExp('^\\s*(?:normal|0|\\d+(?:\\.\\d+)?|'+s[7]+')\\s*$','i')}})(),'alternates':{'MozBoxShadow':['boxShadow'],'WebkitBoxShadow':['boxShadow'],'float':['cssFloat','styleFloat']},'HISTORY_INSENSITIVE_STYLE_WHITELIST':{'display':true,'filter':true,'float':true,'height':true,'left':true,'opacity':true,'overflow':true,'position':true,'right':true,'top':true,'visibility':true,'width':true,'padding-left':true,'padding-right':true,'padding-top':true,'padding-bottom':true}},html,html4;html4={},html4
.atype={'NONE':0,'URI':1,'URI_FRAGMENT':11,'SCRIPT':2,'STYLE':3,'ID':4,'IDREF':5,'IDREFS':6,'GLOBAL_NAME':7,'LOCAL_NAME':8,'CLASSES':9,'FRAME_TARGET':10},html4
.ATTRIBS={'*::class':9,'*::dir':0,'*::id':4,'*::lang':0,'*::onclick':2,'*::ondblclick':2,'*::onkeydown':2,'*::onkeypress':2,'*::onkeyup':2,'*::onload':2,'*::onmousedown':2,'*::onmousemove':2,'*::onmouseout':2,'*::onmouseover':2,'*::onmouseup':2,'*::style':3,'*::title':0,'a::accesskey':0,'a::coords':0,'a::href':1,'a::hreflang':0,'a::name':7,'a::onblur':2,'a::onfocus':2,'a::rel':0,'a::rev':0,'a::shape':0,'a::tabindex':0,'a::target':10,'a::type':0,'area::accesskey':0,'area::alt':0,'area::coords':0,'area::href':1,'area::nohref':0,'area::onblur':2,'area::onfocus':2,'area::shape':0,'area::tabindex':0,'area::target':10,'bdo::dir':0,'blockquote::cite':1,'br::clear':0,'button::accesskey':0,'button::disabled':0,'button::name':8,'button::onblur':2,'button::onfocus':2,'button::tabindex':0,'button::type':0,'button::value':0,'caption::align':0,'col::align':0,'col::char':0,'col::charoff':0,'col::span':0,'col::valign':0,'col::width':0,'colgroup::align':0,'colgroup::char':0,'colgroup::charoff':0,'colgroup::span':0,'colgroup::valign':0,'colgroup::width':0,'del::cite':1,'del::datetime':0,'dir::compact':0,'div::align':0,'dl::compact':0,'font::color':0,'font::face':0,'font::size':0,'form::accept':0,'form::action':1,'form::autocomplete':0,'form::enctype':0,'form::method':0,'form::name':7,'form::onreset':2,'form::onsubmit':2,'form::target':10,'h1::align':0,'h2::align':0,'h3::align':0,'h4::align':0,'h5::align':0,'h6::align':0,'hr::align':0,'hr::noshade':0,'hr::size':0,'hr::width':0,'iframe::align':0,'iframe::frameborder':0,'iframe::height':0,'iframe::marginheight':0,'iframe::marginwidth':0,'iframe::width':0,'img::align':0,'img::alt':0,'img::border':0,'img::height':0,'img::hspace':0,'img::ismap':0,'img::name':7,'img::src':1,'img::usemap':11,'img::vspace':0,'img::width':0,'input::accept':0,'input::accesskey':0,'input::align':0,'input::alt':0,'input::autocomplete':0,'input::checked':0,'input::disabled':0,'input::ismap':0,'input::maxlength':0,'input::name':8,'input::onblur':2,'input::onchange':2,'input::onfocus':2,'input::onselect':2,'input::readonly':0,'input::size':0,'input::src':1,'input::tabindex':0,'input::type':0,'input::usemap':11,'input::value':0,'ins::cite':1,'ins::datetime':0,'label::accesskey':0,'label::for':5,'label::onblur':2,'label::onfocus':2,'legend::accesskey':0,'legend::align':0,'li::type':0,'li::value':0,'map::name':7,'menu::compact':0,'ol::compact':0,'ol::start':0,'ol::type':0,'optgroup::disabled':0,'optgroup::label':0,'option::disabled':0,'option::label':0,'option::selected':0,'option::value':0,'p::align':0,'pre::width':0,'q::cite':1,'select::disabled':0,'select::multiple':0,'select::name':8,'select::onblur':2,'select::onchange':2,'select::onfocus':2,'select::size':0,'select::tabindex':0,'table::align':0,'table::bgcolor':0,'table::border':0,'table::cellpadding':0,'table::cellspacing':0,'table::frame':0,'table::rules':0,'table::summary':0,'table::width':0,'tbody::align':0,'tbody::char':0,'tbody::charoff':0,'tbody::valign':0,'td::abbr':0,'td::align':0,'td::axis':0,'td::bgcolor':0,'td::char':0,'td::charoff':0,'td::colspan':0,'td::headers':6,'td::height':0,'td::nowrap':0,'td::rowspan':0,'td::scope':0,'td::valign':0,'td::width':0,'textarea::accesskey':0,'textarea::cols':0,'textarea::disabled':0,'textarea::name':8,'textarea::onblur':2,'textarea::onchange':2,'textarea::onfocus':2,'textarea::onselect':2,'textarea::readonly':0,'textarea::rows':0,'textarea::tabindex':0,'tfoot::align':0,'tfoot::char':0,'tfoot::charoff':0,'tfoot::valign':0,'th::abbr':0,'th::align':0,'th::axis':0,'th::bgcolor':0,'th::char':0,'th::charoff':0,'th::colspan':0,'th::headers':6,'th::height':0,'th::nowrap':0,'th::rowspan':0,'th::scope':0,'th::valign':0,'th::width':0,'thead::align':0,'thead::char':0,'thead::charoff':0,'thead::valign':0,'tr::align':0,'tr::bgcolor':0,'tr::char':0,'tr::charoff':0,'tr::valign':0,'ul::compact':0,'ul::type':0},html4
.eflags={'OPTIONAL_ENDTAG':1,'EMPTY':2,'CDATA':4,'RCDATA':8,'UNSAFE':16,'FOLDABLE':32,'SCRIPT':64,'STYLE':128},html4
.ELEMENTS={'a':0,'abbr':0,'acronym':0,'address':0,'applet':16,'area':2,'b':0,'base':18,'basefont':18,'bdo':0,'big':0,'blockquote':0,'body':49,'br':2,'button':0,'caption':0,'center':0,'cite':0,'code':0,'col':2,'colgroup':1,'dd':1,'del':0,'dfn':0,'dir':0,'div':0,'dl':0,'dt':1,'em':0,'fieldset':0,'font':0,'form':0,'frame':18,'frameset':16,'h1':0,'h2':0,'h3':0,'h4':0,'h5':0,'h6':0,'head':49,'hr':2,'html':49,'i':0,'iframe':4,'img':2,'input':2,'ins':0,'isindex':18,'kbd':0,'label':0,'legend':0,'li':1,'link':18,'map':0,'menu':0,'meta':18,'noframes':20,'noscript':20,'object':16,'ol':0,'optgroup':0,'option':1,'p':1,'param':18,'pre':0,'q':0,'s':0,'samp':0,'script':84,'select':0,'small':0,'span':0,'strike':0,'strong':0,'style':148,'sub':0,'sup':0,'table':0,'tbody':1,'td':1,'textarea':8,'tfoot':1,'th':1,'thead':1,'title':24,'tr':1,'tt':0,'u':0,'ul':0,'var':0},html=(function(){var
ENTITIES,INSIDE_TAG_TOKEN,OUTSIDE_TAG_TOKEN,ampRe,decimalEscapeRe,entityRe,eqRe,gtRe,hexEscapeRe,lcase,looseAmpRe,ltRe,nulRe,quotRe;'script'==='SCRIPT'.toLowerCase()?(lcase=function(s){return s.toLowerCase()}):(lcase=function(s){return s.replace(/[A-Z]/g,function(ch){return String.fromCharCode(ch.charCodeAt(0)|32)})}),ENTITIES={'lt':'<','gt':'>','amp':'&','nbsp':'\xa0','quot':'\"','apos':'\''},decimalEscapeRe=/^#(\d+)$/,hexEscapeRe=/^#x([0-9A-Fa-f]+)$/;function
lookupEntity(name){var m;return name=lcase(name),ENTITIES.hasOwnProperty(name)?ENTITIES[name]:(m=name.match(decimalEscapeRe),m?String.fromCharCode(parseInt(m[1],10)):(m=name.match(hexEscapeRe))?String.fromCharCode(parseInt(m[1],16)):'')}function
decodeOneEntity(_,name){return lookupEntity(name)}nulRe=/\0/g;function stripNULs(s){return s.replace(nulRe,'')}entityRe=/&(#\d+|#x[0-9A-Fa-f]+|\w+);/g;function
unescapeEntities(s){return s.replace(entityRe,decodeOneEntity)}ampRe=/&/g,looseAmpRe=/&([^a-z#]|#(?:[^0-9x]|x(?:[^0-9a-f]|$)|$)|$)/gi,ltRe=/</g,gtRe=/>/g,quotRe=/\"/g,eqRe=/\=/g;function
escapeAttrib(s){return s.replace(ampRe,'&amp;').replace(ltRe,'&lt;').replace(gtRe,'&gt;').replace(quotRe,'&#34;').replace(eqRe,'&#61;')}function
normalizeRCData(rcdata){return rcdata.replace(looseAmpRe,'&amp;$1').replace(ltRe,'&lt;').replace(gtRe,'&gt;')}INSIDE_TAG_TOKEN=new
RegExp('^\\s*(?:(?:([a-z][a-z-]*)(\\s*=\\s*(\"[^\"]*\"|\'[^\']*\'|(?=[a-z][a-z-]*\\s*=)|[^>\"\'\\s]*))?)|(/?>)|.[^a-z\\s>]*)','i'),OUTSIDE_TAG_TOKEN=new
RegExp('^(?:&(\\#[0-9]+|\\#[x][0-9a-f]+|\\w+);|<!--[\\s\\S]*?-->|<!\\w[^>]*>|<\\?[^>*]*>|<(/)?([a-z][a-z0-9]*)|([^<&>]+)|([<&>]))','i');function
makeSaxParser(handler){return function parse(htmlText,param){var attribName,attribs,dataEnd,decodedValue,eflags,encodedValue,htmlLower,inTag,m,openTag,tagName;htmlText=String(htmlText),htmlLower=null,inTag=false,attribs=[],tagName=void
0,eflags=void 0,openTag=void 0,handler.startDoc&&handler.startDoc(param);while(htmlText){m=htmlText.match(inTag?INSIDE_TAG_TOKEN:OUTSIDE_TAG_TOKEN),htmlText=htmlText.substring(m[0].length);if(inTag){if(m[1]){attribName=lcase(m[1]);if(m[2]){encodedValue=m[3];switch(encodedValue.charCodeAt(0)){case
34:case 39:encodedValue=encodedValue.substring(1,encodedValue.length-1)}decodedValue=unescapeEntities(stripNULs(encodedValue))}else
decodedValue=attribName;attribs.push(attribName,decodedValue)}else if(m[4])eflags!==void
0&&(openTag?handler.startTag&&handler.startTag(tagName,attribs,param):handler.endTag&&handler.endTag(tagName,param)),openTag&&eflags&(html4
.eflags.CDATA|html4 .eflags.RCDATA)&&(htmlLower===null?(htmlLower=lcase(htmlText)):(htmlLower=htmlLower.substring(htmlLower.length-htmlText.length)),dataEnd=htmlLower.indexOf('</'+tagName),dataEnd<0&&(dataEnd=htmlText.length),eflags&html4
.eflags.CDATA?handler.cdata&&handler.cdata(htmlText.substring(0,dataEnd),param):handler.rcdata&&handler.rcdata(normalizeRCData(htmlText.substring(0,dataEnd)),param),htmlText=htmlText.substring(dataEnd)),tagName=eflags=openTag=void
0,attribs.length=0,inTag=false}else if(m[1])handler.pcdata&&handler.pcdata(m[0],param);else
if(m[3])openTag=!m[2],inTag=true,tagName=lcase(m[3]),eflags=html4 .ELEMENTS.hasOwnProperty(tagName)?html4
.ELEMENTS[tagName]:void 0;else if(m[4])handler.pcdata&&handler.pcdata(m[4],param);else
if(m[5]){if(handler.pcdata)switch(m[5]){case'<':handler.pcdata('&lt;',param);break;case'>':handler.pcdata('&gt;',param);break;default:handler.pcdata('&amp;',param)}}}handler.endDoc&&handler.endDoc(param)}}return{'normalizeRCData':normalizeRCData,'escapeAttrib':escapeAttrib,'unescapeEntities':unescapeEntities,'makeSaxParser':makeSaxParser}})(),html.makeHtmlSanitizer=function(sanitizeAttributes){var
ignoring,stack;return html.makeSaxParser({'startDoc':function(_){stack=[],ignoring=false},'startTag':function(tagName,attribs,out){var
attribName,eflags,i,n,value;if(ignoring)return;if(!html4 .ELEMENTS.hasOwnProperty(tagName))return;eflags=html4
.ELEMENTS[tagName];if(eflags&html4 .eflags.FOLDABLE)return;else if(eflags&html4 .eflags.UNSAFE)return ignoring=!(eflags&html4
.eflags.EMPTY),void 0;attribs=sanitizeAttributes(tagName,attribs);if(attribs){eflags&html4
.eflags.EMPTY||stack.push(tagName),out.push('<',tagName);for(i=0,n=attribs.length;i<n;i+=2)attribName=attribs[i],value=attribs[i+1],value!==null&&value!==void
0&&out.push(' ',attribName,'=\"',html.escapeAttrib(value),'\"');out.push('>')}},'endTag':function(tagName,out){var
eflags,i,index,stackEl;if(ignoring)return ignoring=false,void 0;if(!html4 .ELEMENTS.hasOwnProperty(tagName))return;eflags=html4
.ELEMENTS[tagName];if(!(eflags&(html4 .eflags.UNSAFE|html4 .eflags.EMPTY|html4 .eflags.FOLDABLE))){if(eflags&html4
.eflags.OPTIONAL_ENDTAG)for(index=stack.length;--index>=0;){stackEl=stack[index];if(stackEl===tagName)break;if(!(html4
.ELEMENTS[stackEl]&html4 .eflags.OPTIONAL_ENDTAG))return}else for(index=stack.length;--index>=0;)if(stack[index]===tagName)break;if(index<0)return;for(i=stack.length;--i>index;)stackEl=stack[i],html4
.ELEMENTS[stackEl]&html4 .eflags.OPTIONAL_ENDTAG||out.push('</',stackEl,'>');stack.length=index,out.push('</',tagName,'>')}},'pcdata':function(text,out){ignoring||out.push(text)},'rcdata':function(text,out){ignoring||out.push(text)},'cdata':function(text,out){ignoring||out.push(text)},'endDoc':function(out){var
i;for(i=stack.length;--i>=0;)out.push('</',stack[i],'>');stack.length=0}})};function
html_sanitize(htmlText,opt_uriPolicy,opt_nmTokenPolicy){var out=[];return html.makeHtmlSanitizer(function
sanitizeAttribs(tagName,attribs){var attribKey,attribName,atype,i,value;for(i=0;i<attribs.length;i+=2){attribName=attribs[i],value=attribs[i+1],atype=null,((attribKey=tagName+'::'+attribName,html4
.ATTRIBS.hasOwnProperty(attribKey))||(attribKey='*::'+attribName,html4 .ATTRIBS.hasOwnProperty(attribKey)))&&(atype=html4
.ATTRIBS[attribKey]);if(atype!==null)switch(atype){case html4 .atype.NONE:break;case
html4 .atype.SCRIPT:case html4 .atype.STYLE:value=null;break;case html4 .atype.ID:case
html4 .atype.IDREF:case html4 .atype.IDREFS:case html4 .atype.GLOBAL_NAME:case html4
.atype.LOCAL_NAME:case html4 .atype.CLASSES:value=opt_nmTokenPolicy?opt_nmTokenPolicy(value):value;break;case
html4 .atype.URI:value=opt_uriPolicy&&opt_uriPolicy(value);break;case html4 .atype.URI_FRAGMENT:value&&'#'===value.charAt(0)?(value=opt_nmTokenPolicy?opt_nmTokenPolicy(value):value,value&&(value='#'+value)):(value=null);break;default:value=null}else
value=null;attribs[i+1]=value}return attribs})(htmlText,out),out.join('')}}

function removeXSSRisk (htmldoc){
    var attr = "allowscriptaccess";
    $X("descendant-or-self::embed", htmldoc).forEach(function(elm){
	if(!elm.hasAttribute(attr)) return;
	elm.setAttribute(attr, "never");
    });
    $X("descendant-or-self::param", htmldoc).forEach(function(elm){
	if(!elm.getAttribute("name") || elm.getAttribute("name").toLowerCase().indexOf(attr) < 0) return;
	elm.setAttribute("value", "never");
    });
}

//-----------------------------------------------------------------------------
// Load script.
//-----------------------------------------------------------------------------
if(document.body) {

    //== GM_getValue ==
    Setting.load();
    SITEINFO = FluJE.getSiteInfo();
    //== Userscript command ==
    GM_registerMenuCommand('Fast look up JP and EN - reset setting', function(){
	Setting.reset()
	Message.show("Reset all settings.");
    });
    //== Event ==
    ShortcutKey.add(window, SETTINGS.shortcutkey.navi_toggle, Navi.toggle);
    ShortcutKey.add(window, SETTINGS.shortcutkey.close_all, FluJE.allRemove, true);
    ShortcutKey.add(window, SETTINGS.shortcutkey.QL_run, QLu.run);
    if(SETTINGS.shortcutkey.site.length){
	var keys = [];
	if(SETTINGS.shortcutkey.site.length) {
	    SETTINGS.shortcutkey.site.forEach(function(v,i){
		var match = false;
		keys.forEach(function(key, idx){
		    if(key.shortcutkey == v.shortcutkey) {
			keys[idx].id.push(v.id);
			match = true;
		    }
		});
		if(!match)
		    keys.push({shortcutkey:v.shortcutkey, id:[v.id]});
	    });
	}
	if(keys.length) {
	    keys.forEach(function(key, idx){
 		ShortcutKey.add(window, key.shortcutkey, function(evt){
 		    FluJE.selectionEvent(evt, key.id, true);
 		}, false);
	    });
	}
    }
    window.addEventListener("mouseup", FluJE.selectionEvent, true);
    window.addEventListener('click', FluJE.removeResult, false);
    GM_registerMenuCommand('Fast look up JP and EN - import siteinfo', function(){
	next(function() {
	    FluJE.importSiteInfo();
	    Message.show("Imported SITEINFO.");
	}).next(function() {
	    SETTINGS.shortcutkey.site = [];
 	    SETTINGS.lookup = Setting._default.lookup;
 	    SETTINGS.translation = Setting._default.translation;
	    Navi.remove();
	}).next(function() {
	    wait(2).next(function() {
		Message.show("Reset site shortcutkey and selected site.");
	    });
	    Setting.save();
	});
    });
    if(SETTINGS.enable_wheel_button) {
	window.addEventListener('click', function(e){
	    if(e.button===1)
		FluJE.selectionEvent(e, false, true);
	}, false);
    }
}
