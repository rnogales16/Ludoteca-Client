import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from './model/Loan';
import { Pageable } from '../core/model/page/Pageable';
import { LoanPage } from './model/LoanPage';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  constructor(private http: HttpClient) {}

  getLoans(
    pageable: Pageable,
    clientId?: number,
    gameId?: number,
    date?: Date
  ): Observable<LoanPage> {
    return this.http.post<LoanPage>(
      this.composeFindUrl(clientId, gameId, date),
      {
        pageable: pageable,
      }
    );
  }

  getAllLoans(
    clientId?: number,
    gameId?: number,
    date?: Date
  ): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.composeFindUrl(clientId, gameId, date));
  }

  saveLoan(loan: Loan): Observable<void> {
    let url = 'http://localhost:8080/loan';

    if (loan.id != null) {
      url += '/' + loan.id;
    }

    return this.http.put<void>(url, loan);
  }

  deleteLoan(idLoan: Number): Observable<any> {
    return this.http.delete('http://localhost:8080/loan/' + idLoan);
  }

  private composeFindUrl(clientId?: number, gameId?: number, date?: Date): any {
    let params = '';

    if (clientId != null) {
      if (params != '') params += '&';
      params += 'clientId=' + clientId;
    }

    if (gameId != null) {
      if (params != '') params += '&';
      params += 'gameId=' + gameId;
    }

    if (date != null) {
      if (params != '') params += '&';
      params += 'date=' + date;
    }

    let url = 'http://localhost:8080/loan';

    if (params == '') return url;
    else return url + '?' + params;
  }
}
