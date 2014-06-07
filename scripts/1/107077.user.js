// ==UserScript==
// @name           TDos
// @namespace      tuenti_dos
// @description    Tu nuevo Tuenti:)
// @version        0.0.1
// @license        Creative Commons Attribution-Noncommercial-Share Alike 2.0 Spanish License
// @include        http://www.tuenti.com/*
// ==/UserScript==

////////////////////////////////////////////////
// Configuracion

var config = {
    version: '0.0.1',
    baseUrl: 'http://tuentidos.googlecode.com/svn/firefox/'
};

////////////////////////////////////////////////
// Tuenti: Chequeo de fin de pagina renderizada tras parser XMP

var idTimer = setInterval(function () {
    if (document.getElementById('canvas')) {
        clearInterval(idTimer);
        system.init();
    }
}, 50);

////////////////////////////////////////////////
// EAPI (HTML5 Feature)

var eapi = {
    public_api: {
        ajax: function(rq) {
            var data = rq.data;
            delete data.onerror;
            delete data.onreadystatechange;
            data.onload = function(response) {
                rq.response = response;
                eapi.sendResponse(rq);
            };
            GM_xmlhttpRequest(data);
        },
        version: function(rq) {
            rq.response = config.version;
            eapi.sendResponse(rq);
        }
    },
    _origin: 'http://www.tuenti.com',
    _onEAPIRequest: function (event) {

        if (event.origin != eapi._origin)
            return;

        var data = JSON.parse(event.data);

        if (data.type != 'rq') return;

        if (data.op.charAt(0) == '_') {
            GM_log('No se pueden acceder a funciones internas');
            return;
        }

        var func = eapi.public_api[data.op];

        if (!func) {
            GM_log('No se ha especicado opcode');
            return;
        }

        func.call(eapi.public_api, data);

    },
    sendResponse: function(data) {
        data.type = 'rp';
        window.postMessage(JSON.stringify(data), eapi._origin);
    },
    init: function() {
        window.addEventListener('message', this._onEAPIRequest, false);
    }
};



////////////////////////////////////////////////
// system

var system = {
    droppler: 'tdosrutes',
    init: function(){
        this.injectDroppler();
        eapi.init();
    },
    injectDroppler: function () {
        var droppler = document.createElement('script');
        var head =  document.getElementsByTagName('head')[0];
        droppler.type = 'text/javascript';
        droppler.src = config.baseUrl + this.droppler + '.js';
        droppler.id = this.droppler;
        head.appendChild(droppler);
    }
};