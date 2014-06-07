// ==UserScript==
// @name	Khazaneh to 10^2
// @author	overlay.psroj@yahoo.com
// @version	2.2.2
// @include     http://*.travian.*/*
// ==/UserScript==
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>Travian ir6</title>
		<meta http-equiv="cache-control" content="max-age=0" />
		<meta http-equiv="pragma" content="no-cache" />
		<meta http-equiv="expires" content="0" />
		<meta http-equiv="imagetoolbar" content="no" />
		<meta http-equiv="content-type"	content="text/html; charset=UTF-8" />
		<meta name="content-language" content="ir" />
				<link href="gpack/travian_Travian_4.0_Wurststurm/lang/ir/compact.css?asd423" rel="stylesheet" type="text/css" /><link href="gpack/travian_Travian_4.0_Wurststurm/lang/ir/lang.css?asd423" rel="stylesheet" type="text/css" />				<link href="img/travian_basics.css" rel="stylesheet" type="text/css" />
						<script type="text/javascript" src="crypt.js?1339503798"></script>
<script type="text/javascript">
Travian.Translation.add(
{
	'allgemein.anleitung':	'دستورالعمل',
	'allgemein.cancel':	'لغو',
	'allgemein.ok':	'تایید',
	'cropfinder.keine_ergebnisse': 'چیزی مطابق جستجوی شما پیدا نشد.'
});
Travian.applicationId = 'T4.0 Game';
Travian.Game.version = '4.0';
Travian.Game.worldId = 'ir66';
Travian.Game.speed = 1;
</script>						<script type="text/javascript">
			Travian.Game.eventJamHtml = '&lt;a href=&quot;http://t4.answers.travian.ir/index.php?aid=249#go2answer&quot; target=&quot;blank&quot; title=&quot;پاسخ&zwnj;های تراوین&quot;&gt;&lt;span class=&quot;c0 t&quot;&gt;0:00:0&lt;/span&gt;?&lt;/a&gt;'.unescapeHtml();
		</script>
					</head>
	<body class="v35 gecko build">
							<div id="wrapper">
								<img id="staticElements" src="img/x.gif" alt="" />
									<div id="logoutContainer">
						<a id="logout" href="logout.php" title="خروج">&nbsp;</a>
					</div>
								<div class="bodyWrapper">
					
										<img style="filter:chroma();" src="img/x.gif" id="msfilter" alt="" />
					<div id="header">
						<div id="mtop">
							<a id="logo" href="http://www.travian.ir/" target="_blank" title="تراوین"></a>
							<div id="myGameLinkHeaderWrapper">
															</div>
																					<ul id="navigation">
					        	<li id="n1" class="resources">
					        		<a class="" href="dorf1.php" accesskey="1" title="منابع"></a>
					        	</li>
					            <li id="n2" class="village">
					            	<a class="" href="dorf2.php" accesskey="2" title="ساختمان‌ها"></a>
					            </li>
					            <li id="n3" class="map">
					            	<a class="" href="karte.php" accesskey="3" title="نقشه"></a>
					            </li>
					            <li id="n4" class="stats">
					            	<a class="" href="statistiken.php" accesskey="4" title="آمار"></a>
					            </li>
					            <li id="n5" class="reports">
					            	<a class="" href="berichte.php" accesskey="5" title="گزارش‌ها "></a>
					            	<div class="ltr bubble" title="0 گزارش جدید" style="display:none"><div class="bubble-background-l"></div><div class="bubble-background-r"></div><div class="bubble-content">0</div></div>					            </li>
					            <li id="n6" class="messages">
					            	<a class="" href="nachrichten.php" accesskey="6" title="پیام‌ها "></a>
					            	<div class="ltr bubble" title="0 پیام جدید" style="display:none"><div class="bubble-background-l"></div><div class="bubble-background-r"></div><div class="bubble-content">0</div></div>					            </li>
					        </ul>
														<div class="clear"></div>
						</div>
											</div>

					<div id="mid">
												<a id="ingameManual" href="help.php" title="راهنما">
							<img src="img/x.gif" class="question" alt="راهنما"/>
						</a>

												<div class="clear"></div>
						<div id="contentOuterContainer">
							<div class="contentTitle">&nbsp;</div>
							<div class="contentContainer">
								<div id="content" class="build">
			<h1 class="titleInHeader">
				خزانه
				<span class="level">
				سطح 10
				</span>
			</h1>
			<div id="build" class="gid27">	<div id="tabFavor">
		<a
			onclick="
				Travian.ajax(
				{
					data:
					{
						cmd: 'tabFavorite',
						name: 'buildingTreasury',
						number: '0'
					},
					onSuccess: function(data)
					{
						if (data.success)
						{
							$$('.favor').removeClass('favorActive');
							$$('.favor.favorKey0').addClass('favorActive');
						}
					}
				});
				return false;
			"
			title="انتخاب صفحه (Tab) مدیریت به عنوان صفحه‌ی مورد علاقه."
		>&nbsp;</a>
	</div>

<div class="contentNavi subNavi ">
			<div
			title="مدیریت"
			class="container active"
		>
			<div class="background-start">&nbsp;</div>
			<div class="background-end">&nbsp;</div>
			<div
								class="content favor favorActive favorKey0"
			>

									<a
																			href="build.php?s=0&amp;id=22"										class="tabItem"
				>
					مدیریت											<img src="img/x.gif" class="favorIcon" alt="این صفحه (Tab) به عنوان صفحه‌ی مورد علاقه انتخاب شده است" />
														</a>
							</div>
		</div>
			<div
			title="کتیبه‌های موجود در منطقه‌ی شما"
			class="container normal"
		>
			<div class="background-start">&nbsp;</div>
			<div class="background-end">&nbsp;</div>
			<div
								class="content favor favorKey5"
			>

									<a
																			href="build.php?s=5&amp;id=22"										class="tabItem"
				>
					کتیبه‌های موجود در منطقه‌ی شما											<img src="img/x.gif" class="favorIcon" alt="این صفحه (Tab) به عنوان صفحه‌ی مورد علاقه انتخاب شده است" />
														</a>
							</div>
		</div>
			<div
			title="کتیبه‌های کوچک"
			class="container normal"
		>
			<div class="background-start">&nbsp;</div>
			<div class="background-end">&nbsp;</div>
			<div
								class="content favor favorKey1"
			>

									<a
																			href="build.php?s=1&amp;id=22"										class="tabItem"
				>
					کتیبه‌های کوچک											<img src="img/x.gif" class="favorIcon" alt="این صفحه (Tab) به عنوان صفحه‌ی مورد علاقه انتخاب شده است" />
														</a>
							</div>
		</div>
			<div
			title="کتیبه‌های بزرگ"
			class="container normal"
		>
			<div class="background-start">&nbsp;</div>
			<div class="background-end">&nbsp;</div>
			<div
								class="content favor favorKey2"
			>

									<a
																			href="build.php?s=2&amp;id=22"										class="tabItem"
				>
					کتیبه‌های بزرگ											<img src="img/x.gif" class="favorIcon" alt="این صفحه (Tab) به عنوان صفحه‌ی مورد علاقه انتخاب شده است" />
														</a>
							</div>
		</div>
		<div class="clear"></div>
</div>

	<script type="text/javascript">
		window.addEvent('domready', function()
		{
			$$('.subNavi').each(function(element)
			{
				new Travian.Game.Menu(element);
			});
		});
	</script>

				<div class="build_desc">
					<a class="build_logo" onclick="return Travian.Game.iPopup(27,4, 'gid');" href="#">
						<img class="big white g27" alt="خزانه" src="img/x.gif" />
					</a>
					دارایی‌های امپراطوری شما در خزانه نگهداری می‌شوند. خزانه‌ی شما 
تنها قادر به نگهداری یک گنج می‌باشد. بعد از اینکه شما کتیبه‌ای تسخیر کردید، در سرورهای معمولی فعال شدن آن 24 ساعت طول خواهد کشید و در سرورهای اسپید (با سرعت 3 برابر) این مدت 12 ساعت خواهد بود.
				</div>
			<div id="contract" class="contractWrapper"><div class="contractText"><b>هزینه‌ی</b> ارتقاء به سطح 8:</div><div class="contractCosts"><div class="showCosts"><span class="resources r1" title="چوب"><img class="r1" src="img/x.gif" alt="چوب" />14520</span><span class="resources r2 little_res" title="خشت"><img class="r2" src="img/x.gif" alt="خشت" />13815</span><span class="resources r3" title="آهن"><img class="r3" src="img/x.gif" alt="آهن" />13010</span><span class="resources r4" title="گندم"><img class="r4" src="img/x.gif" alt="گندم" />4990</span><span class="resources r5" title="مصرف گندم"><img class="r5" src="img/x.gif" alt="مصرف گندم" />3</span><div class="clear"></div><span class="clocks" title="مدت زمان"><img class="clock" src="img/x.gif" alt="مدت زمان" />5:12:00</span><div class="clear"></div></div></div><div class="contractLink"><span class="none">منابع کافی در امروز ساعت 21:37</span></div></div><div class="clear"></div><table id="own" cellpadding="1" cellspacing="1"><thead><tr>
        	<td></td>
        	<td>نام</td>
        	<td>دهکده</td>
        	<td>تسخیر شده</td>
        </tr></thead><tbody><tr><td class="none" colspan="4">شما هيچ كتيبه‌ای نداريد.</td></tr></tbody></table></div>								<div class="clear">&nbsp;</div>							</div>							<div class="clear"></div>
						</div> 						<div class="contentFooter">&nbsp;</div>
					</div>					<div id="side_info">
		<div class="sideInfoHero">
	<img id="heroImage" src="hero_image.php?uid=532237&amp;size=sideinfo&amp;6fd7d3980778e1ab865893851291f740" class="heroImage" title="قهرمان" alt="قهرمان" />
	<div class="heroImageBorder"></div>
	<a id="heroProfile" href="hero_inventory.php" class="heroProfile"></a>
	<a href="hero_adventure.php" class="adventures" title="ماجراجویی"></a>
	<a href="hero_auction.php" class="auctions" title="حراجی"></a>
</div>

<script type="text/javascript">
	window.addEvent('domready', function()
	{
		var element = $('heroProfile');
		if (!element)
		{
			return;
		}
		var fnHeroTitle = function()
		{
			element.removeEvent('mouseover', fnHeroTitle);
			Travian.ajax(
			{
				data:
				{
					cmd: 'getHeroStatus'
				},
				onSuccess: function(data)
				{
					element.setTitle(data.statusInfoText);
					Travian.Tip.show(data.statusInfoText);
				}
			});
		};
		element.addEvent('mouseover', fnHeroTitle);
	});
</script>	<div class="sideInfoPlayer">
	<a class="signLink" href="spieler.php?uid=532237" title="پروفایل">
		<span class="wrap">Lord-KK</span>
	</a>
	<img class="nationBig nationBig3" title="گول‌ها" alt="گول‌ها" src="img/x.gif"/>
</div>
	<div class="sideInfoAlly">
	<a class="signLink" href="allianz.php" title="اتحاد">
		<span class="wrap">N.E.W.S</span>
	</a>
	<a href="allianz.php?s=2" class="crest" title="فروم اتحاد">
		<img src="img/x.gif" alt="بالاترین مقام اتحاد"  title="فروم اتحاد" />
	</a>
	</div>
	<div id="villageList" class="listing">
	<div class="head">
	<a href="dorf3.php" accesskey="9" title="دیدکلی دهکده">دهکده‌ها</a>
</div>
<div class="list">
	<ul>
	
		<li
			class="entry active"
			title=""
		>
			<a
				href="?newdid=133788&amp;id=22&amp;gid=27"
								class="active"
				title="&lt;span class=&quot;coordinates coordinatesWithText&quot;&gt;&lt;span class=&quot;coordText&quot;&gt;.:1_Lord:.&lt;/span&gt;&lt;span class=&quot;coordinatesWrapper&quot;&gt;&lt;span class=&quot;coordinateY&quot;&gt;282)&lt;/span&gt;&lt;span class=&quot;coordinatePipe&quot;&gt;|&lt;/span&gt;&lt;span class=&quot;coordinateX&quot;&gt;(111&lt;/span&gt;&lt;/span&gt;&lt;/span&gt;&lt;span class=&quot;clear&quot;&gt;&lrm;&lt;/span&gt;"
			>.:1_Lord:.</a>
		</li>
	
		<li
			class="entry"
			title=""
		>
			<a
				href="?newdid=156867&amp;id=22&amp;gid=27"
				accesskey="n"				class=""
				title="&lt;span class=&quot;coordinates coordinatesWithText&quot;&gt;&lt;span class=&quot;coordText&quot;&gt;.:Lord_2:.&lt;/span&gt;&lt;span class=&quot;coordinatesWrapper&quot;&gt;&lt;span class=&quot;coordinateY&quot;&gt;282)&lt;/span&gt;&lt;span class=&quot;coordinatePipe&quot;&gt;|&lt;/span&gt;&lt;span class=&quot;coordinateX&quot;&gt;(112&lt;/span&gt;&lt;/span&gt;&lt;/span&gt;&lt;span class=&quot;clear&quot;&gt;&lrm;&lt;/span&gt;"
			>.:Lord_2:.</a>
		</li>
	
		<li
			class="entry"
			title=""
		>
			<a
				href="?newdid=134553&amp;id=22&amp;gid=27"
				accesskey="b"				class=""
				title="&lt;span class=&quot;coordinates coordinatesWithText&quot;&gt;&lt;span class=&quot;coordText&quot;&gt;.:Lord_3:.&lt;/span&gt;&lt;span class=&quot;coordinatesWrapper&quot;&gt;&lt;span class=&quot;coordinateY&quot;&gt;283)&lt;/span&gt;&lt;span class=&quot;coordinatePipe&quot;&gt;|&lt;/span&gt;&lt;span class=&quot;coordinateX&quot;&gt;(113&lt;/span&gt;&lt;/span&gt;&lt;/span&gt;&lt;span class=&quot;clear&quot;&gt;&lrm;&lt;/span&gt;"
			>.:Lord_3:.</a>
		</li>
		</ul>
</div>
<div class="foot">
</div></div>
		
	</div>					<div class="clear"></div>
				</div>
				<div id="footer">
					<div id="mfoot">
						<a href="http://www.travian.ir/" target="_blank">صفحه‌ی اصلی</a>
						<a href="http://www.travianforum.ir" target="_blank">فروم</a>
						<a href="http://www.travian.ir/links.php" target="_blank">لینک‌ها</a>
						<a href="http://t4.answers.travian.ir/" target="_blank">سوالات متداول - پاسخ‌های تراوین</a>
						<a href="http://www.travian.ir/agb.php" target="_blank">شروط</a>
						<a href="http://www.travian.ir/impressum.php" target="_blank">یادداشت</a>
						<div class="clear"></div>
											</div>
                    <p class="copyright">© 2004 - 2012 Travian Games GmbH</p>
				</div>
													<div id="stime" class="stime">
	<div class="content-background-l">&nbsp;</div>
	<div class="content-background-r">&nbsp;</div>
	<div class="content day" title="روز">
		<span class="icn">زمان سرور:</span>&nbsp;
		<span id="tp1">14:23:49</span>    </div>
</div>					<div id="plusLink">
	<div id="gs">
		<p class="gold">
			<a href="plus.php?id=3" title="سکه‌ی طلای تراوین"><img src="img/x.gif" alt="سکه‌ی طلای تراوین" class="gold" /><br />0</a>
		</p>
		<p class="silver">
			<a href="hero_auction.php" title="حراجی‌ها"><img src="img/x.gif" alt="سکه‌ی نقره‌ی تراوین" class="silver" /><br />260</a>
		</p>
		<div class="clear"></div>
	</div>
    <div id="plus">
    	<a href="plus.php" class="plusBtn" title="منوی پلاس"><span class="plusBtn-l"><span class="plus_g">پلاس</span></span><span class="plusBtn-r">&nbsp;</span></a>
    </div>
</div>
<div class="clear"></div>					<ul id="res">
		<li class="r1" title="چوب||تولید: 449">
		<p>
        	<img src="img/x.gif" alt="چوب"/>
			<span id="l1" class="value ">25089/45700</span>
		</p>
				<div class="bar-bg">
	        <div id="lbar1" class="bar" style="width:55%; background-color: #006900"></div>
	        <div class="clear"></div>
        </div>
        	</li>
		<li class="r2" title="خشت||تولید: 449">
		<p>
        	<img src="img/x.gif" alt="خشت"/>
			<span id="l2" class="value ">10565/45700</span>
		</p>
				<div class="bar-bg">
	        <div id="lbar2" class="bar" style="width:23%; background-color: #006900"></div>
	        <div class="clear"></div>
        </div>
        	</li>
		<li class="r3" title="آهن||تولید: 449">
		<p>
        	<img src="img/x.gif" alt="آهن"/>
			<span id="l3" class="value ">29326/45700</span>
		</p>
				<div class="bar-bg">
	        <div id="lbar3" class="bar" style="width:64%; background-color: #006900"></div>
	        <div class="clear"></div>
        </div>
        	</li>
		<li class="r4" title="گندم||تولید: 297">
		<p>
        	<img src="img/x.gif" alt="گندم"/>
			<span id="l4" class="value ">12661/37900</span>
		</p>
				<div class="bar-bg">
	        <div id="lbar4" class="bar" style="width:33%; background-color: #006900"></div>
	        <div class="clear"></div>
        </div>
        	</li>
		<li class="r5" title="میزان گندم||مصرف / تولید">
		<p>
        	<img src="img/x.gif" alt="مصرف گندم"/>
			<span id="l5" class="value ">608/905</span>
		</p>
			</li>
	</ul>
<div class="clear"></div>

<script type="text/javascript">
	resources.production = {
					'l1': 449,					'l2': 449,					'l3': 449,					'l4': 297			};
</script>					<div id="villageName">
	<div class="clickable" ondblclick="Travian.Game.showEditVillageDialog('تغییر نام دهکده.', 'نام جدید دهکده:', 'ذخیره',133788);" title="برای تغییر نام دهکده دوبار کلیک (دوبل کلیک) کنید." >
		<span id="villageNameField">.:1_Lord:.</span><br/>
		<span class="loyalty high">
			وفاداری: 125%
		</span>
	</div>
</div>
																		<div id="anwersQuestionMark">
	<a href="http://t4.answers.travian.ir/index.php?aid=50#go2answer" target="_blank" title="پاسخ‌های تراوین">&nbsp;</a>
</div>			</div>

			<div id="ce"></div>
								</div>

		
		
			</body>
</html>











