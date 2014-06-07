// ==UserScript==
// @name           Darkify IPB 1.3
// @namespace      http://userscripts.org/users/valience
// @description    Forces a dark skin for Invision Power Board 1.3
// @include        http://z10.invisionfree.com/RockmanChaosNetwork/*
// @version        1.3.5
// ==/UserScript==

GM_addStyle(<><![CDATA[
body
 { background: #2C2C2C !important; color: #DEDEDE !important; }
table
 { color: #FFFFFF !important; }
a:link,
a:visited,
a:active,
#navstrip a:hover
 { color: #FF6600 !important; text-decoration: none !important; }
a:hover
 { color: #DEDEDE !important; text-decoration: none !important; }
tr,
td
 { color: #DEDEDE !important; }
.plainborder,
.tableborder
 { background-color: #000000 !important; border: 1px solid #000000 !important; }
.tablefill,
#ucpmenu,
#ucpcontent
 { border: 1px solid #000000 !important; background-color: #343434 !important; }
.forminput,
.textinput,
.radiobutton,
.checkbox
 { border: 1px solid #000000 !important; background-color: #383838 !important; color: #DEDEDE !important; }
#logostrip
 { background: #2C2C2C !important; background-image: none !important;}
#userlinks
 { border: 1px solid #000000 !important; background: #303030 !important; background-image: none !important; color: #DEDEDE !important; }
#userlinks a:link,
#userlinks a:visited,
#userlinks a:active,
.titlemedium a:link,
.titlemedium a:visited,
.titlemedium a:active
 { font-weight: bold !important; font-size: 10px !important; text-decoration: none !important; color: #DEDEDE !important; }
#submenu
 { background: #303030 !important; border: 1px solid #000000 !important; background-image: url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%00D%08%02%00%00%00%C6%09h%7B%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%EEIDATx%DA%ACS%D1%0E%83%20%0C%14%A8%A8%D1%AF%F2%FF%3F%C5g%A3Fa%87g%98%C3L%B2%CC%3E%D4%D6%5E%8F%C3V%D5%B6mq2%E9%FB%BE%AA*%26%F3%3C%CB0%0CZk%E6%CE9m%8C%F1%DE%2B%A5%E0%11%8B%B5%16%95u%5D%19%E8%B2%2C%F1h%9A%06%1E%B1l%DBV%D75%12%80%97e%11%BF%1B%F9%10%04%3C%8EA%04%8FX%23%E2%2B%F8P%C7%99%D34%89%08%7C8%1F%1C%3C%09%3E%F0%B9%DD%DE%FA~%E5%8B%15%A2%B2%FA%D0%C3f%F8%D0%1F%2BD%5D%F8r%FAr%7C%B1r%A0%FE%FD~%B9%FBF%24%BB.%7C%89%3E%D3u%1D%E7%F1e%BE)_%9C%DC%B1%2F%89%3E%83%CD9%F3%E9%E2%D3%B2%F7M%F5a%F9n%F5Q%0C%12J%BA%F0%C5%0AQ%06%3F%C7%AD%BE%94%2F%BDo%CAgw%7B%8E%0F%B2%9F%E4%0B%9B%87%11%13%15%06%85%7C%1C%C7%C8%F7%12%60%00%B6%B0%D3%FC%E9%D6%C1%5B%00%00%00%00IEND%AEB%60%82") !important; }
#submenu a:link,
#submenu a:visited,
#submenu a:active
 { font-weight: bold !important; font-size: 10px !important; text-decoration: none !important; color: #FF6600 !important; }
.maintitle
 { background-color: #000000 !important; background-image: url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%00'%08%02%00%00%00Hi%15%8F%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%01%02IDATx%DA%5CR%5B%0E%830%0Ck%DA%F2%10o%D0%00%09%107%E0%FEW%03%8A%60%EE%C2%3A%BA%7C%B81%89%DD4%82%96e%11Bl%DB%16E%11%12%9A%A6%E9%BA.%22b%A4q%1C%A5%94%E2%13%E7yj%A5%94%E3(K%C8p%04A%00D%8E%9A%0C%C3%F08%0E%A0%25%B0%819%EA%40%E4*%CB2T%20%86%D1%BE%EF%B6.%BE%81%DC%8A%D7uE%06D%AE%EA%BAF%A7%9BOb%06T%E0%07DN%C30%80%B0%DE%18%A3%92%24A%FF%8F7M%03%B1%B3%B0%EFC%057%DFS%A4i%EA%E6%C3%B8%84~%BE%89%B7b9w%B2%8A%FA%BEg1%23u%5D%F7%F4%A3%EE%F5%DA%8C%89%E0%F7A*%CBRk%CDzl%85%8A%A2%F08%FCq%E0%13%23UU%C5%93%F3%AB%2Cg%C2H%98%D7%D3%C7q%FC%7C%3F%E5y%FE%EC%17%7FAm%DBz%1C%EF%F18%F6%E9%F1y%9E%9F%5C%FFyj7%CC%CD%DD%F2o%EE~%16%8E%B7%00%03%00%18%B7%8D%B1%0E%AA%DB%B6%00%00%00%00IEND%AEB%60%82") !important; color: #FF6600 !important; }
.maintitle a:link,
.maintitle a:visited,
.maintitle a:active,
.maintitle a:hover
 { color: #FF6600 !important; text-decoration: none !important; }
.titlemedium
 { background-color: #303030 !important; background-image: url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%00'%08%02%00%00%00Hi%15%8F%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%01%02IDATx%DA%5CR%5B%0E%830%0Ck%DA%F2%10o%D0%00%09%107%E0%FEW%03%8A%60%EE%C2%3A%BA%7C%B81%89%DD4%82%96e%11Bl%DB%16E%11%12%9A%A6%E9%BA.%22b%A4q%1C%A5%94%E2%13%E7yj%A5%94%E3(K%C8p%04A%00D%8E%9A%0C%C3%F08%0E%A0%25%B0%819%EA%40%E4*%CB2T%20%86%D1%BE%EF%B6.%BE%81%DC%8A%D7uE%06D%AE%EA%BAF%A7%9BOb%06T%E0%07DN%C30%80%B0%DE%18%A3%92%24A%FF%8F7M%03%B1%B3%B0%EFC%057%DFS%A4i%EA%E6%C3%B8%84~%BE%89%B7b9w%B2%8A%FA%BEg1%23u%5D%F7%F4%A3%EE%F5%DA%8C%89%E0%F7A*%CBRk%CDzl%85%8A%A2%F08%FCq%E0%13%23UU%C5%93%F3%AB%2Cg%C2H%98%D7%D3%C7q%FC%7C%3F%E5y%FE%EC%17%7FAm%DBz%1C%EF%F18%F6%E9%F1y%9E%9F%5C%FFyj7%CC%CD%DD%F2o%EE~%16%8E%B7%00%03%00%18%B7%8D%B1%0E%AA%DB%B6%00%00%00%00IEND%AEB%60%82") !important; color: #F5F5F5 !important; }
.hlight,
.row3,
.helprow,
.tablepad,
.plain,
.tdrow1,
.catrow2
 { background-color: #343434 !important; }
.row2
 { background-color: #303030 !important; padding: 3px 5px 3px 5px !important; }
.dlight,
.tdrow2,
.catrow1
 { background-color: #383838 !important; }
.darkrow3,
.row4
 { background-color: #383838 !important; border-color: #000000 !important; }
.caldate
 { background-color: #303030 !important; color: #DEDEDE !important; }
.desc
 { color: #DEDEDE !important; }
.darkrow1,
.darkrow2
 { background-color: #343434 !important; background-image: url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%00%1A%08%02%00%00%00%F0%8D%01%FC%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%9AIDATx%DAd%90%89%0A%C4%20%0CDK%9Aj%A1%FF%FF%AF%9E%B8%2F%0C%C8%EEVp%9C%CBT%EA%CF%F3%1C_%CB%EF%FB%CE9K%D4Z%0DQJA%80p%5Bk%C9%02%E1%A1%A9%A5%94%C0%D0%12%F4e9%0C%7B%CF7%EC%D6%1A%0C%84%9B%9A%12%91SF%5C%D7%05%C6%3C%0Ew%87%81p%3B~%97a%F7%DE%C9Ax%E4%1Cc%0C0r%B6%04%18Z5%B5%82%FF%BFo7u%EB5%8F2%E2%3CO0%DE7%E7D%90%80%F0%D7%FBd%C3T%B4%DD%D4-%DB%89Z%CE%3F%D3%C7%85%1F%01%06%00%3FD%92%F7%26%B2U%2C%00%00%00%00IEND%AEB%60%82") !important; color: #FEFEFE !important; }
.postcolor
 { padding-left: 5px !important; }
.post1
 { background-color: #343434 !important; color: #DEDEDE !important; padding: 3px !important; }
.post2
 { background-color: #303030 !important; color: #DEDEDE !important; padding: 3px !important; }
.postlinksbar
 { background-color: #303030 !important; background-image: url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%00%1A%08%02%00%00%00%F0%8D%01%FC%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%9AIDATx%DAd%90%89%0A%C4%20%0CDK%9Aj%A1%FF%FF%AF%9E%B8%2F%0C%C8%EEVp%9C%CBT%EA%CF%F3%1C_%CB%EF%FB%CE9K%D4Z%0DQJA%80p%5Bk%C9%02%E1%A1%A9%A5%94%C0%D0%12%F4e9%0C%7B%CF7%EC%D6%1A%0C%84%9B%9A%12%91SF%5C%D7%05%C6%3C%0Ew%87%81p%3B~%97a%F7%DE%C9Ax%E4%1Cc%0C0r%B6%04%18Z5%B5%82%FF%BFo7u%EB5%8F2%E2%3CO0%DE7%E7D%90%80%F0%D7%FBd%C3T%B4%DD%D4-%DB%89Z%CE%3F%D3%C7%85%1F%01%06%00%3FD%92%F7%26%B2U%2C%00%00%00%00IEND%AEB%60%82") !important; color:#000000 !important; padding: 2px 2px 2px 2px !important; }
.postlinksbar a:link,
.postlinksbar a:visited,
.postlinksbar a:active
 { font-weight: bold !important; font-size: 10px !important; text-decoration: none !important; }
.signature
 { color: #DEDEDE !important; padding-left: 5px !important; }
.activeuserstrip
 { background-color: #303030 !important; background-image: none !important; color:#DEDEDE !important; }
.thin
 { border-bottom: 1px solid #000000 !important; border-top: 1px solid #000000 !important; }
.pformstrip
 { background-color: #303030 !important; background-image: none !important; border-bottom: 1px solid #000000 !important; color: #F5F5F5 !important; }
.row1
 { background-color: #303030 !important; }
.pformleft,
.pformleftw,
.pformright
 { background-color: #303030 !important; border-bottom:1px solid #000000 !important; border-top: none !important; border left: none !important; border-right: none !important;  }
#QUOTE,
#CODE
 { background-color: #404040 !important; color: #DEDEDE !important; }
.signaturetab
 { background-color: #404040 !important; color: #DEDEDE !important; max-width: 600px !important; }
      ]]></>);