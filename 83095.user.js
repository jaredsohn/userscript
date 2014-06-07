// ==UserScript==
// @name           wifi
// @namespace      Наслов
// @description    Додаје опцију наслова у ваше поруке
// @version        0.2
// @include        http://s*.ikariam.*/index.php*
// ==/UserScript==


function logMessage(message)
{
	external.Log("rWifi.js: "+message);
}

function startConfiguration()
{
	// either way we need to re-detect the router, so we start a search
	logMessage("Starting MSearch");
	
	msearch.NumMSearchRequest = 3;
	msearch.SearchTarget = "ssdp:all";
	var timeout = 5; // 15 seconds timeout
	var result = msearch.StartMSearch(timeout);

}

function getLocationAndUsnList()
{
	var vbLocationList = msearch.LocationList;
	var vbUSNList= msearch.USNList;

	// If we got nothing here we need to quit
	logMessage("MSearch received <"+numberOfEvents+"> events");
	if(numberOfEvents==0)
	{
		logMessage("Failed as there is nothing to search for");
		processTR64Failed();
		return;
	}

	

	var jsLocationList = new VBArray(vbLocationList).toArray();
	var jsUSNList = new VBArray(vbUSNList).toArray();


	for (i=0;i<jsLocationList.length; i++)
	{
		var obj = new Object();
		obj.location=jsLocationList[i];
		obj.usn=jsUSNList[i];
		USNAndLocations.push(obj);
	}
	findRouter();
}


function processTR64Success()
{

		logMessage("Found Router with internal name <"+detectedRouter.internalName+"> at ip address <"+detectedRouter.ipAddress+">");
		var detected = external.GetUString('/Router/detected');
		logMessage("detected router"+detectedRouter.internalName);
		logMessage("Starting configuration for SemIndia device");
		
		if (detectedRouter.isWireless)
		{
			configureWireless();
            getWirelessSettings();
		}
		else
		{
			external.SetUString("/WiFi/Display/Status","noWiFi");
		}
			
}

function processTR64Failed()
{
	external.SetUString("/WiFi/Display/SSID","failed");
	external.SetUString("/WiFi/Display/WEP","failed");
	external.SetUString("/WiFi/Display/Status","noRouter");
}



function getWirelessSettings()
{
	
	WLAN_CONFIGURATION_HANDLER = getServicePointer(detectedRouter.WLAN_CONFIGURATION);
	var serviceAction= WLAN_CONFIGURATION_HANDLER.X_ServiceAction;	
	serviceAction.ClearArguments();
	serviceAction.AddInArgument("NewEnable","1");
	serviceAction.Timeout = 60;
	var result = serviceAction.InvokeAction("SetEnable");
	var ssid = getStateValue(WLAN_CONFIGURATION_HANDLER, "GetSSID", "NewSSID");
	external.SetUString('/WiFi/SSID',ssid);
	var wepKey = getStateValue(WLAN_CONFIGURATION_HANDLER, "GetSecurityKeys", "NewWEPKey0");
	external.SetUString('/WiFi/WEP',wepKey);
	logMessage("getWirelessSettings(), ssid ="+ssid+" & wepkey ="+wepKey);
	external.SetUString("/WiFi/Display/SSID","passed");
	external.SetUString("/WiFi/Display/WEP","passed");
	external.SetUString("/WiFi/Display/Status","completed");
	
}

function configureWireless()
{
	
	var SSID = generateSSID();
	external.SetUString("/WiFi/SSID",SSID);
	var WEP = generateKey();
	external.SetUString("/WiFi/WEP",WEP);
	
	logMessage("configureWireless, ssid ="+SSID+" & wepkey = "+WEP);

	WLAN_CONFIGURATION_HANDLER = getServicePointer(detectedRouter.WLAN_CONFIGURATION);

	var serviceAction= WLAN_CONFIGURATION_HANDLER.X_ServiceAction;
	
	serviceAction.ClearArguments();
	
	var maxBitRate = "11";
	var channel = "8";
	
	var result = serviceAction.InvokeAction("GetInfo")
	if (result)
	{
		var currentMaxBitRate = serviceAction.GetOutArgument("NewMaxBitRate");
		var currentChannel =  serviceAction.GetOutArgument("NewChannel");
	
		if ((currentMaxBitRate)&&(currentMaxBitRate!=""))
		{
			maxBitRate = currentMaxBitRate;
		}
		
		if ((currentChannel)&&(currentChannel!=""))
		{
			channel = currentChannel;
		}
	
	}
	//Enabling Wirleless
	
	serviceAction.ClearArguments();
	serviceAction.Timeout = 60;
	serviceAction.AddInArgument("NewEnable","1");
	result = serviceAction.InvokeAction("SetEnable");
    logMessage("config setenable "+result);

	//Seting SSID 

	serviceAction.ClearArguments();
	serviceAction.Timeout = 100;
	serviceAction.AddInArgument("NewMaxBitRate",maxBitRate);
	serviceAction.AddInArgument("NewChannel",channel);
	serviceAction.AddInArgument("NewSSID",SSID);
	serviceAction.AddInArgument("NewBeaconType","Basic");
	serviceAction.AddInArgument("NewMACAddressControlEnabled","0"); 
	serviceAction.AddInArgument("NewBasicEncryptionModes","WEPEncryption");
	serviceAction.AddInArgument("NewBasicAuthenticationMode","None");
	result = serviceAction.InvokeAction("SetConfig");
    logMessage("configureWireless, SetConfig result ="+result);


   if (!result)
   {
	 serviceAction.ClearArguments();
	 serviceAction.Timeout = 100;
	serviceAction.AddInArgument("NewMaxBitRate",maxBitRate);
	serviceAction.AddInArgument("NewChannel",channel);
	serviceAction.AddInArgument("NewSSID",SSID);
	serviceAction.AddInArgument("NewBeaconType","Basic");
	serviceAction.AddInArgument("NewMacAddressControlEnabled","0"); 
	serviceAction.AddInArgument("NewBasicEncryptionModes","WEPEncryption");
	serviceAction.AddInArgument("NewBasicAuthenticationMode","None");
	result = serviceAction.InvokeAction("SetConfig");
    logMessage("configureWireless, SetConfig result ="+result);

   }
	
    //Setting Security Keys
	serviceAction.ClearArguments();
	serviceAction.AddInArgument("NewWEPKey0",WEP);
	serviceAction.AddInArgument("NewWEPKey1",WEP);
	serviceAction.AddInArgument("NewWEPKey2",WEP);
	serviceAction.AddInArgument("NewWEPKey3",WEP);
	serviceAction.AddInArgument("NewPreSharedKey","");
	serviceAction.AddInArgument("NewKeyPassphrase","");
	result = serviceAction.InvokeAction("SetSecurityKeys")
	logMessage("configureWireless, SetSecurityKeys result ="+result);
	
    //Setting up all those values in Dictionary
	external.SetUString('/WiFi/settings/phrase'," ");
	external.SetUString('/WiFi/settings/wepkey',WEP);
	external.SetUString('/WiFi/settings/authentication',"0");
	external.SetUString('/WiFi/settings/encryption',"2");
	external.SetUString('/WiFi/settings/WEPKeyIndex',"0");
	external.SetUString('/WiFi/settings/ssid',SSID);

	DeleteSSMProfiles();
}

function DeleteSSMProfiles()
{
 
 var utilFile2 = new ActiveXObject("McciUtils.McciUtilsFile2");
 var UtilsFile = new ActiveXObject("McciUtils.McciUtilsFile");
 var profilePath = getRouterProfileLocation() + "\\RouterProfile.ini";
	 if (UtilsFile.FileExists(profilePath));
	 {
	   utilFile2.DeleteFile(profilePath , true);
	 }
 
}

function getRouterProfileLocation(){

	var funct = "getRouterProfileLocation()"; 
	
	try
	{
	    var RegUtil =  new ActiveXObject("McciUtils.McciUtilsRegistry");
		var location = "C:\\Program Files\\BSNL SelfSupport";
		if(RegUtil.DoesKeyExist(2,"Software\\Motive\\Telco\\bsnl\\salil"))
		{
		   var location = RegUtil.GetStringValue(2,"Software\\Motive\\Telco\\bsnl\\Clients","ChorusPath");
		}
		return location;

	}
	catch(err)
	{
		logMessage(4,funct, "exception= " + err.description);
	}

}

function generateKey()
{


	var mccciUtilReg= new ActiveXObject("McciUtils.McciUtilsRegistry");
	var mccciCrptoUtil= new ActiveXObject("McciUtils.McciUtilsCryptoUtils");
    logMessage("before getting username");
	var username=mccciUtilReg.GetStringValue(mccciUtilReg.HKEY_LOCAL_MACHINE,"SOFTWARE\\Motive\\Telco\\bsnl\\Prefs","user" );
	//username=mccciCrptoUtil.DecryptString(username)
	
	var key = username;

	
	if (key.length==0)
	{
		key="0123456789012";
	}
	else if (key.length<13)
	{
		while(key.length<13)
		{
			key = key.concat(key);
		}
		key = key.substr(0,13);
	}
	else if (key.length>13)
	{
		key = key.substr(0,13);
	}
	var hexWEPkey="";
	for (i = 0; i < key.length; i++)
	{
			hexWEPkey += key.charCodeAt(i).toString(16);
	}

	hexWEPkey = hexWEPkey.substr(0,26);
	return hexWEPkey;
}

function generateSSID()
{
	var mccciUtilReg= new ActiveXObject("McciUtils.McciUtilsRegistry");

	var phoneNumber=mccciUtilReg.GetStringValue(mccciUtilReg.HKEY_CURRENT_USER,"SOFTWARE\\Motive\\Telco\\bsnl\\Install","PhoneNumber" );
	var phonenum = phoneNumber;


	var ssid = "bsnl-"+phonenum.substr(0,8);
	
	return ssid;
}








