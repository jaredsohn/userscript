// ==UserScript==
// @name           TexAgs GM - pump/bang Tags
// @namespace      Texags
// @description    Adds pump and bang tags
// @include        http://www.texags.com/main/forum.reply.*
// @include        http://texags.com/main/forum.reply.*
// @include        http://www.mybcs.com/Content/Forums/Replies.*
// @include        http://mybcs.com/Content/Forums/Replies.*
// ==/UserScript==


var pumpList = Array('prissy', 'anaggiemom', 'IMnAg79', 'rdi1984', 'gw78', 'hammer11', 'Artimus Gordon', 'MallalieuAg', 'tamuangry', 'AggieBob03', 'BillE1976', 
'RDV-1992', 'whoop2217', 'Pooh-Ah 1996 Chuck', '96CH53', 'roboag', 'Muy', 'MaroonDontRun', 'fumbler', 'JeffHamilton82', '81TAMU', 'AGS749901', 
'Aggiemartin09', 'c0rn_d0g', 'brotherruss');

var bangList = Array('FastAg', 'Crownroyal1914', 'spadilly');


function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < els.length; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

var testThread = /forum.reply/;
var testBCSThread = /Replies/;

if (testThread.test(window.location.href)) {
	var thisAnchor, userLevelImg, userName;
	var allAnchors = document.evaluate('//a[@name]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allAnchors.snapshotLength; i++) {
		thisAnchor = allAnchors.snapshotItem(i);
		userLevelImg = thisAnchor.parentNode.nextSibling.childNodes[1].childNodes[0];
		userName = thisAnchor.childNodes[0].innerHTML.toUpperCase();
		for (var j = 0; j < pumpList.length; j++) {
			if (pumpList[j].toUpperCase() == userName) {
				var pumpTag = document.createElement('img');
				pumpTag.src = 'data:image/gif;base64,R0lGODlhFQAUAPeoAP//AP//Af39AP7+APT0AOvrAPv7AP//B/z8A'+
					'Pn5AP//Gfb2AP//A///Cv//H///Cf/+/P/+/fr6AP//G///Mff3AP//CP//Df/8+f//BPX1AP//Av//Ev'+
					'2oJP//L+7uAOTMA+W+AP//HubcGv//9///EPCoPPr60f//JerqAP//OvPzAP/kUv//NOaKAP/ON/+nJP/'+
					'/9P+fEP/pyP/4JfTOAO6wVPLyAOjoAOusAP/7j/S9aeHEAP//QP758/zy5P+xKv+vHv/RGvmoMP/Wmf/Z'+
					'n//+8ObkAP/juv79APPFAPbMAO7ZFf//E+HfAO/VBf/BYffqKv//Q/+2M/K8bPitPP/4Tv779v/58PvxA'+
					'f//MO2iMP/Jdf+9WfzxzP//GuXlAOzsAOe/AP//Lf//N+O/AP//Fe/vAP340/3JDv//7/Xmqv/RjP/3Su'+
					'aoAPjAbP/INP//Kf/frv/YUOmkKf/Phv+vNv+tMumWG//nw/yyAP/6ev/4R+bmAPHnLfCtAPqlF//x3OT'+
					'aHvzt2OXOBf3qz//Qiu7EAO+SBv//C///Rf/bpuuNAOOKAP/URv/pVvGXCf/htP/qL/+5T//fKf/gsfzx'+
					'4f7HdfHxAO3sAPXKiv7aIu3tAPeUAP/7O/+pAfrIfuTkAP/Ea//Uk//GHfPEfvvOiuqnQv///wAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAACH5BAEAAKgALAAAAAAVABQAAAj8AFEJHEiwoEGDlw7KOVhwiIxRA7vAYFgQ0ichkt'+
					'pQIgWEC8WBS5I84DABBQVPcz6iipJAAAMLF5o48NBDx8EqgGoQaAlgQ4YDFyZQUOQISp2Bmhj9yUTAwAA'+
					'AUAMwSCSCDJ8pdgieEhNGAwKoYKWWiCMFjkFCBRYIABu2gQMVLAyOSKGWLdgDX1rsMQgCB4GvdgEcUKDl'+
					'UcEtIcBgkvCUbQALCsa8IEjFhRsnBbw2BhBgQwMFNILcKUiHR6gPCwwIGMA6wAMzaTpMKmJQUB9OKyokk'+
					'KA6gxWVZY4UOHODQIUsm1SiapTjEBM/T5ToUY4KDyKCJjoZUr6DOqqAADs=';
				userLevelImg.parentNode.insertBefore(pumpTag, userLevelImg.nextSibling);
			}
		}
		for (var k = 0; k < bangList.length; k++) {
			if (bangList[k].toUpperCase() == userName) {
				var bangTag = document.createElement('img');
//credit to crewez of TexAgs for creating the bang tag image
				bangTag.src = 'data:image/gif;base64,R0lGODlhHQAUAOZbAMTExMDAwMzMzLy8vLKystnZ2bGxseDg4MjIy'+
					'NXV1dHR0bi4uLW1taampt3d3QAAAOPj42ZmZvv7++Tk5P7+/vn5+dvb2/39/WhoaKmpqevr687OzpeXl+'+
					'rq6o2NjdfX1+3t7e/v7/Dw8Pj4+AYGBvz8/L6+vp+fn7S0tOnp6YKCgq6urhYWFqurq2BgYHl5eSgoKBM'+
					'TEyQkJOzs7CsrK5KSksrKyrm5udDQ0DY2NsLCwvLy8ra2tlNTU6enp6ioqM/Pz4CAgERERMfHx5mZmT09'+
					'Pa+vr/X19aWlpeLi4hERESYmJtPT08XFxb+/v+jo6Nra2tzc3KqqqlpaWsvLy8bGxpCQkJWVlWNjYwEBA'+
					'bu7u////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFs'+
					'ALAAAAAAdABQAAAfMgFuCg4SFhoeIiYqLjI1bHwJDTQA2QI6FOhk+DZydnSgWhh5bGFMuP4IGK0YtSCdE'+
					'NR5WHCcZPFdFQkswNCwPvw9ZGKkEDAsDAQBOBCgBGxYHQQ8kvzJYERFb2T3ExsgACAIKCQUOB1UPStmKB'+
					'sXHyeHj5QcHJC+M7d7w4uTmEDGN8r0Dx28eBA4B3X2L1+8AhA4J9RGU509DxIEMDc64uLCgPxAc91E8MM'+
					'ERgABabnQcZwFCii0jLm0psGUDFQE4oGyBKBNRyZ5AGQUCADs=';
				userLevelImg.parentNode.insertBefore(bangTag, userLevelImg.nextSibling);
			}
		}
	}
}

else if (testBCSThread.test(window.location.href)) {
	var thisPost, userLevelImg, userName;
	var allPosts = getElementsByClass("poster", null, "td");
	for (var i = 0; i < allPosts.length; i++) {
		thisPost = allPosts[i];
		userLevelImg = thisPost.childNodes[1].childNodes[3].childNodes[0];
		userName = thisPost.childNodes[1].childNodes[1].childNodes[1].innerHTML.toUpperCase();
		for (var j = 0; j < pumpList.length; j++) {
			if (pumpList[j].toUpperCase() == userName) {
				var pumpTag = document.createElement('img');
				pumpTag.src = 'data:image/gif;base64,R0lGODlhFQAUAPeoAP//AP//Af39AP7+APT0AOvrAPv7AP//B/z8A'+
					'Pn5AP//Gfb2AP//A///Cv//H///Cf/+/P/+/fr6AP//G///Mff3AP//CP//Df/8+f//BPX1AP//Av//Ev'+
					'2oJP//L+7uAOTMA+W+AP//HubcGv//9///EPCoPPr60f//JerqAP//OvPzAP/kUv//NOaKAP/ON/+nJP/'+
					'/9P+fEP/pyP/4JfTOAO6wVPLyAOjoAOusAP/7j/S9aeHEAP//QP758/zy5P+xKv+vHv/RGvmoMP/Wmf/Z'+
					'n//+8ObkAP/juv79APPFAPbMAO7ZFf//E+HfAO/VBf/BYffqKv//Q/+2M/K8bPitPP/4Tv779v/58PvxA'+
					'f//MO2iMP/Jdf+9WfzxzP//GuXlAOzsAOe/AP//Lf//N+O/AP//Fe/vAP340/3JDv//7/Xmqv/RjP/3Su'+
					'aoAPjAbP/INP//Kf/frv/YUOmkKf/Phv+vNv+tMumWG//nw/yyAP/6ev/4R+bmAPHnLfCtAPqlF//x3OT'+
					'aHvzt2OXOBf3qz//Qiu7EAO+SBv//C///Rf/bpuuNAOOKAP/URv/pVvGXCf/htP/qL/+5T//fKf/gsfzx'+
					'4f7HdfHxAO3sAPXKiv7aIu3tAPeUAP/7O/+pAfrIfuTkAP/Ea//Uk//GHfPEfvvOiuqnQv///wAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAACH5BAEAAKgALAAAAAAVABQAAAj8AFEJHEiwoEGDlw7KOVhwiIxRA7vAYFgQ0ichkt'+
					'pQIgWEC8WBS5I84DABBQVPcz6iipJAAAMLF5o48NBDx8EqgGoQaAlgQ4YDFyZQUOQISp2Bmhj9yUTAwAA'+
					'AUAMwSCSCDJ8pdgieEhNGAwKoYKWWiCMFjkFCBRYIABu2gQMVLAyOSKGWLdgDX1rsMQgCB4GvdgEcUKDl'+
					'UcEtIcBgkvCUbQALCsa8IEjFhRsnBbw2BhBgQwMFNILcKUiHR6gPCwwIGMA6wAMzaTpMKmJQUB9OKyokk'+
					'KA6gxWVZY4UOHODQIUsm1SiapTjEBM/T5ToUY4KDyKCJjoZUr6DOqqAADs=';
				userLevelImg.parentNode.insertBefore(pumpTag, userLevelImg.nextSibling);
			}
		}
		for (var k = 0; k < bangList.length; k++) {
			if (bangList[k].toUpperCase() == userName) {
				var bangTag = document.createElement('img');
				bangTag.src = 'data:image/gif;base64,R0lGODlhHQAUAOZbAMTExMDAwMzMzLy8vLKystnZ2bGxseDg4MjIy'+
					'NXV1dHR0bi4uLW1taampt3d3QAAAOPj42ZmZvv7++Tk5P7+/vn5+dvb2/39/WhoaKmpqevr687OzpeXl+'+
					'rq6o2NjdfX1+3t7e/v7/Dw8Pj4+AYGBvz8/L6+vp+fn7S0tOnp6YKCgq6urhYWFqurq2BgYHl5eSgoKBM'+
					'TEyQkJOzs7CsrK5KSksrKyrm5udDQ0DY2NsLCwvLy8ra2tlNTU6enp6ioqM/Pz4CAgERERMfHx5mZmT09'+
					'Pa+vr/X19aWlpeLi4hERESYmJtPT08XFxb+/v+jo6Nra2tzc3KqqqlpaWsvLy8bGxpCQkJWVlWNjYwEBA'+
					'bu7u////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFs'+
					'ALAAAAAAdABQAAAfMgFuCg4SFhoeIiYqLjI1bHwJDTQA2QI6FOhk+DZydnSgWhh5bGFMuP4IGK0YtSCdE'+
					'NR5WHCcZPFdFQkswNCwPvw9ZGKkEDAsDAQBOBCgBGxYHQQ8kvzJYERFb2T3ExsgACAIKCQUOB1UPStmKB'+
					'sXHyeHj5QcHJC+M7d7w4uTmEDGN8r0Dx28eBA4B3X2L1+8AhA4J9RGU509DxIEMDc64uLCgPxAc91E8MM'+
					'ERgABabnQcZwFCii0jLm0psGUDFQE4oGyBKBNRyZ5AGQUCADs=';
				userLevelImg.parentNode.insertBefore(bangTag, userLevelImg.nextSibling);
			}
		}
	}
}