import { Component, OnInit } from '@angular/core' ;
import { FormBuilder, Validators } from '@angular/forms' ;
import { BusDTO, BusService } from '../../../services/bus.service' ;
import { Bus } from '../../../models/bus' ;
import { MatSnackBar } from '@angular/material/snack-bar' ;
import { ModelService } from '../../../services/model.service' ;
import { Model } from '../../../models/model' ;
import { ActivatedRoute, Router } from '@angular/router' ;

@Component({
  selector: 'app-bus-detail',
  templateUrl: './bus-detail.component.html',
  styleUrls: ['./bus-detail.component.css'],
})


export class BusDetailComponent implements OnInit {
  
  modelsList: Model[] = [] ;

  selectedBus: Bus | null = null ;

  busForm = this.formBuilder.group({
    patente: ['', Validators.required],
    cantidadAsientos: [0, Validators.required],
    modeloId: [0, Validators.required],
  }) ;

  constructor(
    private formBuilder: FormBuilder,
    private busService: BusService,
    private modelService: ModelService,
    private router: Router,
    private route: ActivatedRoute,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.modelService.findAll().subscribe(
      (res) => {
        if (res.body)
          this.modelsList = res.body.map((json) => {
            const model = new Model(json.id, json.nombre, json.marca) 
            return model 
          }) ;
      },
      (error) => {
        console.log(error);
        this.matSnackBar.open(error, 'Cerrar')
      }
    ) ;

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id') 
      if (id) {
        this.findBus(Number(id)) 
      }
    }) ;
  }

  findModelBus(colectivo: Bus) {
    if (colectivo.modeloId)
      this.modelService.findOne(colectivo.modeloId).subscribe((res) => {
        if (res) 
        colectivo.modelo = new Model(res.id, res.nombre, res.marca)
      }) ;
  }

  findBus(id: number) {
    this.busService.findOne(id).subscribe(
      (res) => {
        if (res) {
          this.selectedBus = new Bus(
            res.id,
            res.patente,
            res.cantidadAsientos,
            //@ts-ignore
            res.modeloId
          ) ;

          this.findModelBus(this.selectedBus)

          this.busForm.patchValue({
            patente: this.selectedBus.patente,
            cantidadAsientos: this.selectedBus.cantidadAsientos,
            modeloId: this.selectedBus.modeloId,
          }) ;
        }
      },
      (error) => {
        console.log(error);
        this.matSnackBar.open(error, 'Close') 
        this.router.navigate(['buses', 'list'])
      }
    ) ;
  }

  saveChanges() {
    const body: BusDTO = {
      //@ts-ignore
      patente: this.busForm.get('patente')?.value,
      //@ts-ignore
      cantidadAsientos: this.busForm.get('cantidadAsientos')?.value,
      //@ts-ignore
      modeloId: this.busForm.get('modeloId')?.value,
    } ;

    if (this.selectedBus && this.selectedBus.id) {
      
      console.log('Actualizando') ;

      body.id = this.selectedBus.id 

      this.busService.updateBus(body).subscribe(
        (res) => {
          this.matSnackBar.open('Guardado', 'Cerrar') 
          this.router.navigate(['buses', 'list']) ;
        },
        (error) => {
          console.log(error);
          this.matSnackBar.open(error, 'Cerrar')
        }
      ) ;
    } else {
      this.busService.createBus(body).subscribe(
        (res) => {
          this.matSnackBar.open('Creado correctamente', 'Cerrar') ;
          this.router.navigate(['buses', 'list']) 
        },
        (error) => {
          console.log(error) ;
          this.matSnackBar.open(error, 'Cerrar')
        }
      ) ;
    }
  }

  goBack() {
    
    this.router.navigate(['buses', 'list']) ;
  }
}