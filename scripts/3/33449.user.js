// ==UserScript==
// @name			Google Bump
// @namespace		http://userscripts.org/scripts/show/33449
// @description		Adds some functionality to the Google web search. Main features include Multisearch, Video result extraction, Wikipedia definitions and links, and some clutter cleanup by. All options can be turned off.
// @version			2.12.20110831
// @include			http://www.google.tld/
// @include			http://www.google.tld/#*
// @include			http://www.google.tld/search?*
// @include			http://www.google.tld/webhp?*
// ==/UserScript==

/*
	Author: KTaShes
	Date: Aug 31 2011
	
	Code can be found on GitHub @ http://github.com/ktsashes/Google-Bump
	
	This code uses juicer to compile from several different javascript files.
	Juicer (C) Christian Johansen - http://cjohansen.no/en/ruby/juicer_a_css_and_javascript_packaging_tool
*/
var version = "2.12";

var image_store = {
	
	plus_minus :		"data:image/gif;base64,R0lGODlhEAA8A" +
						"IABAP%2F%2F%2FwAAACH5BAEAAAEALAAAAA" +
						"AQADwAAAI7jI%2Bpy%2B0Po5y0RoABzPrxn" +
						"TXciCEkaZ7foYbM6sCiG9PWjef6zvf%2BDw" +
						"wKh5NWiWXsGJLKQJIIjUqnvQIAOw%3D%3D",
	
	clear_box :		 	"data:image/gif;base64,R0lGODlhFAAeA" +
						"IABAKG57QAAACH5BAEAAAEALAAAAAAUAB4A" +
						"AAIwjI%2Bpy%2B0Po5y02ggAy5unrHWhAT5" +
						"lcJqgh6UtC61wc7qLayN5To6ffwkKh8Si8V" +
						"gAADs%3D",
	
	search_glass :	  	"data:image/png;base64,iVBORw0KGgoAA" +
						"AANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAA" +
						"GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJ" +
						"lYWR5ccllPAAAAL9JREFUeNpiYICC%2F%2F" +
						"%2F%2FGwLxQSD%2B8h8CQPQRkDgDPgBUkAH" +
						"Ev%2F9jByDxDFwaQTb%2Bgiq8DcQxQCwHpW" +
						"9DxX9hdQFQcD9UwV0cht%2BFyu%2FHJvkVK" +
						"hmAQ3MAVP4rNsm%2FUElJHJolofJ%2F0eWY" +
						"gPgHlG2MIzxh4j%2BwmXyQSD8fxCZpihRNo" +
						"NCNAGIRKH0bKcpyyYlnZLAalwGm0BT1Darw" +
						"G5RfQpQBeFLgOqobwESsZkZGxiAgtR5JiJm" +
						"BVAB1wToQGyDAAMRybMgDdvwFAAAAAElFTk" +
						"SuQmCC",
	
	settings :		  	"data:image/png;base64,iVBORw0KGgoAA" +
						"AANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAA" +
						"GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJ" +
						"lYWR5ccllPAAAAZVJREFUeNrs1rtLAzEcwP" +
						"E%2BLFixQkeFLqJQEHHR0ccmIuriX%2BDkI" +
						"E7ugoPOjiIqigiK0EEQdCuddBFFEBEsPsBB" +
						"SuujgvRxfiMplJC7trGg4AU%2BHHf3I7%2F" +
						"%2BkktSr2VZnt9oXjexm%2FivJG7CEPoRRg" +
						"5pXCCGQtU9icRV8mHb0rdDBGroy%2BOrodo" +
						"ijmyqOpXVz2EHoXpUvIhZWVEn3jUVPyKBjL" +
						"yPo8Wp30pJJ8s6v8azVX1bM00sfvGNZd7y6" +
						"DOZ4xF02LxLYQlTWEFeE%2BPHjMkcr9pU8o" +
						"JBJVZ8A0UlTozWsclQ92AMJ0qHu5rYIO6Uu" +
						"IjpcjrHAR40w6y2T2SVZ%2BMYNRnqeVziVa" +
						"nkSrNUevFhMzU1Vyy2wi7NZhDFFrrRjAFsI" +
						"KjpI2dScTuyDstFvLtHwSEmYVLxLfYrHBgR" +
						"OPWxbLplRpEqq%2BDMocKkrLA0SptoMN0yh" +
						"Qn5kS3I%2B3WbxNPy%2FTD20PiTvbokLK%2" +
						"BteLJJHENIxvnrdSym5bUNSbzJY%2FJ7tpC" +
						"R6zggnxXc%2F1xu4v%2BX%2BEuAAQDZc6PF" +
						"EgS%2FKAAAAABJRU5ErkJggg%3D%3D",
	
	multi_add :		 	"data:image/png;base64,iVBORw0KGgoAA" +
						"AANSUhEUgAAACgAAAAeCAYAAABe3VzdAAAA" +
						"GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJ" +
						"lYWR5ccllPAAAAbBJREFUeNrsV8lOAkEQrZ" +
						"6ZoOwuBOJBTTTBeMJEw8lEj3r0h%2FwlT36" +
						"AiQfXAyeXxLhwEVxxFALO0HY1FolkBoRZ4D" +
						"Av6RRdXZk83lRX1TDOOYwyFBhxBAQDggHBH" +
						"tC6nDmtP7ti3Yp1Ida52wTb5F51E04vv%2B" +
						"DlwwTD5KCpDKbiKuSXo9IO9RVfF%2Buwf1S" +
						"B0pshySHQlt8N6cfzob1iVO5EKIeNJh5RIb" +
						"cYhsykJskWbmqgV1vnqQnNUyVtFTy7qkITy" +
						"YUV2FlPwsJMCKLjirS4Rz%2BeY5wD8F65bk" +
						"vwuWJIu7YUsTwnP8X5rqDZbP2xVNI6C8hPc" +
						"b4TVBUmLd5eK5Cf4nwnOJ1oJT6WGCuQn%2B" +
						"L6zLnO3LPz2xNczUaACXH0WhP2Ditw99iA%" +
						"2BjeXFvfoR8xnQp4qyGwGVk518Pi31HQDkt" +
						"zIxQbpJPRkNlChzs6OwXY%2BAWlR6yjX0OI" +
						"eFSbclxpwUPj0vRe3b%2BuWIGmFJ9FRHsqN" +
						"PyQtlBzeNLO5EoO5dMhTJR2PW50k%2B%2Fw" +
						"GY93yz7V5kEjiwt9%2B5CDrdx50m9h%2FLo" +
						"m3LSL4JgkIBgTdwY8AAwBonKzcA4VYSgAAA" +
						"ABJRU5ErkJggg%3D%3D",
	
	multi_fill :		"data:image/png;base64,iVBORw0KGgoAA" +
						"AANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAA" +
						"GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJ" +
						"lYWR5ccllPAAAAQhJREFUeNpi%2FP%2F%2F" +
						"PwM1ARMDlQHVDWRBF1i06x2MaQzEZ4DYFYj" +
						"34DMkzk2IKBe%2Bh9Jp1PIyyKCzQBwKxIJI" +
						"4h1A%2FB%2BKz6DJ4TRQEGpgOhDfQ3NlBRA" +
						"zQjFInQsxBqZBDQK5cBaagSD2O6gLldBdyI" +
						"LDdeVQGjmRhkIjZyZSRO0mJgzToBEihOS1P" +
						"WiuvAe1kCgXglyyGimWYeF2BhpeoCC4CzX0" +
						"PTR5wQHjCM96SNkODtRl2FHC5OaTn4z4sh4" +
						"LIRu%2F%2FvhHWeGADj5%2Fp7KBH7%2F%2B" +
						"HVzlITGJEpsaRlwuZCTDUYyEvMxIrmH4wpC" +
						"RHMMIRQojOXJMZLiCkdJkw0hKUIzA4ovqBg" +
						"IEGAB1Rj50T3f%2F%2FgAAAABJRU5ErkJgg" +
						"g%3D%3D",
	
	config_tabBg :		"data:image/gif;base64,R0lGODlhAQAZA" +
						"MQAAM3Nzc7Oz%2BDg4Nra2tTU1dDQ0M3Mzd" +
						"3d3dDPz9HR0dPT0t7e3s7OztnZ2tjY2OXl5" +
						"dXV1dfX1uDg4eLi4tTU09zc3OPk5Obm5szM" +
						"zAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAA" +
						"AAAAALAAAAAABABkAAAUV4PVYkyQsRzU0Tg" +
						"QRlJIUSMAABhYCADs%3D",
	
	vid_popout : 		"data:image/png;base64,iVBORw0KGgoAA" +
						"AANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAA" +
						"AAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZ" +
						"VJlYWR5ccllPAAAAJtJREFUeNpiXL9%2BPQ" +
						"MlgAVK%2BwGxOZL4SSDeRIoB5lueuFTBBH1" +
						"k9rRBDUA3GMMCFnQZqOaT2AxGUwMCm1jQJU" +
						"AakBScRGLDAZKaTUxoCk%2FCDEFyejUaRgE" +
						"wAzZBJTfhMIRgICLHxElkFxEygAmJbY5kK7" +
						"KLiDaALDDwBrDgEG8lxwDk6MMLkGMI2YBNa" +
						"MkUH8CZFzYRmwthACDAAJ6pRbpH2M60AAAA" +
						"AElFTkSuQmCC",
	
	vid_noembed :		"data:image/png;base64,iVBORw0KGgoAA" +
						"AANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAA" +
						"AAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZ" +
						"VJlYWR5ccllPAAAAIdJREFUeNpi%2FP%2F%" +
						"2FPwMlgImBQkCxASwgImXKF3RxkL8YCYnNy" +
						"eHB6gJ8gfKfkBdgChixaGbEZggLLs1zciU3" +
						"QPkBQLwhZfLzAKjcf2TvMBFh8waoIVhdgi8" +
						"WAtAMwRuN2PyHbjNWr7KgOQ3uP6if0V2C4V" +
						"UmYkIaXzgx4YkuBmLkGId%2BZgIIMAA%2Fg" +
						"yWd%2ForwUQAAAABJRU5ErkJggg%3D%3D",
	
	media_close :		"data:image/png;base64,iVBORw0KGgoAA" +
						"AANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAA" +
						"AAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZ" +
						"VJlYWR5ccllPAAAAKdJREFUeNpi%2FP%2F%" +
						"2FPwMlgImBQsACY6RM%2BQJjEnISI4iYk8O" +
						"DagBMc1qrHkiBKxCHosmtBuLds6ov%2FYcZ" +
						"gu4FmGYQ2A3VgKIZxICq%2BY%2FhBShwhSl" +
						"EotHZrljDAApC0TTsxmJBKKFYCEW3BZdmqk" +
						"QjNgNWY3E6toDFasBqLAHmis8QFiy24PIz1" +
						"oBFdgEjNJFg0wwPWPSEhO4CZEPQQSpyUoZr" +
						"GPDcCBBgANKNMbOvj7dYAAAAAElFTkSuQmC" +
						"C",
	
	image_slideshow :	"data:image/png;base64,iVBORw0KGgoAAA" +
						"ANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAA" +
						"GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJl" +
						"YWR5ccllPAAAAGtJREFUeNpi%2FP%2F%2FPw" +
						"MlgImBQsACIlKmfIHxiXUOI4iYk8MDMQCbJB" +
						"7wn1gv%2FCclDP7j0PAfj%2BH%2F0V3ASIJL" +
						"GEmNhf%2BURiMjJQYwEpuQ%2FpOg%2BT9KQk" +
						"JS%2BJ9ImxnRDSA5%2FuEmDXhmotgAgAADAF" +
						"GQFx04us8gAAAAAElFTkSuQmCC",
	
	image_left_arrow :	"data:image/png;base64,iVBORw0KGgoAAA" +
						"ANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAA" +
						"GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJl" +
						"YWR5ccllPAAAAF1JREFUeNpi%2FP%2F%2FPw" +
						"MlgImBQkCxASwwRsqUL%2BhyML8xYtM4J4cH" +
						"rwv%2BU%2BIFZM2MpBpAkmaUMMDibELeYKRu" +
						"LEBNJNkLTNicRUpMMOHyG7GGMOELIGIA49DP" +
						"TAABBgBMsBIfaeHnDgAAAABJRU5ErkJggg%3" +
						"D%3D",
	
	image_right_arrow :	"data:image/png;base64,iVBORw0KGgoAA" +
						"AANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAA" +
						"AAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZ" +
						"VJlYWR5ccllPAAAAFpJREFUeNpi%2FP%2F%" +
						"2FPwMlgImBQkCxASwwRsqUL7jUwPzIiCw4J" +
						"4eHZBf8J9cLjPgMIdYFOA1hIeREPN5hpG4s" +
						"oIcygUBkJDUM%2FuOyiIkSzaSGAVYvMg79z" +
						"AQQYACovRIfeUjOIwAAAABJRU5ErkJggg%3" +
						"D%3D",
	
	image_new_tab :		"data:image/png;base64,iVBORw0KGgoAA" +
						"AANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAA" +
						"AAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZ" +
						"VJlYWR5ccllPAAAAI9JREFUeNpiTJ78mYES" +
						"wITEngbE%2F7FgfOIMjEgu%2BD8nhwfDhpQ" +
						"pXxhwiYP0syDZDhNEAdg0IwOYAZmEFBITBj" +
						"jBk23aYEy2AcR4AS%2BQ8bpKugGSxUJw9vP" +
						"ed6QZgKyZkGFMhDQTksdwAT7n0iQWYAZMx5" +
						"YKcQGo2unIXsiCSmQSacZ0mB7kMMiCCZICA" +
						"AIMAMq%2BNGdlcNHmAAAAAElFTkSuQmCC",
	
	dock_web_icon :		"data:image/png;base64,iVBORw0KGgoAA" +
						"AANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA" +
						"GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJ" +
						"lYWR5ccllPAAAB%2FlJREFUeNrEV%2FtvXE" +
						"cVPvfuy%2Fv0eu117KwTmrppXhQ1DbQIBIW" +
						"mgRCh0vBKhFBE1aCAlAhISJXSoiJRIMIilL" +
						"b0h6hFpSCKK0IU2tBIFa0SWqKqouGhVmpJk" +
						"43j3dhex%2FZ6vd7HvTPDNzP3tc4f0Lsaz9" +
						"zxzDnfOfOdc%2BYaQgh6P5%2Bw%2FLP78QU" +
						"i4Bib%2BhIZholmkOn06mfiHb98z%2B9ux%" +
						"2FKtjeYLO212Mc15JdcV%2B6yIRT9%2BDvM" +
						"M7WW0U9Nzu05LuQYpsc4o%2BAgl9%2FiDxz" +
						"QAd43NGJRyCpkmcUNApUFD%2Fc%2FFbXviQ" +
						"KP9yv0Li6OJVGIHhULLyWLnKRReTVAupW9q" +
						"W%2Beo0Tx2qxlaeSid%2BPZ8NHLTTw0j9Sj" +
						"ANHwgwgFjYCR8D7iPzSwyoVwIU3li5eDxu6" +
						"oLz%2F221ng%2Ba5BNfdkfqHXRyC2qBR%2F" +
						"OJwFqDH64TK32qxnT7Duciu%2Fa35d95psA" +
						"8RffC8K3%2BFoANplCu3%2B48IdfXJn52f5" +
						"m83UFpjt9N8UiN2G7ja3hznMMEXUnx6k7Ua" +
						"CW1aJqvQowV2m%2B%2Fsv%2BZPxrJwDi8JN" +
						"7U%2Fe76%2B9%2B%2BIseHDMoyOIWNtr0gY" +
						"GjJy5N3Le%2FunBGvduYr9XPUPHKDipV9nW" +
						"cpXzymTYlo5OUjKeoL9NL1w%2BuosHcWoqE" +
						"ctRovQjDiofAsz9S4LzdI1AAuBQltAfWDD0" +
						"7Upx46K6F5nvqXR6LhdZolykcXqWOgQu9ng" +
						"ttRzzWBS%2BsJsEZjkKo%2FxV6v0EbVh2id" +
						"OKj4NR1WCt23PvYwsNLo0ABENgkhd48fHp7" +
						"cXLk%2B7XGO55i2WxbA8mmvg6rhkiGLgTqH" +
						"hstGyDi2xAtQ5C4DMTcDC4VsHYZDQ9ins5i" +
						"zXnssR%2B459Hadp8HDge4zgXRqbljT1Wqr" +
						"ygOSDKq3tCEjBn9IN6NCqgy0fC5PTZtUyGX" +
						"pkzyXs%2FFkgMt6yzZ1n8pm2jSxYki2SJCq" +
						"fi%2Bo93pp09Wa%2Fe0%2FSPAGTAuvlOaHu" +
						"1RFnNbnb3bJAdSyS1QHlYWcwc0U%2FsIioi" +
						"Kk4ym5jgsbYAvJ2i29gjC8nXsXVQwB3ODxF" +
						"gdxPx1n83nDgrB%2FSNgQoQg96BUwKDcttv" +
						"E0KTbbdZWRzBfP6eVKsVaORfkHYWNVplv0z" +
						"%2Fe2kPlqy%2BqvVIWAy9ki0ak9UmMZ6nZe" +
						"vVQMvl01PeAoK2M83w8eqMinoWExChGhfxB" +
						"%2BtDwGVrR%2F2PMtaCEKW8pxdITeHE9Iec" +
						"Xm%2F%2BhheYVujDxHl2uXFKe1AB035PMqm" +
						"TXbL2Rwv4tvge42CoFpBO3KQAMLh%2FM7aa" +
						"%2B7i%2FDfTHKpDbT8PKjIKsJD3C40vGEIM" +
						"cb%2Bn2h%2BW%2BHuDZNzk3iWIq%2BF6A4H" +
						"ApTGNxqWe%2FI%2Bc8FAWySArLpLdTf81V1" +
						"1k1rWp%2BxVMY6Xe%2BP%2FXfpkRiyoxs5F" +
						"hRXqhUany4p5UxoIF2xOP7fRJu9zY8CLm5w" +
						"A%2BO6gR%2FRUP579O7lA0BaRVZ7Da59G5t" +
						"rYPmtlEtvc4pMZ6mRo0jkgwDxMSSfv5PJZS" +
						"SFqHS1hLkY9aR6EDgMoRl2uDU%2F7AGwOXV" +
						"7hQJFyDAyZIa66c1378TCWV0REYpTM6N0w4" +
						"ok0u4nO3K6zmsaRk%2F3HqpPvgHAdYBgKFx" +
						"RujRVpDSypBvSCgC3Uh4AxnkgtRqI2Ydocu" +
						"bPum7JTaokS8KZdLH8Q2S4v8K6pFbrOcJJr" +
						"UaBluefgdtnKBIexLoM1Zt%2Fw3H8nnozOX" +
						"ibqSNiPERBDlSZw2ZbWDRTPeUVCy5JR0wxn" +
						"iEKmkjJ5ZnfYB3X%2BYO5XOAOGQHazCNtrw" +
						"GktJLZFdsMgq5WHGgzHd6cx%2Bc9ADiC8%2" +
						"BCJEsBZiK4vPKEsEoGao9OuBlGrv4l1WrEd" +
						"UKzfddNjTVD5vmgtUxHWaDXQS829%2FwtkQ" +
						"vEvXxCnrujNFIut8a4ORiB3yyycTW9XiYc5" +
						"NcSLCgmS6WZzHRmql3MiR%2FVWnWqNGrSul" +
						"EdwLuABcZJ5grQlidhG7%2FJEAQhdsbXIF9" +
						"u0%2BwPhaC%2Fp3aypQAjtqVa7SdXFOeSCT" +
						"fCCOBkMw5egoyJLu6soEl7pXaAC9lM%2Bu1" +
						"cJNMSSe54qUIGgFJ07W%2BCOPIJqfZ4G8p%" +
						"2BeBcCXArUA3BB0hDluk9aZKKWaB4HSGepF" +
						"2f2UWuMRz3M%2FeUfoetHvocAqw%2Foq5K7" +
						"DXXLNz4ulje1gFEg2HwGqkgIAITIXuBdI1%" +
						"2Fp04gtIxyGtTHCHtNxztQLDdIFy5eixvPT" +
						"M0FR1Cle7vRUEw69kdgwUI0WmNmTt05ZIve" +
						"nghRlPiFKpnUq56yVNQPKU6zmfkF65tsvUa" +
						"JwlI%2FQZikQ%2FsufC%2BIaGTM1LAAi6cH" +
						"ntcfQ%2FUXlJxD3L5S8ZvxNZbUXAOkchJ%2" +
						"F9d%2BCXaBylovvYsNK1Hlnxg5MLYuuO6Qg" +
						"buA%2B5CmfGK4%2BsexHiUzLTDfUN5IJP6l" +
						"m9xUBE5FxQeLNGdQMjAZbX3iT9dKt1yn2eU" +
						"EJ0e0BM66MbK63eSiB5JxD%2Bv5qLRjSDOW" +
						"qVEuEqdy6dvuTMP9nMeBGhQOrn78Hj5w18J" +
						"fhUZwQ8TKUgsqXDlyU8cKAy8dTaR2PVYq%2" +
						"FXagHDDTPgfOCpCOHWEm7bOuTISlYDiwPjE" +
						"%2BlHDYZKrQzjvhhS84bvj1FFXDafTY0mGv" +
						"WgHZRqga77yOu6nblfBvhFMP45xoyOhGNpg" +
						"%2Bbz9yJDziWNc%2B9UayCkNKQx7RqDodrx" +
						"vhZfvMGRYCNrkWPpP9XFq0MsAfQrj07TUMe" +
						"Qb5lR93wPv5%2FN%2FAQYAS%2B7Xa8YMGm4" +
						"AAAAASUVORK5CYII%3D",
	
	dock_video_icon :	"data:image/png;base64,iVBORw0KGgoAA" +
						"AANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA" +
						"GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJ" +
						"lYWR5ccllPAAAAoJJREFUeNrsV8ttGzEQ5Q" +
						"iKXEIqyMnQ0VWkBOtg3XVRBYYLMDYHFWDAS" +
						"AmuwhcDQopIC%2FzMmOQMucMVDQUIJF20gn" +
						"ZHy9G8N1%2BCxlz4AiX%2FjN%2B7M%2BG%2" +
						"Bx%2B9bEuYafL%2FfP54DfblcPon4NhPhbO" +
						"DpEqw7HYF6bbfbk4IPw9D8nl26CK8ErgSuB" +
						"OocwBAMZYkM0WRaA6XXeW4TxHtUyLJaNvy6" +
						"P%2BzVe8aBQwLOewPROKEynMkwuBFgEhQqN" +
						"lDZJ7XBaEIkLKINFwlALwJeCGBSzKARHkgZ" +
						"pmqINNjE8%2FQXBCZmyrMoR8XgfD8F3rscG" +
						"kKMd2AYYotQOQkJSYnYbLxvokGHeXDeNptw" +
						"JWAzMw4x6aTl3zCJxJHKOljHmhNrXZ%2BAs" +
						"1Z0aimyWvaYDUhAVI2UhID4STXnpGvBSBTj" +
						"x3nXT4HNBDgFTAAk2qiAaQTH5BcINNUOKoC" +
						"m6Qxgx4Aj0C1C62w2hzqpkvtqtFotZEAZIy" +
						"aEY%2BFz4ERPvEiOdgk4YYZIUt3jH7VHUEX" +
						"WQ%2BkUEEQsLRsFkqcm5J1rimTsAufYRxkE" +
						"3OfUdFFusTSEwDRDq9SCRDl3C4xGZFgw5Zz" +
						"qbgpicSQvUg3QdKhIW5KZtN6k8MtMIBoJjl" +
						"0obei%2BKMIQB1HSCSjsgQsH1MylkprstbR" +
						"BJRbrB3ldFyBUgjxdvA9fpCAvcAqoupnAoG" +
						"nu4n3SAhxburZajTo7gbVUmWgITinpCAQms" +
						"F6vT7r7hYDHt%2BPXj%2BFAfv34ddrtuGH1" +
						"DczvP4O5v92a2QLkHa99f3npGnqez%2F8Jc" +
						"LVaHSdgFsbc%2F5DzwUKSfsOPvw8PfcP%2F" +
						"eTbMR7PdbneW09Fms3kq58OLH04vfn0KMAD" +
						"erqAZMvlLrgAAAABJRU5ErkJggg%3D%3D",
	
	dock_image_icon :	"data:image/png;base64,iVBORw0KGgoAA" +
						"AANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA" +
						"GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJ" +
						"lYWR5ccllPAAAA%2FRJREFUeNrsV0tyE0EM" +
						"lcZOHH8WyYIUqcAJgKpscgoORXEolsAB2OY" +
						"KBkLl51RhZzwzEmq1uqd7Mh6qsgAWdOxk0u" +
						"7Pk%2FT0JCPYYGZ46kDEJ%2B8t4C%2BPFPp" +
						"beZ%2F%2FoXu%2FLJfLD3VdwziZPCeid7t2" +
						"cIbW%2F8cdC%2FrXd1cxFMXofVVVAqDJAIC" +
						"jwZvXr3Q9yy%2FUvfKL0b30GPaf%2BMUAcX" +
						"4%2BX8DzkxNdvt78hG%2FfvoMY5Ahi%2Bzz" +
						"ki4sL3VfXFfQAIGjkjaTMAmK%2FyV0CZADs" +
						"QvC49G8hP0dHR8DUQN0QLJdfZS%2F7vWGRc" +
						"ZwJDIBbm4dAB7lbnZXkLvDoQZ%2F9IW6GsD" +
						"3QjYPpBPb2xtDI5Tc31%2BBi6y33ADBZzPb" +
						"sAFDzyAOsk32R6yWDPU8ODtRyF5a725V3%2" +
						"FS5uWOhIrHde6gFAHicaB8ItidXqVU8UMVQ" +
						"OGY0U%2BLYsoaxKwICQGQJdglQED5AByQHI" +
						"T0PNcNLy40k31QiAzcODGdDNcoZdgpcDkL0" +
						"OAPY4n41I2JqiXmFTQuf2uqrVE5woI3YSsm" +
						"vA%2BNE1YgHttNjSwUISssUBaCSm22orBlC" +
						"vq9waB5cGPSAuqOUA7FWfrrT4PJzNZjrnMq" +
						"AUDjhP9KxsNaVD0HGeguBjqAbaZjQt8L5uD" +
						"ZPHQt6HR4eaz9ww3K9WoiMtWRG9bKV7uvmR" +
						"h0A8QBkJe1mnY1QU8Oz4WPJ%2FT0FfX19D5" +
						"fL%2FN2OQhKRZQB0KcpRl543ZdAoLkd3FYg" +
						"HFuFDi3d7digDdqsUZ8FQ2LR%2BZBrPAC5H" +
						"LgqnEdj6fwWg0hv3Jnogtwnh%2FX93ujCgf" +
						"Sliv1rC6X0G9rSzW3N6ZynWA5GoK01AIPFt" +
						"PT0%2Fl8rm6a7PZwOruHqptqblebrcClHJa" +
						"JpEK0h8VwAoIBgkaDIF8%2BOLlC5hODvSyy" +
						"8sfIq032SHQHgUAmFRIw4B58UGMgqjn0JAO" +
						"OPfsi5tdRbz8filxvdErGJPSZ9dyN8%2BTu" +
						"ZAsaJkV1EPBD4XA1wKG9XoNV1dXEXYgF1s1" +
						"ZK9ArUu18lG0lNCqpuU%2BBs8jDAuR%2B%2" +
						"FDzp4%2FRjb6Upk0JG6AAhiGmOeeWewK2BS" +
						"suHAKgOqAwyaoXW1MSagH6gsHmbkPiz7TnW" +
						"P1byzX3MSulu5SQWwpryiSuxyAi7gLqERVj" +
						"QCjbCHnOp4YMcSDmb2dhe9dvvj%2Fw7mXp1" +
						"NnZWZ8QUds5pCXIXBCLCvQEPSlcaQOSFYKe" +
						"PutRV%2Bzci20L7IkXu2D2HGGOaYfmLdSQ5" +
						"cA4kStkgrQu7awFEHiQdLOccie2Wdy25ux5" +
						"kWkQ520dxaZ2sBa0zUTKgZQ8aJ1T8AAnMhM" +
						"7Hg6tfCCmvCgIFf4bX83k%2FQH%2BDxm%2F" +
						"BBgAAM3KLqFI2NUAAAAASUVORK5CYII%3D",
	
	dock_wiki_icon :	"data:image/png;base64,iVBORw0KGgoAA" +
						"AANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA" +
						"GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJ" +
						"lYWR5ccllPAAAB2ZJREFUeNrsV1tMVFcU3f" +
						"O684KB4f1UHqM8FFRIJRZFv6pGU%2BpX%2F" +
						"fTXavyoJmixpl%2F%2B1FT90MSmRom2H02t" +
						"JrU%2BikShikAZUIQyyIAIM4IMyGOGxzxv1" +
						"z5Agwqpxjb98YTN3Jl77jlr77322ucSvR%2" +
						"F%2F81C85XwDLC0HY8LjMfv8fuXcjejoaE9" +
						"vb%2B8Tt9v9GF%2BH%2F20A%2BqysrI%2F8" +
						"fn%2FKvn37Vq1bt64wKTEpVSOpNURKUmCVw" +
						"cFBZ3Nzc8v5igrr84GB521tbb%2FhucF3Dh" +
						"E825CSkvJZRUXFT0PDQ%2FLw8LD84sULeWR" +
						"kRB4ZHZHHxsaEucfHZY%2FHDfPI7e3tth07" +
						"dpQhUKXECN8wAttgH8y%2FqdPplsFb6cLFC" +
						"x9rNJJUVXmLmh88EB7zv7mHFbguKCigLVu2" +
						"iGu2Gzdv0PFvjj%2FA6JmYmGjDtMC8pf%2B" +
						"A%2FTr3hRFqYV%2FJC4zP9%2B%2BXnU6njP" +
						"zKBw4ckBcbZWVl8ujoqIiMyzUoHzp0aNG5v" +
						"Nfc5iqYepZc5oGBAU9LS0v3hvXrc9jDqqoq" +
						"jgItXbqUpqamCBuQ1Wqlzs5OysvLEwucO3e" +
						"Orl69Srm5uZSZmUmBQICmp2fmNjU1kcvlIr" +
						"vdPmKxWPS4Hi4pKTnT399fi0cfz3nPIPSwr" +
						"jNnzlSVl5c36g2Ga8FQkIaGXGQ2mwnko6nJ" +
						"KUpNTcXi02Rtsv4dy9jYWEpKSqJNmzaRLIc" +
						"AIEgIOaWlpRM72wjANTU1Zp576tSpVoC6ic" +
						"vf5oefQ%2BKHTcNGw8LC0ouKijKCwRDFxMQ" +
						"yuzFDJoVSQWqVGhHRklKhJKRDLLB9%2B3ay" +
						"2Wxis1BIFssplSrSqNVk0BvI43bT0aNHxdy" +
						"zZ89O4cMGC80HEITxDRfMjU00q1atyg4E%2" +
						"FFRcXMzhI9Q7abUSmSJMsEgCSJpJ5cwIDzc" +
						"Jr0OhkKA1gwwLDyNjmBFgZorgxo2bhDRwtK" +
						"MXAzCsUqmM27ZvizcajXTyxEliEAUFhVRbW" +
						"0uSpKWoqChKSkyk%2BPh4AWAOQ2pqCtXV1V" +
						"EIKeAKkDQSvNfT095ekR4eDQ31tHfv3lToS" +
						"fbsni%2BlgBH5UO%2FxCP8y1D5NTk6Szxeg" +
						"zVs206NHj8QkSZLIaAwjMF0AOHiwjJgru3b" +
						"tIpQbyZwC%2FAUQCY6ao6%2BX9uzZQ6gg8W" +
						"zBmjXpDofDNL%2FUXxIJr9erTUhMjOLcMYs" +
						"5AgGfj5YsWYLF%2BigEXqhUSkK1iLz6cC8I" +
						"0jHxOC2QYZEGP36HOIErKrEug8vIyCC9Xq9" +
						"FGiT8ZFoQACucOSLSJGm1pEMIb9%2B%2BDU" +
						"8ClJOTC6K149pHgWBAeM%2BVwZ8VFecpiN%" +
						"2BKitaKVHFEuGQbG620du1asW5dfT2tXLmS" +
						"lCoVO8MVp1sQAKdDq9PKBqOewuFRY2MjvPM" +
						"BQBZBXWkCaam9VyvSEQAw1ojOTjuu%2FbRx" +
						"4yZ6%2BPChAIZGJcJe%2Bkkp1dc3UGJCAns" +
						"vAKvVauX8fV8CgDAys6b1Oj0ZDAbBAz94AG" +
						"5ROur6SVcXdcEOlZWJHLPoIG1iU04XbzI%2" +
						"BNk73QUhJ0oj7d%2B%2FWUHZ2NkpYJXTC4X" +
						"BOzZb86wAgOl7PxITLYNCLnGqRispbleTH4" +
						"mg81AseCNHA9zt3bosIsJ04eQJ88FPW8uUi" +
						"Dd3d3VR%2BuFwAcDifEcgNHVEKnbBaGxnA2" +
						"GIc6Ebdt%2Bh0BpECVsGODptY6NOdO6mnpw" +
						"fEUgiP7fYuSkBo4%2BLiUBWjIiWbt27F%2F" +
						"A4hXAFE7sqVK5QJ8mk0GhH%2BgefPe0BG72" +
						"zlvQ4A5WW7fPnyfRYSIwBwFLxeMD0YRAUEh" +
						"Q7s3r0bmwVRCf2o8WSRKl7cB674%2FcyXHD" +
						"LgOY4S2jKtWb1aKCNXR0119R1UUMf8PVWvk" +
						"HASYpRZUrIxT6fVRrG6jSGnTqeDLJkWsWhc" +
						"fBxdu3aNIiIiKD09jabBeNaF7q5uysbm3Bt" +
						"KNmxA7u%2BJSK1YsQIRUHMJ%2B0pLS79FL%" +
						"2Fll0QjwAMmuHzv29Xc6vU5EIBpeM6PBTsr" +
						"Pzxda4EJ%2FgFyDdAZC46LIyEiAdIpqCINQ" +
						"cek2NzeJ%2BWC9UMxLP1%2B6aDKZ2ufLMC1" +
						"yWnE9ffq0o7q6%2BkeWZL1B%2F9JN1gYzQE" +
						"WZo0jSaojnsHEauH2zTrS2tghQPIeleXRkt" +
						"P%2F06dP3wbHfX91MtdAxCSpoRyTCofkSQm" +
						"rhns6aUFhYyK2VcEqiiMgIkVvmB5fiOFRwa" +
						"GgIqYkUfSE%2FP49i4mI5bW4I0hdI08VXTk" +
						"WLA%2BAwQUptAAHnjEocSCx8DuCFE9GMuK5" +
						"Z2xXKmVNdaJakXkgwc8FiyQRnlrGOOIo%2F" +
						"LD6MKrow2%2FDoTQHwCEDb%2F8TpRYOFxrl" +
						"J4dSjWY5aZ26INovWy2XJn9wBI0wmofnJyU" +
						"mhO9XVP3x55Mh5hP37xTb%2FJwA8gjjl2kC" +
						"wceS%2BHV7bkRIFaj9WyfFn%2F3FQ4abDpQ" +
						"vA9oaGhus4rJzF0a6yr6%2FvCnfZd30vmDu" +
						"28Wd6Wlpa7rNnz2LAD01ycrIOYiW1tra6Ea" +
						"kAGs0UVLAZ87jWvf%2FFm9Grb0lcIng5ofF" +
						"ZfQ%2B9f9l82%2FGXAAMAH%2FQXLaHbfVMA" +
						"AAAASUVORK5CYII%3D"
	
}
/**
  *	Options object to hold both default and user configured options.
  */
function optionlist() {
	
		// Visual defaults
	this.DEFAULT_MARGS = true;
	this.DEFAULT_SUGGES = true;
	this.DEFAULT_DYM = true;
	this.DEFAULT_SIDEADS = true;
	this.DEFAULT_MOVETOP = false;
		// Wiki default
	this.DEFAULT_WIKI = true;
		// Shortcut defaults
	this.DEFAULT_SCUTS = true;
	this.DEFAULT_KEYD = true;
	this.DEFAULT_TABS = false;
	this.DEFAULT_INST = true;
		// Video defaults
	this.DEFAULT_VIDS = false;
	this.DEFAULT_VDSRCHR = "google";
		// Embed defaults
	this.DEFAULT_EMBD = true;
	this.DEFAULT_VIDCTRL = true;
	this.DEFAULT_HDVD = true;
	this.DEFAULT_FSVD = true;
	this.DEFAULT_APVD = true;
	this.DEFAULT_LPVD = false;
	this.DEFAULT_IVVD = false;
	this.DEFAULT_PMVD = false;
	this.DEFAULT_CCVD = false;
		// Image defaults
	this.DEFAULT_IMGS = false;
	this.DEFAULT_IMGPLYR = true;
	this.DEFAULT_IMGCTRL = true;
	this.DEFAULT_IMGSIZE = "large";
	this.DEFAULT_SLDSHW = true;
	this.DEFAULT_SLDKEY = true;
	this.DEFAULT_IMGLOAD = true;
	this.DEFAULT_SKIPERR = true;
	this.DEFAULT_SLDTM = 4000;
	this.DEFAULT_IMGPGS = 21;
		// Style defaults
	this.DEFAULT_STYL = "classic";
	this.DEFAULT_SOOT = false;
	this.DEFAULT_OLDSIZE = true;
		// Advanced defaults
	this.DEFAULT_DELAY = 400;
		// Classic Style defaults
	this.DEFAULT_CLCVRTHRZ = 'horizontal';
	this.DEFAULT_CLCTOPRHT = 'videos';
	this.DEFAULT_CLCBORDER = false;
	this.DEFAULT_CLCBDRCLR = "193,211,232";
		// Dock Style defaults
	this.DEFAULT_DOCKNAVSTL = 'icon';
	this.DEFAULT_DOCKBORDER = true;
	this.DEFAULT_DOCKBDRCLR = "193,211,232";
	this.DEFAULT_DOCKBGCLR = "240,247,249";
		// Media Style defaults
	this.DEFAULT_MDAIMGNUM = 14;
	this.DEFAULT_MDAEMDPOS = "left";
		// Color Defaults
			// Background Colors
	this.DEFAULT_GENBGCLR = '255,255,255';
	this.DEFAULT_SCHBGCLR = '245,245,245';
	this.DEFAULT_RESLTCLR = '255,255,255';
	this.DEFAULT_GLBARCLR = '45,45,45';
	this.DEFAULT_ADDEDCLR = '240,247,249';
	this.DEFAULT_PLYBLCLR = '255,255,255';
	this.DEFAULT_OVRLYCLR = '0,0,0';
			// Text Colors
	this.DEFAULT_RESTXTCLR = '0,0,0';
	this.DEFAULT_GBRTXTCLR = '204,204,204';
	this.DEFAULT_GBOTXTCLR = '255,255,255';
	this.DEFAULT_LNKTXTCLR = '17,17,204';
	this.DEFAULT_URLTXTCLR = '34,136,34';
	this.DEFAULT_SIMTXTCLR = '66,114,219';
	this.DEFAULT_MDATXTCLR = '0,0,0';
	this.DEFAULT_PLYTXTCLR = '0,0,0';
	this.DEFAULT_PBLTXTCLR = '0,0,0';
	
		// Search Default Object
	this.DEFAULT_SEARCHENGINES = " \
[ \
	{ \
		\"Name\" : \"Google\", \
		\"url_before\" : \"http://google.com/search?q=\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"ESPN\", \
		\"url_before\" : \"http://search.espn.go.com/\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"eBay\", \
		\"url_before\" : \"http://shop.ebay.com/items/?_nkw=\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"Source Forge\", \
		\"url_before\" : \"http://sourceforge.net/search/?type_of_search=soft&words=\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"CNN\", \
		\"url_before\" : \"http://search.cnn.com/search.jsp?type=web&sortBy=date&intl=false&query=\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"Flickr\", \
		\"url_before\" : \"http://www.flickr.com/search/?q=\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"Wikipedia\", \
		\"url_before\" : \"http://en.wikipedia.org/wiki/Special:Search?go=Go&search=\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"Youtube\", \
		\"url_before\" : \"http://www.youtube.com/results?search_type=&aq=f&search_query=\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"Digg\", \
		\"url_before\" : \"http://digg.com/search?section=all&s=\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"GameFAQs\", \
		\"url_before\" : \"http://www.gamefaqs.com/search/index.html?platform=0&game=\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"IMDB\", \
		\"url_before\" : \"http://www.imdb.com/find?s=all&x=22&y=12&q=\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"AnimeDB\", \
		\"url_before\" : \"http://anidb.net/perl-bin/animedb.pl?show=animelist&do.search=Search&adb.search=\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"Wiktionary\", \
		\"url_before\" : \"http://en.wiktionary.org/wiki/Special:Search?go=Go&search=\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"Wiki How To\", \
		\"url_before\" : \"http://www.wikihow.com/Special:LSearch?fulltext=Search&search=\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"Wiki Quote\", \
		\"url_before\" : \"http://en.wikiquote.org/wiki/Special:Search?go=Go&search=\", \
		\"url_after\" : \"\" \
	} \
] \
";
	
		// Visual vars
	this.margs = GM_getValue("margs", this.DEFAULT_MARGS);
	this.sugges = GM_getValue("sugges", this.DEFAULT_SUGGES);
	this.dym = GM_getValue("dym", this.DEFAULT_DYM);
	this.sideads = GM_getValue("sideads", this.DEFAULT_SIDEADS);
	this.moveTop = GM_getValue("moveTop", this.DEFAULT_MOVETOP);
		// Wiki var
	this.wiki = GM_getValue("wiki", this.DEFAULT_WIKI);
		// Shortcut vars
	this.scuts = GM_getValue("scuts", this.DEFAULT_SCUTS);
	this.keyd = GM_getValue("keyd", this.DEFAULT_KEYD);
	this.tabs = GM_getValue("tabs", this.DEFAULT_TABS);
	this.inst = GM_getValue("inst", this.DEFAULT_INST);
		// Video vars
	this.vids = GM_getValue("vids", this.DEFAULT_VIDS);
	this.vdsrchr = GM_getValue("vdsrchr", this.DEFAULT_VDSRCHR);
		// Embed vars
	this.embd = GM_getValue("embd", this.DEFAULT_EMBD);
	this.vidCtrl = GM_getValue("vidCtrl", this.DEFAULT_VIDCTRL);
	this.hdvd = GM_getValue("hdvd", this.DEFAULT_HDVD);
	this.fsvd = GM_getValue("fsvd", this.DEFAULT_FSVD);
	this.apvd = GM_getValue("apvd", this.DEFAULT_APVD);
	this.lpvd = GM_getValue("lpvd", this.DEFAULT_LPVD);
	this.ivvd = GM_getValue("ivvd", this.DEFAULT_IVVD);
	this.pmvd = GM_getValue("pmvd", this.DEFAULT_PMVD);
	this.ccvd = GM_getValue("ccvd", this.DEFAULT_CCVD);
		// Image vars
	this.imgs = GM_getValue("imgs", this.DEFAULT_IMGS);
	this.imgPlyr = GM_getValue("imgPlyr", this.DEFAULT_IMGPLYR);
	this.imgCtrl = GM_getValue("imgCtrl", this.DEFAULT_IMGCTRL);
	this.imgSize = GM_getValue("imgSize", this.DEFAULT_IMGSIZE);
	this.sldshw = GM_getValue("sldshw", this.DEFAULT_SLDSHW);
	this.sldkey = GM_getValue("sldkey", this.DEFAULT_SLDKEY);
	this.imgLoad = GM_getValue("imgLoad", this.DEFAULT_IMGLOAD);
	this.skipErr = GM_getValue("skipErr", this.DEFAULT_SKIPERR);
	this.sldTm = GM_getValue("sldtm", this.DEFAULT_SLDTM);
	this.imgPgs = GM_getValue("imgPages", this.DEFAULT_IMGPGS);
		// Style vars
	this.styl = GM_getValue("style", this.DEFAULT_STYL);
	this.soot = GM_getValue("soot", this.DEFAULT_SOOT);
	this.oldSize = GM_getValue("oldSize", this.DEFAULT_OLDSIZE);
		// Update vars
	this.updateCheck = parseInt(GM_getValue("updtTime",0));
	this.newversion = parseFloat(GM_getValue("newver", 0.0));
		// Advanced vars
	this.delay = parseInt(GM_getValue("delay", this.DEFAULT_DELAY));
	
		// Color vars
	this.genbgclr = GM_getValue("genbgclr", this.DEFAULT_GENBGCLR);
	this.schbgclr = GM_getValue("schbgclr", this.DEFAULT_SCHBGCLR);
	this.resltclr = GM_getValue("resltclr", this.DEFAULT_RESLTCLR);
	this.glbarclr = GM_getValue("glbarclr", this.DEFAULT_GLBARCLR);
	this.addedclr = GM_getValue("addedclr", this.DEFAULT_ADDEDCLR);
	this.plyblclr = GM_getValue("plyblclr", this.DEFAULT_PLYBLCLR);
	this.ovrlyclr = GM_getValue("ovrlyclr", this.DEFAULT_OVRLYCLR);
		// Text Color vars
	this.restxtclr = GM_getValue("restxtclr", this.DEFAULT_RESTXTCLR);
	this.gbrtxtclr = GM_getValue("gbrtxtclr", this.DEFAULT_GBRTXTCLR);
	this.gbotxtclr = GM_getValue("gbotxtclr", this.DEFAULT_GBOTXTCLR);
	this.lnktxtclr = GM_getValue("lnktxtclr", this.DEFAULT_LNKTXTCLR);
	this.urltxtclr = GM_getValue("urltxtclr", this.DEFAULT_URLTXTCLR);
	this.simtxtclr = GM_getValue("simtxtclr", this.DEFAULT_SIMTXTCLR);
	this.mdatxtclr = GM_getValue("mdatxtclr", this.DEFAULT_MDATXTCLR);
	this.plytxtclr = GM_getValue("plytxtclr", this.DEFAULT_PLYTXTCLR);
	this.pbltxtclr = GM_getValue("pbltxtclr", this.DEFAULT_PBLTXTCLR);
	
		// Classic Style vars
	this.clcvrthrz = GM_getValue("clcvrthrz", this.DEFAULT_CLCVRTHRZ);
	this.clctoprht = GM_getValue("clctoprht", this.DEFAULT_CLCTOPRHT);
	this.clcborder = GM_getValue("clcborder", this.DEFAULT_CLCBORDER);
	this.clcbdrclr = GM_getValue("clcbdrclr", this.DEFAULT_CLCBDRCLR);
		// Dock Style vars
	this.docknavstl = GM_getValue("docknavstl", this.DEFAULT_DOCKNAVSTL);
	this.dockborder = GM_getValue("dockborder", this.DEFAULT_DOCKBORDER);
	this.dockbdrclr = GM_getValue("dockbdrclr", this.DEFAULT_DOCKBDRCLR);
	this.dockbgclr = GM_getValue("dockbgclr", this.DEFAULT_DOCKBGCLR);
		// Media Style vars
	this.mdaimgnum = GM_getValue("mdaimgnum", this.DEFAULT_MDAIMGNUM);
	this.mdaemdpos = GM_getValue("mdaemdpos", this.DEFAULT_MDAEMDPOS);
	
		// Search Engines
	this.searchengines = eval(GM_getValue("searchengines", this.DEFAULT_SEARCHENGINES));
}

var options = new optionlist();

	// Start Helper Functions ----------------------------------------------------------
// Trim for strings
function _trim(b) {
	return b.replace(/^\s*/, "").replace(/\s*$/, "");
}
// Shortcut for document.getElementById
function $(id) {
	return document.getElementById(id);
}
// Shortcut for either Id
function $$(first, second) {
	return $(first) || $(second);
}
// Shortcut for document.getElementsByClassName
function $cl(cname) {
	var classlist = document.evaluate('//*[contains(concat(" ", @class, " "), " ' + cname + ' ")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var items = [];
	for(var ci = 0, cl = classlist.snapshotLength; ci < cl; ci++) {
		items.push(classlist.snapshotItem(ci));
	}
	return items;
}
// Shortcut for document.createElement
function $create(type, attributes) {
	var node;
	if(type == 'textNode') {
		node = document.createTextNode(attributes);
	} else {
		node = document.createElement(type);
		if(typeof attributes == 'string') {
			node.textContent = attributes;
		} else {
			for (var attr in attributes){
				if(attr == "textContent") {
					node.textContent = attributes[attr];
				} else if (attr == "className") {
					node.className = attributes[attr];
				} else if (attr == "innerHTML") {
					node.innerHTML = attributes[attr];
				} else if (attributes.hasOwnProperty(attr)) {
					node.setAttribute(attr, html_entity_decode(attributes[attr]));
				}
			}
		}
	}
	return node;
}
// Shortcut to remove an element
function $remove(node) {
	if (typeof node == "string") {
		node = $(node);
	}
	
	if (node && node.parentNode) {
		return node.parentNode.removeChild(node);
	} else {
		return false;
	}
}
// Shortcut for document.getElementsByTagName
function $tag(type) {
	return document.getElementsByTagName(type);
}
		// Start Grease Monkey Code Snippets ----------------------------------------------------------
// Simple xmlhttpRequest GET shortcut
function get(url, cb, err) {
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: function(xhr) { cb(xhr); },
		onerror: function(xvr) { err(xvr); }
	});
}
// Simple xmlhttpRequest POST shortcut
function post(url, data, cb) {
	GM_xmlhttpRequest({
		method: "POST",
		url: url,
		headers:{'Content-type':'application/x-www-form-urlencoded'},
		data:encodeURI(data),
		onload: function(xhr) { cb(xhr.responseText); }
	});
}
		// End Grease Monkey Code Snippets ------------------------------------------------------------
//	Decoed HTML Entities
function html_entity_decode(str) {
	//jd-tech.net
	var tarea = $create('textarea');
	tarea.innerHTML = str;
	return tarea.value;
}
// Converts an html string into a working html tag
function stringtohtml(htmlstring) {
	var toHTML = $create("html", {
		innerHTML : htmlstring
	});
	return toHTML;
}
// Shortcut for redirecting the page and opening new tabs
function linkit(theLink, tabit, under) {
	if (tabit || (options.tabs && under)) {
		GM_openInTab(theLink);
	} else {
		// Eliminate race conditions by sending it to the back of the queue
		setTimeout(function () {window.location = theLink;},0);
	}
}
// Goes up until if finds the proper node, and then returns the given attribute
function findrightnode(target, idname, att) {
	var checkClass = target;
	// Loop up and break on finding correct info
	while (checkClass.parentNode) {
		if (checkClass.id == idname) {
			if(att) {
				return checkClass.getAttribute(att);
			} else {
				return checkClass;
			}
		} else  {
			checkClass = checkClass.parentNode;
		}
	}
}
// Helper function to check if the clicked item is a child of a given class
function checkallparentsforit(el, clname) {
	var onn = el;
	// Loop up and returns if value is found
	while (typeof(onn) != "undefined" && onn !== null) {
		if (onn.className == clname || onn.id == clname) {
			return true;
		}
		onn = onn.parentNode || null;
	}
	return false;
}
// Get an attribute from a node
function getAttribute(node, attName) {
	var atts = node.attributes;
	for (var i = 0; i < atts.length; i++) {
		if(atts[i].name == attName) {
			return atts[i].value;
		}
	}
}
// Checks if a new search has occured without a full reload
function checknonreload() {
	// Check that original page is still the page that is loaded
	if(currUrl != location.href) {
		if($$(statId, dynaId)) {
			// Restart process if it is not
			resetPg();
			if(extractPage() == 'web') {
				userInput = setupText();
				runThrough();
			} else {
				location.reload();
			}
		}
		currUrl = location.href;
	}
}
// Reset a page to its original state
function resetPg() {
	var wdiv = $("wikiDiv");
	if (wdiv) {
		wdiv.parentNode.removeChild(wdiv);
	}
	var gup = $("greyOut");
	if (gup) {
		closeEx();
	}
	if ($('dock')) {
		$remove('dock');
	}
}
// Removes all the children of the given element using recursion
function removeAllChildren(node) {
	var count = node.childNodes.length;
	for (var nc = 0; nc < count; nc++) {
		node.removeChild(node.childNodes[0]);
	}
}
// Closes all features that display on top with a grey background
function closeEx() {
	popupManager.closeAll();
}
// Gets the page on from the URL
function extractPage() {
	var qobj = getQueryParameters();
	return qobj['tbm'] || 'web';
}
// Gets the Query Parameters
function getQueryParameters() {
	var queryarr = location.search.substr(1).split('&');
	var qobj = [];
	for(var i = queryarr.length - 1; i >= 0; i--)
		qobj[queryarr[i].split('=')[0]] = queryarr[i].split('=')[1];
	if(location.hash && location.hash.indexOf('q=') >= 0) {
		queryarr = location.hash.substr(1).split('&');
		for(var i = queryarr.length - 1; i >= 0; i--)
			qobj[queryarr[i].split('=')[0]] = queryarr[i].split('=')[1];
	}
	return qobj;
}
// Get page offset
function getOffset(el) {
	var offx = el.offsetLeft;
	var offy = el.offsetTop;
	while(el.offsetParent && el.offsetParent != document.body) {
		el = el.offsetParent;
		offx += el.offsetLeft;
		offy += el.offsetTop;
	}
	return { 0 : offx, 1 : offy, x : offx, y : offy}
}
// String left padding
function strlpad (str, padString, length) {
	while (str.length < length)
        str = padString + str;
    return str;
}
	// End Helper Functions ------------------------------------------------------------

/**	=================================================================
  *	Media Embedding
  *	=================================================================
  */

/**	Control_Icon
  *	Control Icon Object
  *	
  *	Construction Parameters
  *		icon		The src of the image
  *		title		The title of the icon
  *		handle		A handler for clicks
  *	
  *	Functions
  *		draw
  *			Draw the icon
  *	
  *		handleClick
  *			Handles clicking on the given icon by delegating to assigned clickers
  *	
  *		addClicker
  *			Add a click handler funciton
  *	
  *		removeClicker
  *			Remove a click handler function
  *	
  */
function Control_Icon (icon, title, handle) {
	this.img = icon;
	this.title = title;
	this.clickers = [];
	if ( handle ) this.clickers.push( handle );
	
	this.draw = function (parentNode) {
		
		var icn = $create('img', {
			src : this.img,
			alt : this.title,
			title : this.title,
			className : 'controlIcon'
		});
		
		parentNode.appendChild(icn);
		var SR = this;
		icn.addEventListener('click', function (e) { SR.handleClick(e); }, false);
		
	};
	
	this.handleClick = function (e) {
		for ( var hc = 0; hc < this.clickers.length; hc++ ) {
			this.clickers[hc]();
		}
	};
	
	this.addClicker = function (handle) {
		this.clickers.push( handle );
	};
	
	this.removeClicker = function (handle) {
		for ( var rc = 0; rc < this.clickers.length; rc++ ) {
			if (this.clickers[rc] == handle) {
				this.clickers.splice(rc,1);
				return;
			}
		}
	};
};

/**	Media_Embed
  *	Media Embed Object
  *	
  *	Functions
  *		draw
  *			Draw the icon
  *	
  *		addImageEmbed
  *			Embed an image in the embed area
  *	
  *		addVideoEmbed
  *			Embed an video in the embed area
  *	
  *		clearEmbed
  *			Clean the embed area
  *	
  *		drawImageControls
  *			Draw the controls for images
  *	
  *		drawVideoControls
  *			Draw the controls for videos
  *	
  */
function Media_Embed () {
	
	this.player;
	this.labelArea;
	this.controlsArea;
	this.embedArea;
	this.title;
	this.controls;
	this.imgRes;
	this.vidRes;
	this.defaultMessage = "Select an item to view it here.";
	
	this.draw = function (parentNode) {
		this.player = rightBox("pBox");
		
		this.clearEmbed(this.defaultMessage);
		
		var hidePlayer = $create("div", {
			id : "hidePly"
		});
		hidePlayer.appendChild($create("img",{
			src : image_store.media_close,
			alt : "Close"
		}));
		var SR = this;
		hidePlayer.addEventListener("click", function (event) {
			SR.clearEmbed();
		}, false);
		this.player.appendChild(hidePlayer);
		
		parentNode.appendChild(this.player);
	};
	
	this.addImageEmbed = function (img) {
		this.imgRes = img;
		var title = img.title;
		var url = img.link;
		
		this.clearEmbed(title);
		
		if(options.imgCtrl) {
			this.drawImageControls();
		}
		
		var alink = $create("a", {
			href : url
		});
		var imgtag = $create("img", {
			src : url,
			alt : title,
			title : title,
			className : "playimg"
		});
		alink.appendChild(imgtag);
		this.embedArea.appendChild(alink);
		this.player.className = "rBox imgShowing";
	};
	
	this.addVideoEmbed = function (vid, embed) {
		this.vidRes = vid;
		this.clearEmbed(vid.name);
		
		if(options.vidCtrl) {
			this.drawVideoControls();
		}
		
		this.embedArea.appendChild(embed);
		this.player.className = "rBox playing";
	};
	
	this.clearEmbed = function (label) {
		if (!this.labelArea) {
			this.labelArea = $create("div", {
				id : "playerTag"
			});
			this.player.appendChild(this.labelArea);
		}
		this.labelArea.innerHTML = label || this.defaultMessage;
		
		if(!this.controlsArea) {
			this.controlsArea = $create("div", {
				id : "controlArea"
			});
			this.player.appendChild(this.controlsArea);
		}
		removeAllChildren(this.controlsArea);
		
		if (!this.embedArea) {
			this.embedArea = $create("div", {
				id : "embedArea"
			});
			this.player.appendChild(this.embedArea);
		}
		removeAllChildren(this.embedArea);
		
		this.player.className = "rBox";
	};
	
	this.drawImageControls = function () {
		
		// Reusable Var
		var icn;
		
		var SR = this;
		
		icn = new Control_Icon(image_store.image_left_arrow, "Previous Image", function () {
			imgSearch.clickImage(SR.imgRes.locNum - 1);
		});
		icn.draw(this.controlsArea);
		
		icn = new Control_Icon(image_store.image_new_tab, "Open in New Tab", function () {
			GM_openInTab(SR.imgRes.link);
		});
		icn.draw(this.controlsArea);
		
		icn = new Control_Icon(image_store.image_slideshow, "Play Slideshow from here", function () {
			imgSearch.startSlides(SR.imgRes.locNum);
		});
		icn.draw(this.controlsArea);
		
		icn = new Control_Icon(image_store.image_right_arrow, "Next Image", function () {
			imgSearch.clickImage(SR.imgRes.locNum + 1);
		});
		icn.draw(this.controlsArea);
	};
	
	this.drawVideoControls = function () {
		
		// Reusable Var
		var icn;
		
		var SR = this;
		
		icn = new Control_Icon(image_store.vid_noembed, "No Embed", function () {
			GM_openInTab(SR.vidRes.link);
			SR.clearEmbed(SR.defaultMessage);
			SR.player.className = "rBox";
		});
		icn.draw(this.controlsArea);
		
	};
}

/**	=================================================================
  *	End Media Embedding
  *	=================================================================
  */

/**	=================================================================
  *	Style Store
  *	=================================================================
  */

function stylesheet_store () {

	var maxwidth = window.innerWidth - 50;
	var maxheight = window.innerHeight - 100;
	

	this.center_stylesheet = " \
		html { \
			background-color: rgb(" + options.genbgclr + "); \
		} \
		body { \
			width: 960px; \
			margin: 0px auto !important; \
			border: 1px solid #000000; \
			border-top-style: none; \
		} \
		#guser { \
			padding-top: 3px; \
		} \
		#tsf { \
			position: relative; \
		} \
		#cnt { \
			min-width: 0px !important; \
		} \
        #rcnt { \
            margin-top: 250px; \
        } \
        #searchform { \
            width: 900px; \
            padding-right: 60px; \
        } \
		#center_col { \
			margin-right: 0px; \
		} \
		#fll { \
			margin: 0px auto !important; \
			padding: 19px 0px; \
		} \
        .tsf-p { \
            padding-right: 0px !important; \
        } \
		#foot { \
			margin-right: 72px !important; \
		} \
		.gbh { \
			left: auto !important; \
			right: auto !important; \
			width: 760px; \
		} \
		#ssb { \
			margin-bottom: 0px; \
			padding-bottom: 0px; \
		} \
		#mBox { \
			position: absolute; \
			height: 238px; \
			overflow: hidden; \
			border-bottom: 1px solid #E5E5E5; \
            width: 960px; \
            top: 101px; \
		} \
		#wikiDiv { \
			min-height: 122px; \
			z-index: 999; \
			border-bottom: 1px solid #000000; \
			border-left: 1px solid #000000; \
			border-top: 1px solid #000000; \
			position: absolute; \
			top: 0px; \
			left: -202px; \
			width: 200px; \
		} \
		#wikiHeader { \
			font-size: 100%; \
			text-align: center; \
			border-bottom: 1px solid #000000; \
			min-height: 19px; \
		} \
		#wikiHeader a, #wikiHeader a:active { \
			color: #0077CC; \
			text-decoration: none; \
		} \
		#wikiDesc { \
			margin: 0px; \
			padding: 5px 2px 2px 2px; \
			font-size: 85%; \
			min-height: 110px; \
		} \
		#wikiExp { \
			min-height: 120px; \
			z-index: 998; \
			text-align: center; \
			font-size: 75%; \
			position: absolute; \
			top: 0px; \
			left: -22px; \
			width: 12px; \
			background-color: #FFFFFF; \
			border-top: 1px solid #000000; \
			border-left: 1px solid #000000; \
			border-bottom: 1px solid #000000; \
			cursor: pointer; \
			color: #0077CC; \
			padding: 1px 4px; \
		} \
		#pBox { \
			text-align: center; \
			height: 238px; \
			display: none; \
		} \
		#videoList { \
			float: left; \
			height: 238px; \
			width: 500px; \
			overflow-y: auto; \
			overflow-x: hidden; \
			border-right: 1px solid #6B90DA; \
		} \
		#vidTag, #imageTag, #playerTag { \
			text-align: center; \
			margin: 0px; \
			padding: 0px 8px; \
			font-size: 14px; \
		} \
		#playerTag, #controlArea { \
			height: 16px; \
		} \
		#embedArea { \
			height: 206px; \
		} \
		.rl-item { \
			max-width: 100px; \
			float: left; \
			padding: 5px 10px; \
		} \
		.rl-thumbnail img { \
			max-width: 100px; \
		} \
		.rl-domain-below { \
			overflow-x: hidden; \
			width: 100px; \
		} \
		.rl-details, .rl-snippet, .rl-snippet-grid-view, .rl-watch-on, .rl-cannot-play-here, .rl-special { \
			display: none; \
		} \
		.vid_result a { \
			display: block; \
			text-align: center; \
		} \
		#imageList { \
			text-align: center; \
			height: 238px; \
			width: 450px; \
			float: right; \
			z-index: 1001; \
			overflow-y: auto; \
			overflow-x: hidden; \
		} \
		#imageList img { \
			max-width: 100px; \
		} \
		.playing { \
			display: block !important; \
			z-index: 1004 !important; \
		} \
		.imgShowing { \
			display: block !important; \
			z-index: 1004 !important; \
		} \
		.imgShowing img { \
			max-height: 190px; \
			max-width: 380px; \
			margin-top: 2px; \
		} \
		.sldImgs { \
			display: block; \
		} \
		#vBox { \
		} \
		#resOL { \
			padding-left: 4px; \
		} \
		#res { \
			margin: 0px !important; \
		} \
		#ssb { \
			margin: 0px !important; \
		} /* "; /* End Stylesheet */

	this.classic_stylesheet = " \
		div.vsc, .knavi table { \
			display: block !important; \
			width: auto !important; \
		} \
		#mBox, #pBox, #videoList, #imageList, #controlArea, #embedArea { \
			border: 1px none rgb(" + options.clcbdrclr + "); \
		} \
		#center_col { \
			margin-right: 0px; \
		} \
		#foot { \
			clear: both; \
		} \
		#fll { \
			margin: 0px auto !important; \
			padding: 19px 0px; \
		} \
		.topHolder { \
			height: 68px; \
			overflow: auto; \
			position: absolute; \
			right: 5px; \
			top: -8px; \
			width: " + Math.max(262, maxwidth - 879) + "px; \
		} \
		#mBox { \
			width: 400px; \
			right: " + ( options.sideads ? 0 : 250) + "px; \
			border-style: " + (options.clcborder ? 'solid' : 'none') + "; \
            top: 101px; \
			z-index: 20; \
			position: absolute; \
            border-right-style: none; \
            border-top-style: none; \
		} \
        #search, #ires { \
            padding-right: 420px; \
        } \
        #rhs_map { \
            position: relative; \
            right: "+( options.imgs || options.vids ? '401' : '0' )+"px; \
        } \
		#pBox { \
			vertical-align: middle; \
			overflow: hidden; \
			width: 400px; \
			border-bottom-style: " + (options.clcborder ? 'solid' : 'none') + "; \
		} \
		.playing, .imgShowing { \
			position: relative; \
		} \
		.rBox { \
			float: " + (options.clcvrthrz != 'horizontal' ? 'none' : 'right') + "; \
			text-align: center; \
		} \
		.wBBord { \
			border-bottom: 1px solid #6B90DA; \
		} \
		#setShow, .blocked { \
			display: block; \
		} \
		#vidTag, #imageTag { \
			margin: 0px; \
		} \
		#playerTag { \
			height: 20px; \
			overflow: hidden; \
		} \
		#vBox { \
			height: 305px; \
		} \
		.playimg { \
			max-width: 400px; \
			max-height: 345px; \
			border-style: none; \
		} \
		#videoList { \
			width: " + (options.clcvrthrz == 'horizontal' && options.imgs ? '180px' : 'auto') + "; \
			border-right-style: " + (options.clcborder && options.clctoprht != "videos" && options.clcvrthrz == "horizontal" ? "solid" : "none") + "; \
			border-left-style: " + (options.clcborder && options.clctoprht == "videos" && options.clcvrthrz == "horizontal" ? "solid" : "none") + "; \
			border-top-style: " + (options.clcborder && options.clctoprht != "videos" && options.clcvrthrz == "vertical" ? "solid" : "none") + "; \
			border-bottom-style: " + (options.clcborder && options.clctoprht == "videos" && options.clcvrthrz == "vertical" ? "solid" : "none") + "; \
			margin-right: " + (options.clcborder && options.clctoprht != "videos" && options.clcvrthrz == "horizontal" ? "-1px" : "0px") + "; \
			margin-left: " + (options.clcborder && options.clctoprht == "videos" && options.clcvrthrz == "horizontal" ? "-1px" : "0px") + "; \
			margin-top: " + (options.clcborder && options.clctoprht != "videos" && options.clcvrthrz == "vertical" ? "-1px" : "0px") + "; \
			margin-bottom: " + (options.clcborder && options.clctoprht == "videos" && options.clcvrthrz == "vertical" ? "-1px" : "0px") + "; \
		} \
		#imageList { \
			width: " + (options.clcvrthrz == 'horizontal' && options.vids ? '219px' : 'auto') + "; \
			border-right-style: " + (options.clcborder && options.clctoprht != "images" && options.clcvrthrz == "horizontal" ? "solid" : "none") + "; \
			border-left-style: " + (options.clcborder && options.clctoprht == "images" && options.clcvrthrz == "horizontal" ? "solid" : "none") + "; \
			border-top-style: " + (options.clcborder && options.clctoprht != "images" && options.clcvrthrz == "vertical" && options.vids ? "solid" : "none") + "; \
			border-bottom-style: " + (options.clcborder && options.clctoprht == "images" && options.clcvrthrz == "vertical" ? "solid" : "none") + "; \
		} \
		#ssb { \
			position: relative; \
			height: 25px; \
		} \
		#resStat { \
			display: inline; \
			position: absolute; \
			top: 1px; \
			right: 0px; \
		} \
		#resOL { \
			margin: 0px 2% 0px .1em; \
		} \
		.toLI { \
			display: list-item; \
		} \
		.reAddAd { \
			width: 100px; \
		} \
		.g { \
			margin-top: 0px; \
			min-width: 540px; \
		} \
		#dymTxt { \
			margin: 5px; \
		} \
		#ssb { \
			position: relative; \
			height: 25px; \
		} \
		#rsStats { \
			display: inline; \
			float: right; \
		} \
		#prs { \
			display: inline; \
		} \
		.vidRes { \
			width: 145px; \
			display: block; \
		} \
		.vidRes .g { \
			margin: 0px; \
			 min-width: 0px; \
			 margin-left: 1em; \
		} \
		.vidRes img { \
			width: 137px; \
			height: 97px; \
		} \
		.vrTitle { \
			margin-bottom: 30px; \
		} \
		#exvidlist { \
			width: 170px; \
		} \
		.playing #embedArea { \
			height: 340px; \
		} \
		.playing #embedArea, .imgShowing #embedArea { \
			border-top-style: " + ((options.imgCtrl || options.vidCtrl) ? 'solid' : 'none') + "; \
		} \
		.playing #controlArea, .imgShowing #controlArea { \
			border-top-style: " + (options.clcborder && (options.imgCtrl || options.vidCtrl) ? 'solid' : 'none') + "; \
			height: 16px; \
		} \
		.playing #controlArea { \
			display: " + (options.vidCtrl ? 'block' : 'none') + "; \
		} \
		.imgShowing #controlArea { \
			display: " + (options.imgCtrl ? 'block' : 'none') + "; \
		} \
		.vid_thumb { \
			width: " + (options.clcvrthrz == 'horizontal' ? '140px' : '70px') + "; \
			height: " + (options.clcvrthrz == 'horizontal' ? '100px' : '50px') + "; \
			padding: 0px 10px; \
			border-style: none; \
			border-bottom: 1px solid #000000; \
		} \
		.vid_result { \
			font-size: 11pt; \
			border: 1px solid #000000; \
			margin: 9px; \
			display: " + (options.clcvrthrz == 'horizontal' && options.imgs ? 'block' : 'inline-block') + "; \
			width: " + (options.clcvrthrz == 'horizontal' ? '160px' : '90px') + "; \
			height: " + (options.clcvrthrz == 'horizontal' ? 'auto' : '105px') + "; \
			overflow: " + (options.clcvrthrz == 'horizontal' ? '' : 'hidden') + "; \
		} \
		.vid_result a { \
			text-decoration: none; \
		} \
		#ssb { \
			margin-bottom: 0px; \
			padding-bottom: 0px; \
		} \
		#hidePly { \
			display: none; \
		} \
		#res { \
			padding-right: 0px; \
			margin-top: 0px; \
		} \
		#wikiHeader { \
			font-size: 115%; \
			padding-left: .2em; \
		} \
		#wikiDesc { \
			font-size: 75%; \
			margin: 0px; \
			padding: .2em; \
			text-indent: 3em; \
			border-width: 1px; \
			border-style: solid; \
		} \
		#wikiDiv { \
			width: 580px; \
			margin-bottom: .5em; \
		} \
		.ts td { \
			padding: 0px 0px 0px 17px; \
		} /* "; /* End Stylesheet */


	this.clrpicker_stylesheet = " \
		.colorContainer { \
			position: fixed; \
			z-index: 10001; \
			background-color: #FFFFFF; \
			padding: 8px; \
			border: 1px solid #000000; \
			-moz-border-radius: 3px; \
		} \
		.colorContainer h3 { \
			font-weight: bold; \
			font-size: 26px; \
			/*cursor: -moz-grab;*/ \
		} \
		.gb_moving { \
			cursor: -moz-grabbing; \
		} \
		.configColorBox { \
			width: 15px; \
			height: 15px; \
			border: 1px solid #000000; \
			cursor: pointer; \
			-moz-border-radius: 3px; \
		} \
		.colorToneToBlack { \
			width: 255px; \
		} \
		.colorBar { \
			width: 40px; \
		} \
		.colorToneToBlack, .colorBar { \
			position: relative; \
			vertical-align: middle; \
		} \
		.colorToneToBlack { \
			height: 255px; \
			border: 1px solid #000000; \
		} \
		.gb_colorSettings { \
			display: inline-block; \
			height: 255px; \
			text-align: center; \
			vertical-align: middle; \
			position: relative; \
		} \
		.gb_hexlabel, .gb_rgblabel { \
			display: block; \
			text-align: left; \
			position: relative; \
			padding-right: 40px; \
			margin: 5px; \
			height: 20px; \
			font-weight: bold; \
		} \
		.gb_hexlabel { \
			padding-right: 70px; \
		} \
		.gb_colorInput { \
			width: 30px; \
			position: absolute; \
			top: 0px; \
			right: 0px; \
			text-align: right; \
		} \
		.gb_hexInput { \
			width: 60px; \
			position: absolute; \
			right: 0px; \
			top: 0px; \
			text-align: right; \
		} \
		.gb_colorPreview { \
			width: 100px; \
			height: 100px; \
			border: 1px solid #000000; \
			margin: 0px auto; \
		} \
		.gb_colorBtnContainer { \
			position: absolute; \
			width: 100%; \
			bottom: 0px; \
		} /* "; /* End Stylesheet */



	this.dock_stylesheet = " \
		body { \
			margin-bottom: 50px; \
		}  \
		a img { \
			border-style: none; \
		}  \
		.closed { \
			display: none; \
		}  \
		#fll { \
			margin: 0px auto !important; \
			padding: 19px 0px; \
		} \
		#center_col { \
			padding-left: 40px; \
			min-height: 300px; \
		} \
		#dock { \
			position: absolute; \
			width: 44px; \
			border-width: 1px; \
			border-color: rgb(" + options.dockbdrclr + "); \
			border-style: " + (options.dockborder ? "solid" : "none") + "; \
			border-left-style: none; \
			top: 0px; \
			left: 160px; \
			text-align: center; \
			background-color: rgb(" + options.dockbgclr + "); \
		}  \
		.dockLink { \
			padding: .4em 0px; \
			display: block; \
			cursor: pointer; \
		}  \
		.dockLink a { \
			text-decoration: none; \
		} \
		.topHolder { \
			height: 68px; \
			overflow: auto; \
			position: absolute; \
			right: 5px; \
			top: -8px; \
			width: " + Math.max(262, maxwidth - 879) + "px; \
		} \
		#wikiHeader { \
			font-size: 18pt; \
			padding-left: .5em; \
		}  \
		.wiki_p { \
			text-indent: 1.5em; \
		}  \
		#playerTag { \
			text-align: center; \
			margin-top: 0px; \
		}  \
		#pBox { \
			position: relative; \
			display: none; \
		}  \
		#pBox, #videoList, .imgLink img, #imageList { \
		}  \
		#playerTag, #vidTag, #imageTag { \
			text-shadow: -1px 0px #888888; \
		}  \
		.vid_result { \
			display: inline-table; \
			width: 16%; \
			margin: 10px 2%; \
			text-align: center; \
		}  \
		.vid_result img { \
			max-height: 120px; \
			max-width: 90px; \
			display: block; \
			margin: 5px auto; \
		} \
		#vBox { \
			height: 480px; \
		}  \
		.playing #embedArea { \
			height: 400px; \
		}  \
		#videoList, #imageList { \
			border-top-style: none; \
			text-align: center; \
		}  \
		.rl-domain { \
			display: block; \
		}  \
		#miniSldLink { \
			cursor: pointer; \
			float: right; \
			font-size: small; \
			padding: 2px 4px; \
			margin-top: 1px; \
			text-shadow: -1px 1px #666666; \
		}  \
		#miniSldLink:hover { \
			background-color: #FFFFFF; \
			color: #000000; \
			text-shadow: -1px 1px #CCCCCC; \
		}  \
		#imageList input { \
			display: block; \
			margin: 5px auto; \
		}  \
		.imgShowing, .playing { \
			display: block !important; \
			text-align: center; \
		} \
		.imgShowing img{ \
			max-height: 400px; \
			max-width: 85%; \
		}  \
		.imgLink { \
			margin: 1%; \
			vertical-align: middle; \
		}  \
		.imgLink img { \
			padding: 2px; \
			background-color: #555555; \
		}  \
		.imgDetails { \
			display: inline-block !important; \
		} \
		.aset { \
			display: inline !important; \
		} /* "; /* End Stylesheet */

	this.gen_stylesheet = " \
		html, body { \
			background-color: rgb(" + options.resltclr + "); \
			color: rgb(" + options.restxtclr + "); \
			margin: 0px; \
		} \
		.csb, .ss, .play_icon, .mini_play_icon, .micon, .close_btn, #tbp, .mbi { \
			background-image: url(" + iconSheetTrans() + "); \
		} \
		#logo { \
			color: transparent; \
		} \
		#logo img { \
			background-color: transparent; \
		} \
		#gbar, #guser { \
			background-color: rgb(" + options.glbarclr + "); \
			padding-top: 3px !important; \
		} \
		.gbts { \
			color: rgb("+ options.gbrtxtclr +"); \
		} \
		.gbz0l .gbts { \
			color: rgb("+ options.gbotxtclr +"); \
		} \
		#guser { \
			margin-right: 0px; \
			padding-right: 8px; \
		} \
		.sfbgg, #newVer { \
			background-color: rgb("+ options.schbgclr +"); \
		} \
		#cnt, #leftnav, #tbd, #atd, #tsf, #hidden_modes, #hmp { \
			background-color: rgb(" + options.resltclr + "); \
		} \
		#wikiHeader a, #wikiHeader, #mBox, .detailedImgInfo { \
			background-color: rgb(" + options.addedclr + "); \
			color: rgb(" + options.mdatxtclr + "); \
		} \
		#wikiDesc { \
			border-color: rgb(" + options.addedclr + "); \
		} \
		.embeddable { \
			background-color: rgb(" + options.plyblclr + "); \
		} \
		.embeddable a { \
			color: rgb(" + options.pbltxtclr + ") !important; \
		} \
		a:link, .w, .q:active, .q:visited, .tbotu, #fll a, #bfl a, #newVer a { \
			color: rgb(" + options.lnktxtclr + "); \
		} \
		li.g span cite { \
			color: rgb(" + options.urltxtclr + "); \
		} \
		.gl, .f, .m, .c h2, #mbEnd h2, #tads h2, .descbox, .fl, .fl a, .flt, .gl a:link, a.mblink, .mblink b { \
			color: rgb(" + options.simtxtclr + ") !important; \
		} \
		.removed { \
			display: none !important; \
		} \
		.gbump_btn { \
			overflow: hidden; \
			height: 27px; \
			border-radius: 2px; \
			border: 1px solid #3079ED; \
			display: inline-block; \
			vertical-align: bottom; \
			background-color: #4787ED; \
			background-image: -moz-linear-gradient(center top , #4D90FE, #4787ED); \
			background-repeat: no-repeat; \
			cursor: pointer; \
			color: #FFFFFF; \
		} \
		#gbump_settings { \
			background-image: url("+ image_store.settings +"), -moz-linear-gradient(center top , #4D90FE, #4787ED); \
			width: 27px; \
			background-position: center center; \
		} \
		#greyOut { \
			background-color: rgb(" + options.ovrlyclr + "); \
			opacity: .6; \
			width: 100%; \
			height: 100%; \
			z-index: 1000; \
			position: fixed; \
			top: 0px; \
			left: 0px; \
		} \
		#confTabs { \
			background-color: #AAAAAA; \
		} \
		#confWel, #styleWel, #confBtnWrap, .conf_Tab, .selected_tab #t_AbtConf { \
			background: #CCCCCC -moz-linear-gradient(top, #E6E6E6, #CCCCCC) scroll repeat-x left top; \
		} \
		#gbLoader { \
			position: absolute; \
			top: 25px; \
			right: 3px; \
		} \
		.confLbl { \
			font-size: small; \
			display: inline; \
		} \
		.opli { \
			display: inline; \
		} \
		#confBoxSel { \
			position: absolute; \
			top: -22px; \
			left: 5px; \
		} \
		.selBox { \
			display: inline-block; \
			height: 20px; \
			font-size: 14px; \
			background-color: #CCCCCC; \
			-moz-border-radius-topleft: 7px; \
			-moz-border-radius-topright: 7px; \
			border: 1px solid #000000; \
			padding: 0px 5px; \
			margin: 0px 1px; \
			cursor: pointer; \
		} \
		.selBoxOn { \
			background-color: #E6E6E6; \
			border-bottom-color: #E6E6E6; \
			cursor: default; \
		} \
		.confTab { \
			margin: 0px; \
			padding: 2px 4px; \
			border: 1px solid black; \
		} \
		#confWel, #styleWel { \
			border-bottom: 1px solid black; \
			font-size: 22pt; \
			font-family: serif; \
			text-align: center; \
			-moz-border-radius-topleft: 5px; \
			-moz-border-radius-topright: 5px; \
		} \
		#slideShow { \
			position: fixed; \
			text-align: center; \
			padding: 15px; \
			top: 50%; \
			left: 50%; \
			z-index: 9998; \
			background-color: white; \
			border: 1px solid black; \
		} \
		.config_section_head { \
			margin: 6px 0px; \
			border-bottom: 1px solid grey; \
		} \
		#confWrap { \
			height: 447px; \
			border-bottom: 1px solid black; \
			padding-bottom: 4px; \
		} \
		.config_option { \
			margin: 2px; \
		} \
		.config_textField { \
			display: block; \
			width: 80%; \
			height: 120px; \
		} \
		.config_intField { \
			width: 3em; \
		} \
		.confKeyVal { \
			max-height: 300px; \
			overflow: auto; \
			padding: 5px 0px; \
		} \
		.confKeyValTbl { \
			font-size: 9pt; \
		} \
		.confKeyValPair td { \
			border-bottom: 1px solid #CCCCF5; \
		} \
		.confKeyValPair:last-child td { \
			border-bottom-style: none; \
		} \
		.confKey { \
			border-right: 1px solid #CCCCF5; \
			font-weight: bold; \
		} \
		.confValHighlight { \
			color: #FF0000; \
		} \
		.confKeyValHighlightedRow { \
			background-color: #0000FF; \
		} \
		.sldImgs { \
			display: block; \
		} \
		.keycuts em { \
			text-decoration: underline; \
			font-weight: bold; \
		} \
		#hidePly { \
			position: absolute; \
			top: 0px; \
			right: 0px; \
			cursor: pointer; \
		} \
		#confTabs { \
			height: 460px; \
			margin-right: 10px; \
			float: left; \
			border-right: 1px solid black; \
		} \
		.conf_Tab { \
			padding: 0px 0.5em .25em .5em; \
			border-bottom: 1px solid black; \
			border-right: 1px solid black; \
			display: block; \
			z-index: 10001; \
			cursor: pointer; \
			line-height: 16px; \
			margin-right: -1px; \
		} \
		.selected_tab { \
			border-right-color: #FFFFFF; \
			background: #FFFFFF none scroll no-repeat left top; \
		} \
		.confTabOn { \
			margin: .7em; \
		} \
		.confTabOn label { \
			margin: .2em 0px; \
		} \
		.confTabOn button { \
			margin: .5em 0px; \
		} \
		#t_AbtConf { \
			border-style: none !important; \
			background: none !important; \
			display: block; \
			position: absolute; \
			bottom: 0px; \
			right: 3px; \
			border-right-style: none; \
			z-index: 10000; \
		} \
		#AbtConf p { \
			margin-top: 0px; \
			white-space: pre-line; \
			font-size: 12px; \
		} \
		#deapallFault, #sNc { \
			margin-left: .2em; \
		} \
		#newVer { \
			text-align: center; \
			font-size: 12px; \
			padding: 0px 5px 10px; \
			position: absolute; \
			top: 100px; \
			left: 20px; \
			width: 175px; \
			border: 1px solid #E5E5E5; \
			border-top-width: 0px; \
			z-index: 150; \
		} \
		#newVer a  { \
			display: block; \
		} \
		.newVerAvailable { \
			font-weight: bold; \
			font-size: 120%; \
		} \
		.GB_dialog_popup { \
			position: fixed; \
			left: 50%; \
			top: 50%; \
			width: 500px; \
			height: 520px; \
			margin-left: -250px; \
			margin-top: -260px; \
			z-index: 9999; \
			background-color: white; \
			border: 1px solid black; \
			-moz-border-radius: 5px; \
			color: #000000 !important; \
		} \
		#confBtnWrap { \
			-moz-border-radius-bottomleft: 5px; \
			-moz-border-radius-bottomright: 5px; \
		} \
		#slideShow { \
			position: fixed; \
			text-align: center; \
			padding: 15px; \
			top: 50%; \
			left: 50%; \
			z-index: 9998; \
			background-color: #FFFFFF; \
			border: 1px solid #000000; \
		} \
		.sldImgs { \
			max-width: " + maxwidth + "px; \
			max-height: " + maxheight + "px; \
		} \
		#sldLink { \
			text-align: center; \
		} \
		#next{ \
			float: right; \
		} \
		#prev { \
			float: left; \
		} \
		#res { \
			margin: 0px 8px; \
		} \
		#cnt { \
			max-width: 100%; \
		} \
		#ssb { \
			height: auto; \
			overflow: hidden; \
		} \
		.imgSizelarge { \
			max-width: 130px; \
			max-height: 130px; \
			display: block; \
			margin: 5px auto; \
		} \
		.imgSizemedium { \
			max-width: 90px; \
			max-height: 90px; \
			display: inline-block; \
			margin: 4px; \
		} \
		.imgSizesmall { \
			max-width: 50px; \
			max-height: 50px; \
			display: inline-block; \
			margin: 5px; \
		} \
		.titleOnly, .imgDetails { \
			display: block; \
			font-size: 9pt; \
			margin: 1em; \
		} \
		.detailedImgInfo { \
			display: block; \
			text-decoration: none; \
		} \
		.conf_subsect { \
			margin-bottom: 10px; \
		} \
		.error { \
			color:#FF0000; \
		} \
		.controlIcon { \
			cursor: pointer; \
		} /* "; /* End Stylesheet */

	this.media_stylesheet = " \
		#pBox { \
			background-color: rgb(" + options.addedclr + "); \
			color: rgb(" + options.mdatxtclr + "); \
		} \
		a, img {  \
			border-style: none; \
		} \
		#res {  \
			padding-right: 0px; \
			position: relative; \
		} \
		#center_col { \
			margin-right: 0px; \
		} \
		#fll { \
			margin: 0px auto !important; \
			padding: 19px 0px; \
		} \
		.topHolder { \
			height: 68px; \
			overflow: auto; \
			position: absolute; \
			right: 5px; \
			top: -8px; \
			width: " + Math.max(262, maxwidth - 879) + "px; \
		} \
		#videoList { \
			border: 1px solid black; \
			border-style: " + (options.imgs && options.mdaemdpos == 'over' ? 'solid solid solid none' : options.imgs ? 'none solid solid solid' : 'solid') + "; \
			overflow-x: auto; \
			overflow-y: hidden; \
			height: " + ( !options.imgs || options.mdaemdpos == 'over' ? '490px' : '240px' ) + "; \
			padding: 5px 0px; \
			white-space: " + ( options.mdaemdpos == 'over' ? 'normal' : 'nowrap' ) + "; \
		} \
		.vid_thumb { \
			max-width: 120px; \
			max-height: 120px; \
		} \
		#videoList p { \
			margin-top: 0px; \
			margin-bottom: 5px; \
			text-decoration: underline; \
		} \
		#resOL { \
			clear: both; \
		} \
		#imageList { \
			border: 1px solid black; \
			overflow: auto; \
			height: " + ( !options.vids || options.mdaemdpos == 'over' ? '500px' : '249px' ) + "; \
			width: " + ( options.vids && options.mdaemdpos == 'over' ? '50%' : options.mdaemdpos == 'over' ? '100%' : 'auto' ) + "; \
			text-align: center; \
			float: " + ( options.mdaemdpos == 'over' ? 'left' : 'none' ) + "; \
		} \
		#imageList img { \
			margin: " + (!options.vids ? '4px' : '5px 9px') + "; \
			padding: " + (!options.vids ? '4px' : '0px') + "; \
		} \
		.imgSizelarge { \
			display: inline-block; \
		} \
		#pBox { \
			border: 1px solid black; \
			border-right-style: " + (options.mdaemdpos == 'left' ? 'none' : 'solid') + "; \
			border-left-style: " + (options.mdaemdpos == 'right' ? 'none' : 'solid') + "; \
			height: 500px; \
			text-align: center; \
			width: " + (options.mdaemdpos != 'over' ? '55%' : '100%') + "; \
			float: " + (options.mdaemdpos != 'over' ? options.mdaemdpos : 'none') + "; \
			display: " + (options.mdaemdpos == 'over' ? 'none' : 'block') + "; \
		} \
		#embedArea img { \
			max-width: 95%; \
			max-height: 95%; \
			margin-top: 1%; \
		} \
		#playerTag { \
			font-size: 16px; \
			height: 16px; \
		} \
		#controlArea { \
			height: 16px; \
		} \
		.controlIcon { \
			padding: 0px; \
		} \
		#embedArea { \
			height: 468px; \
		} \
		#hidePly { \
			display: " + (options.mdaemdpos == 'over' ? 'block' : 'none !important') + "; \
		} \
		.playing, .imgShowing { \
			display: block !important; \
			position: " + (options.mdaemdpos == 'over' ? 'absolute' : 'relative') + "; \
		} \
		.removed, .rl-details, .rl-snippet, \
		.rl-short-snippet, .rl-snippet-grid-view, \
		.rl-watch-on, .rl-special, .rl-cannot-play-here { \
			display: none;  \
		} \
		#wikiHeader { \
			font-size: 115%; \
			padding-left: .2em; \
		} \
		#wikiDesc { \
			font-size: 75%; \
			margin: 0px; \
			padding: .2em; \
			text-indent: 3em; \
		} \
		#wikiDiv { \
			width: 100%; \
			margin-bottom: .5em; \
			margin-top: 1%; \
		} \
		.vid_result, .rl-res { \
			width: 120px; \
			margin-left: 4px; \
			margin-right: 4px; \
			display: inline-table; \
			height: auto; \
			text-align: center; \
			white-space: normal; \
		} \
		.thumbnail-img { \
			width: 100px; \
			height: 80px; \
		} \
		.rl-metadata, .rl-thumbnail { \
			display: block; \
			font-size: small; \
		} /* "; /* End Stylesheet */

	this.multisearch_stylesheet = " \
		#currentSearch { \
			margin-top: 0px !important; \
		} \
		#sbds  { \
			white-space: nowrap; \
		} \
		.kpbb { \
			display: inline-block; \
		} \
		#gbump_moreOptsBtn { \
			width: 27px; \
			text-indent: -1000px; \
			background-color: #4787ED; \
			background-image: url("+ image_store.plus_minus +"), -moz-linear-gradient(center top , #4D90FE, #4787ED); \
			background-repeat: no-repeat; \
			background-position: center -2px, center top; \
		} \
		#gbump_moreOptsBtn:hover, .gbump_multiSrchBtn:hover, .gbump_multiRemove:hover { \
			background-color: #357ae8; \
			border-color: #2F5BB7; \
			box-shadow: 0px 1px 1px rgba(0,0,0,0.1); \
		} \
		#gbump_moreOptsBtn:hover, .gbump_multiSrchBtn:hover { \
			background-image: url("+ image_store.plus_minus +"), -moz-linear-gradient(center top , #4D90FE, #357ae8); \
		} \
		.gbump_multiRemove { \
			background-image: -moz-linear-gradient(center top , #4D90FE, #4787ED); \
			font-weight: bold; \
			font-size: 16px; \
			line-height: 27px; \
			height: 27px; \
			width: 27px; \
			margin-left: 3px; \
		} \
		.gbump_multiRemove:hover { \
			background-image: -moz-linear-gradient(center top , #4D90FE, #357ae8); \
		} \
		#gbump_moreOptsBtn.opened { \
			background-position: center -32px;\
		} \
		.multiBtn { \
			border-color: #CCCCCC; \
			border-width: 1px; \
		} \
		.gbump_multiExp { \
			position: absolute; \
			top: 1px; \
			text-indent: -1000px; \
			overflow: hidden; \
			width: 20px; \
			height: 28px; \
			border: none; \
			background-repeat: no-repeat; \
			background-position: center center; \
			background-color: transparent; \
			cursor: pointer; \
		} \
		.gbump_multiFill { \
			right: 28px; \
			background-image: url("+ image_store.multi_fill +"); \
		} \
		.gbump_multiClear { \
			right: 7px; \
			background-image: url("+ image_store.clear_box +"); \
		} \
		.gbump_msBar { \
			white-space: nowrap; \
			margin-left: 16px; \
		} \
		#allSearches { \
		} \
		#expand, #collapse { \
			cursor: pointer; \
			font-family: sans-serif; \
			float: right; \
			color: #0077CC; \
			margin-right: 3px; \
			margin-bottom: 2px; \
		} \
		#collapse { \
			font-size: 60%; \
			padding-left: .3em; \
			padding-right: .35em; \
		} \
		#expand { \
			font-size: 50%; \
			padding-left: .2em; \
			padding-right: .25em; \
		} \
		.TabHead { \
			font-size: 75%; \
			color: #555555; \
			margin: 0px; \
			margin-left: 1em; \
			display: block; \
		} \
		.fullWidthTD { \
			width: 100%; \
		} \
		.gbump_siteSelector { \
			background-color: transparent; \
			height: 29px; \
			line-height: 21px; \
			vertical-align: bottom; \
			display: inline-block; \
			border: 1px solid #3079ED; \
			background-color: #4787ED; \
			background-image: -moz-linear-gradient(center top , #4D90FE, #4787ED); \
			background-repeat: no-repeat; \
			background-position: center -2px, center top; \
			padding: 4px 2px 4px 0px; \
			margin-right: 4px; \
			border-radius: 2px; \
			color: #FFFFFF; \
		} \
		.gbump_multiSrchBtn { \
			overflow: hidden; \
			height: 27px; \
			border-radius: 2px; \
			border: 1px solid #3079ED; \
			display: inline-block; \
			vertical-align: bottom; \
			background-color: #4787ED; \
			background-image: url("+ image_store.search_glass +"), -moz-linear-gradient(center top , #4D90FE, #4787ED); \
			background-repeat: no-repeat; \
			background-position: center center; \
			cursor: pointer; \
			text-indent: -1000px; \
			width: 103px; \
		} \
		.gbump_multiSrchBtn:hover { \
			background-image: url("+ image_store.search_glass +"), -moz-linear-gradient(center top , #4D90FE, #357ae8); \
		} \
		.gbump_multiSrchBtn:active { \
			box-shadow: 0px 1px 2px rgba(0,0,0,0.3) inset; \
		} \
		.gbump_multiBtn { \
			margin: 0px 3px; \
		} \
		.gbump_searchBoxes { \
			height: 25px; \
			width: 100%; \
			outline: 1px solid #C0C0C0; \
			border: none; \
			line-height: 23px; \
			margin: 2px 0px; \
			text-indent: 8px; \
			font-size: 17px; \
		} \
		.closeBtn { \
			color: red; \
			display: inline; \
			margin: 0px; \
			cursor: pointer; \
			font-size: 50%; \
			vertical-align: top; \
			margin-left: .8em; \
		} \
		#expandedMulti { \
			padding-top: 10px; \
		} \
		#adding { \
			margin-left: 3em; \
			cursor: pointer; \
			font-size: 85%; \
			color: blue; \
			margin-top: -1em; \
		} \
		#searchAll { \
			font-size: normal; \
		} \
		#otherSearchContent { \
			margin-bottom: 44px; \
		} \
		.gac_m { \
			z-index: 1500 !important; \
			border: 1px solid #D0D0D0 !important; \
			border-top-style: none !important; \
		} \
		.gbump_multiSearchBar td > * { \
			margin-top: 6px; \
		} \
		.tsf-p { \
			padding-right: 220px !important; \
		} /* "; /* End Stylesheet */
/**	
  *	Relies on importing for retrieving stylesheets
  *	
  *	@depends style-assignment-header.js
  *	@depends assign-style-center.js
  *	@depends ../css/center-styles.css
  *	@depends assign-style-classic.js
  *	@depends ../css/classic-styles.css
  *	@depends assign-style-color.js
  *	@depends ../css/color-picker.css
  *	@depends assign-style-column.js
  *	@depends ../css/column-styles.css
  *	@depends assign-style-dock.js
  *	@depends ../css/dock-styles.css
  *	@depends assign-style-gen.js
  *	@depends ../css/general-styles.css
  *	@depends assign-style-media.js
  *	@depends ../css/media-styles.css
  *	@depends assign-style-multi.js
  *	@depends ../css/multisearch-styles.css
  */
  
}

/**	=================================================================
  *	End Style Store
  *	=================================================================
  */

/**
  *	Import Dependencies
  *	
  *	@depends ../search/media-embed.js
  *	@depends stylesheet-store.js
  */
  // Start Display Functions ---------------------------------------------------------
// Restyles the page
function restylePage() {
	logoToTrans();
	
	allStyles();
}
// Adds all the styles for the page.
function allStyles () {
	var maxwidth = window.innerWidth - 50;
	var maxheight = window.innerHeight - 100;
	
	if(document.getElementsByClassName("g")[0]) {
		var lists = document.getElementsByClassName("g")[0].parentNode;
		lists.id = "resOL";
		dockShow = lists;
	}
	
	GM_addStyle(ssStore.gen_stylesheet);
	
	GM_addStyle(ssStore.multisearch_stylesheet);
	
	GM_addStyle(ssStore.clrpicker_stylesheet);
	
	if (options.styl == "media" && (options.imgs || options.vids) && false) {
		GM_addStyle(ssStore.media_stylesheet);
		$("resOL").parentNode.className = "resBox";
		$("resOL").parentNode.appendChild($("nav"));
		
	} else if (options.styl == "dock" && false) {
		GM_addStyle(ssStore.dock_stylesheet);
		
		var dock = $create("div", {
			id : 'dock'
		});
		
		var icon = $create("div", {
			className : "dockLink"
		});
		var alink = $create("a", {
			href : "#ssb",
			id : "searchDock"
		});
		
		if (options.docknavstl == 'icon' || options.docknavstl == 'both') {
			alink.appendChild($create('img', {
				src : image_store.dock_web_icon,
				alt : 'Web'
			}));
		}
		if(options.docknavstl == 'text' || options.docknavstl == 'both') {
			alink.innerHTML += "Web";
		}
		
		icon.appendChild(alink);
		icon.addEventListener("click",function (e) {
			if ($('resOL').className == "removed") {
				$('resOL').className = "";
				dockShow.className = "removed";
				$("nav").className = "";
				dockShow = $('resOL');
			}
			e.stopPropagation();
			e.preventDefault();
		}, false);
		dock.appendChild(icon);
		
		if (options.wiki) {
			icon = $create("div", {
				className : "dockLink"
			});
			alink = $create("a", {
				href : "#ssb",
				id : "wikiDock",
				className : "removed"
			});
			
			if (options.docknavstl == 'icon' || options.docknavstl == 'both') {
				alink.appendChild($create('img', {
					src : image_store.dock_wiki_icon,
					alt : 'Wikipedia'
				}));
			}
			if(options.docknavstl == 'text' || options.docknavstl == 'both') {
				alink.innerHTML += "Wiki";
			}
			
			icon.appendChild(alink);
			icon.addEventListener("click",function (e) {
				if ($('wikiDiv') && $('wikiDiv').className == "removed") {
					$('wikiDiv').className = "";
					dockShow.className = "removed";
					$("nav").className = "removed";
					dockShow = $('wikiDiv');
				}
				e.stopPropagation();
				e.preventDefault();
			}, false);
			dock.appendChild(icon);
		}
		
		if (options.vids) {
			icon = $create("div", {
				className : "dockLink"
			});
			alink = $create("a", {
				href : "#ssb",
				id : "vidDock",
				className : "removed"
			});
			
			if (options.docknavstl == 'icon' || options.docknavstl == 'both') {
				alink.appendChild($create('img', {
					src : image_store.dock_video_icon,
					alt : 'Videos'
				}));
			}
			if(options.docknavstl == 'text' || options.docknavstl == 'both') {
				alink.innerHTML += "Video";
			}
			
			icon.appendChild(alink);
			icon.addEventListener("click",function (e) {
				if ($('videoList') && $('videoList').className == "removed") {
					$('videoList').className = "";
					dockShow.className = "removed";
					$("nav").className = "removed";
					dockShow = $('videoList');
				}
				e.stopPropagation();
				e.preventDefault();
			}, false);
			dock.appendChild(icon);
		}
		
		if (options.imgs) {
			icon = $create("div", {
				className : "dockLink"
			});
			alink = $create("a", {
				href : "#ssb",
				id : "imgDock",
				className : "removed"
			});
			
			if (options.docknavstl == 'icon' || options.docknavstl == 'both') {
				alink.appendChild($create('img', {
					src : image_store.dock_image_icon,
					alt : 'Images'
				}));
			}
			if(options.docknavstl == 'text' || options.docknavstl == 'both') {
				alink.innerHTML += "Image";
			}
			
			icon.appendChild(alink);
			icon.addEventListener("click",function (e) {
				if ($('imageList') && $('imageList').className == "removed") {
					$('imageList').className = "";
					dockShow.className = "removed";
					$("nav").className = "removed";
					dockShow = $('imageList');
				}
				e.stopPropagation();
				e.preventDefault();
			}, false);
			dock.appendChild(icon);
		}
		
		$('center_col').parentNode.insertBefore(dock, $('center_col'));
	} else if (options.styl == "center") {
		GM_addStyle(ssStore.center_stylesheet);
	} else {
		GM_addStyle(ssStore.classic_stylesheet);
	}
}
// Creates a basic right floating box of given id
function rightBox(idName) {
	return $create("div", {
		className : "rBox",
		id : idName
	});
}
// Greys out the page
function greydout() {
	var greyer = $create("div", {
		id : "greyOut",
		title : "Return to the main page"
	});
	document.body.appendChild(greyer);
	return greyer;
}
// Creates a player div used by both the video and image searchs
function makePlayer() {
	embedder = new Media_Embed();
	embedder.draw($('mBox'));
}
// Change the icon sheet from Google to be transparent
function iconSheetTrans() {
	var img = new Image();
	img.src = unsafeWindow.getComputedStyle($cl('csb')[0], null).backgroundImage.replace(/^url\("/,'').replace(/"\)$/,'');
	try {
		var canvas = $create('canvas', {
			id : 'transLogo',
			width: img.width,
			height: img.height
		});
		var ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0,img.width,img.height);
		
		var imgd = ctx.getImageData(0, 0,img.width,img.height);
		var pix = imgd.data;
		for (var i = 0, n = pix.length; i < n; i += 4) {
			if(pix[i+3] != 0 && (Math.abs(pix[i] - pix[i+1]) < 75 && Math.abs(pix[i+1] - pix[i+2]) < 75) ) {
				pix[i+3] = Math.sqrt(255) * Math.sqrt(255 - Math.min(pix[i],Math.min(pix[i+1],pix[i+2])));
			}
		}
		ctx.putImageData(imgd, 0, 0);
		
		return canvas.toDataURL("image/png");
	} catch (_ex) {
		return img.src;
	}
}
	// End Display Functions -----------------------------------------------------------

	// Start Update Script ---------------------------------------------------------------
// Fetches script homepage to check for updates
function scriptPage() {
	var dt = new Date();
	if (options.newversion > parseFloat(version) && options.newversion != 0.0) {
		verNotice();
	} else if (Date.now() - options.updateCheck >= 86400000 || options.updateCheck === 0) {
		GM_setValue("updtTime", Date.now().toString());
		get("http://userscripts.org/scripts/source/33449.meta.js", chckAgainst, unable);
	}
}
//Dummy function for errors
function unable(response) {}
// Checks the version number on the script homepage against this version number and informs if a newer version is available
function chckAgainst(response) {
	var newest = parseFloat(/\/\/ @version.+/.exec(response.responseText)[0].replace(/\/\/ @version\s+/, ''));
	// Creates an install link if a newer version is available
	if (newest > version) {
		GM_setValue("newver", "" + newest);
		verNotice();
	}
}
// Displays a notification about a new update
function verNotice() {
	var divHolder = $create('div', {
		id : "newVer"
	});
	
	divHolder.appendChild($create("span", {
		textContent : "A newer version of Google Bump is available.",
		className : "newVerAvailable"
	}));
	
	var uplink = $create("a", {
		href : "http://userscripts.org/scripts/source/33449.user.js",
		textContent : "Update Google Bump"
	});
	divHolder.appendChild(uplink);
	
	uplink = $create("a", {
		href : "http://userscripts.org/scripts/show/33449#full_description",
		textContent : "Change Log"
	});
	divHolder.appendChild(uplink);
	
	document.body.appendChild(divHolder);
	GM_addStyle("#leftnav { padding-top: 80px; } ");
}
	// End Update Script -----------------------------------------------------------------

/**
  *	General Purpose Color Picker
  */
function color_picker(color, title) {
	
	this.clickHandles = [];
	this.color = color;
	this.title = title;
	this.bwCanvas;
	this.bwCtx;
	this.cbCanvas;
	this.cbCtx;
	this.container;
	
	this.draw = function (attachedNode) {
		this.container = $create('div', {
			'className' : 'colorContainer'
		});
		
		if (this.title) {
			this.heading = $create('h3', {
				'textContent' : this.title
			});
			this.container.appendChild(this.heading);
		}
		
		var realtone = this.color;
		this.tone = this.getBaseColor(realtone);
		this.drawBW(this.tone, realtone);
		this.drawCB(this.tone);
		this.drawSettings(this.color);
		
		document.body.appendChild(this.container);
	};
	
	this.drawBW = function (tone, realtone) {
		tone = tone || '255,0,0';
		realtone = realtone || '255,255,255';
		
		this.bwCanvas = $create('canvas', {
			'className' : 'colorToneToBlack'
		});
		this.bwCanvas.width = 255;
		this.bwCanvas.height = 255;
		this.bwCanvas.style.position = 'relative';
		this.container.appendChild(this.bwCanvas);
		this.bwCtx = this.bwCanvas.getContext('2d');
		
		this.redrawBW(tone);
		
		var SR = this;
		this.bwCanvas.addEventListener('mousedown', function (e) {
			var cd = function (e) {
				SR.clickDelegate(e);
			};
			cd(e);
			document.body.addEventListener('mousemove', cd, false);
			document.body.addEventListener('mouseup', function() {
				document.body.removeEventListener('mousemove', cd, false);
			}, false);
		}, false);
	};
	
	this.redrawBW = function (tone) {
		var wtc = this.bwCtx.createLinearGradient(0,0,255,0);
		wtc.addColorStop(0, 'rgb(255,255,255)');
		wtc.addColorStop(1, 'rgb(' + tone + ')');
		this.bwCtx.fillStyle = wtc;
		this.bwCtx.fillRect(0,0,255,255);
		var btw = this.bwCtx.createLinearGradient(0,0,0,255);
		btw.addColorStop(0,'rgba(255,255,255,0)');
		btw.addColorStop(1,'rgb(0,0,0)');
		this.bwCtx.fillStyle = btw;
		this.bwCtx.fillRect(0,0,255,255);
	};
	
	this.drawBWDot = function (x,y) {
		this.bwCtx.strokeStyle = "rgba(0,0,0,1)";
		//this.bwCtx.strokeRect(x-4,y-3, 8, 6);
		this.bwCtx.beginPath();
		this.bwCtx.arc(x,y,4,0,Math.PI*2,false);
		this.bwCtx.closePath();
		this.bwCtx.stroke();
		this.bwCtx.strokeStyle = "rgba(255,255,255,1)";
		//this.bwCtx.strokeRect(x-3,y-2, 6,4);
		this.bwCtx.beginPath();
		this.bwCtx.arc(x,y,3,0,Math.PI*2,false);
		this.bwCtx.closePath();
		this.bwCtx.stroke();
	};
	
	this.getBaseColor = function (color) {
		colors = color.split(/,\s?/);
		var maxIndex = 0;
		var minIndex = 0;
		for (var c = 0; c < colors.length; c++) {
			if (parseInt(colors[c]) > colors[maxIndex]) {
				maxIndex = c;
			} else if (parseInt(colors[c]) < colors[minIndex]) {
				minIndex = c;
			}
		}
		if(maxIndex == minIndex)
			return '255,0,0';
		colors[maxIndex] = 255;
		colors[minIndex] = 0;
		return colors.join(',');
	};
	
	this.getCBoffset = function (clr) {
		var base = clr.split(',');
		if(!(base[0] == base[1] && base[1] == base[2]))
			for(var i = 7; i < 262; i++) {
				var data = this.cbCtx.getImageData(15,7+i,1,1).data;
				
				if(Math.abs(data[0] - base[0]) < 10 &&
						Math.abs(data[1] - base[1]) < 10 &&
						Math.abs(data[2] - base[2]) < 10)
					return i;
			}
		return 7;
	};
	
	this.drawCB = function (yOffset) {
		// Color Bar
		this.cbCanvas = $create('canvas', {
			'className' : 'colorBar'
		});
		this.cbCanvas.width = 40;
		this.cbCanvas.height = 269;
		this.cbCanvas.style.position = 'relative';
		this.container.appendChild(this.cbCanvas);
		this.cbCtx = this.cbCanvas.getContext('2d');
		this.redrawCB(yOffset);
			
		var SR = this;
		this.cbCanvas.addEventListener('mousedown', function (e) {
			SR.colorPick(e);
			SR.mousePosX = e.pointerX;
			SR.mousePosY = e.pointerY;
			var colordrag = function (e) {SR.colorDrag(e);};
			document.body.addEventListener('mousemove', colordrag, false);
			document.body.addEventListener('mouseup', function (e) {
				document.body.removeEventListener('mousemove', colordrag, false);
				e.preventDefault();
				e.stopPropagation();
			}, false);
		}, false);
	};
	
	this.redrawCB = function (yOffset) {
		this.cbCtx.clearRect(0,0,255,269);
		var rtr = this.cbCtx.createLinearGradient(0,0,0,255);
		rtr.addColorStop(0, 'rgb(255,0,0)');
		rtr.addColorStop(1/6, 'rgb(255,255,0)');
		rtr.addColorStop(1/3, 'rgb(0,255,0)');
		rtr.addColorStop(1/2, 'rgb(0,255,255)');
		rtr.addColorStop(2/3, 'rgb(0,0,255)');
		rtr.addColorStop(5/6, 'rgb(255,0,255)');
		rtr.addColorStop(1, 'rgb(255,0,0)');
		this.cbCtx.fillStyle = rtr;
		this.cbCtx.fillRect(10,7,20,255);
		
		if (typeof(yOffset) != typeof(1)) yOffset = this.getCBoffset(yOffset);
		this.cbCtx.strokeStyle = "rgba(255,255,255,1)";
		this.cbCtx.strokeRect(7,yOffset-2, 26, 5);
		this.cbCtx.strokeStyle = "rgba(0,0,0,1)";
		this.cbCtx.strokeRect(6,yOffset-3,28,7);
	};
	
	this.drawSettings = function () {
		this.settingsDiv = $create('div', {
			'class' : 'gb_colorSettings'
		});
		
		
		this.previewDiv = $create('div', {
			'class' : 'gb_colorPreview',
			'style' : 'background-color: rgb('+this.color+');'
		});
		this.settingsDiv.appendChild(this.previewDiv);
		
		this.redValueInput = $create('input', {
			'type': 'text',
			'class': 'gb_colorInput',
			'id': 'gb_colorInputRed',
			'pattern' : '^([0-1]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])$',
			'maxlength' : 3,
			'value' : this.color.split(',')[0]
		});
		var label = $create('label', {
			'textContent' : 'Red: ',
			'class': 'gb_rgblabel'
		});
		label.appendChild(this.redValueInput);
		this.settingsDiv.appendChild(label);
		
		this.greenValueInput = $create('input', {
			'type': 'text',
			'class': 'gb_colorInput',
			'id': 'gb_colorInputGreen',
			'pattern' : '^([0-1]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])$',
			'maxlength' : 3,
			'value' : this.color.split(',')[1]
		});
		label = $create('label', {
			'textContent' : 'Green: ',
			'class': 'gb_rgblabel'
		});
		label.appendChild(this.greenValueInput);
		this.settingsDiv.appendChild(label);
		
		this.blueValueInput = $create('input', {
			'type': 'text',
			'class': 'gb_colorInput',
			'id': 'gb_colorInputBlue',
			'pattern' : '^([0-1]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])$',
			'maxlength' : 3,
			'value' : this.color.split(',')[2]
		});
		label = $create('label', {
			'textContent' : 'Blue: ',
			'class': 'gb_rgblabel'
		});
		label.appendChild(this.blueValueInput);
		this.settingsDiv.appendChild(label);
		this.hexValue = $create('input', {
			'type': 'text',
			'class': 'gb_hexInput',
			'pattern' : '^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$',
			'maxlength' : 6,
			'value' : this.getHex(this.color)
		});
		label = $create('label', {
			'textContent' : 'Hex: ',
			'class': 'gb_hexlabel'
		});
		label.appendChild(this.hexValue);
		this.settingsDiv.appendChild(label);
		
		var SR = this;
		var chng = function (e) {
			SR.setColor(([SR.redValueInput.value
					,SR.greenValueInput.value
					,SR.blueValueInput.value])
				.join(','));
		};
		this.redValueInput.addEventListener('change', chng, false);
		this.greenValueInput.addEventListener('change', chng, false);
		this.blueValueInput.addEventListener('change', chng, false);
		this.hexValue.addEventListener('change', function () {
			var clr = SR.getRGB(SR.hexValue.value);
			SR.setColor(clr);
			SR.tone = SR.getBaseColor(SR.color);
			SR.redrawCB(SR.tone);
			SR.redrawBW(SR.tone);
		}, false);
		
		var btnDiv = $create('div', {
			'class' : 'gb_colorBtnContainer'
		});
		this.saveButton = $create('input', {
			'type': 'button',
			'value': 'Save',
			'class': 'gb_colorPickerButton'
		});
		btnDiv.appendChild(this.saveButton);
		this.cancelButton = $create('input', {
			'type': 'button',
			'value': 'Cancel',
			'class': 'gb_colorPickerButton'
		});
		btnDiv.appendChild(this.cancelButton);
		this.settingsDiv.appendChild(btnDiv);
		
		this.cancelButton.addEventListener('click', function () {
			SR.undraw();
		}, false);
		this.saveButton.addEventListener('click', function () {
			SR.callback();
			SR.undraw();
		}, false);
		
		this.container.appendChild(this.settingsDiv);
	};
	
	this.colorPick = function (e) {
		e.stopPropagation();
		e.preventDefault();
		if(e.layerY >= 7 && e.layerY < 261) {
			this.redrawCB(e.layerY);
			var data = this.cbCtx.getImageData(25, e.layerY, 1, 1).data;
			
			this.tone = data[0] + ',' + data[1] + ',' + data[2];
			this.redrawBW(this.tone);
		}
	};
	
	this.setColor = function (rgb) {
		this.color = rgb;
		this.previewDiv.style.backgroundColor = 'rgb('+this.color+')';
		this.redValueInput.value = rgb.split(',')[0];
		this.greenValueInput.value = rgb.split(',')[1];
		this.blueValueInput.value = rgb.split(',')[2];
		this.hexValue.value = this.getHex(rgb);
	};
	
	this.colorDrag = function (e) {
		e.stopPropagation();
		e.preventDefault();
		
		/* Find Common Offsets, and subtract them */
		var ly = e.layerY;
		var minval = 7;
		var maxval = 261;
		if(e.originalTarget != this.cbCanvas) {
			var cby = getOffset(this.cbCanvas);
			ly = e.clientY - cby.y;
		}
		ly = Math.max(minval,Math.min(maxval,ly));
		this.redrawCB(ly - minval + 7);
		var data = this.cbCtx.getImageData(25, ly - minval + 7, 1, 1).data;
		
		this.tone = data[0] + ',' + data[1] + ',' + data[2];
		this.redrawBW(this.tone);
	};
	
	this.clickDelegate = function (e) {
		
		/* Find Common Offsets, and subtract them */
		var ly = e.layerY;
		var lx = e.layerX;
		var minval = 0;
		var maxval = 254;
		this.redrawBW(this.tone);
		if(e.originalTarget != this.bwCanvas) {
			var bw = getOffset(this.bwCanvas);
			ly = e.clientY - bw.y;
			lx = e.clientX - bw.x;
		}
		ly = Math.max(minval,Math.min(maxval,ly));
		lx = Math.max(minval,Math.min(maxval,lx));
		var data = this.bwCtx.getImageData(lx, ly, 1, 1).data;
		var selection = data[0] + ',' + data[1] + ',' + data[2];
		
		this.setColor(selection);
		this.drawBWDot(lx, ly);
	};
	
	this.callback = function () {
		for(var cd = 0; cd < this.clickHandles.length; cd++) {
			this.clickHandles[cd](this.color);
		}
	}
	
	this.registerCallback = function (func) {
		this.clickHandles.push(func);
	};
	
	this.unregisterCallback = function (func) {
		if(func) {
			for(var ch = 0; ch < this.clickHandles.length; ch++) {
				if(func == this.clickHandles[ch]) {
					this.clickHandles.splice(ch, 1);
					break;
				}
			}
		} else {
			this.clickHandles = [];
		}
	};
	
	this.undraw = function () {
		$remove(this.container);
	};
	
	this.getHex = function (clr) {
		var cspl = clr.split(',');
		if(cspl.length == 3) {
			return (
				strlpad(parseInt(cspl[0]).toString(16),'0',2)+ '' +
				strlpad(parseInt(cspl[1]).toString(16),'0',2)+ '' +
				strlpad(parseInt(cspl[2]).toString(16),'0',2)+ '');
		}
		return '';
	};
	
	this.getRGB = function (hex) {
		if(hex.length == 3) {
			hex = 
				hex.substr(0,1)+hex.substr(0,1) +
				hex.substr(1,1)+hex.substr(1,1) +
				hex.substr(2,1)+hex.substr(2,1);
		}
		if (hex.length == 6) {
			return (
				parseInt(hex.substr(0,2),16) + ',' +
				parseInt(hex.substr(2,2),16) + ',' +
				parseInt(hex.substr(4,2),16));
		}
		return '';
	};
}

/**
  *	Import dependencies
  *	
  *	@depends color-picker.js
  */

/**
  *	Configuration tab
  */
function config_tab(title, id, on) {
	
	this.title = title;
	this.id = id;
	this.tab;
	this.siblings = on && on.siblings.push(this) ? on.siblings : new Array(this);
	this.on = on ? on : this;
	
	this.draw = function (parentNode) {
		
		this.tab = $create("div", {
			className : this.on == this ? "conf_Tab selected_tab" : "conf_Tab",
			id : this.id
		});
		if (typeof this.title == 'string') {
			this.tab.textContent = this.title;
		} else {
			this.tab.appendChild(this.title);
		}
		
		var self = this;
		this.tab.addEventListener("click", function (event) {
			self.goTo();
		}, false);
		
		parentNode.appendChild(this.tab);
	};
	
	this.goTo = function () {
		$(this.on.tab.id.substr(2)).className = "removed";
		this.on.tab.className = "conf_Tab";
		
		$(this.tab.id.substr(2)).className = "confTabOn";
		this.tab.className = "conf_Tab selected_tab";
		
		for (i = this.siblings.length - 1; i >= 0; i--) {
			this.siblings[i].on = this;
		}
	};
}

/**
  *	Configuration window
  */
function config_window(tab, id) {
	
	this.tab = tab;
	this.id = id;
	this.window;
	this.sections = new Array();
	
	this.draw = function (parentNode) {
		this.window = $create("div", {
			className : this.tab.on == this.tab ? "confTabOn" : "removed",
			id : this.id
		});
		var ckcount = 0;
		for (var so = 0; so < this.sections.length; so++) {
			this.sections[so].draw(this.window);
			ckcount+= this.sections[so].checkboxes;
		}
		
		if (ckcount >= 2) {
			var SR = this;
			var select = new button("Select All", function () { SR.SelectAll(); });
			select.draw(this.window);
			var deselect = new button("Deselect All", function () { SR.DeselectAll(); });
			deselect.draw(this.window);
		}
			
		parentNode.appendChild(this.window);
	};
	
	this.SelectAll = function () {
		for (var so = 0; so < this.sections.length; so++) {
			this.sections[so].SelectAll();
		}
	};
	
	this.DeselectAll = function () {
		for (var so = 0; so < this.sections.length; so++) {
			this.sections[so].DeselectAll();
		}
	};
	
	this.setDefaults = function () {
		for (var so = 0; so < this.sections.length; so++) {
			this.sections[so].setDefaults();
		}
	};
}

/**
  *	Configuration section
  */
function config_section(title) {
	
	this.title = title ? title : "";
	this.sectionOptions = new Array();
	this.checkboxes = 0;
	this.selectboxes = 0;
	
	this.draw = function (parentNode) {
		var sect = $create("div", {
			className : "conf_subsect"
		});
		if(this.title != "") {
			var hdng = $create("h3", {
				textContent : this.title,
				className : "config_section_head"
			});
			sect.appendChild(hdng);
		}
		for (var soo = 0; soo < this.sectionOptions.length; soo++) {
			this.sectionOptions[soo].draw(sect);
			if(this.sectionOptions[soo].cbox) {
				this.checkboxes++;
			} else {
				this.selectboxes++;
			}
		}
		parentNode.appendChild(sect);
	};
	
	this.SelectAll = function () {
		for (var so = 0; so < this.sectionOptions.length; so++) {
			if(this.sectionOptions[so].cbox) {
				this.sectionOptions[so].cbox.checked = true;
			}
		}
	};
	
	this.DeselectAll = function () {
		for (var so = 0; so < this.sectionOptions.length; so++) {
			if(this.sectionOptions[so].cbox) {
				this.sectionOptions[so].cbox.checked = false;
			}
		}
	};
	
	this.setDefaults = function () {
		for (var so = 0; so < this.sectionOptions.length; so++) {
			this.sectionOptions[so].setDefault();
		}
	};
}

/**
  *	Configuration descriptoin area
  */  
function config_desc_section(title, content) {
	
	this.title = title ? title : "";
	this.content = typeof content == "string" ? $create('p', { textContent : content }) : content;
	
	this.draw = function (parentNode) {
		var sect = $create("div", {
			className : "conf_subsect"
		});
		if(this.title != "") {
			var hdng = $create("h3", {
				textContent : this.title,
				className : "config_section_head"
			});
			sect.appendChild(hdng);
		}
		sect.appendChild(this.content);
		parentNode.appendChild(sect);
	};
	
	this.SelectAll = function () {
		return;
	};
	
	this.DeselectAll = function () {
		return;
	};
	
	this.setDefault = function () {
		return;
	};
}

/**
  *	Configuration boolean check box
  */
function config_checkBox(label, id, dflt) {
	
	this.label = label;
	this.id = id;
	this.value = GM_getValue(id, dflt);
	this.defaultVal = dflt;
	this.cbox;
	
	this.draw = function (parentNode) {
		var lbl = $create("label", {
			textContent : this.label + ": ",
			"for" : this.id
		});
		this.cbox = $create("input",{
			type : "checkbox",
			name : this.id,
			id : this.id
		});
		if (this.value) {
			this.cbox.checked = true;
		}
		this.cbox.addEventListener("change", function(event) {
			GM_setValue(event.target.id, event.target.checked); 
		}, true);
		
		var hldr = $create('div', {
			className : 'config_option'
		});
		
		hldr.appendChild(lbl);
		hldr.appendChild(this.cbox);
		parentNode.appendChild(hldr);
	};
	
	this.setDefault = function () {
		if (this.cbox) {
			this.cbox.checked = this.defaultVal;
			GM_setValue(this.id, this.defaultVal);
		}
	};
}

/**
  *	Configuration list selection box
  */
function config_selectionBox(label, id, op_labels, op_values, dflt) {
	
	this.label = label;
	this.id = id;
	this.currentValue = GM_getValue(id, dflt);
	this.defaultVal = dflt;
	this.options = op_labels;
	this.values = op_values;
	this.list;
	
	this.draw = function (parentNode) {
		var disp = $create("p", {
			textContent : this.label + ": ",
			className : "confLbl"
		});
		this.list = $create("select", {
			name : this.id,
			className : "opli"
		});
		var SR = this;
		this.list.addEventListener("change", function(event) { 
			GM_setValue(SR.list.name, SR.list.value);
		}, true);
		// Creates the desired Options with the given  values and ids
		for (var lo = 0; lo < this.options.length; lo++) {
			var op = $create("option", {
				textContent : this.options[lo],
				value : this.values[lo],
				id : this.id + "_" + lo
			});
			if (this.values[lo] == this.currentValue) {
				op.selected = true;
			}
			this.list.appendChild(op);
		}
		
		var hldr = $create('div', {
			className : 'config_option'
		});
		
		hldr.appendChild(disp);
		hldr.appendChild(this.list);
		parentNode.appendChild(hldr);
	};
	
	this.setDefault = function () {
		if (this.list) {
			this.list.value = this.defaultVal;
			GM_setValue(this.id, this.defaultVal);
		}
	};
}

/**
  *	Configuration color selector
  */
function config_colorBox(label, id, dflt) {
	
	this.label = label;
	this.id = id;
	this.currentValue = GM_getValue(id, dflt);
	this.defaultVal = dflt;
	this.box;
	this.popout;
	
	this.draw = function (parentNode) {
		var disp = $create("p", {
			textContent : this.label + ": ",
			className : "confLbl"
		});
		this.box = $create("input", {
			type : 'text',
			name : this.id,
			className : "configColorBox"
		});
		this.box.style.backgroundColor = 'rgb(' + this.currentValue + ')';
		
		this.popout = popupManager.newColor(this.currentValue, this.label);
		
		var SR = this;
		this.box.addEventListener("click", function(event) { 
			this.blur();
			
			offLeft = 0;
			offTop = 0;
			var node = this;
			while(node != document.body) {
				offLeft += node.offsetLeft + 1;
				offTop += node.offsetTop + 1;
				node = node.offsetParent;
			}
			
			popupManager.closeColor();
			SR.popout.draw(SR.box);
			SR.popout.container.style.top = Math.min(window.innerHeight - 276, (offTop - 1)) + "px";
			SR.popout.container.style.left = Math.min(window.innerWidth - 313, (offLeft - 1)) + "px";
			
			document.addEventListener('click', function (e) {
				if(e.target.className != 'colorContainer' && (e.target.parentNode && e.target.parentNode.className != 'colorContainer')) {
					//popupManager.closeColor();
					document.removeEventListener('click', arguments.callee, false);
				} else {
					e.stopPropagation();
				}
			}, false);
			event.stopPropagation();
		}, true);
		this.popout.registerCallback(function(clr) {
			SR.box.style.backgroundColor = "rgb(" + clr + ")";
			GM_setValue(id, clr);
		});
		
		var hldr = $create('div', {
			className : 'config_option'
		});
		
		hldr.appendChild(disp);
		hldr.appendChild(this.box);
		parentNode.appendChild(hldr);
	};
	
	this.setDefault = function () {
		if (this.box) {
			this.box.style.backgroundColor = 'rgb(' + this.defaultVal + ')';
			GM_setValue(this.id, this.defaultVal);
		}
	};
}

/**
  *	Key Value Table
  */
function config_keyvalTable(label, id, keys, vals, dflt) {
	
	this.label = label;
	this.id = id;
	this.currentValue = GM_getValue(id, dflt);
	this.defaultVal = dflt;
	this.keys = keys;
	this.values = vals;
	this.divwrap;
	this.tbl;
	this.hlgtrow;
	
	this.draw = function (parentNode) {
		this.divwrap = $create('div', {
			className : 'confKeyVal'
		});
		
		this.tbl = $create('table', {
			className : 'confKeyValTbl'
		});
		
		for(var kv = 0, len = this.keys.length; kv < len; kv++) {
			var tr = $create('tr', {
				className : 'confKeyValPair'
			});
			var keytd = $create('td', {
				className : 'confKey',
				textContent : this.keys[kv]
			});
			var valtd = $create('td', {
				className : 'confVal',
				innerHTML : this.values[kv].replace(/\*\*(\w+)\*\*/g,'<span class="confValHighlight">$1</span>')
			});
			tr.appendChild(keytd);
			tr.appendChild(valtd);
			this.tbl.appendChild(tr);
		}
		
		this.divwrap.appendChild(this.tbl);
		parentNode.appendChild(this.divwrap);
		
		// Commented out.....########################################
		return;
		var disp = $create("p", {
			textContent : this.label + ": ",
			className : "confLbl"
		});
		this.list = $create("select", {
			name : this.id,
			className : "opli"
		});
		var SR = this;
		this.list.addEventListener("change", function(event) { 
			GM_setValue(SR.list.name, SR.list.value);
		}, true);
		// Creates the desired Options with the given  values and ids
		for (var lo = 0; lo < this.options.length; lo++) {
			var op = $create("option", {
				textContent : this.options[lo],
				value : this.values[lo],
				id : this.id + "_" + lo
			});
			if (this.values[lo] == this.currentValue) {
				op.selected = true;
			}
			this.list.appendChild(op);
		}
		
		var hldr = $create('div', {
			className : 'config_option'
		});
		
		hldr.appendChild(disp);
		hldr.appendChild(this.list);
		parentNode.appendChild(hldr);
	};
	
	this.setDefault = function () {
		if (this.list) {
			this.list.value = this.defaultVal;
			GM_setValue(this.id, this.defaultVal);
		}
	};
	
	this.addKeyVal = function (_k, _v) {
		this.keys.push(_k);
		this.values.push(_v);
	};
	
	this.removeKeyVal = function (_i) {
		
	};
	
	this.getKeyValPairs = function (_op) {
		if (!_op) {
			_op = function (k,v) { return "{\"key\" : " + k + "\",\"value\":\"" + v + "\"}"; };
		}
		var strStore = "[";
		for(var kv = 0, len = this.keys.length; kv < len; kv++) {
			strStore += _op(this.keys[kv], this.values[kv]);
			if(kv < len - 1) {
				strStore += ",";
			}
		}
		return strStore + "]";
	};
	
	this.highlightrow = function (e) {
		e.target.className += 'confKeyValHighlightedRow';
	};
}

/**
  *	Configuration unvalidated text field
  */
function config_textField(label, id, dflt) {
	
	this.label = label;
	this.id = id;
	this.value = GM_getValue(id, dflt);
	this.defaultVal = dflt;
	this.tbox;
	
	this.draw = function (parentNode) {
		var lbl = $create("label", {
			textContent : this.label + ": ",
			"for" : this.id
		});
		this.tbox = $create("textarea",{
			name : this.id,
			id : this.id,
			className : "config_textField",
			textContent : this.value
		});
		this.tbox.addEventListener("change", function(event) {
			GM_setValue(event.target.id, event.target.value); 
		}, true);
		
		var hldr = $create('div', {
			className : 'config_option'
		});
		
		hldr.appendChild(lbl);
		hldr.appendChild(this.tbox);
		parentNode.appendChild(hldr);
	};
	
	this.setDefault = function () {
		if (this.tbox) {
			this.tbox.value = this.defaultVal;
			GM_setValue(this.id, this.defaultVal);
		}
	};
}

/**
  *	Configuration unvalidated text field
  */
function config_intField(label, id, dflt) {
	
	this.label = label;
	this.id = id;
	this.value = GM_getValue(id, dflt);
	this.defaultVal = dflt;
	this.tbox;
	
	this.draw = function (parentNode) {
		var lbl = $create("label", {
			textContent : this.label + ": ",
			"for" : this.id
		});
		this.tbox = $create("input",{
			name : this.id,
			id : this.id,
			className : "config_intField",
			value : this.value
		});
		this.tbox.addEventListener("change", function(event) {
			if(parseInt(event.target.value) == event.target.value) {
				GM_setValue(event.target.id, event.target.value);
			} else {
				event.target.value = GM_getValue(id, dflt);
			}
		}, true);
		
		var hldr = $create('div', {
			className : 'config_option'
		});
		
		hldr.appendChild(lbl);
		hldr.appendChild(this.tbox);
		parentNode.appendChild(hldr);
	};
	
	this.setDefault = function () {
		if (this.tbox) {
			this.tbox.value = this.defaultVal;
			GM_setValue(this.id, this.defaultVal);
		}
	};
}

/**
  *	General purpose button object
  */
function button(value, action) {
	
	this.val = value;
	this.btn;
	this.action = action;
	
	this.draw = function (parentNode) {
		this.btn = $create("input", {
			type : 'button',
			value : this.val
		});
		
		var SR = this;
		this.btn.addEventListener("click", function () {
			SR.action();
		}, false);
		
		parentNode.appendChild(this.btn);
	}
	
	this.undraw = function () {
		$remove(this.btn);
		this.btn = undefined;
	}
}

/**
  *	Import dependencies
  *	
  *	@depends dialog-pieces.js
  */
/**	=================================================================
  *	Dialogs
  *	=================================================================
  */

/**	popup_manager
  *	Popup Dialog Manager Object
  *	
  *	Functions
  *		newSlideShow
  *			<= Return popup_dialog => Creates a new slideshow
  *		
  *		newStyler
  *			<= Return popup_dialog => Creates a new styler dialog
  *		
  *		newConfig
  *			<= Return popup_dialog => Creates a new configuration dialog
  *		
  *		newColor
  *			<= Return popup_dialog => Creates a new color popup
  *		
  *		newPopup
  *			<= Return popup_dialog => Creates a new popup of a given type
  *		
  *		closeAll
  *			Closes any open popups
  *		
  *		closeColor
  *			Closes any open color popups
  *		
  *		readySwitch
  *			Prepares the page for switching dialogs
  *	
  */
function popup_manager () {
	
	this.popup = [];
	this.colorPopup = [];
	
	this.newSlideShow = function () {
		return this.newPopup(3);
	};
	
	this.newStyler = function () {
		return this.newPopup(1);
	};
	
	this.newConfig = function () {
		return this.newPopup(0);
	}
	
	this.newColor = function (tone, txt) {
		var cp = new color_picker(tone, txt);
		this.popup.push(cp);
		this.colorPopup.push(cp);
		return cp;
	}
	
	this.newPopup = function (type) {
		var nPop = new popup_dialog(type);
		nPop.init();
		this.popup.push(nPop);
		return nPop;
	};
	
	this.closeAll = function () {
		this.closeColor();
		for(var p = 0; p < this.popup.length; p++) {
			this.popup[p].undraw();
		}
	};
	
	this.closeColor = function () {
		for(var p = 0; p < this.colorPopup.length; p++) {
			this.colorPopup[p].undraw();
		}
	};
	
	this.readySwitch = function () {
		this.closeColor();
		for(var p = 0; p < this.popup.length; p++) {
			this.popup[p].undraw_dialog();
		}
	};
}

/**	popup_dialog
  *	Popup Dialog Object (Interface Substitute)
  *	
  *	Construction Parameters
  *		box_type	Type of popup dialog to create
  *			-	0		Configuration
  *			-	1		Styling Options
  *			-	2		About Dialog
  *			-	3		Slideshow
  *			-	4		Video Popup
  *			-	Other	Error
  *	
  *	Functions
  *		init
  *			Initializes the dialog
  *		
  *		draw
  *			Initializes and draws or redraws the dialog
  *		
  *		draw_shader
  *			Draws the shading on the page to cover the page
  *		
  *		undraw
  *			Undraw the dialog and shader
  *		
  *		undraw_dialog
  *			Undraw only the dialog
  *		
  *		undraw_shader
  *			Undraw only the shader
  *		
  *		is_drawn
  *			<= Return Boolean =>	If dialog is currently drawn
  *	
  */
function popup_dialog(box_type) {
	
	this.shader;
	this.dialog;
	this.dialog_type = box_type;
	this.initd = false;
	
	this.init = function () {
		if(this.dialog_type == 0) {
			this.dialog = new config_dialog(this);
		} else if(this.dialog_type == 1) {
			this.dialog = new style_dialog(this);
		} else if(this.dialog_type == 2) {
			this.draw_about();
		} else if(this.dialog_type == 3) {
			this.dialog = new slideshow_dialog(this);
		} else {
			this.draw_error();
		}
		this.initd = true;
	}
	
	this.draw = function (pass) {
		if(Number.NaN != this.dialog_type) {
			if(this.dialog && this.dialog.isDrawn) {
				this.undraw_dialog();
			}
			if(!this.shader) {
				this.draw_shader();
			}
			
			if(!this.initd) {
				this.init();
			}
			
			this.dialog.draw(pass);
		}
		
	};
	
	this.draw_shader = function() {
		this.shader = $create("div", {
			id : "greyOut",
			title : "Return to the main page"
		});
		document.body.appendChild(this.shader);
		var SR = this;
		this.shader.addEventListener("click", function (e) {
			SR.undraw_shader();
			if (SR.dialog_type == 0 || SR.dialog_type == 1) {
				location.reload();
			}
		}, false);
	};
	
	this.undraw = function() {
		this.undraw_dialog();
		this.undraw_shader();
	}
	
	this.undraw_dialog = function () {
		this.dialog.undraw();
	};
	
	this.undraw_shader = function () {
		if(this.dialog.isDrawn) {
			this.undraw_dialog();
		}
		
		$remove(this.shader);
		this.shader = undefined;
	};
	
	this.is_drawn = function () {
		return this.shader && this.dialog.isDrawn;
	};
};

/**	style_dialog
  *	Style Dialog Object
  *	
  *	Construction Parameters
  *		popup		The popup_dialog object it was created with
  *	
  *	Functions
  *		draw
  *			Draw the dialog on the page
  *	
  *		undraw
  *			Undraw the dialog
  *	
  *		setDefaults
  *			Set the defaults for all of the options
  *	
  */
function style_dialog(popup) {
	
	this.dialog;
	this.windows = new Array();
	this.isDrawn = false;
	this.popup = popup;
	
	this.draw = function () {
		var centDivStyl = $create("div", {
			id : "styleGoogBump",
			className : "GB_dialog_popup"
		});
		
		// The heading to the configuration page
		var welcome = $create("h1", {
			textContent : "Google Bump",
			id : "styleWel"
		});
		
		// Wrappers for the content
		var tabHead = $create("div", {
			id : "confTabs"
		});
		var selectHead = $create("div", {
			id : "confBoxSel"
		});
		var wrapper = $create("div", {
			id : "confWrap"
		});
		var btnwrap = $create("div", {
			id : "confBtnWrap"
		});
		
		// For selecting which options to use
		var optSelBox = $create("div", {
			className : "selBox",
			textContent : "Options"
		});
		var stlSelBox = $create("div", {
			className : "selBox selBoxOn",
			textContent : "Styles"
		});
		optSelBox.addEventListener('click', function (e) {
			configurations();
		}, false);
		
		selectHead.appendChild(optSelBox);
		selectHead.appendChild(stlSelBox);
		
		// Creates and appends the navigation tabs
		var genTab = new config_tab("General", "t_GenStyl");
		var bgcTab = new config_tab("Backgrounds", "t_BgColrs", genTab);
		var txcTab = new config_tab("Fonts", "t_TxColrs", genTab);
		var clcTab = new config_tab("Classic", "t_ClscStyl", genTab);
		var mdaTab = new config_tab("Media", "t_MdaStyl", genTab);
		var dckTab = new config_tab("Dock", "t_DockStyl", genTab);
		var cntTab = new config_tab("Center", "t_CentStyl", genTab);
		
		genTab.draw(tabHead);
		bgcTab.draw(tabHead);
		txcTab.draw(tabHead);
		clcTab.draw(tabHead);
		mdaTab.draw(tabHead);
		dckTab.draw(tabHead);
		cntTab.draw(tabHead);
		
		// Background Settings
		var bgc_set_window = new config_window(bgcTab, 'BgColrs');
			// Colors
		var bgc_section = new config_section("Background Colors");
		bgc_section.sectionOptions.push(new config_colorBox('Main Area', 'resltclr', options.DEFAULT_RESLTCLR));
		bgc_section.sectionOptions.push(new config_colorBox('Google Bar', 'glbarclr', options.DEFAULT_GLBARCLR));
		bgc_section.sectionOptions.push(new config_colorBox('Search Area', 'schbgclr', options.DEFAULT_SCHBGCLR));
		bgc_section.sectionOptions.push(new config_colorBox('Added Items', 'addedclr', options.DEFAULT_ADDEDCLR));
		bgc_section.sectionOptions.push(new config_colorBox('Embedable Videos', 'plyblclr', options.DEFAULT_PLYBLCLR));
		bgc_section.sectionOptions.push(new config_colorBox('Overlay', 'ovrlyclr', options.DEFAULT_OVRLYCLR));
		bgc_set_window.sections.push(bgc_section);
		
		// Font Settings
		var txc_set_window = new config_window(txcTab, 'TxColrs');
			// Colors
		var txc_section = new config_section("Text Colors");
		txc_section.sectionOptions.push(new config_colorBox('General', 'restxtclr', options.DEFAULT_RESTXTCLR));
		txc_section.sectionOptions.push(new config_colorBox('Google Bar Links', 'gbrtxtclr', options.DEFAULT_GBRTXTCLR));
		txc_section.sectionOptions.push(new config_colorBox('Google Bar Selected', 'gbotxtclr', options.DEFAULT_GBOTXTCLR));
		txc_section.sectionOptions.push(new config_colorBox('Links', 'lnktxtclr', options.DEFAULT_LNKTXTCLR));
		txc_section.sectionOptions.push(new config_colorBox('Result URL', 'urltxtclr', options.DEFAULT_URLTXTCLR));
		txc_section.sectionOptions.push(new config_colorBox('Similar and Paging Links', 'simtxtclr', options.DEFAULT_SIMTXTCLR));
		txc_section.sectionOptions.push(new config_colorBox('Added Items', 'mdatxtclr', options.DEFAULT_MDATXTCLR));
		txc_section.sectionOptions.push(new config_colorBox('Embed Area Text', 'plytxtclr', options.DEFAULT_PLYTXTCLR));
		txc_section.sectionOptions.push(new config_colorBox('Embedable Videos', 'pbltxtclr', options.DEFAULT_PBLTXTCLR));
		txc_set_window.sections.push(txc_section);
		
		// Classic Settings
		var classic_set_window = new config_window(clcTab, "ClscStyl");
			// General Settings
		var classic_section = new config_section("General");
		classic_section.sectionOptions.push(new config_checkBox("Hide Sidebar Ads", "sideads", options.DEFAULT_SIDEADS));
		//classic_section.sectionOptions.push(new config_desc_section('Coming Soon', 'This section is still under construction. Please excuse our mess.'));
		classic_set_window.sections.push(classic_section);
			// Media Content Settings
		var classic_media_section = new config_section("Media Content");
		classic_media_section.sectionOptions.push(new config_selectionBox("Orientation", "clcvrthrz", ["Horizontally", "Vertically"], ["horizontal", "vertical"], options.DEFAULT_CLCVRTHRZ));
		classic_media_section.sectionOptions.push(new config_selectionBox("Right/Top", "clctoprht", ["Images", "Videos"], ["images", "videos"], options.DEFAULT_CLCTOPRHT));
		classic_media_section.sectionOptions.push(new config_checkBox("Border", "clcborder", options.DEFAULT_CLCBORDER));
		classic_media_section.sectionOptions.push(new config_colorBox('Border Color', 'clcbdrclr', options.DEFAULT_CLCBDRCLR));
		classic_set_window.sections.push(classic_media_section);
		
		
		// Media Settings
		var media_set_window = new config_window(mdaTab, "MdaStyl");
			// General Settings
		var media_section = new config_section("General");
		media_section.sectionOptions.push(new config_intField("Images per set", "mdaimgnum", options.DEFAULT_MDAIMGNUM));
		media_section.sectionOptions.push(new config_selectionBox("Embed area", "mdaemdpos", ["Left", "Right", "Overlay"], ["left", "right", "over"], options.DEFAULT_MDAEMDPOS));
		media_set_window.sections.push(media_section);
		
		// Dock Settings
		var dock_set_window = new config_window(dckTab, "DockStyl");
			// Navigation Settings
		var dock_section = new config_section("Navigation");
		dock_section.sectionOptions.push(new config_selectionBox("Display", "docknavstl", ["Text", "Icons", "Both"], ["text", "icon", "both"], options.DEFAULT_DOCKNAVSTL));
		dock_section.sectionOptions.push(new config_checkBox("Border", "dockborder", options.DEFAULT_DOCKBORDER));
		dock_section.sectionOptions.push(new config_colorBox('Border Color', 'dockbdrclr', options.DEFAULT_DOCKBDRCLR));
		dock_section.sectionOptions.push(new config_colorBox('Background Color', 'dockbgclr', options.DEFAULT_DOCKBGCLR));
		dock_set_window.sections.push(dock_section);
		
		// Center Settings
		var center_set_window = new config_window(cntTab, "CentStyl");
			// General Settings
		var center_section = new config_section();
		center_section.sectionOptions.push(new config_colorBox('Background', 'genbgclr', options.DEFAULT_GENBGCLR));
		center_set_window.sections.push(center_section);
		
		// General Settings
		var gen_set_window = new config_window(genTab, "GenStyl");
			// Styles
		var gen_section = new config_section("Style");
		gen_section.sectionOptions.push(new config_selectionBox("Layout Style", "style", ["Classic", "Media (Disabled)", "Dock (Disabled)",/* "Columns",*/ "Centered"], ["classic", "media", "dock",/* "column",*/ "center"], options.DEFAULT_STYL));
		gen_set_window.sections.push(gen_section);
		
		// Draw the windows
		bgc_set_window.draw(wrapper);
		txc_set_window.draw(wrapper);
		classic_set_window.draw(wrapper);
		media_set_window.draw(wrapper);
		dock_set_window.draw(wrapper);
		center_set_window.draw(wrapper);
		gen_set_window.draw(wrapper);
		
		// Push them to the windows array
		this.windows.push(bgc_set_window);
		this.windows.push(txc_set_window);
		this.windows.push(classic_set_window);
		this.windows.push(media_set_window);
		this.windows.push(dock_set_window);
		this.windows.push(center_set_window);
		this.windows.push(gen_set_window);
		
		// Save and default buttons
		var SR = this;
		var savebtn = new button("Close", function () { SR.popup.undraw(); location.reload(); });
		var defbtn = new button("Defaults", function () { SR.setDefaults(); });
		savebtn.draw(btnwrap);
		defbtn.draw(btnwrap);
		
		// Appending of all the configurations
		centDivStyl.appendChild(welcome);
		centDivStyl.appendChild(selectHead);
		centDivStyl.appendChild(tabHead);
		centDivStyl.appendChild(wrapper);
		centDivStyl.appendChild(btnwrap);
		document.body.appendChild(centDivStyl);
		
		this.dialog = centDivStyl;
		this.isDrawn = true;
	};
	
	this.undraw = function () {
		if (this.isDrawn) {
			$remove(this.dialog);
			this.isDrawn = false;
		}
	};
	
	this.setDefaults = function () {
		for (var wo = 0; wo < this.windows.length; wo++) {
			this.windows[wo].setDefaults();
		}
	};
	
}

/**	config_dialog
  *	Configuration Dialog Object
  *	
  *	Construction Parameters
  *		popup		The popup_dialog object it was created with
  *	
  *	Functions
  *		draw
  *			Draw the dialog on the page
  *	
  *		undraw
  *			Undraw the dialog
  *	
  *		setDefaults
  *			Set the defaults for all of the options
  *		
  */
function config_dialog(popup) {
	
	this.dialog;
	this.windows = new Array();
	this.isDrawn = false;
	this.popup = popup;
	
	this.draw = function () {
		var centDivConf = $create("div", {
			id : "confGoogBump",
			className : "GB_dialog_popup"
		});
		
		// The heading to the configuration page
		var welcome = $create("h1", {
			textContent : "Google Bump",
			id : "confWel"
		});
		
		// Wrappers for the content
		var tabHead = $create("div", {
			id : "confTabs"
		});
		var selectHead = $create("div", {
			id : "confBoxSel"
		});
		var wrapper = $create("div", {
			id : "confWrap"
		});
		var btnwrap = $create("div", {
			id : "confBtnWrap"
		});
		
		// For selecting which options to use
		var optSelBox = $create("div", {
			className : "selBox selBoxOn",
			textContent : "Options"
		});
		var stlSelBox = $create("div", {
			className : "selBox",
			textContent : "Styles"
		});
		stlSelBox.addEventListener('click', function (e) {
			styler();
		}, false);
		
		selectHead.appendChild(optSelBox);
		selectHead.appendChild(stlSelBox);
		
		var keyslist = [];
		var valslist = [];
		for (var se = 0; se < options.searchengines.length; se++){
			keyslist.push(options.searchengines[se]['Name']);
			valslist.push(options.searchengines[se]['url_before'] + '**Search**' + options.searchengines[se]['url_after']);
		}
		
		// Creates and appends the navigation tabs
		var genTab = new config_tab("General", "t_GenConf");
		var abtTab = new config_tab("License", "t_AbtConf", genTab);
		var imgTab = new config_tab("Images", "t_ImgConf", genTab);
		var vidTab = new config_tab("Videos", "t_VidConf", genTab);
		var mltTab = new config_tab("MultiSearch", "t_MltConf", genTab);
		var otrTab = new config_tab("Advanced", "t_OtrConf", genTab);
		
		abtTab.draw(tabHead);
		genTab.draw(tabHead);
		imgTab.draw(tabHead);
		vidTab.draw(tabHead);
		mltTab.draw(tabHead);
		otrTab.draw(tabHead);
		
		// About Us Section
		var fieldsabt = $create("div");
		fieldsabt.id = "AbtConf";
		fieldsabt.className = "removed";
		var nwp = $create("p");
		nwp.textContent = "Copyright (c) 2011 Andrew Hushbeck (KTaShes)\n\n" +

				"Permission is hereby granted, free of charge, to any person obtaining a copy " +
				"of this software and associated documentation files (the \"Software\"), to deal " +
				"in the Software without restriction, including without limitation the rights " +
				"to use, copy, modify, merge, publish, distribute, sublicense, and/or sell " +
				"copies of the Software, and to permit persons to whom the Software is " +
				"furnished to do so, subject to the following conditions:\n\n" +

				"The above copyright notice and this permission notice shall be included in " +
				"all copies or substantial portions of the Software.\n\n" +

				"THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR " +
				"IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, " +
				"FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE " +
				"AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER " +
				"LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, " +
				"OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN " +
				"THE SOFTWARE.\n\n" +
				
				"The source code for this script can always be found ";
		fieldsabt.appendChild(nwp);
		var linkToScript = $create("a");
		linkToScript.textContent = "here.";
		linkToScript.href = "http://userscripts.org/scripts/review/33449";
		nwp.appendChild(linkToScript);
		var sig = $create("p");
		sig.textContent = "ktash";
		fieldsabt.appendChild(sig);
		var abtver = $create("p");
		abtver.textContent = "Version : " + version;
		fieldsabt.appendChild(abtver);
		
		// Image Search Settings
		var img_set_window = new config_window(imgTab, "ImgConf");
			// Genearl Settings
		var img_section = new config_section("Sidebar Options");
		img_section.sectionOptions.push(new config_checkBox("Search For Images", "imgs", options.DEFAULT_IMGS));
		img_section.sectionOptions.push(new config_selectionBox("Open in", "imgPlyr", ["This Window", "Player", "Slideshow", "Slideshow (Paused)"], [false, true, "slideshow", "soot"], options.DEFAULT_IMGPLYR));
		img_section.sectionOptions.push(new config_checkBox("Show Control Bar", "imgCtrl", options.DEFAULT_IMGCTRL));
		img_section.sectionOptions.push(new config_intField("Number of images to load", "imgPages", options.DEFAULT_IMGPGS));
		img_section.sectionOptions.push(new config_selectionBox("Image display size", "imgSize", ["Titles Only","Small","Medium","Large", "Details"], ["title", "small", "medium", "large", "details"], options.DEFAULT_IMGSIZE));
		img_set_window.sections.push(img_section);
			// Slideshow Settings
		var sld_section = new config_section("SlideShow Options");
		sld_section.sectionOptions.push(new config_checkBox("Enable Slideshow", "sldshw", options.DEFAULT_SLDSHW));
		sld_section.sectionOptions.push(new config_checkBox("Enable Keyboad Controls in Slidshow", "sldkey", options.DEFAULT_SLDKEY));
		sld_section.sectionOptions.push(new config_checkBox("Pause while image is loading", "imgLoad", options.DEFAULT_IMGLOAD));
		sld_section.sectionOptions.push(new config_checkBox("Skip images that cannot be loaded", "skipErr", options.DEFAULT_SKIPERR));
		sld_section.sectionOptions.push(new config_selectionBox("Display images in slideshow for", "sldtm", ["1 Second","2 Second","3 Second","4 Second","5 Second","7 Second","10 Second"], [1000, 2000, 3000, 4000, 5000, 7000, 10000], options.DEFAULT_SLDTM));
		img_set_window.sections.push(sld_section);
		
		// Video Search Settings
		var vid_set_window = new config_window(vidTab, "VidConf");
			// Genearl Settings
		var vid_section = new config_section("Sidebar Options");
		vid_section.sectionOptions.push(new config_checkBox("Search For Videos", "vids", options.DEFAULT_VIDS));
		vid_section.sectionOptions.push(new config_selectionBox("Search using", "vdsrchr", ["Google","Youtube"], ["google", "youtube"], options.DEFAULT_VDSRCHR));
		vid_set_window.sections.push(vid_section);
			// Embed Settings
		var emd_section = new config_section("Embed Options");
		emd_section.sectionOptions.push(new config_checkBox("Show Extra Controls", "vidCtrl", options.DEFAULT_VIDCTRL));
		emd_section.sectionOptions.push(new config_checkBox("Embed videos (when available)", "embd", options.DEFAULT_EMBD));
		emd_section.sectionOptions.push(new config_checkBox("Play in HD (when available)", "hdvd", options.DEFAULT_HDVD));
		emd_section.sectionOptions.push(new config_checkBox("Enable Fullscreen (when available)", "fsvd", options.DEFAULT_FSVD));
		emd_section.sectionOptions.push(new config_checkBox("Autoplay (when available)", "apvd", options.DEFAULT_APVD));
		emd_section.sectionOptions.push(new config_checkBox("Loop Videos (when available)", "lpvd", options.DEFAULT_LPVD));
		emd_section.sectionOptions.push(new config_checkBox("Closed Captions (when available)", "ccvd", options.DEFAULT_CCVD));
		emd_section.sectionOptions.push(new config_checkBox("Enable Privacy Mode (when available)", "pmvd", options.DEFAULT_PMVD));
		emd_section.sectionOptions.push(new config_checkBox("Youtube Annotations", "ivvd", options.DEFAULT_IVVD));
		vid_set_window.sections.push(emd_section);
		
		// Multisearch Settings
		var multi_set_window = new config_window(mltTab, "MltConf");
			// SearchEngines
		var mlt_section = new config_section("Search Engines");
		mlt_section.sectionOptions.push(new config_keyvalTable("Search Engines", "searchengines", keyslist, valslist, options.DEFAULT_SEARCHENGINES));
		multi_set_window.sections.push(mlt_section);
		
		// Other Settings
		var other_set_window = new config_window(otrTab, "OtrConf");
			// Advanced
		var adv_section = new config_section();
		adv_section.sectionOptions.push(new config_selectionBox("Millisecond delay for page (Only change if you have load issues)", "delay", ["100 ms","200 ms","300 ms","400 ms","500 ms","700 ms","1000 ms"], [100, 200, 300, 400, 500, 700, 1000], options.DEFAULT_DELAY));
		other_set_window.sections.push(adv_section);
		
		// General Settings
		var gen_set_window = new config_window(genTab, "GenConf");
			// Searches
		var otr_section = new config_section("Searches");
		otr_section.sectionOptions.push(new config_checkBox("Wikipedia", "wiki", options.DEFAULT_WIKI));
		gen_set_window.sections.push(otr_section);
			// Settings
		var gen_section = new config_section("Functionality");
		gen_section.sectionOptions.push(new config_checkBox("Open All Links in New Tabs", "tabs", options.DEFAULT_TABS));
		gen_section.sectionOptions.push(new config_checkBox("Use MultiSearch", "scuts", options.DEFAULT_SCUTS));
		// gen_section.sectionOptions.push(new config_checkBox("Use Old Button Size", "oldSize", options.DEFAULT_OLDSIZE));
		gen_section.sectionOptions.push(new config_checkBox("Enable Keyboard Shorcuts", "keyd", options.DEFAULT_KEYD));
		gen_section.sectionOptions.push(new config_checkBox("Enable Google Instant (Requires Refresh)", "inst", options.DEFAULT_INST));
		gen_set_window.sections.push(gen_section);
			// Clutter
		var app_section = new config_section("Clutter");
		app_section.sectionOptions.push(new config_checkBox("Remove Suggestions", "sugges", options.DEFAULT_SUGGES));
		app_section.sectionOptions.push(new config_checkBox("Move \"Did you mean\" text", "dym", options.DEFAULT_DYM));
		app_section.sectionOptions.push(new config_checkBox("Move Top Content (Calculator, Showtimes, Etc.)", "moveTop", options.DEFAULT_MOVETOP));
		gen_set_window.sections.push(app_section);
			// Keyboard Shortcut list
		var kydv = $create('div', {
			textContent : 'Keyboard shortcuts:'
		});
		var kytbl = $create('table', { className : 'keycuts' } );
		var skeys = {
			'_O_ptions' : 'CTRL + SHIFT + O',
			'St_y_ler' : 'CTRL + SHIFT + Y',
			'Start Sl_i_deshow' : 'CTRL + SHIFT + I',
			'Jump to Se_a_rch' : 'CTRL + SHIFT + A',
			'Expand M_u_ltiSearch Box' : 'CTRL + SHIFT + U'
		};
		for (action in skeys) {
			var kytr = $create('tr');
			var act_fmt = action.split("_");
			var kytd = $create('td', { textContent : act_fmt[0] } );
			kytd.appendChild($create('em', { textContent : act_fmt[1] } ));
			kytd.innerHTML += act_fmt[2];
			kytr.appendChild(kytd);
			kytr.appendChild($create('td', { textContent : skeys[action] } ));
			kytbl.appendChild(kytr);
		}
		var cut_list_section = new config_desc_section("Keyboard Shortcuts", kytbl);
		gen_set_window.sections.push(cut_list_section);
		
		// Draw the windows
		img_set_window.draw(wrapper);
		vid_set_window.draw(wrapper);
		multi_set_window.draw(wrapper);
		other_set_window.draw(wrapper);
		gen_set_window.draw(wrapper);
		
		// Push them to the windows array
		this.windows.push(img_set_window);
		this.windows.push(vid_set_window);
		this.windows.push(multi_set_window);
		this.windows.push(other_set_window);
		this.windows.push(gen_set_window);
		
		// Save and default buttons
		var SR = this;
		var savebtn = new button("Close", function () { SR.popup.undraw(); location.reload(); });
		var defbtn = new button("Defaults", function () { SR.setDefaults(); });
		savebtn.draw(btnwrap);
		defbtn.draw(btnwrap);
		
		// Appending of all the configurations
		centDivConf.appendChild(welcome);
		centDivConf.appendChild(selectHead);
		centDivConf.appendChild(tabHead);
		wrapper.appendChild(fieldsabt);
		centDivConf.appendChild(wrapper);
		centDivConf.appendChild(btnwrap);
		document.body.appendChild(centDivConf);
		
		this.dialog = centDivConf;
		this.isDrawn = true;
	};
	
	this.undraw = function () {
		if (this.isDrawn) {
			$remove(this.dialog);
			this.isDrawn = false;
		}
	}
	
	this.setDefaults = function () {
		for (var wo = 0; wo < this.windows.length; wo++) {
			this.windows[wo].setDefaults();
		}
	};
}

/**	slideshow_dialog
  *	Slideshow Dialog Object
  *	
  *	Construction Parameters
  *		popup		The popup_dialog object it was created with
  *	
  *	Functions
  *		add_image
  *			Add an image to the slideshow slidedeck
  *	
  *		draw
  *			Draw the dialog on the page
  *	
  *		undraw
  *			Undraw the dialog
  *	
  *		keyboardControls
  *			Handling of keyboard controls for the slideshow
  *	
  *		nextImage
  *			Go to the next image
  *	
  *		prevImage
  *			Go to the previous image
  *	
  *		pause
  *			Pause the slideshow
  *	
  *		play
  *			Play the slideshow
  *		
  */
function slideshow_dialog(popup) {
	
	this.dialog;
	this.interval;
	this.images = new Array();
	this.onImage = -1;
	this.toWait = options.sldTm;
	this.isDrawn = false;
	this.isPlaying = false;
	this.waitForLoad;
	this.holder;
	this.popup = popup;
	this.psBtn;
	
	this.add_image = function (img) {
		this.images.push($create('img', {
			className : 'sldImgs',
			src : decodeURI(img.link),
			alt : img.title
		}));
	};
	
	this.draw = function (imgOn) {
		this.dialog = $create('div', {
			id : 'slideShow'
		});
		
		this.holder = $create('div', {
			id : 'slideHolder'
		});
		
		this.dialog.appendChild(this.holder);
		
		var SR = this;
		var pvBtn = new button('<<', function () {
			SR.pause();
			SR.prevImage();
		});
		pvBtn.draw(this.dialog);
		this.psBtn = new button('Pause', function () {
			if (SR.isPlaying) {
				SR.pause();
			} else {
				SR.play();
			}
		});
		this.psBtn.draw(this.dialog);
		var nxBtn = new button('>>', function () {
			SR.pause();
			SR.nextImage();
		});
		nxBtn.draw(this.dialog);
		
		this.isDrawn = true;
		
		document.body.appendChild(this.dialog);
		
		this.play();
		this.nextImage(imgOn);
		
		if (options.sldkey) {
			document.addEventListener('keypress', function (e) {
				if (SR.isDrawn) {
					SR.keyboardControls(e);
				}
			}, false);
		}
	};
	
	this.undraw = function () {
		if(this.isDrawn) {
			clearInterval(this.interval);
			this.images[this.onImage].removeEventListener("load", this.waitForLoad, false);
			$remove(this.dialog);
			this.isDrawn = false;
			this.onImage = -1;
			
			document.removeEventListener('keypress', function (e) {
				if (SR.isDrawn) {
					SR.keyboardControls(e);
				}
			}, false);
		}
	};
	
	this.keyboardControls = function (e) {
		if (e.charCode == 32) { // Space
			e.stopPropagation();
			e.preventDefault();
			
			if(this.isPlaying) {
				this.pause();
			} else {
				this.play();
			}
		} else if (e.keyCode == 37) { // Left
			this.pause();
			this.prevImage();
		} else if (e.keyCode == 39) { // Right
			this.pause();
			this.nextImage();
		} else if (e.keyCode == 36) { // Home (Beginning)
			e.stopPropagation();
			e.preventDefault();
			
			this.nextImage(0);
		} else if (e.keyCode == 35) { // End
			e.stopPropagation();
			e.preventDefault();
			
			this.prevImage(this.images.length - 1);
		}
	};
	
	this.nextImage = function (imgGoTo) {
		if(this.onImage >= 0) {
			this.holder.removeChild(this.images[this.onImage]);
			this.images[this.onImage].removeEventListener("load", this.waitForLoad, false);
		}
		
		if(typeof(imgGoTo) == "undefined" || imgGoTo < 0 || imgGoTo >= this.images.length) {
			this.onImage++;
		} else {
			this.onImage = imgGoTo;
		}
		
		if(this.onImage >= this.images.length) {
			this.onImage = 0;
		}
		this.holder.appendChild(this.images[this.onImage]);
		this.dialog.style.marginLeft = "-" + (this.images[this.onImage].width / 2 + 16) + "px";
		this.dialog.style.marginTop = "-" + (this.images[this.onImage].height / 2 + 31) + "px";
		
		var SR = this;
		if (!this.images[this.onImage].complete && options.imgLoad && this.isPlaying) {
			this.pause();
			this.waitForLoad = function () {
				SR.play();
				SR.dialog.style.marginLeft = "-" + (SR.images[SR.onImage].width / 2 + 16) + "px";
				SR.dialog.style.marginTop = "-" + (SR.images[SR.onImage].height / 2 + 31) + "px";
			};
			this.images[this.onImage].addEventListener("load", SR.waitForLoad, false);
		} else if (!this.images[this.onImage].complete) {
			this.waitForLoad = function () {
				SR.dialog.style.marginLeft = "-" + (SR.images[SR.onImage].width / 2 + 16) + "px";
				SR.dialog.style.marginTop = "-" + (SR.images[SR.onImage].height / 2 + 31) + "px";
			};
			this.images[this.onImage].addEventListener("load", SR.waitForLoad, false);
		}
		
		if(this.images[this.onImage].complete && (this.images[this.onImage].width == 0 || this.images[this.onImage].height == 0) && options.skipErr) {
			this.nextImage();
		}
	};
	
	this.prevImage = function (imgGoTo) {
		if(this.onImage >= 0) {
			this.holder.removeChild(this.images[this.onImage]);
		}
		if(typeof(imgGoTo) == "undefined" || imgGoTo < 0 || imgGoTo >= this.images.length) {
			this.onImage--;
		} else {
			this.onImage = imgGoTo;
		}
		if(this.onImage < 0) {
			this.onImage = this.images.length - 1;
		}
		this.holder.appendChild(this.images[this.onImage]);
		
		this.dialog.style.marginLeft = "-" + (this.images[this.onImage].width / 2 + 16) + "px";
		this.dialog.style.marginTop = "-" + (this.images[this.onImage].height / 2 + 31) + "px";
		
		if(this.images[this.onImage].complete && (this.images[this.onImage].width == 0 || this.images[this.onImage].height == 0) && options.skipErr) {
			this.prevImage();
		}
	};
	
	this.pause = function () {
		if(this.psBtn && this.psBtn.btn.value == 'Pause') {
			this.psBtn.btn.value = 'Play';
			clearInterval(this.interval);
			this.isPlaying = false;
		}
	};
	
	this.play = function () {
		if(this.psBtn && this.psBtn.btn.value == 'Play') {
			this.psBtn.btn.value = 'Pause';
		}
		var SR = this;
		this.interval = setInterval(function () { SR.nextImage() }, options.sldTm);
		this.isPlaying = true;
	};
}

/** =================================================================
  *	End Dialogs
  *	=================================================================
  */

/**
  *	Import dependencies
  *	
  *	@depends dialogs.js
  */
	// Start Configuration Functions --------------------------------------------------
// Setup the configuration for the script
function setupConf() {
	conf = popupManager.newConfig();
	conf.draw();
}
// Opens the configuration page
function configurations() {
	if(!conf.is_drawn()) {
		popupManager.closeAll();
		conf.draw();
	} else {
		conf.undraw();
	}
}
// Opens the style configuration page
function styler() {
	if (!stylr) {
		stylr = popupManager.newStyler();
	}
	if(!stylr.is_drawn()) {
		popupManager.closeAll();
		stylr.draw();
	} else {
		stylr.undraw();
	}
}
// Get a random string for searching
function randSearch() {
	// Variable length to lower collision rate further
	var v = "";
	for(var i = 0; i < 14; i++) {
		var n1 = Math.random();
		var n2 = Math.random();
		if(n1 * 1.5 > 1) {
			v += String.fromCharCode(Math.round(Math.random() * 9) + 48);
		} else if (n2 * 1.5 > 1) {
			v += String.fromCharCode(Math.round(Math.random() * 25) + 65);
		} else {
			v += String.fromCharCode(Math.round(Math.random() * 25) + 97);
		}
	}
	return v;
}
	// End Configuration Functions ----------------------------------------------------

// Activate Keyboard Shortcuts for the script
function keycuts() {
	document.addEventListener("keypress", function (event) {
		if(event.ctrlKey && event.shiftKey) {
			if (String.fromCharCode(event.charCode) === 'O') {
				if(conf.is_drawn()) {
					conf.undraw();
					location.reload();
				} else {
					configurations();
				}
			} else if (String.fromCharCode(event.charCode) === 'A') {
				var q = document.evaluate('//input[@name="q"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				q = q.snapshotItem(0);
				q.focus();
			} else if (String.fromCharCode(event.charCode) === 'U' && multiBox) {
				multiBox.expandCollapse();
			} else if (String.fromCharCode(event.charCode) === 'Y') {
				if(stylr && stylr.is_drawn()) {
					stylr.undraw();
					location.reload();
				} else {
					styler();
				}
			} else if (String.fromCharCode(event.charCode) === 'I' && options.sldshw) {
				startslides();
			}
		}
	}, false);
}

/**	=================================================================
  *	Multisearch
  *	=================================================================
  */

/**	multisearcher
  *	Multisearch Object
  *	
  *	Functions
  *		draw
  *			Draw the multisearch option
  *	
  *		addBox
  *			Add a new search box
  *	
  *		expandCollapse
  *			Expand or collapse the multisearch boxes
  *	
  *		searchAll
  *			Search all boxes
  *	
  *		searchNew
  *			Search only added boxes
  *	
  *		getAllVals
  *			<= Return Array => Get an array of all the values and their search location
  *	
  *		getNewVals
  *			<= Return Array => Get an array of only the new boxes values and their search location
  *	
  */
function multisearcher() {
	
	this.original = document.evaluate('//input[@name="q"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	this.boxes = [];
	this.expanded = false;
	this.wrapper;
	this.multiwrapper;
	this.newSearchWrapper;
	this.origOptionBox;
	
	this.draw = function () {
		
		var theirButton = $cl('lsb')[0];
		this.myButton = $create('input', {
			type : 'button',
			className : 'gbump_btn',
			value : 'More Options',
			title : 'More Options',
			id : 'gbump_moreOptsBtn'
		});
		
		this.origOptionBox = new multisearchbox(null).getOptBox();
		this.origOptionBox.className += " removed";
		
		theirButton.parentNode.parentNode.insertBefore(this.origOptionBox, theirButton.parentNode);
		theirButton.parentNode.parentNode.appendChild(this.myButton);
		
		this.newSearchWrapper = findrightnode($('lst-ib'), "sftab").parentNode || $('lst-ib').parentNode.parentNode.parentNode;
		while(this.newSearchWrapper && (this.newSearchWrapper.tagName.toLowerCase() != 'tbody' && this.newSearchWrapper.tagName.toLowerCase() != 'table')) {
			this.newSearchWrapper = this.newSearchWrapper.parentNode;
		}
		if(!this.newSearchWrapper) this.newSearchWrapper = findrightnode($cl("lst-td")[0], "sftab").parentNode.parentNode.parentNode.parentNode || $cl("lst-td")[0].parentNode.parentNode.parentNode;
		
		var SR = this;
		this.myButton.addEventListener('click', function (e) {
			SR.expandCollapse();
		}, false);
		
		this.wrapper = $create("tr", {
			id : "allSearches"
		});
		// this.wrapper = this.newSearchWrapper;
		
		this.multiwrapper = $create("td", {
			id : "expandedMulti",
			colSpan : 2
		});
		
		for (var nm = GM_getValue("numMulti", 2); nm > 0 ; nm--) {
			var msb = new multisearchbox(this, (this.boxes.length + 1) % options.searchengines.length);
			msb.draw(this.newSearchWrapper);
			msb.hide();
			this.boxes.push(msb);
		}
		
		var rs1 = $create('div', {
			className : ''
		});
		
		var adder = $create("button", {
			textContent : "Add More",
			className : "gbump_btn gbump_multiBtn"
		});
		rs1.appendChild(adder);
		
		var srchAll = $create("button", {
			textContent : "Search All",
			className : "gbump_btn gbump_multiBtn"
		});
		rs1.appendChild(srchAll);
		
		var srchNew = $create("button", {
			textContent : "Search New",
			className : "gbump_btn gbump_multiBtn"
		});
		rs1.appendChild(srchNew);
		
		var fillOutAll = $create('button', {
			textContent : 'Fill All',
			className : "gbump_btn gbump_multiBtn"
		});
		rs1.appendChild(fillOutAll);
		this.multiwrapper.appendChild(rs1);
		
		adder.addEventListener("click", function (event) {
			event.stopPropagation();
			event.preventDefault();
			SR.addBox();
		}, false);
		
		var submitCheck = function (event) {
			if (SR.expanded) {
				event.stopPropagation();
				event.preventDefault();
				redirgo([SR.origOptionBox.value, $('lst-ib').value], false);
			}
		};
		theirButton.addEventListener("click", submitCheck, false);
		theirButton.form.addEventListener("submit", submitCheck, false);
		
		srchAll.addEventListener("click", function (event) {
			event.stopPropagation();
			event.preventDefault();
			SR.searchAll();
		}, false);
		
		srchNew.addEventListener("click", function (event) {
			event.stopPropagation();
			event.preventDefault();
			SR.searchNew();
		}, false);
		
		fillOutAll.addEventListener("click", function (event) {
			event.stopPropagation();
			event.preventDefault();
			var sbs = SR.boxes;
			var val = $('lst-ib').value;
			for (sb in sbs) {
				sbs[sb].setValue(val);
			}
		}, false);
		
		this.newSearchWrapper.appendChild(this.wrapper);
		
	};
	
	this.addBox = function () {
		var msb = new multisearchbox(this, (this.boxes.length + 1) % options.searchengines.length);
		msb.draw(this.newSearchWrapper);
		this.boxes.push(msb);
		GM_setValue("numMulti", parseInt(GM_getValue("numMulti", 2)) + 1);
		this.newSearchWrapper.appendChild(this.wrapper);
		this.recalcHeight();
	};
	
	this.expandCollapse = function () {
		if (!this.expanded) {
			this.wrapper.appendChild(this.multiwrapper);
			this.myButton.value = "Less Options";
			this.myButton.title = "Less Options";
			this.myButton.classList.add("opened");
			this.origOptionBox.className = this.origOptionBox.className.replace(" removed", "");
			for (var b = 0; b < this.boxes.length; b++) {
				this.boxes[b].reveal();
			}
		} else {
			this.wrapper.removeChild(this.multiwrapper);
			this.myButton.value = "More Options";
			this.myButton.title = "More Options";
			this.myButton.classList.remove("opened");
			this.origOptionBox.className += " removed";
			for (var b = 0; b < this.boxes.length; b++) {
				this.boxes[b].hide();
			}
		}
		this.expanded = !this.expanded;
		this.recalcHeight();
	};
	
	this.searchAll = function () {
		var tablist = this.getAllVals();
		redirgo(tablist, false);
	};
	
	this.searchNew = function () {
		var tablist = this.getNewVals();
		redirgo(tablist, true);
	};
	
	this.getAllVals = function () {
		var newVals = this.getNewVals();
		return newVals.concat([this.origOptionBox.value, $cl('lst')[0].value]);
	};
	
	this.getNewVals = function () {
		var tablist = [];
		for (var i = 0, len = this.boxes.length; i < len; i++) {
			this.boxes[i].addCode(tablist);
		}
		return tablist;
	};
	
	this.recalcHeight = function () {
		var addHeight = 0;
		if (this.expanded) {
			addHeight = (this.boxes.length * 40) + 35;
		}
		GM_addStyle(".sfbgg { padding-top: "+addHeight+"px; } \
						#mBox, #newVer { top: "+ (101+addHeight) +"px; } \
						#subform_ctrl, .ksfccl { margin-top: "+ addHeight +"px !important; } ");
	};
	
}

/**	multisearchbox
  *	Multisearch Box Object
  *	
  *	Construction Parameters
  *		parentObj		The multisearch object that it was created from
  *	
  *	Functions
  *		draw
  *			Draw the multisearch box
  *	
  *		undraw
  *			Undraw the multisearch box
  *	
  *		getOptBox
  *			<= Return HTML Object => Returns select box with the options
  *	
  *		addCode
  *			Add the code for this box to the given array for multisearching
  *	
  *		setValue
  *			Set the value for the box
  *	
  *		search
  *			If it is active, search for it
  *	
  */
function multisearchbox (parentObj, listNum) {
	
	this.parentObj = parentObj;
	this.listNum = listNum;
	this.wrapping;
	this.srchBox;
	this.srchBtn;
	this.fillBtn;
	this.removeBtn;
	this.optionBox;
	this.goBtn;
	this.undoBtn;
	this.active = false;
	
	// quote|howto|defin|anidb|imdb|gamefaq|diggs|utube|wikipda|googl|flckr|cnns|opnsrc|eby|espns
	this.valList = ["quote", "howto", "defin", "anidb", "imdb", "gamefaq", "diggs", "utube", "wikipda", "flckr", "cnns", "opnsrc", "eby", "espns", "googl"];
	this.showList = ["WikiQuote", "Wiki How to", "Wiktionary", "AnimeDB", "IMDB", "GameFAQs", "Digg", "Youtube", "Wikipedia", "Flickr", "CNN", "Source Forge", "Ebay", "ESPN", "Google"];
	
	this.draw = function (parentNode) {
		this.active = true;
		
		this.wrapping = $create("tr", {
			className : "gbump_multiSearchBar"
		});
		
		var sbTd = $create("td", {
			className : "fullWidthTD"
		});
		
		var btnTd = $create("td");
		
		this.wrapping.appendChild(sbTd);
		this.wrapping.appendChild(btnTd);
		
		var ruse = $create('div', {
			style : 'position: relative'
		});
		this.srchBox = $create("input", {
			type : "text",
			className : "gbump_searchBoxes"
		});
		this.fillBtn = $create('input', {
			type : 'button',
			className : 'gbump_multiExp gbump_multiFill',
			value : 'Fill'
		});
		this.clearBtn = $create('input', {
			type : 'button',
			className : 'gbump_multiExp gbump_multiClear',
			value : 'X'
		});
		ruse.appendChild(this.srchBox);
		ruse.appendChild(this.fillBtn);
		ruse.appendChild(this.clearBtn);
		sbTd.appendChild(ruse);
		
		var wrp = $create('div', {
			className : 'gbump_msBar'
		});
		ruse = $create('div', {
			className : 'gbmp'
		});
		
		this.srchBtn = $create('input', {
			type : 'button',
			className : 'gbump_multiSrchBtn',
			value : 'Search',
		});
		this.removeBtn = $create('input', {
			type : 'button',
			className : 'gbump_btn gbump_multiRemove',
			value : 'X'
		});
		
		ruse.appendChild(this.getOptBox(this.listNum));
		ruse.appendChild(this.srchBtn);
		ruse.appendChild(this.removeBtn);
		wrp.appendChild(ruse);
		btnTd.appendChild(wrp);
		
		var SR = this;
		this.removeBtn.addEventListener("click", function () {
			SR.undraw();
			GM_setValue("numMulti", parseInt(GM_getValue("numMulti", 2)) - 1);
		}, false);
		
		this.fillBtn.addEventListener("click", function () {
			SR.setValue(SR.parentObj.original.value);
		}, false);
		this.clearBtn.addEventListener("click", function () {
			SR.setValue('');
		}, false);
		
		this.srchBtn.addEventListener("click", function () {
			SR.search();
		}, false);
		
		parentNode.appendChild(this.wrapping);
	};
	
	this.undraw = function () {
		this.active = false;
		$remove(this.wrapping);
	};
	
	this.reveal = function () {
		this.wrapping.className = "gbump_multiSearchBar";
	};
	
	this.hide = function () {
		this.wrapping.className = "removed";
	};
	
	this.getOptBox = function (_show) {
		if (!this.optionBox) {
			this.optionBox = $create("select", {
				className : "gbump_siteSelector"
			});
			for (var i = 0; i < options.searchengines.length; i++) {
				var opt = $create("option", {
					value : i,
					textContent : options.searchengines[i].Name
				});
				if ((_show && _show == i) || (!_show && i == 0)) {
					opt.selected = true;
				}
				this.optionBox.appendChild(opt);
			}
		}
		return this.optionBox;
	};
	
	this.addCode = function (arr) {
		if (this.active) {
			arr.push(this.optionBox.value);
			arr.push(this.srchBox.value);
		}
	};
	
	this.setValue = function (value) {
		this.srchBox.value = value;
	};
	
	this.search = function () {
		if (this.active) {
			var code = [];
			this.addCode(code);
			redirgo(code, true);
		}
	};
	
}

/**	=================================================================
  *	End Multisearch
  *	=================================================================
  */

/**
  *	Import Dependencies
  *	
  *	@depends multisearch.js
  */
	// Start Text / Input Based Functions ------------------------------------------

// Script for the auto redirection
function redirgo(theList, tablast) {
	if (theList.length < 2) {
		return "";
	} else {
		var putintabs = (theList.length !== 2);
		for (var x = 0; x < theList.length; x += 2) {
			if (x == theList.length - 2) {
				putintabs = tablast || false;
			}
			linkit(options.searchengines[theList[x]].url_before + theList[x + 1] + options.searchengines[theList[x]].url_after, putintabs);
		}
	}
}
// Gets what the user is searching for, capitalizes first letters, and filters out search syntax
function setupText(preset) {
	var search;
	var params;
	var locsrch = getQueryParameters()['q'];
	if(locsrch == undefined) { return; }
	var search = locsrch.split("+").join(" ");
	
	// Checks for google specific syntax
	var checkforcolon = search.split(":");
	var regexColon = new RegExp("^(site|filetype|allintitle|allinbody|allinurl)$");
	var counter = 0;
	for (var k = 0; k < checkforcolon.length; k += 2) {
		var indiv = checkforcolon[k].split(" ");
		var checker = indiv[indiv.length - 1];
		// Finds google search sytnax and removes it (when it is properly formatted)
		if (regexColon.test(checker) && checkforcolon[k + 1]) {
			indiv = indiv.slice(0,indiv.length - 1);
			checkforcolon[k + 1] = checkforcolon[k + 1].split(" ").slice(1,checkforcolon[k + 1].length).join(" ");
			checkforcolon[k] = indiv.join(" ");
		}
	}
	search = checkforcolon.join(" ");
	search = search.split(" ");
	// Capitalizes the first letter in each word
	for (var i = 0; i < search.length; i++) {
		search[i] = search[i].charAt(0).toUpperCase() + search[i].substr(1).toLowerCase();
	}
	return decodeURIComponent(search.join(" "));
}
// Setup the expanded multisearch search box
function multiSearchSetup() {
	multiBox = new multisearcher();
	multiBox.draw();
}
// Handles clicks for opening links in new tabs
function clickd() {
	document.addEventListener("click", function(event) {
		// Makes sure it is a left click
		if (event.button === 0 && !event.ctrlKey && !event.altKey && !event.shiftKey && options.tabs) {
			// Opens all links that are external links in tabs if the tab feature is turned on
			if (checkallparentsforit(event.target, "resOL")) {
				if (event.target.href) {
					event.stopPropagation();
					event.preventDefault();
					linkit(event.target.href, false, true);
				} else if (event.target.parentNode.href) {
					event.stopPropagation();
					event.preventDefault();
					linkit(event.target.parentNode.href, false, true);
				}
			}
		}
	}, false);
}
// Checks Instant preference
function setInstant() {
	var qobj = getQueryParameters();
	if(!options.inst && qobj['complete'] !== '0') 
		if(location.search.length > 0) location.search += '&complete=0';
		else location.search = '?complete=0'
	else if (options.inst && qobj['complete'] === '0')
		location.search = location.search.replace(/&?complete=0/,'');
}
	// End Text / Input Based Functions --------------------------------------------

	// Start Visual Functions ----------------------------------------------------------
// Adds a little more margin for appearance
function addMargins() {
	// To Be Decided
}
// Removes all of the side ads on the page, if they exist
function removeSideAds() {
	var sideAds = $("mbEnd");
	if (sideAds !== null) {
		sideAds.className = "removed";
	}
	sideAds = $("tads");
	if (sideAds !== null) {
		sideAds.className = "removed";
	}
}
// Unhides side ad content... dunno why you'd want it
function showSideAds() {
	if ($("mbEnd") !== null) {
		var theAds = $("mbEnd").childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes;
		for (var ad = 0; ad < theAds.length; ad++) {
			theAds[ad].className = "toLI";
		}
		$("mbEnd").className = "reAddAd";
	}
	if ($("tads") !== null) {
		var theTAds = $cl("tas");
		for (var ad = 0; ad < theTAds.length; ad++) {
			theTAds[ad].className = "toLI";
		}
		$("tads").className = "reAddAd";
	}
}
// Removes everything except the search results (Removes Suggestions)
function noSuggestions() {
	var lis = $cl("g");
	for (var k = 0; k < lis.length; k++) {
		if (lis[k].className.indexOf("videobox") >= 0 || lis[k].id == "imagebox") {
			lis[k].className = lis[k].className + " removed";
		} else {
			// var found = false;
			// for(var cn = (lis[k].childNodes.length - 1); cn > 0;cn--) {
				// if (lis[k].childNodes[cn].className && lis[k].childNodes[cn].className.indexOf("s") >= 0) {
					// found = true;
				// }
			// }
			// if (!found) {
				// lis[k].className = lis[k].className + " removed";
			// }
		}
	}
	if ($('trev') !== null) {
		$('trev').className = "removed";
	}
	if ($('brs') !== null) {
		$('brs').className = "removed";
	}
}
// Moves the "Did you mean text" to a different position
function didyoumean() {
	var dym = $cl('spell');
	if (dym.length == 4) {
		var p1 = dym[0].parentNode;
		var p2 = dym[2].parentNode;
		var thebar = $('leftnav');
		p2.className = "removed";
		p1.id = "dymTxt";
		thebar.insertBefore(p1, thebar.childNodes[0]);
		var anon = function () {
				var thebar = $('leftnav');
				p2.className = "removed";
				p1.id = "dymTxt";
				thebar.insertBefore(p1, thebar.childNodes[0]);
			};
		if($('leftnav')) {
			anon();
		} else {
			var inter = setInterval(function () { if($('leftnav')) { anon(); clearInterval(inter); } },options.delay);
		}
	}
}
// Moves top content to a new position
function topContentMove() {
	if (options.styl == 'center') {
		return;
	}
	
	var topHolder;
	if($('topstuff')) {
		topHolder = $('topstuff');
		topHolder.className = "topHolder";
	} else {
		topHolder = $create('div', {
			id : 'topstuff',
			className : 'topHolder'
		});
		var resnodes = $('res').childNodes;
		for(var i = 0; i < resnodes.length; i++) {
			if(resnodes[i].className != 'hd' &&
					resnodes[i].id != 'ires' &&
					resnodes[i].id != 'search') {
				topHolder.appendChild(resnodes[i]);
			} else {
				break;
			}
		}
	}
	
	$('sfcnt').appendChild(topHolder);
}
	// End Visual Functions ------------------------------------------------------------

/**	=================================================================
  *	Video Search
  *	=================================================================
  */

/**	indiv_video_result
  *	Individual Video Result Ojbect
  *	
  *	Construction Parameters
  *		src		Source of the screenshot image
  *		link	Url to video
  *		domain	Domain of origin
  *		name	Name of the Video
  *	
  *	Functions
  *		draw
  *			( HtmlNode parentNode )		Node to draw in
  *			Draw the video result
  *		
  *		clicked	
  *			( Event event )		click event
  *			( indiv_video_result res )		The result object clicked (for self-reference)
  *			Handles click event for embedabble videos
  *		
  *		youtubeEmbed
  *			( String link )		Link to the video for parsing
  *			Handles logic for youtube embeds including extra options
  *			<= Return String =>		Url for the embed
  *		
  *		googleEmbed
  *			( String link )		Link to the video for parsing
  *			Handles logic for google embeds including extra options
  *			<= Return String =>		Url for the embed
  *		
  *		metacafeEmbed
  *			( String link )		Link to the video for parsing
  *			Handles logic for metacafe embeds including extra options
  *			<= Return String =>		Url for the embed
  *		
  *		livevideoEmbed
  *			( String link )		Link to the video for parsing
  *			Handles logic for livevideo embeds including extra options
  *			<= Return String =>		Url for the embed
  *	
  */
function indiv_video_result(src, link, embsrc, domain, name) {
	
	// Thumbnail Source
	this.src = src;
	// Link to video
	this.link = link;
	// Embed URL
	this.emburl = embsrc.replace(/&.+/, '');
	// Domain
	this.domain = domain;
	// Name of video
	this.name = name;
	// Embeddable on page
	// !! Metacafe and livevideo are not available because Google API does not return them
	this.embeddable = (domain == 'YouTube' || domain == 'Google' || domain == 'metacafe' || domain == 'livevideo'); 
	
	// Draw the video result
	this.draw = function (parentNode) {
		var img = $create("img", {
			src : this.src,
			alt : this.name,
			title : "\"" + this.name.replace(/\s\.{3}$/,"") + "\" from " + this.domain,
			className : 'vid_thumb'
		});
		var ancr_t = $create("a", {
			href : this.link,
			textContent : this.name
		});
		var ancr_i = $create("a", {
			href : this.link
		});
		var hldr = $create("div", {
			className : 'vid_result' + (this.embeddable ? ' embeddable' : '')
		});
		
		ancr_i.appendChild(img);
		hldr.appendChild(ancr_i);
		hldr.appendChild(ancr_t);
		parentNode.appendChild(hldr);
		
		if(options.embd && this.embeddable) {
			var SR = this;
			hldr.addEventListener("click", function (e) {
				SR.clicked(e, SR);
			}, true);
		}
	};
	
	// Handles click event for embedabble videos
	this.clicked = function (event, res) {
		event.stopPropagation();
		event.preventDefault();
		
		// Embeds the video
		var src;
		if (res.domain == "YouTube") {
			src = this.youtubeEmbed(res.link);
		} else if (res.domain == "Google") {
			src = this.googleEmbed(res.link);
		} else if (res.domain == "metacafe") {
			src = this.metacafeEmbed(res.link);
		} else {
			src = this.livevideoEmbed(res.link);
		}
		
		// New embed code options
		var object = $create("object", { 
				width : '100%',
				height : '100%'
			} );
		
		// Movie param
		var movie = $create("param", {
				name : 'movie',
				value : src
			});
		object.appendChild(movie);
		
		// Fullscreen param
		var param = $create("param", {
				name : 'allowFullScreen',
				value : options.fsvd
			});
		object.appendChild(param);
		
		// Script Access param
		param = $create("param", {
				name : 'allowScriptAccess',
				value : 'always'
			});
		object.appendChild(param);
		
		// Embed
		var embed = $create("embed", {
				'src' : src,
				type : 'application/x-shockwave-flash',
				wmode : 'transparent',
				width : '100%',
				height : '100%',
				allowfullscreen : true,
				allowScriptAccess : 'always',
				id : 'embdPlyr'
			});
		// Special flashVars for metacafe
		if(res.domain == "metacafe") {
			embed.setAttribute('flashVars', "playerVars=autoPlay=" + (options.apvd ? 'yes' : 'no'));
		}
		object.appendChild(embed);
		
		embedder.addVideoEmbed(this, object)
	};
	
	// Handles logic for youtube embeds including extra options
	this.youtubeEmbed = function(link) {
		var src = this.emburl +
				"&fs=" + Number(options.fsvd) +
				"&hd=" + Number(options.hdvd) + 
				"&autoplay=" + Number(options.apvd) +
				"&loop=" + Number(options.lpvd) +
				"&iv_load_policy=" + (options.ivvd ? 1 : 3) +
				"&cc_load_policy=" + Number(options.ccvd) +
				"&enablejsapi=1" +
				(!options.pmvd && !options.lpvd ? "&version=3" : "");
		return src;
	};
	
	// Handles logic for google embeds including extra options
	this.googleEmbed = function(link) {
		var regexGoogl = new RegExp("^http:\/\/video\.google\.com\/videoplay");
		var src = link.replace(regexGoogl, "");
		src = this.emburl +
				"&fs=" + options.fsvd +
				"&autoplay=" + options.apvd +
				"&loop=" + options.lpvd +
				"&playerMode=" + (options.fsvd ? "embedded" : "simple") +
				"&speedcontrol=0";
		return src;
	};
	
	// Handles logic for metacafe embeds including extra options
	this.metacafeEmbed = function(link) {
		var regexMetaCaf = new RegExp("^http:\/\/w{3}\.metacafe\.com\/watch\/");
		var src = link.replace(regexMetaCaf,"http://www.metacafe.com/fplayer/");
		src = src.substring(0,src.length - 1) + ".swf?";
		return src;
	};
	
	// Handles logic for livevideo embeds including extra options
	this.livevideoEmbed = function(link) {
		var regexLiveVideo = new RegExp("^http:\/\/w{3}\.livevideo\.com\/video\/");
		var src = link.replace(regexLiveVideo, "");
		src = "http://www.livevideo.com/flvplayer/embed/" + src.split("/")[0] + "?autostart=" + Number(options.apvd);
		return src;
	};
}

/**	=================================================================
  *	End Video Search
  *	=================================================================
  */
/**
  *	Import Dependencies
  *	
  *	@depends video-search.js
  */
	// Start Video Search Functions ------------------------------------------------
// Handles errors and no video results
function novids(response) {
	var box = rightBox("videoList");
	box.textContent = "No Videos Found";
	if ($("imageList")) {
		$("mBox").insertBefore(box, $("imageList"));
	} else {
		$("mBox").appendChild(box);
	}
	if (options.styl == "dock") {
		box.className = "removed";
	}
}
// Show the loaded videos
function showvids(response) {
	var vrs;
	eval("vrs = " + response.responseText);
	
	var vrl = vrs.responseData.results;
	// Sorts through the video results and puts them in a list
	var box = rightBox("videoList");
	
	if (vrl.length > 0) {
		var proc = 0;
		var limit = 5;
		if (!options.imgs && options.styl == "media") {
			limit = -1;
		} else if (options.styl == "center") {
			limit = 3;
		}
		
		while((proc < limit || limit == -1) && proc < vrl.length) {
			var vid_src = vrl[proc].url.replace(/[^q]+q=/, '').replace(/&.+/, '');
			var emb_src = vrl[proc].playUrl;
			var img_src = vrl[proc].tbUrl;
			var vid_title = vrl[proc].title;
			var vid_domain = vrl[proc].videoType;
			
			var new_vid = new indiv_video_result(img_src, vid_src, emb_src, vid_domain, vid_title);
			new_vid.draw(box);
			
			proc++;
		}
		
		if ($("imageList") && (options.clctoprht == 'videos' && options.styl == 'classic')) {
			$("mBox").insertBefore(box, $("imageList"));
		} else {
			$("mBox").appendChild(box);
		}
		
		if (options.styl == "dock") {
			box.className = "removed";
			$("vidDock").className = "";
		}
		
	} else {
		novids();
	}
}
// Handles Youtube Searches
function youtubeSearched(response) {
	eval("var nv = " + response.responseText);
	var results = nv.feed.entry;
	
	var box = rightBox("videoList");
	
	if(results && results.length > 0) {
		for(var v = 0; v < results.length; v++) {
			var vid_src = results[v].link[0].href.match(/^.+watch\?v=[^&]+/)[0];
			var emb_src = vid_src.replace(/watch\?v=/, 'v/') + '?1=1';
			var img_src = results[v].media$group.media$thumbnail[0].url;
			var vid_title = results[v].title.$t;
			var new_vid = new indiv_video_result(img_src, vid_src, emb_src, "YouTube", vid_title);
			new_vid.draw(box);
		}
		
		if ($("imageList") && (options.clctoprht == 'videos' && options.styl == 'classic')) {
			$("mBox").insertBefore(box, $("imageList"));
		} else {
			$("mBox").appendChild(box);
		}
		
		if (options.styl == "dock") {
			box.className = "removed";
			$("vidDock").className = "";
		}
	} else {
		novids();
	}
}
// Searches for videos based on what the user is searching for
function menutogglevids(theSearch) {
	if($('videoList')) $('videoList').parentNode.removeChild($('videoList'));
	if(options.vdsrchr == "youtube") {
		get("http://gdata.youtube.com/feeds/api/videos?alt=json&max-results=5&format=5&q=" + encodeURIComponent(theSearch), youtubeSearched, novids);
	} else {
		get("http://ajax.googleapis.com/ajax/services/search/video?v=1.0&gbv=2&rsz=5&start=0&q=" + encodeURIComponent(theSearch), showvids, novids);
	}
}
	// End Video Search Functions --------------------------------------------------

/**	=================================================================
  *	Image Search
  *	=================================================================
  */

/**	Image_Search
  *	Image Search Object
  *	
  *	Construction Parameters
  *		src			The src for the image
  *		link		The link to the image
  *		title		The title of the image
  *		sizeInfo	Information string on the size
  *		type		Type of the image
  *		num			The number of the image in the results
  *	
  *	Functions
  *		draw
  *			Draw the image
  *	
  *		clicked
  *			Handles actions if an image is clicked
  *	
  *		buildImage
  *			<= Return Image => Builds the image HTML Ojbect for the given settings
  *	
  */
function indiv_img_result(src, link, title, sizeInfo, type, num) {
	
	this.src = src;
	this.link = decodeURI(link);
	this.title = title;
	this.locNum = num;
	this.size = sizeInfo;
	this.frmt = type;
	
	this.draw = function (parentNode) {
		var link = $create("a", {
			href : this.link,
			className : 'imgLink'
		});
		if(options.imgSize == "title") {
			
			link.innerHTML = this.title;
			link.className += " titleOnly";
			
		} else if(options.imgSize == "details") {
			
			if(options.styl == 'dock') {
				var img = $create("img", {
					src : this.src,
					alt : this.title,
					title : this.title,
					className : 'imgSizemedium'
				});
				link.appendChild(img);
			} else {
				link.innerHTML = this.title;
			}
			link.className += " imgDetails";
			var info = $create("span", {
				innerHTML : this.size + ' ' + this.frmt,
				className : 'detailedImgInfo'
			});
			link.appendChild(info);
			
		} else {
			
			var img = $create("img", {
				src : this.src,
				alt : this.title,
				title : this.title,
				className : 'imgSize' + options.imgSize
			});
			link.appendChild(img);
			
		}
		parentNode.appendChild(link);
		
		var SR = this;
		link.addEventListener('click', function (e) { SR.clicked(e); }, false);
	};
	
	this.clicked = function (event) {
		if(options.imgPlyr && options.imgPlyr != "false") {
			if(event) {
				event.stopPropagation();
				event.preventDefault();
			}
			
			if(options.imgPlyr == "slideshow" || options.imgPlyr == "soot") {
				imgSearch.startSlides(this.locNum);
				if (options.imgPlyr == 'soot') {
					imgSearch.slideshow.dialog.pause();
				}
			} else {
				embedder.addImageEmbed(this);
			}
		}
	};
	
	this.buildImage = function () {
		return $create("img", {
			src : this.src,
			alt : this.title,
			title : this.title
		});
	};
	
}

/**	img_set
  *	Image Set Object
  *	
  *	Functions
  *		draw
  *			Draw the set
  *	
  *		undraw
  *			Undraw the set
  *	
  *		addImg
  *			Add an image to the set
  *	
  */
function img_set() {
	
	this.imgs = [];
	this.div;
	
	this.draw = function (parentNode) {
		if(!this.div) {
			this.div = $create("div", {
				className : 'aset'
			});
			for (var i = 0; i < this.imgs.length; i++) {
				this.imgs[i].draw(this.div);
			}
		}
		parentNode.appendChild(this.div);
	};
	
	this.undraw = function () {
		if(this.div) {
			$remove(this.div);
		}
	};
	
	this.addImg = function (img) {
		this.imgs.push(img);
	};
}

/**	Image_Search
  *	Image Search Object
  *	
  *	Construction Parameters
  *		query		The search query
  *	
  *	Functions
  *		draw
  *			Draw and perform intiate search
  *	
  *		next
  *			Show the next set
  *	
  *		prev
  *			Show the previous set
  *	
  *		clickImage
  *			Simulate clicking on an image
  *	
  *		startSlides
  *			Start the slideshow
  *	
  *		buildSets
  *			Build the sets of images
  *	
  *		processPage
  *			Add the images from a given page
  *	
  *		errorPage
  *			Handles error pages (dummy function at the moment)
  *	
  *		search
  *			Perform a search
  *	
  */
function Image_Search(query) {
	
	this.query = query;
	this.imgs = [];
	this.sets = [];
	this.setOn = 0;
	this.pages = 0;
	this.prevBtn;
	this.nextBtn;
	this.slideBtn;
	this.slideshow = popupManager.newSlideShow();
	this.div;
	
	this.draw = function (parentNode) {
		
		this.div = $create('div', {
			'id' : 'imageList',
			'className' : 'rBox'
		});
		
		var SR = this;
		this.prevBtn = new button('<', function () { SR.prev(); });
		this.prevBtn.draw(this.div);
		this.prevBtn.btn.disabled = true;
		
		if(options.sldshw) {
			this.slideBtn = new button('Play', function () { SR.startSlides(); this.btn.blur(); });
			this.slideBtn.draw(this.div);
			this.slideBtn.btn.disabled = true;
		}
		
		this.nextBtn = new button('>', function () { SR.next(); });
		this.nextBtn.draw(this.div);
		this.nextBtn.btn.disabled = true;
		
		if(options.styl == 'dock') {
			this.nextBtn.undraw();
			this.prevBtn.undraw();
		}
		
		parentNode.appendChild(this.div);
		
		this.search();
	};
	
	this.undraw = function () {
		
		this.slideshow.undraw();
		if(this.div.parentNode) this.div.parentNode.removeChild(this.div);
		
	};
	
	this.next = function () {
		if(this.setOn < this.sets.length - 1) {
			if(this.setOn == 0) {
				this.prevBtn.btn.disabled = false;
			}
			
			this.sets[this.setOn].undraw();
			this.sets[++this.setOn].draw(this.div);
			
			if (this.setOn == this.sets.length - 1) {
				this.nextBtn.btn.disabled = true;
			}
		}
	};
	
	this.prev = function () {
		if(this.setOn > 0) {
			if(this.setOn == this.sets.length - 1) {
				this.nextBtn.btn.disabled = false;
			}
			
			this.sets[this.setOn].undraw();
			this.sets[--this.setOn].draw(this.div);
			
			if (this.setOn == 0) {
				this.prevBtn.btn.disabled = true;
			}
		}
	};
	
	this.clickImage = function (indx) {
		if(indx < 0) {
			indx = this.imgs.length - 1;
		} else if (indx >= this.imgs.length) {
			indx = 0;
		}
		this.imgs[indx].clicked();
	};
	
	this.startSlides = function (startOn) {
		if (!this.slideshow.is_drawn()) {
			popupManager.closeAll();
			this.slideshow.draw(startOn);
		} else if (this.slideshow && this.slideshow.is_drawn()) {
			this.slideshow.undraw();
		}
	};
	
	this.buildSets = function () {
		var perSet;
		if (options.styl == 'media') {
			perSet = options.mdaimgnum;
		} else if (options.imgSize == 'large') {
			perSet = 7;
		} else if (options.imgSize == 'medium') {
			perSet = 14;
		} else if (options.imgSize == 'small') {
			perSet = 28;
		} else if (options.imgSize == 'title') {
			perSet = 21;
		} else { // Details
			perSet = 14;
		}
		for(var setCreator = 0; setCreator < this.imgs.length; setCreator++) {
			if((setCreator % perSet == 0 && options.styl != 'dock') || setCreator == 0) {
				this.sets.push(new img_set());
			}
			var dockWorker = options.styl == 'dock' ? 0 : Math.floor(setCreator / perSet);
			this.sets[dockWorker].addImg(this.imgs[setCreator]);
		}
	};
	
	this.processPage = function (response) {
		var na;
		eval('na = ' + response.responseText);
		
		/*
			var link = $create("a");
			link.href = na[0][i][3];
			link.className = "imgLink";
			
			var img = $create("img");
			img.src = na[0][i][14] + "?q=tbn:" + na[0][i][2] + na[0][i][3];
			img.alt = na[0][i][6];
			img.title = na[0][i][6];
		*/
		
		var res = na.responseData.results;
		
		if(res.length > 0) {
			for(var nao = 0; nao < res.length; nao++) {
				var img = new indiv_img_result(res[nao].tbUrl, res[nao].unescapedUrl, res[nao].title, res[nao].width + 'x' + res[nao].height, res[nao].visibleUrl, this.imgs.length);
				this.imgs.push(img);
				this.slideshow.dialog.add_image(img);
			}
			
			if(this.pages * 8 < options.imgPgs) {
				this.search();
			} else {
				this.buildSets();
				this.sets[0].draw(this.div);
				this.slideBtn.btn.disabled = false;
				
				if(this.sets.length > 1) {
					this.nextBtn.btn.disabled = false;
				}
			}
		}
		
	};
	
	this.errorPage = function (response) {
		
	};
	
	this.search = function () {
		var SR = this;
		get("http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=" + encodeURIComponent(this.query) + "&gbv=2&rsz=" + (Math.min(8, options.imgPgs - (8 * this.pages))) + "&start=" + (8 * this.pages), function (r) { SR.processPage(r) }, function (r) { SR.errorPage(r) });
		this.pages++;
	};
	
}

/**	=================================================================
  *	End Image Search
  *	=================================================================
  */

/**
  *	Import Dependencies
  *	
  *	@depends image-search.js
  */
	// Start Image Search Functions ------------------------------------------------
// Starts the slide show
function startslides() {
	if(imgSearch) {
		imgSearch.startSlides();
	}
}
// Searches for images based on what the user is searching for
function menutoggleimages(theSearch) {
	if(imgSearch) imgSearch.undraw();
	imgSearch = new Image_Search(theSearch);
	imgSearch.draw($("mBox"));
	
	if (options.styl == "dock") {
		imgSearch.div.className = "removed";
		$("imgDock").className = "";
	}
}
	// End Image Search Functions -------------------------------------------------

	// Start Wiki Based Functions --------------------------------------------------
// Creates and inserts the link to a wikipedia and wiktionary search
function lookup(lookingFor) {
	var logoBox = $("leftnav");
	var p = $create("p", {
		textContent : "Find " + lookingFor +  " on ",
		className : 'added',
		id : 'wikiLink'
	});
	var link = $create("a");
	link.textContent = "Wikipedia";
	link.href = "http://en.wikipedia.org/wiki/Special:Search?go=Go&search=" + lookingFor;
	var link2 = $create("a");
	link2.textContent = "Wiktionary";
	link2.href = "http://en.wiktionary.org/wiki/Special:Search?go=Go&search=" + lookingFor;
	p.appendChild(link);
	p.innerHTML += " | ";
	p.appendChild(link2);
	
	if($('dymTxt')) {
		$('leftnav').insertBefore(p, $('dymTxt').nextSibling);
	} else {
		$('leftnav').insertBefore(p, $('leftnav').childNodes[0]);
	}
	p.className = "added";
	p.id = "wikLink";
	logoBox.insertBefore(p,logoBox.childNodes[0]);
}
// Handles the case of a wikipedia page being found
function foundwikilink(response) {
	var defdiv = $create("div");
	var code = stringtohtml(response.responseText);
	var theHeading = code.getElementsByClassName("firstHeading")[0];
	var headLink = $create("a");
	headLink.textContent = "Wikipedia Article for " + theHeading.textContent;
	headLink.href = response.finalUrl;
	theHeading.textContent = "";
	var paras = code.getElementsByTagName("p");
	var paranew = $create("p");
	var hit = 0;
	
	for (var l = 0; l < paras.length; l++) {
		if (paras[l].parentNode.id == "bodyContent" && paras[l].childNodes[0].id != "coordinates") {
			hit = l;
			break;
		}
	}
	if(paras.length != 0) {
		// Adds 7 paragraphs from wikipedia if it is set to dock mode
		if (options.styl == "dock") {
			paranew = $create("div");
			var pcount = 0;
			while (hit < paras.length && paras[hit].parentNode.id == "bodyContent" && pcount < 7){
				paras[hit].className = "wiki_p";
				paranew.appendChild(paras[hit]);
				pcount++;
			}
		// Finds and cuts down the wikipedia description if the style is not set to dock mode
		} else {
			var cut = paras[hit].textContent.split(".");
			paranew.textContent = cut.slice(0,Math.min(3,cut.length - 1)).join(".") + ".";
			if (paranew.textContent.length < 2) {
				paranew.textContent = "This item has multiple possible definitions. Please visit wikipedia to specify a specific one.";
			}
		}
	} else {
		paranew.textContent = "No summary could be created for this page.";
	}
	theHeading.appendChild(headLink);
	defdiv.appendChild(theHeading);
	defdiv.appendChild(paranew);
	if (options.vids || options.imgs) {
		$$(statId, dynaId).insertBefore(defdiv,$$(statId, dynaId).childNodes[1]);
	} else {
		$$(statId, dynaId).insertBefore(defdiv,$$(statId, dynaId).childNodes[0]);
	}
	
	// Reassignment of links to link to the right page
	wikiLinks = paranew.getElementsByTagName("a");
	usableUrl = currUrl.split("#")[0];
	for (var lnum = 0; lnum < wikiLinks.length; lnum++) {
		if (wikiLinks[lnum].href.indexOf(usableUrl) < 0) {
			wikiLinks[lnum].href = "http://en.wikipedia.com" + wikiLinks[lnum].href.substr(21);
		} else {
			wikiLinks[lnum].href = wikiLinks[lnum].href.replace(usableUrl, headLink.href);
		}
	}
	
	// ID assignments for Wikipedia entry
	theHeading.id = "wikiHeader";
	paranew.id = "wikiDesc";
	defdiv.id = "wikiDiv";
	if (options.styl == "dock") {
		defdiv.className = "removed";
		$("wikiDock").className = "";
	} else if (options.styl == "center") {
		var wikiExp = $create("div");
		wikiExp.id = "wikiExp";
		defdiv.className = "removed";
		wikiExp.innerHTML = "E<br />x<br />p<br />a<br />n<br />d<br />&laquo;";
		wikiExp.addEventListener("click", function (event) {
			$("wikiDiv").className = ($("wikiDiv").className == "removed") ? "" : "removed";
			wikiExp.innerHTML = (wikiExp.style.left == "-22px" || wikiExp.style.left == "") ? "C<br />o<br />l<br />l<br />a<br />p<br />s<br />e<br />&raquo;" : "E<br />x<br />p<br />a<br />n<br />d<br />&laquo;";
			wikiExp.style.left = (wikiExp.style.left == "-223px") ? "-22px" : "-223px";
		}, false);
		defdiv.parentNode.appendChild(wikiExp);
	}
}
// Handles case when there is no imediate available wikipedia page
function nowikilink(response) {
	lookup(userInput);
}
// Checks whether a wikipedia page for the search was found and calls the appropriate function
function checkwikistate(response) {
	if(response.status != 200 || response.status != 302) {
		var srchregex = new RegExp("^http:\/\/en\.wikipedia\.org\/wiki\/Special:Search\?");
		if (srchregex.test(response.finalUrl)) {
			nowikilink(response);
		} else {
			foundwikilink(response);
		}
	} else {
		nowikilink(response);
	}
}
// Searches wikipedia based on what the user is searching for
function menutogglewiki(theSearch) {
	get("http://en.wikipedia.org/wiki/Special:Search?go=Go&search=" + encodeURIComponent(theSearch), checkwikistate, nowikilink);
}
	// End Wiki Based Functions ----------------------------------------------------

/** 
  *	Import Dependencies
  *	
  *	@depends header.js
  *	@depends image-store.js
  *	@depends options-store.js
  *	@depends helper-functions.js
  *	@depends styles/style-functions.js
  *	@depends update.js
  *	@depends dialogs/dialog-functions.js
  *	@depends shortcuts.js
  *	@depends text-functions.js
  *	@depends styles/visual-functions.js
  *	@depends search/video-functions.js
  *	@depends search/image-functions.js
  *	@depends search/wiki-functions.js
  */
	// Start Core Functions -----------------------------------------------------------
// Redirects user to the scripts homepage
function redirInfo() {
	linkit("http://userscripts.org/scripts/show/33449", true, false);
}
// Checks toggles and calls requested functions
function runThrough() {
	if (!initialized) {
		// Checks for script updates
		scriptPage();
		setInstant();
		
		var q = document.evaluate('//*[@name="q"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		queryBox = q.snapshotItem(0);
		
		if ($("preload")) {
			resetPg();
		} else {
			var pdiv = $create("div", {
				id : "preload"
			});
			document.body.appendChild(pdiv);
		}
		setupConf();
		if(options.tabs) {
			clickd();
		}
		if(options.keyd) {
			keycuts();
		}
		allStyles();
		
		// Setup for first loading.
		if (GM_getValue("loadBefore", false)) {
			conf.undraw();
		} else {
			GM_setValue("loadBefore", true);
		}
		
		// Visual Fixes
		if (options.sugges) {
			noSuggestions();
		}
		if (options.dym) {
			didyoumean();
		}
		if (options.sideads || options.styl != 'classic') {
			removeSideAds();
		} else {
			showSideAds();
		}
		if(options.moveTop) {
			topContentMove();
		}
		
		// Creates the player if either a video or image search is active
		if (options.vids || options.imgs) {
			
			mBox = rightBox("mBox");
			// if ($$(statId, dynaId).childNodes) {
				// $$(statId, dynaId).insertBefore(mBox, $$(statId, dynaId).childNodes[0]);
			// } else {
				// $$(statId, dynaId).appendChild(mBox);
			// }
			document.body.appendChild(mBox);
			
			if (options.imgPlyr || options.embd) {
				makePlayer();
			}
		}
		
		if (options.scuts && !$('allSearches')) {
			multiSearchSetup();
		}
		
		var settings = $create('span', {
			className : 'gbump_btn',
			id : 'gbump_settings'
		});
		settings.addEventListener('click', function (e) {
			conf.draw();
		}, false);
		var theirButton = $('sblsbb');
		theirButton.parentNode.appendChild(document.createTextNode(' '));
		theirButton.parentNode.appendChild(settings);
		
		// New google search code doesn't reload page. This checks for changes and redoes all actions
		var checkpage = setInterval(checknonreload, options.delay);
		initialized = true;
	}
	
	// Main features
	// Shows video results
	if (options.vids) {
		menutogglevids(userInput);
	}
	
	// Shows image results
	if (options.imgs) {
		menutoggleimages(userInput);
	}
	// Add Wikipedia link  -- Done last for loading and time reasons
	if (options.wiki) {
		menutogglewiki(userInput);
	} else {
		nowikilink();
	}
}
	// End Core Functions -------------------------------------------------------------
// End Functions --------------------------------------------------------------------

// Global Variables
var filler, centDiv, centDivConf, conf, stylr, centDivSld, sldTmr, sldObj, dockShow, multiBox, multi, queryBox, imgSearch, embedder;
var pon = 0;

GM_registerMenuCommand("Options", configurations, "o", "control shift");
GM_registerMenuCommand("Styles", styler, "y", "control shift");
GM_registerMenuCommand("Script Info (Opens in New Tab)", redirInfo);

var popupManager = new popup_manager();
var ssStore;
// Finds and saves what the user looks for  and saves the url-- Currently returns incorrect value if back button is used
var userInput = setupText();
var currUrl = location.href;
var delayed = false;

var dynaId = 'search';
var statId = 'ires';
var mBox;
var initialized = false;

// Starts the process
if($$(statId, dynaId) && $$(statId, dynaId).children.length > 0 && extractPage() == 'web') {
	ssStore = new stylesheet_store();
	runThrough();
} else {
	delayed = true;
	var inval = setTimeout(waitingForPage, options.delay);
}

function waitingForPage() {
	if($$(statId, dynaId) && $$(statId, dynaId).children.length > 0 && extractPage() == 'web') {
		userInput = setupText();
		currUrl = location.href;
		ssStore = new stylesheet_store();
		runThrough();
	} else {
		setTimeout(waitingForPage, options.delay);
	}
}
