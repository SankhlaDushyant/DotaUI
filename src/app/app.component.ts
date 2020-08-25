import { Component, OnInit, NgModule } from '@angular/core';
import { LoadDotaCharactersService } from './Services/load-dota-characters.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';  
import { Observable } from 'rxjs'; 
import { Dota } from './Model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'dotaUI';
  DotaForm: FormGroup;
  allCharacters: Observable<Dota[]>;
  dotaupdateid = null;
  constructor(private LoadDotaCharacters: LoadDotaCharactersService) {}

  DotaFormId = new FormControl( [''])
  DotaFormCharacter = new FormControl([''])
  DotaFormPower = new FormControl([''])
  DotaFormType = new FormControl([''])

  ngOnInit(){
    this.DotaForm = new FormGroup(
      {
        id: this.DotaFormId,
        character: this.DotaFormCharacter,
        power: this.DotaFormPower,
        type: this.DotaFormType
      }
    );

    this.allCharacters = this.LoadDotaCharacters.getDotaCharacters();
    // console.log(this.allCharacters)
  }

  onFormSubmit() {
    const Dota = this.DotaForm.value;
    // console.log(Dota);
    this.AddCharacter(Dota);
  }

  AddCharacter(Dota: Dota) {
    if (this.dotaupdateid == null) 
    {
      console.log(Dota)
      this.LoadDotaCharacters.CreateDotaCharacter(Dota).subscribe(
        () => {
          this.allCharacters = this.LoadDotaCharacters.getDotaCharacters();
        }
      );
    }else{
      Dota.id = this.dotaupdateid;
      this.LoadDotaCharacters.UpdateDotaCharacter(Dota).subscribe (
        () => {
          this.allCharacters = this.LoadDotaCharacters.getDotaCharacters();
          this.dotaupdateid = null;
        }
      );
    }
    
  }

  loadCharacterToEdit (characterId : number) {
    this.LoadDotaCharacters.getDotaCharactersById(characterId).subscribe(
      dota => {
        this.dotaupdateid = dota.id;
        this.DotaForm.controls['id'].setValue(dota.id);
        this.DotaForm.controls['character'].setValue(dota.character); 
        this.DotaForm.controls['power'].setValue(dota.power); 
        this.DotaForm.controls['type'].setValue(dota.type);  
      }
    );
  }

  deleteCharacter(characterId: number) {
    this.LoadDotaCharacters.DeleteDotaCharacter(characterId).subscribe(
      () => {
        this.allCharacters = this.LoadDotaCharacters.getDotaCharacters();
        this.dotaupdateid = null;
      }
    );
  }
  
}
