// ==UserScript==
// @name           LG15+
// @namespace      Renegade@RenegadeProjects.com
// @author         Renegade
// @copyright      2009+, Renegade (http://userscripts.org/users/renegade)
// @description    This script fixes, improves and enhances lg15.com after the change to Umbrella.
// @include        http://www.lg15.com/*
// @include        http://lg15.com/*
// @version        v4 beta 4
// ==/UserScript==

var version = "v4 beta 4";
var DEBUG = false;

/* 
#####################
# C H A N G E L O G #
#####################

v4
- Added feature safeguard for saving navbar/header state (there's a bug in chrome/-ium leaving window.localStorage defined as null)
- Added Unfriend links on friends list
- GIANT REVAMP to accommodate for '09 upgrade/destruction and Feb '10 update

v3
- changed button styles
- improved & safeguarded SHOWS bug fix -> later rendered obsolete by new menu
- fixed new show selector OpAphid JS syntax error
- added theme recognition to prevent style leaking (reporter: Shiori/KindredPhantom)
- reformatted and cropped friends items on profile page to ensure there will be no line wrapping
- fixed resistance chapter 3-letter-selectors' font size
- changed site navigation background
- added url helper to prefix page titles not including "LG15" with "LG15 - " for easier identification
- fixed navbar hide/show link location change
- fixed "[...] a javascript conflict that happens in some Browsers, but it's been hard to track down precisely." that made videos overlap with navbar (read: EQAL can't code, simple fix)
- added direct links to posts
- made header toggle-able
- navbar and header toggling permanent
- fixed selected message box styling
- improved sidebar show list style

v2
- fixed secondary navigation access
- fixed chat link
- increased general font size

v1
- stopped navbar jumping
- changed navbar style
- fixed SHOWS options bug (reporter: Shiori)
- made header link useful
- fixed pseudo-header-link's horrible markup
- fixed EQAL-link's horrible markup


###########
# T O D O #
###########
- prevent whatever page->overflow-x was preventing
- fix titles
- fix favicon
- fix sidebar bg
- fix color scheme
- fix random spots of white, like the response box and the inbox marker
- fix menu in expanded navbar (rounded corners)
- comment ordering
- fix navbar/site nav hover z-layering (fixed?)
- add "set status" field to profile popup
- fix comments smileys display block styling
- hide navbar on login

*/

// globals
var isFirefox = null;
var page = document.getElementById("page");
var blog = document.getElementById("blog");
var forumPage = document.getElementById("forumPageDiv");
var forumHomepage = document.getElementById("forumHomepageDiv");
var serialBlog = document.getElementById("serial-blog");
var navbar = document.getElementById("u-social");
var userlink = document.getElementById("u-social-user");
var userId = userlink ? /showProfile\((\d+)\)/.exec(userlink.getElementsByTagName("a")[0].href)[1] : "anon";
var sitenav = document.getElementById("main-nav");
var head = document.getElementsByTagName("head")[0];
var foot = document.getElementById("foot");
var hasGM = (typeof GM_log !== 'undefined');
var hasStorage = (typeof window.localStorage !== 'undefined') && (window.localStorage != null);
var isOwnProfile = (location.pathname.search('/' + userId) != -1);
var additionalStyles = "";
var cssElem = null;
var show = getShow(); //lg15-outbreak theresistance lg15-thelast lg15-lonelygirl15 (pedia: resistance) (landing page: lg15)
var pedia = /^\/lgpedia/.test(location.pathname);
var forum = /^\/(?:forum|discussion)/.test(location.pathname);

// constants
const navbarbg = "data:image/gif,GIF89a%01%00%20%00%E7g%00%00%00%00%01%01%01%02%02%02%03%03%03%04%04%04%05%05%05%06%06%06%07%07%07%08%08%08%09%09%09%0A%0A%0A%0B%0B%0B%0C%0C%0C%0D%0D%0D%0E%0E%0E%0F%0F%0F%10%10%10%11%11%11%12%12%12%13%13%13%14%14%14%15%15%15%16%16%16%17%17%17%18%18%18%19%19%19%1A%1A%1A%1B%1B%1B%1C%1C%1C%1D%1D%1D%1E%1E%1E%1F%1F%1F%20%20%20!!!%22%22%22%23%23%23%24%24%24%25%25%25%26%26%26'''((()))***%2B%2B%2B%2C%2C%2C---...%2F%2F%2F000111222333444555666777888999%3A%3A%3A%3B%3B%3B%3C%3C%3C%3D%3D%3D%3E%3E%3E%3F%3F%3F%40%40%40AAABBBCCCDDDEEEFFFGGGHHHIIIJJJKKKLLLMMMNNNOOOPPPQQQRRRSSSTTTUUUVVVWWWXXXYYYZZZ%5B%5B%5B%5C%5C%5C%5D%5D%5D%5E%5E%5E___%60%60%60aaabbbcccdddeeefffggghhhiiijjjkkklllmmmnnnooopppqqqrrrssstttuuuvvvwwwxxxyyyzzz%7B%7B%7B%7C%7C%7C%7D%7D%7D~~~%7F%7F%7F%80%80%80%81%81%81%82%82%82%83%83%83%84%84%84%85%85%85%86%86%86%87%87%87%88%88%88%89%89%89%8A%8A%8A%8B%8B%8B%8C%8C%8C%8D%8D%8D%8E%8E%8E%8F%8F%8F%90%90%90%91%91%91%92%92%92%93%93%93%94%94%94%95%95%95%96%96%96%97%97%97%98%98%98%99%99%99%9A%9A%9A%9B%9B%9B%9C%9C%9C%9D%9D%9D%9E%9E%9E%9F%9F%9F%A0%A0%A0%A1%A1%A1%A2%A2%A2%A3%A3%A3%A4%A4%A4%A5%A5%A5%A6%A6%A6%A7%A7%A7%A8%A8%A8%A9%A9%A9%AA%AA%AA%AB%AB%AB%AC%AC%AC%AD%AD%AD%AE%AE%AE%AF%AF%AF%B0%B0%B0%B1%B1%B1%B2%B2%B2%B3%B3%B3%B4%B4%B4%B5%B5%B5%B6%B6%B6%B7%B7%B7%B8%B8%B8%B9%B9%B9%BA%BA%BA%BB%BB%BB%BC%BC%BC%BD%BD%BD%BE%BE%BE%BF%BF%BF%C0%C0%C0%C1%C1%C1%C2%C2%C2%C3%C3%C3%C4%C4%C4%C5%C5%C5%C6%C6%C6%C7%C7%C7%C8%C8%C8%C9%C9%C9%CA%CA%CA%CB%CB%CB%CC%CC%CC%CD%CD%CD%CE%CE%CE%CF%CF%CF%D0%D0%D0%D1%D1%D1%D2%D2%D2%D3%D3%D3%D4%D4%D4%D5%D5%D5%D6%D6%D6%D7%D7%D7%D8%D8%D8%D9%D9%D9%DA%DA%DA%DB%DB%DB%DC%DC%DC%DD%DD%DD%DE%DE%DE%DF%DF%DF%E0%E0%E0%E1%E1%E1%E2%E2%E2%E3%E3%E3%E4%E4%E4%E5%E5%E5%E6%E6%E6%E7%E7%E7%E8%E8%E8%E9%E9%E9%EA%EA%EA%EB%EB%EB%EC%EC%EC%ED%ED%ED%EE%EE%EE%EF%EF%EF%F0%F0%F0%F1%F1%F1%F2%F2%F2%F3%F3%F3%F4%F4%F4%F5%F5%F5%F6%F6%F6%F7%F7%F7%F8%F8%F8%F9%F9%F9%FA%FA%FA%FB%FB%FB%FC%FC%FC%FD%FD%FD%FE%FE%FE%FF%FF%FF!%F9%04%01%0A%00%FF%00%2C%00%00%00%00%01%00%20%00%00%08%20%00Md%C0%40%F0%C2%05%0B%15%12R%98%C0P%82%84%08%10%20%3C%98%E8%C0A%83%8B%0C%18%5C%0C%08%00%3B";
const buttonbg = "data:image/gif,GIF89a%01%00%1E%00%84%00%00u%02%02v%02%02w%02%02x%03%03y%03%03z%03%03%7C%03%03%7D%03%03~%03%03%7F%03%03%80%03%03%81%03%03%82%03%03%83%03%03%85%03%03%86%03%03%87%03%03%88%03%03%89%03%03%8A%03%03%8B%03%03%8D%03%03%8E%03%03%8F%03%03u%02%02u%02%02u%02%02u%02%02u%02%02u%02%02u%02%02u%02%02!%FE%1DCreated%20by%20Renegade%20with%20GIMP%00%2C%00%00%00%00%01%00%1E%00%00%05%16%E0%25%8AVEMR%04%3DN%C3%2CJ%82%1CFA%0CB%00%EC!%00%3B";
const sitenavbg = "data:image/gif,GIF89a%84%03*%00%E7e%00%00%00%00%01%01%01%02%02%02%03%03%03%04%04%04%05%05%05%06%06%06%07%07%07%08%08%08%09%09%09%0A%0A%0A%0B%0B%0B%0C%0C%0C%0D%0D%0D%0E%0E%0E%0F%0F%0F%10%10%10%11%11%11%12%12%12%13%13%13%14%14%14%15%15%15%16%16%16%17%17%17%18%18%18%19%19%19%1A%1A%1A%1B%1B%1B%1C%1C%1C%1D%1D%1D%1E%1E%1E%1F%1F%1F%20%20%20!!!%22%22%22%23%23%23%24%24%24%25%25%25%26%26%26'''((()))***%2B%2B%2B%2C%2C%2C---...%2F%2F%2F000111222333444555666777888999%3A%3A%3A%3B%3B%3B%3C%3C%3C%3D%3D%3D%3E%3E%3E%3F%3F%3F%40%40%40AAABBBCCCDDDEEEFFFGGGHHHIIIJJJKKKLLLMMMNNNOOOPPPQQQRRRSSSTTTUUUVVVWWWXXXYYYZZZ%5B%5B%5B%5C%5C%5C%5D%5D%5D%5E%5E%5E___%60%60%60aaabbbcccdddeeefffggghhhiiijjjkkklllmmmnnnooopppqqqrrrssstttuuuvvvwwwxxxyyyzzz%7B%7B%7B%7C%7C%7C%7D%7D%7D~~~%7F%7F%7F%80%80%80%81%81%81%82%82%82%83%83%83%84%84%84%85%85%85%86%86%86%87%87%87%88%88%88%89%89%89%8A%8A%8A%8B%8B%8B%8C%8C%8C%8D%8D%8D%8E%8E%8E%8F%8F%8F%90%90%90%91%91%91%92%92%92%93%93%93%94%94%94%95%95%95%96%96%96%97%97%97%98%98%98%99%99%99%9A%9A%9A%9B%9B%9B%9C%9C%9C%9D%9D%9D%9E%9E%9E%9F%9F%9F%A0%A0%A0%A1%A1%A1%A2%A2%A2%A3%A3%A3%A4%A4%A4%A5%A5%A5%A6%A6%A6%A7%A7%A7%A8%A8%A8%A9%A9%A9%AA%AA%AA%AB%AB%AB%AC%AC%AC%AD%AD%AD%AE%AE%AE%AF%AF%AF%B0%B0%B0%B1%B1%B1%B2%B2%B2%B3%B3%B3%B4%B4%B4%B5%B5%B5%B6%B6%B6%B7%B7%B7%B8%B8%B8%B9%B9%B9%BA%BA%BA%BB%BB%BB%BC%BC%BC%BD%BD%BD%BE%BE%BE%BF%BF%BF%C0%C0%C0%C1%C1%C1%C2%C2%C2%C3%C3%C3%C4%C4%C4%C5%C5%C5%C6%C6%C6%C7%C7%C7%C8%C8%C8%C9%C9%C9%CA%CA%CA%CB%CB%CB%CC%CC%CC%CD%CD%CD%CE%CE%CE%CF%CF%CF%D0%D0%D0%D1%D1%D1%D2%D2%D2%D3%D3%D3%D4%D4%D4%D5%D5%D5%D6%D6%D6%D7%D7%D7%D8%D8%D8%D9%D9%D9%DA%DA%DA%DB%DB%DB%DC%DC%DC%DD%DD%DD%DE%DE%DE%DF%DF%DF%E0%E0%E0%E1%E1%E1%E2%E2%E2%E3%E3%E3%E4%E4%E4%E5%E5%E5%E6%E6%E6%E7%E7%E7%E8%E8%E8%E9%E9%E9%EA%EA%EA%EB%EB%EB%EC%EC%EC%ED%ED%ED%EE%EE%EE%EF%EF%EF%F0%F0%F0%F1%F1%F1%F2%F2%F2%F3%F3%F3%F4%F4%F4%F5%F5%F5%F6%F6%F6%F7%F7%F7%F8%F8%F8%F9%F9%F9%FA%FA%FA%FB%FB%FB%FC%FC%FC%FD%FD%FD%FE%FE%FE%FF%FF%FF!%FE%1DCreated%20by%20Renegade%20with%20GIMP%00%2C%00%00%00%00%84%03*%00%00%08%FE%00%01%08%1CH%B0%A0A%82%01%12*%14%C0%90%E1%80%87%03%08H%94X%A0b%01%03%18%0Fh%3C%80%A0c%82%8F%09%14%88T%B0%A0%24%03%06%0DR%3AX%F9%E0%01%84%97%10%22%C8%94%20a%C2%04%0A8%2B%E8%B4p%E1%02%86%9F%19%82j%D0%B0a%03%87%0EH%3Dx%F8%F0%01D%88%10%22D%8C%98J%82D%09%13%26Nh%D5%8A%22%85%D7%AF%60%BF%AA%18Kv%EC%8A%B3h%D3%AE%60%C1%B6-%DB%16p%E3%CA%8D%EB%A2%AE%DD%BA%2F%F2%EA%DD%FB%02%86%DF%BF~c%08%1ELx%B0%8C%C3%88%0F%CFX%CC%B8%F1%0C%1A%90%23C%AEA%B9%B2%E5%CA62k%CE%7C%A3%B3%E7%CF7p%88%1E-%3A%87%E9%D3%A8M%EBX%CDz%F5%8E%D7%B0c%BF%E6A%BB6%ED%1E%B8s%EB%C6%ED%A3%B7%EF%DE%3F%82%0B%1F%FE%03%88%F1%E3%C6%83(_%CE%7C%B9%90%E7%D0%9F%0F%99N%BD%FA%10%22%D8%B3c%2F%C2%BD%BB%F7%EEF%C2%FE%8B%0F%7F%A4%BC%F9%F3G%90%A8W%8F%BE%FD%F8%F1%DF%E3s%D7%AE%DD%BA%FD%E8%D1%9B%EBW%8E%1C9%F1%FF%BF%FD%B6%DB%80%3D%D8f%9Bl%08%EE%D0Zk%A95%98%03i%A4%81%26%E1f%9B%5Df!e%92I%E6%D8%86%89%25V%D8%87%82%01%06%18_%24%DEu%D7%5C(%C2%E5%96%5Bj%B5XVYa%C5%E8%D5VZaUBUS%8D%10%D5S%20%80%F0%81RHu%C0%01%07%1B%0C%15T%06%3Fa%D0%93%05%16%E8%84%13%056M%20%81L%11%C0%04AK%0F%AC%94R%03'1P%D2H%0A%80%94%40G%08lt%00F%06XT%C0D%12A4%40C%0C)%A4%D0At%D6i%E7%9D%06%C9%99%10%9C%02%B8%C9%26%01j%A2i%80%99%1E%81%04%A6I%5Dn%C9RK0Q%19AM6%3DY%01%93%3C%F5%04%94PD%0DyT%07J5%E5%D4SQ%E5X%C2%A8X%95%8A%C2%A9%A8%9E*c%8C%2F%92%85%D6%8A%FEm%A5%88%A2%89.%F0%25%E2_%20~%D8!b%8Ce%18%D9%855P(!h%10%8E%96%DA%82%AD%CDf%E0%B2%03%06%E8%C3%7F%FD%F5%B7_%10%D1%D9w%1D%7D%D9%15%11%1Ex%E3%A1%B7%DE%B7%EA%25!%EE%B8I(a%EE%B9J%2C%A1%EE%BA%EB2%E1%AE%BBM%C4%2Bo%BCN%D4k%EF%13%F8%E2%0B%C5%BE%FC%EE%1B%05%14Q%04%2C%B0%14%04Oa%B0%C1%04K!%B0%C0%00%F7%DBo%BE%F8%DAk%EF%BC%F3%BE%EB.%BB%18%A3%7B.%B9%E3%82%FB-z%EFq%5B%04%B6%D9Y%9B%DF~%D1%FAG%9C%B3%03.%BB%ECk%C8%B2%96Z%B1%A2%0D%FB%19%85%C0%FA%0A%19c%BB%1E%96ka%B7%FA%C5%17%AD%B2%CE%05%2B%5Bh%B5%3A%D6%AAa%A5%8A%EA%09%A5%9A0%EA%8DS%ED%C8%A3%8F%3F%22%A5iQ%1A%1C%F9SO%17PZ%C1%93Q%D2D%25LXj%99R%97%5E.%00%A6%98dn%24%A8%9A%7F%BA%C9%A7%9E%01%E0%A9%F7%FE%DEz%E3%1D%00%9CnF%C4%A6%9A%17%A1I(%99b%82IRI%0B%24%AA%E8J%0E%60i%25%954%D1%14%E5%93%14%E84)%93%60'y%E4PD%15e%94%A6C%06i%FA%E9%A8%A7%AE%FA%E9J%B5%EE%FA%EB%B0%C7.%3BS%B4%D7n%FB%ED%B8%E7N%7B%8F%BC%F7%EE%FB%EF%3D%3E%25%FC%F0%C4%17%1F%95%08%C3%1F%AF%FC%F2%CB%E7%E8%FC%F3%CEW%25%3DU%D2Wo%7DUSg%AF%FD%D4Q_%15%F5%F7X%D1(%FEVN%97o%3E%D3%5E)%AD~%8B%EC%B7%AF%BE%D2%E8%A7%60%FE%FCO%8F%2F%3E%F8%E0%7Bo%E3%F6%FC%DFx%FD%FF%24%A0%DE%F4%A0G%C0%AA1%EF%80%C7K%9E%D5%8A%C7%40%E2%01%EF%81%C0%D3%9D%04'%98%3B%D9Y%F0%82%B2%5B%9D%067%98%3A%D2%0DItE2RP%92%046%B19%89l6%A9%DC%94db%A5%B4AnK%5C%3A%09%E3%DC%F66%90%90%A9LrC%13%E1%EAf%B7%86%F8%8Do%FE%40%0CbA%F0%C6%A7%3E%F9i%22%84%13%D4%A06rC1%85d%243d%DB%E3%20'%B9F%CD%A4r%97%93%D4N8g)%CFaj(%20%14%9D%07%C7H%C62%9A%F1%8Cd%E4%A0%1A%D7%98%3A%0C%BA%F1%8DK%F9%D1%05)HGOA%F0%8E%BFk%A0%1E%F7(%3C%04%FA%F1x%05%0Cd%8E%02%18%3D%00%1A%B2%7F%88L%E4%F6%0Ci%C8%E7%11R%90%05%FC%E3%1F%F9HI%06%E2%F1%92%BD%AB%23%051%C8%148z2%83l%0C%E5%1A%D1H%CAR%9A%92Ha%0C%A1%08%91D%C2%251Is%98%2B%5B%E5%CE%86%B6%96%40Nm1%94!%E3jh%C3%B8%E5P%87t%9BH%E0%8A%887!%1A3%88~%E3S%E0%FE%94DA%1D%AEP%1F9%14%E3%A48%C5%C8U%F1%25%94%C3b%A4r%A29Ju%CE%8B%19%00%5D%E8%C2x%CAr%9A%F3%9C%E8%14%A5%3A%D7%C9%C1O%BA%F3%9D%EF%D4%A4%3C'%88%C9z%3E%B0%92%F8%FE%B4%A7%3E39%CF~%DE%0E%9E%00%0D%A8%05%D9I%D0%82%06%09%9D%08M%A8B%3F%98Jqz%AD%95a%7B%25%2Cq%22K%B3%B1%B0%96%B6%7C%E1%96%D86C%5E%8E%C9%97%1AQ%E2%0E%D94L8%FD%F0%98(%ED%1B%11%95%B9%CC%C1%05%CA%99Llb%E2%A08M%C7%A9%E4%96%D7%8CI6-%B7Mnn%8E%8B%3EI%12%06%8ED%D4%2F%8A%F3%A8HM%AAR%97%CA%D4%A6%3A%F5%A9P%8D%AAT%A7*%CETZ%F5%AAX%CD%AAV%B7%CA%D5%AEz%B5(%0B%0D%ABX%13%FA%D5%B2%9A%F5%ACh-%2BU%D7%CA%D6%B6%BA%F5%ADpEjQ%89*T%25%B9R%A2cC%A1%94fI%CB%97%B8P%A3k%EBRGG%E2%C4%1B%E20%A4s%0B%A60Kj%D2b%A6%F4%B1v%F2%DB%DFXzD%24%BE%D4p1E%DCLE%12E%9B%DEtQ.%B1%E2%15y%DAS%CD%FD%14lA%05%E7%5C%E3%CA%DA%D6%BA%F6%B5%B0%8D%FE%ADlgK%DB%DA%DA%F6%B6%B8%CD%ADnw%CB%DB%A4%CE%F5%A1%10%8Dh%93%26%0A%A5%8A%AE%F0%A2~%CD(.%03%AB%CB%2F%11%16n74%93H%15%DB%26%C6%FA%F0%A4%90%CD%EEA%24%5B%C4%C0%09%CE%B2%16Q%A2%998%22%D3hJ%B3%A6'%81!N%B1%14Z%9D%8E%16R%3D%CD%DC%16%81%DA%C5%BA%AA%F6%B7%F8%CD%AF~%F7%CB%DF%FE%FA%F7%BF%00%0E%B0%80%07L%E0%02%1B%F8%C0%08N%B0%82%17%CC%E0%06%3B%F8%C1%10%8E%B0%84%19l_%A1%A2V%B8%C3%CD%2BE%8D%EB(%8C*%D7%010%E4%E8%60%9F%FB%11%C3%8Ew%BA%16%E1a%0F%1B%EBX%ED%BA8O%C9%ECnK%C1%1B%5E%98f%16%9A%E6%A5)%A2%3C%7BKk%B6%17%9B%3B%85%EFM%7C%3A_o%5E%F8%9B%15N%B2%92%97%CC%E4%26%3B%F9%C9P%8E%B2%94%A7L%E5*%5B%F9%CAX%CE%B2%96%B7%CC%E5.%7B%F9%CB%60%0E%B3%98%C7%BC%E5%23%97%90Rx%3Da%FEqS%C8W%E4%267K%B7%0C%B1%88%9DK%E2%12GW%BA%89%A5.%01%BC%5BD%01H%F6%C5%80%86q%8C)%0B%91%3F%01%AA%99%98%7D%26%8E%9F%A8%E3%C6Q%F3%B3%A0%FD%B1%A3T(d%CC%C9%D7%B4h%CE4%7D%CD%CC%E9N%7B%FA%D3%A0%0E%B5%A8GM%EAR%9B%FA%D4%A8N%B5%AAW%CD%EAV%BB%FA%D5%B0%8E%B5%ACgM%EBZ%DB%9A%D4%9A%CE%B4i%D5%BCa6%B7%B9J%1E%EE%B1%9C%05%BBK%8F~%14%A4%BF%C4%08%E1%D6%A4b%88%F4Y%B2y%0B%B4%B4%07%02%ED%C9%12%FA!%86Ft%A25bX%048%F1%BC%3BNo5%7D%2C%E9%20W%1As%BB%FEi%AE%8D%7C%EBv%BB%FB%DD%F0%8E%B7%BC%E7M%EFz%DB%FB%DE%F8%CE%F7%99%D7mB%D3Z%3AJ%7B%FDu%0B%FF%BA%5C%B6%B5%AD%D8%22)%AC%89%F1%9C%E7%8A%18%9A%CF%C4%84%F6%B4'Nmh%F7%D9%BB%DF%A5qE%94%B8%C4%1B%7B%FB%DB%E0v%B4%B8%FE%C7%CD%5E%2B%B9%F7Q*%04%F8%90-%9D%EE%96%AB%9B%DF0%8F%B9%CCgN%F3%9A%DB%FC%E68%CF%B9%CEw%CE%F3%9E%FB%FC%E7%40%0F%BA%D0%87N%F4%A2%1B%FD%E8H%AF%B9%CB%D3m%E9%5E%FB%DA%A2n%BE%12%C1A%3C%EC%83%D39%E1%0AG%F6%99P%9C%E2f%3B%3B%E2%7F%A6%B8%D8%05R%ED%3E%1Bq%C6%1A%2F%9C%8D%3D%FEqC)n%86%22%1Fy%03zLn%93%3B%0A%E5%DAT%F9%CA%9B%8E%EE%A5%FB%FD%EF%80%0F%BC%E0%07O%F8%C2%1B%FE%F0%88O%BC%E2%17%CF%F8%C6%3B%FE%F1%90%8F%BC%E4'O%F9%CA%5B%5E%F0%7Co%BA%DE%9F~%DC%A8%B3%97%EEU%B7%3A%0D%8D%DD%ED%F1n%BD%E1%0E%F7%FAC%CC%5E%ED%B1%BB%BE%E2%16%BF%B8w%0D%7Dhmgd%BC%DD%06y%C8%0D%0ECH%B3%F7%C7%40%9E4%A5I%BBy%80g%FE%F8%C8O%BE%F2%97%CF%FC%E6%3B%FF%F9%D0%8F%BE%F4%A7O%FD%EA%5B%FF%FA%D8%CF%BE%F6%B7%FE%CF%FD%EE%7B%FF%FB%DF%2F%BE%DE%87%0F%F5%BEz%18%CE%CBens%AF%8E%F5%5E%DE%99%E1%C0%1C%A9%EA%DF%F4%EC%D6%BF%FE%FEd%AF%B6%B5%AF%5D%E8l%2F%9B%E3%A6G%5E%E5%E5v%8D%16nr7w%EBUr%26wr%C2G~%E4'~%10%18%81%128%81%14X%81%16x%81%18%98%81%1A%B8%81%1C%D8%81%1E%F8%81%20%18%82%228%82%24X%82%26x%82%25%E8%80%0Exw%E6w~%E8%97~%06'z%A3%D7~%EE%A7u%88%85z%A97%7F%F4%07v%12%87%7F%3E%98%7Fegv%18G%7B%B5Wc%E2%85%7B%B9%A7%7B%9C%05w1%D8%7Bt%F7%7B%0B%C8%80%0D%A8%82%C3%87%82Vx%85X%98%85Z%B8%85%5C%D8%85%5E%F8%85%60%18%86%1EH%85%2B%C8%82Q%F7f%1F%06%83%06%07w3%18%26Y%F7~%C9%16%7F%5D%F7p%10W%7F%F6%F7%83x%08%84A(%84CH%7B%CB%B6q%00hz%DD%D6v%04%18rqw%80%FE%90FE%BF%A7%80Q%D8%88Rh%86%90%18%89%928%89%94X%89%96x%89%98%98%89%9A%B8%89%9C%D8%89%9E%F8%89%A0%18%8A%A28%8A%A4X%8A%A6x%8A%A8%18%8A%8E%E8%88%8B%F8y%A0%D7%7B%B9Dl%23fl%C7%06%87q%A8l%7FH%84%18%B7%83vx%87y%F8%8Bz%B8%87%B27%7B~%F8%87%1C%D7q%8A%A6YJ%B8%84%9D%C5%7B%B0Hw%E4%D6%8A%AB%E8%88%A9X%8D%D6x%8D%D8%98%8D%DA%B8%8D%DC%D8%8D%DE%F8%8D%E0%B8%89%D3%D8%88%AD%E8%8A%C2%06%8B1(%83%8A%E3%86oh%83%A7%87%839%A8%83f%17'%FA%97%10%C0x%8F%82%A6%7F%F3%E8%10%BBH%84ExYG%88%84%86%E5D9f%88%87%88%88%E3%F6%84%E5%B8%90%C07%8E%0E%F9%90%10%19%91%129%91%14Y%91%16y%91%18%99%91%1A%B9%91%1C%D9%91%1E%F9%91%20%19%92%229%91%0C%B9%90%D0%18g%B0%A8~%B28%8BuV%83%EEx%8Ci%92%FE%8B%BA%B8%8B%FB%E8g%F5%18m%F8%98%93%F9X%8F5%B9%8B%D8F%84%7F%A8v%81(%90%03I%90%8Cf%90%07%E9Y)%89%80'%D9%94%8AX%92P%19%95R9%95TY%95Vy%95X%99%95Z%B9%95%5C%D9%95%5E%F9%95%60%19%96b9%96d%19%96Ny%96T%B7%94*9gp%B7%8E%EC%D8%8E%2F%09%93A%E9%8F%3E%C9%8B%BDX%8F%3A%99%97wr%93%0B%D1%93u%E9%8FA%09%88C)%88%83h%94G%F9vlh%80%E9%88%12j%D9%98%89%88%96%90%19%99%929%99%94Y%99%96y%99%98%99%99%9A%B9%99%9C%D9%99%9E%F9%99%A0%19%9A%A29%9A%A0%E9%98%8E%B9%98k%98%98mH%8BvVz%01%F8%8E%F08%87t%E8%935i%93%7C%A9%97%B8%B97%7C)'%B5yv%FD%E8%8F%FF%08%90%83I%94Ei%94nY%80%AA%99%94%A8%B9%9C%A6%D9%9C%CE%F9%9C%D0%19%9D%D29%9D%D4Y%9D%D6y%9D%D8%99%9D%DA%FE%B9%9D%DC%D9%9D%DE%F9%9D%E0)%9D%CB9%9E%A9%99%9C%08%E7%96%86Y%8B%0B%17%800%89%8B2I%97u%D9%9B%BB9'%B9Y%9F%404%9F%7BR%9Bu%99q%C5%18%94%ED%F9%9A%DC6%88%84%B8%8C%EBh%9ELH%9E%08%CA%98%E1%B9%A0%0C%DA%A0%0E%FA%A0%10%1A%A1%12%3A%A1%14Z%A1%09%8A%A0%06%CA%92%EB%98%9E%02zX%EC)%97%81%09%9C%7B%16%9F%B5%89%9F8i%9F(jL%26%DA%97%FA%B9%9F%3F%09%9C%81)%980%09%A0%01%DA%A1%8B%96%9E%05y%9C%3Az%9C%19%DA%A3%3E%FA%A3%40%1A%A4B%3A%A4DZ%A4Fz%A4H%9A%A4J%BA%A4L%DA%A4N%FA%A4J%BA%A3Rz%9C8J%906%EA%8E%F0w%8C1%CAl%C0%E9%A2%AB'%9F%2Bz%A2)%3A%A6%8F%15%A6%FB%E7%97.*%A2%C1i%7B%C7H%A3%02h%A3UJ%90S%3A%A7%05%0A%A5vz%A7x%9A%A7z%BA%A7%7C%DA%A7~%FA%A7NJ%A7%82J%83%FEq%AA%9E%02%EA%A6%ED)%87%EF%09%9F.%DA%9B%F4%B8%A2d%1A%A9%D3f%A6%F9%E9%A8%5E%FA%A20%BA%A5B%F9%9Fn%CAvWZ%A8%A0j%9C%83%3A%AA%A4Z%AA%A6z%AA%A8%9A%AA%AA%BA%AA%AC%DA%AA%AE%FA%AA%B0%1A%AB%B2*%A8%A1Z%AB.y%A5%1E%8A%A8%89%EA%9E1%AA%A6%23%EA%A5%8E%FA%A8a*%A9%C4%8A%7F%94Z%A9%96z%A9%98%9A%A9%9A%BA%A9%BB%DA%A9%AF%89%AB%D2%DA%A1%B6Z%AD%D6z%AD%D8%9A%AD%DA%BA%AD%DC%DA%AD%DE%FA%AD%E0%1A%AE%E2%3A%AE%D9%3A%AD%E6%BA%9E%D0%9A%A5%BB%DA%AC%F1%D8%A5%CAj%97%25z%AC%C5%3A%AF%F8x%AC%BC%19%AC%80%F3%AE%FC%A9%A6%EC*%9C%BB%3A%9C%E9%1A%B0%9Ez%AE%04%5B%B0%06%7B%B0%08%9B%B0%0A%BB%B0%0C%DB%B0%0E%FB%B0%10%1B%B1%12K%B0%02%5B%B1%EA%FA%AF%B1%D9%AB%BE%BAX%EF%8A%AF%2Cf%AF%F4%1A%B2%B8i%AF%F7%EA%B1%FC%F8%AE%1B%EBR%FD%EA%AC%18%1B%FE%90%16%FB%B2%13%1B%B32%3B%B34%5B%B36%7B%B38%9B%B3W%FA%B2%3C%0B%9B-%CBu%EC%9A%B2%1C%AB%AC%26%7B%5D%24%2B%A6%22%9B%B4(z%B4%25%5B%B4%BE%A9%AFB%CBL%2B%1B%98%3F%5B%B5%18%DB%B3X%9B%B5Z%BB%B5%5C%DB%B5%5E%FB%B5%60%1B%B6b%3B%B6%BAj%B5f%AB%A5S%3B%97Q%3B%B4%FA%EA%B4F%CB%B4J%1B%B7r%0B%7BL%DB%B4n%7B%B2%FA%8Avk%DB%9Fi%DB%B7T%7B%B6%80%1B%B8%82%3B%B8%84%5B%B8%86%7B%B8%88%9B%B8%8A%BB%B8%82%EB%B7%8E%AB%B6%7B%3B%93yk%5Dwk%9BuK%9Fs%9B%B9%9A%1BY%97%1B%7B%95%3B%8C%93%BB%9F%91%3B%BA)%FB%B8%A6%7B%BA%A8%9B%BA%AA%BB%BA%AC%DB%BA%AE%FB%BA%B0%BBl%A4%3B%BB%22%1A%BA%C0%FA%B9w%D9%B9r%B2%B9%BC%DB%BB%D9%A5%BB%F3%89%BB%F8j%BB%C4%9B%B7%B4%7B%BC%C8%9B%BC%CA%BB%BC%CC%DB%BC%CE%FB%BC%D0%9B%B2%C5%3B%BD%97*%BC%C1%BE%0A%BC%BB%E9%BB%DA%BB%BD%14%87%BD%C1k%BD%C1J%BD%E2%AB%AC%D1%5B%BE%E6%7B%BE%E8%9B%BE%EA%7B%BE%E3%DB%BE%FB%09%BE%D7%EB%BD%B7%C9%BD%F4%5B%BF%C5*%BF%F8k%AF%F0%BB%BF%FC%DB%BF%FE%FB%BF%00%1C%C0%02%3C%C0%D6%9B%BF%06%3C%AC%F6%9B%C0%0A%BC%C0ur%C0%0El%A6%04%1C%C1%12%3C%C1%14%5C%C1%16%3C%C1%0F%9C%C1%F8%C9%C0%1C%DC%C1%1E%BC%B4%1A%1C%C2%22%3C%C2%24%5C%C2%26%7C%C2(l%8F%1F%BC%C2%2C%DC%C2.%FC%C20%1C%C32%3C%C34%5C%C36%7C%C38%9C%C3%3A%BC%C3%3C%DC%C3%3E%FC%C3%40%1C%C4B%3C%C4D%5C%C4F%7C%C4H%9C%C4J%BC%C4L%DC%C4N%FC%C4P%1C%C5RL%C3%01%01%00%3B";
const showlistbg = "data:image/gif,GIF89a%2C%01%01%00%E7%80%00%00%00%00%01%01%01%02%02%02%03%03%03%04%04%04%05%05%05%06%06%06%07%07%07%08%08%08%09%09%09%0A%0A%0A%0B%0B%0B%0C%0C%0C%0D%0D%0D%0E%0E%0E%0F%0F%0F%10%10%10%11%11%11%12%12%12%13%13%13%14%14%14%15%15%15%16%16%16%17%17%17%18%18%18%19%19%19%1A%1A%1A%1B%1B%1B%1C%1C%1C%1D%1D%1D%1E%1E%1E%1F%1F%1F%20%20%20!!!%22%22%22%23%23%23%24%24%24%25%25%25%26%26%26'''((()))***%2B%2B%2B%2C%2C%2C---...%2F%2F%2F000111222333444555666777888999%3A%3A%3A%3B%3B%3B%3C%3C%3C%3D%3D%3D%3E%3E%3E%3F%3F%3F%40%40%40AAABBBCCCDDDEEEFFFGGGHHHIIIJJJKKKLLLMMMNNNOOOPPPQQQRRRSSSTTTUUUVVVWWWXXXYYYZZZ%5B%5B%5B%5C%5C%5C%5D%5D%5D%5E%5E%5E___%60%60%60aaabbbcccdddeeefffggghhhiiijjjkkklllmmmnnnooopppqqqrrrssstttuuuvvvwwwxxxyyyzzz%7B%7B%7B%7C%7C%7C%7D%7D%7D~~~%7F%7F%7F%80%80%80%81%81%81%82%82%82%83%83%83%84%84%84%85%85%85%86%86%86%87%87%87%88%88%88%89%89%89%8A%8A%8A%8B%8B%8B%8C%8C%8C%8D%8D%8D%8E%8E%8E%8F%8F%8F%90%90%90%91%91%91%92%92%92%93%93%93%94%94%94%95%95%95%96%96%96%97%97%97%98%98%98%99%99%99%9A%9A%9A%9B%9B%9B%9C%9C%9C%9D%9D%9D%9E%9E%9E%9F%9F%9F%A0%A0%A0%A1%A1%A1%A2%A2%A2%A3%A3%A3%A4%A4%A4%A5%A5%A5%A6%A6%A6%A7%A7%A7%A8%A8%A8%A9%A9%A9%AA%AA%AA%AB%AB%AB%AC%AC%AC%AD%AD%AD%AE%AE%AE%AF%AF%AF%B0%B0%B0%B1%B1%B1%B2%B2%B2%B3%B3%B3%B4%B4%B4%B5%B5%B5%B6%B6%B6%B7%B7%B7%B8%B8%B8%B9%B9%B9%BA%BA%BA%BB%BB%BB%BC%BC%BC%BD%BD%BD%BE%BE%BE%BF%BF%BF%C0%C0%C0%C1%C1%C1%C2%C2%C2%C3%C3%C3%C4%C4%C4%C5%C5%C5%C6%C6%C6%C7%C7%C7%C8%C8%C8%C9%C9%C9%CA%CA%CA%CB%CB%CB%CC%CC%CC%CD%CD%CD%CE%CE%CE%CF%CF%CF%D0%D0%D0%D1%D1%D1%D2%D2%D2%D3%D3%D3%D4%D4%D4%D5%D5%D5%D6%D6%D6%D7%D7%D7%D8%D8%D8%D9%D9%D9%DA%DA%DA%DB%DB%DB%DC%DC%DC%DD%DD%DD%DE%DE%DE%DF%DF%DF%E0%E0%E0%E1%E1%E1%E2%E2%E2%E3%E3%E3%E4%E4%E4%E5%E5%E5%E6%E6%E6%E7%E7%E7%E8%E8%E8%E9%E9%E9%EA%EA%EA%EB%EB%EB%EC%EC%EC%ED%ED%ED%EE%EE%EE%EF%EF%EF%F0%F0%F0%F1%F1%F1%F2%F2%F2%F3%F3%F3%F4%F4%F4%F5%F5%F5%F6%F6%F6%F7%F7%F7%F8%F8%F8%F9%F9%F9%FA%FA%FA%FB%FB%FB%FC%FC%FC%FD%FD%FD%FE%FE%FE%FF%FF%FF!%FE%1DCreated%20by%20Renegade%20with%20GIMP%00%2C%00%00%00%00%2C%01%01%00%00%08%A6%00%01%08%1CH%B0%20%C1%00%08%05%08%18%C0%90%80%C3%02%10%0D%188%40%11%81%C5%04%18%15(X%C0%91%81%C7%06%0D%1C%88%7C%40%12%82%C9%08%11%24%A8%9C%C0%92%82%CB%0A%15%2C%C8%BC%40%13%83%CD%0C%194%E8%DC%C0%93%83%CF%0E%1D%3C%08%FD%40%14%04%88%10HE(%5D%CA%B4%A9%D3%A7P%A3J%9DJ%B5)%D2%10F%89~%10%EA%01%A8O%0E%3C7%E8%D4%80%D3%26%06%9A%17dZ%80%E9%92%02%CB%09*%25%A04%09%81%E4%03%91%0E%40zd%C0q%81F%8C%09%2C%22%A0x%40%22%C4%02%0E%090%1C%A0%10a%00%83%90%0B%06%04%00%3B";


// ########### CSS handling ###########
if(head) {
	cssElem = document.createElement("style");
	cssElem.id = "lg15plusstyle";
	cssElem.setAttribute("type", "text/css");
	cssElem.appendChild(textnode("/* This is LG15+'s custom style.*/"));
	head.appendChild(cssElem);
}

if(show == "lg15-outbreak") {
	updateCSS("body {background: #0A1332 url(http://static.themes.eqal.com/outbreak/bg.jpg) no-repeat scroll center top;\
	}\
	.box.feature {\
		background-color: transparent;\
	}\
	a, a:focus, a:visited, a:hover, a:active, a:link {\
		color: #FFFFFF;\
	}");
}

if(show == "lg15-thelast") {
	updateCSS("body {background: #000000 url(http://static.themes.eqal.com/thelast/bg.gif) repeat scroll 0 0;}");
}

if(show == "theresistance") {
	updateCSS("body {background: #000000 url(http://static.lg15.com/themes/theresistance/img/bg.gif) repeat scroll 0 0;}\
		a, a:focus, a:visited, a:hover, a:active, a:link {\
			color: #6DB43F;\
	}");
}

if(show == "lg15-lonelygirl15") {
	updateCSS("body {background: #F2F2F2 url(http://static.themes.eqal.com/lonelygirl15/bg.jpg) no-repeat scroll center top;}");
}

if(show == "lg15") {
	updateCSS("#blog input[type=\"submit\"], #page input[type=\"submit\"], #about input[type=\"submit\"], #profile input[type=\"submit\"], button#savechanges, .styled-button {\
	border-color: #a80404 #820303 #750202 #9c0303;\
	background-image: url(\"" + buttonbg + "\");\
	background-position: center center;\
	background-repeat: repeat-x;\
	}"); // this changes the button style

	updateCSS("#head.box {\
		background-image: url(\"" + sitenavbg + "\");\
		background-repeat: no-repeat;\
		background-position: top center;\
		position: relative;\
		top: 0px;\
		left: 0px;\
		float: none;\
	}\
	#forumHomeBreadcrumbHolder ul.path {\
		border-bottom: 1px solid #333333;\
		border-top: 1px solid #333333;\
	}\
	ul.path li {\
		border: none;\
	}");
	
	updateCSS(".showlist li {\
		background-image: url(\"" + showlistbg + "\");\
		background-position: center center;\
		background-repeat: repeat-y;\
		background-color: #000000;\
	}\
	.showlist li:hover {\
		background-color: #000000;\
	}\
	#secondary .box-list ul li .box #showlist_module ul.showlist li {\
		border-color: #444444 #111111 #111111 #444444;\
		border-style: solid;\
		border-width: 1px !important;\
		margin-bottom: 2px;\
	}\
	#secondary .box-list ul li .box #showlist_module ul.showlist li:hover {\
		border-color: #666666 #333333 #333333 #666666;\
	}");
}

// leaving this for all for the moment
updateCSS("#head #main-nav li {\
		padding: 0 3em 0 0;\
	}\
	#head #sub-nav li {\
		padding-left: 1em;\
	}\
	#head #sub-nav li, #head #sub-nav li div, #head #sub-nav li div a {\
		font-size: 9pt;\
	}\
	#messages-nav li.selected {\
		background-color: #151515;\
	}\
	#messages-nav li.selected a {\
		font-weight: bold;\
	}\
	.ugc {\
		overflow: visible; /* part of the video-overlaying-userbar fix */\
}");

// this fixes the menu-overlaying-everything bug // we'll have to see if it was put there for a reason
if(document.getElementById("head")) document.getElementById("head").removeAttribute("style");

// ########### account for other browsers and non-devs ###########

// ########### actual code starts here ###########

// fixes URLs
if(!/LG15/i.test(document.title)) {
	document.title = "LG15 - " + document.title;
}

if(blog || forumPage || forumHomepage) {
	if(DEBUG) console.info("ID:page prettyfication starting.");
	updateCSS("#page {overflow-x: visible;}\
		BODY {\
			font-size: 10pt;\
	}"); // fixes jumpy navbar, font size
	
	var mainElement = null;
	if(blog) {
		mainElement = blog;
	} else if(forumPage) {
		mainElement = forumPage;
	} else if(forumHomepage) {
		mainElement = forumHomepage;
	}
	
	var pageHeader = document.getElementById("page-header");
	pageHeader.removeAttribute("onclick"); // fucking incompetent assholes
	
	if(show == "lg15") {
		updateCSS("#headerLink {\
			display: block;\
			height: 355px;\
			margin-left: auto;\
			margin-right: auto;\
			width: 956px;\
			background-color: transparent;\
		}\
			#page-header.container {\
			padding: 0px;\
			height: auto;\
		}"); // fixes header link
		
		// seriously, have these morons ever heard of display: block;?
		var brandingParent = document.getElementById("branding").parentNode;
		brandingParent.removeChild(document.getElementById("branding"));
		brandingParent.insertBefore(createAnchor({url: "/", id: "branding", classes: "box"}), brandingParent.firstChild);
		updateCSS("#branding {display: block;}");
		
		var headerLink = document.createElement("a"); // oh look...yet another non-functional header-link! way to go, EQAL!
		headerLink.href = "/";
		headerLink.id = "headerLink";
		pageHeader.insertBefore(headerLink, pageHeader.firstChild);
	}
	
	if(show == "theresistance") {
		updateCSS("#branding.box {\
			float: none;\
			margin-left: 0px;\
			margin-right: 0px;\
			}\
			span.wideLoad {\
				font-size: 8pt;\
		}"); // what the FUCK EQAL? // fixes moronic EQAL layouting that prevented overflow-x: visible; from working
		
		// fixes the three-letter chapter selectors
		var chapterList = document.getElementById("serial-blog-list");
		var cLLI = chapterList.getElementsByTagName("li");
		for(var i = 0; i < cLLI.length; ++i) {
			var thaSpan = cLLI[i].getElementsByTagName("span")[0];
			if(thaSpan.firstChild.length > 2) {
				thaSpan.setAttribute("class", "wideLoad");
			}
		}
	}
	
	// fixes EQAL link
	var EQALlogoHolder = document.getElementById("eqal-logo").parentNode;
	EQALlogoHolder.removeChild(document.getElementById("eqal-logo"));
	EQALlogoHolder.appendChild(createAnchor({url: "http://www.eqal.com", id: "eqal-logo"}));
	updateCSS("#foot #eqal-logo {display: block;}");
	if(DEBUG) console.info("ID:page prettyfication done.");
	
	// fixing moronic disabling of the secondary navigation
	//updateCSS("#blog {margin-top: 2em;}"); // should be fixed through re-arrangement of 2nd nav back into navigation
	
	// fixing chat link
	if(document.getElementsByClassName("nav-chat")[0]) document.getElementsByClassName("nav-chat")[0].getElementsByTagName("a")[0].href = "http://bit.ly/lg15chat";
	
	// friends list on profile pages
	var friendsDigest = document.getElementById("profile-friend-digest-list");
	if(friendsDigest) {
		//friendsDigest.removeChild(friendsDigest.lastChild);
		var friendsWithIdentities = friendsDigest.getElementsByClassName("identity");
		for(var i = 0; i < friendsWithIdentities.length; ++i) {
			var link = friendsWithIdentities[i].getElementsByClassName("username")[0].firstChild;
			link.innerHTML = link.innerHTML.replace(" ", "<br>"); // fugly, but I'm not in the mood for splitting, creating, injecting
		}
		
		updateCSS(".friend-list-medium li, .friend-list-large li, .friend-list-xlarge li {\
			width: 70px;\
		}");
	}
	
	// this adds clickable links for specific posts
	var commentsOrPosts = document.getElementsByClassName("discussion-post-wrapper"); //discussionResponseHolder
	if(commentsOrPosts) {
		for(var i = 0; i < commentsOrPosts.length; ++i) {
			// get info
			var postId = commentsOrPosts[i].getElementsByClassName("ugc")[0].id;
			var injectionPoint = commentsOrPosts[i].getElementsByClassName("last")[0];
			
			// create link
			var betterLink = createAnchor({ url: "#" + postId, text: injectionPoint.firstChild.nodeValue, classes: "permaLinks", title: "Direct link to this post"});
			
			// clean up and replace
			injectionPoint.removeChild(injectionPoint.firstChild);
			injectionPoint.appendChild(betterLink);
		}
	}
	if(forumPage) {
		var commentsOrPosts = document.getElementsByClassName("discussion-post-body");
		if(commentsOrPosts) {
			for(var i = 0; i < commentsOrPosts.length; ++i) {
				// get info
				var postId = commentsOrPosts[i].id;
				var injectionPoint = commentsOrPosts[i].parentNode.getElementsByClassName("discussionPostCount")[0];
				
				// create link
				var betterLink = createAnchor({ url: "#" + postId, text: injectionPoint.firstChild.nodeValue, classes: "permaLinks", title: "Direct link to this post"});
				
				// clean up and replace
				injectionPoint.removeChild(injectionPoint.firstChild);
				injectionPoint.appendChild(betterLink);
			}
		}
	}
	updateCSS(".box ul.horiz li a.permaLinks {color: #CCCCCC;} .box ul.horiz li a.permaLinks:hover {text-decoration: underline;}");
	
	// this adds the toggle header link
	if(show == "lg15") {
		var toggleHeaderLink = createAnchor({ url: "#", text: "Toggle Header", id: "toggleHeaderLink", title: "Toggle header on or off"});
		toggleHeaderLink.addEventListener("click", toggleHeader, false);
		pageHeader.insertBefore(toggleHeaderLink, pageHeader.firstChild);
	}
	updateCSS("#toggleHeaderLink {position: absolute; top: 4px; right: 5px; font-size: x-small; text-transform:uppercase;}");
}

if(blog || serialBlog) {
	// this fixes the video-overlays-navbar issue
	var videoEmbeds = document.getElementsByTagName("object");
	if(videoEmbeds) {
		var existingWModes = document.getElementsByName('wmode');
		if(existingWModes && (existingWModes.length >= videoEmbeds.length)) {
			for(var i = 0; i < existingWModes.length; ++i) {
				existingWModes[i].value = "opaque"; // oh hey, we're EQAL, let's pick the moronic, resource-intensive option!
			}
		} else {
			var magicFixParam = document.createElement("param"); // hard to track down JavaScript-conflict my ass, Miles
			magicFixParam.name = "wmode";
			magicFixParam.value = "opaque";
			for(var i = 0; i < videoEmbeds.length; ++i) {
				videoEmbeds[i].appendChild(magicFixParam.cloneNode(true));
			}
		}
	}
}

if(navbar) {
	updateCSS("#u-social {background-image: url(\"" + navbarbg + "\"); \
	background-repeat: repeat-x; \
	background-color: #0d0d0d;\
	font-size: 13px;}\
	#u-social a#navbartoggle {\
		position: fixed;\
		bottom: 34px;\
		right: 5px;\
		font-size: x-small;\
		visibility: visible;\
		text-transform:uppercase;\
		cursor: pointer;\
		line-height: 1em;\
	}");
	
	if((show == "lg15") || (show == "lg15-thelast")) {
		updateCSS("/*#u-social a, #u-social a:visited, #u-social a:hover, #u-social a:active, #u-social a:link, #u-social a:focus {\
			color: #c20404;}*/\
		#u-social ul.horiz li a:hover {\
			color: #CF0303;\
		}\
		#u-social a#navbartoggle {\
			color: #a80404;\
		}");
	}//
	
	if(show == "lg15-lonelygirl15") {
		updateCSS("#u-social, #u-social ul.horiz li a, #u-social a {\
			color: #416cad;\
		}\
		#u-social ul.horiz li a:hover {\
			color: #5E9DFB;\
		}\
		#u-social a#navbartoggle {\
			color: #285394;\
		}");
	}
	
	if(show == "theresistance") {
		updateCSS("#u-social, #u-social ul.horiz li a, #u-social a {\
			color: #4f822e;\
		}\
		#u-social ul.horiz li a:hover {\
			color: #6DB43F;\
		}\
		#u-social a#navbartoggle {\
			color: #6DB43F;\
		}");
	}
	
	if(show == "lg15-outbreak") {
	updateCSS("#u-social, #u-social ul.horiz li a, #u-social a {\
			color: #777777;\
		}\
		#u-social ul.horiz li a:hover {\
			color: #AAAAAA;\
		}\
		#u-social a#navbartoggle {\
			color: #555555;\
		}");
	}
	
	if(userlink) userlink.getElementsByTagName("a")[0].addEventListener("click", navBarOpen,false);
	if(document.getElementById("u-social-close")) document.getElementById("u-social-close").getElementsByTagName("a")[0].addEventListener("click", navBarClose,false);
	if(document.getElementById("u-social-messages")) document.getElementById("u-social-messages").getElementsByTagName("a")[0].addEventListener("click", navBarOpen,false);
	if(document.getElementById("u-social-search")) document.getElementById("u-social-search").getElementsByTagName("a")[0].addEventListener("click", navBarOpen,false);
	var navbarShowHide = createAnchor({/*url: "javascript:$usocial.hide(); void(0);",*/ text: "Hide Navbar", id: "navbartoggle"});
	navbarShowHide.addEventListener("click", toggleNavbar,false);
	navbar.appendChild(navbarShowHide);
}

function toggleNavbar(event) {
	var anchor = document.getElementById("navbartoggle"); // event.target; changing that to make function work independent from event
	if(!anchor) return;
	var hidden = (navbar.style.visibility == "hidden");
	if(hidden) { // if hidden, reveal it
		anchor.firstChild.nodeValue = "Hide NavBar";
		navbar.style.visibility = "visible";
		//anchor.href = "javascript:$usocial.unHide(); void(0);";
		anchor.style.bottom = "34px";
		save("navbar", "visible");
	} else { // if not hidden, hide it.
		anchor.firstChild.nodeValue = "Show NavBar";
		navbar.style.visibility = "hidden";
		//anchor.href = "javascript:$usocial.hide(); void(0);";
		anchor.style.bottom = "2px";
		save("navbar", "hidden");
	}
}

/*function navbarOpenClose(event) {
	isOpen = (navbar.style.height != "32px");
	if(!isOpen && navbarShowHide) navbarShowHide.style.bottom = "394px";
	if(isOpen && navbarShowHide) navbarShowHide.style.bottom = "34px";
}*/

function navBarOpen(event) {
	navbarShowHide.style.bottom = "394px";
}

function navBarClose(event) {
	navbarShowHide.style.bottom = "34px";
}

if(sitenav) {
	/*var showList = sitenav.getElementsByTagName("select")[0]; // removed by EQAL during v3 beta 1
	if(showList.name == "showlist") {
		showList.options[0].setAttribute("value", "#"); // fixes SHOWS options bug
		showList.options[0].removeAttribute("vale");
	}
	
	// this fixes alignment of the subnav // old way looks better with new show list
	var subnav = document.getElementById("sub-nav");
	if(subnav) subnav.removeAttribute("style");*/
	var showMenu = document.getElementById("showMenu");
	if(showMenu) {
		var listOfShows = showMenu.getElementsByTagName("li");
		for(var i = 0; i < listOfShows.length; ++i) {
			if(listOfShows[i].firstChild.href == "javascript:void()") {
				listOfShows[i].firstChild.href = "javascript:void(0);";
				break;
			}
		}
	}
}

// this function toggles the header on and off, dependending on previous state
function toggleHeader(event) {
	var header = document.getElementById("headerLink");
	var menu = document.getElementById("head");
	var branding = document.getElementById("branding");
	if(header && menu && branding) {
		if(header.style.display == "none") { // if it is hidden, make it visible
			header.removeAttribute("style"); // just removing those to ensure the original style is fully restored
			//menu.removeAttribute("style");
			/*branding.style.position = "absolute";
			branding.style.marginTop = "0px";*/
			branding.removeAttribute("style");
			document.body.removeAttribute("style");
			save("header", "visible");
		} else { // if it's visible, hide it
			header.style.display = "none";
			//menu.style.top = "130px";
			//branding.style.position = "static";
			branding.style.marginTop = "20px";
			document.body.style.backgroundImage = "none";
			save("header", "hidden");
		}
	}
}


// this figures out what style we're looking at
function getShow() {
	if(head) {
		var links = head.getElementsByTagName("link");
		for(var i = 0; i < links.length; ++i) {
			var whereTheHellAreWe = /static\.lg15\.com\/themes\/(.*)\/css\/theme/.exec(links[i].href);
			if(whereTheHellAreWe && whereTheHellAreWe[1]) return whereTheHellAreWe[1];
		}
	}
	// this should usually not be reached.
	if(hasGM) GM_log("Error: Could not identify theme used!");
	return "ERROR";
}

var friendsList = document.getElementById("friendsList");
// if there is a friends list on this page, this snippet goes through it and adds a remove friend link on each of them
if(isOwnProfile && friendsList) {
	for(var i = 0; i < friendsList.childNodes.length; ++i) {
		if(friendsList.childNodes[i].tagName == "LI") {
			var friendProfileLink = friendsList.childNodes[i].getElementsByClassName("eqal-viewProfileIcon")[0];
			if(friendProfileLink) { // if only greasemonkey weren't such a bitchy pos
				var friendId = /(10\d+)/.exec(friendProfileLink.href)[1];
				if(friendId) {
					var removeLink = createAnchor({url: "javascript:void(0);", text: "Unfriend", title: "Remove this person from your friends list.", id: "removeLink_" + friendId, classes: "killFriendLink"});
					removeLink.addEventListener("click", removeFriend, false);
					var tempDiv = document.createElement("div");
					tempDiv.appendChild(removeLink);
					friendsList.childNodes[i].appendChild(tempDiv);
				}
			}
		}
	}
}

updateCSS(".killFriendLink {padding-left: 22px;}");

function removeFriend(event) {
	var friendId = /removeLink_(\d+)/.exec(event.target.id)[1];
	if(friendId) {
		if(window.confirm("Are you sure you want to unfriend this person? (User ID #" + friendId + ")")) {
			if(DEBUG) console.info("Received instruction to remove friend #%i", friendId);
			window.location.pathname = "/character/remove_friend/" + friendId;
		}
	}
}


// ########### general helpers ###########
function $(arg) {
	if(typeof arg === "string") {
		return document.getElementById(arg);
	}
	
	// fall-through case, should usually not be triggered
	return false;
}

// making this a little easier this time.
function updateCSS(newCSS) {
	if(cssElem === null) {
		alert("fuck");
		if(DEBUG) console.warn("Could not add new styles, cssElem is null!");
		return false;
	}
	additionalStyles += newCSS;
	cssElem.firstChild.nodeValue = additionalStyles;
}

function textnode(sometext) {
	return document.createTextNode(sometext);
}

function createAnchor(arg) {
	/* takes an object with the following members
		url -> href value
		text -> child textnode
		id -> id
		classes -> classes
		title -> title attribute
		style -> inline style
		all strings
	*/
	var newAnchor = document.createElement("a");
	if(arg.url && (arg.url.length > 0)) {
		newAnchor.href = arg.url;
	}
	if(arg.text && (arg.text.length > 0)) {
		newAnchor.appendChild(textnode(arg.text));
	}
	if(arg.id && (arg.id.length > 0)) {
		newAnchor.id = arg.id;
	}
	if(arg.classes && (arg.classes.length > 0)) {
		newAnchor.setAttribute("class", arg.classes);
	}
	if(arg.title && (arg.title.length > 0)) {
		newAnchor.title = arg.title;
	}
	return newAnchor;
}

// saving to localStorage
function save(option, selection) {
	if(!userId || (userId == "anon") || !hasStorage) return null;
	window.localStorage.setItem(userId + "." + option, selection);
	if(DEBUG) console.info("Stored option %s with value %s. hasStorage is set to %s.", option, selection, hasStorage);
}

// loading from localStorage
function load(option) {
	if(!userId || (userId == "anon") || !hasStorage) return null;
	if(DEBUG) console.info("Retrieving option %s. hasStorage is set to %s.", option, hasStorage);
	return window.localStorage.getItem(userId + "." + option);
}

// ########### more normal code ###########

// set header/navbar according to preferences
if(load("header") == "hidden") {
	toggleHeader(null);
}

if(load("navbar") == "hidden") {
	toggleNavbar(null);
	if(navbar) navbar.style.visibility = "hidden";
}

// LGPedia fixes
if(pedia) {
	/*if(head) {
		var links = head.getElementsByTagName("link");
		for(var i = 0; i < links.length; ++i) {
			var stupidThemeLink = /static\.lg15\.com\/themes/.exec(links[i].href);
			var retardedEQALTheme = /lg15_bricks_skin\.css/.exec(links[i].href);
			if(stupidThemeLink || retardedEQALTheme) { 
				links[i].setAttribute('media', 'hamster');
			}
		}
	}*/
	updateCSS("#global {display: none;}");
	// emulating the EQAL width so layouts don't break
	/*updateCSS("#globalWrapper {width: 952px; margin-left: auto; margin-right: auto;} #column-content {width: 790px} #content {margin: 2.8em 0 0 0em;} #column-one {position: relative; top: 0px; left: 0px;} body {background: #222 url(\"http://www.lg15.com/lgpedia/skins/monobook/bg_bricks_lgpedia.jpg\") repeat-y top center;} .portlet h5 {color: #DDDDDD;}");*/
	if(foot) {
		updateCSS("#foot {background-color: transparent; color: #AAAAAA; font-size: 90%;} #foot a {color: #AA6600;}");
		while(foot.firstChild) {
			foot.removeChild(foot.firstChild);
		}
	}
}

// Placing this at the bottom to ensure everything is loaded
if(foot) {
	updateCSS("#scriptInfo {text-align: center;}");
	var scriptLink = createAnchor({url: "http://userscripts.org/scripts/show/58993", text: "LG15+ " + version, id: "scriptLink", title: "Link to LG15+'s homepage"});
	var scriptInfo = document.createElement("div");
	scriptInfo.id = "scriptInfo";
	
	var scriptEOF = document.createElement("p");
	scriptEOF.appendChild(textnode("This page has been improved by "));
	scriptEOF.appendChild(scriptLink);
	scriptEOF.appendChild(textnode("."));
	
	if((location.hash == "#debug") || DEBUG) {
		var scriptDebug = document.createElement("p");
		scriptDebug.id = "debug";
		scriptDebug.style.fontFamily = "monospace";
		scriptDebug.style.fontSize = "80%";
		scriptDebug.appendChild(textnode("Greasemonkey: " + (hasGM ? "Yes": "No") + " - Storage: " + (hasStorage ? "Yes": "No") + " - Console: " + (console ? "Yes": "No") + (DEBUG ? " - Debug: Yes": "")));
		scriptDebug.appendChild(document.createElement("br"));
		scriptDebug.appendChild(textnode(navigator.userAgent));
		
		scriptInfo.appendChild(scriptDebug);
	}
	scriptInfo.appendChild(scriptEOF);
	foot.appendChild(scriptInfo);
	// add link to http://bit.ly/lg15plus
}
// EOF