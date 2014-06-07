// ==UserScript==
// @name           Userscripts.org - Extract/Export your scripts
// @namespace      c1b1.de
// @description    Adds a link to the menu, which creates a JSON array of your scripts from the data of the following page(s): http://userscripts.org/home/scripts
// @version        1.2
// @homepage       http://c1b1.de
// @copyright      2009-2014, Samuel Essig (http://c1b1.de)
// @license        CC Attribution-Noncommercial-Share Alike 3.0 Germany; http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode
// @include        http://userscripts.org*/home/scripts*
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==

/*

####################### License ######################

Shared under the 'CC Attribution-Noncommercial-Share Alike 3.0 Germany' License:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode

English Summary of that license:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/deed.en

*/

var basepath = document.location.protocol+'//'+document.location.host; // usually: 'http://www.userscripts.org'

var GMVAR_extracting = GM_getValue('extracting',false);
var GMVAR_result = GM_getValue('result','[]');

var pagination = document.getElementsByClassName('pagination')[0];

var a = document.createElement('a');
a.setAttribute('href','#');
a.appendChild(document.createTextNode('Extract'));
a.addEventListener('click',startExtraction,false);

pagination.appendChild(document.createTextNode(' '));
pagination.appendChild(a);


if(GMVAR_extracting) {
  var table = document.getElementsByClassName('wide forums')[0];
  if(!table) {
    GM_setValue('extracting',false);
    showResult();
    }
  else {
    var new_result = ExtractScripts();

    var result = JSON.parse(GMVAR_result);

    for(var i = 0, len = new_result.length; i < len; i++) {
      result.push(new_result[i]);
      }

    GM_setValue('result',JSON.stringify(result));

    document.location.href = basepath + '/home/scripts?page=' + (parseInt(document.location.href.split('=')[1])+1);
    }
  }


function showResult() {
  var result = JSON.parse(GMVAR_result);

  var objs = [];

  for(var i = 0, len = result.length; i < len; i++) {
    objs.push(JSON.stringify(result[i]));
    }

  var output = '[\n  '+objs.join(',\n\n  ')+'\n]';

  output += '\n\n\n################################## Now without line breaks : ###################\n\n';


  var pre = document.createElement('pre');
  pre.appendChild(document.createTextNode(output));

  var textarea = document.createElement('textarea');
  textarea.appendChild(document.createTextNode(GMVAR_result));
  pre.appendChild(textarea);

  pagination.parentNode.insertBefore(pre,pagination.nextSibling);
  }


function startExtraction(e) {
  GM_setValue('extracting',true);
  GM_setValue('result','[]');
  document.location.href = basepath +'/home/scripts?page=1';
  }


function ExtractScripts() {
  var table = document.getElementsByClassName('wide forums')[0];
  var tr = table.getElementsByTagName('tr');

  var objs = new Array();

  for(var i = 1, len = tr.length; i < len; i++) {
    var td = tr[i].getElementsByTagName('td');

    var id = tr[i].getAttribute('id').split('-').pop();

    var name = td[0].getElementsByClassName('title')[0].firstChild.nodeValue;
    var desc = td[0].getElementsByClassName('desc')[0].firstChild?td[0].getElementsByClassName('desc')[0].firstChild.nodeValue:'';
    var installs = parseInt(td[5].firstChild.nodeValue);
    var update = td[6].getElementsByClassName('updated')[0].getAttribute('title');
    objs.push({'id':id,'name':name,'desc':desc,'installs':installs,'update':update});
    }

  return objs;
  }

/*

# Needs a directory "scripts" and a JSON file "scripts.json" 
# The scripts.json that contains the data provided by the userscript
# Both scripts.json and the python file should be UTF-8.

import json
import urllib2
import re

#base = 'http://userscripts.org'
base = 'http://userscripts.org:8080'


def downloadScript(ID,name):
  print(name+'\t\t\tDownloading...');
  url = base+'/scripts/source/'+ID+'.user.js'
  urlFile = urllib2.urlopen(url)
  alphanum_name = re.sub('\W', '_', name).replace('__','_').replace('__','_')
  filename = ID + '--' + alphanum_name +'.user.js'
  localFile = open(directory+filename, 'wb')
  localFile.write(urlFile.read())
  urlFile.close()
  localFile.close()
  print(alphanum_name+'.user.js\t\tDONE!\n')

filename = 'scripts.json'
directory = 'scripts/'
with open(filename) as fs:
  jsonstring = fs.read();

scripts = json.loads(jsonstring)

for script in scripts:
  downloadScript(script['id'],script['name'])

raw_input("Finished Downloading - Press Enter to exit")

*/
