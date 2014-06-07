// ==UserScript==
// @name           test
// @namespace      tester
// @include        http://im.storm8.com/*
// ==/UserScript==

<?php
error_reporting(0);
if(isset($_POST['create_account']))
{
$string = "ABCDEFGHJKLMNPQRSTUVWXYZ123456789";
$amount=$_POST['amount'];
$game=$_POST['game'];
$device=$_POST['device'];
if($device=="idevice")
{
	$extra="&model=iPhone&sv=5.1.1";
	if($game=="im")
	{
		$url="http://".$game.".storm8.com/index.php?version=1.76&premium=true&udid=";
		$kode="UltraDoux174i";
	}
	elseif($game=="kl")
	{
		$url="http://".$game.".storm8.com/index.php?version=1.76&premium=true&udid=";
		$kode="d4sV4sksksks181k";
	}
	elseif($game=="nl")
	{
		$url="http://".$game.".storm8.com/index.php?version=1.76&premium=true&udid=";
		$kode="LibraryRoot103n";
	}
	elseif($game=="pl")
	{
		$url="http://".$game.".storm8.com/index.php?version=1.76&premium=true&udid=";
		$kode="ChooseYourGift101p";
	}
	elseif($game=="rl")
	{
		$url="http://".$game.".storm8.com/index.php?version=1.76&premium=true&udid=";
		$kode="thET1meforChillinGh4zp4zzd181r";
	}
	elseif($game=="rol")
	{
		$url="http://".$game.".storm8.com/index.php?version=1.76&premium=true&udid=";
		$kode="WithImproved152r";
	}
	elseif($game=="vl")
	{
		$url="http://".$game.".storm8.com/index.php?version=1.63&premium=true&udid=";
		$kode="f33ltl0sh4wn181v";
	}
	elseif($game=="wwar")
	{
		$url="http://".$game.".storm8.com/index.php?version=1.76&premium=true&udid=";
		$kode="SnowLeopard154w";
	}
	elseif($game=="zl")
	{
		$url="http://".$game.".storm8.com/index.php?version=1.76&premium=true&udid=";
		$kode="RegisterToday143z";
	}
}
elseif($device=="android")
{
	if($game=="im")
	{
		$url="http://".$game.".storm8.com/apoints.php?fpts=12&version=a1.54&udid=";
		$kode="pr3m1umWat3r154i:12";
		$extra="&model=Droid&sv=2.2";
	}
	elseif($game=="kl")
	{
		$url="http://".$game.".storm8.com/apoints.php?version=a1.56&udid=";
		$kode="midDen9eard156k";
		$extra="&model=Droid&sv=9A405";
	}
	elseif($game=="nl")
	{
		$url="http://".$game.".storm8.com/apoints.php?version=a1.56&udid=";
		$kode="yAmat0t4keru156n";
		$extra="&model=Droid&sv=9A
	$amount=1;
}
if($amount>0 && $amount<2001)
{
	for($i=0;$i<$amount;$i++)
	{
		for($b=0;$b<40;$b++)
		{
			$pos = rand(0,36);
			${'rand'.$i} .= $string{$pos};
		}
		${'pf'.$i}=md5(${'rand'.$i}.":".$kode);
		${'pf'.$i}=strtolower(${'pf'.$i});
		$andp="&pf=";
		${'link'.$i}=$url.${'rand'.$i}.$andp.${'pf'.$i}.$extra;
		echo "${'link'.$i}<br>";
	}
}
}
}
?>
<html>
<head>
<script type="text/javascript">
function rb()
{
	var x=document.getElementById("rol")
	x.disabled=true
	if (document.create_account.game[5].selected == "1")
	{
		document.create_account.game[0].selected = "1"
	}
}

function rb2()
{
	var x=document.getElementById("rol")
	x.disabled=false
}

function load()
{
	document.create_account.game[0].selected = "1"
}
</script>
</head>
<body onload="load()">
<form action="" method="POST" name="create_account">
	Device:<br>
	<select name="device" size="2">
		<option selected value="idevice" onclick="rb2()">iDevice</option>
		<option value="android" onclick="rb()">Android</option>
	</select><br><br>
	Game:<br>
	<select name="game" size="9">
	<?php
	$arr = array("im"=>"iMobsters", "kl"=>"kingdoms Live", "nl"=>"Ninjas Live", "pl"=>"Pets Live", "rl"=>"Racing Live", "rol"=>"Rock Battle Live", "vl"=>"Vampires Live", "wwar"=>"World War", "zl"=>"Zombies");
	foreach ($arr as $value => $val)
	{
		?><option value="<?php echo $value; ?>" id="<?php echo $value; ?>"><?php echo $val; ?></option><?php
	}
	?>
	</select><br><br>
	Amount of accounts to add:<br>
	<input type="text" name="amount" maxlength="4"><br><br>
	<input type="submit" value="Create accounts" name="create_account">
</form>
</body>
</html>