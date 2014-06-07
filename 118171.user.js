// ==UserScript==
// @name           The West: Night World
// @namespace      the night west
// @description    City and map the dark
// @include        http://*.the-west.*
// @include        http://*.beta.the-west.*
// @include        http://zz1w1.tw.innogames.net/game.php*
// @exclude        http://www.the-west.*
// @exclude        http://forum.the-west.*     
// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {return;}
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.town_background_night { width:645px; height:375px; top:0; position:relative; background:url(http://s017.radikal.ru/i419/1111/2e/bf6ef52f4950.png); }');

if (window.N_W == undefined){
    N_W = new Object();
};

N_W.init = function(){
    var hr = get_server_date_string(true).split(':')[0];
    if ((hr < 6)||(hr > 17)){
	N_W.setJSHTML = AjaxWindow.setJSHTML;
	AjaxWindow.setJSHTML = function(div,content) {
	    N_W.setJSHTML(div,content);
 	    if (div&&(div.id.indexOf('window_town')!=-1)){
		var dv = div.getElementsByClassName('town_background')[0];
		if (dv){
		    dv.setAttribute('class','town_background_night');
		}
		var imgs = div.getElementsByTagName('img');
		for (ii = 0 ; ii < imgs.length; ++ii){
		    //ss += imgs[ii].src+'\t';
		    if (imgs[ii].src.indexOf('bank3')!=-1){
			imgs[ii].src = 'http://s017.radikal.ru/i412/1111/64/a8c3f2df3398.png';
		    }
		    else if (imgs[ii].src.indexOf('bank2')!=-1){
			imgs[ii].src = 'http://s017.radikal.ru/i438/1111/8d/10dfab7ddba7.png';
		    }
		    else if (imgs[ii].src.indexOf('bank1')!=-1){
			imgs[ii].src = 'http://s017.radikal.ru/i403/1111/c9/ecf0abbff899.png';
		    }
		    else if (imgs[ii].src.indexOf('hotel3')!=-1){
			imgs[ii].src = 'http://s017.radikal.ru/i424/1111/ca/a5b304ac5906.png';
		    }
		    else if (imgs[ii].src.indexOf('hotel2')!=-1){
			imgs[ii].src = 'http://s017.radikal.ru/i430/1111/25/c895827b59ff.png';
		    }
		    else if (imgs[ii].src.indexOf('hotel1')!=-1){
			imgs[ii].src = 'http://s017.radikal.ru/i410/1111/e7/aba41378092b.png';
		    }
		    else if (imgs[ii].src.indexOf('cityhall3')!=-1){
			imgs[ii].src = 'http://s017.radikal.ru/i404/1111/d9/b7f78f0eec65.png';
		    }
		    else if (imgs[ii].src.indexOf('cityhall2')!=-1){
			imgs[ii].src = 'http://s017.radikal.ru/i407/1111/ed/773f62dbc6d1.png';
		    }
		    else if (imgs[ii].src.indexOf('general3')!=-1){
			imgs[ii].src = 'http://s017.radikal.ru/i425/1111/da/625821490dcc.png';
		    }
		    else if (imgs[ii].src.indexOf('general2')!=-1){
			imgs[ii].src = 'http://s017.radikal.ru/i430/1111/f8/13b0cc0fdaf5.png';
		    }
		    else if (imgs[ii].src.indexOf('general1')!=-1){
			imgs[ii].src = 'http://s017.radikal.ru/i428/1111/1d/8e5df659c3ee.png';
		    }
		    else if (imgs[ii].src.indexOf('gunsmith3')!=-1){
			imgs[ii].src = 'http://s017.radikal.ru/i423/1111/29/1afce43203a2.png';
		    }
		    else if (imgs[ii].src.indexOf('gunsmith2')!=-1){
			imgs[ii].src = 'http://s017.radikal.ru/i436/1111/56/0fe2a10c5fe6.png';
		    }
		    else if (imgs[ii].src.indexOf('gunsmith1')!=-1){
			imgs[ii].src = 'http://s017.radikal.ru/i412/1111/07/debef15630ef.png';
		    }
		    else if (imgs[ii].src.indexOf('market1')!=-1){
			imgs[ii].src = 'http://s017.radikal.ru/i400/1111/62/bd9be92d846c.png';
		    }
		    else if (imgs[ii].src.indexOf('mortician1')!=-1){
			imgs[ii].src = 'http://s017.radikal.ru/i442/1111/ef/ccd226bbdcb3.png';
		    }
		    else if (imgs[ii].src.indexOf('sheriff3')!=-1){
			imgs[ii].src = 'http://s017.radikal.ru/i444/1111/1d/1a71dbe6c057.png';
		    }
		    else if (imgs[ii].src.indexOf('sheriff2')!=-1){
			imgs[ii].src = 'http://s017.radikal.ru/i423/1111/78/aee21180e30f.png';
		    }
		    else if (imgs[ii].src.indexOf('sheriff1')!=-1){
			imgs[ii].src = 'http://s017.radikal.ru/i421/1111/e9/8e56c8936876.png';
		    }
		    else if (imgs[ii].src.indexOf('tailor3')!=-1){
			imgs[ii].src = 'http://s017.radikal.ru/i402/1111/07/4394397a2f55.png';
		    }
		    else if (imgs[ii].src.indexOf('tailor2')!=-1){
			imgs[ii].src = 'http://s017.radikal.ru/i404/1111/99/58d99d4d8a8d.png';
		    }
		    else if (imgs[ii].src.indexOf('tailor1')!=-1){
			imgs[ii].src = 'http://s017.radikal.ru/i433/1111/45/99b4683d4dd3.png';
		    }
		    else if (imgs[ii].src.indexOf('tenement3')!=-1){
			imgs[ii].src = 'http://s017.radikal.ru/i437/1111/34/f80609c0a196.png';
		    }
		    else if (imgs[ii].src.indexOf('tenement2')!=-1){
			imgs[ii].src = 'http://s017.radikal.ru/i435/1111/e6/38b85e601f8b.png';
		    }
		}
	    }
	}
    }
};


/*
	    if (div&&(div.getAttribute('class')=='town_background')){
	        div.setAttribute('class','town_background_night');
	    }
 	    if (div&&(div.id.indexOf('window_town')!=-1)){
		dv = div.getElementsByClassName('town_background')[0];
		if (dv){
		    dv.setAttribute('class','town_background_night');
		}
	    }

*/


var N_Wfuns = ['init'];


var night_code='';
var n_w_body, n_w_script, n_w_style, n_w_head; 
n_w_body = document.getElementsByTagName('body')[0];
n_w_script = document.createElement('script');
n_w_script.type = 'text/javascript';


night_code += 'if (window.N_W == undefined){ window.N_W = new Object();';

for (var i = 0; i < N_Wfuns.length; ++i){
    var N_Wfun = '	N_W.'+N_Wfuns[i];
    night_code += N_Wfun + ' = ' + eval(N_Wfun.toString()) + '\n';
};

night_code += '}	N_W.init();\n';
//night_code += "}; window.addEventListener('load', N_W.init, false);\n";
n_w_script.innerHTML = night_code;
n_w_body.appendChild(n_w_script);

