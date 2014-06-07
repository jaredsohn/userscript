// ==UserScript==
// @name           Hero
// @namespace      http://50hero.mymaji.com/
// @include        http://*.50hero.mymaji.com/
// ==/UserScript==

var scriptCode = new Array();
scriptCode.push('classIm.prototype.onData=function(data) {');
scriptCode.push(' var block_name = [');
scriptCode.push('  "名字1", "名字2","名字3", ');
scriptCode.push(' ];');
scriptCode.push(' var u=data.split(\'|\')[2];'        );
scriptCode.push(' for(var i=0; i<block_name.length; i++)'        );
scriptCode.push('  if(u==block_name[i])'        );
scriptCode.push('   return true;'        );
scriptCode.push('if(this.debug==1)this.showStatus(\'---返回請求---\'+data);');
scriptCode.push('this.defaultHandle(data) }');

var script = document.createElement('script');
script.innerHTML = scriptCode.join('\n');
scriptCode.length = 0;

document.getElementsByTagName('head')[0].appendChild(script); 
