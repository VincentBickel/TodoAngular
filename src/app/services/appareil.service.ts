import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppareilService {
  appareilSubject = new Subject<any[]>();
  private appareils = [];

  constructor(private httpClient: HttpClient) {}

  emitAppareilSubject() {
    this.appareilSubject.next(this.appareils.slice());
  }

  getAppareilById(id: number) {
    const appareil = this.appareils.find((appareilObject) => {
      return appareilObject.id === id;
    });
    return appareil;
  }

  switchOnAll() {
    for (const appareil of this.appareils) {
      appareil.status = 'allumé';
    }
    this.emitAppareilSubject();
  }

  switchOff() {
    for (const appareil of this.appareils) {
      appareil.status = 'eteint';
      this.emitAppareilSubject();
    }
  }
  switchOnOne(index: number) {
    this.appareils[index].status = 'allumé';
    this.emitAppareilSubject();
  }
  switchOffOne(index: number) {
    this.appareils[index].status = 'eteint';
    this.emitAppareilSubject();
  }
  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: '',
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = 10;

    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }

  saveAppareilToServer() {
    this.httpClient
      .put(
        'https://http-client-demo-2f834.firebaseio.com/appareils.json',
        this.appareils
      )
      .subscribe(
        () => {
          console.log('terminé');
        },
        (error) => {
          console.log('erreur' + error);
        }
      );
  }

  getAppareilFromServer() {
    this.httpClient
      .get<any[]>(
        'https://http-client-demo-2f834.firebaseio.com/appareils.json'
      )
      .subscribe(
        (response) => {
          this.appareils = response;
          console.log('chargé');

          this.emitAppareilSubject();
        },
        (error) => {
          console.log('erreur chargement' + error);
        }
      );
  }
}
