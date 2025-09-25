import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatusServer(): string {
    const currentTime = new Date().toLocaleTimeString();
    return `API funcionando Correctamente | Horário atual: ${currentTime}`;
  }
}
