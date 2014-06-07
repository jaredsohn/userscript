// ==UserScript==
// @name           antimat 1\1
// @namespace      none
// @description    Меняем матерные слова на "приличные аналоги"
// @include        *
// ==/UserScript==


(function() {
    var replacements, regex, key, textnodes, node, s; 

    textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
	
    for (var i = 0; i < textnodes.snapshotLength; i++) { 
        node = textnodes.snapshotItem(i); 

        if(node != null && node.nodeName == '#text' && /\S/.test(node.nodeValue))
        {

            s = node.data; 
            s = s.replace(	/блеять/gi,	"*арг!*");
            s = s.replace(	/ояебу/gi,	"*ого!*");
            // тут где-то русские буквы, а где-то латинские
            s = s.replace(	/oяебу/gi,	"*ого!*");
            s = s.replace(	/oяeбу/gi,	"*ого!*");
            s = s.replace(	/ояeбу/gi,	"*ого!*");
			
            s = s.replace( /(х|x)(у|y)й/gi, "фиг");
            s = s.replace( /хуем/gi, "*членом*");
			s = s.replace( /оху(ительно|енно)/gi,	 " замечательно ");
			s = s.replace( /(о|а|)ху(е|)(л|ть|)/gi,		 " с ума сойти ");
			
            s = s.replace( /хуястый/gi, "*рукастый*");
		
			
            //s = s.replace(	/((х|x)(у|y)(й|е|ё|и|я)ли)/i,	"*почему-бы*"]");
            //s = s.replace(	/(п(и|е|ё)(з|с)д)/i,					"["+"писька"+"]");
            //s = s.replace(	/(\Wу?би?л(я\W|яд|ят|юдо?к))/i,	"["+"людок"+"]");
            //s = s.replace(	/(пид(о|а)р|п(е|и)дри)/i,			"["+"гей"+"]");


            //s = s.replace(	/(з(а|о)луп(а|и))/i,				"["+"головка члена"+"]");
            //s = s.replace(	/((\W|о|д|а|ь|ъ)(е|ё|и)б(а|ы|уч|усь|нут|ись))/i,	"["+"отстать"+"]");
            s = s.replace(	/( \W(на|по)х\W )/i,	" неважно ");
            //s = s.replace(	/(су(ка|чк|ки|чь))/i,	"["+"псина"+"]");
            //s = s.replace(	/(др(оч|ачи))/i,		"["+"медитируй"+"]";
            //s = s.replace(	/((\W|о|за)трах)/i,	"["+"надоело"+"]");
            //s = s.replace(	'/(к(а|о)зе?ё?л)/i',	"["+"козёл"+"]");
            //s = s.replace(	'/(др(оч|ачи))/i',		"["+"медитируй"+"]");
            //s = s.replace(	'/(др(оч|ачи))/i',		"["+"медитируй"+"]");
            s = s.replace(	/ др(о|а|o|a)чи/gi,		"три*");
			
			s = s.replace( / (ё|е)б(о|а|)н(ул)(ись|ся) /gi,	" *ку-ку* ");

            s = s.replace( /пиздец/gi,				 "*конец*");
            s = s.replace( /(п(и|е|ё)(з|с)д)/gi,	 "*женский половой орган*");

            s = s.replace( /бл(я|йа)(дь|ть|)/gi,			 "*ах*");
			
            s = s.replace( /ебабельная/gi, "*симпатичная*");
            s = s.replace( /(у|)(е|ё)б(а|о)(к|н|нец|ный) /gi, "*глупый*");
			s = s.replace( /ебанись/gi,				 " с ума сойти ");
			s = s.replace( /заебали/gi,			 " надоели ");
			s = s.replace( /(е|ё)ба(н|нн)ый/gi,	 " замученный ");
			s = s.replace( /(е|ё|и|э)б(ать|сти|ывать)/gi,	 "*иметь*");
			s = s.replace( /(е|ё|и|э)бать/gi,	 "*иметь*");
			s = s.replace( /(е|ё|и|э)б(уч|ищ)(и|е|)(й|)/gi,	 "*иметь*");
			s = s.replace( /( |)(е|e)б(у|y)( |)/gi,	 "*имею*");
			s = s.replace( /еба(ться|ццо|цо)/gi, "*сношаться*");
			s = s.replace( /\W(е|ё)бко/gi,	 "*емко*");
			s = s.replace( /пр(о|а)(ё|е)б/gi, "*****");
			s = s.replace( /(ё|е)банько/gi,	 "глупый");
			s = s.replace( /заебосрачить/gi,	"сделать");
			
			
			
			s = s.replace( /(мандо)/gi,	 "*псевдо*");
			s = s.replace( / манда /gi,	 "голая");
            s = s.replace( /(муд(ак|о|и)(ла|))/gi,		"*глупец*");
            s = s.replace( /муд(я|о|и)/gi,			"*голо*");
		
			
			s = s.replace( /г(о|а)вно/gi,	 "навоз");
			
			
			s = s.replace( /тв(о|а|o|a)(ю|йу|)(ж|)мать/gi,	 "я удивлен");
			
			
			
			
			
			
			
			
			s = s.replace( /fuck/gi, "*фак*");
			//s = s.replace( /н[ие]бет/gi, "*не волнует*");
			//s = s.replace( /пизд/gi, "*с ума сойти*");
		
            node.data = s; 
        }
} 

})();

