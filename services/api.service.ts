import { Injectable } from '@angular/core'
import { HttpHeaders } from '@angular/common/http'

export const API = 'http://localhost:3220'
export function getHeaders(headers: any = {}) {
  return new HttpHeaders({
    jwt: sessionStorage.getItem('token') || '',
    lang: sessionStorage.getItem('lang') || 'fr',
    ...headers,
  })
}

@Injectable({
  providedIn: 'root',
})
export class APIService {
  searchKeywords: any = ''
  constructor() {}
}
