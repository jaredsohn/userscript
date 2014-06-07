// ==UserScript==
// @name           Better Google for iPhone v2
// @namespace      http://userscripts.org/scripts/show/47573
// @description    Improves mobile view of Google services for iPhone
// @version        0.6
//
// @include        http*://www.google.com/m*
// @include        http*://mail.google.com/*
// @include        http*://www.google.com/reader/m/*
// @include        http*://www.google.com/reader/i/*
// ==/UserScript==

(function() {
	function onGmailLoad()
	{
        var inboxDiv = document.getElementById("inbox");
        if (inboxDiv && unsafeWindow.N)
        {
           var headID = document.getElementsByTagName("head")[0];         

           // avoid shrinking to 320px
           var newScript = document.createElement('script');
           newScript.type = 'text/javascript';
           newScript.text = 'N.prototype.$ = function(){};';
           headID.appendChild(newScript);
           document.getElementById("inbox").style.width = "";

           // adjust styles
           var styleNode = document.createElement('style');
           var styleDef = 'body { font-size: 135%; }' +
                          'a.btmnav-btn-back, a.btmnav-btn-off, .button, .dropdown, .smalltabletext, .tlsubjread, .tlsubjunread { font-size: 20px; }' +
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
                          'div.oldernewer, div.cvsubjtext, div.confirmation, div.colabel, div.coshowccbcc, div.clchname { font-size: 22.5px; }' +
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
                          '.gmaillogo { display: none; }' +
                          'input#sbq { font-size: 28px; }' +
                          'div.clname { padding: 14px; font-size: 22px; }' +
                          '';
           styleNode.type = 'text/css';
           styleNode.appendChild(document.createTextNode( styleDef ));
           headID.appendChild(styleNode);
        }
    }

    function onReaderLoad()
    {
        var headID = document.getElementsByTagName("head")[0];         

        // adjust styles
        var styleNode = document.createElement('style');
        var styleDef = 'body { font-size: 150%; font-family:Arial,Helvetica,sans-serif; }' +
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
        styleNode.type = 'text/css';
        styleNode.appendChild(document.createTextNode( styleDef ));
        headID.appendChild(styleNode);
    }

    if (document.domain == "mail.google.com")
    {
        onGmailLoad();
    }
    else
    {
        onReaderLoad();
    }
})();