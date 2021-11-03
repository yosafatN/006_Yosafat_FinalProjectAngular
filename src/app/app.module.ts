import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './components/login/login.component'
import { MatDialogModule } from '@angular/material/dialog' 
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { LoadingComponent } from './loading/loading.component';
import { DialogConfermComponent } from './components/dialog-conferm/dialog-conferm.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormComponent,
    TableComponent,
    LoginComponent,
    LoadingComponent,
    DialogConfermComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
