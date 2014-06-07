// ==UserScript==
// @name	   DarkUTube
// @version	   2.5.4
// @author	   Keyser Söze
// @description	   GrooveShark & YouTube Dark Style, Plus A Video Download Helper For YouTube And Some Sex Video Sites ===||=== Estilo Oscuro Para GrooveShark & YouTube Mas Una Herramienta  Para Descargar Vídeos De YouTube Y Algunos Sitios Porno.
// @namespace	   http://userscripts.org/users/KeyserSoze
// @icon	   http://www.cinemorelos.com/favicon.ico
// @website	   http://userscripts.org/scripts/show/150291
// @homepageURL    https://userscripts.org/scripts/show/150291
// @downloadURL	   https://userscripts.org/scripts/source/150291.user.js
// @updateURL	   https://userscripts.org/scripts/source/150291.meta.js
// @downloadURL	   https://userscripts.org/scripts/source/150291.meta.js
// @run-at	   document-end
// @grant          GM_log
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_listValues
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @require        https://ajax.aspnetcdn.com/ajax/jquery/jquery-2.0.3.js
// @require        http://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require        http://yourjavascript.com/5818134233/aes.js
// @require        http://yourjavascript.com/1128214835/md5.js
// @require        http://yourjavascript.com/1502838391/rc4.js
// @include        htt*:*youtube.*/*
// @include        htt*:*grooveshark.*/*
// @include        htt*:*html5.grooveshark.com/*
// @include        htt*:*retro.grooveshark.com/*
// @include        htt*:*play.spotify.com/*
// @include        http://*.jango.com/*
// @include        https://*.jango.com/*
// @include        http://*.accuradio.com/*
// @include        https://*.accuradio.com/*
// @include        http://*.deezer.com/*
// @include        https://*.deezer.com/*
// @include        http://8tracks.com/*
// @include        https://8tracks.com/*
// @include        htt*:*robwu.nl/youtubelyrics/*
// @include        htt*:*robwu.nl/lyricshere/*
// @include        htt*:*rob.lekensteyn.nl/youtubelyrics/*
// @include        htt*:*4tube.com/videos/*
// @include        htt*:*redtube.com/*
// @include        htt*:*beeg.com/*
// @include        htt*:*camelstyle.net/video/*
// @include        htt*:*deviantclip.com/watch/*
// @include        htt*:*extremetube.com/video/*
// @include        htt*:*foxytube.com/videos/*
// @include        htt*:*keezmovies.com/video/*
// @include        htt*:*mofosex.com/videos/*
// @include        htt*:*motherless.com/*
// @include        htt*:*nuvid.com/video/*
// @include        htt*:*overthumbs.com/galleries/*
// @include        htt*:*porn.com/videos/*
// @include        htt*:*porn.to/video/*
// @include        htt*:*pornbanana.com/video.aspx?id=*
// @include        htt*:*pornerbros.com/*
// @include        htt*:*pornhub.com/view_video.php?viewkey=*
// @include        htt*:*pornper.com/video/*
// @include        htt*:*porntube.com/videos/*
// @include        htt*:*rawtube.com/videos/*
// @include        htt*:*spankwire.com/*video*
// @include        htt*:*submityourflicks.com/videos/*
// @include        htt*:*sluttyred.com/videos/*
// @include        htt*:*tube8.com/*/
// @include        htt*:*tubehentai.com/videos/*
// @include        htt*:*xhamster.com/movies/*
// @include        htt*:*xtube.com/watch.php?v=*
// @include        htt*:*xvideos.com/video*
// @include        htt*:*yobt.com/content/*
// @exclude        htt*:*spankwire.com/
// @exclude        htt*:*beeg.com/
// @exclude        htt*:*pornerbros*/*/
// @exclude        htt*:*pornerbros*/
// @exclude        htt*:*redtube.com/
// @exclude        htt*:*redtube.com/?*
// @exclude        htt*:*youtubeinaudio*
// @exclude        htt*:*video2mp3*
// @exclude        htt*:*clipconverter.cc/*
// @Basado en 	   "DirtyDDL" & "YouTube Lyrics by Rob W" ... Así que, muchas gracias a los autores originales!
// @Based on 	   "DirtyDDL" & "YouTube Lyrics by Rob W" ... So, many thanks to original authors
// ==/UserScript==

(function () {
 var css = "";
if (false || (document.location.href.indexOf("http://www.youtube") == 0) || (document.location.href.indexOf("https://www.youtube") == 0) || (document.location.href.indexOf("http://youtube") == 0) || (document.location.href.indexOf("https://youtube") == 0) || (document.location.href.indexOf("http://rob.lekensteyn.nl/youtubelyrics/") == 0) || (document.location.href.indexOf("https://rob.lekensteyn.nl/youtubelyrics/") == 0))
 var css = "*     {cursor: url(\"http://reloaded.site88.net/Data/aero_arrow.cur\")\n, default !important}\na, a * {cursor: url(\"http://reloaded.site88.net/Data/aero_link.cur\")\n, pointer !important}\n\nhtml  ,\n\nhtml *:not(:empty) ,\n\nhtml *:after ,\nhtml *:before\n{ background-image : some!important\n\n}\n\nhtml\n{ background-color : #333 !important\n; border-color     : #444 !important\n}\n\nbody\n{ background-color : transparent !important\n; border-color     : #666 !important\n; color            : #ccc !important\n}\n\nbody * ,\nhtml *:after ,\nhtml *:before\n{ background-color : transparent !important\n; border-color     : #666        !important\n; color            : inherit     !important\n; text-shadow      : none        !important\n}\n\n.head  ,\n.header  ,\n*[id*=\"title\"]  ,\n*[id*=\"Title\"]  ,\n*[id*=\"head\"]  ,\n*[id*=\"Head\"]  ,\n*[class*=\"header\"]  ,\n*[class*=\"Header\"]  ,\n*[id*=\"hlavicka\"]  ,\n*[id*=\"Hlavicka\"]  ,\n*[class*=\"hlavicka\"]  ,\n*[class*=\"Hlavicka\"]\n{ background-color : #404040 !important\n}\n\nheader  ,\n#head  ,\n#header  ,\n#top\n{ background-color : #444 !important\n}\n\n.navlist a  ,\n.Navlist a  ,\n*.navigation a  ,\n*[id*=\"menu\"] a  ,\n*[id*=\"Menu\"] a  ,\n*[id*=\"navig\"] a  ,\n*[id*=\"Navig\"] a  ,\n*[id*=\"-nav\"] a  ,\n*[id*=\"-Nav\"] a  ,\n*[id$=\"nav\"] a  ,\n*[id$=\"Nav\"] a  ,\n*[class*=\"menu\"] a  ,\n*[class*=\"Menu\"] a  ,\n*[class*=\"navig\"] a  ,\n*[class*=\"Navig\"] a  ,\n*[class*=\"-nav\"] a  ,\n*[class*=\"-Nav\"] a  ,\n*[class$=\"nav\"] a  ,\n*[class$=\"Nav\"] a\n{ background-color : #282839 !important\n}\n\nlabel  , \nnav a  ,\nmenu a  ,\n#menu a  ,\n#navigation a\n{ background-color : #223 !important\n}\n\ndiv[class*=menu][class*=vertical]\n{ background-color: #334 !important\n}\n\n#menu a:hover  ,\n#navigation a:hover\n,\n*[class*=\"menu\"][class*=\"item\"]:hover\n{ background-color : #000 !important\n}\n\ndiv[id*=\"side\"]  ,\ndiv[id*=\"Side\"]  ,\ndiv[class*=\"side\"]  ,\ndiv[class*=\"Side\"]\n{ background-color : #404040 !important\n}\n\naside  ,\n.aside  ,\n#aside\n{ background-color : #444 !important\n}\n\n\nfooter  ,\ndiv[id*=\"foot\"]  ,\ndiv[class*=\"foot\"]  ,\ndiv[id*=\"paticka\"]  ,\ndiv[class*=\"paticka\"]\n{ background-color : #444 !important\n}\n\n*[class*=\"heading\"]  ,\n*[class*=\"Heading\"]  ,\n*[id*=\"heading\"]  ,\n*[id*=\"Heading\"]  ,\n*[class*=\"nadpis\"]  ,\n*[class*=\"Nadpis\"]  ,\n*[id*=\"nadpis\"]  ,\n*[id*=\"Nadpis\"]\n{ border-color : #888 !important\n; color        : #eee !important\n}\n\nh1\n{ background-color : #000 !important\n; border-color     : #eee !important\n; color            : #fff !important\n}\n\nh2  ,\nh3  ,\nh4  ,\nh5  ,\nh6  ,\ncaption  , \nthead  ,\nth  ,\nlh  , \ndl dt  , \nhtml fieldset legend   \n{ background-color : #222 !important\n; border-color     : #999 !important\n; color            : #eee !important\n}\n\nblockquote  ,\ncode  , \nxmp  ,\npre\n{ background-color : #444 !important\n}\n\ntd\n{ border-color     : #555 !important\n}\n\nhr\n{ background-color : #666 !important\n; border-color     : #666 !important\n; color            : #666 !important\n}\n\n*[id*=\"important\"]  ,\n*[id*=\"Important\"]  ,\n*[class*=\"important\"]  ,\n*[class*=\"Important\"]\n{ border-color : #666 !important\n; color        : #fff !important\n}\n\nb  ,\nb *  ,\ni  ,\ni *\n{ border-color : #555 !important\n; color        : #eee !important\n}\n\nem  ,\nem *  ,\nstrong  ,\nstrong *\n{ border-color : #666 !important\n; color        : #fff !important\n}\n\n#current  ,\n#selected  ,\n#active  ,\n.current  ,\n.selected  ,\n.active  ,\n.current a ,\n.selected a  ,\n.active a\n{ background-color : #000 !important\n; color            : #fff !important\n}\n\n*[id*=Current]  ,\n*[id*=Selected]  ,\n*[id*=Active]  ,\n*[id*=current]  ,\n*[id*=selected]  ,\n*[id*=active] ,\n*[class*=Current]  ,\n*[class*=Selected]  ,\n*[class*=Active]  ,\n*[class*=current]  ,\n*[class*=selected]  ,\n*[class*=active] ,\n*[id*=Current] a ,\n*[id*=Selected] a  ,\n*[id*=Active] a  ,\n*[id*=current] a  ,\n*[id*=selected] a  ,\n*[id*=active] a ,\n*[class*=Current] a  ,\n*[class*=Selected] a  ,\n*[class*=Active] a  ,\n*[class*=current] a  ,\n*[class*=selected] a  ,\n*[class*=active] a\n{ background-color : #111 !important\n; color            : #eee !important\n}\n\n.copyright\n{ color : #ccc !important\n}\n.error\n{ color : #f66 !important\n}\n.warning\n{ color : #f99 !important\n}\n.example\n{ color : #cff !important\n}\n.issue\n{ color : #f99 !important\n}\n.note\n{ color : #cff !important\n}\n.search\n{ color : #cff !important\n}\n\n*[irrelevant]\n{\n}\n\n\ntable\n{ background-color: transparent !important\n}\nthead , tfoot\n{ background-color: #333 !important\n}\n\nhtml body *[onclick]:hover ,\nhtml body *[ondblclick]:hover ,\na[href^='javascript:'] ,\na[href='#']\n{ background-color : #300 !important\n}\n\nlabel[for]  ,\na:link  ,\na:link *\n{ border-color : #399 !important\n; color        : #9ef !important\n}\n\nlabel[for]:focus  ,\nlabel[for]:hover  ,\na:link:focus  ,\na:link:hover\n{ background-color : #000 !important\n; border-color     : #9ef !important\n; color            : #eff !important\n}\n\na:link:focus *  ,\na:link:hover *\n{ border-color : #9ef !important\n; color        : #eff !important\n}\n\na:visited  ,\na:visited *\n{ border-color : #690 !important\n; color        : #9c3 !important\n}\n\na:visited:focus  ,\na:visited:hover\n{ background-color : #000 !important\n; border-color     : #9c3 !important\n; color            : #cf9 !important\n}\n\na:visited:focus *  ,\na:visited:hover *\n{ border-color : #9c3 !important\n; color        : #cf9 !important\n}\n\na:active  ,\na:active *\n{ border-color : #600 !important\n; color        : #f33 !important\n}\n\nhtml button  ,\nhtml select  ,\nhtml input\n{ background-color : #222 !important\n}\n\nhtml input[type=\"password\"]\n{ background-color : #755 !important\n}\n\nhtml textarea  ,\nhtml input[type=\"text\"]  ,\nhtml input:not([type])\n{ background-color : #555 !important\n; color: #fff !important\n}\n\nhtml textarea:hover  ,\nhtml input[type=\"text\"]:hover  ,\nhtml input:not([type]):hover\n{\n}\n\nhtml input:hover ,\nhtml button:hover ,\nhtml select:hover ,\nhtml textarea:hover\n{ color : #fff !important\n; border-color: #ccc !important\n; background-color : #444 !important\n}\n\nhtml textarea:focus  ,\nhtml input:focus  ,\nhtml textarea:focus ,\nhtml button:focus\n{ background-color : #000 !important\n; border-color     : #999 !important\n; color: #ccc !important\n}\nhtml textarea:focus:hover  ,\nhtml input:focus:hover  ,\nhtml button:focus:hover ,\nhtml textarea:focus:hover\n{ border-color     : #fff !important\n}\n\nhtml input[type=\"password\"]:focus\n{ background-color : #300 !important\n}\n\ninput[disabled]\n{ color : #888 !important\n}\n\nhtml button  ,\nhtml select  ,\nhtml input  ,\nhtml textarea\n{ -moz-appearance : none !important\n; background-image: none !important \n}\n\n*[class*='content']  ,\nli:hover li\n{ background-color : transparent !important\n}\n\ndiv[id^=webdeveloper]\n{ background-color : #333 !important\n}\n\ndiv[style~=\"url(chrome://flashblock/content/flash.png)\"]\n{ background-color : #630 !important\n}\n\ntd.quantifier > div  ,\ndiv.graph > div#tomGraph\n{ background-color : #222 !important\n}\n\nspan#__firefox-findbar-search-id\n{ background-color : #9ff !important\n}\n\n#pop\n{ background-color : #222 !important\n}\n\ndiv#lbHoverNav a#lbPrev ,\ndiv#lbHoverNav a#lbNext\n{ background-color:  transparent !important\n}\n\ndiv[style~=\"url(chrome://flashblock/content/flash.png)\"]\n{ background-color : #630 !important\n}\n\nHtml,\nBody,\nDiv#nav,\nDIV.zPa.g9,\nDIV.VW.Bn,\nDIV.pga,\nDIV.Mza.mj,\nDiv#footer,\nDiv#pmyr_div,\nDiv.nvlink,\nDiv.author,\nDiv.dbx-content,\nDiv.threaddetails.td,\nDiv.art-Header-png,\nDiv.clearfix.copy,\nDiv.clearfix.notifi_cuerpo,\nDiv.register_back,\nDiv.comunidades.sidebarR,\nDiv.tipsy-inner,\nDiv.ui-widget-overlay,\nDiv#scbar.cl,\nDiv.man_show,\nDiv.com-2,\nDiv.com-3,\nDiv.com-3-top,\nDiv#tb_.hdm-top,\nDiv.hdm-topm,\nDiv#vista_previa,\nDiv.clearfix.data-tip,\nDiv#topBar,\nDiv#navbar.navbar,\nDiv.tcatLeft,\nDiv#header,\nDiv#under_header,\nDiv#marsfeed,\nDiv#menu,\nDiv#main.clearfix.homes,\nDiv.tooltip-c.compact.clearfix,\nDiv.modal-wrapper.rounded,\nDiv#main.clearfix,\nDiv.menu-tabs-perfil.clearfix,\nDiv.perfil-data.clearfix,\nDiv.reg-form.clearfix,\nDiv.ipsTooltip_inner,\nDiv.threadnotification.td,\nDiv.ui-ac.ui-dialog-content.ui-widget-content,\nDiv.floatR.comment-body,\nDiv.title.clearfix,\nDiv.ui-dialog-content.ui-widget-content,\nDiv.metadata-column-half,\nDiv.metadata-tab,\nDiv.guided-help-box.gplus-share-promo,\nDiv.clearfix.comment-box.is-normal,\nDiv.clearfix.comment-box.my-comment,\nDiv.clearfix.comment-box.is-user,\nDiv.clearfix.comment-box.is-staff,\nDiv.box.sticky.musica.real-shadow,\nDiv.rating0.nonsticky,\nDiv.rating1.nonsticky,\nDiv.rating2.nonsticky,\nDiv.rating3.nonsticky,\nDiv.rating4.nonsticky,\nDiv.rating5.nonsticky,\nDiv.rating6.nonsticky,\nDiv.rating7.nonsticky,\nDiv.rating8.nonsticky,\nDiv.rating9.nonsticky,\nDiv.icon0.rating0.nonsticky,\nDiv.icon7.rating0.nonsticky,\nDiv.wrapper.clearfix,\nDiv.b-reg-an.clearfix,\nDiv.forumrow.table,\nDiv.forumrow,\nDiv.threadinfo.thread,\nDiv.threadpostedin.td.alt,\nDiv.dialog-preview.ui-dialog-content.ui-widget-content,\nDiv.ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix,\nDiv#footer-container,\nDiv.metadata-tab.basic-info-tab,\nFieldset.metadata-two-column,\nFieldset.metadata-column,\nDiv#reify-bugmenot-bmnWrapper14.reify-bugmenot-bmnWrapper,\nDiv#full-col.post,\nform#scbar_form,\n#jqContextMenu,\n#seguir,\n#unirse,\n#divResult,\n#divDic,\nA.nombre,\nDiv.wPa,\nDiv.yJa,\nDIV#widget_bounds.Upa.r3,\nDIV#root,\nA.btn.v.radio-on,\nA.require-login.button.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-text-only,\nA.btn.g.require-login,\nA.btn.g.not-following,\nA.btn.g.leave,\nA.btn.g.join,\nA.btn.v.floatR,\nA.button.tags.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-text-only,\nBody#index,\ndl.threadlastpost.td.alt,\ndl.threadlastpost.td,\ndl.threadimod.td,\nInput#masthead-search-term.search-term.yt-uix-form-input-bidi,\nInput.text-inp.text.cuenta-save-1.ui-corner-all.form-input-text.box-shadow-soft,\nLi.clearfix.tema_sticky,\nLi,\nLi.imodselector.threadbit,\nLi#tb_1.hdm-hover,\nP.nonthread,\nSpan.ui-button-text,\nSpan.show-more,\nSelect.yt-uix-form-input-select-element.metadata-privacy-input,\nSelect.yt-uix-form-input-select-element.metadata-category-input,\nTable.obertka,\nTd.thead,\nUl.floatcontainer,\nUl.clearfix,\nUl.threadstats.td.alt,\nUl.zebra_recent,\nUl.post-share-bottom.rounded.clearfix.post-share-list,\nHtml#vbulletin_html,\nH2,\nH3.blocksubhead\n{\nBackground: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAACXBIWXMAABwgAAAcIAHND5ueAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAC1JREFUeNpiZGBg+C8nJ8cAA0wqKioMyIDp169fDAwMDAyPHj2CCMBkYCoBAwAL3wfN5VBQoQAAAABJRU5ErkJggg==) \nFixed Repeat Center !important\n; Background-color: Black !important\n; Color: Cyan !important\n}\na:Link\n{\nColor: DeepSkyBlue!important\n}\na:Visited\n{\nColor: YellowGreen!important\n}\na:Hover\n{\nBackground-color: #222334 !important\n; Text-decoration: none !important\n; Color: Purple !important\n}\n\nDiv\n{\nBackground: none\n; Background-color: Transparent !important\n; Color:  SkyBlue !important\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);}
}
 var css = "";
if (false || (document.location.href.indexOf("http://www.youtube") == 0) || (document.location.href.indexOf("https://www.youtube") == 0) || (document.location.href.indexOf("http://youtube") == 0) || (document.location.href.indexOf("https://youtube") == 0) || (document.location.href.indexOf("http://rob.lekensteyn.nl/youtubelyrics/") == 0) || (document.location.href.indexOf("https://rob.lekensteyn.nl/youtubelyrics/") == 0))
 var css = "#watch-branded-actions img,#page.watch.watch-branded #watch-channel-brand-div,iframe[style=\"border: 0pt none; vertical-align: bottom;\"],#pyv-placeholder,embed[width=\"300\"][height=\"250\"],.ad-div,#watch-longform-ad,#watch-sidebar iframe,.watch-pyv-vid,#playnav-chevron,iframe[frameborder=\"0\"][style=\"border: 0px none; vertical-align: bottom;\"],#google_companion_ad_div,#instream_google_companion_ad_div,.pyv-promoted-videos {display:none!important} a,button {outline:none!important; text-decoration:none!important} a {color:hsl(0,50%,87%)!important; background:transparent!important} a:hover {background:transparent!important; color:hsla(0,99%,75%,1)!important; text-shadow: 0 0 0.8em hsla(0,50%,85%,.6)!important; -moz-transition: all .3s ease!important; -webkit-transition: all .3s ease!important} a:active {background:transparent!important; color:hsla(0,99%,75%,1)!important} a:visited {opacity: 0.7!important; background:transparent!important; color:hsl(120,99%,73%)!important; text-shadow: 0 0 2px hsl(0,0%,80%)!important} a:focus {background:none!important; color:hsl(240,99%,73%)!important; text-shadow: 0 0 1px hsl(240,100%,80%)!important} input[class=\"search-term\"],input[type=\"button\"],input[type=\"submit\"],button,div,span,h1,h2,h3,h4,h5,h6,table,ul,li,p,b,.Hkf8Nd.wrfcoc * {color:hsl(0,0%,73%)!important} .yt-uix-clickcard-card-body *,.yt-uix-hovercard-card-body,textarea,textarea * {color:hsl(0,0%,13%)!important} button,button:hover,button *,button *:hover {font-weight:bold!important} #footer-main a,#footer-main a:hover,#picker-loading {font-weight:normal!important} #footer-main a {text-shadow:none!important} html,body,.feed-container,.guide-layout-container,#page.watch-branded #watch-sidebar,#page.watch-branded #watch-main-container,#main-channel-content,.yt-uix-overlay-fg-content,#builder-root,#yt-admin,#playlist-pane-container,.playlist-video-item.odd,.playlist-video-item:nth-child(2n+1),.channel-activity-feeds,.channel-layout-two-column .tab-content-body,#playlist-pane-container,#masthead-container,#channels-page-editor-form,#yt-admin-content h2,#yt-admin-content .yt-admin-h2,.branded-page-v2-container.no-top-row .branded-page-v2-primary-col,.branded-page-v2-container.has-top-row {background: hsl(0,0%,7%) -moz-linear-gradient(top,hsl(0,0%,7%),hsl(0,0%,20%))!important; background: hsl(0,0%,7%) -webkit-linear-gradient(top,hsl(0,0%,7%),hsl(0,0%,20%))!important; background-repeat: repeat!important; background-position: center!important; background-attachment: fixed!important} button,input[type=\"button\"],input[type=\"submit\"],li[role=\"menuitem\"]:hover,.yt-uix-button-menu-item:hover,.yt-playall-link,.search-box .search-term,div[role=\"button\"],div[style=\"-moz-user-select: none;\"] {-moz-appearance: none!important; -webkit-appearance: none!important} button:not(.close):not(.close-small):not(.yt-uix-expander-arrow),.yt-uix-button:not(.close):not(.close-small),#masthead-subnav ul,#playlist-bar-bar-container,.yt-subscription-button.subscribed,.edit_controls_outer,.channel_settings_tab,.yt-playall-link,.yt-alert .yt-alert-content,.yt-alert.yt-alert-small .yt-alert-content,.infobox .editor-tab-container,.yt-alert-default.yt-alert-info,.yt-alert-actionable.yt-alert-info,.yt-alert-naked.yt-alert-info .yt-alert-icon,.yt-alert-small.yt-alert-info,#top-bar,#top-bar li {background:transparent!important; background-image: -moz-linear-gradient(top,hsl(0,0%,33%) 48%,hsl(0,0%,20%) 49%,hsl(0,0%,0%) 85%,hsl(0,0%,20%))!important; background-image: -webkit-linear-gradient(top,hsl(0,0%,33%) 48%,hsl(0,0%,20%) 49%,hsl(0,0%,0%) 85%,hsl(0,0%,20%))!important} button:not(.close):not(.close-small):not(.yt-uix-expander-arrow):hover,.yt-uix-button:not(.close):not(.close-small):not(.yt-uix-expander-arrow):hover,.guide-item:hover,#masthead-subnav a:hover,.yt-uix-button-menu li a:hover,.channel_settings_tab:hover,#yt-admin-sidebar a:hover,li[role=\"menuitem\"]:hover,.yt-uix-button-menu-item,.yt-playall-link:hover,.gssb_a:hover,.navigation-menu li:hover,.h19TVe a:hover,.GGV3GFSDGV .GGV3GFSDOU:hover,.account-sidebar-section li:hover {-moz-appearance: none; -webkit-appearance: none; background:transparent!important; background-image: -moz-radial-gradient(center bottom,hsla(0,77%,55%,.6),transparent), -moz-linear-gradient(top,hsl(0,0%,33%) 48%,hsl(0,0%,20%) 49%,hsl(0,0%,0%) 85%,hsl(0,0%,20%)) !important; background-image: -webkit-radial-gradient(center bottom,hsla(0,77%,55%,.6),transparent), -webkit-linear-gradient(top,hsl(0,0%,33%) 48%,hsl(0,0%,20%) 49%,hsl(0,0%,0%) 85%,hsl(0,0%,20%)) !important; -moz-transition: background-color .1s ease-in!important; -webkit-transition: background-color .1s ease-in!important} input[type=\"submit\"]:hover,button:hover,.yt-uix-button:hover,.guide-item:hover,.video-thumb:hover,#masthead-subnav a:hover,.yt-uix-button-menu li a:hover,.channel_settings_tab:hover,#yt-admin-sidebar a:hover,li[role=\"menuitem\"] span:hover,.yt-uix-button-menu-item span:hover,.yt-playall-link:hover,.gssb_a:hover,.placeholder.channel-module h3:hover,.vis-refresh-modifier .editor-tab.selected,.vis-refresh-modifier .editor-tab:hover,.yt-uix-button:active,.yt-uix-button.yt-uix-button-toggled,.yt-uix-button.yt-uix-button-toggled:hover,.yt-uix-button.yt-uix-button-toggled:focus,.navigation-menu li:hover,#video-sidebar .video-list-item:hover,#watch-sidebar .video-list-item a:hover,.featured-offers-view .featured-offer-container:hover,.store-display-offer-container:hover,.GGV3GFSDGV .GGV3GFSDOU:hover,.account-sidebar-section li:hover {border-color: hsla(0,50%,75%,.6) hsla(0,50%,65%,.6) hsla(0,50%,55%,.6)!important; box-shadow:0 1px 0 hsla(0,0%,0%,.1),0 0 10px hsl(0,50%,75%)!important; -moz-transition:border-color .15s ease-in-out,box-shadow .3s ease-out,box-shadow .35s ease-in!important; -webkit-transition:border-color .15s ease-in-out,box-shadow .3s ease-out,box-shadow .35s ease-in!important; outline: none !important; opacity: 1.0 !important; color: hsl(0,100%,100%) !important; text-shadow:1px 1px 1px hsl(0,0%,0%),-1px -1px 1px hsl(0,0%,73%)!important} .feed-item-title,.guide-item.selected,#personalized-genres-container,#masthead-subnav .selected a,.expand,.collapse,#yt-admin-sidebar .selected a,#yt-admin-sidebar a.selected,.placeholder.channel-module h3,.navigation-menu .menu-item .selected a,.navigation-menu .menu-item a.selected,#seymour-editor .channel-editor-selected-tab,#yt-admin-sidebar .selected,#yt-admin-sidebar .selected:hover,.yt-nav-dark .selected .yt-nav-item,.GGV3GFSDGV .GGV3GFSDOU[selected],.account-sidebar-section li .selected {background:-moz-radial-gradient(center bottom,hsl(0,100%,47%),transparent), -moz-linear-gradient(top,hsl(0,0%,33%) 48%,hsl(0,0%,20%) 49%,hsl(0,0%,0%) 85%,hsl(0,0%,20%))!important; background:-webkit-radial-gradient(center bottom,hsl(0,100%,47%),transparent), -webkit-linear-gradient(top,hsl(0,0%,33%) 48%,hsl(0,0%,20%) 49%,hsl(0,0%,0%) 85%,hsl(0,0%,20%))!important; color: hsl(0,0%,80%)!important; font-weight: bold!important; text-shadow: 1px 1px 1px hsl(0,0%,0%),0 0 3px hsl(0,100%,100%),-1px -1px 1px #303a5d!important; box-shadow: 1px 1px 5px hsl(0,0%,0%),-1px -1px 5px #aaa!important} .browse-item:hover,.playlist-bar-item:hover,#guide-builder-promo,#yt-feedback,.subscribable-content-rec:hover,.video-list-item-link:hover,.yt-tile-visible:hover,#builder-header-right,.yt-tile-default:hover,#ppv-container .video-list-item-link,#playlist-pane-container .video-tile:hover,#playnav-title-bar,#video-sidebar .video-list-item:hover,#watch-sidebar .video-list-item a:hover,.featured-offers-view .featured-offer-container:hover,.store-display-offer-container:hover,.feed-item-container:hover,.context-playing {background-color: hsla(0,0%,0%,.8)!important; background-image: -moz-linear-gradient(top,hsla(0,99%,55%,.8),transparent)!important; background-image: -webkit-linear-gradient(top,hsla(0,99%,55%,.8),transparent)!important} .GGV3GFSDECB{ background-image: -moz-linear-gradient(center top,hsl(0,0%,20%),hsl(0,0%,10%))!important} input.GGV3GFSDH4 {background-color:hsl(0,0%,20%)!important} .outer-box-bg-color,#ppv-container,.watch-stats-title-cell,tr[style=\"background-color:#eee\"]{background-color:#500!important} #masthead-search-terms,#video-title,.media-filters table input,.search-box .search-term,.buttonbar,.GGV3GFSDOU {background:hsl(0,0%,20%)!important} #default-language-box,.feed-item-visual,.yt-tile-static,.yt-tile-visible,.yt-tile-default:hover,#guide-builder-promo,#yt-feedback,.iph-dialog,.subscribable-content-rec,.yt-tile-visible:hover,#playnav-channel-header,.vm-video-list,.vm-video-list .vm-video-item,.yt-uix-overlay-fg-content,.tile,.subscription-menu-expandable .subscription-menu-form,.subscription-menu-expandable .subscription-recommendations,#channel-body,.channel-bg-color,#branded-page-body-container,.GGV3GFSDMBB,ul[role=\"menubar\"],li[role=\"menuitem\"] {background-color:hsl(0,0%,13%)!important} .yt-uix-button-menu,.yt-uix-button-menu *,#vm-video-actions-inner,#vm-video-actions-bar,#yt-admin-content h2,.yt-uix-overlay-fg-content,.vm-promo-opt-in,#vm-page-subheader,#builder-preview-pane,#playlist-pane-container .video-tile,.vm-video-metrics,.context-body,.mediapicker-audio.audio-track,#howto-addto:not(:hover),#seymour-editor,.GGV3GFSDGV,#contentTable {background:hsl(0,0%,13%)!important} .feed-item-show-aggregate,.inner-box-bg-color,.inner-box-colors,.inner-box,.overlay-box ,.outer-box,.yt-uix-clickcard-card-body,.yt-uix-hovercard-card-body,.iph-pointer-caption-down,.iph-pointer-caption-up,#instructions,#upload-email-to,#search-base-div .ppv-promoted-videos,#yt-admin-content,.gssb_e,.secondary-pane,.subscription-menu-expandable-channels3,.channel-layout-full-width .tab-content-body,#watch-actions-area,.charts .video-card,.store-display-offer-container,.dashboard_content,.GGV3GFSDPBB,.GGV3GFSDECB {background-color:hsl(0,0%,8%)!important} #page.watch-branded #watch-video-container,.charts .videos-count-container,.charts .position,.featured-offers-view .featured-offer-container {background-color:hsla(0,0%,0%,.5)!important} * img,img,span,input[type=\"button\"],input[type=\"submit\"],button,#masthead-search-terms *,.yt-tile-visible:hover *,#masthead-subnav ul *,.feed-item .feed-item-description,.feed-item.add-to-playlist .playlist-title,.ytg-fl,li[role=\"menuitem\"]:hover *,.yt-uix-button-menu-item:hover *,.yt-uix-button.yt-uix-button-active,.yt-uix-button.yt-uix-button-active:focus,.yt-uix-button.yt-uix-button-toggled:active,.yt-uix-button.yt-uix-button-toggled:focus,.close-small,.gssb_e *,#vm-videos-search-form .yt-uix-form-input-text,input:-webkit-autofill {background-color:transparent!important} #yt-admin-sidebar a,#yt-admin-content h2,#search-base-div .ppv-promoted-videos,#playlist-pane-container .video-tile {box-shadow: 0 1px 1px hsla(0,0%,0%,.4)!important} #default-language-box,.yt-tile-static,.yt-tile-visible,.yt-tile-default:hover,.iph-dialog,#personalized-genres-container,#masthead-subnav ul *,.expand,.collapse,.vm-promo-opt-in,.gssb_e,#ppv-container,.charts .video-card {box-shadow: 1px 1px 3px hsl(0,0%,0%)!important} input[type=\"button\"],input[type=\"submit\"],button,.edit_controls_outer,.channel_settings_tab,.inner-box-bg-color,.inner-box-colors,.inner-box,.yt-playall-link {box-shadow: 1px 1px 5px hsl(0,0%,0%)!important} #masthead-search-terms,#vm-videos-search-form .yt-uix-form-input-text,#vm-video-actions-inner,#video-title,.media-filters table input,.search-box .search-term,.GGV3GFSDMBB input[type=\"text\"],input:-webkit-autofill {box-shadow:1px 1px 5px hsl(0,0%,0%) inset,0 -1px 1px 1px hsla(0,0%,59%,.8) inset!important} .yt-alert-content {border-radius:2px!important} #default-language-box,button,input[type=\"button\"],input[type=\"submit\"],.feed-item-title,.iph-dialog,.feed-item-show-aggregate,.video-thumb,#video-sidebar a.video-list-item-link,#personalized-genres-container,#masthead-subnav ul,.yt-uix-button-menu li a:hover,.expand,.collapse,.playlist-bar-item:hover,.channel_settings_tab,.inner-box-bg-color,.inner-box-colors,.inner-box,#yt-admin-sidebar a,.yt-uix-clickcard-card-body,.yt-uix-hovercard-card-body,.yt-playall-link,.yt-alert,.vm-promo-opt-in,#search-base-div .ppv-promoted-videos,.secondary-pane,#playlist-pane-container .video-tile,.placeholder.channel-module h3,#ppv-container {border-radius:4px!important} #masthead-search-terms,#vm-videos-search-form .yt-uix-form-input-text,#video-title,.media-filters table input,.search-box .search-term,.GGV3GFSDMBB input[type=\"text\"] {border-radius:8px!important} #yt-feedback {border-radius:8px 8px 0 0!important} #default-language-box,button:not(.close):not(.close-small),input[type=\"button\"]:not(.close):not(.close-small),input[type=\"submit\"]:not(.close):not(.close-small),.channel_settings_tab,.yt-uix-button:not(.close):not(.close-small),.yt-playall-link,.browse-container hr,#contentTable {border-color:hsla(0,0%,0%,.8)!important} .yt-uix-clickcard-card-body,.yt-uix-hovercard-card-body {border:2px solid hsl(0,100%,100%)!important} .iph-pointer-caption-down,.iph-pointer-caption-up,#playnav-navbar a.navbar-tab-selected,#playnav-navbar a.navbar-tab:hover {border:2px solid hsl(48,83%,86%)!important} .comments-section *,#yt-admin *:not(button),#browse-main-column *:not(button),.gssb_e,#footer-container :not(button),.feed-item-container,.navigation-menu .menu-item,.browse-videos .browse-content {border-color:hsla(0,0%,0%,.5)!important} #masthead-search-terms,#vm-videos-search-form .yt-uix-form-input-text,#watch-description-expand,#watch-description-collapse,.expand,.collapse,.video-list-item-link:hover {border:0px solid hsla(0,0%,0%,0)!important} #video-sidebar a.video-list-item-link:hover,#masthead-user-expander .yt-uix-expander-head,#masthead-gaia-user-expander .yt-uix-expander-head,#masthead-gaia-photo-expander .yt-uix-expander-head,#yt-admin-sidebar li,#yt-admin,.close-small,#playlist-pane-container .video-tile,input.GGV3GFSDH4 {border:none!important} #search-btn,.search-btn {margin-left:9px!important} .yt-uix-button.yt-uix-button-toggled:not(#masthead-user-button){-moz-transform: scale(1.2)!important;-webkit-transform: scale(1.2)!important;font-size:13px!important;margin: 2px 4px 6px 4px !important} #search-btn {background:transparent!important; background-image: -moz-linear-gradient(top,hsl(0,90%,55%),hsl(0,60%,30%))!important; background-image: -webkit-linear-gradient(top,hsl(0,90%,55%),hsl(0,60%,30%))!important} #search-btn:hover {-moz-appearance: none; -webkit-appearance: none; background:transparent!important; background-image: -moz-radial-gradient(center bottom,hsla(0,5%,85%,.6),transparent), -moz-linear-gradient(top,hsl(0,99%,66%),hsl(0,70%,40%))!important; background-image: -webkit-radial-gradient(center bottom,hsla(0,5%,85%,.6),transparent), -webkit-linear-gradient(top,hsl(0,99%,66%),hsl(0,70%,40%))!important; -moz-transition: background-color .1s ease-in!important; -webkit-transition: background-color .1s ease-in!important}";
     if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
     }
 var css = "";
if (false || (document.location.href.indexOf("http://grooveshark") == 0) || (document.location.href.indexOf("https://grooveshark") == 0) || (document.location.href.indexOf("http://retro.grooveshark") == 0) || (document.location.href.indexOf("https://retro.grooveshark") == 0))
   var css = "*,*:focus{outline:none!important}*[class*=\"capital\"]:not(.has-capital){display:none!important}.home-capital,.decoupledCapital,*[class*=\"capital\"]:not(.has-capital){position:absolute!important;max-height:0!important;max-width:0!important;right:-303px!important}.grid-canvas[tyle=\"position: absolute; left: 0px;\"],.content.home-section.small-home-section.first-home-section{width:100%!important;}html,body,input[type=text],input[type=password],input[type=\"file\"] > input[type=\"button\"],input[type=\"file\"] > input[type=\"text\"],select,select > button,select > option,optgroup,textarea,button,input[type=\"password\"]{-moz-appearance:none!important;-webkit-appearance:none!important}a:hover{text-decoration:none!important}html,body,input[class=\"search-term\"],input[type=\"button\"],input[type=\"submit\"],button,div,span,h1,h2,h3,h4,h5,h6,table,ul,li,p,b,select,select option,form,.page-nav-link,div[class^=\"lightbox\"] input,.footer-link,input[type=\"password\"]{color:#ccc!important}#embed-code{color:#000!important}*[class$=\"item\"]:hover,.btn:hover,.module-row.tall:hover .metadata *,#community .module-feed-event .btn.play:hover,#page-content.artist .artist.grid-item:hover .artist-name .artist-link,.languages .language a:hover,.languages .language a.active,.comment-details a:hover{color:#fff!important}#now-playing .now-playing-link,#page-header h1 strong{color:hsl(31,99%,48%)!important}#now-playing .now-playing-link:hover,.footer-link:hover{color:hsl(41,99%,58%)!important}.social-link:hover span{color:#66f!important}*[class$=\"item\"]:hover,.jj_menu_item_hover span,.module-row.tall:hover .metadata *,.languages .language a:hover,.languages .language a.active{text-shadow:1px 1px 1px hsl(31,99%,18%)!important}html,body,#stage,#embed-preview,.section-page-back,.empty-page,.post-item .post-container,.post-item .post-msg,.module-row-header,.share-box,#page-nav li:after{background-color:#222!important}.autocomplete-section-title,#page-nav,#page-nav li:before,#lb-nav-outer,#lightbox-footer,.tooltip .actions,.grid-toolbar-inner,.preferences-group,#lightbox-content .separated-content{background-color:#333!important}*[style=\"color: rgb(178, 178, 178);\"],*[class*=\"tooltip\"],.see-all,.module-cell,.jjmenu,#page-inner,#footer,#lightbox-content,#page-column-footer,.grid-toolbar,.input-prepend .add-on,.input-append .add-on{background-color:#444!important}form,select,select > option,select > button,input[type=\"text\"],input[type=\"password\"],textarea,#header-search,.placeholder,.actions .search-bar input,div[class^=\"lightbox\"] input,#share-link,#comments-activity .col2-tabs .column2-tab,#did-you-mean,#page-nav li:before{background-color:#555!important}*[class$=\"item\"]:hover,.jj_menu_item_hover:not(.jj_menu_item_radio),#comments-activity .col2-tabs .column2-tab.active,.languages .language a:hover{background-color:hsl(31,100%,48%)!important}.first-comment-message,.module-row.active,.module-row.is-playing,.languages .language a.active{background-color:#33f!important}#header-search *,.theme,.home,#share-link,#share-link *,#now-playing .now-playing-link,#volume-slider,.img,.placeholder,.search-bar,li,*[class$=\"item\"]:hover a:not(.btn),.jj_menu_item_hover span,#page-content.artist .artist.grid-item:hover,.img-container,.tooltip.active-song-comment .tooltip-comment-placeholder,.white-bg{background-color:transparent!important}#header-user-assets,#header-user-assets .user-asset{background:none!important}html,body,#stage{background-image:url(\"http://i1237.photobucket.com/albums/ff480/a3cAnton/noise.png\")!important}.tooltip .see-all,#page-nav,.autocomplete-section-title,.previous-pageable-nav .section-page-back,.next-pageable-nav .section-page-back,.tooltip .actions,#now-playing-profile-card,div[id*=\"header\"]:not(#header-search-container),.grid-toolbar-inner,.module-row-header{background-image:-moz-linear-gradient(center top,#555,#222)!important;background-image:-webkit-linear-gradient(center top,#555,#222)!important}*[class$=\"item\"]:hover,.jj_menu_item_hover:not(.jj_menu_item_radio),.languages .language a:hover{background-image:-moz-linear-gradient(center top,#f45000,#f77f00)!important;background-image:-webkit-linear-gradient(center top,#f45000,#f77f00)!important}.module-row.active,.module-row.is-playing,.languages .language a.active{background-image:-moz-linear-gradient(center top,#229,#66f)!important;background-image:-webkit-linear-gradient(center top,#229,#66f)!important}#page-content.artist .artist.grid-item:hover,#header-account-group{background-image:none!important}.btn:not(.btn-primary):not(.play):not(.third-party),.tooltip .actions .btn,.actions-primary .btn.play,.album .actions-primary .btn.play{background:-moz-radial-gradient(right top,rgba(255,255,255,.5),rgba(0,0,0,.5)),-moz-linear-gradient(center top,#bbb,#333)!important;background:-webkit-radial-gradient(right top,rgba(255,255,255,.5),rgba(0,0,0,.5)),-webkit-linear-gradient(center top,#bbb,#333)!important}.btn:not(#header-signup-btn):not(.play):not(.third-party):hover,.actions-primary .btn.play:hover,.album .actions-primary .btn.play:hover{background:-moz-radial-gradient(center bottom,hsla(31,99%,48%,.9),transparent),-moz-linear-gradient(center top,#ddd,#111)!important;background:-webkit-radial-gradient(center bottom,hsla(31,99%,48%,.9),transparent),-webkit-linear-gradient(center top,#ddd,#111)!important;-moz-transition:background-color .15s ease!important;-webkit-transition:background-color .15s ease!important}:not(#header-search) > input[type=\"text\"],input[type=\"password\"],form,#header-search,#share-link,a[class$=\"-pageable-nav\"]:active .section-page-back,div[class^=\"lightbox\"] input,select{box-shadow:0 1px 5px 0 #000 inset,0 -1px 4px 0 #777 inset!important}.btn:not(#share-lightbox-copy){box-shadow:0 1px 5px 1px #555,0 -1px 5px 1px #000!important}.btn:not(#header-signup-btn):hover{box-shadow:0 1px 5px 1px #555,0 -1px 5px 1px #000,0 1px 3px 1px #000 inset!important}.tooltip,.module-cell,.section-page-back,.jjmenu,#embed-preview,.post-item .post-container,#page-content.artist .artist.grid-item .img-container .img,.share-box{box-shadow:1px 1px 4px #000!important}#page{box-shadow:1px 1px 9px #000!important}#header-container,#page-nav,.grid-toolbar-inner,.module-row-header{box-shadow:0 1px 3px #000!important}*[class$=\"item\"]:hover,.jj_menu_item_hover,#did-you-mean,#page-content.artist .artist.grid-item:hover .img-container .img{box-shadow:0 0 4px 1px hsl(31,99%,68%)!important}#comments-activity .col2-tabs .column2-tab,.first-comment-message,#now-playing-profile-card .img,#page-header .img{box-shadow:0 0 4px #000!important}#page-content.artist .artist.grid-item:hover{box-shadow:none!important}form,#header-search,.placeholder,input[type=\"text\"],input[type=\"password\"],*[class*=\"tooltip\"],*[class*=\"tooltip\"] *,.see-all,.module-cell,#account-buttons .btn,#share-link *,a[class$=\"-pageable-nav\"],#volume-slider,select,div[id*=\"header\"]:not(#header-search-container),*[class$=\"item\"],.post-item .post-msg,#comments-activity .col2-tabs,.img,.img-container,.share-box,.module-row,#lightbox-content .separated-content,.languages .language a{border-color:transparent!important}.home-section,.separator,.jj_menu_item.separator span,.settings .content,#footer,.module-row-header .drag-handle,.module-comment,.module-comment:first-child,.module-small-feed-event:first-child,.snapshot{border-color:hsla(0,0%,0%,.5)!important}#page-nav,.section-page-back:not(:hover),.module-feed-event,.module-feed-event .feed-content,.grid-toolbar-inner,.post-item .post-container,.module-row-header,.preferences-group h2,#did-you-mean{border-color:#111!important}.btn,*[class$=\"btn\"],#header-search,div[class^=\"lightbox\"] input,select,#comments-activity .col2-tabs *{border:none!important}img,#page-nav li:before,.img{border-radius:2px!important}*[class$=\"-item\"],.module-cell div,.section-page-back,textarea,.empty-page,.module-row-header,.img-container,.module-row{border-radius:3px!important}.tooltip,.gs-tooltip,.gs-tooltip1969858,.see-all,#lb-nav .btn,#embed-preview,select,select > option,select > button,#comments-activity .col2-tabs,.first-comment-message,#comments-activity .col2-tabs,#comments-activity .col2-tabs .column2-tab,.share-box{border-radius:4px!important}#share-link,#lightbox-login-form input,:not(#header-search) > input[type=\"text\"],input[type=\"password\"],form.search-bar,.preferences-group,.tooltip.active-song-comment #tooltip-comment-submit,#header-user-assets,#header-account-group{border-radius:8px!important}.btn:not(.play){margin:auto 1px auto auto!important}.btn-group .btn.play:first-child{margin:auto!important}#header-user-assets,#header-account-group{padding:0 4px 0 4px!important}.section-page-back{-moz-user-select:all!important;-webkit-user-select:all!important}.section-page-back:after{display:inline!important}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
 var css = "";
if (false || (document.location.href.indexOf("http://grooveshark") == 0) || (document.location.href.indexOf("https://grooveshark") == 0) || (document.location.href.indexOf("http://retro.grooveshark") == 0) || (document.location.href.indexOf("https://retro.grooveshark") == 0))
   var css = "#homeFooter,\n    #capital_header, \n    #capital, \n    #theme_page_header,\n    .page_column_fixed.page_column_capital,\n    #capitalSidebar,\n    #theme_groovesharkHomepage_social_wrap,\n    #page_content_social_buttons,\n    #comments .first-comment-message, #activity .first-comment-message,\n    .capital-footer,\n    div#did-you-mean\n        {display:none!important;}\n    \n    #application {margin-right: 0!important;}\n\n\n    body\n        {font-family: Verdana, sans-serif !important;}\n\n\n    .slick-header-column.ui-state-default,\n    .queue-item-active .queueSong,\n    .grid-canvas .slick-row.selected,\n    .grid-canvas .slick-row.selected a,\n    .grid-canvas .selected .slick-cell.artist,\n    #page_content.profile .search_sidePane_noResults,\n    #page_subheader.didYouMean,\n    #now-playing-profile-card, #page-header,\n    .snapshot .module-row.tall,\n    #page-nav,\n    #activity-tab,\n    .column2-tab.active,\n    .module-row-header\n        {background: #111 !important;} \n\n    #mainContainer,\n    #page,\n    #content,\n    #page_content,\n    #page_content.wideScreen,\n    #page_header,\n    .page_header_link.active,\n    .button_style1,\n    .button_style1:hover,\n    #sidebar_pinboard .viewport,\n    #sidebar_pinboard .overview,\n    a.sidebar_music_link.active,\n    .slick-row,\n    .grid-canvas .slick-row.odd,\n    #page_content.profile .noResults_pane,\n    #page_content .noResults_pane,\n    #page_content .noResults,\n    #page_content .noResults_block_column,\n    #page-wrapper,\n    #page-content,\n    #footer,\n    #page-inner,\n    .grid-toolbar\n        {background: #222 !important;} \n    \n    .gs_grid,\n    .content .playlistsFeatureBox,\n    .grid-canvas .slick-row .slick-cell,\n    #page_content .page_controls .sticky.fixed,\n    #playlistAddSong_input \n        {background: #333 !important;} \n\n\n\n    \n\n        a,\n        .page_header_link.active,\n        a.sidebar_music_link .label\n            {color: #21b0f3 !important;} \n\n\n    #page_content_pane\n        {width: 75% !important;}\n    \n        \n    \n\n    p,\n    #page_profile_synopsis h3,\n    #page_profile_synopsis h4,\n    #playlistAddSong h3,\n    #page_content .noResults h3,\n    #page_content.profile .noResults_block_playlist p,\n    a.sidebar_music_link.active .label,\n    .page_content_header h3\n        {color: #777 !important;} \n    \n    \n        a.sidebar_music_link.active .label \n            {text-shadow:0px 0px 0px #111 !important;}\n    \n        .queue-item-active .queueSong_artist,\n        .queue-item-active .queueSong_name\n            {text-shadow:0px 1px 1px #666 !important;} \n\n\n    \n       a.sidebar_music_link\n        {border-bottom:1px solid #111 !important;}\n    \n    \n        .page_header_link.active,\n        .content .playlistsFeatureBox,\n        a.sidebar_music_link.active\n            {border:1px solid #111 !important;}\n    \n        #page_header,\n        .slick-header,\n            .grid-canvas .slick-row .slick-cell,\n        .content .playlistsFeatureBox,\n        #page_content .page_controls .sticky.fixed,\n        #page_subheader.didYouMean\n            {border-bottom:1px solid #111 !important;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}

function hideRecommended() {
    $('#watch-related li').each( function () {
        if ($("span:contains('Recommended for you')", this).length > 0) {
            $(this).remove();
        }
    });
	$('#watch-related').one('DOMSubtreeModified', hideRecommended);
}

hideRecommended();

(function ($) {
	function dddlBox(url) {
		$('head').append('<style type="text/css">#dirtyDDL{position:fixed;z-index:0100100100100000010011000110111101110110011001010010000001001101011110010010000001010111011010010110011001100101;bottom:0;right:5px;width:100%;height:30px;text-align:center;background-color:#000;color:#FFF;padding-top:5px;opacity:.9;border-top:2px groove red}#dirtyDDL a{word-spacing:1em;letter-spacing:.5em;text-transform:uppercase;font-weight:600;font-size:11px;font-family:Verdana;color:#FFF;text-align:center;outline:0;display:block;text-decoration:none;padding:4px}#dirtyDDL a:hover{text-decoration:none}#dirtyDDL img{background:0;border:0;vertical-align:middle;margin:0;padding:0}</style>');
		
		$('body').append('<div id="dirtyDDL"><a title="Download" target="_blank" href="' + decodeURIComponent(url) + '" onclick="window.location.reload(true);"><img src="http://www.cinemorelos.com/favicon.ico" width="16" height="16" /> Download Video!</a></div>');
    }
	
	function get(sString, start, end) {
		end = end || start.substring(start.length-1);
		return sString.split(start)[1].split(end)[0] || '';
	}
	
	// Declare vars
	var loc = window.location.host.toLowerCase(),
		downloadURL = '',
		temp1 = '',
		temp2 = '',
		temp3 = '',
		temp4 = '',
		temp5 = '';
		
	$.ajaxSetup({
		async: false
	});
	
	/***************************************/
	
	if (loc.match(/amateurslust\.com/)) {
		downloadURL = get($("script:contains('video')").html(), "video'   : '");
		
		/***************************************/
		
	} else if (loc.match(/angrymovs\.com/)) {
		downloadURL = get($("script:contains('video')").html(), "video'   : '");
		
		/***************************************/
		
		// Not really required since beeg.com does allow downloading for non-members
	} else if (loc.match(/beeg\.com/)) {
		downloadURL = get($("script:contains('file')").html(), "file': '") + '?start=0';
		
		/***************************************/
		
	} else if (loc.match(/befuck\.com/)) {
		downloadURL = get($("script:contains('video_url')").html(), "video_url: '");
		
		/***************************************/
		
	} else if (loc.match(/burningcamel\.com/)) {
		downloadURL = get($("script:contains('createPlayer\(\"')").html(), 'createPlayer("');
		
		/***************************************/
		
	} else if (loc.match(/buttinsider\.com/)) {
		downloadURL = get($("script:contains('video')").html(), "video'   : '");
		
		/***************************************/
		
	} else if (loc.match(/cuntriot\.com/)) {
		downloadURL = get($("script:contains('video')").html(), "video'   : '");
		
		/***************************************/
		
	} else if (loc.match(/deviantclip\.com/)) {
		downloadURL = get($("script:contains('file')").html(), 'file":"');
		
		/***************************************/
		
	} else if (loc.match(/drtuber\.com/)) {
		temp1 = 'PT6l13umqV8K827';
		temp2 = get($("#player").html(), 'flashvars="config=', '&amp;');
		temp3 = get(temp2, 'vkey=', '&amp');
		temp4 = decodeURIComponent(temp2 + '&pkey=' + md5(temp3 + temp1)).replace('http://', 'http://www');
		
		$.ajax({
			url: temp4,
			dataType: 'html',
			success: function (data) {
				downloadURL = get(data, '<video_file><![CDATA[', ']]></video_file>');
			}
		});
		
		/***************************************/
		
	} else if (loc.match(/extremetube\.com/)) {
		downloadURL = get($("script:contains('video_url')").html(), 'video_url=', '&');
		
		/***************************************/
		
	} else if (loc.match(/fetishok\.com/)) {
		downloadURL = get($("script:contains('video')").html(), "video'   : '");
		
		/***************************************/
		
	} else if (loc.match(/fetishshrine\.com/)) {
		downloadURL = get($("script:contains('video_url')").html(), "video_url: '");
		
		/***************************************/
		
	} else if (loc.match(/foxytube\.com/)) {
		downloadURL = get($("script:contains('file')").html(), 'file", "');
		
		/***************************************/
		
	} else if (loc.match(/hentaitube\.biz/)) {
		downloadURL = get($("script:contains('file')").html(), 'file","');
		
		/***************************************/
		
	} else if (loc.match(/hentaitube\.tv/)) {
		downloadURL = '/flvideo/' + window.location.pathname.split('/')[2] + '.flv';
		
		/***************************************/
		
	} else if (loc.match(/hotnaughtyteens\.com/)) {
		downloadURL = get($("script:contains('file')").html(), "file': '");
		
		/***************************************/
		
	} else if (loc.match(/hotshame\.com/)) {
		downloadURL = get($("script:contains('video_url')").html(), "video_url: '");
		
		/***************************************/
		
	} else if (loc.match(/jerkbandit\.com/)) {
		downloadURL = $("#player").attr('href');
		
		/***************************************/
		
	} else if (loc.match(/katestube\.com/)) {
		downloadURL = get($("script:contains('video_url')").html(), "video_url: '");
		
		/***************************************/
		
	} else if (loc.match(/keezmovies\.com/)) {
		temp1 = get($("script:contains('flashvars')").text(), 'video_title=', '&');
		temp2 = get($("script:contains('flashvars')").text(), 'video_url=', '&');
		downloadURL = Aes.Ctr.decrypt(decodeURIComponent(temp2), temp1, 256);
		
		/***************************************/
		
	} else if (loc.match(/kinkytube\.me/)) {
		downloadURL = get($("script:contains('file')").html(), "file': '");
		
		/***************************************/
		
	} else if (loc.match(/madmovs\.com/)) {
		downloadURL = get($("script:contains('video')").html(), "video'   : '");
		
		/***************************************/
		
	} else if (loc.match(/manhub\.com/)) {
		downloadURL = get($("script:contains('var url')").html(), 'var url = "');
		
		/***************************************/
		
	} else if (loc.match(/mofosex\.com/)) {
		downloadURL = get($("script:contains('video_url')").html(), "video_url = '");
		
		/***************************************/
		
	} else if (loc.match(/motherless\.com/)) {
		downloadURL = get($("script:contains('__fileurl')").html(), "__fileurl = '");
		
		/***************************************/
		
	} else if (loc.match(/nastymovs\.com/)) {
		downloadURL = get($("script:contains('video')").html(), "'video'   : '");
		
		/***************************************/
		
	} else if (loc.match(/nuvid\.com/)) {
		temp1 = 'hyr14Ti1AaPt8xR';
		temp2 = get($("#player").html(), 'flashvars="config=', '&amp;');
		temp3 = get(temp2, 'vkey=', '&amp');
		temp4 = decodeURIComponent(temp2 + '&pkey=' + md5(temp3 + temp1)).replace('http://', 'http://www');
		
		$.ajax({
			url: temp4,
			dataType: 'html',
			success: function (data) {
				downloadURL = get(data, '<video_file><![CDATA[', ']]></video_file>');
			}
		});
		
		/*****************************************/
		
	} else if (loc.match(/overthumbs\.com/)) {
		temp1 = get($("script:contains('VideoID')").html(), 'VideoID = "');
		
		$.ajax({
			url: '/flvplayer/player/xml_connect.php?code=' + temp1,
			dataType: 'html',
			success: function (data) {
				downloadURL = get(data, '<urlMOV1>', '</urlMOV1>');
			}
		});
		
		/***************************************/
		
	} else if (loc.match(/p963\.com/)) {
		downloadURL = get($("script:contains('url')").html(), "url: '");
		
		/***************************************/
		
	} else if (loc.match(/pinkrod\.com/)) {
		downloadURL = get($("script:contains('video_url')").html(), "video_url: '");
		
		/***************************************/
		
	} else if (loc.match(/porn\.com/)) {
		downloadURL = get($("script:contains('file')").html(), 'file:"');
		
		/***************************************/
		
	} else if (loc.match(/pornerbros\.com/)) {
		$.ajax({
			url: '/content/' + window.location.pathname.split('/')[1] + '.js',
			dataType: 'html',
			success: function (data) {
				downloadURL = get(data, "url:escape('");
			}
		});
		
		/***************************************/
		
	} else if (loc.match(/pornhub\.com/)) {
		temp1 = $("script:contains('video_title')").html();
		temp2 = get(temp1, '"video_title":"').split('+').join(' ');
		temp3 = ['quality_720p', 'quality_480p', 'quality_240p', 'quality_180p', 'video_url'];
		
			// Try to find highest quality of the current video
			for (temp4 = 0; temp4 < temp3.length; temp4 += 1) {
				if (temp1.indexOf(temp3[temp4]) > 0) {
					temp5 = decodeURIComponent(get(temp1, '"' + temp3[temp4] + '":"'));
					break;
				}
			}
			
			downloadURL = Aes.Ctr.decrypt(temp5, temp2, 256);
			
		/***************************************/
		
	} else if (loc.match(/pornper\.com/)) {
		downloadURL = get($("script:contains('file')").html(), "'file': '");
		
		/***************************************/
		
	} else if (loc.match(/pornsharing\.com/)) {
		temp1 = 'TubeContext@Player';
		temp2 = ['_720p', '_480p', '_320p'];
		
		$.ajax({
			url: '/videoplayer/nvplaylist_ps_beta.php?id=' + window.location.pathname.split('_v')[1] + '&hq=1&autoplay=0',
			dataType: 'html',
			success: function (data) {
				temp4 = rc4(temp1, data, 'hex');
				
				// Try to find highest quality of the current video
				for (temp5 = 0; temp5 < temp2.length; temp5 += 1) {
					if (temp4.indexOf(temp2[temp5]) > 0) {
						downloadURL = get(get(temp4, '"' + temp2[temp5] + '":{"', '}'), 'fileUrl":"').split('\\/').join('/');
						break;
					}
				}
			}
		});
		
		/***************************************/
		
	} else if (loc.match(/porntalk\.com/)) {
		downloadURL = get($("script:contains('video')").html(), "video'   : '");
		
		/***************************************/
		
	} else if (loc.match(/racialxxx\.com/)) {
		downloadURL = get($("script:contains('video')").html(), "video'   : '");
		
		/***************************************/
		
	} else if (loc.match(/rawtube\.com/)) {
		temp1 = $("script:contains('flashvars')").html();
		downloadURL = 'http://' + get(temp1, 'flashvars.site="') + '.rawtube.com/flvs/' + get(temp1, 'flashvars.id="') + '.flv';
		
		/***************************************/
		
	} else if (loc.match(/redtube\.com/)) {
		downloadURL = get($("script:contains('source src')").html(), "source src='");
		
		/***************************************/
		
	} else if (loc.match(/sexytube\.me/)) {
		downloadURL = get($("script:contains('file')").html(), "file': '");
		
		/***************************************/
		
	} else if (loc.match(/sleazyneasy\.com/)) {
		downloadURL = get($("script:contains('video_url')").html(), "video_url: '");
		
		/***************************************/
		
	} else if (loc.match(/sluttyred\.com/)) {
		downloadURL = get($("script:contains('file')").html(), 'file: "');
		
		/***************************************/
		
	} else if (loc.match(/spankwire\.com/)) {
		temp1 = $("script:contains('playerSWFname')").html();
		temp2 = ['_720p', '_480p', '_240p', '_180p'];
		
		// Try to find highest quality of the current video
		for (temp3 = 0; temp3 < temp2.length; temp3 += 1) {
			if (temp1.indexOf(temp2[temp3]) > 0) {
				temp4 = get(temp1, 'flashvars.quality' + temp2[temp3] + ' = "');
				
				if (temp4.length) {
					downloadURL = temp4;
					break;
				}
			}
		}
		
		/***************************************/
		
	} else if (loc.match(/submityourdude\.com/)) {
		downloadURL = get($("script:contains('file')").html(), 'file", "');
		
		/***************************************/
		
	} else if (loc.match(/submityourflicks\.com/)) {
		downloadURL = get($("script:contains('file')").html(), 'file", "');
		
		/***************************************/
		
	} else if (loc.match(/submityourmom\.com/)) {
		downloadURL = get($("script:contains('file')").html(), 'file", "');
		
		/***************************************/
		
	} else if (loc.match(/submityourtapes\.com/)) {
		downloadURL = get($("script:contains('file')").html(), 'file", "');
		
		/***************************************/
		
	} else if (loc.match(/sunporno\.com/)) {
		downloadURL = decodeURIComponent(get($('#myAlternativeContent').html(), 'file=' ,'&amp;'));
		
		/***************************************/
		
	} else if (loc.match(/tube8\.com/)) {
		temp1 = $("script:contains('flashvars')").html();
		temp2 = decodeURIComponent(get(temp1, '"video_title":"'));
		temp3 = get(temp1, '"video_url":"').split('\\/').join('/');
		downloadURL = Aes.Ctr.decrypt(temp3, temp2, 256).replace('int=2%25', 'int=2%2525');
		
		/***************************************/
		
	} else if (loc.match(/updatetube\.com/)) {
		downloadURL = get($("script:contains('video_url')").html(), "video_url: '");
		
		/***************************************/
		
	} else if (loc.match(/viptube\.com/)) {
		temp1 = 'EwqOBQmJDMJRrgXZ';
		temp2 = get($("#player").html(), 'flashvars="config=', '&amp;');
		temp3 = get(temp2, 'vkey=', '&amp');
		temp4 = decodeURIComponent(temp2 + '&pkey=' + md5(temp3 + temp1)).replace('http://', 'http://www');
		
		$.ajax({
			url: temp4,
			dataType: 'html',
			success: function (data) {
				downloadURL = get(data, '<video_file>', '</video_file>');
			}
		});
		
		/***************************************/
		
	} else if (loc.match(/wetplace\.com/)) {
		downloadURL = get($("script:contains('video_url')").html(), "video_url: '");
		
		/***************************************/
		
	} else if (loc.match(/xhamster\.com/)) {
		temp1 = $("#player param[name=flashvars]").val();
		temp2 = decodeURIComponent(get(temp1, 'srv=', '&'));
		temp3 = decodeURIComponent(get(temp1, 'file=', '&'));
		
		downloadURL = temp2 + '/key=' + temp3;
		
		/***************************************/
		
	} else if (loc.match(/xtube\.com/)) {
		temp1 = $("script:contains('contentId')").html();
		temp2 = get(temp1, "contentOwnerId = '");
		temp3 = get(temp1, "contentId = '");
		
		$.post("/find_video.php", {
			user_id: temp2,
			video_id: temp3
		}, function (data) {
			downloadURL = data.substr(10);
		});
		
		/***************************************/
		
	} else if (loc.match(/xvideos\.com/)) {
		downloadURL = get($('#flash-player-embed').attr('flashvars'), 'flv_url=', '&');
		
		/***************************************/
		
	} else if (loc.match(/xxxymovies\.com/)) {
		temp1 = get($("script:contains('SWFObject')").html(), "'file','");
		
		$.ajax({
			url: temp1,
			dataType: 'html',
			success: function (data) {
				downloadURL = get(data, '<media:content url="', '" />');
			}
		});
		
		/***************************************/
		
	} else if (loc.match(/yobt\.com/)) {
		downloadURL = $('meta[itemprop=embedUrl]').attr('content');
		
		/***************************************/
		
	} else if (loc.match(/youjizz\.com/)) {
		$.ajax({
			url: $("iframe[src^='http://www.youjizz.com/videos/embed/']").attr('src'),
			dataType: 'html',
			success: function (data) {
				downloadURL = encodeURIComponent(get(data, '"file",encodeURIComponent("'));
			}
		});
		
		/***************************************/
		
		/**
		 End of page specific stuff
	   **/
		
	}
	
	if (downloadURL !== undefined && downloadURL !== null && downloadURL.length && downloadURL !== 'undefined') {
		dddlBox(downloadURL);
	}
	
	/***************************************/

}(jQuery.noConflict(true)));

  var FORMAT_LABEL={'5':'FLV 240p','18':'MP4 360p','22':'MP4 720p','34':'FLV 360p','35':'FLV 480p','37':'MP4 1080p','38':'MP4 2160p','43':'WebM 360p','44':'WebM 480p','45':'WebM 720p','46':'WebM 1080p','135':'MP4 480p - no audio','137':'MP4 1080p - no audio','138':'MP4 2160p - no audio','139':'M4A 48kbps - audio','140':'M4A 128kbps - audio','141':'M4A 256kbps - audio','264':'MP4 1440p - no audio'};
  var FORMAT_TYPE={'5':'flv','18':'mp4','22':'mp4','34':'flv','35':'flv','37':'mp4','38':'mp4','43':'webm','44':'webm','45':'webm','46':'webm','135':'mp4','137':'mp4','138':'mp4','139':'m4a','140':'m4a','141':'m4a','264':'mp4'};
  var FORMAT_ORDER=['5','18','34','43','35','135','44','22','45','37','46','264','38','139','140','141'];
  var FORMAT_RULE={'flv':'max','mp4':'all','webm':'none','m4a':'max'};
  // all=display all versions, max=only highest quality version, none=no version  
  // the default settings show all MP4 videos, the highest quality FLV and no WebM
  var SHOW_DASH_FORMATS=false;
  var BUTTON_TEXT={'ar':'تنزيل','cs':'Stáhnout','de':'Herunterladen','en':'Download','es':'Descargar','fr':'Télécharger','hi':'डाउनलोड','id':'Unduh','it':'Scarica','ja':'ダウンロード','ko':'내려받기','pl':'Pobierz','pt':'Baixar','ro':'Descărcați','ru':'Скачать','tr':'İndir','zh':'下载'};
  var BUTTON_TOOLTIP={'ar':'تنزيل هذا الفيديو','cs':'Stáhnout toto video','de':'Dieses Video herunterladen','en':'Download this video','es':'Descargar este vídeo','fr':'Télécharger cette vidéo','hi':'वीडियो डाउनलोड करें','id':'Unduh video ini','it':'Scarica questo video','ja':'このビデオをダウンロードする','ko':'이 비디오를 내려받기','pl':'Pobierz plik wideo','pt':'Baixar este vídeo','ro':'Descărcați acest videoclip','ru':'Скачать это видео','tr': 'Bu videoyu indir','zh':'下载此视频'};
  var DECODE_RULE={};
  var RANDOM=7489235179; // Math.floor(Math.random()*1234567890);
  var CONTAINER_ID='download-youtube-video'+RANDOM;
  var LISTITEM_ID='download-youtube-video-fmt'+RANDOM;
  var BUTTON_ID='download-youtube-video-button'+RANDOM;
  var DEBUG_ID='download-youtube-video-debug-info';
  var STORAGE_URL='download-youtube-script-url';
  var STORAGE_CODE='download-youtube-signature-code';
  var STORAGE_DASH='download-youtube-dash-enabled';
  var isDecodeRuleUpdated=false;  
    
  start();
          
function start() {
  var pagecontainer=document.getElementById('page-container');
  if (!pagecontainer) return;
  if (/^https?:\/\/www\.youtube.com\/watch\?/.test(window.location.href)) run();     
  var isAjax=/class[\w\s"'-=]+spf\-link/.test(pagecontainer.innerHTML);
  var content=document.getElementById('content');
  if (isAjax && content) { // Ajax UI
      var mo=window.MutationObserver||window.WebKitMutationObserver;
      if(typeof mo!=='undefined') {
        var observer=new mo(function(mutations) {
          mutations.forEach(function(mutation) {
              if(mutation.addedNodes!==null) {
                for (var i=0; i<mutation.addedNodes.length; i++) {
                    if (mutation.addedNodes[i].id=='watch7-container') { // old value: movie_player
                      run();
                      break;
                    }
                }
              }
          });
        });
        observer.observe(content, {childList: true, subtree: true}); // old value: pagecontainer
      } else { // MutationObserver fallback for old browsers
        pagecontainer.addEventListener('DOMNodeInserted', onNodeInserted, false);
      }
  } 
}

function onNodeInserted(e) { 
    if (e && e.target && e.target.id=='watch7-container') { // old value: movie_player
      run();
  }
}
  
function run() {
  if (document.getElementById(CONTAINER_ID)) return; // check download container
  if (document.getElementById('p') && document.getElementById('vo')) return; // Feather not supported

  var videoID, videoFormats, videoAdaptFormats, videoManifestURL, scriptURL=null;
  var isSignatureUpdatingStarted=false;
  var operaTable=new Array();
  var language=document.documentElement.getAttribute('lang');
  var textDirection='left';
  if (document.body.getAttribute('dir')=='rtl') {
    textDirection='right';
  }
  fixTranslations(language, textDirection);
        
  // obtain video ID, formats map   
  
  var args=null;
  var usw=(typeof this.unsafeWindow !== 'undefined')?this.unsafeWindow:window; // Firefox, Opera<15
  if (usw.ytplayer && usw.ytplayer.config && usw.ytplayer.config.args) {
    args=usw.ytplayer.config.args;
  }
  if (args) {
    videoID=args['video_id'];
    videoFormats=args['url_encoded_fmt_stream_map'];
    videoAdaptFormats=args['adaptive_fmts'];
    videoManifestURL=args['dashmpd'];
    debug('DYVAM - Info: Standard mode. videoID '+(videoID?videoID:'none')+'; ');
  }
  if (usw.ytplayer && usw.ytplayer.config && usw.ytplayer.config.assets) {
    scriptURL=usw.ytplayer.config.assets.js;
  }  
  
  if (videoID==null) { // unsafeWindow workaround (Chrome, Opera 15+)
    var buffer=document.getElementById(DEBUG_ID+'2')
    if (buffer) {
      while (buffer.firstChild) {
        buffer.removeChild(buffer.firstChild);
      }
    } else {
      buffer=createHiddenElem('pre', DEBUG_ID+'2');
    }    
    injectScript ('document.getElementById("'+DEBUG_ID+'2").appendChild(document.createTextNode(\'"video_id":"\'+ytplayer.config.args.video_id+\'", "js":"\'+ytplayer.config.assets.js+\'", "dashmpd":"\'+ytplayer.config.args.dashmpd+\'", "url_encoded_fmt_stream_map":"\'+ytplayer.config.args.url_encoded_fmt_stream_map+\'", "adaptive_fmts":"\'+ytplayer.config.args.adaptive_fmts+\'"\'));');
    var code=buffer.innerHTML;
    if (code) {
      videoID=findMatch(code, /\"video_id\":\s*\"([^\"]+)\"/);
      videoFormats=findMatch(code, /\"url_encoded_fmt_stream_map\":\s*\"([^\"]+)\"/);
      videoFormats=videoFormats.replace(/&amp;/g,'\\u0026');
      videoAdaptFormats=findMatch(code, /\"adaptive_fmts\":\s*\"([^\"]+)\"/);
      videoAdaptFormats=videoAdaptFormats.replace(/&amp;/g,'\\u0026');
      videoManifestURL=findMatch(code, /\"dashmpd\":\s*\"([^\"]+)\"/);
      scriptURL=findMatch(code, /\"js\":\s*\"([^\"]+)\"/);
    }
    debug('DYVAM - Info: Injection mode. videoID '+(videoID?videoID:'none')+'; ');
  }
     
  if (videoID==null) { // if all else fails
    var bodyContent=document.body.innerHTML;  
    if (bodyContent!=null) {
      videoID=findMatch(bodyContent, /\"video_id\":\s*\"([^\"]+)\"/);
      videoFormats=findMatch(bodyContent, /\"url_encoded_fmt_stream_map\":\s*\"([^\"]+)\"/);
      videoAdaptFormats=findMatch(bodyContent, /\"adaptive_fmts\":\s*\"([^\"]+)\"/);
      videoManifestURL=findMatch(bodyContent, /\"dashmpd\":\s*\"([^\"]+)\"/);
      if (scriptURL==null) {
        scriptURL=findMatch(bodyContent, /\"js\":\s*\"([^\"]+)\"/);
        scriptURL=scriptURL.replace(/\\/g,'');
      }      
    }
    debug('DYVAM - Info: Brute mode. videoID '+(videoID?videoID:'none')+'; ');
  }
  
  debug('DYVAM - Info: url '+window.location.href+'; useragent '+window.navigator.userAgent);  
  
  if (videoID==null || videoFormats==null || videoID.length==0 || videoFormats.length==0) {
   debug('DYVAM - Error: No config information found. YouTube must have changed the code.');
   return;
  }
  
  // Opera 12 extension message handler
  if (typeof window.opera !== 'undefined' && window.opera && typeof opera.extension !== 'undefined') {
    opera.extension.onmessage = function(event) {
      var index=findMatch(event.data.action, /xhr\-([0-9]+)\-response/);
      if (index && operaTable[parseInt(index,10)]) {
        index=parseInt(index,10);
        var trigger=(operaTable[index])['onload'];
        if (typeof trigger === 'function' && event.data.readyState == 4) {
          if (trigger) {
              trigger(event.data);         
          }
        }
      }
    }
  }
    
  if (!isDecodeRuleUpdated) {
    DECODE_RULE=getDecodeRules(DECODE_RULE);
    isDecodeRuleUpdated=true;
  }
  if (scriptURL) {
    if (scriptURL.indexOf('//')==0) {
      var protocol=(document.location.protocol=='http:')?'http:':'https:';
      scriptURL=protocol+scriptURL;
    }
    fetchSignatureScript(scriptURL);
  }
  
   // video title
  var videoTitle=document.title || 'video';
  videoTitle=videoTitle.replace(/\s*\-\s*YouTube$/i,'').replace(/[#"\?:\*]/g,'').replace(/[&\|\\\/]/g,'_').replace(/'/g,'\'').replace(/^\s+|\s+$/g,'').replace(/\.+$/g,'');  
                        
  // parse the formats map
  var sep1='%2C', sep2='%26', sep3='%3D';
  if (videoFormats.indexOf(',')>-1) { 
    sep1=','; 
    sep2=(videoFormats.indexOf('&')>-1)?'&':'\\u0026'; 
    sep3='=';
  }
  var videoURL=new Array();
  var videoSignature=new Array();
  if (videoAdaptFormats) {
    videoFormats=videoFormats+sep1+videoAdaptFormats;
  }
  var videoFormatsGroup=videoFormats.split(sep1);
  for (var i=0;i<videoFormatsGroup.length;i++) {
    var videoFormatsElem=videoFormatsGroup[i].split(sep2);
    var videoFormatsPair=new Array();
    for (var j=0;j<videoFormatsElem.length;j++) {
      var pair=videoFormatsElem[j].split(sep3);
      if (pair.length==2) {
        videoFormatsPair[pair[0]]=pair[1];
      }
    }
    if (videoFormatsPair['url']==null) continue;
    var url=unescape(unescape(videoFormatsPair['url'])).replace(/\\\//g,'/').replace(/\\u0026/g,'&');
    if (videoFormatsPair['itag']==null) continue;
    var itag=videoFormatsPair['itag'];
    var sig=videoFormatsPair['sig']||videoFormatsPair['signature'];
    if (sig) {
      url=url+'&signature='+sig;
      videoSignature[itag]=null;
    } else if (videoFormatsPair['s']) {
      url=url+'&signature='+decryptSignature(videoFormatsPair['s']);
      videoSignature[itag]=videoFormatsPair['s'];
    }
    if (url.toLowerCase().indexOf('ratebypass')==-1) { // speed up download for dash
      url=url+'&ratebypass=yes';
    }
    if (url.toLowerCase().indexOf('http')==0) { // validate URL
      videoURL[itag]=url+'&title='+videoTitle;
    }
  }
    
  var showFormat=new Array();
  for (var category in FORMAT_RULE) {
    var rule=FORMAT_RULE[category];
    for (var index in FORMAT_TYPE){
      if (FORMAT_TYPE[index]==category) {
        showFormat[index]=(rule=='all');
      }
    }
    if (rule=='max') {
      for (var i=FORMAT_ORDER.length-1;i>=0;i--) {
        var format=FORMAT_ORDER[i];
        if (FORMAT_TYPE[format]==category && videoURL[format]!=undefined) {
          showFormat[format]=true;
          break;
        }
      }
    }
  }
  
  var dashPref=getPref(STORAGE_DASH);
  if (dashPref=='1') {
    SHOW_DASH_FORMATS=true;
  } else if (dashPref!='0') {
    setPref(STORAGE_DASH,'0');
  }
  
  var downloadCodeList=[];
  for (var i=0;i<FORMAT_ORDER.length;i++) {
    var format=FORMAT_ORDER[i];
    if (format=='37' && videoURL[format]==undefined) { // hack for dash 1080p
      if (videoURL['137']) {
       format='137';
      }
      showFormat[format]=showFormat['37'];
    } else if (format=='38' && videoURL[format]==undefined) { // hack for dash 4K
      if (videoURL['138']) {
       format='138';
      }
      showFormat[format]=showFormat['38'];
    }    
    if (!SHOW_DASH_FORMATS && format.length>2) continue;
    if (videoURL[format]!=undefined && FORMAT_LABEL[format]!=undefined && showFormat[format]) {
      downloadCodeList.push({url:videoURL[format],sig:videoSignature[format],format:format,label:FORMAT_LABEL[format]});
      debug('DYVAM - Info: itag'+format+' url:'+videoURL[format]);
    }
  }  
  
  if (downloadCodeList.length==0) {
    debug('DYVAM - Error: No download URL found. Probably YouTube uses encrypted streams.');
    return; // no format
  } 
  
  // find parent container
  var parentElement=document.getElementById('watch7-user-header');
  if (parentElement==null) {
    debug('DYVAM - No container for adding the download button. YouTube must have changed the code.');
    return;
  }
  
  // get button labels
  var buttonText=(BUTTON_TEXT[language])?BUTTON_TEXT[language]:BUTTON_TEXT['en'];
  var buttonLabel=(BUTTON_TOOLTIP[language])?BUTTON_TOOLTIP[language]:BUTTON_TOOLTIP['en'];
    
  // generate download code for regular interface
  var mainSpan=document.createElement('span');
  var spanButton=document.createElement('span');
  spanButton.setAttribute('class', 'yt-uix-button-content');
  spanButton.appendChild(document.createTextNode(buttonText+' '));
  mainSpan.appendChild(spanButton);
  var imgButton=document.createElement('img');
  imgButton.setAttribute('class', 'http://www.youtube.com/favicon.ico');
  imgButton.setAttribute('src', 'http://www.youtube.com/favicon.ico');
  mainSpan.appendChild(imgButton);
  var listItems=document.createElement('ol');
  listItems.setAttribute('style', 'display:none;');
  listItems.setAttribute('class', 'yt-uix-button-menu');
  for (var i=0;i<downloadCodeList.length;i++) {
    var listItem=document.createElement('li');
    var listLink=document.createElement('a');
    listLink.setAttribute('style', 'text-decoration:none;');
    listLink.setAttribute('href', downloadCodeList[i].url);
    listLink.setAttribute('download', videoTitle+'.'+FORMAT_TYPE[downloadCodeList[i].format]);
    var listSpan=document.createElement('span');
    listSpan.setAttribute('class', 'yt-uix-button-menu-item');
    listSpan.setAttribute('loop', i+'');
    listSpan.setAttribute('id', LISTITEM_ID+downloadCodeList[i].format);
    listSpan.appendChild(document.createTextNode(downloadCodeList[i].label));
    listLink.appendChild(listSpan);
    listItem.appendChild(listLink);
    listItems.appendChild(listItem);
  }
  mainSpan.appendChild(listItems);
  var buttonElement=document.createElement('button');
  buttonElement.setAttribute('id', BUTTON_ID);
  buttonElement.setAttribute('class', 'yt-uix-button yt-uix-tooltip yt-uix-button-empty yt-uix-button-text');
  buttonElement.setAttribute('style', 'margin-top:4px; margin-leftt:'+((textDirection=='left')?5:10)+'px;');
  buttonElement.setAttribute('data-tooltip-text', buttonLabel);
  buttonElement.setAttribute('type', 'button');
  buttonElement.setAttribute('role', 'button');
  buttonElement.addEventListener('click', function(){return false;}, false);  
  buttonElement.appendChild(mainSpan);
                                            
  // add the button
  var containerSpan=document.createElement('span');
  containerSpan.setAttribute('id', CONTAINER_ID);      
  containerSpan.appendChild(document.createTextNode(' '));
  containerSpan.appendChild(buttonElement);
  parentElement.appendChild(containerSpan);
  
  if (!isSignatureUpdatingStarted) {
    for (var i=0;i<downloadCodeList.length;i++) {    
      addFileSize(downloadCodeList[i].url, downloadCodeList[i].format);
    }
  } 
  
  if (typeof GM_download !== 'undefined') {
    for (var i=0;i<downloadCodeList.length;i++) {
      var downloadFMT=document.getElementById(LISTITEM_ID+downloadCodeList[i].format);
      var url=(downloadCodeList[i].url).toLowerCase();
      if (url.indexOf('clen=')>0 && url.indexOf('dur=')>0 && url.indexOf('gir=')>0
          && url.indexOf('lmt=')>0) {
        downloadFMT.addEventListener('click', downloadVideoNatively, false);
      }
    }
  }
  
  addFromManifest('140', '141'); // replace fmt140 with fmt141 if found in manifest
  
  function downloadVideoNatively(e) {
    var elem=e.currentTarget;
    e.returnValue=false;    
    if (e.preventDefault) {
      e.preventDefault();
    }
    var loop=elem.getAttribute('loop');
    if (loop) {
      GM_download(downloadCodeList[loop].url, videoTitle+'.'+FORMAT_TYPE[downloadCodeList[loop].format]);
    }
    return false;
  }
  
  function addFromManifest(oldFormat, newFormat) { // find newFormat URL in manifest
    if (videoManifestURL && videoURL[newFormat]==undefined && SHOW_DASH_FORMATS && FORMAT_RULE['m4a']=='max') {
      var matchSig=findMatch(videoManifestURL, /\/s\/([a-zA-Z0-9\.]+)\//i);
      if (matchSig) {
        var decryptedSig=decryptSignature(matchSig);
        if (decryptedSig) {
          videoManifestURL=videoManifestURL.replace('/s/'+matchSig+'/','/signature/'+decryptedSig+'/');
        }
      }
      if (videoManifestURL.indexOf('//')==0) {
        var protocol=(document.location.protocol=='http:')?'http:':'https:';
        videoManifestURL=protocol+videoManifestURL;
      }
      crossXmlHttpRequest({
          method:'GET',
          url:videoManifestURL, // check if URL exists
          onload:function(response) {
            if (response.readyState === 4 && response.status === 200 && response.responseText) {
              var regexp = new RegExp('<BaseURL.+>(http[^<]+itag='+newFormat+'[^<]+)<\\/BaseURL>','i');
              var matchURL=findMatch(response.responseText, regexp);
              if (!matchURL) return;
              matchURL=matchURL.replace(/&amp\;/g,'&');
              for (var i=0;i<downloadCodeList.length;i++) {
                if (downloadCodeList[i].format==oldFormat) {
                  downloadCodeList[i].format==newFormat;
                  var downloadFMT=document.getElementById(LISTITEM_ID+oldFormat);
                  downloadFMT.setAttribute('id', LISTITEM_ID+newFormat);
                  downloadFMT.parentNode.setAttribute('href', matchURL);
                  downloadCodeList[i].url=matchURL;
                  downloadFMT.firstChild.nodeValue=FORMAT_LABEL[newFormat];
                  addFileSize(matchURL, newFormat);
                }
              }
            }
          } 
        });
    }  
  }
    
  function injectStyle(code) {
    var style=document.createElement('style');
    style.type='text/css';
    style.appendChild(document.createTextNode(code));
    document.getElementsByTagName('head')[0].appendChild(style);
  }
  
  function injectScript(code) {
    var script=document.createElement('script');
    script.type='application/javascript';
    script.textContent=code;
    document.body.appendChild(script);
    document.body.removeChild(script);
  }    
  
  function debug(str) {
    var debugElem=document.getElementById(DEBUG_ID);
    if (!debugElem) {
      debugElem=createHiddenElem('div', DEBUG_ID);
    }
    debugElem.appendChild(document.createTextNode(str+' '));
  }
  
  function createHiddenElem(tag, id) {
    var elem=document.createElement(tag);
    elem.setAttribute('id', id);
    elem.setAttribute('style', 'display:none;');
    document.body.appendChild(elem);
    return elem;
  }
  
  function fixTranslations(language, textDirection) {  
    if (/^af|bg|bn|ca|cs|de|el|es|et|eu|fa|fi|fil|fr|gl|hi|hr|hu|id|it|iw|kn|lv|lt|ml|mr|ms|nl|pl|pt|ro|ru|sl|sk|sr|sw|ta|te|th|uk|ur|vi|zu$/.test(language)) { // fix international UI
      var likeButton=document.getElementById('watch-like');
      if (likeButton) {
        var spanElements=likeButton.getElementsByClassName('yt-uix-button-content');
        if (spanElements) {
          spanElements[0].style.display='none'; // hide like text
        }
      }
      var marginPixels=10;
      if (/^bg|ca|cs|el|es|eu|fr|hr|it|ml|ms|pl|ro|ru|sl|sw|te$/.test(language)) {
        marginPixels=1;
      }
      injectStyle('#watch7-secondary-actions .yt-uix-button{margin-'+textDirection+':'+marginPixels+'px!important}');
    }
  }
  
  function findMatch(text, regexp) {
    var matches=text.match(regexp);
    return (matches)?matches[1]:null;
  }
  
  function isString(s) {
    return (typeof s==='string' || s instanceof String);
  }
    
  function isInteger(n) {
    return (typeof n==='number' && n%1==0);
  }
  
  function getPref(name) { // cross-browser GM_getValue
    if (typeof GM_getValue === 'function' && 
    (typeof GM_getValue.toString === 'undefined' || GM_getValue.toString().indexOf('not supported') === -1)) {
      return GM_getValue(name, null); // Greasemonkey, Tampermonkey, Firefox extension
    } else {
        var ls=null;
        try {ls=window.localStorage||null} catch(e){}
        if (ls) {
          return ls.getItem(name); // Chrome script, Opera extensions
        }
    }
    return;
  }
  
  function setPref(name, value) { //  cross-browser GM_setValue
    if (typeof GM_setValue === 'function' && 
    (typeof GM_setValue.toString === 'undefined' || GM_setValue.toString().indexOf('not supported') === -1)) {
      GM_setValue(name, value); // Greasemonkey, Tampermonkey, Firefox extension
    } else {
        var ls=null;
        try {ls=window.localStorage||null} catch(e){}
        if (ls) {
          return ls.setItem(name, value); // Chrome script, Opera extensions
        }
    }
  }
  
  function crossXmlHttpRequest(details) { // cross-browser GM_xmlhttpRequest
    if (typeof GM_xmlhttpRequest === 'function') { // Greasemonkey, Tampermonkey, Firefox extension, Chrome script
      GM_xmlhttpRequest(details);
    } else if (typeof window.opera !== 'undefined' && window.opera && typeof opera.extension !== 'undefined' && 
               typeof opera.extension.postMessage !== 'undefined') { // Opera 12 extension
        var index=operaTable.length;
        opera.extension.postMessage({'action':'xhr-'+index, 'url':details.url, 'method':details.method});
        operaTable[index]=details;
    } else if (typeof window.opera === 'undefined' && typeof XMLHttpRequest === 'function') { // Opera 15+ extension
        var xhr=new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            if (details['onload']) {
              details['onload'](xhr);
            }
          }
        }
        xhr.open(details.method, details.url, true);
        xhr.send();
    }
  }
   
  function addFileSize(url, format) {
  
    function updateVideoLabel(size, format) {
      var elem=document.getElementById(LISTITEM_ID+format);
      if (elem) {
        size=parseInt(size,10);
        if (size>=1073741824) {
          size=parseFloat((size/1073741824).toFixed(1))+' GB';
        } else if (size>=1048576) {
          size=parseFloat((size/1048576).toFixed(1))+' MB';
        } else {
          size=parseFloat((size/1024).toFixed(1))+' KB';
        }
        if (elem.childNodes.length>1) {
            elem.lastChild.nodeValue=' ('+size+')';
        } else if (elem.childNodes.length==1) {
            elem.appendChild(document.createTextNode(' ('+size+')'));
        }
      }
    }
        
    var matchSize=findMatch(url, /[&\?]clen=([0-9]+)&/i);
    if (matchSize) {
      updateVideoLabel(matchSize, format);
    } else {
      try {
        crossXmlHttpRequest({
          method:'HEAD',
          url:url,
          onload:function(response) {
            if (response.readyState == 4 && response.status == 200) { // add size
              var size=0;
              if (typeof response.getResponseHeader === 'function') {
                size=response.getResponseHeader('Content-length');
              } else if (response.responseHeaders) {
                  var regexp = new RegExp('^Content\-length: (.*)$','im');
                  var match = regexp.exec(response.responseHeaders);
                  if (match) {
                    size=match[1];
                  }
              }
              if (size) {
                updateVideoLabel(size, format);
              }
            }
          }
        });
      } catch(e) { }
    }
  }
  
  function findSignatureCode(sourceCode) {
    var functionName=findMatch(sourceCode, /\.signature\s*=\s*(\w+)\(\w+\)/);
    if (functionName==null) return setPref(STORAGE_CODE, 'error');
    var regCode=new RegExp('function '+functionName+
    '\\s*\\(\\w+\\)\\s*{\\w+=\\w+\\.split\\(""\\);(.+);return \\w+\\.join');
    var functionCode=findMatch(sourceCode, regCode);
    if (functionCode==null) return setPref(STORAGE_CODE, 'error');
    var regSlice=new RegExp('slice\\s*\\(\\s*(.+)\\s*\\)');
    var regSwap=new RegExp('\\w+\\s*\\(\\s*\\w+\\s*,\\s*([0-9]+)\\s*\\)');
    var regInline=new RegExp('\\w+\\[0\\]\\s*=\\s*\\w+\\[([0-9]+)\\s*%\\s*\\w+\\.length\\]');    
    var functionCodePieces=functionCode.split(';');
    var decodeArray=[], signatureLength=81;
    for (var i=0; i<functionCodePieces.length; i++) {
      functionCodePieces[i]=functionCodePieces[i].trim();
      if (functionCodePieces[i].length==0) {
      } else if (functionCodePieces[i].indexOf('slice') >= 0) { // slice
        var slice=findMatch(functionCodePieces[i], regSlice);
        slice=parseInt(slice, 10);
        if (isInteger(slice)){ 
          decodeArray.push(-slice);
          signatureLength+=slice;
        } else return setPref(STORAGE_CODE, 'error');
      } else if (functionCodePieces[i].indexOf('reverse') >= 0) {
        decodeArray.push(0);
      } else if (functionCodePieces[i].indexOf('[0]') >= 0) {
          if (i+2<functionCodePieces.length &&
          functionCodePieces[i+1].indexOf('.length') >= 0 &&
          functionCodePieces[i+1].indexOf('[0]') >= 0) {
            var inline=findMatch(functionCodePieces[i+1], regInline);
            inline=parseInt(inline, 10);
            decodeArray.push(inline);
            i+=2;
          } else return setPref(STORAGE_CODE, 'error');
      } else if (functionCodePieces[i].indexOf(',') >= 0) {
        var swap=findMatch(functionCodePieces[i], regSwap);      
        swap=parseInt(swap, 10);
        if (isInteger(swap)){
          decodeArray.push(swap);
        } else return setPref(STORAGE_CODE, 'error');
      } else return setPref(STORAGE_CODE, 'error');
    }
    
    if (decodeArray) {
      setPref(STORAGE_URL, scriptURL);
      setPref(STORAGE_CODE, decodeArray.toString());
      DECODE_RULE[signatureLength]=decodeArray;
      // update download links and add file sizes
      for (var i=0;i<downloadCodeList.length;i++) {        
        var elem=document.getElementById(LISTITEM_ID+downloadCodeList[i].format);
        var url=downloadCodeList[i].url;
        var sig=downloadCodeList[i].sig;
        if (elem && url && sig) {
          url=url.replace(/\&signature=[\w\.]+/, '&signature='+decryptSignature(sig));
          elem.parentNode.setAttribute('href', url);
          addFileSize(url, downloadCodeList[i].format);
        }
      }
    }
  }
  
  function isValidSignatureCode(arr) { // valid values: '5,-3,0,2,5', 'error'
    if (!arr) return false;
    if (arr=='error') return true;
    arr=arr.split(',');
    for (var i=0;i<arr.length;i++) {
      if (!isInteger(parseInt(arr[i],10))) return false;
    }
    return true;
  }
  
  function fetchSignatureScript(scriptURL) {
    var storageURL=getPref(STORAGE_URL);
    var storageCode=getPref(STORAGE_CODE);
    if (storageCode && isValidSignatureCode(storageCode) && storageURL &&
        scriptURL.replace(/^https?/i,'')==storageURL.replace(/^https?/i,'')) return;
    try {
      isSignatureUpdatingStarted=true;    
      crossXmlHttpRequest({
        method:'GET',
        url:scriptURL,
        onload:function(response) {
          if (response.readyState === 4 && response.status === 200 && response.responseText) {
            findSignatureCode(response.responseText);
          }
        } 
      });
    } catch(e) { }
  }
  
  function getDecodeRules(rules) {
    var storageCode=getPref(STORAGE_CODE);    
    if (storageCode && storageCode!='error' && isValidSignatureCode(storageCode)) {
      var arr=storageCode.split(',');
      var signatureLength=81;
      for (var i=0; i<arr.length; i++) {
        arr[i]=parseInt(arr[i], 10);
        if (arr[i]<0) signatureLength-=arr[i];
      }
      rules[signatureLength]=arr;
    }
    return rules;
  }
  
  function decryptSignature(sig) {
    function swap(a,b){var c=a[0];a[0]=a[b%a.length];a[b]=c;return a};
    function decode(sig, arr) { // encoded decryption
      if (!isString(sig)) return null;
      var sigA=sig.split('');
      for (var i=0;i<arr.length;i++) {
        var act=arr[i];
        if (!isInteger(act)) return null;
        sigA=(act>0)?swap(sigA, act):((act==0)?sigA.reverse():sigA.slice(-act));
      }
      var result=sigA.join('');
      return (result.length==81)?result:sig;
    }
    
    if (sig==null) return '';    
    var arr=DECODE_RULE[sig.length];
    if (arr) {
      var sig2=decode(sig, arr);
      if (sig2 && sig2.length==81) return sig2;
    }
	  return sig;
  }  
      
  }

var DIV = document.createElement('span');
	DIV.innerHTML = '';
	DIV.style.cssFloat = "";
var divp = document.getElementById("watch7-subscription-container");
	divp.appendChild(DIV);

var url = location.href.split("&")[0];

var videoURL = document.URL;
var videoURL2 = videoURL.replace('https://','http://');
var id = videoURL2.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i)[1];


var INAU = document.createElement('input');
	INAU.setAttribute('type','button');
	INAU.setAttribute('name','INAU');
	INAU.setAttribute('value','MP3');
	INAU.setAttribute('class','yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip');
	INAU.style.borderLeft = "";
	INAU.style.marginRight = "";
	INAU.style.marginLeft = "";
	INAU.style.borderRadius = "0 3px 3px 0";
	DIV.appendChild(INAU);
	INAU.addEventListener('click', function(){window.open("http://www.fullrip.net/mp3/" + id + ""); self.focus();}, false);

var melden_btn, newElement;
melden_btn = document.getElementById('watch7-views-info');

if (melden_btn) {
    download_btn = document.createElement('BUTTON');
    melden_btn.parentNode.insertBefore(download_btn, melden_btn.nextSibling);

	var a1 = document.createAttribute("class");
	var a2 = document.createAttribute("aria-pressed");
	var a3 = document.createAttribute("role");
	var a4 = document.createAttribute("style");
	var a5 = document.createAttribute("onclick");
	var a6 = document.createAttribute("type");
	var a7 = document.createAttribute("title");
	var a8 = document.createAttribute("data-tooltip");
	var a9 = document.createAttribute("data-tooltip-title");
	var a10 = document.createAttribute("data-tooltip-timer");
	var a11 = document.createAttribute("onmouseover");
	var a12 = document.createAttribute("onmouseout");

	a1.nodeValue = "yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip active";
	a2.nodeValue = "false";
	a3.nodeValue = "button";
	a4.nodeValue = "margin-left: 3px;";
	a5.nodeValue = "window.open('http://www.clipconverter.cc/?ref=bookmarklet&url='+encodeURIComponent(location.href)); return false;";
	a6.nodeValue = "button";
	a7.nodeValue = "Download Video Through ClipConverter";
	a8.nodeValue = "Download Video Through ClipConverter";
	a9.nodeValue = "Download Video Through ClipConverter";
	a10.nodeValue = "204";
	a11.nodeValue = "document.getElementById('cc_img').src = 'http://img813.imageshack.us/img813/2968/cc2q.png'";
	a12.nodeValue = "document.getElementById('cc_img').src = 'http://img818.imageshack.us/img818/9084/cc1z.png'";

	download_btn.setAttributeNode(a1);
	download_btn.setAttributeNode(a2);
	download_btn.setAttributeNode(a3);
	download_btn.setAttributeNode(a4);
	download_btn.setAttributeNode(a5);
	download_btn.setAttributeNode(a6);
	download_btn.setAttributeNode(a7);
	download_btn.setAttributeNode(a8);
	download_btn.setAttributeNode(a9);
	download_btn.setAttributeNode(a10);
	download_btn.setAttributeNode(a11);
	download_btn.setAttributeNode(a12);


	var img = document.createElement('IMG');
	download_btn.appendChild(img);

	var a1 = document.createAttribute("src");
	var a2 = document.createAttribute("height");
	var a3 = document.createAttribute("id");

	a1.nodeValue = "http://img818.imageshack.us/img818/9084/cc1z.png";
	a2.nodeValue = "25";
	a3.nodeValue = "cc_img";

	img.setAttributeNode(a1);
	img.setAttributeNode(a2);
	img.setAttributeNode(a3);
}

var melden_btn, newElement;
melden_btn = document.getElementById('watch7-subscription-container');

if (melden_btn) {
    download_btn = document.createElement('BUTTON');
    melden_btn.parentNode.insertBefore(download_btn, melden_btn.nextSibling);

	var a1 = document.createAttribute("class");
	var a2 = document.createAttribute("aria-pressed");
	var a3 = document.createAttribute("role");
	var a4 = document.createAttribute("style");
	var a5 = document.createAttribute("onclick");
	var a6 = document.createAttribute("type");
	var a7 = document.createAttribute("title");
	var a8 = document.createAttribute("data-tooltip");
	var a9 = document.createAttribute("data-tooltip-title");
	var a10 = document.createAttribute("data-tooltip-timer");
	var a11 = document.createAttribute("onmouseover");
	var a12 = document.createAttribute("onmouseout");

	a1.nodeValue = "yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip active";
	a2.nodeValue = "false";
	a3.nodeValue = "button";
	a4.nodeValue = "margin-left: 3px;";
	a5.nodeValue = "window.open('http://www.listentoyoutube.com/process.php?submit=GO&url='+encodeURIComponent(location.href)); return false;";
	a6.nodeValue = "button";
	a7.nodeValue = "Descargar Audio Vía Listen2YouTube";
	a8.nodeValue = "Descargar Audio Vía Listen2YouTube";
	a9.nodeValue = "Descargar Audio Vía Listen2YouTube";
	a10.nodeValue = "204";
	a11.nodeValue = "document.getElementById('cc_img').src = 'http://www.listentoyoutube.com/favicon.ico'";
	a12.nodeValue = "document.getElementById('cc_img').src = 'http://www.flashvideodownloader.org/favicon.png'";

	download_btn.setAttributeNode(a1);
	download_btn.setAttributeNode(a2);
	download_btn.setAttributeNode(a3);
	download_btn.setAttributeNode(a4);
	download_btn.setAttributeNode(a5);
	download_btn.setAttributeNode(a6);
	download_btn.setAttributeNode(a7);
	download_btn.setAttributeNode(a8);
	download_btn.setAttributeNode(a9);
	download_btn.setAttributeNode(a10);
	download_btn.setAttributeNode(a11);
	download_btn.setAttributeNode(a12);


	var img = document.createElement('IMG');
	download_btn.appendChild(img);

	var a1 = document.createAttribute("src");
	var a2 = document.createAttribute("height");
	var a3 = document.createAttribute("id");

	a1.nodeValue = "http://www.flashvideodownloader.org/favicon.png";
	a2.nodeValue = "25";
	a3.nodeValue = "cc_img";

	img.setAttributeNode(a1);
	img.setAttributeNode(a2);
	img.setAttributeNode(a3);
}

})();

(function() {
    var e, t, r;
    (function(n) {
        function o(e, t) {
            return L.call(e, t);
        }
        function i(e, t) {
            var r, n, o, i, s, a, c, l, u, d, p = t && t.split("/"), h = v.map, f = h && h["*"] || {};
            if (e && "." === e.charAt(0)) if (t) {
                for (p = p.slice(0, p.length - 1), e = p.concat(e.split("/")), l = 0; e.length > l; l += 1) if (d = e[l], 
                "." === d) e.splice(l, 1), l -= 1; else if (".." === d) {
                    if (1 === l && (".." === e[2] || ".." === e[0])) break;
                    l > 0 && (e.splice(l - 1, 2), l -= 2);
                }
                e = e.join("/");
            } else 0 === e.indexOf("./") && (e = e.substring(2));
            if ((p || f) && h) {
                for (r = e.split("/"), l = r.length; l > 0; l -= 1) {
                    if (n = r.slice(0, l).join("/"), p) for (u = p.length; u > 0; u -= 1) if (o = h[p.slice(0, u).join("/")], 
                    o && (o = o[n])) {
                        i = o, s = l;
                        break;
                    }
                    if (i) break;
                    !a && f && f[n] && (a = f[n], c = l);
                }
                !i && a && (i = a, s = c), i && (r.splice(0, s, i), e = r.join("/"));
            }
            return e;
        }
        function s(e, t) {
            return function() {
                return h.apply(n, S.call(arguments, 0).concat([ e, t ]));
            };
        }
        function a(e) {
            return function(t) {
                return i(t, e);
            };
        }
        function c(e) {
            return function(t) {
                g[e] = t;
            };
        }
        function l(e) {
            if (o(y, e)) {
                var t = y[e];
                delete y[e], b[e] = !0, p.apply(n, t);
            }
            if (!o(g, e) && !o(b, e)) throw Error("No " + e);
            return g[e];
        }
        function u(e) {
            var t, r = e ? e.indexOf("!") : -1;
            return r > -1 && (t = e.substring(0, r), e = e.substring(r + 1, e.length)), [ t, e ];
        }
        function d(e) {
            return function() {
                return v && v.config && v.config[e] || {};
            };
        }
        var p, h, f, m, g = {}, y = {}, v = {}, b = {}, L = Object.prototype.hasOwnProperty, S = [].slice;
        f = function(e, t) {
            var r, n = u(e), o = n[0];
            return e = n[1], o && (o = i(o, t), r = l(o)), o ? e = r && r.normalize ? r.normalize(e, a(t)) : i(e, t) : (e = i(e, t), 
            n = u(e), o = n[0], e = n[1], o && (r = l(o))), {
                f: o ? o + "!" + e : e,
                n: e,
                pr: o,
                p: r
            };
        }, m = {
            require: function(e) {
                return s(e);
            },
            exports: function(e) {
                var t = g[e];
                return t !== void 0 ? t : g[e] = {};
            },
            module: function(e) {
                return {
                    id: e,
                    uri: "",
                    exports: g[e],
                    config: d(e)
                };
            }
        }, p = function(e, t, r, i) {
            var a, u, d, p, h, v, L = [];
            if (i = i || e, "function" == typeof r) {
                for (t = !t.length && r.length ? [ "require", "exports", "module" ] : t, h = 0; t.length > h; h += 1) if (p = f(t[h], i), 
                u = p.f, "require" === u) L[h] = m.require(e); else if ("exports" === u) L[h] = m.exports(e), 
                v = !0; else if ("module" === u) a = L[h] = m.module(e); else if (o(g, u) || o(y, u) || o(b, u)) L[h] = l(u); else {
                    if (!p.p) throw Error(e + " missing " + u);
                    p.p.load(p.n, s(i, !0), c(u), {}), L[h] = g[u];
                }
                d = r.apply(g[e], L), e && (a && a.exports !== n && a.exports !== g[e] ? g[e] = a.exports : d === n && v || (g[e] = d));
            } else e && (g[e] = r);
        }, e = t = h = function(e, t, r, o, i) {
            return "string" == typeof e ? m[e] ? m[e](t) : l(f(e, t).f) : (e.splice || (v = e, 
            t.splice ? (e = t, t = r, r = null) : e = n), t = t || function() {}, "function" == typeof r && (r = o, 
            o = i), o ? p(n, e, t, r) : setTimeout(function() {
                p(n, e, t, r);
            }, 15), h);
        }, h.config = function(e) {
            return v = e, h;
        }, r = function(e, t, r) {
            t.splice || (r = t, t = []), o(g, e) || o(y, e) || (y[e] = [ e, t, r ]);
        }, r.amd = {
            jQuery: !0
        };
    })(), r("config-greasemonkey", [], function() {
        var e = {};
        return e.getItem = function(e, t) {
            setTimeout(function() {
                var r = GM_getValue(e);
                "string" == typeof r && (r = JSON.parse(r)), t(r);
            }, 0);
        }, e.setItem = function(e, t, r) {
            t = JSON.stringify(t), setTimeout(function() {
                GM_setValue(e, t), r(!0);
            }, 0);
        }, e.removeItem = function(e, t) {
            setTimeout(function() {
                GM_deleteValue(e), t(!0);
            }, 0);
        }, e.clear = function(e) {
            setTimeout(function() {
                for (var t = GM_listValues(), r = 0; t.length > r; r++) GM_deleteValue(t[r]);
                e(!0);
            }, 0);
        }, e.init = function() {}, e;
    }), r("config-userscript", [], function() {
        var e = function(e, t, r) {
            console && console.log(e + ": " + r);
        }, t = {}, r = "rwYTL.", n = "robw_ytl", o = "/robots.txt#lyrics-settings", i = [ "http://www.youtube.com", "https://www.youtube.com" ], s = i.concat("https://rob.lekensteyn.nl", "http://rob.lekensteyn.nl", "https://robwu.nl", "http://robwu.nl");
        return t.getItem = function(t, n) {
            var o = localStorage.getItem(r + t);
            if ("string" == typeof o) try {
                o = JSON.parse(o);
            } catch (i) {
                e("config.getItem error: " + i), o = void 0;
            }
            n(o);
        }, t.setItem = function(t, n, o) {
            var i = !1;
            try {
                localStorage.setItem(r + t, JSON.stringify(n)), i = !0;
            } catch (s) {
                e("config.setItem error: " + s);
            }
            o(i);
        }, t.removeItem = function(e, t) {
            localStorage.removeItem(r + e), t(!0);
        }, t.clear = function(e) {
            for (var t = [], n = localStorage.length - 1; n >= 0; --n) {
                var o = localStorage.key(n);
                o && 0 === o.indexOf(r) && t.push(o);
            }
            t.forEach(function(e) {
                localStorage.removeItem(e);
            }), e(!0);
        }, t.init = function() {
            function r() {
                return (location.protocol + "//" + location.host).toLowerCase();
            }
            function a() {
                return (location.pathname + location.hash).toLowerCase();
            }
            if (-1 !== i.indexOf(r()) && a() === o && (addEventListener("message", function(e) {
                if (-1 !== s.indexOf(e.origin) && "string" == typeof e.data) {
                    var r = e.data.match(/^(@(\D+)\d+)(getItem|setItem|removeItem|clear)(\[[\S\s]*\])$/);
                    if (r) {
                        var o = r[1], i = r[2];
                        if (n === i) {
                            var a = r[3], c = JSON.parse(r[4]);
                            c.push(function() {
                                var t = [].slice.call(arguments), r = o + "callback" + JSON.stringify(t);
                                e.source.postMessage(r, e.origin);
                            }), t[a].apply(t, c);
                        }
                    }
                }
            }, !0), parent.postMessage("Hello", "*")), -1 !== s.indexOf(r()) && a() !== o) {
                var c = {}, l = {}, u = {};
                i.forEach(function(e) {
                    u[e] = {
                        frame: null,
                        queue: [],
                        useless: null
                    };
                }), addEventListener("message", function(t) {
                    if (-1 !== s.indexOf(t.origin) && "string" == typeof t.data) if ("Hello" !== t.data) {
                        var r = t.data.match(/^(@(\D+)\d+)callback(\[[\S\s]*\])$/);
                        if (r) {
                            var o = r[1], i = r[2];
                            if (i === n) {
                                var a = JSON.parse(r[3]);
                                l[o] ? l[o](a) : e("Callback not found for ID " + o);
                            }
                        }
                    } else {
                        clearTimeout(c[t.origin]), u[t.origin].useless = !1;
                        for (var d; d = u[t.origin].queue.shift(); ) d(t.source);
                    }
                }, !0);
                var d = function(e, t, r, i) {
                    var s = "@" + n + (0 | 1e9 * Math.random()), a = s + t + JSON.stringify(r), d = u[e];
                    if (l[s] = function(e) {
                        delete l[s], i.apply(this, e);
                    }, null !== d.useless) d.useless ? l[s]([]) : d.frame.contentWindow.postMessage(a, e); else if (d.queue.push(function(t) {
                        t.postMessage(a, e);
                    }), !d.frame) {
                        d.frame = document.createElement("iframe"), d.frame.style.cssText = "border:0;margin:0;width:1px;height:1px;pointer-events: none;", 
                        d.frame.src = e + o;
                        var p = function() {
                            d.useless !== !1 && (d.useless = !0), d.frame.removeEventListener("error", p, !0), 
                            l[s] && l[s]([]);
                        };
                        d.frame.addEventListener("error", p, !0);
                        var h = function() {
                            d.frame.removeEventListener("load", h, !0), d.useless !== !1 && (c[e] = setTimeout(p, 2e3));
                        };
                        d.frame.addEventListener("load", h, !0), (document.body || document.documentElement).appendChild(d.frame);
                    }
                }, p = function(e, r) {
                    var n = t[e], o = "getItem" === e;
                    t[e] = function() {
                        var s = [].slice.call(arguments), a = s.pop(), c = o ? null : !0, l = 0, u = function(e) {
                            o ? (null === c || void 0 === c) && (c = e) : c = c && e, ++l === i.length && a(c);
                        };
                        n.apply(t, s.concat(u));
                        for (var p = 0; i.length > p; p++) {
                            var h = i[p];
                            h !== r && d(h, e, s, u);
                        }
                    };
                };
                -1 !== i.indexOf(r()) ? (p("setItem", r()), p("removeItem", r()), p("clear", r())) : (p("setItem"), 
                p("getItem"), p("removeItem"), p("clear"));
            }
        }, t;
    }), r("config", [ "config-greasemonkey", "config-userscript" ], function(e, t) {
        return "function" == typeof GM_getValue && "function" == typeof GM_setValue && "function" == typeof GM_listValues && (t = e), 
        t.init(), t;
    }), r("processRequest-greasemonkey", [ "require", "exports", "module" ], function(e, t) {
        function r(e) {
            var t = e.url, r = {
                url: t,
                abort: function() {
                    o && o.abort();
                }
            }, o = GM_xmlhttpRequest({
                method: e.method || "GET",
                url: t,
                headers: e.headers,
                onload: function(i) {
                    var s = i.status, a = i.responseText;
                    r.abort = n, o = null, s >= 200 && 300 > s || 304 === s ? e.found({
                        url: t,
                        responseText: a
                    }) : e.fail({
                        url: t
                    });
                },
                onerror: function() {
                    r.abort = n, o = null, e.fail({
                        url: t
                    });
                },
                data: e.payload
            });
            o && e.afterSend(r);
        }
        var n = function() {};
        t.processRequest = r;
    }), r("processRequest-xhr", [ "require", "exports", "module" ], function(e, t) {
        function r(e) {
            var t = e.url, r = new XMLHttpRequest(), i = {
                url: t,
                abort: function() {
                    r && (i.abort = o, r.abort(), r = null);
                }
            };
            if (r.open(e.method || "GET", t, !0), e.headers) for (var s = Object.keys(e.headers), a = 0; s.length > a; a++) {
                var c = s[a];
                if (n.call(e.headers, c)) {
                    var l = e.headers[c];
                    r.setRequestHeader(c, l);
                }
            }
            r.onload = function() {
                if (i.abort !== o) {
                    var n = r.status, s = r.responseText;
                    i.abort = o, r = null, n >= 200 && 300 > n || 304 === n ? e.found({
                        url: t,
                        responseText: s
                    }) : e.fail({
                        url: t
                    });
                }
            }, r.onerror = function() {
                i.abort !== o && (i.abort = o, r = null, e.fail({
                    url: t
                }));
            };
            try {
                r.send(e.payload);
            } catch (u) {
                "undefined" != typeof console && console && console.error && console.error(u.message), 
                e.fail({
                    url: t
                });
            }
            r && e.afterSend(i);
        }
        var n = Object.prototype.hasOwnProperty, o = function() {};
        t.processRequest = r;
    }), r("processRequest-cors", [ "require", "exports", "module", "processRequest-xhr" ], function(e, t) {
        function r(e) {
            return function(t) {
                t && t.url && (t.url = t.url.replace(i, "")), e(t);
            };
        }
        function n(e) {
            o({
                url: i + e.url,
                afterSend: r(e.afterSend),
                fail: r(e.fail),
                found: r(e.found),
                method: e.method,
                payload: e.payload,
                headers: e.headers
            });
        }
        var o = e("processRequest-xhr").processRequest, i = ("http:" === location.protocol ? "http" : "https") + "://cors-anywhere.herokuapp.com/";
        t.processRequest = n;
    }), r("processRequest", [ "processRequest-greasemonkey", "processRequest-cors" ], function(e, t) {
        return "function" == typeof GM_xmlhttpRequest ? e : t;
    }), r("ScrapedSource", [ "require", "exports", "module" ], function(e, t) {
        function r(e) {
            return this instanceof r ? (this.parseOptions(e), this.validate(), void 0) : (n("ScrapedSource", "invalid_constructor_call", 'Constructor cannot be called as a function. Use "new ScrapedSource(options)" instead of "ScrapedSource(options)"'), 
            void 0);
        }
        var n = function(e, t, r) {
            var n = Error(e + ": " + r);
            throw n.type = t, n;
        }, o = /^\$[A-Za-z]+$/, i = /\$\{([A-Za-z]+)\}|\$([A-Za-z]+)/g;
        r.Scheme = {
            identifier: "string",
            disabled: [ "undefined", "boolean" ],
            url_result: [ "string", "function" ],
            method_result: [ "undefined", "string" ],
            payload_result: [ "undefined", "string", "function" ],
            headers_result: [ "undefined", "object", "function" ],
            process_result: "function",
            url_search: [ "string", "function" ],
            method_search: [ "undefined", "string" ],
            payload_search: [ "undefined", "string", "function" ],
            headers_search: [ "undefined", "object", "function" ],
            process_search: "function"
        }, r.StrictScheme = !1, r.prototype.disabled = !1, r.prototype.validate = function() {
            var e = this;
            return Object.keys(this.constructor.Scheme).every(function(t) {
                return e.validateKey(t, e[t]);
            });
        }, r.prototype.validateKey = function(e, t) {
            if (!this.constructor || !this.constructor.Scheme) return n("ScrapedSource::validateKey", "scheme_not_found", 'The caller\'s constructor must have a property "Scheme"!'), 
            !1;
            var r = this.constructor.Scheme[e];
            if (!r) {
                if (!o.test(e)) return this.constructor.StrictScheme ? (n("ScrapedSource::validateKey", "unknown_key", "Unknown key " + e + ", forbidden by strict scheme!"), 
                !1) : !0;
                r = "function";
            }
            Array.isArray(r) || (r = [ r ]);
            var i = typeof t;
            return t && (t.test && t.exec ? i = "regexp" : Array.isArray(t) && (i = "array")), 
            -1 === r.indexOf(i) ? (n("ScrapedSource::validateKey", "type_mismatch", 'typeof "' + e + '" must be "' + r + '"! Actual type: "' + i + '"'), 
            !1) : !0;
        }, r.prototype.parseOptions = function(e) {
            if ("object" != typeof e) return n("ScrapedSource::parseOptions", "type_mismatch", "Argument options is required and must be an object!"), 
            !1;
            var t = this;
            return Object.keys(e).every(function(r) {
                var n = t.validateKey(r, e[r]);
                return n && (t[r] = e[r]), n;
            });
        }, r.prototype.get_url = function(e, t) {
            var r = this, o = r["url_" + e];
            return "function" == typeof o ? (o = o.call(r, t), "string" != typeof o && n("ScrapedSource::get_url", "type_mismatch", "url_" + e + " dit not return a string."), 
            o) : ("string" != typeof o && n("ScrapedSource::get_url", "type_mismatch", "url_" + e + " is not a string."), 
            r.expand_vars(o, t));
        }, r.prototype.expand_vars = function(e, t) {
            var r = this, o = !0;
            return e = e.replace(i, function(e, i, s) {
                return i = "$" + (i || s), "function" == typeof r[i] ? r[i](t) : (n("ScrapedSource::expand_vars", "invalid_parameter", "No function found for " + i), 
                o = !1, void 0);
            }), o ? e : null;
        }, r.prototype.getMethod = function(e) {
            var t = this["method_" + e];
            return "string" == typeof t ? t : null;
        }, r.prototype.getHeaders = function(e, t) {
            var r = this, n = r["headers_" + e];
            return "function" == typeof n && (n = n.call(r, t)), !n || "object" != typeof n || n instanceof Array ? null : n;
        }, r.prototype.getPayload = function(e, t) {
            var r = this, o = r["payload_" + e];
            if ("function" == typeof o && (o = o.call(r, t)), "string" != typeof o) return null;
            var s = !0;
            return o = o.replace(i, function(e, o, i) {
                return o = "$" + (o || i), "function" == typeof r[o] ? r[o](t) : (n("ScrapedSource::getPayload", "invalid_parameter", "No function found for " + o), 
                s = !1, void 0);
            }), s ? o : null;
        }, t.ScrapedSource = r;
    }), r("InfoProvider", [ "require", "exports", "module", "processRequest", "ScrapedSource" ], function(e, t) {
        function r(e) {
            this.parseSources(e);
        }
        var n = e("processRequest").processRequest, o = e("ScrapedSource").ScrapedSource, i = Object.prototype.hasOwnProperty, s = function(e, t, r) {
            var n = Error(e + ": " + r);
            throw n.type = t, n;
        }, a = function(e, t) {
            if (t) {
                for (var r in t) i.call(t, r) && (e[r] = t[r]);
                return e;
            }
        }, c = function(e, t) {
            var r = [].slice.call(arguments, 2);
            return function() {
                return e.apply(t, r);
            };
        };
        r.prototype.parseSources = function(e) {
            if (!(e instanceof Array)) return s("InfoProvider::parseSources", "type_mismatch", "The only argument must be an array of ScrapedSource instances!"), 
            void 0;
            var t = [];
            e.forEach(function(e, r) {
                e instanceof o ? t.push(e) : s("InfoProvider::parseSources", "type_mismatch", "Source " + r + " is not a ScrapedSource instance!");
            }), this.sources = t, this.sourceCount = e.length;
        }, r.prototype.query = function(e, t, r, i) {
            function l(e, t) {
                return ++x > 7 ? (b(), s("InfoProvider::query:_processURL", "redirect_loop", "Too many redirects"), 
                void 0) : (e.redirSource && e.redirSource instanceof o && (h = e.redirSource, y.sourceIdentifier = h.identifier), 
                n({
                    url: e.redir,
                    afterSend: S,
                    fail: b,
                    found: function(e) {
                        e.tempData = t, u(e);
                    },
                    method: e.method,
                    payload: e.payload,
                    headers: e.headers
                }), void 0);
            }
            function u(e) {
                y.url = e.url, h.process_result(e.responseText, {
                    fail: b,
                    found: function(e) {
                        e.redir ? l(e, e.tempData) : L(e);
                    }
                }, {
                    url: e.url,
                    query: t,
                    tempData: e.tempData
                });
            }
            function d(e) {
                y.url = e.redir || e.url, h.process_search(e.responseText, {
                    fail: b,
                    found: l
                }, {
                    url: e.url,
                    query: t,
                    tempData: e.tempData
                });
            }
            var p = this;
            if (p.abort(), "function" != typeof r || !t || !e) return s("InfoProvider::query", "invalid_args", "Usage: function( String type, object query, function callback(result) )"), 
            void 0;
            i = +i || 0;
            var h = p.sources[i], f = !1, m = p.lastTimeAborted, g = a({}, t), y = {
                sourceIndex: i,
                sourceCount: p.sourceCount,
                sourceIdentifier: "<unknown>",
                searchTerms: t.searchTerms,
                url: "",
                retry: c(p.query, p, e, g, r, i),
                query: t,
                abort: null
            };
            p.sourceCount > i + 1 ? y.next = c(p.query, p, e, g, r, i + 1) : y.restart = c(p.query, p, e, g, r);
            var v = function(e, t, n) {
                if (!f && p.lastTimeAborted === m) {
                    f = n;
                    var o = {};
                    a(o, y), a(o, t), o.type = e, r(o);
                }
            }, b = function(e) {
                v("fail", e, !0);
            }, L = function(e) {
                v("found", e, !0);
            }, S = function(e) {
                p._abort = e.abort, v("fetching", e, !1);
            };
            if (!h) return b(), void 0;
            h.$SEARCHTERMS && (y.searchTerms = h.$SEARCHTERMS(t));
            var w = h.get_url(e, t);
            if (y.url = w, y.sourceIdentifier = h.identifier, !w) return b(), void 0;
            var x = 0;
            n({
                url: w,
                afterSend: S,
                fail: b,
                found: function(t) {
                    f || ("search" === e ? d(t) : u(t));
                },
                method: h.getMethod(e, t),
                payload: h.getPayload(e, t),
                headers: h.getHeaders(e, t)
            });
        }, r.prototype.lastTimeAborted = 0, r.prototype.abort = function() {
            this.lastTimeAborted++;
            var e = this._abort;
            e && (this._abort = null, e());
        }, t.InfoProvider = r;
    }), r("normalize_accents", [ "require", "exports", "module" ], function(e, t) {
        var r = Object.prototype.hasOwnProperty, n = {
            a: [ "ª", "à", "á", "â", "ã", "ä", "å", "ā", "ă", "ą", "ǎ", "ȁ", "ȃ", "ȧ", "ᵃ", "ḁ", "ẚ", "ạ", "ả", "ₐ", "ａ" ],
            A: [ "À", "Á", "Â", "Ã", "Ä", "Å", "Ā", "Ă", "Ą", "Ǎ", "Ȁ", "Ȃ", "Ȧ", "ᴬ", "Ḁ", "Ạ", "Ả", "Ａ" ],
            b: [ "ᵇ", "ḃ", "ḅ", "ḇ", "ｂ" ],
            B: [ "ᴮ", "Ḃ", "Ḅ", "Ḇ", "Ｂ" ],
            c: [ "ç", "ć", "ĉ", "ċ", "č", "ᶜ", "ⅽ", "ｃ" ],
            C: [ "Ç", "Ć", "Ĉ", "Ċ", "Č", "Ⅽ", "Ｃ" ],
            d: [ "ď", "ᵈ", "ḋ", "ḍ", "ḏ", "ḑ", "ḓ", "ⅾ", "ｄ" ],
            D: [ "Ď", "ᴰ", "Ḋ", "Ḍ", "Ḏ", "Ḑ", "Ḓ", "Ⅾ", "Ｄ" ],
            e: [ "è", "é", "ê", "ë", "ē", "ĕ", "ė", "ę", "ě", "ȅ", "ȇ", "ȩ", "ᵉ", "ḙ", "ḛ", "ẹ", "ẻ", "ẽ", "ₑ", "ｅ" ],
            E: [ "È", "É", "Ê", "Ë", "Ē", "Ĕ", "Ė", "Ę", "Ě", "Ȅ", "Ȇ", "Ȩ", "ᴱ", "Ḙ", "Ḛ", "Ẹ", "Ẻ", "Ẽ", "Ｅ" ],
            f: [ "ᶠ", "ḟ", "ｆ" ],
            F: [ "Ḟ", "℉", "Ｆ" ],
            g: [ "ĝ", "ğ", "ġ", "ģ", "ǧ", "ǵ", "ᵍ", "ḡ", "ｇ" ],
            G: [ "Ĝ", "Ğ", "Ġ", "Ģ", "Ǧ", "Ǵ", "ᴳ", "Ḡ", "Ｇ" ],
            h: [ "ĥ", "ȟ", "ʰ", "ḣ", "ḥ", "ḧ", "ḩ", "ḫ", "ẖ", "ℎ", "ｈ" ],
            H: [ "Ĥ", "Ȟ", "ᴴ", "Ḣ", "Ḥ", "Ḧ", "Ḩ", "Ḫ", "Ｈ" ],
            i: [ "ì", "í", "î", "ï", "ĩ", "ī", "ĭ", "į", "ǐ", "ȉ", "ȋ", "ᵢ", "ḭ", "ỉ", "ị", "ⁱ", "ｉ" ],
            I: [ "Ì", "Í", "Î", "Ï", "Ĩ", "Ī", "Ĭ", "Į", "İ", "Ǐ", "Ȉ", "Ȋ", "ᴵ", "Ḭ", "Ỉ", "Ị", "Ｉ" ],
            j: [ "ĵ", "ǰ", "ʲ", "ｊ" ],
            J: [ "Ĵ", "ᴶ", "Ｊ" ],
            k: [ "ķ", "ǩ", "ᵏ", "ḱ", "ḳ", "ḵ", "ｋ" ],
            K: [ "Ķ", "Ǩ", "ᴷ", "Ḱ", "Ḳ", "Ḵ", "K", "Ｋ" ],
            l: [ "ĺ", "ļ", "ľ", "ˡ", "ŀ", "ḷ", "ḻ", "ḽ", "ⅼ", "ｌ" ],
            L: [ "Ĺ", "Ļ", "Ľ", "ᴸ", "Ḷ", "Ḻ", "Ḽ", "Ⅼ", "Ｌ" ],
            m: [ "ᵐ", "ḿ", "ṁ", "ṃ", "ⅿ", "ｍ" ],
            M: [ "ᴹ", "Ḿ", "Ṁ", "Ṃ", "Ⅿ", "Ｍ" ],
            n: [ "ñ", "ń", "ņ", "ň", "ŉ", "ṅ", "ṇ", "ṉ", "ṋ", "ｎ" ],
            N: [ "Ñ", "Ń", "Ņ", "Ň", "ᴺ", "Ṅ", "Ṇ", "Ṉ", "Ṋ", "Ｎ" ],
            o: [ "º", "ò", "ó", "ô", "õ", "ö", "ō", "ŏ", "ő", "ǒ", "ǫ", "ȍ", "ȏ", "ȯ", "ᵒ", "ọ", "ỏ", "ｏ" ],
            O: [ "Ò", "Ó", "Ô", "Ö", "Õ", "Ō", "Ŏ", "Ő", "Ǒ", "Ǫ", "Ȍ", "Ȏ", "Ȯ", "ᴼ", "Ọ", "Ỏ", "Ｏ" ],
            p: [ "ᵖ", "ṕ", "ṗ", "ｐ" ],
            P: [ "ᴾ", "Ṕ", "Ṗ", "Ｐ" ],
            q: [ "ｑ" ],
            Q: [ "Ｑ" ],
            r: [ "ŕ", "ŗ", "ř", "ȑ", "ȓ", "ʳ", "ᵣ", "ṙ", "Ṛ", "ṛ", "ṟ", "ｒ" ],
            R: [ "Ŕ", "Ŗ", "Ř", "Ȑ", "Ȓ", "ᴿ", "Ṙ", "Ṟ", "Ｒ" ],
            s: [ "ś", "ŝ", "ş", "š", "ș", "ṡ", "ṣ", "ｓ" ],
            S: [ "Ś", "Ŝ", "Ş", "Š", "Ș", "Ṡ", "Ṣ", "Ｓ" ],
            t: [ "ţ", "ť", "ț", "ᵗ", "ṫ", "ṭ", "ṯ", "ṱ", "ẗ", "ｔ" ],
            T: [ "Ţ", "Ť", "Ț", "ᵀ", "Ṫ", "Ṭ", "Ṯ", "Ṱ", "Ｔ" ],
            u: [ "ù", "ú", "û", "ü", "ũ", "ū", "ŭ", "ů", "ű", "ư", "ǔ", "ȕ", "ȗ", "ᵘ", "ᵤ", "ṳ", "ṵ", "ṷ", "ụ", "ủ", "ｕ" ],
            U: [ "Ù", "Ú", "Ü", "Û", "Ũ", "Ū", "Ŭ", "Ů", "Ű", "Ų", "Ư", "Ǔ", "Ȕ", "Ȗ", "ᵁ", "Ṳ", "Ṵ", "Ṷ", "Ụ", "Ủ", "Ｕ" ],
            v: [ "ṽ", "ṿ", "ᵛ", "ᵥ", "ｖ" ],
            V: [ "Ṽ", "Ṿ", "ⱽ", "Ｖ" ],
            w: [ "ŵ", "ʷ", "ẁ", "ẃ", "ẅ", "ẇ", "ẉ", "ẘ", "ｗ" ],
            W: [ "Ŵ", "ᵂ", "Ẁ", "Ẃ", "Ẅ", "Ẇ", "Ẉ", "Ｗ" ],
            x: [ "ˣ", "ẋ", "ẍ", "ₓ", "ｘ" ],
            X: [ "Ẋ", "Ẍ", "Ｘ" ],
            y: [ "ý", "ÿ", "ŷ", "ȳ", "ʸ", "ẏ", "ẙ", "ỳ", "ỵ", "ỷ", "ỹ", "ｙ" ],
            Y: [ "Ý", "Ŷ", "Ÿ", "Ȳ", "Ẏ", "Ỳ", "Ỵ", "Ỷ", "Ỹ", "Ｙ" ],
            z: [ "ź", "ż", "ž", "ẑ", "ẓ", "ẕ", "ｚ" ],
            Z: [ "Ź", "Ż", "Ž", "Ẑ", "Ẓ", "Ẕ", "Ｚ" ]
        }, o = {}, i = "";
        for (var s in n) if (r.call(n, s)) for (var a = n[s], c = 0; a.length > c; c++) o[a[c]] = s, 
        i += a[c];
        i = RegExp("[" + i + "]", "gi"), t.normalize_accents = function(e) {
            return e ? e.replace(i, function(e) {
                return r.call(o, e) ? o[e] : e;
            }) : e;
        };
    }), r("SourceScraperUtils", [ "require", "exports", "module", "normalize_accents" ], function(e, t) {
        var r = e("normalize_accents").normalize_accents, n = function(e, t, r) {
            console && console.log(e + ": " + r);
        }, o = {};
        o.toStringArray = function(e, t) {
            if (!e) return [];
            if (t || (t = {}), !t.isFirstChild && !(e = e.firstChild)) return [];
            var r = {};
            for (r.tags = t.tags || /^(?:[bui]|strong|em)$/i, r.flushBefore = t.flushBefore || /^br$/i, 
            r.flushAfter = t.flushAfter, r.lineAfterFlush = t.lineAfterFlush, r.isEndNode = t.isEndNode, 
            r.ignoreNode = t.ignoreNode, r.tmpLine = "", r.lines = [], i(e, r), r.tmpLine && r.lines.push(r.tmpLine.trim()); r.lines.length && !r.lines[0]; ) r.lines.shift();
            for (var n = r.lines.length; --n > 0 && !r.lines[n]; ) r.lines.pop();
            return r.lines;
        };
        var i = function(e, t) {
            if (e) do {
                if (t.isEndNode && t.isEndNode(e)) return;
                if (!t.ignoreNode || !t.ignoreNode(e)) if (3 === e.nodeType) t.tmpLine += e.nodeValue; else if (1 === e.nodeType) {
                    var r = e.tagName;
                    t.flushBefore && t.flushBefore.test(r) && (t.lines.push(t.tmpLine.trim()), t.tmpLine = ""), 
                    t.tags && t.tags.test(r) && i(e.firstChild, t), t.flushAfter && t.flushAfter.test(r) && (t.tmpLine && (t.lines.push(t.tmpLine.trim()), 
                    t.tmpLine = ""), t.lineAfterFlush && t.lineAfterFlush.test(r) && t.lines.push(""));
                }
            } while (e = e.nextSibling);
        };
        try {
            new DOMParser().parseFromString("", "text/html").body, o.toDOM = function(e) {
                return new DOMParser().parseFromString(e, "text/html");
            };
        } catch (s) {
            if (o.toDOM = function(e) {
                var t = document.implementation.createHTMLDocument("");
                return e && !/^\s+$/.test(e) && (t.open(), t.write(e + "</html>"), t.close()), t;
            }, window.opera) o.toDOM = function(e) {
                var t = document.implementation.createHTMLDocument("");
                return e = e.replace(/<img\s/gi, "<img src "), t.documentElement.innerHTML = e, 
                t;
            }; else try {
                if (!o.toDOM("<body><p></p></body>").querySelector("p")) return o.toDOM = function(e) {
                    var t = document.implementation.createHTMLDocument("");
                    return t.documentElement.innerHTML = e, t;
                }, void 0;
            } catch (s) {
                o.toDOM = function(e) {
                    var t = /<title\b[^>]*>([\S\s]+)<\/title/i.exec(e);
                    if (t) {
                        var r = document.createElement("div");
                        t = t[1].split(/<\/textarea/i)[0], r.innerHTML = "<textarea>" + t + "</textarea>", 
                        t = r.firstChild.value, r = null;
                    } else t = "";
                    e = e.replace(/^\s*<!doctype[^>]*>/i, ""), e = e.replace(/<(link|image)\b/gi, "$& href=data: "), 
                    e = e.replace(/<(img|script|style|video|audio|source|bgsound)\b/gi, "$& src=data: "), 
                    e = e.replace(/<\/?(object|applet)\b/gi, "$&dp"), e = e.replace(/<style\b/gi, "$& disabled "), 
                    e = e.replace(/\bo([Nn])/g, "&#111;$1").replace(/\bO([Nn])/g, "&#79;$1"), e = e.replace(/\b(style\s*=)/gi, "s$1");
                    var n;
                    e = e.replace(/<body\b/i, "<s tub></s>$&"), document.implementation.createHTMLDocument ? n = document.implementation.createHTMLDocument(t) : (n = document.createElement("html"), 
                    n.documentElement = n, n.getElementById = function(e) {
                        return n.querySelector("#" + ("" + e).replace(/\W/g, "\\$&"));
                    }, n.head = n.appendChild(document.createElement("head")), n.title = t, n.body = n.appendChild(document.createElement("body"))), 
                    n.body.innerHTML = e;
                    var o = n.body.querySelector("s[tub]");
                    if (o && o.parentNode === n.body) {
                        for (var i; (i = n.body.firstChild) != o; ) n.head.appendChild(i);
                        n.body.removeChild(o);
                    }
                    return n;
                };
            }
        }
        o.normalize_accents = r, o.search = {};
        var a = {};
        o.search.engines = a, o.search.isSearchURL = function(e) {
            for (var t in a) if (a[t].r_url.test(e)) return !0;
            return !1;
        }, o.search.get_url = function(e) {
            var t = a[e.engine] || a.bing;
            return t.get_url(e);
        }, o.search.getResultsFromResponse = function(e, t) {
            if (!e || "string" != typeof e) return [];
            var r;
            if (t && t.url) for (var o in a) if (a[o].r_url.test(t.url)) {
                r = a[o];
                break;
            }
            return r || (r = a.bing, n("SourceScraperUtils:search:getResultsFromResponse", "response_not_recognized", "Not recognized as a search result: " + (t && t.url))), 
            r.getResultsFromResponse(e);
        }, a.bing = {}, a.bing.r_url = /^https?:\/\/m\.bing\.com\//, a.bing.get_url = function(e) {
            var t = "http://m.bing.com/search?q=", r = e.query;
            return e.site && (r = "site:" + e.site + " " + r), t += encodeURIComponent(r);
        }, a.bing.getResultsFromResponse = function(e) {
            for (var t, r, o = [], i = /<a href="(\/ins\?[^"]*?&amp;url=([A-Za-z0-9+\/=_]+)&amp;[^"]+)/g; null !== (t = i.exec(e)); ) {
                var s = t[2];
                try {
                    for (var a = s.split("_"), c = 0; a.length > c; ++c) 0 === c ? r = "" : r += 1 === c ? "?" : "&", 
                    r += window.atob(a[c]);
                } catch (l) {
                    n("SourceScraperUtils:bing:getResultsFromResponse", "atob_error", "Failed to decode the URL, " + l), 
                    r = t[1].replace(/&amp;/g, "&");
                }
                o.push(r);
            }
            if (!o.length) {
                i = /<a href="(https?:[^"]+)/g;
                var u = e.indexOf('id="content"');
                for (u > 0 && (i.lastIndex = u); null !== (t = i.exec(e)); ) {
                    r = t[1];
                    try {
                        r = decodeURI(r);
                    } catch (l) {}
                    var d = r.split("/")[2];
                    /(?:bing|live|microsoft|microsofttranslator|msn)\.com$/.test(d) || o.push(r);
                }
            }
            return o;
        }, a.soso = {}, a.soso.r_url = /^https?:\/\/www\.soso\.com\//, a.soso.get_url = function(e) {
            var t = "http://www.soso.com/q?w=", r = e.query;
            return e.site && (r = "site:" + e.site + " " + r), t += encodeURIComponent(r);
        }, a.soso.getResultsFromResponse = function(e) {
            var t = e.search(/<body\b/i);
            t > 0 && (e = e.substr(t));
            for (var r, n = /<h3 .*?<a [^>]*?\bhref="(https?:\/\/[^"]+)"/g, o = []; null !== (r = n.exec(e)); ) o.push(r[1]);
            return o;
        }, a.google = {}, a.google.r_url = /^https:\/\/encrypted\.google\.com\//, a.google.get_url = function(e) {
            var t = "https://encrypted.google.com/search?q=", r = e.query;
            return e.site && (r = "site:" + e.site + " " + r), t += encodeURIComponent(r);
        }, a.google.getResultsFromResponse = function(e) {
            for (var t, r = /<h3 class="r"><a href="(https?:\/\/[^"]+)"/g, n = []; null !== (t = r.exec(e)); ) n.push(t[1]);
            return n;
        }, t.SourceScraperUtils = o;
    }), r("LyricsSource", [ "require", "exports", "module", "ScrapedSource", "SourceScraperUtils" ], function(e, t) {
        function r(e) {
            e && n(e), s.call(this, e);
        }
        function n(e) {
            e.searchterms_site || (e.searchterms_site = e.identifier), !e.url_result && e.searchterms_result && (e.url_result = c.url_result), 
            !e.url_search && e.searchterms_search && (e.url_search = c.url_search), !e.process_result && e.process_result_selector && (e.process_result = c.process_result), 
            !e.process_search && e.r_url_result && (e.process_search = c.process_search);
        }
        function o(e, t) {
            return t && t.keepAccents || (e = a.normalize_accents(e)), e;
        }
        function i(e) {
            return e = e.replace(/["*:+@%$#()\[\]|]/g, " "), e = e.replace(/\s-([^\s])/g, " - $1"), 
            e = e.replace(/^[\s\-']+|[\s\-']+$/g, ""), e = e.replace(/\s+/g, " ");
        }
        var s = e("ScrapedSource").ScrapedSource, a = e("SourceScraperUtils").SourceScraperUtils;
        r.prototype = Object.create(s.prototype), r.prototype.constructor = r, r.Scheme = {
            identifier: "string",
            disabled: [ "undefined", "boolean" ],
            homepage: "string",
            description: [ "undefined", "string" ],
            searchengine: [ "undefined", "string" ],
            searchterms_site: [ "undefined", "string" ],
            searchterms_search: [ "undefined", "string" ],
            searchterms_result: [ "undefined", "string" ],
            r_url_result: [ "regexp" ],
            process_result_exclude_pattern: [ "undefined", "regexp" ],
            process_result_selector: [ "undefined", "string", "array" ],
            process_result_scraper_options: [ "undefined", "object" ],
            process_result_fallback: [ "undefined", "function" ],
            process_result_get_title: [ "undefined", "function" ],
            process_result_replace_url: [ "undefined", "array" ],
            process_search_replace_url: [ "undefined", "array" ],
            url_result: [ "string", "function" ],
            method_result: [ "undefined", "string" ],
            payload_result: [ "undefined", "string", "function" ],
            headers_result: [ "undefined", "object", "function" ],
            process_result: "function",
            url_search: [ "string", "function" ],
            method_search: [ "undefined", "string" ],
            payload_search: [ "undefined", "string", "function" ],
            headers_search: [ "undefined", "object", "function" ],
            process_search: "function"
        }, r.prototype.handleSearch = function(e, t) {
            return this.process_lyrics(e, t);
        };
        var c = {};
        c.url_result = function(e) {
            return a.search.get_url({
                engine: this.searchengine,
                site: this.searchterms_site,
                query: this.expand_vars(this.searchterms_result, e)
            });
        }, c.url_search = function(e) {
            return a.search.get_url({
                engine: this.searchengine,
                site: this.searchterms_site,
                query: this.expand_vars(this.searchterms_search, e)
            });
        }, c.process_result = function(e, t, r) {
            if (a.search.isSearchURL(r.url)) return this.process_search(e, t, r);
            if (this.process_result_exclude_pattern && this.process_result_exclude_pattern.test(e)) return t.fail(), 
            void 0;
            var n, o = a.toDOM(e), i = this.process_result_selector;
            if (Array.isArray(i)) for (var s = 0; !n && i.length > s; ++s) n = o.querySelector(i[s]); else n = o.querySelector(i);
            var c = a.toStringArray(n, this.process_result_scraper_options);
            if (c.length) {
                var l;
                if (this.process_result_get_title) {
                    if (l = this.process_result_get_title(o), !l) return t.fail(), void 0;
                } else l = o.title.replace(/\s+Lyrics\s*$/i, "");
                var u = {
                    lyrics: c,
                    title: l
                }, d = this.process_result_replace_url;
                if (d) {
                    for (var p = r.url, h = 0; d.length > h; h += 2) p = p.replace(d[h], d[h + 1]);
                    u.url = p;
                }
                t.found(u);
            } else this.process_result_fallback ? this.process_result_fallback(o, t, r) : t.fail();
        }, c.process_search = function(e, t, r) {
            for (var n = a.search.getResultsFromResponse(e, r), o = 0; n.length > o; ++o) {
                var i = n[o];
                if (this.r_url_result.test(i)) {
                    var s = this.process_search_replace_url;
                    if (s) for (var c = 0; s.length > c; c += 2) i = i.replace(s[c], s[c + 1]);
                    return t.found({
                        redir: i
                    }), void 0;
                }
            }
            t.fail();
        }, r.prototype.$ARTIST$SONG = function(e, t) {
            return e += "", e = e.replace(/\([^)]*\)/g, ""), e = e.replace(/\[[^\]]*\]/g, ""), 
            e = o(e, t), e = i(e);
        }, r.prototype.$ARTIST = function(e, t) {
            return this.$ARTIST$SONG(e.artist + "", t);
        }, r.prototype.$SONG = function(e, t) {
            return this.$ARTIST$SONG(e.song + "", t);
        }, r.prototype.$SEARCHTERMS = function(e, t) {
            if (e.artist && e.song) return i(e.artist + " - " + e.song);
            if (!e.videotitle && e.searchTerms) return e.searchTerms;
            var r = e.videotitle + "";
            return r = r.replace(/\([^)]*\)/g, " "), r = r.replace(/\[[^\]]*\]/g, " "), r = r.replace(/\b(ft|feat)\b[^\-]+/i, ""), 
            r = r.replace(/\bhd\b/i, ""), r = r.replace(/(?:w.(?:th)? ?)?((?:on)?.?screen ?)?lyrics?/i, ""), 
            r = r.replace(/\b(?:(?:piano|guitar|drum|acoustic|instrument(?:al)?) ?)?cover( by [^ )\]]+)?/i, ""), 
            r = r.replace(/\b(?:recorded )?live (?:at|@|on).+$/i, ""), r = r.replace(/\b\d{1,2}[\-.\/]\d{1,2}[\-.\/](?:(?:1[789]|20)\d{2}|\d{2})\b/, ""), 
            r = r.replace(/[(\[][^\])]*(?:20|19)\d{2}[^\])]*[)\]]/, ""), r = r.replace(/\b1[789]\d{2}|20\d{2}\b/, ""), 
            r = r.replace(/\bYouTube\b/gi, ""), r = r.replace(/\bre.?uploaded\b/i, ""), r = r.replace(/\bhigh[\- ]?quality\b/i, ""), 
            r = r.replace(/\boffici?al\b/i, ""), r = r.replace(/\b(minecraft|rsmv|mmv|(?:(?:naruto|bleach|avatar|toradora|final ?fantasy ?\d{0,2})[^a-z0-9]+)?amv)/i, ""), 
            r = r.replace(/\b(?:full )?music\b/gi, ""), r = r.replace(/\bdemo\b/i, ""), r = r.replace(/\bfan(?:[\- ]?(?:video|made))?\b/i, ""), 
            r = r.replace(/\b(videos?|audio|acoustic)/gi, ""), r = r.replace(/\b(on ?)?iTunes\b/i, ""), 
            r = r.replace(/(^|[^a-z0-9])(?:240|360|480)p\b/i, ""), r = r.replace(/\.(3gp?[2p]|as[fx]|avi|flv|m[4o]v|mpe?g?[34]|rm|webm|wmv)\s*$/i, ""), 
            r = o(r, t), r = r.replace(/(?:^|\s)([^a-z0-9 ])(\1+)(?=\s|$)/gi, " "), r = i(r);
        }, r.prototype.$encSEARCHTERMS = function(e, t) {
            return encodeURIComponent(this.$SEARCHTERMS(e), t);
        }, t.LyricsSource = r;
    }), r("sources/shared", {
        lyricsSources: []
    }), r("MultiLyricsSource", [ "require", "exports", "module", "LyricsSource", "sources/shared" ], function(e, t) {
        function r(e) {
            e && n(e), o.call(this, e);
        }
        function n(e) {
            !e.url_result && e.url_search && (e.url_result = e.url_search), !e.process_result && e.process_search && (e.process_result = e.process_search);
        }
        var o = e("LyricsSource").LyricsSource, i = e("sources/shared");
        r.prototype = Object.create(o.prototype), r.prototype.constructor = r, r.Scheme = {
            identifier: "string",
            disabled: [ "undefined", "boolean" ],
            homepage: "string",
            description: [ "undefined", "string" ],
            url_result: [ "undefined", "string", "function" ],
            process_result: [ "undefined", "function" ],
            url_search: [ "string", "function" ],
            process_search: [ "undefined", "function" ],
            getSources: [ "undefined", "function" ],
            getResultsFromResponse: "function"
        }, r.prototype.r_url_result = /$./, r.prototype.process_result = r.prototype.process_search = function(e, t) {
            for (var r = this.getSources(), n = this.getResultsFromResponse(e), o = n.length, i = 0; r.length > i; ++i) {
                var s = r[i];
                if (s.disabled) for (var a = s.r_url_result, c = 0; o > c; ++c) {
                    var l = n[c];
                    if (a.test(l)) return t.found({
                        redir: l,
                        redirSource: s
                    }), void 0;
                }
            }
            t.fail();
        }, r.prototype.getSources = function() {
            var e = i.lyricsSources;
            return e.length || console && console.log("Used MultiLyricsSource::getSources before shared.lyricsSources was ready!"), 
            e;
        }, t.MultiLyricsSource = r;
    }), r("sources/lyrics.wikia.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !1,
            identifier: "lyrics.wikia.com",
            homepage: "http://lyrics.wikia.com/",
            description: "The biggest lyrics database, containing millions of lyrics in several languages.",
            searchterms_search: '"This song is performed by" $SEARCHTERMS',
            r_url_result: /^https?:\/\/lyrics\.wikia\.com\/(?!(?:Category|User|Help|File|MediaWiki|LyricWiki)(?:_Talk)?:|(?:Talk|User_blog|Top_10_list):)[^:]+:./i,
            url_result: "http://lyrics.wikia.com/$ARTIST:$SONG",
            process_result_selector: ".lyricbox",
            process_result_fallback: function(e, t) {
                var r = e.querySelector(".redirectText a[href]");
                return r && (r = r.getAttribute("href") || "", "/" === r.charAt(0) && (r = "http://lyrics.wikia.com" + r), 
                r) ? (t.found({
                    redir: r
                }), void 0) : (t.fail(), void 0);
            },
            process_result_get_title: function(e) {
                var t = e.title.split(" Lyrics - Lyric Wiki")[0].replace(":", " - ");
                return t = t.replace(/^(Gracenote|LyricFind):/, "");
            },
            $ARTIST$SONG: function(e, t) {
                return (t || (t = {})).keepAccents = !0, e = r.prototype.$ARTIST$SONG.call(this, e, t), 
                e = e.replace(/ /g, "_"), e = e.replace(/^_+|_+$/g, ""), e = e.replace(/(_|^)(.)/g, function(e, t, r) {
                    return t + r.toUpperCase();
                });
            },
            $ARTIST: function(e, t) {
                var n = r.prototype.$ARTIST.call(this, e, t);
                return /^(Category|User|Help|File|Special|Talk)$/i.test(n) && (n += "_(Artist)"), 
                n;
            }
        });
    }), r("sources/multi/bing.com", [ "require", "exports", "module", "MultiLyricsSource", "SourceScraperUtils" ], function(e, t) {
        var r = e("MultiLyricsSource").MultiLyricsSource, n = e("SourceScraperUtils").SourceScraperUtils.search.engines.bing;
        t.source = new r({
            disabled: !1,
            identifier: "bing.com",
            homepage: "http://www.bing.com/",
            description: "Search in all known lyrics sites at once.\nIt is recommended to put this source near the top of the list.\nOnly disabled sources are used in the search query.",
            url_search: function(e) {
                var t = this.getSources();
                if (!t.length) return "";
                for (var r = "/search?q=" + encodeURIComponent(this.$SEARCHTERMS(e) + " (site:" + t[0].searchterms_site), n = 1; t.length > n; ++n) {
                    var o = encodeURIComponent(" OR site:" + t[n].searchterms_site);
                    if (o.length + r.length >= 2047) break;
                    r += o;
                }
                return r += ")", r = "http://www.bing.com" + r;
            },
            getResultsFromResponse: n.getResultsFromResponse
        });
    }), r("sources/lyrics.com", [ "require", "exports", "module", "LyricsSource", "SourceScraperUtils" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource, n = e("SourceScraperUtils").SourceScraperUtils;
        t.source = new r({
            disabled: !1,
            identifier: "lyrics.com",
            homepage: "http://www.lyrics.com/",
            description: "Millions of lyrics in several languages.",
            r_url_result: /^https?:\/\/www\.lyrics\.com\/.+-lyrics-.+\.html$/i,
            url_result: "http://www.lyrics.com/$SONG-lyrics-$ARTIST.html",
            method_search: "POST",
            headers_search: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            payload_search: "what=all&keyword=$encSEARCHTERMS",
            url_search: "http://www.lyrics.com/search.php?what=all&keyword=$encSEARCHTERMS",
            process_result_exclude_pattern: />Submit Lyrics</,
            process_result_selector: "#lyrics,#lyric_space",
            process_result_scraper_options: {
                tags: /^(?:[buiap]|div|strong|em)$/i,
                flushBefore: /^(p|br|div)$/i,
                flushAfter: /^(p|br|div)$/i
            },
            process_search: function(e, t) {
                var r = n.toDOM(e), o = r.querySelector('a[href^="/"][href*="-lyrics-"][href$=".html"].lyrics_preview'), i = o && o.getAttribute("href");
                i ? (i = "http://www.lyrics.com" + i, t.found({
                    redir: i
                })) : t.fail();
            },
            $ARTIST$SONG: function(e, t) {
                return e = r.prototype.$ARTIST$SONG.call(this, e, t), e = e.toLowerCase(), e = e.replace(/[^a-z0-9\- ]/g, ""), 
                e = e.replace(/ /g, "-"), e = e.replace(/-{2,}/, "-"), e = e.replace(/^-|-$/, "");
            }
        });
    }), r("sources/metrolyrics.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !1,
            identifier: "metrolyrics.com",
            homepage: "http://www.metrolyrics.com/",
            description: "Millions of lyrics in several languages.",
            url_result: "http://m.metrolyrics.com/$SONG-lyrics-$ARTIST.html",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^https?:\/\/(?:m|www)\.metrolyrics\.com\/[a-z0-9\-]+-lyrics-[a-z0-9\-]+\.html$/,
            process_result_exclude_pattern: /Looks like we don.t have the lyrics just yet|Unfortunately, we don.t/,
            process_result_selector: [ "#lyrics-body-text", ".lyrics-body,.lyricsbody,.gnlyricsbody" ],
            process_result_scraper_options: {
                tags: /^(?:[buip]|strong|em)$/i,
                flushBefore: /^(br|p)$/i,
                flushAfter: /^p$/i
            },
            process_result_get_title: function(e) {
                return e.title.replace(/ Lyrics(?:\s*\| MetroLyrics)?\s*$/i, "");
            },
            process_result_replace_url: [ /^(https?:\/\/)m\./, "$1www." ],
            process_search_replace_url: [ /^(https?:\/\/)www\./, "$1m." ],
            $ARTIST$SONG: function(e, t) {
                return e = r.prototype.$ARTIST$SONG.call(this, e, t), e = e.toLowerCase(), e = e.replace(/([a-z])!([a-z])/g, "$1i$2"), 
                e = e.replace(/[^a-z0-9+\- ]/g, ""), e = e.replace(/[\- ]+/g, "-"), e = e.replace(/^-+|-+$/g, "");
            }
        });
    }), r("sources/lyricsmania.com", [ "require", "exports", "module", "LyricsSource", "SourceScraperUtils" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource, n = e("SourceScraperUtils").SourceScraperUtils;
        t.source = new r({
            disabled: !0,
            identifier: "lyricsmania.com",
            homepage: "http://www.lyricsmania.com/",
            description: "Millions of English, French, German, Spanish and Italian lyrics (and others).",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^https?:\/\/www\.lyricsmania\.com\/(?!.*_(?:traduzione|ubersetzung|traduction|traduccion|traducao)_lyrics).+_lyrics_.+\.html$/i,
            url_result: "http://www.lyricsmania.com/$SONG_lyrics_$ARTIST.html",
            process_result_selector: "#songlyrics_h,#songlyrics",
            process_result_fallback: function(e, t) {
                var r = e.querySelector('table[width="100%"] td[width="100%"]'), o = n.toStringArray(r, this.process_result_scraper_options);
                if (o.length) {
                    var i = /^(.*?) \(([^)]*)\) lyrics /.exec(e.title);
                    i ? (i = i[2] + " - " + i[1], t.found({
                        lyrics: o,
                        title: i
                    })) : t.fail();
                } else t.fail();
            },
            $ARTIST$SONG: function(e, t) {
                return e = r.prototype.$ARTIST$SONG.call(this, e, t), e = e.toLowerCase(), e = e.replace(/&/g, "and"), 
                e = e.replace("[ost]", "_soundtrack_"), e = e.replace(/[ \/]/g, "_"), e = e.replace(/[^a-z0-9!,_\-@*:$°]/g, "");
            }
        });
    }), r("sources/azlyrics.com", [ "require", "exports", "module", "LyricsSource", "SourceScraperUtils" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource, n = e("SourceScraperUtils").SourceScraperUtils;
        t.source = new r({
            disabled: !1,
            identifier: "azlyrics.com",
            homepage: "http://www.azlyrics.com/",
            description: "Hundred thousands of mostly English lyrics.",
            r_url_result: /^https?:\/\/www\.azlyrics\.com\/lyrics\/[^\/]+\/[^\/]+\.html$/i,
            url_result: "http://www.azlyrics.com/lyrics/$ARTIST/$SONG.html",
            method_search: "GET",
            url_search: "http://search.azlyrics.com/search.php?q=$encSEARCHTERMS",
            process_result_selector: 'div[style="margin-left:10px;margin-right:10px;"]',
            process_result_get_title: function(e) {
                var t = e.title.split("LYRICS -");
                return t[0] = t[0].replace(/([A-Z])(\S*)/g, function(e, t, r) {
                    return t.toUpperCase() + r.toLowerCase();
                }), t = t.join("-");
            },
            process_search: function(e, t) {
                var r = n.toDOM(e), o = r.querySelector('a[href^="http://www.azlyrics.com/lyrics/"]');
                o ? t.found({
                    redir: o.href
                }) : t.fail();
            },
            $ARTIST$SONG: function(e, t) {
                return e = r.prototype.$ARTIST$SONG.call(this, e, t), e = e.toLowerCase(), e = e.replace(/([a-z])!([a-z])/g, "$1i$2"), 
                e = e.replace(/^(the|an?) /, ""), e = e.replace(/[^a-z0-9]/g, "");
            },
            $SEARCHTERMS: function(e, t) {
                var n = r.prototype.$SEARCHTERMS.call(this, e, t);
                return e.videotitle && (n = n.replace(/\s+-\s+/g, " ")), n;
            }
        });
    }), r("sources/lyricstime.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !1,
            identifier: "lyricstime.com",
            homepage: "http://www.lyricstime.com/",
            description: "Millions of lyrics in several languages.",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^https?:\/\/www\.lyricstime\.com\/.+-lyrics\.html$/i,
            url_result: "http://www.lyricstime.com/$ARTIST-$SONG-lyrics.html",
            process_result_selector: "#songlyrics > p",
            $ARTIST$SONG: function(e, t) {
                return (t || (t = {})).keepAccents = !0, e = r.prototype.$ARTIST$SONG.call(this, e, t), 
                e = e.toLowerCase(), e = e.replace(/([a-z])!([a-z])/g, "$1i$2"), e = e.replace(/[^a-z0-9]/g, "-"), 
                e = e.replace(/-{2,}/g, "-"), e = e.replace(/^-+|-+$/g, "");
            }
        });
    }), r("sources/lyricsmode.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !1,
            identifier: "lyricsmode.com",
            homepage: "http://www.lyricsmode.com/",
            description: "Millions of lyrics in many languages.",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^https?:\/\/www\.lyricsmode\.com\/lyrics\/(.)\/\1[^\/]+\/.+\.html$/i,
            url_result: "http://www.lyricsmode.com/lyrics/$ARTISTFIRSTLETTER/$ARTIST/$SONG.html",
            process_result_selector: "#lyrics_text",
            $ARTIST$SONG: function(e, t) {
                return e = r.prototype.$ARTIST$SONG.call(this, e, t), e = e.toLowerCase(), e = e.replace(/[ \-]/g, "_"), 
                e = e.replace(/([a-z])!([a-z])/g, "$1i$2"), e = e.replace(/[^a-z0-9_\-]/g, ""), 
                e = e.replace(/_{2,}/g, "_"), e = e.replace(/^_+|_+$/g, "");
            },
            $ARTISTFIRSTLETTER: function(e) {
                return this.$ARTIST(e).charAt(0);
            }
        });
    }), r("sources/magistrix.de", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "magistrix.de",
            homepage: "http://magistrix.de/lyrics/",
            description: "German source with hundred thousands of lyrics (German, English and others).",
            searchterms_site: "magistrix.de/lyrics",
            searchterms_result: "SONGTEXT $ARTIST $SONG",
            searchterms_search: "SONGTEXT $SEARCHTERMS",
            r_url_result: /^http:\/\/www\.magistrix\.de\/lyrics\/[^\/]+\/(?!.*\bUebersetzung-d+\.html$)[^\/]+-\d+\.html/i,
            process_result_selector: ".lyric-content > p",
            process_result_scraper_options: {
                isFirstChild: !0,
                tags: /^([buip]|strong|em)$/i,
                flushBefore: /^(br|p)$/i,
                flushAfter: /^p$/i
            },
            process_result_get_title: function(e) {
                var t = e.title.replace("Songtext: ", "").replace(/\s*Lyrics(\s*\|\s*Magistrix\.de)?\s*$/, "");
                return t;
            }
        });
    }), r("sources/leoslyrics.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "leoslyrics.com",
            homepage: "http://www.leoslyrics.com/",
            description: "Hundred thousands of lyrics in many languages, popular among Idian users.",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^https?:\/\/www\.leoslyrics\.com\/[^\/]+\/.+-lyrics\/?$/i,
            url_result: "http://www.leoslyrics.com/$ARTIST/$SONG-lyrics/",
            process_result_selector: ".song > div",
            process_result_get_title: function(e) {
                var t = e.querySelector(".title-header h2 + ul > li a");
                t = t && t.textContent.replace(/\s*Lyrics\s*$/i, "").trim();
                var r = e.querySelector(".title-header h2");
                r = r && r.textContent.replace(/\s*Lyrics\s*$/i, "").trim();
                var n = t && r ? t + " - " + r : e.title.replace(/\sLYRICS$/i, "");
                return n;
            },
            $ARTIST$SONG: function(e, t) {
                return e = r.prototype.$ARTIST$SONG.call(this, e, t), e = e.toLowerCase(), e = e.replace(/[.' +]/g, "-"), 
                e = e.replace(/[^a-z0-9!\-]/g, ""), e = e.replace(/-{2,}/g, "-");
            }
        });
    }), r("sources/vagalume.com.br", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "vagalume.com.br",
            homepage: "http://www.vagalume.com.br/",
            description: "Brazilian site providing millions of lyrics in many languages.",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^http:\/\/(www|m)(\.vagalume\.com\.br\/(?!(my|top100|especiais|news|plugin|facebook|browse|playlisteiros)\/).*?\/(?!(discografia|fotos|popularidade|relacionados|news)\b).*?)$/i,
            url_result: "http://www.vagalume.com.br/$ARTIST/$SONG.html",
            process_result_selector: "#lyr_original > div, .lyric > pre",
            process_result_scraper_options: {
                tags: /^(?:[buip]|strong|em|span)$/i,
                flushBefore: /^(?:br|p)$/i,
                flushAfter: /^p$/i
            },
            process_result_get_title: function(e) {
                var t = e.title.replace(/ - VAGALUME$/i, ""), r = t.split(" - ");
                return 2 === r.length ? r[1] + " - " + r[0] : t;
            },
            process_result_replace_url: [ /^(https?:\/\/)m\./, "$1www." ],
            process_search_replace_url: [ /-cifrada(\.html)?$/i, "$1" ],
            $ARTIST$SONG: function(e, t) {
                return e = r.prototype.$ARTIST$SONG.call(this, e, t), e = e.toLowerCase(), e = e.replace(/([a-z])!([a-z])/g, "$1i$2"), 
                e = e.replace(/[ .]/g, "-"), e = e.replace(/[^a-z0-9\-]/g, ""), e = e.replace(/-{2,}/g, "-"), 
                e = e.replace(/^-|-$/g, "");
            }
        });
    }), r("sources/letras.mus.br", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "letras.mus.br",
            homepage: "http://letras.mus.br/",
            description: "A big Brazilian source with millions of lyrics (also in many other languages).",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^https?:\/\/letras\.mus\.br\/.*?\/.*?\//i,
            url_result: "http://letras.mus.br/$ARTIST/$SONG/",
            process_result_selector: "#div_letra,#letra_original",
            process_result_scraper_options: {
                tags: /^(?:[buip]|strong|em|div)$/i,
                flushBefore: /^(?:br|p|div)$/i,
                flushAfter: /^(?:p|div)$/i,
                lineAfterFlush: /^p$/i
            },
            process_result_get_title: function(e) {
                var t, r = e.querySelector("#identificador_musica"), n = e.querySelector("#identificador_artista");
                return t = r && n ? r.textContent + " - " + n.textContent : e.title.replace(/\([^)]+\)/g, "");
            },
            $ARTIST$SONG: function(e, t) {
                return e = r.prototype.$ARTIST$SONG.call(this, e, t), e = e.toLowerCase(), e = e.replace(/[_ ]/g, "-"), 
                e = e.replace(/[^a-z0-9\-]/g, ""), e = e.replace(/-{2,}/g, "-"), e = e.replace(/^-+|-+$/g, "");
            }
        });
    }), r("algorithms", [ "require", "exports", "module", "normalize_accents" ], function(e, t) {
        function r(e, t) {
            e += "", t || (e = e.toLocaleLowerCase(), e = s(e), e = e.replace(/[.,?\/"':;|\\\]\[\{\}\(\)\-_=+!@#$%\^&*~`]/g, " ")), 
            e = (" " + e + " ").replace(/\s+/g, " ");
            for (var r = {}, n = -1, o = e.length - 1; o > ++n; ) {
                var i = e.substr(n, 2);
                r[i] = r[i] ? r[i] + 1 : 1;
            }
            return {
                length: o,
                hash: r
            };
        }
        function n(e, t, n) {
            var o = r(e, n), i = r(t, n), s = 0, a = o.length + i.length;
            if (!o.length || !i.length) return a ? 0 : 1;
            var c, l;
            i.length > o.length ? (c = o.hash, l = i.hash) : (c = i.hash, l = o.hash);
            for (var u = Object.keys(c), d = 0; u.length > d; ++d) {
                var p = u[d];
                l[p] && (s += c[p] > l[p] ? l[p] : c[p]);
            }
            return 2 * s / a;
        }
        function o(e) {
            if (-1 == e.indexOf("-")) return null;
            e = e.match(/^(.+?)\s-\s(.+)/) || e.match(/^(.+?)\s-(.+)/) || e.match(/^(.+?)-\s(.+)/) || e.match(/^(.+?)-(.+)/);
            var t = e[1].trim(), r = e[2].trim();
            return t && r ? [ t, r ] : null;
        }
        function i(e, t, r) {
            r = !isNaN(r) && isFinite(r) ? +r : .3;
            var i = o(e), s = o(t);
            return i && s ? n(i[0], s[0]) > r && n(i[1], s[1]) > r : n(e, t) > r;
        }
        var s = e("normalize_accents").normalize_accents;
        t.getSimilarityCoefficient = n, t.splitSongTitle = o, t.isTitleSimilar = i;
    }), r("sources/darklyrics.com", [ "require", "exports", "module", "LyricsSource", "SourceScraperUtils", "algorithms" ], function(e, t) {
        function r(e) {
            return e.replace(/[^a-z0-9'. ]/i, " ").replace(/\s+/, " ").trim();
        }
        function n(e) {
            return e && e.replace(/^\s*\d+\./, "").trim() || "";
        }
        function o(e, t) {
            for (var r, o = -1/0, i = 0; e.length > i; i++) {
                var s = e[i], c = n(s.textContent).toLowerCase(), l = a.getSimilarityCoefficient(c, t);
                l > o && (o = l, r = s);
            }
            return o > .3 ? r : null;
        }
        var i = e("LyricsSource").LyricsSource, s = e("SourceScraperUtils").SourceScraperUtils, a = e("algorithms");
        t.source = new i({
            disabled: !0,
            identifier: "darklyrics.com",
            homepage: "http://www.darklyrics.com/",
            description: "Dark Lyrics is provides Metal lyrics for 4500+ bands.",
            r_url_result: /^https?:\/\/www\.darklyrics\.com\/lyrics\/[^\/]+\/[^\/]+\.html$/i,
            url_result: function(e) {
                return "http://www.darklyrics.com/search?q=" + encodeURIComponent(r(this.$ARTIST(e)) + " " + r(this.$SONG(e)));
            },
            url_search: function(e) {
                return "http://www.darklyrics.com/search?q=" + encodeURIComponent(r(this.$SEARCHTERMS(e)));
            },
            process_result: function(e, t, r) {
                if (/^https?:\/\/www\.darklyrics\.com\/search/.test(r.url)) return this.process_search(e, t, r);
                var i = s.toDOM(e), a = i.querySelectorAll("h3 > a");
                if (!a) return t.fail(), void 0;
                var c = i.title.split(/\sLyrics\s/i, 1)[0].toLowerCase(), l = r.query.song && this.$SONG(r.query);
                l || (l = this.$SEARCHTERMS(r.query) || "", l = l.toLowerCase().replace(c, " "), 
                l = l.replace(/\s+/, " ").replace(/^[\s\-]+|[\s\-]+$/g, ""));
                var u = o(a, l);
                if (!u || !u.parentNode) return t.fail(), void 0;
                var d = s.toStringArray(u.parentNode.nextSibling, {
                    isFirstChild: !0,
                    isEndNode: function(e) {
                        return "H3" === e.nodeName.toUpperCase();
                    }
                });
                if (d.length) {
                    c = c.replace(/([a-z])(\S*)/g, function(e, t, r) {
                        return t.toUpperCase() + r.toLowerCase();
                    }), l = n(u.textContent);
                    var p = c + " - " + l;
                    t.found({
                        lyrics: d,
                        title: p,
                        url: r.url.replace(/(#\d*)?$/, "#" + u.name)
                    });
                } else t.fail();
            },
            process_search: function(e, t, r) {
                var n = s.toDOM(e), i = n.querySelectorAll('a[href*="lyrics/"][href*=".html#"]'), a = o(i, this.$SEARCHTERMS(r.query)), c = a && a.getAttribute("href").replace(/^(?!http)/i, "http://www.darklyrics.com/");
                return /^http:\/\/www\.darklyrics\.com\/lyrics\//i.test(c) ? (t.found({
                    redir: c
                }), void 0) : (t.fail(), void 0);
            }
        });
    }), r("sources/metal-archives.com", [ "require", "exports", "module", "LyricsSource", "SourceScraperUtils", "algorithms" ], function(e, t) {
        function r(e, t, r) {
            if (e) {
                for (var n = -1, o = -1/0, s = 0; e.length > s; s++) {
                    var a = r(e[s]);
                    if (a) {
                        var c = i.getSimilarityCoefficient(a, t);
                        if (c > o && (n = s, o = c, 1 == c)) break;
                    }
                }
                return o > .3 ? n : -1;
            }
        }
        var n = e("LyricsSource").LyricsSource, o = e("SourceScraperUtils").SourceScraperUtils, i = e("algorithms"), s = /^https?:\/\/www\.metal-archives\.com\/search\/ajax-advanced\/searching\/songs\/\?songTitle=(.*?)&bandName=(.*)/, a = /^https?:\/\/www\.metal-archives\.com\/albums\/([^\/]+)\/([^\/]+).*/i, c = /"https?:\/\/www\.metal-archives\.com\/albums\/([^\/]+)\/([^\/]+).*?"/i;
        t.source = new n({
            disabled: !0,
            identifier: "metal-archives.com",
            homepage: "http://www.metal-archives.com/",
            description: "The Metal Archives is an extensive database (90k+ bands) of metal lyrics.",
            r_url_result: a,
            url_result: function(e) {
                return "http://www.metal-archives.com/search/ajax-advanced/searching/songs/?songTitle=" + encodeURIComponent(this.$SONG(e)) + "&bandName=" + encodeURIComponent(this.$ARTIST(e));
            },
            url_search: function(e) {
                return o.search.get_url({
                    site: "metal-archives.com/albums",
                    query: this.$SEARCHTERMS(e)
                });
            },
            process_result: function(e, t, r) {
                if (s.test(r.url) || a.test(r.url)) return this.process_search(e, t, r);
                if (/^\s*(<[^>]*>)?\(lyrics not available\)/i.test(e)) return t.fail(), void 0;
                var n = o.toDOM(e), i = n.querySelectorAll("h3 > a");
                if (!i) return t.fail(), void 0;
                var c = o.toStringArray(n.body);
                c.length ? t.found({
                    lyrics: c,
                    title: r.tempData && r.tempData.song_title || "(N/A)",
                    url: r.tempData && r.tempData.song_url || r.url
                }) : t.fail();
            },
            process_search: function(e, t, n) {
                if (!/^https?:\/\/www\.metal-archives\.com\//.test(n.url)) {
                    for (var i = o.search.getResultsFromResponse(e, n), l = 0; i.length > l; l++) {
                        var u = i[l];
                        if (a.test(u)) return t.found({
                            redir: u
                        }), void 0;
                    }
                    return t.fail(), void 0;
                }
                var d, p, h, f, m, g;
                if (s.test(n.url)) try {
                    var y = JSON.parse(e);
                    if (d = this.$ARTIST(n.query), p = this.$SONG(n.query), !y || !y.aaData || !y.aaData.length) return t.fail(), 
                    void 0;
                    if (f = r(y.aaData, d + "/" + p, function(e) {
                        var t = e[1] && c.exec(e[1]);
                        return t ? t[1] + "/" + t[2] : void 0;
                    }), -1 === f) return t.fail(), void 0;
                    var v = y.aaData[f];
                    m = c.exec(v[1]), h = m[0], d = v[0].match(/[^><]+(?=<\/a>)/i), d = d && d[0].trim() || decodeURIComponent(m[1]).replace(/_/, " "), 
                    p = v[3], g = /lyricsLink_(\d+)/.exec(v[4]), g = g ? g[1] : 0;
                } catch (b) {
                    return t.fail(), void 0;
                } else if (a.test(n.url)) {
                    var L = o.toDOM(e), S = L.querySelectorAll("tr[id^=song]");
                    d = L.querySelector(".band_name"), d ? d = d.textContent.trim() : (m = a.match(n.url), 
                    d = decodeURIComponent(m[1]).replace(/_/, " ")), p = n.query.song && this.$SONG(n.query);
                    var w = "";
                    if (p || (p = this.$SEARCHTERMS(n.query), w = d), p = p.toLowerCase(), f = r(S, p, function(e) {
                        return /\d/.test(e.id) ? (e = e.previousElementSibling, e && e.cells && e.cells[1] ? w + " " + e.cells[1].textContent.trim().toLowerCase() : void 0) : void 0;
                    }), -1 === f) return t.fail(), void 0;
                    var x = S[f];
                    h = n.url, p = x.previousElementSibling.cells[1].textContent.trim(), g = x.id.replace(/\D+/, "");
                }
                t.found({
                    redir: "http://www.metal-archives.com/release/ajax-view-lyrics/id/" + g,
                    tempData: {
                        song_url: h,
                        song_title: d + " - " + p
                    }
                });
            }
        });
    }), r("sources/musica.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "musica.com",
            homepage: "http://www.musica.com/",
            description: "Spanish site with 800k lyrics.",
            searchterms_result: '"letras.asp?letra=" "Letra de" "$SONG" de "$ARTIST"',
            searchterms_search: '"Letra de" "letras.asp?letra=" $SEARCHTERMS',
            r_url_result: /^https?:\/\/www\.musica\.com\/letras\.asp\?.*?letra=\d+/i,
            process_result_selector: 'font[style*="line-height"][style*=family]',
            process_result_get_title: function(e) {
                var t, r, n = e.querySelectorAll('h1 a[href*="letras.asp?letra"]');
                return 2 === n.length ? (r = n[0].textContent.trim(), t = n[1].textContent.replace(/\([^)]*\)\s*$/, "").trim()) : (n = e.title.match(/^Letra de (.+) de (.+) - MUSICA\.COM$/)) && (r = n[1], 
                t = n[2]), r && t ? r + " " + t : void 0;
            },
            process_search_replace_url: [ "version=movil", "" ],
            $ARTIST$SONG: function(e, t) {
                return e = r.prototype.$ARTIST$SONG.call(this, e, t), e = e.replace(/([a-z])!([a-z])/gi, "$1i$2"), 
                e = e.replace(/[":']/g, " "), e = e.replace(/ +/, " ");
            }
        });
    }), r("sources/shironet.mako.co.il", [ "require", "exports", "module", "LyricsSource", "SourceScraperUtils" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource, n = e("SourceScraperUtils").SourceScraperUtils, o = function(e) {
            return /[\u0590-\u05FF]/.test(e);
        };
        t.source = new r({
            disabled: !0,
            identifier: "shironet.mako.co.il",
            homepage: "http://shironet.mako.co.il/",
            description: "The best source for Hebrew lyrics.",
            r_url_result: /^https?:\/\/shironet\.mako\.co\.il\/artist\?type=lyrics/,
            url_result: function(e) {
                return this.url_search(e);
            },
            url_search: function(e) {
                return e = this.$SEARCHTERMS(e), o(e) ? "http://shironet.mako.co.il/searchSongs?type=lyrics&q=" + encodeURIComponent(e) : "";
            },
            process_result: function(e, t, r) {
                if (/^https?:\/\/shironet\.mako\.co\.il\/searchSongs/.test(r.url)) return this.process_search(e, t, r);
                var o = n.toDOM(e), i = o.querySelector(".artist_lyrics_text"), s = n.toStringArray(i);
                if (s.length) {
                    var a = o.querySelector(".artist_singer_title");
                    a = a && a.textContent.trim();
                    var c = o.querySelector(".artist_song_name_txt");
                    c = c && c.textContent.trim();
                    var l = a + " - " + c;
                    t.found({
                        lyrics: s,
                        title: l
                    });
                } else t.fail();
            },
            process_search: function(e, t) {
                var r = n.toDOM(e), o = r.querySelector('a[href*="/artist?type=lyrics"][class*="search"]'), i = o && o.getAttribute("href").replace(/^\//i, "http://shironet.mako.co.il/");
                i ? t.found({
                    redir: i
                }) : t.fail();
            },
            $ARTIST$SONG: function(e, t) {
                return (t || (t = {})).keepAccents = !0, e = r.prototype.$ARTIST$SONG.call(this, e, t), 
                e = e.replace(/[^\u0590-\u05FF\d\-]+/g, " "), e = e.replace(/^[ \-]+|[ \-]+$/g, ""), 
                e = e.replace(/ +/g, " ");
            },
            $SEARCHTERMS: function(e, t) {
                var r, n = function(e) {
                    return e = e.replace(/[^\u0590-\u05FF\d\-]+/g, " "), e = e.replace(/(מילים לשיר|עם מילים|עם כתוביות|קאבר|אקוסטי|בהופעה)/g, " "), 
                    e = e.replace(/^[ \-]+|[ \-]+$/g, ""), e = e.replace(/ +/g, " ");
                };
                if (!e.videotitle && (r = e.searchTerms, !r)) {
                    var o = this.$ARTIST(e, t), i = this.$SONG(e, t);
                    o && i && (r = n(o + " - " + i));
                }
                return !r && e.videotitle && (r = e.videotitle, r = r.replace(/\([^)]*\)/g, " "), 
                r = r.replace(/\[[^\]]*\]/g, " "), r = n(r), r || (r = n(e.videotitle))), r;
            }
        });
    }), r("sources/angolotesti.it", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "angolotesti.it",
            homepage: "http://www.angolotesti.it/",
            description: "The largest lyrics provider of Italy, with hundred thousands of lyrics.",
            searchterms_result: "$SONG Testo $ARTIST",
            searchterms_search: "$SEARCHTERMS Testo",
            r_url_result: /^https?:\/\/(?:www\.)?angolotesti\.it\/([0-9a-z])\/[^\/]*\d\/[^\/]*\d/i,
            process_result_selector: ".testo",
            process_result_get_title: function(e) {
                return e.title.replace(/^(.+?) Testo (.+?)$/, "$2 - $1");
            }
        });
    }), r("sources/paroles2chansons.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "paroles2chansons.com",
            homepage: "http://www.paroles2chansons.com/",
            description: "Lyrics for French and popular foreign songs.",
            searchterms_result: "Paroles $SONG - $ARTIST lyrics",
            searchterms_search: "Paroles $SEARCHTERMS lyrics",
            r_url_result: /^https?:\/\/(www|m)(\.paroles2chansons\.com\/paroles-[^\/]+\/paroles-.*?.html.*)$/i,
            process_result_selector: "#content > p, #paroles",
            process_result_get_title: function(e) {
                return e.title.replace(/^Paroles /, "").replace(/ \(lyrics\)$/, "");
            },
            process_result_replace_url: [ /^(https?:\/\/)m\./, "$1www." ],
            process_search_replace_url: [ /^(https?:\/\/)www\./, "$1m." ]
        });
    }), r("sources/rapgenius.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "rapgenius.com",
            homepage: "http://rapgenius.com/",
            description: "Over 100k of rap, rock and some pop lyrics.",
            searchterms_result: "$ARTIST $SONG Lyrics",
            searchterms_search: "$SEARCHTERMS Lyrics",
            r_url_result: /^https?:\/\/(?:rock\.)?rapgenius\.com\/[^\/]+-lyrics\/?$/,
            process_result_selector: ".lyrics",
            process_result_scraper_options: {
                tags: /^(?:[abuip]|strong|em)$/i,
                flushAfter: /^p$/i,
                lineAfterFlush: /^p$/i
            },
            process_result_get_title: function(e) {
                var t = e.querySelector(".song_title");
                return t = t ? t.textContent.trim().replace(/–/g, "-").replace(/ Lyrics$/, "") : e.title.split("|", 1)[0];
            }
        });
    }), r("sources/tekstowo.pl", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "tekstowo.pl",
            homepage: "http://www.tekstowo.pl/",
            description: "The largest Polish lyrics site with 700k+ lyrics.",
            searchterms_result: "$ARTIST - $SONG",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^https?:\/\/www\.tekstowo\.pl\/piosenka,[^,]+,[^,]+.html$/i,
            process_result_selector: ".song-text > h2",
            process_result_scraper_options: {
                isFirstChild: !0
            },
            process_result_get_title: function(e) {
                return e.title.split(" - tekst piosenki, ", 1)[0];
            }
        });
    }), r("sources/animelyrics.com", [ "require", "exports", "module", "LyricsSource", "SourceScraperUtils" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource, n = e("SourceScraperUtils").SourceScraperUtils, o = function(e, t, r) {
            var o = e.indexOf(t);
            if (-1 !== o) {
                var i = e.indexOf(r, o);
                if (-1 !== i) {
                    e = e.substring(o, i + r.length);
                    var s = n.toDOM("<body>" + e + "</body>");
                    return s.body.firstElementChild;
                }
            }
        };
        t.source = new r({
            disabled: !0,
            identifier: "animelyrics.com",
            homepage: "http://www.animelyrics.com/",
            description: "Anime, J-Pop / J-Rock - Japanese lyrics (Romaji and Kanji). English translations are often available.",
            searchterms_result: "$ARTIST $SONG",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^http:\/\/www\.animelyrics\.com\/(?:anime|game|jpop|dance|dancecd|doujin)\/[^\/]+\/[^\/]+\.(?:htm|jis)$/i,
            process_result: function(e, t, r) {
                if (n.search.isSearchURL(r.url)) return this.process_search(e, t, r);
                var i, s = o(e, "<div id=kanji>", "</div>");
                if (s && (i = n.toStringArray(s, {
                    tags: /^a$/i
                })), !s && (s = o(e, "<table border=0 cellspacing=0>", "</table>"))) {
                    for (var a = document.createDocumentFragment(), c = s.querySelectorAll(".romaji .lyrics"), l = 0; c.length > l; ++l) a.appendChild(c[l]);
                    i = n.toStringArray(a, {
                        tags: /^span$/i,
                        flushAfter: /^span$/i
                    });
                }
                if (!s && (s = o(e, "<span class=lyrics>", "</span>")) && (i = n.toStringArray(s)), 
                i && i.length) {
                    var u, d = o(e, '<ul id="crumbs">', "</ul>").querySelectorAll("li"), p = d[d.length - 2], h = d[d.length - 1];
                    p && h ? (p = p.textContent, h = h.textContent.split(" - ", 1)[0], u = p.length > 30 ? h : p + " - " + h) : u = "?", 
                    t.found({
                        lyrics: i,
                        title: u
                    });
                } else t.fail();
            }
        });
    }), r("sources/mojim.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "mojim.com",
            homepage: "http://mojim.com/",
            description: "Millions of Asian (Chinese, Japanese, Korean, ...) and English lyrics.",
            searchengine: "soso",
            searchterms_result: "$SONG $ARTIST mojim",
            searchterms_search: "$SEARCHTERMS mojim",
            r_url_result: /^http:\/\/(?:[^\/]*\.)?mojim\.com\/(?:cn|jp|tw|us)y\d+x\d+x\d(?:\.htm)?$/i,
            process_result_selector: "#fsZ > dl > dd",
            process_result_scraper_options: {
                tags: /^a$/i,
                ignoreNode: function(e) {
                    return 1 === e.nodeType && ("A" === e.tagName.toUpperCase() || !!e.querySelector("a"));
                }
            },
            process_result_get_title: function(e) {
                var t = /^(.+) (?:\u6b4c[\u8bcd\u8a5e]|Lyrics) (.+) \u203b Mojim\.com/.exec(e.title);
                if (t) {
                    var r = t[1].replace(/\(.*\)/g, "").trim(), n = t[2].replace(/\(.*\)/g, "").trim();
                    return n + " - " + r;
                }
            },
            process_search_replace_url: [ /^(https?:\/\/)(?!cn\.|jp\.|tw\.)[^\/]+\.(mojim\.com)/, "$1$2" ]
        });
    }), r("sources/multi/google.com", [ "require", "exports", "module", "MultiLyricsSource", "SourceScraperUtils" ], function(e, t) {
        var r = e("MultiLyricsSource").MultiLyricsSource, n = e("SourceScraperUtils").SourceScraperUtils.search.engines.google;
        t.source = new r({
            disabled: !0,
            identifier: "google.com",
            homepage: "https://encrypted.google.com/",
            description: "Search in all known lyrics sites at once using Google.\nIt is recommended to put this source near the top of the list.\nOnly disabled sources are used in the search query.",
            url_search: function(e) {
                var t = this.getSources();
                if (!t.length) return "";
                for (var r = "/search?q=" + encodeURIComponent(this.$SEARCHTERMS(e) + " (site:" + t[0].searchterms_site), n = 1; t.length > n; ++n) {
                    var o = encodeURIComponent(" OR site:" + t[n].searchterms_site);
                    if (o.length + r.length >= 2045) break;
                    r += o;
                }
                return r += ")", r = "https://encrypted.google.com" + r;
            },
            getResultsFromResponse: n.getResultsFromResponse
        });
    }), r("sources/songmeanings.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "songmeanings.com",
            homepage: "http://songmeanings.com/",
            description: "A few million song lyrics in various languages.",
            searchterms_site: "songmeanings.com/songs/view",
            searchterms_result: "$ARTIST $SONG Lyrics",
            searchterms_search: "$SEARCHTERMS Lyrics",
            r_url_result: /^https?:\/\/songmeanings\.com\/songs\/view\/\d+\//,
            process_result_selector: "#textblock",
            process_result_get_title: function(e) {
                var t = e.title.split(" Lyrics | ", 1)[0];
                return t;
            }
        });
    }), r("sources/songlyrics.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "songlyrics.com",
            homepage: "http://www.songlyrics.com/",
            description: "Over 750k lyrics.",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^http:\/\/www\.songlyrics\.com\/[^\/]+\/[^\/]+-lyrics\//i,
            url_result: "http://www.songlyrics.com/$ARTIST/$SONG-lyrics/",
            process_result_selector: "#songLyricsDiv",
            process_result_get_title: function(e) {
                var t = e.querySelector("h1");
                return t = t ? t.textContent : e.title, t = t.replace(/ Lyrics$/i, "");
            },
            $ARTIST$SONG: function(e, t) {
                return e = r.prototype.$ARTIST$SONG.call(this, e, t), e = e.toLowerCase(), e = e.replace(/([a-z])!([a-z])/g, "$1i$2"), 
                e = e.replace(/\./g, "-"), e = e.replace(/[^a-z0-9+\- !]/g, ""), e = e.replace(/[\- ]+/g, "-");
            },
            $SONG: function(e, t) {
                var n = r.prototype.$SONG.call(this, e, t);
                return n = n.replace(/-$/, "");
            }
        });
    }), r("sources/songteksten.nl", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "songteksten.nl",
            homepage: "http://http://songteksten.nl/",
            description: "Dutch site with over 350k song lyrics.",
            searchterms_site: "songteksten.nl/songteksten",
            searchterms_result: "$ARTIST $SONG",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^https?:\/\/www\.songteksten\.nl\/songteksten\/\d+/i,
            process_result_selector: 'span[itemprop="description"]',
            process_result_get_title: function(e) {
                var t = e.title.match(/^\u266b (.*) songtekst \|/);
                return t ? t[1] : void 0;
            }
        });
    }), r("sources/stixoi.info", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "stixoi.info",
            homepage: "http://www.stixoi.info/",
            description: "A Greek website with over 55k Greek lyrics.",
            searchterms_result: '"stixoi.php?info=Lyrics" "song_id" $SONG $ARTIST',
            searchterms_search: '"stixoi.php?info=Lyrics" "song_id" $SEARCHTERMS',
            r_url_result: /^https?:\/\/www\.stixoi.info\/stixoi.php\?info=Lyrics&act=(det2edit|details)&song_id=\d+/i,
            process_result_selector: ".singers + *",
            process_result_scraper_options: {
                isFirstChild: !0
            },
            process_result_get_title: function(e) {
                var t = e.querySelector('.creators a[href*="singer_id"]');
                t = t ? t.textContent : "";
                var r = e.title.replace("stixoi.info: ", "");
                return t + " - " + r;
            },
            process_search_replace_url: [ /\bact=(det2edit|details)\b/i, "act=details", /\binfo=lyrics\b/i, "info=Lyrics" ]
        });
    }), r("sources/plyrics.com", [ "require", "exports", "module", "LyricsSource", "SourceScraperUtils" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource, n = e("SourceScraperUtils").SourceScraperUtils;
        t.source = new r({
            disabled: !0,
            identifier: "plyrics.com",
            homepage: "http://www.plyrics.com/",
            description: "Lyrics for punk, indie, hardcore and ska songs.",
            r_url_result: /^https?:\/\/www\.plyrics\.com\/lyrics\/[^\/]+\/[^\/]+\.html$/i,
            url_result: "http://www.plyrics.com/lyrics/$ARTIST/$SONG.html",
            method_search: "GET",
            url_search: "http://search.plyrics.com/search.php?q=$encSEARCHTERMS",
            process_result_selector: ".pmedia",
            process_result_scraper_options: {
                isFirstChild: !0
            },
            process_result_get_title: function(e) {
                var t = e.title.split("LYRICS -");
                return t[0] = t[0].replace(/([A-Z])(\S*)/g, function(e, t, r) {
                    return t.toUpperCase() + r.toLowerCase();
                }), t = t.join("-");
            },
            process_search: function(e, t) {
                var r = n.toDOM(e), o = r.querySelector('a[href^="http://www.plyrics.com/lyrics/"]');
                o ? t.found({
                    redir: o.href
                }) : t.fail();
            },
            $ARTIST$SONG: function(e, t) {
                return e = r.prototype.$ARTIST$SONG.call(this, e, t), e = e.toLowerCase(), e = e.replace(/([a-z])!([a-z])/g, "$1i$2"), 
                e = e.replace(/^(the|an?) /, ""), e = e.replace(/[^a-z0-9]/g, "");
            },
            $SEARCHTERMS: function(e, t) {
                var n = r.prototype.$SEARCHTERMS.call(this, e, t);
                return e.videotitle && (n = n.replace(/\s+-\s+/g, " ")), n;
            }
        });
    }), r("sources/guitarparty.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "guitarparty.com",
            homepage: "http://www.guitarparty.com/",
            description: "Icelandic lyrics and guitar chords (guitar chords not displayed by extension, just click on the link to their website).",
            searchterms_result: "song $ARTIST $SONG",
            searchterms_search: "song $SEARCHTERMS",
            r_url_result: /^https?:\/\/[^.]+\.guitarparty.com\/(en|is)?\/?song\/[^\/]+(\/|$)/,
            process_result_selector: ".song-no-chords",
            process_result_scraper_options: {
                tags: /^p$/i,
                flushAfter: /^p$/i
            },
            process_result_get_title: function(e) {
                var t = /^(.+) \(\s*(.*?)\s*\) ‒/.exec(e.title);
                return t ? t[2] + " - " + t[1] : void 0;
            },
            process_search_replace_url: [ /:\/\/[^.]+\./i, "://www." ],
            $ARTIST$SONG: function(e, t) {
                return (t || (t = {})).keepAccents = !0, r.prototype.$ARTIST$SONG.call(this, e, t);
            },
            $SEARCHTERMS: function(e, t) {
                return (t || (t = {})).keepAccents = !0, r.prototype.$SEARCHTERMS.call(this, e, t);
            }
        });
    }), r("sources/lyrics.my", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "lyrics.my",
            homepage: "http://www.lyrics.my/",
            description: "Lyrics for Malaysian, Indonesian, Nasyid and some English songs (about 20k).",
            searchterms_result: "$ARTIST $SONG",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^https?:\/\/www\.lyrics\.my\/artists\/.+\/lyrics\/./i,
            process_result_selector: ".show_lyric",
            process_result_scraper_options: {
                tags: /^(?:[buip]|strong|em)$/i,
                flushBefore: /^(?:br|p)$/i,
                flushAfter: /^p$/i,
                ignoreNode: function(e) {
                    return 1 !== e.nodeType || /^br$/i.test(e.tagName) && (e = e.previousSibling) ? 3 === e.nodeType ? e.nodeValue.lastIndexOf("://lyrics.my") > 0 : void 0 : !1;
                }
            },
            process_result_get_title: function(e) {
                var t = e.title.split(" Lyrics | Lyrics.My", 1)[0];
                return t;
            }
        });
    }), r("sources/lyrics", [ "require", "exports", "module", "config", "MultiLyricsSource", "sources/shared", "sources/lyrics.wikia.com", "sources/multi/bing.com", "sources/lyrics.com", "sources/metrolyrics.com", "sources/lyricsmania.com", "sources/azlyrics.com", "sources/lyricstime.com", "sources/lyricsmode.com", "sources/magistrix.de", "sources/leoslyrics.com", "sources/vagalume.com.br", "sources/letras.mus.br", "sources/darklyrics.com", "sources/metal-archives.com", "sources/musica.com", "sources/shironet.mako.co.il", "sources/angolotesti.it", "sources/paroles2chansons.com", "sources/rapgenius.com", "sources/tekstowo.pl", "sources/animelyrics.com", "sources/mojim.com", "sources/multi/google.com", "sources/songmeanings.com", "sources/songlyrics.com", "sources/songteksten.nl", "sources/stixoi.info", "sources/plyrics.com", "sources/guitarparty.com", "sources/lyrics.my" ], function(e, t) {
        for (var r = e("config"), n = e("MultiLyricsSource").MultiLyricsSource, o = e("sources/shared"), i = function(e, t, r) {
            console && console.log(e + ": " + r);
        }, s = [ e("sources/lyrics.wikia.com").source, e("sources/multi/bing.com").source, e("sources/lyrics.com").source, e("sources/metrolyrics.com").source, e("sources/lyricsmania.com").source, e("sources/azlyrics.com").source, e("sources/lyricstime.com").source, e("sources/lyricsmode.com").source, e("sources/magistrix.de").source, e("sources/leoslyrics.com").source, e("sources/vagalume.com.br").source, e("sources/letras.mus.br").source, e("sources/darklyrics.com").source, e("sources/metal-archives.com").source, e("sources/musica.com").source, e("sources/shironet.mako.co.il").source, e("sources/angolotesti.it").source, e("sources/paroles2chansons.com").source, e("sources/rapgenius.com").source, e("sources/tekstowo.pl").source, e("sources/animelyrics.com").source, e("sources/mojim.com").source, e("sources/multi/google.com").source, e("sources/songmeanings.com").source, e("sources/songlyrics.com").source, e("sources/songteksten.nl").source, e("sources/stixoi.info").source, e("sources/plyrics.com").source, e("sources/guitarparty.com").source, e("sources/lyrics.my").source ], a = 2, c = function(e) {
            var t = e && e.schemeVersion || 0, r = function(e, t) {
                var r = d(s, e);
                if (-1 === r) return i("_applySchemeUpdate", "not_found", "No listing found for ID " + e), 
                void 0;
                var n = s.splice(r, 1)[0];
                s.splice(t, 0, n);
            };
            2 > t && r("bing.com", 1);
        }, l = 0; s.length > l; ++l) s[l]._disabled = s[l].disabled;
        var u = function(e) {
            o.lyricsSources.length = 0;
            for (var t = 0; e.length > t; ++t) {
                var r = e[t];
                r instanceof n || o.lyricsSources.push(r);
            }
        }, d = function(e, t) {
            for (var r = 0; e.length > r; r++) if (e[r].identifier === t) return r;
            return -1;
        }, p = function(e, t) {
            if (e) for (var r = e.length - 1; r >= 0; --r) {
                var n = e[r], o = d(t, n);
                o >= 0 ? t.unshift(t.splice(o, 1)[0]) : i("getLyricsSources", "id_unknown", 'Unknown identifier found in the "order" preference.');
            }
        }, h = function(e, t, r) {
            if (e) for (var n = r.length - 1; n >= 0; --n) {
                var o = r[n].identifier;
                r[n].disabled = -1 !== e.indexOf(o) ? !0 : t && -1 !== t.indexOf(o) ? !1 : r[n]._disabled;
            }
        }, f = function(e) {
            for (var t = e.length - 1; t >= 0; --t) e[t].disabled === !0 && e.splice(t, 1);
        }, m = function(e, t) {
            r.getItem("lyricsSourcePreferences", function(r) {
                c(r);
                for (var n = s.slice(0), o = n.length, i = 0, a = o - 1; a >= 0; --a) n[a].disabled = n[a]._disabled;
                r && (r.order && (i = r.order.length), p(r.order, n), h(r.blacklist, r.whitelist, n)), 
                u(n.slice(0)), e && f(n), n.stats = {
                    Old: i,
                    New: o - i,
                    Total: o
                }, t(n);
            });
        }, g = function(e) {
            m(!1, e);
        }, y = function(e) {
            m(!0, e);
        };
        t.getAllLyricsSources = g, t.getLyricsSources = y, t.schemeVersion = a;
    }), r("SimpleTemplating", [ "require", "exports", "module" ], function(e, t) {
        function r(e) {
            return this instanceof r ? (this.useTemplate(e), void 0) : new r(e);
        }
        function n(e, t, r) {
            var n = /^on(.+)$/.exec(r);
            if (!n) return e[r] = t[r], void 0;
            var o = n[1], i = "data-robw-" + o, s = e[i], a = t[r];
            s && (e.removeEventListener(o, s, !1), delete e[i]), "function" == typeof a && (e.addEventListener(o, a, !1), 
            e[i] = a);
        }
        var o = function(e, t, r) {
            console && console.log(e + ": " + r);
        }, i = function(e, t, r) {
            var n = Error(e + ": " + r);
            throw n.type = t, n;
        };
        r.prototype.useTemplate = function(e) {
            var t = e.tagName;
            if (t && e.cloneNode) return this.element = e, this;
            t || (t = "div");
            var r = document.createElement(t);
            return Object.keys(e).forEach(function(t) {
                "tagName" !== t && (r[t] = e[t]);
            }), this.element = r, this;
        }, r.prototype.getElement = function() {
            return this.element || i("SimpleTemplating::getElement", "invalid_state", "Cannot use getElement() before an element has been defined! Construct the base element using useTemplate(template)"), 
            this.element;
        }, r.prototype.update = function(e) {
            var t = this.getElement();
            return Object.keys(e).forEach(function(r) {
                var i = t.querySelectorAll(r);
                if (i.length) for (var s = e[r], a = s._pre, c = s._post, l = i.length - 1; l >= 0; --l) {
                    var u = i[l], d = {};
                    "function" == typeof a && a(u, d);
                    for (var p = Object.keys(s), h = 0; p.length > h; ++h) {
                        var f = p[h];
                        "_pre" !== f && "_post" !== f && n(u, s, f);
                    }
                    "function" == typeof c && c(u, d);
                } else o("SimpleTemplating::update", "no_nodes", "No matching nodes found for " + r);
            }), this;
        }, t.SimpleTemplating = r;
    }), r("text", {
        load: function(e) {
            throw Error("Dynamic load not allowed: " + e);
        }
    }), r("text!style/lyricsPanel.css", [], function() {
        return "@font-face{font-family:'lyricshereicons';src:url('https://robwu.nl/lyricshere/icons/v3.7/lyricshereicons.eot');src:url('https://robwu.nl/lyricshere/icons/v3.7/lyricshereicons.eot?#iefix') format('embedded-opentype'),url('data:application/font-woff;base64,d09GRgABAAAAAAxYAA4AAAAAFHgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABRAAAAEQAAABWVspgnWNtYXAAAAGIAAAAfAAAAcL3+FJXY3Z0IAAAAgQAAAAUAAAAHAZv/3BmcGdtAAACGAAABPkAAAmRigp4O2dhc3AAAAcUAAAACAAAAAgAAAAQZ2x5ZgAABxwAAAJlAAADMnB9rfZoZWFkAAAJhAAAADUAAAA2ABqxKGhoZWEAAAm8AAAAIAAAACQHOANNaG10eAAACdwAAAAcAAAAHBbTAABsb2NhAAAJ+AAAABAAAAAQAkIDE21heHAAAAoIAAAAIAAAACAAwwnSbmFtZQAACigAAAGQAAADIZIf/2Bwb3N0AAALuAAAAEgAAABd0UR8ynByZXAAAAwAAAAAVgAAAFaSoZr/eJxjYGR2ZpzAwMrAwVTFtIeBgaEHQjM+YDBkZGJgYGJgZWbACgLSXFMYHBiu///PHPQ/iyGKWY4hESjMCJIDAOWaDBR4nGNgYGBhYGBgBmIVBkYGEEgB8hjBfGYGLgYGxiygCgcgn4eBg4EJrPqG6ibVPepi//+D1V9H8P5r3Qq85XHjPdQkOGBkYxiugJGJWJU8YDICykMPketAfANkHgOD6iYIBsWK6h4IBoW7uhgEM7AyMH7lBWOgOQCvWxiIeJxjYEADRgxGzHL/54MwABEGA+N4nJ1V2XbTVhSVPGRwEjpkoKAO19w4UOvKhCkYMGkqxXYhHRwIrQQdpAx05J3HPutrjkK7Vh/5tO59PSS0dK22LJbPvkdbZ9g650YcIyp9Gohr1KGSlwOprD2WSvdJXNd1L4+VDAZxXbYST0mbqJ0kSmrd7FAu8VjrKlknWCfj5SBWT1WeZ6AM4hQeZUlEG0QbqZcmSeKJ4yeJFmcQHyVJICWjEKfSyFBCNRrEUtWhTOnQq9cTcdNAykajHnVYVPdDxSfHNafUrANGKlc5whXr1Ua+G6cDL3uQxDrBs62HMR54rH6UKpCKkenIP3ZKTpSGgVRx1KFW4ugwk1/3kUwqzUCmjGJFpe6BuN39dNsWMT10Or4uSpVGqrq5ziia7dHxqIMoD9nG6aTc0Nn28OUZU1SrXXGz7UBmDVxKyWx0n0QAHSZS4+kBTjWcAqkZ9UfF2efPARLJXJSqPFUyh3oDmTM7e3Ex7W4nq7JwpJ8HMm92duOdh0OnV4d/0foXTOHMR4/iYn4+QvpQan4iTiSlRljM8qeGH3FXIEK5MYgLF8rgU4Q5dEXa2WZd47Ux9obP+UqpYT0J2uij+H4K/U4kKxxnUaP1SJzNY9d1rdxnUEu1uxc7Mq9DlSLu7wsLrjPnhGGeFgtVX5753gU0/waIZ/xA3jSFS/uWKUq0b5uiTLtoigrtElSlXTbFFO2KKaZpz5pihvYdU8zSnjMy4//L3OeR+xze8ZCb9l3kpn0PuWnfR27aD5CbViE3bR25aS8gN61GbtpVozp2BBoGaRdSFUHQNLL6YdxWm/VA1ow0fGlg8i5iyPrqREedtbXKH8V/deILB3Jpoqe7Iheb4i6v2xY+PN3uq4+aRt2w1fjGkfIwHkZ6HJrQWfnN4b/tTd0umu4yqjLoARVMCsAAZe1AAtM62wmk9Zqn+PIHYFyGeM5KQ7VUnzuGpu/leV/3sTnxvsftxi63XHd5CVnWDXJj9vDfUmSq6x/lLa1UJ0esKyePVWsYQyq8KLq+kpR7tLUbvyipsvJelNbK55OQmz2DG0Jbtu5hsCNMacolHl5TpSg91FKOskMsbynKPOCUiwtahsS4DnUPamvE6aF6GBsLIYahtL0QcEgpXRXftMp38R6ra9jo+MUV4el6chIRn+Iq+1HwVNdG/egO2rxm3TKDKVWqp/uMT7Gv2/ZRWWmkjrMXt1QH1zTrGjkV00/ka+B0bzho3QM9VHw0QSNVNcfoxihjNJY15d8EdDFWfsNo1WL7PdxPnaRVrLlLmOybE/fgtLv9Kvu1nFtG1v3XBr1t5IqfIzG/LQr8Owdit2QN1DuTgRgLyFnQGMYWJncYroNtxG32Pyan/9+GhUVyVzsau3nqw9WTUSV32fK4y012WdejNkfVThr7CI0tDzfm2OFyLLbEYEG2/sH/Me4Bd2lRAuDQyGWYiNp0oZ7q4eoeq7FtOFcSAXbNseN0AHoALkHfHLvW8wmA9dwj5y7AfXIIdsgh+JQcgs/IuQXwOTkEX5BDMCCHYJecOwAPyCF4SA7BHjkEj8jZBPiSHIKvyCGIySFIyLkN8JgcgifkEHxNDsE3Rq5OZP6WB9kA+s6im0CpnRoc2jhkRq5N2Ps8WPaBRWQfWkTqkZHrE+pTHiz1e4tI/cEiUn80cmNC/YkHS/3ZIlJ/sYjUZ8aXmSMprw6e844O/gSX6q1eAAAAAAEAAf//AA94nHVSz08TQRR+b2bZLT9kx+3MrBqKZPsrtAh107QJNrAUAxyIHEiQRDSBeMKLNy94ociBeDVpGoOXclK4GjkaL96J/4ZpYnrc+qYlejDu4Xvz5r3M977vLSDQhz/YHqQgGwUpPW5bwLDOkQGwDQoMNhGBwaq8I5NWspjV0g7m0LGDfK68iATVSngXCbR0Eb95mdA7OvJCT4iTEyG8QZbxTr56YSCazf7V+9N+A2VB6J3SCMTWu+RrnEECJJSiezLp3RTu+I2x0ZHhMQSsMwKEDQqAm0DJKsKQBQlMcLeIoRb2VE5UsJp38o7v+FW/iu2Lbjdud7totbZaze1Wa7vZ2uJscLfTjXdaW80mVQwaG4wXvMGegYJbkXLQGEGTsX0ihl1fSu4VsySSpA+jMYG0YyX0UfOGKqgHKu7EHVmTBaXwhZrXBB9TymRu3FGqIGvmXsXv1B+u+QGXa8SRRAr7VNiVvuFC6RguND4TzTAaow0XvVCTBGpaz9Pj6BJ3QeH3FFU00RJRQcq4g66UBQ0Dbb2f7IodQ8bsObgtnP/ueUJKs+e+0P6i5/B604t4vWoag8q+ZlfuupgR7TbBujBR/M1dt912X2pzODtz/210Z00D0fd+9T7w13yS/sE8zETTY8gtHxlndeA0JGdPwLJgk2SMLJNPo/gwqbMTakgWk7lKdQEn0Z9E29Fmqv60eTsd5PK5qtThAuYCxx71Z6PSQeOgVA4TUxPqIr3yPH2uEysb9YNS9Kjx5ZC9+by8hK8ef4pKZQzvl4/fLiTUeWZvNX0hU+mwFJ0/PTy8bNSXfgPgOpYiAAAAeJxjYGRgYABiM8brvPH8Nl8ZuJlfAEUYzh0KegyhpRb///J/PnMzsxyQy8HABBIFAFbEDQcAAAB4nGNgZGBgDvqfxRDF/IKB4f9n5k4GoAgKYAcAiUUFiwPoAAAB1gAAA0gAAAOgAAADoAAAAxEAAAN8AAAAAAAAAEQAhgC8APQBQgGZAAEAAAAHACgAAgAAAAAAAgAKABcAbgAAAEEJkQAAAAB4nIWQy0rDQBSG//QmtqCg4E6ZlbQI6Q03rgqVFnHXRQV3aZwmKelMmUyFrn0En8KN7+DKt/BZ/JsMIgVry7Tf+c6ZyzkATvAFD8XnmqtgD8eMCi7hALeOy/T3jivkR8dVNJA4rtFbx3Vc4cVxA6d45wle5ZDRAh+OPVx4V45LOPLuHJfpHxxXyGvHVZx5r45r9G+O65h6n44buCydD/VqY5IotqI5bIlep9sXs43QVIkKUhGsbaxNJgZirpWVaar9UC9TbgmzWBqZhFplExmt08Ds2J1wKk2WaCW6fmcnM5ZKmsDKp+3N2XPUs3Yu5kYvxcjdKVZGL2Ro/dja1U27/fstGEJjhQ0Mhxsh5lgFmrQt/vfQQRd90owVgpVFVQKFAClNgDV3xHkmYzzgmjNStJIVKdlHyN8lubglZGXMrOFK8pyimTCKeFrKM80/tfuz09xkNNtYsAOffezfM2akchvkL3/66TnDM9/Vo7XsbNudybsRGO30KTjHbW5BE9L7+TQt7Q3a/P4xl29Kt52seJxjYGKAAC4G7ICdgYGRiZGZkYWRlZGNkZ0tOTEvOTWHD0LpJmcWJeekpjCVFrCk5JfnsSbn5BenshWnJhYlZzAwAABwrA9SS7gAyFJYsQEBjlm5CAAIAGMgsAEjRLADI3CyBCgJRVJEsgoCByqxBgFEsSQBiFFYsECIWLEGA0SxJgGIUVi4BACIWLEGAURZWVlZuAH/hbAEjbEFAEQAAA==') format('woff'),url('https://robwu.nl/lyricshere/icons/v3.7/lyricshereicons.ttf') format('truetype'),url('https://robwu.nl/lyricshere/icons/v3.7/lyricshereicons.svg#lyricshereicons') format('svg');font-weight:normal;font-style:normal}.L759-font-icon,.L759-font-icon *{font-family:'lyricshereicons' !important;font-style:normal;font-weight:normal;speak:none}\n.center-icon{text-align:center;line-height:1.1em}\n.L759-overlay{position:fixed;bottom:0;right:0;width:100%;height:100%;background-color:transparent !important;z-index:2000000001}\n.L759-overlay,.L759-container,.L759-container *{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}\n.L759-noselect::-moz-selection{background-color:transparent}\n.L759-noselect::selection{background-color:transparent}\n.L759-container{position:fixed;top:2px;right:2px;width:275px;z-index:2000000002;overflow:hidden;background-color:#fff !important;color:#000 !important;border:1px solid #bbe !important;padding:5px 1px 1px 5px;display:block;border-radius:5px 5px 5px 0;min-height:25px;min-width:67px;-webkit-box-shadow:1px 1px 4px lightGrey;box-shadow:1px 1px 4px lightGrey;font-size:14px;font-family:arial,sans-serif}.L759-container.boxsizingbug{min-height:17px;min-width:59px}\n.L759-container *{color:inherit !important;font-size:inherit;font-family:inherit}\n.L759-container,.L759-container *{line-height:1.1em;text-align:left}\n.L759-container button,.L759-container input{display:inline-block;height:20px;margin:0;border:0;background-color:transparent !important;padding:0;line-height:1.2em;font-size:13px;color:#000 !important}\n.L759-container .L759-buttons button{background-color:#ccc !important;cursor:pointer;padding:0 5px;font-size:16px;color:#333 !important}\n.L759-container .L759-chrome-permission-request{font-weight:bold;font-size:1.1em}.L759-container .L759-chrome-permission-request,.L759-container .L759-chrome-permission-request .L759-permission-description{text-align:center}\n.L759-container .L759-chrome-permission-request button{height:auto;margin:3px;border:0;padding:5px 8px;line-height:1;font-weight:bold;font-size:inherit}.L759-container .L759-chrome-permission-request button.L759-b-yes{background-color:#480 !important;color:#fff !important}.L759-container .L759-chrome-permission-request button.L759-b-yes:hover{background-color:#370 !important}\n.L759-container .L759-chrome-permission-request button.L759-b-no{background-color:#d10 !important;color:#eee !important}.L759-container .L759-chrome-permission-request button.L759-b-no:hover{background-color:#c00 !important}\n.L759-container a,.L759-container .L759-link-style{cursor:pointer;color:#438bc5 !important;text-decoration:none}\n.L759-container a:hover,.L759-container .L759-link-style:hover{text-decoration:underline;background-color:transparent !important}\n.L759-container .L759-title{border-bottom:3px double #99f !important;font-size:17px;line-height:15px;height:22px;margin-right:25px;overflow:hidden;cursor:move;white-space:nowrap;text-overflow:ellipsis}\n.L759-container .L759-close{position:absolute;height:25px;width:25px;top:0;right:0;z-index:50;cursor:pointer;display:block;background-color:#f50 !important;color:#eee !important;font-size:17px;text-align:center;line-height:1.1em}\n.L759-container .L759-close:hover{background-color:#f50 !important;color:#fff !important}\n.L759-container .L759-top-bar{border:0;border-bottom:1px solid;border-bottom-color:#759 !important;padding:2px 0;position:relative;z-index:1}.L759-container .L759-top-bar .L759-link-container{text-align:center}\n.L759-container .L759-top-bar .L759-toggle-info{display:inline-block;padding:0 3px;border:1px solid;cursor:default;color:#438bc5 !important;border-color:transparent !important}.L759-container .L759-top-bar .L759-toggle-info:not(.L759-info-toggled):hover{border-style:dotted}\n.L759-container .L759-top-bar .L759-toggle-info:hover,.L759-container .L759-top-bar .L759-toggle-info.L759-info-toggled{position:relative;z-index:1;padding-bottom:1px;margin-bottom:-1px;background-color:#fff !important;border-color:#759 !important;border-bottom-color:#fff !important}.L759-container .L759-top-bar .L759-toggle-info:hover+.L759-info-wrapper,.L759-container .L759-top-bar .L759-toggle-info.L759-info-toggled+.L759-info-wrapper{display:block}\n.L759-container .L759-top-bar .L759-info-wrapper{display:none;position:relative}.L759-container .L759-top-bar .L759-info-wrapper:hover{display:block}\n.L759-container .L759-top-bar .L759-info{position:absolute;border:1px solid;border-color:#759 !important;min-height:40px;width:100%;padding:2px 2px 2px 40px;background:2px 2px no-repeat url(\"https://robwu.nl/lyricshere/icons/32.png\") !important;background-color:#fff !important}.L759-container .L759-top-bar .L759-info.L759-http{background-image:url(\"http://robwu.nl/lyricshere/icons/32.png\") !important}\n.L759-container .L759-top-bar .L759-info .L759-song-title{font-style:italic}\n.L759-container .L759-top-bar .L759-info .L759-link-to-found-source{font-weight:bold}\n.L759-container .L759-content{overflow:auto;word-wrap:break-word}.L759-container .L759-content>div{padding-top:2px}\n.L759-container .L759-content .L759-lyrics-line{min-height:1.1em;padding-left:1em;text-indent:-1em}.L759-container .L759-content .L759-lyrics-line.L759-highlight{background-color:#ff0}\n.L759-container .L759-content .L759-result[dir=rtl] .L759-lyrics-line{padding-left:0;padding-right:1.2em}\n.L759-container .L759-line-finder-wrapper{position:relative;display:block;width:100%;height:0;z-index:1}\n.L759-container .L759-line-finder{position:absolute;width:100%;height:1.5em;bottom:0;background-color:#fff;padding-right:60px;border:1px solid #ce8500;-webkit-box-shadow:0 0 3px #ce8500;box-shadow:0 0 3px #ce8500;display:none}.L759-container .L759-line-finder.L759-visible{display:block}\n.L759-container .L759-line-finder .L759-finder-searchterms{width:100%;height:100%;line-height:1;font-size:.9em;padding-left:1px;position:relative;z-index:1}\n.L759-container .L759-line-finder.L759-line-notfound .L759-finder-searchterms{outline:1px solid #f33;outline-offset:0}\n.L759-container .L759-line-finder button{position:absolute;top:0;bottom:0;width:20px;height:100%;background-color:#e4e4e4 !important;color:#666 !important;text-align:center;line-height:1.1em;font-size:12px;padding:4px}.L759-container .L759-line-finder button:hover,.L759-container .L759-line-finder button:focus,.L759-container .L759-line-finder button:active{background-color:#d3d3d3 !important;color:#000 !important}\n.L759-container .L759-line-finder button:active{background-color:#ddd !important}\n.L759-container .L759-line-finder .L759-find-prev{right:40px}\n.L759-container .L759-line-finder .L759-find-next{right:20px}\n.L759-container .L759-line-finder .L759-find-hide{right:0}.L759-container .L759-line-finder .L759-find-hide :last-child{display:none}\n.L759-container .L759-line-finder .L759-find-hide :last-child :first-child,.L759-container .L759-line-finder .L759-find-hide:hover :first-child,.L759-container .L759-line-finder .L759-find-hide:focus :first-child,.L759-container .L759-line-finder .L759-find-hide:active :first-child{display:none}\n.L759-container .L759-line-finder .L759-find-hide :last-child :last-child,.L759-container .L759-line-finder .L759-find-hide:hover :last-child,.L759-container .L759-line-finder .L759-find-hide:focus :last-child,.L759-container .L759-line-finder .L759-find-hide:active :last-child{display:inline}\n.L759-container .L759-searchbox{padding-left:12px;line-height:16px;width:100%}.L759-container .L759-searchbox .L759-searchterms{width:100%;float:left;margin:0 -30px 0 0;padding:0 30px 0 0;border:1px solid lightGrey !important}.L759-container .L759-searchbox .L759-searchterms:-moz-placeholder{color:#cacaca !important}\n.L759-container .L759-searchbox .L759-searchterms::-moz-placeholder{color:#cacaca !important}\n.L759-container .L759-searchbox .L759-searchterms::-webkit-input-placeholder{color:#cacaca !important}\n.L759-container .L759-searchbox .L759-searchterms:-ms-input-placeholder{color:#cacaca !important}\n.L759-container .L759-searchbox .L759-searchterms:focus:-moz-placeholder{color:transparent !important}\n.L759-container .L759-searchbox .L759-searchterms:focus::-moz-placeholder{color:transparent !important}\n.L759-container .L759-searchbox .L759-searchterms:focus::-webkit-input-placeholder{color:transparent !important}\n.L759-container .L759-searchbox .L759-searchterms:focus:-ms-input-placeholder{color:transparent !important}\n.L759-container .L759-searchbox .L759-dosearch{width:30px;background-color:#fafafa !important;color:#666 !important;border:1px solid lightGrey !important;height:20px;text-align:center;line-height:1.1em;font-weight:bold;font-size:13px;cursor:default}.L759-container .L759-searchbox .L759-dosearch:hover,.L759-container .L759-searchbox .L759-dosearch:focus,.L759-container .L759-searchbox .L759-dosearch:active{background-color:#fcfcfc !important;color:#000 !important}\n.L759-container .L759-searchbox .L759-dosearch:active{background-color:#eee !important}\n.L759-container .L759-searchbox .L759-searchterms,.L759-container .L759-searchbox .L759-dosearch{border-bottom-right-radius:5px}\n.L759-container .L759-resizer{position:absolute;left:0;bottom:0;width:17px;height:17px;background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAKklEQVQ4jWMIDQ39z0ApABkyahCmRooNwqZppBtEjCaCBhGradSgATAIAGuTiXfwFGCyAAAAAElFTkSuQmCC\") !important;cursor:sw-resize}\n.L759-skin-dark{background-color:#000 !important;color:#ccc !important;border-color:#888 !important;-webkit-box-shadow:1px 1px 4px #777;box-shadow:1px 1px 4px #777}.L759-skin-dark button,.L759-skin-dark input{background-color:transparent !important;color:#ccc !important}\n.L759-skin-dark .L759-buttons button{background-color:#333 !important;color:#999 !important}\n.L759-skin-dark a,.L759-skin-dark .L759-link-style{color:#8dd !important}\n.L759-skin-dark .L759-title{border-bottom-color:#aaa !important}\n.L759-skin-dark .L759-close{background-color:#555 !important;color:#bbb !important}.L759-skin-dark .L759-close:hover{background-color:#777 !important;color:#e0e0e0 !important}\n.L759-skin-dark .L759-top-bar{border-bottom-color:#aaa !important}.L759-skin-dark .L759-top-bar .L759-toggle-info{color:#8dd !important}.L759-skin-dark .L759-top-bar .L759-toggle-info:hover,.L759-skin-dark .L759-top-bar .L759-toggle-info.L759-info-toggled{background-color:#000 !important;border-color:#aaa !important;border-bottom-color:#000 !important}\n.L759-skin-dark .L759-top-bar .L759-info{border-color:#aaa !important;background-color:#000 !important;background-image:url(\"https://robwu.nl/lyricshere/icons/32-dark.png\") !important}.L759-skin-dark .L759-top-bar .L759-info.L759-http{background-image:url(\"http://robwu.nl/lyricshere/icons/32-dark.png\") !important}\n.L759-skin-dark .L759-content .L759-lyrics-line.L759-highlight{background-color:#7b2d00}\n.L759-skin-dark .L759-line-finder{background-color:#000;border:1px solid #777;-webkit-box-shadow:0 0 3px #777;box-shadow:0 0 3px #777}.L759-skin-dark .L759-line-finder button{background-color:#474747 !important;color:#7a7a7a !important;border-color:#444 !important}.L759-skin-dark .L759-line-finder button:hover,.L759-skin-dark .L759-line-finder button:focus,.L759-skin-dark .L759-line-finder button:active{background-color:#777 !important;color:#cacaca !important}\n.L759-skin-dark .L759-line-finder button:active{background-color:#666 !important}\n.L759-skin-dark .L759-searchbox .L759-searchterms{border-color:#444 !important}.L759-skin-dark .L759-searchbox .L759-searchterms:-moz-placeholder{color:#cacaca !important}\n.L759-skin-dark .L759-searchbox .L759-searchterms::-moz-placeholder{color:#cacaca !important}\n.L759-skin-dark .L759-searchbox .L759-searchterms::-webkit-input-placeholder{color:#cacaca !important}\n.L759-skin-dark .L759-searchbox .L759-dosearch{background-color:#888 !important;color:#000 !important;border-color:#444 !important}.L759-skin-dark .L759-searchbox .L759-dosearch:hover,.L759-skin-dark .L759-searchbox .L759-dosearch:focus,.L759-skin-dark .L759-searchbox .L759-dosearch:active{background-color:#aaa !important;color:#000 !important}\n.L759-skin-dark .L759-searchbox .L759-dosearch:active{background-color:#777 !important}\n";
    }), r("text!templates/lyricsPanel.html", [], function() {
        return '<div class="L759-title"></div>\n<button class="L759-close L759-font-icon">&#10006;</button>\n<div class="L759-top-bar">\n  <div class="L759-link-container">\n    <span class="L759-switch-source L759-link-style">\n      &raquo; Different source (<span class="L759-sourceindex"></span> / <span class="L759-sourcecount"></span>)\n    </span>\n    <div class="L759-toggle-info">&raquo; Info</div>\n    <div class="L759-info-wrapper">\n      <div class="L759-info">\n        <div class="L759-song-info">\n        The lyrics for <span class="L759-song-title"></span> were retrieved from <a class="L759-link-to-found-source" target="_blank" rel="noreferrer"></a>.\n        </div>\n        <br>\n        &raquo; <a class="L759-settings-link" href="https://robwu.nl/lyricshere/#config" target="_blank">Settings for \'Lyrics Here\'</a>\n      </div>\n    </div>\n  </div>\n</div>\n<div class="L759-content">\n  <div class="L759-fetching">\n    <div class="L759-buttons">\n      <button class="L759-b-abort">Abort</button>\n      <button class="L759-b-retry">Retry</button>\n      <button class="L759-b-next">Next</button>\n    </div>\n    <div class="L759-status">\n    Loading <a class="L759-link-to-fetched-source" target="_blank" rel="noreferrer">nothing</a>.\n    <br><br>\n    <div class="L759-chrome-permission-request"></div>\n    &raquo; <a class="L759-settings-link" href="https://robwu.nl/lyricshere/#config" target="_blank">Settings for \'Lyrics Here\'</a>\n    </div>\n  </div>\n  <div class="L759-done">\n    <div class="L759-result"></div>\n  </div>\n</div>\n<div class="L759-line-finder-wrapper">\n  <div class="L759-line-finder">\n    <input type="text" class="L759-finder-searchterms" placeholder=" search within lyrics" title="Search within lyrics">\n    <button class="L759-find-prev L759-font-icon" title="Find previous (Shift + Enter)">&#9650;</button>\n    <button class="L759-find-next L759-font-icon" title="Find next (Enter)">&#9660;</button>\n    <button class="L759-find-hide L759-font-icon" title="Hide (Esc)"><span>&times;</span><span>&#216;</span></button>\n  </div>\n</div>\n<div class="L759-searchbox">\n  <input type="text" class="L759-searchterms" placeholder=" artist - song">\n  <button class="L759-dosearch L759-font-icon">&#128269;</button>\n</div>\n<div class="L759-resizer"></div>\n';
    }), r("text!style/pageAction.css", [], function() {
        return ".LyricsHereByRobWPageActionIcon {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  position: fixed;\n  top: 50px;\n  right: 0;  \n  z-index: 2000000003;\n  display: inline-block;\n  height: 30px;\n  width: 30px;\n  margin: 0;\n  border: 1px solid #999;\n  padding: 0;\n  background: url('http://www.cinemorelos.com/favicon.ico') center no-repeat !important;\n  cursor: pointer;\n}\n.LyricsHereByRobWPageActionIcon:hover {\n  border-color: #000;\n}\n/*YouTube*/\n#watch-headline-title .LyricsHereByRobWPageActionIcon {\n  position: absolute;\n  top: 1px;\n  right: 0;\n}\n/*Grooveshark*/\n#header-user-assets .LyricsHereByRobWPageActionIcon {\n  position: absolute;\n  left: -35px;\n  top: 11px;\n}\n/*Grooveshark Retro*/\n.GSRetroPageAction.LyricsHereByRobWPageActionIcon {\n  position: relative;\n  top: 3px;\n  right: 9px;\n  float: right;\n}\n#footer > #player .LyricsHereByRobWPageActionIcon ~ #player_controls_seeking {\n  margin-left: 220px; /* was 190px */\n}\n/*Grooveshark HTML5*/\n#page-header .LyricsHereByRobWPageActionIcon {\n  position: absolute;\n  top: 6px;\n  left: 50px;\n  right: auto;\n}\n\n/*Spotify Web client*/\n#wrapper > .LyricsHereByRobWPageActionIcon {\n  position: absolute;\n  top: 0;\n  right: 0;\n  opacity: 0.6;\n}\n#wrapper > .LyricsHereByRobWPageActionIcon:hover {\n  opacity: 1;\n}\n\n/*Deezer*/\nsection.topbar > .LyricsHereByRobWPageActionIcon {\n  position: static;\n  float: right;\n  margin-right: 8px;\n}\n\n/*8tracks*/\n#player_box > .LyricsHereByRobWPageActionIcon {\n  position: fixed;\n  top: auto;\n  bottom: 20px; /*center-align button (as of 8 feb 2014) */\n  right: 10px;\n  outline: 2px solid #222; /* only noticeable in small windows, used to make the button stand out */\n}\n";
    }), r("eventBridge", [ "text!style/pageAction.css" ], function(e) {
        var t, r = {}, n = [], o = function(e, t) {
            var o = r[e] ? r[e].slice(0) : [];
            if (n.push({
                data: t,
                callbacks: o
            }), 1 === n.length) for (;n.length > 0; ) {
                t = n.shift(), o = t.callbacks, t = t.data;
                for (var i = 0; o.length > i; i++) o[i](t);
            }
        }, i = function(e, t) {
            if ("function" != typeof t) throw Error("Callback must be a function!");
            (r[e] || (r[e] = [])).push(t);
        }, s = function() {
            if (!t) {
                var r = document.createElement("style");
                r.appendChild(document.createTextNode(e)), (document.head || document.documentElement).appendChild(r), 
                t = document.createElement("div"), t.className = "LyricsHereByRobWPageActionIcon", 
                t.title = "Click to show the Lyrics panel.\nPress CTRL and click to hide this button.", 
                t.addEventListener("click", function(e) {
                    a(), e.ctrlKey || o("toggle");
                });
            }
            (document.body || document.documentElement).appendChild(t), o("iconinserted", t);
        }, a = function() {
            t && t.parentNode && t.parentNode.removeChild(t);
        }, c = function() {
            r = {}, n = [], a(), i("attached", a), i("detached", s);
        };
        return c(), {
            dispatchEvent: o,
            listenEvent: i,
            reset: c
        };
    }), r("touch2mouse", [], function() {
        function e(e) {
            return function(t) {
                var r = t.changedTouches;
                r && (r = r[0], t.preventDefault(), t = document.createEvent("MouseEvents"), t.initMouseEvent(e, !0, !0, document.defaultView, 1, r.screenX, r.screenY, r.clientX, r.clientY, r.ctrlKey, r.altKey, r.shiftKey, r.metaKey, 0, null), 
                r.target.dispatchEvent(t));
            };
        }
        var t = "ontouchend" in document, r = {}, n = {}, o = function(t, o) {
            r[o] = t, n[t] = e(o);
        };
        o("touchstart", "mousedown"), o("touchmove", "mousemove"), o("touchend", "mouseup");
        var i = {
            events: n,
            supportsTouch: t,
            addTouchListener: function(e, t) {
                if (i.supportsTouch) {
                    var o = r[t];
                    o && e.addEventListener(o, n[o], !1);
                }
            },
            removeTouchListener: function(e, t) {
                if (i.supportsTouch) {
                    var o = r[t];
                    o && e.removeEventListener(o, n[o], !1);
                }
            }
        };
        return i;
    }), r("isLeftMouseReleased", [], function() {
        function e(e) {
            return "buttons" in e && t ? !(1 | e.buttons) : r || n ? 0 === e.which : void 0;
        }
        var t = true, r = false, n = true;
        return e;
    }), r("LineFinder", [ "require", "exports", "module" ], function(e, t) {
        function r(e) {
            return this instanceof r ? (this.update(e), void 0) : new r(e);
        }
        function n(e) {
            return e.toLocaleLowerCase().replace(/[.,!?'"`:;\[\]()\/\-]/g, "").replace(/\s+/g, " ");
        }
        function o(e) {
            for (var t = [], r = "", o = 0; e.length > o; ++o) {
                var i = e[o], s = n(i.textContent), a = {
                    node: i,
                    start: r.length
                };
                r += s, a.end = r.length - 1, t.push(a);
            }
            return {
                allText: r,
                allTextLength: r.length,
                index: t,
                indexLength: t.length
            };
        }
        function i(e, t) {
            if (0 > t) return null;
            for (var r = null, n = 0; e.indexLength > n; ++n) {
                var o = e.index[n];
                if (o.start > t) break;
                r = o.node;
            }
            return r;
        }
        function s(e, t) {
            if (!t) return -1;
            for (var r = 0; e.indexLength > r; ++r) if (e.index[r].node === t) return r;
            return -1;
        }
        function a(e, t, r, n, o) {
            if (!e.indexLength) return null;
            var a = s(e, r), c = o ? a : n ? a - 1 : a + 1;
            c >= e.indexLength ? c = n || o ? e.indexLength - 1 : 0 : 0 > c && (c = !n || o ? 0 : e.indexLength - 1);
            var l = e.index[c][n ? "end" : "start"], u = e.allText[n ? "lastIndexOf" : "indexOf"](t, l);
            -1 === u && (u = n ? e.allText.lastIndexOf(t, e.allTextLength) : e.allText.indexOf(t));
            var d = i(e, u);
            return d;
        }
        r.prototype.update = function(e) {
            e || (e = []), this.searchIndex = o(e), this.lastKeyword = "", this.lastNode = null;
        }, r.prototype.findSmart = function(e) {
            return this.find(e, !1, !0);
        }, r.prototype.next = function(e) {
            return this.find(e, !1, !1);
        }, r.prototype.prev = function(e) {
            return this.find(e, !0, !1);
        }, r.prototype.find = function(e, t, r) {
            e = n(e);
            var o = a(this.searchIndex, e, this.lastNode, !!t, !!r);
            return this.lastKeyword = e, this.lastNode = o, o;
        }, t.LineFinder = r;
    }), r("LyricsPanel", [ "require", "exports", "module", "InfoProvider", "LyricsSource", "sources/lyrics", "SimpleTemplating", "text!style/lyricsPanel.css", "text!templates/lyricsPanel.html", "eventBridge", "config", "musicSites", "algorithms", "touch2mouse", "isLeftMouseReleased", "LineFinder" ], function(e, t) {
        var r = e("InfoProvider").InfoProvider, n = e("LyricsSource").LyricsSource, o = e("sources/lyrics").getLyricsSources, i = e("SimpleTemplating").SimpleTemplating, s = e("text!style/lyricsPanel.css"), a = e("text!templates/lyricsPanel.html"), c = e("eventBridge"), l = e("config"), u = e("musicSites"), d = e("algorithms"), p = e("touch2mouse"), h = e("isLeftMouseReleased"), f = e("LineFinder").LineFinder, m = "." + u.getIdentifier(location.href);
        "." === m && (m = ""), a = {
            className: "L759-container",
            tagName: "div",
            innerHTML: a
        };
        var g = Object.prototype.hasOwnProperty, y = function(e, t, r) {
            console && console.log(e + ": " + r);
        }, v = function(e, t, r) {
            var n = Error(e + ": " + r);
            throw n.type = t, n;
        }, b = function(e, t) {
            if (t) {
                for (var r in t) g.call(t, r) && (e[r] = t[r]);
                return e;
            }
        }, L = function(e) {
            return !(!e || !(document.documentElement.contains ? document === e || document.documentElement.contains(e) : 16 & document.compareDocumentPosition(e)));
        }, S = {}, w = {};
        w.panelElement = null, w.getCurrentStyle = function() {
            return document.defaultView.getComputedStyle(w.panelElement);
        }, w.infoProvider = null, w.runQueuedQuery = null, w.minWidth = 0, w.minHeight = 0, 
        w.boxsizingbug = !1, w.boxsizingcomputedstylebug = !1, w.runQuery = function(e, t) {
            e = b({}, e);
            var n = "";
            if (e.song && e.artist) n = "result"; else {
                if (e.searchTerms || (e.searchTerms = e.videotitle), !e.searchTerms) return;
                n = "search";
            }
            if (w.runQueuedQuery = function() {
                w.runQueuedQuery = null, w.infoProvider.query(n, e, w.queryCallback, t);
            }, w.infoProvider) w.runQueuedQuery(); else {
                if (0 === w.infoProvider) return;
                w.infoProvider = 0, o(function(e) {
                    S = e.stats, w.infoProvider = new r(e), w.runQueuedQuery();
                });
            }
        }, w.abortQuery = function() {
            w.runQueuedQuery && (x = w.runQueuedQuery, w.runQueuedQuery = null), w.infoProvider && w.infoProvider.abort();
        };
        var x;
        w.resumeQuery = function() {
            x && x();
        }, w.queryCallback = function(e) {
            switch (w.attachPanel(), x = null, e.type) {
              case "fetching":
                w.render.fetchingLyrics(e), x = e.retry;
                break;

              case "fail":
                e.next ? e.next() : w.render.notFound(e);
                break;

              case "found":
                if (e.restart) {
                    var t = {
                        type: "fail",
                        sourceIndex: e.sourceIndex,
                        sourceCount: e.sourceCount,
                        searchTerms: e.searchTerms,
                        query: e.query,
                        restart: e.restart
                    };
                    e.restart = function() {
                        w.queryCallback(t);
                    };
                }
                w.render.foundLyrics(e);
                break;

              case "message":
                w.render.showMessage(e);
                break;

              default:
                return v("YTL:queryCallback", "unknown_type", "Unknown type " + e.type + '. Expected one of "fetching", "fail" or "found"!'), 
                void 0;
            }
            w.panelHelpers.dimensions.adaptPanelToResult(), M.update();
        };
        var A = {
            top: 0,
            right: 0,
            width: 0,
            height: 0
        };
        w.dispatchDimensionChangeIfNeeded = function() {
            var e, t, r, n;
            if (w.isVisible()) {
                var o = w.panelElement.style;
                e = parseFloat(o.top), t = parseFloat(o.right), r = parseFloat(o.width), n = parseFloat(o.height);
            } else e = t = r = n = 0;
            if (A.top !== e || A.right !== t || A.width !== r || A.height !== n) {
                var i = {
                    top: e,
                    right: t,
                    width: r,
                    height: n
                };
                A = i, c.dispatchEvent("panelDimensions", i);
            }
        }, w.isVisible = function() {
            return L(w.panelElement);
        }, w.detachPanel = function() {
            w.abortQuery(), w.isVisible() && (w.render.unbindInitialEvents(), w.panelElement.parentNode.removeChild(w.panelElement)), 
            L(w.styleSheet) && w.styleSheet.parentNode.removeChild(w.styleSheet), clearInterval(_), 
            w.panelHelpers.mover.end(), w.panelHelpers.resizer.end(), w.panelHelpers.overlay.detach(), 
            y("YTL:detachPanel", "detached", "Removed Lyrics panel."), c.dispatchEvent("detached"), 
            w.dispatchDimensionChangeIfNeeded();
        }, w.attachPanel = function() {
            var e = !w.panelElement;
            w.styleSheet || (w.styleSheet = document.createElement("style"), w.styleSheet.appendChild(document.createTextNode(s))), 
            e && (w.panelElement = i(a).getElement(), w.panelElement.dir = "ltr", w.panelElement.style.top = w.savedOffsets.top + "px", 
            w.panelElement.style.right = w.savedOffsets.right + "px", w.panelElement.style.width = w.savedOffsets.width + "px"), 
            L(w.styleSheet) || (document.head || document.documentElement).appendChild(w.styleSheet), 
            w.isVisible() || (w.activateTheme(), (document.body || document.documentElement).appendChild(w.panelElement), 
            "fixed" != w.getCurrentStyle().position && w.pollPanelCSSActivation(), w.panelHelpers.dimensions.fixBoxSizing(), 
            w.render.bindInitialEvents(), M.initialize(), w.panelHelpers.dimensions.enforcePosition(), 
            e ? w.panelHelpers.dimensions.adaptPanelToResult() : w.panelHelpers.dimensions.enforceDimensions(), 
            w.panelHelpers.dimensions.enforcePosition() && w.panelHelpers.dimensions.enforceDimensions(), 
            w.resumeQuery(), c.dispatchEvent("attached"), w.dispatchDimensionChangeIfNeeded());
        };
        var _;
        w.pollPanelCSSActivation = function() {
            var e = Date.now(), t = setInterval(function() {
                "fixed" == w.getCurrentStyle().position ? (clearInterval(t), w.panelHelpers.dimensions.adaptPanelToResult()) : Date.now() - e > 2e4 && clearInterval(t);
            }, 50);
        }, w.activateTheme = function() {
            var e = function(e) {
                var t = w.panelElement || a;
                t.className = t.className.replace(/L759-skin-\S+/, "") + (e && "default" != e ? " L759-skin-" + e : "");
            }, t = function(e) {
                var t = e && document.defaultView.getComputedStyle(e);
                return t && /^rgba?\(\d{1,2},\s*\d{1,2},\s*\d{1,2}(,\s*(?!0)\d*)?\)$/.test(t.backgroundColor);
            };
            l.getItem("theme" + m, function(r) {
                "dark" == r || "default" == r ? e(r) : ".youtube" == m && t(document.body) || ".grooveshark" == m && t(document.getElementById("page-inner")) ? e("dark") : e("");
            }), l.getItem("fontSize" + m, function(e) {
                "string" == typeof e && w.panelElement && (w.panelElement.style.fontSize = e);
            });
        }, w.activateTheme();
        var k = "panelOffsets" + m;
        w.savedOffsets = {
            top: 2,
            right: 2,
            width: 275,
            maxHeight: 600
        };
        var E, T = 1, C = 2;
        w.saveOffsets = function(e) {
            if (!w.isVisible()) return y("LyricsPanel.saveOffsets", "not_rendered", "Lyric panel cannot be found within the document!"), 
            void 0;
            var t = w.savedOffsets, r = w.getCurrentStyle(), n = function(e, r) {
                r = parseFloat(r), !isNaN(r) && isFinite(r) && (t[e] = r);
            };
            e & T && (n("top", r.top), n("right", r.right)), e & C && (w.boxsizingcomputedstylebug ? (n("width", w.panelElement.style.width), 
            n("maxHeight", w.panelElement.style.height)) : (n("width", r.width), n("maxHeight", r.height))), 
            clearTimeout(E), E = setTimeout(function() {
                l.setItem(k, t, function(e) {
                    e ? y("LyricsPanel.saveOffsets", "", "Saved Lyric panel's position and dimensions!") : y("LyricsPanel.saveOffsets", "", "Failed to save the Lyric panel's position and dimensions!");
                });
            }, 200);
        };
        var R = 0, I = [];
        w.loadOffsets = function(e) {
            2 == R ? e(w.savedOffsets) : 1 == R ? I.push(e) : (R = 1, I.push(e), l.getItem(k, function(t) {
                if (t) {
                    var r = function(e) {
                        g.call(t, e) && (w.savedOffsets[e] = t[e]);
                    };
                    r("top"), r("right"), r("width"), r("maxHeight");
                }
                for (;e = I.shift(); ) e(w.savedOffsets);
                R = 2;
            }));
        }, w.panelHelpers = {}, w.panelHelpers.show = function(e) {
            e.style.display = "";
        }, w.panelHelpers.hide = function(e) {
            e.style.display = "none";
        }, w.panelHelpers.doSearch = function() {
            var e = w.panelElement.querySelector(".L759-searchterms").value, t = d.splitSongTitle(e);
            t ? w.runQuery({
                searchTerms: e,
                artist: t[0],
                song: t[1]
            }) : w.runQuery({
                searchTerms: e
            });
        }, w.panelHelpers.dimensions = {}, w.panelHelpers.dimensions.getViewportDimensions = function() {
            var e = w.panelHelpers.overlay.isAttached();
            w.panelHelpers.overlay.attach();
            var t = w.overlayElement.getBoundingClientRect(), r = t.right, n = t.bottom;
            return e || w.panelHelpers.overlay.detach(), {
                width: r,
                height: n
            };
        };
        var H;
        w.panelHelpers.dimensions.fixBoxSizing = function() {
            if (!H) {
                H = 1;
                var e = document.createElement("div");
                e.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;top:-999px;position:absolute;min-height:6px;padding:1px;border:0;", 
                document.documentElement.appendChild(e);
                var t = w.getCurrentStyle();
                w.minHeight = parseFloat(t.minHeight) || 25, w.minWidth = parseFloat(t.minWidth) || 25, 
                8 == e.scrollHeight && (w.boxsizingbug = !0, w.panelElement.className += " boxsizingbug"), 
                e.style.height = "8px", "8px" != window.getComputedStyle(e).height && (w.boxsizingcomputedstylebug = !0), 
                e.parentNode.removeChild(e), e = null;
            }
        }, w.panelHelpers.dimensions.enforceDimensions = function() {
            var e, t, r = w.getCurrentStyle(), n = w.panelElement.offsetWidth, o = w.panelElement.offsetHeight, i = parseFloat(r.top), s = parseFloat(r.right), a = w.minWidth, c = w.minHeight, l = w.panelHelpers.dimensions.getViewportDimensions(), u = l.width - s, d = l.height - i;
            n > u && (e = u), a > n && (e = a), o > d && (t = d), c > o && (t = c), e && (w.panelElement.style.width = e + "px"), 
            t && (w.panelElement.style.height = t + "px"), w.panelHelpers.dimensions.enforceContentHeight();
        }, w.panelHelpers.dimensions.enforcePosition = function() {
            var e = w.getCurrentStyle(), t = parseFloat(e.top) || 0, r = parseFloat(e.right) || 0, n = w.panelHelpers.dimensions.getViewportDimensions(), o = n.height, i = n.width;
            w.boxsizingcomputedstylebug ? (o -= parseFloat(w.panelElement.style.height) || w.minHeight, 
            i -= parseFloat(w.panelElement.style.width) || w.minWidth) : (o -= parseFloat(e.height) || w.minHeight, 
            i -= parseFloat(e.width) || w.minWidth);
            var s = !1;
            return t > o && (s = !0, w.panelElement.style.top = Math.max(0, o) + "px"), 0 > t && (s = !0, 
            w.panelElement.style.top = "0"), r > i && (s = !0, w.panelElement.style.right = Math.max(0, i) + "px"), 
            0 > r && (s = !0, w.panelElement.style.right = "0"), s;
        }, w.panelHelpers.dimensions.getFixedNonContentHeight = function() {
            var e = w.getCurrentStyle(), t = parseFloat(e.borderTopWidth) || 0, r = parseFloat(e.borderBottomWidth) || 0, n = parseFloat(e.paddingTop) || 0, o = parseFloat(e.paddingBottom) || 0, i = w.panelElement.querySelector(".L759-title").offsetHeight, s = w.panelElement.querySelector(".L759-top-bar").offsetHeight, a = w.panelElement.querySelector(".L759-searchbox").offsetHeight, c = t + r + n + o + s + i + a;
            return c;
        }, w.panelHelpers.dimensions.enforceContentHeight = function() {
            var e = Math.max(w.panelElement.offsetHeight, w.minHeight), t = w.panelHelpers.dimensions.getFixedNonContentHeight(), r = e - t;
            w.panelElement.querySelector(".L759-content").style.height = 0 > r ? 0 : r + "px";
        }, w.panelHelpers.dimensions.adaptPanelToResult = function() {
            var e = w.panelElement.querySelector(".L759-result"), t = w.panelElement.querySelector(".L759-content");
            t.style.overflow = "scroll";
            var r = e.scrollHeight;
            t.style.overflow = "", t = null, r || (r = w.panelElement.querySelector(".L759-fetching").scrollHeight), 
            r += 2;
            var n = w.panelHelpers.dimensions.getFixedNonContentHeight(), o = n + r, i = n;
            o > w.savedOffsets.maxHeight && (o = w.savedOffsets.maxHeight), i > o && (o = i), 
            w.panelElement.style.height = o + "px", w.panelHelpers.dimensions.enforceDimensions();
        };
        var $;
        w.panelHelpers.dimensions.togglePanelHeight = function() {
            var e = w.panelElement.offsetHeight, t = w.minHeight, r = 10;
            r > e - t ? (w.resumeQuery(), $ ? (w.panelElement.style.height = $, w.panelHelpers.dimensions.enforceDimensions()) : w.panelHelpers.dimensions.adaptPanelToResult()) : (w.abortQuery(), 
            $ = w.panelElement.style.height, w.panelElement.style.height = t + "px", w.panelHelpers.dimensions.enforceDimensions());
        }, w.panelHelpers.overlay = {}, w.panelHelpers.overlay.isAttached = function() {
            return !(!w.overlayElement || !L(w.overlayElement));
        }, w.panelHelpers.overlay.attach = function() {
            w.overlayElement || (w.overlayElement = document.createElement("div"), w.overlayElement.className = "L759-overlay"), 
            L(w.overlayElement) || ((document.body || document.documentElement).appendChild(w.overlayElement), 
            w.panelHelpers.dimensions.getViewportDimensions());
        }, w.panelHelpers.overlay.detach = function() {
            w.panelHelpers.overlay.isAttached() && w.overlayElement.parentNode.removeChild(w.overlayElement);
        }, w.panelHelpers.mover = {}, w.panelHelpers.mover.globalMouseMove = null, w.panelHelpers.mover.moverMouseDown = function(e) {
            if (1 === e.which && (e.stopPropagation(), e.preventDefault(), !w.panelHelpers.mover.globalMouseMove)) {
                var t = w.getCurrentStyle(), r = parseFloat(t.top) || 0, n = parseFloat(t.right) || 0, o = e.clientX, i = e.clientY, s = 0, a = 0, c = w.panelHelpers.dimensions.getViewportDimensions(), l = c.height - w.minHeight, u = c.width - w.minWidth;
                w.panelHelpers.mover.globalMouseMove = function(e) {
                    if (e.preventDefault(), !w.isVisible() || h(e)) return w.panelHelpers.mover.end(), 
                    void 0;
                    var t = r - i + e.clientY;
                    t > l && (t = l), s > t && (t = s);
                    var c = n + o - e.clientX;
                    c > u && (c = u), a > c && (c = a), w.panelElement.style.top = t + "px", w.panelElement.style.right = c + "px";
                }, w.panelHelpers.overlay.attach(), document.addEventListener("mousemove", w.panelHelpers.mover.globalMouseMove, !0), 
                document.addEventListener("mouseup", w.panelHelpers.mover.globalMouseUp, !0), p.addTouchListener(document, "mousemove"), 
                p.addTouchListener(document, "mouseup");
            }
        }, w.panelHelpers.mover.globalMouseUp = function(e) {
            e.preventDefault(), e.stopPropagation(), w.panelHelpers.dimensions.enforceDimensions(), 
            w.panelHelpers.mover.end(), w.dispatchDimensionChangeIfNeeded();
        }, w.panelHelpers.mover.end = function() {
            w.panelHelpers.mover.globalMouseMove && (document.removeEventListener("mousemove", w.panelHelpers.mover.globalMouseMove, !0), 
            p.removeTouchListener(document, "mousemove"), w.panelHelpers.mover.globalMouseMove = null, 
            document.removeEventListener("mouseup", w.panelHelpers.mover.globalMouseUp, !0), 
            p.removeTouchListener(document, "mouseup"), w.panelHelpers.overlay.detach(), w.saveOffsets(T));
        }, w.panelHelpers.resizer = {}, w.panelHelpers.resizer.globalMouseMove = null, w.panelHelpers.resizer.resizerMouseDown = function(e) {
            if (!w.panelHelpers.resizer.globalMouseMove && 1 === e.which) {
                e.preventDefault(), e.stopPropagation();
                var t = w.panelElement.offsetWidth, r = w.panelElement.offsetHeight, n = e.clientX, o = e.clientY, i = w.getCurrentStyle(), s = w.minWidth, a = w.panelHelpers.dimensions.getViewportDimensions(), c = a.width - (parseFloat(i.right) || 0), l = w.minHeight, u = a.height - (parseFloat(i.top) || 0);
                w.panelHelpers.resizer.globalMouseMove = function(e) {
                    if (e.preventDefault(), !w.isVisible() || h(e)) return w.panelHelpers.resizer.end(), 
                    void 0;
                    var i = t + n - e.clientX;
                    i > c && (i = c), s > i && (i = s);
                    var a = r - o + e.clientY;
                    a > u && (a = u), l > a && (a = l), w.panelElement.style.width = i + "px", w.panelElement.style.height = a + "px", 
                    w.panelHelpers.dimensions.enforceContentHeight();
                }, document.addEventListener("mousemove", w.panelHelpers.resizer.globalMouseMove, !0), 
                document.addEventListener("mouseup", w.panelHelpers.resizer.end, !0), p.addTouchListener(document, "mousemove"), 
                p.addTouchListener(document, "mouseup"), w.panelHelpers.overlay.attach();
            }
        }, w.panelHelpers.resizer.end = function() {
            w.panelHelpers.resizer.globalMouseMove && (document.removeEventListener("mousemove", w.panelHelpers.resizer.globalMouseMove, !0), 
            p.removeTouchListener(document, "mousemove"), w.panelHelpers.resizer.globalMouseMove = null, 
            document.removeEventListener("mouseup", w.panelHelpers.resizer.end, !0), p.removeTouchListener(document, "mouseup"), 
            w.panelHelpers.overlay.detach(), w.saveOffsets(C), w.dispatchDimensionChangeIfNeeded());
        }, w.panelHelpers.stayWithinViewport = function() {
            w.panelHelpers.dimensions.enforcePosition() && w.panelHelpers.dimensions.enforceDimensions();
        };
        var q, N = 0;
        w.panelHelpers.globalResize = function() {
            var e = 333, t = Date.now(), r = t - N;
            r > e ? (setTimeout(w.panelHelpers.stayWithinViewport, 4), N = t) : (N = t, clearTimeout(q), 
            q = setTimeout(w.panelHelpers.stayWithinViewport, e));
        }, w.panelHelpers.highlightLyricsLine = function(e, t) {
            var r = w.panelElement.querySelector(".L759-highlight");
            r && r.classList.remove("L759-highlight"), e && e.classList.contains("L759-lyrics-line") && (t && e === r || e.classList.add("L759-highlight"));
        };
        var M = {};
        M.lineFinder = new f(), M.hasLines = !1, M.initialize = function() {
            M.inputElement = w.panelElement.querySelector(".L759-finder-searchterms"), M.finderContainer = w.panelElement.querySelector(".L759-line-finder");
        }, M.update = function() {
            M.scrollableElement = w.panelElement.querySelector(".L759-content");
            var e = w.panelElement.querySelector(".L759-lyrics-line"), t = e ? e.parentNode.childNodes : [];
            M.hasLines = t.length > 0, M.lineFinder.update(t), M.lastKeyword = "", M.hasLines || M.hide();
        }, M.onInputChange = function() {
            var e = M.inputElement.value;
            if (M.lastKeyword !== e) {
                M.lastKeyword = e;
                var t = M.lineFinder.findSmart(e);
                M.highlight(t);
            }
        }, M.highlight = function(e) {
            if (w.panelHelpers.highlightLyricsLine(e), !e) return M.lastKeyword && M.finderContainer.classList.add("L759-line-notfound"), 
            void 0;
            M.finderContainer.classList.remove("L759-line-notfound");
            var t = e.getBoundingClientRect(), r = M.scrollableElement.getBoundingClientRect();
            if (t.bottom + 30 > r.bottom || t.top < r.top) {
                var n = t.height || t.bottom - t.top, o = r.height || r.bottom - r.top, i = t.top - r.top - (o - n) / 2;
                M.scrollableElement.scrollTop += i;
            }
        }, M.prev = function() {
            var e = M.lineFinder.prev(M.inputElement.value);
            M.highlight(e);
        }, M.next = function() {
            var e = M.lineFinder.next(M.inputElement.value);
            M.highlight(e);
        }, M.show = function() {
            M.hasLines && (M.finderContainer.classList.add("L759-visible"), M.inputElement.focus(), 
            window.addEventListener("keydown", M.onkeydown));
        }, M.hide = function() {
            M.finderContainer.classList.remove("L759-visible"), M.finderContainer.classList.remove("L759-line-notfound"), 
            window.removeEventListener("keydown", M.onkeydown);
        }, M.onkeydown = function(e) {
            27 === e.keyCode && M.hide();
        }, w.render = {}, w.render.bindInitialEvents = function() {
            i(w.panelElement).update({
                ".L759-resizer": {
                    onmousedown: w.panelHelpers.resizer.resizerMouseDown,
                    ontouchstart: p.events.touchstart
                },
                ".L759-title": {
                    onmousedown: w.panelHelpers.mover.moverMouseDown,
                    ontouchstart: p.events.touchstart,
                    ondblclick: w.panelHelpers.dimensions.togglePanelHeight
                },
                ".L759-close": {
                    onclick: w.detachPanel
                },
                ".L759-info": {
                    className: "L759-info " + ("https:" === location.protocol ? "" : "L759-http")
                },
                ".L759-toggle-info": {
                    onclick: function(e) {
                        e.preventDefault(), e.stopPropagation(), this.classList.toggle("L759-info-toggled");
                    }
                },
                ".L759-result": {
                    ondblclick: function(e) {
                        e.preventDefault(), e.stopPropagation(), M.show();
                    },
                    onmousedown: function(e) {
                        var t = e.target;
                        w.panelHelpers.highlightLyricsLine(t, !0), 1 === e.which && t.classList.contains("L759-lyrics-line") && (t.classList.add("L759-noselect"), 
                        setTimeout(function() {
                            t.classList.remove("L759-noselect");
                        }, 50));
                    }
                },
                ".L759-finder-searchterms": {
                    onkeydown: function(e) {
                        13 === e.keyCode || "Enter" === e.keyIdentifier ? (e.preventDefault(), e.stopPropagation(), 
                        e.shiftKey ? M.prev() : M.next()) : 27 === e.keyCode && M.hide();
                    },
                    oninput: M.onInputChange
                },
                ".L759-line-finder .L759-find-prev": {
                    onclick: M.prev
                },
                ".L759-line-finder .L759-find-next": {
                    onclick: M.next
                },
                ".L759-line-finder .L759-find-hide": {
                    onclick: M.hide
                },
                ".L759-searchbox .L759-searchterms": {
                    onkeydown: function(e) {
                        (13 === e.keyCode || "Enter" === e.keyIdentifier) && (e.preventDefault(), e.stopPropagation(), 
                        w.panelHelpers.doSearch());
                    }
                },
                ".L759-searchbox .L759-dosearch": {
                    onclick: w.panelHelpers.doSearch
                },
                "a.L759-settings-link": {
                    _post: function() {
                        ("robwu.nl" === location.host || "rob.lekensteyn.nl" === location.host || /^(chrome-extension|widget)/.test(location.protocol)) && (this.href = "#config", 
                        this.target = "");
                    }
                }
            });
            window.addEventListener("resize", w.panelHelpers.globalResize, !0);
        }, w.render.unbindInitialEvents = function() {
            i(w.panelElement).update({
                ".L759-resizer": {
                    onmousedown: null,
                    ontouchstart: null
                },
                ".L759-title": {
                    onmousedown: null,
                    ontouchstart: null,
                    ondblclick: null
                },
                ".L759-close": {
                    onclick: null
                },
                ".L759-toggle-info": {
                    onclick: null
                },
                ".L759-result": {
                    ondblclick: null,
                    onmousedown: null
                },
                ".L759-finder-searchterms": {
                    onkeydown: null,
                    oninput: null
                },
                ".L759-line-finder .L759-find-prev": {
                    onclick: M.prev
                },
                ".L759-line-finder .L759-find-next": {
                    onclick: M.next
                },
                ".L759-line-finder .L759-find-hide": {
                    onclick: M.hide
                },
                ".L759-searchbox .L759-searchterms": {
                    onkeydown: null
                },
                ".L759-searchbox .L759-dosearch": {
                    onclick: null
                }
            }), window.removeEventListener("resize", w.panelHelpers.globalResize, !0);
        }, w.render.showMessage = function(e) {
            var t = {
                dir: ""
            };
            t[e.html ? "innerHTML" : "textContent"] = e.message, i(w.panelElement).update({
                ".L759-title": {
                    textContent: e.title || "Lyrics Here",
                    title: ""
                },
                ".L759-fetching, .L759-top-bar, .L759-info .L759-song-info": {
                    _post: w.panelHelpers.hide
                },
                ".L759-result": t
            });
        }, w.render.fetchingLyrics = function(e) {
            var t = decodeURI(e.url);
            i(w.panelElement).update({
                ".L759-title": {
                    textContent: "Searching...",
                    title: ""
                },
                ".L759-fetching": {
                    _post: w.panelHelpers.show
                },
                ".L759-fetching .L759-buttons .L759-b-abort": {
                    onclick: e.abort,
                    _post: w.panelHelpers["function" == typeof e.abort ? "show" : "hide"]
                },
                ".L759-fetching .L759-buttons .L759-b-retry": {
                    onclick: e.retry,
                    _post: w.panelHelpers["function" == typeof e.retry ? "show" : "hide"]
                },
                ".L759-fetching .L759-buttons .L759-b-next": {
                    onclick: e.next,
                    _post: w.panelHelpers["function" == typeof e.next ? "show" : "hide"]
                },
                ".L759-done, .L759-top-bar": {
                    _post: w.panelHelpers.hide
                },
                ".L759-link-to-fetched-source": {
                    href: e.url,
                    title: t,
                    textContent: t.length > 200 ? t.substring(0, 200) + "..." : t
                },
                ".L759-result": {
                    textContent: ""
                }
            });
        }, w.render.notFound = function(e) {
            i(w.panelElement).update({
                ".L759-title": {
                    textContent: "Not found",
                    title: ""
                },
                ".L759-fetching": {
                    _post: w.panelHelpers.hide
                },
                ".L759-done, .L759-top-bar": {
                    _post: w.panelHelpers.show
                },
                ".L759-done .L759-result": {
                    dir: "ltr",
                    innerHTML: "Cannot find lyrics (" + (+e.sourceCount || 0) + "x) for:<br>" + '<span class="YTL-notFound"></span>' + '<br>&bull; <a class="YTL-notFound-search-link" target="_blank" rel="noreferrer"></a>' + '<br>&bull; <span title="Enable or disable lyric providers.\n ' + +S.Total + ' sources are available.">' + '<a href="https://robwu.nl/lyricshere/#config" target="_blank">Edit sources</a>' + (S.New ? " (" + +S.New + " new)" : "") + "</span><br>"
                },
                ".L759-info .L759-song-info": {
                    _post: w.panelHelpers.hide
                }
            });
            var t = n.prototype.$SEARCHTERMS(e.query, {
                keepAccents: !0
            });
            /\blyrics\b/i.test(t) || (t += " lyrics"), t = encodeURIComponent(t);
            var r = "https://encrypted.google.com/search?q=" + t;
            i(w.panelElement).update({
                ".YTL-notFound": {
                    textContent: e.searchTerms
                },
                ".YTL-notFound-search-link": {
                    href: r,
                    textContent: "Try Google (new window)"
                }
            }), w.render.updateSwitchSourceLink(e);
        }, w.render.foundLyrics = function(e) {
            var t = /^[^A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF]*[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/, r = t.test(e.lyrics[0]) ? "rtl" : "ltr";
            i(w.panelElement).update({
                ".L759-title": {
                    textContent: e.title,
                    title: e.title + "\n\nSource: " + e.sourceIdentifier
                },
                ".L759-fetching": {
                    _post: w.panelHelpers.hide
                },
                ".L759-done, .L759-top-bar": {
                    _post: w.panelHelpers.show
                },
                ".L759-info .L759-song-info": {
                    _post: w.panelHelpers.show
                },
                ".L759-info .L759-song-title": {
                    textContent: e.title,
                    title: e.title
                },
                ".L759-info .L759-link-to-found-source": {
                    href: e.url,
                    textContent: e.sourceIdentifier
                },
                ".L759-done .L759-result": {
                    dir: r,
                    textContent: ""
                }
            }), w.render.updateSwitchSourceLink(e);
            var n = document.createDocumentFragment(), o = document.createElement("div");
            o.className = "L759-lyrics-line";
            for (var s = 0; e.lyrics.length > s; s++) {
                var a = o.cloneNode(!1);
                a.textContent = e.lyrics[s], n.appendChild(a);
            }
            w.panelElement.querySelector(".L759-done .L759-result").appendChild(n);
        }, w.render.updateSwitchSourceLink = function(e) {
            i(w.panelElement).update({
                ".L759-switch-source": {
                    onclick: e.next || e.restart,
                    title: "Click to search for lyrics at a different source.\nCurrent query: " + e.searchTerms
                },
                ".L759-switch-source .L759-sourceindex": {
                    textContent: e.sourceCount && e.sourceIndex + 1
                },
                ".L759-switch-source .L759-sourcecount": {
                    textContent: e.sourceCount
                }
            });
        };
        var B = !1;
        w.reset = function() {
            w.detachPanel(), x = null, w.panelElement = null, c.reset(), B = !1;
        }, w.init = function() {
            B || (B = !0, c.listenEvent("toggle", function() {
                w.panelElement && (w.isVisible() ? w.detachPanel() : w.attachPanel());
            }));
        }, t.LyricsPanel = w, t.LyricLineFinder = M;
    }), r("BaseIntegratedLyrics", [ "require", "exports", "module", "LyricsPanel", "eventBridge", "config" ], function(e, t) {
        var r = e("LyricsPanel").LyricsPanel, n = e("eventBridge"), o = e("config"), i = function(e, t, r) {
            console && console.log(e + ": " + r);
        }, s = function(e, t, r) {
            var n = Error(e + ": " + r);
            throw n.type = t, n;
        }, a = t;
        a.shouldLoad = function() {
            return !0;
        }, a.LyricsPanel = r, a.getQuery = function() {
            var e = "", t = "";
            return {
                song: e,
                artist: t
            };
        }, a.watchNavigationChanges = function() {
            var e = this;
            clearInterval(e._poller), e._poller = setInterval(function() {
                e.checkContext();
            }, 200);
        }, a.unwatchNavigationChanges = function() {
            var e = this;
            clearInterval(e._poller);
        }, a.checkContext = function() {
            var e = this, t = e.getQuery();
            if (t.song || t.artist || t.videotitle) {
                var r = e._lastQuery;
                r && r.song === t.song && r.artist === t.artist && r.videotitle === t.videotitle || (e._lastQuery = t, 
                e.LyricsPanel.runQuery(t));
            }
        }, a.putTinyButton = function() {}, a.hasLaunchedPanel = !1, a.launchPanel = function() {
            var e = this;
            e.hasLaunchedPanel || (e.hasLaunchedPanel = !0, e.LyricsPanel.loadOffsets(function() {
                e.LyricsPanel.init(), e.launchPanelPlaceholder(), e.checkContext(), e.watchNavigationChanges();
            }));
        }, a.launchPanelPlaceholder = function() {
            var e = this;
            e.LyricsPanel.queryCallback({
                type: "message",
                html: !0,
                title: "Lyrics for " + e.siteFriendlyName,
                message: 'Play a song or use the search box to get lyrics.<br><br>Hit the close button to hide the panel.<br>&raquo; <a href="https://robwu.nl/lyricshere/#config" target="_blank">Preferences</a>'
            });
        }, a.reset = function() {
            var e = this;
            e._lastQuery = null, e.hasLaunchedPanel = !1, e.unwatchNavigationChanges(), e.LyricsPanel.reset();
        }, a.init = function() {
            var e = this;
            i("BIL:init", "init", "Initializing " + e.siteFriendlyName + " Lyrics."), n.listenEvent("attached", e.watchNavigationChanges.bind(e)), 
            n.listenEvent("detached", e.unwatchNavigationChanges.bind(e)), e.initLaunch();
        }, a.initLaunch = function() {
            var e = this;
            n.listenEvent("iconinserted", e.putTinyButton.bind(e)), o.getItem(e.siteIdentifier + "-autolaunch", function(t) {
                if (n.dispatchEvent("detached"), t !== !1) e.launchPanel(); else {
                    var r = !0;
                    n.listenEvent("toggle", function() {
                        r && (e.launchPanel(), r = !1);
                    });
                }
            });
        }, t.extend = function(e, t, r) {
            var n = this;
            e && t || s("BIL:extend", "invalid_args", "Site ID or friendly name not provided!"), 
            r || (r = {}), r.siteIdentifier = e, r.siteFriendlyName = t;
            for (var o in n) n.hasOwnProperty(o) && !r.hasOwnProperty(o) && (r[o] = n[o]);
            return r;
        };
    }), r("sites/youtube", [ "require", "exports", "module", "BaseIntegratedLyrics" ], function(e, t) {
        var r = e("BaseIntegratedLyrics"), n = function(e, t, r) {
            console && console.log(e + ": " + r);
        };
        r.extend("youtube", "YouTube", t), t.shouldLoad = function() {
            return !!document.title;
        }, t.getQuery = function() {
            var e, t = "", r = "", n = "";
            return (e = document.querySelector(".video-detail .title a")) ? n = e.title : document.getElementById("watch-headline-title") ? (e = document.querySelector('#content meta[itemprop="name"]'), 
            e && (n = e.getAttribute("content")), n || (e = document.title, e = e.replace(/^\u25b6/, ""), 
            e = e.replace(/\-\s*YouTube\s*$/, "").trim(), n = e), e = document.querySelector('a[href^="/artist/"]'), 
            e || (e = document.querySelector(".metadata-info-title+*")), e && (r = e.textContent.trim()), 
            e = document.querySelector('a[onmousedown*="metadata"]'), e = e && e.parentNode, 
            e = e && e.previousElementSibling, e = e && e.textContent.trim(), e && (e = e.match(/^[^"]*"([\S\s]+)"[^"]*$/) || e.match(/^[^„]*„([\S\s]+)”[^”]*$/) || e.match(/^[^„]*„([\S\s]+)“[^“]*$/) || e.match(/^[^«]*«([\S\s]+)»[^»]*$/) || e.match(/^[^']*'([\S\s]+)'[^']*$/) || e.match(/^[^“]*“([\S\s]+)”[^”]*$/) || e.match(/^[^»]*»([\S\s]+)«[^«]*$/) || e.match(/^Koupit skladbu ([\S\s]+) na$/) || e.match(/^K\xFApi\u0165 skladbu ([\S\s]+) v slu\u017Ebe$/) || e.match(/^Osta ([\S\s]+) myym\xE4l\xE4st\xE4$/) || e.match(/^K\xF6p ([\S\s]+) p\xE5:$/) || e.match(/^([\S\s]+) \u0B90 \u0B87\u0BA4\u0BBF\u0BB2\u0BCD \u0BB5\u0BBE\u0B99\u0BCD\u0B95\u0BC1\u0B95$/) || e.match(/^[^\u300A]*\u300A([\S\s]+)\u300B[^\u300B]*$/) || e.match(/^[^\u300C]*\u300C([\S\s]+)\u300D[^\u300D]*$/), 
            e && (t = e[1]))) : document.querySelector("h1#vt") && (n = document.title.replace(/^YouTube\s*-\s*$/, "").trim()), 
            {
                song: t,
                artist: r,
                videotitle: n
            };
        };
        var o = "onwebkittransitionend" in window ? "webkitTransitionEnd" : "transitionend";
        window.opera && "function" == typeof window.opera.version && 12.1 > parseFloat(window.opera.version()) && (o = "otransitionend");
        var i, s = function() {
            var e = t;
            i = e.getQuery().videotitle;
        }, a = function() {
            var e = t, r = e.getQuery().videotitle;
            i !== r && (i = r, e.reset(), e.init());
        };
        t.onNavigationEnd = function(e) {
            var r = t;
            "width" === e.propertyName && "progress" === e.target.id && (r.reset(), r.init());
        }, t.watchNavigationChanges = function() {
            var e = this;
            document.body.addEventListener(o, e.onNavigationEnd, !0), window.addEventListener("blur", s, !0), 
            window.addEventListener("focus", a, !0), s();
        }, t.unwatchNavigationChanges = function() {
            var e = this;
            document.body.removeEventListener(o, e.onNavigationEnd, !0), window.removeEventListener("blur", s, !0), 
            window.removeEventListener("focus", a, !0);
        }, t.putTinyButton = function(e) {
            var t = document.getElementById("watch-headline-title");
            t && e.parentNode !== t && t.appendChild(e);
        }, t.launchPanelPlaceholder = function() {}, t.init = function() {
            var e = this;
            n("YTL:init", "init", "Initializing YouTube Lyrics."), e.watchNavigationChanges();
            var t = e.getQuery();
            (t.song || t.artist || t.videotitle) && e.initLaunch();
        };
    }), r("sites/grooveshark", [ "require", "exports", "module", "BaseIntegratedLyrics" ], function(e, t) {
        var r = e("BaseIntegratedLyrics");
        r.extend("grooveshark", "Grooveshark", t), t.shouldLoad = function() {
            return !!document.querySelector("#now-playing-metadata,#playerDetails_nowPlaying,#little-queue");
        };
        var n = function() {
            var e, t = document.getElementById("little-queue"), r = "", n = "";
            return t && (e = t.querySelector(".little-queue-title"), e && (r = e.textContent), 
            e = t.querySelector(".little-queue-meta"), e && (n = e.textContent.split(" - ")[0])), 
            t = e = null, {
                song: r,
                artist: n
            };
        }, o = "now-playing-metadata";
        t.getQuery = function() {
            var e = this, t = document.getElementById(o);
            if (null === t) if (t = document.getElementById("playerDetails_nowPlaying")) o = "playerDetails_nowPlaying"; else if (document.getElementById("little-queue")) return e.getQuery = n, 
            n();
            var r, i = "", s = "";
            return t && (r = t.querySelector(".song"), r && (i = r.title), r = t.querySelector(".artist"), 
            r && (s = r.title)), t = r = null, {
                song: i,
                artist: s
            };
        }, t.putTinyButton = function(e) {
            var t = document.querySelector("#header-user-assets,#header_userOptions,#page-header");
            if (t) {
                var r;
                "header_userOptions" === t.id ? (t = t.parentNode, r = null, -1 === e.className.indexOf("GSRetroPageAction") && (e.className += " GSRetroPageAction")) : r = t.firstChild, 
                e.parentNode !== t && t.insertBefore(e, r);
            }
        }, t.launchPanel = function() {
            var e = this;
            e.launchPanel = function() {};
            var t = document.querySelector("#player-wrapper,#footer");
            t && (e.LyricsPanel.panelHelpers.dimensions.getViewportDimensions = function() {
                var e = t.getBoundingClientRect();
                return {
                    width: e.right,
                    height: e.top
                };
            }), r.launchPanel.call(e);
        };
    }), r("sites/spotify", [ "require", "exports", "module", "BaseIntegratedLyrics", "algorithms" ], function(e, t) {
        var r = e("BaseIntegratedLyrics"), n = e("algorithms");
        r.extend("spotify", "Spotify", t), t.shouldLoad = function() {
            return window.top === window;
        }, t.getQuery = function() {
            var e = "", t = "", r = document.title.replace(/\s*-?\s*Spotify\s*$/i, "").replace(/^[\u25b6\s]+/, ""), o = r.replace(/\([^)]*\)|\[[^\]]*\]/g, " ");
            return -1 == o.indexOf(" - ") && (o = r), o = o.split(" - "), 2 == o.length ? (e = o[0], 
            t = o[1]) : o.length > 2 && (t = o.pop(), e = .7 > n.getSimilarityCoefficient(t, o[0]) ? o[0] : o[1]), 
            {
                song: e,
                artist: t
            };
        }, t.putTinyButton = function(e) {
            var t = document.getElementById("wrapper");
            t && t.appendChild(e);
        };
    }), r("sites/jango", [ "require", "exports", "module", "BaseIntegratedLyrics" ], function(e, t) {
        var r = e("BaseIntegratedLyrics");
        r.extend("jango", "Jango", t), t.shouldLoad = function() {
            return "player" !== window.name && !document.querySelector("frameset");
        };
        var n = function(e) {
            return e && e.textContent.replace(/\([^)]*\)|\[[^\]]*\]/g, " ").trim() || "";
        };
        t.getQuery = function() {
            var e = n(document.getElementById("current-song")), t = n(document.querySelector("#player_current_artist a"));
            return {
                song: e,
                artist: t
            };
        };
    }), r("sites/accuradio", [ "require", "exports", "module", "BaseIntegratedLyrics" ], function(e, t) {
        var r = e("BaseIntegratedLyrics");
        r.extend("accuradio", "AccuRadio", t), t.shouldLoad = function() {
            return window.top === window;
        };
        var n = /^https?:\/\/www\.accuradio\.com\/(?!pop_player)/.test(location.href);
        t.getQuery = function() {
            var e, t;
            return n ? (e = document.getElementById("songtitle"), t = document.getElementById("songartist")) : (e = document.getElementById("span_information_title"), 
            t = document.getElementById("span_information_artist")), e = e ? e.textContent.trim() : "", 
            t = t ? t.textContent.trim() : "", (/^Loading .*\.\.\.$/.test(e) || 0 === t.lastIndexOf("(Not working", 0)) && (t = e = ""), 
            {
                song: e,
                artist: t
            };
        };
    }), r("sites/deezer", [ "require", "exports", "module", "BaseIntegratedLyrics", "eventBridge" ], function(e, t) {
        var r = e("BaseIntegratedLyrics"), n = e("eventBridge");
        r.extend("deezer", "Deezer", t), t.shouldLoad = function() {
            return window.top === window;
        }, t.getQuery = function() {
            var e = document.getElementById("player_track_title");
            e = e ? e.textContent : "";
            var t = document.getElementById("player_track_artist");
            return t = t ? t.textContent : "", {
                song: e,
                artist: t
            };
        }, t.putTinyButton = function(e) {
            var t = document.querySelector("section.topbar");
            t && t.appendChild(e);
        };
        var o = function(e) {
            var t = document.querySelector(".page-wrapper");
            t && (e ? (t.style.width = "auto", t.style.left = "0", t.style.right = e + "px") : (t.style.width = "", 
            t.style.left = "", t.style.right = ""));
        };
        t.init = function() {
            r.init.call(this), n.listenEvent("panelDimensions", function(e) {
                var t = 0;
                50 > e.right && (t = e.width + e.right), o(t);
            });
        };
    }), r("sites/8tracks", [ "require", "exports", "module", "BaseIntegratedLyrics" ], function(e, t) {
        var r = e("BaseIntegratedLyrics");
        r.extend("8tracks", "8tracks", t), t.shouldLoad = function() {
            return window.top === window;
        }, t.getQuery = function() {
            var e = document.querySelector("#now_playing .title_artist .t");
            e = e ? e.textContent : "";
            var t = document.querySelector("#now_playing .title_artist .a");
            return t = t ? t.textContent : "", {
                song: e,
                artist: t
            };
        }, t.putTinyButton = function(e) {
            var t = document.getElementById("player_box");
            t && t.appendChild(e);
        };
        var n;
        t.init = function() {
            clearInterval(n), n = setInterval(function() {
                var e = document.getElementById("player_box");
                e && "none" !== e.style.display && (clearInterval(n), r.init.call(t));
            }, 200);
        };
    }), r("musicSites", [ "require", "exports", "module" ], function(e, t) {
        function r(t) {
            e([ "sites/" + t ], function(e) {
                e.shouldLoad() && e.init();
            });
        }
        function n(e) {
            for (var t = 0; o.length > t; ++t) {
                var r = o[t], n = r[0], i = r[1];
                if (i.test(e)) return n;
            }
            return "";
        }
        var o = [ [ "youtube", /^https?:\/\/www\.youtube\.com\/(?![ve]\/)(?!embed\/)(?!dev(\/|$))/ ], [ "grooveshark", /^https?:\/\/(|(retro|html5)\.)grooveshark\.com\// ], [ "spotify", /^https?:\/\/play\.spotify\.com\// ], [ "jango", /^https?:\/\/[a-z.]+\.jango\.com\// ], [ "accuradio", /^https?:\/\/(www|2012)\.accuradio\.com\// ], [ "deezer", /^https?:\/\/(www|orange)\.deezer\.com\// ], [ "8tracks", /^https?:\/\/8tracks\.com\// ] ], i = o.map(function(e) {
            return e[0];
        });
        t.loadIntegratedLyrics = r, t.identifiers = i, t.getIdentifier = n;
    }), r("setwmode", [], function() {
        function e(e) {
            if (!/^opaque$/i.test(e.getAttribute("wmode"))) {
                var t, r;
                t = e.parentNode, r = e.nextSibling, t.removeChild(e), e.setAttribute("wmode", "opaque"), 
                t.insertBefore(e, r);
            }
        }
        function t() {
            var t = !1;
            setTimeout(function() {
                t = !0;
            }, 6e4);
            var r = setInterval(function() {
                var n = document.getElementsByTagName("embed")[0];
                n ? (clearInterval(r), e(n)) : t && clearInterval(r);
            }, 50);
        }
        return function() {
            if (!(0 > Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") || /mac/i.test(navigator.platform))) {
                var r = document.getElementsByTagName("embed")[0];
                r ? e(r) : t();
            }
        };
    }), r("domready", [], function() {
        function e() {
            clearInterval(r);
            for (var e; e = n.shift(); ) e();
        }
        function t() {
            r = setInterval(function() {
                "complete" === document.readyState && e();
            }, 50), document.addEventListener("DOMContentLoaded", e, !0);
        }
        var r, n = [];
        return function(e) {
            e && ("complete" === document.readyState ? e() : (void 0 === r && t(), n.push(e)));
        };
    }), r("LyricsPanel-demo", [ "require", "exports", "module", "LyricsPanel" ], function(e, t) {
        function r() {
            n.init(), n.infoProvider = null, n.queryCallback({
                type: "message",
                html: !0,
                message: i
            });
        }
        var n = e("LyricsPanel").LyricsPanel, o = /^https?:\/\/rob(wu|\.lekensteyn)\.nl\/(lyricshere|youtubelyrics)/i.test(location.href) || /^(chrome-extension|widget):$/.test(location.protocol) ? "" : "https://robwu.nl/lyricshere/", i = 'Hi there,<br><br>Whenever you visit a <b>YouTube</b> video or play a song on <b>Grooveshark</b>, <b>Spotify</b>\'s Web Player, <b>Jango</b>, <b>AccuRadio</b>, <b>Deezer</b>, <b>8tracks</b>, or any of the other supported music sites, lyrics will be displayed in this box. If you want to see other lyrics, click on "Different source", or use the search box below.<br><br>&raquo; <a href="' + o + '#quick-guide">More information</a><br><br>';
        t.init = r;
    }), r("dragndrop-nodes", [ "require", "exports", "module" ], function(e, t) {
        function r() {
            if (a) {
                a.style.display = i;
                var e = c.parentNode;
                e && e.removeChild(c), a = null, s = null, c = null;
            }
        }
        function n(e, t, r) {
            var n = e[l + t];
            n && (e.removeEventListener(t, n, !1), e[l + t] = null), r && (e.addEventListener(t, r, !1), 
            e[l + t] = r);
        }
        function o(e, t, o) {
            function l(e) {
                e.stopPropagation(), e.preventDefault();
            }
            if (t && !t.contains(e)) throw Error("The dragged node must be the moved node or a child of the moved node!");
            t = t || e;
            var u = function(e) {
                t.dragDrop(), l(e);
            };
            n(e, "mouseover", function() {
                "draggable" in t ? t.draggable = !0 : t.dragDrop && n(t, "selectstart", u);
            }), n(e, "mouseout", function() {
                t.draggable ? t.draggable = !1 : n(t, "selectstart");
            }), n(t, "dragstart", function(e) {
                a = t, s = a.previousSibling, c = document.createElement(a.tagName), c.draggable = !0, 
                c.className = "drag-drop-placeholder", c.style.height = a.offsetHeight + "px", n(c, "dragover", l), 
                n(c, "drop", function(e) {
                    l(e), c.parentNode.insertBefore(a, c), o && a.previousSibling !== s && o(), r();
                });
                try {
                    e.dataTransfer.effectAllowed = "move", e.dataTransfer.setData("text/plain", "");
                } catch (i) {}
            }), n(t, "dragenter", function(e) {
                if (a && e.target === t) {
                    var r = e.target;
                    if ("none" !== a.style.display) return a.parentNode.insertBefore(c, a), i = a.style.display, 
                    a.style.display = "none", void 0;
                    if (r !== c) {
                        var n = r.parentNode;
                        0 === (2 & c.compareDocumentPosition(r)) && (r = r.nextSibling), n.insertBefore(c, r);
                    }
                }
            }), n(t, "dragover", l), n(t, "drop", l), n(t, "dragend", r);
        }
        var i, s, a, c, l = "dndEvent" + Math.random();
        t.bindDnD = o;
    }), r("text!style/config.css", [], function() {
        return ".drag-drop-placeholder {\n    outline: 1px dashed #AAA;\n}\n.pref-sources, .pref-item {\n    width: 390px;\n    list-style-type: none;\n    margin: 0;\n    padding: 0;\n}\n.pref-sources {\n    position: relative;\n    margin: 5px 0 0;\n}\n.pref-sources *,\n.config-site-box {\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n}\n.pref-item {\n    height: 24px;\n    padding: 2px 0;\n    line-height: 20px;\n    font-size: 18px;\n}\n.pref-item.source-disabled {\n    opacity: 0.4;\n}\n.pref-item.source-disabled:hover {\n    opacity: 0.8;\n}\n.pref-item .anchor {\n    display: inline-block;\n    width: 30px;\n    text-align: center;\n    cursor: move;\n}\n.pref-item .description {\n    padding: 0 10px;\n}\n.pref-item input[type=checkbox] {\n    display: none;\n}\n.pref-item input[type=checkbox] + span {\n    display: inline-block;\n    width: 4ex;\n    height: 20px;\n    border: 1px solid #BBB;\n    background-color: #fff;\n    vertical-align: middle;\n    line-height: 1em;\n    font-size: 16px;\n    text-align: center;\n    cursor: default;\n}\n.pref-item input[type=checkbox] + span:hover {\n    border-color: #000;\n}\n.pref-item input[type=checkbox] + span:before {\n    content: 'Off';\n}\n.pref-item input[type=checkbox]:checked + span:before {\n    content: 'On';\n}\n\n/* Description of source */\n.pref-item.sd-highlight:hover,\n.source-item-description:hover ~ .pref-item.sd-highlight {\n    outline: 1px solid #888;\n}\n.source-item-description-sticky,\n.source-item-description {\n    position: absolute;\n    top: 0;\n    left: 400px;\n    display: none;\n    width: 300px;\n    height: 100%;\n    border-left: 3px solid #99C;\n    padding: 7px;\n    font-size: 16px;\n    background-color: #eef2f6; /* background-color of #main */\n}\n.source-item-description-sticky {\n    display: block;\n    pointer-events: none;\n}\n.source-item-description-sticky.need-sticky ~ .source-item-description {\n    position: fixed;\n    /*\n     * left:\n     * +400px (default left offset)\n     * +8px (margin-left without calc)\n     * +5px (#main's border-left-width)\n     * +20px (#main's padding-left)\n     * = 433px\n     */\n    left: 433px;\n    height: auto;\n    z-index: 1;\n}\n@media screen and (min-width: 1024px) {\n.source-item-description-sticky.need-sticky ~ .source-item-description {\n    /*\n     * left:\n     * +400px (default left offset)\n     * +50% - 512px (#main's margin-left with calc)\n     * +5px (#main's border-left-width)\n     * +20px (#main's padding-left)\n     * = 50% - 87px\n     */\n    left: -webkit-calc(50% - 87px);\n    left: -moz-calc(50% - 87px);\n    left: calc(50% - 87px);\n}\n}/*end of @media screen and (min-width: 1024px)*/\n\n.source-item-description.sd-visible {\n    display: block;\n}\n.sd-source-header {\n    font-weight: bold;\n    margin: 0 0 0.5em 0;\n}\n.sd-description {\n    white-space: pre-wrap;\n}\n\n\n.config-site-box {\n    display: inline-block;\n    border: 1px solid transparent;\n    width: 32%;\n    min-height: 2em;\n    padding: 0.5em;\n    background-color: #EEFAEE;\n    border-radius: 3px;\n    vertical-align: top;\n}\n.config-site-box:hover {\n    border-color: #CCF;\n}\n.config-site-box label:hover {\n    background-color: #FED;\n}\n.config-site-box.site-disabled {\n    background-color: #FAEEEE;\n}\n.config-site-box .config-site-items {\n    position: relative;\n}\n.config-site-box .btn-enable-site,\n.config-site-box.site-disabled:hover .btn-disable-site,\n.config-site-box .btn-disable-site {\n    display: none;\n}\n.config-site-box:hover .btn-disable-site,\n.config-site-box.site-disabled .btn-enable-site {\n    display: block;\n}\n.config-site-box.site-disabled .config-site-items > div {\n    visibility: hidden;\n}\ninput[type=\"button\"].btn-disable-site {\n    position: absolute;\n    right: 0;\n    top: -2em;\n    height: 1.5em;\n    padding-top: 0;\n    opacity: 0.6;\n}\ninput[type=\"button\"].btn-disable-site:hover {\n    opacity: 1;\n}\ninput[type=\"button\"].btn-enable-site {\n    /* Big button */\n    width: 80%;\n    height: 2em;\n    max-height: 100%;\n\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    margin: auto;\n}\n";
    }), r("options", [ "require", "exports", "module", "LyricsPanel-demo", "sources/lyrics", "musicSites", "MultiLyricsSource", "config", "dragndrop-nodes", "text!style/config.css" ], function(e, t) {
        function r() {
            var e = document.createElement("style");
            e.appendChild(document.createTextNode(w)), (document.head || document.documentElement).appendChild(e);
        }
        function n(e, t) {
            "onmouseenter" in document.documentElement ? e.addEventListener("mouseenter", t) : e.addEventListener("mouseover", function(e) {
                return this === e.relatedTarget || this.contains(e.relatedTarget) ? void 0 : t.call(this, e);
            });
        }
        function o(e, t, r, n) {
            var o = document.createElement("option");
            return o.label = e, o.text = t, o.defaultSelected = !!r, o.selected = !!n, o;
        }
        function i() {
            function e(e, t) {
                var r = document.getElementsByClassName(t)[0];
                if (r) {
                    if (r === e) return;
                    r.classList.remove(t);
                }
                e.classList.add(t);
            }
            function t() {
                l || (l = document.createElement("li"), l.className = "pref-item", l.innerHTML = '<span class="anchor">::</span><label><input type="checkbox"><span></span></label><span class="description"></span>');
                var e = l.cloneNode(!0);
                return e.querySelector('input[type="checkbox"]').onchange = function() {
                    e.classList[this.checked ? "remove" : "add"]("source-disabled"), s();
                }, e;
            }
            function r(t) {
                u || (u = document.createElement("li"), u.className = "source-item-description", 
                u.innerHTML = '<h2 class="sd-source-header"><a class="sd-source-link" target="_blank" rel="noreferrer"></a></h2><div><p class="sd-description"></p>View statistics on <a class="sd-alexa-link" target="_blank" rel="noreferrer" title="Alexa provides public demographics about websites, such as the visitor\'s country. You can use this tool to find out if this source suits your needs.">Alexa</a>.</div>');
                var r = u.cloneNode(!0);
                return n(r, function() {
                    e(t, "sd-highlight");
                }), n(t, function() {
                    e(r, "sd-visible"), e(t, "sd-highlight");
                }), r;
            }
            function o() {
                var e = document.createElement("input");
                return e.type = "button", e.id = "restore-defaults", e.value = "Restore defaults", 
                e.onclick = function() {
                    confirm("Do you want to remove your current Lyrics Source preferences, and restore the defaults?\nWarning: This step cannot be undone!") && a();
                }, e;
            }
            function i() {
                function e() {
                    if (!document.body.contains(t)) return window.removeEventListener("scroll", e), 
                    window.removeEventListener("resize", e), void 0;
                    var n = t.getBoundingClientRect();
                    if (n.bottom >= 0 && 0 >= n.top) {
                        t.classList.add("need-sticky");
                        var o = t.parentNode.querySelector(".sd-visible");
                        o.style.top = "", r && r !== o && (r.style.top = "", r = null);
                        var i = n.bottom - o.getBoundingClientRect().bottom;
                        0 > i && (o.style.top = i + "px", r = o);
                    } else r && (r.style.top = "", r = null), t.classList.remove("need-sticky");
                }
                var t = document.createElement("li");
                t.className = "source-item-description-sticky", window.addEventListener("scroll", e), 
                window.addEventListener("resize", e);
                var r;
                return t;
            }
            var c = document.getElementById("config-source");
            c.textContent = "Loading...";
            var l, u, d = document.createDocumentFragment();
            y.getAllLyricsSources(function(e) {
                d.appendChild(i());
                var n = document.createElement("ol");
                n.className = "pref-sources", e.forEach(function(e) {
                    var o = t();
                    e.disabled && o.classList.add("source-disabled");
                    var i = e.identifier, a = o.querySelector('input[type="checkbox"]');
                    a.checked = !e.disabled, a.setAttribute("data-source-id", i);
                    var c = i;
                    e instanceof b && (c += " (search)"), o.querySelector(".description").textContent = c, 
                    S(o.querySelector(".anchor"), o, s), n.appendChild(o), o = r(o);
                    var l = o.querySelector(".sd-source-link");
                    l.textContent = i, l.href = e.homepage, l = o.querySelector(".sd-alexa-link"), l.href = "http://www.alexa.com/siteinfo/" + e.homepage;
                    var u = o.querySelector(".sd-description");
                    u.textContent = e.description || "(no description)", u.appendChild(document.createElement("br")), 
                    d.appendChild(o);
                }), c.textContent = 'Sources on top are used first. Enable a few lyrics sites and at least one search engine (marked "(search)") to get optimal results.', 
                n.insertBefore(d, n.firstChild);
                var a = document.createElement("li");
                a.className = "source-item-description sd-visible", a.innerHTML = '<h2 class="sd-source-header">Description</h2>Hover over an item at the left side for brief descriptions.<br><br>Found a source which is not listed here? Send a mail to <a href="mailto:gwnRob@gmail.com">gwnRob@gmail.com</a>!', 
                n.appendChild(a), c.appendChild(n), c.appendChild(o());
            });
        }
        function s() {
            for (var e = document.querySelectorAll('ol.pref-sources > li.pref-item input[type="checkbox"]'), t = [], r = [], n = [], o = 0; e.length > o; o++) {
                var i = e[o], s = i.getAttribute("data-source-id"), a = i.checked;
                t.push(s), (a ? n : r).push(s);
            }
            var c = {
                order: t,
                blacklist: r,
                whitelist: n
            };
            c.schemeVersion = y.schemeVersion, L.setItem("lyricsSourcePreferences", c, function(e) {
                e ? x("Successfully saved preferences.") : x("Failed to save all preferences.");
            });
        }
        function a() {
            L.removeItem("lyricsSourcePreferences", function(e) {
                x(e ? "Successfully removed prefs." : "Failed to remove all prefs."), i();
            });
        }
        function c(e) {
            function t() {
                L.getItem("setwmode", function(e) {
                    e = e !== !1, n.checked = e;
                });
            }
            if (!(0 > Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") || /mac/i.test(navigator.platform))) {
                var r = document.createElement("div");
                r.id = "config-wmode", r.innerHTML = '<label title="Set wmode=opaque. \nRequired if you want to drag the panel over the video. \nSearch suggestions will also start to work properly! \nEnabling this option might affect performance."><input type="checkbox"> Set wmode parameter</label>', 
                e.appendChild(r);
                var n = r.querySelector("input[type=checkbox]");
                n.checked = !0, n.onchange = function() {
                    L.setItem("setwmode", n.checked, function(e) {
                        x(e ? "Successfully saved wmode pref." : "Failed to save wmode pref."), t();
                    });
                }, t();
            }
        }
        function l() {
            var e = document.getElementById("launch-demo"), t = e.getAttribute("data-x");
            t = (t || "_") + "_", e.setAttribute("data-x", t), e.style.display = "block";
            var r = function() {
                t == e.getAttribute("data-x") ? g.init() : e.removeEventListener("click", r, !1);
            };
            e.addEventListener("click", r, !1);
        }
        function u(e, t) {
            function r() {
                L.getItem(i, function(e) {
                    e = e !== !1, n.classList[e ? "remove" : "add"]("site-disabled");
                });
            }
            var n = e.parentNode, o = n.querySelector("h2").textContent, i = "enabled." + t, s = function(e) {
                n.classList[e ? "remove" : "add"]("site-disabled"), L.setItem(i, e, function(e) {
                    x((e ? "Successfully saved " : "Failed to save ") + i + " pref.");
                });
            }, a = document.createElement("input");
            a.type = "button", a.value = "Enable", a.className = "btn-enable-site", a.title = "Active Lyrics for " + o, 
            a.onclick = function() {
                s(!0);
            };
            var c = document.createElement("input");
            c.type = "button", c.value = "Disable", c.className = "btn-disable-site", c.title = "Completely disable Lyrics for " + o, 
            c.onclick = function() {
                s(!1);
            }, e.appendChild(a), e.appendChild(c), r();
        }
        function d(e, t) {
            function r() {
                L.getItem(n, function(e) {
                    s.checked = e !== !1;
                });
            }
            var n = t + "-autolaunch", o = "The lyrics can be shown by clicking on the 'Lyrics Here' icon " + ("youtube" == t ? "after the video's title." : "grooveshark" == t ? "at the left side of the player controls." : "spotify" == t ? "at the upper-right corner of the player." : "at the upper-right corner of the video page."), i = document.createElement("div");
            i.id = "config-" + t + "-autolaunch", i.innerHTML = '<label title="If unchecked, lyrics will not be displayed. \n' + o + '"><input type="checkbox"> Automatically show Lyrics.</label>', 
            e.appendChild(i);
            var s = i.querySelector('input[type="checkbox"]');
            s.checked = !0, s.onchange = function() {
                L.setItem(n, s.checked, function(e) {
                    x((e ? "Successfully saved " : "Failed to save ") + n + " pref."), r();
                });
            }, r();
        }
        function p(e, t) {
            function r() {
                L.getItem(n, function(e) {
                    s.value = e, -1 == s.selectedIndex && (s.value = "auto");
                });
            }
            var n = "theme." + t, i = document.createElement("div");
            i.id = "config-" + t + "-theme", i.innerHTML = '<label>Theme: <select class="pref-select-theme"></select></label>', 
            e.appendChild(i);
            var s = i.querySelector("select");
            s.add(new o("Auto-detect", "auto", !0)), s.add(new o("Default", "default")), s.add(new o("Dark", "dark")), 
            s.onchange = function() {
                L.setItem(n, this.value, function(e) {
                    x((e ? "Successfully saved " : "Failed to save ") + n + " pref.");
                });
            }, r();
        }
        function h(e, t) {
            function r() {
                L.getItem(n, function(e) {
                    "string" == typeof e ? (d = s.value = e, u(s.value != e && e)) : u();
                });
            }
            var n = "fontSize." + t, i = document.createElement("div");
            i.innerHTML = '<label>Font size: <select class="pref-select-font-size"></select></label>', 
            e.appendChild(i);
            for (var s = i.querySelector("select"), a = "14px", c = 9; 21 > c; ++c) s.add(new o(c + " px", c + "px", !1, c + "px" == a));
            var l = s.options.length, u = function(e) {
                s.options.length = l, e && s.add(new o(e, e, !1, !0)), s.add(new o("Custom", "custom"));
            }, d = a;
            s.onchange = function() {
                var e = this.value;
                return "custom" != e || (e = prompt("Enter the desired font size (between 1 and 99)", parseFloat(d)), 
                e && (e = parseFloat(e), e = e > 0 && 100 > e ? Math.round(100 * e) / 100 + "px" : null), 
                e) ? (L.setItem(n, e, function(e) {
                    x((e ? "Successfully saved " : "Failed to save ") + n + " pref."), r();
                }), void 0) : (s.value = d, void 0);
            }, r();
        }
        function f() {
            if (!document.getElementById("get-extension")) return x("Not an options page!"), 
            void 0;
            if (!document.documentElement.hasAttribute("YTLActivated")) {
                if (document.documentElement.hasAttribute("YTLDemoActivated")) {
                    for (var e = document.querySelectorAll("#just-a-demo-overlay,.L759-container,.L759-overlay,.LyricsHereByRobWPageActionIcon"), t = 0; e.length > t; ++t) e[t].parentNode.removeChild(e[t]);
                    e = null;
                }
                document.documentElement.setAttribute("YTLActivated", ""), x("Options page detected by Lyrics Here."), 
                m();
            }
        }
        function m() {
            r(), i(), l(), v.identifiers.some(function(e) {
                var t = document.querySelector("#config-" + e + " .config-site-items");
                return t ? (t.textContent = "", "youtube" == e && c(t), u(t, e), d(t, e), p(t, e), 
                h(t, e), void 0) : (x("Element #config-" + e + " .config-site-items not found!"), 
                void 0);
            });
        }
        var g = e("LyricsPanel-demo"), y = e("sources/lyrics"), v = e("musicSites"), b = e("MultiLyricsSource").MultiLyricsSource, L = e("config"), S = e("dragndrop-nodes").bindDnD, w = e("text!style/config.css"), x = function(e) {
            console && console.log("Options: " + e);
        }, A, _, k;
        t.init = f;
    }), t([ "config", "musicSites", "setwmode", "domready", "options" ], function(e, t, r, n, o) {
        var i = t.getIdentifier(location.href);
        if (!i) return /^https?:\/\/rob(wu|\.lekensteyn)\.nl\/(lyricshere|youtubelyrics)/.test(location.href) && n(function() {
            o.init();
        }), void 0;
        var s = !1, a = 2, c = function() {
            0 === --a && s && t.loadIntegratedLyrics(i);
        };
        e.getItem("enabled." + i, function(e) {
            s = e !== !1, c();
        }), n(c), "youtube" === i && 0 > Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") && !/mac/i.test(navigator.platform) && e.getItem("setwmode", function(e) {
            e !== !1 && r();
        });
    });
})();