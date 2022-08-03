import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { API, getHeaders } from './api.service'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeToRefreshToken = 300000 // in milliseconds
  showExpiredTokenModel = false
  showErrorDialog = false
  errorDialog = {
    message: '',
    statusText: '',
  }
  firstEnter = true

  constructor(private http: HttpClient, private router: Router) {}

  isLoggedIn(): boolean | void {
    if (sessionStorage.getItem('token')) {
      if (!sessionStorage.getItem('expiresIn')) return false

      if (
        new Date(
          // @ts-ignore
          +sessionStorage.getItem('expiresIn') - this.timeToRefreshToken,
        ) > new Date()
      )
        return true

      if (
        new Date(
          // @ts-ignore
          +sessionStorage.getItem('expiresIn'),
        ) < new Date()
      ) {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('expiresIn')
        if (this.firstEnter) this.firstEnter = false
        else this.showExpiredTokenModel = true
        return false
      }

      this.refreshToken()
    } else {
      this.firstEnter = false
      return false
    }
    return true
  }

  private refreshToken() {
    this.http
      .get(`${API}/login/token`, {
        headers: getHeaders(),
      })
      .subscribe(({ token, expiresIn }: any) => {
        sessionStorage.setItem('token', token)
        sessionStorage.setItem('expiresIn', expiresIn)
      })
  }

  logOut() {
    this.firstEnter = true
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('expiresIn')
    sessionStorage.removeItem('user')
    this.router.navigate(['/login'])
  }
}
