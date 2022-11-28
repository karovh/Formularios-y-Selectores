import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Pais, PaisSmall } from '../interfaces/paisesInterface';
import { PaisService } from '../services/pais.service';
import { switchMap, tap } from "rxjs/operators";

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  
})
export class SelectorComponent implements OnInit {

  miFormulario: FormGroup= this.fb.group({
    region   : ['', Validators.required],  
    pais     : ['', Validators.required], 
    frontera: ['', Validators.required]

  })
  //LLENAR SELECTORES
  regiones : string []   = [];
  paises   : PaisSmall[] = [];
  fronteras: Pais[]    = [];
  

  cargando: boolean = false


  constructor(private fb: FormBuilder,
              private paisesServices: PaisService) { }



  ngOnInit(): void {
    this.regiones = this.paisesServices.regiones

    //CUANDO CAMBIA LA REGION

      this.miFormulario.get('region')?.valueChanges
        .pipe(
          tap( ( _ ) => {
            this.miFormulario.get('pais')?.reset('');
            this.cargando = true;
          }),
        switchMap( region => this.paisesServices.getPaisesPorRegion(region) )
        )
        .subscribe( paises => {
          //console.log(paises);
          this.paises= paises;
          this.cargando = false;
        })


    //  CUANDO CAMBIA EL PAIS

    this.miFormulario.get('pais')?.valueChanges
    
    .pipe(
      tap (() => {
        this.fronteras = [];
        this.miFormulario.get('frontera')?.reset('');
        this.cargando = true;
      }),
      switchMap(codigo => this.paisesServices.getPaisPorCodigo(codigo))
     )
      .subscribe((pais:any) => {
        this.fronteras = pais;         
        this.cargando = false;
        
      })
    
  }


  guardar() {
    console.log(this.miFormulario.value);

  }

  



}
