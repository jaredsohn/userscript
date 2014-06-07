// ==UserScript==
// @name           Anti_TelecomAds
// @namespace      http://userscripts.org/scripts/show/104865
// @description    Prevent advertising from ISP of China Telecom and China Unicom, available in some cities.
// @version        0.5
// @author         redWood
// @include        http://*
// ==/UserScript==

/*
 Form of the telecom advertising pages of some cities:
 <html><!-- 100 OR 60 --><script language=JScript><!-- function killErrors(){return true;} window.onerror=killErrors; --></script><frameset rows="*,0"><frame src="http://TLCM_ADS_SERVER_IP/ADS_PAGE" noresize><frame src="http://TLCM_ADS_SERVER_IP/stat/stat.do?u=ID_CODE$RAMDOM_NUMBER$RAMDOM_NUMBER$RAMDOM_NUMBER$RAMDOM_NUMBER$RAMDOM_NUMBER$RAMDOM_NUMBER" noresize></frameset></html>
*/
(theElement = document.getElementsByTagName('frame')[1]) && theElement.src.indexOf("stat/stat.do?u=") != -1 && (window.location = window.location);
