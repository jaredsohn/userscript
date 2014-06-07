// ==UserScript==
// @name        Fix qz.com with ghostery
// @description Read qz.com with ghostery enabled
// @namespace   http://iandennismiller.com
// @include     http://qz.com
// @include     http://qz.com/
// @include     http://qz.com/*
// @include     http://*.qz.com
// @include     http://*.qz.com/
// @include     http://*.qz.com/*
// @creator     Ian Dennis Miller <iandennismiller+userscripts@gmail.com>
// @version     0.1
// @date        2013-01-09
// ==/UserScript==

/*
Issues and Bugs
===============

https://github.com/iandennismiller/userscript-qz-com/issues

Changelog
=========

0.1 - Initial offering

License
=======

Copyright (C) 2013 Ian Dennis Miller

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. 
*/


// http://stackoverflow.com/questions/3387427/javascript-remove-element-by-id
function remove(id)
{
    return (elem=document.getElementById(id)).parentNode.removeChild(elem);
}

remove("overlay");