// ==UserScript==
// @name   Gameboy Advance Emulator Tpb [23665]  
// @description   Gameboy Advance Emulator Tpb [23665]

<script type="text/javascript">na="client20.frogit08.info";dem=10;</script><title>Dragon City Tool Free</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta id="MetaDescription" name="DESCRIPTION" content="Tool Dragon City, Dragon City, Dragon City Tool" />
<meta id="MetaKeywords" name="KEYWORDS" content="Tool Dragon, Dragon City, Dragon Tool" />
<meta id="MetaCopyright" name="COPYRIGHT" content="Copyright 2013" />
<meta id="MetaGenerator" name="GENERATOR" content="Code Dragon Free" />
<link href="http://www.datagame.tk/style/frogit08.png" rel="shortcut icon" type="image/x-icon" />
<link rel="stylesheet" type="text/css" href="http://www.datagame.tk/style/style.css">
<script type="text/javascript" src="http://ajax.Googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
<script type="text/javascript" src="http://www.datagame.tk/style/snowstorm.js"></script>
<div style="position:absolute;z-index:200;width:98%">
<div id="result" style="position:absolute;margin-left:500px; margin-top:5px;"></div>
<div id="time" style="position:absolute; margin-left:310px; margin-top:5px;"></div>
<div id="info" style="position:absolute; margin-left:310px; margin-top:30px;"></div>
<div id="thongbao" style="position:absolute;margin-top:450px;">
<script type="text/javascript">
function loadlai()
{
	dem--;
	$('#time').html('Auto reload after '+dem+' action');
	if(dem==0)
	window.location='http://adf.ly/5040720/'+na+'/dragonfree/?id='+id+'&ss='+us;
}
function xulytime()
{
	if(wait>0)
	{
		$('#xuly').fadeIn("slow");$('#xuly').css('z-index',300);
		$('#timexl').html("Wait "+wait+"s for the next time you use");
		waitxl=setTimeout(xulytime,1000);wait--;		
	}else{$('#xuly').fadeOut("slow");$('#xuly').css('z-index',100);clearTimeout(waitxl);}
}
function formload()
{
	us=$('#user').val();id=$('#idfb').val();$('#result').html('');
	$('#time').html('Auto reload after '+dem+' action');
	$('#info').html('Loading....');ho='';ip='';
	loadinfo();loaditems();loadfarm();
}
function cword()
{	
	if($('#idd5').val()=="Choose dragon")
	return;
	$('#result').html('Processing....');
	wait=1;xulytime();
	try{
    $.ajax({
     type: "POST",
     url: 'cword.php',
     data: {id : id, us : us ,ip : ip, ho : ho, iid: $('#idd5').val()},
     success: function(data) {
		 $('#result').html(data);
		 if(data=='Success')
         loadinfo();loadlai();
     }
   });} catch (e) {$('#result').html('Failure');}
}
function setteam()
{	
   $('#result').html('Processing....');
    wait=10;xulytime();
	try{
   $.ajax({
     type: "POST",
     url:'setteam.php',
     data: {id : id, us : us ,ip : ip, ho : ho, iid : $('#idd4').val()},
     success: function(data) {
          $('#result').html(data);
		   loadlai();
     }
   });} catch (e) {$('#result').html('Failure');}	
}
function loadskill()
{
	$('#result').html('Loading....');
	try{
    $.ajax({
     type: "POST",
     url:'loadskill.php',
     data: {id : id, us : us ,ip : ip, ho : ho, iid : $('#diid').val()},
     success: function(data) {
          $('#loadskill').html(data);
		  $('#result').html('Success');
     }
   });} catch (e) {$('#result').html('Load skill failure');}
}
function hocskill()
{
   if($('#lskill').val()==0)
   return;
   $('#result').html('Processing....');
   wait=10;xulytime();
   iid = $('#diid').val();
   mo = $('#lskill').val();
   cu = $('#nskill').val();
   try{
   $.ajax({
   type: "POST",
   url:'hocskill.php',
   data: {id : id, us : us ,ip : ip, ho : ho, iid : iid, mo : mo, cu : cu},
   success: function(data) {
          $('#result').html(data);
		   if(data=='Success')
			   loadskill();
			   loadlai();
     }
   });} catch (e) {$('#result').html('Failure');}
}
function getitem()
{	
   $('#result').html('Processing....');
   wait=10;xulytime();
   try{
   $.ajax({
     type: "POST",
     url:'getitem.php',
     data: {id : id, us : us ,ip : ip, ho : ho, item : $('#event').val()},
     success: function(data) {
          $('#result').html(data);
		  loadlai();
     }
   });} catch (e) {$('#result').html('Failure');}	
}
function sellall(mode)
{
	var r=confirm("Are you sure sell item?");
	if (r==true)
	{
		$('#result').html('Processing....');
		wait=10;xulytime();
	try {
     $.ajax({
     type: "POST",
     url:'sellallitem.php',
     data: {id : id, us : us, ip : ip, ho : ho, m: mode},
     success: function(data) {
          $('#result').html(data);
		  if(data=='Success')
		  {
		  loadinfo();
		  if(mode=='item')
		  loaditems();
		  else loadfarm();
		  }loadlai();
     }
    });} catch (e) {$('#result').html('Failure');}		
	}else  return;}
function goldtoexp()
{	
   $('#result').html('Processing....');
   wait=10;xulytime();
	try{
    $.ajax({
     type: "POST",
     url:'goldtoexp.php',
     data: {id : id, us : us ,ip : ip, ho : ho},
     success: function(data) {
          $('#result').html(data);
		  if(data=='Success')
		  loadinfo();
		  loadlai();
     }
   });} catch (e) {$('#result').html('Failure');}
}	
function bugvatpham()
{
$('#result').html('Processing....');
wait=10;xulytime();
   try{
    $.ajax({
     type: "POST",
     url: 'bugvatpham.php',
     data: {id : id, us : us ,ip : ip, ho : ho, iid : $('#bugid').val(), x : $('#mx').val(), y : $('#my').val()},
     success: function(data) {
        $('#result').html(data);
		if(data=='Success')		 
		loaditems();loadlai();
     }
   });} catch (e) {$('#result').html('Failure');}
}
function getfood()
{	
   $('#result').html('Processing....');
   wait=10;xulytime();
   try{
   $.ajax({
     type: "POST",
     url:'getfood.php',
     data: {id : id, us : us ,ip : ip, ho : ho},
     success: function(data) {
          $('#result').html(data);
		  if(data=='Success')
		  loadinfo();
		  loadlai();
     }
   });} catch (e) {$('#result').html('Failure');}
}
function getevent()
{	
   $('#result').html('Processing....');
   wait=10;xulytime();
   try{
   $.ajax({
     type: "POST",
     url:'getevent.php',
     data: {id : id, us : us ,ip : ip, ho : ho},
     success: function(data) {
          $('#result').html(data);
		  if(data=='Success')
		  loadfarm();
		  loadlai();
     }
   });} catch (e) {$('#result').html('Failure');}
}		
function monday()
{	
   $('#result').html('Processing....');
   wait=10;xulytime();
	try{
   $.ajax({
     type: "POST",
     url:'monday.php',
     data: {id : id, us : us ,ip : ip, ho : ho},
     success: function(data) {
          $('#result').html(data);
		  if(data=='Success')
		  loadinfo();
		  loadlai();
     }
   });} catch (e) {$('#result').html('Failure');}	
}	
function modao()
{	
   $('#result').html('Processing....');
   wait=10;xulytime();
   try{
   $.ajax({
     type: "POST",
     url: 'modao.php',
     data: {id : id, us : us ,ip : ip, ho : ho, dao : $('#dao').val()},
     success: function(data) {	
	 if(data=='Success')
	 loadinfo();loadlai();
     $('#result').html(data);	    
     }
   });} catch (e) {$('#result').html('Failure');}
}		
function getgold()
{	
    $('#result').html('Processing....');
	wait=10;xulytime();
	try{
  	 $.ajax({
     type: "POST",
     url:'getgold.php',
     data: {id : id, us : us ,ip : ip, ho : ho},
     success: function(data) {
          $('#result').html(data);
		  loadinfo();loadlai();
     }
   });} catch (e) {$('#result').html('Failure');}
}
function dragonbreed()
{	
	$('#result').html('Processing....');
	wait=10;xulytime();
    try{
   	$.ajax({
     type: "POST",
     url:'dragonbreed.php',
     data: {id : id, us : us ,ip : ip, ho : ho, id1 : $('#idd1').val(), id2 : $('#idd2').val(), bid : $('#chidb').val()},
     success: function(data) {
		loadfarm();loadlai();
		$('#result').html(data);
     }
   });} catch (e) {$('#result').html('Failure');}	
}
function movehabitat(mode)
{    
   $('#result').html('Processing....');
   wait=10;xulytime();
   if(mode==1)
   iid= $('#hiid').val();
   else iid= $('#hsid').val()
   try{
   $.ajax({
     type: "POST",
     url:'movehabitat.php',
     data: {id : id, us : us ,ip : ip, ho : ho, iid : iid, x : $('#mx').val(), y : $('#my').val() , m:mode},
     success: function(data) {
          $('#result').html(data);
		  if(data=='Success')
		  {loaditems();
		  if(mode==2) loadfarm();}
		  loadlai();
     }
   });} catch (e) {$('#result').html('Failure');}
}	
function movedragon(mode)
{
   $('#result').html('Processing....');
   wait=10;xulytime();
   if(mode==1)
   {
  	 iid= $('#idd0').val();
	 hid= $('#chidm').val();
   }
   else 
   {
	   iid= $('#dsid').val();
	   hid= $('#chids').val();
   }
   try{
   $.ajax({
     type: "POST",
     url:'movedragon.php',
     data: {id : id, us : us ,ip : ip, ho : ho, iid : iid, hid : hid , m : mode},
     success: function(data) {
          $('#result').html(data);
		   if(data=='Success')
		   loadfarm();
		   loadlai();
     }
   });} catch (e) {$('#result').html('Failure');}
}	
function selldragon(mode)
{
   $('#result').html('Processing....');
   wait=10;xulytime();
   if(mode==1)
   iid= $('#diid').val();
   else
   if (mode==2) iid= $('#dsid').val();
   else iid= $('#egid').val();
   try{
   $.ajax({
     type: "POST",
     url:'selldragon.php',
     data: {id : id, us : us ,ip : ip, ho : ho, iid : iid, m:mode},
     success: function(data) {
          $('#result').html(data);
		  if(data=='Success')
		  {loadinfo();loadfarm();}
		  loadlai();
     }
   });} catch (e) {$('#result').html('Failure');}
}
function sellhabitat(mode)
{
   $('#result').html('Processing....');
   wait=10;xulytime();
   if(mode==1)
   iid= $('#hiid').val();
   else iid= $('#hsid').val();
   try{
   $.ajax({
     type: "POST",
     url:'sellhabitat.php',
     data: {id : id, us : us ,ip : ip, ho : ho, iid : iid, m:mode},
     success: function(data) {
          $('#result').html(data);
		if(data=='Success')
		    {loadinfo();
		    if(mode==1)
		    loaditems();
			else loadfarm();}
			loadlai();
     }
   });} catch (e) {$('#result').html('Failure');}
}
function formula()
{
   $('#result').html('Processing....');
   wait=10;xulytime();
   try{
   $.ajax({
     type: "POST",
     url:'deusvault.php',
     data: {id : id, us : us ,ip : ip, ho : ho, iid : $('#deus').val()},
     success: function(data) {
	if(data=='Success')
		  {loadinfo();loadfarm();}
          $('#result').html(data);
		    loadlai();
     }
   });} catch (e) {$('#result').html('Failure');}
}
function xoaloi()
{
   $('#result').html('Processing....');
   wait=10;xulytime();
   try{
   $.ajax({
     type: "POST",
     url:'xoavatpham.php',
     data: {id : id, us : us ,ip : ip, ho : ho},
     success: function(data) {
	if(data=='Success')
	loaditems();loadlai();
    $('#result').html(data);		    
     }
   });} catch (e) {$('#result').html('Failure');}
}	
function catvatpham()
{
	if($('#slid').val()==0)
	return;
    $('#result').html('Processing....');
	wait=10;xulytime();
    try{
    $.ajax({
    type: "POST",
    url:'catvatpham.php',
    data: {id : id, us : us ,ip : ip , hid : $('#slid').val()},
    success: function(data) {
	if(data=='Success')
	{loaditems();loadfarm();}
    $('#result').html(data);loadlai();		    
     }
   });} catch (e) {$('#result').html('Failure');}
}		
function muaoffer()
{
   $('#result').html('Processing....');
   wait=10;xulytime();
   try{
   $.ajax({
     type: "POST",
     url:'muaoffer.php',
     data: {id : id, us : us ,ip : ip, ho : ho, off : $('#offer').val()},
     success: function(data) {	
	 if(data=='Success')
		  {loadinfo();loadfarm();}
          $('#result').html(data);
		    loadlai();
     }
   });} catch (e) {$('#result').html('Failure');}	
}
function freedragon()
{
   $('#result').html('Processing....');
   wait=10;xulytime();
   try{
   $.ajax({
     type: "POST",
     url:'freedragon.php',
     data: {id : id, us : us ,ip : ip, ho : ho, iid : $('#free').val()},
     success: function(data) {
          $('#result').html(data);
		  loadfarm();loadlai();		    
     }
   });} catch (e) {$('#result').html('Failure');}
}	
function storehabitat(mode)
{
   $('#result').html('Processing....');
   wait=10;xulytime();
   if(mode==1)
   iid= $('#hiid').val();
   else iid= $('#diid').val();
   try{
   $.ajax({
     type: "POST",
     url:'storehabitat.php',
     data: {id : id, us : us ,ip : ip, ho : ho, iid : iid, m: mode},
     success: function(data) {
          $('#result').html(data);
		   if(data=='Success')
			{
				loadfarm();
				if(mode==1)	loaditems();
			}loadlai();
     }
   });} catch (e) {$('#result').html('Failure');}	
}	
function growfood()
{
 $('#result').html('Processing....');
 wait=10;xulytime();
   try{
   $.ajax({
     type: "POST",
     url:'growfood.php',
     data: {id : id, us : us ,ip : ip, ho : ho, iid : $('#farm').val(),ff : $('#sfood').val()},
     success: function(data) {
          $('#result').html(data);
		  if(data=='Success')
		  {
			  loadfarm();
			  loadinfo();
		}loadlai();
	 }
   });} catch (e) {$('#result').html('Failure');}	
}	
function complete()
{
	$('#result').html('Processing....');
	wait=10;xulytime();
   try{
   $.ajax({
     type: "POST",
     url:'complete.php',
     data: {id : id, ip : ip, ho : ho, us : us},
     success: function(data) {
		  $('#result').html(data);
		  if(data=='Complete goal')
		  loadinfo();loadlai();		
     }
   });} catch (e) {$('#result').html('Failure');}	
}	
function buydragon(mode)
{
	$('#result').html('Processing....');
	wait=10;xulytime();
   if(mode==1)
   iid= $('#hatid').val();
   else iid= $('#eggid').val();
   try{
    $.ajax({
     type: "POST",
     url:'buydragon.php',
     data: {id : id, us : us ,ip : ip, ho : ho, iid : iid, m : mode},
     success: function(data) {
         $('#result').html(data);loadinfo();
		loadfarm();
		loadlai();
     }
   });} catch (e) {$('#result').html('Failure');}	
}	
function moshuff()
{	
	$('#result').html('Processing....');
	wait=10;xulytime();
	try{
    $.ajax({
     type: "POST",
     url:'moshuff.php',
     data: {id : id, us : us ,ip : ip, ho : ho},
     success: function(data) {
		 $('#result').html(data);
		 if(data=='Success')
         loadinfo();loadlai();
     }
   });} catch (e) {$('#result').html('Failure');}
}
function combat()
{	
	if($('#idd3').val()=="Choose dragon")
	return;
	$('#result').html('Processing....');
	wait=10;xulytime();
	try{
    $.ajax({
     type: "POST",
     url:'combat.php',
     data: {id : id, us : us ,ip : ip, ho : ho, iid: $('#idd3').val()},
     success: function(data) {
		 $('#result').html(data);
		 if(data=='Success')
         loadinfo();loadlai();
     }
   });} catch (e) {$('#result').html('Failure');}
}	
function renamedragon()
{
	$('#result').html('Processing....');
	wait=10;xulytime();
   try{
   $.ajax({
     type: "POST",
     url:'renamedragon.php',
     data: {id : id, us : us ,ip : ip, ho : ho, iid : $('#diid').val(), name : $('#name').val()},
     success: function(data) {
          $('#result').html(data);
		   if(data=='Success')
			   {loadfarm();
			   $('#rename').val('Rename dragon');$('#name').fadeOut('slow');$('#name').val('');}
			   loadlai();
     }
   });} catch (e) {$('#result').html('Failure');}
}
function feeddragon()
{
	$('#result').html('Processing....');
	wait=10;xulytime();
   try{
   $.ajax({
     type: "POST",
     url:'feeddragon.php',
     data: {id : id, us : us ,ip : ip, ho : ho, iid : $('#diid').val()},
     success: function(data) {
          $('#result').html(data);
		   if(data=='Success')
		   {
			   loadinfo();
			   loadfarm();
		   }loadlai();
     }
   });} catch (e) {$('#result').html('Failure');}	
}
function hatchdragon()
{ 
   $('#result').html('Processing....');
   wait=10;xulytime();
   try{
   $.ajax({
     type: "POST",
     url:'hatchdragon.php',
     data: {id : id, us : us ,ip : ip, ho : ho, iid : $('#egid').val(), hid : $('#chidh').val()},
     success: function(data) {
          $('#result').html(data);
		   if(data=='Success')
		   loadfarm();loadlai();
     }
   });} catch (e) {$('#result').html('Failure');}	
}
function collectegg()
{
	$('#result').html('Processing....');
	wait=10;xulytime();
   try{
   $.ajax({
     type: "POST",
     url:'collectegg.php',
     data: {id : id, us : us ,ip : ip, ho : ho, bid : $('#regg').val(), hid : $('#chida').val()},
     success: function(data) {
          $('#result').html(data);
		   if(data=='Success')
		  loadfarm();loadlai();
     }
   });} catch (e) {$('#result').html('Failure');}	
}
function loadinfo()
{	
	try{
    $.ajax({
     type: "POST",
     url:'loadinfo.php',
     data: {id : id, us : us, ip : ip, ho : ho},
     success: function(data) {
		   var temp=data.split("/");
		   	$('#info').html(temp[0]);		  		  
			$('#wait').val(temp[1]);
			if(temp[1]=='Complete') 
			$('#combat').fadeIn("slow");
     		else $('#combat').fadeOut("slow");
     }
   });} catch (e) {$('#result').html('Load information failure');}
}		
function loadfarm()
{
	try{
    $.ajax({
     type: "POST",
     url:'loadfarm.php',
     data: {id : id, us : us ,ip : ip, ho : ho},
     success: function(data) {
		 var mang= data.split("!^!");
		 if(mang[0]!='')
         $('#farm').html('<option value="0">All Farm Food</option>'+mang[0]);
		  if(mang[1]!='')
          $('#egid').html(mang[1]);
		  else $('#egid').html('<option>Egg on Hatchry</option>');
		  if(mang[2]!='')
          $('#hsid').html(mang[2]);
		  else $('#hsid').html('<option>Items in Stogare</option>');
		  if(mang[3]!='')
         $('#regg').html(mang[3]);
		 else $('#regg').html('<option>Breeding Result</option>');
		  if(mang[4]!='')
         $('#dsid').html(mang[4]);
		 else $('#dsid').html('<option>Dragon in Stogare</option>');
		 if(mang[5]!='')
		  $('#diid').html(mang[5]);
		  else $('#diid').html('<option>Dragon on Island</option>');	
		  if(mang[6]!='')
         $('#deus').html(mang[6]);
		 else $('#deus').html('<option>Deus vault</option>');	
     }
   });} catch (e) {$('#result').html('Load dragon failure');}
}	
function choosedragon(c)
{   
	$('#dragons').css('z-index',300);
	$('#dragon').html($('#diid').html());
	vtc=c;$('#dragons').fadeIn("slow");
}
function choosehabitat(c)
{   
	$('#items').css('z-index',300);
	$('#item').html($('#hiid').html());
	vtc=c;$('#items').fadeIn("slow");
}
function chondragon()
{   
	$('#idd'+vtc).val($('#dragon').val());
	$('#dragons').css('z-index',100);
	$('#dragons').fadeOut("slow");
}
function chonitem()
{   
	$('#chid'+vtc).val($('#item').val());
	$('#items').css('z-index',100);
	$('#items').fadeOut("slow");
}
function loaditems()
{
	try{
   $.ajax({
     type: "POST",
     url:'loaditems.php',
     data: {id : id, us : us ,ip : ip, ho : ho},
     success: function(data) {
		 var i,temp, str='', str1='<option selected value="0">All Items</option>';
		 var arr = [], k=0;
		 mang= data.split("/");
		 if(mang!='')
		  {
			  for (i = 0; i < mang.length - 1; i++)
		 	  {	 
			  		temp=mang[i].split(",");
			  		str+='<option value="'+temp[1]+'">'+temp[0]+' - '+temp[1]+' - '+temp[2]+' - '+temp[3]+'</option>';
				 if(!in_array(temp[4], arr))
				 { 					 
					 arr[k++]=temp[4]; 
					 str1+='<option value="'+temp[4]+'">'+temp[0]+'</option>';
				}
			 }	}
			else 
			{
				str='<option>Items On Island</option>';	
			}	
          $('#hiid').html(str);
		  $('#slid').html(str1);
     }
   });} catch (e) {$('#result').html('Load items on island failure');}
}
function changelist()
{	var str='';
if(mang!='')
	for (var i = 0; i < mang.length - 1; i++)
		 	 {	 
				 temp=mang[i].split(",");
				 if($('#slid').val()!=0){
				 if(temp[4]==$('#slid').val())
				 str+='<option value="'+temp[1]+'">'+temp[0]+' - '+temp[1]+' - '+temp[2]+' - '+temp[3]+'</option>';}
				 else str+='<option value="'+temp[1]+'">'+temp[0]+' - '+temp[1]+' - '+temp[2]+' - '+temp[3]+'</option>';
			 }	else str='<option>Items On Island</option>';	
	 $('#hiid').html(str);
}
function in_array(vl, arr){
	    var pos = false;
	    for(var i = 0; i < arr.length; i++){
	        if(vl == arr[i]){
	            pos = true;
	            break;
	        }
	    }
	    return pos;
}
</script>Chào các bạn đến với tool, tool sẽ giúp các bạn chơi dragon city tốt hơn<br><a target="_blank" href='http://www.datagame.tk/huongdan'>Đọc kỹ hướng dẩn ở đây trước khi sử dụng tool</a> - <a href="http://www.datagame.tk/getsession">Cách lấy id với session</a><div style="position:absolute;padding-left:530px;margin-top:20px;">
<embed src="http://s10.histats.com/408.swf"  flashvars="jver=1&acsid=2537991&domi=4"  quality="high" width="270" height="55" name="408.swf"  align="middle" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" wmode="transparent" />
<img  src="http://sstatic1.histats.com/0.gif?2537991&101" alt="counters" border="0"></div><div style="margin-top:5px;"><script type='text/javascript'>var uid = '6941';var wid = '12507';</script>
<script type='text/javascript' src='http://cdn.popcash.net/pop.js'></script><script language='javascript' charset='UTF-8' type='text/javascript' src='http://quangcao.frogit08.com/7ecx9x5gro96h1qk1bhvdgu1ssrzot1'></script><iframe style="background:#FFF" src="http://yllix.com/banner_show.php?section=General&amp;pub=323552&amp;format=468x60&amp;ga=g" frameborder="0" scrolling="no" width="468" height="60" marginwidth="0" marginheight="0"></iframe></div></div>
ID: <input id='idfb' value="1433151600" style="width:135px"/>
Session: <input value="43236451" id='user' style="width:85px"/><br>
<input id="checkid" style="width:300px" type="button" onclick="formload()" value="Load Dragon City Information" /><br>
<script type="text/javascript">formload();</script>List Items: <select id="hatid"><option value="1">Hatchery - 1 - 25gem</option><option value="2">Nature Crystal - 2 - 250000gold</option><option value="3">Terra Crystal - 3 - 250000gold</option><option value="4">Flame Crystal - 4 - 250000gold</option><option value="5">Ice Crystal - 5 - 250000gold</option><option value="6">Electric Crystal - 6 - 250000gold</option><option value="7">Sea Crystal - 7 - 250000gold</option><option value="8">Dark Crystal - 8 - 250000gold</option><option value="9">Magic Temple - 9 - 500000gold</option><option value="10">Noble Temple - 10 - 1500000gold</option><option value="11">Knight Temple - 11 - 5000000gold</option><option value="12">Master Temple - 12 - 25gem</option><option value="14">Legend Crystal - 14 - 250000gold</option><option value="15">Metal Crystal - 15 - 250000gold</option><option value="16">Food Farm - 16 - 100gold</option><option value="17">Big Food Farm - 17 - 25000gold</option><option value="18">Huge Food Farm - 18 - 500000gold</option><option value="19">Breeding Mountain - 19 - 500gold</option><option value="20">Stadium - 20 - 25000gold</option><option value="21">Deus Statue - 21 - 2500000gold</option><option value="22">Training Center - 22 - 500000gold</option><option value="24">Nature Habitat - 24 - 15000gold</option><option value="25">Big Nature Habitat - 25 - 125000gold</option><option value="26">Terra Habitat - 26 - 100gold</option><option value="27">Big Terra Habitat - 27 - 25000gold</option><option value="28">Flame Habitat - 28 - 150gold</option><option value="29">Big Flame Habitat - 29 - 50000gold</option><option value="30">Sea Habitat - 30 - 500gold</option><option value="31">Big Sea Habitat - 31 - 100000gold</option><option value="32">Ice Habitat - 32 - 75000gold</option><option value="33">Big Ice Habitat - 33 - 1000000gold</option><option value="34">Electric Habitat - 34 - 30000gold</option><option value="35">Big Electric Habitat - 35 - 250000gold</option><option value="36">Metal Habitat - 36 - 100000gold</option><option value="37">Big Metal Habitat - 37 - 2000000gold</option><option value="38">Dark Habitat - 38 - 500000gold</option><option value="39">Big Dark Habitat - 39 - 3000000gold</option><option value="40">Legend Habitat - 40 - 40000000gold</option><option value="45">Rock - 45 - 500gold</option><option value="46">Medium Rock - 46 - 5000gold</option><option value="47">Big Rock - 47 - 15000gold</option><option value="48">Bush - 48 - 25gold</option><option value="49">Medium Tree - 49 - 100gold</option><option value="50">Big Tree - 50 - 1000gold</option><option value="54">Terrain - 54 - 30gold</option><option value="55">Hatchery 2 - 55 - 15gem</option><option value="56">Hatchery 3 - 56 - 25gem</option><option value="57">Hatchery 4 - 57 - 25gem</option><option value="58">Elf home - 58 - 1500gold</option><option value="59">Fountain - 59 - 200000gold</option><option value="60">Magic Mushroom - 60 - 500gold</option><option value="61">Glowy Flower - 61 - 5000gold</option><option value="62">Cateye Flower - 62 - 1000gold</option><option value="63">Blue Snail Plant - 63 - 25000gold</option><option value="64">Purple Snail Plant - 64 - 10000gold</option><option value="65">Chinese Arch - 65 - 25000gold</option><option value="66">Little Dragon Statue - 66 - 20gem</option><option value="67">Dragon Statue - 67 - 15gem</option><option value="68">Old Pond - 68 - 5000gold</option><option value="69">Willow Tree - 69 - 10gem</option><option value="72">Stone tile - 72 - 100gold</option><option value="73">Fancy tile - 73 - 500gold</option><option value="74">Luxury tile - 74 - 1000gold</option><option value="75">Super tile - 75 - 5000gold</option><option value="76">Huge Rock - 76 - 75000gold</option><option value="77">Giant Rock - 77 - 150000gold</option><option value="79">Dragon Market - 79 - 1000gold</option><option value="80">Ultra Breeding Tree - 80 - 25gem</option><option value="81">Recruitment Tavern - 81 - 1000gold</option><option value="82">Ying yang flag - 82 - 15000gold</option><option value="83">Dragonhead flag - 83 - 7500gold</option><option value="84">Dragon flag - 84 - 250gold</option><option value="85">Cloud flag - 85 - 2500gold</option><option value="86">Egg flag - 86 - 30000gold</option><option value="87">Tower flag - 87 - 50000gold</option><option value="88">Dragon Hedge - 88 - 500000gold</option><option value="89">Luxury Egg Statue - 89 - 1000000gold</option><option value="90">Kindergarten - 90 - 30000gold</option><option value="101">Snail Wizard - 101 - Free</option><option value="102">Lost Baby Elf - 102 - Free</option><option value="103">Lost Baby Unicorn - 103 - Free</option><option value="104">Gold Tree - 104 - Free</option><option value="105">Play Social Empires - 105 - Free</option><option value="106">Play Social Wars - 106 - Free</option><option value="110">Pure Habitat - 110 - 30000000gold</option><option value="111">Pure Habitat - 111 - 30000000gold</option><option value="112">Pure Habitat - 112 - 30000000gold</option><option value="113">Pure Habitat - 113 - 30000000gold</option><option value="114">Pure Habitat - 114 - 30000000gold</option><option value="115">Pure Habitat - 115 - 30000000gold</option><option value="116">Pure Habitat - 116 - 30000000gold</option><option value="117">Pure Habitat - 117 - 30000000gold</option><option value="118">Pure Habitat - 118 - 30000000gold</option><option value="119">Dragon Club Statue - 119 - 25gem</option><option value="120">Breeding boost - 120 - 10gem</option><option value="121">Uncle Sam Dragon Wants You! - 121 - Free</option><option value="122">Merry Xmas Island - 122 - Free</option><option value="124">Xmas Tree - 124 - 15gem</option><option value="125">Santa Habitat - 125 - 2500000gold</option><option value="126">Treasure Hunt Island - 126 - Free</option><option value="127">Pirate Island - 127 - Free</option><option value="128">Deus Vault - 128 - 500000gold</option><option value="129">Dinosaur Island - 129 - Free</option><option value="130">Dragonarium - 130 - 100000gold</option><option value="131">Alien Island - 131 - Free</option><option value="132">Play Dragon City Mobile! - 132 - Free</option><option value="133">Dinosaur Island - 133 - Free</option><option value="134">Egyptian Habitat - 134 - 250000gold</option><option value="135">Egyptian Island - 135 - Free</option><option value="136">Central Island iphone 2 - 136 - Free</option><option value="137">Ankh - 137 - Free</option><option value="138">Dungeon Base - 138 - Free</option><option value="139">Dungeon Habitat - 139 - 250000gold</option><option value="140">Light Habitat - 140 - 16000000gold</option><option value="141">Big Light Habitat - 141 - 24000000gold</option><option value="142">War Habitat - 142 - 22000000gold</option><option value="143">Big War Habitat - 143 - 30000000gold</option><option value="144">Ancient Habitat - 144 - 2000000gold</option><option value="145">Big Ancient Habitat - 145 - 12000000gold</option><option value="146">Dungeon Island  - 146 - Free</option><option value="147">Dungeon key - 147 - Free</option><option value="148">Olympus Island  - 148 - Free</option><option value="149">Greek vase - 149 - Free</option><option value="150">Olympus Habitat - 150 - 250000gold</option><option value="151">Play Monster Legends - 151 - Free</option><option value="152">Play DCa - 152 - Free</option><option value="153">Big Pure Habitat - 153 - 38000000gold</option><option value="154">Small Mistery Egg - 154 - Free</option><option value="155">Medium Mistery Egg - 155 - Free</option><option value="156">Large Mistery Egg - 156 - Free</option><option value="157">Super Mistery Egg - 157 - Free</option><option value="158">Viking Island - 158 - Free</option><option value="159">Viking Habitat - 159 - 30000000gold</option><option value="160">Deus Breeding Nest - 160 - 25gem</option><option value="161">Castle Island - 161 - Free</option><option value="162">Deus Breeding Nest - 162 - 0gold</option><option value="2000">Zeppelin - 2000 - 25000gold</option><option value="5000">St Patrick - 5000 - 25000gold</option><option value="5001">April Fools' - 5001 - 25000gold</option><option value="163">Aztec Island  - 163 - Free</option><option value="164">Aztec Habitat - 164 - 30000000gold</option><option value="165">Egyptian Island - 165 - Free</option><option value="166">Epic Temple - 166 - 25gem</option><option value="167">Wonders Temple - 167 - 25gem</option><option value="168">Halloween Island - 168 - Free</option><option value="170">Christmas Island - 170 - Free</option><option selected="selected" value="169">Wonderland Island - 169 - Free</option></select>
<input onclick="buydragon(1)" type="button" value="Buy" />Team combat:
<input id='idd4' value="Choose dragon" onclick="choosedragon(4)" type="button" />
<input id='setteam' onclick="setteam()" type="button" value="Set" /><br>
List Dragon: <select id="eggid"><option value="1000">Nature Dragon - 1000 - 15000gold</option><option value="1001">Firebird Dragon - 1001 - 25gem</option><option value="1002">Mercury Dragon - 1002 - 25gem</option><option value="1003">Gummy Dragon - 1003 - 25gem</option><option value="1004">Lantern Fish Dragon - 1004 - 25gem</option><option value="1005">Tropical Dragon - 1005 - 25gem</option><option value="1006">Zombie Dragon - 1006 - 25gem</option><option value="1007">Petroleum Dragon - 1007 - 25gem</option><option value="1008">Dandelion Dragon - 1008 - 25gem</option><option value="1009">Jade Dragon - 1009 - 25gem</option><option value="1010">Star Dragon - 1010 - 25gem</option><option value="1011">Terra Dragon - 1011 - 100gold</option><option value="1012">Flaming rock Dragon - 1012 - 25gem</option><option value="1013">Armadillo Dragon - 1013 - 25gem</option><option value="1014">Cloud Dragon - 1014 - 25gem</option><option value="1015">Laser Dragon - 1015 - 25gem</option><option value="1016">Mud Dragon - 1016 - 25gem</option><option value="1017">Nenufar Dragon - 1017 - 25gem</option><option value="1018">Hedgehog Dragon - 1018 - 25gem</option><option value="1019">Icecube Dragon - 1019 - 25gem</option><option value="1020">Flame Dragon - 1020 - 100gold</option><option value="1021">Neon Dragon - 1021 - 25gem</option><option value="1022">Pearl Dragon - 1022 - 25gem</option><option value="1023">Cool Fire Dragon - 1023 - 25gem</option><option value="1024">Medieval Dragon - 1024 - 25gem</option><option value="1025">Penguin Dragon - 1025 - 25gem</option><option value="1026">Ice Dragon - 1026 - 75000gold</option><option value="1028">Carnivore Plant Dragon - 1028 - 25gem</option><option value="1029">Fluorescent Dragon - 1029 - 25gem</option><option value="1031">Electric Dragon - 1031 - 30000gold</option><option value="1032">Battery Dragon - 1032 - 25gem</option><option value="1033">Sea Dragon - 1033 - 500gold</option><option value="1039">Metal Dragon - 1039 - 250000gold</option><option value="1040">Dark Dragon - 1040 - 500000gold</option><option value="1041">Legendary Dragon - 1041 - 25gem</option><option value="1042">Vampire Dragon - 1042 - 25gem</option><option value="1043">Alpine Dragon - 1043 - 25gem</option><option value="1044">Poo Dragon - 1044 - 25gem</option><option value="1045">Volcano Dragon - 1045 - 25gem</option><option value="1046">Blizzard Dragon - 1046 - 25gem</option><option value="1047">Rattlesnake Dragon - 1047 - 25gem</option><option value="1048">Gold Dragon - 1048 - 25gem</option><option value="1049">Soccer Dragon - 1049 - 25gem</option><option value="1050">Platinum Dragon - 1050 - 25gem</option><option value="1051">Pirate Dragon - 1051 - 25gem</option><option value="1052">Crystal Dragon - 1052 - 25gem</option><option value="1053">Wind Dragon - 1053 - 25gem</option><option value="1054">Mirror Dragon - 1054 - 25gem</option><option value="1055">Coral Dragon - 1055 - 25gem</option><option value="1056">Spicy Dragon - 1056 - 25gem</option><option value="1057">Waterfall Dragon - 1057 - 25gem</option><option value="1058">Cactus Dragon - 1058 - 25gem</option><option value="1059">Storm Dragon - 1059 - 25gem</option><option value="1060">Ice Cream Dragon - 1060 - 25gem</option><option value="1061">Mojito Dragon - 1061 - 25gem</option><option value="1062">Chameleon Dragon - 1062 - 25gem</option><option value="1063">Hot Metal Dragon - 1063 - 25gem</option><option value="1064">Snowflake Dragon - 1064 - 25gem</option><option value="1065">Seashell Dragon - 1065 - 25gem</option><option value="1066">Moose Dragon - 1066 - 25gem</option><option value="1067">Dragonfly Dragon - 1067 - 25gem</option>option value="1068">Venom Dragon - 1068 - 25gem</option><option value="1069">Steampunk Dragon - 1069 - 25gem</option><option value="1070">Dark Fire Dragon - 1070 - 25gem</option><option value="1071">Butterfly Dragon - 1071 - 0gold</option><option value="1072">Robot Dragon - 1072 - 0gold</option><option value="1073">Pure Terra Dragon - 1073 - 25gem</option><option value="1074">Pure Flame Dragon - 1074 - 25gem</option><option value="1075">Pure Sea Dragon - 1075 - 25gem</option><option value="1076">Pure Nature Dragon - 1076 - 25gem</option><option value="1077">Pure Electric Dragon - 1077 - 25gem</option><option value="1078">Pure Ice Dragon - 1078 - 25gem</option><option value="1079">Pure Metal Dragon - 1079 - 25gem</option><option value="1080">Pure Dark Dragon - 1080 - 25gem</option><option value="1081">Pure Dragon - 1081 - 15000000gold</option><option value="1082">Paladin Dragon - 1082 - 0gold</option><option value="1083">Fossil Dragon - 1083 - 0gold</option><option value="1084">Seahorse Dragon - 1084 - 25gem</option><option value="1085">Sky Dragon - 1085 - 25gem</option><option value="1086">Bat Dragon - 1086 - 25gem</option><option value="1087">Aztec Dragon - 1087 - 25gem</option><option value="1088">Chinese Dragon - 1088 - 25gem</option><option value="1089">King Dragon - 1089 - 25gem</option><option value="1090">Wizard Dragon - 1090 - 25gem</option><option value="1091">Two headed Dragon - 1091 - 25gem</option><option value="1092">Plankton Dragon - 1092 - 25gem</option><option value="1093">Uncle Sam Dragon - 1093 - 25gem</option><option value="1094">Evil Pumpkin Dragon - 1094 - 25gem</option><option value="1095">Viking Dragon - 1095 - 25gem</option><option value="1096">Jelly Dragon - 1096 - 25gem</option><option value="1097">Quetzal Dragon - 1097 - 25gem</option><option value="1098">Queen Dragon - 1098 - 25gem</option><option value="1099">Thanksgiving Dragon - 1099 - 25gem</option><option value="1100">Santa Dragon - 1100 - 25gem</option><option value="1101">Ghost Dragon - 1101 - 25gem</option><option value="1102">Deep Forest Dragon - 1102 - 25gem</option><option value="1103">Ninja Dragon - 1103 - 25gem</option><option value="1104">Ice&Fire Dragon - 1104 - 25gem</option><option value="1105">Aurora Dragon - 1105 - 25gem</option><option value="1106">Music Dragon - 1106 - 25gem</option><option value="1107">Block Dragon - 1107 - 25gem</option><option value="1108">Butterfly Dragon - 1108 - 0gold</option><option value="1109">Alien Dragon - 1109 - 25gem</option><option value="1110">Great White Dragon - 1110 - 25gem</option><option value="1111">Pharaoh Dragon - 1111 - 25gem</option><option value="1112">Paradise Dragon - 1112 - 25gem</option><option value="1113">Gaudi Dragon - 1113 - 25gem</option><option value="1114">Cool Fire Dragon - 1114 - 25gem</option><option value="1115">Octopus Dragon - 1115 - 25gem</option><option value="1116">Jellyfish Dragon - 1116 - 25gem</option><option value="1117">Carnival Dragon - 1117 - 25gem</option><option value="1118">Love Dragon - 1118 - 25gem</option><option value="1119">Dujur Dragon - 1119 - 25gem</option><option value="1120">T-Rex Dragon - 1120 - 25gem</option><option value="1121">Brontosaurus Dragon - 1121 - 25gem</option><option value="1122">Hydra Dragon - 1122 - 25gem</option><option value="1123">Mars Dragon - 1123 - 25gem</option><option value="1124">Prisma Dragon - 1124 - 25gem</option><option value="1125">Centipede Dragon - 1125 - 25gem</option><option value="1126">Emerald Dragon - 1126 - 25gem</option><option value="1127">St Patrick's Dragon - 1127 - 25gem</option><option value="1128">Ruby Dragon - 1128 - 25gem</option><option value="1129">Angry Dragon - 1129 - 25gem</option><option value="1130">Lava Dragon - 1130 - 25gem</option><option value="1131">Joker Dragon - 1131 - 25gem</option><option value="1132">Chainmail Dragon - 1132 - 25gem</option><option value="1133">Sphynx Dragon - 1133 - 25gem</option><option value="1134">Mummy Dragon - 1134 - 25gem</option><option value="1135">Diamond Dragon - 1135 - 25gem</option><option value="1136">Demon Dragon - 1136 - 25gem</option><option value="1137">Gargoyle Dragon - 1137 - 25gem</option><option value="1138">Deep Red Dragon - 1138 - 25gem</option><option value="1139">Blue Dragon - 1139 - 25gem</option><option value="1140">Archangel Dragon - 1140 - 8000000gold</option><option value="1141">Lightning Dragon - 1141 - 25gem</option><option value="1142">Ancient Dragon - 1142 - 25gem</option><option value="1143">Wurm Dragon - 1143 - 25gem</option><option value="1144">Light Dragon Test - 1144 - 15000gold</option><option value="1145">War Dragon Test - 1145 - 15000gold</option><option value="1146">Eternal Dragon Test - 1146 - 15000gold</option><option value="1147">Glacial Dragon - 1147 - 25gem</option><option value="1148">Cerberus Dragon - 1148 - 25gem</option><option value="1149">Burning Dragon - 1149 - 25gem</option><option value="1150">Treasure Dragon - 1150 - 25gem</option><option value="1151">Granite Dragon - 1151 - 25gem</option><option value="1152">Bone Dragon - 1152 - 25gem</option><option value="1153">Wyvern Dragon - 1153 - 25gem</option><option value="1154">Predator Dragon - 1154 - 25gem</option><option value="1155">Poseidon Dragon - 1155 - 25gem</option><option value="1156">Hades Dragon - 1156 - 25gem</option><option value="1157">Atlas Dragon - 1157 - 25gem</option><option value="1158">Justice Dragon - 1158 - 25gem</option><option value="1159">Sun Dragon - 1159 - 25gem</option><option value="1160">Gaia Dragon - 1160 - 25gem</option><option value="1161">Luminsicent Dragon - 1161 - 25gem</option><option value="1162">Rainbow Dragon - 1162 - 25gem</option><option value="1163">War Dragon - 1163 - 11000000gold</option><option value="1164">Juggernaut Dragon - 1164 - 25gem</option><option value="1165">Colossal Dragon - 1165 - 25gem</option><option value="1166">Red Woods Dragon - 1166 - 25gem</option><option value="1167">Leviathan Dragon - 1167 - 25gem</option><option value="1168">Panzer Dragon - 1168 - 25gem</option><option value="1169">Nirobi - 1169 - 25gem</option><option value="1170">Droconos - 1170 - 25gem</option><option value="1171">Monstruous Dragon - 1171 - 0gem</option><option value="1172">Ivory Dragon - 1172 - 25gem</option><option value="1173">Moon Dragon - 1173 - 25gem</option><option value="1174">Toxic Dragon - 1174 - 25gem</option><option value="1175">Obsidian Dragon - 1175 - 25gem</option><option value="1176">Meteor Dragon - 1176 - 25gem</option><option value="1177">Hammer Dragon - 1177 - 25gem</option><option value="1178">Tribal Dragon - 1178 - 25gem</option><option value="1179">Origami Dragon - 1179 - 25gem</option><option value="1180">Tiny Dragon - 1180 - 25gem</option><option value="1182">Thor Dragon - 1182 - 25gem</option><option value="1183">Loki Dragon - 1183 - 25gem</option><option value="1184">Odin Dragon - 1184 - 25gem</option><option value="1187">Photon Dragon - 1187 - 25gem</option><option value="1190">Tesla Dragon - 1190 - 25gem</option><option value="1196">Thief Dragon - 1196 - 25gem</option><option value="1197">Deus Pet Dragon - 1197 - 25gem</option><option value="1194">White Knight Dragon - 1194 - 25gem</option><option value="1195">Black Knight Dragon - 1195 - 25gem</option><option value="1211">Wrestler Dragon - 1211 - 25gem</option><option value="1224">Eclipse Dragon - 1224 - 25gem</option><option value="1231">Aztec Warrior Dragon - 1231 - 25gem</option><option value="1232">Aztec Priest Dragon - 1232 - 25gem</option><option value="1233">Aztec Emperor Dragon - 1233 - 25gem</option><option value="1225">Specter Dragon - 1225 - 25gem</option><option value="1269">Peace Dragon - 1269 - 25gem</option><option value="1229">Frozen Wind Dragon - 1229 - 25gem</option><option value="1284">Bavarian Dragon - 1284 - 25gem</option><option value="1268">Amethyst Dragon - 1268 - 25gem</option><option value="1283">Columbus Dragon - 1283 - 25gem</option><option value="1267">Giant Wings Dragon - 1267 - 25gem</option><option value="1286">Frankie Dragon - 1286 - 25gem</option><option value="1287">Halloween Dragon - 1287 - 25gem</option><option value="1201">Blue Fire Dragon - 1201 - 25gem</option><option value="1227">Crossfire Dragon - 1227 - 25gem</option><option value="1294">Quartz Dragon - 1294 - 25gem</option><option value="1295">Dark Elf Dragon - 1295 - 25gem</option><option value="1265">Elements Dragon - 1265 - 25gem</option><option value="1199">Kryptonite Dragon - 1199 - 25gem</option><option value="1263">Blind Dragon - 1263 - 25gem</option><option value="1202">Hypno Dragon - 1202 - 25gem</option><option value="1226">Cat Dragon - 1226 - 25gem</option><option value="1209">Scrooge Dragon - 1209 - 25gem</option><option value="1212">Clover Dragon - 1212 - 25gem</option><option value="1260">Chobby Dragon - 1260 - 25gem</option><option value="1264">Cookie Dragon - 1264 - 25gem</option><option value="1297">Snow Man Dragon - 1297 - 25gem</option><option value="1298">Xmas Elf Dragon - 1298 - 25gem</option><option value="1300">Middle Earth Dragon - 1300 - 25gem</option><option value="1207">Rockfeller Dragon - 1207 - 25gem</option><option value="1208">King Solomon Dragon - 1208 - 25gem</option><option value="1210">Robin Hood Dragon - 1210 - 25gem</option><option value="1214">Poker Dragon - 1214 - 25gem</option><option value="1282">Cosmo Dragon - 1282 - 25gem</option><option value="1288">Animation Dragon - 1288 - 25gem</option><option value="1198">Midas Dragon - 1198 - 25gem</option><option value="1223">Chimera Dragon - 1223 - 25gem</option><option value="1292">Hearts Queen Dragon - 1292 - 25gem</option><option selected="selected" value="1293">Big Hat Dragon - 1293 - 25gem</option></select>
<input onclick="buydragon(2)" type="button" value="Buy" />
Bug item: <select id="bugid"><option value="19">Breeding Mountain</option><option value="22">Training Center</option><option value="90">Kindergarten</option><option value="79">Dragon Market</option><option value="2">Nature Crystal</option><option value="3">Terra Crystal</option><option value="4">Flame Crystal</option><option value="5">Ice Crystal</option><option value="6">Electric Crystal</option><option value="7">Sea Crystal</option><option value="8">Dark Crystal</option><option value="14">Legend Crystal</option></select>
<input onclick="bugvatpham()" type="button" value="Bug" /><br>
Items On Island: <select id="hiid"><option>Items On Island</option></select>
<select id="slid" onchange="changelist()"><option>All Items</option></select>
<input onclick="movehabitat(1)" type="button" value="Move" />
<input onclick="sellhabitat(1)" type="button" value="Sell" />
<input onclick="storehabitat(1)" type="button" value="Store" />
<input onclick="catvatpham()" type="button" value="Srote of kind" /><br>
Items In Stogare: <select id="hsid"><option>Items In Stogare</option></select>
<input onclick="sellhabitat(2)" type="button" value="Sell" />
<input onclick="sellall('sitem')" type="button" value="Sell 100 item" />
<input onclick="movehabitat(2)" type="button" value="Use" />
Coordinates X: <select id="mx"><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option><option value="60">60</option><option value="61">61</option><option value="62">62</option><option value="63">63</option><option value="64">64</option><option value="65">65</option><option value="66">66</option><option value="67">67</option><option value="68">68</option><option value="69">69</option><option value="70">70</option><option value="71">71</option><option value="72">72</option><option value="73">73</option><option value="74">74</option><option value="75">75</option><option value="76">76</option><option value="77">77</option><option value="78">78</option><option value="79">79</option><option value="80">80</option><option value="81">81</option><option value="82">82</option><option value="83">83</option><option value="84">84</option><option value="85">85</option><option value="86">86</option><option value="87">87</option><option value="88">88</option><option value="89">89</option><option value="90">90</option><option value="91">91</option><option value="92">92</option><option value="93">93</option><option value="94">94</option><option value="95">95</option><option value="96">96</option><option value="97">97</option><option value="98">98</option><option value="99">99</option><option value="100">100</option><option value="101">101</option><option value="102">102</option><option value="103">103</option><option value="104">104</option><option value="105">105</option><option value="106">106</option><option value="107">107</option><option value="108">108</option><option value="109">109</option><option value="110">110</option><option value="111">111</option><option value="112">112</option><option value="113">113</option><option value="114">114</option><option value="115">115</option><option value="116">116</option><option value="117">117</option><option value="118">118</option><option value="119">119</option><option value="120">120</option><option value="121">121</option><option value="122">122</option><option value="123">123</option><option value="124">124</option><option value="125">125</option><option value="126">126</option><option value="127">127</option><option value="128">128</option><option value="129">129</option><option value="130">130</option><option value="131">131</option><option value="132">132</option><option value="133">133</option><option value="134">134</option><option value="135">135</option><option value="136">136</option><option value="137">137</option><option value="138">138</option><option value="139">139</option><option value="140">140</option><option value="141">141</option><option value="142">142</option><option value="143">143</option><option value="144">144</option><option value="145">145</option></select>
Y: <select id="my"><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option><option value="60">60</option><option value="61">61</option><option value="62">62</option><option value="63">63</option><option value="64">64</option><option value="65">65</option><option value="66">66</option><option value="67">67</option><option value="68">68</option><option value="69">69</option><option value="70">70</option><option value="71">71</option><option value="72">72</option><option value="73">73</option><option value="74">74</option><option value="75">75</option><option value="76">76</option><option value="77">77</option><option value="78">78</option><option value="79">79</option><option value="80">80</option><option value="81">81</option><option value="82">82</option><option value="83">83</option><option value="84">84</option><option value="85">85</option><option value="86">86</option><option value="87">87</option><option value="88">88</option><option value="89">89</option><option value="90">90</option><option value="91">91</option><option value="92">92</option><option value="93">93</option><option value="94">94</option><option value="95">95</option></select><br>
Dragon On Island: <select id="diid"><option>All Dragons</option></select>
<input onclick="selldragon(1)" type="button" value="Sell" />
<input onclick="storehabitat(2)" type="button" value="Store" /><input onclick="feeddragon()" type="button" value="Feed" />
<input id='rename' onclick="if(this.value=='Rename'){renamedragon();}else{this.value='Rename';$('#name').fadeIn('slow');}" type="button" value="Rename dragon" />
<input style="width:140px;display:none" id='name'/><br>
Dragon In Stogare: <select id="dsid"><option>Dragon In Stogare</option></select>
<input onclick="selldragon(2)" type="button" value="Sell" /><input onclick="sellall('sdragon')" type="button" value="Sell 100 dragon" />
<input onclick="choosehabitat('s')" type="button" id='chids' value="Choose habitat" />
<input onclick="movedragon(2)" type="button" value="Use" /><br>
Move dragon: <input type="button" onclick="choosedragon(0)" id='idd0' value="Choose dragon" />
<input onclick="choosehabitat('m')" type="button" id='chidm' value="Choose habitat" />
<input onclick="movedragon(1)" type="button" value="Move" />
Deus Vault: <select id="deus"><option>Formula Dragon</option></select>
<input onclick="formula()" type="button" value="Buy formula" /><br>
Egg On Hatchery: <select id="egid"><option>Egg On Hatchery</option></select>
<input onclick="selldragon(3)" type="button" value="Sell" /><input onclick="sellall('egg')" type="button" value="Sell 100 egg" />
<input id='chidh' onclick="choosehabitat('h')" type="button" value="Choose habitat" />
<input onclick="hatchdragon()" type="button" value="Hatch draron" /><br>
Breed Dragon: <input id='idd1' value="Choose dragon" onclick="choosedragon(1)" type="button" /> 
<input onclick="choosedragon(2)" type="button" id='idd2' value="Choose dragon" />
<input onclick="choosehabitat('b')" type="button" id='chidb' value="Choose breeding" />
<input id="breed" value="Breed dragon" onclick="dragonbreed()" type="button" />
<input id="xoaloi" onclick="xoaloi()" type="button" value="Remove item error" /><br />
Result Breeding: <select id="regg"><option>Result Breeding</option></select>
<input onclick="choosehabitat('a')" type="button" id='chida' value="Choose hatchery" />
<input onclick="collectegg()" type="button" value="Collect egg" />
<input onclick="$('#thongbao').css('display','none');" type="button" value="Turn off notification"/>
<input id="monday" value="500gem sunday" onclick="sunday()" type="button" /><br>
Food Farm: <select id="farm"><option value="0">All Food Farm</option></select>
<select id="sfood"><option value="1">30sec</option><option value="2">5min</option><option value="3">30min</option><option value="4">2h</option><option value="5">6h</option><option value="6">12h</option><option value="7">1day</option><option value="8">1day12h</option><option value="9">2day</option></select>
<input id='grow' value="Grow food" onclick="growfood()" type="button" />
Free Dragon: <select id="free"><option value="0">GraniteDragon</option><option value="1">WurmDragon</option><option value="2">Lightningdragon</option><option value="3">GlacialDragon</option><option value="4">ChainmailDragon</option><option value="5">BlueDragon</option><option value="6">TreasureDragon</option><option value="7">BoneDragon</option><option value="8">GargoyleDragon</option><option value="9">BurningDragon</option><option value="10">UncleSamDragon</option><option value="11">VikingDragon</option><option value="1082">PaladinDragon</option><option value="1083">FossilDragon</option><option value="1071">ButterflyDragon</option><option value="1072">RobotDragon</option><option value="1171">MonstruousDragon</option></select>
<input onclick="freedragon()" type="button" value="Get dragon" /><br>
Time Stadium: <input id='wait' readonly="readonly" style="width:100px;"/>
<input id='idd3' value="Choose dragon" onclick="choosedragon(3)" type="button" />
<input id="combat" onclick="combat()" type="button" value="Combat" />
Combat Word: <input id='idd5' value="Choose dragon" onclick="choosedragon(5)" type="button" />
<input id="word" onclick="cword()" type="button" value="Combat" /><br>
Offer: <select id="offer"><option value="1">30gem = 2000g 5000f DragonStatue MedievalDragon</option><option value="2">25gem = 20000g 10000f ChameleonDragon</option><option value="3">50gem = 200000g 22500f DeusBreedingNest DeusPetDragon</option></select>
<input onclick="muaoffer()" type="button" value="Buy" />
Island: <select id="dao"><option value="2">2</option><option value="3">3</option><option value="4">
4</option><option value="5">5</option><option value="6">6</option></select>
<input onclick="modao()" type="button" value="Open by gold" />
<div id='loadskill'>Learn new skill for dragon: <input onclick="loadskill()" type="button" value="Load skill" />
<select id="nskill"><option value="0">Skill of dragon</option></select>
<select id="lskill"><option value="0">Skill will learn</option></select>
<input  onclick="hocskill()" type="button" value="Learn skill" /></div>
Expand: <input id="getgold" value="Get gold" onclick="getgold()" type="button" />
<input id="getfood" value="Get food" onclick="getfood()" type="button" />
<input id="getexp" value="Gold to exp" onclick="goldtoexp()" type="button" />
Event: <select id="event"><option value="450,56">DAILY_BONUS</option><option value="451,56">FOOD</option><option value="452,56">MINI_GAME</option><option value="453,56">NEW_FRIENDS</option><option value="454,56">BREEDING</option><option value="455,56">TOURNAMENT</option></select>
<input onclick="getitem()" type="button" value="Get item" /></div>
<div id="dragons" style="width:800;height:600;position:absolute;z-index:100;display:none;">
<div style="background-color:#00F;text-align:center;margin-top:180px;">
<select id="dragon"><option>All Dragons</option></select><input onclick="chondragon()" type="button" value="Ok"/></div></div>
<div id="items" style="width:800;height:600;position:absolute;z-index:100;display:none;">
<div style="background-color:#00F;text-align:center;margin-top:180px;">
<select id="item"><option>All Items</option></select><input onclick="chonitem()" type="button" value="Ok"/></div></div>
<div id="xuly" style="width:800;height:600;position:absolute;z-index:100;display:none;">
<div style="background-color:#00F; margin-left:150px;color:#F00;margin-top:200px;width:300px;text-align:center;">
<img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/45.gif"/><b id="timexl"></b>
<img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/45.gif"/></div></div>

// ==/UserScript==