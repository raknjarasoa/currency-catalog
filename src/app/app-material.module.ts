import { NgModule } from '@angular/core';
import {
  MatListModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatFormFieldModule,
  MatDividerModule
} from '@angular/material';

@NgModule({
  exports: [
    MatListModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDividerModule
  ],
})
export class AppMaterialModule { }