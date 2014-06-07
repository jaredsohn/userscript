// ==UserScript==
// @name           MYouPorn
// @namespace      0d92f6be108e4fbee9a6a0ee4366b72e
// @version        1.6.0
// @description    Direct link to video, video plays in div
// @include        http://*youporn.com/*
// @include        http://*redtube.com/*
// @include        http://*tube8.com/*
// @include        http://*pornhub.com/*
// ==/UserScript==

//Script update check derived from YousableTubefix

//Mohawk - Bad Girls (Need Love Too)
var scriptVersion = 1060;
var scriptURL = "http://userscripts.org/scripts/source/24547.user.js";
var scriptUpdateUrl = "http://userscripts.org/scripts/review/24547";
var scriptNewAvail = null;

var scriptLastCheck = parseInt(GM_getValue("scriptLastCheck", "0"), 10);
if (isNaN(scriptLastCheck)) scriptLastCheck = 0;

var scriptLastRemoteVersion = parseInt(GM_getValue("scriptLastRemoteVersion", scriptVersion.toString()), 10);
if (isNaN(scriptLastRemoteVersion)) scriptLastRemoteVersion = scriptVersion;

//For plugins (mplayer,vlc,totem,xine etc.)
var width = 640;
var height = 480;
var headers = {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                'Accept': 'plain/html',}

//var useFlash = true;
makeMenuToggle("useFlash", false, "Use flash", "Don't use flash", "MYouporn");

//var fPlayer = "http://static.youporn.com/player/etologyplayer4-tmp.swf";
//var swfobj = "http://js.youporn.com/r/20080512.1.1/script/swfobject.js";

var mime = "application/x-quicktimeplayer";
//"application/x-totem-plugin";
	//application/x-quicktimeplayer - usually mplayer acts on this ( quicktime on mac? :P ), ymmv
	//video/mpeg - vlc takes over if both mplayer and vlc are installed, ymmv
	//video/flv - xine/totem plugin, ymmv

if (navigator.appVersion.indexOf("Win")!=-1) //Win user may be better off with Flash
	useFlash = true;
else
	useFlash = !detectPlugin(null,mime)||useFlash;

//GM_log("useFlash:"+ useFlash);

(function(){

var match, a;

var links = document.evaluate(
    "//a[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < links.snapshotLength; i++) {
    a = links.snapshotItem(i);
    
    if ((match = a.href.match(/(\d+)/))){
 	  //a.href = '#Click';
 	  a.removeAttribute('target');
	  a.addEventListener('click', clickVideo, false);
   }
}

putCSS();
//putJS();

scriptCheckVersion();
 
})();


function clickVideo(ev){
    
    var url = null, node;
    
    //usually ev.target is the image
    if(ev.target.tagName=="IMG" && ev.target.parentNode.tagName=="A")
        node = ev.target.parentNode;    
    else if(ev.target.tagName=="A")
        return; //Go to page instead
        //node = ev.target;

    if(node)
        url = node.href;
    
    if(url){
        getVideo(url);
        ev.preventDefault();
    }
}


function getVideo(url){
	var vid=null;
	
	showOverlay();
	
    if(document.domain.match(/redtube\.com/)){
        
        vid = url.match(/(\d+)/);
	    //if(vid && !useFlash) //non-flash version is broken
	    //    showVideo(RedtubeUrl(vid[1]),'Video '+ vid[1]);
        //else
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                headers: headers,
                onload: parseRedTube
            });
        return;
    }
        
    if(document.domain.match(/youporn\.com/)){
        
        vid = url.match(/(\d+)/);
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://youporn.com/watch/' + vid[1] +"?user_choice=Enter",
            headers: headers,
            onload: parseYouPorn
        });
        return;
    }

    if(document.domain.match(/tube8\.com/)){
        
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            headers: headers,
            onload: parseTube8
        });
        return;
    }	
    
    if(document.domain.match(/pornhub\.com/)){
        
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            headers: headers,
            onload: parsePornhub
        });
        return;
    }
}

function captureSWFObj(html, test){
    var rfp = new RegExp("<script.*?>((?:.*?[\r\n]*?)*?)<\/script>", "g");
    var fpcode = null;
    while((fpcode=rfp.exec(html))!=null){
        var newobj = fpcode[1].match(test);
        if(newobj)
            return fpcode[1];
    }
}

function parseYouPorn(responseDetails) {
    var murl = null,mt = null, fpcode = null, swfobj = null;

    if(responseDetails.status==200){
        if(responseDetails.responseText){
            //murl = responseDetails.responseText.match(/player_url\s*=\s*'([^']+)/i);
            murl = responseDetails.responseText.match( /href.*="(http:\/\/download[^"]+)/);
            mt = responseDetails.responseText.match(/<h1>(.*\s*)*?<\/h1>/im); //okkkey
            swfobj = responseDetails.responseText.match(/<script.*?swfobj.*?>/i);
            swfobj = /src="([^"]+)/.exec(swfobj.toString())[1];
            fpcode = captureSWFObj(responseDetails.responseText, /new\s*SWFObject/);
            
        }
    }

    if(murl && murl[1].match(/xml/))
        getXML(murl[1], function(dom){ showVideo( dom.getElementsByTagName('location')[0].textContent,(mt?mt[1]:null), fpcode, [swfobj]); } );
    else
        showVideo((murl?murl[1]:null),(mt?mt[1]:null), 'player', fpcode, [swfobj]);
}

function parseRedTube(responseDetails) {
    var id = null,mt = null, fpcode = null, swfobj = null;
    
    if(responseDetails.status==200){
        if(responseDetails.responseText){
            id = responseDetails.responseText.match(/file=(\d+).flv/);
            mt = responseDetails.responseText.match(/videotitle.>(.*?)<\//i);
            //HACK pretty much too :P
            //swfobj = responseDetails.responseText.match(/src=.*?(\/js\/swfobj.*?)\">/i)[1];
            //swfobj = /src='(.*swfobj.*[^']+)/.exec(swfobj.toString())[1];
            fpcode = captureSWFObj(responseDetails.responseText, /new\s*SWFObject/);
            fpcode += "so.write('player');"; //HACK
        }
    }
    
    showVideo((id?RedtubeUrl(id[1]):null),(mt?mt[1]:null), 'redtube_flv_player', fpcode, ['/js/swfobject.js', '/js/swfobject_modified.js']);
}

function parseTube8(responseDetails) {
    var murl = null,mt = null, fpcode = null,swfobj = null;

    if(responseDetails.status==200){
        if(responseDetails.responseText){
            murl = responseDetails.responseText.match(/videourl="([^"]+)/i);
            mt = responseDetails.responseText.match(/<h1.*?>(.*)<\/h1>/i);
            //swfobj = responseDetails.responseText.match(/<script.*?flashvars.*?>/i);
            //swfobj = /src="([^"]+)/.exec(swfobj.toString())[1];
            fpcode = captureSWFObj(responseDetails.responseText, /var\sflashvars/);
            //fpcode = fpcode.replace(/"flvplayer"/,"\"player\"");
        }
    }
    
    showVideo((murl?murl[1]:null),(mt?mt[1]:null), 'flvplayer', fpcode); //, swfobj, null);
}

function parsePornhub(responseDetails) {
    var mt = null, fpcode = null, swfobj = null;
    
    if(responseDetails.status==200){
        if(responseDetails.responseText){
            mt = responseDetails.responseText.match(/title>(.*?)<\//i);
            fpcode = captureSWFObj(responseDetails.responseText, /new\s*SWFObject/);
        }
    }
    showVideo(null,(mt?mt[1]:null), 'player', fpcode, ['http://cdn-www.pornhub.com/js/phub.js']);
}

function getXML(url,cb){
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/xml',
        },
        onload: function(responseDetails){
          if(responseDetails.status==200){
            if(responseDetails.responseText){
                var parser = new DOMParser();
                var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
                cb(dom);
            }
          }
		}
	});
}

//http://bv9q.redtube.com/467f9bca32b1989277b48582944f325afa3374/0000024/G9BCMX0LA.flv/1e689b91e20524ad842f6b51e64d16ae/4b0970b0?start=0
//http://bv9q.redtube.com/467f9bca32b1989277b48582944f325afa3374/0000002/85AGQ81TL.flv/1bb21372b8c74ca69b24c7178875b22f/4b097193?start=0
//id=24574&width=584&height=458&vname=26657d5ff9020d2abefe558796b99584&hash_flv=/cc11467b9e3b05a16a5c0df60d3f7c5b/4b09706f&secured=true&hash_mp4=/dc9a63b7c54c0cdedaa0099fec2cb7bf/4b09706f&secured=true
function RedtubeUrl(vid)
{
    //if (host.match(/redtube\./i) !=null)
    {
      var p_file = vid;
      if(p_file == "" || p_file == "video.flv")
      {
        p_file = "1";
      }
      
      var v_fileFloat = "" + Math.floor(p_file / 1000.0); // 477 --> 0.477 --> 0
      var v_fileLength = p_file.length; // --> 3
      for (var a = 1; a <= 7 - v_fileLength; ++a)
      {
        p_file = "0" + p_file; // 477 --> 0000477
      }
      v_fileLength = v_fileFloat.length; // --> 1
      for (var a = 1; a <= 7 - v_fileLength; ++a)
      {
        v_fileFloat = "0" + v_fileFloat; // 0 --> 0000000
      }

      var map = new Array("R", "1", "5", "3", "4", "2", "O", "7", "K", "9", "H", "B", "C", "D", "X", "F", "G", "A", "I", "J", "8", "L", "M", "Z", "6", "P", "Q", "0", "S", "T", "U", "V", "W", "E", "Y", "N");
      var mapping = "";
      var myInt = 0;
      for (var a = 0; a <= 6; ++a)
      {
        myInt = myInt + parseInt(p_file.charAt(a)) * (a + 1);
              /* 0000477
              0 --> 0*1 = 0
              0 --> 0*2 = 0
              0 --> 0*3 = 0
              0 --> 0*4 = 0
              4 --> 4*5 = 20
              7 --> 7*6 = 42
              7 --> 7*7 = 49
              myInt = 20+42+49 = 62+49 = 100+2+9=111
              */
      }
      
      var myChar = "" + myInt; // --> "111"
      myInt = 0;
      for (var a = 0; a < myChar.length; ++a) // 3 times
      {
        myInt = myInt + parseInt(myChar.charAt(a));
        //111 --> myInt = 3
      }
      
      var newChar;
      if (myInt >= 10)
      {
        newChar = "" + myInt;
      }
      else
      {
        newChar = "0" + myInt; // newChar = "03"
      }
      
      // p_file = "0000477"
      // myInt = 3
      // newChar = "03"
      // char codes: 0=48 1=49 2=50 3=51 4=52 5=52 6=54 7=55 8=56 9=57
      mapping = mapping + map[p_file.charCodeAt(3) - 48 + myInt + 3]; // char=0 map[48-48+3+3]=map[6] = "O"
      mapping = mapping + newChar.charAt(1);                          // "3"
      mapping = mapping + map[p_file.charCodeAt(0) - 48 + myInt + 2]; // char=0 map[48-48+3+2]=map[5] = "2"
      mapping = mapping + map[p_file.charCodeAt(2) - 48 + myInt + 1]; // char=0 map[48-48+3+1]=map[4] = "4"
      mapping = mapping + map[p_file.charCodeAt(5) - 48 + myInt + 6]; // char=7 map[55-48+3+6]=map[16] = "G"
      mapping = mapping + map[p_file.charCodeAt(1) - 48 + myInt + 5]; // char=0 map[48-48+3+5]=map[8] = "K"
      mapping = mapping + newChar.charAt(0);                          // "0"
      mapping = mapping + map[p_file.charCodeAt(4) - 48 + myInt + 7]; // char=4 map[4+3+7]=map[14] = "X"
      mapping = mapping + map[p_file.charCodeAt(6) - 48 + myInt + 4]; // char=7 map[7+3+4]=map[14] = "X"
      // --> mapping = "O324GK0XX"
      
      return "http://dl.redtube.com/_videos_t4vn23s9jc5498tgj49icfj4678/" + v_fileFloat + "/" + mapping + ".flv";
      // --> http://dl.redtube.com/_videos_t4vn23s9jc5498tgj49icfj4678/0000000/O324GK0XX.flv
    }
}



//--------------------------------------------------------------------------//

/*
 Layout:
 <div id=overlay-alpha />
 <div id=overlay>
 	<div id=overlay-player> //center it all
 		<div id=player/>
 				<embed id=player-embed/> or flash object
 		<div id=linkdiv><a id=video-link/></div>
 	</div>
 </div>
*/

//Click-anywhere-else-to-close-the-overlay mode is kinda broken sometimes.
function hideListener(evt){
    if(evt.target.parentNode == $('linkdiv') || evt.target.parentNode.parentNode == $('linkdiv')
        || evt.target.parentNode == $('player')){
    //if(evt.target!=$('overlay-player') && evt.target!=$('mypplayer')){
    //if(evt.target.id!='overlay-player' && evt.target.id!='mypplayer'){
      return false;
    }
    evt.preventDefault();
    return hideOverlay();
}

function hideOverlay(){
    //alert(evt.target.parentNode.id);
    //Removes the whole overlay, makes scrolling  etc. on page  fast again
    //document.body.removeChild($('overlay'));
    //document.body.removeChild($('overlay-alpha'));
    
    $('overlay').style.visibility = "hidden";
	$('overlay-alpha').style.visibility = "hidden";
    while($('mypplayer').childNodes.length>0)
        $('mypplayer').removeChild($('mypplayer').childNodes[0]);
    
    return true;
}

function showOverlay(){

	var overlay = $('overlay');

	if(!overlay)
	{
		var overlay= document.createElement('div');
		overlay.id="overlay";
        var overlaya= document.createElement('div');
		overlaya.id="overlay-alpha";
		
		//Clicks on overlay hide it again
		overlay.addEventListener('click',hideListener,false);
        //overlaya.addEventListener('click',hideoverlay,false);
        
		var ovplayer =  document.createElement('div');
		ovplayer.id ="overlay-player";
		//Kinda ugly
        var closebtn =  document.createElement('input');
        closebtn.type = "button";
		closebtn.id = "button-close";
        closebtn.value = "Close";
        closebtn.addEventListener('click', function(ev){ hideOverlay(); }, false);
        
		//Holds flash or <embed/>
		var flashplayer = document.createElement("div");
		flashplayer.id="mypplayer";
		
		//flashplayer.innerHTML="<img src='"+throbber+"'>";
		
		var linkdiv = document.createElement("div");
		linkdiv.id="linkdiv";
		linkdiv.innerHTML="<a href='#' id='video-link' \
			 style='color: #EE577C;text-decoration:none;font-weight:bold' \
			 target='_new'>Download video.</a>" + 
			 (scriptNewAvail? "&nbsp;<a title='New update available: " +scriptNewAvail+ "' href='"+ scriptURL +"'><img src='" + updateIcon + "'></a>" : "") + "&nbsp;";
		
		ovplayer.appendChild(flashplayer);
        linkdiv.appendChild(closebtn);
		ovplayer.appendChild(linkdiv);
        
		overlay.appendChild(ovplayer);
		document.body.insertBefore(overlay,document.body.firstChild);
        document.body.insertBefore(overlaya,document.body.firstChild);
	}
    
	$('linkdiv').style.display="none";
    $('mypplayer').innerHTML="<img src='"+throbber+"'>";
    $('overlay-alpha').style.visibility = "visible";
	$('overlay').style.visibility = "visible";
}

function showVideo(url, title, playerid, fpcode, jsarray, jscode){

    var player = $('mypplayer');

    if((!useFlash && !url) || (useFlash && (!fpcode /*|| !swfobjsrc*/))){
        player.innerHTML="<font color='#EE678C'>Sorry, could not load video!</font>";
        return;
    }

    if(!useFlash){

        player.innerHTML=(title?'<h1 style="color:#EE678C">'+title+'</h1>':'') + 
            '<embed id="player-embed" src="' + url + '" width="' + width + '" height="' +
            height + '" type="'+mime+'" autoplay="true" loop="true"></embed>';

    }else{
        
        player.innerHTML="<h1 style='color:#EE678C'>"+title+"</h1><div id='" + playerid + "'/>"; 
        
        if(!jsarray){
            addScriptSrc("http://www.google.com/jsapi");
            var google = document.createElement("script");
            google.appendChild(document.createTextNode("google.load(\"swfobject\", \"2.2\");"));
            player.appendChild(google);
        } else {
            jsarray.forEach(function(src){addScriptSrc(src);});
        }
        
        if(jscode){
            var jsnode = document.createElement("script");
            jsnode.appendChild(document.createTextNode(jscode));
            player.appendChild(jsnode);
        }
        
        var jsnode = document.createElement("script");
        fpcode = fpcode.replace(/\.write\(.*?\);/,".write('player');");
        jsnode.appendChild(document.createTextNode(fpcode));
        
        //for youporn compatibility, keep flash div id as 'player' because of the
        // 'you need flash' message.
        
        player.appendChild(jsnode);
    }
    
    $('linkdiv').style.display="block";
    $('video-link').href = url;
    
}

function $(id){
	return document.getElementById(id);
}

//As  quite like Firefox about:plugins has it
function detectPlugin(name,mime){
	//mimetype.type 
	//mimetype.description 
	//mimetype.suffixes 
	if(name){
		for( var i = 0; i < navigator.plugins.length;i++){
			if(navigator.plugins[i].name.indexOf(name)!=-1)
				return true;
		}
	}
	
    if(mime){
		for( var i = 0; i < navigator.plugins.length;i++){
			for( var j = 0 ; j < navigator.plugins[i].length; j++){
				if(navigator.plugins[i][j].type.indexOf(mime)!=-1 && 
				navigator.plugins[i][j].enabledPlugin.filename == navigator.plugins[i].filename )
					return true;
			}
		}
	}
	return false;
}

function putCSS(){

	var css = "#overlay,#overlay-alpha { visibility: hidden; display: table; \
        position: fixed; left: 0px; top: 0px; width:100%; height:100%;\
        text-align:center; z-index: 1000; /*background: black; opacity: 1;*/} \
        #overlay-alpha { z-index: 999; background: black;display:block; opacity: 0.9;} \
        #overlay-player {width:690px;margin-left:auto; margin:auto; display:table-cell; vertical-align: middle} \
        #mypplayer { margin: 0 auto;}\
        #button-close { background:#000; color:#EE678C; border:1px solid #EE678C;}";

	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	} else if (typeof addStyle != "undefined") {
		addStyle(css);
	} else {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 
		}
	}
}

function putJS(){
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("script");
		node.src = swfobj;
		heads[0].appendChild(node); 
	}
}

function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
  // Load current value into variable
  window[key] = GM_getValue(key, defaultValue);
  // Add menu toggle
  GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() {
    GM_setValue(key, !window[key]);
    location.reload();
  });
}

function scriptCheckVersion() {
    
    // Checks for script updates
    if (Date.now() - scriptLastCheck >= 86400000 ) { // 1 day
        // At least a day has passed since the last check. Sends a request to check for a new script version
        GM_setValue("scriptLastCheck", Date.now().toString());
    }
    else {
        // If a new version was previously detected the notice will be shown to the user
        // This is to prevent that the notice will only be shown once a day (when an update check is scheduled)
        if (scriptLastRemoteVersion > scriptVersion) {
            scriptNewAvail = fmtVer(scriptLastRemoteVersion);
        }
        return;
    }

	GM_xmlhttpRequest({
		method: "GET",
		url: scriptUpdateUrl + "?" + new Date().getTime() ,
		headers: {'Cache-Control': 'no-cache'},
		onload: function(evt) {
			if ((evt.readyState == 4) && (evt.status == 200)) {
				var match = evt.responseText.match(/@version\s*(\d+)\.(\d+)\.(\d+)/);
                if(match){
                    var remoteVersion = parseInt(match[1]) * 1000 + parseInt(match[2])*10 + parseInt(match[3]);
                    GM_setValue("scriptLastRemoteVersion",remoteVersion.toString());
                    if(scriptVersion < remoteVersion )
                        scriptNewAvail = match[1]+"."+match[2]+"."+match[3];//fmtVer(remoteVersion);
                }
			}
		}
	});
}

function fmtVer(i){
    return  Math.floor(i/1000) + "." + (i % 1000)/10; //XXX --> x.y.z ; EN locale and alike only?
}

function addScriptSrc(src) {
    var head, script;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.setAttribute('src', src);
    head.appendChild(script);
}

var updateIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAPBAMAAAAbqIIhAAAAAXNSR0IArs4c6QAAAC1QTFRFDAAJAAEAEQAQGQAYJgAlMAAuRgBGcQBxkQGSpgCkvQC80ADS3wDi5wDl%2FQT%2FS0NubQAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH2AgeEQgb7VfVLAAAAERJREFUCNdjYGBgEBQUZIAAuXcPCbMYBcEsQQEgJQBkMQI5QCwHQgIgVUAWWCXjOxAQgGh9BzWGESaEbDIjTAjoGBABAAbkJtqrdrnjAAAAAElFTkSuQmCC";

var throbber = 
"data:image/gif;base64,"+
"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"+
"RBFFEKEDyjcHLfTQRBdt9NFIJ6300kw37XQgADs=";
