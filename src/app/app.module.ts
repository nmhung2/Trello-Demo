import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from '../app/components/board/board.component';
import { CardModalComponent } from '../app/components/card-modal/card-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { BoardService } from './services/board.service';
import { WorldClockComponent } from '../app/components/world-clock/world-clock.component';

import { MatDialogModule } from '@angular/material/dialog';
import { TimeZoneService } from './services/time-zone.service';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CardModalComponent,
    WorldClockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatDialogModule,
  ],
  providers: [
    BoardService,
    { provide: 'TimeZoneService', useClass: TimeZoneService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
