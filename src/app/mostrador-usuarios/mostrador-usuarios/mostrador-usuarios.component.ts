import { Component, OnInit } from '@angular/core';
import { GitHubService } from 'src/app/core/services/git-hub.service';

@Component({
  selector: 'app-mostrador-usuarios',
  templateUrl: './mostrador-usuarios.component.html',
  styleUrls: ['./mostrador-usuarios.component.css']
})
export class MostradorUsuariosComponent implements OnInit {

  constructor(
    private _gitHubService: GitHubService
  ) { }

  ngOnInit(): void {
    this._gitHubService.getInfoUsuarioGitHub('agudelogarciacamilo').subscribe(info => {
      console.log('Received Info: ', info);
    });
  }

}
