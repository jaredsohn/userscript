// ==UserScript==
// @name           Web unblocker
// @version        1.00
// @namespace      Web unblocker
// @description    Unblocks websites at school by changing the filter code
// @include        http://
// @include        https://
// @include        http://www.youtube.com
// ==/UserScript==

<!-- Description: Sample HTML for R3000 customized block page -->
<!-- Date: 03/08/2004 -->
<html>
<head>
<style>
body
 {
	background-color: #343434;
	background-image: url('dan/blockpage/bg_tile.jpg');
	background-repeat: repeat-x
}
<script language=javascript>
//
// Short to long mapping table
//
var categoryDesc = new Array();
categoryDesc["ADWARE"] = "Adware";
categoryDesc["ALCO"] = "Alcohol";
categoryDesc["AUTO"] = "Vehicles";
categoryDesc["BADREP"] = "Bad Reputation Domains";
categoryDesc["CULTS"] = "Cults";
categoryDesc["DOMAINL"] = "Domain Landing";
categoryDesc["DRUGS"] = "Illegal Drugs";
categoryDesc["DUBIUS"] = "Dubious/Unsavory";
categoryDesc["DYNDNS"] = "Dynamic DNS Services";
categoryDesc["EDGECON"] = "Edge Content Servers/Infrastructure";
categoryDesc["EXART"] = "Explicit Art";
categoryDesc["FANSPRT"] = "Fantasy Sports";
categoryDesc["FASHN"] = "Fashion";
categoryDesc["FINAN"] = "Financial Institution";
categoryDesc["GCRIMI"] = "Criminal Skills";
categoryDesc["GENBUS"] = "General Business";
categoryDesc["GENTER"] = "Entertainment";
categoryDesc["GO2MYPC"] = "GoToMyPC";
categoryDesc["GPORN"] = "Pornography/Adult Content";
categoryDesc["GRTCRD"] = "Online Greeting Cards";
categoryDesc["GSELF"] = "Self Help";
categoryDesc["GSTREAM"] = "Generic Streaming Media";
categoryDesc["HATE"] = "Hate & Discrimination";
categoryDesc["HOLSTC"] = "Holistic";
categoryDesc["ICQAIM"] = "ICQ_and_AIM";
categoryDesc["IMIRC"] = "IRC";
categoryDesc["IMMEEBO"] = "Meebo";
categoryDesc["IMMSN"] = "MSN_Messenger";
categoryDesc["IMPOPO"] = "PoPo";
categoryDesc["IMQQ"] = "QQ";
categoryDesc["IMTOMO"] = "ToToMoMo";
categoryDesc["IMWWNG"] = "WangWang" ;
categoryDesc["INT"] = "Intranet/Internal Servers";
categoryDesc["INTECH"] = "Information Technology"; 
categoryDesc["ISP"] = "Internet Service Provider";
categoryDesc["KDPORN"] = "Child Pornography";
categoryDesc["LCOMM"] = "Local Community";
categoryDesc["LIFE"] = "Lifestyle";
categoryDesc["MALCOD"] = "Malicious Code/Virus";
categoryDesc["MESBRD"] = "Message Boards";
categoryDesc["MILAPP"] = "Military Appreciation";
categoryDesc["MILOFL"] = "Military Official";
categoryDesc["MOVTEL"] = "Movies & Television";
categoryDesc["MUSAPP"] = "Music Appreciation";
categoryDesc["OBSC"] = "Obscene/Tasteless";
categoryDesc["ONLCOM"] = "Online Communities";
categoryDesc["PARNML"] = "Paranormal";
categoryDesc["PCANYWH"] = "pcAnywhere";
categoryDesc["PHISHIN"] = "Phishing";
categoryDesc["POLTIC"] = "Political Opinion";
categoryDesc["PORTALS"] = "Portals";
categoryDesc["RECREA"] = "Recreation";
categoryDesc["RTSP"] = "Real Time Streaming Protocol";
categoryDesc["SPYWARE"] = "Spyware";
categoryDesc["TERROR"] = "Terrorist/Militant/Extremist";
categoryDesc["VOIP"] = "VoIP";
categoryDesc["WEAPN"] = "Weapons";


categoryDesc["CORALLW"] = "Coronado Allow";
categoryDesc["D11ALLW"] = "CSSD11 Allow";
categoryDesc["D11BLK"] = "D11 block";
categoryDesc["DOHALLW"] = "Doherty Allow";
categoryDesc["GLBALLW"] = "Global Allow";
categoryDesc["GLBDENY"] = "Global Deny";
categoryDesc["INSTALW"] = "Instruction Allow";
categoryDesc["MITALLW"] = "Mitchell Allow";
categoryDesc["PALMALW"] = "Palmer Allow";
categoryDesc["SCREALW"] = "Spring Creek Allow";
categoryDesc["SECALLW"] = "InstSec Allow";
categoryDesc["TESLALW"] = "Tesla Allow";
categoryDesc["WASALLW"] = "Wasson Allow";
function short2long(catName)
{
	return categoryDesc[catName];
}

function parseData(str, start, end)
{
	result = "";
	i = str.indexOf(start);
	if (i >= 0) {
		len = str.length;
		substr = str.substr(i+start.length, len - start.length);
		j = substr.indexOf(end);
		if ( j > 0) {
			result = substr.substring(0, j);
		}
		else {
			if ( j != 0) {
				len = substr.length;
				result = substr.substr(0, len);
			}
		}
	}
	return result;
}

function getData(){
	str = document.location.href;
	len = str.length;
	i = str.indexOf("?");
	if ( i>= 0) {
		query = str.substr(i+1, len-i-1);
		url = parseData(query, "URL=", "&");
		ip = parseData(query, "IP=", "&");
		document.block.IP.value = ip;
		cat = parseData(query, "CAT=", "&");
		document.block.CAT.value = cat;
		catdesc = short2long(cat);
		user = parseData(query, "USER=", "&");
		document.block.USER.value = user;
	}
}

function showData(){
	document.write("<b>" + "USER:  " + "</b>" + document.block.USER.value +"<br>" + "<br>");
	document.write("<b>" + "BLOCKED URL:  " + "</b>" + document.block.URL.value + "<br>" + "<br>");
	document.write("<b>" + "BLOCKED CATEGORY: " + "</b>" + document.block.DESCR.value + "<br>" + "<br>"); 
}

function do_options(){
	document.block.action="http://10.0.64.200:81/cgi/block.cgi"
	document.block.submit();
}
</script>


<style>
<!--
.heading {  font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-style: normal; font-weight: bold; color: #FFFFFF}
-->
</style>
<style fprolloverstyle>A:hover {color: #FF0000; font-weight: bold}
</style>

<script type="text/javascript">

</script>

</head>
<body onload="document.block.CATL.focus()" link="#0000FF" vlink="#0000FF" alink="#0000FF" style="background-color: #FFFF66; background-image: url('')" topmargin="5">
<form method=post name=block >
<input type=hidden name="STEP" value="STEP2">
<input type=hidden name="SITE" value="_BLOCK_SITE_">
<input type="hidden" name="IP" value="&quot;IP&quot;">
<input type="hidden" name="USER" value="USER">
<input type="hidden" name="URL" value="URL">
<input type="hidden" name="CAT" value="CAT">
<input type="hidden" name="DESCR" value="DESCR">
</form>
<div align="center">
<table border="6" width="850" id="table1" cellspacing="0" cellpadding="0" bordercolor="#800000" bgcolor="#FFFFFF">
	<tr>
		<td>
		<table border="0" width="100%" id="table2" cellspacing="0" cellpadding="0">
			<tr>
				<td bgcolor="#417FBC">
		<div align="center">
			<p style="margin-left: 5px">
			<b><font size="5" color="#FFFFFF">ACCESS DENIED - STUDENT POLICY</font></b></div>
				</td>
			</tr>
		</table>
		<p style="margin-left: 5px">
		<img alt="" src="GlobeLogo.png" width="111" height="105" style="float: right"><b><font face="Arial" style="font-size: 11pt">I<font class="blockcopy" color="#000000">n</font><font class="blockcopy" color="#000000">ternet 
		access to the requested website has been denied based on your user 
		profile and District 11's Internet Usage Policy.&nbsp; </font>If
		you would like to request access to this website, contact your teacher 
		or the school LTE.</font></b><p align="left" style="margin-left: 5px">
		<font face="Arial" style="font-size: 11pt">
		<script language=javascript>
			getData();
			showData();
</script></font></b>
		<p align="center" style="margin-left: 5px">
<b><a target="_blank" href="Student_help.htm">CLICK HERE FOR MORE INFORMATION ABOUT DISTRICT 11 FILTERING</font></a><font face="Arial" size="2"><br>&nbsp;</font></b></td>
	</tr>
</table>
</div>
</body>
</html>