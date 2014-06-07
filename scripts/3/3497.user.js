// ==UserScript==
// @name            StumbleUpon WYSIWYG Editor
// @namespace       http://www.jonasjohn.de/lab/swe/
// @description     This Greasemonkey script adds an WYSIWYG editor to StumbleUpon, so you can easily format your review's and comments.
// @include         http://www.stumbleupon.com/url/*
// @include         http://*.stumbleupon.com/edit/*
// @license         Modified BSD license (see http://www.jonasjohn.de/lab/swe/swe_0.7.user.js)
// @version	        0.7
// ==/UserScript==

(function(){

    /*
    - The icons embedded into this javascript code are made by:
      http://www.famfamfam.com/
      ( Icons License: http://creativecommons.org/licenses/by/2.5/)
    
    - The base parts of this editor are inspired by: 
      David Roth's - Cross-Browser Rich Text Editor (public domain)
      (URL: http://www.kevinroth.com/rte/demo.htm)
    */

    var swe_ver = '0.7';

    function swe_init(){
        if (document.getElementsByTagName('body')[0].id == 'swe_body'){
            swe_append_css();
        }
        else {
            swe_append_css();
            swe_append_editor();
            swe_add_toolbar_events();
        }
    }
    
    function swe_append_css(){
    
        var head = document.getElementsByTagName("head")[0];
        
        var style_tag = document.createElement("style");
        style_tag.setAttribute("type", 'text/css');
        style_tag.innerHTML = '#swe_editor { margin: 5px 0px 0px 0px; }';
        style_tag.innerHTML += '#swe_iframe { background-color: #fff; border: 1px solid #ccc; clear:both; margin: 3px 0px 5px 0px; }';
        style_tag.innerHTML += '.swe_toolbar { width: 100%; height: 23px; padding: 4px 0px 4px 2px; clear:both; background-color: #ECE9D9; }';
        style_tag.innerHTML += '.swe_toolbar a { font-family: Tahoma; font-size: 90%; padding: 2px 3px 0px 3px; text-align: center; height: 19px; margin-right: 2px; float: left; }';
        style_tag.innerHTML += '.swe_toolbar a:link, .swe_toolbar a:visited { text-decoration: none; color: black; background-color: #ECEADA; border-top: 1px solid #fff; border-left: 1px solid #fff; border-right: 1px solid #605B31; border-bottom: 1px solid #605B31; }';
        style_tag.innerHTML += '.swe_toolbar a:active, .swe_toolbar a:hover { text-decoration: none; color: black; background-color: #F8F7EF; border-top: 1px solid #605B31; border-left: 1px solid #605B31; border-right: 1px solid #fff; border-bottom: 1px solid #fff; }';
        style_tag.innerHTML += '.swe_tb_sel { padding: 1px 2px 1px 2px; background-color: #ECEADA; line-height: 20px; height: 20px; margin-right: 2px; float: left; }';
        style_tag.innerHTML += '.swe_tb_sel select { font-size: 90%; background-color: #fff; height: 20px; }';
        style_tag.innerHTML += '.swe_tb_spacer { padding: 1px; float: left; width: 5px; height: 20px; text-align: center; line-height: 20px; background-color: #ECE9D9; color: #ECE9D9; margin-right: 2px; }';
        style_tag.innerHTML += '.swe_source_code { background-color: #fff; font-family: Courier New; color: #222222; font-size: 80%; }';
        style_tag.innerHTML += '#swe_bt_submit { padding: 4px; font-family: Verdana; }';
        style_tag.innerHTML += '#swe_nodate { vertical-align: middle; }';        
        style_tag.innerHTML += '#swe_bt_return { display: none; }';        
        head.appendChild(style_tag);
        
    }
    
    function swe_append_editor(){
    
        var swe_height = GM_getValue('swe_height', 110);
    
        var par = document.getElementById('searchtext').parentNode;
        
        var current_content = document.getElementById('searchtext').value;
        document.getElementById('searchtext').style.display = "none";
        
        par.innerHTML = '';
        
        current_content = current_content.split("\r\n").join('<br>');
        current_content = current_content.split("\n").join('<br>');
        current_content = current_content.split("\r").join('<br>');
        
        var editorHTML = '<div id="swe_editor">';
         editorHTML += '<div class="swe_toolbar" id="swe_tb1" unselectable="on">';

        var uri = '<a href="javascript:void(0)" ';
        
        var b1 = '<a href="javascript:void(0)" onfocus="this.blur()" id="';
        var b2 = '"><img title="';
        var b3 = '" src="data:image/png;base64,';
        var b4 = '" /></a>';
         
        editorHTML += b1+'swe_bt_bold'+b2+'Bold'+b3+'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFxSURBVHjaYvz//z8DJQAggJgYKAQAAUSxAQABxILMqaioSABS+X///jX48+fPh9+/f0/49euXAZB2+Pnz5wYgu3DNmjUfkPUABBCKCzo6OhYANW74+vUrA1DxhSlTpjTOmjUr8MePHxuAhiR8//59P7oLAAKIBV0AqJEBaAjDv3//4GJAjQ9AgQ2kDdDVAwQQVgNghoCAn5+fAND5CVCDFqCrBwggDAOAimGGKPj6+tYD+QFA2xU+ffp04OTJk4no6gECCCMWgP4FGwBy9ubNmxt37dpl+OHDhwVMTEwO6urq5xUUFASQ1QMEEIYBQI0wA5DFCt+9e8fAzs5uALQgAVk9QABhNQDkDWQDrly58uHbt2/gcAHK8SOrBwggFmwGMDMzg2i4U2VkZAo4OTkZnj17BkobC5HVAwQQI3JesLW1TQA60R9oCyjkQbZdgAaoAShdAF0wEeiSB8gGAAQQI6WZCSCAKM4LAAFEsQEAAQYA/v7kD1fPn48AAAAASUVORK5CYII='+b4;
        editorHTML += b1+'swe_bt_italic'+b2+'Italic'+b3+'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD9SURBVHjaYvz//z8DJQAggJgYKAQAAUSxAQABxIJPMicnp+HXr18Fv3//5v/58+dHIPvCmjVrHJDVAAQQI6EwiI+PfwA0QP7Hjx+J69atW4AuDxBAeA2IjY01AGo+D9T8ccOGDQLY1AAEEF4vADUm/Pv3j+H79+8bcKkBCCBCBgT8/fsXrwEAAYTTC97e3mDnAzV/PHz4sAAuAwACCGc0AjUmgAz/9u3bBnyuBAggFjwGBEC9gdcAgADC6gVzc3MHoPj+z58/M1y/fp0RnwEAAYRhgKmpaQMw0TgAMQMIAxPPh2fPngXgMgAggBgpzUwAAURxXgAIIIoNAAgwALkuh0l+hysAAAAAAElFTkSuQmCC'+b4;
        editorHTML += b1+'swe_bt_underline'+b2+'Underline'+b3+'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEnSURBVHjaYvz//z8DJQAggJgYKAQAAcSCzKmoqEgAUv1ALPDv378JXV1dhTC5pKSk9b9+/Qr4+fNn4erVqyfAxAECiAHkBWRcXl6+v6Sk5D+6eGRkpEBwcPB5dHGAAMLwwp8/fxiANmE4ddmyZR++f//+AV0cIIBY0AVAmn///o3Vv0ADMMQAAgirAdhcgMsAgADCMAAYSGBMrAEAAYRhwI8fP0gyACCAmLAougDygpOTUwCyuKqqqgPQ8Avo6gECCJsBE798+QIK8XojIyMFkJiKigpIcz8QT0RXDxBAjNiSsrm5uQLQG/VADKJBgXoBSC98/fo1hgsAAoiR0rwAEEAYgaijo/Mfais4MEFpApY2QIkMiBmR1QMEEMUuAAgginMjQIABACL1xwJOsc67AAAAAElFTkSuQmCC'+b4;
        editorHTML += b1+'swe_bt_pre'+b2+'pre formatted text'+b3+'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAObSURBVHjaYvz//z8DCCSsfWwGpCYoCXBYfvv9jwGEf//7x/D9z7+PQPHPQPwGiP8C8XsgfgvEi4F4F0AAsTBAwb8/f8z1JXgsi+1FGZDB11//+L8B8fsff2V+/Qaa9PMvw4M3Xxi23/3qCpQuAAggZAPE+dgYwezHH/4ysDIyMrAAucxAFeysTAxy7EwMzExMDKzMDAyGMpwMUvzcQrNPPesFCCAmmAF/f//mY2H4z/DnH9CWX4wMH4G2ffjJwPDxBwS//c7A8OrLX7DayqWPGCwVuRl0RFhFAQII7oJfP/+IH3r8l+Hwi5cMmcZCDLOufmJg/f2fIcGAj4GHA2g7AyMDM9BFQPMZGP9+Yjhx7z3DuUcfnwEEENgFBu33hX4w8bsL8bIwMAJt/fbzP8O/X/8ZeLkYGWaf/Mjw6tNfhq8//zF8BQYs0JEMLz/9ZJi4+86nv79+JQAEEJN+6/0IHVXup+rSXPzv3v1hiDPiY/gDNNRbiZvhxbu/DLzcDAxzznxgOHj1C8OPP4wM/4AG/GX9y/Dn1y/FtdmmuwECiElTmXOmHC8zx/MPvxnSzXgZ2NmAjgW6S4iLhcFVjpvh5cc/DFLcjAwnn31j+PvnPwMo1v/8/Mnw99dPcIAABBDThTOf0u88//lDCBi8Mw59YHj54Q8DE9CdH77+Zth+/SODAAsTw4OXvxiMRTgY2FgZGX7//cvw5eu3P0AXfAIZABBATDd61FY8vHzL/Mb1Nwxs7IwMSw+8Aftz1ekPDHxcTAwfX/9iSLQUZrDU4WPgZAXGxpefQBf8ermj1gOcAgECCBwLXMyvfwkyAUPvEy/DX5AbgX74++cvw6dXfxlinUUZOIHeAhnKBXTN6/ffQc5/Bos9gABisS1YKgKkmy21ZRkinWQY9l7/xfDu81+GeFtxBg7W/wysQCtYgPpBZvBxMTDcefwNFIAvYQYABBALMCqcQYF+9vp9hvffWRi+AKPw99//DD9/MzL8AqaqP3//AUP+P4MQPz9DhpsEw4u3wMD89es1zACAAGIBpkAjfwc9zqpoC5Q8ADQDbNAvUJwC2VN3PGPgAobB5y/fQKn2LUwdQACBDLj/4s1HhiW7rzMI8HAyCPBxMAhwszPwAzEvFxswWpkY2IF+jwR6iR3ondfvPoMMeAIzACCAWICZaM2R0zdkgFgeyBeGYkEo5udgY2Xl4GBl4OMGGc7FcOnm41tA8aMwAwACDAByFXCQBTTJMQAAAABJRU5ErkJggg=='+b4;
        editorHTML += '<div class="swe_tb_spacer">|</div>';
        editorHTML += b1+'swe_bt_justifyleft'+b2+'Align left'+b3+'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADKSURBVHjaYvz//z8DJQAggJgYKAQAAUSxAQABxAJjlJeX///37x/Dnz9/4Pj3799w/OvXLzgNwnv37mUE6QMIIEZKwwAggOAuKCgo+I9uK7KNILxr1y5GdAMAAohiFwAEENwFqamp/3H5Fxu+desW2DUAAUSxCwACCO6CyMjI//hsBOHr169jhAFAAFHsAoAAgrvA29sbrwvQY+fz589g1wAEEMUuAAgguAtsbW3///z5E8VGdJs/fPiAEQYAAUSxCwACiOLMBBBgAAdL2BHiJ9uUAAAAAElFTkSuQmCC'+b4;
        editorHTML += b1+'swe_bt_justifycenter'+b2+'Align center'+b3+'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADWSURBVHjaYvz//z8DJQAggJgYKAQAAUSxAQABxAJjlJeX///37x/Dnz9/4Pj3799w/OvXLzgNwnv37mUE6QMIIEZKwwAggFiQOTk5OdlAW6ag24yGc44dOzYVpgcggCh2AUAAwV2Qmpr6H5d/seFbt26BwwAggCh2AUAAoYRBcHBwNtD0Kbhshboq59GjR/AwAAggil0AEEBwF3h7e//H52fkmAHhz58/g8MAIIAodgFAAKGEgZmZGTwMkGMDhqEpNOfHjx/wMAAIIIpdABBAFGcmgAADAHnW5BFNZ3kdAAAAAElFTkSuQmCC'+b4;
        editorHTML += '<div class="swe_tb_spacer">|</div>';
        editorHTML += b1+'swe_bt_ol'+b2+'Ordned list'+b3+'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFFSURBVHjaYvz//z8DJQAggJhARO6CJyqLj7wnyySAAAIbYKbCfZtcFwAEEAuIiLURZER2QUVFRTaQmvL371+GP3/+MPz+/Zvh169fYPrnz59g9po1axhBagECiBEUBnDN/4CG2QkykuICgABipDQQAQII7IV5B979//v3H8O+q59Vl+cp3iHFAIAAAgdikoMQ4+6Ln1VNlUkPTIAAArsguPuuirkG9+0ibzGw/+Pj47OBATUFFGDI+MePH3D2zZs3wWoBAggcBu0bXvz/DfTCb2AgNodKkRSIAAFEcSACBBDYCxXLn/z/BzTnH9AFPTEyJLkAIIDAgdgRKcMI0nzi9HtVUl0AEEAsMAZIs4WpICgWGI2NjbOBATUFlupANHJqBKVOIAa7FCCAwGFQsuQJOCBOn//YebBXu4IUFwAEEMWBCBBgAL8Mq+rgzBGiAAAAAElFTkSuQmCC'+b4;
        editorHTML += b1+'swe_bt_ul'+b2+'Unordned list'+b3+'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAErSURBVHjaYvz//z8DJQAggJgYKAQAAQQ2IHfBk4Jpu988ANGkGgAQQCwgQlOao0BBlE0eyAQZMKGioiIbSE/5+/cvw58/fxh+//7N8OvXLzD98+dPMHvNmjWMIL0AAcQACoOc+Y8Lpu56/QBEg/ikYIAAYqQ0EAECiOJABAggsAGpsx4XdG1+9SC09x7JgQgQQOBAVBJjLZARYpF/I8kBDsT4+PhsYEBNAQUYMv7x4wecffPmTXAgAgQQOCACOm4VlCx+/MC18hrJgQgQQBQHIkAAURyIAAEENsCu4HJBwvT7D2zyL5MciAABBAlEdZ4CAwVueEo0NjbOBgbUFFiqA9HIqRGUOoEYHIgAAQQ24M6NLxNAmqE0w9mzZ6cCqanEuAAggCgORIAAAwDBQ+FrH3DeWAAAAABJRU5ErkJggg=='+b4;
        editorHTML += '<div class="swe_tb_spacer">|</div>';
        editorHTML += b1+'swe_bt_fg'+b2+'Choose a text color'+b3+'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKfSURBVHjaYvz//z8DMeAOG2MKkIoHYnUg5gdiFiBmBAggFiI0TgdSQUAswhcXxsQkIsTAyM7GwMjExPCudQIDQACx4NEYA6Ta2I31ZDntLBmY+TgZWATZGBieH2dg5vzNwGbgysBVxMAAEEAsODTPBVKRfAkRnKxK0gxMny4zsLG8Z2BmYGJglIaoYWRlZGAC6gYIIBYsmlcDKX/BilxWNnFOBqY3exjYZFgZGIBO/g90xT8RXob//FwM/6UkGH7xGzMABBALFpv9haryWdlkOBhYP+1jYBJnZfgvwMXwT0qI4b8wNzDomCGKQTTQUIAAYkHzcyTYZqBmtm/7GRi5mBj+yQoz/JMRYmDgYGV4++c3w6n3HxjOf/3MICUsx9B64TQDQAAhu6AN5GeQs0E2gzUri4M1/2diZNj27g3Dzo/vGJ79/snwFxj1jgJ/GX78Y2AACCAWpKiSYVWUYmB6C3S2GDPc5i///zEsfP6M4eDnDwy/gRpFPjkz8H8zZJDm1GawuGXMABBAMBcECRSmM7KJszGw/WCG+BlqM0jz3k/vGTh/KjLIvQtmsFLSZ2AEwr//IAkQIIBYoClMBBTPTK/3AtMYEzjAQH4GORtkM0iz/s8MBlVglD5+9Znh9uMPDC/eff0J1HcRIIBALogHpTBQIgHFMyiqQKENCjCQn0HOBtkM0nz6+guG208+gDT6bekK2AVyAUAAgQxQByVPUAoDJRJQPIOiCBTaoAAD+RnkbLDNQM1AjRzIUQ8QQCAD+EFpG5Q8QQCUSEAAFFWg0AYFGMjPIGeDbEZPeAABBDKABZQxQGkblDxBKQzkAlA8g6IKFNqgAAP5GeZsZAAQQOAsCcpVoIwBStug5AlKYaBEAopnUFRBwUVs+QYgwAAr6NgNzGvAcgAAAABJRU5ErkJggg=='+b4;
        editorHTML += '<div class="swe_tb_spacer">|</div>';
        editorHTML += b1+'swe_bt_link'+b2+'Insert a link'+b3+'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAB3RJTUUH1gMMESsb5DRtOAAAAAlwSFlzAAAK8AAACvABQqw0mAAAAwBQTFRFc3Nze3t7hISEjIyMlJSUnJycpaWlra2txsbG1tbW3t7e////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////vEmmdgAAAAx0Uk5T//////////////8AEt/OzgAAAFJJREFUeNqdj0sKwDAIRCeJijL3v2/VNgS6zFsND7/gD9wKK/QIY0S46xZGU1URlxZaGCkdUkQxydEhxSyyHc03Q9aaYzj2Fn234NwhWQDc/vIA81YJF5D0gEsAAAAASUVORK5CYII='+b4;
        editorHTML += b1+'swe_bt_img'+b2+'Insert a Image'+b3+'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHpSURBVHjaYvz//z8DJQAggFhAREzN6t6/fxij3337y/HlJxZV/1C5nOwMDHycDPPXdYcXAgQQ2IC//xhjWtKNRcVERRkZGVkYQG76D9fHyAByJAhD+P8Z/v75xZDUtDMByCkECCCwAe++/GUXFRFlzOpbzCAlK8DAzvyP4e9/oDVM/AxMjAwQDCSYgfjRjcsMrYUZDL//MjKC9AIEENiAbz9BClgYVJUVGHQsbIAKmYE2/gVaDpQGqmMCYkZGJqAaJgZWZiaGf0heAgggFmRvsrNzMHBw8kDciwf8h3uSgQEggFAM+P3rB8PvH9/Btv7//4/hH9AV//4xMYDcCootZsa/DH9+fQPLwQBAAMENAFn6+uMzhrevPjL8/vcHrPnTz5cMv/7KgA0AATH29wzfv34EKmaCGwAQQCgGvHjJxcD6+AdC4L8okPoBV/yegZPh8WNU7wEEEAvM+SD1TMxsQMyO1//MrBwMyEYABBATsgvIAQABBHbBf2C8gPz56sFVghrAav57waMSIIBYIGkNEjlT22rgPNwgEIh/wXkAAQQ2gI+T6eO/Pz/4JbkYIVEINRCK0AAjwx9gUmZnZQRLAQQQ2ABudqaVqW17Lb/9/q/77x9hf7OzAjMUC8NCEBsggBgpzc4AAQYA0/KrVhZ6AGUAAAAASUVORK5CYII='+b4;
        editorHTML += b1+'swe_bt_rem_format'+b2+'Remove all formatings and HTML tags'+b3+'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKvSURBVHjaYvz//z8DJQAggFhwSZSUlPADDedUVVXlCwwM/MfJyfnn3r17v5YsWfL558+fvyZPnvwTpA4ggBixuQCome3v379hcnJycUxMTPpAthCQZmBnZ3/348ePi/fv318EFFs6derU/wABhNUF//79K5eRkSm1trbmFRMTY/j16xcDUAMDMzOz2JcvX1y/fv1q8fr1a0Wg0maAAGJC1rhx40bGdevWMfLz85eGhobyampqMgDZDGxsbCBDGbi4uBikpaUZPD09eYHsapAegAACu2DTpk3MQAXyQFukgJjNwMCA5+zZswzGxsYMfHx8YM0gr/7+/RvkCoaTJ08yCAoKsoP0AgQQC9TJ6kCNNX/+/HEAYh6gPxklJCQYTpw4AdbEwsIC9gZIM4hvaGjIsG/fPrCrAQKIZf369TxAzT06Ojqe4uLiDKysrAwfPnxguHz5MliBhoYGAyMjIzgMgIaD5UAYZCAIAAQQE1DQDRhQniAbv3//zgC0HexsCwsLBl5eXoa7d+8ycHNzgw0BhcHz58/h3gEBgABiAjIyFRUVGd6+fcvw+fNnhk+fPjEAQxqsARQGIANAGkDRCPICyGZkAwACCGSAKMiPjx8/BtsOwsBoYvj27RsDDw8P2MD379/DYwoWpTADAAKICSjwCKQBFGUg5125cgWsCSQGAsBUB8agmABhkEYQDQoPEAAIIJABK27dugW2TU9Pj8HIyAgcBiAAUgyyTUBAAB6VIG+AwgLmAoAAYsrOzl4GDPG1Bw8eBGsEYWC6Bys6duwYg4qKCgMoNYISEEjO1dUV7FKgC56BDAAIIBaov0KPHz++Fuj0QFDAwZy6YcOG/0CXMXZ3d4OdDMJAF/0G4mdAbAzSCxBAKJmpqKgoFqixFajwORB/BuKl84EAX3YGCDAAjKKGNeXpK5sAAAAASUVORK5CYII='+b4;
        editorHTML += '<div class="swe_tb_spacer">|</div>';
        editorHTML += b1+'swe_bt_forum'+b2+'Feedback'+b3+'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAL2SURBVHjaYvz//z8DOojs2CkEpCYDcQgQszFgB7uBOAsggFhwSM4PtFLyC7JWZmBhZsKqYOupB65L9t3cDhBALFhs5wFS3iG2KgyffzAw/Pzzn+H3XwaGv0CH/v0Hwv8ZGEEKzBQYjl9/oQIQQNhcICTCx8HMxMjI8PXXf7AmsAFAjQhDIAr5uNgYAAIIm/vevfn0A6j+PwMLE0TxH6DmP2AaghkYIOH25cdvBoAAgrsg1ViYhYeNqdZK9G/+Nc3S/2sOKzGAvAFyCQPQ0Y/f/2d49/U/gyQ/I4MYLxMoDBhuP/1wByCAGGGxUGErXCjP/63v2/9/DIxcwgx35VMY3glbAvUyMbgayjIkuWuB1X348pNh3dG7DLvPP74C5AYCBBDcBRIs39xEdRwZREUFGU6ePsvAfLyXgfM3M4OktPTi3QwTrLzMFJS3AW0FagQGLUPb8gr3ZpA+gACCG8AixP3KIiCRgZ/jP4OQgjbD9y8fGdgEJBiWXPin76gvo1w48/BXoLJaoMZ+5AADCCC4AYd+OV52fXD6v4i+DaOuni7Dz79MDBfPHv//lMVc+unFJ6lAjXOwpQeAAAIbIOG7nPnlc2eV0BevGZh/bmP4y8LDwMLwk+H6c3GGVWserRQSZZ3PUIE9xQEEEKOAx0rGz5+ZmksijCodI5WY9h87zvDrByPD7+8MDAb6Fgzntt/+O2P9yRYuri+Nn/dnYKR7gABi0eR6WGxjrVlt6KLIsOseA8NnAUuGn98YGIBmMOy9+p9B20iFOf71lbqbt28CRRm60A0ACCDGp93a/5/KZzAsZAhj+MotxvD323+GX0Dbf/8GJpq/jAxsn14zVCqtYRC4MolBqfY6I7oBAAHE9J1b4djNs6cYHh2/ycAEDBE2YELhEmFk4JdlZOATY2B4f+00w6OLRxl+C6kdwhYGAAHE8k9AwVfi1w+ZZ8eeBN+YtSWZg4NNkPE/I/P/v3//fv/5+7sA4+uF/Hqs85mE5Z5hMwAgwAC84hgmKZTBegAAAABJRU5ErkJggg=='+b4;
        editorHTML += b1+'swe_bt_help'+b2+'About this editor'+b3+'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMoSURBVHjaYvz//z8DJQAggFjQBYJn3lT+/e9P1P8//+J+/vot8ef/P4b/DP9eMDD8W/T3z79lhyqs7iKrBwggRmQXBMy4Hvzr1+/Jivz/Jc3kBRj42JjB4h+//2E4fPslw+VnX58zMP7PPdXovBamByCA4Ab4Tb8a/Ov774WuqlzcOtK8DE/f/mJ48fE7w99//xn4uZgZpPg5GG6/+cywfu/drwwsDPGnJviBDQEIILABvlMuK/3+/eewqwq3lLoEL8Op+x8Y/vz5zaAvL8jAAJQ/d/89AyMTI4O2JA/D4/efGTbsuv2M4f8/21Ozwu4BBBATyBSgn2MU+f5LaUjyMRy//Y7h1/dfDL9//mPwNZFk8DWVYvgNNOzXz18MV598YFAQ4WdQU+GT+v/9dwxIL0AAgQ349fdvrLmCMMP9F18Yfv/+DTTwL9DpfxjWHX/EsBaIf/3+xfDrzy+GL9+/Mzx4/YnBxkCegfHXr1iQXoAAAscC0EZpQV4WhtvPgU7/+5fh99/fQBf+Y4hxUGIAhdDx68/AfAYGRoYXbz8xqEnJMPz/+10apBcgAAnkdgIACIVQ23++BmiC/qJu9jiR4IegIv4FzDucZdzhoU3JRudS1bq1As4lT8tBeSKE5+EKICZIZPx9+vbrDwZhblZgLDGBDQMZAomh/0DNfxj+Ab32D+gVfm52hpefPjMwMv57CtIJEEAQA379WXzo6hMGeVFuYHoBOhXolEALBQZNOUEGLg5WhtxAfXDY/AFiRQl+hsOH74AMXgzSChBAkJT44/uS6zc+pytLCkiZqYkyHAEaturgTYbl+64x/Afa/h+cGv8zGKrLMjz48Inh3tXbz4C+WALSChBA8IRkmrwi+P/nHwu9gnS4lUR4GW48fM3w+t1nhn9//jEICXAxqMoKAzV/Ydi3Zv9XBkbW+FPry8AJCSCAUJKyafiCYIb/vyYra0tK2pgrMwjzsIHD4NXHHwyHjt1keHT19nNGRqbcU+vL4UkZIIAY0XOjWegM5f///0YBQzKO4d8PCSANDDBGYGZiWMTI8HvZyfXVKJkJIIAYKc3OAAEGAKg/gnuGVdP+AAAAAElFTkSuQmCC'+b4;
        editorHTML += b1+'swe_bt_update'+b2+'Check for a Update'+b3+'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAP2SURBVHjaYvz//z8DMsg/mmQLpHKB2BSIRYGYBYg/AvHJ///+T5tkO38HsnqAAGKEGQDUCFK4AIhDfGVd2AU5RRk+feNm+PaLgeHP3x8MfxheMux9vv3P3z9/d//58zdsrueKLyB9AAEENgComRXI3m8iom3tJuvI8OkHO8NPhl8Mdz4xMrD9Z2d4++0fw/8/vxg4Gb4xPP95mOHMszOX/vz+Y7csdMNHgABigrpkgZGwmrWNlAnDu7+/GH4zMTL8+cPE8P0PG1ALG8O7n+wMr35wMjz5yMogx2PGYCKhrvfr5+/lII0AAcT83vWRDZDuilbzYb7y9yvDc4bvDN///WH48oMHqJEV6BoGhttPPzN8/PqVgV3wLQMj/20GCxENhr3XTiktPrngIkAAgVxQ6C5lzvrqx1eGz0Cf/v0nwiD0V4Dh2htGhvefGRguPvzM8Iv9PQOL8mWG98JnGa7/fcZw7eUjhnBdJ2agK7IAAggUcKayfNIMF749Y3jNwcSgxazM8A9o0MNXvxh+/PjOwC/xn+GT0C6GO/8+MDD8/M8g8Ied4fbrnwwuCkYMv3/+0QUIIJABwlws3AwPgQa8+vmNgZdLieHDL16G9+//MfCL/mAQE/zG8PqvAYP0+WkMf4GufC2rwfDuAxcDDycvw+9ffwQAAogJGAuMjMCY/PXzE8P/b5IMLL//Mmw/8ZuBkYOT4fkdFobHj/gYpH5yMvz5/Z9BRkSTgf3OeYbfQJcxAGPvz58/jAABxPL3z793n359khZmFmDg5dBnePKaheHHb1YGyX9ZDPxcfxl+Pv3N8PnhHwZpIRUGTQlzhs9AV1x6so/h3Vd3BqDejwABxAKMz3MP3j2SVuGSZdjz4iiDAJcKAxuzLMOff78YXLXjGf7+/wcM2L/AcPnP8OzjYwZdGWuGL7++M1RvyAD6Xu06QAAxAf0xZd2Ng3/keUQZWL49Zfj49hiDoOBPhh/AhAPS/PDtbYb7b28x3H19jeHD97cMD9/dZTCQtWVQlTBm+Mx60QYggJjmea/cBYyObbuuHWSwlzZg4GfmZhDk+Qc0AJh8//5hEOeTY5Dgk2eQ5FdiYGXmZBDllWY49/gow/G7p74BkzkfQACBYgEYHb9jDty+cOTn91967oZ2DDdfsTBc/vOTYcHxHoZfQK+AXKMsosVgoeTGcPrhEYYDtw7+5Porp3mn7fZ3gACCZyaPqU68wPBY+ef3X9c460QWhr8SwIDmYmAEJmsR/k8MzduiGbQlLRgO3zrymfu/nNal1ltPQPoAAogRPTtbt5oHAnNc2t+//3T//f0nCBX++IH5isiffwys3//9ZX3V9v8PTD1AgAEAtq+8UF09hdsAAAAASUVORK5CYII='+b4;
        editorHTML += '</div><div class="swe_toolbar" unselectable="on">';
        
        editorHTML += '<a href="javascript:void(0)" onfocus="this.blur()" id="swe_bt_return">Return to WYSIWYG mode</a>';
        
        editorHTML += '<div class="swe_tb_sel"><select id="swe_sl_font">';
        editorHTML += '<option value="">- font face -</option>';
        
        var fonts = new Array(
            'Arial, Helvetica, sans-serif','Arial Black, Arial Black, Gadget, sans-serif',
            'Comic Sans MS, cursive', 'Courier New, Courier, monospace',
            'Impact, Charcoal, sans-serif','Lucida Console, Monaco, monospace',
            'Lucida Sans Unicode, Lucida Grande, sans-serif',
            'Palatino Linotype, Book Antiqua, Palatino, serif', 'Georgia, serif',
            'Tahoma, Geneva, sans-serif', 'Times New Roman, Times, serif',
            'Trebuchet MS, Helvetica, sans-serif','Verdana, Verdana, Geneva, sans-serif',
            'Century Gothic, sans-serif'
        );
        
        for (var f=0; f < fonts.length; f++){
            editorHTML += '<option style="font-family: '+fonts[f]+'" value="'+fonts[f]+'">'+fonts[f].split(',')[0]+'</option>';
        }
        editorHTML += '</select></div>';
        
        editorHTML += '<div class="swe_tb_sel"><select id="swe_sl_size">';
        editorHTML += '<option value="">- font size -</option>';
        editorHTML += '<option value="1">1</option>';
        editorHTML += '<option value="2">2</option>';
        editorHTML += '<option value="3">3</option>';
        editorHTML += '<option value="4">4</option>';
        editorHTML += '<option value="5">5</option>';
        editorHTML += '<option value="6">6</option>';
        editorHTML += '<option value="7">7</option>';
        editorHTML += '</select></div>';
        editorHTML += '<div class="swe_tb_spacer" id="swe_sp1">|</div>';
        editorHTML += b1+'swe_bt_source'+b2+'Toggle source view'+b3+'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGGSURBVHjaYvz//z8DJQAggJgYKAQAAUSxAQABRLEBAAGE1QCj3kf8xBoAEEAYBhh2PeSXEGLZHrn6xQeYWPyWNx98lrw4BpJDVw8QQCgGGLTfF5IQYt2uKcFm+f3zv3cw8W/f/73TlmC1BMnp1N0VQtYDEEBwA/Rb70foqHI/1ZRitbzz5Nf9G5c/28Lkbt36anvr+a/7IDldDe6nGoU3I2ByAAHECEoHeo332LTUuV4rCbLy3X/768/Z4x8sbk3WPItsk1bFbWN9PZ4TsrzMLHee//p0/uRH0ftztX8BBBDYBZfqlX5dOPMp/c7znz+EWJlYlJW4VivEX5aGadYouSWtJMexGiR3F6jm3NH36SDNIDmAAIJ74UaP2oozR99LX7725bisKKuimhr3YZicsjznYVlhVkWQ3JlD76UfLNRdAZMDCCCUQLw3W/vd/RtfPK9c+XKcjZURHlisTP+Frlz9ehwk93CJ3jtkPQABxEhpXgAIIIpTIkAAUWwAQABRbABAgAEArcWPQwcl/2MAAAAASUVORK5CYII='+b4;
        editorHTML += '<div class="swe_tb_spacer" id="swe_sp2">|</div>';
        editorHTML += b1+'swe_bt_smaller'+b2+'Make the editor smaller'+b3+'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFLSURBVHjaYvz//z8DJQAggJjwSZYczzhZeDjtCD41AAGE04DiY+kXRVnEzUTZxKwzd8adx6UOIIAY0b1QeiKT7d/ff1eBGlUUeJQY/v37x3DjzXWGh28e3fr967fussj1v5DVAwQQhgv+/vm79c/vPzJ//vxl+PPvD8Of/38YOJm5GH79+CUHxJvQ1QMEECOuQEzbGvPfSs6a4S/QBSfvnGR4++GN5drkbSfQ1QEEEAsuv/36+Zvh99+/DP/+/2V4/e41w/rU7SewqQMIIDwG/AIa8BtsANDpOGMBIIBwGwDUBAqDv0ADfuIxACCAcBrw8/tvsAv+EnABQADhdcFvoAv+/QO54DdOAwACCLcLQAb8/UMwDAACiGAYgAz4/RO3CwACCL8BoFgAwt+//uA0ACCA8KaD9Ws2MgBTJSh14jQAIIAYKc3OAAEGAOsSumJzCjTuAAAAAElFTkSuQmCC'+b4;
        editorHTML += b1+'swe_bt_bigger'+b2+'Make the editor larger'+b3+'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFKSURBVHjaYvz//z8DJQAggFhwSZSeyPwPMvzvn39A/JdhkuNcRmzqAAKICZcB//79Y7AQsmawFLVm+P3rN04XAAQQThf8/f2X4c+/P2CDfv/6g9MAgADCacDv338gBvz/x/Drxy+cBgAEEG4DfkIM+PsPZABuLwAEEE4Dfv38zfD771+gC/4y/MTjAoAAwmPAL6ABv8EG4PMCQADhNgCoCewFAi4ACCCcBvz8/hvsgr8EXAAQQFjTgc9UFwtOVk6G30AX/Pn7B+gC3IEIEEAYBnhPdt4BtHG/uLA40AV/wIZISUgx6OZpfNfMVN2Nrh4ggDAMAPrXD+j8R6/fvAGHAQj//v0bFK1PgAnKG109QAAx4spMJmV656WkpA3+AqPyzs27l27OuquPTR1AADHiy41aWWpH/vz+w3pr9j1zXGoAAoiR0uwMEGAAPCS3xw7PnegAAAAASUVORK5CYII='+b4;
        editorHTML += '<div class="swe_tb_spacer">|</div>';
        editorHTML += b1+'swe_bt_toggle'+b2+'Toogle dark/light stylesheet'+b3+'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJQSURBVHjaYvz//z8DJQAggFjQBVauXCkEpIqABnsDaUUgzQzEd4B4K5A/MTo6+jWyeoAAYkR2AVBzICcn52IjIyNuUVFRBjY2NrD4z58/GV69esVw5syZr1++fEmIi4tbA9MDEICGOTYBIAihIHqdXXolWJhF2IrNKAiKYPB3DS6Y8M2zg01EXlVFZmJmUFVwd5gZIgLdjYvBzCCi73dHAArmmAYAGAQC4KdspE7wg7QaqBtcIICJjYGUCrhbPxm8mfmKCIgImYkJMBGqCgMRETAzuDu6+6jq/vYJICaoQ4r09fVl2dnZGYAuAClg+Pv3LxjD2KtXr2aoqalh4ObmZhASEgKFTSlII0AAgQ0AKvIQExMD+xWk+M+fP3ADQOw1a9aAwgfMvnXrFgMPDw/I+R4gvQABxAQNBzOQ7d+/f4drhGGQzTDNINdcv36dAaQWyDYD6QUIIBZYQIIAsrNBGGTzqlWrwPIwcRgbpgcggGAuOAWyHRRt6DbDvAELC2VlZXAAA8EpEAEQQLAw2PHixQsGDg4OuGaQzchegYWLiooKAzBawXpAegECCOaCvnPnzj0GRdmdO3fgfkYPD29vb7BmYJTeB+rpBukFCCB4Spw7d679x48fDzx58oQBmCYYbty4wXDv3j0GFhYWBklJSQY1NTVwFAMTFsgLbps2bdoN0gcQQChJOSQkJBDIXwSMZx5QfMPCBCkxfQHKJ27evBmelAECiBE9NwYFBQkBxYqATG+gP7WA7O9A9n0g3gpkTwRqRslMAAHESGl2BggwAA+4vnoaTdfAAAAAAElFTkSuQmCC'+b4;

        // end editor!
        
        editorHTML += '</div>';
        
        editorHTML += '<iframe id="swe_iframe" name="swe_iframe" width="100%" height="'+swe_height+'" src="about:blank"></iframe>';
        editorHTML += '<iframe width="154" height="104" id="swe_color_chooser" src="about:blank" marginwidth="0" marginheight="0" scrolling="no" style="visibility:hidden; position: absolute;"></iframe>';
        editorHTML += '<input type="hidden" name="swe_str_tg" id="swe_str_tg" value="" />';
        editorHTML += '<input type="button" name="swe_bt_submit" id="swe_bt_submit" value="Save Changes" /> ';
        editorHTML += '<input name="nodate" checked="checked" id="swe_nodate" type="checkbox"> <span class="mini"><label for="swe_nodate">don\'t change the date</label></span>';
        editorHTML += '</div>';
        
        par.innerHTML = editorHTML + par.innerHTML;
    
        swe_set_content(current_content);
    }
    
    function swe_set_content(current_content){
    
        var cs1 = "<style type='text/css'>\n";
        
        if (GM_getValue('swe_color_sheme', 'light') == 'light'){ // light
            cs1 += "body { background-color: #ffffff; color: #333333; font-family: Arial; font-size: 13px; }\n";
            cs1 += "a:link { color: #ee0000 !important; text-decoration: none !important; }\n"
            cs1 += "a:visited { color: #440044 !important; text-decoration: none !important; }\n"
            cs1 += "a:hover, a:active { color: #ee0000 !important; text-decoration: underline !important; }\n"
        }
        else { // dark
            cs1 += "body { background-color: #222222; color: #dddddd; font-family: Arial; font-size: 13px; }\n";
            cs1 += "a:link { color: #ffff00 !important; text-decoration: none !important; }\n"
            cs1 += "a:visited { color: #999000 !important; text-decoration: none !important; }\n"
            cs1 += "a:hover, a:active { color: #ffff00 !important; text-decoration: underline !important; }\n"
        }
        cs1 += "\n</style>";
    
        var frameHtml = '<html><head>'+cs1+'</head><body id="swe_body" class="swe_content">'+current_content+'</body></html>';
        
        try {
            document.getElementById('swe_iframe').contentDocument.designMode = "on";
            try {
                var oRTE = document.getElementById('swe_iframe').contentWindow.document;
                oRTE.open();
                oRTE.write(frameHtml);
                oRTE.close();        

                // disable css styling:
                swe_cmd('styleWithCSS', false);

            } catch (e) {
                alert("swe: Error loading content.");
            }
        } catch (e) {
            return false;
        }
    }
    
    function swe_add_evt(i,f){
        document.getElementById('swe_bt_'+i).addEventListener('click', f, false);
    }
    
    function swe_add_toolbar_events(){
        swe_add_evt('bold', swe_cmd_bold);
        swe_add_evt('italic', swe_cmd_italic);
        swe_add_evt('underline', swe_cmd_underline);
        swe_add_evt('pre', swe_cmd_pre);
        swe_add_evt('justifyleft', swe_cmd_justifyleft);
        swe_add_evt('justifycenter', swe_cmd_justifycenter);
        swe_add_evt('ol', swe_cmd_ol);
        swe_add_evt('ul', swe_cmd_ul);
        swe_add_evt('fg', swe_cmd_fg);
        swe_add_evt('img', swe_cmd_add_img);
        swe_add_evt('link', swe_cmd_add_link);
        swe_add_evt('rem_format', swe_cmd_rem_format);
        swe_add_evt('forum', swe_cmd_forum);
        swe_add_evt('help', swe_cmd_about);
        swe_add_evt('update', swe_cmd_update);
        
        document.getElementById('swe_sl_font').addEventListener('change', swe_cmd_font, false);
        document.getElementById('swe_sl_size').addEventListener('change', swe_cmd_size, false);
        
        swe_add_evt('source', swe_cmd_show_source);
        swe_add_evt('return', swe_cmd_show_source);
        swe_add_evt('bigger', swe_cmd_bigger);
        swe_add_evt('smaller', swe_cmd_smaller);
        swe_add_evt('toggle', swe_cmd_toggle);
        swe_add_evt('submit', swe_bt_submit);
    }

    function swe_clean_html(str){
        str = str.replace(/<[^>]+>/g,"");
        //replace carriage returns and line feeds
        str = str.replace(/\r\n/g," ");
        str = str.replace(/\n/g," ");
        str = str.replace(/\r/g," ");
        str = str.replace(/  /g," ");
        return str;
    }
    
    function swe_hide(e){ document.getElementById(e).style.display='none'; }
    function swe_show(e){ document.getElementById(e).style.display='block'; }

    // commands:
    function swe_cmd_bold() { swe_cmd('bold', ''); }
    function swe_cmd_italic() { swe_cmd('italic', ''); }
    function swe_cmd_underline() { swe_cmd('underline', ''); }
    function swe_cmd_pre() { swe_cmd('formatblock', '<pre>'); }
    function swe_cmd_justifyleft() {swe_cmd('justifyleft', '');}
    function swe_cmd_justifycenter() { swe_cmd('justifycenter', ''); }
    function swe_cmd_ol() { swe_cmd('insertorderedlist', ''); }
    function swe_cmd_ul() { swe_cmd('insertunorderedlist', ''); }
    
    function swe_cmd_fg() { 
        var c = prompt("Which color?:\n(Examples: red, green, #FF00FF, etc.)", GM_getValue('swe_last_color', 'red'));				
        if (c) {
            GM_setValue('swe_last_color', c);
            swe_cmd('forecolor', c);
        }
        
    }

    function swe_cmd_add_link() {
        urlPath = prompt('Please enter a URL:', 'http://');				
        if ((urlPath != null) && (urlPath != "")) {
            swe_cmd('createlink', urlPath);
        }
    }
    
    function swe_set_range() {
        var oRTE = document.getElementById('swe_iframe').contentWindow;
        var selection = oRTE.getSelection();
        rng = selection.getRangeAt(selection.rangeCount - 1).cloneRange();
        return rng;
    }
    
    function swe_cmd_add_img() {
        imagePath = prompt('Enter a Image URL:', 'http://');				
        if ((imagePath != null) && (imagePath != "")) {
            swe_cmd('InsertImage', imagePath);
        }
    }

    function swe_cmd_show_source() { 

        var hiddenField = document.getElementById('swe_str_tg');
        var oRTE = document.getElementById('swe_iframe').contentWindow.document;

        if (hiddenField.value == ''){
    
            var c = swe_format_code(document.getElementById('swe_iframe').contentWindow.document.body, false);
            hiddenField.value = c;
                   
            var htmlSrc = oRTE.createTextNode(c);
            
            oRTE.body.innerHTML = "";
            oRTE.body.appendChild(htmlSrc);
            oRTE.body.className="swe_source_code";
        
            swe_hide('swe_bt_source');
            swe_hide('swe_tb1');
            swe_hide('swe_sl_font');
            swe_hide('swe_sl_size');
            swe_hide('swe_bt_toggle');
            swe_hide('swe_sp1');
            swe_hide('swe_sp2');
            
            swe_show('swe_bt_return');
        }
        else {
            var htmlSrc = oRTE.body.ownerDocument.createRange();
            
            htmlSrc.selectNodeContents(oRTE.body);
            
            oRTE.body.className="swe_content";
            oRTE.body.innerHTML = htmlSrc.toString();
            
            hiddenField.value = '';
            
            swe_show('swe_bt_source');
            swe_show('swe_tb1');
            swe_show('swe_sl_font');
            swe_show('swe_sl_size');
            swe_show('swe_bt_toggle');
            swe_show('swe_sp1');
            swe_show('swe_sp2');
            
            swe_hide('swe_bt_return');
        }

    }
     
    function swe_cmd_rem_format() {
        if (confirm("Warning:\nDo you really want to remove all formatings from currently selected block?")){
            swe_cmd('removeformat', '');
        }
    }
    
    function swe_cmd_font() {
        var elem = document.getElementById('swe_sl_font');
        var idx = elem.selectedIndex;
        if (idx != 0) {
            var selected = elem.options[idx].value;
            swe_cmd('fontname', selected);
            elem.selectedIndex = 0;
        }
    }
    
    function swe_cmd_size() {
        var elem = document.getElementById('swe_sl_size');
        var idx = elem.selectedIndex;
        if (idx != 0) {
            var selected = elem.options[idx].value;
            swe_cmd('fontsize', selected);
            elem.selectedIndex = 0;
        }
    }
    
    function swe_cmd(command, option) {
        // helpful: http://www.mozilla.org/editor/midas-spec.html
        var oRTE = document.getElementById('swe_iframe').contentWindow;
        try {
            oRTE.focus();
            oRTE.document.execCommand(command, false, option);
            oRTE.focus();
        } catch (e) {
            alert("swe: sorry, error 01");
        }
    }

    function swe_cmd_bigger() {
        var new_h = parseInt(document.getElementById('swe_iframe').height)+20;
        document.getElementById('swe_iframe').height = new_h;
        GM_setValue('swe_height', new_h);
    }
    
    function swe_cmd_smaller() {
        var new_h = parseInt(document.getElementById('swe_iframe').height)-20;
        document.getElementById('swe_iframe').height = new_h;
        GM_setValue('swe_height', new_h);
    }
    
    function swe_cmd_toggle() {
        var c = swe_format_code(document.getElementById('swe_iframe').contentWindow.document.body, false);
        if (GM_getValue('swe_color_sheme', 'light') == 'light'){ GM_setValue('swe_color_sheme', 'dark'); }
        else { GM_setValue('swe_color_sheme', 'light'); }
        swe_set_content(c);
    }
    
    function swe_cmd_forum() {
        window.open('http://www.jonasjohn.de/lab/swe/forum.php?v='+swe_ver, '_blank');
    }

    function swe_cmd_about() {
        window.open('http://www.jonasjohn.de/lab/swe/about.php?v='+swe_ver, '_blank');
    }
    
    function swe_cmd_update() {
        window.open('http://www.jonasjohn.de/lab/swe/update.php?v='+swe_ver, '_blank');
    }

    function swe_c(s,n){
        return (s.indexOf(n) != -1);
    }

    function swe_format_code(node, inside_pre) {
	
        // some parts of this function were made with 
        // the help of Vyacheslav Smolin's HTML2XHTML Converter
        // more info: ttp://html2xhtml.richarea.com
    
        var children = node.childNodes;
	    var child_length = children.length;
        var text = '';
        var tag_name;
    
        for (var i=0; i < child_length; i++) {
            
            var child = children[i];
            
            if (child.nodeType == 1){  //ELEMENT_NODE
            
                var tag_name = String(child.tagName).toLowerCase();
            
                if (tag_name != ''){
                
                    var curr_tag = '';
                    var attribs = '';
                    var end_tag = '';
                
                    curr_tag += '<'+tag_name;
                    
					//add attributes
					var attr = child.attributes;
					var attr_length = attr.length;
					var attr_value;
					
					for (j = 0; j < attr_length; j++) {
						
                        var valid_attr = true;
                        
                        var attr_name = attr[j].nodeName.toLowerCase();
                        
                        // ignore these:
						if (attr_name == '_moz_dirty' || attr_name == '_moz_resizing'){ continue; }
						if (tag_name == 'hr' && attr_name == 'style'){ continue; }
                            
                        try {
                            attr_value = child.getAttribute(attr_name, 2);
                        } catch (e) {
                            valid_attr = false;
                        }
                        
                        if (attr_name == 'type' && attr_value == '_moz'){ continue; }

                        if (valid_attr) {
                            if (!(tag_name == 'li' && attr_name == 'value')) {
                                attr_value = String(attr_value).replace(/\&/g, "&amp;").replace(/</g, "&lt;");
                                attr_value = attr_value.replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
                                
                                attribs += ' '+attr_name+'="'+attr_value+'"';
                            }
                        }
                    }
                        
                    if (tag_name == "span" || tag_name == "div"){ 
                    
                        var start_tg = '';
                        var end_tg = '';
                        var tgsx = '';
                        
                        if (swe_c(attribs,'text-align: center')){ start_tg += "<center>"; end_tg = "</center>" + end_tg; }
                        if (swe_c(attribs,'align="center"')){ start_tg += "<center>"; end_tg = "</center>" + end_tg; }
                        
                        if (swe_c(attribs,'font-family')){ 
                            var fontname = attribs.split('font-family:')[1].split(";")[0];
                            tgsx += " face=\""+fontname+"\""; 
                        }
                        
                        if (swe_c(attribs,'color:')){ 
                            var fontname = attribs.split('color:')[1].split(";")[0];
                            tgsx += " color=\""+fontname+"\""; 
                        }
                        
                        if (swe_c(attribs,'size="')){ 
                            var fontsize = attribs.split('size="')[1].split('"')[0];
                            tgsx += " size=\""+fontsize+"\""; 
                        }
        
                        if (tgsx != ''){
                            start_tg += '<font'+tgsx+'>';
                            end_tg = "</font>" + end_tg;
                        }
                        
                        text += start_tg;
                        end_tag = end_tg;
                        
                    }
                    else {
                        text += curr_tag + attribs + '>';
                        end_tag = '</'+tag_name+'>';
                    }
                        
                    if (child.canHaveChildren || child.hasChildNodes()){
                        text += swe_format_code(child, inside_pre || tag_name == 'pre' ? true : false);
                        text += end_tag;
                    }
                    else {
                    
                        if (tag_name == 'style' || tag_name == 'title' || tag_name == 'script') {
                            
                            var inner_text = '';
                            
                            if (tag_name == 'script') { inner_text = child.text;}
                            else {inner_text = child.innerHTML;}
                        
                            if (tag_name == 'style') {
                                inner_text = String(inner_text).replace(/[\n]+/g,'\n');
                            }
                        
                            text += inner_text+end_tag;
                        }
					}
                }
            }
            else if (child.nodeType == 3){ //TEXT_NODE
            
                if (!inside_pre) { //do not change text inside <pre> tag
                    if (child.nodeValue != '\n') {
                        text += String(child.nodeValue);
                    }
                }
                else {
                    text += String(child.nodeValue);
                }
            }
        }
        return text;
    }

    function swe_bt_submit() {
    
        // if the user is in source code mode toggle it back to wysiwyg
        if (document.getElementById('swe_str_tg').value != ''){
            swe_cmd_show_source();
        }
            
        var c = swe_format_code(document.getElementById('swe_iframe').contentWindow.document.body, false);
        
        if (c.length > 4000){
            alert("Warning!\nThe comment length must be smaller than 4000 characters!\nPlease make your comment smaller.");
            return false;
        }
                
        var f = document.getElementsByTagName('form')[1];
        
        if (document.getElementById('swe_nodate').checked){
            var tnd = document.createElement("input");
            tnd.setAttribute("name", 'nodate');
            tnd.setAttribute("checked", 'checked');
            tnd.setAttribute("type", 'checkbox');
            f.appendChild(tnd);
        }

        var tnc = document.createElement("input");
        tnc.setAttribute("name", 'newcomment');
        tnc.setAttribute("type", 'hidden');
        tnc.setAttribute("value", c);
        f.appendChild(tnc);
        
        document.getElementById('swe_bt_submit').disabled = true;
        
        document.getElementsByTagName('form')[1].submit();
        
    }

    // run!
    swe_init();
  
}) ();

// end of swe
// this was the work of two days...
// now i'm tired ;-)



