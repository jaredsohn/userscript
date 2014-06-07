// ==UserScript==
// @name           Troll-emoticons v2
// @namespace      http://www.google.com/
// @description    Troll-Emoticons en Facebook, Twitter y U-cursos!.
// @include        http*://*facebook.com/*
// @include        http*://*twitter.com/*
// @include        http*://*u-cursos.cl/*
// @include        https://www.u-cursos.cl/*foro*
// @version        2.1
// ==/UserScript==

function replaceByClass(className, obj) {
    if(obj.getElementsByClassName) {
        var nodes = obj.getElementsByClassName(className);
        for(i in nodes) {
            if(typeof(nodes[i].innerHTML)=="string") {
                makeYahoo(nodes[i]);
            }
        }
    }
}

function makeYahoo(node) {
	// See More Fix
	node.innerHTML = node.innerHTML.replace(/&quot;\)/g, '&quot; )');
	node.innerHTML = node.innerHTML	    .replace(/-trollface-/g, "<img src=\'http://gapgames.net/images/ragefacescript/trollface.png\' />")
    .replace(/-stare-/g, "<img src=\'http://gapgames.net/images/ragefacescript/stare.png\' />")
    .replace(/-thefuck-/g, "<img src=\'http://gapgames.net/images/ragefacescript/thefuck.png\' />")
	.replace(/-ffff-/g, "<img src=\'http://gapgames.net/images/ragefacescript/ffff.png\' />")
	.replace(/-no-/g, "<img src=\'http://gapgames.net/images/ragefacescript/no.png\' />")
	.replace(/-yuno-/g, "<img src=\'http://gapgames.net/images/ragefacescript/yuno.png\' />")
	.replace(/-letsdothis-/g, "<img src=\'http://gapgames.net/images/ragefacescript/letsdothis.png\' />")
	.replace(/-areyoufuckingkiddingme-/g, "<img src=\'http://gapgames.net/images/ragefacescript/areyoufuckingkiddingme.png\' />")
	.replace(/-f7u12-/g, "<img src=\'http://gapgames.net/images/ragefacescript/f7u12.png\' />")
	.replace(/-ilied-/g, "<img src=\'http://gapgames.net/images/ragefacescript/ilied.png\' />")
	.replace(/-trolldad-/g, "<img src=\'http://gapgames.net/images/ragefacescript/trolldad.png\' />")
	.replace(/-trololo-/g, "<img src=\'http://gapgames.net/images/ragefacescript/trololo.png\' />")
	.replace(/-ohgod-/g, "<img src=\'http://gapgames.net/images/ragefacescript/ohgod.png\' />")
	.replace(/-augh-/g, "<img src=\'http://gapgames.net/images/ragefacescript/augh.png\' />")
	.replace(/-cerealguy-/g, "<img src=\'http://gapgames.net/images/ragefacescript/cerealguy.png\' />")
	.replace(/-betterthanexpected-/g, "<img src=\'http://gapgames.net/images/ragefacescript/everythingwentbetterthanexpected.png\' />")
	.replace(/-excitedyes-/g, "<img src=\'http://gapgames.net/images/ragefacescript/excitedyes.png\' />")
	.replace(/-pokerface-/g, "<img src=\'http://gapgames.net/images/ragefacescript/pokerface.png\' />")
	.replace(/-sweetjesus-/g, "<img src=\'http://gapgames.net/images/ragefacescript/sweetjesus.png\' />")
	.replace(/-creepygusta-/g, "<img src=\'http://gapgames.net/images/ragefacescript/creepygusta.png\' />")
	.replace(/-okay-/g, "<img src=\'http://gapgames.net/images/ragefacescript/okay.png\' />")
	.replace(/-numb-/g, "<img src=\'http://gapgames.net/images/ragefacescript/numb.png\' />")
	.replace(/-foreveralone-/g, "<img src=\'http://gapgames.net/images/ragefacescript/foreveralone.png\' />")
	.replace(/-why-/g, "<img src=\'http://gapgames.net/images/ragefacescript/why.png\' />")
	.replace(/-herpderp-/g, "<img src=\'http://gapgames.net/images/ragefacescript/herpderp.png\' />")
	.replace(/-fuckyea-/g, "<img src=\'http://gapgames.net/images/ragefacescript/fuckyea.png\' />")
	.replace(/-gtfo-/g, "<img src=\'http://gapgames.net/images/ragefacescript/gtfo.png\' />")
	.replace(/-closeenough-/g, "<img src=\'http://gapgames.net/images/ragefacescript/closeenough.png\' />")
	.replace(/-grandmatroll-/g, "<img src=\'http://gapgames.net/images/ragefacescript/grandmatroll.png\' />")
	.replace(/-hitler-/g, "<img src=\'http://gapgames.net/images/ragefacescript/hitler.png\' />")
	.replace(/-deviltroll-/g, "<img src=\'http://gapgames.net/images/ragefacescript/deviltroll.png\' />")
	.replace(/-gaytroll-/g, "<img src=\'http://gapgames.net/images/ragefacescript/gaytroll.png\' />")
	.replace(/-omg-/g, "<img src=\'http://gapgames.net/images/ragefacescript/omg.png\' />")
	.replace(/-milk-/g, "<img src=\'http://gapgames.net/images/ragefacescript/milk.png\' />")
	.replace(/-uhmwat-/g, "<img src=\'http://gapgames.net/images/ragefacescript/uhmwat.png\' />")
	.replace(/-wait-/g, "<img src=\'http://gapgames.net/images/ragefacescript/wait.png\' />")
	.replace(/-wuuut-/g, "<img src=\'http://gapgames.net/images/ragefacescript/wuuut.png\' />")
	.replace(/-clevergirl-/g, "<img src=\'http://gapgames.net/images/ragefacescript/clevergirl.jpg\' />")
    .replace(/-fuckthatshit-/g, "<img src=\'http://gapgames.net/images/ragefacescript/fuckthatshit.png\' />")
	.replace(/-lawl-/g, "<img src=\'http://gapgames.net/images/ragefacescript/lol.png\' />")
	.replace(/-fu-/g, "<img src=\'http://gapgames.net/images/ragefacescript/fu.jpg\' />")
	.replace(/-megusta-/g, "<img src=\'http://gapgames.net/images/ragefacescript/megusta.png\' />")
	.replace(/-pedobear-/g, "<img src=\'http://gapgames.net/images/ragefacescript/pedobear.png\' />")
	.replace(/-thefuckf-/g, "<img src=\'http://gapgames.net/images/ragefacescript/thefuckf.png\' />")
	.replace(/-feellikeasir-/g, "<img src=\'http://gapgames.net/images/ragefacescript/feellikeasir.png\' />")
	.replace(/-orly-/g, "<img src=\'http://gapgames.net/images/ragefacescript/orly.jpg\' />")
	.replace(/-yarly-/g, "<img src=\'http://gapgames.net/images/ragefacescript/yarly.jpg\' />")
	.replace(/-nyancat-/g, "<img src=\'http://gapgames.net/images/ragefacescript/nyancat.gif\' />")
	.replace(/-mentira-/g, "<img src=\'http://gapgames.net/images/ragefacescript/mentira.jpg\' />")
	.replace(/-siclaro-/g, "<img src=\'http://gapgames.net/images/ragefacescript/siclaro.jpg\' />")
	.replace(/-pukerainbows-/g, "<img src=\'http://gapgames.net/images/ragefacescript/pukerainbows.jpg\' />")
	.replace(/-putsonsunglasses-/g, "<img src=\'http://gapgames.net/images/ragefacescript/davidcaruso.jpg\' />")
	.replace(/-yeaaah-/g, "<img src=\'http://gapgames.net/images/ragefacescript/yeaaah.png\' />")
	.replace(/-billymayshere-/g, "<img src=\'http://gapgames.net/images/ragefacescript/billymays.png\' />")
	.replace(/-charliesheen-/g, "<img src=\'http://gapgames.net/images/ragefacescript/charliesheen.png\' />")
	.replace(/-duhwinning-/g, "<img src=\'http://gapgames.net/images/ragefacescript/duhwinning.png\' />")
	.replace(/-notbad-/g, "<img src=\'http://gapgames.net/images/ragefacescript/notbad.png\' style='width:60px; height:60px;' />")

	//These are image macro memes
	
	.replace(/-futuramafry-/g, "<br><img src=\'http://gapgames.net/images/ragefacescript/futuramafry.jpg\' /><br>")
	.replace(/-hipsterkitty-/g, "<br><img src=\'http://gapgames.net/images/ragefacescript/hipsterkitty.jpg\' /><br>")
	.replace(/-interestingman-/g, "<br><img src=\'http://gapgames.net/images/ragefacescript/mostinterestingmanintheworld.jpg\' /><br>")
	.replace(/-scumbagsteve-/g, "<br><img src=\'http://gapgames.net/images/ragefacescript/scumbagsteve.jpg\' /><br>")
	.replace(/-ggg-/g, "<br><img src=\'http://gapgames.net/images/ragefacescript/ggg.jpg\' /><br>")
	.replace(/-sap-/g, "<br><img src=\'http://gapgames.net/images/ragefacescript/sap.jpg\' /><br>")
	.replace(/-insanitywolf-/g, "<br><img src=\'http://gapgames.net/images/ragefacescript/insanitywolf.jpg\' /><br>")
	.replace(/-couragewolf-/g, "<br><img src=\'http://gapgames.net/images/ragefacescript/couragewolf.jpg\' /><br>")
	.replace(/-downvotingroman-/g, "<br><img src=\'http://gapgames.net/images/ragefacescript/downvotingroman.jpg\' /><br>")
	.replace(/-youcantexplainthat-/g, "<br><img src=\'http://gapgames.net/images/ragefacescript/billoreilly.jpg\' /><br>")
	.replace(/-redditorwife-/g, "<br><img src=\'http://gapgames.net/images/ragefacescript/redditorwife.jpg\' /><br>");
}

function commonInsert(obj) {
    if(typeof(obj)=="object") {
        replaceByClass('tweet-text', obj); //Twitter
        
		replaceByClass('commentContent', obj);
        replaceByClass('mobile_status', obj);
        replaceByClass('uiStreamMessage', obj);
        replaceByClass('GBThreadMessageRow_Body_Content', obj);
        replaceByClass('UIStory_Message', obj);
		replaceByClass('t', obj);
		replaceByClass('md', obj);
		replaceByClass('commentBody', obj);
		replaceByClass('zzTextEditorReadOnly', obj);
		replaceByClass('cx-comment-display', obj);
		replaceByClass('cx-desc-overflow', obj);
		replaceByClass('comment even thread-even depth-1', obj);
		replaceByClass('commentlist', obj);
		replaceByClass('displayed', obj);
		replaceByClass('reply', obj);
		replaceByClass('fbQuestionsPollClickTarget', obj);
		replaceByClass('pas fbQuestionsPollResultsBar', obj);
		replaceByClass('container', obj);
    }
}

function nodeInserted(event) {
    commonInsert(event.target);
}

commonInsert(document);
document.addEventListener("DOMNodeInserted", nodeInserted, true);