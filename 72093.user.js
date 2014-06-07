// ==UserScript==
// @name           Bootleggers Themes
// @namespace      http://
// @include        http://www.bootleggers.us/*
// @exclude        http://www.bootleggers.us/index.php
// @exclude        http://www.bootleggers.us/
// @exclude        http://www.bootleggers.us/checkuser.php
// @exclude        http://www.bootleggers.us/faqOther.php*
// @exclude        http://www.bootleggers.us/login.php*
// @exclude        http://www.bootleggers.us/logout.php*
// ==/UserScript==

// Update checker - http://userscripts.org/scripts/show/20145
var SUC_script_num = 72093;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

	var head = document.getElementsByTagName('head')[0].innerHTML;
	head += '<style>\n';
	head += '</style>\n';
	document.getElementsByTagName('head')[0].innerHTML = head;

		if ( window.location.href == top.location.href && document.title != 'Bootleggers :: Backup' ) {
			var menu = document.getElementsByTagName('td')[2].innerHTML;
			menu = '<select name="changeMySkin" size="1" id="changeMySkin" style="background-color: #292929; border-width: 0px; color: #666; font-size: 10px" onfocus="this.style.color = \'#FFF\'" onblur="this.style.color = \'#666\'">\n';
			menu += '<option value="1" style="color: #927F61">Bootleggers&nbsp;</option>\n';
			menu += '<option value="2" style="color: #927F61">Old Bootleggers</option>\n';
			menu += '<option value="3" style="color: #c0c0c0">Silver</option>\n';
			menu += '<optgroup label="Locations" style="font-family: verdana; font-style: normal">\n';
			menu += '<option value="4" style="color: #F00">England</option>\n';
			menu += '<option value="5" style="color: #0F0">Ireland</option>\n';
			menu += '</optgroup>\n';
			menu += '<optgroup label="Crews" style="font-family: verdana; font-style: normal">\n';
			menu += '<option value="6" style="color: #606; text-shadow: #FFF 0px 0px 5px">1337 Guard</option>\n';
			menu += '<option value="7" style="color: #96F">The Clenched Fist</option>\n';
			menu += '</optgroup>\n';
			menu += '<option value="_contact_">Request a theme</option>\n';
			menu += '</select>\n';
			menu += '<span id="changed" style="font-size: 10px; color: #666"></span>\n';
			document.getElementsByTagName('td')[2].innerHTML = menu;
			document.getElementById('changeMySkin').addEventListener('change', changeTheme, false);
	
			if ( GM_getValue('mySkin') != '' ) {
				document.getElementById('changeMySkin').options[(GM_getValue('mySkin') - 1)].selected = 'true';
			}
		}

		if ( GM_getValue('mySkin') != '' ) {
			var mySkin = GM_getValue('mySkin');
		} else {
			GM_setValue('mySkin', 0);
			var mySkin = 0;
		}

	var elems = new Array();

	var date = new Date();
	var day = date.getDate();
	var month = date.getMonth() + 1;

		if ( ( day == '23' && month == '3' ) || mySkin == '4' ) {
		// St George's Day
			elems[0] = "http://www.illegitimi.net/boot/images/skins/red/left.jpg";
			elems[1] = "http://www.illegitimi.net/boot/images/skins/red/right.jpg";
			elems[2] = "http://www.illegitimi.net/boot/images/skins/red/bar.jpg";
			elems[3] = "http://www.illegitimi.net/boot/images/skins/red/tablebg.jpg";
			elems[4] = "http://www.illegitimi.net/boot/images/skins/red/heading.jpg";
		} else
		if ( ( day == '17' && month == '2' ) || mySkin == '5' ) {
		// St Patrick's Day
			elems[0] = "http://www.illegitimi.net/boot/images/skins/green/left.jpg";
			elems[1] = "http://www.illegitimi.net/boot/images/skins/green/right.jpg";
			elems[2] = "http://www.illegitimi.net/boot/images/skins/green/bar.jpg";
			elems[3] = "http://www.illegitimi.net/boot/images/skins/green/tablebg.jpg";
			elems[4] = "http://www.illegitimi.net/boot/images/skins/green/heading.jpg";
		} else
		if ( mySkin == '7' ) {
		// TCF
			elems[0] = "http://www.illegitimi.net/boot/images/skins/tcf/left.jpg";
			elems[1] = "http://www.illegitimi.net/boot/images/skins/tcf/right.jpg";
			elems[2] = "http://www.illegitimi.net/boot/images/skins/tcf/bar.jpg";
			elems[3] = "http://www.illegitimi.net/boot/images/skins/tcf/tablebg.jpg";
			elems[4] = "http://www.illegitimi.net/boot/images/skins/tcf/heading.jpg";
		} else
		if ( mySkin == '6' ) {
		// 1337
			elems[0] = "http://www.illegitimi.net/boot/images/skins/purple/left.jpg";
			elems[1] = "http://www.illegitimi.net/boot/images/skins/purple/right.jpg";
			elems[2] = "http://www.illegitimi.net/boot/images/skins/purple/bar.jpg";
			elems[3] = "http://www.illegitimi.net/boot/images/skins/purple/tablebg.jpg";
			elems[4] = "http://www.illegitimi.net/boot/images/skins/purple/heading.jpg";
		} else
		if ( mySkin == '2' ) {
		// BL
			elems[0] = "http://img.bootleggers.us/game/site/site/l.gif";
			elems[1] = "http://img.bootleggers.us/game/site/site/r.gif";
			elems[2] = "http://img.bootleggers.us/game/site/site/mar_center.gif";
			elems[3] = "http://www.bootleggers.us/images/tablebg.gif";
			elems[4] = "http://img.bootleggers.us/game/site/site/heading.gif";
		} else
		if ( mySkin == '3' ) {
		// Silver
			elems[0] = "http://www.illegitimi.net/boot/images/skins/silver/left.jpg";
			elems[1] = "http://www.illegitimi.net/boot/images/skins/silver/right.jpg";
			elems[2] = "http://www.illegitimi.net/boot/images/skins/silver/bar.jpg";
			elems[3] = "http://www.illegitimi.net/boot/images/skins/silver/tablebg.jpg";
			elems[4] = "http://www.illegitimi.net/boot/images/skins/silver/heading.jpg";
		}

	function showTheme(myNewSkin) {
		document.getElementsByTagName('head')[0].getElementsByTagName('style')[0].innerHTML += '.menu_header { background-image: url("' + elems[4] + '"); }\n';
		document.getElementsByTagName('head')[0].getElementsByTagName('style')[0].innerHTML += '.header { background-image: url("' + elems[3] + '"); }\n';
		if ( top.location.href == document.location.href ) {
			var tds = document.getElementsByTagName('td');
			tds[1].firstChild.src = elems[0];
			tds[2].style.border = '1px solid #FFF';
			tds[2].style.borderWidth = '1px 0px';
			tds[2].setAttribute('background', '');
			tds[2].style.backgroundColor = '#292929';
			tds[3].firstChild.src = elems[1];
			tds[5].style.display = 'none';
			tds[6].style.backgroundImage = 'url("'+ elems[2] + '")';
			tds[6].style.border = '1px solid #FFF';
			tds[6].style.borderTopWidth = '0px';
			tds[6].height = '15px';
			tds[7].style.display = 'none';
		}
		if ( mySkin == '2' ) {
			var allImages = document.getElementsByTagName('img');
			for ( i = 0; i < allImages.length; i++ ) {
				if ( allImages[i].src == 'http://img.bootleggers.us/game-new/site/bullet.gif' ) {
					allImages[i].src = 'http://img.bootleggers.us/game/site/site/arrow.gif';
				}
				if ( allImages[i].src == 'http://img.bootleggers.us/game-new/site/table_bottom.gif' ) {
				allImages[i].src = 'http://img.bootleggers.us/game/site/site/table_bottom.gif';
				}
				if ( allImages[i].src == 'http://img.bootleggers.us/game-new/site/table_top.gif' ) {
					allImages[i].src = 'http://img.bootleggers.us/game/site/site/table_top.gif';
				}
			}
			for ( i = 0; i < tds.length; i++ ) {
				if ( tds[i].getAttribute('background') == 'http://img.bootleggers.us/game-new/site/table_bg.gif' ) {
					tds[i].setAttribute('background', 'http://img.bootleggers.us/game/site/site/bg.gif');
				}
			}
			document.getElementsByTagName('head')[0].getElementsByTagName('link')[1].href = 'http://bootleggers.us/includes/main.css';
			document.getElementsByTagName('head')[0].getElementsByTagName('style')[0].innerHTML += 'tr.sub2 th, tr.sub3 th, .sub2, .sub3, .header, tr.header th, table.sub2 td, .usersonline td { border: 1px solid #000; empty-cells: show }\n';
		} else
		if ( mySkin == '3' ) {
			var allImages = document.getElementsByTagName('img');
			for ( i = 0; i < allImages.length; i++ ) {
				if ( allImages[i].src == 'http://img.bootleggers.us/game-new/site/bullet.gif' ) {
					allImages[i].src = 'http://img.bootleggers.us/game/site/site/arrow.gif';
				}
			}
			document.getElementsByTagName('head')[0].getElementsByTagName('style')[0].innerHTML += '.header, .header *, .header a, .menu_header { color: #000; }\n';
		}
	}

	function changeTheme() {
		document.getElementById('changeMySkin').blur();
		if ( document.getElementById('changeMySkin').options[document.getElementById('changeMySkin').selectedIndex].value == '_contact_' ) {
			window.open('http://www.illegitimi.net/contact/us/');
		} else
		if ( document.getElementById('changeMySkin').options[document.getElementById('changeMySkin').selectedIndex].value > '0' ) {
			GM_setValue('mySkin', document.getElementById('changeMySkin').options[document.getElementById('changeMySkin').selectedIndex].value);
			if ( confirm('Do you want to reload this page? This will load the the new skin but will lose anything you have done on this page such as a Bootmail you are typing. If you are not ready to reload the page, click cancel and you can reload the page when you are done') == true ) {
				window.location.href = window.location.href;
			} else {
				document.getElementById('changed').innerHTML = '<br />You have changed your skin to <b>' + document.getElementById('changeMySkin').options[document.getElementById('changeMySkin').selectedIndex].innerHTML + '</b><br />You will notice a change when you reload the page';
			}
		}
	}

	if ( elems.length == '5' && document.title != 'Bootleggers :: Backup' ) {
		showTheme();
	}