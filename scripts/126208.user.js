// ==UserScript==
// @name           icbc
// @namespace      d1y2j3@163.com
// @description    access icbc without activex
// @include        https://vip.icbc.com.cn/icbc/newperbank/main/viplogin.jsp?injectTranName=&injectTranData=&injectSignStr=&lastUserName=&destpage=
// ==/UserScript==

    function des(key, message, encrypt, mode, iv, padding) {  
       
        var spfunction1 = new Array(0x1010400, 0, 0x10000, 0x1010404, 0x1010004, 0x10404, 0x4, 0x10000, 0x400, 0x1010400, 0x1010404,  
                0x400, 0x1000404, 0x1010004, 0x1000000, 0x4, 0x404, 0x1000400, 0x1000400, 0x10400, 0x10400, 0x1010000, 0x1010000,  
                0x1000404, 0x10004, 0x1000004, 0x1000004, 0x10004, 0, 0x404, 0x10404, 0x1000000, 0x10000, 0x1010404, 0x4, 0x1010000,  
                0x1010400, 0x1000000, 0x1000000, 0x400, 0x1010004, 0x10000, 0x10400, 0x1000004, 0x400, 0x4, 0x1000404, 0x10404,  
                0x1010404, 0x10004, 0x1010000, 0x1000404, 0x1000004, 0x404, 0x10404, 0x1010400, 0x404, 0x1000400, 0x1000400, 0, 0x10004,  
                0x10400, 0, 0x1010004);  
        var spfunction2 = new Array(-0x7fef7fe0, -0x7fff8000, 0x8000, 0x108020, 0x100000, 0x20, -0x7fefffe0, -0x7fff7fe0, -0x7fffffe0,  
                -0x7fef7fe0, -0x7fef8000, -0x80000000, -0x7fff8000, 0x100000, 0x20, -0x7fefffe0, 0x108000, 0x100020, -0x7fff7fe0, 0,  
                -0x80000000, 0x8000, 0x108020, -0x7ff00000, 0x100020, -0x7fffffe0, 0, 0x108000, 0x8020, -0x7fef8000, -0x7ff00000,  
                0x8020, 0, 0x108020, -0x7fefffe0, 0x100000, -0x7fff7fe0, -0x7ff00000, -0x7fef8000, 0x8000, -0x7ff00000, -0x7fff8000,  
                0x20, -0x7fef7fe0, 0x108020, 0x20, 0x8000, -0x80000000, 0x8020, -0x7fef8000, 0x100000, -0x7fffffe0, 0x100020,  
                -0x7fff7fe0, -0x7fffffe0, 0x100020, 0x108000, 0, -0x7fff8000, 0x8020, -0x80000000, -0x7fefffe0, -0x7fef7fe0, 0x108000);  
        var spfunction3 = new Array(0x208, 0x8020200, 0, 0x8020008, 0x8000200, 0, 0x20208, 0x8000200, 0x20008, 0x8000008, 0x8000008,  
                0x20000, 0x8020208, 0x20008, 0x8020000, 0x208, 0x8000000, 0x8, 0x8020200, 0x200, 0x20200, 0x8020000, 0x8020008, 0x20208,  
                0x8000208, 0x20200, 0x20000, 0x8000208, 0x8, 0x8020208, 0x200, 0x8000000, 0x8020200, 0x8000000, 0x20008, 0x208, 0x20000,  
                0x8020200, 0x8000200, 0, 0x200, 0x20008, 0x8020208, 0x8000200, 0x8000008, 0x200, 0, 0x8020008, 0x8000208, 0x20000,  
                0x8000000, 0x8020208, 0x8, 0x20208, 0x20200, 0x8000008, 0x8020000, 0x8000208, 0x208, 0x8020000, 0x20208, 0x8, 0x8020008,  
                0x20200);  
        var spfunction4 = new Array(0x802001, 0x2081, 0x2081, 0x80, 0x802080, 0x800081, 0x800001, 0x2001, 0, 0x802000, 0x802000,  
                0x802081, 0x81, 0, 0x800080, 0x800001, 0x1, 0x2000, 0x800000, 0x802001, 0x80, 0x800000, 0x2001, 0x2080, 0x800081, 0x1,  
                0x2080, 0x800080, 0x2000, 0x802080, 0x802081, 0x81, 0x800080, 0x800001, 0x802000, 0x802081, 0x81, 0, 0, 0x802000,  
                0x2080, 0x800080, 0x800081, 0x1, 0x802001, 0x2081, 0x2081, 0x80, 0x802081, 0x81, 0x1, 0x2000, 0x800001, 0x2001,  
                0x802080, 0x800081, 0x2001, 0x2080, 0x800000, 0x802001, 0x80, 0x800000, 0x2000, 0x802080);  
        var spfunction5 = new Array(0x100, 0x2080100, 0x2080000, 0x42000100, 0x80000, 0x100, 0x40000000, 0x2080000, 0x40080100,  
                0x80000, 0x2000100, 0x40080100, 0x42000100, 0x42080000, 0x80100, 0x40000000, 0x2000000, 0x40080000, 0x40080000, 0,  
                0x40000100, 0x42080100, 0x42080100, 0x2000100, 0x42080000, 0x40000100, 0, 0x42000000, 0x2080100, 0x2000000, 0x42000000,  
                0x80100, 0x80000, 0x42000100, 0x100, 0x2000000, 0x40000000, 0x2080000, 0x42000100, 0x40080100, 0x2000100, 0x40000000,  
                0x42080000, 0x2080100, 0x40080100, 0x100, 0x2000000, 0x42080000, 0x42080100, 0x80100, 0x42000000, 0x42080100, 0x2080000,  
                0, 0x40080000, 0x42000000, 0x80100, 0x2000100, 0x40000100, 0x80000, 0, 0x40080000, 0x2080100, 0x40000100);  
        var spfunction6 = new Array(0x20000010, 0x20400000, 0x4000, 0x20404010, 0x20400000, 0x10, 0x20404010, 0x400000, 0x20004000,  
                0x404010, 0x400000, 0x20000010, 0x400010, 0x20004000, 0x20000000, 0x4010, 0, 0x400010, 0x20004010, 0x4000, 0x404000,  
                0x20004010, 0x10, 0x20400010, 0x20400010, 0, 0x404010, 0x20404000, 0x4010, 0x404000, 0x20404000, 0x20000000, 0x20004000,  
                0x10, 0x20400010, 0x404000, 0x20404010, 0x400000, 0x4010, 0x20000010, 0x400000, 0x20004000, 0x20000000, 0x4010,  
                0x20000010, 0x20404010, 0x404000, 0x20400000, 0x404010, 0x20404000, 0, 0x20400010, 0x10, 0x4000, 0x20400000, 0x404010,  
                0x4000, 0x400010, 0x20004010, 0, 0x20404000, 0x20000000, 0x400010, 0x20004010);  
        var spfunction7 = new Array(0x200000, 0x4200002, 0x4000802, 0, 0x800, 0x4000802, 0x200802, 0x4200800, 0x4200802, 0x200000, 0,  
                0x4000002, 0x2, 0x4000000, 0x4200002, 0x802, 0x4000800, 0x200802, 0x200002, 0x4000800, 0x4000002, 0x4200000, 0x4200800,  
                0x200002, 0x4200000, 0x800, 0x802, 0x4200802, 0x200800, 0x2, 0x4000000, 0x200800, 0x4000000, 0x200800, 0x200000,  
                0x4000802, 0x4000802, 0x4200002, 0x4200002, 0x2, 0x200002, 0x4000000, 0x4000800, 0x200000, 0x4200800, 0x802, 0x200802,  
                0x4200800, 0x802, 0x4000002, 0x4200802, 0x4200000, 0x200800, 0, 0x2, 0x4200802, 0, 0x200802, 0x4200000, 0x800,  
                0x4000002, 0x4000800, 0x800, 0x200002);  
        var spfunction8 = new Array(0x10001040, 0x1000, 0x40000, 0x10041040, 0x10000000, 0x10001040, 0x40, 0x10000000, 0x40040,  
                0x10040000, 0x10041040, 0x41000, 0x10041000, 0x41040, 0x1000, 0x40, 0x10040000, 0x10000040, 0x10001000, 0x1040, 0x41000,  
                0x40040, 0x10040040, 0x10041000, 0x1040, 0, 0, 0x10040040, 0x10000040, 0x10001000, 0x41040, 0x40000, 0x41040, 0x40000,  
                0x10041000, 0x1000, 0x40, 0x10040040, 0x1000, 0x41040, 0x10001000, 0x40, 0x10000040, 0x10040000, 0x10040040, 0x10000000,  
                0x40000, 0x10001040, 0, 0x10041040, 0x40040, 0x10000040, 0x10040000, 0x10001000, 0x10001040, 0, 0x10041040, 0x41000,  
                0x41000, 0x1040, 0x1040, 0x40040, 0x10000000, 0x10041000);  
      
       
        var keys = des_createKeys(key);  
        var m = 0, i, j, temp, temp2, right1, right2, left, right, looping;  
        var cbcleft, cbcleft2, cbcright, cbcright2  
        var endloop, loopinc;  
        var len = message.length;  
        var chunk = 0;  
       
        var iterations = keys.length == 32 ? 3 : 9;
        if (iterations == 3) {  
            looping = encrypt ? new Array(0, 32, 2) : new Array(30, -2, -2);  
        } else {  
            looping = encrypt ? new Array(0, 32, 2, 62, 30, -2, 64, 96, 2) : new Array(94, 62, -2, 32, 64, 2, 30, -2, -2);  
        }  
      
       
        if (padding == 2)  
            message += "        ";
        else if (padding == 1) {  
            temp = 8 - (len % 8);  
            message += String.fromCharCode(temp, temp, temp, temp, temp, temp, temp, temp);  
            if (temp == 8)  
                len += 8;  
        }
        else if (!padding)  
            message += "\0\0\0\0\0\0\0\0";
      
       
        result = "";  
        tempresult = "";  
      
        if (mode == 1) {
            cbcleft = (iv.charCodeAt(m++) << 24) | (iv.charCodeAt(m++) << 16) | (iv.charCodeAt(m++) << 8) | iv.charCodeAt(m++);  
            cbcright = (iv.charCodeAt(m++) << 24) | (iv.charCodeAt(m++) << 16) | (iv.charCodeAt(m++) << 8) | iv.charCodeAt(m++);  
            m = 0;  
        }  
      
       
        while (m < len) {  
            left = (message.charCodeAt(m++) << 24) | (message.charCodeAt(m++) << 16) | (message.charCodeAt(m++) << 8)  
                    | message.charCodeAt(m++);  
            right = (message.charCodeAt(m++) << 24) | (message.charCodeAt(m++) << 16) | (message.charCodeAt(m++) << 8)  
                    | message.charCodeAt(m++);  
      
           
           
            if (mode == 1) {  
                if (encrypt) {  
                    left ^= cbcleft;  
                    right ^= cbcright;  
                } else {  
                    cbcleft2 = cbcleft;  
                    cbcright2 = cbcright;  
                    cbcleft = left;  
                    cbcright = right;  
                }  
            }  
      
           
            temp = ((left >>> 4) ^ right) & 0x0f0f0f0f;  
            right ^= temp;  
            left ^= (temp << 4);  
            temp = ((left >>> 16) ^ right) & 0x0000ffff;  
            right ^= temp;  
            left ^= (temp << 16);  
            temp = ((right >>> 2) ^ left) & 0x33333333;  
            left ^= temp;  
            right ^= (temp << 2);  
            temp = ((right >>> 8) ^ left) & 0x00ff00ff;  
            left ^= temp;  
            right ^= (temp << 8);  
            temp = ((left >>> 1) ^ right) & 0x55555555;  
            right ^= temp;  
            left ^= (temp << 1);  
      
            left = ((left << 1) | (left >>> 31));  
            right = ((right << 1) | (right >>> 31));  
      
           
            for (j = 0; j < iterations; j += 3) {  
                endloop = looping[j + 1];  
                loopinc = looping[j + 2];  
               
                for (i = looping[j]; i != endloop; i += loopinc) {
                    right1 = right ^ keys[i];  
                    right2 = ((right >>> 4) | (right << 28)) ^ keys[i + 1];  
                   
                   
                    temp = left;  
                    left = right;  
                    right = temp  
                            ^ (spfunction2[(right1 >>> 24) & 0x3f] | spfunction4[(right1 >>> 16) & 0x3f]  
                                    | spfunction6[(right1 >>> 8) & 0x3f] | spfunction8[right1 & 0x3f] | spfunction1[(right2 >>> 24) & 0x3f]  
                                    | spfunction3[(right2 >>> 16) & 0x3f] | spfunction5[(right2 >>> 8) & 0x3f] | spfunction7[right2 & 0x3f]);  
                }  
                temp = left;  
                left = right;  
                right = temp;
            }
      
           
            left = ((left >>> 1) | (left << 31));  
            right = ((right >>> 1) | (right << 31));  
      
           
            temp = ((left >>> 1) ^ right) & 0x55555555;  
            right ^= temp;  
            left ^= (temp << 1);  
            temp = ((right >>> 8) ^ left) & 0x00ff00ff;  
            left ^= temp;  
            right ^= (temp << 8);  
            temp = ((right >>> 2) ^ left) & 0x33333333;  
            left ^= temp;  
            right ^= (temp << 2);  
            temp = ((left >>> 16) ^ right) & 0x0000ffff;  
            right ^= temp;  
            left ^= (temp << 16);  
            temp = ((left >>> 4) ^ right) & 0x0f0f0f0f;  
            right ^= temp;  
            left ^= (temp << 4);  
      
           
           
            if (mode == 1) {  
                if (encrypt) {  
                    cbcleft = left;  
                    cbcright = right;  
                } else {  
                    left ^= cbcleft2;  
                    right ^= cbcright2;  
                }  
            }  
            tempresult += String.fromCharCode((left >>> 24), ((left >>> 16) & 0xff), ((left >>> 8) & 0xff), (left & 0xff),  
                    (right >>> 24), ((right >>> 16) & 0xff), ((right >>> 8) & 0xff), (right & 0xff));  
      
            chunk += 8;  
            if (chunk == 512) {  
                result += tempresult;  
                tempresult = "";  
                chunk = 0;  
            }  
        }
      
       
        return result + tempresult;  
    }
      
   
   
   
    function des_createKeys(key) {  
       
        pc2bytes0 = new Array(0, 0x4, 0x20000000, 0x20000004, 0x10000, 0x10004, 0x20010000, 0x20010004, 0x200, 0x204, 0x20000200,  
                0x20000204, 0x10200, 0x10204, 0x20010200, 0x20010204);  
        pc2bytes1 = new Array(0, 0x1, 0x100000, 0x100001, 0x4000000, 0x4000001, 0x4100000, 0x4100001, 0x100, 0x101, 0x100100,  
                0x100101, 0x4000100, 0x4000101, 0x4100100, 0x4100101);  
        pc2bytes2 = new Array(0, 0x8, 0x800, 0x808, 0x1000000, 0x1000008, 0x1000800, 0x1000808, 0, 0x8, 0x800, 0x808, 0x1000000,  
                0x1000008, 0x1000800, 0x1000808);  
        pc2bytes3 = new Array(0, 0x200000, 0x8000000, 0x8200000, 0x2000, 0x202000, 0x8002000, 0x8202000, 0x20000, 0x220000, 0x8020000,  
                0x8220000, 0x22000, 0x222000, 0x8022000, 0x8222000);  
        pc2bytes4 = new Array(0, 0x40000, 0x10, 0x40010, 0, 0x40000, 0x10, 0x40010, 0x1000, 0x41000, 0x1010, 0x41010, 0x1000, 0x41000,  
                0x1010, 0x41010);  
        pc2bytes5 = new Array(0, 0x400, 0x20, 0x420, 0, 0x400, 0x20, 0x420, 0x2000000, 0x2000400, 0x2000020, 0x2000420, 0x2000000,  
                0x2000400, 0x2000020, 0x2000420);  
        pc2bytes6 = new Array(0, 0x10000000, 0x80000, 0x10080000, 0x2, 0x10000002, 0x80002, 0x10080002, 0, 0x10000000, 0x80000,  
                0x10080000, 0x2, 0x10000002, 0x80002, 0x10080002);  
        pc2bytes7 = new Array(0, 0x10000, 0x800, 0x10800, 0x20000000, 0x20010000, 0x20000800, 0x20010800, 0x20000, 0x30000, 0x20800,  
                0x30800, 0x20020000, 0x20030000, 0x20020800, 0x20030800);  
        pc2bytes8 = new Array(0, 0x40000, 0, 0x40000, 0x2, 0x40002, 0x2, 0x40002, 0x2000000, 0x2040000, 0x2000000, 0x2040000,  
                0x2000002, 0x2040002, 0x2000002, 0x2040002);  
        pc2bytes9 = new Array(0, 0x10000000, 0x8, 0x10000008, 0, 0x10000000, 0x8, 0x10000008, 0x400, 0x10000400, 0x408, 0x10000408,  
                0x400, 0x10000400, 0x408, 0x10000408);  
        pc2bytes10 = new Array(0, 0x20, 0, 0x20, 0x100000, 0x100020, 0x100000, 0x100020, 0x2000, 0x2020, 0x2000, 0x2020, 0x102000,  
                0x102020, 0x102000, 0x102020);  
        pc2bytes11 = new Array(0, 0x1000000, 0x200, 0x1000200, 0x200000, 0x1200000, 0x200200, 0x1200200, 0x4000000, 0x5000000,  
                0x4000200, 0x5000200, 0x4200000, 0x5200000, 0x4200200, 0x5200200);  
        pc2bytes12 = new Array(0, 0x1000, 0x8000000, 0x8001000, 0x80000, 0x81000, 0x8080000, 0x8081000, 0x10, 0x1010, 0x8000010,  
                0x8001010, 0x80010, 0x81010, 0x8080010, 0x8081010);  
        pc2bytes13 = new Array(0, 0x4, 0x100, 0x104, 0, 0x4, 0x100, 0x104, 0x1, 0x5, 0x101, 0x105, 0x1, 0x5, 0x101, 0x105);  
      
       
        var iterations = key.length > 8 ? 3 : 1;  
       
        var keys = new Array(32 * iterations);  
       
        var shifts = new Array(0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0);  
       
        var lefttemp, righttemp, m = 0, n = 0, temp;  
      
        for (var j = 0; j < iterations; j++) {
            left = (key.charCodeAt(m++) << 24) | (key.charCodeAt(m++) << 16) | (key.charCodeAt(m++) << 8) | key.charCodeAt(m++);  
            right = (key.charCodeAt(m++) << 24) | (key.charCodeAt(m++) << 16) | (key.charCodeAt(m++) << 8) | key.charCodeAt(m++);  
      
            temp = ((left >>> 4) ^ right) & 0x0f0f0f0f;  
            right ^= temp;  
            left ^= (temp << 4);  
            temp = ((right >>> -16) ^ left) & 0x0000ffff;  
            left ^= temp;  
            right ^= (temp << -16);  
            temp = ((left >>> 2) ^ right) & 0x33333333;  
            right ^= temp;  
            left ^= (temp << 2);  
            temp = ((right >>> -16) ^ left) & 0x0000ffff;  
            left ^= temp;  
            right ^= (temp << -16);  
            temp = ((left >>> 1) ^ right) & 0x55555555;  
            right ^= temp;  
            left ^= (temp << 1);  
            temp = ((right >>> 8) ^ left) & 0x00ff00ff;  
            left ^= temp;  
            right ^= (temp << 8);  
            temp = ((left >>> 1) ^ right) & 0x55555555;  
            right ^= temp;  
            left ^= (temp << 1);  
      
           
           
            temp = (left << 8) | ((right >>> 20) & 0x000000f0);  
           
            left = (right << 24) | ((right << 8) & 0xff0000) | ((right >>> 8) & 0xff00) | ((right >>> 24) & 0xf0);  
            right = temp;  
      
           
            for (var i = 0; i < shifts.length; i++) {  
               
                if (shifts[i]) {  
                    left = (left << 2) | (left >>> 26);  
                    right = (right << 2) | (right >>> 26);  
                } else {  
                    left = (left << 1) | (left >>> 27);  
                    right = (right << 1) | (right >>> 27);  
                }  
                left &= -0xf;  
                right &= -0xf;  
      
               
               
               
               
               
               
               
               
                lefttemp = pc2bytes0[left >>> 28] | pc2bytes1[(left >>> 24) & 0xf] | pc2bytes2[(left >>> 20) & 0xf]  
                        | pc2bytes3[(left >>> 16) & 0xf] | pc2bytes4[(left >>> 12) & 0xf] | pc2bytes5[(left >>> 8) & 0xf]  
                        | pc2bytes6[(left >>> 4) & 0xf];  
                righttemp = pc2bytes7[right >>> 28] | pc2bytes8[(right >>> 24) & 0xf] | pc2bytes9[(right >>> 20) & 0xf]  
                        | pc2bytes10[(right >>> 16) & 0xf] | pc2bytes11[(right >>> 12) & 0xf] | pc2bytes12[(right >>> 8) & 0xf]  
                        | pc2bytes13[(right >>> 4) & 0xf];  
                temp = ((righttemp >>> 16) ^ lefttemp) & 0x0000ffff;  
                keys[n++] = lefttemp ^ temp;  
                keys[n++] = righttemp ^ (temp << 16);  
            }  
        }
       
        return keys;  
    }
      
   
    function stringToHex(s) {  
        var r = ""; 
        var hexes = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F");  
        for (var i = 0; i < s.length; i++) {  
            r += hexes[s.charCodeAt(i) >> 4] + hexes[s.charCodeAt(i) & 0xf];  
        }  
        return r;  
    }  
      
   
    function testDes(key, data) {  
       
        enc = des(key, data, 1, 0, 0, 1);   
        ret = stringToHex(enc);  
       
        return ret;  
    }  
	
	function binb2hex(binarray)
	{
		var hex_tab = "0123456789abcdef";
		var str = "";
		for(var i = 0; i < binarray.length * 4; i++)
		{
			str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
					hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
		}
		return str;
	}
	








var hexcase = 0;  
var chrsz   = 8;  


function hex_sha1(s)
{
       return binb2hex(core_sha1(AlignSHA1(s)));
}



function core_sha1(blockArray)
{
  var x = blockArray; 
  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16) 
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for(var j = 0; j < 80; j++) 
    {
      if(j < 16) w[j] = x[i + j];

      else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
    
      var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),

                       safe_add(safe_add(e, w[j]), sha1_kt(j)));

      e = d;
      d = c;
      c = rol(b, 30);
      b = a;
      a = t;
    }

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
    e = safe_add(e, olde);
  }

  return new Array(a, b, c, d, e);
}

 

 



function sha1_ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d; 
}



function sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
}

 

 


function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

 

function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

 

 



function AlignSHA1(str){

  var nblk=((str.length+8)>>6)+1, blks=new Array(nblk*16);

  for(var i=0;i<nblk*16;i++)blks[i]=0;

  for(i=0;i<str.length;i++)

    blks[i>>2]|=str.charCodeAt(i)<<(24-(i&3)*8);

  blks[i>>2]|=0x80<<(24-(i&3)*8);

  blks[nblk*16-1]=str.length*8;

  return blks;

}

 

 



function binb2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
  }
  return str;
}




var BASE64={
    
    enKey: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    
    deKey: new Array(
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
        52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
        -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
        -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
    ),
    
    encode: function(src){
       
        var str=new Array();
        var ch1, ch2, ch3;
        var pos=0;
      
        while(pos+3<=src.length){
            ch1=src.charCodeAt(pos++);
            ch2=src.charCodeAt(pos++);
            ch3=src.charCodeAt(pos++);
            str.push(this.enKey.charAt(ch1>>2), this.enKey.charAt(((ch1<<4)+(ch2>>4))&0x3f));
            str.push(this.enKey.charAt(((ch2<<2)+(ch3>>6))&0x3f), this.enKey.charAt(ch3&0x3f));
        }
       
        if(pos<src.length){
            ch1=src.charCodeAt(pos++);
            str.push(this.enKey.charAt(ch1>>2));
            if(pos<src.length){
                ch2=src.charCodeAt(pos);
                str.push(this.enKey.charAt(((ch1<<4)+(ch2>>4))&0x3f));
                str.push(this.enKey.charAt(ch2<<2&0x3f), '=');
            }else{
                str.push(this.enKey.charAt(ch1<<4&0x3f), '==');
            }
        }
      
        return str.join('');
    },
  
    decode: function(src){
       
        var str=new Array();
        var ch1, ch2, ch3, ch4;
        var pos=0;
      
        src=src.replace(/[^A-Za-z0-9\+\/]/g, '');
       
        while(pos+4<=src.length){
            ch1=this.deKey[src.charCodeAt(pos++)];
            ch2=this.deKey[src.charCodeAt(pos++)];
            ch3=this.deKey[src.charCodeAt(pos++)];
            ch4=this.deKey[src.charCodeAt(pos++)];
            str.push(String.fromCharCode(
                (ch1<<2&0xff)+(ch2>>4), (ch2<<4&0xff)+(ch3>>2), (ch3<<6&0xff)+ch4));
        }
       
        if(pos+1<src.length){
            ch1=this.deKey[src.charCodeAt(pos++)];
            ch2=this.deKey[src.charCodeAt(pos++)];
            if(pos<src.length){
                ch3=this.deKey[src.charCodeAt(pos)];
                str.push(String.fromCharCode((ch1<<2&0xff)+(ch2>>4), (ch2<<4&0xff)+(ch3>>2)));
            }else{
                str.push(String.fromCharCode((ch1<<2&0xff)+(ch2>>4)));
            }
        }
      
        return str.join('');
    }
};




function hex2bin(s)
{
	var result="";
	for(var i=0;i<s.length;i=i+2)
	{
		result=result+String.fromCharCode(parseInt("0x"+s.charAt(i)+s.charAt(i+1)));
	}
	return result;
}

function JiaMiverifyCode(UniqueID,verifyCode)
{
	var s=hex_sha1(UniqueID+verifyCode).toString();
	var s2=s.substr(0,8); 
	s=s+s2;

	var key="";
	for(var i=0;i<s.length;i=i+2)
	{
		key=key+String.fromCharCode(parseInt("0x"+s.charAt(i) + s.charAt(i+1)));
	}

	var data=verifyCode.toString();
	enc = des(key, data, 1, 0, 0, 1);  
	var r1=stringToHex(enc);
	return (BASE64.encode(hex2bin(r1)));
}

function JiaMiPass(UniqueID,verifyCode,Pass)
{
	var s=hex_sha1(UniqueID+verifyCode).toString();
	var s2=s.substr(0,8); 
	s=s+s2;

	var key="";
	for(var i=0;i<s.length;i=i+2)
	{
		key=key+String.fromCharCode(parseInt("0x"+s.charAt(i) + s.charAt(i+1)));
	}

	var len=Pass.toString().length;
	if(len>8)
	{
		var data=Pass.toString().substr(0,8);
		enc = des(key, data, 1, 0, 0, 1);
		var r1=stringToHex(enc);
		r1=r1.substr(0,16);
		
		data=Pass.toString().substr(8,len);
		enc = des(key, data, 1, 0, 0, 1);  
		var r2=stringToHex(enc);
		r2=r2.substr(0,16);
		return (BASE64.encode(hex2bin(r1+r2)));
	}
	else
	{
		enc = des(key, Pass, 1, 0, 0, 1); 
		var r1=stringToHex(enc);
		r1=r1.substr(0,16);
		return (BASE64.encode(hex2bin(r1)));
	}
}


function jiami() 
{
	var verifyCode=document.getElementById("verifyCode").value;
	var Pass=document.getElementById("logonCardPass").value;
//	alert(Pass);
	document.getElementById("logonCardPass").value=JiaMiPass(UniqueID,verifyCode,Pass);
//	alert(document.getElementById("logonCardPass").value)
	document.getElementById("verifyCode").value=JiaMiverifyCode(UniqueID,verifyCode);
}  

	var UniqueID="";  
	var dse_sessionId="";

window.setTimeout(function(){
	var strUrl=window.location.href.toString();
	dse_sessionId=getCookie("JSESSIONID");
	dse_sessionId=dse_sessionId.substr(4,23);


	
	if(strUrl.indexOf("icbc/newperbank/gold/blank.jsp?dse_sessionId")>0)
	{
		GM_log(document.getElementsByName("InfoForm")[0].innerHTML);
	
	}
	
	if(!(strUrl.indexOf("icbc/newperbank/main/viplogin.jsp")>0 || strUrl.indexOf("icbc/newperbank/main/login.jsp")>0))return;

	
	var safeEdit1=document.getElementById("safeEdit1");
	if(safeEdit1==null)return;

	var str=safeEdit1.innerHTML.toString();
	var pattern = /<param name="UniqueID" value="(.+?)">/gi; 
	var mts = pattern.exec(str); 
	if (mts != null) 
	{ 
		UniqueID=mts[1]; 
	} 
	
	var logonform=document.getElementsByTagName("form")[0];
	logonform.action="/servlet/com.icbc.inbs.servlet.ICBCINBSEstablishSessionServlet";
	logonform.onSubmit="";
	

	safeEdit1.parentNode.innerHTML="<input type=\"password\" id=\"logonCardPass\" name=\"logonCardPass\" vaule=\"\"/>";
	
	var KeyPart=document.getElementById("KeyPart");
	var p=KeyPart.parentNode;
	p.removeChild(KeyPart); 
	p.innerHTML=p.innerHTML+"<input type=\"text\" id=\"verifyCode\" name=\"verifyCode\" vaule=\"\"/>";

p.innerHTML=p.innerHTML
			+"<input type=\"hidden\" id=\"currentip\" name=\"currentip\" value=\"NjAyLjkxLjA0MS4wMQ==\"/>"
			+"<input type=\"hidden\" id=\"currentmac\" name=\"currentmac\" value=\"REItMTEtOUUtMjAtRjAtMDA=\"/>"
			+"<input type=\"hidden\" id=\"firstip\" name=\"firstip\" value=\"NjAyLjkxLjA0MS4wMQ==\"/>"
			+"<input type=\"hidden\" id=\"firstmac\" name=\"firstmac\" value=\"REItMTEtOUUtMjAtRjAtMDA=\"/>"
			+"<input type=\"hidden\" id=\"secondip\" name=\"secondip\" value=\"MC4wLjAuMA==\"/>"
			+"<input type=\"hidden\" id=\"secondmac\" name=\"secondmac\" value=\"MUMtRDctMUUtQ0UtRTEtMDA=\"/>"
			+"<input type=\"hidden\" id=\"netType\" name=\"netType\" value=\"130\"/>";
	var submitkey=document.getElementById("submitkey");
	submitkey.innerHTML="<input type=\"submit\" value=\"submit\">";
	
	
 },60);
 
function newsubmit(event)
{
	var target = event ? event.target : this;  
//	alert(window.document.body.innerHTML);
	jiami();
	target.submit();
	return false;
}


function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
return ""
}

window.addEventListener('submit', newsubmit, false);  


//HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit; 
//HTMLFormElement.prototype.submit = newsubmit;