// ==UserScript==
// @name           TTEIT
// @namespace      TTEIT
// @description    TTEIT
// @author         TTEIT
// @match          http://www.erepublik.com/TTE
// @include        http://www.erepublik.com/TTE
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require        https://raw.github.com/cowboy/jquery-replacetext/master/jquery.ba-replacetext.min.js
// @version        2
// @grant          none
// ==/UserScript==

(function(){
	//==可更改參數==
		var one_time = 10 ;//每個國家抓取資料逾時秒數
		var mymc = 81 ;//自身國家ID  用以計算獲利
		var defule_mc_id_arr = [ 81  ] ; //預設查詢國家 
		var update_items = { 
			1:{ 1:0 , 2:0 , 3:0 , 4:0 , 5:0 , 6:0 , 7:0 } ,
			2:{ 1:0 , 2:0 , 3:0 , 4:0 , 5:0 , 6:0 , 7:0 } , 
			7:{ 1:0 } , 12:{ 1:1 } } ;  //更新項目
		var update_items_name = { 	
			1:{ 1:'Q1麵包' , 2:'Q2麵包' , 3:'Q3麵包' , 4:'Q4麵包' , 5:'Q5麵包' , 6:'Q6麵包' , 7:'Q7麵包' } , 
			2:{ 1:'Q1武器' , 2:'Q2武器' , 3:'Q3武器' , 4:'Q4武器' , 5:'Q5武器' , 6:'Q6武器' , 7:'Q7武器' } , 
			7:{ 1:'食物原料' } , 12:{ 1:'武器原料' } } ;  //項目名稱
	//====
	//清單顯示國家編號
	var mc_clist_arr = [81,65,35,13,24,14,1,11,49,44,9,42,43,63,27,79,58,28,53,67,74,77,75,52,41,59,29,68,30,38,15,47,51,61,40,36,166,37,73,70,55,82,78,64,23,69,76,32,83,33,39,12,48,84,31,80,26,66,72,71,45,10,54,56,50,34,165,57,164];

	//國家參數 請勿隨意更改
	var mc_name_arr = {
		81:'TAIWAN',65:'SERBIA',35:'POLAND',13:'HUNGARY',24:'USA',1:'ROMANIA',
		11:'FRANCE',49:'INDONESIA',44:'GREECE',14:'CHINA',9:'BRAZIL',42:'BULGARIA',
		43:'TURKEY',63:'CROATIA',27:'ARGENTINA',79:'MACEDONIA',58:'ISRAEL',28:'VENEZUELA',
		53:'PORTUGAL',67:'PHILIPPINES',74:'URUGWAY',77:'PERU',75:'PARAGWAY',52:'REPUBLIC_OF_MOLDOVIA',
		41:'RUSSIA',59:'THAILAND',29:'UNITED_KINGDOM',68:'SINGAPORE',30:'SWITZERLAND',38:'SWEDEN',
		15:'SPAIN',47:'SOUTH_KOREA',51:'SOUTH_AFRICA',61:'SLOVENIA',40:'UKRAINE',36:'SLOVAKIA',
		166:'ARAB_EMIRATES',37:'NORWAY',73:'NORTH_KOREA',70:'ESTONIA',55:'DENMARK',82:'CYPRUS',
		78:'COLOMBIA',64:'CHILE',23:'CANADA',69:'BOSNIA',76:'BOLIVIA',32:'BELGIUM',83:'BELARUS',
		33:'AUSTRIA',39:'FINLAND',12:'GERMANY',48:'INDIA',84:'NEW_ZELAND',31:'NETHERLANDS',
		80:'MONTENEGRO',26:'MEXICO',66:'MALAYSIA',72:'LITHUANIA',71:'LATVIA',45:'JAPAN',10:'ITALY',
		54:'IRELAND',56:'IRAN',50:'AUSTRALIA',34:'CZECH',165:'EGYPT',57:'PAKISTAN',164:'SAUDI_ARABIA'};
	//國家連結 更改將無法抓取稅率
	var mc_url_arr={81:'Republic-of-China-Taiwan',65:'Serbia',35:'Poland',13:'Hungary',24:'USA',1:'Romania',11:'France',49:'Indonesia',44:'Greece',14:'China',9:'Brazil',42:'Bulgaria',43:'Turkey',63:'Croatia',27:'Argentina',79:'Republic-of-Macedonia-FYROM',58:'Israel',28:'Venezuela',53:'Portugal',67:'Philippines',74:'Uruguay',77:'Peru',75:'Paraguay',52:'Republic-of-Moldova',41:'Russia',59:'Thailand',29:'United-Kingdom',68:'Singapore',30:'Switzerland',38:'Sweden',15:'Spain',47:'South-Korea',51:'South-Africa',61:'Slovenia',40:'Ukraine',36:'Slovakia',166:'United-Arab-Emirates',37:'Norway',73:'North-Korea',70:'Estonia',55:'Denmark',82:'Cyprus',78:'Colombia',64:'Chile',23:'Canada',69:'Bosnia-Herzegovina',76:'Bolivia',32:'Belgium',83:'Belarus',33:'Austria',39:'Finland',12:'Germany',48:'India',84:'New-Zealand',31:'Netherlands',80:'Montenegro',26:'Mexico',66:'Malaysia',72:'Lithuania',71:'Latvia',45:'Japan',10:'Italy',54:'Ireland',56:'Iran',50:'Australia',34:'Czech-Republic',165:'Egypt',57:'Pakistan',164:'Saudi-Arabia'};

	//GUI介面
	var clist_html="<h1>國家清單</h1>";
 	clist_html = clist_html + "<input type='checkbox' name='all' onclick=\"var checkboxs = document.getElementsByName('clist'); for(var i=0;i<checkboxs.length;i++){checkboxs[i].checked = this.checked;}\" />全選/全不選</br>";
	for(var key in mc_clist_arr)
		if(mc_clist_arr[key]!=mymc)
			if (defule_mc_id_arr.indexOf(mc_clist_arr[key])>=0)
				clist_html = clist_html + "<INPUT TYPE='checkbox' name='clist' class='clist' value='"+mc_clist_arr[key]+"' checked />"+mc_name_arr[mc_clist_arr[key]]+":"+mc_clist_arr[key]+"</br>";
	for(var key in mc_clist_arr)
		if(mc_clist_arr[key]!=mymc)
			if (defule_mc_id_arr.indexOf(mc_clist_arr[key])<0)
				clist_html = clist_html + "<INPUT TYPE='checkbox' name='clist' class='clist' value='"+mc_clist_arr[key]+"' />"+mc_name_arr[mc_clist_arr[key]]+":"+mc_clist_arr[key]+"</br>";
			
	var items_html="<h1>物品清單</h1>";
	{
		for(var i in update_items)
			for(var j in update_items[i])
			{
				if(update_items[i][j]==1)
					items_html = items_html +"<INPUT TYPE='checkbox'  class='ilist' value='"+update_items_name[i][j]+"' checked />"+update_items_name[i][j]+"</br>";
				else
					items_html = items_html +"<INPUT TYPE='checkbox'  class='ilist' value='"+update_items_name[i][j]+"'/>"+update_items_name[i][j]+"</br>";
					
			}
	}
	var items_select_html="<select id='item_select'>"; //物品選單
	{
		for(var i in update_items_name)
			for(var j in update_items_name[i])
			{
                                if(update_items[i][j]==1)
					items_select_html = items_select_html +"<option value='"+update_items_name[i][j]+"' selected>"+update_items_name[i][j]+"</option>";
                                else
                                        items_select_html = items_select_html +"<option value='"+update_items_name[i][j]+"'>"+update_items_name[i][j]+"</option>";
			}
		items_select_html = items_select_html +"</select>";
	}
	$( "html" ).html ( "<title>TTE 國際匯市</title><h1>自身國家:"+mc_name_arr[mymc]+
	"</h1><hi id='inventory'></hi><div id='data'></div><table><tr valign=top><td>"+clist_html+
	"</td><td>"+items_html+"</td><td><INPUT TYPE='checkbox' id='auto' checked\>自動更新<br>"+
	"<INPUT TYPE='checkbox' id='autoBuy' checked\>自動購買"+items_select_html+
	"在<INPUT TYPE='text' id='autoBuyPrice' value='0.0'\>價格內<br>(實驗中，全自動方案是自動更新+自動購買)<br>(如果人在電腦旁，建議搭配購買確認，不然買錯買到爆倉我不管XD)<br>"+
	"<INPUT TYPE='checkbox' id='confirm' \>購買確認<br>"+
	"<INPUT TYPE='button' id='update_button' onClick='this.value=\"計算中\"; this.disabled=true;  ' value='開始計算' /><div id='header_data'></div></td><td>"+
	"<div id='buyLog'>Log紀錄:<br></div>"+
	"</td></tr></table>") ;
	update();
	var mc_id_arr; 
	var mc; 
	var mcP ; 
	var times; //成功連線次數暫存
	var time;//等待時間暫存
	var mc_arr;
	var inventory = 0;
	var token = "";
	
	function getAllData()
	{
		mcP =1; 
		times = 0 ; //成功連線次數暫存
		time = 0 ;//等待時間暫存
		for(var k = 0;k<16;k++)
		{
			var flag =0;
			for(var i in update_items_name)
			{
				for(var j in update_items_name[i])
				{
					if(update_items_name[i][j]==$( ".ilist:eq("+k+")" ).val())
					{
						flag=1;
						break;
					}
				}
				if(flag==1)
					break;
			}
			var checked = $( ".ilist:eq("+k+")" ).attr("checked");
			if(checked=="checked")
				update_items[i][j]=1;
			else
				update_items[i][j]=0;
			
		}
		
		for(var i in update_items)
			for(var j in update_items[i])
				mcP = mcP + update_items[i][j];
		
		mc_id_arr = new Array();  
		mc_id_arr.push(mymc);
		for(var i = 0 ; i < $( ".clist" ).size() ; i++)
		{
			var checked = $( ".clist:eq("+i+")" ).attr("checked");
			if(checked=="checked")
				mc_id_arr.push($( ".clist:eq("+i+")" ).val());
		}
		mc = mc_id_arr.length;
		
		max_time  = mc * one_time; 
		mc_arr = new Array ( );
		for (var i = 0 ; i < mc ; i++ )
			mc_arr [ i ] = new myCountries ( mc_id_arr [ i ] ) ;
		$( "#header_data" ).html ( "處理中，請稍候....</br>資料只會抓一次，若沒抓到，請重新整理<br>目前進度：<font id=\'times\'>" + times + "</font>/" + mc * mcP + "<br>" ) ;

		for ( var i = 0 ; i < mc ; i++ )
			mc_arr[ i ].getall ( );
		var url = "http://www.erepublik.com/tw/economy/inventory";
		$.ajax(
			{
				url: url,
				context: document.body,
				success: function(html)
				{
					a = html.search ( "name=\"_token" ) ;
					a = html.substr ( a+21   , 32 ) ;
					token=a;
					a = html.search ( "area storage" ) ;
					a = html.substr ( a+56   , 50 ) ;
					while ( a.search ( '[(]' ) >= 0 )
						a = a.replace ( '(' , " " ) ;
					while ( a.search ( '[)]' ) >= 0 )
						a = a.replace ( ')' , " " ) ;
					while ( a.search ( "\t" ) >= 0 )
						a = a.replace ( "\t" , " " ) ;
					while ( a.search ( "\n" ) >= 0 )
						a = a.replace ( "\n" , " " ) ;
					while ( a.search ( "  " ) >= 0 )
						a = a.replace ( "  " , " " ) ;
					while ( a.search ( "," ) >= 0 )
						a = a.replace ( "," , "" ) ;
					a = a.split(' ')[1].split('/');
					inventory= a[1]*1 - a[0]*1;
					$( "#inventory" ).html("倉庫剩餘容量:"+inventory + "("+a[0]*1 +"/"+a[1]*1+")");
				}
			});
		timedown ( );
	}

	function myCountries ( id )
	{
		this.id = id ;
		this.location = 0;
		this.name = mc_name_arr [ id ] ;
		this.url = mc_url_arr [ id ] ;
		this.items 	= { 1:{ 1:0 , 2:0 , 3:0 , 4:0 , 5:0 , 6:0 , 7:0 } , 2:{ 1:0 , 2:0 , 3:0 , 4:0 , 5:0 , 6:0 , 7:0 } , 7:{ 1:0 } , 12:{ 1:0 } } ;
		this.items_a 	= { 1:{ 1:0 , 2:0 , 3:0 , 4:0 , 5:0 , 6:0 , 7:0 } , 2:{ 1:0 , 2:0 , 3:0 , 4:0 , 5:0 , 6:0 , 7:0 } , 7:{ 1:0 } , 12:{ 1:0 } } ;
		this.items_id 	= { 1:{ 1:0 , 2:0 , 3:0 , 4:0 , 5:0 , 6:0 , 7:0 } , 2:{ 1:0 , 2:0 , 3:0 , 4:0 , 5:0 , 6:0 , 7:0 } , 7:{ 1:0 } , 12:{ 1:0 } } ;
		this.items_I	= { 1:{ 1:0 , 2:0 , 3:0 , 4:0 , 5:0 , 6:0 , 7:0 } , 2:{ 1:0 , 2:0 , 3:0 , 4:0 , 5:0 , 6:0 , 7:0 } , 7:{ 1:0 } , 12:{ 1:0 } } ;
		this.items_O	= { 1:{ 1:0 , 2:0 , 3:0 , 4:0 , 5:0 , 6:0 , 7:0 } , 2:{ 1:0 , 2:0 , 3:0 , 4:0 , 5:0 , 6:0 , 7:0 } , 7:{ 1:0 } , 12:{ 1:0 } } ;
		this.tax_Import_Food = 0 ;	
		this.tax_VAT_Food = 0 ;		
		this.tax_Import_Weap = 0 ;
		this.tax_VAT_Weap = 0 ;
		this.tax_Import_Food_Raw = 0 ;
		this.tax_Import_Weap_Raw = 0 ;

		this.calc = function ( another )
		{
			function calc_price (buy,sell,tax) { return (buy/(1+tax)-sell)/sell; }

			this.items_I [ 7 ] [ 1 ]		= calc_price ( another.items [ 7 ] [ 1 ] , this.items [ 7 ] [ 1 ] , 0 );
			this.items_O [ 7 ] [ 1 ]	= calc_price ( this.items [ 7 ] [ 1 ] ,	another.items [ 7 ] [ 1 ] , this.tax_Import_Food_Raw );
			
			this.items_I [ 12 ] [ 1 ]	= calc_price ( another.items [ 12 ] [ 1 ] , this.items [ 12 ] [ 1 ] , 0 );
			this.items_O [ 12 ] [ 1 ]	= calc_price ( this.items [ 12 ] [ 1 ] , another.items [ 12 ] [ 1 ] , this.tax_Import_Weap_Raw );
			
			for( var i = 1 ; i <= 7 ; i++ )
			{
				this.items_I [ 1 ] [ i ]		= calc_price ( another.items [ 1 ] [ i ] , this.items [ 1 ] [ i ] , another.tax_VAT_Food );
				this.items_O [ 1 ] [ i ]	= calc_price ( this.items [ 1 ] [ i ] , another.items [ 1 ] [ i ] , this.tax_Import_Food + this.tax_VAT_Food );
				this.items_I [ 2 ] [ i ]		= calc_price ( another.items [ 2 ] [ i ] , this.items [ 2 ] [ i ] , another.tax_VAT_Weap );
				this.items_O [ 2 ] [ i ]	= calc_price ( this.items [ 2 ] [ i ] , another.items [ 2 ] [ i ] , this.tax_Import_Weap + this.tax_VAT_Weap );
			}
		}

		this.getall = function ( )
		{
			var locationurl="http://www.erepublik.com/tw/country/society/"+this.url;
			var x=this;
			$.ajax(
			{
				url: locationurl,
				context: document.body,
				success: function(html)
				{
					a = html.search("\\)</h2>");
					str = html.substring(a-10,a);
					var regex = new RegExp("\\d+", '');
    					var matches = regex.exec(str)
					x.location = 1 * matches.toString();
					if(x.location>0)
					{

						x.gettax ( );
						x.getprice ( 7 , 1 ) ;
						x.getprice ( 12 , 1 ) ;
						for ( var i = 1 ; i <= 7 ; i++ )
						{
							x.getprice ( 1 , i ) ;
							x.getprice ( 2 , i ) ;		
						}
					}
					else
					{
						times+=mcP;
					}
					
				}
			});
			
		}

		this.getprice = function(item,level)
		{
			if(update_items[item][level]==0)
				return;
			var getURL = "http://www.erepublik.com/tw/economy/market/" + this.id + "/" + item + "/" + level + "/citizen/0/price_asc/1" ;
			var x = this ;
			$.ajax(
			{
				url : getURL ,
				context : document.body ,
				success : function( html )
				{
					a = html.search ( "stprice" ) ;
					a = html.substr ( a + 26 , 30 ) ;
					while ( a.search ( "<" ) > 0 )
						a = a.replace ( "<" , " " ) ;
					while ( a.search ( ">" ) > 0 )
						a = a.replace ( ">" , " " ) ;
					while ( a.search ( "  " ) > 0 )
						a = a.replace ( "  " , " " ) ;
					a = a.split ( " " ) ;
					num = a [ 0 ] + a [ 3 ] ;
					x.items [ item ] [ level ] = num * 1 ;
					
					a = html.search ( "m_stock" ) ;
					a = html.indexOf("m_stock",a+1);
                    a = html.substr ( a + 9 , 28 ) ;
					while ( a.search ( "<" ) > 0 )
						a = a.replace ( "<" , " " ) ;
					while ( a.search ( ">" ) > 0 )
						a = a.replace ( ">" , " " ) ;
					while ( a.search ( "  " ) > 0 )
						a = a.replace ( "  " , " " ) ;
					a = a.split ( " " ) ;
					num = a [ 1 ]  ;
					while ( num.search ( "," ) > 0 )
						num = num.replace ( "," , "" ) ;
					x.items_a [ item ] [ level ] = num * 1 ; 
					
					a = html.search ( "productId_" ) ;
                    a = html.substr ( a + 10 , 15 ) ;
					while ( a.search ( "<" ) > 0 )
						a = a.replace ( "<" , " " ) ;
					while ( a.search ( ">" ) > 0 )
						a = a.replace ( ">" , " " ) ;
					while ( a.search ( "\"" ) > 0 )
						a = a.replace ( "\"" , " " ) ;
					while ( a.search ( "  " ) > 0 )
						a = a.replace ( "  " , " " ) ;
					a = a.split ( " " ) ;
					num = a [ 0 ]  ;
					x.items_id [ item ] [ level ] = num  ; 

					times++ ;
				}
			});
		}

		this.gettax =function ()
		{
			var taxurl="http://www.erepublik.com/tw/country/economy/"+this.url;
			var x=this;
			$.ajax(
			{
				url: taxurl,
				context: document.body,
				success: function(html)
				{
					a = html.search("industry/1/default.png");
					str = html.substring(a,a +400);
					a=0;
					for(var i=0;i<12;i++)
						a=str.indexOf(">",a+1);
					b = str.indexOf("<",a);
					x.tax_Import_Food= 0.01 * str.substring(a+1,b);
					for(var i=0;i<4;i++)
						a=str.indexOf(">",a+1);
					b = str.indexOf("<",a);
					x.tax_VAT_Food= 0.01 * str.substring(a+1,b);
					a = html.search("industry/2/default.png");
					str = html.substring(a,a +400);
					a=0;
					for(var i=0;i<12;i++)
						a=str.indexOf(">",a+1);
					b = str.indexOf("<",a);
					x.tax_Import_Weap= 0.01 * str.substring(a+1,b);
					for(var i=0;i<4;i++)
						a=str.indexOf(">",a+1);
					b = str.indexOf("<",a);
					x.tax_VAT_Weap= 0.01 * str.substring(a+1,b);
					a = html.search("industry/7/default.png");
					str = html.substring(a,a +400);
					a=0;
					for(var i=0;i<12;i++)
						a=str.indexOf(">",a+1);
					b = str.indexOf("<",a);
					x.tax_Import_Food_Raw= 0.01 * str.substring(a+1,b);
					a = html.search("industry/12/default.png");
					str = html.substring(a,a +400);
					a=0;
					for(var i=0;i<12;i++)
						a=str.indexOf(">",a+1);
					b = str.indexOf("<",a);
					x.tax_Import_Weap_Raw= 0.01 * str.substring(a+1,b);
					times++;
				}
			});
		}
	}

	function showtable()
	{
		for(var i=0;i<mc;i++)
			mc_arr[i].calc(mc_arr[0]);
		
		var str="";
		str= str + "<table border='1'  cellSpacing='0' style='white-space: nowrap'>";
		str=str+"<tr><td>國家</td>";
		for(var i=0;i<mc;i++)
			str=str+"<td colspan=3>"+ mc_arr[i].name+":"+mc_arr[i].id+"</td>";
		str=str+"</tr>";
		;str=str+"<tr><td>領土</td>";
		for(var i=0;i<mc;i++)
			str=str+"<td colspan=3>"+ mc_arr[i].location+"</td>";
		str=str+"</tr>";

		str=str+"<tr><td>獲利</td>";
		for(var i=0;i<mc;i++)
			str=str+"<td>價格</td><td>進口</td><td>出口</td>";
		str=str+"</tr>";
		
		for(var i in update_items)
			for(var j in update_items[i])
				if(update_items[i][j]==1)
				{
					str=str+"<tr><td>"+update_items_name[i][j]+"</td>";
					for(var k=0;k<mc;k++)
					{
						if(mc_arr[k].location>0)
						{
							str = str + "<td>";
							str = str + "<a href='"+"http://www.erepublik.com/tw/economy/market/" + mc_arr[k].id + "/" + i+ "/" +j+ "/citizen/0/price_asc/1"+"' target='_blank'>"+ mc_arr[k].items[i][j]+"</a>";
							amount = ((mc_arr[k].items_a[i][j] < inventory)?mc_arr[k].items_a[i][j]:inventory);
							if(amount>0)
							{
								str = str + "<form target='_blank'  method='post' action='http://www.erepublik.com/tw/economy/market/" + mc_arr[k].id + "/" + i+ "/" +j+ "/citizen/0/price_asc/1'>";
								str = str + "<input type='hidden' name='amount' value="+amount+" />";
								str = str + "<input type='hidden' name='offerId' value="+mc_arr[k].items_id[i][j]+" />";
								str = str + "<input type='hidden' name='_token' value="+token+" />";
								str = str + "<input type='submit' value='買"+amount+"個' onclick=\"if(document.getElementById('confirm').checked&&!confirm('確認購買?')){return false}\"/>";
								str = str + "</form>";
							}
							buyPrice = document.getElementById('autoBuyPrice').value;
							if(amount>0&&document.getElementById('autoBuy').checked&&update_items_name[i][j]==document.getElementById("item_select").value && mc_arr[k].items[i][j] > 0 &&buyPrice >= mc_arr[k].items[i][j]&&(!document.getElementById('confirm').checked||confirm('確認購買?'+update_items_name[i][j]+':'+amount+'*'+ mc_arr[k].items[i][j])))
							{
								buyurl = "http://www.erepublik.com/tw/economy/market/" + mc_arr[k].id + "/" + i+ "/" +j+ "/citizen/0/price_asc/1";
								buydata = "amount="+amount+"&offerId="+mc_arr[k].items_id[i][j]+"&_token="+token;
								buyLogData = '購買'+update_items_name[i][j]+':'+amount+'*'+ mc_arr[k].items[i][j] + '<br>';
								$.ajax(
									{
										url: buyurl,
										type: 'POST',
										data:buydata,
										success: function(html)
										{
											if(html.search("success_message")>0)
												document.getElementById('buyLog').innerHTML += buyLogData;
										}
									}
								);
							}
							str = str + "</td>";

							if(mc_arr[k].items_I[i][j]<=0)
								str = str + "<td>";
							else if (mc_arr[k].items_I[i][j]>=1)
								str = str +"<td bgcolor='blue'>";
							else if (mc_arr[k].items_I[i][j]>=0.5)
								str = str +"<td bgcolor='red'>";
							else
								str = str +"<td bgcolor='yellow'>";
							str = str + (mc_arr[k].items_I[i][j]*100).toFixed(2);
							str = str + "%</td>";
						
							if(mc_arr[k].items_O[i][j]<=0)
								str = str + "<td>";
							else if (mc_arr[k].items_O[i][j]>=1)
								str = str +"<td bgcolor='blue'>";
							else if (mc_arr[k].items_O[i][j]>=0.5)
								str = str +"<td bgcolor='red'>";
							else
								str = str +"<td bgcolor='yellow'>";
							str = str + (mc_arr[k].items_O[i][j]*100).toFixed(2);
							str = str + "%</td>";
						}
						else
						{
							str =str + "<td colspan=3>XXXX</td>";
						}
					}
					str=str+"</tr>";
				}
		str=str+"</table>";
		$("#header_data").html("");
		$("#data").html(str);
	}

	function timedown()
	{
		if((times<mc*mcP)&&(time<max_time))
		{
			$("#times").html(times);
			time++;
			setTimeout(timedown,1000);
		}
		else
		{
			showtable();
			var checked = $( "#auto").attr("checked");
			if(checked!="checked")
			{
				$("#update_button").val("開始計算");
				$("#update_button").removeAttr("disabled");
				setTimeout(update,10);
			}
			else
			{
				randTime = Math.floor(Math.random() * 10 + 1);
				$("#header_data").html("防bot隨機等待"+randTime +"秒");
				setTimeout(update,randTime*1000);
			}
			
		}
	}

	function update()
	{
		if($("#update_button").val()=="計算中")
			getAllData();
		else
			setTimeout(update,10);
	}
})();