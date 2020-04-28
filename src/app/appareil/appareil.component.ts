import { Component, OnInit, Input } from '@angular/core';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.css'],
})
export class AppareilComponent implements OnInit {
  @Input() appareilStatus: string;
  @Input() appareilName: string;
  @Input() appareilIndexOf: number;
  @Input() id: number;

  constructor(private appareilService: AppareilService) {}

  ngOnInit(): void {}
  getStatus() {
    return this.appareilStatus;
  }
  getColor() {
    if (this.appareilStatus === 'allumé') {
      return 'green';
    } else return 'red';
  }
  onSwitchOn() {
    this.appareilService.switchOnOne(this.appareilIndexOf);
  }
  onSwitchOff() {
    this.appareilService.switchOffOne(this.appareilIndexOf);
  }
}
