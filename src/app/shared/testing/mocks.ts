import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  standalone: true,
  name: "translate"
})
export class TranslateMockPipe implements PipeTransform {
  public name: string = "translate";

  public transform(query: string, ...args: any[]): any {
    return query;
  }
}
