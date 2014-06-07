// ==UserScript==
// @name           ByPasser v2
// @author         Max789 
// @description    ByPass all link shortning websites
// @version        2.4
// @match          http://tmf.myegy.com/*
// @match          http://www.egcenter.com/*
// @include        http://imzdb.com/*
// @include        http://1tool.biz/*
// @match          http://nn.arabseed.com/*
// @match          http://wn.arabseed.com/*
// @match          http://s5.egyup.com/*
// @match          *short5.com/*
// @match          http://zero10.net/*
// @match          http://file.gamesgb.com/*
// @match          http://downloads.zyzoom.net/*
// @match          http://url2cash.com/*
// ==/UserScript==




var ByPasser = {
	//core function
    getHTMLSource : function (url) {
	    var xhr = new XMLHttpRequest();
	    xhr.open("get", url, false);
	    xhr.send(null);
	    return xhr.responseText;
	}/*end fn:getHTMLSource*/,

    CheckPage: function (windowLocation, secondPage) {
        windowLocation = windowLocation.pathname;
        return ~(windowLocation.search(secondPage));
    },/*end fn:CheckPage*/

    redirectTo: function (link) {
       if(link) location.href = link;
    },/*end fn:redirectTo*/

    refresh_redirector: function (metaIndex , secondString) {
        var meta_Element = document.getElementsByTagName('meta');
        try {
            meta_Element = meta_Element[metaIndex];
            meta_Element.content = meta_Element.content.replace(secondString, "0;");
        } catch (e) {
            var index = 0, elem;
            do {
                elem = meta_Element[index];
                index++;
            } while (!(elem.getAttribute('http-equiv') !== null && elem.getAttribute('http-equiv') === 'refresh') && index <= meta_Element.length);
            elem.content = elem.content.replace(elem.content.slice(0, elem.content.indexOf(";")+1), "0;");
        }
    },/*end fn:refresh_redirector*/

    secondPage: [
    	['www.egcenter.com','imzdb.com','wn.arabseed.com','nn.arabseed.com','s5.egyup.com',
    		'www.short5.com','short5.com'],
    	['tmf.myegy.com'],
    	['1tool.biz']
    ],

    _secondPage: ['/m1.php?id=','/2-ar.php?id=','/2.php?id='],

    secondLink: function(){
    	for(i = 0; i < this.secondPage.length; i++){
    		if(this.secondPage[i].indexOf(page.host) !== -1) return this._secondPage[i];
    	}
    },

    regex_NewWindow: /NewWindow\(['"](.+?)["']/,

    script1: function(){
    	document.title = 'Bypassing -max789-';
    	var link,
    		btn = document.getElementsByName('groovybtn1')[0];
    	if(btn){
    		link = this.regex_NewWindow.exec(btn.onclick)[1];
    	}else{
    		//link = /=(\d+)[\D\n]?/.exec(page.href)[1];
    		link = /[=|\/]((\d+){3,})[\D\n]?/.exec(page.href)[1];
    		link = "http://" + page.host + this.secondLink() + link;
    		link = this.getHTMLSource(link);
    		link = this.regex_NewWindow.exec(link)[1];
    	}
    	this.redirectTo(link);
    },

    script2: function(){
    	document.title = 'Bypassing -max789-';
    	var link,
    		btn = document.getElementsByClassName('groovybtn1')[0];
    	if(btn){
    		link = this.regex_NewWindow.exec(btn.onclick)[1];
    	}else{
    		//link = /=(\d+)[\D\n]?/.exec(page.href)[1];
    		link = /[=|\/]((\d+){3,})[\D\n]?/.exec(page.href)[1];
    		link = "http://" + page.host + this.secondLink() + link;
    		link = this.getHTMLSource(link);
    		link = this.regex_NewWindow.exec(link)[1];
    	}
        this.redirectTo(link);
    },


    script3: function(){
    	document.title = 'Bypassing -max789-';
    	var link,
    		btn = document.getElementById('cont');
    	if(btn){
    		link = this.regex_NewWindow.exec(btn.onclick)[1];
    	}else{
    		link = /[=|\/]((\d+){3,})[\D\n]?/.exec(page.href)[1];
    		link = "http://" + page.host + this.secondLink() + link;
    		link = this.getHTMLSource(link);
    		link = this.regex_NewWindow.exec(link)[1];
    	}
    	this.redirectTo(link);
    },

    script4: function(){
    	var btn;
        btn = document.getElementsByName("groovybtn1")[0];
        if(btn){
        	var link = btn.getAttribute('onclick');  
            link = link.slice(11, link.lastIndexOf("','n"));
            this.redirectTo(link);
        }else{
          document.querySelectorAll("[type='submit']")[0].click();
        }
    },

    file_GamesGB: function () {
        window.top.stop();
        var content = $('[name="description"]').attr("content").toString();
        var link = content.substr(0,content.indexOf(" "));
        this.redirectTo(link);
    },/*end fn:file_GamesGB*/

    
};



var page = window.location;
if(page.pathname.length > 1){
switch (page.host) {
	case 'www.egcenter.com':
	case 'imzdb.com' :
	case 'tmf.myegy.com':
		ByPasser.script1();
		break;
	case 's5.egyup.com':
	case 'short5.com':
	case 'www.short5.com':
    	ByPasser.script2();
        break;
	case 'wn.arabseed.com':
	case '1tool.biz':
    case 'nn.arabseed.com':
		ByPasser.script3();
		break;
	case "zero10.net":
        ByPasser.script4();
        break;
    case "file.gamesgb.com":
        (/\d/.test(page.pathname)) ? ByPasser.file_GamesGB() : null ;
        break;
    case "downloads.zyzoom.net":
        var l =$("a.downloadLink").eq(0).attr("href");
        ByPasser.redirectTo(l);
        break;
    case "url2cash.com":
        if(page.pathname !== '/link/doneadd.html'){
            ByPasser.redirectTo($(".btn-primary").attr("href"));
            ByPasser.redirectTo($(".small").attr("href"));
        }
        break;
    
}//end switch
}