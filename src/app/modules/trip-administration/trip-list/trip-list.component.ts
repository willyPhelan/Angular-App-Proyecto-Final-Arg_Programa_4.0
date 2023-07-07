import {Component, OnInit} from '@angular/core';
import {Trip} from "../../../models/trip";
import {TripService} from "../../../services/trip.service";
import {ModelService} from "../../../services/model.service";
import {BusService} from "../../../services/bus.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-trip.ts-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit{


  displayedColumns = ['id', 'origen', 'destino', 'fechaLlegada', 'fechaSalida', 'colectivo', 'acciones'];
  dataSource = [
    new Trip(1, 'Viedma', 'Patagones', '2023-06-29', '2023-06-29', 1, [3], [4]), 
  ];

  constructor(private tripService: TripService,
              private busService: BusService,
              private router: Router) {
  }

  ngOnInit() {
    this.tripService.findAll().subscribe(res => {
      if (res.body) {
        this.dataSource = res.body.map(res => {
          const trip = new Trip(res.id, res.lugarDestino, res.lugarSalida, res.fechaLlegada, res.fechaSalida, res.idColectivo, res.colectivo, res.personaId);
          this.loadColectivo(trip);
          return trip;
        });
      }
    });
  }
  
  loadColectivo(trip: Trip) {
    this.busService.findOne(trip.idColectivo).subscribe(res => {
      trip.colectivo = res;
    })
  }

  editarTrip(trip : Trip) {
    this.router.navigate(['trips', 'detail', trip.id]);
  }

}