// ==UserScript==
// @name	Instapaper Article Tools
// @version	2.11
// @description Adds a floating palette of buttons to articles which allows you to go back, archive and return to read later, star an article, delete an article, 
// @description change an articles font properties, page up, page down, or toggle auto-scroll. 
// @include     http://www.instapaper.com/text?u=*
// @copyright 	2010+, ElasticThreads (http://elasticthreads.tumblr.com/)
// @license	(CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==
	var hist = document.referrer,
	ecDiv = document.getElementById('editing_controls'),
	ecIH = ecDiv.innerHTML,
	aPos = ecIH.indexOf('/skip/'),
	aPos = aPos + 6,
	bPos = ecIH.indexOf('">Archive'),
	artID = ecIH.substring(aPos,bPos);
	var	skipStr = 'http://www.instapaper.com/skip/' + artID,
		starStr = 'http://www.instapaper.com/star_toggle/' + artID,
		fontTog = "\"document.getElementById('font-tog').style.display = 'none'; document.getElementById('text_controlz').style.display = 'block'; return false;\"",
		fontOff = "\"document.getElementById('font-tog').style.display = 'block'; document.getElementById('text_controlz').style.display = 'none'; return false;\"",
		delStr = 'http://www.instapaper.com/delete/' + artID;
		if (hist.indexOf('http')==-1){
			hist = 'http://www.instapaper.com/u';
		}
		var archtools = document.createElement("div");
		archtools.id = "readTbarr";
		archtools.innerHTML = "\
		<div id='tbarr-butts'><a href=" + hist + " title='go back' id='return-now'> &#8592;</a>\
		<a href=" + skipStr + " title='archive and return to read later' id='archive-return'>&#8599;</a>\
			<a href=" + starStr + " title='star this article' id='star-this'>&#9734;</a>\
			<a href=" + starStr + " title='unstar this article' id='stard'>&#9733;</a>\
			<a href=" + delStr + " title='delete this article and return to read later' id='del-this'>&#8709;</a>\
			<a href='#' onclick=" + fontTog + " onmouseover=" + fontTog + " title='Toggle Font Controls' id='font-tog'>\
			 <span style='font-size: 9px; letter-spacing: -3px;'>A</span>\
			 <span style='font-size: 16px;'>A</span></a>\
			<div id='text_controlz' onmouseout=" + fontOff + " onmouseover=" + fontTog + ">\
			<a href='#' onclick=" + fontOff + "><span style='font-size: 14px;'>Hide</span></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
				<a href='#' onclick='_fontSize--; saveFont(); return false;'>–</a>\
				<span style='font-size: 9px;letter-spacing: 3px;'>A</span><span style='font-size: 16px;'>A</span>\
				<a href='#' onclick='_fontSize++; saveFont(); return false;'>+</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
				<a href='#' onclick='_lineHeight -= 0.1; saveFont(); return false;' style='border-top: 1px solid #555; border-bottom: 1px solid #555; font-size: 1px; padding: 0 5px; vertical-align: 4px;'>&nbsp;</a>&nbsp;&nbsp;\
				<a href='#' onclick='_lineHeight += 0.1; saveFont(); return false;' style='border-top: 1px solid #555; border-bottom: 1px solid #555; font-size: 4px; padding: 0 5px; vertical-align: 4px;'>&nbsp;</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
				<a href='#' onclick=\"_fontFamily = 'G'; saveFont(); return false;\" style='font-family: Georgia, serif !important;'>G</a>\
				<a href='#' onclick=\"_fontFamily = 'T'; saveFont(); return false;\" style='font-family: Times, 'Times New Roman', serif  !important;'>T</a>\
				<a href='#' onclick=\"_fontFamily = 'H'; saveFont(); return false;\" style='font-family: Helvetica, Arial, sans-serif  !important;'>H</a>\
				<a href='#' onclick=\"_fontFamily = 'V'; saveFont(); return false;\" style='font-family: Verdana, sans-serif  !important;'>V</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
				<a href='#' onclick='loadDefaults(); saveFont(); return false;' style='font-family: Helvetica, Arial, sans-serif; font-size: 11px; vertical-align: 2px; text-decoration: underline;'>defaults</a></div><br><br><br>\
				<a href='javascript:scrollBy(0,document.body.clientHeight * -.92);' title='pageup' id='scroll-tog'>&lsaquo;</a>\
				<a href='javascript:togglescrolling()' title='toggle auto-scroll, hit 1 - 9 keys to change speed.' id='scroll-tog'>&raquo;</a>\
				<a href='javascript:scrollBy(0,document.body.clientHeight * .92);' title='pagedown' id='scroll-tog'>&rsaquo;</a><\div>";
				var str = document.getElementById('story'); 
				str.parentNode.insertBefore(archtools, str);
		var heads = document.getElementsByTagName("head");
		var cssnode = document.createElement("style");
		var css = "*{}html{padding-left:90px;padding-right:90px;}#readTbarr{position:fixed; z-index:100; top:8em;} #editing_controls{display:none;} #text_controls_toggle{display:none;} #readTbarr div{position: relative; right:80px;}#readTbarr a{opacity:.35; text-indent:0px; line-height:28px; font-family:serif; font-style: normal; font-weight:normal; font-size:22px;text-decoration:none;}#readTbarr a:visited{} #archive-return{background:#afafaf;margin-bottom:10px;font-weight:bold; -webkit-border-radius:4px; border-color:#4e4e4e; border-width: .07em;border-style: solid;-moz-border-radius:4px;color:#FFFFFF; display:block;padding:0;width:26px;height:26px;text-align:center; font-size:19px;}#del-this{background:#afafaf;margin-bottom:10px;font-weight:bold;-webkit-border-radius:4px;border-color:#4e4e4e;border-width: .07em; border-style:solid; -moz-border-radius:4px;color:#FFFFFF;display:block;padding:0;width:26px; height:26px;text-align:center;-webkit-transform: rotate(90deg); -moz-transform:rotate(90deg);}#font-tog{background:#afafaf; margin-bottom:10px;font-weight:bold; -webkit-border-radius:4px;border-color:#4e4e4e;border-width: .07em;border-style:solid; -moz-border-radius:4px;color:#FFFFFF;display:block;padding:0; width:26px; height:26px; text-align:center;}#star-this{display:block;background:#afafaf; margin-bottom:10px; font-weight:bold; -webkit-border-radius:4px;border-color:#4e4e4e;border-width: .07em;border-style: solid;-moz-border-radius:4px;color:#FFFFFF; padding:0; width:26px; height:26px;text-align:center;}#stard{display:none;background:#afafaf; margin-bottom:10px; font-weight:bold; -webkit-border-radius:4px;border-color:#4e4e4e;border-width: .07em;border-style: solid;-moz-border-radius:4px;color:#FFFFFF; padding:0; width:26px; height:26px;text-align:center;}#return-now{background:#afafaf; margin-bottom:10px;font-weight:bold; -webkit-border-radius:4px;border-color:#4e4e4e;border-width: .07em;border-style:solid;-moz-border-radius:4px;color:#FFFFFF;display:block; padding:0; width:26px; height:26px;text-align:center;opacity:.35; line-height:24px;}#scroll-tog{font-style: normal !important; font-weight: normal !important; background:#afafaf;margin-bottom:10px; font-size:26px !important; text-align:center !important; line-height:23px !important; -webkit-border-radius:4px; border-color:#4e4e4e; border-width:1.3px; border-style:solid; -moz-border-radius:4px; color:#FFFFFF; display:block; padding:0; width:26px; height:26px; opacity:.35;-webkit-transform: rotate(90deg); -moz-transform:rotate(90deg);}#text_controlz{z-index:100 !important;display: none;margin-top:10px;margin-bottom:10px; padding-bottom:0px;padding-top:0px;padding-right:10px;padding-left:1px; height:26px; width:auto; background:#afafaf; color:white;-webkit-border-radius:4px; border-color:#4e4e4e;border-width: .07em;border-style: solid; -moz-border-radius:4px;left:0px;}#text_controlz a{color:white;border-color:white !important;opacity:1;}#text_controlz a:hover{color: #EB282B !important;}#readTbarr a:hover{opacity:1;}";
		cssnode.type = "text/css";
		cssnode.appendChild(document.createTextNode(css));
		heads[0].appendChild(cssnode);
		var jsnode = document.createElement("SCRIPT");
		var scrolljs = "\
			var goscrolling = false,\
			_ss_interval_pointer,\
			_ss_speed=2,\
			_ss_speed_pairs=[[0,0],[1,200.0],[1,120.0],[1,72.0],[1,43.2],[1,25.9],[2,31.0],[4,37.2],[8,44.8],[8,26.4],[16,32.0]],\
			_ss_last_onkeypress = document.onkeypress,\
			_ss_stop=function(){clearTimeout(_ss_interval_pointer)},\
			_ss_start=function(){\
				var _ss_abs_speed=Math.abs(_ss_speed),\
				_ss_direction=_ss_speed/_ss_abs_speed,\
				_ss_speed_pair=_ss_speed_pairs[_ss_abs_speed];\
				_ss_interval_pointer=setInterval('scrollBy(0,'+_ss_direction*_ss_speed_pair[0]+');if((pageYOffset<=1)||(pageYOffset==document.height-innerHeight))_ss_speed=0;',_ss_speed_pair[1]);\
			},\
			_ss_adj=function(q){_ss_speed+=q;if(Math.abs(_ss_speed)>=_ss_speed_pairs.length)_ss_speed=(_ss_speed_pairs.length-1)*(_ss_speed/Math.abs(_ss_speed))};\
			var _ss_quit=function(){_ss_stop();document.onkeypress=_ss_last_onkeypress;};\
			function togglescrolling() {\
				document.getElementsByTagName('body')[0].focus();\
				if (goscrolling == false) {\
					goscrolling = true;\
					document.onkeypress=function(e){if((e.charCode==113)||(e.keyCode==27)){_ss_quit();return;};\
					if(e.charCode>=48&&e.charCode<=57)_ss_speed=e.charCode-48;\
					else switch(e.charCode){case 95:_ss_adj(-2);\
					case 45:_ss_adj(-1);\
					break;\
					case 43:_ss_adj(2);\
					case 61:_ss_adj(1);\
					break;\
					};\
					_ss_stop();\
					_ss_start();\
					};\
					_ss_stop();\
					_ss_start();\
					}\
				else {\
					_ss_quit();\
					goscrolling = false;\
					return;\
				}\
		}";
		scrolljs.id = "togscroll";
		jsnode.type = "text/javascript";
		jsnode.appendChild(document.createTextNode(scrolljs));
		heads[0].appendChild(jsnode);
