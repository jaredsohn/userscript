// ==UserScript==
// @name           Vodafone
// @description    Load images direct without vodafone compression
// ==/UserScript==

function vodafone(){
		function remove_vodafone(d){
					var src ='';
					var src_n='';
					var pos=0;
					for(var i=0;i<d.images.length;++i){
						src =d.images[i].src;
						pos = src.indexOf('/bmi/');
						if (pos>0) {
						src_n = 'http://'+src.substr(pos+5);
						d.images[i].src=src_n;
						//alert(src+src_n)
						}
				}}
				remove_vodafone(document);
				for(var f=0;f<parent.frames.length;++f) {remove_vodafone(parent.frames[f].document);}
}
vodafone();




