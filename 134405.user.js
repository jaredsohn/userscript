// ==UserScript==
// @name           CerealOgameStats
// @description    Make alliance stats from ogame to post in forums
// @namespace      http://userscripts.org/users/68563/scripts
// @downloadURL    https://userscripts.org/scripts/source/134405.user.js
// @updateURL      https://userscripts.org/scripts/source/134405.meta.js
// @icon           http://s3.amazonaws.com/uso_ss/icon/134405/large.png
// @version        2.6.1
// @include        *://*.ogame.*/game/index.php?*page=alliance*
// ==/UserScript==
/*! CerealOgameStats (C) 2012 Elías Grande Cásedas | GNU-GPL | gnu.org/licenses */
(function(){var f=window,k,d;
try{if(unsafeWindow){f=unsafeWindow}}catch(h){}k=f.document;var g=function(o){var n=k.createElement("style");
n.setAttribute("type","text/css");if(n.styleSheet){n.styleSheet.cssText=o}else{n.appendChild(k.createTextNode(o))
}var e=k.getElementsByTagName("head")[0];e.appendChild(n)};g("#member-list {display:none;}");var b={ready:false,list:k.createElement("table"),wait:10};
var l=function(){try{var n=k.getElementById("member-list");if(!n){throw 0}else{b.list.innerHTML=n.innerHTML;
b.ready=true;delete b.wait;g("#member-list {display:table;}")}}catch(o){b.wait=Math.round(b.wait*1.1);
var p=this;setTimeout(l,b.wait)}};l();var i={name:"CerealOgameStats",home:"http://userscripts.org/scripts/show/134405"};
String.prototype.replaceAll=function(e,n){return this.split(e).join(n)};String.prototype.recursiveReplaceMap=function(q,p,n){if(n==0){return this.split(q[0]).join(p[0])
}var o,e=this.split(q[n]);for(o in e){e[o]=e[o].recursiveReplaceMap(q,p,n-1)}return e.join(p[n])};String.prototype.replaceMap=function(e){var n,q,p,o;
q=new Array();p=new Array();o=0;for(n in e){q.push(n);p.push(e[n]);o++}if(o==0){return this}else{return this.recursiveReplaceMap(q,p,o-1)
}};String.prototype.trimNaN=function(){return this.replace(/^\D+$/,"").replace(/^\D*(\d)/,"$1").replace(/(\d)\D*$/,"$1")
};var a=function(){var u=function(){this.getMeta("version","ogame-version",null);this.getMeta("language","ogame-language","en");
this.getMeta("timestamp","ogame-timestamp",null);this.getMeta("universe","ogame-universe",null);this.getMeta("alliance_id","ogame-alliance-id",null);
this.getMeta("player_name","ogame-player-name","")};u.prototype={getMeta:function(F,G,H){try{this[F]=k.querySelector('meta[name="'+G+'"]').getAttribute("content")
}catch(I){this[F]=H}}};var s=new u();var B={id:function(F){return i.name+"_"+s.universe+"_"+s.alliance_id+"_"+F
},set:function(I,F){var G=this.id(I);try{f.localStorage.setItem(G,F)}catch(H){f.localStorage[G]=F}return F
},get:function(I){var F=this.id(I);try{return f.localStorage.getItem(F)}catch(G){var H=f.localStorage[F];
return(H=="undefined")?null:H}}};var w=function(){this.lc={}};w.prototype={get:function(F){if(this.lc[F]){return this.lc[F]
}return F},set:function(G){for(var F in G){this.lc[F]=G[F]}},
/*! addCommas | mredkj.com/javascript/nfbasic.html */
number:function(K){var J,F,I,G;
J=K+"";F=J.split(".");I=F[0];G=F.length>1?this.lc.s_dec+F[1]:"";var H=/(\d+)(\d{3})/;while(H.test(I)){I=I.replace(H,"$1"+this.lc.s_tho+"$2")
}return I+G},date:function(F){return F.trimNaN().split(/\D+/).join(this.lc.s_dat)},time:function(F){return F.trimNaN().split(/\D+/).join(this.lc.s_tim)
},period:function(L){var G,K,J,F,I=parseInt(L),H="",M=0;G=Math.floor(I/604800);I-=G*604800;K=Math.floor(I/86400);
I-=K*86400;J=Math.floor(I/3600);I-=J*3600;F=Math.floor(I/60);I-=F*60;if(G>0){H+=this.number(G)+this.lc.a_wee+" ";
M++}if(K>0){H+=this.number(K)+this.lc.a_day+" ";M++}if(J>0||M<1||F+I<1){H+=this.number(J)+this.lc.a_hou+" ";
M++}if(F>0||M<2||(M==2&&I<1)){H+=this.number(F)+this.lc.a_min+" ";M++}if(I>0||M<3){H+=this.number(I)+this.lc.a_sec
}return H.trim()}};var v=new w();var E=function(F){return v.get(F)};v.set({s_dec:".",s_tho:",",s_dat:"/",s_tim:":",a_wee:"w",a_day:"d",a_hou:"h",a_min:"m",a_sec:"s",b_sel:"Select",b_del:"Erase",b_get:"Get from this page",b_sav:'Save as "Old data"',b_loa:"Load saved data",b_res:"Reset stats",t_odt:"Old data",t_ndt:"New data",t_fmt:"Format",t_col:"Colors",t_inc:"Include",t_out:"Statistics (code)",t_stb:"Status",t_pre:"Evolution",t_exp:"Export to forums",p_ago:"{period} ago",p_now:"now",c_dbg:"Dark background",c_lbg:"Light background",e_nod:"No old data",e_nnd:"No new data",e_odf:"The old data has wrong format",e_ndf:"The new data has wrong format",e_unk:"Unexpected error",e_ndt:"No data",e_wft:"Wrong format",w_pcs:"Processing",o_tdt:"Evolution of the alliance since {oldDate} to {newDate}",o_tet:"Elapsed time",o_tas:"Alliance summary",o_ptl:"Total points",o_ppm:"Points per member",o_ttt:"Top 3 by total score",o_tts:"Top 3 by gained score",o_ttp:"Top 3 by gained percent",o_ttg:"Top 3 by gained positions",o_trt:"Total score rank",o_trs:"Gained score rank",o_trp:"Gained percent rank",o_trg:"Gained positions rank",o_tsc:"Special cases",o_cnm:"new member",o_cla:"leaves the alliance",o_bdg:"banned",o_bdq:"unbanned",o_abt:"Statistics performed with {link}",e_oga:"OGame Error, reload this page may fix it"});
if(/es|ar|mx/.test(s.language)){v.set({s_dec:",",s_tho:".",a_wee:"s",a_day:"d",a_hou:"h",a_min:"m",a_sec:"s",b_sel:"Seleccionar",b_del:"Borrar",b_get:"Obtener de esta página",b_sav:'Guardar como "Datos antiguos"',b_loa:"Cargar datos guardados",b_res:"Resetear estadísticas",t_odt:"Datos antiguos",t_ndt:"Datos nuevos",t_fmt:"Formato",t_col:"Colores",t_inc:"Incluir",t_out:"Estadísticas (código)",t_stb:"Estado",t_pre:"Evolución",t_exp:"Exportar para foros",p_ago:"hace {period}",p_now:"ahora",c_dbg:"Fondo oscuro",c_lbg:"Fondo claro",e_nod:"No hay datos antiguos",e_nnd:"No hay datos nuevos",e_odf:"Los datos antiguos tienen un formato erróneo",e_ndf:"Los datos nuevos tienen un formato erróneo",e_unk:"Error inesperado",e_ndt:"Sin datos",e_wft:"Formato erróneo",w_pcs:"Procesando",o_tdt:"Evolución de la alianza desde el {oldDate} hasta el {newDate}",o_tet:"Tiempo transcurrido",o_tas:"Resumen de la alianza",o_ptl:"Puntos totales",o_ppm:"Puntos por miembro",o_ttt:"Top 3 por puntos totales",o_tts:"Top 3 por puntos subidos",o_ttp:"Top 3 por porcentaje subido",o_ttg:"Top 3 por posiciones subidas",o_trt:"Ranking por puntos totales",o_trs:"Ranking por puntos subidos",o_trp:"Ranking por porcentaje subido",o_trg:"Ranking por posiciones subidas",o_tsc:"Casos especiales",o_cnm:"nuevo miembro",o_cla:"abandona la alianza",o_bdg:"baneado",o_bdq:"desbaneado",o_abt:"Estadísticas realizadas con {link}",e_oga:"Error de OGame, recargar esta página puede arreglarlo"})
/*! locale [fr] francais, by Elvara, http://userscripts.org/topics/116649 */
}else{if(/fr/.test(s.language)){v.set({s_dec:".",s_tho:",",s_dat:"/",s_tim:":",a_wee:"s",a_day:"j",a_hou:"h",a_min:"m",a_sec:"s",b_sel:"Sélectionner",b_del:"Effacer",b_get:"Recharger de cette page",b_sav:'Sauvegarder comme "Anciennes données"',b_loa:"Charger anciennes données",b_res:"Réinitialiser les statistiques",t_odt:"Anciennes données",t_ndt:"Nouvelles données",t_fmt:"Format",t_col:"Couleur",t_inc:"Inclure",t_out:"Statistiques (code)",t_stb:"Statut",t_pre:"Évolution",t_exp:"Exporter pour forums",p_ago:"{period} depuis le début",p_now:"maintenant",c_dbg:"Arrière plan foncé",c_lbg:"Arrière plan clair",e_nod:"Pas d'anciennes données",e_nnd:"Pas de nouvelles données",e_odf:"Les anciennes données ont un mauvais format",e_ndf:"Les nouvelles données ont un mauvais format",e_unk:"Erreur inattendu",e_ndt:"Pas de données",e_wft:"Mauvais format",w_pcs:"Traitement en cours",o_tdt:"Évolution de l'alliance du {oldDate} au {newDate}",o_tet:"Temps passé",o_tas:"Résumé de l'alliance ",o_ptl:"Points totaux",o_ppm:"Points par membres",o_ttt:"Top 3 par points totaux",o_tts:"Top 3 par points gagnées",o_ttp:"Top 3 par pourcentage gagné",o_ttg:"Top 3 par places gagnées",o_trt:"Rang par points totaux",o_trs:"Rang par points gagnées",o_trp:"Rang par pourcentage gagné",o_trg:"Rang par places gagnées",o_tsc:"Cas spéciaux",o_cnm:"Nouveaux Membres",o_cla:"A quitté l'alliance",o_bdg:"Banni",o_bdq:"Débanni",o_abt:"Statistiques obtenues avec {link}",e_oga:"Erreur OGame, recharger la page peut régler le problème"})
/*! locale [tr] türk, by Joaquin09, http://userscripts.org/topics/118658 */
}else{if(/tr/.test(s.language)){v.set({s_dec:".",s_tho:",",s_dat:"/",s_tim:":",a_wee:"h",a_day:"g",a_hou:"s",a_min:"d",a_sec:"s",b_sel:"Seç",b_del:"Sil",b_get:"Bu sayfadankini kullan",b_sav:'"Eski veri" olarak kaydet',b_loa:"Kaydedilen verileri yükle",b_res:"İstatistikleri sıfırla",t_odt:"Eski veri",t_ndt:"Yeni veri",t_fmt:"Biçim",t_col:"Renkler",t_inc:"Ekle",t_out:"İstatistik (code)",t_stb:"Durum",t_pre:"Gelişim",t_exp:"Forumlara Aktar ",p_ago:"{period} önce",p_now:"şimdi",c_dbg:"Koyu arka plan",c_lbg:"Açık arka plan",e_nod:"Eski veri",e_nnd:"Yeni veri yok",e_odf:"Eski veri hatalı formatta",e_ndf:"Yeni veri hatalı formatta",e_unk:"Beklenmeyen hata",e_ndt:"Veri yok",e_wft:"Yanlış format",w_pcs:"İşleniyor",o_tdt:"Gelişim Zaman Aralığı {oldDate} - {newDate} ",o_tet:"Geçen zaman",o_tas:"İttifak Bilgisi",o_ptl:"Toplam Puan",o_ppm:"Üye Başına Ortalama Puan",o_ttt:"Toplam Puana Göre En İyi 3",o_tts:"Puan Artışına Göre En İyi 3",o_ttp:"Yüzdelik Artışa Göre En İyi 3",o_ttg:"Sıra Artışına Göre En İyi 3",o_trt:"Toplam Puana Göre Sıralama",o_trs:"Puan Artışına Göre Sıralama",o_trp:"Yüzdelik Artışa Göre Sıralama",o_trg:"Sıra Artışına Göre Sıralama",o_tsc:"Özel Durumlar",o_cnm:"Yeni Üye",o_cla:"İttifaktan ayrılır",o_bdg:"Yasaklı",o_bdq:"Yasağı kaldırılmış",o_abt:"{link} tarafından gerçekleştirilen istatistikler",e_oga:"OGame Hatası, Düzeltmek İçin Sayfayı Tekrar Yükleyin"})
/*! locale [pt] português, by wacker faxes, http://userscripts.org/topics/118886 */
}else{if(/pt|br/.test(s.language)){v.set({s_dec:".",s_tho:",",s_dat:"/",s_tim:":",a_wee:"s",a_day:"d",a_hou:"h",a_min:"m",a_sec:"s",b_sel:"Seleccionar",b_del:"Apagar",b_get:"Obter desta página",b_sav:'Gravar como "Informação antiga"',b_loa:"Carregar informação gravada",b_res:"Recomeçar",t_odt:"Informação antiga",t_ndt:"Informação nova",t_fmt:"Formato",t_col:"Cores",t_inc:"Incluir",t_out:"Estatísticas (código)",t_stb:"Estado",t_pre:"Evolução",t_exp:"Exportar para foruns",p_ago:"{period} atrás",p_now:"agora",c_dbg:"Fundo escuro",c_lbg:"Fundo claro",e_nod:"Sem informação antiga",e_nnd:"Sem informação nova",e_odf:"A informação antiga tem formato errado",e_ndf:"A informação nova tem formato errado",e_unk:"Erro inesperado",e_ndt:"Sem informação",e_wft:"Formato errado",w_pcs:"Processar",o_tdt:"Evolução da aliança desde {oldDate} até {newDate}",o_tet:"Tempo decorrido",o_tas:"Sumario da aliança",o_ptl:"Pontos totais",o_ppm:"Pontos por membro",o_ttt:"Top 3 por pontos totais",o_tts:"Top 3 por pontos ganhos",o_ttp:"Top 3 por percentagem ganha",o_ttg:"Top 3 por posições ganhas",o_trt:"Classificação total de pontos",o_trs:"Classificação pontos ganhos",o_trp:"Classificação percentagem ganha",o_trg:"Classificação posições ganhos",o_tsc:"Casos especiais",o_cnm:"novo membro",o_cla:"deixou aliança",o_bdg:"banido",o_bdq:"ex-banido",o_abt:"Estatísticas realizadas por {link}"})
/*! locale [it] italiano, by adyr, http://userscripts.org/topics/119582 */
}else{if(/it/.test(s.language)){v.set({s_dec:".",s_tho:",",s_dat:"/",s_tim:":",a_wee:"s",a_day:"g",a_hou:"o",a_min:"m",a_sec:"s",b_sel:"Seleziona",b_del:"Cancella",b_get:"Copia dalla pagina",b_sav:'Salva come "Dati vecchi"',b_loa:"Carica dati salvati",b_res:"Resetta le statistiche",t_odt:"Dati vecchi",t_ndt:"Nuovi dati",t_fmt:"Formato",t_col:"Colori",t_inc:"Includi",t_out:"Statistiche (codice)",t_stb:"Status",t_pre:"Progresso",t_exp:"Esporta per il forum",p_ago:"{period} fa",p_now:"ora",c_dbg:"Sfondo scuro",c_lbg:"Sfondo chiaro",e_nod:"Nessun dato vecchio",e_nnd:"Nessun dato nuovo",e_odf:"I dati vecchi hanno un formato sbagliato",e_ndf:"I dati nuovi hanno un formato sbagliato",e_unk:"Errore generico",e_ndt:"Nessu dato",e_wft:"Formato errato",w_pcs:"In elaborazione",o_tdt:"Progresso alleanza da {oldDate} a {newDate}",o_tet:"Tempo trascorso",o_tas:"Sommario alleanza",o_ptl:"Punti totali",o_ppm:"Punti per Player",o_ttt:"Top 3 punteggio totale",o_tts:"Top 3 punti guadagnati",o_ttp:"Top 3 percentuale punti guadagnati",o_ttg:"Top 3 posizioni guadagnate",o_trt:"Classifica punteggio totale",o_trs:"Classifica punti guadagnati",o_trp:"Classifica percentuale punti guadagnati",o_trg:"Classifica posizioni guadagnate",o_tsc:"Casi speciali",o_cnm:"nuovo alleato",o_cla:"ha lasciato l alleanza",o_bdg:"bannato",o_bdq:"sbannato",o_abt:"Statistiche create da {link}",e_oga:"Errore di Ogame, ricarica la pagina"})
}}}}}var D=function(){this.names=new Array();this.colors=new Array();this.selected=null};D.prototype={add:function(G,F){this.names.push(G);
this.colors.push(F)},select:function(F){this.selected=this.colors[F]},replace:function(F){return F.replaceMap(this.selected)
}};var t=new D();t.add(E("c_dbg"),{"{nameColor}":"white","{growsColor}":"#00FF40","{decreasesColor}":"#ED7010","{remainsColor}":"#00DDDD"});
t.add(E("c_lbg"),{"{nameColor}":"purple","{growsColor}":"green","{decreasesColor}":"red","{remainsColor}":"blue"});
var q={diffScore:function(F,I){var H=I-F;var G=((I/F)-1)*100;return{score:H,percent:G}}};var o=function(){this.formats=new Array();
this.selected=null;this.escapeMap={"[":"[[u][/u]","]":"[u][/u]]"};this.lastReplace={"{grows}":"\u00BB","{decreases}":"\u00AB","{remains}":"\u007E","{remainsNo}":"\u00D8","{up}":"\u2191","{down}":"\u2193","{infinity}":"\u8734;","{rank}":"#","{\\":"{","\\}":"}"};
this.layout={sectionStart:"[size=big]{title}[/size]",sectionEnd:"\n\n",dateTime:"{date} ([i]{time}[/i])",header:"[b]{title}[/b]\n{elapsedTitle}: {elapsedTime}\n\n",allianceLine:"\n[color={diffColor}]{diff}[/color] [b][color={nameColor}]{title}[/color][/b] - {newScore} ([b][color={diffColor}]{diffScore}[/color][/b]) ([b][color={diffColor}]{diffPercent}[/color][/b] [color={diffColor}][size=small]%[/size][/color])",top3TScoreLine:"\n[color={diffColor}]{position} {diff} [/color] [color={nameColor}][b]{name}[/b][/color] ({newScore})",top3ScoreLine:"\n[color={diffColor}]{position} {diff} [/color] [color={nameColor}][b]{name}[/b][/color] ([b][color={diffColor}]{diffScore}[/color][/b])",top3PercentLine:"\n[color={diffColor}]{position} {diff} [/color] [color={nameColor}][b]{name}[/b][/color] ([b][color={diffColor}]{diffPercent}[/color][/b] [color={diffColor}][size=small]%[/size][/color])",top3PositionsLine:"\n[color={diffColor}]{position} {diff} [/color] [color={nameColor}][b]{name}[/b][/color] ([b][color={diffColor}]{diffPos}[/color][/b])",rankLine:"\n[color={diffColor}]{position} {diff} [/color][color={nameColor}][b]{name}[/b][/color] - {newScore} ([b][color={diffColor}]{diffScore}[/color][/b]) ([b][color={diffColor}]{diffPercent}[/color][/b] [color={diffColor}][size=small]%[/size][/color])",rank:" [size=small]{rank}[/size]{newPos} ([b][color={diffColor}]{diffPos}[/color][/b])",rankNoDiff:" [size=small]{rank}[/size]{newPos} ([b][color={remainsColor}]{remainsNo}[/color][/b])",rankLineNoDiff:"\n[color={diffColor}]{position} {diff} [/color][color={nameColor}][b]{name}[/b][/color] - {oldScore} ([b][color={remainsColor}]{remainsNo}[/color][/b])",from0Member:"\n[color={growsColor}]{grows} [/color] [color={nameColor}][b]{name}[/b][/color] - [b][color={growsColor}]{score}[/color][/b] [size=small]({reason})[/size]",to0Member:"\n[color={decreasesColor}]{decreases} [/color] [color={nameColor}][b]{name}[/b][/color] - [b][color={decreasesColor}]{score}[/color][/b] [size=small]({reason})[/size]",scriptData:"\n[i]{scriptDataTitle}:[/i]\n[spoiler][code]{scriptData}[/code][/spoiler]",scriptLink:"\n[i]"+E("o_abt").replace("{link}","[url={scriptHome}]{scriptName}[/url]")+"[/i]"}
};o.prototype={add:function(F,G){this.formats.push({name:F,patterns:G,escapeMap:(arguments.length>2)?arguments[2]:false})
},select:function(F){this.selected=this.formats[F]},escape:function(F){if(this.selected.escapeMap){return F.replaceMap(this.selected.escapeMap)
}else{return F.replaceMap(this.escapeMap)}},diff:function(G,H){var F=G;if(H<0){F=F.replaceMap({"{diffColor}":"{decreasesColor}","{diff}":"{decreases}"})
}else{if(H>0){F=F.replaceMap({"{diffColor}":"{growsColor}","{diff}":"{grows}"})}else{F=F.replaceMap({"{diffColor}":"{remainsColor}","{diff}":"{remains}"})
}}return F},header:function(F){return this.layout.header.replaceMap({"{title}":E("o_tdt").replaceMap({"{oldDate}":this.layout.dateTime.replaceMap({"{date}":F.oldDate,"{time}":F.oldTime}),"{newDate}":this.layout.dateTime.replaceMap({"{date}":F.newDate,"{time}":F.newTime})}),"{elapsedTitle}":E("o_tet"),"{elapsedTime}":this.escape(v.period(F.newTimestamp-F.oldTimestamp))})
},alliance:function(F){if(F.oldScore==0){return""}return this.layout.sectionStart.replaceAll("{title}",E("o_tas"))+this.diff(this.layout.allianceLine,F.diffScore).replaceMap({"{title}":E("o_ptl"),"{newScore}":F.formatted.newScore,"{diffScore}":F.formatted.diffScore,"{diffPercent}":F.formatted.diffPercent})+this.diff(this.layout.allianceLine,F.diffMemberScore).replaceMap({"{title}":E("o_ppm"),"{newScore}":F.formatted.newMemberScore,"{diffScore}":F.formatted.diffMemberScore,"{diffPercent}":F.formatted.diffMemberPercent})+this.layout.sectionEnd
},position:function(K,F){var G=K+"",J=(G).length,I=(F+"").length;for(var H=J;H<I;H++){G="0"+G}return G
},top3:function(I,K,M,F){var H=(this.layout.sectionStart+"").replace("{title}",M);var G=Math.min(I.length,3);
var J,L;for(J=0;J<G;J++){L=I[J];H=H+this.diff(F,L.diffScore).replaceMap({"{position}":this.position(J+1,G),"{name}":this.escape(L.name),"{diffPos}":L.formatted.diffPos.replaceMap({"+":"{up}","-":"{down}"})}).replaceAll("{"+K+"}",L.formatted[K])
}return H+this.layout.sectionEnd},rank:function(H,L){var G=(this.layout.sectionStart+"").replace("{title}",L);
var F=H.length;var I,K;for(I=0;I<F;I++){K=H[I];var J=(K.diffScore==0)?this.layout.rankLineNoDiff:this.layout.rankLine;
G=G+this.diff(J,K.diffScore).replaceMap({"{position}":this.position(I+1,F),"{name}":this.escape(K.name),"{oldScore}":K.formatted.oldScore,"{newScore}":K.formatted.newScore,"{diffScore}":K.formatted.diffScore,"{diffPercent}":K.formatted.diffPercent});
J=(K.diffPos==0)?this.layout.rankNoDiff:this.layout.rank;G=G+this.diff(J,K.diffPos).replaceMap({"{newPos}":K.formatted.newPos,"{diffPos}":K.formatted.diffPos.replaceMap({"+":"{up}","-":"{down}"})})
}return G+this.layout.sectionEnd},specialCases:function(H,I){if((H.length+I.length)==0){return""}var F=this.layout.sectionStart.replace("{title}",E("o_tsc"));
var G,J;for(G in I){J=I[G];F=F+this.layout.from0Member.replaceMap({"{name}":this.escape(J.name),"{score}":J.score,"{reason}":J.reason})
}for(G in H){J=H[G];F=F+this.layout.to0Member.replaceMap({"{name}":this.escape(J.name),"{score}":J.score,"{reason}":J.reason})
}return F+this.layout.sectionEnd},format:function(H,K,Q,M,P,N,V){var J=this.header(K);if(H.alliance){J=J+this.alliance(K)
}var O="";var I="";var R="";var U="";var G="";var F="";var S="";var T="";if(Q.length>0){Q=Q.sort(function(X,W){if(X.newScore==W.newScore){return(X.diffScore>=W.diffScore)?-1:1
}else{return(X.newScore>=W.newScore)?-1:1}});if(H.top3TScore&&(Q.length>5||!H.tScore)){I=this.top3(Q,"newScore",E("o_ttt"),this.layout.top3TScoreLine)
}if(H.tScore){G=this.rank(Q,E("o_trt"))}Q=Q.sort(function(X,W){if(X.diffScore==W.diffScore){if(X.diffPercent==W.diffPercent){return(X.newScore>=W.newScore)?-1:1
}else{return(X.diffPercent>=W.diffPercent)?-1:1}}else{return(X.diffScore>=W.diffScore)?-1:1}});if(H.top3Score&&(Q.length>5||!H.score)){O=this.top3(Q,"diffScore",E("o_tts"),this.layout.top3ScoreLine)
}if(H.score){F=this.rank(Q,E("o_trs"))}Q=Q.sort(function(X,W){if(X.diffPercent==W.diffPercent){if(X.diffScore==W.diffScore){return(X.newScore>=W.newScore)?-1:1
}else{return(X.diffScore>=W.diffScore)?-1:1}}else{return(X.diffPercent>=W.diffPercent)?-1:1}});if(H.top3Percent&&(Q.length>5||!H.percent)){R=this.top3(Q,"diffPercent",E("o_ttp"),this.layout.top3PercentLine)
}if(H.percent){S=this.rank(Q,E("o_trp"))}Q=Q.sort(function(X,W){if(X.diffPos==W.diffPos){if(X.diffScore==W.diffScore){if(X.diffPercent==W.diffPercent){return(X.newScore>=W.newScore)?-1:1
}else{return(X.diffPercent>=W.diffPercent)?-1:1}}else{return(X.diffScore>=W.diffScore)?-1:1}}else{return(X.diffPos>=W.diffPos)?-1:1
}});if(H.top3Positions&&(Q.length>5||!H.positions)){U=this.top3(Q,"diffPos",E("o_ttg"),this.layout.top3PositionsLine)
}if(H.positions){T=this.rank(Q,E("o_trg"))}}J=J+I+O+R+U+G+F+S+T;if(H.special){J=J+this.specialCases(M,P)
}var L;if(H.oldData){L=JSON.parse(N);J=J+this.layout.scriptData.replaceMap({"{scriptDataTitle}":E("t_odt")+" - "+L.strDate+" ("+L.strTime+")","{scriptData}":"{oldData}"})
}if(H.newData){L=JSON.parse(V);J=J+this.layout.scriptData.replaceMap({"{scriptDataTitle}":E("t_ndt")+" - "+L.strDate+" ("+L.strTime+")","{scriptData}":"{newData}"})
}J=J+this.layout.scriptLink;J=J.replaceMap(this.selected.patterns).replaceMap(t.selected).replaceMap({"{scriptName}":i.name,"{scriptHome}":i.home}).replaceMap(this.lastReplace).replace("{oldData}",N.replaceMap({"<":"\\u003C",">":"\\u003E","[":"\\u005B","]":"\\u005D"})).replace("{newData}",V.replaceMap({"<":"\\u003C",">":"\\u003E","[":"\\u005B","]":"\\u005D"}));
return J.trim()}};var y=new o();y.add("phpBB",{"[size=big]":"[size=20]","[size=small]":"[size=10]"});
y.add("phpBB3",{"[size=big]":"[size=140]","[size=small]":"[size=80]"});y.add("SMF",{"[size=big]":"[size=14pt]","[size=small]":"[size=7pt]"});
y.add("vBulletin",{"[size=big]":"[size=4]","[size=small]":"[size=1]"});y.add("HTML",{"{grows}":"&raquo;","{decreases}":"&laquo;","{remains}":"&sim;","{remainsNo}":"&Oslash;","{up}":"&uarr;","{down}":"&darr;","{infinity}":"&#8734;","[size=big]":'<span style="font-size: 140%;">',"[size=small]":'<span style="font-size: 80%;">',"[/size]":"</span>","[color={":'<span style="color: {',"Color}]":'Color}">',"[/color]":"</span>","[b]":"<b>","[/b]":"</b>","[i]":"<i>","[/i]":"</i>","\n":"<br />\n","[spoiler]":"<div>","[/spoiler]":"</div>","[code]":'<textarea onclick="this.select();" rows="5" cols="20">',"[/code]":"</textarea>","[url={scriptHome}]{scriptName}[/url]":'<a href="{scriptHome}">{scriptName}</a>'},{"&":"&amp;","<":"&lt;",">":"&gt;"});
var A=function(){};A.prototype={reset:function(){this.allyInfo={oldCount:0,oldScore:0,newCount:0,newScore:0};
this.membersInfo=new Array();this.oldMembersInfo=new Array();this.newMembersInfo=new Array();this.to0MembersInfo=new Array();
this.from0MembersInfo=new Array()},readData:function(I,H){var F,G=JSON.parse(I);this.allyInfo[H+"Timestamp"]=G.timestamp;
this.allyInfo[H+"Date"]=G.strDate;this.allyInfo[H+"Time"]=G.strTime;for(F in G.members){this[H+"MembersInfo"].push({id:("i" in G.members[F])?G.members[F].i:-1,name:F,score:G.members[F].s,pos:G.members[F].p,coord:G.members[F].c,date:G.members[F].d,noPartner:true});
this.allyInfo[H+"Count"]++;this.allyInfo[H+"Score"]=this.allyInfo[H+"Score"]+G.members[F].s}return G},merge:function(){var N,L,R,K,M,H,O;
R=this.allyInfo.oldCount;for(N in this.newMembersInfo){M=this.newMembersInfo[N];for(L=0;L<R;L++){K=this.oldMembersInfo[L];
if((K.noPartner)&&(K.id==M.id)){break}}if(L!=R){this.oldMembersInfo[L].noPartner=false;this.newMembersInfo[N].noPartner=false;
if(M.pos==0){this.to0MembersInfo.push({name:M.name,score:v.number(K.score),reason:E("o_bdg")})}else{if(K.pos==0){this.from0MembersInfo.push({name:M.name,score:v.number(M.score),reason:E("o_bdq")})
}else{var F,G,J,Q;if(K.score==0){if(M.score==0){F=0;G=0;J="+0";Q="+"+v.number("0.00")}else{F=M.score;
G=(1/0);J="+"+v.number(M.score);Q="+{infinity}"}}else{if(M.score==0){F=(-1)*K.score;G=(-100);J=v.number(F);
Q=v.number("-100.00")}else{O=q.diffScore(K.score,M.score);F=O.score;G=O.percent;J=((F<0)?"":"+")+v.number(F.toFixed());
Q=((G<0)?"":"+")+v.number(G.toFixed(2))}}H={name:M.name,oldScore:K.score,newScore:M.score,oldPos:K.pos,newPos:M.pos,diffPos:K.pos-M.pos,diffScore:F,diffPercent:G};
H.formatted={oldScore:v.number(H.oldScore),newScore:v.number(H.newScore),oldPos:v.number(H.oldPos.toFixed()),newPos:v.number(H.newPos.toFixed()),diffPos:((H.diffPos<0)?"":"+")+v.number(H.diffPos.toFixed()),diffScore:J,diffPercent:Q};
this.membersInfo.push(H)}}}}var I,P;for(P in this.newMembersInfo){I=this.newMembersInfo[P];if(I.noPartner){this.from0MembersInfo.push({name:I.name,score:v.number(I.score),reason:E("o_cnm")})
}}for(P in this.oldMembersInfo){I=this.oldMembersInfo[P];if(I.noPartner){this.to0MembersInfo.push({name:I.name,score:v.number(I.score),reason:E("o_cla")})
}}this.to0MembersInfo.sort(function(T,S){return parseInt(T.score)-parseInt(S.score)});this.from0MembersInfo.sort(function(T,S){return parseInt(S.score)-parseInt(T.score)
});delete this.oldMembersInfo;delete this.newMembersInfo;O=q.diffScore(this.allyInfo.oldScore,this.allyInfo.newScore);
this.allyInfo.diffScore=O.score;this.allyInfo.diffPercent=O.percent;this.allyInfo.oldMemberScore=this.allyInfo.oldScore/this.allyInfo.oldCount;
this.allyInfo.newMemberScore=this.allyInfo.newScore/this.allyInfo.newCount;O=q.diffScore(this.allyInfo.oldMemberScore,this.allyInfo.newMemberScore);
this.allyInfo.diffMemberScore=O.score;this.allyInfo.diffMemberPercent=O.percent;this.allyInfo.formatted={oldScore:v.number(this.allyInfo.oldScore),newScore:v.number(this.allyInfo.newScore),diffScore:((this.allyInfo.diffScore<0)?"":"+")+v.number(this.allyInfo.diffScore.toFixed()),diffPercent:((this.allyInfo.diffPercent<0)?"":"+")+v.number(this.allyInfo.diffPercent.toFixed(2)),oldMemberScore:v.number(this.allyInfo.oldMemberScore.toFixed()),newMemberScore:v.number(this.allyInfo.newMemberScore.toFixed()),diffMemberScore:((this.allyInfo.diffMemberScore<0)?"":"+")+v.number(this.allyInfo.diffMemberScore.toFixed()),diffMemberPercent:((this.allyInfo.diffMemberPercent<0)?"":"+")+v.number(this.allyInfo.diffMemberPercent.toFixed(2))}
},doIt:function(J){J.setStats();J.setPreview();y.select(parseInt(J.selectFormat.selectedIndex));t.select(parseInt(J.selectColors.selectedIndex));
J.setOkStatus(E("w_pcs")+"...");this.reset();var K,M,I=false;if(J.oldList.value.trim()==""){J.setErrorStatus(E("e_nod"));
J.setTitle("old",E("e_ndt"),false);I=true}if(!I){try{K=this.readData(J.oldList.value,"old");M=K.strDate+" (<i>"+K.strTime+"</i>) &rarr; "+((s.timestamp==K.timestamp)?E("p_now"):E("p_ago").replace("{period}",v.period(s.timestamp-K.timestamp)));
if(this.oldMembersInfo.length==0||/NaN|undefined/.test(M)){throw 0}J.setTitle("old",M,true)}catch(L){J.setTitle("old",E("e_wft"),false);
J.setErrorStatus(E("e_odf"));I=true}}if(J.newList.value.trim()==""){J.setErrorStatus(E("e_nnd"));J.setTitle("new",E("e_ndt"),false);
return}try{K=this.readData(J.newList.value,"new");M=K.strDate+" (<i>"+K.strTime+"</i>) &rarr; "+((s.timestamp==K.timestamp)?E("p_now"):E("p_ago").replace("{period}",v.period(s.timestamp-K.timestamp)));
if(this.newMembersInfo.length==0||/NaN|undefined/.test(M)){throw 0}J.setTitle("new",M,true);if(I){return
}}catch(L){J.setErrorStatus(E("e_ndf"));return}try{this.merge();var F={alliance:J.doAlliance.checked,top3TScore:J.doTop3TScore.checked,top3Score:J.doTop3Score.checked,top3Percent:J.doTop3Percent.checked,top3Positions:J.doTop3Positions.checked,tScore:J.doTScore.checked,score:J.doScore.checked,percent:J.doPercent.checked,positions:J.doPositions.checked,special:J.doSpecial.checked,oldData:J.doOldData.checked,newData:J.doNewData.checked};
J.setStats(y.format(F,this.allyInfo,this.membersInfo,this.to0MembersInfo,this.from0MembersInfo,J.oldList.value.trim(),J.newList.value.trim()));
F.oldData=false;F.newData=false;y.select(y.formats.length-1);t.select(0);var H="[color={nameColor}][b]{name}[/b][/color]".replaceMap(y.selected.patterns).replaceAll("{name}",s.player_name);
var G=H.replaceAll("{nameColor}","#FF0");H=H.replaceMap(t.selected);J.setPreview(y.format(F,this.allyInfo,this.membersInfo,this.to0MembersInfo,this.from0MembersInfo,J.oldList.value.trim(),J.newList.value.trim()).replaceAll(y.selected.patterns["[size=small]"],"<span>").replaceAll(y.selected.patterns["[size=big]"],'<span style="font-size:20px">').replaceAll(H,G));
J.hideStatus()}catch(L){J.setErrorStatus(E("e_unk")+": "+L)}}};var x=new A();var e={num:(new Date()).getTime(),get:function(){return i.name+(this.num++)
}};var n=function(){};n.prototype={addTextarea:function(G){var F=k.createElement("textarea");F.setAttribute("cols","120");
F.setAttribute("rows","40");F.setAttribute("class","textBox");G.appendChild(F);return F},addSelect:function(G){var F=k.createElement("select");
F.setAttribute("class","dropdown");G.appendChild(F);return F},addOption:function(I,H,G){var F=k.createElement("option");
F.appendChild(k.createTextNode(I));F.setAttribute("value",H);G.appendChild(F);return F},addAnchor:function(G,H){var F=k.createElement("a");
F.setAttribute("href","javascript:void(0);");F.setAttribute("class",i.name);F.appendChild(k.createTextNode(H));
G.appendChild(F);return F},addTitle:function(G,H){var F=k.createElement("b");F.appendChild(k.createTextNode(H));
F.setAttribute("style","display:block;font-size:12px");G.appendChild(F);return F},newCell:function(){var F=k.createElement("td");
return F},addText:function(G,H){var F=k.createTextNode(H);G.appendChild(F);return F},addBr:function(F){F.appendChild(k.createElement("br"))
},addEvent:function(H,G,F){H.addEventListener(G,F,false)},addOnChange:function(G,F){G.addEventListener("change",F,false);
G.addEventListener("keyup",F,false)},cancelBubble:function(G){var F=G?G:f.event;if(F.stopPropagation){F.stopPropagation()
}if(F.cancelBubble!=null){F.cancelBubble=true}},addCheckbox:function(H,L,M,K,J){var F=k.createElement("input");
F.setAttribute("type","checkbox");F.setAttribute("id",i.name+"_"+M);F.setAttribute("style","cursor:pointer;");
H.appendChild(F);var G=k.createElement("label");G.setAttribute("for",i.name+"_"+M);G.setAttribute("style","cursor:pointer;");
G.innerHTML="&nbsp;"+L;H.appendChild(G);this.addBr(H);var I=B.get(M);F.checked=(I==null)?K:(parseInt(I)==1);
B.set(M,(F.checked)?1:0);F.addEventListener("change",function(){B.set(M,(F.checked)?1:0);J()},false);
G.addEventListener("mouseover",function(){G.setAttribute("class","undermark")},false);G.addEventListener("mouseout",function(){G.removeAttribute("class")
},false);return F},makeTogleable:function(M,Q,N,I){var O=k.createElement("a");O.setAttribute("class",i.name+"_toggle_button");
var J=I;var H=(M.length)?M:new Array(M);var F=true;var L=function(){F=true;for(var R in H){H[R].removeAttribute("style")
}N.setAttribute("class",N.getAttribute("class").replace("_toggle_bar_open","_toggle_bar_close"))};var P=function(){F=false;
for(var R in H){H[R].setAttribute("style","display:none;")}N.setAttribute("class",N.getAttribute("class").replace("_toggle_bar_close","_toggle_bar_open"))
};var K=function(){if(F){P()}else{L()}};if(J){var G=e.get();O.setAttribute("href","#"+G);O.setAttribute("id",G)
}else{O.setAttribute("href","javascript:void(0);")}O.addEventListener("click",function(R){z.cancelBubble(R);
K()},false);N.setAttribute("class",N.hasAttribute("class")?N.getAttribute("class")+" "+i.name+"_toggle_bar_close":i.name+"_toggle_bar_close");
N.addEventListener("click",function(R){O.click()},false);K();Q.setAttribute("style","position:relative;");
Q.appendChild(O);return{open:L,close:P,toggle:K}},addCss:g,ogameDropDown:function(N){var K,J,H=d(".dropdown.dropdownList").get(),I,L,F,G,O;
try{N.ogameDropDown()}catch(M){N.css("visibility","visible");return false}O={select:N};G=function(){var Q,P;
Q=O.select.val();P=O.select.find('[value="'+Q+'"]').text();O.dropdown.attr("data-value",Q).text(P)};I=d(".dropdown.dropdownList").get();
for(K=0;K<H.length;K++){H[K]=d(H[K])}for(K=0;K<I.length;K++){I[K]=d(I[K]);F=I[K].attr("id");L=true;for(J=0;
J<H.length;J++){if(H[J].attr("id")==F){L=false;break}}if(L){O.dropdown=d('.dropdown [rel="'+F+'"]');G();
N.change(G);break}}return true}};var z=new n();z.addCss("#"+i.name+" table{width: 610px !important;}#"+i.name+" textarea{width: 350px !important;height: 70px !important;margin: 0 !important;padding: 5px !important;}#"+i.name+" a."+i.name+"{display: block !important;padding: 5px 0 0 0 !important;}#"+i.name+" select{width: 250px !important;}#"+i.name+" td{border-top: 2px dotted #242E38 !important;padding: 5px !important;text-align: left !important;}tr.alt #"+i.name+" td{border-top: 2px dotted #24292E !important;}#"+i.name+" td.col2{width: 364px !important;}#"+i.name+" tr.tit td{border-top: none !important;line-height: 18px !important;}td#"+i.name+"_preview{border-top: 2px dotted #242E38 !important;color: #6F9FC8 !important;}#"+i.name+"_preview div{padding-top: 5px !important;padding-bottom: 5px !important;}#"+i.name+"_preview a{display: inline !important;padding: 0 !important;}."+i.name+"_toggle_button{background-color: transparent !important;background-image: url('http://gf2.geo.gfsrv.net/cdn71/fc7a8ede3499a0b19ea17613ff0cb1.gif') !important;display  : block !important;position : absolute !important;top      : 0 !important;right    : 0 !important;height   : 18px !important;width    : 20px !important;}."+i.name+"_toggle_bar_open,."+i.name+"_toggle_bar_close{cursor: pointer !important;}."+i.name+"_toggle_bar_open ."+i.name+"_toggle_button{background-position: 0 0 !important;}."+i.name+"_toggle_bar_close ."+i.name+"_toggle_button{background-position: 0 -18px !important;}."+i.name+"_toggle_bar_open:hover ."+i.name+"_toggle_button{background-position: -20px 0 !important;}."+i.name+"_toggle_bar_close:hover ."+i.name+"_toggle_button{background-position: -20px -18px !important;}");
var r=function(R){var I,N,G,Q,J,S,K,L,H,O,M,F;J=this;L=function(){J.doIt()};var P=/WebKit|Gecko|Presto/i.test(f.navigator.userAgent);
this.table=k.createElement("table");this.table.setAttribute("cellpadding","0");this.table.setAttribute("cellspacing","0");
this.table.setAttribute("class","members bborder");R.appendChild(this.table);I=k.createElement("tbody");
this.table.appendChild(I);N=k.createElement("tr");N.setAttribute("class","tit alt");I.appendChild(N);
G=z.newCell();G.setAttribute("colspan","2");G.setAttribute("class","col2");O=k.createElement("div");z.addTitle(O,E("t_inc")+":");
G.appendChild(O);N.appendChild(G);M=N;N=k.createElement("tr");N.setAttribute("class","alt");I.appendChild(N);
N.appendChild(z.newCell());G=z.newCell();G.setAttribute("class","col2");this.doAlliance=z.addCheckbox(G,E("o_tas"),"doAlliance",true,L);
this.doTop3TScore=z.addCheckbox(G,E("o_ttt"),"doTop3TScore",false,L);this.doTop3Score=z.addCheckbox(G,E("o_tts"),"doTop3Score",false,L);
this.doTop3Percent=z.addCheckbox(G,E("o_ttp"),"doTop3Percent",false,L);this.doTop3Positions=z.addCheckbox(G,E("o_ttg"),"doTop3Positions",false,L);
this.doTScore=z.addCheckbox(G,E("o_trt"),"doTScore",false,L);this.doScore=z.addCheckbox(G,E("o_trs"),"doScore",true,L);
this.doPercent=z.addCheckbox(G,E("o_trp"),"doPercent",true,L);this.doPositions=z.addCheckbox(G,E("o_trg"),"doPositions",false,L);
this.doSpecial=z.addCheckbox(G,E("o_tsc"),"doSpecial",true,L);this.doOldData=z.addCheckbox(G,"[spoiler] "+E("t_odt"),"doOldData",false,L);
this.doNewData=z.addCheckbox(G,"[spoiler] "+E("t_ndt"),"doNewData",true,L);N.appendChild(G);if(P){z.makeTogleable(N,O,M,false)
}N=k.createElement("tr");N.setAttribute("class","tit");I.appendChild(N);G=z.newCell();G.setAttribute("colspan","2");
G.setAttribute("class","col2");O=k.createElement("div");z.addTitle(O,E("t_pre")+":");G.appendChild(O);
N.appendChild(G);M=N;N=k.createElement("tr");I.appendChild(N);G=z.newCell();G.setAttribute("colspan","2");
G.setAttribute("id",i.name+"_preview");N.appendChild(G);if(P){z.makeTogleable(N,O,M,false).open()}G.appendChild(this.preview=k.createElement("div"));
this.previewRow=N;this.setPreview();N=k.createElement("tr");N.setAttribute("class","alt tit");I.appendChild(N);
G=z.newCell();z.addTitle(G,E("t_odt")+":");N.appendChild(G);G=z.newCell();G.setAttribute("class","col2");
O=k.createElement("div");this.oldTitle=k.createElement("span");O.appendChild(this.oldTitle);G.appendChild(O);
N.appendChild(G);M=N;N=k.createElement("tr");N.setAttribute("class","alt");I.appendChild(N);G=z.newCell();
Q=z.addAnchor(G,E("b_sel"));Q.addEventListener("click",function(){J.oldList.select()},false);Q=z.addAnchor(G,E("b_del"));
Q.addEventListener("click",function(){J.setOldList()},false);Q=z.addAnchor(G,E("b_loa"));Q.addEventListener("click",function(){J.load()
},false);Q=z.addAnchor(G,E("b_sav"));Q.addEventListener("click",function(){J.save("old")},false);N.appendChild(G);
G=z.newCell();G.setAttribute("class","col2");this.oldList=z.addTextarea(G);z.addOnChange(this.oldList,L,false);
N.appendChild(G);if(P){z.makeTogleable(N,O,M,true)}N=k.createElement("tr");N.setAttribute("class","tit");
I.appendChild(N);G=z.newCell();z.addTitle(G,E("t_ndt")+":");N.appendChild(G);G=z.newCell();G.setAttribute("class","col2");
O=k.createElement("div");this.newTitle=k.createElement("span");O.appendChild(this.newTitle);G.appendChild(O);
N.appendChild(G);M=N;N=k.createElement("tr");I.appendChild(N);G=z.newCell();Q=z.addAnchor(G,E("b_sel"));
Q.addEventListener("click",function(){J.newList.select()},false);Q=z.addAnchor(G,E("b_del"));Q.addEventListener("click",function(){J.setNewList()
},false);Q=z.addAnchor(G,E("b_get"));Q.addEventListener("click",function(){J.setNewListFromPage()},false);
Q=z.addAnchor(G,E("b_sav"));Q.addEventListener("click",function(){J.save("new")},false);Q.setAttribute("title",E("b_svt"));
N.appendChild(G);G=z.newCell();G.setAttribute("class","col2");this.newList=z.addTextarea(G);z.addOnChange(this.newList,L,false);
N.appendChild(G);if(P){z.makeTogleable(N,O,M,true)}N=k.createElement("tr");N.setAttribute("class","tit alt");
I.appendChild(N);G=z.newCell();G.setAttribute("colspan","2");G.setAttribute("class","col2");O=k.createElement("div");
z.addTitle(O,E("t_exp")+":");G.appendChild(O);N.appendChild(G);M=N;H=new Array();N=k.createElement("tr");
N.setAttribute("class","alt");I.appendChild(N);G=z.newCell();z.addText(G,E("t_fmt")+":");N.appendChild(G);
G=z.newCell();G.setAttribute("class","col2");this.selectFormat=z.addSelect(G);for(S in y.formats){z.addOption(y.formats[S].name,S,this.selectFormat)
}K=B.get("selectFormat");this.selectFormat.selectedIndex=(K==null)?0:parseInt(K);d(this.selectFormat).change(function(){B.set("selectFormat",J.selectFormat.selectedIndex+"");
L()});N.appendChild(G);H.push(N);z.ogameDropDown(d(this.selectFormat));N=k.createElement("tr");N.setAttribute("class","alt");
I.appendChild(N);G=z.newCell();z.addText(G,E("t_col")+":");N.appendChild(G);G=z.newCell();G.setAttribute("class","col2");
this.selectColors=z.addSelect(G);for(S in t.names){z.addOption(t.names[S],S,this.selectColors)}K=B.get("selectColors");
this.selectColors.selectedIndex=(K==null)?0:parseInt(K);d(this.selectColors).change(function(){B.set("selectColors",J.selectColors.selectedIndex+"");
L()});N.appendChild(G);H.push(N);z.ogameDropDown(d(this.selectColors));N=k.createElement("tr");N.setAttribute("class","alt");
I.appendChild(N);G=z.newCell();z.addText(G,E("t_out")+":");Q=z.addAnchor(G,E("b_sel"));Q.addEventListener("click",function(){J.stats.select()
},false);N.appendChild(G);G=z.newCell();G.setAttribute("class","col2");this.stats=z.addTextarea(G);this.stats.setAttribute("readonly","readonly");
this.stats.addEventListener("click",function(){J.stats.select()},false);N.appendChild(G);H.push(N);if(P){z.makeTogleable(H,O,M,true)
}N=k.createElement("tr");N.setAttribute("class","tit");I.appendChild(N);G=z.newCell();G.setAttribute("class","col2");
G.setAttribute("align","right");G.setAttribute("colspan","2");N.appendChild(G);Q=z.addAnchor(G,E("b_res"));
Q.setAttribute("class","action btn_blue float_right");Q.addEventListener("click",function(){J.resetData()
},false);this.statusRow=(N=k.createElement("tr"));N.setAttribute("class","alt tit");I.appendChild(N);
G=z.newCell();z.addTitle(G,E("t_stb")+":");N.appendChild(G);this.statusLine=(G=z.newCell());G.setAttribute("class","col2");
this.statusText=z.addText(G,"");N.appendChild(G);this.hideStatus()};r.prototype={load:function(){this.setOldList(B.get("oldData"))
},save:function(F){B.set("oldData",this[F+"List"].value)},setOldList:function(F){if(arguments.length>0){this.oldList.value=F
}else{this.oldList.value=""}this.doIt()},setNewList:function(F){if(arguments.length>0){this.newList.value=F
}else{this.newList.value=""}this.doIt()},resetData:function(){this.setNewListFromPage();this.setOldList(this.currentPageData);
B.set("oldData",this.currentPageData)},setStats:function(F){if(arguments.length>0){this.stats.value=F
}else{this.stats.value=""}},setPreview:function(F){if(arguments.length>0){this.preview.innerHTML=F}else{this.preview.innerHTML=""
}},setNewListFromPage:function(){if(this.currentPageData){this.setNewList(this.currentPageData);return
}var K=k.getElementById("OGameClock");if(K==null){K=k.querySelector("li.OGameClock")}var N={timestamp:s.timestamp,strDate:v.date(K.innerHTML.split("<")[0]),strTime:v.time(K.getElementsByTagName("span")[0].innerHTML),members:{}};
var S=b.list.getElementsByTagName("tbody")[0].getElementsByTagName("tr");for(var P=0;P<S.length;P++){var O=S[P].getElementsByTagName("td");
var L=O[0].innerHTML.trim();var M;var G=O[2].getElementsByTagName("select");if(G.length>0){M=G[0].options[G[0].selectedIndex].innerHTML
}else{M=O[2].innerHTML}M=M.trim();var J=O[3].getElementsByTagName("span");if(J.length>0){J=J[0]}else{J=O[3]
}var Q=J.getElementsByTagName("a")[0];J=J.getAttribute("title");J=parseInt(J.replace(/\D/gi,""));var F=Q.getAttribute("href");
F=parseInt(F.replace(/^.*searchRelId\=(\d+)(\D.*)?$/,"$1"));Q=parseInt(Q.innerHTML.replace(/\D/gi,""));
var R=O[4].getElementsByTagName("a")[0].innerHTML;R=R.replace(/[^\d\:]/gi,"");var I=v.date(O[5].innerHTML);
N.members[L]={i:F,r:M,s:J,p:Q,c:R,d:I};var H=N.members[L];if(/NaN|undefined|null/.test(H.i+"")||(H.r)==null||typeof H.r=="undefined"||/NaN|undefined|null/.test(H.s+"")||/NaN|undefined|null/.test(H.p+"")||(!(/^\d+\:\d+\:\d+$/.test(H.c+"")))||(H.d)==null||typeof H.r=="undefined"){return false
}}this.currentPageData=JSON.stringify(N);this.setNewList(this.currentPageData);return true},hideStatus:function(){this.statusRow.setAttribute("style","display:none")
},showStatus:function(){this.statusRow.setAttribute("style","")},setErrorStatus:function(F){this.statusText.nodeValue="";
this.statusLine.setAttribute("class","overmark");if(arguments.length>0){this.statusText.nodeValue=F}this.showStatus()
},setOkStatus:function(F){this.statusText.nodeValue="";this.statusLine.setAttribute("class","undermark");
if(arguments.length>0){this.statusText.nodeValue=F}this.showStatus()},setTitle:function(H,F,G){this[H+"Title"].setAttribute("class",(G)?"undermark":"overmark");
this[H+"Title"].innerHTML=F},doIt:function(){x.doIt(this)}};var C=function(H){var J=this;this.section=k.createElement("div");
this.section.setAttribute("class","section");var F=k.createElement("h3");var G=k.createElement("span");
this.button=k.createElement("a");this.button.setAttribute("class","closed");this.button.setAttribute("href","javascript:void(0);");
this.button.addEventListener("click",function(){J.toggle()},false);z.addText(G,i.name);this.button.appendChild(G);
F.appendChild(this.button);this.section.appendChild(F);H.appendChild(this.section);this.sectioncontent=k.createElement("div");
this.sectioncontent.setAttribute("class","sectioncontent");this.sectioncontent.setAttribute("id",i.name);
this.sectioncontent.setAttribute("style","display:none;");this.content=k.createElement("div");this.content.setAttribute("class","contentz");
var I=k.createElement("div");I.setAttribute("class","footer");this.sectioncontent.appendChild(this.content);
this.sectioncontent.appendChild(I);H.appendChild(this.sectioncontent);this.form=null;this.canLoad=true;
this.wTime=30;this.toggleTimer=null};var p=function(H){var F=0,G=0;if(H.offsetParent){do{F+=H.offsetLeft;
G+=H.offsetTop}while(H=H.offsetParent)}return{l:F,t:G}};C.prototype={loadForm:function(){this.canLoad=false;
if(!b.ready){this.wTime=Math.round(this.wTime*1.1);var F=this;setTimeout(function(){F.loadForm()},this.wTime);
return}this.form=new r(this.content);this.form.setErrorStatus(E("e_nod"));if(!this.form.setNewListFromPage()){this.sectioncontent.innerHTML='<div style="color:red;text-align:center;font-weigth:bold;padding:30px">'+E("e_oga")+"</div>"
}this.form.load();if(this.form.oldList.value==""){this.form.save("new");this.form.load()}},toggle:function(){if(this.canLoad){this.loadForm()
}if(this.button.getAttribute("class")=="closed"){this.button.setAttribute("class","opened");this.sectioncontent.setAttribute("style","display:block;");
var G=p(this.section);for(var F=10;F<=100;F+=30){setTimeout(function(){try{f.scroll(G.l,G.t)}catch(H){}},F)
}}else{this.button.setAttribute("class","closed");this.sectioncontent.setAttribute("style","display:none;")
}}};i.domWait=30;i.domLoader=function(){clearTimeout(this.domTimer);if(k.getElementById("allyInternText")){delete this.dom;
this.dom=new C(k.getElementById("eins"))}else{this.domWait=Math.round(this.domWait*1.1);this.domTimer=setTimeout(function(){i.domLoader()
},this.domWait)}};i.init=function(){this.domLoader();try{k.querySelector("a.navi.overview").addEventListener("click",function(){i.domWait=30;
i.domLoader()},false);var F=k.querySelector("#form_assignRank a.save_bigger");if(F){F.addEventListener("click",function(){i.domWait=30;
i.domTimer=setTimeout(function(){i.domLoader()},500)},false)}}catch(G){}};i.init()};var j=function(){try{d=f.jQuery;
if(typeof(d)=="undefined"){throw 0}if(typeof(d.fn.ogameDropDown)=="undefined"){throw 0}a()}catch(n){setTimeout(j,50)
}};var m=function(){if(arguments.callee.done){return}arguments.callee.done=true;if(c){clearInterval(c)
}j()};if(k.addEventListener){k.addEventListener("DOMContentLoaded",m,false)}if(/WebKit/i.test(f.navigator.userAgent)){var c=setInterval(function(){if(/loaded|complete/.test(k.readyState)){m()
}},10)}f.onload=m})();
