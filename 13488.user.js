// ==UserScript==
// @name          13488
// @namespace     http://no.no
// @description   IMDb'den Divxplanet, Opensubtitles, Eksisozluk, wikipedia, Scrapetorrent 
// @description   altyazi, bilgi, torrent sitelerine ilgili filmin baglantilari
// @include       http://*.imdb.com/title/*/
// @include       http://*.imdb.com/title/*/#*
// @include       http://*.imdb.com/title/*/combined*
// @include       http://*.imdb.com/title/*/maindetails*

// @include       http://imdb.com/title/*/
// @include       http://imdb.com/title/*/#*
// @include       http://imdb.com/title/*/combined*
// @include       http://imdb.com/title/*/maindetails*
// ==/UserScript==

//2007 modified by tukankaan
/*
 BEGIN LICENSE BLOCK
Copyright (C) 2005 Arvid Jakobsson

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl.html
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK
*/


// --------------- SEARCH ENGINES --------------- 

var trackers = new Array();

//Divxplanet
trackers.push(new SearchEngine("DivxPlanet", "http://divxplanet.com/cse.php?cx=009015947334585847211%3A6djglhionb4&ie=ISO-8859-9&oe=ISO-8859-9&cof=FORID%3A9&hl=tr&q=tt%imdb-id", true, "data:text/plain;base64,AAABAAIAICAAAAEAIACoEAAAJgAAABAQAAABACAAaAQAAM4QAAAoAAAAIAAAAEAAAAABACAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD4+fgD7vbuDur26hPs9ewP9vf2B/z8/AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A+vz6A97u3h+uxZlnk5lhm3Z4LtSBax/4hmIV+IFmFvhzdyfilZlim6/Akm7c7dwh+Pr4A////wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A/P38AOHu4ByntoZ5jHMw0pVYEvamUA/9qFcm/bVxPf21YCH9tF0e/bFZGv2qVBX9mFUQ+I1uK9eftIJ94OvbI/z8/AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////APz8/ADP38g1gYU9xptQD/yyWBr9uWYm/bduK/2tZzr9vYlT/cB6OP2+cjH9vm4v/btpKv25YyX9slga/ZxRD/2KezvKvN28P/r8+gP///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD6+voBt8qqVI5oJ+KtVRf9uWQm/b1tLv3BeTf9tmwp/adX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pf3Nt4v9sZVg/bafdf20lFP93s+x/a2FPP2mczD9t5dY/eHSuP3awqP9yq+C/c/Sqf2VqVjlydWwTfj5+AX///8A////AKa4Y8bCyo/9vMSE/cO9iP3NsIb90bmR/cqugP2ufTn9tHZI/a58Qf2wjUb9v6Bn/al3Lf2pgjz9rY9L/bGSWv28nX79wrKW/bWZZv2shD/9o3gl/aR6Jv3Ms4f9xaJw/Z5gEv2Hex/rprNh97TCeP2Ahg3y6ObSK////wD///8AxNGoVY+5apOMsmWYgKZQs4djDfakZCL9r3lI/biAXf29hmz9uoxs/ayERP3Ru5T9vqBn/a+RWP3CuqH9vZ6G/bqJcP3Br5X9wbCX/bmOc/21j2X9rYlM/ah8PP2hUhb9iEsR9bPRp1q+zJ5elrpwjZ+7d4bw8egV////AP///wD///8A////AP///wD4+/gFq72ScZdXH/q0dlT9uYdt/b6Zg/2+mIT9u5R6/bCUZf2uilT9tZFs/cGyn/29nIn9vZWD/byZhf29oIz9vqWS/b+jjv29nIj9t4Fi/ZJYG/aTrnmF+vr6A////wD///8A////AP///wD///8A////AP///wD///8A////APz8/AD09/QJnah3jZhmLPOxbEj9uYxz/b2Zhf3ArZ39wbKn/cGzqP3Ct6n9wrWn/b+klv2/o5T9vqCR/b2cjP29oo79u5V9/bR7Wv2XZS33kqdlmun06BX///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDs8uwPpK6Bg4lWFfisZDv9toJp/bubiP2+pJX9wbGn/cCvpP3AqZ39v6aa/b6ilf28m4v9uZF9/baFaf2ub0X9kl4h9o2scI7n8+YV////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD4+/gDt9q2R4d7PsKPSRH4qFou/bNxT/23g2n9uZF9/bmSf/25jHb9toBn/bFsS/2nUy79kk4U/YaCPca70K1V+Pr4A////wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD8/PwA5fDiGbjKplaGk1GzkGQp2o1VHO6WThf9m2Mt/ZhhKP2MTxrzj1sq2YqHRb20x6Fc5O7iGvr8+gH///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A/Pz8APT59Ana7dojvdW1SbbDmW20wJRwtsacbbnTr1Xa7Noj8PjwDP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP/////////////////wH///wAf//wAB//4AAP/8AAB/+AAAP+AAAA/AAAAPwAAAB8AAAAPgAAAH4AAAD+AAAA/gAAAHgAAAA4AAAAOAAAAHgAAAB4AAAAPAAAAz/AAAP/wAAH/+AAD//4AD///gD///////////////////////KAAAABAAAAAgAAAAAQAgAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A/P38AOLr3CHAwqFduK6Dhbayh3zP1LtC9Pj0Cf///wD///8A////AP///wD///8A////AP///wD///8A8PXuDqmebJajYSDwrF8n/bp1Ov24Zib9rV0c/J5yNdTHz7JM/P38AP///wD///8A////AP///wD///8A8PTuD6J9RsW4ZSb9wXY1/bFnL/2qWCv9wX47/cJ5O/2+dTv9p2Mn+LnCmWn8/PwA////AP///wD///8As+bgVJKcdrWlc079lY+D/Y2NhP2MfGf9gGRm/YSDgf2dm5H9iZqg/ZWYlv12Z1fzmdLIeez49BH///8A////AHXS3cl3tt/9aK7c/ZDG5/1tpsX9hMDp/YHB7f16wO/9gL3j/WS9/P2Syer9Pn63/XCu1f2N19l1/P38AP///wBuv8W8Z6fP/XKtz/2Mo6L9v5x1/X15dv2Cj5b9fp+o/YGbof1gf6H9ZmyN/U9giv1ifpD6btDEn/r8+gP///8AsqR6kbR+UP2/n3H9uX9a/bRyOf25ilH9w6iE/cSVYv3EkFf9sG5B/ZkiDf2VGgT9jzkJ+N3r2Sb///8A2+PHQ7qxf97HpHL9v6Fv/bR9Vf2uZCn9u5di/cKpf/27llz9vJNV/biHRv2xfEj9rGws/Z9aGP2zwYi99fbvD9jlwF7PxJz9s4dN/civg/3OrYT9uZJg/cysgv20jFH907+Z/c+5j/24lVz9tJVm/dS9mf3RwZz9qr9/p/f69gbV4LhgxsqW/bucYv3Ot479vZBe/bKIS/2+mmL9tpVY/bufcf24n3H9tpRU/bOOTf3Ipnf9saxq+KSyY8n29vAM7/LoFcXZskqqsHmIqGo3/buJbv24j2v9u55t/bqjgf28loD9v6aP/buZfv2yiV39lGkv29rlzy/L3LhF+vr4Bf///wD///8A+vv6AbKshIWobEL8u5mF/cCuo/3BsaT9v6SW/byaif23im79mnpF3tjjzDH///8A////AP///wD///8A////AP///wD8/fwAyNC1SZ1/TcChaz/wqXVQ/aRvR/qcZznjrKF1jurx5xf///8A////AP///wD///8A////AP///wD///8A////AP///wD6/PoB5O/iGtngyjfa5NEw8vjyCv///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD//wAA/v8AAPAfAADgDwAAwAcAAIADAACAAQAAgAMAAIABAACAAQAAgAEAAMAHAADgDwAA+B8AAP//AAD//wAA"));

//Divxforever
trackers.push(new SearchEngine("Divxforever", "http://www.divxforever.us/index.php?act=subz&CODE=66&mname=%title", false, "data:image/vnd.microsoft.icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABA4AAEdoAApnlwALaJkAA1mAAAAoQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVHUALdP/AFj0/wBh+P8AZPn/AGb9/wBb+f8AOtn5AA51kQAADxYAAAAAAAAAAAAAAAAAAAAAAAAAAAACcZUATO3/AGn4/wBm9f8Aafn/H3b5/xdH0vIOJZCyARFtjwAPZI0AAHOZAAAXFwAAAAAABGGBAAl2mgAARGMASer/AGj2/wBk9f8We/3/LU3H5wAAOlEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABCBrABT8/8ANNf/AGf2/wBk9f8ef/7/Kj2z1AAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWmcIAafn/AGX0/wBl9f8Kbvj/RWvZ9gAABBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABOYwAALDoAGKDIAGn5/wBm9f8AZPT/NYz9/zFHu94AABAeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC1EABak0ABj/v8CC2CGABWKugBp+v8AZfX/AGP1/xF2+/9dqv//LkjW/wAALjoAAAAAAAAdKwADYIIAG7XlAEfp/wBm+P8Aavz/FiuRtgALb5oAavz/D3b9/0mF9f8tP7DTAABLbAAADRQAAAAAAAAjKgAWuvEAUfX/AGX2/wBo9v8AZvX/AGj5/yZErtUAAENnCWn+/x8tocUAACE2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAqNwQBS7v8AZ/X/AGX0/wBn+P8yUcLiAAAZHwAAQ10AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABCwAjwO4AY/X/AGX1/xBy9/8AZvn/N1Gz2wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwASoc8AYfb/AGb1/wBm9v9Tgur/VJj//yk/o8MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5WQAkvuoAY/f/AGb1/wBi9f9Ejf//AgBIaQMBTW0JD26LAAAAAAAADQ8AAIKqABqFrgAciq4AIaTHADXU+gBa9P8AaPj/AGT1/wBo9/9Djf//DxJ7mQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwIIV3IUQcnlI3L4/yeI//8jg///Kof//z+O//8/Zdz6AwJMbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFygDAEFlDhJigAwQY4AAADNUAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAA+B8AAPADAADgAQAAAH8AAAD/AAAB/AAAAfAAAACAAAABAAAAD4AAAD+AAAD/AAAA/gAAAIAHAADADwAA+B8AAA%3D%3D"));


//opensubtitles.org  via IMDb-ID
trackers.push(new SearchEngine("Opensubtitles.org  Ingilizce Altyazi", "http://www.opensubtitles.org/en/search/sublanguageid-eng/imdbid-%imdb-id", true, "http://www.opensubtitles.org/favicon.ico"));


//Ozellesitirilmis Google Altyazi Aramasi
trackers.push(new SearchEngine("Google", "http://www.google.com/cse?cx=012799824438454322551%3A79tyx77cjum&ie=UTF-8&q=%22%title%22&sa=Search", false, "http://www.fabricoffolly.co.uk/images/google_favicon.gif"));

//Rollyo
trackers.push(new SearchEngine("Rollyo ile Coklu Altyazi Arama", 

"http://rollyo.com/search.html?q=%title&sid=327654", false, "http://www.webapplist.com/favicons/rollyo.gif"));

//TurkceAltyazi - Subtitle
trackers.push(new SearchEngine("TurkceAltyazi", "http://www.turkcealtyazi.org/find.php?cat=sub&find=%title", false, "http://www.turkcealtyazi.org/images/favicon.ico"));

//Eksisozluk
trackers.push(new SearchEngine("Eksisozluge Git", "http://sozluk.sourtimes.org/show.asp?t=%title", false, "http://sozluk.sourtimes.org/img/favicon.ico"));

//Wikipedia
trackers.push(new SearchEngine("Wikipedia", "http://en.wikipedia.org/wiki/Special:Search?search=%title&go=Go", false, "http://en.wikipedia.org/favicon.ico"));

//Eksisozluk
trackers.push(new SearchEngine("Eksisozluk Baslikta Ara", "http://sozluk.sourtimes.org/index.asp?a=sr&kw=%title", false, "http://sozluk.sourtimes.org/img/favicon.ico"));


//Criticker
trackers.push(new SearchEngine("Criticker Yorum", "http://www.criticker.com/?st=movies&h=%title&g=Go", false, "http://www.criticker.com/favicon.ico"));

//Metacritic
trackers.push(new SearchEngine("Metacritic Yorum", "http://www.metacritic.com/search/process?sort=relevance&termType=all&ts=%title&ty=1&x=0&y=0", false, "http://www.metacritic.com/favicon.ico"));

//btjunkie
trackers.push(new SearchEngine("Btjunkie", "http://btjunkie.org/search?q=%title&", false, "http://www.btjunkie.com/favicon.ico"));

//isohunt
trackers.push(new SearchEngine("Isohunt", "http://isohunt.com/torrents/?ihq=%title&", false, "http://isohunt.com/favicon.ico"));

//Torrentz
trackers.push(new SearchEngine("Torrentz", "http://www.torrentz.com/search?q=%title&x=0&y=0", false, "http://www.torrentz.com/favicon.ico"));

//Youtube
trackers.push(new SearchEngine("Youtube", "http://www.youtube.com/results?search_query=%22%title%22&search=Search", false, "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAD//////////4OD//9paf//bm7//2Fh//9ZWf//Wlr//1pa//9WVv//ZGT//3Bw//9jY///goL//////////////////11d//8sLP//QUH//ygo//84OP//RET//y4u//8xMf//UVH//y4u//8PD///ZWX//x0d//9aWv////////////88PP//Cgr///////8zM///1NT///////+lpf//ubn///////+urv//fHz////////g4P//Fhb/////////////MzP//woK////////NDT//8vL//9ycv//paX//7Cw//9jY///s7P//8nJ//9XV///eXn//yIi/////////////zMz//8LC///+/v//zMz///Gxv//hYX//6Ki//+srP//W1v//6ys//+3t///2tr//93d//8PD/////////////80NP//AgL///b2//8nJ///5ub//56e//+5uf//oaH//+/v//+5uf//oKD//+Li///f3///AgL/////////////MzP//wUF////////Skr//0pK//9NTf//NTX//97e//+ysv//Nzf//xIS//+mpv//Kyv//z09/////////////xkZ///Y2P////////////8nJ///EBD//wAA///y8v//Ly///wAA//8mJv//Hh7//6mp//92dv////////////+vr///Jib//xMS//8eIP//MzP//zY2//84OP//Hh///y4u//9XV///hoj//8LC///R0f//qqr/////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAA/8zMzP/u7u7/IiIi/wAAAP8iIiL//////zMzM/8AAAD/AAAA/////////////////////////////////wAAAP/MzMz//////yIiIv/u7u7/ERER/7u7u/8AAAD/iIiI/xEREf///////////////////////////+7u7v8AAAD/zMzM//////8iIiL/7u7u/xEREf+7u7v/AAAA/8zMzP8RERH///////////////////////////93d3f/AAAA/1VVVf/u7u7/IiIi/wAAAP8iIiL//////wAAAP/MzMz/ERER///////////////////////d3d3/AAAA/4iIiP8AAAD/3d3d/////////////////////////////////////////////////////////////////wAAAP//////AAAA////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%3D%3D"));

//Google
trackers.push(new SearchEngine("Google", "http://www.google.com/search?hl=en&q=%22%title%22 movie&btnG=Search", false, "http://www.fabricoffolly.co.uk/images/google_favicon.gif"));


//Ed2k-Divxforever
trackers.push(new SearchEngine("Divxforever'da Ed2k arama", "http://www.divxforever.us/index.php?act=ed2k&CODE=66&keyword=%title", false, "data:image/vnd.microsoft.icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABA4AAEdoAApnlwALaJkAA1mAAAAoQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVHUALdP/AFj0/wBh+P8AZPn/AGb9/wBb+f8AOtn5AA51kQAADxYAAAAAAAAAAAAAAAAAAAAAAAAAAAACcZUATO3/AGn4/wBm9f8Aafn/H3b5/xdH0vIOJZCyARFtjwAPZI0AAHOZAAAXFwAAAAAABGGBAAl2mgAARGMASer/AGj2/wBk9f8We/3/LU3H5wAAOlEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABCBrABT8/8ANNf/AGf2/wBk9f8ef/7/Kj2z1AAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWmcIAafn/AGX0/wBl9f8Kbvj/RWvZ9gAABBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABOYwAALDoAGKDIAGn5/wBm9f8AZPT/NYz9/zFHu94AABAeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC1EABak0ABj/v8CC2CGABWKugBp+v8AZfX/AGP1/xF2+/9dqv//LkjW/wAALjoAAAAAAAAdKwADYIIAG7XlAEfp/wBm+P8Aavz/FiuRtgALb5oAavz/D3b9/0mF9f8tP7DTAABLbAAADRQAAAAAAAAjKgAWuvEAUfX/AGX2/wBo9v8AZvX/AGj5/yZErtUAAENnCWn+/x8tocUAACE2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAqNwQBS7v8AZ/X/AGX0/wBn+P8yUcLiAAAZHwAAQ10AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABCwAjwO4AY/X/AGX1/xBy9/8AZvn/N1Gz2wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwASoc8AYfb/AGb1/wBm9v9Tgur/VJj//yk/o8MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5WQAkvuoAY/f/AGb1/wBi9f9Ejf//AgBIaQMBTW0JD26LAAAAAAAADQ8AAIKqABqFrgAciq4AIaTHADXU+gBa9P8AaPj/AGT1/wBo9/9Djf//DxJ7mQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwIIV3IUQcnlI3L4/yeI//8jg///Kof//z+O//8/Zdz6AwJMbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFygDAEFlDhJigAwQY4AAADNUAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAA+B8AAPADAADgAQAAAH8AAAD/AAAB/AAAAfAAAACAAAABAAAAD4AAAD+AAAD/AAAA/gAAAIAHAADADwAA+B8AAA%3D%3D"));

//Divxplanet Forumda Ed2k arama
trackers.push(new SearchEngine("Forum.divxplanet", "http://www.google.com/search?hl=en&q=site%3Aforum.divxplanet.com+ed2k+%22%title%22&btnG=Search", false, "data:text/plain;base64,AAABAAIAICAAAAEAIACoEAAAJgAAABAQAAABACAAaAQAAM4QAAAoAAAAIAAAAEAAAAABACAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD4+fgD7vbuDur26hPs9ewP9vf2B/z8/AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A+vz6A97u3h+uxZlnk5lhm3Z4LtSBax/4hmIV+IFmFvhzdyfilZlim6/Akm7c7dwh+Pr4A////wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A/P38AOHu4ByntoZ5jHMw0pVYEvamUA/9qFcm/bVxPf21YCH9tF0e/bFZGv2qVBX9mFUQ+I1uK9eftIJ94OvbI/z8/AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////APz8/ADP38g1gYU9xptQD/yyWBr9uWYm/bduK/2tZzr9vYlT/cB6OP2+cjH9vm4v/btpKv25YyX9slga/ZxRD/2KezvKvN28P/r8+gP///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD6+voBt8qqVI5oJ+KtVRf9uWQm/b1tLv3BeTf9tmwp/adX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pf3Nt4v9sZVg/bafdf20lFP93s+x/a2FPP2mczD9t5dY/eHSuP3awqP9yq+C/c/Sqf2VqVjlydWwTfj5+AX///8A////AKa4Y8bCyo/9vMSE/cO9iP3NsIb90bmR/cqugP2ufTn9tHZI/a58Qf2wjUb9v6Bn/al3Lf2pgjz9rY9L/bGSWv28nX79wrKW/bWZZv2shD/9o3gl/aR6Jv3Ms4f9xaJw/Z5gEv2Hex/rprNh97TCeP2Ahg3y6ObSK////wD///8AxNGoVY+5apOMsmWYgKZQs4djDfakZCL9r3lI/biAXf29hmz9uoxs/ayERP3Ru5T9vqBn/a+RWP3CuqH9vZ6G/bqJcP3Br5X9wbCX/bmOc/21j2X9rYlM/ah8PP2hUhb9iEsR9bPRp1q+zJ5elrpwjZ+7d4bw8egV////AP///wD///8A////AP///wD4+/gFq72ScZdXH/q0dlT9uYdt/b6Zg/2+mIT9u5R6/bCUZf2uilT9tZFs/cGyn/29nIn9vZWD/byZhf29oIz9vqWS/b+jjv29nIj9t4Fi/ZJYG/aTrnmF+vr6A////wD///8A////AP///wD///8A////AP///wD///8A////APz8/AD09/QJnah3jZhmLPOxbEj9uYxz/b2Zhf3ArZ39wbKn/cGzqP3Ct6n9wrWn/b+klv2/o5T9vqCR/b2cjP29oo79u5V9/bR7Wv2XZS33kqdlmun06BX///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDs8uwPpK6Bg4lWFfisZDv9toJp/bubiP2+pJX9wbGn/cCvpP3AqZ39v6aa/b6ilf28m4v9uZF9/baFaf2ub0X9kl4h9o2scI7n8+YV////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD4+/gDt9q2R4d7PsKPSRH4qFou/bNxT/23g2n9uZF9/bmSf/25jHb9toBn/bFsS/2nUy79kk4U/YaCPca70K1V+Pr4A////wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD8/PwA5fDiGbjKplaGk1GzkGQp2o1VHO6WThf9m2Mt/ZhhKP2MTxrzj1sq2YqHRb20x6Fc5O7iGvr8+gH///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A/Pz8APT59Ana7dojvdW1SbbDmW20wJRwtsacbbnTr1Xa7Noj8PjwDP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP/////////////////wH///wAf//wAB//4AAP/8AAB/+AAAP+AAAA/AAAAPwAAAB8AAAAPgAAAH4AAAD+AAAA/gAAAHgAAAA4AAAAOAAAAHgAAAB4AAAAPAAAAz/AAAP/wAAH/+AAD//4AD///gD///////////////////////KAAAABAAAAAgAAAAAQAgAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A/P38AOLr3CHAwqFduK6Dhbayh3zP1LtC9Pj0Cf///wD///8A////AP///wD///8A////AP///wD///8A8PXuDqmebJajYSDwrF8n/bp1Ov24Zib9rV0c/J5yNdTHz7JM/P38AP///wD///8A////AP///wD///8A8PTuD6J9RsW4ZSb9wXY1/bFnL/2qWCv9wX47/cJ5O/2+dTv9p2Mn+LnCmWn8/PwA////AP///wD///8As+bgVJKcdrWlc079lY+D/Y2NhP2MfGf9gGRm/YSDgf2dm5H9iZqg/ZWYlv12Z1fzmdLIeez49BH///8A////AHXS3cl3tt/9aK7c/ZDG5/1tpsX9hMDp/YHB7f16wO/9gL3j/WS9/P2Syer9Pn63/XCu1f2N19l1/P38AP///wBuv8W8Z6fP/XKtz/2Mo6L9v5x1/X15dv2Cj5b9fp+o/YGbof1gf6H9ZmyN/U9giv1ifpD6btDEn/r8+gP///8AsqR6kbR+UP2/n3H9uX9a/bRyOf25ilH9w6iE/cSVYv3EkFf9sG5B/ZkiDf2VGgT9jzkJ+N3r2Sb///8A2+PHQ7qxf97HpHL9v6Fv/bR9Vf2uZCn9u5di/cKpf/27llz9vJNV/biHRv2xfEj9rGws/Z9aGP2zwYi99fbvD9jlwF7PxJz9s4dN/civg/3OrYT9uZJg/cysgv20jFH907+Z/c+5j/24lVz9tJVm/dS9mf3RwZz9qr9/p/f69gbV4LhgxsqW/bucYv3Ot479vZBe/bKIS/2+mmL9tpVY/bufcf24n3H9tpRU/bOOTf3Ipnf9saxq+KSyY8n29vAM7/LoFcXZskqqsHmIqGo3/buJbv24j2v9u55t/bqjgf28loD9v6aP/buZfv2yiV39lGkv29rlzy/L3LhF+vr4Bf///wD///8A+vv6AbKshIWobEL8u5mF/cCuo/3BsaT9v6SW/byaif23im79mnpF3tjjzDH///8A////AP///wD///8A////AP///wD8/fwAyNC1SZ1/TcChaz/wqXVQ/aRvR/qcZznjrKF1jurx5xf///8A////AP///wD///8A////AP///wD///8A////AP///wD6/PoB5O/iGtngyjfa5NEw8vjyCv///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD//wAA/v8AAPAfAADgDwAAwAcAAIADAACAAQAAgAMAAIABAACAAQAAgAEAAMAHAADgDwAA+B8AAP//AAD//wAA"));


// --------------- END OF SEARCH ENGINES ---------------  


function xpath(query, context) {
	context = context ? context : document;
	
	return document.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function SearchEngine(shortname, searchurl, usesIMDBID, icon) {
	this.shortname = shortname;
	this.searchurl = searchurl;
	this.usesIMDBID = usesIMDBID;
	this.icon = icon;
	
	this.getHTML = function (title, id) {
		var html = "<a href=\"" + this.getSearchUrl(title, id) + "\"><img border=\"1\" src=\"" + this.icon + "\" title=\"" + this.shortname + "\"><\/a>&nbsp;";
		return html;
	}
	
	this.getSearchUrl = function (title, id) {
		var searchUrl = this.searchurl;
		if (this.usesIMDBID) {
			searchUrl = searchUrl.replace(/%imdb\-id/, id);
		}
		else {
			searchUrl = searchUrl.replace(/%title/, encodeURIComponent(title));
		}
		
		return searchUrl;
	}	
}

function openAllInTabs(title, id, inclIMDBID) {
	for (var i = 0; i < trackers.length; i++) {
		if (trackers[i].usesIMDBID && !inclIMDBID)
			continue;
		else
			GM_openInTab(trackers[i].getSearchUrl(title, id));
	}
}

function getTitle() {
	var title = document.title;
	title = title.match(/^(.*) \(/)[1];
	
	/*
	regexp = /'|,|:/g;
	title = title.replace(regexp, " ");
	*/
	
	return title;
}


function getId() {
	with (location.href) {
		var id = match(/title\/tt(.*?)\//i)[1];
	}
	return id;
}


function addIconBarIcons(title, id, trackers) {
 var iconbar = xpath("//div[@id='tn15title']", document);
    if (!iconbar || iconbar.snapshotLength != 1) {
    GM_log("Error! Couldn't find icon bar. Quitting!");
    return;
  }

	iconbar = iconbar.snapshotItem(0);
	iconbar.id = "iconbar";
	
   var tdimg;
  for (var i = 0; i < trackers.length; i++) {
    tdimg = document.createElement("span");
    tdimg.innerHTML = trackers[i].getHTML(title, id);
    iconbar.appendChild(tdimg);
	}

	
	if (GM_openInTab) {
		var tdopenall = document.createElement("td");
		var aopenall = document.createElement("a");
		aopenall.innerHTML = "Open All";
		aopenall.href = "javascript:;";
		aopenall.setAttribute("class", "openall");
		aopenall.addEventListener("click", function () { openAllInTabs(title, id, true); }, false);
		tdopenall.appendChild(aopenall);
		
		iconbar.appendChild(tdopenall);
	}
}
/*
function addAkaIcons(id, trackers) {
	var xpath_exp = "//i[@class='transl']";
	var akas = xpath(xpath_exp, document);
	
	if (!akas || akas.snapshotLength == 0) {
		GM_log("Error! Couldn't find akas. Quitting!");
		return;
	}
	
	var aka;
	for (var i = 0; aka = akas.snapshotItem(i); i++) {
		unsafeWindow.aka = aka.textContent;
		
		var title = aka.textContent.match(/(.*?)\s+\(.*?\)\s+\[.*?\]/)[1];
		GM_log(title);
		
		for (var ii = 0; ii < trackers.length; ii++) {
			if (!trackers[ii].usesIMDBID) {
				link_span = document.createElement("span");

				link_span.innerHTML = trackers[ii].getHTML(title, id);
				aka.appendChild(link_span);
				
				delim_text = document.createTextNode(" ");
				aka.appendChild(delim_text);
			}
		}
		
		if (GM_openInTab) { //If this API exists.
			var aopenall = document.createElement("a");
			aopenall.innerHTML = "OPEN ALL";
			aopenall.href = "javascript:;";
			aopenall.setAttribute("class", "openall");
			
			function creator (a, b) {
				return function () { openAllInTabs(a, b, false); }
			}
			
			aopenall.addEventListener("click", creator(title, id), false);

			aka.appendChild(aopenall);
		}
	}
}
*/

function addStyles() {
	var open_all_class = "a.openall {\n" +
	"	font-weight: bold;\n" + 
	"	font-family: Verdana, Arial, Helvetica, sans-serif;\n" +
	"	font-size: 10px\n" +
	"}";
	
	GM_addStyle(open_all_class);
}


addStyles();
var title = getTitle();
var id = getId();
addIconBarIcons(title, id, trackers);
//addAkaIcons(id, trackers);


(function()
{
    try
    {
        var tr = document.evaluate("//TR[TD/@class='lhscol'][1]/TD[last()]//TR[1]",
                document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null).snapshotItem(0);
        if (tr)
        {
            tr.deleteCell(tr.cells.length - 1);
        }
    }
    catch (e)
    {
        alert("UserScript exception: " + e);
    }
}
)();