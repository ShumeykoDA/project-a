import { Injectable } from "@angular/core";
import { Animals } from "common-interface/data/animals.source";
import { IAnimal } from "common-interface/interface/animal.interface";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  getAnimals(): Observable<Array<IAnimal>> {
    return new BehaviorSubject(Animals);
  }
}
