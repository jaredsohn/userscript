// ==UserScript== 
// @name FasTimeEnhancement
// @namespace jmaxxz 
// @description  Makes fastime.com work better (for the first shift worker)
// @include  http://*.fastime.com/timecard/enter.aspx
// @version 1.0.0
// @homepage http://www.jmaxxz.com
// ==/UserScript==


unsafeWindow.Ft.regex.ampm = /^(-)?([0]?[0-9]|1[0-9]|2[0-4])(:([0-5][0-9])\s*([a|p]?m?)|\s*([a|p]?m?)|([0-5][0-9])\s*([a|p]?m?))?$/i;
unsafeWindow.FtTime.formatAmPm = function(minutes){
    var m = unsafeWindow.FtTime.formatMilitary(minutes); 
    var ap = 'AM'; 
    var h = m.split(':')[0]; 
    var ih = parseInt(h); 
    if( ih == 12 ) ap = 'PM'; 
    if( ih > 12 ) 
    {
       //var r = '00' + (ih - 12); 
       var r = ih - 12; 
       r = r.toString().substr( r.length -2, 2); 
       ap = 'PM'; 
       m = m.replace(h, r);
    }
    if (ih == 0) {
       ap = 'AM';
       m = '12:' + m.split(':')[1];
    }
	
	if(ih > 0 && ih < 7)
	{
		ap = 'PM'; 
	}
	


    return m + ' ' +ap; 
}