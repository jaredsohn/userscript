// ==UserScript==
// @name          Convert javascript or onclick to normal links
// @author        Simon Houston
// @namespace     http://shoust.techwhack.org
// @description   Converts javascript or onclick links that open pages in new windows into normal links, so middle clicking on those type of links are possible, if you have any problems, list the sites that cause problems in the comments box, thanks :)
// ==/UserScript==
(function()
    {
    getaddress = /([\.\w+]*\([\x22\x27]([\w+\\:.\-\/\$\=\&\?\%\!]+)[\x22\x27]\)?)/gi; //the regular expression to get the address.
	stjslink=/^javascript:/; //makes sure the link's href attribute starts with javascript:
	invalink=/^javascript:(\/\/|)$/; //makes sure void javascript links also convert
	invallink=/^javascript:void[\(\d{1,2}\)]/; //exception so numbers don't convert into links.
exceptions=/(alert|split|push|EventListener|confirm|opener|chEvent|navigate|bytagname|replace|regexp|interval|timeout|array|prompt|function|indexof|Element|Attribute|void|typeof|quicktime|mediaplayer|wmv)\x28/i; //sets exceptions so bookmarklets in most cases still work, or onclick events still work.
    var ty = document.links;
        for (var i = ty.length-1,u;u=ty[i]; i--)
            {
            if(u.getAttribute('onclick')){u.setAttribute('onclick',u.getAttribute('onclick')+';void(0)');}
            if (u.href.match(getaddress) && u.href.match(stjslink))
                {
                getaddress.exec(u.href);
var ou=RegExp.$1;
if (ou.match(exceptions)){continue;}
var hmm=RegExp.$2;
                hmm = hmm.split('http://');

                if (hmm[2])
                    {
                    var tyu = 'http://' + hmm[2];
                    }

                else if (hmm[1])
                    {
var ui=hmm[1].split('http%3A%2F%2F');
var tyu=ui[1]?'http://'+unescape(ui[1]):'http://'+hmm[1];
                    }

                else
                    {
var ui=hmm[0].split('http%3A%2F%2F');
var tyu=ui[1]?'http://'+unescape(ui[1]):hmm[0];
                    };

                u.href = tyu;
                u.target = '_blank';
                }

            else if (u.href.match(/\#$/) || u.href.match(invalink)
                || u.href.match(invallink) && u.getAttribute('onclick').match(getaddress))
                {
                getaddress.exec(u.getAttribute('onclick'));
var ou=RegExp.$1;
if (ou.match(exceptions)){continue;}
var hmm=RegExp.$2;
                hmm = hmm.split('http://');

                if (hmm[2])
                    {
                    var tyu = 'http://' + hmm[2];
                    }

                else if (hmm[1])
                    {
var ui=hmm[1].split('http%3A%2F%2F');
var tyu=ui[1]?'http://'+unescape(ui[1]):'http://'+hmm[1]; //used to get the redirected address in the link if there is one
                    }

                else
                    {
var ui=hmm[0].split('http%3A%2F%2F');
var tyu=ui[1]?'http://'+unescape(ui[1]):hmm[0];
                    }

                u.href = tyu;
                u.target = '_blank'
            }}        })() 
