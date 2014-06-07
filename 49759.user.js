// ==UserScript==
// @name           Ikariam Save Data
// @version        0.1.6.1
// @description    Ikariam Save Data
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @author         IkaDevTeam
// @e-mail         IkaDevTeam
// @include        http://s*.ikariam.*
// ==/UserScript==
function ISD()
	{
	this.sql='';
	this.Parameters=new Array();
	
	this.INIT=function()
		{
		this.Load_Db();		// Load Db
		this.Load_Menu(); 	// Add a new div on left
		this.ParseUrl();	// Analyse url for option
		this.ParseVars();	// Add a new div on left
		this.ParseDom()
		};	
	this.Load_Db=function()
		{
		SqlQuery('SELECT name FROM PLAYER');
		};	
	this.Load_Menu=function()
		{
		$("div .dynamic:eq(0)").before("<div class='dynamic' id='ISD_MENU'><h3 class='header'>MENU ISD</h3><div class='content'><table width='100%'><tr><td id='ISD_MENU_CONTENT'></td></tr><tr><td id='ISD_MENU_RETOUR'><iframe src='' id='ISD_FrameOutPut' name='ISD_FrameOutPut' style='width:214px;'></iframe></td></tr></table></div></div><div class='footer'></div>");
		};
	this.ParseUrl=function()
		{
		var ISD_url=document.location.toString();
		var ISD_get=ISD_url.split('index.php?')[1];
		var ISD_parameters=ISD_get.split('&');
		for(ISD_Parameter_Id in ISD_parameters)
			{
			var ISD_Parameter=ISD_parameters[ISD_Parameter_Id];
			var ISD_Parameter_Name=ISD_Parameter.split('=')[0];
			var ISD_Parameter_Value=ISD_Parameter.split('=')[1];
			this.Parameters[ISD_Parameter_Name]=ISD_Parameter_Value;
			// Temporary Debug
			$("#ISD_MENU_CONTENT").append(ISD_Parameter_Name+"=>"+ISD_Parameter_Value+"<br/>");
			}
		};
		
	this.ParseVars=function()
		{
		
	
		};	
	
	this.ParseDom=function()
		{
		switch(this.Parameters['view'])
			{
			case 'highscore':// HighScore Page
			
			break;	
			
			case 'highscore':// HighScore Page
			
			break;				
				
			default:// Unknow Page	
			
			break;
			}
		};	
	
	}
function SqlQuery(sql)
	{
	var sqls=sql.toLowerCase();
	switch(sqls.split(' ')[0])
		{
		case 'select': // Detection d'un SELECT
			SqlQuery_Select(sqls);
		break;	
		case 'insert': // Detection d'un SELECT
		
		break;				
		case 'update': // Detection d'un SELECT
		
		break;		
		case 'replace': // Detection d'un SELECT
		
		break;		
		case 'create': // Detection d'un SELECT
		
		break;			
		default:
			return 'Unknow Function';
		break; 
		}
	}	
function SqlQuery_Select(sql)	 // N'accepte que les requetes du type "Select [*|champ|champ1,champ2..] from [table] where [1|condition|condition1 AND condition2 AND...] 	
	{
	
	var e1=sql.split('from');	
	var start=e1[0];
	var champ=trim(start.split('select')[1]);
	var champs=champ.split(',');
	var e2=e1[1].split('where');
	if(e2.length<2)
		{
		var table=trim(e1[1]);
		var conditions='';
		}
	else
		{
		var table=trim(e2[0]);
		var condition=trim(e2[1]);
		var conditions=condition.split('and');
		}	
	var champs_pos=GM_getValue("DB_TABLE_STRUCTURE_"+table).split(',');
	if(conditions.length>0)
		{
		
			
		}
	else
		{
		var data=new Array();
		var keyindex=GM_getValue("DB_TABLE_STRUCTURE_"+table+'_SQDKEY').split(',');
		for(j in champs)
			{
			for (i in keyindex) 
				{
				data[i]=new Array();
				data[i][champs[j]]=GM_getValue("DB_TABLE_DATA_"+table+'_'+champs[j]+i);
				}
			}	
		alert(data);		
		
		}
	
	}
	
function trim (myString)
	{
	return myString.replace(/^\s+/g,'').replace(/\s+$/g,'')
	} 	
	
	
/*
DB_TABLE_STRUCTURE_$TABLE=SQDKEY_$CHAMP1,$CHAMP2,$CHAMP3,$CHAMP4,$CHAMP5....
DB_TABLE_STRUCTURE_$TABLE_SQDKEY=row1_row2,row3,row4,row5....
DB_TABLE_DATA_$TABLE_$CHAMP_$ROW=$VALUE



*/

// Pour test creation d'une table avec 2 rows
GM_setValue("DB_TABLE_STRUCTURE_player", "SQDKEY,id,name,server");
GM_setValue("DB_TABLE_STRUCTURE_player_SQDKEY", "0,2");

GM_setValue("DB_TABLE_DATA_player_id_0", "1");
GM_setValue("DB_TABLE_DATA_player_name_0", "Argamote");
GM_setValue("DB_TABLE_DATA_player_SQDKEY_0", "0");

GM_setValue("DB_TABLE_DATA_player_id_2", "10");
GM_setValue("DB_TABLE_DATA_player_name_2", "Argamote");
GM_setValue("DB_TABLE_DATA_player_SQDKEY_2", "2");
// FIn du test

var ISD_Object= new ISD();
ISD_Object.INIT();