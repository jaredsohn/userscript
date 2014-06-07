// ==UserScript==
// @name           Google 検索窓を複製
// @namespace      http://userscripts.org/users/347021
// @version        2.1.0
// @description    インスタント検索無効時、検索窓をページ下部にも表示
// @include        http://www.google.*/search*
// @include        https://www.google.*/search*
// @run-at         document-start
// @grant          none
// @updateURL      https://userscripts.org/scripts/source/117208.meta.js
// @icon           data:image/vnd.microsoft.icon;base64,AAABAAEAMDAAAAEAIACoJQAAFgAAACgAAAAwAAAAYAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAADQAAAB0AAAAyAAAAPgAAAEQAAABGAAAARgAAAEYAAABGAAAARgAAAEYAAABGAAAARgAAAEYAAABGAAAARgAAAEYAAABGAAAARgAAAEYAAABGAAAARgAAAEYAAABGAAAARgAAAEYAAABGAAAARgAAAEYAAABGAAAARgAAAEYAAABGAAAARgAAAEYAAABGAAAAQwAAADwAAAAsAAAAGgAAAAsAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAASAAAALAAAAEoAAABjAAAAdQAAAH8AAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAfgAAAHIAAABdAAAARQAAACcAAAAPAAAAAgAAAAAAAAAAAAAAAgAAABUAAAA3AAAAYBsbG45lZWXFe35/24ODg+CCg4PggoOD4IKDg+CCg4PggoOD4IKDg+CCg4PggoOD4IKDg+CCg4PggoOD4IKDg+CCg4PggoOD4IKDg+CCg4PggoOD4IKDg+CCg4PggoOD4IKDg+CCg4PggoOD4IKDg+CCg4PggoOD4IKDg+CCg4PggoOD4IKDg+CCg4Pgg4OD4Ht8fNhYWFi5DA4OhAAAAFgAAAAxAAAADgAAAAIAAAABAAAACgAAAC4AAABeS05OqpKUlOuxs7T/zMzN/8/Q0f/Ozs//zc7P/83Oz//Nzs//zc7P/83Oz//Nzs//zs7P/87Oz//Ozs//zs7P/83Oz//Ozs//zs7P/87Oz//Ozs//zs/P/87Pz//Nzs//zc7P/83Oz//Nzs//zc7P/83Oz//Nzs//zc7P/83Oz//Nzs//zc7P/83Oz//Q0NH/z9DR/8bHyP+nqKj8i4yN5Do6OpoAAABVAAAAIgAAAAcAAAACAAAAFwAAAEpaWl2qpaan+cLDxP/Iycr/u7y9/7S1tv+xsrP/sLGy/7Cxsv+wsbL/sLGy/7Cxsv+wsbL/sLGy/7Cxsv+wsbL/sLGy/7Cxsv+wsbL/sLGy/7Cxsv+wsbL/sLGy/7Cxsv+wsbL/sLGy/7Cxsv+wsbL/sLGy/7Cxsv+wsbL/sLGy/7Cxsv+wsbL/sLGy/7Cxsv+xsrP/tba3/76/wP/Ky8z/u7y9/5ubnPBLS02ZAAAAOAAAABMAAAAHAAAAIkdHSYGfoKHxwsPE/8TFxv+vsLH/rK2u/6ytrv+sra7/rK2u/6ytrv+sra7/rK2u/6ytrv+sra7/rK2u/6ytrv+sra7/rK2u/6ytrv+sra7/rK2u/6ytrv+sra7/rK2u/6ytrv+sra7/rK2u/6ytrv+sra7/rK2u/6ytrv+sra7/rK2u/6ytrv+sra7/rK2u/6ytrv+sra7/rK2u/6ytrv+0tbb/x8jJ/72+v/+Xl5jkHh4eXAAAAB4AAAALAAAAMoyMjcXCwcP/w8PE/7Cwsf+urq//rq+w/66vsP+ur7D/rq+w/66vsP+ur7D/rq+w/66vsP+ur7D/rq+w/66vsP+ur7D/rq+w/66vsP+ur7D/rq+w/66vsP+ur7D/rq+w/66vsP+ur7D/rq+w/66vsP+ur7D/rq+w/66vsP+ur7D/rq+w/66vsP+ur7D/rq+w/66vsP+ur7D/rq+w/66vsP+urq//tbW2/8XFxv+5ubr/ZmZmlAAAACsAAAALNzc3SqOjpeXKysv/t7e4/6+vsP+wsLH/sLCx/7Cwsf+wsLH/sLCx/7Cwsf+wsLH/sLCx/7Cwsf+wsLH/sLCx/7Cwsf+wsLH/sLCx/7Cwsf+wsLH/sLCx/7Cwsf+wsLH/sLCx/7Cwsf+wsLH/sLCx/7Cwsf+wsLH/sLCx/7Cwsf+wsLH/sLCx/7Cwsf+wsLH/sLCx/7Cwsf+wsLH/sLCx/7Cwsf+wsLH/sLCx/729vf/Gxsb/j4+SxBMTEzcAAAAMUFZWVrCxsfPExMT/s7S0/7Gysv+xsrL/sbKy/7Gysv+xsrL/sbKy/7Gysv+xsrL/sbKy/7Gysv+xsrL/sbKy/7Gysv+ws7P/sbW1/7G2tv+xtrb/sba1/7C2tf+xtrb/sLW1/7G0tP+xsrL/sbKy/7Gysv+xsrL/sbKy/7Gysv+xsrL/sbKy/7Gysv+xsrL/sbKy/7Gysv+xsrL/sbKy/7Gysv+xsrL/sbKy/7a3t//ExcX/oqOk2yYmJj0AAAALWlpaW7a3uPnAwMH/s7S1/7OztP+zs7T/s7O0/7OztP+zs7T/s7O0/7OztP+zs7T/s7O0/7OztP+ys7X/srS2/7e7vP+6tbX/sKam/6mbmf+rlZL/rJaP/6iWkP+qlZT/up6i/7a0t/+0urv/srW2/7KztP+ztLX/s7O0/7OztP+zs7T/s7O0/7OztP+zs7T/s7O0/7OztP+zs7T/s7O0/7OztP+zs7T/s7O0/7W2t//BwcL/qaut5SwsLEAAAAALXFxcW7a3t/m/wMD/tbW2/7W1tv+1tbb/tbW2/7W1tv+1tbb/tbW2/7W1tv+1tbb/tbW1/7W1tf+1uLn/vbKv/6d7dv+pUlD/uUZG/8hERP/LPj3/xj08/708PP+5Oj7/wkNM/7BZW/+rd3b/uKyp/7a7vP+0trb/tbW2/7W1tf+1tbb/tbW2/7W1tv+1tbb/tbW2/7W1tv+1tbb/tbW2/7W1tv+1tbb/tbW2/7a2t/+/wMD/q62t5TAwMEAAAAALXFxfW7e3uPm/v8D/t7e4/7e3uP+3t7j/t7e4/7e3uP+3t7j/t7e4/7e3uP+3uLj/ubu7/7i5uv/CpKX/pFNQ/6YwLf+9Ly7/yzoy/9ZBN//hTkH/32JP/9VwW//QcmL/z2lg/9JOSf/AQD7/pEhF/6+Cf/+8uLf/tLm5/7W4uf+3t7j/t7e4/7e3uP+3t7j/t7e4/7e3uP+3t7j/t7e4/7e3uP+3t7j/t7e4/7e3uP/AwMD/rq6v5TAwMEAAAAALX19fW7e3t/nAwMD/uLm5/7i5uf+4ubn/uLm5/7i5uf+4ubn/uLm5/7i5uf+4urr/ub6//86nov/CUk7/uTo7/84+Q//WPUf/xVFP/8aHfP/QsqT/yL+3/8O9uf++vLj/ur25/8q5t//Onp7/yGNl/643NP+mbF//s7Wv/7e7u/+4ubn/uLm5/7i5uf+4ubn/uLm5/7i5uf+4ubn/uLm5/7i5uf+4ubn/uLm5/7i5uf/AwMD/rq+v5TAwMEAAAAALX19fW7e3uPnAwcH/uru7/7q7u/+6u7v/uru7/7q7u/+6u7v/uru7/7q7u/+5u7v/wMLB/8xvZ//ROzb/zEVC/8Q9Qv/FYWL/0a6n/8DDvf+5vLz/uru8/728vv+8vb7/vb++/7y+vf+7v7//zbu4/9p8c/+qLCv/nG5q/7O6uP+7vLz/uru8/7q7u/+6u7v/uru7/7q7u/+6u7v/uru7/7q7u/+6u7v/uru7/7q7u//AwMH/rq+v5TAwMEAAAAALZWVlW7e4uPnCwsP/vL29/7y9vf+8vb3/vL29/7y9vf+8vb3/vL29/7y9vf+7vr//w7ay/+hsYv/kSUD/xzw4/69HR/+8rJ7/vr+4/7u/u/+6v77/vL6+/8DAwf/AwMH/v8C//77Bvv+5v8D/t8PC/9S3sP/dXFv/jyUm/5mQiP+7vr3/vb2+/7y9vf+8vb3/vL29/7y9vf+8vb3/vL29/7y9vf+8vb3/vL29/7y9vf/BwcL/sLCw5TQ0NEAAAAALZWVoW7m5u/nDw8T/v7/A/7+/wP+/v8D/v7/A/7+/wP+/v8D/v7/A/7+/wP+9wML/yLe1//WVh//tZFj/tzAw/6BgXv+vt7D/wLm5/8C/wP+/wMH/wMDB/8HAwv/BwcH/u8K+/7vDwP+/wcP/vMHF/8nCu//deG//pyoo/4pSTf+4v73/wMDB/7+/wP+/v8D/v7/A/7+/wP+/v8D/v7/A/7+/wP+/v8D/v7/A/7+/wP/Dw8T/sbGy5TQ0NEAAAAALaGhoW7u7u/nDxMT/wMHB/8DBwf/AwcH/wMHB/8DBwf/AwcH/wMHB/8DBwf+/wcL/yL++/+qyov/gfm3/sCwv/45uav+5rrL/wrS3/8PBwv/ExMT/w8PE/8PDxP/Cw8L/v8TA/8DFwv/Ew8X/w8TF/8vBtv/RbWD/uTMu/386NP+zurn/wsPD/8DBwf/AwcH/wMHB/8DBwf/AwcH/wMHB/8DBwf/AwcH/wMHB/8DBwf/DxMT/srKy5TQ0NEAAAAALaGhoW7y8vfnGxsf/w8PE/8PDxP/Dw8T/w8PE/8PDxP/Dw8T/w8PE/8PDxP/Cw8T/x8XG/+S3pv/nln7/tjw5/4ZSUf/IrbH/t7Gx/8C9u//FxML/xsXF/8bGxf/Fxsb/x8bF/8fGxf/Fxcb/ycrG/9OgkP/TTEH/vzUt/3s9N/+3vLz/xcXG/8PDxP/Dw8T/w8PE/8PDxP/Dw8T/w8PE/8PDxP/Dw8T/w8PE/8PDxP/Gxsf/s7O25TQ0NEAAAAALaGhoW76+wPnIyMn/xcXG/8XFxv/Fxcb/xcXG/8XFxv/Fxcb/xcXG/8XFxv/Fxcb/xMbI/+DEuP/2oor/12xe/5oxMv+tkI3/vrWz/72zsv/Bubb/v8C8/73Ev//CxcT/x8bG/8bFxf/FxcT/xpyW/8RSS//fQzn/uDQr/5JNSf/Fxsj/xsbH/8XFxv/Fxcb/xcXG/8XFxv/Fxcb/xcXG/8XFxv/Fxcb/xcXG/8XFxv/IyMn/t7e45TQ0OEAAAAALaGhoW8LCw/nLy8z/yMjJ/8jIyf/IyMn/yMjJ/8jIyf/IyMn/yMjJ/8jIyf/IyMn/x8jJ/8zLyv/kv7H/95iH/9NbVP+cRT//uoiC/760q/+0u7P/v7m4/8m5vP/Gu77/wLy+/8y+tf/IjIr/wEhN/84+Q//URkX/pDAq/7J7c//Lzc7/yMjJ/8jIyf/IyMn/yMjJ/8jIyf/IyMn/yMjJ/8jIyf/IyMn/yMjJ/8jIyf/Kysv/urq65Tg4OEAAAAALaGhoW8PExPnMzc3/ycrK/8nKyv/Jysr/ycrK/8nKyv/Jysr/ycrK/8nKyv/Jysr/ycrK/8nKy//MzMv/3cS6/+aelf/XXV//wjk//75QUv/AenX/wJKN/8Cak//Co5r/up+V/7FkYv+yOT3/ukJC/8ZISP/QOT//sUtK/9C/vP/Jy8v/ycrK/8nKyv/Jysr/ycrK/8nKyv/Jysr/ycrK/8nKyv/Jysr/ycrK/8nKyv/LzMz/urq65Tg4OEAAAAALampqW8XGxvnP0ND/zM3N/8zNzf/Mzc3/zM3N/8zNzf/Mzc3/zM3N/8zNzf/Mzc3/zM3N/8zNzf/Lzc3/y83N/9LPzf/msbH/5YiI/9BkZv/IS1L/w0RJ/75AQP+1PTj/pzcw/68yNv/IQkP/2UhH/9NCQv/DRkv/0qSm/8zOzv/Mzc3/zM3N/8zNzf/Mzc3/zM3N/8zNzf/Mzc3/zM3N/8zNzf/Mzc3/zM3N/8zNzf/O0ND/u7y85Tg4OEAAAAALamptW8fIyPnR0tL/zs/P/87Pz//Oz8//zs/P/87Pz//Oz8//zs/P/87Pz//Oz8//zs/P/8/P0P/Pz9D/z8/Q/87P0P/O0tL/zNPR/9LPzP/ZvL3/3qyv/+KnpP/MV0z/yEg9/9FHRv/SSUn/0kJB/9dQUv/Wr6//0NLT/8/Q0P/Pz9D/zs/P/87Pz//Oz8//zs/P/87Pz//Oz8//zs/P/87Pz//Oz8//zs/P/87Pz//R0tL/wMDB5Tg4OEAAAAALbW1tW8rKy/nU1NX/0dHS/9HR0v/R0dL/0dHS/9HR0v/R0dL/0dHS/9HR0v/S0tP/0tLT/9LS0//S0tP/0tLT/9LS0//S0tP/0tLT/9HT1P/R1db/0NfZ/+G9uv/vb2v/5FFJ/9FKSP+8RkT/xGVj/9i6uf/U1db/0tLU/9LS0//S0tP/0tLT/9LS0//S0tP/0dHS/9HR0v/R0dL/0dHS/9HR0v/R0dL/0dHS/9HR0v/U1NX/wsLD5Tg4OEAAAAALbW1tW8zMzfnW1tf/09PU/9PT1P/T09T/09PU/9PT1P/U1NT/1NTV/9TU1f/U1NX/1NTV/9TU1f/U1NX/1NTV/9TU1f/U1NX/1NTV/9TV1v/V2Nr/1tra/96Wlv/7a2j/3lFI/7pCPP+5ZGL/2cjG/9TX2P/U1dX/1NTV/9TU1f/U1NX/1NTV/9TU1f/U1NX/1NTV/9TU1P/U1NT/09PU/9PT1P/T09T/09PU/9PT1P/W1tf/xMTE5Tg4OEAAAAALbW1tW8/Pz/nZ2dn/1tbW/9bW1v/W1tb/1tbW/9fX1//Y2Nj/2NjY/9jY2P/Y2Nj/2NjY/9jY2P/Y2Nj/2NjY/9jY2P/X2Nj/293d/97b2f/U0Mz/28XF/+eKj//yenb/zFxP/6k9N//GqqD/2NjW/9zX2f/Y2Nj/2NjY/9jY2P/Y2Nj/2NjY/9jY2P/Y2Nj/2NjY/9jY2P/Y2Nj/19fX/9bW1v/W1tX/1tbW/9bW1v/Z2dn/xcXF5Tg4OEAAAAALc3NzW9HR0fnb29v/2NjY/9jY2P/a2tr/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vc3P/f2Nf/yqSh/6ZvYv+gW0v/0mJh//KJkP/upqH/7IN6/7lDRv+/ko3/0djQ/9rV1P/c29v/29vb/9vd2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//a2tr/2NjY/9jY2P/b29v/yMjI5Tw8PEAAAAALc3Z2W9PU1Pnd3t7/2tvb/9zd3P/d3t7/3d7e/93e3v/d3t7/3d7e/93e3v/d3t7/3d7e/93e3v/d3t7/3eDg/+HW1/+7eX7/qEE9/6k6Mf+1QTb/1VxX/96fk//cwrD/7auZ/+Jsb/+sTlD/up6Z/9DTzf/V19X/4t7e/93e3v/d3t7/3d7e/93e3v/d3t7/3d7e/93e3v/d3t7/3d7e/93e3v/d3t7/3N3c/9rb2//d3t7/ysvL5Tw8PEAAAAALdnZ2W9TV1fng4OH/39/g/9/g4f/f4OH/3+Dh/9/g4f/f4OH/3+Dh/9/g4f/f4OH/3+Dh/9/g4f/g4uL/4tzc/9aJif/IR0z/xU9R/8dLUP/KaWr/4rXA/+LZ3//g4N3/3+Da/+m9tP/UbG7/nkFE/6x9e//SysX/3dra/9/g4f/f4OH/3+Dh/9/g4f/f4OH/3+Dh/9/g4f/f4OH/3+Dh/9/g4f/f4OH/3+Dh/97f3//f4OD/zM3N5Tw8PEAAAAALdnZ2W9bV1vnk5OX/4+Pj/+Pj4//j4+P/4+Pj/+Pj4//j4+P/4+Pj/+Pj4//j4+P/4+Pj/+Pj4//k5OX/4rSt/9hQS//cXFX/z1RX/8FbZP/asrn/3uPm/+Pj5P/l4OX/4uPl/9/o4v/vs7L/2Vpg/5YtMv+uk47/ztLQ/+Li4//j4+P/4+Pj/+Pj4//j4+P/4+Pj/+Pj4//j4+P/4+Pj/+Pj4//j4+P/4+Pj/+Pj4//j4+T/zc3O5Tw8PEAAAAALdnZ2W9ra2vno6Oj/5eXl/+Xl5f/l5eX/5eXl/+Xl5f/l5eX/5eXl/+Xl5f/l5eX/5eXl/+Xl5f/o4+L/3IBy/+dcT//QY1X/wlBJ/8Gcj//W4Nn/5Obl/+Xn4//o5+P/5ujl/+Lo5//t3dr/9oaI/7hKSf94Qz7/v7az/+Xd3v/l5ub/5eXl/+Xl5f/l5eX/5eXl/+Xl5f/l5eX/5eXl/+Xl5f/l5eX/5eXl/+Xl5f/o6Oj/0dHR5Tw8PEAAAAALdnZ2W97e3vnr6+v/6Ojo/+jo6P/o6Oj/6Ojo/+jo6P/o6Oj/6Ojo/+jo6P/o6Oj/6Ojo/+jo6P/r4uH/5ox//+dyYf/DWVD/tVtS/8/Du//d4OP/6+bo/+fq5v/n6eX/6eno/+jp6v/v4d//7piU/8lrZP+HMTD/rpSR/9/a2v/o6Oj/6Ojo/+jo6P/o6Oj/6Ojo/+jo6P/o6Oj/6Ojo/+jo6P/o6Oj/6Ojo/+jo6P/r6+v/1dXV5Tw8PEAAAAALdnh4W9/h4fns7e7/6erq/+nq6v/p6ur/6erq/+nq6v/p6ur/6erq/+nq6v/p6ur/6erq/+nq6v/t5OP/862h/+mFeP++UU3/vXd5/9zN0P/m4Oj/7ejt/+vr6//r6+v/6urr/+rq7P/y4Nr/8ZmT/9B1bf+ePzv/qoF6/9/d2//q6ur/6erq/+nq6v/p6ur/6erq/+nq6v/p6ur/6erq/+nq6v/p6ur/6erq/+nq6v/s7e3/1tfX5UBAQEAAAAALeHh4W+Li4vnv7/D/7Ozs/+zs7P/s7Oz/7Ozs/+zs7P/s7Oz/7Ozs/+zs7P/s7Oz/7Ozs/+zs7P/v6OX/9byw/+6Sif+3VFD/vo2Q/9zT1P/g5+b/6e3t/+3s7f/t7O3/7evt/+3r7//z08H/9YmB/9hva/+dTUL/sIh+/+rh3//s7Oz/7Ozs/+zs7P/s7Oz/7Ozs/+zs7P/s7Oz/7Ozs/+zs7P/s7Oz/7Ozs/+zs7P/v7+//19fX5UBAQEAAAAALeHh4W+Tk5Pnz8/L/7u7u/+7u7v/u7u7/7u7u/+7u7v/u7u7/7u7u/+7u7v/u7u7/7u7u/+7u7v/x7ev/+MW6/+6jlv+sX1X/tJyX/9/V0//p5uT/7PDv//Dv7v/w7u//6+/v/+zx7v/lqJX/6XZp/9xqZv+rU0v/tKGW/+jr6v/u7u7/7u7u/+7u7v/u7u7/7u7u/+7u7v/u7u7/7u7u/+7u7v/u7u7/7u7u/+7u7v/x8fH/2dnZ5UBAQEAAAAALe3t7W+fn6Pn09PX/8PDx//Dw8f/w8PH/8PDx//Dw8f/w8PH/8PDx//Dw8f/w8PH/8PDx//Dw8f/w8PH/9NvR//Cvof/BcGb/wpaU/+fR0v/o3t7/7+/v//Hu8f/w7vD/8PL1/+ncxv/ihXH/5XZm/9NrZ/+8X1n/3cS9/+/x8f/w8PH/8PDx//Dw8f/w8PH/8PDx//Dw8f/w8PH/8PDx//Dw8f/w8PH/8PDx//Dw8f/09PX/3Nze5UBAQEAAAAALe3t7W+np6fn39/f/8vLy//Ly8v/y8vL/8vLy//Ly8v/y8vL/8vLy//Ly8v/y8vL/8vLy//Ly8v/y8/P/8u3p//PCtv/miIP/wYKE/+jQ0f/n2t3/7ePn/+vr7f/s8PH/8Ojo/+iWj//ncV//5XZn/8plY//HjIP/7uPb//Pz9P/y8/P/8vLy//Ly8v/y8vL/8vLy//Ly8v/y8vL/8vLy//Ly8v/y8vL/8vLy//Ly8v/29vb/39/f5UBAQEAAAAALe3t7W+vr6/n5+fn/9PT0//T09P/09PT/9PT0//T09P/09PT/9PT0//T09P/09PT/9PT0//T09P/09PT/9Pb1//fm4//1rqv/0Xx+/9mmpf/q2tj/5eLh/+Hl4f/p29f/4Kao/952df/eemn/03Vn/8Vxcf/VyLn/4urd/+js6v/x8fH/9PT1//T09P/09PT/9PT0//T09P/09PT/9PT0//T09P/09PT/9PT0//T09P/4+Pj/3+Dg5UBAQEAAAAALgICAWu3t7fn7+/v/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b3+P/16uj/9bKt/9qAfP/VjIr/2aek/+Gnpf/lk5H/5YuK/+OXk//vj4T/4X12/9KDhv/Gk47/3aKh/+HY1v/x8fD/9vb3//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/6+vr/4eHh5UVFRT8AAAAKgoKCWO/v7/n8/Pz/9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39//3+Pj/+PLu//TZ1v/lq6z/6JOW//CZmv/zpaH/9Liy//rAvf/9sav/85aT/+KGhv/Wdnb/1Gxy/8+Mkf/l2Nn/+fr6//f39//39/f/9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39//7+/v/4uLi5UdHRz0AAAAHjIyMVPHx8fj9/f3/+Pj4//j4+P/4+Pj/+Pj4//j4+P/4+Pj/+Pj4//j4+P/4+Pj/+Pj4//j4+P/4+Pj/+Pj4//j4+P/4+fn/+fn5//n5+v/59/f/+fDv//jw7//36ub/9uzm//Xx7//27uv/9eXg//Th3v/x3dr/7djX/+fR0v/s4eH/+vv6//j4+P/4+Pj/+Pj4//j4+P/4+Pj/+Pj4//j4+P/4+Pj/+Pj4//j4+P/9/f3/5eXl5FJSUjgAAAADk5OTSfDw8PP/////+vr6//r6+v/6+vr/+vr6//r6+v/6+vr/+vr6//r6+v/6+vr/+vr6//r6+v/6+vr/+vr6//r6+v/6+vr/+vr6//r6+v/6+vr/+vv7//r7+//6+/v/+vv7//r7+//6+/v/+vv8//r7/P/7/Pz/+/z8//v8/P/7/Pv/+fr5//r6+v/6+vr/+vr6//r6+v/6+vr/+vr6//r6+v/6+vr/+vr6//r6+v//////6Ojo2llZWS4AAAAAioqKMO7u7t//////+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+vv7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+///////4uLiuFJSUhwAAAAAEhISDu3t7bb//////f39//z8/P/8/Pz//Pz8//z8/P/8/Pz//Pz8//z8/P/8/Pz//Pz8//z8/P/8/Pz//Pz8//z8/P/8/Pz//Pz8//z8/P/8/Pz//Pz8//z8/P/8/Pz//Pz8//z8/P/8/Pz//Pz8//z8/P/8/Pz//Pz8//z8/P/8/Pz//Pz8//z8/P/8/Pz//Pz8//z8/P/8/Pz//Pz8//z8/P/8/Pz//Pz8//39/f//////2NjYdgAAAAgAAAAAAAAAANvb21v5+fnz//////39/f/9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39///////19fXjwcHBKQAAAAAAAAAAAAAAAAAAAAfu7u6K/v7+/v/////9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39//39/f/+/v7///////39/fPq6upvAAAAAAAAAAAAAAAAAAAAAAAAAACSkpIH7+/vbfv7++v//////v7+/////////////v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v///////v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v//////////////////////+fn52unp6VEAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAefn5yr39/eb+/v72P////3//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v7++fv7+9D19fV929vbHAAAAAAAAAAAAAAAAAAAAADgAAAAAAMAAMAAAAAAAQAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAIAAAAAAAAAAwAAAAAABAADAAAAAAAMAAOAAAAAAAwAA8AAAAAAPAAA=
// @screenshot     data:image/png;base64,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
// @author         100の人
// @license        Creative Commons Attribution 3.0 Unported License
// ==/UserScript==

(function() {
'use strict';

// @include 補助
if (!(/^www\.google\.(?:com|(?:com?\.)?[a-z]{2})$/.test(document.domain) && window.location.pathname === '/search')) {
	return;
}



// String::contains (Opera / Google Chrome)
if (!('contains' in String.prototype)) {
	/**
	 * Determines whether one string may be found within another string, returning true or false as appropriate.
	 * 
	 * @param {string} searchString A string to be searched for within this string.
	 * @param {number} [position] The position in this string at which to begin searching for searchString; defaults to 0.
	 * @returns {boolean}
	 * @see <a href="http://d.hatena.ne.jp/teramako/20120807/p1">Nightly で ES.next で追加されている String.prototype の一部が実装された - hogehoge @teramako</a>
	 */
	String.prototype.contains = function (searchString, position) {
		return (typeof position === "number" && position ? this.substr(position) : this).indexOf(searchString) >= 0;
	};
}

// DOMTokenList::add/remove (Firefox / Opera)
if ('mozFullScreenEnabled' in document || 'opera' in window) {
	var _add = DOMTokenList.prototype.add, _remove = DOMTokenList.prototype.remove;
	DOMTokenList.prototype.add = function() {
		for (var i = 0, l = arguments.length; i < l; i++) {
			_add.call(this, arguments[i]);
		}
	};
	DOMTokenList.prototype.remove = function() {
		for (var i = 0, l = arguments.length; i < l; i++) {
			_remove.call(this, arguments[i]);
		}
	};
}



// body要素挿入時に実行し、Google検索のバージョンを判別する
var textBoxId, inputNodeId, inputParentNodesClassName, textBoxBorderClass, classOnfocuse, previousSiblingId;
startScript(function() {
	var functionsAccordingToBrowsers, body = document.body;
	
	if (body.id) {
		if (window.location.search.contains('tbm=isch')) {
			// 画像検索ページなら実行しない
			return;
		}
		if (body.getAttribute('marginheight')) {
			// User-AgentがFirefox
			textBoxId = 'tsf';
			inputNodeId = 'lst-ib';
			inputParentNodesClassName = 'lst-d';
			textBoxBorderClass = 'lst-td';
			classOnfocuse = ['lst-d-f'];
		} else {
			// User-AgentがOpera、Google Chrome、IE8以降
			textBoxId = 'gbqf';
			inputNodeId = 'gbqfq';
			inputParentNodesClassName = 'gbqfqwc';
			textBoxBorderClass = 'gbqfqw';
			classOnfocuse = ['gbqfqwf', 'gsfe_b'];
		}
		previousSiblingId = 'xjs';
		functionsAccordingToBrowsers = {
			firefox: {
				isTargetParent: function (parent) {
					return parent.classList.contains('mw');
				},
				isTarget: function (target) {
					var firstElementChild = target.firstElementChild;
					return firstElementChild && firstElementChild.id === 'foot';
				},
			},
			google: {
				isTargetParent: function (parent) {
					return parent.id === 'foot';
				},
				isTarget: function (target) {
					return target.id === 'xjs';
				},
			},
		};
	} else {
		// その他のUser-Agent、又はJavaScriptが無効
		textBoxId = 'tsf';
		previousSiblingId = 'nav';
		functionsAccordingToBrowsers = {
			firefox: {
				isTargetParent: function (parent) {
					return parent.localName === 'tbody' && parent.parentNode.id === 'mn';
				},
				isTarget: function (target) {
					var cells = target.cells;
					return cells && cells[0] && cells[0].id === 'leftnav';
				},
			},
			google: {
				isTargetParent: function (parent) {
					return parent.id === 'foot';
				},
				isTarget: function (target) {
					return target.id === 'nav';
				},
			},
		};
	}
	startScript(main, null, null, function() {
		return document.getElementById(previousSiblingId);
	}, functionsAccordingToBrowsers);
}, function(parent) {
	return parent.localName === 'html';
}, function(target) {
	return target.localName === 'body';
}, function() {
	return document.body;
}, {});

function main() {
	var style, sheet, cssRules, original, previousSibling,
			bottomForm, textBoxBorder, textBoxBorderClassList, inputParentNodes, submitButton, submitButtonClassList;

	// スタイルの設定
	style = document.createElement('style');
	document.head.appendChild(style);
	sheet = style.sheet;
	cssRules = sheet.cssRules;
	[
		'#foot form {'
				+ 'margin-top: 13px;'
				+ '}',
		// 以降 Firefox
		'#foot .nojsv {'
				+ 'display: none;'
				+ '}',
		'#foot .tsf-p {'
				+ 'width: 631px;'
				+ 'padding-left: 8px;'
				+ '}',
	].forEach(function(rule) {
		sheet.insertRule(rule, cssRules.length);
	});

	// 検索ボックスを取得
	original = document.getElementById(textBoxId);
	if (!original) {
		return;
	}

	// 複製
	bottomForm = original.cloneNode(true);
	
	// 移動先を取得
	previousSibling = document.getElementById(previousSiblingId);
	
	// 挿入
	previousSibling.parentNode.insertBefore(bottomForm, previousSibling.nextSibling);
	
	// ページ描画後のスクリプトによる書き換えを待機
	if (inputParentNodesClassName) {
		inputParentNodes = document.getElementsByClassName(inputParentNodesClassName);
		startScript(function() {
			// 後から挿入された検索窓を複製
			var table = inputParentNodes[0].firstElementChild.cloneNode(true), input = table.getElementsByTagName('input')[0];
			// オートコンプリートを有効に
			input.removeAttribute('autocomplete');
			// 下の検索窓を置き換え
			inputParentNodes[1].replaceChild(table, inputParentNodes[1].firstElementChild);
		}, function(parent) {
			return parent.id === 'gs_lc0';
		}, function(target) {
			return target.id === inputNodeId;
		}, function() {
			return document.querySelector('#' + inputNodeId + '[style]');
		});
	}
	
	// 検索窓にフォーカスが移った時
	if (textBoxBorderClass) {
		textBoxBorder = bottomForm.getElementsByClassName(textBoxBorderClass)[0];
		textBoxBorderClassList = textBoxBorder.classList;
		textBoxBorder.addEventListener('focus', function() {
			DOMTokenList.prototype.add.apply(textBoxBorderClassList, classOnfocuse);
		}, true);

		textBoxBorder.addEventListener('blur', function() {
			DOMTokenList.prototype.remove.apply(textBoxBorderClassList, classOnfocuse);
		}, true);
		
		// 検索窓をクリックしたとき
		textBoxBorder.addEventListener('click', function(event) {
			if (event.target.localName !== 'input') {
				bottomForm.elements.namedItem('q').focus();
			}
		});
	}
	
	// 検索窓にマウスが載ったとき
	submitButton = bottomForm.getElementsByClassName('gbqfb')[0];
	if (submitButton) {
		submitButtonClassList = submitButton.classList;
		bottomForm.addEventListener('mouseover', function(event) {
			var target = event.target;

			if (textBoxBorder.contains(target)) {
				// 検索窓
				textBoxBorderClassList.add('gbqfqw-hvr', 'gsfe_a');
			} else if (submitButton.contains(target)) {
				// 検索ボタン
				submitButtonClassList.add('gbqfb-hvr');
			}
		});

		bottomForm.addEventListener('mouseout', function(event) {
			var relatedTarget = event.relatedTarget;

			if (!textBoxBorder.contains(relatedTarget)) {
				// 検索窓
				textBoxBorderClassList.remove('gbqfqw-hvr', 'gsfe_a');
			}
			if (!submitButton.contains(relatedTarget)) {
				// 検索ボタン
				submitButtonClassList.remove('gbqfb-hvr');
			}
		});
	}
}



/**
 * 指定した要素が挿入された直後に関数を実行する
 * @param {Function} main 実行する関数
 * @param {Function} isTargetParent 挿入された要素の親要素が、指定した要素の親要素か否かを返す関数。functionsAccordingToBrowsersを指定していれば省略する
 * @param {Function} isTarget 挿入された要素が、指定した要素か否かを返す関数。functionsAccordingToBrowsersを指定していれば省略する
 * @param {Function} existsTarget 指定した要素が存在するか否かを返す関数
 * @param {Object} [functionsAccordingToBrowsers] DOMContentLoaded前のタイミングで1回だけスクリプトを起動させる場合に設定
 * @param {Function} functionsAccordingToBrowsers.firefox.isTargetParent 挿入された要素の親要素が、指定した要素の親要素か否かを返す関数（Firefoxの場合）
 * @param {Function} functionsAccordingToBrowsers.firefox.isTarget 挿入された要素が、指定した要素か否かを返す関数（Firefoxの場合）
 * @param {Function} functionsAccordingToBrowsers.google.isTargetParent 挿入された要素の親要素が、指定した要素の親要素か否かを返す関数（Google Chromeの場合）
 * @param {Function} functionsAccordingToBrowsers.google.isTarget 挿入された要素が、指定した要素か否かを返す関数（Google Chromeの場合）
 * @version 2013-06-08
 */
function startScript(main, isTargetParent, isTarget, existsTarget, functionsAccordingToBrowsers) {
	var observer, flag;
	
	// ブラウザによってDOMContentLoaded前のMutationObserverの挙動が異なるため、isTargetParent、isTargetをブラウザに合わせて変更
	if (functionsAccordingToBrowsers) {
		if ('chrome' in window) {
			// Google Chromeなら
			if (functionsAccordingToBrowsers.google) {
				isTargetParent = functionsAccordingToBrowsers.google.isTargetParent;
				isTarget = functionsAccordingToBrowsers.google.isTarget;
			}
		} else {
			// Firefoxなら
			if (functionsAccordingToBrowsers.firefox) {
				isTargetParent = functionsAccordingToBrowsers.firefox.isTargetParent;
				isTarget = functionsAccordingToBrowsers.firefox.isTarget;
			}
		}
	}
	
	// 指定した要素が既に存在していれば、即実行
	startMain();
	if (flag) {
		return;
	}
	
	if (typeof MutationObserver !== 'undefined') {
		// MutationObserverが利用できる場合
		observer = new MutationObserver(mutationCallback);
		observer.observe(document, {
			childList: true,
			subtree: true,
		});
	} else {
		// MutationObserverが利用できない場合 (Opera)
		checkExistingTarget(0);
	}
	
	if (functionsAccordingToBrowsers) {
		// DOMContentLoadedまでにスクリプトを実行できなかった場合、監視を停止（指定した要素が存在するか確認し、存在すれば実行）
		document.addEventListener('DOMContentLoaded', function stopScript(event) {
			event.target.removeEventListener('DOMContentLoaded', stopScript);
			if (observer) {
				observer.disconnect();
			}
			startMain();
			flag = true;
		});
	}
	
	/**
	 * 指定された要素が挿入されたら、監視を停止し、{@link checkExistingTarget}を実行する
	 * 
	 * @param {MutationRecord[]} mutations a list of MutationRecord objects
	 * @param {MutationObserver} observer the constructed MutationObserver object
	 */
	function mutationCallback(mutations, observer) {
		var mutation, target, addedNodes, addedNode,
				i, j, l, l2;
		for (i = 0, l = mutations.length; i < l; i++) {
			mutation = mutations[i];
			target = mutation.target;
			if (target.nodeType === Node.ELEMENT_NODE && isTargetParent(target)) {
				// 子が追加されたノードがElementノードで、かつそのノードについてisTargetParentが真を返せば
				addedNodes = Array.prototype.slice.call(mutation.addedNodes);
				for (j = 0, l2 = addedNodes.length; j < l2; j++) {
					addedNode = addedNodes[j];
					if (addedNode.nodeType === Node.ELEMENT_NODE && isTarget(addedNode)) {
						// 追加された子がElementノードで、かつそのノードについてisTargetが真を返せば
						observer.disconnect();
						checkExistingTarget(0);
						return;
					}
				}
			}
		}
	}
	
	/**
	 * {@link startMain}を実行し、スクリプトが開始されていなければ再度実行
	 * 
	 * @param {integer} count {@link startMain}を実行した回数
	 */
	function checkExistingTarget(count) {
		var LIMIT = 500, INTERVAL = 10;
		startMain();
		if (!flag && count < LIMIT) {
			window.setTimeout(checkExistingTarget, INTERVAL, count + 1);
		}
	}
	
	/**
	 * 指定した要素が存在するか確認し、存在すれば監視を停止しスクリプトを実行
	 */
	function startMain() {
		if (!flag && existsTarget()) {
			flag = true;
			main();
		}
	}
}

})();
