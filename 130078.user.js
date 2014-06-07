// ==UserScript==
// @name           reddit.com - Textarea preview & formatting buttons
// @namespace      v1
// @include        http://www.reddit.com/*
// @run-at document-start
// ==/UserScript==

function show(){

    // Custom minified showdown implementation.
    // Added parsing for: strikethrough, superscript, autolinking, tables
    // TODO, fix list parsing.
    window.Showdown={};Showdown.converter=function(){var s,r,p,n=0;this.makeHtml=function(H){s=new Array();r=new Array();p=new Array();H=H.replace(/\$/g,"@D");H=H.replace(/\r\n/g,"\n");H=H.replace(/\r/g,"\n");H="\n\n"+H+"\n\n";H=k(H);H=H.replace(/^[ \t]+$/mg,"");H=i(H);H=h(H);H=g(H);H=q(H);H=H.replace(/@D/g,"$$");return H};var h=function(H){var H=H.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|\Z)/gm,function(L,M,K,J,I){M=M.toLowerCase();s[M]=l(K);if(J){return J+I}else{if(I){r[M]=I.replace(/"/g,"&quot;")}}return""});return H};var i=function(J){J=J.replace(/\n/g,"\n\n");var I="p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del";var H="p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math";J=J.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm,d);J=J.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm,d);J=J.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,d);J=J.replace(/(\n\n[ ]{0,3}<!(--[^\r]*?--\s*)+>[ \t]*(?=\n{2,}))/g,d);J=J.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,d);J=J.replace(/\n\n/g,"\n");return J};var d=function(J,I){var H=I;H=H.replace(/\n\n/g,"\n");H=H.replace(/^\n/,"");H=H.replace(/\n+$/g,"");H="\n\n@K"+(p.push(H)-1)+"K\n\n";return H};var g=function(H){H=j(H);var I=f("<hr />");H=H.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm,I);H=H.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm,I);H=H.replace(/^[ ]{0,2}([ ]?\_[ ]?){3,}[ \t]*$/gm,I);H=e(H);H=c(H);H=a(H);H=i(H);H=D(H);return H};var C=function(H){H=B(H);H=A(H);H=z(H);H=y(H);H=v(H);H=u(H);H=l(H);H=t(H);H=H.replace(/  +\n/g," <br />\n");return H};var A=function(I){var H=/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;I=I.replace(H,function(K){var J=K.replace(/(.)<\/?code>(?=.)/g,"$1`");J=x(J,"\\`*_");return J});return I};var v=function(H){H=H.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,G);H=H.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?(.*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,G);H=H.replace(/(\[([^\[\]]+)\])()()()()()/g,G);return H};var G=function(Q,U,T,S,R,P,O,N){if(N==undefined){N=""}var I=U;var M=T;var L=S.toLowerCase();var H=R;var K=N;if(H==""){if(L==""){L=M.toLowerCase().replace(/ ?\n/g," ")}H="#"+L;if(s[L]!=undefined){H=s[L];if(r[L]!=undefined){K=r[L]}}else{if(I.search(/\(\s*\)$/m)>-1){H=""}else{return I}}}H=x(H,"*_");var J='<a href="'+H+'"';if(K!=""){K=K.replace(/"/g,"&quot;");K=x(K,"*_");J+=' title="'+K+'"'}J+=">"+M+"</a>";return J};var y=function(H){/*H=H.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,o);H=H.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,o);*/return H};var o=function(N,U,T,S,R,Q,P,O){var I=U;var M=T;var L=S.toLowerCase();var H=R;var K=O;if(!K){K=""}if(H==""){if(L==""){L=M.toLowerCase().replace(/ ?\n/g," ")}H="#"+L;if(s[L]!=undefined){H=s[L];if(r[L]!=undefined){K=r[L]}}else{return I}}M=M.replace(/"/g,"&quot;");H=x(H,"*_");var J='<img src="'+H+'" alt="'+M+'"';K=K.replace(/"/g,"&quot;");K=x(K,"*_");J+=' title="'+K+'"';J+=" />";return J};var j=function(H){H=H.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm,function(J,I){return f("<h1>"+C(I)+"</h1>")});H=H.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm,function(J,I){return f("<h2>"+C(I)+"</h2>")});H=H.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,function(L,K,J){var I=K.length;return f("<h"+I+">"+C(J)+"</h"+I+">")});return H};var w;var e=function(I){I+="@0";var H=/^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(@0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;if(n){I=I.replace(H,function(J,L,K){var O=L;var M=(K.search(/[*+-]/g)>-1)?"ul":"ol";O=O.replace(/\n{2,}/g,"\n\n\n");var N=w(O);N=N.replace(/\s+$/,"");N="<"+M+">"+N+"</"+M+">\n";return N})}else{H=/(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(@0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g;I=I.replace(H,function(Q,O,M,K){var P=O;var N=M;var L=(K.search(/[*+-]/g)>-1)?"ul":"ol";var N=N.replace(/\n{2,}/g,"\n\n\n");var J=w(N);J=P+"<"+L+">\n"+J+"</"+L+">\n";return J})}I=I.replace(/@0/,"");return I};w=function(H){n++;H=H.replace(/\n{2,}$/,"\n");H+="@0";H=H.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(@0|\2([*+-]|\d+[.])[ \t]+))/gm,function(N,M,L,K,J){var P=J;var I=M;var O=L;if(I||(P.search(/\n{2,}/)>-1)){P=g(m(P))}else{P=e(m(P));P=P.replace(/\n$/,"");P=C(P)}return"<li>"+P+"</li>\n"});H=H.replace(/@0/g,"");n--;return H};var c=function(H){H+="@0";H=H.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=@0))/g,function(M,K,I){var L=K;var J=I;L=b(m(L));L=k(L);L=L.replace(/^\n+/g,"");L=L.replace(/\n+$/g,"");L="<pre><code>"+L+"\n</code></pre>";return f(L)+J});H=H.replace(/@0/,"");return H};var f=function(H){H=H.replace(/(^\n+|\n+$)/g,"");return"\n\n@K"+(p.push(H)-1)+"K\n\n"};var B=function(H){H=H.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,function(M,L,K,J,I){var N=J;N=N.replace(/^([ \t]*)/g,"");N=N.replace(/[ \t]*$/g,"");N=b(N);return L+"<code>"+N+"</code>"});return H};var b=function(H){H=H.replace(/&/g,"&amp;");H=H.replace(/</g,"&lt;");H=H.replace(/>/g,"&gt;");H=x(H,"*_{}[]\\",false);return H};var t=function(H){H=H.replace(/\^([^\r]*?\S)\b/g,"<sup>$1</sup>");H=H.replace(/~~([^\r]*?\S)~~/g,"<strike>$1</strike>");H=H.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g,"<strong>$2</strong>");H=H.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g,"<em>$2</em>");return H};var a=function(H){H=H.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm,function(K,I){var J=I;J=J.replace(/^[ \t]*>[ \t]?/gm,"@0");J=J.replace(/@0/g,"");J=J.replace(/^[ \t]+$/gm,"");J=g(J);J=J.replace(/(^|\n)/g,"$1  ");J=J.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,function(M,L){var N=L;N=N.replace(/^  /mg,"@0");N=N.replace(/@0/g,"");return N});return f("<blockquote>\n"+J+"\n</blockquote>")});return H};var D=function(M){M=M.replace(/^\n+/g,"");M=M.replace(/\n+$/g,"");var L=M.split(/\n{2,}/g);var K=new Array();var H=L.length;for(var J=0;J<H;J++){var N=L[J];if(N.search(/@K(\d+)K/g)>=0){K.push(N)}else{if(N.search(/\S/)>=0){N=C(N);N=N.replace(/^([ \t]*)/g,"<p>");N+="</p>";K.push(N)}}}H=K.length;for(var J=0;J<H;J++){while(K[J].search(/@K(\d+)K/)>=0){var I=p[RegExp.$1];I=I.replace(/\$/g,"$$$$");K[J]=K[J].replace(/@K\d+K/,I)}}return K.join("\n\n")};var l=function(H){H=H.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;");H=H.replace(/<(?![a-z\/?\$!])/gi,"&lt;");return H};var z=function(H){H=H.replace(/\\(\\)/g,F);H=H.replace(/\\([`*_{}\[\]()>#+-.!])/g,F);return H};var u=function(H){H=H.replace(/<((https?|ftp|dict):[^'">\s]+)>/gi,'<a href="$1" target="_blank">$1</a>');H=H.replace(/<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,function(J,I){return E(q(I))});H=H.replace(/(\S*)(\/[u|r]\/[a-zA-z0-9_-]+)/g,function(a,b,c){return b?a:'<a href="'+c+'" target="_blank">'+c+'</a>'});H=H.replace(/(="|">)?((https?|ftp|git|steam|irc|news|mumble|ssh|ircs):\/\/[A-Za-z0-9\.\-]+(\/[A-Za-z0-9\?\&\=;,#\+!'\(\)\*\-\._~%]*)*)/g,function(a,b,c){return b?a:'<a href="'+c+'" target="_blank">'+c+'</a>'});H=H.replace(/(https?:\/\/)?(www\.[A-Za-z0-9\.\-]+(\/[A-Za-z0-9\?\&\=;,#\+!'\(\)\*\-\._~%]*)*)/g,function(a,b,c){return b?a:'<a href="http://'+c+'" target="_blank">'+c+'</a>'});function A(_,C,D,E){return B(_,C.replace(/^\|*/,''),D.replace(/^\|*/,''),E.replace(/^\|*/gm,''))};function B(_,C,D,E){C=C.replace(/\|*\s*$/,'').split('|');D=D.replace(/\|*\s*$/,'').split('|');E=E.replace(/\|*\s*$/m,'').split('\n');for(F in E)E[F]=E[F].split('|');for(F in D){if(D[F].match(/^\s*:\-+:\s*$/))D[F]='center';else if(D[F].match(/^\s*\-+:\s*$/))D[F]='right';else if(D[F].match(/^\s*:\-+\s*$/))D[F]='left';else D[F]=''};var G=['<table><thead><tr>'];for(F in C)G.push('<th align="'+D[F]+'">'+C[F]+'</th>');G.push('</tr></thead><tbody>');for(F in E){G.push('<tr>');for(H in C)G.push('<td align="'+(D[H]||'')+'">'+(E[F][H]||'')+'</td>');G.push('</tr>')};G.push('</tbody></table>');return G.join('')};H=H.replace(/^(\|.+)[\s\S](\|\s*[:-]+[: -\|]*)[\s\S]((\|.*[\s\S])*)/gm,A);H=H.replace(/^(\S.*\|.*)[\s\S]([:-]+\s*\|[: -\|]*)[\s\S]((.*\|.*[\s\S])*)/gm,B);return H};var E=function(H){function J(K){var L="0123456789ABCDEF";var M=K.charCodeAt(0);return(L.charAt(M>>4)+L.charAt(M&15))}var I=[function(K){return"&#"+K.charCodeAt(0)+";"},function(K){return"&#x"+J(K)+";"},function(K){return K}];H="mailto:"+H;H=H.replace(/./g,function(K){if(K=="@"){K=I[Math.floor(Math.random()*2)](K)}else{if(K!=":"){var L=Math.random();K=(L>0.9?I[2](K):L>0.45?I[1](K):I[0](K))}}return K});H='<a href="'+H+'">'+H+"</a>";H=H.replace(/">.+:/g,'">');return H};var q=function(H){H=H.replace(/@E(\d+)E/g,function(K,J){var I=parseInt(J);return String.fromCharCode(I)});return H};var m=function(H){H=H.replace(/^(\t|[ ]{1,4})/gm,"@0");H=H.replace(/@0/g,"");return H};var k=function(H){H=H.replace(/\t(?=\t)/g,"    ");H=H.replace(/\t/g,"@A@B");H=H.replace(/@B(.+?)@A/g,function(M,K,J){var I=K;var N=4-I.length%4;for(var L=0;L<N;L++){I+=" "}return I});H=H.replace(/@A/g,"    ");H=H.replace(/@B/g,"");return H};var x=function(K,L,J){var I="(["+L.replace(/([\[\]\\])/g,"\\$1")+"])";if(J){I="\\\\"+I}var H=new RegExp(I,"g");K=K.replace(H,F);return K};var F=function(J,I){var H=I.charCodeAt(0);return"@E"+H+"E"}};
    var converter = new Showdown.converter(), autocomplete;

    // Add header & footer elements, add event callbacks
    addPreview( $('.usertext-edit') );
    $('.usertext-buttons').live('click',function(){this.parentNode.parentNode.lastChild.innerHTML=''});

    // Shortcut button clicked
    $('.usertext-header a').live('click',function(){

        var textarea = this.parentNode.nextSibling,
            caret    = caretInfo( textarea ),
            type     = this.type,
            chars    = this.rev,
            newpos   = 0;                ;

        switch( type )
        {
            // Handle inserting and linking
            case 'insert': textarea.value = caret.before + chars;break;
            case 'link':   textarea.value = caret.before +'['+ (caret.selected||prompt('Link text:','link')) +']('+ prompt('URL:','http://') +' "'+ prompt('title:','') +'")';break;

            // Prepend each line of selection
            case 'prepend':
                if( chars=='    ' && caret.selected.indexOf('\n')==-1 ){ type='wrap';chars='`,`' }
                else{
                    if( caret.selected.length && textarea.value[caret.start-1] && textarea.value[caret.start-1] != '\n'){
                        caret.start    = caret.before.lastIndexOf('\n')+1;
                        caret.before   = textarea.value.slice( 0,caret.start ),
                        caret.selected = textarea.value.slice( caret.start,caret.end );
                    }
                    textarea.value = caret.before +'\n'+ chars + caret.selected.replace(/\n(\w)/g,'\n'+chars+'$1') +(caret.after.length?'\n':'')
                    break;
                }

            // Wrap selected, place cursor after. Or wrap cursor if no selection.
            case 'wrap':
                chars=chars.split(',')
                if( caret.selected.length ) newpos = ( textarea.value = caret.before + chars[0] + caret.selected + chars[1] ).length
                else{ newpos = ( textarea.value = caret.before + chars[0] ).length; textarea.value += caret.selected + chars[1] }
                break;

            // Create table from selected CSV data, or prompt for table values.
            case 'table':
                if( !caret.selected.length ){ 
                    var headers=[],row=[],str,i=j=k=0;

                    while( str = prompt('Header #'+(i+++1)+'\n(leave blank to finish defining headers)','') ){headers.push(str)};
                    var text = caret.before +'\n'+ headers.join(' | ') + '\n--'+ new Array(i-1).join(' | --') +'\n';

                    while( str = prompt('Row #'+(j+1)+'\n"'+headers[k++]+'"\n(leave blank to finish table)','') ){
                        row.push(str);
                        if( headers[k] ) continue;
                        text += row.join(' | ')+'\n';
                        k=0;j++;row=[];
                    };
                    textarea.value += text+'\n';
                } else {
                    if( caret.selected.length && textarea.value[caret.start-1] && textarea.value[caret.start-1] != '\n'){
                        caret.start    = caret.before.lastIndexOf('\n')+1;
                        caret.before   = textarea.value.slice( 0,caret.start ),
                        caret.selected = textarea.value.slice( caret.start,caret.end );
                    }
                    var rows=caret.selected.replace(/,/g,' | ').split('\n'),numcols=rows[0].split('|').length;
                    textarea.value = caret.before+'\n'+rows.shift()+'\n--'+new Array( numcols ).join(' | --')+'\n'+rows.join('\n')+'\n\n';
                }
        }

        newpos = newpos || textarea.value.length;
        textarea.value += caret.after;
        textarea.setSelectionRange( newpos,newpos );
        textarea.focus();
        doPreview( textarea );
    });

    // Add preview box and formatting controls
    function addPreview( usertext){
        if( usertext.find('.usertext-preview').length ) return;
        usertext
            .append('<div class="md usertext-preview"> </div>')
            .bind({DOMAttrModified:doPreview,keyup:textareaKeyup,keydown:textareaKeydown})
            .find('textarea')
                .before('\
                    <div class="md usertext-header">\
                        <a tabindex="999" href="javascript:;" type="wrap" rev="**,**">[<strong>B</strong>]</a>\
                        <a tabindex="999" href="javascript:;" type="wrap" rev="_,_">[<em>I</em>]</a>\
                        <a tabindex="999" href="javascript:;" type="wrap" rev="^, ">[<sup>sup</sup>]</a>\
                        <a tabindex="999" href="javascript:;" type="wrap" rev="~~,~~">[<s>strike</s>]</a>\
                        <a tabindex="999" href="javascript:;" type="insert" rev="\n\n---\n">[--]</a>\
                        <a tabindex="999" href="javascript:;" type="link">[link]</a>\
                        <a tabindex="999" href="javascript:;" type="prepend" rev="* ">[&bull;]</a>\
                        <a tabindex="999" href="javascript:;" type="prepend" rev="1. ">[1.]</a>\
                        <a tabindex="999" href="javascript:;" type="prepend" rev="> ">[|quote]</a>\
                        <a tabindex="999" href="javascript:;" type="prepend" rev="    ">[<code>code</code>]</a>\
                        <a tabindex="999" href="javascript:;" type="insert" rev="\&#3232;\\_\&#3232;">[&#3232;_&#3232;]</a>\
                        <a tabindex="999" href="javascript:;" type="table" rev="">[table]</a>\
                    </div>')
                .after('<div class="md usertext-footer"></div>')
                .bind('mousemove',function(e){this.previousSibling.style.width=this.nextSibling.style.width=this.style.width});
    }

    // Rewrite 'edit_usertext' and 'reply' functions to add and/or fill out/reset the preview box.
    var edit_usertext=window.edit_usertext,reply=window.reply;
    window.reply=function(e){ reply(e);doPreview($(e).thing().find('.usertext-edit textarea:first')[0])};
    window.edit_usertext=function(e){
        var usertext = $(e).thing().find('.usertext-edit:first');
        addPreview( usertext );
        doPreview( usertext.find('textarea')[0] );
        return edit_usertext(e)
    };

    // Update preview box
    function doPreview(textarea){textarea.parentNode.parentNode.lastChild.innerHTML = converter.makeHtml(textarea.value)}
    
    // Get usernames of people on this page, and define list of top 1000 subreddits.
    var TAB=9,BACKSPACE=8,DELETE=46,names=[],matches=[],idx=0,subreddits = ['funny','pics','AskReddit','worldnews','gaming','politics','WTF','todayilearned','science','IAmA','videos','technology','Music','AdviceAnimals','aww','atheism','movies','askscience','bestof','fffffffuuuuuuuuuuuu','programming','trees','comics','offbeat','gifs','gonewild','geek','sex','nsfw','Fitness','Minecraft','news','food','humor','Frugal','DoesAnybodyElse','LifeProTips','Android','books','entertainment','EarthPorn','skyrim','business','explainlikeimfive','space','TrueReddit','scifi','Economics','starcraft','gadgets','DIY','firstworldproblems','malefashionadvice','wikipedia','apple','shutupandtakemymoney','4chan','TwoXChromosomes','listentothis','Cooking','leagueoflegends','self','Games','circlejerk','environment','YouShouldKnow','linux','history','Art','philosophy','woahdude','photography','canada','GetMotivated','sports','tf2','nosleep','loseit','pokemon','math','wallpapers','creepy','conspiracy','DepthHub','howto','worldpolitics','guns','RealGirls','Drugs','doctorwho','seduction','Health','cogsci','psychology','Boobies','Libertarian','dubstep','netsec','Documentaries','Jokes','tldr','freebies','spaceporn','Marijuana','itookapicture','nfl','Physics','beer','web_design','soccer','lolcats','Design','battlefield3','skeptic','community','buildapc','wallpaper','lgbt','WebGames','happy','anime','iphone','gameofthrones','bicycling','zombies','travel','LegalTeens','gamernews','wow','NSFW_GIF','tattoos','FoodPorn','relationships','relationship_advice','Guitar','shittyaskscience','WeAreTheMusicMakers','IWantToLearn','gentlemanboners','writing','compsci','electronicmusic','MensRights','harrypotter','answers','Demotivational','ass','Astronomy','reactiongifs','RoomPorn','energy','occupywallstreet','hardware','CityPorn','truegaming','StarWars','recipes','swtor','Python','tipofmytongue','economy','Foodforthought','webcomics','cats','Metal','Christianity','running','Amateur','darknetplan','xkcd','hockey','thewalkingdead','PS3','mylittlepony','shittyadvice','classicrage','somethingimade','rpg','LucidDreaming','breakingbad','learnprogramming','Anarchism','ginger','Homebrewing','AbandonedPorn','gamedev','nba','LadyBoners','battlestations','facepalm','ProjectReddit','zelda','fffffffuuuuuuuuuuuud','hiphopheads','personalfinance','Diablo','collapse','NetflixBestOf','QuotesPorn','pornvids','treecomics','HistoryPorn','arresteddevelopment','comicbooks','DotA2','subredditoftheday','masseffect','Ubuntu','software','biology','UniversityofReddit','secretsanta','GameDeals','Freethought','Favors','engineering','Enhancement','google','Xsmall','ronpaul','ProjectEnrichment','unitedkingdom','coding','milf','talesfromtechsupport','MMA','AlienBlue','startrek','futurama','vertical','linguistics','MapPorn','australia','Bad_Cop_No_Donut','cars','PhilosophyofScience','NSFW_nospam','motorcycles','keto','obama','nyc','drunk','BuyItForLife','opensource','newreddits','Buddhism','RedditThroughHistory','chemistry','magicTCG','investing','javascript','fitmeals','xbox360','sysadmin','treesgonewild','Military','Guildwars2','Graffiti','AMA','Autos','frugalmalefashion','photos','baseball','randomsexiness','asoiaf','television','WikiLeaks','IndieGaming','girlsinyogapants','techsupport','modnews','fifthworldproblems','japan','nsfw_gifs','firefly','ImGoingToHellForThis','video','quotes','socialism','gardening','Psychonaut','chicago','architecture','confession','HumanPorn','voluptuous','TopGear','webdev','Sexy','gif','nostalgia','dogs','Parenting','OnOff','classicalmusic','SOPA','Coffee','depression','progressive','waterporn','GirlswithGlasses','adventuretime','Seattle','opendirectories','lost','ForeverAlone','fashion','worstof','Dexter','cannabis','ZenHabits','GoneWildPlus','ragenovels','r4r','proper','amiugly','TheSimpsons','Random_Acts_Of_Pizza','women','iiiiiiitttttttttttt','education','ShitRedditSays','trackers','cordcutters','Terraria','jobs','thick','PostCollapse','CFB','lectures','MachinePorn','forhire','dirtysmall','Celebs','redheads','HIMYM','Meditation','GeekPorn','dolan','Pets','DestructionPorn','catpictures','trance','asmr','CampingandHiking','theredditor','Hotchickswithtattoos','AnimalPorn','PHP','Jazz','Fantasy','passionx','chrome','nsfw2','literature','StandUpComedy','law','toronto','Paleo','ArcherFX','boardgames','SpideyMeme','Paranormal','cumsluts','ipad','OneY','TheoryOfReddit','dwarffortress','meetup','IWantOut','DnB','toosoon','cyberlaws','mw3','religion','Bacon','SubredditDrama','moviecritic','EmmaWatson','teen_girls','ReverseEngineering','lists','calvinandhobbes','Portal','Pictures','alternativeart','Blowjobs','europe','TrollXChromosomes','Fallout','boston','mashups','Dogfort','southpark','finance','electronics','horror','SelfSufficiency','Austin','Entrepreneur','SocialEngineering','LosAngeles','IDAP','electrohouse','feminisms','carlhprogramming','lego','DesignPorn','DealsReddit','wicked_edge','VillagePorn','climbing','AsianHotties','productivity','startups','spacedicks','ruby','lifehacks','SuicideWatch','vegan','Anthropology','NoFap','windows','O_Faces','vinyl','gaymers','formula1','Baking','Green','AdrenalinePorn','Portland','ImaginaryLandscapes','Frisson','hardbodies','worldevents','OkCupid','corgi','windowshots','pornography','bookporn','collegesluts','budgetfood','nsfwoutfits','linux4noobs','tonightsdinner','Upskirt','TheLastAirbender','simpleliving','PandR','treemusic','tea','firefox','JailbaitArchives','torrents','Steam','gonewildstories','mac','musictheory','SceneGirls','futurebeats','nature','Eve','eatsandwiches','ImaginaryMonsters','sanfrancisco','PrettyGirls','malelifestyle','Inglip','hackers','Scotch','RomeSweetRome','MakeupAddiction','kindle','UFOs','ifyoulikeblank','neuro','SpecArt','halo','aviation','snowboarding','guitarlessons','batman','cpp','Cheap_Meals','gameswap','anonymous','cosplay','DunderMifflin','gamemusic','indepthstories','java','ukpolitics','aaaaaatheismmmmmmmmmm','IASIP','weightroom','networking','InteriorDesign','RedditDayOf','haskell','Pareidolia','bayarea','teenagers','Playdate','Amateur_girls','homestead','cripplingalcoholism','AdPorn','photocritique','HIPSTERGURLZ','MilitaryPorn','StonerEngineering','punk','RandomKindness','radiohead','Survival','typography','craigslist','googleplus','Bondage','Anticonsumption','VolleyballGirls','nsfw_wtf','BDSMcommunity','robotics','ECE','AskHistorians','malegrooming','SkyPorn','camwhores','Equality','hugeboobs','Assistance','steamdeals','realasians','nocontext','india','MachineLearning','buildapcsales','fantasyfootball','poker','offmychest','washingtondc','ainbow','MoviePosterPorn','BotanicalPorn','needadvice','Piracy','bustybait','snackexchange','languagelearning','misc','Forts','HeroesofNewerth','ColbertRally','jailbreak','lostgeneration','gamingnews','pcgaming','ireland','gonewildflicks','darksouls','SexyButNotPorn','androidapps','Sherlock','skateboarding','steampunk','AlbumArtPorn','badcompany2','rule34','cableporn','AmISexy','rpg_gamers','philadelphia','microsoft','androiddev','Israel','Unashamed','stopsmoking','AlisonBrie','Nootropics','government','PoliticalHumor','realdubstep','arduino','Bass','TheFacebookDelusion','EFLcomics','Poetry','vim','redditstories','AcademicPhilosophy','Lovecraft','minimalism','Punny','Bitcoin','longboarding','computing','ragecomics','patientgamers','actuallesbians','booksuggestions','aprilfools2011','vancouver','london','LetsNotMeet','PoliticalDiscussion','Glitch_in_the_Matrix','AskWomen','carporn','RedditLaqueristas','GoneWildTube','Cyberpunk','AnythingGoesPics','PerfectTiming','malehairadvice','webdesign','crafts','beards','piano','CollegeBasketball','Tribes','Teen_tits','BaconBits','femalefashionadvice','PropagandaPosters','photoshop','netflix','beermoney','bodybuilding','nude','progresspics','ArtisanVideos','Hungergames','AnythingGoesNSFW','MTB','NotSafeForNature','madmen','Permaculture','coupons','gamingpc','slackerrecipes','woodworking','girlskissing','C25K','tedtalks','happygirls','polyamory','coversongs','dogpictures','LearnJapanese','Warhammer','nintendo','audiophile','InfrastructurePorn','AskEngineers','HIFW','hentai','medicine','dating_advice','ExplainLikeImCalvin','lol','introvert','ted','Scholar','askseddit','AnythingGoesNews','3DS','Bottomless_Vixens','Atlanta','EngineeringStudents','microgrowery','photoshopbattles','audioengineering','graphic_design','NSFW_Wallpapers','knives','bisexual','hacking','playitforward','newzealand','daddit','pic','porn','oliviawilde','yoga','FifthWorldPics','SketchDaily','fringe','Learnmusic','xxfitness','OperationGrabAss','VegRecipes','RenewableEnergy','Filmmakers','Weird','birdswitharms','pickle','learnmath','Feminism','DebateReligion','The_nude','WomenOfColor','slowcooking','grool','StateOfTheUnion','groovesharkplaylists','TrueTrueReddit','ILiveIn','BritishTV','edmproduction','nsfwvideos','TrollingAnimals','Conservative','lisp','boltedontits','islam','Screenwriting','ladybonersgw','Images','DAE','bdsm','NewsPorn','vegetarian','manga','nextdoorasians','NigelThornberry','WeAreTheFilmMakers','archlinux','til','whatsthisbug','bookclub','Archaeology','chess','SexPositive','hardscience','texas','Liberal','onions','tech','Thrifty','TechNewsToday','homemadexxx','statistics','Watches','rpac','DJs','TrueFilm','wine','Transhuman','civ','neurophilosophy','banana','museum','animation','beach','movieclub','lesbians','zen','drums','perl','sociology','designthought','Nipples','SomebodyMakeThis','linux_gaming','trippy','AskSocialScience','postrock','seinfeld','InsightfulQuestions','MLS','ludology','kpop','sandiego','day9','browsers','California','HackBloc','django','knitting','CrappyDesign','houston','runescape','commandline','ancientworldproblems','moderatepolitics','osx','cerebral','skiing','urbanexploration','evolution','sweden','apathy','SquaredCircle','overpopulation','cumfetish','montreal','selfhelp','freegames','AdvancedFitness','learnart','geology','Wordpress','beerporn','ideasfortheadmins','nutrition','evedreddit','transgender','conspiratard','Adult','twincitiessocial','tf2trade','IndianBabes','911truth','FancyFollicles','MinecraftInventions','cigars','TrueBlood','Scrubs','science2','firstworldanarchists','veg','JapaneseFood','GirlGamers','gamecollecting','MMFB','PictureChallenge','craftit','csbooks','Cinemagraphs','HighHeels','BSG','starcraft2','Stargate','newjersey','golf','PunkGirls','stencils','youtube','Heavymind','EDC','classicfilms','codbo','sailing','Anxiety','Tgirls','Outdoors','nottheonion','pittsburgh','Survivalist','ragetoons','exmormon','radioreddit','curvy','Dallas','DebateAnAtheist','atheistgems','Pyongyang','shorthairedhotties','AsianNSFW','marketing','socialmedia','mexico','dyke','assassinscreed','House','Fishing','de','disney','GrandTheftAutoV','lockpicking','GirlsinStripedSocks','bikinis','teens','penis','oblivion','france','P90X','1000words','Denver','democrats','f7u12','crypto','redditoroftheday','raspberry_pi','TinyHouses','BarefootRunning','longtext','artificial','cute','backpacking','rwb','ComputerSecurity','Anarcho_Capitalism','aiclass','GirlsFinishingTheJob','FixedGearBicycle','eyes','tabled','ReviewThis','futuregarage','Ultimate_NSFW','picturesofiansleeping','lotr','fnv','2012Elections','progmetal','ask','mcservers','spicy','Naruto','androidthemes','bjj','metacirclejerk','Photobucketplunder','TrueAskReddit','design_critiques','GirlsinSchoolUniforms','applehelp','worldbuilding','awesome','photoclass','linuxadmin','aves','FirePorn','diablo3','TheAgora','entwives','swinghouse','financialindependence','freelance','tolkienfans','discgolf','nugs','gainit','Gore','tifu','Pieces','privacy','femalesgonewild','WtSSTaDaMiT','AskCulinary','wtfart','LSD','culturalstudies','WDP','historicalrage','printSF','SEO','FacialFun','melbourne','SteamGameSwap','bodyweightfitness','RageOps','HistoricalWhatIf','finddit','Neuropsychology','crossfit','climateskeptics','eldertrees','pussy','China','Vegetarianism','chiptunes','beatles','timereddits','gooby','downblouse','BDSMGW','timetolegalize','Republican','Gunners','emacs','urbanplanning','martialarts','Michigan','saplings','screenshots','germany','JRPG','TeenGirls','Ska','roguelikes','Aquariums','rugbyunion','OnePiece','criticism','bigbangtheory','minecraftseeds','childfree','Thenewjailbait','AdviceAtheists','spaceflight','reportthespammers','picrequests','indierock','30ROCK','announcements','blog'];
    $('a.author').text(function(_,s){if(names.indexOf(s)==-1)names.push(s)});
    names.sort(function(a,b){var a=a.toLowerCase(),b=b.toLowerCase();if (a>b)return 1;if(a<b)return -1;return 0});

    // Keyup: update preview & check for autocomplete.
    function textareaKeyup(e){
        if( e.which == TAB ) return;

        var textarea = this.querySelector('textarea'),
            caret    = caretInfo( textarea ),
            match    = caret.before.match(/\/(r|u)\/(\w+)$/);
        matches=[];idx=0;

        // Check if we should attempt an autocomplete.
        if( e.which != BACKSPACE && e.which != DELETE  && match ){

            // Get match text and type
            var type=match[1],bit=match[2],bit_l=bit.toLowerCase();

            // Pull matches out of our user/subreddit list
            if( type=='r') for( i in subreddits) if( subreddits[i].toLowerCase().indexOf(bit_l)==0 ) matches.push( subreddits[i] );
            if( type=='u') for( i in names)      if( names[i].toLowerCase().indexOf(bit_l)==0 )      matches.push( names[i]      );

            // Update textarea
            if( !matches[idx] ){ matches=[];idx=0; return };
            caret.before = caret.before.slice(0,-bit.length);
            caret.end    = caret.start + matches[idx].length - bit.length;
            textarea.value = caret.before + matches[idx] + caret.after;
            textarea.setSelectionRange( caret.start,caret.end );
        }
        doPreview( textarea );
    };

    // Go to next/previous autocomplete match if we're autocompleting
    function textareaKeydown(e){
        if( e.which != TAB ) return;
        
        var textarea = this.querySelector('textarea'),
            caret    = caretInfo( textarea ),
            match    = caret.before.match(/\/(r|u)\/(\w+)$/);
        if( !match ) return;

        // Check if we're moving forward/backward through matches and that we have a valid match
        e.shiftKey ? idx-- : idx++;
        if( idx <0 ) idx = matches.length-1;
        if( idx >=matches.length ) idx = 0;
        if( !matches[idx] ) return;

        // Update textarea
        caret.before = caret.before.slice(0,-match[2].length);
        caret.end    = caret.start + matches[idx].length - match[2].length;
        textarea.value = caret.before + matches[idx] + caret.after;
        textarea.setSelectionRange( caret.start,caret.end );
        doPreview( textarea );
        return false;
    }
    
    // Get caret info for a textarea
    function caretInfo( elem ){
        info = { start:elem.selectionStart,end:elem.selectionEnd}
        info.before   = elem.value.slice( 0,info.start );
        info.after    = elem.value.slice( info.end );
        info.selected = elem.value.slice( info.start,info.end );
        return info;
    }
}

document.addEventListener('DOMContentLoaded',function(e){var script=document.createElement('script');script.textContent="("+show.toString()+')()';document.head.appendChild(script)});

// Append CSS
(function addcss(){
    if(!document.head)return setTimeout(addcss);

    var s=document.createElement('style');s.textContent='\
        .usertext-preview{\
            -webkit-border-radius:7px;\
            -moz-border-radius:7px;\
            border-radius:7px;\
            background-color:#FAFAFA;\
            border:1px solid #369;\
            margin:5px 0;\
            padding:5px;\
            min-height:15px;\
        }\
        .usertext-preview:before{\
            content:"Preview:";\
            font-size:x-small;\
            color:gray;\
            margin:3px 0;\
            border-bottom:1px solid lightgray;\
        }\
        .usertext-edit textarea, .usertext-header, .usertext-footer{\
            -webkit-box-sizing:border-box;\
            -moz-box-sizing:border-box;\
            box-sizing:border-box;\
            border:1px solid gray;\
        }\
        .usertext-header, .usertext-footer{\
            -moz-border-radius:7px;\
            border-radius:7px;\
            padding:5px 5px 8px 5px!important;\
            background-color:#FAFAFA;\
            text-align:center;\
        }\
        .usertext-footer{\
            -moz-border-radius-topright:0!important;\
            -moz-border-radius-topleft:0!important;\
            border-top-right-radius:0!important;\
            border-top-left-radius:0!important;\
            border-top:none!important;\
            margin-bottom:5px;\
        }\
        .usertext-header{\
            -moz-border-radius-bottomright:0!important;\
            -moz-border-radius-bottomleft:0!important;\
            border-bottom-right-radius:0!important;\
            border-bottom-left-radius:0!important;\
            border-bottom:none!important;\
        }\
        .linefield .usertext-edit textarea,.roundfield .usertext-edit textarea{width:500px}\
        .thing.message .usertext-header, .thing.message .usertext-footer, .thing.message .usertext-preview{margin-left:0}';
    document.head.appendChild(s);
})();