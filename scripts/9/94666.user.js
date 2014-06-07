// ==UserScript==
// @name           NeoGAF FUUUUUUU Smilies
// @namespace      hateradio)))
// @description    Turns :lol and :D to Smilies
// @include        http://*neogaf.*/forum/*
// @version        2.0.1
// @grant       none
// ==/UserScript==

var BRINGTHEMBACK = {
	nodes : document.evaluate("//div[contains(@class, 'post')]//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
	l : 'data:image/gif;base64,R0lGODlhDwAPAJECAAAAAAD/7wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgACACwAAAAADwAPAAACL5QNmceSAeFiIFp56r0ASR08oSOV2glulqiuaRuiyozJ9Eh+StR5bZ95TRqOWaMAACH5BAUKAAIALAMAAwAJAAYAAAILDBB5puwJo5zy2FsAOw==',
	d : 'data:image/gif;base64,R0lGODlhEAAQAPe5AP///4eHiOzv9nd3egA9AB0UHxMrGB5pKHd3eQBVAEv/WXycgVlaXRllJNLT01hZW/Le8RTKERg6HVrCXB0gIRYyHVr/bevv9QJ5EZ3aogBuCVj/ZrTIvD//SSl/NBBUHBVoIVb/cT3/TBIZE1r/cHdzewBBANrQ2z6HS423l2upb9na2mmjbN/v6ABwCIuJjSSEMKG9p1b/bxPAEhO1Edbm3zbZSrGcsyufNkA6Ql7/bP3j/AA+ADH4MNHj3EtNT97j50iBTBWlKzb/NVZWWAxCFk37XPDc78zBzE3/X8zNzXqcgCW/N+fv8BhoHjx6RB91KAqLEBdkJJvYoRxoIiuhLU04TjyxPODQ4KfKrXlleRoSHjdAOw8fEkPyTkX/RDA+Mu/b7tjS2PPe8j7/S0D/ShlmJUaOUxNlFVv/bxhFH+vw9RAhFOPr7Nnp4Vf/YSt5MBUaGSv/KX5/gN/r6EX/SUj/SeTt7tPe3TDZQiySOr/MyN7i6DC4NUL9VQ5tG03/aFD/VhodHi/VMz3/PiDJITKTORlkIkP/XTj1UWxXbMji0XFpdR5oKRQsGRhJIFNUVQAMAFJSVSfMNI6PjxxSH9jo4zy7ShZuIElATFH/awAfABdCGBy2Iy/EL9rg41K2VeDg4BnaGdfC2AAyAOLq60L/Sou8mMi+yv3p/EczSUH3UBZhFyCPIUn3URlkIwAKAC2GNa6YrZyZnCJ3J0r/WS7OM7PGujmzR/X1/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALkALAAAAAAQABAAQAj5AHMJFFgqiwoWMYAMFAgqx44bqsaE0aLoCAQrslJlQpHL05AqEgwZMJLEkR41MJhgEtgkwRZGAAAEQBCzRAEedwYumtGjjqkyHciImORij8AMcuwEerPBQhoSMjQBQpRISIoWJkaF+hEzwICYklZg2WRpoIAgkbpQEMQG1pM1CwW2uUKj0CBbnaLA4bOQTgRCfWh5UVBrFRQceTR8yuVG1JdKrnTEwnXJQwg/j2xgwDMBDSsnVA69OtCogRQzID4UOTOFEwAHkGJSmhPzgRIAFU7lagXmBJGuXwEwEMPlz8AaBEagAjDrBQAkcUj5iCtQwK0FSzhciBsQADs=',
	replace : function(){
		var i = this.nodes.snapshotLength, t;
		while(i--){
			t = this.nodes.snapshotItem(i);
			t.data = t.data.replace(/(?:\:lol|\:D)\b/gi, function($1){
				var m = document.createElement('img');
				m.src = $1.toLowerCase() === ':lol' ? BRINGTHEMBACK.l : BRINGTHEMBACK.d;
				t.parentNode.insertBefore(m, t.nextSibling);
				return '';
			});
		}
	}
};

BRINGTHEMBACK.replace();