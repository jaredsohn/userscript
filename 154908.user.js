// ==UserScript==
// @name           夜间浏览模式
// @description    夜间浏览模式
// @namespace      s896221565
// @auther		http://896221565.qzone.qq.com
// @version	0.0.1
// @description    减低页面的亮度, 在黑暗中查看页面有助于保护眼镜(?)
// @include        *
// ==/UserScript==
javascript:(function(){var newSS, styles='html,body,div,applet,object,h1,h2,h3,h4,h5,h6,p,blockquote,pre,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,th,td{background:#141619 !important;color:#B6AA7B !important;border-color:#A0A0A0 !important;}input,button,textarea,select,option,optgroup{background-color:#383838 !important;color:#B6AA7B !important;border-color:#A0A0A0 !important;}a,a *{color:#93BCEC !important; !important;}a:visited,a:visited *{color:#8080FF !important;background-color:#C0C0C0 !important;}'; if(document.createStyleSheet) { document.createStyleSheet("javascript:'"+styles+"'"); } else { newSS=document.createElement('link'); newSS.rel='stylesheet'; newSS.href='data:text/css,'+escape(styles); document.getElementsByTagName("head")[0].appendChild(newSS); } })();