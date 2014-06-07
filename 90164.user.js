// ==UserScript==
// @name          Kaskus Fix-ObfuscatorII
// @namespace     http://userscripts.org/scripts/show/90164
// @description   De-obfuscates words 'censored' by kaskus + antibetmen
// @author        hermawanadhis, idx
// @version       0.7.4.3
// @include       *.kaskus.co.id/thread/*
// @include       *.kaskus.co.id/lastpost/*
// @include       *.kaskus.co.id/post/*
// @include       *.kaskus.co.id/show_post/*
// @include       *.kaskus.co.id/edit_post/*
// @include       *.kaskus.co.id/showthread.php?*
// @include       *.kaskus.co.id/showpost.php?*
// @include       *.kaskus.co.id/editpost.php?*
// @include       *.kaskus.co.id/newthread.php?*
// @include       *.kaskus.co.id/blog.php?*
// @include       *.kaskus.co.id/group.php?*
// ==/UserScript==
/*
Kaskus Fix-ObfuscatorII 
Dibuat oleh Pandu E Poluan {http://userscripts.org/users/71414/}
Penghargaan kepada: Chaox, D3v1love, hermawanadhis (from 0.6.x), idx (http://code.google.com/p/dev-kaskus-quick-reply/), Piluze
Tempat diskusi    : daftar kata kata yang disensor oleh Kaskus [Cekidot Gan!!!] - http://www.kaskus.co.id/thread/000000000000000004492393/daftar-kata-kata-yang-disensor-oleh-kaskus-cekidot-gan/ 
                  :: All About Mozilla Firefox (Add-ons, Scripts, Fans Club) :: - http://www.kaskus.co.id/thread/000000000000000016414069/all-about-mozilla-firefox-add-ons-scripts-fans-club--part-3/

Skrip ini bertujuan mengembalikan semua kata-kata yang disensor pada situs KasKus.co.id (misal: "rapid*share") menjadi sediakala.
This script replaces all obfuscated words in kaskus (e.g., "rapid*share") and replaces it with the unobfuscated word.
Changelog:
------------
0.7.4.3
- fix evaluate link contains https
- pre-check text optimized
0.7.4.2
- menambah dukungan old.kaskus.co.id, archive.kaskus.co.id, kaskus.co.id (baru)
- mengurangi dukungan m.kaskus.co.id 
0.7.4
- (rollback from r338) redefine include domain
- fix defect parser link inside [/code]
0.7.3
- replace include domain .co.id
0.7.2
- tambahan darurat dukungan kaskus beta 
0.7.13
- linkify ftp or with (s) --inline-conditional :D
0.7.12
- full-linkify on singlepost
- Fix fixme for unicode href, (eg. wikiedia or Asian web)
0.7.11
- wildcard character(*) in obfuscated links will be globally removed; entire for obfuscated with random shift, i guess;
- (as above) link replacements list should no longer needed 
+ editpost.php?*
+ newthread.php?*
- missed regular words replacements in links
- avoid strip neutral wildcard
0.7.10
* "file\\*serve":"fileserve",
* "file\\*sonic":"filesonic",
* "hot\\*file":"hotfile",
* "indo\\*web\\*ster":"indowebster",
* "media\\*fire":"mediafire",
* "media\\*fire":"mediafire",
* "wup\\*load":"wupload",
- "detik..com": "detik.com",
- "detikhot..com": "detikhot.com",
- "detikinet..com": "detikinet.com",
- "detiknews..com": "detiknews.com",
- "maknyos..com":"maknyos.com",
0.7.9
+ maknyos..com, maknyos.com
0.7.8.1
+ indo*web*ster.., indowebster
0.7.8
+ media*fire..com, mediafire.com
+ file*serve..com, fileserve.com
+ file*sonic..com, filesonic.com
+ hot*file..com, hotfile.com
+ indo*web*ster...com, indowebster.com
+ wup*load..com, wupload.com
0.7.7
+ fileserve..com,fileserve.com
+ filesonic..com,filesonic.com
+ hotfile..com,hotfile.com
+ indowebster...com,indowebster.com
+ wupload..com,wupload.com 
0.7.6
+ mediafire..com,mediafire.com
0.7.5
- roll back update from v0.7.2
- full long url linkify
- debfuscate link with (\.{2,}com)
0.7.2
- fix unescaped href required for GC
0.7.1
- clear up debug line
- add // @include       http://www.kaskus.us/group.php?* 
0.7 (idx)
- add // @include       http://www.kaskus.us/blog.php?* 
- enhance+antibetmen
- removed "Rossi"
0.6.7.1
- clearing up script
0.6.7
Rewrites dragon*adopters to dragonadopters
0.6.6.2
- use http://www.kaskus.us/showthread.php?* address
- removed "** SENSOR **" 
0.6.5
- Rewrites tiny*url to tinyurl
0.6.4
- Rewrites file*den to fileden
0.6.3
- add domain wap.kaskus.us, opera.kaskus.us, blackberry.kaskus.us
0.6.2
- add domain m.kaskus.us
0.6.1
- add cite sign
- fix autoupdate
0.6
- prefered using domain kaskus.co.id than IP
- added from http://www.kaskus.co.id/showthread.php?t=4492393
v0.5   : Rewrites "*Forbidden*" to ".co.cc"
       : Rewrites "pocongk" to "pocong"
v0.4.x : Rewrites "detiknews..com" to "detiknews.com"
       : Rewrites "4*shared" to "4shared"
v0.4.1 : Added more IP's
v0.4   : Rewrites "detik..com" to "detik.com" (i.e., removes additional period)
       : Rewrites "kimpoi" to "kawin"
v0.3.1 : Added more IP's
v0.3   : Rewrites "zid*du" to "ziddu"
v0.2   : Rewrites also obfuscated URLs
         Rewrites "krack" to "crack"
v0.1.1 : Added 119.110.77.4 to be included
v0.1   : First release
*/

(function () {
    
    var gvar = function(){};
    gvar.__DEBUG__ = 0;
    
    var replacements, lreplacements, regex, lregex, thenodes, node, s;

    // You can customize the script by adding new pairs of words.
    // First, let's build the "obfuscated":"de-obfuscated" words list
    // To prevent inadvertently using some regexp control modifiers,
    // prepend symbols (i.e. non-alphanumerics) with two backslashes ( i.e. \\ )
    replacements = {
        "kimpoi": "kawin",
        "krack": "crack",
        "paypai": "paypal",
        "pocongk+": "pocong",
        "indo\\*web\\*ster\\.\\.":"indowebster",
        "\\*Forbidden\\*": ".co.cc",
    };
    
    // reusable func to perform & manipulating in wildcard links or data value 
    var fixme = function(s){
        for (key in replacements) 
            s = s.replace(regex[key], replacements[key]);
            
        if( /\w{1}\*\w{1}/.test(s) )
            s = s.replace(/(\w{1})\*(\w{1})/g, function(S,$1,$2){return (!$1 || !$2 ? S : ''+$1+$2)} );
            
        if( /\w{3,}\.{2,}(?:com|net|in|to|ly)\b/i.test(s) )        
            s = s.replace(/\.{2,}(com|net|in|to|ly)\b/g, '.$1' );

        return s;
    };
    
    regex = {};
    for (key in replacements) 
        regex[key] = new RegExp(key, 'gi');
        
        
    // Now, retrieve the text nodes. default: //body//text()
    thenodes = document.evaluate('//body//text()', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
    // Perform a replacement over all the nodes
    for (var i = 0; i < thenodes.snapshotLength; i++) {
        node = thenodes.snapshotItem(i);
        s = node.data;
        
        if(!(s && s.length>5 && /[\w\.]/i.test(s)
            && ['SCRIPT','STYLE'].indexOf(String(node.parentNode.nodeName)) === -1
        )) continue; // pre-check

        s = fixme( s );
        node.data = s;
    }

    // Now, retrieve the A nodes. default: //a
    // Optimized, we just need all this specified href links
    thenodes = document.evaluate('//a[contains(@href,"\:\/\/") and not(contains(@href,"\.kaskus\.co\.id")) and not(contains(@href,"\.kaskusnetworks\.com\/"))]',
               document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    // Finally, perform a replacement over all A nodes
    for (var i = 0; i < thenodes.snapshotLength; i++) {
        node = thenodes.snapshotItem(i);

        // Here's the key! We must replace the "href" instead of the "data"
        s = fixme( decodeURI( node.href ) );

        // fix defect parser on last link inside code
        /\[\/CODE\]$/.test( s ) && ( s = s.replace(/\[\/CODE\]$/, '') );
        node.href = s;
    }
    
    
    var isBatman = function(inner){
        return ( inner.match(/<div\s*class="spoiler">/i));
    }, 
    newHref = function(href){
        var a = createEl('span', {'rel':href, 'title' : 'Goto ' + href, 'class':'smallfont','style':'color:red; cursor:pointer; margin-left:10px;', 'target':'_blank'}, 'Hidden Link &gt;&gt; '+href );
        a.addEventListener('click', function(e){
            e=e.target||e; e.style.color='black'
            var newWindow = window.open(e.getAttribute('rel'), '_blank');
            newWindow.focus(); return false;
        }, true);
        return a; 
    };
    
    var pnode, pnodes;
    // perform anti-batman @container id
    pnodes = document.evaluate("//*[@class='entry']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    if(pnodes.snapshotLength > 0) for (var i = 0; i < pnodes.snapshotLength; i++) {
        pnode = pnodes.snapshotItem(i);        
        thenodes = document.evaluate(".//a", pnode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        if(thenodes.snapshotLength >0 ) for (var j = 0; j < thenodes.snapshotLength; j++) {
            node = thenodes.snapshotItem(j);

            if( isBatman(node.innerHTML) ){
               
                 var inps, inerDiv = node.getElementsByTagName('div');
                 if(inerDiv){
                    inps = inerDiv[0].getElementsByTagName('input');
                    if(inps.length)
                        inps[0].parentNode.appendChild( newHref(node.href) );                
                }
                node.removeAttribute('href');
            }else if(/^(?:ftps?|https?)\:\/\/.+(\.\.\.).+/.test(node.innerHTML)){ // full linkify
               node.innerHTML = decodeURI(node.href);
            }
        }
    }
    //

    function createEl(type, attrArray, html) {
        var node = document.createElement(type);
        for (var attr in attrArray)
            if (attrArray.hasOwnProperty(attr)) node.setAttribute(attr, attrArray[attr]);
        if (html) node.innerHTML = html;
        return node;
    }
    //
    
// ----my ge-debug--------
function show_alert(msg, force) {
  if(arguments.callee.counter) { arguments.callee.counter++; } else { arguments.callee.counter=1; }
  GM_log('('+arguments.callee.counter+') '+msg);
  if(force==0) { return; }
}
function clog(msg) {
  if(!gvar.__DEBUG__) return;
  show_alert(msg);
}

    
})();