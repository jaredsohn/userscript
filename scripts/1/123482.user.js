// ==UserScript==
// @name           DisplayUploadInMB
// @namespace      http://userscripts.org/scripts/show/123482
// @description    Display upload in MB instead of TiB
//
// @version		0.01
// @include     http*passthepopcorn.me*
// ==/UserScript==
/*---------------------Version History--------------------
0.01	-	First version
--------------------------------------------------------*/

snippet = document.getElementByClassName("stat");

function writeConsole(content) {
 top.consoleRef=window.open('','myconsole',
  'width=350,height=250'
   +',menubar=0'
   +',toolbar=1'
   +',status=0'
   +',scrollbars=1'
   +',resizable=1')
 top.consoleRef.document.writeln(
  '<html><head><title>Console</title></head>'
   +'<body bgcolor=white onLoad="self.focus()">'
   +content
   +'</body></html>'
	)
	/*top.consoleRef.document.writeln(title)
	top.consoleRef.document.writeln("<br>IMDb: " + imdb)
	top.consoleRef.document.writeln("<br>https:\/\/tls.passthepopcorn.me/"+link)
	top.consoleRef.document.writeln(
   '<br><br></body></html>'
 )
 top.consoleRef.document.close()
}

// -Chameleon- Use the 'bind' prototype to do exactly this, a great little snippet (forgot where I grabbed it from)
//because I don't know how to pass a parameter with an action listener
function helperMethod() {
writeConsole(snippet);
}