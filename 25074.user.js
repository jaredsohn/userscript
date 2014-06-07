// ==UserScript==
// @name           dAmnTS
// @namespace      miksago
// @description    Adds timestamps to dAmn (doesn't use cookies)
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==

/********************************************************************
*********************************************************************
 *
 *
 *  Le préavis (The Notice)
 *
 *      This script is based on the timestamp
 *      part from dAx, which, in turn uses
 *      parts from timestamps (originally created by `doofsmack).
 *
 *      My work is to make timestamps better for everyone, reducing
 *      the need to constantly reset options after clearing cookies.
 *      Original work copyright and rights reserved to original
 *      authors.
 *
 *      Note: original work may have been modified.
 *
 *
*********************************************************************
*********************************************************************
 *
 *
 *  Last Update: 1am, Sunday 13th April, 2008.
 *
 *
*********************************************************************
********************************************************************/


function toggleVal(name){
    var value = GM_getValue(name, true);
    if(value){
        GM_setValue(name, false);
        return false;
    }else{
        GM_setValue(name, true);
        return true;
    }
}
var ts = {
    use: GM_getValue("useTS", true),
    am: GM_getValue("useAM", true),

    toggler: function(obj){
        switch(obj){
            case 'am':
                this.am = toggleVal('useAM');
                break;
            case 'use':
                this.use = toggleVal('useTS');
                break;
        }
    },
};

with(unsafeWindow){

    function joinIfNotJoined(room){
        for(var e in dAmnChats){
            if(e.toLowerCase() == room.toLowerCase()){
                dAmnChatTabs_activate(e,true);
                if(dAmnChats[e].connected){
                    return;
                }
                dAmn_Join(room);
            }
        }
    }

    function quickJoinLinks(node){
        // replace algorithm style borrowed from the Linkify user script by Aaron Boodman
        // http://ftp.iasi.roedu.net/pub/mirrors/mozdev.org/greasemonkey/linkify.user.js
        var re=/\B#([a-zA-Z][a-zA-Z0-9]+)\b/g;
        try {
            var candidates = document.evaluate(".//a[starts-with(@href,'http://chat.deviantart.com/chat/')]", node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++){
                if(cand.href.substring(cand.href.lastIndexOf('/')+1)!=""){
                    channel = cand.href.substring(cand.href.lastIndexOf('/')+1);

                    cand.addEventListener("click", function(e){
                        if(!(e.shiftKey && e.ctrlKey)){
                            joinIfNotJoined("chat:"+channel);
                            e.preventDefault();
                        }
                    }, false);

                    if(!cand.title||cand.title==cand.href){
                        cand.title="";
                    } else{
                        cand.title += " | join #" +channel;
                    }
                }
            }
            candidates = document.evaluate(".//text()[contains(.,'#') and not(ancestor::a) and not(ancestor::code) and not(ancestor::pre)]", node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++){
                if(re.test(cand.nodeValue)){
                    var old = cand.nodeValue;
                    var newnode = document.createElement("span");

                    cand.parentNode.replaceChild(newnode,cand);
                    re.lastIndex = 0;

                    for (var match = null, lastLastIndex = 0; (match = re.exec(old)); ) {
                        newnode.appendChild(document.createTextNode(old.substring(lastLastIndex, match.index)));

                        var channel = match[1];

                        var a = document.createElement("a");
                        a.addEventListener("click", function(e){
                            if(!(e.shiftKey && e.ctrlKey)){
                                joinIfNotJoined("chat:"+channel);
                                e.preventDefault();
                            }
                        }, false);

                        a.title = "join #"+channel;
                        a.style = "cursor: pointer;";
                        a.appendChild(document.createTextNode(match[0]));
                        newnode.appendChild(a);
                        lastLastIndex = re.lastIndex;
                    }
                    newnode.appendChild(document.createTextNode(old.substring(lastLastIndex)));
                }
            }
        } catch(e) {

        }
    }

    dAmnChanChat.prototype.makeText=function( style, from, text, hilite ){
        var o = dAmn_MakeDiv( "msg " + style );
        o.style.display='none';
        this.chat_el.appendChild(o);

        var i = dAmn_AddDiv( o , "inner" );

        if(ts.use){
            var d = new Date();
            var h = d.getHours();
            var m = d.getMinutes();
            var s = d.getSeconds();

            var oh = h;
            h = (ts.am ? h%12 : h );

            if(ts.am && h==0)
                h=12;
            if(h<10)
                h = '0' + h;
            if(m<10)
                m = '0' + m;
            if(s<10)
                s = '0' + s;

            var t = dAmn_AddSpan( i, "timestamp", h + ':' + m + ':' + s + (ts.am ? "&nbsp;"+ ( oh>12 ? "pm" : "am" ) : "") );
            t.style.marginTop = '2px';
            t.style.marginRight = '4px';
            t.style.marginLeft = '2px';

            t.style.color = '#88938d';
            t.style.fontWeight = 'bold';
            t.style.fontSize = '0.9em';
            t.style.fontStyle = 'normal';
        }

        var bkColor;
        if(IE)
            bkColor = GetBkColor( i );
        var f = dAmn_AddSpan(i,'from' );
        dAmn_AddSpan(f,null, '' + from );
        if( text ){
            var t = dAmn_AddSpan(i,'text');
            tt = dAmn_AddSpan(t,null, ''+this.FormatMsg(text,bkColor) );

            //quickJoinLinks(tt);
        }
        this.addDiv( o, true, hilite );
    }
}

try{
    GM_registerMenuCommand("Use Timestamps", ts.toggler("ts"),null,"");
    GM_registerMenuCommand("Use 24hour Timestamps",ts.toggler("am"),null,"");
} catch(e){
    GM_log(e);
}
