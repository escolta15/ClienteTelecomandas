import { SegmentChangeEventDetail } from '@ionic/angular';

export interface SegmentCustomEvent extends CustomEvent {
  target: HTMLIonSegmentElement;
  detail: SegmentChangeEventDetail;
}
