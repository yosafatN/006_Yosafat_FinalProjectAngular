import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    KEY_TOKEN: string = 'TOKEN_ACCESS'
    KET_REFRESH_TOKEN: string = 'REFRESH_TOKEN'

    setLogin(token: string, refreshToken: string) {
        localStorage.setItem(this.KEY_TOKEN, token);
        localStorage.setItem(this.KET_REFRESH_TOKEN, refreshToken);
    }

    getToken() {
        return localStorage.getItem(this.KEY_TOKEN);
    }

    getRefreshToken() {
        return localStorage.getItem(this.KET_REFRESH_TOKEN);
    }

    logout() {
        localStorage.removeItem(this.KEY_TOKEN);
        localStorage.removeItem(this.KET_REFRESH_TOKEN);
    }
}