import { Component, Inject, OnInit } from '@angular/core';
import { Loan } from '../model/Loan';
import { LoanService } from '../loan.service';
import { Client } from 'src/app/client/model/Client';
import { ClientService } from 'src/app/client/client.service';
import { Game } from 'src/app/game/model/Game';
import { GameService } from 'src/app/game/game.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-loan-edit',
  templateUrl: './loan-edit.component.html',
  styleUrls: ['./loan-edit.component.scss'],
})
export class LoanEditComponent implements OnInit {
  loan: Loan;
  clients: Client[];
  games: Game[];

  constructor(
    public dialogRef: MatDialogRef<LoanEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loanService: LoanService,
    private clientService: ClientService,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    if (this.data.loan != null) {
      this.loan = Object.assign({}, this.data.loan);
    } else {
      this.loan = new Loan();
    }

    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;

      if (this.loan.client != null) {
        let clientFilter: Client[] = clients.filter(
          (client) => client.id == this.data.loan.client.id
        );
        if (clientFilter != null) {
          this.loan.client = clientFilter[0];
        }
      }
    });

    this.gameService.getGames().subscribe((games) => {
      this.games = games;

      if (this.loan.game != null) {
        let gameFilter: Game[] = games.filter(
          (game) => game.id == this.data.loan.game.id
        );
        if (gameFilter != null) {
          this.loan.game = gameFilter[0];
        }
      }
    });
  }

  onSave() {
    this.loanService.saveLoan(this.loan).subscribe((result) => {
      this.dialogRef.close();
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
