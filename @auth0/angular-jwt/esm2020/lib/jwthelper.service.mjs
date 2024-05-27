/* eslint-disable no-bitwise */
import { Injectable, Inject } from '@angular/core';
import { JWT_OPTIONS } from './jwtoptions.token';
import * as i0 from "@angular/core";
export class JwtHelperService {
    constructor(config = null) {
        this.tokenGetter = (config && config.tokenGetter) || function () { };
    }
    urlBase64Decode(str) {
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0: {
                break;
            }
            case 2: {
                output += '==';
                break;
            }
            case 3: {
                output += '=';
                break;
            }
            default: {
                throw new Error('Illegal base64url string!');
            }
        }
        return this.b64DecodeUnicode(output);
    }
    // credits for decoder goes to https://github.com/atk
    b64decode(str) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        let output = '';
        str = String(str).replace(/=+$/, '');
        if (str.length % 4 === 1) {
            throw new Error(`'atob' failed: The string to be decoded is not correctly encoded.`);
        }
        for (
        // initialize result and counters
        let bc = 0, bs, buffer, idx = 0; 
        // get next character
        (buffer = str.charAt(idx++)); 
        // character found in table? initialize bit storage and add its ascii value;
        ~buffer &&
            ((bs = bc % 4 ? bs * 64 + buffer : buffer),
                // and if not first of each 4 characters,
                // convert the first 8 bits to one ascii character
                bc++ % 4)
            ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
            : 0) {
            // try to find character in table (0-63, not found => -1)
            buffer = chars.indexOf(buffer);
        }
        return output;
    }
    b64DecodeUnicode(str) {
        return decodeURIComponent(Array.prototype.map
            .call(this.b64decode(str), (c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
            .join(''));
    }
    decodeToken(token = this.tokenGetter()) {
        if (token instanceof Promise) {
            return token.then(t => this._decodeToken(t));
        }
        return this._decodeToken(token);
    }
    _decodeToken(token) {
        if (!token || token === '') {
            return null;
        }
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error(`The inspected token doesn't appear to be a JWT. Check to make sure it has three parts and see https://jwt.io for more.`);
        }
        const decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error('Cannot decode the token.');
        }
        return JSON.parse(decoded);
    }
    getTokenExpirationDate(token = this.tokenGetter()) {
        if (token instanceof Promise) {
            return token.then(t => this._getTokenExpirationDate(t));
        }
        return this._getTokenExpirationDate(token);
    }
    _getTokenExpirationDate(token) {
        let decoded;
        decoded = this.decodeToken(token);
        if (!decoded || !decoded.hasOwnProperty('exp')) {
            return null;
        }
        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }
    isTokenExpired(token = this.tokenGetter(), offsetSeconds) {
        if (token instanceof Promise) {
            return token.then(t => this._isTokenExpired(t, offsetSeconds));
        }
        return this._isTokenExpired(token, offsetSeconds);
    }
    _isTokenExpired(token, offsetSeconds) {
        if (!token || token === '') {
            return true;
        }
        const date = this.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;
        if (date === null) {
            return false;
        }
        return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
    }
    getAuthScheme(authScheme, request) {
        if (typeof authScheme === 'function') {
            return authScheme(request);
        }
        return authScheme;
    }
}
JwtHelperService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: JwtHelperService, deps: [{ token: JWT_OPTIONS }], target: i0.ɵɵFactoryTarget.Injectable });
JwtHelperService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: JwtHelperService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: JwtHelperService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [JWT_OPTIONS]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0aGVscGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWp3dC9zcmMvbGliL2p3dGhlbHBlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLCtCQUErQjtBQUUvQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBR2pELE1BQU0sT0FBTyxnQkFBZ0I7SUFHM0IsWUFBaUMsU0FBYyxJQUFJO1FBQ2pELElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLGNBQWEsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFTSxlQUFlLENBQUMsR0FBVztRQUNoQyxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZELFFBQVEsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDekIsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDTixNQUFNO2FBQ1A7WUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNOLE1BQU0sSUFBSSxJQUFJLENBQUM7Z0JBQ2YsTUFBTTthQUNQO1lBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDTixNQUFNLElBQUksR0FBRyxDQUFDO2dCQUNkLE1BQU07YUFDUDtZQUNELE9BQU8sQ0FBQyxDQUFDO2dCQUNQLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQzthQUM5QztTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELHFEQUFxRDtJQUM3QyxTQUFTLENBQUMs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UUFFdEIsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO1lBQzFCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsYUFBYSxHQUFHLGFBQWEsSUFBSSxDQUFDLENBQUM7UUFFbkMsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO1lBQ2pCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVNLGFBQWEsQ0FDbEIsVUFBeUMsRUFDekMsT0FBeUI7UUFFekIsSUFBSSxPQUFPLFVBQVUsS0FBSyxVQUFVLEVBQUU7WUFDcEMsT0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDNUI7UUFFRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDOzs2R0EzS1UsZ0JBQWdCLGtCQUdQLFdBQVc7aUhBSHBCLGdCQUFnQjsyRkFBaEIsZ0JBQWdCO2tCQUQ1QixVQUFVOzswQkFJSSxNQUFNOzJCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbi8qIGVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UgKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBKV1RfT1BUSU9OUyB9IGZyb20gJy4vand0b3B0aW9ucy50b2tlbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKd3RIZWxwZXJTZXJ2aWNlIHtcbiAgdG9rZW5HZXR0ZXI6ICgpID0+IHN0cmluZyB8IFByb21pc2U8c3RyaW5nPjtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KEpXVF9PUFRJT05TKSBjb25maWc6IGFueSA9IG51bGwpIHtcbiAgICB0aGlzLnRva2VuR2V0dGVyID0gKGNvbmZpZyAmJiBjb25maWcudG9rZW5HZXR0ZXIpIHx8IGZ1bmN0aW9uICgpIHt9O1xuICB9XG5cbiAgcHVibGljIHVybEJhc2U2NERlY29kZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IG91dHB1dCA9IHN0ci5yZXBsYWNlKC8tL2csICcrJykucmVwbGFjZSgvXy9nLCAnLycpO1xuICAgIHN3aXRjaCAob3V0cHV0Lmxlbmd0aCAlIDQpIHtcbiAgICAgIGNhc2UgMDoge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgMjoge1xuICAgICAgICBvdXRwdXQgKz0gJz09JztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIDM6IHtcbiAgICAgICAgb3V0cHV0ICs9ICc9JztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSWxsZWdhbCBiYXNlNjR1cmwgc3RyaW5nIScpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5iNjREZWNvZGVVbmljb2RlKG91dHB1dCk7XG4gIH1cblxuICAvLyBjcmVkaXRzIGZvciBkZWNvZGVyIGdvZXMgdG8gaHR0cHM6Ly9naXRodWIuY29tL2F0a1xuICBwcml2YXRlIGI2NGRlY29kZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgY2hhcnMgPVxuICAgICAgJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89JztcbiAgICBsZXQgb3V0cHV0ID0gJyc7XG5cbiAgICBzdHIgPSBTdHJpbmcoc3RyKS5yZXBsYWNlKC89KyQvLCAnJyk7XG5cbiAgICBpZiAoc3RyLmxlbmd0aCAlIDQgPT09IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYCdhdG9iJyBmYWlsZWQ6IFRoZSBzdHJpbmcgdG8gYmUgZGVjb2RlZCBpcyBub3QgY29ycmVjdGx5IGVuY29kZWQuYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBmb3IgKFxuICAgICAgLy8gaW5pdGlhbGl6ZSByZXN1bHQgYW5kIGNvdW50ZXJzXG4gICAgICBsZXQgYmMgPSAwLCBiczogYW55LCBidWZmZXI6IGFueSwgaWR4ID0gMDtcbiAgICAgIC8vIGdldCBuZXh0IGNoYXJhY3RlclxuICAgICAgKGJ1ZmZlciA9IHN0ci5jaGFyQXQoaWR4KyspKTtcbiAgICAgIC8vIGNoYXJhY3RlciBmb3VuZCBpbiB0YWJsZT8gaW5pdGlhbGl6ZSBiaXQgc3RvcmFnZSBhbmQgYWRkIGl0cyBhc2NpaSB2YWx1ZTtcbiAgICAgIH5idWZmZXIgJiZcbiAgICAgICgoYnMgPSBiYyAlIDQgPyBicyAqIDY0ICsgYnVmZmVyIDogYnVmZmVyKSxcbiAgICAgIC8vIGFuZCBpZiBub3QgZmlyc3Qgb2YgZWFjaCA0IGNoYXJhY3RlcnMsXG4gICAgICAvLyBjb252ZXJ0IHRoZSBmaXJzdCA4IGJpdHMgdG8gb25lIGFzY2lpIGNoYXJhY3RlclxuICAgICAgYmMrKyAlIDQpXG4gICAgICAgID8gKG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDI1NSAmIChicyA+PiAoKC0yICogYmMpICYgNikpKSlcbiAgICAgICAgOiAwXG4gICAgKSB7XG4gICAgICAvLyB0cnkgdG8gZmluZCBjaGFyYWN0ZXIgaW4gdGFibGUgKDAtNjMsIG5vdCBmb3VuZCA9PiAtMSlcbiAgICAgIGJ1ZmZlciA9IGNoYXJzLmluZGV4T2YoYnVmZmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuXG4gIHByaXZhdGUgYjY0RGVjb2RlVW5pY29kZShzdHI6IGFueSkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoXG4gICAgICBBcnJheS5wcm90b3R5cGUubWFwXG4gICAgICAgIC5jYWxsKHRoaXMuYjY0ZGVjb2RlKHN0ciksIChjOiBhbnkpID0+IHtcbiAgICAgICAgICByZXR1cm4gJyUnICsgKCcwMCcgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtMik7XG4gICAgICAgIH0pXG4gICAgICAgIC5qb2luKCcnKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgZGVjb2RlVG9rZW48VCA9IGFueT4odG9rZW46IHN0cmluZyk6IFQgfCBudWxsO1xuICBwdWJsaWMgZGVjb2RlVG9rZW48VCA9IGFueT4odG9rZW46IFByb21pc2U8c3RyaW5nPik6IFByb21pc2U8VCB8IG51bGw+O1xuICBwdWJsaWMgZGVjb2RlVG9rZW48VCA9IGFueT4oKTogbnVsbCB8IFQgfCBQcm9taXNlPFQgfCBudWxsPjtcbiAgcHVibGljIGRlY29kZVRva2VuPFQgPSBhbnk+KHRva2VuOiBzdHJpbmcgfCBQcm9taXNlPHN0cmluZz4gPSB0aGlzLnRva2VuR2V0dGVyKCkpOiBudWxsIHwgVCB8IFByb21pc2U8VCB8IG51bGw+IHtcbiAgICBpZiAodG9rZW4gaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICByZXR1cm4gdG9rZW4udGhlbih0ID0+IHRoaXMuX2RlY29kZVRva2VuKHQpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fZGVjb2RlVG9rZW4odG9rZW4pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGVjb2RlVG9rZW48VCA9IGFueT4odG9rZW46IHN0cmluZyk6IG51bGwgfCBUICB7XG4gICAgaWYgKCF0b2tlbiB8fCB0b2tlbiA9PT0gJycpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHBhcnRzID0gdG9rZW4uc3BsaXQoJy4nKTtcblxuICAgIGlmIChwYXJ0cy5sZW5ndGggIT09IDMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFRoZSBpbnNwZWN0ZWQgdG9rZW4gZG9lc24ndCBhcHBlYXIgdG8gYmUgYSBKV1QuIENoZWNrIHRvIG1ha2Ugc3VyZSBpdCBoYXMgdGhyZWUgcGFydHMgYW5kIHNlZSBodHRwczovL2p3dC5pbyBmb3IgbW9yZS5gXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGRlY29kZWQgPSB0aGlzLnVybEJhc2U2NERlY29kZShwYXJ0c1sxXSk7XG4gICAgaWYgKCFkZWNvZGVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBkZWNvZGUgdGhlIHRva2VuLicpO1xuICAgIH1cblxuICAgIHJldHVybiBKU09OLnBhcnNlKGRlY29kZWQpO1xuICB9XG5cbiAgcHVibGljIGdldFRva2VuRXhwaXJhdGlvbkRhdGUodG9rZW46IHN0cmluZyk6IERhdGUgfCBudWxsO1xuICBwdWJsaWMgZ2V0VG9rZW5FeHBpcmF0aW9uRGF0ZSh0b2tlbjogUHJvbWlzZTxzdHJpbmc+KTogUHJvbWlzZTxEYXRlIHwgbnVsbD47XG4gIHB1YmxpYyBnZXRUb2tlbkV4cGlyYXRpb25EYXRlKCk6IG51bGwgfCBEYXRlIHwgUHJvbWlzZTxEYXRlIHwgbnVsbD47XG4gIHB1YmxpYyBnZXRUb2tlbkV4cGlyYXRpb25EYXRlKFxuICAgIHRva2VuOiBzdHJpbmcgfCBQcm9taXNlPHN0cmluZz4gPSB0aGlzLnRva2VuR2V0dGVyKClcbiAgKTogRGF0ZSB8IG51bGwgfCBQcm9taXNlPERhdGUgfCBudWxsPiB7XG4gICAgaWYgKHRva2VuIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgcmV0dXJuIHRva2VuLnRoZW4odCA9PiB0aGlzLl9nZXRUb2tlbkV4cGlyYXRpb25EYXRlKHQpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fZ2V0VG9rZW5FeHBpcmF0aW9uRGF0ZSh0b2tlbik7XG4gIH1cblxuICBwcml2YXRlIF9nZXRUb2tlbkV4cGlyYXRpb25EYXRlKHRva2VuOiBzdHJpbmcpOiBEYXRlIHwgbnVsbCB7XG4gICAgbGV0IGRlY29kZWQ6IGFueTtcbiAgICBkZWNvZGVkID0gdGhpcy5kZWNvZGVUb2tlbih0b2tlbik7XG5cbiAgICBpZiAoIWRlY29kZWQgfHwgIWRlY29kZWQuaGFzT3duUHJvcGVydHkoJ2V4cCcpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoMCk7XG4gICAgZGF0ZS5zZXRVVENTZWNvbmRzKGRlY29kZWQuZXhwKTtcblxuICAgIHJldHVybiBkYXRlO1xuICB9XG5cbiAgcHVibGljIGlzVG9rZW5FeHBpcmVkKHRva2VuPzogdW5kZWZpbmVkLCBvZmZzZXRTZWNvbmRzPzogbnVtYmVyKTogYm9vbGVhbiB8IFByb21pc2U8Ym9vbGVhbj47XG4gIHB1YmxpYyBpc1Rva2VuRXhwaXJlZCh0b2tlbjogc3RyaW5nIHwgbnVsbCwgb2Zmc2V0U2Vjb25kcz86IG51bWJlcik6IGJvb2xlYW47XG4gIHB1YmxpYyBpc1Rva2VuRXhwaXJlZCh0b2tlbjogUHJvbWlzZTxzdHJpbmc+LCBvZmZzZXRTZWNvbmRzPzogbnVtYmVyKTogUHJvbWlzZTxib29sZWFuPjtcbiAgcHVibGljIGlzVG9rZW5FeHBpcmVkKFxuICAgIHRva2VuOiB1bmRlZmluZWQgfCBudWxsIHwgc3RyaW5nIHwgUHJvbWlzZTxzdHJpbmc+ID0gdGhpcy50b2tlbkdldHRlcigpLFxuICAgIG9mZnNldFNlY29uZHM/OiBudW1iZXJcbiAgKTogYm9vbGVhbiB8IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmICh0b2tlbiBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgIHJldHVybiB0b2tlbi50aGVuKHQgPT4gdGhpcy5faXNUb2tlbkV4cGlyZWQodCwgb2Zmc2V0U2Vjb25kcykpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9pc1Rva2VuRXhwaXJlZCh0b2tlbiwgb2Zmc2V0U2Vjb25kcyk7XG4gIH1cblxuICBwcml2YXRlIF9pc1Rva2VuRXhwaXJlZChcbiAgICB0b2tlbjogc3RyaW5nIHwgbnVsbCxcbiAgICBvZmZzZXRTZWNvbmRzPzogbnVtYmVyXG4gICk6IGJvb2xlYW4ge1xuICAgIGlmICghdG9rZW4gfHwgdG9rZW4gPT09ICcnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3QgZGF0ZSA9IHRoaXMuZ2V0VG9rZW5FeHBpcmF0aW9uRGF0ZSh0b2tlbik7XG4gICAgb2Zmc2V0U2Vjb25kcyA9IG9mZnNldFNlY29uZHMgfHwgMDtcblxuICAgIGlmIChkYXRlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuICEoZGF0ZS52YWx1ZU9mKCkgPiBuZXcgRGF0ZSgpLnZhbHVlT2YoKSArIG9mZnNldFNlY29uZHMgKiAxMDAwKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRBdXRoU2NoZW1lKFxuICAgIGF1dGhTY2hlbWU6IEZ1bmN0aW9uIHwgc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT5cbiAgKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodHlwZW9mIGF1dGhTY2hlbWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBhdXRoU2NoZW1lKHJlcXVlc3QpO1xuICAgIH1cblxuICAgIHJldHVybiBhdXRoU2NoZW1lO1xuICB9XG59XG4iXX0=