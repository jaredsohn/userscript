// ==UserScript==
// @name           Library.Base64.ZongHeng
// @description    引用库，通过使用 @require 元数据加载以使用Base64编码解码，来自zongheng.com，此做备份。
// ==/UserScript==

var Base64 = {};
Base64.utf16to8 = function(D) {
	var B, C, A, E;
	B = "";
	A = D.length;
	for (C = 0; C < A; C++) {
		E = D.charCodeAt(C);
		if ((E >= 1) && (E <= 127)) {
			B += D.charAt(C)
		} else {
			if (E > 2047) {
				B += String.fromCharCode(224 | ((E >> 12) & 15));
				B += String.fromCharCode(128 | ((E >> 6) & 63));
				B += String.fromCharCode(128 | ((E >> 0) & 63));
			} else {
				B += String.fromCharCode(192 | ((E >> 6) & 31));
				B += String.fromCharCode(128 | ((E >> 0) & 63));
			}
		}
	}
	return B;
};
Base64.utf8to16 = function(F) {
	var B, D, A, G;
	var E, C;
	B = "";
	A = F.length;
	D = 0;
	while (D < A) {
		G = F.charCodeAt(D++);
		switch (G >> 4) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
			B += F.charAt(D - 1);
			break;
		case 12:
		case 13:
			E = F.charCodeAt(D++);
			B += String.fromCharCode(((G & 31) << 6) | (E & 63));
			break;
		case 14:
			E = F.charCodeAt(D++);
			C = F.charCodeAt(D++);
			B += String.fromCharCode(((G & 15) << 12) | ((E & 63) << 6) | ((C & 63) << 0));
			break
		}
	}
	return B;
};
Base64.base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
Base64.base64DecodeChars = new Array( - 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
Base64.encode = function(G) {
	var C, E, A;
	var F, D, B;
	A = G.length;
	E = 0;
	C = "";
	while (E < A) {
		F = G.charCodeAt(E++) & 255;
		if (E == A) {
			C += this.base64EncodeChars.charAt(F >> 2);
			C += this.base64EncodeChars.charAt((F & 3) << 4);
			C += "==";
			break;
		}
		D = G.charCodeAt(E++);
		if (E == A) {
			C += this.base64EncodeChars.charAt(F >> 2);
			C += this.base64EncodeChars.charAt(((F & 3) << 4) | ((D & 240) >> 4));
			C += this.base64EncodeChars.charAt((D & 15) << 2);
			C += "=";
			break;
		}
		B = G.charCodeAt(E++);
		C += this.base64EncodeChars.charAt(F >> 2);
		C += this.base64EncodeChars.charAt(((F & 3) << 4) | ((D & 240) >> 4));
		C += this.base64EncodeChars.charAt(((D & 15) << 2) | ((B & 192) >> 6));
		C += this.base64EncodeChars.charAt(B & 63);
	}
	return C;
};
Base64.decode = function(H) {
	return this.utf8to16(this.base64decode(H));
};
Base64.base64decode = function(H) {
	var G, F, D, B;
	var E, A, C;
	A = H.length;
	E = 0;
	C = "";
	while (E < A) {
		do {
			G = this.base64DecodeChars[H.charCodeAt(E++) & 255];
		} while ( E < A && G == - 1 );
		if (G == -1) {
			break;
		}
		do {
			F = this.base64DecodeChars[H.charCodeAt(E++) & 255]
		} while ( E < A && F == - 1 );
		if (F == -1) {
			break
		}
		C += String.fromCharCode((G << 2) | ((F & 48) >> 4));
		do {
			D = H.charCodeAt(E++) & 255;
			if (D == 61) {
				return C;
			}
			D = this.base64DecodeChars[D];
		} while ( E < A && D == - 1 );
		if (D == -1) {
			break;
		}
		C += String.fromCharCode(((F & 15) << 4) | ((D & 60) >> 2));
		do {
			B = H.charCodeAt(E++) & 255;
			if (B == 61) {
				return C;
			}
			B = this.base64DecodeChars[B];
		} while ( E < A && B == - 1 );
		if (B == -1) {
			break;
		}
		C += String.fromCharCode(((D & 3) << 6) | B);
	}
	return C;
}