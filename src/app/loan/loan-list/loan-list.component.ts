import { Component, OnInit } from '@angular/core';
import { LoanService } from '../loan.service';
import { MatDialog } from '@angular/material/dialog';
import { Loan } from '../model/Loan';
import { LoanPage } from '../model/LoanPage';
import { LoanEditComponent } from '../loan-edit/loan-edit.component';
import { Client } from 'src/app/client/model/Client';
import { ClientService } from 'src/app/client/client.service';
import { Game } from 'src/app/game/model/Game';
import { GameService } from 'src/app/game/game.service';
import { MatTableDataSource } from '@angular/material/table';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { PageEvent } from '@angular/material/paginator';
import { Pageable } from 'src/app/core/model/page/Pageable';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss'],
})
export class LoanListComponent implements OnInit {
  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[] = [
    'id',
    'game',
    'client',
    'startingDate',
    'endingDate',
    'action',
  ];
  clients: Client[];
  games: Game[];
  filterClient: Client;
  filterGame: Game;
  loans: Loan[];
  filterDate: Date;
  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  constructor(
    private loanService: LoanService,
    private clientService: ClientService,
    private gameService: GameService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPage();

    this.clientService
      .getClients()
      .subscribe((clients) => (this.clients = clients));

    this.gameService.getGames().subscribe((games) => (this.games = games));
  }

  loadPage(event?: PageEvent) {
    let pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [
        {
          property: 'id',
          direction: 'ASC',
        },
      ],
    };

    if (event != null) {
      pageable.pageSize = event.pageSize;
      pageable.pageNumber = event.pageIndex;
    }

    this.loanService.getLoans(pageable).subscribe((data) => {
      this.loans = this.loans;
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });
  }

  onCleanFilter(): void {
    this.filterDate = null;
    this.filterClient = null;
    this.filterGame = null;

    this.onSearch();
  }

  onSearch(): void {
    let clientId = this.filterClient != null ? this.filterClient.id : null;
    let gameId = this.filterGame != null ? this.filterGame.id : null;

    const pageable: Pageable = {
      pageNumber: 0,
      pageSize: 50,
      sort: [
        {
          property: 'id',
          direction: 'ASC',
        },
      ],
    };

    this.loanService.getLoans(pageable).subscribe((data: LoanPage) => {
      let filteredLoans = data.content;

      if (this.filterDate) {
        filteredLoans = filteredLoans.filter((loan) => {
          const loanStartingDate = new Date(loan.startingDate);
          const loanEndingDate = new Date(loan.endingDate);
          const selectedDate = new Date(this.filterDate);

          return (
            selectedDate >= loanStartingDate && selectedDate <= loanEndingDate
          );
        });
      }

      if (clientId) {
        filteredLoans = filteredLoans.filter(
          (loan) => loan.client.id === clientId
        );
      }

      if (gameId) {
        filteredLoans = filteredLoans.filter((loan) => loan.game.id === gameId);
      }

      this.dataSource.data = filteredLoans;
    });
  }

  createLoan() {
    const dialogRef = this.dialog.open(LoanEditComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  editLoan(loan: Loan) {
    const dialogRef = this.dialog.open(LoanEditComponent, {
      data: { loan: loan },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  deleteLoan(loan: Loan) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: 'Eliminar Préstamo',
        description:
          'Atención, si borra este préstamo se perderán los datos.<br>¿Desea eliminar el préstamo?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loanService.deleteLoan(loan.id).subscribe((result) => {
          this.ngOnInit();
        });
      }
    });
  }
}
