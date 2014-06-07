
// Weewar.com FavIcon Alert
// version 1.0
// 2010-01-06
//
// ==UserScript==
// @name          Weewar.com FavIcon Alert
// @namespace     http://obeliskprogramming.com
// @description   Alerts you to the number of games that are waiting on you in weewar.
// @include       http://*.weewar.com/*
// ==/UserScript==

// Wait for the window to load to try and initialize
window.addEventListener('load', function() {
	  new WeewarFavIconAlerts;
	}, true);


function WeewarFavIconAlerts() {
	var self = this;
	
	this.construct = function() {
		this.head = document.getElementsByTagName("head")[0];
		this.pixelMaps = {
			icons: {
				'unread':
					[


					['#C0E8FC', '#C5ECFE', '#C5ECFE', '#BDE2F4', '#BADBED', '#BDE2F4', '#CDECFD', '#D4F2FE', '#D4F2FE', '#C6E5F5', '#C2DEEC', '#BFD8E6', '#BFD8E6', '#BFD8E6', '#C2DEEC', '#CADEE9', '#CADEE9', '#CADEE9', '#CADEE9', '#CADEE9', '#CADEE9', '#CADEE9', '#D0E0E7', '#D0E0E7', '#D0E0E7', '#D0E0E7', '#D0E0E7', '#DEEDF3', '#E9F6FA', '#EFFFFF', '#E9F6FA', '#000'],
['#D1FBFF', '#EFFFFF', '#DEFEFF', '#A8C0C6', '#88A1AD', '#A8C0C6', '#E2F5FC', '#FFFFFF', '#E6FBFF', '#B9CACE', '#87999F', '#71828B', '#71828B', '#76888F', '#7C8E94', '#88949A', '#88949A', '#7E9198', '#7E9198', '#7E9198', '#7E9198', '#7E9198', '#7E9198', '#7E9198', '#7C8E94', '#76888F', '#87999F', '#BFC8CA', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#000'],
['#CBF2FF', '#DEFEFF', '#B0D1E1', '#5D6C75', '#373939', '#5F7079', '#B0D1E1', '#D6FEFF', '#B6D6E7', '#6C7C85', '#2E3233', '#201A1B', '#302F2E', '#373939', '#2E3233', '#252728', '#252728', '#252728', '#302828', '#302828', '#302828', '#302828', '#302828', '#302828', '#302828', '#201A1B', '#373939', '#838689', '#D6E3E9', '#FFFFFF', '#F8FFFF', '#000'],
['#BDE2F4', '#A5C7D8', '#5F7079', '#1F2223', '#ACD', '#282D30', '#57656C', '#6C7C85', '#5A686F', '#282D30', '#10F10', '#302F2E', '#5C5E5A', '#61615D', '#3E3E3B', '#131718', '#832', '#2298', '#4E1714', '#561B18', '#561B18', '#4E1714', '#4E1714', '#4E1714', '#4E1714', '#4F11D', '#4E1B1A', '#544041', '#7C8488', '#CCDDE1', '#F4F8F8', '#000'],
['#B6DEF2', '#88A1AD', '#384043', '#10F10', '#131718', '#1F2223', '#282D30', '#2E3233', '#282D30', '#131718', '#252728', '#61615D', '#979994', '#979994', '#686A67', '#2E3233', '#271715', '#622221', '#A33A36', '#BD433F', '#B0433F', '#B0433F', '#B0433F', '#B0433F', '#B0433F', '#BD433F', '#A33A36', '#622221', '#47393A', '#88949A', '#C9D5D9', '#000'],
['#B6DEF2', '#9BBCCC', '#6C7C85', '#5A686F', '#647981', '#66757E', '#5D6C75', '#5A686F', '#5D6C75', '#66757E', '#6C7C85', '#72787A', '#686A67', '#5C5E5A', '#504E4D', '#563B3B', '#783230', '#B0433F', '#E2534E', '#EF5852', '#EF5852', '#F65A54', '#F65A54', '#F65A54', '#EF5852', '#F65A54', '#DB504B', '#9C2F2B', '#632A28', '#685153', '#72787A', '#000'],
['#C0E8FC', '#C5ECFE', '#BADBED', '#B6D6E7', '#BADBED', '#BADBED', '#BADBED', '#BADBED', '#C2DEEC', '#CDECFD', '#BFD8E6', '#7E9198', '#384043', '#131718', '#201A1B', '#532927', '#9D3E3A', '#DB504B', '#F65A54', '#FE6059', '#FD5B55', '#EF5852', '#E2534E', '#E9554F', '#F65A54', '#FD5B55', '#F65A54', '#E2534E', '#B0433F', '#64312F', '#262221', '#000'],
['#C0E8FC', '#D6FEFF', '#D6FEFF', '#D1FBFF', '#D6FEFF', '#DEFEFF', '#E6FBFF', '#EFFFFF', '#EFFFFF', '#F8FFFF', '#E6FBFF', '#B9CACE', '#71828B', '#2B383D', '#10F10', '#2298', '#632A28', '#B74843', '#FE6059', '#FF6760', '#F65A54', '#B0433F', '#8A3835', '#A9423E', '#EF5852', '#FE6059', '#FE6059', '#FE6059', '#CF4E49', '#692B29', '#1065', '#000'],
['#C0E8FC', '#D6FEFF', '#CBF2FF', '#CBF2FF', '#CBF2FF', '#C5ECFE', '#BDE2F4', '#BDE2F4', '#C6E5F5', '#C6E5F5', '#C6E5F5', '#C6E5F5', '#A4BBC9', '#57656C', '#131718', '#000', '#351918', '#913A36', '#E2534E', '#FE6059', '#DB504B', '#783230', '#482422', '#8A3835', '#E9554F', '#FE6059', '#FE6059', '#E9554F', '#B0433F', '#632A28', '#1B1010', '#000'],
['#C0E8FC', '#D1FBFF', '#CBF2FF', '#D6FEFF', '#CDF2F6', '#9ABDC2', '#67838E', '#5F7079', '#6C7C85', '#6B7C89', '#6B7C89', '#728693', '#647981', '#2F3D47', '#10F10', '#2FDC', '#692B29', '#8A3835', '#833532', '#7F2E2D', '#6F2F2D', '#632A28', '#783230', '#B74843', '#F65A54', '#FF6760', '#F65A54', '#B0433F', '#692B29', '#482422', '#482422', '#000'],
['#C0E8FC', '#D1FBFF', '#CBF2FF', '#CBF2FF', '#B0D1E1', '#71828B', '#302F2E', '#151312', '#201A1B', '#1F2223', '#252728', '#302F2E', '#302F2E', '#1B2724', '#302828', '#913A36', '#CF4E49', '#913A36', '#2C1B17', '#ACD', '#361D1C', '#913A36', '#DB504B', '#EF5852', '#E9554F', '#EF5852', '#CF4E49', '#783230', '#3E211F', '#532927', '#783230', '#000'],
['#C5ECFE', '#D6FEFF', '#C5ECFE', '#9BBCCC', '#71828B', '#5F4446', '#4E1B1A', '#2301', '#832', '#13100', '#3830C', '#5D4F2A', '#726B4A', '#7B7E5F', '#967F63', '#D97B69', '#E36058', '#7F2E2D', '#1B1010', '#221510', '#833532', '#D6564F', '#F05F59', '#C54C48', '#833532', '#692B29', '#692B29', '#5B2826', '#632A28', '#8A3835', '#A9423E', '#000'],
['#C5ECFE', '#DEFEFF', '#B6DEF2', '#67838E', '#373132', '#622221', '#943230', '#622221', '#221510', '#3830C', '#856F2A', '#C5AC64', '#E8D69E', '#F5F0B5', '#F5D9A5', '#FB9E7F', '#D6564F', '#712524', '#351918', '#5B2826', '#C04945', '#F65A54', '#DB504B', '#8A3835', '#361D1C', '#151312', '#361D1C', '#6F2F2D', '#B0433F', '#CF4E49', '#C04945', '#000'],
['#C5ECFE', '#DEFEFF', '#B6DEF2', '#506E79', '#201A1B', '#771E19', '#BD433F', '#862E35', '#332017', '#564B12', '#BA9C3A', '#F3DC7C', '#FFFDBC', '#FFFFD7', '#F5F0B5', '#B79072', '#783230', '#6C1A1E', '#7F2E2D', '#833532', '#833532', '#783230', '#6F2F2D', '#6F2F2D', '#692B29', '#632A28', '#783230', '#B0433F', '#E2534E', '#EF5852', '#C54C48', '#000'],
['#C5ECFE', '#DEFEFF', '#B6DEF2', '#567580', '#2F1F1F', '#852723', '#CF4743', '#862E35', '#332017', '#635715', '#CFAB3C', '#FFE379', '#FFF8B2', '#FFFFCE', '#EEE7AE', '#898868', '#50372F', '#8B3030', '#CF4743', '#9D3E3A', '#3E211F', '#151312', '#361D1C', '#833532', '#CF4E49', '#E9554F', '#E9554F', '#EF5852', '#F65A54', '#EF5852', '#C04945', '#000'],
['#C5ECFE', '#DEFEFF', '#B6DEF2', '#567580', '#302828', '#8C2B26', '#CF4743', '#862E35', '#332017', '#695D16', '#D8B23D', '#FFE379', '#FFEEAB', '#FFFEC4', '#EEE7AE', '#AEB587', '#8A8063', '#B96959', '#E96057', '#C04945', '#783230', '#5B2826', '#783230', '#B74843', '#F65A54', '#FE6059', '#FE6059', '#FE6059', '#FD5B55', '#E9554F', '#C04945', '#000'],
['#C5ECFE', '#DEFEFF', '#B6DEF2', '#567580', '#302828', '#852723', '#CF4743', '#862E35', '#332017', '#695D16', '#D8B23D', '#FFE379', '#FFEEAB', '#FFF2BB', '#FFF2BB', '#F5F0B5', '#E8D69E', '#E9987A', '#E96057', '#E64947', '#DB504B', '#DB504B', '#E2534E', '#EF5852', '#F65A54', '#FD5B55', '#FD5B55', '#FD5B55', '#F65A54', '#EF5852', '#CF4E49', '#000'],
['#C5ECFE', '#DEFEFF', '#B6DEF2', '#567580', '#302828', '#852723', '#CF4743', '#862E35', '#332017', '#695D16', '#D8B23D', '#FFE379', '#FFEEAB', '#FFF2BB', '#FFF2BB', '#FFFEC4', '#F5F0B5', '#B89977', '#95463F', '#BA3D3A', '#F65A54', '#FE6059', '#FE6059', '#FE6059', '#F65A54', '#F65A54', '#F65A54', '#F65A54', '#FD5B55', '#FE6059', '#EF5852', '#000'],
['#C5ECFE', '#DEFEFF', '#B6DEF2', '#567580', '#302828', '#8C2B26', '#CF4743', '#862E35', '#332017', '#635715', '#CFAB3C', '#FFDD77', '#FFEEAB', '#FFF2BB', '#FFFDBC', '#FFFEC4', '#EEE7AE', '#7B7E5F', '#3E211F', '#7A2325', '#E9554F', '#FE6059', '#FE6059', '#F65A54', '#EF5852', '#EF5852', '#F65A54', '#F65A54', '#F65A54', '#FD5B55', '#E2534E', '#000'],
['#C5ECFE', '#DEFEFF', '#B6DEF2', '#567580', '#302828', '#8C2B26', '#D74B46', '#8F3438', '#332017', '#4A4410', '#AB8E35', '#E9CA73', '#FFEEAB', '#FFFEC4', '#FFFEC4', '#FFFFCE', '#E8ECB1', '#6B7959', '#271715', '#6C1A1E', '#E2534E', '#FF6760', '#F65A54', '#E2534E', '#DB504B', '#E2534E', '#EF5852', '#EF5852', '#DB504B', '#B74843', '#8A3835', '#000'],
['#C5ECFE', '#DEFEFF', '#B6DEF2', '#567580', '#2F1F1F', '#771E19', '#BA3D3A', '#7F2E2D', '#2C1B17', '#3F3AD', '#987F2F', '#DDC26F', '#FBE7A9', '#FCECB4', '#F3E2A8', '#FBE7A9', '#D5CB96', '#71785E', '#302F2E', '#692B29', '#CF4743', '#FD5B55', '#F65A54', '#E2534E', '#CF4E49', '#E2534E', '#F65A54', '#F65A54', '#C54C48', '#783230', '#2C1B17', '#000'],
['#C5ECFE', '#DEFEFF', '#B6DEF2', '#59727D', '#1B1010', '#3300', '#5D1615', '#3F1219', '#221510', '#5647C', '#B3902B', '#F5D36F', '#F6E19D', '#C2B589', '#847858', '#6E6143', '#746D53', '#777E72', '#72787A', '#685153', '#7F2E2D', '#BA3A33', '#F65A54', '#FE6059', '#EF5852', '#F65A54', '#FE6059', '#FE6059', '#DB504B', '#783230', '#10F10', '#000'],
['#C5ECFE', '#DEFEFF', '#BDE2F4', '#71828B', '#282D30', '#1B1010', '#201A1B', '#DA14', '#1C17E', '#6E591C', '#D5B24B', '#FFEF8E', '#F3E2A8', '#98937C', '#373939', '#10F10', '#373939', '#88949A', '#B4C7CD', '#7C8E94', '#47393A', '#7A2A26', '#CF4743', '#EF5852', '#E9554F', '#E2534E', '#E2534E', '#EF5852', '#CF4E49', '#6F2F2D', '#151312', '#000'],
['#C5ECFE', '#D6FEFF', '#C0E8FC', '#98B3C2', '#728693', '#647981', '#4C6772', '#1B2C33', '#151312', '#685F3D', '#D5CB96', '#FFFFCE', '#E5E9D1', '#A5AFAD', '#66757E', '#485665', '#647981', '#B1C0C6', '#D9EEF0', '#B3D0D3', '#71828B', '#5F4446', '#712524', '#852723', '#833532', '#833532', '#783230', '#783230', '#6F2F2D', '#3E211F', '#ACD', '#000'],
['#C0E8FC', '#D1FBFF', '#C5ECFE', '#BDE2F4', '#BDE2F4', '#C0E8FC', '#A5C7D8', '#5D6C75', '#373939', '#6A7476', '#C3D7DE', '#E6FBFF', '#DBF2FD', '#CBE4F0', '#C2DEEC', '#BFD8E6', '#CADEE9', '#D5EAF4', '#E6FBFF', '#E6FBFF', '#C3D7DE', '#7C8488', '#373132', '#17B9', '#1B1010', '#271715', '#361D1C', '#361D1C', '#361D1C', '#2F1F1F', '#271715', '#000'],
['#C0E8FC', '#D1FBFF', '#C5ECFE', '#CBF2FF', '#D6FEFF', '#DEFEFF', '#CDF2F6', '#9BB5B9', '#7C8E94', '#94ACB8', '#C6E5F5', '#D4F2FE', '#D4F2FE', '#DBF2FD', '#E6FBFF', '#EFFFFF', '#E6FBFF', '#E2F5FC', '#DBF2FD', '#EFFFFF', '#E9F6FA', '#B4C7CD', '#647981', '#1B2C33', '#ACD', '#3810E', '#762E2B', '#8A3835', '#8A3835', '#9D3E3A', '#913A36', '#000'],
['#C0E8FC', '#D1FBFF', '#C5ECFE', '#C5ECFE', '#CBF2FF', '#CBF2FF', '#CDECFD', '#C6E5F5', '#C2DEEC', '#C6E5F5', '#CDECFD', '#D4F2FE', '#D4F2FE', '#D4F2FE', '#DBF2FD', '#DBF2FD', '#DBF2FD', '#DBF2FD', '#DBF2FD', '#DBF2FD', '#E6FBFF', '#E6FBFF', '#BED3DC', '#647981', '#302F2E', '#622221', '#BA3D3A', '#D74B46', '#D74B46', '#DB504B', '#CF4743', '#000'],
['#C0E8FC', '#D1FBFF', '#C5ECFE', '#C5ECFE', '#C5ECFE', '#C5ECFE', '#CDECFD', '#D4F2FE', '#D6FEFF', '#D4F2FE', '#D4F2FE', '#CDECFD', '#CDECFD', '#D4F2FE', '#D4F2FE', '#DBF2FD', '#DBF2FD', '#DBF2FD', '#DBF2FD', '#DBF2FD', '#E2F5FC', '#EFFFFF', '#E9F6FA', '#B9CACE', '#838689', '#754B4B', '#7F2E2D', '#86211C', '#852723', '#8C2B26', '#852723', '#000'],
['#C5ECFE', '#D6FEFF', '#CBF2FF', '#C5ECFE', '#CBF2FF', '#CBF2FF', '#CBF2FF', '#D4F2FE', '#D4F2FE', '#D4F2FE', '#D4F2FE', '#D4F2FE', '#DBF2FD', '#DBF2FD', '#DBF2FD', '#DBF2FD', '#DBF2FD', '#DBF2FD', '#E6FBFF', '#E6FBFF', '#E6FBFF', '#E6FBFF', '#EFFFFF', '#EFFFFF', '#D0E0E7', '#8A898E', '#47393A', '#2F1F1F', '#392B2B', '#403131', '#392B2B', '#000'],
['#D1FBFF', '#DEFEFF', '#D6FEFF', '#D6FEFF', '#D6FEFF', '#D6FEFF', '#D6FEFF', '#DEFEFF', '#DEFEFF', '#DEFEFF', '#DEFEFF', '#DEFEFF', '#E6FBFF', '#E6FBFF', '#E6FBFF', '#E6FBFF', '#EFFFFF', '#EFFFFF', '#EFFFFF', '#EFFFFF', '#EFFFFF', '#EFFFFF', '#F8FFFF', '#FFFFFF', '#F4F8F8', '#BFC8CA', '#87999F', '#71828B', '#7C8E94', '#87999F', '#7C8E94', '#000'],
['#C0E8FC', '#C5ECFE', '#C0E8FC', '#C0E8FC', '#C5ECFE', '#C5ECFE', '#CDECFD', '#CDECFD', '#CDECFD', '#CDECFD', '#CDECFD', '#CDECFD', '#D4F2FE', '#D4F2FE', '#D4F2FE', '#DBF2FD', '#DBF2FD', '#DBF2FD', '#DBF2FD', '#DBF2FD', '#DBF2FD', '#DBF2FD', '#E2F5FC', '#E6FBFF', '#E9F6FA', '#DEEDF3', '#D0E0E7', '#CCDDE1', '#D0E0E7', '#D6E3E9', '#D0E0E7', '#000'],
['#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000'],


					/*
						['','','','#b9dd93','#b9dd93','#b9dd93','#b9dd93','#b9dd93','#b4d98d','#add484','#a5ce7c','#a0ca75','#a0c973','','',''],
						['','','#acd383','#e0fbd9','#e3fde0','#e6ffe5','#e4fde0','#dffbd9', '#daf7d1', '#d5f4c7','#cff0bd','#caebb3','#c3e7a8','#acd383','',''],
						['','','a0c973','#defad7','#e2fcde','#cd6b6b','#cd6b6b','#cd6b6b','#cd6b6b','#cd6b6b','#cd6b6b','#cd6b6b','#cd6b6b','#cd6b6b','#cd6b6b',''],
						['','','#9fc974','#dbf7d2','#cd6b6b','#f9eded','#fcf6f6','#fcf6f6','#f8ecec','#f7e7e7','#f5e3e3','#f3dddd','#efd1d1','#eecece','#e6b6b6','#cd6b6b'],
						['','#2a5699','#2a5699','#2a5699','#2a5699','#2a5699','#2a5699','#2a5699','#2a5699','#2a5699','#2a5699','#b9a1a1','#ebc3c3','#e6b6b6','#eac0c0','#cd6b6b'],
						['#2a5699','#a4bdec','#c1d3f5','#c1d3f5','#9bb8f2','#90b0ef','#86a8ed','#7da0e4','#6a93db','#5b88e6','#4c7eca','#2a5699','#ebc3c3','#e8bcbc','#e4b2b2','#cd6b6b'],
						['#2a5699','#b6cbf2','#ffffff','#ffffff','#ffffff','#c9d7f2','#7099ee','#5885e4','#5381d9','#4c7eca','#4f7dd8','#2a5699','#beb2b2','#e4b2b2','#e8bcbc','#cd6b6b'],
						['#2a5699','#abc3f5','#e4eaf5','#ffffff','#ffffff','#ffffff','#ffffff','#90b0ef','#5381d9','#4676da','#467aca','#2a5699','#c5c5c5','#edc9c9','#e2aaaa','#cd6b6b'],
						['#2a5699','#90b0ef','#638ee9','#638ee9','#9bb8f2','#edf0f6','#ffffff','#ffffff','#90ade4','#467aca','#4676da','#2a5699','#c5c5c5','#fbf3f3','#dfa3a3','#cd6b6b'],
						['#2a5699','#a4bdec','#ffffff','#ffffff','#c1d3f5','#7499e5','#c1d3f5','#ffffff','#ffffff','#608bd7','#3c74ca','#2a5699','#c5c5c5','#ffffff','#dc9898','#cd6b6b'],
						['#2a5699','#9bb8f2','#ffffff','#ffffff','#ffffff','#e4eaf5','#638ee9','#edf0f6','#ffffff','#b6cbf2','#336cc9','#2a5699','#c5c5c5','#ffffff','#e7b9b9','#cd6b6b'],
						['#2a5699','#6a93db','#5381d9','#7da0e4','#f4f7fc','#ffffff','#b6cbf2','#90ade4','#ffffff','#ffffff','#2d69c3','#2a5699','#c5c5c5','#ffffff','#e6b6b6','#cd6b6b'],
						['#2a5699','#84a5e7','#ffffff','#90ade4','#7499e5','#ffffff','#f4f7fc','#3c74ca','#ffffff','#ffffff','#5683c6','#2a5699','#b28f8f','#e6b6b6','#d27c7c','#cd6b6b'],
						['#2a5699','#6a93db','#ffffff','#f4f7fc','#3c74ca','#ffffff','#ffffff','#3c74ca','#d9e3f7','#ffffff','#4c7eca','#2a5699','#a25d5d','#cd6b6b','#cd6b6b',''],
						['#2a5699','#3c74ca','#608bd7','#6a93db','#3c74ca','#6892d0','#608bd7','#2b65c2','#467aca','#4c7eca','#235daf','#2a5699','','','',''],
						['','#2a5699','#2a5699','#2a5699','#2a5699','#2a5699','#2a5699','#2a5699','#2a5699','#2a5699','#2a5699','','','','',''],*/
					]
				},
			numbers: {
				0: [
					[1,1,1],
					[1,0,1],
					[1,0,1],
					[1,0,1],
					[1,1,1]
				],
				1: [
					[0,1,0],
					[1,1,0],
					[0,1,0],
					[0,1,0],
					[1,1,1]
				],
				2: [
					[1,1,1],
					[0,0,1],
					[1,1,1],
					[1,0,0],
					[1,1,1]
				],
				3: [
					[1,1,1],
					[0,0,1],
					[0,1,1],
					[0,0,1],
					[1,1,1]
				],
				4: [
					[0,0,1],
					[0,1,1],
					[1,0,1],
					[1,1,1],
					[0,0,1]
				],
				5: [
					[1,1,1],
					[1,0,0],
					[1,1,1],
					[0,0,1],
					[1,1,1]
				],
				6: [
					[0,1,1],
					[1,0,0],
					[1,1,1],
					[1,0,1],
					[1,1,1]
				],
				7: [
					[1,1,1],
					[0,0,1],
					[0,0,1],
					[0,1,0],
					[0,1,0]
				],
				8: [
					[1,1,1],
					[1,0,1],
					[1,1,1],
					[1,0,1],
					[1,1,1]
				],
				9: [
					[1,1,1],
					[1,0,1],
					[1,1,1],
					[0,0,1],
					[1,1,0]
				],
				'+': [
					[0,0,0],
					[0,1,0],
					[1,1,1],
					[0,1,0],
					[0,0,0],
				],
				'k': [
					[1,0,1],
					[1,1,0],
					[1,1,0],
					[1,0,1],
					[1,0,1],
				]
			}
		};
		
		this.timer = setInterval(this.poll, 500);
		this.poll();
		
		return true;
	}
	
	this.drawUnreadCount = function(unread) {
		if(!self.textedCanvas) {
			self.textedCanvas = [];
		}
		
		if(!self.textedCanvas[unread]) {
			var iconCanvas = self.getUnreadCanvas();
			var textedCanvas = document.createElement('canvas');
			textedCanvas.height = textedCanvas.width = iconCanvas.width;
			var ctx = textedCanvas.getContext('2d');
			ctx.drawImage(iconCanvas, 0, 0);
			
			ctx.fillStyle = "#fef4ac";
			ctx.strokeStyle = "#dabc5c";
			ctx.strokeWidth = 1;
			
			var count = unread.length;
			
			if(count > 4) {
				unread = "1k+";
				count = unread.length;
			}
			
			var bgHeight = self.pixelMaps.numbers[0].length;
			var bgWidth = 0;
			var padding = count < 4 ? 1 : 0;
			var topMargin = 2;
			
			for(var index = 0; index < count; index++) {
				bgWidth += self.pixelMaps.numbers[unread[index]][0].length;
				if(index < count-1) {
					bgWidth += padding;
				}
			}
			bgWidth = bgWidth > textedCanvas.width-4 ? textedCanvas.width-4 : bgWidth;
			
			ctx.fillRect(textedCanvas.width-bgWidth-4,topMargin,bgWidth+4,bgHeight+4);
			
			var digit;
			var digitsWidth = bgWidth;
			for(var index = 0; index < count; index++) {
				digit = unread[index];
				
				if (self.pixelMaps.numbers[digit]) {
					var map = self.pixelMaps.numbers[digit];
					var height = map.length;
					var width = map[0].length;
					
					ctx.fillStyle = "#2c3323";
					
					for (var y = 0; y < height; y++) {
						for (var x = 0; x < width; x++) {
							if(map[y][x]) {
								ctx.fillRect(14- digitsWidth + x, y+topMargin+2, 1, 1);
							}
						}
					}
					
					digitsWidth -= width + padding;
				}
			}	
			
			ctx.strokeRect(textedCanvas.width-bgWidth-3.5,topMargin+.5,bgWidth+3,bgHeight+3);
			
			self.textedCanvas[unread] = textedCanvas;
		}
		
		return self.textedCanvas[unread];
	}
	this.getIcon = function() {
		return self.getUnreadCanvas().toDataURL('image/png');
	}	
	this.getUnreadCanvas = function() {
		if(!self.unreadCanvas) {
			self.unreadCanvas = document.createElement('canvas');
			self.unreadCanvas.height = self.unreadCanvas.width = 16;
			
			var ctx = self.unreadCanvas.getContext('2d');
			
			for (var y = 0; y < self.unreadCanvas.width; y++) {
				for (var x = 0; x < self.unreadCanvas.height; x++) {
					if (self.pixelMaps.icons.unread[y][x]) {
						ctx.fillStyle = self.pixelMaps.icons.unread[y][x];
						ctx.fillRect(x, y, 1, 1);
					}
				}
			}
		}
		
		return self.unreadCanvas;
	}
	this.getUnreadCount = function() {
		matches = self.getSearchText().match(/\((.*)\)/);
		return matches ? matches[1] : false;
	}
	this.getUnreadCountIcon = function() {
		var unread = self.getUnreadCount();		
		return self.drawUnreadCount(unread).toDataURL('image/png');
	}
	this.getSearchText = function() {
		return document.title;
	}
	this.poll = function() {
		if(self.getUnreadCount()) {
			self.setIcon(self.getUnreadCountIcon());
		} else {
			self.setIcon(self.getIcon());
		}
	}
	
	this.setIcon = function(icon) {
		var links = self.head.getElementsByTagName("link");
		for (var i = 0; i < links.length; i++)
			if (links[i].type == "image/x-icon" && 
			   (links[i].rel == "shortcut icon" || links[i].rel=="icon") &&
			   links[i].href != icon)
				self.head.removeChild(links[i]);
			else if(links[i].href == icon)
				return;

		var newIcon = document.createElement("link");
		newIcon.type = "image/x-icon";
		newIcon.rel = "shortcut icon";
		newIcon.href = icon;
		return self.head.appendChild(newIcon);
	}
	
	this.toString = function() { return '[object WeewarFavIconAlerts]'; }
	
	return this.construct();
}