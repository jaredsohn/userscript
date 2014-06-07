
// ==UserScript==
// @name          bobobobobo
// @namespace      http://www.erepublik.com/en/referrer/DarkHunter93
// @description    eColombia Centro de entrenamiento (eRep)
// @version        0.14
// @include        http://ww*.erepublik.com/*/my-places/army
// @include        http://ww*.erepublik.com/*/my-places/train/*
// @include	   http://ww*.erepublik.com/*/train_human_check/*
// ==/UserScript==

 1<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
2<html xmlns="http://www.w3.org/1999/xhtml">
3<head>
4<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
5<meta name="title" content="Erepublik" />
6<meta name="robots" content="index, follow" />
7<meta name="description" content="The New World" />
8<meta name="keywords" content="" />
9<meta name="language" content="en" />
10<title>Erepublik</title>
11<link rel="shortcut icon" href="/images/favicon.ico" />
12<link rel="stylesheet" href="/css/cmp/app.css" type="text/css" media="screen" />
13<link rel="stylesheet" href="/css/layout/es.css" type="text/css" />
14<link rel="stylesheet" href="/css/layout/menu_v4_es.css" type="text/css" />
15<link rel="stylesheet" href="/css/texts/es.css" type="text/css" />
16<link rel="stylesheet" href="/css/global.css" type="text/css" />
17<link rel="stylesheet" href="/css/sIFR-screen.css" type="text/css" media="screen" />
18<link rel="stylesheet" href="/css/sIFR-print.css" type="text/css" media="print" />
19 <script type="text/javascript" src="/js/global.js"></script>
20 <script type="text/javascript" src="/js/sifr.enable.js"></script>
21 <script type="text/javascript" charset="utf-8">
22 window.confirmation = {
23 ok: 'ok',
24 yes: 'sí',
25 no: 'no'
26 };
27</script>
28<script type="text/javascript" charset="utf-8">
29 if (top.location != location) {
30 top.location.href = document.location.href ;
31 }
32</script>
33<script type="text/javascript" charset="utf-8" src="/js/jquery-1.3.2.min.js"></script>
34<script type="text/javascript"> var $j = jQuery.noConflict();</script>
35
36 <script type="text/javascript" src="/js/ambient.js"></script>
37
38
39<script type="text/javascript" charset="utf-8">
40 var citizen_regionList_select = "Selecciona tu región de eRepublik.";
41 var citizen_regionList_no_region = "El país seleccionado no tiene ninguna región.";
42 var citizen_items_confirm = "¿Estás seguro de querer tirar este objeto? Tal vez prefieras donárselo a alguien.";
43 var citizen_friends_prev = "Previo";
44 var citizen_friends_next = "Otro";
45 var company_browsers_quality_level = "Nivel de Calidad";
46 var election_list_select_party = "Selecciona un partido";
47 var scriptFeeds_countryAccounts_choose = "Elige";
48 var scriptFeeds_proposedCongressman_search = "Buscar";
49 var scriptFeeds_proposedCongressman_close = "Cerrar";
50 var scriptFeeds_proposedCongressman_replace = "Reemplazar";
51 var scriptFeeds_proposedCongressman_close = "Cerrar";
52 var scriptFeeds_proposedCongressman_presentation = "Presentación";
53 var scriptFeeds_proposedCongressman_no_presentation = "Sin presentación";
54 var scriptFeeds_regionList_select = "Selecciona tu región de eRepublik";
55 var register_region_list_belongs_to = "anexionada por ";
56 var citizenship_application_accepted = "¡Aceptado!"
57 var citizenship_application_canceled = "Has cancelado tu solicitud de ciudadania "
58 var citizenship_application_cancel_confirm = "¿Estás seguro de querer cancelar tu solicitud de ciudadanía?"
59</script><script type="text/javascript" src="/js/jquery-1.2.6.min.js"></script>
60<script type="text/javascript" src="/js/easyTooltip.js"></script>
61<script type="text/javascript" src="/js/myPlaces/tooltip.js"></script>
62<script type="text/javascript" src="/js/jquery.impromptu.1.5.js"></script>
63<script type="text/javascript" src="/js/homepage/swfobject.js"></script>
64<script type="text/javascript" src="/js/misc.js"></script>
65<script type="text/javascript" src="/js/cookie/jquery.cookie.min.js"></script>
66<script type="text/javascript" src="/js/jquery.pstrength-min.1.2.js"></script>
67<script type="text/javascript" src="/js/eads/eads.js"></script>
68<script type="text/javascript" src="/js/prototype.js"></script>
69<script type="text/javascript" src="/js/scriptaculous.js"></script>
70<script type="text/javascript" src="/js/lightwindow.js"></script>
71<link rel="stylesheet" type="text/css" media="screen" href="/css/lightwindow.css" />
72</head>
73
74<body id="places" >
75
76 <div class="at">
77<div class="ath">
78 <a href="javascript:;" class="ambient_toggler"><span>Ambient on/off</span></a>
79</div>
80</div>
81 <div id="container">
82 <div id="header" >
83 <div id="logo">
84 <a href="/es" title="eRepublik &ndash; Juego de Estrategia Online"><span>eRepublik &ndash; Juego de Estrategia Online</span></a>
85 </div>
86 <div class="advisor">
87
88 <div id="advisor" class="big">
89 <div id="advContent">
90 <div class="skip_btn" style="background:none;"></div>
91 <p><img src="/images/advisor/icon_adv_complete.png">
92 You've reached adulthood. Remember, no-one is prosperous without effort:
93 <a href="/es/my-places/company/work">work</a> and <a href="/es/my-places/army">train</a> each day.</p>
94 </div>
95 <!-- div id="advHead">
96 <a href="#" class="downUp" onclick="javascript:getAdvisor('minimize');return false;"></a>
97 </div -->
98</div>
99 <div id="hinfo">
100 <div id="clock" >
101 <span id="live_time" class="time"></span>
102 <span class="date">Feb03</span>
103 <span class="eday">Día <strong>806</strong> del Nuevo Mundo </span>
104 </div>
105 <div id="searchholder"></div>
106 </div>
107 </div>
108</div>
109 <div id="menu">
110 <ul id="nav">
111 <li id="menu1">
112 <a href="/es" ><span>Inicio</span></a>
113 </li>
114 <li id="menu2">
115
116 <a href="#"><span>Mis lugares</span></a>
117 <ul>
118 <li><a href="/es/citizen/profile/824471">Perfil</a></li>
119 <li><a href="/es/my-places/company/824471">Compañía</a></li>
120 <li><a href="/es/my-places/army">Training grounds</a></li>
121 <li><a href="/es/my-places/party">Partido político</a></li>
122 <li><a href="/es/my-places/newspaper">Periódico</a></li>
123 <li><a href="/es/country/Colombia">Administración del país</a></li>
124 <li><a href="/es/my-places/organizations">Organizaciones</a></li>
125 <li><a href="/es/chat/rooms">Salas de Chat</a></li>
126 <li><a href="/eads/advertiseHere">Departamento de Anuncios</a></li>
127 </ul>
128 </li>
129 <li id="menu3">
130 <a href="#"><span>Mercados</span></a>
131 <ul>
132 <li><a href="/es/market/country-0-industry-0-quality-0">Mercado</a></li>
133 <li><a href="/es/exchange">Mercado Monetario</a></li>
134 <li><a href="/es/human-resources/country-0-domain-all-skill-0">Mercado Laboral</a></li>
135 <li><a href="/es/companies-for-sale/country-0-industry-0">Compañías a la venta</a></li>
136 </ul>
137 </li>
138 <li id="menu4">
139 <p></p>
140 <a href="#"><span>Información</span></a>
141 <ul>
142 <li><a href="/es/rankings/countries/1/10" rel="nofollow">Clasificaciones</a></li>
143 <li><a href="/es/country/society/Colombia" rel="nofollow">Estadísticas del país</a></li>
144 <li><a href="/es/tutorials" rel="nofollow">Tutoriales</a></li>
145 <li><a href="/es/career-path" rel="nofollow">Trayectoria profesional</a></li>
146 <li><a href="/es/map" rel="nofollow">Mapa del Mundo</a></li>
147 </ul>
148 </li>
149 <li id="menu5">
150 <a href="#"><span>Comunidad</span></a>
151 <ul>
152 <li><a href="/es/invite-friends">Invitar amigos</a></li>
153 <li><a href="/es/elections/current/1">Elecciones</a></li>
154 <li><a href="/es/news">Noticias</a></li>
155 <li><a href="/es/badges">Herramientas</a></li>
156 <li><a href="/es/forum" target="_blank">Foro</a></li>
157 <li><a href="http://wiki.erepublik.com/" target="_blank">Wiki</a></li>
158 <li><a href="http://blog.erepublik.com/" target="_blank">Blog</a></li>
159 </ul>
160 </li>
161 <li id="menu6">
162 <a href="/es/get-gold/gold"><span>Consigue Gold & Extras</span></a>
163 </li>
164</ul>
165 </div>
166
167
168 <div id="sidebar">
169 <div id="miniprofile">
170 <div class="start"></div>
171 <div class="core">
172 <div class="avatarholder">
173 <a href="/es/citizen/profile/824471"><img alt="parce" width="55" height="55" src="http://static.erepublik.com/uploads/avatars/Citizens/2008/08/05/3056b661b438f9b6df98c05875d51c99_55x55.jpg" /></a>
174 <a class="citizen_name" href="/es/citizen/profile/824471">parce</a> <div class="ender tooltip_with_tags" style="cursor: default;" title="Experience level: {{b}}19{{/b}}{{br /}}Experience points: {{b}}1606{{/b}}{{br /}}Next level at: {{b}}2000{{/b}}">
175
176 <table width="100%" border="0" class="citizen_progress" >
177 <tbody>
178 <tr>
179 <td>
180 <div class="bar green">
181 <div class="border">
182 <span class="lefts"></span>
183 <span class="mids" style="width: 89%;"></span>
184 <span class="rights"></span>
185 </div>
186 <div class="fill">
187 <span class="lefts"></span>
188 <span class="mids" style="width: 19%;"></span>
189 <span class="rights"></span>
190 </div>
191 </div>
192 </td>
193 </tr>
194 </tbody>
195 </table>
196
197 <div class="xprank">19</div>
198 </div>
199 </div>
200
201 <div class="flagholder">
202 <a href="/es/country/Colombia"><img title="Colombia" alt="Colombia" src="/images/flags/L/Colombia.gif" /></a> </div>
203
204 <div class="wtooltip" title="&bull; Higher wellness means higher productivity and damage.{{br /}}&bull; Working, training, fighting and lack of food decreases wellness.{{br /}}&bull; Houses, wellness boxes, food, hospitals restore wellness.">
205 <div id="wellnessmeter" class="">
206 <div class="meter sm" style="height: 0%;"></div>
207 </div>
208 <div id="wellnessvalue" style="cursor: default;">100</div>
209 </div>
210 <div id="accountdisplay">
211 <div class="item">
212 <img src="/images/parts/icon-gold.gif" style="margin-top: -2px;" alt="Gold" title="Gold" />
213 <div id="side_bar_gold_account_value">
214 0 </div>
215 </div>
216 <div class="item">
217 <img class="flag" alt="COP" title="COP" src="/images/flags/S/Colombia.gif" /> 3 </div>
218 </div>
219 <div id="maildisplay">
220 <div class="item" title="0 mensajes nuevos">
221 <a class="msg" href="/es/messages/inbox/1">&nbsp;</a> <a class="smalldotted" href="/es/messages/inbox/1">0</a> </div>
222 <div class="item" title="2 mensajes nuevos">
223 <a class="newalert" href="/es/messages/alerts/1">&nbsp;</a> <a class="smalldotted" href="/es/messages/alerts/1">2</a>
224 </div>
225 </div>
226 <a class="logout" href="/es/logout">salir</a> </div>
227 <div class="end"></div>
228</div>
229 </div>
230 <div id="content">
231 <h1>Mis lugares > Training grounds</h1>
232<div class="indent invalidicon">
233 <h2 class="special goleft padded">
234 Hoy no has entrenado </h2>
235
236 <a class="wikiicon goright padded" title="Abrir página del Wiki" href="http://wiki.erepublik.com/index.php/Training_grounds">Descubre más</a>
237</div>
238
239<div class="lana">
240 <div class="lana_holder"></div>
241 <div class="lana_info">
242 <div class="lana_tip">
243 <span class="left_tip">&nbsp;</span>
244 <p>
245 Hi <strong>parce</strong>! I'm a Fucking bitch what steal the gold of the eWorld ^^ </p>
246 </div>
247
248 <h2>Choose a training program</h2>
249 <span><img src="/images/parts/icon_skill_strenght.gif" height="28" width="28" alt="" />Your strength: <strong>11.47</strong></span>
250 <div class="lana_buttons">
251 <div >
252 <a href="/es/my-places/train/0">
253 <h4>0%</h4>
254 <small><b>extra</b> training effect</small>
255 <img height="96" width="106" src="/images/parts/characters/lana_1.png" alt="Lana_1" /> <strong>&nbsp;</strong>
256 <h6 class="goldie">0</h6>
257 <a class="fluid_blue_dark_big" href="/es/my-places/train/0"><span>Standard <br> training only</span></a> </a>
258 </div>
259 <div >
260 <a href="/es/my-places/train/1">
261 <h4>+50%</h4>
262 <small><b>extra</b> training effect</small>
263 <img height="96" width="106" src="/images/parts/characters/lana_2.png" alt="Lana_2" /> <strong>Alexander the Great</strong>
264 <h6 >0.5</h6>
265 <a class="fluid_blue_dark_big" href="/es/my-places/train/1"><span>Advanced Training & Strategy</span></a> </a>
266 </div>
267 <div >
268 <a href="/es/my-places/train/2">
269 <h4>+100%</h4>
270 <small><b>extra</b> training effect</small>
271 <img height="96" width="106" src="/images/parts/characters/lana_3.png" alt="Lana_3" /> <strong>Caesar</strong>
272 <h6 >1</h6>
273 <a class="fluid_blue_dark_big" href="/es/my-places/train/2"><span>Advanced Training & Strategy</span></a> </a>
274 </div>
275 <div class="nomargin">
276 <a href="/es/my-places/train/3">
277 <h4>+200%</h4>
278 <small><b>extra</b> training effect</small>
279 <img height="96" width="106" src="/images/parts/characters/lana_5.png" alt="Lana_5" /> <strong>Napoleon</strong>
280 <h6 >1.8</h6>
281 <a class="fluid_blue_dark_big" href="/es/my-places/train/3"><span>Advanced Training & Strategy</span></a> </a>
282 </div>
283 </div>
284 </div>
285</div>
286<div class="indent">
287</div>
288 </div>
289 <div id="promo">
290 <iframe id="eads" frameborder="0" width="120" height="1000" src="http://ads.erepublik.com/ads/serve/es/b73c6c98a71266b4b7e865bedde53e4488a44cb3/824471" scrolling="no">
291</iframe>
292 </div>
293
294 <div id="footer" >
295 <p>
296 <a href="http://wiki.erepublik.com" target="_blank">Wiki</a> &nbsp; | &nbsp;
297 <a href="http://blog.erepublik.com" target="_blank">Blog</a> &nbsp; | &nbsp;
298 <!-- a href="http://shop.erepublik.com" target="_blank">Tienda</a> &nbsp; | &nbsp;-->
299 <a href="http://press.erepublik.com" target="_blank">Prensa</a> &nbsp; | &nbsp;
300 <a rel="nofollow" href="/es/tickets" target="_blank">Contacto</a> &nbsp; | &nbsp;
301 <a target="_blank" rel="nofollow" href="http://jobs.erepublik.com">Empleo</a> &nbsp; | &nbsp;
302 <a rel="nofollow" href="/es/terms-and-conditions" target="_blank">Términos de Uso</a> &nbsp; | &nbsp;
303 <a rel="nofollow" href="/es/privacy-policy" target="_blank">Privacidad</a>&nbsp; | &nbsp;
304 <a href="https://edge.affiliateshop.com/account/affsignup?WID=1898" rel="nofollow" target="_blank">Afiliados</a>&nbsp; | &nbsp;
305 <a href = "http://wiki.erepublik.com/index.php/Rules" rel="nofollow" target="_blank">Leyes de eRepublik</a>
306 </p>
307 <p class="follow">Follow us:
308 <a href="http://www.facebook.com/pages/Erepublik/26897053321?ref=ts" title="Facebook" target="_blank"><img alt="Facebook" src="/images/parts/facebook_small_icon.png" title="Facebook" />Facebook</a>
309 <a href="http://www.twitter.com/erepublik" title="Twitter" target="_blank"><img alt="Twitter" src="/images/parts/twitter_small_icon.png" title="Twitter" />Twitter</a>
310 </p>
311 <p>Copyright &copy; 2007-2010&nbsp;eRepublik</p>
312</div>
313
314
315
316
317<script type="text/javascript">
318$j(document).ready(function() {
319 var search_pkyk = '<form id="search" method="get" action="/es/search/">';
320 search_pkyk = search_pkyk +'<input type="text" name="q" id="search_field" value="Buscar ciudadano" class="field" />';
321 search_pkyk = search_pkyk +'<input type="submit" name="commit" value="" class="submit" disabled="disabled" />';
322 search_pkyk = search_pkyk +'</form>';
323 $j('div#searchholder').html(search_pkyk);
324 $j('#search').ERepublikSearchForm();
325});
326</script>
327 <script type="text/javascript" language="Javascript" charset="utf-8">
328 live_clock("live_time",13,58);
329 </script>
330 </div>
331
332
333 <script type="text/javascript">
334 var pkyk = 0;
335 var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
336 document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
337 </script>
338 <script type="text/javascript">
339 var pkyk = 0;
340 var pageTracker = _gat._getTracker("UA-2001550-1");
341 pageTracker._trackPageview();
342
343
344 </script>
345
346
347
348
349 </body>
350</html> 