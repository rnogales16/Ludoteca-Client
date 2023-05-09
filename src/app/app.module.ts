import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { CategoryModule } from './category/category.module';
import { AuthorModule } from './author/author.module';
import { GameModule } from './game/game.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CategoryModule,
    CoreModule,
    AuthorModule,
    GameModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
