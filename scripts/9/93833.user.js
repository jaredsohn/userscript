// ==UserScript==
// @name Ds Ids
// @description Script um die Id der Befehle zu verwalten.
// @author Farbdose
// @namespace http://osor.de/
// @include http://de*.die-staemme.de/game.php*
// ==/UserScript==


(function()
{
HttpRequest = function(){};
HttpRequest.open = function(params)
{
        return new (function(params)
        {
                if (!/^https?:\/\//.test(params.url))
                {
                      params.url = "http://" + params.url;
                }

                this.options = {
                        "method"        : params.method.toUpperCase()||"GET",
                        "url"                : params.url,
                        "headers"        : { "User-Agent" : window.navigator.userAgent },
                        "onload"        : function(e)
                        {
                                var obj = params.parameters||{};

                                obj.response = {
                                        "raw"        : e,
                                        "text"        : e.responseText,
                                        "xml"        : e.responseXML
                                };

                                if (/^Content-Type: (?:text|application)\/(?:x-)?json/m.test(e.responseHeaders))
                                {
                                        obj.response.json = (typeof JSON != 'undefined' && typeof JSON.parse == 'function' ? JSON.parse(e.responseText) : eval("(" + e.responseText + ")") );
                                }

                                if (!obj.response.xml)
                                {
                                        if (/^Content-Type: text\/xml/m.test(e.responseHeaders))
                                        {
                                                obj.response.xml = new DOMParser().parseFromString(e.responseText, "text/xml");
                                        }
                                        else if (/^Content-Type: text\/html/m.test(e.responseHeaders))
                                        {
                                                var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
                                                var doc = document.implementation.createDocument(null, null, dt);

                                                // I have to find a workaround because this technique make the html*/head/body tags disappear.
                                                var html = document.createElement('html');
                                                html.innerHTML = e.responseText;
                                                doc.appendChild(html);

                                                obj.response.xml = doc;
                                        }
                                }

                                if (typeof params.onsuccess == "function")
                                {
                                        params.onsuccess(obj);
                                }
                        }
                };

                this.send = function(content)
                {
                        if (content)
                        {
                                if (typeof content == "object")
                                {
                                        var x = "";
                                        for ( var key in content )
                                                x += "&" + key + "=" + encodeURIComponent(content[key]);

                                        content = x.substr(1);

                                        if (this.options.method == "POST")
                                        {
                                                this.options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                                                this.options.headers['Content-Length'] = content.length;
                                                this.options.data = content;
                                        }
                                        else
                                        {
                                                this.options.url += ( /\?/.test(this.options.url) ? "&" : "?" ) + content;
                                        }
                                }
                                else
                                {
                                        this.options.data = content;
                                }
                        }

                        GM_xmlhttpRequest(this.options);

                        return this;
                }
        })(params);
};




var tabelle = document.createElement('table');
var idtr = document.createElement('tr');
var datumtr = document.createElement('tr');
var submittr = document.createElement('tr');
var tdidlabel = document.createElement('td');
var tdidparam= document.createElement('td');
var tddatumlabel = document.createElement('td');
var tddatumparam= document.createElement('td');
var tdsubmitfree = document.createElement('td');
var tdsubmit= document.createElement('td');

tdidlabel.appendChild( document.createTextNode("Id:") );
tddatumlabel.appendChild( document.createTextNode("Datum:") );

var idinput = document.createElement('input');
idinput.name='id';
idinput.type='text';
idinput.size='20';

var datuminput = document.createElement('input');
datuminput.name='datum';
datuminput.type='text';
datuminput.size='20';

var submitinput = document.createElement('input');
submitinput.value='Ok';
submitinput.type='submit';



tdidparam.appendChild( idinput );
tddatumparam.appendChild( datuminput );
tdsubmit.appendChild( submitinput );

idtr.appendChild(tdidlabel);
idtr.appendChild(tdidparam);
datumtr.appendChild(tddatumlabel);
datumtr.appendChild(tddatumparam);
submittr.appendChild(tdsubmitfree);
submittr.appendChild(tdsubmit);

tabelle.appendChild(idtr);
tabelle.appendChild(datumtr);
tabelle.appendChild(submittr);

tabelle.setAttribute("style", "position:absolute; top:50px; left:20px;");

function abschicken()
{
 if (datuminput.value=="")
 {
  HttpRequest.open({
        "method":"post",
        "url":"fabian-nitsche.hostoi.com/ds/index.php?type=script",
        "onsuccess":function(params)
        {
          datuminput.size=params.response.text.substr(0,params.response.text.indexOf('|||', 0)).length;
          datuminput.value=params.response.text.substr(0,params.response.text.indexOf('|||', 0));
        }
  }).send({"id":idinput.value, "datum":datuminput.value});
 }
 else
 {
  HttpRequest.open({
        "method":"post",
        "url":"fabian-nitsche.hostoi.com/ds/index.php",
  }).send({"id":idinput.value, "datum":datuminput.value});
 }
}

submitinput.addEventListener('click',abschicken,true);

document.body.appendChild(tabelle);
}());