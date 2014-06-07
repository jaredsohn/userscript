// ==UserScript==
// @name           DownloadEmbed
// @namespace      http://userscripts.org/scripts/show/43549
// @description    Embeds information about different download sites on each link.
// @include        *
// @exclude        http://*facebook.com/*
// ==/UserScript==


//	Set the following value to the maximum links a page can have for this script to process it.

var maxlinks = 3000;

//	Set the following values for the link checking system to use when scanning the download link's html.
//	If the values in 'ok' are found in the page, it will be detected as a working download link.
//	If the values in 'deleted' are found in the page, it will be detected as a deleted download link.
//	Feel free to add your own and email them to me at: chrismrulz@hotmail.com to be used in the script.

var contexts = {
ok:[
'free user',
'free download',
'download free',
'please wait',
'regular download',
'slow download',
'normal download',
'normaler download',
'wait" value=15>',
'wait value=15>',
'start download',
'start free',
'choose download'
],
deleted:[
'deleted by',
'removed by',
'was deleted',
'was removed',
'deleted for',
'removed for',
'deleted due',
'removed due',
'has been deleted',
'has been removed',
'is not available',
'invalid link',
'marked as illegal',
'copyright claim'
]};


//	Set the following values to what web proxies you would to use with the proxy downloader.
//	The url of the download link will simply be appended to the end of the URL, so make sure that's how the cgi proxy operates.
//	Feel free to add your own and email them to me at: chrismrulz@hotmail.com to be used in the script.

var proxies = [
"http://www.zendproxy.com/browse.php?b=30&u=",
"http://www.ziggy-x.com/vol2/images/stories/food/fruit/index.php?q=",
"http://proxybrite.info/browse.php?b=4&u=",
"http://myproxysite.info/index.php?q=",
"http://proxyforu.info/index.php?q=",
"http://eproxyweb.com/index.php?hl=3c4&q="
];


//	Set the following regex values to automatically open link lists on those pages. Feel free to add your own and email them to me at: chrismrulz@hotmail.com to be used in the script.

var autourls = [
'^http:\/\/([a-zA-Z0-9]+\.|)rlslog\.net\/*',
'^http:\/\/([a-zA-Z0-9]+\.|)warezlobby\.org\/movies/\*',
'^http:\/\/([a-zA-Z0-9]+\.|)tymesoft\.com\/movies/\*',
'^http:\/\/([a-zA-Z0-9]+\.|)megarapid\.net\/forums/\*',
'^http:\/\/([a-zA-Z0-9]+\.|)final4ever\.com\/vb/\*',
'^http:\/\/([a-zA-Z0-9]+\.|)scenereleases\.info\/*',
'^http:\/\/([a-zA-Z0-9]+\.|)scene-ddl\.com\/*',
'^http:\/\/([a-zA-Z0-9]+\.|)divxturka\.net\/*'
];


//	The following array 'defaultSites' specifies information about each download host. Feel free to add your own and email them to me at: chrismrulz@hotmail.com to be used in the script.
//
//	Example:
//	{
//		n:'Netload',						<< Name of the download host.
//		l:'^http:\/\/([a-zA-Z0-9]+\.|)netload\.in\/date*',	<< Regex of the host address to find in urls.
//		speed:'20',						<< Max speed you can get from the host when downloading. Specify a '>' if it fluctuates greater than the said speed.
//		size:[100,2],						<< Download limits of the host. [0] = None.
//									First value is the size of the DL limits in MB. Second value specifies which type of DL limit from the following it is:
//									0 = per file | 1 = for free accounts | 2 = per hour | 3 = per day | 4 = mins for cooldown
//									If you use the value 4, use the first value to specify how many minutes the cooldown period is after downloading instead of MBs.
//									In this example, [100,2] means 100MB per hour. [150,0] would mean 150MB per file. [20,4] would mean 20 mins cooldown after DL.
//		resume:false						<< Does the server support resuming downloads? (true/false)
//		width:'640',						<< (Optional) Width of the iframe when you click the + button.
//		height:'480',						<< (Optional) Height of the iframe when you click the + button.
//	},

var defaultSites = [
	{
		n:'Filezzz',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)filezzz\.com\/download\/*',
		speed:'10',
		size:[0],
		resume:false
	},
	{
		n:'FilesDump',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)filesdump\.com\/file\/*',
		speed:'40',
		size:[0],
		resume:false
	},
	{
		n:'Share-Now',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)share-now\.net\/*files\/*',
		speed:'>55',
		size:[250,2],
		resume:true
	},
	{
		n:'Rapidshare',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)rapidshare\.com\/files\/*',
		speed:'>120',
		size:[100,2],
		resume:false
	},
	{
		n:'Letitbit',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)letitbit\.net\/download*',
		speed:'>55',
		size:[0],
		resume:true
	},
	{
		n:'DSFileShare',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)dsfileshare\.com\/download\/*',
		speed:'>55',
		size:[0],
		resume:true
	},
	{
		n:'VIP-File',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)vip-file\.com\/download*',
		speed:'10',
		size:[1024,1],
		resume:false
	},
	{
		n:'Youload',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)youload\.to\/download\/*',
		speed:'>55',
		size:[0],
		resume:true
	},
	{
		n:'Adrive',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)adrive\.com\/public\/*',
		speed:'>55',
		size:[0],
		resume:true
	},
	{
		n:'EzyFile',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)ezyfile\.net\/*',
		speed:'100',
		size:[1024,0],
		resume:true
	},
	{
		n:'MegaUpload',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)megaupload\.com\/?d*',
		speed:'>55',
		size:[250,2],
		resume:true
	},
	{
		n:'MegaShares',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)megashares\.com\/?d*',
		speed:'>55',
		size:[250,2],
		resume:false
	},
	{
		n:'FileBase',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)filebase\.to\/files\/*',
		speed:'256',
		size:[1024,0],
		resume:false
	},
	{
		n:'SMS4File',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)sms4file\.com\/download*',
		speed:'>55',
		size:[250,1],
		resume:true
	},
	{
		n:'Shareator',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)shareator\.([a-zA-Z0-9])\/*',
		speed:'>55',
		size:[0],
		resume:true
	},
	{
		n:'Share-Online',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)share-online\.biz\/download\.*php',
		speed:'1536',
		size:[300,0],
		resume:false
	},
	{
		n:'UploadLine',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)uploadline\.com\/*',
		speed:'>55',
		size:[2048,3],
		resume:true
	},
	{
		n:'DepositFiles',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)depositfiles\.com\/files\/*',
		speed:'>55',
		size:[2048,0],
		resume:false
	},
	{
		n:'Netload',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)netload\.in\/date*',
		speed:'20',
		size:[100,2],
		resume:false
	},
	{
		n:'Mediafire',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)mediafire\.com\/*',
		speed:'>55',
		size:[100,0],
		resume:true
	},
	{
		n:'Bitroad',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)bitroad\.net\/download\/*',
		speed:'45',
		size:[0],
		resume:true
	},
	{
		n:'EgoShare',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)egoshare\.com\/download\.*php',
		speed:'350',
		size:[300,0],
		resume:false
	},
	{
		n:'FlyUpload',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)flyupload\.com\/*',
		speed:'350',
		size:[2048,0],
		resume:false
	},
	{
		n:'UploadBox',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)uploadbox\.com\/files\/*',
		speed:'>55',
		size:[2048,0],
		resume:true
	},
	{
		n:'MyStream',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)mystream\.to\/file-*',
		speed:'150',
		size:[1024,0],
		resume:true
	},
	{
		n:'Filenavi',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)filenavi\.com\/direct/\*',
		speed:'>55',
		size:[5120,0],
		resume:true
	},
	{
		n:'Hotfile',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)hotfile\.com\/dl/\*',
		speed:'>300',
		size:[15,4],
		resume:true
	},
	{
		n:'Fileserve',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)fileserve\.com\/file/\*',
		speed:'>150',
		size:[15,4],
		resume:false
	},
	{
		n:'Filesonic',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)filesonic\.com\/file/\*',
		speed:'>64',
		size:[0],
		resume:false
	},
	{
		n:'Fileop',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)fileop\.com\/*',
		speed:'>55',
		size:[0],
		resume:false
	}
];

var gfx = {
	minus : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADKSURBVHjahFG7EcIwDI1l/WzcULFCCtahpuGo4ZiAgShZgT04VghtjBKHBI4DdLbOlp6enmW32p6qf4a29%2BtFuXgk3xsRhRBUowV3xwuWXOe7HIswABAzIYpGDTowlWorFVUmcc6BZ1USkaldIUgpWdQBIwIiOYA2v2hC9HXdVFXzKbm5L82DbeP/9q5CVoTz9TafxUFm%2B2yTs608gIIys4kWixVAn3Nvc2JJcRZHmX2xIfLI2jPFmPNYNp0MYTMbQJvD%2Bfe3PAQYAAu1L6fh/GDIAAAAAElFTkSuQmCC',
	plus : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADCSURBVHjalJFdCsIwDIDTOkEfxGMIehtBvIF4Em/gg1cQ9CDCXoSdY6sbdbVJZ9fpuuFgM5CmbX76pWGb3aWAPyQol/Np3RtY2LLb/RV4l5Ox0Gn7rrJ8KIoxxiP1CRICIfmEXGmYTu6daF9JxMIjIVH/K9hA0pogFkvgvOpsPoucFekKyBYzVrGJpJTyGMDqvZQSyDZLiO05yGcO%2BoU/GHEiugf3EKk76E%2BlWzhxNstkHTgOAp9wOEYl4GjIF78FGABBZFEyfagcmwAAAABJRU5ErkJggg==',
	error : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIsSURBVDjLpVNLSJQBEP7+h6uu62vLVAJDW1KQTMrINQ1vPQzq1GOpa9EppGOHLh0kCEKL7JBEhVCHihAsESyJiE4FWShGRmauu7KYiv6Pma+DGoFrBQ7MzGFmPr5vmDFIYj1mr1WYfrHPovA9VVOqbC7e/1rS9ZlrAVDYHig5WB0oPtBI0TNrUiC5yhP9jeF4X8NPcWfopoY48XT39PjjXeF0vWkZqOjd7LJYrmGasHPCCJbHwhS9/F8M4s8baid764Xi0Ilfp5voorpJfn2wwx/r3l77TwZUvR+qajXVn8PnvocYfXYH6k2ioOaCpaIdf11ivDcayyiMVudsOYqFb60gARJYHG9DbqQFmSVNjaO3K2NpAeK90ZCqtgcrjkP9aUCXp0moetDFEeRXnYCKXhm+uTW0CkBFu4JlxzZkFlbASz4CQGQVBFeEwZm8geyiMuRVntzsL3oXV+YMkvjRsydC1U+lhwZsWXgHb+oWVAEzIwvzyVlk5igsi7DymmHlHsFQR50rjl+981Jy1Fw6Gu0ObTtnU+cgs28AKgDiy+Awpj5OACBAhZ/qh2HOo6i+NeA73jUAML4/qWux8mt6NjW1w599CS9xb0mSEqQBEDAtwqALUmBaG5FV3oYPnTHMjAwetlWksyByaukxQg2wQ9FlccaK/OXA3/uAEUDp3rNIDQ1ctSk6kHh1/jRFoaL4M4snEMeD73gQx4M4PsT1IZ5AfYH68tZY7zv/ApRMY9mnuVMvAAAAAElFTkSuQmCC',
	thumbsup : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH9SURBVDjLlZNBaxNREMcTtTkonvwAHkQP4kHBj2LBngPiqRUPgpdiDYKlLYVKBRUU2psXQwNBCrVtaowbEjasocuGDRt2l112fUs2pFLroT8Pb22MNdAe5vDezP83M2/mpYDUkalxBjV6gG6B5i0P+UbY8IXmXaJpW8Q90M2fqM7M6QCquIAWvMX3Ie6BZvapuhMnB0AKJbrNbusXURdCAYqpsunfOAkgDZyjs3+RmjOD68gqbBvK1ms2vPOjAWpwhbo/zTdPYdf5jmbtIXrQjaUZFpT1A7b0CT546eOAuvMJz4E4hv4e9PpSGMUQdUFEYDug6pA3pijo18k3rw4AmhkQ92Sw1YFaTfYvEnEoIAglpNGAYl2jUFUGgM3GZ/JrUCqB0QLXk7AwgiAR+wF4vvSZbXi3ygCwYY5Tb8jSo64M6MYS4IfgBeAmYtuVlSy9/AuwLjLsKAdslaBchlYr6V0kWX1wEnHHAcuGuSWGx1isrlOucDT/UMj+PR+cJGvHlm/UtuD5wj+A9941KgoUP0KlIkUiktn/iNsdaLWhqcPj+R/DgBX3DCuNOxQKYBhSHAgJMkz4osDs4iG5WcjmYu7mrOOr/MpIM1+/xdzaNm9WD3mxDNNP4OGjfe5PfeXeZI7s5E3Gn46RXRj7/1+QK30WyPBs8XJyHvmZfgPxTEl50XYktwAAAABJRU5ErkJggg==',
	thumbsdown : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHrSURBVDjLjZOxaxNhGIcTtRkUJ/8AB9FBHBT8U3ToLAouxkUQLEIVnRxcKiithIjBBsSgRLgMGlNjvSOh4XJ4XLhwIRwpd+a4L1xMjEMfhy+aS6W2w2/4Pngefry8bwJI7EoSOAykaHdOTt+JvTL/UY+SNAYXML1POO4OnS5YLTCtMYb5FcO8j26cR7MX0OyFeYE2OkQjuESrBWEI4wmMxjAcgRiAH4Bu7GBaUDcFm5YzL9gcnaHdAUUBVQXPk4JoCCKSklDI+AG8Lv2YF5QbJepbEgiFBIYjGMTgQEAQQj+A/BtmAk2k0JoTKhtQrYJtQxTJhH/gEPpT2O9DLh8TbHQu0zRkZSHAdiQsdsF+AF4fPB9e5GKCiv6ZwluoVOTUe9sSjlf2+xJ2t8GyYTUTE+i2J4EQnA7UahKIV/Z8KS8W4eG6zlJGnQm+OB+wTDl5MeCvLF65aUC2AFfyadL5s9wpnJ4JitYpsrW7vKyqFNTvKLUh7rRy14V3H2EpMyG9tsj1anKvTUwCR2gExylZy1jfwO1BuQy3159xtXh0/1WGBO+7F6lqv3B70NDhwast0qVzB7sFxTmGYj3HNOWkH61G3MovHvyYFP0EiuZgt+Hx05/cyC7/D/5XkLNSrKg3ufcErq2t7AcDid88lUyCVhHVfwAAAABJRU5ErkJggg==',
	wand : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHMSURBVDjLlZLBSyJhGMa/UxTUIWJ0ZVmlwxLLEiEhurCoKeqCOtZN7J4ZRZdd9rSG6NFbSOegDp5aqWWI3UGm6KBUxsq2LLj+CzV9jDOH8NlvJtqLjuXhBy/z8Xvel4chAMhTKGfOMeVsbqXf2wBp3s5Yf5hno8rp24YxS9PTVHq18mTAgzj3k4mCIs0cqZeLUCTHJ1q13VKRSz0v4PRNVr1KQfu9Aa31BZ2LKKg42aHfJ8ZNA9i5L9hWUZFeQ73kof3N42SPR6OyjFZ1FZ36AuQfo5CPyc7gDiRHttNYwsl+Apqmodvt4uJrCur1GmSB/GI4TAOo9JKjVasQi8VQr9ehqiqazSaqu1Fofz5C/kYow9M3gJVkp+JUJZFIIJ1Oo1gsolwu42hngcmfdfmecS4fki3TC3ieN2SPx4NAIIB4PA7lPIo70YY7YQJyhdhNS3yU3W43/H4/LBaLvnWbbbxnvGNyQz4gmb4ByWQShULBkH0+HziOg/6die+ZKOjzzQEZYXzoCYhEIsjn8z3yI0wKmf7KwWAQuVwOLpcLXq+3Rx4EyWQyaLfbcDqdCIVCQ8n/A2q1GkqlklHYMLIREA6HN/WzrVbr0LLOP1AMs7UPAa92AAAAAElFTkSuQmCC',
	check : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJySURBVDjLjVJNa1NBFD3vvXxhWprShrSxbTbGYEs2hUoXBaELaTaCICEQJd2Im+JfcF2EUgT/gH8gKymIttkIIlRS3dgs4kfSpMFUmqRJXvI+xnsnJiZ2oZc3794Zzpx7zswoQggcHx8L27bBw7IsOUzTHOThYRjGIMfjccUBCgYGg3M4r9cBIkTvk7WQSQxqzpOTPuztveQZBgTntRoeP3uL/4mnj1bQ7Xb/ELCkHj0wN7+AsSsuzPu98Lgd0A0Bw7RhWNSIMO/eZyFsgU6nI/Eq/9iPlEmhKApauonTcx2tjiUdmbSzSyQds4fhtREFTGD39REBkzRaJmzRgc/rhMOhQaWu4jeBLezLBHQNvf1DJO2uha5hw0uWNE2FqvR6MPYSAYYs8JAkDGZLZEVRRW9dKvjLAk9UTR4Hvn398s9b0MhSn0Dhw0un02Jl5SbqjQbabZ0e1mcUC9/h9/tRLp/iWvg6Qgsh7O+/xsxMANXqGYrFArLZ7FhfwU4mc3BL13Xl6OjoajgcDqRSKTSbTQIWkclkGp8+Zp3JZNLtcrmUcrmMw0MX8vn8E6V/fRzLy8t31tfXXyQ3Nyee7+6eVSqVqdnZWUSjUfCmarWKUqlkjY+Pv9ra2oqR8po67M3tdt+eoOD6/oPUFD+WRCKBtbU1xGIxbGxs4OLiok1xjzEEdTuGCXw+H6irrDMHb2Te3t6G1+uVNVtSVdWjaVqa5ycnJ/qIhcXFxRtLS0sfVldXPcFgEB6PRxLmcjlWh1AohEAgwE//Z6FQUOlsTkcIIpGIRp6j1DFNBH7apPFzJ+8PueH09DR3dpI1i87iBym6+wuQ3GjC/VvaWwAAAABJRU5ErkJggg==',
	bulb : 
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAoFJREFUeNpsUltLVFEU/vY5e67OTVMnqSxBKHLK1BBS6gdED+FT89ZLPfVcoNCciaIbBPVeD12g6KWwwgtCFJJBhRReEhlpsshRZ5wZz5mZc/bMbs3IhFmLvdjszfet9a0Lk1KiaunEbKSYWdBUsQJZWIM00xD5HAoCkL6QtqsrHK1iWZlo5rMR/eeE5nYUoToDYA5y7gZjDKW8AZGKQZ9/iUxWR23PgOYPtkaZsAqRdGxQ89YFofp2U6wSHZ1SmJAls/JmNj8FacD65COszAwhePKBxhJzQ9LnErAHOwhogCkuQPFs3GTlP2l+R8mKg3uOYPnVRayaTigsPQ3V00wIg4RzcmclS4VADinAVB/9cYj1Ufg6T0NZfAfOCkkoDi9KYolINuLkIItFugWktKgJJFkxUCzEIK152P09BMmBF/ImRDYBHvDATDwmiW7kPsxRAspMxGJmCTXHuqlJM7D5O2AmlygQh2J5QzAW3pCc7ZTFQubFEzgONcAR8sC+3wZ3716k7l9FqbAKvq0PyYmHsOrboezsCt9Ir/yCPjsMR9MZKrHcFJqtSvXxcncllBov3Hv6kZ2cRHJqBM3H+zWuqvyCv/OskRy/pkEy2LwHNiZcdFF9zkoQXteNzKd5/Bi9hZoT17VAsCXKqpuTXJyOLL+9o/lyC6htscG+T1RmWYoF8H14HCl7C4J9N7UdbUejfzanal8/T0TGnt3VfPWN0PXXWNctJFJt+Db1EZdv39Na2w7/vXKbLdJ/TraGekmqAiOnI2vk8H7sOZ4OjrDNOI4tJmmETcFGtB9sRzwex5epafB/UP8hhsOntEj0iramCwhhwWUHogPnL23F/RZgALZtJ5mXblnLAAAAAElFTkSuQmCC",
	close : "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%20%00%00%00%20%08%06%00%00%00szz%F4%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%0AOiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSgTS%E9%16%3D%F7%DE%F4BK%88%80%94KoR%15%08%20RB%8B%80%14%91%26*!%09%10J%88!%A1%D9%15Q%C1%11EE%04%1B%C8%A0%88%03%8E%8E%80%8C%15Q%2C%0C%8A%0A%D8%07%E4!%A2%8E%83%A3%88%8A%CA%FB%E1%7B%A3k%D6%BC%F7%E6%CD%FE%B5%D7%3E%E7%AC%F3%9D%B3%CF%07%C0%08%0C%96H3Q5%80%0C%A9B%1E%11%E0%83%C7%C4%C6%E1%E4.%40%81%0A%24p%00%10%08%B3d!s%FD%23%01%00%F8~%3C%3C%2B%22%C0%07%BE%00%01x%D3%0B%08%00%C0M%9B%C00%1C%87%FF%0F%EAB%99%5C%01%80%84%01%C0t%918K%08%80%14%00%40z%8EB%A6%00%40F%01%80%9D%98%26S%00%A0%04%00%60%CBcb%E3%00P-%00%60'%7F%E6%D3%00%80%9D%F8%99%7B%01%00%5B%94!%15%01%A0%91%00%20%13e%88D%00h%3B%00%AC%CFV%8AE%00X0%00%14fK%C49%00%D8-%000IWfH%00%B0%B7%00%C0%CE%10%0B%B2%00%08%0C%000Q%88%85)%00%04%7B%00%60%C8%23%23x%00%84%99%00%14F%F2W%3C%F1%2B%AE%10%E7*%00%00x%99%B2%3C%B9%249E%81%5B%08-q%07WW.%1E(%CEI%17%2B%146a%02a%9A%40.%C2y%99%192%814%0F%E0%F3%CC%00%00%A0%91%15%11%E0%83%F3%FDx%CE%0E%AE%CE%CE6%8E%B6%0E_-%EA%BF%06%FF%22bb%E3%FE%E5%CF%ABp%40%00%00%E1t~%D1%FE%2C%2F%B3%1A%80%3B%06%80m%FE%A2%25%EE%04h%5E%0B%A0u%F7%8Bf%B2%0F%40%B5%00%A0%E9%DAW%F3p%F8~%3C%3CE%A1%90%B9%D9%D9%E5%E4%E4%D8J%C4B%5Ba%CAW%7D%FEg%C2_%C0W%FDl%F9~%3C%FC%F7%F5%E0%BE%E2%24%812%5D%81G%04%F8%E0%C2%CC%F4L%A5%1C%CF%92%09%84b%DC%E6%8FG%FC%B7%0B%FF%FC%1D%D3%22%C4Ib%B9X*%14%E3Q%12q%8ED%9A%8C%F32%A5%22%89B%92)%C5%25%D2%FFd%E2%DF%2C%FB%03%3E%DF5%00%B0j%3E%01%7B%91-%A8%5Dc%03%F6K'%10Xt%C0%E2%F7%00%00%F2%BBo%C1%D4(%08%03%80h%83%E1%CFw%FF%EF%3F%FDG%A0%25%00%80fI%92q%00%00%5ED%24.T%CA%B3%3F%C7%08%00%00D%A0%81*%B0A%1B%F4%C1%18%2C%C0%06%1C%C1%05%DC%C1%0B%FC%606%84B%24%C4%C2B%10B%0Ad%80%1Cr%60)%AC%82B(%86%CD%B0%1D*%60%2F%D4%40%1D4%C0Qh%86%93p%0E.%C2U%B8%0E%3Dp%0F%FAa%08%9E%C1(%BC%81%09%04A%C8%08%13a!%DA%88%01b%8AX%23%8E%08%17%99%85%F8!%C1H%04%12%8B%24%20%C9%88%14Q%22K%915H1R%8AT%20UH%1D%F2%3Dr%029%87%5CF%BA%91%3B%C8%002%82%FC%86%BCG1%94%81%B2Q%3D%D4%0C%B5C%B9%A87%1A%84F%A2%0B%D0dt1%9A%8F%16%A0%9B%D0r%B4%1A%3D%8C6%A1%E7%D0%ABh%0F%DA%8F%3EC%C70%C0%E8%18%073%C4l0.%C6%C3B%B18%2C%09%93c%CB%B1%22%AC%0C%AB%C6%1A%B0V%AC%03%BB%89%F5c%CF%B1w%04%12%81E%C0%096%04wB%20a%1EAHXLXN%D8H%A8%20%1C%244%11%DA%097%09%03%84Q%C2'%22%93%A8K%B4%26%BA%11%F9%C4%18b21%87XH%2C%23%D6%12%8F%13%2F%10%7B%88C%C47%24%12%89C2'%B9%90%02I%B1%A4T%D2%12%D2F%D2nR%23%E9%2C%A9%9B4H%1A%23%93%C9%DAdk%B2%079%94%2C%20%2B%C8%85%E4%9D%E4%C3%E43%E4%1B%E4!%F2%5B%0A%9Db%40q%A4%F8S%E2(R%CAjJ%19%E5%10%E54%E5%06e%982AU%A3%9AR%DD%A8%A1T%115%8FZB%AD%A1%B6R%AFQ%87%A8%134u%9A9%CD%83%16IK%A5%AD%A2%95%D3%1Ah%17h%F7i%AF%E8t%BA%11%DD%95%1EN%97%D0W%D2%CB%E9G%E8%97%E8%03%F4w%0C%0D%86%15%83%C7%88g(%19%9B%18%07%18g%19w%18%AF%98L%A6%19%D3%8B%19%C7T071%EB%98%E7%99%0F%99oUX*%B6*%7C%15%91%CA%0A%95J%95%26%95%1B*%2FT%A9%AA%A6%AA%DE%AA%0BU%F3U%CBT%8F%A9%5ES%7D%AEFU3S%E3%A9%09%D4%96%ABU%AA%9DP%EBS%1BSg%A9%3B%A8%87%AAg%A8oT%3F%A4~Y%FD%89%06Y%C3L%C3OC%A4Q%A0%B1_%E3%BC%C6%20%0Bc%19%B3x%2C!k%0D%AB%86u%815%C4%26%B1%CD%D9%7Cv*%BB%98%FD%1D%BB%8B%3D%AA%A9%A19C3J3W%B3R%F3%94f%3F%07%E3%98q%F8%9CtN%09%E7(%A7%97%F3~%8A%DE%14%EF)%E2)%1B%A64L%B91e%5Ck%AA%96%97%96X%ABH%ABQ%ABG%EB%BD6%AE%ED%A7%9D%A6%BDE%BBY%FB%81%0EA%C7J'%5C'Gg%8F%CE%05%9D%E7S%D9S%DD%A7%0A%A7%16M%3D%3A%F5%AE.%AAk%A5%1B%A1%BBDw%BFn%A7%EE%98%9E%BE%5E%80%9ELo%A7%DEy%BD%E7%FA%1C%7D%2F%FDT%FDm%FA%A7%F5G%0CX%06%B3%0C%24%06%DB%0C%CE%18%3C%C55qo%3C%1D%2F%C7%DB%F1QC%5D%C3%40C%A5a%95a%97%E1%84%91%B9%D1%3C%A3%D5F%8DF%0F%8Ci%C6%5C%E3%24%E3m%C6m%C6%A3%26%06%26!%26KM%EAM%EE%9ARM%B9%A6)%A6%3BL%3BL%C7%CD%CC%CD%A2%CD%D6%995%9B%3D1%D72%E7%9B%E7%9B%D7%9B%DF%B7%60ZxZ%2C%B6%A8%B6%B8eI%B2%E4Z%A6Y%EE%B6%BCn%85Z9Y%A5XUZ%5D%B3F%AD%9D%AD%25%D6%BB%AD%BB%A7%11%A7%B9N%93N%AB%9E%D6g%C3%B0%F1%B6%C9%B6%A9%B7%19%B0%E5%D8%06%DB%AE%B6m%B6%7Dagb%17g%B7%C5%AE%C3%EE%93%BD%93%7D%BA%7D%8D%FD%3D%07%0D%87%D9%0E%AB%1DZ%1D~s%B4r%14%3AV%3A%DE%9A%CE%9C%EE%3F%7D%C5%F4%96%E9%2FgX%CF%10%CF%D83%E3%B6%13%CB)%C4i%9DS%9B%D3Gg%17g%B9s%83%F3%88%8B%89K%82%CB.%97%3E.%9B%1B%C6%DD%C8%BD%E4Jt%F5q%5D%E1z%D2%F5%9D%9B%B3%9B%C2%ED%A8%DB%AF%EE6%EEi%EE%87%DC%9F%CC4%9F)%9EY3s%D0%C3%C8C%E0Q%E5%D1%3F%0B%9F%950k%DF%AC~OCO%81g%B5%E7%23%2Fc%2F%91W%AD%D7%B0%B7%A5w%AA%F7a%EF%17%3E%F6%3Er%9F%E3%3E%E3%3C7%DE2%DEY_%CC7%C0%B7%C8%B7%CBO%C3o%9E_%85%DFC%7F%23%FFd%FFz%FF%D1%00%A7%80%25%01g%03%89%81A%81%5B%02%FB%F8z%7C!%BF%8E%3F%3A%DBe%F6%B2%D9%EDA%8C%A0%B9A%15A%8F%82%AD%82%E5%C1%AD!h%C8%EC%90%AD!%F7%E7%98%CE%91%CEi%0E%85P~%E8%D6%D0%07a%E6a%8B%C3~%0C'%85%87%85W%86%3F%8Ep%88X%1A%D11%975w%D1%DCCs%DFD%FAD%96D%DE%9Bg1O9%AF-J5*%3E%AA.j%3C%DA7%BA4%BA%3F%C6.fY%CC%D5X%9DXIlK%1C9.*%AE6nl%BE%DF%FC%ED%F3%87%E2%9D%E2%0B%E3%7B%17%98%2F%C8%5Dpy%A1%CE%C2%F4%85%A7%16%A9.%12%2C%3A%96%40L%88N8%94%F0A%10*%A8%16%8C%25%F2%13w%25%8E%0Ay%C2%1D%C2g%22%2F%D16%D1%88%D8C%5C*%1EN%F2H*Mz%92%EC%91%BC5y%24%C53%A5%2C%E5%B9%84'%A9%90%BCL%0DL%DD%9B%3A%9E%16%9Av%20m2%3D%3A%BD1%83%92%91%90qB%AA!M%93%B6g%EAg%E6fv%CB%ACe%85%B2%FE%C5n%8B%B7%2F%1E%95%07%C9k%B3%90%AC%05Y-%0A%B6B%A6%E8TZ(%D7*%07%B2geWf%BF%CD%89%CA9%96%AB%9E%2B%CD%ED%CC%B3%CA%DB%907%9C%EF%9F%FF%ED%12%C2%12%E1%92%B6%A5%86KW-%1DX%E6%BD%ACj9%B2%3Cqy%DB%0A%E3%15%05%2B%86V%06%AC%3C%B8%8A%B6*m%D5O%AB%EDW%97%AE~%BD%26zMk%81%5E%C1%CA%82%C1%B5%01k%EB%0BU%0A%E5%85%7D%EB%DC%D7%ED%5DOX%2FY%DF%B5a%FA%86%9D%1B%3E%15%89%8A%AE%14%DB%17%97%15%7F%D8(%DCx%E5%1B%87o%CA%BF%99%DC%94%B4%A9%AB%C4%B9d%CFf%D2f%E9%E6%DE-%9E%5B%0E%96%AA%97%E6%97%0En%0D%D9%DA%B4%0D%DFV%B4%ED%F5%F6E%DB%2F%97%CD(%DB%BB%83%B6C%B9%A3%BF%3C%B8%BCe%A7%C9%CE%CD%3B%3FT%A4T%F4T%FAT6%EE%D2%DD%B5a%D7%F8n%D1%EE%1B%7B%BC%F64%EC%D5%DB%5B%BC%F7%FD%3E%C9%BE%DBU%01UM%D5f%D5e%FBI%FB%B3%F7%3F%AE%89%AA%E9%F8%96%FBm%5D%ADNmq%ED%C7%03%D2%03%FD%07%23%0E%B6%D7%B9%D4%D5%1D%D2%3DTR%8F%D6%2B%EBG%0E%C7%1F%BE%FE%9D%EFw-%0D6%0DU%8D%9C%C6%E2%23pDy%E4%E9%F7%09%DF%F7%1E%0D%3A%DAv%8C%7B%AC%E1%07%D3%1Fv%1Dg%1D%2FjB%9A%F2%9AF%9BS%9A%FB%5Bb%5B%BAO%CC%3E%D1%D6%EA%DEz%FCG%DB%1F%0F%9C4%3CYyJ%F3T%C9i%DA%E9%82%D3%93g%F2%CF%8C%9D%95%9D%7D~.%F9%DC%60%DB%A2%B6%7B%E7c%CE%DFj%0Fo%EF%BA%10t%E1%D2E%FF%8B%E7%3B%BC%3B%CE%5C%F2%B8t%F2%B2%DB%E5%13W%B8W%9A%AF%3A_m%EAt%EA%3C%FE%93%D3O%C7%BB%9C%BB%9A%AE%B9%5Ck%B9%EEz%BD%B5%7Bf%F7%E9%1B%9E7%CE%DD%F4%BDy%F1%16%FF%D6%D5%9E9%3D%DD%BD%F3zo%F7%C5%F7%F5%DF%16%DD~r'%FD%CE%CB%BB%D9w'%EE%AD%BCO%BC_%F4%40%EDA%D9C%DD%87%D5%3F%5B%FE%DC%D8%EF%DC%7Fj%C0w%A0%F3%D1%DCG%F7%06%85%83%CF%FE%91%F5%8F%0FC%05%8F%99%8F%CB%86%0D%86%EB%9E8%3E99%E2%3Fr%FD%E9%FC%A7C%CFd%CF%26%9E%17%FE%A2%FE%CB%AE%17%16%2F~%F8%D5%EB%D7%CE%D1%98%D1%A1%97%F2%97%93%BFm%7C%A5%FD%EA%C0%EB%19%AF%DB%C6%C2%C6%1E%BE%C9x31%5E%F4V%FB%ED%C1w%DCw%1D%EF%A3%DF%0FO%E4%7C%20%7F(%FFh%F9%B1%F5S%D0%A7%FB%93%19%93%93%FF%04%03%98%F3%FCc3-%DB%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%04QIDATx%DA%EC%D7%5B%8C%DDU%15%06%F0%DF%3Agz%E60%B5-sy%A1TK%81)%B4%A9-%03R%14%2F%A9i%81N%09D%03%16G%B0%06%12%02%09A%8DH%94%60%7C%D3'%23%0F%C6hh%88%97%87%C6j%C4%82%94%10%2C%85%D4%12%20%A0XZFF%DA%D24%5E%B0%B4%D3%0B3s%CE%9C%999%CB%87s*c%ED%E8%D4%8A%3C%C8NV%F6%FFa%AF%FD%7D%FFo%5D%F6%DE%91%99%DE%C9Q%F0%0E%8Fw%09%B4%FC%BB%05%17D%B4%9E%C7b%D4_%A5%FF%D5%CC%B1%FF%19%81%F7G%CC%EE%E5%13%CBX%7F%06%E3%BF%E3%8E%9E%88%87%5E%CC%3C%3C%9D%CD%2F%88h%3D%8B%F7%25y%88%03%BB2%8F%9D%12%81%85%2C%BD%94%1F%F4%90%B3p%3E%DF%9AC%DB%8A%88G%9F%CA%DC%F7%AF%7C%AF%8E%B8h%1D%AB%16%F0%CDa%0A%FD%DCrY%C4%96%E72%FF%3Cm%02m%B4uQ%EF%22%CE%24%BBh%7D%0F%F7%94%99%F1%F1%88%87%9E%9C%82%C4%1D%11%D7%7F%99%9B%97%B2%AA%8C%A3h%E7%81%03%F4b%FA%04%F6%F2%CA%3E%BE%BD%8C%2F%B4%60%06%85%05%94%D6%F0%F91FWD%3C6Y%89%0FG%CC%BB%9Euw%F3%D9y%CCo%A1%8E%96V%EA%E7R%9FC%C7)%85%E0%E9%CC%FD%B7D%3C%B5%84%DB%DA%99Q%22J%94%170%B6%96%3B%3Bi%BF!%E2%897%18%5C%C8%85%F7r%DD%E5%5C%3B%87R%90%08%8C%17(%8CS%3F%C2%A1S%AE%82g%D9%D6%CD%D7%E7s%CF%5CZ%0B%B4%94h%9DO%EB%A7%E9%5B%C6M%7F%A2t%3E%C5n%CA%A5%06%F0%3FX%85%F1%1D%7C%7F%80%1D%A7%DC%07%FA3%87%B7%B0%F9%056%D6%1A%E1%1CE1%989%93%F2%25%14z%89E%0D%85%9A%91%12M%F7%89%1A%B5gx%FCa6%FC%26%F3%E0%3F%01d%E6%B4%ECvV%0E%F0%7C%9D%3F%24%AF'%07%9B%F3%1F%93%BF%26%83%C9%B1d%A89%1F%A9qh%3B%9B%3F%C5G%A6%DAw%DA%9Dp%3B%CF%3C%CB%8F%AB%1C%C0%F1z%9E%89%D9%98%85%F2%09!%AD%EFa%CF%FD%DC%F7%D3%CC%ED%A7%DD%8Awf%8E%BC%C2%40%857Q%D1%C8%F0%3CA%F2%F1%A6%D5%86%98%F8%15%8F%FC(s%CBi%B5%E2%C9%A3%93Y%C5%C6gs%FA%3Bp6%09%D5QO%E2%0D%EC%E2%C5%FF%DAatE%C4%D9%1F%A0%A7L%7BS%EEl%26%E4%08%AAM%ABa%02Y'%F2-%82%A7G%60yD%C7u%5C%D3%CD%95%25%BAPj%02%1F%C6%91d%08cM%05%04%3A(%2C%E5%D2%0B%23%DAN%8B%C0%F2%88%AE%CF%D0%B7%92%BB%BA8%3B8%A3%19%E7%A3%C9%E1%09%8E%D5%19%CD%06x%B1%89%DF2%87%E2%95%7C%B1%97O%9E%1BQ%F8%8Fr%E0%F2%88%B9%7D%F4%AD%E6%2B%EF%A5%B5%D4%00%1E%C6P%8D%D1A%8A%C3%14K%14%3A4%98%15%1A%3FU%2C%90%0B%88%1BY_%A0%B8%24%E2%17%BB2%DF%9C6%81K%22%3A%FBXw5%F7%9E%D3h2%B5f%CC%87%AA%D4w%B2%F7Q%1E%1F%60%F7%5C%E6%5D%C5%B5%CBY%3D%9BB4T(%CC%20%96%90%7D%7C%AF%95%F2%C5%11%0F%FE%F6%C4f4U%83%B8%9B%9Bw0Zi%C8%5Bk%CA%BDw%90%97%7F%C9wzY2y%FD%15%2C%DA%CA%A6%0ACuF%F2-%AB%8EP%7D%81%CAW%B9%F5b%BA%26%FB%9D%14%FC2%E6%FD%84%1F%1Ee%A2%CE%C4%04%95%11%5E%DF%C5%C07%B8%ED%22%DAO%E6%B7%96%8F%3E%C6%83%7F%A12N%25%1B%E4%ABIu%88%EAV%AA_b%DD2%3A%8E%FB%B4L%91%99%C5q%C6%C7%88%0A%B5aF%FB%D9%F6s6%3C%C2%C3%7B3%EB'%F3%DB%98%F9%EB%1B%22%ACf%FFJn%9FK%B64Kqf%E3B%93%3D%DC%7F%94%B5%8B%23%B6%F6g%0EM%19%82%3B%B9i3%E3%DB%A8l%E0%BB%B7%B2f%BA%E7%C6Z%3E%B6%9E%FB%5E%A3Z%A3%D6%AC%92%B1%DD%D4~F%EDkTV%B1xJ%05%60%0B%9B%06Y%D3A%E7~vo%CA%7C~%BAMkc%E6%B6k%22%86%ABT%3E%C4%5Dg%11Ur%1Fq%90%1C%E4s%C7%EF%06%F1v%BE%8CVDt%F7%F0%C1%85%3CP%26%0E%91%7B%B8%F1%25%9E%7B%3As%FF%DBN%00%16E%B4%9DC%F7%99t%0E3%FC%1A%BF%DF9%E9v%1C%EF%BE%0D%FF%EF%09%FCm%003%80Qd%00%03%60%FD%00%00%00%00IEND%AEB%60%82"
};

function checklinks2(){
	if(document.links.length>maxlinks){
		if (confirm("DownloadEmbed: There are more than " + maxlinks.toString() + " links on this page. Process the links anyway?") == false)
		return
	}

	for (var i=0; i<document.links.length; i++){
		for(var ii=0;ii<defaultSites.length;ii++){
			cursite = defaultSites[ii];
			curlink = document.links[i];
			if(curlink.href.match(cursite.l) != null){
				if(location.href.match(cursite.l) == null){
					if(curlink.getAttribute("dembedded") != 1) 
					{
						doit(cursite,curlink);
						curlink.setAttribute("dembedded",1);
					}
					break;
				}
			}
		}
	}
}

var linklistup = 0;

function checklinks(){
	if(document.links.length>maxlinks){
		if (confirm("DownloadEmbed: There are more than " + maxlinks.toString() + " links on this page. Process the links anyway?") == false)
		return
	}
	if(linklistup == 1)
	return

	linkcol0 = document.createElement("div");
	linkcol1 = document.createElement("div");
	linkcol2 = document.createElement("div");
	linkcol3 = document.createElement("div");
	linkcol4 = document.createElement("div");
	linkcol5 = document.createElement("div");
	linkcol6 = document.createElement("div");
	linkcol7 = document.createElement("div");
	linkcol8 = document.createElement("div");
	linkcol9 = document.createElement("div");
	linkcol10 = document.createElement("div");

	for (var i=0; i<document.links.length; i++){
		for(var ii=0;ii<defaultSites.length;ii++){
			cursite = defaultSites[ii];
			curlink = document.links[i];
			if(curlink.href.match(cursite.l) != null){
				if(location.href.match(cursite.l) == null){
					if(curlink.getAttribute("dembedded") == 1) 
					{
						newlink = curlink.cloneNode(true);
						newlink.innerHTML = curlink.innerHTML;
						var nrank = checkrank(cursite);
						var dodoit = 0;
						if(nrank == 0 && linkcol0.innerHTML.indexOf(curlink.href) == -1) {
							linkcol0.appendChild(newlink);
							linkcol0.appendChild(document.createElement("br"));
							dodoit = 1;
						}
						else if(nrank == 0.5 && linkcol1.innerHTML.indexOf(curlink.href) == -1) {
							linkcol1.appendChild(newlink);
							linkcol1.appendChild(document.createElement("br"));
							dodoit = 1;
						}
						else if(nrank == 1 && linkcol2.innerHTML.indexOf(curlink.href) == -1) {
							linkcol2.appendChild(newlink);
							linkcol2.appendChild(document.createElement("br"));
							dodoit = 1;
						}
						else if(nrank == 1.5 && linkcol3.innerHTML.indexOf(curlink.href) == -1) {
							linkcol3.appendChild(newlink);
							linkcol3.appendChild(document.createElement("br"));
							dodoit = 1;
						}
						else if(nrank == 2 && linkcol4.innerHTML.indexOf(curlink.href) == -1) {
							linkcol4.appendChild(newlink);
							linkcol4.appendChild(document.createElement("br"));
							dodoit = 1;
						}
						else if(nrank == 2.5 && linkcol5.innerHTML.indexOf(curlink.href) == -1) {
							linkcol5.appendChild(newlink);
							linkcol5.appendChild(document.createElement("br"));
							dodoit = 1;
						}
						else if(nrank == 3 && linkcol6.innerHTML.indexOf(curlink.href) == -1) {
							linkcol6.appendChild(newlink);
							linkcol6.appendChild(document.createElement("br"));
							dodoit = 1;
						}
						else if(nrank == 3.5 && linkcol7.innerHTML.indexOf(curlink.href) == -1) {
							linkcol7.appendChild(newlink);
							linkcol7.appendChild(document.createElement("br"));
							dodoit = 1;
						}
						else if(nrank == 4 && linkcol8.innerHTML.indexOf(curlink.href) == -1) {
							linkcol8.appendChild(newlink);
							linkcol8.appendChild(document.createElement("br"));
							dodoit = 1;
						}
						else if(nrank == 4.5 && linkcol9.innerHTML.indexOf(curlink.href) == -1) {
							linkcol9.appendChild(newlink);
							linkcol9.appendChild(document.createElement("br"));
							dodoit = 1;
						}
						else if(nrank >= 5 && linkcol10.innerHTML.indexOf(curlink.href) == -1) {
							linkcol10.appendChild(newlink);
							linkcol10.appendChild(document.createElement("br"));
							dodoit = 1;
						}
						if(dodoit == 1){
							doit(cursite,newlink);
						}
					}
					break;
				}
			}
		}
	}
	var listdiv = document.createElement("div");
	listdiv.id = "listdiv";
	document.body.insertBefore(listdiv,document.body.firstChild);
	linklistup = 1;
	listdiv.appendChild(linkcol10);
	listdiv.appendChild(linkcol9);
	listdiv.appendChild(linkcol8);
	listdiv.appendChild(linkcol7);
	listdiv.appendChild(linkcol6);
	listdiv.appendChild(linkcol5);
	listdiv.appendChild(linkcol4);
	listdiv.appendChild(linkcol3);
	listdiv.appendChild(linkcol2);
	listdiv.appendChild(linkcol1);
	listdiv.appendChild(linkcol0);
	var hidelink = document.createElement("label");
	hidelink.innerHTML = '<b>Hide</b> |';
	hidelink.addEventListener('click',dohidelink,false);
	listdiv.appendChild(hidelink);
	var checklink = document.createElement("label");
	checklink.innerHTML = ' <b>Check All Links</b> |';
	checklink.addEventListener('click',checkall,false);
	listdiv.appendChild(checklink);
	var proxieslink = document.createElement("label");
	proxieslink.innerHTML = ' <b>Proxy All Links</b>';
	proxieslink.addEventListener('click',proxyall,false);
	listdiv.appendChild(proxieslink);
	proxieslink.appendChild(document.createElement("br"));
}

function fireEvent(element,event){
	if (document.createEventObject){
		var evt = document.createEventObject();
		return element.fireEvent('on'+event,evt)
	}
	else{
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent(event, true, true ); // event type,bubbling,cancelable
		return !element.dispatchEvent(evt);
	}
}

function proxyall() {
	checkit("Download via Proxy");
}

function checkall(){
	checkit("Check Link");
}

function checkit(linkname) {
	if(linklistup != 1){
		checklinks();
	}
	var el = document.getElementById('listdiv').getElementsByTagName("b");
	for(var i=0; i<el.length; i++){
		if(el[i].innerHTML == linkname){
			fireEvent(el[i].parentNode,'click');
		}
	}
}

function dohidelink(){
	document.body.removeChild(document.getElementById('listdiv'));
	linklistup = 0;
}

GM_registerMenuCommand(GM_getValue("targetScriptName", "DownloadEmbed") + " - Show Link List", checklinks);
GM_registerMenuCommand(GM_getValue("targetScriptName", "DownloadEmbed") + " - Check All Link List", checkall);
GM_registerMenuCommand(GM_getValue("targetScriptName", "DownloadEmbed") + " - Proxy All Link List", proxyall);

function doit(cursite,curlink)
{
	curlink.emb = document.createElement("iframe");
	curlink.emb.setAttribute('src',curlink.href);
	if(!cursite.width || !cursite.height){
		curlink.emb.setAttribute('width', '640');
		curlink.emb.setAttribute('height', '480');
	}
	else{
		curlink.emb.setAttribute('width', cursite.width);
		curlink.emb.setAttribute('height', cursite.height);
	}

	curlink.button = document.createElement("label");
	curlink.func = function(curlink){return function(){embed(curlink);};}(curlink)
	curlink.func2 = function(curlink){return function(){unembed(curlink);};}(curlink);
	curlink.button.addEventListener('click',curlink.func,false);
	curlink.button.innerHTML = '<img style="position:relative !important; left:0 !important; right:0 !important; bottom:0 !important; top:0 !important;float:none !important; border:0 !important;padding:0 !important;margin:0 !important;width: 12px !important; height:12px !important" src="'+gfx.plus+'"> ';

	curlink.ibutton = document.createElement("label");
	curlink.ifunc = function(curlink){return function(){info(curlink);};}(curlink)
	curlink.ifunc2 = function(curlink){return function(){uninfo(curlink);};}(curlink);
	curlink.ibutton.addEventListener('click',curlink.ifunc,false);
	curlink.ibutton.innerHTML = ' <img style="position:relative !important; left:0 !important; right:0 !important; bottom:0 !important; top:0 !important;float:none !important; border:0 !important;padding:0 !important;margin:0 !important;width: 12px !important; height:12px !important" src="'+gfx.bulb+'">';
	curlink.rank = document.createElement("label");
	curlink.rank.innerHTML = ' <b>(' + cursite.n + ' link) Rank: ' + checkrank(cursite) + '</b>';
	curlink.rank.addEventListener('click',curlink.ifunc,false);
	curlink.button2 = document.createElement("label");
	curlink.button2.innerHTML = '<br><b><i>Download Speed: ' + cursite.speed + 'kbps, Size Limits: ' + checklimits(cursite.size) + ', Supports Resume? ' + checkresume(cursite.resume) + '</i></b>';
	curlink.button2.style.visibility = 'hidden';
	curlink.button2.style.position = 'absolute';

	curlink.button3 = document.createElement("label");
	curlink.button3.innerHTML = ' <img style="position:relative !important; left:0 !important; right:0 !important; bottom:0 !important; top:0 !important;float:none !important; border:0 !important;padding:0 !important;margin:0 !important;width: 12px !important; height:12px !important" src="'+gfx.plus+'"> <b>Download via Proxy</b>';
	curlink.iifunc = function(curlink){return function(){embed2(curlink);};}(curlink);
	curlink.iifunc2 = function(curlink){return function(){unembed2(curlink);};}(curlink);
	curlink.button3.addEventListener('click',curlink.iifunc,false);

	curlink.button4 = document.createElement("label");
	curlink.button4.innerHTML = ' <img style="position:relative !important; left:0 !important; right:0 !important; bottom:0 !important; top:0 !important;float:none !important; border:0 !important;padding:0 !important;margin:0 !important;width: 12px !important; height:12px !important" src="'+gfx.check+'"> <b>Check Link</b>';
	curlink.iiifunc = function(curlink){return function(){embed3(curlink);};}(curlink);
	curlink.button4.addEventListener('click',curlink.iiifunc,false);

	curlink.parentNode.insertBefore(curlink.button,curlink);
	curlink.parentNode.insertBefore(curlink.ibutton,curlink.nextSibling);
	curlink.parentNode.insertBefore(curlink.rank,curlink.nextSibling.nextSibling);
	curlink.parentNode.insertBefore(curlink.button2,curlink.nextSibling.nextSibling.nextSibling);
	curlink.parentNode.insertBefore(curlink.button4,curlink.nextSibling.nextSibling.nextSibling.nextSibling);
	curlink.parentNode.insertBefore(curlink.button3,curlink.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling);
	curlink.cont = document.createElement("span");
	curlink.cont.appendChild(document.createElement("br"));
	curlink.cont.appendChild(curlink.emb);
	curlink.cont.appendChild(document.createElement("br"));
	curlink.cont2 = document.createElement("span");
	var proxiescount = document.createElement("div");
	proxiescount.id = 'proxiescount';
	proxiescount.style.visibility = 'hidden';
	proxiescount.style.position = 'absolute';
	proxiescount.innerHTML = '0';
	var proxieshtml = document.createElement("div");
	proxieshtml.id = 'proxieshtml';
	proxieshtml.innerHTML = '<b>Scanning for valid proxies..</b>';
	curlink.cont2.appendChild(proxiescount);
	curlink.cont2.appendChild(proxieshtml);
}

function checkrank(c){
	var rank = 0;
	if(c.resume == true) {
		rank += 1;
	}

	if(c.speed.replace('>','') > 140) {
		rank += 2.5;
	}
	else if(c.speed.replace('>','') > 50) {
		rank += 2;
	}
	else if(c.speed.replace('>','') > 40) {
		rank += 1;
	}
	else if(c.speed.replace('>','') < 20) {
		rank -= 1;
	}
	else if(c.speed.replace('>','') < 30) {
		rank -= 0.5;
	}

	if(c.size[0] > 0) {
		var incsize = 0;
		var rsize1 = Math.round(c.size[0] / 512);
		if(c.size[1] == 0)
		{
			incsize = rsize1;
		}
		else if(c.size[1] == 1)
		{
			incsize = rsize1;
		}
		else if(c.size[1] == 2)
		{
			incsize = Math.round(c.size[0] / 1024);
		}
		else if(c.size[1] == 3)
		{
			incsize = Math.round(c.size[0] / 2048);
		}
		else if(c.size[1] == 4)
		{
			incsize = Math.round(10 / c.size[0]);
		}
		if(incsize > 2){
			incsize = 2;
		}
		rank += incsize;
	}
	else {
		rank += 2;
	}

	if(rank > 5)
	{
		rank = 5;
	}
	else if(rank < 0)
	{
		rank = 0;
	}

	return rank;
}

function checkresume(r){
	if(r)
	{
		return "Yes";
	}
	else {
		return "No";
	}
}

function checklimits(s){
	if(s[0] > 0)
	{
		if(s[1] == 0)
		{
			return s[0] + 'MB per file';
		}
		else if(s[1] == 1)
		{
			return s[0] + 'MB for free accounts';
		}
		else if(s[1] == 2)
		{
			return s[0] + 'MB per hour';
		}
		else if(s[1] == 3)
		{
			return s[0] + 'MB per day';
		}
		else if(s[1] == 4)
		{
			return s[0] + ' mins cooldown period after download';
		}
	}
	else {
		return "None";
	}
}

function embed(curlink){
	if(curlink.cont.getAttribute("dvis") != 1)
	{
		curlink.parentNode.insertBefore(curlink.cont,curlink.nextSibling.nextSibling.nextSibling.nextSibling);
		curlink.cont.setAttribute("dvis",1);
	}
	else {
		curlink.cont.style.visibility = 'visible';
		curlink.cont.style.position = 'relative';
	}
	curlink.button.innerHTML = '<img style="position:relative !important; left:0 !important; right:0 !important; bottom:0 !important; top:0 !important;float:none !important; border:0 !important;padding:0 !important;margin:0 !important;width: 12px !important; height:12px !important" src="'+gfx.minus+'"> ';
	curlink.button.removeEventListener('click',curlink.func,false);
	curlink.button.addEventListener('click',curlink.func2,false);
}
function unembed(curlink){
	curlink.cont.style.visibility = 'hidden';
	curlink.cont.style.position = 'absolute';
	curlink.button.innerHTML = '<img style="position:relative !important; left:0 !important; right:0 !important; bottom:0 !important; top:0 !important;float:none !important; border:0 !important;padding:0 !important;margin:0 !important;width: 12px !important; height:12px !important" src="'+gfx.plus+'"> ';
	curlink.button.removeEventListener('click',curlink.func2,false);
	curlink.button.addEventListener('click',curlink.func,false);
}

function embed2(curlink){
	for (var i = 0; i < proxies.length; i++) {
		GM_xmlhttpRequest(
		{
			method: "GET",
			url: proxies[i] + escape(curlink.href),
			headers: {'Cache-Control': 'no-cache'},
			onload: function(xhrResponse)
			{
				var rt = xhrResponse.responseText;
				var deleted = 0;
				for (var iii = 0; iii < contexts.deleted.length; iii++) {
					if(rt.toLowerCase().indexOf(contexts.deleted[iii].toLowerCase()) != -1){
						document.getElementById('proxieshtml').innerHTML = '<b>File Deleted!!!</b>';
						deleted = 1;
						break;
					}
				}
				if(deleted != 1){
					for (var ii = 0; ii < contexts.ok.length; ii++) {
						if(rt.toLowerCase().indexOf(contexts.ok[ii].toLowerCase()) != -1){
							var newlink = document.createElement("a");
							newlink.innerHTML = xhrResponse.finalUrl;
							newlink.href = xhrResponse.finalUrl;
							newlink.target = "_blank";
							curlink.cont2.appendChild(newlink);
							curlink.cont2.appendChild(document.createElement("br"));
							var proxiescount = document.getElementById('proxiescount');
							var proxieshtml = document.getElementById('proxieshtml');
							proxiescount.innerHTML = (parseInt(proxiescount.innerHTML) + 1).toString();
							proxieshtml.innerHTML = '<b>Proxies Found:</b> ' + proxiescount.innerHTML;
							break;
						}
					}
				}
			}
		});
	}
	if(curlink.cont2.getAttribute("dvis") != 1)
	{
		curlink.parentNode.insertBefore(curlink.cont2,curlink.nextSibling.nextSibling.nextSibling.nextSibling);
		curlink.cont2.setAttribute("dvis",1);
	}
	else {
		curlink.cont2.style.visibility = 'visible';
		curlink.cont2.style.position = 'relative';
	}
	curlink.button3.innerHTML = ' <img style="position:relative !important; left:0 !important; right:0 !important; bottom:0 !important; top:0 !important;float:none !important; border:0 !important;padding:0 !important;margin:0 !important;width: 12px !important; height:12px !important" src="'+gfx.minus+'"> <b>Hide Proxy Downloader</b>';
	curlink.button3.removeEventListener('click',curlink.iifunc,false);
	curlink.button3.addEventListener('click',curlink.iifunc2,false);
}

function unembed2(curlink){
	curlink.cont2.style.visibility = 'hidden';
	curlink.cont2.style.position = 'absolute';
	curlink.button3.innerHTML = ' <img style="position:relative !important; left:0 !important; right:0 !important; bottom:0 !important; top:0 !important;float:none !important; border:0 !important;padding:0 !important;margin:0 !important;width: 12px !important; height:12px !important" src="'+gfx.plus+'"> <b>Download via Proxy</b>';
	curlink.button3.removeEventListener('click',curlink.iifunc2,false);
	curlink.button3.addEventListener('click',curlink.iifunc,false);
}

function embed3(curlink){
	curlink.button4.innerHTML = ' <img style="position:relative !important; left:0 !important; right:0 !important; bottom:0 !important; top:0 !important;float:none !important; border:0 !important;padding:0 !important;margin:0 !important;width: 12px !important; height:12px !important" src="'+gfx.wand+'"> <b>Checking Link..</b>';
	GM_xmlhttpRequest(
	{
		method: "GET",
		url: curlink.href,
		headers: {'Cache-Control': 'no-cache'},
		onload: function(xhrResponse)
		{
			var rt = xhrResponse.responseText;
			var deleted = 0;
			var valid = 0;
			for (var iii = 0; iii < contexts.deleted.length; iii++) {
				if(rt.toLowerCase().indexOf(contexts.deleted[iii].toLowerCase()) != -1){
					curlink.button4.innerHTML = ' <img style="position:relative !important; left:0 !important; right:0 !important; bottom:0 !important; top:0 !important;float:none !important; border:0 !important;padding:0 !important;margin:0 !important;width: 12px !important; height:12px !important" src="'+gfx.thumbsdown+'"> <b>File was deleted from the server.</b>';
					deleted = 1;
					break;
				}
			}
			if(deleted != 1){
				for (var ii = 0; ii < contexts.ok.length; ii++) {
					if(rt.toLowerCase().indexOf(contexts.ok[ii].toLowerCase()) != -1){
						curlink.button4.innerHTML = ' <img style="position:relative !important; left:0 !important; right:0 !important; bottom:0 !important; top:0 !important;float:none !important; border:0 !important;padding:0 !important;margin:0 !important;width: 12px !important; height:12px !important" src="'+gfx.thumbsup+'"> <b>Link is valid.</b>';
						valid = 1;
						break;
					}
				}
				if(valid != 1){
					curlink.button4.innerHTML = ' <img style="position:relative !important; left:0 !important; right:0 !important; bottom:0 !important; top:0 !important;float:none !important; border:0 !important;padding:0 !important;margin:0 !important;width: 12px !important; height:12px !important" src="'+gfx.error+'"> <b>Link is valid, but you dont have enough quota to download.</b>';
				}
			}
		}
	});
}

function info(curlink){
	curlink.button2.style.visibility = 'visible';
	curlink.button2.style.position = 'relative';
	curlink.ibutton.innerHTML = ' <img style="position:relative !important; left:0 !important; right:0 !important; bottom:0 !important; top:0 !important;float:none !important; border:0 !important;padding:0 !important;margin:0 !important;width: 12px !important; height:12px !important" src="'+gfx.close+'">';
	curlink.ibutton.removeEventListener('click',curlink.ifunc,false);
	curlink.ibutton.addEventListener('click',curlink.ifunc2,false);
	curlink.rank.removeEventListener('click',curlink.ifunc,false);
	curlink.rank.addEventListener('click',curlink.ifunc2,false);
}
function uninfo(curlink){
	curlink.button2.style.visibility = 'hidden';
	curlink.button2.style.position = 'absolute';
	curlink.ibutton.innerHTML = ' <img style="position:relative !important; left:0 !important; right:0 !important; bottom:0 !important; top:0 !important;float:none !important; border:0 !important;padding:0 !important;margin:0 !important;width: 12px !important; height:12px !important" src="'+gfx.bulb+'">';
	curlink.ibutton.removeEventListener('click',curlink.ifunc2,false);
	curlink.ibutton.addEventListener('click',curlink.ifunc,false);
	curlink.rank.removeEventListener('click',curlink.ifunc2,false);
	curlink.rank.addEventListener('click',curlink.ifunc,false);
}

checklinks2();

for(var u=0;u<autourls.length;u++){
	if (document.location.toString().match(autourls[u])) {
		checklinks();
	}
}

var version_scriptNum = 43549;
var version_timestamp = 1299004949144;

function updateCheck(forced)
{
	if ((forced) || (parseInt(GM_getValue("DownloadEmbed_lastUpdate", "0")) + 432000000 <= (new Date().getTime())))
	{
		try
		{
			GM_xmlhttpRequest(
			{
				method: "GET",
				url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),
				headers: {'Cache-Control': 'no-cache'},
				onload: function(xhrResponse)
				{
					GM_setValue("DownloadEmbed_lastUpdate", new Date().getTime() + "");
					var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, "");
					var scriptName = "DownloadEmbed";
					GM_setValue("targetScriptName", scriptName);
					if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp)
					{
						if (confirm("There is an update available for " + scriptName + ".\nWould you like to install it now?"))
							{GM_openInTab("http://userscripts.org/scripts/source/" + version_scriptNum + ".user.js");}
					}
					else if (forced)
						{alert("No update is available for " + scriptName + ".");}
				}
			});
		}
		catch (err)
		{
			if (forced)
				{alert("An error occurred while checking for updates:\n" + err);}
		}
	}
}
GM_registerMenuCommand(GM_getValue("targetScriptName", "DownloadEmbed") + " - Manual Update Check", function() {updateCheck(true);});
updateCheck(false);