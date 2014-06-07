// ==UserScript==
// @name           Envoi de troupes
// @namespace      zm
// @include        http://*.travian.fr/a2b.php*
// ==/UserScript==


(function () {

             function asSubmitButton(o, value, bgcolor){
                if( bgcolor==null ){
                   bgcolor="rgb(70,200,70)";
                }
                o.setAttribute('value',value);
                o.setAttribute('onmouseout',"");
                o.setAttribute('onmouseover',"");
                o.setAttribute('onmouseup',"");
                o.setAttribute('onmousedown',"");
                o.setAttribute('type',"submit");
                o.setAttribute('style',"background-color:"+bgcolor+";border: solid 1px rgb(180,180,180); color: rgb(255,255,255); -moz-border-radius:4px; cursor: pointer; padding: 2px 12px; font-weight: bold");

             }

            var ElementXpath;
            var match_;

            ElementXpath = "//form[input/@name='kid']//input[@name='s1' and @value='ok']";
            match_ = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

            for (i=0; i<match_.snapshotLength ; i++){

	        asSubmitButton( match_.snapshotItem(i), "Envoyer !" );
            }

            ElementXpath = "//form[input[@name='b' and @value='1']]//input[@name='s1' and @value='ok']";
            match_ = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

            for (i=0; i<match_.snapshotLength ; i++){

	        asSubmitButton( match_.snapshotItem(i), "Suite >>", "orange" );
            }
})();