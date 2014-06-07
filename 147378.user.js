// ==UserScript==
// @name           test forum
// @author         LJD McLegrand
// @namespace      http://lesroyaumes.com
// @description    test
// @include        http://forum.lesroyaumes.com/posting.php*
// @include        http://forum2.lesroyaumes.com/posting.php*
// ==/UserScript==

//
var scriptCode = new Array();
scriptCode.push('tag=function(tag1, tag2) {');
scriptCode.push('	var txtarea = document.post.message;');
scriptCode.push('  start = txtarea.selectionStart;');
scriptCode.push('  end = txtarea.selectionEnd;');
scriptCode.push('');
scriptCode.push('  /*Split before, sel, after and insert tags in between */');
scriptCode.push('  ');
scriptCode.push('  before = (txtarea.value).substring(0, start);');
scriptCode.push('  sel = (txtarea.value).substring(start, end);');
scriptCode.push('  after = (txtarea.value).substring(end, txtarea.textLength);');
scriptCode.push('');
scriptCode.push('  txtarea.value = before + tag1 + sel + tag2  + after;');
scriptCode.push('');
scriptCode.push('  /*focus*/');
scriptCode.push('  txtarea.focus();');
scriptCode.push('  txtarea.selectionStart = end + tag1.length + tag2.length;');
scriptCode.push('  txtarea.selectionEnd = txtarea.selectionStart; ');
scriptCode.push('}');
scriptCode.push('');
scriptCode.push('');
scriptCode.push('');
scriptCode.push('');
scriptCode.push('emoticon=function(text) {');
scriptCode.push('	var txtarea = document.post.message;');
scriptCode.push('  tag = \' \' + text + \' \';');
scriptCode.push('  ');
scriptCode.push('  start = txtarea.selectionStart;');
scriptCode.push('  end = txtarea.selectionEnd;');
scriptCode.push('');
scriptCode.push('  ');
scriptCode.push('  before = (txtarea.value).substring(0, start);');
scriptCode.push('  sel = (txtarea.value).substring(start, end);');
scriptCode.push('  after = (txtarea.value).substring(end, txtarea.textLength);');
scriptCode.push('');
scriptCode.push('  txtarea.value = before + tag + after;');
scriptCode.push('');
scriptCode.push('  txtarea.focus();');
scriptCode.push('  txtarea.selectionStart =start + tag.length ;');
scriptCode.push('  txtarea.selectionEnd = txtarea.selectionStart; ');
scriptCode.push('}');
scriptCode.push('');
scriptCode.push(' bbfontstyle=function(bbopen, bbclose) {var txtarea = document.post.message;if(txtarea.selectionStart != txtarea.selectionEnd){tag(bbopen,bbclose);}else{tag(bbopen,bbclose);txtarea.selectionStart-=bbclose.length;txtarea.selectionEnd-=bbclose.length;}}');
scriptCode.push('');
scriptCode.push(' bbstyle=function(bbnumber) {if(bbnumber==-1)return;');
scriptCode.push('	var txtarea = document.post.message;');
scriptCode.push('');
scriptCode.push('	txtarea.focus();');
scriptCode.push('	');
scriptCode.push('	if(txtarea.selectionStart != txtarea.selectionEnd){');
scriptCode.push('    	tag(bbtags[bbnumber], bbtags[bbnumber+1]);');
scriptCode.push('        return;    ');
scriptCode.push('        }');
scriptCode.push('    tag(bbtags[bbnumber], bbtags[bbnumber+1]);');
scriptCode.push('    txtarea.selectionStart -= bbtags[bbnumber+1].length;');
scriptCode.push('    txtarea.selectionEnd -= bbtags[bbnumber+1].length;');
scriptCode.push('');    // now, we put the script in a new script element in the DOM
scriptCode.push('}');
    var script = document.createElement('script');    // create the script element
    script.innerHTML = scriptCode.join('\n');         // add the script code to it
    script.setAttribute('type','text/javascript'); 
    document.getElementsByTagName('body')[0].appendChild(script); 



