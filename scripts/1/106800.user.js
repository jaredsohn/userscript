// ==UserScript==
// @name    Images without opacity - Non-transparent images
// @description Same as title, plus fix trasparent images, created for white background
// @include *
// ==/UserScript==
  
// History
// 2011-07-14 : Created - proxy_M


//function xpath(query) {
//    return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
//}





function addStyle(style) {
    var head = unsafeWindow.document.getElementsByTagName("head")[0];
    var ele = head.appendChild(unsafeWindow.document.createElement( 'style' ));
    ele.type="text/css";
    ele.innerHTML = style;
    return ele;
}

addStyle(' img { opacity: 0.99 ! important;  filter: alpha(opacity=99) ! important;  zoom: 1 ! important; } ');




var body = unsafeWindow.document.getElementsByTagName('body')[0];
body.innerHTML = body.innerHTML.replace(/<img/g,'<canvas').replace(/<\/img/g,'</canvas');
///alert(1);
//alert(body.innerHTML);


    var canvases = unsafeWindow.document.getElementsByTagName('canvas');
    var count = canvases.length;


var not_finish = false;

var loaded_count = 0;

for (n=0; n<count; n++) {


    

    const canvas0 = canvases[n];///.wrappedJSObject;
    const src = canvas0.getAttribute ('src');
    canvas0.removeAttribute ('src');
    ///alert(src);
    canvas = canvas0.getContext('2d');
    ///alert(canvas);
    ///alert(src);
    if (src) {
        ////var img = new Image().wrappedJSObject;
        const img = unsafeWindow.document.createElement('img');

        /* window.wrappedJSObject.ttt = function (event) {

            /////////alert(33);
            ////window.clearInterval (interval);
            ///////////alert(44);
            /////////alert(img.src);

            ///////canvas.drawImage (img, 0, 0);
            canvas.fillStyle = 'white';
            //alert(1);
            canvas.fillRect (0, 0, img.width, img.height);
            //////////alert(img.width);
            canvas.drawImage (img, 0, 0);
            /////////alert(2);
            canvas.stroke();
            canvas.save()
            };*/

        ///alert(1);

        img.addEventListener("load",

                             function (event) {
                                 var img_target = event.target.wrappedJSObject;
                                 var canvas0_target = img_target.nextSibling;
                                 canvas_target = canvas0_target.getContext('2d');
                                 //alert(canvas0_target);
                                 

                                 loaded_count++;

                                 ////////alert(img.width);
                                 ////window.clearInterval (interval);
                                 ///////////alert(44);
                                 /////////alert(img.src);

                                 ///////canvas.drawImage (img, 0, 0);
                                 canvas_target.fillStyle = '#22EE88';//'#2288EE';//'#888888';
                                 //alert(1);
                                 canvas_target.fillRect (0, 0, img_target.width, img_target.height);
                                 //////////alert(img.width);
                                 canvas_target.drawImage (img_target, 0, 0);
                                 /////////alert(2);
                                 canvas_target.stroke();
                                 canvas_target.save();

                                 canvas0_target.parentNode.removeChild (img_target);

                                 /*if (loaded_count == count) {
                                     //alert("zero");

                                     

                                     }*/
                             }

                             ,false);


        img.setAttribute( 'src', src);
        canvas0.parentNode.insertBefore( img, canvas0);

        

        //alert(img.onload);
        //canvas.onload = function(){
        //alert(canvas.drawImage);
        /////alert(window.setInterval);
        ////////alert(window.setTimeout);

        // while (!(img.complete)) {///////// alert(30);
        //
        //    }

        //if (!(img.complete)) {
        //    not_finish=true;
        //    continue
        //}




        

    }
}








