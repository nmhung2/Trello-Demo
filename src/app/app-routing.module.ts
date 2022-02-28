import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from '../app/components/board/board.component';
import { WorldClockComponent } from '../app/components/world-clock/world-clock.component';

const routes: Routes = [
  { path: '', component: BoardComponent },
  { path: 'wt', component: WorldClockComponent },
]; // sets up routes constant where you define your routes

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
