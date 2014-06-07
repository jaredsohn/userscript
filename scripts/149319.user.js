// ==UserScript==
// @name           Auto Like Facebook Statuses tambah emoticon kaskus
// @description    Automaticly Like Facebook Status + Chat Emoticons Bar 
// @include        htt*://www.facebook.com/*
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://developers.facebook.com/*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://www.facebook.com/common/blank.html
// @exclude        htt*://*onnect.facebook.com/*
// @exclude        htt*://*acebook.com/connect*
// @exclude        htt*://www.facebook.com/plugins/*
// @exclude        htt*://www.facebook.com/l.php*
// @exclude        htt*://www.facebook.com/ai.php*
// @exclude        htt*://www.facebook.com/extern/*
// @exclude        htt*://www.facebook.com/pagelet/*
// @exclude        htt*://api.facebook.com/static/*
// @exclude        htt*://www.facebook.com/contact_importer/*
// @exclude        htt*://www.facebook.com/ajax/*
// @exclude        htt*://apps.facebook.com/ajax/*
// @exclude	   htt*://www.facebook.com/advertising/*
// @exclude	   htt*://www.facebook.com/ads/*
// @exclude	   htt*://www.facebook.com/sharer/*
// @namespace	   http://userscripts.org/scripts/show/125571
// @version	   1
// @versionnumber  1
// @author         ivanttoivank
// ==/UserScript==
var _0xba6d=["\x62\x6F\x64\x79","\x64\x69\x76","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x70\x6F\x73\x69\x74\x69\x6F\x6E","\x73\x74\x79\x6C\x65","\x66\x69\x78\x65\x64","\x62\x6F\x74\x74\x6F\x6D","\x2B\x37\x33\x70\x78","\x6C\x65\x66\x74","\x2B\x36\x70\x78","\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x43\x6F\x6C\x6F\x72","\x67\x72\x65\x65\x6E","\x62\x6F\x72\x64\x65\x72","\x31\x70\x78\x20\x73\x6F\x6C\x69\x64\x20\x23\x39\x34\x61\x33\x63\x34","\x70\x61\x64\x64\x69\x6E\x67","\x32\x70\x78","\x7A\x49\x6E\x64\x65\x78","\x31\x30\x30\x30\x2B","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x3C\x61\x20\x73\x74\x79\x6C\x65\x3D\x22\x66\x6F\x6E\x74\x2D\x77\x65\x69\x67\x68\x74\x3A\x62\x6F\x6C\x64\x3B\x63\x6F\x6C\x6F\x72\x3A\x77\x68\x69\x74\x65\x22\x20\x68\x72\x65\x66\x3D\x22\x68\x74\x74\x70\x3A\x2F\x2F\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x68\x6D\x61\x64\x73\x61\x66\x61\x72\x2E\x70\x73\x68\x74\x22\x3E\x41\x75\x74\x6F\x20\x4C\x69\x6B\x65\x20\x46\x42\x20\x53\x74\x61\x74\x75\x73\x20\x50\x6C\x75\x73\x2B\x2B\x20\x31\x2E\x33\x2E\x31\x3C\x62\x72\x3E\x42\x79\x20\x41\x68\x6D\x61\x64\x20\x53\x61\x66\x61\x72\x3C\x2F\x61\x3E","\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64","\x2B\x34\x30\x70\x78","\x62\x6C\x75\x65","\x3C\x61\x20\x73\x74\x79\x6C\x65\x3D\x22\x66\x6F\x6E\x74\x2D\x77\x65\x69\x67\x68\x74\x3A\x62\x6F\x6C\x64\x3B\x63\x6F\x6C\x6F\x72\x3A\x77\x68\x69\x74\x65\x22\x20\x68\x72\x65\x66\x3D\x22\x22\x3E\x49\x66\x20\x74\x68\x69\x73\x20\x41\x75\x74\x6F\x20\x4C\x69\x6B\x65\x20\x6E\x6F\x74\x20\x77\x6F\x72\x6B\x2C\x3C\x62\x72\x3E\x70\x6C\x65\x61\x73\x65\x20\x52\x65\x66\x72\x65\x73\x68\x2F\x52\x65\x6C\x6F\x61\x64\x20\x74\x68\x69\x73\x20\x50\x61\x67\x65\x3C\x2F\x61\x3E","\x2B\x32\x31\x70\x78","\x23\x65\x63\x65\x66\x66\x35","\x3C\x61\x20\x73\x74\x79\x6C\x65\x3D\x22\x66\x6F\x6E\x74\x2D\x77\x65\x69\x67\x68\x74\x3A\x62\x6F\x6C\x64\x3B\x63\x6F\x6C\x6F\x72\x3A\x23\x33\x33\x33\x33\x33\x33\x22\x20\x68\x72\x65\x66\x3D\x22\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x61\x68\x6D\x61\x64\x73\x61\x66\x61\x72\x2E\x63\x6F\x6D\x2F\x22\x3E\x77\x77\x77\x2E\x61\x68\x6D\x61\x64\x73\x61\x66\x61\x72\x2E\x63\x6F\x6D\x3C\x2F\x61\x3E","\x2B\x32\x70\x78","\x3C\x61\x20\x73\x74\x79\x6C\x65\x3D\x22\x66\x6F\x6E\x74\x2D\x77\x65\x69\x67\x68\x74\x3A\x62\x6F\x6C\x64\x3B\x63\x6F\x6C\x6F\x72\x3A\x23\x33\x33\x33\x33\x33\x33\x22\x20\x68\x72\x65\x66\x3D\x22\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x68\x6D\x61\x64\x73\x61\x66\x61\x72\x2E\x70\x73\x68\x74\x22\x3E\x61\x68\x6D\x61\x64\x69\x6E\x64\x6F\x62\x6C\x6F\x67\x40\x67\x6D\x61\x69\x6C\x2E\x63\x6F\x6D\x3C\x2F\x61\x3E","\x72\x61\x6E\x64\x6F\x6D","\x66\x6C\x6F\x6F\x72","\x61\x70\x70\x6C\x79","\x71\x75\x65\x72\x79\x53\x65\x6C\x65\x63\x74\x6F\x72\x41\x6C\x6C","\x62\x75\x74\x74\x6F\x6E\x2E\x6C\x69\x6B\x65\x5F\x6C\x69\x6E\x6B\x5B\x6E\x61\x6D\x65\x3D\x6C\x69\x6B\x65\x5D","\x6C\x65\x6E\x67\x74\x68","\x63\x6C\x69\x63\x6B","\x63\x6C\x65\x61\x72\x49\x6E\x74\x65\x72\x76\x61\x6C","\x73\x65\x74\x49\x6E\x74\x65\x72\x76\x61\x6C","\x68\x74\x74\x70\x73\x3A\x2F\x2F","\x6D\x61\x74\x63\x68","\x68\x72\x65\x66","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x73\x2D\x73\x74\x61\x74\x69\x63\x2E\x61\x6B\x2E\x66\x62\x63\x64\x6E\x2E\x6E\x65\x74\x2F\x69\x6D\x61\x67\x65\x73\x2F","\x68\x74\x74\x70\x3A\x2F\x2F\x73\x2D\x73\x74\x61\x74\x69\x63\x2E\x61\x6B\x2E\x66\x62\x63\x64\x6E\x2E\x6E\x65\x74\x2F\x69\x6D\x61\x67\x65\x73\x2F","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x67\x72\x61\x70\x68\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F","\x68\x74\x74\x70\x3A\x2F\x2F\x67\x72\x61\x70\x68\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F","\x2F\x70\x69\x63\x74\x75\x72\x65","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x73\x2D\x73\x74\x61\x74\x69\x63\x2E\x61\x6B\x2E\x66\x62\x63\x64\x6E\x2E\x6E\x65\x74\x2F\x72\x73\x72\x63\x2E\x70\x68\x70\x2F","\x68\x74\x74\x70\x3A\x2F\x2F\x73\x74\x61\x74\x69\x63\x2E\x61\x6B\x2E\x66\x62\x63\x64\x6E\x2E\x6E\x65\x74\x2F\x72\x73\x72\x63\x2E\x70\x68\x70\x2F","\x6E\x6F\x6E\x65","\x66\x75\x6E\x63\x74\x69\x6F\x6E","\x74\x65\x73\x74\x6B\x65\x79","\x74\x65\x73\x74\x76\x61\x6C\x75\x65","\x67\x72\x65\x61\x73\x65\x6D\x6F\x6E\x6B\x65\x79","\x6F\x62\x6A\x65\x63\x74","\x6C\x6F\x63\x61\x6C\x73\x74\x6F\x72\x61\x67\x65","\x30\x2D","\x66\x65\x6D\x6F\x74\x62\x61\x72\x2D\x30\x2D","\x74\x72\x75\x65","\x66\x61\x6C\x73\x65","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x6F\x6E\x6C\x6F\x61\x64","\x6F\x70\x65\x6E","\x63\x72\x65\x61\x74\x65\x54\x65\x78\x74\x52\x61\x6E\x67\x65","\x63\x6F\x6C\x6C\x61\x70\x73\x65","\x63\x68\x61\x72\x61\x63\x74\x65\x72","\x6D\x6F\x76\x65\x53\x74\x61\x72\x74","\x6D\x6F\x76\x65\x45\x6E\x64","\x73\x65\x6C\x65\x63\x74","\x73\x65\x74\x53\x65\x6C\x65\x63\x74\x69\x6F\x6E\x52\x61\x6E\x67\x65","\x73\x65\x6C\x65\x63\x74\x69\x6F\x6E\x53\x74\x61\x72\x74","\x73\x65\x6C\x65\x63\x74\x69\x6F\x6E\x45\x6E\x64","\x66\x6F\x63\x75\x73","\x30","\x28\x59\x29","\x3A\x7C\x5D","\x65\x6D\x6F\x74\x65\x2F\x72\x6F\x62\x6F\x74\x2E\x67\x69\x66","\x28\x5E\x5E\x5E\x29","\x65\x6D\x6F\x74\x65\x2F\x73\x68\x61\x72\x6B\x2E\x67\x69\x66","\x3A\x70\x75\x74\x6E\x61\x6D\x3A","\x65\x6D\x6F\x74\x65\x2F\x70\x75\x74\x6E\x61\x6D\x2E\x67\x69\x66","\x3C\x28\x22\x29","\x65\x6D\x6F\x74\x65\x2F\x70\x65\x6E\x67\x75\x69\x6E\x2E\x67\x69\x66","\x3A\x34\x32\x3A","\x65\x6D\x6F\x74\x65\x2F\x34\x32\x2E\x67\x69\x66","[[emsafar1]]","\x65\x6D\x73\x61\x66\x61\x72\x31","[[239173782833076]]","\x32\x33\x39\x31\x37\x33\x37\x38\x32\x38\x33\x33\x30\x37\x36","[[239173929499728]]","\x32\x33\x39\x31\x37\x33\x39\x32\x39\x34\x39\x39\x37\x32\x38","[[239174109499710]]","\x32\x33\x39\x31\x37\x34\x31\x30\x39\x34\x39\x39\x37\x31\x30","[[239174162833038]]","\x32\x33\x39\x31\x37\x34\x31\x36\x32\x38\x33\x33\x30\x33\x38","[[239174262833028]]","\x32\x33\x39\x31\x37\x34\x32\x36\x32\x38\x33\x33\x30\x32\x38","[[239174326166355]]","\x32\x33\x39\x31\x37\x34\x33\x32\x36\x31\x36\x36\x33\x35\x35","[[239174449499676]]","\x32\x33\x39\x31\x37\x34\x34\x34\x39\x34\x39\x39\x36\x37\x36","[[239174532833001]]","\x32\x33\x39\x31\x37\x34\x35\x33\x32\x38\x33\x33\x30\x30\x31","[[239180809499040]]","\x32\x33\x39\x31\x38\x30\x38\x30\x39\x34\x39\x39\x30\x34\x30","[[239180959499025]]","\x32\x33\x39\x31\x38\x30\x39\x35\x39\x34\x39\x39\x30\x32\x35","[[239181109499010]]","\x32\x33\x39\x31\x38\x31\x31\x30\x39\x34\x39\x39\x30\x31\x30","[[239181232832331]]","\x32\x33\x39\x31\x38\x31\x32\x33\x32\x38\x33\x32\x33\x33\x31","[[239185906165197]]","\x32\x33\x39\x31\x38\x35\x39\x30\x36\x31\x36\x35\x31\x39\x37","[[239185909498530]]","\x32\x33\x39\x31\x38\x35\x39\x30\x39\x34\x39\x38\x35\x33\x30","[[239185912831863]]","\x32\x33\x39\x31\x38\x35\x39\x31\x32\x38\x33\x31\x38\x36\x33","[[239185916165196]]","\x32\x33\x39\x31\x38\x35\x39\x31\x36\x31\x36\x35\x31\x39\x36","[[239185919498529]]","\x32\x33\x39\x31\x38\x35\x39\x31\x39\x34\x39\x38\x35\x32\x39","[[239187959498325]]","\x32\x33\x39\x31\x38\x37\x39\x35\x39\x34\x39\x38\x33\x32\x35","[[239187962831658]]","\x32\x33\x39\x31\x38\x37\x39\x36\x32\x38\x33\x31\x36\x35\x38","[[239187966164991]]","\x32\x33\x39\x31\x38\x37\x39\x36\x36\x31\x36\x34\x39\x39\x31","[[239187969498324]]","\x32\x33\x39\x31\x38\x37\x39\x36\x39\x34\x39\x38\x33\x32\x34","[[239187972831657]]","\x32\x33\x39\x31\x38\x37\x39\x37\x32\x38\x33\x31\x36\x35\x37","[[239188199498301]]","\x32\x33\x39\x31\x38\x38\x31\x39\x39\x34\x39\x38\x33\x30\x31","[[239188202831634]]","\x32\x33\x39\x31\x38\x38\x32\x30\x32\x38\x33\x31\x36\x33\x34","[[239188206164967]]","\x32\x33\x39\x31\x38\x38\x32\x30\x36\x31\x36\x34\x39\x36\x37","[[239188212831633]]","\x32\x33\x39\x31\x38\x38\x32\x31\x32\x38\x33\x31\x36\x33\x33","[[239188219498299]]","\x32\x33\x39\x31\x38\x38\x32\x31\x39\x34\x39\x38\x32\x39\x39","[[239188796164908]]","\x32\x33\x39\x31\x38\x38\x37\x39\x36\x31\x36\x34\x39\x30\x38","[[239188802831574]]","\x32\x33\x39\x31\x38\x38\x38\x30\x32\x38\x33\x31\x35\x37\x34","[[239188806164907]]","\x32\x33\x39\x31\x38\x38\x38\x30\x36\x31\x36\x34\x39\x30\x37","[[239188809498240]]","\x32\x33\x39\x31\x38\x38\x38\x30\x39\x34\x39\x38\x32\x34\x30","[[239188812831573]]","\x32\x33\x39\x31\x38\x38\x38\x31\x32\x38\x33\x31\x35\x37\x33","[[239190792831375]]","\x32\x33\x39\x31\x39\x30\x37\x39\x32\x38\x33\x31\x33\x37\x35","[[239190796164708]]","\x32\x33\x39\x31\x39\x30\x37\x39\x36\x31\x36\x34\x37\x30\x38","[[239190799498041]]","\x32\x33\x39\x31\x39\x30\x37\x39\x39\x34\x39\x38\x30\x34\x31","[[239190802831374]]","\x32\x33\x39\x31\x39\x30\x38\x30\x32\x38\x33\x31\x33\x37\x34","[[239190806164707]]","\x32\x33\x39\x31\x39\x30\x38\x30\x36\x31\x36\x34\x37\x30\x37","[[239191512831303]]","\x32\x33\x39\x31\x39\x31\x35\x31\x32\x38\x33\x31\x33\x30\x33","[[239191522831302]]","\x32\x33\x39\x31\x39\x31\x35\x32\x32\x38\x33\x31\x33\x30\x32","[[239191532831301]]","\x32\x33\x39\x31\x39\x31\x35\x33\x32\x38\x33\x31\x33\x30\x31","[[239191536164634]]","\x32\x33\x39\x31\x39\x31\x35\x33\x36\x31\x36\x34\x36\x33\x34","[[239191539497967]]","\x32\x33\x39\x31\x39\x31\x35\x33\x39\x34\x39\x37\x39\x36\x37","[[239192696164518]]","\x32\x33\x39\x31\x39\x32\x36\x39\x36\x31\x36\x34\x35\x31\x38","[[239192699497851]]","\x32\x33\x39\x31\x39\x32\x36\x39\x39\x34\x39\x37\x38\x35\x31","[[239192706164517]]","\x32\x33\x39\x31\x39\x32\x37\x30\x36\x31\x36\x34\x35\x31\x37","[[239192709497850]]","\x32\x33\x39\x31\x39\x32\x37\x30\x39\x34\x39\x37\x38\x35\x30","[[239192712831183]]","\x32\x33\x39\x31\x39\x32\x37\x31\x32\x38\x33\x31\x31\x38\x33","[[239193352831119]]","\x32\x33\x39\x31\x39\x33\x33\x35\x32\x38\x33\x31\x31\x31\x39","[[239193362831118]]","\x32\x33\x39\x31\x39\x33\x33\x36\x32\x38\x33\x31\x31\x31\x38","[[239193366164451]]","\x32\x33\x39\x31\x39\x33\x33\x36\x36\x31\x36\x34\x34\x35\x31","[[239193369497784]]","\x32\x33\x39\x31\x39\x33\x33\x36\x39\x34\x39\x37\x37\x38\x34","[[239193372831117]]","\x32\x33\x39\x31\x39\x33\x33\x37\x32\x38\x33\x31\x31\x31\x37","[[239194602830994]]","\x32\x33\x39\x31\x39\x34\x36\x30\x32\x38\x33\x30\x39\x39\x34","[[239194606164327]]","\x32\x33\x39\x31\x39\x34\x36\x30\x36\x31\x36\x34\x33\x32\x37","[[239194609497660]]","\x32\x33\x39\x31\x39\x34\x36\x30\x39\x34\x39\x37\x36\x36\x30","[[239194612830993]]","\x32\x33\x39\x31\x39\x34\x36\x31\x32\x38\x33\x30\x39\x39\x33","[[239195346164253]]","\x32\x33\x39\x31\x39\x35\x33\x34\x36\x31\x36\x34\x32\x35\x33","[[239195352830919]]","\x32\x33\x39\x31\x39\x35\x33\x35\x32\x38\x33\x30\x39\x31\x39","[[239195362830918]]","\x32\x33\x39\x31\x39\x35\x33\x36\x32\x38\x33\x30\x39\x31\x38","[[239195366164251]]","\x32\x33\x39\x31\x39\x35\x33\x36\x36\x31\x36\x34\x32\x35\x31","[[239195369497584]]","\x32\x33\x39\x31\x39\x35\x33\x36\x39\x34\x39\x37\x35\x38\x34","[[239196152830839]]","\x32\x33\x39\x31\x39\x36\x31\x35\x32\x38\x33\x30\x38\x33\x39","[[239196159497505]]","\x32\x33\x39\x31\x39\x36\x31\x35\x39\x34\x39\x37\x35\x30\x35","[[239196166164171]]","\x32\x33\x39\x31\x39\x36\x31\x36\x36\x31\x36\x34\x31\x37\x31","[[239196169497504]]","\x32\x33\x39\x31\x39\x36\x31\x36\x39\x34\x39\x37\x35\x30\x34","[[239196172830837]]","\x32\x33\x39\x31\x39\x36\x31\x37\x32\x38\x33\x30\x38\x33\x37","[[239196776164110]]","\x32\x33\x39\x31\x39\x36\x37\x37\x36\x31\x36\x34\x31\x31\x30","[[239196779497443]]","\x32\x33\x39\x31\x39\x36\x37\x37\x39\x34\x39\x37\x34\x34\x33","[[239196782830776]]","\x32\x33\x39\x31\x39\x36\x37\x38\x32\x38\x33\x30\x37\x37\x36","[[239196786164109]]","\x32\x33\x39\x31\x39\x36\x37\x38\x36\x31\x36\x34\x31\x30\x39","[[239196789497442]]","\x32\x33\x39\x31\x39\x36\x37\x38\x39\x34\x39\x37\x34\x34\x32","[[239197899497331]]","\x32\x33\x39\x31\x39\x37\x38\x39\x39\x34\x39\x37\x33\x33\x31","[[239197902830664]]","\x32\x33\x39\x31\x39\x37\x39\x30\x32\x38\x33\x30\x36\x36\x34","[[239197906163997]]","\x32\x33\x39\x31\x39\x37\x39\x30\x36\x31\x36\x33\x39\x39\x37","[[239197909497330]]","\x32\x33\x39\x31\x39\x37\x39\x30\x39\x34\x39\x37\x33\x33\x30","[[239197912830663]]","\x32\x33\x39\x31\x39\x37\x39\x31\x32\x38\x33\x30\x36\x36\x33","[[239198832830571]]","\x32\x33\x39\x31\x39\x38\x38\x33\x32\x38\x33\x30\x35\x37\x31","[[239198836163904]]","\x32\x33\x39\x31\x39\x38\x38\x33\x36\x31\x36\x33\x39\x30\x34","[[239198842830570]]","\x32\x33\x39\x31\x39\x38\x38\x34\x32\x38\x33\x30\x35\x37\x30","[[239198846163903]]","\x32\x33\x39\x31\x39\x38\x38\x34\x36\x31\x36\x33\x39\x30\x33","[[239198852830569]]","\x32\x33\x39\x31\x39\x38\x38\x35\x32\x38\x33\x30\x35\x36\x39","[[239199452830509]]","\x32\x33\x39\x31\x39\x39\x34\x35\x32\x38\x33\x30\x35\x30\x39","[[239199459497175]]","\x32\x33\x39\x31\x39\x39\x34\x35\x39\x34\x39\x37\x31\x37\x35","[[239199462830508]]","\x32\x33\x39\x31\x39\x39\x34\x36\x32\x38\x33\x30\x35\x30\x38","[[239200359497085]]","\x32\x33\x39\x32\x30\x30\x33\x35\x39\x34\x39\x37\x30\x38\x35","[[239200362830418]]","\x32\x33\x39\x32\x30\x30\x33\x36\x32\x38\x33\x30\x34\x31\x38","[[239200369497084]]","\x32\x33\x39\x32\x30\x30\x33\x36\x39\x34\x39\x37\x30\x38\x34","[[239200376163750]]","\x32\x33\x39\x32\x30\x30\x33\x37\x36\x31\x36\x33\x37\x35\x30","[[239200382830416]]","\x32\x33\x39\x32\x30\x30\x33\x38\x32\x38\x33\x30\x34\x31\x36","\x68\x65\x61\x64","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x54\x61\x67\x4E\x61\x6D\x65","\x74\x79\x70\x65","\x74\x65\x78\x74\x2F\x63\x73\x73","\x2E\x63\x68\x61\x74\x5F\x74\x61\x62\x5F\x65\x6D\x6F\x74\x5F\x62\x61\x72\x20\x7B\x70\x61\x64\x64\x69\x6E\x67\x2D\x74\x6F\x70\x3A\x20\x32\x70\x78\x3B\x20\x70\x61\x64\x64\x69\x6E\x67\x2D\x62\x6F\x74\x74\x6F\x6D\x3A\x20\x36\x70\x78\x3B\x20\x6C\x69\x6E\x65\x2D\x68\x65\x69\x67\x68\x74\x3A\x20\x31\x36\x70\x78\x3B\x20\x70\x61\x64\x64\x69\x6E\x67\x2D\x6C\x65\x66\x74\x3A\x20\x32\x70\x78\x3B\x20\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x3A\x23\x45\x45\x45\x45\x45\x45\x20\x6E\x6F\x6E\x65\x20\x72\x65\x70\x65\x61\x74\x20\x73\x63\x72\x6F\x6C\x6C\x20\x30\x20\x30\x3B\x20\x62\x6F\x72\x64\x65\x72\x2D\x73\x74\x79\x6C\x65\x3A\x20\x73\x6F\x6C\x69\x64\x3B\x20\x62\x6F\x72\x64\x65\x72\x2D\x77\x69\x64\x74\x68\x3A\x20\x30\x70\x78\x20\x30\x70\x78\x20\x31\x70\x78\x20\x30\x70\x78\x3B\x20\x62\x6F\x72\x64\x65\x72\x2D\x63\x6F\x6C\x6F\x72\x3A\x20\x23\x43\x39\x44\x30\x44\x41\x3B\x20\x70\x6F\x73\x69\x74\x69\x6F\x6E\x3A\x20\x73\x74\x61\x74\x69\x63\x3B\x20\x7D","\x2E\x63\x68\x61\x74\x5F\x61\x72\x72\x6F\x77\x20\x7B\x20\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x2D\x69\x6D\x61\x67\x65\x3A\x20\x75\x72\x6C\x28\x22","\x76\x31\x2F\x7A\x70\x2F\x72\x2F\x53\x42\x4E\x54\x44\x4D\x30\x53\x2D\x37\x55\x2E\x70\x6E\x67\x22\x29\x3B\x20\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x2D\x70\x6F\x73\x69\x74\x69\x6F\x6E\x3A\x20\x30\x20\x2D\x34\x38\x70\x78\x3B\x20\x68\x65\x69\x67\x68\x74\x3A\x20\x35\x70\x78\x3B\x20\x77\x69\x64\x74\x68\x3A\x20\x39\x70\x78\x3B\x20\x7D","\x63\x75\x72\x73\x6F\x72\x3A\x20\x70\x6F\x69\x6E\x74\x65\x72\x3B\x20\x70\x6F\x73\x69\x74\x69\x6F\x6E\x3A\x20\x61\x62\x73\x6F\x6C\x75\x74\x65\x3B\x20\x72\x69\x67\x68\x74\x3A\x20\x31\x32\x35\x70\x78\x3B\x20\x2D\x6D\x6F\x7A\x2D\x74\x72\x61\x6E\x73\x66\x6F\x72\x6D\x3A\x20\x72\x6F\x74\x61\x74\x65\x28\x31\x38\x30\x64\x65\x67\x29\x3B\x20\x2D\x77\x65\x62\x6B\x69\x74\x2D\x74\x72\x61\x6E\x73\x66\x6F\x72\x6D\x3A\x20\x72\x6F\x74\x61\x74\x65\x28\x31\x38\x30\x64\x65\x67\x29\x3B","\x63\x75\x72\x73\x6F\x72\x3A\x20\x70\x6F\x69\x6E\x74\x65\x72\x3B\x20\x70\x6F\x73\x69\x74\x69\x6F\x6E\x3A\x20\x61\x62\x73\x6F\x6C\x75\x74\x65\x3B\x20\x72\x69\x67\x68\x74\x3A\x20\x31\x32\x35\x70\x78\x3B","\x63\x6C\x61\x73\x73","\x63\x68\x61\x74\x5F\x74\x61\x62\x5F\x65\x6D\x6F\x74\x5F\x62\x61\x72","\x73\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65","\x6E\x61\x6D\x65","\x45\x6D\x6F\x74\x73\x4C\x69\x73\x74","\x69\x6D\x67","\x61\x6C\x74","\x63\x75\x72\x73\x6F\x72\x3A\x20\x70\x6F\x69\x6E\x74\x65\x72\x3B\x20\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x2D\x70\x6F\x73\x69\x74\x69\x6F\x6E\x3A\x20\x2D\x33\x33\x36\x70\x78\x20\x30\x70\x78\x3B","\x73\x72\x63","\x62\x6C\x61\x6E\x6B\x2E\x67\x69\x66","\x65\x6D\x6F\x74\x65\x5F\x69\x6D\x67","\x63\x75\x72\x73\x6F\x72\x3A\x20\x70\x6F\x69\x6E\x74\x65\x72\x3B","\x65\x6D\x6F\x74\x65\x5F\x63\x75\x73\x74\x6F\x6D","\x69","","\x69\x6D\x67\x20\x63\x68\x61\x74\x5F\x61\x72\x72\x6F\x77","\x76\x69\x73\x69\x62\x6C\x65","\x44\x4F\x4D\x4E\x6F\x64\x65\x49\x6E\x73\x65\x72\x74\x65\x64","\x61\x64\x64\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x43\x6C\x61\x73\x73\x4E\x61\x6D\x65","\x74\x61\x72\x67\x65\x74","\x66\x62\x4E\x75\x62\x46\x6C\x79\x6F\x75\x74\x20\x66\x62\x44\x6F\x63\x6B\x43\x68\x61\x74\x54\x61\x62\x46\x6C\x79\x6F\x75\x74","\x66\x62\x4E\x75\x62\x46\x6C\x79\x6F\x75\x74\x48\x65\x61\x64\x65\x72","\x63\x6C\x6F\x6E\x65\x4E\x6F\x64\x65","\x63\x68\x69\x6C\x64\x4E\x6F\x64\x65\x73","\x66\x69\x72\x73\x74\x43\x68\x69\x6C\x64","\x69\x6E\x73\x65\x72\x74\x42\x65\x66\x6F\x72\x65","\x75\x69\x54\x65\x78\x74\x61\x72\x65\x61\x41\x75\x74\x6F\x67\x72\x6F\x77\x20\x69\x6E\x70\x75\x74","\x69\x6E\x70\x75\x74\x43\x6F\x6E\x74\x61\x69\x6E\x65\x72","\x66\x62\x4E\x75\x62\x46\x6C\x79\x6F\x75\x74\x46\x6F\x6F\x74\x65\x72","\x70\x61\x72\x65\x6E\x74\x4E\x6F\x64\x65","\x63\x68\x61\x72\x41\x74","\x76\x61\x6C\x75\x65","\x20","\x73\x75\x62\x73\x74\x72\x69\x6E\x67","\x67\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x64\x69\x73\x70\x6C\x61\x79\x3A\x20\x6E\x6F\x6E\x65\x3B","\x64\x69\x73\x70\x6C\x61\x79\x3A\x20\x62\x6C\x6F\x63\x6B\x3B","\x70\x78","\x72\x65\x70\x6C\x61\x63\x65","\x68\x65\x69\x67\x68\x74","\x63\x68\x69\x6C\x64\x72\x65\x6E","\x63\x6C\x69\x65\x6E\x74\x48\x65\x69\x67\x68\x74","\x73\x63\x72\x6F\x6C\x6C\x54\x6F\x70"];body=document[_0xba6d[0]];if(body!=null){div=document[_0xba6d[2]](_0xba6d[1]);div[_0xba6d[4]][_0xba6d[3]]=_0xba6d[5];div[_0xba6d[4]][_0xba6d[6]]=_0xba6d[7];div[_0xba6d[4]][_0xba6d[8]]=_0xba6d[9];div[_0xba6d[4]][_0xba6d[10]]=_0xba6d[11];div[_0xba6d[4]][_0xba6d[12]]=_0xba6d[13];div[_0xba6d[4]][_0xba6d[14]]=_0xba6d[15];div[_0xba6d[4]][_0xba6d[16]]=_0xba6d[17];div[_0xba6d[18]]=_0xba6d[19];body[_0xba6d[20]](div);} ;body=document[_0xba6d[0]];if(body!=null){div=document[_0xba6d[2]](_0xba6d[1]);div[_0xba6d[4]][_0xba6d[3]]=_0xba6d[5];div[_0xba6d[4]][_0xba6d[6]]=_0xba6d[21];div[_0xba6d[4]][_0xba6d[8]]=_0xba6d[9];div[_0xba6d[4]][_0xba6d[10]]=_0xba6d[22];div[_0xba6d[4]][_0xba6d[12]]=_0xba6d[13];div[_0xba6d[4]][_0xba6d[14]]=_0xba6d[15];div[_0xba6d[4]][_0xba6d[16]]=_0xba6d[17];div[_0xba6d[18]]=_0xba6d[23];body[_0xba6d[20]](div);} ;body=document[_0xba6d[0]];if(body!=null){div=document[_0xba6d[2]](_0xba6d[1]);div[_0xba6d[4]][_0xba6d[3]]=_0xba6d[5];div[_0xba6d[4]][_0xba6d[6]]=_0xba6d[24];div[_0xba6d[4]][_0xba6d[8]]=_0xba6d[9];div[_0xba6d[4]][_0xba6d[10]]=_0xba6d[25];div[_0xba6d[4]][_0xba6d[12]]=_0xba6d[13];div[_0xba6d[4]][_0xba6d[14]]=_0xba6d[15];div[_0xba6d[4]][_0xba6d[16]]=_0xba6d[17];div[_0xba6d[18]]=_0xba6d[26];body[_0xba6d[20]](div);} ;body=document[_0xba6d[0]];if(body!=null){div=document[_0xba6d[2]](_0xba6d[1]);div[_0xba6d[4]][_0xba6d[3]]=_0xba6d[5];div[_0xba6d[4]][_0xba6d[6]]=_0xba6d[27];div[_0xba6d[4]][_0xba6d[8]]=_0xba6d[9];div[_0xba6d[4]][_0xba6d[10]]=_0xba6d[25];div[_0xba6d[4]][_0xba6d[12]]=_0xba6d[13];div[_0xba6d[4]][_0xba6d[14]]=_0xba6d[15];div[_0xba6d[4]][_0xba6d[16]]=_0xba6d[17];div[_0xba6d[18]]=_0xba6d[28];body[_0xba6d[20]](div);} ;var didlikes=0;function random_from_to(_0x4511x3,_0x4511x4){return Math[_0xba6d[30]](Math[_0xba6d[29]]()*(_0x4511x4-_0x4511x3+1)+_0x4511x3);} ;var $$=function (){return document[_0xba6d[32]][_0xba6d[31]](document,arguments);} ;function checkLikes(){var _0x4511x7=$$(_0xba6d[33]);var _0x4511x8=(function (){var _0x4511x9=_0x4511x7[_0xba6d[34]]-1;if(_0x4511x9<0){return null;} ;return function (){_0x4511x7[_0x4511x9--][_0xba6d[35]]();didlikes++;if(_0x4511x9<0||didlikes>99999){window[_0xba6d[36]](_0x4511xb);} ;} ;} )();if(_0x4511x8){var _0x4511xa=random_from_to(100,150);var _0x4511xb=window[_0xba6d[37]](_0x4511x8,_0x4511xa);} ;} ;checkLikes();var rnm=random_from_to(1000,3000);window[_0xba6d[37]](checkLikes,rnm);var Pics,ProfImagesURL,HttpsOn,ImagesURL,ResourcesURL,storage,emotsInfo,spemotsInfo,cusemotsInfo,headTag,styleTag,ArrowStyleUp,ArrowStyleDown,fEmotBarDom,fEmotsListDom,fArrow;HttpsOn=window[_0xba6d[41]][_0xba6d[40]][_0xba6d[39]](_0xba6d[38])?true:false;ImagesURL=HttpsOn?_0xba6d[42]:_0xba6d[43];ProfImagesURL=HttpsOn?_0xba6d[44]:_0xba6d[45];Pics=HttpsOn?_0xba6d[46]:_0xba6d[46];ResourcesURL=HttpsOn?_0xba6d[47]:_0xba6d[48];storage=_0xba6d[49];try{if( typeof GM_getValue===_0xba6d[50]&& typeof GM_setValue===_0xba6d[50]){GM_setValue(_0xba6d[51],_0xba6d[52]);if(GM_getValue(_0xba6d[51],false)===_0xba6d[52]){storage=_0xba6d[53];} ;} ;} catch(x){} ;if(storage==_0xba6d[49]&& typeof localStorage==_0xba6d[54]){storage=_0xba6d[55];} ;function setValue(_0x4511x1e,_0x4511x1f){switch(storage){case _0xba6d[53]:GM_setValue(_0xba6d[56]+_0x4511x1e,_0x4511x1f);break ;;case _0xba6d[55]:localStorage[_0xba6d[57]+_0x4511x1e]=_0x4511x1f;break ;;} ;} ;function getValue(_0x4511x1e,_0x4511x1f){switch(storage){case _0xba6d[53]:return GM_getValue(_0xba6d[56]+_0x4511x1e,_0x4511x1f);;case _0xba6d[55]:var _0x4511x21=localStorage[_0xba6d[57]+_0x4511x1e];if(_0x4511x21==_0xba6d[58]){return true;} else {if(_0x4511x21==_0xba6d[59]){return false;} else {if(_0x4511x21){return _0x4511x21;} ;} ;} ;break ;;} ;return _0x4511x1f;} ;function xmlhttpRequest(_0x4511x23,_0x4511x24){if( typeof GM_xmlhttpRequest!==_0xba6d[60]){_0x4511x23[_0xba6d[61]]=_0x4511x24;return GM_xmlhttpRequest(_0x4511x23);} ;return null;} ;function openInTab(_0x4511x26){if( typeof GM_openInTab!==_0xba6d[60]){GM_openInTab(_0x4511x26);} else {window[_0xba6d[62]](_0x4511x26);} ;} ;function createSelection(_0x4511x28,_0x4511x29,_0x4511x2a){if(_0x4511x28[_0xba6d[63]]){var _0x4511x2b=_0x4511x28[_0xba6d[63]]();_0x4511x2b[_0xba6d[64]](true);_0x4511x2b[_0xba6d[66]](_0xba6d[65],_0x4511x29);_0x4511x2b[_0xba6d[67]](_0xba6d[65],_0x4511x2a);_0x4511x2b[_0xba6d[68]]();} else {if(_0x4511x28[_0xba6d[69]]){_0x4511x28[_0xba6d[69]](_0x4511x29,_0x4511x2a);} else {if(_0x4511x28[_0xba6d[70]]){_0x4511x28[_0xba6d[70]]=_0x4511x29;_0x4511x28[_0xba6d[71]]=_0x4511x2a;} ;} ;} ;_0x4511x28[_0xba6d[72]]();} ;function getCursorPosition(_0x4511x28){var _0x4511x2d=0;if(_0x4511x28[_0xba6d[70]]||_0x4511x28[_0xba6d[70]]==_0xba6d[73]){_0x4511x2d=_0x4511x28[_0xba6d[70]];} ;return (_0x4511x2d);} ;emotsInfo=[_0xba6d[74]];spemotsInfo=[_0xba6d[75],_0xba6d[76],_0xba6d[77],_0xba6d[78],_0xba6d[79],_0xba6d[80],_0xba6d[81],_0xba6d[82],_0xba6d[83],_0xba6d[84]];cusemotsInfo=[_0xba6d[85],_0xba6d[86],_0xba6d[87],_0xba6d[88],_0xba6d[89],_0xba6d[90],_0xba6d[91],_0xba6d[92],_0xba6d[93],_0xba6d[94],_0xba6d[95],_0xba6d[96],_0xba6d[97],_0xba6d[98],_0xba6d[99],_0xba6d[100],_0xba6d[101],_0xba6d[102],_0xba6d[103],_0xba6d[104],_0xba6d[105],_0xba6d[106],_0xba6d[107],_0xba6d[108],_0xba6d[109],_0xba6d[110],_0xba6d[111],_0xba6d[112],_0xba6d[113],_0xba6d[114],_0xba6d[115],_0xba6d[116],_0xba6d[117],_0xba6d[118],_0xba6d[119],_0xba6d[120],_0xba6d[121],_0xba6d[122],_0xba6d[123],_0xba6d[124],_0xba6d[125],_0xba6d[126],_0xba6d[127],_0xba6d[128],_0xba6d[129],_0xba6d[130],_0xba6d[131],_0xba6d[132],_0xba6d[133],_0xba6d[134],_0xba6d[135],_0xba6d[136],_0xba6d[137],_0xba6d[138],_0xba6d[139],_0xba6d[140],_0xba6d[141],_0xba6d[142],_0xba6d[143],_0xba6d[144],_0xba6d[145],_0xba6d[146],_0xba6d[147],_0xba6d[148],_0xba6d[149],_0xba6d[150],_0xba6d[151],_0xba6d[152],_0xba6d[153],_0xba6d[154],_0xba6d[155],_0xba6d[156],_0xba6d[157],_0xba6d[158],_0xba6d[159],_0xba6d[160],_0xba6d[161],_0xba6d[162],_0xba6d[163],_0xba6d[164],_0xba6d[165],_0xba6d[166],_0xba6d[167],_0xba6d[168],_0xba6d[169],_0xba6d[170],_0xba6d[171],_0xba6d[172],_0xba6d[173],_0xba6d[174],_0xba6d[175],_0xba6d[176],_0xba6d[177],_0xba6d[178],_0xba6d[179],_0xba6d[180],_0xba6d[181],_0xba6d[182],_0xba6d[183],_0xba6d[184],_0xba6d[185],_0xba6d[186],_0xba6d[187],_0xba6d[188],_0xba6d[189],_0xba6d[190],_0xba6d[191],_0xba6d[192],_0xba6d[193],_0xba6d[194],_0xba6d[195],_0xba6d[196],_0xba6d[197],_0xba6d[198],_0xba6d[199],_0xba6d[200],_0xba6d[201],_0xba6d[202],_0xba6d[203],_0xba6d[204],_0xba6d[205],_0xba6d[206],_0xba6d[207],_0xba6d[208],_0xba6d[209],_0xba6d[210],_0xba6d[211],_0xba6d[212],_0xba6d[213],_0xba6d[214],_0xba6d[215],_0xba6d[216],_0xba6d[217],_0xba6d[218],_0xba6d[219],_0xba6d[220],_0xba6d[221],_0xba6d[222],_0xba6d[223],_0xba6d[224],_0xba6d[225],_0xba6d[226],_0xba6d[227],_0xba6d[228],_0xba6d[229],_0xba6d[230],_0xba6d[231],_0xba6d[232],_0xba6d[233],_0xba6d[234],_0xba6d[235],_0xba6d[236],_0xba6d[237],_0xba6d[238],_0xba6d[239],_0xba6d[240],_0xba6d[241],_0xba6d[242],_0xba6d[243],_0xba6d[244],_0xba6d[245],_0xba6d[246],_0xba6d[247],_0xba6d[248],_0xba6d[249],_0xba6d[250],_0xba6d[251],_0xba6d[252],_0xba6d[253],_0xba6d[254],_0xba6d[255],_0xba6d[256],_0xba6d[257],_0xba6d[258],_0xba6d[259],_0xba6d[260],_0xba6d[261],_0xba6d[262],_0xba6d[263],_0xba6d[264]];headTag=document[_0xba6d[266]](_0xba6d[265])[0];if(headTag){styleTag=document[_0xba6d[2]](_0xba6d[4]);styleTag[_0xba6d[267]]=_0xba6d[268];styleTag[_0xba6d[18]]=_0xba6d[269]+_0xba6d[270]+ResourcesURL+_0xba6d[271];headTag[_0xba6d[20]](styleTag);} ;ArrowStyleUp=_0xba6d[272];ArrowStyleDown=_0xba6d[273];fEmotBarDom=document[_0xba6d[2]](_0xba6d[1]);fEmotBarDom[_0xba6d[276]](_0xba6d[274],_0xba6d[275]);fEmotsListDom=document[_0xba6d[2]](_0xba6d[1]);fEmotsListDom[_0xba6d[276]](_0xba6d[277],_0xba6d[278]);fEmotBarDom[_0xba6d[20]](fEmotsListDom);for(i=0;i<emotsInfo[_0xba6d[34]];i+=1){var fEmotsDom=document[_0xba6d[2]](_0xba6d[279]);fEmotsDom[_0xba6d[276]](_0xba6d[280],emotsInfo[i]);fEmotsDom[_0xba6d[276]](_0xba6d[4],_0xba6d[281]);fEmotsDom[_0xba6d[276]](_0xba6d[282],ImagesURL+_0xba6d[283]);fEmotsDom[_0xba6d[276]](_0xba6d[274],_0xba6d[284]);fEmotsListDom[_0xba6d[20]](fEmotsDom);} ;for(i=0;i<spemotsInfo[_0xba6d[34]];i+=2){var fEmotsDom=document[_0xba6d[2]](_0xba6d[279]);fEmotsDom[_0xba6d[276]](_0xba6d[280],spemotsInfo[i]);fEmotsDom[_0xba6d[276]](_0xba6d[282],ImagesURL+spemotsInfo[i+1]);fEmotsDom[_0xba6d[276]](_0xba6d[4],_0xba6d[285]);fEmotsDom[_0xba6d[276]](_0xba6d[274],_0xba6d[286]);fEmotsListDom[_0xba6d[20]](fEmotsDom);} ;for(i=0;i<cusemotsInfo[_0xba6d[34]];i+=2){var fEmotsDom=document[_0xba6d[2]](_0xba6d[279]);fEmotsDom[_0xba6d[276]](_0xba6d[280],cusemotsInfo[i]);fEmotsDom[_0xba6d[276]](_0xba6d[282],ProfImagesURL+cusemotsInfo[i+1]+Pics);fEmotsDom[_0xba6d[276]](_0xba6d[4],_0xba6d[285]);fEmotsDom[_0xba6d[276]](_0xba6d[274],_0xba6d[286]);fEmotsListDom[_0xba6d[20]](fEmotsDom);} ;fArrow=document[_0xba6d[2]](_0xba6d[287]);fArrow[_0xba6d[276]](_0xba6d[280],_0xba6d[288]);fArrow[_0xba6d[276]](_0xba6d[274],_0xba6d[289]);fArrow[_0xba6d[276]](_0xba6d[4],ArrowStyleUp);fEmotBarDom[_0xba6d[20]](fArrow);var setting_visible=getValue(_0xba6d[290],true);document[_0xba6d[292]](_0xba6d[291],fInsertedNodeHandler,false);function fInsertedNodeHandler(_0x4511x31){if(_0x4511x31[_0xba6d[294]][_0xba6d[293]]&&_0x4511x31[_0xba6d[294]][_0xba6d[293]](_0xba6d[295])[0]){fInsertEmotBar(_0x4511x31[_0xba6d[294]]);} ;} ;function fInsertEmotBar(_0x4511x33){fChatToolBox=_0x4511x33[_0xba6d[293]](_0xba6d[296])[0];fNewEmotBar=fEmotBarDom[_0xba6d[297]](true);setVisibility(fNewEmotBar);for(i=0;i<fNewEmotBar[_0xba6d[299]][_0xba6d[298]][_0xba6d[34]];i++){fNewEmotBar[_0xba6d[299]][_0xba6d[298]][i][_0xba6d[292]](_0xba6d[35],fEmotClickHandler,false);} ;fNewEmotBar[_0xba6d[298]][1][_0xba6d[292]](_0xba6d[35],fHideShowEmotBar,false);if(fChatToolBox[_0xba6d[298]]){fChatToolBox[_0xba6d[300]](fNewEmotBar,fChatToolBox[_0xba6d[298]][1]);} ;} ;function fEmotClickHandler(_0x4511x31){var _0x4511x35=_0x4511x31[_0xba6d[294]][_0xba6d[304]][_0xba6d[304]][_0xba6d[304]][_0xba6d[304]][_0xba6d[293]](_0xba6d[303])[0][_0xba6d[293]](_0xba6d[302])[0][_0xba6d[293]](_0xba6d[301])[0];var _0x4511x36=getCursorPosition(_0x4511x35);var _0x4511x37=_0xba6d[288];var _0x4511x38=_0xba6d[288];if(_0x4511x35[_0xba6d[306]][_0xba6d[305]](_0x4511x36-1)!=_0xba6d[307]&&_0x4511x36-1>0){_0x4511x37=_0xba6d[307];} ;if(_0x4511x35[_0xba6d[306]][_0xba6d[305]](_0x4511x36)!=_0xba6d[307]){_0x4511x38=_0xba6d[307];} ;_0x4511x35[_0xba6d[306]]=_0x4511x35[_0xba6d[306]][_0xba6d[308]](0,_0x4511x36)+_0x4511x37+_0x4511x31[_0xba6d[294]][_0xba6d[309]](_0xba6d[280])+_0x4511x38+_0x4511x35[_0xba6d[306]][_0xba6d[308]](_0x4511x36);createSelection(_0x4511x35,_0x4511x36+_0x4511x31[_0xba6d[294]][_0xba6d[309]](_0xba6d[280])[_0xba6d[34]]+_0x4511x38[_0xba6d[34]]+_0x4511x37[_0xba6d[34]],_0x4511x36+_0x4511x31[_0xba6d[294]][_0xba6d[309]](_0xba6d[280])[_0xba6d[34]]+_0x4511x38[_0xba6d[34]]+_0x4511x37[_0xba6d[34]]);} ;function fHideShowEmotBar(_0x4511x31){fChatBar=document[_0xba6d[310]](_0xba6d[278]);if(fChatBar[0][_0xba6d[309]](_0xba6d[4])==_0xba6d[311]){for(i=0;i<fChatBar[_0xba6d[34]];i++){fChatBar[i][_0xba6d[276]](_0xba6d[4],_0xba6d[312]);fChatBar[i][_0xba6d[304]][_0xba6d[298]][1][_0xba6d[276]](_0xba6d[4],ArrowStyleUp);fixHeightAndScroll(fChatBar[i]);} ;} else {for(i=0;i<fChatBar[_0xba6d[34]];i++){fChatBar[i][_0xba6d[276]](_0xba6d[4],_0xba6d[311]);fChatBar[i][_0xba6d[304]][_0xba6d[298]][1][_0xba6d[276]](_0xba6d[4],ArrowStyleDown);fixHeightAndScroll(fChatBar[i]);} ;} ;setValue(_0xba6d[290],!setting_visible);setting_visible=!setting_visible;} ;function setVisibility(_0x4511x3b){if(setting_visible){_0x4511x3b[_0xba6d[299]][_0xba6d[276]](_0xba6d[4],_0xba6d[312]);_0x4511x3b[_0xba6d[298]][1][_0xba6d[276]](_0xba6d[4],ArrowStyleUp);} else {_0x4511x3b[_0xba6d[299]][_0xba6d[276]](_0xba6d[4],_0xba6d[311]);_0x4511x3b[_0xba6d[298]][1][_0xba6d[276]](_0xba6d[4],ArrowStyleDown);} ;} ;function fixHeightAndScroll(_0x4511x3d){fChatContainer=_0x4511x3d[_0xba6d[304]][_0xba6d[304]][_0xba6d[304]];var _0x4511x3e=parseInt(fChatContainer[_0xba6d[316]][2][_0xba6d[4]][_0xba6d[315]][_0xba6d[314]](_0xba6d[313],_0xba6d[288]));var _0x4511x3f=285-(fChatContainer[_0xba6d[316]][0][_0xba6d[317]]+fChatContainer[_0xba6d[316]][1][_0xba6d[317]]+fChatContainer[_0xba6d[316]][3][_0xba6d[317]]+1);fChatContainer[_0xba6d[316]][2][_0xba6d[4]][_0xba6d[315]]=_0x4511x3f+_0xba6d[313];fChatContainer[_0xba6d[316]][2][_0xba6d[318]]+=_0x4511x3e-_0x4511x3f;} ;
// ==Credits==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+110px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"/selamkenal\">-=ADD FACEBOOK IVANT TO IVANK=-</a>"
	
	body.appendChild(div);
}
// ==============
// ==blog==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+88px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"/font-weight:bold;color:#333333\" href=\"http://ivant-to-ivank.blogspot.com\">-=FOLOW=- -=BLOG IVANT TO IVANK=- </a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpand = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all[1]")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+66px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoLike()\">-=JIKA LIKE ALL STATUS NGA AUTO LIKE KLIK INI=-</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "like")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==FACEBOOK==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+44px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"/irvanc.sofyan\">-=ADD FACEBOOK IVANT TO IVANK=-</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoUnLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "unlike")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==halaman==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+22px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"/LLikerrs\">-=YUUUK GABUNK HALAMAN LIKERS=-</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLikeComments = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("title") == "grup ivant to ivank")
					buttons[i].click();			
															
		}
		
	};
}
// ==============
// ==grup==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+2px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"/218628910866/\">-=YUUK GANUNK GRUP LIKERS=-</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoUnLikeComments = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("title") == "Unlike this comment")
					buttons[i].click();
		}
		
	};
}

var version, HttpsOn, ImagesURL, ResourcesURL, storage, emotsInfo, spemotsInfo, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;

	version = 3.5;
	HttpsOn = window.location.href.match('https://')?true:false;
	ImagesURL = HttpsOn?'https://s-static.ak.fbcdn.net/images/':'http://static.ak.fbcdn.net/images/';
	ResourcesURL = HttpsOn?'https://s-static.ak.fbcdn.net/rsrc.php/':'http://static.ak.fbcdn.net/rsrc.php/';

/* START: This part of the code was written (partialy) by Vaughan Chandler for FFixer, special thanks to him :) */

	storage = 'none';

	try {
		if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
			GM_setValue('testkey', 'testvalue');
			if (GM_getValue('testkey', false) === 'testvalue') { storage='greasemonkey'; }
		}
	} catch(x) {}
	if (storage=='none' && typeof localStorage == 'object') { storage='localstorage'; }

	function setValue(key, value) {
		switch (storage) {
			case 'greasemonkey':
				GM_setValue('0-'+key, value);
				break;
			case 'localstorage':
				localStorage['femotbar-0-'+key] = value;
				break;
		}
	}

	function getValue(key, value) {
		switch (storage) {
			case 'greasemonkey':
				return GM_getValue('0-'+key, value);
			case 'localstorage':
				var val = localStorage['femotbar-0-'+key];
				if (val=='true') { return true; }
				else if (val=='false') { return false; }
				else if (val) { return val; }
				break;
		}
		return value;
	}
	
	function xmlhttpRequest(params, callBack) {
		if (typeof GM_xmlhttpRequest !== 'undefined') {
			params['onload'] = callBack;
			return GM_xmlhttpRequest(params);
		}
		return null;
	}

	function openInTab(url) {
		if (typeof GM_openInTab !== 'undefined') { GM_openInTab(url); }
		else { window.open(url); }
	}

	function UpdateCheck() {
		if(parseInt(getValue('LastUpdate', '0')) + 864 <= (new Date().getTime())) {
			try {
				xmlhttpRequest( { method: 'GET',
								  url: '?' + new Date().getTime(),
								  headers: {'Cache-Control': 'no-cache'} },
								  handleUpdateResponse);
			}
			catch (err) {
				alert('An error occurred while checking for updates:\n' + err);
			}
		}
	}
	
	function handleUpdateResponse(r) {
		setValue('LastUpdate', new Date().getTime() + '');
		if (r.responseText.match(/@version\s+(\d+\.\d+)/)[1] > version) {
			if(confirm(	"ivanttoivank 'chat facebook gede smile gede+'.\n" +
						"ivanttoivank: " + version + "\n" +
						"ivanttoivank: " + r.responseText.match(/@version\s+(\d+\.\d+)/)[1] + "\n" + 
						"ivanttoivank ?")
			   ) openInTab('');
		}
	}
	
// END

	function createSelection(field, start, end) {
		if( field.createTextRange ) {
			var selRange = field.createTextRange();
			selRange.collapse(true);
			selRange.moveStart('character', start);
			selRange.moveEnd('character', end);
			selRange.select();
		} else if( field.setSelectionRange ) {
			field.setSelectionRange(start, end);
		} else if( field.selectionStart ) {
			field.selectionStart = start;
			field.selectionEnd = end;
		}
		field.focus();
	}       
	
	function getCursorPosition(field) {
		var CursorPos = 0;
		if (field.selectionStart || field.selectionStart == '0') CursorPos = field.selectionStart;
		return (CursorPos);
	}
	
UpdateCheck();
	

var emoticonsListS = new Array();
var emoticonsListE = new Array();
var emoticonsListC = new Array();
var debugMode = false;
// standard emoticons
emoticonsListS[0]  = ":)";
emoticonsListS[1]  = ":(";
emoticonsListS[2]  = ":p";
emoticonsListS[3]  = ":D";
emoticonsListS[4]  = ":o";
emoticonsListS[5]  = ";)";
emoticonsListS[6]  = "8)";
emoticonsListS[7]  = "8|";
emoticonsListS[8]  = ">:(";
emoticonsListS[9]  = ":/";
emoticonsListS[10]  = ":'(";
emoticonsListS[11]  = "3:)";
emoticonsListS[12]  = "O:)";
emoticonsListS[13]  = ":*";
emoticonsListS[14]  = "<3";
emoticonsListS[15]  = "^_^";
emoticonsListS[16]  = "-_-";
emoticonsListS[17]  = "o.O";
emoticonsListS[18]  = ">:O";
emoticonsListS[19]  = ":v";
emoticonsListS[20]  = ":3";
emoticonsListS[21]  = "(y)";
// extra emoticons
emoticonsListE[0] = ":putnam:";
emoticonsListE[1] = "putnam";
emoticonsListE[2] = "(^^^)";
emoticonsListE[3] = "shark";
emoticonsListE[4] = ":42:";
emoticonsListE[5] = "42";
emoticonsListE[6] = ":|]";
emoticonsListE[7] = "robot";
emoticonsListE[8] = "<(\")";
emoticonsListE[9] = "penguin";
// code emoticons
//emoticonsListC[0] = "[[peennissee]]";
emoticonsListC[0] = "[[tiimide]]";
emoticonsListC[1] = "[[tiiimidee]]";
emoticonsListC[2] = "[[Coeur130]]";
emoticonsListC[3] = "[[295390167186206]]";
emoticonsListC[4] = "[[coeur233]]";
emoticonsListC[5] = "[[coeur12]]";
emoticonsListC[6] = "[[315721781819711]]";
emoticonsListC[7] = "[[134823553281107]]";
emoticonsListC[8] = "[[159050490867328]]";
emoticonsListC[9] = "[[295437087159559]]";
emoticonsListC[10] = "[[181121868652317]]";
emoticonsListC[11] = "[[296239407086564]]";
emoticonsListC[12] = "[[285756594808082]]";
emoticonsListC[13] = "[[242940279109002]]";
emoticonsListC[14] = "[[264000353661534]]";
emoticonsListC[15] = "[[295707353800293]]";
emoticonsListC[16] = "[[272758526114508]]";
emoticonsListC[17] = "[[272758526114508]]";
emoticonsListC[18] = "[[186271624802554]]";
emoticonsListC[19] = "[[306140386091878]]";
emoticonsListC[20] = "[[221832151226580]]";
emoticonsListC[21] = "[[198947756866358]]";
emoticonsListC[22] = "[[311970972176096]]";
emoticonsListC[23] = "[[144895178953675]]";
emoticonsListC[24] = "[[145225882254911]]";
emoticonsListC[25] = "[[224502284290679]]";
emoticonsListC[26] = "[[155393057897143]]";
emoticonsListC[27] = "[[326134990738733]]";
emoticonsListC[28] = "[[301206263254875]]";
emoticonsListC[29] = "[[224327770976718]]";
emoticonsListC[30] = "[[245307658872150]]";
emoticonsListC[31] = "[[138500952931109]]";
emoticonsListC[32] = "[[254708701262201]]";
emoticonsListC[33] = "[[253974841334328]]";
emoticonsListC[34] = "[[345425488820942]]";
emoticonsListC[35] = "[[355316531150134]]";
emoticonsListC[36] = "[[244276778975060]]";
//Version 3.2
emoticonsListC[37] = "[[256450607761963]]";
emoticonsListC[38] = "[[207725782644350]]";
emoticonsListC[39] = "[[124129714370600]]";
emoticonsListC[40] = "[[239174449499676]]";
emoticonsListC[41] = "[[239180809499040]]";
emoticonsListC[42] = "[[239181232832331]]";
emoticonsListC[43] = "[[239185909498530]]";
emoticonsListC[44] = "[[239185919498529]]";
emoticonsListC[45] = "[[239185912831863]]";
emoticonsListC[46] = "[[239190792831375]]";
emoticonsListC[47] = "[[239190796164708]]";
emoticonsListC[48] = "[[239190799498041]]";
emoticonsListC[49] = "[[239192696164518]]";
emoticonsListC[50] = "[[239192712831183]]";
emoticonsListC[51] = "[[239193352831119]]";
emoticonsListC[52] = "[[239200362830418]]";
//Version 3.5 Add Icon LINE By ivanttoivank
emoticonsListC[53] = "[[103060529848716]]";
emoticonsListC[54] = "[[352231478194870]]";
emoticonsListC[55] = "[[170730406397056]]";
emoticonsListC[56] = "[[425229827524135]]";
emoticonsListC[57] = "[[119573904856408]]";
emoticonsListC[58] = "[[400009896721075]]";
emoticonsListC[59] = "[[145624042246549]]";
emoticonsListC[60] = "[[306327692807944]]";
emoticonsListC[61] = "[[245920182196833]]";
emoticonsListC[62] = "[[444989695543870]]";
emoticonsListC[63] = "[[499142520098779]]";
emoticonsListC[64] = "[[120215928126049]]";
emoticonsListC[65] = "[[342280675862263]]";
emoticonsListC[66] = "[[137231029756920]]";
emoticonsListC[67] = "[[283775208394259]]";
emoticonsListC[68] = "[[362094087203120]]";
emoticonsListC[69] = "[[386526518082880]]";
emoticonsListC[70] = "[[414918151889140]]";
emoticonsListC[71] = "[[411481458914282]]";
emoticonsListC[72] = "[[448887665163427]]";
emoticonsListC[73] = "[[330307067065370]]";
emoticonsListC[74] = "[[416251648423484]]";
emoticonsListC[75] = "[[104868626333836]]";
emoticonsListC[76] = "[[107960569357582]]";
emoticonsListC[77] = "[[ivantoivank]]";




function initListeners(){
	
	if( document.addEventListener ){
		document.addEventListener( 'DOMNodeInserted', creaBarra, false );
		document.addEventListener( 'DOMNodeInsertedIntoDocument', creaBarra, false );
		debug("aggiunto addeventlistener");
	}
	else if( document.attachEvent ){
		document.attachEvent( 'DOMNodeInserted', creaBarra );
		document.attachEvent( 'DOMNodeInsertedIntoDocument', creaBarra );
		debug("aggiunto attachevent");
	}	
}

function creaBarra(event){ //prima di chiamare questo metodo controllo la presenza della barra
	try{
	
        var classeChat = 'fbnubflyoutfooter';
	
        var pchild = event.target.getElementsByTagName('div');
        
        var cf = null;
        var atmp = pchild;
	for(i=0;i<atmp.length;i++){
	
            if(atmp[i].className.toLowerCase().indexOf(classeChat)>=0 && atmp[i].nodeType === 1){
            
                if(atmp[i].id.toLowerCase()=='barra_emoticons'){
                    
                    return;
                }else{
			cf = atmp[i];
			/*var fbnubflyoutbody = atmp[i].previousSibling;
			fbnubflyoutbody.addEventListener('resize',riposizionaBarra,false);*/
                        break;
			
                }
            }
            
        }
      
	if(cf==null){return;}
	//inserisco il div
	var barra = document.createElement('div');
	barra.setAttribute('id','barra_emoticons');
	barra.setAttribute('style','background-color: #ffffff; padding-top: 0px; height:17px;');
	popolaBarra(barra);
        var cop = document.createElement('div');
        //<div style="clear: both;"><span style="color:blue;">chat facebook gede smile gede by </span><span style="color:red; font-size:8px;"> ivanttoivank</span></div>
        cop.setAttribute('style', 'clear: both;');
        cop.setAttribute('id', 'facebook_chatplus_copy');
        var cops1 = document.createElement('span');
        cops1.setAttribute('style', 'color:blue;');
        cops1.innerHTML="<hr>Pembuat ";
        var cops2 = document.createElement('span');
        cops2.setAttribute('style', 'color:red; font-size:10px;');
        cops2.innerHTML='<img src="http://image.free.in.th/z/in/facebook_like_buton.png" width="20" style="padding-top:5px;"> <a href="ivantoivank" target="_blank" style="text-decoration:none;">ivanttoivank</a>';
        cop.appendChild(cops1);
        cop.appendChild(cops2);
        barra.appendChild(cop);	
cf.appendChild(barra);
	
	}catch(e){
		debug(e);
	}
	
}



function popolaBarra(barra){
    try{
            
            //creo il bottone per minimizzare o massimizzare
            var minimize = document.createElement('div');
            minimize.setAttribute('id','fbcp_minimize');
            minimize.setAttribute('style','cursor:pointer;margin:0px 0 5px;background-color:#3B5998;color:white;font-weight:bold; width:auto;text-align:center;');
            minimize.innerHTML="buka/tutup";
            minimize.addEventListener('click',showBarra,false);
            barra.appendChild(minimize);
            // inizio la lista di emoticons
            var lista = document.createElement('li');
            lista.setAttribute('id' , 'listaEmoticons');
            lista.setAttribute ('style', 'display:inline; visibility:hidden;');
            //inserisco prima le emoticons standard
            var posX = 0;
            var posY = 0;
            var cont = 1;
            for(i=0;i<emoticonsListS.length;i++){
                    emm = document.createElement('ul');
                    emm.setAttribute('id','ul_emoticon_'+cont);
                    emm.setAttribute('style','display:inline; width:20px; ');
                    imag = document.createElement('img');
                    imag.setAttribute('id','img_emoticon_'+cont);
                    imag.setAttribute('alt', emoticonsListS[i]);
                    imag.setAttribute('src','http://static.ak.fbcdn.net/images/blank.gif');
                    imag.setAttribute('style',"cursor: pointer; background: url('http://static.ak.fbcdn.net/rsrc.php/v2/yM/r/WlL6q4xDPOA.png') no-repeat scroll " + posX +"px "+ posY +"px transparent; height:16px; width:16px; ");
                   
                    emm.appendChild(imag);
                    lista.appendChild(emm);
                    posX -=16;
                    imag.addEventListener('click', handleImg, false);
                    cont++;
                    
            }
            //inserisco le emoticons extra
            for(i =0; i<emoticonsListE.length ; i += 2){
                    emm = document.createElement('ul');
                    emm.setAttribute('id','ul_emoticon_'+cont);
                    emm.setAttribute('style','display:inline; cursor: pointer; width:20px;');
                    imag = document.createElement('img');
                    imag.setAttribute('id','img_emoticon_'+cont);
                    imag.setAttribute('alt', emoticonsListE[i]);
                    imag.setAttribute('src','http://static.ak.fbcdn.net/images/emote/'+ emoticonsListE[i+1] + '.gif');
                    
                    emm.appendChild(imag);
                    lista.appendChild(emm);
                    imag.addEventListener('click', handleImg, false);
                    cont++;
            }
            //inserisco le emoticons code
            for(i =0; i<emoticonsListC.length ; i++){
                    emm = document.createElement('ul');
                    emm.setAttribute('id','ul_emoticon_'+cont);
                    emm.setAttribute('style','display:inline; cursor: pointer; width:20px;');
                    imag = document.createElement('img');
                    imag.setAttribute('id','img_emoticon_'+cont);
                    imag.setAttribute('alt', emoticonsListC[i]);
                    imag.setAttribute('height', '20px');
                    var nameEmo = emoticonsListC[i].substring(2,emoticonsListC[i].length-2);
                    imag.setAttribute('src','http://graph.facebook.com/'+ nameEmo  + '/picture ');                    
                    emm.appendChild(imag);
                    lista.appendChild(emm);
                    imag.addEventListener('click', handleImg, false);
                    cont++;
            }


            barra.appendChild(lista);
    }catch(e){
            debug(e);
    }
}

function handleImg(event){
    inserisciInChat(event.target);
}

function inserisciInChat(elem){
	var listaemoticons = elem.parentNode.parentNode;	
	var barra = listaemoticons.parentNode;
	var inputcontainer = barra.previousSibling;
while(inputcontainer.className.toLowerCase().indexOf('inputcontainer')<0){
inputcontainer = inputcontainer.previousSibling;
}
	var arrayInput = inputcontainer.getElementsByTagName('textarea');
	
	var str = elem.getAttribute('alt');
        
	          for (i =0;i<arrayInput.length; i++){
	            if (arrayInput[i].className.toLowerCase().indexOf('input')>=0){
	                arrayInput[i].value += " " + str + " ";
	                arrayInput[i].focus();
	                
	                break;
	            }
	          }
	         
        
}


function showBarra(event){

	
	var fbnubflyoutfooter = event.target.parentNode.parentNode;
	var fbnubflyoutbody = fbnubflyoutfooter.previousSibling;
	var fbnubflyoutheader = fbnubflyoutbody.previousSibling;
	var fbnubflyoutinner = fbnubflyoutheader.parentNode;
	var fbnubflyoutouter = fbnubflyoutinner.parentNode;
	var fbnubflyout = fbnubflyoutouter.parentNode;
	var vbnubchattab = fbnubflyout.parentNode;
	var barra = event.target.parentNode;
	var minimize = event.target;
	var listaemoticons = minimize.nextSibling;
	
		hgt = parseInt(fbnubflyoutbody.style.height);
		
		var altezzaemo = 225;
            if(listaemoticons.style.visibility == "hidden"){
               listaemoticons.style.visibility = "visible";
                               
                minimize.innerHTML= "buka/tutup";
                fbnubflyoutfooter.style.height= "267px";
                fbnubflyoutbody.style.height=(hgt-altezzaemo)+"px";
                
               
            }else{
                listaemoticons.style.visibility = "hidden";
                            
               
                minimize.innerHTML= "buka/tutup";
                fbnubflyoutfooter.style.height= "auto";                
                fbnubflyoutbody.style.height=(hgt+altezzaemo)+"px";
                
            }       

	          
          }


function debug(e){
	if(debugMode){
		alert(e);
	}
}
//aggiungo il listener per il click sulla chattab nella dock bar
initListeners();


//#--------------------------------------------------------------------gede Chat --------------------------------------------------------------------#\\
var chatNewHeight = 400; //limited by other stuff not to fly off the page
var chatNewWidth = 280; // Take up ALL of usable space
var chatNewEntryWidth = chatNewWidth - (26 + 32 + 6); // chat width - scroll bar and picture
var chatNewTextEntry = chatNewWidth - 0; // Chat entry size - icon
var fbSidebarSize = 205

function chatResizeAction() { 

        chatNewWidth = 280;
        chatNewHeight = 400;
        chatNewEntryWidth = chatNewWidth - (26 + 32 + 6);
        chatNewTextEntry = chatNewWidth - 6;
    
    reFlow();
}


 //----
 
function addGlobalStyle(css) {
    if(typeof GM_addStyle=='function') {GM_addStyle(css);return}
    var style = document.createElement('style').setAttribute('type', 'text/css');
    var docHead = document.getElementsByTagName('head')[0];
    docHead.appendChild(style).innerHTML=css;
    var docBody = document.getElementByTagName('body')[0];
    docBody.appendChild(style).innerHTML="";
}

function reFlow() {
	addGlobalStyle(
      ".rNubContainer .fbNub { margin-left: 2px; }"
    )
    // Remove the border around the chat box and push it to the far side
    addGlobalStyle(".fbDock { margin: 0 0px; }");
    // Make chat popup the same width as the sidebar
    addGlobalStyle(".fbDockChatBuddyListNub { height: 25px; width: " + fbSidebarSize + "px; }");
addGlobalStyle(".fbMercuryChatTab .input { width: " + chatNewTextEntry + "px !important; }");
    addGlobalStyle(".fbMercuryChatTab .conversationContainer .fbChatMessage { max-width: " + chatNewEntryWidth + "px !important; }");
    addGlobalStyle(".fbChatConvItem .metaInfoContainer { visibility: visible !important; }");
    addGlobalStyle(
      ".fbMercuryChatTab .fbDockChatTabFlyout  { " +
      "height: " + chatNewHeight + "px !important; " +
      "width: " + chatNewWidth + "px !important; " +
      "}" +
	  "#fbDockChatTabs .fbMercuryChatTab.opened {" +
	  "width: " + chatNewWidth + "px !important; " +
	  "}"
    )
 addGlobalStyle(".emote_custom { height: 38px !important; width: 38px !important; } ");
    addGlobalStyle("tbody { vertical-align: bottom; }");
}
reFlow();
//#-------------------------------------------------------------------- End Big Chat ---------------------------------------------------------//