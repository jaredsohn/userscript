scr_meta=<><![CDATA[
// ==UserScript==
// @name           Quake Live Better Server Browser
// @version        1.0.5
// @namespace      http://userscripts.org/scripts/show/47016
// @description    list-like server browser
// @include        http://www.quakelive.com/*
// ==/UserScript==
]]></>.toString();

var map_data = {
//  filename: [friendly name, thumbnail top offset],
	"qzca1": ["Asylum", -31],
	"qzca2": ["Trinity", -39],
	"qzctf1": ["Dueling Keeps", -50],
	"qzctf2": ["Troubled Waters", -42],
	"qzctf3": ["The Stronghold", -59],
	"qzctf4": ["Space CTF", -32],
	"qzctf5": [undefined, 0], //
	"qzctf6": ["Beyond Reality II",  -37],
	"qzctf7": ["Ironworks", -37],
	"qzctf8": ["Siberia", -32],
	"qzctf9": ["Bloodlust", -40],
	"qzctf10": ["Courtyard Conundrum", -35],
	"qzdm1": ["Arena Gate", -45],
	"qzdm2": ["House Of Pain", -60],
	"qzdm3": ["Arena Of Death", -31],
	"qzdm4": ["Place Of Many Deaths", -44],
	"qzdm5": ["Forgotten Place", -49],
	"qzdm6": ["Campgrounds Redux", -46],
	"qzdm7": ["Temple Of Retribution", -36],
	"qzdm8": ["Brimstone Abbey", -34],
	"qzdm9": ["Hero's Keep", -51],
	"qzdm10": ["Nameless Place", -15],
	"qzdm11": ["Chemical Reaction", -35],
	"qzdm12": ["Dredwerkz", -57],
	"qzdm13": ["Lost World", -42],
	"qzdm14": ["Grim Dungeons", -55],
	"qzdm15": ["Demon Keep", -40],
	"qzdm16": ["Cobalt Station", -16],
	"qzdm17": ["The Longest Yard", -31],
	"qzdm18": ["Space Chamber", -28],
	"qzdm19": ["Terminal Heights", -19],
	"qzdm20": ["Hidden Fortress", -51],
	"qzteam1": ["Base Siege", -33],
	"qzteam2": ["Fallout Bunker", 0], //
	"qzteam3": ["Inner Sanctums", -18],
	"qzteam4": ["Scornforge", -32],
	"qzteam5": [undefined, 0], //
	"qzteam6": ["Vortex Portal", -28],
	"qzteam7": ["Rebound", -8],
	"qztourney1": ["Power Station", -49],
	"qztourney2": ["Proving Grounds", -52],
	"qztourney3": ["Hell's Gate", -56],
	"qztourney4": ["Vertical Vengeance", -53],
	"qztourney5": ["Hell's Gate Redux", -44],
	"qztourney6": ["Almost Lost", -45],
	"qztourney7": ["Furious Heights", -32],
	"qztourney8": ["Temple of Pain", -19],
	"qztourney9": ["House of Decay", -41],
	"qztourney10": [undefined, -9], //
	"qztraining": ["Training", -33],
	"qzwarmup": ["The Epicenter", -5],
	"ztntourney1": ["Blood Run", -29]
};

function adjust_servertip() {
	var plm = $('#qlv_postlogin_matches');
	var offset = plm.offset().left + plm.width();
	$("#betterserverbrowser_servertip").html("#lgi_tip { left: " + offset + "px !important; }");
}

function make_pretty() {
	adjust_servertip();
	
	$("#qlv_postlogin_matches").children().each(function () {
		var large = $(".thumb", this).attr("src");
		var mapname = /levelshots\/lg\/(.+?)_v[\d\.]+jpg$/.exec(large)[1];
		$(".qlv_inner_box", this)
			.addClass(mapname)
			.append("<div class='mapfriendlyname'>" + (map_data[mapname] || [undefined, 0])[0] + "</div>")
			.append("<div class='mapfilename'>" + mapname + "</div>");
	});
}

function wait_for_mainLogo() {
    var qlv_mainLogo = document.getElementById('qlv_mainLogo');
    if (qlv_mainLogo) {
        $ = unsafeWindow.jQuery;
        
		$("head").append("<style id='betterserverbrowser_main' type='text/css'>"+
		// http://jasonlamport.com/works/stringquote/
		'#qlv_postlogin_matches {\n\tpadding-bottom: 19px !important;\n\tpadd' +
		'ing-top: 2px !important;\n}\n.best_pick, .thumb {\n\tdisplay: none !' +
		'important;\n}\n.qlv_pls_bestpick_box, .qlv_pls_box {\n\tbackground-i' +
		'mage: none !important;\n\theight: 19px !important;\n\tmargin-right: ' +
		'100% !important;\n\twidth: 0 !important;\n}\n.qlv_inner_box {\n\t-mo' +
		'z-border-radius: 3px !important;\n\tbackground-color: #777 !importan' +
		't;\n\tbackground-position: left center !important;\n\tbackground-ima' +
		'ge: none !important;\n\theight: 100% !important;\n\tleft: 0 !importa' +
		'nt;\n\ttop: 11px !important;\n\twidth: 615px !important;\n}\n.qlv_in' +
		'ner_box:hover {\n\tbackground-color: #AA7 !important;\n}\n.mapfriend' +
		'lyname, .mapfilename, .gamelabel, .players {\n\toverflow: hidden !im' +
		'portant;\n\tposition: relative !important;\n\twhite-space: nowrap !i' +
		'mportant;\n}\n.mapfriendlyname, .mapfilename {\n\tfont-family: Termi' +
		'nal, Consolas, monospace, Courier New;\n\tfont-size: small;\n\tleft:' +
		' 116px;\n\twidth: 234px;\n}\n.mapfriendlyname {\n\tcolor: #FFCACA;\n' +
		'\ttext-align: left;\n\ttop: -54px;\n}\n.mapfilename {\n\tcolor: #BDD' +
		'EFF;\n\ttext-align: right;\n\ttop: -69px;\n}\n.gameicon {\n\tleft: 3' +
		'53px !important;\n\ttop: -18px !important;\n}\n.gamelabel {\n\tleft:' +
		' 386px !important;\n\ttop: 2px !important;\n\twidth: 150px !importan' +
		't;\n}\n.players {\n\tcolor: #6FC !important;\n\tfont-weight: bold;\n' +
		'\ttext-align: left !important;\n\tleft: 538px !important;\n\ttop: -4' +
		'0px !important;\n\twidth: 65px !important;\n}\n.gamerank {\n\tleft: ' +
		'auto !important;\n\tright: -11px !important;\n\ttop: -1px !important' +
		';\n}\n.lgi_cli_col_1 { width: 110px !important; }\n.lgi_headcol_2 { ' +
		'left: 125px !important; }\n.lgi_cli_col_2 { left: 117px !important; ' +
		'}\n#lgi_cli_content { width: 172px !important; }\n#lgi_cli_fill, #lg' +
		'i_cli_top, #lgi_cli_bot { width: 188px !important; }' +
		"</style>");
		
		var mapthumb_url = $("#qlv_mainLogo img.mainLogo").attr("src").replace(/\.png$/, ".jpg").replace("sf/general/logo", "levelshots/md/%s");

		var map_css = "";
		$.each(map_data, function(k, v) {
			map_css += "." + k + " {\n" +
				"\tbackground-image: url(" + mapthumb_url.replace("%s", k) + ") !important;\n" +
				"\tbackground-position: left " + v[1] + "px !important;\n" +
				"}\n";
		});
		
		$("head").append("<style id='betterserverbrowser_maps' type='text/css'>"+map_css+"</style>");
		$("head").append("<style id='betterserverbrowser_servertip' type='text/css' />");
		
		$(window).bind("resize", adjust_servertip);
		
		var old_reload = unsafeWindow.quakelive.modules.home.ReloadServerList_Success;
		
		unsafeWindow.quakelive.modules.home.ReloadServerList_Success = function (data) {
			old_reload(data);
			make_pretty();
		}
    }
    else {
        window.setTimeout(wait_for_mainLogo, 250);
    }
}

wait_for_mainLogo();







// Another Auto Update Script  v1.1.5  http://userscripts.org/scripts/review/38017
aaus_38017={i:'47016',d:2,n:/\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],v:/\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),t:new Date().getTime()|0,ca:function(r){GM_xmlhttpRequest({method:'GET',url:'https://userscripts.org/scripts/source/'+this.i+'.meta.js',onload:function(x){aaus_38017.co(x,r)}})},co:function(x,r){this.xv=/\/\/\s*@version\s+(.*)\s*\n/i.exec(x.responseText);this.xn=/\/\/\s*@name\s+(.*)\s*\n/i.exec(x.responseText);if(this.xv&&this.xn[1]==this.n){this.xv=this.xv[1].replace(/\./g, '');this.xn=this.xn[1];}else{if(x.responseText.match('Uh-oh! The page could not be found!')||this.xn[1]!=this.n)GM_setValue('updated', 'off');return false;}if(this.xv>this.v&&confirm('A new version of the '+this.xn+' user script is available. Do you want to update?')){GM_setValue('updated',this.t);GM_openInTab('http://userscripts.org/scripts/source/'+this.i+'.user.js')}else if(this.xv&&this.xv>this.v){if(confirm('Do you want to turn off auto updating for this script?')){GM_setValue('updated','off');GM_registerMenuCommand("Auto Update "+this.n,function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca('return')});alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.')}else{GM_setValue('updated',this.t)}}else{if(r)alert('No updates available for '+this.n);GM_setValue('updated',this.t)}},ch:function(){if(GM_getValue('updated',0)==0)GM_setValue('updated',this.t);if(GM_getValue('updated',0)!='off'&&+this.t>+GM_getValue('updated',0)+86400000*this.d){this.ca()}else if(GM_getValue('updated',0)=='off'){GM_registerMenuCommand("Enable "+this.n+" updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}else{GM_registerMenuCommand("Check "+this.n+" for updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}}};if(self.location==top.location&&typeof GM_xmlhttpRequest!='undefined')aaus_38017.ch();
