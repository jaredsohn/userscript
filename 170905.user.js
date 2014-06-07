// ==UserScript==
// @name        Fimfiction Emote Extender: Reshelving Module
// @namespace   ffemoteextenderreshelving
// @description Sorts additional emotes for fimfiction.net.
// @include     http*://www.fimfiction.net/*
// @include     http*://fimfiction.net/*
// @grant       none
// @require		https://github.com/iloveportalz0r/fimfiction-script/raw/master/emoteHandler.js
// @version     1.0
// ==/UserScript==

$(document).ready(run);

function run() {
	
	initializeAPI();
	
	if (Site.page ==  PAGE.GROUPTHREAD || Site.page == PAGE.GROUP) {
	
	//existing are: AJ, FS, RD, R, TS, PP, CMC
	//new: SP, PR, MSC
		
		var emotes = [
			
			["http://i.imgur.com/NBEDt.png", "AJ"],
			["http://i.imgur.com/5Tp73.png", "AJ"],
			["http://i.imgur.com/7PYFy.png", "AJ"],
			["http://i.imgur.com/8zRAx.png", "AJ"],
			["http://i.imgur.com/aBIJ1.png", "AJ"],
			["http://i.imgur.com/bEP8EQ2.png", "AJ"],
			["http://i.imgur.com/DHDbq.png", "AJ"],
			["http://i.imgur.com/DmoWN.png", "AJ"],
			["http://i.imgur.com/HZlOi.png", "AJ"],
			["http://i.imgur.com/MdJgU.png", "AJ"],
			["http://i.imgur.com/mMp7L.png", "AJ"],
			["http://i.imgur.com/oa0BJ.png", "AJ"],
			["http://i.imgur.com/oaEI1BM.png", "AJ"],
			
			["http://i.imgur.com/5wxoPUa.png", "FS"],
			["http://i.imgur.com/ahOjP.png", "FS"],
			["http://i.imgur.com/AUoqx.png", "FS"],
			["http://i.imgur.com/eAjva.png", "FS"],
			["http://i.imgur.com/FlxUX.png", "FS"],
			["http://i.imgur.com/gphLa.png", "FS"],
			["http://i.imgur.com/H718D.png", "FS"],
			["http://i.imgur.com/hCkff.png", "FS"],
			["http://i.imgur.com/iX6uT.png", "FS"],
			["http://i.imgur.com/J1YdP.png", "FS"],
			["http://i.imgur.com/Mpt2V.png", "FS"],
			["http://i.imgur.com/PKx4m.png", "FS"],
			
			["http://i.imgur.com/30Blc.png", "PP"],
			["http://i.imgur.com/477xD.png", "PP"],
			["http://i.imgur.com/aMNtT.png", "PP"],
			["http://i.imgur.com/EYLpq.png", "PP"],
			["http://i.imgur.com/N6frZ.png", "PP"],
			["http://i.imgur.com/ojb2X.png", "PP"],
			["http://i.imgur.com/qO3Da.png", "PP"],
			["http://i.imgur.com/RXtaw.png", "PP"],
			["http://i.imgur.com/uEidI.png", "PP"],
			["http://i.imgur.com/UGWzB.png", "PP"],
			["http://i.imgur.com/xeWgy.png", "PP"],
			["http://i.imgur.com/yGwJZ.png", "PP"],
			
			["http://i.imgur.com/2tu9n.png", "R"],
			["http://i.imgur.com/9YyaH.png", "R"],
			["http://i.imgur.com/CGBhB.png", "R"],
			["http://i.imgur.com/DHfUL.png", "R"],
			["http://i.imgur.com/DiqwR.png", "R"],
			["http://i.imgur.com/dObdk0h.png", "R"],
			["http://i.imgur.com/DobP4.png", "R"],
			["http://i.imgur.com/i3eNB.png", "R"],
			["http://i.imgur.com/JT3f7.png", "R"],
			["http://i.imgur.com/Ma3vZ.png", "R"],
			["http://i.imgur.com/SUAwQ.png", "R"],
			["http://i.imgur.com/TAnnF.png", "R"],
			["http://i.imgur.com/u3SP8.png", "R"],
			["http://i.imgur.com/zbSFhpV.png", "R"],
			["http://i.imgur.com/ZkYG2.png", "R"],
			
			["http://i.imgur.com/9HNfn.png", "RD"],
			["http://i.imgur.com/CqXDDh6.png", "RD"],
			["http://i.imgur.com/dB5nN.png", "RD"],
			["http://i.imgur.com/DN4kI.png", "RD"],
			["http://i.imgur.com/jjgRs.png", "RD"],
			["http://i.imgur.com/Kv8nA.png", "RD"],
			["http://i.imgur.com/NRtTF.png", "RD"],
			["http://i.imgur.com/o42xN.png", "RD"],
			["http://i.imgur.com/oZUgV.png", "RD"],
			["http://i.imgur.com/OzWNB.png", "RD"],
			["http://i.imgur.com/QoZIz.png", "RD"],
			["http://i.imgur.com/tCets.png", "RD"],
			["http://i.imgur.com/XtUF0.png", "RD"],
			["http://i.imgur.com/Y7iEz.png", "RD"],
			
			["http://i.imgur.com/5faXAtj.png", "TS"],
			["http://i.imgur.com/AhJQA.png", "TS"],
			["http://i.imgur.com/h6FPh.png", "TS"],
			["http://i.imgur.com/IbDeO.png", "TS"],
			["http://i.imgur.com/lyj7g.png", "TS"],
			["http://i.imgur.com/NZ9LG.png", "TS"],
			["http://i.imgur.com/qDNQJ.png", "TS"],
			["http://i.imgur.com/teICa.png", "TS"],
			["http://i.imgur.com/uCBdE.png", "TS"],
			["http://i.imgur.com/ULdav.png", "TS"],
			["http://i.imgur.com/UQUPg.png", "TS"],
			["http://i.imgur.com/Zvhzz.png", "TS"],

			["http://i.imgur.com/20x2X.png", "CMC"],
			["http://i.imgur.com/6skeR.png", "CMC"],
			["http://i.imgur.com/BxLgU.png", "CMC"],
			["http://i.imgur.com/DGsL3.png", "CMC"],
			["http://i.imgur.com/DKLH4.png", "CMC"],
			["http://i.imgur.com/dWaeV.png", "CMC"],
			["http://i.imgur.com/EKbat.png", "CMC"],
			["http://i.imgur.com/gl6yp.png", "CMC"],
			["http://i.imgur.com/IMGC8.png", "CMC"],
			["http://i.imgur.com/Ku52Y.png", "CMC"],
			["http://i.imgur.com/sYAzM.png", "CMC"],
			["http://i.imgur.com/uVj8R.png", "CMC"],
			["http://i.imgur.com/VViKq.png", "CMC"],
			["http://i.imgur.com/yEdBp.png", "CMC"],
			
			["http://i.imgur.com/BbPhC.png", "SP"],
			["http://i.imgur.com/GmNPM.png", "SP"],
			["http://i.imgur.com/lebxZ.png", "SP"],
			["http://i.imgur.com/qACFB.png", "SP"],
			["http://i.imgur.com/QcNTf.png", "SP"],
			["http://i.imgur.com/QwaS1.png", "SP"],
			["http://i.imgur.com/vBxYG.png", "SP"],
			["http://i.imgur.com/YI5jr.png", "SP"],
			
			["http://i.imgur.com/0lMv9.png", "PR"],
			["http://i.imgur.com/fH5FO.png", "PR"],
			["http://i.imgur.com/fIvet.png", "PR"],
			["http://i.imgur.com/nh9dv.png", "PR"],
			["http://i.imgur.com/tkMRq.png", "PR"],
			["http://i.imgur.com/u9iJV.png", "PR"],
			["http://i.imgur.com/Wtyb9.png", "PR"],
			["http://i.imgur.com/ZebG2.png", "PR"],
			["http://i.imgur.com/j4frQ.png", "PR"],
			["http://i.imgur.com/Av7mi.png", "PR"],
			
			["http://i.imgur.com/cvM4P.png", "MSC"], // cheerilee [CHR]

			["http://i.imgur.com/P83z2.png", "MSC"], // mac
			["http://i.imgur.com/cgoor.png", "MSC"], // mac
			["http://i.imgur.com/wLZl0.png", "MSC"], // mac

			["http://i.imgur.com/2DFdg.png", "MSC"], // reddit
			["http://i.imgur.com/563Gv.png", "MSC"], // reddit

			["http://i.imgur.com/a9ddz.png", "MSC"], // colgate
			
			["http://i.imgur.com/rv8JX.png", "MSC"], // derpy
			["http://i.imgur.com/sHp29.png", "MSC"], // derpy
			["http://i.imgur.com/zI6pj.png", "MSC"], // derpy
			["http://i.imgur.com/BDNMW.png", "MSC"], // derpy

			["http://i.imgur.com/xo9Mr.png", "MSC"], // doctor

			["http://i.imgur.com/mmjN8.png", "MSC"], // octavia

			["http://i.imgur.com/BoPE4.png", "MSC"], // vinyl

			["http://i.imgur.com/eWyjh.png", "MSC"], // 'trice

			["http://i.imgur.com/GIV4g.png", "MSC"], // zecora

			["http://i.imgur.com/jorT3.png", "MSC"], // gilda

			["http://i.imgur.com/UwaXc.png", "MSC"], // lyra

			["http://i.imgur.com/kXPdl.png", "MSC"], // bonbon

			["http://i.imgur.com/LbXFj.png", "MSC"], // trixie
			["http://i.imgur.com/REXzM.png", "MSC"], // trixie
			["http://i.imgur.com/3Sr1ACU.png", "MSC"], // trixie

			["http://i.imgur.com/lx5pI.png", "MSC"], // snails

			["http://i.imgur.com/MGw7s.png", "MSC"], // lily

			["http://i.imgur.com/nXFjR.png", "MSC"], // spitfire

			["http://i.imgur.com/pjagI.png", "MSC"], // angel

			["http://i.imgur.com/rTIx4.png", "MSC"], // photo

			["http://i.imgur.com/TkVcM.png", "MSC"], // discord

			["http://i.imgur.com/TVh3T.png", "MSC"], // chrysalis

			["http://i.imgur.com/pV4j88A.png", "MSC"], // drone

			["http://i.imgur.com/VK1CV.png", "MSC"], // steven

			["http://i.imgur.com/W9ZCa.png", "MSC"], // berry

			["http://i.imgur.com/xJ9hG.png", "MSC"], // shining

			["http://i.imgur.com/ZNGZn.png", "MSC"], // silver
			
			["http://i.imgur.com/ZQwXp.png", "MSC"] // granny
		];
		
		for (var i = 0; i < emotes.length; i++) {
			addEmote(emotes[i][0], emotes[i][1]);
		}
		
	}
	
}