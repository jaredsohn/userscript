// ==UserScript==
// @name           uuHEdt(uu Html Edit)
// @namespace      http://www.uuware.com/js_uuhedt_en.htm
// @description    Succinctly Free Online Web-Based WYSIWYG HTML Editor
// @include        http://www.uuware.com/js_uuhedt_en.htm
// ==/UserScript==
/*******************************************************************************
	uuHEdt(uu Html Edit)
	Copyright (c) 2006-2009 uuware.com. All rights reserved.
	Developed by project@uuware.com, Visit http://www.uuware.com/ for details.

	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*******************************************************************************/
var UUHEdt_VER = '1.05';
var UUHEdt_MSIE = (navigator.userAgent.indexOf('MSIE') >= 0 ? true : false); //used to judge as IE.
var UUHEdt_JS = 'uuhedt.js'; //only used for get path of this js.
var UUHEdt_PATH = ''; //path of style and also image.
//get relative style&image path(same to js's path)
var scripts = document.getElementsByTagName('script');
for(var i = 0; i < scripts.length; i++)
{
  var src = scripts[i].getAttribute('src');
  //only get path from first 'uuhedt.js'
  if(src && src.length >= UUHEdt_JS.length && src.substring(src.length-UUHEdt_JS.length-1) == '/'+UUHEdt_JS){
    UUHEdt_PATH = src.substring(0, src.length - UUHEdt_JS.length);
    break;
  }
}

//must work with SFtab or FTab(http://www.uuware.com/js_ftab_en.htm)
var UUHEdts =
{
...
...
...

(for also need other image file, please download the whole from:
http://www.uuware.com/js_uuhedt_en.htm
)
