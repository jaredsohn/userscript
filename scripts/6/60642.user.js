// ==UserScript==
// @name           Triond.com auto check to agree upload
// @namespace      triond.com
// @author         Fedmich
// @version        1.0 (Oct 27, 2009)
// @description    This script will auto check the checkbox below of the page when you are uploading a content, media on triond.com
// @include        https://www.triond.com/submit/online-editor
// @include        https://www.triond.com/submit/submit-file
// @include        https://www.triond.com/submit/process-submit-file
// ==/UserScript==

unsafeWindow.document.getElementById('i_declare').checked = true;