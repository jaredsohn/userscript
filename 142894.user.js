// ==UserScript==
// @name          Altyazı indirmek imdb ikonları
// @namespace     http://asanusta.blogspot.com
// @description   Altyazı indirmek IMDb'de film sayfalarından çeşitli sitelere bağlantı sağlayan ikonlar yerleştirir. Örneğin Altyazı indirmek için divxplanet, Yorumları okumak için rotten tomatoes, Posterlere ulaşamak için impawards sitelerinde ilgili filmin sayfasına direk bağlantı sağlar.
// @description   diger eklentilerden farkı sade olması ve divxplanette filmin sayfasına direk bağlantı vermesi
// @author        asanusta
// @homepage      http://asanusta.tumblr.com
// @version       02.09.2012
// @include       http://*.imdb.com/title/*
// @include       http://*.imdb.com/title/*/
// @include       http://*.imdb.com/title/*/#*
// @include       http://*.imdb.com/title/*/combined*
// @include       http://*.imdb.com/title/*/maindetails*
// @include       http://imdb.com/title/*/
// @include       http://imdb.com/title/*/#*
// @include       http://imdb.com/title/*/combined*
// @include       http://imdb.com/title/*/maindetails*
// ==/UserScript==

// --------------- SEARCH ENGINES --------------- 
//  You can remove or comment out below lines if you disable a search engine from the script.

var trackers = new Array();
var cleanTitle = new String(getCleanTitle());
var imdbCode = new String(getImdbCode());

//DivXPlanet
trackers.push(new SearchEngine("Subtitle: DivXPlanet", "http://www.google.com/search?q=site%3Adivxplanet.com%2Fsub%2F+%imdbkod+divxplanet&btnI=I&sourceid=navclient-ff&ie=UTF-8&rlz=1B5GGGL_trTR302TR302", true, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC+0lEQVR4nKWTXWhTZxzGn/d9z0eTNl9N0iS2SZs2fnW1yrSsEymDOnVuF5tOGANRURDvVBhuMHc1dO7j1u1iA/FCGILix4bKLIqoII6pnU2UmURLbWLTJienyTkn57zn7Ernx0DE5/IP/x888HuI4zh4nQj/dzS5SQrqo1hBqcVlgRjJUPSuR/bUXwrgNsfZ0evv/XT89p5qSVgScDd5tIbJq7peXLHcf3T3h0MHot5w8ekf8riCaZnk2xNnvh65UN8zvChIEmERhBFUVRtqnWOiYiJdGb+/f8fQ+qUd8/96AihUy+Frk2MDV9MTQyPn7M/e6gyCSxzUxxASHTgqhc/PUFYt5CoabuUfZA99uerjoqa0vZNYfIGcyd/enH2k/HL9Vg197UHcuFPGtF5DpLUFdVNHzC0C4Biv2TAaHL3RMFSpaBqSevOHleuGaZPIbKnhwtSUjprewLx4AGG3jK5WLwzNxoKuKBJzImgiFDGZoDvSgjfDXWKHR8pKAmkIss0mxqen7s+NhzpLVQ0P/ynh78kGqEjRH/fiUroAgxMoswCtcVxJZ1CaUbFze6jNsGwXHexInTdV/VT27jSoDYhUhN8roazaEB0CyXGB8iaYkzouHykgc6wIJVcxP+rt3eF3uRUBAN5v/+ONDcwApGaMpuZg1FgKcm8EraKIlN+CYTEgkMMHayXw2SKkRJBOTeS+SAa+3yYAQDQoe6jmAtcVvNsjoCd/DKnVEQiEgzoWZjlFrFvATEsf/vwtg8SSJBPk+BgllAsAwEJD3x28ltuSSfevGeiogNhdODzmwCnMor3TDX80Bp/jQt1muFgcrO9K9ezrS67/mVH2n0jlmuL75MDJ3/OFtkFfwIWGUoGlGPDPiwAmASwLpZmiuXtT666ty4d/ZIw9ayIAlOuK96tfz35z+lLjU9l2eYJtXpQUG3Wt5sTCSmbvxoWfr+0fOM0oe1Hlp/eQn3mYvJzOrnhQ0hcIgq0t645deTs192qz3Kw9P6YXAK+afwFFBlABNzEZ7AAAAABJRU5ErkJggg%3D%3D"));

//EksiSozluk
trackers.push(new SearchEngine("Eksisozluk", "http://sozluk.sourtimes.org/show.asp?t="+cleanTitle, false, "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAXElEQVR4nM3TMQoAIAwDwDzd5zl28D9xKyI0Verg0ElygWIxrCMaAFTvwzpkGA3MkE8BD7cckQDJe2Btd0AgefsNELYLRC/vGcAKwArACrCHTwC5h9N/4Mg20c1MGxAM9mt5Y18AAAAASUVORK5CYII="));

//Youtube
trackers.push(new SearchEngine("Youtube", "http://www.youtube.com/results?search_query=%22%title%22&search=Search", false, "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAD//////////4OD//9paf//bm7//2Fh//9ZWf//Wlr//1pa//9WVv//ZGT//3Bw//9jY///goL//////////////////11d//8sLP//QUH//ygo//84OP//RET//y4u//8xMf//UVH//y4u//8PD///ZWX//x0d//9aWv////////////88PP//Cgr///////8zM///1NT///////+lpf//ubn///////+urv//fHz////////g4P//Fhb/////////////MzP//woK////////NDT//8vL//9ycv//paX//7Cw//9jY///s7P//8nJ//9XV///eXn//yIi/////////////zMz//8LC///+/v//zMz///Gxv//hYX//6Ki//+srP//W1v//6ys//+3t///2tr//93d//8PD/////////////80NP//AgL///b2//8nJ///5ub//56e//+5uf//oaH//+/v//+5uf//oKD//+Li///f3///AgL/////////////MzP//wUF////////Skr//0pK//9NTf//NTX//97e//+ysv//Nzf//xIS//+mpv//Kyv//z09/////////////xkZ///Y2P////////////8nJ///EBD//wAA///y8v//Ly///wAA//8mJv//Hh7//6mp//92dv////////////+vr///Jib//xMS//8eIP//MzP//zY2//84OP//Hh///y4u//9XV///hoj//8LC///R0f//qqr/////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAA/8zMzP/u7u7/IiIi/wAAAP8iIiL//////zMzM/8AAAD/AAAA/////////////////////////////////wAAAP/MzMz//////yIiIv/u7u7/ERER/7u7u/8AAAD/iIiI/xEREf///////////////////////////+7u7v8AAAD/zMzM//////8iIiL/7u7u/xEREf+7u7v/AAAA/8zMzP8RERH///////////////////////////93d3f/AAAA/1VVVf/u7u7/IiIi/wAAAP8iIiL//////wAAAP/MzMz/ERER///////////////////////d3d3/AAAA/4iIiP8AAAD/3d3d/////////////////////////////////////////////////////////////////wAAAP//////AAAA////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%3D%3D"));

//Criticker
trackers.push(new SearchEngine("Criticker", "http://www.criticker.com/?st=movies&h=%title&g=Go", false, "data:image/x-icon;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAAAABMLAAATCwAAAAEAAAAAAADq5N4A+vn4ALyolQCojncAuKOPAGEyBABkNggAxralAK+XgQDPwbMAqpJ5ANrQxQC5pJAAq5J9ANnOwwCZe10A1Me6ALSeiQC0nYgAvKmVANrPxAD39fIAxLKiAMi4qADm39cAbUIYAPXx7gCVdlgAqY93ANfMwQCznYcA9PHuALunlADh2NAA7+rmALiijgBaKgAAjWxMAOHXzwDSxbgA08a5APXy8ABxRx8Ajm1OAOXe1wCslHwA3tXLAN3UygD7+fgAhGA8ANnOwgDb0MYA6+XgAIlnRgDGtaQA59/ZAKWKcAC3oYwA5+DZANHDtQD9/PwA6ePdAGU3DACQcFAAo4hwANzSxwDJuqoAnYBkAKeOdgCuln8A4tnQAO3o4wDNvq8A/v39AGU3CgB5USoAqI11AKuSewDKuqsAsJmBAGI0BgC+q5gAhmI/AM6/sACjiG4ArpaBAPj39QDXyr8AimdGAF8wAQCJZUMAYTMEAIhlQgCWd1kA2s7DAKeNdAC2oYwA3dPIALWgiwDv6+YAybipAGIzBgBrQBUAiWZFANbJvQDg184A8+/rAOni3ADl3NUAXi8FAN/WzACnjXUArZV9ANjMwQDUx7sA7ObhAKaMcgBjNQgA0cS3AN3TyQC4pI8AooZrAM7AsgCfgmcAoodvAMKwoABgMQMArpaCAPDr5wBfMQEAuaWTAPby7wDArZsAZjgMAGAyBQCulX4A8+/sAHBGGwDGtaUA3NHGAPf08gCObU0AyLinAJp8XgCqknwAm35hAJZ2WAC5pJEAr5eAAOLYzwD6+fcA7unlALCYhADVybwAkG9PAMm5qgC6pZIA18vAAMWzogDBr54Awa+cAPLt6QCTc1QApYtzAPbz8AC9qpcAt6KNAOTc1ACRcVMAspuFAPXy7wCJZkQArZR9AKeOdQB7VC0A////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAr6+vr6+vSRU0FAeUP5+iNq8hDl9Uja4ZBmUFbasycFOvik9LUpJ0pgdXGGt7Iytyr55/F6+vr6+vr6+ICJUNHTx9giivr6+vr6+vc12YNWkBAlWLr6+vr6+vrwASN0RsVnisUXGZECc7CQmTmodaR4OlqT6FSgZQW35ZJAQ9OIAaERwLOqdGbmELXgQbTWeMoQgKqq+vr6+vr69ooCx8KSKcOR+vr6+vr6+vm0MDqDAAYkVqr6+vr6+vrxaEL6MBJmAlKlwPLRN6LpcgA62Rr0Fkb5CPMYl1BYGGZkJ2Cq+knTOvr6+WY3eOHlgMQHmvr6+vr6+vr6+vr68CSE5MrwAAdQAAAGUAAABRAAAAZQAAAHkAAAB5AAAAZQAAAEEAAABsAAAAaQAAAHMAAABlAAAAAAAAAGMAAAABCgAAAAw="));

//Tvtropes
trackers.push(new SearchEngine("Tvtropes", "http://tvtropes.org/pmwiki/search_result.php?cx=partner-pub-6610802604051523%3Aamzitfn8e7v&cof=FORID%3A10&ie=ISO-8859-1&q=%title", false, "data:image/x-icon;base64,R0lGODlhEAAOAMQAAAAAAO7u7mZmZigoKIyMjBgYGDs7O5mZmXp6era2tkpKShAQEHNzc////zMzMyEhIYODg1FRUWZmZkFBQZmZmVlZWQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAA0ALAAAAAAQAA4AAAVuYCM2wziWpomKa3qyLlkMdG0/aCEQB0FAQN+BURA5GIcFYMlcEBAOkWLHrAIQAoW0AilYAQtGZCISI7zWAmMiECEU56/agBARJhDHd8AwEEQJfgpfE1AJgAM+EAgMjQhAA4cNAQ4FD5eYmA4BDSEAOw=="));

//Wikipedia
trackers.push(new SearchEngine("Wikipedia", "http://en.wikipedia.org/wiki/Special:Search?search=%title&go=Go", false, "data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAEAgQAhIOEAMjHyABIR0gA6ejpAGlqaQCpqKkAKCgoAPz9/AAZGBkAmJiYANjZ2ABXWFcAent6ALm6uQA8OjwAiIiIiIiIiIiIiI4oiL6IiIiIgzuIV4iIiIhndo53KIiIiB/WvXoYiIiIfEZfWBSIiIEGi/foqoiIgzuL84i9iIjpGIoMiEHoiMkos3FojmiLlUipYliEWIF+iDe0GoRa7D6GPbjcu1yIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"));

//Metacritic
trackers.push(new SearchEngine("Metacritic", "http://www.metacritic.com/search/all/%title/results", false, "data:image/x-icon;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAAAAEgAAABIAAAAAAEAAAAAAAAzAAAAsp+fAJl/fwD///8A5d/fAE0gIADMv78AQBAQANnPzwBZMDAAv6+vAKWPjwDy7+8AmYCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJDAgHAAAAAAAAAAAAAAAJDAMDAgAAAAAAAAAAAAAJDAMDAQAAAAAAAAAAAAAJDAMDAQAAAAIHAAAAAAAJDAMDAQAAAAEDCAcAAAAFDAMDBAAAAAEDAwwJAAAAAAEMDAoAAAEDAwwJAAAAAAAABQYDCwYDAwwJAAAHAQcAAAACAwMDAwMJAAAHCAMIAAAAAAYDAwMLAAAHCAMDCAAAAAAACQkDAgAJCAMDCAcAAAAAAAAAAwMGAwMDCAcAAAAAAAAAAAEDAwMDBgcAAAAAAAAAAAAHCgMMDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="));

//Rotten Tomatoes
trackers.push(new SearchEngine("Rotten Tomatoes", "http://www.rottentomatoes.com/alias?type=imdbid&s=%imdb-id", true, "data:image/x-icon;base64,AAABAAEAEBAAAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ51AAMjQ1AAAAAAAAAAAABC+AAAs8BIAzO8SAD+61QAYXEAAsgYIABC+AAABALIAsgYIAAEAAACyBggAAAAAERAAAAAAAAEREQAAAAAAARERAAEQERAAERAAEREREQAREBEREAEREBEREREAAAEREREQAAAAABEREQAAAAAREBEREQAAAREAEREREAABEQARABEREAERAREAEREQAAAREQABEQAAABERAAAAAAAAEREAAAAAAAAREAAAAAD8f3cA+D93hfg5AAAccADwDEF3rIQDAADgH3eA8D8AAMQPAJyMBwAAjMF3aIjBAALw43dQ8P93//D//2nx/3ei"));

//Torrentz
trackers.push(new SearchEngine("Torrent: Torrentz", "http://www.torrentz.com/search?q="+cleanTitle, false, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAA0ZpxMG+fNAAAAAXRSTlMAQObYZgAAACNJREFUCJljqP/H8P8/CDUfZGA+gA3dZ2A+xMB8hIH5BJANAL3/EC6qfK0AAAAAAElFTkSuQmCC"));

//ThePirateBay
trackers.push(new SearchEngine("Torrent: Pirate Bay (Video)", "http://thepiratebay.org/search/%title/0/7/0", false, "data:image/x-icon;base64,Qk04AwAAAAAAADYAAAAoAAAAEAAAABAAAAABABgAAAAAAAAAAADgTAAA4EwAAAAAAAAAAAAA/////////////////////////////////////////////////////v7+/////////////Pz8vb297Ozs////////////////////////////////4uLiSUlJ3d3d////////8/PzEhIScnJy8fHx////////////////////8fHxwsLCWFhYAAAAyMjI////////5+fnEBAQICAgQkJCV1dXZWVli4uLiYmJUlJSKioqPT09bm5uHh4eYWFhwcHBubm5bGxsQEBAp6end3d3FBQUAAAAFBQUOTk5ISEhGRkZPT09WVlZQkJCKioqJycnenp6AAAAQUFBPz8/YGBgjo6O0dHR+/v7////////7+/vxcXFnZ2dg4ODExMTQEBAv7+/AAAAgoKCjo6OpaWltra2qqqqpqampaWlpKSkra2tr6+vsbGx5eXll5eXW1tb1NTUcXFxmJiYAwMDAAAANzc3VFRUGxsbAAAAX19fPDw8ERERAAAAQUFB/v7+/Pz8////////nJycAAAAAAAAAAAAHx8fCwsLAAAAJiYmBQUFAAAAAAAAKysr+vr6////////////nJycAAAAAAAADw8PAAAAAAAAAAAAAAAADQ0NAwMDAAAANjY2+vr6////////////rq6uAAAANjY25eXlWVlZHx8fJycnIyMj0dHRhoaGAAAAV1dX////////////////r6+vAAAALS0t0tLSX19fsrKy2dnZZWVlsrKyiIiIAAAAWVlZ////////////////r6+vAAAAAAAABQUFAgICExMTEBAQAwMDAwMDAQEBAAAAWlpa////////////////q6urAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFRU////////////////19fXSUlJQUFBQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQkJCQkJCqKio/////////////////////////v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+////////////AAA="));

//Beyazperde
trackers.push(new SearchEngine("Beyazperde.com", "http://www.beyazperde.com/ara/?q="+cleanTitle, false, "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABnRSTlMAAAAAAABupgeRAAABOUlEQVQI12NggIC0mQxpMxmIAIwIDchgVjohDcgArhmbNkacduPVxoBPG3F+w2YVeXqwe9pBTYqPk/XgrecfJyYi9MxKZ2BgYEFTysTI2BtqUeCsy8DAcOzuyyDWRS8/fUf2N3o86MsIX6gNhkuXrzvZtfMicvwwoTmHl4MVmSvEzY6mgAnNT+cfvzl+7yWE/fnH79Vn76FpYGZgYGAw9rVTlbRVlfz88/erzz+2XH709defi4/fla07efrBa0URXh9deQEu9ofvvjAY+zIypM2s9jJs8TdlYGB4/vFbwLRdpx68gptnqiC6Mctdkp+LgYEha9mR6QevMckK8lR7GUKkJfm5Stz0kB1Q6qYPUc3AwFDipsfDzsrCycb8+vMPHnaoX//8+4es4c+/f+++/oSwP3z7xcrMBABQ2W0R+3SKhgAAAABJRU5ErkJggg=="));

//Impawards
trackers.push(new SearchEngine("Impawards", "http://www.google.com/search?q=site%3Awww.impawards.com+%title&btnI=I&sourceid=navclient-ff&ie=UTF-8&rlz=1B5GGGL_trTR302TR302", false, "data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREBABAQAAABEAEAEBAAAAEQAQAQEAAAARABERAREAABEAEREBABABERAQAQERAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAA//8AAP//AACAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAQAA//8AAP//AAD//wAA"));

//Google
trackers.push(new SearchEngine("Google", "http://www.google.com/search?hl=en&q=%22%title%22 movie&btnG=Search", false, "data:image/x-icon;base64,R0lGODlhEAAQAPfLAAATVikwdA8SnxUfgAsWpAAilholjxw4jBc7kwAlvQQ2sRMsoBUqqhMzuhY/vxw4tSgmiyM1mSUztiQ6sTE3sQ4qyxMxxRoyxiAuxR1CtBxJsBxasSJuuTFguBte0Rlf2xVc9h9W9xVjzxVr0gdj6BRh4R1o5yBcyiZbyydT1i9b2Ddb1iFY6CJg2Vpor1dzvEJu20Z0yi23QDy1REi2OUy0O1WzOVC4PU+tVUe5Sk2xQU2zRUO4UE21Ula2SmKEqWWF2HyPx2+a6X6e6Xqk1m+s78sUDs4UGdEQB9YfDdwaANEfHd0YEscjAM4mAM0qANIoD9IkGdslGswuItYgL4aP0ImP2YGZ36Opzaq2wq/S+rzX/7/e8MrS1MLO/sTb48rT8snX/83c89PZ+crq+cH1/9Dl/9Ln/93r/9fy/+Hf7P/42eDm/O7u/+T29uX2/eT2/+f4/+f5/+j/9u//8+3/9u7/9ur5/+j//+n//+v//u3//+7//e7//+////b66/T/6vX/6/f/7f/07fj/4fv/4Pj/5v/45v7/4/r+7/3/6fDw+Pfx//D/9/X/8fT/8/f/8ff/8/D///H///L8/fL///P///X7//b6/ff/+/T///b9//f///v19//w9v/09P/29v/x+f/y///z///1+v/1///2///3//j79P/58/z/8/z99/z/9v7/9P7/9vn7//v6//j9//n9//j///n///v//vv////4+v/5+//6+P/4///6/P/6/v/6///7///9+P/8+v/9+v7/+Pz////8/f/9/f79///8///9//7//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAMsALAAAAAAQABAAAAj/AEn4oIFjBw8bOnrMuJGjhowZM1T8UdYJUZ5ZcNRYWjSrVK5QU0DMmtUnzRAXEy4o6FCEy6NDTkQIq1MmRgM0eZTlCXMgQJtRSE4gmgUkwh1EiZTNUiamy6NUUExcuoJgDCdDjQg9KgVL2SNFT1hwEvKglLBWuixZ+jSrlSBdRlL04bBBkTBdpZTpIqWsFaBcTEr0QaEhl6dWlswKW6poDRUPlmAUQKWMkTJLc76QMQNGUZMWgIgkCFJnlq5WXigwkFClVZQQyuRgELAlk7JBymCZGYAF0ZEPrQixgUDAihxVdPpoAZAFUZIRfThxgvPCwAILDipk+OFG2ZIVoxApERtPfvwlvZ+kQFzPvv0MJQEBADs="));


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
		var html = "<a href=\"" + this.getSearchUrl(title, id) + "\"><img class=\"img\" style=\"-moz-opacity: 0.4;\" border=\"0\" src=\"" + this.icon + "\" title=\"" + this.shortname + "\"><\/a>&nbsp;";
		return html;
	}
	
	this.getSearchUrl = function (title, id) {
		var searchUrl = this.searchurl;
		if (this.usesIMDBID) {


			searchUrl = searchUrl.replace(/%imdb\-id/, id);
			
			var adres=window.location.href;
			var ilk='imdb.com/title/';
			var imdbKod=adres.substring(adres.indexOf(ilk)+15);
			
			if(imdbKod.indexOf('/')>0)
			imdbKod=imdbKod.replace('/','');	
			
			searchUrl = searchUrl.replace(/%imdbkod/, imdbKod);
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
	regexp = /\(.*\)/g;
	title = title.replace(regexp, "");
	return title;
}

function getCleanTitle() {
	var title = document.title;
	title = title.match(/^(.*) \(/)[1];
	regexp = /\(.*\)/g;
	title = title.replace(regexp, "");
	regexp = /,|:|;/g;
	title = title.replace(regexp, " ");
	regexp = /'|"/g;
	title = title.replace(regexp, "");
	return title;
}

function getImdbCode() {
	var adres=window.location.href;
	var ilk='imdb.com/title/';
	var imdbCode=adres.substring(adres.indexOf(ilk)+15);
	if(imdbCode.indexOf('/')>0)
	imdbCode=imdbCode.replace('/','');	
	return imdbCode;
}


function getId() {
	with (location.href) {
		var id = match(/title\/tt(.*?)\//i)[1];
	}
	return id;
}


function addIconBarIcons(title, id, trackers) {
 var iconbar = xpath("//td[@id='overview-top']", document); //xpath("//h1", document);
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
		var tdopenall = document.createElement("a");
		var aopenall = document.createElement("a");
		aopenall.innerHTML = ""; //Open all stopped
		aopenall.href = "javascript:;";
		aopenall.setAttribute("class", "openall");
		aopenall.addEventListener("click", function () { openAllInTabs(title, id, true); }, false);
		tdopenall.appendChild(aopenall);
		
		iconbar.appendChild(tdopenall);
	}
}

function addStyles() {
	var open_all_class = "a.openall {\n" +
	"	font-weight: bold;\n" + 
	"	font-family: Calibri, Verdana, Arial, Helvetica, sans-serif;\n" +
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

