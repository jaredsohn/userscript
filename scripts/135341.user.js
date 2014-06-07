// ==UserScript==
// @name           Auto Replace Words on SiamBit.org
// @namespace      http://userscripts.org/scripts/show/135341
// @description    Clean out words about movie encoding to make you easy reading. Clean out some useless icons and pics.
// @version        23
// @icon           http://s3.amazonaws.com/uso_ss/icon/135341/large.png?1339007084
// @include        /http(s)?://(www.)?madoomee.com(:69)?/
// @exclude        /http(s)?://(www.)?madoomee.com(:69)?/details.php/
// @exclude        /http(s)?://(www.)?madoomee.com(:69)?/upload.php/
// @include        /http(s)?://(www.)?siambit.(org|com|tv)/
// @exclude        /http(s)?://(www.)?siambit.(org|com|tv)/toserv.php/
// ==/UserScript==

var HTML = document.body.innerHTML;

//madoomee
HTML = HTML.replace(/ภาพยนตร์ DVD-ISO</,    'ภาพยนตร์ DVD<');
HTML = HTML.replace(/ภาพยนตร์ Hi-Def</,     'ภาพยนตร์ HD<');         //madoomee & siambit
HTML = HTML.replace(/ภาพยนตร์ XviD\/DivX</, 'ภาพยนตร์ AVI<');
HTML = HTML.replace(/ภาพยนตร์</,            'ภาพยนตร์ VCD<');
HTML = HTML.replace(/<a href="details.php\?id=(\d+)&amp;hit=1">/ig, '<a href="details.php?id=$1" target=_blank>');
HTML = HTML.replace(/<a class="catlink" href="browse.php\?cat=9">.<\/a>/i, '<a class="catlink" href="browse.php?cat=9">XXX</a>');
HTML = HTML.replace(/<option value="9"( selected="selected")?>.<\/option>/i, '<option value="9" $1>XXX</option>');
HTML = HTML.replace(/<img src="pic\/free.gif" border="0">/ig, '');
HTML = HTML.replace(/<img src="pic\/p\d+.gif" alt="pet" border="0">/ig, '');
HTML = HTML.replace(/<img src="pic\/x(l|r|f).gif">/ig, '');
HTML = HTML.replace(/<img src="pic\new.gif">/ig, '');

//SiamBit
HTML = HTML.replace(/<table (.|\n)+?logo_siambit(.|\n)+?<\/table>/im, '');             //header
HTML = HTML.replace(/<center>.+banner_redirect.php.+<\/a><\/center>/ig, '');           //banners
HTML = HTML.replace(/<a href="getupload.php">.+Get free upload!/i, '');                //get free upload menu
HTML = HTML.replace(/<br><a href="\/casinosiambit.php">.+<\/font><\/a><\/td>/i, '');   //games menu
//HTML = HTML.replace(/<p align="center"><font color="#6666ff" (.|\n)+?Donated.php(.|\n)+?<\/td><\/tr><\/tbody><\/table><br>/im, '');
//HTML = HTML.replace(/<p align="center"><font color="#6666ff" (.|\n)+?<\/marquee><\/td><\/tr><\/tbody><\/table>/im, '');
HTML = HTML.replace(/<p align="center"><font color="#6666ff" (.|\n)+?Tip:(.|\n)+?<\/p>/im, '');
HTML = HTML.replace(/<table align="center" border="0" width="550">(.|\n)+?แลกเปลี่ยนเพื่อความบันเทิง(.|\n)+?<\/td><\/tr><\/tbody><\/table><br>/im, '');
HTML = HTML.replace(/<br> <table bgcolor="#728C00" border="0" cellpadding="5" cellspacing="0" width="800">(.|\n)+?<\/table><br>/im, '');
//----------------------------------------------------------------------------------------------------------------------------------------------------------
HTML = HTML.replace(/<img src="pic\/downloadpic.gif" .+ title="Download" align="left">/, '');            //หน้า detail ช่อง download
HTML = HTML.replace(/ใช้โปรแกรม .+ ในการ Download ไฟล์ เท่านั้น/, '');                                   //หน้า detail ช่อง download
HTML = HTML.replace(/<tr><td class="rowhead" width="12%">Advertising<br>(.|\n)+?<\/td><\/tr>/im, '');    //หน้า detail ช่อง advertising
HTML = HTML.replace(/.gif%20"/ig, '.gif"');
HTML = HTML.replace(/pic\/crown\d*.gif/ig, 'http://goo.gl/dTrj');
HTML = HTML.replace(/pic\/(male|female|gay|new1|hot1|star|heart|off|starnews|disabled|x4|fb_big).gif/ig, 'http://goo.gl/dTrj');
HTML = HTML.replace(/pic\/fb_id.png/ig, 'http://goo.gl/dTrj');
HTML = HTML.replace(/(http:\/\/siambit.org)?(\/)?pic\/(usericon|doll|thanks|smilies)\/\S+.gif/ig, 'http://goo.gl/dTrj');
HTML = HTML.replace(/<tr ((?!<\/tr>)(.|\n))+?ShungOu(.|\n)+?<\/tr>/ig, '');
HTML = HTML.replace(/<object ((?!<\/object>).)+?www.youtube.com\/v\/(.+?)(&amp;rel=0)?">.+?<\/object>/ig, '<iframe width="640" height="480" src="//www.youtube.com/embed/$2" frameborder="0"></iframe>');

//Clean out movie encoding words
HTML = HTML.replace(/(AC[\.\-\s]?3|DTS|AAC|DTS|Dolby)/ig, "");
//HTML = HTML.replace(/(DD|HL|LPCM|TH)[\.\-\s]?(5|7)[\.\-\s]?1/ig, "");
HTML = HTML.replace(/(DTSHD|HD)[\.\-\s]?MA/ig, "");
HTML = HTML.replace(/(7\.1|5\.1)/ig, "");
HTML = HTML.replace(/(x|h)[\.\-\s]?(263|264)/ig, "");
HTML = HTML.replace(/(super\s)?Mini[\.\-\s]?(HD|BD|hidef)/ig, "");
HTML = HTML.replace(/m-?hd/ig, "");
HTML = HTML.replace(/Hi[\.\-\s]?Def/ig, "");
HTML = HTML.replace(/Blu[\.\-\s]?Ray/ig, "");
HTML = HTML.replace(/(HD|BR|BD|DVD)[\.\-\s]?rip/ig, "");
HTML = HTML.replace(/AVC|XVID|(VC|MPEG|MPG)[\.\-\s]?(1|2)/ig, "");
HTML = HTML.replace(/H[\.\-\s]?Q[\.\-\s]?/ig, "");
HTML = HTML.replace(/(\[Modified\]|\[Rip\])/ig, "");
HTML = HTML.replace(/(Remux|Encode|BDRM)/ig, "");
HTML = HTML.replace(/IMDB\s*\d.\d/ig, "");
HTML = HTML.replace(/Release Date\s?\:\s?/ig, "");
HTML = HTML.replace(/(หนังใหม่|มาใหม่|ร้อนๆ|มันส์|ชัดแจ่ม|คมชัดถึงใจ|เล็กพริกขี้หนู|HD For FanClub|ฟ.แฟน|ชัด\+กระหึ่ม|Full Bitrate|\[~.+?~\]|ซับไทยคมชัดสะใจ|ใหม่กริ๊บ|ชัดทะลุจอ|ใหม่)\!?/ig, "");
HTML = HTML.replace(/(CtHts|HDchina|CHD|HDS|HDC|-panda60|-softerman|-vdoboy|sakwor|O-ring|N-Rap|-ShungOu@HLS|@ZEZA|-จิ้งจอกเก้าหาง)/ig, "");
HTML = HTML.replace(/(\[\s*\])/ig, " ");

document.body.innerHTML = HTML;
