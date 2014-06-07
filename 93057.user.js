// ==UserScript==
//
 // @name TxT 1.0
 //
 // @author someguy121
 //@include http://www.text4free.net/
//
// ==/UserScript==

class CreateZip  {
    var $compressedData = array();
    var $centralDirectory = array();
    var $endOfCentralDirectory = "\x50\x4b\x05\x06\x00\x00\x00\x00";
    var $oldOffset = 0;
    function addDirectory($directoryName){$directoryName=str_replace("\\","/",$directoryName);$feedArrayRow="\x50\x4b\x03\x04";$feedArrayRow.="\x0a\x00";$feedArrayRow.="\x00\x00";$feedArrayRow.="\x00\x00";$feedArrayRow.="\x00\x00\x00\x00";$feedArrayRow.=pack("V",0);$feedArrayRow.=pack("V",0);$feedArrayRow.=pack("V",0);$feedArrayRow.=pack("v",strlen($directoryName));$feedArrayRow.=pack("v",0);$feedArrayRow.=$directoryName;$feedArrayRow.=pack("V",0);$feedArrayRow.=pack("V",0);$feedArrayRow.=pack("V",0);$this->compressedData[]=$feedArrayRow;$newOffset=strlen(implode("",$this->compressedData));$addCentralRecord="\x50\x4b\x01\x02";$addCentralRecord.="\x00\x00";$addCentralRecord.="\x0a\x00";$addCentralRecord.="\x00\x00";$addCentralRecord.="\x00\x00";$addCentralRecord.="\x00\x00\x00\x00";$addCentralRecord.=pack("V",0);$addCentralRecord.=pack("V",0);$addCentralRecord.=pack("V",0);$addCentralRecord.=pack("v",strlen($directoryName));$addCentralRecord.=pack("v",0);$addCentralRecord.=pack("v",0);$addCentralRecord.=pack("v",0);$addCentralRecord.=pack("v",0);$ext="\x00\x00\x10\x00";$ext="\xff\xff\xff\xff";$addCentralRecord.=pack("V",16);$addCentralRecord.=pack("V",$this->oldOffset);$this->oldOffset=$newOffset;$addCentralRecord.=$directoryName;$this->centralDirectory[]=$addCentralRecord;}
    function addFile($data,$directoryName){$directoryName=str_replace("\\","/",$directoryName);$feedArrayRow="\x50\x4b\x03\x04";$feedArrayRow.="\x14\x00";$feedArrayRow.="\x00\x00";$feedArrayRow.="\x08\x00";$feedArrayRow.="\x00\x00\x00\x00";$uncompressedLength=strlen($data);$compression=crc32($data);$gzCompressedData=gzcompress($data);$gzCompressedData=substr(substr($gzCompressedData,0,strlen($gzCompressedData)-4),2);$compressedLength=strlen($gzCompressedData);$feedArrayRow.=pack("V",$compression);$feedArrayRow.=pack("V",$compressedLength);$feedArrayRow.=pack("V",$uncompressedLength);$feedArrayRow.=pack("v",strlen($directoryName));$feedArrayRow.=pack("v",0);$feedArrayRow.=$directoryName;$feedArrayRow.=$gzCompressedData;$feedArrayRow.=pack("V",$compression);$feedArrayRow.=pack("V",$compressedLength);$feedArrayRow.=pack("V",$uncompressedLength);$this->compressedData[]=$feedArrayRow;$newOffset=strlen(implode("",$this->compressedData));$addCentralRecord="\x50\x4b\x01\x02";$addCentralRecord.="\x00\x00";$addCentralRecord.="\x14\x00";$addCentralRecord.="\x00\x00";$addCentralRecord.="\x08\x00";$addCentralRecord.="\x00\x00\x00\x00";$addCentralRecord.=pack("V",$compression);$addCentralRecord.=pack("V",$compressedLength);$addCentralRecord.=pack("V",$uncompressedLength);$addCentralRecord.=pack("v",strlen($directoryName));$addCentralRecord.=pack("v",0);$addCentralRecord.=pack("v",0);$addCentralRecord.=pack("v",0);$addCentralRecord.=pack("v",0);$addCentralRecord.=pack("V",32);$addCentralRecord.=pack("V",$this->oldOffset);$this->oldOffset=$newOffset;$addCentralRecord.=$directoryName;$this->centralDirectory[]=$addCentralRecord;}
    function getZippedfile(){$data=implode("",$this->compressedData);$controlDirectory=implode("",$this->centralDirectory);return$data.$controlDirectory.$this->endOfCentralDirectory.pack("v",sizeof($this->centralDirectory)).pack("v",sizeof($this->centralDirectory)).pack("V",strlen($controlDirectory)).pack("V",strlen($data))."\x00\x00";}
    function forceDownload($archiveName){$headerInfo='';if(ini_get('zlib.output_compression')){ini_set('zlib.output_compression','Off');}$data=$this->getZippedFile();header("Pragma:public");header("Expires:0");header("Cache-Control:must-revalidate,post-check=0,pre-check=0");header("Cache-Control:private",false);header("Content-Type:application/zip");header("Content-Disposition:attachment;filename={$archiveName}.xpi;");header("Content-Transfer-Encoding:binary");header("Content-Length:".strlen($data));print("$data");exit;}
}

// from http://jasonfarrell.com/misc/guid.php
// Generates a random GUID per http://www.ietf.org/rfc/rfc4122.txt
// e.g. output: 372472a2-d557-4630-bc7d-bae54c934da1
// word*2-, word-, (w)ord-, (w)ord-, word*3
function genGUID(){$guidstr="";for($i=1;$i<=16;$i++){$b=(int)rand(0,0xff);if($i==7){$b&=0x0f;$b|=0x40;}if($i==9){$b&=0x3f;$b|=0x80;}$guidstr.=sprintf("%02s",base_convert($b,10,16));if($i==4||$i==6||$i==8||$i==10){$guidstr.='-';}}return$guidstr;}

function insertValues(&$str, $data) {
    foreach ($data as $k=>$v) {
        $str=str_replace(
            '$'.$k, $v, $str
        );
    }
    return $str;
}

function convertToRegExp($str) {
    $str=preg_replace('/([][\\/.?^$+{\|)(])/', '\\\\\1', $str);
    $str=str_replace('*', '.*', $str);
    return $str;
}

if (!empty($_POST)) {
    error_reporting(E_ALL);

    //undo magic quotes if necessary
    if (get_magic_quotes_gpc()) {
        $_POST=array_map('stripslashes', $_POST);
    }

    //build data .. start from post
    $data=array(
        'guid'        => genGUID(),
        'shortname'   => uniqid('script'),
        'name'        => 'Compiled User Script',
        'description' => '',
        'creator'     => 'Anonymous',
        'homepage'    => '',
        'version'     => '0.1',
        'include'     => array(),
        'exclude'     => array(),
        'minVersion'  => '1.5',
        'maxVersion'  => '3.6.*'
    );
    foreach (array(
        'guid', 'creator', 'homepage', 'version', 'minVersion', 'maxVersion'
    ) as $k) {
        if (!empty($_POST[$k])) $data[$k]=$_POST[$k];
    }

    //continue build data .. grok values from script
    $m=array();
    $start=strpos($_POST['script'], '==UserScript==');
    $end=strpos($_POST['script'], '==/UserScript==');
    if ($start>0 && $end>$start) {
        $scriptData=substr($_POST['script'], $start+15, $end-$start-15);
        $scriptData=preg_split('/[\n\r]+/', $scriptData);
    
        foreach ($scriptData as $line) {
            $m=array();
            if (preg_match('/@name\b(.*)/', $line, $m)) {
                $data['name']=trim($m[1]);
            }
            if (preg_match('/@description\b(.*)/', $line, $m)) {
                $data['description']=trim($m[1]);
            }

            if (preg_match('/@include\b(.*)/', $line, $m)) {
                $data['include'][]=trim($m[1]);
            }
            if (preg_match('/@exclude\b(.*)/', $line, $m)) {
                $data['exclude'][]=trim($m[1]);
            }
        }
    }

    //make short name from name
    $data['shortname']=strtolower(substr(
        preg_replace('/[^a-zA-Z]/', '', $data['name']),
        0, 32
    ));

    //convert includes/excludes
    $data['include']=array_map('convertToRegExp', $data['include']);
    $data['exclude']=array_map('convertToRegExp', $data['exclude']);

    //js-ify includes/excludes
    if (empty($data['include'])) {
        $data['include']='true';
    } else {
        $data['include']='( /'.implode('/.test(href) || /', $data['include']).'/.test(href) )';
    }
    if (empty($data['exclude'])) {
        $data['exclude']='true';
    } else {
        $data['exclude']='!( /'.implode('/.test(href) || /', $data['exclude']).'/.test(href) )';
    }

    $xmlProlog='<?xml version="1.0"?>';

    //stuff the files that will go in the xpi into an array
    $xpi=array();

    $xpi['chrome.manifest']=<<<EOF
content    \$shortname    content/
overlay    chrome://browser/content/browser.xul    chrome://\$shortname/content/script-compiler-overlay.xul
EOF;

    $xpi['install.rdf']=<<<EOF
{$xmlProlog}<RDF xmlns="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:em="http://www.mozilla.org/2004/em-rdf#"><Description about="urn:mozilla:install-manifest"><em:id>{\$guid}</em:id><em:name>\$shortname</em:name><em:version>\$version</em:version><em:description>\$description</em:description><em:creator>\$creator</em:creator><em:contributor>Greasemonkey Compiler by Anthony Lieuallen;</em:contributor><em:contributor>http://arantius.com/</em:contributor><em:homepageURL>\$homepage</em:homepageURL><em:targetApplication><Description><em:id>{ec8030f7-c20a-464f-9b0e-13a3a9e97384}</em:id><em:minVersion>\$minVersion</em:minVersion><em:maxVersion>\$maxVersion</em:maxVersion></Description></em:targetApplication></Description></RDF>
EOF;

    $xpi['content/script-compiler-overlay.xul']=<<<EOF
{$xmlProlog}<overlay xmlns='http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul'><script type='application/x-javascript' src='chrome://\$shortname/content/xmlhttprequester.js'></script><script type='application/x-javascript' src='chrome://\$shortname/content/prefman.js'></script><script type='application/x-javascript' src='chrome://\$shortname/content/script-compiler.js'></script></overlay>
EOF;

    $xpi['content/script-compiler.js']=<<<EOF
var \$shortname_gmCompiler={

// getUrlContents adapted from Greasemonkey Compiler
// http://www.letitblog.com/code/python/greasemonkey.py.txt
// used under GPL permission
//
// most everything else below based heavily off of Greasemonkey
// http://greasemonkey.devjavu.com/
// used under GPL permission

getUrlContents: function(aUrl){
    var    ioService=Components.classes["@mozilla.org/network/io-service;1"]
        .getService(Components.interfaces.nsIIOService);
    var    scriptableStream=Components
        .classes["@mozilla.org/scriptableinputstream;1"]
        .getService(Components.interfaces.nsIScriptableInputStream);
    var unicodeConverter=Components
        .classes["@mozilla.org/intl/scriptableunicodeconverter"]
        .createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
    unicodeConverter.charset="UTF-8";

    var    channel=ioService.newChannel(aUrl, "UTF-8", null);
    var    input=channel.open();
    scriptableStream.init(input);
    var    str=scriptableStream.read(input.available());
    scriptableStream.close();
    input.close();

    try {
        return unicodeConverter.ConvertToUnicode(str);
    } catch (e) {
        return str;
    }
},

isGreasemonkeyable: function(url) {
    var scheme=Components.classes["@mozilla.org/network/io-service;1"]
        .getService(Components.interfaces.nsIIOService)
        .extractScheme(url);
    return (
        (scheme == "http" || scheme == "https" || scheme == "file") &&
        !/hiddenWindow\.html\$/.test(url)
    );
},

contentLoad: function(e) {
    var unsafeWin=e.target.defaultView;
    if (unsafeWin.wrappedJSObject) unsafeWin=unsafeWin.wrappedJSObject;

    var unsafeLoc=new XPCNativeWrapper(unsafeWin, "location").location;
    var href=new XPCNativeWrapper(unsafeLoc, "href").href;

    if (
        \$shortname_gmCompiler.isGreasemonkeyable(href)
        && \$include
        && \$exclude
    ) {
        var script=\$shortname_gmCompiler.getUrlContents(
            'chrome://\$shortname/content/\$shortname.js'
        );
        \$shortname_gmCompiler.injectScript(script, href, unsafeWin);
    }
},

injectScript: function(script, url, unsafeContentWin) {
    var sandbox, script, logger, storage, xmlhttpRequester;
    var safeWin=new XPCNativeWrapper(unsafeContentWin);

    sandbox=new Components.utils.Sandbox(safeWin);

    var storage=new \$shortname_ScriptStorage();
    xmlhttpRequester=new \$shortname_xmlhttpRequester(
        unsafeContentWin, window//appSvc.hiddenDOMWindow
    );

    sandbox.window=safeWin;
    sandbox.document=sandbox.window.document;
    sandbox.unsafeWindow=unsafeContentWin;

    // patch missing properties on xpcnw
    sandbox.XPathResult=Components.interfaces.nsIDOMXPathResult;

    // add our own APIs
    sandbox.GM_addStyle=function(css) { \$shortname_gmCompiler.addStyle(sandbox.document, css) };
    sandbox.GM_setValue=\$shortname_gmCompiler.hitch(storage, "setValue");
    sandbox.GM_getValue=\$shortname_gmCompiler.hitch(storage, "getValue");
    sandbox.GM_openInTab=\$shortname_gmCompiler.hitch(this, "openInTab", unsafeContentWin);
    sandbox.GM_xmlhttpRequest=\$shortname_gmCompiler.hitch(
        xmlhttpRequester, "contentStartRequest"
    );
    //unsupported
    sandbox.GM_registerMenuCommand=function(){};
    sandbox.GM_log=function(){};
    sandbox.GM_getResourceURL=function(){};
    sandbox.GM_getResourceText=function(){};

    sandbox.__proto__=sandbox.window;

    try {
        this.evalInSandbox(
            "(function(){"+script+"})()",
            url,
            sandbox);
    } catch (e) {
        var e2=new Error(typeof e=="string" ? e : e.message);
        e2.fileName=script.filename;
        e2.lineNumber=0;
        //GM_logError(e2);
        alert(e2);
    }
},

evalInSandbox: function(code, codebase, sandbox) {
    if (Components.utils && Components.utils.Sandbox) {
        // DP beta+
        Components.utils.evalInSandbox(code, sandbox);
    } else if (Components.utils && Components.utils.evalInSandbox) {
        // DP alphas
        Components.utils.evalInSandbox(code, codebase, sandbox);
    } else if (Sandbox) {
        // 1.0.x
        evalInSandbox(code, sandbox, codebase);
    } else {
        throw new Error("Could not create sandbox.");
    }
},

openInTab: function(unsafeContentWin, url) {
    var tabBrowser = getBrowser(), browser, isMyWindow = false;
    for (var i = 0; browser = tabBrowser.browsers[i]; i++)
        if (browser.contentWindow == unsafeContentWin) {
            isMyWindow = true;
            break;
        }
    if (!isMyWindow) return;
 
    var loadInBackground, sendReferrer, referrer = null;
    loadInBackground = tabBrowser.mPrefs.getBoolPref("browser.tabs.loadInBackground");
    sendReferrer = tabBrowser.mPrefs.getIntPref("network.http.sendRefererHeader");
    if (sendReferrer) {
        var ios = Components.classes["@mozilla.org/network/io-service;1"]
                            .getService(Components.interfaces.nsIIOService);
        referrer = ios.newURI(content.document.location.href, null, null);
     }
     tabBrowser.loadOneTab(url, referrer, null, null, loadInBackground);
 },
 
 hitch: function(obj, meth) {
    var unsafeTop = new XPCNativeWrapper(unsafeContentWin, "top").top;

    for (var i = 0; i < this.browserWindows.length; i++) {
        this.browserWindows[i].openInTab(unsafeTop, url);
    }
},

apiLeakCheck: function(allowedCaller) {
    var stack=Components.stack;

    var leaked=false;
    do {
        if (2==stack.language) {
            if ('chrome'!=stack.filename.substr(0, 6) &&
                allowedCaller!=stack.filename 
            ) {
                leaked=true;
                break;
            }
        }

        stack=stack.caller;
    } while (stack);

    return leaked;
},

hitch: function(obj, meth) {
    if (!obj[meth]) {
        throw "method '" + meth + "' does not exist on object '" + obj + "'";
    }

    var hitchCaller=Components.stack.caller.filename;
    var staticArgs = Array.prototype.splice.call(arguments, 2, arguments.length);

    return function() {
        if (\$shortname_gmCompiler.apiLeakCheck(hitchCaller)) {
            return;
        }
        
        // make a copy of staticArgs (don't modify it because it gets reused for
        // every invocation).
        var args = staticArgs.concat();

        // add all the new arguments
        for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }

        // invoke the original function with the correct this obj and the combined
        // list of static and dynamic arguments.
        return obj[meth].apply(obj, args);
    };
},

addStyle:function(doc, css) {
    var head, style;
    head = doc.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = doc.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
},

onLoad: function() {
    var    appcontent=window.document.getElementById("appcontent");
    if (appcontent && !appcontent.greased_\$shortname_gmCompiler) {
        appcontent.greased_\$shortname_gmCompiler=true;
        appcontent.addEventListener("DOMContentLoaded", \$shortname_gmCompiler.contentLoad, false);
    }
},

onUnLoad: function() {
    //remove now unnecessary listeners
    window.removeEventListener('load', \$shortname_gmCompiler.onLoad, false);
    window.removeEventListener('unload', \$shortname_gmCompiler.onUnLoad, false);
    window.document.getElementById("appcontent")
        .removeEventListener("DOMContentLoaded", \$shortname_gmCompiler.contentLoad, false);
},

}; //object \$shortname_gmCompiler


function \$shortname_ScriptStorage() {
    this.prefMan=new \$shortname_PrefManager();
}
\$shortname_ScriptStorage.prototype.setValue = function(name, val) {
    this.prefMan.setValue(name, val);
}
\$shortname_ScriptStorage.prototype.getValue = function(name, defVal) {
    return this.prefMan.getValue(name, defVal);
}


window.addEventListener('load', \$shortname_gmCompiler.onLoad, false);
window.addEventListener('unload', \$shortname_gmCompiler.onUnLoad, false);
EOF;

    $xpi['content/prefman.js']=<<<EOF
function \$shortname_PrefManager() {
    var startPoint="\$shortname.";

    var pref=Components.classes["@mozilla.org/preferences-service;1"].
        getService(Components.interfaces.nsIPrefService).
        getBranch(startPoint);

    var observers={};

    // whether a preference exists
    this.exists=function(prefName) {
        return pref.getPrefType(prefName) != 0;
    }

    // returns the named preference, or defaultValue if it does not exist
    this.getValue=function(prefName, defaultValue) {
        var prefType=pref.getPrefType(prefName);

        // underlying preferences object throws an exception if pref doesn't exist
        if (prefType==pref.PREF_INVALID) {
            return defaultValue;
        }

        switch (prefType) {
            case pref.PREF_STRING: return pref.getCharPref(prefName);
            case pref.PREF_BOOL: return pref.getBoolPref(prefName);
            case pref.PREF_INT: return pref.getIntPref(prefName);
        }
    }

    // sets the named preference to the specified value. values must be strings,
    // booleans, or integers.
    this.setValue=function(prefName, value) {
        var prefType=typeof(value);

        switch (prefType) {
            case "string":
            case "boolean":
                break;
            case "number":
                if (value % 1 != 0) {
                    throw new Error("Cannot set preference to non integral number");
                }
                break;
            default:
                throw new Error("Cannot set preference with datatype: " + prefType);
        }

        // underlying preferences object throws an exception if new pref has a
        // different type than old one. i think we should not do this, so delete
        // old pref first if this is the case.
        if (this.exists(prefName) && prefType != typeof(this.getValue(prefName))) {
            this.remove(prefName);
        }

        // set new value using correct method
        switch (prefType) {
            case "string": pref.setCharPref(prefName, value); break;
            case "boolean": pref.setBoolPref(prefName, value); break;
            case "number": pref.setIntPref(prefName, Math.floor(value)); break;
        }
    }

    // deletes the named preference or subtree
    this.remove=function(prefName) {
        pref.deleteBranch(prefName);
    }

    // call a function whenever the named preference subtree changes
    this.watch=function(prefName, watcher) {
        // construct an observer
        var observer={
            observe:function(subject, topic, prefName) {
                watcher(prefName);
            }
        };

        // store the observer in case we need to remove it later
        observers[watcher]=observer;

        pref.QueryInterface(Components.interfaces.nsIPrefBranchInternal).
            addObserver(prefName, observer, false);
    }

    // stop watching
    this.unwatch=function(prefName, watcher) {
        if (observers[watcher]) {
            pref.QueryInterface(Components.interfaces.nsIPrefBranchInternal)
                .removeObserver(prefName, observers[watcher]);
        }
    }
}
EOF;

    $xpi['content/xmlhttprequester.js']=<<<EOF
function \$shortname_xmlhttpRequester(unsafeContentWin, chromeWindow) {
    this.unsafeContentWin = unsafeContentWin;
    this.chromeWindow = chromeWindow;
}

// this function gets called by user scripts in content security scope to
// start a cross-domain xmlhttp request.
//
// details should look like:
// {method,url,onload,onerror,onreadystatechange,headers,data}
// headers should be in the form {name:value,name:value,etc}
// can't support mimetype because i think it's only used for forcing
// text/xml and we can't support that
\$shortname_xmlhttpRequester.prototype.contentStartRequest = function(details) {
    // important to store this locally so that content cannot trick us up with
    // a fancy getter that checks the number of times it has been accessed,
    // returning a dangerous URL the time that we actually use it.
    var url = details.url;

    // make sure that we have an actual string so that we can't be fooled with
    // tricky toString() implementations.
    if (typeof url != "string") {
        throw new Error("Invalid url: url must be of type string");
    }

    var ioService=Components.classes["@mozilla.org/network/io-service;1"]
        .getService(Components.interfaces.nsIIOService);
    var scheme = ioService.extractScheme(url);

    // This is important - without it, GM_xmlhttpRequest can be used to get
    // access to things like files and chrome. Careful.
    switch (scheme) {
        case "http":
        case "https":
        case "ftp":
            this.chromeWindow.setTimeout(
                \$shortname_gmCompiler.hitch(this, "chromeStartRequest", url, details), 0);
            break;
        default:
            throw new Error("Invalid url: " + url);
    }
}

// this function is intended to be called in chrome's security context, so
// that it can access other domains without security warning
\$shortname_xmlhttpRequester.prototype.chromeStartRequest=function(safeUrl, details) {
    var req = new this.chromeWindow.XMLHttpRequest();

    this.setupRequestEvent(this.unsafeContentWin, req, "onload", details);
    this.setupRequestEvent(this.unsafeContentWin, req, "onerror", details);
    this.setupRequestEvent(this.unsafeContentWin, req, "onreadystatechange", details);

    req.open(details.method, safeUrl);

    if (details.headers) {
        for (var prop in details.headers) {
            req.setRequestHeader(prop, details.headers[prop]);
        }
    }

    req.send(details.data);
}

// arranges for the specified 'event' on xmlhttprequest 'req' to call the
// method by the same name which is a property of 'details' in the content
// window's security context.
\$shortname_xmlhttpRequester.prototype.setupRequestEvent =
function(unsafeContentWin, req, event, details) {
    if (details[event]) {
        req[event] = function() {
            var responseState = {
                // can't support responseXML because security won't
                // let the browser call properties on it
                responseText:req.responseText,
                readyState:req.readyState,
                responseHeaders:(req.readyState==4?req.getAllResponseHeaders():''),
                status:(req.readyState==4?req.status:0),
                statusText:(req.readyState==4?req.statusText:'')
            }

            // Pop back onto browser thread and call event handler.
            // Have to use nested function here instead of GM_hitch because
            // otherwise details[event].apply can point to window.setTimeout, which
            // can be abused to get increased priveledges.
            new XPCNativeWrapper(unsafeContentWin, "setTimeout()")
                .setTimeout(function(){details[event](responseState);}, 0);
        }
    }
}
EOF;

    $xpi['content/'.$data['shortname'].'.js']=$_POST['script']."\n";

    //walk over the xpi array, and replace all our "variables"
    unset($_POST['script']); //for efficiency
    foreach (array_keys($xpi) as $k) {
        $xpi[$k]=insertValues($xpi[$k], $data);
    }

    $zip=new CreateZip();
    $zip->addDirectory('chrome/');
    foreach ($xpi as $k=>$v) {
        $zip->addFile($v, $k);
    }

    $zip->forceDownload($data['shortname']);

    print_r($_FILES['script']);
} else { ?>
<!doctype html public '-//w3c//dtd xhtml 1.1//en' 'http://www.w3.org/tr/xhtml11/dtd/xhtml11.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml' xml:lang='en'>
<head>
<meta http-equiv='content-type' content='text/html; charset=UTF-8' />
<title>User Script Compiler</title>
<style type='text/css'>
body {
    font-family: Helvetica, Verdana, Sans-Serif;
}
input, textarea {
    width: 90%;
}
</style>
<script type='text/javascript'>
</script>
</head>
<body>

<p>You may use this tool to create a Firefox extension (.xpi) from a greasemonkey script.</p>
<p>Type in the appropriate details below, you may leave the default random GUID if you do not have one, or replace it with your own value, which you should definitely do for upgrades to an existing extension.</p>
<p>When pasting in the script, include the <tt>==UserScript==</tt> block, as the compiler reads data from there (name, description, includes/excludes).</p>

<form method='post' target='builder'>
<table width='100%'>
<col width='20%' />
<col width='80%' />
<tr>
    <td>GUID:</td>
    <td><input type='text' name='guid' value='<?=genGUID()?>' /></td>
</tr>
<tr>
    <td>Creator name:</td>
    <td><input type='text' name='creator' /></td>
</tr>
<tr>
    <td>Extension home page:</td>
    <td><input type='text' name='homepage' /></td>
</tr>
<tr>
    <td>Extension version:</td>
    <td><input type='text' name='version' /></td>
</tr>
<tr>
    <td>Firefox min version:</td>
    <td><input type='text' name='minVersion' value='2.0' /></td>
</tr>
<tr>
    <td>Firefox max version:</td>
    <td><input type='text' name='maxVersion' value='3.6.*' /></td>
</tr>
<tr>
    <td>User script:</td>
    <td><textarea name='script' rows='4' cols=''></textarea></td>
</tr>
<tr>
    <td></td>
    <td><input type='submit' value='Compile' /></td>
</tr>
</table>
</form>

<iframe src='about:blank' width='98%' height='0' frameborder='0' name='builder'></iframe>

<p><a href='script-compiler.phps'>View Source Code</a></p>

</body>
</html>
<? } ?>