
import { Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  constructor(
    public  renderer : Renderer2
  ) {}

formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}T00:00:00`;
}

}