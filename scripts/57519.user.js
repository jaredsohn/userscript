// ==UserScript==
// @name           Omada Projects Firefox Fixer
// @namespace      https://www.omadaproject.com/
// @description    Fixes a number of small bug in Omadaprojects in firefox. (filtering, reporting to files, left nav scrollbars) 
//                 Author: Søren L. Nielsen (mr.soeren.nielsen@gmail.com)
// @include        https://www.omadaproject.com/*
// ==/UserScript==


//Fix problem with file output type reports
if( unsafeWindow.repDest ) {
	unsafeWindow.document.repDest = unsafeWindow.repDest;
}


//fix dialog windows (modal)
unsafeWindow.enc = function enc(cMatch)
    {
      if(cMatch == ' ') return '+';
      var hex = cMatch.charCodeAt(0).toString(16);
      var len = hex.length;
      switch(len){
        case 0:
        hex = '00';
        break;
      case 1:
        hex = '0'+hex;
        case 2:
        break;
      default:
        hex = hex.substring((len-2), len);
        break;
      }
      return '%'+hex;
    };



if( unsafeWindow.showModalDlg ){ 

	unsafeWindow.showModalDlg = function showModalDlg(strURL, strDlgName, intHeight, intWidth, boolResize, boolScroll)
		{
	      		var sss = 'width=' + intWidth + ',height=' + intHeight;
      			if (boolResize)
        			sss = sss + ',resizable=yes';
      			else
        			sss = sss + ',resizable=no';
    
      			if (! boolScroll)
        			sss = sss + ',scrollbars=no';
      			else
        			sss = sss + ',scrollbars=yes';
    			
		    	var scrl
    			if (boolScroll)
      				scrl = 'scroll=yes';
    			else
      				scrl = 'scroll=no';


			//alert('initiating modal dlg.');

			return window.showModalDialog('dlgcontainer.asp?' + scrl + '&src=' + escape(strURL), window, sss);
		}
}



//fix nav frame scrolling
if( window.name == 'framNavigate' ){
	window.parent.document.getElementsByTagName('frame')[0].scrolling="auto";
}

