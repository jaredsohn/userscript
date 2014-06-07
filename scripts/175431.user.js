// ==UserScript==
// @name           HWM_Fantasy_Dict
// @namespace      http://diveintogreasemonkey.org/download/
// @description    HWM_Fantasy_Dict - quick fantasy phrases
// @version       0.1.3
// @include       http://www.lordswm.com/sms-create.php*
// @include       http://www.lordswm.com/war.php*
// @include       http://www.lordswm.com/warlog.php*
//
// 
// ==/UserScript==

// ========================================================

var phrases = []; // array of fantasy-style phrases
var phrase_case; // temp var for each phrase's variants
//
// =====================================================================================================
// Russian words below are in unicode. 
// Use http://rishida.net/scripts/uniview/conversion.php  or another converter for your own versions.
// =====================================================================================================
phrase_case = []; // poshel podalshe
phrase_case.push("\u0423\u043D\u043E\u0441\u0438 \u043E\u0442\u0441\u044E\u0434\u0430 \u043D\u043E\u0433\u0438, \u043F\u0440\u0430\u0445 \u0432\u043E\u043D\u044E\u0447\u0435\u0433\u043E \u043E\u0440\u043A\u0430."); 
phrase_case.push("\u0423\u043D\u043E\u0441\u0438 \u043E\u0442\u0441\u044E\u0434\u0430 \u043D\u043E\u0433\u0438 \u0438 \u043C\u043E\u043B\u0438\u0441\u044C, \u0447\u0442\u043E\u0431\u044B \u044F \u043D\u0435 \u043F\u0440\u043E\u0441\u0442\u0440\u0435\u043B\u0438\u043B \u0442\u0432\u043E\u0438 \u0441\u0432\u0435\u0440\u043A\u0430\u044E\u0449\u0438\u0435 \u043F\u044F\u0442\u043A\u0438!"); 
phrase_case.push("\u041F\u043E\u0448\u0435\u043B \u043F\u0440\u043E\u0447\u044C, \u0441\u044B\u043D \u0433\u0430\u0434\u044E\u043A\u0438!"); 
phrase_case.push("\u0418\u0437\u044B\u0434\u0438, \u0441\u044B\u043D \u0443\u0440\u0443\u043A\u0445\u0430\u0439\u0441\u043A\u043E\u0433\u043E \u0431\u043E\u0433\u043E\u043C\u043E\u043B\u0430!"); 
phrase_case.push("\u0418\u0437\u044B\u0434\u0438, \u041A\u0445\u0430-\u0411\u0435\u043B\u0435\u0445\u043E\u0432\u043E \u043E\u0442\u0440\u043E\u0434\u044C\u0435!"); 
phrase_case.push("\u0421\u0433\u0438\u043D\u044C \u0432\u043E \u0422\u044C\u043C\u0435, \u043D\u0435\u0447\u0438\u0441\u0442\u044C!"); 
phrase_case.push("\u0423\u0439\u0434\u0438 \u043F\u0440\u043E\u0447\u044C \u043D\u0430 \u043A\u0440\u044B\u043B\u044C\u044F\u0445 \u0441\u0442\u0440\u0430\u0445\u0430!"); 
phrase_case.push("\u0412\u043E\u043D \u0441 \u0433\u043B\u0430\u0437 \u043C\u043E\u0438\u0445, \u0432\u043E\u043B\u0448\u0435\u0431\u043D\u044B\u0439 \u043A\u0443\u043B\u0430\u043A \u0442\u0435\u0431\u0435 \u043D\u0430 \u0433\u043E\u043B\u043E\u0432\u0443!"); 
phrase_case.push("\u0418\u0441\u0447\u0435\u0437\u043D\u0438 \u043F\u043E\u043A\u0430 \u044F \u043D\u0435 \u0440\u0430\u0437\u043E\u0437\u043B\u0438\u043B\u0441\u044F."); 
phrase_case.push("\u0427\u0442\u043E\u0431 \u0441\u0433\u043E\u0440\u0435\u0442\u044C \u0442\u0435\u0431\u0435 \u0432 \u043F\u043B\u0430\u043C\u0435\u043D\u0438 \u0428\u0438\u043E, \u043D\u0435\u0447\u0435\u0441\u0442\u0438\u0432\u0435\u0446!"); 
phrase_case.push("\u0421\u0433\u0438\u043D\u044C, \u0441\u0433\u0438\u043D\u044C, \u043D\u0435\u0447\u0435\u0441\u0442\u0438\u0432\u044B\u0439 \u043C\u043E\u0440\u043E\u043A!"); 
phrase_case.push("\u0423\u0431\u0438\u0440\u0430\u0439\u0441\u044F \u0441 \u0433\u043B\u0430\u0437 \u043C\u043E\u0438\u0445, \u0430 \u0442\u043E \u043F\u043E\u043C\u043E\u0433\u0443 \u0434\u0443\u0431\u0438\u043D\u043E\u0439!"); 
phrase_case.push("\u041E\u0434\u043D\u0430\u0436\u0434\u044B \u0442\u044B \u043F\u043E\u0447\u0443\u0432\u0441\u0442\u0432\u0443\u0435\u0448\u044C, \u043A\u0430\u043A \u043C\u043E\u0439 \u043A\u043B\u0438\u043D\u043E\u043A \u043A\u0430\u0441\u0430\u0435\u0442\u0441\u044F \u0442\u0432\u043E\u0435\u0439 \u0448\u0435\u0438..."); 
phrase_case.push("\u0427\u0442\u043E\u0431 \u0442\u044B \u0436\u0438\u043B \u043D\u0430 \u043E\u0434\u043D\u0443 \u043E\u0445\u043E\u0442\u0443!"); 
phrase_case.push("\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0439\u0441\u044F \u043F\u043E \u0442\u0435\u043C\u043D\u043E\u0439 \u0434\u043E\u0440\u043E\u0433\u0435 \u0432 \u0428\u0438\u043E!"); 
phrase_case.push("\u0423\u0445\u043E\u0434\u0438, \u043F\u043E\u043A\u0430 \u043C\u043E\u0439 \u0442\u043E\u043F\u043E\u0440 \u043D\u0435 \u043F\u043E\u043C\u043E\u0433 \u0442\u0435\u0431\u0435"); 
//phrase_case.push("phrase1"); 
phrases.push(phrase_case);
//
//
phrase_case = []; // eto conec
phrase_case.push("\u041F\u043E\u043C\u043E\u043B\u0438\u043C\u0441\u044F..."); 
phrase_case.push("\u043A\u043E\u043D\u0447\u0438\u043B\u0430\u0441\u044C \u0431\u0438\u0442\u0432\u0430 - \u043D\u0430\u0447\u0430\u043B\u0430\u0441\u044C \u0431\u043E\u0439\u043D\u044F..."); 
phrase_case.push("\u0421\u043E\u0439\u0434\u0435\u043C\u0441\u044F \u0431\u0440\u0430\u0442\u044C\u044F \u043D\u0430 \u0442\u043E\u043C \u0441\u0432\u0435\u0442\u0435!"); 
phrase_case.push("\u041E, \u042D\u043B\u044C\u0440\u0430\u0442, \u0437\u0430 \u0447\u0442\u043E \u0442\u044B \u0442\u0430\u043A \u043A\u0430\u0440\u0430\u0435\u0448\u044C \u0441\u0432\u043E\u0435\u0433\u043E \u0432\u0435\u0440\u043D\u043E\u0433\u043E \u0441\u043B\u0443\u0433\u0443?"); 
phrase_case.push("\u0427\u0435\u043C \u0434\u0430\u043B\u044C\u0448\u0435 \u0432 \u043B\u0435\u0441,\u0442\u0435\u043C \u0442\u043E\u043B\u0449\u0435 \u044D\u043B\u044C\u0444\u044B"); 
phrase_case.push("\u0427\u0443\u044E, \u0440\u0430\u0437\u0432\u044F\u0437\u043A\u0430 \u0431\u043B\u0438\u0437\u043A\u0430 "); 
phrase_case.push("\u041D\u0435\u0434\u043E\u043B\u0433\u043E \u0435\u0449\u0451 \u0431\u0443\u0434\u0435\u0442 \u043B\u0438\u0442\u044C\u0441\u044F \u043A\u0440\u043E\u0432\u044C"); 
phrase_case.push("\u042F \u0432\u0438\u0434\u0435\u043B \u0441\u043C\u0435\u0440\u0442\u044C, \u0435\u0451 \u0432\u0435\u043D\u0435\u0446, \u0445\u043E\u0447\u0443 \u0441\u043A\u0430\u0437\u0430\u0442\u044C - \u044D\u0442\u043E \u043A\u043E\u043D\u0435\u0446."); 
phrase_case.push("\u0423\u0436\u0435 \u0433\u0440\u044F\u0434\u0435\u0442 \u0438\u0441\u0445\u043E\u0434 \u044D\u0442\u043E\u0439 \u0441\u0445\u0432\u0430\u0442\u043A\u0438."); 
phrase_case.push("\u0421\u043C\u0435\u0440\u0442\u044C \u043D\u0430\u0442\u043E\u0447\u0438\u043B\u0430 \u0443\u0436\u0435 \u043A\u043E\u0441\u0443 \u0441\u0432\u043E\u044E..."); 
phrase_case.push("\u0421\u043A\u043E\u0440\u043E \u042D\u043B\u044C\u0440\u0430\u0442 \u0432\u0441\u0435\u043C \u0432\u043E\u0437\u0434\u0430\u0441\u0442 \u043F\u043E \u0437\u0430\u0441\u043B\u0443\u0433\u0430\u043C."); 
phrase_case.push("\u041A\u0445\u0430-\u0411\u0435\u043B\u0435\u0445 \u0441\u043A\u043E\u0440\u043E \u043F\u043E\u043B\u0443\u0447\u0438\u0442 \u043F\u043E\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435!"); 
phrase_case.push("\u0429\u0430\u0441 \u043B\u0438\u0431\u043E \u043C\u044B \u0438\u0445, \u043B\u0438\u0431\u043E \u043E\u043D\u0438 \u043D\u0430\u0441."); 
//phrase_case.push("phrase2"); 
phrases.push(phrase_case);
//
//
phrase_case = []; // good move!
phrase_case.push("\u0415\u0449\u0435 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0442\u0430\u043A\u0438\u0445 \u0445\u043E\u0434\u043E\u0432, \u0438 \u043C\u044B \u043E\u0434\u0435\u0440\u0436\u0438\u043C \u0432\u0435\u0440\u0445!"); 
phrase_case.push("\u0411\u043B\u0430\u0433\u043E\u0441\u043B\u043E\u0432\u044F\u0442 \u0431\u043E\u0433\u0438 \u0442\u0432\u043E\u0439 \u0431\u043B\u0435\u0441\u0442\u044F\u0449\u0438\u0439 \u0443\u043C!"); 
phrase_case.push("\u0414\u0430 \u043F\u0440\u0438\u0431\u0443\u0434\u0435\u0442 \u0441 \u0442\u043E\u0431\u043E\u044E \u0432\u0441\u0435\u0433\u0434\u0430 \u0442\u0430\u043A\u0430\u044F \u0441\u043C\u0435\u043A\u0430\u043B\u043A\u0430, \u043E \u0432\u043E\u0438\u043D \u0432\u0435\u043B\u0438\u043A\u0438\u0439!"); 
phrase_case.push("\u0423\u0434\u0430\u0447\u043D\u0430 \u043C\u044B\u0441\u043B\u044C \u0442\u0432\u043E\u044F."); 
phrase_case.push("\u0411\u043B\u0430\u0433\u043E\u0441\u043B\u043E\u0432\u0438 \u0442\u0435\u0431\u044F \u042D\u043B\u044C\u0440\u0430\u0442!"); 
phrase_case.push("\u0411\u043B\u0430\u0433\u043E\u0441\u043B\u043E\u0432\u0438 \u0442\u0435\u0431\u044F \u0412\u0435\u043B\u0438\u043A\u0438\u0439 \u0420\u044D\u043D\u0434\u043E\u043C!"); 
phrase_case.push("\u0411\u043B\u0430\u0433\u043E\u0441\u043B\u043E\u0432\u0435\u043D\u043D\u044B \u0443\u043C \u0442\u0432\u043E\u0439 \u0438 \u0441\u043C\u0435\u043A\u0430\u043B\u043A\u0430."); 
phrase_case.push("\u0412\u0438\u0436\u0443, \u0424\u043E\u0440\u0442\u0443\u043D\u0430 \u0442\u0435\u0431\u044F \u0431\u043B\u0430\u0433\u043E\u0441\u043B\u043E\u0432\u0438\u043B\u0430."); 
phrase_case.push("\u0412\u043E\u0438\u0441\u0442\u0438\u043D\u0443 \u0445\u043E\u0440\u043E\u0448\u0438\u0439 \u0432\u043E\u0438\u043D!"); 
phrase_case.push("\u0422\u0432\u043E\u0439 \u0440\u0430\u0437\u0443\u043C \u0447\u0438\u0441\u0442 \u0438 \u0441\u0432\u0435\u0442\u0435\u043B, \u0438 \u043A\u0430\u043A \u044F \u0441\u0440\u0430\u0437\u0443 \u043D\u0435 \u0437\u0430\u043C\u0435\u0442\u0438\u043B?!"); 
phrase_case.push("\u0422\u0440\u0435\u0441\u043D\u0438 \u043C\u043E\u0438 \u0433\u043E\u043B\u0435\u043C\u044B! \u0422\u044B \u0443\u043C\u043D\u0435\u0435 \u0447\u0435\u043C \u043A\u0430\u0436\u0435\u0448\u044C\u0441\u044F!"); 
phrase_case.push("\u041F\u0440\u0435\u043A\u0440\u0430\u0441\u043D\u044B\u0439 \u0437\u0430\u043C\u044B\u0441\u0435\u043B, \u043E\u0442\u043B\u0438\u0447\u043D\u043E\u0435 \u0438\u0441\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435."); 
phrase_case.push("\u041A\u043E\u0441\u043C\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0434\u0440\u0430\u043A\u043E\u043D\u044B \u0410\u0441\u0445\u0438 \u0431\u043B\u0430\u0433\u043E\u0432\u043E\u043B\u044F\u0442 \u0442\u0435\u0431\u0435."); 
phrase_case.push("\u0422\u044B \u0434\u043E\u0441\u0442\u043E\u0438\u043D \u0438\u0441\u043F\u0438\u0442\u044C \u044D\u043B\u044F \u0441 \u0441\u0430\u043C\u0438\u043C \u0432\u043E\u0436\u0434\u0451\u043C!"); 
phrase_case.push("\u0414\u0430 \u0445\u0440\u0430\u043D\u044F\u0442 \u0442\u0435\u0431\u044F \u0431\u043E\u0433\u0438 \u043E\u0442 \u0441\u0442\u0440\u0435\u043B\u044B \u0438 \u043C\u0435\u0447\u0430."); 
//phrase_case.push("phrase3"); 
phrases.push(phrase_case);
//
//
phrase_case = []; // bad move...
phrase_case.push("\u0423\u0432\u044B, \u0441\u0438\u043B\u0430 \u043D\u0435 \u0443\u043C\u0435\u0435\u0442 \u0434\u0443\u043C\u0430\u0442\u044C..."); 
phrase_case.push("\u041A \u0441\u043E\u0436\u0430\u043B\u0435\u043D\u0438\u044E, \u0431\u043E\u0433\u0438 \u043F\u043E\u0441\u043B\u0430\u043B\u0438 \u043C\u043D\u0435 \u043D\u0435 \u043B\u0443\u0447\u0448\u0438\u0445 \u0441\u043E\u044E\u0437\u043D\u0438\u043A\u043E\u0432..."); 
phrase_case.push("\u0422\u0432\u043E\u0439 \u043C\u043E\u0437\u0433 \u0441\u044A\u0435\u043B\u0438 \u0433\u0440\u0435\u043C\u043B\u0438\u043D\u044B?"); 
phrase_case.push("\u041D\u0435 \u0432\u0438\u0436\u0443 \u043B\u043E\u0433\u0438\u043A\u0438 \u0432 \u0434\u0435\u044F\u043D\u0438\u044F\u0445 \u0442\u0432\u043E\u0438\u0445."); 
phrase_case.push("\u0422\u044B \u0442\u043E\u043B\u044C\u043A\u043E \u0447\u0442\u043E \u0443\u0431\u0438\u043B \u043D\u0430\u0448\u0438 \u0448\u0430\u043D\u0441\u044B \u043D\u0430 \u043F\u043E\u0431\u0435\u0434\u0443!"); 
phrase_case.push("\u0412 \u0442\u0432\u043E\u0439 \u0440\u0430\u0437\u0443\u043C \u0437\u0430\u043A\u0440\u0430\u043B\u0441\u044F \u0431\u0435\u0441!"); 
phrase_case.push("\u041D\u0435\u0443\u0436\u0435\u043B\u0438 \u0442\u0432\u043E\u0439 \u0440\u0430\u0437\u0443\u043C \u043F\u043E\u043C\u0443\u0442\u0438\u043B\u0441\u044F?"); 
phrase_case.push("\u041F\u043E\u0445\u043E\u0436\u0435, \u0441\u043B\u0430\u0432\u043D\u0430\u044F \u0434\u0440\u0430\u043A\u0430 \u0434\u043B\u044F \u0442\u0435\u0431\u044F \u0432\u0430\u0436\u043D\u0435\u0435 \u043F\u043E\u0431\u0435\u0434\u044B?"); 
phrase_case.push("\u041A\u043E\u043B\u044C \u043D\u0435\u0432\u0434\u043E\u043C\u0435\u043A \u0447\u0442\u043E \u0434\u0435\u043B\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435, \u0441\u0445\u043E\u0434\u0438 \u0441\u043F\u0440\u043E\u0441\u0438 \u0441\u043E\u0432\u0435\u0442 \u0443 \u0441\u0442\u0430\u0440\u0448\u0438\u0445."); 
phrase_case.push("\u0427\u0442\u043E\u0431 \u043E\u0431 \u0442\u0435\u0431\u044F \u0442\u0438\u0442\u0430\u043D \u0441\u043F\u043E\u0442\u043A\u043D\u0443\u043B\u0441\u044F! \u0422\u0432\u043E\u0439 \u043F\u043E\u0441\u0442\u0443\u043F\u043E\u043A \u043E\u0447\u0435\u043D\u044C \u0433\u043B\u0443\u043F!"); 
phrase_case.push("\u041B\u0443\u0447\u0448\u0435 \u0431\u044B \u0442\u044B \u044D\u0442\u043E\u0433\u043E \u043D\u0435 \u0434\u0435\u043B\u0430\u043B..."); 
phrase_case.push("\u0413\u043B\u0443\u043F\u043E\u0441\u0442\u044C - \u0441\u0430\u043C\u044B\u0439 \u043B\u0435\u0433\u043A\u0438\u0439 \u0438\u0437 \u0432\u0441\u0435\u0445 \u0433\u0440\u0435\u0445\u043E\u0432, \u0438\u0431\u043E \u043D\u0435 \u0438\u043C\u0435\u0435\u0442 \u043E\u043D\u0430 \u0437\u043B\u043E\u0433\u043E \u0443\u043C\u044B\u0441\u043B\u0430. "); 
phrase_case.push("\u0421 \u0442\u0430\u043A\u0438\u043C \u0441\u043E\u044E\u0437\u043D\u0438\u043A\u043E\u043C \u043D\u0443\u0436\u043D\u0430 \u043F\u043E\u043C\u043E\u0449\u044C \u043E\u0445\u043E\u0442\u043D\u0438\u043A\u0430"); 
phrase_case.push("\u041D\u0435\u043D\u0430\u0432\u0438\u0436\u0443 \u0447\u0430\u0440\u043E\u0434\u0435\u0435\u0432..."); 
phrase_case.push("\u0422\u044B \u0441\u0440\u0430\u0436\u0430\u0435\u0448\u044C\u0441\u044F, \u043A\u0430\u043A \u0442\u0440\u0443\u0441\u043B\u0438\u0432\u044B\u0439 \u0433\u043E\u0431\u043B\u0438\u043D\u044B\u0448!"); 
phrase_case.push("\u041E\u0442\u043B\u0438\u0447\u043D\u044B\u0439 \u0445\u043E\u0434 \u0434\u0440\u0443\u0433! \u0422\u0435\u043F\u0435\u0440\u044C \u043C\u044B \u0432\u0441\u0435 \u0441\u0442\u0430\u043D\u0435\u043C \u043D\u0435\u043A\u0440\u043E\u043C\u0430\u043D\u0442\u0430\u043C\u0438"); 
//phrase_case.push("phrase4"); 
phrases.push(phrase_case);
//
//
phrase_case = []; // vse nadoelo!
phrase_case.push("\u041F\u0443\u0441\u0442\u044C \u043C\u0435\u043D\u044F \u043F\u0440\u043E\u043A\u043B\u044F\u043D\u0443\u0442 \u0431\u043E\u0433\u0438, \u043D\u043E \u044F \u043D\u0435 \u0431\u0443\u0434\u0443 \u0431\u043E\u043B\u044C\u0448\u0435 \u0436\u0434\u0430\u0442\u044C..."); 
phrase_case.push("\u0412 \u0442\u0430\u043A\u0438\u0435 \u043C\u043E\u043C\u0435\u043D\u0442\u044B \u043C\u043E\u0451 \u0431\u0435\u0441\u0441\u043C\u0435\u0440\u0442\u0438\u0435 \u0442\u044F\u0433\u043E\u0442\u0438\u0442 \u043C\u0435\u043D\u044F..."); 
phrase_case.push("\u041A\u0430\u043A \u0443\u0442\u043E\u043C\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0441\u0438\u0435 \u0441\u0440\u0430\u0436\u0435\u043D\u044C\u0435."); 
phrase_case.push("\u0421\u0438\u0435 \u0438 \u0431\u0438\u0442\u0432\u043E\u0439 \u043D\u0435 \u043D\u0430\u0437\u0432\u0430\u0442\u044C, \u043F\u043E\u0439\u0434\u0443 \u043F\u0440\u0438\u043B\u044F\u0433\u0443 \u044F \u043F\u043E\u0441\u043F\u0430\u0442\u044C."); 
phrase_case.push("\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0443\u0442\u043E\u043C\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0434\u043B\u044F \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u0433\u043E \u043F\u0440\u0430\u0437\u0434\u043D\u0438\u043A\u0430 \u0441\u043C\u0435\u0440\u0442\u0438."); 
phrase_case.push("\u0414\u0430\u0436\u0435 \u0443 \u043A\u0430\u043C\u043D\u044F \u043D\u0435 \u0445\u0432\u0430\u0442\u0438\u0442 \u0442\u0435\u0440\u043F\u0435\u043D\u0438\u044F \u043D\u0430 \u044D\u0442\u043E \u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C..."); 
//phrase_case.push("phrase5"); 
phrases.push(phrase_case);
//
//
phrase_case = []; // forget
phrase_case.push("\u041D\u0435 \u0434\u043E\u043F\u0443\u0441\u043A\u0430\u0439 \u0442\u0430\u043A\u0438\u0435 \u0434\u0443\u043C\u044B!"); 
phrase_case.push("\u0434\u0443\u043C\u0430\u0442\u044C... \u043C\u043E\u044F \u043D\u0435 \u0434\u0443\u043C\u0430\u0442\u044C \u043C\u043E\u044F \u0431\u0438\u0442\u044C"); 
phrase_case.push("\u041F\u043E\u0431\u0435\u0440\u0435\u0433\u0438\u0441\u044C, \u0441\u043B\u043E\u0432\u0430 \u0442\u0432\u043E\u0438 \u043E\u043F\u0435\u0440\u0435\u0436\u0430\u044E\u0442 \u043C\u044B\u0441\u043B\u044C."); 
phrase_case.push("\u041D\u0435\u0433\u043E\u0436\u0435 \u0432\u043E\u0438\u043D\u0443 \u0437\u0430\u0431\u0438\u0432\u0430\u0442\u044C \u0433\u043E\u043B\u043E\u0432\u0443 \u0442\u0430\u043A\u0438\u043C\u0438 \u0433\u043B\u0443\u043F\u043E\u0441\u0442\u044F\u043C\u0438."); 
phrase_case.push("\u041E \u043F\u0440\u043E\u0448\u043B\u043E\u043C \u0437\u0430\u0431\u0443\u0434\u044C \u0438 \u043D\u0430 \u0431\u0438\u0442\u0432\u0435 \u0441\u043E\u0441\u0440\u0435\u0434\u043E\u0442\u043E\u0447\u044C\u0441\u044F!"); 
//phrase_case.push("phrase5"); 
phrases.push(phrase_case);
//
//
phrase_case = []; // kakaya dosada!
phrase_case.push("\u041D\u0435\u0442 \u043F\u0440\u0435\u0434\u0435\u043B\u0430 \u043C\u043E\u0435\u043C\u0443 \u0441\u043E\u0436\u0430\u043B\u0435\u043D\u0438\u044E..."); 
phrase_case.push("\u041F\u043E\u0441\u043A\u043E\u043B\u044C\u043A\u0443 \u0434\u0440\u043E\u0433\u043D\u0443\u043B\u0430 \u043C\u043E\u044F \u0440\u0443\u043A\u0430, \u0432\u0438\u0434\u0430\u0442\u044C, \u0436\u0435\u043B\u0430\u043B\u0430 \u044D\u0442\u043E\u0433\u043E \u0441\u0443\u0434\u044C\u0431\u0430.");
phrase_case.push("\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u043E\u0441\u0442\u044C \u0440\u043E\u043A\u043E\u0432\u0430\u044F \u043D\u0430 \u043C\u043E\u0439 \u043F\u043E\u0441\u0442\u0443\u043F\u043E\u043A \u043F\u043E\u0432\u043B\u0438\u044F\u043B\u0430");
phrase_case.push("\u041E\u0448\u0438\u0431\u043A\u0430 \u044D\u0442\u0430 \u0431\u0443\u0434\u0435\u0442 \u0441\u043C\u044B\u0442\u0430 \u043A\u0440\u043E\u0432\u044C\u044E!");
phrase_case.push("\u0417\u0430 \u0442\u0430\u043A\u043E\u0439 \u043F\u0440\u043E\u043C\u0430\u0445 \u044F \u0433\u043E\u0442\u043E\u0432 \u043F\u0440\u0438\u043D\u044F\u0442\u044C \u0441\u043C\u0435\u0440\u0442\u044C.");
phrase_case.push("\u0414\u0430\u0436\u0435 \u043C\u0435\u0440\u0442\u0432\u044B\u0435 \u043F\u043E\u0440\u043E\u0439 \u043E\u0448\u0438\u0431\u0430\u044E\u0442\u0441\u044F.");
phrase_case.push("\u0418\u0441\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u044D\u0442\u0443 \u043E\u043F\u043B\u043E\u0448\u043D\u043E\u0441\u0442\u044C - \u043E\u0442\u043D\u044B\u043D\u0435 \u0434\u0435\u043B\u043E \u0447\u0435\u0441\u0442\u0438 \u0434\u043B\u044F \u043C\u0435\u043D\u044F.");
phrase_case.push("\u0427\u0442\u043E\u0431 \u043C\u043D\u0435 \u043E\u0431\u0441\u0438\u0434\u0438\u0430\u043D\u043E\u0432\u0443\u044E \u0433\u043E\u0440\u0433\u0443\u043B\u044C\u044E \u0441\u044A\u0435\u0441\u0442\u044C!");
phrase_case.push("\u041F\u043E\u0441\u043B\u0435 \u0442\u0430\u043A\u043E\u0433\u043E \u043C\u0435\u043D\u044F \u0438 \u043E\u0431\u0440\u0430\u0442\u043D\u043E \u0432 \u0430\u0434 \u043D\u0435 \u043F\u0443\u0441\u0442\u044F\u0442.");
phrase_case.push("\u0422\u0440\u0435\u0441\u043D\u0438 \u043C\u043E\u0439 \u0442\u043E\u043F\u043E\u0440!");
phrase_case.push("\u0427\u0435\u0440\u0442, \u0437\u0430\u0431\u0440\u0430\u043B\u043E \u0441\u0431\u0438\u043B\u043E\u0441\u044C, \u0432\u0438\u043D\u043E\u0432\u0430\u0442.");
phrase_case.push("\u0414\u0435\u0440\u043D\u0443\u043B\u0430\u0441\u044C \u0440\u0443\u043A\u0430, \u043F\u0440\u043E\u0441\u0442\u0438\u0442\u0435, \u0434\u0440\u0443\u0433\u0438.");
phrase_case.push("\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u0431\u0443\u0442\u044B\u043B\u043A\u0430 \u044D\u043B\u044F, \u043A\u0430\u0436\u0435\u0442\u0441\u044F, \u0431\u044B\u043B\u0430 \u043B\u0438\u0448\u043D\u0435\u0439.");
phrase_case.push("\u0410\u043F\u043F\u0447\u0445\u0438, \u044D\u0439 - \u043D\u0435 \u0442\u0443\u0434\u0430. \u0421\u0435\u0439\u0447\u0430\u0441 \u0438\u0441\u043F\u0440\u0430\u0432\u043B\u044E\u0441\u044C.");
//phrase_case.push("phrase5");
phrases.push(phrase_case);
//
//
phrase_case = []; // radost pobede
phrase_case.push("\u0414\u0440\u0443\u0437\u044C\u044F, \u042D\u043B\u044C\u0440\u0430\u0442 \u0449\u0435\u0434\u0440\u043E \u043D\u0430\u0441 \u0432\u043E\u0437\u043D\u0430\u0433\u0440\u0430\u0434\u0438\u043B, \u043C\u044B \u0432\u0435\u0440\u043D\u0451\u043C\u0441\u044F \u0441 \u043F\u043E\u0431\u0435\u0434\u043E\u0439!"); 
phrase_case.push("\u0421\u0435\u0433\u043E\u0434\u043D\u044F \u044F \u043F\u0440\u043E\u0441\u0442\u0430\u0432\u043B\u044E \u0432\u0441\u0435\u043C \u043F\u043E \u043A\u0440\u0443\u0436\u0435\u0447\u043A\u0435 \u044D\u043B\u044F."); 
phrase_case.push("\u0412\u043E\u0437\u0440\u0430\u0434\u0443\u0439\u0442\u0435\u0441\u044C! \u041F\u043E\u043B\u0435 \u0431\u0440\u0430\u043D\u0438 \u043E\u043A\u0440\u0430\u0448\u0435\u043D\u043E \u043A\u0440\u043E\u0432\u044C\u044E \u043D\u0430\u0448\u0438\u0445 \u0432\u0440\u0430\u0433\u043E\u0432."); 
phrase_case.push("\u041D\u0430\u0448\u0430 \u0432\u0437\u044F\u043B\u0430! \u041E\u0442\u043F\u0440\u0430\u0437\u0434\u043D\u0443\u0435\u043C \u044D\u0442\u043E \u0441\u043E\u0431\u044B\u0442\u0438\u0435!"); 
//phrase_case.push("phrase5"); 
phrases.push(phrase_case);
//
//
/*
phrase_case = []; // vs
phrase_case.push("phrase51"); 
phrases.push(phrase_case);
*/
//
// =====================================================================================================
//alert("phrases = "+phrases);


for(var i=0; i<phrases.length; i++){	
	phrases[i].unshift("-- randomly  --"); // random
	phrases[i].unshift("-- in order --"); // order
}
//base frase on the numbers
var phrase_names_default = [];
phrase_names_default.push("go away");
phrase_names_default.push("the end will be soon");
phrase_names_default.push("good job");
phrase_names_default.push("bad idea");
phrase_names_default.push("tired of waiting");
phrase_names_default.push("forget what I said");
phrase_names_default.push("how unfortunate");
phrase_names_default.push("congratulations with victory");
//phrase_names_default.push("");
//encodeURIComponent( );
var phrase_names = GM_getValue("hwm_fdic_phrasenames", "");
if(phrase_names){
	phrase_names = phrase_names.split("|");
}else{
	//phrase_names = phrase_names_default;
	phrase_names = [];
	for(i=0;i<phrase_names_default.length; i++){
		phrase_names[i] = encodeURIComponent( phrase_names_default[i]);
	}
}
//alert("phrase_names = "+phrase_names);

var lastSelectedPhrase = GM_getValue("hwm_fdic_lastselphrase", ""); // last selected phrase for each case
if(lastSelectedPhrase){
	lastSelectedPhrase = lastSelectedPhrase.split("|");
	for(i=0; i<lastSelectedPhrase.length; i++){
		lastSelectedPhrase[i] = Number(lastSelectedPhrase[i]);
	}
}else{
	lastSelectedPhrase = [0,0,0,0,0,0,0,0];
}
//
var lastUsedPhrase = [0,0,0,0,0,0,0,0]; // last used phrase for each case in auto-order


//alert("HWM_Fantasy_Dict");
var url_cur = location.href ;
//
var url_reply = "heroeswm.ru/forum_messages.php";
var url_newmsg = "heroeswm.ru/new_topic.php";
var url_mail = "lordswm.com/sms-create.php";
var url_war = "lordswm.com/war.php";
//var isWar = (url_cur.indexOf(url_war)!=-1);
var isWar = (url_cur.indexOf(url_war)!=-1 || url_cur.indexOf("lordswm.com/warlog.php")!=-1);
//

var startTopPos = 200;
var curScrollTop = 0;
addPanel();

function addPanel(){
		//alert("addPanel");
	var d = document.createElement( 'div' );
	d.id = "hwmFantDict_div";
	//
	var show_hide_settings_str = "show/hide settings";
	var card_icon = '<a href="javascript:void(0);" id="dicPanel_show" ><img src="i/clans/arcomag.gif" width=15 height=15 border=0 title="'+show_hide_settings_str+'" alt="Open/Close" /></a>';
	
	var links_rows = "";
	var link_name = "";
	for(var i=0; i<phrases.length; i++){
		link_name = decodeURIComponent(phrase_names[i]);
		links_rows += '<tr><td  style="border:1px solid #999;">';
		links_rows += '<a href="javascript:void(0);" class="fantDictLinkClass" ';
		links_rows += 'title="'+link_name+'" alt="'+link_name+'" id="fdict_link'+i+'">';
		links_rows += '['+(i+1)+']</a></td></tr>';
	}
	//alert("links_rows = "+links_rows);
	//
	var props_rows = "";
	for(i=0; i<phrases.length; i++){
		props_rows += '<tr><td style="border:1px solid #999;">';
		props_rows += '<select name="fdict_selcase'+i+'" id="fdict_selcase'+i+'" style="font-size:12; width:180; border:0; margin-bottom:1px;">';
		for(var j=0; j<phrases[i].length; j++){
			props_rows += '<option value="'+j+'" ';
			if(lastSelectedPhrase[i] == j){
				props_rows += 'selected=selected';
			}
			props_rows += '>'+phrases[i][j]+'</option>';
		}
		props_rows += '</select>';
		props_rows += '&nbsp;&nbsp;<a href="javascript:void(0);" class="fantDictLinkClass">Name</a>';
		props_rows += '&nbsp;&nbsp;<a href="javascript:void(0);" class="fantDictLinkClass">Save</a>';
		props_rows += '&nbsp;&nbsp;<a href="javascript:void(0);" class="fantDictLinkClass">Default</a>';
		props_rows += '</td></tr>';
		
	}
	//
	var doShowRandom = GM_getValue("hwm_fdic_showrandom", 0);
	var ch_doShowRandom = doShowRandom?  'checked="checked"' : '';
	var show_random_str = "choose random phrase";
	props_rows += '<tr><td>&nbsp;<input type=checkbox name="fdict_showrandom" id="fdict_showrandom" '+ch_doShowRandom;
	//'checked="checked"'+
	props_rows += ' style="font-size:9px;">&nbsp;'+show_random_str+'</td></tr>';
	//alert("props_rows = "+props_rows);
	//
	d.innerHTML = '<div style="border:2px solid #999; background-color:#eeeeee; width:25; height:250; '+
	//'position:absolute; top:100px; left:0px;" >'+card_icon+
	'position:absolute; top:'+startTopPos+'px; left:0px;" >'+
	'<table width="25" border="0" cellpadding="2" cellspacing="0" background="none">'+
	'<tr><td>'+card_icon+'</td></tr>'+links_rows+
	'</table>'+
	'</div>'+
	
	'<div id="fdict_settings" style="border:2px solid #999; background-color:#eeeeee; width:350; height:250; '+
	'position:absolute; top:'+startTopPos+'px; left:30px; display:none; " >'+
	'<form name="fdict_props_rows" id="fdict_props_rows">'+
	'<table width="350" border="0" cellpadding="1" cellspacing="0" background="none">'+
	'<tr><td style="padding:3px;">'+
	'Phrasebook - Settings</td></tr>'+props_rows+
	'</table>'+
	'</form>'+
	'</div>';
	
	d.style.display = "block";	
	//alert("d.innerHTML = "+d.innerHTML);
	
	document.body.appendChild( d ) ;
		
	document.getElementById('dicPanel_show').addEventListener( "click", clickFantDicShowPanel , false );
	document.getElementById('fdict_showrandom').addEventListener( "click", clickFantDicShowRandomCb , false );
	
	document.addEventListener('click', function(event) {
    // event.target is the element that was clicked
	var et = event.target;
	if( et.parentNode.innerHTML && et.parentNode.innerHTML.match("fantDictLinkClass") && et.href ){ // only for links of my class...
		doClick(et); 
		// stop link behavior
	    event.stopPropagation();
	    event.preventDefault();		
	}    
	}, true);

	if(!isWar){
		setInterval( function() { hwmFantDict_onScroll( ) } , 500 );
	}else{
		var wf = document.createElement( 'div' );
		//
		wf.innerHTML = 
	'<table width="200" border="1" cellpadding="0" cellspacing="0" style="position:absolute; top:1px; left:5px; " background="none">'+
	'<tr><td>'+
	//'<form name="fdict_topwartext" id="fdict_topwartext"><input type="text" size="50"  name="fdtopwartext" id="fdtopwartext"></form>'+
	'<form name="fdict_topwartext" id="fdict_topwartext"><textarea name="fdtopwartext" id="fdtopwartext" rows=2 cols=50 wrap=virtual style="font-size:12; padding-bottom:0; border:1px solid #999;"></textarea></form>'+
	'</td></tr></table>' ;
		
		document.body.appendChild( wf ) ;
	}
	//
}


function hwmFantDict_onScroll(){
	//
	var my_div = document.getElementById('hwmFantDict_div');
	var topNow = my_div.offsetTop;
	//alert("hwmFantDict_onScroll,   my_div = "+my_div+",  topNow = "+topNow);
		
	var shift = document.body.scrollTop;
	if(shift == curScrollTop){ return; }
	//	
	//my_div.style.top += 5;	
	my_div.firstChild.style.top = startTopPos + shift;
	my_div.childNodes[1].style.top = startTopPos + shift;
	curScrollTop = shift;
	
}


function clickFantDicShowPanel(){
	//alert("clickFantDicShowPanel");	
	/**/
	if(!isWar){
		var dic_panel = document.getElementById('fdict_settings');
		//
		if(dic_panel.style.display != "none"){
			dic_panel.style.display = "none";
		}else if(dic_panel.style.display == "none"){
			dic_panel.style.display = "block";
		}
	}		
}


function clickFantDicShowRandomCb(){
	var doShowRandom = document.getElementById('fdict_showrandom').checked;
	//alert("doShowRandom = "+doShowRandom);
	GM_setValue("hwm_fdic_showrandom", doShowRandom);

}


function addText(s){
	//alert(" addText,  s = "+s);	
	if(isWar){
		//alert("isWAR!");
		// war pages
		var msg_ta = document.getElementById('fdtopwartext');;
			//alert("msg_ta = "+msg_ta);
		msg_ta.value = s;
	
	}else if(url_cur.indexOf(url_newmsg)!=-1 || url_cur.indexOf(url_reply)!=-1){
		// forum pages
		var msg_form = document.forms[0];
		var msg_ta = document.forms[0][1];
		if(url_cur.indexOf(url_newmsg)!=-1 || document.forms[0].length ==5){ // new message or just replied (wait 60 sec)
			msg_ta = document.forms[0][2];
		}

		msg_ta.value += s;
		
	}else if(url_cur.indexOf(url_mail)!=-1 ){
		// PM pages
		var msg_form = document.forms[0];
		var msg_ta = document.forms[0][4];
		/*
		if(url_cur.indexOf(url_newmsg)!=-1 || document.forms[0].length ==5){ // new message or just replied (wait 60 sec)
			msg_ta = document.forms[0][2];
		}
		*/
		msg_ta.value += s;
	
	}
	//	
}


function doClick(et){  // process clicks
	//alert("doClick, et = " + et);
	//alert("clicked: innerHTML = "+et.parentNode.innerHTML);
	//alert("et.innerHTML = "+et.innerHTML);
	//
	var link_regexp = /\[(\d+)\]/;
	var ts = "";
	if(et.innerHTML.match(link_regexp)){
		ts = link_regexp.exec(et.innerHTML)[1];
		//alert("link_regexp found!  n = "+ts);
		doPhrase(ts);
		
	}else{
		ts = et.parentNode.firstChild.id;
		ts = ts.substr(ts.length-1);
		//alert("mySelect = "+et.parentNode.firstChild.id);
		if(et.innerHTML.match("Name")){
			doName(ts);
		}else if(et.innerHTML.match("Save")){
			doSave(ts);
		}else if(et.innerHTML.match("Default")){
			doDefault(ts);
		}			
	}	
}


function doPhrase(s){ // find phrase and send to addText()
	//alert("doPhrase, s = " + s);
	var doShowRandom = GM_getValue("hwm_fdic_showrandom", 0);
	var n = Number(s) - 1;
	var case_len = phrases[n].length ;
	var mySelect = document.getElementById('fdict_selcase'+n);
	var myPhraseNum = mySelect[mySelect.selectedIndex].value;
	//if(isWar && myPhraseNum>1){ myPhraseNum=0; } // ??
	if(myPhraseNum==0 && !doShowRandom){ // "by order" option selected
		myPhraseNum = (lastUsedPhrase[n]!=0 && lastUsedPhrase[n]<case_len-1)? lastUsedPhrase[n]+1 : 2;
		lastUsedPhrase[n] = myPhraseNum;
	}else if(myPhraseNum==1 || doShowRandom){ // "random" option selected
		myPhraseNum = Math.round(Math.random()*(case_len-3))+2;		
	}else{  // selected manually
		//lastSelectedPhrase[n] = myPhraseNum;
		//GM_setValue("hwm_fdic_lastselphrase", lastSelectedPhrase.join("|"));
	}
	//alert("myPhraseNum = "+myPhraseNum);
	var myPhrase = phrases[n][myPhraseNum];
	//alert("myPhrase = "+myPhrase);
	addText(" "+myPhrase+" ");
	//	
}

function doName(s){ // rename phrase (link hover hint)
	//alert("doName, s = " + s);
	var n = Number(s);
	//
	var newName = prompt( 'new phrase name' , decodeURIComponent(phrase_names[n]) );
	if(!newName){ return; }
	//
	//alert("newName = "+newName);
	phrase_names[n]= encodeURIComponent( newName );
	GM_setValue("hwm_fdic_phrasenames", phrase_names.join("|"));
	
	var my_link_td = document.getElementById('fdict_link'+n).parentNode;
		//alert("my_link_td = "+my_link_td.innerHTML);
	my_link_td.innerHTML = '<a href="javascript:void(0);" class="fantDictLinkClass" '+
	'title="'+newName+'" alt="'+newName+'" id="fdict_link'+n+'">'+
	'['+(n+1)+']</a></td></tr>';
	
}
//
function doSave(s){ // save phrase as selected
	//alert("doSave, s = " + s);
	var n = Number(s);
	var mySelect = document.getElementById('fdict_selcase'+n);
	var myPhraseNum = mySelect[mySelect.selectedIndex].value;
	lastSelectedPhrase[n] = myPhraseNum;
	GM_setValue("hwm_fdic_lastselphrase", lastSelectedPhrase.join("|"));
	
}
//
function doDefault(s){ // restore default for all
	//alert("doDefault, s = " + s);
	var n = Number(s);
	//
	var mySelect = document.getElementById('fdict_selcase'+n);
	mySelect.selectedIndex = 0;
	lastSelectedPhrase[n] = 0;
	GM_setValue("hwm_fdic_lastselphrase", lastSelectedPhrase.join("|"));
	//
	phrase_names[n]= encodeURIComponent(phrase_names_default[n]);
	GM_setValue("hwm_fdic_phrasenames", phrase_names.join("|"));
	//
	var defName = decodeURIComponent(phrase_names[n]);
	var my_link_td = document.getElementById('fdict_link'+n).parentNode;
	my_link_td.innerHTML = '<a href="javascript:void(0);" class="fantDictLinkClass" '+
	'title="'+defName+'" alt="'+defName+'" id="fdict_link'+n+'">'+
	'['+(n+1)+']</a></td></tr>';
	
	
}



// ========================================================