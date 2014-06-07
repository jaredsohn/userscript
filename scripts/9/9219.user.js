// ==UserScript==
// @name           Fotolog Skin
// @namespace      http://dev.idgrouponline.com/greasemonkey/
// @description    skins fotolog and hides Ads banner
// @include        http://www.fotolog.com*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

/* ********************************************************************************************************************************************* 
	
	CSS Replacement Area

   ********************************************************************************************************************************************* */
Body = 'body { font-size: 12px !important; font-family: Calibri !important; background-color:#99A7A7; }';
Body += 'body { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAAAMElEQVRIie3MMREAAAjDQGCqfRRgFQtl5ZI599kzYSfJn8tfr0FDQ0NDQ0NDQ/+nF40jAiMcPZlkAAAAAElFTkSuQmCC); }';
Body += 'body {color:#fff;}'
Body += 'body a{color:#fff;}'
addGlobalStyle(Body);

Header = '#header { background-color:#838F8F; color:#FFF;}';
Header += '#header { padding: 10px 5px 10px 5px; margin-bottom: -10px; }';
Header += '#header a{ color:#FFF !important;}';
Header += '#header a:hover{ color:#DDDDACA !important;}';
addGlobalStyle(Header);

Title = '#title { background-color:#EEEBDB; }';
Title += '#title { color:#000000; }';
Title += '#title a{color: #919F9F}';
Title += '#title a:hover{color: #99A7A7;}';
addGlobalStyle(Title);

Wrapper = '#wrapper {background-color: #EEEBDB;}';
Wrapper += '#wrapper a{color: #919F9F}';
Wrapper += '#wrapper a:hover{color: #99A7A7;}';
addGlobalStyle(Wrapper);

Footer = '#footer { font-size: 12px !important; background-color: #838F8F;}';
Footer += '#footer {color:#fff; margin-top:-10px;}'
Footer += '#footer a{color:#fff;}'
addGlobalStyle(Footer);

addGlobalStyle('p { font-size: 12px !important; font-family: Calibri !important;}');
addGlobalStyle('table { font-size: 12px !important; font-family: Calibri !important;}');
addGlobalStyle('hr { display:none;}');

//RIGHT COL
addGlobalStyle('#rightCol { color:#000000 !important;}');
addGlobalStyle('#rightCol img{border: 5px #FFF solid !important; border-bottom: 20px #FFF solid !important; }');

// LEFT COL
addGlobalStyle('#leftCol { color:#000000 !important; }');
addGlobalStyle('#leftCol img{border: 5px #fff solid !important; border-bottom: 20px #fff solid !important; }');

// LOGO
Logo = document.getElementById('logo');
Logo.src = 'http://spe.fotologs.net/photo/46/logos/logo_182x40_ffffff.png';
//Logo.src = 'http://img.photobucket.com/albums/v196/f0vela/logo_182x40_ffffff.png';
//Logo.style.height = '80px';

// CENTER COL
addGlobalStyle('#centerCol {background-color: #EEEBDB; color: #000000 !important;}');

// MAIN PHOTO DESCRIPTION
mainphotodescription = '#mainphotodescription {background-color: #D2CEBB !important; color: #000000 !important;';
mainphotodescription += 'border:1px #A59A75 solid; padding: 8px !important; ';
mainphotodescription += 'font-size:12px !important; font-weight:bold;}';
addGlobalStyle(mainphotodescription);

// MAIN FOTO TOOLS
mainphototools = '#mainphototools {border: 1px #A59A75 solid !important; background-color: #D2CEBB; font-weight:bold;}';
mainphototools += '#mainphototools {margin-bottom:-5px}';
mainphototools += '#mainphototools {padding: 3px; }';
addGlobalStyle(mainphototools);

// GUESTBOOK
addGlobalStyle('#guestbook {background-color: #D2CEBB !important; font-size:12px !important; margin-top:-18px;}');

// GUESTBOOK POSTS
guestbookposts = '#guestbook_posts {background-color: #D2CEBB; font-size:12px !important; border-left: 1px #A59A75 solid !important; border-right: 1px #A59A75 solid !important;}';
guestbookposts += '#guestbook_posts h3 {background-color: #D2CEBB !important; padding:5px; border-top: 1px #A59A75 solid !important;}';
guestbookposts += '#guestbook_posts p a{color: #687BAA !important; font-weight: bold; font-size:12px !important;}';
addGlobalStyle(guestbookposts);

addGlobalStyle('.comment {background-color: #FFF !important; font-size:12px !important; color: #000000 !important; padding: 10px;}');
addGlobalStyle('.module {margin-left: -55px; margin-right: 10px; margin-bottom:-5px !important;}');

tools = '.tools {font-weight: bold; text-align:right !important; padding: 4px !important; margin-bottom:-5px; }';
tools += '.tools {background-color: #838F8F;}';
tools += '.tools a {color:#fff !important;}';
tools += '.tools a:hover {color:#fff !important;}';
addGlobalStyle(tools);

// GUESTBOOK FORM
addGlobalStyle('#guestbookForm {font-size:12px !important; padding:5px !important;}');
	// -- titulo
addGlobalStyle('#guestbookForm h3 {background-color: #D2CEBB;}');
	// -- boton
addGlobalStyle('#guestbookForm input{padding: 4px; font-weight: bold; font-size: 14px;}');
addGlobalStyle('#guestbookForm input{border: 2px #EBE8D9 solid; color: #000000;}');
	// -- caja de mensaje
addGlobalStyle('#msg {padding: 0px; margin:0px; font-size:12px !important;}');
addGlobalStyle('#errorBox {background-color: #D2CEBB;}');

// POSTER STYLE
addGlobalStyle('.poster {padding: 5px !important;}');
addGlobalStyle('.poster {font-style: none; font-weight: bold; color: #ffffff !important; font-size:12px !important;}');
addGlobalStyle('.poster a{color: #ffffcc;}');

// DELETE BAR STYLE
addGlobalStyle('.delete {padding: 3px !important; background-color: #f0f0f0}');
addGlobalStyle('.delete a{color: #000000 !important;}');

personallinks = '#personallinks{ font-weight:bold; list-style-type: disc;}';
addGlobalStyle(personallinks);

// ADD BLOQUER
addGlobalStyle('#bannerAd {display:none;}');
addGlobalStyle('#ads {display:none !important;}');
addGlobalStyle('iframe {display:none !important;}');

/* ********************************************************************************************************************************************* 
	
	Image/Text Replacement Area

   ********************************************************************************************************************************************* */
// SMILES on todays caption
// **********************************************************************************************************************************************
var briggin		= '<img src="data:image/gif;base64,R0lGODlhEgASAOZ/AEM0EP/////lIf/jH//mIv/kIPC2AJ2Sd//kIXBeMPvXDc7MxOns79LQyt3e3fzZEefq7eecAP/mI2BLF/fLAP/iHdfX0//lIuyrAKGXff/kH3hnPP3dF5CEY++xAO+yAPK9APvYD2RPHczKwV9JFOmiAPjMAPvXDqCXfPfKAPrTCP7gG3dmO6ZxBLGMA599BPXHAHVjN6RrBJpwBJySdv7fGq+EA5KGZuqpAJ+VevLEAM6GAf7hHfC3ANSmAvPBANeuAu25AN+VAOOVAJCDYqZsA2BKFuyqAG5OB+aZAPbJAHZlOp6UeJ2TeNfX0vTEAMqEAvG8APzbE/3cFs+NAe2uAMyLAm9TB25QB21NB3FTB3hmPK+KBMKMAt+0AWdQHMukApViBPrSB2hSHWhRHejr7t+XAPPGAKh2BMKLAv7fGc3Lw6yBBJhrBK1+A7t3AnNXB8vJwHNiNbGNA2xLB+CTAPvZEGlTHvjPBt6uAaVqA/TMBuemAG9NB/TCAO7y9yH5BAEAAH8ALAAAAAASABIAAAf/gH+CfwwLGRsTExsZCwyDjw4HV1xAME8+bFgHDo9/DQkvewoPDydiKUEzCQ2DFmNgClM1FRUrHCEmIF13Fn8QHXMKagAAAwUFxCEUPWg3ZSNweBzFyAgACAMAKn44SGtNLgorxggCAhfmPHZKHi05MV4PFcbnBPYXGlIUBlRbE2cPiJUjIKEgAQ3EDJgRYUTHCQABiEmUGPGDEBFy8qiAGKCjR48AMOxYQsNGCo4fPwIoUYRJHC1RTKBMGXJInxEQiLgBQWFmRwBVIujpAOGPky9pDPyYSOxIhDdkegn61IaPBwMGPmAoUSfMqk6RsrSwEiEJFBl0NnUSVAgFCxIkBligaPQoEAA7" border="0" />';
var blink		= '<img src="data:image/gif;base64,R0lGODlhFAAUAOZ7AP/mIkM0EP////jbHvzhIPHPGvrdH/7kIf/lIv7lIvnbH6KYfGVQHf3iIeTl493d2O/y9O/MGenCFu7x8vDOGvLRG+vGF/bXHZKFY+K3EnhnPF9JFOW8FNjY0aOZfnVjNvXWHWJNGdHPxeW7FKGWeua8FOS6FNTSydWhC3dmOp52Cu/y82pQCdLQx5txB+S8FnppP6SDD6aCDdi3F96vENTTytinDWZQHOnHGcKkFXtqQPPUHd6wEJJyDKWbgZpvB5+VeGlUIG9UCaiGD9mnDdmsEL6QC7uKCdXUzJOGZduuENCbCtfWz3hmO2hLCGdTHqeehK19B9OwFW1QCHNhM62PEqJ8C7CTEs2aC86dC+fEGM2qFOa/Fm9WCrSNDraPDs6ZCYlkB6eKEd+yEWxOB8CSC96xEKGXe+vFF72MCWlNCJtwB49tCtDOxGlVIO/RHNKyFpp+EOK3E+7MGuzJGd2vEGxTCnJfMdWiDNSfC9jX0PX5/QAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFyAB7ACwAAAAAFAAUAAAH/4B7goOEhYaEEEhQOiEhMD41EIeCDgt2YnBzdFsxLAsOhx0fcW8DBgYDIBQvPR8dhQ9uOQMEBwkJBwQDFRJeQQ+DK0lXCg0BxwAACA0KBSVWGBOCLV07BAEC2QEAxwEXFkpTIoJnVQPY2drpAREZKiSCGjMG6OroAQUmZRqCDDj06dRpy5eFQT8tAw7U29ZtQAQ5WAzu0SDlAgEE3ZIpI/DNTJomgkgMKVAMgUZlzJwRcQFEkAghXCrQsoWLgAJeNJaQaSNoAgYZEiiAMEUvAAUJY1CsiTbowZMvHNBEKFAgggUOdVBEuQGMkB4qbIpkGDEiAw8bYMLcYXKokhoVRhnw5Dnyw8mnSXsgnPCQYsOGFB5OSMJLuFAgACH5BAUKAHsALAQABQALAAcAAActgHt7CAAAgoeChIWGAAgEeweLkgAHAwkBmAEAAXuYBgmTiwkGe5OllIeLiIKBACH5BAVkAHsALAQABQALAAcAAAckgHt7AYSChoIBAooBg4WJiouQhJACiXuLj5KSg5uEjIiFh3uBACH5BAUAAHsALAQABQALAAcAAActgHt7CAAAgoeChIWGAAgEeweLkgAHAwkBmAEAAXuYBgmTiwkGe5OllIeLiIKBACH5BAUAAHsALAQABQALAAcAAAckgHt7AYSChoIBAooBg4WJiouQhJACiXuLj5KSg5uEjIiFh3uBACH5BAUAAHsALAQABQALAAcAAActgHt7CAAAgoeChIWGAAgEeweLkgAHAwkBmAEAAXuYBgmTiwkGe5OllIeLiIKBACH5BAVkAHsALAQABQALAAcAAAckgHt7AYSChoIBAooBg4WJiouQhJACiXuLj5KSg5uEjIiFh3uBADs=" border="0" />';
var tounge		= '<img src="data:image/gif;base64,R0lGODlhEgASAPePAEM0EP/lIf/mIv/kIP/jH//mI/C2AN3e3c7MxP/kIffMAP/iHfvYD/zZEdLQyv/lIuns7/8CAPfLAPvXDZ2Sd3BeMOecANfX0/rTCP9tZ2BLF+yrAOfq7WRPHf3dF6ZxBF9JFHdmO/C3AKGXfZCEY/vXDvK9AP3eGMzKwfjMAOmiAPfKAP/kH/zbE3hnPO+yAKCXfP7gG/vZEO+xAP7hHZ2TeOemAPG8AP/nI5pwBPTMBp6UeOjr7p99BHVjN21NB/XHAGBKFtSmAmdQHPC4APPCAK1+A96uAe25APPGAHhmPPK/AG5OB8vJwOyqAG5QB29NB5ViBPrSB2lTHpCDYvjPBnNXB6VqA8ukAt+XAPTEAK+KBOOVAK+EA/7fGdfX0rt3AvTCAMyLAuCTAGhSHd+VAO2uALGNA8+NAaRrBPjOAteuAnFTB7GMA2hRHfbIAMKMAvO/AHNiNZhrBP7fGv7gGt+0AZ+VevTDAP7jH3ZlOsKLAqh2BOqpAPrUCvzbFGxLB/LEAKyBBOaZAMqEAvbJAG9TB86GAZySdqZsA/3cFvPBAJKGZs3Lw/vaEe7y9wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAI8ALAAAAAASABIAAAj/AB8JfAQBwQgXGjS4GIEAwsCHBygY2rIGiBYhgp5QOPDwkYMKPXRMaNCghJQVSHJUcDDwAhksExTRWbAghgcGKUzAmXLhEQcSZyZ4AUB0AFEADCSI4MOIBworVTwAIDBgQIIACQgAwBCmD5NGNdpMiEH1aoAHAQLQkFFoxoc7Puw0WED1rIC7D1i0kGAAjRINSeZaDSCggGEBLP4oMJClQ5BAJYjaLYCjgIA8RF+U6SDnCIYTWo+K9oNnwyE9iLqsYFCHQAAAGWIDcKSAiIpEO5qwuZGCwQkaACIIB6AmzgYuUFBwoGLEhAQMMloEB6BgiRkLV0hwePRlyB4Di95INVAAoIgIJxbAuOkp8OMcGzMMGHixQcWYKCs7RvzxQYyFQYSkAchGHQlUEAwhgABCCDA09FBAADs=" border="0" />';
var smile		= '<img src="data:image/gif;base64,R0lGODlhFAAUAOZ7AP7lIv/lIv7kIfzhIPHPGvrdH/nbH+Tl4+nCFu/y9N3d2O/MGWVQHaKYfP3iIZKFY+7x8vbXHeK3EnhnPOa8FPDOGgAAAKOZfnVjNvXWHZ52CuW8FF9JFNjY0fLRG9HPxdTSyeS6FGJNGeW7FHdmOqGWeuvGF9WhC2xOB29WCptxB2pQCbSNDtTTyufEGLCTEt6vEKJ8C5pvB2lNCM2qFK2PEq19B5+VeOa/Fpp+EKeKEWlVIHJfMd+yEdi3F76QC9KyFuvFF+/y89XUzKWbgdCbCmZQHKeehLuKCXNhM9DOxNWiDGdTHuK3E29UCd6xEKSDD2hLCKaCDenHGfPUHXppP+S8FtmsEJtwB86dC9inDezJGe/RHG1QCLaPDu7MGt2vEKiGD9uuEKGXe4lkB2xTCsCSC9OwFdmnDdfWz49tCtjX0GlUINSfC82aC3tqQJJyDMKkFZOGZXhmO86ZCb2MCd6wENLQx/jbHkM0EP/mIvX5/QAAAAAAAAAAAAAAACH5BAEAAHsALAAAAAAUABQAAAf/gHuCg4SFhoQJQ0dvIiJVRC0Jh4IHDWU6QF9bNFArDQeHHRg5XHgFBXgZFVZwGB2FCjtxeAMCAAACA3geCCxsCoNCci8GDgF6yHoBDgYEFDEPEIJ3KVQDx3nJeQEDESZiXR+CYzV4AsjZ6HoCeAsSGiWCEz4FAOrqAAUEIWYTggxT6iUbqCffviwM/rkwRzAZuwVN3CTcM+FMBAvHCHK7+KTOHEElwhAwsG3gMpIU0Ki4IeiDExwe8OSxhWsASQQwiqBQIgjCAykIKmTIQ7Qogh4nsEQbpICJlw1BFhAgsMDEBjAnbBgBRmhNEjVXJIwYIcGOFjpkeKQ5VGmGhh9LGNogkRHl06Q9CUBcIMGBA4kLICTdHVwoEAA7" border="0" />';
var confused	= '<img src="data:image/gif;base64,R0lGODlhEgASAOZ/AP7kIe/y9PzhIP7lIv/qJv/lIu/MGWVQHeTl493d2KKYfP/pJunCFvnbH/XWHZKFY/DOGu7x8vLRG+K3EuvGF3hnPOa8FNTSyf3iIdHPxaGWetjY0fbXHXVjNl9JFKOZfmJNGeW8FOS6FOW7FHdmOtWhC552CqiGD9WiDN+yEa2PEruKCcCSC+K3E6J8C2pQCdmnDbCTEuS8Fs6dC+fEGOzJGc2qFOvFF9i3F+/RHNXUzJpvB+7MGr6QC2lVIG9WCm9UCY9tCtCbCr2MCZtwB6SDD82aC96xEKeehNKyFt6vEHNhM9LQx2hLCM6ZCXJfMdDOxPPUHWxOB5+VeGlUIJOGZXppP619B5p+EMKkFaWbgduuENfWz6GXe5txB7aPDtjX0KaCDd2vEG1QCP/sKXtqQO/y82dTHrSNDpJyDN6wENOwFWZQHGxTCqeKEdinDenHGYlkB9TTynhmO+a/FtmsEGlNCNSfC/rdH0M0EPHPGvjbHv/mIv///wAAAP///yH5BAEAAH8ALAAAAAASABIAAAf/gH+CfwE6SGUgIFZacgGDjwgKbW5JPDU2RS8KCI9/Gx1YOXt4eHsOEDJpHRuDCT5ZewIAAwMAAnsSDGhUCX9mVTENfsNkBATDfnoWLg8RTD9Rfn3TfsfTfX4UW2MZXSp70uHW4QYTJhoVOHjS1Avs2HoiLBUHcHgDyAv6yHjxMwcHaOwBwKegwYIA9hhoYeRAhTUcBBQ4WLCAAA4UjgyZo+GEngYYCuTJUxFDA2UwvEzJAISOhD15ZsUcmUuJEClQIjwIwwCCg1F48pxikKIEkWZ/Epz5EuKGAT16DFAIIabEFTa9BIFZEqTOhBEjJqh54yTOEy6dItkx0QPFnRU7E5ps6iQowIUPJDx4IPHhgqNBgQAAOw==" border="0" />';
var sad			= '<img src="data:image/gif;base64,R0lGODlhEgASAPeQAC8kC//lIf/mIv/jH//kIEM0EP/mI//lIvC2AM7MxN3e3fvYD/zZEf/kIffLAOns79LQyvfMAPvXDXBeMP/iHZ2Sd+yrAOfq7WBLF+ecANfX0/vaEXhnPKZxBKGXffzbFHdmO+miAO+xAPvZEPK9AJCEY//kH/fKAMzKwfrUCl9JFPzbE/rTCPvXDv7gG2RPHfjMAPbJAKCXfP3eGPC3AO+yAPTMBqyBBM+NAZCDYt+0AfTDAOqpAPPCAPC4AG9TB3ZlOt+VALGMA96uAf/nI+25ANSmAvO/AGxLB/PGAJ6UeKZsA5+VerGNA/7hHGlTHv7hHW9NB+jr7vG8AK+KBK1+A3VjN7t3AnNiNfjOAvTEAPrSB/PBAP3dF/7jH/3gGs6GAW5OB+CTAKh2BOyqAP7gGqVqA2hSHZhrBJpwBGBKFvjPBm5QB5KGZsukAnhmPG1NB/TCAJViBPLEAOOVAJ2TeMKLAmhRHd+XAPbIAMKMAsyLAuemAMvJwP7iHaRrBP7fGWdQHJ99BPbKAMqEAv3cFnFTB5ySdu2uAPXHAHNXB9fX0q+EA83Lw+aZANeuAu7y9wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJAALAAAAAASABIAAAj/ACEJhPQggQcOGDBw8JDgwcCHCir8oPIokRYjN9hUUPAQEoQJgmxIYMCgxZYTRdJMgDBQwxk3EgoBoEDBBYAFMEjoeaIB0oUSTSQAAjBgAAECA246oDGmjRQUitZ0IXq0QYAGSVnE4RGmUR0hElwYBRAgwAGyUEbEENGBiRUdDCiMPSBAAIADJlY4QIDjDYYkcQk0ACDAgAHCJj5EQIDnhZo5LZwQMFuYiAEBXjYMqhHkBZYhLGYMsFrYcIAvKXZYAAPkEKMTC8oMoCwggJ8NEXyEWKKkj6EpMBbMKEC8eJYjFuhEQXEhRxUSDgqMWPFhQ4oIBRBlMFPiAqRFgewgOeCSx0GEGD1okMlw5U5PgR/R8BGBAEENCyHEyFnZMSKcDntk4AghfyCxUUcCFSQDCCqoAIIMDT0UEAA7" border="0" />';
var shocking	= '<img src="data:image/gif;base64,R0lGODlhEgASANQAAP7+/lZCCm1VCqyQEtSyFvHPGuzKGsqqFqeFDmpOCp15DPnaHua+FphvCAICAv7lIunDFruRDHJaCt2uEsKSCtCcCgoKCuC0EiIiItikDEI2Eq5+BopmBrqKCtq6GgAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJyAAfACwAAAAAEgASAAAFniDwjWNgnmRKBsJAFMaBJIFaKsWi6wXT1CRA4OAoPo5FByQC/AQGDoDU8YhOGQqgxCoFcKeThPPbLU+zAS5ZTTGRzV1HxWSwmO1lx2UeICzUD3heEBdMAQg5FhhURxgWDj0ZPx8CEDlHmA8LBRATFWJOCJY7O5wXkk0BEQyWGq4aDBMZG00lDRMXrxoZFRy1KwkKEbwdDTQ2KScoKQAhACH5BAUPAB8ALAAAAAASABIAAAWc4CeOQWmOKCkMRGEcSBKkYqAUS54XTDOjgYNj+CgOHZDI7xMYOABQx+MZZSh+EioUoI1OEszudhy9BrRiNKUkJm8dlZLBQqZDLRbHJR4gLNAPeBYPCxAXSgEIOBYYUkVFCzwZPh8CEDiPj5EQExVgTAiXOjoFhpNLAREMlxqtGgwTGRtLNQ0TF64aGRUctCQJChG7HQ0yNEAmJTQhACH5BAkPAB8ALAAAAAASABIAAAUfIPCNZGmeaKqq4uq+cCzPNNu+QO7EmLXXwKBw6AKEAAAh+QQFFAAfACwAAAAAEgASAAAFnOAnjkFpjigpDERhHEgSpGKgFEueF0wzo4GDY/goDh2QyO8TGDgAUMfjGWUofhIqFKCNThLM7nYcvQa0YjSlJCZvHZWSwUKmQy0WxyUeICzQD3gWDwsQF0oBCDgWGFJFRQs8GT4fAhA4j4+REBMVYEwIlzo6BYaTSwERDJcarRoMExkbSzUNExeuGhkVHLQkCQoRux0NMjRAJiU0IQAh+QQJlgAfACwAAAAAEgASAAAFHyDwjWRpnmiqquLqvnAszzTbvkDuxJi118CgcOgChAAAIfkEBQ8AHwAsAAAAABIAEgAABZvgJ45BaY4oKQxEYRxIEqRioBRLnhdMM6OBg2P4KA4dkMjvExg4AFDH4xllKH4SKhSgjU4SzO52HL0GtGI0pSQmbx2VksFC31rIjks8QFgU6VJ3URAXSgEIOEWKDxgWDjwZPh8CEImLDwsFEBMVYEwIlTo6mheRSwERDJUarBoMExkbSzUNExetGhkVHLMkCQoRuh0NMjRAJiU0IQAh+QQJlgAfACwAAAAAEgASAAAFHyDwjWRpnmiqquLqvnAszzTQxo59vxbm0MCgcEj8AEIAIfkEBQoAHwAsAAAAABIAEgAABaTgJ45BaY4oKQxEYRxIEqRioBRLnhdMM6OBw+JBLC4KkMjvExgsLNCiY8pT/CRPgNYy1QIckEmCObB4tY7z92INeMxfdfrLoJQKcO/ca2FUSgZZW1x6BRd/AQRDUBZSUwsQF0oBCDhFlw9HDBk+HwIQlphHYRVjTAigOjpIF5xLAREMoBq0GgwTGRtLNQ0TF7UaGRUcSwAkCQoRwh0NMjRAJiU0IQAh+QQFDwAfACwCAAAADQASAAAFMOAnjiRAnmiqruTjju4Cu3QtL3X+LMXiOJ/f4xd09HS2wgdJk4loswdrSq1ar1hTCAAh+QQFCgAfACwCAAQADQAHAAAFJeD3WaT4OahpAayFsoAzwqxDxyvw3Tt+2zTLrOWCyUQkoQh1DAEAOw==" border="0" />';
var wink		= '<img src="data:image/gif;base64,R0lGODlhEgASAPeSAEM0EP/lIf/mIv/jH//mI//kIP/lIvC2AHBeMNLQyt3e3fzZEens787MxPvYD/fLAPvXDfvaEffMAJ2Sd//kH//iHeecAP/kIWBLF/rTCOfq7eyrANfX0++yAHdmO/3fGfK9AP/iHqZxBPbJAJCEY/C3APfKAMzKwemiAP3dF/zbFPvXDqGXfXhnPPjMAO+xAKCXfP7gG/7hHWRPHfrUCl9JFOCTAGBKFvG8AJKGZp+VesukAm9NB2hSHah2BHNiNXFTB//nI2xLB/7iHm5OB/PCAPvZEO25AN6uAfC4AO2uANeuApySdnZlOtfX0q1+A56UeMvJwPPBAN+VAOjr7pCDYuaZAJViBLt3Am5QB8qEAnVjN2hRHf7fGvjPBv3gGuyqAKyBBK+KBPTCAPLEAM+NAd+XAOemAJ99BP7jH21NB9+0Ac3Lw3NXB/O/ANSmAqRrBLGMA/TDAKZsA/XHAP7iHZ2TePbKAKVqA/PGAP7gGvrSB7GNA/7fGc6GAeqpAK+EA8KMAphrBMKLAvK/AP3cFvTEAG9TB+OVAJpwBGdQHGlTHvbIAPjOAnhmPMyLAvzbE/TMBu7y9wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJIALAAAAAASABIAAAj/ACUJlMSgAYsWGDC0YNGAwcCHCiYcErOEjqE3YbJMUPBQUgIEaCJBWLBgxR4TRxIhSDCQQ48dEAp1qVAhRgoHLkAEWsRBkgYSfCD0CTFgQIECA/Q4eFDCRw4qJ9p4SUH06IUAAAZ8yDDmDxE2duJAiDEAgNkABgAEkGFkxAsROrasWVDBKFoBAgAYoADpwYEyjjDkoVvgqgACiAVQUCHhgJkZN8isAFDgLoEgBASkiXCnw5QZP5BkyGoYMYEAX2jI2eCnCRNAJhxkvSsgQJ0IEpKgmAMlChAcLmTLoEBhyIcIjdxsQMTjhIYqT0A8GA1ARQQaEggpsYCHhAZJThQNOjoghdEDCSOKlABjAQuXngI/Cjrz4sCBDhtQ2LiysmNENSI8YoEVWsAhxEYdCVQQDB7UUIMHMDT0UEAAOw==" border="0" />';


// **********************************************************************************************************************************************
// CHANGING icons
// **********************************************************************************************************************************************
window.addEventListener(
	'load',
	function() { 
	
	var emotestxt 	= document.getElementById('mainphotodescription').innerHTML;
	var emotespost 	= document.getElementById('guestbook').innerHTML;

	var EMOTES 		= new Array(":)",":o)",":0)","=)","=o)","=0)"
								,":S",":oS",":0S","=S","=oS","=0S",":-s"
								,":(",":o(",":0(","=(","=o(","=0("
								,":D",":oD",":0D","=D","=oD","=0D"
								,":|",":o|",":0|","=|","=o|","=0|","8-|"
								,":P",":oP",":0P","=P","=oP","=0P"
								,"O_O","O__O"
								,";)",";o)",";0)"
								);
	var EMOTESIMG 	= new Array(smile,smile,smile,smile,smile,smile
								,confused,confused,confused,confused,confused,confused,confused
								,sad,sad,sad,sad,sad,sad
								,briggin,briggin,briggin,briggin,briggin,briggin
								,blink,blink,blink,blink,blink,blink,blink
								,tounge,tounge,tounge,tounge,tounge,tounge
								,shocking,shocking
								,wink,wink,wink
								);
	
	for(e=0;e<EMOTES.length;e++){
		var intIndexOfMatch = emotestxt.indexOf(EMOTES[e]);
		while (intIndexOfMatch != -1){
			emotestxt = emotestxt.replace( EMOTES[e], EMOTESIMG[e]);
			intIndexOfMatch = emotestxt.indexOf( EMOTES[e] );
		}
	}
	for(e=0;e<EMOTES.length;e++){
		var intIndexOfMatch2 = emotespost.indexOf(EMOTES[e]);
		while (intIndexOfMatch2 != -1){
			emotespost = emotespost.replace( EMOTES[e], EMOTESIMG[e]);
			intIndexOfMatch2 = emotespost.indexOf( EMOTES[e] );
		}
	}
	document.getElementById('mainphotodescription').innerHTML = emotestxt;
	document.getElementById('guestbook').innerHTML = emotespost;
	
	
	var links 		= document.links;
	for(i=0;i<links.length;i++){
		if(links[i].innerHTML.indexOf('alt="RSS feeds"') != -1){
		links[i].innerHTML = '<img border="0" alt="RSS feeds" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAfRJREFUeNrUlj1Iw0AUx981ph8KujgUlKjgILroIgVx1YiLdBLcFKGjo5u6iZOTdOnuJIKICm5FKF1UUHFQ0Ki0QgcR27RNk/ju0oTGJkrbdPDB611eev/f3bvruxJd16Gd5oM2W4fZOTs9ADWZ8GQ53PQKmRWjdgAVFybnYGw+hk/NcgjcHsdBohMVo8QGoDY2swxQKgBoTQJ8hGlI6ZP6FDFDcV0pI0BtEsAB4f3Oe0BNLyKgXMR8VYAbGq0XyD6BKhd+ST7KqcE/AOhQUZwFwoPAVUGV3LvDkeFx9dovgJIMuvwFgGlS0ud143lhmEGo04GK9PDjC5geQv4C5I00OVjp/hIAPTAywSC8GTPPkD9opMkVgMIahaCHxCVb7uWrC+uR9kOisRKtJk6wKvj8AXfAx8sNKLlXUPOfINQCUIgJIkja32YhYXzKiGNrxriubuB7+90BtSbtxqy+sLhu5d60t6M96FvdscWarkVshjh7C0Z/+bjKlopdOCKCsBZnrQWppsuTauqPLNhaz8t1OXVoa1su1+yYYS3BD1YVs6lTAOouG1//TNhYpuEG4Lp6gCtUN0/XGqzUPmM8uivgWbqDAWEU1M5u1Fcb1OeYONVwBOAttJVJJjYyj9de3GhbTivYxBdeXcWbNeXjn/+r+BZgABVqwZTD4mH0AAAAAElFTkSuQmCC" style="border: 5px solid rgb(238, 238, 238) ! important;"/>';
		}
		if(links[i].text.indexOf('a Amigos/Favoritos') != -1){
		links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ8SURBVDjLpZB/SFNRFMftj5IiW9saIQjGQrBiUagEFWLDydrUhAWzNNuWTZ1oKIUzf4RlzZY6sWyrLZXhfFszQ1eac2SQkYWW0yH0l1AWITSw1IXK+/beK0RBptCFD+fcyz2fc+4NARDyP6x5qInbVVEn5sw2SHdCL2ahQsiey4jhVW9IkBPDKbmfyibN6Rw8oLgrY0MnYaEofgcpPcitWldglLLQQhXqqSKdlIaNm8k8XDnBQWYMa2ZdgS5+O14YyzHVq8eQpQiFCTwUJ4YjX8SH+hh7wapNCQ0qMGdF/gh8/4SZN0Z87a+H13ENk89vwz85AiJ378xYq2ZLUEFjxv5B//t2TA87MT9KUNiZ3D9C4KFKMBz0Cbults1RxzVWoiAWv4ctCPieMsx/tKHzciwE8blPeCLz1jUFPAkRyhW35UWIPfB9noWjLBX2shQGOn898QsRSS/BET66xBWatq0ScE86NoUlORSRyYOYmJpH2xRQ7APy3gEXXgHnewCtsxPFRgXU9acgvyEMiEsOVS4LDsia0xJP6+EcWoLJCxS8JZE7QCK7j0RWFwmlmUCVU4lnviaMfnPD0K+B3CDAkfzwWkbwoTx6adqlxb1mFxS9VFeqo7KbxLkOEmdsVKyRoGu8AV0TjaBXreciDJ4cWhBgBN6KfaTffR3p6hZU988howM4aycht5KQWUgklx1Gj8+Clat7rIkW/P2IcWtB6Uhp1KJSeWsxTjEAJTW6agVHC/m441ZB51Ywxbo+xeoJaCbteWGVV6u5e9JcpsiE1i980eM5flLHAj/RuSCQZy7KaqNR585mOtOR3i//wUagLtdQ/KTH/hdr6PM/RhGjA91Gi1AAAAAASUVORK5CYII=" width="16" height="16" border="0" title="'+links[i].text+'"/>';
		}
		if(links[i].text.indexOf('Acerca de') != -1){
		links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ3SURBVDjLpZNtSNNRFIcNKunF1rZWBMJqKaSiX9RP1dClsjldA42slW0q5oxZiuHrlqllLayoaJa2jbm1Lc3QUZpKFmmaTMsaRp+kMgjBheSmTL2//kqMBJlFHx44XM7vOfdyuH4A/P6HFQ9zo7cpa/mM6RvCrVDzaVDy6C5JJKv6rwSnIhlFd0R0Up/GwF2KWyl01CTSkM/dQoQRzAurCjRCGnRUUE2FaoSL0HExiYVzsQwcj6RNrSqo4W5Gh6Yc4+1qDDTkIy+GhYK4nTgdz0H2PrrHUJzs71NQn86enPn+CVN9GnzruoYR63mMPbkC59gQzDl7pt7rc9f7FNyUhPY6Bx9gwt4E9zszhWWpdg6ZcS8j3O7zCTuEpnXB+3MNZkUUZu0NmHE8XsL91oSWwiiEc3MeseLrN6woYCWa/Zl8ozyQ3w3Hl2lYy0SwlCUvsVi/Gv2JwITnYPDun2Hy6jYuEzAF1jUBCVYpO6kXo+NuGMeBAgcgfwNkvgBOPgUqXgKvP7rBFvRhE1crp8Vq1noFYSlacVyqGk0D86gbART9BDk9BFnPCNJbCY5aCFL1Cyhtp0RWAp74MsKSrkq9guHyvfMTtmLc1togpZoyqYmyNoITzVTYRJCiXYBIQ3CwFqi83o3JDhX6C0M8XsGIMoQ4OyuRlq1DdZcLkmbgGDX1iIEKNxAcbgTEOqC4ZRaJ6Ub86K7CYFEo8Qo+GBQlQyXBczLZpbloaQ9k1NUz/kD2myBBKxRZpa5hVcQslalatoUxizxAVVrN3CW21bFj9F858Q9dnIRmDyeuybM71uxmH9BNBB1q6zybV7H9s1Ue4PM3/gu/AEbfqfWy2twsAAAAAElFTkSuQmCC" border="0" title="'+links[i].text+' '+links[i+1].text+'"/>';
		}
		if(links[i].text.indexOf('Mis Estadísticas') != -1){
		links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGvSURBVDjLpZO7alZREEbXiSdqJJDKYJNCkPBXYq12prHwBezSCpaidnY+graCYO0DpLRTQcR3EFLl8p+9525xgkRIJJApB2bN+gZmqCouU+NZzVef9isyUYeIRD0RTz482xouBBBNHi5u4JlkgUfx+evhxQ2aJRrJ/oFjUWysXeG45cUBy+aoJ90Sj0LGFY6anw2o1y/mK2ZS5pQ50+2XiBbdCvPk+mpw2OM/Bo92IJMhgiGCox+JeNEksIC11eLwvAhlzuAO37+BG9y9x3FTuiWTzhH61QFvdg5AdAZIB3Mw50AKsaRJYlGsX0tymTzf2y1TR9WwbogYY3ZhxR26gBmocrxMuhZNE435FtmSx1tP8QgiHEvj45d3jNlONouAKrjjzWaDv4CkmmNu/Pz9CzVh++Yd2rIz5tTnwdZmAzNymXT9F5AtMFeaTogJYkJfdsaaGpyO4E62pJ0yUCtKQFxo0hAT1JU2CWNOJ5vvP4AIcKeao17c2ljFE8SKEkVdWWxu42GYK9KE4c3O20pzSpyyoCx4v/6ECkCTCqccKorNxR5uSXgQnmQkw2Xf+Q+0iqQ9Ap64TwAAAABJRU5ErkJggg==" border="0" title="'+links[i].text+' '+links[i+1].text+'"/>';
		}

//*********************************************************************************
// ENGLISH VERSION
//*********************************************************************************
		if(links[i].text.indexOf('to Friends/Favorites') != -1){
		links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ8SURBVDjLpZB/SFNRFMftj5IiW9saIQjGQrBiUagEFWLDydrUhAWzNNuWTZ1oKIUzf4RlzZY6sWyrLZXhfFszQ1eac2SQkYWW0yH0l1AWITSw1IXK+/beK0RBptCFD+fcyz2fc+4NARDyP6x5qInbVVEn5sw2SHdCL2ahQsiey4jhVW9IkBPDKbmfyibN6Rw8oLgrY0MnYaEofgcpPcitWldglLLQQhXqqSKdlIaNm8k8XDnBQWYMa2ZdgS5+O14YyzHVq8eQpQiFCTwUJ4YjX8SH+hh7wapNCQ0qMGdF/gh8/4SZN0Z87a+H13ENk89vwz85AiJ378xYq2ZLUEFjxv5B//t2TA87MT9KUNiZ3D9C4KFKMBz0Cbults1RxzVWoiAWv4ctCPieMsx/tKHzciwE8blPeCLz1jUFPAkRyhW35UWIPfB9noWjLBX2shQGOn898QsRSS/BET66xBWatq0ScE86NoUlORSRyYOYmJpH2xRQ7APy3gEXXgHnewCtsxPFRgXU9acgvyEMiEsOVS4LDsia0xJP6+EcWoLJCxS8JZE7QCK7j0RWFwmlmUCVU4lnviaMfnPD0K+B3CDAkfzwWkbwoTx6adqlxb1mFxS9VFeqo7KbxLkOEmdsVKyRoGu8AV0TjaBXreciDJ4cWhBgBN6KfaTffR3p6hZU988howM4aycht5KQWUgklx1Gj8+Clat7rIkW/P2IcWtB6Uhp1KJSeWsxTjEAJTW6agVHC/m441ZB51Ywxbo+xeoJaCbteWGVV6u5e9JcpsiE1i980eM5flLHAj/RuSCQZy7KaqNR585mOtOR3i//wUagLtdQ/KTH/hdr6PM/RhGjA91Gi1AAAAAASUVORK5CYII=" width="16" height="16" border="0" title="'+links[i].text+'"/>';
		}
		if(links[i].text.indexOf('About') != -1){
		links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ3SURBVDjLpZNtSNNRFIcNKunF1rZWBMJqKaSiX9RP1dClsjldA42slW0q5oxZiuHrlqllLayoaJa2jbm1Lc3QUZpKFmmaTMsaRp+kMgjBheSmTL2//kqMBJlFHx44XM7vOfdyuH4A/P6HFQ9zo7cpa/mM6RvCrVDzaVDy6C5JJKv6rwSnIhlFd0R0Up/GwF2KWyl01CTSkM/dQoQRzAurCjRCGnRUUE2FaoSL0HExiYVzsQwcj6RNrSqo4W5Gh6Yc4+1qDDTkIy+GhYK4nTgdz0H2PrrHUJzs71NQn86enPn+CVN9GnzruoYR63mMPbkC59gQzDl7pt7rc9f7FNyUhPY6Bx9gwt4E9zszhWWpdg6ZcS8j3O7zCTuEpnXB+3MNZkUUZu0NmHE8XsL91oSWwiiEc3MeseLrN6woYCWa/Zl8ozyQ3w3Hl2lYy0SwlCUvsVi/Gv2JwITnYPDun2Hy6jYuEzAF1jUBCVYpO6kXo+NuGMeBAgcgfwNkvgBOPgUqXgKvP7rBFvRhE1crp8Vq1noFYSlacVyqGk0D86gbART9BDk9BFnPCNJbCY5aCFL1Cyhtp0RWAp74MsKSrkq9guHyvfMTtmLc1togpZoyqYmyNoITzVTYRJCiXYBIQ3CwFqi83o3JDhX6C0M8XsGIMoQ4OyuRlq1DdZcLkmbgGDX1iIEKNxAcbgTEOqC4ZRaJ6Ub86K7CYFEo8Qo+GBQlQyXBczLZpbloaQ9k1NUz/kD2myBBKxRZpa5hVcQslalatoUxizxAVVrN3CW21bFj9F858Q9dnIRmDyeuybM71uxmH9BNBB1q6zybV7H9s1Ue4PM3/gu/AEbfqfWy2twsAAAAAElFTkSuQmCC" border="0" title="'+links[i].text+' '+links[i+1].text+'"/>';
		}
		if(links[i].text.indexOf('My Stats') != -1){
		links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGvSURBVDjLpZO7alZREEbXiSdqJJDKYJNCkPBXYq12prHwBezSCpaidnY+graCYO0DpLRTQcR3EFLl8p+9525xgkRIJJApB2bN+gZmqCouU+NZzVef9isyUYeIRD0RTz482xouBBBNHi5u4JlkgUfx+evhxQ2aJRrJ/oFjUWysXeG45cUBy+aoJ90Sj0LGFY6anw2o1y/mK2ZS5pQ50+2XiBbdCvPk+mpw2OM/Bo92IJMhgiGCox+JeNEksIC11eLwvAhlzuAO37+BG9y9x3FTuiWTzhH61QFvdg5AdAZIB3Mw50AKsaRJYlGsX0tymTzf2y1TR9WwbogYY3ZhxR26gBmocrxMuhZNE435FtmSx1tP8QgiHEvj45d3jNlONouAKrjjzWaDv4CkmmNu/Pz9CzVh++Yd2rIz5tTnwdZmAzNymXT9F5AtMFeaTogJYkJfdsaaGpyO4E62pJ0yUCtKQFxo0hAT1JU2CWNOJ5vvP4AIcKeao17c2ljFE8SKEkVdWWxu42GYK9KE4c3O20pzSpyyoCx4v/6ECkCTCqccKorNxR5uSXgQnmQkw2Xf+Q+0iqQ9Ap64TwAAAABJRU5ErkJggg==" border="0" title="'+links[i].text+' '+links[i+1].text+'"/>';
		}
		if(links[i].text.indexOf('RSS') != -1){
		links[i].innerHTML = 'RSS';
		}
		

		switch(links[i].text){
			case 'Upload a photo to this group':
			links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAMNQTFRFob7TjrHNcpXju9De4Or0eHh4q6ur+fr68fL03+LkwsPB6OvsdHV14erwpbrOvNHfyNnrl5iZ8fX62+byeXl63Ofzl7Dp2Nzf9/n8qr3P6fD3p7vOq77Q6PD34erx7fL42uLooLbLzt3nma/iq8TZlJOPvdHfubm5zdzmmLDndZfjdJfjlq3imK7ic5Xjfn9/cXFxfX5+3OLls7Ozuc/f2uLprr7hdpjj4OfroKGjd3d4y87TubiwcpGvbW1t////ubiwL0WH2wAAAEF0Uk5T/////////////////////////////////////////////////////////////////////////////////////wAwVezHAAAA00lEQVR42qyR1xKCMBREsSCIoGDvvffekr36/18lRAQc8cXxvGQyJzuZ2ZXuX5D+LOgNX1DiFiBBvlCUz4wQakhGiBQpo5Usy+K5vFM8kSR1sz20203DMJrnq+qJkp3pDjOZmMPYvrwEszN7yQVIBkSJ+pEnqNcREIyKUQEq5XIFAbGenKazZRS1bLWarcEVFrH8sbeYF5FuNQqFRisNITgRu+R1XScAHdPs2MezRE4WE2iahlwOA87d2rnfE+JxcH8P7uGI0KHgfBAmnNRvmz8EGAB4+nhKPxeiJAAAAABJRU5ErkJggg==" width="24" height="24" border="0" title="'+links[i].text+'"/>';
			break;
			case 'Enviar esta foto por email': // EMAIL IMAGE
			links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKESURBVDjLpZO7axRhFMV/38zsy+xuEt2Q50bYgChGUBAVxUbRRlS0sxJsbP0HFAQJ1jYqtlqYTlARNZoiPlELCxVd0LgxwcnuxmT2MfPN97BIxAcIggcu91EcLudwhLWW/4HDf8I7feXZw/Sq3JZqEHc0QuUYCwaLNhZjLdpajFneV8oidBy3FquVd+Wy19PdWTx5eF0+iq1Ip9zf2MWfs1ju7Ui57UgPHDsfhY6/pEpSGXHt4RyVqqQZWaZrhkrdMPPNMLdo8ANLtWmJNczUJBduzrHQjJxcT3HEaUZapBIOg/157r70+daI6c0LEi4kXUHSEyQ96MoIakuS8amvdK3Os6YrBSCcVqgAKPVlGerNc+eFz0IQU8g6JD1IutCZFtQDyfiUT2FNntJgFrFintMM9bKaLpQGsvR0r+L6ZIV6IOlMC3JpQS2QnL99gHcLhygNZMl4v9jYbC9/IASoWJH2DMODXdx67jNTDZmphtx46hNbxVBhAxcnRkl6P5X1WpHGAlIqvtYDir05kskElx8c4c19jTQKqRUD3SNs6NtOEDY5e2MtV0+UwQq8VqSsNlb4tYBiT45MOgEWlJHs23gcbQ3aaAyW2cUKm4Z20ZBtDl4s0Ofcs16z/uVTJNXa9UMZkc04QjgaBwiVRFvDdO0DsVEoExPrmKUoYHNxN424xfOPu/FkY35676k73alcR4eXcoXnuTiuoL8YekorevPDKKPR1jC3+JnV2T5eVR7xrFyOE2/PPRF/C9PRSyUdSok0klBJRgobnR2l/bz4/JiJ93dfS8W22TEbiX9N4+g5Z37r8J7C5PuJl9Kwc3bMSoB/JiidEfPauIW20Ql/zKof9+9pyFaERzUY+QAAAABJRU5ErkJggg==" width="16" height="16" border="0" title="'+links[i].text+'"/>';
			break;
			case 'MiniCards con tus fotos': // MINICARDS IMAGE
			links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADPSURBVCjPdZFNCsIwEEZHPYdSz1DaHsMzuPM6RRcewSO4caPQ3sBDKCK02p+08DmZtGkKlQ+GhHm8MBmiFQUU2ng0B7khClTdQqdBiX1Ma1qMgbDlxh0XnJHiit2JNq5HgAo3KEx7BFAM/PMI0CDB2KNvh1gjHZBi8OR448GnAkeNDEDvKZDh2Xl4cBcwtcKXkZdYLJBYwCCFPDRpMEjNyKcDPC4RbXuPiWKkNABPOuNhItegz0pGFkD+y3p0s48DDB43dU7+eLWes3gdn5Y/LD9Y6skuWXcAAAAASUVORK5CYII=" width="16" height="16" border="0" title="'+links[i].text+'"/>';
			break;
			case 'Denunciar esta foto': // IMAGES IMAGE
			links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIfSURBVDjLpZNNSJRRFIafc79v+r7RUKFGMrLRQgqqVUQWbYogaB8VGURQltDC2gS5iDA3UYugWha5iqBF4CIr6JegRUQSTEQ/JIo/pIw/83/vaTHjmDpF0Mu9i3N578v73nOuqCr/Ax+grev+VVuQIxMpG85kK7DcwjIaQE2U2w+uHOz0AayTtu72rbH6WExEfBTQ8j1BFVTnasUWchy/9OgYUBSYmLFBbGVMOq71srqxjsBzWA3A1GKE4jaCZ4QfiQEud54ib0XKEVJZMManZX0Tm1t34RkPVQvigwhGBBGDMYaIZ3Bu0RvMxQyCkDC6vOj3L9ByyEUC+VyGfCYNIqg6nFqcMwigqnhiKeRSqLqlDlRhPDnMz7EkeVfAqWUqO0rOrkFKnPpgkvRsEtRUFhgZrSIymJk/0BiqmTJ5kiiDg7p0DlyJb7xlGC+omLslcZfGgTtExr6S+HyBVrMzgAMLHfwJLYletk32sfHoSYLmTaQ/9FP98kn4eG/kjA+gziHA2PePFQW2v73OhtPnCL88gxfdVNXWsS4e590nLQ6SlJpzo6erXP2OoeeHCVc1w/6z89kvNuA5afIBaqIm6QqZ2oYqKbawJFhajMQaSL3vo/phB9n0CClgesrDegz7ANWBuXei5+mOVF63OLc0wp7o7jB88yqIr4jiexGmxwt8GzWquJvyr9/59aG152cnhts9K3Hr6ZDCrX39hZ5fKo7iczfDI18AAAAASUVORK5CYII=" width="16" height="16" border="0" title="'+links[i].text+'"/>';
			break;
			case ' anterior': // PREVIOUS IMAGE
			links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAVUExURafAfJe3U7i3rXSYO8LhZ+731P///1PyfCgAAAAHdFJOU////////wAaSwNGAAAAXElEQVR42rTRQRKAIAwDwJKo/38yMjqYlHrTHLMHaBvHS+JHIFkBGXtwgVGfyXDXGWbtILWB1greK7RN8wBc5A1QSX8FJZ9DKE8+ad3VRY3FdgcR5T0AfH3zLsAA+pYLw01OP5wAAAAASUVORK5CYII=" width="24" height="24" border="0" title="'+links[i].text+'"/>';
			break;
			case 'anterior': // PREVIOUS IMAGE
			links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAVUExURafAfJe3U7i3rXSYO8LhZ+731P///1PyfCgAAAAHdFJOU////////wAaSwNGAAAAXElEQVR42rTRQRKAIAwDwJKo/38yMjqYlHrTHLMHaBvHS+JHIFkBGXtwgVGfyXDXGWbtILWB1greK7RN8wBc5A1QSX8FJZ9DKE8+ad3VRY3FdgcR5T0AfH3zLsAA+pYLw01OP5wAAAAASUVORK5CYII=" width="24" height="24" border="0" title="'+links[i].text+'"/>';
			break;
			case 'próximo': // NEXT IMAGE
			links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAVUExURafAfJe3U7i3rXSYO8LhZ+731P///1PyfCgAAAAHdFJOU////////wAaSwNGAAAAV0lEQVR42qzRQRLAIAhDUSDV+x/ZOugUUtmZ5X/LSC8mtwHAESBNmBzaO6IPiCIkyhCIYVIBSxyeOC1AYSdQeCeY2foPQo6Q8gblvMDAef9hnK9+PgQYAPYcC8NkfEtbAAAAAElFTkSuQmCC" width="24" height="24" border="0" title="'+links[i].text+'"/>';
			break;
			case 'pr�ximo': // NEXT IMAGE
			links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAVUExURafAfJe3U7i3rXSYO8LhZ+731P///1PyfCgAAAAHdFJOU////////wAaSwNGAAAAV0lEQVR42qzRQRLAIAhDUSDV+x/ZOugUUtmZ5X/LSC8mtwHAESBNmBzaO6IPiCIkyhCIYVIBSxyeOC1AYSdQeCeY2foPQo6Q8gblvMDAef9hnK9+PgQYAPYcC8NkfEtbAAAAAElFTkSuQmCC" width="24" height="24" border="0" title="'+links[i].text+'"/>';
			break;
			case 'Borrar': // CROSS IMAGE 
			links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJdSURBVDjLpZP7S1NhGMf9W7YfogSJboSEUVCY8zJ31trcps6zTI9bLGJpjp1hmkGNxVz4Q6ildtXKXzJNbJRaRmrXoeWx8tJOTWptnrNryre5YCYuI3rh+8vL+/m8PA/PkwIg5X+y5mJWrxfOUBXm91QZM6UluUmthntHqplxUml2lciF6wrmdHriI0Wx3xw2hAediLwZRWRkCPzdDswaSvGqkGCfq8VEUsEyPF1O8Qu3O7A09RbRvjuIttsRbT6HHzebsDjcB4/JgFFlNv9MnkmsEszodIIY7Oaut2OJcSF68Qx8dgv8tmqEL1gQaaARtp5A+N4NzB0lMXxon/uxbI8gIYjB9HytGYuusfiPIQcN71kjgnW6VeFOkgh3XcHLvAwMSDPohOADdYQJdF1FtLMZPmslvhZJk2ahkgRvq4HHUoWHRDqTEDDl2mDkfheiDgt8pw340/EocuClCuFvboQzb0cwIZgki4KhzlaE6w0InipbVzBfqoK/qRH94i0rgokSFeO11iBkp8EdV8cfJo0yD75aE2ZNRvSJ0lZKcBXLaUYmQrCzDT6tDN5SyRqYlWeDLZAg0H4JQ+Jt6M3atNLE10VSwQsN4Z6r0CBwqzXesHmV+BeoyAUri8EyMfi2FowXS5dhd7doo2DVII0V5BAjigP89GEVAtda8b2ehodU4rNaAW+dGfzlFkyo89GTlcrHYCLpKD+V7yeeHNzLjkp24Uu1Ed6G8/F8qjqGRzlbl2H2dzjpMg1KdwsHxOlmJ7GTeZC/nesXbeZ6c9OYnuxUc3fmBuFft/Ff8xMd0s65SXIb/gAAAABJRU5ErkJggg==" width="16" height="16" border="0" title="'+links[i].text+'"/>'+links[i].text+'';
			break;
			case 'Bloquear': // MEMBER CROSS IMAGE
			links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKRSURBVDjLpZNrSNNRGIeVuaSLrW2NCozlSsrCvqifKrG1vyznRDLQMi9TsamsUCzvSWJKC0Ms0/I2hratmVbi3bLIysRZlgh9qFGuCKOF5KaonV9n+yAGokIHHs7hhd/zvofDcQHg8j8sW0wN2FpQJuVNl8u2QC3loEDMtUX7CYrXJDjrx8u6FcYlNVE83KbciOCiNISD9MDNRHaQf3lVQZWMgwYaVNNQqcwBF1dCBbhwlIczfpypVQWlgZvQVZUPS6cag7XpOBckQIZkB9IYEZIPcee02XL3FQU1scKfM98/YOpFFb72XseooRDm9quwmk3QKXdPvdOkrltRUBG9f8A6dBeTw0bY3+ooeufZatLhToLv8IpX2CZrYnsfTtXqVP6YHa7FzFirE/ubJrRk+sM3UHlfwNSsX1YgCNG586WNKZ7SPox9mYYhLwz6PLkTx/n5+G94Bj8BT1x3ni+u3vCPgH/c4OoRbIgXhg5g3GJHowXIGANSXgOJT4G4DkBTXolnMT7oFbPxgNlo7WDYuYuCAxH14ZKTahgHF1A9CqheESj7CZK6CWIfElwrqsRI5hHMtJeBjHfBps/AUJrvn55jbiqnYCR/38JkWzZu1rchvpN2pR0VjwhimglONREYw/fATsOokANZXKDECz/UQeiWsD45BaMFPsTaU4So5AYU99oQ3Qyc1hNEagkiagn66NjE1IKl61fhdlp3I07Be60qx5TjPa9QlMwHxPdDQUdPWELrCSGm6xIBGpq96AIr5bOShW6GZVl8BbM+xeNSbjF/V3hbtTBIMyFi7tlEwc1zIolxLjM0bv5l4l58y/LCZA4bH5Nc8VjuttDFsHLX/G0HIndm045mx9h0n3CEHfW/dpehdpL0UXsAAAAASUVORK5CYII=" width="16" height="16" border="0" title="'+links[i].text+'"/>'+links[i].text+'';
			break;
			case 'Más': // PLUS IMAGE
			links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJvSURBVDjLpZPrS5NhGIf9W7YvBYOkhlkoqCklWChv2WyKik7blnNris72bi6dus0DLZ0TDxW1odtopDs4D8MDZuLU0kXq61CijSIIasOvv94VTUfLiB74fXngup7nvrnvJABJ/5PfLnTTdcwOj4RsdYmo5glBWP6iOtzwvIKSWstI0Wgx80SBblpKtE9KQs/We7EaWoT/8wbWP61gMmCH0lMDvokT4j25TiQU/ITFkek9Ow6+7WH2gwsmahCPdwyw75uw9HEO2gUZSkfyI9zBPCJOoJ2SMmg46N61YO/rNoa39Xi41oFuXysMfh36/Fp0b7bAfWAH6RGi0HglWNCbzYgJaFjRv6zGuy+b9It96N3SQvNKiV9HvSaDfFEIxXItnPs23BzJQd6DDEVM0OKsoVwBG/1VMzpXVWhbkUM2K4oJBDYuGmbKIJ0qxsAbHfRLzbjcnUbFBIpx/qH3vQv9b3U03IQ/HfFkERTzfFj8w8jSpR7GBE123uFEYAzaDRIqX/2JAtJbDat/COkd7CNBva2cMvq0MGxp0PRSCPF8BXjWG3FgNHc9XPT71Ojy3sMFdfJRCeKxEsVtKwFHwALZfCUk3tIfNR8XiJwc1LmL4dg141JPKtj3WUdNFJqLGFVPC4OkR4BxajTWsChY64wmCnMxsWPCHcutKBxMVp5mxA1S+aMComToaqTRUQknLTH62kHOVEE+VQnjahscNCy0cMBWsSI0TCQcZc5ALkEYckL5A5noWSBhfm2AecMAjbcRWV0pUTh0HE64TNf0mczcnnQyu/MilaFJCae1nw2fbz1DnVOxyGTlKeZft/Ff8x1BRssfACjTwQAAAABJRU5ErkJggg==" width="16" height="16" border="0" title="'+links[i].text+'" style="border:0px !important;"/> más';
			break;
			case 'M�s': // PLUS IMAGE
			links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJvSURBVDjLpZPrS5NhGIf9W7YvBYOkhlkoqCklWChv2WyKik7blnNris72bi6dus0DLZ0TDxW1odtopDs4D8MDZuLU0kXq61CijSIIasOvv94VTUfLiB74fXngup7nvrnvJABJ/5PfLnTTdcwOj4RsdYmo5glBWP6iOtzwvIKSWstI0Wgx80SBblpKtE9KQs/We7EaWoT/8wbWP61gMmCH0lMDvokT4j25TiQU/ITFkek9Ow6+7WH2gwsmahCPdwyw75uw9HEO2gUZSkfyI9zBPCJOoJ2SMmg46N61YO/rNoa39Xi41oFuXysMfh36/Fp0b7bAfWAH6RGi0HglWNCbzYgJaFjRv6zGuy+b9It96N3SQvNKiV9HvSaDfFEIxXItnPs23BzJQd6DDEVM0OKsoVwBG/1VMzpXVWhbkUM2K4oJBDYuGmbKIJ0qxsAbHfRLzbjcnUbFBIpx/qH3vQv9b3U03IQ/HfFkERTzfFj8w8jSpR7GBE123uFEYAzaDRIqX/2JAtJbDat/COkd7CNBva2cMvq0MGxp0PRSCPF8BXjWG3FgNHc9XPT71Ojy3sMFdfJRCeKxEsVtKwFHwALZfCUk3tIfNR8XiJwc1LmL4dg141JPKtj3WUdNFJqLGFVPC4OkR4BxajTWsChY64wmCnMxsWPCHcutKBxMVp5mxA1S+aMComToaqTRUQknLTH62kHOVEE+VQnjahscNCy0cMBWsSI0TCQcZc5ALkEYckL5A5noWSBhfm2AecMAjbcRWV0pUTh0HE64TNf0mczcnnQyu/MilaFJCae1nw2fbz1DnVOxyGTlKeZft/Ff8x1BRssfACjTwQAAAABJRU5ErkJggg==" width="16" height="16" border="0" title="'+links[i].text+'" style="border:0px !important;"/> más';
			break;
			
//*********************************************************************************
// ENGLISH VERSION
//*********************************************************************************
			case 'Email this photo': // EMAIL IMAGE
			links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKESURBVDjLpZO7axRhFMV/38zsy+xuEt2Q50bYgChGUBAVxUbRRlS0sxJsbP0HFAQJ1jYqtlqYTlARNZoiPlELCxVd0LgxwcnuxmT2MfPN97BIxAcIggcu91EcLudwhLWW/4HDf8I7feXZw/Sq3JZqEHc0QuUYCwaLNhZjLdpajFneV8oidBy3FquVd+Wy19PdWTx5eF0+iq1Ip9zf2MWfs1ju7Ui57UgPHDsfhY6/pEpSGXHt4RyVqqQZWaZrhkrdMPPNMLdo8ANLtWmJNczUJBduzrHQjJxcT3HEaUZapBIOg/157r70+daI6c0LEi4kXUHSEyQ96MoIakuS8amvdK3Os6YrBSCcVqgAKPVlGerNc+eFz0IQU8g6JD1IutCZFtQDyfiUT2FNntJgFrFintMM9bKaLpQGsvR0r+L6ZIV6IOlMC3JpQS2QnL99gHcLhygNZMl4v9jYbC9/IASoWJH2DMODXdx67jNTDZmphtx46hNbxVBhAxcnRkl6P5X1WpHGAlIqvtYDir05kskElx8c4c19jTQKqRUD3SNs6NtOEDY5e2MtV0+UwQq8VqSsNlb4tYBiT45MOgEWlJHs23gcbQ3aaAyW2cUKm4Z20ZBtDl4s0Ofcs16z/uVTJNXa9UMZkc04QjgaBwiVRFvDdO0DsVEoExPrmKUoYHNxN424xfOPu/FkY35676k73alcR4eXcoXnuTiuoL8YekorevPDKKPR1jC3+JnV2T5eVR7xrFyOE2/PPRF/C9PRSyUdSok0klBJRgobnR2l/bz4/JiJ93dfS8W22TEbiX9N4+g5Z37r8J7C5PuJl9Kwc3bMSoB/JiidEfPauIW20Ql/zKof9+9pyFaERzUY+QAAAABJRU5ErkJggg==" width="16" height="16" border="0" title="'+links[i].text+'"/>';
			break;
			case 'MiniCards of your photos': // MINICARDS IMAGE
			links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADPSURBVCjPdZFNCsIwEEZHPYdSz1DaHsMzuPM6RRcewSO4caPQ3sBDKCK02p+08DmZtGkKlQ+GhHm8MBmiFQUU2ng0B7khClTdQqdBiX1Ma1qMgbDlxh0XnJHiit2JNq5HgAo3KEx7BFAM/PMI0CDB2KNvh1gjHZBi8OR448GnAkeNDEDvKZDh2Xl4cBcwtcKXkZdYLJBYwCCFPDRpMEjNyKcDPC4RbXuPiWKkNABPOuNhItegz0pGFkD+y3p0s48DDB43dU7+eLWes3gdn5Y/LD9Y6skuWXcAAAAASUVORK5CYII=" width="16" height="16" border="0" title="'+links[i].text+'"/>';
			break;
			case 'Permalink to this photo': // IMAGES IMAGE
			links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFRQTFRFl5iZlZaYq6ur+vv7q8TZ3uHj1uTrsMPv7fL37O7w9PX2qamp5ejpxtjktszd2NzfnrvS5+70ssrbjrHNydrllrDpubiwy87TcpXjbW1t////ubiw+Xea+wAAABx0Uk5T////////////////////////////////////ABey4tcAAAB8SURBVHjarNHbEoIgFIVhBFPL8JCCLnv/92zPrBq3UDeN/+X6uAHM80fmXEAWAXZLsiC49ni+dW+4oRlVjQyEK6pZVclAuMM/VF4GwgXdoOpkIPQoJ1UpA2FBWFVBhv+hDqp6h+J48+IDZkkyhJi/buSzx6zzv/ZrLwEGAJEcNanOlWB+AAAAAElFTkSuQmCC" width="16" height="16" border="0" title="'+links[i].text+'"/>';
			break;
			case ' previous': // PREVIOUS IMAGE
			links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAVUExURafAfJe3U7i3rXSYO8LhZ+731P///1PyfCgAAAAHdFJOU////////wAaSwNGAAAAXElEQVR42rTRQRKAIAwDwJKo/38yMjqYlHrTHLMHaBvHS+JHIFkBGXtwgVGfyXDXGWbtILWB1greK7RN8wBc5A1QSX8FJZ9DKE8+ad3VRY3FdgcR5T0AfH3zLsAA+pYLw01OP5wAAAAASUVORK5CYII=" width="24" height="24" border="0" title="'+links[i].text+'"/>';
			break;
			case 'previous': // PREVIOUS IMAGE
			links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAVUExURafAfJe3U7i3rXSYO8LhZ+731P///1PyfCgAAAAHdFJOU////////wAaSwNGAAAAXElEQVR42rTRQRKAIAwDwJKo/38yMjqYlHrTHLMHaBvHS+JHIFkBGXtwgVGfyXDXGWbtILWB1greK7RN8wBc5A1QSX8FJZ9DKE8+ad3VRY3FdgcR5T0AfH3zLsAA+pYLw01OP5wAAAAASUVORK5CYII=" width="24" height="24" border="0" title="'+links[i].text+'"/>';
			break;
			case 'next': // NEXT IMAGE
			links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAVUExURafAfJe3U7i3rXSYO8LhZ+731P///1PyfCgAAAAHdFJOU////////wAaSwNGAAAAV0lEQVR42qzRQRLAIAhDUSDV+x/ZOugUUtmZ5X/LSC8mtwHAESBNmBzaO6IPiCIkyhCIYVIBSxyeOC1AYSdQeCeY2foPQo6Q8gblvMDAef9hnK9+PgQYAPYcC8NkfEtbAAAAAElFTkSuQmCC" width="24" height="24" border="0" title="'+links[i].text+'"/>';
			break;
			case 'Delete': // CROSS IMAGE 
			links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJdSURBVDjLpZP7S1NhGMf9W7YfogSJboSEUVCY8zJ31trcps6zTI9bLGJpjp1hmkGNxVz4Q6ildtXKXzJNbJRaRmrXoeWx8tJOTWptnrNryre5YCYuI3rh+8vL+/m8PA/PkwIg5X+y5mJWrxfOUBXm91QZM6UluUmthntHqplxUml2lciF6wrmdHriI0Wx3xw2hAediLwZRWRkCPzdDswaSvGqkGCfq8VEUsEyPF1O8Qu3O7A09RbRvjuIttsRbT6HHzebsDjcB4/JgFFlNv9MnkmsEszodIIY7Oaut2OJcSF68Qx8dgv8tmqEL1gQaaARtp5A+N4NzB0lMXxon/uxbI8gIYjB9HytGYuusfiPIQcN71kjgnW6VeFOkgh3XcHLvAwMSDPohOADdYQJdF1FtLMZPmslvhZJk2ahkgRvq4HHUoWHRDqTEDDl2mDkfheiDgt8pw340/EocuClCuFvboQzb0cwIZgki4KhzlaE6w0InipbVzBfqoK/qRH94i0rgokSFeO11iBkp8EdV8cfJo0yD75aE2ZNRvSJ0lZKcBXLaUYmQrCzDT6tDN5SyRqYlWeDLZAg0H4JQ+Jt6M3atNLE10VSwQsN4Z6r0CBwqzXesHmV+BeoyAUri8EyMfi2FowXS5dhd7doo2DVII0V5BAjigP89GEVAtda8b2ehodU4rNaAW+dGfzlFkyo89GTlcrHYCLpKD+V7yeeHNzLjkp24Uu1Ed6G8/F8qjqGRzlbl2H2dzjpMg1KdwsHxOlmJ7GTeZC/nesXbeZ6c9OYnuxUc3fmBuFft/Ff8xMd0s65SXIb/gAAAABJRU5ErkJggg==" width="16" height="16" border="0" title="'+links[i].text+'"/>'+links[i].text+'';
			break;
			case 'Block': // MEMBER CROSS IMAGE
			links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKRSURBVDjLpZNrSNNRGIeVuaSLrW2NCozlSsrCvqifKrG1vyznRDLQMi9TsamsUCzvSWJKC0Ms0/I2hratmVbi3bLIysRZlgh9qFGuCKOF5KaonV9n+yAGokIHHs7hhd/zvofDcQHg8j8sW0wN2FpQJuVNl8u2QC3loEDMtUX7CYrXJDjrx8u6FcYlNVE83KbciOCiNISD9MDNRHaQf3lVQZWMgwYaVNNQqcwBF1dCBbhwlIczfpypVQWlgZvQVZUPS6cag7XpOBckQIZkB9IYEZIPcee02XL3FQU1scKfM98/YOpFFb72XseooRDm9quwmk3QKXdPvdOkrltRUBG9f8A6dBeTw0bY3+ooeufZatLhToLv8IpX2CZrYnsfTtXqVP6YHa7FzFirE/ubJrRk+sM3UHlfwNSsX1YgCNG586WNKZ7SPox9mYYhLwz6PLkTx/n5+G94Bj8BT1x3ni+u3vCPgH/c4OoRbIgXhg5g3GJHowXIGANSXgOJT4G4DkBTXolnMT7oFbPxgNlo7WDYuYuCAxH14ZKTahgHF1A9CqheESj7CZK6CWIfElwrqsRI5hHMtJeBjHfBps/AUJrvn55jbiqnYCR/38JkWzZu1rchvpN2pR0VjwhimglONREYw/fATsOokANZXKDECz/UQeiWsD45BaMFPsTaU4So5AYU99oQ3Qyc1hNEagkiagn66NjE1IKl61fhdlp3I07Be60qx5TjPa9QlMwHxPdDQUdPWELrCSGm6xIBGpq96AIr5bOShW6GZVl8BbM+xeNSbjF/V3hbtTBIMyFi7tlEwc1zIolxLjM0bv5l4l58y/LCZA4bH5Nc8VjuttDFsHLX/G0HIndm045mx9h0n3CEHfW/dpehdpL0UXsAAAAASUVORK5CYII=" width="16" height="16" border="0" title="'+links[i].text+'"/>'+links[i].text+'';
			break;
			case 'More': // PLUS IMAGE
			links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJvSURBVDjLpZPrS5NhGIf9W7YvBYOkhlkoqCklWChv2WyKik7blnNris72bi6dus0DLZ0TDxW1odtopDs4D8MDZuLU0kXq61CijSIIasOvv94VTUfLiB74fXngup7nvrnvJABJ/5PfLnTTdcwOj4RsdYmo5glBWP6iOtzwvIKSWstI0Wgx80SBblpKtE9KQs/We7EaWoT/8wbWP61gMmCH0lMDvokT4j25TiQU/ITFkek9Ow6+7WH2gwsmahCPdwyw75uw9HEO2gUZSkfyI9zBPCJOoJ2SMmg46N61YO/rNoa39Xi41oFuXysMfh36/Fp0b7bAfWAH6RGi0HglWNCbzYgJaFjRv6zGuy+b9It96N3SQvNKiV9HvSaDfFEIxXItnPs23BzJQd6DDEVM0OKsoVwBG/1VMzpXVWhbkUM2K4oJBDYuGmbKIJ0qxsAbHfRLzbjcnUbFBIpx/qH3vQv9b3U03IQ/HfFkERTzfFj8w8jSpR7GBE123uFEYAzaDRIqX/2JAtJbDat/COkd7CNBva2cMvq0MGxp0PRSCPF8BXjWG3FgNHc9XPT71Ojy3sMFdfJRCeKxEsVtKwFHwALZfCUk3tIfNR8XiJwc1LmL4dg141JPKtj3WUdNFJqLGFVPC4OkR4BxajTWsChY64wmCnMxsWPCHcutKBxMVp5mxA1S+aMComToaqTRUQknLTH62kHOVEE+VQnjahscNCy0cMBWsSI0TCQcZc5ALkEYckL5A5noWSBhfm2AecMAjbcRWV0pUTh0HE64TNf0mczcnnQyu/MilaFJCae1nw2fbz1DnVOxyGTlKeZft/Ff8x1BRssfACjTwQAAAABJRU5ErkJggg==" width="16" height="16" border="0" title="'+links[i].text+'"/> more';
			break;

		}		
				
	}

	},
	true);