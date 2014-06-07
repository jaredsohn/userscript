// ==UserScript==
// @name           Better Google for iPhone v2
// @namespace      http://userscripts.org/scripts/show/47573
// @description    Improves mobile view of Google services for iPhone
// @version        0.7.3
//
// @include        http*://www.google.com/m*
// @include        http*://mail.google.com/*
// @include        http*://www.google.com/reader/m/*
// @include        http*://www.google.com/reader/i/*
// @include        http*://docs.google.com/m*
// @include        http*://docs.google.com/*/m*
// @include        http*://www.google.com/gwt/*
// @include        http*://google.com/gwt/*
// ==/UserScript==
//
// Thanks to Sergey Solopov for contributions
//

(function() {
    function onGmailLoad()
    {
        var inboxDiv = document.getElementById("inbox");
        if (inboxDiv && unsafeWindow.N)
        {
            // avoid shrinking to 320px
            injectJavaScript('L.prototype.ca = function(){};');

            // adjust styles
            var styleDef = 'body { font-size: 135%; }' +
                           'a.btmnav-btn-back, a.btmnav-btn-off, .button, .dropdown, .smalltabletext, .tlsubjread, .tlsubjunread, span.suggestEmailSuffix, span.suggestEmailPrefix { font-size: 20px; }' +
                           'a.btmnav-btn-back, a.btmnav-btn-off { background-color: #d1d8e8; padding: 6px 10px; }' +
                           'div.dename, textarea#body, div.menucount { font-size: 24px; }' +
                           '.tlsnippet { font-size: 17.5px; }' +
                           '.button, .dropdown { height: 42px; }' +
                           '.blue .button, .blue .dropdown { background-color: #c4d9f5; }' +
                           '.green .button, .green .dropdown { background-color: #c7f5cb; }' +
                           '.grey .button, .grey .dropdown { background-color: #dddddd; }' +
                           '.searchmail .button, .searchcontacts .button { background-color: #74767c; }' +
                           '.dropdown { width: 130px; }' +
                           'input, select { font-size: large; }' +
                           '.rightcell { width: 120px; }' +
                           'div.oldernewer, div.cvsubjtext, div.confirmation, div.colabel, div.coshowccbcc, div.clchname, div.nomatches, span.suggestNameSuffix, span.suggestNamePrefix  { font-size: 22.5px; }' +
                           'div.coshowccbcc { padding-right: 5%; }' +
                           'div.tlrange { height: 90px; }' +
                           'div.cvcardtop, div.cvcardmiddle, div.cvcardbottom { padding: 9px 8.5px; }' +
                           '.cbox { height: 27px; width: 27px; }' +
                           '.tlcheckbox { margin:auto 0 auto -40px; }' +
                           '.tlsenderread, .tlsenderunread { font-size: 22px; }' +
                           '.tlsubjread, .tlsubjunread, div.cvsubjshorter { width: 600px; }' +
                           '.cvsubjshorter { width: 600px; }' +
                           '.tllabel, a.cvlabel { font-size: 15px; }' +
                           'div.menuli { padding: 15px; font-size: 24px; }' +
                           '.bottombar { background-color: #F7F8FF; background-position: 100% 100%; line-height: 49.5px; height: 52.5px; }' +
                           '.toolbar { height: 55.5px; }' +
                           '.tlthread { padding: 8px 55px; }' +
                           'input#sbq { font-size: 28px; }' +
                           'div.clname { padding: 14px; font-size: 22px; }' +
                           '';
            injectStyle( styleDef );
        }
    }

    function onDocsLoad()
    {
        // avoid shrinking to 320px
        injectStyle('html, body { width: auto; }');
    }

    function onReaderLoad()
    {
        // adjust styles
        var styleDef = 'body { font-size: 135%; font-family:Arial,Helvetica,sans-serif; }' +
                       'a.logo { display: none }' +
                       '.m-button, .nav-table-middle { font-family:Arial,Helvetica,sans-serif; }' +
                       '.m-button { padding: 5px 8px; background-image: none; font-size: 24px; }' +
                       '.nav-table-middle { font-size: 26px; }' +
                       '.nav-bar { padding: 8px 6px; }' +
                       '#viewer-top-links, #viewer-bottom-links, #sub-tree-top-links { padding: 16px 10px; font-size: 18px; }' +
                       '.item-title, .sub-item, .larger { font-size: 22.5px; }' +
                       '.entry { padding: 15px; }' +
                       '.entry-author, .entry-date { font-size: 18px; }' +
                       '.sub-row .icon-cell { padding:0 10px; }' +
                       '.item-count-value { margin-right:10px; }' +
                       '';
        injectStyle( styleDef );
    }

    function onPropsLoad()
    {
        // checkmarks doesn't display properly in microb by default, fix this
        injectStyle( '.checkmark { position: relative; display: block; top: -60px; }' );
        // allow to add up to 10 tabs at top
        injectJavaScript( "v = 10;" );
    }

    function onGpVersionLoad()
    {
        // remove paddings/margins for body and borders for frames
        // and add styles for topbar
        injectStyle( 'body { margin: 0; padding: 0; }\n'+ 
                     '.gpframe { border: 0; width: 100%; }\n'+
                     '.topbar { background: #1e3384; padding: 5px; }\n'+
                     '.topbar a.gpbtn, .topbar a.gpbtn:visited { padding: 7px; font-family: Arial, Helvetica, sans-serif; text-decoration: none; color: #fff; }\n'+
                     '.topbar a.gpbtn-on, .topbar a.gpbtn-on:visited { padding: 6px; font-weight:bold; }\n'+
                     '.topbar a.gpbtn-off, .topbar a.gpbtn-off:visited {  }' );

        // adjust inner window height
        unsafeWindow.onresize = function() {
            // set height of .gpframe = window height - topbar height
            for (var i = 0; i < document.body.childNodes.length; i++)
            {
                try
                {
                    var node = document.body.childNodes[i];
                    if (node.className == "gpframe")
                    {
                        node.style.height = (window.innerHeight - document.getElementById('topbar').offsetHeight) + "px";
                    }
                } catch (e) { }
            }
        };
        unsafeWindow.onresize();
    }

    function onGWTLoad()
    {
        // adjust font size
        document.getElementsByTagName("body")[0].style.fontSize='135%';
    }

    function injectStyle( styleDef )
    {
        var headID = document.getElementsByTagName("head")[0];         
        var styleNode = document.createElement('style');
        styleNode.type = 'text/css';
        styleNode.appendChild( document.createTextNode(styleDef) );
        headID.appendChild(styleNode);
    }

    function injectJavaScript( scriptText )
    {
        var headID = document.getElementsByTagName("head")[0];         
        var newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.text = scriptText;
        headID.appendChild(newScript);
        document.getElementById("inbox").style.width = "";
    }

    if (document.domain == "mail.google.com")
    {
        onGmailLoad();
    }
    else if (document.domain == "docs.google.com")
    {
        onDocsLoad();
    }
    else if( document.documentURI.match("(google.com/m/p)|(google.com/m/a/.+/p)") )
    {
        onPropsLoad();
    }
    else if( document.documentURI.match("google.com/m/(gp|a)") )
    {
        onGpVersionLoad();
    }
    else if( document.documentURI.match("google.com/gwt/") )
    {
        onGWTLoad();
    }
    else
    {
        onReaderLoad();
    }
})();