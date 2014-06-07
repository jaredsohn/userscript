// ==UserScript==
// @name           EasyUpload.net download helper
// @namespace      scripts.seabreeze.tk
// @version        0.0.1 alpha
// @description    Bypasses wait time in just 2 simple lines of code!
// @include        http://easyupload.net/files/get/*/*
// @license        All rights reserved, except the right to install and use for both business and personal aim. YOU MAY NOT MODIFY THIS SCRIPT OR REPUBLISH IT ELSEWHERE WITHOUT THE AUTHORS PERMISSION.
// ==/UserScript==
document.getElementById('waitL').style.display='none';
document.getElementById('captcha').style.display='block';