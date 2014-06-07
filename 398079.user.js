// ==UserScript==
// @name       color dice
// @require    http://code.jquery.com/jquery-latest.min.js
// @match      https://doge-dice.com/*
// @copyright  2014+, 1@wa.vg
// @version    2.6
// ==/UserScript==
// 17AKDJCyzrRMERYxpgsfCcALrvKh4XmSoT for btc donations
// DDdDDdnka1qobRnqBXU1PzRvcw9k9PStxR for doge donations
script = document.createElement("script"), 
script.innerHTML = add_chat;
document.body.appendChild(script);
function add_chat(date, txt, look) {
        if (settings["mutechat"]) return;
        txt = quote_html(txt).replace(/(xeb)/gi, "<font color='#7777FF'>$1</font>").replace(/(ShiX)/gi, "<font color='#7777FF'>$1</font>");
    	txt = txt.replace(/^\((.*?)\) &lt;@(.*?)&gt;/g, "\($1\) &lt;@<font color='#0000FF'>$2</font>&gt;").replace(/^\((88818|88889|13)\) &lt;(.*?)&gt;/g, "\($1\) &lt;<font color='#FF00FF'>$2</font>&gt;");
        txt = txt.replace(/([^0-9a-z#])((?:betid|roll):? |#)([1-9][0-9]{4,8})\b/gi,'$1<a target="_blank" href="/roll/$3">$2$3</a>').replace(/(https:\/\/doge-dice[.]com\/roll\/)([1-9][0-9]{0,8})/gi,' <a target="_blank" href="/roll/$2">$2</a> ').replace(/dicen[o0]w/gi,"dice-now").replace(/letsdice/gi,"lets-dice").replace(/grindabit/gi,"spamalot [lol jk]").replace(/(http:\/\/just-dice[.]blogspot[.](?:ca|com)\/[0-9]+\/[0-9]+\/([a-z0-9-]+)[.]html)/gi,'[<a target="_blank" href="$1">$2</a>]').replace(/(&lt;.*&gt;.*?)\b(butthurt)\b/i,'$1<a target="_blank" href="https://doge-dice.com/form.jpg">$2</a>').replace(/(dogechain[.]info\/)(?:[a-w]{2}|zh-cn)\//g,"$1").replace(/([^a-zA-Z0-9=?/])(?:(?:https?:\/\/)?dogechain[.]info\/tx(?:-index)?\/)?([0-9a-f]{8})([0-9a-f]{56})\b/g,'$1[<a target="_blank" href="http://dogechain.info/tx/$2$3">$2</a>]').replace(/([^a-zA-Z0-9=?/])(?:(?:https?:\/\/)?blockchain[.]info\/address\/)?(1[1-9A-HJ-NP-Za-km-z]{7})([1-9A-HJ-NP-Za-km-z]{24,26})\b/g,'$1[<a target="_blank" href="http://blockchain.info/address/$2$3">$2</a>]').replace(/([^a-zA-Z0-9=?/])(?:(?:https?:\/\/)?dogechain[.]info\/address\/)?(D[1-9A-HJ-NP-Za-km-z]{7})([1-9A-HJ-NP-Za-km-z]{24,26})\b/g,'$1[<a target="_blank" href="http://dogechain.info/address/$2$3">such $2</a>]').replace(/\b(https?:\/\/i[.]imgur[.]com\/[0-9a-z]{5,7}[.](?:jpe?g|png|gif)(?:[?][0-9]+)?)\b/gi,'[<a target="_blank" href="$1">img</a>]').replace(/\b(https?:\/\/imgur[.]com\/(?:a|gallery)\/[0-9a-z]{5,7}\/?)(?:\b|$)/gi,'[<a target="_blank" href="$1">imgs</a>]').replace(/\b(https?:\/\/(?:(?:www[.])?youtube[.]com\/watch[?]v=|youtu[.]be\/)[0-9a-z_-]{11}[?]?(?:(?:&amp;)?(?:wide|(?:feature|list)=[a-z.0-9]*|t=[0-9msh]+))*)\b/gi,'[<a target="_blank" href="$1">video</a>]').replace(/\b(https?:\/\/(?:(?:www|r2)[.])?reddit[.]com\/r\/([a-z0-9]+)\/comments\/[a-z0-9]+\/([a-z0-9_]+)(?:\/[0-9a-z]+)?\/?)(\b| |$)/gi,'[<a target="_blank" href="$1">reddit:$2 $3</a>]$4').replace(/\b(https:\/\/bitcointalk[.]org\/(?:index[.]php)?[?]topic=[0-9]+(?:[.](?:new#new|(?:msg)?[0-9]+))?(?:;(?:all|topicseen))?(?:#new|#msg[0-9]+)?)\b/gi,'[<a target="_blank" href="$1">thread</a>]');
        txt=moment(date).format("HH:mm:ss")+" "+txt;look=look?" "+look:"";txt=' <div class = "chatline'+look+'" > '+txt+"</div>";
 	   chatlog.append(txt)
}