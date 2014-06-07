// ==UserScript==
// @name           Intelligent 4chan Anti-Spam 
// @namespace      Harbinger
// @description    Detects and removes random or Kimmo-ish posts.  Adapted from my ATBBS spamfilters.
// @include        http://boards.4chan.org/*
// ==/UserScript==

// Maximum anti-random score.  YOU WILL NEED TO ADJUST THIS.
var ANTIRANDOM_MAX_SCORE = 20;

// Shit that shouldn't be allowed:
var BannedKeywords=[
// /b/
	"ANONTALK",
	"CHANTARD.ORG",
	"WUTCHAN",
	"4-ALL.ORG",
	"THE PAGE CANNOT BE DISPLAYED",
	"Este programa não pode exibir a página da Web",
	"Internet Explorer no pudo vincular a la página Web solicitada. Puede que la página no esté disponible temporalmente.",
	"freestarcraft2beta.blogspot.com/",
	"lockerz",
	"datchan",
// /d/	
	"her,porn",
	"her,,porn",
	"wria.net",
	"urls.vg",
	"dvdmovies.at",
	"I Can't Believe The Picture Of This Little Girl",
	"greensmoke",
	"lovez.it",
	"nook.dk", // New spam everywhere, probably PDF exploit.
// /v/
	"/scourgesflyingcastle/", // Fucking furry spammer
	"gentlemenslunchtimeassociation.blogspot.com",
];

// Keep in mind that the input will be capitalized.
var BannedRegexps={
	"Camwhores":	"ASK A(N)? (.*) ANYTHING",
	"Anontalk":	"[Aａ4@Ａ][NｎＮ][O0ｏＯ][NｎＮ][TＴｔ+][Aａ4@Ａ][LＬｌ][KＫｋ]", // Some characters make it through the UTF-8 defucker. :/
};
/**
* UTF-8 Defucker (Rewrote this for JS, PHP is more elegant :( )
*
* Takes stuff like this:
*   SＴ0ｐ ＤＤ0ｓＩng Aｔ! SＴoP Dｄ0Ｓ1ｎG ａT! SｔｏP DD0ｓｉＮ9 @ｔ! St0Ｐ dＤOsIｎ9 ＡT! sＴＯp DＤ0ｓINg ａ+! ｓTｏp DＤ0ｓ|Ｎ9 AＴ! S+ｏp DｄｏSｉnG Ａｔ! S+Oｐ ＤDＯｓIｎｇ AT! ｓ+ｏＰ DｄosｉＮＧ at!
*
*   ｂtW, ＨＥＲ3'S ｔHＥ TＲUe CＯloRs OF ＹOｕr ＧＬＯｒiＯUs ｈ3Ｒo <HrｉsｔoPｈＥr ＰＯｏL3: HＴTP://Wwｗ.@ｎｏＮt@LK.{0M/DUＭｐ/ＭｏOtAｒD.Ｔｘt
*
* Converts it into this (actual output given the above):
*   STOP DDOSING AT! STOP DDOSING AT! STOP DDOSING AT! STOP DDOSING AT! STOP DDOSING AT! STOP DDOSING AT! STOP DDOSING AT! STOP DDOSING AT! STOP DDOSING AT!
*
*   BTW, HERE'S THE TRUE COLORS OF YOUR GLORIOUS HERO CHRISTOPHER POOLE: HTTP://WWW.ANONTALK.COM/DUMP/MOOTARD.TXT
*
* Public domain, I don't give a fuck about what you do with this.
*/

//AnｏnｔALｋ
var IHateJavascript={
	"A":"ａ4@Ａ",
	"B":"ｂ",
	"C":"<{[Ｃ",
	"D":"Ｄｄ",
	"E":"Ｅ3Ｅ", 
	"F":"",
	"G":"9ｇＧ",
	"H":"Ｈｈ",
	"I":"Ｉ1ｉ",
	"J":"",
	"K":"Ｋｋ",
	"L":"Ｌｌ",
	"M":"ＭＭ",
	"N":"ｎＮ",
	"O":"0ｏＯ",
	"P":"ｐＰ",
	"Q":"",
	"R":"Ｒｒ",
	"S":"ｓＳ5",
	"T":"Ｔｔ+",
	"U":"",
	"V":"",
	"W":"ｗＷ",
	"X":"ｘ",
	"Y":"",
	"Z":"",
	"":'‬'
};

function deFuckUTF8(input)
{
	var output=input.replace('‬','');
	for(var i = 0;i < input.length;i++)
	{
		for(ui in IHateJavascript)
		{
			for(var j =0;j<IHateJavascript[ui].length;j++)
			{	
				output=output.replace(IHateJavascript[ui].substr(j,1),ui);
			}
		}
	}
	return output.toUpperCase();
}

function removePost(node,msg)
{
	if(node.parentNode!=null)
		node.parentNode.innerHTML="<b>Content removed by Intelligent Anti-Spam</b><p style=\"margin-left:1em\"><b>Reason:</b> "+msg+"</p>";
	else
		node.innerHTML="<b>Content removed by Intelligent Anti-Spam</b><p style=\"margin-left:1em\"><b>Reason:</b> "+msg+"</p>";
}

/**
* ANTI-RANDOM (Thank you UnrealIRCd)
*
* Checks for character combos that are almost impossible to find in legitimate conversation.
*/
var ANTIRANDOM={
	"aj":"fqtvxz",
	"aq":"deghjkmnprtxyz",
	"av":"bfhjqwxz",
	"az":"jwx",
	"bd":"bghjkmpqvxz",
	"bf":"bcfgjknpqvwxyz",
	"bg":"bdfghjkmnqstvxz",
	"bh":"bfhjkmnqvwxz",
	"bj":"bcdfghjklmpqtvwxyz",
	"bk":"dfjkmqrvwxyz",
	"bl":"bgpqwxz",
	"bm":"bcdflmnqz",
	"bn":"bghjlmnpqtvwx",
	"bp":"bfgjknqvxz",
	"bq":"bcdefghijklmnopqrstvwxyz",
	"bt":"dgjkpqtxz",
	"bv":"bfghjklnpqsuvwxz",
	"bw":"bdfjknpqsuwxyz",
	"bx":"abcdfghijklmnopqtuvwxyz",
	"bz":"bcdfgjklmnpqrstvwxz",
	"cb":"bfghjkpqyz",
	"cc":"gjqxz",
	"cd":"hjkqvwxz",
	"cf":"gjknqvwyz",
	"cg":"bdfgjkpqvz",
	"cl":"fghjmpqxz",
	"cm":"bjkqv",
	"cn":"bghjkpqwxz",
	"cp":"gjkvxyz",
	"cq":"abcdefghijklmnopqsvwxyz",
	"cr":"gjqx",
	"cs":"gjxz",
	"cv":"bdfghjklmnquvwxyz",
	"cx":"abdefghjklmnpqrstuvwxyz",
	"cy":"jqy",
	"cz":"bcdfghjlpqrtvwxz",
	"db":"bdgjnpqtxz",
	"dc":"gjqxz",
	"dd":"gqz",
	"df":"bghjknpqvxyz",
	"dg":"bfgjqvxz",
	"dh":"bfkmnqwxz",
	"dj":"bdfghjklnpqrwxz",
	"dk":"cdhjkpqrtuvwxz",
	"dl":"bfhjknqwxz",
	"dm":"bfjnqw",
	"dn":"fgjkmnpqvwz",
	"dp":"bgjkqvxz",
	"dq":"abcefghijkmnopqtvwxyz",
	"dr":"bfkqtvx",
	"dt":"qtxz",
	"dv":"bfghjknqruvwyz",
	"dw":"cdfjkmnpqsvwxz",
	"dx":"abcdeghjklmnopqrsuvwxyz",
	"dy":"jyz",
	"dz":"bcdfgjlnpqrstvxz",
	"eb":"jqx",
	"eg":"cjvxz",
	"eh":"hxz",
	"ej":"fghjpqtwxyz",
	"ek":"jqxz",
	"ep":"jvx",
	"eq":"bcghijkmotvxyz",
	"ev":"bfpq",
	"fc":"bdjkmnqvxz",
	"fd":"bgjklqsvyz",
	"fg":"fgjkmpqtvwxyz",
	"fh":"bcfghjkpqvwxz",
	"fj":"bcdfghijklmnpqrstvwxyz",
	"fk":"bcdfghjkmpqrstvwxz",
	"fl":"fjkpqxz",
	"fm":"dfhjlmvwxyz",
	"fn":"bdfghjklnqrstvwxz",
	"fp":"bfjknqtvwxz",
	"fq":"abcefghijklmnopqrstvwxyz",
	"fr":"nqxz",
	"fs":"gjxz",
	"ft":"jqx",
	"fv":"bcdfhjklmnpqtuvwxyz",
	"fw":"bcfgjklmpqstuvwxyz",
	"fx":"bcdfghjklmnpqrstvwxyz",
	"fy":"ghjpquvxy",
	"fz":"abcdfghjklmnpqrtuvwxyz",
	"gb":"bcdknpqvwx",
	"gc":"gjknpqwxz",
	"gd":"cdfghjklmqtvwxz",
	"gf":"bfghjkmnpqsvwxyz",
	"gg":"jkqvxz",
	"gj":"bcdfghjklmnpqrstvwxyz",
	"gk":"bcdfgjkmpqtvwxyz",
	"gl":"fgjklnpqwxz",
	"gm":"dfjkmnqvxz",
	"gn":"jkqvxz",
	"gp":"bjknpqtwxyz",
	"gq":"abcdefghjklmnopqrsvwxyz",
	"gr":"jkqt",
	"gt":"fjknqvx",
	"gu":"qwx",
	"gv":"bcdfghjklmpqstvwxyz",
	"gw":"bcdfgjknpqtvwxz",
	"gx":"abcdefghjklmnopqrstvwxyz",
	"gy":"jkqxy",
	"gz":"bcdfgjklmnopqrstvxyz",
	"hb":"bcdfghjkqstvwxz",
	"hc":"cjknqvwxz",
	"hd":"fgjnpvz",
	"hf":"bfghjkmnpqtvwxyz",
	"hg":"bcdfgjknpqsxyz",
	"hh":"bcgklmpqrtvwxz",
	"hj":"bcdfgjkmpqtvwxyz",
	"hk":"bcdgkmpqrstvwxz",
	"hl":"jxz",
	"hm":"dhjqrvwxz",
	"hn":"jrxz",
	"hp":"bjkmqvwxyz",
	"hq":"abcdefghijklmnopqrstvwyz",
	"hr":"cjqx",
	"hs":"jqxz",
	"hv":"bcdfgjklmnpqstuvwxz",
	"hw":"bcfgjklnpqsvwxz",
	"hx":"abcdefghijklmnopqrstuvwxyz",
	"hz":"bcdfghjklmnpqrstuvwxz",
	"ib":"jqx",
	"if":"jqvwz",
	"ih":"bgjqx",
	"ii":"bjqxy",
	"ij":"cfgqxy",
	"ik":"bcfqx",
	"iq":"cdefgjkmnopqtvxyz",
	"iu":"hiwxy",
	"iv":"cfgmqx",
	"iw":"dgjkmnpqtvxz",
	"ix":"jkqrxz",
	"iy":"bcdfghjklpqtvwx",
	"jb":"bcdghjklmnopqrtuvwxyz",
	"jc":"cfgjkmnopqvwxy",
	"jd":"cdfghjlmnpqrtvwx",
	"jf":"abcdfghjlnopqrtuvwxyz",
	"jg":"bcdfghijklmnopqstuvwxyz",
	"jh":"bcdfghjklmnpqrxyz",
	"jj":"bcdfghjklmnopqrstuvwxyz",
	"jk":"bcdfghjknqrtwxyz",
	"jl":"bcfghjmnpqrstuvwxyz",
	"jm":"bcdfghiklmnqrtuvwyz",
	"jn":"bcfjlmnpqsuvwxz",
	"jp":"bcdfhijkmpqstvwxyz",
	"jq":"abcdefghijklmnopqrstuvwxyz",
	"jr":"bdfhjklpqrstuvwxyz",
	"js":"bfgjmoqvxyz",
	"jt":"bcdfghjlnpqrtvwxz",
	"jv":"abcdfghijklpqrstvwxyz",
	"jw":"bcdefghijklmpqrstuwxyz",
	"jx":"abcdefghijklmnopqrstuvwxyz",
	"jy":"bcdefghjkpqtuvwxyz",
	"jz":"bcdfghijklmnopqrstuvwxyz",
	"kb":"bcdfghjkmqvwxz",
	"kc":"cdfgjknpqtwxz",
	"kd":"bfghjklmnpqsvwxyz",
	"kf":"bdfghjkmnpqsvwxyz",
	"kg":"cghjkmnqtvwxyz",
	"kh":"cfghjkqx",
	"kj":"bcdfghjkmnpqrstwxyz",
	"kk":"bcdfgjmpqswxz",
	"kl":"cfghlmqstwxz",
	"km":"bdfghjknqrstwxyz",
	"kn":"bcdfhjklmnqsvwxz",
	"kp":"bdfgjkmpqvxyz",
	"kq":"abdefghijklmnopqrstvwxyz",
	"kr":"bcdfghjmqrvwx",
	"ks":"jqx",
	"kt":"cdfjklqvx",
	"ku":"qux",
	"kv":"bcfghjklnpqrstvxyz",
	"kw":"bcdfgjklmnpqsvwxz",
	"kx":"abcdefghjklmnopqrstuvwxyz",
	"ky":"vxy",
	"kz":"bcdefghjklmnpqrstuvwxyz",
	"lb":"cdgkqtvxz",
	"lc":"bqx",
	"lg":"cdfgpqvxz",
	"lh":"cfghkmnpqrtvx",
	"lk":"qxz",
	"ln":"cfjqxz",
	"lp":"jkqxz",
	"lq":"bcdefhijklmopqrstvwxyz",
	"lr":"dfgjklmpqrtvwx",
	"lv":"bcfhjklmpwxz",
	"lw":"bcdfgjknqxz",
	"lx":"bcdfghjklmnpqrtuwz",
	"lz":"cdjptvxz",
	"mb":"qxz",
	"md":"hjkpvz",
	"mf":"fkpqvwxz",
	"mg":"cfgjnpqsvwxz",
	"mh":"bchjkmnqvx",
	"mj":"bcdfghjknpqrstvwxyz",
	"mk":"bcfgklmnpqrvwxz",
	"ml":"jkqz",
	"mm":"qvz",
	"mn":"fhjkqxz",
	"mq":"bdefhjklmnopqtwxyz",
	"mr":"jklqvwz",
	"mt":"jkq",
	"mv":"bcfghjklmnqtvwxz",
	"mw":"bcdfgjklnpqsuvwxyz",
	"mx":"abcefghijklmnopqrstvwxyz",
	"mz":"bcdfghjkmnpqrstvwxz",
	"nb":"hkmnqxz",
	"nf":"bghqvxz",
	"nh":"fhjkmqtvxz",
	"nk":"qxz",
	"nl":"bghjknqvwxz",
	"nm":"dfghjkqtvwxz",
	"np":"bdjmqwxz",
	"nq":"abcdfghjklmnopqrtvwxyz",
	"nr":"bfjkqstvx",
	"nv":"bcdfgjkmnqswxz",
	"nw":"dgjpqvxz",
	"nx":"abfghjknopuyz",
	"nz":"cfqrxz",
	"oc":"fjvw",
	"og":"qxz",
	"oh":"fqxz",
	"oj":"bfhjmqrswxyz",
	"ok":"qxz",
	"oq":"bcdefghijklmnopqrstvwxyz",
	"ov":"bfhjqwx",
	"oy":"qxy",
	"oz":"fjpqtvx",
	"pb":"fghjknpqvwz",
	"pc":"gjq",
	"pd":"bgjkvwxz",
	"pf":"hjkmqtvwyz",
	"pg":"bdfghjkmqsvwxyz",
	"ph":"kqvx",
	"pk":"bcdfhjklmpqrvx",
	"pl":"ghkqvwx",
	"pm":"bfhjlmnqvwyz",
	"pn":"fjklmnqrtvwz",
	"pp":"gqwxz",
	"pq":"abcdefghijklmnopqstvwxyz",
	"pr":"hjkqrwx",
	"pt":"jqxz",
	"pv":"bdfghjklquvwxyz",
	"pw":"fjkmnpqsuvwxz",
	"px":"abcdefghijklmnopqrstuvwxyz",
	"pz":"bdefghjklmnpqrstuvwxyz",
	"qa":"ceghkopqxy",
	"qb":"bcdfghjklmnqrstuvwxyz",
	"qc":"abcdfghijklmnopqrstuvwxyz",
	"qd":"defghijklmpqrstuvwxyz",
	"qe":"abceghjkmopquwxyz",
	"qf":"abdfghijklmnopqrstuvwxyz",
	"qg":"abcdefghijklmnopqrtuvwxz",
	"qh":"abcdefghijklmnopqrstuvwxyz",
	"qi":"efgijkmpwx",
	"qj":"abcdefghijklmnopqrstuvwxyz",
	"qk":"abcdfghijklmnopqrsuvwxyz",
	"ql":"abcefghjklmnopqrtuvwxyz",
	"qm":"bdehijklmnoqrtuvxyz",
	"qn":"bcdefghijklmnoqrtuvwxyz",
	"qo":"abcdefgijkloqstuvwxyz",
	"qp":"abcdefghijkmnopqrsuvwxyz",
	"qq":"bcdefghijklmnopstwxyz",
	"qr":"bdefghijklmnoqruvwxyz",
	"qs":"bcdefgijknqruvwxz",
	"qt":"befghjklmnpqtuvwxz",
	"qu":"cfgjkpwz",
	"qv":"abdefghjklmnopqrtuvwxyz",
	"qw":"bcdfghijkmnopqrstuvwxyz",
	"qx":"abcdefghijklmnopqrstuvwxyz",
	"qy":"abcdefghjklmnopqrstuvwxyz",
	"qz":"abcdefghijklmnopqrstuvwxyz",
	"rb":"fxz",
	"rg":"jvxz",
	"rh":"hjkqrxz",
	"rj":"bdfghjklmpqrstvwxz",
	"rk":"qxz",
	"rl":"jnq",
	"rp":"jxz",
	"rq":"bcdefghijklmnopqrtvwxy",
	"rr":"jpqxz",
	"rv":"bcdfghjmpqrvwxz",
	"rw":"bfgjklqsvxz",
	"rx":"bcdfgjkmnopqrtuvwxz",
	"rz":"djpqvxz",
	"sb":"kpqtvxz",
	"sd":"jqxz",
	"sf":"bghjkpqw",
	"sg":"cgjkqvwxz",
	"sj":"bfghjkmnpqrstvwxz",
	"sk":"qxz",
	"sl":"gjkqwxz",
	"sm":"fkqwxz",
	"sn":"dhjknqvwxz",
	"sq":"bfghjkmopstvwxz",
	"sr":"jklqrwxz",
	"sv":"bfhjklmnqtwxyz",
	"sw":"jkpqvwxz",
	"sx":"bcdefghjklmnopqrtuvwxyz",
	"sy":"qxy",
	"sz":"bdfgjpqsvxz",
	"tb":"cghjkmnpqtvwx",
	"tc":"jnqvx",
	"td":"bfgjkpqtvxz",
	"tf":"ghjkqvwyz",
	"tg":"bdfghjkmpqsx",
	"tj":"bdfhjklmnpqstvwxyz",
	"tk":"bcdfghjklmpqvwxz",
	"tl":"jkqwxz",
	"tm":"bknqtwxz",
	"tn":"fhjkmqvwxz",
	"tp":"bjpqvwxz",
	"tq":"abdefhijklmnopqrstvwxyz",
	"tr":"gjqvx",
	"tv":"bcfghjknpquvwxz",
	"tw":"bcdfjknqvz",
	"tx":"bcdefghjklmnopqrsuvwxz",
	"tz":"jqxz",
	"uc":"fjmvx",
	"uf":"jpqvx",
	"ug":"qvx",
	"uh":"bcgjkpvxz",
	"uj":"wbfghklmqvwx",
	"uk":"fgqxz",
	"uq":"bcdfghijklmnopqrtwxyz",
	"uu":"fijkqvwyz",
	"uv":"bcdfghjkmpqtwxz",
	"uw":"dgjnquvxyz",
	"ux":"jqxz",
	"uy":"jqxyz",
	"uz":"fgkpqrx",
	"vb":"bcdfhijklmpqrtuvxyz",
	"vc":"bgjklnpqtvwxyz",
	"vd":"bdghjklnqvwxyz",
	"vf":"bfghijklmnpqtuvxz",
	"vg":"bcdgjkmnpqtuvwxyz",
	"vh":"bcghijklmnpqrtuvwxyz",
	"vj":"abcdfghijklmnpqrstuvwxyz",
	"vk":"bcdefgjklmnpqruvwxyz",
	"vl":"hjkmpqrvwxz",
	"vm":"bfghjknpquvxyz",
	"vn":"bdhjkmnpqrtuvwxz",
	"vp":"bcdeghjkmopqtuvwyz",
	"vq":"abcdefghijklmnopqrstvwxyz",
	"vr":"fghjknqrtvwxz",
	"vs":"dfgjmqz",
	"vt":"bdfgjklmnqtx",
	"vu":"afhjquwxy",
	"vv":"cdfghjkmnpqrtuwxz",
	"vw":"abcdefghijklmnopqrtuvwxyz",
	"vx":"abcefghjklmnopqrstuvxyz",
	"vy":"oqx",
	"vz":"abcdefgjklmpqrstvwxyz",
	"wb":"bdfghjpqtvxz",
	"wc":"bdfgjkmnqvwx",
	"wd":"dfjpqvxz",
	"wf":"cdghjkmqvwxyz",
	"wg":"bcdfgjknpqtvwxyz",
	"wh":"cdghjklpqvwxz",
	"wj":"bfghijklmnpqrstvwxyz",
	"wk":"cdfgjkpqtuvxz",
	"wl":"jqvxz",
	"wm":"dghjlnqtvwxz",
	"wp":"dfgjkpqtvwxz",
	"wq":"abcdefghijklmnopqrstvwxyz",
	"wr":"cfghjlmpqwx",
	"wt":"bdgjlmnpqtvx",
	"wu":"aikoquvwy",
	"wv":"bcdfghjklmnpqrtuvwxyz",
	"ww":"bcdgkpqstuvxyz",
	"wx":"abcdefghijklmnopqrstuvwxz",
	"wy":"jquwxy",
	"wz":"bcdfghjkmnopqrstuvwxz",
	"xa":"ajoqy",
	"xb":"bcdfghjkmnpqsvwxz",
	"xc":"bcdgjkmnqsvwxz",
	"xd":"bcdfghjklnpqstuvwxyz",
	"xf":"bcdfghjkmnpqtvwxyz",
	"xg":"bcdfghjkmnpqstvwxyz",
	"xh":"cdfghjkmnpqrstvwxz",
	"xi":"jkqy",
	"xj":"abcdefghijklmnopqrstvwxyz",
	"xk":"abcdfghjkmnopqrstuvwxyz",
	"xl":"bcdfghjklmnpqrvwxz",
	"xm":"bcdfghjknpqvwxz",
	"xn":"bcdfghjklmnpqrvwxyz",
	"xp":"bcfjknpqvxz",
	"xq":"abcdefghijklmnopqrstvwxyz",
	"xr":"bcdfghjklnpqrsvwyz",
	"xs":"bdfgjmnqrsvxz",
	"xt":"jkpqvwxz",
	"xu":"fhjkquwx",
	"xv":"bcdefghjklmnpqrsuvwxyz",
	"xw":"bcdfghjklmnpqrtuvwxyz",
	"xx":"bcdefghjkmnpqrstuwyz",
	"xy":"jxy",
	"xz":"abcdefghjklmnpqrstuvwxyz",
	"yb":"cfghjmpqtvwxz",
	"yc":"bdfgjmpqsvwx",
	"yd":"chjkpqvwx",
	"yf":"bcdghjmnpqsvwx",
	"yg":"cfjkpqtxz",
	"yh":"bcdfghjkpqx",
	"yi":"hjqwxy",
	"yj":"bcdfghjklmnpqrstvwxyz",
	"yk":"bcdfgpqvwxz",
	"ym":"dfgjqvxz",
	"yp":"bcdfgjkmqxz",
	"yq":"abcdefghijklmnopqrstvwxyz",
	"yr":"jqx",
	"yt":"bcfgjnpqx",
	"yv":"bcdfghjlmnpqstvwxz",
	"yw":"bfgjklmnpqstuvwxz",
	"yx":"bcdfghjknpqrstuvwxz",
	"yy":"bcdfghjklpqrstvwxz",
	"yz":"bcdfjklmnpqtvwx",
	"zb":"dfgjklmnpqstvwxz",
	"zc":"bcdfgjmnpqstvwxy",
	"zd":"bcdfghjklmnpqstvwxy",
	"zf":"bcdfghijkmnopqrstvwxyz",
	"zg":"bcdfgjkmnpqtvwxyz",
	"zh":"bcfghjlpqstvwxz",
	"zj":"abcdfghjklmnpqrstuvwxyz",
	"zk":"bcdfghjklmpqstvwxz",
	"zl":"bcdfghjlnpqrstvwxz",
	"zm":"bdfghjklmpqstvwxyz",
	"zn":"bcdfghjlmnpqrstuvwxz",
	"zp":"bcdfhjklmnpqstvwxz",
	"zq":"abcdefghijklmnopqrstvwxyz",
	"zr":"bcfghjklmnpqrstvwxyz",
	"zs":"bdfgjlmnqrsuwxyz",
	"zt":"bcdfgjkmnpqtuvwxz",
	"zu":"ajqx",
	"zv":"bcdfghjklmnpqrstuvwxyz",
	"zw":"bcdfghjklmnpqrstuvwxyz",
	"zx":"abcdefghijklmnopqrstuvwxyz",
	"zy":"fxy",
	"zz":"cdfhjnpqrvx"
};
function getAntiRandomScore(input)
{
	input = input.toLowerCase();
	var score=0;
	for(first in ANTIRANDOM)
	{
		var followchars=ANTIRANDOM[first];
		for(var i=0;i<followchars.length;i++)
		{
			var fc=followchars.substr(0,1);
			if(input.indexOf(first+fc)!=-1)
			{
				score++;
			}
		}
	}
	return score;
}


//define
function $(selector, root) {
  if (!root) root = document.body;
  return root.querySelector(selector);
}

function $$(selector, root) {
  if (!root) root = document.body;
  var result = root.querySelectorAll(selector);
  var a = [];
  for (var i = 0, l = result.length; i < l; i++)
    a.push(result[i]);
  return a;
}

function x(xpath, root) {
  if (!root) root = document.body;
  return document.evaluate(xpath, root, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}

function X(xpath, root) {
  if (!root) root = document.body;
  var result = document.evaluate(xpath, root, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  var a = [], item;
  while (item = result.iterateNext())
    a.push(item);
  return a;
}

var nblocked=0;

function ScanTags(tag)
{
	var nodes = $$(tag); // From 4chan filter

	for(var i = 0;i < nodes.length;i++)
	{
		var inp=deFuckUTF8(nodes[i].innerHTML);
		var score=getAntiRandomScore(inp);
		if(score>ANTIRANDOM_MAX_SCORE)
		{
			removePost(nodes[i],"Randomness Score was "+score+"!");
		} else {
			if(score>0)
				nodes[i].innerHTML+="<p style=\"color:steelblue;\"><b>Randomness Score:</b> "+score+" </p>";
		}
		for(var j=0;j<BannedKeywords.length;j++)
		{
			//nodes[i].innerHTML+=(inp+" "+BannedKeywords[j]);
			if(inp.toLowerCase().indexOf(BannedKeywords[j].toLowerCase())>-1)
				removePost(nodes[i],"contains "+BannedKeywords[j].toLowerCase()+"!");
		}
		for(j in BannedRegexps.length)
		{
			var re = new RegExp(BannedRegexps[j]);
			if (inp.match(re)) {
				removePost(nodes[i],"Matches the "+j+" regex!");
			}
		}
	}
}

ScanTags("blockquote");
