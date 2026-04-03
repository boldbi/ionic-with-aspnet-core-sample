import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'home',
  standalone: false
})
export class HomePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
