// ==UserScript==
// @name           Final submit OSS RDS
// @description    Auto submit final page
// @include        www.irctc.co.in/*
// ==/UserScript==

document.evaluate("//input[@class='buttonSubmit' and @type='submit' and contains(@onclick, 'validate') and @value='submit']",document,null,9,null).singleNodeValue.click();