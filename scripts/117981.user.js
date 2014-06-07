// ==UserScript==
// @name           FaceSmug
// @namespace      http://www.facebook.com/*
// @description    Facebook emoticons
// @include        http://www.facebook.com/*
// @author		   megalomaniac/TrollEmoticons
// ==/UserScript==

	function replaceByTag(tagName, obj) {
		if(obj.getElementsByTagName) {
			var nodes = obj.getElementsByTagName(tagName);
			for(i in nodes) {
				if(typeof(nodes[i].innerHTML)=="string") {
					changeEmoticon(nodes[i]); 
				}
			}
		}
	}
		

	function changeEmoticon(node) {

	node.innerHTML = node.innerHTML
	.replace(/&quot;\)/g, '&quot; )');
	node.innerHTML = node.innerHTML
	//emoticons
	.replace(/:fag:/g,'<img src="http://i.imgur.com/t15MY.gif"></img>')
	.replace(/:sisi:/g,'<img src="http://i.imgur.com/5DHU8.gif"></img>')
	.replace(/:snob:/g,'<img src="http://i.imgur.com/kZP7x.gif"></img>')
	.replace(/:uhlol:/g,'<img src="http://i.imgur.com/KqhVk.gif"></img>')
	.replace(/:facepalm:/g,'<img src="http://i.imgur.com/AIlI9.gif"></img>')
	.replace(/:rulez:/g,'<img src="http://i.imgur.com/U0jFz.gif"></img>')
	.replace(/:look:/g,'<img src="http://i.imgur.com/LfKMk.gif"></img>')
	.replace(/:rotfl:/g,'<img src="http://i.imgur.com/gM8k3.gif"></img>')
	.replace(/:uhm:/g,'<img src="http://i.imgur.com/F7hdu.gif"></img>')
	.replace(/:asd:/g,'<img src="http://i.imgur.com/3oNsi.gif"></img>')
	.replace(/:lul:/g,'<img src="http://i.imgur.com/kKfKn.gif"></img>')
	.replace(/:awesome:/g,'<img src="http://i.imgur.com/lEnmQ.png"></img>')
	.replace(/:caffe:/g,'<img src="http://i.imgur.com/YpNXJ.gif"></img>')
	.replace(/:vojo:/g,'<img src="http://i.imgur.com/0GrOE.gif"></img>')
	.replace(/:smugdance:/g,'<img src="http://i.imgur.com/Dld7K.gif"></img>')
	.replace(/:smuglol:/g,'<img src="http://i.imgur.com/9gE2K.gif"></img>')
	.replace(/:rotolul:/g,'<img src="http://i.imgur.com/oL7kU.gif"></img>')
	.replace(/:smugvaivia:/g,'<img src="http://i.imgur.com/AwxBl.gif"></img>')
	.replace(/:nono:/g,'<img src="http://i.imgur.com/yZ1rZ.gif"></img>')
	.replace(/:pippotto:/g,'<img src="http://i.imgur.com/mYOFn.gif"></img>')
	.replace(/:mad:/g,'<img src="http://i.imgur.com/wLg2r.gif"></img>')
	.replace(/:tsk:/g,'<img src="http://i.imgur.com/B1EmO.gif"></img>')
	.replace(/:sbav:/g,'<img src="http://i.imgur.com/gqKTV.gif"></img>')
	.replace(/:baci:/g,'<img src="http://i.imgur.com/nwbmh.gif"></img>')
	.replace(/:solo:/g,'<img src="http://i.imgur.com/xpyNq.gif"></img>')
	.replace(/:blabla:/g,'<img src="http://i.imgur.com/mHGiC.gif"></img>')
	.replace(/:bua:/g,'<img src="http://i.imgur.com/ozLmV.gif"></img>')
	.replace(/:moan:/g,'<img src="http://i.imgur.com/XAa7H.gif"></img>')
	.replace(/:o/g,'<img src="http://i.imgur.com/az0Dv.gif"></img>')
	.replace(/:\|/g,'<img src="http://i.imgur.com/1dST9.gif"></img>')
	.replace(/:prostro:/g,'<img src="http://i.imgur.com/4Kujk.gif"></img>')
	.replace(/:wtf:/g,'<img src="http://i.imgur.com/yn6wC.gif"></img>')
	.replace(/:cryfag:/g,'<img src="http://i.imgur.com/A90mb.gif"></img>')
	.replace(/:timifag:/g,'<img src="http://i.imgur.com/527Xn.gif"></img>')
	.replace(/:smugignore:/g,'<img src="http://i.imgur.com/bBcQW.gif"></img>')
	.replace(/:smugplauso:/g,'<img src="http://i.imgur.com/2XWMJ.gif"></img>')
	.replace(/:smugnonsifa:/g,'<img src="http://i.imgur.com/3pPkb.gif"></img>')
	.replace(/:smugjfs:/g,'<img src="http://i.imgur.com/aQNNu.gif"></img>')
	.replace(/:smugjump:/g,'<img src="http://i.imgur.com/OxnpN.gif"></img>')
	.replace(/:smugcacca:/g,'<img src="http://i.imgur.com/oVsey.gif"></img>')
	.replace(/:smugdunno:/g,'<img src="http://i.imgur.com/YtwK6.gif"></img>')
	.replace(/:smug:/g,'<img src="http://i.imgur.com/vHgJa.gif"></img>')
	.replace(/:popcorn:/g,'<img src="http://i.imgur.com/iBi2C.gif"></img>')
	.replace(/:consola:/g,'<img src="http://i.imgur.com/xaTE1.gif"></img>')
	.replace(/:tremo:/g,'<img src="http://i.imgur.com/e5I4O.gif"></img>')
	.replace(/:schiuma:/g,'<img src="http://i.imgur.com/hKCdp.gif"></img>')
	.replace(/:uhoh:/g,'<img src="http://i.imgur.com/QALOR.gif"></img>')
	.replace(/:smugvojo:/g,'<img src="http://i.imgur.com/xHV9F.gif"></img>')
	.replace(/:isteric:/g,'<img src="http://i.imgur.com/vNMtw.gif"></img>')
	.replace(/:lol:/g,'<img src="http://i.imgur.com/NIH3L.gif"></img>')
	.replace(/:smugbusiness:/g,'<img src="http://i.imgur.com/Wo4nP.gif"></img>')
	.replace(/:smugrosica:/g,'<img src="http://i.imgur.com/po3Q0.gif"></img>')
	
	.replace(/fag/g,'<img src="http://i.imgur.com/t15MY.gif"></img>')
	.replace(/uhlol/g,'<img src="http://i.imgur.com/KqhVk.gif"></img>')
	.replace(/facepalm/g,'<img src="http://i.imgur.com/AIlI9.gif"></img>')
	.replace(/rotfl/g,'<img src="http://i.imgur.com/gM8k3.gif"></img>')
	.replace(/mmm/g,'<img src="http://i.imgur.com/F7hdu.gif"></img>')
	.replace(/asd/g,'<img src="http://i.imgur.com/3oNsi.gif"></img>')
	.replace(/smuglol/g,'<img src="http://i.imgur.com/9gE2K.gif"></img>')
	}
	
	function commonInsert(obj) {
		if(typeof(obj)=="object") {
			replaceByTag('p', obj);
		}
	}

	function nodeInserted(event) {
	commonInsert(event.target);
	}

	commonInsert(document);
	document.addEventListener('DOMNodeInserted', function(event) {
	commonInsert(event.target);

    }, false);