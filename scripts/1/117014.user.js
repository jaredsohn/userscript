/*
	Программный продукт предоставляется по принипу "как есть", 
	автор не несёт никакой ответственности за последствия 
	использования данного программного продукта, в том числе 
	неполучение прибыли или иных доходов от его использования, 
	или использование его в противозаконных целях.
	Программный продукт полностью бесплатен, поддержки не предлагается.
*/
//
// ==UserScript==
// @author 		alexg
// @name 		NewArtMenu for NNTT.ORG 
// @version 	4.1
// @include 	http://nntt.org/ucp.php*
// @include 	http://www.nntt.org/ucp.php*
// ==/UserScript==
//
(function(){  
   if (document.addEventListener) 
      document.addEventListener("DOMContentLoaded", function(){
      	if(document.body){		
					var script = document.createElement('script');
      			script.type = 'text/javascript';
      			script.charset = 'utf-8';
      			var text = new String(function(){ 
						$(document).ready(function() {		
							$("table.tablebg").filter(":has(td.table_title:contains('Настройки'))").each(function(i){
								if(($(this).parent(":not(form[method='post'])").length) && !($("meta[http-equiv='refresh']").length)){
									$(this).html("<tr>"+
    										"<td class='table_title'>Настройки</td>"+
										"</tr>"+
										"<tr>"+
											"<td class='row1b'><b class='nav'>Обзор</b>"+
												"<ul class='nav' style='margin: 3px 0px 3px 15px; padding: 0; list-style-type: none; line-height: 175%;'>"+		
													"<li>&#187; <a href='./ucp.php?i=main&mode=front'>Начало</a></li>"+
													"<li>&#187; <a href='./ucp.php?i=main&mode=subscribed'>Подписки</a></li>"+
													"<li>&#187; <a href='./ucp.php?i=main&mode=bookmarks'>Закладки</a></li>"+
													"<li>&#187; <a href='./ucp.php?i=main&mode=drafts'>Черновики</a></li>"+
													"<li>&#187; <a href='./ucp.php?i=attachments&mode=attachments'>Вложения</a></li>"+	
													"<li>&#187; <a href='./ucp.php?i=main&mode=punishes'>Наказания</a></li>"+		
													"<li>&#187; <a href='./ucp.php?i=main&amp;mode=invites'>Приглашения</a></li>"+
												"</ul>"+
											"</td>"+
										"</tr>"+
										"<tr>"+	
											"<td class='row1b'><b class='nav'>Профиль</b>"+
												"<ul class='nav' style='margin: 3px 0px 3px 15px; padding: 0; list-style-type: none; line-height: 175%;'>"+		
													"<li>&#187; <a href='./ucp.php?i=profile&mode=profile_info'>Личные данные</a></li>"+
													"<li>&#187; <a href='./ucp.php?i=profile&mode=signature'>Подпись</a></li>"+
													"<li>&#187; <a href='./ucp.php?i=profile&mode=avatar'>Аватара</a></li>"+
													"<li>&#187; <a href='./ucp.php?i=profile&mode=reg_details'>Регистрационные данные</a></li>"+
												"</ul>"+
											"</td>"+
										"</tr>"+
										"<tr>"+
											"<td class='row1b'><b class='nav'>Трекер</b>"+
												"<ul class='nav' style='margin: 3px 0px 3px 15px; padding: 0; list-style-type: none; line-height: 175%;'>"+		
													"<li>&#187; <a href='./ucp.php?i=tracker&mode=settings'>Настройки трекера</a></li>"+
													"<li>&#187; <a href='./ucp.php?i=tracker&mode=plandls'>Планируемые закачки</a></li>"+
													"<li>&#187; <a href='./ucp.php?i=tracker&mode=compldls'>Завершённые закачки</a></li>"+
												"</ul>"+
											"</td>"+
										"</tr>"+
										"<tr>"+
											"<td class='row1b'><b class='nav'>Личные настройки</b>"+
												"<ul class='nav' style='margin: 3px 0px 3px 15px; padding: 0; list-style-type: none; line-height: 175%;'>"+		
													"<li>&#187; <a href='./ucp.php?i=prefs&mode=personal'>Общие настройки</a></li>"+	
													"<li>&#187; <a href='./ucp.php?i=prefs&mode=post'>Отправка сообщений</a></li>"+	
													"<li>&#187; <a href='./ucp.php?i=prefs&mode=view'>Настройки отображения</a></li>"+
												"</ul>"+
											"</td>"+									
										"</tr>"+
										"<tr>"+
											"<td class='row1b'><b class='nav'>Личные сообщения</b>"+
												"<ul class='nav' style='margin: 3px 0px 3px 15px; padding: 0; list-style-type: none; line-height: 175%;'>"+		
													"<li>&#187; <a href='./ucp.php?i=pm&folder=inbox'>Входящие</a></li>"+
													"<li>&#187; <a href='./ucp.php?i=pm&folder=outbox'>Исходящие</a></li>"+
													"<li>&#187; <a href='./ucp.php?i=pm&folder=sentbox'>Отправленные</a></li>"+
												"</ul>"+
												"<hr />"+
												"<ul class='nav' style='margin: 3px 0px 3px 15px; padding: 0; list-style-type: none; line-height: 175%;'>"+		
													"<li>&#187; <a href='./ucp.php?i=pm&mode=compose'>Новое сообщение</a></li>"+
													"<li>&#187; <a href='./ucp.php?i=pm&mode=drafts'>Управление черновиками</a></li>"+
													"<li>&#187; <a href='./ucp.php?i=pm&mode=options'>Правила, папки и настройки</a></li>"+
												"</ul>"+
											"</td>"+									
										"</tr>"+
										"<tr>"+	
											"<td class='row1b'><b class='nav'>Группы</b>"+
												"<ul class='nav' style='margin: 3px 0px 3px 15px; padding: 0; list-style-type: none; line-height: 175%;'>"+		
													"<li>&#187; <a href='./ucp.php?i=groups&mode=membership'>Участие в группах</a></li>"+
													"<li>&#187; <a href='./ucp.php?i=groups&mode=manage'>Управление группами</a></li>"+
												"</ul>"+
											"</td>"+									
										"</tr>"+
										"<tr>"+
											"<td class='row1b'><b class='nav'>Друзья и недруги</b>"+
												"<ul class='nav' style='margin: 3px 0px 3px 15px; padding: 0; list-style-type: none; line-height: 175%;'>"+		
													"<li>&#187; <a href='./ucp.php?i=zebra&mode=friends'>Список друзей</a></li>"+
													"<li>&#187; <a href='./ucp.php?i=zebra&mode=foes'>Список недругов</a></li>"+
												"</ul>"+
											"</td>"+									
										"</tr>");
									
									var URL = document.URL;
									var short_URL = "." + URL.substring(URL.indexOf("nntt.org")+8);
									if(short_URL == "./ucp.php")
										short_URL += "?i=main&mode=front";
									$("table.tablebg:first a[href='" + short_URL + "']:first").each(function(i){
										$(this).replaceWith("<b><span style='color:#d46400; text-decoration:underline;'>" + $(this).text() + "</span></b>");
									});
								}
							});							
						});
					});
					
      			var term_in  = text.indexOf("{");
      			var term_out = text.lastIndexOf('}');
      			
      			script.appendChild (document.createTextNode("/* <![CDATA[ */" + text.substring(term_in + 1, term_out) + "/* ]]> */"));
      			document.getElementsByTagName('head')[0].appendChild(script); 
   		}  
 		}, false);
})();