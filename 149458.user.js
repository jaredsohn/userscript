// ==UserScript==
// @name GBK转UTF
// ==/UserScript==
//搜索toGBK(str), 将map数组独立出来, 然后添加toUTF函数，
//调用方法：var utf_word = toUTF(gbk_word);

	function toUTF(str){
		var gCode,character = '';
		var array = str.split('%');
		for(var i=1;i<(array.length+1)/2;i++){
			gCode = array[i*2-1]+array[i*2].slice(0,2);
			for(var charCode in map){
				if(map[charCode]===gCode){
					character += String.fromCharCode(charCode) + ((array[i*2].length>2)?array[i*2].slice(2):'');
					break;
				}
			}
		}
		return character;
	};

