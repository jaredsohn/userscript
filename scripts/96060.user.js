// ==UserScript==
// @name           Standard.at Purify
// @namespace      http://derstandard.at
// @include        http://derstandard.at/*
// @include        http://diestandard.at/*
// ==/UserScript==

// ---

var $;

// Add jQuery
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0];
        
        GM_JQ = document.createElement('script');
    
        GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = false;
    
        
        GM_CO = document.createElement('script');
    
        GM_CO.src = 'http://welcome.totheinter.net/autocolumn/autocolumn.js';
        GM_CO.type = 'text/javascript';
        GM_CO.async = false;
    
        GM_Head.appendChild(GM_JQ);
        GM_Head.appendChild(GM_CO);
    
    }
    GM_wait();
})();



// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        letsJQuery();
    }
}

// All your GM code must be inside this function
function letsJQuery() {
    //    alert($); // check if the dollar (jquery) function works
//        alert($('#artikelbody')); // check jQuery version
    //    

        

    // change background color
    var documentCanvas = document.getElementById('documentCanvas');
    documentCanvas.style.backgroundColor = '#F0E9DA';
    document.body.style.backgroundColor = '#F0E9DA';

    var pageTop = document.getElementById('pageTop');
    pageTop.style.backgroundColor = '#F0E9DA';


    var akzien = document.getElementById('dynamicCharts');
    if (akzien) {
        akzien.parentNode.removeChild(akzien);
    }
    var widgets = document.getElementById('widgets');
    if (widgets) {
        widgets.parentNode.removeChild(widgets);
    }
    var weiterLesen = document.getElementById('weiterLesen');
    if (weiterLesen) {
        weiterLesen.parentNode.removeChild(weiterLesen);
    }

    if (document.location.href == 'http://derstandard.at/Web') {
        var mf = document.getElementById('mainFeature').firstChild;
        if (mf) {
            mf.removeChild(mf.childNodes[0]);
            mf.removeChild(mf.childNodes[1]);
            mf.removeChild(mf.childNodes[1]);
            mf.removeChild(mf.childNodes[1]);
            tmp = mf.childNodes[2].childNodes[0];
            tmp.removeChild(tmp.childNodes[1]);
            mf.removeChild(mf.childNodes[3]);
            mf.removeChild(mf.childNodes[3]);
        }
    }
    var tb = document.getElementById('toolbar');
    if (tb) {
        tb.parentNode.removeChild(tb);
    }

    if (documentCanvas) {
        documentCanvas.removeChild(document.getElementById('articleTools').nextSibling);
    }




    var o2_1291454944892 = document.getElementById('o2_1291454944892');
    if (o2_1291454944892) {
        o2_1291454944892.parentNode.removeChild(o2_1291454944892);
    }
    var o3_1246543260887 = document.getElementById('o3_1246543260887');
    if (o3_1246543260887) {
        o3_1246543260887.parentNode.removeChild(o3_1246543260887);
    }
    var o1_1265852260504 = document.getElementById('o1_1265852260504');
    if (o1_1265852260504) {
        o1_1265852260504.parentNode.removeChild(o1_1265852260504);
    }
    var o2_1254310351185 = document.getElementById('o2_1254310351185');
    if (o2_1254310351185) {
        o2_1254310351185.parentNode.removeChild(o2_1254310351185);
    }
    var o3_1252036764303 = document.getElementById('o3_1252036764303');
    if (o3_1252036764303) {
        o3_1252036764303.parentNode.removeChild(o3_1252036764303);
    }

    var o1_1293371106930 = document.getElementById('o1_1293371106930');
    if (o1_1293371106930) {
        o1_1293371106930.parentNode.removeChild(o1_1293371106930);
    }
    var o2_1293371107449 = document.getElementById('o2_1293371107449');
    if (o2_1293371107449) {
        o2_1293371107449.parentNode.removeChild(o2_1293371107449);
    }

    var o1_1271375524201 = document.getElementById('o1_1271375524201');
    if (o1_1271375524201) {
        o1_1271375524201.parentNode.removeChild(o1_1271375524201);
    }
    var o2_1263706697254 = document.getElementById('o2_1263706697254');
    if (o2_1263706697254) {
        o2_1263706697254.parentNode.removeChild(o2_1263706697254);
    }



    //var objectContent = document.getElementById('objectContent');
    //objectContent.width = 800;
    //objectContent.style.backgroundColor = '#FFFFFF';
    //objectContent.style.MozBorderRadius = '15px 15px 15px 15px' ;

    var artikelHeader = document.getElementById('artikelHeader');
    artikelHeader.style.width = '640px';
    //artikelHeader.style.paddingLeft = '40px';
    //artikelHeader.style.paddingRight = '40px';
    //artikelHeader.style.paddingBottom = '10px';
    //artikelHeader.style.marginBottom = '20px';
    artikelHeader.style.marginTop = '20px';
    artikelHeader.style.fontFamily = 'verdana';
    artikelHeader.style.backgroundColor = '#EEEEEE';
    artikelHeader.style.MozBorderRadius = '0px 15px 15px 15px' ;

    $('#artikelHeader').columnize({columns:2});


    var header4 = artikelHeader.getElementsByTagName('h4');
    if (header4.length > 0) {
        header4[0].style.paddingLeft = '10px';
        header4[0].style.paddingRight = '10px';
        header4[0].style.fontSize = '7pt';
        header4[0].style.fontFamily = 'verdana';
    }

    var header1 = artikelHeader.getElementsByTagName('h1');
    if(header1.length > 0) {
        header1[0].style.background = '#FFFFFF';
        header1[0].style.paddingLeft = '50px';
        header1[0].style.paddingRight = '50px';
        header1[0].style.paddingTop = '20px';
        header1[0].style.margin = '10px';
        header1[0].style.marginBottom = '0px';
        header1[0].style.marginLeft = '0px';
        header1[0].style.fontFamily = 'verdana';
    }

    var headerDate = artikelHeader.getElementsByTagName('h6');
    if(headerDate.length > 0) {
        headerDate[0].style.background = '#EEEEEE';
        headerDate[0].style.paddingTop = '7px';
        headerDate[0].style.paddingBottom = '5px';
        headerDate[0].style.paddingLeft = '20px';
        headerDate[0].style.paddingRight = '20px';
        //    headerDate[0].style.MozBorderRadius =  '0px 0px 15px 15px';
        headerDate[0].style.margin = '0px';
        headerDate[0].style.fontSize = '7pt';
        headerDate[0].style.textAlign = 'right';
    }

    var artikelBody = document.getElementById('artikelBody');
    artikelBody.style.width = '600px';
    artikelBody.style.padding = '40px';
    artikelBody.style.textAlign = 'justify';
    artikelBody.style.fontFamily = 'verdana';
    artikelBody.style.fontSize = '10pt';
    artikelBody.style.backgroundColor = '#FFFFFF';
    artikelBody.style.MozBorderRadius = '0px 0px 15px 15px' ;
    
    $('#artikelBody').columnize({columns:2});

    var artikelLeft = document.getElementById('artikelLeft');
    if (artikelLeft) {
    
        artikelLeft.style.backgroundColor = '#EEEEEE';
    }

    var subHeader = artikelBody.getElementsByTagName('h2');
    if(subHeader.length > 0) {
        subHeader[0].style.background = '#FFFFFF';
        subHeader[0].style.padding = '10px';
        subHeader[0].style.margin = '0px';
        subHeader[0].style.fontSize = '10pt';
        subHeader[0].style.fontAlign = 'left';
    }

    var pars = artikelBody.getElementsByTagName('p');
    for(var i = 0; i < pars.length; i++) {
        pars[i].style.paddingLeft = '15px';    
        pars[i].style.paddingRight = '15px';    
        pars[i].style.paddingTop = '5px';    
    }


    var forum = document.getElementById('forumstart').parentNode;
    forum.parentNode.removeChild(forum);

}