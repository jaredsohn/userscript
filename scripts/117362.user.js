// ==UserScript==
// @name           Gorilla Video Downloader
// @version        1.0
// @namespace      noobs
// @include        *gorillavid.in*
// @include        *daclips.in*
// @include        *movpod.in*
// @description    Adds direct link for Gorillavid videos
// ==/UserScript==

function create (){
	//GM_log(inspect(unsafeWindow.options.levels,7,1));
if(flashvars){
	var button = document.createElement('a');
	button.href = flashvars.file;
	button.innerHTML = 'Download';
	document.getElementById('menu-main').appendChild(button);
	return;
}
if(options){
	var button = document.createElement('a');
	button.href = options.levels[0].file;
	button.innerHTML = 'Download';
	document.getElementById('menu-main').appendChild(button);
	return;
}
	setTimeout(create,1000);
}

AddScript(create);
AddScript('create()');

function AddScript(js) {
	var scr=document.createElement('script');
	scr.innerHTML=js;
	document.body.appendChild(scr);
}


function inspect(obj, maxLevels, level, doFunctions){
  var str = '', type, msg;
  if(level == null)  level = 0;
  if(maxLevels == null) maxLevels = 1;
  if(maxLevels < 1)
      return 'Inspect Error: Levels number must be > 0';
  if(obj == null)
    return 'ERROR: Object is NULL\n';
  var indent = '';
  for (var i=0; i<level; i++)
    indent += '  ';
  for(property in obj) {
    try {
        type =  matTypeof(obj[property]);
        if (doFunctions==true && (type == 'function')){
          str += indent + '(' + type + ') ' + property + "[FUNCTION]\n";
        } else if (type != 'function') {
          str += indent + '(' + type + ') ' + property + ( (obj[property]==null)?(': null'):('')) +' = '+ obj[property] +"\n";
        }
        if((type=='object' || type=='array') && (obj[property] != null) && (level+1 < maxLevels))
          str += inspect(obj[property], maxLevels, level+1, doFunctions);  // recurse
    }
    catch(err) {
      // Is there some properties in obj we can't access? Print it red.
      if(typeof(err) == 'string') msg = err;
      else if(err.message)        msg = err.message;
      else if(err.description)    msg = err.description;
      else                        msg = 'Unknown';
      str += '(Error) ' + property + ': ' + msg +"\n";
    }
  }
  str += "\n";
  return str;
}
function matTypeof (v){
  if (typeof (v) == 'object'){
    if (!v)
      return 'null';
//    else if (unsafeWindow.Object.prototype.toString.apply(v) === '[object Array]')
    else if (v.constructor.toString().indexOf("Array")>=0 && typeof(v.splice)=='function')
      return 'array';
    else return 'object';
  }
  return typeof (v);
}

