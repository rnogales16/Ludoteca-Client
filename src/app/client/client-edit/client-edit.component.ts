import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from '../client.service';
import { Client } from '../model/Client';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss'],
})
export class ClientEditComponent implements OnInit {
  client: Client;
  clients: Client[];
  error: string = '';
  /* nameRepeated: Boolean; */

  constructor(
    public dialogRef: MatDialogRef<ClientEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    if (this.data.client != null) {
      this.client = Object.assign({}, this.data.client);
    } else {
      this.client = new Client();
    }
    console.log(this.client);
  }

  onSave() {
    console.log(this.client);

    this.clientService.saveClient(this.client).subscribe(
      (result) => {
        this.dialogRef.close();
      },
      (error) => {
        this.error = error?.error?.error;
        console.log(this.error);
      }
    );

    /* this.clientService.saveClient(this.client).subscribe((result) => {
      this.dialogRef.close();
    }); */
  }

  onClose() {
    this.dialogRef.close();
  }
}
