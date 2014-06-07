// ==UserScript==
// @name           C17 Google Scholar Button
// @namespace      http://www.c17.net
// @description    Añade un enlace desde los artículos de Google Scholar al C17
// @include        http://scholar.google.*
// ==/UserScript==

function startup(){
    dojo = unsafeWindow['dojo'];
    dijit = unsafeWindow['dijit'];
    dojox = unsafeWindow['dojox'];
    dojo.addClass(dojo.body(), 'tundra');
    dojo.require('dojox.dtl.filter.htmlstrings');
    dojo.require('dijit.Dialog');
    dojo.require('dijit.form.Form');
    dojo.require('dijit.form.Button');
    dojo.require('dijit.form.ValidationTextBox');
    dojo.require('dojox.validate.web');


    //Don't do anything until modules are loading
    dojo.addOnLoad(function(){

        validatePreferences(oPreferences);

        if (showDialog) {
            var djForm = buildPreferencesForm();
            djDialog = new dijit.Dialog({
                id: 'gsc17PreferencesDialog',
                title: 'Botón C17 en Google Scholar :: Preferencias'
            });
            djForm.setValues(oPreferences);
            djDialog.startup();
            djDialog.setContent(djForm.domNode);
            djDialog.show();
        }

        dojo.query('.gs_r').forEach(function(node, index, arr) {
            var oArticle = {};

            dojo.query('.gs_rt', node).forEach(function(node, index, arr){
                var title = dojo.trim(dojox.dtl.filter.htmlstrings.striptags(node.innerHTML));
                if (title.indexOf('[') == 0) {
                    title = dojo.trim(title.substr(title.indexOf(']', 2)+1));
                }
                oArticle['rft.atitle'] = title;
            });

            dojo.query('.gs_a', node).forEach(function(node, index, arr){
                var gs_a = dojox.dtl.filter.htmlstrings.striptags(node.innerHTML).split('-');
                var authors = dojo.trim(gs_a[0]);
                if (authors.indexOf('…') == authors.length-1) {
                    authors = dojo.trim(authors.substr(0, authors.lastIndexOf(',')));
                }
                var aAuthors = authors.split(',');
                var firstAuthor = dojo.trim(aAuthors[0]);
                //oArticle['rft.aufirst'] = firstAuthor.substr(0, firstAuthor.indexOf(' '));
                oArticle['rft.aulast'] = firstAuthor.substr(firstAuthor.indexOf(' ')+1);

                var publicationData = dojo.trim(gs_a[1]).split(',');

                var jtitle = dojo.trim(publicationData[0]);
                if (jtitle.indexOf('…') == jtitle.length-1) {
                    jtitle = dojo.trim(jtitle.substr(0, jtitle.length-1));
                }
                oArticle['rft.jtitle'] = jtitle;

                if (publicationData.length == 2) {
                    var date = dojo.trim(publicationData[1]);
                    oArticle['rft.date'] = date;
                }
            });

            dojo.query('font[size="-1"] .gs_fl', node).forEach(function(node, index, arr){
                /*var a = buildGsArticleOpenUrlLink(oArticle);
                dojo.place(dojo.doc.createTextNode(' - '), node);
                dojo.place(a, node);*/
                appendGsArticleLink(oArticle, node);
            });
        });

    });
};


function buildGsArticlePubmedQuery(pmid) {
    /*params = {
        url_ver: 'Z39.88-2004',
        rft_val_fmt: 'info:ofi/fmt:kev:mtx:journal',
        'rft.genre': 'article',
        id: 'pmid:'+pmid
    };
    var query = dojo.objectToQuery(params);
    var openUrl = oPreferences.gsc17BaseUrl+'?'+query;*/
    var openUrl = oPreferences.gsc17BaseUrl+'?genre=article&id=pmid:'+pmid;
    return openUrl;
}

function buildGsArticlePubmedLink(pmid) {
    attrs = {
        href: buildGsArticlePubmedQuery(pmid)
    };
    var a = dojo.create('a', attrs);
    var img = dojo.create('img', {src:'http://www.c17.net/themes/csi_default/images/icons/c17plus.png', alt:'C17'}, a);
    dojo.style(img, {border:'0'});
    var img = dojo.create('img', {src:'http://lsda.jsc.nasa.gov/images/navigations/pubmed.gif', alt:'Pubmed'}, a);
    dojo.style(img, {border:'0'});
    return a;
}

function articleToPubmedTerm(oArticle) {
    var term = oArticle['rft.atitle'];
    term += ' AND '+oArticle['rft.aulast']+'[author]';
    term += ' AND '+oArticle['rft.jtitle']+'[Jour]';
    if (oArticle['rft.date']) {
        term += ' AND '+oArticle['rft.date']+'[pdat]';
    }
    return term;
}

function appendGsArticleLink(oArticle, node) {
    var eSearchUrl = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi';
    var term = articleToPubmedTerm(oArticle);
    var data = {
        db: 'pubmed',
        term: term,
        retmode: 'xml'
    };
    eSearchUrl += '?' + dojo.objectToQuery(data);
    window.setTimeout(function(){GM_xmlhttpRequest({
        method: "GET",
        url: eSearchUrl,
        onload: function(response) {
            var xmlDoc = new DOMParser().parseFromString(response.responseText, "text/xml");
            var resNo = parseInt(xmlDoc.evaluate('/eSearchResult/Count', xmlDoc, null, XPathResult.ANY_TYPE, null ).iterateNext().textContent);
            dojo.place(dojo.doc.createTextNode(' - '), node);
            if (resNo == 1) {
                var pmid = parseInt(xmlDoc.evaluate('/eSearchResult/IdList/Id', xmlDoc, null, XPathResult.ANY_TYPE, null ).iterateNext().textContent);
                var a = buildGsArticlePubmedLink(pmid);
            } else {
                var a = buildGsArticleOpenUrlLink(oArticle);
            }
            dojo.place(a, node);
        }
    });},0);
}

function buildGsArticleOpenUrlLink(oArticle) {
    attrs = {
        href: buildGsArticleOpenUrlQuery(oArticle)
    };
    var a = dojo.create('a', attrs);
    var img = dojo.create('img', {src:'http://www.c17.net/themes/csi_default/images/icons/c17plus.png', alt:'C17'}, a);
    dojo.style(img, {border:'0'});
    return a;
}

function buildGsArticleOpenUrlQuery(oArticle) {
    oArticle.url_ver = 'Z39.88-2004';
    oArticle.rft_val_fmt = 'info:ofi/fmt:kev:mtx:journal';
    oArticle['rft.genre'] = 'article';
    var query = dojo.objectToQuery(oArticle);
    var openUrl = oPreferences.gsc17BaseUrl+'?'+query;
    return openUrl;
}

function removeGSSuspensionPoints(string) {
    if (string.indexOf('…') == string.length-1) {
        string = dojo.trim(string.substr(0, string.length - 1));
    }
    return string;
}


function buildPreferencesForm() {
        djForm = new dijit.form.Form({onSubmit:function(){
                if(this.validate()){
                        savePreferences(this.attr('value'));
                        window.location.reload();
                }else{
                        window.alert('Datos inválidos, por favor corrige los campos marcados.');
                }
                return false;
            }
        });

        form1P = dojo.create('p', {}, djForm.domNode);
        djIptBaseUrl = new dijit.form.ValidationTextBox({
            required:true,
            invalidMessage:'Debe completar el campo con una URL válida (incluyendo el http://)',
            promptMessage:'Introduzca la URL Base de su LinkResolver',
            placeHolder:'URL base',
            name:'gsc17BaseUrl',
            validator: dojox.validate.isUrl
        });
        dojo.place(djIptBaseUrl.domNode, form1P);

        form2P = dojo.create('p', {}, djForm.domNode);
        djSubmit = new dijit.form.Button({
            type:'submit',
            label:'Guardar'
        });
        dojo.place(djSubmit.domNode, form2P);
        djReset = new dijit.form.Button({
            type:'reset',
            label:'Limpiar'
        });
        dojo.place(djReset.domNode, form2P);

        return djForm;
}

function validatePreferences(oPreferences) {
    if (oPreferences.gsc17BaseUrl == undefined || !dojox.validate.isUrl(oPreferences.gsc17BaseUrl)) {
        showDialog = true;
    }
}

function savePreferences(oPreferences) {
    window.setTimeout(function() {
        GM_setValue('gsc17BaseUrl', oPreferences.gsc17BaseUrl);
    }, 0);
}

var dojoVersion = '1.5';

//Include Dojo from the Google CDN
var script = document.createElement('script');
script.src= 'http://ajax.googleapis.com/ajax/libs/dojo/'+dojoVersion+'/dojo/dojo.xd.js';
document.getElementsByTagName('head')[0].appendChild(script);

//Include the Tundra Theme CSS file
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type= 'text/css';
link.href= 'http://ajax.googleapis.com/ajax/libs/dojo/'+dojoVersion+'/dijit/themes/tundra/tundra.css';
document.getElementsByTagName('head')[0].appendChild(link);


//RUN
var setPreferences = GM_listValues();
var oPreferences = new Object();
var showDialog = false;

for (var idx in setPreferences) {
    oPreferences[setPreferences[idx]] = GM_getValue(setPreferences[idx]);
}

//include flags to djConfig to tell dojo its being used after its been loaded
unsafeWindow.djConfig = {
    afterOnLoad: true,
    addOnLoad: startup
};