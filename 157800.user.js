// ==UserScript==
// @name        LastFM Spotify Mashup
// @namespace   userscript.org
// @description Creates a floating bar on any page with your favorite albums allowing you to quickly listen to them in Spotify
// @include     *
// @require     http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @version     1.1
// ==/UserScript==

var username = GM_getValue("username"),
    period = '3month',
    page = 1,
    zindex = buildZMax(),
    totalpages = 1,
    spotifyUrl = '',
    scrobbleUrl = '',
    itemsnum = 10,
    floatywidth = 1460,
    spotifyLink = new Array,
    period = GM_getValue("period"),
    api_key = 'fc421f9da77260dddd244546a6e2cdd8';

var isInIframe = (window.location != window.parent.location) ? true : false;

var scrobbleUrl = '';

var spotifyImageData = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%9E%00%00%009%08%06%00%00%00%C7%9C%92-%00%00%00%04sBIT%08%08%08%08%7C%08d%88%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD~%FC%00%00%00%1CtEXtSoftware%00Adobe%20Fireworks%20CS6%E8%BC%B2%8C%00%00%0C%22IDATx%9C%ED%9D%7F%88%1D%D5%15%C7%3Fg%D9%3F%F6%8F%40%85%06%BA%D0%80%0B%A6t%A5%0B%DDb%A4%81%A4t%A1)%06%14%BA%A0%25%11S%BA%12%8B%82%11%85%08%A6%D8%D2-F%AATi%C4H%03*%89%A8%98%90%94DLQQ%D9%15%13%8C4%C5%0D%06%1A%A9%90%95%24h0%A2%C5%88%2B%D9%F0%ED%1F%E7%BEd%F6%ED%DC%3B3%EF%BD%FD%95%7D%1F%18v%99%B9%3F%CE%CC%DC%B9%F7%9Es%CF%B9%CFX%84H%EA%01~%05%AC%00%FA%80e%C0%D2%9C%A4%A7%C3q%1C8%06%8C%9A%D9%F1Y%12%B3%CD%95%84%A4%3EI%17%D48%A7%24%3D%12%1Ao%9B%06%B1%B9%16%60%B6%91%B4%16x5s%EA%5B%E0%23%E0%5C8%CE%03%DD%40%17%DE%13%5E%0Dt%E6%145%09%BC%08l1%B3OgR%E66W%08%926H%DA%24%A9%AFD%DANI%FD%92%EE%92tP%D27u%3D%E03%B3!s%9B%2B%10IWI%EA%914%10%8E%E5%92%F2%E6%7CHZ*i%8B%A4%2FB%C3%DB%3A%DB%F2%B6Y%A0%84%5E%EC%5EI%AFH%FA%2C1%9F%FBB%D2%3BaN%B7%BA%AE%8C%AB%24%AD%9C%AB%7Bh%B3%00%91%B4%BE%09%C5b%8B%A4%AB%E6%FA%1E%16%3A%8BN%B9%80K%E6%94%7D%B8%A9d%148%01%8C%03%13!I'%D0%03%F4%E2%26%975%C0%F73E%9C%03n7%B3%83%B3!o%9BE%8C%A4%D5%92%5E%D0eS%CCks-%D3BfQ%F6x5%E4Zm%2F%F0C%BC%87%CB%9AM%3E%05%3E%04%8E%98%D9%89L%9E%5E%E0%0E%60%B7%99%1D%9D%3Di%AF%2C%16m%C3%93%B4%19x%ACd%F2q%E09%60%C7B%B4%D9I%AA%D9%25%97%02K2%97%C6%CC%EC%CB%B9%90i17%BC%9B%80M%F8%FC%AE~%8E%07n%3C%EE%07%06%80%EB%C2%B9%09%E0%1E3%9B%F7%B6%BB%A0%85%DF%0D%AC%05b%CA%D0%7Bf%D6%D6%CC%E7%2B%C1%AE%B7Mn%3C%3E4%D7%F2%14!%E9%81%92Z%FA%F8%5C%C9%B8h%7B%BC%1A%92%96%01%2B%81k%F0%E1%08%E0k%7C%19%EDHvh%95%B4%D4%CC%CE%95(s%0D%DEcf%99%04%0E%98%D9%F9%92r%E5%95%01%B0%2FU%86%A4%01%60%A4L%1D%C0%C7f%D6S2%ED%EC%23%A9Kn%D9%AF%1DK%8As%CD_%E4%06%E4!I%FF*%D1%2B%BC%23_b%CB%5B%AF%8D%95%1FcC%852b%8E%0C%5B%0A%F2%3D_%E2%9Ej%8C%97%95%A7%D5D%1F%A6%DC*%BF%0E%9F%23%F4%E6%5C%3F%01%BC%8EO%B8O%84s%DD%C0%C6%BAr%BF%05%B6%99%D9D%7D%19s%81%A4%15%C0%F3%E4%DCS%84%D5%E1xP%D2%EDfv%A4%A0%FC%BC%5E%AAF%E9%C6%9BH%DB%159_%A3%BFB%1Ds%A2X%E4%22_%10%1F%A9%F0%D5Hn%DFZ*%E9%C1%C8%F5%81%B9%BE%2F%00I%B7%A89%97%A8%0B%92%EE(%A8%A3'%91%7F%A8%82%AC1%86%0B%F2%9D%8C%E4%3B'_%B1%19%C8%1C%DDe%E5i5S%BE*I%1B%81%1D%F5%E7Kp%1B%F0%0B%60%ACEr%B5%1CI%B7%00%2FQ%FD%DE%B2t%02OK%9A4%B3%5D-%11l%F6x%D3%CCv%CF%B5%105%3Aj%FFH%BA%1Bx%86%C6_L7%3E%2C%CF%3B%E4%86%E2%9D4%D7%E8%B2%3C-%A9%CA%906%1F%98%17S%9D%1A%9Dpi%3E%B7m%8Ee%99I%9Ef%AA%E1%B4%9Ec%C0v%A0%B6%12%D1%0B%0C%017D%D2w%E2%1F%E9%8A%16%C9%97%C7%3D9%E5%9F%0F%F5.xj%3D%C0%DF)%D7%1B%7C%1C%FE~%97%F4%8Bl%19%F2%C9%FA%00n%EE%E8%C1%1F%FE%19%BC%91%8C%9A%D9dA%FEA%DC%5C%12%E3%09%E0%FE%BAr%C6%80%DDr-4%D6S%5E'i%D0%CC%0E%94%BC%95J%98%D9%F6%99(w%DE%20iM%C1%84%FA%90%A4AI%5D%99%3C%9D%F2E%F3%5D*7Y%1F%08%F9v%96H%BB-%A4%ED%93%B4%BF%20%EDg%92%86%B3%B2%E5%DC%DFH%22%7F%A1w%89%A4%AD%89%FC%A3!%CD%07%25%EE%2B%C6%C9L%5DE%E5%5C%90%CFU%B3%F2%EDl%A2%EE%22N%A9%CEt%A6%F2%E6%9Ao%E4%16%04%24%FDV%D2nI%DBC%FE%EE%0E%E0%E6%C4s%7F%C2%CCV%9B%D9%81%AC9%C4%CC%26%CD%EC%90%99%0D%01%3F%C3%DD%8B%CA%D0S%22M%BF%A4%3B%81%F7%81%C1%82%B4K%81%3F%01%EF%CB%17%EF%A7%A0%CB%BDe%1E%17%81%FBJ%C8%B3%15w%83%CA%E3%E7r%CD0%D9%EB%16%90%B5%8B%16%B9%E2w%E6%A4)t%DFo%82%BC%E8%BB%94%B9(K%17%D0'%9F%0B_%8B%3B%5DL%02%CF%02%DB%3A%88%0FC%C7%CC%AC%F0%C5%04%BB%D6%F5%A1%E0V%B0%8A%EA%9Au%2F0%92%D3%F8%D6%24%F2%8C%9A%D9GE%05%87%0F.5%9C%AE%C6%7D%FA%9A!%D7%CD~%16%F2%CE%067%00%BB%F0%A0%A9%E5%B8%BC%A7%3A%88%2F%20%97%F67%0B%CBJ%BFiR%C0%1A%CDh%D5%AFj%AAw%F0u%B1%C4%A4%1BS%3D%87%13%D7%FA%81%7FW(%AB%D54%D3%DB%CE%06g%F0%91%EE%18%3E%2F%3F%0Dtw%242%F4T)%DD%CC%DE%C4%C3%FD%E6%92%1E%A6%BA%3A%F5%24%D2V%F1%A5%1BO%5C%5BVp%BD%103k%26%7F%D9iN%A34%D3%B0'pO%EFM%B8%9C%BB%C3%FF%87%3B%89%2F%9B%DC%2Ci%AD%99U%F1%B4%1D%02%0E%E1%BDO%B6%F2%DA2%D3%C3%C0%DB%E1%FA%9D%25%CA%BB%88%0F%BB%FB%F0%97%DB%0D%AC%C7%DD%7Db%3D%E3FI%DB%CDl%8C%B4%E6%5Dej0%9E%B8%D6%857%E2%3F%06%99%D6%11_%8E%BB%88%9B%AD%B2%8B%FC%D9%86sk%C8%BB%92%B8)%A7%9E%3F%E3%CF%14%DC%8E%FA%D3D%DA%3D%B8%0BXM%EEu%C4%3F%CE%7F%E0F%E7%FA%86%FD0%F0%1E%FE%0E%F2%9E%EF%D7%F8%D0z%1A8hf%13r%85h%03%FE%EEv%98%D9%A1%22%AD%E8B%D0B%D6(%A196%82%A4w%0B%B4%A2OkZQN%DE%D5%92%BEJ%E4%7D%26%A4%1B%89%25%A8(kj%19lw%5D%DA%BED%DA%E4%02%7F%A6%8C%AED%19%C3%89%7CK%14%8F%9A%9B%D6%81%C8%DD%BDb%A4%E6%C7)%0D%FC%FE2%F7%D8%01%BC%9C%B8%DE%89%B7%D47%80%AFBe%FB%25%3D)%E9~%B9%99%A5Q%AD%AA%C8%92%BE!%E6Znf%87%F0%2F%3D%C6%3A%15%7C(E%D7%EBHir%F5%F7%91r%7B*%D5%CB6%EAP%11%DC%A5b%F5O%AB%3B(W%A3%91%F4QO%1AI%CB%89k%D3%A5%96%E5%3A%80%83%B8%EFY%115U~%10%1F%A7%FF%0A%EC%07%3E%90%F7%3E%AFH%BAC%AD%09%FD%7B9%CC%19Sl'n%E6X%82%0FW%A9FP%D6%2C%00S%A7%0E%F5%14%FA%E7%CDs%9E%8B%9C%BF9%F1q%AE%8B%9C%3F%9C34%E7%D2%11%2C%F6%BF%2F%938%C1%12%E0%26%7Ci%EA%13%B9%B7n3%0D%B0%D0j_%D2%CC%91%FA%A0%AA%F4%D4%A9yS%99%8Fv%3E%B3%9B%FC%0Ft%09q%3BjlM~_%D9J%3B%00%CCl%1F%F0T%D9L%05t%01%F7%E2%3Da%23%FE%FC_S%DE.%962s%F4%E1*%7C%8C%81%92u%80%7FT1%92%FEy%F3%9D%F0%01%C7%86%C7%F5%F5'%E4F%F9%D59i%A1j%C3%0B%DCG%EB%1A%1F%F8P%F6%86%EA%B6~(%C1%89%A2%F5%D7%0C%A9%DE%A6%1BH%0D%D7%B7%95%99%E7%C9%97%FBbZ%EA%99%A0%3D%2Ftb%C3%ED%8D%9A%BE%87L%EC%23%2C%3D%CCB%A6%E1%85e%B0M%C0%2Fqu%B9%15%2C%01%F6%E6%08%9F%A2TLB%20u%A3%3D%E1A%C4%82s%96%E2%CBaQ%E4KY%7FK%24%997%FEm%CD%10%94%B5%139%97%3A%99%DE%EB%C5%96XK%F7v0%B5%C7%AB%09%F1f%08y%BB%1Ex%1C%1F%AE%9A1%22vS%3E~u%26x%3Cqms%CC%C4%11%E6%A8%7B%89%BB%92%D7l%8CW%0A%B1%5E%EFR%C3%0B%1D%C8%40%24%5D%A5%86%17%5D%9E%0A%A6%8C%A3%A1%C2N%7C%9D%AD%1B78%D6%FE%F6%01%3F%A6%D8E%EA6I%C3MZ%E8%F3(%5C%5E3%B3%03%92%8E%12%F7%9D%FB%8B%A4u%F8%AAK%CD%E8%BC%0A7%86%A7z%EA%EDe%D6z%17%10%2F%00%0F1%FD%99%AE%92%B4%3C%DC%EB%DA%9C%EBPq%98%25R%C84%C2%9C%AB%16%F8%3C%850O%BA%09%18%06~%94%A8g%03%05C%5B%A0%A7%8CL%81%94Id%3C%F3%FF%EF%80w%89%07%CA%F4S-H%E6C%E0%0F%15%D2%CF%7B%CC%EC%B4%A47%C9%D7X%D7%E3%EF%AE%25%C3%2C%E4%0C%B5U1%B3%89%A0%15%F7%03%FFL%24-%ABd%5C%5D%C1%14%932%89%5C2%98%06%05%E0%F6%92e%16q%16%18%2C%1B%1F%BB%C0x6r~(t0M%9BQjt%C8%97%AEN%D6%1D%8FT-(%F4%8Aw%25%92%94%0D'%84%B4%F9%22%CB%AA%C4%B5)%AB%1E!%D0%E5V%9A%9B%AF~%0C%0Cd7%F1%B9%C28H%BEA%FC%1A%7CD%CB%1B1*%0F%B3%E0%3D%DEJ%7Cx%CB%1E%0F4%60%06!%08%10%13%E2%7B%15%8AJ5%60%E0%D2%E4%3F%D5%40%A7i%B3%A1%F1%5DOcnL%2F%02%FDWp%A3%AB%D9%F4%F6D.o%8E%9Co%C8%F5%3F5%D4%EETc%3B%06%C4%E6%8D%9FW(c%95%8AcP%1F%24%AE%D4%9C%89%05%5E%9B%D9%98%99%AD%00~%0D%BCE%BA%07%FC%1F%AE%ED%FD%C4%CC6%94%DCY)U%5EK%1D-f%88%5D%91%F3%B1%F7%DAX%CCI%C2%3BA%92%0E%A8%DA%D6%0D%BD%89%B2%C6%EA%D2%8E%14%D4%FD%95%7CG%A7%BCz6%17%E4-%3DU%90%7Bt%AC%94oiQ%3B%D6%AB%89%F0%C5%84%5C%FB%CA%3CO%F9%FE%CA1%A2%A6)y%2C%CC'%91%7Cc*%D9%91Hz%BF%E0%F9%5E*%B3%CAs%A9%AF%A4%88%7D%15%04%DE%9B(gW%5D%DA%91%927%F7%8A%FC%A7%01%86%E4%1Bf%BFS%90%FE%BC%E60B%3E%DC%DB%A9%84%7C%9F%84%7B%AF%1D%3B2%F9%9E%0C%E7N%26%F2_%08i%F6%2B%18%E6%25m%0C%E7%8A%82%85%FE%1B%D2%25C%1A%24%DDWPN%8D%C65%FB%92%15%FCG%1E%26%18%2B%A3%5B%D2K%05e%0C%D6%E5%19)YwUJ%F9%83%CD%24%AA%B6q%8E2%F9%AA2%10%F2%8DT%CC%97%B4%3F%CA%B7%23%A9%FF%3D%8F%3C%967%FA%8C%CA%0E%A3%BD%C0~I%A7%F1X%8C%D3%B8%E7r7nFYSP%D6Y*%C4p4%C1%5B%CC%8F%C0%F4%A7H%F8%B3%CD%03%92%EF%DD%CC%CE%C9C%3FoI%24%3B%D6%8C%01%BDj%60%CD2%7C%FF%DF%AA%0CWpn%FC%1C%F8%0E%D5e%3B%8C%DB%D7%E6%3C%F8%C5%CC%8EHz%14x%60%AEei%82%E7H7%BC%CA%B6%BB%2C1%AD%F6sZ%17%BD%F4%BA%99UY%D3%3CN%B5X%5Dp%C3%E7%DA%F9d%D45%B3-x%1C%C6%BC%DA%B3%A4%02%AF%91%F6%98n%CAA%22%D6%AB%1C%C7%17%F6_%A2%B9%AD*%0E%93%FEjr%09%3D%C6%B5%B8%AB%D6%5DL%FD%8D%89%1A%17%F1%87%F3%98%99%8D6!%E3%8Caf%5B%E5%F1%1FC%F8%CA%CDr%A6%9BT%B2f%9F%3D%A4%BD%9D%B3Lr%D9-%ECe%AA%ED%EEZ8%ED1%B3I%F9%12Z%DE%94%A1%A9a%16%88NhG%C3%B5~I'*N%5Ck%24%B5a%C5'%C4%A39i%7B%E5%F1%1D5s%C7%40%AA%EC6%ADA%AE%05%E7%D1%FC%3Au%D1%CB%97G%3C%0D%EB%F2%8F%C6%151%A6%88%FD%AD%AE%DE%D2%0D%AF%CD%EC%23%EFtb4%AC%CD%D6(%E3V4%01%0C%CB%8D%B2%83%F8%90%D1%CFe%CF%90%09%BC%CB%3F%8A%C7a%96%DD%15%3D%D6c%B5j%0F%BB6%CD%11S%8C%9A%1Ff%F1%97%3C%C9%F4%97%3Dmi(%E3%9B%DF%F0%A4R%1E%D8%7B%23%BEmF%CC%3Fn%95%A4%BD%B8'%F2%9E%8A%01%E5m*%22_Iy%88%A9s%CB%3E%E2%EF%A7)m%B6%86%C9%E3b%EB%1D%1E%8F%97%D9V%BF*%92F%A8%16d%F3%B6%99UI%DF%A6%22%F2%1F%14%3CY%94.%C3%0FZ%D2%E3%99%D9%F1f%0Bi%B3hx%AFU%5E%D7M%3B%82%B6YT%0C%B7%AA%A0v%C3kS%96G%5B9%DF%9Em%0D%F2l%C5%F4%E33!D%9B)%7C%89%7B%1D%E7%056%9D%C5%1Dj%B7%B7%DAH%FF%7F%13%E2I%D5%FE%DA%1A%B2%00%00%00%00IEND%AEB%60%82";

var barContent = '<div id="floatyMusicBar">'
               + '<div class="mb_background" />'
               + '<div id="mb_config">'
               + '<input id="mb_username" type="text" size="15" value="LastFM Username"/>'
               + '<select id="mb_period">'
               + '<option value="7day">7 day</option>'
               + '<option value="3month">3 months</option>'
               + '<option value="6month">6 months</option>'
               + '<option value="12month">12 months</option>'
               + '<option value="overall">Overall</option>'
               + '</select>'
               + '<input type="submit" value="Submit" id="mb_submit" />'
               + '<img src="http://cdn.last.fm/flatness/badges/lastfm_black_small.gif" class="lastfmLogo" />'
               + '<span class="mashup">+</span>'
               + '<img src="'+spotifyImageData+'" class="spotifyLogo" />'
               + '</div>'
               + '<span id="mb_restore_config">[+]</span>'
               + '<div id="mb_navleft">{</div>'
               + '<div id="mb_albums" />'
               + '<span id="mb_close">X</span>'
               + '<div id="mb_navright">}</div>'
               + '</div>'
               + '<div id="mb_restore">MB [+]</div>';

GM_addStyle("#floatyMusicBar, #mb_restore{z-index:1000000000; height:125px; bottom:0px; position:fixed; width:100%; left:0; line-height:1.3em; font-family:Arial,Helvetica,FreeSans,sans-serif; font-size:10pt; }"
          + ".mb_background{height:125px; width:100%; background:#000; opacity:.5; z-index:-1; position: absolute; top:0; left:0; }"
          + "#mb_close, #mb_restore, #mb_restore_config, #mb_navright, #mb_navleft{float:right; padding:5px 7px; background:#000; color:#fff; font-weight:bold; cursor:pointer; margin:10px; }"
          + "#mb_navleft, #mb_navright{float:left; font-size:7em; line-height:.9em; height:100px;}"
          + "#mb_navright{float:right;}"
          + "#mb_username {width:70px;}"
          + "#mb_period {width:90px;}"
          + "#mb_username, #mb_period, #mb_submit, #mb_restore_config{float:left; margin:10px; padding:8px; color:#fff; background:#000; border:0; font-family:Arial,Helvetica,FreeSans,sans-serif; font-size:10pt; }"
          + "#mb_period, #mb_submit{padding:6px;}"
          + ".lastfmLogo{position:absolute; left:10px; top:85px; }"
          + ".mashup{position:absolute; left:97px; top: 90px; font-size:20pt; color:#fff;}"
          + ".spotifyLogo{position:absolute; left:120px; top:75px; height:40px; opacity:.8; }"
          + "#mb_restore{display:block; height:auto; width:auto; right:0; left:auto; }"
          + "#floatyMusicBar, #mb_restore_config, #mb_navright, #mb_navleft{display:none}"
          + ".album{background:#ccc; float:left; margin:0 10px; width:126px; height:126px; position:relative; font-size:.8em; overflow:hidden; text-align:left;}"
          + ".albumname{background:#000; color:#fff; position:absolute; bottom:0; z-index:2; width:100%; padding:5px; opacity:.5;}"
          + ".album:hover .albumname{opacity:.8; font-weight:bold;}"
          + ".albumart{position:absolute; width:116px; z-index:1; margin:auto; text-align:center; }"
          + "#mb_albums{margin:auto; width:1460px;}"
          + "#floatyMusicBar > div:hover, #floatyMusicBar > span:hover{color:yellow}"
);

$(document).ready(function() {
  // Make sure this is at the top level of the page only not in iframes
  if (!isInIframe){
    $("body").append(barContent);

    $("#mb_period").bind("change", function() {
      page = 1;
    });

    if (zindex > $("#floatyMusicBar").css('zIndex')) {
      $("#floatyMusicBar, #mb_restore").css('zIndex', zindex);
    }
    // If the username has been retrieved from localstorage use it
    if(username) {
      $("#mb_username").val(username);
    }
    // If the time period searched has been retrieved from localstorage use it
    if(period) {
      $("#mb_period option[value='"+period+"']").attr("selected","selected");
    }

    $("#mb_submit").bind('click', function() {
      submitFunc();
    });

    $('#mb_navright').bind('click', function() {
      page++;
      $("#mb_submit").click();
    });

    $('#mb_navleft').bind('click', function() {
      page--;
      $("#mb_submit").click();
    });

    $("#mb_restore_config").bind('click', function() {
      $("#mb_config").show();
      $(this).hide();
      if ($("#mb_albums div.album:last-child").length) {
        $("#mb_albums div.album:last-child").hide();
      }
    });

    $("#mb_close").bind('click', function() {
      $(this).parent().hide();
      $("#mb_restore").show();
    });

    $("#mb_username").bind('click', function() {
      if ($(this).val() == 'LastFM Username') {
        $(this).val('');
      }
    }).bind('blur', function(){
      if ($(this).val() == '') {
        $(this).val('LastFM Username');
      }
    }).bind('keypress', function(event) {
      if (event.keyCode == 13) {
        submitFunc();
      }
    });

    $("#mb_restore").bind('click', function() {
      $("#floatyMusicBar").show();
      $(this).hide();
    });
  }

  $(window).resize(function() {
    if ($("#mb_albums div.album:last-child").length) {
      $("#mb_submit").click();
    }
  });
});

function buildZMax() {
  var zmax = 0 ;
  $('*').each(function() {
    var cur = parseInt($(this).css('zIndex'));
    zmax = cur > zmax ? $(this).css('zIndex') : zmax; 
  });
  return zmax;
}

function submitFunc() {

  if ($("#mb_username").val() != 'LastFM Username') {

    floatywidth = ($("#floatyMusicBar").width() - 443);
    itemsnum = (floatywidth / (126 + 20));
    //console.log(itemsnum);
    $("#mb_albums").css("width", floatywidth);

    // Set the username and time period based on input from the user
    username = $("#mb_username").val();
    period = $("#mb_period option:selected").val();

    scrobbleUrl = 'http://ws.audioscrobbler.com/2.0/?method=user.getTopAlbums&user='+ username 
                + '&period='+ period 
                + '&limit='+ itemsnum 
                + '&api_key='+ api_key 
                + '&format=json&page=' + page;

    // Store the username and time period in localstorage
    GM_setValue("username", username);
    GM_setValue("period", period);
    
    $.getJSON(scrobbleUrl, function(data) {
      console.log(data);
      totalpages = data.topalbums['@attr'].totalPages;
      $("#mb_albums").empty();
      $(data.topalbums.album).each(function(i) {
        //console.log(this);

        spotifyUrl = 'http://ws.spotify.com/search/1/album.json?q=artist%3a"'+ encodeURIComponent(this.artist.name) +'"+AND+album%3a"'+ encodeURIComponent(this.name) +'"';

        //console.log(spotifyUrl);

        $("#mb_albums").append('<div class="album">'
                             + '<span class="albumart"><a href="' + spotifyLink + '"><img src="'+ this.image[2]["#text"] +'"/></a></span>'
                             + '<span class="albumname">' + this.artist.name + ': ' + this.name + '</span>'
                             + '</div>').css("width", floatywidth);

        GM_xmlhttpRequest({
          method: "GET",
          url: spotifyUrl,
          onload: function(response) {
            try {
              spotifyData = JSON.parse(response.responseText);
            }
            catch(e){
              console.log(e);
              console.log("There was an error with the following URL request: " + spotifyUrl);
            }
            $(spotifyData).each(function(){
              
              //console.log('spotifyLink: ' + spotifyLink[i]);
              if (typeof(this.albums[0]) != 'undefined') {
                spotifyLink[i] = this.albums[0].href;
                $('div.album:eq('+i+')').find('a').attr('href', spotifyLink[i]);
              }
              else {
                $('div.album:eq('+i+')').find('a').attr('href', '#').bind('click', function(){return false;});
              }
            });
          }
        });

        //console.log("totalpages: " + totalpages);
        //console.log("page: " + page);
        if (totalpages > 1) {
          $('#mb_navright').show();
        } else {
          $('#mb_navright').hide();
        }
        if (page > 1) {
          $('#mb_navleft').show();
        } else {
          $('#mb_navleft').hide();
        }
      });
    });
    
    $("#mb_config").hide();
    $("#mb_restore_config").show();
  }
  else {
    alert('Requires a username');
  }
}