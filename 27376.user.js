// ==UserScript==
// @name           Orianit CMS - Tikshuv Darom
// @namespace      Education
// @description    fix webwiz hebrew forums
// @include        http://www.orianit1.edu-negev.gov.il/eshkolrh/*
// ==/UserScript==

var textnodes, node, s;

textnodes = document.evaluate(
    "/html/body/table[4]/tbody/tr/td/div/form/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[3]/td[2]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    //alert(node.innerHTML);
    node.innerHTML = '<textarea _moz-userdefined="" rows="12" cols="57" name="message" dir="rtl"></textarea>';
//	s = s.replace("/hava/farms","/");
// a little bit jokery but works :-)
	//alert(s);
//	node.src=s;
}

textnodes = document.evaluate(
    "/html/body/table[4]/tbody/tr/td/div/form/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

    node = textnodes.snapshotItem(0);
    //alert(node.innerHTML);
    node.innerHTML = '<td align="left">:נושא</td><td align="right" width="70%"><input name="subject" id="subject" size="50" maxlength="50" tabindex="2" type="text"></td>';


textnodes = document.evaluate(
    "/html/body/table[4]/tbody/tr/td/div/form",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

    node = textnodes.snapshotItem(0);
    //alert(node.innerHTML);
    node.setAttribute('ENCTYPE',"multipart/form-data");


//
// ChangeLog
// 2008-04-29 - 0.1 - created :-)
//

