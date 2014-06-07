// ==UserScript==
// @name           Retour de troupes
// @namespace      zm
// @include        http://*.travian.fr/dorf1.php
// ==/UserScript==

(function () {

            var ElementXpath;
            var match_;

            ElementXpath = "//td/b[starts-with(.,'» ') or starts-with(.,'«')]";
            match_ = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

            for (i=0; i<match_.snapshotLength ; i++){

	        b = match_.snapshotItem(i);
                b.textContent = b.textContent.substring(0,1)+b.textContent.substring(2,b.textContent.length);
            }

            ElementXpath = "//td/span/following-sibling::text()[.=' h.']";
            match_ = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

            for (i=0; i<match_.snapshotLength ; i++){

	        match_.snapshotItem(i).textContent = 'h'
            }

            ElementXpath = "//td[contains(b,'»')]/following-sibling::td[1]/b[contains(.,'Assistance')]";
            match_ = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

            for (i=0; i<match_.snapshotLength ; i++){

	        match_.snapshotItem(i).textContent = match_.snapshotItem(i).textContent=="Assitances" ?  "Retours de troupes" : "Retour de troupes";
            }
            
            ElementXpath = "//td[contains(b,'«')]/following-sibling::td[1]/b[contains(.,'Attaque')]";
            match_ = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

            for (i=0; i<match_.snapshotLength ; i++){

	        match_.snapshotItem(i).textContent=match_.snapshotItem(i).textContent=="Attaques" ?  "Agressions" : "Agression";
            }
})();