import { ArticleListModule } from '@angular-ngrx-nx-realworld-example-app/article-list';
import { SharedModule } from '@angular-ngrx-nx-realworld-example-app/shared';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ProfileEffects } from './+state/profile.effects';
import { profileInitialState } from './+state/profile.init';
import { profileReducer } from './+state/profile.reducer';
import { ProfileArticlesComponent } from './profile-articles.component';
import {
  ProfileArticlesResolverService,
  ProfileFavoritesResolverService,
  ProfileResolverService
} from './profile-resolver.service';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';

@NgModule({
  imports: [
    CommonModule,
    ArticleListModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileComponent,
        resolve: { ProfileResolverService },
        children: [
          {
            path: '',
            component: ProfileArticlesComponent,
            resolve: { ProfileArticlesResolverService }
          },
          {
            path: 'favorites',
            component: ProfileArticlesComponent,
            resolve: { ProfileFavoritesResolverService }
          }
        ]
      }
    ]),
    StoreModule.forFeature('profile', profileReducer, { initialState: profileInitialState }),
    EffectsModule.forFeature([ProfileEffects])
  ],
  providers: [
    ProfileEffects,
    ProfileService,
    ProfileResolverService,
    ProfileArticlesResolverService,
    ProfileFavoritesResolverService
  ],
  declarations: [ProfileComponent, ProfileArticlesComponent]
})
export class ProfileModule {}
