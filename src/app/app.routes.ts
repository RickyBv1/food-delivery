import { Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { EntryComponent } from './pages/entry/entry.component';
import { ArticleComponent } from './pages/article/article.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchComponent } from './pages/search/search.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "cart",
        component: CartComponent
    },
    {
        path: "entry",
        component: EntryComponent
    },
    {
        path: "article",
        component: ArticleComponent
    },
    {
        path: "profile",
        component: ProfileComponent
    },
    {
        path: "search",
        component: SearchComponent
    },
];
