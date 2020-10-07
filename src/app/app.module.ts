import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { Dialog, LoginComponent } from './login/login.component';
import { SignUpComponent } from './signUp/signUp.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NavbarComponent } from './navbar/navbar.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CreateSubredditComponent } from './subreddit/create-subreddit/create-subreddit.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { VoteButtonComponent } from './shared/vote-button/vote-button.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { SubredditSideBarComponent } from './shared/subreddit-side-bar/subreddit-side-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {TokenInterceptor} from './tokenInterceptor';
import { EditorModule } from '@tinymce/tinymce-angular';
import { PostTileComponent } from './shared/post-tile/post-tile.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    NavbarComponent,
    Dialog,
    CreateSubredditComponent,
    CreatePostComponent,
    VoteButtonComponent,
    SideBarComponent,
    SubredditSideBarComponent,
    PostTileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    MatDialogModule,
    MatSnackBarModule,
    FontAwesomeModule,
    EditorModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
