// ==UserScript==
// @name           POF Enhance - subject
// @namespace      taf:pof
// @description    Enhance POF - Restore the subject line
// @include        http://www.pof.com/*
// @include        http://www.plentyoffish.com/*
// ==/UserScript==

subjects = document.evaluate("//input[@name='subject'][@type='hidden']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
subject = subjects.snapshotItem(0);
subject.type = 'text';

var label = document.createElement('span');
label.appendChild(document.createTextNode('Subject: '));
subject.parentNode.insertBefore(label, subject);
