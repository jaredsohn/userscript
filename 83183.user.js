// ==UserScript==
// @name           Pirates of Scurvy Pond Helper v0.370
// @author         ErikPowa
// @version        2010-08-07
// @namespace      http://userscripts.org/scripts/show/48293
// @description    Pirates of Scurvy Pond Ultimate Script by: ErikPowa
// @include        http://www.piratesbg.com/Pages*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


  
// PVP
if (document.body.innerHTML.indexOf('ctl00_MainContentWrapper_PageContentPlaceHolder_ctl00_PageImage') > -1)
{
  $('#ctl00_MainContentWrapper_PageContentPlaceHolder_ctl00_PageImage').remove();
  $('#ctl00_MainContentWrapper_PageContentPlaceHolder_ctl00_UpdatePanel1').remove();
  $('fieldset').css('background','none repeat scroll 0 0 #64B1D8');
  $('input[type="submit"]').css('background','url("") repeat-x scroll left top transparent');
  $('.txt_lft, .text_left').css('background','#46A4D2');
  $('.txt_rgt, .text_right').css('background','#46A4D2');
  $('tbody td').css('background','none repeat scroll 0 0 #46A4D2')
 
}
if (document.body.innerHTML.indexOf('ctl00_MainContentWrapper_PageContentPlaceHolder_ctl00_VisitorsUpdatePanel') > -1)
{
  $('.car').remove();
  $('.narrowUserList li').css('background','no-repeat scroll left top #46A4D2');
  $('.narrowUserList li').css('height','50px');
  $('.narrowUserList li').css('width','120px');
  $('.narrowUserList li .info .property').css('background','none repeat scroll 0 0 #A9D4EA');
  $('ctl00_MainContentWrapper_PageContentPlaceHolder_ctl00_SleeperModeRacesLeftNotifyer_StatusDiv').remove();
}

// Edit navigate
$('#quickNav a').css('background', 'url("http://www.savehinh.com/images/35quick_nav_sprite.png") no-repeat scroll 0 0 #000000');
$('#subNavigation li a').css('background', 'url("http://www.savehinh.com/images/17drop_tabs.png") no-repeat scroll left top transparent');
$('#subNavigation li a span').css('background', 'url("http://www.savehinh.com/images/17drop_tabs.png") no-repeat scroll right top transparent');
$('#navigation a').css('background-image', 'url("http://www.rockmyspace.info/image-upload/uploads/1/53main_tabs_sprite.png")');


// Adding iPanel
$('body').append('<div id="iPanel"><strong style="font-size: 18px;"><b>Pirates Helper v0.370</b></strong></div>');
$('#iPanel')
.css('opacity','1.0')
.css('position','fixed')
.css('color','#000')
.css('z-index','2000')
.css('height','300px')
.css('width','100px')
.css('top','5%')
.css('left','1%')
.css('background-color', '#389FFF')
.css("text-align", "center");	
$('#sPanel')
.css('opacity','1.0')
.css('position','fixed')
.css("font-family", "Tahoma")
.css('color','#000')
.css("text-align", "left")
.css("font-size", "18px");

// Button
$('#iPanel').append('<button class="btn">Treasure Chest</button>');
$('#btn')
.css('display: inline-block')
.css('line-height', '1')
.css('padding', '7px 10px')
.css('text-decoration', 'none')
.css('font-weight', 'bold')
.css('color:', '#fff')
.css('background-color', '#39c')
.css('-moz-border-radius', '5px')
.css('-webkit-border-radius', '5px')
.css('-khtml-border-radius', '5px')
.css('border-radius', '5px');

$("#iPanel").button();

// Info Panel --------------------------------------------------------------------------------------------------
var l_Index = 0;
var l_Search = '<a href="/Publicpages/UserProfile.aspx">';
l_Index = document.body.innerHTML.indexOf(l_Search);
l_Index = l_Index + l_Search.length;
var username = document.body.innerHTML.substring(l_Index, document.body.innerHTML.indexOf('<', l_Index) );
username = '|' + username + '|';

l_Search = 'Reputation';
l_Index = document.body.innerHTML.indexOf(l_Search);
l_Search = '<strong>';
l_Index = document.body.innerHTML.indexOf(l_Search, l_Index);
var rep = document.body.innerHTML.substring(l_Index + l_Search.length, document.body.innerHTML.indexOf('</strong>', l_Index + l_Search.length)); 
rep = 'Rep:' + rep + '|'; 

l_Search = 'CreditsText';
l_Index = document.body.innerHTML.indexOf(l_Search);
l_Search = '<strong>';
l_Index = document.body.innerHTML.indexOf(l_Search, l_Index);
var cred = document.body.innerHTML.substring(l_Index + l_Search.length, document.body.innerHTML.indexOf('</strong>', l_Index + l_Search.length)); 
cred ='Credit:' + cred + '|';

l_Search = 'Gold<';
l_Index = document.body.innerHTML.indexOf(l_Search);
l_Search = '<strong>';
l_Index = document.body.innerHTML.indexOf(l_Search, l_Index);
var gold = document.body.innerHTML.substring(l_Index + l_Search.length, document.body.innerHTML.indexOf('</strong>', l_Index + l_Search.length)); 
gold ='Gold:'+ gold + '|';

l_Search = 'Wanted level';
l_Index = document.body.innerHTML.indexOf(l_Search);
l_Search = 'blue">';
l_Index = document.body.innerHTML.indexOf(l_Search, l_Index);
var wanted = document.body.innerHTML.substring(l_Index + l_Search.length, document.body.innerHTML.indexOf('<', l_Index + l_Search.length)); 
wanted = 'Wanted level:' + wanted + '|';

l_Search = '<a href="/Pages/PirateCove.aspx?tab=1&amp;cat=engine">Health</a>';
l_Index = document.body.innerHTML.indexOf(l_Search);
l_Search = 'blue">';
l_Index = document.body.innerHTML.indexOf(l_Search, l_Index);
var health = document.body.innerHTML.substring(l_Index + l_Search.length, document.body.innerHTML.indexOf('<', l_Index + l_Search.length)); 
health = health.replace(' ', '');
health = 'HP:' + health + '|';


l_Search = '<span>Ship efficiency points</span>';
l_Index = document.body.innerHTML.indexOf(l_Search);
l_Search = 'blue">';
l_Index = document.body.innerHTML.indexOf(l_Search, l_Index);
var effipoint = document.body.innerHTML.substring(l_Index + l_Search.length, document.body.innerHTML.indexOf('<', l_Index + l_Search.length)); 
effipoint = 'EP:' + effipoint + '|';

l_Search = '<span>Intimidation points</span>';
l_Index = document.body.innerHTML.indexOf(l_Search);
l_Search = 'blue">';
l_Index = document.body.innerHTML.indexOf(l_Search, l_Index);
var intimpoint = document.body.innerHTML.substring(l_Index + l_Search.length, document.body.innerHTML.indexOf('<', l_Index + l_Search.length)); 
intimpoint = 'INP:' + intimpoint + '|';


l_Search = '/images2/digi';
l_Index = document.body.innerHTML.indexOf(l_Search);
var dmg = "";
while (l_Index != -1)
{
l_Search = '/';
l_Index = document.body.innerHTML.indexOf(l_Search, l_Index);
dmg = dmg + document.body.innerHTML.substring(l_Index + l_Search.length , document.body.innerHTML.indexOf('.', l_Index + l_Search.length));
dmg = dmg.replace('images2','');
dmg = dmg.replace('/',''); 
dmg = dmg.replace('digits','');
dmg = dmg.replace('/',''); 
l_Search = 'images2/d';
l_Index = document.body.innerHTML.indexOf(l_Search, l_Index);
}
dmg = dmg.substring(1, dmg.length);
dmg = 'TD:' + dmg +  '|';
var x = '<div id="infoPanel"><strong style="font-size: 18px;"><b>' + username + rep + gold + dmg + health + wanted + effipoint + intimpoint + '</b></strong></div><div id="sPanel"></div>';
$('body').append(x);
$('#infoPanel')
.css('opacity','1.0')
.css('position','fixed')
.css('color','#000')
.css('z-index','2000')
.css('height','50px')
.css('width','980px')
.css('top','96%')
.css('left','10%')
.css("font-family", "Tahoma")
.css('background-color', '#389FFF')
.css("text-align", "center"); 

// Remove header 2
$('#sidebar .body').remove();
$('#sidebar .header strong').remove();
$('#sidebar .header').remove();
$('#ReqButton').remove();
$('#notificationsPanel span').remove();
$('.vault span').remove();
$('#sidebar .section ul li .bar').remove();
$('#sidebar .RecruitsLeft').remove();
$('#notificationsPanel a').remove();
$('#notificationsPanel').remove();
$('#sidebar .section ul li span').remove();
$('#sidebar .section ul li strong').remove();
$('#sidebar .section ul li .wrap').remove();
$('#sidebar .section ul li').remove();
$('#sidebar .header2 strong').remove();
$('#sidebar strong.TopDamage').remove();
$('#sidebar .header2').remove();
$('#sidebar strong.premium').remove();
$('#sidebar #username.header strong').remove();
$('#username').remove();
$('#sidebar').remove();

// Adding to iPanel
$(document).ready(function () {
try 
{
		var Intim = "";
		var Effect = "";
		var Money = "";
		var m_Start = "";
		var m_Tol = "";
		var m_Ig = "";
		// Starting annition
	 if(document.body.innerHTML.indexOf('<span class="visuals">Intimidation points</span>') > -1)
            {
				m_Start = '<span class="visuals">Intimidation points</span>';
				var l_Index = 0;
				l_Index = document.body.innerHTML.indexOf(m_Start);
				var a = '<div id="sPanel"> </div>'
				$('#iPanel').append(a);
				while (l_Index != -1)
				{	
					// Search intimidation point
					m_Tol = "<strong>";
					l_Index = document.body.innerHTML.indexOf(m_Tol, l_Index);
					m_Ig = "</strong>";
					Intim = document.body.innerHTML.substring(l_Index + m_Tol.length, document.body.innerHTML.indexOf(m_Ig, l_Index + m_Tol.length));
					Intim = Intim.replace('+', '');				
					
					// Search ship efficiency
					m_Start = 'Ship efficiency<';		
					l_Index = document.body.innerHTML.indexOf(m_Start, l_Index);
					m_Tol = "<strong>";
					l_Index = document.body.innerHTML.indexOf(m_Tol, l_Index);
					m_Ig = "</strong>";
					Effect = document.body.innerHTML.substring(l_Index + m_Tol.length, document.body.innerHTML.indexOf(m_Ig, l_Index + m_Tol.length));
					Effect = Effect.replace('+', '');
										
					// Search price
					m_Start = 'price';		
					l_Index = document.body.innerHTML.indexOf(m_Start, l_Index);
					m_Tol = '14px;">';
					l_Index = document.body.innerHTML.indexOf(m_Tol, l_Index);
					m_Ig = "</strong>";
					Money = document.body.innerHTML.substring(l_Index + m_Tol.length, document.body.innerHTML.indexOf(m_Ig, l_Index + m_Tol.length));
					Money = Money.replace(',', '');
					Money = Money.replace('$', '')
									
					// Search for button				
					m_Start = 'buttons';    
          l_Index = document.body.innerHTML.indexOf(m_Start, l_Index);
          m_Tol = '>';
          l_Index = document.body.innerHTML.indexOf(m_Tol, l_Index);
          m_Ig = "</div>";
          var Btn = "";
          Btn = document.body.innerHTML.substring(l_Index + m_Tol.length, document.body.innerHTML.indexOf(m_Ig, l_Index + m_Tol.length));
          				
					if (Btn.indexOf('_MainContentWrapper') > 0)				
					{
  					// Add infos to Panel
  					var ratio = "";
  					if (Money.indexOf('Credits') < 0)
  				  {				    
  				    ratio = Number(Money) / (Number(Intim) + Number(Effect));
  				    ratio = ratio.toPrecision(5);
              var o = '<div id="sPanel"><strong style="font-align: left; font-size: 14px">Money:$' + Money + ' P:' + (Number(Intim) + Number(Effect))  + ' R:' + ratio + '</strong>' + Btn + '</div>';
              $('#contentWrapper').append(o);
  				  }		
  				  else
  				  {	
  				    var rts = Btn.replace(/BuyCreditsButton/g, 'BuyButton');
  				    Money = String(Money).replace('Credits', '€');
  				    Money = String(Money).replace(' €', '€');
  					  var o = '<div id="sPanel" ><strong style="font-align: left; font-size: 14px">Credit:' + Money + ' P:' + (Number(Intim) + Number(Effect)) + '</strong>' + rts + '</div>';
              $('#contentWrapper').append(o);
  					}
					}
					// Restart
					m_Start = '<span class="visuals">Intimidation points</span>';
					l_Index = document.body.innerHTML.indexOf(m_Start, l_Index);
				}
				$('.storeGrid').remove()
			}
		

} catch (e) { alert(e); }});



// Remove pictures
$('#ctl00_MainContentWrapper_PageContentPlaceHolder_shopbody_StatusNotifyer_StatusDiv').remove();
$('.pirateWrapper').remove();
$("#bannerSpace").remove();
$("#footer").remove();
$("#logo").remove();
$('div').remove(".image");
$('#flashcontainer').remove();
$("#page").css('background', 'url("") no-repeat scroll left top transparent');
$("body").css('background', 'url("") no-repeat scroll center top #CCE6FF');
$("body").css("padding-left","200px");
$("body").css("width","858px");

// Edit header
$('#header').css('min-height', '28px');
$('#header').css('margin', '0px');
$('#header').css('padding-left', '200px');

// Edit map + Captains
$('#mapIntro').remove();
$('.imageCont').remove();
$('h2').remove();
$('h1').remove();
$('h3').remove();
$('p').remove();
$('.opponentList li').css('background', 'none repeat scroll 0 0 #7ACAFF');
$('#ctl00_MainContentWrapper_PageContentPlaceHolder_ctl00_OpponentsRepeater_ctl05_ProgressImage').attr('src', ' ').attr('style','font-size: 9px; font-family: Tahoma;');
$('#ctl00_MainContentWrapper_PageContentPlaceHolder_ctl00_OpponentsRepeater_ctl04_ProgressImage').attr('src', ' ').attr('style','font-size: 9px; font-family: Tahoma;');
$('#ctl00_MainContentWrapper_PageContentPlaceHolder_ctl00_OpponentsRepeater_ctl03_ProgressImage').attr('src', ' ').attr('style','font-size: 9px; font-family: Tahoma;');
$('#ctl00_MainContentWrapper_PageContentPlaceHolder_ctl00_OpponentsRepeater_ctl02_ProgressImage').attr('src', ' ').attr('style','font-size: 9px; font-family: Tahoma;');
$('#ctl00_MainContentWrapper_PageContentPlaceHolder_ctl00_OpponentsRepeater_ctl01_ProgressImage').attr('src', ' ').attr('style','font-size: 9px; font-family: Tahoma;');

// Edit store
$('.storeGrid .price').css('padding', '0px 8px 9px 7px');
$('.storeGrid .price').css('margin', '-6px 2px 2px 1px');
$('.storeGrid li.premium .price').css('padding', '0px 11pt 0pt');
$('.storeGrid .price strong').css('color','#7ACAFF');
$('.storeGrid .price strong').css('font-size','14px');
$('.storeGrid li').css('background', 'url("http://www.savehinh.com/images/76store_background.jpg") no-repeat scroll left top transparent');
$('.storeGrid li').css('margin', '0 4px 8px 0');
$('.storeGrid li').css('padding', '0px');
$('.storeGrid li').css('height', '68px');
$('.storeGrid li').css('width', '161px'); 
$('.storeGrid .product').css('height', '43px');
$('.storeGrid .product').css('margin', '0px 0');
$('.storeGrid .product').css('width', '182px');
$('div').remove(".infoText");
$('h4').remove();
$('.button').css('background', 'url("") no-repeat scroll 0 0 transparent');
$('.button').css('margin', '0px');
$('.button span').css('background', 'url("http://www.savehinh.com/images/11sprite.png") no-repeat scroll 100% 0 transparent');
$('.storeGrid .info').css('font-size', '10px');
$('.storeGrid .info').css('padding', '0px 0px 2px 0');
$('.storeGrid .data .row').css('padding', '0px 16px 0px 2px');
$('.storeGrid .data').css('line-height', '17px');
$('.storeGrid .data').css('margin', '6px 9px 0 0');
$('.storeGrid .data').css('background', 'transparent');
$('.button span').css('cursor','pointer');
$('.button span').css('line-height','16px');
$('.button span').css('margin','0 -5px 0 0');
$('.button span').css('padding','0 6px 0 0');
$('.button span').css('height','15px');
$('.button').css('color','yellow');
$('.button').css('height','15px');
$('.button').css('margin','1px 5px 0 0');



// ----------------------------------------------------------------------------------------------------------------------------------------
//$('.data').append('<div class="row" style="padding: 0px 16px 0px 2px;"><span class="visuals">Points-Gold ratio</span><strong></strong></div>');
//$('#visualratio')
//.css('background','url("http://www.rockmyspace.info/image-upload/uploads/1/small_icons.png") no-repeat scroll 2px -49px transparent')
//.css('padding-left', '26px');
